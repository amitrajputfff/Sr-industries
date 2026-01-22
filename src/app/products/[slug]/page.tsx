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
    <div className="pt-24 md:pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumbs - Scrollable on mobile */}
        <div className="flex items-center space-x-2 text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8 md:mb-12 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/products" className="hover:text-zinc-900 transition-colors">Catalog</Link>
          <ChevronRight size={10} />
          <Link href={`/products?category=${product.category}`} className="hover:text-zinc-900 transition-colors">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight size={10} />
          <span className="text-zinc-900">{product.modelNumber}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:sticky lg:top-32"
          >
            <div className="relative aspect-square bg-zinc-50 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-zinc-100 flex items-center justify-center group shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover p-6 md:p-12 transition-transform duration-700 group-hover:scale-105 opacity-95"
                priority
              />
              <div className="absolute top-4 left-4 md:top-8 md:left-8">
                <span className="px-3 md:px-4 py-1 md:py-1.5 bg-zinc-900 text-white text-[8px] md:text-[10px] font-bold rounded-full tracking-[0.2em] uppercase shadow-lg">
                  SR INDUSTRIAL
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100/30 to-transparent pointer-events-none" />
            </div>

            {/* Color Variations */}
            {product.colors && (
              <div className="mt-8">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 text-center">Available Colors</div>
                <div className="flex flex-wrap justify-center gap-4">
                  {product.colors.map((color, idx) => (
                    <div 
                      key={idx} 
                      className="w-12 h-12 rounded-full border-4 border-white shadow-xl ring-1 ring-zinc-100 cursor-pointer hover:scale-110 transition-transform" 
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <div className="mb-10 text-center lg:text-left">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-red-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                  {product.subCategory || product.category}
                </span>
                <div className="h-px flex-1 bg-zinc-100 hidden lg:block" />
                <span className="text-zinc-400 text-[10px] md:text-xs font-mono">{product.modelNumber}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 mb-6 font-space-grotesk leading-none">
                {product.name}
              </h1>
              <p className="text-base md:text-lg text-zinc-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {product.description}
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-xl text-[10px] font-bold text-zinc-600 border border-zinc-100 uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-red-500" />
                  Industrial Grade
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-xl text-[10px] font-bold text-zinc-600 border border-zinc-100 uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-red-500" />
                  2024-25 Series
                </div>
              </div>
            </div>

            {/* Technical Stacked List (Mobile Friendly) */}
            <div className="mb-12">
              <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6 flex items-center lg:justify-start justify-center">
                <Box size={14} className="mr-2" /> Technical Specifications
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  value && (
                    <div key={key} className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-bold text-zinc-900">
                        {value}
                      </span>
                    </div>
                  )
                ))}
                <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Manufacturing</span>
                  <span className="text-sm font-bold text-zinc-900">SR Industries</span>
                </div>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <Link
                href={`https://wa.me/919873741552?text=Hi SR Industries, I am interested in ${product.name} (Model: ${product.modelNumber}). Please share bulk pricing.`}
                target="_blank"
                className="flex items-center justify-center space-x-3 bg-zinc-900 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200"
              >
                <Phone size={20} fill="white" />
                <span>Enquire on WhatsApp</span>
              </Link>
              <Link
                href="tel:+919873741552"
                className="flex items-center justify-center bg-white text-zinc-900 border border-zinc-200 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-zinc-50 transition-all"
              >
                Call Factory Directly
              </Link>
            </div>
            
            <p className="mt-8 text-[9px] md:text-[11px] text-zinc-400 text-center lg:text-left uppercase tracking-widest font-medium">
              * Dimensions and weights are subject to standard manufacturing tolerances.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky Mobile CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-zinc-100 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
          <Link
            href="tel:+919873741552"
            className="flex items-center justify-center w-14 h-14 bg-zinc-100 text-zinc-900 rounded-2xl"
          >
            <Phone size={24} />
          </Link>
          <Link
            href={`https://wa.me/919873741552?text=Hi SR Industries, I am interested in ${product.name} (Model: ${product.modelNumber}). Please share bulk pricing.`}
            target="_blank"
            className="flex-grow flex items-center justify-center space-x-3 bg-zinc-900 text-white py-4 rounded-2xl font-bold text-sm"
          >
            <Phone size={20} fill="white" />
            <span>ENQUIRE ON WHATSAPP</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
