---
id: "tech-debt"
title: "Technical Debt & Refactoring"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["engineering", "tech", "technical", "debt", "refactoring"]
applies_to: ["team"]
related: ["adr"]
legacy_number: 89
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 72555
provenance: baseline

---

Below is the canonical corpus version. Its central distinction is between **principal** (cost to remove the debt) and **interest** (ongoing cost/risk caused by leaving it in place). SEI explicitly recommends maintaining an inventory of concrete technical-debt items and recording their consequences over time; this standard operationalizes that into a governed register and prioritization model. citeturn158698search3turn158698search7

# Technical Debt & Refactoring Guidelines — Gold Standard 2026

**Canonical placement:** Governance → Technical Debt → Architecture → Testing  
**Status:** Canonical  
**Applies to:** Application code, architecture, APIs, databases, infrastructure, dependencies, build systems, tests, observability, accessibility, design systems, security controls, data pipelines, AI/LLM systems, operational tooling, and long-lived software assets  
**Component baseline:** shadcn/ui  
**Normative terms:** MUST, MUST NOT, SHOULD, SHOULD NOT, MAY

---

# 1. Purpose

## 1.1 Objective

This standard defines the canonical identification, classification, scoring, ownership, prioritization, repayment, refactoring, modernization, reporting, and governance requirements for technical debt.

It covers:

1. technical-debt taxonomy;
2. deliberate versus inadvertent debt;
3. prudent versus reckless debt;
4. debt principal;
5. debt interest;
6. risk and strategic exposure;
7. debt scoring;
8. debt registers;
9. ownership;
10. review cadence;
11. repayment triggers;
12. containment;
13. refactoring;
14. rewrite decisions;
15. incremental modernization;
16. Strangler Fig replacement;
17. Branch by Abstraction;
18. parallel change;
19. characterization tests;
20. safe refactoring;
21. boy-scout cleanup;
22. migration and compatibility;
23. measurement;
24. stakeholder reporting; and
25. debt retirement.

The objective is to ensure that technical debt is treated as a **managed engineering liability or deliberate investment**, rather than:

```text
code engineers dislike
```

or:

```text
a backlog containing everything that has not yet been improved
```

SEI describes technical debt as a trade-off in which a short-term implementation or design choice increases future complexity and cost, and recommends making debt concrete through an inventory of identifiable technical-debt items and their consequences. citeturn158698search2turn158698search3

## 1.2 Core principle

The canonical debt lifecycle is:

```text
Compromise or structural problem
        ↓
Identify concrete debt item
        ↓
Classify + assign owner
        ↓
Estimate principal
        ↓
Measure/estimate interest and risk
        ↓
Choose:
  accept / contain / refactor / replace / retire
        ↓
Plan repayment trigger
        ↓
Execute incrementally
        ↓
Verify outcome
        ↓
Close or re-score
```

A technical-debt item MUST describe:

```text
what is wrong
where it exists
what consequence it creates
what will happen if it remains
```

A generic statement such as:

```text
the codebase is messy
```

is not sufficient debt documentation.

## 1.3 Technical debt is an economic metaphor

Technical debt SHOULD be used when the debt metaphor improves decision-making.

The metaphor contains two distinct concepts:

```text
Principal
    Cost to remove or restructure the debt.

Interest
    Recurring additional cost, delay, risk, or friction
    created by leaving the debt in place.
```

Example:

```text
Debt:
All billing logic is coupled to a legacy ORM.

Principal:
Approximately 8 engineer-weeks to introduce
an abstraction and migrate the affected modules.

Interest:
Every billing feature requires repeated ORM-specific
workarounds, adds ~20% implementation effort, and
makes database upgrades materially riskier.
```

The principal MAY be large while interest is low.

The principal MAY be small while interest is severe.

These MUST NOT be treated as equivalent prioritization signals.

## 1.4 Strategic debt

Technical debt MAY be deliberately accepted when doing so creates justified short-term value.

A deliberate debt decision MUST record:

```text
benefit obtained
known consequence
owner
guardrail
review/repayment trigger
```

Deliberate debt without ownership or a future review condition SHOULD be treated as unmanaged debt.

Fowler's technical-debt framing distinguishes deliberate/inadvertent and prudent/reckless debt; this standard uses those distinctions as diagnostic labels rather than as a scoring system. citeturn200988search6

## 1.5 Debt management is not zero-debt engineering

The canonical objective is NOT:

```text
eliminate all technical debt
```

The objective is:

```text
understand the debt portfolio
control harmful interest
repay debt when economics/risk justify it
avoid reckless accumulation
```

Low-interest debt in a stable, rarely modified component MAY rationally remain.

High-interest debt in a critical, frequently changed path SHOULD receive priority even if its code appears less visibly untidy.

## 1.6 Refactoring definition

Refactoring is a controlled restructuring of software that improves its internal design while preserving its externally observable behavior for the scope being refactored.

Refactoring SHOULD primarily improve:

```text
understandability
modularity
changeability
testability
maintainability
```

without introducing intentional feature behavior changes in the same step.

Large-scale restructuring MAY occur incrementally over a long period while the system remains releasable; Branch by Abstraction is one established approach for doing this. citeturn200988search0turn200988search1

## 1.7 Rewrite definition

A rewrite is a replacement effort in which material existing implementation is recreated or replaced rather than incrementally restructured.

A rewrite is NOT inherently superior to refactoring.

A rewrite introduces additional risk because the existing system typically contains:

```text
implicit behavior
undocumented edge cases
operational knowledge
integration assumptions
data semantics
historical compatibility
```

that are easy to omit.

The default modernization preference SHOULD therefore be:

```text
contain
→ refactor
→ incremental replacement
→ full rewrite only when justified
```

Fowler's updated Strangler Fig guidance describes gradual legacy modernization as an alternative to wholesale replacement, allowing behavior to move incrementally into a new implementation while the existing system continues to operate. citeturn200988search7

## 1.8 Relationship to other standards

Technical-debt management MUST align with:

- **Security:** security debt, unsupported dependencies, authorization architecture, secrets, cryptography, audit controls, threat exposure, and remediation deadlines;
- **Data & Database:** schema debt, migrations, normalization, integrity constraints, indexing, retention, concurrency, archival, and obsolete stores;
- **API:** contract debt, versioning, compatibility, deprecation, duplication, error consistency, and integration coupling;
- **State Management:** duplicated state, race conditions, obsolete stores, cache complexity, offline synchronization, and ownership;
- **Forms & Validation:** duplicated validation, inconsistent schemas, legacy form infrastructure, and validation divergence;
- **Accessibility:** inaccessible custom components, missing semantics, keyboard debt, focus debt, and remediation;
- **Design Tokens:** hard-coded visual values, inconsistent semantic states, duplicated themes, and token migration;
- **Component standards:** custom components that duplicate canonical shadcn/ui primitives or corpus components;
- **Pattern standards:** repeated local solutions that diverge from canonical product patterns;
- **Testing:** insufficient safety nets, brittle tests, missing integration coverage, excessive test runtime, and nondeterminism;
- **Architecture:** coupling, obsolete boundaries, dependency cycles, platform aging, modernization, and migration;
- **Governance:** ownership, accepted risk, planning, reporting, and evidence.

---

# 2. Rules

## 2.1 Debt MUST be concrete

Every registered technical-debt item MUST point to one or more concrete technical assets.

Examples:

```text
service
module
package
repository
database
table/schema
API
UI component
deployment pipeline
dependency
test suite
architecture boundary
```

Avoid debt items such as:

```text
Improve architecture
Clean code
Fix frontend
Modernize backend
```

These are initiatives, not sufficiently defined debt items.

---

## 2.2 Debt taxonomy

Every debt item MUST have a primary taxonomy.

Canonical categories are:

```text
Architecture
Code / Design
Data / Database
API / Integration
Security
Privacy / Compliance
Dependency / Platform
Testing
Performance / Scalability
Reliability / Resilience
Concurrency / Consistency
Observability / Operations
Build / CI / Deployment
State Management
Accessibility
Design System / Component
Documentation / Knowledge
Migration / Transitional
```

A debt item MAY have secondary categories.

---

## 2.3 Architecture debt

Architecture debt includes structural choices that materially increase the cost or risk of system evolution.

Examples:

