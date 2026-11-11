import { AtSign, Mail, MessageCircleHeart, Phone } from 'lucide-react';
import { ArrowIcon, InstagramIcon, WhatsAppIcon } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import BottoniRichiesta from '@/components/ui/BottoniRichiesta';
import Chiusura from '@/components/ui/Chiusura';
import MappaStudio from '@/components/contatti/MappaStudio';
import Esempio from '@/components/ui/Esempio';
import Scena from '@/components/ui/Scena';
import SectionHead from '@/components/ui/SectionHead';
import { COME_ARRIVARE, EMAIL_PUBBLICA, INDIRIZZO, MAPS, ORARI_STUDIO, POSIZIONE, TELEFONO, whatsapp } from '@/lib/anteprima';
import { IMMAGINI } from '@/lib/immagini';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { IG_DM_URL, IG_HANDLE, IG_URL, THREADS_URL, ZONA } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contatti',
  // BOZZA
  description: `Dove trovi lo studio di Lily Trattamenti Benessere a ${ZONA} e come scrivermi: messaggio su Instagram o una richiesta dal sito.`,
  path: '/contatti',
});

type Canale = {
  href: string;
  titolo: string;
  dettaglio: string;
  Icona: React.ComponentType<{ size?: number }>;
  esterno?: boolean;
  esempio?: boolean;
};

const WA = whatsapp('Ciao Silvia! Ti scrivo dal sito 🌸');

