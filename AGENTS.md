# AGENTS.md — how AI agents use this repository

Entry point for AI coding agents (pi, Claude, Cursor, Copilot, Codex…) working in our codebases.
Read this before generating or reviewing code.

## 0. Order of operations

1. **Load the index, not the corpus.** Read [`llms.txt`](llms.txt) (~116 lines) or [`index.json`](index.json)
   to find which standards apply; only then open specific documents.
2. **Filter by context.** Use `applies_to` (`ui` · `client` · `api` · `data` · `ai` · `security` · `infra` · `team` · `general`),
   plus `domain` and `tags`.
3. **Foundations first** (as they publish): principles, naming & terminology, authoring, glossary — `foundation/`.
4. **Follow `related`** in the front matter — up to five ids, the fastest path to neighbouring rules.

## 1. Task → documents routing (ids verified against index.json)

| If the task involves… | Load these ids |
|---|---|
| Screen, layout, page composition | `layout` · `layout-patterns` · `design-system` · `component` · `responsive-device` · `aesthetic` |
| Colour, typography, spacing, tokens | `design-tokens` · `colour-type-systems` · `spacing-grid-depth` · `theming` · `style-catalogue` |
| Component / variant API | `component` · `component-variant-contract` · `forms-editors` · `forms-validation` |
| Any generated visual asset | `anti-ai-slop` · `image-prompt-engineering` · `visual-style-recipes` · `prompt-packs` · `iconography` |
| Copy, labels, errors, empty states | `content-ux-writing` · `states-catalogue` · `content-microcopy` · `feedback` |
| Accessibility review | `accessibility` · `a11y-inclusive` · `browser-compatibility` · `design-qa-metrics` |
| API / endpoint / contract | `api` · `events-webhooks` · `error-handling-resilience` · `abuse` · `authentication-authorization` |
| Auth, permissions, tenant isolation | `authentication-authorization` · `multi-tenancy` · `security` · `privacy-data-governance` · `secrets` |
| Data model, migrations, ingestion | `data-database` · `data-modeling` · `ingestion` · `lakehouse` · `warehouse-modeling` |
| Geospatial or map features | `geospatial` · `geo-metadata` · `dashboard-dataviz-map` · `env-data-quality` · `data-viz` |
| Dashboards, tables, visualisation | `data-viz` · `tables` · `dashboard-dataviz-map` |
| LLM features, prompts, RAG, agents | `ai-llm` · `prompt-engineering` · `rag` · `ai-agents` · `ai-eval` · `ai-ux` · `prompt-library` |
| Performance, caching, realtime, offline | `performance` · `caching` · `realtime` · `concurrency` · `offline-sync` |
| Deploy, config, CI/CD, incidents | `deployment-infrastructure` · `configuration-environment` · `ci-cd` · `incidents` · `observability` · `threat-model` |
| Review, planning, decisions, debt | `code-review` · `adr` · `dor-dod` · `estimation` · `tech-debt` · `governance` · `onboarding` |
| Platform & architecture patterns | `architecture` · `facade` · `routes` · `framework` · `state-management` · `pattern` · `reusability-libraries` |
| Mobile / desktop / extension | `mobile-native` · `desktop-app` · `extension` |
| Legal, licensing, third-party code | `legal-licensing` · `reusable-repositories` |
| Time, i18n, notifications, email, files | `time` · `internationalization` · `notifications` · `email` · `file-media` |
| Search, navigation, settings | `search` · `search-navigation` · `navigation` · `admin-internal-tools` |

Generate such lists programmatically at any time:

```bash
node -e "const i=require('./index.json');console.log(i.docs.filter(d=>d.applies_to.includes('api')).map(d=>d.id+'  '+d.path).join('\n'))"
```

## 2. Normative language — how to read and apply rules

| Term | Meaning for you |
|---|---|
| **MUST / MUST NOT** | Hard requirement. If you cannot satisfy it, stop and say so explicitly; never deviate silently. |
| **SHOULD / SHOULD NOT** | Strong default. Deviate only with a stated reason (ADR, code comment or PR note). |
| **MAY** | Optional — do not add it unless asked. |
| **Anti-pattern** | Prohibited shape. If existing code matches one, flag it; never replicate it. |
| **Checklist** | Acceptance gate — verify each item and report pass/fail with `file:line` evidence. |

## 3. Rules for agents

1. **Never invent a rule.** If a constraint is not in a loaded document, ask or mark it as an assumption.
2. **Cite by id**: `per guidelines/standards/<domain>/<file>.md (id: <id>)` — or `per <id>` for short.
3. **Status matters.** `draft` = strong default, not law → surface conflicts to the human. `deprecated` = never apply.
4. **Prefer the machine surface**: `index.json` for metadata, `llms.txt` for discovery. Do not read `llms-full.txt` unless you need the whole corpus.
5. **Check anti-patterns before writing code** — they cause most rejected pull requests.
6. **Follow `related`** before cross-cutting changes (tokens → theming → component → layout).
7. **Report coverage**: which documents you applied, which checklist items remain unverified.

## 4. Contribution loop (agents may open PRs)

1. Copy `templates/standard.md` → `standards/<domain>/NN-slug.md`.
2. Fill all front matter fields per `schema/frontmatter.schema.json`.
3. Sections: Purpose → Rules → Anti-patterns → Checklist → Canonical summary.
4. Run: `node tools/build-index.js && node tools/build-llms.js && node tools/validate.js` — CI fails otherwise.
5. Open a PR; a human owner moves `status` `draft` → `review` → `active` (see `GOVERNANCE.md`).

## 5. What this repository is not

- Not a library reference or tutorial.
- Not a product decision — it constrains *how*, never *what* to build.
- Not enforceable while `status: draft` — treat it as the house default and escalate conflicts to the owner.
