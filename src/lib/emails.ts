import {
  CONSIGLIAMI,
  CONTATTI,
  avvisamiLines,
  avvisamiSubject,
  fasceSummary,
  giorniSummary,
  interessiSummary,
  letturaLines,
  letturaSubject,
  prenotaLines,
  prenotaSubject,
  temaSummary,
  waLinkFor,
  type AvvisamiPayload,
  type LetturaPayload,
  type PrenotaPayload,
} from './forms';
import { IG_DM_URL, LEGAL, PRIVACY_HREF, SITE_NAME, absoluteUrl } from './site';
import { LETTURA, RELAX_MINUTI, trovaTrattamento } from './trattamenti';

/* =====================================================================
   Da andrea-bellettati (src/lib/emails.ts), nella veste di Lily: il logo
   in alto, una scheda bianca con il bordino rosa, fondo latte, il piè di
   pagina.
   - A Silvia: si legge al volo dal telefono, con i bottoni per rispondere
     (WhatsApp con il primo messaggio già pronto, chiamata, email).
   - A chi ha scritto (se ha lasciato l'email): breve, dice cosa succede
     adesso; in fondo il perché dell'email, il titolare e l'informativa.
     È un messaggio di servizio, mai una newsletter.
   Le email non caricano font: titoli in Georgia (il serif più vicino a
   Playfair Display presente ovunque), testo nel font di sistema.
   I testi scritti dallo studio sono BOZZE (docs/testi-da-validare.md).
   ===================================================================== */

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const C = {
  ink: '#2a1b17',
  mute: '#6e5a5e',
  lily: '#e00b57',
  deep: '#c40a4c',
  petalo: '#f8aac6',
  cipria: '#fce0e9',
  blush: '#fbe8ee',
  latte: '#fdf6f8',
  line: '#f6d3df',
};
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

/** Data e ora italiane: quando è arrivata una richiesta. */
const when = (d = new Date()) =>
  new Intl.DateTimeFormat('it-IT', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Rome' })
    .format(d)
    .replace(',', ' alle');

const legalLine = () =>
  [`Titolare del trattamento: ${LEGAL.titolare}`, LEGAL.partitaIva ? `P.IVA ${LEGAL.partitaIva}` : '', LEGAL.indirizzo]
    .filter(Boolean)
    .join(' · ');

/* ── Mattoni ──────────────────────────────────────────────────────── */

function layout({ title, preheader, body, footer }: { title: string; preheader: string; body: string; footer: string }): string {
  // Il riempitivo dopo l'anteprima evita che il client mostri pezzi del corpo.
  const filler = '&#8199;&#65279;&#847; '.repeat(60);
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${C.latte};font-family:${FONT};color:${C.ink};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}${filler}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.latte};"><tr><td align="center" style="padding:24px 12px 36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td align="center" style="padding:0 6px 14px;">
  <img src="${absoluteUrl('/brand/logo-email.png')}" width="112" height="116" alt="${esc(SITE_NAME)}" style="display:block;border:0;width:112px;height:116px;">
</td></tr>
<tr><td style="background:#ffffff;border-radius:24px;border:1px solid ${C.line};border-top:6px solid ${C.lily};padding:24px 26px 28px;">${body}</td></tr>
<tr><td style="padding:18px 10px 0;font-size:12px;line-height:1.55;color:${C.mute};">${footer}</td></tr>
</table></td></tr></table></body></html>`;
}

const pill = (text: string) =>
  `<span style="display:inline-block;padding:5px 11px;border-radius:999px;background:${C.cipria};color:${C.deep};font-size:12px;font-weight:700;letter-spacing:.02em;">${esc(text)}</span>`;

const title = (text: string) =>
  `<h1 style="margin:14px 0 10px;font-family:${SERIF};font-size:27px;font-weight:700;line-height:1.15;color:${C.ink};">${esc(text)}</h1>`;

const para = (html: string, extra = '') =>
  `<p style="margin:0 0 14px;font-size:16px;line-height:1.55;color:${C.ink};${extra}">${html}</p>`;

function button(href: string, label: string, kind: 'main' | 'soft' = 'main'): string {
  const look =
    kind === 'main'
      ? `background:${C.lily};color:#ffffff;border:1px solid ${C.lily};`
      : `background:#ffffff;color:${C.deep};border:1px solid ${C.petalo};`;
  return `<a href="${esc(href)}" style="display:inline-block;margin:4px 6px 4px 0;padding:12px 20px;border-radius:999px;${look}font-weight:700;font-size:15px;line-height:1.2;text-decoration:none;">${esc(label)}</a>`;
}

