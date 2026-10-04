import { studio } from '@/lib/content';

// The client requested these icons; connect the remaining profiles when their
// actual URLs are supplied. Unlinked icons never navigate to guessed accounts.
export const socialProfiles = [
  {
    name: 'Instagram',
    key: 'instagram',
    url: studio.instagram as string | null,
  },
  { name: 'Facebook', key: 'facebook', url: null as string | null },
  { name: 'LinkedIn', key: 'linkedin', url: null as string | null },
  { name: 'YouTube', key: 'youtube', url: null as string | null },
] as const;
