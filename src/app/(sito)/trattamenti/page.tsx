import Relax from '@/components/home/Relax';
import { IconaTrattamentoSvg } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import Bottone, { BottoneRichiesta } from '@/components/ui/Bottone';
import Domande from '@/components/ui/Domande';
import Esempio from '@/components/ui/Esempio';
import Invito from '@/components/ui/Invito';
import PageHero from '@/components/ui/PageHero';
import { fotoTrattamento, GALLERIA_STUDIO, PRIMA, prezzo } from '@/lib/anteprima';
import { IMMAGINI } from '@/lib/immagini';
import { DAL_MODULO, etichetta, linkRichiesta, RICHIESTE, SU_INSTAGRAM } from '@/lib/richieste';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { CITTA, HAS_INDIRIZZO, INDIRIZZO_DISPLAY, ZONA } from '@/lib/site';
import { prenotaQuesto, RELAX_MINUTI, TRATTAMENTI, type Trattamento } from '@/lib/trattamenti';

export const metadata = pageMetadata({
  // BOZZA
  title: `Listino trattamenti · Massaggi e rituali olistici a ${ZONA}`,
  description: `Quattro esperienze di benessere a ${ZONA}: massaggio olistico relax su lettino, rituale olistico su futon, massaggio decontratturante e muscolare, Lily Magic. Con un momento relax dopo ogni trattamento.`,
  path: '/trattamenti',
});

/* BOZZE nella forma, vere nella sostanza. */
const FAQ = [
  { q: 'Quanto dura il momento relax?', a: `Circa ${RELAX_MINUTI} minuti, dopo ogni trattamento. È compreso: non si aggiunge nulla.` },
  {
    q: 'Qual è la differenza tra Lily Holistic e Lily Holistic Ritual?',
    a: 'Lily Holistic è un massaggio olistico relax sul lettino, di 60 minuti; Lily Holistic Ritual è un rituale olistico sul futon, di 75 minuti.',
  },
  { q: 'Posso farmi consigliare?', a: 'Certo. Scrivimelo nella richiesta, o mandami un messaggio su Instagram: ne parliamo insieme.' },
  { q: 'Dove si trova lo studio?', a: HAS_INDIRIZZO ? `A Montebelluna: ${INDIRIZZO_DISPLAY}.` : 'A Montebelluna, in provincia di Treviso.' },
] as const;

const n = (i: number) => String(i + 1).padStart(2, '0');
const sospesa = RICHIESTE.trattamenti.sospesa;
/** «Prenota questo»: con il modulo (o Instagram) lo stesso link; dal sito, il trattamento già scelto. */
const prenota = (t: Trattamento) => (DAL_MODULO ? linkRichiesta('trattamenti').href : prenotaQuesto(t.slug));
const etichettaPrenota = (t: Trattamento) => (sospesa || SU_INSTAGRAM.trattamenti ? etichetta('trattamenti') : `Prenota ${t.nome}`);

/** I numeri del trattamento: i minuti, il relax, il prezzo se c'è. */
function Numeri({ t }: { t: Trattamento }) {
  const p = prezzo(t.prezzo);
  return (
    <dl className="mt-8 grid grid-cols-3 border-t border-[var(--line-strong)]">
      <div className="pt-4">
        <dt className="meta">Durata</dt>
        <dd className="cifre mt-2 text-[clamp(2.2rem,3vw,2.8rem)]">
          {t.durata}
          <small className="ml-1 font-sans text-[13px] tracking-normal text-[var(--fg-mute)]">min</small>
        </dd>
      </div>
      <div className="border-l border-[var(--line)] pl-4 pt-4">
        <dt className="meta">Relax, dopo</dt>
        <dd className="cifre mt-2 text-[clamp(2.2rem,3vw,2.8rem)]">
          {RELAX_MINUTI}
          <small className="ml-1 font-sans text-[13px] tracking-normal text-[var(--fg-mute)]">min</small>
        </dd>
      </div>
      <div className="border-l border-[var(--line)] pl-4 pt-4">
        <dt className="meta">Prezzo</dt>
        <dd className="mt-2">
          {p ? (
            <span className="flex flex-wrap items-center gap-2">
              <span className="cifre text-[clamp(2.2rem,3vw,2.8rem)]">{p.valore}</span>
              {p.esempio && <Esempio />}
            </span>
          ) : (
            <span className="text-[15px] text-[var(--fg-soft)]">Chiedimelo</span>
          )}
        </dd>
      </div>
    </dl>
  );
}

/**
 * Una sezione per trattamento, con la sua ancora (/trattamenti#lily-magic):
 * la foto in un arco (in anteprima un'atmosfera col segno; senza foto,
 * l'icona del listino) e il testo, alternati. Lily Magic sta al buio, con la
 * luce delle candele: è il rituale più "magico" (dalla versione precedente).
 */
