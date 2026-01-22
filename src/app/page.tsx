'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Award, Settings, Phone } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

const FEATURES = [
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Quality Manufacturing',
    description: 'Every component undergoes rigorous quality checks to ensure industrial-grade precision.',
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: 'Industry Experience',
    description: 'Years of expertise in manufacturing LPG stove parts for leading domestic brands.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Reliable Supply',
    description: 'Optimized supply chain to ensure consistent and timely delivery for bulk orders.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Precision Components',
    description: 'Engineered with tight tolerances to ensure perfect fit and maximum safety.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-zinc-50">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/50 via-transparent to-zinc-100/50" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-6 font-space-grotesk">
                Precision LPG Gas Stove <span className="text-zinc-400 italic">Components</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-600 mb-10 max-w-2xl mx-auto">
                Trusted manufacturing by SR Industries. Delivering high-quality, durable parts for the LPG industry.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center group"
                >
                  View Products
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-xl font-bold text-lg hover:bg-zinc-50 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract animated background elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-zinc-200/40 rounded-full blur-3xl -z-10"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-80 h-80 bg-zinc-300/30 rounded-full blur-3xl -z-10"
        />
      </section>

      {/* Why SR Industries */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 font-space-grotesk">
              Why SR Industries?
            </h2>
            <div className="w-20 h-1.5 bg-zinc-900 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 bg-zinc-50 rounded-2xl border border-zinc-100 transition-all"
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

      {/* Product Categories Preview */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 font-space-grotesk">
                Product Categories
              </h2>
              <p className="text-zinc-600">Explore our wide range of precision-engineered components.</p>
            </div>
            <Link 
              href="/products" 
              className="text-zinc-900 font-bold flex items-center hover:gap-2 transition-all"
            >
              View All Products <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={`/products?category=${category.slug}`}
                  className="group block relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-medium group-hover:scale-110 transition-transform duration-500">
                    {/* Placeholder for category image */}
                    {category.name}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                    <span className="text-sm text-zinc-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 inline-block">
                      View Category
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing / Trust Section */}
      <section className="py-24 bg-white border-y border-zinc-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 font-space-grotesk">
                Excellence in Industrial Manufacturing
              </h2>
              <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                SR Industries has been at the forefront of LPG stove component manufacturing for years. Our facility is equipped with precision machinery and a dedicated quality control team ensuring that every part that leaves our factory meets the highest industry standards.
              </p>
              <div className="space-y-4">
                {['Advanced Machinery', 'Strict Quality Control', 'Bulk Manufacturing Capability', 'Fast Turnaround Times'].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center">
                      <ShieldCheck size={12} className="text-white" />
                    </div>
                    <span className="font-medium text-zinc-800">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video bg-zinc-100 rounded-3xl overflow-hidden flex items-center justify-center"
            >
              <div className="text-zinc-300 font-bold text-2xl uppercase tracking-widest">Manufacturing Unit</div>
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/10 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-space-grotesk">
                Looking for reliable LPG components?
              </h2>
              <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
                Get in touch with us for bulk orders, custom requirements, or to request a quote.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 rounded-xl font-bold text-lg hover:bg-zinc-100 transition-all flex items-center justify-center"
                >
                  <Phone size={20} className="mr-2" />
                  Chat on WhatsApp
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 border border-zinc-700 text-white rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all"
                >
                  Contact Form
                </Link>
              </div>
            </div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
