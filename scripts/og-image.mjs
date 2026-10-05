// One-off generator for public/og-image.png (1200x630 social preview).
// Run after changing your name or headline: node scripts/og-image.mjs
import sharp from 'sharp';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="#ffffff" stroke-opacity="0.04"/>
    </pattern>
    <radialGradient id="glow" cx="85%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#07080a"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g stroke="#94a3b8" stroke-opacity="0.16">
    <line x1="820" y1="120" x2="960" y2="210"/><line x1="960" y1="210" x2="1080" y2="150"/>
    <line x1="960" y1="210" x2="900" y2="340"/><line x1="900" y1="340" x2="1060" y2="390"/>
    <line x1="1080" y1="150" x2="1060" y2="390"/><line x1="820" y1="120" x2="900" y2="340"/>
  </g>
  <g stroke="#5eead4" stroke-opacity="0.8" stroke-width="2"><line x1="960" y1="210" x2="1010" y2="185"/><line x1="900" y1="340" x2="960" y2="358"/></g>
  <g fill="#34d399"><circle cx="820" cy="120" r="5"/><circle cx="960" cy="210" r="7"/><circle cx="1080" cy="150" r="5"/><circle cx="900" cy="340" r="5"/><circle cx="1060" cy="390" r="6"/></g>
  <circle cx="92" cy="122" r="6" fill="#34d399"/>
  <text x="110" y="129" font-family="Menlo, monospace" font-size="20" letter-spacing="3" fill="#34d399">OPEN TO INFRASTRUCTURE LEADERSHIP ROLES</text>
  <text x="84" y="268" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="104" font-weight="700" letter-spacing="-4" fill="#e6e8eb">Mohanad Ismail</text>
  <text x="88" y="340" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="38" fill="#e6e8eb">I build engineering organizations,</text>
  <text x="88" y="390" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="38" fill="#9aa1ab">and the infrastructure platforms they run.</text>
  <rect x="84" y="470" width="1032" height="76" rx="16" fill="#0c0e11" stroke="#1d2126"/>
  <g font-family="Menlo, monospace" font-size="22" fill="#9aa1ab">
    <text x="116" y="516">ORG <tspan fill="#e6e8eb">5 → 24 eng</tspan></text>
    <text x="400" y="516">FLEET <tspan fill="#e6e8eb">$7B</tspan></text>
    <text x="620" y="516">AVAIL <tspan fill="#e6e8eb">99%</tspan></text>
    <text x="840" y="516">MBA <tspan fill="#34d399">HONORS</tspan></text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og-image.png', import.meta.url).pathname);
console.log('Wrote public/og-image.png');
