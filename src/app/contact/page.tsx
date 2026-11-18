import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_DATA } from '@/lib/data';
import { PHONE_HREF, WHATSAPP_HREF } from '@/lib/catalog';
import { EnquiryForm } from '@/components/EnquiryForm';

export const metadata: Metadata = {
  title: 'Contact SR Industries, Faridabad',
  description:
    'Call, WhatsApp or email SR Industries for bulk prices on gas stove knobs, dial plates, legs and safety parts. Factory in Saroorpur Industrial Area, Ballabhgarh, Faridabad.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact SR Industries | Faridabad', url: '/contact', images: ['/og/home.jpg'] },
};

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT_DATA.address)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <ol className="crumbs">
            <li><Link href="/">Home</Link></li>
            <li>Contact</li>
          </ol>
          <div className="page-head-grid">
            <h1>Talk to the factory</h1>
            <p className="lead">Send the model codes and quantities. We reply with the bulk price.</p>
          </div>
        </div>
      </header>

      <section className="section--tight">
        <div className="container">
          <div className="contact-grid">
            <dl className="contact-list">
              <div>
                <dt>Phone</dt>
                <dd><a className="bignum" href={PHONE_HREF}>{CONTACT_DATA.phone}</a></dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd><a className="link" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><a className="link" href={`mailto:${CONTACT_DATA.email}`}>{CONTACT_DATA.email}</a></dd>
              </div>
              <div>
                <dt>Factory</dt>
                <dd><address>{CONTACT_DATA.address}</address></dd>
              </div>
            </dl>
            <EnquiryForm />
          </div>
          <div className="map">
            <iframe
              src={MAP_SRC}
              title="Map of the SR Industries factory in Saroorpur Industrial Area, Ballabhgarh"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
