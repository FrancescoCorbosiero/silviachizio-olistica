import Link from 'next/link';
import type { ReactNode } from 'react';
import { IMMAGINI, type NomeImmagine } from '@/lib/immagini';

const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;

/**
 * La testata delle pagine interne: il percorso, il titolo grande, due righe
 * e i bottoni a sinistra; a destra un arco con l'immagine della pagina, che
 * scorre più lenta. È la stessa finestra della home, chiusa: la sola curva
 * del sito. Entra con il CSS (.entra), prima del motore.
 */
export default function PageHero({
  id,
  nome,
  titolo,
  testo,
  immagine,
  esempio,
  children,
}: {
  id: string;
  /** Il nome della pagina nel percorso (Lily / …). */
  nome: string;
  titolo: ReactNode;
  testo: ReactNode;
  immagine: NomeImmagine;
  /** Il segno «Esempio» sopra l'immagine, in anteprima. */
  esempio?: ReactNode;
  children?: ReactNode;
}) {
  const img = IMMAGINI[immagine];
  return (
    <header className="testata-pagina tono-sabbia" aria-labelledby={id}>
      <div className="wrap grid items-end gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <nav aria-label="Percorso" className="meta entra flex gap-2">
            <Link href="/" className="hover:text-[var(--fg)]">
              Lily
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page" className="text-[var(--fg)]">
              {nome}
            </span>
          </nav>
          <h1 id={id} className="display mt-6 !text-[clamp(3.2rem,7vw,6.75rem)] entra" style={d(0.08)}>
            {titolo}
          </h1>
          <div className="lead mt-7 entra" style={d(0.18)}>
            {testo}
          </div>
          {children && (
            <div className="mt-9 flex flex-wrap items-center gap-3 entra" style={d(0.28)}>
              {children}
            </div>
          )}
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="arco mx-auto aspect-[3/4] w-[min(76%,340px)] max-h-[62svh] entra lg:w-full" style={d(0.2)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="plx" data-parallax="40" src={img.srcVerticale} alt={img.alt} width={900} height={1500} fetchPriority="high" decoding="async" style={img.fuoco ? { objectPosition: img.fuoco } : undefined} />
            {esempio}
          </div>
        </div>
      </div>
    </header>
  );
}
