import Link from 'next/link';
import { Freccia } from '@/components/icons';
import { BottoneRichiesta } from '@/components/ui/Bottone';
import Chat from '@/components/ui/Chat';
import Esempio from '@/components/ui/Esempio';
import { PREZZO_LETTURA } from '@/lib/anteprima';
import { RICHIESTE, rigaSospensione } from '@/lib/richieste';
import { LETTURA, TEMI_LETTURA } from '@/lib/trattamenti';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Le letture intuitive, a distanza, con le parole del modulo di Silvia:
 * cosa riceverai, i temi, il disclaimer integrale accanto alla richiesta.
 * Accanto, la chat che racconta come si chiede; tutto il resto in /letture.
 */
export default function Letture() {
  return (
    <section id="letture" className="tono-notte section overflow-clip" aria-labelledby="letture-titolo">
      <div className="wrap grid gap-x-10 gap-y-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <h2 id="letture-titolo" className="titolo" data-split>
            Letture intuitive, <em>a distanza</em>
          </h2>
          {/* BOZZA, con la frase del modulo */}
          <p className="lead mt-6" data-reveal>
            Per chi mi segue da lontano: {LETTURA.frase}, che ti arriva via email.
          </p>

          {/* «Riceverai:» — le parole del modulo, così come sono. */}
          <p className="meta mt-9">Riceverai</p>
          <ol className="mt-4 border-t border-[var(--line-strong)]" data-reveal="stagger">
            {LETTURA.riceverai.map((r, i) => (
              <li key={r} className="flex items-baseline gap-5 border-b border-[var(--line)] py-3">
                <span className="meta w-6 shrink-0">{pad(i + 1)}</span>
                <span className="corsivo text-[clamp(1.3rem,1.8vw,1.6rem)] leading-tight first-letter:uppercase">{r}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[15.5px] text-[var(--fg-soft)]">
            <span className="meta mr-2">I temi</span>
            {TEMI_LETTURA.join(' · ')}
          </p>
          {PREZZO_LETTURA && (
            <p className="mt-3 flex items-center gap-3 text-[15.5px] text-[var(--fg-soft)]">
              <span className="meta">Prezzo</span> {PREZZO_LETTURA.valore}
              {PREZZO_LETTURA.esempio && <Esempio cosa="il prezzo" />}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" data-reveal>
            {RICHIESTE.letture.sospesa && <p className="w-full max-w-[46ch] text-[15.5px] text-[var(--fg-soft)]">{rigaSospensione('letture')}</p>}
            <BottoneRichiesta tipo="letture" variante="latte" />
            <Link href="/letture" className="link">
              Come funziona una lettura <Freccia />
            </Link>
          </div>
          {/* Il disclaimer di Silvia, integrale, accanto a ogni richiesta di lettura (docs/spec.md). */}
          <p className="mt-7 max-w-[58ch] border-l border-[var(--line-strong)] pl-5 text-[14.5px] leading-relaxed text-[var(--fg-mute)]">
            {LETTURA.disclaimer}
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {/* La chat che si scrive da sola, dalla versione precedente. */}
          <Chat className="mx-auto max-w-[460px]" />
        </div>
      </div>
    </section>
  );
}
