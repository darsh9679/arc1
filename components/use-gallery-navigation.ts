'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { getImageProps } from 'next/image';
import type { Project } from '@/lib/content';

type Photo = Project['gallery'][number];
type View = 'gallery' | 'fullscreen';
type PreparedImage = { promise: Promise<boolean>; image?: HTMLImageElement };
const prepared = new Map<string, PreparedImage>();

/** Match the contained photograph, rather than the full width of its frame. */
export function galleryImageSizes(photo: Photo, view: View = 'gallery') {
  const ratio =
    photo.width && photo.height
      ? photo.width / photo.height
      : photo.aspect === 'portrait'
        ? 2 / 3
        : photo.aspect === 'square'
          ? 1
          : 1.5;
  const scale = Math.round(ratio * 10000) / 10000;
  if (view === 'fullscreen') return `min(100vw, calc(82svh * ${scale}))`;
  return [
    `(max-width: 599px) min(calc(100vw - 48px), calc(clamp(220px, 33svh, 300px) * ${scale}))`,
    `(max-width: 900px) min(90vw, calc(clamp(300px, 46svh, 440px) * ${scale}))`,
    `min(64vw, calc(clamp(320px, 52svh, 500px) * ${scale}))`,
  ].join(', ');
}

/** Use exactly the same responsive request as the displayed next/image. */
export function prepareGalleryImage(
  photo: Photo,
  view: View = 'gallery',
  priority: 'high' | 'low' = 'low',
): Promise<boolean> {
  if (!photo.src || typeof window === 'undefined') return Promise.resolve(true);
  const sizes = galleryImageSizes(photo, view);
  const key = `${photo.src}|${sizes}|${window.innerWidth}x${window.innerHeight}|${window.devicePixelRatio}`;
  const cached = prepared.get(key);
  if (cached) {
    if (priority === 'high' && cached.image)
      cached.image.fetchPriority = 'high';
    return cached.promise;
  }

  const { props } = getImageProps({
    src: photo.src,
    alt: '',
    fill: true,
    sizes,
    unoptimized: !photo.src.startsWith('/') || photo.src.endsWith('.svg'),
  });
  const image = new window.Image();
  const pending = new Promise<boolean>((resolve) => {
    image.decoding = 'async';
    image.fetchPriority = priority;
    image.onload = () => {
      const entry = prepared.get(key);
      if (entry?.image === image) entry.image = undefined;
      image.decode().then(
        () => resolve(true),
        () => resolve(true),
      );
    };
    image.onerror = () => {
      prepared.delete(key);
      resolve(false);
    };
    image.sizes = sizes;
    if (props.srcSet) image.srcset = props.srcSet;
    image.src = props.src;
  });
  prepared.set(key, { promise: pending, image });
  if (prepared.size > 32) prepared.delete(prepared.keys().next().value!);
  return pending;
}

/** Warm only adjacent photos when their viewer is approaching the viewport. */
export function useGalleryPreparation(
  root: RefObject<HTMLElement | null>,
  photos: Photo[],
  active: number,
  view: View = 'gallery',
) {
  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (
      connection?.saveData ||
      ['slow-2g', '2g'].includes(connection?.effectiveType ?? '')
    )
      return;
    const node = root.current;
    if (!node) return;
    const warm = () => {
      for (const index of [active + 1, active - 1]) {
        if (photos[index]) void prepareGalleryImage(photos[index], view);
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          warm();
          observer.disconnect();
        }
      },
      { rootMargin: '600px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [root, photos, active, view]);
}

/** Keep the previous photograph visible until its replacement is decoded. */
export function useGalleryNavigation(
  photos: Photo[],
  initialIndex = 0,
  view: View = 'gallery',
) {
  const [active, setActive] = useState(() =>
    Math.max(0, Math.min(photos.length - 1, initialIndex)),
  );
  const [pending, setPending] = useState<number | null>(null);
  const [error, setError] = useState('');
  const request = useRef(0);
  const target = useRef(active);
  useEffect(
    () => () => {
      request.current += 1;
    },
    [],
  );

  const select = async (index: number) => {
    const next = Math.max(0, Math.min(photos.length - 1, index));
    if (!photos[next]) return;
    target.current = next;
    const sequence = ++request.current;
    setError('');
    if (next === active) {
      setPending(null);
      return;
    }
    setPending(next);
    const loaded = await prepareGalleryImage(photos[next], view, 'high');
    if (sequence !== request.current) return;
    if (loaded) setActive(next);
    else {
      target.current = active;
      setError('This photo could not be loaded. Please try again.');
    }
    setPending(null);
  };
  const move = (direction: number) => {
    void select(target.current + direction);
  };
  return { active, pending, error, select, move };
}
