---
id: "code-review"
title: "Code Review"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "code", "review"]
applies_to: ["team"]
related: []
legacy_number: 85
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 61709
provenance: baseline

---

Below is the canonical corpus version. The numeric review-size and response-time thresholds are explicitly **Gold Standard defaults**, not claims about GitHub or another external standard; repositories MAY tighten them based on risk.

# Code Review Guidelines — Gold Standard 2026

**Canonical placement:** Git & Repository → Code Review → Testing → Governance  
**Status:** Canonical  
**Applies to:** Application code, APIs, database migrations, infrastructure, configuration, tests, design-system code, security controls, AI/LLM integration, build tooling, documentation coupled to behavior, and production repository changes  
**Component baseline:** shadcn/ui  
**Normative terms:** MUST, MUST NOT, SHOULD, SHOULD NOT, MAY

---

# 1. Purpose

## 1.1 Objective

This standard defines the canonical requirements for authoring, reviewing, approving, and merging production changes.

It covers:

1. author responsibilities;
2. pull-request quality;
3. review scope;
4. review size;
5. review timing;
6. correctness;
7. architecture and maintainability;
8. security;
9. data and database safety;
10. API compatibility;
11. concurrency;
12. state management;
13. forms and validation;
14. accessibility;
15. design-system compliance;
16. performance;
17. observability;
18. tests;
19. documentation;
20. generated code;
21. CODEOWNERS;
22. approval requirements;
23. reviewer independence;
24. comment severity;
25. review etiquette;
26. disagreements;
27. stale approvals;
28. fast-path reviews;
29. emergency reviews;
30. evidence and governance.

The primary purpose of code review is to prevent defects and maintain or improve the long-term health of the system.

Code review MUST NOT be reduced to:

```text
CI is green
→ approve
```

Automated checks and human review serve different functions.

OWASP specifically treats manual secure code review as complementary to automated security tooling because human review is needed for business logic, data flow, authorization, and other contextual security defects. citeturn118905search1

## 1.2 Core principle

The canonical review model is:

```text
Author makes change reviewable
        ↓
Automated checks establish baseline
        ↓
Qualified human reviews intent + diff + context
        ↓
Blocking findings resolved
        ↓
Required owners approve current revision
        ↓
Merge through protected branch/ruleset
        ↓
Production behavior remains traceable
```

Reviewers MUST judge the change as part of the system, not merely inspect syntax line by line.

## 1.3 Review standard

A change SHOULD be approved when it:

- correctly solves its intended problem;
- does not violate known invariants;
- maintains or improves code health;
- satisfies applicable standards; and
- has sufficient evidence of safety.

Review MUST NOT demand subjective perfection.

Minor stylistic preferences MUST NOT block a change when the repository standards are satisfied.

Google's published review guidance similarly frames approval around improving overall code health rather than requiring perfect code, and recommends distinguishing minor non-blocking comments from required changes. citeturn646681search0turn646681search4

## 1.4 Human review versus automation

Automation SHOULD enforce objectively machine-checkable requirements such as:

```text
formatting
lint
type checking
unit tests
integration tests
schema validation
dependency policy
SAST
secret scanning
build
generated-file consistency
```

Human reviewers SHOULD focus disproportionately on:

```text
correctness
design
business logic
security
data semantics
failure behavior
concurrency
maintainability
user impact
accessibility
test quality
```

A reviewer MUST NOT waste routine human review time manually policing formatting that an approved formatter can enforce.

## 1.5 Relationship to other standards

Code review MUST enforce applicable requirements from:

- **Security:** authentication, authorization, tenant isolation, secrets, input boundaries, threat models, cryptography, audit logging, and privileged actions;
- **Data & Database:** constraints, transactions, migrations, indexes, retention, data types, concurrency, and deletion;
- **API:** compatibility, validation, errors, idempotency, pagination, serialization, versioning, and authorization;
- **State Management:** state ownership, async races, optimistic updates, cache invalidation, offline state, and synchronization;
- **Forms & Validation:** client/server validation, error mapping, preservation of input, accessibility, and mutation behavior;
- **Accessibility:** semantics, keyboard interaction, focus, announcements, contrast, reduced motion, and assistive-technology support;
- **Design Tokens:** typography, spacing, color, states, focus, elevation, and semantic tokens;
- **Component standards:** reuse of canonical components and shadcn/ui primitives;
- **Pattern standards:** loading/error states, navigation, forms, tables, dialogs, destructive actions, and responsive behavior;
- **Testing:** unit, integration, contract, E2E, concurrency, accessibility, performance, and failure testing;
- **Governance:** ownership, approvals, change control, audit evidence, exceptions, and protected branches.

---

# 2. Rules

## 2.1 Author owns reviewability

The author MUST make a change understandable before requesting review.

The reviewer MUST NOT be expected to reconstruct the purpose of the change from source code alone.

The author MUST provide sufficient context for a qualified reviewer to answer:

```text
Why is this change needed?
What behavior changes?
What risks exist?
How was it tested?
What should I pay special attention to?
```

---

## 2.2 Draft before ready

A pull request MAY be opened early as a draft.

A PR MUST NOT be marked ready for review until:

- the author has self-reviewed it;
- obvious debug code is removed;
- relevant checks run successfully or known failures are documented;
- the description is complete enough for review;
- unrelated changes have been removed;
- the requested review scope is reasonably stable.

GitHub does not automatically request CODEOWNERS review while a PR remains draft; CODEOWNERS are requested when it becomes ready for review. citeturn118905search3

---

## 2.3 Author self-review

Before requesting human review, the author MUST review the full diff as though reviewing another person's change.

The self-review SHOULD check for:

```text
accidental files
temporary logs
debug flags
commented code
unrelated formatting
missing tests
missing migrations
sensitive values
stale TODOs
incorrect generated output
```

A reviewer SHOULD NOT be used as the first person to read the author's finished diff.

---

## 2.4 PR title

The PR title MUST communicate the actual change.

Preferred:

```text
Prevent duplicate invoice submission with idempotency key
```

Avoid:

```text
Fix issue
Updates
Changes
WIP
PR 2
```

Titles SHOULD be meaningful in:

- Git history;
- release notes;
- incident investigation;
- change records.

---

## 2.5 PR description

A material PR MUST include:

```text
Context / problem
What changed
Risk / impact
Testing evidence
Deployment or migration notes where relevant
```

It SHOULD additionally include:

```text
screenshots/video for UI changes
API compatibility notes
database impact
feature-flag information
rollback considerations
follow-up work
```

Descriptions MUST explain **why**, not merely restate file modifications.

Good review descriptions provide enough context for reviewers and future maintainers to understand the change. citeturn118905search7

---

## 2.6 PR template

Repositories SHOULD provide a PR template appropriate to their risk.

The template SHOULD prompt authors to consider:

```text
Security
Data migration
API compatibility
Accessibility
Tests
Performance
Observability
Rollout
Rollback
```

The template MUST NOT become a checkbox ritual where irrelevant boxes are mechanically checked.

