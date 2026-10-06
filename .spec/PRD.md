# Night Shift — Product Requirements Document

## Overview

The portfolio presents Mohanad Ismail as an infrastructure engineer who turns manual operations into systems that scale: 16 years from operating a national mobile network in Cairo to network and fleet automation at Meta, with team leadership as strong supporting proof. It is built for a visitor who stays 30 seconds and does not read paragraphs.

## Problem Statement

**Current State:** Three earlier designs were rejected: a dark developer dashboard, a warm editorial "Field Manual", and a first-screen fleet simulation. They were text-heavy, generic, or about a narrow outcome rather than about him.

**Desired State:** A dark, cinematic, visual-first site whose first screen alone tells who he is, what he excels at, and how to reach him. Depth stays one click away.

**Gap:** A personal visual story (his career route), self-explaining data visuals, and one consistent design across every page.

## Goals

1. The first screen delivers the whole impression at 1440×900 and 390×844 without scrolling.
2. Lead with what the evidence shows he excels at, in every era: turning manual operations into systems.
3. Show, don't tell: each homepage section leads with a visual, and every visual explains its own marks.
4. Redesign the whole experience (home, work, case studies, about, 404) in one system.
5. Keep every number defensible, with an adjacent qualifier.

## Non-Goals

- Animated KPI counters, decorative motion, or simulations unrelated to his story.
- A client-side framework, CMS, or external scripts.
- Inventing achievements, testimonials, contact details, or precision.
- Publishing, committing, or pushing without a separate request.

## User Stories

- As a recruiter, in 30 seconds I learn his name, role, claim, three outcomes, his career route, and how to contact him.
- As a hiring manager, I can open a case study and see decisions, tradeoffs, and qualified outcomes.
- As Mohanad, I can update content in `src/data/` and `src/content/work/` without touching components.

## Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-1 | Hero shows identity, the headline, three proof charts, the career route, a CTA, and icon links. | Must | All visible without scrolling at 1440×900; on phones the CTA may sit just below the route. |
| FR-2 | Career route on a dotted world map generated at build time. | Must | Cairo → Singapore → Menlo Park, each with years, employer, and what he did there; no client JavaScript. |
| FR-3 | Proof charts say what one mark means. | Must | Keys such as "1 tick = 1 day"; each number carries a short qualifier. |
| FR-4 | Systems section: three case studies, each led by a visual. | Must | Governing loop, polling-vs-wake race, and SQL defect diff; links to case pages. |
| FR-5 | Teams section: 5 → 24 growth and reliability outcomes as charts. | Must | Team grid plus SLA-vs-target, partner participation, and self-handled incident bars. |
| FR-6 | LinkedIn and GitHub are icon links. | Must | Accessible names and tooltips; used in the nav, hero, contact, and footer. |
| FR-7 | Work index, case pages, About, and 404 use the same system. | Must | Shared tokens, type, and components; case URLs unchanged. |
| FR-8 | Case pages keep provenance. | Must | Outcomes with evidence type and qualifier, sanitized diagram, decision ledger, reflection. |
| FR-9 | `/evidence` redirects to `/work`. | Must | Old links resolve. |
| FR-10 | Résumé and email controls stay hidden until provided. | Must | No empty controls render. |

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| No JavaScript | Every visual renders in its final state; navigation works. |
| Reduced motion | No animation; final states only. |
| Script fails to load | After 2.5 s the `no-motion` class shows everything. |
| Narrow phone | Map captions become a numbered route list; proof charts become rows. |

## Non-Functional Requirements

| ID | Category | Target |
|----|----------|--------|
| NFR-1 | Quality | Type check, build, tests, and content audit pass with zero failures. |
| NFR-2 | Text budget | Homepage under 700 words in total; headlines of 8 words or fewer. |
| NFR-3 | Performance | Static output; no external scripts; homepage under ~25 KB of gzipped HTML. |
| NFR-4 | Accessibility | Landmarks, skip link, keyboard focus, AA contrast, text alternatives for visuals. |

## Constraints and Assumptions

- Astro 7, Tailwind CSS 4, TypeScript, static output; `dotted-map` runs only at build time.
- Public-safe wording; the content audit stays mandatory.
- The headline uses evidence common to every era. The résumé line "I build organizations and systems that scale" is a one-line alternative in `src/data/site.ts`.
- The target title is undecided; the status line reads "Open to Staff+ and engineering leadership roles in infrastructure".