function rows(list: [string, string][]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:6px 0 18px;">${list
    .map(
      ([k, v]) =>
        `<tr><td style="padding:9px 12px 9px 0;border-top:1px solid ${C.line};color:${C.mute};font-size:13.5px;width:36%;vertical-align:top;">${esc(k)}</td><td style="padding:9px 0;border-top:1px solid ${C.line};font-size:15px;font-weight:600;color:${C.ink};vertical-align:top;white-space:pre-wrap;">${esc(v)}</td></tr>`,
    )
    .join('')}</table>`;
}

/** I passi dopo la richiesta, con i numeri nei cerchi cipria. */
function steps(list: [string, string][]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 18px;">${list
    .map(
      ([head, text], i) =>
        `<tr><td style="width:42px;padding:7px 0;vertical-align:top;"><div style="width:30px;height:30px;border-radius:50%;background:${i === 0 ? C.lily : C.cipria};color:${i === 0 ? '#ffffff' : C.deep};font-size:15px;font-weight:800;line-height:30px;text-align:center;">${i + 1}</div></td><td style="padding:7px 0;vertical-align:top;"><div style="font-size:15.5px;font-weight:700;color:${C.ink};">${esc(head)}</div><div style="font-size:14px;line-height:1.45;color:${C.mute};">${esc(text)}</div></td></tr>`,
    )
    .join('')}</table>`;
}

const label = (text: string) =>
  `<div style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.mute};">${esc(text)}</div>`;

/** Il disclaimer di Silvia, integrale, accanto a ogni lettura (docs/spec.md). */
const disclaimer = () =>
  `<div style="margin:4px 0 18px;padding:14px 16px;border-radius:16px;background:${C.blush};font-size:14px;line-height:1.5;color:${C.ink};">${esc(LETTURA.disclaimer)}</div>`;

const signature = () =>
  `<p style="margin:18px 0 0;font-size:16px;color:${C.ink};">A presto,<br><span style="font-family:${SERIF};font-style:italic;font-size:24px;color:${C.lily};">Silvia</span></p>`;

/** Il piè di pagina delle conferme: perché arriva, chi tratta i dati, l'informativa. */
function legalFooter(reason: string): string {
  const privacy = absoluteUrl(PRIVACY_HREF);
  return [esc(reason), `${esc(legalLine())} · <a href="${privacy}" style="color:${C.mute};text-decoration:underline;">Informativa privacy</a>`]
    .map((t) => `<p style="margin:0 0 8px;">${t}</p>`)
    .join('');
}

function legalText(reason: string): string {
  return ['—', reason, `${legalLine()} · Informativa privacy: ${absoluteUrl(PRIVACY_HREF)}`].join('\n');
}

/** Il promemoria in fondo alle email a Silvia. BOZZA */
const KEEP_NOTE = 'Contiene dati personali: usali solo per rispondere a questa richiesta.';

function internalFooter(): string {
  return `<p style="margin:0 0 8px;">Arrivata dal sito il ${esc(when())}.</p><p style="margin:0;">${esc(KEEP_NOTE)} <a href="${absoluteUrl(PRIVACY_HREF)}" style="color:${C.mute};text-decoration:underline;">Informativa</a></p>`;
}

/** Da dove arriva la richiesta (pagina e campagna): solo nell'email a Silvia. */
const withSource = (list: [string, string][], source: string): [string, string][] =>
  source ? [...list, ['Arrivata da', source]] : list;

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name.trim();
const telLink = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/** Link WhatsApp verso chi ha scritto, con il primo messaggio già pronto. */
const waReply = (phone: string, text: string) => {
  const wa = waLinkFor(phone);
  return wa ? `${wa}?text=${encodeURIComponent(text)}` : null;
};

