import { FasciaRelax } from '@/components/brand/Listino';

/**
 * Il momento relax: la frase sui quindici minuti dopo il trattamento si
 * accende parola per parola con lo scroll (data-scrub).
 */
export default function MomentoRelax({ disteso = false }: { disteso?: boolean }) {
  return (
    <section className="section relative isolate overflow-x-clip" aria-labelledby="relax-titolo">
      <div className="alone left-[12%] top-1/2 w-[min(620px,130vw)] -translate-y-1/2 opacity-70" aria-hidden />
      <div className="wrap">
        <p className="eyebrow">Il momento relax</p>
        {/* BOZZA */}
        <h2 id="relax-titolo" data-scrub className="mt-6 max-w-[17em] font-serif text-[clamp(30px,4.4vw,58px)] font-bold leading-[1.12] tracking-[-0.01em]">
          Dopo il trattamento non scappi via: ci sono quindici minuti solo per te, per tornare alla giornata con calma.
        </h2>
        {disteso && (
          // BOZZA
          <p className="lead misura mt-8">
            Il tempo di riaprire gli occhi, senza fretta. È compreso in ogni trattamento.
          </p>
        )}
        <FasciaRelax className="mt-10 w-fit" />
      </div>
    </section>
  );
}
