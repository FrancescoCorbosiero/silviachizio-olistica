import Link from 'next/link';
import type { ReactNode } from 'react';
import { CalendarHeart } from 'lucide-react';
import BottoniRichiesta from '@/components/ui/BottoniRichiesta';
import { etichetta, RICHIESTE, type TipoRichiesta } from '@/lib/richieste';

/**
 * La chiusura di ogni pagina (sul modello di CtaBand di andrea-bellettati):
 * su fondo notte, le due richieste un'ultima volta. Il giglio spunta dal
 * fondo della sezione (data-peek); su desktop il badge rotondo "Prenota",
 * con l'anello di testo che gira, è attirato dal puntatore (data-magnetic).
 */
export default function Chiusura({
  eyebrow,
  title,
  lead,
  prima = 'trattamenti',
  id = 'chiusura-titolo',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  prima?: TipoRichiesta;
  id?: string;
}) {
  const badge = etichetta('trattamenti', { contesto: true }).toLowerCase();
  return (
    <section className="notte on-notte relative isolate overflow-hidden pb-[clamp(120px,16vw,200px)] pt-[clamp(72px,10vw,128px)]" aria-labelledby={id}>
      <div className="luce-candela -left-24 top-0 w-[min(560px,120vw)] opacity-70" aria-hidden />
      <div className="wrap relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col items-start gap-6">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 id={id} className="display-lg max-w-[13em]" data-split>
            {title}
          </h2>
          {lead && <p className="lead misura">{lead}</p>}
          <BottoniRichiesta prima={prima} tono="notte" />
        </div>
        <Link
          href={RICHIESTE.trattamenti.href}
          className="badge-prenota hidden lg:grid"
          data-magnetic
          aria-hidden
          tabIndex={-1}
        >
          <svg className="anello" viewBox="0 0 200 200" data-spin aria-hidden>
            <defs>
              <path id="anello-badge" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" />
            </defs>
            <text>
              <textPath href="#anello-badge" textLength="482" lengthAdjust="spacing">
                {`${badge} · ${badge} · `}
              </textPath>
            </text>
          </svg>
          <span className="badge-core">
            <CalendarHeart size={30} strokeWidth={1.6} aria-hidden />
          </span>
        </Link>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-[6%] w-[clamp(200px,30vw,380px)] overflow-hidden" aria-hidden>
        <div data-peek>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/giglio-notte.svg" alt="" width={240} height={180} loading="lazy" decoding="async" className="h-auto w-full translate-y-[18%] opacity-90" />
        </div>
      </div>
    </section>
  );
}
