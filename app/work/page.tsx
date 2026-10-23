import { ProjectGrid } from '@/components/project-grid';
import { pageMetadata } from '@/lib/metadata';
import { clientCopy } from '@/lib/client-copy';
import { PracticeExperience } from '@/components/practice-content';
import { projects } from '@/lib/content';
import styles from './work.module.css';
export const metadata = pageMetadata(
  'Work',
  'Explore architecture and selected residential, hospitality and workplace interiors by Trayaksh Architeqts.',
  '/work',
  '/og.png',
);
export default function Work() {
  return (
    <main
      id="main-content"
      className={`inner-page portfolio-page ${styles.page}`}
      tabIndex={-1}
    >
      <section className="portfolio-intro section-pad">
        <div className="portfolio-kicker">
          <p className="eyebrow">Architecture & interiors</p>
          <p className="eyebrow">Mumbai · Pan India</p>
        </div>
        <div className="portfolio-title-row">
          <h1>
            Spaces with <em>perspective.</em>
          </h1>
          <a
            className="portfolio-index-link"
            href="#project-index"
            aria-label="Explore the project index"
          >
            <span aria-hidden="true">↙</span>
            <span>
              Explore
              <br />
              the portfolio
            </span>
          </a>
        </div>
        <div className="portfolio-description">
          <p className="portfolio-manifesto">
            A thoughtful range.
            <br />
            <em>Made for real life.</em>
          </p>
          <p className="page-deck">{clientCopy.brand.summary}</p>
          <p className="portfolio-count">
            {String(projects.length).padStart(2, '0')} selected projects{' '}
            <span className={styles.typologySummary}>
              · Architecture & interiors
            </span>
          </p>
        </div>
      </section>
      <section
        id="project-index"
        className="work-section section-pad"
        aria-label="Project index"
      >
        <ProjectGrid filterable />
      </section>
      <PracticeExperience />
    </main>
  );
}
