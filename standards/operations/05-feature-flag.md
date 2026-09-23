---
id: "feature-flag"
title: "Feature Flag Guidelines — Gold Standard 2026"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["operations", "feature", "flag"]
applies_to: ["infra"]
related: ["architecture", "analytics", "privacy-data-governance", "dependency", "governance"]
legacy_number: 29
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 68373
provenance: baseline

---

Feature-flag standards below are vendor-neutral. For the current technical baseline, OpenFeature’s specification formalizes typed evaluation, targeting context, hooks, and default values, while current Unleash guidance confirms deterministic “stickiness” for percentage rollouts and LaunchDarkly explicitly treats temporary-flag cleanup as lifecycle management rather than optional housekeeping. citeturn113572search2turn113572search0turn113572search1

# Feature Flag Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- feature flags;
- release flags;
- progressive rollout;
- percentage rollout;
- experiments;
- A/B tests;
- multivariate flags;
- operational flags;
- kill switches;
- migration flags;
- sunset flags;
- long-lived product configuration;
- tenant targeting;
- cohort targeting;
- internal-user targeting;
- flag naming;
- flag ownership;
- evaluation context;
- fallback behavior;
- observability;
- stale flags;
- cleanup;
- security limitations;
- flag-provider failure;
- flag debt.

The objectives are:

```text
Safe releases
Controlled blast radius
Fast rollback
Deterministic behavior
Observable rollout
Clear ownership
Minimal flag debt
No security bypass
```

The core principle is:

> **A feature flag is a controlled decision point in software behavior—not a substitute for architecture, authorization, configuration management, or permanent business rules.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless documented justification exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
Flag
Risk
Owner
Affected environments
Expiry/review date
```

---

# 3. What a Feature Flag Is

A feature flag selects between approved application behaviors at runtime or deployment time.

Conceptually:

```text
Context
+
Flag configuration
↓
Evaluation
↓
Variation
```

Example:

```text
projects.new_editor
→ true
```

or:

```text
checkout.flow
→ "legacy" | "new"
```

---

# 4. What a Feature Flag Is Not

Feature flags MUST NOT become the default mechanism for:

```text
Authentication
Authorization
Entitlements
Secrets
Environment configuration
Long-term domain state
Database truth
User preferences
```

unless the relevant dedicated system explicitly integrates with the flag system.

---

# 5. Flag Taxonomy

Every flag MUST have a declared type.

Canonical types are:

```text
Release
Experiment
Operational
Kill switch
Migration
Sunset
Long-lived product configuration
```

Permission/entitlement decisions remain a separate authorization concern.

---

# 6. Release Flag

A release flag gradually exposes newly deployed functionality.

Example:

```text
projects.new_editor
```

Lifecycle:

```text
Create
↓
Deploy hidden
↓
Internal rollout
↓
Progressive rollout
↓
100%
↓
Remove old path
↓
Delete flag
```

Release flags are temporary.

---

# 7. Experiment Flag

An experiment flag controls experimental variants for measurement.

Example:

```text
checkout.layout_experiment
```

It must have:

```text
Hypothesis
Variants
Population
Assignment unit
Primary metric
Guardrail metrics
Start
Stop rule
Owner
```

Experiment flags are normally temporary.

---

# 8. Operational Flag

An operational flag changes system behavior for operational reasons.

Examples:

```text
search.use_secondary_provider
recommendations.expensive_ranking_enabled
```

Operational flags MAY be longer-lived than release flags, but their purpose must remain explicit.

---

# 9. Kill Switch

A kill switch rapidly disables risky or nonessential functionality.

Example:

```text
payments.optional_fraud_enrichment_enabled
```

A kill switch SHOULD have:

```text
Safe disabled behavior
Known operator
Low evaluation dependency
Fast propagation
Runbook
```

---

# 10. Migration Flag

A migration flag controls transition between implementations.

Example:

```text
billing.invoice_engine
→ legacy | new
```

It is temporary unless both paths remain permanently supported.

---

# 11. Sunset Flag

A sunset flag helps remove an old behavior gradually.

Example:

```text
legacy_reports_enabled
```

Typical direction:

```text
100%
↓
selected tenants only
↓
0%
↓
remove implementation
↓
remove flag
```

---

# 12. Long-Lived Product Configuration

Some runtime switches may remain permanently because they represent genuine product configuration.

Examples:

```text
region-specific provider selection
operational safety control
permanent integration mode
```

Such controls SHOULD be distinguished from temporary release flags.

---

# 13. Entitlements Are Not Feature Flags

Commercial access such as:

```text
Pro plan
Enterprise plan
Purchased module
Contract entitlement
```

MUST have an authoritative entitlement model.

Bad:

```text
if flag("advanced_reporting"):
    allow()
```

Good:

```text
if authorization.canUseAdvancedReporting(user):
    ...
