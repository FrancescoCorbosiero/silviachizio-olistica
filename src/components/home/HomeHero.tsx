import Giglio from '@/components/brand/Giglio';
import BottoniRichiesta from '@/components/ui/BottoniRichiesta';
import { PETALO_SVG } from '@/components/brand/Petalo';
import { ZONA } from '@/lib/site';

const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;

/** I petali che ondeggiano intorno al cerchio (data-float). */
const PETALI = [
  { posto: 'left-[2%] top-[14%] w-5 text-petalo', giro: 'rotate-[-24deg]' },
  { posto: 'right-[4%] top-[6%] w-4 text-lily-bright', giro: 'rotate-[30deg]' },
  { posto: 'right-[-2%] bottom-[26%] w-6 text-petalo', giro: 'rotate-[64deg]' },
  { posto: 'left-[8%] bottom-[8%] w-4 text-lily', giro: 'rotate-[-60deg]' },
];

/**
 * Hero della home (docs/spec.md, "Home"): titolo con una parola scritta a
 * mano, Silvia che si presenta in due righe, le due richieste, tre fatti
 * brevi e veri. Accanto (sotto, su telefono) il cerchio con l'anello di
 * testo che gira (data-spin), il giglio che si disegna, i petali che
 * ondeggiano (data-float) e il bagliore che respira. Su desktop, petali
 * dietro al puntatore (data-petal-trail). Finché non c'è la foto di Silvia,
 * nel cerchio c'è il giglio.
 */
export default function HomeHero() {
  return (
    <section className="relative isolate overflow-x-clip pb-[clamp(56px,8vw,112px)] pt-[clamp(24px,5vw,72px)]" data-petal-trail aria-labelledby="hero-titolo">
      <div className="alone left-[64%] top-[46%] w-[min(760px,150vw)] -translate-x-1/2 -translate-y-1/2" aria-hidden />
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <p className="eyebrow intro">Lily Trattamenti Benessere · {ZONA}</p>
          <h1 id="hero-titolo" className="display-xl intro" style={d(0.08)}>
            Un&apos;ora per <span className="script">te</span>
          </h1>
          {/* BOZZA */}
          <p className="lead misura intro" style={d(0.2)}>
            Sono Silvia. Nel mio studio a Montebelluna ti aspetto per un massaggio o un rituale olistico; e, a distanza,
            preparo letture intuitive personalizzate.
          </p>
          <div className="intro" style={d(0.32)}>
            <BottoniRichiesta />
          </div>
          <ul className="intro flex flex-wrap gap-2" style={d(0.44)} aria-label="In breve">
            <li className="pill">{ZONA}</li>
            <li className="pill">Quattro trattamenti</li>
            <li className="pill">Letture a distanza</li>
          </ul>
        </div>

        <div className="relative mx-auto w-[min(440px,84vw)]">
          <div className="relative aspect-square">
            <div className="foto-cerchio foto-vuota absolute inset-[12%] shadow-[var(--shadow-petalo-l)]">
              <Giglio className="draw w-[80%] translate-y-[-3%]" title="Il giglio di Lily" />
            </div>
            <svg className="anello" viewBox="0 0 200 200" data-spin aria-hidden>
              <defs>
                <path id="anello-hero" d="M100 100m-88 0a88 88 0 1 1 176 0a88 88 0 1 1-176 0" />
              </defs>
              <text>
                <textPath href="#anello-hero" textLength="548" lengthAdjust="spacing">
                  trattamenti benessere · Montebelluna · trattamenti benessere · Montebelluna ·
                </textPath>
              </text>
            </svg>
            {/* Il motore fa ondeggiare il contenitore; la rotazione sta dentro. */}
            {PETALI.map((p, i) => (
              <span key={i} className={`absolute ${p.posto}`} data-float aria-hidden>
                <span className={`block ${p.giro}`} dangerouslySetInnerHTML={{ __html: PETALO_SVG }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
