import LetturaInline from '@/components/flows/LetturaInline';
import { IconaScintilla } from '@/components/icons';
import { Chat, type Messaggio } from '@/components/home/LettureChat';
import JsonLd from '@/components/seo/JsonLd';
import Chiusura from '@/components/ui/Chiusura';
import FaqList from '@/components/ui/FaqList';
import SectionHead from '@/components/ui/SectionHead';
import BottoniRichiesta from '@/components/ui/BottoniRichiesta';
import { breadcrumbLd, faqLd, pageMetadata } from '@/lib/seo';
import { LETTURA, TEMI_LETTURA } from '@/lib/trattamenti';

export const metadata = pageMetadata({
  title: 'Letture intuitive personalizzate, a distanza',
  description: `${LETTURA.nome}: una lettura simbolica e intuitiva personalizzata, via email. Riceverai la foto della stesa e l'interpretazione personalizzata, scritta o video.`,
  path: '/letture',
});

/** La foto di una stesa vera di Silvia (domande aperte): con la lente su desktop. */
const FOTO_STESA = '';

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
  return (
    <>
      <section className="relative isolate overflow-x-clip pb-[clamp(40px,6vw,80px)] pt-[clamp(28px,5vw,72px)]" aria-labelledby="letture-titolo">
        <div className="alone left-[66%] top-[45%] w-[min(720px,140vw)] -translate-x-1/2 -translate-y-1/2" aria-hidden />
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <p className="eyebrow intro">Letture intuitive, a distanza</p>
            <h1 id="letture-titolo" className="display-xl intro" style={{ '--d': '0.1s' } as React.CSSProperties}>
              Una lettura tutta per <span className="script">te</span>
            </h1>
            <p className="lead misura intro" style={{ '--d': '0.22s' } as React.CSSProperties}>
              Compila un breve modulo per richiedere {LETTURA.frase}: ti arriva via email.
            </p>
            <div className="intro" style={{ '--d': '0.34s' } as React.CSSProperties}>
              <BottoniRichiesta prima="letture" />
            </div>
          </div>
          <div className="intro-fade" style={{ '--d': '0.3s' } as React.CSSProperties}>
            <Chat messaggi={COME} />
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="ricevi-titolo">
        <div className="wrap grid items-start gap-10 md:grid-cols-2 md:gap-16">
          <SectionHead id="ricevi-titolo" eyebrow="Cosa ricevi" title="Riceverai" script="via email" />
          <ul className="petalo elenco p-7 text-[18px] sm:p-9">
            {LETTURA.riceverai.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="temi-titolo">
        <div className="wrap">
          <SectionHead id="temi-titolo" eyebrow="I temi" title="Su cosa vuoi fare" script="luce" align="center" />
          <ul className="mx-auto mt-10 flex max-w-[860px] flex-wrap justify-center gap-3" data-reveal="stagger">
            {TEMI_LETTURA.map((t) => (
              <li key={t} className="petalo flex items-center gap-3 px-5 py-4 text-[17px] font-semibold">
                <IconaScintilla size={20} className="text-lily" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {FOTO_STESA && (
        <section className="section-tight" aria-labelledby="stesa-titolo">
          <div className="wrap">
            <SectionHead id="stesa-titolo" eyebrow="La stesa" title="Una stesa" script="vera" />
            <div className="foto-arco relative mt-8 aspect-[4/3]" data-lens={FOTO_STESA}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FOTO_STESA} alt="Una stesa di Silvia" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>
      )}

      <section className="section-tight" aria-labelledby="disclaimer-titolo">
        <div className="wrap-narrow">
          <div className="petalo petalo-blush p-7 sm:p-9">
            <h2 id="disclaimer-titolo" className="display-sm">
              Da sapere prima di chiedere
            </h2>
            <p className="mt-4 text-[18px] leading-relaxed">{LETTURA.disclaimer}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="richiesta-titolo">
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
