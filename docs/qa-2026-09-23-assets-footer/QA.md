# Image folders, galleries and footer QA

Completed 24 September 2026, continuing the footer review begun on 23 September.

## Delivered

- Four project-specific photo folders, each with a `gallery/` directory and optional `metadata.json`.
- Automatic discovery before dev/build, plus `npm run images:sync` for an already running preview. Natural filename sorting, detected image proportions, captions, alt text and optional gallery crop positions.
- Optional hero, thumbnail, hover and matched before/after files. Adding photos does not confirm reserved project facts. Existing concepts remain when folders are empty.
- Content-versioned image URLs and a narrowly scoped local image rule for query strings under `/images/projects/`. Replacing image bytes under the same filename refreshes the optimized-image cache key. Manifest writes are atomic so a watcher cannot read a partially written file.
- Small galleries retain the desktop pinned sequence. Collections over six photos use native horizontal scrolling with image counts, keyboard controls, arrow buttons and disabled endpoints. Horizontal gestures are excluded from Lenis interception. Supplied before/after pairs also work for architecture projects.
- A light editorial footer with the supplied SVG logo, project-enquiry CTA, navigation, verified contact details and compact utilities.

## Verified

- Production build and TypeScript compilation pass; full lint passes.
- All 11 image-discovery tests pass, including more than ten photos, natural sorting, EXIF orientation, URL encoding, malformed metadata, corrupt images, pairing and same-filename replacements.
- All 12 existing enquiry tests pass with mocked delivery only.
- Nine-page HTTP smoke checks pass with default concepts, a temporary 12-image collection, a single-image gallery and a supplied architecture before/after pair.
- Versioned photo URLs render in page metadata and gallery markup, are served by Next Image, and change when the same filename is replaced. Photo-mode smoke checks pass after replacement.
- Browser checks at laptop 1366 × 768 and mobile 390 × 844 / 320 × 740: no horizontal page overflow in the tested footer and gallery layouts. The large collection scrolls sideways, arrow and keyboard navigation work, and the last-image button disables correctly.
- The original four-image gallery still pins and scrubs on desktop (observed track transform changes while scrolling); mobile uses native overflow without pinning.
- Footer replay opens the introduction, Escape restores focus and removes inert state, and Back to top returns focus to main content. Confirmed in the production preview.
- No browser console errors were reported during the production gallery check.
- A separate development-only initialization problem left controls inactive under Turbopack. Switching the dev command to `next dev --webpack` and reloading restored the mobile menu's expanded state and client interactions. Production builds remain unchanged. The old router-initialization error was captured before the runtime switch.

Temporary QA photographs were removed. The generated project-photo manifest is `{}`; the original labelled concept images are still the delivered content.

## Screenshots

- `footer-desktop.png`: desktop footer.
- `footer-mobile.png`: mobile footer.
- `gallery-mobile.png`: restored concept gallery with navigation and image count.

Responsive checks use browser viewports, not physical phones. Reduced-motion behavior was reviewed in code; an operating-system preference change and physical iOS/Android testing were not performed in this pass. No deployment or real enquiry submission was performed.