---

## 2.7 Link requirements, not context replacement

PRs SHOULD link relevant:

```text
issue
ticket
design
ADR
incident
specification
```

but linked documents MUST NOT replace the minimum context required directly in the PR description.

Review must remain understandable if an external ticket later becomes inaccessible.

---

## 2.8 Focused changes

A PR SHOULD represent one coherent conceptual change.

Google's published engineering practices recommend small, self-contained changes because they are easier to review thoroughly, less likely to introduce bugs, and easier to merge and roll back. citeturn118905search0

Feature work, refactoring, generated changes, dependency updates, and large formatting changes SHOULD be separated when doing so improves reviewability.

---

## 2.9 Review-size defaults

The Gold Standard default is:

```text
≤ 400 human-authored changed lines:
    preferred review size

401–800:
    acceptable with coherent scope

801–1,200:
    SHOULD be split unless strong reason exists

> 1,200:
    MUST normally be split or receive explicit reviewer agreement
```

These thresholds exclude, where clearly separable:

- generated files;
- lockfiles;
- vendored code;
- mechanical migration output;
- snapshots.

Line count is a heuristic, not the sole measure of complexity.

A 200-line security-sensitive authorization change MAY deserve more scrutiny than a 1,000-line generated schema file.

---

## 2.10 Conceptual size outranks line count

A PR MUST be split when it contains several independently reviewable behavioral changes even if the line count is small.

Examples that SHOULD usually be separated:

```text
database refactor
+
API behavior change
+
UI redesign
```

or:

```text
dependency upgrade
+
unrelated feature
```

---

## 2.11 Large-change exception

A large PR MAY remain whole when splitting would materially reduce safety or review comprehension.

Examples MAY include:

- atomic mechanical migration;
- generated-code regeneration;
- repository-wide automated rename;
- coordinated schema/compiler output.

The author MUST clearly separate:

```text
mechanical change
```

from:

```text
human-authored semantic change
```

where feasible.

---

## 2.12 Review-time budget

Reviewers SHOULD respond promptly enough that code review does not become a development bottleneck.

Gold Standard response targets are:

```text
Fast-path / small low-risk PR:
    first review within 4 business hours where practical

Normal PR:
    first substantive review within 1 business day

High-risk / specialist review:
    reviewer acknowledges within 1 business day
    and schedules review explicitly if more time is needed
```

These are service targets, not permission to provide superficial review.

Published Google guidance similarly emphasizes prompt review responses while still requiring reviewers to spend enough time to be confident in approval. citeturn646681search1

---

## 2.13 Review-session budget

A reviewer SHOULD avoid attempting deep review after attention quality materially degrades.

A single focused review session SHOULD normally remain within approximately:

```text
60–90 minutes
```

for complex human-authored changes.

If safe review requires substantially longer, the reviewer SHOULD:

- split the review into documented passes; or
- ask the author to split the PR.

Time pressure MUST NOT lower the approval bar.

---

## 2.14 Reviewer qualification

At least one reviewer MUST understand the affected domain sufficiently to assess correctness.

Specialist review MUST be requested where the change materially affects:

```text
security
privacy
database schema/data
concurrency
accessibility
payments
cryptography
infrastructure
regulated workflows
```

A reviewer MUST say when they are not qualified to assess an area.

Published review guidance similarly recommends involving another qualified reviewer for complex concerns such as security, privacy, concurrency, accessibility, and internationalization. citeturn646681search3

---

## 2.15 Review the change and surrounding context

Reviewers MUST inspect enough surrounding code to understand the change.

A diff can hide defects such as:

- violated invariants;
- duplicate abstractions;
- wrong ownership layer;
- inconsistent authorization;
- incompatible calling assumptions.

Reviewers MUST NOT treat the diff as context-free text.

---

## 2.16 Review every relevant human-authored line

The assigned reviewer SHOULD understand every relevant human-authored line within their review scope.

Generated or mechanical content MAY be sampled when its generator and generation process are trusted.

Published engineering review guidance similarly recommends reviewing every human-authored line within the assigned scope and explicitly noting when review responsibility is split. citeturn646681search3

---

## 2.17 Correctness

Every functional review MUST assess whether the change behaves correctly.

The reviewer SHOULD ask:

```text
Does it implement the intended requirement?
What are the edge cases?
What happens with null/empty/missing data?
What happens after retry?
What happens twice?
What happens concurrently?
What happens after partial failure?
What happens at boundaries?
```

The reviewer MUST NOT infer correctness solely because tests pass.

---

## 2.18 User behavior

For user-facing changes, the reviewer MUST evaluate behavior from the user's perspective.

Review SHOULD consider:

```text
loading
empty
error
permission denied
retry
slow network
mobile
keyboard
screen reader
stale data
```

where relevant.

---

## 2.19 Architecture

The reviewer MUST evaluate whether the change belongs in the selected layer.

Questions SHOULD include:

```text
Is business logic in the correct domain/service?
Is UI code duplicating server policy?
Is persistence leaking into presentation?
Is the abstraction justified?
Does this create an unnecessary dependency?
```

---

## 2.20 Complexity

Reviewers SHOULD prefer the simplest design that correctly satisfies current requirements.

They SHOULD challenge:

- unnecessary indirection;
- premature generalization;
- speculative abstractions;
- duplicated state;
- hidden control flow;
- oversized functions/classes.

Reviewers MUST NOT demand abstraction purely for abstraction's sake.

---

## 2.21 Maintainability

The reviewer SHOULD consider whether another engineer can safely modify the code later.

Maintainability includes:

```text
clear naming
cohesive modules
explicit ownership
predictable control flow
documented non-obvious constraints
reasonable dependency direction
```

---

## 2.22 Security review

Every PR MUST receive risk-proportionate security consideration.

Security-sensitive changes MUST be reviewed for relevant concerns such as:

```text
authentication
authorization
tenant isolation
input validation
output encoding
injection
secrets
session handling
SSRF
file handling
cryptography
logging
privileged actions
```

OWASP specifically recommends tracing inputs, processing, sinks, and trust boundaries during secure code review and checking authentication, authorization, data validation, error handling, logging, and business logic. citeturn118905search1

---

## 2.23 Authorization

Reviewers MUST verify that protected operations enforce authorization at an authoritative layer.

Hiding a UI action MUST NOT be considered sufficient authorization.

Review MUST check:

```text
direct API invocation
cross-tenant access
resource ownership
role changes
stale permission state
```

where applicable.

---

## 2.24 Secrets

Reviewers MUST reject committed:

```text
passwords
tokens
private keys
API keys
production credentials
```

Secret-scanning automation SHOULD supplement review.

A value being stored in a private repository does not make committing a production secret acceptable.

---

## 2.25 Data review

Data-changing code MUST be reviewed for:

```text
correct types
constraints
nullability
uniqueness
foreign keys
transactions
concurrency
retention
PII
deletion
indexes
backfill behavior
```

---

## 2.26 Database migrations

