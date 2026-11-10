import { Camera, Cat, Flower2, Leaf, Mountain, Music, PenLine, Plane, Waves } from 'lucide-react';
import { IconaGiglio, IconaLoto, InstagramIcon } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import Chiusura from '@/components/ui/Chiusura';
import SchedaInstagram from '@/components/ui/SchedaInstagram';
import SectionHead from '@/components/ui/SectionHead';
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
      <section className="relative isolate overflow-x-clip pb-[clamp(48px,7vw,96px)] pt-[clamp(28px,5vw,72px)]" aria-labelledby="chi-titolo">
        <div className="alone left-[30%] top-1/2 w-[min(700px,140vw)] -translate-x-1/2 -translate-y-1/2" aria-hidden />
        <div className="wrap">
          <div className="petalo mx-auto grid max-w-[900px] items-center gap-8 p-7 sm:p-10 md:grid-cols-[auto_1fr] md:gap-12">
            <div className="intro-fade mx-auto w-[min(240px,62vw)]">
              <div className="foto-cerchio foto-vuota aspect-square shadow-[var(--shadow-petalo)] ring-4 ring-cipria" data-love>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/giglio.svg" alt="" width={240} height={180} className="h-auto w-[78%]" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="eyebrow intro">Chi sono</p>
              <h1 id="chi-titolo" className="display-lg intro" style={{ '--d': '0.1s' } as React.CSSProperties}>
                {OWNER_NAME}
              </h1>
              <p className="intro font-script text-[clamp(34px,4.6vw,48px)] leading-none text-lily" style={{ '--d': '0.22s' } as React.CSSProperties}>
                Vivo e sorrido
              </p>
              <ul className="intro flex flex-wrap gap-2" style={{ '--d': '0.34s' } as React.CSSProperties} aria-label="In breve">
                <li className="pill">Lily Trattamenti Benessere</li>
                <li className="pill">{ZONA}</li>
              </ul>
              <a className="btn btn-outline btn-sm intro" style={{ '--d': '0.44s' } as React.CSSProperties} href={IG_URL} target="_blank" rel="noopener">
                <InstagramIcon size={16} /> {IG_HANDLE}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="storia-titolo">
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

      <section className="section-tight" aria-labelledby="amo-titolo">
        <div className="wrap">
          <SectionHead id="amo-titolo" eyebrow="Dalla mia bio" title="Le cose che" script="amo" align="center" />
          <ul className="mx-auto mt-10 grid max-w-[900px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" data-reveal="stagger">
            {PASSIONI.map(({ nome, Icona }) => (
              <li key={nome} className="petalo flex flex-col items-center gap-3 px-3 py-6 text-center">
                <span className="cerchio" data-pop>
                  <Icona size={26} strokeWidth={1.75} aria-hidden />
                </span>
                <span className="font-semibold">{nome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(SILVIA.percheLily || SILVIA.formazione.length > 0) && (
        <section className="section-tight" aria-label="Perché Lily e formazione">
          <div className="wrap grid gap-6 md:grid-cols-2">
            {SILVIA.percheLily && (
              <div className="petalo p-7">
                <h2 className="display-sm">
                  Perché <span className="script">Lily</span>
                </h2>
                <p className="mt-4">{SILVIA.percheLily}</p>
              </div>
            )}
            {SILVIA.formazione.length > 0 && (
              <div className="petalo p-7">
                <h2 className="display-sm">Formazione</h2>
                <ul className="elenco mt-4">
                  {SILVIA.formazione.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section-tight" aria-labelledby="ig-titolo">
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
