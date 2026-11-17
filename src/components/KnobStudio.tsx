'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/data';
import { cutout, isPhoto, productAlt, whatsappLink } from '@/lib/catalog';
import { TiltViewer } from './TiltViewer';

export function KnobStudio({ knobs }: { knobs: Product[] }) {
  const [pi, setPi] = useState(0);
  const [vi, setVi] = useState(0);
  const p = knobs[pi];
  const v = p.colorVariants?.[vi];
  const src = v?.image ?? p.image;
  const code = v?.modelNumber ?? p.modelNumber;
  const price = v?.price ?? p.price;

  return (
    <div>
      <div className="series-tabs" role="group" aria-label="Knob series">
        {knobs.map((k, i) => (
          <button
            key={k.id}
            type="button"
            aria-pressed={i === pi}
            onClick={() => {
              setPi(i);
              setVi(0);
            }}
          >
            {k.name.replace(/ Knob/, '').replace(' - ', ', ')}
          </button>
        ))}
      </div>
      <div className="viewer">
        <TiltViewer src={cutout(src)} alt={productAlt(p, v?.name)} photo={isPhoto(src)} index={pi * 100 + vi} />
        <div className="viewer-info" aria-live="polite">
          <div>
            <span className="code">{code}</span>
            <p className="viewer-name">{p.name}{v ? `, ${v.name.replace(/\s*\(.*\)/, '').toLowerCase()}` : ''}</p>
          </div>
          {price !== undefined ? (
            <p className="viewer-price">
              ₹{price.toFixed(2)} <small>a piece</small>
            </p>
          ) : p.priceRange ? (
            <p className="viewer-price">
              ₹{p.priceRange.min}–{p.priceRange.max} <small>a piece</small>
            </p>
          ) : null}
          {p.colorVariants && p.colorVariants.length > 1 && (
            <div>
              <div className="finishes" role="group" aria-label="Finishes">
                {p.colorVariants.map((x, i) => (
                  <button key={x.name} type="button" className="finish" aria-pressed={i === vi} aria-label={x.name} title={x.name} onClick={() => setVi(i)}>
                    <i style={{ background: x.color }} />
                  </button>
                ))}
              </div>
              <p className="finish-name" style={{ marginTop: 10 }}>
                {p.colorVariants.length} finishes
              </p>
            </div>
          )}
          <dl className="facts">
            {p.specs.shaftSize && <div><dt>Shaft</dt><dd>{p.specs.shaftSize}</dd></div>}
            {p.specs.material && <div><dt>Material</dt><dd>{p.specs.material}</dd></div>}
            {p.minOrderQty && <div><dt>Minimum</dt><dd>{p.minOrderQty.toLocaleString('en-IN')} pcs</dd></div>}
          </dl>
          <div className="btn-row">
            <a
              className="btn btn--primary"
              href={whatsappLink(`Hi SR Industries, please share bulk pricing for ${p.name}${v ? `, ${v.name}` : ''} (${code}).`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask for a quote
            </a>
            <Link className="btn btn--secondary" href={`/products/${p.slug}`}>
              Full specs <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
