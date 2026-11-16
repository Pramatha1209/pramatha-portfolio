const puppeteer = require('puppeteer-core');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://www.boat-lifestyle.com/products/nirvana-eutopia-headphone', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  const data = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    let images = [];
    for (const s of scripts) {
      try {
        const json = JSON.parse(s.innerText);
        if (json.image) {
          images = images.concat(Array.isArray(json.image) ? json.image : [json.image]);
        }
      } catch(e) {}
    }
    const allImgs = Array.from(document.querySelectorAll('img')).map(i => i.src).filter(Boolean);
    return { ldJsonImages: images, allImgs: allImgs.filter(s => s.includes('cdn/shop/files') || s.includes('products')) };
  });
  console.log('Product images from JSON-LD and page:');
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}
run().catch(console.error);
