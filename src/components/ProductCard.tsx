import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

function getPriceDisplay(product: Product): { label: string; moq?: number } | null {
  const moq = product.minOrderQty;

  // Explicit price range (e.g. "Contact for Price" products)
  if (product.priceRange) {
    const { min, max } = product.priceRange;
    const label = `₹${min} – ₹${max} / pc`;
    return { label, moq };
  }

  // Price from color variants
  if (product.colorVariants?.some(v => v.price !== undefined)) {
    const prices = product.colorVariants!
      .map(v => v.price)
      .filter((p): p is number => p !== undefined);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const label =
      min === max
        ? `₹${min.toFixed(2)} / pc`
        : `₹${min.toFixed(2)} – ₹${max.toFixed(2)} / pc`;
    return { label, moq };
  }

  // Single base price on product
  if (product.price !== undefined) {
    return { label: `₹${product.price.toFixed(2)} / pc`, moq };
  }

  return null;
}

export function ProductCard({ product }: ProductCardProps) {
  const colors = product.colorVariants
    ? product.colorVariants.map(v => v.color)
    : product.colors;

  const priceInfo = getPriceDisplay(product);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white border border-zinc-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
    >
      <Link href={`/products/${product.slug}`} className="flex flex-col h-full">
        <div className="relative aspect-square overflow-hidden border-b border-zinc-100 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={100}
            unoptimized
            className="p-3 md:p-6 transition-transform duration-500 group-hover:scale-110 opacity-100 object-cover"
          />
          <div className="absolute top-2 left-2 md:top-4 md:left-4">
            <span className="text-[8px] md:text-[10px] font-bold bg-zinc-900 text-white px-2 py-0.5 md:py-1 rounded tracking-widest uppercase shadow-lg">
              {product.modelNumber}
            </span>
          </div>
        </div>
        <div className="p-3 md:p-6 flex flex-col flex-grow">
          <div className="mb-2 md:mb-4">
            <p className="text-[8px] md:text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">
              {product.subCategory || product.category}
            </p>
            <h3 className="text-sm md:text-lg font-semibold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {product.specs.shaftSize && (
              <div className="text-[9px] md:text-[11px] text-zinc-500">
                <span className="font-bold text-zinc-400 block uppercase tracking-tighter scale-90 origin-left">Shaft</span>
                {product.specs.shaftSize}
              </div>
            )}
            {product.specs.diameter && (
              <div className="text-[9px] md:text-[11px] text-zinc-500">
                <span className="font-bold text-zinc-400 block uppercase tracking-tighter scale-90 origin-left">Dia</span>
                {product.specs.diameter}
              </div>
            )}
          </div>

          {/* Bottom section — always pinned to the bottom of the card */}
          <div className="mt-auto pt-3 md:pt-4 border-t border-zinc-50">
            {/* Color dots row — only shown when there are colors */}
            {colors && colors.length > 0 && (
              <div className="flex gap-1 md:gap-1.5 mb-2">
                {colors.slice(0, 3).map((color, i) => (
                  <div key={i} className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-zinc-200 shadow-sm" style={{ backgroundColor: color }} />
                ))}
                {colors.length > 3 && (
                  <div className="text-[9px] md:text-[10px] font-bold text-zinc-400 self-center">+{colors.length - 3}</div>
                )}
              </div>
            )}

            {/* Price + Details row */}
            <div className="flex items-end justify-between gap-2">
              {priceInfo ? (
                <div>
                  <div className="text-sm md:text-base font-bold text-zinc-900 leading-tight">{priceInfo.label}</div>
                  <div className="flex flex-wrap items-center gap-x-1.5 mt-0.5">
                    {priceInfo.moq && (
                      <span className="text-[8px] md:text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">
                        MOQ: {priceInfo.moq.toLocaleString()} pcs
                      </span>
                    )}
                    <span className="text-[8px] md:text-[9px] text-zinc-400 uppercase tracking-wider">
                      · Price varies by qty
                    </span>
                  </div>
                </div>
              ) : (
                <div />
              )}
              <div className="flex items-center shrink-0 text-[10px] md:text-xs font-semibold text-zinc-900 group-hover:text-red-600 transition-all uppercase tracking-wider">
                <span className="hidden sm:inline">Details</span>
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
