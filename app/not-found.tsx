import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="not-found section-pad">
      <p className="eyebrow">404 / A little off plan</p>
      <h1>
        This space
        <br />
        <em>isn’t here.</em>
      </h1>
      <p>The page may have moved, or the address may be incomplete.</p>
      <Link href="/work" className="text-link">
        Return to the work <span>↗</span>
      </Link>
    </main>
  );
}
