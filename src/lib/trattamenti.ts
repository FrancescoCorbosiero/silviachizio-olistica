/**
 * Il catalogo: una sola fonte per pagine, flussi, email, dati strutturati e,
 * domani, il gestionale (docs/web-app.md, tabella `trattamento`).
 *
 * I testi sono quelli esatti del listino di Silvia («Listino trattamenti ·
 * Quattro esperienze di benessere») e del suo Google Form per le letture:
 * non si riscrivono. Con `prezzo: null` il prezzo non compare da nessuna
 * parte (docs/decisioni.md, "Prezzi solo quando ci sono").
 */

/** «Momento relax post-trattamento incluso • circa 15 minuti» */
export const RELAX_MINUTI = 15;
export const RELAX_TESTO = 'Momento relax post-trattamento incluso';

export const SLUG_TRATTAMENTI = ['lily-holistic', 'lily-holistic-ritual', 'lily-sportive', 'lily-magic'] as const;
export type TrattamentoSlug = (typeof SLUG_TRATTAMENTI)[number];

/** Le icone del listino, a linea dentro i cerchi cipria (src/components/icons.tsx). */
export type IconaTrattamento = 'loto' | 'futon' | 'schiena' | 'candela';

export type Trattamento = {
  slug: TrattamentoSlug;
  nome: string;
  /** La descrizione del listino. */
  breve: string;
  /** Minuti di trattamento, senza il momento relax. */
  durata: number;
  icona: IconaTrattamento;
  /** Euro; null finché Silvia non lo dà. */
  prezzo: number | null;
};

export const TRATTAMENTI: readonly Trattamento[] = [
  { slug: 'lily-holistic', nome: 'Lily Holistic', breve: 'Massaggio olistico relax su lettino', durata: 60, icona: 'loto', prezzo: null },
  { slug: 'lily-holistic-ritual', nome: 'Lily Holistic Ritual', breve: 'Rituale olistico su futon', durata: 75, icona: 'futon', prezzo: null },
  { slug: 'lily-sportive', nome: 'Lily Sportive', breve: 'Massaggio decontratturante e muscolare', durata: 60, icona: 'schiena', prezzo: null },
  {
    slug: 'lily-magic',
    nome: 'Lily Magic',
    breve: 'Rituale olistico con biotensor, pietre, candela e meditazione',
    durata: 60,
    icona: 'candela',
    prezzo: null,
  },
];

/** Il trattamento con questo slug, se esiste. */
export function trovaTrattamento(slug: string | null | undefined): Trattamento | undefined {
  return TRATTAMENTI.find((t) => t.slug === slug);
}

/** "€ 60" (null → ''). */
export function formatPrezzo(prezzo: number | null): string {
  if (prezzo === null) return '';
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: prezzo % 1 === 0 ? 0 : 2,
  }).format(prezzo);
}

/* ── Le letture intuitive (a distanza, via email) ───────────────────── */

/** I temi del Google Form di oggi, nello stesso ordine. */
export const TEMI_LETTURA = ['Generale', 'Carriera / Lavoro', 'Amore / Relazioni', 'Crescita personale', 'Altro'] as const;
export type TemaLettura = (typeof TEMI_LETTURA)[number];

/** Le letture con le parole di Silvia (Google Form «Richiesta Lettura Intuitiva Personalizzata»). */
export const LETTURA = {
  nome: 'Lettura intuitiva personalizzata',
  /** «…per richiedere una lettura simbolica e intuitiva personalizzata.» */
  frase: 'una lettura simbolica e intuitiva personalizzata',
  /** «Riceverai:» */
  riceverai: ['foto della stesa', 'interpretazione personalizzata scritta o video', 'risposta via email entro 24–48 ore'],
  /** Si riporta integrale accanto a ogni richiesta di lettura (docs/spec.md). */
  disclaimer:
    'La lettura ha valore orientativo e riflessivo: non sostituisce pareri medici, legali o professionali e va interpretata come strumento di introspezione e consiglio.',
  /** Euro; null finché Silvia non lo dà. */
  prezzo: null as number | null,
  /**
   * Risposta scritta o video: la sceglie chi chiede o Silvia? (domande
   * aperte). Con false la richiesta non chiede il formato.
   */
  formatoAScelta: false as boolean,
} as const;
