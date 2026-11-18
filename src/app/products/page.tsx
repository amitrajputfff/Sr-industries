import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, PRODUCTS } from '@/lib/data';
import { PRICE_LIST_PDF, SITE_URL, getCategory } from '@/lib/catalog';
import { Download } from 'lucide-react';
import { CatalogueGrid } from '@/components/CatalogueGrid';
import { JsonLd } from '@/components/JsonLd';

type SP = Promise<{ category?: string; sub?: string }>;

const CATEGORY_COPY: Record<string, { title: string; description: string }> = {
  knobs: {
    title: 'Gas Stove Knobs: Royal, Hob, Sleek, Euro, Metal and Ultra Series',
    description: 'Gas stove and hob knobs in Nylon, ABS and zinc alloy, 6 mm and 8 mm shafts, in many finishes. Bulk supply from SR Industries, Faridabad. MOQ 3,000 pieces.',
  },
  'dial-plates': {
    title: 'Gas Stove Dial Plates: Prestige, GTM, Slim, Round and more',
    description: 'Dial plates for LPG gas stoves in Nylon and ABS: Prestige, GTM, Regular, Slim, China, Round, Round S and Engraving series. Bulk prices from SR Industries.',
  },
  legs: {
    title: 'Gas Stove Legs: LS-15, LS-20, LS-25, LS-40 and Round',
    description: 'PVC gas stove legs in PP and ABS, 15 mm to 40 mm heights and a round leg for glass-top hobs. Bulk supply from SR Industries, Faridabad.',
  },
  'coupler-pins': {
    title: 'Gas Stove Couplers, Burner Pins and Nozzle Rings',
    description: 'Brass couplers, big couplers, burner pins and nozzle rings for LPG stoves, priced per piece for bulk orders. SR Industries, Faridabad.',
  },
  'auto-safety': {
    title: 'Gas Stove Cell Boxes, Safety Locks, Spindle and Nozzle Caps',
    description: 'Auto-ignition cell boxes, 0° and 30° safety locks, spindle caps and nozzle caps for gas stoves and hobs. Bulk supply from SR Industries.',
  },
};

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const { category } = await searchParams;
  const cat = category ? getCategory(category) : undefined;
  if (cat) {
    const c = CATEGORY_COPY[cat.slug];
    return {
      title: c.title,
      description: c.description,
      alternates: { canonical: `/products?category=${cat.slug}` },
      openGraph: { title: `${c.title} | SR Industries`, description: c.description, url: `/products?category=${cat.slug}`, images: ['/og/home.jpg'] },
    };
  }
  return {
    title: 'Gas Stove Parts Catalogue and Price List',
    description: `All ${PRODUCTS.length} SR Industries gas stove parts with model codes and per-piece prices: knobs, dial plates, stove legs, couplers, burner pins and safety components.`,
    alternates: { canonical: '/products' },
  };
}

export default async function ProductsPage({ searchParams }: { searchParams: SP }) {
  const { category, sub } = await searchParams;
  const cat = category ? getCategory(category) : undefined;
  const inCat = cat ? PRODUCTS.filter((p) => p.category === cat.id) : PRODUCTS;

  const norm = (s: string) => s.toLowerCase().replace(/ series$/, '').trim();
  const activeSub = cat && sub && sub !== 'all' ? cat.subCategories?.find((s) => norm(s) === norm(sub)) : undefined;
  const shown = activeSub ? inCat.filter((p) => p.subCategory && norm(p.subCategory) === norm(activeSub)) : inCat;

  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: cat ? `${cat.name}, SR Industries` : 'SR Industries catalogue',
    itemListElement: shown.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/products/${p.slug}`,
      name: p.name,
    })),
  };
  const crumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Catalogue', item: `${SITE_URL}/products` },
      ...(cat ? [{ '@type': 'ListItem', position: 3, name: cat.name, item: `${SITE_URL}/products?category=${cat.slug}` }] : []),
    ],
  };

  return (
    <>
      <JsonLd data={listLd} />
      <JsonLd data={crumbsLd} />
      <header className="page-head">
        <div className="container">
          <ol className="crumbs">
            <li><Link href="/">Home</Link></li>
            <li>{cat ? <Link href="/products">Catalogue</Link> : 'Catalogue'}</li>
            {cat && <li>{cat.name}</li>}
          </ol>
          <div className="page-head-grid">
            <h1>{cat ? (cat.id === 'knobs' ? 'Gas stove knobs' : `Gas stove ${cat.name.toLowerCase()}`) : 'The catalogue'}</h1>
            <p className="lead">
              {cat
                ? CATEGORY_COPY[cat.slug].description.split('. ')[0] + '.'
                : `${PRODUCTS.length} parts with model codes and prices per piece. Minimum order 3,000 pieces a model.`}
            </p>
          </div>
          <div className="btn-row" style={{ marginTop: 24 }}>
            <a href={PRICE_LIST_PDF} download className="btn btn--secondary">
              <Download aria-hidden /> Download the price list (PDF)
            </a>
          </div>
        </div>
      </header>

      <div className="filters">
        <div className="container">
          <nav className="cat-tabs" aria-label="Categories">
            <Link href="/products" aria-current={!cat ? 'true' : undefined}>
              All <span className="count">{PRODUCTS.length}</span>
            </Link>
            {CATEGORIES.map((c) => (
              <Link key={c.id} href={`/products?category=${c.slug}`} aria-current={cat?.id === c.id ? 'true' : undefined} scroll={false}>
                {c.name} <span className="count">{PRODUCTS.filter((p) => p.category === c.id).length}</span>
              </Link>
            ))}
          </nav>
          {cat?.subCategories && (
            <nav className="chips" aria-label={`${cat.name} types`}>
              <Link className="chip" href={`/products?category=${cat.slug}`} aria-pressed={!activeSub} scroll={false} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
                All {cat.name.toLowerCase()}
              </Link>
              {cat.subCategories.map((s) => (
                <Link
                  key={s}
                  className="chip"
                  href={`/products?category=${cat.slug}&sub=${encodeURIComponent(s.toLowerCase())}`}
                  aria-pressed={activeSub === s}
                  scroll={false}
                  style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
                >
                  {s}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <CatalogueGrid products={shown} />
        </div>
      </section>
    </>
  );
}
