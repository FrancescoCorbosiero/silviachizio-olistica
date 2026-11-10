import type { ReactNode } from 'react';
import { InstagramIcon } from '@/components/icons';
import AlpacodeBadge from '@/components/layout/AlpacodeBadge';
import Logo from '@/components/layout/Logo';
import { IG_DM_URL, LEGAL, OWNER_NAME, PRIVACY_HREF, SITE_NAME } from '@/lib/site';

/**
 * Le pagine per il link in bio (da andrea-bellettati, (campagne)/layout.tsx):
 * niente menu, niente barra in basso, piè di pagina minimo. Chi arriva da
 * Instagram ha due cose da fare, le due richieste; il messaggio su
 * Instagram resta come strada breve per chi preferisce scrivere.
 */
export default function CampaignLayout({ children }: { children: ReactNode }) {
  return (
    <div data-campaign>
      <header className="wrap flex h-[64px] items-center justify-between gap-4 lg:h-[76px]">
        <Logo link={false} />
        <a className="icon-btn" href={IG_DM_URL} target="_blank" rel="noopener" aria-label="Scrivi a Silvia su Instagram">
          <InstagramIcon size={19} />
        </a>
      </header>
      <main id="contenuto">{children}</main>
      <footer className="wrap border-t border-petalo/50 pb-12 pt-8 text-[13.5px] leading-relaxed text-ink-mute">
        © {new Date().getFullYear()} {OWNER_NAME} · {SITE_NAME}
        {LEGAL.partitaIva ? ` · P.IVA ${LEGAL.partitaIva}` : ''}.{' '}
        {/* In un'altra scheda: la richiesta resta dov'è. */}
        <a href={PRIVACY_HREF} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-inchiostro">
          Privacy e cookie
        </a>
        <div className="mt-5">
          <AlpacodeBadge theme="light" />
        </div>
      </footer>
    </div>
  );
}
