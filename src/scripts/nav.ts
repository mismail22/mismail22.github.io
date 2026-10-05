// Active-section highlighting and the mobile menu.

const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];

function setActive(id: string | null) {
  for (const link of links) {
    if (id && link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
}

// A section is "current" when it crosses a thin band just above the middle of
// the viewport. The hero (#top) has no nav link, so it clears the highlight.
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) setActive(entry.target.id);
    }
  },
  { rootMargin: '-40% 0px -55% 0px' },
);
sections.forEach((section) => observer.observe(section));

// The last section may be too short to reach the band, so pin it at the bottom.
let ticking = false;
window.addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && sections.length) setActive(sections[sections.length - 1].id);
      ticking = false;
    });
  },
  { passive: true },
);

// Mobile menu
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');

function setMenu(open: boolean) {
  if (!toggle || !menu) return;
  menu.classList.toggle('hidden', !open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  toggle.querySelector('[data-icon-open]')?.classList.toggle('hidden', open);
  toggle.querySelector('[data-icon-close]')?.classList.toggle('hidden', !open);
}

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
window.matchMedia('(min-width: 48rem)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});
