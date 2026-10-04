import Image from 'next/image';

export const stockPhotographs = {
  opening: {
    src: '/images/stock/unsplash-brian-zajac-living-room.webp',
    alt: 'Tall black-framed windows, woven pendant lights and warm timber in a bright contemporary interior.',
    photographer: 'Brian Zajac',
    platform: 'Unsplash',
    href: 'https://unsplash.com/photos/a-modern-living-room-with-wood-and-light-IKmaFgsmKMo',
  },
  atmosphere: {
    src: '/images/stock/pexels-ansar-muhammad-living-room.webp',
    alt: 'Warm living room with a light sofa, dark timber shelving, marble detailing and garden views.',
    photographer: 'Ansar Muhammad',
    platform: 'Pexels',
    href: 'https://www.pexels.com/photo/interior-design-of-living-room-20451394/',
  },
} as const;

export type StockPhotographKey = keyof typeof stockPhotographs;

export function StockPhotograph({
  photo,
  className = '',
  priority = false,
  sizes = '100vw',
}: {
  photo: StockPhotographKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const image = stockPhotographs[photo];

  return (
    <figure className={`stock-photograph ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="stock-photograph-image"
      />
      <figcaption className="stock-photograph-credit">
        <span>Illustrative image</span>
        <a href={image.href} target="_blank" rel="noreferrer">
          {image.photographer} / {image.platform}
        </a>
      </figcaption>
    </figure>
  );
}