```text
high coupling
cyclic dependencies
shared database coupling
unbounded monolith seams
wrong service boundaries
cross-domain ownership
obsolete architectural platform
```

Architecture debt SHOULD be prioritized based on the changes it obstructs, not based solely on theoretical architecture quality.

---

## 2.4 Code/design debt

Code/design debt includes localized structures that increase recurring development friction.

Examples:

```text
duplicated business rules
oversized modules
implicit invariants
poor abstractions
deep conditional complexity
uncontrolled mutation
unmaintainable generated/manual hybrid code
```

A code smell MUST NOT automatically become a registered technical-debt item.

Register it when the consequence is materially worth governing.

---

## 2.5 Data and database debt

Data/database debt includes:

```text
incorrect types
missing constraints
legacy schema assumptions
duplicate sources of truth
unindexed critical queries
obsolete columns
unsafe migrations
uncontrolled denormalization
manual reconciliation
```

Debt that can threaten integrity MUST be scored primarily by business and correctness risk, not cleanup effort.

---

## 2.6 API and integration debt

API/integration debt includes:

```text
obsolete versions
duplicate endpoints
inconsistent errors
unversioned breaking contracts
vendor coupling
synchronous chains
legacy formats
point-to-point integration sprawl
```

Debt removal MUST preserve documented compatibility and deprecation requirements.

---

## 2.7 Security debt

Security debt includes known structural security weaknesses that require engineering remediation.

Examples:

```text
obsolete cryptography
unsupported security dependency
missing authorization boundary
shared privileged identity
known insecure legacy protocol
weak secrets architecture
unpatched vulnerable component
```

Security debt MUST NOT be deprioritized purely through the normal technical-debt score when Security policy assigns a remediation deadline or severity.

Security remediation requirements override ordinary debt planning.

---

## 2.8 Accessibility debt

Accessibility debt includes known systemic non-conformance such as:

```text
inaccessible custom controls
keyboard traps
missing focus architecture
non-semantic navigation
color-only status
unusable form errors
```

Accessibility debt SHOULD be removed at the shared component/pattern layer whenever the defect is systemic.

Repeated local patches SHOULD NOT substitute for fixing the canonical component.

---

## 2.9 Design-system debt

Design-system debt includes:

```text
duplicate components
hard-coded colors
hard-coded spacing
parallel component libraries
custom controls duplicating shadcn/ui
inconsistent semantic states
```

Debt repayment SHOULD migrate consumers toward the canonical Design Token, Component, and Pattern standards rather than introducing a third implementation.

---

## 2.10 Testing debt

Testing debt includes:

```text
critical behavior with no automated coverage
excessive flaky tests
unmaintainably coupled tests
slow suites blocking delivery
missing production-like integration testing
obsolete test harnesses
```

A missing test is most significant when it increases the risk or cost of changing the associated behavior.

---

## 2.11 Transitional debt

Temporary migration scaffolding MUST be explicitly classified as transitional debt.

Examples:

```text
dual write
compatibility adapter
temporary feature flag
old/new schema support
migration facade
legacy protocol bridge
```

Every transitional debt item MUST have a removal condition.

"Temporary" code without a retirement condition becomes permanent accidental architecture.

---

## 2.12 Deliberate debt record

A deliberate debt decision MUST record:

```text
decision
short-term benefit
known downside
owner
expected lifetime
repayment/review trigger
```

Example:

```text
Decision:
Use the existing synchronous export pipeline for launch.

Benefit:
Avoids delaying contractual release by 3 weeks.

Debt:
Exports above ~100k rows have high memory pressure.

Guardrail:
Limit export to 100k rows.

Repayment trigger:
Before enterprise bulk export launch or 2027-Q1,
whichever occurs first.
```

---

## 2.13 Inadvertent debt

Inadvertent debt SHOULD be recorded when discovered if its future consequence is material.

The team MUST NOT hide debt merely because nobody deliberately chose it.

---

## 2.14 Reckless debt

Debt is reckless when significant foreseeable future cost or risk is accepted without proportionate rationale or safeguards.

Examples include:

```text
bypassing authorization to meet a deadline
shipping destructive migration with no recovery
introducing known severe coupling without need
ignoring mandatory accessibility requirements
```

Reckless debt SHOULD NOT be normalized as ordinary backlog debt.

Where applicable, it MUST be treated as a defect, security issue, compliance issue, or release blocker.

---

## 2.15 Technical-debt register

Material technical debt MUST be tracked in a governed debt register.

The register MAY be implemented in:

```text
issue tracker
engineering governance system
architecture repository
```

but MUST be queryable and owned.

SEI recommends maintaining an inventory of technical-debt items and recording their consequences so teams can reason about lifecycle cost and management choices. citeturn158698search3

---

## 2.16 Canonical debt record

A debt record SHOULD include:

```text
debt_id
title
summary
taxonomy
affected assets
owner
introduced/discovered date
origin
status

principal_score
interest_score
risk_score
exposure_score
strategic_blocker_score

evidence
consequences
guardrails
repayment trigger
target state
dependencies
review date
```

Optional metadata MAY include:

```text
estimated engineering effort
incidents
change-frequency metric
affected teams
security severity
deadline
architecture decision
```

---

## 2.17 Debt IDs

Material debt SHOULD have a stable identifier.

Example:

```text
TD-0142
```

The identifier SHOULD be used in:

```text
ADRs
PRs
roadmaps
migration plans
incident reviews
```

when relevant.

---

## 2.18 Debt owner

Every registered debt item MUST have one accountable owner.

The owner SHOULD normally be:

```text
team
service owner
platform owner
architecture owner
```

rather than one individual engineer.

A debt item without ownership is unmanaged debt.

---

## 2.19 Owner responsibility

The debt owner MUST:

```text
keep the record accurate
review its score
monitor triggers
propose repayment or acceptance
coordinate dependencies
close it when resolved
```

Ownership does not imply that the owner personally performs all remediation work.

---

## 2.20 Debt status

Canonical statuses SHOULD be:

```text
identified
accepted
planned
in_progress
contained
repaid
retired_with_system
superseded
```

`accepted` MUST include a rationale and review condition.

`contained` means interest/risk has been materially reduced without fully removing principal.

---

## 2.21 Principal

Principal represents the approximate cost of materially eliminating the debt and reaching the intended target state.

Principal SHOULD include more than coding effort.

It MAY include:

```text
implementation
migration
testing
data conversion
deployment
documentation
consumer migration
rollback preparation
```

Principal MUST NOT include future interest.

---

## 2.22 Principal score

The canonical principal scale is:

| Score | Meaning |
|---|---|
| 1 | Hours to <2 engineer-days |
| 2 | Several engineer-days |
| 3 | Roughly 1–3 engineer-weeks |
| 4 | Multi-week / multi-engineer initiative |
| 5 | Multi-team / multi-quarter program |

These are planning bands, not contractual estimates.

Teams MAY tune the bands to organizational scale.

---

## 2.23 Interest

Interest represents recurring incremental cost caused by leaving the debt in place.

Interest MAY manifest as:

```text
extra implementation effort
additional review burden
incident handling
manual operations
slow test feedback
developer onboarding friction
rework
release delay
vendor cost
```

SEI explicitly uses the debt metaphor to describe future effort spent working around difficult structures as interest paid on existing debt. citeturn158698search7

---

## 2.24 Interest MUST be evidenced

Where practical, interest SHOULD be supported by evidence.

Examples:

```text
"This module adds ~2 days to every billing change."

"Seven incidents in the past 12 months involved this
legacy reconciliation path."

"Average test pipeline duration is 47 minutes because
this suite cannot run in parallel."

"Three teams maintain duplicate versions of this client."
```

Avoid unsupported statements such as:

```text
This probably slows us down a lot.
```

---

## 2.25 Interest score

Canonical interest score:

| Score | Meaning |
|---|---|
| 1 | Rare/minor recurring friction |
| 2 | Noticeable but infrequent recurring cost |
| 3 | Regular cost in affected work |
| 4 | Significant recurring delivery/operations burden |
| 5 | Dominant recurring constraint or rapidly compounding cost |

---

## 2.26 Risk score

Risk measures potential harm created or amplified by the debt.

It SHOULD consider:

```text
security
correctness
availability
data loss
compliance
operational failure
recovery difficulty
```

Canonical risk score:

