import type { FlowParts } from './fields';

/**
 * La scheda di una richiesta in pagina: un petalo latte con testata, corpo
 * e barra delle azioni. L'id "richiesta" è l'ancora dei link
 * (/prenota#richiesta, /letture#richiesta).
 */
export default function InlineCard({ header, body, footer }: FlowParts) {
  return (
    <div id="richiesta" data-flow-root className="petalo k-ios scroll-mt-24 overflow-hidden !rounded-[28px] !bg-latte/95">
      <div className="pt-3">{header}</div>
      {body}
      <div className="[&>div]:!bg-transparent [&>div]:!pb-5 [&>div]:!backdrop-blur-none">{footer}</div>
    </div>
  );
}
