---
title: Fleet Governance Platform
tagline: A real-time source of truth with guardrailed bulk operations
summary: Replaced manual processes and lagging batch analytics with a live platform that operations and finance trust for destructive, high-value decisions across $7B+ in data-center rack assets.
role: Tech lead and architect
period: 2024 – present
stack: [React, GraphQL, PHP/Hack, SQL, Pipeline orchestration, LLM tooling]
metrics:
  - { value: '81 → 10', label: 'days per disposal cycle' }
  - { value: '27,000+', label: 'racks in the first bulk sweep' }
  - { value: '$300M+', label: 'assets rebalanced' }
  - { value: '$100–200M', label: 'aging inventory reduced (est.)' }
diagram:
  nodes:
    - { id: inv, label: Inventory records, col: 0, row: 0, kind: source }
    - { id: fin, label: Book value & finance, col: 0, row: 1, kind: source }
    - { id: site, label: Site & warehouse data, col: 0, row: 2, kind: source }
    - { id: rt, label: Real-time compute, sub: live · sub-second, col: 1, row: 1 }
    - { id: ui, label: UI · CLI · LLM agent, sub: one tool layer, col: 2, row: 0, kind: surface }
    - { id: policy, label: Intent & policy engine, col: 2, row: 1 }
    - { id: dash, label: Exec health dashboard, col: 2, row: 2, kind: surface }
    - { id: guard, label: Guardrail gate, sub: confirm · caps · filters · VaR, col: 3, row: 1, kind: guard }
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

More than $7B in data-center rack assets was managed through manual processes and batch analytics that lagged reality. A single disposal cycle took **81 days**. Edge deployment, inventory operations, finance, and data-science teams each worked from their own copy of the truth.

## Constraints

- **Finance-grade numbers.** Book-value figures had to be trustworthy and every action had to leave an audit trail.
- **Destructive, high-value operations.** One bad bulk action could move or dispose of millions of dollars of hardware.
- **Live legacy consumers.** Old pipelines had unowned tables and downstream dependents that could not break.
- **Ship an MVP fast.** The platform had to start changing decisions early, then grow.

## Architecture

Live operational and financial sources feed a **real-time compute layer**. Above it, an **intent and policy engine** decides what should happen to each rack. Every action, whether disposition or rebalance, passes a **guardrail gate** and writes to an **audit trail**. Operators reach the same core through a web UI, a CLI, an LLM agent, and an executive health dashboard. All four share one tool layer, so there is one set of rules.

## Key decisions

1. **Real-time over batch.** Queries compute from live data in under a second. That costs more operational complexity than a nightly job, but a platform that finance can't query at decision speed is just a report.
2. **Guardrails as a feature.** Confirm flags, batch-size caps, mandatory filters, and value-at-risk thresholds are built into the CLI and the workflows. The design assumes someone will eventually run the wrong command.
3. **Audit trail from day one.** Controls were designed alongside finance rather than added after an audit asked for them.
4. **Migrate without breaking consumers.** 3.9M rows of legacy pipelines moved into managed daily anomaly-detection jobs with 100% primary-key parity, and 9+ downstream consumers were redirected. A flag-gated plan moves four legacy entity types onto platform-native keys.
5. **One tool layer, many surfaces.** Because the agent calls the same guarded commands as people, a 9-tool LLM agent shipped into the UI in one week.

## Results

- Disposal cycle cut from **81 to 10 days**.
- First guardrailed bulk sweep covered **27,000+ racks**.
- **$300M+** in assets rebalanced, freeing 1,000–2,500 pallet spaces.
- An estimated **$100–200M** reduction in aging inventory.
- **20 hours a month** handed back to field-deployment teams.

## My role

Tech lead and architect. I partnered with edge deployment, inventory operations, finance, and data-science teams on requirements, designed the system, and built across the stack: UI, APIs, CLI, pipelines, and the agent.

## What I'd do differently

[CONFIRM: one honest lesson, e.g. a decision you would make earlier or a trade-off you'd revisit]
