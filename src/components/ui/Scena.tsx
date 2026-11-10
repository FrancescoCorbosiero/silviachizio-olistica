import type { ReactNode } from 'react';
import { IMMAGINI, type NomeImmagine } from '@/lib/immagini';

type Velo = 'notte' | 'vino' | 'sinistra' | 'basso' | 'chiaro' | 'nessuno';

/** Un video di sfondo in due tagli (src/lib/immagini.ts, VIDEO_HERO). */
export type VideoSfondo = { mp4: string; webm: string; mp4V: string; webmV: string };

/**
 * La scena: una sezione a tutto schermo con l'immagine di fondo che scorre
 * più lenta della pagina (data-parallax-cover del motore). Il velo è un
 * gradiente che tiene leggibile il testo sopra. Senza JS o con "riduci
 * movimento" l'immagine resta ferma e la sezione è completa.
 *
 * Con `video`, sopra l'immagine (che ne è il primo fotogramma) il motore
 * fa partire il video dopo l'idratazione (video[data-video]); finché non
 * parte, o se non deve partire, resta l'immagine.
 *
 * L'immagine viene da src/lib/immagini.ts, in due tagli: verticale sul
 * telefono, orizzontale da 768px.
 */
export default function Scena({
  immagine,
  video,
  velo = 'sinistra',
  altezza = 'piena',
  className = '',
  contenuto = '',
  priorita = false,
  sopra,
  children,
  ...rest
}: {
  immagine: NomeImmagine;
  video?: VideoSfondo;
  velo?: Velo;
  /** piena: uno schermo intero; alta: quasi; media: una fascia generosa; bassa: una testata. */
  altezza?: 'piena' | 'alta' | 'media' | 'bassa';
  className?: string;
  /** Classi del contenitore del testo (allineamento, larghezza). */
  contenuto?: string;
  /** L'immagine del primo schermo: si carica subito. */
  priorita?: boolean;
  /** Ciò che sta sopra l'immagine ma fuori dal contenitore del testo (sigilli, segni d'anteprima). */
  sopra?: ReactNode;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const img = IMMAGINI[immagine];
  return (
    <section className={`scena scena-${altezza} on-notte ${className}`} {...rest}>
      <div className="scena-fondo" aria-hidden={img.alt ? undefined : true}>
        <div className="scena-strato" data-parallax data-parallax-cover>
          <picture>
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
          {video && (
            <video
              data-video
              data-mp4={video.mp4}
              data-webm={video.webm}
              data-mp4-v={video.mp4V}
              data-webm-v={video.webmV}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              tabIndex={-1}
              style={img.fuoco ? { objectPosition: img.fuoco } : undefined}
            />
          )}
        </div>
      </div>
      {velo !== 'nessuno' && <div className={`scena-velo velo-${velo}`} aria-hidden />}
      {sopra}
      <div className={`wrap relative z-[1] ${contenuto}`}>{children}</div>
    </section>
  );
}
