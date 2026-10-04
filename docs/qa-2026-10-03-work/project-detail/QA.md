# Project detail layout review — 3 October 2026

The project opening now pairs a measured title block with the complete supplied photograph. The opening image uses `contain` and has no parallax scale or translation. Projects without an approved cover photograph use their project type and design language as a typographic overview.

Design intent retains the full approved description, with a smaller heading, charcoal body text and a compact two-column facts panel. The gallery remains the existing bounded viewer. The closing section combines an illustrated next-project card with a green and gold enquiry panel. That panel replaces the shared footer invitation on project detail pages; the footer directory and contact details remain available. Other pages retain their existing invitation.

## Verification

- Laptop at 1366 × 768 and wide laptop at 1920 × 912; tablet at 768 × 1024; phones at 375 × 667 and 320 × 667.
- Opening photograph computed as `object-fit: contain`, with no transform. No horizontal overflow at checked widths. Corrected extra opening space at tablet width.
- Four project facts remain visible and readable, including wrapping at the smallest phone width.
- Gallery shortcut aligns the gallery below the 100px anchor offset. Next-project navigation from Dahisar to Vikhroli and enquiry navigation to `/contact#project-enquiry` work in the browser.
- The footer invitation is hidden on the project detail page and remains visible on Contact.
- `npm run typecheck`, `npm run lint` and `npm run test:work` passed. Work and all seven current project routes returned 200, with bounded gallery rendering. The final production build passed after the responsive spacing adjustment.
- Arrow hover transitions are conditional on `prefers-reduced-motion: no-preference`.

## Screenshots

- [Laptop opening](opening-laptop-final.jpg)
- [Laptop design intent](design-intent-laptop-final.jpg)
- [Laptop ending](ending-laptop-final.jpg)
- [Phone opening](opening-phone-final.jpg)
- [Phone design intent](design-intent-phone-final.jpg)
- [Phone ending](ending-phone-final.jpg)
- [Small phone opening](opening-small-phone-final.jpg)
- [Tablet opening](opening-tablet-final.jpg)
- [Project overview without a supplied cover photo](opening-overview-phone-final.jpg)

Before screenshots of the opening, design intent and ending are retained in this directory for comparison.
