import { CalendarHeart, MessageCircleHeart } from 'lucide-react';
import { IconaGiglio, IconaLoto, IconaOrologio } from '@/components/icons';
import SectionHead from '@/components/ui/SectionHead';
import { IG_HANDLE } from '@/lib/site';

/* BOZZE (docs/testi-da-validare.md). */
const PASSI = [
  { titolo: 'Mi scrivi dal sito', testo: 'Scegli il trattamento e quando ti va: due minuti, un passo alla volta.', Icona: MessageCircleHeart, tono: 'bg-cipria text-inchiostro' },
  { titolo: 'Ti scrivo io', testo: 'Per fissare insieme giorno e ora, come preferisci tu.', Icona: CalendarHeart, tono: 'bg-blush text-inchiostro' },
  { titolo: 'Il trattamento', testo: "Un'ora (o un'ora e un quarto) solo per te.", Icona: IconaLoto, tono: 'bg-notte text-latte' },
  { titolo: 'Il tuo momento relax', testo: 'Circa quindici minuti, prima di tornare alla giornata.', Icona: IconaOrologio, tono: 'bg-cera text-inchiostro' },
] as const;

/**
 * Come funziona, raccontato come le stories di Instagram nel telefono
 * (data-stories, da andrea-bellettati): scorrendo le barre si riempiono e
 * ogni slide spinge via la precedente. Senza script: quattro card in fila.
 */
export default function ComeFunziona() {
  return (
    <section className="section overflow-clip" aria-labelledby="come-titolo" data-stories>
      <div data-pin-stage>
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
          <SectionHead
            id="come-titolo"
            eyebrow="Come funziona"
            // BOZZA
            title="Quattro passi, nessuna"
            script="fretta"
            // BOZZA
            lead="Nessun appuntamento automatico: mi scrivi, ti rispondo io e scegliamo insieme. Scorri, te lo racconto come una storia."
          />
          <div className="relative" data-story-dock>
            <div className="relative mx-auto w-[min(330px,86vw)] rounded-[44px] bg-notte p-3 shadow-[var(--shadow-petalo-l)]" data-story-phone>
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
                    className={`story-slide relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-[26px] p-5 pb-6 ${p.tono}`}
                    style={{ backgroundImage: 'radial-gradient(120% 85% at 0% 0%, rgb(255 255 255 / 0.3), rgb(255 255 255 / 0) 58%)' }}
                    data-story-slide
                  >
                    <span className="absolute left-5 top-4 font-script text-[96px] leading-[0.9] text-lily" data-story-piece>
                      {i + 1}
                    </span>
                    <p.Icona size={72} strokeWidth={1.3} className="absolute right-5 top-7 opacity-80" aria-hidden data-story-piece />
                    <h3 className="font-serif text-[25px] font-bold leading-tight" data-story-piece>
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
