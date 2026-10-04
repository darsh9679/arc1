# Portfolio and gallery browsing

The Work page shows six projects per page. The existing seven records make two pages; twenty-five records make five pages. Category filters, search, result counts and page numbers derive from the project data. Search covers titles, locations, property types, styles and areas. Changing a filter or search returns to page one. Page controls return focus and scroll to the collection heading. Home and Recognition retain their existing featured layouts.

Each project gallery displays one complete photograph, using `contain` to preserve its composition. Laptops have a thumbnail sidebar. At 900px and below, thumbnails sit underneath. Only six thumbnails are mounted at a time; adding twenty-five images does not add twenty-five tall rows. Use arrows, thumbnails, the jump selector or keyboard Left/Right and Home/End. Touch swipes are supported without intercepting vertical scrolling or pinch zoom. Selecting the main photograph opens the existing full-screen viewer, with Escape to close and focus restored afterward. A gallery link in the project introduction skips directly to the images.

## Adding projects later

1. Add the approved project record to `projectRecords` in `lib/content.ts`, using a unique slug and the existing `Project` fields. Counts and pagination update automatically. No layout changes are needed for twenty or twenty-five projects.
2. For folder-based photographs, add that slug to `PROJECT_SLUGS` in `scripts/sync-project-images.mjs`. Place numbered photographs in `public/images/projects/<slug>/gallery/` with captions and alt text following `docs/PROJECT-IMAGES.md`.
3. Run `npm run images:sync`; then rebuild for production. The gallery and full-screen selector include every approved image. Do not treat illustrative references as completed-project photographs.

Page sizes are defined in `lib/portfolio.ts`. The seven approved project records and their descriptions were not changed. Empty galleries remain clearly labelled. Stock references retain their source links, and AI imagery retains its provenance.

## Checks

- `npm run test:portfolio`: pagination/search/category boundaries with twenty-five test-only projects, and thumbnail sets with twenty-four and twenty-five test-only image indexes.
- `npm run test:work`: local HTTP checks for Work and every current project route. Start the development or production server first; `SITE_TEST_ORIGIN` can select another local port.
- `npm run typecheck`, `npm run lint`, `npm run build`.

Responsive screenshots and observed browser checks are recorded in `docs/qa-2026-10-03-work/QA.md`.
