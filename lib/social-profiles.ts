import { studio } from '@/lib/content';

export const socialProfiles = [
  {
    name: 'Instagram',
    key: 'instagram',
    url: studio.instagram as string | null,
  },
  {
    name: 'Facebook',
    key: 'facebook',
    url: 'https://www.facebook.com/share/1FWmhqLRaf/',
  },
  {
    name: 'LinkedIn',
    key: 'linkedin',
    url: 'https://www.linkedin.com/in/sharvari-pawaskar-91544b1a8/',
  },
  {
    name: 'YouTube',
    key: 'youtube',
    url: 'https://youtube.com/@sharvaripawaskar3174?si=SO33QlBnmho3yKmu',
  },
] as const;
