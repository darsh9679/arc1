import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Building2,
  MapPin,
  Palette,
  Ruler,
} from 'lucide-react';
import { projects } from '@/lib/content';
import { isConceptImage, isEnhancedProjectPhoto } from '@/lib/imagery';
import styles from './project.module.css';
import { pageMetadata } from '@/lib/metadata';
import { PlaceholderImage } from '@/components/placeholder-image';
import { ProjectGallery } from '@/components/project-gallery';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project
    ? pageMetadata(
        project.title,
        project.description ||
          `${project.title} — ${project.propertyType} project by Trayaksh Architeqts.`,
        `/work/${slug}`,
        project.hero,
      )
    : {};
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <main
      id="main-content"
      className={`inner-page project-detail ${styles.page}`}
      tabIndex={-1}
    >
      <section className={styles.opening} aria-labelledby="project-title">
        <div className={styles.container}>
          <Link className={styles.backLink} href="/work">
            <ArrowLeft size={16} aria-hidden="true" /> Selected work
          </Link>
          <div className={styles.openingGrid}>
            <div className={styles.introduction}>
              <p className={styles.kicker}>
                {project.number} / {project.propertyType}
              </p>
              <h1 id="project-title">{project.title}</h1>
              {project.location && (
                <p className={styles.location}>
                  <MapPin size={16} aria-hidden="true" />
                  {project.location}
                </p>
              )}
              {(project.area || project.style) && (
                <p className={styles.area}>
                  {project.area}
                  {project.area && project.style && (
                    <>
                      {' '}
                      <span aria-hidden="true">·</span>{' '}
                    </>
                  )}
                  {project.style}
                </p>
              )}
            </div>
            <figure className={styles.hero} data-project-hero>
              {project.hero ? (
                <PlaceholderImage
                  src={project.hero}
                  variant={project.drawing}
                  alt={
                    project.gallery[0]?.alt ||
                    `${project.title}, ${project.typology.toLowerCase()} interior.`
                  }
                  className={styles.heroPhoto}
                  fit="contain"
                  sizes="(max-width: 700px) calc(100vw - 48px), (max-width: 1600px) 52vw, 820px"
                  priority
                />
              ) : (
                <div
                  className={styles.editorialCover}
                  aria-label={`${project.title} project overview`}
                >
                  <p className={styles.kicker}>{project.typology}</p>
                  <span className={styles.coverLabel}>
                    {project.coverLabel || project.area || project.propertyType}
                  </span>
                  {project.style && (
                    <p className={styles.coverStyle}>{project.style}</p>
                  )}
                </div>
              )}
              <figcaption>
                {project.location && <span>{project.location}</span>}
                <span>
                  {project.hero
                    ? isConceptImage(project.hero)
                      ? 'AI concept image'
                      : project.visualizationOnly
                        ? 'Architectural visualization'
                        : isEnhancedProjectPhoto(project.hero)
                          ? 'AI-enhanced project photograph'
                          : 'Project photography'
                    : 'Project overview'}
                </span>
              </figcaption>
            </figure>
            {project.gallery.length > 0 && (
              <div className={styles.openingActions}>
                <a href="#project-gallery" className={styles.galleryLink}>
                  View gallery <ArrowDown size={16} aria-hidden="true" />
                  <span>
                    {project.gallery.length}{' '}
                    {project.gallery.length === 1 ? 'image' : 'images'}
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {project.description && (
        <section
          className={styles.intent}
          aria-labelledby="design-intent-title"
        >
          <div className={`${styles.container} ${styles.intentGrid}`}>
            <div className={styles.narrative}>
              <p className={styles.kicker}>01 / Design intent</p>
              <h2 id="design-intent-title">
                {project.typology === 'Residential' ? (
                  <>
                    A home shaped <em>around daily life.</em>
                  </>
                ) : (
                  <>
                    A space made <em>for its purpose.</em>
                  </>
                )}
              </h2>
              <p className={styles.description}>{project.description}</p>
            </div>
            <aside
              className={styles.factsPanel}
              aria-labelledby="project-facts-title"
            >
              <h3 id="project-facts-title">Project at a glance</h3>
              <dl className={styles.facts}>
                {project.propertyType && (
                  <div>
                    <dt>
                      <Building2 size={17} aria-hidden="true" />
                      Project type
                    </dt>
                    <dd>{project.propertyType}</dd>
                  </div>
                )}
                {project.location && (
                  <div>
                    <dt>
                      <MapPin size={17} aria-hidden="true" />
                      Location
                    </dt>
                    <dd>{project.location}</dd>
                  </div>
                )}
                {project.area && (
                  <div>
                    <dt>
                      <Ruler size={17} aria-hidden="true" />
                      Area
                    </dt>
                    <dd>{project.area}</dd>
                  </div>
                )}
                {project.style && (
                  <div>
                    <dt>
                      <Palette size={17} aria-hidden="true" />
                      Design language
                    </dt>
                    <dd>{project.style}</dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </section>
      )}

      <ProjectGallery project={project} />

      <section
        className={styles.closing}
        aria-labelledby="explore-further-title"
      >
        <div className={styles.container}>
          <div className={styles.closingHeading}>
            <h2 id="explore-further-title">Explore further</h2>
            <Link href="/work">
              All projects <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.closingGrid}>
            <Link href={`/work/${next.slug}`} className={styles.nextCard}>
              {next.thumbnail ? (
                <PlaceholderImage
                  src={next.thumbnail}
                  variant={next.drawing}
                  alt={next.gallery[0]?.alt || next.title}
                  className={styles.nextPhoto}
                  fit="cover"
                  sizes="(max-width: 700px) 38vw, (max-width: 1600px) 26vw, 420px"
                />
              ) : (
                <div className={styles.nextCover}>
                  <span>{next.coverLabel || next.propertyType}</span>
                  {next.style && <p>{next.style}</p>}
                </div>
              )}
              <div className={styles.nextContent}>
                <p className={styles.kicker}>Next project / {next.typology}</p>
                <h3>{next.title}</h3>
                {next.location && (
                  <p className={styles.nextLocation}>{next.location}</p>
                )}
                <span className={styles.cardAction}>
                  View project <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </div>
            </Link>
            <div className={styles.enquiry}>
              <p className={styles.kicker}>New projects & collaborations</p>
              <h3>
                Let’s talk about <em>your project.</em>
              </h3>
              <p className={styles.enquiryCopy}>
                Thoughtful spaces begin with a conversation.
              </p>
              <Link href="/contact#project-enquiry">
                Start your project <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
