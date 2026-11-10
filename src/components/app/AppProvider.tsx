'use client';

import { Component, createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { KonstaProvider } from 'konsta/react';
import type { FlowKind } from '@/components/flows/FlowFor';
import { handoffFromSlug } from '@/components/flows/handoff';
import type { PrenotaDraft } from '@/lib/forms';
import { lockScroll } from '@/lib/motion/scroll';
import { rememberArrival } from '@/lib/source';

/* Da andrea-bellettati (src/components/app/AppProvider.tsx): il guscio
   "app" del sito. Le richieste e il menu si caricano solo quando servono
   (al primo segno di intenzione, vedi sotto): chi legge e basta non
   scarica il codice dei moduli. */
const loadFlow = () => import('@/components/flows/FlowOverlay');
const loadMenu = () => import('./MenuSheet');
const FlowOverlay = dynamic(loadFlow, { ssr: false });
const MenuSheet = dynamic(loadMenu, { ssr: false });

type AppApi = {
  /** Apre una richiesta sopra la pagina (foglio su telefono, pannello su desktop). */
  openFlow: (kind: FlowKind, handoff?: Partial<PrenotaDraft>) => void;
  /** Apre il menu "Tutto il sito" (telefono). */
  openMenu: () => void;
  /**
   * Chiude il foglio aperto perché si sta andando a un'altra pagina: toglie
   * il suo passo dalla cronologia invece di tornare indietro (un "indietro"
   * mentre parte la navigazione la annullerebbe).
   */
  dismissForNavigation: () => void;
  menuOpen: boolean;
  /** La richiesta aperta sopra la pagina, se c'è. */
  flowOpen: FlowKind | null;
};

const AppContext = createContext<AppApi | null>(null);

export function useApp(): AppApi {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp va usato dentro <AppProvider>');
  return ctx;
}

/** Le pagine che ospitano le richieste in pagina: lì i link non aprono il foglio. */
const FLOW_PATHS: Record<FlowKind, string> = { prenota: '/prenota', lettura: '/letture' };
const FLOW_HASH = '#richiesta';

/** La richiesta a cui porta un link (/prenota#richiesta, /letture#richiesta), se porta a una. */
function flowOfUrl(url: URL): FlowKind | null {
  if (url.origin !== window.location.origin || url.hash !== FLOW_HASH) return null;
  if (url.pathname === FLOW_PATHS.prenota) return 'prenota';
  if (url.pathname === FLOW_PATHS.lettura) return 'lettura';
  return null;
}

const HISTORY_FLAG = 'lilySheet';
const PAGE_LOAD = Math.random().toString(36).slice(2);
type SheetKind = 'menu' | FlowKind;
const sheetOf = (state: unknown): SheetKind | null => {
  const s = state as Record<string, unknown> | null;
  return s?.[HISTORY_FLAG] === PAGE_LOAD ? ((s.kind as SheetKind) ?? null) : null;
};

/** Se il codice del foglio non si scarica (offline, nuovo deploy), si va alla pagina. */
class OverlayBoundary extends Component<{ href: string; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    window.location.assign(this.props.href);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Ogni link a una richiesta apre il foglio sul posto invece di cambiare
 * pagina (i link restano link veri: senza JavaScript, in una nuova scheda o
 * per i motori di ricerca portano alla pagina). Aprire un foglio aggiunge
 * un passo alla cronologia, così il gesto "indietro" del telefono lo
 * chiude invece di uscire dalla pagina.
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sheet, setSheet] = useState<SheetKind | null>(null);
  const [session, setSession] = useState<{ id: number; kind: FlowKind; handoff: Partial<PrenotaDraft>; path: string } | null>(null);
  const [menuMounted, setMenuMounted] = useState(false);

  const push = (kind: SheetKind) => {
    if (sheetOf(window.history.state)) window.history.replaceState({ [HISTORY_FLAG]: PAGE_LOAD, kind }, '');
    else window.history.pushState({ [HISTORY_FLAG]: PAGE_LOAD, kind }, '');
  };

  const openFlow = useCallback((kind: FlowKind, handoff: Partial<PrenotaDraft> = {}) => {
    setSession((s) => ({ id: (s?.id ?? 0) + 1, kind, handoff, path: window.location.pathname }));
    setSheet(kind);
    push(kind);
  }, []);

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

  // Ogni link a una richiesta apre il foglio (tranne sulla pagina che la ospita).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      const kind = flowOfUrl(url);
      if (!kind || window.location.pathname === FLOW_PATHS[kind]) return;
      e.preventDefault();
      const handoff = kind === 'prenota' ? handoffFromSlug(url.searchParams.get('trattamento')) : {};
      window.setTimeout(() => openFlow(kind, handoff), 0);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [openFlow]);

  // Il codice dei fogli (richieste, menu) arriva al primo segno di
  // intenzione: il puntatore sopra il link, il dito che tocca, il focus.
  // Così non pesa su chi legge e basta, e sulle pagine che ospitano la
  // richiesta in pagina non arriva proprio.
  useEffect(() => {
    let flow = false;
    let menu = false;
    const warm = (e: Event) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;
      if (!menu && el.closest('[data-menu-button]')) {
        menu = true;
        void loadMenu().catch(() => (menu = false));
        return;
      }
      if (flow) return;
      const link = el.closest<HTMLAnchorElement>(`a[href*="${FLOW_HASH}"]`);
      if (!link) return;
      const kind = flowOfUrl(new URL(link.href, window.location.href));
      if (!kind || window.location.pathname === FLOW_PATHS[kind]) return;
      flow = true;
      void loadFlow().catch(() => (flow = false));
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

  const flowShown = !!session && sheet === session.kind && session.path === pathname;
  const anySheet = flowShown || sheet === 'menu';

  // Con un foglio aperto la pagina sotto sta ferma (anche lo scroll morbido).
  useEffect(() => {
    lockScroll(anySheet);
  }, [anySheet]);

  return (
    <KonstaProvider theme="ios" dark={false}>
      <AppContext.Provider
        value={{ openFlow, openMenu, dismissForNavigation, menuOpen: sheet === 'menu', flowOpen: flowShown ? session.kind : null }}
      >
        {children}
        {session && (
          <OverlayBoundary href={`${FLOW_PATHS[session.kind]}${FLOW_HASH}`}>
            <FlowOverlay open={flowShown} session={session.id} kind={session.kind} handoff={session.handoff} onClose={close} />
          </OverlayBoundary>
        )}
        {menuMounted && <MenuSheet open={sheet === 'menu'} onClose={close} onNavigate={dismissForNavigation} />}
      </AppContext.Provider>
    </KonstaProvider>
  );
}
