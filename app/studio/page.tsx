import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  CircleCheck,
  Compass,
  Eye,
  Layers,
  Leaf,
  Minus,
  Ruler,
  Sparkles,
  Sun,
  Target,
  UsersRound,
} from 'lucide-react';
import { PlaceholderImage } from '@/components/placeholder-image';
import { PracticeServices } from '@/components/practice-content';
import { ProcessStack } from '@/components/process-stack';
import { StudioMotion } from '@/components/studio-motion';
import { processSteps, projects, studio } from '@/lib/content';
import { clientCopy } from '@/lib/client-copy';
import { pageMetadata } from '@/lib/metadata';
import styles from './studio.module.css';

const studioHeroProject = projects.find(
  (project) => project.slug === 'thane-apartment',
);
const philosophyProject = projects.find(
  (project) => project.slug === 'ratnagiri-apartment',
);
const calmProject = projects.find(
  (project) => project.slug === 'ghatkopar-apartment',
);
const perspectiveIcons = [Compass, UsersRound, Sparkles];
const principleIcons = [Target, Ruler, Sun, Leaf, Layers, Minus, CircleCheck];

const practiceTopics = [
  {
    title: 'People & context',
    paragraphs: [0, 1],
    icon: UsersRound,
    summary: 'We begin with your needs, your site and the way you use a space.',
  },
  {
    title: 'Clarity & restraint',
    paragraphs: [2, 4, 5],
    icon: Sun,
    summary:
      'Clear planning, natural light and materials with character. Every element has a purpose.',
  },
  {
    title: 'Planning & execution',
    paragraphs: [3, 6],
    icon: Compass,
    summary:
      'Considered planning, coordination and execution, with Vastu principles where relevant and desired.',
  },
];

function StudioDetails({
  title,
  children,
  group,
  number,
  className = '',
  icon,
}: {
  title: string;
  children: ReactNode;
  group?: string;
  number?: number;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <details className={`${styles.disclosure} ${className}`} name={group}>
      <summary>
        {icon && (
          <span className={styles.disclosureIcon} aria-hidden="true">
            {icon}
          </span>
        )}
        {number !== undefined && (
          <span className={styles.number} aria-hidden="true">
            {String(number).padStart(2, '0')}
          </span>
        )}
        <span className={styles.disclosureTitle}>{title}</span>
        <span className={styles.toggle} aria-hidden="true" />
      </summary>
      <div className={styles.disclosureBody}>{children}</div>
    </details>
  );
}

