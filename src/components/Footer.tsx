import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const LOGO_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d8b609a8-e1e8-4f43-a882-a3eb0e843247/Screenshot-2026-01-22-at-9.48.19-PM-1769098705509.png?width=8000&height=8000&resize=contain";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative w-12 h-12">
                <Image src={LOGO_URL} alt="SR Industries" fill className="object-contain brightness-0 invert" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">
                SR <span className="text-zinc-500">INDUSTRIES</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Faridabad-based premier manufacturer of LPG gas stove components since 2013. Precision, quality, and durability in every part.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">Products Catalog</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Our Story</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/products?category=knobs" className="hover:text-white transition-colors">Knob Series</Link>
              </li>
              <li>
                <Link href="/products?category=dial-plates" className="hover:text-white transition-colors">Dial Plates</Link>
              </li>
              <li>
                <Link href="/products?category=legs" className="hover:text-white transition-colors">Stove Legs</Link>
              </li>
              <li>
                <Link href="/products?category=auto-safety" className="hover:text-white transition-colors">Safety Components</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Registered Office</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-red-500 shrink-0" />
                <span>
                  Plot No. 9, Gali No. 11, Saroorpur Industrial Area, Ballabhgarh, Faridabad, Haryana – 121004, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-red-500 shrink-0" />
                <span>+91 9873741552</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-red-500 shrink-0" />
                <span>info@srindustries.co.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© {currentYear} SR Industries. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