| Score | Meaning |
|---|---|
| 1 | Negligible consequence |
| 2 | Local recoverable impact |
| 3 | Material service/team impact |
| 4 | Major customer/business exposure |
| 5 | Critical security, integrity, regulatory, or continuity exposure |

A mandatory Security/Compliance severity MUST override this generic scale where applicable.

---

## 2.27 Exposure score

Exposure represents how often the indebted area is exercised or changed.

Canonical exposure:

| Score | Meaning |
|---|---|
| 1 | Dormant / rarely touched |
| 2 | Occasional |
| 3 | Regular |
| 4 | Frequent / several teams |
| 5 | Core delivery path / pervasive dependency |

High exposure increases the rate at which interest is paid.

---

## 2.28 Strategic blocker score

Strategic blocker measures whether the debt prevents a known future objective.

Canonical score:

```text
0 = no known strategic blockage
1 = minor friction
2 = notable constraint
3 = blocks planned team initiative
4 = blocks major roadmap/platform objective
5 = blocks mandatory/critical strategic requirement
```

---

## 2.29 Debt Pressure Score

The canonical **Debt Pressure Score** is:

```text
Interest
+ Risk
+ Exposure
+ Strategic Blocker
```

Range:

```text
3–20
```

Principal is deliberately NOT added to Debt Pressure.

Principal is the repayment cost.

Pressure is the cost/risk of continuing to carry the debt.

This distinction prevents expensive debt from appearing more urgent merely because it is expensive to fix.

---

## 2.30 Debt priority bands

Default bands are:

```text
Critical:
    mandated security/compliance/correctness issue
    or explicit release/continuity blocker

High:
    Pressure 16–20

Medium:
    Pressure 11–15

Low:
    Pressure 3–10
```

These bands are decision aids.

They MUST NOT override:

```text
regulatory deadline
security severity
contractual commitment
known critical incident risk
```

---

## 2.31 Principal-to-pressure planning

Planning SHOULD consider Pressure and Principal separately.

Example:

```text
Debt A:
Pressure = 17
Principal = 2

Debt B:
Pressure = 17
Principal = 5
```

Debt A may be an immediate high-value repayment.

Debt B may require a staged modernization program.

Both remain high-pressure debt.

---

## 2.32 Do not create false precision

Debt scores MUST include a short qualitative rationale.

This is prohibited:

```text
TD-45 score = 14
```

with no explanation.

Preferred:

```text
Interest 4:
Every release involving customer identity requires
manual synchronization across two stores.

Risk 4:
Known possibility of divergent access state.

Exposure 3:
Identity changes occur in most quarterly initiatives.

Strategic 3:
Blocks unified permissions project.
```

---

## 2.33 Review cadence

High-pressure debt SHOULD be reviewed at least quarterly or during relevant roadmap planning.

Accepted deliberate debt MUST be reviewed at its recorded trigger/deadline.

Low-pressure debt MAY be reviewed less frequently.

Debt MUST be re-scored after:

```text
incident
major roadmap change
platform deprecation
security finding
usage growth
team ownership change
```

where relevant.

---

## 2.34 Debt repayment trigger

Every accepted material debt item SHOULD have at least one explicit trigger.

Examples:

```text
next time module is materially modified
before traffic exceeds X
before vendor support ends
before regional rollout
before next security certification
before 2027-Q2
after third related incident
```

"Someday" is not a repayment trigger.

---

## 2.35 Debt containment

Debt does not always need immediate full repayment.

Containment MAY reduce interest while leaving some principal.

Examples:

```text
introduce facade
add missing characterization tests
freeze legacy API
centralize access
add database constraint
limit new consumers
```

Containment SHOULD prevent the debt from spreading.

---

## 2.36 Freeze propagation

High-interest legacy debt SHOULD often receive a:

```text
no new consumers
```

or:

```text
no new feature development on legacy path
```

policy where practical.

New development SHOULD use the intended target architecture.

---

## 2.37 Refactoring decision

Refactoring SHOULD be preferred when:

- core behavior remains valid;
- existing implementation can evolve safely;
- boundaries can be improved incrementally;
- data model remains usable or migratable;
- the system can stay deployable during change.

Refactoring is especially appropriate when the principal can be recovered through lower future interest.

Fowler's refactoring guidance emphasizes the economic justification: restructure when the investment is expected to make later work faster or cheaper, rather than refactoring purely for aesthetics. citeturn200988search1

---

## 2.38 Rewrite decision

A full rewrite MUST have an explicit decision record.

The record MUST compare at least:

```text
continue/contain
refactor
incremental replacement
full rewrite
```

The rewrite proposal MUST identify why lower-risk options are insufficient.

---

## 2.39 Valid rewrite drivers

A rewrite MAY be justified where one or more foundational constraints cannot reasonably be removed incrementally.

Examples include:

```text
unsupported runtime with no viable migration path
fundamentally incompatible architecture requirement
irrecoverably unsuitable data model
platform cannot meet mandatory security requirement
system behavior is being intentionally replaced at domain level
replacement technology removes proven existential constraint
```

"Old code" is insufficient justification.

"New technology is cleaner" is insufficient justification.

---

## 2.40 Rewrite business case

A rewrite proposal MUST document:

```text
target outcomes
scope
principal/cost
current debt interest
migration strategy
behavior-discovery strategy
data migration
consumer migration
cutover
rollback/fallback
expected retirement date
```

A rewrite MUST have measurable success criteria beyond:

```text
rewrite completed
```

---

## 2.41 Rewrite MUST NOT assume documented behavior is complete

Before replacement, the team SHOULD inventory behavior from:

```text
tests
production usage
support cases
logs
data
existing code
integration partners
users/operators
```

Legacy behavior is often incompletely documented.

The rewrite team MUST decide explicitly which existing behaviors to:

```text
preserve
change
remove
```

---

## 2.42 Big-bang rewrite

A big-bang replacement SHOULD be treated as a high-risk exception.

It requires strong justification when the existing system can instead be replaced incrementally.

Large cutover rewrites can accumulate long feedback gaps and require replacement systems to rediscover years of implicit behavior; the Strangler Fig approach was explicitly developed as a gradual alternative. citeturn158698search0turn200988search7

---

## 2.43 Strangler Fig pattern

The Strangler Fig pattern SHOULD be considered when replacing a large legacy system while continuing normal delivery.

Canonical approach:

```text
1. Define desired outcomes.
2. Identify a safe seam.
3. Route selected behavior through that seam.
4. Implement target behavior outside legacy core.
5. Shift traffic/capability incrementally.
6. Verify equivalent/intended behavior.
7. Retire displaced legacy capability.
8. Repeat.
```

The legacy system MUST shrink as migration succeeds.

A "Strangler Fig" program that only adds new services while leaving all legacy responsibilities intact is not completing the pattern.

Fowler describes Strangler Fig modernization as gradually moving behavior from a legacy codebase into newer implementations rather than performing wholesale replacement. citeturn200988search7

---

## 2.44 Strangler seam

The migration seam MAY be:

```text
API gateway
facade
router
event stream
database-access boundary
domain interface
UI route
```

The seam MUST have sufficiently controlled behavior to route work safely between old and new implementations.

---

## 2.45 Strangler observability

During incremental replacement, old and new paths SHOULD be independently observable.

Metrics SHOULD distinguish:

```text
legacy requests
new implementation requests
errors
latency
behavior mismatch
fallback
```

Migration progress MUST be measurable.

---

## 2.46 Strangler rollback

Traffic/capability moved to the new implementation SHOULD have a practical rollback path until confidence is sufficient.

Rollback MUST account for data compatibility.

Routing traffic back is not safe if the legacy side can no longer interpret current state.

---

## 2.47 Branch by Abstraction

Branch by Abstraction SHOULD be considered when a core implementation must be replaced while callers remain stable.

Canonical sequence:

```text
existing callers
      ↓
introduce abstraction
      ↓
move callers behind abstraction
      ↓
implement replacement
      ↓
run/test old and new
      ↓
switch consumers incrementally
      ↓
remove legacy implementation
      ↓
remove temporary abstraction if no longer valuable
```

The technique allows old and new implementations to coexist while keeping the system releasable. citeturn200988search0

---

## 2.48 Migration abstraction is transitional debt

An abstraction introduced only to support migration MUST be registered or otherwise tracked for removal.

Migration scaffolding MUST NOT become permanent architecture accidentally.

---

## 2.49 Parallel change

