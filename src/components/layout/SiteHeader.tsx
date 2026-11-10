'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { InstagramIcon, WhatsAppIcon } from '@/components/icons';
import { etichetta, RICHIESTE } from '@/lib/richieste';
import { HAS_WA, IG_HANDLE, IG_URL, NAV, waLink } from '@/lib/site';
import Logo from './Logo';

/**
 * Header di vetro rosato (da andrea-bellettati, SiteHeader.tsx). Desktop:
 * marchio, voci, Instagram e "Prenota". Telefono: marchio e Instagram; il
 * resto vive nella barra in basso (MobileTabbar), come in un'app. Leggendo
 * verso il basso si toglie di mezzo; risalendo torna.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > 260 && y > lastY + 4) setHidden(true);
      else if (y < lastY - 4 || y <= 260) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      // Il focus da tastiera lo riporta sempre in vista.
      onFocusCapture={() => setHidden(false)}
      className={`site-header sticky top-0 z-50 border-b ${hidden ? 'is-hidden' : ''} ${
        scrolled
          ? 'border-white/70 bg-latte/80 shadow-[0_12px_30px_-24px_rgb(196_10_76/0.55)]'
          : 'border-transparent bg-latte/55'
      }`}
      style={{ WebkitBackdropFilter: 'blur(20px) saturate(1.6)', backdropFilter: 'blur(20px) saturate(1.6)' }}
    >
      <div className="wrap flex h-[64px] items-center justify-between gap-4 lg:h-[76px]">
        <Logo />

        <nav aria-label="Principale" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-[var(--radius-tile)] px-4 py-2.5 text-[15.5px] font-[650] transition-colors duration-300 ${
                isActive(item.href) ? 'bg-cipria text-lily-deep' : 'text-inchiostro hover:bg-white/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a className="icon-btn" href={IG_URL} target="_blank" rel="noopener" aria-label={`Instagram di Silvia, ${IG_HANDLE}`}>
            <InstagramIcon size={19} />
          </a>
          {HAS_WA && (
            <a className="icon-btn" href={waLink('Ciao Silvia! Ti scrivo dal sito 🌸')} target="_blank" rel="noopener" aria-label="Scrivi a Silvia su WhatsApp">
              <WhatsAppIcon size={18} />
            </a>
          )}
          <Link className="btn btn-sm hidden lg:inline-flex" href={RICHIESTE.trattamenti.href}>
            {etichetta('trattamenti', { breve: true })}
          </Link>
        </div>
      </div>
    </header>
  );
}
