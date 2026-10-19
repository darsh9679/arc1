# Trayaksh Architeqts

**Home design update, 4 October 2026:** The home page opens with an image-led, full-screen hero, a concise two-line Fraunces headline, work/enquiry actions, and subtle slideshow dots. The supplied Thane photograph leads the sequence. Ivory, warm charcoal and restrained brass accents support the supplied identity. The studio introduction now includes a project photograph, services use real project imagery and line icons, and phones display four featured projects in a horizontal scroll-snap row. The compact mobile service cards and Why Trayaksh disclosures remain. The Studio process animation, portfolio pagination, bounded galleries, contact ordering and footer palette are preserved. See `docs/qa-2026-10-04-modern-ui/QA.md` for checks and screenshots.

**Phone section refinement:** Below 600px, Home’s Studio section uses concise summaries, services use a compact two-column grid, and all six Why Trayaksh headings appear as native disclosures with one explanation open at a time. The project services photo and repeated belief quote remain on tablet and laptop. The earlier 3 October checks are recorded in `docs/qa-2026-10-03-home/mobile-sections/QA.md`; the latest design checks are in the 4 October report above.

**Studio page refinement, 3 October 2026:** The Studio page now uses practice summary cards, consistent perspective/principle/service icons, cream/olive sections and contrasting Vision/Mission cards with project photography. The full practice explanations and phone service scopes are available through native disclosures. Section navigation highlights the current topic, and the supplied Ghatkopar photograph links to its case study. A professionally edited portrait from the founder photo supplied on 4 October now appears on phones and larger screens; see [portrait files and edit provenance](docs/FOUNDER-PORTRAIT.md). It replaces the earlier fictional temporary portrait. Small panel and image movements respect reduced motion and keep text visible. The original six process cards and scrolling stack remain on laptops; tablets use a compact process grid and phones use expandable steps. At 375 × 667 Studio content before the footer is about 5,039px, compared with the original 13,289px. See `docs/qa-2026-10-03-studio/QA.md` for screenshots and responsive checks.

Complete Next.js App Router / TypeScript site built from `CODEX-PROMPT-trayaksh-architeqts.md` and `ANIMATION-REFERENCE-trayaksh-architeqts.md` in the parent folder. The requested Next.js + Vercel target takes precedence over the Sites scaffold's Vinext / Cloudflare defaults; those runtime dependencies were removed. No Sites account or alternate hosting project was created.

**Image update:** Seven AI concepts remain clearly labelled as illustrative imagery, not real studio projects. The home hero rotates five supplied project photographs on tablets and laptops: Thane, Andheri, Ghatkopar, Ratnagiri and Anagha’s Salon. Below 600px it uses five separately generated portrait interpretations of those rooms, visibly labelled AI portrait visual; see [mobile portrait files and replacement instructions](docs/MOBILE-HERO-PORTRAITS.md). Photographer-credited stock imagery remains in other atmosphere sections. The home introduction and services now use supplied Ratnagiri and Andheri photographs. The portfolio cards and case studies use only the photos supplied for the documented projects. See `IMAGE-ASSETS.md` and `STOCK-PHOTOS.md` for provenance and credits.

**Logo update:** The user-supplied `../print (1).svg` now provides the actual branding in the header, footer, route curtain, favicon, Apple icon and social card. Its gold-and-olive artwork is preserved. See `BRAND-ASSETS.md` for the original source, responsive lockups and accessible UI palette.

**Portfolio update:** The client supplied `3BHK Residential Interior.docx` on 1 October 2026 with seven project descriptions and five matching photographs. The five photographed projects now lead the selected-work pages; Dahisar's 3BHK and the Vikhroli bank interior use editorial covers because their matching photography was not included. Stock imagery is kept outside the project portfolio and visibly credited as illustrative. The portrait substitute and fabricated social moodboard were removed. See `CLIENT-CONTENT.md` for project-source mapping and factual boundaries.

## Run and deploy

```sh
npm ci
npm run dev
npm run build
npm start
```

