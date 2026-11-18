import type { ReactNode } from 'react';
import Giglio from '@/components/brand/Giglio';
import { BottoneRichiesta } from '@/components/ui/Bottone';
import type { TipoRichiesta } from '@/lib/richieste';
import { ZONA } from '@/lib/site';

/**
 * L'invito che chiude ogni pagina, sull'asse centrale: il giglio del logo
 * che si disegna, il titolo, le due richieste un'ultima volta (`prima`
 * decide quale è in evidenza).
 */
export default function Invito({
  titolo = (
    <>
      Ti <em>aspetto</em>
    </>
  ),
  // BOZZA
  testo = `In studio a ${ZONA.replace(' (TV)', '')}, o a distanza con una lettura.`,
  prima = 'trattamenti',
}: {
  titolo?: ReactNode;
  testo?: ReactNode;
  prima?: TipoRichiesta;
}) {
  const altra: TipoRichiesta = prima === 'trattamenti' ? 'letture' : 'trattamenti';
  return (
    <section className="tono-vino section overflow-clip text-center" aria-labelledby="invito-titolo">
      <div className="wrap flex flex-col items-center">
        <div className="w-[min(150px,40vw)]" data-draw>
          <Giglio />
        </div>
        <h2 id="invito-titolo" className="titolo mt-7 !text-[clamp(3rem,6vw,5.5rem)]" data-split>
          {titolo}
        </h2>
        <p className="lead mx-auto mt-5" data-reveal>
          {testo}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3" data-reveal>
          <BottoneRichiesta tipo={prima} variante="latte" />
          <BottoneRichiesta tipo={altra} variante="vetro" />
        </div>
      </div>
    </section>
  );
}
