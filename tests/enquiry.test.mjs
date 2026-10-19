import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { Script } from 'node:vm';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = readFileSync(
  new URL('../app/api/enquiry/route.ts', import.meta.url),
  'utf8',
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
function handler(
  env = {},
  fetchImpl = async () => {
    throw new Error('Unexpected external request');
  },
) {
  const exports = {};
  new Script(compiled).runInNewContext({
    require,
    exports,
    process: { env },
    fetch: fetchImpl,
    URL,
    AbortSignal,
    Request,
  });
  return exports.POST;
}
const valid = {
  name: 'Test Visitor',
  email: 'visitor@example.com',
  interest: 'Architecture',
  location: 'Mumbai',
  message: 'I would like to discuss the design of a small home.',
  website: '',
};
const request = (body) =>
  new Request('http://localhost/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
const enabled = {
  ENQUIRY_WEBHOOK_URL: 'https://example.com/enquiry',
  ENQUIRY_WEBHOOK_TOKEN: 'test-token-only',
};
const sheetsEnabled = {
  GOOGLE_SHEETS_WEB_APP_URL:
    'https://script.google.com/macros/s/test-deployment/exec',
  GOOGLE_SHEETS_WEB_APP_TOKEN: 'test-only-shared-token-at-least-32-characters',
};
const optionalProjectFields = [
  'contactNumber',
  'projectType',
  'approximateArea',
  'projectStage',
  'approximateBudget',
];

void test('no destination produces an explicit not-sent response without transmitting data', async () => {
  const response = await handler()(request(valid));
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /not been sent/i);
});
void test('malformed JSON and non-object values are rejected as client errors', async () => {
  for (const body of ['{broken', 'null', '[]', '"a string"'])
    assert.equal((await handler(enabled)(request(body))).status, 400);
});
void test('invalid user input is rejected before any external request', async () => {
  for (const patch of [
    { name: 'A' },
    { email: 'invalid' },
    { message: 'too short' },
    { interest: 'Unrecognised' },
    { location: 'x'.repeat(201) },
    { email: 'a'.repeat(260) + '@example.com' },
  ])
    assert.equal(
      (await handler(enabled)(request({ ...valid, ...patch }))).status,
      400,
    );
});
void test('honeypot and oversized bodies cannot reach delivery', async () => {
  assert.equal(
    (await handler(enabled)(request({ ...valid, website: 'spam' }))).status,
    400,
  );
  assert.equal(
    (await handler(enabled)(request({ ...valid, message: 'x'.repeat(13000) })))
      .status,
    413,
  );
});
void test('delivery sends validated data and keeps the token in the header only', async () => {
  let delivered;
  const response = await handler(enabled, async (url, options) => {
    delivered = { url, options };
    return new Response(null, { status: 204 });
  })(request({ ...valid, name: '  Test Visitor  ', extra: 'discard me' }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(delivered.url, enabled.ENQUIRY_WEBHOOK_URL);
  assert.equal(
    delivered.options.headers.Authorization,
    'Bearer test-token-only',
  );
  assert.equal(delivered.options.redirect, 'error');
  const body = JSON.parse(delivered.options.body);
  assert.equal(body.name, 'Test Visitor');
  assert.equal(body.extra, undefined);
  assert.equal(body.website, undefined);
  assert.ok(!delivered.options.body.includes('test-token'));
  assert.ok(delivered.options.signal);
});
void test('the complete project enquiry is trimmed and forwarded without dropping new fields', async () => {
  const details = {
    contactNumber: '+91 (90000) 12345',
    projectType: 'Residential renovation',
    approximateArea: '1,200 sq. ft.',
    projectStage: 'Planning',
    approximateBudget: 'To be discussed',
  };
  let delivered;
  const response = await handler(enabled, async (_url, options) => {
    delivered = JSON.parse(options.body);
    return new Response(null, { status: 204 });
  })(
    request({
      ...valid,
      ...Object.fromEntries(
        Object.entries(details).map(([key, value]) => [key, `  ${value}  `]),
      ),
    }),
  );
  assert.equal(response.status, 200);
  for (const [key, value] of Object.entries(details))
    assert.equal(
      delivered[key],
      value,
      `${key} should retain the visitor's detail`,
    );
});
void test('existing enquiries can omit every new optional project field', async () => {
  let delivered;
  const response = await handler(enabled, async (_url, options) => {
    delivered = JSON.parse(options.body);
    return new Response(null, { status: 204 });
  })(request(valid));
  assert.equal(response.status, 200);
  for (const field of optionalProjectFields)
    assert.equal(delivered[field], '', `${field} should remain optional`);
});
void test('the four-field contact form can submit without additional project questions', async () => {
  const brief = {
    name: valid.name,
    email: valid.email,
    interest: valid.interest,
    message: valid.message,
    website: '',
  };
  let delivered;
  const response = await handler(enabled, async (_url, options) => {
    delivered = JSON.parse(options.body);
    return new Response(null, { status: 204 });
  })(request(brief));
  assert.equal(response.status, 200);
  for (const field of ['name', 'email', 'interest', 'message'])
    assert.equal(delivered[field], brief[field]);
  for (const field of ['location', ...optionalProjectFields])
    assert.equal(delivered[field], '', `${field} must not be required`);
});
void test('invalid phone numbers are rejected before any external request', async () => {
  for (const contactNumber of [
    '123456',
    '+1234567890123456',
    'call me tomorrow',
    '+91 90000 12345 ext 2',
    '1234567' + '.'.repeat(34),
  ])
    assert.equal(
      (await handler(enabled)(request({ ...valid, contactNumber }))).status,
      400,
      `Invalid phone ${JSON.stringify(contactNumber)} must not be delivered`,
    );
});
void test('new optional fields reject non-string types and overlong project details', async () => {
  for (const field of optionalProjectFields)
    for (const value of [null, 1234567890, [], {}, true])
      assert.equal(
        (await handler(enabled)(request({ ...valid, [field]: value }))).status,
        400,
        `${field} must reject ${JSON.stringify(value)}`,
      );
  for (const field of optionalProjectFields.filter(
    (key) => key !== 'contactNumber',
  ))
    assert.equal(
      (await handler(enabled)(request({ ...valid, [field]: 'x'.repeat(101) })))
        .status,
      400,
      `${field} must enforce its length limit`,
    );
});
void test('every advertised service can be submitted to a mocked destination', async () => {
  const services = [
    'Architecture',
    'Interior design',
    'Architecture & interiors',
    'Project management',
    'Vastu Shastra consultation',
    'Sustainability consultation',
    'Multiple services',
    'Something else',
  ];
  const delivered = [];
  const post = handler(enabled, async (_url, options) => {
    delivered.push(JSON.parse(options.body).interest);
    return new Response(null, { status: 204 });
  });
  for (const interest of services)
    assert.equal(
      (await post(request({ ...valid, interest }))).status,
      200,
      `${interest} should be accepted`,
    );
  assert.deepEqual(delivered, services);
});
void test('a failed or timed-out delivery never reports success', async () => {
  const upstreamFailure = await handler(
    enabled,
    async () => new Response(null, { status: 503 }),
  )(request(valid));
  assert.equal(upstreamFailure.status, 502);
  const networkFailure = await handler(enabled, async () => {
    throw new Error('Network unavailable');
  })(request(valid));
  assert.equal(networkFailure.status, 502);
  assert.ok((await networkFailure.json()).error);
});
void test('a non-HTTPS destination is rejected without sending personal data', async () => {
  const response = await handler({ ENQUIRY_WEBHOOK_URL: 'http://example.com' })(
    request(valid),
  );
  assert.equal(response.status, 502);
});

void test('Google Sheets follows only its result redirect and keeps the token out of the GET', async () => {
  const calls = [];
  const resultUrl =
    'https://script.googleusercontent.com/macros/echo?user_content_key=test-only';
  const response = await handler(sheetsEnabled, async (url, options) => {
    calls.push({ url, options });
    return calls.length === 1
      ? new Response(null, { status: 302, headers: { Location: resultUrl } })
      : Response.json({ ok: true });
  })(request(valid));
  assert.equal(response.status, 200);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, sheetsEnabled.GOOGLE_SHEETS_WEB_APP_URL);
  assert.equal(calls[0].options.redirect, 'manual');
  assert.equal(calls[0].options.headers.Authorization, undefined);
  assert.equal(
    JSON.parse(calls[0].options.body).token,
    sheetsEnabled.GOOGLE_SHEETS_WEB_APP_TOKEN,
  );
  assert.equal(calls[1].url, resultUrl);
  assert.equal(calls[1].options.method, 'GET');
  assert.equal(calls[1].options.body, undefined);
  assert.equal(calls[1].options.headers.Authorization, undefined);
  assert.equal(calls[1].options.redirect, 'error');
  assert.equal(calls[0].options.signal, calls[1].options.signal);
  assert.deepEqual(await response.json(), { ok: true });
});

void test('Google Sheets never reports success for error acknowledgements or a login page', async () => {
  for (const upstream of [
    () => Response.json({ ok: false }),
    () => Response.json({ accepted: true }),
    () => Response.json(null),
    () => new Response('<html>Sign in to Google</html>'),
    () => new Response(null, { status: 204 }),
  ]) {
    const response = await handler(sheetsEnabled, async () => upstream())(
      request(valid),
    );
    assert.equal(response.status, 502);
    assert.ok(
      !JSON.stringify(await response.json()).includes('test-only-shared'),
    );
  }
});

void test('Google Sheets rejects unexpected redirects without transmitting a second request', async () => {
  for (const location of [
    'https://accounts.google.com/login',
    'https://example.com/macros/echo',
    'https://script.googleusercontent.com.example.com/macros/echo',
    'https://script.googleusercontent.com/unexpected',
    'http://script.googleusercontent.com/macros/echo',
    'https://user:password@script.googleusercontent.com/macros/echo',
  ]) {
    let calls = 0;
    const response = await handler(sheetsEnabled, async () => {
      calls += 1;
      return new Response(null, {
        status: 302,
        headers: { Location: location },
      });
    })(request(valid));
    assert.equal(response.status, 502, location);
    assert.equal(calls, 1, location);
  }
});

void test('Google Sheets requires a valid deployment URL and strong shared token', async () => {
  for (const patch of [
    { GOOGLE_SHEETS_WEB_APP_TOKEN: '' },
    { GOOGLE_SHEETS_WEB_APP_TOKEN: 'too-short' },
    { GOOGLE_SHEETS_WEB_APP_URL: 'https://example.com/macros/s/test/exec' },
    {
      GOOGLE_SHEETS_WEB_APP_URL: 'https://script.google.com/macros/s/test/dev',
    },
    {
      GOOGLE_SHEETS_WEB_APP_URL:
        'https://script.google.com/macros/s/test/exec?token=secret',
    },
  ]) {
    const response = await handler({ ...sheetsEnabled, ...patch })(
      request(valid),
    );
    assert.ok([502, 503].includes(response.status));
  }
});

void test('Google Sheets takes priority without leaking generic webhook credentials', async () => {
  let delivered;
  const response = await handler(
    { ...enabled, ...sheetsEnabled },
    async (url, options) => {
      delivered = { url, options };
      return Response.json({ ok: true });
    },
  )(request(valid));
  assert.equal(response.status, 200);
  assert.equal(delivered.url, sheetsEnabled.GOOGLE_SHEETS_WEB_APP_URL);
  assert.equal(delivered.options.headers.Authorization, undefined);
  assert.ok(!delivered.options.body.includes(enabled.ENQUIRY_WEBHOOK_TOKEN));
});
