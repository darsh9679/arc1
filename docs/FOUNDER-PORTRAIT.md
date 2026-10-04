# Founder portrait — 4 October 2026

The user supplied the actual founder photograph and requested a professional edit with her face preserved, then placement in the Studio founder section. Built-in imagegen edited that photograph with strict facial-identity, expression, hairstyle and pose constraints. The neutral plaster background replaces the patterned wall; the shoulder bag is removed; exposure and color balance are refined. The edited face was visually compared with the reference for likeness and expression. This is an edited photograph, not a pixel-identical copy of the original.

- Site asset: `public/images/studio/founder-sharvari-portrait-v1.webp`.
- Original supplied photo, preserved without edits locally: `docs/source-assets/founder-original.png`. Original editing references in this folder are excluded from Git; the edited site portrait is included.
- Dimensions: 1122 × 1402; WebP quality 92, approximately 130 KB, no resizing during encoding.
- The exact edit prompt and generated PNG source are recorded in [the provenance file](founder-portrait-provenance.json).
- `studio.portraitSrc` in `lib/content.ts` selects the edited image, and `portraitIsPlaceholder` is now `false`.
- The mobile founder image remains in place. Its top-aligned crop preserves headroom in the existing 230px phone and 360px larger-screen frames.
- The earlier fictional placeholder is unreferenced and retained at `public/images/studio/founder-portrait.png`; its historical generation record is in [the old placeholder guide](founder-portrait-placeholder.md).

To use another approved portrait later, save it in `public/images/studio/` and update `studio.portraitSrc`. Keep `portraitIsPlaceholder` false for genuine founder photography and review the alt text/crop when replacing the image. Use a new filename to avoid cached versions of the previous portrait. Rebuild/redeploy for production updates.

## Verification

Typecheck, lint and the production build passed. The Studio page and the portrait asset returned HTTP 200; the rendered page references the new image with founder alt text and suppresses the placeholder caption. The preserved original matches the supplied file's SHA-256 hash. The local preview initially failed on a locked Next development manifest; restarting only this project's verified preview processes restored it. Browser checks and screenshots then passed at 375 × 667 and 1366 × 900, with the face/head in frame and no horizontal overflow. See [QA and screenshots](qa-2026-10-04-founder-portrait/QA.md).
