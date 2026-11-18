import { DAL_MODULO, SU_INSTAGRAM } from './richieste';
import { HAS_INDIRIZZO, INDIRIZZO_DISPLAY } from './site';
import { RELAX_MINUTI } from './trattamenti';

/**
 * Le domande frequenti della landing (e dei dati strutturati FAQPage).
 * BOZZE nella forma, vere nella sostanza: solo risposte che si sanno già
 * (docs/testi-da-validare.md).
 */
export const DOMANDE: readonly { q: string; a: string }[] = [
  {
    q: 'Quanto dura un trattamento?',
    a: `Da 60 a 75 minuti, a seconda del trattamento. Dopo ognuno c'è un momento relax di circa ${RELAX_MINUTI} minuti, già compreso.`,
  },
  {
    q: 'Dove si trova lo studio?',
    a: HAS_INDIRIZZO ? `A Montebelluna: ${INDIRIZZO_DISPLAY}.` : 'A Montebelluna, in provincia di Treviso.',
  },
  {
    q: 'Come prenoto?',
    a: SU_INSTAGRAM.trattamenti
      ? 'Scrivimi un messaggio su Instagram: dimmi il trattamento che ti interessa e quando ti va, e fissiamo insieme giorno e ora. Per una lettura c’è il mio modulo, con «Richiedi una lettura».'
      : DAL_MODULO
      ? 'Con «Prenota un trattamento»: si apre il mio modulo, mi lasci la richiesta e ti scrivo io per fissare giorno e ora. Se preferisci, scrivimi su Instagram.'
      : 'Dal sito, con «Prenota un trattamento»: scegli il trattamento e quando ti va, lasci nome e telefono e ti scrivo io per fissare giorno e ora. Se preferisci, scrivimi su Instagram.',
  },
  {
    q: 'Non so quale trattamento scegliere: come faccio?',
    a: 'Scrivimelo nella richiesta, o mandami un messaggio su Instagram: ne parliamo insieme e troviamo quello giusto per te.',
  },
  {
    q: 'Le letture si fanno a distanza?',
    a: 'Sì. Ricevi via email la foto della stesa e la mia interpretazione personalizzata, scritta o video.',
  },
];
