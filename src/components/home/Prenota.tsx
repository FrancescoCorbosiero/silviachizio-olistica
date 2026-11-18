import type { ReactNode } from 'react';
import { FrecciaSu } from '@/components/icons';
import Bottone, { BottoneRichiesta } from '@/components/ui/Bottone';
import Esempio from '@/components/ui/Esempio';
import { INDIRIZZO, MAPS, ORARI_STUDIO } from '@/lib/anteprima';
import { DAL_MODULO, RICHIESTE, rigaSospensione } from '@/lib/richieste';
import { IG_DM_URL, IG_HANDLE, ZONA } from '@/lib/site';
import { RELAX_MINUTI } from '@/lib/trattamenti';

/** BOZZE — come si prenota, in tre passi (il primo cambia con RICHIESTE_DAL). */
const PASSI = [
  {
    titolo: 'Mi mandi la richiesta',
    testo: DAL_MODULO
      ? 'Dal mio modulo: il trattamento che ti interessa e come ricontattarti. Bastano due minuti.'
      : 'Dal sito, un passo alla volta: il trattamento, quando ti va, come ricontattarti.',
  },
  { titolo: 'Ti scrivo io', testo: 'Per fissare insieme giorno e ora. Per le letture ti rispondo via email.' },
  { titolo: 'Ti aspetto in studio', testo: `A ${ZONA}. Dopo il trattamento, circa ${RELAX_MINUTI} minuti di relax solo per te.` },
] as const;

function Dato({ titolo, children }: { titolo: string; children: ReactNode }) {
  return (
    <div className="border-t border-[var(--line-strong)] pt-5">
      <p className="meta">{titolo}</p>
      <div className="mt-3 grid gap-1 text-[16.5px] text-[var(--fg-soft)]">{children}</div>
    </div>
  );
}

/**
 * Prenotare e trovarmi: i tre passi, le due richieste (il modulo Google di
 * Silvia, o i flussi del sito), il messaggio su Instagram; poi lo studio,
 * gli orari e i canali, solo con i dati veri (in anteprima con il segno).
 */
export default function Prenota() {
  const sospesa = RICHIESTE.trattamenti.sospesa;
  return (
    <section id="contatti" className="tono-latte section" aria-labelledby="contatti-titolo">
      <div className="wrap">
        <header className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
          <h2 id="contatti-titolo" className="titolo lg:col-span-7" data-split>
            Come <em>prenotare</em>
          </h2>
          {/* BOZZA */}
          <p className="lead lg:col-span-4 lg:col-start-9" data-reveal>
            {sospesa ? rigaSospensione('trattamenti') : 'Nessun appuntamento automatico: mi scrivi, ti rispondo io e scegliamo insieme.'}
          </p>
        </header>

        <ol className="mt-[clamp(48px,6vw,88px)] grid gap-y-10 md:grid-cols-3 md:gap-x-10" data-reveal="stagger">
          {PASSI.map((p, i) => (
            <li key={p.titolo} className="border-t border-[var(--line-strong)] pt-6">
              <span className="cifre block text-[clamp(3.2rem,5vw,4.6rem)] text-[var(--accent)]">{i + 1}</span>
              <h3 className="titoletto mt-4">{p.titolo}</h3>
              <p className="mt-3 max-w-[34ch] text-[16.5px] text-[var(--fg-soft)]">{p.testo}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-3" data-reveal>
          <BottoneRichiesta tipo="trattamenti" />
          <BottoneRichiesta tipo="letture" variante="linea" />
          <a className="link ml-2" href={IG_DM_URL} target="_blank" rel="noopener">
            Oppure scrivimi su Instagram <FrecciaSu />
          </a>
        </div>

        <div className="mt-[clamp(72px,9vw,128px)] grid gap-10 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          <Dato titolo="Lo studio">
            <p className="text-[var(--fg)]">
              {INDIRIZZO ? INDIRIZZO.valore : ZONA}
              {INDIRIZZO?.esempio && <Esempio className="ml-2" />}
            </p>
            {MAPS && (
              <p className="mt-2">
                <a className="link" href={MAPS.valore} {...(MAPS.esempio ? {} : { target: '_blank', rel: 'noopener' })}>
                  Apri in Maps <FrecciaSu />
                </a>
                {MAPS.esempio && <Esempio className="ml-2" cosa="il link" />}
              </p>
            )}
          </Dato>
          <Dato titolo="Quando">
            {ORARI_STUDIO ? (
              <>
                {ORARI_STUDIO.valore.map((o) => (
                  <p key={o}>{o}</p>
                ))}
                {ORARI_STUDIO.esempio && <Esempio cosa="gli orari" className="mt-1 w-fit" />}
              </>
            ) : (
              // BOZZA
              <p>Su appuntamento: giorno e ora li fissiamo insieme.</p>
            )}
          </Dato>
          <Dato titolo="Scrivimi">
            <p className="text-[var(--fg)]">Su Instagram, {IG_HANDLE}</p>
            {/* BOZZA */}
            <p>Rispondo io, di persona.</p>
            <p className="mt-3">
              <Bottone href={IG_DM_URL} piccolo variante="linea">
                Messaggio diretto
              </Bottone>
            </p>
          </Dato>
        </div>
      </div>
    </section>
  );
}
