---
title: AI-Native Engineering
tagline: Agents that orchestrate guarded tools, and audits that find what humans missed
summary: An AI-assisted code audit that surfaced a nine-figure data defect hidden for five years, a 9-tool LLM agent shipped in a week, and a retrieval agent used across three teams.
role: Designer and builder
period: 2019 – present
stack: [LLM agents, RAG, Python, SQL, React, Claude Code]
metrics:
  - { value: '5 yrs', label: 'defect undetected, then found' }
  - { value: '< 1 wk', label: 'to peer-team adoption of the method' }
  - { value: '9 tools', label: 'LLM agent, shipped in one week' }
  - { value: '~10 min → s', label: 'building-block search time' }
diagram:
  nodes:
    - { id: code, label: Pipeline code, col: 0, row: 0, kind: source }
    - { id: meta, label: Metadata & descriptions, col: 0, row: 2, kind: source }
    - { id: llm, label: LLM audit pass, sub: description vs. data reality, col: 1, row: 1 }
    - { id: cand, label: Candidate defects, col: 2, row: 1 }
    - { id: human, label: Human verification, sub: query the real data, col: 3, row: 1, kind: guard }
    - { id: fix, label: Fix + data-quality check, col: 4, row: 0, kind: target }
    - { id: method, label: Reusable method, sub: adopted by peer teams, col: 4, row: 2, kind: target }
  edges:
    - [code, llm]
    - [meta, llm]
    - [llm, cand]
    - [cand, human]
    - [human, fix]
    - [human, method]
order: 3
---

## Problem

Data pipelines say one thing in their descriptions and do another in their code. Small defects in classification logic can misstate large numbers for years, because nobody rereads old SQL. Separately, teams lost time hunting through hundreds of workflow building blocks and running repetitive inventory commands by hand.

## The audit

I used an LLM to systematically compare what each pipeline **claimed** to do (its metadata and descriptions) with what its code **actually** did, and turned every mismatch into a candidate defect. Each candidate was then verified by a human against the real data.

That process surfaced two bugs: a **one-character typo** and a **pattern match that matched far more than intended**. Together they had misclassified a **nine-figure** amount of inventory for **five years**. Peer data teams adopted the method the **same week**.

## The agents

- **A 9-tool LLM agent** in the platform UI (three platform tools plus six CLI commands, retrieval-augmented, in a React chat sidebar) landed in **one week**. It calls the same guarded commands people use, so it inherits their guardrails.
- **A retrieval agent** with two-stage retrieval over the workflow building-block library cut search time from **~10 minutes to seconds** and rolled out to network operations, deployment, and ops-automation teams.
- **A reusable Claude Code skill** for commit-stack hygiene, adopted by peer engineers.

## Key decisions

1. **Agents orchestrate tools; they don't replace them.** The agent's power comes from the guarded tool layer underneath it, not from free-form generation.
2. **Humans verify, models search.** The model widens the search space; verification against real data decides what's true.
3. **Package the method.** Writing the audit up as a repeatable process is what made other teams adopt it in days.

## Earlier ML in production

Before LLMs: three production email-to-ticket classifiers (94%, ~70%, and 63% accuracy) and an OCR pipeline that reads rack serials during audits, cutting manual validation by 80%.

## My role

Designed and built the audit method, the agent, and the retrieval search, and wrote up the methodology for peer teams.

## What I'd do differently

**The five years is the real finding.** The typo and the over-matching pattern weren't hard bugs; they survived five years because nothing checked what the classification logic produced. The audit fixed this instance, but an audit is a one-time sweep. What I do now: classification rules ship with assertions on their outputs (expected totals, match counts, unmatched rows), so the next defect fails a check the day it lands instead of waiting years for someone to look.
