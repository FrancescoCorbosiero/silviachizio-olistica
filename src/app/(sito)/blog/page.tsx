import { notFound } from 'next/navigation';
import CardArticolo from '@/components/blog/CardArticolo';
import IndiceBlog from '@/components/blog/IndiceBlog';
import { InstagramIcon } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import Chiusura from '@/components/ui/Chiusura';
import Esempio from '@/components/ui/Esempio';
import Scena from '@/components/ui/Scena';
import SectionHead from '@/components/ui/SectionHead';
import { getArticoli, scheda, temiPresenti } from '@/lib/blog';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { HAS_BLOG, IG_HANDLE, IG_URL } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Blog',
  // BOZZA
  description: 'Poesia e libri, arrampicata, fotografia, i trattamenti e le letture: piccole cose scritte piano da Silvia, di Lily Trattamenti Benessere.',
  path: '/blog',
});

/**
 * Il blog (src/content/blog, src/lib/blog.ts): la testata in scena,
 * l'articolo in evidenza, l'indice con i temi e la chiusura. Senza
 * articoli da mostrare (blog spento e niente anteprima) la pagina non c'è.
 */
export default function BlogPage() {
  const articoli = getArticoli();
  if (!HAS_BLOG || !articoli.length) notFound();
  const evidenza = articoli.find((a) => a.inEvidenza) ?? articoli[0];
  const prova = articoli.some((a) => a.esempio);

  return (
    <>
      <Scena immagine="pagine" altezza="media" velo="scuro" priorita aria-labelledby="blog-titolo">
        <div className="flex max-w-[640px] flex-col items-start gap-6">
          <p className="eyebrow intro">Il blog</p>
          {/* BOZZA */}
          <h1 id="blog-titolo" className="display-xl intro" style={{ '--d': '0.08s' } as React.CSSProperties}>
            Pagine di <span className="script">Lily</span>
          </h1>
          {/* BOZZA */}
          <p className="lead misura intro" style={{ '--d': '0.2s' } as React.CSSProperties}>
            Poesie e libri, arrampicate, fotografie; e quello che succede nello studio e nelle letture. Piccole cose, scritte
            piano.
          </p>
          {prova && <Esempio className="intro" cosa="articoli di prova: arrivano quelli di Silvia" />}
        </div>
      </Scena>

      {evidenza && (
        <section className="section fondo-blush" aria-labelledby="evidenza-titolo">
          <div className="wrap">
            <h2 id="evidenza-titolo" className="eyebrow mb-8">
              In evidenza
            </h2>
            <CardArticolo articolo={scheda(evidenza)} livello="h3" grande />
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="tutti-titolo">
        <div className="wrap">
          <SectionHead id="tutti-titolo" eyebrow="Tutti gli articoli" title="Scegli un" script="tema" className="mb-10" />
          <IndiceBlog articoli={articoli.map(scheda)} temi={temiPresenti(articoli)} />
          <p className="testo-mute mt-14 flex flex-wrap items-center gap-2 text-[15.5px]">
            Ogni giorno racconto qualcosa anche su Instagram:{' '}
            <a className="text-link" href={IG_URL} target="_blank" rel="noopener">
              <InstagramIcon size={15} /> {IG_HANDLE}
            </a>
          </p>
        </div>
      </section>

      <Chiusura
        eyebrow="Quando vuoi"
        // BOZZA
        title={
          <>
            Dalle pagine allo <span className="script">studio</span>
          </>
        }
        lead="Un trattamento a Montebelluna o una lettura a distanza: ti rispondo io, di persona."
        immagine="montagne"
      />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
    </>
  );
}
