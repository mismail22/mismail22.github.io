// Site-wide progressive enhancement. Everything renders complete without this
// script; it only adds scroll reveals, play-once visuals, and the phone menu.

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canObserve = 'IntersectionObserver' in window;

// [data-reveal]: fade up once on first view.
const revealables = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
if (reducedMotion || !canObserve) {
  revealables.forEach((element) => element.classList.add('is-in'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revealables.forEach((element) => observer.observe(element));
}

// [data-viz]: data visuals animate to their final state once, when seen.
// Their static markup already shows that final state.
const visuals = [...document.querySelectorAll<HTMLElement>('[data-viz]')];
if (reducedMotion || !canObserve) {
  visuals.forEach((element) => element.classList.add('played', 'instant'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        window.setTimeout(() => element.classList.add('played'), Number(element.dataset.delay ?? 0));
      }
    },
    { threshold: 0.3 },
  );
  visuals.forEach((element) => observer.observe(element));
}

// Phone menu
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
const setMenu = (open: boolean) => {
  if (!toggle || !menu) return;
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu?.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});
window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});

root.setAttribute('data-motion', 'ready');

export {};
