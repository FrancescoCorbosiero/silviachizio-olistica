import LetturaInline from '@/components/flows/LetturaInline';
import { IconaScintilla } from '@/components/icons';
import { Chat, type Messaggio } from '@/components/home/LettureChat';
import JsonLd from '@/components/seo/JsonLd';
import Chiusura from '@/components/ui/Chiusura';
import FaqList from '@/components/ui/FaqList';
import Scena from '@/components/ui/Scena';
import SectionHead from '@/components/ui/SectionHead';
import BottoniRichiesta from '@/components/ui/BottoniRichiesta';
import Esempio from '@/components/ui/Esempio';
import { FOTO_STESA, PREZZO_LETTURA } from '@/lib/anteprima';
import { IMMAGINI } from '@/lib/immagini';
import { breadcrumbLd, faqLd, pageMetadata } from '@/lib/seo';
import { LETTURA, TEMI_LETTURA } from '@/lib/trattamenti';

export const metadata = pageMetadata({
  title: 'Letture intuitive personalizzate, a distanza',
  description: `${LETTURA.nome}: una lettura simbolica e intuitiva personalizzata, via email. Riceverai la foto della stesa e l'interpretazione personalizzata, scritta o video.`,
  path: '/letture',
});


/* BOZZE: "come funziona" raccontato come messaggi diretti. */
const COME: Messaggio[] = [
  { da: 'silvia', testo: 'Scegli il tema che ti sta più a cuore.' },
  { da: 'te', testo: 'Crescita personale' },
  { da: 'silvia', testo: 'Preparo la stesa pensando a te e alla tua domanda.' },
  { da: 'silvia', testo: 'Poi ti mando via email la foto della stesa e la mia interpretazione, scritta o video.' },
];

/* Solo risposte vere (dal form di Silvia). */
const FAQ = [
  {
    q: 'Come ricevo la lettura?',
    a: `Via email: ${LETTURA.riceverai.slice(0, 2).join(' e ')}.`,
  },
  {
    q: 'La lettura sostituisce un parere medico o legale?',
    a: LETTURA.disclaimer,
  },
] as const;

/**
 * Letture intuitive personalizzate (docs/spec.md, "Letture"): la frase del
 * form, cosa ricevi, come funziona come una chat, i temi, la stesa (con la
 * lente, quando c'è la foto), il disclaimer integrale, la richiesta in
 * pagina (#richiesta), le domande con risposte vere e la chiusura.
 */
