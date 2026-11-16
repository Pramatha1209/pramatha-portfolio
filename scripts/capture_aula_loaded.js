const puppeteer = require('puppeteer-core');
const path = require('path');

async function captureLoadedAula() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--hide-scrollbars'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  console.log('Navigating to Aula...');
  await page.goto('https://aula-f3287-product-experience-4c4n.vercel.app/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  console.log('Waiting for preloading to complete...');
  // Wait until "Preloading" is gone or up to 25 seconds
  for (let i = 0; i < 25; i++) {
    const text = await page.evaluate(() => document.body.innerText);
    console.log(`Poll ${i}s: ${text.slice(0, 100).replace(/\n/g, ' ')}`);
    if (!text.includes('Preloading') && !text.includes('0%')) {
      console.log('Preloader finished!');
      break;
    }
    await new Promise(r => setTimeout(r, 1000));
  }

  // Wait an extra 2 seconds for smooth render
  await new Promise(r => setTimeout(r, 2000));

  const outPath = path.resolve('public/images/projects/aula-desktop-screenshot.png');
  await page.screenshot({ path: outPath, fullPage: false });
  console.log('Successfully saved loaded interface screenshot to:', outPath);

  await browser.close();
}

captureLoadedAula().catch(console.error);
