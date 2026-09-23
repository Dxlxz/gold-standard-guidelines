# Changelog

All notable changes to this repository are recorded here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); standards use semver (see `GOVERNANCE.md`).

## [Unreleased]

### Planned
- `foundation/` documents (6 queued in the pipeline project's `prompts-foundation.json`): principles,
  naming & terminology, document authoring, glossary, reading paths, cross-standard map.
- Domain ownership: nominate a Domain Owner per domain and move documents `draft` → `review`.
- Hosted documentation site (search, per-domain pages) generated from `index.json`.

## [1.0.0] — 2026-09-23

Initial import: **116 standards** and the repository machinery that makes them usable.

### Added — standards (all `status: draft`, `version: 0.1.0`)
- `standards/design/` — 36 documents: design system, tokens, colour/typography, spacing/grid, components,
  layout & layout patterns, responsive, motion, iconography, imagery/illustration, states, feedback,
  overlays, navigation, forms, tables, data viz, dashboards & map interaction, accessibility,
  content & microcopy, style catalogue, brand & white-label, corporate standards, anti-AI-slop craft,
  image prompt engineering & recipe libraries, design system governance, design QA & metrics, handoff/Figma.
- `standards/engineering/` — 34 documents: architecture, facade, routes, framework, reusability,
  state management, forms & validation, API, error handling & resilience, testing, performance,
  accessibility, browser compatibility, SEO, email, admin tools, multi-tenancy, caching, search,
  file & media, notifications, i18n, realtime, concurrency, offline-first sync, mobile, desktop, extension, pattern.
- `standards/data/` — 12 documents: data & database, data modelling & schema evolution, ingestion/ETL,
  lakehouse & table format, warehouse & analytics modelling, geospatial & maps, geospatial metadata & catalog,
  scientific & environmental data quality, analytics, caching, search, file & media.
- `standards/ai/` — 7 documents: AI/LLM, prompt engineering, prompt library & governance, AI agents,
  RAG & vector retrieval, AI evaluation & red-team, AI UX.
- `standards/security/` — 8 documents: security, authentication & authorization, privacy & data governance,
  secrets & key management, rate limiting & abuse defence, threat modelling & secure SDLC,
  audit logging & compliance evidence, legal & licensing.
- `standards/operations/` — 13 documents: configuration, deployment & infrastructure, CI/CD, backup & DR,
  feature flags, release & versioning, background jobs & queues, observability, incidents & on-call,
  cost engineering/FinOps, billing & payments, events & webhooks, support & escalation.
- `standards/process/` — 6 documents: documentation, reusable repositories & open-source adoption,
  architecture decision records, definition of ready & done, estimation & planning, onboarding & ramp-up,
  governance, technical debt & refactoring, experimentation & A/B testing, code review, design review & handoff.

### Added — repository machinery
- `schema/frontmatter.schema.json` — metadata contract for every document (CI-enforced).
- `tools/rename-map.json` — traceability map from the original export: every document's
  `legacy_file`/`legacy_number`, stable `id` and current path (1:1, no gaps). The one-time migration
  script itself lives in the pipeline project (`chrome-mcp/migrate-to-repo.js`), not in this repository.
- `tools/build-index.js` — front matter → `index.json` (machine catalogue; fails on incomplete metadata).
- `tools/build-llms.js` — `index.json` → `llms.txt` (llmstxt.org convention) and `llms-full.txt` (~7.3 MB corpus).
- `tools/validate.js` — schema, naming, id uniqueness, `related` resolution, index/llms freshness, review dates.
- `AGENTS.md` — task → document routing table (ids verified against `index.json`) and agent rules.
- `README.md`, `CONTRIBUTING.md`, `GOVERNANCE.md`, `LICENSE`, `templates/` (standard, ADR, checklist).
- `.github/workflows/validate.yml` — CI gate: build index/llms, fail on stale artifacts or validation errors.

### Notes
- Provenance: 49 baseline standards exported from the original design-system conversation; 48 produced in the
  batch queue (`prompts-next.json`); 19 design-set documents produced with Firecrawl-grounding
  (37–75 tool calls per document) via the `prompts-design.json` queue.
- Every document carries `legacy_number` and `legacy_file` for traceability to the original export.
- Documents are AI-assisted drafts: rules are usable as a strong default but **not enforceable** until
  a Domain Owner ratifies them (`GOVERNANCE.md` §4).
- Known follow-ups: six `foundation/` documents, domain ownership, contradiction sweep across the corpus,
  hosted site, and per-document source verification during ratification.
