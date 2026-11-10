/* =====================================================================
   Da andrea-bellettati (src/lib/motion/fx.ts), ritemato per Lily.
   Piccoli effetti senza librerie (Web Animations del browser): petali,
   cuori e scintille all'invio, campi che fanno "no-no", passi delle
   richieste. Li usano i flussi di richiesta, che così non si portano
   dietro GSAP, e il motore delle pagine (./engine.ts).

   Sicuro sul server (niente window al caricamento del modulo); con
   "riduci movimento" ogni funzione è un no-op. Le animazioni WAAPI non
   lasciano stili in linea: finite, il controllo torna al CSS e a React.
   ===================================================================== */

const matches = (query: string): boolean => typeof window !== 'undefined' && window.matchMedia(query).matches;
/** L'utente ha chiesto meno movimento. */
export const reduced = (): boolean => matches('(prefers-reduced-motion: reduce)');
/** Tilt, magnete, scie e simili hanno senso solo con un mouse. */
export const fine = (): boolean => matches('(hover: hover) and (pointer: fine)');

/* ── Forme (petalo, cuore, scintilla) ─────────────────────────────── */
export const PETALO =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5c4.6 4.2 6.2 9.6 0 19-6.2-9.4-4.6-14.8 0-19Z"/></svg>';
export const CUORE =
  '<svg viewBox="0 0 24 22" fill="currentColor" aria-hidden="true"><path d="M12 21.5S1.5 15 1.5 7.6C1.5 4 4.2 1.5 7.3 1.5c2 0 3.7 1 4.7 2.6 1-1.6 2.7-2.6 4.7-2.6 3.1 0 5.8 2.5 5.8 6.1C22.5 15 12 21.5 12 21.5Z"/></svg>';
export const SCINTILLA =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5c.8 6.2 3.3 8.7 9.5 9.5-6.2.8-8.7 3.3-9.5 9.5-.8-6.2-3.3-8.7-9.5-9.5 6.2-.8 8.7-3.3 9.5-9.5Z"/></svg>';
const COLORI = [
  'var(--color-lily)',
  'var(--color-petalo)',
  'var(--color-lily-bright)',
  'var(--color-candela)',
  'var(--color-lily-deep)',
];

const rand = (min: number, max: number): number => min + Math.random() * (max - min);
/** Le curve «respiro», in cubic-bezier. */
const OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'; // ~ power3.out
const IN = 'cubic-bezier(0.55, 0.06, 0.68, 0.19)'; // ~ power1.in
const POP = 'cubic-bezier(0.3, 1.35, 0.5, 1)'; // un pop morbido

/* ── Petali, cuori e scintille ────────────────────────────────────── */
function fxLayer(): HTMLElement {
  let layer = document.querySelector<HTMLElement>('.fx-layer');
  if (!layer) {
    layer = document.createElement('div');
    layer.className = 'fx-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
  }
  return layer;
}

/**
 * Petali, cuori e scintille che si aprono dal centro di un elemento e poi
 * scendono piano, ondeggiando come petali (al posto dei coriandoli).
 */
export function celebrate(origin: Element, opts: { count?: number; shapes?: string[]; spread?: number } = {}): void {
  if (reduced()) return;
  const { count = 24, shapes = [PETALO, CUORE, PETALO, SCINTILLA], spread = 1 } = opts;
  const r = origin.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const layer = fxLayer();
  for (let i = 0; i < count; i++) {
    const bit = document.createElement('span');
    bit.className = 'fx-bit';
    bit.innerHTML = shapes[i % shapes.length] ?? PETALO;
    const size = rand(12, 26);
    Object.assign(bit.style, {
      color: COLORI[i % COLORI.length] ?? 'var(--color-lily)',
      left: `${cx}px`,
      top: `${cy}px`,
      width: `${size}px`,
      height: `${size}px`,
    });
    layer.appendChild(bit);
    const angle = (i / count) * Math.PI * 2 + rand(-0.3, 0.3);
    const dist = rand(80, 200) * spread;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist - 50 * spread;
    const spin = rand(-120, 120);
    const sway = rand(-40, 40);
    const burst = rand(650, 950);
    const fall = rand(1300, 1900);
    const at = (dx: number, dy: number, s: number, rot: number) =>
      `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(${s}) rotate(${rot}deg)`;
    const anim = bit.animate(
      [
        { transform: at(0, 0, 0, 0), opacity: 1, easing: OUT },
        { transform: at(x, y, 1, spin), opacity: 1, offset: burst / (burst + fall), easing: 'ease-in-out' },
        { transform: at(x + sway, y + rand(80, 140), 0.95, spin + rand(-60, 60)), opacity: 0.85, offset: 0.78, easing: IN },
        { transform: at(x - sway * 0.6, y + rand(180, 300), 0.9, spin + rand(-90, 90)), opacity: 0 },
      ],
      { duration: burst + fall, fill: 'forwards' },
    );
    anim.onfinish = () => bit.remove();
  }
}

/** Svuota il livello degli effetti (cambio pagina). */
export function clearFx(): void {
  document.querySelector('.fx-layer')?.replaceChildren();
}

/* ── Richieste ────────────────────────────────────────────────────── */
/** Un piccolo battito (una scelta appena fatta, il cuore toccato). */
export function beat(el: Element | null): void {
  if (!el || reduced()) return;
  el.animate([{ scale: '0.94' }, { scale: '1.05', offset: 0.45 }, { scale: '1' }], { duration: 650, easing: 'ease-out' });
}

/** Scossa "no-no" sui campi che non vanno. */
export function nudge(fields: Element[]): void {
  if (reduced()) return;
  for (const el of fields) {
    el.animate({ translate: ['0 0', '-10px 0', '9px 0', '-6px 0', '4px 0', '0 0'] }, { duration: 450, easing: 'linear' });
  }
}

/** Il passo entra dal lato giusto (dir: 1 avanti, -1 indietro, 0 sul posto)
 *  e i suoi blocchi arrivano a cascata. */
export function stepEnter(panel: HTMLElement | null, dir: number): void {
  if (!panel || reduced()) return;
  panel.animate([{ transform: `translateX(${40 * dir}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 600, easing: OUT });
  Array.from(panel.children)
    .filter((c) => !(c instanceof HTMLInputElement))
    .forEach((c, i) => {
      c.animate([{ transform: 'translateY(16px)', opacity: 0 }, { transform: 'none', opacity: 1 }], {
        duration: 560,
        delay: 80 + i * 60,
        easing: OUT,
        fill: 'backwards',
      });
    });
}

/** Conferma di invio: la spunta ([data-success-check]) si disegna, poi petali. */
export function successBurst(panel: HTMLElement | null): void {
  if (!panel || reduced()) return;
  const check = panel.querySelector<HTMLElement>('[data-success-check]');
  const path = check?.querySelector<SVGPathElement>('path');
  check?.animate([{ scale: '0' }, { scale: '1' }], { duration: 900, easing: POP });
  if (path) {
    let len = 0;
    try {
      len = path.getTotalLength();
    } catch {
      len = 0;
    }
    if (len) {
      path.animate(
        [
          { strokeDasharray: `${len}`, strokeDashoffset: `${len}` },
          { strokeDasharray: `${len}`, strokeDashoffset: '0' },
        ],
        { duration: 650, delay: 350, easing: OUT, fill: 'backwards' },
      );
    }
  }
  window.setTimeout(() => celebrate(check ?? panel), 400);
}
