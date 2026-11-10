import type { ReactNode } from 'react';

/** Le pagine del sito. Header, menu, piè di pagina e barra in basso arrivano al passo 3. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <main id="contenuto">{children}</main>;
}
