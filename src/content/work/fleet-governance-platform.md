---
title: Fleet Governance Platform
tagline: A live source of truth with guarded bulk operations for a multi-billion-dollar rack inventory
summary: Replaced manual processes and lagging batch analytics with a platform that operations and finance trust for destructive, high-value decisions across a multi-billion-dollar data-center rack inventory.
role: Tech lead and architect
period: 2024 – present
stack: [Hack/PHP, React, GraphQL, SQL, Python, LLM agents]
metrics:
  - { value: '81 → 10', label: 'days per disposal cycle' }
  - { value: '27,000+', label: 'racks in the first guarded sweep' }
  - { value: '100s of $M', label: 'assets rebalanced' }
  - { value: '9-figure', label: 'aging inventory reduced (est.)' }
tldr:
  - Built one live source of truth for a multi-billion-dollar rack inventory, shared by operations and finance.
  - Every destructive action runs through a guarded CLI and leaves an audit trail designed with finance.
  - Disposal cycle cut from 81 to 10 days; the first guarded sweep covered 27,000+ racks.
decisions:
  - title: Compute on read over a nightly batch
    alternative: A batch data-warehouse table refreshed nightly, which would have shipped faster.
    why: Operations and finance make decisions on the current state of each rack. Results computed from live data, filtered at the source, keep everyone on the same numbers.
    tradeoff: More operational complexity in the serving path than a nightly job.
  - title: Guardrails as a product feature
    why: Bulk actions move or dispose of high-value hardware. The CLI requires a confirm flag, caps batches (default 50, max 500), enforces mandatory filters, and skips racks above a value threshold, with a preview before anything executes.
  - title: Filter at the source, not in the app
    alternative: Load the full rack fleet and filter in application code.
    why: Passing data-center and serial filters down to the inventory source avoids loading the whole fleet for small requests; small serial sets also filter the active-intent records at the source.
    tradeoff: More query paths to test; rolled out behind a flag to 100% before removing it.
  - title: Migrate without breaking consumers
    why: 3.9M rows of legacy pipelines moved into managed daily jobs with 100% primary-key parity, and 9+ downstream consumers were redirected before anything was turned off.
pullQuote: Keys are the one decision that gets more expensive every week.
lesson: To ship the MVP fast, several entities kept their legacy identifiers. It was the right call for speed, but it bought a migration later. Four entity types moved onto platform-native keys, with a pre-migration audit, an ID-map table, and a flag-gated read path so consumers never broke. Now I decide canonical identity before the first table ships, even when everything else is allowed to be rough.
diagram:
  nodes:
    - { id: inv, label: Inventory records, col: 0, row: 0, kind: source }
    - { id: fin, label: Book value & finance, col: 0, row: 1, kind: source }
    - { id: site, label: Site & warehouse data, col: 0, row: 2, kind: source }
    - { id: rt, label: Compute on read, sub: filters pushed to source, col: 1, row: 1, callout: 1 }
    - { id: ui, label: UI · CLI · LLM agent, sub: one tool layer, col: 2, row: 0, kind: surface }
    - { id: policy, label: Intent & policy engine, col: 2, row: 1 }
    - { id: dash, label: Exec health dashboard, col: 2, row: 2, kind: surface }
    - { id: guard, label: Guardrail gate, sub: confirm · caps · filters · value, col: 3, row: 1, kind: guard, callout: 2 }
    - { id: act, label: Bulk actions, sub: dispose · rebalance, col: 4, row: 0, kind: target }
    - { id: audit, label: Audit trail, sub: designed with finance, col: 4, row: 2, kind: target }
  edges:
    - [inv, rt]
    - [fin, rt]
    - [site, rt]
    - [rt, policy]
    - [ui, policy]
    - [rt, dash]
    - [policy, guard]
    - [guard, act]
    - [guard, audit]
order: 1
---

## Problem

A multi-billion-dollar data-center rack inventory was managed through manual processes and batch analytics that lagged reality. A single disposal cycle took **81 days**. Edge deployment, inventory operations, finance, and data-science teams each worked from their own copy of the truth.

## Constraints

- **Finance-grade numbers.** Book-value figures had to be trustworthy, and the audit trail was designed with finance to SOX audit requirements.
- **Destructive, high-value operations.** One bad bulk action could move or dispose of a lot of expensive hardware.
- **Live legacy consumers.** Old pipelines had unowned tables and downstream dependents that could not break.
- **Ship an MVP fast.** The platform had to start changing decisions early, then grow.

## Architecture

Inventory, financial, and site data feed a **compute-on-read layer** that filters at the source. Above it, an **intent and policy engine** decides what should happen to each rack (store, deploy, or dispose). Every action passes a **guardrail gate** and writes to an **audit trail**. Operators reach the same core through a web UI, a CLI, an LLM agent, and an executive health dashboard. All four share one tool layer, so there is one set of rules.

A bulk operation looks like this (illustrative values):

```text
$ fleet intent set --intent dispose \
    --site <dc> --rack-type <type> --min-age-months 48 \
    --value-max <threshold> --batch-limit 50
Preview: 50 of 312 matching racks (sorted by age)
  RACK         SITE   AGE   VALUE   CURRENT → NEW
  R-0x1a…      dc-a   61m   low     store   → dispose
  …
Refusing to run without --confirm.
```

## Hard bugs worth telling

- **64-bit IDs and JavaScript numbers.** An ID was round-tripped through `parseInt` in the UI, silently losing precision beyond `Number.MAX_SAFE_INTEGER`. IDs now stay strings end to end.
- **The migration that expired everything.** A `NOT NULL DEFAULT 0` backfill turned "no expiry" into "expired in 1970", inflating violation counts and scheduling jobs early. The column became nullable, with zero-guards and write-time invariants.
- **Data that lands a day late.** A pipeline read today's partition from an upstream source that lands a day behind. It now reads the latest landed day.

## Results

- Disposal cycle cut from **81 to 10 days**.
- First guarded bulk sweep covered **27,000+ racks**.
- **Hundreds of millions of dollars** in assets rebalanced, freeing 1,000–2,500 pallet spaces.
- An estimated **nine-figure** reduction in aging inventory.
- **20 hours a month** handed back to field-deployment teams.

## My role

Tech lead and architect. I partnered with edge deployment, inventory operations, finance, and data-science teams on requirements, designed the system, and built across the stack: UI, APIs, CLI, pipelines, and the agent.
