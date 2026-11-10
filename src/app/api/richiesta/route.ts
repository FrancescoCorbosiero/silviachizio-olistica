// Da andrea-bellettati (src/app/api/richiesta/route.ts).
import { NextResponse } from 'next/server';
import { requestSchema, type RequestPayload } from '@/lib/forms';
import {
  avvisamiConfirmation,
  avvisamiToSilvia,
  letturaConfirmation,
  letturaToSilvia,
  prenotaConfirmation,
  prenotaToSilvia,
} from '@/lib/emails';
import { isMailConfigured, recipientsFor, sendMail, type Casella } from '@/lib/mail';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { LETTURA } from '@/lib/trattamenti';

/* Manda email vere: gira sul server Node, mai in cache. */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Una persona impiega almeno qualche secondo a compilare: sotto, è un bot. */
const MIN_ELAPSED_MS = 2500;

/** Una riga di log per ogni richiesta rifiutata, solo il motivo (niente dati personali). */
const refused = (reason: string) => console.warn(`[richiesta] rifiutata: ${reason}`);

/** Le caselle di Silvia che ricevono una richiesta. */
function caselleOf(p: RequestPayload): Casella[] {
  if (p.kind === 'trattamento') return ['trattamenti'];
  if (p.kind === 'lettura') return ['letture'];
  return p.interessi;
}

/** Le due email di una richiesta: a Silvia e, se c'è un indirizzo, la conferma. */
function emailsOf(p: RequestPayload) {
  if (p.kind === 'trattamento') return { toSilvia: prenotaToSilvia(p), confirmation: p.email ? prenotaConfirmation(p) : null, to: p.email };
  if (p.kind === 'lettura') return { toSilvia: letturaToSilvia(p), confirmation: letturaConfirmation(p), to: p.email };
  return { toSilvia: avvisamiToSilvia(p), confirmation: avvisamiConfirmation(p), to: p.email };
}

/**
 * Diagnostica: GET /api/richiesta dice se l'invio email è configurato e
 * quali caselle ci sono (nessun segreto, nessun indirizzo).
 */
export function GET() {
  return NextResponse.json({
    mailConfigured: isMailConfigured(),
    caselle: { trattamenti: recipientsFor(['trattamenti']).length > 0, letture: recipientsFor(['letture']).length > 0 },
  });
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit(`richiesta:${ip}`);
  if (!limit.ok) {
    refused('troppe richieste');
    return NextResponse.json({ ok: false, error: 'rate-limited' }, { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } });
  }

  let data: Record<string, unknown>;
  try {
    data = ((await req.json()) ?? {}) as Record<string, unknown>;
  } catch {
    refused('json non valido');
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  // Trappole per i bot: si finge successo, non si manda niente.
  if (typeof data.company === 'string' && data.company.trim() !== '') {
    refused('campo trappola compilato');
    return NextResponse.json({ ok: true });
  }
  if (typeof data.elapsedMs === 'number' && data.elapsedMs < MIN_ELAPSED_MS) {
    refused('compilato troppo in fretta');
    return NextResponse.json({ ok: true });
  }

  const parsed = requestSchema.safeParse(data);
  if (!parsed.success) {
    refused('dati non validi');
    return NextResponse.json({ ok: false, error: 'invalid-payload' }, { status: 422 });
  }
  const p = parsed.data;
  // Il formato della lettura si chiede solo se Silvia lascia scegliere.
  if (p.kind === 'lettura' && !LETTURA.formatoAScelta) p.formato = '';

  const box = recipientsFor(caselleOf(p));
  if (!isMailConfigured() || box.length === 0) {
    refused('email non configurata (variabili SES o caselle mancanti)');
    return NextResponse.json({ ok: false, error: 'unconfigured' }, { status: 503 });
  }

  const { toSilvia, confirmation, to } = emailsOf(p);
  const result = await sendMail({ ...toSilvia, to: box });
  if (!result.ok) {
    refused(`invio fallito: ${result.reason}`);
    return NextResponse.json({ ok: false, error: result.reason }, { status: result.reason === 'unconfigured' ? 503 : 502 });
  }

  // Conferma a chi ha scritto: best effort, non fa fallire la richiesta. Se
  // risponde alla conferma, la risposta torna alla casella giusta.
  if (confirmation && to) {
    await sendMail({ ...confirmation, to: [to], replyTo: box[0] });
  }

  return NextResponse.json({ ok: true });
}