Schema/data migrations MUST receive explicit migration review.

Review MUST consider:

```text
backward compatibility
lock duration
table rewrite
index creation
deployment ordering
old/new application coexistence
rollback
backfill
data loss
production scale
```

A migration MUST NOT be approved based only on success against an empty development database.

---

## 2.27 Destructive migration

A destructive database change MUST normally use staged migration.

Preferred:

```text
add new schema
→ dual-compatible deploy
→ migrate/backfill
→ switch reads/writes
→ verify
→ remove old schema later
```

High-risk one-step destructive migrations require explicit justification and rollback/recovery planning.

---

## 2.28 Query performance

Reviewers SHOULD examine new or materially changed database queries for:

- indexability;
- cardinality;
- N+1 behavior;
- unbounded scans;
- pagination;
- sorting;
- locking.

Performance-sensitive queries SHOULD include query-plan or benchmark evidence where appropriate.

---

## 2.29 API review

API changes MUST be reviewed against the API standard.

Review MUST consider:

```text
request schema
response schema
validation
authorization
status codes
error codes
pagination
idempotency
versioning
backward compatibility
```

---

## 2.30 Backward compatibility

Breaking API, event, database, or public-library changes MUST be explicitly identified.

The reviewer MUST determine whether:

- versioning;
- migration;
- compatibility shim;
- coordinated deployment;
- deprecation

is required.

An accidental breaking change MUST block approval.

---

## 2.31 Concurrency

Reviewers MUST consider race conditions when code performs:

```text
read → decide → write
```

or when asynchronous operations can overlap.

Review SHOULD inspect:

- transaction boundaries;
- idempotency;
- optimistic locking;
- counters;
- queue consumers;
- retries;
- stale responses.

---

## 2.32 State management

UI/application state review MUST identify the authoritative source of truth.

Reviewers SHOULD challenge:

- duplicated server state;
- copied derived state;
- stale async responses;
- unbounded effect chains;
- incorrect cache invalidation;
- route/state divergence.

---

## 2.33 Forms and validation

Form changes MUST be reviewed for:

```text
server validation
client validation
error association
submission races
duplicate submit
preservation of values
accessibility
```

Client-side validation MUST NOT replace authoritative server validation.

---

## 2.34 Accessibility review

User-interface changes MUST be reviewed against the Accessibility standard.

Reviewers MUST consider relevant:

```text
semantic HTML
keyboard operation
focus behavior
accessible names
labels
errors
live announcements
contrast
reduced motion
touch targets
```

A reviewer who cannot evaluate a materially novel accessibility pattern SHOULD request specialist review.

---

## 2.35 shadcn/ui baseline

UI review MUST determine whether a canonical shadcn/ui primitive or established wrapper already exists.

Feature teams SHOULD use shared components instead of recreating:

```text
Dialog
AlertDialog
Sheet
Tabs
Select
Combobox
DropdownMenu
Popover
Tooltip
Table
Data Table
Alert
Button
Form
```

Custom behavior MUST be justified when the baseline component already satisfies the requirement.

---

## 2.36 Design Tokens

Reviewers MUST reject arbitrary one-off design values where a Design Token exists.

Review SHOULD check:

```text
spacing
color
typography
radius
elevation
focus
semantic states
responsive breakpoints
```

Hardcoded values MAY be valid for truly local technical geometry, but MUST NOT bypass system semantics.

---

## 2.37 Pattern compliance

User flows SHOULD be reviewed against canonical patterns.

Examples:

```text
loading/errors
empty states
navigation
destructive actions
forms
tables
search
offline state
```

A feature MUST NOT create a different UX contract for a solved platform-wide pattern without justification.

---

## 2.38 Performance

Reviewers SHOULD consider performance when the changed path is materially sensitive.

Potential issues include:

```text
extra round trips
N+1 queries
large bundles
unbounded rendering
expensive loops
memory retention
unbounded concurrency
oversized payloads
blocking I/O
```

Performance optimization MUST NOT be demanded without a plausible or measured problem.

---

## 2.39 Performance evidence

Material performance changes SHOULD include evidence such as:

```text
benchmark
profile
bundle delta
query plan
load test
before/after timing
```

A claim such as:

```text
this should be faster
```

is not evidence for a significant optimization.

---

## 2.40 Observability

Reviewers SHOULD verify that new operationally significant behavior has enough observability.

Relevant signals MAY include:

```text
structured logs
metrics
traces
audit events
correlation IDs
alerts
```

Reviewers MUST also verify that new telemetry does not expose secrets or unnecessary PII.

---

## 2.41 Tests are production code

Reviewers MUST review tests themselves.

They SHOULD verify that tests:

- test the intended behavior;
- fail when behavior breaks;
- do not merely reproduce implementation;
- cover material edge cases;
- are deterministic;
- remain maintainable.

Published engineering guidance explicitly notes that tests need human review because test code can itself be incorrect. citeturn646681search3

---

## 2.42 Test scope

Behavior-changing code MUST include appropriate automated tests unless an approved exception applies.

Depending on change risk, this MAY include:

```text
unit
integration
contract
database
E2E
accessibility
concurrency
security
performance
```

No single test category is universally sufficient.

---

## 2.43 Bug fixes

A bug fix SHOULD include a regression test demonstrating the previously failing behavior when feasible.

The preferred sequence is:

```text
test reproduces defect
→ fix
→ test passes
```

---

## 2.44 Refactors

A claimed behavior-preserving refactor SHOULD have sufficient existing or added tests to establish confidence that behavior remains unchanged.

Large refactoring SHOULD generally be separated from feature behavior.

---

## 2.45 Test absence

If a material behavioral change has no test, the author MUST explain why.

The reviewer MUST decide whether that reason is sufficient.

"No time" is not normally an acceptable reason.

---

## 2.46 Manual test evidence

Manual testing MAY supplement automated tests.

UI changes SHOULD often include:

```text
screenshot
video
manual scenario
```

where useful.

Manual testing MUST NOT become the only regression protection for stable machine-testable business logic.

---

## 2.47 Generated code

Reviewers MAY avoid line-by-line review of trusted generated code.

They MUST instead verify:

```text
generator/source change
generator version
generation command
unexpected output scope
```

Generated files SHOULD be mechanically reproducible.

---

## 2.48 Dependency changes

Dependency changes MUST be reviewed for:

```text
necessity
version
license/policy
security
bundle/runtime impact
transitive impact
lockfile consistency
```

A dependency version bump MUST NOT be considered automatically low risk.

---

## 2.49 Infrastructure/configuration

Configuration changes MUST receive the same risk-based review as code.

A one-line IAM, firewall, database, CI, or production flag change MAY be more consequential than hundreds of application-code lines.

Line count MUST NOT determine risk classification.

---

## 2.50 Documentation

Relevant documentation MUST be updated in the same change or through an explicitly linked follow-up when the change alters:

```text
public behavior
API contract
runbook
configuration
architecture
operator procedure
```

Review comments alone MUST NOT be used as permanent documentation.

