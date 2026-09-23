---
id: "release-versioning"
title: "Release & Versioning Guidelines — Gold Standard 2026"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["operations", "release", "versioning"]
applies_to: ["infra"]
related: ["api", "security", "data-database"]
legacy_number: 30
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 71196
provenance: baseline

---

The standard below treats **versioning as a compatibility contract**, not merely release numbering. It separates package/API/product versions from deployment IDs, defines release channels and support lifecycles, and makes deprecation/migration/removal an explicit governed sequence.

# Release & Versioning Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- software releases;
- version numbers;
- Semantic Versioning;
- Calendar Versioning;
- build identifiers;
- release identifiers;
- release channels;
- pre-releases;
- alpha/beta/release-candidate versions;
- stable releases;
- LTS releases;
- hotfixes;
- release trains;
- changelogs;
- release notes;
- migration guides;
- schema migrations;
- API compatibility;
- package compatibility;
- backwards compatibility;
- forwards compatibility;
- deprecations;
- removals;
- support windows;
- maintenance windows;
- end-of-life;
- upgrade policy;
- release communication.

The objective is to make releases:

```text
Predictable
Traceable
Compatible
Supportable
Documented
Reversible where possible
Migratable
Understandable to consumers
```

The core principle is:

> **A version is a compatibility contract. A release is an immutable realization of that contract.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
Affected product/package/API
Consumer impact
Compatibility impact
Owner
Support implications
Review/expiry date
```

---

# 3. Release vs Deployment

A **release** is an identifiable software version made available for use.

A **deployment** is the act of running an artifact in an environment.

These are not equivalent.

```text
Release 4.2.0
↓
Deployment to staging
↓
Deployment to production region A
↓
Deployment to production region B
```

One release may have multiple deployments.

---

# 4. Version vs Build

A version communicates software compatibility/lifecycle.

A build identifies one produced artifact or build execution.

Example:

```text
Product version:
2.4.1

Build:
20260923.1842
Commit:
8fd62ab
Artifact digest:
sha256:...
```

Do not overload one field to represent all of these concepts.

---

# 5. Version vs Commit

A Git commit identifies source state.

It does not necessarily represent:

```text
released software
supported software
published package
deployed artifact
```

---

# 6. Version vs Tag

A Git tag identifies a source revision.

A version identifies the release contract.

Formal releases commonly connect:

```text
Version
↓
Git tag
↓
Commit
↓
Trusted build
↓
Immutable artifact
↓
Provenance
```

---

# 7. Release Immutability

Once a release version is published:

> **Its contents MUST NOT silently change.**

If anything changes:

```text
publish a new release
```

---

# 8. Never Reuse Versions

Bad:

```text
v2.3.1 published
↓
bug found
↓
replace v2.3.1 artifact
```

Good:

```text
v2.3.1
↓
v2.3.2
```

---

# 9. Versioning Scheme

Every versioned product/package SHOULD explicitly define its versioning scheme.

Common schemes:

```text
Semantic Versioning
Calendar Versioning
Sequential releases
Build identifiers
Date-based versions
```

---

# 10. Semantic Versioning

Semantic Versioning uses:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
3.7.4
```

---

# 11. SemVer Public Contract

Semantic Versioning is meaningful only when the software has a defined public contract.

The contract may include:

```text
Public API
Exported functions
CLI syntax
Configuration schema
File formats
Events
SDK surface
Plugin interface
Behavioral guarantees
```

---

# 12. SemVer MAJOR

Increment:

```text
MAJOR
```

when introducing an incompatible change to the defined public contract.

Example:

```text
2.8.3
→
3.0.0
```

---

# 13. SemVer MINOR

Increment:

```text
MINOR
```

for backward-compatible functionality added to the public contract.

Example:

```text
2.8.3
→
2.9.0
```

---

# 14. SemVer PATCH

Increment:

```text
PATCH
```

for backward-compatible defect corrections.

Example:

```text
2.8.3
→
2.8.4
```

---

# 15. SemVer Is Consumer-Oriented

Version increments SHOULD describe impact on consumers—not perceived engineering effort.

A one-line incompatible change can require:

```text
MAJOR
```

while a 20,000-line internal refactor may require only:

```text
PATCH
```

or no separately published release semantics beyond the resulting release.

---

# 16. Public API Must Be Defined

Do not claim strict Semantic Versioning while leaving the meaning of:

```text
public API
```

undefined.

---

# 17. Public Contract Includes Behavior

Compatibility is not limited to function signatures.

Breaking changes MAY include:

```text
changed defaults
changed error semantics
removed fields
changed CLI output relied on by automation
new mandatory configuration
changed serialization
```

---

# 18. SemVer 0.x

Versions:

```text
0.y.z
```

indicate initial development under SemVer.

The API may change substantially.

---

# 19. Do Not Abuse 0.x Forever

If production consumers rely on the API and compatibility matters, remaining at:

```text
0.x
```

indefinitely to avoid breaking-change responsibility is poor governance.

---

# 20. Version 1.0.0

`1.0.0` SHOULD indicate:

```text
public contract defined
production use expected
compatibility policy established
```

---

# 21. Pre-Release Versions

SemVer supports pre-release identifiers.

Examples:

```text
2.0.0-alpha.1
2.0.0-beta.3
2.0.0-rc.1
```

---

# 22. Pre-Release Meaning

A pre-release version indicates that the software may not yet satisfy the compatibility/stability expectations of the corresponding stable release.

---

# 23. Pre-Release Ordering

Conceptually:

```text
2.0.0-alpha.1
<
2.0.0-alpha.2
<
2.0.0-beta.1
<
2.0.0-rc.1
<
2.0.0
```

subject to SemVer precedence rules.

---

# 24. Build Metadata

SemVer build metadata MAY be expressed after:

```text
+
```

Example:

```text
2.4.1+build.583
```

---

# 25. Build Metadata Does Not Change Precedence

Build metadata SHOULD identify build context where useful.

It SHOULD NOT be relied upon to represent compatibility ordering.

---

# 26. Version Meaning Is Immutable

Never redefine what:

```text
2.5.0
```

means after publication.

---

# 27. SemVer Does Not Guarantee Quality

A valid:

```text
2.1.0
```

version number does not prove:

```text
security
correctness
compatibility implementation quality
```

Testing is still required.

---

# 28. SemVer Trust Requires Discipline

Consumers can only rely on Semantic Versioning when maintainers consistently classify breaking changes.

---

# 29. Breaking Changes

Examples MAY include:

```text
removing public function
renaming API field
making optional parameter mandatory
changing default semantics
removing supported runtime
dropping accepted input
changing durable format incompatibly
```

---

# 30. Breaking Dependency Requirement

Increasing a required platform/runtime version MAY be breaking when consumers must change their environment.

---

# 31. Security Breaking Change

A security fix MAY require incompatible behavior.

Security necessity does not make the change backward-compatible.

Version honestly and communicate urgency.

---

# 32. Bug Fix vs Behavior Change

Correcting behavior that consumers accidentally depended upon may still be operationally breaking.

Versioning policy SHOULD consider real consumer contracts.

---

# 33. Calendar Versioning

Calendar Versioning MAY be appropriate when release chronology is more meaningful than API compatibility.

Examples:

```text
2026.09
2026.09.1
26.9
```

---

# 34. CalVer Appropriate Uses

Potential candidates include:

```text
operating systems
regular product distributions
datasets
content releases
rapid application distributions
```

---

# 35. CalVer Does Not Communicate Compatibility Automatically

If using calendar versions, separately document:

```text
breaking-change policy
support window
upgrade requirements
```

---

# 36. Do Not Mix Semantics Accidentally

Bad:

```text
2026.9.1
```

where consumers do not know whether:

```text
2026 = year
9 = SemVer minor
1 = patch
```

Define the scheme.

---

# 37. SaaS Versioning

Continuously delivered SaaS applications do not need arbitrary SemVer versions for every deployment.

They SHOULD still have an internal release identity.

