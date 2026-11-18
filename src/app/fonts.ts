import localFont from 'next/font/local';

/**
 * Font self-hosted (nessuna richiesta a Google dal browser). Due voci, più
 * il pennello del marchio (docs/brand.md, «Tipografia»):
 *  · Cormorant Garamond, variabile 300–700, in tondo e in corsivo: i titoli
 *    e la seconda voce del sito (descrizioni del listino, durate, citazioni).
 *    Una famiglia sola per tutto ciò che è "detto", come una carta stampata;
 *  · Figtree, variabile: il testo, i dati, l'interfaccia (anche Konsta);
 *  · Damion: solo il marchio «Lily» (logo e firma in fondo alla pagina).
 * Solo l'alfabeto latino; licenze OFL in src/fonts/licenze/.
 */
export const cormorant = localFont({
  src: [
    { path: '../fonts/cormorant-garamond-latin-wght-normal.woff2', weight: '300 700', style: 'normal' },
    { path: '../fonts/cormorant-garamond-latin-wght-italic.woff2', weight: '300 700', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

export const figtree = localFont({
  src: '../fonts/figtree-latin-wght-normal.woff2',
  weight: '300 900',
  style: 'normal',
  variable: '--font-figtree',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
});

export const damion = localFont({
  src: '../fonts/damion-latin-400-normal.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-damion',
  display: 'swap',
  fallback: ['cursive'],
  adjustFontFallback: false,
});

export const fontVariables = `${cormorant.variable} ${figtree.variable} ${damion.variable}`;