/** Indicazioni stradali fino allo studio (Google Maps, si apre fuori dal sito). */
const indicazioni = ({ lat, lng }: { lat: number; lng: number }) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
/** Lo stesso punto su OpenStreetMap. */
const suOsm = ({ lat, lng }: { lat: number; lng: number }) => `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;

/** I canali: quelli veri e, in anteprima, quelli che aspettano il dato (col segno). */
const canali: Canale[] = [
  { href: IG_DM_URL, titolo: 'Messaggio su Instagram', dettaglio: IG_HANDLE, Icona: MessageCircleHeart, esterno: true },
  ...(WA ? [{ href: WA.valore, titolo: 'WhatsApp', dettaglio: 'Scrivimi', Icona: WhatsAppIcon, esterno: true, esempio: WA.esempio }] : []),
  ...(TELEFONO ? [{ href: TELEFONO.valore.href, titolo: 'Telefono', dettaglio: TELEFONO.valore.testo, Icona: Phone, esempio: TELEFONO.esempio }] : []),
  ...(EMAIL_PUBBLICA ? [{ href: EMAIL_PUBBLICA.valore.href, titolo: 'Email', dettaglio: EMAIL_PUBBLICA.valore.testo, Icona: Mail, esempio: EMAIL_PUBBLICA.esempio }] : []),
  { href: IG_URL, titolo: 'Instagram', dettaglio: 'Seguimi', Icona: InstagramIcon, esterno: true },
  { href: THREADS_URL, titolo: 'Threads', dettaglio: IG_HANDLE, Icona: AtSign, esterno: true },
];

/**
 * Contatti (docs/spec.md): Montebelluna dall'alto, dove si trova lo
 * studio, giorni e orari, come arrivare, i canali e le due richieste.
 * Indirizzo, orari, telefono ed email compaiono solo quando Silvia li dà
 * (src/lib/site.ts; in anteprima con un esempio segnato); niente mappa
 * incorporata, solo il link "Apri in Maps".
 */
export default function ContattiPage() {
  return (
    <>
      <Scena immagine="montebelluna" altezza="alta" velo="basso" priorita aria-labelledby="contatti-titolo" contenuto="flex flex-col justify-end self-stretch">
        <div className="flex max-w-[680px] flex-col items-start gap-6 pt-[24svh]" data-hero-away="10">
          <p className="eyebrow intro">Contatti · {ZONA}</p>
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
            <BottoniRichiesta tono="notte" />
          </div>
        </div>
      </Scena>

      <section className="section" aria-labelledby="studio-titolo">
        <div className="wrap">
          <div className="colonne-filetto" data-reveal="stagger">
            <div className="flex flex-col items-start gap-4">
              <h2 id="studio-titolo" className="eyebrow">
                Lo studio
              </h2>
              <p className="font-serif text-[clamp(24px,2.6vw,32px)] font-bold leading-tight">{INDIRIZZO ? INDIRIZZO.valore : ZONA}</p>
              {INDIRIZZO?.esempio && <Esempio cosa="l'indirizzo" />}
              {MAPS && (
                <a className="text-link" href={MAPS.valore} {...(MAPS.esempio ? {} : { target: '_blank', rel: 'noopener' })}>
                  Apri in Maps <ArrowIcon size={15} />
                </a>
              )}
            </div>
            {ORARI_STUDIO && (
              <div className="flex flex-col items-start gap-4">
                <h2 className="eyebrow">Giorni e orari</h2>
                <ul className="space-y-1 font-corsivo text-[clamp(22px,2.2vw,27px)] font-semibold italic">
                  {ORARI_STUDIO.valore.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                {ORARI_STUDIO.esempio && <Esempio cosa="giorni e orari" />}
              </div>
            )}
            {COME_ARRIVARE && (
              <div className="flex flex-col items-start gap-4">
                <h2 className="eyebrow">Come arrivare</h2>
                <p className="testo-mute text-[17px]">{COME_ARRIVARE.valore}</p>
                {COME_ARRIVARE.esempio && <Esempio cosa="le indicazioni" />}
              </div>
            )}
          </div>
        </div>
      </section>

      {POSIZIONE && (
        <section className="mappa-sezione" aria-labelledby="mappa-titolo">
          <MappaStudio
            lat={POSIZIONE.valore.lat}
            lng={POSIZIONE.valore.lng}
            nome={`Lo studio di Lily a ${ZONA}`}
            sfondo={IMMAGINI.montebelluna}
          />
          <div className="mappa-scheda-posto">
            <div className="wrap">
              <div className="mappa-scheda on-notte">
                <p className="eyebrow">La mappa</p>
                {/* BOZZA */}
                <h2 id="mappa-titolo" className="display-md mt-4">
                  Ci vediamo <span className="script">qui</span>
                </h2>
                <p className="mt-4 font-serif text-[21px] font-bold leading-snug">{INDIRIZZO ? INDIRIZZO.valore : ZONA}</p>
                <div className="mt-6 flex flex-col items-start gap-3">
                  <a className="btn btn-latte btn-sm" href={indicazioni(POSIZIONE.valore)} target="_blank" rel="noopener">
                    Indicazioni stradali <ArrowIcon size={14} />
                  </a>
                  <a className="text-link" href={suOsm(POSIZIONE.valore)} target="_blank" rel="noopener">
                    Apri su OpenStreetMap <ArrowIcon size={14} />
                  </a>
                </div>
                {POSIZIONE.esempio && <Esempio className="mt-5" cosa="la posizione esatta dello studio" />}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section fondo-vino on-notte" aria-labelledby="canali-titolo">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead id="canali-titolo" eyebrow="Scrivimi" title="I miei" script="canali" lead="Ti rispondo io, di persona: scegli il modo che ti è più comodo." />
          <ul className="righe border-y border-latte/20" data-reveal="stagger">
            {canali.map(({ href, titolo, dettaglio, Icona, esterno, esempio }) => (
              <li key={titolo}>
                <a href={href} {...(esterno && !esempio ? { target: '_blank', rel: 'noopener' } : {})} className="riga-link">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-latte/30 text-petalo">
                    <Icona size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-[clamp(20px,2vw,24px)] font-bold leading-tight">{titolo}</span>
                    <span className="flex flex-wrap items-center gap-2 text-[15px] text-latte/75">
                      <span className="truncate">{dettaglio}</span>
                      {esempio && <Esempio cosa="il contatto" />}
                    </span>
                  </span>
                  <ArrowIcon size={18} className="riga-freccia text-petalo" />
                </a>
              </li>
            ))}
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
