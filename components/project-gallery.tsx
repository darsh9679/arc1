'use client';
import { useState, type CSSProperties } from 'react';
import { PlaceholderImage } from '@/components/placeholder-image';
import { Slider } from '@/components/ui/slider';
import type { Project } from '@/lib/content';
import { isConceptImage } from '@/lib/imagery';
export { ProjectGallery } from './project-gallery-browser';

export function BeforeAfter({ project }: { project: Project }) {
  const [position, setPosition] = useState(50);
  return (
    <section className="comparison-section section-pad">
      <div className="section-heading">
        <div>
          <p className="eyebrow">04 / Transformation</p>
          <h2>
            The possibility
            <br />
            <em>within a space.</em>
          </h2>
        </div>
        <p className="section-aside">
          {isConceptImage(project.before) || isConceptImage(project.after)
            ? 'An AI-generated bare-shell and furnished-space comparison. Drag to explore the design possibility; this is not a record of an actual project transformation.'
            : project.before && project.after
              ? 'From the existing space to the finished interior. Drag the divider to compare.'
              : 'Before-and-after photography is not yet supplied. These two illustrative studies demonstrate the comparison, not the actual project transformation.'}
        </p>
      </div>
      <div
        className="comparison"
        style={{ '--split': `${position}%` } as CSSProperties}
      >
        <PlaceholderImage
          src={project.after}
          variant="perspective"
          alt={
            project.after
              ? `${project.title}, finished interior`
              : 'After placeholder: illustrative furnished space; not the actual project.'
          }
        />
        <div
          className="comparison-before"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <PlaceholderImage
            src={project.before}
            variant="shell"
            alt={
              project.before
                ? `${project.title}, before work`
                : 'Before placeholder: illustrative empty shell; not the actual project.'
            }
          />
        </div>
        <span className="comparison-label before-label">
          Before
          {isConceptImage(project.before)
            ? ' / concept'
            : !project.before && ' / study'}
        </span>
        <span className="comparison-label after-label">
          After
          {isConceptImage(project.after)
            ? ' / concept'
            : !project.after && ' / study'}
        </span>
        <div className="comparison-divider" aria-hidden="true">
          <span>↔</span>
        </div>
        <Slider
          className="comparison-slider"
          value={[position]}
          onValueChange={(value) =>
            setPosition(Array.isArray(value) ? value[0] : value)
          }
          min={0}
          max={100}
          step={1}
          thumbLabel="Before and after image comparison"
          valueText={(value) => `${value}% before, ${100 - value}% after`}
          aria-describedby="comparison-help"
        />
      </div>
      <p className="comparison-help" id="comparison-help">
        Drag the divider, or focus it and use the arrow keys. {position}% before
        / {100 - position}% after.
      </p>
    </section>
  );
}
