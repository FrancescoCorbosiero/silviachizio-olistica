import type { MetadataRoute } from 'next';
import { getArticoli } from '@/lib/blog';
import { absoluteUrl, BLOG_ONLINE } from '@/lib/site';

/** Generato al build: serve anche all'anteprima statica (output: export). */
export const dynamic = 'force-static';

/**
 * Le pagine del sito per i motori (da andrea-bellettati, sitemap.ts).
 * Fuori: /bio (link in bio, noindex) e /stile (Brand System, noindex).
 * Il blog solo quando è online, e solo con gli articoli veri (mai quelli
 * di prova dell'anteprima).
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
  const articoli = BLOG_ONLINE ? getArticoli().filter((a) => !a.esempio) : [];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), lastModified: now, changeFrequency: 'monthly' as const, priority: p.priority })),
    ...(articoli.length ? [{ url: absoluteUrl('/blog'), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 }] : []),
    ...articoli.map((a) => ({ url: absoluteUrl(`/blog/${a.slug}`), lastModified: a.data, changeFrequency: 'yearly' as const, priority: 0.5 })),
  ];
}