---

## 2.51 Comment severity taxonomy

Review comments SHOULD declare intent.

Canonical labels:

```text
Blocker:
    MUST resolve before approval

Required:
    MUST resolve before merge

Suggestion:
    SHOULD consider; non-blocking

Nit:
    minor polish; non-blocking

Question:
    clarification requested

FYI:
    informational; no change expected
```

A reviewer SHOULD NOT leave ambiguous comments that force the author to guess whether a change is required.

---

## 2.52 Blocking comments

A blocking comment MUST explain the concrete problem.

Preferred:

```text
Required: This authorization check occurs only in the UI.
The API mutation can still be called directly by a viewer.
Please enforce the permission in the server handler.
```

Avoid:

```text
No.
Bad.
Change this.
```

---

## 2.53 Explain reasoning

Review comments SHOULD explain why a requested change matters when the reason is not obvious.

Review should optimize for the codebase and future maintainers, not for winning an argument.

Published guidance recommends commenting on the code rather than the person, explaining reasoning, and differentiating required changes from suggestions. citeturn646681search4

---

## 2.54 Review the code, not the author

Review comments MUST remain professional and focused on:

```text
code
design
behavior
risk
evidence
```

They MUST NOT attack:

- intelligence;
- competence;
- seniority;
- motives;
- personality.

---

## 2.55 No sarcasm or humiliation

Reviewers MUST NOT use:

```text
sarcasm
mockery
belittling language
public humiliation
```

A technically correct review delivered abusively is still an unacceptable review.

---

## 2.56 Author responses

Authors MUST respond to blocking/required comments by:

- changing the code;
- explaining why the proposed change is incorrect/inapplicable;
- asking for clarification.

An author MUST NOT silently resolve a required comment without addressing it.

---

## 2.57 Fix code before explaining review history

If the reviewer is confused by code that future maintainers are also likely to find confusing, the author SHOULD improve the code or durable comments.

A lengthy explanation existing only in the PR thread is weaker than clearer implementation.

Published guidance likewise recommends improving unclear code rather than relying on a review-thread explanation that future readers will not see. citeturn646681search6

---

## 2.58 Reviewer suggestions are not ownership transfer

The reviewer is responsible for identifying material issues.

The author remains responsible for implementing the solution.

Reviewers MAY suggest code, but MUST NOT become obligated to redesign every issue they identify.

---

## 2.59 Resolve all blocking threads

A PR MUST NOT merge while unresolved blocking review findings remain.

Non-blocking `Nit`, `Suggestion`, or `FYI` comments MAY remain unresolved if repository tooling allows, but their disposition SHOULD be clear.

---

## 2.60 Approval meaning

Approval means:

```text
I have reviewed the scope assigned to me,
I understand it sufficiently,
and I believe it meets the applicable merge standard.
```

Approval MUST NOT mean:

```text
I trust the author.
CI passed.
Someone else probably checked it.
```

---

## 2.61 Normal approval rule

Normal production changes MUST receive at least:

```text
1 approval from a qualified non-author reviewer
```

unless an approved fast-path policy explicitly permits otherwise.

Repositories with materially higher risk SHOULD require additional approvals.

---

## 2.62 High-risk approval rule

Changes affecting any of the following SHOULD normally require at least two qualified human approvals or an equivalent specialist-owner policy:

```text
authentication
authorization
cryptography
payment/financial logic
production data migration
tenant isolation
secrets/key management
critical infrastructure
audit retention/integrity
regulated workflows
```

At least one approval MUST come from the applicable domain owner where ownership is defined.

---

## 2.63 Self-approval

An author MUST NOT satisfy their own required human approval.

Pair programming MAY improve quality but SHOULD NOT automatically eliminate independent review for high-risk production changes.

---

## 2.64 CODEOWNERS

Repositories SHOULD define CODEOWNERS for critical areas.

GitHub automatically requests code-owner review when owned files change, and protected branches/rulesets can require code-owner approval before merge. citeturn118905search3turn118905search4

Typical owned paths SHOULD include:

```text
authentication
authorization
database migrations
infrastructure
security configuration
payments
design system
accessibility infrastructure
CODEOWNERS itself
```

---

## 2.65 CODEOWNERS protects expertise, not bureaucracy

CODEOWNERS rules SHOULD correspond to areas where domain expertise or accountability is genuinely required.

The organization SHOULD NOT make every team owner of every repository file.

Overly broad ownership causes:

- review bottlenecks;
- rubber-stamp approval;
- unclear accountability.

---

## 2.66 Protect CODEOWNERS

The CODEOWNERS configuration itself MUST be protected from unilateral weakening.

GitHub recommends protecting the CODEOWNERS file or its containing `.github` directory with appropriate owners when code-owner review is used as a security control. citeturn118905search3

---

## 2.67 Required status checks

Protected production branches MUST normally require relevant automated checks before merge.

Checks MAY include:

```text
build
test
lint
typecheck
security scan
migration verification
policy checks
```

An administrator MUST NOT routinely bypass failed required checks.

---

## 2.68 Stale approvals

Repositories SHOULD invalidate or revalidate approvals when material code changes after approval.

GitHub protected-branch configuration can dismiss stale approvals after new commits and can require approval of the most recent reviewable push by someone other than the pusher. citeturn118905search4

High-risk repositories SHOULD enable protections that prevent approved PRs from being materially changed and merged without appropriate re-review.

---

## 2.69 Re-review scope

After author updates, reviewers SHOULD focus first on:

- requested changes;
- newly changed code;
- interactions created by those changes.

A material redesign SHOULD trigger broader re-review.

---

## 2.70 Author should identify substantial rework

If the author materially redesigns the change after review, they MUST tell reviewers.

A reviewer MUST NOT be expected to discover silently that half the approved architecture was replaced.

---

## 2.71 Reviewer delegation

A reviewer MAY request specialist help.

When review responsibility is divided, the PR SHOULD record who reviewed which dimensions.

Example:

```text
@alice — database migration
@bob — accessibility/UI
@carol — overall feature correctness
```

---

## 2.72 Do not double-review blindly

Multiple reviewers SHOULD divide expertise rather than mechanically repeat identical review.

However, high-risk changes MAY intentionally require overlapping independent review.

---

## 2.73 Disagreements start with technical facts

When author and reviewer disagree, they MUST first attempt resolution using:

```text
requirements
repository standards
measured evidence
system invariants
documented architecture
engineering trade-offs
```

Personal preference MUST NOT override established standards.

---

## 2.74 Style disagreements

An established formatter, lint rule, style guide, or repository convention MUST settle ordinary style disputes.

Review time SHOULD NOT be consumed by recurring subjective syntax preferences.

---

## 2.75 Discuss synchronously when thread stalls

If several review-thread exchanges fail to converge, author and reviewer SHOULD move to a short synchronous technical discussion.

The final decision and reasoning MUST then be summarized back into the PR or durable design documentation.

Published review guidance likewise recommends synchronous discussion followed by recording the resulting decision when comment threads are not resolving disagreement. citeturn646681search0

