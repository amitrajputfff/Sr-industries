'use client';

import Link from 'next/link';
import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { Search, X, ChevronRight, Filter } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialCategory = searchParams.get('category') || 'knobs';
  const initialSubCategory = searchParams.get('sub') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState(initialSubCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const category = searchParams.get('category');
    const sub = searchParams.get('sub');
    if (category) setSelectedCategory(category);
    if (sub) setSelectedSubCategory(sub);
  }, [searchParams]);

  const currentCategoryData = useMemo(() => 
    CATEGORIES.find(c => c.slug === selectedCategory),
    [selectedCategory]
  );

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = product.category === selectedCategory;
      const matchesSubCategory = selectedSubCategory === 'all' || product.subCategory === selectedSubCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.modelNumber.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSubCategory && matchesSearch;
    });
  }, [selectedCategory, selectedSubCategory, searchQuery]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedSubCategory('all');
    router.push(`/products?category=${slug}`);
  };

  const handleSubCategoryChange = (sub: string) => {
    setSelectedSubCategory(sub);
    router.push(`/products?category=${selectedCategory}&sub=${sub}`);
  };

  return (
    <div className="pt-32 pb-24 bg-zinc-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-900">Products Catalog</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-space-grotesk text-zinc-900">
            {currentCategoryData?.name} <span className="text-zinc-400">Series</span>
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed">
            Strict adherence to industrial standards for the {currentCategoryData?.name.toLowerCase()} classification (Catalogue 2024–25).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-10">
            {/* Main Categories */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                <Filter size={14} className="mr-2" /> Main Categories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${
                      selectedCategory === cat.slug
                        ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200'
                        : 'bg-white text-zinc-600 hover:bg-zinc-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight size={14} className={`${selectedCategory === cat.slug ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Sub Categories / Series */}
            {currentCategoryData?.subCategories && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={selectedCategory}
              >
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6">
                  {selectedCategory === 'knobs' ? 'Series Selection' : 'Types / Models'}
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  <button
                    onClick={() => handleSubCategoryChange('all')}
                    className={`text-left px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedSubCategory === 'all'
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-900'
                        : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    All {currentCategoryData.name}
                  </button>
                  {currentCategoryData.subCategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleSubCategoryChange(sub)}
                      className={`text-left px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        selectedSubCategory === sub
                          ? 'bg-zinc-100 border-zinc-200 text-zinc-900'
                          : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Search */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6">Quick Search</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <input
                  type="text"
                  placeholder="Search by model #..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-zinc-900 transition-all outline-none shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Active Filters Display */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mr-2">Showing:</span>
              <div className="px-3 py-1 bg-zinc-200 rounded-lg text-[10px] font-bold text-zinc-700 uppercase">
                {selectedCategory.replace('-', ' ')}
              </div>
              {selectedSubCategory !== 'all' && (
                <div className="px-3 py-1 bg-red-100 rounded-lg text-[10px] font-bold text-red-700 uppercase">
                  {selectedSubCategory}
                </div>
              )}
              <span className="ml-auto text-xs font-bold text-zinc-400">
                {filteredProducts.length} Results
              </span>
            </div>

            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div 
                  key={selectedCategory + selectedSubCategory + searchQuery}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-32 text-center bg-white rounded-[2rem] border border-dashed border-zinc-200"
                >
                  <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="text-zinc-200" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">No components matching criteria</h3>
                  <p className="text-zinc-500 max-w-xs mx-auto text-sm">
                    Try adjusting your series selection or search by model number.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedSubCategory('all'); }}
                    className="mt-8 text-xs font-bold text-zinc-900 border-b-2 border-zinc-900 hover:text-zinc-600 hover:border-zinc-600 transition-all"
                  >
                    RESET FILTERS
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center font-bold tracking-widest text-zinc-400">LOADING CATALOGUE...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
