'use client';
import { useEffect, useRef, type CSSProperties } from 'react';
import { PlaceholderImage } from '@/components/placeholder-image';
import { processSteps } from '@/lib/content';
import { gsap, pinnedMotion } from '@/lib/motion';

export function ProcessStack({ caseStudy = false }: { caseStudy?: boolean }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(pinnedMotion, () => {
      const cards =
        root.current?.querySelectorAll<HTMLElement>('.process-card');
      cards?.forEach((card, i) => {
        if (i < cards.length - 1)
          gsap.to(card, {
            scale: 0.96,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top 90%',
              end: 'top 20%',
              scrub: true,
            },
          });
      });
    });
    return () => media.revert();
  }, []);
  return (
    <section className="process-section section-pad" ref={root}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {caseStudy ? '03 / The approach' : 'Our process'}
          </p>
          <h2>
            From understanding
            <br />
            to <em>experience.</em>
          </h2>
        </div>
        <p className="section-aside">
          {caseStudy
            ? 'Our practice-wide process. Project-specific documentation will be added with the approved case study.'
            : 'Understand. Observe. Envision. Develop. Coordinate. Realise.'}
        </p>
      </div>
      <div className="process-stack">
        {processSteps.map((step, index) => (
          <div
            className="process-sticky"
            key={step.title}
            style={
              {
                '--stack': index,
                '--rotation': `${index % 3 === 1 ? 0.5 : index % 3 === 2 ? -0.35 : 0}deg`,
              } as CSSProperties
            }
          >
            <article className="process-card">
              <PlaceholderImage
                src={step.src}
                variant={step.drawing}
                alt={`Illustrative drawing for ${step.title.toLowerCase()}, not a project record.`}
              />
              <div className="process-glass">
                <p className="eyebrow">{step.subtitle}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="process-index" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
