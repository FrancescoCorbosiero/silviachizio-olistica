/* =====================================================================
   Motore delle animazioni di Lily: GSAP (ScrollTrigger + SplitText) e
   Lenis, API ad attributi. Le pagine restano Server Component: è il markup
   a dire cosa si muove. Questo modulo non si importa mai in modo statico:
   arriva con un import dinamico dopo l'idratazione (MotionPage,
   SmoothScroll), e chi chiede "riduci movimento" non lo scarica.

   Carattere «respiro» (docs/brand.md): lento e morbido, curve dolci
   (power3.out, sine.inOut), niente rimbalzi. Un effetto forte per sezione.

   ─ Rivelazioni (una volta sola, quando arrivano a schermo)
     data-reveal              blocco: sale e appare
     data-reveal="stagger"    i figli entrano a cascata
     data-split[="blur|wipe"] titolo: le righe salgono dalla loro maschera
                              (o vanno a fuoco, o si scoprono da sinistra)
     data-clip="arco"         cornice ad arco: l'immagine si apre dal basso
     data-draw                disegno a linea (il giglio): i tratti si
                              disegnano, poi i petali si riempiono
     data-wordmark            «Lily» in fondo: le lettere (.foot-char) salgono
   ─ Guidate dallo scroll
     data-scrub               frase: le parole si accendono leggendo
     data-parallax[="60"]     immagine che scorre più lenta (±N px)
     video[data-video]        video di sfondo: le sorgenti (data-mp4,
                              data-webm, data-mp4-v, data-webm-v) arrivano
                              solo qui; parte a schermo, si ferma fuori;
                              resta il poster con "risparmio dati"
     data-hero                la finestra della hero: --e da 0 a 1. Lo
                              fa il CSS dove c'è animation-timeline (vedi
                              globals.css); qui solo dove manca
   ─ Puntatore (solo mouse)
     data-hover-list          elenco con l'anteprima che segue il puntatore
                              (righe [data-hover-row], pannello
                              [data-hover-panel], immagini [data-hover-shot])

   Regole della casa:
   - Fuori dalla hero niente è nascosto dal CSS. Lo stato di partenza lo
     mette questo script, solo a ciò che sta sotto la piega e non è mai
     stato visto: senza JS la pagina è statica e completa.
   - A fine rivelazione il controllo torna al CSS (clearProps).
   - Tutto nasce per pagina (app/template.tsx → MotionPage) e si reverte
     prima che React smonti la pagina: i titoli divisi tornano interi.
   - Sezioni ferme con CSS sticky, non con i pin di ScrollTrigger.
   - Le rivelazioni usano IntersectionObserver; le sezioni legate allo
     scroll nascono a tappe, un task per tappa. Ogni effetto nuovo si
     misura (docs/decisioni.md, «Leggerezza»).
   ===================================================================== */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { clearFx, fine, reduced } from './fx';
import { setLenis } from './scroll';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** «Respiro»: curve dolci, mai un rimbalzo. */
const EASE = 'power3.out';

/** La prima schermata entra con il CSS (.entra) e la hero ha il suo movimento: giù le mani. */
const skipIntro = (el: Element): boolean => !!el.closest('.entra, [data-hero]');

declare global {
  interface Window {
    /** Il motore è arrivato: lo script di avvio in testa non deve più ripiegare. */
    __lilyMotion?: boolean;
  }
}

/* ── Per tutta la visita: Lenis, focus, altezza della pagina ───────── */
let lenis: Lenis | null = null;
/** Altezza della pagina all'ultima misura dei trigger. */
let measured = 0;
/** Il motore sta ancora creando le sezioni della pagina: niente refresh a metà. */
let staging = false;
const raf = (time: number): void => lenis?.raf(time * 1000);

/**
 * Accende ciò che dura per tutta la visita: lo scroll morbido, i blocchi
 * in attesa che compaiono appena ci arriva il focus da tastiera, il
 * ricalcolo dei trigger quando l'altezza della pagina cambia.
 */
