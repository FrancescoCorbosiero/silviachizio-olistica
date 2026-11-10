import Giglio from '@/components/brand/Giglio';
import BottoniRichiesta from '@/components/ui/BottoniRichiesta';
import Scena from '@/components/ui/Scena';
import { VIDEO_HERO } from '@/lib/immagini';
import { ZONA } from '@/lib/site';

const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;

/**
 * Hero della home (docs/spec.md, "Home"): uno schermo intero con il video
 * della luce e delle ombre dei gigli sul muro (il primo fotogramma è
 * l'immagine sotto: senza script o con "riduci movimento" resta lei), il
 * titolo, Silvia che si presenta in due righe, le due richieste e tre
 * fatti brevi e veri. Nell'angolo il sigillo: il giglio che si disegna e
 * l'anello di testo che gira con lo scroll (data-spin). Scorrendo, il
 * testo si allontana piano (data-hero-away).
 */
export default function HomeHero() {
  return (
    <Scena
      immagine="heroVideo"
      video={VIDEO_HERO}
      altezza="piena"
      velo="sinistra"
      priorita
      aria-labelledby="hero-titolo"
      contenuto="flex flex-col justify-end self-stretch md:justify-center"
      sopra={
        <div className="sigillo-posto" aria-hidden>
          <div className="sigillo intro-fade" style={d(0.6)}>
            <svg className="anello" viewBox="0 0 200 200" data-spin>
              <defs>
                <path id="anello-hero" d="M100 100m-86 0a86 86 0 1 1 172 0a86 86 0 1 1-172 0" />
              </defs>
              <text>
                <textPath href="#anello-hero" textLength="536" lengthAdjust="spacing">
                  Trattamenti benessere · {ZONA.replace(' (TV)', '')} · Letture intuitive ·
                </textPath>
              </text>
            </svg>
            <Giglio className="draw" />
          </div>
        </div>
      }
    >
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
