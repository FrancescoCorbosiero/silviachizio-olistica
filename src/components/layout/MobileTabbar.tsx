'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Tabbar, TabbarLink, ToolbarPane } from 'konsta/react';
import { CalendarHeart, House, LayoutGrid } from 'lucide-react';
import { useApp } from '@/components/app/AppProvider';
import { IconaLoto, IconaScintilla } from '@/components/icons';
import { etichetta, RICHIESTE } from '@/lib/richieste';

/**
 * Telefono e tablet: la barra di un'app, di vetro rosato, sempre a portata
 * di pollice (da andrea-bellettati, MobileTabbar.tsx). Home, Trattamenti,
 * "Prenota" al centro in evidenza, Letture e "Menu" per tutto il resto.
 */
export default function MobileTabbar() {
  const pathname = usePathname();
  const { openMenu, menuOpen, flowOpen } = useApp();
  const on = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const nothingOpen = !menuOpen && !flowOpen;

  // Konsta mette role="link" su ogni voce della barra, anche sui bottoni:
  // "Menu" apre un foglio, per i lettori di schermo è un bottone.
  useEffect(() => {
    document.querySelector('[data-menu-button]')?.setAttribute('role', 'button');
  });

  return (
    <nav className="lg:hidden" aria-label="Navigazione">
      {/* Sotto la capsula, una velatura latte leggera al posto del bianco di iOS. */}
      <Tabbar
        labels
        icons
        className="fixed bottom-0 left-0 z-40"
        colors={{ bgIos: 'bg-gradient-to-t from-latte/80 to-transparent' }}
      >
        <ToolbarPane>
          <TabbarLink
            component={Link}
            linkProps={{ href: '/' }}
            active={nothingOpen && on('/')}
            icon={<House size={24} strokeWidth={1.75} aria-hidden />}
            label="Home"
          />
          <TabbarLink
            component={Link}
            linkProps={{ href: '/trattamenti' }}
            active={nothingOpen && on('/trattamenti')}
            icon={<IconaLoto size={24} />}
            label="Trattamenti"
          />
          <TabbarLink
            linkProps={{ href: RICHIESTE.trattamenti.href, className: 'tab-prenota' }}
            active={flowOpen === 'prenota' || (nothingOpen && on('/prenota'))}
            icon={
              <span className="tab-prenota-icona">
                <CalendarHeart size={21} strokeWidth={1.9} aria-hidden />
              </span>
            }
            label={etichetta('trattamenti', { breve: true })}
          />
          <TabbarLink
            component={Link}
            linkProps={{ href: '/letture' }}
            active={flowOpen === 'lettura' || (nothingOpen && on('/letture'))}
            icon={<IconaScintilla size={24} />}
            label="Letture"
          />
          <TabbarLink
            component="button"
            linkProps={{ type: 'button', 'data-menu-button': '' }}
            onClick={openMenu}
            active={menuOpen}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            icon={<LayoutGrid size={24} strokeWidth={1.75} aria-hidden />}
            label="Menu"
          />
        </ToolbarPane>
      </Tabbar>
    </nav>
  );
}
