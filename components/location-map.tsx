'use client';
/* oxlint-disable jsx-a11y/prefer-tag-over-role -- This animated inline SVG needs an explicit image role and descriptive title. */
import { useEffect, useId, useRef } from 'react';
import { gsap } from '@/lib/motion';

export function LocationMap() {
  const root = useRef<HTMLElement>(null);
  const id = useId().replaceAll(':', '');
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const path = root.current?.querySelector<SVGPathElement>('.map-route');
      const dot = root.current?.querySelector('.map-traveller');
      if (!path || !dot) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: 1,
        },
      });
      tl.fromTo(path, { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none' }, 0);
      tl.to(
        dot,
        {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
          ease: 'none',
        },
        0,
      );
    });
    return () => media.revert();
  }, []);
  return (
    <figure ref={root} className="location-map">
      <svg
        viewBox="0 0 1000 620"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
      >
        <title id={`${id}-title`}>
          Nerul and DY Patil Stadium — indicative location context
        </title>
        <desc id={`${id}-desc`}>
          The confirmed workspace is on the 31st floor in Nerul, overlooking DY
          Patil Stadium. This diagram shows that relationship, not the exact
          building, road layout or a navigable route.
        </desc>
        <defs>
          <pattern
            id={`${id}-grid`}
            width="35"
            height="35"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M35 0H0V35"
              fill="none"
              stroke="currentColor"
              opacity=".12"
            />
          </pattern>
        </defs>
        <rect width="1000" height="620" fill={`url(#${id}-grid)`} />
        <g
          className="map-blocks"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M80 75H280V218H80ZM335 75H490V218H335ZM80 276H280V490H80ZM336 276H490V420H336ZM548 75H689V168H548ZM745 75H920V168H745ZM548 225H610V420H548ZM548 480H920V550H548ZM744 390H920V420H744Z" />
          <path
            d="M20 245H550Q716 245 716 178V0M310 0V620M516 0V620M0 451H1000"
            opacity=".55"
          />
          <path d="M800 264C800 197 957 197 957 264V325C957 392 800 392 800 325ZM815 264C815 214 942 214 942 264V325C942 375 815 375 815 325Z" />
          <ellipse cx="879" cy="293" rx="44" ry="54" />
          <path d="M874 280H884V307H874Z" />
        </g>
        <path
          className="map-route"
          d="M177 355L310 355Q310 355 310 310L310 245H675Q716 245 716 294H790"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <circle
          className="map-traveller"
          cx="177"
          cy="355"
          r="5"
          fill="currentColor"
        />
        <circle
          cx="177"
          cy="355"
          r="11"
          fill="var(--color-paper)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="177" cy="355" r="3" fill="currentColor" />
        <circle cx="790" cy="294" r="5" fill="currentColor" />
        <g fill="currentColor" fontFamily="var(--font-body), sans-serif">
          <text x="98" y="327" fontSize="19">
            Nerul
          </text>
          <text x="98" y="394" fontSize="10" letterSpacing="1.3">
            NAVI MUMBAI
          </text>
          <text x="775" y="461" fontSize="17">
            DY Patil Stadium
          </text>
          <text x="80" y="572" fontSize="10" letterSpacing="1.8">
            LOCATION RELATIONSHIP · NOT TO SCALE
          </text>
          <text x="939" y="49" fontSize="10">
            N
          </text>
        </g>
        <path
          d="M943 83V57M936 65L943 57 950 65"
          fill="none"
          stroke="currentColor"
        />
      </svg>
      <figcaption>
        Indicative context diagram, not directions. The exact building and
        access route are awaiting confirmation.{' '}
        <a
          href="https://www.google.com/maps/search/?api=1&query=DY+Patil+Stadium+Nerul"
          target="_blank"
          rel="noreferrer"
        >
          Explore the area ↗
        </a>
      </figcaption>
    </figure>
  );
}
