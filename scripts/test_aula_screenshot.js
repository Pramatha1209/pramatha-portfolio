const puppeteer = require('puppeteer-core');
const path = require('path');

async function testAulaScreenshot() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--hide-scrollbars'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  await page.goto('https://aula-f3287-product-experience-4c4n.vercel.app/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  // Wait 3 seconds for initial frame 1 to fetch
  await new Promise(r => setTimeout(r, 3000));

  // Hide loader and trigger render of frame 1
  await page.evaluate(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.display = 'none';
      loader.classList.add('hidden');
    }
  });

  // Wait 1.5 seconds for CSS transitions
  await new Promise(r => setTimeout(r, 1500));

  const outPath = path.resolve('public/images/projects/aula-real-interface.png');
  await page.screenshot({ path: outPath, fullPage: false });
  console.log('Saved aula-real-interface.png');

  await browser.close();
}

testAulaScreenshot().catch(console.error);
