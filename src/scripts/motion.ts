// Shared motion: scroll reveals, count-up numbers, panel spotlight and the
// scroll progress bar. Everything degrades to static content when motion is
// reduced or JS is unavailable (values are server-rendered in final form).

import { formatValue } from '../lib/format';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Count-up -------------------------------------------------------------

function formatCount(el: HTMLElement, value: number) {
  el.textContent = formatValue(value, {
    prefix: el.dataset.prefix,
    suffix: el.dataset.suffix,
    decimals: Number(el.dataset.decimals ?? 0),
  });
}

function countUp(el: HTMLElement) {
  const to = Number(el.dataset.count);
  const from = Number(el.dataset.countFrom ?? 0);
  const duration = 1400;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 4);
    formatCount(el, from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counters = [...document.querySelectorAll<HTMLElement>('[data-count]')];

// --- Reveal ----------------------------------------------------------------

const revealables = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('is-in'));
} else {
  // Reset counters to their start value; they animate when revealed.
  counters.forEach((el) => formatCount(el, Number(el.dataset.countFrom ?? 0)));

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        if (el.hasAttribute('data-reveal')) el.classList.add('is-in');
        if (el.hasAttribute('data-count')) countUp(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revealables.forEach((el) => observer.observe(el));
  counters.forEach((el) => observer.observe(el));
}

// --- Panel spotlight (fine pointers only) ----------------------------------

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener(
    'pointermove',
    (event) => {
      const panel = (event.target as HTMLElement).closest<HTMLElement>('.panel');
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      panel.style.setProperty('--x', `${event.clientX - rect.left}px`);
      panel.style.setProperty('--y', `${event.clientY - rect.top}px`);
    },
    { passive: true },
  );
}

// --- Scroll progress -------------------------------------------------------

const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
if (progress) {
  let queued = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    queued = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}
