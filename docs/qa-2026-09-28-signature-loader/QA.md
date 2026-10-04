# Logo introduction — 28 September 2026

Replaces the rejected illustrated introduction with a centered, original SVG logo, small Architecture & interiors caption, and a fine brass rule. No photography, perspective drawing, slogans, percentages, spinner, or new dependency. The original logo colors and aspect ratio are preserved on the brand paper background.

The logo gently resolves from a faint underlay to full color. The rule draws and recedes, followed by a short fade into the page. Total timeline: 1.8 seconds; safety timeout: 2.6 seconds. Playback is once per session under a new session key. Skip, Escape, Tab and footer replay remain supported. Reduced-motion visitors bypass the introduction.

The animation uses a layout effect and CSS initial states to avoid a first-frame flash. Existing scrollbar space is retained during dismissal, and original inert, overflow and gutter values are restored afterward.

## Checks

- Production build, lint, TypeScript and diff whitespace checks passed.
- Development viewport checks at 1366×768, 390×844, 320×568 and 568×320: no overflow, all logo/caption/Skip elements in bounds, 44px Skip target. See responsive-checks.json.
- Production first visit displayed the introduction; same-session reload skipped it. Desktop and mobile screenshots in this folder are from the production build.
- Skip click, Escape, Tab and natural completion all removed the overlay, restored scrolling and returned focus to Replay the introduction. Natural completion measured about 1.87 seconds including observation overhead. See dismissal-checks.json.
- Independent code review found no remaining loader lifecycle issues.
- Reduced motion and the safety timeout were reviewed in code, not simulated. Viewports were Chromium overrides, not physical devices. An existing development warning about the homepage workspace image's loading priority was observed; it is unrelated to this logo-only component.

The temporary production server was stopped after QA. The development preview remains running on port 3000. No deployment or GitHub push was performed for this change.
