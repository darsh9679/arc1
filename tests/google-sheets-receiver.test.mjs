import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';

const source = readFileSync(
  new URL('../integrations/google-sheets/Code.gs', import.meta.url),
  'utf8',
);
const headers = [
  'Received at',
  'Name',
  'Email',
  'Service',
  'Project brief',
  'Source',
];
const token = 'test-only-shared-token-with-at-least-32-characters';
const valid = {
  token,
  name: 'Test Visitor',
  email: 'visitor@example.com',
  interest: 'Interior design',
  message: 'We would like to discuss an apartment renovation.',
};

function receiver(options = {}) {
  const calls = [];
  const rows = (options.rows ?? [headers]).map((row) => [...row]);
  let frozenRows = options.frozenRows ?? 0;
  let allocatedRows = options.allocatedRows ?? 1000;
  let sheetExists = options.sheetExists ?? true;
  let locked = false;
  const sheet = {
    getLastRow: () => rows.length,
    getMaxRows: () => allocatedRows,
    insertRowsAfter(position, count) {
      assert.equal(locked, true);
      assert.equal(position, allocatedRows);
      assert.equal(count, 100);
      calls.push('expand');
      allocatedRows += count;
    },
    getLastColumn: () =>
      rows.reduce((maximum, row) => Math.max(maximum, row.length), 0),
    getFrozenRows: () => frozenRows,
    setFrozenRows(count) {
      calls.push('freeze');
      frozenRows = count;
    },
    getRange(row, column, height, width) {
      assert.ok(
        row <= allocatedRows,
        'ranges must fit within the allocated sheet grid',
      );
      assert.equal(column, 1);
      assert.equal(height, 1);
      assert.equal(width, 6);
      return {
        getValues: () => [rows[row - 1] ?? []],
        setValues(values) {
          assert.equal(
            locked,
            true,
            'sheet writes must occur under the script lock',
          );
          calls.push(row === 1 ? 'header' : 'append');
          if (options.writeError) throw new Error('Private write failure');
          rows[row - 1] = Array.from(values[0]);
        },
      };
    },
  };
  const spreadsheet = {
    getSheetByName(name) {
      assert.equal(name, 'Enquiries');
      return sheetExists ? sheet : null;
    },
    insertSheet(name) {
      assert.equal(name, 'Enquiries');
      calls.push('create');
      sheetExists = true;
      return sheet;
    },
  };
  const context = {
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (key) =>
          (options.properties ?? {
            SPREADSHEET_ID: 'test-sheet',
            ENQUIRY_TOKEN: token,
          })[key] ?? null,
      }),
    },
    LockService: {
      getScriptLock: () => ({
        tryLock(milliseconds) {
          assert.equal(milliseconds, 5000);
          calls.push('lock');
          locked = options.lockAvailable !== false;
          return locked;
        },
        releaseLock() {
          calls.push('release');
          locked = false;
        },
      }),
    },
    SpreadsheetApp: {
      openById(id) {
        assert.equal(id, 'test-sheet');
        calls.push('open');
        return spreadsheet;
      },
      flush() {
        assert.equal(
          locked,
          true,
          'pending changes must flush before releasing the lock',
        );
        calls.push('flush');
        if (options.flushError) throw new Error('Private flush failure');
      },
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput(contents) {
        calls.push('response');
        return {
          contents,
          setMimeType(type) {
            assert.equal(type, 'application/json');
            return this;
          },
        };
      },
    },
  };
  new Script(source).runInNewContext(context);
  const event = (data) => {
    const contents = typeof data === 'string' ? data : JSON.stringify(data);
    return {
      postData: { contents },
      contentLength: Buffer.byteLength(contents),
    };
  };
  return {
    rows,
    calls,
    post: (data = valid) => JSON.parse(context.doPost(event(data)).contents),
    rawPost: (data) => JSON.parse(context.doPost(data).contents),
    initialize: () => context.initializeEnquiries(),
    get frozenRows() {
      return frozenRows;
    },
  };
}

void test('valid delivery appends six columns and acknowledges only after flush', () => {
  const script = receiver();
  assert.deepEqual(script.post({ ...valid, name: '  Test Visitor  ' }), {
    ok: true,
  });
  assert.equal(script.rows.length, 2);
  assert.equal(
    Object.prototype.toString.call(script.rows[1][0]),
    '[object Date]',
  );
  assert.deepEqual(script.rows[1].slice(1), [
    valid.name,
    valid.email,
    valid.interest,
    valid.message,
    'Trayaksh Architeqts website',
  ]);
  assert.deepEqual(script.calls, [
    'lock',
    'open',
    'append',
    'flush',
    'response',
    'release',
  ]);
  assert.ok(!JSON.stringify(script.rows).includes(token));
});

void test('unauthenticated requests and incomplete configuration never access the spreadsheet', () => {
  for (const patch of [
    { token: undefined },
    { token: 'wrong' },
    { token: null },
  ]) {
    const script = receiver();
    assert.equal(script.post({ ...valid, ...patch }).ok, false);
    assert.deepEqual(script.calls, ['response']);
    assert.equal(script.rows.length, 1);
  }
  for (const properties of [
    {},
    { SPREADSHEET_ID: 'test-sheet', ENQUIRY_TOKEN: 'short' },
    { ENQUIRY_TOKEN: token },
  ]) {
    const script = receiver({ properties });
    assert.equal(script.post().ok, false);
    assert.deepEqual(script.calls, ['response']);
  }
});

