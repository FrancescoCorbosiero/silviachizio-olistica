import Link from 'next/link';
import { IconaOrologio, IconaTrattamentoSvg } from '@/components/icons';
import { RELAX_MINUTI, RELAX_TESTO, TRATTAMENTI, type Trattamento } from '@/lib/trattamenti';

/**
 * La riga del listino, il componente simbolo (docs/brand.md): cerchio con
 * l'icona · nome e descrizione · filetto verticale · orologio e durata.
 * Con `href` la riga è un link (home → la sezione di /trattamenti).
 */
export function RigaListino({ trattamento: t, href, headingLevel }: { trattamento: Trattamento; href?: string; headingLevel?: 'h2' | 'h3' }) {
  const Nome = headingLevel ?? 'span';
  const corpo = (
    <>
      <span className="cerchio" data-pop>
        <IconaTrattamentoSvg icona={t.icona} />
      </span>
      <span className="min-w-0">
        <Nome className="riga-nome">{t.nome}</Nome>
        <span className="riga-breve">{t.breve}</span>
      </span>
      <span className="riga-durata">
        <IconaOrologio />
        <span>
          {t.durata} min<span className="sr-only"> di trattamento</span>
        </span>
      </span>
    </>
  );
  return href ? (
    <Link href={href} className="riga-listino">
      {corpo}
    </Link>
  ) : (
    <div className="riga-listino">{corpo}</div>
  );
}

/** «Momento relax post-trattamento incluso • circa 15 minuti» */
export function FasciaRelax({ className = '' }: { className?: string }) {
  return (
    <p className={`fascia-relax ${className}`}>
      <span>{RELAX_TESTO}</span>
      <span className="punto" aria-hidden>
        •
      </span>
      <span>circa {RELAX_MINUTI} minuti</span>
    </p>
  );
}

/** Il listino intero, come nell'immagine di Silvia: le quattro righe e la fascia del relax. */
export default function Listino({ linkSezioni = false, className = '' }: { linkSezioni?: boolean; className?: string }) {
  return (
    <div className={className}>
      <div className="listino">
        {TRATTAMENTI.map((t) => (
          <RigaListino key={t.slug} trattamento={t} href={linkSezioni ? `/trattamenti#${t.slug}` : undefined} />
        ))}
      </div>
      <FasciaRelax className="mt-5" />
    </div>
  );
}
