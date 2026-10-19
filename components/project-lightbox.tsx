'use client';

import {
  useId,
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import { PlaceholderImage } from '@/components/placeholder-image';
import {
  galleryImageSizes,
  useGalleryNavigation,
  useGalleryPreparation,
} from '@/components/use-gallery-navigation';
import { useScrollLock } from '@/components/scroll-lock-context';
import type { Project } from '@/lib/content';
import { getConceptImage } from '@/lib/imagery';
import styles from './project-lightbox.module.css';

type Props = {
  project: Project;
  initialIndex: number;
  onClose: () => void;
};

/** Only the selected image is mounted, even for an extensive project archive. */
export function ProjectLightbox({ project, initialIndex, onClose }: Props) {
  const acquireScrollLock = useScrollLock();
  const count = project.gallery.length;
  const {
    active: currentIndex,
    pending,
    error,
    select,
    move,
  } = useGalleryNavigation(project.gallery, initialIndex, 'fullscreen');
  const dialog = useRef<HTMLDialogElement>(null);
  useGalleryPreparation(dialog, project.gallery, currentIndex, 'fullscreen');
  const closeButton = useRef<HTMLButtonElement>(null);
  const pointers = useRef(new Set<number>());
  const gesture = useRef<{
    id: number;
    x: number;
    y: number;
    time: number;
  } | null>(null);
  const id = useId();
  const item = project.gallery[currentIndex];
  const concept = getConceptImage(item?.src);
  const number = (index: number) => String(index + 1).padStart(2, '0');

  useLayoutEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const releaseScrollLock = acquireScrollLock();
    const html = document.documentElement;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousScroll = { x: window.scrollX, y: window.scrollY };
    const previousOverflow = html.style.overflow;
    const previousGutter = html.style.scrollbarGutter;
    if (window.innerWidth > html.clientWidth)
      html.style.scrollbarGutter = 'stable';
    html.style.overflow = 'hidden';
    node.showModal();
    closeButton.current?.focus({ preventScroll: true });

    return () => {
      node.close();
      html.style.overflow = previousOverflow;
      html.style.scrollbarGutter = previousGutter;
      // Neither opening nor dismissing a photograph should move the project page.
      if (
        window.scrollX !== previousScroll.x ||
        window.scrollY !== previousScroll.y
      ) {
        window.scrollTo({
          left: previousScroll.x,
          top: previousScroll.y,
          behavior: 'instant',
        });
      }
      if (previousFocus?.isConnected)
        previousFocus.focus({ preventScroll: true });
      // Resume only after restoring the page, so no stale momentum can move it.
      releaseScrollLock();
    };
  }, [acquireScrollLock]);

  const keyboard = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    // Keep the native select's arrow and Home/End behaviour intact.
    if (event.target instanceof HTMLSelectElement) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      event.stopPropagation();
      void select(event.key === 'Home' ? 0 : count - 1);
    }
  };

  const startSwipe = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return;
    pointers.current.add(event.pointerId);
    if (
      pointers.current.size !== 1 ||
      !event.isPrimary ||
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

  const finishSwipe = (event: PointerEvent<HTMLDivElement>) => {
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
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (
      Math.abs(x) > 64 &&
      Math.abs(x) > Math.abs(y) * 1.6 &&
      performance.now() - start.time < 900
    ) {
      move(x < 0 ? 1 : -1);
    }
  };

  if (!item) return null;

  return (
    <dialog
      ref={dialog}
      className={styles.viewer}
      aria-labelledby={`${id}-title`}
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={keyboard}
    >
      <header className={styles.header}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>Project collection</span>
          <h2 id={`${id}-title`}>{project.title}</h2>
        </div>
        <button
          ref={closeButton}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close image viewer"
        >
          <span>Close</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M6 18 18 6" />
          </svg>
        </button>
      </header>

      <div
        className={styles.stage}
        aria-busy={pending !== null}
        onPointerDown={startSwipe}
        onPointerUp={finishSwipe}
        onPointerCancel={(event) => {
          pointers.current.delete(event.pointerId);
          gesture.current = null;
        }}
      >
        <PlaceholderImage
          key={`${project.slug}-${currentIndex}`}
          src={item.src}
          alt={item.alt || `${project.title} — ${item.title}`}
          variant={item.variant}
          className={styles.image}
          priority
          sizes={galleryImageSizes(item, 'fullscreen')}
          blurDataURL={item.blurDataURL}
          fit="contain"
        />
      </div>

      <footer className={styles.footer}>
        {(pending !== null || error) && (
          <output className={styles.loading}>
            {error || 'Loading photo…'}
          </output>
        )}
        <div className={styles.caption} aria-live="polite" aria-atomic="true">
          <span className={styles.count}>
            {number(currentIndex)}{' '}
            <span>/ {String(count).padStart(2, '0')}</span>
          </span>
          <div>
            <p>{item.title}</p>
            <span className={styles.provenance}>
              {item.isReference ? (
                item.sourceUrl ? (
                  <>
                    Illustrative reference ·{' '}
                    <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                      Unsplash photo source ↗
                    </a>
                  </>
                ) : (
                  'Illustrative reference · Unsplash'
                )
              ) : concept ? (
                'AI concept · not completed project photography'
              ) : !item.src ? (
                'Illustrative drawing · not a project record'
              ) : (
                'Project photography'
              )}
            </span>
          </div>
        </div>

        {count > 1 && (
          <div className={styles.navigation}>
            <label className={styles.jump} htmlFor={`${id}-jump`}>
              <span>Jump to image</span>
              <select
                id={`${id}-jump`}
                value={pending ?? currentIndex}
                onChange={(event) => void select(Number(event.target.value))}
              >
                {project.gallery.map((image, index) => (
                  <option key={index} value={index}>
                    {number(index)} — {image.title}
                  </option>
                ))}
              </select>
            </label>
            <div className={styles.arrows}>
              <button
                type="button"
                onClick={() => move(-1)}
                disabled={(pending ?? currentIndex) === 0}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 12H4m7-7-7 7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                disabled={(pending ?? currentIndex) === count - 1}
                aria-label="Next image"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </footer>
    </dialog>
  );
}
