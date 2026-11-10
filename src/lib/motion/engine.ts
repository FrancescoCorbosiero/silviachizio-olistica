/* =====================================================================
   Motore delle animazioni di Lily. Da andrea-bellettati
   (src/lib/motion/engine.ts), con gli effetti di ireandlunaslife
   (src/scripts/motion.ts) riscritti qui dentro e ritemati: petali al posto
   delle zampe, il nastro con i trattamenti, la chat per le letture.
   GSAP (ScrollTrigger + SplitText) e Lenis, API ad attributi: le pagine
   restano Server Component e il markup dice cosa si muove.

   Carattere «respiro» (docs/brand.md): più lento e morbido dei
   riferimenti. Entrate lunghe e sfumate, curve dolci (power3.out,
   sine.inOut), niente rimbalzi vistosi. Un effetto forte per sezione.

   ─ Rivelazioni (una volta sola, quando arrivano a schermo)
     data-reveal            blocco — sale e appare
     data-reveal="stagger"  … i figli entrano a cascata
     data-split[="var"]     titolo — lines, blur, chars, wipe (default: a
                            turno; chars solo sui titoli brevi); la parola
                            .script arriva per ultima e la sua
                            sottolineatura a mano si disegna
     data-clip[="arco"]     foto — si apre da un cerchio (o da un arco)
     data-draw              svg — i tracciati si disegnano da soli; i
                            petali del giglio si riempiono alla fine
     data-pop               icona nel cerchio cipria — un pop morbido
     data-wordmark          «Lily» del footer: le lettere (.foot-char) salgono
   ─ Guidate dallo scroll
     data-scrub             testo — le parole si accendono
     data-stories           le stories nel telefono: [data-story-phone],
                            [data-story-slide], [data-story-bar],
                            [data-story-piece], [data-story-dock]
     data-rail              tappe che si accendono ([data-rail-step])
     data-fan               foto che si aprono a ventaglio ([data-fan-item])
     data-trail             sentiero con le foglie: [data-trail-svg],
                            [data-trail-path], [data-trail-leaves],
                            [data-trail-step] con il suo [data-trail-stop]
     data-parallax[="40"]   deriva verticale in px (data-parallax-cover)
     data-speed="0.2"       deriva in frazione della propria altezza
     data-hero-away="12"    contenuto dell'hero che si allontana (data-hero-fade)
     data-marquee[="right"] nastro ([.marquee-track]) che segue velocità e
                            verso dello scroll e si ferma al passaggio
     data-spin              anello di testo o badge che gira con lo scroll
     data-peek              il giglio che spunta dal fondo della sezione
     data-chat              la chat: i fumetti (.chat-bub, ritardo con --i)
                            arrivano uno alla volta quando è a schermo
   ─ Sempre, piano
     data-float             petali e gigli che ondeggiano (CSS, durata e
                            ritardo diversi per ognuno)
   ─ Da toccare (solo con un mouse, tranne l'accordion e data-love)
     details[data-accordion] si apre e si chiude morbido ([data-accordion-body])
     data-tilt              card verso il puntatore, inclinazione minima
     data-magnetic          badge attirato dal puntatore
     data-path-row          riga dell'indice: la foto ([data-path-thumb])
                            segue il puntatore
     data-lens="url"        lente d'ingrandimento sulla foto
     data-petal-trail       petali che cadono dietro al puntatore, un cuore al clic
     data-love              un battito al passaggio, cuori al tocco
     .btn                   l'etichetta rotola al passaggio

   Regole della casa (come andrea-bellettati):
   - Niente è nascosto dal CSS. Lo stato di partenza lo mette questo
     script, solo a ciò che sta sotto la piega e non è ancora mai stato
     visto: senza JS la pagina è statica e completa.
   - A fine rivelazione il controllo torna al CSS (clearProps).
   - Tutto nasce per pagina (app/template.tsx) e viene revertito prima che
     React smonti la pagina: i titoli divisi tornano interi.
   - Le sezioni ferme usano CSS sticky ([data-pin-stage]), non i pin di
     ScrollTrigger: nessun nodo aggiunto, nessun ricalcolo della pagina.
   - React: cambi di struttura (SplitText, nodi aggiunti) solo sul markup
     dei Server Component o su elementi che non cambiano mai.

   Leggerezza: questo modulo arriva con un import dinamico dopo
   l'idratazione (chi chiede "riduci movimento" non lo scarica); le
   rivelazioni usano IntersectionObserver, non ScrollTrigger; le sezioni
   legate allo scroll nascono a tappe, un task per tappa. Ogni effetto
   nuovo si misura (docs/decisioni.md, "Leggerezza").
   ===================================================================== */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { CUORE, PETALO, beat, celebrate, clearFx, fine, reduced } from './fx';
import { setLenis } from './scroll';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Sezioni ferme "grandi" solo dove c'è spazio per raccontarle (lg di Tailwind). */
const DESKTOP = '(min-width: 1024px)';
const MOBILE = '(max-width: 1023px)';
/** «Respiro»: curve dolci, mai un rimbalzo. */
const EASE = 'power3.out';

