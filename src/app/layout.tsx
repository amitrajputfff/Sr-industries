import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Motion } from '@/components/Motion';
import { Suspense } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { CONTACT_DATA, CATEGORIES } from '@/lib/data';
import { SITE_NAME, SITE_URL, FOUNDED } from '@/lib/catalog';

const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-geist', display: 'swap' });
const serif = Fraunces({ subsets: ['latin'], axes: ['SOFT', 'opsz'], variable: '--font-fraunces', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-geist-mono', display: 'swap' });

const DESCRIPTION =
  'SR Industries makes LPG gas stove parts in Faridabad since 2013: knobs, dial plates, stove legs, couplers, burner pins and safety components, supplied in bulk to stove makers.';

// what a shared link shows: made by scripts/og-images.mjs from the real product photos
const SHARE_DESCRIPTION =
  'Knobs, dial plates, stove legs, couplers and safety parts for LPG gas stoves, made in Faridabad since 2013. Model codes and per-piece prices online.';
const SHARE_IMAGE = {
  url: '/og/home.jpg',
  width: 1200,
  height: 630,
  alt: 'SR Industries gas stove parts: knobs, a dial plate and a stove leg',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SR Industries | Gas Stove Knobs, Dial Plates and LPG Stove Parts, Faridabad',
    template: '%s | SR Industries',
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'gas stove knob manufacturer',
    'LPG stove parts manufacturer',
    'gas stove parts Faridabad',
    'gas stove dial plate',
    'gas stove legs',
    'hob knobs',
    'burner pin',
    'gas stove coupler',
    'safety lock gas stove',
    'SR Industries',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    url: '/',
    title: 'SR Industries | Gas stove parts, made in Faridabad',
    description: SHARE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SR Industries | Gas stove parts, made in Faridabad',
    description: SHARE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  formatDetection: { telephone: true, email: true, address: true },
  category: 'manufacturing',
};

export const viewport: Viewport = {
  themeColor: '#f7f6f3',
  width: 'device-width',
  initialScale: 1,
};

const orgLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/Royal-series/royal-series-gold.png`,
      description: DESCRIPTION,
      foundingDate: FOUNDED,
      telephone: CONTACT_DATA.phone,
      email: CONTACT_DATA.email,
      priceRange: '₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot No. 9, Gali No. 11, Saroorpur Industrial Area, Ballabhgarh',
        addressLocality: 'Faridabad',
        addressRegion: 'Haryana',
        postalCode: '121004',
        addressCountry: 'IN',
      },
      areaServed: { '@type': 'Country', name: 'India' },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: CONTACT_DATA.phone,
          contactType: 'sales',
          areaServed: 'IN',
          availableLanguage: ['en', 'hi'],
        },
      ],
      makesOffer: CATEGORIES.map((c) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Product', name: `Gas stove ${c.name.toLowerCase()}` },
      })),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#org` },
      inLanguage: 'en-IN',
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* hide the page for the first frame so the entry animation starts from blank; CSS shows it after 1.6s regardless */}
        <script dangerouslySetInnerHTML={{ __html: "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-wait')" }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-D5GGHTWYG1" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D5GGHTWYG1');
          `}
        </Script>
        <JsonLd data={orgLd} />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <Motion />
        </Suspense>
      </body>
    </html>
  );
}
