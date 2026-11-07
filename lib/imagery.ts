export const andheriDaylightPhoto = {
  src: '/images/project-covers/andheri-apartment-daylight-v1.webp',
  title: 'Living room in daylight',
  alt: 'Cream seating and brass nesting tables beside the timber and marble media wall in the Andheri living room.',
  aspect: 'landscape',
  width: 1536,
  height: 1024,
} as const;

/** Design studies used to illustrate the practice's process. */
export const conceptImages = {
  workspace: {
    src: '/images/concepts/workspace-wide.webp',
    alt: 'Workspace design study with warm timber joinery, a communal table and soft city-facing daylight.',
  },
  workspaceBefore: {
    src: '/images/concepts/workspace-before.webp',
    alt: 'Open workspace design study before furniture and joinery are introduced.',
  },
  residence: {
    src: '/images/concepts/courtyard-residence.webp',
    alt: 'Courtyard residence design study with pale stone, deep openings, timber screens and tropical planting.',
  },
  living: {
    src: '/images/concepts/living-room.webp',
    alt: 'Living room design study with linen seating, limestone flooring, warm teak and courtyard greenery.',
  },
  livingBefore: {
    src: '/images/concepts/living-room-before.webp',
    alt: 'Open living room design study before furniture and finishes are introduced.',
  },
  hospitality: {
    src: '/images/concepts/hospitality-court.webp',
    alt: 'Hospitality courtyard design study with pale stone, a covered colonnade and a reflecting water channel.',
  },
  detail: {
    src: '/images/concepts/material-detail.webp',
    alt: 'Interior material study of stone, dark fluted teak, linen and warm plaster.',
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
