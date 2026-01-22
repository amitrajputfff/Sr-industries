'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Factory, Award, Settings, CheckCircle2 } from 'lucide-react';

const VALUES = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Quality Manufacturing',
    description: 'Every component undergoes rigorous testing to meet strict safety and durability standards.',
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: 'Precision Driven',
    description: 'Engineered with absolute precision using high-grade ABS, Nylon, and Zinc Alloy materials.',
  },
  {
    icon: <Factory className="w-6 h-6" />,
    title: 'Industrial Focus',
    description: 'Based in Faridabad’s industrial hub, specialized in large-scale LPG component supply.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Since 2013',
    description: 'Over a decade of manufacturing expertise and long-term industry partnerships.',
  },
];

const TIMELINE = [
  { year: '2013', event: 'SR Industries established in Ballabhgarh, Faridabad.' },
  { year: '2016', event: 'Expanded manufacturing capacity to 100,000 units per month.' },
  { year: '2019', event: 'Introduction of the high-end Hob Series and Metal Knob collection.' },
  { year: '2022', event: 'Modernized facility with automated injection molding machinery.' },
  { year: '2024', event: 'Launched the 2024-25 Technical Catalogue with 50+ new models.' },
];

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-4xl mb-16 md:mb-24 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-zinc-100 text-zinc-900 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
          >
            <span>Our Manufacturing Story</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 font-space-grotesk text-zinc-900 leading-tight"
          >
            LPG Stove Parts <span className="text-zinc-400">Specialists</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-600 leading-relaxed max-w-3xl font-medium"
          >
            SR Industries is a premier Faridabad-based manufacturer dedicated to the production of high-precision LPG stove components.
          </motion.p>
        </div>

        {/* Core Strength Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-base md:text-lg text-zinc-600 leading-relaxed order-2 lg:order-1"
          >
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 font-space-grotesk">Founded on Precision</h2>
              <p>
                Established in 2013, SR Industries began with a commitment to address the industry's need for high-durability LPG components. Located in the Saroorpur Industrial Area of Ballabhgarh, we have scaled our operations to serve leading domestic and industrial stove brands across the country.
              </p>
              <p>
                Our core focus lies in the specialized manufacturing of Knobs, Dial Plates, Stove Legs, and Safety Components. We don't just produce parts; we engineer reliability into every component that enters an LPG stove system.
              </p>
            </div>
            
            <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 shadow-sm">
              <h4 className="font-bold text-zinc-900 mb-4 flex items-center">
                <ShieldCheck className="text-red-600 mr-2" size={20} />
                Industrial Standard 2024-25
              </h4>
              <p className="text-sm font-medium">
                Our latest catalogue features updated designs for the Royal and Hob series, optimized for modern aesthetic trends while maintaining strict technical specifications for shaft size and weight.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square md:aspect-[4/5] bg-zinc-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col justify-end p-8 md:p-12 order-1 lg:order-2 shadow-2xl"
          >
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center" />
            <div className="relative z-10">
              <span className="text-5xl md:text-7xl font-bold text-white font-space-grotesk block mb-4">10+</span>
              <span className="text-lg md:text-xl font-bold text-white/80 uppercase tracking-widest">Years of Manufacturing Excellence</span>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="mb-24 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter font-space-grotesk text-zinc-900">Our Milestones</h2>
            <p className="text-zinc-500 mt-4 font-medium">A decade of industrial growth and excellence.</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {TIMELINE.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 pb-12 last:pb-0 relative group"
              >
                {index !== TIMELINE.length - 1 && (
                  <div className="absolute left-[27px] top-[40px] bottom-0 w-0.5 bg-zinc-100 group-hover:bg-red-100 transition-colors" />
                )}
                <div className="w-14 h-14 shrink-0 bg-white border-2 border-zinc-100 rounded-2xl flex items-center justify-center font-bold text-zinc-900 group-hover:border-red-600 transition-colors z-10 shadow-sm">
                  {item.year.slice(2)}
                </div>
                <div className="pt-3">
                  <h4 className="text-xl font-bold text-zinc-900 mb-2 font-space-grotesk">{item.year}</h4>
                  <p className="text-zinc-500 font-medium leading-relaxed">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-zinc-50 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 border border-zinc-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 font-space-grotesk text-zinc-900">Industrial Values</h2>
              <p className="text-zinc-600 font-medium">Our operations are rooted in engineering integrity and long-term reliability.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {VALUES.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-zinc-200/50 shadow-sm hover:shadow-xl hover:shadow-zinc-200 transition-all group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-zinc-200 transition-transform group-hover:scale-110">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-zinc-900 font-space-grotesk">{value.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Regional Presence */}
        <div className="mt-24 md:mt-32 text-center max-w-2xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-6 font-space-grotesk">Regional Presence</h3>
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8 font-medium">
            Headquartered in Faridabad, Haryana, we are strategically positioned to supply the major industrial hubs across India, ensuring reliable lead times for bulk requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
