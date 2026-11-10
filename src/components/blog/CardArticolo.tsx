import Link from 'next/link';
import Esempio from '@/components/ui/Esempio';
import { TONO_TEMA, type SchedaArticolo } from '@/lib/blog-temi';
import { IMMAGINI } from '@/lib/immagini';

/**
 * La card di un articolo: la copertina (il taglio verticale, leggero),
 * il tema col suo punto di colore, il titolo, l'estratto, data e minuti.
 * `grande` per l'articolo in evidenza: su desktop l'arco a sinistra e il
 * testo a destra. Va bene sia nei Server Component sia nel filtro client.
 */
export default function CardArticolo({
  articolo: a,
  livello: Titolo = 'h3',
  grande = false,
}: {
  articolo: SchedaArticolo;
  livello?: 'h2' | 'h3';
  grande?: boolean;
}) {
  const img = IMMAGINI[a.copertina];
  return (
    <Link href={`/blog/${a.slug}`} className={`card-articolo ${grande ? 'card-articolo-grande' : ''}`}>
      <span className="card-articolo-foto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.srcVerticale} alt="" width={900} height={1500} loading="lazy" decoding="async" />
        {a.esempio && <Esempio sopra cosa="articolo di prova" />}
      </span>
      <span className="card-articolo-testo">
        <span className="card-articolo-tema" style={{ '--tono': TONO_TEMA[a.tema] } as React.CSSProperties}>
          {a.tema}
        </span>
        <Titolo className="card-articolo-titolo">{a.titolo}</Titolo>
        <span className="card-articolo-estratto">{a.estratto}</span>
        <span className="card-articolo-meta">
          {a.quando} · {a.minuti} min di lettura
        </span>
      </span>
    </Link>
  );
}