export function startSite(): () => void {
  if (reduced() || lenis) return () => {};
  window.__lilyMotion = true;
  lenis = new Lenis({
    lerp: 0.09,
    // Menu e liste scrollabili scorrono nativi sotto il puntatore.
    allowNestedScroll: true,
    prevent: (node) => node.matches('[role="dialog"], dialog, [data-lenis-prevent]'),
    // Un link verso un'altra pagina ferma l'inerzia: Next riparte dall'alto.
    stopInertiaOnNavigate: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  setLenis(lenis);

  // Ciò che aspetta ancora di comparire si mostra subito se ci arriva il focus.
  const onFocus = (e: FocusEvent) => {
    const pending = e.target instanceof Element ? e.target.closest<HTMLElement>('[data-motion-pending]') : null;
    if (pending) revealNow(pending);
  };
  document.addEventListener('focusin', onFocus);

  // Immagini, font e filtri cambiano l'altezza dopo l'avvio: i trigger restano
  // onesti, ma solo se l'altezza è davvero cambiata dall'ultima misura.
  let timer = 0;
  measured = document.documentElement.scrollHeight;
  const onRefresh = () => void (measured = document.documentElement.scrollHeight);
  ScrollTrigger.addEventListener('refresh', onRefresh);
  const ro = new ResizeObserver(() => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (!staging && Math.abs(document.documentElement.scrollHeight - measured) >= 2) ScrollTrigger.refresh();
    }, 200);
  });
  ro.observe(document.documentElement);

  return () => {
    document.removeEventListener('focusin', onFocus);
    ro.disconnect();
    ScrollTrigger.removeEventListener('refresh', onRefresh);
    window.clearTimeout(timer);
    gsap.ticker.remove(raf);
    setLenis(null);
    lenis?.destroy();
    lenis = null;
  };
}

/* ── Stato della pagina corrente ──────────────────────────────────── */
let ctx: gsap.Context | null = null;
let cleanups: (() => void)[] = [];
/** Ogni pagina ha il suo numero: le tappe di una pagina già smontata si fermano. */
let run = 0;

/** Listener con pulizia automatica al cambio pagina. */
function on<E extends Event>(target: EventTarget, type: string, fn: (e: E) => void, opts?: AddEventListenerOptions): void {
  const handler = fn as EventListener;
  target.addEventListener(type, handler, opts);
  cleanups.push(() => target.removeEventListener(type, handler, opts));
}

/* ── Rivelazioni: IntersectionObserver, non ScrollTrigger ─────────────
   Ogni elemento passa da due osservatori. Il primo lo "arma" quando è a
   meno di uno schermo di distanza (stato di partenza, titolo diviso): se
   invece è già a schermo, o sopra, resta com'è. Il secondo lo fa partire
   quando entra; quelli che entrano insieme si passano la cascata. */
type Shot = {
  el: Element;
  kind: string;
  /** Margine in basso dell'osservatore che lo fa partire: '-12%' ≈ "top 88%". */
  at: string;
  arm: () => void;
  play: (delay: number) => void;
  armed: boolean;
};
const shots = new Map<Element, Shot>();
let armer: IntersectionObserver | null = null;
const players = new Map<string, IntersectionObserver>();

const cascade = (i: number, n: number): number => (n > 5 ? (i / n) * 0.6 : i * 0.12);

function player(at: string): IntersectionObserver {
  const known = players.get(at);
  if (known) return known;
  const io: IntersectionObserver = new IntersectionObserver(
    (entries) => {
      const ready: Shot[] = [];
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        const shot = shots.get(e.target);
        if (!shot?.armed) continue;
        shots.delete(e.target);
        ready.push(shot);
      }
      ready.sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      const byKind = new Map<string, Shot[]>();
      for (const s of ready) byKind.set(s.kind, [...(byKind.get(s.kind) ?? []), s]);
      byKind.forEach((list) => list.forEach((s, i) => ctx?.add(() => s.play(cascade(i, list.length)))));
    },
    { rootMargin: `0px 0px ${at} 0px` },
  );
  players.set(at, io);
  return io;
}

