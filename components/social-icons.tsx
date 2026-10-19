import Image from 'next/image';
import { socialProfiles } from '@/lib/social-profiles';
import styles from './social-icons.module.css';

export function SocialIcon({
  platform,
}: {
  platform: (typeof socialProfiles)[number]['key'];
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {platform === 'instagram' && (
        <g fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.9"
            fill="currentColor"
            stroke="none"
          />
        </g>
      )}
      {platform === 'facebook' && (
        <path
          fill="currentColor"
          d="M14 22v-9h3l.5-4H14V7c0-1.1.4-2 2-2h2V1.4C17.3 1.1 16.2 1 15 1c-3.2 0-5 2-5 5.5V9H7v4h3v9z"
        />
      )}
      {platform === 'linkedin' && (
        <g fill="currentColor">
          <circle cx="4.5" cy="4.5" r="2" />
          <path d="M3 8h3v13H3zM9 8h3v1.8C12.7 8.5 14 8 15.5 8 19 8 21 10 21 13.5V21h-3v-7c0-2-.8-3-2.5-3S12 12 12 14v7H9z" />
        </g>
      )}
      {platform === 'youtube' && (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        >
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <path d="m10 9 6 3-6 3z" fill="currentColor" stroke="none" />
        </g>
      )}
    </svg>
  );
}

export function SocialIcons({
  className = '',
  branded = false,
}: {
  className?: string;
  branded?: boolean;
}) {
  return (
    <ul className={`${styles.icons} ${className}`} aria-label="Social media">
      {socialProfiles.map(({ name, key, url }) => (
        <li key={key}>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
              aria-label={`${name} (opens in a new tab)`}
              title={name}
            >
              {branded ? (
                <Image
                  src={`/images/social/${key}.svg`}
                  width={24}
                  height={24}
                  alt=""
                  aria-hidden="true"
                />
              ) : (
                <SocialIcon platform={key} />
              )}
            </a>
          ) : (
            <span className={`${styles.icon} ${styles.unlinked}`} title={name}>
              <span className="sr-only">{name}</span>
              <SocialIcon platform={key} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
