import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { MotionProvider } from '@/components/motion-provider';
import { siteOrigin } from '@/lib/metadata';
import { clientCopy } from '@/lib/client-copy';
import './globals.css';
import './editorial.css';
import './atelier.css';
import './premium.css';
const display = localFont({
  src: [
    { path: './fonts/Fraunces.woff2', style: 'normal', weight: '100 900' },
    {
      path: './fonts/Fraunces-Italic.woff2',
      style: 'italic',
      weight: '100 900',
    },
  ],
  variable: '--font-display',
  display: 'swap',
});
const body = localFont({
  src: './fonts/Inter.woff2',
  variable: '--font-body',
  display: 'swap',
  weight: '100 900',
});
const title = 'Trayaksh Architeqts — Three-Eyed Vision';
const description = clientCopy.brand.summary;
export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: { default: title, template: '%s — Trayaksh Architeqts' },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    type: 'website',
    url: siteOrigin,
    siteName: 'Trayaksh Architeqts',
    images: [
      {
        url: new URL('/og.png', siteOrigin),
        width: 1731,
        height: 909,
        alt: 'Trayaksh Architeqts — Architecture & interiors, Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [new URL('/og.png', siteOrigin).toString()],
  },
  robots: {
    index: process.env.NEXT_PUBLIC_LAUNCH_READY === 'true',
    follow: process.env.NEXT_PUBLIC_LAUNCH_READY === 'true',
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable}`}>
        <MotionProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
