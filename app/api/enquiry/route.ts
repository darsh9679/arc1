import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;
  const sheetsToken = process.env.GOOGLE_SHEETS_WEB_APP_TOKEN;
  const webhook = sheetsUrl || process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook || (sheetsUrl && (!sheetsToken || sheetsToken.length < 32)))
    return NextResponse.json(
      {
        error:
          'Delivery is not configured. Your enquiry has not been sent. Please save your draft, then call the studio or contact us on Instagram.',
      },
      { status: 503 },
    );
  try {
    if (Number(request.headers.get('content-length')) > 12000)
      return NextResponse.json(
        { error: 'Your enquiry is too long.' },
        { status: 413 },
      );
    const raw = await request.text();
    if (raw.length > 12000)
      return NextResponse.json(
        { error: 'Your enquiry is too long.' },
        { status: 413 },
      );
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || Array.isArray(data))
        throw new Error();
    } catch {
      return NextResponse.json(
        { error: 'Please send a valid enquiry form.' },
        { status: 400 },
      );
    }
    const string = (key: string) =>
      typeof data[key] === 'string' ? (data[key] as string).trim() : '';
    const name = string('name'),
      email = string('email'),
      interest = string('interest'),
      message = string('message'),
      location = string('location'),
      contactNumber = string('contactNumber'),
      projectType = string('projectType'),
      approximateArea = string('approximateArea'),
      projectStage = string('projectStage'),
      approximateBudget = string('approximateBudget');
    if (string('website'))
      return NextResponse.json(
        { error: 'Unable to process this enquiry.' },
        { status: 400 },
      );
    if (
      name.length < 2 ||
      name.length > 120 ||
      email.length > 254 ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      message.length < 20 ||
      message.length > 5000 ||
      location.length > 200 ||
      contactNumber.length > 40 ||
      (contactNumber &&
        (!/^[+()\d .-]+$/.test(contactNumber) ||
          contactNumber.replace(/\D/g, '').length < 7 ||
          contactNumber.replace(/\D/g, '').length > 15)) ||
      [projectType, approximateArea, projectStage, approximateBudget].some(
        (value) => value.length > 100,
      ) ||
      [
        'contactNumber',
        'projectType',
        'approximateArea',
        'projectStage',
        'approximateBudget',
      ].some((key) => key in data && typeof data[key] !== 'string') ||
      ![
        'Architecture',
        'Interior design',
        'Architecture & interiors',
        'Project management',
        'Vastu Shastra consultation',
        'Sustainability consultation',
        'Multiple services',
        'Something else',
      ].includes(interest)
    )
      return NextResponse.json(
        {
          error:
            'Please check your contact details and project enquiry fields, then try again.',
        },
        { status: 400 },
      );
    const destination = new URL(webhook);
    if (destination.protocol !== 'https:')
      throw new Error('Delivery endpoint must use HTTPS');
    if (
      sheetsUrl &&
      (destination.hostname !== 'script.google.com' ||
        !/^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(destination.pathname) ||
        destination.username ||
        destination.password ||
        destination.port ||
        destination.search ||
        destination.hash)
    )
      throw new Error('Invalid Google Sheets deployment URL');
    const signal = AbortSignal.timeout(sheetsUrl ? 20000 : 8000);
    let response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(!sheetsUrl && process.env.ENQUIRY_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        name,
        email,
        interest,
        message,
        location,
        contactNumber,
        projectType,
        approximateArea,
        projectStage,
        approximateBudget,
        source: 'Trayaksh Architeqts website',
        ...(sheetsUrl ? { token: sheetsToken } : {}),
      }),
      signal,
      redirect: sheetsUrl ? 'manual' : 'error',
    });
    if (sheetsUrl && [302, 303].includes(response.status)) {
      // ContentService returns the result through a one-time Google URL.
      // Retrieve it without forwarding the submission or its shared secret.
      const location = response.headers.get('location');
      if (!location) throw new Error('Missing Google response location');
      const resultUrl = new URL(location);
      if (
        resultUrl.origin !== 'https://script.googleusercontent.com' ||
        resultUrl.pathname !== '/macros/echo' ||
        resultUrl.username ||
        resultUrl.password
      )
        throw new Error('Unexpected Google response location');
      response = await fetch(resultUrl.href, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        redirect: 'error',
        signal,
      });
    }
    if (!response.ok) throw new Error('Delivery unavailable');
    if (sheetsUrl) {
      const confirmation: unknown = await response.json();
      if (
        !confirmation ||
        typeof confirmation !== 'object' ||
        !('ok' in confirmation) ||
        confirmation.ok !== true
      )
        throw new Error('Google Sheets did not confirm saving the enquiry');
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          'Your enquiry could not be sent. Please save the draft or try again later.',
      },
      { status: 502 },
    );
  }
}
