'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/brand-logo';
import { SocialIcons } from '@/components/social-icons';
import styles from './site-header.module.css';

function isCurrentPage(pathname: string, href: string) {
  const target = href.split('#')[0];
  return (
    pathname === target || (target === '/work' && pathname.startsWith('/work/'))
  );
}

const links = [
  { href: '/studio', label: 'Studio' },
  { href: '/work', label: 'Work' },
  { href: '/recognition', label: 'Recognition' },
  { href: '/contact', label: 'Contact' },
];
export function SiteHeader() {
  const pathname = usePathname();
  return <NavigationHeader key={pathname} pathname={pathname} />;
}
function NavigationHeader({ pathname }: { pathname: string }) {
  // Native fragments also scroll when the current URL already has this hash.
  const EnquiryLink = pathname === '/contact' ? 'a' : Link;
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const mobileNavigation = useRef<HTMLElement>(null);
  const mobileActions = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia('(min-width: 901px)');
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const dismissOutside = (event: PointerEvent | FocusEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const dismissOnDesktop = () => {
      if (!desktop.matches) return;
      if (
        mobileNavigation.current?.contains(document.activeElement) ||
        mobileActions.current?.contains(document.activeElement)
      )
        header.current
          ?.querySelector<HTMLAnchorElement>('.site-brand')
          ?.focus();
      setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('focusin', dismissOutside);
    desktop.addEventListener('change', dismissOnDesktop);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('focusin', dismissOutside);
      desktop.removeEventListener('change', dismissOnDesktop);
    };
  }, [open]);
  return (
    <header ref={header} className={`site-header ${styles.header}`}>
      <Link
        className="site-brand"
        href="/"
        aria-label="Trayaksh Architeqts home"
        aria-current={isCurrentPage(pathname, '/') ? 'page' : undefined}
      >
        <BrandLogo eager decorative />
      </Link>
      <div className={styles.desktopControls}>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={
                link.href === '/contact' ? styles.contactLink : undefined
              }
              aria-current={
                isCurrentPage(pathname, link.href) ? 'page' : undefined
              }
            >
              {link.label}
              {link.href === '/contact' && <span aria-hidden="true">↗</span>}
            </Link>
          ))}
        </nav>
        <SocialIcons className={styles.desktopSocials} />
      </div>
      <div ref={mobileActions} className={styles.mobileActions}>
        <EnquiryLink
          href={
            pathname === '/contact'
              ? '#project-enquiry'
              : '/contact#project-enquiry'
          }
          className={styles.enquireLink}
          aria-current={
            isCurrentPage(pathname, '/contact#project-enquiry')
              ? 'page'
              : undefined
          }
          onClick={() => setOpen(false)}
        >
          Enquire <span aria-hidden="true">↗</span>
        </EnquiryLink>
        <Button
          ref={menuButton}
          variant="ghost"
          className={`menu-button ${styles.menuButton}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
        </Button>
      </div>
      <nav
        ref={mobileNavigation}
        id="mobile-nav"
        className={`mobile-nav ${styles.mobileNavigation}`}
        aria-label="Mobile navigation"
        hidden={!open}
      >
        <p className={styles.menuLabel}>Explore Trayaksh</p>
        <div className={styles.menuLinks}>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-current={isCurrentPage(pathname, '/') ? 'page' : undefined}
          >
            Home <span aria-hidden="true">↗</span>
          </Link>
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
              aria-current={
                isCurrentPage(pathname, link.href) ? 'page' : undefined
              }
            >
              {link.label} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <div className={styles.menuSocials}>
          <p className={styles.menuLabel}>Follow the studio</p>
          <SocialIcons />
        </div>
      </nav>
    </header>
  );
}
