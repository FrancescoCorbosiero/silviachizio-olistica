import { IconaGiglio, InstagramIcon } from '@/components/icons';
import { IG_DM_URL, IG_HANDLE, IG_URL, OWNER_NAME } from '@/lib/site';

/**
 * Il profilo Instagram in una scheda statica: niente embed (pesano,
 * portano cookie di terze parti). Le righe sono quelle della bio di Silvia.
 * Niente numeri di follower finché Silvia non vuole citarli (domande aperte).
 */
export default function SchedaInstagram({ className = '' }: { className?: string }) {
  return (
    <div className={`petalo flex flex-col gap-5 p-6 sm:p-7 ${className}`}>
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-cipria p-[3px] [background:linear-gradient(135deg,var(--color-candela),var(--color-lily),var(--color-lily-deep))]">
          <span className="grid h-full w-full place-items-center rounded-full bg-carta text-lily">
            <IconaGiglio size={30} />
          </span>
        </span>
        <div className="min-w-0">
          <p className="truncate text-[17px] font-bold">{IG_HANDLE.slice(1)}</p>
          <p className="testo-mute text-[15px]">{OWNER_NAME}</p>
        </div>
        <InstagramIcon size={22} className="ml-auto shrink-0 text-lily" />
      </div>
      <div className="space-y-1 text-[16px] leading-snug">
        <p>Vivo e sorrido</p>
        <p>Lily Trattamenti Benessere</p>
        <p className="testo-mute">Montebelluna / Treviso</p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <a className="btn btn-sm" href={IG_URL} target="_blank" rel="noopener">
          Seguimi
        </a>
        <a className="btn btn-outline btn-sm" href={IG_DM_URL} target="_blank" rel="noopener">
          Scrivimi un messaggio
        </a>
      </div>
    </div>
  );
}