---

## 2.76 Escalation

If author and reviewer cannot agree, the decision SHOULD escalate to an appropriate:

```text
code owner
technical lead
staff/principal engineer
architecture owner
security owner
engineering manager
```

according to the nature of the dispute.

A PR MUST NOT remain blocked indefinitely due to unresolved personal disagreement.

---

## 2.77 Escalation is not reviewer shopping

An author MUST NOT repeatedly request additional reviewers simply to find someone willing to approve a rejected unsafe change.

Escalation must resolve the underlying technical decision.

---

## 2.78 Decision documentation

A significant disputed design decision SHOULD result in:

```text
PR summary
ADR
design note
code comment
```

depending on expected longevity.

Future maintainers SHOULD NOT need to rediscover the same debate.

---

## 2.79 Fast-path purpose

Repositories MAY provide a fast-path review for changes with demonstrably low blast radius and low semantic risk.

Fast path MUST reduce process latency, not reduce correctness standards.

---

## 2.80 Fast-path eligible changes

Potential fast-path changes MAY include:

```text
typo/documentation correction
comment correction
non-semantic formatting
verified generated-file refresh
test-only change with no production path impact
small copy change
low-risk internal tooling
```

Eligibility MUST be repository-defined.

---

## 2.81 Fast-path exclusions

The following MUST NOT use the ordinary low-risk fast path merely because the diff is small:

```text
authorization
authentication
permissions
secrets
cryptography
database migration
production infrastructure
financial logic
tenant boundaries
retention/deletion
compliance controls
dependency supply-chain risk
public API breaking change
```

Risk, not line count, determines eligibility.

---

## 2.82 Fast-path requirements

A fast-path change MUST:

- be small and focused;
- pass required automated checks;
- contain no hidden/generated semantic behavior;
- satisfy applicable CODEOWNERS;
- meet explicit fast-path classification;
- remain easily reversible.

Fast path MAY reduce:

```text
reviewer count
waiting period
manual checklist depth
```

according to repository policy.

It MUST NOT bypass required security ownership or branch protections.

---

## 2.83 Fast-path approval

The canonical fast-path baseline is:

```text
1 qualified reviewer
+ all required CI
+ applicable CODEOWNER approval
```

Repositories MAY allow configured automation-only merge for strictly non-production artifacts such as typo-only documentation changes, but such exceptions MUST be narrowly defined.

---

## 2.84 Emergency changes

Emergency production changes MAY use an accelerated review path.

Emergency review MUST still include:

```text
identified author
identified reviewer
risk assessment
minimum relevant tests
change record
rollback plan
post-merge review
```

Emergency status MUST NOT mean "no review."

---

## 2.85 Emergency reviewer

A production incident fix SHOULD receive at least one qualified non-author review before merge where operationally possible.

If immediate merge without pre-approval is genuinely required by incident policy, retrospective review MUST occur promptly afterward.

---

## 2.86 Rollback

High-risk changes SHOULD have a clear rollback or mitigation strategy.

The reviewer SHOULD understand:

```text
Can this be reverted?
Does rollback lose data?
Does schema remain compatible?
Is a feature flag available?
```

"Git revert" is not necessarily a safe rollback for data migrations or external side effects.

---

## 2.87 Feature flags

Feature flags MAY reduce rollout risk.

Reviewers MUST still inspect:

- default value;
- permission to change flag;
- cleanup plan;
- interaction with old/new behavior.

A feature flag does not make incorrect code acceptable.

---

## 2.88 Merge strategy

Repositories MUST define accepted merge strategy:

```text
merge commit
squash
rebase
```

The strategy SHOULD preserve sufficient change history for repository governance.

Authors MUST NOT rewrite protected shared history in ways that bypass review controls.

---

## 2.89 Merge queue

Repositories with high concurrency MAY use a merge queue or equivalent mechanism to ensure required checks evaluate changes in a merge-compatible state.

GitHub protected branch/ruleset controls support merge queues and required status checks as repository protections. citeturn118905search4

---

## 2.90 Review evidence

The repository SHOULD retain:

```text
PR description
review comments
approvals
status checks
merge commit
linked issue/change ticket
```

according to repository and compliance retention policy.

Code review MAY provide change-control evidence, but only when the recorded process matches the actual control being claimed.

---

## 2.91 Review metrics

Teams MAY monitor:

```text
time to first review
time to merge
PR size
rework cycles
review load
escaped defects
```

Metrics MUST NOT incentivize superficial review.

Examples of harmful incentives include:

```text
maximum approvals per day
approval speed regardless of risk
minimum comment count
```

---

## 2.92 Reviewer load

Code-owner teams SHOULD monitor concentrated review load.

A CODEOWNERS configuration that routes most repository changes to one unavailable expert SHOULD be redesigned.

Ownership SHOULD have adequate redundancy.

---

## 2.93 Review accessibility

Repository workflows and internal review dashboards MUST be accessible.

If an organization builds a custom review/governance interface, it SHOULD use canonical shadcn/ui primitives such as:

| Need | shadcn/ui baseline |
|---|---|
| Review/change list | `Data Table`, `Table` |
| Risk/status | `Badge` |
| Policy warning | `Alert` |
| Review detail | `Sheet`, `Dialog` |
| Required approval/exception | `AlertDialog` where consequential |
| Filters | `Input`, `Select`, `Combobox` |
| Long diff/detail | `ScrollArea` |
| Loading | `Skeleton`, `Spinner` |
| No reviews | `Empty` |
| Actions | `Button` |

Status MUST NOT rely on color alone.

---

## 2.94 Automated review tools

AI or static-analysis review tools MAY assist by identifying potential issues.

They MUST NOT be treated as the required qualified human approval for risk classes that require human review.

Automated comments SHOULD:

- identify confidence where available;
- avoid duplicating formatter/linter noise;
- remain dismissible when demonstrably incorrect.

---

## 2.95 AI-generated code

AI-generated code MUST meet the same review standard as human-authored code.

The author remains responsible for:

```text
correctness
license/policy compliance
security
tests
maintainability
```

"Generated by AI" MUST NOT lower review expectations.

---

## 2.96 Copy-pasted code

External code copied into the repository MUST receive normal security, license, and maintainability review.

Reviewer trust MUST derive from the code and its source/license, not the fact that it came from a popular answer or library example.

---

## 2.97 Reviewer checklist proportionality

Reviewers MUST apply all relevant categories but SHOULD scale depth to actual risk.

For example:

A copy-only UI text fix does not require database-isolation analysis.

An inventory decrement change does.

The checklist is a risk-discovery tool, not mandatory ceremonial discussion of every category.

---

## 2.98 Blockers versus follow-up debt

A reviewer MAY allow low-risk unrelated debt to become follow-up work.

Existing unrelated issues MUST NOT be used to indefinitely expand PR scope.

However, a defect introduced or materially worsened by the current change MUST normally be addressed before merge.

---

## 2.99 TODO follow-up