function shoot(el: Element, kind: string, at: string, arm: () => void, play: (delay: number) => void): void {
  if (!armer || skipIntro(el) || shots.has(el)) return;
  shots.set(el, { el, kind, at, arm, play, armed: false });
  armer.observe(el);
}

/** Mostra subito un blocco in attesa (focus da tastiera). */
function revealNow(el: HTMLElement): void {
  const shot = shots.get(el);
  if (shot) {
    shots.delete(el);
    players.get(shot.at)?.unobserve(el);
  }
  el.removeAttribute('data-motion-pending');
  gsap.to(el, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.3, overwrite: true, clearProps: 'opacity,transform,filter,transition' });
}

function startShots(): void {
  armer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const shot = shots.get(e.target);
        if (!shot || shot.armed) {
          armer?.unobserve(e.target);
          continue;
        }
        if (!e.isIntersecting) {
          // Sopra lo schermo (scroll ripristinato, salto): resta com'è.
          if (e.boundingClientRect.bottom <= 0) {
            shots.delete(e.target);
            armer?.unobserve(e.target);
          }
          continue; // sotto e lontano: si arma quando si avvicina
        }
        armer?.unobserve(e.target);
        // Già a schermo: è stato visto così, resta fermo.
        if (e.boundingClientRect.top < window.innerHeight) {
          shots.delete(e.target);
          continue;
        }
        ctx?.add(() => shot.arm());
        shot.armed = true;
        player(shot.at).observe(shot.el);
      }
    },
    { rootMargin: '0px 0px 60% 0px' },
  );
  headings();
  blocks();
  arches();
  draws();
  wordmark();
}

/* Titoli: le righe salgono dalla loro maschera (lines), vanno a fuoco
   (blur) o si scoprono da sinistra (wipe). SplitText divide il titolo solo
   quando si avvicina; il corsivo resta dentro la sua riga. */
type HeadingVariant = 'lines' | 'blur' | 'wipe';

function headings(): void {
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const asked = el.dataset.split;
    const v: HeadingVariant = asked === 'blur' || asked === 'wipe' ? asked : 'lines';
    let split: SplitText | null = null;
    let played = false;
    shoot(
      el,
      'heading',
      '-12%',
      () => {
        split = SplitText.create(el, {
          type: 'lines',
          mask: v === 'lines' ? 'lines' : undefined,
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) => {
            if (played) return;
            if (v === 'wipe') gsap.set(self.lines, { clipPath: 'inset(-20% 100% -30% 0%)' });
            else if (v === 'blur') gsap.set(self.lines, { opacity: 0, y: 26, filter: 'blur(12px)' });
            else gsap.set(self.lines, { yPercent: 118 });
          },
        });
      },
      (delay) => {
        played = true;
        if (!split) return;
        const lines = split.lines;
        if (v === 'wipe') gsap.to(lines, { clipPath: 'inset(-20% 0% -30% 0%)', duration: 1.5, ease: 'power2.inOut', stagger: 0.14, delay, clearProps: 'clipPath' });
        else if (v === 'blur') gsap.to(lines, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: EASE, stagger: 0.12, delay, clearProps: 'filter' });
        else gsap.to(lines, { yPercent: 0, duration: 1.35, ease: 'expo.out', stagger: 0.09, delay });
      },
    );
  });
}

