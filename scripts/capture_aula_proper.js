const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function captureAulaProper() {
  console.log('Starting Chrome...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--hide-scrollbars'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  console.log('Navigating...');
  await page.goto('https://aula-f3287-product-experience-4c4n.vercel.app/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  // Wait 4 seconds for all React hydration, 3D canvas, images to load
  await new Promise((r) => setTimeout(r, 4000));

  const info = await page.evaluate(() => {
    return {
      title: document.title,
      headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText),
      images: Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, w: i.width, h: i.height })),
      canvases: Array.from(document.querySelectorAll('canvas')).map(c => ({ w: c.width, h: c.height })),
      bodyText: document.body.innerText.slice(0, 500)
    };
  });
  console.log('Page Info:', JSON.stringify(info, null, 2));

  // Take screenshot of viewport
  const outPath = path.resolve('public/images/projects/aula-live-interface.png');
  await page.screenshot({ path: outPath, fullPage: false });
  console.log('Saved viewport screenshot:', outPath);

  // Scroll down a bit to see if there is another view or hero
  await page.evaluate(() => window.scrollBy(0, 600));
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.resolve('public/images/projects/aula-live-scroll.png'), fullPage: false });
  console.log('Saved scrolled screenshot');

  await browser.close();
}

captureAulaProper().catch(console.error);
