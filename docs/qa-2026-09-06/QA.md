# Visual and responsive QA — 6 September 2026

The portfolio was refined in the local Next.js project and checked in Chrome against a production build. The supplied SVG logo, approved client copy and AI concept disclosures were preserved. Nothing was deployed and no enquiry was sent.

## Changes

- Brighter architectural hero imagery, a cleaner two-line headline, readable 16px body copy and a restrained gold-and-olive palette.
- Correctly bounded SVG branding, improved page spacing, editorial image sections and clearer project captions.
- Project image heights now follow `clamp(260px, 52svh, 560px)`, with a 40px desktop stagger and no stagger on phones. The image and caption can be viewed together on a laptop.
- Fixed horizontal overflow from case-study hero aspect ratios and the recognition panel's minimum column width.
- Subtle desktop image parallax within fixed clipped frames; static imagery on narrow/coarse-pointer/reduced-motion layouts.
- Gallery arrow buttons and keyboard arrows control the desktop pinned sequence. Short desktop screens and phones use ordinary scrolling; short screens also avoid sticky process cards.
- Fixed a custom-cursor animation-frame cleanup race.

## Automated checks

| Check | Result |
| --- | --- |
| Production build and TypeScript compilation | Pass |
| Lint | Pass |
| Enquiry API tests with mocked delivery | 12/12 pass |
| Production HTTP smoke checks | All nine pages pass |
| Client copy, founder credentials, six process stages, ten enquiry fields | Pass |
| Seven concept assets, responsive image delivery, metadata and heading order | Pass |
| Unknown routes and disabled enquiry delivery | Pass |

## Browser checks

- Final checks covered all nine pages at 320 × 844, 390 × 844 and 1366 × 700 CSS pixels: **27 page/viewport combinations with no horizontal overflow or out-of-bounds heading boxes**. See `final-responsive-checks.json`.
- Additional responsive checks covered representative pages at 768px and 1025px, plus laptop sizes 1440 × 811 and 1536 × 864. See `responsive-checks.json` and `laptop-fit-checks.json`.
- At 1366 × 700, project images measured about 364px tall; the tallest complete first-row card, including its caption and grid alignment, measured about 530px. The final laptop screenshot shows both first-row images and captions within the viewport.
- Mobile menu opens and closes, navigation changes routes and closes the menu, and Escape returns focus to the menu button.
- Hero reveal and return controls switch the image/text state correctly.
- The Interiors filter shows two matching entries and exposes its selected state.
- Preparing an enquiry produces a local draft with all ten fields and an explicit **not sent** message. Dummy QA data was used; no delivery endpoint was configured.
- Mobile gallery buttons scroll the strip; desktop keyboard arrows move the pinned sequence in both directions. The comparison slider responds to keyboard arrows and updates its accessible percentages.
- Desktop hero parallax changed its vertical transform during actual browser scrolling. Mobile hero images had no transform. Mobile process cards remained in normal flow.
- Production browser checks showed no application errors in the inspected console history. Earlier development HMR/image-loading warnings were not production failures.

## Screenshots

- `before-home-desktop.png`: baseline before the visual refinements.
- `after-home-desktop.png`: refined desktop home.
- `after-laptop-projects.png`: complete project cards at laptop size.
- `after-home-mobile.png`: production home at 390 × 844.
- `after-studio-mobile.png`: mobile studio introduction.
- `after-contact-mobile.png`: mobile enquiry/draft interface.

## Limits and launch notes

Responsive browser viewports are not physical-device tests. Physical iOS/Android behavior and an operating-system reduced-motion setting should still be checked before launch. Reduced-motion queries and cleanup were reviewed in code; no OS preference emulation is claimed. Image parallax was verified visually and through rendered transforms, not benchmarked on low-power hardware.

The site remains a design preview. AI concept images are not evidence of completed projects, three case studies remain reserved, and enquiry delivery requires a configured and verified destination. The existing development preview on port 3000 is retained; the temporary production QA server is stopped after testing.
