// Active-section LED in the nav and the mobile menu.

const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];

// Sections can share a nav item via data-nav-group (e.g. the team story
// belongs to "Leadership").
const groupOf = (section: Element) => (section as HTMLElement).dataset.navGroup ?? section.id;

// Desktop: a pill slides under the active link.
const pill = document.querySelector<HTMLElement>('[data-nav-pill]');
const pillList = pill?.parentElement;

function movePill(target: HTMLAnchorElement | undefined) {
  if (!pill || !pillList) return;
  if (!target || !pillList.contains(target)) {
    pill.style.opacity = '0';
    return;
  }
  pill.style.width = `${target.offsetWidth}px`;
  pill.style.transform = `translateX(${target.offsetLeft}px)`;
  pill.style.opacity = '1';
}

function setActive(id: string | null) {
  let desktopTarget: HTMLAnchorElement | undefined;
  for (const link of links) {
    if (id && link.hash === `#${id}`) {
      link.setAttribute('aria-current', 'true');
      if (pillList?.contains(link)) desktopTarget = link;
    } else link.removeAttribute('aria-current');
  }
  movePill(desktopTarget);
}

// A section is "current" when it crosses a thin band just above the middle of
// the viewport. The hero (#top) has no nav link, so it clears the highlight.
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) setActive(groupOf(entry.target));
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
      if (atBottom && sections.length) setActive(groupOf(sections[sections.length - 1]));
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
window.matchMedia('(min-width: 64rem)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});

export {};
