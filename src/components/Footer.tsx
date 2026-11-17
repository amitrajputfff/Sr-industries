import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, CONTACT_DATA } from '@/lib/data';
import { PHONE_HREF, PRICE_LIST_PDF, WHATSAPP_HREF, FOUNDED } from '@/lib/catalog';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-statement">Send us the model code. We’ll send the bulk price.</p>
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <Image src="/logo-mark.png" alt="SR Industries logo" width={18} height={34} />
              <strong>SR Industries</strong>
            </div>
            <address>{CONTACT_DATA.address}</address>
          </div>
          <div>
            <h2>Catalogue</h2>
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link href={`/products?category=${c.slug}`}>{c.name}</Link>
                </li>
              ))}
              <li>
                <a href={PRICE_LIST_PDF} download>Price list (PDF)</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">All products</Link></li>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2>Talk to the factory</h2>
            <ul>
              <li><a href={PHONE_HREF}>{CONTACT_DATA.phone}</a></li>
              <li><a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href={`mailto:${CONTACT_DATA.email}`}>{CONTACT_DATA.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} SR Industries, Faridabad. Making gas stove parts since {FOUNDED}.</span>
          <span>Prices are per piece and vary with quantity.</span>
        </div>
        <p className="footer-ghost" aria-hidden>SR Industries</p>
      </div>
    </footer>
  );
}