/** Gli elementi con l'intro CSS (primo schermo) si sono già mossi: giù le mani. */
const skipIntro = (el: Element): boolean => !!el.closest('.intro, .intro-fade, .draw, [data-intro]');

/** La foglia del sentiero (data-trail). */
const FOGLIA =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5c4.2 3.4 6 8.3 0 19-6-10.7-4.2-15.6 0-19Z"/></svg>';

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
  lenis = new Lenis({
    lerp: 0.09,
    // Fogli, menu e liste scrollabili scorrono nativi sotto il puntatore.
    allowNestedScroll: true,
    prevent: (node) => node.matches('[role="dialog"], [data-lenis-prevent]'),
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
let mm: gsap.MatchMedia | null = null;
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
   meno di uno schermo di distanza (stato di partenza, titolo diviso):
   se invece è già a schermo, o sopra, resta com'è. Il secondo lo fa
   partire quando entra; quelli che entrano insieme si passano la cascata. */
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
  images();
  draws();
  pops();
  wordmark();
}

/* Titoli. Non entrano tutti allo stesso modo: ognuno riceve una variante,
   richiesta (data-split="blur") o distribuita a turno lungo la pagina.
     lines  ogni riga sale dalla sua maschera
     blur   le righe vanno a fuoco salendo
     chars  le lettere salgono sfocate, una dopo l'altra (titoli brevi)
     wipe   ogni riga si scopre da sinistra a destra
   SplitText divide il titolo solo quando si avvicina. */
type HeadingVariant = 'lines' | 'blur' | 'chars' | 'wipe';
const CYCLE: HeadingVariant[] = ['lines', 'blur', 'chars', 'wipe'];

function headingVariant(el: HTMLElement, index: number): HeadingVariant {
  const asked = el.dataset.split as HeadingVariant | undefined;
  if (asked && CYCLE.includes(asked)) return asked;
  const v = CYCLE[index % CYCLE.length] ?? 'lines';
  // Lettera per lettera si legge bene solo su poche parole.
  return v === 'chars' && (el.textContent ?? '').trim().length > 30 ? 'blur' : v;
}

function hideHeading(self: SplitText, v: HeadingVariant): void {
  if (v === 'chars') gsap.set(self.chars, { opacity: 0, yPercent: 40, filter: 'blur(8px)' });
  else if (v === 'wipe') gsap.set(self.lines, { clipPath: 'inset(-20% 100% -30% 0%)' });
  else if (v === 'blur') gsap.set(self.lines, { opacity: 0, y: 26, filter: 'blur(12px)' });
  else gsap.set(self.lines, { yPercent: 115 });
}

function showHeading(self: SplitText, v: HeadingVariant): void {
  if (v === 'chars') {
    gsap.to(self.chars, { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 1.1, ease: EASE, stagger: 0.025, clearProps: 'filter' });
  } else if (v === 'wipe') {
    gsap.to(self.lines, { clipPath: 'inset(-20% 0% -30% 0%)', duration: 1.5, ease: 'power2.inOut', stagger: 0.14, clearProps: 'clipPath' });
  } else if (v === 'blur') {
    gsap.to(self.lines, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: EASE, stagger: 0.12, clearProps: 'filter' });
  } else {
    gsap.to(self.lines, { yPercent: 0, duration: 1.3, ease: EASE, stagger: 0.1 });
  }
}

function headings(): void {
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el, i) => {
    const v = headingVariant(el, i);
    let split: SplitText | null = null;
    let played = false;
    shoot(
      el,
      'heading',
      '-12%',
      () => {
        split = SplitText.create(el, {
          type: v === 'chars' ? 'words,chars,lines' : 'lines',
          mask: v === 'lines' ? 'lines' : undefined,
          linesClass: 'split-line',
          wordsClass: 'split-word',
          charsClass: 'split-char',
          autoSplit: true,
          onSplit: (self) => {
            if (played) return;
            hideHeading(self, v);
            // La parola scritta a mano aspetta il suo turno.
            const scripts = el.querySelectorAll('.script');
            if (scripts.length) gsap.set(scripts, { '--draw': 0, opacity: 0, filter: 'blur(6px)' });
          },
        });
      },
      () => {
        played = true;
        if (split) showHeading(split, v);
        const scripts = el.querySelectorAll('.script');
        if (scripts.length) {
          gsap
            .timeline({ delay: 0.5 })
            .to(scripts, { opacity: 1, filter: 'blur(0px)', duration: 1, ease: EASE, clearProps: 'filter,opacity' })
            .to(scripts, { '--draw': 1, duration: 1.1, ease: 'power2.inOut' }, '-=0.4');
        }
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
        gsap.set(el, { opacity: 0, y: 36, transition: 'none' });
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
        gsap.set(el, { opacity: 0, y: 40, scale: 0.98, filter: 'blur(4px)', transition: 'none' });
        el.setAttribute('data-motion-pending', '');
      },
      (delay) => {
        el.removeAttribute('data-motion-pending');
        gsap.to(el, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: EASE, delay, ...done });
      },
    ),
  );
  cleanups.push(() => document.querySelectorAll('[data-motion-pending]').forEach((el) => el.removeAttribute('data-motion-pending')));
}