Public contracts SHOULD use parallel/evolutionary change when consumers cannot migrate atomically.

Canonical stages:

```text
expand
→ migrate
→ contract
```

Examples:

```text
add new API field
migrate consumers
remove old field later
```

or:

```text
support old and new schema
migrate data/code
remove old schema
```

Parallel change can support gradual migration while old and new representations coexist. citeturn200988search3

---

## 2.50 Refactoring safety net

Material refactoring MUST have sufficient behavioral protection.

Protection MAY include:

```text
unit tests
integration tests
contract tests
characterization tests
E2E tests
static types
database constraints
runtime assertions
production comparison
```

The exact combination depends on risk.

---

## 2.51 Characterization tests

When existing behavior is poorly understood, teams SHOULD first add characterization tests around behavior that must remain stable.

A characterization test documents:

```text
what the system currently does
```

without necessarily asserting that the behavior is ideal.

The team MAY later change the test deliberately when behavior is intentionally changed.

---

## 2.52 Refactoring and behavior change

A refactoring PR SHOULD avoid intentional user-visible behavior changes.

If behavior and structure must change together, the PR MUST clearly separate:

```text
behavior-preserving restructuring
```

from:

```text
intentional behavior change
```

through commits, tests, or review structure.

---

## 2.53 Small steps

Refactoring SHOULD proceed through small verified steps.

After each meaningful step:

```text
build
tests
static checks
```

SHOULD remain healthy.

Long periods in which the repository cannot build or deploy SHOULD be avoided.

---

## 2.54 Continuous releasability

Long-running architectural refactoring SHOULD preserve a deployable mainline wherever practical.

Branch by Abstraction is specifically intended to support incremental replacement while the system continues to build and run. citeturn200988search0

---

## 2.55 Feature flags

Feature flags MAY support refactoring or replacement rollout.

Flags SHOULD enable:

```text
canary
dual run
fallback
incremental consumer migration
```

Temporary migration flags MUST have:

```text
owner
removal condition
expiry/review date
```

---

## 2.56 Dual run

High-risk replacements MAY run old and new implementations in parallel for comparison.

One implementation MUST be explicitly authoritative for side effects.

Shadow execution MUST NOT accidentally perform duplicate external mutations.

Comparison SHOULD measure:

```text
output equivalence
error differences
performance
coverage
```

---

## 2.57 Data migration

Refactoring that changes persistent representation MUST align with the Data & Database and Concurrency standards.

Migration SHOULD preserve:

```text
integrity
backward compatibility
rollback/fallback
old/new application coexistence
```

where required.

---

## 2.58 Refactoring API boundaries

Public or multi-team API refactoring MUST follow versioning/deprecation contracts.

Internal code cleanliness MUST NOT justify breaking consumers without migration.

---

## 2.59 Security during refactoring

Refactoring MUST NOT temporarily weaken:

```text
authorization
authentication
tenant isolation
secret handling
audit logging
validation
```

A temporary migration path is still production code.

---

## 2.60 Accessibility during refactoring

UI refactoring MUST preserve or improve accessibility.

Migrating from legacy custom components toward canonical shadcn/ui components SHOULD remove accessibility debt rather than merely reproduce inaccessible behavior.

---

## 2.61 State-management refactoring

State refactoring MUST explicitly identify:

```text
old source of truth
new source of truth
migration boundary
cache ownership
intermediate compatibility
```

During migration, duplicated state MUST have a temporary synchronization model and retirement condition.

---

## 2.62 Test refactoring

Refactoring test architecture MUST preserve confidence.

Teams MUST NOT delete effective behavioral coverage merely because the existing tests are inconvenient.

Replace poor tests before or while removing them.

---

## 2.63 Boy-scout principle

Engineers SHOULD improve nearby code when the improvement is directly related to safe work in the area and remains clearly reviewable.

Boy-scout cleanup MAY include:

```text
rename misleading local variable
remove dead local code
simplify small conditional
replace obvious duplication
add missing local test
use existing design token
```

---

## 2.64 Boy-scout limits

Boy-scout cleanup MUST NOT become an unplanned refactoring project.

As a Gold Standard default, incidental cleanup SHOULD normally remain:

```text
within files/modules already being changed
and
≤ 25% of the human-authored PR diff
```

If it exceeds this boundary or materially broadens risk, it SHOULD become a separate change.

Repositories MAY tighten this threshold.

---

## 2.65 Boy-scout semantic limit

Incidental cleanup MUST NOT introduce:

```text
public API change
database migration
new architecture boundary
new dependency
material behavior change
cross-team migration
```

without being explicitly scoped and reviewed as such.

---

## 2.66 Boy-scout reviewability

A reviewer SHOULD be able to separate:

```text
required feature/fix
```

from:

```text
incidental cleanup
```

without substantial archaeology.

If not, split the change.

---

## 2.67 Opportunistic debt repayment

Debt MAY be repaid during related product work when:

```text
the touched area is already in scope
repayment reduces implementation risk
incremental cost is justified
review remains coherent
```

The team SHOULD not defer every cleanup into a distant "technical debt sprint."

---

## 2.68 Dedicated debt work

Dedicated debt initiatives SHOULD be used when repayment:

```text
crosses multiple features
requires migration
has no natural product touchpoint
has significant principal
addresses systemic risk
```

The initiative MUST have measurable outcomes.

---

## 2.69 Debt budget

Teams MAY allocate recurring engineering capacity to debt repayment.

A fixed percentage MUST NOT replace prioritization.

Example:

```text
20% of every sprint for tech debt
```

can be useful operationally, but it MUST NOT mean that:

```text
critical debt waits until the quota
```

or:

```text
low-value cleanup is done merely to consume the quota
```

---

## 2.70 Debt interest budget

Teams SHOULD monitor how much delivery/operational capacity is being consumed by debt interest.

Useful measures MAY include:

```text
extra lead time
manual work hours
repeat incidents
test delay
change failure rate
duplicate implementation
support burden
```

---

## 2.71 Incident-generated debt

Post-incident reviews SHOULD identify whether underlying technical debt contributed to:

```text
incident likelihood
blast radius
detection delay
recovery delay
```

Material findings SHOULD be added or linked to the debt register.

---

## 2.72 Dependency lifecycle debt

Libraries, frameworks, runtimes, databases, and operating systems approaching end-of-support MUST be treated as lifecycle debt.

The owner SHOULD track:

```text
current version
supported version
vendor EOL
migration principal
security exposure
```

End-of-support deadlines SHOULD create repayment triggers.

---

## 2.73 Do not upgrade for fashion

A technology upgrade MUST have an engineering/business rationale.

Examples:

```text
security support
vendor support
required capability
material performance
maintenance reduction
ecosystem compatibility
```

"Newer exists" is insufficient by itself.

---

## 2.74 Obsolete abstraction removal

When migration completes, obsolete:

```text
facades
adapters
feature flags
compatibility branches
old schemas
dual-write paths
```

MUST be removed unless they still have independent architectural value.

Leaving migration scaffolding indefinitely creates new technical debt.

---

## 2.75 Definition of repaid

A debt item MUST NOT be closed merely because a refactor PR merged.

Repayment SHOULD verify:

```text
target state reached
legacy path no longer used
expected interest reduced
temporary migration code removed
monitoring healthy
documentation updated
```

---

## 2.76 Partial repayment

If remediation reduces but does not eliminate debt, the record SHOULD be re-scored rather than falsely closed.

Example:

```text
Before:
Interest 5
Risk 4

After containment:
Interest 2
Risk 2

Remaining principal:
migration of final two consumers
```

---

## 2.77 Written-off / retired debt

Debt MAY be effectively retired without repayment if the indebted system is decommissioned.

The record SHOULD close as:

```text
retired_with_system
```

rather than pretending the technical issue itself was fixed.

---

## 2.78 Debt metrics

The organization SHOULD NOT use total debt count as its only metric.

A growing count MAY simply mean visibility improved.

Useful portfolio measures include:

```text
high-pressure debt count
oldest high-pressure debt
interest trend
principal trend
debt introduced vs repaid
strategic blockers
security/EOL deadlines
```

---

## 2.79 Debt aging

Age alone MUST NOT determine priority.

A ten-year-old stable low-interest module MAY be less urgent than a three-month-old architectural decision that blocks every new feature.

Age is contextual evidence.

