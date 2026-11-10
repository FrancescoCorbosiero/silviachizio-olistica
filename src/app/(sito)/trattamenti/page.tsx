import Link from 'next/link';
import DivisoreLoto from '@/components/brand/DivisoreLoto';
import { FasciaRelax } from '@/components/brand/Listino';
import MomentoRelax from '@/components/home/MomentoRelax';
import { ArrowIcon, IconaOrologio, IconaTrattamentoSvg } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import Chiusura from '@/components/ui/Chiusura';
import Esempio from '@/components/ui/Esempio';
import FaqList from '@/components/ui/FaqList';
import Scena from '@/components/ui/Scena';
import SectionHead from '@/components/ui/SectionHead';
import { fotoTrattamento, GALLERIA_STUDIO, PRIMA, prezzo } from '@/lib/anteprima';
import { IMMAGINI } from '@/lib/immagini';
import { AVVISAMI, RICHIESTE } from '@/lib/richieste';
import { breadcrumbLd, faqLd, pageMetadata } from '@/lib/seo';
import { HAS_INDIRIZZO, INDIRIZZO_DISPLAY, ZONA } from '@/lib/site';
import { prenotaQuesto, RELAX_MINUTI, TRATTAMENTI, type Trattamento } from '@/lib/trattamenti';

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
const n = (i: number) => String(i + 1).padStart(2, '0');

/** Durata, relax e prezzo (solo se c'è; in anteprima «€ 00» col segno). */
function Meta({ t }: { t: Trattamento }) {
  const p = prezzo(t.prezzo);
  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Durata e prezzo">
      <li className="pill">
        <IconaOrologio /> {t.durata} min
      </li>
      <li className="pill">+ circa {RELAX_MINUTI} min di relax</li>
      {p && (
        <li className="flex items-center gap-2">
          <span className="pill">{p.valore}</span>
          {p.esempio && <Esempio cosa="il prezzo" />}
        </li>
      )}
    </ul>
  );
}

/** Cosa aspettarti, per chi è, "Prenota questo". */
function Dettagli({ t, notte = false }: { t: Trattamento; notte?: boolean }) {
  return (
    <>
      <div className="colonne-filetto mt-2 w-full">
        <div>
          <h3 className="eyebrow">Cosa aspettarti</h3>
          <p className={`mt-3 ${notte ? 'text-latte/85' : 'testo-mute'}`}>{t.aspettarsi}</p>
        </div>
        <div>
          <h3 className="eyebrow">Per chi è</h3>
          <p className={`mt-3 ${notte ? 'text-latte/85' : 'testo-mute'}`}>{t.perChi}</p>
        </div>
      </div>
      <Link className={notte ? 'btn btn-latte btn-lg' : 'btn btn-lg'} href={sospesa ? RICHIESTE.trattamenti.href : prenotaQuesto(t.slug)}>
        {sospesa ? AVVISAMI : `Prenota ${t.nome}`} <ArrowIcon size={15} />
      </Link>
    </>
  );
}

/**
 * Una sezione per trattamento, con la sua ancora: la foto in un arco (in
 * anteprima un'atmosfera col segno; senza foto, l'icona del listino nel
 * cerchio) e il testo, alternati. Lily Magic è una scena: il buio e le
 * candele, con il testo su un pannello scuro.
 */
function SezioneTrattamento({ t, i }: { t: Trattamento; i: number }) {
  const testa = (
    <>
      <span className="numero" aria-hidden>
        {n(i)}
      </span>
      <h2 id={`${t.slug}-titolo`} className={`display-lg ${t.slug === 'lily-magic' ? 'text-petalo' : 'text-lily'}`} data-split>
        {t.nome}
      </h2>
      <p className="corsivo text-[clamp(20px,2.2vw,26px)] leading-snug">{t.breve}</p>
      <Meta t={t} />
    </>
  );

  if (t.slug === 'lily-magic') {
    return (
      <Scena id={t.slug} immagine="candela" altezza="alta" velo="sinistra" className="scroll-mt-16" aria-labelledby={`${t.slug}-titolo`}>
        <div className="pannello-notte flex max-w-[640px] flex-col items-start gap-5 p-7 sm:p-10">
          {testa}
          <Dettagli t={t} notte />
        </div>
      </Scena>
    );
  }

  const foto = fotoTrattamento(t.slug);
  const img = foto ? IMMAGINI[foto.valore] : null;
  return (
    <section id={t.slug} aria-labelledby={`${t.slug}-titolo`} className={`section scroll-mt-16 ${i % 2 ? 'fondo-blush' : ''}`}>
      <div className="wrap grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className={i % 2 ? 'md:order-2' : ''}>
          {img ? (
            <div className="foto-arco relative mx-auto aspect-[4/5] w-full max-w-[460px]" data-clip>
              <picture>
                <source media="(min-width: 768px)" srcSet={img.src} />
                <img src={img.srcVerticale} alt={foto?.esempio ? '' : img.alt} width={900} height={1500} loading="lazy" decoding="async" />
              </picture>
              {foto?.esempio && <Esempio sopra cosa="una foto del trattamento" className="!top-auto bottom-4" />}
            </div>
          ) : (
            <span className="cerchio mx-auto !h-[clamp(140px,24vw,220px)] !w-[clamp(140px,24vw,220px)]" data-pop>
              <IconaTrattamentoSvg icona={t.icona} />
            </span>
          )}
        </div>
        <div className="flex flex-col items-start gap-5">
          {testa}
          <Dettagli t={t} />
        </div>
      </div>
    </section>
  );
}