Example:

```text
release_id = 2026-09-23.4
commit = ...
artifact_digest = ...
```

---

# 38. SaaS Public Version

A SaaS product MAY expose marketing/product release versions when useful.

Those versions need not equal every production deployment.

---

# 39. SaaS Compatibility

For SaaS, compatibility is usually governed through:

```text
API contracts
data formats
client compatibility
deprecation policy
```

rather than the web application's internal SemVer.

---

# 40. Mobile Versioning

Mobile applications commonly require separate:

```text
user-visible version
build number
```

because distribution stores identify builds independently.

---

# 41. Desktop Versioning

Desktop software SHOULD maintain explicit version identity because multiple customer versions may coexist.

---

# 42. CLI Versioning

CLI tools intended for external automation SHOULD version public:

```text
commands
flags
output contracts
configuration
```

deliberately.

---

# 43. SDK Versioning

Public SDKs SHOULD normally use Semantic Versioning when they expose a stable programmable API.

---

# 44. Library Versioning

Published libraries SHOULD use Semantic Versioning unless another explicit compatibility model is documented.

---

# 45. Internal Library Versioning

Internal packages published independently SHOULD still have explicit compatibility semantics.

Internal does not eliminate consumers.

---

# 46. Monorepo Versioning

Monorepos MAY use:

```text
fixed versioning
or
independent package versioning
```

depending on product semantics.

---

# 47. Fixed Monorepo Versioning

Fixed versioning means:

```text
all related published packages
→ same release version
```

Useful when packages are consumed as a coordinated suite.

---

# 48. Independent Monorepo Versioning

Independent packages SHOULD have independent versions when:

```text
consumers differ
release cadence differs
compatibility differs
```

---

# 49. Do Not Version Private Workspace Packages Artificially

A package never independently consumed or published may not need standalone public SemVer.

---

# 50. API Versioning

API version policy follows API Guidelines.

A release version and API version MUST NOT be assumed equivalent.

Example:

```text
Product release: 8.4.2
API: v2
```

is valid.

---

# 51. API Version Stability

Do not create:

```text
/v27
```

merely because the application has released 27 times.

API major versions represent incompatible API contract generations.

---

# 52. Database Schema Version

Database schema versioning SHOULD be controlled through migration history.

Do not force schema version numbers to match application SemVer.

---

# 53. Migration Version ≠ Product Version

Example:

```text
Application: 3.6.1
Latest migration: 202609231422_add_invoice_index
```

is acceptable.

---

# 54. Event Schema Versions

Event/message contracts MAY need independent schema versions.

---

# 55. File Format Versions

Persisted/exported formats SHOULD include explicit version identity when incompatible evolution is possible.

---

# 56. Protocol Versions

Network protocols require independent compatibility/versioning strategies.

---

# 57. Release Channels

A release channel defines the expected stability and audience of releases.

Canonical conceptual channels:

```text
Development / Nightly
Canary
Alpha
Beta
Release Candidate
Stable
LTS
```

Not every product requires every channel.

---

# 58. Channel Purpose

Each channel MUST define:

```text
Audience
Stability
Update cadence
Support expectations
Promotion criteria
```

---

# 59. Development / Nightly

Nightly/development builds MAY contain the newest integrated code.

They SHOULD have:

```text
low stability expectation
minimal support commitment
clear non-production labeling
```

---

# 60. Canary Channel

A canary channel receives new releases earlier than the stable population.

It is useful for:

```text
early validation
limited blast radius
real-world compatibility
```

---

# 61. Alpha

Alpha typically means:

```text
feature incomplete
API unstable
significant defects possible
```

---

# 62. Beta

Beta typically means:

```text
major functionality substantially present
broader testing desired
compatibility may still change
```

---

# 63. Release Candidate

A release candidate SHOULD represent:

> **A build expected to become the stable release unless blocking defects are discovered.**

---

# 64. RC Discipline

Do not call every pre-release:

```text
rc
```

if significant planned changes remain.

---

# 65. Stable Channel

Stable releases SHOULD satisfy the product's normal:

```text
quality
compatibility
security
support
```

expectations.

---

# 66. LTS Channel

Long-Term Support releases receive an explicitly extended maintenance window.

---

# 67. LTS Is a Commitment

Do not label a release:

```text
LTS
```

without defining:

```text
support duration
security policy
bug-fix policy
upgrade path
end-of-life date
```

---

# 68. Channel Promotion

Conceptually:

```text
Nightly
↓
Canary
↓
Beta / RC
↓
Stable
↓
LTS where applicable
```

A product MAY skip unnecessary stages.

---

# 69. Build Promotion

Where practical, promote the same immutable artifact between release channels rather than rebuild.

---

# 70. Channel Identity

The release version MUST remain identifiable regardless of distribution channel.

---

# 71. Mutable Channel Alias

Aliases such as:

```text
stable
beta
next
latest
```

MAY point to changing releases.

They are channel selectors, not immutable version identities.

---

# 72. Do Not Treat `latest` as Version

`latest` is not an acceptable audit/recovery identity.

---

# 73. Pre-Release Distribution

Package registries MAY use distribution tags/channels to separate:

```text
stable
beta
next
```

from version identity.

---

# 74. Stable Must Not Accidentally Receive Pre-Release

Release automation SHOULD prevent alpha/beta/RC artifacts from entering stable channels unintentionally.

---

# 75. Release Train

A release train is a regular scheduled release cadence.

Example:

```text
every two weeks
```

---

# 76. Release Train Benefits

Release trains MAY improve:

```text
predictability
coordination
customer planning
```

for products needing scheduled releases.

---

# 77. Release Train Is Not Mandatory

Continuous-delivery products need not batch changes merely to conform to a release train.

---

# 78. Train Departure Principle

Low-priority unfinished work SHOULD generally miss the train rather than destabilize the release.

---

# 79. Release Freeze

Release freezes MAY be justified around:

```text
major events
regulatory windows
holiday support constraints
critical migrations
```

---

# 80. Freeze Is Risk Management

A freeze SHOULD NOT compensate permanently for unreliable delivery systems.

---

# 81. Release Candidate Build

An RC MUST be traceable to:

```text
source
artifact
tests
provenance
```

---

# 82. Stable Promotion

If an RC passes acceptance, the preferred model is:

```text
promote same artifact
```

rather than rebuild from source.

---

# 83. Release Branch

Release branches MAY exist when stabilization/support models require them.

Follow Git Guidelines.

---

# 84. Hotfix

A hotfix is an urgent correction to a supported release.

---

# 85. Hotfix Version

For SemVer software, a backward-compatible production bug fix normally increments:

```text
PATCH
```

---

# 86. Hotfix Does Not Bypass Quality

Urgency may compress process timing.

It does not eliminate:

```text
review
testing
traceability
artifact integrity
```

---

# 87. Hotfix Propagation

A hotfix applied to an older supported branch MUST also be considered for newer active branches/releases.

---

# 88. Security Release

Security releases SHOULD clearly communicate:

```text
affected versions
fixed versions
severity/context
upgrade action
```

without unnecessarily disclosing exploit details before coordinated release.

---

# 89. Embargoed Release

Sensitive security releases MAY require coordinated private preparation.

Access MUST be restricted.

---

# 90. Changelog

A changelog is a curated chronological record of notable changes.

---

# 91. Changelog Audience

The primary audience is:

```text
users
operators
developers
consumers
```

—not Git itself.

---

# 92. Changelog Is Not Git Log

Do not generate an unreadable list of every commit and call it a changelog.

---

# 93. Canonical Changelog File

Versioned software SHOULD generally maintain:

```text
CHANGELOG.md
```

or an equivalent clearly discoverable release history.

---

# 94. Changelog Entry

Every formal version SHOULD have a changelog entry when consumers benefit from release history.

---

# 95. Unreleased Section

Projects MAY maintain:

```text
Unreleased
```

to accumulate notable upcoming changes.

---

# 96. Changelog Categories

Recommended human-oriented categories:

