import { notFound } from 'next/navigation';
import LetturaInline from '@/components/flows/LetturaInline';
import PaginaRichiesta from '@/components/flows/PaginaRichiesta';
import { DAL_MODULO, RICHIESTE, rigaSospensione } from '@/lib/richieste';
import { pageMetadata } from '@/lib/seo';
import { LETTURA } from '@/lib/trattamenti';

export const metadata = pageMetadata({
  title: 'Richiedi una lettura',
  description: `Richiedi ${LETTURA.frase}: scegli il tema, ricevi via email la foto della stesa e l'interpretazione.`,
  path: '/prenota/lettura',
});

/**
 * «Richiedi una lettura» in pagina, con il disclaimer integrale accanto.
 * C'è solo con le richieste dal sito (RICHIESTE_DAL = 'sito').
 */
export default function LetturaPage() {
  if (DAL_MODULO) notFound();
  return (
    <PaginaRichiesta
      titolo={
        <>
          Richiedi una <em>lettura</em>
        </>
      }
      // BOZZA
      testo={RICHIESTE.letture.sospesa ? rigaSospensione('letture') : 'Scegli il tema, io preparo la stesa: ti arriva via email.'}
      dopo={<p className="mt-4 border-l border-[var(--line-strong)] pl-4 text-[14.5px] text-[var(--fg-mute)]">{LETTURA.disclaimer}</p>}
    >
      <LetturaInline />
    </PaginaRichiesta>
  );
}
