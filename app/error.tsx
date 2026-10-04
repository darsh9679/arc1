'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" tabIndex={-1} className="not-found section-pad">
      <p className="eyebrow">A brief interruption</p>
      <h1>
        Let’s try
        <br />
        <em>that again.</em>
      </h1>
      <p>
        This page could not be loaded. Your other pages are still available.
      </p>
      <button className="text-link" onClick={reset}>
        Try again ↗
      </button>
      <br />
      <Link className="text-link" href="/">
        Back to the studio ↗
      </Link>
    </main>
  );
}
