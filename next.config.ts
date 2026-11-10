import type { NextConfig } from 'next';

/**
 * ANTEPRIMA_STATICA=1: solo per un'anteprima su un hosting statico (es.
 * Netlify Drop), con npm run anteprima (scripts/anteprima-statica.mjs). Esporta HTML e file in
 * out/, senza server: niente /api/richiesta (le richieste ripiegano sul testo
 * da copiare e su Instagram) e niente intestazioni di sicurezza.
 */
const statica = process.env.ANTEPRIMA_STATICA === '1';

/** Intestazioni di sicurezza leggere per ogni risposta (solo con il server). */
async function headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
      ],
    },
  ];
}

const nextConfig: NextConfig = {
  // Server autonomo in .next/standalone: l'immagine Docker esegue `node server.js`
  // senza tutto node_modules (vedi Dockerfile).
  output: statica ? 'export' : 'standalone',
  poweredByHeader: false,
  // Niente badge di sviluppo sopra la pagina (screenshot puliti).
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: statica,
  },
  // Intestazioni di sicurezza leggere per ogni risposta. HSTS lo mette Caddy,
  // che termina il TLS; niente CSP per non rompere JSON-LD e stili inline.
  ...(statica ? {} : { headers }),
};

export default nextConfig;
