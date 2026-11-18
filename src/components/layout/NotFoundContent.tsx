import Link from 'next/link';
import Bottone from '@/components/ui/Bottone';
import { NAV } from '@/lib/site';

/**
 * Il contenuto della 404: una riga gentile e le strade per ripartire.
 * Next mette la 404 nei dati di ogni pagina: resta leggera, niente immagini.
 */
export default function NotFoundContent() {
  return (
    <section className="tono-sabbia grid min-h-[86svh] place-items-center pb-24 pt-40 text-center" aria-labelledby="nf-titolo">
      <div className="wrap flex flex-col items-center">
        <p className="meta entra">Errore 404</p>
        {/* BOZZA */}
        <h1 id="nf-titolo" className="display mt-6 entra" style={{ '--d': '0.08s' } as React.CSSProperties}>
          Questa pagina è <em>volata via</em>
        </h1>
        {/* BOZZA */}
        <p className="lead mx-auto mt-7 entra" style={{ '--d': '0.18s' } as React.CSSProperties}>
          Forse il link è cambiato, o la pagina non c&apos;è più. Ripartiamo da qui.
        </p>
        <div className="mt-10 entra" style={{ '--d': '0.28s' } as React.CSSProperties}>
          <Bottone href="/">Torna all&apos;inizio</Bottone>
        </div>
        <nav aria-label="Le sezioni" className="meta mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 entra" style={{ '--d': '0.36s' } as React.CSSProperties}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="link">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
