import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { EnquiryForm, ContactMap } from '@/components/enquiry-form';
import { EditorialMotion } from '@/components/editorial-motion';
import { SocialIcon } from '@/components/social-icons';
import { studio } from '@/lib/content';
import { clientCopy } from '@/lib/client-copy';
import { pageMetadata } from '@/lib/metadata';
import styles from './contact.module.css';

export const metadata = pageMetadata(
  'Contact',
  'Start your architecture, interior design, project management or Vastu Shastra enquiry with Trayaksh Architeqts. Based in Mumbai, working across India.',
  '/contact',
  '/og.png',
);

export default function Contact() {
  return (
    <main
      id="main-content"
      className={`inner-page contact-page ${styles.page}`}
      data-editorial-page="contact"
      tabIndex={-1}
    >
      <EditorialMotion page="contact" />
      <div className={styles.opening}>
        <div className={styles.layout}>
          <section
            id="project-enquiry"
            className={styles.formPanel}
            aria-labelledby="enquiry-heading"
            tabIndex={-1}
            data-editorial-reveal
          >
            <div className={styles.formHeading}>
              <span className={styles.formIndex} aria-hidden="true">
                01 /
              </span>
              <div>
                <h1 id="enquiry-heading">Project enquiry</h1>
                <p>A few details to begin the conversation.</p>
              </div>
            </div>
            <EnquiryForm
              deliveryEnabled={Boolean(
                process.env.GOOGLE_SHEETS_WEB_APP_URL
                  ? process.env.GOOGLE_SHEETS_WEB_APP_TOKEN &&
                      process.env.GOOGLE_SHEETS_WEB_APP_TOKEN.length >= 32
                  : process.env.ENQUIRY_WEBHOOK_URL,
              )}
            />
          </section>
          <section
            className={styles.introduction}
            aria-labelledby="contact-heading"
          >
            <p className={styles.eyebrow}>Contact / New projects</p>
            <h2 id="contact-heading">
              Let’s shape
              <br /> <em>your space.</em>
            </h2>
            <p className={styles.lead}>
              A home, a workplace, a new possibility. Tell us what you have in
              mind.
            </p>
            <div className={styles.directContact}>
              <p>Prefer a conversation?</p>
              <div className={styles.contactActions}>
                <a
                  className={styles.phone}
                  href={`tel:${studio.phoneHref}`}
                  aria-label={`Call the studio on +91 ${studio.phone}`}
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>+91 {studio.phone}</span>
                </a>
                <a
                  className={styles.instagram}
                  href={studio.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram (opens in a new tab)"
                >
                  <SocialIcon platform="instagram" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
            <p className={styles.practice}>
              <MapPin size={15} aria-hidden="true" />
              <span>Based in Mumbai · Projects across India</span>
            </p>
          </section>
        </div>
      </div>
      <section
        className={styles.visit}
        aria-labelledby="studio-location-heading"
        data-editorial-reveal
      >
        <div className={styles.visitGrid}>
          <div className={styles.studioInformation}>
            <p className={styles.eyebrow}>02 / Meet the studio</p>
            <h2 id="studio-location-heading">
              Rooted in Mumbai.
              <br />
              <em>Open to possibility.</em>
            </h2>
            <p className={styles.invitation}>
              {clientCopy.geography.invitation}
            </p>
            <div className={styles.studioIdentity}>
              <p>{studio.name}</p>
              <span>{studio.principal}</span>
            </div>
            <div className={styles.studioLinks}>
              <a href={studio.mapSearchUrl} target="_blank" rel="noreferrer">
                Get directions <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              {studio.email && (
                <a href={`mailto:${studio.email}`}>
                  {studio.email}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
            <p className={styles.regions}>{studio.practiceAreas.join(' · ')}</p>
          </div>
          <div className={styles.mapPanel}>
            <ContactMap />
          </div>
        </div>
      </section>
    </main>
  );
}
