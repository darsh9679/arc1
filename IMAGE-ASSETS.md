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

## Understand process card

Built-in ImageGen used the supplied foundation site as the scene reference and the Coordinate card as the lighting and palette reference. The 1440 × 960 WebP illustrates a site visit for Studio’s Understand card. [Understand image](public/images/studio/process-understand-v1.webp)

> Create one photorealistic architectural editorial photograph for the Understand card, the first step in Trayaksh Architeqts’ Studio process. The theme is “We begin by listening.” Image 1, the supplied foundation-site photograph, is the subject and scene reference. Reinterpret its grid of low cast-concrete foundation walls, occasional vertical rebar, terracotta soil and lush western Indian greenery. Image 2, the existing Coordinate card, is a reference only for the site's muted olive, warm concrete and natural cloudy daylight palette. Do not copy its people, hillside framing, or stance.
>
> Show two unidentifiable adults, an architect and a client, on a safe clear earthen path beside the foundations, having a quiet and attentive conversation. One listens while the other points out a need on a simple unfolded plan, with no readable writing. Use candid body language and understated work clothes. Keep them together near the center of the middle distance so both are visible in a center crop, modest in scale while clearly readable. Let the strong lines of the concrete foundations lead from the foreground to their conversation. Keep the site believable with restrained materials in the background and a few rebar lines away from faces. Use soft warm-neutral daylight, natural skin tones, warm grey concrete, subdued laterite red and olive-green leaves, gentle shadows and texture. Omit bright tarps, saturated blue sky, posed faces, visual clutter, glossy rendering, stylized grading, text, logos, borders and website UI. Compose a full-bleed 3:2 horizontal image for a nearly 3:2 image tile, with balanced edges and the main scene intact when center-cropped.

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

## Anagha’s Salon and Academy case-study covers

The Juinagar case study uses two edits made with built-in ImageGen and labels them **AI-refined cover**. The project card and first three gallery images use the supplied photographs.

### Phone cover

The 1000 × 1250 WebP uses the supplied portrait of the styling stations. [phone-v1.webp](public/images/project-covers/anagha-salon-academy/phone-v1.webp)

> Use case: compositing and architectural photo retouching.
> Asset: an approximately 4:5 portrait cover for the mobile case study of Anagha’s Salon and Academy in Juinagar, Navi Mumbai.
> Input: the supplied front-facing portrait photo is the edit target. Keep the same real salon and centered composition. Reframe gently for 4:5 while keeping the central lit timber product niche, both flanking teal styling chairs with brass piping, enough of their armrests, the mirrors and honey-toned floor legible. The shelving and chair pairing are the focal point. Use the source’s symmetry and camera position. Lift blocked shadows modestly, balance the amber light with neutral walls, tame glare, retain deep teal and natural wood texture, and keep vertical joinery straight. Preserve the recognizable layout, lighting fixtures, fittings, displays and source attribution. Preserve the visible credit exactly as “Ar. Sharvari Pawaskar” in its current understated style, if in frame. Do not invent furniture, people, mirrors, displays, plantings, architectural details, additional words or logos. Deliver one polished but realistic image, full bleed, no borders, collage or website UI.

### Laptop cover

The 1536 × 1024 WebP uses the supplied wide salon photograph. [laptop-v1.webp](public/images/project-covers/anagha-salon-academy/laptop-v1.webp)

> Use case: compositing and architectural photo retouching.
> Asset: a 3:2 landscape case-study cover for laptops, showing Anagha’s Salon and Academy in Juinagar, Navi Mumbai.
> Input: the supplied empty wide salon photograph is the edit target. Keep the existing angled viewpoint and the full architectural context, with the existing glass-sided timber staircase on the left, the teal chairs with brass piping, mirrors, illuminated timber shelving, black shampoo stations and warm wood floor. Use this exact compact salon, keeping chair count and location, mirror geometry, cabinetry, stair treads, glazing and ceiling fixtures from the source. Refine exposure for natural-looking detail in highlights and shadows, neutralise the cast on pale surfaces, bring out subtle timber and upholstery texture, and retain the warm and teal palette. Keep verticals and realistic spatial proportions. Preserve the visible credit exactly as “Ar. Sharvari Pawaskar” in its existing understated style. Do not add people, fittings, decor, text, logos, room extensions, new openings, visual effects, border, collage or UI. Deliver one full-bleed, crisp editorial image.

### Gallery retouches

Built-in ImageGen removed the person and her mirror reflections from the last two supplied gallery photographs. The page labels both 1280 × 853 WebPs **AI-retouched**.

[Salon and wash station](public/images/projects/anagha-salon-academy/gallery/04-salon-and-wash-station-retouched.webp)

> Precisely retouch this supplied, real photograph of the Juinagar salon for its project gallery. Edit only to remove the seated woman at center-right (head, hands, clothing, crossed legs and shoes) and every reflection of her, especially the left-hand mirrored view near the tall shelving. Restore the real empty deep-teal salon chair she was sitting on, using the matching nearby chair as the visual guide for shape, brass piping and upholstery, and continue the original wood floor, mirror edges and reflections in the tiny occluded regions. Preserve the same 3:2 horizontal composition, lens viewpoint, original exposure and colors, chair positions and count, black shampoo basin in the foreground, existing display shelves, ceiling track lights, street view and curved white and gold reception desk. Preserve the original visible photographer/architect attribution 'Ar. Sharvari Pawaskar' in the original lower-right floor location, with correct spelling, size and white script. Keep every unaffected region faithful to the photo. No replacement person, ghost reflection, extra furniture, new labels, dramatic grading, rearrangement, crop, added decor, or room extension. Return the single full-frame photograph with the styling floor empty.

[Mirrors and product display](public/images/projects/anagha-salon-academy/gallery/05-mirror-wall-retouched.webp)

> Precisely retouch this supplied, real photograph of the Juinagar salon for its project gallery. Edit only to remove the woman standing behind the teal styling chair at center-right, including her hands on the chair, visible legs and shoes, and every reflection of her in the salon mirrors: the large side-profile reflection left of her near center and the smaller fragments in the faceted mirror at far left. Continue only the immediately occluded parts of the existing chair, glass and interior, leaving physically plausible reflections of the empty room. Preserve the exact 3:2 horizontal framing and angle, distinctive deep-teal styling chairs with brass piping and chrome bases, their original count and placement, mirrored wall, lit wood product shelves, the air-conditioner, track fixtures, cream walls, window and street view, and warm timber floor. Retain the existing white credit 'Ar. Sharvari Pawaskar' across the teal band at the top, spelled correctly and at original placement. Keep unchanged regions faithful and photorealistic. No new people, ghost reflections, substitute furniture, palette changes, new text, added decor, crop, or room extension. Return the single full-frame photograph with the salon empty.
