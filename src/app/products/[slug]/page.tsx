'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/lib/data';
import { ArrowLeft, Phone, ShieldCheck, Box, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-12">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-zinc-900 transition-colors">Catalog</Link>
          <ChevronRight size={12} />
          <Link href={`/products?category=${product.category}`} className="hover:text-zinc-900 transition-colors">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight size={12} />
          <span className="text-zinc-900">{product.modelNumber}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="sticky top-32"
          >
            <div className="relative aspect-square bg-zinc-50 rounded-[3rem] overflow-hidden border border-zinc-100 flex items-center justify-center p-12 lg:p-20 group">
              <Box size={120} className="text-zinc-200 group-hover:scale-110 transition-transform duration-700 ease-out" />
              <div className="absolute top-8 left-8">
                <span className="px-4 py-1.5 bg-zinc-900 text-white text-[10px] font-bold rounded-full tracking-[0.2em] uppercase">
                  SR INDUSTRIAL
                </span>
              </div>
              {/* 
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-12 transition-transform duration-700 group-hover:scale-110"
                priority
              /> 
              */}
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100/50 to-transparent pointer-events-none" />
            </div>

            {/* Color Variations (if any) */}
            {product.colors && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Available Colors:</span>
                <div className="flex gap-2">
                  {product.colors.map((color, idx) => (
                    <div 
                      key={idx} 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-md" 
                      style={{ backgroundColor: color }} 
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Technical Specifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">
                  {product.subCategory || product.category}
                </span>
                <div className="h-px flex-1 bg-zinc-100" />
                <span className="text-zinc-400 text-xs font-mono">{product.modelNumber}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 mb-6 font-space-grotesk leading-none">
                {product.name}
              </h1>
              <p className="text-lg text-zinc-500 leading-relaxed mb-8 max-w-xl">
                {product.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-lg text-[10px] font-bold text-zinc-600 border border-zinc-100 uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-red-500" />
                  Industrial Grade
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-lg text-[10px] font-bold text-zinc-600 border border-zinc-100 uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-red-500" />
                  2024-25 Series
                </div>
              </div>
            </div>

            {/* Technical Table */}
            <div className="bg-zinc-50 rounded-3xl border border-zinc-100 overflow-hidden mb-12">
              <div className="px-8 py-4 bg-zinc-100 border-b border-zinc-200">
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Technical Specifications</h3>
              </div>
              <div className="p-2">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      value && (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-transparent' : 'bg-white/50'}>
                          <td className="px-6 py-4 font-bold text-zinc-400 uppercase tracking-tighter text-[10px] w-1/3">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </td>
                          <td className="px-6 py-4 font-bold text-zinc-900">
                            {value}
                          </td>
                        </tr>
                      )
                    ))}
                    <tr>
                      <td className="px-6 py-4 font-bold text-zinc-400 uppercase tracking-tighter text-[10px]">
                        Manufacturing
                      </td>
                      <td className="px-6 py-4 font-bold text-zinc-900">
                        SR Industries (India)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href={`https://wa.me/919873741552?text=Hi SR Industries, I am interested in ${product.name} (Model: ${product.modelNumber}). Please share bulk pricing.`}
                target="_blank"
                className="flex items-center justify-center space-x-3 bg-zinc-900 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200"
              >
                <Phone size={20} fill="white" />
                <span>Enquire Now</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center bg-white text-zinc-900 border border-zinc-200 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-zinc-50 transition-all"
              >
                Bulk Quotation
              </Link>
            </div>
            
            <p className="mt-8 text-[11px] text-zinc-400 text-center uppercase tracking-widest font-medium">
              * Dimensions and weights are subject to standard manufacturing tolerances.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
