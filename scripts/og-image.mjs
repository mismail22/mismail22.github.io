// One-off generator for public/og-image.png (1200x630 social preview).
// Run after changing your name or headline: node scripts/og-image.mjs
import sharp from 'sharp';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.05"/>
    </pattern>
    <radialGradient id="glow" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#09090b"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <circle cx="96" cy="152" r="7" fill="#34d399"/>
  <text x="116" y="160" font-family="Menlo, monospace" font-size="24" fill="#a1a1aa">Menlo Park, CA · Open to infrastructure leadership roles</text>
  <text x="88" y="300" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="96" font-weight="700" fill="#e4e4e7">Mohanad Ismail</text>
  <text x="90" y="370" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="36" fill="#a1a1aa">Engineering leader building infrastructure</text>
  <text x="90" y="418" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="36" fill="#a1a1aa">organizations and platforms that scale.</text>
  <text x="90" y="530" font-family="Menlo, monospace" font-size="26" fill="#34d399">Infrastructure · Platforms · Reliability · Applied AI</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og-image.png', import.meta.url).pathname);
console.log('Wrote public/og-image.png');
