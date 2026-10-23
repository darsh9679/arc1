# Adding and replacing project photographs

Each project already has its own gallery. Place client-approved photos in the matching folder below; there is no fixed image-count limit and no need to add every photo to the source code.

| Website project | Photo folder |
| --- | --- |
| Warmth in the everyday — Ghatkopar apartment | `public/images/projects/ghatkopar-apartment/gallery/` |
| A home with character — Ratnagiri apartment | `public/images/projects/ratnagiri-apartment/gallery/` |
| Welcome beauty family salon and spa | `public/images/projects/anagha-salon/gallery/` |
| A quieter kind of home — Andheri apartment | `public/images/projects/andheri-apartment/gallery/` |
| Modern Classic, made livable — Thane apartment | `public/images/projects/thane-apartment/gallery/` |
| Ratnagiri 1BHK residence | `public/images/projects/ratnagiri-1bhk/gallery/` |
| Wakad 3BHK residence | `public/images/projects/wakad-3bhk/gallery/` |
| Plan S office — Nerul | `public/images/projects/nerul-workspace/gallery/` |
| Parijat bungalow | `public/images/projects/parijat-bungalow/gallery/` |
| Vishwabharti Bank | `public/images/projects/vishwabharti-bank/gallery/` |
| Patwardhan House — Architecture, 3,000 sq. ft. built-up area | `public/images/projects/patwardhan-house/gallery/` |

Patwardhan House currently contains 15 supplied architectural visualizations with
descriptive captions. Its `visualizationOnly` setting in `lib/content.ts` keeps
the cover, gallery and full-screen credits accurate. Update that setting when
the collection is replaced with actual photography. All uploaded files are
retained, including one repeated export.

The Ghatkopar, Ratnagiri, salon, Andheri and Thane starting photographs came from `3BHK Residential Interior.docx`. The October 15 import adds curated photographs to Ghatkopar, Ratnagiri and Andheri, plus separate Ratnagiri 1BHK, Wakad 3BHK and Nerul office projects. The Amol Pawar source folder matches the existing Ratnagiri apartment, while the Pawaskar 1BHK is a separate home. A later salon import replaces Anagha’s original photograph with six selected interior views, as explicitly requested after clarifying the Welcome Beauty signage; see `docs/SALON-PHOTO-CURATION-2026-10-15.md`. The Dahisar and Vikhroli projects were removed from the public portfolio on 19 October 2026. Their empty folders are retained for local staging only; adding photographs there does not publish a project.

The initial imported collection selected 19 of 26 images; its originals remain in `docs/source-assets/project-imports-2026-10-15/`. The complete re-uploaded Ghatkopar, Andheri and Amol Pawar shoots were then reviewed: 219 images became 17 selected views across those three galleries, with six, six and five images respectively. People/pet portrait sequences, repeated angles, weak fragments and distracting reflections were excluded from the public galleries.

The October 22 additions select five Parijat bungalow views and two Vishwabharti Bank views from 30 uploads. Their original files and excluded alternates remain in `docs/source-assets/project-curation-2026-10-22/originals/`. See `docs/PHOTO-CURATION-2026-10-22.md` for the selection, filenames and processing details. The old Vikhroli bank folder remains untouched.

Parijat's first image was subsequently replaced with a labelled AI-enhanced facade photograph at the user's request. Its wide framing and the gallery presentation changes are documented in `docs/PARIJAT-PRESENTATION-2026-10-22.md`; the previous cover is retained in the local archive.

Vishwabharti Bank subsequently gained a third image, **Meeting room with the founder**, using an AI-enhanced version of the user's supplied photograph. The counter and cabin views remain first and second. See `docs/BANK-THIRD-IMAGE-2026-10-22.md` for the source, asset path and prompt.

All 219 second-round originals remain recoverable in `docs/source-assets/project-imports-2026-10-15-round2/originals/`; the previous website galleries and captions are backed up in its `previous-website/` folder. These archives are outside `public/`. See `docs/PHOTO-CURATION-2026-10-15-ROUND2.md` for the current choices, source filenames and reasons. The original first-round report is retained as history.

## Quick start

1. Open the matching `gallery/` folder from the table above.
2. Paste every gallery photograph directly inside it. Use JPG, JPEG, PNG, WebP or AVIF still images.
3. Name them in your preferred display order: `01-living-room.jpg`, `02-dining-area.jpg`, `03-material-detail.jpg`, and so on. `2-…` sorts before `10-…`; both padded and unpadded numbers work.
4. From the project root, run `npm run images:sync`, then refresh the page. The running development server does not automatically discover pasted photos until you sync them.

Use a second terminal for the sync command when the development server is already running; no restart is needed. Starting `npm run dev` also runs the sync automatically. You can replace an existing photograph while keeping its filename. The sync command adds a content version to each image URL, so a changed photograph receives a fresh image-cache entry automatically—even when its dimensions stay the same. Renaming replacement photos is not required.

For a production site, add the photos to the project and rebuild/redeploy. `npm run build` discovers them automatically. Copying files only onto an already running production server does not rebuild the gallery manifest.

These are **local project folders**, not a browser-based upload dashboard. No photographs are sent to an external service by the sync command.

## Folder example

```text
public/images/projects/ghatkopar-apartment/
├── hero.jpg                 optional: large project cover
├── thumbnail.jpg            optional: work/home project card
├── hover.jpg                optional: alternate card image
├── before.jpg               optional: use together with after.jpg
├── after.jpg                optional: use together with before.jpg
├── metadata.json            optional: gallery captions and descriptions
└── gallery/
    ├── 01-arrival.jpg
    ├── 02-workspace.jpg
    ├── 03-meeting-room.jpg
    ├── 04-material-detail.jpg
    └── …more photos…
```

