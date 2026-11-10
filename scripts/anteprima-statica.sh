#!/bin/bash
# =====================================================================
# Anteprima statica del sito, per un hosting senza server (Netlify Drop:
# app.netlify.com/drop). Il deploy vero resta Docker + Caddy (README).
#
#   bash scripts/anteprima-statica.sh                  → anteprima-netlify/ e .zip
#   NEXT_PUBLIC_SITE_URL=https://xyz.netlify.app bash scripts/anteprima-statica.sh
#
# Costruisce senza src/app/api (un sito statico non ha server): le richieste non partono e mostrano il ripiego (testo da
# copiare e Instagram). Su Netlify si trascina la cartella anteprima-netlify
# (contiene index.html), non public/.
# =====================================================================
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
# L'API non c'è in un sito statico: si sposta fuori da src/app per la build
# e si rimette al suo posto alla fine, anche se la build fallisce.
PARK="$ROOT/.api-in-pausa"
mv src/app/api "$PARK"
trap 'mv "$PARK" src/app/api' EXIT
# I tipi generati da next dev citano ancora l'API: si rigenerano da soli.
rm -rf .next/dev/types
ANTEPRIMA_STATICA=1 NEXT_TELEMETRY_DISABLED=1 npx next build
rm -rf anteprima-netlify anteprima-netlify.zip
mv out anteprima-netlify
# Netlify: /bio → bio.html anche se accanto c'è la cartella bio/ (dati RSC).
for f in anteprima-netlify/*.html; do
  n="$(basename "$f" .html)"
  case "$n" in index|404|_not-found) continue ;; esac
  echo "/$n  /$n.html  200"
done > anteprima-netlify/_redirects
(cd anteprima-netlify && zip -qr ../anteprima-netlify.zip .)
echo "Pronta: anteprima-netlify/ (da trascinare su app.netlify.com/drop) e anteprima-netlify.zip"
echo "Dopo l'anteprima, npm run build rifà la build normale (standalone)."
