/**
 * Le immagini delle scene a tutto schermo (components/ui/Scena.tsx). Unica
 * fonte: pagine e sezioni chiedono un'immagine per nome.
 *
 * Oggi sono **immagini d'atmosfera** disegnate da noi (scripts/atmosfere.cjs:
 * luce e ombre di gigli su un muro, seta, candele, petali fuori fuoco, lino),
 * non foto stock e non foto di Silvia: non mostrano persone né lo studio, e
 * non dicono niente che non sia vero. Quando arrivano le foto vere (domande
 * aperte ★: lo studio, Silvia al lavoro nella divisa), si mettono in
 * public/foto/ e si cambia `src` qui; il resto del sito non si tocca.
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
};

const atmosfera = (nome: string, fuoco?: string): Immagine => ({
  src: `/atmosfere/${nome}.webp`,
  srcVerticale: `/atmosfere/${nome}-v.webp`,
  alt: '',
  fuoco,
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
} as const satisfies Record<string, Immagine>;

export type NomeImmagine = keyof typeof IMMAGINI;
