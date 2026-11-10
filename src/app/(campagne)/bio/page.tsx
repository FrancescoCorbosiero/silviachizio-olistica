import Link from 'next/link';
import { RigaListino, FasciaRelax } from '@/components/brand/Listino';
import { ArrowIcon, InstagramIcon } from '@/components/icons';
import { etichetta, RICHIESTE, rigaSospensione } from '@/lib/richieste';
import { pageMetadata } from '@/lib/seo';
import { IG_HANDLE, IG_URL, ZONA } from '@/lib/site';
import { TRATTAMENTI } from '@/lib/trattamenti';

export const metadata = pageMetadata({
  title: 'Prenota o richiedi una lettura',
  // BOZZA
  description: `Lily Trattamenti Benessere a ${ZONA}: prenota un trattamento o richiedi una lettura intuitiva personalizzata.`,
  path: '/bio',
  noindex: true,
});

/**
 * La pagina del link in bio di Instagram, al posto del Google Form
 * (docs/spec.md, "Link in bio"): niente menu né barra in basso, il logo,
 * una riga, le due richieste come grandi bottoni (si aprono come fogli).
 * Sotto, i quattro trattamenti in breve, il sito e Instagram. Deve essere
 * la pagina più veloce: niente foto pesanti, poco intorno.
 * Il link da mettere su Instagram: BIO_HREF in src/lib/site.ts.
 */
export default function BioPage() {
  const sospese = (['trattamenti', 'letture'] as const).filter((t) => RICHIESTE[t].sospesa);
  return (
    <>
      <section className="relative isolate overflow-x-clip pb-10 pt-2" aria-labelledby="bio-titolo">
        <div className="alone left-1/2 top-[30%] w-[min(560px,130vw)] -translate-x-1/2 -translate-y-1/2" aria-hidden />
        <div className="wrap-narrow flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo.svg"
            alt="Lily Trattamenti Benessere"
            width={244}
            height={252}
            fetchPriority="high"
            className="intro-fade h-auto w-[min(200px,52vw)]"
          />
          <h1 id="bio-titolo" className="sr-only">
            Lily Trattamenti Benessere: prenota un trattamento o richiedi una lettura
          </h1>
          {/* BOZZA */}
          <p className="lead intro mt-5 max-w-[24em]" style={{ '--d': '0.1s' } as React.CSSProperties}>
            Sono Silvia: trattamenti benessere in studio a {ZONA} e letture intuitive a distanza.
          </p>
          <div className="intro mt-7 flex w-full max-w-[420px] flex-col gap-3" style={{ '--d': '0.2s' } as React.CSSProperties}>
            <Link className="btn btn-lg btn-block" href={RICHIESTE.trattamenti.href}>
              {etichetta('trattamenti', { contesto: true })} <ArrowIcon size={16} />
            </Link>
            <Link className="btn btn-outline btn-lg btn-block" href={RICHIESTE.letture.href}>
              {etichetta('letture', { contesto: true })}
            </Link>
          </div>
          {sospese.map((t) => (
            <p key={t} className="testo-mute mt-4 max-w-[30em] text-[15px]">
              {rigaSospensione(t)}
            </p>
          ))}
        </div>
      </section>

      <section className="pb-12" aria-labelledby="bio-listino">
        <div className="wrap-narrow">
          <h2 id="bio-listino" className="text-center">
            <span className="pennellata text-[19px]">Quattro esperienze di benessere</span>
          </h2>
          <div className="petalo mt-6 px-4 py-2 sm:px-6">
            <div className="listino">
              {TRATTAMENTI.map((t) => (
                <RigaListino key={t.slug} trattamento={t} href={`/trattamenti#${t.slug}`} />
              ))}
            </div>
          </div>
          <FasciaRelax className="mt-4" />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link className="btn btn-outline btn-sm" href="/">
              Il sito di Lily
            </Link>
            <a className="btn btn-outline btn-sm" href={IG_URL} target="_blank" rel="noopener">
              <InstagramIcon size={16} /> {IG_HANDLE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
