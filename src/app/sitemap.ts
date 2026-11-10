import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

/** Generato al build: serve anche all'anteprima statica (output: export). */
export const dynamic = 'force-static';

/**
 * Le pagine del sito per i motori (da andrea-bellettati, sitemap.ts).
 * Fuori: /bio (link in bio, noindex) e /stile (Brand System, noindex).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/trattamenti', priority: 0.9 },
    { path: '/letture', priority: 0.8 },
    { path: '/prenota', priority: 0.8 },
    { path: '/chi-sono', priority: 0.6 },
    { path: '/contatti', priority: 0.7 },
    { path: '/privacy', priority: 0.2 },
  ];
  const now = new Date();
  return pages.map((p) => ({ url: absoluteUrl(p.path), lastModified: now, changeFrequency: 'monthly' as const, priority: p.priority }));
}
