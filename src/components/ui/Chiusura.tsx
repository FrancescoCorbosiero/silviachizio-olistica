import type { ReactNode } from 'react';
import BottoniRichiesta from '@/components/ui/BottoniRichiesta';
import Scena from '@/components/ui/Scena';
import type { NomeImmagine } from '@/lib/immagini';
import type { TipoRichiesta } from '@/lib/richieste';

/**
 * La chiusura di ogni pagina (sul modello di CtaBand di andrea-bellettati):
 * una scena a tutto schermo con l'immagine in parallax e le due richieste
 * un'ultima volta, col bordino rosa della divisa in alto.
 */
export default function Chiusura({
  eyebrow,
  title,
  lead,
  prima = 'trattamenti',
  id = 'chiusura-titolo',
  immagine = 'luceSpecchio',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  prima?: TipoRichiesta;
  id?: string;
  immagine?: NomeImmagine;
}) {
  return (
    <Scena immagine={immagine} altezza="alta" velo="notte" className="chiusura" aria-labelledby={id} contenuto="flex flex-col items-center text-center">
      <div className="flex max-w-[760px] flex-col items-center gap-6">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 id={id} className="display-xl" data-split>
          {title}
        </h2>
        {lead && <p className="lead misura">{lead}</p>}
        <BottoniRichiesta prima={prima} tono="notte" className="justify-center" />
      </div>
    </Scena>
  );
}
