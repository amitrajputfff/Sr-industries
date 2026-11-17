import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/data';
import { cutout, isPhoto, priceSummary, productAlt } from '@/lib/catalog';

interface ProductCardProps {
  product: Product;
  sizes?: string;
  priority?: boolean;
}

export function ProductCard({ product, sizes, priority }: ProductCardProps) {
  const colors = product.colorVariants ? product.colorVariants.map((v) => v.color) : product.colors;
  const price = priceSummary(product);
  const shown = colors?.slice(0, 5) ?? [];
  const photo = isPhoto(product.image);

  return (
    <Link href={`/products/${product.slug}`} className="pcard">
      <div className={`studio${photo ? ' studio--photo' : ''}`}>
        <Image
          src={cutout(product.image)}
          alt={productAlt(product)}
          fill
          sizes={sizes ?? '(max-width: 640px) 50vw, (max-width: 960px) 50vw, (max-width: 1200px) 33vw, 320px'}
          priority={priority}
        />
      </div>
      <div className="pcard-body">
        <div className="pcard-top">
          <span className="code">{product.modelNumber}</span>
          {product.subCategory && <span className="sub muted">{product.subCategory}</span>}
        </div>
        <h3>{product.name}</h3>
        <div className="pcard-meta">
          {price ? (
            <span className="pcard-price">
              {price} <small>/ pc</small>
            </span>
          ) : (
            <span className="muted small">Price on request</span>
          )}
          {shown.length > 1 && (
            <span className="dots" aria-label={`${colors!.length} finishes`}>
              {shown.map((c, i) => (
                <i key={i} style={{ background: c }} />
              ))}
              {colors!.length > shown.length && <span>+{colors!.length - shown.length}</span>}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
