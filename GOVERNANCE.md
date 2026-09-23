# Governance

How this repository makes, changes and retires rules.

## 1. Scope

This governance applies to everything under `standards/` and `foundation/`. It covers who may change a
rule, how a rule becomes enforceable, how versions work, and how conflicts are resolved. Changes to the
repository's own machinery (`tools/`, CI, schema, templates) follow the same review path but do not
require a version bump of the standards they serve.

## 2. Roles

| Role | Accountability | May |
|---|---|---|
| **Author** | writes or edits a standard | open PRs, set `status: draft` |
| **Domain Owner** | correctness of one domain (design, engineering, data, ai, security, operations, process) | approve, ratify to `active`, deprecate, reject |
| **Maintainer** | repository integrity: schema, naming, cross-domain consistency, releases | merge, arbitrate conflicts, publish changelog |
| **Consumer** | teams and agents bound by the standards | request changes, file exceptions |

Every domain must name at least one owner in `CODEOWNERS`. A standard whose `owner` is vacant cannot leave `draft`.
Ownership is a review duty, not an authorship claim.

## 3. Decision model

| Change | Path |
|---|---|
| PATCH — clarification, typo, link, formatting | PR + 1 domain owner approval |
| MINOR — new rule or tightened checklist | PR + domain owner approval + `CHANGELOG.md` entry |
| MAJOR — a rule becomes incompatible, or an anti-pattern is newly banned | **RFC** (PR description with rationale, blast radius, migration plan) + domain owner + maintainer |
| New domain | Maintainer + RFC |
| Governance change | RFC + all domain owners |
| Emergency correction of a harmful rule | Maintainer may merge immediately, then open a retroactive RFC within 7 days |

RFC is deliberately lightweight: a GitHub issue/PR with the sections *Problem · Options considered ·
Decision · Blast radius · Migration/deprecation plan · Reversibility*. Anything irreversible or
organisation-wide also gets an ADR in `standards/process/` (see `adr`).

## 4. Lifecycle

```
draft ──review──► review ──ratify──► active ──supersede──► deprecated
  ▲                  │                  │
  └──── changes ─────┘                  └── minor/major bumps keep it active
```

| Status | Means | Exit criteria |
|---|---|---|
| `draft` | provisionally complete, not enforceable | a named owner has read it end-to-end |
| `review` | an owner is actively verifying rules and sources | rules are correct, non-contradictory, checkable; sources verified |
| `active` | enforceable in code review | owner signature in the PR; version ≥ 1.0.0; `CHANGELOG.md` entry |
| `deprecated` | superseded; never apply | replacement linked in a banner + `related`, consumers migrated or exception granted |

`review_by` is a maximum of 90 days after `updated` for `active` documents. CI (`tools/validate.js`)
warns when a review is overdue; the maintainer schedules re-reviews per quarter.

## 5. Versioning of a standard

`version` describes the *rule set*, not the prose:

| Bump | Trigger | Example |
|---|---|---|
| MAJOR | existing code can become non-compliant | banning a previously allowed pattern |
| MINOR | new obligation added without breaking existing compliant code | new required field in a form contract |
| PATCH | no new obligation | clarity, examples, links, formatting |

Versions are per document. The repository as a whole uses dates (`v2026.09`) for import milestones only.

## 6. Exceptions

A team may deviate from a `SHOULD`, but not from a `MUST`, without an approved exception. Exceptions are:

1. recorded in an ADR with an **expiry date** (default 90 days),
2. linked from the affected pull request,
3. reported to the domain owner.

Unexpired exceptions are debt: they appear in the quarterly review and must be closed, renewed with a
reason, or converted into a rule change.

## 7. Conflicts and precedence

When two documents disagree:

1. `active` beats `draft`.
2. Domain-specific beats cross-cutting when the domain document is more recent.
3. A more specific rule beats a general one (e.g. `ai-ux` over `ai-llm` for UI behaviour).
4. Unresolved → maintainer arbitrates in the PR; the decision is recorded as an ADR and the losing
   document is amended in the same quarter.

## 8. Repository health metrics (reviewed quarterly)

| Metric | Target |
|---|---|
| Documents `active` | ↑ (currently 0/116 — all `draft`) |
| Documents with a named owner | 100 % |
| Overdue `review_by` | 0 |
| Known contradictions open | 0 |
| Open exceptions past expiry | 0 |
| Agent usage (llms.txt fetches, if logged) | ↑ |

## 9. Amendment

This document changes only by RFC with all domain owners informed, and the change is recorded in
`CHANGELOG.md`. Its own `version` follows the same MAJOR/MINOR/PATCH rules.
