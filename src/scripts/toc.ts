// Case-study table of contents: highlights the section being read.

const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
const targets = [...document.querySelectorAll<HTMLElement>('.prose-cp h2[id], section[data-toc-target]')];

function setActive(id: string) {
  for (const link of links) {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
}

if (links.length && targets.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    },
    // Active once a heading passes the top third of the viewport.
    { rootMargin: '-15% 0px -70% 0px' },
  );
  targets.forEach((t) => observer.observe(t));
}

export {};
