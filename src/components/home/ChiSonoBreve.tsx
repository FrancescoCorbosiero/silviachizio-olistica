import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';
import SectionHead from '@/components/ui/SectionHead';

/**
 * Chi sono, in breve: «Vivo e sorrido» (la prima riga della bio di Silvia),
 * due righe e il link a /chi-sono. Finché non c'è la sua foto, nel cerchio
 * c'è il giglio; i cuori al tocco (data-love) valgono per entrambi.
 */
export default function ChiSonoBreve() {
  return (
    <section className="section" aria-labelledby="chi-titolo">
      <div className="wrap grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="mx-auto w-[min(340px,78%)]" data-reveal>
          <div className="foto-cerchio foto-vuota aspect-square shadow-[var(--shadow-petalo-l)]" data-love data-clip>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/giglio.svg" alt="" width={240} height={180} loading="lazy" decoding="async" className="h-auto w-[78%]" />
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