void test('malformed, oversized, and missing bodies are rejected without writes', () => {
  for (const body of ['{bad', 'null', '[]', '"text"', 'x'.repeat(16001)]) {
    const script = receiver();
    assert.equal(script.post(body).ok, false);
    assert.deepEqual(script.calls, ['response']);
  }
  for (const event of [
    undefined,
    {},
    { postData: { contents: '{}' }, contentLength: 48001 },
  ]) {
    assert.equal(receiver().rawPost(event).ok, false);
  }
});

void test('invalid fields and honeypots cannot reach the spreadsheet', () => {
  for (const patch of [
    { name: 'A' },
    { name: 'a'.repeat(121) },
    { name: 12 },
    { email: 'invalid' },
    { email: 'a'.repeat(255) },
    { message: 'too short' },
    { message: 'a'.repeat(5001) },
    { interest: 'Unknown' },
    { website: 'spam' },
    { location: 'a'.repeat(201) },
    { contactNumber: '123456' },
    { contactNumber: '+1234567890123456' },
    { contactNumber: 'call tomorrow' },
    { projectType: false },
    { approximateArea: 'a'.repeat(101) },
    { projectStage: {} },
    { approximateBudget: [] },
  ]) {
    const script = receiver();
    assert.equal(script.post({ ...valid, ...patch }).ok, false);
    assert.deepEqual(script.calls, ['response']);
  }
});

void test('all optional project details survive in the brief without extra columns', () => {
  const script = receiver();
  assert.equal(
    script.post({
      ...valid,
      location: '  Mumbai  ',
      contactNumber: '+91 90000 12345',
      projectType: 'Residential renovation',
      approximateArea: '1,200 sq. ft.',
      projectStage: 'Planning',
      approximateBudget: 'To be discussed',
      source: '=untrusted',
    }).ok,
    true,
  );
  assert.equal(script.rows[1].length, 6);
  assert.equal(
    script.rows[1][4],
    valid.message +
      '\n\n' +
      [
        'Location: Mumbai',
        'Contact number: +91 90000 12345',
        'Project type: Residential renovation',
        'Approximate area: 1,200 sq. ft.',
        'Project stage: Planning',
        'Approximate budget: To be discussed',
      ].join('\n'),
  );
  assert.equal(script.rows[1][5], 'Trayaksh Architeqts website');
});

void test('formula-like visitor input is escaped before it reaches setValues', () => {
  for (const prefix of ['=', '+', '-', '@']) {
    const script = receiver();
    const name = prefix + 'Test Visitor';
    const message = prefix + 'IMPORTXML("https://example.com", "//title")';
    assert.equal(script.post({ ...valid, name, message }).ok, true);
    assert.equal(script.rows[1][1], "'" + name);
    assert.equal(script.rows[1][4], "'" + message);
  }
});

void test('mismatched or additional headers cannot cause misplaced writes', () => {
  for (const rows of [
    [['Name', 'Received at', 'Email', 'Service', 'Project brief', 'Source']],
    [[...headers, 'Unexpected column']],
    [[], ['Existing data below an empty header']],
  ]) {
    const script = receiver({ rows });
    assert.equal(script.post().ok, false);
    assert.deepEqual(script.rows, rows);
    assert.ok(!script.calls.includes('append'));
    assert.equal(script.calls.at(-1), 'release');
  }
});

void test('an empty existing tab receives the header before its first enquiry', () => {
  const script = receiver({ rows: [] });
  assert.equal(script.post().ok, true);
  assert.deepEqual(script.rows[0], headers);
  assert.equal(script.rows.length, 2);
  assert.ok(script.calls.indexOf('header') < script.calls.indexOf('append'));
});

void test('unavailable lock, missing tab, write errors, and flush errors never acknowledge success', () => {
  for (const options of [
    { lockAvailable: false },
    { sheetExists: false },
    { writeError: true },
    { flushError: true },
  ]) {
    const script = receiver(options);
    assert.deepEqual(script.post(), {
      ok: false,
      error: 'Unable to save this enquiry.',
    });
    assert.equal(script.calls.at(-1), 'release');
    if (options.lockAvailable === false)
      assert.ok(!script.calls.includes('open'));
  }
});

void test('sequential deliveries append separate rows and never overwrite an enquiry', () => {
  const script = receiver();
  assert.equal(script.post().ok, true);
  assert.equal(script.post({ ...valid, name: 'Second Visitor' }).ok, true);
  assert.equal(script.rows.length, 3);
  assert.equal(script.rows[1][1], valid.name);
  assert.equal(script.rows[2][1], 'Second Visitor');
});

void test('a full sheet expands before receiving another enquiry', () => {
  const script = receiver({ allocatedRows: 1 });
  assert.equal(script.post().ok, true);
  assert.equal(script.rows.length, 2);
  assert.deepEqual(script.calls, [
    'lock',
    'open',
    'expand',
    'append',
    'flush',
    'response',
    'release',
  ]);
});

void test('setup creates an absent tab, initializes headers, and freezes its first row', () => {
  const script = receiver({ rows: [], sheetExists: false });
  assert.match(script.initialize(), /ready/);
  assert.deepEqual(script.rows, [headers]);
  assert.equal(script.frozenRows, 1);
  assert.deepEqual(script.calls, [
    'lock',
    'open',
    'create',
    'header',
    'freeze',
    'flush',
    'release',
  ]);
});

void test('setup preserves existing data and does not reduce existing frozen rows', () => {
  const rows = [
    headers,
    [
      '2026-10-19',
      'Existing',
      'person@example.com',
      'Architecture',
      'Saved brief',
      'Existing source',
    ],
  ];
  const script = receiver({ rows, frozenRows: 2 });
  script.initialize();
  assert.deepEqual(script.rows, rows);
  assert.equal(script.frozenRows, 2);
  assert.ok(!script.calls.includes('header'));
  assert.ok(!script.calls.includes('freeze'));
});
