# Home page review — 3 October 2026

Reviewed the local home page by scrolling through its hero, studio introduction, portfolio, services, Why Trayaksh, award recognition, project invitation and footer.

## Result

- The hero identifies architecture and interior design and project types. The final phone refinement separates bright photography from a white copy panel. No headline or dark gradient covers the photo. The hero fills the available first screen, with the Studio section starting after scrolling, including at 320 × 500. Charcoal buttons and a restrained gold accent replace the previous pale-gold button and cream panel. Repeated practice geography remains in the Studio introduction on short screens.
- The introduction pairs a heading and studio link with a concise practice description and three perspectives. Original source copy remains in `lib/client-copy.ts` and `docs/client-content-source.json`.
- The four selected projects use aligned rows, readable captions and the supplied photographs.
- Services appear as four plain-language summaries alongside a credited illustrative image on tablet and laptop. Phones use a compact two-column grid without the decorative image or repeated quote. The Vastu summary retains the client preference and relevance qualifier. Full services, including sustainability, remain linked on Studio.
- The six supplied reasons for choosing the studio appear in a two-column olive section on larger screens. Below 600px, all six headings remain visible in a compact native disclosure list, with the complete explanations available on tap or keyboard activation.
- Recognition has a labelled section heading and retains the supplied award facts. The shared project invitation now says “Let’s talk about your project.”
- The automatic opening overlay is skipped on Home; manual replay remains available. The route curtain is hidden while idle. The development badge is disabled in project configuration; compiler and runtime errors still surface normally.

## Verification

- Production build, TypeScript check and lint passed.
- Browser review of the final hero at 1366 × 768, 320 × 500, 320 × 568, 375 × 550, 375 × 667, 390 × 844, 430 × 932 and 768 × 1024.
- No horizontal page overflow or clipped home-page headings, paragraphs or links at the checked sizes.
- Both mobile buttons have a minimum height of 46px on short screens and 48px otherwise, with no clipped labels. Their bottom is 550px at 320 × 568; the Studio section starts at 568px. At every checked mobile size, the Studio section starts at or below the viewport's bottom, and the buttons stay inside the first screen. Exact measurements are saved in `hero-clear-checks.json`.
- Confirmed no headline/photo overlap and no photo overlay. Checked all five project captions at 320px width; the count, location and navigation hint do not overlap.
- Verified mobile slideshow tap, ArrowRight and ArrowLeft controls: slide 3 → 4 → 3 → 4. The existing swipe handler remains in place; touch gestures were not exercised on physical hardware.
- Clicked both revised hero buttons and verified the Work and Contact routes.
- All home-page h1/h2 elements reported visible at opacity 1. No automatic introduction overlay was present on Home.
- Clicked “View all projects” and verified `/work`, then clicked “Explore all services” and verified `/studio#services` and its service heading.
- Calculated opaque color contrast: body/cream 12.43:1, secondary/cream 6.16:1, gold/cream 5.51:1, secondary text/dark olive 8.90:1. These ratios do not cover text over photography.
- Final phone hero contrast on white: charcoal headline 14.97:1, body 7.30:1, gold accent 5.34:1, caption 5.47:1 and geography 4.66:1. The primary button reverses charcoal and white.

Final hero screenshots: `hero-clear-desktop.jpg`, `hero-clear-375x667.jpg`, `hero-clear-320x568.jpg` and `hero-clear-430x932.jpg`. Earlier home and hero screenshots document previous review stages and are superseded for the phone hero. `mobile-review/` records the original short-screen problem.

Changes are local. No deployment, physical-device test or first-time visitor comprehension study was performed.

The subsequent phone-only Studio, services and Why Trayaksh review is documented in `mobile-sections/QA.md`, with before/after screenshots and exact measurements. Tablet and laptop section dimensions, heading sizes, columns and visible text matched the baseline at every checked larger width.
