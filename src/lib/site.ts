/**
 * Configurazione centrale: chi è Lily, contatti, link, stato delle
 * prenotazioni. Unica fonte di verità, importabile sia dai Server Component
 * sia dal codice client. Stesso schema di andrea-bellettati (src/lib/site.ts),
 * con i dati di Silvia.
 *
 * Regola della casa: i dati arrivano solo da Silvia. Finché un valore manca
 * resta vuoto ('' o []) e il blocco che lo usa non compare; la domanda è in
 * docs/domande-aperte.md. Quando arriva la risposta, si scrive qui e si
 * rifà il build: tutto il sito si aggiorna da solo.
 */

/**
 * Indirizzo del sito (sitemap, canonical, Open Graph, email). Il dominio non
 * è ancora deciso (domande aperte ★): senza NEXT_PUBLIC_SITE_URL si usa
 * l'indirizzo locale, mai un dominio inventato.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

/** Il marchio, come nel logo: «Lily · Trattamenti Benessere». */
export const SITE_NAME = 'Lily Trattamenti Benessere';
export const SITE_SHORT_NAME = 'Lily';
export const OWNER_NAME = 'Silvia Chizio';

/** Dove: dalla bio di Instagram («Montebelluna / Treviso»). */
export const CITTA = 'Montebelluna';
export const PROVINCIA = 'TV';
export const ZONA = `${CITTA} (${PROVINCIA})`;

/** BOZZA — titolo per i motori di ricerca (modello in docs/spec.md, "SEO locale"). */
export const SITE_TITLE = `${SITE_NAME} · Massaggi e rituali olistici a ${ZONA}`;
/** BOZZA — descrizione per i motori di ricerca, con le parole del listino. */
export const SITE_DESCRIPTION = `Massaggi e rituali olistici a ${ZONA}, con un momento relax dopo ogni trattamento. E letture intuitive personalizzate, a distanza.`;

/* ── Canali ─────────────────────────────────────────────────────────── */

/** Instagram: il canale che il pubblico di Silvia usa già. C'è sempre. */
export const IG_HANDLE = '@silvia_chizio';
export const IG_URL = 'https://www.instagram.com/silvia_chizio/';
/** Messaggio diretto su Instagram. */
export const IG_DM_URL = 'https://ig.me/m/silvia_chizio';
export const THREADS_URL = 'https://www.threads.com/@silvia_chizio';

/** Email pubblica di Silvia (domande aperte ★). Vuota: niente link mailto. */
export const EMAIL: string = '';
export const HAS_EMAIL = EMAIL !== '';

/**
 * WhatsApp e telefono (domande aperte): come in ireandlunaslife, finché il
 * numero è vuoto bottoni WhatsApp e link tel: non compaiono. Quando Silvia
 * lo dà, si scrive in formato internazionale senza "+" né spazi
 * (es. '393331234567') e si riaccendono ovunque.
 */
export const WA_NUMBER: string = '';
export const HAS_WA = WA_NUMBER !== '';
export const WA_LINK = HAS_WA ? `https://wa.me/${WA_NUMBER}` : '';

/** Numero per le chiamate, se Silvia vuole pubblicarlo (stesso formato). */
export const PHONE_NUMBER: string = '';
export const HAS_PHONE = PHONE_NUMBER !== '';
export const PHONE = HAS_PHONE ? `+${PHONE_NUMBER}` : '';
/** "+39 333 123 4567" */
export const PHONE_DISPLAY = HAS_PHONE
  ? `+${PHONE_NUMBER.slice(0, 2)} ${PHONE_NUMBER.slice(2, 5)} ${PHONE_NUMBER.slice(5, 8)} ${PHONE_NUMBER.slice(8)}`
  : '';

/* ── Lo studio ──────────────────────────────────────────────────────── */

/**
 * L'indirizzo dello studio (domande aperte ★: "Montebelluna / Treviso" è un
 * posto solo o due?). Vuoto finché non lo dà Silvia: contatti, piè di pagina
 * e dati per Google lo mostrano solo quando c'è.
 */
export const STUDIO: {
  via: string;
  cap: string;
  citta: string;
  provincia: string;
  /** Link "Apri in Maps" (niente mappa incorporata: docs/decisioni.md). */
  mapsUrl: string;
  /** Coordinate per i dati strutturati, se Silvia dà l'indirizzo. */
  geo: { lat: number; lng: number } | null;
  /** Come arrivare (parcheggio, citofono…), parole di Silvia. */
  comeArrivare: string;
} = {
  via: '',
  cap: '',
  citta: CITTA,
  provincia: PROVINCIA,
  mapsUrl: '',
  geo: null,
  comeArrivare: '',
};
export const HAS_INDIRIZZO = STUDIO.via !== '';
/** "Via Roma 1, 31044 Montebelluna (TV)" */
export const INDIRIZZO_DISPLAY = HAS_INDIRIZZO
  ? `${STUDIO.via}, ${[STUDIO.cap, STUDIO.citta].filter(Boolean).join(' ')} (${STUDIO.provincia})`
  : '';

