import Esempio from '@/components/ui/Esempio';
import SectionHead from '@/components/ui/SectionHead';
import { RECENSIONI_D } from '@/lib/anteprima';

/**
 * Le recensioni: solo vere, citate con il permesso di chi le ha scritte
 * (RECENSIONI in src/lib/site.ts). Senza, il blocco non compare; in
 * anteprima c'è con tre segnaposto dichiarati.
 */
export default function Recensioni({ className = 'fondo-cipria' }: { className?: string }) {
  if (!RECENSIONI_D) return null;
  const { valore, esempio } = RECENSIONI_D;
  return (
    <section className={`section ${className}`} aria-labelledby="recensioni-titolo">
      <div className="wrap">
        <div className="flex flex-col items-start gap-4">
          {/* BOZZA */}
          <SectionHead id="recensioni-titolo" eyebrow="Recensioni" title="Dicono di" script="Lily" />
          {esempio && <Esempio cosa="recensioni vere, con il permesso" />}
        </div>
        <ul className="colonne-filetto mt-12" data-reveal="stagger">
          {valore.map((r, i) => (
            <li key={i} className="recensione">
              <blockquote className="citazione">{r.testo}</blockquote>
              <p className="recensione-chi">
                {r.nome} · {r.fonte}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
