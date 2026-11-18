import { DOMANDE } from '@/lib/domande';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Le domande frequenti: <details> nativi (si aprono anche senza
 * JavaScript, uno alla volta), che si aprono morbidi dove il browser lo sa
 * fare (::details-content). Il titolo resta fermo a sinistra mentre si legge.
 */
export default function Domande() {
  return (
    <section className="tono-sabbia section" aria-labelledby="faq-titolo">
      <div className="wrap grid gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="faq-titolo" className="titolo lg:sticky lg:top-32" data-split>
            Domande <em>frequenti</em>
          </h2>
        </div>
        <div className="faq lg:col-span-7 lg:col-start-6" data-reveal>
          {DOMANDE.map((d, i) => (
            <details key={d.q} name="domande">
              <summary>
                <span className="meta">{pad(i + 1)}</span>
                {d.q}
                <span className="voce-x" aria-hidden />
              </summary>
              <p className="risposta">{d.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
