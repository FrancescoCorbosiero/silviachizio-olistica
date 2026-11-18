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

/* ── Silvia, con le sue parole ──────────────────────────────────────── */

/**
 * La storia di Silvia con le sue parole (domande aperte): un paragrafo per
 * voce. Finché è vuota, nella sezione «Chi sono» c'è la bozza dello studio.
 */
export const SILVIA: { storia: string[] } = {
  storia: [],
};

/** Le passioni della bio di Instagram: le emoji, dette in parole (docs/brief.md). */
export const PASSIONI = ['Natura', 'Meditazione', 'Fiori', 'Gatti', 'Arrampicata', 'Surf', 'Ballo', 'Viaggi', 'Fotografia', 'Scrittura'] as const;

/**
 * Recensioni vere da citare (domande aperte: per esempio da Google), solo
 * con il permesso di chi le ha scritte. Vuoto: il blocco non compare.
 */
export const RECENSIONI: { testo: string; nome: string; fonte: string }[] = [];

/* ── Le richieste ───────────────────────────────────────────────────── */

/**
 * Da dove passano le richieste (novembre 2026: Silvia vuole il suo modulo
 * Google). Con 'modulo' ogni «Prenota» e «Richiedi una lettura» apre il
 * modulo in un'altra scheda e il sito non raccoglie dati. Con 'sito'
 * tornano le richieste fatte dal sito: i flussi a passi
 * (src/components/flows), l'invio con SES (/api/richiesta), la pagina
 * /prenota. Sono nel codice, spenti e pronti (docs/decisioni.md, «Le
 * richieste passano dal modulo Google»). Si cambia qui e si rifà il build.
 */
export const RICHIESTE_DAL: 'modulo' | 'sito' = 'modulo';

/**
 * Il modulo Google di Silvia: è il «Link per appuntamento» della sua bio
 * (oggi il modulo delle letture). Se arriva un modulo a parte per i
 * trattamenti, si scrive in MODULI.trattamenti (domande aperte).
 */
const MODULO_BIO = 'https://docs.google.com/forms/d/e/1FAIpQLSfh0kLvsLHUO6UtfPCc1AvALu6X2UvHi7mZd06oeKhP_CMr6w/viewform';
export const MODULI: Record<'trattamenti' | 'letture', string> = {
  trattamenti: MODULO_BIO,
  letture: MODULO_BIO,
};

export type StatoPrenotazioni = 'aperte' | 'sospese';

/**
 * Le prenotazioni si possono sospendere (ferie, periodi pieni). Con le
 * richieste dal sito, i bottoni di quella richiesta diventano "Avvisami
 * quando riapro"; con il modulo portano al messaggio su Instagram, con una
 * riga che spiega. Il resto del sito non cambia.
 */
export const PRENOTAZIONI: Record<'trattamenti' | 'letture', StatoPrenotazioni> = {
  trattamenti: 'aperte',
  letture: 'aperte',
};
/** Facoltativa, parole di Silvia: es. "Riapro a gennaio". */
export const NOTA_SOSPENSIONE: string = '';

/**
 * Con le richieste dal sito, dove si aprono: un foglio su telefono e un
 * pannello su desktop da qualsiasi pagina; senza JavaScript, la pagina.
 */
export const PRENOTA_HREF = '/prenota#richiesta';
export const LETTURA_HREF = '/prenota/lettura#richiesta';

/** Il link da mettere nella bio di Instagram: la landing, con la provenienza. */
export const BIO_HREF = '/?utm_source=instagram&utm_medium=bio';

/* ── Anteprima ──────────────────────────────────────────────────────── */

const forzaAnteprima = process.env.NEXT_PUBLIC_ANTEPRIMA;
/**
 * L'anteprima (src/lib/anteprima.ts): ogni blocco compare, anche senza i
 * dati di Silvia, con un esempio segnato. Accesa in sviluppo e in `npm run
 * anteprima`; spenta nella build di produzione. NEXT_PUBLIC_ANTEPRIMA=1 o 0
 * la forza.
 */
export const ANTEPRIMA = forzaAnteprima ? forzaAnteprima === '1' : process.env.NODE_ENV === 'development';

/* ── Navigazione e dati legali ──────────────────────────────────────── */

/** Le sezioni della landing (header, menu, piè di pagina): ancore della home. */
export const NAV: readonly { href: string; label: string }[] = [
  { href: '/#trattamenti', label: 'Trattamenti' },
  { href: '/#letture', label: 'Letture' },
  { href: '/#chi-sono', label: 'Chi sono' },
  { href: '/#contatti', label: 'Contatti' },
];

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
  aggiornata: '18 novembre 2026',
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
