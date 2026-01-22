'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';

const LOGO_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d8b609a8-e1e8-4f43-a882-a3eb0e843247/Screenshot-2026-01-22-at-9.48.19-PM-1769098705509.png?width=8000&height=8000&resize=contain";

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <Image 
                src={LOGO_URL} 
                alt="SR Industries Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tighter text-zinc-900 leading-none">
                SR INDUSTRIES
              </span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">
                LPG Stove Parts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-red-600 ${
                  pathname === link.href ? 'text-red-600' : 'text-zinc-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="https://wa.me/919873741552"
              target="_blank"
              className="flex items-center space-x-2 bg-zinc-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
            >
              <Phone size={16} fill="currentColor" />
              <span>INQUIRY</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-zinc-900"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-100 overflow-hidden"
          >
            <div className="flex flex-col space-y-4 px-4 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-medium ${
                    pathname === link.href ? 'text-zinc-900' : 'text-zinc-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
                <Link
                  href="https://wa.me/919873741552"
                  target="_blank"
                  className="flex items-center justify-center space-x-2 bg-zinc-900 text-white px-4 py-3 rounded-xl text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone size={20} />
                  <span>WhatsApp Inquiry</span>
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
