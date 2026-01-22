'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Settings, Phone, Award, CheckCircle2 } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/lib/data';

const LOGO_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d8b609a8-e1e8-4f43-a882-a3eb0e843247/Screenshot-2026-01-22-at-9.48.19-PM-1769098705509.png?width=8000&height=8000&resize=contain";

const FEATURES = [
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Precision Engineering',
    description: 'Specialized manufacturing of LPG stove components with tight tolerances since 2013.',
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: 'Modern Facility',
    description: 'Equipped with high-precision machinery at our Ballabhgarh manufacturing unit.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Quality Certified',
    description: 'Rigorous testing protocols for every batch to ensure safety and durability.',
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: 'Bulk Supply',
    description: 'Reliable supply chain partner for major domestic LPG stove brands across India.',
  },
];

export default function Home() {
  const featuredKnobs = PRODUCTS.filter(p => p.category === 'knobs').slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-red-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span>LPG Stove Parts Manufacturer Since 2013</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-6 font-space-grotesk leading-[0.9]">
                Precision LPG <span className="text-zinc-400">Gas Stove</span> Components
              </h1>
              <p className="text-xl text-zinc-600 mb-10 max-w-xl leading-relaxed">
                SR Industries is a premier manufacturer of high-quality LPG components based in Faridabad, delivering excellence through precision engineering.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center group"
                >
                  View Product Catalog
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-xl font-bold text-lg hover:bg-zinc-50 transition-all"
                >
                  Contact Factory
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 to-transparent rounded-full blur-3xl opacity-50" />
              <div className="relative w-full max-w-md aspect-square bg-white border border-zinc-100 rounded-[3rem] shadow-2xl overflow-hidden flex items-center justify-center p-12">
                <Image 
                  src={LOGO_URL} 
                  alt="SR Industries Logo" 
                  width={400} 
                  height={400} 
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Features */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white rounded-2xl border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all"
              >
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Knob Series Showcase - Horizontal Scroll */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 font-space-grotesk">
                Knob Series Showcase
              </h2>
              <p className="text-zinc-500">Discover our premium range of control knobs: Royal, Hob, Sleek, and more.</p>
            </div>
            <Link href="/products?category=knobs" className="hidden md:flex items-center text-zinc-900 font-bold hover:underline">
              View All Knobs <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {featuredKnobs.map((product) => (
              <motion.div
                key={product.id}
                className="min-w-[300px] md:min-w-[400px] snap-start"
                whileHover={{ y: -5 }}
              >
                <Link href={`/products/${product.slug}`} className="group block h-full bg-zinc-50 rounded-3xl border border-zinc-100 overflow-hidden">
                  <div className="aspect-[4/3] bg-zinc-200 flex items-center justify-center text-zinc-400 relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[10px] font-bold text-red-600 px-3 py-1 rounded-full uppercase tracking-widest z-10">
                      {product.subCategory}
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-zinc-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-zinc-500 mb-4 line-clamp-1">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-400">{product.modelNumber}</span>
                      <div className="flex gap-1">
                        {product.colors?.map((color, i) => (
                          <div key={i} className="w-4 h-4 rounded-full border border-zinc-200" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Product Categories Grid */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 font-space-grotesk">
              Component Categories
            </h2>
            <p className="text-zinc-600 text-lg">
              Beyond knobs, we manufacture a comprehensive range of essential LPG components with industrial precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.filter(c => c.id !== 'knobs').map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={`/products?category=${category.slug}`}
                  className="group block relative aspect-square overflow-hidden rounded-3xl bg-white border border-zinc-100 p-8 flex flex-col justify-between hover:bg-zinc-900 transition-colors duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 group-hover:bg-zinc-800 flex items-center justify-center transition-colors">
                    <ArrowRight className="text-zinc-400 group-hover:text-white group-hover:rotate-[-45deg] transition-all" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-white mb-2 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      {category.subCategories?.join(', ')}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Strength */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-zinc-900 rounded-[3rem] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-20 flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-8 font-space-grotesk">
                  Faridabad's Trusted Manufacturing Partner
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 shrink-0 bg-red-600 rounded-2xl flex items-center justify-center">
                      <ShieldCheck className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl mb-2">Since 2013</h4>
                      <p className="text-zinc-400 leading-relaxed">Over a decade of consistent delivery and quality improvement in the LPG industry.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 shrink-0 bg-zinc-800 rounded-2xl flex items-center justify-center">
                      <Settings className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl mb-2">Industrial Excellence</h4>
                      <p className="text-zinc-400 leading-relaxed">Our facility in Saroorpur Industrial Area is optimized for precision manufacturing at scale.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <Link href="/about" className="text-white font-bold inline-flex items-center group">
                    Our Manufacturing Story <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-auto bg-zinc-800 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                <div className="relative z-10 text-center px-12">
                  <span className="text-[10rem] font-bold text-white/5 font-space-grotesk absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">SR</span>
                  <div className="text-white/40 text-sm font-mono tracking-[0.3em] uppercase">Manufacturing Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 font-space-grotesk">
              Ready for Bulk Enquiry?
            </h2>
            <p className="text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              Partner with SR Industries for reliable, high-quality LPG components. We handle custom specifications and bulk requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="https://wa.me/919873741552"
                target="_blank"
                className="w-full sm:w-auto px-10 py-5 bg-zinc-900 text-white rounded-2xl font-bold text-xl hover:bg-zinc-800 transition-all flex items-center justify-center shadow-2xl shadow-zinc-200"
              >
                <Phone size={24} className="mr-3" fill="white" />
                Chat on WhatsApp
              </Link>
              <Link
                href="tel:+919873741552"
                className="w-full sm:w-auto px-10 py-5 bg-white text-zinc-900 border border-zinc-200 rounded-2xl font-bold text-xl hover:bg-zinc-50 transition-all flex items-center justify-center"
              >
                Call +91 9873741552
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
