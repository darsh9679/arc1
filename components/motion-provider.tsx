'use client';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, desktopMotion } from '@/lib/motion';
import { BrandLogo } from '@/components/brand-logo';
import { OpeningSequence } from '@/components/opening-sequence';
import { ScrollReveals } from '@/components/scroll-reveals';
import { ScrollLockContext } from '@/components/scroll-lock-context';
import openingStyles from './opening-sequence.module.css';
import {
  holdLoaderCompletion,
  updateLoaderProgress,
} from '@/lib/loader-progress';

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const routeMeter = useRef({ progress: 0 });
  const cancelRouteCompletion = useRef(() => {});
  const completionTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const curtain = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const transitionState = useRef({ generation: 0 });
  const previousPath = useRef(pathname);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const scrolling = useRef<{
    instance: Lenis | null;
    locks: Set<symbol>;
    wasStopped: boolean | null;
  }>({ instance: null, locks: new Set(), wasStopped: null });
  const acquireScrollLock = useCallback(() => {
    const state = scrolling.current;
    const token = Symbol('scroll-lock');
    if (state.locks.size === 0) {
      state.wasStopped = state.instance?.isStopped ?? null;
    }
    state.locks.add(token);
    // stop() cancels momentum and synchronizes Lenis to the current page position.
    state.instance?.stop();
    return () => {
      if (!state.locks.delete(token) || state.locks.size > 0) return;
      if (state.wasStopped === false) state.instance?.start();
      state.wasStopped = null;
    };
  }, []);
  useEffect(() => {
    const state = scrolling.current;
    const media = gsap.matchMedia();
    media.add(desktopMotion, () => {
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
      });
      state.instance = lenis;
      if (state.locks.size > 0) {
        // A modal may precede initialization, or remain open across a breakpoint.
        state.wasStopped ??= lenis.isStopped;
        lenis.stop();
      }
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', () => ScrollTrigger.update());
      gsap.ticker.add(tick);
      document.documentElement.classList.add('has-smooth-scroll');
      return () => {
        gsap.ticker.remove(tick);
        if (state.instance === lenis) state.instance = null;
        lenis.destroy();
        document.documentElement.classList.remove('has-smooth-scroll');
      };
    });
    return () => media.revert();
  }, []);
  useEffect(() => {
    const node = curtain.current;
    if (!node) return;
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      document.getElementById('main-content')?.focus({ preventScroll: true });
      if (busy.current) {
        // A route has committed. This measures transition stages, not bytes.
        const generation = transitionState.current.generation;
        clearTimeout(timeout.current);
        clearTimeout(completionTimeout.current);
        cancelRouteCompletion.current();
        gsap.killTweensOf(node);
        gsap.killTweensOf(routeMeter.current);
        let completing = false;
        const complete = () => {
          if (completing || generation !== transitionState.current.generation)
            return;
          completing = true;
          clearTimeout(completionTimeout.current);
          gsap.killTweensOf(routeMeter.current);
          routeMeter.current.progress = 100;
          cancelRouteCompletion.current = holdLoaderCompletion(node, () => {
            if (generation !== transitionState.current.generation) return;
            const finish = () => {
              if (generation !== transitionState.current.generation) return;
              clearTimeout(completionTimeout.current);
              gsap.killTweensOf(node);
              gsap.set(node, { y: 0, yPercent: 100 });
              busy.current = false;
              node.style.pointerEvents = 'none';
              node.style.visibility = 'hidden';
            };
            completionTimeout.current = setTimeout(finish, 700);
            gsap.to(node, {
              yPercent: -100,
              duration: 0.35,
              ease: 'power3.inOut',
              onComplete: finish,
            });
          });
        };
        gsap.to(routeMeter.current, {
          progress: 100,
          duration: 0.25,
          ease: 'power1.out',
          onUpdate: () =>
            updateLoaderProgress(node, routeMeter.current.progress),
          onComplete: complete,
        });
        // A busy device may delay GSAP; completion still gets its own paint/hold.
        completionTimeout.current = setTimeout(complete, 700);
      }
      ScrollTrigger.refresh();
    }
  }, [pathname]);
  useEffect(() => {
    const curtainNode = curtain.current;
    const meter = routeMeter.current;
    const state = transitionState.current;
    const click = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = (event.target as Element).closest('a');
      if (
        !anchor ||
        anchor.target ||
        anchor.hasAttribute('download') ||
        anchor.hasAttribute('data-no-transition')
      )
        return;
      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname === window.location.pathname ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !curtain.current
      )
        return;
      event.preventDefault();
      if (busy.current) return;
      busy.current = true;
      const generation = ++state.generation;
      const node = curtain.current;
      clearTimeout(completionTimeout.current);
      cancelRouteCompletion.current();
      meter.progress = 0;
      updateLoaderProgress(node, 0);
      gsap.killTweensOf(meter);
      gsap.killTweensOf(node);
      node.style.pointerEvents = 'auto';
      node.style.visibility = 'visible';
      gsap.fromTo(
        node,
        { y: 0, yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.25,
          ease: 'power3.inOut',
          onComplete: () => {
            if (generation === state.generation) {
              // Hold here until usePathname confirms navigation has committed.
              meter.progress = 35;
              updateLoaderProgress(node, 35);
              node
                .querySelector('progress')
                ?.setAttribute('aria-valuetext', 'Waiting for the next page');
              router.push(url.pathname + url.search + url.hash);
            }
          },
        },
      );
      // Never trap the visitor behind a curtain if navigation fails or is cancelled.
      timeout.current = setTimeout(() => {
        if (generation !== state.generation) return;
        gsap.killTweensOf(node);
        gsap.to(node, {
          yPercent: -100,
          duration: 0.25,
          onComplete: () => {
            if (generation !== state.generation) return;
            busy.current = false;
            node.style.pointerEvents = 'none';
            node.style.visibility = 'hidden';
          },
        });
      }, 3500);
    };
    document.addEventListener('click', click, true);
    return () => {
      state.generation++;
      document.removeEventListener('click', click, true);
      clearTimeout(timeout.current);
      clearTimeout(completionTimeout.current);
      cancelRouteCompletion.current();
      gsap.killTweensOf(meter);
      gsap.killTweensOf(curtainNode);
      // Hot updates or effect replacement must not leave internal links blocked.
      busy.current = false;
      if (curtainNode) {
        gsap.set(curtainNode, { y: 0, yPercent: 100 });
        curtainNode.style.pointerEvents = 'none';
        curtainNode.style.visibility = 'hidden';
      }
    };
  }, [router]);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const node = cursor.current;
        if (!node) return;
        let frame = 0;
        const move = (event: PointerEvent) => {
          const target = (event.target as Element).closest<HTMLElement>(
            '[data-cursor]',
          );
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            node.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
            node.dataset.visible = target ? 'true' : 'false';
            document.documentElement.dataset.viewCursor = target
              ? 'active'
              : 'inactive';
            node.textContent = target?.dataset.cursor || 'View';
          });
        };
        const hide = () => {
          cancelAnimationFrame(frame);
          node.dataset.visible = 'false';
          document.documentElement.dataset.viewCursor = 'inactive';
        };
        document.addEventListener('pointermove', move);
        document.addEventListener('pointerleave', hide);
        document.addEventListener('keydown', hide);
        window.addEventListener('blur', hide);
        window.addEventListener('scroll', hide, { passive: true });
        return () => {
          cancelAnimationFrame(frame);
          hide();
          document.removeEventListener('pointermove', move);
          document.removeEventListener('pointerleave', hide);
          document.removeEventListener('keydown', hide);
          window.removeEventListener('blur', hide);
          window.removeEventListener('scroll', hide);
        };
      },
    );
    return () => media.revert();
  }, [pathname]);
  return (
    <ScrollLockContext.Provider value={acquireScrollLock}>
      <div data-site-surface>{children}</div>
      <OpeningSequence autoPlay={pathname !== '/'} />
      <ScrollReveals />
      <div
        ref={curtain}
        className="route-curtain"
        style={{ visibility: 'hidden' }}
      >
        <div className="curtain-content">
          <div className="curtain-brand" aria-hidden="true">
            <BrandLogo decorative eager />
            <span className="curtain-caption">Architecture & interiors</span>
          </div>
          <div className={openingStyles.progress}>
            <div className={openingStyles.progressLabel} aria-hidden="true">
              <span>Opening page</span>
              <span className={openingStyles.percentage} data-loader-percentage>
                0%
              </span>
            </div>
            <progress
              className={openingStyles.track}
              aria-label="Page transition progress"
              value={0}
              max={100}
              aria-valuetext="Starting page transition"
            >
              0%
            </progress>
          </div>
        </div>
      </div>
      <div ref={cursor} className="view-cursor" aria-hidden="true">
        View
      </div>
    </ScrollLockContext.Provider>
  );
}