```

A feature flag MAY additionally control rollout of that entitled capability.

---

# 14. Authorization Is Not a Flag

Never use a feature flag as the sole enforcement mechanism for:

```text
admin access
tenant access
record access
privileged actions
```

Flags affect behavior.

Authorization decides permission.

---

# 15. Flag Before Code

The decision to create a flag SHOULD happen before implementation when rollout or rollback behavior matters.

Do not add flags mechanically to every line of code.

---

# 16. Flag Necessity Test

Before creating a flag ask:

```text
Do we need gradual rollout?
Do we need fast disablement?
Do we need experimentation?
Do we need temporary coexistence?
Do we need targeted exposure?
```

If not, a flag may add unnecessary complexity.

---

# 17. Not Every Feature Needs a Flag

A simple:

```text
copy update
small internal refactor
low-risk visual correction
```

may not justify a flag.

Use risk and operational value.

---

# 18. Smallest Useful Flag Boundary

Flag the smallest coherent behavior that may need independent:

```text
rollout
measurement
rollback
```

---

# 19. Avoid Micro-Flags

Do not create separate flags for every:

```text
button
field
function
CSS class
```

unless independently controllable behavior is genuinely needed.

---

# 20. Avoid Mega-Flags

One flag SHOULD NOT control an entire unrelated product area.

Bad:

```text
new_platform=true
```

controlling:

```text
checkout
search
billing
settings
notifications
```

---

# 21. One Flag, One Purpose

A flag SHOULD have one coherent operational meaning.

---

# 22. Naming Convention

Flag keys MUST follow one canonical naming convention.

Recommended:

```text
<domain>.<capability>
```

Examples:

```text
projects.new_editor
checkout.new_flow
search.secondary_provider
billing.invoice_engine
```

---

# 23. Flag Key Stability

Flag keys become runtime contracts.

Avoid casually renaming active flags.

---

# 24. Lowercase Naming

Flag keys SHOULD use lowercase.

---

# 25. Separator

Use one consistent separator.

Recommended:

```text
.
```

between conceptual scopes and:

```text
_
```

inside phrases.

Example:

```text
checkout.new_payment_flow
```

---

# 26. Avoid Names Based Only on Tickets

Bad:

```text
jira_4812
proj_992
```

Good:

```text
billing.new_tax_engine
```

Ticket IDs MAY appear in metadata.

---

# 27. Avoid Person Names

Bad:

```text
johns_new_checkout
```

Ownership changes.

Behavior should define the flag.

---

# 28. Avoid Ambiguous Names

Bad:

```text
new_ui
test
feature_x
enabled2
```

---

# 29. Avoid Environment in Flag Key

Do not create:

```text
staging_new_checkout
production_new_checkout
```

The flag should have environment-specific configuration instead.

---

# 30. Avoid Negative Naming

Prefer:

```text
checkout.new_flow_enabled
```

over:

```text
checkout.disable_old_flow
```

when practical.

Double negatives become dangerous.

---

# 31. Boolean Names

Boolean names SHOULD make `true` semantics obvious.

---

# 32. Variant Flag Names

A multivariate flag SHOULD describe the decision dimension.

Good:

```text
search.ranking_engine
→ legacy | ml_v2
```

Better than:

```text
search.use_new=true
```

when multiple implementations may coexist.

---

# 33. Immutable Flag Key

Once used widely, the flag key SHOULD remain stable until removal.

Descriptions and metadata can evolve.

---

# 34. Flag Description

Every flag MUST have a description explaining:

```text
What behavior it controls
Why it exists
Safe default
Expected lifecycle
```

---

# 35. Flag Metadata

Every flag SHOULD record:

```text
Key
Type
Owner
Created date
Purpose
Default
Temporary/permanent
Cleanup date
Related PR/issue
Runbook where applicable
```

---

# 36. Ownership

Every flag MUST have an accountable owner.

---

# 37. Prefer Team Ownership

Prefer:

```text
Checkout Team
```

over:

```text
Alice
```

for long-lived responsibility.

---

# 38. Owner Responsibilities

The owner is responsible for:

```text
Rollout
Monitoring
Experiment decision
Failure response
Cleanup
Documentation
```

---

# 39. Orphan Flags

Flags without active ownership are governance defects.

---

# 40. Ownership Change

If team ownership changes, flag ownership MUST be updated.

---

# 41. Temporary vs Permanent

Every flag MUST be classified as:

```text
Temporary
or
Permanent
```

at creation.

---

# 42. Temporary by Default

Release, experiment, migration, and sunset flags SHOULD default to temporary.

---

# 43. Permanent Flags Require Justification

A permanent flag SHOULD exist only when runtime control has lasting operational/product value.

---

# 44. Cleanup Date

Every temporary flag MUST have:

```text
cleanup_date
```

or an equivalent review deadline.

---

# 45. Cleanup Date Is Not Exact Removal Promise

It is a forcing function for lifecycle review.

At that date the owner must:

```text
Remove
Extend with reason
or
Reclassify
```

---

# 46. Short Cleanup Horizon

Release flags SHOULD normally have a relatively short cleanup horizon.

Avoid:

```text
cleanup_date = two years from now
```

for ordinary rollout flags.

---

# 47. Flag Lifecycle

Canonical temporary lifecycle:

```text
Proposed
↓
Created
↓
Active rollout
↓
Fully rolled out / experiment decided
↓
Code cleanup
↓
No evaluations
↓
Archived/deleted
```

---

# 48. Flag State vs Lifecycle State

Distinguish:

```text
Flag value
```

from:

```text
Flag lifecycle
```

A flag can be:

```text
true
```

while still being:

```text
temporary and awaiting cleanup
```

---

# 49. Flag Control Plane

The flag control plane stores:

```text
definitions
targeting rules
rollout percentages
metadata
```

---

# 50. Evaluation Plane

The evaluation path determines behavior during application execution.

Its availability and latency matter.

---

# 51. Evaluation Must Be Typed

Application code SHOULD evaluate flags through typed APIs such as:

```text
boolean
string
number
structured value
```

rather than loosely parsing arbitrary values.

---

# 52. Type Stability

Changing a flag from:

```text
boolean
```

to:

```text
string
```

while consumers still expect boolean is a breaking change.

---

# 53. Typed Wrapper

Organizations MAY provide a thin typed abstraction around the provider.

Example:

```text
flags.checkoutNewFlow(context)
```

---

# 54. Avoid Vendor Calls Everywhere

Application code SHOULD NOT be tightly coupled to vendor-specific SDK calls throughout the codebase if a narrow organizational abstraction materially improves:

```text
testing
provider replacement
policy
telemetry
```

---

# 55. Do Not Over-Wrap

A wrapper SHOULD enforce useful policy.

It should not merely rename every provider method.

---

# 56. Open Standards

Where ecosystem maturity supports it, vendor-neutral APIs such as OpenFeature MAY reduce application coupling to one control-plane provider.

---

# 57. Evaluation Context

Flag evaluation MAY use context such as:

```text
user ID
tenant ID
region
application
plan
device class
request cohort
```

when relevant.

---

# 58. Minimum Context

Pass only context required for evaluation.

Do not send the entire user object.

---

# 59. Stable Targeting Key

Percentage rollouts SHOULD use a stable targeting key.

Preferred examples:

```text
user_id
account_id
tenant_id
```

depending on rollout semantics.

---

# 60. Anonymous Users

Anonymous rollout MAY use:

```text
stable anonymous ID
session ID
```

depending on desired stickiness.

---

# 61. Random Per Request Is Usually Wrong

Bad:

```text
random() < 0.10
```

for user-facing rollout.

A user may alternate between implementations on every request.

---

# 62. Stickiness

A percentage rollout SHOULD generally be sticky.

Given the same:

```text
flag
targeting subject
rollout configuration
```

the subject should predictably remain in the same cohort.

---

# 63. Stable Cohort

When increasing rollout:

```text
10%
→
25%
→
50%
```

existing enabled subjects SHOULD generally remain enabled while new subjects are added.

---

# 64. Assignment Unit

Choose the assignment unit deliberately.

Possible units:

```text
User
Tenant
Organization
Device
Session
Request
Service instance
```

---

# 65. Tenant-Level Features

For collaborative/tenant products, rolling out by individual user MAY produce inconsistent shared behavior.

Use tenant/account-level assignment when feature semantics require consistency.

---

# 66. Migration Assignment

Migration flags SHOULD use an assignment unit that prevents one logical entity from alternating between old and new systems.

---

# 67. Cross-Service Consistency

When multiple services evaluate the same flag, they SHOULD use consistent:

```text
flag key
targeting key
context semantics
provider configuration
```

when consistent decisions are required.

---

# 68. Evaluation Centralization

For transactional workflows, the initiating service MAY evaluate the flag once and propagate the decision if multiple inconsistent evaluations would be dangerous.

---

# 69. Decision Snapshot

Long-running workflows SHOULD consider capturing:

```text
flag variation
flag version
evaluation reason
```

at workflow start.

---

# 70. Do Not Re-Evaluate Mid-Transaction Without Reason

Example:

```text
step 1 → legacy
step 2 → rollout changes
step 3 → new
```

can create inconsistent state.

---

# 71. Percentage Rollout

A percentage means:

```text
percentage of assignment units
```

not:

```text
percentage of requests
```

unless request-level randomization is explicitly intended.

---

# 72. Percentage Is Not Sampling Confidence

A 1% rollout is not automatically meaningful.

If 1% means:

```text
4 users
```

it may provide insufficient production signal.

---

# 73. Rollout Size Depends on Traffic

Progression should consider:

```text
sample volume
risk
workflow frequency
failure detection latency
```

---

# 74. Canonical Rollout Pattern

For meaningful production features, a rollout MAY resemble:

```text
Internal
↓
1%
↓
5%
↓
10%
↓
25%
↓
50%
↓
100%
```

This is an example, not a mandatory sequence.

---

# 75. Rollout Is Risk-Based

Low-risk functionality MAY use:

```text
10%
→
100%
```

High-risk functionality MAY require slower progression.

---

# 76. Internal Cohort

Internal users MAY receive early access when appropriate.

Internal testing does not replace external production monitoring.

---

# 77. Friendly Cohort

Selected beta customers MAY receive early exposure when:

```text
expectations
support
privacy
contract
```

permit it.

---

# 78. High-Risk Cohorts

Do not intentionally assign high-risk features to users simply because they are unlikely to complain.

Cohort selection must be legitimate.

---

# 79. Rollout Preconditions

Before increasing rollout verify:

```text
Error rate acceptable
Latency acceptable
Critical business metrics acceptable
Support signals acceptable
Security behavior acceptable
```

---

# 80. Promotion Criteria

Important rollouts SHOULD define promotion criteria before rollout begins.

---

# 81. Abort Criteria

Important rollouts SHOULD also define abort/rollback criteria.

---

# 82. Example

```text
Promote if:
5xx increase < threshold
p95 latency within budget
conversion guardrail unchanged

