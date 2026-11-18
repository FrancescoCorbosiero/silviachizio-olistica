import { notFound } from 'next/navigation';
import PaginaRichiesta from '@/components/flows/PaginaRichiesta';
import PrenotaInline from '@/components/flows/PrenotaInline';
import { DAL_MODULO, RICHIESTE, rigaSospensione } from '@/lib/richieste';
import { pageMetadata } from '@/lib/seo';
import { ZONA } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Prenota un trattamento',
  // BOZZA
  description: `Chiedi un trattamento a ${ZONA}: scegli dal listino, dimmi quando ti va e ti scrivo io per fissare giorno e ora.`,
  path: '/prenota',
});

/**
 * «Prenota un trattamento» in pagina. C'è solo con le richieste dal sito
 * (RICHIESTE_DAL = 'sito'); con il modulo Google la pagina non esiste.
 */
export default function PrenotaPage() {
  if (DAL_MODULO) notFound();
  return (
    <PaginaRichiesta
      titolo={
        <>
          Prenota un <em>trattamento</em>
        </>
      }
      // BOZZA
      testo={RICHIESTE.trattamenti.sospesa ? rigaSospensione('trattamenti') : 'Scegli il trattamento e dimmi quando ti va: ti scrivo io per fissare giorno e ora.'}
    >
      <PrenotaInline />
    </PaginaRichiesta>
  );
}
