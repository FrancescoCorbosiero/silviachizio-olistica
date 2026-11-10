import { z } from 'zod';
import type { Giorno } from './site';
import { LETTURA, RELAX_MINUTI, SLUG_TRATTAMENTI, TEMI_LETTURA, trovaTrattamento, type TemaLettura, type TrattamentoSlug } from './trattamenti';

/* =====================================================================
   Da andrea-bellettati (src/lib/forms.ts), riscritto per Lily.
   Le tre richieste del sito: "Prenota un trattamento", "Richiedi una
   lettura" e "Avvisami quando riapro". Campi, opzioni, controlli e testi,
   condivisi tra il browser (i flussi Konsta) e il server (/api/richiesta):
   le stesse regole valgono da entrambe le parti.

   In fase 1 sono richieste, non prenotazioni confermate: hanno già la
   forma di una prenotazione (trattamento dal catalogo, durata,
   preferenze, contatti) così il gestionale potrà salvarle invece di
   spedirle soltanto (docs/web-app.md).
   Dati minimi (docs/decisioni.md): niente dati sulla salute, niente
   codice fiscale.
   ===================================================================== */

/* ── Opzioni ──────────────────────────────────────────────────────── */

/** "Non so ancora: consigliami tu". */
export const CONSIGLIAMI = 'consigliami';

export const FASCE = [
  { value: 'mattina', label: 'Mattina' },
  { value: 'pomeriggio', label: 'Pomeriggio' },
  { value: 'sera', label: 'Sera' },
] as const;
export type Fascia = (typeof FASCE)[number]['value'];
const FASCIA_VALUES = ['mattina', 'pomeriggio', 'sera'] as const;

/** Tutti e sette: i giorni in cui Silvia riceve non si sanno ancora. */
export const GIORNI: readonly { value: Giorno; label: string; nome: string }[] = [
  { value: 'lun', label: 'Lun', nome: 'lunedì' },
  { value: 'mar', label: 'Mar', nome: 'martedì' },
  { value: 'mer', label: 'Mer', nome: 'mercoledì' },
  { value: 'gio', label: 'Gio', nome: 'giovedì' },
  { value: 'ven', label: 'Ven', nome: 'venerdì' },
  { value: 'sab', label: 'Sab', nome: 'sabato' },
  { value: 'dom', label: 'Dom', nome: 'domenica' },
];
const GIORNO_VALUES = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'] as const;

export const PRIMA_VOLTA = [
  { value: 'si', label: 'Sì' },
  { value: 'no', label: 'No' },
] as const;
export type PrimaVolta = (typeof PRIMA_VOLTA)[number]['value'];

/** "Come ti ricontatto?" */
export const CONTATTI = [
  { value: 'whatsapp', label: 'Messaggio', lungo: 'Messaggio WhatsApp', hint: 'Ti scrivo su WhatsApp, al numero che mi lasci.' },
  { value: 'chiamata', label: 'Chiamata', lungo: 'Chiamata', hint: 'Ti chiamo io.' },
  { value: 'email', label: 'Email', lungo: 'Email', hint: 'Ti scrivo all’indirizzo email che mi lasci.' },
] as const;
export type Contatto = (typeof CONTATTI)[number]['value'];

export const FORMATI = [
  { value: 'scritta', label: 'Scritta' },
  { value: 'video', label: 'Video' },
] as const;
export type Formato = (typeof FORMATI)[number]['value'];

export const INTERESSI = [
  { value: 'trattamenti', label: 'Trattamenti in studio' },
  { value: 'letture', label: 'Letture a distanza' },
] as const;
export type Interesse = (typeof INTERESSI)[number]['value'];

/* ── Bozze (lo stato dei flussi) ──────────────────────────────────── */

export type PrenotaDraft = {
  trattamento: TrattamentoSlug | typeof CONSIGLIAMI | '';
  fasce: Fascia[];
  giorni: Giorno[];
  primaVolta: PrimaVolta | '';
  note: string;
  name: string;
  phone: string;
  email: string;
  contatto: Contatto | '';
};

export const EMPTY_PRENOTA: PrenotaDraft = {
  trattamento: '',
  fasce: [],
  giorni: [],
  primaVolta: '',
  note: '',
  name: '',
  phone: '',
  email: '',
  contatto: '',
};

export type LetturaDraft = {
  tema: TemaLettura | '';
  temaAltro: string;
  domanda: string;
  formato: Formato | '';
  name: string;
  email: string;
};

