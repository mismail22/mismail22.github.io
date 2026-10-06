---
title: Network Automation at Fleet Scale
tagline: Turning cross-team network toil into composable, staged, verified workflows
summary: Peering turn-up and migrations, carrier-grade router modeling, ACL policy as code, and a 102-workflow estate built from reusable blocks, across backbone, edge, and lab networks.
role: Engineer, then tech lead
period: 2020 – present
stack: [Python, Hack/PHP, BGP, Juniper PTX, ACL / VLAN, Workflow orchestration]
metrics:
  - { value: '102 / 314', label: 'workflows / reusable blocks in the owned estate', qualifier: 'Roadmap and health ownership; not a claim of sole authorship.', evidenceType: scope }
  - { value: '162', label: 'ACL changes seeded by the first policy script', qualifier: 'Team-scaled output after I authored the initial policy pattern.', evidenceType: measured }
  - { value: '~480 h', label: 'engineering time saved per year', qualifier: 'Estimated annual effect of the carrier-grade router system.', evidenceType: estimated }
  - { value: '57%', label: 'faster workflow execution', qualifier: 'Measured after polling steps moved to event wake-ups.', evidenceType: measured }
plate:
  title: A staged network change
  caption: A reconstructed workflow showing intent, opt-in risk, scripted push, and before/after verification.
  kind: workflow
  sanitized: true
tldr:
  - Owned a 102-workflow network automation estate built from 314 reusable blocks.
  - Added protocol-level safety to peering (BGP GTSM, session snapshots) and modeled carrier-grade router ports so automation can't misuse them.
  - Seeded ACL policy as code with my first script; the team scaled it to 162 generated changes.
decisions:
  - title: Add GTSM as an opt-in stage, default off
    alternative: Turn TTL security on for every new peering session at once.
    why: GTSM (RFC 5082) protects BGP sessions from spoofed packets, but enabling it on a session the peer hasn't configured would drop it. An optional flag on peering turn-up, defaulting to off, let teams adopt it session by session.
    tradeoff: Slower fleet-wide coverage, in exchange for adopting it session by session without putting working peers at risk.
  - title: Model reserved ports in config, not in people's heads
    why: On Juniper PTX10003 routers, infrastructure interfaces are defined in a config file keyed by hardware position, so the peering interface selector never allocates them to a customer.
  - title: Wake on events instead of polling
    alternative: Keep workflow steps looping and pulling ticket and card status.
    why: Steps now sleep until the ticket system wakes the workflow, with a 300-second timeout as a safety net. Workflows got 57% faster and timeouts disappeared.
    tradeoff: A dependency on the waking system, bounded by the timeout.
  - title: Simple beats clever for the router system
    alternative: Several more elaborate designs that went through review first.
    why: The design that shipped was the simplest, most scalable, and least disruptive to the network, and it saves ~480 engineering hours a year.
pullQuote: The simplest viable design goes on the table first. Every alternative has to beat it on a named risk.
lesson: The router system went through several more elaborate proposals before landing on the one that shipped. The iterations taught me something, but they cost calendar time with edge partners waiting. Now the simplest viable design goes on the table first, and every alternative has to beat it on a named risk, not on elegance.
diagram:
  nodes:
    - { id: intent, label: Change intent, sub: turn-up · migration · roadmap, col: 0, row: 0, kind: source }
    - { id: sot, label: Network source of truth, col: 0, row: 1, kind: source }
    - { id: dc, label: DC asset & site data, col: 0, row: 2, kind: source }
    - { id: map, label: Device & site mapping, sub: old → new · reserved ports, col: 1, row: 1, callout: 2 }
    - { id: search, label: Block search, sub: LLM + two-stage RAG, col: 2, row: 0, kind: surface }
    - { id: engine, label: Workflow engine, sub: 102 workflows · event wake, col: 2, row: 1, callout: 3 }
    - { id: stage, label: Staged options, sub: opt-in · default off, col: 3, row: 0, kind: guard, callout: 1 }
    - { id: push, label: Push change, sub: scripted · reviewed, col: 3, row: 1 }
    - { id: verify, label: Verify, sub: BGP session snapshots, col: 3, row: 2, kind: guard }
    - { id: bb, label: Backbone & edge, sub: peering · PTX routers, col: 4, row: 0, kind: target }
    - { id: lab, label: Lab networks, sub: ACLs · VLANs, col: 4, row: 2, kind: target }
  edges:
    - [intent, map]
    - [sot, map]
    - [dc, map]
    - [map, engine]
    - [search, engine]
    - [engine, push]
    - [stage, push]
    - [push, bb]
    - [push, lab]
    - [push, verify]
order: 2
---

## Problem

Network changes at hyperscale cross team boundaries. Backbone, edge, security, and lab networks each had their own manual procedures, and every migration meant hand-offs, tickets, and tribal knowledge. Mistakes in network changes cause incidents, so speed had to come **with** safety, not instead of it.

## Constraints

- **Shared ownership.** ACL consolidation spanned network-infra, network-security, and infra-security teams.
- **Production stays untouched.** Capacity delivery and migrations ran against live networks, so every change had to be minimally disruptive.
- **Gaps in the source data.** The network source of truth didn't capture everything a migration needed, such as old-to-new device mappings and non-standard rack locations.

## Architecture

A change starts as intent: a peering turn-up, a circuit migration, or a roadmap item. A **mapping layer** joins the network source of truth with data-center asset data to fill its gaps, for example mapping old devices to new ones for a forklift migration, or resolving non-standard rack locations and patch-panel details. The **workflow engine** composes the change from **reusable building blocks**, so each step is built once and reused instead of re-implemented, and engineers find blocks through an LLM-powered search. Risky options are **staged** (opt-in, default off), changes are **pushed** as scripted, reviewed code, and migrations are **verified** with BGP session snapshots taken before and after.

## Protocol-level details

- **BGP GTSM (RFC 5082).** A building block sets the GTSM flag and TTL in the network source of truth, and peering turn-up carries an optional field that defaults to off.
- **Circuit migrations.** BGP session snapshots before and after each migration show whether every session came back.
- **Router port roles.** PTX10003 infrastructure interfaces live in a config file, and the peering interface selector reads it before allocating a port.
- **Line-card bootstrap.** Folding line-card bootstrap into the device-add workflow removed a 2,000-line dependency and shrank the binary from **1.3 GB to ~525 MB**.

## Results

- **162 generated changes** consolidating ACL policy: I wrote the first policy script, and the team followed with scripts for the other policy types. Plus **40+ VLAN migrations** with network and security partners.
- **34 peering-circuit migrations** supported (~102 hours saved); patch-panel initialization automated (~72 hours a month saved).
- A carrier-grade router system saving **~480 engineering hours a year**.
- Workflow steps moved from polling to event wake-ups: **57% faster**, timeouts eliminated.
- Building-block search cut from **~10 minutes to seconds** across three teams.

## My role

Engineer on the earlier workflow tooling (2020–2021), then owner of the network workflow-automation strategy as tech lead. I also drove the ACL consolidation while leading R&D infrastructure.
