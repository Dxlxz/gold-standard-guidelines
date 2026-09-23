---
id: "dor-dod"
title: "Definition of Ready & Done"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["process", "dor", "definition", "ready", "done"]
applies_to: ["general"]
related: ["tables", "feedback"]
legacy_number: 87
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 55007
provenance: baseline

---

# Definition of Ready & Definition of Done — Gold Standard 2026

**Status:** Canonical  
**Standard level:** Gold Standard 2026  
**Canonical placement:** **Governance → DoR/DoD → Testing → Documentation**  
**UI baseline:** shadcn/ui for product-facing implementation and organisation-owned delivery/governance tooling  
**Applies to:** Features, bug fixes, migrations, integrations, designs, documentation, data pipelines, infrastructure-affecting changes, APIs, database changes, reusable Components and Patterns, and other production-bound artefacts.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements unless an approved exception is documented.

---

# 1. Purpose

## 1.1 Objective

This standard defines when work is sufficiently understood to enter committed delivery and when completed work may legitimately be represented as done.

It governs:

- Definition of Ready;
- Definition of Done;
- entry criteria;
- exit criteria;
- artefact-specific quality gates;
- required evidence;
- testing evidence;
- visual evidence;
- traces and operational evidence;
- accessibility evidence;
- security evidence;
- migration evidence;
- review evidence;
- exception handling;
- waivers;
- CI enforcement;
- branch/repository rules;
- reviewer responsibilities;
- release readiness;
- documentation of completion.

This standard MUST be applied together with:

- Security;
- Data & Database;
- API;
- State Management;
- Forms & Validation;
- Accessibility;
- Design Tokens;
- Component;
- Pattern;
- Content & UX Writing;
- Testing;
- Observability;
- Incident Management;
- Documentation;
- Governance standards.

---

## 1.2 Governing principle

The organisation MUST distinguish two questions:

**Definition of Ready:**  
*Is this work sufficiently understood, bounded, and risk-assessed to enter committed execution?*

**Definition of Done:**  
*Has this work actually met the quality, verification, documentation, operational, and governance requirements needed to be considered complete?*

Ready MUST NOT mean:

- every implementation decision has already been made;
- uncertainty has been eliminated;
- discovery is prohibited.

Done MUST NOT mean:

- code was written;
- a pull request was merged;
- a ticket moved columns;
- a demo looked correct;
- one reviewer approved;
- production did not immediately fail.

---

## 1.3 DoR is an entry gate, not a discovery ban

Definition of Ready SHOULD prevent avoidable delivery churn.

It MUST NOT prevent legitimate discovery, research, prototyping, spikes, or exploratory design.

Exploratory work MAY begin without satisfying delivery DoR when its purpose is explicitly to resolve uncertainty.

Exploration MUST NOT silently become production implementation without subsequently satisfying the applicable Ready criteria.

---

## 1.4 DoD is a shared quality floor

Definition of Done MUST provide one shared minimum understanding of completion.

Teams MAY add stricter artefact-specific criteria.

Teams MUST NOT locally weaken organisation-level mandatory criteria without an approved waiver.

If work does not meet applicable DoD criteria, it MUST NOT be represented as Done.

It MAY be represented as:

- in progress;
- implemented;
- awaiting verification;
- awaiting release;
- blocked;
- conditionally accepted under an approved waiver.

---

## 1.5 Done versus released

Done and released are related but distinct states.

Work MAY meet Definition of Done without being immediately released when release timing is intentionally separate.

Conversely, work deployed to production MUST NOT automatically be considered Done.

Emergency deployment MAY precede normal DoD completion when required by incident response, but outstanding criteria MUST be explicitly tracked through the emergency-change process.

---

## 1.6 Artefact-aware governance

One universal checklist MUST NOT be mechanically applied to every type of work.

A schema migration has different completion evidence from a documentation update.

A UI feature has different evidence from a data pipeline.

The organisation MUST therefore maintain:

1. common DoR requirements;
2. common DoD requirements;
3. artefact-specific extensions.

---

# 2. Rules

## 2.1 Common Definition of Ready

Committed delivery work MUST satisfy the applicable Ready criteria.

At minimum, the work SHOULD have:

- a clear problem or desired outcome;
- identified scope;
- known owner;
- acceptance criteria;
- relevant dependencies;
- material constraints;
- significant risks identified;
- applicable standards identified;
- sufficient design or technical direction to begin safely;
- testability understood.

---

## 2.2 Problem definition

Ready work MUST describe the problem or outcome rather than only an implementation instruction.

Prefer:

**Users cannot distinguish failed imports from imports that are still processing.**

over:

**Add a red badge.**

The proposed implementation MAY be included, but it MUST NOT replace the actual requirement.

---

## 2.3 Scope

The work MUST identify enough scope to prevent materially different interpretations.

Scope SHOULD identify:

- included behaviour;
- excluded behaviour where ambiguity is likely;
- relevant user or system actors;
- affected surfaces;
- affected services/data stores where known.

Ready work MUST NOT rely entirely on oral context.

---

## 2.4 Acceptance criteria

Material behaviour MUST have verifiable acceptance criteria.

Acceptance criteria SHOULD describe observable outcomes.

They MUST NOT be limited to statements equivalent to:

- works correctly;
- looks good;
- handle errors;
- make responsive.

Acceptance criteria MAY reference canonical standards instead of duplicating them.

For example:

**Form behaviour MUST conform to the canonical Forms & Validation standard.**

---

## 2.5 Dependencies

Known blocking dependencies MUST be identified before commitment.

Dependencies MAY include:

- upstream API;
- schema change;
- design decision;
- vendor capability;
- infrastructure;
- security review;
- legal/licensing approval;
- data availability.

An uncertain dependency MAY remain unresolved if the plan explicitly accounts for that uncertainty.

A work item MUST NOT be marked Ready when a known prerequisite makes implementation impossible.

---

## 2.6 Risk classification

Ready work SHOULD classify material risk.

Risk dimensions MAY include:

- Security;
- privacy;
- data integrity;
- migration;
- financial;
- accessibility;
- availability;
- performance;
- external integration;
- reversibility.

High-risk work MUST identify additional review or validation requirements before implementation begins.

---

## 2.7 Standard applicability

