'use client';

// Da andrea-bellettati (src/components/flows/ConsultInline.tsx).
import { useState } from 'react';
import FlowFor from './FlowFor';
import { handoffFromSlug } from './handoff';
import InlineCard from './InlineCard';

/**
 * "Prenota un trattamento" dentro la pagina /prenota, nel contenitore
 * id="richiesta". Con `?trattamento=<slug>` nell'indirizzo ("Prenota
 * questo") arriva con il trattamento già scelto. Con le prenotazioni dei
 * trattamenti sospese mostra l'avviso di riapertura.
 */
export default function PrenotaInline() {
  // Letto una volta, nel browser: sul server non c'è indirizzo (la pagina è statica)
  // e il primo disegno non cambia, il trattamento entra nella bozza dopo.
  const [handoff] = useState(() =>
    typeof window === 'undefined' ? {} : handoffFromSlug(new URLSearchParams(window.location.search).get('trattamento')),
  );
  return (
    <FlowFor kind="prenota" variant="inline" handoff={handoff}>
      {(parts) => <InlineCard {...parts} />}
    </FlowFor>
  );
}
