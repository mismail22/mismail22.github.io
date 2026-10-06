## Critical Instructions

1. Read `.spec/DESIGN.md` before implementation work.
2. Check `.spec/TASKS.md` and mark completed tasks immediately.
3. Add material discovered work to `.spec/TASKS.md`.
4. `.spec/PRD.md` is the product source of truth.
5. This project has no external API contract; `.spec/CONTRACTS.md` is intentionally absent.

## Project Guidance

- Design for the 30-second visitor: the first screen must carry identity, the claim, proof, the career route, and contact without scrolling.
- Lead with what the evidence shows in every era: turning manual operations into systems that scale. Leadership is strong supporting proof.
- Use the Night shift system: near-black background, warm off-white ink, one amber signal, Archivo condensed display, Geist Mono labels.
- Show, don't tell. Every homepage section leads with a visual, and every visual explains its own marks (for example, "1 tick = 1 day").
- Do not add decorative motion, animated KPI counters, glass surfaces, bento grids, or visuals unrelated to his story.
- LinkedIn and GitHub stay icon links with accessible names.
- Keep prominent metrics qualified (measured, estimated, scope); the case pages carry full qualifiers.
- Preserve static output, case-study URLs, semantic HTML, reduced motion, no-JS final states, and public-content safety.
- Do not invent achievements, testimonials, contact details, artifacts, or precision.
- Do not export specs to Google Docs; repository documents are authoritative.

## Verification

1. `npm run check`
2. `npm run build`
3. `npm test`
4. `npm run audit`
5. Verify `/`, `/work`, `/about`, `/work/*`, `/404`, and `/evidence` locally at desktop and phone widths.
