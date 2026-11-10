import { IconaGiglio } from '@/components/icons';
import { TRATTAMENTI } from '@/lib/trattamenti';

const VOCI = [...TRATTAMENTI.map((t) => t.nome), 'Letture intuitive'];

/**
 * Il nastro con i nomi dei trattamenti e delle letture, su una fascia
 * lily piena (data-marquee: segue velocità e verso dello scroll, si ferma
 * al passaggio). È decorativo: i nomi sono anche nel listino qui sotto.
 */
export default function Nastro() {
  return (
    <div className="nastro" aria-hidden>
      <div className="marquee" data-marquee>
        <div className="marquee-track">
          {[0, 1].map((g) => (
            <div key={g} className="marquee-group">
              {[...VOCI, ...VOCI].map((v, i) => (
                <span key={`${g}-${i}`} className="nastro-voce">
                  {v}
                  <IconaGiglio size={28} className="shrink-0 text-petalo" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