```text
Added
Changed
Deprecated
Removed
Fixed
Security
```

Additional domain-specific categories MAY be used.

---

# 97. Added

Use for new functionality.

---

# 98. Changed

Use for meaningful changes in existing functionality.

---

# 99. Deprecated

Use when functionality remains available but consumers should migrate away.

---

# 100. Removed

Use when previously available functionality is no longer supported.

---

# 101. Fixed

Use for defect corrections.

---

# 102. Security

Use for security-related changes when disclosure policy permits.

---

# 103. Breaking Change Visibility

Breaking changes MUST be highly visible.

Do not hide them among minor implementation details.

---

# 104. Changelog Release Date

Released entries SHOULD include an unambiguous release date.

Recommended:

```text
YYYY-MM-DD
```

---

# 105. Latest First

Changelog versions SHOULD generally appear newest-first.

---

# 106. Changelog Is Curated

Include changes consumers need to understand.

Exclude routine internal noise such as:

```text
formatting
minor refactor
CI cleanup
typo in developer-only comment
```

unless relevant.

---

# 107. Changelog Automation

Automation MAY create draft changelog entries from:

```text
PR labels
release metadata
changesets
commit conventions
```

---

# 108. Human Review

Generated changelogs SHOULD be reviewed for clarity and correctness.

---

# 109. Changelog Portability

Important release history SHOULD NOT exist only inside a proprietary hosting UI if long-term portability matters.

---

# 110. Changelog Links

Changelog versions SHOULD map clearly to:

```text
release
tag
diff
migration documentation
```

where useful.

---

# 111. Release Notes

Release notes describe one particular release for its intended audience.

They differ from a changelog in emphasis.

---

# 112. Changelog vs Release Notes

Conceptually:

```text
Changelog
→ durable chronological record

Release notes
→ communication for a specific release
```

---

# 113. Release Notes Content

A significant release SHOULD communicate:

```text
What changed
Why it matters
Breaking changes
Upgrade actions
Deprecations
Known issues
Security considerations
```

where relevant.

---

# 114. User-Facing Release Notes

User-facing notes SHOULD focus on user outcomes.

Avoid implementation jargon unless users need it.

---

# 115. Developer Release Notes

Libraries/SDKs/APIs SHOULD include:

```text
contract changes
migration instructions
deprecated APIs
minimum runtime versions
```

---

# 116. Operator Release Notes

Operational products SHOULD mention:

```text
migration requirements
resource requirements
configuration changes
restart behavior
rollback considerations
```

---

# 117. Security Notes

Security notes MUST balance:

```text
consumer actionability
responsible disclosure
```

---

# 118. Known Issues

Known material issues SHOULD be disclosed when users/operators need them to make upgrade decisions.

---

# 119. Migration Guide

Breaking or substantial upgrades SHOULD provide a migration guide.

---

# 120. Migration Guide Purpose

A migration guide explains:

```text
old behavior
new behavior
required consumer changes
migration order
verification
```

---

# 121. Migration Guide Is Not Changelog Duplicate

A changelog says:

```text
what changed
```

A migration guide says:

```text
how to adapt
```

---

# 122. Migration Steps

Migration guides SHOULD provide explicit ordered steps.

---

# 123. Before/After Examples

Where useful, include:

```text
before
after
```

examples.

---

# 124. Automated Migration

Provide:

```text
codemod
migration script
conversion utility
```

when automation can reduce consumer risk.

---

# 125. Migration Idempotency

Migration tools SHOULD be safely repeatable where practical.

---

# 126. Migration Verification

Guides MUST explain how consumers can verify migration success.

---

# 127. Rollback Considerations

If downgrade/rollback becomes impossible after migration, state that explicitly.

---

# 128. Data Migration

Application-version migration MUST be coordinated with Data & Database Guidelines.

---

# 129. Expand/Contract

Rolling systems SHOULD prefer:

```text
Expand
↓
Compatible deployment
↓
Migrate/backfill
↓
Switch
↓
Contract
```

for incompatible schema evolution.

---

# 130. Schema Compatibility

During rolling release:

```text
old application
+
new application
```

may run concurrently.

The schema MUST support both while coexistence occurs.

---

# 131. Migration Version Coupling

Release documentation SHOULD indicate required database migration state where relevant.

---

# 132. Data Upgrade Format

Durable stored formats SHOULD include enough versioning/migration semantics to survive future software upgrades.

---

# 133. One-Way Migrations

One-way migration MUST be documented prominently.

---

# 134. Migration Backup

High-risk irreversible data migrations SHOULD verify appropriate recovery capability before execution.

---

# 135. Configuration Migration

Renaming/removing config keys SHOULD use compatibility windows when rolling deployment or customer-managed installations require them.

---

# 136. Config Deprecation

A deprecated config value SHOULD:

```text
continue working temporarily
emit warning where appropriate
document replacement
document removal release/date
```

---

# 137. API Migration

API consumers require sufficient migration lead time proportional to their control over deployments.

---

# 138. SDK Migration

SDK major changes SHOULD include migration examples.

---

# 139. CLI Migration

Breaking CLI changes SHOULD include:

```text
old command
new command
script impact
```

---

# 140. Deprecation

Deprecation means:

> **The capability remains available but is no longer recommended and is scheduled or eligible for removal.**

---

# 141. Deprecation Is Not Removal

Deprecating a feature MUST NOT silently change its existing behavior merely because it is deprecated.

---

# 142. Deprecation Requirements

A meaningful deprecation SHOULD identify:

```text
Deprecated capability
Replacement
Deprecation date/version
Removal/sunset target where known
Migration instructions
```

---

# 143. No Replacement

A deprecated feature MAY have no replacement when the capability itself is intentionally removed.

Say so explicitly.

---

# 144. Deprecation Warning

Libraries SHOULD emit compile-time/runtime warnings where useful and non-disruptive.

---

# 145. Avoid Warning Spam

Deprecation warnings SHOULD be:

```text
actionable
deduplicated where possible
specific
```

---

# 146. API Deprecation Signaling

HTTP APIs MAY use standardized deprecation signaling in addition to documentation.

---

# 147. Deprecation Header

For applicable HTTP resources, the standardized:

```text
Deprecation
```

response header MAY communicate the deprecation date.

---

# 148. Sunset Header

Where a resource is expected to become unavailable at a known time, the:

```text
Sunset
```

header MAY communicate that future point.

---

# 149. Deprecation Before Sunset

A removal/sunset date MUST NOT precede its deprecation date.

---

# 150. Deprecation Link

API responses MAY link consumers to migration/deprecation documentation.

---

# 151. Deprecation Communication

Do not rely only on runtime headers.

Use appropriate:

```text
documentation
release notes
email
dashboard notices
developer portal
```

for material deprecations.

---

# 152. Deprecation Window

The deprecation window SHOULD reflect:

```text
consumer count
integration complexity
release cadence
contract
criticality
```

---

# 153. Internal vs External Deprecation

Internal APIs can often migrate faster because the organization controls consumers.

External customer integrations generally require longer notice.

---

# 154. Consumer Inventory

Before removing an important contract, identify known consumers where possible.

---

# 155. Usage Telemetry

Deprecation decisions SHOULD use usage telemetry when available.

---

# 156. Zero Usage

No observed usage is evidence—not absolute proof—of safe removal.

Consider:

```text
offline clients
rare workflows
unobserved external users
```

---

# 157. New Adoption After Deprecation

New code SHOULD NOT create dependencies on deprecated interfaces.

---

# 158. Deprecation Enforcement

Static analysis/linting MAY block new uses of deprecated internal APIs.

---

# 159. Internal Migration Owner

For internal deprecations, assigning owners to remaining consumers improves removal reliability.

---

# 160. Removal

Removal occurs only after:

```text
deprecation communication
migration opportunity
support policy
known-consumer assessment
```

have been satisfied where applicable.

---

# 161. Removal Is Breaking

Removing a public capability normally requires:

```text
MAJOR
```