---

## 2.80 Debt trend

Teams SHOULD monitor whether:

```text
high-pressure debt is increasing
interest is increasing
repayment is keeping pace
temporary debt is expiring
```

Portfolio trend matters more than an arbitrary goal of zero items.

---

## 2.81 Debt introduction tracking

Teams SHOULD record the cause of material new debt where known.

Canonical causes MAY include:

```text
delivery trade-off
legacy inheritance
platform constraint
incident workaround
missing knowledge
scale growth
dependency aging
requirements change
```

Cause analysis helps prevent repeated debt patterns.

---

## 2.82 Debt prevention

Recurring debt of the same type SHOULD trigger a systems response.

Examples:

```text
repeated accessibility debt
→ improve canonical component

repeated schema migration failures
→ strengthen migration standard/tooling

repeated duplicate clients
→ create shared SDK

repeated auth mistakes
→ centralize authorization primitive
```

Governance SHOULD remove the cause, not merely track symptoms.

---

## 2.83 Stakeholder reporting

Technical debt MUST be reported to non-technical stakeholders in terms of business consequence.

Preferred language:

```text
This architecture adds approximately 2–3 days
to every enterprise onboarding change.

The unsupported runtime reaches vendor end-of-support
in March; after that we lose security updates.

This manual reconciliation process caused four incidents
this year and requires ~20 hours/month of operations work.
```

Avoid:

```text
The code is ugly.
We need cleanup.
Developers hate this framework.
```

---

## 2.84 Stakeholder report structure

A material debt report SHOULD answer:

```text
What is the constraint?
What business capability does it affect?
What interest are we currently paying?
What risk exists?
What happens if we do nothing?
What would repayment cost?
When should we act?
```

---

## 2.85 Debt SHOULD be expressed as options

Stakeholder reporting SHOULD present meaningful choices.

Example:

```text
Option A — Carry debt
Cost:
~2 engineer-days extra per billing feature.

Risk:
Current vendor support ends in 9 months.

Option B — Contain
Cost:
2 engineer-weeks.

Benefit:
Reduces new legacy usage but does not remove migration.

Option C — Repay
Cost:
8–10 engineer-weeks.

Benefit:
Removes vendor dependency and recurring workaround cost.
```

Decision-makers can then trade capital/principal against future interest.

---

## 2.86 Avoid fear-based reporting

Technical teams MUST NOT exaggerate debt to obtain priority.

Avoid unsupported claims such as:

```text
Everything will collapse.
The system is unmaintainable.
We must rewrite immediately.
```

Debt reporting SHOULD use observable evidence and scenarios.

---

## 2.87 Avoid hiding debt in engineering terminology

Reports SHOULD translate terms such as:

```text
circular dependency
N+1
deprecated framework
missing integration tests
```

into relevant operational or delivery effects.

Technical detail MAY remain available as supporting information.

---

## 2.88 Report uncertainty

Principal and interest estimates MUST communicate material uncertainty.

Preferred:

```text
Expected principal:
6–10 engineer-weeks.

Largest uncertainty:
migration behavior for two undocumented partner integrations.
```

False precision MUST NOT be presented to stakeholders.

---

## 2.89 Technical debt is not a defect synonym

A defect that currently violates required behavior SHOULD normally be tracked as a defect.

A security vulnerability SHOULD follow vulnerability management.

An active incident SHOULD follow incident management.

A legal/compliance violation SHOULD follow its governing remediation process.

These MAY also reveal technical debt, but MUST NOT be downgraded into a lower-urgency "debt" category.

---

## 2.90 Technical debt is not product backlog

Unbuilt features are not technical debt merely because engineers want them.

Example:

```text
Add dark mode
```

is product work unless an existing architectural/design commitment creates a debt consequence.

---

## 2.91 Technical debt is not aesthetic dissatisfaction

A different naming preference, framework preference, or architecture style MUST NOT be registered as debt without a concrete consequence.

Debt requires an adverse future cost, risk, or constraint.

---

## 2.92 Architecture Decision Records

Material deliberate debt or modernization strategy SHOULD link to an ADR where the decision is architecturally significant.

The ADR SHOULD document:

```text
context
decision
trade-off
debt created
repayment trigger
```

---

## 2.93 Roadmap integration

High-pressure debt SHOULD be visible in product/platform planning where it competes for capacity.

Technical debt MUST NOT live exclusively in an engineering-only list if it materially affects roadmap delivery.

---

## 2.94 Capacity planning

Debt principal SHOULD be estimated alongside feature work when debt is a prerequisite or major interest source.

Example:

```text
Feature:
New multi-region deployment

Prerequisite debt:
Remove single-region session storage assumption
```

The debt should be visible as part of the actual delivery cost.

---

## 2.95 Dependency graph

Large modernization programs SHOULD identify debt dependencies.

Example:

```text
TD-10 API facade
    ↓
TD-14 client migration
    ↓
TD-19 legacy API removal
```

Repayment order SHOULD follow technical dependency, not ticket age.

---

## 2.96 Modernization progress

Large debt programs SHOULD report completion by **capability retired or migrated**, not only lines of code written.

Useful measures include:

```text
% traffic on new path
% consumers migrated
legacy endpoints removed
legacy tables retired
manual operations eliminated
```

---

## 2.97 Dual-system duration

Old/new dual-running periods SHOULD be intentionally bounded.

Long dual-operation increases:

```text
operational complexity
consistency risk
support burden
mental load
```

The migration plan SHOULD specify exit criteria.

---

## 2.98 Target architecture

Large repayment initiatives MUST define enough target architecture to guide incremental work.

The target MUST NOT require every implementation detail to be decided upfront.

The target SHOULD define:

```text
ownership boundaries
core interfaces
source of truth
migration seams
required invariants
```

---

## 2.99 Refactoring tests MUST protect behavior, not implementation

Tests used as a refactoring safety net SHOULD assert observable contracts rather than encode irrelevant internal structure.

Overly implementation-coupled tests can make safe refactoring unnecessarily expensive.

---

## 2.100 Test debt before rewrite

A rewrite or major refactor MUST assess whether insufficient testability is itself part of the principal.

Where existing coverage is inadequate, the plan SHOULD include:

```text
characterization tests
contract tests
production comparison
traffic replay
```

before high-risk replacement.

---

## 2.101 Security review of modernization

Architecture modernization MUST receive Security review when boundaries involving:

```text
identity
authorization
tenant data
encryption
secrets
network trust
audit evidence
```

change.

Modernization MUST NOT inadvertently widen trust boundaries.

---

## 2.102 Data review of modernization

Data migration MUST explicitly define:

```text
source of truth
dual-write policy
reconciliation
cutover
integrity validation
rollback
retirement
```

A rewrite is not complete while authoritative ownership remains ambiguous.

---

## 2.103 Accessibility review of UI modernization

Replacing a UI framework MUST NOT blindly reproduce legacy accessibility debt.

The new implementation MUST meet current Accessibility, Component, and Pattern standards.

---

## 2.104 Component modernization

UI debt repayment SHOULD prefer:

```text
canonical shadcn/ui primitive
+ corpus wrapper/pattern
```

over another new bespoke primitive.

Current shadcn/ui provides primitives including Alert, Alert Dialog, Badge, Data Table, Dialog, Progress, Sheet, Table, Tabs, and related components appropriate for governance/admin interfaces. citeturn567530search1

---

## 2.105 Debt-register UX

An internal debt-management interface SHOULD provide:

```text
inventory
filtering
ownership
score
pressure
principal
status
review date
strategic blocker
```

The default view SHOULD emphasize actionable debt rather than decorative charts.

---

## 2.106 shadcn/ui baseline

Canonical mapping for a technical-debt governance interface:

| Need | shadcn/ui baseline |
|---|---|
| Debt inventory | `Data Table`, `Table` |
| Category/status | `Badge` |
| Filters | `Input`, `Select`, `Combobox` |
| Debt detail | `Sheet` |
| Architecture/decision detail | `Dialog`, `Tabs` |
| High-risk warning | `Alert` |
| Accept/write-off decision | `AlertDialog` where consequential |
| Repayment progress | `Progress` |
| Long evidence/history | `ScrollArea` |
| No debt matching filters | `Empty` |
| Loading | `Skeleton`, `Spinner` |

