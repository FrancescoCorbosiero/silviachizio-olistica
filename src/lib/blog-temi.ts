/* I temi e la scheda di un articolo, senza dipendenze dal disco: si
   possono usare anche nei componenti client (il filtro del blog). Il
   contenuto vero sta in src/content/blog e lo legge src/lib/blog.ts. */
import type { NomeImmagine } from './immagini';

/** I temi del blog, nell'ordine in cui compaiono: le passioni di Silvia e quello che fa a Lily. */
export const TEMI = ['Poesia e libri', 'Arrampicata', 'Fotografia', 'Trattamenti', 'Letture'] as const;
export type Tema = (typeof TEMI)[number];

/** Ogni tema ha il suo punto di colore: nel blog si riconoscono a colpo d'occhio. */
export const TONO_TEMA: Record<Tema, string> = {
  'Poesia e libri': 'var(--color-petalo)',
  Arrampicata: 'var(--color-foglia)',
  Fotografia: 'var(--color-candela)',
  Trattamenti: 'var(--color-lily)',
  Letture: 'var(--color-lily-bright)',
};

/** Quello che serve per la card e per il filtro (serializzabile, va al client). */
export type SchedaArticolo = {
  slug: string;
  titolo: string;
  estratto: string;
  tema: Tema;
  copertina: NomeImmagine;
  /** «12 ottobre 2026» */
  quando: string;
  minuti: number;
  /** Articolo di prova: compare solo in anteprima, col segno «Esempio». */
  esempio: boolean;
};
