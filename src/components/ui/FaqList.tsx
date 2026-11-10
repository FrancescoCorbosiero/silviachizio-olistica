/** Domande frequenti (da andrea-bellettati, FaqList.tsx): <details> nativi,
 *  si aprono anche senza JavaScript; il motore li apre e chiude morbidi
 *  (data-accordion). Solo domande con risposte vere. */
export default function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="border-t border-petalo/70" data-reveal>
      {items.map((f) => (
        <details key={f.q} className="faq group border-b border-petalo/70" data-accordion>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-0.5 py-5 font-serif text-[clamp(19px,2vw,23px)] font-bold leading-snug text-inchiostro transition-colors duration-300 hover:text-lily-deep [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <i
              aria-hidden
              className="faq-icona relative h-10 w-10 shrink-0 rounded-full bg-cipria transition-[rotate,background-color] duration-500 ease-[var(--ease-soft)] before:absolute before:left-1/2 before:top-1/2 before:h-[2px] before:w-[14px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded before:bg-lily-deep after:absolute after:left-1/2 after:top-1/2 after:h-[14px] after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded after:bg-lily-deep group-open:rotate-45 group-open:bg-petalo"
            />
          </summary>
          <div className="overflow-hidden" data-accordion-body>
            <p className="max-w-[62ch] px-0.5 pb-6 text-[17px] leading-relaxed text-ink-mute">{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