shadcn/ui's current catalogue includes these primitives; Data Table is composed from the base Table with sorting, filtering, pagination, and related behavior rather than prescribing one universal table implementation. citeturn567530search0turn567530search1

---

## 2.107 Debt score UX

The UI MUST NOT display a composite debt score as though it were objective scientific precision.

It SHOULD expose component scores:

```text
Principal
Interest
Risk
Exposure
Strategic blocker
```

and their rationale.

---

## 2.108 Status accessibility

Debt priority/status MUST NOT rely solely on color.

Preferred:

```text
High pressure
Pressure 17
```

not merely:

```text
red badge
```

---

## 2.109 Review reminders

Accepted debt with:

```text
review date
repayment trigger
vendor EOL
```

SHOULD generate governance reminders.

A debt register that is never revisited is merely documentation of neglect.

---

## 2.110 Auditability

Material decisions to:

```text
accept
defer
rewrite
write off
```

high-risk debt SHOULD retain:

```text
decision maker
date
rationale
risk
review trigger
```

according to Governance and Audit Logging standards.

---

# 3. Anti-patterns

## 3.1 Everything undesirable is debt

**Anti-pattern:** Bugs, features, aesthetic preferences, incidents, and technical debt are all placed in one "tech debt" bucket.

**Rule:** Technical debt MUST describe future technical cost/risk created by existing technical structure.

---

## 3.2 "Messy code" debt item

**Anti-pattern:**

```text
Clean up customer module.
```

**Rule:** Register a concrete consequence and affected assets.

---

## 3.3 Debt with no owner

**Anti-pattern:** A ticket has existed for four years with no accountable team.

**Rule:** Material debt MUST have ownership.

---

## 3.4 Debt with no consequence

**Anti-pattern:**

```text
Rewrite in Rust.
```

with no identified problem.

**Rule:** Debt requires measurable or defensible consequence.

---

## 3.5 Principal equals priority

**Anti-pattern:** The biggest rewrite automatically becomes the highest-priority debt item.

**Rule:** Repayment cost and carrying pressure MUST be considered separately.

---

## 3.6 Interest ignored

**Anti-pattern:** Planning considers only estimated refactoring effort.

**Rule:** Ongoing delivery, operational, and risk cost MUST be considered.

---

## 3.7 One opaque debt score

**Anti-pattern:**

```text
Debt score: 73.4
```

**Rule:** Scores MUST expose their dimensions and rationale.

---

## 3.8 Oldest debt first

**Anti-pattern:** Debt is prioritized solely by ticket age.

**Rule:** Pressure and strategic impact determine priority.

---

## 3.9 Newest technology wins

**Anti-pattern:** Existing system is declared debt because a newer framework exists.

**Rule:** Technology change requires an identified consequence or requirement.

---

## 3.10 Rewrite because refactoring feels hard

**Anti-pattern:** Large replacement is proposed without evaluating containment or incremental migration.

**Rule:** Rewrite decisions MUST compare alternatives.

---

## 3.11 Rewrite with no behavior inventory

**Anti-pattern:** New system is built from requirements documents alone.

**Rule:** Existing production behavior and integrations MUST be investigated.

---

## 3.12 Big-bang modernization by default

**Anti-pattern:** New system remains isolated for a year then replaces everything in one cutover.

**Rule:** Incremental replacement SHOULD be preferred where feasible.

---

## 3.13 "Strangler" that never removes legacy code

**Anti-pattern:** New services are added indefinitely while the monolith keeps every original responsibility.

**Rule:** Successful incremental replacement MUST retire displaced legacy capability.

---

## 3.14 Permanent migration adapter

**Anti-pattern:** Temporary facade remains forever with no owner.

**Rule:** Transitional architecture requires retirement conditions.

---

## 3.15 Feature flag graveyard

**Anti-pattern:** Migration flags remain indefinitely after rollout.

**Rule:** Temporary flags MUST be tracked and removed.

---

## 3.16 Refactor with no safety net

**Anti-pattern:** Large structural change occurs in poorly understood behavior with no characterization or regression protection.

**Rule:** Material refactoring requires sufficient behavioral confidence.

---

## 3.17 Rewrite as test strategy

**Anti-pattern:** Team expects the replacement implementation to reveal what the legacy behavior should have been.

**Rule:** Required behavior MUST be identified and tested independently.

---

## 3.18 Behavior changes hidden as refactor

**Anti-pattern:** User behavior changes inside a PR described as "cleanup only."

**Rule:** Behavioral change MUST be explicit.

---

## 3.19 Refactoring aesthetics

**Anti-pattern:** Working stable code is repeatedly rewritten to match personal taste.

**Rule:** Refactoring SHOULD have a credible economic, risk, or maintainability benefit.

---

## 3.20 Boy-scout scope explosion

**Anti-pattern:** Small bug fix becomes a repository-wide architecture cleanup.

**Rule:** Incidental cleanup MUST remain bounded and reviewable.

---

## 3.21 Boy-scout public API change

**Anti-pattern:** "While here" cleanup silently changes contracts.

**Rule:** Contract changes require explicit scope and review.

---

## 3.22 Debt sprint as dumping ground

**Anti-pattern:** Arbitrary cleanup fills a fixed capacity allocation without prioritization.

**Rule:** Debt work MUST be selected by impact and strategy.

---

## 3.23 No product work until debt is zero

**Anti-pattern:** Team attempts to completely purify the codebase before delivering value.

**Rule:** Technical debt is managed economically, not eliminated ideologically.

---

## 3.24 No debt work because product comes first

**Anti-pattern:** Interest compounds indefinitely because all capacity is reserved for visible features.

**Rule:** Debt that materially impairs delivery/risk MUST enter planning.

---

## 3.25 Security issue downgraded to debt

**Anti-pattern:** Critical vulnerability is put into a normal long-term refactoring backlog.

**Rule:** Mandatory Security remediation timelines override debt governance.

---

## 3.26 Compliance violation called debt

**Anti-pattern:** Active required-control failure receives an ordinary low debt score.

**Rule:** Compliance obligations use their governing remediation requirements.

---

## 3.27 Accessibility deferred indefinitely

**Anti-pattern:** Known shared accessibility defects are accepted as perpetual cleanup work.

**Rule:** Systemic accessibility debt SHOULD be fixed in the canonical layer.

---

## 3.28 Duplicate design-system implementation

**Anti-pattern:** Debt repayment replaces one bespoke component library with another while canonical shadcn/ui patterns already exist.

**Rule:** Modernization SHOULD converge on canonical Component standards.

---

## 3.29 Closing debt when code merges

**Anti-pattern:** Ticket closes although legacy traffic, flags, and adapters remain.

**Rule:** Verify the target outcome and interest reduction.

---

## 3.30 Partial repayment hidden

**Anti-pattern:** Debt is marked complete after a containment measure.

**Rule:** Re-score remaining debt honestly.

---

## 3.31 Debt count KPI

**Anti-pattern:** Teams are rewarded for reducing ticket count.

**Rule:** Measure pressure, interest, risk, and capability impact.

---

## 3.32 Debt used to shame teams

**Anti-pattern:** Debt inventory becomes an evaluation of individual engineering quality.

**Rule:** Debt management is system governance, not blame allocation.

---

## 3.33 Stakeholder jargon

**Anti-pattern:**

```text
We need six sprints to fix coupling and SOLID violations.
```

**Rule:** Explain delivery, cost, operational, and risk consequences.

---

## 3.34 Fear-based rewrite pitch

**Anti-pattern:**

```text
The legacy system could collapse at any moment.
```

without evidence.

**Rule:** Reporting MUST be evidence-based and state uncertainty.

---

## 3.35 False ROI precision

**Anti-pattern:**

```text
This refactor will return exactly 243% ROI.
```

based on speculative estimates.

**Rule:** Use ranges and explicit assumptions.

---

## 3.36 Architecture debt with no target state

**Anti-pattern:** Team agrees system is wrong but cannot describe what better means.

**Rule:** Large repayment needs a target architecture/outcome.

---

## 3.37 Dual-write forever

**Anti-pattern:** Migration leaves two authoritative stores indefinitely.

**Rule:** Transitional source-of-truth ambiguity MUST have an exit plan.

---

## 3.38 New system with no retirement metric

**Anti-pattern:** Modernization reports only features built in the new stack.

**Rule:** Measure legacy capability actually displaced.

---