function MissionContent() {
  return (
    <>
      <p>{clientCopy.mission.introduction}</p>
      <ul>
        {clientCopy.mission.perspectives.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
      <p>{clientCopy.mission.paragraph}</p>
      <p className={styles.missionClosing}>{clientCopy.mission.closing}</p>
    </>
  );
}

export const metadata = pageMetadata(
  'The studio — Three-Eyed Vision',
  'Meet founder Ar. Sharvari Pawaskar. Architecture, interior design, project management and Vastu Shastra consultation guided by Space, People and Possibility.',
  '/studio',
  '/og.png',
);

export default function Studio() {
  return (
    <main
      id="main-content"
      className={`inner-page studio-page ${styles.studio}`}
      tabIndex={-1}
    >
      <StudioMotion />
      <section className={styles.hero} aria-labelledby="studio-hero-title">
        <div className={styles.heroCopy}>
          <p className="eyebrow">About Trayaksh Architeqts</p>
          <h1 id="studio-hero-title">
            Architecture with
            <br />
            <em>a deeper perspective.</em>
          </h1>
          <p className={styles.heroDescription}>{clientCopy.brand.summary}</p>
          <a className="text-link" href="#practice">
            Discover our practice <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className={styles.heroImage} data-studio-image>
          <PlaceholderImage
            src={studioHeroProject?.hero}
            alt={
              studioHeroProject?.gallery[0]?.alt ||
              'A selected interior project by Trayaksh Architeqts.'
            }
            objectPosition="50% 58%"
            sizes="(max-width: 700px) 100vw, 50vw"
            priority
          />
        </div>
      </section>
      <nav className={styles.jumpLinks} aria-label="On this page">
        <a href="#practice">The practice</a>
        <a href="#founder">Founder</a>
        <a href="#philosophy">Our philosophy</a>
        <a href="#vision">Vision & mission</a>
        <a href="#services">Services</a>
        <a href="#process">Our process</a>
      </nav>
      <section
        className={`studio-overview section-pad ${styles.practice}`}
        id="practice"
        aria-labelledby="practice-title"
      >
        <div className={styles.practiceHeader}>
          <div>
            <p className="eyebrow">01 / The practice</p>
            <h2 id="practice-title">
              Every space
              <br />
              has <em>a story.</em>
            </h2>
          </div>
          <div>
            <p className={`${styles.practiceLead} ${styles.desktopOnly}`}>
              {clientCopy.about.introduction}
            </p>
            <p className={`${styles.practiceLead} ${styles.mobileOnly}`}>
              Architecture, interiors and project management for residential,
              commercial and retail spaces.
            </p>
            <p className={styles.objective}>{clientCopy.about.objective}</p>
          </div>
        </div>
        <div className={`${styles.practiceTopics} ${styles.desktopOnly}`}>
          {practiceTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <article key={topic.title} data-studio-reveal>
                <span className={styles.topicIcon} aria-hidden="true">
                  <Icon />
                </span>
                <h3>{topic.title}</h3>
                <p>{topic.summary}</p>
                <StudioDetails
                  title={`More on ${topic.title.toLowerCase()}`}
                  group="studio-practice-desktop"
                >
                  {topic.paragraphs.map((index) => (
                    <p key={index}>{clientCopy.about.paragraphs[index]}</p>
                  ))}
                </StudioDetails>
              </article>
            );
          })}
        </div>
        <div className={styles.mobileOnly}>
          {practiceTopics.map((topic, index) => (
            <StudioDetails
              key={topic.title}
              title={topic.title}
              group="studio-practice"
              icon={<topic.icon />}
            >
              {index === 0 && <p>{clientCopy.about.introduction}</p>}
              {topic.paragraphs.map((index) => (
                <p key={index}>{clientCopy.about.paragraphs[index]}</p>
              ))}
            </StudioDetails>
          ))}
        </div>
      </section>

      <section
        className="principal-section section-pad"
        id="founder"
        aria-labelledby="founder-title"
      >
        {studio.portraitSrc ? (
          <figure className={styles.founderVisual} data-studio-reveal>
            <div className="principal-image">
              <PlaceholderImage
                src={studio.portraitSrc}
                variant="detail"
                alt={
                  studio.portraitIsPlaceholder
                    ? 'AI-generated fictional portrait used as a temporary layout placeholder; not Ar. Sharvari Pawaskar.'
                    : `${studio.principal}, founder of Trayaksh Architeqts, in a blue blazer; professionally edited from her supplied photograph.`
                }
                objectPosition="50% 0%"
                sizes="(max-width: 600px) 100vw, 35vw"
              />
            </div>
            {studio.portraitIsPlaceholder && (
              <figcaption className={styles.portraitCaption}>
                Temporary portrait · replace with founder’s photo
              </figcaption>
            )}
          </figure>
        ) : (
          <div
            className={styles.founderCard}
            aria-label="Founder and principal architect"
            data-studio-reveal
          >
            <span className={styles.founderMonogram} aria-hidden="true">
              SP
            </span>
            <p className="eyebrow">Founder / Principal architect</p>
            <p className={styles.founderName}>{studio.principal}</p>
            <span className={styles.founderRule} aria-hidden="true" />
            <p className={styles.founderCredentials}>
              Architecture · Project Management · Vastu Shastra
            </p>
          </div>
        )}
        <div className="principal-copy">
          <p className="eyebrow">02 / Founder</p>
          <h2 id="founder-title">
            Ar. Sharvari
            <br />
            <em>Pawaskar.</em>
          </h2>
          <ul className={styles.credentials} aria-label="Founder credentials">
            {clientCopy.founder.credentials
              .split(' | ')
              .slice(1)
              .map((credential) => (
                <li key={credential}>{credential}</li>
              ))}
          </ul>
          {clientCopy.founder.paragraphs.slice(0, 1).map((text) => (
            <p key={text}>{text}</p>
          ))}
          <StudioDetails
            title="Read the full biography"
            className={styles.biography}
          >
            {clientCopy.founder.paragraphs.slice(1).map((text) => (
              <p key={text}>{text}</p>
            ))}
          </StudioDetails>
          <Link className="text-link" href="/recognition">
            Our recognition <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section
        className="philosophy section-pad"
        id="philosophy"
        aria-labelledby="philosophy-title"
      >
        <p className="eyebrow">03 / The Trayaksh philosophy</p>
        <h2 id="philosophy-title">
          Three-Eyed <em>Vision.</em>
        </h2>
        <p className="philosophy-lead">
          {clientCopy.perspectives.introduction}
        </p>
        <div className={`values-grid ${styles.desktopOnly}`}>
          {clientCopy.perspectives.items.map((item, index) => {
            const Icon = perspectiveIcons[index];
            return (
              <article key={item.title} data-studio-reveal>
                <span>0{index + 1}</span>
                <div className={styles.perspectiveHeading}>
                  <span className={styles.perspectiveIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{item.title}</h3>
                </div>
                <p className="perspective-subtitle">{item.subtitle}</p>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
        <div className={styles.mobileOnly}>
          {clientCopy.perspectives.items.map((item, index) => {
            const Icon = perspectiveIcons[index];
            return (
              <StudioDetails
                key={item.title}
                title={item.title}
                icon={<Icon />}
                group="studio-perspectives"
              >
                <p>{item.subtitle}</p>
                <p>{item.text}</p>
              </StudioDetails>
            );
          })}
        </div>
        <p className="philosophy-caption">{clientCopy.perspectives.closing}</p>
      </section>

      <section
        className={`vision-mission section-pad ${styles.visionMission}`}
        id="vision"
        aria-label="Vision and mission"
      >
        <div className={styles.visionGrid}>
          <article className={styles.visionCard} data-studio-reveal>
            <div className={styles.visionPhoto} data-studio-image>
              <PlaceholderImage
                src={philosophyProject?.hero}
                alt={
                  philosophyProject?.gallery[0]?.alt ||
                  'Natural light and greenery in a Trayaksh interior.'
                }
                objectPosition="50% 48%"
                sizes="(max-width: 700px) 100vw, 50vw"
              />
            </div>
            <div className={styles.visionBody}>
              <div className={styles.cardHeading}>
                <span className={styles.cardIcon} aria-hidden="true">
                  <Eye />
                </span>
                <div>
                  <p className="eyebrow">04 / The future we see</p>
                  <h2>{clientCopy.vision.title}</h2>
                </div>
              </div>
              <p className={`${styles.visionLead} ${styles.desktopOnly}`}>
                {clientCopy.vision.paragraphs[0]}
              </p>
              <p className={`${styles.visionLead} ${styles.mobileOnly}`}>
                People, nature and architecture, in balance.
              </p>
              <div className={styles.desktopOnly}>
                {clientCopy.vision.paragraphs.slice(1).map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              <div className={styles.mobileOnly}>
                <StudioDetails title="Read our vision" group="studio-vision">
                  {clientCopy.vision.paragraphs.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </StudioDetails>
              </div>
            </div>
          </article>
          <article className={styles.missionCard} data-studio-reveal>
            <div className={styles.cardHeading}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Compass />
              </span>
              <div>
                <p className="eyebrow">05 / How we bring it to life</p>
                <h2>{clientCopy.mission.title}</h2>
              </div>
            </div>
            <p className={styles.desktopOnly}>
              {clientCopy.mission.introduction}
            </p>
            <p className={`${styles.missionLead} ${styles.mobileOnly}`}>
              Thoughtful, functional and timeless spaces.
            </p>
            <ul className={styles.missionPerspectives}>
              {clientCopy.mission.perspectives.map((text, index) => {
                const [title, description] = text.split(' — ');
                const Icon = [Compass, UsersRound, Sparkles][index];
                return (
                  <li key={title}>
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{title}</h3>
                      <p className={styles.desktopOnly}>{description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.desktopOnly}>
              <p>{clientCopy.mission.paragraph}</p>
              <p className={styles.missionClosing}>
                {clientCopy.mission.closing}
              </p>
            </div>
            <div className={styles.mobileOnly}>
              <StudioDetails title="Read our mission" group="studio-vision">
                <MissionContent />
              </StudioDetails>
            </div>
          </article>
        </div>
      </section>

      <section
        className="design-philosophy section-pad"
        id="design"
        aria-labelledby="design-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">06 / Design philosophy</p>
            <h2 id="design-title">
              Finding calm
              <br />
              in <em>the chaos.</em>
            </h2>
          </div>
        </div>
        <div className="editorial-columns">
          <div className={styles.calmFigure}>
            <div className={styles.calmVisual} data-studio-reveal>
              <div className={styles.calmImage} data-studio-image>
                <PlaceholderImage
                  src={calmProject?.hero}
                  alt={
                    calmProject?.gallery[0]?.alt ||
                    'A selected interior project by Trayaksh Architeqts.'
                  }
                />
              </div>
              <blockquote>
                {clientCopy.philosophy.opening[0]}
                <br />
                <em>{clientCopy.philosophy.opening[1]}</em>
              </blockquote>
            </div>
            {calmProject && (
              <Link
                className={styles.projectCaption}
                href={`/work/${calmProject.slug}`}
              >
                <span>{calmProject.location}</span>
                <span>
                  View this home <span aria-hidden="true">↗</span>
                </span>
              </Link>
            )}
          </div>
          <div className={styles.calmCopy}>
            <div className={styles.desktopOnly}>
              {clientCopy.philosophy.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <div className={styles.mobileOnly}>
              <p>{clientCopy.philosophy.paragraphs[1]}</p>
              <StudioDetails title="Our approach to calm spaces">
                {clientCopy.philosophy.paragraphs
                  .filter((_, index) => index !== 1)
                  .map((text) => (
                    <p key={text}>{text}</p>
                  ))}
              </StudioDetails>
            </div>
          </div>
        </div>
        <h2 className="principles-title">Our design principles</h2>
        <div className={`principle-grid ${styles.desktopOnly}`}>
          {clientCopy.principles.map((item, index) => {
            const Icon = principleIcons[index];
            return (
              <article key={item.title} data-studio-reveal>
                <span className={styles.principleIcon} aria-hidden="true">
                  <Icon />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
        <div className={styles.mobileOnly}>
          {clientCopy.principles.map((item, index) => {
            const Icon = principleIcons[index];
            return (
              <StudioDetails
                key={item.title}
                title={item.title}
                icon={<Icon />}
                group="studio-principles"
              >
                <p>{item.text}</p>
              </StudioDetails>
            );
          })}
        </div>
      </section>

      <PracticeServices visual />
      <div id="process" className={styles.processRegion}>
        <div className={styles.desktopProcess}>
          <ProcessStack />
        </div>
        <section
          className={`section-pad ${styles.process} ${styles.compactProcess}`}
          aria-labelledby="process-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Our process</p>
              <h2 id="process-title">
                From understanding
                <br />
                to <em>experience.</em>
              </h2>
            </div>
            <p className="section-aside">
              Understand. Observe. Envision. Develop. Coordinate. Realise.
            </p>
          </div>
          <ol className={`${styles.processGrid} ${styles.desktopOnly}`}>
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.number} aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className={styles.mobileOnly}>
            {processSteps.map((step, index) => (
              <StudioDetails
                key={step.title}
                title={step.title}
                number={index + 1}
                group="studio-process"
              >
                <p>{step.text}</p>
              </StudioDetails>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
