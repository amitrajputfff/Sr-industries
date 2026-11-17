import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, MessageCircle } from 'lucide-react';
import { CATEGORIES, CONTACT_DATA, PRODUCTS } from '@/lib/data';
import {
  CATEGORY_LABEL,
  FOUNDED,
  PHONE_HREF,
  PRICE_LIST_PDF,
  WHATSAPP_HREF,
  cutout,
  getProduct,
  isPhoto,
  priceSummary,
} from '@/lib/catalog';
import { StoveFigure, type FigurePart } from '@/components/StoveFigure';
import { PartGlyph, type GlyphKind } from '@/components/PartGlyph';
import { KnobStudio } from '@/components/KnobStudio';
import { EuroSwitcher } from '@/components/EuroSwitcher';

export const metadata = {
  alternates: { canonical: '/' },
};

const FIGURE: { slug: string; kind: FigurePart['kind']; name: string }[] = [
  { slug: 'hob-series-01', kind: 'knob', name: 'Knob, Hob series' },
  { slug: 'gtm-dial-plate', kind: 'plate', name: 'Dial plate, GTM' },
  { slug: 'leg-ls-40', kind: 'leg', name: 'Stove leg, LS-40' },
];

const PRICE_LIST = [
  'royal-series-01',
  'hob-series-01',
  'ultra-series-01',
  'gtm-dial-plate',
  'leg-ls-40',
  'standard-coupler',
  'burner-pin-standard',
  'safety-lock-30-deg',
];

