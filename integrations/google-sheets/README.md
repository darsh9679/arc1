# Contact enquiries → Google Sheets

The contact form posts to `/api/enquiry`. The server validates the fields and
passes them to the Google Apps Script in `Code.gs`, which writes to a private
Google Sheet. Visitors never receive the deployment URL or shared token.

## Google setup

1. Open the enquiry spreadsheet. Its tab must be named **Enquiries** with these
   six headers in row 1, in this order:
   **Received at, Name, Email, Service, Project brief, Source**.
2. Choose **Extensions → Apps Script**. Replace the editor contents with
   [`Code.gs`](./Code.gs), save it, and name the script “Trayaksh enquiry receiver”.
3. In **Project Settings → Script properties**, add:
   - `SPREADSHEET_ID`: the ID between `/d/` and `/edit` in the spreadsheet URL.
   - `ENQUIRY_TOKEN`: a random secret of at least 32 characters. Use the same
     value as the website's `GOOGLE_SHEETS_WEB_APP_TOKEN`. Keep it out of source
     control, links, browser code and chat messages.
4. Run **initializeEnquiries** once and complete Google's authorization. This
   verifies the headers without overwriting existing enquiries or styling.
5. Choose **Deploy → New deployment → Web app**, **Execute as: Me**, and
   **Who has access: Anyone**. The receiver checks the shared token before any
   spreadsheet access. The spreadsheet itself stays private; do not enable
   public sharing on it. Copy the permanent deployment URL ending in `/exec`.

## Website setup

Set these **server-only** values in `.env.local` for local use and in
**Vercel → Project Settings → Environment Variables** for production:

```dotenv
GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_SHEETS_WEB_APP_TOKEN=the-same-secret-as-ENQUIRY_TOKEN
```

Restart the local server after configuration and redeploy Vercel after updating
its environment variables. Do not prefix these variables with `NEXT_PUBLIC_`.
Google Sheets takes priority over the older generic enquiry webhook.

Until both settings exist, the form keeps its explicit **draft only** mode.
It reports success only after the receiver confirms a completed spreadsheet
write. A failed connection retains a copyable/downloadable enquiry draft.

## What is saved

Each accepted enquiry adds a row with the time received, name, email, selected
service, project brief and the fixed source “Trayaksh Architeqts website”. Set
the spreadsheet time zone to **Asia/Kolkata** to display Mumbai local time.
Earlier optional enquiry fields are included in the project brief if present.
Visitor text resembling a formula is stored as literal text. Concurrent
submissions are written under a script lock.

The server handles Google's response redirect without forwarding credentials
to it and requires a JSON `{ "ok": true }` acknowledgement. A Google login
page or an error response never counts as successful delivery. Requests are
not automatically retried after an ambiguous timeout, to avoid duplicate rows.

## Verification

Run `npm run test:server`, `npm run typecheck` and `npm run lint`.
The server/receiver tests use a mocked destination and write no real leads.
After deploying, submit an explicitly labelled test enquiry through the form
and verify exactly one row appears in the sheet before relying on it for leads.

If changing the receiver later, update its existing deployment to the new
script version to keep the same `/exec` URL.

Google references: [Web apps](https://developers.google.com/apps-script/guides/web),
[Content Service redirects](https://developers.google.com/apps-script/guides/content),
[Script properties](https://developers.google.com/apps-script/guides/properties).