export type Giorno = 'lun' | 'mar' | 'mer' | 'gio' | 'ven' | 'sab' | 'dom';
/**
 * Giorni e orari in cui Silvia riceve (domande aperte ★), es.
 * { giorni: ['lun', 'mar'], dalle: '09:00', alle: '19:00' }.
 */
export const ORARI: { giorni: Giorno[]; dalle: string; alle: string }[] = [];
export const HAS_ORARI = ORARI.length > 0;

/* ── Silvia, con le sue parole (pagina Chi sono) ────────────────────── */

/**
 * La storia di Silvia, perché "Lily", formazione e corsi: solo con le sue
 * parole (domande aperte). Finché sono vuoti, i blocchi non compaiono.
 */
export const SILVIA: { storia: string[]; percheLily: string; formazione: string[] } = {
  storia: [],
  percheLily: '',
  formazione: [],
};

/** Le storie in evidenza del suo profilo Instagram (titoli esatti). */
export const STORIE_IN_EVIDENZA = ['Creatività', 'Lily', 'Wonderful places', 'Tenerife', 'Me', 'Alicante'] as const;

/* ── Le richieste ───────────────────────────────────────────────────── */

export type StatoPrenotazioni = 'aperte' | 'sospese';

/**
 * Le prenotazioni si possono sospendere (ferie, periodi pieni): con
 * 'sospese' i bottoni di quella richiesta diventano "Avvisami quando
 * riapro" e la sua pagina mostra il modulo dell'avviso; il resto del sito
 * non cambia. Si cambia qui e si rifà il build.
 * Oggi la bio dice «sospeso al momento»: cosa sia sospeso, e fino a quando,
 * è una domanda aperta.
 */
export const PRENOTAZIONI: Record<'trattamenti' | 'letture', StatoPrenotazioni> = {
  trattamenti: 'aperte',
  letture: 'aperte',
};
/** Facoltativa, parole di Silvia: es. "Riapro a gennaio". */
export const NOTA_SOSPENSIONE: string = '';

/** Dove portano le due richieste: su telefono si aprono come foglio da ogni pagina. */
export const PRENOTA_HREF = '/prenota#richiesta';
export const LETTURA_HREF = '/letture#richiesta';

/** Il link da mettere nella bio di Instagram al posto del Google Form. */
export const BIO_HREF = '/bio?utm_source=instagram&utm_medium=bio';

/* ── Navigazione e dati legali ──────────────────────────────────────── */

/** Voci principali (header desktop, menu, piè di pagina). */
export const NAV = [
  { href: '/trattamenti', label: 'Trattamenti' },
  { href: '/letture', label: 'Letture' },
  { href: '/chi-sono', label: 'Chi sono' },
  { href: '/contatti', label: 'Contatti' },
] as const;

export const PRIVACY_HREF = '/privacy';

/**
 * Chi tratta i dati (informativa privacy) e i dati legali del piè di
 * pagina. Titolare come da docs/spec.md, da confermare con Silvia (domande
 * aperte). La partita IVA, se c'è, arriva dal .env (NEXT_PUBLIC_PARTITA_IVA,
 * entra al build) e compare da sola nel piè di pagina, nell'informativa e
 * nelle email.
 */
export const LEGAL: { titolare: string; email: string; partitaIva: string; indirizzo: string; aggiornata: string } = {
  titolare: OWNER_NAME,
  email: EMAIL,
  partitaIva: (process.env.NEXT_PUBLIC_PARTITA_IVA ?? '').trim(),
  indirizzo: INDIRIZZO_DISPLAY,
  // Data dell'informativa: si aggiorna quando cambia /privacy.
  aggiornata: '',
};

/* ── Utilità ────────────────────────────────────────────────────────── */

/** Link WhatsApp con il testo già scritto ('' senza numero). */
export function waLink(text: string): string {
  return HAS_WA ? `${WA_LINK}?text=${encodeURIComponent(text)}` : '';
}

/** Link mailto con oggetto e testo già scritti ('' senza indirizzo). */
export function mailtoLink(subject: string, body: string, to: string = EMAIL): string {
  return to ? `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` : '';
}

/** Indirizzo assoluto di un percorso del sito. */
export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).href;
}
