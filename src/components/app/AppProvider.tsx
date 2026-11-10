'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { KonstaProvider } from 'konsta/react';
import { lockScroll } from '@/lib/motion/scroll';
import { rememberArrival } from '@/lib/source';

/* Da andrea-bellettati (src/components/app/AppProvider.tsx): il guscio
   "app" del sito. Il menu si carica solo quando serve (al primo segno di
   intenzione, vedi sotto): chi legge e basta non scarica il suo codice. */
const loadMenu = () => import('./MenuSheet');
const MenuSheet = dynamic(loadMenu, { ssr: false });

type AppApi = {
  /** Apre il menu "Tutto il sito" (telefono). */
  openMenu: () => void;
  /**
   * Chiude il foglio aperto perché si sta andando a un'altra pagina: toglie
   * il suo passo dalla cronologia invece di tornare indietro (un "indietro"
   * mentre parte la navigazione la annullerebbe).
   */
  dismissForNavigation: () => void;
  menuOpen: boolean;
};

const AppContext = createContext<AppApi | null>(null);

export function useApp(): AppApi {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp va usato dentro <AppProvider>');
  return ctx;
}

const HISTORY_FLAG = 'lilySheet';
const PAGE_LOAD = Math.random().toString(36).slice(2);
type SheetKind = 'menu';
const sheetOf = (state: unknown): SheetKind | null => {
  const s = state as Record<string, unknown> | null;
  return s?.[HISTORY_FLAG] === PAGE_LOAD ? ((s.kind as SheetKind) ?? null) : null;
};

/**
 * Aprire un foglio aggiunge un passo alla cronologia, così il gesto
 * "indietro" del telefono lo chiude invece di uscire dalla pagina.
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [sheet, setSheet] = useState<SheetKind | null>(null);
  const [menuMounted, setMenuMounted] = useState(false);

  const push = (kind: SheetKind) => {
    if (sheetOf(window.history.state)) window.history.replaceState({ [HISTORY_FLAG]: PAGE_LOAD, kind }, '');
    else window.history.pushState({ [HISTORY_FLAG]: PAGE_LOAD, kind }, '');
  };

  const openMenu = useCallback(() => {
    setMenuMounted(true);
    setSheet('menu');
    push('menu');
  }, []);

  const close = useCallback(() => {
    setSheet(null);
    if (sheetOf(window.history.state)) window.history.back();
  }, []);

  const dismissForNavigation = useCallback(() => {
    setSheet(null);
    if (sheetOf(window.history.state)) window.history.replaceState(null, '');
  }, []);

  // La prima pagina della visita e la sua campagna (vanno nell'email a Silvia).
  useEffect(rememberArrival, []);

  // Indietro/avanti: il foglio è aperto esattamente sul suo passo di cronologia.
  useEffect(() => {
    const onPop = (e: PopStateEvent) => setSheet(sheetOf(e.state));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Il codice del menu arriva al primo segno di intenzione: il puntatore
  // sopra il bottone, il dito che tocca, il focus.
  useEffect(() => {
    let menu = false;
    const warm = (e: Event) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el || menu || !el.closest('[data-menu-button]')) return;
      menu = true;
      void loadMenu().catch(() => (menu = false));
    };
    const opts = { capture: true, passive: true } as const;
    document.addEventListener('pointerover', warm, opts);
    document.addEventListener('pointerdown', warm, opts);
    document.addEventListener('focusin', warm, opts);
    return () => {
      document.removeEventListener('pointerover', warm, opts);
      document.removeEventListener('pointerdown', warm, opts);
      document.removeEventListener('focusin', warm, opts);
    };
  }, []);

  const anySheet = sheet !== null;

  // Con un foglio aperto la pagina sotto sta ferma (anche lo scroll morbido).
  useEffect(() => {
    lockScroll(anySheet);
  }, [anySheet]);

  return (
    <KonstaProvider theme="ios" dark={false}>
      <AppContext.Provider value={{ openMenu, dismissForNavigation, menuOpen: sheet === 'menu' }}>
        {children}
        {menuMounted && <MenuSheet open={sheet === 'menu'} onClose={close} onNavigate={dismissForNavigation} />}
      </AppContext.Provider>
    </KonstaProvider>
  );
}
