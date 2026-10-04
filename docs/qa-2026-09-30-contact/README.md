# Contact page redesign and QA

Implemented 30 September–1 October 2026.

## What changed

- The form sits beside the introduction on desktop and before the studio/address section on mobile.
- The header uses a prominent Contact button on desktop and a visible Enquire shortcut outside the mobile menu. The mobile shortcut and footer primary action target `#project-enquiry` directly.
- Essential fields appear first. All ten client-requested fields remain available; five optional project fields use a native expandable details section.
- Bordered controls, consistent 16px input text, generous touch targets, an olive action button and clearer result feedback replace the old underline-only form.
- Direct phone contact is prominent. Studio details and privacy-gated map remain below the form. No invented email, opening hours or response-time promise was added.

## Verified

- Browser inspection at 1366×768, 768×1024, 390×844, 320×740 and 568×320: no horizontal page overflow.
- Mobile header logo, Enquire and menu fit at 320px. Enquire and menu controls are at least 44px high.
- Short landscape navigation is bounded by the viewport and scrolls internally; Escape closes it and restores menu-button focus.
- The Enquire shortcut works on the contact page and from the homepage. It lands at the form, about 100px below the viewport top.
- Required-field validation focuses the empty name field instead of creating a draft.
- The optional section opens and exposes location, project type, area, stage and budget.
- A local-only sample enquiry retained all entered values in the draft, announced that it was not sent and moved focus to its visible result. The sample was cleared afterwards.
- Production build, lint, TypeScript, all 12 enquiry unit tests and all nine route smoke checks passed. The smoke checks preserve all ten field names and their labels.
- No application errors appeared in the inspected browser log. Development-only Fast Refresh reload warnings occurred while editing.
- Temporary viewport overrides were reset.

## Delivery limitation

`ENQUIRY_WEBHOOK_URL` is not configured. This page prepares a copyable/downloadable draft and offers direct contact; it does not send or store the enquiry. A production email/CRM integration is still needed before accepting online submissions. No external enquiry, phone call, Instagram message or map request was sent during QA.

Browser QA used Chromium viewport sizes, not physical iOS/Android devices. Live delivery was not tested; server tests use mocked delivery.

## Screenshots

- `before-desktop.png`, `before-mobile.png`: original page.
- `after-desktop.png`, `after-tablet.png`, `after-mobile.png`, `after-mobile-320.png`: revised layouts.
- `draft-feedback-mobile.png`: local sample draft feedback.
