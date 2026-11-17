'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import type { Product } from '@/lib/data';
import { CATEGORY_LABEL, PHONE_HREF, cutout, isPhoto, productAlt, specLabel, whatsappLink } from '@/lib/catalog';
import { TiltViewer } from './TiltViewer';

export function ProductDetail({ product }: { product: Product; cutoutSrc?: string }) {
  const [i, setI] = useState(0);
  const v = product.colorVariants?.[i];
  const src = v?.image ?? product.image;
  const code = v?.modelNumber ?? product.modelNumber;
  const price = v?.price ?? product.price;
  const wa = whatsappLink(`Hi SR Industries, I am interested in ${product.name}${v ? `, ${v.name}` : ''} (Model: ${code}). Please share bulk pricing.`);

  return (
    <div className="pd">
      <div className="container">
        <ol className="crumbs">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Catalogue</Link></li>
          <li><Link href={`/products?category=${product.category}`}>{CATEGORY_LABEL[product.category]}</Link></li>
          <li aria-current="page">{product.modelNumber}</li>
        </ol>
        <div className="pd-grid">
          <figure className="pd-media" style={{ margin: 0 }}>
            <TiltViewer src={cutout(src)} alt={productAlt(product, v?.name)} photo={isPhoto(src)} index={i} priority sizes="(max-width: 960px) 90vw, 520px" />
          </figure>
          <div>
            <span className="code accent">{code}</span>
            <h1>{product.name}</h1>
            <p className="lead">{product.description}</p>

            {product.colorVariants && product.colorVariants.length > 0 && (
              <div className="pd-block">
                <h2>Finish{v ? `: ${v.name}` : ''}</h2>
                <div className="finish-list" role="group" aria-label="Finishes">
                  {product.colorVariants.map((x, idx) => (
                    <button key={x.name + idx} type="button" aria-pressed={idx === i} onClick={() => setI(idx)}>
                      <i style={{ background: x.color }} aria-hidden />
                      {x.modelNumber ?? x.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pd-block price-box" aria-live="polite">
              <div>
                <p className="muted small">Price per piece</p>
                {product.contactForPrice ? (
                  <p className="p" style={{ fontSize: 'var(--text-2xl)' }}>
                    {product.priceRange ? `₹${product.priceRange.min}–${product.priceRange.max}` : 'On request'}{' '}
                    <small>ask for your quantity</small>
                  </p>
                ) : price !== undefined ? (
                  <p className="p">
                    ₹{price.toFixed(2)} <small>/ pc</small>
                  </p>
                ) : (
                  <p className="p" style={{ fontSize: 'var(--text-2xl)' }}>On request</p>
                )}
                <p className="muted small" style={{ marginTop: 6 }}>Varies with quantity</p>
              </div>
              {product.minOrderQty && (
                <div className="moq">
                  <span className="muted small">Minimum order</span>
                  <strong>{product.minOrderQty.toLocaleString('en-IN')} pcs</strong>
                </div>
              )}
            </div>

            <div className="pd-block">
              <h2>Specifications</h2>
              <dl className="dl">
                {Object.entries(product.specs).map(([k, val]) =>
                  val ? (
                    <div key={k}>
                      <dt>{specLabel(k)}</dt>
                      <dd>{val}</dd>
                    </div>
                  ) : null,
                )}
                <div>
                  <dt>Model code</dt>
                  <dd className="code">{code}</dd>
                </div>
                <div>
                  <dt>Made by</dt>
                  <dd>SR Industries, Faridabad</dd>
                </div>
              </dl>
              <p className="muted small" style={{ marginTop: 12 }}>Dimensions and weights are subject to standard manufacturing tolerances.</p>
            </div>

            <div className="btn-row pd-actions">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
                <MessageCircle aria-hidden /> Enquire on WhatsApp
              </a>
              <a href={PHONE_HREF} className="btn btn--secondary">
                <Phone aria-hidden /> Call the factory
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-bar">
        <a href={PHONE_HREF} className="btn btn--secondary" aria-label="Call the factory">
          <Phone aria-hidden />
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
          <MessageCircle aria-hidden /> Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
