/**
 * PRAMATHA H D — 240-FRAME SCROLL-DRIVEN ANIMATED PORTFOLIO
 * High-Performance Luxury Motion Engine & Synchronized Content Architecture
 * 
 * Features:
 * - 240-frame portrait sequence synchronized with viewport scroll
 * - Intelligent prioritized preloading queue with background decoding
 * - Velocity-aware adaptive inertia (LERP) with reduced-motion compliance
 * - State-cached DOM phase synchronization eliminating layout thrashing
 * - Subpixel-accurate hardware-accelerated canvas renderer
 * - Bespoke luxury animated cursor with CPU idle sleep and touch fallback
 */

(() => {
  'use strict';

  /* ==========================================================================
     1. CONFIGURATION & ACCESSIBILITY AUDIT
     ========================================================================== */

  const FRAME_COUNT = 240;
  const BASE_LERP = 0.08;
  const CONCURRENCY_LIMIT = 5;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;

  /* ==========================================================================
     2. PRIORITIZED ASSET CACHE & BACKGROUND DECODER
     ========================================================================== */

  const images = new Array(FRAME_COUNT);
  const loaded = new Array(FRAME_COUNT).fill(false);
  const inFlight = new Array(FRAME_COUNT).fill(false);

  let activeRequests = 0;
  let scrollDirection = 1;
  let targetProgress = 0;
  let currentProgress = 0;
  let renderedIndex = -1;
  let needsRedraw = true;

  function getFrameUrl(index) {
    const frameNum = String(index + 1).padStart(3, '0');
    return `public/hero-frames/ezgif-frame-${frameNum}.jpg`;
  }

  // Nearest-loaded frame lookup prevents any blank canvas flicker during fast scrubs
  function getClosestLoadedImage(index) {
    if (loaded[index] && images[index]) return images[index];

    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      const left = index - offset;
      const right = index + offset;
      if (left >= 0 && loaded[left] && images[left]) return images[left];
      if (right < FRAME_COUNT && loaded[right] && images[right]) return images[right];
    }
    return null;
  }

  // Subpixel-perfect cover rendering with high-quality smoothing and matching Obsidian Black fill
  function drawImageCover(img) {
    if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const renderWidth = Math.ceil(imgWidth * scale);
    const renderHeight = Math.ceil(imgHeight * scale);
    const offsetX = Math.round((canvasWidth - renderWidth) / 2);
    const offsetY = Math.round((canvasHeight - renderHeight) / 2);

    ctx.fillStyle = '#0B0B0D'; // Matches exact Obsidian background
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
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    return Math.max(0, Math.min(1, window.scrollY / maxScroll));
  }

  // Loads single frame and offloads JPEG decompression off the main thread
  function loadFrame(index) {
    if (loaded[index] || inFlight[index] || index < 0 || index >= FRAME_COUNT) return;

    inFlight[index] = true;
    activeRequests++;

    const img = new Image();
    images[index] = img;

    const onComplete = () => {
      loaded[index] = true;
      inFlight[index] = false;
      activeRequests--;

      const currentIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(currentProgress * (FRAME_COUNT - 1)))
      );
      if (Math.abs(currentIndex - index) <= 1) {
        needsRedraw = true;
      }

      processQueue();
    };

    img.onload = () => {
      if ('decode' in img) {
        img.decode().then(onComplete).catch(onComplete);
      } else {
        onComplete();
      }
    };

    img.onerror = () => {
      inFlight[index] = false;
      activeRequests--;
      processQueue();
    };

    img.src = getFrameUrl(index);
  }

  // Priority algorithm favoring frames immediately ahead in scroll direction
  function getNextPriorityFrame() {
    const currentIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(targetProgress * (FRAME_COUNT - 1)))
    );

    let bestIndex = -1;
    let bestScore = Infinity;

    for (let i = 0; i < FRAME_COUNT; i++) {
      if (loaded[i] || inFlight[i]) continue;

      const diff = i - currentIndex;
      let score;

      if (scrollDirection >= 0) {
        // Forward scroll: favor upcoming frames
        if (diff >= 0 && diff <= 30) {
          score = diff;
        } else if (diff < 0 && diff >= -12) {
          score = Math.abs(diff) + 40;
        } else if (diff > 30) {
          score = diff + 100;
        } else {
          score = Math.abs(diff) + 500;
        }
      } else {
        // Reverse scroll: favor previous frames
        if (diff <= 0 && diff >= -30) {
          score = Math.abs(diff);
        } else if (diff > 0 && diff <= 12) {
          score = diff + 40;
        } else if (diff < -30) {
          score = Math.abs(diff) + 100;
        } else {
          score = diff + 500;
        }
      }

      if (score < bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }

    return bestIndex;
  }

  function processQueue() {
    while (activeRequests < CONCURRENCY_LIMIT) {
      const nextIndex = getNextPriorityFrame();
      if (nextIndex === -1) break;
      loadFrame(nextIndex);
    }
  }

  // Preloading initialization: immediate frame 0 paint, followed by prioritized stream
  function initPreloader() {
    // 1. Initial Frame 0 highest priority
    loadFrame(0);

    // 2. Prime initial launch window (frames 1–15)
    for (let i = 1; i <= 15; i++) {
      loadFrame(i);
    }

    processQueue();
  }

  /* ==========================================================================
     3. STORYTELLING PHASES & STATE-CACHED SYNCHRONIZATION
     ========================================================================== */

  const PHASES = [
    { id: 'phase-0', name: '01 · INTRODUCTION', start: 0.000, end: 0.125, focus: 0.00 },
    { id: 'phase-1', name: '02 · ABOUT ME', start: 0.129, end: 0.242, focus: 0.18 },
    { id: 'phase-2', name: '03 · TECHNICAL SKILLS', start: 0.246, end: 0.368, focus: 0.30 },
    { id: 'phase-3', name: '04 · EXPERIENCE & INITIATIVES', start: 0.372, end: 0.477, focus: 0.42 },
    { id: 'phase-4', name: '05 · FEATURED PROJECTS', start: 0.481, end: 0.677, focus: 0.58 },
    { id: 'phase-5', name: '06 · EDUCATION & CREDENTIALS', start: 0.682, end: 0.786, focus: 0.73 },
    { id: 'phase-6', name: '07 · CONTACT & CLOSING', start: 0.790, end: 0.928, focus: 0.86 },
    { id: 'phase-7', name: '08 · REPLAY & SIGNATURE', start: 0.933, end: 1.000, focus: 0.97 }
  ];

  const phaseElements = PHASES.map(p => document.getElementById(p.id));
  const hudFrameNum = document.getElementById('hud-frame-num');
  const hudPhaseName = document.getElementById('hud-phase-name');
  const hudProgressBar = document.getElementById('hud-progress-bar');
  const phaseNavBtns = document.querySelectorAll('.phase-nav-btn');

  // Cache phase DOM states to eliminate redundant reflows
  const phaseStates = PHASES.map(() => ({
    visible: false,
    opacity: '-1',
    transformY: '-9999'
  }));

  let lastActivePhaseIndex = -1;
  let lastProgressBarPercent = -1;

  function getPhaseOpacity(progress, start, end, fadeBuffer = 0.016) {
    if (progress < start - fadeBuffer || progress > end + fadeBuffer) return 0;
    if (progress >= start && progress <= end) return 1;
    if (progress < start) {
      return (progress - (start - fadeBuffer)) / fadeBuffer;
    }
    if (progress > end) {
      return 1 - (progress - end) / fadeBuffer;
    }
    return 0;
  }

  function updatePhases(progress) {
    let currentActiveIndex = 0;

    for (let idx = 0; idx < PHASES.length; idx++) {
      const phase = PHASES[idx];
      const el = phaseElements[idx];
      const state = phaseStates[idx];
      if (!el) continue;

      const opacity = getPhaseOpacity(progress, phase.start, phase.end);
      const isVisible = opacity > 0.005;

      if (isVisible) {
        const opacityStr = opacity.toFixed(3);
        const mid = (phase.start + phase.end) / 2;
        const offset = (progress - mid) * 24;
        const transformYStr = (-offset).toFixed(1);

        if (!state.visible) {
          el.style.visibility = 'visible';
          el.classList.add('active');
          state.visible = true;
        }

        if (state.opacity !== opacityStr) {
          el.style.opacity = opacityStr;
          state.opacity = opacityStr;
        }

        if (state.transformY !== transformYStr) {
          el.style.transform = `translate3d(0, ${transformYStr}px, 0)`;
          state.transformY = transformYStr;
        }

        el.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
      } else {
        if (state.visible) {
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
          el.style.pointerEvents = 'none';
          el.classList.remove('active');
          state.visible = false;
          state.opacity = '0';
          state.transformY = '-9999';
        }
      }

      if (progress >= phase.start && progress <= phase.end) {
        currentActiveIndex = idx;
      }
    }

    // Telemetry updates strictly when active phase changes
    if (currentActiveIndex !== lastActivePhaseIndex) {
      if (hudPhaseName) {
        hudPhaseName.textContent = PHASES[currentActiveIndex].name;
      }

      phaseNavBtns.forEach((btn) => {
        const pIdx = parseInt(btn.getAttribute('data-phase'), 10);
        btn.classList.toggle('active', pIdx === currentActiveIndex);
      });

      lastActivePhaseIndex = currentActiveIndex;
    }

    // Progress bar updates strictly when percentage changes
    const progressPercent = (progress * 100).toFixed(1);
    if (progressPercent !== lastProgressBarPercent) {
      if (hudProgressBar) {
        hudProgressBar.style.width = `${progressPercent}%`;
      }
      lastProgressBarPercent = progressPercent;
    }
  }

  /* ==========================================================================
     4. ADAPTIVE INERTIA ANIMATION LOOP
     ========================================================================== */

  function animationLoop() {
    targetProgress = calculateTargetProgress();

    if (isReducedMotion) {
      currentProgress = targetProgress;
    } else {
      const delta = targetProgress - currentProgress;
      const absDelta = Math.abs(delta);

      // Adaptive LERP: gentle 0.08 float, dynamically scales up to 0.24 for fast scrubs & jumps
      let lerpFactor = BASE_LERP;
      if (absDelta > 0.04) {
        lerpFactor = Math.min(0.24, BASE_LERP + (absDelta - 0.04) * 0.45);
      }

      if (absDelta > 0.00004) {
        currentProgress += delta * lerpFactor;
      } else {
        currentProgress = targetProgress;
      }
    }

    const targetIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(currentProgress * (FRAME_COUNT - 1)))
    );

    if (targetIndex !== renderedIndex || needsRedraw) {
      renderFrame(targetIndex);

      if (hudFrameNum && targetIndex !== renderedIndex) {
        const formatted = String(targetIndex + 1).padStart(3, '0');
        hudFrameNum.textContent = `${formatted} / ${FRAME_COUNT}`;
      }

      renderedIndex = targetIndex;
      needsRedraw = false;
    }

    updatePhases(currentProgress);
    requestAnimationFrame(animationLoop);
  }

  if (canvas) {
    resizeCanvas();
    initPreloader();
    requestAnimationFrame(animationLoop);
  }

  /* ==========================================================================
     5. INTERACTIVE NAVIGATION & CONTROLS
     ========================================================================== */

  function jumpToProgress(prog) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollDirection = prog >= currentProgress ? 1 : -1;
    processQueue();

    window.scrollTo({
      top: prog * maxScroll,
      behavior: isReducedMotion ? 'auto' : 'smooth'
    });
  }

  // Phase navigation buttons
  phaseNavBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pIdx = parseInt(btn.getAttribute('data-phase'), 10);
      if (PHASES[pIdx]) {
        jumpToProgress(PHASES[pIdx].focus);
      }
    });
  });

  // Buttons with data-target-progress
  document.querySelectorAll('.btn-jump, .nav-brand-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = parseFloat(btn.getAttribute('data-target-progress') || '0');
      jumpToProgress(val);
    });
  });

  // Email copy utility
  const btnCopyEmail = document.getElementById('btn-copy-email');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', async () => {
      const email = btnCopyEmail.getAttribute('data-email') || 'hdpramatha17@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalHtml = btnCopyEmail.innerHTML;
        btnCopyEmail.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="20 6 9 17 4 12"/></svg>
          <span class="copy-label">Copied!</span>
        `;
        setTimeout(() => {
          btnCopyEmail.innerHTML = originalHtml;
        }, 2200);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }

  // Throttled resize & passive scroll listeners
  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
    resizeTimeout = requestAnimationFrame(() => {
      resizeCanvas();
      updatePhases(currentProgress);
    });
  }, { passive: true });

  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY >= lastScrollY ? 1 : -1;
    lastScrollY = currentScrollY;
    targetProgress = calculateTargetProgress();
    processQueue();
  }, { passive: true });

  /* ==========================================================================
     6. BESPOKE LUXURY ANIMATED CURSOR ENGINE (DESKTOP)
     ========================================================================== */

  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (isFinePointer && !isReducedMotion && cursorDot && cursorRing) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isCursorVisible = false;
    let isRingMoving = false;

    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isCursorVisible) {
        isCursorVisible = true;
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        ringX = mouseX;
        ringY = mouseY;
      }

      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      isRingMoving = true;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isCursorVisible = false;
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      if (mouseX > 0 && mouseY > 0) {
        isCursorVisible = true;
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        isRingMoving = true;
      }
    });

    // Ring trailing loop with CPU idle sleep detection
    function renderCursor() {
      if (isCursorVisible && isRingMoving) {
        const ringLerp = 0.20;
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;

        ringX += dx * ringLerp;
        ringY += dy * ringLerp;

        cursorRing.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;

        // Enter CPU-saving sleep when ring is within subpixel threshold
        if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
          isRingMoving = false;
        }
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Efficient delegated hover detector
    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest('a, button, .btn, [data-phase], .tech-chip, #btn-copy-email, .project-link-badge, .proj-link-mini')) {
        cursorRing.classList.add('cursor-hover-active');
        cursorRing.classList.remove('cursor-hover-card');
      } else if (target.closest('.story-card, .project-mini-card, .contact-box, .building-mini-item, .cert-compact-row')) {
        cursorRing.classList.add('cursor-hover-card');
        cursorRing.classList.remove('cursor-hover-active');
      } else {
        cursorRing.classList.remove('cursor-hover-active');
        cursorRing.classList.remove('cursor-hover-card');
      }
    }, { passive: true });
  }
})();
