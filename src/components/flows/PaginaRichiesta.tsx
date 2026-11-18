import type { ReactNode } from 'react';
import { InstagramIcon } from '@/components/icons';
import { IG_DM_URL, IG_HANDLE } from '@/lib/site';

/**
 * La pagina di una richiesta fatta dal sito (/prenota, /prenota/lettura),
 * solo con RICHIESTE_DAL = 'sito': la testata, la richiesta in pagina
 * (#richiesta) e, accanto, il messaggio su Instagram. Da qualsiasi altra
 * pagina gli stessi link aprono la richiesta come foglio (AppProvider):
 * qui ci si arriva senza JavaScript o con un link diretto.
 */
export default function PaginaRichiesta({
  titolo,
  testo,
  dopo,
  children,
}: {
  titolo: ReactNode;
  testo: ReactNode;
  /** Sotto il messaggio su Instagram (es. il disclaimer delle letture). */
  dopo?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <header className="tono-sabbia pb-[clamp(48px,6vw,80px)] pt-[clamp(150px,20vw,210px)]">
        <div className="wrap grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
          <h1 className="display lg:col-span-7 entra">{titolo}</h1>
          <p className="lead lg:col-span-4 lg:col-start-9 entra" style={{ '--d': '0.15s' } as React.CSSProperties}>
            {testo}
          </p>
        </div>
      </header>
      <section className="tono-latte section" aria-label="La tua richiesta">
        <div className="wrap grid items-start gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">{children}</div>
          <aside className="grid gap-6 lg:col-span-4 lg:col-start-9 lg:sticky lg:top-32">
            {/* BOZZA */}
            <p className="titoletto">
              Preferisci <em>scrivermi</em>?
            </p>
            <p className="text-[var(--fg-soft)]">Mandami un messaggio su Instagram: ti rispondo io.</p>
            <a className="link w-fit" href={IG_DM_URL} target="_blank" rel="noopener">
              <InstagramIcon size={16} /> {IG_HANDLE}
            </a>
            {dopo}
          </aside>
        </div>
      </section>
    </>
  );
}
