# Gold Standard Guidelines

**Canonical engineering, design, data, AI and operational standards — as a repository you can clone, validate, and feed to an AI agent.**

[![validate](https://github.com/Dxlxz/gold-standard-guidelines/actions/workflows/validate.yml/badge.svg)](https://github.com/Dxlxz/gold-standard-guidelines/actions/workflows/validate.yml)
![documents](https://img.shields.io/badge/documents-117-informational)
![status](https://img.shields.io/badge/status-drafts%20%C2%B7%20v0.1.0-orange)
![docs licence](https://img.shields.io/badge/docs-CC%20BY%204.0-lightgrey)
![tooling licence](https://img.shields.io/badge/tools-MIT-blue)
![dependencies](https://img.shields.io/badge/npm%20dependencies-0-success)

117 standards across 8 domains: UI and design systems, application engineering, data and geospatial
platforms, AI/LLM systems, security, operations, and team process. Every document is written to one
skeleton — **Purpose → Rules → Anti-patterns → Checklist → Canonical summary → Sources** — uses
normative language (`MUST` / `MUST NOT` / `SHOULD` / `SHOULD NOT`), and carries machine-readable
metadata that CI validates.

> **Read this first:** the documents are **AI-assisted drafts** (`status: draft`, `version: 0.1.0`).
> They are source-grounded and structurally complete, but **not yet ratified** by a named owner. Use
> them as a strong default and a review checklist — not as certified policy. See
> [ATTRIBUTION.md](ATTRIBUTION.md) and [GOVERNANCE.md](GOVERNANCE.md).

---

## Why this repository exists

Most "best practices" documents are unreviewable: prose paragraphs with no rules, no counter-examples
and no way to check compliance. This corpus is the opposite:

| Property | How |
|---|---|
| **One rule, one obligation** | every rule is a numbered item written with MUST/SHOULD, citable as `<id> §2.7` |
| **Anti-patterns are named** | each document lists the shapes that get rejected, with the failure mode |
| **Acceptance is checkable** | each document ends with a copy-paste checklist of verifiable items |
| **Metadata is a contract** | front matter validated by JSON Schema + CI; ids are stable and cited by code |
| **Machine-readable** | `index.json` (catalogue), `llms.txt` (compact index), `llms-full.txt` (whole corpus) |
| **Agent-ready** | `AGENTS.md` routes a task to the exact set of documents an agent must load |
| **Zero dependencies** | Node ≥ 18, no npm packages, no network calls in build or validation |

## The corpus

| Domain | Docs | Covers |
|---|---|---|
| [`foundation/`](foundation) | 1 | navigation entry point (principles, naming, glossary, authoring, reading paths — queued) |
| [`standards/design/`](standards/design) | 36 | design system, tokens, colour/typography, components, layout, motion, states, forms, tables, data viz, dashboards & maps, accessibility, content, brand, anti-AI-slop craft, image prompting, design QA, handoff |
| [`standards/engineering/`](standards/engineering) | 34 | architecture, API, state, forms & validation, testing, performance, accessibility, browser support, SEO, email, i18n, realtime, concurrency, offline sync, mobile, desktop, extensions, patterns |
| [`standards/data/`](standards/data) | 12 | data & databases, schema evolution, ingestion/ETL, lakehouse & table formats, warehouse modelling, geospatial & maps, geo metadata, environmental data quality, analytics |
| [`standards/ai/`](standards/ai) | 7 | LLM usage, prompt engineering, prompt library, agents, RAG & vector retrieval, evaluation & red-teaming, AI UX |
| [`standards/security/`](standards/security) | 8 | security, auth & authorisation, privacy & data governance, secrets, rate limiting & abuse, threat modelling, audit logging, legal & licensing |
| [`standards/operations/`](standards/operations) | 13 | configuration, deployment & infrastructure, CI/CD, backup & DR, feature flags, release & versioning, background jobs, observability, incidents, cost/FinOps, billing, events & webhooks, support |
| [`standards/process/`](standards/process) | 6 | documentation, decision records, DoR/DoD, estimation, onboarding, governance, technical debt, experimentation, code review, design review |

Browse the machine catalogue: [`index.json`](index.json) · or read the compact list: [`llms.txt`](llms.txt).

## Use it

### As a human

1. Start at [`foundation/00-index.md`](foundation/00-index.md) — what to read first, by role and by task.
2. Filter by surface: `applies_to` is one of `ui · client · api · data · ai · security · infra · team`.
3. Read any document the same way: Purpose → Rules → Anti-patterns → **Checklist** → Canonical summary.
4. Follow `related` in the front matter instead of searching — every document links its neighbours.

```bash
git clone https://github.com/Dxlxz/gold-standard-guidelines.git
cd gold-standard-guidelines
npm run stats      # 117 documents, per-domain counts
npm run check      # rebuild catalogue + validate metadata, naming, links (no network, no deps)
```

### As an AI agent

```
Read llms.txt, then load every document whose applies_to includes "api".
Apply them as constraints, cite rules as <id> §2.7, and report which checklist items stay unverified.
```

| Artifact | Use |
|---|---|
| [`AGENTS.md`](AGENTS.md) | task → document id routing table, normative-language semantics, agent rules |
| [`llms.txt`](llms.txt) | compact index — title, one-line summary and link per document |
| [`llms-full.txt`](llms-full.txt) | ~7 MB: the complete corpus in a single file (~2 M tokens — load selectively) |
| [`index.json`](index.json) | metadata for filtering: `id, title, domain, status, tags, applies_to, related, chars` |
| [`schema/frontmatter.schema.json`](schema/frontmatter.schema.json) | the metadata contract |

### As a downstream repository

Add it as a submodule and point your own review checklists at it, or copy individual standards and keep
the `id` — ids are stable, so citations survive.

```bash
git submodule add https://github.com/Dxlxz/gold-standard-guidelines.git docs/guidelines
```

## Document contract

```yaml
---
id: design-tokens          # stable kebab-case id — never changes after merge
title: "Design Tokens"     # human title, no year/version suffixes
domain: design             # must equal the folder
status: draft              # draft | review | active | deprecated
version: 0.1.0             # semver of the rule set (GOVERNANCE.md §5)
owner: "@Dxlxz"             # accountable reviewer
tags: [design, tokens, theming]
applies_to: [ui, general]  # general | ui | client | api | data | ai | security | infra | team
related: [component, theming, spacing-grid-depth]
legacy_number: 38          # traceability to the original export (historical)
provenance: baseline       # baseline | generated-batch | generated-design
created: 2026-09-22
updated: 2026-09-23
review_by: 2026-12-22      # ≤ 90 days for active documents
chars: 41230
---
```

CI fails when a required field is missing, an `id` is duplicated, a `related` id does not exist, a file
name breaks the `NN-slug.md` convention, a document contradicts its folder's domain, an artefact is
stale — or when **private provenance** (a conversation URL, credential or personal data) appears in a
document.

## Tooling

```bash
node tools/build-index.js     # front matter → index.json   (fails on incomplete metadata)
node tools/build-llms.js      # index.json  → llms.txt + llms-full.txt
node tools/validate.js        # schema, naming, ids, links, artefacts, privacy guard
node tools/build-index.js --write-chars   # repair the `chars` field
BASE_URL=https://…/main/ npm run llms     # absolute links instead of relative
```

## Contributing

Issues and pull requests are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) for the authoring rules
and [GOVERNANCE.md](GOVERNANCE.md) for ownership, versioning and precedence. Two templates are provided:
**propose a rule change** and **report a defect**. By participating you agree to the
[Code of Conduct](CODE_OF_CONDUCT.md); report sensitive problems privately per [SECURITY.md](SECURITY.md).

The highest-value contribution right now: **pick a document, verify its sources, and move it from
`draft` to `active`** (or file the defects you find).

## Licence

- **Documentation** (`standards/`, `foundation/`, `templates/`, top-level markdown) — **CC BY 4.0**:
  use, adapt and redistribute with attribution.
- **Tooling** (`tools/`, `.github/`, `schema/`, generated artefacts) — **MIT**.

See [LICENSING.md](LICENSING.md) for the scope split, the verbatim [LICENSE](LICENSE) (CC BY 4.0) and
[LICENSE-MIT](LICENSE-MIT) (tooling). Provenance: [ATTRIBUTION.md](ATTRIBUTION.md) · cite via [CITATION.cff](CITATION.cff).
