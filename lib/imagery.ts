/** AI-created visual concepts, authorised by the user after the initial SVG-only build.
 * These assets are NOT photographs or verified representations of the studio's work.
 * Changing an image src to approved photography automatically removes its concept badge.
 */
export const conceptImages = {
  workspace: {
    src: '/images/concepts/workspace-wide.webp',
    alt: 'AI-generated workspace concept with warm timber joinery, a communal table and soft city-facing daylight. Not the actual Nerul project.',
  },
  workspaceBefore: {
    src: '/images/concepts/workspace-before.webp',
    alt: 'AI-generated bare-shell version of the workspace concept. A fictional comparison, not a record of construction.',
  },
  residence: {
    src: '/images/concepts/courtyard-residence.webp',
    alt: 'AI-generated contemporary courtyard residence concept with pale stone, deep openings, timber screens and tropical planting. Not a completed studio project.',
  },
  living: {
    src: '/images/concepts/living-room.webp',
    alt: 'AI-generated living room concept with linen seating, limestone flooring, warm teak and courtyard greenery. Not a completed studio project.',
  },
  livingBefore: {
    src: '/images/concepts/living-room-before.webp',
    alt: 'AI-generated bare-shell version of the living room concept. A fictional comparison, not a real renovation.',
  },
  hospitality: {
    src: '/images/concepts/hospitality-court.webp',
    alt: 'AI-generated boutique hospitality courtyard concept with pale local stone, a covered colonnade and a reflecting water channel. Not a completed studio project.',
  },
  detail: {
    src: '/images/concepts/material-detail.webp',
    alt: 'AI-generated interior material study of stone, dark fluted teak, linen and warm plaster. Not a documented project detail.',
  },
} as const;

export function getConceptImage(src?: string | null) {
  return src
    ? Object.values(conceptImages).find((image) => image.src === src)
    : undefined;
}

export function isConceptImage(src?: string | null) {
  return Boolean(getConceptImage(src));
}

/** Retouched project images retain a clear credit distinct from unaltered photos. */
const enhancedProjectPhotoPaths = new Set([
  '/images/projects/parijat-bungalow/gallery/01-bungalow-facade-enhanced-v1.webp',
  '/images/projects/vishwabharti-bank/gallery/03-meeting-room-founder-enhanced-v1.webp',
]);

export function isEnhancedProjectPhoto(src?: string | null) {
  return Boolean(src && enhancedProjectPhotoPaths.has(src.split('?')[0]));
}
