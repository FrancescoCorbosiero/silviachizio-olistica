import Link from 'next/link';
import DivisoreLoto from '@/components/brand/DivisoreLoto';
import Listino from '@/components/brand/Listino';
import { ArrowIcon } from '@/components/icons';

/**
 * Il listino in home, come nell'immagine di Silvia: «LISTINO TRATTAMENTI»,
 * «Quattro esperienze di benessere» sulla pennellata, le quattro righe (le
 * icone entrano con un pop) e la fascia del relax. Ogni riga porta alla sua
 * sezione di /trattamenti.
 */
export default function ListinoHome() {
  return (
    <section className="section" aria-labelledby="listino-titolo">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-28">
          <h2 id="listino-titolo" className="display-lg manifesto leading-[0.98]" data-split="wipe">
            Listino
            <br />
            <span className="text-lily">Trattamenti</span>
          </h2>
          <p>
            <span className="pennellata text-[clamp(19px,2vw,23px)]">Quattro esperienze di benessere</span>
          </p>
          {/* BOZZA */}
          <p className="lead misura">Scegli quella che ti somiglia di più. Se non sai quale, nella richiesta puoi lasciar scegliere a me.</p>
          <Link className="btn btn-outline" href="/trattamenti">
            Tutti i dettagli <ArrowIcon size={15} />
          </Link>
        </div>
        <div className="petalo p-5 sm:p-8" data-reveal>
          <DivisoreLoto className="mb-4" />
          <Listino linkSezioni />
        </div>
      </div>
    </section>
  );
}