The development command explicitly uses webpack. With this installed Next.js version, the Turbopack development preview intermittently stalled client initialization in browser QA; webpack restored working navigation and gallery controls. Production builds continue to use Next's default build engine.

Vercel remains the requested deployment target; this content update does not deploy the site. For a future authorized deployment, import this `trayaksh-architeqts` directory into Vercel as a Next.js project. `vercel.json` sets the build/install commands. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin. If absent, Vercel's production domain is used when available; local development falls back to localhost. Secrets must remain server-only. `.env.example` lists all configuration. No external account, domain, or deployment credential is included.

The preview intentionally emits `noindex, nofollow`. Set `NEXT_PUBLIC_LAUNCH_READY=true` only after the client has approved the real content and delivery details. This flag controls indexing; it does not automatically remove placeholder notices.

## Routes

- `/`: opening slideshow of supplied project photographs, with labelled AI portrait interpretations on phones, approved practice statement, service introduction, four featured projects, Why Trayaksh, recognition and footer.
- `/studio`: approved founder biography, philosophy, vision/mission, seven design principles, four service cards and the six-step scrolling process stack on laptops, with compact native disclosures on phones.
- `/work`: eight selected projects, the approved 10+ completed-project count, and filters for residential, hospitality and workplace interiors.
- `/work/ghatkopar-apartment`, `/work/ratnagiri-apartment`, `/work/anagha-salon`, `/work/andheri-apartment`, `/work/thane-apartment`: project descriptions and matching photographs from the supplied project document.
- `/work/ratnagiri-1bhk`, `/work/wakad-3bhk`, `/work/nerul-workspace`: additional curated residential and workplace galleries. The former Dahisar and Vikhroli project routes return 404.
- `/recognition`: D&V’25 award information and selected photographed projects.
- `/contact`: supplied Dadar address and phone, practice areas, Instagram, four-field enquiry form and opt-in address map.
- Unknown paths return the custom 404. An error boundary offers retry/navigation.

## Swap in approved content

Approved practice copy lives in `lib/client-copy.ts`; project records, process steps and studio assets/contact fields live in `lib/content.ts`. The original extracted paragraphs remain in `docs/client-content-source.json`. See `CLIENT-CONTENT.md` before revising approved facts or their qualifiers.

1. **Project photo folders are ready at `public/images/projects/`.** The current eight photographed projects each have a `gallery/` folder; add numbered, approved photos there and run `npm run images:sync`, or restart `npm run dev`. Optional `hero`, `thumbnail`, `hover`, `before` and `after` files go in the project folder. See [the photo-folder guide](docs/PROJECT-IMAGES.md) for captions, alt text and supported formats. Rebuild/redeploy for production updates. Other remaining concept imagery is mapped in `IMAGE-ASSETS.md`.
2. Image geometry: the home hero uses one image layer across breakpoints. Its height uses the small viewport height minus the header (82px on laptops, 72px at 800px and below), with minimum heights to protect readable controls on very short screens. A bottom gradient supports the headline and actions while leaving the upper photograph clear; laptops also use light side shading behind the copy. Phones omit the supporting sentence. Original landscape crop positions are in `components/spotlight-hero.tsx`. A native picture source selects the generated portrait WebP only below 600px; phones omit camera zoom to keep that framing stable. The location and compact photo dots sit at the hero's bottom. The first gallery photo in each of the five photographed project folders supplies that project's tablet/laptop home slide; mobile portrait files are separate in `public/images/mobile-hero/` and do not change automatically when a gallery photo is replaced; optional root `hero` files control case-study covers. Project detail pages use wide photography, and work cards use a consistent image grid with compact captions. Local photographs are optimised through Next Image. Raster images should be exported at sensible dimensions as compressed WebP/AVIF/JPEG. Stock photo sources and visible credits are documented in `STOCK-PHOTOS.md`.
3. The supplied logo is already connected through `studio.logoSrc` and `studio.logoStackedSrc`. Both responsive lockups use original SVG paths, with generous print margins removed; `app/icon.svg` uses its emblem. The founder’s supplied photograph is now edited and connected through `studio.portraitSrc`; see `docs/FOUNDER-PORTRAIT.md` for the source and replacement instructions. See `BRAND-ASSETS.md` before replacing the identity assets.
4. Shared UI colors at the beginning of `app/globals.css` follow the supplied logo's gold-and-olive direction. Home-specific warm neutral tokens live in `app/home.module.css`, with photograph overlay colors in `components/spotlight-hero.module.css`; original logo artwork retains its own fill colors. Font declarations are together at the top of `app/layout.tsx`. Fraunces variable roman/italic and Inter are compressed as WOFF2 and bundled locally through `next/font/local`, with their OFL licences in `app/fonts`. Pull quotes use the italic optical-size axis.
5. Keep project names, areas, locations and descriptions aligned with the supplied files. No completion dates, client names, team members or press claims have been added.
6. The client-supplied phone and Dadar address are already set in `studio`; the map searches that address and connects to Google Maps only on visitor request. This is an address query, not a separately verified entrance pin. `studio.email` remains unset because no email was supplied. The navbar, mobile menu and footer now show Instagram, Facebook, LinkedIn and YouTube icons as requested on 3 October. Instagram is linked; set the other actual profile URLs in `lib/social-profiles.ts` when supplied. Until then, those icons are noninteractive and have accessible platform names.
7. `public/og.png` is now a social card using the supplied logo, rendered from `public/brand/social-card.svg`. Detail pages use their own hero for social previews. Current concept heroes include truthful AI alt text and a concept disclosure in the page description; without a hero they deliberately clear inherited image metadata.

