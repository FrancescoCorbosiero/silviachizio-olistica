import Link from 'next/link';
import DivisoreLoto from '@/components/brand/DivisoreLoto';
import { FasciaRelax } from '@/components/brand/Listino';
import MomentoRelax from '@/components/home/MomentoRelax';
import { ArrowIcon, IconaOrologio, IconaTrattamentoSvg } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import Chiusura from '@/components/ui/Chiusura';
import FaqList from '@/components/ui/FaqList';
import SectionHead from '@/components/ui/SectionHead';
import { AVVISAMI, RICHIESTE } from '@/lib/richieste';
import { breadcrumbLd, faqLd, pageMetadata } from '@/lib/seo';
import { HAS_INDIRIZZO, INDIRIZZO_DISPLAY, ZONA } from '@/lib/site';
import { formatPrezzo, prenotaQuesto, PRIMA_DI_VENIRE, RELAX_MINUTI, TRATTAMENTI, type Trattamento } from '@/lib/trattamenti';

export const metadata = pageMetadata({
  // BOZZA
  title: `Listino trattamenti · Massaggi e rituali olistici a ${ZONA}`,
  description: `Quattro esperienze di benessere a ${ZONA}: massaggio olistico relax su lettino, rituale olistico su futon, massaggio decontratturante e muscolare, Lily Magic. Con un momento relax dopo ogni trattamento.`,
  path: '/trattamenti',
});

/* BOZZE nella forma, vere nella sostanza. */
const FAQ = [
  {
    q: 'Quanto dura il momento relax?',
    a: `Circa ${RELAX_MINUTI} minuti, dopo ogni trattamento. È compreso: non si aggiunge nulla.`,
  },
  {
    q: 'Qual è la differenza tra Lily Holistic e Lily Holistic Ritual?',
    a: 'Lily Holistic è un massaggio olistico relax sul lettino, di 60 minuti; Lily Holistic Ritual è un rituale olistico sul futon, di 75 minuti.',
  },
  {
    q: 'Posso farmi consigliare?',
    a: 'Certo. Nella richiesta scegli «Non so ancora: consigliami tu» e ne parliamo insieme.',
  },
  {
    q: 'Dove si trova lo studio?',
    a: HAS_INDIRIZZO ? `A Montebelluna: ${INDIRIZZO_DISPLAY}.` : 'A Montebelluna, in provincia di Treviso.',
  },
] as const;

const sospesa = RICHIESTE.trattamenti.sospesa;

