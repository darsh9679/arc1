# Place project photographs here

Open the matching project folder and put your photographs inside `gallery/`:

- `ghatkopar-apartment/gallery/` — Warmth in the everyday
- `ratnagiri-apartment/gallery/` — A home with character
- `anagha-salon/gallery/` — Anagha’s Salon & Academy
- `andheri-apartment/gallery/` — A quieter kind of home
- `thane-apartment/gallery/` — Modern Classic, made livable
- `dahisar-3bhk/gallery/` — Japandi, with a bohemian edge
- `vikhroli-bank/gallery/` — A more welcoming branch

Dahisar’s 3BHK apartment and the Vikhroli bank interior have empty gallery folders ready for photographs. Their pages retain editorial title cards until project-specific photos are provided.

Use names such as `01-living-room.jpg`, `02-detail.jpg`, `03-courtyard.webp`. There is no fixed gallery limit. JPG, JPEG, PNG, WebP and AVIF still images are supported.

The gallery shows one large photograph with six thumbnails per page, navigation and image counts. Every image opens in a full-screen viewer. You can add more than 14 photos without changing the gallery code or creating a long page of images.

After adding or replacing files, run `npm run images:sync` in a terminal at the project root, then refresh the page. Starting `npm run dev` also syncs automatically. A production site needs a rebuild/redeploy.

Optional project cover files (`hero.jpg`, `thumbnail.jpg`, `hover.jpg`, and paired `before.jpg` / `after.jpg`) go in the project folder, outside `gallery/`. Without a separate cover, the first gallery photo becomes the cover. `metadata.json` is optional: leave it absent or `{}` unless you want custom captions, accessible descriptions or cropping. When replacing or renaming an existing image, keep any metadata filename entry in sync.

Full instructions, examples and privacy notes: `docs/PROJECT-IMAGES.md` in the project root.

**Everything here is public. Add approved project photography only. These folders are not a browser upload dashboard.**
