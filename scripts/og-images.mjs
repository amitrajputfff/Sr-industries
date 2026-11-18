// Link-preview images (Open Graph, 1200 x 630) for sharing on WhatsApp, LinkedIn, X and so on.
// Writes public/og/home.jpg and public/og/products/<slug>.jpg from the real product photos.
// Run from the repo root: node --experimental-strip-types scripts/og-images.mjs
// Needs puppeteer-core and a local Chrome (CHROME_PATH overrides the macOS default).
import puppeteer from 'puppeteer-core';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';

const { PRODUCTS } = await import(resolve('src/lib/data.ts'));
const PUB = resolve('public');
const SITE = 'srindustries.info';
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const CATEGORY = {
  knobs: 'Gas stove knobs',
  'dial-plates': 'Dial plates',
  legs: 'Stove legs',
  'coupler-pins': 'Couplers and pins',
  'auto-safety': 'Auto and safety parts',
};
const photo = (src) => src.startsWith('/Royal-series/') || src.startsWith('/Euro-series/');
const studio = (src) => (photo(src) ? src : '/parts' + src.replace(/\.png$/, '.webp'));
const file = (src) => 'file://' + PUB + src;
const fmt = (n) => n.toFixed(2);
function price(p) {
  if (p.priceRange) return `₹${p.priceRange.min}–${p.priceRange.max}`;
  const ps = (p.colorVariants ?? []).map((v) => v.price).filter((x) => x !== undefined);
  if (ps.length) {
    const lo = Math.min(...ps), hi = Math.max(...ps);
    return lo === hi ? `₹${fmt(lo)}` : `₹${fmt(lo)}–${fmt(hi)}`;
  }
  return p.price !== undefined ? `₹${fmt(p.price)}` : null;
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const CSS = `
:root { --bg:#f7f5f0; --tile:#fff; --line:#e3dfd6; --ink:#211d19; --ink-2:#4f4943; --muted:#7a736b; --accent:#c4302b; }
* { margin:0; box-sizing:border-box; }
html, body { width:1200px; height:630px; background:var(--bg); color:var(--ink); font-family:Geist, system-ui, sans-serif; overflow:hidden; }
.card { position:relative; width:1200px; height:630px; display:grid; grid-template-rows:518px; padding:56px 60px; }
.brand { display:flex; align-items:center; gap:14px; font-size:26px; font-weight:600; letter-spacing:-0.01em; }
.brand img { height:46px; width:auto; }
h1 { font-family:Fraunces, Georgia, serif; font-weight:500; letter-spacing:-0.03em; line-height:1.0; }
.site { font-size:22px; font-weight:500; color:var(--accent); }
.tile { position:relative; min-height:0; background:var(--tile); border-radius:18px; box-shadow:inset 0 0 0 1px var(--line); overflow:hidden; }
.tile img { position:absolute; inset:0; width:100%; height:100%; object-fit:contain; }
.tile.photo img { object-fit:cover; }
`;

const page = (body) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Geist:wght@400;500;600&family=Geist+Mono&display=block" rel="stylesheet">
<style>${CSS}</style></head><body>${body}</body></html>`;

function home() {
  // one real part from each family, cleanest photos first
  const pick = ['/VGuard-Series/V-GuardSeries-Black.png', '/MetalPrima-Series/MetalPrimaSeries-Golden.png',
    '/DialPlate-Series/DialPlateSeries-GTM.png', '/LegSeries/LegSeries-PVC-LS20.png'];
  const tiles = pick.map((s) => `<div class="tile"><img src="${file(studio(s))}"></div>`).join('');
  return page(`<div class="card" style="grid-template-columns:minmax(0,1fr) 520px;gap:48px;align-items:stretch">
  <div style="display:flex;flex-direction:column;justify-content:space-between">
    <div class="brand"><img src="${file('/logo-mark.png')}">SR Industries</div>
    <div>
      <h1 style="font-size:66px">Gas stove parts, made in Faridabad</h1>
      <p style="margin-top:22px;font-size:24px;line-height:1.4;color:var(--ink-2);max-width:32ch">Knobs, dial plates, stove legs, couplers and safety parts, supplied in bulk to stove makers since 2013.</p>
    </div>
    <div class="site">${SITE}</div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:12px">${tiles}</div>
</div>`);
}

function product(p) {
  const pr = price(p);
  const n = p.colorVariants?.length ?? 0;
  const facts = [
    pr && `<div><b style="font-size:40px;font-weight:600;letter-spacing:-0.02em">${esc(pr)}</b> <span style="color:var(--muted)">per piece</span></div>`,
    n > 1 && `<div>${n} finishes</div>`,
    p.minOrderQty && `<div>Minimum order ${p.minOrderQty.toLocaleString('en-IN')} pieces</div>`,
  ].filter(Boolean).join('');
  const isP = photo(p.image);
  return page(`<div class="card" style="grid-template-columns:518px minmax(0,1fr);gap:56px;align-items:stretch">
  <div class="tile${isP ? ' photo' : ''}"><img src="${file(studio(p.image))}"></div>
  <div style="display:flex;flex-direction:column;justify-content:space-between;min-width:0">
    <div class="brand"><img src="${file('/logo-mark.png')}">SR Industries</div>
    <div>
      <div style="font-size:24px;color:var(--muted)">${esc(CATEGORY[p.category] ?? '')}</div>
      <h1 style="margin-top:10px;font-size:${p.name.length > 22 ? 58 : 68}px;overflow-wrap:break-word">${esc(p.name)}</h1>
      <div style="margin-top:14px;font-family:'Geist Mono',monospace;font-size:24px;color:var(--accent)">${esc(p.modelNumber)}</div>
      <div style="margin-top:26px;display:grid;gap:8px;font-size:24px;color:var(--ink-2)">${facts}</div>
    </div>
    <div class="site">${SITE}</div>
  </div>
</div>`);
}

const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new', args: ['--allow-file-access-from-files'] });
const tab = await browser.newPage();
await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
const tmp = resolve(tmpdir(), 'sr-og.html');
async function shoot(html, out) {
  writeFileSync(tmp, html);
  await tab.goto('file://' + tmp, { waitUntil: 'networkidle0', timeout: 60000 });
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: out, type: 'jpeg', quality: 90 });
}
mkdirSync(resolve(PUB, 'og/products'), { recursive: true });
await shoot(home(), resolve(PUB, 'og/home.jpg'));
for (const p of PRODUCTS) {
  if (!existsSync(PUB + studio(p.image))) { console.log('no photo for', p.slug); continue; }
  await shoot(product(p), resolve(PUB, `og/products/${p.slug}.jpg`));
}
await browser.close();
console.log('wrote', PRODUCTS.length + 1, 'link previews');
