import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

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
        <div className="relative aspect-square overflow-hidden bg-zinc-50">
          {/* Placeholder for actual image */}
          <div className="absolute inset-0 flex items-center justify-center text-zinc-300 font-medium">
            {product.name}
          </div>
          {/* 
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          /> 
          */}
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-zinc-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
            {product.description}
          </p>
          <div className="flex items-center text-sm font-semibold text-zinc-900 group-hover:gap-2 transition-all">
            <span>View Details</span>
            <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
