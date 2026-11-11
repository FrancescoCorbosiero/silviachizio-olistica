import localFont from 'next/font/local';

/**
 * Font self-hosted (nessuna richiesta a Google dal browser), come
 * src/app/fonts.ts di andrea-bellettati. Scelti confrontandoli con il logo e
 * con i titoli del listino (docs/brand.md, "Tipografia"):
 *  · Playfair Display — titoli e nomi dei trattamenti (variabile 400–900);
 *  · Figtree — il testo e le parti "app" (Konsta), variabile;
 *  · Cormorant Garamond corsivo (500 e 600) — il corsivo del sito:
 *    descrizioni del listino, etichette sopra i titoli, la parola in
 *    evidenza, citazioni. Più elegante e più leggibile del Playfair
 *    corsivo alle misure piccole (novembre 2026);
 *  · Damion — il logo, il wordmark del footer e la firma.
 * Solo l'alfabeto latino; licenze OFL in src/fonts/licenze/.
 */
export const playfair = localFont({
  src: [{ path: '../fonts/playfair-display-latin-wght-normal.woff2', weight: '400 900', style: 'normal' }],
  variable: '--font-playfair',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

export const cormorant = localFont({
  src: [
    { path: '../fonts/cormorant-garamond-latin-500-italic.woff2', weight: '500', style: 'italic' },
    { path: '../fonts/cormorant-garamond-latin-600-italic.woff2', weight: '600', style: 'italic' },
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

export const fontVariables = `${playfair.variable} ${cormorant.variable} ${figtree.variable} ${damion.variable}`;
