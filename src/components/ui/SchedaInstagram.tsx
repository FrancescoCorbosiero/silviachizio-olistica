import { IconaGiglio, InstagramIcon } from '@/components/icons';
import Bottone from '@/components/ui/Bottone';
import { IG_DM_URL, IG_HANDLE, IG_URL, OWNER_NAME } from '@/lib/site';

/**
 * Il profilo Instagram in una scheda statica (dalla versione precedente):
 * niente embed, che pesano e portano cookie di terze parti. Le righe sono
 * quelle della bio di Silvia; niente numeri di follower finché lei non vuole
 * citarli (domande aperte).
 */
export default function SchedaInstagram({ className = '' }: { className?: string }) {
  return (
    <div className={`scheda-ig ${className}`}>
      <div className="flex items-center gap-4">
        <span className="scheda-ig-foto">
          <span className="grid h-full w-full place-items-center rounded-full bg-latte text-lily">
            <IconaGiglio size={28} />
          </span>
        </span>
        <div className="min-w-0">
          <p className="truncate text-[17px] font-bold">{IG_HANDLE.slice(1)}</p>
          <p className="text-[15px] text-ink-mute">{OWNER_NAME}</p>
        </div>
        <InstagramIcon size={22} className="ml-auto shrink-0 text-lily" />
      </div>
      <div className="space-y-1 text-[16px] leading-snug">
        <p>Vivo e sorrido</p>
        <p>Lily Trattamenti Benessere</p>
        <p className="text-ink-mute">Montebelluna / Treviso</p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Bottone href={IG_URL} piccolo>
          Seguimi
        </Bottone>
        <Bottone href={IG_DM_URL} piccolo variante="linea">
          Scrivimi un messaggio
        </Bottone>
      </div>
    </div>
  );
}
