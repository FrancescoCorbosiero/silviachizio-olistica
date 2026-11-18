import Esempio from '@/components/ui/Esempio';
import { RECENSIONI_D } from '@/lib/anteprima';

/**
 * Le recensioni: solo vere, citate con il permesso di chi le ha scritte
 * (RECENSIONI in src/lib/site.ts). Senza, il blocco non compare; in
 * anteprima c'è, con tre segnaposto dichiarati.
 */
export default function Recensioni() {
  if (!RECENSIONI_D) return null;
  const { valore, esempio } = RECENSIONI_D;
  return (
    <section className="tono-latte section" aria-labelledby="recensioni-titolo">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          {/* BOZZA */}
          <h2 id="recensioni-titolo" className="titolo" data-split>
            Dicono di <em>Lily</em>
          </h2>
          {esempio && <Esempio cosa="recensioni vere, con il permesso" />}
        </div>
        <ul className="mt-[clamp(40px,5vw,72px)] grid border-t border-[var(--line-strong)] md:grid-cols-3" data-reveal="stagger">
          {valore.map((r, i) => (
            <li key={i} className="flex flex-col justify-between gap-8 border-b border-[var(--line)] py-9 md:border-b-0 md:px-8 md:first:pl-0 md:[&+&]:border-l">
              <blockquote className="corsivo text-[clamp(1.35rem,1.9vw,1.75rem)] leading-[1.3]">
                <span aria-hidden className="text-[var(--accent)]">“</span>
                {r.testo}
                <span aria-hidden className="text-[var(--accent)]">”</span>
              </blockquote>
              <p className="meta">
                {r.nome} · {r.fonte}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
