import { Camera, Cat, Flower2, Leaf, Mountain, Music, PenLine, Plane, Waves } from 'lucide-react';
import type { ComponentType } from 'react';
import { IconaGiglio, IconaLoto } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import Bottone from '@/components/ui/Bottone';
import Esempio from '@/components/ui/Esempio';
import Invito from '@/components/ui/Invito';
import PageHero from '@/components/ui/PageHero';
import SchedaInstagram from '@/components/ui/SchedaInstagram';
import { FORMAZIONE, PERCHE_LILY, PERCORSO, RITRATTO } from '@/lib/anteprima';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { CITTA, IG_HANDLE, IG_URL, OWNER_NAME, PASSIONI, SILVIA, STORIE_IN_EVIDENZA, ZONA } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Chi sono',
  // BOZZA
  description: `Sono Silvia Chizio: vivo e sorrido. A ${ZONA} ti aspetto con Lily Trattamenti Benessere; a distanza, preparo letture intuitive personalizzate.`,
  path: '/chi-sono',
});

/** Le emoji della bio di Silvia diventano icone a linea (stesso ordine di PASSIONI). */
const ICONE: Record<(typeof PASSIONI)[number], ComponentType<{ size?: number; strokeWidth?: number; 'aria-hidden'?: boolean }>> = {
  Natura: Leaf,
  Meditazione: IconaLoto,
  Fiori: Flower2,
  Gatti: Cat,
  Arrampicata: Mountain,
  Surf: Waves,
  Ballo: Music,
  Viaggi: Plane,
  Fotografia: Camera,
  Scrittura: PenLine,
};

/**
 * Chi sono (docs/spec.md): la testata con il nome e la prima riga della bio,
 * la storia con le storie in evidenza che si aprono a ventaglio (data-fan),
 * il percorso a sentiero (data-trail, con le tappe di Silvia), le cose che
 * ama, "perché Lily" e la formazione solo con le sue parole, Instagram e
 * l'invito. Le foto arriveranno con il suo permesso.
 */
