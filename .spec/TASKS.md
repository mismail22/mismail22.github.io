# Night Shift — Implementation Tasks

## Phase 0: First-screen prototype gate

- [x] Three first-screen prototypes (Instrument, Night shift, Isometric) built, tested, and reviewed.
- [x] Direction chosen: Night shift. The fleet simulation was rejected as off-story; prototypes archived in a git stash.

## Phase 1: Foundation

- [x] Night shift tokens, type, global classes, and prose styles in `src/styles/global.css`.
- [x] Base layout with font preloads, JS / reduced-motion classes, and the no-motion fallback.
- [x] Navbar with icon links and a phone menu; footer; shared `SocialLinks`.

## Phase 2: Homepage

- [x] Positioning from evidence: "I turn manual operations into systems that scale."
- [x] Hero: identity, headline, three proof charts with keys, build-time career map, CTA, credentials.
- [x] Systems (three case visuals), Teams (growth and reliability charts), Beyond, Contact.

## Phase 3: Deep pages

- [x] `/work` index, `/work/[slug]` template, `/about` (with leadership phases), `/404`.
- [x] Architecture diagram restyled for the dark system.
- [x] Social preview image regenerated from the same map.

## Phase 4: Cleanup, specs, tests

- [x] Removed unused components, scripts, and fonts; lab prototypes archived in a git stash.
- [x] Rewrote acceptance tests for the new design (11 passing).
- [x] Rewrote PRD, DESIGN, and TASKS; added the delta.

## Previous direction (Infrastructure Field Manual, superseded)

- [x] Field Manual phases 1–4 completed earlier on 2026-10-05; replaced by Night shift. See `deltas/2026-10-05-field-manual-redesign.md`.

## Open

- [ ] Mohanad reviews the site in a browser at desktop and phone sizes.
- [ ] Decide the headline variant and the target title (`src/data/site.ts`).
- [ ] Optional: add a portrait or windsurfing photo; enable Browser Bridge for screenshot-based polish.
