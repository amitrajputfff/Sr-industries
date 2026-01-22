import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <span className="text-xl font-bold tracking-tighter text-white">
                SR <span className="text-zinc-500">INDUSTRIES</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Premium LPG gas stove components manufacturing. Precision, quality, and reliability in every part we create.
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
                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product Range</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/products?category=burners" className="hover:text-white transition-colors">Brass Burners</Link>
              </li>
              <li>
                <Link href="/products?category=knobs" className="hover:text-white transition-colors">Control Knobs</Link>
              </li>
              <li>
                <Link href="/products?category=mixing-tubes" className="hover:text-white transition-colors">Mixing Tubes</Link>
              </li>
              <li>
                <Link href="/products?category=pan-supports" className="hover:text-white transition-colors">Pan Supports</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-zinc-500 shrink-0" />
                <span>Industrial Area, Phase II, New Delhi, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-zinc-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-zinc-500 shrink-0" />
                <span>info@srindustries.com</span>
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
