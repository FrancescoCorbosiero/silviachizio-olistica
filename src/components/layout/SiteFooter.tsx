import Link from 'next/link';
import AlpacodeBadge from '@/components/layout/AlpacodeBadge';
import { etichetta, RICHIESTE } from '@/lib/richieste';
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
  LEGAL,
  NAV,
  ORARI,
  OWNER_NAME,
  PHONE,
  PHONE_DISPLAY,
  PRIVACY_HREF,
  SITE_NAME,
  THREADS_URL,
  WA_LINK,
  ZONA,
} from '@/lib/site';
import { orarioDisplay } from '@/lib/orari';

/** Il wordmark grande in fondo: ogni lettera sale dalla sua maschera (data-wordmark). */
const WORDMARK = 'Lily';

type Voce = { href: string; label: string; external?: boolean };

const SITO: Voce[] = [{ href: '/', label: 'Home' }, ...NAV];

const CANALI: Voce[] = [
  { href: IG_DM_URL, label: 'Messaggio su Instagram', external: true },
  { href: IG_URL, label: `Instagram ${IG_HANDLE}`, external: true },
  { href: THREADS_URL, label: 'Threads', external: true },
  ...(HAS_WA ? [{ href: WA_LINK, label: 'WhatsApp', external: true }] : []),
  ...(HAS_PHONE ? [{ href: `tel:${PHONE}`, label: PHONE_DISPLAY }] : []),
  ...(HAS_EMAIL ? [{ href: `mailto:${EMAIL}`, label: EMAIL }] : []),
];

function Colonna({ titolo, children }: { titolo: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="corsivo mb-1 text-[22px] text-petalo">{titolo}</h2>
      {children}
    </div>
  );
}

const linkClass = 'w-fit py-0.5 text-[15.5px] text-latte/80 transition-colors hover:text-petalo';

/**
 * Footer su fondo notte con il bordino rosa in alto, come la divisa (da
 * andrea-bellettati, SiteFooter.tsx): il marchio e le due richieste, le
 * voci del sito, i canali, lo studio, il wordmark «Lily» che sale lettera
 * per lettera, i dati legali e il credito Alpacode.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="notte on-notte relative overflow-hidden pb-[calc(env(safe-area-inset-bottom)+104px)] pt-16 lg:pb-8">
      <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_1.9fr]">
        <div className="flex flex-col items-start gap-5">
          <Link href="/" aria-label={`${SITE_NAME}, torna alla home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-notte.svg" alt="" width={150} height={155} loading="lazy" decoding="async" className="h-auto w-[150px]" />
          </Link>
          {/* BOZZA */}
          <p className="max-w-[26em] text-[15.5px] text-latte/80">
            Trattamenti benessere in studio a {ZONA} e letture intuitive a distanza.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link className="btn btn-latte btn-sm" href={RICHIESTE.trattamenti.href}>
              {etichetta('trattamenti', { contesto: true })}
            </Link>
            <Link className="btn btn-outline-latte btn-sm" href={RICHIESTE.letture.href}>
              {etichetta('letture', { contesto: true })}
            </Link>
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          <Colonna titolo="Il sito">
            {SITO.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </Colonna>
          <Colonna titolo="Scrivimi">
            {CANALI.map((l) => (
              <a key={l.href} href={l.href} className={linkClass} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}>
                {l.label}
              </a>
            ))}
          </Colonna>
          <Colonna titolo="Lo studio">
            <p className="text-[15.5px] text-latte/80">{HAS_INDIRIZZO ? INDIRIZZO_DISPLAY : ZONA}</p>
            {HAS_ORARI && (
              <ul className="text-[15.5px] text-latte/80">
                {ORARI.map((o) => (
                  <li key={o.giorni.join('-') + o.dalle}>{orarioDisplay(o)}</li>
                ))}
              </ul>
            )}
            <Link href="/contatti" className={linkClass}>
              Come arrivare
            </Link>
          </Colonna>
        </div>
      </div>

      <p
        aria-hidden
        data-wordmark
        className="mt-14 select-none text-center font-script text-[clamp(120px,30vw,320px)] leading-[0.9] text-lily-bright"
      >
        <span className="foot-line">
          {Array.from(WORDMARK).map((ch, i) => (
            <span key={i} className="foot-char">
              {ch}
            </span>
          ))}
        </span>
      </p>

      <div className="wrap mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/15 pt-5 text-[13.5px] text-latte/70">
        <span>
          © {year} {OWNER_NAME} · {SITE_NAME}
          {LEGAL.partitaIva ? ` · P.IVA ${LEGAL.partitaIva}` : ''}
        </span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={PRIVACY_HREF} className="underline-offset-2 transition-colors hover:text-petalo hover:underline">
            Privacy e cookie
          </Link>
          <AlpacodeBadge theme="dark" />
        </div>
      </div>
    </footer>
  );
}
