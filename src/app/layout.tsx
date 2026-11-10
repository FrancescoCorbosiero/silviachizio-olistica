import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontVariables } from './fonts';
import { AppProvider } from '@/components/app/AppProvider';
import SmoothScroll from '@/components/motion/SmoothScroll';
import JsonLd from '@/components/seo/JsonLd';
import { siteGraph } from '@/lib/seo';
import { OWNER_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: OWNER_NAME }],
  creator: OWNER_NAME,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: { type: 'website', locale: 'it_IT', siteName: SITE_NAME },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined },
};

export const viewport: Viewport = {
  themeColor: '#fdf6f8',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={fontVariables} data-scroll-behavior="smooth">
      <body className="k-ios min-h-dvh">
        <a
          href="#contenuto"
          className="sr-only z-[60] rounded-full bg-inchiostro px-4 py-2 text-latte focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          Salta al contenuto
        </a>
        {/* Header, piè di pagina e barra in basso stanno nei layout dei gruppi:
            (sito) per le pagine del sito, (campagne) per il link in bio. */}
        <AppProvider>{children}</AppProvider>
        <SmoothScroll />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
