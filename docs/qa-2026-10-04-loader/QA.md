# Loader completion timing

The page-transition curtain previously set React progress state to 100 and immediately started its exit in the same effect. Cached navigation could leave only its 35% waiting stage perceptible. The introduction's fixed 2.6-second failsafe could also dismiss a GSAP animation before its percentage finished on a busy device.

The visible percentage and native progress value now update together from GSAP, without a separate React render for each percentage. After successful completion, both loaders explicitly write 100%, wait for two animation frames and then hold for 220ms before beginning their exit. The committed route animates its final percentage over 250ms. The introduction's failsafe goes through the same completion hold. Skip, Escape, Tab and reduced-motion dismissal remain immediate by design.

Completion scheduling is cancellable so an old hold cannot dismiss a later replay. Hidden tabs release the completion wait rather than retaining an invisible overlay; exit timers also protect against a paused GSAP ticker. Navigation that does not commit retains its existing timeout release and does not falsely claim 100% success.

## Verification

`npm run test:loader` passed all five deterministic clock tests:

- A cached route at 35% reaches 100%, waits for paint opportunities and holds before exiting.
- A stalled introduction at 30% cannot skip the completion paint when its timeout fires.
- Skip/teardown cancels queued callbacks and cannot dismiss a later replay.
- A newly hidden tab releases completion when frame callbacks are suspended.
- Completion in an already hidden tab releases once, without retained timers.

Typecheck, lint and production build passed; all 17 static pages generated successfully. Browser automation was unavailable during this correction, so these are automated timing checks and source review rather than a new visual browser capture.