under SemVer.

---

# 162. Deprecation Itself Under SemVer

A backward-compatible release marking public functionality deprecated belongs in a minor version under SemVer's rules.

---

# 163. Breaking Without Deprecation

Some breaking changes MAY require immediate removal for:

```text
critical security
legal requirement
dangerous data integrity
```

Reasons MUST be documented and communicated clearly.

---

# 164. Compatibility

Compatibility MUST be analyzed from the consumer's perspective.

---

# 165. Backward Compatibility

New producer/software is backward-compatible when existing supported consumers can continue operating without required incompatible changes.

---

# 166. Forward Compatibility

Forward compatibility means older components can tolerate some newer data/inputs/peers.

It often requires:

```text
ignore unknown fields
extensible enums
version negotiation
```

when appropriate.

---

# 167. Wire Compatibility

Two systems may be structurally wire-compatible while semantically incompatible.

Both dimensions matter.

---

# 168. Source Compatibility

Source compatibility means existing consumer source continues to compile/build.

---

# 169. Binary Compatibility

Binary compatibility matters for ecosystems where precompiled consumers link against libraries.

---

# 170. Behavioral Compatibility

Behavioral compatibility includes:

```text
ordering
default values
error behavior
timing guarantees
side effects
```

where consumers rely on them.

---

# 171. Data Compatibility

Application upgrades must consider compatibility with existing persisted data.

---

# 172. Configuration Compatibility

New software SHOULD remain compatible with supported existing configuration during the declared transition window.

---

# 173. Event Compatibility

Message/event evolution must account for independently deployed producers and consumers.

---

# 174. API Additive Changes

Additive changes are generally safer but can still break poorly implemented consumers.

Examples:

```text
new enum value
new JSON property
```

---

# 175. Consumer Robustness

Consumers SHOULD tolerate documented additive evolution where the contract promises it.

---

# 176. Enum Expansion

Adding an enum value can be breaking for consumers using exhaustive assumptions.

API/version policy SHOULD explicitly define enum extensibility.

---

# 177. Required Field Addition

Adding a required input field is normally breaking.

---

# 178. Optional Output Field Addition

Usually compatible when consumers are required to ignore unknown fields.

---

# 179. Field Removal

Removing a supported output field is normally breaking.

---

# 180. Field Rename

Rename generally means:

```text
add new
deprecate old
transition
remove old later
```

rather than immediate replacement.

---

# 181. Changing Default

Changing default behavior MAY be breaking even if interfaces remain structurally identical.

---

# 182. Error Compatibility

Changing:

```text
status code
error type
error code
exception
```

can break consumers.

Treat documented errors as part of the contract.

---

# 183. Performance Compatibility

Major performance regressions MAY be release defects even when API-compatible.

---

# 184. Security Compatibility

Backward compatibility MUST NOT require preserving an unsafe vulnerability indefinitely.

Security may override compatibility with appropriate release communication.

---

# 185. Compatibility Test Suite

Public contracts SHOULD have automated compatibility testing where practical.

---

# 186. Contract Tests

Use contract tests for:

```text
API
events
SDK
serialization
```

where they materially reduce breaking-change risk.

---

# 187. Golden Fixtures

Serialized/file format compatibility MAY use old-version fixtures.

---

# 188. Upgrade Testing

Supported upgrade paths SHOULD be tested.

---

# 189. Downgrade Testing

Downgrade SHOULD be tested only when the product claims to support it.

---

# 190. Do Not Promise Arbitrary Upgrade Paths

A product MAY require:

```text
3.x
→
4.x
→
5.x
```

instead of:

```text
1.x
→
5.x
```

if documented.

---

# 191. Supported Upgrade Paths

Support documentation MUST define required intermediate upgrades where relevant.

---

# 192. Rolling Compatibility

Distributed systems MUST consider compatibility during mixed-version operation.

---

# 193. N/N-1 Compatibility

Some systems MAY define:

```text
N works with N-1
```

for rolling transitions.

This policy must be explicit and tested.

---

# 194. Client/Server Compatibility

Products with separately distributed clients SHOULD publish a compatibility matrix.

Example:

```text
Client 5.x
→ API v3 supported

Client 4.x
→ API v2/v3 supported until date X
```

---

# 195. Database/Application Matrix

Complex products MAY document:

```text
Application version
Database schema range
```

compatibility.

---

# 196. Plugin Compatibility

Plugin ecosystems SHOULD publish supported:

```text
host version
plugin API version
```

ranges.

---

# 197. Runtime Support

Published packages SHOULD define supported:

```text
language
runtime
OS
architecture
```

versions where relevant.

---

# 198. Support Window

A support window defines how long a release line receives maintenance.

---

# 199. Support Types

Distinguish:

```text
Full support
Maintenance support
Security-only support
Extended support
End-of-life
```

where the product model warrants it.

---

# 200. Full Support

Full support MAY include:

```text
bug fixes
security fixes
compatibility updates
vendor support
```

---

# 201. Maintenance Support

Maintenance support may limit changes to:

```text
important fixes
security
critical compatibility
```

---

# 202. Security-Only Support

Security-only lines receive qualifying security fixes but no ordinary feature development.

---

# 203. Extended Support

Extended support MAY be contractually available beyond normal support.

Its scope must be explicit.

---

# 204. End-of-Life

At EOL:

```text
normal fixes stop
security fixes stop unless explicitly contracted
support obligations end
```

according to policy.

---

# 205. EOL Is a Date

Support windows SHOULD publish explicit dates rather than ambiguous terms such as:

```text
supported for a while
```

---

# 206. Support Window Starts

Define whether support begins at:

```text
initial release
stable release
next major release
specific calendar date
```

---

# 207. Support Window Policy

Example:

```text
Current major
→ Full support

Previous major
→ Security support

Older majors
→ EOL
```

This is only an example.

---

# 208. LTS Policy

An LTS policy SHOULD define:

```text
LTS selection cadence
full-support period
security-support period
EOL
upgrade path
```

---

# 209. Too Many Supported Lines

Supporting many major versions increases:

```text
patch workload
security testing
CI matrix
customer support complexity
```

Limit support lines deliberately.

---

# 210. Support Matrix

Maintain a discoverable matrix for:

```text
versions
status
release date
end of full support
EOL
```

where multiple releases coexist.

---

# 211. Support Status Labels

Recommended conceptual statuses:

```text
Preview
Supported
Maintenance
Security-only
Deprecated
EOL
```

---

# 212. Unsupported Means Unsupported

Do not imply security support for EOL software unless such support actually exists.

---

# 213. EOL Notification

Customers/consumers SHOULD receive meaningful advance notice before EOL.

---

# 214. EOL Migration

EOL communication SHOULD identify:

```text
recommended target
migration documentation
known blockers
support contacts
```

---

# 215. EOL Telemetry

Where privacy permits, measure remaining active installations/consumers before shutdown.

---

# 216. Security After EOL

Critical vulnerabilities discovered in unsupported versions SHOULD still trigger appropriate communication if customers remain exposed, even when patches are unavailable.

---

# 217. Runtime EOL Dependency

A product version relying on an unsupported runtime may itself become operationally unsupported.

Support policy must account for upstream dependencies.

---

# 218. Upstream Support Dependency

A five-year support promise cannot be credible if required third-party components receive only two years of upstream support without a backport strategy.

---

# 219. Support Feasibility

Before committing to long support windows verify:

```text
runtime lifecycle
database support
OS support
dependencies
build infrastructure
team capacity
```

---

# 220. Release Frequency

Release frequency SHOULD match product delivery needs.

No universal cadence is required.

---

# 221. Smaller Releases

Where possible, prefer smaller releases because they:

```text
reduce change scope
improve diagnosis
simplify rollback
```

---

# 222. Release Batch Size

Do not delay compatible improvements solely to create larger ceremonial releases unless the distribution/support model requires batching.

---

# 223. Release Readiness

Release readiness SHOULD be determined through objective gates.

---

