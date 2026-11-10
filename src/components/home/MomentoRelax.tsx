import { FasciaRelax } from '@/components/brand/Listino';
import Scena from '@/components/ui/Scena';

/**
 * Il momento relax: su uno schermo di seta, la frase sui quindici minuti
 * dopo il trattamento si accende parola per parola con lo scroll
 * (data-scrub).
 */
export default function MomentoRelax({ disteso = false }: { disteso?: boolean }) {
  return (
    <Scena immagine="setaChiara" altezza="alta" velo="vino" aria-labelledby="relax-titolo">
      <p className="eyebrow">Il momento relax</p>
      {/* BOZZA */}
      <h2 id="relax-titolo" data-scrub className="mt-6 max-w-[17em] font-serif text-[clamp(30px,4.4vw,58px)] font-bold leading-[1.12] tracking-[-0.01em]">
        Dopo il trattamento non scappi via: ci sono quindici minuti solo per te, per tornare alla giornata con calma.
      </h2>
      {disteso && (
        // BOZZA
        <p className="lead misura mt-8">Il tempo di riaprire gli occhi, senza fretta. È compreso in ogni trattamento.</p>
      )}
      <FasciaRelax className="mt-10 w-fit" />
    </Scena>
  );
}