/** I bottoni per rispondere, con il canale preferito per primo. */
function replyButtons(choices: { kind: 'whatsapp' | 'chiamata' | 'email'; href: string | null; label: string }[], first: string): string {
  const list = choices.filter((c) => c.href);
  list.sort((a, b) => (a.kind === first ? -1 : b.kind === first ? 1 : 0));
  return list.map((c, i) => button(c.href!, c.label, i === 0 ? 'main' : 'soft')).join('');
}

/* ── A Silvia ─────────────────────────────────────────────────────── */

/** Nuova richiesta: "Prenota un trattamento". */
export function prenotaToSilvia(p: PrenotaPayload) {
  const list = withSource(prenotaLines(p), p.source);
  const subject = prenotaSubject(p);
  const t = trovaTrattamento(p.trattamento);
  const nome = t?.nome ?? 'Da consigliare';
  const wa = waReply(p.phone, `Ciao ${firstName(p.name)}, sono Silvia di Lily: ho ricevuto la tua richiesta${t ? ` per ${t.nome}` : ''} 🌸`);
  const contatto = CONTATTI.find((c) => c.value === p.contatto)?.lungo;
  const meta = [fasceSummary(p.fasce), giorniSummary(p.giorni), contatto ? `preferisce: ${contatto.charAt(0).toLowerCase()}${contatto.slice(1)}` : '']
    .filter(Boolean)
    .join(' · ');
  const mail = p.email ? `mailto:${p.email}?subject=${encodeURIComponent(`La tua richiesta per ${nome}`)}` : null;
  const text = [
    'Nuova richiesta: Prenota un trattamento',
    '',
    ...list.map(([k, v]) => `${k}: ${v}`),
    '',
    wa ? `WhatsApp: ${wa}` : '',
    `Chiama: ${p.phone}`,
    p.email ? `Email: ${p.email}` : '',
    '',
    `Arrivata dal sito il ${when()}. ${KEEP_NOTE}`,
  ]
    .filter((l, i, a) => l !== '' || a[i - 1] !== '')
    .join('\n');
  const html = layout({
    title: subject,
    preheader: [nome, meta, p.phone].filter(Boolean).join(' · '),
    body: `${pill('Prenota un trattamento')}
${title(`${nome} · ${p.name}`)}
${para(esc(meta), `color:${C.mute};font-size:15px;`)}
<div style="margin:6px 0 16px;">${replyButtons(
      [
        { kind: 'whatsapp', href: wa, label: 'WhatsApp' },
        { kind: 'chiamata', href: telLink(p.phone), label: 'Chiama' },
        { kind: 'email', href: mail, label: 'Email' },
      ],
      p.contatto || 'whatsapp',
    )}</div>
${rows(list)}`,
    footer: internalFooter(),
  });
  return { subject, text, html, replyTo: p.email || undefined };
}

/** Nuova richiesta: "Richiedi una lettura". */
export function letturaToSilvia(p: LetturaPayload) {
  const list = withSource(letturaLines(p), p.source);
  const subject = letturaSubject(p);
  const tema = temaSummary(p);
  const mail = `mailto:${p.email}?subject=${encodeURIComponent('La tua lettura intuitiva')}`;
  const text = [
    'Nuova richiesta: Richiedi una lettura',
    '',
    ...list.map(([k, v]) => `${k}: ${v}`),
    '',
    `Rispondi a: ${p.email}`,
    '',
    `Arrivata dal sito il ${when()}. ${KEEP_NOTE}`,
  ].join('\n');
  const html = layout({
    title: subject,
    preheader: [tema, p.email].filter(Boolean).join(' · '),
    body: `${pill('Richiedi una lettura')}
${title(`${tema} · ${p.name}`)}
${p.domanda ? para(`«${esc(p.domanda)}»`, `font-family:${SERIF};font-style:italic;`) : ''}
<div style="margin:6px 0 16px;">${button(mail, 'Rispondi per email')}</div>
${rows(list)}`,
    footer: internalFooter(),
  });
  return { subject, text, html, replyTo: p.email };
}

