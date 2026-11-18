import { IMMAGINI } from '@/lib/immagini';
import { RELAX_MINUTI, RELAX_TESTO } from '@/lib/trattamenti';

/**
 * Il momento relax: il numero che rende Lily diversa, in grande. Il «15»
 * è pieno di luce (la seta, che scorre piano dentro le cifre leggendo) e
 * accanto la frase sui quindici minuti si accende parola per parola
 * (data-scrub). Sotto, le parole del listino.
 */
export default function Relax() {
  return (
    <section className="tono-vino section overflow-clip" aria-labelledby="relax-titolo">
      <div className="wrap grid items-center gap-x-10 gap-y-10 lg:grid-cols-12">
        <p className="flex items-end gap-4 lg:col-span-6" aria-hidden>
          <span className="quindici cifre" style={{ '--luce': `url(${IMMAGINI.setaChiara.src})` } as React.CSSProperties}>
            {RELAX_MINUTI}
          </span>
          {/* BOZZA */}
          <span className="corsivo mb-[0.6em] text-[clamp(1.4rem,2vw,1.9rem)] leading-tight text-[var(--fg-soft)]">
            minuti
            <br />
            per te
          </span>
        </p>
        <div className="lg:col-span-6">
          {/* BOZZA */}
          <h2 id="relax-titolo" className="titolo !text-[clamp(1.9rem,2.9vw,2.75rem)] !leading-[1.12]" data-scrub>
            Dopo il trattamento non scappi via: ci sono quindici minuti solo per te, per tornare alla giornata con calma.
          </h2>
          <p className="meta mt-8">
            {RELAX_TESTO} · circa {RELAX_MINUTI} minuti
          </p>
        </div>
      </div>
    </section>
  );
}
