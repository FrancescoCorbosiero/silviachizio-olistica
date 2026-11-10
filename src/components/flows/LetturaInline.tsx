'use client';

// Da andrea-bellettati (src/components/flows/ConsultInline.tsx).
import FlowFor from './FlowFor';
import InlineCard from './InlineCard';

/**
 * "Richiedi una lettura" dentro la pagina /letture, nel contenitore
 * id="richiesta". Con le letture sospese mostra l'avviso di riapertura.
 */
export default function LetturaInline() {
  return <FlowFor kind="lettura" variant="inline">{(parts) => <InlineCard {...parts} />}</FlowFor>;
}
