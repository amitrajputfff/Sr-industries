'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown, MessageSquare } from 'lucide-react';
import { BRAND_ASSETS, CATEGORIES } from '@/lib/data';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { 
    name: 'Products', 
    href: '/products',
  },
  {
    name: 'Knobs',
    href: '/products?category=knobs',
    submenu: CATEGORIES.find(c => c.id === 'knobs')?.subCategories?.map(sub => ({
      name: sub,
      href: `/products?category=knobs&sub=${sub.replace(' Series', '').toLowerCase()}`
    }))
  },
  {
    name: 'Other Products',
    href: '/products',
    submenu: CATEGORIES.filter(c => c.id !== 'knobs').map(cat => ({
      name: cat.name,
      href: `/products?category=${cat.slug}`
    }))
  },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image 
                src={BRAND_ASSETS.logoSquare} 
                alt="SR Industries Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tighter text-zinc-900 leading-none">
                SR INDUSTRIES
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                LPG Stove Parts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => link.submenu && setActiveSubmenu(link.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={link.href}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1 hover:text-red-600 ${
                    pathname === link.href ? 'text-red-600' : 'text-zinc-700'
                  }`}
                >
                  {link.name}
                  {link.submenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                </Link>
                
                {link.submenu && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="bg-white border border-zinc-100 rounded-2xl shadow-2xl p-6 min-w-[240px]">
                      <div className="grid gap-4">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="text-xs font-bold text-zinc-500 hover:text-red-600 transition-colors uppercase tracking-wider"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3">
              <Link
                href="tel:+919873741552"
                className="flex items-center justify-center w-10 h-10 bg-zinc-100 text-zinc-900 rounded-full hover:bg-zinc-200 transition-colors"
                title="Call Us"
              >
                <Phone size={18} />
              </Link>
              <Link
                href="https://wa.me/919873741552"
                target="_blank"
                className="flex items-center space-x-2 bg-zinc-900 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 group"
              >
                <MessageSquare size={16} className="group-hover:scale-110 transition-transform" fill="currentColor" />
                <span>ENQUIRE NOW</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <Link
              href="tel:+919873741552"
              className="flex items-center justify-center w-10 h-10 bg-zinc-900 text-white rounded-full"
            >
              <Phone size={18} />
            </Link>
            <button
              className="text-zinc-900 w-10 h-10 flex items-center justify-center bg-zinc-100 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                  <div className="relative w-12 h-12">
                    <Image src={BRAND_ASSETS.logoSquare} alt="Logo" fill className="object-contain" />
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center bg-zinc-100 rounded-full text-zinc-900"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col space-y-2">
                  {NAV_LINKS.map((link) => (
                    <div key={link.name} className="flex flex-col">
                      <div className="flex items-center justify-between py-4 border-b border-zinc-50">
                        <Link
                          href={link.href}
                          className={`text-2xl font-bold tracking-tighter ${
                            pathname === link.href ? 'text-zinc-900' : 'text-zinc-400'
                          }`}
                          onClick={() => !link.submenu && setIsOpen(false)}
                        >
                          {link.name}
                        </Link>
                        {link.submenu && (
                          <button 
                            onClick={() => setActiveSubmenu(activeSubmenu === link.name ? null : link.name)}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                              activeSubmenu === link.name ? 'bg-zinc-900 text-white' : 'bg-zinc-50 text-zinc-400'
                            }`}
                          >
                            <ChevronDown size={20} className={activeSubmenu === link.name ? 'rotate-180 transition-transform' : 'transition-transform'} />
                          </button>
                        )}
                      </div>
                      
                      {link.submenu && activeSubmenu === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="pl-4 py-4 grid gap-4 border-b border-zinc-50"
                        >
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="text-lg font-bold text-zinc-500 uppercase tracking-widest"
                              onClick={() => setIsOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-12 space-y-4">
                  <Link
                    href="https://wa.me/919873741552"
                    target="_blank"
                    className="flex items-center justify-center space-x-3 bg-zinc-900 text-white w-full py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-zinc-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageSquare size={20} fill="white" />
                    <span>WhatsApp Inquiry</span>
                  </Link>
                  <Link
                    href="tel:+919873741552"
                    className="flex items-center justify-center space-x-3 bg-zinc-100 text-zinc-900 w-full py-5 rounded-2xl text-lg font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone size={20} />
                    <span>Call Us Directly</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