## Enquiry delivery

Google Sheets integration is available in
[`integrations/google-sheets`](integrations/google-sheets/README.md). Configure
`GOOGLE_SHEETS_WEB_APP_URL` and `GOOGLE_SHEETS_WEB_APP_TOKEN` on the server after
deploying its Apps Script receiver. The form confirms success only after the
sheet acknowledges the write; without configuration it remains in draft mode.

By default, submitting prepares a local text draft from the entered fields. Copy and download actions work; the interface explicitly states **not sent**. The site does not submit the details to a server or persist them in this mode. The visitor can call the supplied phone number or send the draft to the confirmed Instagram account.

The form was simplified at the user's request on 3 October 2026 to four fields: name, email, service and project brief. Visitors include their location and other useful details in the brief. The API retains support for earlier optional fields for compatibility, but they are no longer presented as separate questions.

To enable delivery, set server-only `ENQUIRY_WEBHOOK_URL` to a trusted HTTPS service accepting the validated JSON forwarded by `app/api/enquiry/route.ts`; use that handler as the payload schema reference. Optionally set `ENQUIRY_WEBHOOK_TOKEN` for a bearer token. The webhook must actually deliver/retain enquiries and return a successful HTTP response only after accepting them. The UI then uses `/api/enquiry`; server validation, a honeypot, request length checks, an eight-second timeout and explicit delivery failure states are included. The endpoint never returns the configured secret. Before opening delivery to the public, configure durable abuse/rate protection at Vercel or the destination service, establish retention/privacy policy, and verify real end-to-end delivery. A supplied phone/address does not configure delivery. There is no database, fabricated inbox or simulated success state.

## Motion and accessibility

