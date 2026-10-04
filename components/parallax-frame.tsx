'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, desktopMotion } from '@/lib/motion';

/** Modest image depth; the frame, captions and reading surface stay still. */
export function ParallaxFrame({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(desktopMotion, () => {
      const node = frame.current;
      const image = node?.querySelector('.placeholder-image > img');
      if (!node || !image) return;
      gsap.fromTo(
        image,
        { yPercent: -3, scale: 1.1 },
        {
          yPercent: 3,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: node,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    });
    return () => media.revert();
  }, []);
  return (
    <div ref={frame} className={`parallax-frame ${className}`}>
      {children}
    </div>
  );
}
