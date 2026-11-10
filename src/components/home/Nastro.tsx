import { IconaScintilla } from '@/components/icons';
import { TRATTAMENTI } from '@/lib/trattamenti';

const VOCI = [...TRATTAMENTI.map((t) => t.nome), 'Letture intuitive'];

/**
 * Il nastro con i nomi dei trattamenti e delle letture, sulla pennellata
 * blush del listino (data-marquee: segue velocità e verso dello scroll, si
 * ferma al passaggio). È decorativo: i nomi sono anche nel listino qui sotto.
 */
export default function Nastro() {
  return (
    <div className="nastro relative py-3" aria-hidden>
      <div className="marquee" data-marquee>
        <div className="marquee-track">
          {[0, 1].map((g) => (
            <div key={g} className="marquee-group">
              {[...VOCI, ...VOCI].map((v, i) => (
                <span key={`${g}-${i}`} className="inline-flex items-center gap-6 pr-6 font-serif text-[clamp(26px,3.6vw,46px)] italic leading-none text-inchiostro">
                  {v}
                  <IconaScintilla size={22} className="shrink-0 text-lily" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