function Sezione({ t, i }: { t: Trattamento; i: number }) {
  const magic = t.slug === 'lily-magic';
  const foto = magic ? { valore: 'candela' as const, esempio: false } : fotoTrattamento(t.slug);
  const img = foto ? IMMAGINI[foto.valore] : null;
  const tono = magic ? 'tono-notte' : i % 2 ? 'tono-latte' : 'tono-sabbia';
  return (
    <section id={t.slug} className={`${tono} section scroll-mt-8`} aria-labelledby={`${t.slug}-titolo`}>
      <div className="wrap grid items-center gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-2 lg:col-start-8' : ''}`}>
          {img ? (
            <div className="arco relative mx-auto aspect-[4/5] w-[min(72%,380px)] max-h-[70svh] lg:w-[min(100%,380px)]" data-clip="arco">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="plx" data-parallax="40" src={img.srcVerticale} alt={foto?.esempio ? '' : img.alt} width={900} height={1500} loading="lazy" decoding="async" />
              {foto?.esempio && <Esempio sopra cosa="una foto del trattamento" />}
            </div>
          ) : (
            <span className="mx-auto grid aspect-square w-[min(60%,220px)] place-items-center rounded-full bg-cipria text-lily">
              <IconaTrattamentoSvg icona={t.icona} className="h-1/2 w-1/2" />
            </span>
          )}
        </div>
        <div className={`lg:col-span-6 ${i % 2 ? 'lg:order-1' : 'lg:col-start-7'}`}>
          <p className="meta">{n(i)}</p>
          <h2 id={`${t.slug}-titolo`} className="titolo mt-3" data-split>
            {t.nome}
          </h2>
          {/* La descrizione del listino, così com'è. */}
          <p className="corsivo mt-4 text-[clamp(1.35rem,1.9vw,1.7rem)] leading-snug text-[var(--fg-soft)]">{t.breve}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2" data-reveal>
            <div>
              <p className="meta">Cosa aspettarti</p>
              <p className="mt-2 text-[var(--fg-soft)]">{t.aspettarsi}</p>
            </div>
            <div>
              <p className="meta">Per chi è</p>
              <p className="mt-2 text-[var(--fg-soft)]">{t.perChi}</p>
            </div>
          </div>
          <Numeri t={t} />
          <div className="mt-9" data-reveal>
            <Bottone href={prenota(t)} variante={magic ? 'latte' : 'lily'}>
              {etichettaPrenota(t)}
            </Bottone>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Il listino in pagina: la testata, una sezione per trattamento, la
 * galleria dello studio (con le foto; in anteprima con le atmosfere), il
 * momento relax, "prima di venire" (con le indicazioni di Silvia), le
 * domande e l'invito.
 */
export default function TrattamentiPage() {
  const galleria = GALLERIA_STUDIO;
  return (
    <>
      <PageHero
        id="trattamenti-titolo"
        nome="Trattamenti"
        titolo={
          <>
            Listino <em>trattamenti</em>
          </>
        }
        // Le parole del listino di Silvia.
        testo={
          <>
            Quattro esperienze di benessere, da 60 a 75 minuti, nel mio studio a {CITTA}. Dopo ognuna, circa{' '}
            {RELAX_MINUTI} minuti di relax.
          </>
        }
        immagine="seta"
      >
        <BottoneRichiesta tipo="trattamenti" />
      </PageHero>

      {TRATTAMENTI.map((t, i) => (
        <Sezione key={t.slug} t={t} i={i} />
      ))}

      {galleria && (
        <section className="galleria tono-latte section" aria-labelledby="studio-titolo" data-hscroll>
          <div data-pin-stage>
            <div className="wrap flex flex-wrap items-end justify-between gap-4">
              {/* BOZZA */}
              <h2 id="studio-titolo" className="titolo" data-split>
                Lo <em>studio</em>
              </h2>
              {galleria.esempio && <Esempio cosa="le foto dello studio" />}
            </div>
            <ul className="galleria-fila mt-10" data-hscroll-track>
              {galleria.valore.map((nome, i) => {
                const img = IMMAGINI[nome];
                return (
                  <li key={`${nome}-${i}`} className="galleria-foto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.srcVerticale} alt={galleria.esempio ? '' : img.alt} width={900} height={1500} loading="lazy" decoding="async" />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <Relax />

      {PRIMA && (
        <section className="tono-latte section" aria-labelledby="prima-titolo">
          <div className="wrap grid gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="prima-titolo" className="titolo" data-split>
                Prima di <em>venire</em>
              </h2>
              {PRIMA.esempio && <Esempio className="mt-4" cosa="le indicazioni di Silvia" />}
            </div>
            <ol className="righe border-y border-[var(--line)] lg:col-span-7 lg:col-start-6">
              {PRIMA.valore.map((r, i) => (
                <li key={r} className="flex items-baseline gap-6 py-5">
                  <span className="meta">{n(i)}</span>
                  <span className="text-[17.5px]">{r}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <Domande items={FAQ} titolo={<>Prima di <em>scegliere</em></>} />
      <Invito
        // BOZZA
        titolo={
          <>
            Scegli il tuo <em>momento</em>
          </>
        }
        testo={SU_INSTAGRAM.trattamenti ? 'Scrivimi su Instagram: fissiamo insieme giorno e ora.' : 'Mandami la richiesta: ti scrivo io per fissare giorno e ora.'}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Lily', path: '/' },
          { name: 'Trattamenti', path: '/trattamenti' },
        ])}
      />
    </>
  );
}