/**
 * Il listino in pagina (docs/spec.md, "Trattamenti"): la testata, l'indice
 * dei quattro (su desktop la foto segue il puntatore), una sezione per
 * trattamento con la sua ancora, la galleria dello studio, il momento
 * relax, "prima di venire", le domande e la chiusura. In anteprima
 * compaiono anche i blocchi che aspettano i dati di Silvia, col segno.
 */
export default function TrattamentiPage() {
  const galleria = GALLERIA_STUDIO;
  return (
    <>
      <Scena immagine="seta" altezza="alta" velo="vino" priorita aria-labelledby="trattamenti-titolo" contenuto="flex flex-col items-center text-center">
        <p className="eyebrow intro">Studio a {ZONA}</p>
        <h1 id="trattamenti-titolo" className="display-xl manifesto intro mt-6 leading-[0.98]" style={{ '--d': '0.08s' } as React.CSSProperties}>
          Listino
          <br />
          <span className="text-petalo">Trattamenti</span>
        </h1>
        <p className="corsivo intro mt-6 text-[clamp(20px,2.2vw,26px)]" style={{ '--d': '0.18s' } as React.CSSProperties}>
          Quattro esperienze di benessere
        </p>
        <ul className="fatti intro mt-10 justify-center" style={{ '--d': '0.3s' } as React.CSSProperties} aria-label="In breve">
          <li>Da 60 a 75 minuti</li>
          <li>Relax compreso</li>
          <li>{ZONA}</li>
        </ul>
      </Scena>

      <section className="section fondo-blush" aria-label="Indice dei trattamenti">
        <div className="wrap flex flex-col items-center">
          <DivisoreLoto className="w-full" />
          <nav aria-label="I trattamenti" className="mt-8 w-full max-w-[860px]">
            <ol className="listino-foglio righe">
              {TRATTAMENTI.map((t, i) => {
                const foto = fotoTrattamento(t.slug);
                const img = foto ? IMMAGINI[foto.valore] : null;
                return (
                  <li key={t.slug} data-path-row>
                    <a href={`#${t.slug}`} className="riga-link group">
                      <span className="numero !text-[clamp(28px,3vw,40px)]" aria-hidden>
                        {n(i)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-[clamp(21px,2.4vw,28px)] font-bold leading-tight text-lily transition-colors group-hover:text-lily-deep">
                          {t.nome}
                        </span>
                        <span className="corsivo block text-[16px] leading-snug">{t.breve}</span>
                      </span>
                      <span className="hidden shrink-0 items-center gap-1.5 font-serif text-[16px] italic sm:flex">
                        <IconaOrologio size={17} className="text-lily" /> {t.durata} min
                      </span>
                      <ArrowIcon size={18} className="riga-freccia text-lily" />
                    </a>
                    {img && (
                      <span className="path-thumb" data-path-thumb aria-hidden>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.srcVerticale} alt="" width={900} height={1500} loading="lazy" decoding="async" />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <FasciaRelax className="mt-8" />
        </div>
      </section>

      {TRATTAMENTI.map((t, i) => (
        <SezioneTrattamento key={t.slug} t={t} i={i} />
      ))}

      {galleria && (
        <section className="galleria section fondo-vino on-notte" aria-labelledby="studio-titolo" data-hscroll>
          <div data-pin-stage>
            <div className="wrap flex flex-col items-start gap-4">
              {/* BOZZA */}
              <SectionHead id="studio-titolo" eyebrow="Lo studio" title="Dove ti" script="aspetto" />
              {galleria.esempio && <Esempio cosa="le foto dello studio" />}
            </div>
            <ul className="galleria-fila mt-10" data-hscroll-track>
              {galleria.valore.map((nome, i) => {
                const img = IMMAGINI[nome];
                return (
                  <li key={`${nome}-${i}`} className="galleria-foto">
                    <picture>
                      <source media="(min-width: 768px)" srcSet={img.src} />
                      <img src={img.srcVerticale} alt={galleria.esempio ? '' : img.alt} width={900} height={1500} loading="lazy" decoding="async" />
                    </picture>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <MomentoRelax disteso />

      {PRIMA && (
        <section className="section" aria-labelledby="prima-titolo">
          <div className="wrap grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="flex flex-col items-start gap-4">
              <SectionHead id="prima-titolo" eyebrow="Prima di venire" title="Cosa portare e cosa" script="sapere" />
              {PRIMA.esempio && <Esempio cosa="le indicazioni di Silvia" />}
            </div>
            <ol className="righe">
              {PRIMA.valore.map((r, i) => (
                <li key={r} className="flex items-baseline gap-6 py-6">
                  <span className="numero !text-[34px]" aria-hidden>
                    {n(i)}
                  </span>
                  <span className="text-[18px]">{r}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="section fondo-blush" aria-labelledby="faq-titolo">
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
        immagine="luce"
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
