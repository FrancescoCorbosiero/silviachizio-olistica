import SectionHead from '@/components/ui/SectionHead';
import SchedaInstagram from '@/components/ui/SchedaInstagram';

/** Instagram: la scheda statica del profilo (niente embed). */
export default function InstagramHome() {
  return (
    <section className="section-tight" aria-labelledby="ig-titolo">
      <div className="wrap grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <SectionHead
          id="ig-titolo"
          eyebrow="Su Instagram"
          // BOZZA
          title="Ogni giorno, un pezzetto della mia"
          script="vita"
          lead="Trattamenti, viaggi, arrampicate e un po' di magia: è lì che racconto Lily, ed è lì che puoi scrivermi."
        />
        <SchedaInstagram />
      </div>
    </section>
  );
}
