---
id: adr-NNNN-slug
title: "ADR-NNNN: <Decision>"
domain: process
status: draft
version: 0.1.0
owner: "@handle"
tags: [adr, decision]
applies_to: [team]
related: [adr]
created: 1970-01-01
updated: 1970-01-01
review_by: 1970-04-01
chars: 0

---

<!--
TEMPLATE — Architecture Decision Record (MADR-flavoured).
Use an ADR for: irreversible choices, deviations from a SHOULD, approved exceptions (with expiry),
conflicts between two standards, and any decision a future engineer will ask "why?" about.
Store as standards/process/adr/NNNN-slug.md, numbered sequentially, never renumbered or deleted.
-->

# ADR-NNNN: <Decision in one sentence>

- **Status:** proposed | accepted | superseded by ADR-XXXX | deprecated
- **Date:** YYYY-MM-DD
- **Deciders:** @handle, @handle
- **Consulted:** @handle
- **Standards affected:** `<id>`, `<id>`
- **Expires / revisit by:** YYYY-MM-DD (mandatory for exceptions; "n/a" for permanent decisions)

## Context

What forces are at play? Constraints (time, budget, compliance, existing systems), current behaviour,
and the cost of doing nothing. Two to six paragraphs — enough that a reader in two years can judge
whether the context still holds.

## Options considered

| Option | Pros | Cons | Cost to reverse |
|---|---|---|---|
| A — <name> | | | low / medium / high |
| B — <name> | | | |
| C — do nothing | | | none |

## Decision

What we are doing, stated in one paragraph, in the active voice. Then the **rules that follow**:

1. <consequence, obligation or constraint>
2. <what is now explicitly allowed or forbidden>

## Consequences

- **Positive:** …
- **Negative / accepted risk:** …
- **Follow-ups required:** <migrations, ticket links, expiring exceptions>
- **How we will know it was wrong:** <falsification trigger + date>

## Compliance

How this decision is enforced — lint rule, CI check, review checklist item, or "convention only"
(be honest: convention-only decisions decay).

## Links

- Related standards: `<id>` §<n>
- Supersedes / superseded by: ADR-XXXX
- External references: <url>
