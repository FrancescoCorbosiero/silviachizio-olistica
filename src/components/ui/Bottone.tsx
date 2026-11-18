import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Freccia, FrecciaSu } from '@/components/icons';
import { etichetta, linkRichiesta, type TipoRichiesta } from '@/lib/richieste';

type Variante = 'lily' | 'vino' | 'latte' | 'linea' | 'vetro';

/**
 * Il bottone del sito: una pillola con l'etichetta che scorre al passaggio
 * (scritta due volte, la seconda nascosta ai lettori di schermo) e la
 * freccia in un tondo. La freccia dice dove si va: → resta nel sito, ↗
 * apre un'altra scheda (il modulo Google, Instagram). Gli indirizzi
 * esterni si aprono da soli in un'altra scheda.
 */
export default function Bottone({
  href,
  children,
  variante = 'lily',
  piccolo = false,
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  variante?: Variante;
  piccolo?: boolean;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>) {
  const esterno = /^https?:\/\//.test(href);
  const cls = `btn ${variante === 'lily' ? '' : `btn-${variante}`} ${piccolo ? 'btn-sm' : ''} ${className}`;
  const dentro = (
    <>
      <span className="btn-label">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
      <span className="btn-chip" aria-hidden>
        {esterno ? <FrecciaSu /> : <Freccia />}
      </span>
    </>
  );
  if (esterno) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls} {...rest}>
        {dentro}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {dentro}
    </Link>
  );
}

/**
 * Il bottone di una richiesta: «Prenota un trattamento» o «Richiedi una
 * lettura». Dove porta lo decide src/lib/richieste.ts (il modulo Google
 * oggi, i flussi del sito domani).
 */
export function BottoneRichiesta({
  tipo,
  breve = false,
  ...rest
}: { tipo: TipoRichiesta; breve?: boolean; variante?: Variante; piccolo?: boolean; className?: string }) {
  const { href } = linkRichiesta(tipo);
  return (
    <Bottone href={href} {...rest}>
      {etichetta(tipo, { breve, contesto: !breve })}
    </Bottone>
  );
}
