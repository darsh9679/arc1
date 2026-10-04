'use client';

import type { ReactNode } from 'react';
import { ScrollTrigger } from '@/lib/motion';

export function StudioBiography({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <details className={className} onToggle={() => ScrollTrigger.refresh()}>
      <summary>
        Read the full biography <span aria-hidden="true">+</span>
      </summary>
      {children}
    </details>
  );
}
