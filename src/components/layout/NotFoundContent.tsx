import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';
import Scena from '@/components/ui/Scena';

/**
 * Il contenuto della 404 (da andrea-bellettati, NotFoundContent.tsx): una
 * scena con i petali fuori fuoco, una riga gentile, i link alle pagine
 * principali. Next mette la 404 nei dati di ogni pagina: deve restare
 * leggera, quindi l'immagine si carica solo quando la 404 c'è davvero
 * (loading="lazy", niente precaricamento).
 */
export default function NotFoundContent() {
  return (
    <Scena immagine="velo" altezza="alta" velo="vino" aria-labelledby="nf-titolo">
      <div className="flex max-w-[680px] flex-col items-start gap-6">
        <span className="eyebrow intro">Errore 404</span>
        {/* BOZZA */}
        <h1 id="nf-titolo" className="display-xl intro" style={{ '--d': '0.1s' } as React.CSSProperties}>
          Questa pagina è <span className="script">volata</span> via
        </h1>
        {/* BOZZA */}
        <p className="lead misura intro" style={{ '--d': '0.25s' } as React.CSSProperties}>
          Forse il link è cambiato, o la pagina non c&apos;è più. Ripartiamo da qui.
        </p>
        <div className="intro flex flex-wrap gap-3" style={{ '--d': '0.4s' } as React.CSSProperties}>
          <Link className="btn btn-latte btn-lg" href="/">
            Torna alla home <ArrowIcon size={16} />
          </Link>
          <Link className="btn btn-outline-latte btn-lg" href="/trattamenti">
            Trattamenti
          </Link>
          <Link className="btn btn-outline-latte btn-lg" href="/letture">
            Letture
          </Link>
        </div>
      </div>
    </Scena>
  );
}
