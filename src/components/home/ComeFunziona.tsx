import { CalendarHeart, MessageCircleHeart } from 'lucide-react';
import { IconaGiglio, IconaLoto, IconaOrologio } from '@/components/icons';
import { SU_INSTAGRAM } from '@/lib/richieste';
import { IG_HANDLE, ZONA } from '@/lib/site';
import { RELAX_MINUTI } from '@/lib/trattamenti';

/* BOZZE (docs/testi-da-validare.md): i quattro passi, veri per come si
   prenota oggi (il primo cambia con il modulo dei trattamenti). */
const PASSI = [
  {
    titolo: SU_INSTAGRAM.trattamenti ? 'Mi scrivi su Instagram' : 'Mi mandi la richiesta',
    testo: SU_INSTAGRAM.trattamenti ? 'Il trattamento che ti interessa e quando ti va.' : 'Il trattamento che ti interessa e quando ti va: due minuti.',
    Icona: MessageCircleHeart,
    tono: 'bg-cipria text-inchiostro',
  },
  { titolo: 'Ti scrivo io', testo: 'Per fissare insieme giorno e ora, come preferisci tu.', Icona: CalendarHeart, tono: 'bg-blush text-inchiostro' },
  { titolo: 'Il trattamento', testo: `Un'ora (o un'ora e un quarto) solo per te, a ${ZONA.replace(' (TV)', '')}.`, Icona: IconaLoto, tono: 'bg-notte text-latte' },
  { titolo: 'Il tuo momento relax', testo: `Circa ${RELAX_MINUTI} minuti, prima di tornare alla giornata.`, Icona: IconaOrologio, tono: 'bg-cera text-inchiostro' },
] as const;

/**
 * Come funziona, raccontato come le stories di Instagram nel telefono
 * (dalla versione precedente, data-stories): scorrendo le barre si
 * riempiono e ogni storia spinge via la precedente. Su desktop la sezione
 * resta ferma, sul telefono resta fermo solo il telefono. Senza script:
 * quattro schede in fila.
 */
export default function ComeFunziona() {
  return (
    <section className="tono-latte section overflow-clip" aria-labelledby="come-titolo" data-stories>
      <div data-pin-stage>
        <div className="wrap grid items-center gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            {/* BOZZA */}
            <h2 id="come-titolo" className="titolo" data-split>
              Come <em>funziona</em>
            </h2>
            {/* BOZZA */}
            <p className="lead mt-7" data-reveal>
              Nessun appuntamento automatico: mi scrivi, ti rispondo io e scegliamo insieme. Scorri, te lo racconto come una storia.
            </p>
          </div>
          <div className="relative lg:col-span-5 lg:col-start-8" data-story-dock>
            <div className="telefono" data-story-phone>
              <div className="flex gap-1.5 px-2 pb-2.5 pt-1.5" aria-hidden>
                {PASSI.map((p) => (
                  <span key={p.titolo} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                    <i className="block h-full bg-white" data-story-bar />
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 px-3 pb-3 pt-1 text-latte">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-carta text-lily">
                  <IconaGiglio size={16} />
                </span>
                <span className="min-w-0 truncate text-[13px] font-bold">{IG_HANDLE.slice(1)}</span>
                <span className="shrink-0 whitespace-nowrap text-[12px] text-latte/70">Come funziona</span>
              </div>
              <ol className="story-slides grid gap-2.5">
                {PASSI.map((p, i) => (
                  <li
                    key={p.titolo}
                    className={`story-slide relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-[24px] p-5 pb-6 ${p.tono}`}
                    style={{ backgroundImage: 'radial-gradient(120% 85% at 0% 0%, rgb(255 255 255 / 0.3), rgb(255 255 255 / 0) 58%)' }}
                    data-story-slide
                  >
                    <span className="cifre absolute left-5 top-4 text-[92px] text-lily" data-story-piece>
                      {i + 1}
                    </span>
                    <p.Icona size={64} strokeWidth={1.3} className="absolute right-5 top-7 opacity-80" aria-hidden data-story-piece />
                    <h3 className="font-serif text-[27px] font-medium leading-tight" data-story-piece>
                      {p.titolo}
                    </h3>
                    <p className="mt-1.5 text-[15.5px] opacity-90" data-story-piece>
                      {p.testo}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