Ready work MUST identify which canonical standards materially apply.

Applicable standards MAY include:

- Security;
- API;
- Data & Database;
- Forms & Validation;
- Accessibility;
- Design Tokens;
- Components;
- Patterns;
- Tables & Data Grid;
- Feedback & Status;
- Realtime;
- Geospatial;
- Data Ingestion.

Reviewers SHOULD NOT rediscover fundamental standards applicability only after implementation is complete.

---

## 2.8 Testability

Ready work MUST be testable.

The team SHOULD understand:

- what can be automated;
- what requires human verification;
- what operational evidence will be required.

Where behaviour cannot be tested conventionally, the work MUST identify an alternative verification approach.

---

## 2.9 Design readiness

UI work SHOULD have enough design direction to implement without inventing material product behaviour.

This MAY include:

- approved design;
- approved Pattern;
- wireframe;
- existing canonical Component behaviour;
- written interaction specification.

Pixel-complete visual design is NOT always required.

Implementation MUST NOT invent unresolved high-consequence interaction semantics merely to maintain delivery velocity.

---

## 2.10 Technical readiness

Complex backend or infrastructure work SHOULD have sufficient technical direction before commitment.

This MAY include:

- architecture note;
- API contract;
- migration plan;
- data model;
- sequence diagram;
- operational plan.

A formal design document is NOT mandatory for every small change.

Documentation depth MUST be proportional to risk.

---

## 2.11 Unknowns

Material unknowns MUST be explicit.

A work item MAY still be Ready with known uncertainty if:

- uncertainty is bounded;
- investigation is part of the planned work;
- failure to resolve it does not create uncontrolled delivery risk.

Unknowns MUST NOT be disguised as assumptions.

---

## 2.12 Common Definition of Done

Unless an artefact-specific rule overrides it, completed work MUST satisfy the following applicable conditions:

- acceptance criteria satisfied;
- implementation reviewed;
- required automated tests passing;
- required manual verification completed;
- security requirements satisfied;
- accessibility requirements satisfied;
- data/API compatibility handled;
- observability updated where relevant;
- documentation updated;
- deployment/release implications addressed;
- no unresolved blocker invalidates completion;
- required evidence attached or linked.

---

## 2.13 Evidence-based completion

DoD MUST be supported by evidence.

A checkbox without evidence MAY satisfy a low-risk declarative criterion only when the organisation explicitly permits it.

Material completion claims SHOULD reference verifiable evidence.

Evidence MAY include:

- CI test result;
- automated accessibility report;
- screenshot;
- video;
- trace;
- log/query result;
- benchmark;
- migration dry-run;
- schema-diff result;
- deployment result;
- monitoring link;
- review approval;
- test case;
- documentation diff.

---

## 2.14 Evidence proportionality

Evidence MUST be proportional to risk.

A documentation typo does not require production traces.

A database migration affecting millions of records MUST NOT be approved based solely on a screenshot.

Teams SHOULD avoid evidence theatre.

Evidence exists to prove relevant quality, not to maximise attachment count.

---

## 2.15 Evidence durability

Required evidence MUST remain accessible long enough to support:

- review;
- audit;
- incident investigation;
- regulated requirements where applicable.

Ephemeral local evidence SHOULD NOT be the sole proof for high-consequence work.

Evidence links SHOULD remain associated with the pull request, work item, release record, or equivalent governed artefact.

---

# 2.16 Feature Definition of Ready

A feature MUST be Ready when applicable criteria are satisfied.

The feature SHOULD have:

- user/problem outcome;
- target user or actor;
- acceptance criteria;
- interaction Pattern;
- API/data impact identified;
- permissions identified;
- edge/error/loading/empty states considered;
- accessibility requirements identified;
- responsive requirements identified;
- analytics/observability need identified.

Feature Ready MUST NOT require every minor visual detail to be final when canonical Components/Patterns already determine it.

---

# 2.17 Feature Definition of Done

A feature MUST NOT be considered Done until, where applicable:

- functional acceptance criteria pass;
- success/error/loading/empty states are implemented;
- authorization is enforced server-side;
- API contract is correct;
- persistent data model is correct;
- state ownership follows State Management;
- Forms & Validation rules are satisfied;
- Accessibility requirements are verified;
- design matches canonical Tokens/Components/Patterns;
- responsive behaviour is verified;
- tests pass;
- observability exists where operationally required;
- user/developer documentation is updated.

---

## 2.18 Feature evidence

UI feature evidence SHOULD include, where relevant:

- automated test results;
- representative screenshots;
- responsive screenshots or equivalent review;
- keyboard-navigation evidence;
- accessibility scan results;
- manual accessibility confirmation for applicable behaviours;
- network/API evidence where significant;
- logs/traces for material asynchronous flows.

Screenshots MUST NOT replace functional testing.

---

# 2.19 Bugfix Definition of Ready

A bugfix SHOULD have:

- reproducible or otherwise sufficiently characterised failure;
- expected behaviour;
- affected environment/version;
- impact/severity;
- evidence of failure where useful;
- likely scope;
- regression-test strategy.

A perfectly reproducible test case is NOT mandatory when failures are intermittent, production-only, or timing dependent.

In such cases, available evidence and observability MUST be sufficient to justify the planned fix.

---

# 2.20 Bugfix Definition of Done

A bugfix MUST demonstrate that:

- the defect is corrected;
- expected behaviour is restored;
- a regression path is tested where practical;
- adjacent behaviour has not materially regressed;
- root cause or contributing mechanism is sufficiently understood for the chosen fix.

A bugfix MUST NOT merely suppress the visible symptom while knowingly preserving the underlying correctness defect unless the change is explicitly a temporary mitigation.

---

## 2.21 Bugfix evidence

Bugfix evidence SHOULD include:

- failing-before/passing-after automated test where feasible;
- reproduction evidence;
- trace/log evidence for backend failures;
- visual before/after evidence for visual defects where useful.

A test written only after the fix MAY still be valid if it demonstrably fails against the prior defective version.

---

# 2.22 Migration Definition of Ready

Database, infrastructure, platform, or data migrations MUST have an explicit Ready assessment.

Ready MUST identify, where applicable:

