---
id: example-id
title: "Example Standard"
domain: engineering
status: draft
version: 0.1.0
owner: "@handle"
tags: [example, placeholder]
applies_to: [general]
related: []
created: 1970-01-01
updated: 1970-01-01
review_by: 1970-04-01
chars: 0

---

<!--
TEMPLATE — copy to standards/<domain>/NN-slug.md and replace everything.
Rules for the author (delete this comment before committing):
  • id is immutable once merged — pick it carefully; kebab-case; unique.
  • domain must match the folder.
  • status starts at draft; only a Domain Owner moves it to review → active (GOVERNANCE.md).
  • version: 0.1.0 for a new draft; 1.0.0 at ratification.
  • tags: lowercase kebab-case, ≥1, prefer existing tags.
  • applies_to: which surfaces this binds — general | ui | client | api | data | ai | security | infra | team.
  • related: up to 5 existing ids (CI fails on unknown ids).
  • chars: body length excluding front matter (run `npm run build` — it reports the real value).
  • Sections are fixed: Purpose → Rules → Anti-patterns → Checklist → Canonical summary → Sources.
  • One obligation per numbered rule; cite as `<id> §2.7`.
  • Checklist items must be verifiable; no "looks good".
  • Aim 20–80 KB. Below 15 KB it is probably not a standard; above 120 KB, split it.
-->

# Example Standard — Gold Standard 2026

## 1. Purpose

Why this standard exists (2–4 sentences), who is bound by it (roles, surfaces, repositories), and
what it explicitly does **not** cover. Name the failure it prevents — a standard without a failure
mode is a preference.

**Out of scope:** <topic handled by another standard — link it by id>.

## 2. Rules

### 2.1 <Rule group name>

1. Code that <context> **MUST** <obligation>. Rationale: <one line>.
2. <Component> **MUST NOT** <prohibition>. Rationale: <one line>.
3. Teams **SHOULD** <default> unless <exception condition>; the deviation is recorded in an ADR (`adr`).

```ts
// Reference implementation — the smallest correct shape
```

### 2.2 <Next rule group>

4. **MUST** …

## 3. Anti-patterns

| Anti-pattern | Why it fails | Instead |
|---|---|---|
| <named shape> | <consequence — data loss, a11y failure, coupling> | <rule reference or alternative pattern> |

```ts
// ✗ prohibited — <one-line reason>
// ✓ required — see rule 2.3
```

## 4. Checklist

Copy-paste into the pull request or review ticket. Every item must be checkable against a diff,
a test, a query or a screenshot — never an opinion.

- [ ] <verifiable item, e.g. "all colour values come from semantic tokens">
- [ ] <verifiable item, e.g. "the migration has a tested down-path">
- [ ] <verifiable item, e.g. "the error surface shows cause + recovery action">
- [ ] <verifiable item, e.g. "p95 latency measured on the target dataset, not synthetic data">

## 5. Canonical summary

The whole standard in ~15 lines — the part people remember and agents load first.

- <one-line rule of thumb>
- <the default, and the one condition that changes it>
- <the most common mistake>
- See also: `<related-id>`, `<related-id>`.

## Sources

- [<title>](<url>) — <what it supports>
- [<title>](<url>) — <what it supports>

<No invented references. If a claim has no source, mark it as an internal decision with an ADR link.>