/* Le foto si aprono da un cerchio (come le storie di Instagram) o da un arco. */
function images(): void {
  gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((box) => {
    const arco = box.dataset.clip === 'arco';
    shoot(
      box,
      'clip',
      '-12%',
      () => gsap.set(box, { clipPath: arco ? 'inset(38% 22% 0% 22% round 999px 999px 0px 0px)' : 'circle(16% at 50% 50%)' }),
      () =>
        gsap.to(box, {
          clipPath: arco ? 'inset(0% 0% 0% 0% round 999px 999px 0px 0px)' : 'circle(75% at 50% 50%)',
          duration: 1.7,
          ease: 'power2.inOut',
          clearProps: 'clipPath',
        }),
    );
  });
}

/* Disegni a linea che si disegnano da soli (il giglio, i cuori, il loto).
   I tracciati con pathLength="1" si misurano 1; i petali del giglio, che
   hanno un fondo, si riempiono quando le linee sono finite. */
function draws(): void {
  gsap.utils.toArray<SVGSVGElement>('[data-draw]').forEach((svg) => {
    const paths = Array.from(svg.querySelectorAll<SVGGeometryElement>('path, circle, ellipse, rect'))
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
      svg,
      'draw',
      '-15%',
      () => {
        paths.forEach(({ p, len }) => gsap.set(p, { strokeDasharray: len, strokeDashoffset: len }));
        if (fills.length) gsap.set(fills, { fillOpacity: 0 });
      },
      () => {
        const tl = gsap.timeline();
        const total = Math.min(2.2, 0.9 + paths.length * 0.03);
        paths.forEach(({ p }, i) =>
          tl.to(p, { strokeDashoffset: 0, duration: total - i * 0.01, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, i * 0.035),
        );
        if (fills.length) tl.to(fills, { fillOpacity: 1, duration: 0.9, ease: 'sine.inOut', clearProps: 'fillOpacity' }, '-=0.6');
      },
    );
  });
}

/* Le icone nei cerchi cipria: un pop morbido. */
function pops(): void {
  gsap.utils.toArray<HTMLElement>('[data-pop]').forEach((el) =>
    shoot(
      el,
      'pop',
      '-10%',
      () => gsap.set(el, { scale: 0.4, rotation: -30, opacity: 0 }),
      (delay) => gsap.to(el, { scale: 1, rotation: 0, opacity: 1, duration: 1.1, ease: 'back.out(1.4)', delay: delay + 0.15, clearProps: 'transform,opacity' }),
    ),
  );
}

/* Il wordmark del footer: le lettere salgono dalla loro maschera. */
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
/* Le parole si accendono con lo scroll (il momento relax). */
function scrubStatements(): void {
  gsap.utils.toArray<HTMLElement>('[data-scrub]').forEach((el) => {
    SplitText.create(el, {
      type: 'words',
      wordsClass: 'scrub-word',
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(
          self.words,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 52%', scrub: 0.8 },
          },
        ),
    });
  });
}

/* Parallax: [data-parallax="N"] deriva di ±N/1.3 px attraverso lo schermo;
   [data-parallax-cover] (foto di copertina) di ±10% su una scala di 1.24;
   [data-speed="0.2"] di una frazione della propria altezza. */
