'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useApp } from '@/components/app/AppProvider';
import { InstagramIcon } from '@/components/icons';
import { BottoneRichiesta } from '@/components/ui/Bottone';
import { IG_HANDLE, IG_URL, NAV } from '@/lib/site';
import Logo from './Logo';

/** Le sezioni della landing che l'header segue (gli id delle ancore di NAV). */
const SEZIONI = NAV.map((n) => n.href.split('#')[1]).filter((id): id is string => Boolean(id));

/**
 * La testata: una pillola di vetro latte sospesa sulla pagina. Desktop:
 * marchio, le sezioni della landing (si accende quella che stai leggendo),
 * Instagram e «Prenota». Telefono: marchio e menu; «Prenota» sta nella
 * barra in basso. Scendendo si ritira, al primo cenno di risalita torna.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const { openMenu, menuOpen } = useApp();
  const [via, setVia] = useState(false);
  const [qui, setQui] = useState<string | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return;
      setVia(y > 320 && y > lastY);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // La sezione che attraversa il centro dello schermo.
  useEffect(() => {
    if (pathname !== '/') return;
    const els = SEZIONI.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setQui(e.target.id);
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < window.innerHeight * 0.5 && setQui(null);
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, [pathname]);

  return (
    // Il focus da tastiera la riporta sempre in vista.
    <header className={`testata ${via && !menuOpen ? 'is-via' : ''}`} onFocusCapture={() => setVia(false)}>
      <div className="testata-pillola">
        <Logo />

        <nav aria-label="Principale" className="hidden items-center lg:flex">
          {NAV.map((item) => {
            // Le pagine: attive per percorso; le ancore della home: con la sezione in vista.
            const [percorso, ancora] = item.href.split('#');
            const pagina = !ancora && !!percorso && pathname.startsWith(percorso);
            const attiva = pagina || (pathname === '/' && qui === ancora);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-voce ${attiva ? 'is-qui' : ''}`}
                aria-current={pagina ? 'page' : attiva ? 'location' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <a className="tasto-tondo hidden lg:grid" href={IG_URL} target="_blank" rel="noopener" aria-label={`Instagram di Silvia, ${IG_HANDLE}`}>
            <InstagramIcon size={19} />
          </a>
          <BottoneRichiesta tipo="trattamenti" breve piccolo className="hidden lg:inline-flex" />
          <button
            type="button"
            onClick={openMenu}
            data-menu-button
            aria-label="Apri il menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="tasto-tondo lg:hidden"
          >
            <span className="grid w-5 gap-[6px]" aria-hidden>
              <span className="block h-[1.5px] w-5 rounded bg-current" />
              <span className="block h-[1.5px] w-3 rounded bg-lily" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
