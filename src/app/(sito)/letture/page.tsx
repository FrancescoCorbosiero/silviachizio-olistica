import JsonLd from '@/components/seo/JsonLd';
import { BottoneRichiesta } from '@/components/ui/Bottone';
import Chat, { type Messaggio } from '@/components/ui/Chat';
import Domande from '@/components/ui/Domande';
import Esempio from '@/components/ui/Esempio';
import Invito from '@/components/ui/Invito';
import PageHero from '@/components/ui/PageHero';
import { FOTO_STESA, PREZZO_LETTURA } from '@/lib/anteprima';
import { IMMAGINI } from '@/lib/immagini';
import { RICHIESTE, rigaSospensione } from '@/lib/richieste';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { CITTA } from '@/lib/site';
import { LETTURA, TEMI_LETTURA } from '@/lib/trattamenti';

export const metadata = pageMetadata({
  title: 'Letture intuitive personalizzate, a distanza',
  description: `${LETTURA.nome}: una lettura simbolica e intuitiva personalizzata, via email. Riceverai la foto della stesa e l'interpretazione personalizzata, scritta o video.`,
  path: '/letture',
});

/* BOZZE (docs/testi-da-validare.md): "come funziona" raccontato come messaggi diretti. */
const COME: Messaggio[] = [
  { da: 'silvia', testo: 'Scegli il tema che ti sta più a cuore.' },
  { da: 'te', testo: 'Crescita personale' },
  { da: 'silvia', testo: 'Preparo la stesa pensando a te e alla tua domanda.' },
  { da: 'silvia', testo: 'Poi ti mando via email la foto della stesa e la mia interpretazione, scritta o video.' },
];

/* Solo risposte vere (dal modulo di Silvia). */
const FAQ = [
  { q: 'Come ricevo la lettura?', a: `Via email: ${LETTURA.riceverai.slice(0, 2).join(' e ')}.` },
  { q: 'Quanto devo aspettare?', a: `La risposta arriva via email entro 24–48 ore.` },
  { q: 'La lettura sostituisce un parere medico o legale?', a: LETTURA.disclaimer },
] as const;

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Le letture intuitive (docs/spec.md, "Letture"): la testata con la candela,
 * cosa ricevi (le parole del modulo), come funziona in quattro messaggi, i
 * temi, la stesa con la lente (quando c'è la foto), il disclaimer integrale
 * accanto alla richiesta, le domande e l'invito.
 */
export default function LetturePage() {
  const stesa = FOTO_STESA;
  const stesaImg = stesa ? IMMAGINI[stesa.valore] : null;
  return (
    <>
      <PageHero
        id="letture-titolo"
        nome="Letture"
        titolo={
          <>
            Una lettura tutta <em>per te</em>
          </>
        }
        // La frase del modulo di Silvia.
        testo={<>Per richiedere {LETTURA.frase}: a distanza, ti arriva via email.</>}
        immagine="candela"
      >
        <BottoneRichiesta tipo="letture" />
      </PageHero>

      <section className="tono-latte section" aria-labelledby="ricevi-titolo">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="ricevi-titolo" className="titolo" data-split>
              Riceverai, <em>via email</em>
            </h2>
            {PREZZO_LETTURA && (
              <p className="flex flex-wrap items-center gap-3">
                <span className="meta">Prezzo</span>
                <span className="cifre text-[clamp(2rem,3vw,2.6rem)]">{PREZZO_LETTURA.valore}</span>
                {PREZZO_LETTURA.esempio && <Esempio cosa="il prezzo della lettura" />}
              </p>
            )}
          </div>
          <ol className="mt-12 grid border-t border-[var(--line-strong)] md:grid-cols-3" data-reveal="stagger">
            {LETTURA.riceverai.map((r, i) => (
              <li key={r} className={`flex flex-col gap-5 py-7 md:pr-8 ${i ? 'border-t border-[var(--line)] md:border-l md:border-t-0 md:pl-8' : ''}`}>
                <span className="cifre text-[clamp(2.6rem,4vw,3.6rem)] text-[var(--accent)]" aria-hidden>
                  {pad(i + 1)}
                </span>
                <span className="corsivo text-[clamp(1.4rem,2vw,1.75rem)] leading-snug first-letter:uppercase">{r}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="tono-sabbia section" aria-labelledby="come-titolo">
        <div className="wrap grid items-center gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* BOZZA */}
            <h2 id="come-titolo" className="titolo" data-split>
              Te lo racconto in <em>quattro messaggi</em>
            </h2>
            <p className="meta mt-8">I temi</p>
            <ul className="passioni corsivo mt-4" data-reveal>
              {TEMI_LETTURA.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Chat messaggi={COME} className="mx-auto max-w-[460px]" />
          </div>
        </div>
      </section>

      {stesa && stesaImg && (
        <section className="tono-notte section" aria-labelledby="stesa-titolo">
          <div className="wrap grid items-center gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              {/* BOZZA */}
              <h2 id="stesa-titolo" className="titolo" data-split>
                Una stesa <em>vera</em>
              </h2>
              <p className="lead mt-6" data-reveal>
                Così ti arriva: la foto delle carte, come le ho disposte per te, insieme alla mia interpretazione.
              </p>
              <p className="meta mt-6 hidden lg:block">Passa sopra la foto: la lente ingrandisce le carte.</p>
              {stesa.esempio && <Esempio className="mt-5" cosa="la foto di una stesa vera" />}
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--r-tile)] lg:col-span-7 lg:col-start-6" data-lens={stesaImg.src}>
              <picture>
                <source media="(min-width: 768px)" srcSet={stesaImg.src} />
                <img
                  src={stesaImg.srcVerticale}
                  alt={stesa.esempio ? '' : 'Una stesa di Silvia'}
                  width={900}
                  height={1500}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>
          </div>
        </section>
      )}

      <section className="tono-latte section" aria-labelledby="richiesta-titolo">
        <div className="wrap flex flex-col items-center text-center">
          <h2 id="richiesta-titolo" className="titolo" data-split>
            Da sapere <em>prima di chiedere</em>
          </h2>
          {/* Il disclaimer di Silvia, integrale, accanto alla richiesta (docs/spec.md). */}
          <p className="corsivo mx-auto mt-7 max-w-[32em] text-[clamp(1.3rem,2vw,1.65rem)] leading-[1.45] text-[var(--fg-soft)]" data-reveal>
            {LETTURA.disclaimer}
          </p>
          {RICHIESTE.letture.sospesa && <p className="mt-6 max-w-[46ch] text-[15.5px] text-[var(--fg-soft)]">{rigaSospensione('letture')}</p>}
          <div className="mt-9" data-reveal>
            <BottoneRichiesta tipo="letture" />
          </div>
        </div>
      </section>

      <Domande items={FAQ} titolo={<>Prima di <em>chiedere</em></>} />
      <Invito
        // BOZZA
        titolo={
          <>
            Scegli il tema, io preparo la <em>stesa</em>
          </>
        }
        testo={`E se sei in zona, ti aspetto anche in studio a ${CITTA}.`}
        prima="letture"
      />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Lily', path: '/' },
          { name: 'Letture', path: '/letture' },
        ])}
      />
    </>
  );
}
