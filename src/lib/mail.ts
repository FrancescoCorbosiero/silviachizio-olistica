import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

/**
 * Da andrea-bellettati (src/lib/mail.ts).
 * Email via AWS SES (v2). Tutto da variabili d'ambiente (vedi .env.example):
 *   AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY  (catena credenziali dell'SDK)
 *   SES_FROM            mittente VERIFICATO, es. "Lily Trattamenti Benessere <sito@<dominio>>"
 *   SES_TO_TRATTAMENTI  chi riceve "Prenota un trattamento" e gli avvisi sui trattamenti
 *   SES_TO_LETTURE      chi riceve "Richiedi una lettura" e gli avvisi sulle letture
 *                       (più indirizzi separati da virgola o punto e virgola)
 *   SES_CONFIGURATION_SET  facoltativo: metriche e rimbalzi in SES
 *   SES_DRY_RUN         "true": non invia, stampa l'email nei log (prove, staging)
 * Le caselle non hanno un valore di base: l'email di Silvia è ancora una
 * domanda aperta e il dominio non c'è. Senza mittente o senza casella la
 * richiesta risponde `unconfigured` e il sito offre il messaggio su
 * Instagram con il testo già pronto.
 */

export type MailResult = { ok: true } | { ok: false; reason: 'unconfigured' | 'send-failed' };
export type Casella = 'trattamenti' | 'letture';

type Config = { region: string; from: string; dryRun: boolean };

function config(): Config | null {
  const dryRun = process.env.SES_DRY_RUN === 'true';
  const region = process.env.AWS_REGION || (dryRun ? 'eu-west-1' : undefined);
  const from = process.env.SES_FROM || (dryRun ? 'Lily Trattamenti Benessere <sito@example.com>' : undefined);
  if (!region || !from) return null;
  return { region, from, dryRun };
}

const addresses = (raw: string) =>
  raw
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);

/** Le caselle di una richiesta (vuoto = non configurata). */
export function recipientsFor(caselle: readonly Casella[]): string[] {
  const all = caselle.flatMap((c) => addresses((c === 'trattamenti' ? process.env.SES_TO_TRATTAMENTI : process.env.SES_TO_LETTURE) ?? ''));
  return [...new Set(all)];
}

/** Mittente e regione ci sono (le caselle si controllano per ogni richiesta). */
export function isMailConfigured(): boolean {
  return config() !== null;
}

let client: SESv2Client | null = null;
const ses = (region: string) => (client ??= new SESv2Client({ region }));

export async function sendMail(msg: {
  to: string[];
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}): Promise<MailResult> {
  const cfg = config();
  if (!cfg || msg.to.length === 0) return { ok: false, reason: 'unconfigured' };
  const to = msg.to;
  if (cfg.dryRun) {
    console.info(
      `[mail] DRY RUN → ${to.join(', ')}${msg.replyTo ? ` (risposte a: ${msg.replyTo})` : ''} · ${msg.subject}\n${msg.text}\n[mail] (versione HTML: ${msg.html.length} caratteri)`,
    );
    return { ok: true };
  }
  try {
    await ses(cfg.region).send(
      new SendEmailCommand({
        FromEmailAddress: cfg.from,
        ConfigurationSetName: process.env.SES_CONFIGURATION_SET || undefined,
        Destination: { ToAddresses: to },
        ReplyToAddresses: msg.replyTo ? [msg.replyTo] : undefined,
        Content: {
          Simple: {
            Subject: { Data: msg.subject, Charset: 'UTF-8' },
            Body: { Text: { Data: msg.text, Charset: 'UTF-8' }, Html: { Data: msg.html, Charset: 'UTF-8' } },
          },
        },
      }),
    );
    return { ok: true };
  } catch (err) {
    console.error('[mail] invio fallito:', err);
    return { ok: false, reason: 'send-failed' };
  }
}
