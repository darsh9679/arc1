# Recognition photographs and video

## Current media

The two award photographs supplied in the chat are used on the Recognition
page. The designated image folder contained no photos when this update began,
so those supplied attachments were imported directly:

- `public/images/recognition/award-portrait-2025.webp`: founder with certificate
  and trophy; the feature image and first photo in the event collection.
- `public/images/recognition/award-presentation-2025.webp`: the on-stage award
  presentation; second photo and static video preview.
- `public/videos/recognition/reg.mp4`: the supplied event recording, kept intact.

The photos are actual event photographs, encoded as sRGB WebP with full source
framing preserved and no AI regeneration. Their combined exported size is
257,148 bytes compared with 3,350,760 bytes for the original PNGs (about 92%
smaller). The feature and video poster use presentation crops in CSS; opening
a photo displays its complete framing in a contained viewer.

Original PNGs are backed up outside the public website in
`docs/source-assets/recognition-2026-10-23/`. Source and export hashes and asset
dimensions are recorded in `outputs/recognition-media-2026-10-23/assets.json`.

The original MP4 is 3,990,151 bytes, with H.264 video, 1024×576 dimensions and
approximately 22.84 seconds of footage. The interface rounds its duration to
0:23. It is not transcoded, muted, trimmed or regenerated.

## Presentation and loading

`lib/recognition-media.ts` supplies the filenames, dimensions, captions and
video information to `app/recognition/page.tsx`. `RecognitionMedia` provides:

- A compact event-photo collection, with a swipeable strip on phones.
- Full-size photo dialogs with Escape/Close, contained framing, focus return
  and the existing smooth-scroll lock.
- A 16:9 video card with a clear Watch button. No video element or MP4 source
  is mounted before the user presses Play. The native player then provides
  playback, seeking, volume and full-screen controls with inline phone support.
- A direct-video fallback if playback fails. Opening a photo pauses any playing
  film; closing the film removes the player and returns focus to its preview.

The video is an original event recording. No timed transcript/captions were
supplied; no invented speech transcript or fake captions were added.

To replace a photo, use the same filename and update the width/height and alt
text in `lib/recognition-media.ts` if they change. For additional photos, add a
descriptive file in `public/images/recognition/` and register it in that array.
To replace the film, update `reg.mp4` and its metadata in the same file. New
files are not discovered automatically for this editorial page.

These are local changes. A commit/push and deployment are needed to update the
live site; neither is performed by this media update.

## Validation

`node --test tests/recognition-media.test.mjs` checks server rendering without
mounting or preloading the MP4, event-photo accessibility text, the video-only
fallback, photo decoding and dimensions, and the supplied MP4 format.

Typechecking and linting cover the page and player implementation. Source
review covers mobile sizing, focus handling and deferred video mounting.
Live browser preview was rejected by the browser URL security policy in this
session, so playback, photo-dialog interactions and visual layout remain
unverified in a live browser. No alternate browser or browser-policy workaround
was used.
