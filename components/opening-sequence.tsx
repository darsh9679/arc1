'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/motion';
import { studio } from '@/lib/content';
import {
  holdLoaderCompletion,
  updateLoaderProgress,
} from '@/lib/loader-progress';
import styles from './opening-sequence.module.css';

const SESSION_KEY = 'trayaksh-introduction-signature';

export function ReplayIntroduction() {
  return (
    <button
      type="button"
      className="replay-introduction"
      onClick={() => window.dispatchEvent(new Event('trayaksh:intro-replay'))}
    >
      Replay the introduction <span aria-hidden="true">↗</span>
    </button>
  );
}

/** A brief brand signature. Its timing does not represent network progress. */
export function OpeningSequence({ autoPlay = true }: { autoPlay?: boolean }) {
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDialogElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const dismiss = useRef(() => {});

  useEffect(() => {
    const replay = () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setVisible(true);
      }
    };
    window.addEventListener('trayaksh:intro-replay', replay);
    // The home page presents the practice immediately; manual replay is retained.
    if (!autoPlay) {
      return () => window.removeEventListener('trayaksh:intro-replay', replay);
    }
    const frame = requestAnimationFrame(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      try {
        if (sessionStorage.getItem(SESSION_KEY)) return;
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        // Storage is optional; the introduction must still be dismissible.
      }
      setVisible(true);
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('trayaksh:intro-replay', replay);
    };
  }, [autoPlay]);

  useLayoutEffect(() => {
    const node = root.current;
    if (!visible || !node) return;
    const surface = document.querySelector<HTMLElement>('[data-site-surface]');
    const oldInert = surface?.inert ?? false;
    const oldOverflow = document.documentElement.style.overflow;
    const oldGutter = document.documentElement.style.scrollbarGutter;
    const previousFocus =
      document.activeElement instanceof HTMLElement &&
      document.activeElement !== document.body
        ? document.activeElement
        : null;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let finished = false;
    let completing = false;
    let cancelCompletion = () => {};
    let exitTimeout: number | undefined;
    let timeline: gsap.core.Timeline | undefined;
    const restore = () => {
      if (surface) surface.inert = oldInert;
      document.documentElement.style.overflow = oldOverflow;
      document.documentElement.style.scrollbarGutter = oldGutter;
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      cancelCompletion();
      window.clearTimeout(exitTimeout);
      timeline?.kill();
      restore();
      if (node.contains(document.activeElement)) {
        (previousFocus?.isConnected
          ? previousFocus
          : document.getElementById('main-content')
        )?.focus({ preventScroll: true });
      }
      setVisible(false);
      window.dispatchEvent(new Event('trayaksh:intro-complete'));
    };
    const complete = () => {
      if (finished || completing) return;
      completing = true;
      timeline?.kill();
      cancelCompletion = holdLoaderCompletion(node, () => {
        if (finished) return;
        exitTimeout = window.setTimeout(finish, 700);
        try {
          timeline = gsap.timeline({ onComplete: finish });
          timeline
            .to(node.querySelector('[data-intro-signature]'), {
              opacity: 0,
              y: -8,
              duration: 0.3,
              ease: 'power2.in',
            })
            .to(
              node,
              { opacity: 0, duration: 0.4, ease: 'power2.inOut' },
              0.05,
            );
        } catch {
          finish();
        }
      });
    };
    dismiss.current = finish;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Tab') {
        event.preventDefault();
        finish();
      }
    };
    const preference = () => {
      if (media.matches) finish();
    };
    if (surface) surface.inert = true;
    // Keep the page aligned beneath the overlay while its scrollbar is hidden.
    if (window.innerWidth > document.documentElement.clientWidth)
      document.documentElement.style.scrollbarGutter = 'stable';
    document.documentElement.style.overflow = 'hidden';
    skip.current?.focus({ preventScroll: true });
    window.addEventListener('keydown', key);
    media.addEventListener('change', preference);
    updateLoaderProgress(node, 0);
    const failsafe = window.setTimeout(complete, 2600);
    try {
      if (media.matches) finish();
      else {
        const introduction = { progress: 0 };
        timeline = gsap.timeline({ onComplete: complete });
        timeline
          // Measure the introduction itself, not unknown network download bytes.
          // The exit is scheduled separately, after 100% has painted.
          .to(
            introduction,
            {
              progress: 100,
              duration: 1.12,
              ease: 'none',
              onUpdate: () => updateLoaderProgress(node, introduction.progress),
            },
            0,
          )
          .fromTo(
            node.querySelector('[data-intro-signature]'),
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            0,
          )
          .fromTo(
            node.querySelector('[data-intro-logo]'),
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0)', duration: 0.85, ease: 'power2.inOut' },
            0.08,
          )
          .fromTo(
            node.querySelector('[data-intro-caption]'),
            { opacity: 0, y: 4 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            0.35,
          );
      }
    } catch {
      complete();
    }
    return () => {
      finished = true;
      cancelCompletion();
      window.clearTimeout(exitTimeout);
      timeline?.kill();
      clearTimeout(failsafe);
      window.removeEventListener('keydown', key);
      media.removeEventListener('change', preference);
      restore();
      dismiss.current = () => {};
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <dialog
      ref={root}
      className={`opening-sequence ${styles.root}`}
      open
      data-lenis-prevent
      aria-modal="true"
      aria-label="Welcome to Trayaksh Architeqts"
    >
      <div className={styles.presentation}>
        <div
          className={styles.signature}
          data-intro-signature
          aria-hidden="true"
        >
          <div className={styles.logo}>
            <Image
              className={styles.logoUnderlay}
              src={studio.logoSrc}
              alt=""
              width={596}
              height={152}
              loading="eager"
              unoptimized
            />
            <div className={styles.logoReveal} data-intro-logo>
              <Image
                src={studio.logoSrc}
                alt=""
                width={596}
                height={152}
                loading="eager"
                unoptimized
              />
            </div>
          </div>
          <p className={styles.caption} data-intro-caption>
            Architecture & interiors
          </p>
        </div>
        <div className={styles.progress}>
          <div className={styles.progressLabel} aria-hidden="true">
            <span>Opening the studio</span>
            <span className={styles.percentage} data-loader-percentage>
              0%
            </span>
          </div>
          <progress
            className={styles.track}
            aria-label="Introduction progress"
            value={0}
            max={100}
          >
            0%
          </progress>
        </div>
      </div>
      <button
        type="button"
        className={styles.skip}
        ref={skip}
        onClick={() => dismiss.current()}
      >
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </dialog>
  );
}
