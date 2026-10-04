# Simplified hero controls — 4 October 2026

Removed the boxed previous/next arrows, numeric counter and pause/resume button. Five small dots select the featured photographs; the current dot expands into a short line. No borders or background boxes surround the dots. Removing the full-width divider and reducing bottom content padding gives the photograph more space.

Automatic switching remains on initial load. Selecting a dot or swiping changes the photograph and holds the visitor's selection. Reduced motion still disables automatic switching and image motion. Dot buttons remain available in reduced-motion mode.

Verified in the local browser:

- At 375 × 667, both calls to action and the photo location/dots fit within the hero; no horizontal page overflow.
- At 1366 × 768, the dot row is small and unboxed; no horizontal page overflow.
- Clicking the Ghatkopar dot selected slide 3 and stopped automatic switching.
- Keyboard Enter on the Thane dot selected slide 1. Selected state is exposed with `aria-pressed` and each button has a project-specific label.
- Arrow and pause buttons no longer appear in the hero accessibility tree.
- `npm run typecheck` and `npm run lint` passed.
- `npm run build` passed; all 17 static pages generated.

Screenshots: [phone](mobile.jpg), [laptop](laptop.jpg). These supersede the arrow-control screenshots from the earlier modern-home review.
