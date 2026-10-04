# Visual and motion refinement — 13 September 2026

## Delivered

- A short, once-per-session brand introduction: drawn architectural geometry, staggered typography, the supplied SVG logo, and an upward curtain exit. No simulated loading percentages.
- A visible Skip control, Escape/Tab dismissal, a 2.4-second failsafe, optional session storage, focus restoration, and a footer replay control. The page remains visible in server-rendered HTML when JavaScript is unavailable.
- A redesigned Work opening, asymmetric 7/5-column portfolio composition, viewport-capped imagery, refined numbering, hover reveals, circular project arrows, and a larger footer wordmark.
- Route-aware heading reveals, with refreshes after images, fonts, disclosures, and filtering. Existing Studio design and parallax are preserved.
- Corrected the route curtain's doubled CSS/GSAP vertical offset. Competing route tweens are cancelled and stale callbacks cannot reopen the overlay.
- Client copy, original logo artwork, confirmed project facts, and AI/placeholder disclosures preserved. No invented awards or completed projects.

## Automated checks

- Production build and TypeScript compilation: pass.
- Oxlint: pass.
- Enquiry server tests: 12/12 pass; no live enquiry submitted.
- Production smoke suite: all 9 pages pass, plus metadata, heading structure, client content, six process stages, enquiry fields, 404s, image assets and provenance checks.
- Browser layout sweep: 9 routes at 320×740, 768×1024, and 1366×700. All measured document scroll widths equal the viewport content widths; no horizontal overflow or broken loaded images. Raw measurements are in `responsive-checks.json`.

## Browser interaction checks

- First-session introduction appears; a same-session reload does not replay it.
- Natural completion removes the dialog and restores page scrolling.
- Skip, Escape and Tab remove the dialog and clear the page's inert state. Replaying from the footer returns focus to the replay button on dismissal.
- At a 390×844 viewport, intro title and Skip control fit inside the overlay; Skip remains at least 44px high.
- Project filtering: Interiors shows the two expected entries; All work restores four.
- Portfolio disclosure expands to the full explanatory copy and collapses again.
- Mobile menu opens; Escape closes it and restores its trigger.
- Project and Studio links navigate through the new curtain. At route commit its measured vertical offset is approximately zero; after exit it is one viewport below the screen with pointer events disabled. Browser Back also works.
- Studio desktop parallax translation changes from approximately 0.33px to 9.32px during scrolling while its image remains scaled to cover the frame. At mobile width all three image transforms are `none`.
- No browser console errors observed in the production QA tab.
- At 1366×700 the first two complete project cards measure approximately 509px and 460px high. At 390×844 the first complete card measures approximately 493px high.

## Screenshots

- `opening-laptop.png`: introduction near its fully drawn keyframe.
- `route-transition.png`: curtain covering the screen during route commit.
- `work-laptop.png` and `work-mobile.png`: portfolio openings.
- `portfolio-laptop.png` and `portfolio-mobile.png`: complete cards and captions.
- `footer-laptop.png`: brand signoff and replay control.

## Scope and limitations

Browser checks used the local in-app Chromium browser with responsive viewport overrides, not physical iOS/Android devices. Reduced-motion behavior was reviewed in code: the opening is skipped, heading animations revert through GSAP matchMedia, the curtain is hidden, and desktop parallax is disabled. An operating-system reduced-motion toggle was not exercised in this pass. The final temporary production QA server is stopped; the development preview remains on port 3000. No deployment or live form submission was performed.