function parallax(): void {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const scrollTrigger = { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true };
    if (el.hasAttribute('data-parallax-cover')) {
      gsap.fromTo(el, { yPercent: -10, scale: 1.24 }, { yPercent: 10, scale: 1.24, ease: 'none', scrollTrigger });
      return;
    }
    const s = (parseFloat(el.dataset.parallax ?? '') || 40) / 1.3;
    gsap.fromTo(el, { y: -s }, { y: s, ease: 'none', scrollTrigger });
  });
  gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed ?? '0.15') || 0.15;
    gsap.fromTo(
      el,
      { yPercent: -speed * 50 },
      { yPercent: speed * 50, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

/* Il contenuto dell'hero si allontana e sfuma mentre la pagina sale. */
function heroAway(): void {
  gsap.utils.toArray<HTMLElement>('[data-hero-away]').forEach((el) => {
    const section = el.closest('section') ?? el;
    gsap.to(el, {
      yPercent: Number(el.dataset.heroAway) || 12,
      opacity: Number(el.dataset.heroFade ?? 0.25),
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
    });
  });
}

/* ── Sezioni ferme: CSS sticky, non i pin di ScrollTrigger ───────────
   La sezione si allunga della corsa (--pin-run) e il suo palco
   ([data-pin-stage]) resta attaccato allo schermo con position: sticky;
   ScrollTrigger guida solo lo scrub. */
function stick(sec: HTMLElement, run: () => number, extra?: () => void): () => void {
  const set = (): void => {
    sec.style.setProperty('--pin-run', `${Math.round(run())}px`);
    extra?.();
  };
  set();
  if (!extra) sec.classList.add('is-pinned');
  ScrollTrigger.addEventListener('refreshInit', set);
  return () => {
    ScrollTrigger.removeEventListener('refreshInit', set);
    sec.classList.remove('is-pinned', 'is-story-phone');
    sec.style.removeProperty('--pin-run');
    sec.style.removeProperty('--phone-top');
  };
}

/* ── Stories: come su Instagram, ma guidate dallo scroll ─────────────
   "Come funziona" raccontato nel telefono: le barre in alto si riempiono,
   ogni slide entra da destra e spinge via la precedente. Senza script le
   slide sono una lista di card. */
function storiesScroll(media: gsap.MatchMedia): void {
  gsap.utils.toArray<HTMLElement>('[data-stories]').forEach((sec) => {
    const phone = sec.querySelector<HTMLElement>('[data-story-phone]');
    const dock = sec.querySelector<HTMLElement>('[data-story-dock]') ?? phone?.parentElement;
    const slides = gsap.utils.toArray<HTMLElement>(sec.querySelectorAll('[data-story-slide]'));
    const bars = gsap.utils.toArray<HTMLElement>(sec.querySelectorAll('[data-story-bar]'));
    if (!phone || !dock || slides.length < 2) return;
    media.add({ desk: DESKTOP, mob: MOBILE }, (c) => {
      const desk = Boolean(c.conditions?.desk);
      const run = (): number => window.innerHeight * slides.length * 0.75;
      // Su telefono resta fermo solo il telefono, al centro dello schermo.
      const phoneTop = (): number => Math.max(12, (window.innerHeight - phone.offsetHeight) / 2);
      sec.classList.add('is-story');
      const unstick = desk
        ? stick(sec, run)
        : stick(sec, run, () => {
            sec.classList.add('is-story-phone');
            sec.style.setProperty('--phone-top', `${Math.round(phoneTop())}px`);
          });
      gsap.set(slides.slice(1), { xPercent: 104 });
      gsap.set(bars, { scaleX: 0, transformOrigin: 'left center' });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: desk
          ? { trigger: sec, start: 'top top', end: () => `+=${run()}`, scrub: 0.6, invalidateOnRefresh: true }
          : { trigger: dock, start: () => `top ${phoneTop()}px`, end: () => `+=${run()}`, scrub: 0.6, invalidateOnRefresh: true },
      });
      slides.forEach((slide, i) => {
        const bar = bars[i];
        if (bar) tl.to(bar, { scaleX: 1, duration: 1 }, i);
        const pieces = slide.querySelectorAll('[data-story-piece]');
        if (i > 0 && pieces.length) {
          tl.from(pieces, { y: 36, opacity: 0, stagger: 0.05, duration: 0.25, ease: 'power2.out' }, i - 1 + 0.82);
        }
        const next = slides[i + 1];
        if (next) {
          tl.to(slide, { xPercent: -30, scale: 0.92, opacity: 0.2, duration: 0.3, ease: 'power2.inOut' }, i + 0.75).to(
            next,
            { xPercent: 0, duration: 0.3, ease: 'power2.inOut' },
            i + 0.75,
          );
        }
      });
      return () => {
        unstick();
        sec.classList.remove('is-story');
      };
    });
  });
}

/* ── Il sentiero (chi sono, facoltativo) ─────────────────────────────
   Un sentiero tratteggiato passa per i pallini delle tappe; scrollando,
   le foglie lo percorrono tenendo il passo con chi legge (la punta resta
   al 62% dello schermo) e ogni tappa raggiunta si accende. */
