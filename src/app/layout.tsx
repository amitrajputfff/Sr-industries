import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SR Industries | Precision LPG Gas Stove Components",
  description: "SR Industries is a leading manufacturer of high-quality LPG gas stove parts, burners, knobs, and mixing tubes. Trusted quality and industrial precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-zinc-900">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D5GGHTWYG1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D5GGHTWYG1');
          `}
        </Script>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
