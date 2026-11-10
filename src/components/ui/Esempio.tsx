/**
 * Il segno sui dati d'esempio dell'anteprima (src/lib/anteprima.ts):
 * piccolo, tratteggiato, dice cosa manca. Nella build di produzione i dati
 * d'esempio non ci sono, e con loro il segno.
 */
export default function Esempio({
  cosa,
  className = '',
  sopra = false,
}: {
  /** Cosa serve da Silvia, in due parole: «il prezzo», «le foto dello studio». */
  cosa?: string;
  className?: string;
  /** Sopra una foto: in alto a sinistra, su fondo scuro. */
  sopra?: boolean;
}) {
  return (
    <span
      className={`esempio ${sopra ? 'esempio-sopra' : ''} ${className}`}
      title={`Dato d'esempio dell'anteprima${cosa ? `: serve ${cosa}` : ''}. Nel sito online compare solo quello vero.`}
    >
      Esempio{cosa ? <span className="esempio-cosa"> · {cosa}</span> : null}
    </span>
  );
}
