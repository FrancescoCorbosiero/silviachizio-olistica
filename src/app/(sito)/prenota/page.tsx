import type { Metadata } from 'next';
import Link from 'next/link';
import PrenotaInline from '@/components/flows/PrenotaInline';
import { ArrowIcon, InstagramIcon, WhatsAppIcon } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import { etichetta, RICHIESTE, rigaSospensione } from '@/lib/richieste';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { EMAIL, HAS_EMAIL, HAS_WA, IG_DM_URL, IG_HANDLE, ZONA, mailtoLink, waLink } from '@/lib/site';
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
export default function PrenotaPage() {
  const testoMessaggio = 'Ciao Silvia! 🌸 Vorrei prenotare un trattamento.';
  return (
    <>
      <section className="section-tight relative isolate overflow-x-clip !pb-10">
        <div className="wrap">
          <p className="eyebrow intro">Prenota</p>
          {/* BOZZA */}
          <h1 className="display-xl intro mt-4" style={{ '--d': '0.08s' } as React.CSSProperties}>
            Prenota il tuo <span className="script">momento</span>
          </h1>
          <p className="lead misura intro mt-5" style={{ '--d': '0.2s' } as React.CSSProperties}>
            {/* BOZZA */}
            {sospesa ? rigaSospensione('trattamenti') : 'Scegli il trattamento e dimmi quando ti va: ti scrivo io per fissare giorno e ora.'}
          </p>
        </div>
      </section>

      <section aria-labelledby="richiesta-titolo" className="pb-[clamp(64px,9vw,120px)]">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <div className="intro" style={{ '--d': '0.3s' } as React.CSSProperties}>
            <h2 id="richiesta-titolo" className="sr-only">
              {sospesa ? 'Avvisami quando riapro' : 'La tua richiesta'}
            </h2>
            <PrenotaInline />
          </div>

          <aside className="grid gap-10 lg:sticky lg:top-28">
            {!sospesa && (
              <div>
                <h2 className="display-sm">Cosa succede dopo</h2>
                <ol className="mt-5 grid gap-4">
                  {DOPO.map((p, i) => (
                    <li key={p.titolo} className="grid grid-cols-[auto_1fr] items-start gap-4">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full font-serif text-[18px] font-[700] ${
                          i === 0 ? 'bg-lily text-white' : 'bg-cipria text-lily-deep'
                        }`}
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-[700] text-inchiostro">{p.titolo}</p>
                        <p className="text-[16px] leading-snug text-ink-mute">{p.testo}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="petalo petalo-blush p-6">
              {/* BOZZA */}
              <h2 className="display-sm">Preferisci scrivermi?</h2>
              <p className="mt-2 text-[16px] text-inchiostro/85">Mandami un messaggio dove ti è più comodo: ti rispondo io.</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a className="btn btn-sm" href={IG_DM_URL} target="_blank" rel="noopener">
                  <InstagramIcon size={16} /> Messaggio su Instagram
                </a>
                {HAS_WA && (
                  <a className="btn btn-outline btn-sm" href={waLink(testoMessaggio)} target="_blank" rel="noopener">
                    <WhatsAppIcon size={16} /> WhatsApp
                  </a>
                )}
                {HAS_EMAIL && (
                  <a className="btn btn-outline btn-sm" href={mailtoLink('Vorrei prenotare un trattamento', testoMessaggio)}>
                    {EMAIL}
                  </a>
                )}
              </div>
              <p className="mt-3 text-[14px] text-ink-mute">Su Instagram mi trovi come {IG_HANDLE}.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="notte on-notte section-tight">
        <div className="wrap flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            {/* BOZZA */}
            <h2 className="display-md">
              Cerchi una <span className="script">lettura</span>?
            </h2>
            <p className="lead mt-3 misura">Le letture intuitive sono a distanza: scegli il tema, io preparo la stesa.</p>
          </div>
          <Link className="btn btn-latte btn-lg shrink-0" href={RICHIESTE.letture.href}>
            {etichetta('letture', { contesto: true })} <ArrowIcon size={16} />
          </Link>
        </div>
      </section>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Prenota', path: '/prenota' },
        ])}
      />
    </>
  );
}