function trails(): void {
  gsap.utils.toArray<HTMLElement>('[data-trail]').forEach((root) => {
    const svg = root.querySelector<SVGSVGElement>('[data-trail-svg]');
    const path = root.querySelector<SVGPathElement>('[data-trail-path]');
    const layer = root.querySelector<HTMLElement>('[data-trail-leaves]');
    const steps = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-trail-step]'));
    const stops = steps.map((s) => s.querySelector<HTMLElement>('[data-trail-stop]') ?? s);
    if (!svg || !path || !layer || stops.length < 2) return;
    root.classList.add('has-trail');
    const center = (el: HTMLElement): { x: number; y: number } => {
      let x = el.offsetWidth / 2;
      let y = el.offsetHeight / 2;
      for (let n: HTMLElement | null = el; n && n !== root; n = n.offsetParent as HTMLElement | null) {
        x += n.offsetLeft;
        y += n.offsetTop;
      }
      return { x, y };
    };
    let stopY: number[] = [];
    let leaves: { el: HTMLElement; y: number }[] = [];
    const build = (): void => {
      const pts = stops.map(center);
      stopY = pts.map((p) => p.y);
      svg.setAttribute('viewBox', `0 0 ${root.clientWidth} ${root.clientHeight}`);
      const first = pts[0];
      if (!first) return;
      let d = `M${first.x.toFixed(1)} ${first.y.toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        if (!a || !b) continue;
        const my = (b.y - a.y) / 2;
        d += ` C${a.x.toFixed(1)} ${(a.y + my).toFixed(1)} ${b.x.toFixed(1)} ${(b.y - my).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
      }
      path.setAttribute('d', d);
      const len = path.getTotalLength();
      const count = Math.max(2, Math.round(len / (window.innerWidth < 1024 ? 48 : 60)));
      const frag = document.createDocumentFragment();
      leaves = [];
      for (let i = 1; i < count; i++) {
        const at = (len * i) / count;
        const p = path.getPointAtLength(at);
        const q = path.getPointAtLength(Math.min(len, at + 1));
        const ang = Math.atan2(q.y - p.y, q.x - p.x);
        const off = i % 2 ? 10 : -10;
        const el = document.createElement('span');
        el.className = 'trail-leaf';
        el.innerHTML = FOGLIA;
        el.style.left = `${(p.x + Math.cos(ang + Math.PI / 2) * off).toFixed(1)}px`;
        el.style.top = `${(p.y + Math.sin(ang + Math.PI / 2) * off).toFixed(1)}px`;
        // Le foglie si aprono a destra e a sinistra del cammino.
        el.style.setProperty('--a', `${((ang * 180) / Math.PI + 90 + (i % 2 ? 35 : -35)).toFixed(1)}deg`);
        frag.appendChild(el);
        leaves.push({ el, y: p.y });
      }
      layer.replaceChildren(frag);
    };
    const render = (): void => {
      const tip = window.innerHeight * 0.62 - root.getBoundingClientRect().top;
      leaves.forEach(({ el, y }) => el.classList.toggle('is-on', y <= tip));
      steps.forEach((s, i) => s.classList.toggle('is-reached', (stopY[i] ?? Infinity) <= tip + 1));
    };
    build();
    render();
    ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: render,
      onRefresh: () => {
        build();
        render();
      },
    });
    cleanups.push(() => {
      layer.replaceChildren();
      path.removeAttribute('d');
      root.classList.remove('has-trail');
      steps.forEach((s) => s.classList.remove('is-reached'));
    });
  });
}

/* ── Foto a ventaglio ────────────────────────────────────────────────
   Le foto partono impilate al centro e si aprono nelle loro posizioni
   mentre la sezione entra. Le distanze si misurano sul layout (offset). */
function fans(): void {
  gsap.utils.toArray<HTMLElement>('[data-fan]').forEach((root) => {
    const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-fan-item]'));
    if (!items.length) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: 'top 88%', end: 'center 52%', scrub: 0.8, invalidateOnRefresh: true },
    });
    items.forEach((it) => {
      tl.fromTo(
        it,
        {
          x: () => root.clientWidth / 2 - (it.offsetLeft + it.offsetWidth / 2),
          y: () => root.clientHeight / 2 - (it.offsetTop + it.offsetHeight / 2),
        },
        { x: 0, y: 0, ease: 'power2.out' },
        0,
      );
    });
  });
}

/* Tappe che si accendono con lo scroll; un petalo al posto della zampina. */
function rails(): void {
  gsap.utils.toArray<HTMLElement>('[data-rail]').forEach((root) => {
    const steps = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-rail-step]'));
    root.style.setProperty('--p', '0');
    cleanups.push(() => {
      root.style.removeProperty('--p');
      steps.forEach((s) => s.classList.remove('is-reached'));
    });
    ScrollTrigger.create({
      trigger: root,
      start: 'top 72%',
      end: 'bottom 45%',
      scrub: true,
      onUpdate: (self) => {
        root.style.setProperty('--p', self.progress.toFixed(4));
        steps.forEach((s, i) => s.classList.toggle('is-reached', self.progress >= i / Math.max(1, steps.length - 1) - 0.001));
      },
    });
  });
}

/* ── Il nastro (da ireandlunaslife, marquees) ────────────────────────
   I nomi dei trattamenti e delle letture scorrono sulla pennellata: il
   nastro segue velocità e verso dello scroll e si ferma al passaggio del
   mouse. Senza script scorre piano in CSS. */
function marquees(): void {
  gsap.utils.toArray<HTMLElement>('[data-marquee]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('.marquee-track');
    if (!track) return;
    track.style.animation = 'none';
    let x = 0;
    const baseDir = root.dataset.marquee === 'right' ? 1 : -1;
    let dir = baseDir;
    let boost = 0;
    let half = track.scrollWidth / 2;
    let active = false;
    let hovered = false;
    const BASE = 38; // px/s: piano, come un respiro
    const tick = (_t: number, dt: number): void => {
      if (!active || hovered) return;
      x += dir * (BASE + boost) * (dt / 1000);
      if (x <= -half) x += half;
      else if (x > 0) x -= half;
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      boost *= 0.95;
    };
    gsap.ticker.add(tick);
    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => void (active = self.isActive),
      onRefresh: () => void (half = track.scrollWidth / 2),
      onUpdate: (self) => {
        boost = Math.min(Math.abs(self.getVelocity()) * 0.25, 600);
        dir = self.direction === -1 ? -baseDir : baseDir;
      },
    });
    on(root, 'mouseenter', () => void (hovered = true));
    on(root, 'mouseleave', () => void (hovered = false));
    cleanups.push(() => {
      gsap.ticker.remove(tick);
      st.kill();
      track.style.removeProperty('transform');
      track.style.removeProperty('animation');
    });
  });
}

