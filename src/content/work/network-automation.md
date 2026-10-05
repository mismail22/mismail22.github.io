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
    - { id: intent, label: Change intent, sub: migration · roadmap · ticket, col: 0, row: 1, kind: source }
    - { id: search, label: Block search, sub: LLM + two-stage RAG, col: 1, row: 0, kind: surface }
    - { id: engine, label: Workflow engine, sub: 102 workflows · 314 blocks, col: 1, row: 1 }
    - { id: pre, label: Pre-checks, sub: '[CONFIRM]', col: 2, row: 1, kind: guard }
    - { id: gen, label: Config generation, sub: '[CONFIRM: how]', col: 3, row: 1 }
    - { id: bb, label: Backbone & edge, sub: carrier-grade routers, col: 4, row: 0, kind: target }
    - { id: fab, label: AI/HPC fabric, sub: InfiniBand · RoCEv2, col: 4, row: 1, kind: target }
    - { id: lab, label: Lab networks, sub: ACLs · VLANs, col: 4, row: 2, kind: target }
    - { id: post, label: Post-validation & audit, col: 3, row: 2, kind: guard }
  edges:
    - [intent, engine]
    - [search, engine]
    - [engine, pre]
    - [pre, gen]
    - [gen, bb]
    - [gen, fab]
    - [gen, lab]
    - [lab, post]
order: 2
---

## Problem

Network changes at hyperscale cross team boundaries. Backbone, edge, security, and lab networks each had their own manual procedures, and every migration meant hand-offs, tickets, and repeated tribal knowledge. Mistakes in network changes cause incidents, so speed had to come **with** safety, not instead of it.

## Constraints

- **Shared ownership.** ACL consolidation spanned network-infra, network-security, and infra-security teams.
- **Heterogeneous fleet.** Carrier-grade routers, AI/HPC fabrics (InfiniBand, RoCEv2), and thousands of lab devices, each with different tooling.
- **No downtime budget.** Migrations ran against live networks. [CONFIRM: any specific change-window or validation rules]

## Architecture

A change starts as intent: a migration, a roadmap item, or a ticket. The **workflow engine** composes it from **reusable building blocks**, so the same tested step (for example a pre-check or a device update) is reused across many workflows instead of re-implemented. Engineers find blocks through an **LLM-powered search** with two-stage retrieval. Changes pass **pre-checks**, are applied to the target networks, and are **validated and audited** afterwards. [CONFIRM: correct the stage names and how configs are generated]

## Key decisions

1. **Policy changes as code.** ACL consolidation shipped as **162 production code changes** and **40+ VLAN migrations**, delivered with all three partner teams.
2. **Blocks over scripts.** Owning **102 workflows built from 314 reusable building blocks** made every fix and safety check reusable across the estate.
3. **Make the library searchable.** A two-stage retrieval agent cut building-block lookup from **~10 minutes to seconds** and rolled out to network operations, deployment, and ops-automation teams.
4. **Automate the long tail.** Peering-circuit migrations (34 supported, ~102 hours saved) and patch-panel initialization (~72 hours a month saved) became workflows instead of runbooks.

## Results

- ACL policy consolidated across three partner orgs: **162 changes, 40+ VLAN migrations**.
- AI/HPC network automation (InfiniBand, RoCEv2) across **thousands of devices**, with **80%+** data-accuracy improvement.
- A carrier-grade router system (Juniper PTX10003) saving **~480 engineering hours a year**.
- Workflow API rebuild on a push model: **57% faster**, timeouts eliminated.

## My role

Engineer on the earlier workflow tooling, then owner of the workflow-automation strategy as tech lead. I also drove the cross-team ACL consolidation while leading R&D infrastructure.

## What I'd do differently

[CONFIRM: one honest lesson]
