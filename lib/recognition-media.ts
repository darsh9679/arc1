/** Supplied event photographs and original award-ceremony recording. */
export const recognitionPhotos = [
  {
    src: '/images/recognition/award-portrait-2025.webp',
    alt: 'Ar. Sharvari Pawaskar holding her certificate and trophy at the Design & Vision 2025 awards event in Goa.',
    caption: 'A shared milestone · Goa, 2025',
    width: 1034,
    height: 1280,
  },
  {
    src: '/images/recognition/award-presentation-2025.webp',
    alt: 'Ar. Sharvari Pawaskar receiving her certificate and trophy on stage at the Design & Vision 2025 awards ceremony.',
    caption: 'The award presentation',
    width: 1280,
    height: 1280,
  },
] as const;

export const recognitionFilm = {
  src: '/videos/recognition/reg.mp4',
  poster: recognitionPhotos[1].src,
  width: 1024,
  height: 576,
  duration: '0:23',
} as const;