/* Blocchi che salgono; i figli delle griglie arrivano a cascata, senza rimbalzo. */
function blocks(): void {
  const done = { overwrite: true, clearProps: 'opacity,transform,filter,transition' } as const;
  gsap.utils.toArray<HTMLElement>('[data-reveal]:not([data-reveal="stagger"])').forEach((el) =>
    shoot(
      el,
      'block',
      '-10%',
      () => {
        gsap.set(el, { opacity: 0, y: 32, transition: 'none' });
        el.setAttribute('data-motion-pending', '');
      },
      (delay) => {
        el.removeAttribute('data-motion-pending');
        gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: EASE, delay, ...done });
      },
    ),
  );
  gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"] > *').forEach((el) =>
    shoot(
      el,
      'child',
      '-10%',
      () => {
        gsap.set(el, { opacity: 0, y: 34, filter: 'blur(4px)', transition: 'none' });
        el.setAttribute('data-motion-pending', '');
      },
      (delay) => {
        el.removeAttribute('data-motion-pending');
        gsap.to(el, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: EASE, delay, ...done });
      },
    ),
  );
  cleanups.push(() => document.querySelectorAll('[data-motion-pending]').forEach((el) => el.removeAttribute('data-motion-pending')));
}

/* Le cornici ad arco: l'immagine si apre dal basso, come una finestra che
   si alza, e dentro si assesta. */
