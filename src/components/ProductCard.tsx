import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/data';
import { ArrowRight, Box } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-zinc-50 border-b border-zinc-100 flex items-center justify-center p-8">
          <Box size={48} className="text-zinc-200 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-bold bg-zinc-900 text-white px-2 py-1 rounded tracking-widest uppercase">
              {product.modelNumber}
            </span>
          </div>
          {/* 
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          /> 
          */}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                {product.subCategory || product.category}
              </p>
              <h3 className="text-lg font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                {product.name}
              </h3>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {product.specs.shaftSize && (
              <div className="text-[11px] text-zinc-500">
                <span className="font-bold text-zinc-400 block uppercase tracking-tighter">Shaft</span>
                {product.specs.shaftSize}
              </div>
            )}
            {product.specs.diameter && (
              <div className="text-[11px] text-zinc-500">
                <span className="font-bold text-zinc-400 block uppercase tracking-tighter">Dia</span>
                {product.specs.diameter}
              </div>
            )}
             {product.specs.height && (
              <div className="text-[11px] text-zinc-500">
                <span className="font-bold text-zinc-400 block uppercase tracking-tighter">Height</span>
                {product.specs.height}
              </div>
            )}
             {product.specs.material && (
              <div className="text-[11px] text-zinc-500">
                <span className="font-bold text-zinc-400 block uppercase tracking-tighter">Material</span>
                {product.specs.material}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-50">
            <div className="flex gap-1">
              {product.colors?.map((color, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full border border-zinc-200" style={{ backgroundColor: color }} />
              ))}
            </div>
            <div className="flex items-center text-xs font-bold text-zinc-900 group-hover:text-red-600 transition-all">
              <span>VIEW CATALOG</span>
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
