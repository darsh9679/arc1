# Premium concept imagery

Seven original images were created with **built-in imagegen**, following the user's request to generate premium images and use them in the site. This supersedes the earlier SVG-only photography instruction. All generated visuals are clearly identified as **AI concept imagery**, never as actual completed Trayaksh Architeqts projects.

The art direction is contemporary Indian architecture with tactile limestone, natural teak, lime plaster, linen, subtle brass and natural daylight. These seven architecture concepts contain no people, principal portraits, signs, client logos, fake award photographs or recognisable Nerul landmarks. The separately requested temporary portrait is documented below.

| Image                 | Site file                                         | Dimensions  | Placement                                                          |
| --------------------- | ------------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| Workspace             | `public/images/concepts/workspace-wide.webp`      | 1672 × 941  | Spotlight hero, workplace card, case study, gallery and process    |
| Workspace shell       | `public/images/concepts/workspace-before.webp`    | 1672 × 941  | Workplace hover reveal and comparison                              |
| Courtyard residence   | `public/images/concepts/courtyard-residence.webp` | 1536 × 1024 | Architecture card, case study, gallery and moodboard               |
| Living room           | `public/images/concepts/living-room.webp`         | 1672 × 941  | Interior card, case study, gallery and moodboard                   |
| Living room shell     | `public/images/concepts/living-room-before.webp`  | 1672 × 941  | Interior hover reveal and comparison                               |
| Hospitality courtyard | `public/images/concepts/hospitality-court.webp`   | 1536 × 1024 | Hospitality card, case study and gallery                           |
| Material detail       | `public/images/concepts/material-detail.webp`     | 1122 × 1402 | Studio editorial image, detail galleries, card reveals and process |

The seven delivery assets total approximately **1.5 MB**. PNG originals are preserved in `../generated-concepts/`; all site references point to project-local WebP files. WebP encoding uses quality 90 without resizing or changing the composition. Next Image produces responsive delivery sizes; cards use individual crop positions. No runtime image-generation service or API key is needed.

## Prompts and provenance

The exact seven generation/edit prompts, source paths, dimensions, output sizes and visual inspection notes are recorded in [`docs/image-provenance.json`](docs/image-provenance.json). Five scenes were generated independently; the two shells were edited from their furnished counterparts with explicit camera, geometry and lighting invariants.

Both comparisons closely align in framing and major architecture, but generative edits are not pixel-perfect records. Small texture, reflection, foliage and shadow differences remain. The comparison copy clearly describes fictional concept transformations, not real construction or renovations. The actual Nerul location facts and schematic remain unchanged.

## Asset-only replacement

**Recommended for project photography:** use the prepared folders under `public/images/projects/`. Put any number of numbered photos in a project's `gallery/` subfolder; the site discovers them with `npm run images:sync` (also run automatically before dev/build). Optional hero, thumbnail, hover and matched before/after images go beside `gallery/`. Detailed instructions and caption examples are in [`docs/PROJECT-IMAGES.md`](docs/PROJECT-IMAGES.md). Never rename AI concept files into these real-photo folders.

`lib/content.ts` holds the image assignments. `lib/imagery.ts` identifies these seven source paths as generated concepts and supplies truthful alternative text. The shared `PlaceholderImage` renderer automatically adds an **AI concept image** badge whenever one of those sources is used. Ordinary photographs at other paths are not given that badge.

To replace a concept with approved photography, add the photo under `public/images/` and change its `src` assignment. The layout, dimensions, hover motion, galleries and sliders do not change. Update the photo's descriptive alt text and review page-level preview/disclosure copy before launch. Use genuinely matched before/after source photographs for any future project comparison. Project galleries may also include separately labeled, linked stock references when requested; they are never presented as completed-project photography.

On 4 October 2026 the client supplied the actual founder photograph and requested a professional edit preserving her face. Built-in imagegen created a neutral-background edit at `public/images/studio/founder-sharvari-portrait-v1.webp`, now used in Studio. The source photograph is preserved at `docs/source-assets/founder-original.png`. The earlier fictional portrait at `public/images/studio/founder-portrait.png` is no longer referenced; its generation record is historical. See [the current portrait and exact prompt](docs/FOUNDER-PORTRAIT.md). The subsequently supplied logo in `../print (1).svg` is integrated as original vector artwork, including the general social card; see `BRAND-ASSETS.md`. Plans and the Nerul location diagram remain SVG.

The client has since supplied the founder biography, practice copy, services, experience, studio address and phone in `Recommended brand descriptor.docx`, as well as seven project descriptions and five matching photos in `3BHK Residential Interior.docx`. See `CLIENT-CONTENT.md` and `docs/PROJECT-IMAGES.md` for the project mapping. The remaining AI concepts are used only as illustrative imagery and keep their visible disclosure; they are not represented as project photography. The home page also uses two credited, licensed stock photos for atmosphere, documented in `STOCK-PHOTOS.md`. Matching photos for Dahisar East and Vikhroli are still outstanding. The founder photograph was supplied on 4 October 2026 and is now connected to Studio.

## Mobile hero portraits, 4 October 2026

At the user’s request, built-in imagegen created five tall portrait interpretations from the supplied Thane, Andheri, Ghatkopar, Ratnagiri and Anagha salon photographs. They are used only in the home hero below 600px and visibly labelled **AI portrait visual**, with truthful alternative text. Tablet/laptop slides and all project galleries retain original photographs. The generated WebP files are kept separately in `public/images/mobile-hero/`, total approximately 916 KB, and preserve the generated dimensions at quality 88. See [files and replacement instructions](docs/MOBILE-HERO-PORTRAITS.md) and [the exact prompt/source record](docs/mobile-hero-portrait-provenance.json). Original PNG outputs remain in the Codex generated-images folder recorded there.
