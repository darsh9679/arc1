import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { ProjectGrid } from '@/components/project-grid';
import { EditorialMotion } from '@/components/editorial-motion';
import { RecognitionMedia } from '@/components/recognition-media';
import { award } from '@/lib/content';
import { recognitionFilm, recognitionPhotos } from '@/lib/recognition-media';
import { pageMetadata } from '@/lib/metadata';
import styles from './recognition.module.css';

export const metadata = pageMetadata(
  'Recognition',
  'Trayaksh Architeqts and the D&V’25 Built Environment Leadership Awards, Goa, 28 November 2025.',
  '/recognition',
  recognitionPhotos[0].src,
);

export default function Recognition() {
  return (
    <main
      id="main-content"
      className={`inner-page recognition-page ${styles.page}`}
      data-editorial-page="recognition"
      tabIndex={-1}
    >
      <EditorialMotion page="recognition" />
      <section className={styles.opening} aria-labelledby="recognition-heading">
        <div className={styles.container}>
          <div className={styles.introduction}>
            <div>
              <p className={styles.kicker}>Recognition / A shared milestone</p>
              <h1 id="recognition-heading">
                A practice of care. <em>Recognised.</em>
              </h1>
            </div>
            <p className={styles.lead}>
              An acknowledgement of the thought, trust and collaboration that go
              into every space.
            </p>
          </div>
          <div className={styles.awardFeature} data-editorial-reveal>
            <figure className={styles.awardPhotograph}>
              <Image
                src={recognitionPhotos[0].src}
                alt={recognitionPhotos[0].alt}
                width={recognitionPhotos[0].width}
                height={recognitionPhotos[0].height}
                sizes="(max-width: 599px) calc(100vw - 48px), (max-width: 1600px) 34vw, 520px"
                className={styles.awardPhoto}
                loading="eager"
                fetchPriority="high"
              />
              <figcaption>
                <span>D&V’25 · Goa</span>
                Ar. Sharvari Pawaskar
              </figcaption>
            </figure>
            <section
              className={styles.awardCopy}
              aria-labelledby="award-heading"
            >
              <p className={styles.kicker}>01 / Award recognition</p>
              <h2 id="award-heading">{award.name}</h2>
              <p className={styles.category}>{award.category}</p>
              <dl className={styles.facts}>
                <div className={styles.eventFact}>
                  <dt>Award</dt>
                  <dd>{award.event}</dd>
                </div>
                <div>
                  <dt>Presented by</dt>
                  <dd>{award.presenter}</dd>
                </div>
                <div>
                  <dt>When & where</dt>
                  <dd className={styles.dateLocation}>
                    <span>
                      <CalendarDays size={14} aria-hidden="true" />
                      {award.date}
                    </span>
                    <span>
                      <MapPin size={14} aria-hidden="true" />
                      {award.location}
                    </span>
                  </dd>
                </div>
              </dl>
              <p className={styles.credit}>
                Awarded to the practice led by{' '}
                <strong>Ar. Sharvari Pawaskar</strong>, Architect & Interior
                Designer.
              </p>
              <a className={styles.mediaLink} href="#recognition-moments">
                View photos & film <ArrowDown size={15} aria-hidden="true" />
              </a>
            </section>
          </div>
        </div>
      </section>
      <section
        id="recognition-moments"
        className={styles.moments}
        aria-labelledby="recognition-moments-heading"
        data-editorial-reveal
      >
        <div className={styles.container}>
          <div className={styles.momentsHeading}>
            <div>
              <p className={styles.kicker}>02 / In the moment</p>
              <h2 id="recognition-moments-heading">
                From the <em>ceremony.</em>
              </h2>
            </div>
            <p>
              Photographs and a short film from the Design & Vision 2025 awards
              in Goa.
            </p>
          </div>
          <RecognitionMedia
            photos={recognitionPhotos}
            videoSrc={recognitionFilm.src}
            videoPoster={recognitionFilm.poster}
            videoWidth={recognitionFilm.width}
            videoHeight={recognitionFilm.height}
            videoDuration={recognitionFilm.duration}
          />
        </div>
      </section>
      <section
        className={styles.work}
        aria-labelledby="recognition-work-heading"
        data-editorial-reveal
      >
        <div className={styles.container}>
          <div className={styles.workHeading}>
            <div>
              <p className={styles.kicker}>03 / Selected work</p>
              <h2 id="recognition-work-heading">
                The spaces behind <em>the practice.</em>
              </h2>
            </div>
            <Link href="/work">
              Explore all projects <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <p className={styles.swipeHint}>Swipe to explore the projects →</p>
          <ProjectGrid limit={3} />
        </div>
      </section>
    </main>
  );
}