/* L'anello di testo intorno alla foto e il badge "Prenota" girano con lo scroll. */
function spins(): void {
  gsap.utils.toArray<HTMLElement>('[data-spin]').forEach((el) => {
    gsap.to(el, {
      rotation: '+=200',
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
    });
  });
}

/* Il giglio che spunta dal fondo della chiusura. */
function peeks(): void {
  gsap.utils.toArray<HTMLElement>('[data-peek]').forEach((el) => {
    const host = el.closest('section') ?? el;
    gsap.fromTo(
      el,
      { yPercent: 100 },
      { yPercent: 0, ease: 'none', scrollTrigger: { trigger: host, start: 'top 85%', end: 'center 60%', scrub: 1 } },
    );
  });
}

/* La chat delle letture: i fumetti arrivano uno alla volta quando è
   davvero a schermo (le transizioni, con il ritardo --i, sono nel CSS). */
function chats(): void {
  const els = gsap.utils.toArray<HTMLElement>('[data-chat]');
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    },
    { threshold: 0.5 },
  );
  els.forEach((el) => {
    // Già a schermo all'avvio: resta com'è (niente fumetti che spariscono).
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('is-in');
    else io.observe(el);
  });
  document.documentElement.classList.add('has-chat');
  cleanups.push(() => {
    io.disconnect();
    els.forEach((el) => el.classList.remove('is-in'));
    document.documentElement.classList.remove('has-chat');
  });
}

/* Petali e gigli che ondeggiano: animazione CSS (resta sul compositore),
   ognuno con la sua durata e il suo ritardo. */
function floaters(): void {
  gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el, i) => {
    el.style.setProperty('--float-d', `${gsap.utils.random(5, 7.5).toFixed(2)}s`);
    el.style.setProperty('--float-delay', `${(-gsap.utils.random(0, 5)).toFixed(2)}s`);
    el.style.setProperty('--float-r', `${i % 2 ? 4 : -4}deg`);
    el.classList.add('is-floating');
  });
  cleanups.push(() =>
    document.querySelectorAll<HTMLElement>('.is-floating').forEach((el) => {
      el.classList.remove('is-floating');
      ['--float-d', '--float-delay', '--float-r'].forEach((p) => el.style.removeProperty(p));
    }),
  );
}

/* ── Da toccare ───────────────────────────────────────────────────── */
/* Accordion morbido (FAQ): il <details> nativo funziona già senza script;
   qui apertura e chiusura diventano un'animazione d'altezza. */
function accordions(): void {
  gsap.utils.toArray<HTMLDetailsElement>('details[data-accordion]').forEach((d) => {
    const summary = d.querySelector<HTMLElement>('summary');
    const body = d.querySelector<HTMLElement>('[data-accordion-body]');
    if (!summary || !body) return;
    on<MouseEvent>(summary, 'click', (e) => {
      e.preventDefault();
      if (d.open && !d.hasAttribute('data-closing')) {
        d.setAttribute('data-closing', '');
        gsap.fromTo(
          body,
          { height: body.offsetHeight, opacity: 1 },
          {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            overwrite: true,
            onComplete: () => {
              d.open = false;
              d.removeAttribute('data-closing');
              gsap.set(body, { clearProps: 'height,opacity' });
            },
          },
        );
        return;
      }
      const fromH = d.hasAttribute('data-closing') ? body.offsetHeight : 0;
      d.removeAttribute('data-closing');
      d.open = true;
      gsap.fromTo(
        body,
        { height: fromH, opacity: fromH ? 1 : 0 },
        {
          height: () => body.scrollHeight,
          opacity: 1,
          duration: 0.65,
          ease: EASE,
          overwrite: true,
          onComplete: () => void gsap.set(body, { clearProps: 'height,opacity' }),
        },
      );
    });
    cleanups.push(() => d.removeAttribute('data-closing'));
  });
}

/* Card che si inclinano appena verso il puntatore (delega: un solo ascoltatore). */
function tiltCards(): void {
  if (!fine()) return;
  let card: HTMLElement | null = null;
  let rx: ((v: number) => void) | null = null;
  let ry: ((v: number) => void) | null = null;
  const leave = (el: HTMLElement): void => {
    gsap.to(el, { rotationX: 0, rotationY: 0, y: 0, scale: 1, duration: 0.9, ease: EASE, overwrite: 'auto', clearProps: 'transform,transition' });
  };
  const enter = (el: HTMLElement): void => {
    gsap.set(el, { transformPerspective: 1000, transition: 'box-shadow .6s ease, opacity .45s ease' });
    gsap.to(el, { y: -6, scale: 1.01, duration: 0.6, ease: EASE, overwrite: 'auto' });
    rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: EASE });
    ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: EASE });
  };
  on<PointerEvent>(document, 'pointerover', (e) => {
    if (e.pointerType !== 'mouse') return;
    const next = e.target instanceof Element ? e.target.closest<HTMLElement>('[data-tilt]') : null;
    if (next === card) return;
    if (card) leave(card);
    card = next;
    if (card) enter(card);
  });
  on<PointerEvent>(document, 'pointerout', (e) => {
    if (!card) return;
    const to = e.relatedTarget instanceof Node ? e.relatedTarget : null;
    if (to && card.contains(to)) return;
    leave(card);
    card = null;
  });
  on<PointerEvent>(document, 'pointermove', (e) => {
    if (!card || !rx || !ry) return;
    const r = card.getBoundingClientRect();
    rx(-((e.clientY - r.top) / r.height - 0.5) * 5);
    ry(((e.clientX - r.left) / r.width - 0.5) * 7);
  });
  cleanups.push(() => {
    if (card) gsap.set(card, { clearProps: 'transform,transition' });
    card = null;
  });
}

