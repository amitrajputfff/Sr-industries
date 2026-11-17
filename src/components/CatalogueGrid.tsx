'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { Product } from '@/lib/data';
import { ProductCard } from './ProductCard';

export function CatalogueGrid({ products }: { products: Product[] }) {
  const [q, setQ] = useState('');
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return products;
    return products.filter((p) =>
      [p.name, p.modelNumber, p.subCategory ?? '', ...(p.colorVariants ?? []).flatMap((v) => [v.name, v.modelNumber ?? ''])]
        .join(' ')
        .toLowerCase()
        .includes(t),
    );
  }, [q, products]);

  return (
    <>
      <div className="filter-row result-line">
        <span>
          {shown.length} {shown.length === 1 ? 'part' : 'parts'}
          {q && <> matching “{q}”</>}
        </span>
        <label className="search">
          <span className="visually-hidden">Search by name or model code</span>
          <Search aria-hidden />
          <input type="search" name="q" placeholder="Search name or code" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
        </label>
      </div>
      {shown.length ? (
        <div className="grid-products">
          {shown.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2 style={{ fontSize: 'var(--text-2xl)' }}>No part matches “{q}”</h2>
          <p>Try a model code such as HB-CP or DP-GT, or clear the search.</p>
          <button type="button" className="btn btn--secondary" style={{ marginTop: 20 }} onClick={() => setQ('')}>
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
