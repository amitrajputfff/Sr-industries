// Print /price-list to public/SR-Industries-Price-List.pdf.
// Run with the dev or production server up: node scripts/catalogue-pdf.mjs [baseUrl]
// Needs puppeteer-core and a local Chrome (CHROME_PATH overrides the macOS default).
import puppeteer from 'puppeteer-core';

const base = process.argv[2] ?? 'http://localhost:3001';
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new' });
const page = await browser.newPage();
await page.goto(`${base}/price-list`, { waitUntil: 'load', timeout: 120000 });
await page.emulateMediaType('print');
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() =>
  Promise.race([
    Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r))))),
    new Promise((r) => setTimeout(r, 20000)),
  ]),
);
await new Promise((r) => setTimeout(r, 500));

const foot = `<div style="width:100%;padding:0 15mm;font:8.5px/1 -apple-system,Helvetica,Arial,sans-serif;color:#77736d;display:flex;justify-content:space-between">
  <span>SR Industries, Faridabad &nbsp; +91 9873741552 &nbsp; info@srindustries.info</span>
  <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`;

await page.pdf({
  path: 'public/SR-Industries-Price-List.pdf',
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: foot,
  margin: { top: '0', bottom: '10mm', left: '0', right: '0' },
});
await browser.close();
console.log('wrote public/SR-Industries-Price-List.pdf');
