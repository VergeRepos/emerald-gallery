(function () {
  'use strict';

  const SLIDES  = document.querySelectorAll('.slide');
  const TOTAL   = SLIDES.length;

  function preloadNext(i) {
    const nextIndex = (i + 1) % TOTAL;
    const nextSlide = SLIDES[nextIndex];
    const img = nextSlide.querySelector('.slide__image');
    if (!img) return;
    const preload = new Image();
    preload.src = img.getAttribute('src');
    preload.alt = img.getAttribute('alt') || '';
  }

  const progressContainer = document.createElement('div');
  progressContainer.className = 'slideshow__progress-bar';
  progressContainer.setAttribute('aria-label', 'Slide progress');
  progressContainer.setAttribute('role', 'progressbar');
  progressContainer.setAttribute('aria-valuemin', '1');
  progressContainer.setAttribute('aria-valuemax', String(TOTAL));

  const dots = [];
  for (let i = 1; i <= TOTAL; i++) {
    const dot = document.createElement('button');
    dot.className = 'slideshow__progress-dot';
    dot.setAttribute('aria-label', `Go to slide ${i}`);
    dot.setAttribute('aria-current', 'false');
    dot.addEventListener('click', () => goTo(i - 1));
    dots.push(dot);
    progressContainer.appendChild(dot);
  }
  document.body.appendChild(progressContainer);

  let current  = 0;
  let playing  = true;
  let timer    = null;
  const AUTO_MS = 2000;

  let controlsHidden = false;
  const HIDE_DELAY = 3000;
  const showTimer = setTimeout(() => { controlsHidden = true; updateControls(); }, HIDE_DELAY);

  function updateControls() {
    document.body.classList.toggle('controls-hidden', controlsHidden);
  }

  function render(i) {
    for (let idx = 0; idx < TOTAL; idx++) {
      const s = SLIDES[idx];
      s.classList.toggle('is-active', idx === i);
    }
    dots.forEach((d, idx) => {
      d.classList.toggle('is-active', idx === i);
      d.setAttribute('aria-current', idx === i ? 'true' : 'false');
    });
    progressContainer.setAttribute('aria-valuenow', String(i + 1));
    current = i;
  }

  function goTo(i) {
    current = i;
    render(current);
    preloadNext(current);
    if (timer) clearTimeout(timer);
    if (playing) timer = setTimeout(() => next(), AUTO_MS);
  }

  function next() {
    const next = (current + 1) % TOTAL;
    goTo(next);
  }

  render(0);
  preloadNext(0);

  timer = setTimeout(() => next(), AUTO_MS);

  document.addEventListener('click', () => {
    if (controlsHidden) {
      controlsHidden = false;
      updateControls();
      clearTimeout(showTimer);
      setTimeout(() => { controlsHidden = true; updateControls(); }, HIDE_DELAY);
    }
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'p' || e.key === 'P' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      playing = !playing;
      if (playing) {
        timer = setTimeout(() => next(), AUTO_MS);
        controlsHidden = false;
      } else {
        if (timer) clearTimeout(timer);
        controlsHidden = false;
        updateControls();
        showPauseHint();
      }
    }

    if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { goTo((current - 1 + TOTAL) % TOTAL); e.preventDefault(); }
  });

  let sx = 0, sy = 0, tracking = false;
  document.body.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true; }
  }, { passive: true });
  document.body.addEventListener('touchend', (e) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else goTo((current - 1 + TOTAL) % TOTAL);
    }
  }, { passive: true });

  function showPauseHint() {
    let hint = document.querySelector('.hint-overlay');
    if (!hint) {
      hint = document.createElement('div');
      hint.className = 'hint-overlay';
      hint.textContent = 'PAUSED — Press P or Space to resume';
      document.body.appendChild(hint);
    }
    hint.classList.add('is-visible');
    setTimeout(() => hint.classList.remove('is-visible'), 1800);
  }

})();
