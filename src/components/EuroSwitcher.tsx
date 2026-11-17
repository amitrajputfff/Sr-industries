'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/data';
import { productAlt, whatsappLink } from '@/lib/catalog';

export function EuroSwitcher({ product }: { product: Product }) {
  const variants = product.colorVariants ?? [];
  const [i, setI] = useState(0);
  const v = variants[i];
  if (!v) return null;

  return (
    <div className="switcher">
      <figure style={{ margin: 0 }}>
        <div className="studio studio--photo">
          <Image
            key={v.image}
            src={v.image}
            alt={productAlt(product, v.name)}
            fill
            sizes="(max-width: 960px) 100vw, 860px"
          />
        </div>
      </figure>
      <div className="switch-side">
        <div className="switch-now" aria-live="polite">
          <span className="code">{v.modelNumber ?? product.modelNumber}</span>
          <p className="name">{v.name}</p>
          {v.price !== undefined && (
            <p className="muted" style={{ marginTop: 'var(--space-xs)' }}>
              ₹{v.price.toFixed(2)} a piece, minimum {product.minOrderQty?.toLocaleString('en-IN')} pieces
            </p>
          )}
        </div>
        <div className="finishes" role="group" aria-label="Euro series finishes">
          {variants.map((x, idx) => (
            <button key={x.name} type="button" className="finish" aria-pressed={idx === i} onClick={() => setI(idx)} aria-label={x.name} title={x.name}>
              <i style={{ background: x.color }} aria-hidden />
            </button>
          ))}
        </div>
        <div className="btn-row">
          <a
            className="btn btn--primary"
            href={whatsappLink(`Hi SR Industries, I'd like bulk pricing for ${product.name}, ${v.name} (${v.modelNumber}).`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask for this finish
          </a>
          <Link className="btn btn--secondary" href={`/products/${product.slug}`}>
            Full specs
          </Link>
        </div>
      </div>
    </div>
  );
}
