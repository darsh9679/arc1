import Link from 'next/link';
import { BrandLogo } from '@/components/brand-logo';
import { SocialIcons } from '@/components/social-icons';
import { ReplayIntroduction } from '@/components/opening-sequence';
import { clientCopy } from '@/lib/client-copy';
import { studio } from '@/lib/content';
import styles from './site-footer.module.css';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/studio', label: 'Studio' },
  { href: '/work', label: 'Work' },
  { href: '/recognition', label: 'Recognition' },
  { href: '/contact', label: 'Contact' },
];

export function SiteFooter() {
  return (
    <footer className={`site-footer ${styles.footer}`}>
      <div className={styles.invitation} data-footer-part="invitation">
        <div>
          <p className={styles.kicker}>New projects & collaborations</p>
          <h2>
            Let’s talk about
            <br /> <em>your project.</em>
          </h2>
        </div>
        <div className={styles.action}>
          <Link href="/contact#project-enquiry" className={styles.enquiry}>
            Start your project <span aria-hidden="true">↗</span>
          </Link>
          <p>
            Thoughtful spaces begin
            <br />
            with a conversation.
          </p>
        </div>
      </div>

      <div className={styles.directory}>
        <div className={styles.identity}>
          <Link
            className={styles.brand}
            href="/"
            aria-label="Trayaksh Architeqts home"
          >
            <BrandLogo decorative />
          </Link>
          <p className={styles.descriptor}>{clientCopy.brand.descriptor}</p>
          <p className={styles.vision}>
            Three-Eyed Vision<span aria-hidden="true"> · </span>
            <span>Space. People. Possibility.</span>
          </p>
          <SocialIcons className={styles.socials} />
        </div>

        <nav className={styles.navigation} aria-label="Footer navigation">
          <h3 className={styles.label}>Explore</h3>
          <ul>
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.details}>
          <h3 className={styles.label}>Get in touch</h3>
          <div className={styles.contactGrid}>
            <div className={styles.contactLinks}>
              <a href={`tel:${studio.phoneHref}`}>+91 {studio.phone}</a>
              {studio.email && (
                <a href={`mailto:${studio.email}`}>{studio.email}</a>
              )}
            </div>
            <div className={styles.location}>
              <p className={styles.locationLabel}>Mumbai studio</p>
              <address>{studio.address}</address>
              <a
                className={styles.directions}
                href={studio.mapSearchUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get directions <span aria-hidden="true">↗</span>
              </a>
              <p className={styles.geography}>
                {studio.practiceAreas.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} {studio.name}
        </p>
        <div className={styles.utilities}>
          <ReplayIntroduction />
          <a href="#main-content">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
      <p className={styles.disclosure}>
        Design preview · AI concept images are labelled and do not document
        completed studio projects
      </p>
    </footer>
  );
}