Abort if:
payment failures materially increase
data integrity alarm fires
```

---

# 83. Time Alone Is Insufficient

Bad:

```text
Wait 10 minutes
then go to 100%.
```

Time can be one criterion, but observed evidence matters.

---

# 84. Rollout Observation Window

Observation duration SHOULD account for:

```text
traffic
background processing
delayed side effects
business cycle
```

---

# 85. Rollback

A temporary release flag SHOULD provide a usable rollback path while the old implementation remains supported.

---

# 86. Rollback Means Behavior Rollback

Changing:

```text
100%
→
0%
```

must actually return users to a valid supported path.

---

# 87. Data Compatibility

Flags do not automatically make database changes reversible.

Before rollout, ensure old/new behavior can coexist with relevant:

```text
schema
events
data
cache
external side effects
```

---

# 88. One-Way Migrations

Some changes become irreversible after state transition.

A flag MUST NOT create false confidence that:

```text
toggle off
```

will fully recover.

---

# 89. Rollback Deadline

Once the old path is deleted:

```text
flag rollback capability ends
```

The flag should then be removed.

---

# 90. Deployment vs Release

Feature flags allow:

```text
Deploy code
≠
Release behavior
```

This separation can reduce deployment risk.

---

# 91. Do Not Keep Hidden Code Forever

Deploying disabled code indefinitely creates:

```text
dead code
untested path
security surface
maintenance debt
```

---

# 92. Kill Switch Design

A kill switch SHOULD disable a clearly bounded risky capability.

---

# 93. Kill Switch Naming

Prefer positive normal-state names when operators can understand the action clearly.

Example:

```text
recommendations.enabled
```

with:

```text
false = disabled
```

---

# 94. Kill Switch Safe State

The safe variation MUST be defined before production.

---

# 95. Kill Switch Must Be Tested

Operators should know that toggling the kill switch actually produces safe behavior.

---

# 96. Kill Switch Availability

A kill switch intended for emergencies SHOULD remain operable when the affected dependency is degraded.

---

# 97. Avoid Circular Dependency

Bad:

```text
Feature flag provider outage
↓
Need kill switch
↓
Cannot evaluate kill switch
```

Plan fallback behavior.

---

# 98. Kill Switch Propagation

Understand how long a kill-switch update takes to reach:

```text
applications
workers
edge nodes
mobile clients
```

---

# 99. Kill Switch Runbook

Critical kill switches SHOULD document:

```text
When to use
Who may use it
Expected impact
How to verify
How to restore
```

---

# 100. Kill Switch Authorization

Only authorized operators may modify critical operational flags.

---

# 101. Kill Switch Audit

Changes to critical kill switches MUST be auditable.

---

# 102. Experiment Definition

An experiment MUST begin with a defined hypothesis.

Bad:

```text
Let's try version B and see.
```

Better:

```text
We expect shorter checkout to increase completed purchases without increasing refund rate.
```

---

# 103. Experiment Variants

Experiment variants SHOULD be stable during the experiment unless the methodology explicitly accounts for changes.

---

# 104. Control Group

Experiments SHOULD normally include a valid control group.

---

# 105. Assignment Stability

Users SHOULD remain in the same experimental variant for the required experiment duration.

---

# 106. Exposure Event

Record experiment exposure when the user is actually exposed to the experimental behavior.

Do not assume:

```text
flag evaluated
```

always means:

```text
experience observed
```

---

# 107. Experiment Analytics

Experiment events follow Analytics Guidelines.

---

# 108. Experiment PII

Experiment targeting MUST follow Privacy & Data Governance Guidelines.

---

# 109. Experiment Segmentation

Do not use unnecessary sensitive personal characteristics for experimentation.

---

# 110. Experiment Security

Experiments MUST NOT intentionally place users into less secure authorization/security behavior.

---

# 111. Security Control Experiments

Security controls require dedicated review.

Do not A/B test:

```text
authorization
encryption
CSRF protection
MFA enforcement
```

on unsuspecting users merely as product experimentation.

---

# 112. Experiment Completion

At experiment completion:

```text
Decide winner/no-change
↓
Set final behavior
↓
Remove alternative code
↓
Remove experiment instrumentation
↓
Remove flag
```

---

# 113. Failed Experiment

If the control remains canonical:

```text
delete treatment
delete flag
```

Do not leave both paths dormant indefinitely.

---

# 114. Experiments Are Not Permanent Segmentation

If different variants become permanent product tiers, model that as:

```text
product configuration
entitlement
preference
```

as appropriate.

---

# 115. Targeting

Targeting rules MAY include:

```text
internal users
tenant
region
platform
application version
cohort
```

when necessary.

---

# 116. Targeting Simplicity

Prefer simple rules.

Bad:

```text
(A && !B) || (C && D && !E) || F
```

with undocumented interactions.

---

# 117. Rule Order

If provider rule ordering affects evaluation, the team MUST understand and document that behavior for critical flags.

---

# 118. Rule Conflicts

Avoid overlapping targeting rules whose precedence is difficult to predict.

---

# 119. Explicit Overrides

Individual overrides MAY be useful for:

```text
support
testing
beta access
incident mitigation
```

but should not become permanent invisible product configuration.

---

# 120. Override Expiry

Temporary user/tenant overrides SHOULD have an expiry/review date.

---

# 121. Support Overrides

Support staff MUST NOT receive unrestricted capability to alter arbitrary flags without authorization.

---

# 122. Tenant Overrides

Per-tenant override changes SHOULD be auditable when they materially alter product behavior.

---

# 123. Region Targeting

Region-based flags MAY assist controlled infrastructure rollout.

They MUST still respect residency and functional consistency requirements.

---

# 124. App-Version Targeting

Mobile/desktop clients MAY require version-based targeting because old binaries remain deployed.

---

# 125. Unsupported Client

Targeting rules SHOULD explicitly handle older unsupported clients when feature compatibility differs.

---

# 126. Server Evaluation

Security-sensitive or authoritative behavior SHOULD evaluate flags on trusted servers.

---

# 127. Client Evaluation

Client-side flags MAY control:

```text
presentation
progressive UI exposure
non-security UX
```

---

# 128. Client Flags Are Public

Assume users can inspect:

```text
flag keys
client evaluations
variations
```

depending on SDK architecture.

Do not place secrets in flag values.

---

# 129. Hidden UI Is Not Authorization

Bad:

```text
if !flag:
   hide admin button
```

without server authorization.

---

# 130. Client Manipulation

Even if the flag SDK is tamper-resistant, clients remain untrusted.

---

# 131. Server Must Enforce Security

Privileged actions always require normal:

```text
authentication
authorization
tenant checks
validation
```

independent of flag state.

---

# 132. Feature Flags and Entitlements

Correct sequence:

```text
User authorized/entitled?
↓ yes
Flag enables rollout?
↓ yes
Feature available
```

not the reverse.

---

# 133. Flag Provider Failure

Every flag evaluation MUST have defined failure behavior.

---

# 134. Default Value

Every evaluation SHOULD supply a safe default.

---

# 135. Default Is Architecture

A default is not an arbitrary fallback.

It determines behavior during:

```text
provider outage
initialization failure
network failure
bad configuration
```

---

# 136. Safe Default

The safe default depends on flag type.

Examples:

```text
New risky release
→ false

Optional expensive integration
→ false

