import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook)
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
    if (new URL(webhook).protocol !== 'https:')
      throw new Error('Delivery endpoint must use HTTPS');
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.ENQUIRY_WEBHOOK_TOKEN
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
      }),
      signal: AbortSignal.timeout(8000),
      redirect: 'error',
    });
    if (!response.ok) throw new Error('Delivery unavailable');
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