export default function LetturePage() {
  const stesa = FOTO_STESA;
  const stesaImg = stesa ? IMMAGINI[stesa.valore] : null;
  return (
    <>
      <Scena immagine="candela" altezza="piena" velo="sinistra" priorita aria-labelledby="letture-titolo">
        <div className="flex max-w-[640px] flex-col items-start gap-6" data-hero-away="10">
          <p className="eyebrow intro">Letture intuitive, a distanza</p>
          <h1 id="letture-titolo" className="display-xl intro" style={{ '--d': '0.1s' } as React.CSSProperties}>
            Una lettura tutta per <span className="script">te</span>
          </h1>
          <p className="lead misura intro" style={{ '--d': '0.22s' } as React.CSSProperties}>
            Compila un breve modulo per richiedere {LETTURA.frase}: ti arriva via email.
          </p>
          <div className="intro" style={{ '--d': '0.34s' } as React.CSSProperties}>
            <BottoniRichiesta prima="letture" tono="notte" />
          </div>
          <ul className="fatti intro mt-4" style={{ '--d': '0.46s' } as React.CSSProperties} aria-label="In breve">
            <li>A distanza</li>
            <li>Via email</li>
            <li>Scritta o video</li>
          </ul>
        </div>
      </Scena>

      <section className="section fondo-blush" aria-labelledby="come-titolo">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* BOZZA */}
          <SectionHead id="come-titolo" eyebrow="Come funziona" title="Te lo racconto in" script="quattro messaggi" />
          <Chat messaggi={COME} />
        </div>
      </section>

      <section className="section" aria-labelledby="ricevi-titolo">
        <div className="wrap">
          <SectionHead id="ricevi-titolo" eyebrow="Cosa ricevi" title="Riceverai" script="via email" />
          <ol className="colonne-filetto mt-12" data-reveal="stagger">
            {LETTURA.riceverai.map((r, i) => (
              <li key={r} className="flex flex-col gap-4">
                <span className="numero" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-serif text-[clamp(21px,2.2vw,26px)] font-bold leading-snug first-letter:uppercase">{r}</span>
              </li>
            ))}
          </ol>
          {PREZZO_LETTURA && (
            <p className="mt-10 flex flex-wrap items-center gap-3 text-[18px]">
              <span className="eyebrow">Prezzo</span>
              <span className="font-serif text-[24px] font-bold">{PREZZO_LETTURA.valore}</span>
              {PREZZO_LETTURA.esempio && <Esempio cosa="il prezzo della lettura" />}
            </p>
          )}
        </div>
      </section>

      <Scena immagine="velo" altezza="media" velo="vino" aria-labelledby="temi-titolo" contenuto="flex flex-col items-center text-center">
        <SectionHead id="temi-titolo" eyebrow="I temi" title="Su cosa vuoi fare" script="luce" align="center" size="xl" />
        <ul className="mx-auto mt-10 flex max-w-[860px] flex-wrap justify-center gap-3" data-reveal="stagger">
          {TEMI_LETTURA.map((t) => (
            <li key={t} className="tag-contorno">
              <IconaScintilla size={16} className="text-petalo" /> {t}
            </li>
          ))}
        </ul>
      </Scena>

      {stesa && (
        <section className="section fondo-notte on-notte" aria-labelledby="stesa-titolo">
          <div className="wrap grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="flex flex-col items-start gap-5">
              <SectionHead id="stesa-titolo" eyebrow="La stesa" title="Una stesa" script="vera" />
              <p className="lead misura">
                {/* BOZZA */}
                Così ti arriva: la foto delle carte, come le ho disposte per te, insieme alla mia interpretazione.
              </p>
              <p className="testo-mute hidden text-[15px] lg:block">Passa sopra la foto con il mouse: la lente ingrandisce le carte.</p>
              {stesa.esempio && <Esempio cosa="la foto di una tua stesa vera" />}
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-petalo)]" data-lens={stesaImg?.src}>
              {stesaImg && (
                <picture>
                  <source media="(min-width: 768px)" srcSet={stesaImg.src} />
                  <img
                    src={stesaImg.srcVerticale}
                    alt={stesa.esempio ? 'Foto d’esempio: carte e cristalli su un piano di marmo' : 'Una stesa di Silvia'}
                    width={900}
                    height={1500}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section fondo-cipria" aria-labelledby="disclaimer-titolo">
        <div className="wrap-narrow flex flex-col items-center text-center">
          <span className="eyebrow" id="disclaimer-titolo">
            Da sapere prima di chiedere
          </span>
          <p className="corsivo mt-6 max-w-[30em] text-[clamp(21px,2.2vw,27px)] leading-[1.45]">{LETTURA.disclaimer}</p>
        </div>
      </section>

      <section className="section fondo-blush" aria-labelledby="richiesta-titolo">
        <div className="wrap-narrow">
          <SectionHead id="richiesta-titolo" eyebrow="La richiesta" title="Richiedi la tua" script="lettura" />
          {/* La richiesta in pagina: contiene già id="richiesta" (e l'avviso, se le letture sono sospese). */}
          <div className="mt-8">
            <LetturaInline />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-titolo">
        <div className="wrap grid items-start gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <SectionHead id="faq-titolo" eyebrow="Domande frequenti" title="Prima di" script="chiedere" />
          </div>
          <FaqList items={FAQ} />
        </div>
      </section>

      <Chiusura
        eyebrow="Letture a distanza"
        // BOZZA
        title={
          <>
            Scegli il tema, io preparo la <span className="script">stesa</span>
          </>
        }
        lead="E se sei in zona, ti aspetto anche in studio a Montebelluna."
        prima="letture"
        immagine="setaChiara"
      />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Letture', path: '/letture' },
          ]),
          faqLd(FAQ),
        ]}
      />
    </>
  );
}
