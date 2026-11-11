'use client';

// Da andrea-bellettati (src/components/motion/MotionPage.tsx).

import { usePathname } from 'next/navigation';
import { useLayoutEffect, type ReactNode } from 'react';
import { reduced } from '@/lib/motion/fx';
import { syncScroll } from '@/lib/motion/scroll';

/**
 * Accende il motore delle animazioni per ogni pagina. Vive in
 * app/template.tsx, ma il template da solo non basta: è sopra i gruppi
 * (sito) e (campagne), e Next lo rimonta solo quando cambia il gruppo, non
 * passando da una pagina all'altra dello stesso gruppo. Senza un nuovo
 * avvio il motore restava quello della pagina prima (fumetti invisibili,
 * niente parallax, il video che non ripartiva): per questo la pagina ha la
 * chiave del suo percorso, e cambiando percorso si rimonta (novembre 2026).
 */
export default function MotionPage({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <PaginaMossa key={pathname}>{children}</PaginaMossa>;
}

/**
 * Il motore arriva con un import dinamico, dopo la pagina: GSAP non pesa
 * sull'idratazione e chi chiede "riduci movimento" non lo scarica nemmeno.
 * La pulizia è in un layout effect: gira prima che React tolga la pagina
 * dal DOM, così i pin di ScrollTrigger e i titoli divisi tornano com'erano
 * e React trova ogni nodo al suo posto.
 */
function PaginaMossa({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    // Next ha appena riportato la pagina in cima: Lenis riparte da lì.
    syncScroll();
    if (reduced()) return;
    let stop: (() => void) | undefined;
    let gone = false;
    void import('@/lib/motion/engine').then((engine) => {
      if (!gone) stop = engine.startPage();
    });
    return () => {
      gone = true;
      stop?.();
    };
  }, []);
  return children;
}
