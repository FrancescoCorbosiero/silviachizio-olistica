import type { SVGProps } from 'react';
import type { IconaTrattamento } from '@/lib/trattamenti';

/* Le icone di Lily, a linea, "con la stessa mano" del listino: griglia 24,
   tratto 1,75, estremi arrotondati, colore dal testo (currentColor).
   Le quattro dei trattamenti stanno nei cerchi cipria (.cerchio).
   Freccia, WhatsApp, Instagram e sottolineatura vengono da andrea-bellettati
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

/** L'orologio delle durate. */
export function IconaOrologio(props: IconProps) {
  return (
    <Linea {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3.2 1.9" />
    </Linea>
  );
}

/** Il cuore disegnato a mano (un po' storto, apposta). */
export function IconaCuore(props: IconProps) {
  return (
    <Linea {...props}>
      <path d="M12 20c-5.9-4.4-8.7-7.5-8.4-11.2.3-2.8 2.9-4.3 5.4-3.3 1.4.6 2.4 1.8 3 3.1.8-1.4 1.9-2.6 3.4-3.1 2.6-.8 5.2.9 5 3.9-.3 3.8-3.8 7-8.4 10.6Z" />
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

/** La foglia. */
export function IconaFoglia(props: IconProps) {
  return (
    <Linea {...props}>
      <path d="M5 19C5 11 10.2 5 19.2 4.8 19.4 13.8 13.4 19 5 19Z" />
      <path d="M5 19 14 10" />
    </Linea>
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

export function WhatsAppIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...rest}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.2 4.23-9.42 9.44-9.42 2.52 0 4.88.98 6.66 2.76a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.43 9.42m8.02-17.44A11.27 11.27 0 0 0 12.04.75C5.8.75.72 5.82.72 12.06c0 2 .52 3.94 1.51 5.65L.62 23.25l5.67-1.49a11.3 11.3 0 0 0 5.75 1.47h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.02-1.18-5.87-3.32-8.01" />
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

/** La sottolineatura disegnata a mano sotto le parole evidenziate. */
export function HandUnderline({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden focusable="false" className={className} {...rest}>
      <path d="M4 15c46-9 92-12 142-8s96 6 150-3" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" pathLength={1} />
    </svg>
  );
}
