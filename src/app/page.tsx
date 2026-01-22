'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Settings, Phone, Award, CheckCircle2, MessageSquare } from 'lucide-react';
import { CATEGORIES, PRODUCTS, BRAND_ASSETS } from '@/lib/data';

const FEATURES = [
  {
    icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Precision Engineering',
    description: 'Specialized manufacturing of LPG stove components with tight tolerances since 2013.',
  },
  {
    icon: <Settings className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Modern Facility',
    description: 'Equipped with high-precision machinery at our Ballabhgarh manufacturing unit.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Quality Certified',
    description: 'Rigorous testing protocols for every batch to ensure safety and durability.',
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Bulk Supply',
    description: 'Reliable supply chain partner for major domestic LPG stove brands across India.',
  },
];

export default function Home() {
  const featuredKnobs = PRODUCTS.filter(p => p.category === 'knobs').slice(0, 6);

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 border border-red-100 mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span>LPG Stove Parts Manufacturer Since 2013</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-900 mb-6 font-space-grotesk leading-[1] md:leading-[0.9]">
                Precision LPG <span className="text-zinc-400">Gas Stove</span> Components
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                SR Industries is a premier manufacturer of high-quality LPG components based in Faridabad, delivering excellence through precision engineering.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="w-full sm:w-auto min-h-[56px] px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center group shadow-2xl shadow-zinc-200"
                >
                  View Catalog
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto min-h-[56px] px-8 py-4 bg-zinc-50 text-zinc-900 border border-zinc-200 rounded-2xl font-bold text-lg hover:bg-zinc-100 transition-all flex items-center justify-center"
                >
                  Contact Factory
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square lg:aspect-[4/3] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 to-transparent rounded-full blur-3xl opacity-50" />
              <div className="relative w-full h-full bg-zinc-50 border border-zinc-100 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden">
                <Image 
                  src={BRAND_ASSETS.heroImage} 
                  alt="SR Industries Product Range" 
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 md:bottom-12 md:-right-12 bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl border border-zinc-100 hidden sm:block">
                <div className="text-3xl md:text-5xl font-bold text-zinc-900 font-space-grotesk leading-none">12+</div>
                <div className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest mt-2">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Features */}
      <section className="py-16 md:py-24 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 md:p-10 bg-white rounded-3xl border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/50 transition-all flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-zinc-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 font-space-grotesk">{feature.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Knob Series Showcase - Horizontal Scroll */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="text-[10px] font-bold text-red-600 uppercase tracking-[0.2em] mb-4">The Collection</div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 font-space-grotesk leading-tight">
                Knob Series Showcase
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl font-medium">Discover our premium range: Royal, Hob, Sleek, and more.</p>
            </div>
            <Link href="/products?category=knobs" className="hidden md:flex items-center text-zinc-900 font-bold hover:underline underline-offset-8">
              View All Knobs <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {featuredKnobs.map((product) => (
              <motion.div
                key={product.id}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] snap-center md:snap-start"
              >
                <Link href={`/products/${product.slug}`} className="group block h-full bg-zinc-50 rounded-[2rem] border border-zinc-100 overflow-hidden transition-all hover:bg-white hover:shadow-2xl hover:shadow-zinc-200">
                  <div className="aspect-[4/3] bg-zinc-100 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/90 backdrop-blur text-[10px] font-bold text-red-600 px-4 py-1.5 rounded-full uppercase tracking-widest z-10 shadow-sm">
                      {product.subCategory}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{product.modelNumber}</div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-4 group-hover:text-red-600 transition-colors font-space-grotesk">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {product.colors?.map((color, i) => (
                          <div key={i} className="w-5 h-5 rounded-full border border-zinc-200 shadow-sm" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-zinc-100">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <Link href="/products?category=knobs" className="md:hidden flex items-center justify-center w-full py-5 bg-zinc-100 rounded-2xl text-zinc-900 font-bold mt-4">
            View All Knobs <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Other Product Categories Grid */}
      <section className="py-20 md:py-32 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="text-[10px] font-bold text-red-600 uppercase tracking-[0.2em] mb-4">Diversified Range</div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 font-space-grotesk leading-tight">
              Essential Components
            </h2>
            <p className="text-zinc-600 text-lg md:text-xl font-medium">
              We manufacture a comprehensive range of critical LPG stove parts with industrial precision and grade-A materials.
            </p>
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:grid md:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.filter(c => c.id !== 'knobs').map((category, index) => (
              <motion.div
                key={category.id}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-full snap-center md:snap-start"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={`/products?category=${category.slug}`}
                  className="group block relative aspect-square overflow-hidden rounded-[2rem] bg-white border border-zinc-100 p-8 md:p-10 flex flex-col justify-between hover:bg-zinc-900 transition-all duration-500 shadow-sm"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-zinc-50 group-hover:bg-zinc-800 flex items-center justify-center transition-colors shadow-sm">
                    <ArrowRight className="text-zinc-400 group-hover:text-white group-hover:rotate-[-45deg] transition-all" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 group-hover:text-white mb-3 transition-colors font-space-grotesk leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors line-clamp-2 font-medium">
                      {category.subCategories?.join(' • ')}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Strength */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-zinc-900 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-20 lg:p-24 flex flex-col justify-center order-2 lg:order-1">
                <div className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] mb-6">Our Legacy</div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-10 font-space-grotesk leading-tight">
                  Faridabad's Trusted LPG Parts Partner
                </h2>
                <div className="space-y-10">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 shrink-0 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/20">
                      <ShieldCheck className="text-white" size={28} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl mb-2 font-space-grotesk">Since 2013</h4>
                      <p className="text-zinc-400 leading-relaxed font-medium">Over a decade of consistent delivery and quality improvement in the LPG industry.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 shrink-0 bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-700">
                      <Settings className="text-white" size={28} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl mb-2 font-space-grotesk">Industrial Excellence</h4>
                      <p className="text-zinc-400 leading-relaxed font-medium">Our facility in Saroorpur Industrial Area is optimized for high-volume manufacturing.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-14">
                  <Link href="/about" className="min-h-[56px] px-8 py-4 bg-white text-zinc-900 rounded-2xl font-bold text-lg hover:bg-zinc-100 transition-all inline-flex items-center group">
                    Learn More <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-auto min-h-[400px] bg-zinc-800 flex items-center justify-center overflow-hidden order-1 lg:order-2">
                <Image 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                  alt="Manufacturing Unit"
                  fill
                  className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="relative z-10 text-center px-12">
                  <div className="text-[12rem] md:text-[18rem] font-bold text-white/5 font-space-grotesk select-none">SR</div>
                  <div className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">Industrial Prowess</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-transparent lg:block hidden" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-zinc-100 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase mb-8">
              <MessageSquare size={14} />
              <span>Bulk Orders</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 font-space-grotesk leading-tight">
              Ready for Bulk <span className="text-zinc-400">Enquiry?</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Partner with SR Industries for reliable, high-quality LPG components. We handle custom specifications and large-scale bulk requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link
                href="https://wa.me/919873741552"
                target="_blank"
                className="w-full sm:w-auto min-h-[64px] px-10 py-5 bg-zinc-900 text-white rounded-[2rem] font-bold text-xl hover:bg-zinc-800 transition-all flex items-center justify-center shadow-2xl shadow-zinc-200"
              >
                <MessageSquare size={24} className="mr-3" fill="white" />
                WhatsApp Inquiry
              </Link>
              <Link
                href="tel:+919873741552"
                className="w-full sm:w-auto min-h-[64px] px-10 py-5 bg-white text-zinc-900 border border-zinc-200 rounded-[2rem] font-bold text-xl hover:bg-zinc-50 transition-all flex items-center justify-center"
              >
                <Phone size={24} className="mr-3" />
                Call Directly
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

