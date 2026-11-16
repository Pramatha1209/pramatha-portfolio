const puppeteer = require('puppeteer-core');
const path = require('path');

async function verifyEachCard() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Scroll down smoothly through the page to trigger all whileInView animations
  for (let y = 0; y <= 5000; y += 400) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await new Promise((r) => setTimeout(r, 150));
  }

  // Wait for all Framer Motion animations to complete
  await new Promise((r) => setTimeout(r, 1000));

  // Capture screenshot of the entire Projects section
  const projectsElem = await page.$('#projects');
  if (projectsElem) {
    await projectsElem.screenshot({
      path: path.resolve('public/images/projects/verify-all-cards-scrolled.png'),
    });
    console.log('Saved verify-all-cards-scrolled.png');
  }

  // Now capture Aula specifically
  const aulaCard = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#projects .group'));
    return cards.length;
  });
  console.log(`Found ${aulaCard} project cards rendered on the page.`);

  // Test mobile viewport
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  for (let y = 0; y <= 7000; y += 500) {
    await mobilePage.evaluate((pos) => window.scrollTo(0, pos), y);
    await new Promise((r) => setTimeout(r, 150));
  }
  await new Promise((r) => setTimeout(r, 1000));
  const mobileProjects = await mobilePage.$('#projects');
  if (mobileProjects) {
    await mobileProjects.screenshot({
      path: path.resolve('public/images/projects/verify-mobile-scrolled.png'),
    });
    console.log('Saved verify-mobile-scrolled.png');
  }

  await browser.close();
  console.log('All card verifications finished!');
}

verifyEachCard().catch(console.error);