export default function Home() {
  const euro = getProduct('euro-series-01')!;
  const knobs = PRODUCTS.filter((p) => p.category === 'knobs' && p.slug !== 'euro-series-01' && p.slug !== 'royal-series-01');
  const figure: FigurePart[] = FIGURE.map((f, i) => {
    const p = getProduct(f.slug)!;
    return { n: i + 1, kind: f.kind, name: f.name, code: p.modelNumber, price: priceSummary(p) ?? undefined, href: `/products/${p.slug}` };
  });
  const codes = PRODUCTS.slice(0, 24).map((p) => ({ code: p.modelNumber, name: p.name.replace(/ Knob$/, '') }));
  const rows = PRICE_LIST.map((s) => getProduct(s)).filter(Boolean) as typeof PRODUCTS;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="panel hero-panel">
          <span className="dots-field" aria-hidden />
          <div className="container">
            <div className="hero-head">
              <h1 id="hero-title">Gas stove parts, built to fit</h1>
              <div className="hero-side">
                <p className="lead">Knobs, dial plates, legs and safety parts for stove makers. Made in Faridabad since {FOUNDED}.</p>
                <div className="btn-row">
                  <Link href="/products" className="btn btn--primary">
                    See the catalogue <ArrowRight aria-hidden />
                  </Link>
                  <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
                    <MessageCircle aria-hidden /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
            <StoveFigure parts={figure} />
          </div>
        </div>
      </section>

      <div className="marquee" aria-label="Some of our model codes">
        <div className="marquee-track">
          {[...codes, ...codes].map((c, i) => (
            <span key={i} aria-hidden={i >= codes.length || undefined}>
              <b>{c.code}</b> {c.name}
            </span>
          ))}
        </div>
      </div>

      {/* Knob studio */}
      <section className="section" aria-labelledby="studio">
        <div className="container">
          <div className="head" data-reveal>
            <h2 id="studio">Every knob, every finish</h2>
            <p className="lead">Pick a series and a finish to see the part, its code and its price per piece.</p>
          </div>
          <div data-reveal>
            <KnobStudio knobs={knobs} />
          </div>
        </div>
      </section>

      {/* Families */}
      <section className="section band" aria-labelledby="families">
        <div className="container">
          <div className="head" data-reveal>
            <h2 id="families">Five families of parts</h2>
            <p className="lead">{PRODUCTS.length} models, all sold by the piece in bulk.</p>
          </div>
          <div className="families" data-reveal>
            {CATEGORIES.map((c) => {
              const count = PRODUCTS.filter((p) => p.category === c.id).length;
              return (
                <Link key={c.id} href={`/products?category=${c.slug}`} className="family">
                  <div className="glyph">
                    <span className="dots-field" aria-hidden />
                    <PartGlyph kind={c.id as GlyphKind} />
                  </div>
                  <div className="family-cap">
                    <h3>{c.name}</h3>
                    <span className="code">{count} {count === 1 ? 'model' : 'models'}</span>
                  </div>
                  <p className="family-sub">{c.subCategories?.join(', ')}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Euro series on the stove */}
      <section className="section" aria-labelledby="euro">
        <div className="container">
          <div className="head" data-reveal>
            <h2 id="euro">Euro series, on the stove</h2>
            <p className="lead">Nine top and ring combinations. Tap one to see it fitted.</p>
          </div>
          <div data-reveal>
            <EuroSwitcher product={euro} />
          </div>
        </div>
      </section>

      {/* Since */}
      <section className="section band" aria-labelledby="since">
        <div className="container since">
          <div>
            <p className="big-year" data-roll aria-label={FOUNDED}>
              {FOUNDED.split('').map((d, i) => (
                <span key={i} aria-hidden>{d}</span>
              ))}
            </p>
            <h2 id="since">The year we started making stove parts in Ballabhgarh.</h2>
          </div>
          <dl className="ruled" data-reveal>
            <div><dt>Factory</dt><dd>Saroorpur Industrial Area, Ballabhgarh, Faridabad</dd></div>
            <div><dt>Materials</dt><dd>Nylon, ABS, PP, brass and zinc alloy</dd></div>
            <div><dt>Minimum order</dt><dd>3,000 pieces a model</dd></div>
            <div><dt>Pricing</dt><dd>Per piece, better as quantity grows</dd></div>
          </dl>
        </div>
      </section>

      {/* Price list */}
      <section className="section" aria-labelledby="prices">
        <div className="container">
          <div className="head" data-reveal>
            <h2 id="prices">Price list, per piece</h2>
            <p className="lead">A sample from across the range. Every model and finish is in the catalogue.</p>
          </div>
          <div data-reveal>
            <table className="spec">
              <thead>
                <tr>
                  <th scope="col"><span className="visually-hidden">Picture</span></th>
                  <th scope="col">Part</th>
                  <th scope="col">Code</th>
                  <th scope="col">Family</th>
                  <th scope="col">Material</th>
                  <th scope="col" className="r">Price</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id}>
                    <td className="thumb">
                      <div className={`studio${isPhoto(p.image) ? ' studio--photo' : ''}`} style={{ position: 'relative' }}>
                        <Image src={cutout(p.image)} alt="" fill sizes="60px" />
                      </div>
                    </td>
                    <td className="name"><Link href={`/products/${p.slug}`}>{p.name}</Link></td>
                    <td className="c-code"><span className="code c">{p.modelNumber}</span></td>
                    <td className="hide-sm muted">{CATEGORY_LABEL[p.category]}</td>
                    <td className="mat">{p.specs.material}</td>
                    <td className="price r"><span className="code">{priceSummary(p) ?? 'On request'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="btn-row" style={{ marginTop: 32 }}>
              <a href={PRICE_LIST_PDF} download className="btn btn--primary">
                <Download aria-hidden /> Download the full price list (PDF)
              </a>
              <Link href="/products" className="btn btn--secondary">Open the catalogue <ArrowRight aria-hidden /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="section band" aria-labelledby="order">
        <div className="container close">
          <div data-reveal>
            <h2 id="order">Planning a production run?</h2>
            <p className="lead">Send the model codes and quantities. We reply with the bulk price.</p>
            <div className="btn-row">
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
                <MessageCircle aria-hidden /> WhatsApp the factory
              </a>
              <Link href="/contact" className="btn btn--secondary">Visit or write to us</Link>
            </div>
          </div>
          <dl className="ruled ruled--stack" data-reveal>
            <div>
              <dt>Phone</dt>
              <dd><a className="bignum" href={PHONE_HREF}>{CONTACT_DATA.phone}</a></dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a className="link" href={`mailto:${CONTACT_DATA.email}`}>{CONTACT_DATA.email}</a></dd>
            </div>
            <div>
              <dt>Factory</dt>
              <dd style={{ fontWeight: 400 }}>{CONTACT_DATA.address}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
