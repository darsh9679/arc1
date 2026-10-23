'use client';

import { useId, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Image from 'next/image';
import { ArrowUpRight, Expand, Play, X } from 'lucide-react';
import { useScrollLock } from '@/components/scroll-lock-context';
import styles from './recognition-media.module.css';

type RecognitionPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type Props = {
  photos: readonly RecognitionPhoto[];
  videoSrc: string;
  videoPoster: string;
  videoWidth: number;
  videoHeight: number;
  videoDuration?: string;
};

function PhotoViewer({
  photo,
  onClose,
}: {
  photo: RecognitionPhoto;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const acquireScrollLock = useScrollLock();
  const id = useId();

  useLayoutEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const releaseScrollLock = acquireScrollLock();
    const previousOverflow = document.documentElement.style.overflow;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    if (window.innerWidth > document.documentElement.clientWidth)
      document.documentElement.style.scrollbarGutter = 'stable';
    document.documentElement.style.overflow = 'hidden';
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });

    return () => {
      element.close();
      document.documentElement.style.overflow = previousOverflow;
      document.documentElement.style.scrollbarGutter = previousGutter;
      previousFocus?.focus({ preventScroll: true });
      releaseScrollLock();
    };
  }, [acquireScrollLock]);

  return (
    <dialog
      ref={dialog}
      className={styles.viewer}
      aria-labelledby={`${id}-caption`}
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className={styles.viewerToolbar}>
        <span>Award ceremony · 2025</span>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          className={styles.close}
          aria-label="Close award photograph"
        >
          Close <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div className={styles.viewerImage}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 600px) 94vw, 80vw"
          loading="eager"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <p id={`${id}-caption`} className={styles.viewerCaption}>
        {photo.caption}
      </p>
    </dialog>
  );
}

/** The film is only mounted after a deliberate play click, keeping MP4 requests off page load. */
export function RecognitionMedia({
  photos,
  videoSrc,
  videoPoster,
  videoWidth,
  videoHeight,
  videoDuration,
}: Props) {
  const [activePhoto, setActivePhoto] = useState<RecognitionPhoto | null>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const playButton = useRef<HTMLButtonElement>(null);
  const id = useId();

  const playFilm = () => {
    // Commit within the click so play() retains the browser's user activation.
    flushSync(() => {
      setVideoError(null);
      setVideoStarted(true);
    });
    const element = video.current;
    if (!element) return;
    element.focus({ preventScroll: true });
    void element.play().catch(() => {
      if (!element.isConnected) return;
      setVideoError(
        'Playback could not start. Try the video’s play control, or open the film directly.',
      );
    });
  };

  return (
    <div className={`${styles.media} ${!photos.length ? styles.filmOnly : ''}`}>
      {photos.length > 0 && (
        <div className={styles.photoCollection}>
          <div className={styles.collectionHeading}>
            <p>The ceremony, in pictures</p>
            <span>{String(photos.length).padStart(2, '0')} photographs</span>
          </div>
          <div className={styles.photoStrip}>
            {photos.map((photo, index) => (
              <figure key={photo.src} className={styles.photoCard}>
                <button
                  type="button"
                  className={styles.photoButton}
                  onClick={() => {
                    video.current?.pause();
                    setActivePhoto(photo);
                  }}
                  aria-label={`Enlarge photograph: ${photo.caption}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 599px) 74vw, (max-width: 900px) 42vw, (max-width: 1600px) 25vw, 400px"
                    className={styles.photo}
                  />
                  <span className={styles.expand} aria-hidden="true">
                    <Expand size={15} />
                  </span>
                </button>
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          {photos.length > 1 && (
            <p className={styles.swipeHint}>
              Swipe through the moments · Tap to enlarge
            </p>
          )}
        </div>
      )}

      <figure className={styles.film}>
        <div className={styles.collectionHeading}>
          <p>A moment to remember</p>
          <span>
            {videoDuration ? `${videoDuration} · Event film` : 'Event film'}
          </span>
        </div>
        <div className={styles.filmStage}>
          {videoStarted ? (
            <>
              {/* No timed captions were supplied; keep the original event recording intact. */}
              {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                ref={video}
                className={styles.video}
                src={videoSrc}
                poster={videoPoster}
                width={videoWidth}
                height={videoHeight}
                controls
                playsInline
                preload="metadata"
                tabIndex={0}
                aria-label="Award ceremony film"
                aria-describedby={videoError ? `${id}-video-error` : undefined}
                onPlaying={() => setVideoError(null)}
                onError={() =>
                  setVideoError(
                    'The film could not load. You can open it directly below.',
                  )
                }
              >
                Your browser cannot play this video.{' '}
                <a href={videoSrc}>Open the award ceremony film</a>.
              </video>
              <button
                type="button"
                className={styles.closeFilm}
                aria-label="Close film and return to video preview"
                onClick={() => {
                  setVideoStarted(false);
                  setVideoError(null);
                  window.requestAnimationFrame(() =>
                    playButton.current?.focus(),
                  );
                }}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </>
          ) : (
            <button
              ref={playButton}
              type="button"
              className={styles.playButton}
              onClick={playFilm}
              aria-label="Watch the award moment"
            >
              <Image
                src={videoPoster}
                alt=""
                fill
                sizes="(max-width: 599px) calc(100vw - 48px), (max-width: 900px) 90vw, (max-width: 1600px) 38vw, 640px"
                className={styles.poster}
              />
              <span className={styles.playLabel}>
                <span className={styles.playIcon}>
                  <Play size={22} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>Watch the award moment</span>
              </span>
            </button>
          )}
        </div>
        <figcaption className={styles.filmCaption}>
          <span>From the award ceremony</span>
          <span>
            {videoDuration ? `${videoDuration} duration` : 'Event film'}
          </span>
        </figcaption>
        {videoError && (
          <output className={styles.videoError} id={`${id}-video-error`}>
            <p>{videoError}</p>
            <a href={videoSrc} target="_blank" rel="noreferrer">
              Open the film <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </output>
        )}
      </figure>

      {activePhoto && (
        <PhotoViewer photo={activePhoto} onClose={() => setActivePhoto(null)} />
      )}
    </div>
  );
}