Critical existing feature under permanent config
→ established known-safe value
```

---

# 137. Fail Closed vs Fail Open

Security-sensitive behavior SHOULD normally fail conservatively.

User experience flags may fail toward the stable known implementation.

---

# 138. Never Default to Privilege

Provider failure MUST NOT grant:

```text
admin access
premium entitlement
tenant access
```

---

# 139. Local Cache

Flag SDKs MAY cache flag state locally.

---

# 140. Last Known Good

Operational flags MAY use a last-known-good configuration when appropriate.

---

# 141. LKG Risk

For security-sensitive decisions:

```text
last known good
```

MUST NOT replace server authorization.

---

# 142. Provider Latency

Flag evaluation SHOULD NOT add an external network call to every request if the provider architecture supports:

```text
streaming
local evaluation
cache
relay
```

---

# 143. Hot Path

High-frequency flag evaluation must have bounded latency and resource cost.

---

# 144. Evaluation Failure

Flag evaluation failure SHOULD be observable without generating unbounded logs.

---

# 145. Initialization

Applications SHOULD define behavior before the flag provider is fully initialized.

---

# 146. Startup Blocking

Do not block application startup indefinitely waiting for the flag provider.

Use:

```text
bounded initialization
safe defaults
readiness behavior
```

---

# 147. Provider Outage

The application SHOULD continue operating safely when the flag service control plane is temporarily unavailable.

---

# 148. Control Plane vs Data Plane

A flag dashboard outage should not necessarily make every application request fail.

---

# 149. Flag Configuration Backup

Critical permanent operational configuration SHOULD have recoverability/export capability according to DR requirements.

---

# 150. Provider Lock-In

Flag evaluation SHOULD avoid unnecessary coupling to proprietary provider concepts where the benefits do not justify it.

---

# 151. Provider Migration

A provider migration MUST preserve:

```text
flag keys
types
defaults
targeting semantics
percentage assignment where required
```

or explicitly account for changes.

---

# 152. Cohort Stability During Migration

Changing hashing algorithms/providers can reshuffle percentage cohorts.

This may materially alter experiments or migrations.

---

# 153. Flag Environments

Flag systems MAY maintain environment-specific configuration such as:

```text
development
staging
production
```

---

# 154. Same Flag Key Across Environments

Use the same logical flag key across environments.

Avoid separate keys:

```text
new_checkout_staging
new_checkout_prod
```

---

# 155. Environment Values Differ

A release flag MAY be:

```text
development = 100%
staging = 100%
production = 5%
```

---

# 156. Production Controls

Production flag changes SHOULD have stronger access controls than development changes.

---

# 157. Environment Promotion

Where tooling supports it, important targeting/configuration changes MAY follow a reviewed promotion workflow.

---

# 158. Staging Validation

Flag behavior SHOULD be validated in pre-production before complex production targeting is applied.

---

# 159. Flag Change as Production Change

Changing a flag can alter production behavior without deploying code.

Therefore:

> **High-impact flag changes are production changes.**

---

# 160. Change Audit

Production flag changes MUST record:

```text
actor
time
flag
old state
new state
```

for meaningful controls.

---

# 161. Change Reason

High-risk flag changes SHOULD record:

```text
incident
release
experiment
ticket
```

context.

---

# 162. Approval

Critical flags MAY require:

```text
peer approval
operator role
change window
```

depending on risk.

---

# 163. Do Not Over-Bureaucratize

Routine 5%→10% rollout changes SHOULD NOT require unnecessary executive approval.

Controls should be proportional to risk.

---

# 164. Rollout Automation

Mature systems MAY automate progressive rollout.

---

# 165. Automated Promotion

Automatic rollout increases SHOULD require reliable guardrail metrics.

---

# 166. Automated Rollback

Automatic rollback MAY be appropriate when:

```text
failure signal is reliable
flag reversal is safe
impact severe enough
```

---

# 167. False Positive Risk

An unreliable alarm can cause automated flag oscillation.

Use hysteresis/cooldown where appropriate.

---

# 168. Flag Flapping

A critical flag SHOULD NOT repeatedly switch between states due to noisy automation.

---

# 169. Observability

Feature-flag evaluations and changes SHOULD be observable proportional to impact.

---

# 170. Evaluation Telemetry

Useful telemetry MAY include:

```text
flag key
variation
evaluation reason
application
environment
```

subject to volume/privacy constraints.

---

# 171. High Cardinality

Do not put individual user IDs into low-cardinality metrics systems merely for flag telemetry.

---

# 172. Logs

Do not log every flag evaluation indiscriminately in high-throughput services.

Use:

```text
metrics
sampling
tracing
experiment exposure events
```

appropriately.

---

# 173. Tracing

Important flags MAY appear as trace attributes when useful for debugging.

---

# 174. Error Investigation

When a flagged feature causes incidents, operators SHOULD be able to determine:

```text
which variation
which cohort
which rollout %
which flag revision
```

was active.

---

# 175. Deployment Correlation

Observability SHOULD make it possible to correlate:

```text
deployment
+
flag change
+
incident
```

---

# 176. Dashboard

High-impact rollouts SHOULD expose:

```text
rollout %
errors
latency
business guardrails
```

in one operational view where practical.

---

# 177. Exposure Metrics

Experiments require exposure counts separate from general flag evaluation counts where methodology requires.

---

# 178. Flag Health

Organizations SHOULD track flag health.

Useful indicators include:

```text
temporary flag age
time at 100%
time at 0%
last evaluation
last targeting change
owner
cleanup overdue
```

---

# 179. Stale Flag

A temporary flag is stale when evidence indicates it no longer performs active rollout/experiment/migration work and remains in code/configuration unnecessarily.

---

# 180. Staleness Is Policy-Defined

No universal number of days makes a flag stale.

Define thresholds appropriate to normal release cadence.

---

# 181. Example Staleness Conditions

A temporary flag MAY be stale if:

```text
100% on for extended period
0% off for extended period
No evaluations
No targeting changes
Experiment concluded
Migration completed
Cleanup date passed
```

---

# 182. Stale Does Not Mean Safe to Delete

Before deletion verify:

```text
No code references
No prerequisite relationship
No external automation dependency
No active environment usage
```

---

# 183. Flag Cleanup Workflow

Canonical cleanup:

```text
Determine final variation
↓
Make final behavior unconditional
↓
Delete losing branch
↓
Delete flag evaluation code
↓
Deploy
↓
Confirm no evaluations
↓
Archive/delete control-plane flag
```

---

# 184. Code First, Flag Later

For most providers, remove the flag from application code before deleting its control-plane definition.

This avoids unexpected fallback behavior in still-running versions.

---

# 185. Old Client Exception

Mobile/desktop clients may continue evaluating flags after server code has moved on.

Deletion timing MUST account for supported old-client versions.

---

# 186. Flag Reference Inventory

Organizations SHOULD be able to discover:

```text
where flag is referenced
which services
which clients
which environments
```

---

# 187. Static Analysis

Tooling SHOULD detect flag references automatically where practical.

---

# 188. No Evaluation Signal

A flag with no recent evaluations MAY be a cleanup candidate.

It is not automatically safe to delete.

---

# 189. Prerequisite Flags

Flags used as prerequisites for other flags require dependency-aware cleanup.

---

# 190. Flag Dependency Graph

Avoid complex chains such as:

```text
A requires B
B requires C
C requires !D
```

---

# 191. Flag Prerequisite Rule

Prerequisites SHOULD be rare and shallow.

---

# 192. Flag Interaction

Every additional active flag can multiply behavioral combinations.

Two boolean flags can create:

```text
4 states
```

Ten independent boolean flags can theoretically create:

```text
1024 states
```

Not all may be reachable, but complexity grows rapidly.

---

# 193. Avoid Flag Combinatorial Explosion

Do not create designs where correctness depends on many unrelated flag combinations.

---

# 194. Explicit State Machine

If several flags jointly encode one workflow state, replace them with an explicit modeled state where possible.

Bad:

```text
new_flow
new_flow_v2
migration_done
legacy_disabled
```

Potentially better:

```text
checkout_engine =
legacy | dual_write | new | legacy_retired
```

if these are truly one transition state.

---

# 195. Flag Branch Complexity

Flagged code SHOULD keep both paths understandable.

---

# 196. Avoid Nested Flags

Bad:

```text
if A:
    if B:
        if C:
