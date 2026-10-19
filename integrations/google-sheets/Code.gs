// Deploy as a web app that executes as you and permits anonymous requests.
// Set SPREADSHEET_ID and ENQUIRY_TOKEN (at least 32 characters) in Script Properties.
// Run initializeEnquiries once, then use the deployed /exec URL on the website server.
const ENQUIRY_SHEET_NAME = 'Enquiries';
const ENQUIRY_HEADERS = [
  'Received at',
  'Name',
  'Email',
  'Service',
  'Project brief',
  'Source',
];
const ENQUIRY_SERVICES = [
  'Architecture',
  'Interior design',
  'Architecture & interiors',
  'Project management',
  'Vastu Shastra consultation',
  'Sustainability consultation',
  'Multiple services',
  'Something else',
];

function doPost(event) {
  let lock;
  try {
    const configuration = enquiryConfiguration();
    const contents = event && event.postData && event.postData.contents;
    if (
      typeof contents !== 'string' ||
      contents.length > 16000 ||
      Number(event.contentLength) > 48000
    ) {
      throw new Error('Invalid request');
    }
    const data = JSON.parse(contents);
    if (
      !data ||
      typeof data !== 'object' ||
      Array.isArray(data) ||
      typeof data.token !== 'string' ||
      data.token !== configuration.token
    ) {
      throw new Error('Invalid request');
    }

    const enquiry = validatedEnquiry(data);
    lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) throw new Error('Busy');
    const spreadsheet = SpreadsheetApp.openById(configuration.spreadsheetId);
    const sheet = spreadsheet.getSheetByName(ENQUIRY_SHEET_NAME);
    if (!sheet) throw new Error('Run initializeEnquiries first');
    ensureEnquiryHeader(sheet);

    const row = [
      new Date(),
      enquiryCellText(enquiry.name),
      enquiryCellText(enquiry.email),
      enquiryCellText(enquiry.interest),
      enquiryCellText(enquiry.brief),
      'Trayaksh Architeqts website',
    ];
    const nextRow = sheet.getLastRow() + 1;
    const allocatedRows = sheet.getMaxRows();
    if (nextRow > allocatedRows) sheet.insertRowsAfter(allocatedRows, 100);
    sheet.getRange(nextRow, 1, 1, ENQUIRY_HEADERS.length).setValues([row]);
    // Commit the write while the script still holds exclusive access.
    SpreadsheetApp.flush();
    return enquiryResponse(true);
  } catch (_error) {
    // Do not return or log contact details, configuration, tokens, or exception text.
    return enquiryResponse(false);
  } finally {
    if (lock) lock.releaseLock();
  }
}

function initializeEnquiries() {
  const configuration = enquiryConfiguration();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw new Error('The sheet is busy. Try again shortly.');
  try {
    const spreadsheet = SpreadsheetApp.openById(configuration.spreadsheetId);
    const sheet =
      spreadsheet.getSheetByName(ENQUIRY_SHEET_NAME) ||
      spreadsheet.insertSheet(ENQUIRY_SHEET_NAME);
    ensureEnquiryHeader(sheet);
    if (sheet.getFrozenRows() < 1) sheet.setFrozenRows(1);
    SpreadsheetApp.flush();
    return 'Enquiries is ready. Deploy the web app and configure its /exec URL on the website server.';
  } finally {
    lock.releaseLock();
  }
}

function enquiryConfiguration() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = properties.getProperty('SPREADSHEET_ID');
  const token = properties.getProperty('ENQUIRY_TOKEN');
  if (!spreadsheetId || !token || token.length < 32) {
    throw new Error('Set SPREADSHEET_ID and an ENQUIRY_TOKEN of at least 32 characters in Script Properties.');
  }
  return { spreadsheetId, token };
}

function ensureEnquiryHeader(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, ENQUIRY_HEADERS.length).setValues([ENQUIRY_HEADERS]);
    return;
  }
  const header = sheet.getRange(1, 1, 1, ENQUIRY_HEADERS.length).getValues()[0];
  if (
    sheet.getLastColumn() > ENQUIRY_HEADERS.length ||
    ENQUIRY_HEADERS.some(function (label, index) { return header[index] !== label; })
  ) {
    throw new Error('Enquiries headers do not match the required six columns.');
  }
}

function validatedEnquiry(data) {
  function text(key, maximum, required) {
    if (data[key] === undefined && !required) return '';
    if (typeof data[key] !== 'string') throw new Error('Invalid enquiry');
    const value = data[key].trim();
    if (value.length > maximum || (required && !value)) throw new Error('Invalid enquiry');
    return value;
  }
  const name = text('name', 120, true);
  const email = text('email', 254, true);
  const interest = text('interest', 100, true);
  const message = text('message', 5000, true);
  const location = text('location', 200, false);
  const contactNumber = text('contactNumber', 40, false);
  const projectType = text('projectType', 100, false);
  const approximateArea = text('approximateArea', 100, false);
  const projectStage = text('projectStage', 100, false);
  const approximateBudget = text('approximateBudget', 100, false);
  const website = text('website', 200, false);
  const phoneDigits = contactNumber.replace(/\D/g, '');
  if (
    name.length < 2 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    message.length < 20 ||
    ENQUIRY_SERVICES.indexOf(interest) === -1 ||
    website ||
    (contactNumber &&
      (!/^[+()\d .-]+$/.test(contactNumber) || phoneDigits.length < 7 || phoneDigits.length > 15))
  ) {
    throw new Error('Invalid enquiry');
  }
  const details = [
    ['Location', location],
    ['Contact number', contactNumber],
    ['Project type', projectType],
    ['Approximate area', approximateArea],
    ['Project stage', projectStage],
    ['Approximate budget', approximateBudget],
  ].filter(function (detail) { return detail[1] !== ''; });
  const brief = [message];
  if (details.length) {
    brief.push('');
    details.forEach(function (detail) { brief.push(detail[0] + ': ' + detail[1]); });
  }
  return { name, email, interest, brief: brief.join('\n') };
}

function enquiryCellText(value) {
  // A leading apostrophe stores formula-like input as text, including CSV export hazards.
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function enquiryResponse(ok) {
  const result = ok ? { ok: true } : { ok: false, error: 'Unable to save this enquiry.' };
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
