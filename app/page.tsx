import Link from 'next/link';
import Image from 'next/image';
import {
  Award,
  ArrowUpRight,
  Armchair,
  Compass,
  Layers3,
  Ruler,
} from 'lucide-react';
import { SpotlightHero } from '@/components/spotlight-hero';
import { ProjectGrid } from '@/components/project-grid';
import { award } from '@/lib/content';
import { clientCopy } from '@/lib/client-copy';
import { WhyTrayaksh } from '@/components/practice-content';
import projectImages from '@/lib/project-images.generated.json';
import styles from './home.module.css';

const serviceSummaries = [
  {
    title: 'Architecture',
    text: 'Homes, villas, commercial spaces and renovations.',
    icon: Ruler,
  },
  {
    title: 'Interior design',
    text: 'Interiors for apartments, offices, salons and retail spaces.',
    icon: Armchair,
  },
  {
    title: 'Project management',
    text: 'Planning, coordination, site supervision and execution.',
    icon: Layers3,
  },
  {
    title: 'Vastu consultation',
    text: 'Spatial planning where relevant and desired by the client.',
    icon: Compass,
  },
];

const phonePerspectives: Record<string, string> = {
  Space: 'Physical context',
  People: 'Everyday experience',
  Possibility: 'Beyond the brief',
};
const studioPhoto = projectImages['ratnagiri-apartment'].gallery[0];
const servicePhoto = projectImages['andheri-apartment'].gallery[0];

export default function Home() {
  return (
    <main
      id="main-content"
      className={`home-page ${styles.home}`}
      tabIndex={-1}
    >
      <SpotlightHero />
      <section
        className="intro section-pad"
        id="introduction"
        aria-labelledby="practice-title"
      >
        <div className={styles.introLead}>
          <p className="eyebrow">The studio</p>
          <h2 id="practice-title">
            Spaces shaped
            <br />
            <em>around you.</em>
          </h2>
          <Link className="text-link" href="/studio">
            Meet the studio <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <Link
          className={styles.introImage}
          href="/work/ratnagiri-apartment"
          aria-label="Explore the Ratnagiri residence"
        >
          <Image
            src={studioPhoto.src}
            alt={studioPhoto.alt}
            fill
            sizes="(max-width: 599px) 104px, (max-width: 800px) 30vw, 25vw"
          />
          <span>
            Ratnagiri residence <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </Link>
        <div className={styles.introDetail}>
          <p className={styles.introSummary}>{clientCopy.about.introduction}</p>
          <p className={styles.phoneSummary}>
            Architecture, interiors and project management for homes, workplaces
            and retail spaces.
          </p>
          <p className={styles.geography}>
            Mumbai & Ratnagiri · Working across India
          </p>
          <div className={styles.perspectives}>
            {clientCopy.perspectives.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p className={styles.perspectiveDetail}>{item.subtitle}</p>
                <p className={styles.phonePerspective}>
                  {phonePerspectives[item.title] ?? item.subtitle}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="selected-work section-pad"
        aria-labelledby="selected-work-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected projects</p>
            <h2 id="selected-work-title">
              A closer look at <em>our work.</em>
            </h2>
            <p className={styles.sectionDeck}>
              Homes, hospitality and workplace interiors across Mumbai and
              Maharashtra.
            </p>
          </div>
          <Link className="text-link" href="/work">
            View all projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ProjectGrid limit={4} />
        <p className={styles.workHint}>
          Swipe to discover the projects <span aria-hidden="true">→</span>
        </p>
      </section>
      <section
        className="home-services section-pad"
        aria-labelledby="home-services-title"
      >
        <Link
          className={`belief-image ${styles.serviceImage}`}
          href="/work/andheri-apartment"
          aria-label="Explore the Andheri residence"
        >
          <Image
            src={servicePhoto.src}
            alt={servicePhoto.alt}
            fill
            sizes="(max-width: 599px) 100vw, (max-width: 800px) 50vw, 40vw"
          />
          <span>
            Andheri residence <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </Link>
        <div className="belief-copy">
          <p className="eyebrow">How we can help</p>
          <h2 id="home-services-title">
            From first idea
            <br />
            <em>to finished space.</em>
          </h2>
          <div className={styles.services}>
            {serviceSummaries.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title}>
                  <Icon
                    size={22}
                    strokeWidth={1.35}
                    className={styles.serviceIcon}
                    aria-hidden="true"
                  />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              );
            })}
          </div>
          <Link className="text-link" href="/studio#services">
            Explore all services <span aria-hidden="true">↗</span>
          </Link>
          <blockquote className={styles.belief}>{clientCopy.belief}</blockquote>
        </div>
      </section>
      <WhyTrayaksh />
      <section
        className={styles.recognitionPanel}
        aria-labelledby="home-recognition-title"
      >
        <div className={styles.recognitionCard}>
          <div className={styles.awardMark} aria-hidden="true">
            <Award size={34} strokeWidth={1.4} />
          </div>
          <div className={styles.awardCopy}>
            <p className={styles.awardKicker}>
              Award recognition <span>2025</span>
            </p>
            <h2 id="home-recognition-title" className={styles.awardTitle}>
              {award.name}
            </h2>
            <p className={styles.awardCategory}>
              {award.category} <span aria-hidden="true">·</span>{' '}
              {award.location}
            </p>
          </div>
          <Link className={styles.awardLink} href="/recognition">
            About the award <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
