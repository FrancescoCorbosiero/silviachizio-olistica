import { IG_DM_URL, LETTURA_HREF, MODULI, NOTA_SOSPENSIONE, PRENOTA_HREF, PRENOTAZIONI, RICHIESTE_DAL } from './site';

/**
 * Le due richieste del sito e dove portano. Una sola fonte per header,
 * menu, barra in basso, sezioni e flussi.
 *
 * Con RICHIESTE_DAL = 'modulo' (oggi) portano al modulo Google di Silvia,
 * in un'altra scheda. Con 'sito' portano ai flussi del sito (/prenota…),
 * che si aprono come foglio sopra la pagina (AppProvider). Con una
 * richiesta sospesa (PRENOTAZIONI in site.ts): dal sito, "Avvisami quando
 * riapro"; con il modulo, il messaggio su Instagram.
 */
export type TipoRichiesta = 'trattamenti' | 'letture';

/** Le richieste passano dal modulo Google (il sito non raccoglie dati). */
export const DAL_MODULO = RICHIESTE_DAL === 'modulo';

export const RICHIESTE = {
  trattamenti: {
    href: DAL_MODULO ? MODULI.trattamenti : PRENOTA_HREF,
    label: 'Prenota un trattamento',
    breve: 'Prenota',
    sospesa: PRENOTAZIONI.trattamenti === 'sospese',
  },
  letture: {
    href: DAL_MODULO ? MODULI.letture : LETTURA_HREF,
    label: 'Richiedi una lettura',
    breve: 'Lettura',
    sospesa: PRENOTAZIONI.letture === 'sospese',
  },
} as const satisfies Record<TipoRichiesta, { href: string; label: string; breve: string; sospesa: boolean }>;

export const AVVISAMI = 'Avvisami quando riapro';

/**
 * L'etichetta del bottone di una richiesta. Sospesa: "Avvisami quando
 * riapro" dal sito, "Scrivimi su Instagram" con il modulo (con `contesto`,
 * dove le due richieste stanno vicine: "… i trattamenti", "… le letture");
 * `breve` per header e barra.
 */
export function etichetta(tipo: TipoRichiesta, opts: { breve?: boolean; contesto?: boolean } = {}): string {
  const r = RICHIESTE[tipo];
  if (r.sospesa) {
    if (DAL_MODULO) return opts.breve ? 'Scrivimi' : 'Scrivimi su Instagram';
    if (opts.breve) return 'Avvisami';
    return opts.contesto ? `${AVVISAMI} ${tipo === 'trattamenti' ? 'i trattamenti' : 'le letture'}` : AVVISAMI;
  }
  return opts.breve ? r.breve : r.label;
}

/**
 * Il link di una richiesta, pronto per un <a>: il modulo (o Instagram) in
 * un'altra scheda, i flussi del sito sul posto.
 */
export function linkRichiesta(tipo: TipoRichiesta): { href: string; esterno: boolean } {
  const r = RICHIESTE[tipo];
  if (DAL_MODULO) return { href: r.sospesa ? IG_DM_URL : r.href, esterno: true };
  return { href: r.href, esterno: false };
}

/** La riga che spiega la sospensione (con la nota di Silvia, se c'è). BOZZA */
export function rigaSospensione(tipo: TipoRichiesta): string {
  const cosa = tipo === 'trattamenti' ? 'Le prenotazioni dei trattamenti' : 'Le richieste di lettura';
  const nota = NOTA_SOSPENSIONE ? ` ${NOTA_SOSPENSIONE}.` : '';
  return DAL_MODULO
    ? `${cosa} sono sospese per qualche tempo.${nota} Per qualsiasi cosa, scrivimi su Instagram.`
    : `${cosa} sono sospese per qualche tempo.${nota} Lasciami la tua email: ti scrivo io quando riapro.`;
}