## 3.39 Refactoring on long-lived isolated branch

**Anti-pattern:** Structural changes diverge for months before integration.

**Rule:** Incremental integration/releasability SHOULD be preserved where possible.

---

## 3.40 Delete difficult tests

**Anti-pattern:** Tests are removed because they impede a rewrite.

**Rule:** Replace required behavioral confidence before deleting coverage.

---

# 4. Checklist

## 4.1 Identification

- [ ] Debt item describes a concrete technical asset.
- [ ] Consequence is documented.
- [ ] Debt is distinguished from defect/feature/incident.
- [ ] Primary taxonomy is assigned.
- [ ] Secondary taxonomy is assigned where useful.
- [ ] Origin/cause is known where possible.
- [ ] Deliberate versus inadvertent status is understood.

## 4.2 Ownership

- [ ] Accountable team/owner exists.
- [ ] Owner maintains the debt record.
- [ ] Review date or trigger exists.
- [ ] Dependencies/affected teams are known.
- [ ] Accepted debt has explicit rationale.
- [ ] Transitional debt has removal ownership.

## 4.3 Principal

- [ ] Principal includes implementation.
- [ ] Migration effort is considered.
- [ ] Testing effort is considered.
- [ ] Consumer/data migration is considered.
- [ ] Rollback/deployment work is considered.
- [ ] Principal score/range is documented.
- [ ] Estimate uncertainty is stated where material.

## 4.4 Interest

- [ ] Recurring delivery cost is considered.
- [ ] Operational burden is considered.
- [ ] Incident cost is considered.
- [ ] Manual work is considered.
- [ ] Test/feedback delay is considered.
- [ ] Interest evidence exists where practical.
- [ ] Interest score has rationale.

## 4.5 Risk and exposure

- [ ] Security risk is assessed.
- [ ] Correctness/data risk is assessed.
- [ ] Availability risk is assessed.
- [ ] Compliance/privacy risk is assessed.
- [ ] Change/usage exposure is assessed.
- [ ] Strategic blocker impact is assessed.
- [ ] Mandatory security/compliance rules override generic score.

## 4.6 Scoring

- [ ] Principal is separate from Debt Pressure.
- [ ] Interest score exists.
- [ ] Risk score exists.
- [ ] Exposure score exists.
- [ ] Strategic-blocker score exists.
- [ ] Composite pressure includes qualitative rationale.
- [ ] Score is not treated as false scientific precision.
- [ ] Debt is re-scored when circumstances materially change.

## 4.7 Debt register

- [ ] Stable debt ID exists.
- [ ] Summary is understandable.
- [ ] Affected assets are listed.
- [ ] Owner is assigned.
- [ ] Status is current.
- [ ] Evidence/metrics are linked.
- [ ] Repayment trigger exists.
- [ ] Target state is described.
- [ ] Review date is current.

## 4.8 Deliberate debt

- [ ] Short-term benefit is explicit.
- [ ] Known downside is explicit.
- [ ] Guardrail exists.
- [ ] Owner exists.
- [ ] Expected lifetime exists.
- [ ] Repayment/review trigger exists.
- [ ] Decision is linked to ADR where significant.

## 4.9 Refactoring

- [ ] Observable behavior to preserve is understood.
- [ ] Adequate test safety net exists.
- [ ] Characterization tests exist where needed.
- [ ] Refactoring and behavior change are distinguishable.
- [ ] Work is divided into small verified steps.
- [ ] Mainline remains releasable where practical.
- [ ] Public contracts remain compatible.
- [ ] Security controls remain intact.
- [ ] Accessibility does not regress.

## 4.10 Rewrite decision

- [ ] Continue/contain option was evaluated.
- [ ] Refactor option was evaluated.
- [ ] Incremental replacement was evaluated.
- [ ] Rewrite driver is foundational rather than aesthetic.
- [ ] Current behavioral inventory exists.
- [ ] Target outcomes are measurable.
- [ ] Data migration is defined.
- [ ] Consumer migration is defined.
- [ ] Cutover is defined.
- [ ] Rollback/fallback is defined.
- [ ] Retirement is defined.

## 4.11 Strangler Fig modernization

- [ ] Migration seam is identified.
- [ ] Old/new routing is controlled.
- [ ] New implementation is independently observable.
- [ ] Behavior is migrated incrementally.
- [ ] Rollback exists during migration.
- [ ] Data authority is explicit.
- [ ] Legacy capability is actually removed.
- [ ] Migration scaffolding has retirement plan.
- [ ] Completion is measured by displaced legacy capability.

## 4.12 Branch by Abstraction

- [ ] Abstraction seam is justified.
- [ ] Existing callers migrate behind it.
- [ ] Old/new implementations can coexist safely.
- [ ] Comparison/canary capability exists where needed.
- [ ] Cutover can be incremental where possible.
- [ ] Legacy implementation is removable.
- [ ] Temporary abstraction is removed if no longer useful.

## 4.13 Data & Database

- [ ] Source of truth is explicit.
- [ ] Dual-write is temporary and governed.
- [ ] Schema compatibility is maintained during migration.
- [ ] Constraints remain correct.
- [ ] Backfill/reconciliation exists.
- [ ] Rollback/fallback is understood.
- [ ] Old data structures are eventually retired.

## 4.14 API

- [ ] Compatibility is preserved.
- [ ] Parallel change is used where appropriate.
- [ ] Deprecated contract has migration period.
- [ ] Consumers are inventoried.
- [ ] Removal criteria exist.
- [ ] Legacy endpoints are actually removed at completion.

## 4.15 Security

- [ ] Security debt follows mandatory severity timelines.
- [ ] Modernization does not broaden trust boundaries.
- [ ] Authorization remains authoritative.
- [ ] Secrets handling remains compliant.
- [ ] Audit evidence remains intact.
- [ ] Unsupported dependencies/EOL dates are tracked.

## 4.16 State Management

- [ ] Old/new state ownership is explicit.
- [ ] Temporary duplicated state is synchronized intentionally.
- [ ] Migration has one eventual source of truth.
- [ ] Cache ownership is defined.
- [ ] Temporary compatibility state has retirement condition.

## 4.17 Forms & Validation

- [ ] Validation behavior is preserved or intentionally changed.
- [ ] Server rules remain authoritative.
- [ ] Form refactor preserves user values/errors.
- [ ] Shared schema debt is addressed at the correct layer.
- [ ] Accessibility behavior is preserved.

## 4.18 Accessibility

- [ ] UI modernization meets current Accessibility standard.
- [ ] Inaccessible legacy components are not blindly reproduced.
- [ ] Keyboard behavior is tested.
- [ ] Focus behavior is tested.
- [ ] Semantic controls are used.
- [ ] Shared accessibility debt is fixed centrally where possible.

## 4.19 Design System

- [ ] Design Tokens replace hard-coded values where applicable.
- [ ] Canonical components replace duplicate bespoke controls.
- [ ] shadcn/ui primitives are used as the component baseline.
- [ ] Migration does not create another parallel design system.
- [ ] Temporary component adapters have removal criteria.

## 4.20 Boy-scout changes

- [ ] Cleanup is adjacent to current work.
- [ ] Cleanup remains small.
- [ ] Cleanup is behavior preserving.
- [ ] No public contract changes are hidden.
- [ ] No migration is hidden.
- [ ] No new cross-team dependency is created.
- [ ] Incidental cleanup remains easy to review.
- [ ] Larger cleanup is split into separate work.

## 4.21 Measurement

- [ ] High-pressure debt is measured over time.
- [ ] Interest trend is monitored.
- [ ] Strategic blockers are visible.
- [ ] EOL/security deadlines are visible.
- [ ] Incident-linked debt is tracked.
- [ ] Temporary debt expiry is tracked.
- [ ] Total debt count is not used as the sole KPI.

## 4.22 Stakeholder reporting

- [ ] Business consequence is stated.
- [ ] Current recurring cost/interest is stated.
- [ ] Risk is stated.
- [ ] Principal/cost range is stated.
- [ ] Do-nothing consequence is stated.
- [ ] Contain/refactor/replace options are shown where material.
- [ ] Uncertainty is visible.
- [ ] Technical jargon is translated into delivery/operational impact.
- [ ] Claims are evidence-based.

## 4.23 Completion

