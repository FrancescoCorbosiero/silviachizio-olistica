import type { Metadata } from 'next';
import Link from 'next/link';
import PrenotaInline from '@/components/flows/PrenotaInline';
import { ArrowIcon, InstagramIcon, WhatsAppIcon } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import Esempio from '@/components/ui/Esempio';
import Scena from '@/components/ui/Scena';
import { etichetta, RICHIESTE, rigaSospensione } from '@/lib/richieste';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { dato, whatsapp } from '@/lib/anteprima';
import { HAS_EMAIL, IG_DM_URL, IG_HANDLE, ZONA, EMAIL, mailtoLink } from '@/lib/site';
import { RELAX_MINUTI } from '@/lib/trattamenti';

export const metadata: Metadata = pageMetadata({
  title: 'Prenota un trattamento',
  // BOZZA
  description: `Chiedi un trattamento a ${ZONA}: scegli dal listino, dimmi quando ti va e ti scrivo io per fissare giorno e ora.`,
  path: '/prenota',
});

const sospesa = RICHIESTE.trattamenti.sospesa;

/** BOZZA — cosa succede dopo la richiesta. */
const DOPO = [
  { titolo: 'Mi mandi la richiesta', testo: 'Due minuti, un passo alla volta: il trattamento, quando ti va, come ricontattarti.' },
  { titolo: 'Ti scrivo io', testo: 'Per fissare insieme giorno e ora, sul canale che preferisci.' },
  { titolo: 'Ti aspetto in studio', testo: `A ${ZONA}. Dopo il trattamento, circa ${RELAX_MINUTI} minuti di relax solo per te.` },
] as const;

/**
 * Prenota (docs/spec.md): titolo, la richiesta in pagina (#richiesta),
 * cosa succede dopo in tre passi, gli altri canali e la chiusura verso
 * l'altra richiesta. Con le prenotazioni dei trattamenti sospese la
 * richiesta lascia il posto all'avviso di riapertura.
 */
const testoMessaggio = 'Ciao Silvia! 🌸 Vorrei prenotare un trattamento.';
const WA = whatsapp(testoMessaggio);
const MAIL = dato({ href: mailtoLink('Vorrei prenotare un trattamento', testoMessaggio), testo: EMAIL }, HAS_EMAIL, { href: '#anteprima', testo: 'silvia@…' });

export default function PrenotaPage() {
  return (
    <>
      <Scena immagine="luce" altezza="bassa" velo="sinistra" priorita aria-labelledby="prenota-titolo">
        <div className="flex max-w-[640px] flex-col items-start gap-5">
          <p className="eyebrow intro">Prenota · {ZONA}</p>
          {/* BOZZA */}
          <h1 id="prenota-titolo" className="display-xl intro" style={{ '--d': '0.08s' } as React.CSSProperties}>
            Prenota il tuo <span className="script">momento</span>
          </h1>
          <p className="lead misura intro" style={{ '--d': '0.2s' } as React.CSSProperties}>
            {/* BOZZA */}
            {sospesa ? rigaSospensione('trattamenti') : 'Scegli il trattamento e dimmi quando ti va: ti scrivo io per fissare giorno e ora.'}
          </p>
        </div>
      </Scena>

      <section aria-labelledby="richiesta-titolo" className="section fondo-blush">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <h2 id="richiesta-titolo" className="sr-only">
              {sospesa ? 'Avvisami quando riapro' : 'La tua richiesta'}
            </h2>
            <PrenotaInline />
          </div>

          <aside className="grid gap-12 lg:sticky lg:top-28">
            {!sospesa && (
              <div>
                <h2 className="eyebrow">Cosa succede dopo</h2>
                {/* Le tappe si accendono mentre scorri (data-rail). */}
                <div className="rail mt-6" data-rail>
                  <span className="rail-linea" aria-hidden />
                  <ol className="grid gap-7">
                    {DOPO.map((p, i) => (
                      <li key={p.titolo} className="rail-step relative grid grid-cols-[auto_1fr] items-start gap-5" data-rail-step>
                        <span className="rail-dot" aria-hidden>
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-serif text-[21px] font-bold leading-tight text-inchiostro">{p.titolo}</p>
                          <p className="mt-1 text-[16px] leading-snug text-ink-mute">{p.testo}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            <div className="border-t border-lily/25 pt-8">
              {/* BOZZA */}
              <h2 className="display-sm">Preferisci scrivermi?</h2>
              <p className="mt-2 text-[16px] text-inchiostro/85">Mandami un messaggio dove ti è più comodo: ti rispondo io.</p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <a className="btn btn-sm" href={IG_DM_URL} target="_blank" rel="noopener">
                  <InstagramIcon size={16} /> Messaggio su Instagram
                </a>
                {WA && (
                  <a className="btn btn-outline btn-sm" href={WA.valore} {...(WA.esempio ? {} : { target: '_blank', rel: 'noopener' })}>
                    <WhatsAppIcon size={16} /> WhatsApp
                  </a>
                )}
                {MAIL && (
                  <a className="btn btn-outline btn-sm" href={MAIL.valore.href}>
                    {MAIL.valore.testo}
                  </a>
                )}
                {(WA?.esempio || MAIL?.esempio) && <Esempio cosa="WhatsApp ed email" />}
              </div>
              <p className="mt-3 text-[14px] text-ink-mute">Su Instagram mi trovi come {IG_HANDLE}.</p>
            </div>
          </aside>
        </div>
      </section>

      <Scena immagine="carte" altezza="media" velo="sinistra" aria-labelledby="lettura-titolo">
        <div className="flex max-w-[600px] flex-col items-start gap-6">
          <p className="eyebrow">A distanza</p>
          {/* BOZZA */}
          <h2 id="lettura-titolo" className="display-lg">
            Cerchi una <span className="script">lettura</span>?
          </h2>
          <p className="lead misura">Le letture intuitive sono a distanza: scegli il tema, io preparo la stesa.</p>
          <Link className="btn btn-latte btn-lg" href={RICHIESTE.letture.href}>
            {etichetta('letture', { contesto: true })} <ArrowIcon size={16} />
          </Link>
        </div>
      </Scena>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Prenota', path: '/prenota' },
        ])}
      />
    </>
  );
}
