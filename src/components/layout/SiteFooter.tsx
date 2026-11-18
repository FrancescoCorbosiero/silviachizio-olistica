import Link from 'next/link';
import type { ReactNode } from 'react';
import AlpacodeBadge from '@/components/layout/AlpacodeBadge';
import Esempio from '@/components/ui/Esempio';
import { EMAIL_PUBBLICA, INDIRIZZO, MAPS, ORARI_STUDIO, TELEFONO, whatsapp } from '@/lib/anteprima';
import { IG_DM_URL, IG_HANDLE, IG_URL, LEGAL, NAV, OWNER_NAME, PRIVACY_HREF, SITE_NAME, THREADS_URL, ZONA } from '@/lib/site';

/** Il wordmark in fondo alla pagina: ogni lettera sale dalla sua maschera (data-wordmark). */
const WORDMARK = 'Lily';
const WA = whatsapp('Ciao Silvia! Ti scrivo dal sito 🌸');

type Voce = { href: string; label: string; esterno?: boolean; esempio?: boolean };

const CANALI: Voce[] = [
  { href: IG_DM_URL, label: 'Messaggio su Instagram', esterno: true },
  { href: IG_URL, label: IG_HANDLE, esterno: true },
  { href: THREADS_URL, label: 'Threads', esterno: true },
  // In anteprima anche quelli che aspettano il dato, col segno (src/lib/anteprima.ts).
  ...(WA ? [{ href: WA.valore, label: 'WhatsApp', esterno: !WA.esempio, esempio: WA.esempio }] : []),
  ...(TELEFONO ? [{ href: TELEFONO.valore.href, label: TELEFONO.valore.testo, esempio: TELEFONO.esempio }] : []),
  ...(EMAIL_PUBBLICA ? [{ href: EMAIL_PUBBLICA.valore.href, label: EMAIL_PUBBLICA.valore.testo, esempio: EMAIL_PUBBLICA.esempio }] : []),
];

function Colonna({ titolo, children }: { titolo: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="meta">{titolo}</h2>
      <ul className="mt-5 grid gap-2 text-[15.5px]">{children}</ul>
    </div>
  );
}

/**
 * Il piè di pagina, su notte con il bordino rosa della divisa: il marchio,
 * le sezioni, i canali, lo studio (indirizzo e orari solo quando ci sono),
 * il wordmark «Lily» che sale lettera per lettera, i dati legali e il
 * credito Alpacode.
 */
export default function SiteFooter() {
  const anno = new Date().getFullYear();
  return (
    <footer className="piede tono-notte relative overflow-hidden pb-[calc(env(safe-area-inset-bottom)+104px)] lg:pb-10">
      <div className="wrap grid gap-x-10 gap-y-12 pt-[clamp(64px,8vw,104px)] sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" aria-label={`${SITE_NAME}, torna all'inizio`} className="inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-notte.svg" alt="" width={132} height={136} loading="lazy" decoding="async" className="h-auto w-[132px]" />
          </Link>
          {/* BOZZA */}
          <p className="mt-6 max-w-[30ch] text-[15.5px] text-[var(--fg-soft)]">
            Trattamenti benessere in studio a {ZONA}, e letture intuitive a distanza.
          </p>
        </div>
        <div className="lg:col-span-2">
          <Colonna titolo="La pagina">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="piede-link">
                  {n.label}
                </Link>
              </li>
            ))}
          </Colonna>
        </div>
        <div className="lg:col-span-3">
          <Colonna titolo="Scrivimi">
            {CANALI.map((c) => (
              <li key={c.label}>
                <a href={c.href} className="piede-link" {...(c.esterno ? { target: '_blank', rel: 'noopener' } : {})}>
                  {c.label}
                </a>
                {c.esempio && <Esempio className="ml-2" />}
              </li>
            ))}
          </Colonna>
        </div>
        <div className="lg:col-span-3">
          <Colonna titolo="Lo studio">
            <li className="text-[var(--fg-soft)]">
              {INDIRIZZO ? INDIRIZZO.valore : ZONA}
              {INDIRIZZO?.esempio && <Esempio className="ml-2" />}
            </li>
            {ORARI_STUDIO?.valore.map((o) => (
              <li key={o} className="text-[var(--fg-mute)]">
                {o}
              </li>
            ))}
            {ORARI_STUDIO?.esempio && (
              <li>
                <Esempio cosa="gli orari" />
              </li>
            )}
            {MAPS && (
              <li>
                <a href={MAPS.valore} className="piede-link" {...(MAPS.esempio ? {} : { target: '_blank', rel: 'noopener' })}>
                  Apri in Maps
                </a>
                {MAPS.esempio && <Esempio className="ml-2" />}
              </li>
            )}
          </Colonna>
        </div>
      </div>

      <p aria-hidden data-wordmark className="mt-[clamp(56px,8vw,96px)] select-none text-center font-script text-[clamp(124px,30vw,330px)] leading-[0.9] text-lily-bright">
        <span className="foot-line">
          {Array.from(WORDMARK).map((ch, i) => (
            <span key={i} className="foot-char">
              {ch}
            </span>
          ))}
        </span>
      </p>

      <div className="wrap meta mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-[var(--line)] pt-6">
        <span>
          © {anno} {OWNER_NAME} · {SITE_NAME}
          {LEGAL.partitaIva ? ` · P.IVA ${LEGAL.partitaIva}` : ''}
        </span>
        <span className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={PRIVACY_HREF} className="piede-link">
            Privacy e cookie
          </Link>
          <AlpacodeBadge theme="dark" />
        </span>
      </div>
    </footer>
  );
}