/* Il badge "Prenota" attirato dal puntatore (da ireandlunaslife, magnets). */
function magnets(): void {
  if (!fine()) return;
  gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: EASE });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: EASE });
    on<PointerEvent>(el, 'pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    on(el, 'pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.6)', overwrite: true });
    });
    cleanups.push(() => gsap.set(el, { clearProps: 'transform' }));
  });
}

/* L'indice dei trattamenti: la foto segue il puntatore sopra la riga (da
   ireandlunaslife, pathRows). Solo se la riga ha la sua foto. */
function pathRows(): void {
  if (!fine()) return;
  gsap.utils.toArray<HTMLElement>('[data-path-row]').forEach((row) => {
    const thumb = row.querySelector<HTMLElement>('[data-path-thumb]');
    if (!thumb) return;
    gsap.set(thumb, { xPercent: -50, yPercent: -50, scale: 0, rotation: -6 });
    const xTo = gsap.quickTo(thumb, 'x', { duration: 0.7, ease: EASE });
    const yTo = gsap.quickTo(thumb, 'y', { duration: 0.7, ease: EASE });
    on<PointerEvent>(row, 'pointerenter', (e) => {
      const r = row.getBoundingClientRect();
      gsap.set(thumb, { x: e.clientX - r.left, y: e.clientY - r.top });
      gsap.to(thumb, { scale: 1, rotation: gsap.utils.random(-5, 5), duration: 0.7, ease: EASE, overwrite: 'auto' });
    });
    on<PointerEvent>(row, 'pointermove', (e) => {
      const r = row.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    });
    on(row, 'pointerleave', () => gsap.to(thumb, { scale: 0, rotation: -6, duration: 0.45, ease: 'power2.in', overwrite: 'auto' }));
    cleanups.push(() => gsap.set(thumb, { clearProps: 'transform' }));
  });
}

/* La lente sulla foto della stesa (da ireandlunaslife, lenses). */
function lenses(): void {
  if (!fine()) return;
  gsap.utils.toArray<HTMLElement>('[data-lens]').forEach((root) => {
    const src = root.dataset.lens;
    if (!src) return;
    const ZOOM = 1.9;
    const lens = document.createElement('span');
    lens.className = 'lens';
    lens.setAttribute('aria-hidden', 'true');
    lens.style.backgroundImage = `url("${src}")`;
    root.appendChild(lens);
    const hint = root.querySelector<HTMLElement>('.lens-hint');
    gsap.set(lens, { xPercent: -50, yPercent: -50, scale: 0 });
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let shown = false;
    const tick = (): void => {
      if (!shown) return;
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      const w = root.offsetWidth;
      const h = root.offsetHeight;
      const r = lens.offsetWidth / 2;
      gsap.set(lens, { x: pos.x, y: pos.y });
      lens.style.backgroundSize = `${w * ZOOM}px ${h * ZOOM}px`;
      lens.style.backgroundPosition = `${(-(pos.x * ZOOM - r)).toFixed(1)}px ${(-(pos.y * ZOOM - r)).toFixed(1)}px`;
    };
    gsap.ticker.add(tick);
    cleanups.push(() => {
      gsap.ticker.remove(tick);
      lens.remove();
    });
    const local = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const k = root.offsetWidth / r.width || 1;
      return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k };
    };
    on<PointerEvent>(root, 'pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      const p = local(e);
      Object.assign(target, p);
      Object.assign(pos, p);
      shown = true;
      gsap.to(lens, { scale: 1, duration: 0.65, ease: EASE, overwrite: 'auto' });
      if (hint) gsap.to(hint, { opacity: 0, y: 8, duration: 0.3, overwrite: 'auto' });
    });
    on<PointerEvent>(root, 'pointermove', (e) => {
      if (e.pointerType === 'mouse') Object.assign(target, local(e));
    });
    on(root, 'pointerleave', () => {
      gsap.to(lens, { scale: 0, duration: 0.4, ease: 'power2.in', overwrite: 'auto', onComplete: () => void (shown = false) });
      if (hint) gsap.to(hint, { opacity: 1, y: 0, duration: 0.4, delay: 0.3, overwrite: 'auto' });
    });
  });
}

