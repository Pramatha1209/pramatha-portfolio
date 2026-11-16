const puppeteer = require('puppeteer-core');
const path = require('path');

async function testScreenshots() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  // Desktop test
  const pageDesktop = await browser.newPage();
  await pageDesktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await pageDesktop.goto('http://localhost:3000/#projects', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Find the projects section element
  const projectsElem = await pageDesktop.$('#projects');
  if (projectsElem) {
    await projectsElem.screenshot({
      path: path.resolve('public/images/projects/verify-projects-desktop.png')
    });
    console.log('Saved verify-projects-desktop.png');
  }

  // Mobile test
  const pageMobile = await browser.newPage();
  await pageMobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await pageMobile.goto('http://localhost:3000/#projects', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const projectsMobileElem = await pageMobile.$('#projects');
  if (projectsMobileElem) {
    await projectsMobileElem.screenshot({
      path: path.resolve('public/images/projects/verify-projects-mobile.png')
    });
    console.log('Saved verify-projects-mobile.png');
  }

  await browser.close();
  console.log('UI Verification screenshots successfully captured!');
}

testScreenshots().catch(console.error);
