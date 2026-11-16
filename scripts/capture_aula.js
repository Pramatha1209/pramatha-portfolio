const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function captureAula() {
  console.log('Launching Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--hide-scrollbars'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  console.log('Navigating to Aula...');
  try {
    await page.goto('https://aula-f3287-product-experience-4c4n.vercel.app/', {
      waitUntil: 'networkidle2',
      timeout: 25000,
    });
  } catch (e) {
    console.log('Navigation event:', e.message);
  }

  // Wait 2.5 seconds for canvas/animations to render
  console.log('Waiting for canvas and animations to render...');
  await new Promise((r) => setTimeout(r, 2500));

  const outPath = path.resolve('public/images/projects/aula-desktop-screenshot.png');
  await page.screenshot({ path: outPath, type: 'png' });
  console.log('Screenshot saved successfully to:', outPath);

  const stats = fs.statSync(outPath);
  console.log('File size:', stats.size, 'bytes');

  await browser.close();
}

captureAula().catch((err) => {
  console.error('Error capturing Aula:', err);
  process.exit(1);
});
