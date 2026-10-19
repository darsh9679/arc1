# Laptop hero imagery

These five WebP files are used by the home slideshow at widths of 901px and above. The phone portraits and tablet project photographs keep their existing sources.

| File                                    | Size       | Treatment                                                                 |
| --------------------------------------- | ---------- | ------------------------------------------------------------------------- |
| `thane-apartment-landscape-v1.webp`     | 1774 × 887 | Generated landscape edit with balanced light and cleaner framing          |
| `andheri-apartment-landscape-v1.webp`   | 1774 × 887 | Generated landscape edit with wider framing and neutral light             |
| `ghatkopar-apartment-landscape-v1.webp` | 1774 × 887 | Generated landscape edit with clearer materials and wider framing         |
| `ratnagiri-apartment-landscape-v1.webp` | 1774 × 887 | Generated landscape edit of the window-seat photograph                    |
| `anagha-salon-landscape-v3.webp`        | 1774 × 887 | Generated landscape edit with the seated woman and her reflection removed |

Generated scenes are labeled “AI-refined visual” in the laptop hero. Gallery originals remain under `public/images/projects/`.

The built-in image generation tool was used. Exact prompts, source paths, generation review notes and selected outputs are recorded in `outputs/imagegen/desktop-hero/thane-generation.json`, `andheri-ghatkopar-generation.json` and `ratnagiri-salon-generation.json`.

The salon was regenerated to remove the seated woman and her reflection from the fifth slide. Its selected v3 prompt and review are in `outputs/imagegen/desktop-hero/salon-v3-generation.json`. The optimized original `anagha-salon-landscape-v1.webp` remains available as a fallback. Earlier candidate history remains in the previous generation records, including `outputs/imagegen/desktop-hero/salon-v2-generation.json`. All selected WebP files retain their native aspect ratios and are exported at quality 90 without upscaling.

Replace a selected WebP using the same filename to update its laptop slide. Desktop crop positions are in `components/spotlight-hero.tsx`.
