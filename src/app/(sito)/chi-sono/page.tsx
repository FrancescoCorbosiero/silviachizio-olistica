import { Camera, Cat, Flower2, Leaf, Mountain, Music, PenLine, Plane, Waves } from 'lucide-react';
import { IconaGiglio, IconaLoto, InstagramIcon } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import Chiusura from '@/components/ui/Chiusura';
import Esempio from '@/components/ui/Esempio';
import SchedaInstagram from '@/components/ui/SchedaInstagram';
import Scena from '@/components/ui/Scena';
import SectionHead from '@/components/ui/SectionHead';
import { FORMAZIONE, PERCHE_LILY, PERCORSO } from '@/lib/anteprima';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { IG_HANDLE, IG_URL, OWNER_NAME, SILVIA, STORIE_IN_EVIDENZA, ZONA } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Chi sono',
  // BOZZA
  description: `Sono Silvia Chizio: vivo e sorrido. A ${ZONA} ti aspetto con Lily Trattamenti Benessere; a distanza, preparo letture intuitive personalizzate.`,
  path: '/chi-sono',
});

/** Le cose che amo: le emoji della bio di Silvia diventano icone a linea. */
const PASSIONI = [
  { nome: 'Natura', Icona: Leaf },
  { nome: 'Meditazione', Icona: IconaLoto },
  { nome: 'Fiori', Icona: Flower2 },
  { nome: 'Gatti', Icona: Cat },
  { nome: 'Arrampicata', Icona: Mountain },
  { nome: 'Surf', Icona: Waves },
  { nome: 'Ballo', Icona: Music },
  { nome: 'Viaggi', Icona: Plane },
  { nome: 'Fotografia', Icona: Camera },
  { nome: 'Scrittura', Icona: PenLine },
] as const;

/**
 * Chi sono (docs/spec.md): l'hero da biglietto da visita, la storia con le
 * storie in evidenza che si aprono a ventaglio (data-fan), le cose che ama,
 * "perché Lily" e la formazione solo con le parole di Silvia, la chiusura
 * con la scheda Instagram. Le foto arriveranno con il suo permesso: finché
 * mancano, cerchi con il giglio e con le icone.
 */
