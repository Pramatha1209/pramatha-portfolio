/**
 * AULA F3287 — CONTINUOUS FLOATING FRAME DIGITAL EXPERIENCE ENGINE
 * Orchestrates 300-frame Canvas interpolation, perimeter storytelling transitions,
 * authentic blue switch acoustics, and compact micro hardware demonstrators.
 */

(() => {
  'use strict';

  // --- Configuration ---
  const TOTAL_FRAMES = 300;
  const LERP_FACTOR = 0.09;
  const CONCURRENT_LOAD_LIMIT = 10;

  // Frame path patterns to auto-detect
  const CANDIDATE_PATTERNS = [
    (i) => `ezgif-frame-${String(i).padStart(3, '0')}.jpg`,
    (i) => `assets/keyboard-frames/frame_${String(i).padStart(4, '0')}.jpg`,
    (i) => `assets/keyboard-frames/frame_${String(i).padStart(3, '0')}.jpg`,
    (i) => `frame_${String(i).padStart(4, '0')}.jpg`,
    (i) => `frame_${String(i).padStart(3, '0')}.jpg`
  ];

  let resolvedPattern = CANDIDATE_PATTERNS[0];
  const frames = new Array(TOTAL_FRAMES + 1);
  let loadedCount = 0;
  let isSequenceReady = false;

  let targetProgress = 0;
  let currentProgress = 0;
  let lastDrawnFrame = -1;

  let isAutoplaying = false;
  let autoplaySpeed = 1.0;
  let autoplayDirection = 1;

  let fitMode = 'cover'; // Defaults to full cinematic cover (occupies entire frame)
  let isAudioEnabled = false;
  let audioCtx = null;
  let lastAudioFrame = 1;

  // --- DOM Elements ---
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');
  const loaderStatus = document.getElementById('loader-status');

  const canvasStage = document.querySelector('.frame-canvas-stage');
  const canvas = document.getElementById('sequence-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });

  const hudFrameNum = document.getElementById('hud-frame-num');
  const hudProgressPct = document.getElementById('hud-progress-pct');
  const scrubber = document.getElementById('frame-scrubber');
  const scrubberBubble = document.getElementById('scrubber-bubble');

  const autoplayBtn = document.getElementById('autoplay-btn');
  const autoplayLabel = document.getElementById('autoplay-label');
  const playIcon = autoplayBtn.querySelector('.play-icon');
  const pauseIcon = autoplayBtn.querySelector('.pause-icon');
  const speedBtns = document.querySelectorAll('.speed-btn');
  const fitToggleBtn = document.getElementById('fit-toggle-btn');

  const soundBtn = document.getElementById('sound-btn');
  const soundOffIcon = soundBtn.querySelector('.sound-off-icon');
  const soundOnIcon = soundBtn.querySelector('.sound-on-icon');

  const storyActs = document.querySelectorAll('.story-act');
  const navChapterBtns = document.querySelectorAll('.nav-chapter-btn');

  // Switch demonstrator
  const switchTriggerBtn = document.getElementById('switch-trigger-btn');
  const switchUnit = document.getElementById('switch-unit');
  const rulerProgressBar = document.getElementById('ruler-progress-bar');
  const switchToast = document.getElementById('switch-toast');

  // Lighting studio
  const keyboardVisualizer = document.getElementById('keyboard-visualizer');
  const miniKeyGrid = document.getElementById('mini-key-grid');
  const modePills = document.querySelectorAll('.mode-pill');
  const sliderBrightness = document.getElementById('slider-brightness');
  const labelBrightness = document.getElementById('label-brightness');
  const sliderSpeed = document.getElementById('slider-speed');
  const labelSpeed = document.getElementById('label-speed');

  // Performance hotspots
  const perfItems = document.querySelectorAll('.perf-anno-item');
  const hotspotBadge = document.getElementById('hotspot-badge');
  const hotspotCardTitle = document.getElementById('hotspot-card-title');
  const hotspotCardDesc = document.getElementById('hotspot-card-desc');
  const hotspotCardSpec = document.getElementById('hotspot-card-spec');

  // Final actions & Blueprint Modal
  const finalExploreBtn = document.getElementById('final-explore-btn');
  const finalReplayBtn = document.getElementById('final-replay-btn');
  const specModal = document.getElementById('spec-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  // =========================================================================
  // 1. ASSET AUTO-DETECTION & PROGRESSIVE PRELOADER
  // =========================================================================
  async function detectFramePattern() {
    for (const testPattern of CANDIDATE_PATTERNS) {
      const testUrl = testPattern(1);
      const isAvailable = await probeImageUrl(testUrl);
      if (isAvailable) {
        resolvedPattern = testPattern;
        break;
      }
    }
  }

  function probeImageUrl(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async function startProgressivePreload() {
    await detectFramePattern();

    // Priority 1: Load Frame 1 immediately
    await loadSingleFrame(1);
    if (frames[1]) {
      drawFrame(1);
    }

    // Priority 2: Concurrently buffer remaining frames
    const queue = [];
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      queue.push(i);
    }

    const workers = Array(CONCURRENT_LOAD_LIMIT).fill(0).map(async () => {
      while (queue.length > 0) {
        const frameIdx = queue.shift();
        await loadSingleFrame(frameIdx);
      }
    });

    await Promise.all(workers);
    onPreloadComplete();
  }

  function loadSingleFrame(index) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = resolvedPattern(index);

      img.onload = () => {
        frames[index] = img;
        loadedCount++;
        updatePreloadProgress();

        // Dismiss loader early once first 25 frames are ready
        if (loadedCount >= 25 && !isSequenceReady) {
          softUnlockExperience();
        }
        resolve();
      };

      img.onerror = () => {
        // Fallback retry
        setTimeout(() => {
          const retryImg = new Image();
          retryImg.src = resolvedPattern(index);
          retryImg.onload = () => {
            frames[index] = retryImg;
            loadedCount++;
            updatePreloadProgress();
            resolve();
          };
          retryImg.onerror = () => resolve();
        }, 300);
      };
    });
  }

  function updatePreloadProgress() {
    const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
    loaderBar.style.width = `${percent}%`;
    loaderPercent.textContent = `${percent}%`;
    loaderStatus.textContent = `Streaming frames: ${loadedCount} / ${TOTAL_FRAMES}`;
  }

  function softUnlockExperience() {
    isSequenceReady = true;
    loader.classList.add('fade-out');
  }

  function onPreloadComplete() {
    isSequenceReady = true;
    loaderStatus.textContent = 'Hardware Synchronized. Ready.';
    loaderBar.style.width = '100%';
    loaderPercent.textContent = '100%';
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 350);
  }

  // =========================================================================
  // 2. CANVAS SIZING & HIGH-DPI SCALING INSIDE FRAME
  // =========================================================================
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvasStage.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    lastDrawnFrame = -1;
    const currentFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentProgress * (TOTAL_FRAMES - 1)) + 1));
    drawFrame(currentFrame);
  }

  window.addEventListener('resize', resizeCanvas);

  function drawFrame(frameIndex) {
    const img = frames[frameIndex] || frames[1];
    if (!img || !img.complete) return;
    if (frameIndex === lastDrawnFrame && img === frames[frameIndex]) return;

    const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

    ctx.fillStyle = '#181b23';
    ctx.fillRect(0, 0, width, height);

    const imgRatio = img.width / img.height;
    const winRatio = width / height;

    let dw, dh, dx, dy;

    if (fitMode === 'cover') {
      if (winRatio > imgRatio) {
        dw = width;
        dh = width / imgRatio;
      } else {
        dh = height;
        dw = height * imgRatio;
      }
    } else {
      // Contain mode (edge-to-edge max bounds)
      if (winRatio > imgRatio) {
        dh = height;
        dw = dh * imgRatio;
      } else {
        dw = width;
        dh = dw / imgRatio;
      }
    }

    dx = (width - dw) / 2;
    dy = (height - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);

    if (img === frames[frameIndex]) {
      lastDrawnFrame = frameIndex;
    }

    // Subtle audio click trigger on frame advance
    if (isAudioEnabled && Math.abs(frameIndex - lastAudioFrame) >= 2) {
      playMechanicalClick(false);
      lastAudioFrame = frameIndex;
    }
  }

  // =========================================================================
  // 3. AUTHENTIC BLUE SWITCH ACOUSTIC SYNTHESIS (Web Audio API)
  // =========================================================================
  function playMechanicalClick(isHeavy = false) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      // Authentic Click Leaf Transient (High-Q sharp snap)
      const snapOsc = audioCtx.createOscillator();
      const snapGain = audioCtx.createGain();
      const snapFilter = audioCtx.createBiquadFilter();

      snapFilter.type = 'highpass';
      snapFilter.frequency.setValueAtTime(2200, now);

      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(isHeavy ? 3200 : 3600, now);
      snapOsc.frequency.exponentialRampToValueAtTime(900, now + 0.012);

      snapGain.gain.setValueAtTime(isHeavy ? 0.14 : 0.04, now);
      snapGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.018);

      snapOsc.connect(snapFilter);
      snapFilter.connect(snapGain);
      snapGain.connect(audioCtx.destination);

      snapOsc.start(now);
      snapOsc.stop(now + 0.022);

      // Subtle Low-Mid Bottom-out Thock (for heavy actuation)
      if (isHeavy) {
        const thockOsc = audioCtx.createOscillator();
        const thockGain = audioCtx.createGain();

        thockOsc.type = 'sine';
        thockOsc.frequency.setValueAtTime(140, now);
        thockOsc.frequency.exponentialRampToValueAtTime(45, now + 0.035);

        thockGain.gain.setValueAtTime(0.08, now);
        thockGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.04);

        thockOsc.connect(thockGain);
        thockGain.connect(audioCtx.destination);

        thockOsc.start(now);
        thockOsc.stop(now + 0.045);
      }
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  soundBtn.addEventListener('click', () => {
    isAudioEnabled = !isAudioEnabled;
    if (isAudioEnabled) {
      soundOffIcon.classList.add('hidden');
      soundOnIcon.classList.remove('hidden');
      soundBtn.classList.add('active');
      playMechanicalClick(true);
    } else {
      soundOffIcon.classList.remove('hidden');
      soundOnIcon.classList.add('hidden');
      soundBtn.classList.remove('active');
    }
  });

  // =========================================================================
  // 4. SCROLL ENGINE & STORY ACT TRANSITIONS INSIDE FRAME
  // =========================================================================
  function calculateScrollProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    return Math.max(0, Math.min(1, window.scrollY / maxScroll));
  }

  window.addEventListener('scroll', () => {
    targetProgress = calculateScrollProgress();
  }, { passive: true });

  // Smooth Hermite / Cubic Easing for cinematic fade transitions
  function smoothstep(edge0, edge1, x) {
    if (x <= edge0) return 0;
    if (x >= edge1) return 1;
    const t = (x - edge0) / (edge1 - edge0);
    return t * t * (3 - 2 * t);
  }

  const EDITORIAL_ACT_TIMINGS = [
    // Act 0: Brand Identity (Opening)
    { fadeInStart: 0.00, fadeInEnd: 0.02, fadeOutStart: 0.09, fadeOutEnd: 0.13, act: 0 },
    // Act 1: Main Headline (Every Keystroke)
    { fadeInStart: 0.14, fadeInEnd: 0.18, fadeOutStart: 0.26, fadeOutEnd: 0.30, act: 1 },
    // Act 2: Craftsmanship & Rigidity (Built For Every Detail)
    { fadeInStart: 0.32, fadeInEnd: 0.36, fadeOutStart: 0.46, fadeOutEnd: 0.50, act: 2 },
    // Act 3: Switches Core (Feel Every Click)
    { fadeInStart: 0.52, fadeInEnd: 0.56, fadeOutStart: 0.66, fadeOutEnd: 0.70, act: 3 },
    // Act 4: Atmospheric Illumination (Light Up Your Workspace)
    { fadeInStart: 0.72, fadeInEnd: 0.76, fadeOutStart: 0.85, fadeOutEnd: 0.89, act: 4 },
    // Act 5: Finale (Make Every Keystroke Count)
    { fadeInStart: 0.90, fadeInEnd: 0.94, fadeOutStart: 1.01, fadeOutEnd: 1.05, act: 5 }
  ];

  function updateStoryActs(prog) {
    EDITORIAL_ACT_TIMINGS.forEach((timing, idx) => {
      const actEl = storyActs[idx];
      if (!actEl) return;

      let opacity = 0;
      if (prog < timing.fadeInStart) {
        opacity = 0;
      } else if (prog >= timing.fadeInStart && prog < timing.fadeInEnd) {
        opacity = smoothstep(timing.fadeInStart, timing.fadeInEnd, prog);
      } else if (prog >= timing.fadeInEnd && prog <= timing.fadeOutStart) {
        opacity = 1.0;
      } else if (prog > timing.fadeOutStart && prog <= timing.fadeOutEnd) {
        opacity = 1.0 - smoothstep(timing.fadeOutStart, timing.fadeOutEnd, prog);
      } else {
        opacity = 0;
      }

      if (opacity <= 0.001) {
        actEl.style.opacity = '0';
        actEl.style.visibility = 'hidden';
        actEl.style.pointerEvents = 'none';
        actEl.classList.remove('active');
      } else {
        actEl.style.visibility = 'visible';
        actEl.style.opacity = opacity.toFixed(3);
        actEl.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
        // Subtle upward movement: from +12px at opacity=0 to 0px at opacity=1
        const yOffset = ((1.0 - opacity) * 12).toFixed(2);
        actEl.style.transform = `translateY(${yOffset}px)`;
        actEl.classList.add('active');
      }
    });

    // Sync header chapter buttons
    navChapterBtns.forEach((btn) => {
      const targetP = parseFloat(btn.dataset.progress);
      const isCurrent = Math.abs(prog - targetP) < 0.09;
      btn.classList.toggle('active', isCurrent);
    });
  }

  navChapterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetP = parseFloat(btn.dataset.progress);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: targetP * maxScroll,
        behavior: 'smooth'
      });
    });
  });

  // =========================================================================
  // 5. ANIMATION RENDER LOOP (requestAnimationFrame)
  // =========================================================================
  function renderLoop() {
    const delta = targetProgress - currentProgress;
    if (Math.abs(delta) > 0.0001) {
      currentProgress += delta * LERP_FACTOR;
    } else {
      currentProgress = targetProgress;
    }

    const frameIndex = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.round(currentProgress * (TOTAL_FRAMES - 1)) + 1)
    );

    drawFrame(frameIndex);

    // Update HUD Stats (if present)
    const padStr = String(frameIndex).padStart(3, '0');
    if (hudFrameNum) hudFrameNum.textContent = `${padStr} / ${TOTAL_FRAMES}`;
    if (hudProgressPct) hudProgressPct.textContent = `${(currentProgress * 100).toFixed(1)}%`;

    if (scrubber && !scrubber.matches(':active')) {
      scrubber.value = frameIndex;
      updateScrubberBubble(frameIndex);
    }

    updateStoryActs(currentProgress);

    // Autoplay progression
    if (isAutoplaying) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const step = (window.innerHeight * 0.007) * autoplaySpeed * autoplayDirection;
      const nextScroll = window.scrollY + step;

      if (nextScroll >= maxScroll) {
        window.scrollTo(0, maxScroll);
        autoplayDirection = -1; // Reverse ping-pong
      } else if (nextScroll <= 0) {
        window.scrollTo(0, 0);
        autoplayDirection = 1;
      } else {
        window.scrollTo(0, nextScroll);
      }
    }

    requestAnimationFrame(renderLoop);
  }

  // Scrubber drag logic (if present)
  function updateScrubberBubble(frame) {
    if (!scrubberBubble) return;
    scrubberBubble.textContent = `Frame ${frame} / ${TOTAL_FRAMES}`;
    const pct = ((frame - 1) / (TOTAL_FRAMES - 1)) * 100;
    scrubberBubble.style.left = `${pct}%`;
  }

  if (scrubber) {
    scrubber.addEventListener('input', (e) => {
      isAutoplaying = false;
      updateAutoplayUI();

      const frame = parseInt(e.target.value, 10);
      updateScrubberBubble(frame);

      const progress = (frame - 1) / (TOTAL_FRAMES - 1);
      targetProgress = progress;
      currentProgress = progress;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, progress * maxScroll);
      drawFrame(frame);
    });
  }

  // Autoplay control
  function updateAutoplayUI() {
    if (isAutoplaying) {
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
      autoplayLabel.textContent = 'Pause';
      autoplayBtn.classList.add('active');
    } else {
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      autoplayLabel.textContent = 'Autoplay';
      autoplayBtn.classList.remove('active');
    }
  }

  autoplayBtn.addEventListener('click', () => {
    isAutoplaying = !isAutoplaying;
    updateAutoplayUI();
  });

  if (speedBtns && speedBtns.length > 0) {
    speedBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        speedBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        autoplaySpeed = parseFloat(btn.dataset.speed);
      });
    });
  }

  window.addEventListener('wheel', () => {
    if (isAutoplaying) {
      isAutoplaying = false;
      updateAutoplayUI();
    }
  }, { passive: true });

  if (fitToggleBtn) {
    fitToggleBtn.addEventListener('click', () => {
      fitMode = fitMode === 'contain' ? 'cover' : 'contain';
      lastDrawnFrame = -1;
      const currentFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentProgress * (TOTAL_FRAMES - 1)) + 1));
      drawFrame(currentFrame);
    });
  }

  // =========================================================================
  // 6. INTERACTIVE SWITCH DEMONSTRATOR
  // =========================================================================
  function triggerSwitchPress() {
    switchUnit.classList.add('pressed');
    rulerProgressBar.style.height = '100%';
    playMechanicalClick(true);

    switchToast.textContent = '2.0mm Snap Actuated';

    setTimeout(() => {
      switchUnit.classList.remove('pressed');
      rulerProgressBar.style.height = '0%';
    }, 240);

    setTimeout(() => {
      switchToast.textContent = 'Ready';
    }, 1600);
  }

  if (switchTriggerBtn) {
    switchTriggerBtn.addEventListener('click', triggerSwitchPress);
    switchTriggerBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      triggerSwitchPress();
    });
  }

  // =========================================================================
  // 7. ENLARGED 87-KEY TKL KEYBOARD MATRIX & LIGHTING DEMONSTRATOR
  // =========================================================================
  const LIGHTING_MODES_INFO = {
    static: {
      title: '01 // STATIC LUMINESCENCE',
      desc: 'Uniform 465nm Ice Blue underglow radiating continuously across all 87 suspended stems.'
    },
    breathing: {
      title: '02 // BREATHING PULSE',
      desc: 'Gentle, atmospheric sine-wave luminance oscillating from ambient shadow to full saturation.'
    },
    wave: {
      title: '03 // CASCADING WAVE',
      desc: 'Dynamic traveling light wave sweeping horizontally across rows with fluid velocity.'
    },
    reactive: {
      title: '04 // KEYSTROKE RIPPLE',
      desc: 'Instant click actuation triggering an expanding shockwave across adjacent keycaps.'
    },
    gaming: {
      title: '05 // TOURNAMENT CLUSTER',
      desc: 'High-contrast focused lighting isolating WASD and Arrow arrays for competitive gaming.'
    }
  };

  const lightingModeTitle = document.getElementById('lighting-mode-title');
  const lightingModeDesc = document.getElementById('lighting-mode-desc');
  let keyElements = [];

  function buildKeyboardVisualizer() {
    if (!miniKeyGrid) return;

    // Accurate 87-key TKL layout distribution (6 rows)
    const rowKeys = [
      ['ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'PS', 'SL', 'PB'],
      ['`~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BS', 'INS', 'HM'],
      ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'DEL', 'END'],
      ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'ENT', '', 'PU', ''],
      ['SHFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHFT', '▲', '', 'PD', ''],
      ['CTRL', 'WIN', 'ALT', 'SPC', '', '', '', '', '', '', 'ALT', 'FN', 'CTL', '◄', '▼', '►']
    ];

    miniKeyGrid.innerHTML = '';
    keyElements = [];

    rowKeys.forEach((row, rowIndex) => {
      row.forEach((label, colIndex) => {
        if (!label) {
          const empty = document.createElement('div');
          empty.style.visibility = 'hidden';
          miniKeyGrid.appendChild(empty);
          return;
        }

        const key = document.createElement('div');
        key.className = 'micro-key';
        key.style.setProperty('--col', colIndex);
        key.style.setProperty('--row', rowIndex);
        key.dataset.row = rowIndex;
        key.dataset.col = colIndex;

        const lbl = document.createElement('span');
        lbl.className = 'k-lbl';
        lbl.textContent = label;
        key.appendChild(lbl);

        if (label === 'ESC') {
          key.classList.add('accent-esc');
        } else if (['W', 'A', 'S', 'D', '▲', '▼', '◄', '►'].includes(label)) {
          key.classList.add('gaming-key');
        } else if (['TAB', 'CAPS', 'SHFT', 'CTRL', 'WIN', 'ALT', 'ENT', 'BS', 'INS', 'DEL', 'HM', 'END', 'PU', 'PD', 'PS', 'SL', 'PB', 'CTL', 'FN'].includes(label)) {
          key.classList.add('grey');
        } else {
          key.classList.add('white');
        }

        key.addEventListener('click', () => {
          triggerKeyActuation(key, rowIndex, colIndex);
        });

        miniKeyGrid.appendChild(key);
        keyElements.push({ el: key, r: rowIndex, c: colIndex });
      });
    });

    keyboardVisualizer.classList.add('mode-static');
  }

  function triggerKeyActuation(targetKey, targetRow, targetCol) {
    targetKey.classList.add('lit');
    playMechanicalClick(true);
    setTimeout(() => targetKey.classList.remove('lit'), 350);

    // If in reactive mode, ripple outward to neighboring keys
    if (keyboardVisualizer && keyboardVisualizer.classList.contains('mode-reactive')) {
      keyElements.forEach(({ el, r, c }) => {
        if (el === targetKey) return;
        const dist = Math.sqrt((r - targetRow) ** 2 + (c - targetCol) ** 2);
        if (dist <= 4.5) {
          setTimeout(() => {
            el.classList.add('lit');
            setTimeout(() => el.classList.remove('lit'), 220);
          }, dist * 55);
        }
      });
    }
  }

  modePills.forEach((btn) => {
    btn.addEventListener('click', () => {
      modePills.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.dataset.mode;
      keyboardVisualizer.className = `micro-tkl-chassis mode-${mode}`;

      if (LIGHTING_MODES_INFO[mode]) {
        if (lightingModeTitle) lightingModeTitle.textContent = LIGHTING_MODES_INFO[mode].title;
        if (lightingModeDesc) lightingModeDesc.textContent = LIGHTING_MODES_INFO[mode].desc;
      }
    });
  });

  if (sliderBrightness) {
    sliderBrightness.addEventListener('input', (e) => {
      const val = e.target.value;
      labelBrightness.textContent = `${val}%`;
      const intensity = val / 100;
      document.documentElement.style.setProperty('--light-intensity', intensity);
    });
  }

  if (sliderSpeed) {
    sliderSpeed.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      labelSpeed.textContent = `${val.toFixed(1)}x`;
      document.documentElement.style.setProperty('--light-speed-mult', val);
    });
  }

  // =========================================================================
  // 8. INTERACTIVE PERFORMANCE ANNOTATIONS
  // =========================================================================
  const HOTSPOT_DETAILS = {
    nkro: {
      badge: 'HOTSPOT 01 // 87-KEY NKRO',
      title: 'Full Anti-Ghosting Matrix',
      desc: 'Independent diode matrix routing ensures 100% actuation accuracy regardless of how many keys you hit at once.',
      spec: '1000Hz Polling · 1ms Response'
    },
    winlock: {
      badge: 'HOTSPOT 02 // GAME MODE',
      title: 'Fn + Win Lock Function',
      desc: 'Locks the Windows key with an instant hardware shortcut, preventing accidental desktop drops during intense sessions.',
      spec: 'Hardware Toggle · Zero Software Required'
    },
    usb: {
      badge: 'HOTSPOT 03 // CONNECTIVITY',
      title: '1000Hz Shielded Wired USB',
      desc: '1.8m heavy-duty shielded cable delivers an uninterrupted 1000Hz polling rate (1ms response) with zero battery degradation.',
      spec: '1000Hz Polling · Molded Strain Relief'
    },
    compat: {
      badge: 'HOTSPOT 04 // COMPATIBILITY',
      title: 'Universal Multi-OS Architecture',
      desc: 'Driverless plug-and-play operation across Windows 11/10/8, macOS, and Linux gaming systems.',
      spec: 'Plug & Play · Broad Console Support'
    }
  };

  if (perfItems && perfItems.length > 0) {
    perfItems.forEach((item) => {
      item.addEventListener('click', () => {
        perfItems.forEach((p) => p.classList.remove('active'));
        item.classList.add('active');

        const pinKey = item.dataset.pin;
        const data = HOTSPOT_DETAILS[pinKey];
        if (data && hotspotBadge) {
          hotspotBadge.textContent = data.badge;
          hotspotCardTitle.textContent = data.title;
          hotspotCardDesc.textContent = data.desc;
          hotspotCardSpec.textContent = data.spec;
        }
      });
    });
  }

  // =========================================================================
  // 9. SPECIFICATIONS BLUEPRINT MODAL & REPLAY
  // =========================================================================
  function openModal() {
    specModal.classList.add('open');
  }

  function closeModal() {
    specModal.classList.remove('open');
  }

  if (finalExploreBtn) finalExploreBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (specModal) {
    specModal.querySelector('.spec-modal-backdrop').addEventListener('click', closeModal);
  }

  if (finalReplayBtn) {
    finalReplayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      isAutoplaying = true;
      autoplayDirection = 1;
      updateAutoplayUI();
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'BUTTON')) return;
      e.preventDefault();
      isAutoplaying = !isAutoplaying;
      updateAutoplayUI();
    } else if (e.code === 'Escape') {
      closeModal();
    } else if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
      window.scrollBy({ top: 120, behavior: 'smooth' });
    } else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
      window.scrollBy({ top: -120, behavior: 'smooth' });
    }
  });

  // =========================================================================
  // 10. INITIALIZATION
  // =========================================================================
  buildKeyboardVisualizer();
  resizeCanvas();
  startProgressivePreload();
  requestAnimationFrame(renderLoop);

})();
