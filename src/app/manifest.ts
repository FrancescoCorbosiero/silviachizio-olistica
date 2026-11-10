import type { MetadataRoute } from 'next';

/**
 * Manifest da web app (da andrea-bellettati, manifest.ts): il sito si può
 * aggiungere alla schermata Home e si apre a tutto schermo. È il primo
 * mattone del gestionale (docs/web-app.md). Icone dal giglio.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Lily Trattamenti Benessere',
    short_name: 'Lily',
    description: 'Trattamenti benessere a Montebelluna (TV) e letture intuitive personalizzate a distanza.',
    lang: 'it',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fdf6f8',
    theme_color: '#fdf6f8',
    categories: ['lifestyle', 'health'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Prenota un trattamento', short_name: 'Prenota', url: '/prenota#richiesta' },
      { name: 'Richiedi una lettura', short_name: 'Lettura', url: '/letture#richiesta' },
      { name: 'Il listino', url: '/trattamenti' },
    ],
  };
}
