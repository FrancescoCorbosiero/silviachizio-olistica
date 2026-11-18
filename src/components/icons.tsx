import type { SVGProps } from 'react';
import type { IconaTrattamento } from '@/lib/trattamenti';

/* Le icone di Lily, a linea, "con la stessa mano" del listino: griglia 24,
   tratto 1,75, estremi arrotondati, colore dal testo (currentColor).
   Le quattro dei trattamenti stanno nei cerchi cipria (.cerchio).
   La freccia dei flussi e Instagram vengono da andrea-bellettati
   (src/components/icons.tsx). Tutte decorative: aria-hidden di default. */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Linea({ size = 24, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ── I trattamenti ──────────────────────────────────────────────────── */

/** Lily Holistic: il loto. */
export function IconaLoto(props: IconProps) {
  return (
    <Linea {...props}>
      <path d="M12 4.8c2.4 2.9 2.5 7.6 0 11.2-2.5-3.6-2.4-8.3 0-11.2Z" />
      <path d="M12 16c-3.6-.4-6-3-6.4-7 3.1.4 5.6 3 6.4 7Z" />
      <path d="M12 16c3.6-.4 6-3 6.4-7-3.1.4-5.6 3-6.4 7Z" />
      <path d="M12 17c-4 .6-7.6-.8-9.6-3.8 3.3-1 7 .5 9.6 3.8Z" />
      <path d="M12 17c4 .6 7.6-.8 9.6-3.8-3.3-1-7 .5-9.6 3.8Z" />
      <path d="M6.5 20.2c3.6-.9 7.4-.9 11 0" />
    </Linea>
  );
}

/** Lily Holistic Ritual: l'asciugamano arrotolato sul futon, con due scintille. */
export function IconaFuton(props: IconProps) {
  return (
    <Linea {...props}>
      <path d="M6.6 12.4h11.2a3.4 3.4 0 0 1 0 6.8H6.6" />
      <circle cx="6.6" cy="15.8" r="3.4" />
      <path d="M6.6 14.3a1.5 1.5 0 1 1-1.5 1.5" />
      <path d="M14.2 3.6c.3 1.6.8 2.1 2.4 2.4-1.6.3-2.1.8-2.4 2.4-.3-1.6-.8-2.1-2.4-2.4 1.6-.3 2.1-.8 2.4-2.4Z" />
      <path d="M19.3 7.4c.2.9.5 1.2 1.4 1.4-.9.2-1.2.5-1.4 1.4-.2-.9-.5-1.2-1.4-1.4.9-.2 1.2-.5 1.4-1.4Z" />
    </Linea>
  );
}

/** Lily Sportive: schiena e spalle. */
export function IconaSchiena(props: IconProps) {
  return (
    <Linea {...props}>
      <circle cx="12" cy="5.4" r="2.5" />
      <path d="M10.6 7.9v1.9M13.4 7.9v1.9" />
      <path d="M3.8 21c0-6.3 2.3-9.6 6.2-10.4a9.6 9.6 0 0 1 4 0c3.9.8 6.2 4.1 6.2 10.4" />
      <path d="M12 12.8v7.6" strokeDasharray="1.2 1.9" />
      <path d="M8 14.6c1 1.1 2.2 1.3 3 .5M16 14.6c-1 1.1-2.2 1.3-3 .5" />
    </Linea>
  );
}

/** Lily Magic: la candela con le pietre e il cristallo. */
export function IconaCandela(props: IconProps) {
  return (
    <Linea {...props}>
      <path d="M12 3.4c1.6 1.8 1.8 3.3 0 4.8-1.8-1.5-1.6-3 0-4.8Z" />
      <path d="M12 8.2v1.6" />
      <rect x="9.4" y="9.8" width="5.2" height="10.6" rx="1" />
      <ellipse cx="5.6" cy="19.2" rx="3.1" ry="1.5" />
      <ellipse cx="5.9" cy="16.4" rx="2.2" ry="1.2" />
      <path d="M17.2 20.4v-5.6l1.6-2.3 1.6 2.3v5.6M17.2 14.8h3.2" />
      <path d="M3 21.2h18" />
    </Linea>
  );
}

const ICONE_TRATTAMENTI: Record<IconaTrattamento, (props: IconProps) => React.JSX.Element> = {
  loto: IconaLoto,
  futon: IconaFuton,
  schiena: IconaSchiena,
  candela: IconaCandela,
};

/** L'icona di un trattamento del catalogo (src/lib/trattamenti.ts). */
export function IconaTrattamentoSvg({ icona, ...props }: IconProps & { icona: IconaTrattamento }) {
  const Icona = ICONE_TRATTAMENTI[icona];
  return <Icona {...props} />;
}

/* ── Con la stessa mano ─────────────────────────────────────────────── */

/** Il giglio in piccolo (header, icone): la versione semplice del giglio del logo. */
export function IconaGiglio(props: IconProps) {
  return (
    <Linea {...props}>
      <path d="M12 2.6c2 2.5 2.3 6.4 0 10-2.3-3.6-2-7.5 0-10Z" />
      <path d="M11.5 12.7c-3.4.3-6.9-1.5-9.3-4.6 1.5-.5 3-.3 4.4.3 2.3 1 4 2.5 4.9 4.3Z" />
      <path d="M12.5 12.7c3.4.3 6.9-1.5 9.3-4.6-1.5-.5-3-.3-4.4.3-2.3 1-4 2.5-4.9 4.3Z" />
      <path d="M11.6 13.4c-2.7 1.4-4.8 3.8-5.5 6.9 3-.7 5.1-3 5.5-6.9Z" />
      <path d="M12.4 13.4c2.7 1.4 4.8 3.8 5.5 6.9-3-.7-5.1-3-5.5-6.9Z" />
      <path d="M12 12.8v8.4" />
    </Linea>
  );
}


/** L'orologio delle durate. */
export function IconaOrologio(props: IconProps) {
  return (
    <Linea {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3.2 1.9" />
    </Linea>
  );
}

/** La scintilla ✦. */
export function IconaScintilla(props: IconProps) {
  return (
    <Linea {...props}>
      <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" />
    </Linea>
  );
}

/* ── Le frecce dei bottoni e dei collegamenti ───────────────────────── */

/** Freccia verso destra: si resta nel sito. */
export function Freccia({ size = 16, className = '', ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false" className={`freccia ${className}`} {...rest}>
      <path d="M2.5 8h10.5M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/** Freccia in diagonale: si apre un'altra scheda (il modulo, Instagram). */
export function FrecciaSu({ size = 16, className = '', ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false" className={`freccia-su ${className}`} {...rest}>
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

/* ── Da andrea-bellettati ───────────────────────────────────────────── */

export function ArrowIcon({ size = 16, className = 'arrow', ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" className={className} {...rest}>
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...rest}>
      <rect x="3" y="3" width="18" height="18" rx="5.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.4" cy="6.6" r="1.25" fill="currentColor" />
    </svg>
  );
}