# 224. Release Gates

Applicable gates MAY include:

```text
CI green
security review
compatibility tests
migration verification
documentation
artifact provenance
release notes
```

---

# 225. Release Checklist

Formal releases SHOULD follow an automated or documented release procedure.

---

# 226. Release Owner

Significant releases SHOULD have an accountable release owner or automated release workflow.

---

# 227. Automated Release

Automation SHOULD handle deterministic tasks such as:

```text
version update
tag
build
publish
provenance
release page
```

where practical.

---

# 228. Human Judgment

Automation SHOULD NOT invent compatibility classification blindly when the public contract impact is ambiguous.

---

# 229. Version Bump Automation

Tools MAY recommend a version bump from:

```text
changesets
PR metadata
commit conventions
```

but maintainers remain responsible for correctness.

---

# 230. Conventional Commits

Commit conventions MAY support release automation.

They do not replace a defined public compatibility contract.

---

# 231. Changesets

Changeset-style workflows MAY record:

```text
consumer-facing change
affected package
version bump
```

before release.

---

# 232. Monorepo Release Automation

Release tooling SHOULD understand package dependency relationships before version propagation.

---

# 233. Version Cascades

Do not increment every package major version merely because one independent package introduced a breaking change.

---

# 234. Lockstep Exception

Coordinated suites MAY intentionally version together.

---

# 235. Release Tag

Formal source releases SHOULD use immutable tags according to Git Guidelines.

---

# 236. Release Tag Naming

Recommended for SemVer projects:

```text
v3.4.1
```

if repository convention uses the `v` prefix.

---

# 237. Tag Matches Version

Do not publish:

```text
package version = 3.4.1
tag = v3.4.0
```

---

# 238. Published Artifact Version

Artifact metadata SHOULD identify its release version.

---

# 239. Release Provenance

Formal release artifacts SHOULD follow CI/CD provenance policy.

---

# 240. Reproducibility

Operators SHOULD be able to connect:

```text
version
tag
commit
build
artifact
SBOM
provenance
```

---

# 241. Release Rollback

Releasing version:

```text
3.4.2
```

does not guarantee:

```text
3.4.1
```

can safely be restored.

Data/state compatibility determines rollback safety.

---

# 242. Release Recovery

Every high-risk release SHOULD have a recovery approach:

```text
rollback
roll forward
feature disable
config rollback
data repair
```

---

# 243. Release Revert Version

If a bad package release must be reverted, publish a new version containing the revert.

Do not overwrite the previous release.

---

# 244. Yank / Unpublish

Package removal from registries SHOULD be exceptional.

It can break reproducible builds.

---

# 245. Malicious Release

A compromised/malicious release MAY require:

```text
yank
security advisory
credential rotation
replacement release
```

despite reproducibility concerns.

---

# 246. Accidental Release

If an incorrect release was published but is not malicious:

```text
deprecate it
publish corrected version
communicate
```

according to registry capabilities.

---

# 247. Do Not Hide Mistakes

Release history SHOULD remain transparent enough for consumers to understand what happened.

---

# 248. Version Skipping

Skipping a version number is allowed.

Version continuity is less important than immutable correctness.

---

# 249. Never Reassign Skipped Version

Once consumers may have observed a version identifier, do not reuse it ambiguously.

---

# 250. Release Notes Automation

Release notes MAY be drafted automatically from merged changes.

They MUST still make:

```text
breaking changes
deprecations
migration actions
```

clear.

---

# 251. Audience-Specific Notes

One release MAY need different communication for:

```text
end users
developers
operators
security teams
```

---

# 252. Release Note Noise

Do not list every implementation commit.

Highlight externally meaningful changes.

---

# 253. Upgrade Notes

Upgrade notes SHOULD answer:

```text
Can I upgrade directly?
Do I need downtime?
Do I need a migration?
Are configs changed?
Can I roll back?
```

---

# 254. Breaking Change Template

Breaking releases SHOULD document:

```text
Previous behavior
New behavior
Affected consumers
Migration
Deadline
Fallback
```

---

# 255. Deprecation Registry

Organizations with many contracts SHOULD maintain an inventory of active deprecations.

---

# 256. Deprecation Metadata

Each deprecation SHOULD record:

```text
Capability
Owner
Deprecated since
Replacement
Known consumers
Sunset date
Status
```

---

# 257. Stale Deprecations

A deprecated interface remaining forever creates:

```text
maintenance burden
confusion
security surface
```

Deprecation needs an eventual decision.

---

# 258. Never-Ending Compatibility

Backward compatibility is valuable.

Infinite compatibility is rarely free.

Support explicit windows instead.

---

# 259. Compatibility Budget

Teams SHOULD consciously evaluate whether preserving legacy behavior is worth:

```text
complexity
security
performance
maintenance
```

cost.

---

# 260. Compatibility Layer

Adapters/shims MAY preserve old contracts during migration.

---

# 261. Compatibility Shim Lifecycle

Temporary compatibility layers MUST have:

```text
owner
removal criterion
support deadline
```

---

# 262. Dual APIs

Running old/new API generations in parallel MAY be appropriate during migration.

It doubles some operational/testing burden.

---

# 263. Old Version Security

Old supported releases require ongoing security monitoring.

---

# 264. Patch Backport

Important fixes MAY need backporting into active support lines.

---

# 265. Backport Discipline

A backport SHOULD contain the smallest safe change necessary.

Avoid introducing unrelated new functionality to maintenance lines.

---

# 266. Backport Testing

Backported changes MUST be tested against the target branch/version.

Passing tests on `main` is not sufficient.

---

# 267. Security Backports

If an old supported line cannot safely receive security fixes, support status must be reconsidered.

---

# 268. Release Branch Drift

Maintenance branches SHOULD minimize divergence from known release history.

---

# 269. Merge Forward

Fixes made to older release lines SHOULD be evaluated for forward propagation.

---

# 270. Version Support Automation

CI MAY run test matrices across currently supported versions.

---

# 271. Support Matrix Cost

Remove EOL versions from routine support matrices once obligations end.

---

# 272. Minimum Supported Dependency

Published libraries SHOULD document minimum supported dependency/runtime versions accurately.

---

# 273. Maximum Compatibility

Do not claim compatibility with future versions that cannot reasonably be verified.

---

# 274. Compatibility Ranges

Dependency ranges SHOULD align with actual tested compatibility.

---

# 275. Breaking Runtime Upgrade

Dropping support for an older runtime can require a major release for libraries whose users rely on it.

---

# 276. OS Support

Desktop/server-distributed software SHOULD publish OS support windows where relevant.

---

# 277. Architecture Support

Dropping:

```text
x86_64
ARM64
```

or another supported architecture may be breaking for affected consumers.

---

# 278. Browser Support

Web libraries/front-end products SHOULD define supported browser policy where consumers integrate them directly.

---

# 279. Version Negotiation

Protocols MAY negotiate versions dynamically.

Negotiation rules MUST be explicit and bounded.

---

# 280. Default Version

APIs/protocols SHOULD NOT silently move a consumer to an incompatible default version.

---

# 281. Version in URL

API major versions MAY appear in URLs according to API Guidelines.

---

# 282. Version in Headers

Header/media-type versioning MAY be appropriate where the API architecture justifies it.

---

# 283. One Canonical Contract Per Major

Avoid multiple undocumented behavior variants under one advertised API major.

---

# 284. Compatibility Tests Before Release

Breaking-change detection SHOULD run before publication where ecosystem tooling supports it.

Examples:

```text
API diff
ABI diff
schema diff
OpenAPI diff
protobuf compatibility
```

---

# 285. Breaking-Change Detection Is Advisory

Automated tools may miss:

```text
semantic behavior
default changes
performance guarantees
```

Human review remains necessary.

---

# 286. Schema Diff

Data/API schema diffing SHOULD flag potentially incompatible changes.

---

# 287. Version Review

Before release ask:

```text
What contract changed?
Is it backward-compatible?
Which consumers are affected?
What version bump communicates this?
```

