---
id: foundation-index
title: "Foundation Index"
domain: foundation
status: draft
version: 0.1.0
owner: "@dale"
tags: [foundation, navigation, onboarding]
applies_to: [general, team]
related: [governance, documentation, onboarding, code-review]
created: 2026-09-23
updated: 2026-09-23
review_by: 2026-12-22
chars: 4670
provenance: baseline

---

# Foundation Index

## 1. Purpose

This is the entry point to the cross-cutting layer of our standards. `standards/` tells you **what** to
do in each domain (design, engineering, data, AI, security, operations, process); `foundation/` tells you
**why**, **what the words mean**, and **how to read, write and arbitrate** the rest.

Read this page first if you are new, if you are about to write a standard, or if two standards appear to
contradict each other.

**Out of scope:** domain rules (they live in `standards/<domain>/`) and the review workflow itself
(`governance`).

## 2. What foundation documents exist

| Document | id | Status | What it settles |
|---|---|---|---|
| Engineering & Design Principles | `principles` | queued | the non-negotiables, and the defaults for the trade-offs we face weekly |
| Naming & Terminology Standard | `naming-and-terminology` | queued | files, code, database, API, events, tokens, env vars; preferred vs forbidden term |
| Document Authoring Standard | `document-authoring` | queued | the skeleton, normative language, metadata, evidence rules, review loop |
| Glossary | `glossary` | queued | ≥150 terms with owner, definition and forbidden synonyms |
| Reading Paths & Onboarding | `reading-paths` | queued | role-based paths and time budgets through 116 standards |
| Cross-Standard Map & Precedence | `cross-standard-map` | queued | which standard owns what, the overlap register, precedence rules |

"Queued" means the document is scheduled to be generated with the same research-grounded pipeline that
produced the rest of the corpus, then reviewed and ratified (`GOVERNANCE.md` §4). Until then, this index
is the best available map.

## 3. How to navigate the corpus

```
foundation/            ← read this first (principles · naming · authoring · glossary · paths · map)
standards/design/      36  UI, tokens, components, layout, motion, content, dashboards, maps, brand
standards/engineering/ 34  architecture, API, state, forms, testing, performance, a11y, i18n, platforms
standards/data/        12  databases, schema evolution, ingestion, lakehouse, geospatial, quality
standards/ai/           7  LLM usage, prompting, agents, RAG, evaluation, AI UX, prompt library
standards/security/     8  auth, privacy, secrets, abuse, threat modelling, audit, licensing
standards/operations/  13  config, deploy, CI/CD, DR, flags, release, jobs, observability, incidents, cost
standards/process/      6  documentation, ADRs, DoR/DoD, estimation, onboarding, review, governance
```

Three ways in, depending on what you have:

1. **A task** — go to `AGENTS.md` §1 (task → ids table) or filter `index.json` by `applies_to`.
2. **A domain** — open the domain folder; files are numbered in reading order within the domain.
3. **A neighbour** — every document lists up to five `related` ids in its front matter; follow them.

Every document has the same skeleton, so you can read any of them the same way: **Purpose** (why it
exists and what it excludes) → **Rules** (numbered, normative) → **Anti-patterns** (the shapes that get
rejected) → **Checklist** (the review gate) → **Canonical summary** (the 15 lines people remember) →
**Sources** (the research behind it).

## 4. How to use the corpus with an agent

1. Load `llms.txt` (116 lines, one per standard with a summary) or `index.json` (metadata).
2. Filter by `applies_to` (`ui` · `client` · `api` · `data` · `ai` · `security` · `infra` · `team` · `general`),
   `domain` and `tags`.
3. Load only the documents you need; follow `related` when a change crosses a boundary.
4. Cite rules by id and section (`design-tokens` §2.4) and report which checklist items remain unverified.

Do not load `llms-full.txt` (7.3 MB) unless you genuinely need the whole corpus.

## 5. Precedence (short version)

Full rules live in `GOVERNANCE.md` §7; the essentials:

- `active` beats `draft`; `deprecated` is never applied.
- A specific rule beats a general one; the domain that owns the concern beats the domain that borrows it.
- Security, privacy and legal constraints are never overridden by delivery pressure — they lose only to law.
- Two standards contradicting each other is a **defect in the corpus**: raise it in the pull request and
  the maintainer records the resolution as an ADR (`adr`).

## 6. Status of this layer

All 116 corpus documents are `status: draft` (`version: 0.1.0`): provisionally complete, not yet
ratified, each with a named owner and a 90-day `review_by` date. Treat a draft as the house default and
escalate conflicts to the owner — never as settled policy. When foundation documents land, this index
gains their summaries and loses the "queued" column.
