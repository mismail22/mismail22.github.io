---
title: AI-Native Engineering
tagline: Agents that orchestrate existing tools, and audits that find what humans missed
summary: An AI-assisted code audit that surfaced a nine-figure data defect hidden for five years, a 9-tool LLM agent shipped in a week, and a retrieval search used across three teams.
role: Designer and builder
period: 2019 – present
stack: [LLM agents, RAG, SQL, Python, React]
metrics:
  - { value: '5 yrs', label: 'defect hidden, then found' }
  - { value: '< 1 wk', label: 'to peer-team adoption' }
  - { value: '9 tools', label: 'LLM agent, shipped in one week' }
  - { value: 'Top 1%', label: 'AI-assisted development, company-wide' }
tldr:
  - An LLM compared what each data pipeline claimed to do with what its code did; a human verified every candidate against real data.
  - It surfaced two small bugs that had misstated a nine-figure amount of inventory for five years; peer teams adopted the method the same week.
  - Agents reuse existing commands instead of inventing new write paths.
decisions:
  - title: Agents orchestrate tools; they don't replace them
    alternative: A free-form agent with its own write access.
    why: The 9-tool agent calls three platform tools and six existing CLI commands, so it goes through the same code paths as people using those commands.
  - title: Models widen the search, humans decide what's true
    why: The model proposes candidate defects quickly; verification queries against the real data decide which ones are real. That keeps false positives out of anything that gets reported.
  - title: Package the method, not just the finding
    why: Writing the audit up as a repeatable procedure is what let peer data teams adopt it within days instead of re-deriving it.
pullQuote: The five years is the real finding.
lesson: The typo and the over-matching pattern weren't hard bugs. They survived five years because nothing checked what the classification logic produced. The audit caught this instance, but an audit is a one-time sweep. What I do now is ship classification rules with assertions on their outputs (expected totals, match counts, unmatched rows), so the next defect fails a check the day it lands instead of waiting years for someone to look.
diagram:
  nodes:
    - { id: code, label: Pipeline code, col: 0, row: 0, kind: source }
    - { id: meta, label: Metadata & descriptions, col: 0, row: 2, kind: source }
    - { id: llm, label: LLM audit pass, sub: claimed vs. actual, col: 1, row: 1 }
    - { id: cand, label: Candidate defects, col: 2, row: 1 }
    - { id: human, label: Human verification, sub: query the real data, col: 3, row: 1, kind: guard, callout: 2 }
    - { id: fix, label: Fix + output assertions, col: 4, row: 0, kind: target }
    - { id: method, label: Reusable method, sub: adopted by peer teams, col: 4, row: 2, kind: target, callout: 3 }
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

Data pipelines say one thing in their descriptions and do another in their code. Small defects in classification logic can misstate large numbers for years, because nobody rereads old SQL. Separately, engineers lost time hunting through about 1,000 workflow building blocks and running repetitive inventory commands by hand.

## The audit

I used an LLM to systematically compare what each pipeline **claimed** to do (its metadata and descriptions) with what its code **actually** did, and turned every mismatch into a candidate defect. Each candidate was then verified by a human against the real data.

It surfaced two bugs. The pattern is common enough to show with synthetic SQL:

```sql
-- Before: a one-character typo in a literal, and an unanchored pattern
CASE
  WHEN status = 'dispossed'      THEN 'disposed'   -- never matches
  WHEN rack_type LIKE '%STOR%'   THEN 'storage'    -- also matches 'RESTORE', 'STORM-…'
END

-- After: exact values and an anchored match, plus assertions on the output
CASE
  WHEN status = 'disposed'       THEN 'disposed'
  WHEN rack_type LIKE 'STOR-%'   THEN 'storage'
END
-- assert: no unbucketed rows; bucket totals reconcile with the source
```

Together the real versions of these bugs had misclassified a **nine-figure** amount of inventory for **five years**. Peer data teams adopted the method the **same week**.

## The agents

- **A 9-tool LLM agent** in the platform UI (three platform tools plus six existing CLI commands, retrieval-augmented, in a React chat sidebar) landed in **one week**.
- **A retrieval search** with two-stage retrieval over the building-block library cut lookup from **~10 minutes to seconds**. I led a hack with a research scientist to build it, and it rolled out to network operations, deployment, and ops-automation teams.
- **A reusable Claude Code skill** for commit-stack hygiene, adopted by peer engineers.

## Earlier ML in production

Before LLMs: three production email-to-ticket classifiers (94%, ~70%, and 63% accuracy) and an OCR pipeline that reads rack serials during audits, cutting manual validation by 80%.

## My role

Designed and built the audit method, the agent, and the retrieval search, and wrote up the methodology for peer teams. By internal telemetry, my AI-assisted development is in the top 1% company-wide.
