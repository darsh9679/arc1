# Full project-shoot curation — 15 October 2026, round 2

The three re-uploaded collections contained 219 readable photographs. Every contact-sheet page was reviewed and shortlisted sources were inspected at larger size. No corrupt image files or exact byte duplicates were found.

| Source collection | Reviewed | Published | Archived unused |
| --- | ---: | ---: | ---: |
| Pant Nagar, Ghatkopar | 80 | 6 | 74 |
| Andheri DN Nagar | 55 | 6 | 49 |
| Amol Pawar / existing Ratnagiri apartment | 84 | 5 | 79 |
| Total | 219 | 17 | 202 |

The selected galleries replace the previous four-image sets. Only these 17 selected photographs are in the three public gallery folders. All 219 supplied originals and the replaced website galleries remain recoverable outside public/. The other five photographed project folders were preserved.

## Editorial decisions

- Ghatkopar: the overall living/TV/prayer view leads, followed by dining, kitchen storage, the blue bedroom, blush daybed room and empty study nook. Repeated angles, candid portraits, fragments and weaker styling details were excluded.
- Andheri: a complete living-room composition with closed curtains is the cover. Dining, kitchen, both bedrooms and a prayer-alcove detail create a varied six-image set. Bathroom, hallway, portrait and repeated bedroom views were excluded.
- Amol Pawar: the original DSC03540.JPG replaces the old 688 × 492 window-seat derivative. The native source is 6000 × 3376. Media wall, timber swing, window-seat detailing and illuminated artwork complete the five-image set. Portable-fan sofa views, reflected photographer shots, isolated styling fragments and portrait sequences were excluded. The cat remains within the familiar interior cover composition; cat-only portrait sequences were excluded.

Every selected export preserves the complete source framing and existing author marks. The exports normalize camera orientation, use sRGB, strip embedded metadata and limit the long edge to 2400 pixels without upscaling. WebP quality is 88. No AI regeneration, object removal or invented interiors were used for this curation.

The raw collections total 1,017,497,500 bytes. The 17 public WebP exports total 5,513,032 bytes, approximately 5.5 MB. Each gallery fits within the existing six-thumbnail set.

## Selected filenames and captions

| Project | Source filename | Published gallery filename | Caption |
| --- | --- | --- | --- |
| Ghatkopar apartment | Ar.Sharvari_Pawaskar-19.jpg | 01-living-room-and-millwork.webp | Living room and custom millwork |
| Ghatkopar apartment | Ar.Sharvari_Pawaskar-15.jpg | 02-dining-and-prayer-area.webp | Dining and prayer area |
| Ghatkopar apartment | Ar.Sharvari_Pawaskar-27.jpg | 03-kitchen-storage.webp | Kitchen cabinetry and storage |
| Ghatkopar apartment | Ar.Sharvari_Pawaskar-49.jpg | 04-blue-bedroom.webp | Bedroom with blue accents |
| Ghatkopar apartment | Ar.Sharvari_Pawaskar-75.jpg | 05-blush-daybed-room.webp | Blush daybed room |
| Ghatkopar apartment | Ar.Sharvari_Pawaskar-76.jpg | 06-built-in-study.webp | Built-in study nook |
| Andheri apartment | IMG_4455.JPG | 01-living-room.webp | Living room |
| Andheri apartment | IMG_4451.JPG | 02-dining-and-display.webp | Dining and display storage |
| Andheri apartment | IMG_4482.JPG | 03-kitchen.webp | Kitchen and textured backsplash |
| Andheri apartment | IMG_4501.JPG | 04-grey-bedroom.webp | Grey bedroom in daylight |
| Andheri apartment | IMG_4505.JPG | 05-teal-bedroom.webp | Teal bedroom |
| Andheri apartment | IMG_4471.JPG | 06-prayer-alcove.webp | Prayer alcove detail |
| Ratnagiri apartment / Amol Pawar | DSC03540.JPG | 01-window-seating.webp | Window seating with teal accents |
| Ratnagiri apartment / Amol Pawar | DSC03555.JPG | 02-timber-media-wall.webp | Timber and stone media wall |
| Ratnagiri apartment / Amol Pawar | DSC03559.JPG | 03-window-swing.webp | A swing beside the window |
| Ratnagiri apartment / Amol Pawar | DSC03565.JPG | 04-window-bench-detail.webp | Sculptural window seating |
| Ratnagiri apartment / Amol Pawar | DSC03568.JPG | 05-illuminated-artwork.webp | Illuminated artwork and timber console |

## Visual review sheets

- [Ghatkopar: six selected views](qa-2026-10-15-photo-curation-round2/ghatkopar-apartment-selection.jpg)
- [Andheri: six selected views](qa-2026-10-15-photo-curation-round2/andheri-apartment-selection.jpg)
- [Ratnagiri / Amol Pawar: five selected views](qa-2026-10-15-photo-curation-round2/ratnagiri-apartment-selection.jpg)

## Archive and recovery

- All supplied originals: `docs/source-assets/project-imports-2026-10-15-round2/originals/<original folder>/`.
- Replaced website gallery files and captions: `docs/source-assets/project-imports-2026-10-15-round2/previous-website/<project slug>/`.
- Decision for every original filename, including exclusion reason and SHA-256: `docs/source-assets/project-imports-2026-10-15-round2/curation-manifest.json`.
- Public selected photographs: `public/images/projects/ghatkopar-apartment/gallery/`, `andheri-apartment/gallery/` and `ratnagiri-apartment/gallery/`.

The original three raw upload folders were moved out of the public project directory. The existing image-sync workflow expects registered project folders, so raw upload folders cannot remain beside them. Future selected photographs should go directly into the matching gallery/ folder, followed by npm run images:sync.

## Verification

- Image sync passed: eight photographed project folders and 28 project gallery photographs.
- Type check and lint passed.
- Work and all ten current project routes passed the existing bounded-gallery smoke checks.
- All 17 selected image URLs returned valid, nonempty WebP images; captions and ordering matched the selection.
- The three curated galleries contain no appended stock reference images.
- All 219 archived originals were re-read and their SHA-256 hashes matched the reviewed files.

The first-round report remains in PHOTO-CURATION-2026-10-15.md as import history. This report describes the current three gallery selections.
