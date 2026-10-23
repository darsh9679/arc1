'use client';
/* oxlint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions -- This labelled gallery region offers keyboard image navigation. */

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import { ArrowLeft, ArrowRight, Maximize2, ImageIcon } from 'lucide-react';
import { PlaceholderImage } from '@/components/placeholder-image';
import { ProjectLightbox } from '@/components/project-lightbox';
import {
  galleryImageSizes,
  prepareGalleryImage,
  useGalleryNavigation,
  useGalleryPreparation,
} from '@/components/use-gallery-navigation';
import type { Project } from '@/lib/content';
import { isConceptImage, isEnhancedProjectPhoto } from '@/lib/imagery';
import { collectionPage, GALLERY_PAGE_SIZE } from '@/lib/portfolio';
import styles from './project-gallery.module.css';

function ImageCredit({
  image,
  visualizationOnly,
}: {
  image: Project['gallery'][number];
  visualizationOnly?: boolean;
}) {
  if (image.isReference)
    return (
      <>
        {image.sourceUrl ? (
          <>
            Illustrative reference ·{' '}
            <a href={image.sourceUrl} target="_blank" rel="noreferrer">
              Unsplash photo source ↗
            </a>
          </>
        ) : (
          'Illustrative reference · Unsplash'
        )}
      </>
    );
  if (isConceptImage(image.src))
    return <>AI concept · not completed project photography</>;
  if (visualizationOnly) return <>Architectural visualization</>;
  if (isEnhancedProjectPhoto(image.src))
    return <>AI-enhanced project photograph</>;
  if (!image.src) return <>Illustrative drawing · not a project record</>;
  return <>Project photography</>;
}

