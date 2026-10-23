# Parijat bungalow and Vishwabharti Bank photo selection

Reviewed all 30 supplied images on 22 October 2026. Selected five of 27 Parijat
images and two of three bank images. The initial selection used actual project
photographs without generative changes. A subsequent requested presentation
revision replaces the first Parijat view with a labelled AI-enhanced facade
image; see `docs/PARIJAT-PRESENTATION-2026-10-22.md`. The tables below record the
initial selection and original sources.

## Parijat bungalow

| Gallery filename | Original upload | Selection reason |
| --- | --- | --- |
| `01-bungalow-facade.webp` | `IMG_20200724_195856_638.jpg` | Clear close exterior view; project cover. |
| `02-exterior-and-entrance.webp` | `PhotoGrid_Plus_1595584384765.jpg` | Complete facade, entrance and landscape context. |
| `03-living-room-media-wall.webp` | `PhotoGrid_Plus_1595575128393.jpg` | Finished living room, timber media wall and ceiling lighting. |
| `04-balcony-swing.webp` | `PhotoGrid_Plus_1595583491553.jpg` | Balcony materials and swing; strongest export of this view. |
| `05-finished-bathroom.webp` | `PhotoGrid_Plus_1595583434013.jpg` | Finished bathroom; stronger export than repeated versions. |

Excluded construction/before images, repeated exports, the dark shower detail
and upward ceiling-only views. The PhotoGrid files are individual photos with
presentation borders, rather than multi-image collages. Their borders and
visible attribution remain intact.

## Vishwabharti Bank

| Gallery filename | Original upload | Selection reason |
| --- | --- | --- |
| `01-banking-counter.webp` | `IMG_9664_1_1.jpg` | Strong service-counter overview; project cover. |
| `02-private-cabin.webp` | `IMG_9669_1_1.jpg` | Distinct private cabin and workspace. |

The founder/meeting-room portrait `DSC08209_1_1.jpg` remains in the archive;
the initial public gallery focused on the two clear architectural views. The user
later explicitly requested a regenerated version of that photo as image three;
see `docs/BANK-THIRD-IMAGE-2026-10-22.md` for the labelled enhancement. The old
`vikhroli-bank` folder was left untouched, as requested.

## Preparation and recovery

- Exported as sRGB WebP, with orientation normalized and embedded metadata stripped.
- Maximum long edge: 1,920px for Parijat and 2,400px for the bank, without enlargement.
- Full source framing and visible credits preserved; no generative edits.
- The seven selected originals totalled 4,667,059 bytes; their website exports
  total 1,116,106 bytes, approximately 76% smaller. This is a file-size comparison,
  not a measured page-load improvement.
- Descriptive filenames and `metadata.json` provide gallery captions and accessible descriptions.
- `npm run images:sync` publishes versioned paths, dimensions and tiny blur previews.

All 30 originals (9,477,844 bytes) are recoverable in
`docs/source-assets/project-curation-2026-10-22/originals/`, grouped by project.
The adjacent `curation-manifest.json` records every source, decision, hash and
export. Every original was verified by SHA-256 before its public copy was
removed. Previous empty caption files are backed up beside the manifest.
The archive stays outside `public/` and is excluded from Git.

Review sheets and staging files are in `outputs/photo-curation-2026-10-22/`.
These changes are local; no commit, GitHub push or deployment was performed.
