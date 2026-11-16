const puppeteer = require('puppeteer-core');
const path = require('path');

async function testMobile() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  await page.evaluate(async () => {
    const cards = Array.from(document.querySelectorAll('#projects .group'));
    for (let i = 0; i < cards.length; i++) {
      cards[i].scrollIntoView({ behavior: 'instant', block: 'center' });
      await new Promise(r => setTimeout(r, 300));
    }
  });
  await new Promise(r => setTimeout(r, 800));

  const mobileElem = await page.$('#projects');
  if (mobileElem) {
    await mobileElem.screenshot({ path: path.resolve('public/images/projects/verify-mobile-final.png') });
    console.log('Saved verify-mobile-final.png');
  }
  await browser.close();
}
testMobile().catch(console.error);