```

unless the business behavior genuinely requires those independent dimensions.

---

# 197. Localize Flag Evaluation

Evaluate near the appropriate decision boundary.

Do not sprinkle the same flag through dozens of unrelated lines.

---

# 198. One Decision, One Evaluation

Where practical:

```text
variation = evaluateFlag()
```

then pass resulting behavior/state through the relevant operation.

---

# 199. Domain Isolation

Feature flags SHOULD select between implementations without leaking provider-specific concepts deep into domain logic.

---

# 200. Example

Prefer:

```text
engine = invoiceEngineSelector.select(context)
engine.generate(...)
```

over:

```text
if vendorFlagClient.getBoolean(...)
```

inside every domain method.

---

# 201. Database Writes

Flagged write paths require special caution.

---

# 202. Dual Write

Migration flags MAY control:

```text
old write
dual write
new write
```

but dual-write consistency must be deliberately designed.

---

# 203. Dual Write Is Not Automatically Safe

Failures may produce:

```text
old succeeded
new failed
```

or vice versa.

Follow Data and Architecture Guidelines.

---

# 204. Shadow Traffic

A new implementation MAY receive shadow traffic while results are ignored.

This can validate behavior without affecting user output.

---

# 205. Shadow Side Effects

Shadow execution MUST NOT accidentally perform real:

```text
payments
emails
writes
webhooks
```

unless explicitly designed.

---

# 206. Read Comparison

Migration flags MAY allow old/new systems to run in parallel and compare results.

Comparison must not introduce unacceptable latency.

---

# 207. State Transition

Do not switch users back and forth between incompatible stateful implementations.

---

# 208. Cache Compatibility

Flagged variants that use different cache schemas SHOULD use compatible/versioned keys.

---

# 209. Event Compatibility

Old and new paths may emit/consume different events.

Maintain compatibility during coexistence.

---

# 210. Database Compatibility

Flag-based rollout still requires expand/contract schema practices where relevant.

---

# 211. Feature Flag Testing

Both supported variations MUST be tested while both remain valid production paths.

---

# 212. Unit Tests

Test decision logic where it contains meaningful behavior.

---

# 213. Integration Tests

Test old and new integrations where rollout depends on external systems.

---

# 214. E2E Tests

Critical release flags SHOULD have at least representative E2E coverage of:

```text
off
on
```

while both states are supported.

---

# 215. Default-State Test

Test the fallback/default variation explicitly.

---

# 216. Provider-Failure Test

Critical flag usage SHOULD test provider unavailable/error behavior.

---

# 217. Targeting Tests

Complex targeting rules SHOULD be tested with representative contexts.

---

# 218. Cohort Determinism Test

Percentage rollouts SHOULD verify stable assignment when determinism matters.

---

# 219. Cross-Service Test

If multiple services must make identical decisions, test consistent evaluation context.

---

# 220. Experiment Test

Verify:

```text
assignment
exposure event
variant rendering
metrics
```

before starting an experiment.

---

# 221. Kill Switch Test

Critical kill switches SHOULD be exercised periodically or before major releases.

---

# 222. Cleanup Tests

After removing a flag:

```text
remove obsolete branch tests
keep tests for final behavior
```

---

# 223. Testing Flag Combinations

Do not exhaustively test impossible combinations.

Test:

```text
supported
high-risk
boundary
transition
```

states.

---

# 224. Configuration as Test Fixture

Tests SHOULD control flag values deterministically.

---

# 225. No Production Flag Provider in Unit Tests

Unit tests SHOULD NOT require live production flag infrastructure.

---

# 226. Test Provider

Use:

```text
in-memory provider
mock provider
fixture
```

for deterministic testing.

---

# 227. Security Limitations

Feature-flag systems are operational configuration platforms.

They MUST NOT be treated as a security boundary unless specifically designed, reviewed, and integrated into the authorization system.

---

# 228. Flag Data Is Often Visible

Do not store:

```text
password
API secret
private key
access token
```

as flag values.

---

# 229. Sensitive Targeting Data

Avoid sending sensitive personal data into the flag platform unnecessarily.

---

# 230. Email Targeting

Prefer opaque IDs/segments over raw email addresses when possible.

---

# 231. Flag Service as Processor

If a third-party provider receives user context, evaluate it under Privacy & Data Governance and Dependency Guidelines.

---

# 232. Tenant Isolation

A flag MUST NOT bypass tenant authorization.

Targeting:

```text
tenant_id = A
```

does not mean:

```text
user is authorized for tenant A
```

---

# 233. Flag Manipulation

Assume authorized flag administrators can materially alter application behavior.

Flag-control-plane access is privileged.

---

# 234. Flag IAM

Use least-privilege roles for:

```text
read
create
modify
delete
production modify
```

where provider supports them.

---

# 235. Production Write Access

Production flag modification SHOULD be restricted to engineers/operators who need it.

---

# 236. MFA / SSO

Flag-administration platforms SHOULD use organizational:

```text
SSO
MFA
```

for privileged access.

---

# 237. Shared Accounts

Shared feature-flag administrator accounts are prohibited.

---

# 238. Audit Log

Critical flag-control-plane operations SHOULD be captured in provider audit logs.

---

# 239. Webhook/API Credentials

Flag automation credentials are secrets and follow Secret Management Guidelines.

---

# 240. Automation Permissions

A rollout automation bot SHOULD be able to modify only the required flags/environments.

---

# 241. Flag Provider SDK Keys

Client-side SDK identifiers MUST be distinguished from privileged server/admin credentials.

---

# 242. No Admin Key in Browser

Privileged feature-flag administration keys MUST NEVER be exposed to browser/mobile applications.

---

# 243. Flag Change Incident Response

If the flag system is compromised:

```text
revoke credentials
freeze risky changes
audit recent modifications
restore trusted config
evaluate user impact
```

---

# 244. Flag Configuration Recovery

Critical permanent flags SHOULD be exportable/recoverable if provider configuration is lost.

---

# 245. Disaster Recovery

Feature flags needed for recovery/kill switches belong in Backup & Disaster Recovery dependency analysis.

---

# 246. Mobile Flags

Mobile clients create special lifecycle constraints because deployed binaries remain in the wild.

---

# 247. Old Mobile Versions

Before deleting a flag, know which supported app versions still evaluate it.

---

# 248. Default Mobile Behavior

Mobile clients MUST have safe baked defaults when offline or unable to reach the provider.

---

# 249. Mobile Cache

Cached flag state MAY improve offline continuity.

It must not become a security authority.

---

# 250. Client Upgrade Gates

Some new functionality may require:

```text
minimum app version
```

in addition to feature rollout.

---

# 251. Offline Applications

Offline-first clients need explicit flag-refresh and expiration semantics.

---

# 252. Flag Freshness

Long-cached dynamic operational flags can defeat emergency updates.

Balance:

```text
availability
freshness
```

based on flag purpose.

---

# 253. Server-Side Poll Interval

If provider updates propagate through polling, critical kill switches require an acceptable maximum propagation delay.

---

# 254. Flag TTL

Cached evaluations MAY have TTL appropriate to:

```text
release
experiment
operational emergency
```

use.

---

# 255. Scheduled Flag Changes

Time-based activation MAY be used for planned releases.

---

# 256. Time-Based Risk

Scheduled activation without operators/monitoring can release broken functionality automatically.

Use only when operationally justified.

---

# 257. Time Zones

Scheduled flag changes MUST use explicit timezone semantics.

Prefer UTC internally.

---

# 258. Expiring Targeting

Temporary targeting rules SHOULD support automatic expiration where practical.

---

# 259. Compliance Region

Region targeting must use a trusted region attribute.

Do not rely solely on client-supplied values for regulated processing decisions.

---

# 260. Flags and Configuration

Feature flags answer:

```text
Which approved behavior should run?
```

Configuration answers:

```text
How should this deployment operate?
```

Do not conflate them.

---

# 261. Long-Lived Config Migration

If a temporary flag becomes genuinely permanent operational configuration, migrate it into the canonical configuration model when appropriate.

---

# 262. Flags and User Preferences

User-selectable preferences SHOULD normally live in user state.

Do not create one global flag per preference.

---

# 263. Flags and Database State

A flag is not durable business state.

Do not infer:

```text
order processed by algorithm X
```

later solely from current flag value.

Persist important business decisions when historical meaning matters.

---

# 264. Decision Recording

If downstream interpretation depends on which algorithm/path executed, persist that decision with the domain record.

---

# 265. Flags and Jobs

Background jobs may be enqueued under one flag state and execute later under another.

---

# 266. Job Decision Snapshot

If semantics must remain stable, include the selected version/behavior in job data rather than re-evaluating later.

---

# 267. Flags and Events

Event payloads MAY need explicit:

```text
schema version
algorithm version
```

instead of relying on current flag state.

---

# 268. Flags and APIs

External API semantics SHOULD NOT change unpredictably according to hidden feature flags unless versioning/contract behavior explicitly supports it.

---

# 269. Contract Stability

A customer calling the same API should not receive incompatible contract shapes merely because rollout percentage changed.

---

# 270. Flags and Caching

Flag-dependent responses require cache keys that account for relevant variation.

---

# 271. CDN Risk

Do not cache one user's flagged response and serve it to a different cohort.

---

# 272. SSR / Hydration

Server/client flag decisions must remain consistent enough to prevent hydration mismatch or visible UI flicker.

---

# 273. Evaluation Location

Choose one authoritative evaluation location where feasible for SSR/browser experiences.

---

# 274. Client Bootstrap

Server-rendered applications MAY bootstrap approved evaluated flag values to the client.

Do not serialize private server configuration.

---

# 275. Flicker

Avoid:

```text
render old UI
↓
flag loads
↓
switch new UI
```

when it creates harmful layout or interaction changes.

---

# 276. Flag Performance

Flag evaluation SHOULD stay within application latency budgets.

---

# 277. Flag Count Performance

Do not evaluate hundreds of unrelated flags on every request without need.

---

# 278. Bulk Evaluation

Bulk evaluation MAY be appropriate when the provider efficiently supports it and the application genuinely needs multiple flags.

---

# 279. Evaluate Lazily

Evaluate flags only where behavior requires them.

---

# 280. Stale Flag Cost

A stale flag increases:

```text
branches
tests
cognitive load
possible states
provider clutter
incident ambiguity
```

---

# 281. Flag Debt Budget

Teams SHOULD maintain a low temporary-flag backlog.

---

# 282. Cleanup Sprint Is Not Ideal

Flag removal SHOULD happen continuously as part of feature completion rather than relying solely on periodic cleanup projects.

---

# 283. Cleanup Issue at Creation

Temporary flags SHOULD create or link a cleanup task when introduced.

---

# 284. Cleanup Trigger

Useful cleanup triggers include:

```text
rollout = 100%
experiment concluded
migration complete
old client unsupported
cleanup date reached
```

---

# 285. Cleanup Ownership Persists

The original feature work is not complete until temporary flag cleanup is done.

---

# 286. Flag Archive

Archiving MAY preserve history while removing active use.

---

# 287. Delete vs Archive

Use provider capabilities appropriately.

The critical requirement is that:

```text
dead flag no longer affects application behavior
```

---

# 288. Permanent Flag Review

Permanent flags SHOULD still receive periodic review.

Ask:

```text
Is runtime control still needed?
Is the owner valid?
Is default still correct?
```

---

# 289. Kill Switch Review

Kill switches SHOULD be tested/reviewed so operators do not discover during an incident that they no longer work.

---

# 290. Lifecycle Dashboard

The organization SHOULD expose:

```text
temporary flags
overdue flags
stale flags
ownerless flags
permanent flags
```

where tooling permits.

---

# 291. Flag Cleanup SLO

Organizations MAY define an internal cleanup target such as:

```text
temporary flags removed within N days after final rollout
```

based on release cadence.

No universal number is mandated.

---

# 292. Stale-Flag Alert

Owners SHOULD receive alerts when:

```text
cleanup date passed
no evaluations
fully rolled out too long
```

according to policy.

---

# 293. Automated Cleanup PR

Tooling MAY create code-cleanup PRs automatically if references can be analyzed safely.

---

# 294. Automated Flag Deletion

Automatic control-plane deletion SHOULD occur only after verifying code references and supported clients no longer depend on the flag.

---

# 295. Source Search

Before deletion search:

```text
application code
tests
mobile apps
workers
scripts
IaC
dashboards
automation
```

for references.

---

# 296. Observability Search

Historical dashboards/queries MAY reference flag keys.

Deletion SHOULD not unnecessarily destroy incident-analysis usefulness.

---

# 297. Documentation Cleanup

Remove obsolete flag references from:

```text
docs
runbooks
screenshots
support procedures
```

after retirement.

---

# 298. Analytics Cleanup

Experiment-specific analytics fields/events SHOULD be retired when no longer useful.

---

# 299. Database Cleanup

If a flag supported old/new schema coexistence, remove obsolete schema only after application cleanup and Data Guidelines permit it.

---

# 300. Flag Review Checklist

Before creating a flag:

```text
□ Why is a flag needed?
□ Type selected
□ Key follows naming convention
□ Owner assigned
□ Temporary/permanent classified
□ Safe default defined
□ Evaluation location defined
□ Assignment unit defined
□ Cleanup date defined
□ Security implications reviewed
□ Observability planned
```

---

# 301. Rollout Checklist

```text
□ Initial cohort defined
□ Sticky assignment
□ Promotion sequence
□ Technical guardrails
□ Business guardrails
□ Observation window
□ Abort threshold
□ Rollback safe
□ Data compatibility verified
□ Owner available
```

---

# 302. Experiment Checklist

```text
□ Hypothesis
□ Control
□ Variants
□ Assignment unit
□ Stable assignment
□ Exposure event
□ Primary metric
□ Guardrail metrics
□ PII review
□ Start/stop criteria
□ Decision owner
□ Cleanup plan
```

---

# 303. Kill Switch Checklist

```text
□ Failure scenario identified
□ Safe variation known
□ Fast propagation
□ Provider-outage behavior known
□ Authorized operators
□ Audit enabled
□ Runbook
□ Verification method
□ Periodic test
```

---

# 304. Security Checklist

```text
□ Flag is not authorization
□ Flag is not entitlement authority
□ No secrets in values
□ Client values considered public
□ Targeting data minimized
□ Tenant authorization independent
□ Admin access least-privileged
□ MFA/SSO
□ Audit trail
□ Provider credentials protected
```

---

# 305. Stale Flag Checklist

```text
□ Temporary?
□ Cleanup date passed?
□ Final variation known?
□ Rollout complete?
□ Experiment complete?
□ No active targeting?
□ No prerequisite dependency?
□ Code references inventoried?
□ Old clients checked?
□ Cleanup owner assigned?
```

---

# 306. Flag Removal Checklist

```text
□ Final behavior selected
□ Losing code path removed
□ Flag evaluation removed
□ Obsolete tests removed
□ Final behavior tests retained
□ Old clients considered
□ No references remain
□ Deploy verified
□ No evaluations remain
□ Flag archived/deleted
□ Documentation updated
```

---

# 307. Provider Migration Checklist

```text
□ Flag inventory
□ Types preserved
□ Defaults preserved
□ Context preserved
□ Targeting preserved
□ Percentage behavior evaluated
□ Cohort reshuffle considered
□ SDK migration
□ Audit/access model
□ Fallback behavior
□ Old provider retirement
```

---

# 308. Definition of Done — New Temporary Flag

A temporary flag is ready when:

```text
✓ Purpose documented
✓ Type selected
✓ Stable key
✓ Owner
✓ Safe default
✓ Targeting key
✓ Rollout plan
✓ Monitoring
✓ Security model
✓ Cleanup date
✓ Cleanup task
✓ Tests for supported states
```

---

# 309. Definition of Done — Progressive Release

A flagged release is complete only when:

```text
✓ 100% final behavior achieved
✓ Production guardrails healthy
✓ Final implementation selected
✓ Old implementation removed
✓ Flag references removed
✓ Obsolete tests removed
✓ Flag archived/deleted
```

Reaching 100% rollout alone is NOT completion.

---

# 310. Definition of Done — Experiment

```text
✓ Experiment completed
✓ Result interpreted
✓ Product decision recorded
✓ Final variation implemented
✓ Losing variants removed
✓ Experiment analytics cleaned up
✓ Flag removed
```

---

# 311. Definition of Done — Kill Switch

```text
✓ Safe state documented
✓ Operator ownership
✓ Access controlled
✓ Change audited
✓ Failure behavior tested
✓ Propagation understood
✓ Runbook exists
✓ Periodic verification exists
```

---

# 312. Feature Flag Anti-Patterns

Avoid:

```text
feature flag = authorization
```

Avoid:

```text
feature flag = subscription entitlement
```

Avoid:

```text
secret stored as flag value
```

Avoid:

```text
random percentage every request
```

Avoid:

```text
user changes variant every refresh
```

Avoid:

```text
1% rollout
with two active users
```

and assuming confidence.

Avoid:

```text
100% rollout
flag remains forever
```

Avoid:

```text
temporary flag
no owner
```

Avoid:

```text
temporary flag
no cleanup date
```

Avoid:

```text
flag owner = engineer who left company
```

Avoid:

```text
new_ui
new_ui2
new_ui_final
```

Avoid:

```text
prod_new_ui
staging_new_ui
```

Avoid:

```text
flag logic scattered through 40 files
```

Avoid:

```text
A && B && !C && D
```

without explicit state modeling.

Avoid:

```text
nested feature flags five levels deep
```

Avoid:

```text
delete control-plane flag first
```

while running code still evaluates it.

Avoid:

```text
roll back flag
```

after irreversible state migration and assume recovery.

Avoid:

```text
kill switch
```

that requires the failed service to function.

Avoid:

```text
experiment
```

with no hypothesis.

Avoid:

```text
experiment
```

with changing assignment every session.

Avoid:

```text
flag evaluated
```

treated automatically as experiment exposure.

Avoid:

```text
permission test
```

run only in client-side feature flag.

Avoid:

```text
tenant targeting
```

treated as tenant authorization.

Avoid:

```text
provider outage
→ privileged feature defaults on
```

Avoid:

```text
every request
→ remote network call to flag service
```

Avoid:

```text
permanent flag
```

used to avoid designing proper configuration.

Avoid:

```text
feature flag
```

used as durable business state.

Avoid:

```text
current flag value
```

used later to infer how a historical transaction was processed.

Avoid:

```text
mobile flag deleted
```

while supported old apps still evaluate it.

Avoid:

```text
flag dashboard
```

with hundreds of stale inactive entries.

Avoid:

```text
cleanup sprint once every two years
```

instead of continuous lifecycle management.

---

# 313. AI Feature Flag Rules

AI coding agents MUST determine whether a feature flag is actually required before creating one.

---

# 314. AI Classification Rule

Every AI-created flag MUST be classified as:

```text
Release
Experiment
Operational
Kill switch
Migration
Sunset
Permanent configuration
```

---

# 315. AI Naming Rule

AI MUST follow the repository's canonical naming convention.

If none exists, prefer:

```text
<domain>.<capability>
```

---

# 316. AI Ownership Rule

AI SHOULD surface the need for:

```text
owner
cleanup date
```

when introducing a temporary flag.

---

# 317. AI Default Rule

AI MUST define safe provider-failure behavior.

---

# 318. AI Security Rule

AI MUST NOT implement:

```text
authorization
tenant isolation
commercial entitlement
```

solely with a feature flag.

---

# 319. AI Client Rule

AI MUST treat client-side flag state as untrusted and inspectable.

---

# 320. AI Secrets Rule

AI MUST NOT place credentials/secrets into flag values or targeting context.

---

# 321. AI Context Rule

AI SHOULD pass only minimum required evaluation context.

---

# 322. AI Rollout Rule

AI SHOULD use deterministic sticky targeting for user/tenant percentage rollout unless random-per-request behavior is explicitly required.

---

# 323. AI Tenant Rule

AI MUST consider whether rollout should be:

```text
user-level
or
tenant-level
```

based on product consistency.

---

# 324. AI Migration Rule

AI MUST avoid routing one logical entity inconsistently between old/new stateful implementations.

---

# 325. AI Transaction Rule

AI SHOULD evaluate once or snapshot the decision when a transaction/workflow requires consistent behavior.

---

# 326. AI Job Rule

AI SHOULD persist behavior/version decision in long-running jobs when later re-evaluation could change semantics.

---

# 327. AI Data Rule

AI MUST NOT claim flag rollback is safe without checking:

```text
schema
data writes
events
cache
external side effects
```

---

# 328. AI Experiment Rule

AI MUST NOT create an experiment flag without defining:

```text
hypothesis
variants
assignment
measurement
cleanup
```

---

# 329. AI Kill Switch Rule

AI SHOULD define:

```text
safe state
failure path
operator
verification
```

for critical kill switches.

---

# 330. AI Provider Rule

AI SHOULD use the existing approved flag provider/abstraction.

It MUST NOT add another flag platform casually.

---

# 331. AI Test Rule

AI MUST add or preserve tests for all currently supported variations.

---

# 332. AI Cleanup Rule

When rollout reaches permanent final behavior, AI SHOULD remove:

```text
flag conditional
losing branch
obsolete tests
flag definition
```

rather than leaving permanent debt.

---

# 333. AI Existing-Flag Rule

Before creating a new flag, AI SHOULD search for an existing relevant flag.

---

# 334. AI Nested-Flag Rule

AI SHOULD avoid nested/compound flag logic and propose explicit state modeling when flags encode one transition.

---

# 335. AI Observability Rule

For high-impact rollouts, AI SHOULD ensure the chosen variation can be correlated with:

```text
errors
latency
business outcomes
```

---

# 336. AI Fallback Rule

AI MUST NOT default privileged/security-sensitive functionality to enabled merely to improve availability.

---

# 337. AI Mobile Rule

AI MUST check supported mobile/client versions before deleting flags used by shipped clients.

---

# 338. AI Gold Rule

When uncertain:

```text
No flag
>
Small temporary flag
>
Explicit lifecycle
>
Deterministic rollout
>
Final code cleanup
>
Permanent branching
```

and:

```text
Authorization
>
Entitlement
>
Product configuration
>
Feature flag
```

for decisions that genuinely belong to those respective systems.

---

# 339. Golden Feature Flag Rules

**1. Every flag has one explicit purpose.**

**2. Every flag has a declared type.**

**3. Temporary flags are temporary by design, not merely by intention.**

**4. Every temporary flag has an owner and cleanup date.**

**5. Release, experiment, migration, and sunset flags normally end in code deletion and flag removal.**

**6. Reaching 100% rollout does not complete a release until the old path and flag are removed.**

**7. Flag names describe behavior, not tickets or people.**

**8. The same logical flag key is used across environments.**

**9. Environment-specific behavior belongs in flag configuration, not environment-specific flag names.**

**10. Feature flags never replace authentication.**

**11. Feature flags never replace authorization.**

**12. Feature flags never replace tenant isolation.**

**13. Feature flags never become the authoritative commercial entitlement system.**

**14. Client-side flags are not security boundaries.**

**15. No secrets are stored in flag values or targeting context.**

**16. Targeting context is minimized.**

**17. Percentage rollout normally uses deterministic sticky assignment.**

**18. The assignment unit—user, tenant, session, device, or request—is chosen deliberately.**

**19. Stateful shared features normally use a consistency-appropriate assignment unit.**

**20. Important transactions do not change implementation halfway through because a flag was re-evaluated.**

**21. High-risk rollouts define promotion and abort criteria before production rollout.**

**22. Rollout percentage alone is not evidence of safety; sample size and observed outcomes matter.**

**23. Production rollouts monitor technical and business guardrails.**

**24. Flag rollback is considered safe only after data/schema/event/external-side-effect compatibility is understood.**

**25. Flags do not magically make irreversible changes reversible.**

**26. Kill switches have a known safe state.**

**27. Critical kill switches are tested before they are needed.**

**28. Kill switches remain operable during the failures they are intended to mitigate.**

**29. Experiments begin with a hypothesis.**

**30. Experiment assignment remains stable for the required analysis period.**

**31. Experiment exposure is measured accurately.**

**32. Experiment targeting follows privacy policy.**

**33. Security protections are not weakened merely to create experiment variants.**

**34. Every flag evaluation has a safe default.**

**35. Provider failure behavior is explicit.**

**36. Flag-provider outage does not automatically make the application unavailable.**

**37. Evaluation does not require unnecessary synchronous remote calls on every request.**

**38. High-impact flag changes are production changes and are audited.**

**39. Production flag-write permissions follow least privilege.**

**40. Shared administrator accounts are prohibited.**

**41. Flag dependencies/prerequisites remain shallow and rare.**

**42. Multiple flags are not used to approximate a missing explicit state machine.**

**43. Flag evaluation is localized to meaningful decision boundaries.**

**44. Supported old and new paths are both tested while the flag exists.**

**45. Flag-dependent cache behavior includes relevant variation in cache semantics.**

**46. Historical business decisions do not depend on the flag's current value.**

**47. Long-running jobs persist necessary behavior/version decisions rather than blindly re-evaluating later.**

**48. Mobile/client flag deletion accounts for supported deployed versions.**

**49. Temporary flag age and stale-flag inventory are monitored.**

**50. Stale flags are continuously removed rather than allowed to accumulate.**

**51. Removing a flag includes code, tests, control-plane configuration, and obsolete documentation.**

**52. Permanent flags still receive lifecycle review.**

**53. A flag platform is privileged operational infrastructure and is governed accordingly.**

**54. Provider credentials follow normal secret-management requirements.**

**55. Feature-flag configuration required during disaster recovery is included in recovery planning.**

**56. Vendor-specific feature-flag concepts do not leak deeply into domain logic without reason.**

**57. One rollout flag should not control unrelated product behaviors.**

**58. One product behavior should not require an unmanageable web of interacting flags.**

**59. Every flag should have an identifiable path to its final state.**

**60. If nobody knows why a flag exists or when it can be removed, it is already technical debt.**

---

# 340. Canonical Feature Flag Standard

The organizational standard is:

> **Feature flags are controlled runtime decision points used to separate deployment from release, progressively expose new functionality, execute bounded experiments, manage temporary migrations, and provide selected operational controls such as kill switches. Flags are not substitutes for authentication, authorization, commercial entitlements, durable business state, secrets, user preferences, environment configuration, or sound architecture.**

> **Every flag has a stable semantic key, explicit type, accountable owner, safe default, documented purpose, targeting model, and environment configuration. Temporary release, experiment, migration, and sunset flags additionally have a cleanup date and a defined final state. Flag keys remain consistent across environments, while rollout percentages and targeting rules vary by environment. Client-visible flags and targeting information are treated as observable and untrusted from a security perspective.**

> **Progressive rollout is deterministic where user or tenant consistency matters. The assignment unit is selected explicitly, stable targeting keys produce sticky cohorts, and rollout increases preserve existing cohorts wherever feasible. Promotion from one percentage to another depends on meaningful observation—technical errors, latency, capacity, user outcomes, and business guardrails—not percentages or elapsed time alone. High-risk rollouts define promotion and abort criteria before activation.**

> **Flags that select between stateful implementations are designed with database, cache, event, queue, external-side-effect, and migration compatibility in mind. A flag rollback is not considered a valid recovery mechanism merely because the control plane can change from `true` to `false`; the previous implementation must still be operationally and data-compatible. Long-running workflows snapshot or persist important implementation decisions where later re-evaluation could create inconsistent behavior.**

> **Experiments use stable assignments, defined controls and variants, explicit hypotheses, valid exposure measurement, primary and guardrail metrics, privacy-aware targeting, and a predetermined decision process. When an experiment ends, the final product behavior becomes ordinary code/configuration and losing variants, experiment instrumentation, and the temporary flag are removed.**

> **Kill switches represent tested operational controls with known safe states, restricted operators, audit trails, defined propagation behavior, provider-failure semantics, and runbooks. Their architecture does not depend solely on the service failure they are intended to mitigate, and they never override mandatory authentication, authorization, tenant, data-integrity, or security controls.**

> **The flag platform is treated as privileged production infrastructure. Production changes are attributable and auditable, administrative permissions are least-privileged, credentials are protected, third-party providers are governed as dependencies/processors where applicable, evaluation failure has safe deterministic behavior, and application availability is not unnecessarily coupled to synchronous control-plane availability.**

> **Temporary flags are continuously retired. Once rollout, experimentation, migration, or sunset work is complete, the final behavior becomes unconditional, obsolete implementations and tests are removed, active code references disappear, old supported clients are considered, and the control-plane flag is archived or deleted. Flag-health monitoring identifies overdue, stale, ownerless, unevaluated, and permanently rolled-out temporary flags so that lifecycle debt is corrected as part of normal engineering work.**

A production-grade feature-flag system should make it easy to answer:

```text
Why does this flag exist?
What type is it?
Who owns it?
Is it temporary or permanent?
When should it be removed?
What does true/false or each variant mean?
What is the safe default?
What happens when the provider is unavailable?
Where is the flag evaluated?
What targeting context is sent?
What is the assignment unit?
Is rollout sticky?
Which users/tenants are currently exposed?
What percentage is enabled?
What criteria allow the next rollout step?
What causes rollout to stop?
Can this flag actually roll back safely?
Did either code path change persistent state?
Does the old implementation still work?
Is this flag being mistaken for authorization or entitlement?
What telemetry identifies the active variation?
Can incidents be correlated with flag changes?
Which applications and clients still evaluate the flag?
Do old mobile versions still need it?
Has the cleanup date passed?
Why is the flag still present at 100%?
What code can now be deleted?
Who can change the production flag?
Are changes audited?
Can the flag platform fail without taking the product down?
```

If those questions cannot be answered reliably, feature flags have become unmanaged conditional complexity rather than controlled delivery infrastructure.

A few implementation details are worth making canonical. OpenFeature defines an explicit **evaluation context** and a stable targeting key that providers may use for fractional rollouts; its evaluation API also requires callers to supply a default value, supporting the rule that provider failure has defined behavior rather than undefined application behavior. citeturn113572search2turn113572search7

For gradual rollout, current Unleash documentation describes percentage rollout using deterministic hashing and **stickiness**, so the same user can remain consistently assigned as rollout percentage changes. That is the behavior this standard expects for ordinary user/tenant progressive delivery rather than request-level randomness. citeturn113572search0turn113572search10

For cleanup, current tooling increasingly treats flag lifecycle as first-class governance: LaunchDarkly exposes lifecycle criteria around age, targeting changes, serving one variation, code removal and evaluation activity, while Unleash explicitly distinguishes temporary release/experiment/operational flags from longer-lived kill-switch or permission-style controls. The exact vendor age thresholds should **not** become your universal policy; your cleanup threshold should match your own delivery cadence. citeturn113572search1turn113572search4

In the master hierarchy this sits cleanly after recovery/infrastructure controls and before release governance:

**… → CI/CD → Deployment & Infrastructure → Backup & Disaster Recovery → Feature Flags → Release & Versioning → Documentation → Governance.**