/** A bounded image viewer: adding photos never adds another tall gallery row. */
export function ProjectGallery({ project }: { project: Project }) {
  const id = useId();
  const { active, pending, error, select, move } = useGalleryNavigation(
    project.gallery,
  );
  const galleryRoot = useRef<HTMLElement>(null);
  useGalleryPreparation(galleryRoot, project.gallery, active);
  const [selected, setSelected] = useState<number | null>(null);
  const gesture = useRef<{
    id: number;
    x: number;
    y: number;
    time: number;
  } | null>(null);
  const pointers = useRef(new Set<number>());
  const suppressClick = useRef(false);
  const count = project.gallery.length;
  const image = project.gallery[active];
  const number = (index: number) => String(index + 1).padStart(2, '0');
  const thumbnails = collectionPage(
    project.gallery,
    Math.floor(active / GALLERY_PAGE_SIZE) + 1,
    GALLERY_PAGE_SIZE,
  );
  const referenceCount = project.gallery.filter(
    (item) => item.isReference,
  ).length;
  const photoCount = project.gallery.filter(
    (item) => item.src && !item.isReference && !isConceptImage(item.src),
  ).length;
  const keyboard = (event: KeyboardEvent<HTMLElement>) => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.target instanceof HTMLSelectElement
    )
      return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      void select(event.key === 'Home' ? 0 : count - 1);
    }
  };
  const startSwipe = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'touch') return;
    pointers.current.add(event.pointerId);
    suppressClick.current = false;
    if (
      !event.isPrimary ||
      pointers.current.size !== 1 ||
      (window.visualViewport?.scale ?? 1) > 1.05
    ) {
      gesture.current = null;
      return;
    }
    gesture.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
    };
  };
  const finishSwipe = (event: PointerEvent<HTMLButtonElement>) => {
    const start = gesture.current;
    pointers.current.delete(event.pointerId);
    gesture.current = null;
    if (
      !start ||
      start.id !== event.pointerId ||
      pointers.current.size ||
      (window.visualViewport?.scale ?? 1) > 1.05
    )
      return;
    const x = event.clientX - start.x,
      y = event.clientY - start.y;
    if (
      Math.abs(x) > 50 &&
      Math.abs(x) > Math.abs(y) * 1.6 &&
      performance.now() - start.time < 900
    ) {
      suppressClick.current = true;
      move(x < 0 ? 1 : -1);
    }
  };

  return (
    <section
      ref={galleryRoot}
      id="project-gallery"
      className={styles.gallery}
      aria-labelledby={`${id}-heading`}
      data-gallery-mode="viewer"
    >
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">02 / Spatial journal</p>
          <h2 id={`${id}-heading`}>
            A closer <em>look.</em>
          </h2>
        </div>
        {count > 0 && (
          <p className={styles.help} id={`${id}-help`}>
            {referenceCount
              ? `${photoCount ? `${photoCount} supplied project ${photoCount === 1 ? 'photo' : 'photos'} and ` : ''}${referenceCount} illustrative references. References do not show this completed project.`
              : project.gallery.some((item) => isConceptImage(item.src))
                ? 'AI concepts and illustrative plans. These do not document the completed project.'
                : project.visualizationOnly
                  ? 'Architectural visualizations. Select an image to view it full screen.'
                  : photoCount
                    ? 'Spaces, materials and considered details. Select an image to view it full screen.'
                    : 'Illustrative drawing studies. Approved project photography has not been supplied.'}
          </p>
        )}
      </div>
      {image ? (
        <>
          <section
            className={`${styles.viewer} ${count === 1 ? styles.singleImage : ''}`}
            aria-label={`${project.title} gallery`}
            aria-describedby={`${id}-help`}
            tabIndex={0}
            onKeyDown={keyboard}
          >
            <figure className={styles.figure}>
              <button
                className={styles.stage}
                type="button"
                aria-haspopup="dialog"
                aria-label={`Open image ${active + 1} of ${count}: ${image.title}`}
                aria-busy={pending !== null}
                onPointerEnter={(event) => {
                  if (event.pointerType !== 'touch')
                    void prepareGalleryImage(image, 'fullscreen');
                }}
                onFocus={() => {
                  void prepareGalleryImage(image, 'fullscreen');
                }}
                onClick={(event) => {
                  if (suppressClick.current) {
                    suppressClick.current = false;
                    return;
                  }
                  event.currentTarget.focus({ preventScroll: true });
                  setSelected(active);
                }}
                onPointerDown={startSwipe}
                onPointerUp={finishSwipe}
                onPointerCancel={(event) => {
                  pointers.current.delete(event.pointerId);
                  gesture.current = null;
                }}
              >
                <PlaceholderImage
                  key={active}
                  src={image.src}
                  variant={image.variant}
                  fit="contain"
                  className={styles.image}
                  alt={image.alt || `${project.title} — ${image.title}`}
                  sizes={galleryImageSizes(image)}
                  blurDataURL={image.blurDataURL}
                  priority
                />
                {(pending !== null || error) && (
                  <output className={styles.loading}>
                    {error || 'Loading photo…'}
                  </output>
                )}
                <span className={styles.openHint}>
                  <Maximize2 size={15} aria-hidden="true" />
                  Full screen
                </span>
              </button>
              <figcaption className={styles.caption}>
                <div
                  className={styles.captionText}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className={styles.counter}>
                    {number(active)}{' '}
                    <span>/ {String(count).padStart(2, '0')}</span>
                  </span>
                  <div>
                    <p>{image.title}</p>
                    <span className={styles.credit}>
                      <ImageCredit
                        image={image}
                        visualizationOnly={project.visualizationOnly}
                      />
                    </span>
                  </div>
                </div>
                {count > 1 && (
                  <div className={styles.arrows}>
                    <button
                      type="button"
                      aria-label="Previous gallery image"
                      disabled={(pending ?? active) === 0}
                      onClick={() => move(-1)}
                    >
                      <ArrowLeft size={20} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next gallery image"
                      disabled={(pending ?? active) === count - 1}
                      onClick={() => move(1)}
                    >
                      <ArrowRight size={20} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </figcaption>
            </figure>
            {count > 1 && (
              <div className={styles.collection}>
                <div className={styles.collectionBar}>
                  <p>
                    Browse the collection <span>· {count} images</span>
                  </p>
                  <label htmlFor={`${id}-jump`} className={styles.jump}>
                    <span>Jump to image</span>
                    <select
                      id={`${id}-jump`}
                      aria-label="Jump to image"
                      value={pending ?? active}
                      onChange={(event) =>
                        void select(Number(event.target.value))
                      }
                    >
                      {project.gallery.map((item, index) => (
                        <option key={index} value={index}>
                          {number(index)} — {item.title}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div
                  className={styles.thumbnails}
                  aria-label="Choose a gallery image"
                >
                  {thumbnails.items.map((item, index) => {
                    const absolute = thumbnails.first - 1 + index;
                    return (
                      <button
                        key={absolute}
                        type="button"
                        aria-label={`Show image ${absolute + 1}: ${item.title}`}
                        aria-pressed={absolute === active}
                        onClick={() => {
                          void select(absolute);
                        }}
                      >
                        <PlaceholderImage
                          src={item.src}
                          variant={item.variant}
                          alt=""
                          sizes="(max-width: 599px) 30vw, (max-width: 900px) 15vw, 13vw"
                          blurDataURL={item.blurDataURL}
                        />
                        <span>{number(absolute)}</span>
                      </button>
                    );
                  })}
                </div>
                {thumbnails.pageCount > 1 && (
                  <div className={styles.thumbnailPager}>
                    <button
                      type="button"
                      disabled={thumbnails.page === 1}
                      aria-label="Previous image thumbnails"
                      onClick={() =>
                        void select((thumbnails.page - 2) * GALLERY_PAGE_SIZE)
                      }
                    >
                      <ArrowLeft size={16} aria-hidden="true" />
                    </button>
                    <p>
                      Images {thumbnails.first}–{thumbnails.last} of {count}
                    </p>
                    <button
                      type="button"
                      disabled={thumbnails.page === thumbnails.pageCount}
                      aria-label="Next image thumbnails"
                      onClick={() =>
                        void select(thumbnails.page * GALLERY_PAGE_SIZE)
                      }
                    >
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
          {selected !== null && (
            <ProjectLightbox
              project={project}
              initialIndex={selected}
              onClose={() => setSelected(null)}
            />
          )}
        </>
      ) : (
        <div className={styles.emptyState}>
          <ImageIcon size={32} aria-hidden="true" />
          <div>
            <p className="eyebrow">Project photography</p>
            <p>No approved photography is available for this project yet.</p>
          </div>
        </div>
      )}
    </section>
  );
}
