'use client';

import { useState } from 'react';
import { TONO_TEMA, type SchedaArticolo, type Tema } from '@/lib/blog-temi';
import CardArticolo from './CardArticolo';

/**
 * L'indice del blog (da andrea-bellettati, BlogIndex): i temi come
 * bottoni, la griglia si filtra senza ricaricare. Senza script si vedono
 * tutti gli articoli.
 */
export default function IndiceBlog({ articoli, temi }: { articoli: SchedaArticolo[]; temi: readonly Tema[] }) {
  const [tema, setTema] = useState<Tema | null>(null);
  const mostrati = tema ? articoli.filter((a) => a.tema === tema) : articoli;

  const bottone = (valore: Tema | null, etichetta: string) => (
    <button
      key={etichetta}
      type="button"
      aria-pressed={tema === valore}
      onClick={() => setTema(valore)}
      className={`chip-tema ${valore ? '' : 'chip-tutti'}`}
      style={valore ? ({ '--tono': TONO_TEMA[valore] } as React.CSSProperties) : undefined}
    >
      {etichetta}
    </button>
  );

  return (
    <div>
      <div role="group" aria-label="Temi" className="flex flex-wrap gap-2">
        {bottone(null, 'Tutti')}
        {temi.map((t) => bottone(t, t))}
      </div>
      <p className="sr-only" aria-live="polite">
        {mostrati.length} articoli
      </p>
      <ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {mostrati.map((a) => (
          <li key={a.slug}>
            <CardArticolo articolo={a} livello="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
