# Laptop hero imagery

These five WebP files are used by the home slideshow at widths of 901px and above. The phone portraits and tablet project photographs keep their existing sources.

| File                                    | Size       | Treatment                                                                 |
| --------------------------------------- | ---------- | ------------------------------------------------------------------------- |
| `thane-apartment-landscape-v1.webp`     | 1774 × 887 | Landscape composition with balanced light and clean framing               |
| `andheri-apartment-landscape-v1.webp`   | 1774 × 887 | Landscape composition with wide framing and neutral light                 |
| `ghatkopar-apartment-landscape-v1.webp` | 1774 × 887 | Landscape composition with clear materials and wide framing               |
| `patwardhan-house-landscape-v1.webp`   | 1672 × 941 | Supplied house design reframed with the complete roof and surrounding garden |
| `anagha-salon-landscape-v3.webp`        | 1774 × 887 | Landscape composition of the salon with empty seating                     |

Desktop hero images are separate from gallery originals under `public/images/projects/`. All selected WebP files retain their native aspect ratios without upscaling. Patwardhan House uses quality 82; the earlier exports use quality 90.

Patwardhan House also has a dedicated 948 × 1659 phone composition at
`public/images/mobile-hero/patwardhan-house-portrait-v1.webp`. Tablet layouts use
the supplied gallery PNG. The previous Ratnagiri hero files are retained but
are no longer in the slideshow.

Replace a selected WebP using the same filename to update its laptop slide. Desktop crop positions are in `components/spotlight-hero.tsx`.
