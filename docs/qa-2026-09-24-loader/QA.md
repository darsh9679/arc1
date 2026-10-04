# Perspective introduction — 24 September 2026

Replaces the split text/material-photo introduction with a centered architectural aperture.

- Fine perspective lines draw around a living-space concept, then the image opens from its center and settles gently.
- The client's three pillars — Space. People. Possibility. — enter in sequence. The original SVG logo stays visible throughout.
- Warm paper, brass lines and olive italic typography use the existing global brand colors and local fonts.
- The composition recedes before an upward curtain exit. The full sequence lasts 2.8 seconds, with a 3.4-second failsafe. No simulated download counter and no new dependencies.
- The image remains labelled AI concept study. The introduction never waits for this image to load.
- A new session key lets returning visitors see this replacement once. Footer replay remains available.
- The visible Enter the studio control immediately dismisses the introduction; Escape and Tab also dismiss it. Reduced-motion visitors bypass it.

## Verification

- Production build, TypeScript, lint and whitespace checks passed.
- Existing nine-page smoke checks passed, including content, metadata, project galleries, asset delivery, and enquiry validation. No real enquiry was sent.
- Browser checks at 1366×768, 390×844, 320×568, 768×1024, 844×390 and 568×320: no horizontal overflow; logo, photo, text and dismiss control within the viewport. Screenshots and measurements are in this folder.
- Immediate button dismissal, Escape, Tab and natural completion: dialog removed, site inert attribute removed, original overflow restored, focus returned to the replay control. Natural completion measured approximately 2.8 seconds.
- Stroke-dash lengths, image clip and text transforms were observed changing between the initial and completed reveal frames.
- Same-session reload skips the introduction. No browser warnings or errors observed.
- Review caught a DrawSVG/non-scaling-stroke measurement mismatch; animated strokes now scale with the SVG, including the taller mobile composition. Short screens retain safe-area padding.

Browser QA used Chromium viewport overrides, not physical devices. Reduced-motion behavior and image-failure fallback were reviewed in code, not tested with an OS preference change or network throttling. The full interaction matrix ran on the development preview. Desktop/mobile replay and natural completion were then checked on the production build; the saved screenshots are from that build. Nine-page smoke checks passed on both previews. The temporary production server was stopped afterward; the development server remains available.