function arches(): void {
  gsap.utils.toArray<HTMLElement>('[data-clip="arco"]').forEach((box) => {
    const img = box.querySelector('img');
    shoot(
      box,
      'clip',
      '-12%',
      () => {
        gsap.set(box, { clipPath: 'inset(42% 18% 0% 18% round 999px 999px 0px 0px)' });
        if (img) gsap.set(img, { scale: 1.18 });
      },
      () => {
        gsap.to(box, { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0px 0px)', duration: 1.8, ease: 'power3.inOut', clearProps: 'clipPath' });
        // Niente clearProps: la stessa immagine ha anche la parallasse (y).
        if (img) gsap.to(img, { scale: 1, duration: 2.2, ease: EASE });
      },
    );
  });
}

/* Disegni a linea che si disegnano da soli (il giglio). I tracciati con
   pathLength="1" si misurano 1; i petali del giglio, che hanno un fondo,
   si riempiono quando le linee sono finite. */
function draws(): void {
  gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((root) => {
    const paths = Array.from(root.querySelectorAll<SVGGeometryElement>('path, circle, ellipse, rect'))
      .map((p) => {
        let len = Number(p.getAttribute('pathLength')) || 0;
        if (!len) {
          try {
            len = p.getTotalLength();
          } catch {
            len = 0; // non disegnato (es. display:none su telefono)
          }
        }
        return { p, len };
      })
      .filter((x) => x.len > 0);
    if (!paths.length) return;
    const fills = paths.map((x) => x.p).filter((p) => p.classList.contains('giglio-petalo') || p.hasAttribute('data-draw-fill'));
    shoot(
      root,
      'draw',
      '-15%',
      () => {
        paths.forEach(({ p, len }) => gsap.set(p, { strokeDasharray: len, strokeDashoffset: len }));
        if (fills.length) gsap.set(fills, { fillOpacity: 0 });
      },
      () => {
        const tl = gsap.timeline();
        const total = Math.min(2.4, 0.9 + paths.length * 0.03);
        paths.forEach(({ p }, i) =>
          tl.to(p, { strokeDashoffset: 0, duration: total - i * 0.01, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, i * 0.035),
        );
        if (fills.length) tl.to(fills, { fillOpacity: 1, duration: 0.9, ease: 'sine.inOut', clearProps: 'fillOpacity' }, '-=0.6');
      },
    );
  });
}

/* Il wordmark in fondo: le lettere salgono dalla loro maschera. */
function wordmark(): void {
  const wm = document.querySelector<HTMLElement>('[data-wordmark]');
  if (!wm) return;
  const chars = wm.querySelectorAll<HTMLElement>('.foot-char');
  shoot(
    wm,
    'wordmark',
    '-4%',
    () => gsap.set(chars, { yPercent: 110 }),
    () => gsap.to(chars, { yPercent: 0, duration: 1.4, ease: EASE, stagger: 0.09 }),
  );
}

/* ── Guidate dallo scroll ─────────────────────────────────────────── */
/* Le parole si accendono leggendo (il momento relax). */
function scrubStatements(): void {
  gsap.utils.toArray<HTMLElement>('[data-scrub]').forEach((el) => {
    SplitText.create(el, {
      type: 'words',
      wordsClass: 'scrub-word',
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(
          self.words,
          { opacity: 0.2 },
          { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: 0.8 } },
        ),
    });
  });
}

/* Parallasse: [data-parallax="N"] scorre di ±N px attraversando lo schermo. */
function parallax(): void {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const s = parseFloat(el.dataset.parallax ?? '') || 60;
    gsap.fromTo(
      el,
      { y: -s },
      { y: s, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

/* La finestra della hero, dove il CSS non sa legare un'animazione allo
   scroll (animation-timeline): lo stesso --e, dallo scroll di ScrollTrigger.
   La corsa (--apertura) la legge dal CSS, già in pixel (@property). */
function heroFinestra(): void {
  if (CSS.supports('animation-timeline: scroll()')) return;
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || !document.documentElement.classList.contains('motion')) return;
  const ease = gsap.parseEase('power2.inOut');
  const corsa = (): number => parseFloat(getComputedStyle(hero).getPropertyValue('--apertura')) || window.innerHeight * 0.9;
  ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: () => `+=${corsa()}`,
    invalidateOnRefresh: true,
    onUpdate: (self) => hero.style.setProperty('--e', ease(self.progress).toFixed(4)),
    onRefresh: (self) => hero.style.setProperty('--e', ease(self.progress).toFixed(4)),
  });
  cleanups.push(() => hero.style.removeProperty('--e'));
}

/* ── Video di sfondo (video[data-video]) ─────────────────────────────
   Il poster (l'immagine sotto, il primo fotogramma) è già a schermo: il
   video arriva dopo, solo se la connessione non chiede di risparmiare, nel
   taglio giusto (verticale sul telefono). Entra in dissolvenza quando
   parte davvero, si ferma fuori dallo schermo. */
function videos(): void {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')) return;
  gsap.utils.toArray<HTMLVideoElement>('video[data-video]').forEach((v) => {
    const verticale = !window.matchMedia('(min-width: 768px)').matches;
    const fonti: [string | undefined, string][] = [
      [verticale ? v.dataset.webmV : v.dataset.webm, 'video/webm'],
      [verticale ? v.dataset.mp4V : v.dataset.mp4, 'video/mp4'],
    ];
    const nodi = fonti
      .filter((f): f is [string, string] => Boolean(f[0]))
      .map(([src, type]) => {
        const s = document.createElement('source');
        s.src = src;
        s.type = type;
        return s;
      });
    if (!nodi.length) return;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.append(...nodi);
    v.load();
    on(v, 'playing', () => v.classList.add('is-playing'));
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) void v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    cleanups.push(() => {
      io.disconnect();
      v.pause();
      v.classList.remove('is-playing');
      nodi.forEach((n) => n.remove());
      v.load();
    });
  });
}

/* ── Puntatore ────────────────────────────────────────────────────── */
/* L'anteprima che segue il puntatore sopra le righe del listino: il
   pannello ad arco scivola dietro al mouse, e ogni riga scopre la sua
   immagine dal basso. Solo con un mouse. */
