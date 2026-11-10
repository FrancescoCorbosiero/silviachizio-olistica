import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';
import SectionHead from '@/components/ui/SectionHead';
import { IMMAGINI } from '@/lib/immagini';

/**
 * Chi sono, in breve, su fondo vino: «Vivo e sorrido» (la prima riga della
 * bio di Silvia), due righe e il link a /chi-sono. Nell'arco, finché non
 * c'è la sua foto, la luce dello studio (src/lib/immagini.ts); al tocco,
 * un battito e qualche cuore (data-love).
 */
export default function ChiSonoBreve() {
  return (
    <section className="section fondo-vino on-notte" aria-labelledby="chi-titolo">
      <div className="wrap grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="mx-auto w-[min(360px,80%)]" data-reveal>
          <div className="foto-arco aspect-[3/4]" data-clip data-love>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMMAGINI.luceSpecchio.srcVerticale} alt={IMMAGINI.luceSpecchio.alt} width={900} height={1500} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-6">
          <SectionHead id="chi-titolo" eyebrow="Chi sono" title="Vivo e" script="sorrido" />
          {/* BOZZA */}
          <p className="lead misura">
            È la prima riga della mia bio, ed è così che lavoro. Mi trovi su una parete di roccia, in viaggio o con una matita
            in mano; nello studio porto la stessa energia, e un po&apos; di magia.
          </p>
          <Link className="text-link" href="/chi-sono">
            La mia storia <ArrowIcon size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
