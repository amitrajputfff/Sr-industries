'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { BRAND_ASSETS, CATEGORIES, PRODUCTS } from '@/lib/data';
import { PHONE_HREF, WHATSAPP_HREF } from '@/lib/catalog';

const LINKS = [
  { name: 'Catalogue', href: '/products' },
  { name: 'Knobs', href: '/products?category=knobs' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close on navigation and on Escape; release the scroll lock every time
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const isCurrent = (href: string) =>
    href === '/products' ? pathname.startsWith('/products') : pathname === href.split('?')[0] && !href.includes('?');

  return (
    <>
      <div className="nav-wrap">
        <div className="container">
          <nav className="nav" aria-label="Main">
            <Link href="/" className="brand" aria-label="SR Industries, home">
              <Image src={"/logo-mark.png"} alt="" width={18} height={34} priority />
              <span>SR Industries</span>
            </Link>
            <ul className="nav-links">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={isCurrent(l.href) ? 'page' : undefined}>
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <a href={PHONE_HREF} className="btn btn--secondary nav-icon nav-call" aria-label="Call the factory">
                <Phone aria-hidden />
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn btn--primary" aria-label="Enquire on WhatsApp">
                <MessageCircle aria-hidden />
                <span className="nav-cta-text">Enquire</span>
              </a>
              <button
                type="button"
                className="btn btn--secondary nav-icon nav-menu-btn"
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((o) => !o)}
              >
                {open ? <X aria-hidden /> : <Menu aria-hidden />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div id="site-menu" className="sheet" data-open={open} aria-hidden={!open} inert={!open}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li>
            <Link href="/products">
              Catalogue <small>{PRODUCTS.length} parts</small>
            </Link>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link href={`/products?category=${c.slug}`}>
                {c.name} <small>{PRODUCTS.filter((p) => p.category === c.id).length}</small>
              </Link>
            </li>
          ))}
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="btn-row">
          <a href={PHONE_HREF} className="btn btn--secondary"><Phone aria-hidden /> Call</a>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn btn--wa"><MessageCircle aria-hidden /> WhatsApp</a>
        </div>
      </div>
    </>
  );
}
