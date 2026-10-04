# Project gallery verification — 30 September 2026

## Scope

Long project collections now default to an Overview grid. Visitors can switch to the horizontal Sequence and open any image in a native full-screen dialog. Small collections retain the desktop scroll animation. No real project photography was added or changed.

The viewer implements uncropped photographs and drawings, captions and provenance, image counts, previous/next, a jump selector, keyboard navigation, touch swipes, native focus containment and focus restoration. Mobile styles use safe-area padding, bounded image heights and 44px or larger controls. Reduced motion disables transitions and pinned movement.

## Completed checks

- A temporary server-rendered 20-entry collection included all entries in order, opened in Overview, exposed a labelled dialog trigger for every entry and lazy-loaded raster images. The temporary route and generated route reference were removed afterwards.
- The image-discovery regression fixture now contains 24 files in deliberately unsorted creation order. Every image is discovered and sorted numerically, including images beyond fourteen.
- All 11 image-discovery tests and all 12 enquiry tests passed.
- The final production build, lint, TypeScript check and Git whitespace check passed.
- Nine route smoke checks passed: headings, client copy, project gallery counts and order, image delivery and provenance, contact fields, disabled submission behavior and missing-page responses.
- Independent code review identified and corrected the pinned element's React ownership during view changes, and SVG drawing crops in the viewer. The two layout wrappers have different React keys so the pinned node is not reconciled into the other layout.
- The viewer acquires a shared Lenis lock before recording its scroll position and releases it after restoring focus and position. The lock handles overlapping consumers, duplicate cleanup and replacement smooth-scroll instances. This received code review and type/lint checks; momentum behavior still needs the interactive checks below.

## Browser QA follow-up — 1 October 2026

The earlier browser access limitation was resolved. Interactive checks now cover the existing four-image project and a temporary twenty-image collection of clearly labelled, repeated concept images and drawings. The temporary route and generated route type were removed after testing.

- At 1366×768, the four-image project switched from Sequence to Overview, back to its pinned Sequence, and back to Overview without application errors or horizontal page overflow.
- The twenty-image collection opened in Overview. Every image had a numbered, labelled viewer trigger.
- The desktop viewer focused its close button on opening. Jumping to image 20 displayed the correct count and disabled Next. Home returned to image 1. Escape closed the viewer, restored focus to the opening image and restored the exact opening scroll position.
- Photographs use `object-fit: contain`; at 390×844, the drawing viewer used `preserveAspectRatio="xMidYMid meet"`. Controls remained within the viewport, with no horizontal page overflow.
- The twenty-image Sequence used native horizontal scrolling rather than a long pinned animation, and retained all twenty entries without page overflow.
- No application errors appeared in the inspected browser log. Temporary viewport overrides were reset and the normal contact preview restored.
- Viewer screenshots: [desktop](qa-2026-10-01-gallery/viewer-desktop.png), [mobile drawing](qa-2026-10-01-gallery/viewer-mobile.png).

## Remaining manual checks

Physical-device touch swipes and pinch zoom, reduced-motion emulation, rapid opening/closing during active smooth-scroll momentum, and keyboard tabbing through a pinned Sequence were not verified. The normal open/close scroll restoration check is not a momentum stress test. Short-landscape navigation was checked separately in the [contact QA report](qa-2026-09-30-contact/README.md).
