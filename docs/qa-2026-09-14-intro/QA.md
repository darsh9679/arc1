# Replacement introduction — 14 September 2026

This replaces the black geometric introduction documented on 13 September.

## Changes

- Pale editorial composition with the original SVG logo, the client's tagline, and a local material-study image. The image remains visibly labelled as an AI concept.
- A clipped image reveal, subtle image settling, masked text entrance, and a soft fade into the site. Total timeline: 1.8 seconds. No circles, architectural drawings, or simulated progress counters.
- Matching pale page transitions with a small horizontal logo; the previous geometric route graphic is removed.
- Skip is visible and focusable from the first frame, outside all entrance animations.
- Once-per-session playback uses a new versioned storage key, so returning visitors can see the replacement. Footer replay remains available.
- Existing Escape/Tab/Skip dismissal, focus restoration, inert and overflow cleanup, reduced-motion handling, and a 2.4-second failsafe are retained. The intro never waits for the image to load.

## Verification

- Production build, TypeScript compilation and lint pass.
- Production smoke suite: all 9 pages, metadata, client copy, forms, asset and provenance checks pass.
- First visit shows the introduction. A same-session reload skips it.
- Natural completion restores scrolling and clears the dialog/inert state.
- Skip, Escape and Tab dismiss it, returning focus to the replay button when invoked there.
- Skip's computed opacity is 1 during the entrance and its height is 44px.
- The material image loads in the tested local preview; the pale fallback and nonblocking image behavior were reviewed in code. Slow-network throttling was not simulated.
- At route commit the transition uses the pale background, with no old geometric drawing. After exit it is one viewport below the screen with pointer events disabled.
- No browser console errors observed.

## Responsive review

Desktop screenshot: 1366×768. Mobile screenshot: 390×844.

Also checked 320×568, 768×1024, 844×390 and 568×320. An overlap at 568×320 was found and corrected by using the side-by-side landscape layout. At the extreme 320×320 size the decorative image is hidden to protect the text and Skip control. Final small-screen measurements are saved in `responsive-checks.json`.

Checks used Chromium viewport overrides, not physical iOS/Android hardware. Reduced motion was verified by code review rather than an operating-system preference toggle.

The temporary production QA server was stopped after checks. Development preview remains available on port 3000. No deployment or live enquiry submission was performed.
