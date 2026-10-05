---
title: Network Automation at Fleet Scale
tagline: Turning cross-team network toil into composable, validated workflows
summary: ACL policy consolidation, AI/HPC fabric automation, carrier-grade router tooling, and a 102-workflow estate built from reusable blocks, across backbone, edge, and lab networks.
role: Engineer, then tech lead
period: 2022 – present
stack: [Python, Workflow orchestration, ACL / VLAN, InfiniBand, RoCEv2, Juniper PTX, LLM + RAG]
metrics:
  - { value: '162', label: 'production changes consolidating ACL policy' }
  - { value: '40+', label: 'VLAN migrations' }
  - { value: '102 / 314', label: 'workflows / reusable blocks owned' }
  - { value: '~480 h', label: 'saved per year (router system)' }
diagram:
  nodes:
    - { id: intent, label: Change intent, sub: migration · turn-up · roadmap, col: 0, row: 0, kind: source }
    - { id: sot, label: Network source of truth, col: 0, row: 1, kind: source }
    - { id: dc, label: DC asset & site data, col: 0, row: 2, kind: source }
    - { id: map, label: Device & site mapping, sub: old → new · patch panels, col: 1, row: 1 }
    - { id: search, label: Block search, sub: LLM + RAG, col: 2, row: 0, kind: surface }
    - { id: engine, label: Workflow engine, sub: 102 workflows · 314 blocks, col: 2, row: 1 }
    - { id: exec, label: Change execution, sub: scripted · reviewed · capacity-safe, col: 3, row: 1, kind: guard }
    - { id: bb, label: Backbone & edge, sub: peering · carrier-grade routers, col: 4, row: 0, kind: target }
    - { id: fab, label: AI/HPC fabric, sub: InfiniBand · RoCEv2, col: 4, row: 1, kind: target }
    - { id: lab, label: Lab networks, sub: ACLs · VLANs, col: 4, row: 2, kind: target }
  edges:
    - [intent, map]
    - [sot, map]
    - [dc, map]
    - [map, engine]
    - [search, engine]
    - [engine, exec]
    - [exec, bb]
    - [exec, fab]
    - [exec, lab]
order: 2
---

## Problem

Network changes at hyperscale cross team boundaries. Backbone, edge, security, and lab networks each had their own manual procedures, and every migration meant hand-offs, tickets, and repeated tribal knowledge. Mistakes in network changes cause incidents, so speed had to come **with** safety, not instead of it.

## Constraints

- **Shared ownership.** ACL consolidation spanned network-infra, network-security, and infra-security teams.
- **Heterogeneous fleet.** Carrier-grade routers, AI/HPC fabrics (InfiniBand, RoCEv2), and thousands of lab devices, each with different tooling.
- **Production stays untouched.** Capacity delivery and migrations ran against live networks, so every change had to be minimally disruptive.
- **Gaps in the source data.** The network source of truth didn't capture everything a migration needed, such as old-to-new device mappings and non-standard rack locations.

## Architecture

A change starts as intent: a peering migration, a turn-up, or a roadmap item. A **mapping layer** joins the network source of truth with data-center asset data to fill its gaps, for example mapping old devices to new ones for a forklift migration, or resolving non-standard rack locations and patch-panel details. The **workflow engine** composes the change from **reusable building blocks**, so a tested step is reused across many workflows instead of re-implemented, and engineers find blocks through an **LLM-powered search**. Policy changes are **script-generated and reviewed** like code, and every change is executed so capacity delivery never affects production.

## Key decisions

1. **Lead with a script, then scale it through the team.** I wrote the first ACL policy script; the team followed with scripts for the other policy types. Together they generated **~162 automated code changes** that closed a security and redundancy risk, plus **40+ VLAN migrations**, delivered with network and security partners.
2. **Blocks over scripts.** Owning **102 workflows built from 314 reusable building blocks** made every fix and safety check reusable across the estate.
3. **Make the library searchable.** A two-stage retrieval agent cut building-block lookup from **~10 minutes to seconds** and rolled out to network operations, deployment, and ops-automation teams.
4. **Fill data gaps in the workflow, not in spreadsheets.** The peering-circuit migration workflow carries a detailed old-to-new device mapping (34 migrations, ~102 hours saved), and patch-panel initialization queries data-center asset data directly (~72 hours a month saved).

## Results

- ACL policy consolidated across three partner orgs: **162 changes, 40+ VLAN migrations**.
- AI/HPC network automation (InfiniBand, RoCEv2) across **thousands of devices**, with **80%+** data-accuracy improvement.
- A carrier-grade router system (Juniper PTX10003) saving **~480 engineering hours a year**.
- Workflow API rebuild on a push model: **57% faster**, timeouts eliminated.

## My role

Engineer on the earlier workflow tooling, then owner of the workflow-automation strategy as tech lead. I also drove the cross-team ACL consolidation while leading R&D infrastructure.

## What I'd do differently

**Make the boring design the baseline.** The carrier-grade router system (Juniper PTX10003) went through several more elaborate proposals before landing on the one that shipped: simple, scalable, and barely disruptive to the network, saving ~480 hours a year. The iterations taught me something, but they cost calendar time with Edge partners waiting. Now the simplest viable design goes on the table first, and every alternative has to beat it on a named risk, not on elegance.
