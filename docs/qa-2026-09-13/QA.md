# Remaining-page refinement — 13 September 2026

Applied the laptop-fit treatment to Studio, Work, Recognition, Contact and all four case-study pages. The home page's previous treatment is preserved.

## Changes

- Compact page introductions use a headline/copy split on desktop and a readable single column on smaller screens.
- Work now presents the filterable portfolio before the experience section; all approved experience copy remains on the page.
- Studio panorama and founder-image frames, case-study heroes, galleries, comparisons, award artwork, moodboard tiles and contact maps have bounded screen-relative heights.
- Desktop section spacing is reduced without cropping biographies, enquiry fields or other long content. Mobile layouts retain normal vertical scrolling.
- Gallery captions wrap when needed. Existing parallax and reduced-motion behavior are preserved.

## Evidence

At 1366 × 700 CSS pixels, the Recognition introduction reduced from approximately 470px to 262px and its award section from 854px to 493px. The final screenshot shows the complete 420px artwork and all award details together. Project hero images are 336px tall, Studio's panorama is 364px, and a desktop gallery frame including its caption is approximately 394px.

`responsive-checks.json` records all eight routes at 320px, 390px, 768px, 1024px and 1366px widths: **40 combinations passed** horizontal-overflow, heading-boundary and oversized-visual checks. Phone/tablet height was 844px; laptop height was 700px.

`production-mobile-checks.json` confirms all eight production pages at 390 × 844 without horizontal overflow. Studio and project parallax images had no transforms on mobile.

## Validation

- Production build, including TypeScript: passed.
- Lint: passed.
- Enquiry server tests: 12/12 passed, using mocked destinations.
- Production smoke checks: all nine public pages, client copy, six process stages, founder credentials, ten enquiry fields, placeholder disclosures, responsive image delivery and error routes passed.
- Browser checks: mobile Interiors filter returns two entries; menu opens and Escape closes it; gallery arrow moves the strip; comparison responds to keyboard arrows and updates its accessible percentage.
- Desktop case-study parallax changed from translateY(-3.39px) to translateY(4.27px) during browser scrolling. The resized pinned gallery and its keyboard controls were checked.
- Screenshots cover every remaining page at laptop and mobile sizes, plus the mobile gallery and comparison.

## Scope and limits

These are browser viewport tests, not physical iOS/Android tests or hardware performance benchmarks. Reduced-motion safeguards were preserved; an operating-system reduced-motion preference was not emulated in this pass. Client text, real SVG identity, AI concept disclosures and reserved project statuses remain intact. Enquiry delivery remains unconfigured; no real enquiry was sent. No deployment was performed.

The local development preview remains on port 3000. The temporary production server on port 3001 is stopped after QA.
