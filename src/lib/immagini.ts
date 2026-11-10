import type { TrattamentoSlug } from './trattamenti';

/**
 * Le immagini delle scene a tutto schermo (components/ui/Scena.tsx). Unica
 * fonte: pagine e sezioni chiedono un'immagine per nome.
 *
 * Tre provenienze, scritte in `fonte`:
 * - **atmosfera**: disegnate da noi (scripts/atmosfere.cjs: luce e ombre di
 *   gigli su un muro, seta, candele, petali fuori fuoco, lino). Non mostrano
 *   persone né lo studio e non dicono niente che non sia vero.
 * - **anteprima**: foto date dallo studio per l'anteprima (Montebelluna, le
 *   carte). Prima di andare online: verificare i diritti d'uso o
 *   sostituirle (docs/domande-aperte.md).
 * - **silvia**: le foto vere di Silvia e dello studio, quando arrivano
 *   (domande aperte ★). Si preparano con scripts/foto.cjs in public/foto/
 *   e si cambia `src` qui; il resto del sito non si tocca.
 * Ogni immagine ha due tagli: orizzontale (desktop) e verticale (telefono).
 */
export type Immagine = {
  /** Taglio orizzontale, 2000×1250. */
  src: string;
  /** Taglio verticale per il telefono, 900×1500. */
  srcVerticale: string;
  /** Vuoto se è solo atmosfera (decorativa); una descrizione se è una foto vera. */
  alt: string;
  /** Il punto da tenere in vista quando l'immagine si ritaglia. */
  fuoco?: string;
  fonte: 'atmosfera' | 'anteprima' | 'silvia';
};

const atmosfera = (nome: string, fuoco?: string): Immagine => ({
  src: `/atmosfere/${nome}.webp`,
  srcVerticale: `/atmosfere/${nome}-v.webp`,
  alt: '',
  fuoco,
  fonte: 'atmosfera',
});

/** Una foto preparata con scripts/foto.cjs (public/foto/). */
const foto = (nome: string, alt: string, fonte: Immagine['fonte'], fuoco?: string): Immagine => ({
  src: `/foto/${nome}.webp`,
  srcVerticale: `/foto/${nome}-v.webp`,
  alt,
  fuoco,
  fonte,
});

/** Il primo fotogramma di un video di public/video/: il suo poster. */
const poster = (nome: string): Immagine => ({
  src: `/video/${nome}.webp`,
  srcVerticale: `/video/${nome}-v.webp`,
  alt: '',
  fonte: 'atmosfera',
});

export const IMMAGINI = {
  /** Luce del pomeriggio e ombre di gigli su un muro rosa antico. */
  luce: atmosfera('ombre', '70% 40%'),
  /** La stessa luce, specchiata: le ombre a sinistra. */
  luceSpecchio: atmosfera('ombre-specchio', '30% 40%'),
  /** Un drappo di seta color lily. */
  seta: atmosfera('seta-scuro'),
  /** Seta più chiara e accesa. */
  setaChiara: atmosfera('seta'),
  /** Il buio caldo con le candele fuori fuoco: le letture, Lily Magic. */
  candela: atmosfera('candela', '75% 60%'),
  /** Petali fuori fuoco, rosa e cera. */
  velo: atmosfera('velo'),
  /** Tela di lino color sabbia rosata: fondo chiaro ma caldo. */
  lino: atmosfera('lino'),
  /** Creste di montagna al tramonto, una dietro l'altra (il blog: l'arrampicata). */
  montagne: atmosfera('montagne', '50% 60%'),
  /** Un libro di poesie aperto, con un giglio pressato (il blog: poesia e libri). */
  pagine: atmosfera('pagine'),
  /** Tre fotogrammi su una striscia di negativo (il blog: la fotografia). */
  pellicola: atmosfera('pellicola'),
  /** Montebelluna dall'alto, col Duomo: foto per l'anteprima (piccola, 617×324: serve più grande). */
  montebelluna: foto('montebelluna', "Montebelluna dall'alto, con il Duomo", 'anteprima', '50% 35%'),
  /** Carte e cristalli su marmo: foto per l'anteprima delle letture. */
  carte: foto('lettura-carte', 'Carte e cristalli su un piano di marmo', 'anteprima'),
  /** Il primo fotogramma del video della hero (public/video/): il suo poster. */
  heroVideo: poster('hero'),
} as const satisfies Record<string, Immagine>;

export type NomeImmagine = keyof typeof IMMAGINI;

/**
 * Il video della hero (scripts/video-hero.cjs): luce e ombre di gigli che
 * si muovono piano sul muro. Atmosfera disegnata da noi, come le immagini;
 * quando c'è un video vero dello studio si sostituisce qui. Il poster è
 * IMMAGINI.heroVideo (il primo fotogramma).
 */
export const VIDEO_HERO = {
  mp4: '/video/hero.mp4',
  webm: '/video/hero.webm',
  mp4V: '/video/hero-v.mp4',
  webmV: '/video/hero-v.webm',
};

/* ── Le foto vere che aspettano Silvia (domande aperte ★) ──────────────
   Vuote: i blocchi che le usano compaiono solo in anteprima, con le
   atmosfere al loro posto e il segno «Esempio» (src/lib/anteprima.ts). */

/** La galleria dello studio (Trattamenti): il lettino, il futon, le candele, le pietre… */
export const GALLERIA_STUDIO: NomeImmagine[] = [];

/** Una foto per trattamento: segue il puntatore nell'indice e apre la sua sezione. */
export const FOTO_TRATTAMENTI: Partial<Record<TrattamentoSlug, NomeImmagine>> = {};

/** La foto di una stesa vera di Silvia (Letture, con la lente). */
export const FOTO_STESA: NomeImmagine | null = null;