- [ ] Target state has been reached.
- [ ] Expected interest reduction is verified.
- [ ] Legacy traffic/consumers are removed.
- [ ] Temporary flags/adapters are removed.
- [ ] Old schemas/interfaces are retired where planned.
- [ ] Documentation is updated.
- [ ] Monitoring is healthy.
- [ ] Remaining debt is re-scored instead of hidden.

## 4.24 Governance UI

- [ ] Debt inventory uses Table/Data Table.
- [ ] Status/category uses textual Badge.
- [ ] Filters are accessible.
- [ ] Detail uses Sheet/Dialog appropriately.
- [ ] Risk warnings use Alert.
- [ ] Consequential acceptance/write-off uses explicit confirmation where required.
- [ ] Progress reflects real migration progress.
- [ ] Priority does not rely only on color.
- [ ] Empty/loading/error states follow the States Catalogue.

---

# 5. Canonical summary

The following rules define the Gold Standard 2026 baseline.

1. **Technical debt MUST represent a concrete technical structure that creates future cost, risk, or constraint.**

2. **Technical debt MUST NOT become a generic label for bugs, missing features, incidents, or engineering preferences.**

3. **Material debt MUST be inventoried in a governed debt register.**

4. **Every registered debt item MUST have accountable ownership.**

5. **Debt MUST be classified by type so architecture, security, database, testing, accessibility, platform, and other liabilities are not treated as interchangeable.**

6. **Deliberate debt MUST document the short-term benefit obtained, known consequence, owner, guardrail, and repayment/review trigger.**

7. **Inadvertent debt SHOULD still be registered when its consequence is material.**

8. **Reckless security, compliance, or correctness problems MUST NOT be normalized as ordinary long-term debt where another policy requires immediate remediation.**

9. **Debt principal is the cost to reach the intended target state.**

10. **Debt interest is the recurring delivery, operational, risk, or maintenance cost created by continuing to carry the debt.**

11. **Principal and interest MUST be assessed separately.**

12. **Interest SHOULD be evidenced through delivery delay, manual work, incidents, test cost, operating burden, or comparable observations where practical.**

13. **Risk MUST include security, correctness, availability, privacy, compliance, and recovery impact where relevant.**

14. **Exposure MUST consider how often the affected area is used or changed.**

15. **Strategic exposure MUST capture whether debt blocks planned business, platform, security, or architecture objectives.**

16. **The canonical Debt Pressure Score is Interest + Risk + Exposure + Strategic Blocker. Principal remains a separate repayment-cost measure.**

17. **Scores MUST include qualitative rationale and MUST NOT be presented as false scientific precision.**

18. **Mandatory security, compliance, contractual, and lifecycle deadlines override generic debt scoring.**

19. **Every accepted material debt item SHOULD have an explicit repayment or review trigger.**

20. **Debt MAY be contained without fully repaying principal when containment materially reduces interest or propagation.**

21. **High-interest legacy debt SHOULD often be prevented from gaining new consumers.**

22. **Refactoring SHOULD be preferred when existing behavior remains valid and the system can evolve safely in incremental deployable steps.**

23. **Refactoring SHOULD have an economic, risk, or maintainability justification rather than being pursued purely for aesthetics.** citeturn200988search1

24. **Material refactoring MUST have a sufficient behavioral safety net.**

25. **Characterization tests SHOULD be added before changing poorly understood legacy behavior.**

26. **Refactoring and intentional behavior changes SHOULD be separated enough for reviewers to distinguish them.**

27. **Long-running refactoring SHOULD preserve a releasable mainline wherever practical.**

28. **A full rewrite MUST be an explicit architecture/business decision, not an emotional reaction to difficult code.**

29. **Rewrite proposals MUST compare containment, refactoring, incremental replacement, and full replacement.**

30. **A rewrite MUST document behavior discovery, data migration, consumer migration, cutover, fallback, and measurable target outcomes.**

31. **"The technology is old" is not by itself sufficient rewrite justification.**

32. **Big-bang replacement SHOULD be the exception when safe incremental displacement is practical.**

33. **Strangler Fig modernization SHOULD be considered for large legacy replacement because capabilities can be moved gradually while the existing system remains operational.** citeturn200988search7

34. **A Strangler Fig migration is incomplete until corresponding legacy capability is actually retired.**

35. **Branch by Abstraction SHOULD be considered when implementation replacement can occur behind a stable interface while old and new implementations coexist.** citeturn200988search0

36. **Migration abstractions, compatibility adapters, dual-write paths, and feature flags are transitional debt and MUST have retirement conditions.**

37. **Public contracts SHOULD use parallel/evolutionary change when consumers cannot migrate atomically.**

38. **Data migrations MUST retain an explicit source of truth, compatibility strategy, reconciliation plan, and retirement state.**

39. **Refactoring MUST NOT temporarily weaken authentication, authorization, tenant isolation, validation, auditability, or other Security controls.**

40. **UI modernization MUST preserve or improve accessibility rather than reproduce legacy accessibility debt.**

41. **Design-system debt SHOULD converge on canonical Design Tokens, shared patterns, and shadcn/ui-based components rather than another bespoke component layer.**

42. **Boy-scout cleanup is encouraged only when it is adjacent, behavior-preserving, and small enough not to obscure the primary change.**

43. **As a default, incidental boy-scout cleanup SHOULD stay within already touched modules and roughly 25% of the human-authored PR diff; larger work SHOULD normally be separated.**

44. **Boy-scout cleanup MUST NOT hide API changes, schema migrations, architectural changes, new dependencies, or cross-team migration.**

45. **Debt MAY be repaid opportunistically during relevant feature work when doing so reduces total implementation cost and review remains coherent.**

46. **Dedicated debt programs SHOULD be used for systemic repayment that cannot reasonably fit within adjacent product work.**

47. **A fixed debt-capacity percentage MAY assist planning but MUST NOT replace risk/economic prioritization.**

48. **Repeated debt of the same type SHOULD trigger improvement of the platform, standard, tool, or canonical component that allows the debt to recur.**

49. **Dependency and platform end-of-support dates MUST be treated as explicit lifecycle repayment triggers.**

50. **Modernization success SHOULD be measured by legacy capability, traffic, consumers, manual work, or systems actually retired—not merely new code written.**

51. **Dual-running old/new systems SHOULD have bounded duration and explicit exit criteria.**

52. **A debt item MUST NOT be marked repaid merely because a refactoring PR merged.**

53. **Closure SHOULD verify target state, reduced interest, retired legacy paths, removed migration scaffolding, and healthy operation.**

54. **Partial repayment SHOULD cause the debt to be re-scored rather than falsely closed.**

55. **Debt retired through system decommissioning SHOULD be recorded as retired with the system rather than incorrectly described as technically fixed.**

56. **Portfolio reporting SHOULD emphasize high-pressure debt, interest trends, strategic blockers, lifecycle deadlines, and repayment progress—not raw debt-ticket count.**

57. **Age alone MUST NOT determine debt priority.**

58. **Technical debt reporting to non-technical stakeholders MUST describe delivery impact, operating cost, risk, strategic constraint, principal, and consequence of inaction.**

59. **Stakeholder reporting SHOULD present options—carry, contain, refactor, incrementally replace, or rewrite—rather than demand one unexplained engineering solution.**

60. **Debt reporting MUST avoid fear, blame, jargon, and false precision.**

61. **High-impact debt decisions SHOULD retain an auditable rationale and link to the appropriate ADR, roadmap, risk, or governance record.**

62. **Debt management MUST integrate with roadmap planning when debt materially affects feature cost, security, reliability, or strategic delivery.**

63. **shadcn/ui Data Table, Table, Badge, Alert, AlertDialog, Sheet, Dialog, Tabs, Progress, ScrollArea, Input, Select, Combobox, Skeleton, Spinner, and Empty form the canonical component baseline for technical-debt governance interfaces.** citeturn567530search0turn567530search1

64. **The canonical rule is: make debt concrete, separate repayment cost from carrying cost, prioritize by consequence rather than aesthetics, refactor incrementally when possible, replace systems gradually when practical, and communicate debt as an evidence-based business trade-off rather than an engineering grievance.**

The most important governance property is that **principal does not determine urgency**. A costly modernization can remain low priority when its interest and risk are small, while a relatively cheap defect in a high-change, security-sensitive boundary can deserve immediate repayment. That separation also makes the debt conversation substantially clearer for non-technical stakeholders.
