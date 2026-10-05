// Team-building story: as each milestone scrolls through the middle of the
// viewport, the org chart lights up to that milestone's headcount. Without JS
// (or with reduced motion) the final, fully grown org is shown.

const visual = document.querySelector<HTMLElement>('[data-org]');
const steps = [...document.querySelectorAll<HTMLElement>('[data-org-step]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll-linked only on wide screens, where the chart stays pinned beside the steps.
const wide = window.matchMedia('(min-width: 64rem)').matches;

if (visual && steps.length && wide && !reduceMotion && 'IntersectionObserver' in window) {
  const nodes = [...visual.querySelectorAll<SVGElement>('[data-node]')];
  const links = [...visual.querySelectorAll<SVGElement>('[data-link]')];
  const counter = visual.querySelector<HTMLElement>('[data-org-count]');
  const phase = visual.querySelector<HTMLElement>('[data-org-phase]');

  const show = (step: HTMLElement) => {
    const headcount = Number(step.dataset.headcount);
    nodes.forEach((node) => node.classList.toggle('is-on', Number(node.dataset.node) < headcount));
    links.forEach((link) => link.classList.toggle('is-on', Number(link.dataset.link) < headcount));
    steps.forEach((s) => s.toggleAttribute('data-active', s === step));
    if (counter) counter.textContent = String(headcount).padStart(2, '0');
    if (phase) phase.textContent = step.dataset.phase ?? '';
  };

  show(steps[0]);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) show(entry.target as HTMLElement);
      }
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  steps.forEach((step) => observer.observe(step));
}