- source and target state;
- affected data/services;
- compatibility period;
- forward plan;
- rollback or roll-forward strategy;
- expected duration;
- locking/downtime risk;
- capacity/resource impact;
- backup/recovery requirement;
- monitoring;
- owner.

A migration with material irreversible consequences MUST NOT begin without a documented recovery strategy.

---

# 2.23 Migration Definition of Done

A migration MUST NOT be Done merely because the migration command completed.

Completion MUST verify:

- target state is correct;
- integrity checks pass;
- application compatibility is confirmed;
- required traffic/data has moved;
- monitoring is healthy;
- obsolete path removal is complete or separately tracked;
- rollback artefacts are handled;
- documentation reflects the new state.

For staged migrations, completion MAY require all phases rather than the first schema deployment.

---

## 2.24 Migration evidence

Migration evidence SHOULD include, as applicable:

- dry-run result;
- migration test;
- row/object counts;
- checksums/reconciliation;
- query plans;
- runtime estimate;
- lock analysis;
- staging rehearsal;
- production verification;
- rollback/restore exercise;
- monitoring/traces.

High-risk migrations SHOULD provide quantitative rather than purely visual evidence.

---

# 2.25 Integration Definition of Ready

External integrations MUST identify:

- provider/system;
- documented contract;
- authentication method;
- authorization/scope;
- rate limits;
- expected failure modes;
- retry/idempotency semantics;
- data mapping;
- sandbox/test environment;
- ownership;
- vendor dependency risk.

Secrets MUST NOT be included directly in Ready artefacts.

---

# 2.26 Integration Definition of Done

An integration MUST verify:

- happy path;
- authentication failure;
- authorization failure;
- timeout;
- retry behaviour;
- provider errors;
- idempotency where applicable;
- malformed/unexpected responses;
- rate limiting;
- observability;
- secret handling;
- provider outage behaviour.

Integration completion MUST include operational ownership.

A working sandbox demo alone MUST NOT establish Done.

---

## 2.27 Integration evidence

Evidence MAY include:

- contract tests;
- sandbox execution;
- recorded safe fixture;
- traces;
- webhook-signature tests;
- retry tests;
- outage simulation;
- rate-limit test;
- provider configuration evidence.

Sensitive credentials MUST NOT appear in attached evidence.

---

# 2.28 Design Definition of Ready

A design artefact SHOULD begin committed implementation review when:

- user/problem context is understood;
- affected workflow is identified;
- relevant existing Components/Patterns are known;
- constraints are identified;
- required content is available or represented realistically.

Design Ready MUST NOT require visual exploration to have already concluded before design work itself begins.

---

# 2.29 Design Definition of Done

A design artefact MUST satisfy applicable:

- interaction requirements;
- visual hierarchy;
- Design Tokens;
- Components;
- Patterns;
- Accessibility;
- Content & UX Writing;
- responsive behaviour;
- state coverage.

Design MUST show or specify material states such as:

- default;
- loading;
- empty;
- success;
- error;
- disabled;
- destructive;
- validation;
- responsive variants.

A happy-path desktop frame alone MUST NOT qualify as complete design for a production feature requiring more states.

---

## 2.30 Design evidence

Design evidence SHOULD include:

- canonical design source;
- interaction notes;
- responsive state;
- accessibility annotations where non-obvious;
- Component/Pattern references;
- content copy;
- state variants.

Design review MUST NOT require screenshots duplicated from an already authoritative design source unless they improve implementation/review traceability.

---

# 2.31 Documentation Definition of Ready

Documentation work SHOULD identify:

- audience;
- purpose;
- authoritative source material;
- owner;
- publication location;
- review needs.

Technical documentation SHOULD identify the implementation/version it describes.

---

# 2.32 Documentation Definition of Done

Documentation MUST be:

- factually correct;
- current;
- appropriately scoped;
- understandable to its intended audience;
- linked/discoverable where required.

Code/API documentation MUST match actual shipped behaviour.

Documentation MUST NOT claim future or conceptual behaviour as currently available unless clearly labelled.

Broken links and outdated screenshots SHOULD be corrected before publication where they materially affect understanding.

---

## 2.33 Documentation evidence

Evidence MAY include:

- build/link-check results;
- rendered preview;
- technical reviewer approval;
- example execution;
- accessibility check for published docs.

Documentation review SHOULD validate substance, not only spelling and grammar.

---

# 2.34 Data-pipeline Definition of Ready

Data pipeline work MUST identify, as applicable:

- source;
- destination;
- data contract;
- expected volume;
- freshness requirement;
- delivery semantics;
- incremental/watermark strategy;
- schema-evolution policy;
- validation;
- quarantine;
- replay/backfill;
- lineage;
- security classification;
- cost/capacity.

Ready MUST identify how pipeline correctness will be validated.

---

# 2.35 Data-pipeline Definition of Done

A pipeline MUST NOT be considered Done merely because one execution succeeds.

Completion MUST establish, where applicable:

- idempotency;
- retry safety;
- replay behaviour;
- backfill behaviour;
- schema handling;
- validation;
- quarantine/DLQ handling;
- reconciliation;
- freshness monitoring;
- ownership;
- runbook;
- alerting;
- lineage/provenance.

Production pipeline observability MUST demonstrate that the pipeline can be operated after the implementing engineer leaves.

---

## 2.36 Data-pipeline evidence

Evidence SHOULD include, as applicable:

- normal-run test;
- duplicate input test;
- partial-failure test;
- retry;
- backfill/replay test;
- validation/quarantine result;
- reconciliation result;
- freshness metric;
- trace/log sample;
- cost/performance measurement.

---

# 2.37 API-change Ready criteria

Any material API change MUST identify:

- contract;
- consumers;
- compatibility impact;
- authentication/authorization;
- error semantics;
- versioning requirement;
- rate limits;
- idempotency where relevant.

Breaking changes MUST NOT enter ordinary implementation without an approved compatibility/migration plan.

---

# 2.38 API-change Done criteria

An API change MUST verify:

- schema/contract;
- authorization;
- validation;
- error format;
- compatibility;
- documentation;
- consumer impact;
- observability where required.

Published OpenAPI/schema artefacts SHOULD be generated or checked against actual behaviour where architecture permits.

---

# 2.39 Security evidence

