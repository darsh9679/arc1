import type { Metadata } from 'next';
import { getConceptImage } from '@/lib/imagery';

// Trusted configuration only; never infer origin from request/forwarded headers.
const configuredOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');
export const siteOrigin = new URL(configuredOrigin);
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string | null,
): Metadata {
  const concept = getConceptImage(image);
  const images = image
    ? [
        {
          url: new URL(image, siteOrigin).toString(),
          ...(concept ? { alt: concept.alt } : {}),
        },
      ]
    : [];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — Trayaksh Architeqts`,
      description,
      url: new URL(path, siteOrigin),
      siteName: 'Trayaksh Architeqts',
      type: 'website',
      images,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: `${title} — Trayaksh Architeqts`,
      description,
      images,
    },
  };
}
