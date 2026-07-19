import { createServer } from 'http';
import { readFile, mkdir, readdir } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;
const SCREENSHOT_DIR = join(__dirname, 'temporary-screenshots');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function startServer() {
  const server = createServer(async (req, res) => {
    const urlPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
    const filePath = join(__dirname, decodeURIComponent(urlPath));
    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const data = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

async function nextScreenshotName() {
  await mkdir(SCREENSHOT_DIR, { recursive: true });
  const files = await readdir(SCREENSHOT_DIR);
  const nums = files
    .map(f => parseInt(f.match(/^(\d+)/)?.[1] ?? '0', 10))
    .filter(n => !isNaN(n));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  return join(SCREENSHOT_DIR, `${String(next).padStart(3, '0')}.png`);
}

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error('Gebruik: node screenshot.mjs <url>');
    console.error('Voorbeeld: node screenshot.mjs http://localhost:3000/index.html');
    process.exit(1);
  }

  console.log('Server starten...');
  const server = await startServer();
  console.log(`Server actief op http://localhost:${PORT}`);

  let outPath;
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    console.log(`Navigeren naar ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    outPath = await nextScreenshotName();
    await page.screenshot({ path: outPath, fullPage: true });
    await browser.close();
    console.log(`Screenshot opgeslagen: ${outPath}`);
  } finally {
    server.close();
    console.log('Server afgesloten.');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
