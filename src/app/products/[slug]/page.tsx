import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { CATEGORY_LABEL, SITE_URL, cutout, getProduct, lowestPrice, priceSummary } from '@/lib/catalog';
import { ProductDetail } from '@/components/ProductDetail';
import { ProductCard } from '@/components/ProductCard';
import { JsonLd } from '@/components/JsonLd';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const price = priceSummary(p);
  const description = `${p.name} (${p.modelNumber}) for LPG gas stoves. ${p.description}${price ? ` ${price} per piece.` : ''}${p.minOrderQty ? ` MOQ ${p.minOrderQty.toLocaleString('en-IN')} pcs.` : ''} Made by SR Industries, Faridabad.`;
  // short, whole-sentence text for link previews
  const share = `${p.name} (${p.modelNumber}) for LPG gas stoves.${price ? ` ${price} per piece.` : ''}${p.minOrderQty ? ` Minimum order ${p.minOrderQty.toLocaleString('en-IN')} pieces.` : ''} Made by SR Industries, Faridabad.`;
  return {
    title: `${p.name} ${p.modelNumber}${price ? `, ${price}/pc` : ''}`,
    description: description.slice(0, 300),
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      type: 'website',
      title: `${p.name} | SR Industries`,
      description: share,
      url: `/products/${p.slug}`,
      images: [{ url: `/og/products/${p.slug}.jpg`, width: 1200, height: 630, alt: `${p.name} ${p.modelNumber} by SR Industries` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} | SR Industries`,
      description: share,
      images: [`/og/products/${p.slug}.jpg`],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8);
  const url = `${SITE_URL}/products/${product.slug}`;
  const offers = (product.colorVariants ?? []).filter((v) => v.price !== undefined);
  const low = lowestPrice(product);

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.modelNumber,
    mpn: product.modelNumber,
    description: product.description,
    category: `Gas stove parts > ${CATEGORY_LABEL[product.category]}`,
    image: Array.from(new Set([product.image, ...(product.colorVariants ?? []).map((v) => v.image)])).slice(0, 6).map((i) => `${SITE_URL}${i}`),
    brand: { '@type': 'Brand', name: 'SR Industries' },
    manufacturer: { '@id': `${SITE_URL}/#org` },
    material: product.specs.material,
    url,
    ...(low !== undefined && {
      offers:
        offers.length > 1
          ? {
              '@type': 'AggregateOffer',
              priceCurrency: 'INR',
              lowPrice: Math.min(...offers.map((o) => o.price!)).toFixed(2),
              highPrice: Math.max(...offers.map((o) => o.price!)).toFixed(2),
              offerCount: offers.length,
              availability: 'https://schema.org/InStock',
              seller: { '@id': `${SITE_URL}/#org` },
            }
          : {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: (product.price ?? low).toFixed(2),
              availability: 'https://schema.org/InStock',
              url,
              seller: { '@id': `${SITE_URL}/#org` },
              ...(product.minOrderQty && {
                eligibleQuantity: { '@type': 'QuantitativeValue', minValue: product.minOrderQty, unitCode: 'C62' },
              }),
            },
    }),
  };
  const crumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Catalogue', item: `${SITE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: CATEGORY_LABEL[product.category], item: `${SITE_URL}/products?category=${product.category}` },
      { '@type': 'ListItem', position: 4, name: product.name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd data={crumbsLd} />
      <ProductDetail product={product} cutoutSrc={cutout(product.image)} />
      {related.length > 0 && (
        <section className="section band" aria-labelledby="related">
          <div className="container">
            <div className="head">
              <h2 id="related" style={{ fontSize: 'var(--text-2xl)' }}>More {CATEGORY_LABEL[product.category].toLowerCase()}</h2>
              <p className="lead">
                <Link className="link" href={`/products?category=${product.category}`}>See all {CATEGORY_LABEL[product.category].toLowerCase()}</Link>
              </p>
            </div>
            <div className="rail" tabIndex={0} aria-label="Related parts, scroll sideways">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} sizes="290px" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