Work affecting a Security boundary MUST include proportionate security evidence.

This MAY include:

- static analysis;
- dependency scanning;
- secret scanning;
- authorization tests;
- tenant-isolation tests;
- threat-model review;
- penetration/security test;
- manual Security approval.

Passing automated scanners MUST NOT be treated as proof that authorization or business logic is secure.

---

# 2.40 Accessibility evidence

User-facing UI changes MUST provide applicable accessibility evidence.

Automated accessibility checks SHOULD run in CI for supported surfaces.

Manual testing MUST supplement automation where behaviour cannot be validated mechanically.

Manual checks SHOULD include, where relevant:

- keyboard-only interaction;
- focus order;
- focus visibility;
- accessible name/role/value;
- error announcement;
- live-region behaviour;
- screen-reader behaviour for novel/complex Components;
- zoom/reflow;
- reduced motion.

An automated accessibility score MUST NOT be treated as complete accessibility evidence.

---

# 2.41 Visual evidence

Visual evidence SHOULD be required when visual or responsive behaviour materially changed.

Screenshots SHOULD show representative states rather than every possible pixel configuration.

Evidence SHOULD include dark mode when the affected visual treatment has meaningful theme-specific behaviour.

Visual-regression tests MAY replace routine manual screenshots when they provide stronger controlled evidence.

Screenshot evidence MUST use safe synthetic or authorised data.

---

# 2.42 Trace and observability evidence

Backend, distributed, asynchronous, and performance-sensitive changes SHOULD provide traces or equivalent operational evidence where they materially prove behaviour.

Relevant evidence MAY demonstrate:

- dependency call;
- latency;
- retries;
- database query;
- queue handoff;
- async completion;
- failure propagation.

A screenshot of a success message MUST NOT be considered sufficient evidence that a multi-service transaction behaves correctly.

---

# 2.43 Performance evidence

Changes with material performance risk MUST establish acceptable performance.

Evidence MAY include:

- benchmark;
- query plan;
- load test;
- bundle size;
- Web Vitals;
- memory profile;
- database execution metrics.

Teams MUST NOT require performance benchmarks for every trivial change.

---

# 2.44 Evidence attachment

Required manual evidence SHOULD be attached or linked from the pull request/change record.

Reviewers MUST NOT be expected to locate evidence from unrelated chat threads.

Evidence references SHOULD be concise and clearly labelled.

---

# 2.45 Automated DoD enforcement

Criteria that can be reliably automated SHOULD be enforced automatically.

CI SHOULD enforce applicable:

- compile/type checks;
- formatting/lint;
- unit tests;
- integration tests;
- contract tests;
- migration validation;
- security scans;
- secret scans;
- accessibility scans;
- build;
- documentation checks.

A required CI gate MUST have a clear quality purpose.

---

# 2.46 Mandatory CI gates

Required checks MUST block merge when they represent mandatory DoD requirements.

A failing mandatory check MUST NOT be bypassed merely because:

- the change is small;
- a deadline is near;
- a senior engineer approves;
- "it works locally."

Any bypass MUST use the formal waiver/emergency process.

---

# 2.47 Branch and repository enforcement

Protected release branches MUST enforce appropriate:

- pull-request review;
- required CI/status checks;
- conversation resolution;
- protected push/bypass rules.

Repositories MUST NOT rely solely on social convention for mandatory quality controls when platform enforcement is practical.

Direct pushes to protected production branches SHOULD be prohibited except through tightly controlled emergency mechanisms.

---

# 2.48 Check ownership

Every mandatory CI check MUST have an owner.

A flaky, obsolete, or unmaintained required check is a governance defect.

Teams MUST NOT normalise repeatedly rerunning flaky CI until it turns green.

Flaky checks SHOULD be:

- fixed;
- quarantined with explicit risk tracking;
- replaced.

---

# 2.49 Required-check determinism

A mandatory check SHOULD produce a reasonably deterministic result.

External dependency instability SHOULD be isolated where practical.

False failures that routinely block unrelated changes erode trust in the entire DoD system.

---

# 2.50 Review enforcement

Human review MUST verify criteria that CI cannot adequately determine.

Reviewers SHOULD verify applicable:

- architecture;
- domain correctness;
- authorization logic;
- accessibility behaviour;
- UX;
- maintainability;
- compatibility;
- evidence sufficiency.

Human review MUST NOT mechanically duplicate information already proven reliably by automation.

---

# 2.51 Reviewer accountability

Approval means the reviewer has assessed the parts within their review scope.

Reviewers MUST NOT approve merely to unblock a queue without understanding the material change.

Specialist approval SHOULD be required when the organisation defines one for areas such as:

- Security;
- database migrations;
- accessibility;
- architecture;
- design system.

Specialist review MUST remain proportionate to risk.

---

# 2.52 Self-review

Authors MUST perform self-review before requesting final review.

Self-review SHOULD verify:

- accidental files;
- debugging code;
- secrets;
- incomplete comments;
- obvious test gaps;
- scope creep;
- documentation.

Pull requests MUST NOT use other reviewers as the first basic quality pass.

---

# 2.53 Review scope

Changes SHOULD remain sufficiently bounded for meaningful review.

Very large changes SHOULD be decomposed when doing so improves reviewability without increasing migration or integration risk.

Artificially splitting one atomic change into fragments that cannot be reviewed independently SHOULD be avoided.

---

# 2.54 Pull-request evidence template

Repositories SHOULD provide a standard review template appropriate to their work.

A canonical template MAY include:

- change summary;
- linked requirement;
- risk;
- test evidence;
- visual evidence;
- accessibility evidence;
- migration/deployment notes;
- waiver links.

Template fields that do not apply SHOULD support an explicit **Not applicable** outcome.

Authors SHOULD NOT be forced to invent meaningless content solely to satisfy every template field.

---

# 2.55 Applicability matrix

The organisation SHOULD define an applicability matrix mapping change classes to required evidence.

For example:

