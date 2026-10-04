# Mobile hero portraits

Five portrait images were made with **built-in imagegen**, using the supplied Thane, Andheri, Ghatkopar, Ratnagiri and Anagha salon photographs as references. They extend and recompose the interiors for a phone screen, with space below the room for the headline and buttons. They are AI interpretations rather than documentary project photographs.

The home slideshow uses these files **only below 600px**. Tablet and laptop slides continue to use the original first gallery photographs. The full-screen mobile layout, compact dots and swipe controls are retained. Camera zoom is disabled on phones to protect the new framing; the larger-screen animation is retained. A small **AI portrait visual** caption and descriptive alternative text identify the generated images.

| Slide        | File                                                             | Dimensions | Size   |
| ------------ | ---------------------------------------------------------------- | ---------- | ------ |
| Thane        | `public/images/mobile-hero/thane-apartment-portrait-v1.webp`     | 864 × 1821 | 245 KB |
| Andheri      | `public/images/mobile-hero/andheri-apartment-portrait-v1.webp`   | 864 × 1820 | 145 KB |
| Ghatkopar    | `public/images/mobile-hero/ghatkopar-apartment-portrait-v1.webp` | 864 × 1821 | 149 KB |
| Ratnagiri    | `public/images/mobile-hero/ratnagiri-apartment-portrait-v1.webp` | 864 × 1821 | 141 KB |
| Anagha salon | `public/images/mobile-hero/anagha-salon-portrait-v1.webp`        | 864 × 1821 | 237 KB |

The exact five prompts, reference paths, preserved PNG paths and WebP encoding settings are in [the provenance record](mobile-hero-portrait-provenance.json). Encoding uses quality 88 without resizing or further creative editing. The five delivery files total approximately 916 KB. No runtime image generation or API key is required.

## Replace a portrait

Replace the corresponding WebP in `public/images/mobile-hero/` with an approved portrait image under the same name, then rebuild for production. These separate files are not automatically changed when a project gallery photo is replaced. Keep original project photographs in `public/images/projects/<project>/gallery/`; do not put generated portraits there.

When replacing the AI interpretations with actual photography, also update the mobile alternative text and the `AI portrait visual` caption in `components/spotlight-hero.tsx`. Use a portrait composition near 9:19, keeping the important room features above the lower headline area. A small amount of edge framing adapts to different phone heights; the wider landscape gallery photographs remain intact.
