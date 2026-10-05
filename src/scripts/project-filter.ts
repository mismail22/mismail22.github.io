// Category filter for the project grid. Without JS every card stays visible.

const group = document.querySelector<HTMLElement>('[data-project-filter]');
const buttons = [...(group?.querySelectorAll<HTMLButtonElement>('button[data-filter]') ?? [])];
const cards = [...document.querySelectorAll<HTMLElement>('[data-project]')];
const count = document.querySelector<HTMLElement>('[data-project-count]');

function applyFilter(filter: string) {
  let visible = 0;
  for (const card of cards) {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
    if (show) visible++;
  }
  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  }
  if (count) count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
}

for (const button of buttons) {
  button.addEventListener('click', () => applyFilter(button.dataset.filter ?? 'all'));
}
