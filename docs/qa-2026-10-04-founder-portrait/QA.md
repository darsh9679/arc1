# Founder portrait review — 4 October 2026

## Result

The supplied founder photograph replaces the earlier fictional placeholder in Studio. Built-in imagegen simplified the background, removed the shoulder bag and refined color balance, with explicit facial-identity and expression constraints. The edited likeness was visually compared with the supplied image. The original photograph is preserved without edits; this is not a claim of pixel-identical generated facial detail.

- Final asset: `public/images/studio/founder-sharvari-portrait-v1.webp`, 1122 × 1402, 130,442 bytes.
- The supplied original and `docs/source-assets/founder-original.png` have matching SHA-256 hashes.
- `studio.portraitIsPlaceholder` is false; the temporary caption is absent and founder alt text is present.
- Top-aligned image positioning preserves her hair/head in the existing mobile and laptop frames. Founder copy, credentials and the laptop process animation were not changed.

## Checks

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; all 17 static pages generated.
- Local Studio page: HTTP 200; edited portrait filename and founder name present; temporary caption absent.
- Local edited image: HTTP 200, `image/webp`, 130,442 bytes.
- Laptop, 1366 × 900: edited portrait loaded, full head visible, biography beside the portrait, no horizontal overflow.
- Phone, 375 × 667: edited portrait loaded in the 230px image frame, full head/face visible, name/credentials/biography below, no horizontal overflow.
- Initial preview navigation failed while the local development server had an `EBUSY` error reading its generated manifest. Only this project's verified Next preview processes were restarted. The server then served the page successfully and the same browser navigation completed; no alternate browser-control mechanism was used.

These are browser viewport checks, not physical-device tests. Temporary viewport overrides were reset after the review. No deployment was performed.

## Evidence

- [Laptop founder section](founder-laptop-1366x900.jpg)
- [Phone founder section](founder-phone-375x667.jpg)
- [Portrait file and exact edit prompt](../FOUNDER-PORTRAIT.md)
