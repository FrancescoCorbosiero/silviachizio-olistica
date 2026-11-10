import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';

/**
 * Il contenuto della 404 (da andrea-bellettati, NotFoundContent.tsx): il
 * giglio, una riga gentile, i link alle pagine principali. Il giglio è
 * un'immagine e non un SVG in pagina: Next mette la 404 nei dati di ogni
 * pagina, deve restare leggera.
 */
export default function NotFoundContent() {
  return (
    <section className="relative isolate overflow-x-clip py-[clamp(64px,11vw,150px)]">
      <div className="alone left-[58%] top-1/2 w-[min(760px,140vw)] -translate-y-1/2" aria-hidden />
      <div className="wrap grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
        <div className="flex flex-col items-start gap-6">
          <span className="eyebrow intro">Errore 404</span>
          {/* BOZZA */}
          <h1 className="display-xl intro" style={{ '--d': '0.1s' } as React.CSSProperties}>
            Questa pagina è <span className="script">volata</span> via
          </h1>
          {/* BOZZA */}
          <p className="lead misura intro" style={{ '--d': '0.25s' } as React.CSSProperties}>
            Forse il link è cambiato, o la pagina non c&apos;è più. Ripartiamo da qui.
          </p>
          <div className="intro flex flex-wrap gap-3" style={{ '--d': '0.4s' } as React.CSSProperties}>
            <Link className="btn btn-lg" href="/">
              Torna alla home <ArrowIcon size={16} />
            </Link>
            <Link className="btn btn-outline btn-lg" href="/trattamenti">
              Trattamenti
            </Link>
            <Link className="btn btn-outline btn-lg" href="/letture">
              Letture
            </Link>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* loading="lazy": React non lo precarica in ogni pagina (la 404 viaggia nei dati di tutte). */}
        <img src="/brand/giglio.svg" alt="" width={240} height={180} loading="lazy" decoding="async" className="intro-fade mx-auto h-auto w-[min(380px,78%)] opacity-90" />
      </div>
    </section>
  );
}
