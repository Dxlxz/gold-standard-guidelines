---
id: "ci-cd"
title: "CI/CD Guidelines — Gold Standard 2026"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["engineering", "ci", "cd"]
applies_to: ["infra"]
related: ["security", "reusability-libraries", "architecture"]
legacy_number: 24
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 66743
provenance: baseline

---

# CI/CD Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- source-control workflow;
- branch strategy;
- pull requests;
- review and approval;
- automated checks;
- continuous integration;
- builds;
- artifact creation;
- artifact provenance;
- software supply-chain integrity;
- database migrations;
- preview environments;
- release management;
- continuous delivery;
- deployment;
- canary releases;
- blue-green deployment;
- progressive delivery;
- rollback;
- hotfixes;
- emergency delivery;
- production approvals;
- deployment verification;
- CI/CD security.

The objective is to create a delivery system that is:

```text
Fast
Repeatable
Secure
Observable
Auditable
Reversible
Deterministic
Low-risk
```

The core principle is:

> **Every production change should move through a reproducible, automated, verifiable path from reviewed source code to an identifiable immutable artifact to a controlled deployment.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented reason exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
Affected repository/service
Risk
Compensating controls
Owner
Expiry/review date
```

---

# 3. CI vs CD

**Continuous Integration (CI)** means:

```text
small code changes
↓
frequent integration
↓
automated verification
```

**Continuous Delivery (CD)** means:

```text
verified artifacts
↓
always deployable
↓
controlled promotion
```

**Continuous Deployment** means:

```text
every eligible verified change
↓
automatically deployed
```

These are related but distinct practices.

---

# 4. Delivery Pipeline as a Security Boundary

The CI/CD system can:

- read source code;
- access secrets;
- build trusted artifacts;
- modify infrastructure;
- deploy production.

Therefore CI/CD MUST be treated as privileged production infrastructure.

---

# 5. Canonical Delivery Flow

The default conceptual flow is:

```text
Developer change
↓
Short-lived branch
↓
Pull request
↓
Automated CI
↓
Human review
↓
Protected merge
↓
Trusted build
↓
Immutable artifact
↓
Provenance / SBOM
↓
Environment promotion
↓
Production deployment
↓
Health verification
↓
Monitoring / rollback if required
```

---

# 6. Source Is Not the Deployable Artifact

Production SHOULD deploy a produced artifact such as:

```text
container image
package
binary
bundle
serverless package
```

rather than rebuilding arbitrary source on production hosts.

---

# 7. Build Once, Promote

The preferred model is:

```text
Commit
↓
Build once
↓
Artifact A
↓
Test Artifact A
↓
Stage Artifact A
↓
Production Artifact A
```

Do not rebuild different production artifacts from the same commit merely because the target environment changed.

---

# 8. Immutable Artifacts

Released artifacts MUST be immutable.

If something changes:

```text
new content
→ new artifact identity
```

Do not overwrite an already-released artifact tag/version with different bytes.

---

# 9. Branch Strategy

The default branch strategy SHOULD optimize for:

```text
short-lived branches
frequent integration
small changes
low merge divergence
```

---

# 10. Default Branch

Repositories SHOULD maintain one canonical integration/default branch.

Recommended conceptual name:

```text
main
```

---

# 11. Main Branch

The default branch SHOULD remain:

```text
green
releasable
deployable
```

under normal conditions.

---

# 12. Protected Main

The default branch MUST be protected.

Direct ordinary developer pushes SHOULD be prohibited.

---

# 13. Pull Request Required

Production code changes SHOULD normally reach the default branch through a reviewed pull request.

---

# 14. Short-Lived Feature Branches

Feature branches SHOULD be short-lived.

Prefer:

```text
hours / days
```

rather than:

```text
weeks / months
```

where practical.

---

# 15. Long-Lived Branch Risk

Long-lived branches increase:

```text
merge conflicts
integration risk
hidden divergence
large PRs
release risk
```

---

# 16. Trunk-Based Development Default

For most continuously delivered application teams, the default SHOULD resemble trunk-based development:

```text
main
↑
small short-lived branches
```

with incomplete functionality hidden behind safe implementation boundaries or feature flags where necessary.

---

# 17. GitFlow Is Not the Default

A permanent hierarchy such as:

```text
develop
release/*
hotfix/*
master
```

SHOULD NOT be adopted automatically.

Use long-lived release branches only where the release/support model requires them.

---

# 18. Release Branches

Release branches MAY be justified for:

```text
multiple supported product versions
desktop/mobile release stabilization
on-premise releases
regulated certification periods
LTS maintenance
```

---

# 19. Release Branch Ownership

Every release branch SHOULD have:

```text
version
owner
support policy
merge-back policy
end-of-life
```

---

# 20. Branch Divergence

Fixes made to release branches MUST have an explicit policy for propagation to newer supported branches.

---

# 21. Hotfix Branch

A hotfix branch MAY be used for urgent production correction.

It MUST still follow:

```text
review
CI
artifact build
deployment verification
```

unless the emergency exception process explicitly permits a narrower path.

---

# 22. Branch Naming

Branch names SHOULD be predictable.

Example:

```text
feat/project-export
fix/payment-timeout
chore/framework-upgrade
```

Exact syntax is organization-specific.

---

# 23. Branch Names Are Not Authorization

Never infer production permissions from:

```text
branch begins with release/
```

Authorization belongs in CI/CD policy.

---

# 24. Avoid Personal Permanent Branches

Branches such as:

```text
alice
john-dev
backup-new
```

SHOULD NOT become permanent integration environments.

---

# 25. Delete Merged Branches

Merged short-lived branches SHOULD be deleted automatically where practical.

---

# 26. Pull Request Principle

A pull request is:

> **A reviewable unit of change, not merely a merge button.**

---

# 27. Small Pull Requests

PRs SHOULD be small enough that reviewers can understand:

```text
intent
behavior
risk
security impact
migration impact
```

---

# 28. PR Size

No universal line-count limit is required.

The practical test is:

> Can a qualified reviewer understand the change without mentally reconstructing half the application?

---

# 29. Separate Refactoring

Large mechanical refactoring SHOULD be separated from significant behavioral changes where practical.

This makes review safer.

---

# 30. PR Description

Substantial PRs SHOULD explain:

```text
What changed?
Why?
How was it tested?
What is the risk?
Migration?
Feature flag?
Deployment considerations?
Rollback considerations?
```

---

# 31. Link Requirement

PRs SHOULD link to:

```text
issue
requirement
incident
ADR
design
```

where relevant.

---

# 32. Draft Pull Requests

Draft PRs MAY be used for early CI and collaboration.

Draft status MUST NOT bypass required merge gates.

---

# 33. Human Review

Substantive production changes SHOULD require human review.

---

# 34. Self-Approval

Authors SHOULD NOT be the sole approver of high-impact production changes.

---

# 35. Required Review Count

Review requirements SHOULD reflect risk.

Typical changes may require:

```text
1 qualified reviewer
```

while high-risk changes MAY require additional review.

---

# 36. CODEOWNERS

Critical areas SHOULD use ownership-based review mechanisms where repository tooling supports them.

Examples:

```text
/auth
/billing
/infra
/migrations
/security
```

---

# 37. Review Expertise

Approval should come from someone capable of reviewing the affected concern.

A random approval does not provide meaningful governance.

---

# 38. Security-Sensitive Changes

Changes affecting:

```text
authentication
authorization
cryptography
secrets
tenant isolation
payment security
CI/CD security
```

SHOULD trigger appropriate specialist review.

---

# 39. Infrastructure Changes

Infrastructure and production policy changes SHOULD receive review like application code.

---

# 40. Migration Review

High-risk database migrations require explicit database/data review where organizational capability exists.

---

# 41. PR Checks

A mergeable PR SHOULD pass all applicable required checks.

---

# 42. Canonical PR Verification

Typical checks include:

```text
format
lint
type check
unit tests
integration tests
component tests
security/static checks
dependency checks
build
```

with E2E or other suites according to risk.

---

# 43. Required Checks

Required checks MUST be enforced through repository protections rather than social convention alone.

---

# 44. Stale Approvals

Approval SHOULD be invalidated when substantial code changes after review.

---

# 45. Latest Revision Verification

Merge policy SHOULD ensure required CI corresponds to the revision actually being merged.

---

# 46. Merge Race

Do not assume:

```text
PR CI passed
```

means:

```text
main after five other merges
```

will still pass.

---

# 47. Merge Queue

High-activity repositories SHOULD consider a merge queue that verifies the candidate revision against current main before merge.

---

# 48. Main Branch Health

If main becomes red:

```text
restore it promptly
```

before normal feature delivery continues.

---

# 49. Broken Main Is Operational Debt

A permanently failing default branch makes CI results meaningless.

---

# 50. Merge Strategy

Repositories SHOULD select one primary strategy:

```text
squash merge
merge commit
rebase merge
```

based on history/release needs.

---

# 51. Squash Merge

Squash merging works well when the PR is the primary review/change unit.

---

# 52. Merge Commits

Merge commits MAY be useful when retaining branch topology matters.

---

# 53. Rebase Merge

Rebase-style history MAY provide linear history but requires appropriate source-control discipline.

---

# 54. Merge Strategy Is Secondary

The critical requirements are:

```text
reviewed
traceable
verified
reproducible
```

changes.

Do not turn merge-history aesthetics into delivery bureaucracy.

---

# 55. Commit Messages

Commit/merge messages SHOULD provide enough context for:

```text
history
release notes
incident investigation
```

---

# 56. Force Push

Force pushing protected/release branches SHOULD be prohibited.

---

# 57. History Rewriting

Released source history SHOULD NOT be casually rewritten.

---

# 58. CI Principle

Every pushed/PR change SHOULD receive automated verification proportional to its risk.

---

# 59. Pipeline as Code

CI/CD workflows SHOULD be version-controlled with the application/platform.

---

# 60. Pipeline Changes Are Privileged

A change to:

```text
.github/workflows
ci/
pipeline.yml
deployment scripts
```

can be more security-sensitive than ordinary application code.

---

# 61. CI Workflow Ownership

Critical pipeline configuration SHOULD have explicit owners.

---

# 62. Pipeline Review

Changes that alter:

```text
permissions
secrets
deployment
artifact signing
production environments
```

require elevated review.

---

# 63. Pipeline Stages

A typical pipeline is:

```text
Checkout
↓
Dependency restore/install
↓
Static verification
↓
Tests
↓
Build
↓
Security/supply-chain verification
↓
Artifact publication
↓
Deployment
↓
Verification
```

Exact stages MAY run in parallel.

---

# 64. Fast Failure

Cheap, deterministic failures SHOULD run early.

Example:

```text
format
lint
types
unit tests
```

before expensive E2E jobs.

---

# 65. Pipeline Parallelism

Independent checks SHOULD execute concurrently where practical.

---

# 66. Pipeline Runtime

CI duration is an engineering metric.

Slow CI encourages developers to:

```text
batch larger changes
skip local validation
avoid integration
```

---

# 67. CI Budget

Teams SHOULD monitor pipeline duration and optimize:

```text
slow tests
duplicate builds
dependency installation
unnecessary serial jobs
```

---

# 68. CI Correctness Before Speed

Never remove meaningful verification solely to reduce a few minutes without evaluating risk.

---

# 69. Deterministic CI

The same revision and declared inputs SHOULD produce the same logical build result.

---

# 70. Clean Checkout

CI MUST build from a clean source checkout.

It MUST NOT rely on:

```text
developer machine files
untracked files
previous local builds
```

---

# 71. Lockfiles

Dependency lockfiles MUST be honored where the ecosystem supports them.

---

# 72. Frozen Dependency Installation

CI SHOULD fail if dependency installation unexpectedly modifies the lockfile.

---

# 73. Version-Pinned Toolchain

Important CI tool versions SHOULD be pinned.

Examples:

```text
runtime
package manager
compiler
build tool
```

---

# 74. Floating Latest Versions

Avoid critical pipelines depending on:

```text
latest
```

for tool/container versions.

---

# 75. Reproducible Build Inputs

Build inputs SHOULD be explicit:

```text
source revision
lockfile
toolchain
build configuration
base image
```

---

# 76. Reproducible Builds

Where practical, important artifacts SHOULD be reproducible or at least generated from strongly controlled, recorded inputs.

---

# 77. CI Cache

CI caching MAY accelerate builds.

Caches MUST NOT compromise correctness.

---

# 78. Cache Keys

Cache keys SHOULD include relevant:

```text
lockfile
toolchain
platform
```

identity.

---

# 79. Cache Poisoning

Do not allow untrusted branches to populate privileged caches later consumed by trusted production builds without appropriate isolation.

---

# 80. Build Isolation

Production builds SHOULD run in clean isolated runners/environments.

---

# 81. Ephemeral Runners

Ephemeral runners SHOULD be preferred for privileged production builds where practical.

---

# 82. Persistent Runner Risk

Persistent self-hosted runners can retain:

```text
credentials
workspace files
malicious state
cache contamination
```

between jobs.

They require stronger controls.

---

# 83. Runner Trust Levels

Separate runners for:

```text
untrusted PRs
trusted internal CI
production deployment
```

where risk warrants it.

---

# 84. Least-Privilege CI Permissions

Pipeline jobs MUST receive only required permissions.

---

# 85. Default CI Permissions

Default workflow permissions SHOULD be read-only/minimal.

Jobs needing write access should request it explicitly.

---

# 86. Secretless Cloud Authentication

CI/CD SHOULD prefer:

```text
OIDC / workload federation
short-lived credentials
```

over long-lived cloud deployment keys where supported.

---

# 87. Production Credentials

Production deployment credentials MUST NOT be exposed to generic build/test jobs.

---

# 88. Fork Pull Requests

Untrusted fork PRs MUST NOT automatically receive privileged secrets.

---

# 89. PR Code Is Untrusted

Code submitted in a PR can modify:

```text
test scripts
build scripts
package lifecycle hooks
```

and therefore must be treated as untrusted until reviewed.

---

# 90. Privileged Workflow Trigger

Do not execute unreviewed PR code inside a privileged deployment context.

---

# 91. Third-Party CI Actions

Third-party pipeline actions/plugins are software dependencies.

They require:

```text
trust review
version pinning
update governance
```

---

# 92. Pinning Pipeline Dependencies

Security-sensitive external workflow actions SHOULD be pinned to immutable revisions/digests where the platform supports it.

---

# 93. Pipeline Dependency Updates

Automated dependency-update tooling MAY maintain CI action versions.

Updates still require verification.

---

# 94. Shell Scripts

CI shell commands MUST use safe scripting conventions.

Failures should not be silently ignored.

---

# 95. Pipeline Error Handling

A failed verification command MUST fail the job unless failure is explicitly non-blocking.

---

# 96. `continue-on-error`

Non-blocking CI failures SHOULD be rare and clearly visible.

Do not use them to create a permanently green-looking pipeline.

---

# 97. Test Results

CI SHOULD retain useful test failure output.

---

# 98. Failure Artifacts

Depending on test type, retain:

```text
logs
screenshots
traces
coverage
test reports
```

for a bounded period.

---

# 99. Artifact Privacy

CI artifacts can contain:

```text
tokens
PII
screenshots
application data
```

and require appropriate access/retention.

---

# 100. CI Secrets

Secret values MUST NOT appear in build logs or uploaded artifacts.

---

# 101. Static Security Checks

Applicable pipelines SHOULD include automated security checks such as:

```text
secret scanning
dependency vulnerability scanning
static analysis
IaC checks
```

according to Security Guidelines.

---

# 102. Security Scanners Are Gates, Not Oracles

Scanner output requires:

```text
severity policy
triage
false-positive process
exceptions
```

---

# 103. Scanner Exceptions

Security suppression MUST be:

```text
specific
documented
owned
time-bounded where appropriate
```

---

# 104. Dependency Verification

Build pipelines SHOULD verify dependency integrity using ecosystem capabilities.

---

# 105. SBOM

Released production artifacts SHOULD generate an SBOM where product/security governance requires or materially benefits from it.

---

# 106. SBOM Artifact Binding

The SBOM SHOULD correspond to the actual released artifact—not a vaguely similar repository state.

---

# 107. SBOM Format

Use a standard machine-readable SBOM format accepted by organizational tooling.

---

# 108. Build Artifact

A production artifact SHOULD have stable identity such as:

```text
digest
checksum
version
```

---

# 109. Content Digest

For container/package deployment, immutable content digests SHOULD be used where platform capabilities allow.

---

# 110. Tags Are Pointers

A mutable tag such as:

```text
latest
production
```

MUST NOT be treated as immutable artifact identity.

---

# 111. Production Deployment Identity

Operators SHOULD be able to answer:

```text
exact artifact digest
source commit
build workflow
build time
builder
```

for a running production instance.

---

# 112. Artifact Provenance

Released artifacts SHOULD have verifiable provenance for systems where supply-chain integrity matters.

Provenance should connect:

```text
artifact
↓
build process
↓
builder
↓
source revision
```

---

# 113. Provenance Standard

The organization SHOULD prefer recognized provenance/attestation standards rather than inventing proprietary formats.

---

# 114. Attestation

An attestation SHOULD bind claims cryptographically to the artifact where the delivery platform supports it.

---

# 115. Attestation Verification

Generating provenance is insufficient.

Critical consumers/deployments SHOULD verify provenance against policy.

---

# 116. Provenance Is Not Vulnerability Proof

A valid attestation establishes information about:

```text
where
how
from what source
```

an artifact was produced.

It does not prove the artifact contains no vulnerabilities.

---

# 117. Artifact Signing

Released packages/images MAY be cryptographically signed where ecosystem/deployment policy supports verification.

---

# 118. Keyless Signing

OIDC-backed/keyless signing SHOULD be preferred where it reduces long-lived signing-key risk and the ecosystem supports it.

---

# 119. Signing Keys

If long-lived signing keys are used, they MUST receive Restricted-secret controls.

---

# 120. Artifact Repository

Production artifacts SHOULD be stored in an approved artifact registry.

---

# 121. Registry Access

Publication and deletion rights to production artifact repositories MUST be restricted.

---

# 122. Registry Immutability

Released versions SHOULD be protected from overwrite/deletion where appropriate.

---

# 123. Artifact Retention

Retention SHOULD support:

```text
rollback
incident investigation
supported release history
```

without retaining unlimited unused build output.

---

# 124. Build Once Rule

Environment-specific values MUST NOT require recompiling an otherwise identical server artifact where runtime injection can safely solve the requirement.

---

# 125. Frontend Exception

Some frontend public configuration is necessarily build-time.

Such values are public and create distinct artifact identities.

---

# 126. Build Metadata

Released artifacts SHOULD expose safe metadata such as:

```text
version
commit SHA
build ID
```

for diagnosis.

---

# 127. Preview Environments

Preview environments MAY be created per:

```text
pull request
branch
change set
```

for deployment-level verification.

---

# 128. Preview Purpose

Preview is particularly useful for:

```text
UI review
integration review
manual QA
stakeholder acceptance
```

---

# 129. Preview Is Non-Production

Preview environments MUST NOT use production credentials or customer data by default.

---

# 130. Preview Isolation

Each preview SHOULD receive isolated:

```text
hostname
configuration
application identity
```

and mutable backing resources where necessary.

---

# 131. Preview Database

Strategies MAY include:

```text
ephemeral database
shared non-prod DB with isolated namespace
test dataset
```

depending on architecture.

Cross-preview data leakage must be prevented.

---

# 132. Preview External Integrations

Use:

```text
provider sandbox
fake service
test account
```

where appropriate.

---

# 133. Preview Notifications

Preview environments MUST NOT accidentally:

```text
email customers
charge cards
send real SMS
trigger production webhooks
```

---

# 134. Preview Authentication

Preview access SHOULD reflect intended review needs while preventing accidental public exposure of sensitive functionality.

---

# 135. Preview Secrets

Preview secrets SHOULD be short-lived and narrowly scoped.

---

# 136. Preview Cleanup

Preview infrastructure MUST be deleted automatically after its lifecycle ends where practical.

---

# 137. Preview Cost

Set TTL/cleanup controls to prevent abandoned previews from becoming persistent infrastructure.

---

# 138. Preview Does Not Replace CI

A visually functioning preview does not prove:

```text
security
unit correctness
migration safety
```

Automated gates remain required.

---

# 139. Database Migrations

Database migration is part of deployment.

It is not an unrelated manual DBA step.

---

# 140. Migration Source Control

All production schema migrations MUST be version-controlled.

---

# 141. Migration Review

Migrations SHOULD be reviewed for:

```text
locking
runtime
data loss
compatibility
rollback/forward recovery
```

---

# 142. Automated Migration

Routine migrations SHOULD execute through controlled automation.

---

# 143. Migration Ownership

The application/team owning the schema SHOULD own migration correctness.

---

# 144. Migration Order

Deployments MUST define the relationship among:

```text
schema migration
application rollout
backfill
cleanup
```

---

# 145. Backward-Compatible Migrations

Rolling deployments SHOULD use backward-compatible schema changes.

---

# 146. Expand/Contract

Preferred model:

```text
Expand schema
↓
Deploy compatible code
↓
Migrate/backfill data
↓
Switch behavior
↓
Remove old schema later
```

---

# 147. Unsafe Rename

Avoid directly:

```text
rename column
+
deploy code assuming only new name
```

during rolling deployments without compatibility planning.

---

# 148. Unsafe Drop

Destructive schema removal MUST occur only after all running code no longer depends on the old structure.

---

# 149. NOT NULL Migration

Adding a non-null constraint to a large populated table requires deliberate rollout.

Typical sequence:

```text
add nullable field
↓
write new values
↓
backfill
↓
validate
↓
enforce NOT NULL
```

where database capabilities require.

---

# 150. Large Backfill

Large backfills SHOULD NOT execute as one giant deployment transaction.

---

# 151. Backfill Job

Large data migrations SHOULD be:

```text
batched
restartable
observable
rate-limited
idempotent
```

---

# 152. Migration Timeout

Deployment pipelines MUST NOT wait indefinitely for a migration.

---

# 153. Migration Failure

A failed migration MUST stop unsafe application rollout.

---

# 154. Migration Lock Risk

Potential blocking/lock-heavy DDL MUST receive explicit review.

---

# 155. Migration in Application Startup

Large/complex production migrations SHOULD NOT run implicitly every time every application instance starts.

---

# 156. Single Migration Coordinator

The architecture MUST prevent hundreds of new instances racing to perform the same nontrivial migration.

---

# 157. Migration Verification

After migration, verify:

```text
schema state
expected data
application compatibility
```

---

# 158. Rollback and Database State

Application rollback does not automatically mean database rollback.

Schema/data changes may be forward-only.

---

# 159. Forward Fix

For many database migrations:

```text
forward fix
```

is safer than attempting destructive rollback.

Document this explicitly.

---

# 160. Migration Backup

High-risk destructive migrations SHOULD confirm appropriate recovery capability before execution.

---

# 161. Migration Metrics

Long migrations/backfills SHOULD expose:

```text
progress
error rate
remaining work
```

---

# 162. Release Definition

A release is an identifiable version of software approved for deployment/distribution.

---

# 163. Deployment Definition

A deployment is the act of running a release/artifact in an environment.

One release may have multiple deployments.

---

# 164. Release Version

Released software SHOULD have stable version identity.

---

# 165. Semantic Versioning

Semantic Versioning MAY be appropriate for:

```text
libraries
public SDKs
distributed software
```

where consumers depend on versioned compatibility.

---

# 166. Internal SaaS Versioning

Continuously deployed SaaS does not require arbitrary SemVer for every deployment.

A:

```text
build ID
commit
release ID
```

may be sufficient internally.

---

# 167. Release Notes

User-visible or operator-relevant releases SHOULD document meaningful changes.

---

# 168. Changelog

Public libraries/products with explicit versions SHOULD maintain an appropriate changelog/release history.

---

# 169. Automated Release Notes

Automation MAY generate candidate release notes from:

```text
PR labels
conventional metadata
issue references
```

but meaningful user-facing communication still requires review.

---

# 170. Release Candidate

Release candidates MAY be used where software needs stabilization/testing before final distribution.

---

# 171. Release Freeze

Scheduled freeze periods MAY be appropriate for:

```text
major business events
regulatory windows
high-risk migrations
```

but SHOULD be a risk-management mechanism, not compensation for unreliable deployment.

---

# 172. Deployment Principle

Deployment SHOULD be:

```text
automated
repeatable
idempotent
observable
```

---

# 173. Manual SSH Deployment

Routine production deployment by:

```text
SSH
git pull
npm install
restart
```

is prohibited for managed production systems.

---

# 174. Environment Promotion

Promotion SHOULD identify:

```text
artifact
configuration
target environment
actor/workflow
```

---

# 175. Production Deployment Gate

Production deployment MUST require all applicable release gates to pass.

---

# 176. Approval Philosophy

Human approval SHOULD be used where human judgment materially reduces risk.

Do not require manual approval solely as ritual.

---

# 177. Automated Production Deployment

Low-risk mature systems MAY deploy automatically after all policy gates pass.

---

# 178. Manual Production Approval

Manual approval MAY be appropriate for:

```text
high-risk systems
regulated changes
large migrations
destructive operations
early-stage deployment maturity
```

---

# 179. Approval Separation

Where required, the deployment approver SHOULD be distinct from the change author for high-risk releases.

---

# 180. Approval Context

An approver should be able to see:

```text
artifact
commit/PR
tests
migration
risk
deployment plan
```

before approving.

---

# 181. Blind Approval Is Not Control

A green "Approve" button without sufficient context provides little risk reduction.

---

# 182. Deployment Windows

Fixed deployment windows MAY be required for operational reasons.

They SHOULD NOT exist solely because deployments are too dangerous to perform normally.

---

# 183. Small Deployments

Prefer small frequent deployments over large infrequent releases where the product model permits.

---

# 184. Deployment Batch Size

Risk generally increases with:

```text
change size
number of independent changes
time since last integration
```

---

# 185. Progressive Delivery

High-risk changes SHOULD consider progressive delivery.

Canonical mechanisms include:

```text
canary
blue-green
percentage rollout
regional rollout
feature flag rollout
```

---

# 186. Rolling Deployment

Rolling deployment gradually replaces old instances with new instances.

---

# 187. Rolling Compatibility

During rolling deployment:

```text
version N
+
version N+1
```

may run simultaneously.

They must remain compatible with shared:

```text
DB
queue
cache
API
```

contracts during the rollout window.

---

# 188. Canary Deployment

A canary deployment exposes the new release to a limited subset of traffic before broader rollout.

---

# 189. Canary Purpose

Canary reduces blast radius for failures that pre-production testing may miss.

---

# 190. Canary Population

Canary selection MAY be based on:

```text
traffic percentage
region
internal users
selected tenants
instances
```

provided user/security semantics remain valid.

---

# 191. Canary Signals

Canary evaluation SHOULD inspect:

```text
error rate
latency
resource use
critical business outcomes
```

rather than deployment health alone.

---

# 192. Canary Baseline

Compare canary behavior against:

```text
previous release/control population
```

where possible.

---

# 193. Canary Duration

Canary duration SHOULD reflect:

```text
traffic volume
failure mode
workflow latency
```

rather than an arbitrary timer.

---

# 194. Canary Promotion

Promotion may proceed only when defined health criteria remain acceptable.

---

# 195. Canary Abort

If severe regression occurs:

```text
stop rollout
remove canary
investigate
```

automatically where reliable signals permit.

---

# 196. Low-Traffic Canary

A 1% canary receiving five requests may provide no useful confidence.

Use sample volume, not percentage alone.

---

# 197. Blue-Green Deployment

Blue-green maintains two production-capable environments:

```text
Blue
Green
```

with traffic switched between them.

---

# 198. Blue-Green Benefits

It can provide:

```text
fast traffic switch
pre-cutover validation
simple application rollback
```

---

# 199. Blue-Green Cost

It may require near-duplicate infrastructure and creates complexity around:

```text
database changes
state
background workers
queues
```

---

# 200. Blue-Green Database Constraint

Blue-green does not make incompatible database migrations safe automatically.

Both versions may need to operate against the same data during transition.

---

# 201. Traffic Switch

Traffic switching MUST be observable and reversible.

---

# 202. Old Environment Retention

The previous environment MAY remain available briefly for rollback.

Do not keep stale environments indefinitely.

---

# 203. Background Workers in Blue-Green

Ensure only intended worker versions consume:

```text
queues
scheduled jobs
events
```

during transition.

---

# 204. Regional Rollout

Multi-region systems SHOULD consider deploying:

```text
one region
↓
observe
↓
additional regions
```

for high-risk releases.

---

# 205. Feature Rollout

Deployment and feature activation SHOULD be separable for risky features.

Example:

```text
deploy code disabled
↓
verify
↓
enable 5%
↓
increase rollout
```

---

# 206. Deployment Flag

Feature flags can reduce release risk but MUST follow Feature Flag lifecycle rules.

---

# 207. Deployment Strategy Selection

Choose the simplest strategy that satisfies:

```text
availability
rollback
risk
state compatibility
cost
```

---

# 208. Canary Is Not Mandatory Everywhere

Do not implement elaborate canary infrastructure for a low-risk internal application with negligible deployment risk unless justified.

---

# 209. Blue-Green Is Not Inherently Superior

Use it only when its benefits justify duplicate-environment complexity.

---

# 210. Pre-Deployment Checks

Before production rollout, verify as applicable:

```text
artifact exists
artifact trusted
tests passed
config valid
migration state valid
secrets available
capacity available
```

---

# 211. Deployment Lock

Concurrent incompatible production deployments SHOULD be prevented.

---

# 212. Deployment Serialization

A service may require:

```text
one production deployment at a time
```

to maintain understandable state.

---

# 213. Multi-Service Deployment

Avoid tightly coupling many services into one synchronized deployment unless atomic release semantics truly require it.

---

# 214. Independent Deployability

Service/module architecture SHOULD support independent deployment where ownership and contracts justify it.

---

# 215. Contract Compatibility

Producer/consumer changes SHOULD use compatibility strategies rather than synchronized deploy assumptions.

---

# 216. API Deployment

Breaking external API changes MUST follow API versioning/deprecation policy.

---

# 217. Event Deployment

Event schema changes MUST remain compatible with independently deployed consumers according to Architecture Guidelines.

---

# 218. Deployment Verification

Successful deployment means more than:

```text
orchestrator says complete
```

---

# 219. Technical Verification

Verify:

```text
instances healthy
readiness passing
expected version running
errors normal
latency normal
```

---

# 220. Business Verification

Critical deployments SHOULD verify important user outcomes.

Examples:

```text
login works
checkout succeeds
critical read works
critical write works
```

---

# 221. Smoke Tests

Post-deployment smoke tests SHOULD cover a small set of critical flows.

---

# 222. Production Smoke Safety

Smoke tests MUST avoid harming real customers.

Use:

```text
synthetic accounts
isolated resources
safe operations
```

---

# 223. Deployment Markers

Production observability SHOULD record deployment markers.

---

# 224. Deployment Metadata

Operators should see:

```text
release
artifact digest
commit
deployment time
```

during incident investigation.

---

# 225. Deployment Monitoring Window

High-risk deployments SHOULD have a defined observation period.

---

# 226. Deployment Does Not Require Humans Watching Dashboards Forever

Mature pipelines SHOULD automate reliable health criteria.

Human supervision remains appropriate when automation cannot safely determine outcomes.

---

# 227. Automatic Rollback

Automatic rollback MAY be used when:

```text
signal is reliable
failure is severe
rollback is actually safe
```

---

# 228. Rollback Principle

Every deployable release SHOULD have a documented recovery strategy.

---

# 229. Rollback Is One Recovery Strategy

Possible recovery strategies include:

```text
rollback
roll forward
feature disable
config rollback
traffic shift
```

---

# 230. Rollback Safety

Do not automatically assume the previous binary is compatible with newly changed:

```text
schema
events
cache format
external state
```

---

# 231. Roll Forward

For incompatible database/data changes:

```text
forward fix
```

may be safer than application rollback.

---

# 232. Feature Flag Rollback

Disabling the problematic feature MAY be safer and faster than reverting an entire release.

---

# 233. Config Rollback

If a configuration change caused the incident, revert configuration rather than unrelated application code.

---

# 234. Rollback Time

Critical services SHOULD understand expected rollback/mitigation time.

---

# 235. Rollback Artifacts

Previous production artifacts required for rollback SHOULD remain available.

---

# 236. Rollback Testing

Critical services SHOULD periodically verify rollback or equivalent recovery workflows.

---

# 237. Rollback Data

Rollback testing must consider:

```text
database
queue
cache
external side effects
```

not only executable code.

---

# 238. Irreversible Changes

Irreversible releases require stronger pre-deployment safeguards.

Examples:

```text
destructive data migration
external irreversible action
encryption key destruction
```

---

# 239. Backup Is Not Rollback

Restoring an entire database backup is disaster recovery, not routine deployment rollback.

---

# 240. Deployment Failure State

A failed deployment MUST leave the system in a known state.

---

# 241. Partial Deployment

If only some instances updated:

```text
mixed-version compatibility
```

must be understood.

---

# 242. Failed Rollout

The system should support:

```text
pause
resume
abort
rollback
```

according to deployment technology.

---

# 243. Emergency Release

Emergency delivery exists for urgent:

```text
security fixes
production outage fixes
critical data-integrity fixes
```

---

# 244. Emergency Does Not Mean No Controls

Emergency changes still require:

```text
traceability
minimum review
automated verification
artifact identity
```

where technically possible.

---

# 245. Emergency Approval

Emergency access MAY reduce normal approval latency.

It MUST be:

```text
authorized
audited
reviewed afterward
```

---

# 246. Break-Glass Deployment

Break-glass production deployment capability must be:

```text
rare
MFA protected
individually attributable
alerted
```

---

# 247. Post-Emergency Review

Emergency changes MUST receive post-event review and normalization into the standard workflow.

---

# 248. No Permanent Emergency Path

The emergency pipeline must not become the convenient everyday deployment path.

---

# 249. Deployment Freeze Override

Critical fixes MAY override a deployment freeze through the emergency process.

---

# 250. Release Approvals

Approval requirements SHOULD be based on:

```text
risk
regulation
blast radius
reversibility
```

rather than organization hierarchy alone.

---

# 251. Separation of Duties

High-risk systems MAY require:

```text
author
reviewer
deployer/approver
```

to be distinct roles.

---

# 252. Automated Policy

Where possible, encode approval/deployment requirements as executable repository/environment policy.

---

# 253. Manual Checklist Fragility

Do not rely solely on:

```text
remember to run test
remember to check migration
```

when automation can enforce it.

---

# 254. Release Evidence

High-assurance systems SHOULD preserve release evidence such as:

```text
PR approvals
test results
artifact digest
provenance
SBOM
deployment record
```

according to governance needs.

---

# 255. Artifact Provenance Policy

For critical released software, provenance policy SHOULD verify expected:

```text
source repository
source revision
builder
workflow
artifact digest
```

before deployment/distribution.

---

# 256. Source Provenance

Where supply-chain maturity warrants it, source change provenance SHOULD also demonstrate approved change-management practices.

---

# 257. Trusted Builder

Production artifacts SHOULD originate from approved CI builders.

Developer laptops MUST NOT normally produce official production release artifacts.

---

# 258. Developer-Signed Builds

Local developer builds MAY be useful for testing.

They are not official artifacts unless the release process explicitly establishes equivalent trust.

---

# 259. Build Attestation Boundary

Provenance should be created by or strongly bound to the trusted build platform—not simply generated later by an arbitrary release script.

---

# 260. Artifact Verification at Deployment

High-assurance deployment systems MAY enforce:

```text
only trusted signed/attested artifacts
```

through registry or admission policy.

---

# 261. SBOM Verification

Security tooling MAY use SBOMs to identify affected released artifacts when vulnerabilities are disclosed.

---

# 262. Provenance Retention

Provenance and release metadata SHOULD remain available for the supported lifetime of the corresponding artifact.

---

# 263. Release Integrity

Consumers/operators SHOULD be able to verify that a downloaded/deployed artifact has not been modified after build.

---

# 264. CI/CD Audit Log

The delivery platform SHOULD record:

```text
actor
workflow
source revision
artifact
environment
deployment
result
time
```

---

# 265. Deployment Identity

A production deployment MUST be attributable to:

```text
automated workflow
or
specific authorized human action
```

---

# 266. Shared Deployment Accounts

Shared human deployment credentials are prohibited.

---

# 267. Deployment Secrets

Prefer workload identity/federation over stored cloud deployment keys.

---

# 268. Production Environment Protection

Production deployment environments SHOULD enforce:

```text
allowed branches
required approval where applicable
protected secrets
```

---

# 269. Deployment API Permissions

CI deployment identity SHOULD have only the permissions required to deploy its owned service.

---

# 270. Cross-Service Deployment Credential

Avoid one credential able to deploy the entire company.

---

# 271. Infrastructure Deployment

Infrastructure changes SHOULD flow through:

```text
IaC
plan
review
apply
verification
```

where appropriate.

---

# 272. Infrastructure Plan

Review the planned difference before applying high-impact infrastructure changes.

---

# 273. Destructive Infrastructure Changes

Destructive changes SHOULD require explicit identification.

---

# 274. State Management

IaC state is sensitive operational data and requires appropriate:

```text
access
locking
backup
```

---

# 275. Infrastructure Drift

Manual changes SHOULD be detected and reconciled.

---

# 276. Secret Rotation Deployment

Secret rotation should support staged overlap when required to avoid downtime.

---

# 277. Certificate Deployment

Certificates/keys with expiry SHOULD be renewed through automated or strongly controlled processes.

---

# 278. Scheduled Jobs During Deployment

Ensure migrations/deployments do not cause duplicate:

```text
cron
scheduler
worker
```

execution unexpectedly.

---

# 279. Leader-Elected Jobs

Singleton scheduled work SHOULD use appropriate coordination if multiple application versions can run concurrently.

---

# 280. Queue Consumer Compatibility

Old and new workers may consume the same queue during rolling deployment.

Message contracts must remain compatible.

---

# 281. Cache Compatibility

Changes to cached serialized formats require rollout planning.

---

# 282. Cache Versioning

Use cache-key/schema versioning where incompatible formats cannot coexist safely.

---

# 283. Stateful Services

Stateful service deployments require more deliberate:

```text
replication
quorum
migration
drain
```

procedures than stateless applications.

---

# 284. Graceful Shutdown

Deployments SHOULD allow running instances to:

```text
stop receiving work
complete/cancel in-flight work
release resources
```

within bounded time.

---

# 285. Connection Draining

Load balancers/orchestrators SHOULD drain connections appropriately before termination.

---

# 286. Worker Draining

Background workers should stop accepting new work before shutdown where job semantics require it.

---

# 287. Readiness Before Traffic

New instances MUST NOT receive production traffic before readiness checks pass.

---

# 288. Liveness During Deployment

Liveness checks MUST NOT create restart loops merely because an optional dependency is degraded.

---

# 289. Startup Migration Dependency

Readiness should reflect schema compatibility when the application requires a particular migration state.

---

# 290. Deployment Capacity

Rolling/canary deployments need enough capacity to run:

```text
old
+
new
```

instances simultaneously where required.

---

# 291. Surge Capacity

Deployment settings SHOULD prevent rollout from exhausting:

```text
CPU
memory
DB connections
```

---

# 292. Rollout Rate

Do not replace 100% of a critical fleet instantly without a reason.

---

# 293. Dependency Compatibility

A deployment changing dependency behavior SHOULD consider whether external providers can tolerate rollout volume or altered traffic.

---

# 294. Production Configuration Validation

Config MUST be validated before the new artifact becomes ready.

---

# 295. Missing Secret

A deployment with a missing required secret MUST fail safely before receiving traffic.

---

# 296. Release Health Metrics

Delivery systems SHOULD collect:

```text
deployment success rate
deployment duration
rollback rate
failed release rate
```

where useful.

---

# 297. Delivery Performance Metrics

Organizations MAY additionally track:

```text
lead time
deployment frequency
change failure rate
recovery time
```

as process-health signals.

They should be used diagnostically rather than as simplistic individual performance targets.

---

# 298. Deployment Frequency Is Not a Goal Alone

More deployments are valuable only when:

```text
small
safe
useful
```

changes can reach users reliably.

---

# 299. Failed Deployment Learning

A deployment failure SHOULD produce:

```text
fix
automation improvement
missing test
missing validation
```

where applicable.

---

# 300. Pipeline Incident

A compromised or unreliable CI/CD pipeline is a security/production incident.

---

# 301. CI/CD Recovery

The organization SHOULD be able to:

```text
disable deployments
revoke CI identities
rotate deployment credentials
rebuild trusted runners
verify artifacts
```

after pipeline compromise.

---

# 302. Provenance After Incident

Artifact provenance helps determine which releases originated from affected builders/workflows.

---

# 303. CI/CD Backup

Critical pipeline definitions already belong in version control.

External critical configuration still requires recoverable infrastructure configuration.

---

# 304. CI Platform Outage

The organization SHOULD define what happens when the CI/CD provider is unavailable.

Usually:

```text
no new release
existing production continues
```

rather than bypassing controls immediately.

---

# 305. Manual Deployment During CI Outage

Manual production deployment during CI outage SHOULD require a true emergency process.

---

# 306. CI/CD Vendor Review

CI/CD platforms are high-trust third-party dependencies and require:

```text
security
identity
data
access
```

review.

---

# 307. CI Organization Access

Use:

```text
SSO
MFA
RBAC
least privilege
```

for CI/repository administration.

---

# 308. Administrator Count

Keep repository/CI organization administrators limited.

---

# 309. Branch Protection Administration

Ability to bypass branch protection is high privilege.

---

# 310. Bypass Audit

Bypassing required checks/approvals SHOULD be:

```text
rare
audited
reviewed
```

---

# 311. Pipeline Testing

Pipeline logic SHOULD be tested where practical.

---

# 312. Reusable Workflows

Shared CI workflows SHOULD follow Reusability & Libraries Guidelines.

---

# 313. Reusable Workflow Versioning

Changes to shared deployment workflows can affect many repositories.

Use controlled versioning/promotion.

---

# 314. Central Paved Road

Organizations SHOULD provide a canonical delivery path covering:

```text
build
test
security
provenance
deployment
```

so teams do not independently reinvent risky pipelines.

---

# 315. Escape Hatch

Teams MAY deviate when the canonical path cannot support a justified workload.

Deviation requires documented ownership and compensating controls.

---

# 316. Pipeline Duplication

Avoid copying large workflow YAML between dozens of repositories.

Use governed reusable workflows/actions where appropriate.

---

# 317. Reusable Workflow Security

Shared workflows with production permissions are security-critical code.

---

# 318. Pipeline Dependency Direction

Product pipelines SHOULD consume stable platform delivery primitives rather than modifying platform internals.

---

# 319. CI/CD Documentation

Every service SHOULD document:

```text
how CI runs
how release works
how production deploy works
migration behavior
rollback/recovery
```

---

# 320. Deployment Runbook

Critical services SHOULD have an operational deployment/recovery runbook.

---

# 321. New Engineer Workflow

An engineer should not require undocumented tribal knowledge to:

```text
create PR
interpret CI
build
deploy to allowed environment
```

---

# 322. Production Deployment Checklist

```text
□ Correct artifact identified
□ Source revision reviewed
□ Required CI passed
□ Artifact provenance trusted
□ Configuration valid
□ Migration reviewed
□ Backward compatibility confirmed
□ Rollout strategy appropriate
□ Monitoring available
□ Rollback/recovery known
□ Production environment confirmed
```

---

# 323. Pull Request Checklist

```text
□ Change focused
□ Purpose documented
□ Tests updated
□ Security impact considered
□ Data migration considered
□ Config changes documented
□ Feature flags documented
□ Observability updated
□ Backward compatibility reviewed
□ Rollback implications considered
```

---

# 324. CI Pipeline Checklist

```text
□ Clean checkout
□ Toolchain pinned
□ Lockfile honored
□ Static checks
□ Tests
□ Production build
□ Security checks
□ No production secrets in untrusted jobs
□ Artifact identity generated
□ Failure artifacts retained safely
```

---

# 325. Artifact Checklist

```text
□ Immutable
□ Unique version/digest
□ Source revision known
□ Builder known
□ Build workflow known
□ SBOM generated where required
□ Provenance/attestation generated where required
□ Stored in approved registry
□ Integrity verifiable
```

---

# 326. Preview Checklist

```text
□ Non-production credentials
□ No production customer data
□ Isolated hostname
□ Safe external providers
□ Safe email/SMS/payment behavior
□ Access appropriate
□ Expiry/cleanup automatic
□ No privileged production secret exposure
```

---

# 327. Migration Checklist

```text
□ Version controlled
□ Tested
□ Runtime estimated
□ Locking evaluated
□ Rolling compatibility considered
□ Expand/contract used where needed
□ Backfill restartable
□ Data-loss risk reviewed
□ Failure path known
□ Recovery strategy known
```

---

# 328. Canary Checklist

```text
□ Canary population defined
□ Baseline available
□ Error metric
□ Latency metric
□ Business metric
□ Minimum useful sample
□ Promotion threshold
□ Abort threshold
□ Rollback/disable path
```

---

# 329. Blue-Green Checklist

```text
□ Both environments production-capable
□ Traffic switch tested
□ DB compatibility
□ Queue/worker behavior
□ Config parity
□ Old environment rollback readiness
□ Cleanup plan
```

---

# 330. Rollback Checklist

```text
□ Previous artifact available
□ Database compatibility known
□ Cache compatibility known
□ Queue/event compatibility known
□ Config compatibility known
□ External side effects considered
□ Recovery verification defined
```

---

# 331. Supply-Chain Checklist

```text
□ Trusted builder
□ Least-privilege CI token
□ Third-party workflow dependencies pinned
□ Dependency integrity checked
□ Production artifact immutable
□ SBOM where required
□ Provenance generated where required
□ Provenance verification policy
□ Release artifact stored securely
□ Deployment accepts only authorized artifacts where required
```

---

# 332. Emergency Deployment Checklist

```text
□ Incident/urgent reason
□ Named authorized actor
□ Minimum qualified review
□ Essential CI executed
□ Artifact identifiable
□ Production scope understood
□ Rollback/mitigation ready
□ Change audited
□ Post-event review scheduled
□ Standard pipeline restored afterward
```

---

# 333. Definition of Done — Pull Request

A production-code PR is complete when:

```text
✓ Purpose is understandable
✓ Required reviewers approved
✓ Required checks pass
✓ Tests reflect behavior
✓ Security implications addressed
✓ Data/config changes addressed
✓ No unresolved critical review comments
✓ Merge revision is verified
```

---

# 334. Definition of Done — Build

A production build is complete when:

```text
✓ Clean trusted builder used
✓ Declared inputs used
✓ Dependencies locked
✓ Build succeeds deterministically enough for policy
✓ Artifact immutable
✓ Artifact digest/version recorded
✓ SBOM/provenance produced where required
✓ Artifact uploaded to approved registry
```

---

# 335. Definition of Done — Production Deployment

A production deployment is complete when:

```text
✓ Approved artifact deployed
✓ Correct configuration applied
✓ Required migration succeeded
✓ New instances ready
✓ Critical smoke checks pass
✓ Error/latency signals healthy
✓ User-critical outcomes healthy
✓ Deployment metadata recorded
✓ Rollback/recovery remains available
```

---

# 336. Definition of Done — Release

A release is complete when:

```text
✓ Source revision identifiable
✓ Reviews complete
✓ CI complete
✓ Artifact immutable
✓ Provenance available where required
✓ Release metadata/version assigned
✓ Deployment state known
✓ Applicable notes/changelog published
```

---

# 337. CI/CD Anti-Patterns

Avoid:

```text
developer pushes directly to main
```

Avoid:

```text
main routinely red
```

Avoid:

```text
month-long feature branches
```

Avoid:

```text
5000-line PR combining refactor + feature + migration
```

Avoid:

```text
required review only by PR author
```

Avoid:

```text
CI passed on old commit
then merge different unverified commit
```

Avoid:

```text
build on laptop
upload to production
```

Avoid:

```text
git pull on production server
```

Avoid:

```text
rebuild production separately after staging test
```

Avoid:

```text
latest container tag as release identity
```

Avoid:

```text
production secrets available to every CI job
```

Avoid:

```text
untrusted fork PR executes with cloud deploy credentials
```

Avoid:

```text
third-party workflow action @main
```

for a privileged build path.

Avoid:

```text
security scanner fails
→ continue-on-error forever
```

Avoid:

```text
preview uses production DB
```

Avoid:

```text
staging sends real customer emails
```

Avoid:

```text
migration manually run from developer laptop
```

Avoid:

```text
destructive DB migration + application change in one incompatible step
```

Avoid:

```text
large backfill inside request-serving deployment transaction
```

Avoid:

```text
deploy all instances simultaneously
```

without deliberate reason.

Avoid:

```text
canary = 1 request succeeded
```

Avoid:

```text
blue-green means DB changes are automatically safe
```

Avoid:

```text
rollback = restore yesterday's DB backup
```

as ordinary release procedure.

Avoid:

```text
feature flag = permission check
```

Avoid:

```text
manual production approval with no context
```

Avoid:

```text
emergency pipeline used because normal pipeline is slow
```

Avoid:

```text
sign artifact
but never verify signature/provenance
```

Avoid:

```text
SBOM generated from source
but released binary differs
```

Avoid:

```text
pipeline YAML changed
without security review
```

Avoid:

```text
one deployment credential can modify every production service
```

---

# 338. AI CI/CD Rules

AI coding agents MUST inspect existing:

```text
branch policy
CI workflows
release process
deployment strategy
migration mechanism
artifact registry
```

before changing delivery infrastructure.

---

# 339. AI Pipeline Rule

AI MUST NOT invent a parallel deployment pipeline if a canonical pipeline already exists.

---

# 340. AI Branch Rule

AI SHOULD assume short-lived PR-based development unless repository policy states otherwise.

---

# 341. AI Main-Branch Rule

AI MUST NOT suggest bypassing branch protection merely to merge faster.

---

# 342. AI CI Rule

AI-generated changes SHOULD update relevant:

```text
tests
build configuration
pipeline checks
```

when required by the feature.

---

# 343. AI Secret Rule

AI MUST NOT expose production secrets to:

```text
PR jobs
fork jobs
logs
artifacts
```

---

# 344. AI OIDC Rule

When cloud platforms support workload federation, AI SHOULD prefer short-lived CI identity over static deployment credentials.

---

# 345. AI Third-Party Action Rule

AI SHOULD pin privileged third-party workflow dependencies to immutable trusted versions.

---

# 346. AI Build-Once Rule

AI SHOULD preserve:

```text
build once
promote same artifact
```

architecture.

---

# 347. AI Artifact Rule

AI MUST NOT deploy a mutable `latest` reference as the sole production artifact identity.

---

# 348. AI Migration Rule

AI-generated migrations MUST consider:

```text
rolling compatibility
locking
backfill
rollback/forward fix
```

before inclusion in deployment automation.

---

# 349. AI Backfill Rule

AI MUST NOT place massive data backfills directly into ordinary startup/deployment paths without a deliberate execution model.

---

# 350. AI Preview Rule

AI-generated preview workflows MUST NOT use production:

```text
database
credentials
payments
customer notifications
```

by default.

---

# 351. AI Rollback Rule

AI MUST NOT claim rollback is safe without checking:

```text
database
events
cache
external side effects
```

compatibility.

---

# 352. AI Canary Rule

If proposing canary deployment, AI MUST define:

```text
population
health signals
promotion criteria
abort criteria
```

---

# 353. AI Blue-Green Rule

If proposing blue-green, AI MUST consider:

```text
stateful dependencies
workers
database compatibility
cost
```

---

# 354. AI Approval Rule

AI SHOULD NOT add manual approval gates unless human judgment meaningfully reduces risk.

---

# 355. AI Emergency Rule

AI MUST NOT normalize bypassing CI because a change is urgent.

Use the canonical emergency process.

---

# 356. AI Provenance Rule

For released software, AI SHOULD preserve or improve artifact provenance and attestation rather than stripping it for pipeline simplicity.

---

# 357. AI Supply-Chain Rule

AI SHOULD treat:

```text
CI plugins
actions
base images
package managers
build containers
```

as dependencies subject to supply-chain governance.

---

# 358. AI Deployment Verification Rule

AI-generated deployment workflows SHOULD verify application health after rollout rather than ending at:

```text
deploy command exited 0
```

---

# 359. AI Observability Rule

Deployment/release identity SHOULD remain visible in production observability.

---

# 360. AI Gold Rule

When uncertain:

```text
Small reviewed change
>
Automated verified integration
>
Immutable trusted artifact
>
Progressive controlled deployment
>
Observable verification
>
Reversible recovery
>
Manual heroics
```

---

# 361. Golden CI/CD Rules

**1. The default branch remains protected and releasable.**

**2. Production changes normally flow through reviewed pull requests.**

**3. Prefer short-lived branches and frequent integration.**

**4. Long-lived release branches exist only when the product/support model requires them.**

**5. Required CI checks are enforced technically.**

**6. CI verifies the revision actually being merged.**

**7. A broken default branch is repaired promptly.**

**8. Pipeline definitions are production code.**

**9. Pipeline privileges follow least privilege.**

**10. Untrusted PR code never receives production credentials.**

**11. Prefer short-lived workload identity over static CI cloud keys.**

**12. Dependencies and build tools are pinned sufficiently for reproducibility.**

**13. Production builds originate from trusted builders.**

**14. Build once and promote the same artifact.**

**15. Production artifacts are immutable and content-identifiable.**

**16. Mutable tags are not artifact identity.**

**17. Released artifacts have traceable source and build metadata.**

**18. Critical releases produce SBOM/provenance where required.**

**19. Provenance is verified, not merely generated.**

**20. Preview environments remain isolated from production.**

**21. Non-production cannot accidentally contact, charge, or mutate real customers.**

**22. Database migrations are version-controlled deployment changes.**

**23. Rolling deployments require backward-compatible schema/contracts.**

**24. Use expand/contract for incompatible schema evolution.**

**25. Large backfills are restartable background operations.**

**26. Production deployment is automated and repeatable.**

**27. Human approvals exist only where they materially reduce risk.**

**28. Prefer small frequent releases over large batches where possible.**

**29. Progressive delivery limits blast radius for high-risk changes.**

**30. Canary promotion depends on measurable health, not elapsed time alone.**

**31. Blue-green does not eliminate database compatibility requirements.**

**32. Deployment success includes post-deployment verification.**

**33. Technical health and critical user outcomes are both observed.**

**34. Every release has a recovery strategy.**

**35. Rollback is not assumed safe when data/contracts changed.**

**36. Forward fixes and feature disablement are valid recovery tools.**

**37. Emergency delivery remains traceable, reviewed, and auditable.**

**38. Production deployment identities are individually attributable.**

**39. Deployment and configuration changes appear in observability.**

**40. If production cannot be rebuilt and redeployed through declared automation, the delivery system is incomplete.**

---

# 362. Canonical CI/CD Standard

The organizational standard is:

> **Software changes integrate through protected source-control workflows built around small, reviewable, short-lived changes. The default branch remains releasable, required checks are automatically enforced, privileged changes receive qualified ownership review, and CI verifies the exact revision entering the trusted branch. Pipeline definitions, shared workflows, infrastructure definitions, and deployment policy are treated as production code rather than administrative scripting.**

> **Builds execute on trusted, controlled infrastructure from explicit source, dependency, toolchain, and configuration inputs. Production artifacts are immutable, uniquely identifiable, stored in approved registries, and promoted across environments rather than rebuilt independently. Critical released artifacts provide appropriate SBOM and cryptographically verifiable provenance linking the artifact to its source revision, builder, and build process, with verification enforced where the application's supply-chain risk warrants it.**

> **Production and preview deployment paths use environment-specific least-privilege identity and do not expose privileged secrets to untrusted pull requests or ordinary build jobs. Short-lived federated workload identity is preferred to long-lived deployment credentials where supported. Third-party CI actions, build containers, plugins, and package tooling are treated as dependencies and governed accordingly.**

> **Database schema and data migrations are part of the deployment architecture. Migrations are version-controlled, tested, reviewed for runtime and locking risk, and compatible with rolling deployments. Expand/contract migration is preferred for schema changes requiring coexistence, while large backfills execute as observable, bounded, restartable operations rather than monolithic startup or deployment work.**

> **Deployment is automated, repeatable, observable, and reversible through an appropriate recovery strategy. Small low-risk changes may deploy directly after automated policy gates, while higher-risk releases may use canary, regional, percentage, blue-green, or feature-based progressive delivery. Promotion and abort decisions rely on explicit technical and user-outcome signals. Production deployment is not complete until the intended artifact is running, critical smoke tests pass, service health remains acceptable, and deployment identity is visible through operational telemetry.**

> **Emergency delivery exists for genuine urgent incidents but does not remove traceability, minimum qualified review, artifact integrity, verification, or accountability. Manual bypasses are exceptional, audited, reconciled afterward, and never allowed to become the normal release path.**

A production-grade CI/CD system should make it easy to answer:

```text
Which commit is running?
Which PR introduced it?
Who reviewed it?
Which checks passed?
Which trusted builder created it?
What exact artifact digest is deployed?
Can we verify its provenance?
Which dependencies/SBOM belong to it?
Which configuration revision is active?
Which migration version is active?
Did the same artifact run in staging?
How was production approval determined?
Was rollout immediate or progressive?
What health criteria permit promotion?
What automatically stops a bad rollout?
Can we disable the feature without redeploying?
Can we safely roll back the binary?
Is the database compatible with rollback?
What happens if CI is compromised?
Who deployed this release?
Can we rebuild the environment and redeploy through automation?
```

If those questions cannot be answered reliably, the software-delivery system is not yet production-grade.

As of the current check, **SLSA v1.2 is the current approved SLSA specification**, and its provenance model is explicitly designed to establish where, when, how, and by which builder an artifact was produced. citeturn862469search2turn862469search3 GitHub’s current artifact-attestation implementation is one example: it creates signed build-provenance claims and can attach SBOM attestations, while correctly warning that provenance must actually be **verified** and does not itself prove that software is vulnerability-free. citeturn862469search0turn862469search10

For secure SDLC governance, **NIST SSDF 1.1 remains the final version**; NIST published SSDF 1.2 as an Initial Public Draft in December 2025, so I would not yet treat 1.2 as the finalized mandatory baseline. citeturn862469search1turn862469search9turn862469search13

Within your master hierarchy, this belongs after **Git & Repository** and before **Infrastructure & Deployment**:

**… → Privacy & Data Governance → Configuration & Environments → Dependencies → Git & Repository → CI/CD → Infrastructure & Deployment → Backup & Disaster Recovery → Feature Flags / Releases & Versioning → Documentation → Governance.**
