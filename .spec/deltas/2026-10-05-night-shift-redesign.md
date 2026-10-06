# Delta — Night Shift Redesign

**Date:** 2026-10-05

## Affected Specs

- `.spec/PRD.md`
- `.spec/DESIGN.md`
- `.spec/TASKS.md`
- `.llms/rules/spec-driven-development.md`

## Before

The Infrastructure Field Manual: warm paper, serif type, text-led editorial sections. The homepage had 938 words and one diagram. The positioning was "Principal / Staff Infrastructure Platform Engineer" with leadership as a side note.

## After

Night shift: dark, cinematic, visual-first. The first screen covers identity, the headline "I turn manual operations into systems that scale", three self-explaining proof charts, and the Cairo → Singapore → Menlo Park route on a build-time dotted map. Every page uses the same system. LinkedIn and GitHub are icon links.

## Rationale

Mohanad rejected the earlier designs as text-heavy and not about him. He chose Night shift from three clickable prototypes and asked for the whole experience to be redesigned. His career record shows one through-line in every era: turning manual operations into governed systems.

## Impact

Every page, the global styles, the tests, the social image, and the dependencies changed:
- Added: `dotted-map` and `@fontsource-variable/archivo`.
- Removed: Newsreader, Geist (sans), Instrument Sans, and Lucide.

Content facts and case URLs did not change. The Field Manual components and the lab prototypes are archived in a git stash.