- Hero: five original project photographs (or labelled AI portrait interpretations below 600px) rotate every 6.5 seconds once loaded, with a 900ms crossfade. Gentle camera drift runs on tablets and laptops; the phone compositions remain static. Five small photo dots and a matching project link remain visible. The boxed arrow controls, numeric counter and pause/resume button have been removed. Selecting a dot or swiping changes the photograph and holds that selection. Dot buttons support keyboard operation; horizontal touch swipes do not block vertical scrolling. Reduced motion disables entrance animation, drift, crossfades and automatic switching; manual controls remain. Playback also stops when the hero leaves view or the tab is hidden. The home featured-project row scrolls horizontally below 600px, with snap points and automatic horizontal scrolling to keep keyboard-focused cards visible.
- Image parallax: desktop fine pointers without reduced motion get a subtle vertical image shift inside a clipped, stationary frame. The headline, frame and captions do not move with the image. Mobile and reduced-motion layouts use the original static image.
- Project tiles: restrained photo zoom on hover and visible text captions at every input mode. Photos are paired with the matching project copy; text-led editorial covers are used where the supplied project document has no photograph.
- Map: DrawSVGPlugin and ScrollTrigger draw the location relationship; MotionPathPlugin follows it with a marker. Reduced motion shows the complete path. This is explicitly a schematic, not a surveyed site plan or access route.
- Process: CSS sticky offsets, slight rotation and GSAP scale. Touch, narrow screens, desktop viewports under 700px tall and reduced motion use ordinary readable cards.
- Gallery: one complete image with six paginated thumbnails, a laptop sidebar, phone thumbnails below, arrow/keyboard navigation and a jump selector. The existing full-screen viewer preserves zoom, image provenance, Escape and focus restoration. Galleries no longer pin or add a tall row for every image. Reduced motion removes image/card animation while keeping every navigation control available.
- Comparison: Base UI range slider, keyboard arrows/Home/End, labelled value text, visible input focus, and touch support. Illustrations are identified as studies, not a real renovation.
- Navigation: scramble preserves a stable accessible name and stops under reduced motion. Mobile menu is a disclosure with expanded state and Escape-to-close.
- Routes: GSAP curtain on ordinary internal route links; same-page anchors, modified clicks, external links and downloads retain browser behavior. Reduced motion skips it. Cleanup and a timeout prevent a stuck curtain.
- Lenis runs only on desktop fine pointers without reduced motion, with ticker/listener cleanup. No Three.js, WebGL, Lottie or Rive.

The logo-derived UI palette uses a darker gold for text and controls, with approximately **4.54:1** contrast on paper and **4.52:1** on ink. Olive secondary text is **5.90:1** on paper. Original logo fills are unchanged and are not reused indiscriminately as UI text colors. Recheck contrast when replacing the palette.

## Client launch checklist

- Review the project copy and selected photography; supply matching photos for the Dahisar 3BHK and Vikhroli bank interiors if available. The founder’s supplied portrait is now installed in Studio.
- More approved photographs, project plans, matched before/after pairs and any approved team information.
- Contact email, configured and verified enquiry delivery, and any preferred exact map pin. The studio address and phone are already supplied.
- Replace illustrative Instagram slots or keep them transparently labelled; add only verified press and supplied YouTube/LinkedIn URLs.
- Keep explicit AI/concept labels wherever concept imagery remains. Project copy does not make concept images documentation of completed work.
- Ratnagiri is approved practice geography. The separate, unconfirmed biographical claim about the principal's origin remains omitted and is not a launch dependency.
- Test on physical iOS/Android devices and with an operating-system reduced-motion preference before public launch. Desktop Chrome visual QA and responsive viewport checks were completed on 6 September; see `docs/qa-2026-09-06/QA.md` for results and limits.

## Checks

`npm run typecheck`, `npm run lint`, and `npm run build` verify compilation. `npm run test:server` checks actual API validation/failure boundaries with a mocked destination (no messages are sent). `npm run test:smoke` checks local HTTP routes, metadata, unknown-route status and disabled enquiry delivery; run it with a local server and without an enquiry webhook. Use `SITE_TEST_ORIGIN` to override its default `http://127.0.0.1:3000`.

Content integration validation, 3 September 2026: production build, typecheck and lint passed; all 12 enquiry tests passed; production smoke checks passed for all nine pages, approved client copy, six process stages, founder credentials, ten labelled enquiry fields, three reserved projects, seven concept assets, metadata, heading order, image delivery and error routes. The temporary validation server was stopped afterward.

Visual refinement and laptop sizing validation, 6 September 2026: production build, lint, all 12 enquiry tests and production smoke checks passed. All nine pages passed final horizontal-overflow and heading-boundary checks at 320px, 390px and 1366px. Additional tablet and laptop sizes, real browser controls and desktop parallax were checked. The responsive editorial layer is in `app/editorial.css`; screenshots and detailed results are in `docs/qa-2026-09-06/`.

