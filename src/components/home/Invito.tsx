import Giglio from '@/components/brand/Giglio';
import { BottoneRichiesta } from '@/components/ui/Bottone';
import { ZONA } from '@/lib/site';

/**
 * L'invito finale, sull'asse centrale: il giglio del logo che si disegna,
 * «Ti aspetto», le due richieste un'ultima volta.
 */
export default function Invito() {
  return (
    <section className="tono-vino section overflow-clip text-center" aria-labelledby="invito-titolo">
      <div className="wrap flex flex-col items-center">
        <div className="w-[min(150px,40vw)]" data-draw>
          <Giglio />
        </div>
        {/* BOZZA */}
        <h2 id="invito-titolo" className="titolo mt-7 !text-[clamp(3rem,6vw,5.5rem)]" data-split>
          Ti <em>aspetto</em>
        </h2>
        {/* BOZZA */}
        <p className="lead mx-auto mt-5" data-reveal>
          In studio a {ZONA.replace(' (TV)', '')}, o a distanza con una lettura.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3" data-reveal>
          <BottoneRichiesta tipo="trattamenti" variante="latte" />
          <BottoneRichiesta tipo="letture" variante="vetro" />
        </div>
      </div>
    </section>
  );
}
