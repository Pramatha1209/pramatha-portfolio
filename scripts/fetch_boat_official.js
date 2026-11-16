const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');

async function getBoatImages() {
  console.log('Launching browser to inspect boAt official page...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    await page.goto('https://www.boat-lifestyle.com/products/nirvana-eutopia-headphone', {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });
  } catch (e) {
    console.log('Navigation:', e.message);
  }

  const imageUrls = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .map((img) => img.src)
      .filter((src) => src && (src.includes('nirvana') || src.includes('eutopia') || src.includes('products')));
  });

  console.log('Found product image URLs on page:', imageUrls.length);
  imageUrls.slice(0, 10).forEach((u) => console.log(' -', u));

  await browser.close();
  return imageUrls;
}

getBoatImages().catch((e) => console.error(e));
