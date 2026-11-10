import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CardArticolo from '@/components/blog/CardArticolo';
import { BarraLettura, Condividi } from '@/components/blog/StrumentiArticolo';
import { ArrowIcon } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import Chiusura from '@/components/ui/Chiusura';
import Esempio from '@/components/ui/Esempio';
import Scena from '@/components/ui/Scena';
import SectionHead from '@/components/ui/SectionHead';
import { getArticoli, getArticolo, renderMarkdown, scheda } from '@/lib/blog';
import { TONO_TEMA } from '@/lib/blog-temi';
import { IMMAGINI } from '@/lib/immagini';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { OWNER_NAME, SITE_URL, absoluteUrl } from '@/lib/site';

/** Solo gli articoli che ci sono: un indirizzo diverso è una 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getArticoli().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const a = getArticolo(slug);
  if (!a) return {};
  return pageMetadata({ title: a.titolo, description: a.estratto, path: `/blog/${a.slug}` });
}

/**
 * Un articolo del blog: la copertina in scena con tema, minuti e data, il
 * testo (Markdown di src/content/blog), la condivisione, gli altri
 * articoli e la chiusura. Gli articoli di prova portano il segno
 * «Esempio» e non finiscono nei dati strutturati.
 */
export default async function ArticoloPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params;
  const a = getArticolo(slug);
  if (!a) notFound();
  const html = await renderMarkdown(a.corpo);
  const altri = getArticoli().filter((x) => x.slug !== a.slug);
  const correlati = [...altri.filter((x) => x.tema === a.tema), ...altri.filter((x) => x.tema !== a.tema)].slice(0, 3);

  return (
    <>
      <BarraLettura />
      <Scena immagine={a.copertina} altezza="alta" velo="scuro" priorita aria-labelledby="articolo-titolo" contenuto="flex flex-col justify-end self-stretch">
        <header className="flex max-w-[860px] flex-col items-start gap-5 pt-[18svh]">
          <Link href="/blog" className="text-link intro !text-[15px]">
            <ArrowIcon size={14} className="rotate-180" /> Il blog
          </Link>
          <p className="card-articolo-tema intro" style={{ '--tono': TONO_TEMA[a.tema], '--d': '0.05s' } as React.CSSProperties}>
            {a.tema} · {a.minuti} min di lettura · {a.quando}
          </p>
          <h1 id="articolo-titolo" className="display-xl intro" style={{ '--d': '0.1s' } as React.CSSProperties}>
            {a.titolo}
          </h1>
          <p className="lead misura intro" style={{ '--d': '0.2s' } as React.CSSProperties}>
            {a.estratto}
          </p>
          {a.esempio && <Esempio className="intro" cosa="articolo di prova, da sostituire con uno di Silvia" />}
        </header>
      </Scena>

      <article className="section" aria-labelledby="articolo-titolo">
        <div className="wrap-narrow">
          <div className="prose-lily prose-articolo" dangerouslySetInnerHTML={{ __html: html }} />
          <p className="mt-12 font-script text-[40px] leading-none text-lily">Silvia</p>
          <div className="mt-10 border-t border-lily/20 pt-8">
            <Condividi titolo={a.titolo} />
          </div>
        </div>
      </article>

      {correlati.length > 0 && (
        <section className="section fondo-blush" aria-labelledby="correlati-titolo">
          <div className="wrap">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <SectionHead id="correlati-titolo" eyebrow="Continua a leggere" title="Altre" script="pagine" />
              <Link className="btn btn-outline" href="/blog">
                Tutti gli articoli <ArrowIcon size={15} />
              </Link>
            </div>
            <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {correlati.map((r) => (
                <li key={r.slug}>
                  <CardArticolo articolo={scheda(r)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Chiusura
        eyebrow="Quando vuoi"
        // BOZZA
        title={
          <>
            Un momento <span className="script">per te</span>
          </>
        }
        lead="Un trattamento a Montebelluna o una lettura a distanza: ti rispondo io, di persona."
        immagine={a.copertina === 'luceSpecchio' ? 'luce' : 'luceSpecchio'}
      />
      <JsonLd
        data={[
          // Gli articoli di prova non vanno nei dati strutturati.
          ...(a.esempio
            ? []
            : [
                {
                  '@type': 'BlogPosting',
                  headline: a.titolo,
                  description: a.estratto,
                  datePublished: a.data.toISOString(),
                  inLanguage: 'it',
                  wordCount: a.parole,
                  timeRequired: `PT${a.minuti}M`,
                  articleSection: a.tema,
                  image: absoluteUrl(IMMAGINI[a.copertina].src),
                  author: { '@id': `${SITE_URL}/#silvia`, '@type': 'Person', name: OWNER_NAME },
                  mainEntityOfPage: absoluteUrl(`/blog/${a.slug}`),
                  publisher: { '@id': `${SITE_URL}/#lily` },
                },
              ]),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: a.titolo, path: `/blog/${a.slug}` },
          ]),
        ]}
      />
    </>
  );
}
