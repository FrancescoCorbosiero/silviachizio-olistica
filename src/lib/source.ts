/* =====================================================================
   Da andrea-bellettati (src/lib/source.ts).
   Da dove arriva una richiesta: la pagina da cui parte e, se la visita è
   partita da una campagna (il link in bio ha utm_source=instagram), i suoi
   parametri utm_*, il clic da Google Ads o Meta e il sito di provenienza.
   Va solo nell'email a Silvia, per sapere da dove arrivano le richieste.
   Niente cookie: resta nella scheda del browser (sessionStorage) e
   sparisce chiudendola.
   ===================================================================== */

const KEY = 'lily:arrivo';
const UTM = ['source', 'medium', 'campaign', 'content', 'term'] as const;

type Arrival = { path: string; utm: string; click: string; ref: string };

/** Alla prima pagina della visita: dove si è entrati e con quale campagna. */
export function rememberArrival(): void {
  try {
    if (window.sessionStorage.getItem(KEY)) return;
    const url = new URL(window.location.href);
    const utm = UTM.map((k) => [k, url.searchParams.get(`utm_${k}`)?.trim()] as const)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}=${v}`)
      .join(', ');
    const click = url.searchParams.has('gclid') ? 'Google Ads' : url.searchParams.has('fbclid') ? 'Meta' : '';
    let ref = '';
    if (document.referrer) {
      const host = new URL(document.referrer).hostname;
      if (host !== url.hostname) ref = host.replace(/^www\./, '');
    }
    const arrival: Arrival = { path: url.pathname, utm, click, ref };
    window.sessionStorage.setItem(KEY, JSON.stringify(arrival));
  } catch {
    /* modalità privata o URL strano: la provenienza resta solo la pagina */
  }
}

/** "/bio · campagna: source=instagram, medium=bio · arrivata da instagram.com". */
export function describeSource(): string {
  const parts = [window.location.pathname];
  try {
    const raw = window.sessionStorage.getItem(KEY);
    const a = raw ? (JSON.parse(raw) as Partial<Arrival>) : null;
    if (a) {
      if (a.utm) parts.push(`campagna: ${a.utm}`);
      if (a.click) parts.push(`clic da ${a.click}`);
      if (a.path && a.path !== window.location.pathname) parts.push(`entrata da ${a.path}`);
      if (a.ref) parts.push(`arrivata da ${a.ref}`);
    }
  } catch {
    /* niente provenienza salvata */
  }
  return parts.join(' · ').slice(0, 300);
}
