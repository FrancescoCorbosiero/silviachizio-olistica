import Link from 'next/link';
import type { ReactNode } from 'react';
import { CalendarHeart } from 'lucide-react';
import BottoniRichiesta from '@/components/ui/BottoniRichiesta';
import Scena from '@/components/ui/Scena';
import type { NomeImmagine } from '@/lib/immagini';
import { etichetta, RICHIESTE, type TipoRichiesta } from '@/lib/richieste';

/**
 * La chiusura di ogni pagina (sul modello di CtaBand di andrea-bellettati):
 * una scena con l'immagine in parallax, il bordino rosa della divisa in
 * alto e le due richieste un'ultima volta. Il giglio spunta dal fondo
 * della sezione (data-peek); su desktop il badge rotondo "Prenota", con
 * l'anello di testo che gira, è attirato dal puntatore (data-magnetic).
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
  const badge = etichetta('trattamenti', { contesto: true }).toLowerCase();
  return (
    <Scena
      immagine={immagine}
      altezza="alta"
      velo="notte"
      className="chiusura pb-[clamp(140px,18vw,220px)]"
      aria-labelledby={id}
      contenuto="grid items-center gap-12 lg:grid-cols-[1fr_auto]"
      sopra={
        <div className="pointer-events-none absolute bottom-0 right-[6%] z-[1] w-[clamp(180px,26vw,340px)] overflow-hidden" aria-hidden>
          <div data-peek>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/giglio-notte.svg" alt="" width={240} height={180} loading="lazy" decoding="async" className="h-auto w-full translate-y-[18%] opacity-80" />
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-start gap-6">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 id={id} className="display-xl max-w-[12em]" data-split>
          {title}
        </h2>
        {lead && <p className="lead misura">{lead}</p>}
        <BottoniRichiesta prima={prima} tono="notte" />
      </div>
      <Link href={RICHIESTE.trattamenti.href} className="badge-prenota hidden lg:grid" data-magnetic aria-hidden tabIndex={-1}>
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
    </Scena>
  );
}
