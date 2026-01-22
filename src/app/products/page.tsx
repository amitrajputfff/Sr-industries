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

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
    setIsMobileFilterOpen(false);
  };

  const handleSubCategoryChange = (sub: string) => {
    setSelectedSubCategory(sub);
    router.push(`/products?category=${selectedCategory}&sub=${sub}`);
    setIsMobileFilterOpen(false);
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-zinc-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center space-x-2 text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-900">Products Catalog</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-bold tracking-tighter mb-4 font-space-grotesk text-zinc-900">
            {currentCategoryData?.name} <span className="text-zinc-400">Series</span>
          </h1>
          <p className="text-sm md:text-lg text-zinc-500 max-w-2xl leading-relaxed">
            Strict adherence to industrial standards for the {currentCategoryData?.name.toLowerCase()} classification (Catalogue 2024–25).
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex gap-3 mb-6">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-grow flex items-center justify-center space-x-2 bg-zinc-900 text-white py-4 rounded-2xl font-bold text-sm"
          >
            <Filter size={18} />
            <span>FILTER PRODUCTS</span>
          </button>
          <div className="relative w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Model #"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl text-xs font-bold outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 space-y-10">
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
                <div className="grid grid-cols-1 gap-2">
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

            {/* Search (Desktop) */}
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
            <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8">
              <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest mr-2">Showing:</span>
              <div className="px-3 py-1 bg-zinc-200 rounded-lg text-[8px] md:text-[10px] font-bold text-zinc-700 uppercase">
                {selectedCategory.replace('-', ' ')}
              </div>
              {selectedSubCategory !== 'all' && (
                <div className="px-3 py-1 bg-red-100 rounded-lg text-[8px] md:text-[10px] font-bold text-red-700 uppercase">
                  {selectedSubCategory}
                </div>
              )}
              <span className="ml-auto text-[10px] md:text-xs font-bold text-zinc-400">
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
                  className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-24 md:py-32 text-center bg-white rounded-[2rem] border border-dashed border-zinc-200 mx-auto"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="text-zinc-200" size={24} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-2 font-space-grotesk">No components found</h3>
                  <p className="text-zinc-500 max-w-[240px] md:max-w-xs mx-auto text-xs md:text-sm">
                    Try adjusting your series selection or search by model number.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedSubCategory('all'); }}
                    className="mt-8 text-[10px] md:text-xs font-bold text-zinc-900 border-b-2 border-zinc-900 hover:text-zinc-600 hover:border-zinc-600 transition-all uppercase tracking-widest"
                  >
                    RESET FILTERS
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white z-[70] rounded-t-[2.5rem] max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold font-space-grotesk">Catalog Filters</h2>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-10">
                  {/* Categories */}
                  <div>
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Product Category</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.slug)}
                          className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                            selectedCategory === cat.slug
                              ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200'
                              : 'bg-zinc-50 text-zinc-600'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subcategories */}
                  {currentCategoryData?.subCategories && (
                    <div>
                      <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Series / Models</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleSubCategoryChange('all')}
                          className={`text-center px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                            selectedSubCategory === 'all'
                              ? 'bg-zinc-100 border-zinc-200 text-zinc-900'
                              : 'bg-zinc-50 border-transparent text-zinc-500'
                          }`}
                        >
                          All Models
                        </button>
                        {currentCategoryData.subCategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => handleSubCategoryChange(sub)}
                            className={`text-center px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                              selectedSubCategory === sub
                                ? 'bg-zinc-100 border-zinc-200 text-zinc-900'
                                : 'bg-zinc-50 border-transparent text-zinc-500'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold mt-12 mb-4"
                >
                  SHOW {filteredProducts.length} RESULTS
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
