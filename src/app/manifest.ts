import type { MetadataRoute } from 'next';
import { DAL_MODULO, RICHIESTE } from '@/lib/richieste';

/** Generato al build: serve anche all'anteprima statica (output: export). */
export const dynamic = 'force-static';

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
    background_color: '#f2e4dd',
    theme_color: '#f2e4dd',
    categories: ['lifestyle', 'health'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    // Le scorciatoie devono restare nel sito: il modulo Google ne è fuori.
    shortcuts: DAL_MODULO
      ? [
          { name: 'Il listino', url: '/trattamenti' },
          { name: 'Le letture', url: '/letture' },
          { name: 'Come prenotare', short_name: 'Prenota', url: '/#contatti' },
        ]
      : [
          { name: 'Prenota un trattamento', short_name: 'Prenota', url: RICHIESTE.trattamenti.href },
          { name: 'Richiedi una lettura', short_name: 'Lettura', url: RICHIESTE.letture.href },
          { name: 'Il listino', url: '/trattamenti' },
        ],
  };
}
