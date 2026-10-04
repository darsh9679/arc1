# Studio redesign and QA

## Changes

- Replaced the stacked introduction with a balanced image-led opening. The complete hero image fits alongside the headline and introduction at 1366 × 700.
- Moved the full approved practice introduction into the practice section, with a clearer lead paragraph and readable editorial columns.
- Introduced a compact founder summary and a keyboard-accessible full-biography disclosure. All six client biography paragraphs remain available. Opening or closing the biography refreshes scroll-animation measurements.
- Added a contrasting philosophy panel, an image-backed design-philosophy quote, structured principles, and a subtle background for services.
- Preserved the real logo, approved copy, four services, seven principles, six process stages and truthful AI-image labels. The material image remains explicitly identified as a substitute for the unavailable founder portrait.
- Styles are scoped to Studio through its CSS module; the other pages are unchanged in this pass.

## QA results

- Production build and TypeScript compilation passed.
- Lint and all 12 enquiry server tests passed.
- Production smoke tests passed across all nine pages, client copy, process stages, founder credentials, enquiry fields, assets, metadata and error routes.
- Responsive checks passed at 320 × 740, 390 × 844, 768 × 1024, 1024 × 700, 1366 × 700 and 1440 × 900: no horizontal overflow or out-of-bounds headings; all six process cards remain present. See `responsive-checks.json`.
- Production browser tests confirmed biography expansion/collapse by keyboard, five additional paragraphs in the expanded disclosure, section-link navigation, and mobile menu dismissal with Escape.
- Desktop hero parallax changed from translateY(0.12px) to translateY(8.25px) during scrolling. Mobile imagery had no transform and all six process cards stayed in normal flow.
- The desktop philosophy panel measures approximately 619px tall at a 700px viewport height.

## Screenshots

- `before-laptop.png`: previous Studio opening.
- `after-laptop.png`: redesigned laptop opening.
- `after-mobile.png`: redesigned opening at 390 × 844.
- `philosophy-laptop.png`: contrasting philosophy section.
- `design-philosophy-laptop.png`: image and editorial copy.

These are browser viewport checks, not physical-device tests. Operating-system reduced motion was not emulated; the existing reduced-motion guards remain intact. No enquiry was sent and no deployment was performed. The local development preview remains on port 3000; the temporary production QA server is stopped after testing.