---

# 288. Release Communication Timing

Material breaking/deprecation/EOL announcements SHOULD precede removal sufficiently for migration.

---

# 289. Surprise Breaking Change

Avoid discovering breaking changes only after consumers upgrade.

---

# 290. Release Documentation Must Ship Together

A release requiring migration SHOULD NOT be published before its migration documentation is available.

---

# 291. Release Notes Versioned With Release

Documentation SHOULD clearly identify which release it describes.

---

# 292. Documentation Compatibility

Current docs SHOULD distinguish current vs older supported versions where behavior differs.

---

# 293. Versioned Documentation

Libraries/APIs with multiple supported majors SHOULD maintain version-selectable documentation where useful.

---

# 294. Documentation EOL

Older docs MAY remain accessible after EOL but MUST be clearly marked unsupported.

---

# 295. Release Archive

Consumers SHOULD be able to find historical:

```text
versions
release dates
status
release notes
```

according to product needs.

---

# 296. Support Status on Download Pages

Distribution channels SHOULD clearly indicate:

```text
stable
preview
EOL
```

where multiple versions are available.

---

# 297. Default Download

The default download/install path SHOULD normally resolve to the supported stable channel.

---

# 298. Pre-Release Opt-In

Consumers SHOULD intentionally opt into unstable channels.

---

# 299. Automatic Updates

Applications MAY automatically update within supported policy.

---

# 300. Auto-Update Safety

Automatic updates SHOULD consider:

```text
compatibility
rollback
migration
user control
security urgency
```

---

# 301. Forced Updates

Forced updates SHOULD be reserved for cases where continued old-version operation is unacceptable.

Examples:

```text
critical security
protocol shutdown
mandatory compliance
```

---

# 302. Offline Products

Products running in disconnected environments require release artifacts and migration documentation that do not depend on live vendor services.

---

# 303. Air-Gapped Support

Air-gapped releases MAY require:

```text
offline packages
checksums
signatures
SBOM
migration bundle
documentation
```

---

# 304. Release Security

Release infrastructure follows CI/CD Security Guidelines.

---

# 305. Publishing Credentials

Registry/release credentials MUST be least-privileged and protected.

---

# 306. Trusted Publisher

Use workload/federated identity or equivalent trusted publisher capabilities where supported.

---

# 307. Manual Local Publishing

Official production package releases SHOULD NOT normally originate from developer laptops.

---

# 308. Release Signing

Distributed artifacts SHOULD use signing/attestation where ecosystem and assurance requirements justify it.

---

# 309. Signing Is Not Versioning

A signature proves identity/integrity.

Versioning communicates lifecycle/compatibility.

Both may be required.

---

# 310. Release Audit

Formal release systems SHOULD record:

```text
version
source revision
artifact
actor/workflow
release time
channel
```

---

# 311. Emergency Release

Emergency releases follow CI/CD emergency policy.

They do not bypass immutable versioning.

---

# 312. Security Emergency Version

If:

```text
4.2.0
```

requires an urgent compatible security fix:

```text
4.2.1
```

is appropriate.

Do not silently replace `4.2.0`.

---

# 313. Release Metrics

Organizations MAY monitor:

```text
release frequency
upgrade adoption
versions in use
deprecation usage
time to migrate
support-line population
```

---

# 314. Adoption Metrics

Release adoption data SHOULD inform:

```text
support
deprecation
migration
```

decisions where privacy allows.

---

# 315. Do Not Use Adoption to Ignore Contracts

Low usage does not automatically eliminate contractual support obligations.

---

# 316. Release Health

A release SHOULD have operational health visibility.

---

# 317. Version Telemetry

Production telemetry SHOULD identify the running:

```text
release
artifact
commit
```

where practical.

---

# 318. Client Version Telemetry

Server systems MAY collect supported client version metadata where operationally necessary and privacy-compliant.

---

# 319. Unknown Version

Requests from unsupported/unknown client versions SHOULD have defined behavior.

---

# 320. Version Skew

Distributed systems SHOULD monitor harmful version skew.

---

# 321. Upgrade Campaign

Major migrations MAY require an explicit consumer upgrade campaign.

---

# 322. Upgrade Campaign Content

May include:

```text
announcement
documentation
migration tools
usage telemetry
support outreach
deadline reminders
```

---

# 323. Deprecation Escalation

As sunset approaches, communication MAY become progressively stronger.

---

# 324. Final Sunset Notice

A material externally consumed contract SHOULD receive final notice before shutdown according to policy.

---

# 325. Sunset Execution

At sunset:

```text
old contract disabled
monitor errors
support migration
remove infrastructure when safe
```

---

# 326. Sunset Rollback

Where feasible, planned sunset should have an emergency temporary restoration strategy during initial cutover.

---

# 327. Do Not Restore Deprecated Forever

Emergency restoration after sunset should have a short explicit duration.

---

# 328. Release Governance Checklist

```text
□ Versioning scheme defined
□ Public contract defined
□ Release immutable
□ Source tag identified
□ Artifact identified
□ Channel defined
□ Support status defined
□ Changelog updated
□ Release notes updated
□ Migration guidance available
□ Deprecations listed
□ Compatibility reviewed
□ Provenance available where required
```

---

# 329. SemVer Checklist

```text
□ Public API/contract defined
□ Breaking change?
□ Compatible functionality added?
□ Compatible bug fix?
□ Pre-release?
□ Build metadata needed?
□ Version not reused?
□ Consumer impact reviewed?
```

---

# 330. Breaking Release Checklist

```text
□ Breaking contract identified
□ Consumers identified where possible
□ Major version appropriate
□ Deprecation occurred where feasible
□ Migration guide
□ Compatibility shim considered
□ Data migration considered
□ Runtime requirements documented
□ Release notes prominent
□ Support available
```

---

# 331. Release Channel Checklist

```text
□ Channel purpose
□ Audience
□ Stability expectation
□ Support expectation
□ Promotion criteria
□ Artifact identity
□ Rollback/recovery
□ Default installation behavior
```

---

# 332. Changelog Checklist

```text
□ Release version
□ Release date
□ Added
□ Changed
□ Deprecated
□ Removed
□ Fixed
□ Security
□ Breaking changes prominent
□ Human-readable
□ Not raw Git log
```

---

# 333. Release Notes Checklist

```text
□ Release purpose
□ User impact
□ Developer/operator impact
□ Breaking changes
□ Upgrade actions
□ Migration
□ Deprecations
□ Known issues
□ Support status
```

---

# 334. Migration Checklist

```text
□ Starting version
□ Target version
□ Prerequisites
□ Backup/recovery considerations
□ Ordered migration steps
□ Automation/codemod
□ Data migration
□ Config migration
□ Verification
□ Rollback limitations
```

---

# 335. Deprecation Checklist

```text
□ Capability identified
□ Owner
□ Deprecated date/version
□ Replacement
□ Migration instructions
□ Consumer inventory
□ Usage telemetry
□ Sunset date where known
□ Communication channels
□ New usage blocked where appropriate
```

---

# 336. Removal Checklist

```text
□ Deprecation window satisfied
□ Consumers assessed
□ Migration path exists
□ Support policy satisfied
□ Documentation updated
□ Compatibility code removed
□ Telemetry monitored
□ Release version classified correctly
```

---

# 337. Support Window Checklist

```text
□ Full-support duration
□ Maintenance duration
□ Security-only duration
□ EOL date
□ Supported runtimes
□ Supported dependencies
□ Backport policy
□ Upgrade target
□ Customer communication
```

---

# 338. LTS Checklist

```text
□ LTS release clearly identified
□ Support start
□ Full-support end
□ Security-support end
□ EOL
□ Backport team/process
□ Runtime dependency support
□ Upgrade/migration path
```

---

# 339. Definition of Done — Release

A release is complete when:

