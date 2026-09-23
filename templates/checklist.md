---
id: checklist-template
title: "Checklist Template"
domain: process
status: draft
version: 0.1.0
owner: "@handle"
tags: [template, checklist, review]
applies_to: [team]
related: [code-review, design-review, dor-dod]
created: 1970-01-01
updated: 1970-01-01
review_by: 1970-04-01
chars: 0

---

<!--
TEMPLATE — a standalone checklist for a recurring review (release, migration, launch, incident, audit).
Most standards already end with a Checklist section: write one here only when the gate spans several
standards, or when a non-author (QA, SRE, security) must run it independently of a document.

Rules for a usable checklist (see standard-authoring):
  • Each item is verifiable against a diff, a test run, a query, a screenshot or a signed artifact.
  • Each item names its evidence, not just its intent.
  • Group by gate phase; keep the whole list under one screen where possible.
  • No item may be "review again later" without an owner and a date.
  • A blocked item requires an explicit waiver: reason, owner, expiry.
-->

# <Gate name> Checklist

**When to run:** <trigger — before merging a migration, before a release, during an incident review>
**Who runs it:** <role>
**Evidence to attach:** <logs, screenshots, query output, CI link>
**Standards this gate enforces:** `<id>`, `<id>`, `<id>`

## A. Before starting

- [ ] Scope and rollback plan are written down — evidence: <PR description / ADR-NNNN>
- [ ] The blast radius is known — evidence: <query showing affected rows/services/tenants>
- [ ] Owners for each step are named — evidence: <ticket assignment>
- [ ] Monitoring and alerting for the affected path is live — evidence: <dashboard link>

## B. During

- [ ] <Step> completed in the agreed order — evidence: <command output>
- [ ] Guards are active (rate limit / feature flag / write freeze) — evidence: <config diff>
- [ ] Each failure mode in the plan has been exercised in staging — evidence: <test run>
- [ ] Data integrity verified against baseline — evidence: <row counts / checksum>

## C. After

- [ ] Success criteria met — evidence: <metric before/after>
- [ ] Rollback path re-tested or explicitly waived — evidence: <run log / waiver ADR>
- [ ] Documentation and changelog updated — evidence: <commit link>
- [ ] Follow-up items filed with owners — evidence: <ticket links>
- [ ] Temporary exceptions carry an expiry date — evidence: <ADR-NNNN "Expires">

## Waivers

| Item | Reason | Owner | Expires |
|---|---|---|---|
| <item> | <why it was skipped> | @handle | YYYY-MM-DD |

## Sign-off

| Role | Name | Date | Notes |
|---|---|---|---|
| Author | | | |
| Reviewer (`<id>`) | | | |
| Release owner | | | |
