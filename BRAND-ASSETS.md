# Supplied studio identity

The user provided `../print (1).svg` and explicitly requested its use. An unchanged copy is preserved at `public/brand/trayaksh-original.svg`. This is client-supplied artwork, not an AI-generated or typeset substitute.

The source is a 960 × 768 SVG containing 172 outlined paths, with no fonts, scripts, event handlers, embedded images or external resources. Its large print margins are not suitable for a navigation bar. Delivery variants preserve the original path geometry and fill colors:

| Asset                                  | Treatment                                                                                                         | Placement                            |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `public/brand/trayaksh-horizontal.svg` | Original emblem and lettering arranged side by side, with their internal proportions unchanged; 596 × 152 viewBox | Header and footer                    |
| `public/brand/trayaksh-stacked.svg`    | Original stacked composition, cropped to viewBox `264 143 429 444` with clear space                               | Route curtain                        |
| `app/icon.svg`                         | Original emblem, cropped to viewBox `335 142 290 290` on the source's light background                            | Browser favicon                      |
| `app/apple-icon.png`                   | 180 × 180 raster of the emblem favicon                                                                            | Apple home screen icon               |
| `public/brand/social-card.svg`         | Native vector brand card using the horizontal logo and UI palette                                                 | Editable social-card source          |
| `public/og.png`                        | 1731 × 909 PNG render of the vector social card                                                                   | General Open Graph / Twitter preview |

Only the confirmed first full-canvas background path was removed in the horizontal and stacked versions. All other pale highlights and letter counters remain intact. Footer and curtain logos sit on the matching paper background; no filters, gold recoloring or artificial dark-background logo variant is applied. The original file in the parent folder is untouched.

`components/brand-logo.tsx` owns rendering and intrinsic dimensions. `lib/content.ts` owns the two logo URLs. Images inside labelled home links are decorative to avoid duplicate accessible names. The curtain is decorative and hidden from assistive technology. The header and curtain assets load eagerly; the footer can load lazily.

## Logo-derived UI colors

The five values remain centralized in `app/globals.css`. The paper comes from the source background, olive comes from the source lettering, and the deep ink and darker gold are UI adaptations chosen for readability. The brand artwork itself keeps every supplied color.

| Token    | Value     | Purpose                                         |
| -------- | --------- | ----------------------------------------------- |
| Paper    | `#FEFEFE` | Background; matches logo canvas                 |
| Ink      | `#020301` | Dark text and dark sections                     |
| Ink soft | `#556B2F` | Olive secondary text on paper                   |
| Accent   | `#9D6C14` | Accessible darker gold for controls and accents |
| Line     | `#DFE3D7` | Muted olive hairlines                           |

Calculated WCAG contrast: accent/paper **4.54:1**, accent/ink **4.52:1**, olive/paper **5.90:1**. These ratios apply to opaque colors; maintain the existing dark/light text roles when adding UI. The bright gold in the actual logo is an identity treatment, not a general-purpose text color.

The responsive lockups and palette are implementation adaptations of the supplied artwork, not a claim that a separate brand manual was supplied. To use revised official lockups later, replace the two SVGs and update their intrinsic sizes in `BrandLogo` if their proportions differ. Regenerate favicon, Apple icon and social preview at the same time.

The approved written identity, including “Three-Eyed Vision” and “Design that sees beyond the obvious,” was subsequently supplied in `Recommended brand descriptor.docx`. Its provenance and content mapping are recorded in `CLIENT-CONTENT.md`; the logo and brand copy are both supplied assets, not outstanding placeholders.
