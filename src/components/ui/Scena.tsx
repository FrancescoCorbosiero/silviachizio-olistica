import type { ReactNode } from 'react';
import { IMMAGINI, type NomeImmagine } from '@/lib/immagini';

type Velo = 'notte' | 'vino' | 'sinistra' | 'basso' | 'chiaro' | 'nessuno';

/**
 * La scena: una sezione a tutto schermo con l'immagine di fondo che scorre
 * più lenta della pagina (data-parallax-cover del motore). Il velo è un
 * gradiente che tiene leggibile il testo sopra. Senza JS o con "riduci
 * movimento" l'immagine resta ferma e la sezione è completa.
 *
 * L'immagine viene da src/lib/immagini.ts (oggi atmosfera, domani le foto
 * di Silvia), in due tagli: verticale sul telefono, orizzontale da 768px.
 */
export default function Scena({
  immagine,
  velo = 'sinistra',
  altezza = 'piena',
  className = '',
  contenuto = '',
  priorita = false,
  children,
  ...rest
}: {
  immagine: NomeImmagine;
  velo?: Velo;
  /** piena: uno schermo intero; alta: quasi; media: una fascia generosa. */
  altezza?: 'piena' | 'alta' | 'media';
  className?: string;
  /** Classi del contenitore del testo (allineamento, larghezza). */
  contenuto?: string;
  /** L'immagine del primo schermo: si carica subito. */
  priorita?: boolean;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const img = IMMAGINI[immagine];
  return (
    <section className={`scena scena-${altezza} on-notte ${className}`} {...rest}>
      <div className="scena-fondo" aria-hidden={img.alt ? undefined : true}>
        <picture data-parallax data-parallax-cover>
          <source media="(min-width: 768px)" srcSet={img.src} />
          <img
            src={img.srcVerticale}
            alt={img.alt}
            width={900}
            height={1500}
            loading={priorita ? 'eager' : 'lazy'}
            fetchPriority={priorita ? 'high' : undefined}
            decoding="async"
            style={img.fuoco ? { objectPosition: img.fuoco } : undefined}
          />
        </picture>
      </div>
      {velo !== 'nessuno' && <div className={`scena-velo velo-${velo}`} aria-hidden />}
      <div className={`wrap relative z-[1] ${contenuto}`}>{children}</div>
    </section>
  );
}