export default function ChiSonoPage() {
  return (
    <>
      <Scena immagine="luceSpecchio" altezza="alta" velo="basso" priorita aria-labelledby="chi-titolo" contenuto="flex flex-col justify-end self-stretch">
        <div className="flex flex-col items-start gap-5 pt-[30svh]" data-hero-away="10">
          <p className="eyebrow intro">Chi sono · {ZONA}</p>
          <h1 id="chi-titolo" className="display-xl intro" style={{ '--d': '0.1s' } as React.CSSProperties}>
            {OWNER_NAME}
          </h1>
          <p className="corsivo intro text-[clamp(26px,3.4vw,40px)] leading-none text-petalo" style={{ '--d': '0.22s' } as React.CSSProperties}>
            Vivo e sorrido
          </p>
          <a className="btn btn-outline-latte btn-sm intro mt-2" style={{ '--d': '0.34s' } as React.CSSProperties} href={IG_URL} target="_blank" rel="noopener">
            <InstagramIcon size={16} /> {IG_HANDLE}
          </a>
        </div>
      </Scena>

      <section className="section fondo-blush" aria-labelledby="storia-titolo">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <SectionHead id="storia-titolo" eyebrow="La mia storia" title="Un tocco di" script="magia" />
            {SILVIA.storia.length > 0 ? (
              SILVIA.storia.map((p) => (
                <p key={p} className="lead misura">
                  {p}
                </p>
              ))
            ) : (
              // BOZZA: da sostituire con le parole di Silvia (domande aperte).
              <p className="lead misura">
                Arrampico, viaggio, scrivo e fotografo: le mie giornate le racconto su Instagram, nelle storie in evidenza.
                Con Lily porto un po&apos; di quella energia nello studio di Montebelluna.
              </p>
            )}
          </div>
          {/* Le storie in evidenza del profilo, che si aprono a ventaglio (data-fan). */}
          <ul className="relative grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-6" data-fan aria-label="Le mie storie in evidenza su Instagram">
            {STORIE_IN_EVIDENZA.map((s, i) => (
              <li key={s} className="flex flex-col items-center gap-2 text-center" data-fan-item>
                <span className="grid aspect-square w-full max-w-[110px] place-items-center rounded-full p-[3px] [background:linear-gradient(135deg,var(--color-candela),var(--color-lily),var(--color-lily-deep))]">
                  <span className={`grid h-full w-full place-items-center rounded-full ${i % 2 ? 'bg-blush' : 'bg-cipria'} text-lily`}>
                    <IconaGiglio size={30} />
                  </span>
                </span>
                <span className="text-[14.5px] font-semibold" data-fan-label>
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {PERCORSO && (
        <section className="section" aria-labelledby="percorso-titolo">
          <div className="wrap">
            <div className="flex flex-col items-center gap-4 text-center">
              {/* BOZZA */}
              <SectionHead id="percorso-titolo" eyebrow="Il mio percorso" title="Passo dopo" script="passo" align="center" />
              {PERCORSO.esempio && <Esempio cosa="le tappe di Silvia" />}
            </div>
            {/* Il sentiero (data-trail): un tratteggio passa per i punti delle tappe e le foglie lo percorrono scorrendo. */}
            <div className="sentiero mt-14" data-trail>
              <svg className="sentiero-svg" aria-hidden data-trail-svg>
                <path data-trail-path />
              </svg>
              <div className="sentiero-foglie" aria-hidden data-trail-leaves />
              <ol className="relative flex flex-col gap-12 md:gap-6">
                {PERCORSO.valore.map((p, i) => (
                  <li key={`${p.titolo}-${i}`} className="tappa" data-trail-step>
                    <span className="tappa-punto" data-trail-stop aria-hidden />
                    <div>
                      <p className="eyebrow">{p.quando}</p>
                      <h3 className="display-sm mt-3">{p.titolo}</h3>
                      <p className="testo-mute mt-2">{p.testo}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      <section className="section fondo-vino on-notte" aria-labelledby="amo-titolo">
        <div className="wrap">
          <SectionHead id="amo-titolo" eyebrow="Dalla mia bio" title="Le cose che" script="amo" align="center" />
          <ul className="mx-auto mt-12 grid max-w-[1000px] grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-petalo)] bg-latte/15 sm:grid-cols-3 lg:grid-cols-5" data-reveal="stagger">
            {PASSIONI.map(({ nome, Icona }) => (
              <li key={nome} className="flex flex-col items-center gap-4 bg-vino px-3 py-8 text-center">
                <span className="text-petalo" data-pop>
                  <Icona size={34} strokeWidth={1.4} aria-hidden />
                </span>
                <span className="font-serif text-[19px] italic">{nome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(PERCHE_LILY || FORMAZIONE) && (
        <section className="section" aria-label="Perché Lily e formazione">
          <div className="wrap grid items-start gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
            {PERCHE_LILY && (
              <div className="flex flex-col items-start gap-5">
                <h2 className="display-lg">
                  Perché <span className="script">Lily</span>
                </h2>
                <p className="citazione">{PERCHE_LILY.valore}</p>
                {PERCHE_LILY.esempio && <Esempio cosa="le parole di Silvia" />}
              </div>
            )}
            {FORMAZIONE && (
              <div className="flex flex-col items-start gap-5">
                <h2 className="display-md">Formazione</h2>
                <ul className="righe w-full">
                  {FORMAZIONE.valore.map((f, i) => (
                    <li key={`${f}-${i}`} className="py-4 text-[17px]">
                      {f}
                    </li>
                  ))}
                </ul>
                {FORMAZIONE.esempio && <Esempio cosa="corsi e certificazioni" />}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section fondo-blush" aria-labelledby="ig-titolo">
        <div className="wrap grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <SectionHead
            id="ig-titolo"
            eyebrow="Su Instagram"
            // BOZZA
            title="Mi trovi"
            script="qui"
            lead="Il mio profilo è il posto dove racconto Lily e la mia vita: scrivimi un messaggio quando vuoi."
          />
          <SchedaInstagram />
        </div>
      </section>

      <Chiusura
        eyebrow="Ti aspetto"
        // BOZZA
        title={
          <>
            Ci vediamo <span className="script">presto</span>
          </>
        }
        lead="In studio a Montebelluna, o a distanza con una lettura."
        immagine="velo"
      />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Chi sono', path: '/chi-sono' },
        ])}
      />
    </>
  );
}
