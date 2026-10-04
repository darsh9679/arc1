'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/motion';

/** Progressive enhancement: headings are fully visible without JavaScript. */
export function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    // These editorial pages should remain readable immediately while scrolling
    // or opening their native disclosures.
    if (main.matches('.home-page, .studio-page')) return;

    let disposed = false;
    let refreshFrame = 0;
    const refresh = () => {
      if (disposed || refreshFrame) return;
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        if (!disposed) ScrollTrigger.refresh();
      });
    };

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const animations = new Map<HTMLElement, gsap.core.Tween>();
      const headings = main.querySelectorAll<HTMLElement>(
        'h1, .section-heading h2',
      );

      headings.forEach((heading) => {
        // Keep controls, screen-reader text, and the interactive hero untouched.
        if (
          heading.closest(
            '.hero-content, [data-hero-content], .sr-only, [hidden], [inert], a, button',
          ) ||
          heading.matches('[tabindex], [contenteditable="true"]') ||
          heading.querySelector(
            'a, button, input, select, textarea, [contenteditable="true"], [tabindex]',
          ) ||
          heading.contains(document.activeElement)
        )
          return;

        const tween = gsap.fromTo(
          heading,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 94%',
              once: true,
              invalidateOnRefresh: true,
            },
            onComplete: () => {
              gsap.set(heading, { clearProps: 'transform,opacity,visibility' });
            },
          },
        );
        animations.set(heading, tween);
      });

      // Programmatic or keyboard focus must never wait for a scroll animation.
      const revealFocusedHeading = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        const heading = event.target.closest<HTMLElement>('h1, h2');
        if (!heading) return;
        const tween = animations.get(heading);
        if (!tween) return;
        tween.progress(1);
        tween.scrollTrigger?.kill();
      };
      main.addEventListener('focusin', revealFocusedHeading);
      return () => main.removeEventListener('focusin', revealFocusedHeading);
    });

    const imageReady = (event: Event) => {
      if (event.target instanceof HTMLImageElement) refresh();
    };
    main.addEventListener('load', imageReady, true);
    main.addEventListener('error', imageReady, true);
    main.addEventListener('toggle', refresh, true);
    window.addEventListener('trayaksh:intro-complete', refresh);
    void document.fonts.ready.then(refresh, refresh);
    refresh();

    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      main.removeEventListener('load', imageReady, true);
      main.removeEventListener('error', imageReady, true);
      main.removeEventListener('toggle', refresh, true);
      window.removeEventListener('trayaksh:intro-complete', refresh);
      media.revert();
    };
  }, [pathname]);

  return null;
}
