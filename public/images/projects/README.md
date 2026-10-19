# Place project photographs here

Open the matching project folder and put your photographs inside `gallery/`:

- `ghatkopar-apartment/gallery/` — Warmth in the everyday
- `ratnagiri-apartment/gallery/` — A home with character
- `anagha-salon/gallery/` — Anagha’s Salon & Academy
- `andheri-apartment/gallery/` — A quieter kind of home
- `thane-apartment/gallery/` — Modern Classic, made livable
- `ratnagiri-1bhk/gallery/` — Ratnagiri 1BHK residence
- `wakad-3bhk/gallery/` — Wakad 3BHK residence
- `nerul-workspace/gallery/` — Plan S office

The Dahisar and Vikhroli projects were removed from the public portfolio on 19 October 2026. Their empty folders are retained for local staging only; adding photographs there does not publish a project.

Use names such as `01-living-room.jpg`, `02-detail.jpg`, `03-courtyard.webp`. There is no fixed gallery limit. JPG, JPEG, PNG, WebP and AVIF still images are supported.

The first October 15 import selected 19 of 26 images. A second review of the full Ghatkopar, Andheri and Amol Pawar shoots reviewed 219 images and selected 17: six Ghatkopar, six Andheri and five Ratnagiri apartment views. Those selections replace the earlier small galleries. The Amol Pawar photographs belong to `ratnagiri-apartment`; the separate Pawaskar 1BHK is in `ratnagiri-1bhk`.

Original and excluded images are archived outside `public/` in `docs/source-assets/project-imports-2026-10-15-round2/`, including a backup of the replaced galleries. The first import archive remains in `docs/source-assets/project-imports-2026-10-15/`. See `docs/PHOTO-CURATION-2026-10-15-ROUND2.md` for selections and reasons. Do not paste raw upload folders beside these project folders; add selected photos to the matching `gallery/` directory instead.

The gallery shows one large photograph with six thumbnails per page, navigation and image counts. Every image opens in a full-screen viewer. You can add more than 14 photos without changing the gallery code or creating a long page of images, but 3–6 strong, distinct views usually make a clearer portfolio. Supplied project photos replace stock reference galleries.

After adding or replacing files, run `npm run images:sync` in a terminal at the project root, then refresh the page. Starting `npm run dev` also syncs automatically. A production site needs a rebuild/redeploy.

Optional project cover files (`hero.jpg`, `thumbnail.jpg`, `hover.jpg`, and paired `before.jpg` / `after.jpg`) go in the project folder, outside `gallery/`. Without a separate cover, the first gallery photo becomes the cover. `metadata.json` is optional: leave it absent or `{}` unless you want custom captions, accessible descriptions or cropping. When replacing or renaming an existing image, keep any metadata filename entry in sync.

Full instructions, examples and privacy notes: `docs/PROJECT-IMAGES.md` in the project root.

**Everything here is public. Add approved project photography only. These folders are not a browser upload dashboard.**
