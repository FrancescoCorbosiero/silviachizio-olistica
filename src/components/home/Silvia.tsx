import { FrecciaSu } from '@/components/icons';
import Bottone from '@/components/ui/Bottone';
import Esempio from '@/components/ui/Esempio';
import { RITRATTO } from '@/lib/anteprima';
import { IMMAGINI } from '@/lib/immagini';
import { IG_DM_URL, IG_HANDLE, IG_URL, OWNER_NAME, PASSIONI, SILVIA } from '@/lib/site';

/**
 * Chi sono: «Vivo e sorrido», la prima riga della bio di Silvia, le sue
 * parole (o, finché mancano, la bozza), le passioni della bio e Instagram.
 * Nell'arco la sua foto; finché manca, la luce dello studio (in anteprima
 * con il segno).
 */
export default function Silvia() {
  const ritratto = RITRATTO ?? { valore: 'luceSpecchio' as const, esempio: false };
  const img = IMMAGINI[ritratto.valore];
  return (
    <section id="chi-sono" className="tono-sabbia section" aria-labelledby="chi-titolo">
      <div className="wrap grid items-center gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="arco mx-auto aspect-[3/4] w-[min(100%,460px)]" data-clip="arco">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="plx" data-parallax="40" src={img.srcVerticale} alt={ritratto.esempio ? '' : img.alt} width={900} height={1500} loading="lazy" decoding="async" />
            {ritratto.esempio && <Esempio sopra cosa="una foto di Silvia" />}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="chi-titolo" className="titolo" data-split>
            <em>Vivo e sorrido</em>
          </h2>
          {/* BOZZA */}
          <p className="meta mt-5">{OWNER_NAME} · la prima riga della mia bio</p>
          <div className="lead mt-9 grid gap-4">
            {SILVIA.storia.length ? (
              SILVIA.storia.map((p) => <p key={p}>{p}</p>)
            ) : (
              // BOZZA
              <p>
                Ed è così che lavoro. Mi trovi su una parete di roccia, in viaggio o con una matita in mano; nello studio porto la
                stessa energia, e un po&apos; di magia.
              </p>
            )}
          </div>
          <ul className="passioni corsivo mt-9" aria-label="Le cose che amo" data-reveal>
            {PASSIONI.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4" data-reveal>
            <Bottone href={IG_URL} variante="linea">
              Seguimi su Instagram
            </Bottone>
            <a className="link" href={IG_DM_URL} target="_blank" rel="noopener">
              Scrivimi un messaggio <span className="meta !text-[inherit]">{IG_HANDLE}</span> <FrecciaSu />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
