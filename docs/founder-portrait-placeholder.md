# Temporary founder portrait

**Historical record:** On 4 October 2026 the user supplied the actual founder photograph. Its edited version is now shown in Studio; this fictional placeholder is no longer referenced. See [the current portrait and replacement guide](FOUNDER-PORTRAIT.md).

The client explicitly requested a random image to be replaced with the real founder photograph later. This image is a generic fictional person, not Ar. Sharvari Pawaskar. The Studio figure has a visible temporary-portrait caption and truthful alternative text.

## Replace the file

1. Put the real founder photo at `public/images/studio/founder-portrait.png`, replacing the current PNG with a genuine PNG of the same name. A vertical photo with space above the head works best.
2. In `lib/content.ts`, set `studio.portraitIsPlaceholder` to `false` once the approved photo is in place. This removes the placeholder caption and uses the founder's name in the alternative text.
3. Refresh the page and check the crop on a phone and laptop. The photo is shown at 230px high on phones and 360px high on larger screens.

The site references the project-local asset; it does not depend on a remote image service or an API key.

## Generation

- Mode: built-in imagegen, using the imagegen skill.
- Saved asset: `public/images/studio/founder-portrait.png`.
- Source: `C:/Users/KAIF SHAIKH/.codex/generated_images/01a0ffa4-b4d1-7791-9c7e-0e8610bddb53/exec-1a58ab9a-b937-4437-8650-56ddb5aa8ec8.png`.
- The seven existing AI architecture concepts retain their separate provenance labels.

Exact prompt:

> Use case: photorealistic-natural. Asset type: temporary founder portrait placeholder for an architecture studio website. Create an editorial photograph of a fictional adult Indian woman architect in her early thirties, wearing a simple cream linen shirt, standing in a quietly elegant architecture studio with a warm plaster wall, timber desk and a few rolled drawings softly out of focus. Natural window light, calm professional expression, natural skin texture, no retouching glamour. Vertical portrait composition, framed from the waist up, face around the upper third, enough space around head and shoulders for responsive crops. Restrained cream, olive and timber palette. This is a generic fictional placeholder, not Ar. Sharvari Pawaskar or any real person. No text, no logos, no watermark.
