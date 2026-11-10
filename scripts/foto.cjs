/* =====================================================================
   Prepara una foto per le scene (src/lib/immagini.ts): due tagli in WebP,
   orizzontale 2000×1250 (desktop) e verticale 900×1500 (telefono), ognuno
   centrato sul suo punto di fuoco, con una gradazione appena calda.

     node scripts/foto.cjs sorgente.jpg nome --fuoco=0.5,0.4 [--fuoco-v=0.6,0.5] [--area=0,0,0.75,1] [--grana[=10]] [--qualita=74]

   --fuoco e --fuoco-v: il punto da tenere al centro del taglio, in
   frazioni della foto (0,0 in alto a sinistra). --area limita i tagli a una
   parte della foto (x0,y0,x1,y1, in frazioni): per lasciare fuori un bordo
   o una grafica sovrapposta. --qualita è quella del WebP (74 di solito; più
   bassa per le foto con la grana, che pesano). --grana aggiunge una grana
   fine: aiuta le foto piccole, che ingrandite sembrerebbero solo sfocate.
   Esce in public/foto/<nome>.webp e public/foto/<nome>-v.webp.
   Usa sharp, che arriva con Next.js (nessuna dipendenza in più).
   ===================================================================== */
const sharp = require('sharp');
const path = require('node:path');

const args = process.argv.slice(2);
const [src, nome] = args.filter((a) => !a.startsWith('--'));
const opt = (k, d) => {
  const a = args.find((x) => x.startsWith(`--${k}=`));
  return a ? a.split('=')[1].split(',').map(Number) : d;
};
if (!src || !nome) {
  console.error('Uso: node scripts/foto.cjs sorgente.jpg nome --fuoco=0.5,0.4 [--fuoco-v=0.5,0.5] [--grana]');
  process.exit(1);
}
const fuoco = opt('fuoco', [0.5, 0.5]);
const fuocoV = opt('fuoco-v', fuoco);
const area = opt('area', [0, 0, 1, 1]);
const granaArg = args.find((a) => a === '--grana' || a.startsWith('--grana='));
const grana = granaArg ? Number(granaArg.split('=')[1] ?? 10) : 0;
const qualita = opt('qualita', [74])[0];
const OUT = path.join(__dirname, '..', 'public', 'foto');

/** Il ritaglio più grande con le proporzioni giuste, centrato sul fuoco. */
function ritaglio(w, h, ratio, [fx, fy]) {
  let cw = w;
  let ch = Math.round(w / ratio);
  if (ch > h) {
    ch = h;
    cw = Math.round(h * ratio);
  }
  const left = Math.min(Math.max(0, Math.round(fx * w - cw / 2)), w - cw);
  const top = Math.min(Math.max(0, Math.round(fy * h - ch / 2)), h - ch);
  return { left, top, width: cw, height: ch };
}

async function taglio(meta, W, H, f, suffisso) {
  // L'area utile della foto, in pixel; il fuoco resta in frazioni della foto intera.
  const ax = Math.round(area[0] * meta.width);
  const ay = Math.round(area[1] * meta.height);
  const aw = Math.round((area[2] - area[0]) * meta.width);
  const ah = Math.round((area[3] - area[1]) * meta.height);
  const fa = [(f[0] * meta.width - ax) / aw, (f[1] * meta.height - ay) / ah];
  const r = ritaglio(aw, ah, W / H, fa);
  const box = { ...r, left: r.left + ax, top: r.top + ay };
  // Una foto piccola non guadagna nulla oltre i 1600 px: pesa e basta.
  if (box.width * 2 < W && W > 1600) {
    H = Math.round((H * 1600) / W);
    W = 1600;
  }
  let img = sharp(src)
    .extract(box)
    .resize(W, H, { kernel: 'lanczos3' })
    // Gradazione appena calda, come la luce dello studio.
    .linear([1.03, 1.0, 0.96], [3, 1, -2])
    .modulate({ saturation: 0.96 });
  if (box.width < W) img = img.sharpen({ sigma: 1.1, m1: 0.6, m2: 1.4 });
  let buf = await img.toBuffer();
  if (grana) {
    const rumore = await sharp({
      create: { width: W, height: H, channels: 3, background: { r: 128, g: 128, b: 128 }, noise: { type: 'gaussian', mean: 128, sigma: grana } },
    })
      .greyscale()
      .png()
      .toBuffer();
    buf = await sharp(buf).composite([{ input: rumore, blend: 'soft-light' }]).toBuffer();
  }
  const file = path.join(OUT, `${nome}${suffisso}.webp`);
  const info = await sharp(buf).webp({ quality: qualita, effort: 6 }).toFile(file);
  console.log(`${file}  ${W}×${H}  ${Math.round(info.size / 1024)} kB  (dal ritaglio ${box.width}×${box.height})`);
}

(async () => {
  const meta = await sharp(src).metadata();
  await taglio(meta, 2000, 1250, fuoco, '');
  await taglio(meta, 900, 1500, fuocoV, '-v');
})();