export default function ChiSonoPage() {
  const ritratto = RITRATTO ?? { valore: 'luceSpecchio' as const, esempio: false };
  return (
    <>
      <PageHero
        id="chi-titolo"
        nome="Chi sono"
        titolo={OWNER_NAME}
        testo={
          <>
            {/* La prima riga della bio. */}
            <span className="corsivo block text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-[var(--accent)]">Vivo e sorrido</span>
            {/* BOZZA */}
            <span className="mt-4 block">Lily Trattamenti Benessere, a {CITTA}. E letture intuitive, a distanza.</span>
          </>
        }
        immagine={ritratto.valore}
        esempio={ritratto.esempio ? <Esempio sopra cosa="una foto di Silvia" /> : undefined}
      >
        <Bottone href={IG_URL} variante="linea">
          {IG_HANDLE}
        </Bottone>
      </PageHero>

      <section className="tono-latte section" aria-labelledby="storia-titolo">
        <div className="wrap grid items-center gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            {/* BOZZA */}
            <h2 id="storia-titolo" className="titolo" data-split>
              Un tocco di <em>magia</em>
            </h2>
            <div className="lead mt-7 grid gap-4">
              {SILVIA.storia.length > 0 ? (
                SILVIA.storia.map((p) => <p key={p}>{p}</p>)
              ) : (
                // BOZZA: da sostituire con le parole di Silvia (domande aperte).
                <p>
                  Arrampico, viaggio, scrivo e fotografo: le mie giornate le racconto su Instagram, nelle storie in evidenza. Con
                  Lily porto un po&apos; di quella energia nello studio di {CITTA}.
                </p>
              )}
            </div>
          </div>
          {/* Le storie in evidenza del profilo, che si aprono a ventaglio (data-fan). */}
          <ul
            className="grid grid-cols-3 gap-x-4 gap-y-7 sm:gap-x-6 lg:col-span-5 lg:col-start-8"
            data-fan
            aria-label="Le mie storie in evidenza su Instagram"
          >
            {STORIE_IN_EVIDENZA.map((s, i) => (
              <li key={s} className="flex flex-col items-center gap-2.5 text-center" data-fan-item>
                <span className="grid aspect-square w-full max-w-[104px] place-items-center rounded-full p-[3px] [background:linear-gradient(135deg,var(--color-candela),var(--color-lily),var(--color-vino))]">
                  <span className={`grid h-full w-full place-items-center rounded-full ${i % 2 ? 'bg-sabbia' : 'bg-cipria'} text-lily`}>
                    <IconaGiglio size={28} />
                  </span>
                </span>
                <span className="text-[14px] font-semibold" data-fan-label>
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {PERCORSO && (
        <section className="tono-sabbia section" aria-labelledby="percorso-titolo">
          <div className="wrap grid gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              {/* BOZZA */}
              <h2 id="percorso-titolo" className="titolo lg:sticky lg:top-32" data-split>
                Passo dopo <em>passo</em>
              </h2>
              {PERCORSO.esempio && <Esempio className="mt-4" cosa="le tappe di Silvia" />}
            </div>
            {/* Il sentiero (data-trail): un tratteggio passa per le tappe e le foglie lo percorrono scorrendo. */}
            <div className="sentiero lg:col-span-7 lg:col-start-6" data-trail>
              <svg className="sentiero-svg" aria-hidden data-trail-svg>
                <path data-trail-path />
              </svg>
              <div className="sentiero-foglie" aria-hidden data-trail-leaves />
              <ol className="relative flex flex-col gap-12">
                {PERCORSO.valore.map((p, i) => (
                  <li key={`${p.titolo}-${i}`} className="tappa" data-trail-step>
                    <span className="tappa-punto" data-trail-stop aria-hidden />
                    <div>
                      <p className="meta">{p.quando}</p>
                      <h3 className="titoletto mt-2">{p.titolo}</h3>
                      <p className="mt-2 text-[var(--fg-soft)]">{p.testo}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      <section className="tono-vino section" aria-labelledby="amo-titolo">
        <div className="wrap flex flex-col items-center text-center">
          <h2 id="amo-titolo" className="titolo" data-split>
            Le cose che <em>amo</em>
          </h2>
          <p className="meta mt-4">Dalla mia bio</p>
          <ul className="mt-12 grid w-full max-w-[1000px] grid-cols-2 border-t border-l border-[var(--line)] sm:grid-cols-3 lg:grid-cols-5" data-reveal="stagger">
            {PASSIONI.map((nome) => {
              const Icona = ICONE[nome];
              return (
                <li key={nome} className="flex flex-col items-center gap-4 border-r border-b border-[var(--line)] px-3 py-8">
                  <span className="text-[var(--accent)]">
                    <Icona size={32} strokeWidth={1.4} aria-hidden />
                  </span>
                  <span className="corsivo text-[clamp(1.25rem,1.6vw,1.45rem)]">{nome}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {(PERCHE_LILY || FORMAZIONE) && (
        <section className="tono-latte section" aria-label="Perché Lily e formazione">
          <div className="wrap grid items-start gap-x-10 gap-y-14 lg:grid-cols-12">
            {PERCHE_LILY && (
              <div className="lg:col-span-6">
                <h2 className="titolo" data-split>
                  Perché <em>Lily</em>
                </h2>
                <p className="corsivo mt-7 text-[clamp(1.4rem,2.2vw,1.9rem)] leading-snug text-[var(--fg-soft)]">{PERCHE_LILY.valore}</p>
                {PERCHE_LILY.esempio && <Esempio className="mt-4" cosa="le parole di Silvia" />}
              </div>
            )}
            {FORMAZIONE && (
              <div className="lg:col-span-5 lg:col-start-8">
                <h2 className="titoletto">Formazione</h2>
                <ul className="righe mt-5 border-y border-[var(--line)]">
                  {FORMAZIONE.valore.map((f, i) => (
                    <li key={`${f}-${i}`} className="py-4 text-[16.5px]">
                      {f}
                    </li>
                  ))}
                </ul>
                {FORMAZIONE.esempio && <Esempio className="mt-4" cosa="corsi e certificazioni" />}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="tono-sabbia section" aria-labelledby="ig-titolo">
        <div className="wrap grid items-center gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            {/* BOZZA */}
            <h2 id="ig-titolo" className="titolo" data-split>
              Mi trovi <em>qui</em>
            </h2>
            <p className="lead mt-6" data-reveal>
              Il mio profilo è il posto dove racconto Lily e la mia vita: scrivimi un messaggio quando vuoi.
            </p>
          </div>
          <SchedaInstagram className="w-full max-w-[440px] justify-self-center lg:col-span-5 lg:col-start-8" />
        </div>
      </section>

      <Invito
        // BOZZA
        titolo={
          <>
            Ci vediamo <em>presto</em>
          </>
        }
      />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Lily', path: '/' },
          { name: 'Chi sono', path: '/chi-sono' },
        ])}
      />
    </>
  );
}
