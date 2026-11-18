import type { MetadataRoute } from 'next';
import { DAL_MODULO } from '@/lib/richieste';
import { absoluteUrl } from '@/lib/site';

/** Generato al build: serve anche all'anteprima statica (output: export). */
export const dynamic = 'force-static';

/**
 * Le pagine del sito per i motori: la home, le tre pagine e l'informativa. Le pagine
 * delle richieste solo quando le richieste partono dal sito.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/trattamenti', priority: 0.9 },
    { path: '/letture', priority: 0.8 },
    { path: '/chi-sono', priority: 0.6 },
    ...(DAL_MODULO
      ? []
      : [
          { path: '/prenota', priority: 0.8 },
          { path: '/prenota/lettura', priority: 0.7 },
        ]),
    { path: '/privacy', priority: 0.2 },
  ];
  const now = new Date();
  return pages.map((p) => ({ url: absoluteUrl(p.path), lastModified: now, changeFrequency: 'monthly' as const, priority: p.priority }));
}
