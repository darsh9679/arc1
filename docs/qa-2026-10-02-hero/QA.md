# Home hero — 2 October 2026

The initial redesign used full-width illustrative photography, a sans-serif brand headline, gold work/contact actions, two selectable interior moods and independent hero styles. Later phone and slideshow changes are documented below.

## Initial immersive design checks

- Production build passed after the final layout changes; all 17 pages generated.
- TypeScript checking passed. Lint passed for both changed React components.
- Browser review at 1366 × 768, 390 × 844 and 320 × 740: no horizontal overflow; the headline, description and actions fit. The narrowest layout stacks the calls to action and expands the scene controls.
- Both image moods displayed in the browser. Choosing a mood changes the backdrop and its credit, and pauses playback. Pause/play controls respond and expose their current action by name.
- Automatic backdrop changes were observed during preview. Each scene has a nine-second timer; progress, image drift and desktop pointer movement are progressive enhancements.
- The portfolio action navigated to `/work` through the existing route transition. Browser console inspection showed no warnings or errors at the time checked.
- Reduced-motion behavior reviewed in the implementation: no GSAP entrance/pointer effects, camera drift, animated crossfade or automatic scene rotation. Reduced motion was not separately emulated in the browser.

## Initial preview artifacts

- [Laptop](laptop.jpg)
- [Phone](mobile.jpg)

Screenshots were taken in the Codex in-app browser. Physical phone testing was not performed. Temporary viewport overrides were reset after review.

## Phone layout follow-up

The user approved the laptop design and requested clearer photography on phones. At 800px and below, the landscape interior now occupies a complete 3:2 frame, with `object-fit: contain`. The compact headline, description and actions sit below the photograph on a dark green background. The photo retains its illustrative label and photographer credit. Automatic backdrop rotation is limited to desktop; existing desktop presentation and motion remain intact.

- Production build and TypeScript checking passed. Component lint passed.
- Browser review at 390 × 844 and 320 × 740 found no horizontal overflow. The complete landscape photo is visible, with text outside the image.
- Both calls to action fit on one row at 320px after the final spacing adjustment.
- At 1366 × 768, the mobile figure is hidden and the approved immersive laptop hero remains visible, including its mood and playback controls. No horizontal overflow was found.
- These are responsive browser previews; physical phone testing was not performed. The temporary viewport override was reset and the temporary review tab was closed.

### Updated previews

- [Phone at 390px](mobile-revised.jpg)
- [Phone at 320px](mobile-320-revised.jpg)
- [Laptop after phone changes](laptop-after-mobile.jpg)

## Five-project slideshow revision

The final hero uses five supplied photographs, from Ghatkopar, Ratnagiri, Anagha’s Salon & Academy, Andheri and Thane. Desktop and mobile share a five-second timer and a one-second crossfade. Pause buttons and image selection bars have been removed from both layouts. Phones retain the complete image in a 3:2 frame, with 44px previous/next arrow buttons and horizontal touch swipes. Captions link to the matching project. Manual navigation restarts the timer; vertical scrolling remains native.

- Production build passed, generating all 17 pages. TypeScript and component lint passed.
- At 1366 × 768, five project images were present, automatic rotation was observed, no hero buttons were visible, and no horizontal overflow was found.
- At 390 × 844, all five phone images loaded and used `object-fit: contain`. Clicking Next traversed all five photos; automatic playback then wrapped from photo five to photo one.
- At 320 × 740, both 44px arrow controls fit inside the image frame. The previous arrow worked with the keyboard and no horizontal overflow was found.
- Swipe handling was reviewed in the implementation: a horizontal movement of at least 40px changes photos; vertical gestures and cancelled gestures do not. Physical touch testing was not performed.
- Reduced motion continues to disable automatic rotation and crossfades, while phone arrows and swipes remain available. Playback stops when the hero leaves view or the page is hidden.
- Temporary viewport sizing was reset and the final review tab was closed.

### Final previews

- [Phone with arrows](mobile-five-projects.jpg)
- [Laptop without slideshow controls](laptop-five-projects.jpg)

## Mobile photo presentation refinement

The user requested a cleaner treatment after reviewing the circular photo arrows and the gaps beside some images. The visible arrows are removed. The phone photograph itself supports tap-to-advance, horizontal swipes and keyboard left/right navigation. A quiet project caption and navigation hint sit below the photograph. All five photographs now fill a consistent 4:3 frame, using `object-fit: cover` and a composition-specific position for each project. Desktop presentation and the five-second timer are retained.

- Production build, TypeScript checking and component lint passed.
- All five crops were visually reviewed and saved at 390 × 844. The salon image fills the frame without the former side gaps or arrow overlays; the room compositions remain readable in the other four photographs.
- Tap-to-advance was observed in the browser. At 390px, the image frame measured 375.2 × 281.4 CSS pixels; all five images used `cover` and no horizontal overflow was found.
- At 320px, the frame measured 304.8 × 228.6 CSS pixels, giving the intended 4:3 ratio. The caption stayed inside the viewport and no horizontal overflow was found.
- Swipe and keyboard handling were reviewed in the implementation. A recognized swipe prevents a duplicate tap action, vertical scrolling remains native, and keyboard focus uses an inset outline. Physical touch testing was not performed; browser-control timeouts prevented a completed keyboard playback check.
- Restoring temporary preview sizing was attempted, but browser-control timeouts prevented confirmation. Temporary review tabs were not marked to persist.

### Refined phone previews

- [Ghatkopar](mobile-project-1-refined.jpg)
- [Ratnagiri](mobile-project-2-refined.jpg)
- [Anagha’s Salon & Academy](mobile-project-3-refined.jpg)
- [Andheri](mobile-project-4-refined.jpg)
- [Thane](mobile-project-5-refined.jpg)
