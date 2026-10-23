# Parijat facade presentation revision

The first curated square photo included a white presentation border and sat
inside two wider contained image frames. The gallery also stretched across
ultrawide screens while its photograph height remained capped, leaving large
grey side areas. Fixed-height thumbnail strips cut off useful image content.

## Updated asset and presentation

- Built-in `image_gen` produced a 3:2 facade edit based on the supplied close and
  full exterior photographs. The full building, blue-and-white palette,
  arched window, gate and architect attribution remain visible.
- The result is an AI-enhanced interpretation of project photography. It is
  labelled **AI-enhanced project photograph** on the cover, active gallery
  caption and full-screen viewer, rather than represented as an unaltered photo.
- Saved website file:
  `public/images/projects/parijat-bungalow/gallery/01-bungalow-facade-enhanced-v1.webp`
  (1536 × 1024; 335,934 bytes). Sharp encoded the generated PNG as sRGB WebP.
- The existing first photo was replaced; the collection still has five images.
  The other four images and the bank gallery remain unchanged.
- Gallery headings and viewers now share a maximum width of 1360px. Main
  photographs still use `contain` to preserve their full framing; any remaining
  space blends into the section rather than appearing as a grey block.
- Thumbnails use a 4:3 frame on desktop, tablet and mobile instead of short
  fixed-height strips. Six-per-page browsing, keyboard controls, touch swipes,
  lazy loading and the full-screen viewer remain in place.

The replaced first WebP and its captions are backed up in
`docs/source-assets/project-curation-2026-10-22/presentation-before/`. All 30
original uploads remain in the adjacent `originals/` folders. Review images,
the generated PNG and browser proof screenshots are in
`outputs/parijat-presentation-2026-10-22/`. No GitHub push or deployment was made.

## Exact image-generation prompt

```text
Use case: precise-object-edit.
Asset type: architecture portfolio project cover and gallery photograph, landscape 3:2.
Primary request: Carefully enhance and reframe the supplied photograph of Parijat bungalow as a polished professional architectural photo. Input 1 is the close facade view, supporting design reference; Input 2 is the wider facade view, the edit target and source for the composition. Use Input 2's actual building, not a newly designed house.
Composition: a single edge-to-edge landscape photograph, 3:2 aspect ratio. Remove the white presentation margins outside the photo. Keep the entire main blue-and-white building and entrance gate in frame, with balanced sky and foreground. Do not put the image inside a frame or collage. Correct only mild camera tilt/perspective, compression softness and harsh blue/saturation, with natural daylight and realistic material texture.
Constraints: preserve the exact two-storey building geometry, the tall arched window with its real grid, roofline, balcony opening, metal railing, hanging swing, timber entrance slats, blue window trims, black-and-gold gate, boundary wall and planting. Do not add doors, windows, floors, luxury furnishings, people or architectural details. Preserve the existing architect attribution verbatim as a small legible credit in the lower-right of the photograph: "Ar.Sharvari Pawaskar (9890849232)". Do not remove the attribution. Keep the real surroundings believable and consistent with the target.
Avoid: redesign, stylized render, oversaturation, artificial HDR, new signage, white margins, blank sidebars, title cards.
Output: one landscape photograph at approximately 1800x1200 or larger, not a UI mockup.
```
