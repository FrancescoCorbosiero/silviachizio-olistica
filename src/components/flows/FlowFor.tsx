'use client';

import type { ReactNode } from 'react';
import type { PrenotaDraft } from '@/lib/forms';
import { RICHIESTE } from '@/lib/richieste';
import AvvisamiFlow from './AvvisamiFlow';
import LetturaFlow from './LetturaFlow';
import PrenotaFlow from './PrenotaFlow';
import type { FlowParts } from './fields';
import type { Variant } from './useFlow';

/** Le due richieste che si aprono dai link del sito. */
export type FlowKind = 'prenota' | 'lettura';

/** Il nome del dialogo, per i lettori di schermo. */
export function flowLabel(kind: FlowKind): string {
  if (kind === 'prenota') return RICHIESTE.trattamenti.sospesa ? 'Avvisami quando riapro' : 'Prenota un trattamento';
  return RICHIESTE.letture.sospesa ? 'Avvisami quando riapro' : 'Richiedi una lettura';
}

/**
 * La richiesta giusta per un link: con le prenotazioni aperte il flusso,
 * con la richiesta sospesa (PRENOTAZIONI in site.ts) l'avviso di riapertura.
 */
export default function FlowFor({
  kind,
  variant,
  handoff,
  onClose,
  children,
}: {
  kind: FlowKind;
  variant: Variant;
  handoff?: Partial<PrenotaDraft>;
  onClose?: () => void;
  children: (parts: FlowParts) => ReactNode;
}) {
  if (kind === 'prenota') {
    return RICHIESTE.trattamenti.sospesa ? (
      <AvvisamiFlow variant={variant} tipo="trattamenti" onClose={onClose}>
        {children}
      </AvvisamiFlow>
    ) : (
      <PrenotaFlow variant={variant} handoff={handoff} onClose={onClose}>
        {children}
      </PrenotaFlow>
    );
  }
  return RICHIESTE.letture.sospesa ? (
    <AvvisamiFlow variant={variant} tipo="letture" onClose={onClose}>
      {children}
    </AvvisamiFlow>
  ) : (
    <LetturaFlow variant={variant} onClose={onClose}>
      {children}
    </LetturaFlow>
  );
}