| Change class | Automated tests | Screenshot | Manual a11y | Trace/log | Migration evidence |
|---|---|---|---|---|---|
| UI feature | MUST | SHOULD | MUST where interactive | MAY | N/A |
| Backend feature | MUST | N/A | N/A | SHOULD where distributed | MAY |
| Bugfix | MUST where feasible | if visual | if UI/a11y related | if operational | if applicable |
| Migration | MUST | N/A | N/A | SHOULD | MUST |
| Documentation | build/link checks where available | MAY | if rendered UX affected | N/A | N/A |
| Data pipeline | MUST | N/A | operator UI only | MUST/SHOULD | replay/backfill evidence |

This matrix MUST remain guidance to applicability rather than a substitute for judgement.

---

# 2.56 Not applicable

A criterion MAY be marked **Not applicable** only when it genuinely does not apply.

Not applicable MUST NOT be used as an informal waiver for applicable work.

Where applicability is non-obvious, a short justification SHOULD be recorded.

---

# 2.57 Exception versus waiver

The standard MUST distinguish:

**Exception:**  
The rule does not apply because the work falls outside its defined scope.

**Waiver:**  
The rule applies, but the organisation knowingly accepts temporary or permanent risk by allowing non-conformance.

These MUST NOT be conflated.

---

# 2.58 Waiver requirements

A waiver MUST document:

- requirement being waived;
- affected artefact;
- reason;
- risk;
- compensating controls;
- approving authority;
- owner;
- expiry or review condition;
- remediation reference where temporary.

"I approve" in a chat message is not sufficient for material waivers.

---

# 2.59 Waiver authority

Waiver approval MUST be proportionate to the requirement.

Examples MAY include:

- service owner for low-risk operational criterion;
- Security for Security requirement;
- Data owner for high-risk data-integrity criterion;
- Accessibility owner for approved temporary accessibility exception;
- governance/architecture authority for systemic exceptions.

Authors MUST NOT self-approve material waivers.

---

# 2.60 Waiver expiry

Temporary waivers MUST have an expiry date, milestone, or explicit review condition.

Expired waivers MUST NOT silently remain valid.

CI SHOULD automatically detect or surface expired machine-readable waivers where practical.

---

# 2.61 Waiver remediation

Temporary waivers MUST link to remediation work when remediation is required.

The waived item MUST NOT disappear into an unowned backlog.

High-risk waiver debt SHOULD be visible in governance review.

---

# 2.62 Emergency changes

Incident response MAY require implementation before ordinary DoR or DoD is fully satisfied.

Emergency changes MUST:

- be authorised under Incident Management;
- minimise scope;
- preserve Security and integrity constraints as far as possible;
- be documented;
- receive retrospective review.

Missing normal DoD requirements MUST be completed or explicitly waived after service stabilises.

"Emergency" MUST NOT become a routine delivery category.

---

# 2.63 Hotfixes

A hotfix MAY use an accelerated review/testing process when delay creates greater production risk.

Hotfixes SHOULD still include:

- focused regression test;
- peer review where practical;
- deployment verification;
- rollback capability.

The quality standard is not erased; the sequence and evidence depth MAY be risk-adjusted.

---

# 2.64 Release evidence

Where deployment is separate from merge, release-specific DoD SHOULD verify:

- correct artefact/version deployed;
- migrations succeeded;
- feature flags/configuration correct;
- critical smoke tests pass;
- monitoring healthy.

Merge completion MUST NOT automatically prove release completion.

---

# 2.65 Feature flags

Code behind a disabled feature flag MAY meet implementation DoD before public exposure.

The flag itself MUST have:

- ownership;
- default state;
- rollout plan;
- removal plan where temporary.

A permanently disabled unfinished feature MUST NOT be represented as delivered user value.

---

# 2.66 Documentation updates

Done work MUST update documentation when it changes a documented contract.

This MAY include:

- API docs;
- architecture;
- operational runbook;
- user docs;
- component docs;
- schema docs;
- migration docs.

Documentation MUST be updated in the same change or through an explicitly linked required follow-up when simultaneous publication is impractical.

---

# 2.67 Operational readiness

Changes creating new operational failure modes MUST update operational readiness.

This MAY include:

- metrics;
- alerts;
- dashboard;
- runbook;
- ownership;
- SLO.

A new production service MUST NOT be considered Done if nobody can determine whether it is healthy.

---

# 2.68 Observability

Observability evidence MUST be tied to user/system outcomes rather than log existence alone.

Adding a log line does not necessarily establish adequate observability.

Critical flows SHOULD have enough telemetry to answer:

- is it working;
- how fast;
- how often failing;
- which dependency failed;
- whether data is fresh/correct where relevant.

---

# 2.69 Security relationship

DoR MUST identify material Security impact before implementation where foreseeable.

DoD MUST verify applicable:

- authentication;
- authorization;
- tenant isolation;
- secret handling;
- input validation;
- dependency/security checks.

Security MUST NOT be deferred until final review for high-risk changes.

---

# 2.70 Data & Database relationship

Changes affecting data MUST satisfy Data & Database standards.

DoD MUST consider:

- integrity;
- transactions;
- constraints;
- migrations;
- rollback;
- reconciliation;
- versioning.

A successful UI/API test MUST NOT establish that underlying data semantics are correct.

---

# 2.71 API relationship

API work MUST satisfy the canonical API contract.

DoD SHOULD include applicable:

- schema tests;
- validation;
- errors;
- auth;
- compatibility;
- versioning;
- idempotency;
- documentation.

A consumer-visible breaking change MUST NOT be Done without its approved migration/version strategy.

---

# 2.72 State Management relationship

UI changes MUST use canonical state ownership.

DoD SHOULD verify:

- authoritative server state;
- optimistic reconciliation;
- persisted preferences;
- URL/shareable state;
- ephemeral state;

according to the State Management standard.

A UI that appears correct through duplicated inconsistent local state MUST NOT pass DoD.

---

# 2.73 Forms & Validation relationship

Forms MUST satisfy Forms & Validation DoD.

Evidence SHOULD cover:

- client validation;
- authoritative server validation;
- error association;
- submission state;
- preservation after failure;
- accessible errors.

A successful happy-path submission is insufficient.

---

# 2.74 Accessibility relationship

Accessibility is part of Done, not optional final QA.

User-facing work MUST satisfy applicable Accessibility requirements before being considered Done unless an explicit approved waiver exists.

Automated checking SHOULD be part of CI.

Novel or interaction-heavy components require appropriate manual validation.

---

# 2.75 Design Tokens relationship

