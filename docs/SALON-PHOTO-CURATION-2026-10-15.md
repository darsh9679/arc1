# Salon photograph curation — 15 October 2026

Six photographs from the supplied salon shoot replace the existing **Anagha’s Salon & Academy** gallery. Visible signage reads **Welcome Beauty Family Salon & Spa**, which differs from the existing project name. After this mismatch was identified, the user explicitly instructed: **“Replace the existing Anagha gallery.”** The shoot is assigned to that project on this basis. Its supplied project title and location remain unchanged; the description and fallback caption now reflect the timber, arched mirrors, terracotta seating and service areas visible in the selected photographs.

The six WebP exports and matching captions are installed in `public/images/projects/anagha-salon/gallery/` and its project-level `metadata.json`. The replaced gallery photograph and previous metadata are backed up in `docs/source-assets/salon-import-2026-10-15/previous-website/anagha-salon/`.

| Supplied files | Selected JPG photographs | Unused JPG photographs preserved | Editable PSD preserved |
| ---: | ---: | ---: | ---: |
| 68 | 6 | 61 | 1 |

All 68 source files are safely archived, with their original nested filenames, in `docs/source-assets/salon-import-2026-10-15/originals/`. The six selected WebP exports total **2,037,558 bytes** (approximately 2.04 MB).

## Selected views

Source names below are relative to the originals archive; export names are relative to the public Anagha gallery. Their numbered order determines the six gallery captions and jump-selector items.

| Original source | Gallery export | Gallery caption / jump-selector title | Selection rationale |
| --- | --- | --- | --- |
| `IMG_8858.jpg 1/IMG_8868.jpg` | `01-reception-and-styling.webp` | Reception and styling floor | An empty overall view introduces the reception and styling floor together, showing the fluted timber counter, orange chairs and illuminated arched mirrors. |
| `DSC09644/DSC09648.jpg` | `02-staircase-and-display.webp` | Staircase and display joinery | A distinct vertical composition shows the staircase and integrated illuminated product shelves, planters and suspended black rods. |
| `DSC09375/DSC09405.jpg` | `03-pedicure-lounge.webp` | Pedicure lounge | The paired cream pedicure chairs, terrazzo platform and sculptural timber screen document a separate service area. |
| `DSC09375/DSC09460.jpg` | `04-nail-studio.webp` | Nail studio | Pink manicure seating, the fluted desk and arched polish display add a clearly different function and material composition. |
| `DSC09644/DSC09666.jpg` | `05-shampoo-area.webp` | Shampoo area | The two caramel shampoo chairs and white basins show the wash area and its illuminated storage without repeating the styling-floor view. |
| `DSC09375/DSC09463.jpg` | `06-treatment-room.webp` | Private treatment room | The private pink treatment room completes the sequence with the bed, timber cabinetry and blue glass enclosure. |

The selection favours empty architectural views and coverage of distinct spaces. Portraits, reflected or partly obscured people, ceremonial subjects, repeated angles and weaker detail views were excluded. All excluded originals remain recoverable. The PSD is retained as an editable source and is not a supported public gallery image.

The first view supplies the project card, detail-page cover, social preview and tablet homepage scene (600–900 px). The separate desktop homepage hero, `public/images/desktop-hero/anagha-salon-landscape-v3.webp`, and mobile hero, `public/images/mobile-hero/anagha-salon-portrait-v1.webp`, remain unchanged.

## Review and recovery

- Selection preview: [six selected salon views](qa-2026-10-15-salon-curation/selection.jpg).
- Original source archive: `docs/source-assets/salon-import-2026-10-15/originals/`.
- Per-file decisions, original SHA-256 hashes and export details: `docs/source-assets/salon-import-2026-10-15/curation-manifest.json`.
- Previous website gallery and metadata: `docs/source-assets/salon-import-2026-10-15/previous-website/anagha-salon/`.
- Export working copies and caption records: `outputs/photo-curation-2026-10-15-salon/`.

## Validation

- Image sync passed: **eight photographed project folders and 33 gallery images**, including six Anagha photographs.
- The salon route serves six selected WebPs successfully, with six thumbnail controls and descriptive jump-selector entries. The previous gallery image is absent from the rendered page.
- Work and all ten project routes passed the existing bounded-gallery smoke checks.
- TypeScript checking passed. All 68 archived source files match their pre-move SHA-256 hashes; the previous Anagha gallery and metadata are preserved.
