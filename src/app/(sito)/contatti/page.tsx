import { Clock, Mail, MapPin, MessageCircleHeart, Phone } from 'lucide-react';
import { ArrowIcon, InstagramIcon, WhatsAppIcon } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import BottoniRichiesta from '@/components/ui/BottoniRichiesta';
import Chiusura from '@/components/ui/Chiusura';
import SectionHead from '@/components/ui/SectionHead';
import { orarioDisplay } from '@/lib/orari';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import {
  EMAIL,
  HAS_EMAIL,
  HAS_INDIRIZZO,
  HAS_ORARI,
  HAS_PHONE,
  HAS_WA,
  IG_DM_URL,
  IG_HANDLE,
  IG_URL,
  INDIRIZZO_DISPLAY,
  ORARI,
  PHONE,
  PHONE_DISPLAY,
  STUDIO,
  THREADS_URL,
  ZONA,
  waLink,
} from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contatti',
  // BOZZA
  description: `Dove trovi lo studio di Lily Trattamenti Benessere a ${ZONA} e come scrivermi: messaggio su Instagram o una richiesta dal sito.`,
  path: '/contatti',
});

type Canale = { href: string; titolo: string; dettaglio: string; Icona: React.ComponentType<{ size?: number }>; esterno?: boolean };

const CANALI: Canale[] = [
  { href: IG_DM_URL, titolo: 'Messaggio su Instagram', dettaglio: IG_HANDLE, Icona: MessageCircleHeart, esterno: true },
  ...(HAS_WA ? [{ href: waLink('Ciao Silvia! Ti scrivo dal sito 🌸'), titolo: 'WhatsApp', dettaglio: 'Scrivimi', Icona: WhatsAppIcon, esterno: true }] : []),
  ...(HAS_PHONE ? [{ href: `tel:${PHONE}`, titolo: 'Telefono', dettaglio: PHONE_DISPLAY, Icona: Phone }] : []),
  ...(HAS_EMAIL ? [{ href: `mailto:${EMAIL}`, titolo: 'Email', dettaglio: EMAIL, Icona: Mail }] : []),
  { href: IG_URL, titolo: 'Instagram', dettaglio: 'Seguimi', Icona: InstagramIcon, esterno: true },
];

/**
 * Contatti (docs/spec.md): dove si trova lo studio, giorni e orari, come
 * arrivare, i canali e le due richieste. Indirizzo, orari, telefono ed
 * email compaiono solo quando Silvia li dà (src/lib/site.ts); niente mappa
 * incorporata, solo il link "Apri in Maps".
 */
export default function ContattiPage() {
  return (
    <>
      <section className="relative isolate overflow-x-clip pb-[clamp(40px,6vw,80px)] pt-[clamp(28px,5vw,72px)]" aria-labelledby="contatti-titolo">
        <div className="alone left-[70%] top-[40%] w-[min(680px,140vw)] -translate-x-1/2 -translate-y-1/2" aria-hidden />
        <div className="wrap flex flex-col items-start gap-6">
          <p className="eyebrow intro">Contatti</p>
          {/* BOZZA */}
          <h1 id="contatti-titolo" className="display-xl intro" style={{ '--d': '0.1s' } as React.CSSProperties}>
            Dove <span className="script">trovarmi</span>
          </h1>
          {/* BOZZA */}
          <p className="lead misura intro" style={{ '--d': '0.22s' } as React.CSSProperties}>
            Lo studio è a {ZONA}. Per un trattamento o una lettura mandami una richiesta dal sito; per tutto il resto
            scrivimi su Instagram.
          </p>
          <div className="intro" style={{ '--d': '0.34s' } as React.CSSProperties}>
            <BottoniRichiesta />
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="studio-titolo">
        <div className="wrap grid gap-5 md:grid-cols-2" data-reveal="stagger">
          <div className="petalo flex flex-col items-start gap-4 p-7 sm:p-9">
            <span className="cerchio">
              <MapPin size={26} strokeWidth={1.75} aria-hidden />
            </span>
            <h2 id="studio-titolo" className="display-sm">
              Lo studio
            </h2>
            <p className="text-[18px]">{HAS_INDIRIZZO ? INDIRIZZO_DISPLAY : ZONA}</p>
            {STUDIO.comeArrivare && <p className="testo-mute">{STUDIO.comeArrivare}</p>}
            {STUDIO.mapsUrl && (
              <a className="text-link" href={STUDIO.mapsUrl} target="_blank" rel="noopener">
                Apri in Maps <ArrowIcon size={15} />
              </a>
            )}
          </div>
          {HAS_ORARI && (
            <div className="petalo flex flex-col items-start gap-4 p-7 sm:p-9">
              <span className="cerchio">
                <Clock size={26} strokeWidth={1.75} aria-hidden />
              </span>
              <h2 className="display-sm">Giorni e orari</h2>
              <ul className="space-y-1 text-[17px]">
                {ORARI.map((o) => (
                  <li key={o.giorni.join('-') + o.dalle}>{orarioDisplay(o)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="section-tight" aria-labelledby="canali-titolo">
        <div className="wrap">
          <SectionHead id="canali-titolo" eyebrow="Scrivimi" title="I miei" script="canali" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {CANALI.map(({ href, titolo, dettaglio, Icona, esterno }) => (
              <li key={titolo}>
                <a
                  href={href}
                  {...(esterno ? { target: '_blank', rel: 'noopener' } : {})}
                  className="petalo petalo-lift flex items-center gap-4 p-5"
                >
                  <span className="cerchio cerchio-sm">
                    <Icona size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{titolo}</span>
                    <span className="testo-mute block truncate text-[15px]">{dettaglio}</span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a href={THREADS_URL} target="_blank" rel="noopener" className="petalo petalo-lift flex items-center gap-4 p-5">
                <span className="cerchio cerchio-sm font-serif text-[22px] font-bold">@</span>
                <span className="min-w-0">
                  <span className="block font-semibold">Threads</span>
                  <span className="testo-mute block truncate text-[15px]">{IG_HANDLE}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Chiusura
        eyebrow="Le richieste"
        // BOZZA
        title={
          <>
            Scrivimi, ti <span className="script">rispondo</span> io
          </>
        }
        lead="Un trattamento in studio o una lettura a distanza: un passo alla volta, poi ci pensiamo insieme."
      />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Contatti', path: '/contatti' },
        ])}
      />
    </>
  );
}