/** Qualcuno vuole sapere quando riapri. */
export function avvisamiToSilvia(p: AvvisamiPayload) {
  const list = withSource(avvisamiLines(p), p.source);
  const subject = avvisamiSubject(p);
  const cosa = interessiSummary(p.interessi).toLowerCase();
  // BOZZA
  const nota = 'Il consenso vale solo per questo avviso: quando riapri, scrivi a questo indirizzo e non usarlo per altro.';
  const text = [
    'Nuova richiesta: Avvisami quando riapro',
    '',
    ...list.map(([k, v]) => `${k}: ${v}`),
    '',
    nota,
    '',
    `Arrivata dal sito il ${when()}. ${KEEP_NOTE}`,
  ].join('\n');
  const html = layout({
    title: subject,
    preheader: `Vuole sapere quando riapri: ${cosa}`,
    body: `${pill('Avvisami quando riapro')}
${title(p.name ? `${p.name} · ${p.email}` : p.email)}
${para(`Vuole sapere quando riapri: <strong>${esc(cosa)}</strong>.`)}
${para(esc(nota), `color:${C.mute};font-size:14.5px;`)}
${rows(list)}`,
    footer: internalFooter(),
  });
  return { subject, text, html, replyTo: p.email };
}

/* ── A chi ha scritto ─────────────────────────────────────────────── */

/** BOZZA — come Silvia si fa sentire, secondo il canale scelto. */
const PROMESSA: Record<string, string> = {
  whatsapp: 'Ti scrivo io su WhatsApp per fissare giorno e ora.',
  chiamata: 'Ti chiamo io per fissare giorno e ora.',
  email: 'Ti scrivo io via email per fissare giorno e ora.',
  '': 'Ti scrivo io per fissare giorno e ora.',
};

/** Conferma a chi ha chiesto un trattamento (se ha lasciato l'email). BOZZA */
export function prenotaConfirmation(p: PrenotaPayload) {
  const name = firstName(p.name);
  const t = trovaTrattamento(p.trattamento);
  const subject = t ? `Ho ricevuto la tua richiesta per ${t.nome}` : 'Ho ricevuto la tua richiesta';
  const promise = PROMESSA[p.contatto] ?? PROMESSA['']!;
  const summary = prenotaLines(p).filter(([k]) => !['Nome', 'Email'].includes(k));
  const nextSteps: [string, string][] = [
    ['Ti scrivo io', 'Per fissare insieme giorno e ora, come preferisci tu.'],
    [
      'Il trattamento',
      p.trattamento === CONSIGLIAMI || !t ? 'Ti consiglio io quello giusto per te.' : `${t.nome}: ${t.breve.toLowerCase()}, ${t.durata} minuti.`,
    ],
    ['Il tuo momento relax', `Dopo il trattamento non scappi via: ci sono circa ${RELAX_MINUTI} minuti solo per te.`],
  ];
  const reason = `Ricevi questa email perché hai chiesto un trattamento dal sito di ${SITE_NAME}. È un messaggio di servizio, non una newsletter: non ti scriverò per altro.`;
  const text = [
    `Ciao ${name},`,
    '',
    `la tua richiesta è arrivata. ${promise}`,
    '',
    ...nextSteps.map(([h, d], i) => `${i + 1}. ${h}: ${d}`),
    '',
    'Il riepilogo:',
    ...summary.map(([k, v]) => `${k}: ${v}`),
    '',
    `Vuoi aggiungere qualcosa? Rispondi a questa email, oppure scrivimi su Instagram: ${IG_DM_URL}`,
    '',
    'A presto,',
    'Silvia',
    '',
    legalText(reason),
  ].join('\n');
  const html = layout({
    title: subject,
    preheader: `${promise} Qui sotto il riepilogo.`,
    body: `${pill('Prenota un trattamento')}
${title(`Ciao ${name}, è arrivata!`)}
${para(`La tua richiesta${t ? ` per <strong>${esc(t.nome)}</strong>` : ''} è arrivata. ${esc(promise)}`)}
${steps(nextSteps)}
${label('Il riepilogo')}
${rows(summary)}
${para('Vuoi aggiungere qualcosa? Rispondi a questa email, oppure:')}
<div>${button(IG_DM_URL, 'Scrivimi su Instagram')}</div>
${signature()}`,
    footer: legalFooter(reason),
  });
  return { subject, text, html };
}

