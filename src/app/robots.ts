import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

/** Generato al build: serve anche all'anteprima statica (output: export). */
export const dynamic = 'force-static';

/** Da andrea-bellettati (src/app/robots.ts). Serve anche all'healthcheck del Dockerfile. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
