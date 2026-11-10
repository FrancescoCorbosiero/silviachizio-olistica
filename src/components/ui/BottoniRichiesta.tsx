import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';
import { etichetta, RICHIESTE, type TipoRichiesta } from '@/lib/richieste';

/**
 * Le due richieste, sempre a un tocco: "Prenota un trattamento" e
 * "Richiedi una lettura". Su telefono il link apre il flusso come foglio,
 * su desktop come pannello (AppProvider). Con una richiesta sospesa il suo
 * bottone diventa "Avvisami quando riapro…".
 */
export default function BottoniRichiesta({
  prima = 'trattamenti',
  tono = 'chiaro',
  size = 'lg',
  className = '',
}: {
  prima?: TipoRichiesta;
  tono?: 'chiaro' | 'notte';
  size?: 'md' | 'lg';
  className?: string;
}) {
  const ordine: TipoRichiesta[] = prima === 'trattamenti' ? ['trattamenti', 'letture'] : ['letture', 'trattamenti'];
  const principale = tono === 'notte' ? 'btn btn-latte' : 'btn';
  const secondario = tono === 'notte' ? 'btn btn-outline-latte' : 'btn btn-outline';
  const misura = size === 'lg' ? ' btn-lg' : '';
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {ordine.map((tipo, i) => (
        <Link key={tipo} className={`${i === 0 ? principale : secondario}${misura}`} href={RICHIESTE[tipo].href}>
          {etichetta(tipo, { contesto: true })}
          {i === 0 && <ArrowIcon size={16} />}
        </Link>
      ))}
    </div>
  );
}