export const EMPTY_LETTURA: LetturaDraft = {
  tema: '',
  temaAltro: '',
  domanda: '',
  formato: '',
  name: '',
  email: '',
};

export type AvvisamiDraft = {
  email: string;
  name: string;
  interessi: Interesse[];
  consenso: boolean;
};

export const EMPTY_AVVISAMI: AvvisamiDraft = {
  email: '',
  name: '',
  interessi: [],
  consenso: false,
};

/* ── Controlli ────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Un numero di telefono plausibile: almeno 8 cifre, al massimo 15. */
export function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

const text = (max: number) => z.string().trim().max(max);
const source = text(300).default('');

/** "Prenota un trattamento" (lato server). */
export const prenotaSchema = z
  .object({
    kind: z.literal('trattamento'),
    trattamento: z.enum([...SLUG_TRATTAMENTI, CONSIGLIAMI] as const),
    fasce: z.array(z.enum(FASCIA_VALUES)).min(1).max(FASCIA_VALUES.length),
    giorni: z.array(z.enum(GIORNO_VALUES)).max(GIORNO_VALUES.length).default([]),
    primaVolta: z.enum(['si', 'no', '']).default(''),
    note: text(400).default(''),
    name: text(80).min(2),
    phone: text(30).refine(isPhone),
    email: text(120)
      .default('')
      .refine((v) => v === '' || isEmail(v)),
    contatto: z.enum(['whatsapp', 'chiamata', 'email', '']).default(''),
    source,
  })
  .refine((p) => p.contatto !== 'email' || p.email !== '', { path: ['email'] });

/** "Richiedi una lettura" (lato server). */
export const letturaSchema = z
  .object({
    kind: z.literal('lettura'),
    tema: z.enum(TEMI_LETTURA),
    temaAltro: text(120).default(''),
    domanda: text(600).default(''),
    formato: z.enum(['scritta', 'video', '']).default(''),
    name: text(80).min(2),
    email: text(120).refine(isEmail),
    source,
  })
  .refine((p) => p.tema !== 'Altro' || p.temaAltro.length >= 2, { path: ['temaAltro'] });

/** "Avvisami quando riapro": un consenso per un solo scopo, non una newsletter. */
export const avvisamiSchema = z.object({
  kind: z.literal('avvisami'),
  email: text(120).refine(isEmail),
  name: text(80).default(''),
  interessi: z.array(z.enum(['trattamenti', 'letture'])).min(1).max(2),
  consenso: z.literal(true),
  source,
});

export const requestSchema = z.discriminatedUnion('kind', [prenotaSchema, letturaSchema, avvisamiSchema]);
export type PrenotaPayload = z.infer<typeof prenotaSchema>;
export type LetturaPayload = z.infer<typeof letturaSchema>;
export type AvvisamiPayload = z.infer<typeof avvisamiSchema>;
export type RequestPayload = z.infer<typeof requestSchema>;
/** Ciò che manda il browser: i campi con un default possono mancare. */
export type RequestInput = z.input<typeof requestSchema>;

/* ── Testi: riepiloghi, messaggi già scritti, oggetti delle email ─── */

const labelOf = <T extends { value: string; label: string }>(list: readonly T[], value: string) =>
  list.find((o) => o.value === value)?.label ?? '';

/** "Lily Magic · 60 minuti + circa 15 di relax", oppure "Da consigliare". */
export function trattamentoSummary(slug: string): string {
  if (slug === CONSIGLIAMI) return 'Non so ancora: consigliami tu';
  const t = trovaTrattamento(slug);
  return t ? `${t.nome} · ${t.durata} minuti + circa ${RELAX_MINUTI} di relax` : '';
}

/** "mattina, sera" — le fasce nell'ordine della giornata. */
export function fasceSummary(fasce: readonly string[]): string {
  return FASCE.filter((f) => fasce.includes(f.value))
    .map((f) => f.label.toLowerCase())
    .join(', ');
}

/** "lunedì, mercoledì" — i giorni nell'ordine della settimana. */
export function giorniSummary(giorni: readonly string[]): string {
  return GIORNI.filter((g) => giorni.includes(g.value))
    .map((g) => g.nome)
    .join(', ');
}

/** Il tema, con il testo libero di "Altro". */
export function temaSummary(d: Pick<LetturaDraft, 'tema' | 'temaAltro'>): string {
  if (d.tema === 'Altro') return d.temaAltro.trim() ? `Altro: ${d.temaAltro.trim()}` : 'Altro';
  return d.tema;
}

