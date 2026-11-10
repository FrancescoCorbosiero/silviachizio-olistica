import BottoniRichiesta from '@/components/ui/BottoniRichiesta';
import Scena from '@/components/ui/Scena';
import { ZONA } from '@/lib/site';

const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;

/**
 * Hero della home (docs/spec.md, "Home"): uno schermo intero con la luce
 * del pomeriggio e le ombre dei gigli sul muro (Scena, in parallax), il
 * titolo, Silvia che si presenta in due righe, le due richieste e tre fatti
 * brevi e veri. Scorrendo, il testo si allontana piano (data-hero-away).
 * Quando arriva la foto dello studio, si cambia in src/lib/immagini.ts.
 */
export default function HomeHero() {
  return (
    <Scena immagine="luce" altezza="piena" velo="sinistra" priorita aria-labelledby="hero-titolo" contenuto="flex flex-col justify-end self-stretch md:justify-center">
      <div className="flex max-w-[640px] flex-col items-start gap-6 pt-[22svh] md:pt-0" data-hero-away="10">
        <p className="eyebrow intro">Trattamenti benessere · {ZONA}</p>
        {/* BOZZA */}
        <h1 id="hero-titolo" className="display-xl intro" style={d(0.08)}>
          Uno spazio per <span className="script">rallentare</span>
        </h1>
        {/* BOZZA */}
        <p className="lead misura intro" style={d(0.2)}>
          Sono Silvia. Nel mio studio a Montebelluna ti aspetto per un massaggio o un rituale olistico; e, a distanza,
          preparo letture intuitive personalizzate.
        </p>
        <div className="intro" style={d(0.32)}>
          <BottoniRichiesta tono="notte" />
        </div>
        <ul className="fatti intro mt-4" style={d(0.44)} aria-label="In breve">
          <li>Quattro trattamenti</li>
          <li>Relax compreso</li>
          <li>Letture a distanza</li>
        </ul>
      </div>
    </Scena>
  );
}
