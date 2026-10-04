'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion';

/** Gentle movement only: all copy stays visible before and during enhancement. */
export function StudioMotion() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('.studio-page');
    if (!main) return;

    const links = Array.from(
      main.querySelectorAll<HTMLAnchorElement>(
        'nav[aria-label="On this page"] a[href^="#"]',
      ),
    );
    const visibleSections = new Set<Element>();
    const navigationSections = Array.from(
      main.querySelectorAll(
        '#practice, #founder, #philosophy, #vision, #design, #services, #process',
      ),
    );
    let currentSection: IntersectionObserver | undefined;
    const watchSections = () => {
      currentSection?.disconnect();
      visibleSections.clear();
      currentSection = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visibleSections.add(entry.target);
            else visibleSections.delete(entry.target);
          });
          const active = Array.from(visibleSections).sort(
            (a, b) =>
              b.getBoundingClientRect().top - a.getBoundingClientRect().top,
          )[0];
          if (!active) return;
          const sectionHash =
            active.id === 'design' ? '#philosophy' : `#${active.id}`;
          links.forEach((link) => {
            if (link.hash === sectionHash)
              link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        },
        {
          rootMargin: `-${Math.round(window.innerHeight * 0.16)}px 0px -${Math.round(window.innerHeight * 0.66)}px 0px`,
        },
      );
      navigationSections.forEach((section) => currentSection?.observe(section));
    };
    watchSections();
    window.addEventListener('resize', watchSections);

    let disposed = false;
    let frame = 0;
    const refresh = () => {
      if (disposed || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!disposed) ScrollTrigger.refresh();
      });
    };

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      main
        .querySelectorAll<HTMLElement>('[data-studio-reveal]')
        .forEach((panel) => {
          gsap.fromTo(
            panel,
            { y: 16 },
            {
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: { trigger: panel, start: 'top 94%', once: true },
              onComplete: () => {
                gsap.set(panel, { clearProps: 'transform' });
              },
            },
          );
        });
      main
        .querySelectorAll<HTMLElement>('[data-studio-image] .placeholder-image')
        .forEach((image) => {
          gsap.fromTo(
            image,
            { scale: 1.035 },
            {
              scale: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: image.parentElement,
                start: 'top 94%',
                once: true,
              },
              onComplete: () => {
                gsap.set(image, { clearProps: 'transform' });
              },
            },
          );
        });
    });

    main.addEventListener('load', refresh, true);
    main.addEventListener('toggle', refresh, true);
    void document.fonts.ready.then(refresh, refresh);
    refresh();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      main.removeEventListener('load', refresh, true);
      main.removeEventListener('toggle', refresh, true);
      media.revert();
      currentSection?.disconnect();
      window.removeEventListener('resize', watchSections);
      links.forEach((link) => link.removeAttribute('aria-current'));
    };
  }, []);
  return null;
}
