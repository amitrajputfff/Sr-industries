import Link from 'next/link';
import { PartGlyph } from '@/components/PartGlyph';

export default function NotFound() {
  return (
    <section className="page-head" style={{ paddingBottom: 'var(--section)' }}>
      <div className="container" style={{ display: 'grid', gap: 32, justifyItems: 'start', maxWidth: 760 }}>
        <div style={{ width: 200, color: 'var(--ink)' }} className="nf-glyph">
          <PartGlyph kind="knobs" />
        </div>
        <h1 style={{ fontSize: 'var(--text-section)' }}>This page is switched off</h1>
        <p className="lead">The link may be old, or the part may have moved. The catalogue has every model we make.</p>
        <div className="btn-row">
          <Link href="/products" className="btn btn--primary">Open the catalogue</Link>
          <Link href="/" className="btn btn--secondary">Go home</Link>
        </div>
      </div>
    </section>
  );
}
