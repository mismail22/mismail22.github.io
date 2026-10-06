# Night Shift — Technical Design

## Architecture

Static Astro site. Content lives in `src/data/` (JSON plus `site.ts`) and `src/content/work/` (Markdown case studies). Visuals are SVG or HTML rendered at build time in their final state. One small inline module (`src/scripts/motion.ts`) adds scroll reveals, play-once visuals (`[data-viz]` → `.played`), and the phone menu.

## Visual System

- Color: background `#0A0B0D`, surfaces `#111317` / `#16181D`, lines `#23262B` / `#3B3F46`, ink `#F2F1EC`, secondary `#C3C2BB`, muted `#8A8C91`, one amber signal `#FFB020`. The tokens are in `src/styles/global.css`.
- Type: Archivo Variable, condensed (70–76%) and heavy for display, normal width for reading. Geist Mono for labels, keys, and code.
- Global classes: `.wrap`, `.eyebrow`, `.meta`, `.display-l|m|s`, `.lead`, `.btn`, `.link-arrow`, `.evidence`, `.prose-night`.
- Motion: purposeful and play-once. Reduced motion and no-JavaScript both show final states.

## Components

- `components/home/`: `Hero` (identity, headline, `Proof`, `JourneyMap`, CTA, `Credibility`), `Systems`, `Teams`, `Beyond`.
- `components/viz/`:
  - `JourneyMap`: build-time dotted map, Robinson projection centered on 115°E.
  - `Proof`, with `ProofTicks`, `ProofShrink`, and `ProofTeam`.
  - `GoverningLoop`, `LaneRace`, `SqlDiff`, `TeamGrid`, `MeterBar`.
- Shared: `Navbar`, `Footer`, `SocialLinks` (icon links), `Contact`, `Credibility`, `ui/ArchDiagram`, `ui/BrandIcon`, `ui/CompanyLogo`.

## Routes

- `/`: Hero → Systems → Teams → Beyond → Contact.
- `/work`: three case cards with compact architecture diagrams, then other projects.
- `/work/[slug]`:
  - header and facts
  - outcomes band (value, evidence type, qualifier)
  - three-line summary
  - sanitized diagram with a key
  - write-up
  - decision ledger
  - reflection
  - next case
- `/about`: four-chapter timeline, experience by employer, leadership phases, principles, capabilities with evidence, education, windsurfing.
- `/404`: "No route to host". `/evidence` redirects to `/work`.

## Responsive, Accessibility, and Failure Behavior

- Hero budget at 1440×900: nav 60 + header block ~290 + map ≤ 380 (height-capped by `--map-maxh`) + actions ~66.
- Under 900px, map captions become a visible route list. Under 640px, proof charts become rows.
- Every visual has a text equivalent (figcaption, labels, or a screen-reader route list). Icon links have accessible names.
- The inline head script sets `js`/`rm` classes and a 2.5 s `no-motion` fallback.

## Verification

`npm run check`, `npm run build`, `npm test`, `npm run audit`. The engine and markup are also checked in jsdom (reveals, viz, menu, reduced motion).