Visual implementations MUST use canonical Design Tokens.

Raw values or one-off styling that bypass required token/component systems SHOULD fail design-system review where equivalent tokens exist.

DoD MUST NOT accept a visually matching screenshot if the implementation violates canonical architecture.

---

# 2.76 Component relationship

Reusable and product UI MUST use canonical Components where applicable.

New reusable behaviour SHOULD be promoted into canonical components when repetition justifies it.

Feature code MUST NOT duplicate existing shadcn/ui-based canonical Components merely because direct copying is faster.

---

# 2.77 Pattern relationship

Complete workflows MUST conform to canonical Patterns.

DoD review MUST evaluate behaviour, not only individual component correctness.

A technically correct dialog inside the wrong destructive-action workflow is not done.

---

# 2.78 shadcn/ui baseline

Organisation-owned UI MUST use shadcn/ui as the Component baseline unless a documented exception applies.

DoD SHOULD verify that feature code:

- uses canonical project-owned shadcn-based components;
- preserves accessibility behaviour;
- uses approved variants;
- does not create parallel design systems.

shadcn/ui conformance MUST NOT substitute for the broader Component, Pattern, Accessibility, Forms, or Design Token standards.

---

# 2.79 Test ownership

Tests added to satisfy DoD become maintained product code.

Tests MUST NOT be written only to appease coverage tooling while failing to verify useful behaviour.

Tests SHOULD focus on stable contracts and meaningful risk.

---

# 2.80 Coverage metrics

Coverage percentage MAY be used as one quality signal.

Coverage MUST NOT be the Definition of Done.

High line coverage does not prove:

- correct assertions;
- security;
- accessibility;
- integration correctness;
- absence of edge-case defects.

Coverage thresholds SHOULD be used cautiously.

---

# 2.81 Manual test evidence

Manual testing MUST be reproducible enough that a reviewer understands what was tested.

A statement equivalent to **tested manually** is insufficient for high-risk changes.

The evidence SHOULD identify relevant:

- environment;
- scenario;
- outcome.

---

# 2.82 Production-only verification

Some criteria MAY require production verification.

The change MAY enter a **Done / awaiting production verification** or equivalent governed state only if the organisational delivery model defines it.

Production verification MUST be completed and recorded.

Teams MUST NOT permanently bypass verification because it cannot occur before deployment.

---

# 2.83 DoR/DoD ownership

The canonical DoR/DoD standard MUST have a governance owner.

Individual standards own their domain-specific requirements.

Teams MAY maintain artefact extensions but MUST NOT silently redefine global mandatory criteria.

---

# 2.84 Periodic review

The organisation SHOULD review DoR/DoD periodically.

Criteria SHOULD be removed when they:

- no longer prevent meaningful defects;
- are duplicated by stronger automation;
- create repeated meaningless compliance.

Criteria SHOULD be strengthened when incidents, defects, or reviews expose systematic gaps.

---

# 2.85 Metrics

Governance MAY measure:

- CI failure categories;
- escaped defects;
- waiver volume;
- waiver age;
- flaky test rate;
- review turnaround;
- post-release rollback.

Metrics MUST NOT encourage checklist gaming.

A low waiver count is not automatically healthy if teams simply avoid documenting non-conformance.

---

# 2.86 Exceptions

A deviation from this standard MUST follow the waiver model where an applicable requirement is knowingly unmet.

A team MUST NOT create an alternative local meaning of Ready or Done solely to avoid canonical gates.

Repeated waivers against one requirement SHOULD trigger governance review to determine whether:

- the standard is wrong;
- tooling is insufficient;
- systemic remediation is required.

---

# 3. Anti-patterns

The following are non-conformant unless explicitly covered by an approved exception.

## 3.1 Ticket exists therefore Ready

A work item enters committed delivery despite having no clear outcome, scope, or acceptance criteria.

## 3.2 Ready means fully specified

No work can start until every implementation detail is predetermined, eliminating useful discovery.

## 3.3 Hidden unknowns

Material uncertainty is disguised as certainty to pass planning gates.

## 3.4 Ready by ceremony

A product owner moves the ticket to Ready, therefore it is considered Ready regardless of content.

## 3.5 Code complete equals Done

Implementation compiles, so the item is marked complete despite missing tests, accessibility, or documentation.

## 3.6 Merged equals Done

Pull-request merge is treated as universal proof of completion.

## 3.7 Deployed equals Done

Production deployment occurs, therefore correctness is assumed.

## 3.8 Demo equals proof

A successful happy-path demonstration replaces automated and edge-case testing.

## 3.9 Screenshot-driven QA

Screenshots are treated as proof that behaviour, authorization, persistence, and accessibility work.

## 3.10 Test-count theatre

A change adds many low-value tests to appear complete while important behaviours remain uncovered.

## 3.11 Coverage worship

A high line-coverage percentage substitutes for meaningful quality evidence.

## 3.12 Accessibility scanner equals accessible

One automated accessibility report is treated as complete evidence for complex interactive UI.

## 3.13 Security scanner equals secure

Passing SAST/dependency scanning is treated as proof that authorization and business logic are correct.

## 3.14 Works on my machine

Local manual success is the sole evidence for production-bound behaviour.

## 3.15 Migration command succeeded

A migration is marked complete without validating data integrity or application compatibility.

## 3.16 Sandbox-only integration

A vendor integration is Done because one sandbox happy path succeeded.

## 3.17 Design happy path

A design is approved with one desktop success state and no loading, validation, error, or responsive behaviour.

## 3.18 Documentation cosmetic review

Review corrects grammar but does not verify technical accuracy.

## 3.19 Pipeline ran once

A data pipeline is Done because one sample execution completed.

## 3.20 Logging equals observability

A new service is considered operable because it emits logs but has no health, alerting, or ownership.

## 3.21 Checkbox evidence

Every checklist item is checked without links, tests, or meaningful validation.

## 3.22 Evidence avalanche

Authors attach dozens of irrelevant screenshots and logs so reviewers cannot locate the proof that matters.

## 3.23 Chat evidence

Critical evidence exists only in an ephemeral private conversation.

## 3.24 CI theatre

Checks exist but are optional, routinely ignored, or not enforced before merge.

## 3.25 Retry CI until green