/** Il tema nel discorso: con "Altro", le parole di chi ha scritto. */
const temaProsa = (p: Pick<LetturaPayload, 'tema' | 'temaAltro'>) => (p.tema === 'Altro' && p.temaAltro ? `«${p.temaAltro}»` : p.tema.toLowerCase());

/** Conferma a chi ha chiesto una lettura. BOZZA */
export function letturaConfirmation(p: LetturaPayload) {
  const name = firstName(p.name);
  const tema = temaProsa(p);
  const subject = 'Ho ricevuto la tua richiesta di lettura';
  const summary = letturaLines(p).filter(([k]) => !['Nome', 'Email'].includes(k));
  const nextSteps: [string, string][] = [
    ['Ti scrivo io', 'Per ogni dettaglio ti rispondo qui, a questa email.'],
    ['Preparo la stesa', `Sul tema che hai scelto, ${tema}.`],
    ['Ricevi la lettura', 'La foto della stesa e l’interpretazione personalizzata, scritta o video, via email.'],
  ];
  const reason = `Ricevi questa email perché hai chiesto una lettura dal sito di ${SITE_NAME}. È un messaggio di servizio, non una newsletter: non ti scriverò per altro.`;
  const text = [
    `Ciao ${name},`,
    '',
    `la tua richiesta di lettura è arrivata: il tema è ${tema}. Preparo la stesa per te e ti rispondo qui, via email.`,
    '',
    ...nextSteps.map(([h, d], i) => `${i + 1}. ${h}: ${d}`),
    '',
    'Il riepilogo:',
    ...summary.map(([k, v]) => `${k}: ${v}`),
    '',
    LETTURA.disclaimer,
    '',
    'Vuoi aggiungere qualcosa? Rispondi a questa email.',
    '',
    'A presto,',
    'Silvia',
    '',
    legalText(reason),
  ].join('\n');
  const html = layout({
    title: subject,
    preheader: `Il tema è ${tema}. Preparo la stesa e ti rispondo qui, via email.`,
    body: `${pill('Richiedi una lettura')}
${title(`Ciao ${name}, è arrivata!`)}
${para(`La tua richiesta di lettura è arrivata: il tema è <strong>${esc(tema)}</strong>. Preparo la stesa per te e ti rispondo qui, via email.`)}
${steps(nextSteps)}
${label('Il riepilogo')}
${rows(summary)}
${disclaimer()}
${para('Vuoi aggiungere qualcosa? Rispondi a questa email.')}
${signature()}`,
    footer: legalFooter(reason),
  });
  return { subject, text, html };
}

/** Conferma a chi ha chiesto l'avviso di riapertura. BOZZA */
export function avvisamiConfirmation(p: AvvisamiPayload) {
  const name = p.name ? firstName(p.name) : '';
  const cosa =
    p.interessi.length === 2 ? 'i trattamenti e le letture' : p.interessi[0] === 'letture' ? 'le richieste di lettura' : 'le prenotazioni dei trattamenti';
  const subject = 'Ti scrivo quando riapro';
  const reason = `Ricevi questa email perché sul sito di ${SITE_NAME} hai chiesto un avviso quando riapro. Userò il tuo indirizzo solo per questo.`;
  const text = [
    `Ciao${name ? ` ${name}` : ''},`,
    '',
    `ho segnato il tuo indirizzo: quando riapro ${cosa} ti scrivo, una volta sola.`,
    'Non è una newsletter, è solo questo avviso. Se cambi idea, rispondi a questa email e cancello il tuo indirizzo.',
    '',
    'A presto,',
    'Silvia',
    '',
    legalText(reason),
  ].join('\n');
  const html = layout({
    title: subject,
    preheader: `Quando riapro ${cosa} ti scrivo, una volta sola.`,
    body: `${pill('Avvisami quando riapro')}
${title(`Ciao${name ? ` ${name}` : ''}, ti avviso io`)}
${para(`Ho segnato il tuo indirizzo: quando riapro ${esc(cosa)} ti scrivo, una volta sola.`)}
${para('Non è una newsletter, è solo questo avviso. Se cambi idea, rispondi a questa email e cancello il tuo indirizzo.', `color:${C.mute};font-size:15px;`)}
${signature()}`,
    footer: legalFooter(reason),
  });
  return { subject, text, html };
}