```text
✓ Version assigned
✓ Compatibility classification correct
✓ Source revision immutable
✓ Artifact immutable
✓ CI/release gates complete
✓ Changelog complete
✓ Release notes complete
✓ Migration guidance complete where needed
✓ Support status defined
✓ Tag/release metadata published
✓ Provenance/signature available where required
```

---

# 340. Definition of Done — Breaking Release

```text
✓ Breaking contracts enumerated
✓ Major version applied where SemVer
✓ Migration guide available
✓ Known consumers considered
✓ Deprecation obligations satisfied where feasible
✓ Compatibility tests performed
✓ Data migration tested
✓ Support team/documentation ready
✓ Release notes clearly communicate impact
```

---

# 341. Definition of Done — Deprecation

```text
✓ Deprecation documented
✓ Replacement documented
✓ Consumer migration documented
✓ Usage discoverable
✓ Owner assigned
✓ Sunset target defined or review scheduled
✓ New usage discouraged/blocked
✓ Communication sent where required
```

---

# 342. Definition of Done — EOL

```text
✓ EOL date reached
✓ Consumers notified
✓ Replacement supported
✓ Downloads/docs marked EOL
✓ Security-support status clear
✓ CI support matrix updated
✓ Maintenance branch archived where appropriate
✓ Remaining users understood where possible
```

---

# 343. Release & Versioning Anti-Patterns

Avoid:

```text
change artifact
keep same version
```

Avoid:

```text
latest
```

as immutable release identity.

Avoid:

```text
SemVer
```

with no defined public contract.

Avoid:

```text
0.x forever
```

to avoid compatibility commitments.

Avoid:

```text
patch release
```

containing known incompatible API changes.

Avoid:

```text
major release
```

for an entirely internal refactor with no public break merely because the work was large.

Avoid:

```text
beta
```

with production-stability expectations identical to stable.

Avoid:

```text
LTS
```

with no published support period.

Avoid:

```text
v4.2.0
```

replaced silently after publication.

Avoid:

```text
release notes = git log
```

Avoid:

```text
breaking change
```

hidden halfway through 200 bullet points.

Avoid:

```text
deprecated
```

with no replacement or migration guidance.

Avoid:

```text
deprecated forever
```

with no owner/removal decision.

Avoid:

```text
removed immediately
```

despite promised support window.

Avoid:

```text
API v19
```

because product has shipped 19 times.

Avoid:

```text
DB migration number = app SemVer
```

without reason.

Avoid:

```text
upgrade required
```

with no migration guide.

Avoid:

```text
migration guide
```

with no success verification.

Avoid:

```text
rollback supported
```

after irreversible database transformation without testing.

Avoid:

```text
old version supported
```

while its runtime is already unmaintained and no backport strategy exists.

Avoid:

```text
five-year LTS
```

without staffing/upstream-dependency feasibility.

Avoid:

```text
release candidate
```

when major planned functionality is still incomplete.

Avoid:

```text
stable artifact rebuilt
```

after RC validation instead of promoting the tested artifact.

Avoid:

```text
production package published from developer laptop
```

as normal release practice.

Avoid:

```text
tag moved
```

to make release history appear clean.

Avoid:

```text
version deleted
then reused later
```

Avoid:

```text
supported
```

with no documented support meaning.

Avoid:

```text
EOL someday
```

without a date.

Avoid:

```text
client compatibility
```

assumed without an actual version/support matrix.

Avoid:

```text
new enum value always non-breaking
```

without contract rules.

Avoid:

```text
new optional response property always safe
```

when consumers are known to reject unknown fields.

Avoid:

```text
security
```

used as an excuse to hide incompatibility.

---

# 344. AI Release & Versioning Rules

AI coding agents MUST inspect the project's existing versioning policy before proposing a version.

---

# 345. AI SemVer Rule

AI MUST NOT choose:

```text
MAJOR
MINOR
PATCH
```

from implementation size.

It MUST reason from public-contract compatibility.

---

# 346. AI Public Contract Rule

Before declaring a change non-breaking, AI SHOULD inspect affected:

```text
API
SDK
CLI
config
events
serialization
runtime requirements
```

---

# 347. AI Breaking-Change Rule

AI MUST flag likely breaking changes explicitly.

---

# 348. AI Version-Reuse Rule

AI MUST NOT modify an already-published version's contents.

---

# 349. AI Pre-Release Rule

AI SHOULD use pre-release versions for unstable candidate releases rather than presenting them as stable.

---

# 350. AI SaaS Rule

AI SHOULD NOT impose SemVer on every internal SaaS deployment unless public product semantics require it.

Use release/build identity instead.

---

# 351. AI API Rule

AI MUST NOT increment API major version merely because application version changed.

---

# 352. AI Migration Rule

When generating a breaking release, AI SHOULD include:

```text
migration steps
verification
rollback limitations
```

---

# 353. AI Database Rule

AI MUST NOT claim a software downgrade is safe without assessing schema/data compatibility.

---

# 354. AI Changelog Rule

AI SHOULD write curated consumer-facing changelog entries rather than dump commit history.

---

# 355. AI Release Notes Rule

AI SHOULD distinguish:

```text
user-facing changes
developer changes
operator changes
```

when audiences differ.

---

# 356. AI Deprecation Rule

When deprecating a public capability, AI SHOULD identify:

```text
replacement
deprecation point
migration
sunset plan
```

---

# 357. AI Removal Rule

AI MUST NOT remove a deprecated contract solely because it is old.

It SHOULD inspect:

```text
support policy
consumer usage
migration status
```

---

# 358. AI Support Rule

AI MUST NOT invent LTS/support windows unsupported by organizational capacity or upstream dependencies.

---

# 359. AI Runtime Rule

AI SHOULD treat dropping a supported runtime/platform as potentially breaking.

---

# 360. AI Release Channel Rule

AI MUST distinguish immutable:

```text
version
```

from mutable:

```text
stable/beta/latest
```

channel aliases.

---

# 361. AI Artifact Rule

AI SHOULD preserve:

```text
release → tag → commit → artifact → provenance
```

traceability.

---

# 362. AI Security Release Rule

Security urgency MUST NOT result in silently mutating an existing release.

Publish a new version.

---

# 363. AI Compatibility Rule

AI SHOULD consider behavioral compatibility, not only type/signature compatibility.

---

# 364. AI Enum Rule

AI SHOULD treat enum expansion as potentially breaking when consumers may be exhaustive.

---

# 365. AI Documentation Rule

Breaking releases MUST have migration documentation available at publication time.

---

# 366. AI Backport Rule

When patching an older supported line, AI SHOULD evaluate whether the same fix is already present or required in newer lines.

---

# 367. AI EOL Rule

AI MUST distinguish:

```text
deprecated
maintenance
security-only
EOL
```

rather than using them interchangeably.

---

# 368. AI Gold Rule

When uncertain:

```text
Preserve compatibility
>
Deprecate deliberately
>
Provide migration
>
Remove on a declared boundary
>
Surprise consumers
```

and:

```text
Immutable new release
>
Reusing or mutating an existing release
```

---

# 369. Golden Release & Versioning Rules

**1. A version communicates a compatibility/lifecycle contract.**

**2. A release is immutable after publication.**

**3. Published version identifiers are never silently reused or repointed.**

**4. Releases, deployments, builds, commits, and API versions are separate concepts.**

**5. Semantic Versioning requires a defined public contract.**

**6. MAJOR represents incompatible public-contract changes.**

**7. MINOR represents backward-compatible public functionality additions and compatible deprecations.**

**8. PATCH represents backward-compatible corrections.**

**9. Version increments reflect consumer impact, not implementation effort.**

**10. `0.x` is not a permanent excuse to ignore compatibility.**

**11. Pre-release versions communicate reduced stability expectations.**

**12. Build metadata is not compatibility precedence.**

**13. Continuously deployed SaaS does not need arbitrary SemVer for every deployment.**

**14. API versions do not increment with every product release.**

**15. Database migration versions remain independent of product release versions.**

**16. Release channels define audience, stability, support, and promotion semantics.**