/** Una sezione per trattamento, con la sua ancora. Lily Magic sta su fondo notte. */
function SezioneTrattamento({ t, i }: { t: Trattamento; i: number }) {
  const magic = t.slug === 'lily-magic';
  const prezzo = formatPrezzo(t.prezzo);
  return (
    <section
      id={t.slug}
      aria-labelledby={`${t.slug}-titolo`}
      className={`relative isolate scroll-mt-24 overflow-hidden ${magic ? 'notte on-notte section' : 'section-tight'}`}
    >
      {magic && <div className="luce-candela -right-20 top-[8%] w-[min(620px,130vw)]" aria-hidden />}
      <div className={`wrap grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-14 ${i % 2 && !magic ? 'md:[direction:rtl]' : ''}`}>
        <div className="[direction:ltr]">
          <span className={`cerchio mx-auto !w-[clamp(120px,22vw,190px)] !h-[clamp(120px,22vw,190px)] md:mx-0 ${magic ? '' : 'shadow-[var(--shadow-petalo)]'}`} data-pop>
            <IconaTrattamentoSvg icona={t.icona} />
          </span>
        </div>
        <div className={`[direction:ltr] flex flex-col items-start gap-5 ${magic ? '' : 'petalo p-6 sm:p-9'}`}>
          <h2 id={`${t.slug}-titolo`} className={`display-md ${magic ? 'text-lily-bright' : 'text-lily'}`} data-split>
            {t.nome}
          </h2>
          <p className="corsivo text-[clamp(19px,2vw,23px)] leading-snug">{t.breve}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Durata">
            <li className="pill">
              <IconaOrologio /> {t.durata} min
            </li>
            <li className="pill">+ circa {RELAX_MINUTI} min di relax</li>
            {prezzo && <li className="pill">{prezzo}</li>}
          </ul>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="font-serif text-[19px] font-bold">Cosa aspettarti</h3>
              <p className={`mt-1.5 ${magic ? 'text-latte/85' : 'testo-mute'}`}>{t.aspettarsi}</p>
            </div>
            <div>
              <h3 className="font-serif text-[19px] font-bold">Per chi è</h3>
              <p className={`mt-1.5 ${magic ? 'text-latte/85' : 'testo-mute'}`}>{t.perChi}</p>
            </div>
          </div>
          <Link className={magic ? 'btn btn-latte' : 'btn'} href={sospesa ? RICHIESTE.trattamenti.href : prenotaQuesto(t.slug)}>
            {sospesa ? AVVISAMI : `Prenota ${t.nome}`} <ArrowIcon size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Il listino in pagina (docs/spec.md, "Trattamenti"): l'indice dei quattro,
 * una sezione per trattamento con la sua ancora, il momento relax, "prima
 * di venire" (solo con le indicazioni di Silvia), domande e chiusura.
 */
export default function TrattamentiPage() {
  return (
    <>
      <section className="relative isolate overflow-x-clip pb-[clamp(40px,6vw,80px)] pt-[clamp(28px,5vw,72px)]" aria-labelledby="trattamenti-titolo">
        <div className="alone left-1/2 top-[40%] w-[min(760px,150vw)] -translate-x-1/2 -translate-y-1/2" aria-hidden />
        <div className="wrap flex flex-col items-center text-center">
          <h1 id="trattamenti-titolo" className="display-xl manifesto intro leading-[0.98]">
            Listino
            <br />
            <span className="text-lily">Trattamenti</span>
          </h1>
          <p className="intro mt-6" style={{ '--d': '0.15s' } as React.CSSProperties}>
            <span className="pennellata text-[clamp(20px,2.2vw,25px)]">Quattro esperienze di benessere</span>
          </p>
          <DivisoreLoto className="intro-fade mt-6 w-full" />
          {/* L'indice: su desktop, quando ci saranno le foto, la foto segue il puntatore (data-path-row). */}
          <nav aria-label="I trattamenti" className="intro mt-8 w-full max-w-[760px]" style={{ '--d': '0.3s' } as React.CSSProperties}>
            <ol className="petalo divide-y divide-petalo/60 px-5 text-left sm:px-8">
              {TRATTAMENTI.map((t) => (
                <li key={t.slug} data-path-row>
                  <a href={`#${t.slug}`} className="group flex items-center gap-4 py-4">
                    <span className="cerchio cerchio-sm">
                      <IconaTrattamentoSvg icona={t.icona} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-[20px] font-bold leading-tight text-lily transition-colors group-hover:text-lily-deep">
                        {t.nome}
                      </span>
                      <span className="corsivo block text-[15.5px] leading-snug">{t.breve}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 font-serif text-[15.5px] italic">
                      <IconaOrologio size={17} className="text-lily" /> {t.durata} min
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <FasciaRelax className="intro mt-6" />
        </div>
      </section>

      {TRATTAMENTI.map((t, i) => (
        <SezioneTrattamento key={t.slug} t={t} i={i} />
      ))}

      <MomentoRelax disteso />

      {PRIMA_DI_VENIRE.length > 0 && (
        <section className="section-tight" aria-labelledby="prima-titolo">
          <div className="wrap-narrow">
            <SectionHead id="prima-titolo" eyebrow="Prima di venire" title="Cosa portare e cosa" script="sapere" />
            <ul className="elenco mt-8">
              {PRIMA_DI_VENIRE.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="faq-titolo">
        <div className="wrap grid items-start gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <SectionHead id="faq-titolo" eyebrow="Domande frequenti" title="Prima di" script="scegliere" />
          </div>
          <FaqList items={FAQ} />
        </div>
      </section>

      <Chiusura
        eyebrow="Ti aspetto a Montebelluna"
        // BOZZA
        title={
          <>
            Scegli il tuo <span className="script">momento</span>
          </>
        }
        lead="Mandami la richiesta: ti scrivo io per fissare giorno e ora."
      />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Trattamenti', path: '/trattamenti' },
          ]),
          faqLd(FAQ),
        ]}
      />
    </>
  );
}
