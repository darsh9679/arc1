# Project photo curation — 15 October 2026

This records the first small import. The later full-shoot review replaces the Ghatkopar, Andheri and Ratnagiri apartment gallery selections; see `docs/PHOTO-CURATION-2026-10-15-ROUND2.md` for the current 17-image selection from 219 re-uploaded photographs.

Reviewed every image in the six newly supplied folders: 26 readable images, with no corrupt files or exact byte duplicates found. Selected 19 for the website and excluded seven weaker or repetitive views. No supplied original was permanently deleted.

The 19 selected exports total 4.8 MB. They are WebP at quality 88, with camera orientation normalized, metadata stripped and the long edge limited to 2400 pixels without upscaling. Image content and existing author marks were preserved.

## Website galleries

| Project | Selected gallery images |
| --- | ---: |
| Ghatkopar apartment | 4 |
| Ratnagiri apartment / Amol Pawar | 4 |
| Andheri apartment | 4 |
| Ratnagiri 1BHK residence | 3 |
| Wakad 3BHK residence | 2 |
| Plan S office, Nerul | 4 |

The Ghatkopar and Ratnagiri galleries each retain their existing overview photograph alongside three new views. The Andheri overview was replaced with an optimized export of the new source. The separate salon and Thane galleries retain their one supplied photograph each. The Work collection now has ten projects, paginated six per page.

Visual matching confirms that the Amol Pawar folder belongs to the existing Ratnagiri apartment: its bench, teal cushions, orange sofa, timber pillar and window swing match. The supplied Pawaskar 1BHK is a separate home. The two new residential records and Nerul office omit floor areas because no areas were supplied.

Photographed projects now show only their project images; illustrative stock references are suppressed. Existing labelled references remain for Dahisar and Vikhroli, which still have no supplied project photographs.

## Selected new images

| Website folder | Original filename | Gallery filename | Caption |
| --- | --- | --- | --- |
| ratnagiri-1bhk | deb19eb1-8885-4359-be0a-f41faaf73dd4.png | 01-kitchen-and-breakfast-counter.webp | Kitchen and breakfast counter |
| ratnagiri-1bhk | 6c68d455-9324-40d3-bfc6-22a31b212aae.png | 02-living-and-dining.webp | Living and dining |
| ratnagiri-1bhk | 2ef2dd75-e011-485c-8984-298d2f245e0d.png | 03-bedroom-and-storage.webp | Bedroom and integrated storage |
| wakad-3bhk | KITCHEN EDITED - PUNE.png | 01-kitchen-and-timber-counter.webp | Kitchen and timber counter |
| wakad-3bhk | LIVING ROOM - INGOLE FLAT PUNE.png | 02-living-room.webp | Living room in daylight |
| ratnagiri-apartment | DSC03555.JPG | 02-timber-media-wall.webp | Timber and stone media wall |
| ratnagiri-apartment | DSC03559.JPG | 03-window-swing.webp | A swing beside the window |
| ratnagiri-apartment | DSC03565.JPG | 04-window-bench-detail.webp | Sculptural window seating |
| andheri-apartment | IMG_4437.JPG | 01-living-room.webp | Living room |
| andheri-apartment | IMG_4451.JPG | 02-dining-and-display.webp | Dining and display storage |
| andheri-apartment | IMG_4482.JPG | 03-kitchen.webp | Kitchen and textured backsplash |
| andheri-apartment | IMG_4501.JPG | 04-bedroom.webp | Bedroom in daylight |
| nerul-workspace | 14df9ccc-6d0b-4ad6-be5e-d5d47f2999ea.png | 01-open-workstations.webp | Open workstations |
| nerul-workspace | NERUL SITE CABIN 1.png | 02-executive-cabin.webp | Executive cabin |
| nerul-workspace | ce3481d1-459c-460f-8ec8-3d70f8adf87a.png | 03-meeting-room.webp | Meeting room |
| nerul-workspace | 245d6c1a-3d11-4012-8df1-23fcb717c946.png | 04-reception-lounge.webp | Reception lounge |
| ghatkopar-apartment | Ar.Sharvari_Pawaskar-15.jpg | 02-dining-and-prayer-area.webp | Dining and prayer area |
| ghatkopar-apartment | Ar.Sharvari_Pawaskar-49.jpg | 03-bedroom-and-blue-headboard.webp | Bedroom with blue accents |
| ghatkopar-apartment | Ar.Sharvari_Pawaskar-75.jpg | 04-daybed-room.webp | Daybed room |

## Excluded from the website

| Website project | Original filename | Reason |
| --- | --- | --- |
| wakad-3bhk | 5af2cfe3-c334-4694-bdc8-423c6b63a910.png | Ceiling-only view adds less context than the selected kitchen and living photographs. |
| ratnagiri-apartment | DSC03557.JPG | Repeats the selected swing view, with a large foreground pillar interrupting the composition. |
| ratnagiri-apartment | DSC03564.JPG | Portable fan and a cropped foreground table distract from the orange sofa. |
| andheri-apartment | IMG_4488.JPG | Cramped bathroom composition and violet ceiling cast weaken the main portfolio selection. |
| ghatkopar-apartment | Ar.Sharvari_Pawaskar-04.jpg | Alternate living-room angle repeats the existing wider living-and-dining photograph retained as the cover. |
| ghatkopar-apartment | Ar.Sharvari_Pawaskar-09.jpg | Narrow foyer view dominated by the entrance door provides little additional design context. |
| ghatkopar-apartment | Ar.Sharvari_Pawaskar-30.jpg | Foreground appliances, a chair and exposed utilities make this kitchen view less suitable for the main portfolio. |

## Recovery and future additions

- Selected originals: `docs/source-assets/project-imports-2026-10-15/selected-originals/<original folder>/`.
- Excluded originals: `docs/source-assets/project-imports-2026-10-15/discarded/<original folder>/`.
- Superseded Andheri website cover: `docs/source-assets/project-imports-2026-10-15/superseded-website/andheri-apartment/`.
- Full per-file record: `docs/source-assets/project-imports-2026-10-15/curation-manifest.json`.
- Website exports: `public/images/projects/<website folder>/gallery/`.

The archive is outside `public/` and excluded from Git by the existing source-assets rule. Raw upload folders were removed from the public project root after every original had been archived; leaving unknown upload folders there would break the image sync. Future additions should go directly into the matching registered `gallery/` folder, followed by `npm run images:sync`.

## Verification

- Image sync: eight photographed project folders, 23 actual project gallery images.
- Image discovery tests: 11 passed. Portfolio pagination tests: five passed.
- Type check and lint passed.
- Work route checks passed for all ten projects, including bounded gallery thumbnails and jump selectors.
- Visually checked the Work collection with the three new project cards. Further browser control was stopped by the user with Escape; no final mobile visual check was completed.
