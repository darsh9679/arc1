# Work and gallery QA — 3 October 2026

## Result

The conflicting twelve-column spans and three-column grid have been replaced by a scoped, uniform portfolio browser. Home and Recognition retain their featured-grid styling. Work shows six records per page, filters and searches across the approved data, and derives the project count automatically. Twenty-five test-only project records occupy five pages, with each record reachable exactly once. The current website still contains seven approved projects.

The project gallery is a bounded viewer with six thumbnails per set and a direct image selector. Laptop thumbnails form a sidebar; at 900px and below, they sit below the photo. All twelve images in the checked Ghatkopar collection remain reachable. Source and provenance labels distinguish the supplied project photo from its eleven illustrative references. Empty galleries remain explicitly labelled. The photograph uses contain in both the page viewer and full-screen viewer.

Observed gallery height at 1366 × 768: approximately **3,812px before, 657px after**. At 375 × 667: approximately **3,957px before, 680px after** with the initial project photo selected. Caption length can vary the height slightly. Adding photos does not add another vertical gallery row. On the final 375px phone Work view, the first photograph begins around 475px, compared with around 696px in the first revision at 375 × 812.

## Browser verification

- Laptop grid: three equal columns at 1366px and 1920px, two at tablet widths and one at narrow phone widths. No page horizontal overflow observed at 320, 375, 599, 600, 768, 1024, 1366 and 1920px. Visible heading and caption boundaries were checked; hidden screen-reader headings were excluded.
- Pagination: the second page exposes the seventh project, with a bounded result count and keyboard focus returned to the collection. Filtering from page two resets to page one.
- Laptop category buttons, phone native category selector, location search, combined search/category empty state, reset and clear-search control were exercised.
- Gallery previous/next arrows, both thumbnail pages, direct jump to image twelve, thumbnail selection and keyboard Left/Right and Home/End were exercised. Last-image next controls disable correctly.
- The full-screen dialog opens at the selected image, offers its own image selector and arrows, and closes with Escape. Focus returns to the image button and page scrolling remains in place.
- The gallery shortcut scrolls beneath the shared header padding. Route-curtain effect cleanup now clears a stale busy flag when an effect is replaced during preview updates.
- Reduced-motion styling was reviewed: card/image animations are conditional and every manual control remains usable. Physical-device gestures, OS reduced-motion emulation and assistive-technology testing were not performed in this run. Touch swipe handling preserves native vertical scrolling and pinch zoom in the implementation.

## Automated verification

- `npm run typecheck` — passed.
- `npm run lint` — passed.
- `npm run test:portfolio` — five tests passed, including twenty-five project records, search/category/page boundaries and twenty-four/twenty-five image indexes.
- `npm run test:work` — Work and all seven current case-study routes passed. Only six project cards and at most six thumbnails render initially. Every gallery selector still contains the whole collection.
- `npm run build` — passed with all seven project routes generated.

The older general smoke script targets the superseded four-project portfolio; this run uses the focused current-route check above. No production deployment was requested or performed. Studio content, founder image and laptop process animation were not changed.

## Screenshots

- `work-laptop-before.jpg` / `work-laptop-final.jpg`
- `work-phone-first-pass.jpg` / `work-phone-final.jpg`
- `gallery-laptop-before.jpg` / `gallery-laptop-final.jpg`
- `gallery-phone-before.jpg` / `gallery-phone-final.jpg`
- `gallery-phone-fullscreen.jpg`

The final phone gallery screenshot uses 375 × 812; the compact-layout height above was also measured at 375 × 667. Earlier first-pass files are retained as review evidence.
