// Social preview (1200×630): the headline over the same dotted career-route
// map the homepage uses. Run with `npm run og` after changing the headline.
import DottedMap from 'dotted-map';
import sharp from 'sharp';

const W = 1200;
const H = 630;
const INK = '#F2F1EC';
const MUTED = '#8A8C91';
const SIGNAL = '#FFB020';
const BG = '#0A0B0D';

const stops = [
  { key: 'cairo', lat: 30.04, lng: 31.24, name: 'CAIRO' },
  { key: 'singapore', lat: 1.35, lng: 103.82, name: 'SINGAPORE' },
  { key: 'menlo', lat: 37.45, lng: -122.18, name: 'MENLO PARK' },
];
const map = new DottedMap({ height: 72, grid: 'diagonal', projection: { name: 'robinson', center: { lat: 0, lng: 115 } } });
stops.forEach((stop) => map.addPin({ lat: stop.lat, lng: stop.lng, data: stop.key }));
map.addPin({ lat: 62, lng: 115, data: 'top' });
map.addPin({ lat: -37, lng: 115, data: 'bottom' });
const points = map.getPoints();
const pin = (key) => points.find((point) => point.data === key);
const top = pin('top').y;
const bottom = pin('bottom').y;
const gridW = Math.max(...points.map((point) => point.x)) + 1;

// Fit the map into the lower part of the card.
const box = { x: 40, y: 250, w: W - 80, h: 360 };
const scale = Math.min(box.w / gridW, box.h / (bottom - top));
const ox = box.x + (box.w - gridW * scale) / 2;
const oy = box.y + (box.h - (bottom - top) * scale) / 2 - top * scale;
const px = (point) => [ox + point.x * scale, oy + point.y * scale];
const r = (n) => Math.round(n * 10) / 10;

const land = points
  .filter((point) => !point.data && point.y >= top && point.y <= bottom)
  .map((point) => {
    const [x, y] = px(point);
    return `M${r(x)} ${r(y)}h0`;
  })
  .join('');
const cities = stops.map((stop) => px(pin(stop.key)));
const arc = ([ax, ay], [bx, by], lift) => `M${r(ax)} ${r(ay)}Q${r((ax + bx) / 2)} ${r((ay + by) / 2 - lift)} ${r(bx)} ${r(by)}`;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <path d="${land}" fill="none" stroke="#2B2E34" stroke-width="${r(scale * 0.58)}" stroke-linecap="round"/>
  <path d="${arc(cities[0], cities[1], 70)}" fill="none" stroke="${SIGNAL}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="${arc(cities[1], cities[2], 105)}" fill="none" stroke="${SIGNAL}" stroke-width="2.5" stroke-linecap="round"/>
  ${cities.map(([x, y]) => `<circle cx="${r(x)}" cy="${r(y)}" r="13" fill="rgba(255,176,32,0.16)" stroke="rgba(255,176,32,0.55)"/><circle cx="${r(x)}" cy="${r(y)}" r="5" fill="${SIGNAL}"/>`).join('')}
  ${cities.map(([x, y], i) => `<text x="${r(x)}" y="${r(y + 34)}" text-anchor="middle" font-family="Menlo, monospace" font-size="13" letter-spacing="2" fill="${MUTED}">${stops[i].name}</text>`).join('')}
  <text x="64" y="92" font-family="Menlo, monospace" font-size="16" letter-spacing="3" fill="${SIGNAL}">MOHANAD ISMAIL · INFRASTRUCTURE PLATFORMS &amp; AUTOMATION</text>
  <text x="60" y="178" font-family="Avenir Next Condensed, Arial Narrow, sans-serif" font-weight="800" font-size="76" letter-spacing="-0.5" fill="${INK}">I TURN MANUAL OPERATIONS</text>
  <text x="60" y="252" font-family="Avenir Next Condensed, Arial Narrow, sans-serif" font-weight="800" font-size="76" letter-spacing="-0.5" fill="${INK}">INTO SYSTEMS THAT SCALE.</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og-image.png', import.meta.url).pathname);
console.log('Wrote public/og-image.png');
