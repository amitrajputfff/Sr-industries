import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FOUNDED } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'About SR Industries, Gas Stove Parts Manufacturer in Faridabad',
  description:
    'SR Industries has made LPG gas stove parts in Saroorpur Industrial Area, Ballabhgarh, Faridabad since 2013: knobs, dial plates, stove legs and safety components for stove brands.',
  alternates: { canonical: '/about' },
};

const VALUES = [
  { title: 'Quality manufacturing', description: 'Every component is tested to meet strict safety and durability standards.' },
  { title: 'Precision driven', description: 'Made from high-grade ABS, Nylon and zinc alloy, to tight tolerances.' },
  { title: 'Industrial focus', description: 'Based in Faridabad’s industrial hub, set up for large-scale supply.' },
  { title: `Since ${FOUNDED}`, description: 'Over a decade of manufacturing and long-term industry partnerships.' },
];

const TIMELINE = [
  { year: '2013', event: 'SR Industries established in Ballabhgarh, Faridabad.' },
  { year: '2016', event: 'Expanded manufacturing capacity to 100,000 units per month.' },
  { year: '2019', event: 'Introduced the Hob Series and the Metal knob collection.' },
  { year: '2022', event: 'Modernised the facility with automated injection moulding machinery.' },
  { year: '2024', event: 'Launched the 2024–25 technical catalogue with 50+ new models.' },
];

export default function AboutPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <ol className="crumbs">
            <li><Link href="/">Home</Link></li>
            <li>About</li>
          </ol>
          <div className="page-head-grid">
            <h1>Stove parts specialists, since {FOUNDED}</h1>
            <p className="lead">A Faridabad manufacturer making high-precision components for LPG gas stoves and hobs.</p>
          </div>
        </div>
      </header>

      <section className="section--tight">
        <div className="container story">
          <figure style={{ margin: 0 }} data-reveal>
            <div className="studio studio--photo" style={{ position: 'relative' }}>
              <Image
                src="/Euro-series/BlackTop-Gold.png"
                alt="SR Industries Euro series knobs, black top with gold ring, fitted on a stainless steel gas stove"
                fill
                sizes="(max-width: 960px) 100vw, 640px"
                priority
              />
            </div>
          </figure>
          <div className="story-text" data-reveal>
            <p>
              Established in {FOUNDED}, SR Industries began with one aim: give stove makers components that last.
              From the Saroorpur Industrial Area in Ballabhgarh we supply domestic and industrial stove brands across the country.
            </p>
            <p>
              We specialise in knobs, dial plates, stove legs and safety components, and engineer reliability into every part that goes into an LPG stove.
            </p>
            <p>
              <Link href="/products" className="arrow-link">Browse the catalogue <ArrowRight aria-hidden /></Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="milestones">
        <div className="container">
          <div className="head" data-reveal>
            <h2 id="milestones">Milestones</h2>
            <p className="lead">Our growth from a single unit in Ballabhgarh.</p>
          </div>
          <ol className="rows" data-reveal>
            {TIMELINE.map((t) => (
              <li key={t.year}>
                <span className="yr">{t.year}</span>
                <p>{t.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band" aria-labelledby="values">
        <div className="container">
          <div className="head" data-reveal>
            <h2 id="values">How we work</h2>
            <p className="lead">The 2024–25 catalogue updates the Royal and Hob series while holding shaft size and weight to specification.</p>
          </div>
          <div className="values" data-reveal>
            {VALUES.map((v) => (
              <div key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="presence">
        <div className="container close">
          <div data-reveal>
            <h2 id="presence">Supplying India from Faridabad</h2>
            <p className="lead">Headquartered in Haryana, we are placed to supply India’s major industrial hubs with reliable lead times on bulk orders.</p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn--primary">Contact the factory</Link>
              <Link href="/products" className="btn btn--secondary">See the catalogue</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