When review intentionally defers necessary follow-up work, the deferral SHOULD have:

```text
owner
issue/ticket
rationale
```

A bare:

```text
TODO later
```

SHOULD NOT be used for significant risk.

---

## 2.100 Required review test catalogue

Repositories SHOULD verify governance behavior for:

```text
ordinary PR
CODEOWNER path
high-risk path
fast path
draft → ready
stale approval
failing required check
latest-push approval
emergency path
admin bypass
```

Branch/ruleset configuration SHOULD itself be managed and reviewed as security-sensitive repository configuration.

---

# 3. Anti-patterns

## 3.1 Rubber-stamp approval

**Anti-pattern:**

```text
LGTM
```

seconds after a complex PR opens.

**Rule:** Approval MUST represent substantive review of the assigned scope.

---

## 3.2 CI-green approval

**Anti-pattern:** Automated tests pass, therefore human approval is automatic.

**Rule:** Reviewers MUST assess design, correctness, context, and risk that automation cannot prove.

---

## 3.3 Reviewer as compiler

**Anti-pattern:** Most comments are formatting or lint issues.

**Rule:** Automate objective style enforcement.

---

## 3.4 Giant PR

**Anti-pattern:** Thousands of unrelated human-authored lines are sent as one ordinary review.

**Rule:** Changes SHOULD be decomposed into coherent reviewable units.

---

## 3.5 Line-count-only risk

**Anti-pattern:** One-line IAM change receives fast path because it is tiny.

**Rule:** Review depth follows risk, not diff size.

---

## 3.6 Empty PR description

**Anti-pattern:**

```text
See ticket.
```

**Rule:** PRs MUST contain enough immediate context to review the change.

---

## 3.7 Description that repeats filenames

**Anti-pattern:**

```text
Updated user.ts and tests.ts.
```

**Rule:** Explain behavior and intent.

---

## 3.8 No self-review

**Anti-pattern:** Reviewer discovers debug logging, accidental files, and unfinished code immediately.

**Rule:** Author MUST self-review before requesting review.

---

## 3.9 Feature + massive refactor

**Anti-pattern:** Behavioral change is buried inside unrelated structural rewriting.

**Rule:** Separate changes where reviewability improves.

---

## 3.10 Style debate

**Anti-pattern:** Twenty comments debate personal naming/formatting preference contrary to repository conventions.

**Rule:** Established standards settle style.

---

## 3.11 Drive-by blocker

**Anti-pattern:**

```text
This is bad.
```

**Rule:** Blocking comments MUST identify the technical problem.

---

## 3.12 All comments treated as blockers

**Anti-pattern:** Author cannot distinguish a typo suggestion from a security defect.

**Rule:** Comment severity SHOULD be explicit.

---

## 3.13 Personal criticism

**Anti-pattern:**

```text
You clearly don't understand concurrency.
```

**Rule:** Review the implementation, not the person.

---

## 3.14 Review-thread-only explanation

**Anti-pattern:** Complex code remains obscure but the author explains it in a comment.

**Rule:** Clarify the implementation or durable documentation.

---

## 3.15 Author resolves without responding

**Anti-pattern:** Blocking thread is marked resolved without code change or rationale.

**Rule:** Required findings MUST have clear disposition.

---

## 3.16 Reviewer demands unrelated cleanup

**Anti-pattern:** A focused bug fix becomes a repository-wide refactor because the reviewer noticed old debt.

**Rule:** Unrelated debt SHOULD become separate work unless required for safe implementation.

---

## 3.17 Self-approval

**Anti-pattern:** Author supplies the only required approval.

**Rule:** Required human approval MUST be independent.

---

## 3.18 Wrong reviewer

**Anti-pattern:** UI reviewer approves a cryptographic change they do not understand.

**Rule:** Material specialist areas require qualified review.

---

## 3.19 CODEOWNERS as decoration

**Anti-pattern:** CODEOWNERS exists but protected branches do not require ownership approval for critical paths.

**Rule:** Ownership controls SHOULD be enforceable when relied on as governance.

---

## 3.20 Unprotected CODEOWNERS

**Anti-pattern:** Developer modifies CODEOWNERS in the same PR to remove the reviewer requirement.

**Rule:** Ownership policy itself MUST be protected.

---

## 3.21 Stale approval

**Anti-pattern:** PR is approved, then substantial new code is pushed and merged without re-review.

**Rule:** Material post-approval changes MUST invalidate or receive current approval.

---

## 3.22 Reviewer shopping

**Anti-pattern:** Author asks reviewers sequentially until one ignores the original blocking issue.

**Rule:** Technical disagreement MUST be resolved or formally escalated.

---

## 3.23 Endless review-thread argument

**Anti-pattern:** Dozens of comments repeat the same disagreement.

**Rule:** Move to synchronous discussion and document the decision.

---

## 3.24 Silent compromise

**Anti-pattern:** Author makes a change neither party believes is correct just to end the review.

**Rule:** Resolve the technical decision explicitly.

---

## 3.25 Fast path by label alone

**Anti-pattern:** Author adds `low-risk` and bypasses normal governance.

**Rule:** Fast-path eligibility MUST be policy-defined and enforceable.

---

## 3.26 Dependency update automatically fast-tracked

**Anti-pattern:** Small lockfile diff is assumed safe despite a major dependency or supply-chain change.

**Rule:** Dependency risk must be assessed independently.

---

## 3.27 Emergency means no review

**Anti-pattern:** Incident pressure eliminates all independent verification.

**Rule:** Emergency process accelerates review; it does not erase accountability.

---

## 3.28 No regression test for bug

**Anti-pattern:** Defect is fixed but nothing proves it cannot return.

**Rule:** Add regression coverage where feasible.

---

## 3.29 Test existence equals test quality

**Anti-pattern:** Reviewer counts tests without reading them.

**Rule:** Tests themselves require review.

---

## 3.30 Snapshot approval

**Anti-pattern:** Large snapshot changes are accepted without determining why they changed.

**Rule:** Generated/snapshot deltas must correspond to intended source behavior.

---

## 3.31 Database migration on empty DB only

**Anti-pattern:** Migration is considered safe because local setup succeeded.

**Rule:** Production data size, locks, compatibility, and backfill behavior MUST be reviewed.

---

## 3.32 UI-only authorization

**Anti-pattern:** Reviewer accepts hidden button as permission enforcement.

**Rule:** Protected action authorization belongs at the authoritative server boundary.

---

## 3.33 Accessibility afterthought

**Anti-pattern:** Accessibility review is deferred indefinitely after UI merge.

**Rule:** Applicable accessibility requirements are part of definition of done.

---

## 3.34 One-off component creation

**Anti-pattern:** Feature recreates Dialog, Tabs, or Select while canonical component exists.

**Rule:** Review MUST enforce component/pattern reuse unless deviation is justified.

---

## 3.35 Premature performance objection

**Anti-pattern:** Reviewer blocks clear code based on unsupported micro-optimization speculation.

