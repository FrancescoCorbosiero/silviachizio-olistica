import type { Metadata } from 'next';
import { GIORNO_SCHEMA } from './orari';
import {
  CITTA,
  EMAIL,
  HAS_EMAIL,
  HAS_INDIRIZZO,
  HAS_PHONE,
  IG_URL,
  ORARI,
  OWNER_NAME,
  PHONE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  STUDIO,
  THREADS_URL,
  absoluteUrl,
} from './site';
import { LETTURA, TRATTAMENTI, RELAX_MINUTI } from './trattamenti';

/*
 * Dati strutturati e metadati (schema di andrea-bellettati, src/lib/seo.ts).
 * HealthAndBeautyBusiness al posto di ProfessionalService; indirizzo,
 * coordinate, orari, telefono ed email solo quando ci sono (src/lib/site.ts).
 */

const ID_SITO = `${SITE_URL}/#website`;
const ID_SILVIA = `${SITE_URL}/#silvia`;
const ID_LILY = `${SITE_URL}/#lily`;

/** Il catalogo per i motori: i quattro trattamenti e le letture a distanza. */
function catalogo(): Record<string, unknown> {
  const offerta = (servizio: Record<string, unknown>, prezzo: number | null) => ({
    '@type': 'Offer',
    itemOffered: servizio,
    ...(prezzo !== null ? { price: prezzo.toFixed(2), priceCurrency: 'EUR' } : {}),
  });
  return {
    '@type': 'OfferCatalog',
    name: 'Listino trattamenti · Quattro esperienze di benessere',
    itemListElement: [
      ...TRATTAMENTI.map((t) =>
        offerta(
          {
            '@type': 'Service',
            '@id': `${SITE_URL}/trattamenti#${t.slug}`,
            name: t.nome,
            description: `${t.breve}. ${t.durata} minuti, più circa ${RELAX_MINUTI} minuti di relax.`,
            url: absoluteUrl(`/trattamenti#${t.slug}`),
            provider: { '@id': ID_LILY },
            areaServed: { '@type': 'City', name: CITTA },
          },
          t.prezzo,
        ),
      ),
      offerta(
        {
          '@type': 'Service',
          '@id': `${SITE_URL}/letture#servizio`,
          name: LETTURA.nome,
          description: `Una lettura simbolica e intuitiva personalizzata, a distanza: ${LETTURA.riceverai.join(', ')}.`,
          url: absoluteUrl('/letture'),
          provider: { '@id': ID_LILY },
          areaServed: { '@type': 'Country', name: 'Italia' },
        },
        LETTURA.prezzo,
      ),
    ],
  };
}

/** Grafo base presente in ogni pagina: sito, Silvia, Lily. */
export function siteGraph(): Record<string, unknown>[] {
  const sameAs = [IG_URL, THREADS_URL];
  return [
    {
      '@type': 'WebSite',
      '@id': ID_SITO,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'it-IT',
      publisher: { '@id': ID_LILY },
    },
    {
      '@type': 'Person',
      '@id': ID_SILVIA,
      name: OWNER_NAME,
      url: absoluteUrl('/chi-sono'),
      sameAs,
      worksFor: { '@id': ID_LILY },
    },
    {
      '@type': 'HealthAndBeautyBusiness',
      '@id': ID_LILY,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: absoluteUrl('/icons/icon-512.png'),
      logo: absoluteUrl('/icons/icon-512.png'),
      founder: { '@id': ID_SILVIA },
      employee: { '@id': ID_SILVIA },
      sameAs,
      address: {
        '@type': 'PostalAddress',
        ...(HAS_INDIRIZZO ? { streetAddress: STUDIO.via, postalCode: STUDIO.cap || undefined } : {}),
        addressLocality: STUDIO.citta,
        addressRegion: STUDIO.provincia,
        addressCountry: 'IT',
      },
      ...(STUDIO.geo ? { geo: { '@type': 'GeoCoordinates', latitude: STUDIO.geo.lat, longitude: STUDIO.geo.lng } } : {}),
      ...(HAS_PHONE ? { telephone: PHONE } : {}),
      ...(HAS_EMAIL ? { email: EMAIL } : {}),
      ...(ORARI.length
        ? {
            openingHoursSpecification: ORARI.map((o) => ({
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: o.giorni.map((g) => GIORNO_SCHEMA[g]),
              opens: o.dalle,
              closes: o.alle,
            })),
          }
        : {}),
      areaServed: [
        { '@type': 'City', name: CITTA },
        { '@type': 'AdministrativeArea', name: 'Provincia di Treviso' },
      ],
      hasOfferCatalog: catalogo(),
    },
  ];
}

export function breadcrumbLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** Le domande frequenti di una pagina, per i motori. */
export function faqLd(items: readonly { q: string; a: string }[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

/** L'immagine per i social di ogni pagina (public/og, generate da scripts/immagini.cjs). */
const OG: Record<string, string> = {
  '/': '/og/home.jpg',
  '/trattamenti': '/og/trattamenti.jpg',
  '/letture': '/og/letture.jpg',
  '/prenota': '/og/prenota.jpg',
  '/chi-sono': '/og/chi-sono.jpg',
  '/contatti': '/og/contatti.jpg',
  '/privacy': '/og/privacy.jpg',
  '/bio': '/og/bio.jpg',
};

/** Metadata di una pagina: titolo, descrizione, canonical e anteprima social. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  noindex = false,
}: {
  title: string | { absolute: string };
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
}): Metadata {
  const plain = typeof title === 'string' ? title : title.absolute;
  const img = image ?? OG[path] ?? OG['/'];
  const images = img ? [{ url: img, width: 1200, height: 630, alt: imageAlt ?? plain }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', url: path, title: plain, description, images, locale: 'it_IT', siteName: SITE_NAME },
    twitter: { card: 'summary_large_image', title: plain, description, images: img ? [img] : undefined },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
