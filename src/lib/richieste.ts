import { LETTURA_HREF, NOTA_SOSPENSIONE, PRENOTA_HREF, PRENOTAZIONI } from './site';

/**
 * Le due richieste del sito e il loro stato (PRENOTAZIONI in site.ts).
 * Con una richiesta sospesa i suoi bottoni diventano "Avvisami quando
 * riapro" e portano allo stesso posto, dove c'è il modulo dell'avviso.
 */
export type TipoRichiesta = 'trattamenti' | 'letture';

export const RICHIESTE = {
  trattamenti: {
    href: PRENOTA_HREF,
    label: 'Prenota un trattamento',
    breve: 'Prenota',
    sospesa: PRENOTAZIONI.trattamenti === 'sospese',
  },
  letture: {
    href: LETTURA_HREF,
    label: 'Richiedi una lettura',
    breve: 'Lettura',
    sospesa: PRENOTAZIONI.letture === 'sospese',
  },
} as const satisfies Record<TipoRichiesta, { href: string; label: string; breve: string; sospesa: boolean }>;

export const AVVISAMI = 'Avvisami quando riapro';

/**
 * L'etichetta del bottone di una richiesta. Sospesa: "Avvisami quando
 * riapro" (con `contesto`, dove le due richieste stanno vicine: "… i
 * trattamenti", "… le letture"); `breve` per header e barra.
 */
export function etichetta(tipo: TipoRichiesta, opts: { breve?: boolean; contesto?: boolean } = {}): string {
  const r = RICHIESTE[tipo];
  if (r.sospesa) {
    if (opts.breve) return 'Avvisami';
    return opts.contesto ? `${AVVISAMI} ${tipo === 'trattamenti' ? 'i trattamenti' : 'le letture'}` : AVVISAMI;
  }
  return opts.breve ? r.breve : r.label;
}

/** La riga che spiega la sospensione (con la nota di Silvia, se c'è). BOZZA */
export function rigaSospensione(tipo: TipoRichiesta): string {
  const cosa = tipo === 'trattamenti' ? 'Le prenotazioni dei trattamenti' : 'Le richieste di lettura';
  return `${cosa} sono sospese per qualche tempo.${NOTA_SOSPENSIONE ? ` ${NOTA_SOSPENSIONE}.` : ''} Lasciami la tua email: ti scrivo io quando riapro.`;
}
