import JsonLd from '@/components/seo/JsonLd';
import { faqLd } from '@/lib/seo';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Le domande frequenti: <details> nativi (si aprono anche senza
 * JavaScript, uno alla volta), che si aprono morbidi dove il browser lo sa
 * fare (::details-content). Il titolo resta fermo a sinistra mentre si
 * legge. Porta con sé i dati strutturati FAQPage. Solo risposte vere.
 */
export default function Domande({
  items,
  id = 'faq-titolo',
  titolo = (
    <>
      Domande <em>frequenti</em>
    </>
  ),
  tono = 'tono-sabbia',
}: {
  items: readonly { q: string; a: string }[];
  id?: string;
  titolo?: React.ReactNode;
  tono?: string;
}) {
  return (
    <section className={`${tono} section`} aria-labelledby={id}>
      <div className="wrap grid gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id={id} className="titolo lg:sticky lg:top-32" data-split>
            {titolo}
          </h2>
        </div>
        <div className="faq lg:col-span-7 lg:col-start-6" data-reveal>
          {items.map((d, i) => (
            <details key={d.q} name={id}>
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
      <JsonLd data={faqLd(items)} />
    </section>
  );
}
