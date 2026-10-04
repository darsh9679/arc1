import Image from 'next/image';
import { studio } from '@/lib/content';

export function BrandLogo({
  stacked = false,
  decorative = false,
  eager = false,
}: {
  stacked?: boolean;
  decorative?: boolean;
  eager?: boolean;
}) {
  return (
    <Image
      className="brand-logo"
      src={stacked ? studio.logoStackedSrc : studio.logoSrc}
      alt={decorative ? '' : studio.name}
      width={stacked ? 429 : 596}
      height={stacked ? 444 : 152}
      // Keep the original SVG canvas from expanding the logo before CSS loads.
      style={{ maxWidth: stacked ? 429 : 244, height: 'auto' }}
      loading={eager ? 'eager' : 'lazy'}
      unoptimized
    />
  );
}