/* Petali che cadono dietro al puntatore, un cuore al clic (da
   ireandlunaslife, pawTrails: petali invece di impronte). Solo col mouse. */
function petalTrails(): void {
  if (!fine()) return;
  gsap.utils.toArray<HTMLElement>('[data-petal-trail]').forEach((section) => {
    let last: { x: number; y: number } | null = null;
    const STEP = 72;
    const drop = (x: number, y: number, big = false): void => {
      const bit = document.createElement('span');
      bit.className = big ? 'petalo-scia is-cuore' : 'petalo-scia';
      bit.setAttribute('aria-hidden', 'true');
      bit.innerHTML = big ? CUORE : PETALO;
      section.appendChild(bit);
      gsap.set(bit, { x, y, xPercent: -50, yPercent: -50, rotation: gsap.utils.random(-50, 50) });
      gsap
        .timeline({ onComplete: () => bit.remove() })
        .fromTo(bit, { scale: 0.3, opacity: 0 }, { scale: big ? 1.4 : 1, opacity: 0.9, duration: 0.35, ease: EASE })
        .to(bit, {
          y: `+=${big ? 30 : gsap.utils.random(40, 80)}`,
          x: `+=${gsap.utils.random(-24, 24)}`,
          rotation: `+=${gsap.utils.random(-70, 70)}`,
          opacity: 0,
          duration: big ? 1.2 : 1.5,
          ease: 'sine.in',
        });
    };
    const local = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    on<PointerEvent>(section, 'pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const p = local(e);
      if (!last) {
        last = p;
        return;
      }
      if (Math.hypot(p.x - last.x, p.y - last.y) < STEP) return;
      drop(p.x, p.y);
      last = p;
    });
    on(section, 'pointerleave', () => void (last = null));
    on<PointerEvent>(section, 'pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      if ((e.target as Element).closest('a, button, input, textarea, select, label, summary')) return;
      const p = local(e);
      drop(p.x, p.y, true);
    });
    cleanups.push(() => section.querySelectorAll('.petalo-scia').forEach((b) => b.remove()));
  });
}

/* Cuori al tocco sul ritratto: un battito, niente "scodinzolo". */
function loves(): void {
  gsap.utils.toArray<HTMLElement>('[data-love]').forEach((el) => {
    if (fine()) on(el, 'pointerenter', () => beat(el));
    on(el, 'click', () => {
      beat(el);
      celebrate(el, { count: 10, shapes: [CUORE], spread: 0.6 });
    });
  });
}

/* Testo dei bottoni che "rotola" al passaggio (solo con un mouse). Solo
   bottoni con un'etichetta fissa: niente richieste, fogli o bottoni che
   cambiano testo. Al cambio pagina il testo originale torna al suo posto. */
function rollButtons(): void {
  if (!fine()) return;
  document.querySelectorAll<HTMLElement>('.btn:not([data-roll]):not([data-no-roll])').forEach((btn) => {
    if (btn.closest('[data-flow-root], [role="dialog"], [data-no-roll]')) return;
    const texts = Array.from(btn.childNodes).filter((n): n is Text => n.nodeType === Node.TEXT_NODE && !!n.textContent?.trim());
    const text = texts[0];
    if (texts.length !== 1 || !text) return;
    const label = text.textContent?.trim() ?? '';
    const wrap = document.createElement('span');
    wrap.className = 'btn-roll';
    wrap.dataset.label = label;
    const inner = document.createElement('span');
    inner.textContent = label;
    wrap.appendChild(inner);
    btn.replaceChild(wrap, text);
    btn.setAttribute('data-roll', '');
    cleanups.push(() => {
      if (wrap.parentNode === btn) btn.replaceChild(text, wrap);
      btn.removeAttribute('data-roll');
    });
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
  mm?.revert();
  mm = null;
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
  const id = ++run;
  document.documentElement.classList.add('has-motion');
  const media = gsap.matchMedia();
  mm = media;
  const page = gsap.context(() => {});
  ctx = page;
  // Subito, e leggero: osservatori e ascoltatori, nessuna lettura di layout.
  rollButtons();
  page.add(() => {
    startShots();
    accordions();
    tiltCards();
    loves();
    magnets();
    pathRows();
    lenses();
    petalTrails();
    floaters();
  });
  // Poi le sezioni legate allo scroll, una tappa per task. Prima quelle
  // ferme: allungano la pagina, e ciò che sta sotto si misura dopo.
  const stages: (() => void)[] = [
    () => storiesScroll(media),
    () => heroAway(),
    () => {
      parallax();
      rails();
      fans();
    },
    () => scrubStatements(),
    () => {
      marquees();
      spins();
      peeks();
    },
    () => chats(),
    () => trails(),
  ];
  staging = true;
  void (async () => {
    let afterPins = 0;
    for (const [i, stage] of stages.entries()) {
      await nextTask();
      if (id !== run) return;
      page.add(stage);
      if (i === 0) afterPins = document.documentElement.scrollHeight;
    }
    staging = false;
    const h = document.documentElement.scrollHeight;
    if (Math.abs(h - afterPins) >= 2) ScrollTrigger.refresh();
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
