/* eslint-disable @next/next/no-img-element -- plain <img> so every picture is loaded when this page is printed to PDF */
import type { Metadata } from 'next';
import { CATEGORIES, CONTACT_DATA, PRODUCTS, type Product } from '@/lib/data';
import { FOUNDED, fmt, isPhoto, specLabel } from '@/lib/catalog';

// small JPEGs made by scripts/cutouts.py, so the PDF stays light
const thumb = (src: string) => src.replace(/^\/([^/]+)\/([^/]+)\.png$/, '/parts/thumbs/$1/$2.jpg');
import { PartGlyph, type GlyphKind } from '@/components/PartGlyph';

/*
 * The full price list, laid out for A4. scripts/catalogue-pdf.mjs prints this
 * page to public/SR-Industries-Price-List.pdf, which the site links to.
 */

export const metadata: Metadata = {
  title: 'Price List',
  description: 'The full SR Industries price list for gas stove parts, with model codes, finishes and per-piece prices.',
  alternates: { canonical: '/price-list' },
  robots: { index: false, follow: true },
};

const ISSUED = 'November 2026';

function price(p: Product, v?: NonNullable<Product['colorVariants']>[number]) {
  if (v?.price !== undefined) return `₹${fmt(v.price)}`;
  if (p.price !== undefined) return `₹${fmt(p.price)}`;
  if (p.priceRange) return `₹${fmt(p.priceRange.min)}–${fmt(p.priceRange.max)}`;
  return 'On request';
}

function Item({ p }: { p: Product }) {
  const specs = Object.entries(p.specs).filter(([, v]) => v);
  const variants = p.colorVariants ?? [];
  return (
    <article className={`pl-item${variants.length ? ' has-vars' : ''}`}>
      {!variants.length && (
        <div className={`pl-thumb${isPhoto(p.image) ? ' is-photo' : ''}`}>
          <img src={thumb(p.image)} alt="" />
        </div>
      )}
      <div className="pl-body">
        <div className="pl-title">
          <h3>{p.name}</h3>
          <span className="pl-code">{p.modelNumber}</span>
        </div>
        <p className="pl-specs">
          {specs.map(([k, v]) => (
            <span key={k}>
              {specLabel(k)} <b>{v}</b>
            </span>
          ))}
          {p.minOrderQty && (
            <span>
              Minimum <b>{p.minOrderQty.toLocaleString('en-IN')} pcs</b>
            </span>
          )}
        </p>
        {variants.length ? (
          <ul className="pl-vars">
            {variants.map((v) => (
              <li key={v.name + v.modelNumber}>
                {/* every finish with its own photo, not one picture for the series */}
                <div className={`pl-thumb${isPhoto(v.image) ? ' is-photo' : ''}`}>
                  <img src={thumb(v.image)} alt={`${p.name}, ${v.name}`} />
                </div>
                <span className="pl-vname">
                  <i style={{ background: v.color }} />
                  {v.name.replace(/\s*\(.*\)\s*$/, '')}
                </span>
                <span className="pl-vmeta">
                  <span className="pl-code">{v.modelNumber ?? p.modelNumber}</span>
                  <span className="pl-price">{price(p, v)}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="pl-single">
            <span>Price per piece</span> <b>{price(p)}</b>
          </p>
        )}
      </div>
    </article>
  );
}

export default function PriceListPage() {
  return (
    <div className="pl">
      <section className="pl-cover">
        <div className="pl-brand">
          <img src="/logo-mark.png" alt="SR Industries" width={22} height={40} />
          <span>SR Industries</span>
        </div>
        <div className="pl-cover-main">
          <h1>Gas stove parts, catalogue and price list</h1>
          <p>
            Knobs, dial plates, stove legs, couplers, burner pins and safety parts, made in Faridabad since {FOUNDED}.
            Prices are per piece in Indian rupees. Minimum order is 3,000 pieces a model unless a part says otherwise.
          </p>
        </div>
        <ol className="pl-contents">
          {CATEGORIES.map((c, i) => {
            const n = PRODUCTS.filter((p) => p.category === c.id).length;
            return (
              <li key={c.id}>
                <span className="pl-glyph"><PartGlyph kind={c.id as GlyphKind} /></span>
                <span className="pl-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="pl-cname">{c.name}</span>
                <span className="pl-count">{n} {n === 1 ? 'model' : 'models'}</span>
              </li>
            );
          })}
        </ol>
        <dl className="pl-contact">
          <div><dt>Phone and WhatsApp</dt><dd>{CONTACT_DATA.phone}</dd></div>
          <div><dt>Email</dt><dd>{CONTACT_DATA.email}</dd></div>
          <div><dt>Factory</dt><dd>{CONTACT_DATA.address}</dd></div>
          <div><dt>Issued</dt><dd>{ISSUED}. Prices may change; confirm before ordering.</dd></div>
        </dl>
      </section>

      {CATEGORIES.map((c, i) => (
        <section key={c.id} className="pl-section">
          <header className="pl-head">
            <span className="pl-n">{String(i + 1).padStart(2, '0')}</span>
            <h2>{c.name}</h2>
            {c.subCategories && <p>{c.subCategories.join(', ')}</p>}
          </header>
          <div className="pl-grid">
            {PRODUCTS.filter((p) => p.category === c.id).map((p) => (
              <Item key={p.id} p={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
