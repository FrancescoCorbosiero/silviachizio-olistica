import localFont from 'next/font/local';

/**
 * Font self-hosted (nessuna richiesta a Google dal browser), come
 * src/app/fonts.ts di andrea-bellettati. Scelti confrontandoli con il logo e
 * con i titoli del listino (docs/brand.md, "Tipografia"):
 *  · Playfair Display — titoli e nomi dei trattamenti (variabile 400–900) e
 *    il corsivo dei sottotitoli e delle descrizioni (400 corsivo);
 *  · Figtree — il testo e le parti "app" (Konsta), variabile;
 *  · Damion — la parola scritta a mano, una per titolo.
 * Solo l'alfabeto latino; licenze OFL in src/fonts/licenze/.
 */
export const playfair = localFont({
  src: [
    { path: '../fonts/playfair-display-latin-wght-normal.woff2', weight: '400 900', style: 'normal' },
    { path: '../fonts/playfair-display-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-playfair',
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

export const fontVariables = `${playfair.variable} ${figtree.variable} ${damion.variable}`;
