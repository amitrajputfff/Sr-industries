'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/lib/data';
import { ArrowLeft, Phone, ShieldCheck, Box, ChevronRight, MessageCircle } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Initialize selected color with the first variant or default to 0
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  
  // Get the current image based on selected color
  const currentImage = product.colorVariants 
    ? product.colorVariants[selectedColorIndex]?.image || product.image
    : product.image;
  
  const currentColorName = product.colorVariants
    ? product.colorVariants[selectedColorIndex]?.name
    : undefined;

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
                src={currentImage}
                alt={`${product.name}${currentColorName ? ` - ${currentColorName}` : ''}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={100}
                unoptimized
                className="object-contain p-6 md:p-12 transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute top-4 left-4 md:top-8 md:left-8">
                <span className="px-3 md:px-4 py-1 md:py-1.5 bg-zinc-900 text-white text-[8px] md:text-[10px] font-bold rounded-full tracking-[0.2em] uppercase shadow-lg">
                  SR INDUSTRIAL
                </span>
              </div>
            </div>

            {/* Color Variations */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <div className="mt-8">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 text-center">
                  Available Colors {currentColorName && `- ${currentColorName}`}
                </div>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {product.colorVariants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`relative min-w-[44px] min-h-[44px] w-12 h-12 md:w-14 md:h-14 rounded-full border-4 ${
                        selectedColorIndex === idx
                          ? 'border-zinc-900 shadow-2xl scale-110'
                          : 'border-white shadow-xl'
                      } ring-1 ring-zinc-100 cursor-pointer hover:scale-110 transition-all duration-200`}
                      style={{ backgroundColor: variant.color }}
                      title={variant.name}
                      aria-label={`Select ${variant.name} color`}
                    >
                      {selectedColorIndex === idx && (
                        <div className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-zinc-900" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Fallback for old colors format */}
            {!product.colorVariants && product.colors && (
              <div className="mt-8">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 text-center">Available Colors</div>
                <div className="flex flex-wrap justify-center gap-4">
                  {product.colors.map((color, idx) => (
                    <div 
                      key={idx} 
                      className="w-12 h-12 rounded-full border-4 border-white shadow-xl ring-1 ring-zinc-100" 
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
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-5 leading-tight">
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
                      <span className="text-sm font-semibold text-zinc-900">
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
                className="group relative flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-5 rounded-2xl font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <MessageCircle size={22} className="relative z-10 transition-transform duration-300 group-hover:scale-110" fill="white" />
                <span className="relative z-10">Enquire on WhatsApp</span>
              </Link>
              <Link
                href="tel:+919873741552"
                className="group relative flex items-center justify-center gap-3 bg-white text-zinc-900 border-2 border-zinc-200 px-8 py-5 rounded-2xl font-semibold text-base overflow-hidden transition-all duration-300 hover:border-zinc-900 hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Phone size={22} className="relative z-10 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Call Factory Directly</span>
              </Link>
            </div>
            
            <p className="mt-8 text-[9px] md:text-[11px] text-zinc-400 text-center lg:text-left uppercase tracking-widest font-medium">
              * Dimensions and weights are subject to standard manufacturing tolerances.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky Mobile CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-zinc-100 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="flex gap-3">
          <Link
            href="tel:+919873741552"
            className="flex items-center justify-center w-14 h-14 bg-zinc-100 text-zinc-900 rounded-2xl hover:bg-zinc-200 active:scale-95 transition-all"
          >
            <Phone size={24} />
          </Link>
          <Link
            href={`https://wa.me/919873741552?text=Hi SR Industries, I am interested in ${product.name} (Model: ${product.modelNumber}). Please share bulk pricing.`}
            target="_blank"
            className="flex-grow flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl font-bold text-sm active:scale-[0.98] transition-all"
          >
            <MessageCircle size={20} fill="white" />
            <span>ENQUIRE ON WHATSAPP</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
