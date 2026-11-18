/**
 * L'anteprima: ogni blocco del sito compare, anche quelli che aspettano un
 * dato di Silvia, con un valore d'esempio segnato «Esempio»
 * (components/ui/Esempio.tsx). Così il sito si rivede intero, e il segno
 * dice a Silvia cosa manca.
 *
 * Accesa in sviluppo (npm run dev) e nell'anteprima statica (npm run
 * anteprima, che passa NEXT_PUBLIC_ANTEPRIMA=1); spenta nella build di
 * produzione (npm run build, Docker), dove vale la regola della casa: senza
 * il dato vero il blocco non compare. Si forza con NEXT_PUBLIC_ANTEPRIMA=1 o 0.
 *
 * I valori d'esempio restano nelle pagine: mai nei dati strutturati
 * (seo.ts), nelle email, nei flussi di richiesta o nell'informativa, che
 * leggono solo i dati veri di site.ts e trattamenti.ts.
 */
import { FOTO_SILVIA, FOTO_STESA as STESA, FOTO_TRATTAMENTI, type NomeImmagine } from './immagini';
import { orarioDisplay } from './orari';
import {
  ANTEPRIMA,
  EMAIL,
  HAS_EMAIL,
  HAS_INDIRIZZO,
  HAS_ORARI,
  HAS_PHONE,
  HAS_WA,
  INDIRIZZO_DISPLAY,
  ORARI,
  PHONE,
  PHONE_DISPLAY,
  RECENSIONI,
  STUDIO,
  waLink,
} from './site';
import { formatPrezzo, LETTURA, type TrattamentoSlug } from './trattamenti';

export { ANTEPRIMA };

/** Un dato da mostrare: quello vero, oppure (solo in anteprima) quello d'esempio. */
export type Dato<T> = { valore: T; esempio: boolean };

/** Il dato vero se c'è; in anteprima l'esempio; altrimenti null (il blocco non compare). */
export function dato<T>(vero: T, presente: boolean, esempio: T): Dato<T> | null {
  if (presente) return { valore: vero, esempio: false };
  return ANTEPRIMA ? { valore: esempio, esempio: true } : null;
}

/** I link d'esempio non portano da nessuna parte. */
const NESSUNO = '#anteprima';

/* ── Contatti ───────────────────────────────────────────────────────── */

export const whatsapp = (testo: string) => dato(waLink(testo), HAS_WA, NESSUNO);
export const TELEFONO = dato({ href: `tel:${PHONE}`, testo: PHONE_DISPLAY }, HAS_PHONE, { href: NESSUNO, testo: '+39 3·· ··· ····' });
export const EMAIL_PUBBLICA = dato({ href: `mailto:${EMAIL}`, testo: EMAIL }, HAS_EMAIL, { href: NESSUNO, testo: 'silvia@…' });

/* ── Lo studio ──────────────────────────────────────────────────────── */

export const INDIRIZZO = dato(INDIRIZZO_DISPLAY, HAS_INDIRIZZO, 'Via Esempio 1, 31044 Montebelluna (TV)');
export const MAPS = dato(STUDIO.mapsUrl, STUDIO.mapsUrl !== '', NESSUNO);
export const ORARI_STUDIO = dato(ORARI.map(orarioDisplay), HAS_ORARI, ['Lunedì – venerdì, 9:00 – 19:00', 'Sabato, 9:00 – 13:00']);

/* ── Trattamenti e letture ──────────────────────────────────────────── */

/** Il prezzo, se Silvia lo dà; in anteprima «€ 00». */
export const prezzo = (euro: number | null) => dato(formatPrezzo(euro), euro !== null, '€ 00');
export const PREZZO_LETTURA = prezzo(LETTURA.prezzo);

/** La foto di ogni trattamento (l'anteprima sopra le righe del listino): oggi solo in anteprima. */
const FOTO_TRATTAMENTO_ESEMPIO: Record<TrattamentoSlug, NomeImmagine> = {
  'lily-holistic': 'massaggio',
  'lily-holistic-ritual': 'seta',
  'lily-sportive': 'luce',
  'lily-magic': 'candela',
};
export const fotoTrattamento = (slug: TrattamentoSlug) => {
  const vera = FOTO_TRATTAMENTI[slug];
  return dato<NomeImmagine>(vera ?? FOTO_TRATTAMENTO_ESEMPIO[slug], vera !== undefined, FOTO_TRATTAMENTO_ESEMPIO[slug]);
};

/** La foto di una stesa vera (domande aperte); in anteprima, le carte. */
export const FOTO_STESA = dato<NomeImmagine>(STESA ?? 'carte', STESA !== null, 'carte');

/* ── Silvia ─────────────────────────────────────────────────────────── */

/** La foto di Silvia (domande aperte ★); finché manca, la luce dello studio. */
export const RITRATTO = dato<NomeImmagine>(FOTO_SILVIA ?? 'luceSpecchio', FOTO_SILVIA !== null, 'luceSpecchio');

/* ── Le voci di chi è passato da Lily ───────────────────────────────── */

export const RECENSIONI_D = dato(RECENSIONI, RECENSIONI.length > 0, [
  { testo: 'Qui una recensione vera, con le parole di chi l’ha scritta e il suo permesso.', nome: 'Nome C.', fonte: 'Google' },
  { testo: 'Una seconda recensione: due o tre righe bastano, meglio se raccontano il momento relax.', nome: 'Nome C.', fonte: 'Instagram' },
  { testo: 'E una terza, magari su una lettura a distanza.', nome: 'Nome C.', fonte: 'Google' },
]);
