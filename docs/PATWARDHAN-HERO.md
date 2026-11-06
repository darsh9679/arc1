# Patwardhan House hero update

The client-supplied replacement was a valid PNG named `.jpeg`. Its extension
and `metadata.json` entry were corrected to `.png` without changing its bytes.
The original is backed up under `docs/source-assets/patwardhan-hero-2026-11-06/`.

The built-in image generation tool made two compositions from that reference:

- `public/images/desktop-hero/patwardhan-house-landscape-v1.webp` — 1672 × 941,
  447,938 bytes. Wide house and garden view, with space for the lower-left copy.
- `public/images/mobile-hero/patwardhan-house-portrait-v1.webp` — 948 × 1659,
  381,216 bytes. Whole house in the upper-middle with foreground for mobile copy.

Both use WebP quality 82, with no upscaling. The project gallery keeps the
client-supplied image; the two reframed versions are only hero assets.

Prompt direction: faithfully reframe the supplied laterite-brick house, preserve
roof geometry, openings, materials and camera direction, extend sky and garden
for wide and portrait screens, retain natural daylight, and add no text or UI.
The exact prompt set and source paths are saved locally in
`outputs/patwardhan-hero-2026-11-06/generation.json`.