**Rule:** Material performance claims SHOULD be evidence-based.

---

## 3.36 No rollback consideration

**Anti-pattern:** High-risk migration is approved with "we can revert the commit."

**Rule:** Rollback must account for persistent data and external effects.

---

## 3.37 Metrics as productivity scoring

**Anti-pattern:** Engineers are ranked by PR count or review speed.

**Rule:** Review metrics SHOULD improve system flow, not incentivize unsafe behavior.

---

# 4. Checklist

## 4.1 Author

- [ ] PR is focused.
- [ ] Author self-reviewed the full diff.
- [ ] Debug artifacts are removed.
- [ ] Title describes the behavior.
- [ ] Description explains context and intent.
- [ ] Risk is identified.
- [ ] Tests are documented.
- [ ] UI evidence is attached where useful.
- [ ] Migration/deployment notes exist where required.
- [ ] Rollback considerations exist for high-risk change.
- [ ] Correct reviewers are requested.

## 4.2 Reviewability

- [ ] Human-authored diff is within expected size.
- [ ] Oversized PR has justification.
- [ ] Generated/mechanical changes are distinguishable.
- [ ] Feature and unrelated refactor are separated.
- [ ] Reviewer has enough context.
- [ ] Relevant requirement/design is linked.
- [ ] Change can be reviewed without reverse-engineering intent.

## 4.3 Correctness

- [ ] Requirement is implemented.
- [ ] Edge cases are considered.
- [ ] Failure paths are correct.
- [ ] Retry behavior is correct.
- [ ] Duplicate execution is considered.
- [ ] Null/empty/missing state is handled.
- [ ] Boundary cases are considered.
- [ ] No lost update/race is introduced where relevant.

## 4.4 Architecture

- [ ] Logic lives in the correct layer.
- [ ] Abstractions are justified.
- [ ] Complexity is proportionate.
- [ ] Existing reusable code is used.
- [ ] Dependency direction remains appropriate.
- [ ] New coupling is understood.
- [ ] Non-obvious decisions are documented durably.

## 4.5 Security

- [ ] Authentication impact is reviewed.
- [ ] Authorization is enforced server-side where required.
- [ ] Tenant isolation is preserved.
- [ ] Inputs are validated.
- [ ] Injection risks are considered.
- [ ] Secrets are absent.
- [ ] Sensitive logging is avoided.
- [ ] File/network boundaries are reviewed.
- [ ] Privileged side effects are protected.
- [ ] Specialist security review is requested where needed.

## 4.6 Data & Database

- [ ] Correct database types are used.
- [ ] Constraints protect invariants.
- [ ] Nullability is intentional.
- [ ] Transactions are correct.
- [ ] Concurrency is considered.
- [ ] Queries are bounded/indexable.
- [ ] Migration compatibility is reviewed.
- [ ] Backfill handles production scale.
- [ ] PII/retention implications are considered.
- [ ] Destructive changes have recovery plan.

## 4.7 API

- [ ] Request contract is valid.
- [ ] Response contract is valid.
- [ ] Error semantics are correct.
- [ ] Authorization is correct.
- [ ] Idempotency is addressed where needed.
- [ ] Pagination/filter semantics are correct.
- [ ] Backward compatibility is maintained or explicitly versioned.
- [ ] Breaking change is identified.
- [ ] Client/server deployment compatibility is considered.

## 4.8 State Management

- [ ] State ownership is explicit.
- [ ] Server state is not unnecessarily duplicated.
- [ ] Async stale-response races are handled.
- [ ] Cache invalidation is correct.
- [ ] Optimistic state has reconciliation.
- [ ] Loading/error states are complete.
- [ ] Offline/realtime behavior is considered where applicable.

## 4.9 Forms & Validation

- [ ] Server validation exists where required.
- [ ] Client validation improves UX.
- [ ] Values survive recoverable failures.
- [ ] Duplicate submit is handled.
- [ ] Validation errors map correctly.
- [ ] Dirty-state behavior is correct.
- [ ] Form accessibility is preserved.

## 4.10 Accessibility

- [ ] Semantic elements are correct.
- [ ] Keyboard interaction works.
- [ ] Focus behavior is correct.
- [ ] Accessible names/labels exist.
- [ ] Error/status announcements are appropriate.
- [ ] Meaning does not rely only on color.
- [ ] Reduced motion is considered.
- [ ] Specialist review is requested for novel patterns.

## 4.11 Design System

- [ ] Existing shadcn/ui/canonical components are reused.
- [ ] Design Tokens are used.
- [ ] No unnecessary one-off component exists.
- [ ] Loading/error/empty states follow catalogue.
- [ ] Responsive behavior follows patterns.
- [ ] Custom component behavior is justified.

## 4.12 Performance

- [ ] New queries avoid N+1/unbounded scans.
- [ ] Network round trips are reasonable.
- [ ] Payload size is appropriate.
- [ ] Rendering/loop complexity is appropriate.
- [ ] Concurrency is bounded.
- [ ] Significant optimization includes evidence.
- [ ] Performance trade-offs are documented where material.

## 4.13 Observability

- [ ] Operationally important behavior is observable.
- [ ] Logs are structured where appropriate.
- [ ] Errors can be correlated.
- [ ] Metrics/traces exist where justified.
- [ ] Required audit events exist.
- [ ] Telemetry excludes secrets/unnecessary PII.

## 4.14 Tests

- [ ] Behavioral change has appropriate automated coverage.
- [ ] Bug fix has regression test where feasible.
- [ ] Tests fail for broken behavior.
- [ ] Tests cover material edge cases.
- [ ] Tests are deterministic.
- [ ] Test complexity is reasonable.
- [ ] Integration/E2E tests are used where unit tests are insufficient.
- [ ] Concurrency/security/accessibility tests exist where relevant.

## 4.15 Documentation

- [ ] Public behavior documentation is updated.
- [ ] API docs are updated.
- [ ] Runbook is updated where operational behavior changes.
- [ ] Architectural decisions are recorded where durable.
- [ ] Review-thread explanations are not the only documentation.

## 4.16 Review comments

- [ ] Blocking comments identify concrete problem.
- [ ] Severity is clear.
- [ ] Reasoning is provided when non-obvious.
- [ ] Comments address code, not author.
- [ ] Personal style preferences do not block.
- [ ] Unrelated debt is separated from current scope.
- [ ] Required comments receive explicit disposition.

## 4.17 Approval

- [ ] Reviewer is qualified.
- [ ] Required non-author approval exists.
- [ ] CODEOWNER approval exists where required.
- [ ] High-risk specialist approval exists where required.
- [ ] Required checks are green.
- [ ] Blocking comments are resolved.
- [ ] Latest material revision has been reviewed.
- [ ] Author has not satisfied their own independent approval.

## 4.18 Fast path

- [ ] Change qualifies under repository fast-path policy.
- [ ] Change is genuinely low risk.
- [ ] Diff is small/focused.
- [ ] CI passes.
- [ ] CODEOWNERS is still satisfied.
- [ ] No security/data/infrastructure high-risk area is affected.
- [ ] Change is easy to reverse.
- [ ] Fast path has not been self-declared without policy basis.

