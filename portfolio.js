/**
 * PRAMATHA H D — PORTFOLIO CORE SCRIPT
 * Preserves the completed 240-frame smooth canvas scrolling animation
 * with high-performance LERP inertia, nearest-frame fallback, and cover scaling,
 * integrated with site interactions, navigation scrollspy, and contact utilities.
 */

(() => {
  /* ==========================================================================
     1. SCROLLING CANVAS ANIMATION (PRESERVED FUNCTIONALITY & TIMING)
     ========================================================================== */

  const FRAME_COUNT = 240;
  const LERP_FACTOR = 0.08; // Inertia smoothing factor

  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;
  const heroTrack = document.getElementById('hero');
  const heroFrameVal = document.getElementById('hero-frame-val');
  const heroContent = document.querySelector('.hero-content');

  const images = new Array(FRAME_COUNT);
  const loaded = new Array(FRAME_COUNT).fill(false);

  let targetProgress = 0;
  let currentProgress = 0;
  let renderedIndex = -1;
  let needsRedraw = true;

  // Generate frame path (1-indexed, padded to 3 digits)
  function getFrameUrl(index) {
    const frameNum = String(index + 1).padStart(3, '0');
    return `public/hero-frames/ezgif-frame-${frameNum}.jpg`;
  }

  // Find nearest loaded frame to prevent blank flashes
  function getClosestLoadedImage(index) {
    if (loaded[index]) return images[index];

    // Search outwards from target index
    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      if (index - offset >= 0 && loaded[index - offset]) {
        return images[index - offset];
      }
      if (index + offset < FRAME_COUNT && loaded[index + offset]) {
        return images[index + offset];
      }
    }
    return null;
  }

  // Draw image to canvas with 'cover' aspect ratio sizing
  function drawImageCover(img) {
    if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;
    const offsetX = (canvasWidth - renderWidth) / 2;
    const offsetY = (canvasHeight - renderHeight) / 2;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }

  function renderFrame(index) {
    const img = getClosestLoadedImage(index);
    if (img) {
      drawImageCover(img);
    }
    if (heroFrameVal) {
      const formatted = String(index + 1).padStart(3, '0');
      heroFrameVal.textContent = `${formatted} / ${FRAME_COUNT}`;
    }
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const newWidth = Math.round(displayWidth * dpr);
    const newHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
      needsRedraw = true;
    }
  }

  function calculateTargetProgress() {
    if (!heroTrack) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      return Math.max(0, Math.min(1, window.scrollY / maxScroll));
    }

    const rect = heroTrack.getBoundingClientRect();
    const scrollDistance = heroTrack.offsetHeight - window.innerHeight;
    if (scrollDistance <= 0) return 0;
    const scrolled = -rect.top;
    return Math.max(0, Math.min(1, scrolled / scrollDistance));
  }

  // Preload all frames
  function preloadImages() {
    // 1. Load first frame immediately and render as soon as available
    const firstImg = new Image();
    firstImg.onload = () => {
      loaded[0] = true;
      needsRedraw = true;
    };
    firstImg.src = getFrameUrl(0);
    images[0] = firstImg;
    if (firstImg.complete) {
      loaded[0] = true;
      needsRedraw = true;
    }

    // 2. Preload remaining frames
    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = () => {
        loaded[i] = true;
        const currentIndex = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.round(currentProgress * (FRAME_COUNT - 1)))
        );
        if (currentIndex === i) {
          needsRedraw = true;
        }
      };
      img.src = getFrameUrl(i);
      images[i] = img;
      if (img.complete) {
        loaded[i] = true;
      }
    }
  }

  // Continuous animation loop with LERP smoothing
  function animationLoop() {
    targetProgress = calculateTargetProgress();

    const delta = targetProgress - currentProgress;
    if (Math.abs(delta) > 0.00005) {
      currentProgress += delta * LERP_FACTOR;
    } else {
      currentProgress = targetProgress;
    }

    const targetIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(currentProgress * (FRAME_COUNT - 1)))
    );

    if (targetIndex !== renderedIndex || needsRedraw) {
      renderFrame(targetIndex);
      renderedIndex = targetIndex;
      needsRedraw = false;
    }

    // Subtle fade of hero intro text as scrub deepens
    if (heroContent) {
      if (currentProgress > 0.05 && currentProgress < 0.95) {
        const opacity = Math.max(0.18, 1 - (currentProgress - 0.05) * 1.6);
        heroContent.style.opacity = opacity.toFixed(2);
      } else if (currentProgress <= 0.05) {
        heroContent.style.opacity = '1';
      }
    }

    requestAnimationFrame(animationLoop);
  }

  // Initialize Canvas
  if (canvas) {
    resizeCanvas();
    preloadImages();
    requestAnimationFrame(animationLoop);
  }

  /* ==========================================================================
     2. NAVIGATION & SCROLLSPY
     ========================================================================== */

  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], main > section[id]');

  function handleNavbarScroll() {
    if (!navbar) return;
    const scrollY = window.scrollY;

    // Check if scrolled past hero sticky zone
    const heroHeight = heroTrack ? heroTrack.offsetHeight - window.innerHeight : window.innerHeight;

    if (scrollY > heroHeight * 0.9) {
      navbar.classList.remove('hero-nav');
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('hero-nav');
      navbar.classList.remove('scrolled');
    }

    // Active Section ScrollSpy
    let currentSectionId = 'hero';
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  window.addEventListener('resize', () => {
    resizeCanvas();
    handleNavbarScroll();
  }, { passive: true });

  // Initial call
  handleNavbarScroll();

  /* ==========================================================================
     3. MOBILE DRAWER MENU
     ========================================================================== */

  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (navToggle && mobileDrawer) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      mobileDrawer.setAttribute('aria-hidden', !isOpen);
    });

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ==========================================================================
     4. COPY EMAIL CLIPBOARD UTILITY
     ========================================================================== */

  const btnCopyEmail = document.getElementById('btn-copy-email');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', async () => {
      const email = btnCopyEmail.getAttribute('data-email') || 'hdpramatha17@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalHtml = btnCopyEmail.innerHTML;
        btnCopyEmail.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span class="copy-text">Copied!</span>
        `;
        setTimeout(() => {
          btnCopyEmail.innerHTML = originalHtml;
        }, 2200);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }

  /* ==========================================================================
     5. CONTACT INQUIRY FORM
     ========================================================================== */

  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !subject || !message) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please fill out all required fields.';
        return;
      }

      // Generate pre-filled mailto
      const mailtoLink = `mailto:hdpramatha17@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      formFeedback.className = 'form-feedback success';
      formFeedback.textContent = 'Opening your email client to send message...';

      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 300);
    });
  }

  /* ==========================================================================
     6. BACK TO TOP BUTTON
     ========================================================================== */

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
})();