A flaky required check is repeatedly rerun instead of fixed.

## 3.26 Admin bypass culture

Senior engineers regularly bypass branch protection for convenience.

## 3.27 Reviewer as CI

Humans spend review time checking formatting, compilation, or routine tests that automation should enforce.

## 3.28 CI as architect

Passing automated checks is treated as proof that architecture and product behaviour are correct.

## 3.29 LGTM without review

Approval is given solely to unblock delivery.

## 3.30 Giant review

A huge mixed-purpose change is presented as one indivisible review despite being practically unverifiable.

## 3.31 Template fiction

Authors enter `N/A` for every inconvenient pull-request field without assessing applicability.

## 3.32 N/A as waiver

An applicable failed criterion is marked not applicable to avoid formal exception handling.

## 3.33 Slack waiver

A material requirement is bypassed because someone wrote "okay to merge" in chat.

## 3.34 Eternal waiver

A temporary accessibility/security/test waiver has no expiry and remains indefinitely.

## 3.35 Self-approved waiver

The change author accepts the risk of bypassing a material organisational requirement.

## 3.36 Emergency normalisation

Routine work is labelled hotfix/emergency to evade normal gates.

## 3.37 Post-hoc Ready

DoR criteria are filled out after implementation simply to satisfy workflow tooling.

## 3.38 Documentation later

Required docs are repeatedly deferred to future tickets that are never completed.

## 3.39 Feature-flag cemetery

Incomplete work remains behind permanent flags and is counted as delivered.

## 3.40 Token-compliant screenshot

A UI looks correct visually while bypassing canonical Components, Tokens, or accessibility semantics.

## 3.41 Manual authorization test only

A security-critical permission change has no repeatable regression protection.

## 3.42 Production as test environment

A risky migration is first meaningfully validated against production.

## 3.43 No rollback because tested

A high-risk migration omits recovery planning because staging succeeded.

## 3.44 Pipeline no replay test

A production ingestion system claims completion without proving retries or replay are safe.

## 3.45 Done by ticket state

Workflow software, rather than verified criteria, is treated as the authority on completion.

---

# 4. Checklist

A team or artefact conforms to this standard only when the following can be answered **yes** where applicable.

### Common Definition of Ready

- [ ] The problem or required outcome is clear.
- [ ] Scope is sufficiently bounded.
- [ ] Acceptance criteria are verifiable.
- [ ] Ownership is identified.
- [ ] Known blockers/dependencies are identified.
- [ ] Material risks are identified.
- [ ] Relevant standards are identified.
- [ ] Testability is understood.
- [ ] Significant unknowns are explicit.
- [ ] Discovery work is separated from committed production work where necessary.

### Common Definition of Done

- [ ] Acceptance criteria are satisfied.
- [ ] Mandatory CI checks pass.
- [ ] Required human review is complete.
- [ ] Required tests pass.
- [ ] Required manual verification is complete.
- [ ] Security requirements are satisfied.
- [ ] Accessibility requirements are satisfied.
- [ ] Data/API compatibility is addressed.
- [ ] Required documentation is updated.
- [ ] Operational readiness is addressed.
- [ ] Required evidence is attached or linked.
- [ ] No applicable criterion is being hidden as N/A.

### Feature

- [ ] Loading, empty, failure, success, and disabled states are handled where relevant.
- [ ] Responsive behaviour is verified.
- [ ] Authorization is enforced server-side.
- [ ] State ownership follows canonical State Management.
- [ ] Forms follow Forms & Validation.
- [ ] UI follows Tokens, Components, and Patterns.
- [ ] Representative visual evidence exists where useful.
- [ ] Accessibility evidence is present.
- [ ] Relevant telemetry exists.

### Bugfix

- [ ] Failure is sufficiently characterised.
- [ ] Expected behaviour is clear.
- [ ] The correction addresses the defect rather than only masking it.
- [ ] Regression coverage exists where practical.
- [ ] Adjacent behaviour was considered.
- [ ] Before/after evidence exists where useful.

### Migration

- [ ] Source/target state is explicit.
- [ ] Compatibility strategy is documented.
- [ ] Rollback or roll-forward recovery is understood.
- [ ] Resource/locking impact is understood.
- [ ] Migration has been rehearsed at a proportional level.
- [ ] Integrity/reconciliation evidence exists.
- [ ] Production verification criteria exist.
- [ ] Old-path cleanup is completed or explicitly tracked.

### Integration

- [ ] Authentication and authorization are correct.
- [ ] Provider contract/version is understood.
- [ ] Rate limits are handled.
- [ ] Timeout/retry semantics are tested.
- [ ] Idempotency is addressed where needed.
- [ ] Failure/outage handling is tested.
- [ ] Secrets are handled canonically.
- [ ] Operational ownership exists.

### Design

- [ ] The user/problem context is represented.
- [ ] Canonical Components/Patterns were considered.
- [ ] Relevant states are designed.
- [ ] Responsive behaviour is defined.
- [ ] Accessibility requirements are represented.
- [ ] UX copy is present and reviewed where material.
- [ ] Design uses canonical Tokens.

### Documentation

- [ ] Intended audience is clear.
- [ ] Technical facts match implementation.
- [ ] Examples work.
- [ ] Links/build checks pass where available.
- [ ] Version applicability is clear.
- [ ] Conceptual/future behaviour is labelled appropriately.
- [ ] Documentation is discoverable from the appropriate canonical location.

### Data pipeline

- [ ] Data contract is defined.
- [ ] Idempotency/retry behaviour is verified.
- [ ] Incremental/watermark semantics are defined.
- [ ] Schema evolution is handled.
- [ ] Validation/quarantine is implemented.
- [ ] Replay/backfill is tested.
- [ ] Reconciliation exists.
- [ ] Freshness is observable.
- [ ] Ownership and runbook exist.

### Evidence

- [ ] Evidence is proportional to risk.
- [ ] Automated evidence is preferred where reliable.
- [ ] Manual evidence identifies what was checked.
- [ ] Screenshots use safe data.
- [ ] Visual evidence does not substitute for functional testing.
- [ ] Accessibility evidence includes manual validation where automation is insufficient.
- [ ] Distributed/backend changes provide operational evidence where appropriate.
- [ ] Evidence remains discoverable with the change record.