/** Le righe del riepilogo, uguali nella scheda, nei messaggi e nelle email. */
export function prenotaLines(d: PrenotaDraft): [string, string][] {
  const rows: [string, string][] = [
    ['Trattamento', trattamentoSummary(d.trattamento)],
    ['Quando ti va', fasceSummary(d.fasce)],
    ['Giorni preferiti', giorniSummary(d.giorni)],
    ['Prima volta da Lily', d.primaVolta === 'si' ? 'Sì' : d.primaVolta === 'no' ? 'No' : ''],
    ['Due righe', d.note.trim()],
    ['Nome', d.name.trim()],
    ['Telefono', d.phone.trim()],
    ['Email', d.email.trim()],
    ['Come ricontattarti', CONTATTI.find((c) => c.value === d.contatto)?.lungo ?? ''],
  ];
  return rows.filter(([, v]) => v !== '');
}

export function letturaLines(d: LetturaDraft): [string, string][] {
  const rows: [string, string][] = [
    ['Tema', temaSummary(d)],
    ['La domanda', d.domanda.trim()],
    ['Risposta', LETTURA.formatoAScelta ? labelOf(FORMATI, d.formato) : ''],
    ['Nome', d.name.trim()],
    ['Email', d.email.trim()],
  ];
  return rows.filter(([, v]) => v !== '');
}

export function interessiSummary(interessi: readonly string[]): string {
  return INTERESSI.filter((i) => interessi.includes(i.value))
    .map((i) => i.label)
    .join(', ');
}

export function avvisamiLines(d: AvvisamiDraft): [string, string][] {
  const rows: [string, string][] = [
    ['Email', d.email.trim()],
    ['Nome', d.name.trim()],
    ['Mi interessa', interessiSummary(d.interessi)],
    ['Consenso', d.consenso ? 'Scrivimi quando riapri (solo per questo)' : ''],
  ];
  return rows.filter(([, v]) => v !== '');
}

/** Il testo già pronto da mandare a mano (messaggio su Instagram, email). */
export function prenotaText(d: PrenotaDraft): string {
  return ['Ciao Silvia! 🌸 Vorrei prenotare un trattamento.', '', ...prenotaLines(d).map(([k, v]) => `${k}: ${v}`)].join('\n');
}

export function letturaText(d: LetturaDraft): string {
  return ['Ciao Silvia! 🌸 Vorrei richiedere una lettura intuitiva.', '', ...letturaLines(d).map(([k, v]) => `${k}: ${v}`)].join('\n');
}

export function avvisamiText(d: AvvisamiDraft): string {
  return [
    'Ciao Silvia! 🌸 Mi scrivi quando riapri?',
    '',
    ...avvisamiLines(d)
      .filter(([k]) => k !== 'Consenso')
      .map(([k, v]) => `${k}: ${v}`),
  ].join('\n');
}

export function prenotaSubject(d: Pick<PrenotaDraft, 'name' | 'trattamento'>): string {
  const t = d.trattamento === CONSIGLIAMI ? 'da consigliare' : (trovaTrattamento(d.trattamento)?.nome ?? '');
  return `Prenota un trattamento — ${d.name.trim() || 'nuovo contatto'}${t ? ` (${t})` : ''}`;
}

export function letturaSubject(d: Pick<LetturaDraft, 'name' | 'tema' | 'temaAltro'>): string {
  const tema = d.tema ? temaSummary(d) : '';
  return `Richiesta di lettura — ${d.name.trim() || 'nuovo contatto'}${tema ? ` (${tema})` : ''}`;
}

export function avvisamiSubject(d: Pick<AvvisamiDraft, 'email' | 'interessi'>): string {
  const cosa = d.interessi.length === 2 ? 'trattamenti e letture' : d.interessi[0] === 'letture' ? 'letture' : 'trattamenti';
  return `Avvisami quando riapro (${cosa}) — ${d.email.trim()}`;
}

/** Numero italiano → link wa.me per rispondere (es. "347 678 0938" → 393476780938). */
export function waLinkFor(phone: string): string | null {
  let n = phone.replace(/[^\d+]/g, '');
  if (n.startsWith('+')) n = n.slice(1);
  else if (n.startsWith('00')) n = n.slice(2);
  else if (n.length === 10 && n.startsWith('3')) n = `39${n}`;
  return n.length >= 8 ? `https://wa.me/${n}` : null;
}
