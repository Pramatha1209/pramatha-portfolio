const puppeteer = require('puppeteer-core');
const path = require('path');

async function scrollEachCardDirectly() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Find all project cards and scroll to each one
  const cardCount = await page.evaluate(async () => {
    const cards = Array.from(document.querySelectorAll('#projects .group'));
    for (let i = 0; i < cards.length; i++) {
      cards[i].scrollIntoView({ behavior: 'instant', block: 'center' });
      await new Promise(r => setTimeout(r, 400));
    }
    return cards.length;
  });
  console.log(`Scrolled directly to all ${cardCount} cards.`);

  await new Promise(r => setTimeout(r, 1000));

  // Take screenshot of #projects
  const projectsElem = await page.$('#projects');
  if (projectsElem) {
    await projectsElem.screenshot({
      path: path.resolve('public/images/projects/verify-all-cards-fully-scrolled.png')
    });
    console.log('Saved verify-all-cards-fully-scrolled.png');
  }

  await browser.close();
}

scrollEachCardDirectly().catch(console.error);
