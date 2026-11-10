'use client';

import { useEffect, useRef, useState } from 'react';
import { Link2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons';

/** La barra di lettura in cima allo schermo: quanto manca alla fine dell'articolo. */
export function BarraLettura() {
  const barra = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const aggiorna = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      barra.current?.style.setProperty('transform', `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(aggiorna);
    };
    aggiorna();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden className="barra-lettura">
      <span ref={barra} />
    </div>
  );
}

/**
 * Condividi: il foglio di sistema dove c'è, altrimenti il link copiato; e
 * WhatsApp (un link che si apre fuori, niente pulsanti di terze parti in
 * pagina). L'indirizzo è quello della pagina aperta.
 */
export function Condividi({ titolo }: { titolo: string }) {
  const [copiato, setCopiato] = useState(false);
  const condividi = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: titolo, url });
      } catch {
        /* annullato */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopiato(true);
      window.setTimeout(() => setCopiato(false), 2500);
    } catch {
      /* niente appunti: resta l'indirizzo in alto */
    }
  };
  const whatsapp = () => window.open(`https://wa.me/?text=${encodeURIComponent(`${titolo} — ${window.location.href}`)}`, '_blank', 'noopener');
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="eyebrow">Ti è piaciuto? Condividilo</span>
      <button type="button" className="btn btn-sm" onClick={condividi}>
        <Link2 size={16} aria-hidden /> {copiato ? 'Link copiato' : 'Condividi'}
      </button>
      <button type="button" className="btn btn-outline btn-sm" onClick={whatsapp}>
        <WhatsAppIcon size={16} /> WhatsApp
      </button>
      <span className="sr-only" aria-live="polite">
        {copiato ? 'Link copiato' : ''}
      </span>
    </div>
  );
}
