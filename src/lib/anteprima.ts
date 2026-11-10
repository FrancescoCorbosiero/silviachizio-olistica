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
import { FOTO_STESA as STESA, FOTO_TRATTAMENTI, GALLERIA_STUDIO as GALLERIA, type NomeImmagine } from './immagini';
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
  SILVIA,
  STUDIO,
  waLink,
} from './site';
import { formatPrezzo, LETTURA, PRIMA_DI_VENIRE, type TrattamentoSlug } from './trattamenti';

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
/** Dove sta lo studio sulla mappa (STUDIO.geo); in anteprima, il centro di Montebelluna. */
export const POSIZIONE = dato(STUDIO.geo ?? { lat: 0, lng: 0 }, STUDIO.geo !== null, { lat: 45.7757, lng: 12.0436 });
export const COME_ARRIVARE = dato(
  STUDIO.comeArrivare,
  STUDIO.comeArrivare !== '',
  'Qui come arrivare: dove parcheggiare, il citofono, il piano. Con le parole di Silvia.',
);
export const ORARI_STUDIO = dato(ORARI.map(orarioDisplay), HAS_ORARI, ['Lunedì – venerdì, 9:00 – 19:00', 'Sabato, 9:00 – 13:00']);

/** Le foto dello studio per la galleria (domande aperte ★); in anteprima, le atmosfere. */
export const GALLERIA_STUDIO = dato<NomeImmagine[]>(GALLERIA, GALLERIA.length > 0, ['luce', 'seta', 'candela', 'velo', 'luceSpecchio']);

/* ── Trattamenti e letture ──────────────────────────────────────────── */

/** Il prezzo, se Silvia lo dà; in anteprima «€ 00». */
export const prezzo = (euro: number | null) => dato(formatPrezzo(euro), euro !== null, '€ 00');
export const PREZZO_LETTURA = prezzo(LETTURA.prezzo);

/** La foto di ogni trattamento (indice e sezioni): oggi solo in anteprima, con le atmosfere. */
const FOTO_TRATTAMENTO_ESEMPIO: Record<TrattamentoSlug, NomeImmagine> = {
  'lily-holistic': 'velo',
  'lily-holistic-ritual': 'seta',
  'lily-sportive': 'luce',
  'lily-magic': 'candela',
};
export const fotoTrattamento = (slug: TrattamentoSlug) => {
  const vera = FOTO_TRATTAMENTI[slug];
  return dato<NomeImmagine>(vera ?? FOTO_TRATTAMENTO_ESEMPIO[slug], vera !== undefined, FOTO_TRATTAMENTO_ESEMPIO[slug]);
};

export const PRIMA = dato(PRIMA_DI_VENIRE, PRIMA_DI_VENIRE.length > 0, [
  'Cosa portare con te: qui le indicazioni di Silvia.',
  'Quando arrivare, e quanto fermarsi dopo il momento relax.',
  'Come si paga, e cosa fare se devi spostare l’appuntamento.',
]);

/** La foto di una stesa vera (domande aperte); in anteprima, le carte. */
export const FOTO_STESA = dato<NomeImmagine>(STESA ?? 'carte', STESA !== null, 'carte');

/* ── Silvia ─────────────────────────────────────────────────────────── */

export const PERCHE_LILY = dato(
  SILVIA.percheLily,
  SILVIA.percheLily !== '',
  'Qui il perché di «Lily»: com’è nato il nome e cosa c’entra il giglio, con le parole di Silvia.',
);
export const FORMAZIONE = dato(SILVIA.formazione, SILVIA.formazione.length > 0, [
  'Nome del corso · scuola o ente · anno',
  'Nome del corso · scuola o ente · anno',
  'Nome del corso · scuola o ente · anno',
]);
export const PERCORSO = dato(SILVIA.percorso, SILVIA.percorso.length > 0, [
  { quando: 'Anno', titolo: 'La prima tappa', testo: 'Qui l’inizio: quando è nata la voglia di fare questo lavoro.' },
  { quando: 'Anno', titolo: 'La formazione', testo: 'I corsi, le scuole, le persone da cui ha imparato.' },
  { quando: 'Anno', titolo: 'Le letture', testo: 'Come sono arrivate le carte, e la magia.' },
  { quando: 'Oggi', titolo: 'Lily', testo: 'Lo studio a Montebelluna e le letture a distanza.' },
]);

/* ── Le voci di chi è passato da Lily ───────────────────────────────── */

export const RECENSIONI_D = dato(RECENSIONI, RECENSIONI.length > 0, [
  { testo: 'Qui una recensione vera, con le parole di chi l’ha scritta e il suo permesso.', nome: 'Nome C.', fonte: 'Google' },
  { testo: 'Una seconda recensione: due o tre righe bastano, meglio se raccontano il momento relax.', nome: 'Nome C.', fonte: 'Instagram' },
  { testo: 'E una terza, magari su una lettura a distanza.', nome: 'Nome C.', fonte: 'Google' },
]);