## 4.19 Disagreements

- [ ] Technical facts/standards were considered first.
- [ ] Style guide settles pure style disputes.
- [ ] Synchronous discussion is used if thread stalls.
- [ ] Decision is documented afterward.
- [ ] Proper owner/lead is used for escalation.
- [ ] Reviewer shopping is avoided.

## 4.20 Repository governance

- [ ] Protected branch/ruleset requires PR review.
- [ ] Required status checks are configured.
- [ ] CODEOWNERS is protected.
- [ ] Critical paths have ownership.
- [ ] Stale approvals are invalidated/revalidated appropriately.
- [ ] Latest-push review protection is considered.
- [ ] Emergency bypass is restricted and auditable.
- [ ] Governance configuration itself is reviewed.

---

# 5. Canonical summary

The following rules define the Gold Standard 2026 baseline.

1. **Code review is a correctness, security, maintainability, and governance control—not a formatting ceremony.**

2. **The author MUST make the change reviewable before requesting review.**

3. **Every material PR MUST explain why the change exists, what changed, risk, and testing evidence.**

4. **Authors MUST self-review the complete diff before requesting review.**

5. **PRs SHOULD represent one coherent conceptual change.**

6. **Small reviewable changes are preferred because they improve review depth, turnaround, rollback, and defect detection.** citeturn118905search0

7. **The Gold Standard preferred size is at most approximately 400 human-authored changed lines; PRs above 800 SHOULD normally be split, and PRs above 1,200 MUST normally be split or explicitly accepted as an exception.**

8. **Conceptual complexity and risk outrank line count.**

9. **Reviewers SHOULD provide a first substantive response within one business day for normal PRs and faster for small low-risk changes where practical.**

10. **Time pressure MUST NOT lower the review standard.**

11. **Reviewers MUST assess correctness, design, failure behavior, edge cases, and user impact.**

12. **Human review MUST complement rather than duplicate automated linting, formatting, and static checks.**

13. **Security-sensitive changes MUST receive threat-appropriate review of authentication, authorization, data flow, input boundaries, secrets, and privileged operations.** citeturn118905search1

14. **Protected actions MUST enforce authorization at the authoritative backend layer.**

15. **Database changes MUST be reviewed for constraints, transactions, concurrency, migration safety, production scale, and rollback/recovery.**

16. **API changes MUST be reviewed for contracts, compatibility, validation, idempotency, authorization, and errors.**

17. **UI/state changes MUST be reviewed for state ownership, async races, loading/error states, optimistic reconciliation, and cache correctness.**

18. **Forms MUST preserve server validation, user input, submission safety, and accessible error behavior.**

19. **User-interface changes MUST satisfy Accessibility standards before merge. Accessibility is not optional post-merge cleanup.**

20. **Canonical shadcn/ui components and Design Tokens SHOULD be reused instead of one-off feature implementations.**

21. **Performance concerns SHOULD be evidence-based when they materially affect the design.**

22. **Operationally significant changes SHOULD include appropriate observability without exposing secrets or unnecessary PII.**

23. **Tests are code and MUST themselves be reviewed for correctness and usefulness.** citeturn646681search3

24. **Behavior-changing code MUST have appropriate automated coverage unless a documented exception is approved.**

25. **Bug fixes SHOULD include regression tests where feasible.**

26. **Large refactors SHOULD normally be separated from behavioral changes.**

27. **Generated files MAY receive reduced line-by-line review only when their source/generator and resulting scope are understood.**

28. **Configuration, IAM, infrastructure, dependency, and migration changes MUST be reviewed according to risk rather than line count.**

29. **Review comments SHOULD clearly distinguish Blocker/Required from Suggestion/Nit/FYI.** citeturn646681search4

30. **Blocking comments MUST explain the concrete technical concern.**

31. **Reviewers MUST critique code and behavior, never the author's intelligence, competence, or character.**

32. **If code requires lengthy PR-thread explanation, the durable implementation or documentation SHOULD usually be clarified.**

33. **Reviewers identify problems; authors retain responsibility for implementing the solution.**

34. **Normal production changes MUST receive at least one qualified non-author approval unless a formally defined fast path says otherwise.**

35. **High-risk security, financial, infrastructure, data-migration, and authorization changes SHOULD normally require enhanced specialist/owner approval.**

36. **CODEOWNERS SHOULD identify critical areas where expertise or accountability is required.**

37. **When relied on as governance, CODEOWNER review MUST be enforced through branch protection or rulesets rather than existing only as advisory metadata.** citeturn118905search3turn118905search4

38. **CODEOWNERS itself MUST be protected from unilateral weakening.** citeturn118905search3

39. **Material changes after approval MUST receive appropriate re-review; stale approval MUST NOT authorize substantially different code.**

40. **Required status checks MUST normally pass before production merge.**

41. **Disagreements MUST be resolved from requirements, evidence, standards, and engineering trade-offs rather than authority or preference alone.**

42. **When comment threads stop converging, author and reviewer SHOULD discuss synchronously and record the resulting decision.** citeturn646681search0

43. **Unresolved technical disagreements SHOULD escalate to the appropriate owner or technical lead rather than leave a PR blocked indefinitely.**

44. **Escalation MUST NOT become reviewer shopping.**

45. **Fast-path review MAY reduce latency only for formally classified low-risk changes.**

46. **Fast path MUST NOT bypass required CODEOWNERS, required CI, security ownership, or branch protection.**

47. **A tiny diff affecting authentication, authorization, secrets, database migrations, infrastructure, financial logic, or tenant boundaries is NOT automatically low risk.**

48. **Emergency changes MAY accelerate review but MUST retain author, reviewer, testing, rollback, and audit accountability.**

49. **High-risk changes SHOULD have an understood rollback or mitigation strategy before merge.**

50. **Review metrics MAY be used to improve flow but MUST NOT incentivize superficial approval or developer ranking by PR count.**

51. **AI-generated code is held to exactly the same correctness, security, testing, and maintainability standard as human-authored code.**

52. **Repository protection, CODEOWNERS, status checks, fast-path policy, and emergency bypass are themselves security/governance configuration and MUST be reviewed accordingly.**

53. **Custom code-review/governance UIs SHOULD use shadcn/ui Data Table, Table, Badge, Alert, Sheet, Dialog, AlertDialog, Input, Select, Combobox, ScrollArea, Skeleton, Spinner, Empty, and Button primitives, with status conveyed by text rather than color alone.**

54. **The canonical rule is: authors make changes small and understandable; reviewers examine the actual risk and system impact; automation handles mechanical checks; qualified owners approve the current code; and no production change merges merely because it was convenient to approve.**

The most useful operational distinction is **review size versus review risk**. Small PRs should be the default because they improve review quality, but a one-line permission or migration change can still require more scrutiny and ownership than hundreds of low-risk mechanical lines.
