import { IconaGiglio } from '@/components/icons';
import { TRATTAMENTI } from '@/lib/trattamenti';

const VOCI = [...TRATTAMENTI.map((t) => t.nome), 'Letture intuitive'];

/**
 * Il nastro con i nomi dei trattamenti e delle letture (dalla versione
 * precedente, data-marquee): segue velocità e verso dello scroll. È
 * decorativo: i nomi sono anche nel listino.
 */
export default function Nastro({ tono = 'tono-latte' }: { tono?: string }) {
  return (
    <div className={`nastro ${tono}`} aria-hidden>
      <div className="marquee" data-marquee>
        <div className="marquee-track">
          {[0, 1].map((g) => (
            <div key={g} className="marquee-group">
              {[...VOCI, ...VOCI].map((v, i) => (
                <span key={`${g}-${i}`} className="nastro-voce">
                  {v}
                  <IconaGiglio size={24} className="shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