**17. `stable`, `beta`, and `latest` are mutable channels, not immutable version identities.**

**18. Stable publication never accidentally consumes pre-release artifacts.**

**19. Release candidates are intended to become stable without substantive code change.**

**20. Promote tested immutable artifacts rather than rebuilding them for stable publication where practical.**

**21. LTS is an explicit support commitment, not a marketing label.**

**22. Changelogs are curated for humans, not raw Git histories.**

**23. Every notable formal release has a discoverable history.**

**24. Breaking changes are prominently documented.**

**25. Release notes explain consumer impact and required action.**

**26. Migration guides explain how to adapt, not merely what changed.**

**27. Breaking releases ship migration guidance with the release.**

**28. Deprecation and removal are separate lifecycle stages.**

**29. Deprecation keeps existing behavior available during the migration window.**

**30. Deprecations identify replacements and migration guidance where applicable.**

**31. Public removals occur only after applicable support/deprecation obligations are met.**

**32. Standardized HTTP deprecation/sunset signals may supplement API documentation.**

**33. Removal is normally a breaking change under SemVer.**

**34. Compatibility includes behavioral semantics, not only signatures.**

**35. Default changes can be breaking changes.**

**36. Error semantics can be part of the public contract.**

**37. Persisted data formats require deliberate compatibility/versioning.**

**38. Event, API, schema, package, and application versions evolve independently where appropriate.**

**39. Distributed rolling upgrades explicitly support mixed-version operation.**

**40. Supported upgrade paths are documented and tested.**

**41. Downgrade is supported only when explicitly designed and tested.**

**42. Support windows publish concrete statuses and dates.**

**43. Full, maintenance, security-only, extended, and EOL support are distinct.**

**44. Support commitments account for upstream runtime and dependency lifecycles.**

**45. Too many simultaneously supported lines create real engineering/security cost.**

**46. Hotfixes remain reviewed, tested, versioned, and traceable.**

**47. Backports are minimal and tested on the target supported release.**

**48. Security urgency never justifies silently mutating an old version.**

**49. Release artifacts are traceable to source and trusted build provenance.**

**50. Formal release publishing uses controlled identities and automation where practical.**

**51. Changelog and release documentation are available before consumers are asked to upgrade.**

**52. Deprecated interfaces are blocked from new adoption where practical.**

**53. Usage telemetry informs—not solely determines—removal decisions.**

**54. Compatibility shims have owners and removal dates.**

**55. EOL releases are clearly marked unsupported.**

**56. Consumers receive reasonable advance notice of material EOL/removal.**

**57. Version support matrices remain current.**

**58. Release health is observable by exact version/artifact identity.**

**59. Every major release has an explicit upgrade story.**

**60. If consumers cannot determine what changed, whether it breaks them, how to migrate, and how long their version remains supported, the release model is not adequately governed.**

---

# 370. Canonical Release & Versioning Standard

The organizational standard is:

> **Software versions communicate compatibility and lifecycle rather than implementation effort. Products, libraries, APIs, database schemas, events, protocols, clients, and deployment artifacts use independent version identities where their contracts evolve independently. Semantic Versioning is used for software with a clearly defined public API or equivalent consumer contract: incompatible public changes increment MAJOR, backward-compatible public functionality and deprecations increment MINOR, and backward-compatible defect corrections increment PATCH. Other schemes such as Calendar Versioning are acceptable when their semantics are explicitly documented.**

> **Published releases are immutable. Each formal release maps unambiguously to its source revision, Git tag where applicable, trusted build, immutable artifact, and provenance metadata. Already-published versions are never silently rebuilt, overwritten, moved, or reused; corrections produce new releases. Mutable selectors such as `stable`, `beta`, `next`, and `latest` identify distribution channels rather than immutable releases.**

> **Release channels communicate stability and support expectations. Development/nightly, canary, alpha, beta, release-candidate, stable, and LTS channels are used only where their distinction adds value. Release candidates are expected to become stable without substantive modification, and the same validated artifact is promoted between stages where the delivery architecture permits it. LTS designation includes an explicit maintenance, security, upgrade, and end-of-life commitment.**

> **Every release communicates notable consumer impact. Changelogs provide a durable human-curated chronological history, while release notes explain the significance of a specific release to its intended audience. Breaking changes, deprecations, removals, security fixes, new requirements, migrations, known issues, and changed support expectations are made conspicuous. Release notes are not raw Git logs, and release documentation exists before consumers are required to perform an upgrade.**

> **Compatibility is assessed broadly across source APIs, binary interfaces, behavior, configuration, persisted data, file formats, events, API schemas, runtime requirements, error semantics, and distributed mixed-version operation. Additive changes are considered against documented consumer extensibility rules rather than assumed safe automatically. Automated compatibility diffing and contract testing are used where practical but do not replace human assessment of semantic behavior.**

> **Deprecation is a governed transition, not a synonym for removal. A deprecated capability continues to operate during the applicable migration period, discourages new adoption, identifies the preferred replacement and migration path where available, and has an accountable owner and intended sunset or review point. External HTTP APIs may additionally expose standardized deprecation and sunset metadata. Removal occurs only after applicable compatibility, notification, support, and migration obligations have been met, except where overriding security, legal, or integrity requirements require accelerated action.**

> **Support windows are explicit commitments. Products distinguish supported, maintenance, security-only, extended-support, deprecated, and end-of-life states as appropriate; publish concrete dates; define upgrade targets; and ensure promised support can actually be maintained across required runtimes, operating systems, databases, dependencies, toolchains, and build infrastructure. Security fixes and high-severity defects are backported only to lines within their declared support policy unless an explicit exception exists.**

> **Database, configuration, API, and durable-format migrations are part of release engineering. Breaking upgrades provide ordered migration procedures, compatibility windows, verification steps, automation where useful, and explicit rollback limitations. Rolling systems preserve old/new compatibility through expand-contract or equivalent migration patterns, and a version rollback is never considered safe merely because an old executable remains available.**

A production-grade release and versioning model should make it easy to answer:

```text
What does this version number mean?
Which versioning scheme does this product use?
What is the defined public contract?
Is this change breaking?
Why is this a major/minor/patch release?
Is this version stable or pre-release?
Which channel is it in?
Which source revision produced it?
Which exact artifact belongs to it?
Can that artifact ever change?
What changed since the previous release?
Which changes are breaking?
Which capabilities were deprecated?
When will they be removed?
What should consumers use instead?
Is a migration required?
Can the migration be automated?
Can consumers roll back safely afterward?
Which runtime/database/client versions are compatible?
How long will this release receive bug fixes?
How long will it receive security fixes?
When does it reach EOL?
Which release should an unsupported consumer upgrade to?
Which old release lines still require backports?
Can operators identify the exact release running in production?
```

If those questions cannot be answered reliably, release numbering is functioning as labeling rather than a managed compatibility and support contract.

The normative SemVer baseline remains **Semantic Versioning 2.0.0**: MAJOR for incompatible public-API changes, MINOR for backward-compatible functionality and public-API deprecations, PATCH for backward-compatible bug fixes; it also explicitly requires that an already released version not be modified. citeturn106649search1

For changelogs, the currently published **Keep a Changelog** specification remains 1.1.0 while a 2.0 draft exists. Its durable principles match the standard above: changelogs are curated for humans rather than raw commit logs, versions should be dated and grouped by meaningful change type, and deprecations/removals should be conspicuous. citeturn368006search0turn368006search2

For HTTP API lifecycle signaling, **RFC 9745**, published in March 2025, standardizes the `Deprecation` response header and deprecation link relation. It explicitly separates deprecation from behavioral removal; where an endpoint is expected to stop responding at a known time, it can be paired with the older `Sunset` header from RFC 8594. citeturn106649search0turn106649search3

This closes another major part of the delivery lifecycle:

**… → Git & Repository → CI/CD → Deployment & Infrastructure → Backup & Disaster Recovery → Feature Flags → Release & Versioning → Documentation → Governance.**
