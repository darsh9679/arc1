export type LoaderClock = {
  requestFrame: (callback: () => void) => number;
  cancelFrame: (id: number) => void;
  setTimer: (callback: () => void, delay: number) => number;
  clearTimer: (id: number) => void;
  isHidden: () => boolean;
};

const browserClock: LoaderClock = {
  requestFrame: (callback) => window.requestAnimationFrame(callback),
  cancelFrame: (id) => window.cancelAnimationFrame(id),
  setTimer: (callback, delay) => window.setTimeout(callback, delay),
  clearTimer: (id) => window.clearTimeout(id),
  isHidden: () => document.visibilityState === 'hidden',
};

/** Keep GSAP's visual counter and native progress value in the same frame. */
export function updateLoaderProgress(root: HTMLElement, value: number) {
  const progress = Math.max(0, Math.min(100, Math.round(value)));
  const bar = root.querySelector<HTMLProgressElement>('progress');
  const counter = root.querySelector<HTMLElement>('[data-loader-percentage]');
  if (bar) {
    bar.value = progress;
    bar.setAttribute('aria-valuetext', `${progress}% complete`);
  }
  if (counter) counter.textContent = `${progress}%`;
}

/** A completed loader must paint 100% before its exit animation can start. */
export function holdLoaderCompletion(
  root: HTMLElement,
  onReadyToExit: () => void,
  clock: LoaderClock = browserClock,
) {
  let stopped = false;
  let frame: number | undefined;
  let hold: number | undefined;
  const background = { watchdog: undefined as number | undefined };
  const cancel = () => {
    stopped = true;
    if (frame !== undefined) clock.cancelFrame(frame);
    if (hold !== undefined) clock.clearTimer(hold);
    if (background.watchdog !== undefined)
      clock.clearTimer(background.watchdog);
  };
  const exit = () => {
    if (stopped) return;
    cancel();
    onReadyToExit();
  };
  updateLoaderProgress(root, 100);
  if (clock.isHidden()) {
    exit();
    return cancel;
  }
  // The first frame precedes a paint; the second guarantees a paint opportunity.
  frame = clock.requestFrame(() => {
    if (stopped) return;
    frame = clock.requestFrame(() => {
      if (!stopped) hold = clock.setTimer(exit, 220);
    });
  });
  // Background tabs can suspend frames. They must not retain an invisible lock.
  background.watchdog = clock.setTimer(() => {
    if (clock.isHidden()) exit();
  }, 1200);
  return cancel;
}