Keep one file per optional role: for example, use `hero.jpg` **or** `hero.webp`, not both. These root files do not automatically become gallery slides; include a photo in `gallery/` when it should appear in the gallery too. All regular project photographs belong directly inside `gallery/`, with no additional nested folders.

### Automatic fallbacks

- With no project photographs, the current concept images and drawing placeholders remain in use.
- Once `gallery/` contains photos, they replace that project's fallback gallery and suppress illustrative stock references. References from `lib/project-references.generated.json` are used only when the project has no supplied photography.
- If you omit `hero`, the first gallery photo becomes the project cover.
- If you omit `thumbnail`, the cover also becomes the project card image.
- If you omit `hover`, the second gallery photo is used when available; otherwise, the cover is used.
- A gallery with just one photo is supported: that photo is reused for the cover and card until more photos or named cover files are added.
- Provide both `before` and `after` to display a real comparison. A lone file is reported as an error. Once any real photography is added without this pair, the previous concept comparison is hidden.

The comparison works for architecture and interior projects.

## Browsing larger galleries

There is no 14-photo limit. A collection with 20, 30 or more images uses the same folder workflow and includes every photograph in filename order.

- **Main gallery:** one large photograph is shown at a time, with previous/next controls, an image count and a selector for jumping directly to an image. Touch swipes and keyboard navigation are supported.
- **Thumbnails:** six thumbnails are shown per page. Larger collections have thumbnail page controls, so adding photographs does not create a longer stack of gallery rows on desktop or mobile.
- **Full-screen viewer:** selecting any image opens it without cropping, with its caption, image number, previous/next buttons and a selector for jumping to any image. Arrow keys, Home/End and touch swipes navigate; Close or Escape returns to the gallery. Focus and the page's scroll position are restored.
- **Loading:** gallery photographs use responsive, lazy-loaded images. The viewer mounts only its current full-size image, rather than loading the entire collection at full size.

Captions, photographs and drawing placeholders use the same viewer. AI concept images remain explicitly labelled until replaced with approved photography.

Deleting a photo and running the sync command removes it from the generated gallery. If you delete or rename a photo that has an entry in `metadata.json`, remove or update that entry too.

## Captions, accessible descriptions and cropping

Each photographed project has a `metadata.json` with captions and accessible descriptions for the supplied images. New project folders can omit this file or start with an empty `metadata.json` (`{}`): gallery titles and descriptions will be derived from filenames, and image proportions are detected automatically, including rotated camera photos.

For polished captions and meaningful descriptions, edit this file. The supplied photo folders already include captions and descriptions. Each key is the **exact filename inside `gallery/`**, including its extension. `title` is the visible caption; `alt` describes the image for people using assistive technology; `objectPosition` optionally adjusts the crop.

```json
{
  "01-arrival.jpg": {
    "title": "An inviting arrival",
    "alt": "The reception area with a curved timber desk and soft daylight.",
    "objectPosition": "50% 40%"
  },
  "02-workspace.jpg": {
    "title": "Space to work together",
    "alt": "Shared work tables beside full-height windows."
  }
}
```

Only use keys for photos you have actually placed in `gallery/`. All three fields are optional. Do not add comments or trailing commas in JSON. `objectPosition` accepts values such as `center`, `center top`, or `50% 35%`; it applies to the gallery image only.

The filenames determine gallery order. Rename them to change the order, then update any matching metadata keys. This workflow has no arbitrary photo limit, but choose a considered selection and use reasonably compressed images so visitors do not need to download unnecessary files. A useful starting point is 3–6 strong, distinct views per project: a clear overview followed by different rooms and one useful detail. Keep weaker alternates, temporary clutter and repeated angles in a source archive outside `public/`.

## Photo preparation and privacy

- Use only photographs approved for public display, with the necessary rights and client permissions.
- Everything under `public/` can be downloaded by site visitors. Do not put private drafts, contracts, contact sheets, or confidential files here.
- Remove camera location/EXIF information before adding photographs if it should not be public. The sync script reads images; it does not strip metadata or modify originals.
- Export in sRGB. As a practical starting point, use about 2,000–2,500 pixels on the long edge and compress to a reasonable size while checking quality.
- Use descriptive filenames and write accurate alt descriptions. Avoid adding private client names or locations to captions.
- These folders are intended for actual approved project photography. Do not copy the existing AI concepts into them: the original concepts remain in `public/images/concepts/` with their visible disclosure.

## Troubleshooting and implementation

Run `npm run images:sync` to validate everything. Errors identify the exact file or metadata entry to fix. The command rejects damaged images, wrong extensions, animated images, duplicate cover roles, unsupported files, unknown project folders, nested folders, symbolic links and invalid metadata. It leaves the previous generated manifest unchanged if validation fails; fix the reported error before continuing.

The generated file is `lib/project-images.generated.json`. **Do not edit it by hand**: the next sync replaces it. Generated image URLs include a short SHA-256 content version such as `?v=12ab34cd56ef` to refresh the cache when a file changes. `lib/content.ts` applies these photo overrides while retaining project descriptions. To add another project, add its content and register its slug in `scripts/sync-project-images.mjs`.

`npm run test:images` checks the discovery workflow using temporary fixtures, including a 24-photo gallery. It does not change the photos in this project.
