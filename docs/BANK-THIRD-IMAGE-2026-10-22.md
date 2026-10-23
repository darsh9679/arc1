# Vishwabharti Bank: third gallery image

The user supplied the founder/meeting-room photograph and explicitly requested
a regenerated version as image three of the Vishwabharti Bank project.

Built-in `image_gen` edited the supplied photograph with instructions to retain
the founder's identity, room layout, teal-and-white palette, furnishings and
architect attribution while improving photographic clarity and exposure.
This remains a generated enhancement rather than an unaltered source photograph;
the existing shared image-credit helper labels it **AI-enhanced project photograph**
in the gallery and full-screen viewer.

Website asset:
`public/images/projects/vishwabharti-bank/gallery/03-meeting-room-founder-enhanced-v1.webp`

The filename places it third after the counter and cabin photographs. Its caption
is **Meeting room with the founder**, including in the Jump to image selector.
The first two images and the project cover remain unchanged.

The supplied original and previous caption file are preserved in
`docs/source-assets/bank-third-image-2026-10-22/`. The original camera file also
remains in the earlier project-curation archive. The generated PNG, optimized
image information and browser proof are in `outputs/bank-third-image-2026-10-22/`.
Sharp encodes the generated result as sRGB WebP without upscaling.
No GitHub push or deployment is part of this change.

## Exact built-in image-generation prompt

```text
Use case: identity-preserve.
Asset type: architectural portfolio gallery photograph, landscape 3:2.
Edit target: the attached actual Vishwabharti Bank meeting-room photograph, including the founder standing behind a teal chair.
Primary request: create a professionally retouched, natural photographic version of this exact photo for the project's third gallery image. Improve exposure balance, white balance, fine detail, clarity and subtle perspective only. Keep the cool teal, white and natural green design palette faithful to the original. White surfaces should be clean and natural, with soft realistic daylight, not blown-out highlights or artificial HDR.
Identity invariants: preserve the woman's exact identity, facial features, face shape, skin tone, smile, expression, hair, pose, hands, white blouse and dark trousers. Do not beautify, change age, replace her face or invent a different person. Her face should remain as unchanged as possible from the source.
Room invariants: preserve the actual oval-ended white marble-look conference table and its veins, teal upholstered chairs with black frames, plants on the table, white horizontal window blinds, overhead storage, green wall panel, teal border around the large pale wall panel and existing ceiling spotlights. Preserve the room proportions, camera view and existing furniture placement. Do not add luxury details or other people.
Composition: one clean edge-to-edge 3:2 landscape photo, suitable for desktop and mobile gallery display with no presentation borders. Keep her entire visible body and the usable room/table context in frame; preserve the photographed scene rather than making a portrait crop.
Text: preserve the existing architect credit verbatim, legible in its original white handwritten style: "Ar.Sharvari Pawaskar". Do not erase the credit.
Avoid: redesigning the room, changing the face or hands, smooth plastic skin, stylized rendering, oversaturation, new furniture, collage, white borders, extra text or logos.
Output: one polished high-detail landscape photograph, preferably 1800x1200 or larger.
```
