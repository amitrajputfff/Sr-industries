'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/lib/data';
import { ArrowLeft, Phone, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <Link 
          href="/products" 
          className="inline-flex items-center text-zinc-600 hover:text-zinc-900 mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-100 flex items-center justify-center"
          >
            <div className="text-zinc-300 font-bold text-3xl uppercase tracking-widest text-center px-8">
              {product.name}
            </div>
            {/* 
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            /> 
            */}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6 font-space-grotesk">
                {product.name}
              </h1>
              <p className="text-lg text-zinc-600 leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-zinc-900 mb-6 font-space-grotesk">Key Specifications</h3>
              <div className="grid grid-cols-1 gap-4">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex items-start space-x-3 group">
                    <CheckCircle2 size={20} className="text-zinc-900 shrink-0 mt-0.5" />
                    <span className="text-zinc-700 font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Link
                href={`https://wa.me/91XXXXXXXXXX?text=Hi, I am interested in ${product.name}`}
                target="_blank"
                className="flex-1 flex items-center justify-center space-x-2 bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all"
              >
                <Phone size={20} />
                <span>Enquire on WhatsApp</span>
              </Link>
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center bg-white text-zinc-900 border border-zinc-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-50 transition-all"
              >
                Bulk Inquiry
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
