# Award and navigation refinement — 3 October 2026

The navbar uses the supplied logo, stable navigation labels, a restrained olive Contact action, and social icons. The phone header retains its 72px height so the previously refined hero still fits the first screen. The mobile menu has five 52px navigation rows and four 44px social icon targets. It fits a 320 × 500 viewport without internal scrolling. Larger screens retain the existing Studio, services and Why Trayaksh layouts.

The award panel uses a small decorative award icon, a separate recognition/year label, the full supplied award title, category/location and a clear link. On phones the heading uses the full card width instead of being squeezed beside the old D&V seal.

Instagram is the confirmed linked profile. Facebook, LinkedIn and YouTube are explicitly requested icons with no links yet; they are semantic text/icon elements rather than dummy anchors. URLs can be supplied in `lib/social-profiles.ts` later.

## Verification

- Checked 320 × 500, 375 × 667, 430 × 932, 768 × 1024, 901 × 768 and 1366 × 768. No horizontal overflow or navbar overlap.
- Escape closes the phone menu and restores focus to its toggle.
- Work navigation reaches `/work` and closes the menu.
- Confirmed the Instagram destination and new-tab attributes; pending profiles have no anchors.
- `npm run typecheck`, `npm run lint` and `npm run build` passed.

## Screenshots

- `navbar-before.jpg`, `award-before.jpg`: original phone views.
- `navbar-after-375x667.jpg`, `menu-after-375x667.jpg`: final phone navbar and menu.
- `menu-after-320x500.jpg`: short-screen phone menu.
- `award-after-375x667.jpg`: final phone award panel with surrounding sections.
- `navbar-after-desktop.jpg`, `award-after-desktop.jpg`: laptop review.
- `responsive-checks.json`: responsive dimensions.
