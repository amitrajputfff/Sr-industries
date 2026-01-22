'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Factory } from 'lucide-react';

const VALUES = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Quality First',
    description: 'We never compromise on the quality of our materials or manufacturing processes.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Precision Driven',
    description: 'Our components are engineered with absolute precision to ensure safety and reliability.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Customer Focused',
    description: 'We build long-term relationships with our clients based on trust and consistent supply.',
  },
  {
    icon: <Factory className="w-6 h-6" />,
    title: 'Industrial Scale',
    description: 'Equipped to handle high-volume manufacturing while maintaining strict quality standards.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 font-space-grotesk"
          >
            About <span className="text-zinc-400">SR Industries</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-600 leading-relaxed"
          >
            A legacy of precision manufacturing and commitment to quality in the LPG gas stove component industry.
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-zinc-600 leading-relaxed"
          >
            <p>
              SR Industries was founded with a clear vision: to provide high-quality, reliable, and precision-engineered components for the LPG gas stove industry. What started as a small manufacturing unit has grown into a trusted name known for excellence and industrial integrity.
            </p>
            <p>
              We specialize in manufacturing a wide range of components including brass burners, control knobs, mixing tubes, and pan supports. Our manufacturing processes utilize advanced technology and high-grade materials to ensure that every part meets the rigorous safety and performance standards of the industry.
            </p>
            <p>
              Our commitment to quality is matched by our dedication to our clients. We understand the importance of a reliable supply chain, and we work tirelessly to ensure that our partners receive their orders on time, every time.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square bg-zinc-100 rounded-3xl overflow-hidden flex items-center justify-center border border-zinc-200"
          >
            <div className="text-zinc-300 font-bold text-3xl uppercase tracking-widest text-center px-8">
              Manufacturing Excellence Since Day One
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/5 to-transparent" />
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="bg-zinc-900 rounded-[2.5rem] p-12 md:p-20 text-white">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 font-space-grotesk">Our Core Values</h2>
            <p className="text-zinc-400">The principles that guide everything we do at SR Industries.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-zinc-800/50 rounded-2xl border border-zinc-700/50"
              >
                <div className="w-12 h-12 bg-white text-zinc-900 rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
