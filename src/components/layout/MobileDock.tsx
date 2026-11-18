'use client';

import { useApp } from '@/components/app/AppProvider';
import { InstagramIcon } from '@/components/icons';
import { BottoneRichiesta } from '@/components/ui/Bottone';
import { IG_DM_URL, IG_HANDLE } from '@/lib/site';

/**
 * La barra in basso sul telefono, a portata di pollice: il messaggio su
 * Instagram (il canale che il pubblico di Silvia usa già) e «Prenota un
 * trattamento». Si toglie di mezzo quando è aperto il menu o un foglio.
 */
export default function MobileDock() {
  const { menuOpen, flowOpen } = useApp();
  return (
    <div className={`dock lg:hidden ${menuOpen || flowOpen ? 'is-via' : ''}`}>
      <div className="dock-pillola">
        <a href={IG_DM_URL} target="_blank" rel="noopener" aria-label={`Scrivimi su Instagram, ${IG_HANDLE}`} className="tasto-tondo !h-[50px] !w-[50px]">
          <InstagramIcon size={21} />
        </a>
        <BottoneRichiesta tipo="trattamenti" />
      </div>
    </div>
  );
}
