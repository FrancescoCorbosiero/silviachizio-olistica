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
  openGraph: { type: 'website', locale: 'it_IT', siteName: SITE_NAME, images: [{ url: '/og/home.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  appleWebApp: { capable: true, title: 'Lily', statusBarStyle: 'default' },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined },
};

export const viewport: Viewport = {
  themeColor: '#f2e4dd',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

/* Prima del primo fotogramma: segna che JavaScript c'è (`js`) e, se il
   movimento è permesso, accende `motion`: la hero si allunga e la finestra
   parte chiusa (globals.css); la apre il motore. Se il motore non arriva
   entro 8 s, `motion` si spegne e la hero torna ferma, aperta e completa. */
const AVVIO = `(function(){var d=document.documentElement;d.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!window.__lilyMotion)d.classList.remove('motion')},8000)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={fontVariables} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: AVVIO }} />
      </head>
      <body className="k-ios min-h-dvh">
        <a
          href="#contenuto"
          className="sr-only z-[60] rounded-full bg-inchiostro px-4 py-2 text-latte focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          Salta al contenuto
        </a>
        {/* Testata, piè di pagina e barra in basso stanno nel layout del gruppo (sito). */}
        <AppProvider>{children}</AppProvider>
        <SmoothScroll />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
