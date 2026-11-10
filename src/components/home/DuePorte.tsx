import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';
import { IMMAGINI, type NomeImmagine } from '@/lib/immagini';
import { ZONA } from '@/lib/site';

const PORTE: { href: string; eyebrow: string; titolo: string; testo: string; vai: string; immagine: NomeImmagine }[] = [
  {
    href: '/trattamenti',
    eyebrow: 'In studio',
    titolo: `A ${ZONA.replace(' (TV)', '')}`,
    // BOZZA
    testo: 'Quattro trattamenti, da 60 a 75 minuti, e dopo ognuno un momento relax di circa quindici minuti.',
    vai: 'Il listino',
    immagine: 'montebelluna',
  },
  {
    href: '/letture',
    eyebrow: 'A distanza',
    titolo: 'Letture intuitive',
    // BOZZA (con le parole del form di Silvia)
    testo: 'Una lettura simbolica e intuitiva personalizzata: la foto della stesa e la mia interpretazione, scritta o video.',
    vai: 'Le letture',
    immagine: 'carte',
  },
];

/**
 * Le due porte: lo studio a Montebelluna e le letture a distanza. Due
 * pannelli alti, a tutta larghezza, con l'immagine che si avvicina al
 * passaggio; uno sopra l'altro sul telefono.
 */
export default function DuePorte() {
  return (
    <section className="grid md:grid-cols-2" aria-label="In studio o a distanza">
      {PORTE.map(({ href, eyebrow, titolo, testo, vai, immagine }) => {
        const img = IMMAGINI[immagine];
        return (
          <Link key={href} href={href} className="porta on-notte group">
            <span className="scena-fondo" aria-hidden>
              <picture data-parallax data-parallax-cover>
                <source media="(min-width: 768px)" srcSet={img.src} />
                <img src={img.srcVerticale} alt="" width={900} height={1500} loading="lazy" decoding="async" style={img.fuoco ? { objectPosition: img.fuoco } : undefined} />
              </picture>
            </span>
            <span className="scena-velo velo-basso" aria-hidden />
            <span className="relative flex flex-col items-start gap-4">
              <span className="eyebrow">{eyebrow}</span>
              <h2 className="display-lg">{titolo}</h2>
              <span className="lead block max-w-[26em]">{testo}</span>
              <span className="porta-vai">
                {vai} <ArrowIcon size={16} />
              </span>
            </span>
          </Link>
        );
      })}
    </section>
  );
}
