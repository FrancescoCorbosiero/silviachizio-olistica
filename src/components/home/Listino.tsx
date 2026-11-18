import Bottone from '@/components/ui/Bottone';
import Esempio from '@/components/ui/Esempio';
import { fotoTrattamento, prezzo } from '@/lib/anteprima';
import { IMMAGINI } from '@/lib/immagini';
import { DAL_MODULO, etichetta, linkRichiesta, RICHIESTE, SU_INSTAGRAM } from '@/lib/richieste';
import { prenotaQuesto, RELAX_MINUTI, RELAX_TESTO, TRATTAMENTI } from '@/lib/trattamenti';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Il listino, come quello di Silvia: le quattro righe con il nome, la
 * descrizione e i minuti, a filetti, e in fondo il momento relax. Ogni riga
 * si apre (un <details>, anche senza JavaScript) con cosa aspettarsi, per
 * chi è, il prezzo se c'è e «Prenota questo trattamento». Con il mouse,
 * l'anteprima ad arco segue il puntatore (solo con le foto dei trattamenti;
 * in anteprima con le atmosfere).
 *
 * È il foglio che sale sopra la hero (.foglio).
 */
export default function Listino() {
  const foto = TRATTAMENTI.map((t) => fotoTrattamento(t.slug));
  const conFoto = foto.every(Boolean);
  return (
    <section id="trattamenti" className="foglio tono-latte" aria-labelledby="trattamenti-titolo">
      <div className="wrap section">
        <header className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
          {/* Le parole del listino di Silvia. */}
          <h2 id="trattamenti-titolo" className="titolo lg:col-span-7" data-split>
            Quattro esperienze <em>di benessere</em>
          </h2>
          {/* BOZZA */}
          <p className="lead lg:col-span-4 lg:col-start-9" data-reveal>
            Massaggi e rituali olistici, nel mio studio a Montebelluna. Scegli quello che ti somiglia; se non sai quale, lo
            scegliamo insieme.
          </p>
        </header>

        <div data-hover-list className="relative mt-[clamp(40px,5vw,72px)]">
          <div className="listino" data-reveal="stagger">
            {TRATTAMENTI.map((t, i) => {
              const p = prezzo(t.prezzo);
              const href = DAL_MODULO ? linkRichiesta('trattamenti').href : prenotaQuesto(t.slug);
              return (
                <details key={t.slug} id={t.slug} name="listino" className="voce" data-hover-row>
                  <summary>
                    <span className="voce-n meta">{pad(i + 1)}</span>
                    <h3 className="voce-nome">{t.nome}</h3>
                    {/* La descrizione del listino, così com'è. */}
                    <span className="voce-breve">{t.breve}</span>
                    <span className="voce-durata">
                      <span className="text-right">
                        <span className="cifre block">{t.durata}</span>
                        <small>minuti</small>
                      </span>
                      <span className="voce-x" aria-hidden />
                    </span>
                  </summary>
                  <div className="voce-dentro">
                    <div>
                      <p className="meta">Cosa aspettarti</p>
                      <p className="mt-2">{t.aspettarsi}</p>
                    </div>
                    <div>
                      <p className="meta">Per chi è</p>
                      <p className="mt-2">{t.perChi}</p>
                    </div>
                    <div className="flex flex-col items-start gap-4">
                      {p && (
                        <p className="flex items-center gap-3">
                          <span className="cifre text-[2rem]">{p.valore}</span>
                          {p.esempio && <Esempio cosa="il prezzo" />}
                        </p>
                      )}
                      <Bottone href={href} piccolo variante="vino">
                        {RICHIESTE.trattamenti.sospesa || SU_INSTAGRAM.trattamenti ? etichetta('trattamenti') : 'Prenota questo'}
                      </Bottone>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
          <p className="relax-riga corsivo" data-reveal>
            {RELAX_TESTO} <i aria-hidden>·</i> circa {RELAX_MINUTI} minuti
          </p>

          {conFoto && (
            <div data-hover-panel aria-hidden className="anteprima-voce arco hidden lg:block">
              {foto.map((f, i) => {
                const img = f ? IMMAGINI[f.valore] : null;
                return img ? (
                  <div key={TRATTAMENTI[i]?.slug} data-hover-shot>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.srcVerticale} alt="" width={900} height={1500} loading="lazy" decoding="async" />
                  </div>
                ) : null;
              })}
              {foto.some((f) => f?.esempio) && <Esempio sopra cosa="le foto dei trattamenti" />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