function hoverLists(): void {
  if (!fine()) return;
  gsap.utils.toArray<HTMLElement>('[data-hover-list]').forEach((list) => {
    const panel = list.querySelector<HTMLElement>('[data-hover-panel]');
    if (!panel) return;
    const shotsEl = gsap.utils.toArray<HTMLElement>(panel.querySelectorAll('[data-hover-shot]'));
    gsap.set(panel, { xPercent: -50, yPercent: -55, scale: 0.75, opacity: 0 });
    const x = gsap.quickTo(panel, 'x', { duration: 0.75, ease: 'power3' });
    const y = gsap.quickTo(panel, 'y', { duration: 0.75, ease: 'power3' });
    const rot = gsap.quickTo(panel, 'rotation', { duration: 0.9, ease: 'power3' });
    let lastX = 0;
    on<PointerEvent>(list, 'pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = list.getBoundingClientRect();
      x(e.clientX - r.left);
      y(e.clientY - r.top);
      rot(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.4));
      lastX = e.clientX;
    });
    gsap.utils.toArray<HTMLElement>(list.querySelectorAll('[data-hover-row]')).forEach((row, i) => {
      on<PointerEvent>(row, 'pointerenter', (e) => {
        if (e.pointerType !== 'mouse') return;
        shotsEl.forEach((s, k) =>
          gsap.to(s, { clipPath: k === i ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)', zIndex: k === i ? 2 : 1, duration: 0.8, ease: 'expo.out', overwrite: true }),
        );
        gsap.to(panel, { scale: 1, opacity: 1, duration: 0.6, ease: 'expo.out', overwrite: 'auto' });
      });
      // Una riga aperta (il testo lungo) non vuole l'anteprima davanti.
      on(row, 'toggle', () => {
        if ((row as HTMLDetailsElement).open) gsap.to(panel, { scale: 0.75, opacity: 0, duration: 0.35, overwrite: 'auto' });
      });
    });
    on(list, 'pointerleave', () => {
      gsap.to(panel, { scale: 0.75, opacity: 0, duration: 0.45, overwrite: 'auto' });
      rot(0);
    });
    cleanups.push(() => gsap.set(panel, { clearProps: 'all' }));
  });
}

/* ── Ciclo della pagina ───────────────────────────────────────────── */
function stopPage(): void {
  run++;
  staging = false;
  armer?.disconnect();
  armer = null;
  players.forEach((io) => io.disconnect());
  players.clear();
  shots.clear();
  cleanups.forEach((fn) => fn());
  cleanups = [];
  ctx?.revert();
  ctx = null;
  clearFx();
}

/** Un task alla volta: il thread principale respira tra una tappa e l'altra. */
const nextTask = (): Promise<void> => new Promise((resolve) => window.setTimeout(resolve, 0));

/**
 * Accende gli effetti della pagina appena montata. Restituisce la funzione
 * che li spegne tutti (va chiamata prima che React smonti la pagina).
 */
export function startPage(): () => void {
  stopPage();
  if (reduced()) return () => {};
  window.__lilyMotion = true;
  const id = ++run;
  const page = gsap.context(() => {});
  ctx = page;
  // Subito, e leggero: osservatori e ascoltatori, nessuna lettura di layout.
  page.add(() => {
    startShots();
    hoverLists();
  });
  // Poi le sezioni legate allo scroll, una tappa per task. Prima la hero:
  // è a schermo e decide l'altezza di ciò che sta sotto.
  const stages: (() => void)[] = [
    () => heroFinestra(),
    () => parallax(),
    () => scrubStatements(),
    // Per ultimo il video: il poster è già a schermo, il video può aspettare
    // che il telefono abbia finito di accendere la pagina.
    () => videos(),
  ];
  staging = true;
  void (async () => {
    let afterHero = 0;
    for (const [i, stage] of stages.entries()) {
      await nextTask();
      if (id !== run) return;
      page.add(stage);
      if (i === 0) afterHero = document.documentElement.scrollHeight;
    }
    staging = false;
    const h = document.documentElement.scrollHeight;
    if (Math.abs(h - afterHero) >= 2) ScrollTrigger.refresh();
    else measured = h;
    ScrollTrigger.sort();
    // I font cambiano a capo e altezze: se non sono ancora pronti, si rimisura dopo.
    if (document.fonts && document.fonts.status !== 'loaded') {
      void document.fonts.ready.then(() => {
        if (id === run) ScrollTrigger.refresh();
      });
    }
  })();
  return () => {
    if (id === run) stopPage();
  };
}
