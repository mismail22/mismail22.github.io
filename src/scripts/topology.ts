// Hero "fleet topology": a decorative canvas graph with packets flowing along
// links. Nodes near the cursor brighten and lean toward it. The loop runs only
// while the hero is on screen and the tab is visible; reduced-motion and
// save-data visitors get a single static frame.

type Node = { x: number; y: number; bx: number; by: number; r: number; energy: number; label?: string };
type Edge = { a: number; b: number };
type Packet = { edge: number; t: number; speed: number; forward: boolean };

const COLORS = {
  edge: [148, 163, 184],
  node: [230, 232, 235],
  accent: [52, 211, 153],
  signal: [94, 234, 212],
};

// Career sites anchor the graph (normalized coordinates on desktop).
const SITES = [
  { label: 'CAI · 2010', x: 0.58, y: 0.7 },
  { label: 'SIN · 2015', x: 0.74, y: 0.36 },
  { label: 'MPK · 2018', x: 0.88, y: 0.62 },
  { label: 'MPK · NOW', x: 0.8, y: 0.18 },
];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rgba = ([r, g, b]: number[], a: number) => `rgba(${r},${g},${b},${a})`;

export function initTopology(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const animate = !reduceMotion && !saveData;

  let width = 0;
  let height = 0;
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let adjacency: number[][] = [];
  let packets: Packet[] = [];
  let pointer = { x: -9999, y: -9999, active: false };
  let running = false;
  let visible = true;
  let frame = 0;
  let last = 0;

  function build() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    const desktop = width >= 768;
    const rand = mulberry32(7);
    const count = desktop ? 46 : 24;
    // Desktop keeps the left side calm for the headline.
    const minX = desktop ? 0.38 : 0.02;

    nodes = [];
    for (const site of SITES) {
      const x = desktop ? site.x : 0.15 + (site.x - 0.5) * 1.4;
      nodes.push({ x: x * width, y: site.y * height, bx: x * width, by: site.y * height, r: 2.6, energy: 0.6, label: site.label });
    }
    const cols = Math.ceil(Math.sqrt(count * (width / height)));
    const rows = Math.ceil(count / cols);
    for (let i = 0; nodes.length < count + SITES.length && i < cols * rows * 2; i++) {
      const cx = (i % cols) + 0.15 + rand() * 0.7;
      const cy = Math.floor(i / cols) % rows + 0.15 + rand() * 0.7;
      const nx = minX + (cx / cols) * (1 - minX - 0.02);
      const ny = 0.06 + (cy / rows) * 0.88;
      const x = nx * width;
      const y = ny * height;
      if (nodes.some((n) => Math.hypot(n.bx - x, n.by - y) < 48)) continue;
      nodes.push({ x, y, bx: x, by: y, r: 1.2 + rand() * 1.1, energy: 0 });
    }

    // Link each node to its nearest neighbours.
    const seen = new Set<string>();
    edges = [];
    adjacency = nodes.map(() => []);
    nodes.forEach((n, i) => {
      const nearest = nodes
        .map((m, j) => ({ j, d: Math.hypot(m.bx - n.bx, m.by - n.by) }))
        .filter((o) => o.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(0, 3);
      for (const { j, d } of nearest) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key) || d > Math.max(width, height) * 0.22) continue;
        seen.add(key);
        adjacency[i].push(edges.length);
        adjacency[j].push(edges.length);
        edges.push({ a: i, b: j });
      }
    });

    packets = Array.from({ length: desktop ? 22 : 10 }, () => ({
      edge: Math.floor(rand() * edges.length),
      t: rand(),
      speed: 0.12 + rand() * 0.22,
      forward: rand() > 0.5,
    }));
  }

  function step(dt: number) {
    // Nodes ease toward the cursor when it is near, then back home.
    for (const n of nodes) {
      const dx = pointer.x - n.bx;
      const dy = pointer.y - n.by;
      const d = Math.hypot(dx, dy);
      const pull = pointer.active && d < 160 ? (1 - d / 160) * 10 : 0;
      const tx = n.bx + (d ? (dx / d) * pull : 0);
      const ty = n.by + (d ? (dy / d) * pull : 0);
      n.x += (tx - n.x) * Math.min(1, dt * 6);
      n.y += (ty - n.y) * Math.min(1, dt * 6);
      n.energy = Math.max(n.label ? 0.6 : 0, n.energy - dt * 0.9);
    }

    for (const p of packets) {
      p.t += p.speed * dt;
      if (p.t < 1) continue;
      // Arrived: energize the node and hop to a random connected link.
      const edge = edges[p.edge];
      const at = p.forward ? edge.b : edge.a;
      nodes[at].energy = 1;
      const options = adjacency[at].filter((e) => e !== p.edge);
      const next = options.length ? options[Math.floor(Math.random() * options.length)] : p.edge;
      p.edge = next;
      p.forward = edges[next].a === at;
      p.t = 0;
    }
  }

  function draw() {
    ctx!.clearRect(0, 0, width, height);

    for (const e of edges) {
      const a = nodes[e.a];
      const b = nodes[e.b];
      const mx = (a.x + b.x) / 2 - pointer.x;
      const my = (a.y + b.y) / 2 - pointer.y;
      const near = pointer.active ? Math.max(0, 1 - Math.hypot(mx, my) / 200) : 0;
      ctx!.strokeStyle = near > 0 ? rgba(COLORS.accent, 0.08 + near * 0.3) : rgba(COLORS.edge, 0.09);
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(a.x, a.y);
      ctx!.lineTo(b.x, b.y);
      ctx!.stroke();
    }

    for (const p of packets) {
      const e = edges[p.edge];
      const from = nodes[p.forward ? e.a : e.b];
      const to = nodes[p.forward ? e.b : e.a];
      const x = from.x + (to.x - from.x) * p.t;
      const y = from.y + (to.y - from.y) * p.t;
      const tail = Math.max(0, p.t - 0.18);
      const tx = from.x + (to.x - from.x) * tail;
      const ty = from.y + (to.y - from.y) * tail;
      const gradient = ctx!.createLinearGradient(tx, ty, x, y);
      gradient.addColorStop(0, rgba(COLORS.signal, 0));
      gradient.addColorStop(1, rgba(COLORS.signal, 0.75));
      ctx!.strokeStyle = gradient;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(tx, ty);
      ctx!.lineTo(x, y);
      ctx!.stroke();
      ctx!.fillStyle = rgba(COLORS.signal, 0.95);
      ctx!.beginPath();
      ctx!.arc(x, y, 1.6, 0, Math.PI * 2);
      ctx!.fill();
    }

    ctx!.font = '500 10px "Geist Mono Variable", ui-monospace, monospace';
    for (const n of nodes) {
      const d = pointer.active ? Math.hypot(pointer.x - n.x, pointer.y - n.y) : 9999;
      const glow = Math.max(n.energy, d < 160 ? 1 - d / 160 : 0);
      if (glow > 0.05) {
        ctx!.fillStyle = rgba(COLORS.accent, glow * 0.18);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r + 6 * glow, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.fillStyle = glow > 0.05 ? rgba(COLORS.accent, 0.5 + glow * 0.5) : rgba(COLORS.node, 0.35);
      ctx!.beginPath();
      ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx!.fill();
      if (n.label && width >= 768) {
        ctx!.fillStyle = rgba(COLORS.node, 0.45);
        ctx!.fillText(n.label, n.x + 9, n.y + 3.5);
      }
    }
  }

  function loop(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    step(dt);
    draw();
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (running || !animate || !visible || document.hidden) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frame);
  }

  build();
  step(0);
  draw();
  canvas.classList.add('is-ready');
  if (!animate) return;

  const section = canvas.closest('section') ?? canvas;
  section.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
  });
  section.addEventListener('pointerleave', () => (pointer.active = false));

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  }).observe(canvas);

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  let resizeTimer = 0;
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      build();
      if (!running) draw();
    }, 150);
  }).observe(canvas);

  start();
}
