'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion';

/** The page stays readable without animation; only a short vertical settling motion is added. */
export function EditorialMotion({ page }: { page: 'recognition' | 'contact' }) {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>(
      `[data-editorial-page="${page}"]`,
    );
    if (!main) return;
    let disposed = false;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      main
        .querySelectorAll<HTMLElement>('[data-editorial-reveal]')
        .forEach((panel) => {
          gsap.fromTo(
            panel,
            { y: 14 },
            {
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: { trigger: panel, start: 'top 96%', once: true },
              onComplete: () => {
                gsap.set(panel, { clearProps: 'transform' });
              },
            },
          );
        });
    });
    void document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => {
      disposed = true;
      media.revert();
    };
  }, [page]);
  return null;
}
