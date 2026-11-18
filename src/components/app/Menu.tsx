'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { InstagramIcon } from '@/components/icons';
import Logo from '@/components/layout/Logo';
import { BottoneRichiesta } from '@/components/ui/Bottone';
import { lockScroll, scrollToTarget } from '@/lib/motion/scroll';
import { IG_DM_URL, IG_HANDLE, NAV, PRIVACY_HREF } from '@/lib/site';

/**
 * Il menu del telefono: un <dialog> nativo a tutto schermo, su vino (il
 * browser tiene il fuoco dentro, Esc lo chiude, la pagina sotto è inerte).
 * Le sezioni della landing salgono a cascata; sotto, le due richieste.
 * Il passo di cronologia (il gesto "indietro" lo chiude) lo tiene
 * AppProvider.
 */
export default function Menu({ open, onClose, onNavigate }: { open: boolean; onClose: () => void; onNavigate: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);

  // Un'ancora della stessa pagina: lo scroll riparte subito (con il menu
  // aperto è fermo), il menu si chiude e si scivola fino alla sezione.
  const vai = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const url = new URL(e.currentTarget.href, window.location.href);
    onNavigate();
    if (url.pathname !== window.location.pathname || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    lockScroll(false);
    requestAnimationFrame(() => {
      scrollToTarget(target);
      history.replaceState(history.state, '', url.hash);
    });
  };

  return (
    <dialog
      ref={ref}
      className="menu tono-vino"
      aria-label="Menu"
      data-menu
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="flex h-full flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+22px)] pt-[calc(env(safe-area-inset-top)+14px)]">
        <div className="flex h-[64px] items-center justify-between pl-[14px]">
          <Logo tono="notte" />
          <button type="button" onClick={onClose} aria-label="Chiudi il menu" className="tasto-tondo !text-latte">
            <span className="relative block h-5 w-5" aria-hidden>
              <span className="absolute left-0 top-1/2 h-[1.5px] w-5 rotate-45 rounded bg-current" />
              <span className="absolute left-0 top-1/2 h-[1.5px] w-5 -rotate-45 rounded bg-current" />
            </span>
          </button>
        </div>

        <nav className="mt-8 flex-1 overflow-y-auto" aria-label="Le sezioni">
          <ul className="border-t border-[var(--line)]">
            {[{ href: '/#inizio', label: 'Inizio' }, ...NAV].map((item, i) => (
              <li key={item.href} className="menu-voce border-b border-[var(--line)]" style={{ '--i': i } as React.CSSProperties}>
                <Link href={item.href} onClick={vai} className="flex items-baseline gap-4 py-[14px]">
                  <span className="meta w-6">{String(i).padStart(2, '0')}</span>
                  <span className="font-serif text-[38px] font-[450] leading-none tracking-[-0.02em]">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="menu-voce mt-8 grid gap-3" style={{ '--i': NAV.length + 1 } as React.CSSProperties}>
          <BottoneRichiesta tipo="trattamenti" variante="latte" className="w-full !justify-between" />
          <BottoneRichiesta tipo="letture" variante="linea" className="w-full !justify-between" />
          <div className="meta mt-3 flex items-center justify-between">
            <a href={IG_DM_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 py-2">
              <InstagramIcon size={16} /> {IG_HANDLE}
            </a>
            <Link href={PRIVACY_HREF} onClick={onNavigate} className="py-2">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </dialog>
  );
}
