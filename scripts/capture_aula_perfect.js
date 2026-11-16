const puppeteer = require('puppeteer-core');
const path = require('path');

async function captureAulaPerfect() {
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

  // Inject script to ensure canvas is properly sized and frame 1 is cleanly drawn
  await page.evaluate(async () => {
    // 1. Hide loader
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';

    // 2. Ensure sequence-canvas is sized and drawn
    const canvas = document.getElementById('sequence-canvas');
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve) => {
        img.onload = () => {
          // Draw cover
          const imgRatio = img.width / img.height;
          const canvasRatio = w / h;
          let dw, dh, dx, dy;
          if (canvasRatio > imgRatio) {
            dw = w;
            dh = w / imgRatio;
            dx = 0;
            dy = (h - dh) / 2;
          } else {
            dh = h;
            dw = h * imgRatio;
            dx = (w - dw) / 2;
            dy = 0;
          }
          ctx.drawImage(img, dx, dy, dw, dh);
          resolve();
        };
        img.src = 'ezgif-frame-001.jpg';
      });
    }

    // 3. Ensure story act 0 (brand act) is active and visible
    const act0 = document.querySelector('.story-act[data-act="0"]');
    if (act0) {
      act0.classList.add('active');
      act0.style.opacity = '1';
    }
  });

  // Wait 1 second for any animation settling
  await new Promise(r => setTimeout(r, 1000));

  const outPath = path.resolve('public/images/projects/aula-desktop-screenshot.png');
  await page.screenshot({ path: outPath, fullPage: false });
  console.log('Successfully captured authentic Aula desktop screenshot to:', outPath);

  await browser.close();
}

captureAulaPerfect().catch(console.error);
