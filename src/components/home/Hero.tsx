import { IMMAGINI, VIDEO_HERO } from '@/lib/immagini';
import { OWNER_NAME, ZONA } from '@/lib/site';

const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;

/** Il testo della hero: lo stesso due volte, scuro sul muro e chiaro nella finestra. */
function Testo({ chiaro = false }: { chiaro?: boolean }) {
  const H = chiaro ? 'p' : 'h1';
  return (
    <div className={`hero-testo ${chiaro ? 'hero-testo-chiaro' : 'hero-testo-scuro'}`} aria-hidden={chiaro || undefined}>
      <p className="hero-firma meta entra">
        {OWNER_NAME} · {ZONA}
      </p>
      {/* BOZZA */}
      <H id={chiaro ? undefined : 'hero-titolo'} className="display entra" style={d(0.08)}>
        Massaggi e rituali <em>olistici</em>
      </H>
      {/* Le parole del listino di Silvia, e le letture. */}
      <p className="hero-sotto corsivo entra" style={d(0.2)}>
        <span>Quattro esperienze di benessere</span>
        <span className="hero-punto"> · </span>
        <span>Letture a distanza</span>
      </p>
    </div>
  );
}

/**
 * La hero: la finestra ad arco. In cima, sul muro sabbia, il titolo; sotto,
 * una finestra ad arco con la luce del pomeriggio e le ombre dei gigli che
 * si muovono (il video; il primo fotogramma è l'immagine). Scorrendo la
 * finestra si apre fino a riempire lo schermo: il titolo, che la finestra
 * attraversa, passa dall'inchiostro alla luce lettera per lettera, e in
 * fondo arriva Silvia che si presenta. Poi il listino sale sopra, come un
 * foglio. Come e perché: globals.css, «La hero: la finestra ad arco».
 *
 * Senza JavaScript o con "riduci movimento" la finestra è già aperta: una
 * hero a tutto schermo, ferma e completa.
 */
export default function Hero() {
  const poster = IMMAGINI.heroVideo;
  return (
    <section id="inizio" className="hero" data-hero aria-labelledby="hero-titolo">
      <div className="hero-palco">
        <Testo />
        <div className="hero-finestra">
          <div className="hero-media" aria-hidden>
            <picture>
              <source media="(min-width: 768px)" srcSet={poster.src} />
              <img src={poster.srcVerticale} alt="" width={720} height={1280} fetchPriority="high" decoding="async" />
            </picture>
            <video
              data-video
              data-mp4={VIDEO_HERO.mp4}
              data-webm={VIDEO_HERO.webm}
              data-mp4-v={VIDEO_HERO.mp4V}
              data-webm-v={VIDEO_HERO.webmV}
              muted
              loop
              playsInline
              preload="none"
              tabIndex={-1}
            />
          </div>
          <div className="hero-velo" aria-hidden />
          <Testo chiaro />
          <div className="hero-piede">
            {/* BOZZA */}
            <p className="corsivo">
              Sono Silvia: ti aspetto nel mio studio a Montebelluna per un massaggio o un rituale. E, a distanza, preparo letture
              intuitive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