Remaining-page refinement, 13 September 2026: Studio, Work, Recognition, Contact and all four case studies now share compact introductions and screen-relative media sizing. Work presents its portfolio before the preserved experience section. Forty responsive combinations passed overflow, heading and image-height checks; production build, lint, 12 enquiry tests and nine-page smoke checks passed. See `docs/qa-2026-09-13/QA.md` and its laptop/mobile screenshots.

Studio-specific redesign: the Studio route now uses an image-led opening, an expandable full biography, a contrasting philosophy section, an image-backed quote and scoped CSS. Approved client content is preserved. Responsive, keyboard and parallax QA results and final screenshots are in `docs/qa-2026-09-13-studio/QA.md`.

## Work browsing update, 3 October 2026

Work uses equal three-column laptop cards, two tablet columns and one phone column, with search and category filtering. Six records appear per page, so twenty-five projects make five pages. Counts are generated from the current project data. Phone introductions omit the repeated brand summary and use a compact category selector to bring photographs into the first screen; the complete introduction remains on larger screens and the approved brand copy remains on Home and Studio. Card entrances, hover zoom and gallery image settling respect reduced motion. The laptop Studio process animation is preserved.

See [portfolio browsing and future-project instructions](docs/PORTFOLIO-BROWSING.md) and [responsive QA](docs/qa-2026-10-03-work/QA.md). `npm run test:portfolio` verifies twenty-five test-only projects and large thumbnail sets; `npm run test:work` checks Work and all current project routes against a local server. Production build, typecheck, lint and these checks passed. No deployment was performed.

## Recognition and Contact update, 3 October 2026

Recognition now pairs its supplied award facts with a contained editorial graphic and equal project previews. The project previews become a swipeable row on phones. Contact pairs a dark green introduction with a four-field enquiry panel and a compact studio-address section; its repeated footer invitation is omitted. These pages use scoped warm neutral, dark green and muted gold colors, with short entrance motion that respects reduced motion. The mobile Enquire shortcut also works when the current URL already contains the enquiry fragment.

The form retains its existing delivery setup and explicit local-draft mode. Typecheck, lint, production build and all 13 server tests passed. Browser checks cover laptop, tablet and 320px/375px phone viewports. See [Recognition and Contact QA and screenshots](docs/qa-2026-10-03-recognition-contact/QA.md).

The subsequent Contact revision puts the form first on phones while retaining the laptop/tablet columns, upright headings and simple rules. The footer has grouped navigation, clear contact details, a directions link and rectangular social icons. On 4 October, the requested color reversion restored the green and gold Contact introduction and the original light footer palette while preserving these layout improvements. Lint passed after the color reversion; laptop and phone screenshots are in the same QA directory.

The latest Contact color choice is scoped to Contact / New projects: a warm stone background, charcoal text and muted bronze emphasis. The light footer and form-first mobile layout are retained. The previous green introduction screenshots document the earlier revision.

The opening introduction now displays 0–100% with an accessible progress bar. Page transitions show stage progress and reach 100% when the next route commits. These indicators describe the opening sequence, not network download bytes. Skip, replay, reduced-motion handling and timeout safeguards are preserved. Typecheck, lint, production build and browser checks passed.

Loader timing correction, 4 October: progress updates now write the visible counter and native progress value together. Successful completion waits for two animation frames and a 220ms hold at 100% before the exit starts. Cached route transitions animate the final 35–100% segment, and the introduction timeout uses the same completion hold. `npm run test:loader` covers paused frames, fast completion, cancellation and background tabs. See [loader regression QA](docs/qa-2026-10-04-loader/QA.md).

Contact now embeds Google Maps directly for the Vidya Bhuvan / Shivaji Park address, with lazy loading and a compact address caption. All seven selected projects have gallery folders ready for photos; see [photo folder instructions](docs/PROJECT-IMAGES.md). After pasting images, run `npm run images:sync` and refresh the development preview. Typecheck, lint and image synchronization passed for this update.
