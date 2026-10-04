# Adding and replacing project photographs

Each project already has its own gallery. Place client-approved photos in the matching folder below; there is no fixed image-count limit and no need to add every photo to the source code.

| Website project | Photo folder |
| --- | --- |
| Warmth in the everyday — Ghatkopar apartment | `public/images/projects/ghatkopar-apartment/gallery/` |
| A home with character — Ratnagiri apartment | `public/images/projects/ratnagiri-apartment/gallery/` |
| Anagha’s Salon & Academy | `public/images/projects/anagha-salon/gallery/` |
| A quieter kind of home — Andheri apartment | `public/images/projects/andheri-apartment/gallery/` |
| Modern Classic, made livable — Thane apartment | `public/images/projects/thane-apartment/gallery/` |
| Japandi, with a bohemian edge — Dahisar 3BHK | `public/images/projects/dahisar-3bhk/gallery/` |
| A more welcoming branch — Vikhroli bank | `public/images/projects/vikhroli-bank/gallery/` |

The Ghatkopar, Ratnagiri, salon, Andheri and Thane photos were supplied inside `3BHK Residential Interior.docx` and are kept with the matching descriptions from that document. Dahisar’s 3BHK and the Vikhroli bank interior have empty gallery folders ready for photographs. They currently have documented project copy but no matching photography in the supplied files, so their pages use editorial title cards. The Nerul and reserved folders remain supported for existing content, but are not part of the current selected-work index.

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
- Once `gallery/` contains photos, they replace that project's fallback gallery. Separately configured stock references remain appended and labelled as references; these are managed in `lib/project-references.generated.json`.
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

The filenames determine gallery order. Rename them to change the order, then update any matching metadata keys. This workflow has no arbitrary photo limit, but choose a considered selection and use reasonably compressed images so visitors do not need to download unnecessary files.

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
