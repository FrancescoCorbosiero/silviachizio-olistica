import type { ReactNode } from 'react';
import MobileDock from '@/components/layout/MobileDock';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';

/** Le pagine del sito: la testata, il piè di pagina e, sul telefono, la barra in basso. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="contenuto">{children}</main>
      <SiteFooter />
      <MobileDock />
    </>
  );
}