### CI enforcement

- [ ] Mandatory checks block merge.
- [ ] Required status checks correspond to actual DoD requirements.
- [ ] Protected branches prevent casual bypass.
- [ ] Every required check has an owner.
- [ ] Flaky checks are treated as defects.
- [ ] Secret/security scanning is enabled where required.
- [ ] Accessibility automation is enabled for applicable UI.
- [ ] Documentation/schema/migration validation is automated where practical.

### Review

- [ ] Author self-review occurred.
- [ ] Review scope is manageable.
- [ ] Reviewers assessed applicable architectural/domain concerns.
- [ ] Specialist review occurred where policy requires it.
- [ ] Review did not merely duplicate CI.
- [ ] Approval reflects actual review rather than queue-clearing.

### Waivers and exceptions

- [ ] N/A means genuinely not applicable.
- [ ] Applicable non-conformance uses a formal waiver.
- [ ] Waiver identifies requirement and risk.
- [ ] Compensating controls are documented.
- [ ] Appropriate authority approved it.
- [ ] Temporary waivers have expiry/review conditions.
- [ ] Required remediation is tracked.
- [ ] Expired waivers cannot silently remain active.

### Release and operations

- [ ] Deployment-specific verification exists where required.
- [ ] Feature flags have ownership/lifecycle.
- [ ] New operational failure modes have observability.
- [ ] Runbooks are updated where required.
- [ ] Production monitoring confirms the expected state where production evidence is necessary.

### Cross-standard alignment

- [ ] Security remains authoritative for security requirements.
- [ ] Data & Database requirements are satisfied for persisted state.
- [ ] API compatibility and error contracts are satisfied.
- [ ] State Management ownership is canonical.
- [ ] Forms use canonical validation semantics.
- [ ] Accessibility is part of Done.
- [ ] Design Tokens are used rather than local design values.
- [ ] Canonical Components and shadcn/ui baseline are used.
- [ ] Complete workflows follow canonical Patterns.
- [ ] Documentation reflects actual behaviour.

---

# 5. Canonical summary

**Definition of Ready determines whether work is sufficiently understood to enter committed execution. Definition of Done determines whether work actually satisfies the required quality standard.**

**Ready MUST NOT mean all uncertainty is eliminated. Discovery, spikes, prototypes, and research MAY precede full delivery readiness.**

**Done MUST NOT mean coded, merged, deployed, demonstrated, or moved to a workflow column. Done is an evidence-supported quality state.**

**Organisation-level DoD requirements are a minimum. Teams MAY strengthen them but MUST NOT silently weaken them.**

**DoR and DoD MUST be artefact aware. Features, bug fixes, migrations, integrations, designs, documentation, and data pipelines require different evidence.**

**Features MUST prove complete interaction behaviour, including relevant loading, empty, error, validation, accessibility, responsive, state, permission, and persistence behaviour.**

**Bug fixes SHOULD produce regression protection. A visible symptom disappearing is not sufficient when the underlying defect remains.**

**Migrations MUST prove target integrity and operational safety. A successful migration command is not completion evidence.**

**Integrations MUST prove authentication, failure, retry, idempotency, rate-limit, observability, and outage behaviour where applicable. A sandbox happy path alone is insufficient.**

**Design artefacts MUST specify relevant interaction states, responsive behaviour, accessibility, Components, Patterns, and content. One happy-path desktop frame is not production-complete design.**

**Documentation MUST be technically accurate and aligned to shipped behaviour. Documentation review is not merely editorial review.**

**Data pipelines MUST prove retry, replay, idempotency, schema, validation, reconciliation, freshness, and operational ownership—not merely one successful run.**

**Evidence MUST be proportional to risk. Tests, screenshots, traces, accessibility checks, migration results, and operational signals are evidence categories, not mandatory paperwork for every change.**

**Screenshots prove appearance. They do not prove authorization, persistence, accessibility, distributed correctness, or data integrity.**

**Automated accessibility testing SHOULD be enforced in CI, but automation MUST be supplemented by manual checks for behaviours it cannot reliably validate.**

**Criteria that can be reliably automated SHOULD be enforced by CI. Mandatory quality checks MUST block merge on protected branches rather than depend only on social convention.**

**Human review MUST focus on judgement automation cannot provide: architecture, domain correctness, security logic, user experience, accessibility semantics, maintainability, compatibility, and evidence sufficiency.**

**Every required CI check MUST have an owner. Flaky gates MUST be repaired rather than routinely rerun until green.**

**Not applicable and waived are different states. N/A means the criterion genuinely does not apply; a waiver means the criterion applies but the organisation explicitly accepts non-conformance risk.**

**Material waivers MUST identify the waived requirement, risk, compensating controls, approver, owner, and expiry/review condition. Authors MUST NOT self-approve material waivers.**

**Emergency work MAY alter the sequence or depth of normal gates, but emergency delivery MUST NOT erase unresolved quality obligations. Outstanding requirements MUST be completed or formally waived after stabilisation.**

**Security, Data & Database, API, State Management, Forms & Validation, Accessibility, Design Tokens, Component, Pattern, Testing, Observability, and Documentation standards remain authoritative within their domains.**

**shadcn/ui is the UI Component baseline; visual similarity alone does not establish DoD. Implementations MUST preserve the canonical component architecture, accessibility semantics, Tokens, and Patterns.**

The Gold Standard is achieved when **Ready prevents avoidable ambiguity without blocking useful discovery, Done has one shared evidence-backed meaning, automated gates enforce what machines can reliably verify, reviewers exercise judgement where machines cannot, and exceptions remain explicit rather than becoming hidden quality debt.**

The governance model is consistent with the formal Definition of Done concept: the current Scrum Guide describes DoD as a formal shared quality state and says work that does not meet it is not part of the completed increment. citeturn285736search3 For enforcement, modern repository controls can require reviews and successful status checks before protected branches can merge, making machine-verifiable DoD criteria actual gates rather than checklist convention. citeturn522179search0turn522179search3 W3C's accessibility evaluation resources also distinguish automated and manual evaluation approaches, supporting the rule that automated accessibility checks are evidence but not a complete substitute for human validation of complex interactions. citeturn285736search1turn285736search2
