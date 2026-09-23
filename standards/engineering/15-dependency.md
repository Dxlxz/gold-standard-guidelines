---
id: "dependency"
title: "Dependency Guidelines — Gold Standard 2026"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "dependency"]
applies_to: ["general"]
related: ["security", "performance", "privacy-data-governance", "governance", "code-review"]
legacy_number: 26
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 72386
provenance: baseline

---

The current supply-chain baseline supports the direction below: **SLSA 1.2** is the current approved SLSA specification and defines verifiable build provenance; **SPDX 3.0** is the current SPDX specification; OWASP recommends dependency inventory, continuous vulnerability monitoring, and lockfile/version controls; and OpenSSF Scorecard remains a useful automated signal for assessing open-source project security practices. citeturn203050search0turn203050search3turn203050search10turn203050search14turn203050search9

# Dependency Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for third-party software dependencies across:

- application packages;
- runtime libraries;
- development dependencies;
- build tools;
- framework plugins;
- CI/CD dependencies;
- container base images;
- operating-system packages;
- SDKs;
- CLIs;
- browser packages;
- native/mobile packages;
- infrastructure modules;
- generated-code tools;
- vendored source;
- internal packages;
- transitive dependencies.

They govern:

- when dependencies may be added;
- dependency review;
- dependency scope;
- direct vs transitive dependencies;
- package selection;
- version policies;
- lockfiles;
- package provenance;
- registry trust;
- integrity verification;
- security updates;
- vulnerability management;
- license review;
- package ownership;
- dependency automation;
- abandoned packages;
- replacement;
- vendoring;
- forks;
- dependency removal.

The objective is to keep dependencies:

```text
Necessary
Trusted
Minimal
Reproducible
Maintained
Secure
Licensed appropriately
Replaceable
Observable
Owned
```

The core principle is:

> **Every dependency is borrowed code, inherited maintenance, additional attack surface, and a future upgrade obligation. Add it only when its value exceeds its long-term cost.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Dependency
Reason
Risk
Affected systems
Compensating controls
Owner
Review/expiry date
```

---

# 3. Dependencies Are Architecture

Adding a dependency changes more than implementation.

It may change:

```text
Security surface
Supply chain
Bundle size
Startup time
Runtime behavior
Licensing
Upgrade workload
Deployment
Portability
API stability
```

Dependency decisions are architecture decisions proportional to their impact.

---

# 4. Dependency Cost Model

The effective cost of a dependency is:

```text
Initial integration
+
Transitive dependencies
+
Security monitoring
+
Upgrades
+
Breaking changes
+
License obligations
+
Operational risk
+
Replacement cost
```

Do not evaluate only:

```text
npm install took 5 seconds
```

---

# 5. Default Decision

The default rule is:

> **Do not add a dependency until the requirement and existing alternatives have been checked.**

This is not a prohibition against third-party software.

Mature dependencies are often safer than bespoke reimplementation.

---

# 6. Dependency Decision Order

Before introducing a new package:

```text
1. Does the platform/framework already provide it?
2. Does an existing approved dependency already solve it?
3. Is the implementation small and stable enough to own locally?
4. Is a well-maintained external package justified?
5. Is a heavier external service/package really necessary?
```

---

# 7. Native Platform First

Prefer mature capabilities from:

```text
language runtime
standard library
browser
database
framework
existing platform
```

when they satisfy the requirement cleanly.

---

# 8. Framework-Native First

Do not add a dependency to duplicate functionality already well supported by the canonical framework.

Examples may include:

```text
routing
image handling
metadata
server requests
basic URL parsing
```

depending on framework capabilities.

---

# 9. Existing Approved Dependency First

Before adding another package, search the repository/workspace for an existing solution.

Avoid:

```text
date-lib-a
date-lib-b
date-lib-c
```

for equivalent use cases.

---

# 10. Local Implementation

Local implementation MAY be preferable when the required functionality is:

```text
small
well-understood
stable
security-insensitive
easy to test
```

Example:

```text
10-line value formatter
```

does not necessarily justify a new package.

---

# 11. Do Not Reinvent Complex Security Code

Do not implement bespoke:

```text
cryptography
OAuth/OIDC
password hashing
JWT verification
HTML sanitization
```

merely to avoid dependencies.

Use proven, appropriate implementations.

---

# 12. Complexity Test

A library is more justified when recreating it would involve:

```text
complex standards
edge cases
security requirements
interoperability
specialized algorithms
substantial maintenance
```

---

# 13. Tiny Package Test

Before adding a package for minimal functionality, inspect whether the implementation would be simpler and safer to own directly.

Avoid adding a dependency whose total useful logic is trivial unless ecosystem conventions justify it.

---

# 14. Package Count Is Not the Objective

The objective is not:

```text
fewest dependencies possible
```

It is:

```text
fewest dependencies necessary for reliable delivery
```

---

# 15. Dependency Categories

Dependencies SHOULD be classified as:

```text
Runtime
Development
Build
Test
Optional
Peer
Platform
Infrastructure
```

according to ecosystem semantics.

---

# 16. Runtime Dependency

A runtime dependency is required for the application to operate in production.

Runtime dependencies receive the highest routine scrutiny.

---

# 17. Development Dependency

Development-only tooling belongs in the development dependency category where the ecosystem supports it.

Examples:

```text
formatter
test runner
lint plugin
code generator
```

---

# 18. Do Not Misclassify

A package required at runtime MUST NOT be placed in a dev-only category merely to reduce production manifest appearance.

---

# 19. Build Dependencies Matter

Build-only packages can execute with access to:

```text
source
CI tokens
environment variables
artifact signing
deployment credentials
```

They are supply-chain-sensitive even when not shipped to production.

---

# 20. CI Dependencies Matter

CI actions/plugins/images/scripts are dependencies and MUST follow equivalent supply-chain governance.

---

# 21. Direct Dependency

A direct dependency is intentionally selected by the project.

Direct dependencies require an identified reason for use.

---

# 22. Transitive Dependency

A transitive dependency is brought in through another dependency.

It still contributes to:

```text
vulnerability exposure
license obligations
size
supply-chain risk
```

even though developers did not select it directly.

---

# 23. Transitive Dependencies Are Real Dependencies

Do not say:

```text
"We don't use package X."
```

if it is present in the deployable dependency graph.

---

# 24. Dependency Tree

Teams SHOULD be able to inspect the full resolved dependency graph.

---

# 25. Dependency Tree Size

When choosing between otherwise comparable packages, prefer the one with:

```text
smaller
clearer
better-maintained
```

dependency trees.

---

# 26. Package Selection Criteria

A new dependency SHOULD be reviewed for:

```text
Functional fit
Maintenance
Security
Provenance
Dependency tree
API quality
Compatibility
Performance
Bundle/runtime cost
License
Community/vendor health
Replacement cost
```

---

# 27. Functional Fit

Choose packages that solve the actual requirement.

Avoid a massive framework when only one small capability is needed.

---

# 28. Scope Fit

A dependency SHOULD be narrowly aligned with the problem.

Example:

```text
Full utility framework
```

may be excessive for one formatting helper.

---

# 29. Package Maturity

Consider:

```text
project age
release history
usage history
stable APIs
known production adoption
```

as supporting signals.

None alone proves safety.

---

# 30. Popularity Is Not Trust

High download counts do not guarantee:

```text
security
maintainer integrity
future maintenance
license compatibility
```

---

# 31. Low Popularity Is Not Automatic Rejection

Specialized packages may legitimately have small communities.

Risk should be evaluated in context.

---

# 32. Maintenance Activity

Review:

```text
recent releases
issue response
security response
maintainer activity
```

for meaningful dependencies.

---

# 33. Release Activity Interpretation

Frequent releases are not automatically better.

A stable package may legitimately require few releases.

The question is:

> **Is the project maintained when maintenance is required?**

---

# 34. Security Response History

For security-sensitive dependencies, evaluate whether maintainers have historically:

```text
acknowledged vulnerabilities
published fixes
communicated advisories
maintained supported versions
```

where evidence exists.

---

# 35. Maintainer Concentration

A critical dependency maintained by one individual has higher continuity risk.

This does not automatically disqualify it.

It should influence contingency planning.

---

# 36. Bus Factor

For critical packages, consider whether development could cease if one maintainer disappears.

---

# 37. Ownership Changes

Unexpected package-maintainer or repository ownership changes SHOULD trigger heightened review before upgrading.

---

# 38. Package Transfer Risk

A formerly trusted package can become risky after transfer to:

```text
new maintainer
new publisher
new organization
```

Treat publisher identity changes as meaningful signals.

---

# 39. Repository Authenticity

Verify the package corresponds to the expected:

```text
official repository
publisher
organization
project
```

where possible.

---

# 40. Typosquatting

Carefully verify package names before installation.

Example risk:

```text
react-query
vs
reactquery
```

or other deliberately similar names.

---

# 41. Dependency Confusion

Internal package names MUST be designed and registry configuration MUST be controlled to prevent unintended resolution from public registries.

---

# 42. Internal Namespace

Internal packages SHOULD use a controlled namespace/scope where the ecosystem supports it.

---

# 43. Registry Resolution

Build systems SHOULD have explicit registry resolution rules.

Do not let package-manager defaults determine trusted sources accidentally.

---

# 44. Approved Registries

Production builds SHOULD consume packages only from approved:

```text
public registry
internal proxy
private registry
```

sources.

---

# 45. Registry Proxy

Organizations MAY use an internal package proxy/cache to:

```text
control sources
improve availability
apply policy
retain approved artifacts
```

---

# 46. Dependency Firewall

Higher-risk environments MAY enforce an admission/dependency-firewall layer before packages are installed.

It can inspect:

```text
publisher
package age
known malware
provenance
policy
unexpected scripts
```

before execution.

---

# 47. New-Package Caution

Packages published very recently with no established history SHOULD receive additional scrutiny before use in privileged systems.

---

# 48. AI Package Hallucination

AI-generated dependency recommendations MUST be treated as untrusted until independently verified.

Never install a package merely because an AI model supplied a plausible package name.

---

# 49. Slopsquatting Defense

Before accepting an AI-recommended package:

```text
verify package exists
verify official source
verify publisher
verify documentation
verify package purpose
```

---

# 50. Install-Time Execution

Dependencies containing:

```text
preinstall
install
postinstall
prepare
```

or equivalent scripts deserve heightened review because installation may execute arbitrary code.

---

# 51. Installation Scripts

Projects SHOULD minimize dependencies requiring install-time scripts, especially in privileged CI environments.

---

# 52. Script Disablement

Package-manager options that disable install scripts MAY be used where compatible with the dependency ecosystem.

Exceptions should be explicit.

---

# 53. Native Extensions

Dependencies compiling native code require additional review for:

```text
platform compatibility
build toolchain
security
deployment complexity
```

---

# 54. Prebuilt Binaries

Packages downloading prebuilt binaries require confidence in:

```text
origin
integrity
signing/provenance
platform selection
```

---

# 55. Binary-Only Dependencies

Opaque binary-only dependencies SHOULD receive stronger vendor/security evaluation because source auditability is reduced.

---

# 56. Runtime Permissions

Evaluate what the package can access at runtime.

Examples:

```text
filesystem
network
environment variables
browser DOM
database
process execution
```

---

# 57. Privilege Amplifies Risk

A dependency used in:

```text
CI
authentication service
admin backend
secret-management tooling
```

deserves more scrutiny than a dependency isolated to low-risk presentation.

---

# 58. Risk Tiers

Organizations SHOULD classify dependencies by impact.

Example:

```text
Tier 1 — Critical
Tier 2 — Significant
Tier 3 — Routine
```

---

# 59. Tier 1 Examples

Possible Tier 1 dependencies:

```text
authentication
cryptography
database driver
web framework
payment SDK
serialization parser
build/signing tooling
```

---

# 60. Tier 1 Review

Critical dependencies SHOULD require deeper assessment of:

```text
maintenance
security
provenance
license
support
replacement
```

---

# 61. Dependency Approval

Organizations MAY maintain an approved/reviewed dependency catalog.

Approval SHOULD apply to:

```text
package
ecosystem
acceptable version range
usage class
```

rather than package name alone where risk demands.

---

# 62. Approval Does Not Last Forever

A package previously approved can later become:

```text
vulnerable
abandoned
compromised
relicensed
```

Review continues throughout its lifecycle.

---

# 63. Version Policy

Every ecosystem SHOULD have a documented version-resolution policy.

---

# 64. Version Concepts

Distinguish:

```text
Manifest constraint
Resolved version
Lockfile version
Installed artifact
```

They are not always the same thing.

---

# 65. Semantic Versioning

SemVer syntax can communicate compatibility intent.

Do not assume every package follows SemVer accurately.

---

# 66. SemVer Trust

Version range policy SHOULD account for the package's demonstrated compatibility discipline.

---

# 67. Application Dependencies

Applications SHOULD normally use lockfiles to fix exact resolved dependency graphs.

---

# 68. Manifest Ranges

Application manifests MAY use compatible ranges when the lockfile remains authoritative for builds.

---

# 69. Exact Manifest Pins

Exact top-level pins MAY be appropriate for:

```text
critical dependencies
ecosystems without reliable lockfiles
high-assurance builds
```

---

# 70. Version Range Risk

Broad ranges such as:

```text
*
latest
>=1
```

SHOULD NOT be used for production application dependencies without exceptional justification.

---

# 71. Floating Versions

Production builds MUST NOT depend on uncontrolled floating versions such as:

```text
latest
main
master
HEAD
```

---

# 72. Git Dependencies

Dependencies directly sourced from Git SHOULD pin an immutable commit when no proper released artifact exists.

---

# 73. Git Branch Dependencies

Avoid production dependencies such as:

```text
github:user/repo#main
```

because the content can change without manifest changes.

---

# 74. Git Tag Dependency

Tags provide better readability but may theoretically be moved.

Immutable commit hashes provide stronger identity unless signed/repository controls provide equivalent assurance.

---

# 75. Container Dependencies

Base images SHOULD be versioned intentionally.

High-assurance builds SHOULD consider immutable digests.

---

# 76. OS Packages

Operating-system dependencies SHOULD come from approved repositories and controlled versions appropriate to the distribution/update model.

---

# 77. Lockfiles

Applications MUST commit canonical lockfiles when supported by the ecosystem.

---

# 78. Lockfile Purpose

A lockfile records the exact dependency resolution used for reproducible installs.

---

# 79. Lockfile Is Source

A committed lockfile is a controlled repository input.

It MUST be reviewed.

---

# 80. One Canonical Lockfile

One dependency graph SHOULD have one authoritative lockfile.

Avoid competing active files such as:

```text
package-lock.json
yarn.lock
pnpm-lock.yaml
```

for the same workspace.

---

# 81. Frozen Installs

CI and production builds SHOULD use:

```text
frozen
immutable
locked
```

installation mode where the package manager supports it.

---

# 82. Manifest/Lock Mismatch

If the manifest and lockfile disagree:

```text
CI MUST fail
```

rather than silently resolving a different dependency graph.

---

# 83. No Lockfile Regeneration as Debugging Ritual

Do not solve dependency problems by routinely:

```text
delete lockfile
reinstall everything
```

without understanding the dependency changes introduced.

---

# 84. Lockfile Diff Review

Lockfile review SHOULD identify:

```text
new packages
removed packages
version shifts
registry/source changes
integrity changes
transitive expansion
```

---

# 85. Large Lockfile Diffs

A small intended dependency change causing a huge graph update requires investigation.

---

# 86. Lockfile Integrity Metadata

Where package managers include integrity hashes, they MUST be preserved.

---

# 87. Lockfile Merge Conflicts

Resolve conflicts through the package manager where possible rather than hand-editing complex lockfile structures blindly.

---

# 88. Lockfile Security

Unexpected changes in package origin or integrity metadata are security signals.

---

# 89. Library Lockfiles

Published library lockfile policy MAY differ because consumers resolve their own dependency graphs.

However:

> **The library's own development/test environment must remain reproducible.**

---

# 90. Peer Dependencies

Use peer dependencies only when the consumer is expected to provide a shared dependency instance/version.

Do not use them merely to avoid declaring a real runtime dependency.

---

# 91. Optional Dependencies

Optional dependencies MUST genuinely be optional.

Application behavior when absent should be defined.

---

# 92. Dependency Constraints

Version constraints SHOULD be as narrow as necessary and as broad as safely compatible.

---

# 93. Minimum Supported Version

Libraries SHOULD test supported lower-bound versions if they claim compatibility with them.

---

# 94. Phantom Compatibility

Do not declare:

```text
>=1.0.0
```

if only the latest release has actually been tested.

---

# 95. Engine Requirements

Projects SHOULD declare supported runtime/platform versions.

Example:

```text
Node >= X
Python >= Y
```

according to ecosystem conventions.

---

# 96. Dependency Update Philosophy

Dependencies MUST be continuously maintained.

The safe strategy is:

> **Update regularly in small increments rather than defer everything into rare large upgrade projects.**

---

# 97. Update Cadence

Teams SHOULD have recurring automated or scheduled dependency review.

---

# 98. Automated Update Tools

Use automated dependency-update tooling where appropriate.

Examples conceptually:

```text
new version available
security update available
base image update available
```

---

# 99. Automated PRs

Dependency bots SHOULD provide:

```text
old version
new version
release notes
security context where available
```

---

# 100. Auto-Merge

Low-risk updates MAY auto-merge only when policy defines:

```text
allowed dependency tier
update type
tests
security checks
ownership
```

---

# 101. Critical Dependency Auto-Merge

Critical packages SHOULD NOT receive blind automatic major upgrades.

---

# 102. Patch Updates

Patch updates MAY receive lighter review when:

```text
package is trusted
tests are strong
release history is stable
```

---

# 103. Minor Updates

Minor updates still require normal verification.

SemVer claims are not guarantees.

---

# 104. Major Updates

Major versions require explicit compatibility review and migration planning.

---

# 105. Update Batch Size

Prefer small dependency update sets.

Avoid:

```text
Upgrade 73 unrelated packages
```

in one PR unless a platform migration requires it.

---

# 106. Ecosystem Upgrade

Framework/runtime ecosystem upgrades MAY legitimately require coordinated package updates.

Treat them as planned migrations.

---

# 107. Security Updates

Known vulnerable dependencies MUST have explicit remediation ownership.

---

# 108. Vulnerability Monitoring

Production dependency graphs SHOULD be continuously monitored through:

```text
registry advisories
SCA
security advisories
vulnerability databases
vendor notifications
```

according to ecosystem.

---

# 109. Scan Direct and Transitive Dependencies

Security monitoring MUST cover the resolved graph, not only direct manifest entries.

---

# 110. Vulnerability Finding

A vulnerability report is a signal requiring triage.

It is not automatically proof that the application is exploitable.

---

# 111. Vulnerability Triage

Assess:

```text
affected version?
affected code path?
reachable?
runtime or dev-only?
internet-facing?
privilege?
known exploitation?
fix available?
```

---

# 112. Severity Is Not the Only Factor

Use:

```text
severity
exploitability
exposure
business impact
known exploitation
```

to determine remediation urgency.

---

# 113. Known Exploitation

Vulnerabilities known to be actively exploited SHOULD receive elevated priority.

---

# 114. Vulnerable but Unreachable

If a vulnerable component is provably unreachable in the deployment:

```text
document the analysis
```

rather than silently suppressing the alert.

---

# 115. Suppression Policy

Vulnerability suppressions MUST be:

```text
specific
justified
owned
reviewable
time-bounded where appropriate
```

---

# 116. Scanner Noise

Do not globally disable dependency scanning because some findings are false positives.

---

# 117. Security Update Path

Preferred remediation order:

```text
Upgrade to fixed supported version
↓
Apply supported vendor patch/backport
↓
Replace dependency
↓
Maintain temporary internal patch
↓
Accept documented risk
```

according to feasibility.

---

# 118. Backported Fix

A patched version may retain an older upstream version number.

Security tools may continue to flag it.

Document provenance and patch evidence.

---

# 119. Private Security Patch

If maintaining a private backport:

```text
record upstream version
record CVE/advisory
record patch
record builder
record owner
publish through trusted registry
```

---

# 120. Private Patch Is Maintenance Debt

A private security patch creates an ongoing obligation for:

```text
future releases
future vulnerabilities
merge conflicts
testing
```

---

# 121. Drop Private Patch

Return to normal upstream releases as soon as an acceptable fixed version becomes available.

---

# 122. Unsupported Version

Running an unsupported dependency line is a material risk.

Teams SHOULD upgrade, replace, or establish a formal support/backport strategy.

---

# 123. End-of-Life Runtime

Applications MUST NOT remain indefinitely on unsupported language/runtime/framework releases.

---

# 124. Update SLOs

Organizations MAY define remediation targets based on:

```text
criticality
known exploitation
exposure
```

rather than one universal deadline.

---

# 125. Emergency Dependency Update

Emergency upgrades still require:

```text
tests
artifact integrity
review
deployment verification
```

proportional to urgency.

---

# 126. Malicious Package Response

A suspected malicious dependency requires immediate:

```text
containment
credential review
build environment review
artifact review
dependency removal
incident response
```

according to Security Guidelines.

---

# 127. Credential Exposure

If a malicious build dependency executed in CI, assume accessible CI secrets MAY have been exposed until investigation shows otherwise.

---

# 128. Package Provenance

Package provenance answers:

```text
Where did this artifact come from?
Who produced it?
From what source?
Through what build?
```

---

# 129. Provenance Is Preferred

Critical dependencies SHOULD prefer ecosystems/packages providing verifiable provenance or equivalent trusted publisher/build evidence where available.

---

# 130. Provenance Availability

Lack of provenance does not automatically prohibit a package in ecosystems where provenance support is immature.

Risk must be evaluated explicitly.

---

# 131. Provenance Verification

Do not merely collect provenance metadata.

High-assurance workflows SHOULD verify it according to policy.

---

# 132. SLSA

Recognized supply-chain provenance standards such as SLSA SHOULD be preferred over proprietary provenance formats where applicable.

---

# 133. Source-to-Artifact Link

For critical packages, it should ideally be possible to establish:

```text
source repository
↓
source revision
↓
build
↓
published artifact
```

---

# 134. Publisher Identity

Package publisher identity SHOULD be verified against the expected maintainer/project.

---

# 135. Publisher MFA

Where observable and relevant, strong publisher-account security is a positive trust signal.

---

# 136. Package Signatures

Cryptographic package signing SHOULD be verified where the ecosystem provides reliable signing infrastructure.

---

# 137. Signing Is Not Enough

A correctly signed malicious release is still malicious.

Signatures prove identity/integrity—not correctness.

---

# 138. Checksums

Artifact integrity checks SHOULD be enforced where supported.

---

# 139. Registry TLS Is Not Provenance

Secure transport proves the connection to the registry.

It does not prove the package was built from intended source.

---

# 140. Reproducible Builds

Reproducible upstream builds are a positive assurance signal but are not mandatory for every dependency.

---

# 141. OpenSSF Scorecard

OpenSSF Scorecard MAY be used as one input when evaluating open-source project security practices.

---

# 142. Score Is Not Approval

A numerical project score MUST NOT be treated as the sole dependency approval decision.

Review relevant individual signals and project context.

---

# 143. Security Signals

Useful signals MAY include:

```text
branch protection
dependency updates
release practices
maintainer activity
signed releases
security policy
```

depending on project.

---

# 144. Package Provenance Registry

Critical organizations MAY record:

```text
package
version
registry
source repository
publisher
provenance status
approval status
```

in an internal dependency catalog.

---

# 145. SBOM

Production artifacts SHOULD include dependency inventory through an SBOM where required by Security/CI/CD policy.

---

# 146. SBOM Scope

The SBOM SHOULD represent the actual produced artifact sufficiently accurately to support vulnerability response.

---

# 147. SPDX

Standard identifiers/formats such as SPDX SHOULD be preferred for machine-readable license and SBOM metadata where appropriate.

---

# 148. License Review

Every external dependency MUST have known licensing status before production adoption.

---

# 149. Public Package ≠ Free of Obligations

A publicly downloadable package is not automatically:

```text
free to copy
free to modify
commercially usable
```

without examining its license.

---

# 150. No-License Package

Code with no license SHOULD NOT be assumed reusable.

Default copyright still applies in many jurisdictions.

Follow Reusable Repositories & OSS Adoption Guidelines.

---

# 151. License Identification

Use standardized SPDX license identifiers where possible.

Examples:

```text
MIT
Apache-2.0
BSD-3-Clause
MPL-2.0
GPL-3.0-only
```

---

# 152. License Expression

Dependencies with multiple licensing choices/conditions SHOULD preserve their complete SPDX expression where available.

---

# 153. License Compatibility

License review SHOULD consider:

```text
application distribution model
proprietary/open-source status
linking/modification model
distribution
network use
attribution
notice
source obligations
patent terms
```

where relevant.

---

# 154. License Policy

Organizations SHOULD define license categories such as:

```text
Pre-approved
Review required
Restricted
Prohibited
```

according to legal/product policy.

---

# 155. Permissive Licenses

Common permissive licenses MAY be pre-approved depending on organizational policy.

Approval still depends on notice/attribution requirements.

---

# 156. Copyleft

Copyleft licenses require explicit compatibility review against the product's distribution and modification model.

---

# 157. Strong Copyleft

Strong copyleft dependencies SHOULD receive legal/OSS review before incorporation into proprietary distributed software.

---

# 158. Network Copyleft

Network-use-triggered licenses such as AGPL-style terms require explicit review for hosted products.

---

# 159. Source-Available License

Source-available does not automatically mean open source or commercially acceptable.

Review actual terms.

---

# 160. Noncommercial License

Noncommercial restrictions are generally incompatible with ordinary commercial product use unless explicitly approved.

---

# 161. Custom License

Custom/nonstandard licenses require explicit review.

---

# 162. Dual Licensing

For dual-licensed packages, record which license option the organization relies on.

---

# 163. Commercial License

Commercial dependency terms SHOULD be documented when they replace or supplement OSS terms.

---

# 164. Attribution

Required copyright/license notices MUST be retained where applicable.

---

# 165. NOTICE Files

Apache-style or other required NOTICE obligations MUST be propagated according to license requirements.

---

# 166. Third-Party Notices

Distributed products SHOULD generate/maintain required third-party notices.

---

# 167. License Files in Packages

Do not strip license files from vendored/distributed source when obligations require them.

---

# 168. Transitive License Review

License scanning SHOULD include transitive dependencies where distribution obligations may apply.

---

# 169. License Scan False Positives

Automated license detection is useful but may be wrong.

Ambiguous packages require manual verification.

---

# 170. License Change

A package changing license between releases is a material dependency change.

Review before upgrading.

---

# 171. Relicensing Alert

Automated update workflows SHOULD surface significant license changes where tooling supports it.

---

# 172. Package Ownership

Every important direct dependency SHOULD have a clear owning team through the consuming application/module.

---

# 173. Dependency Owner Responsibility

The owner is responsible for:

```text
upgrade decisions
vulnerability remediation
replacement
license status
compatibility
```

---

# 174. Shared Dependency Ownership

Organization-wide dependencies SHOULD have platform/library ownership where practical.

---

# 175. Ownership Does Not Mean Maintainer

Internal ownership means:

> **Someone is responsible for our use of the package.**

It does not imply ownership of the upstream project.

---

# 176. Dependency Inventory

Teams SHOULD be able to identify current:

```text
direct dependencies
resolved versions
transitive dependencies
licenses
known vulnerabilities
```

through automation.

---

# 177. Dependency Catalog

Critical dependencies MAY be catalogued with:

```text
package
purpose
owner
tier
version
license
source
replacement notes
```

---

# 178. Why Field

Important dependencies SHOULD have a discoverable reason for use.

This may be obvious from imports for routine packages.

Critical infrastructure dependencies deserve explicit documentation.

---

# 179. Duplicate Functionality

Avoid multiple dependencies providing substantially the same core capability unless requirements differ materially.

---

# 180. Duplicate Version

Multiple versions of the same dependency MAY occur transitively.

Review large duplicate-version trees where they affect:

```text
bundle size
security
runtime compatibility
```

---

# 181. Dedupe

Package-manager deduplication SHOULD be used only when compatible with declared dependency constraints.

Do not force incompatible versions together.

---

# 182. Frontend Dependency Cost

Browser dependencies add:

```text
download
parse
compile
execution
memory
```

cost.

Review them against Performance Guidelines.

---

# 183. Browser Bundle Review

A package that adds substantial client bundle weight requires explicit justification.

---

# 184. Server Dependency Cost

Server packages can increase:

```text
startup
memory
cold start
attack surface
container size
```

even if users do not download them.

---

# 185. Tree Shaking

Frontend libraries SHOULD expose tree-shakeable/module-friendly packaging where relevant.

---

# 186. Side Effects

Review packages declaring broad module side effects, as they can inhibit optimization and create unexpected behavior.

---

# 187. Import Scope

Prefer targeted public imports when a package exposes them appropriately.

---

# 188. Browser Polyfills

Do not add large polyfill packages when supported browser targets already provide the feature.

---

# 189. Node/Runtime Polyfills

Do not duplicate runtime-native features unnecessarily.

---

# 190. Date/Time Libraries

Before adding large date/time libraries, evaluate:

```text
native platform
Temporal availability/support
existing project library
localization requirements
```

according to target platforms.

---

# 191. Utility Libraries

Do not import an entire utility library for a trivial helper where modern language/runtime facilities suffice.

---

# 192. SDK Dependencies

Third-party service SDKs SHOULD be evaluated against direct protocol/API usage.

Use SDKs when they materially reduce:

```text
authentication complexity
pagination complexity
protocol errors
maintenance
```

---

# 193. SDK Lock-In

SDK-specific abstractions SHOULD be kept behind infrastructure adapters where vendor replacement risk matters.

---

# 194. Vendor SDK Telemetry

Review whether SDKs automatically collect:

```text
telemetry
user data
environment information
```

before adoption.

---

# 195. Plugins

Framework/plugin ecosystems can execute highly privileged code.

Plugins require dependency review just like ordinary packages.

---

# 196. Editor Plugins

Development tooling that accesses source or credentials SHOULD come from approved sources where organizational policy requires it.

---

# 197. CLI Tools

CLIs installed in CI/build systems are dependencies.

Pin and verify them appropriately.

---

# 198. Global Dependencies

Avoid undocumented globally installed packages required for building the project.

Declare tooling reproducibly.

---

# 199. Local Tooling

Use repository-managed versions for important:

```text
formatter
compiler
linter
generator
```

where ecosystem support allows.

---

# 200. Internal Dependencies

Internal packages require the same:

```text
versioning
ownership
security
maintenance
```

discipline as external packages.

---

# 201. Internal Does Not Mean Trusted Forever

An abandoned internal library can become more dangerous than a healthy external package.

---

# 202. Internal Package Registry

Internal packages SHOULD be distributed through the approved internal registry/package mechanism rather than ad hoc copied folders.

---

# 203. Internal Package Versioning

Published internal packages SHOULD have explicit version/change semantics.

---

# 204. Workspace Dependencies

Monorepo workspace dependencies SHOULD use the package manager's explicit workspace mechanisms.

---

# 205. Deep Imports

Do not bypass package public APIs via private deep imports merely because the package exists in the same monorepo.

---

# 206. Vendoring

Vendoring means storing a dependency's source/artifact within the repository/product.

It MAY be appropriate when:

```text
availability
patching
build isolation
upstream stability
```

requires it.

---

# 207. Vendoring Is Not Free

Vendoring transfers maintenance responsibility inward.

---

# 208. Vendored Metadata

Vendored dependencies MUST record:

```text
upstream
version/commit
license
local patches
import date
update method
owner
```

---

# 209. Vendored Changes

Local modifications MUST be identifiable separately from upstream source.

---

# 210. Vendored Upgrade

A repeatable process SHOULD exist to import new upstream versions and reapply necessary local changes.

---

# 211. Forking

Fork a dependency only when:

```text
upstream cannot satisfy requirement
patch is strategically necessary
maintenance commitment is accepted
```

---

# 212. Fork Cost

A fork creates responsibility for:

```text
security fixes
upstream merges
releases
tests
licenses
support
```

---

# 213. Fork Naming

Internal forks SHOULD retain clear upstream lineage in package/version metadata where practical.

---

# 214. Upstream Contribution

Prefer contributing generally useful fixes upstream when feasible.

This reduces long-term fork divergence.

---

# 215. Temporary Fork

Temporary forks SHOULD have an exit criterion.

---

# 216. Abandoned Dependency

A dependency may be considered abandoned when meaningful evidence indicates:

```text
security issues unaddressed
maintainers inactive
critical compatibility issues unresolved
release infrastructure broken
project explicitly archived
```

---

# 217. Inactivity Alone

Do not label a stable mature package abandoned solely because it has not released recently.

---

# 218. Abandonment Signals

Evaluate:

```text
open critical issues
security advisories
maintainer responses
supported runtime compatibility
repository state
release history
```

together.

---

# 219. Archived Repository

An officially archived upstream repository is a strong signal requiring review.

---

# 220. Deprecated Package

If upstream marks a package deprecated:

```text
do not ignore indefinitely
```

Create a migration/replacement decision.

---

# 221. Abandoned Package Policy

When a direct dependency becomes abandoned:

```text
1. Assess current risk.
2. Identify maintained replacement.
3. Evaluate local ownership/fork viability.
4. Establish migration deadline based on risk.
5. Monitor until removed.
```

---

# 222. Critical Abandoned Package

A critical internet-facing/security dependency without maintainers SHOULD receive urgent replacement or controlled internal maintenance.

---

# 223. Stable Low-Risk Abandoned Package

A tiny stable dependency with no external attack surface MAY temporarily remain if:

```text
code is understood
risk is low
replacement cost is high
owner is assigned
```

---

# 224. No-Owner Package

A dependency whose upstream source disappears or becomes untraceable SHOULD be considered high risk.

---

# 225. Replacement Strategy

Dependency replacement SHOULD consider:

```text
API surface
behavior compatibility
data formats
migration
bundle/runtime impact
license
```

---

# 226. Adapter Boundaries

Critical/vendor-heavy dependencies SHOULD be hidden behind narrow internal interfaces where doing so materially improves replaceability.

---

# 227. Do Not Wrap Everything

Do not create wrappers around every library simply because it is external.

Wrappers are justified when they enforce:

```text
policy
domain semantics
vendor isolation
testability
```

---

# 228. Dependency Removal

Unused dependencies MUST be removed.

---

# 229. Dead Dependency

A dependency in the manifest but no longer needed creates needless:

```text
security
license
update
build
```

burden.

---

# 230. Unused Dependency Detection

Automated tooling MAY detect unused declared dependencies.

Results require interpretation for:

```text
dynamic imports
plugins
configuration-loaded modules
```

---

# 231. Remove Transitive Workarounds

If a direct dependency was added only to force a transitive version and the upstream issue is later resolved, remove the workaround.

---

# 232. Overrides / Resolutions

Package-manager overrides/resolutions MAY temporarily force transitive versions.

They require:

```text
reason
owner
compatibility test
removal condition
```

---

# 233. Override Risk

Forcing a transitive dependency outside the parent's declared compatible range can break runtime assumptions.

---

# 234. Override Documentation

Document why the override exists.

Example:

```text
Security fix for CVE-...
Remove after package X supports >=Y.
```

---

# 235. Patch-Package Mechanisms

Tools that patch installed dependency files MAY be used as temporary measures.

Patches MUST be:

```text
versioned
reviewed
tested
documented
```

---

# 236. Patch Drift

A patch must fail visibly if a new upstream version no longer matches its expected base.

---

# 237. Patching Is Not Long-Term Upstream Strategy

Long-lived local patches indicate:

```text
fork
replacement
upstream contribution
```

should be considered.

---

# 238. Package Removal Review

Removing a package SHOULD include:

```text
manifest
lockfile
imports
configuration
types
plugins
build configuration
license notices
```

where applicable.

---

# 239. Dependency Change PR

A new direct dependency SHOULD be visible in code review.

---

# 240. Dependency PR Description

For meaningful packages, PRs SHOULD explain:

```text
why needed
alternatives considered
runtime/dev scope
license
security/maintenance observations
```

proportional to risk.

---

# 241. High-Risk New Dependency Review

Critical dependency additions SHOULD receive:

```text
architecture/security/license
```

review where applicable.

---

# 242. Package Review Does Not Require Bureaucracy for Every Utility

Governance SHOULD be risk-proportionate.

A low-risk test helper does not require the same committee process as an authentication library.

---

# 243. Dependency Review Record

Important approval decisions SHOULD be discoverable through:

```text
PR
dependency catalog
architecture record
```

rather than disappearing into chat.

---

# 244. Automated Admission Policy

Organizations MAY enforce policy for:

```text
license
known malware
vulnerability threshold
registry
package age
provenance
```

before dependency installation.

---

# 245. Fail Closed Carefully

Admission policies SHOULD avoid blocking emergency security fixes because of poorly designed generic rules.

Explicit override governance is required.

---

# 246. Dependency Alerts

Alerts MUST route to an actual owning team.

A vulnerability inbox nobody monitors provides false assurance.

---

# 247. Update Ownership

Automated dependency PRs require a team responsible for reviewing/merging them.

---

# 248. Renovation Backlog

Do not allow hundreds of permanently open dependency updates to become normal.

That is a maintenance signal.

---

# 249. Major-Version Backlog

Repeatedly postponing major framework versions may create:

```text
unsupported runtime
security exposure
expensive future migration
```

---

# 250. Dependency Health Review

Critical applications SHOULD periodically review:

```text
outdated direct dependencies
unsupported dependencies
vulnerability backlog
abandoned packages
license exceptions
forks
overrides
```

---

# 251. Dependency Metrics

Organizations MAY monitor:

```text
known vulnerable dependencies
mean remediation time
outdated critical dependencies
unsupported packages
dependency count
```

as engineering-health indicators.

---

# 252. Metrics Are Diagnostic

Do not optimize package count or update frequency as individual-performance targets.

---

# 253. Dependency Documentation

Critical dependencies SHOULD document operational implications.

Examples:

```text
special configuration
upgrade caveats
native build requirements
security constraints
```

---

# 254. Dependency Testing

Dependency upgrades MUST execute the applicable test suite.

---

# 255. Contract Tests

External SDK/library upgrades affecting integration semantics SHOULD have contract/integration tests.

---

# 256. Snapshot Tests

Do not rely solely on snapshot tests to validate major dependency behavior changes.

---

# 257. Runtime Testing

Build success does not guarantee runtime compatibility.

Test meaningful execution paths.

---

# 258. Browser Compatibility

Frontend dependency upgrades SHOULD be verified against supported browsers where compatibility risk exists.

---

# 259. Framework Upgrade Testing

Framework upgrades require broader:

```text
routing
rendering
build
server/client
deployment
```

verification.

---

# 260. Database Driver Upgrade

Database driver upgrades SHOULD verify:

```text
connection behavior
transactions
TLS
pooling
serialization
```

where meaningful.

---

# 261. Authentication Library Upgrade

Authentication/security dependency upgrades SHOULD receive dedicated regression/security review.

---

# 262. Serialization Dependency Upgrade

Parsers/serializers may alter:

```text
accepted input
output format
security
```

and require compatibility testing.

---

# 263. Dependency Performance

A dependency upgrade MAY affect:

```text
bundle size
latency
memory
startup
```

Performance-sensitive dependencies SHOULD be monitored accordingly.

---

# 264. Dependency Rollback

Important dependency upgrades SHOULD remain easy to revert through normal source/version controls when no irreversible state change exists.

---

# 265. Schema Migration Coupling

Do not combine a dependency upgrade with unrelated irreversible database migration unless necessary.

---

# 266. Release Notes

Read release notes/changelogs for meaningful upgrades.

Do not rely exclusively on version-number differences.

---

# 267. Migration Guides

Major upgrades SHOULD follow official migration guidance where available.

---

# 268. Breaking Changes

Treat undocumented behavioral breakage as possible even in nominally compatible releases.

Tests remain necessary.

---

# 269. Package Provenance Incident

If upstream artifacts differ unexpectedly from previously known content:

```text
stop upgrade
verify publisher
verify registry
investigate provenance
```

before proceeding.

---

# 270. Yanked Packages

If a package version is removed/yanked from its registry, determine:

```text
why
whether existing artifacts remain trusted
whether builds remain reproducible
```

---

# 271. Registry Availability

Critical build pipelines SHOULD consider how dependency availability is maintained during registry outages.

Options include:

```text
trusted registry proxy
artifact cache
internal mirror
```

---

# 272. Offline / Air-Gapped Builds

Air-gapped environments SHOULD use a controlled approved dependency mirror.

Do not manually copy packages ad hoc.

---

# 273. Dependency Mirror Governance

Mirrors should preserve:

```text
artifact identity
integrity
license metadata
provenance where available
```

---

# 274. Cached Malicious Artifact

Caching does not convert an untrusted package into a trusted one.

Admission policy applies before or during ingestion.

---

# 275. Build Reproducibility

Production builds SHOULD resolve the same approved artifacts each time for a given lockfile/build input.

---

# 276. Network Fetch During Build

Uncontrolled arbitrary network downloads during production builds SHOULD be minimized.

---

# 277. Download Scripts

Dependencies or build scripts that fetch code dynamically outside the package manager require additional review.

---

# 278. Remote Script Execution

Avoid patterns such as:

```text
curl ... | sh
```

in trusted build pipelines unless the fetched content is pinned and verified through a controlled mechanism.

---

# 279. CDN Runtime Dependencies

Critical application functionality SHOULD NOT depend on unpinned third-party JavaScript loaded directly from arbitrary CDN URLs.

---

# 280. Subresource Integrity

When appropriate third-party static browser resources must be externally hosted, use integrity protections supported by the platform.

Self-hosting approved artifacts is often preferable for critical code.

---

# 281. Dependency Privacy

Third-party libraries may collect or transmit data.

Review privacy implications under Privacy & Data Governance Guidelines.

---

# 282. Telemetry SDKs

Analytics/monitoring SDKs require review for:

```text
captured data
network destinations
session replay
automatic instrumentation
```

---

# 283. AI SDKs

AI provider SDKs MUST NOT receive more customer data merely because convenient helper APIs expose it.

---

# 284. Dependency Network Behavior

Packages unexpectedly initiating outbound connections deserve investigation.

---

# 285. Dependency Configuration Defaults

Review security/privacy defaults of important libraries.

Do not assume secure behavior by default.

---

# 286. Package Name Ownership

Internal canonical dependency documentation SHOULD use exact ecosystem/package names to avoid ambiguity.

---

# 287. Package Renaming

If an upstream project renames/moves packages, verify that the new package is officially associated.

Do not follow unofficial lookalikes.

---

# 288. Deprecated Entry Point

Migrate away from deprecated package entry points before they disappear.

---

# 289. Dependency APIs

Application code SHOULD depend on documented public APIs.

Do not depend on package private internals.

---

# 290. Private Import Risk

Imports such as:

```text
package/dist/internal/foo
```

may break without SemVer guarantees.

Avoid unless explicitly documented by upstream.

---

# 291. Monkey Patching

Do not monkey-patch dependency internals as normal architecture.

Prefer:

```text
supported extension point
adapter
fork
upstream patch
```

---

# 292. Reflection on Internals

Using undocumented internal structures creates hidden version coupling.

Treat it as technical debt.

---

# 293. Dependency Isolation

Risky parsers/renderers MAY require stronger isolation/sandboxing according to Security Guidelines.

---

# 294. Untrusted Content Libraries

Packages processing attacker-controlled:

```text
archives
images
documents
HTML
templates
```

receive elevated security review.

---

# 295. Deserialization Libraries

Unsafe deserialization capabilities MUST remain disabled/restricted where applicable.

---

# 296. Template Libraries

Server-side templates MUST use safe escaping defaults.

---

# 297. Markdown/HTML Renderers

Rendering untrusted content requires appropriate sanitization policy.

---

# 298. Cryptography Dependencies

Cryptographic packages MUST be established implementations suitable for the required primitive/protocol.

---

# 299. Dependency Deprecation Process

When an internal dependency is deprecated:

```text
replacement identified
new adoption blocked
consumers inventoried
migration documented
removal tracked
```

---

# 300. Ban List

Organizations MAY maintain a prohibited dependency list for packages with:

```text
malware
incompatible licensing
critical abandonment
unsafe behavior
known replacements
```

---

# 301. Block New Use

Deprecated dependencies SHOULD be blocked from new adoption where tooling allows.

---

# 302. Existing Consumers

Blocking new use does not automatically remove existing risk.

Existing consumers need a migration plan.

---

# 303. Dependency Exception

Exceptions to dependency policy require:

```text
package/version
reason
owner
risk
expiry/review
```

---

# 304. Permanent Exceptions

Permanent dependency exceptions SHOULD be rare.

Most exceptions require periodic reassessment.

---

# 305. New Dependency Checklist

```text
□ Requirement identified
□ Platform/framework alternative checked
□ Existing package checked
□ Local implementation considered
□ Package name/source verified
□ Functional fit
□ Maintenance reviewed
□ Security reviewed
□ Dependency tree reviewed
□ Install scripts reviewed
□ Performance/bundle impact considered
□ License identified
□ Provenance considered
□ Owner identified
```

---

# 306. Security Review Checklist

```text
□ Known vulnerabilities checked
□ Maintainer/project identity verified
□ Package source verified
□ Publisher change checked
□ Install/build scripts understood
□ Runtime privileges understood
□ Transitive graph inspected
□ Provenance/signing checked where available
□ Security-response history considered
□ Risk tier assigned
```

---

# 307. Version Checklist

```text
□ Version policy understood
□ No floating latest/main
□ Compatible range intentional
□ Lockfile updated
□ Exact resolved version known
□ Runtime compatibility verified
□ Release notes reviewed
□ Breaking changes reviewed
```

---

# 308. Lockfile Checklist

```text
□ Canonical lockfile committed
□ One package manager
□ Frozen CI install
□ Manifest matches lockfile
□ New transitive packages understood
□ Registry/source changes reviewed
□ Integrity metadata preserved
□ Unexpected graph churn investigated
```

---

# 309. License Checklist

```text
□ License identified
□ SPDX identifier where possible
□ Commercial use permitted
□ Distribution obligations understood
□ Copyleft implications reviewed
□ NOTICE/attribution obligations known
□ Transitive licenses considered
□ License change checked
□ Exception approved where required
```

---

# 310. Provenance Checklist

```text
□ Official package identified
□ Official source repository identified
□ Expected publisher verified
□ Artifact integrity available
□ Provenance available where supported
□ Signature/attestation verified where required
□ Source-to-build relationship understood
□ No suspicious publisher/source change
```

---

# 311. Security Update Checklist

```text
□ Advisory affects resolved version
□ Exploitability evaluated
□ Exposure evaluated
□ Fixed version identified
□ Upgrade tested
□ Suppression avoided or justified
□ Deployment priority established
□ SBOM/inventory updated
□ Remediation verified
```

---

# 312. Abandoned Dependency Checklist

```text
□ Project actually abandoned?
□ Current security exposure
□ Runtime/platform compatibility
□ Replacement identified
□ Fork/local ownership evaluated
□ License permits intended strategy
□ Migration owner
□ Migration deadline
□ New use blocked where appropriate
```

---

# 313. Vendoring Checklist

```text
□ Vendoring justified
□ Upstream recorded
□ Version/commit recorded
□ License retained
□ Local changes identifiable
□ Update mechanism documented
□ Vulnerability monitoring preserved
□ Owner assigned
```

---

# 314. Fork Checklist

```text
□ Fork is necessary
□ Upstream alternative considered
□ Maintenance owner exists
□ Security-update path defined
□ Upstream merge process defined
□ Licensing checked
□ Release mechanism defined
□ Exit strategy defined
```

---

# 315. Dependency Upgrade Checklist

```text
□ Release notes read
□ Migration guide read
□ Compatibility checked
□ Lockfile reviewed
□ Tests pass
□ Integration tests pass where relevant
□ Security state improved/not regressed
□ License unchanged/acceptable
□ Performance impact considered
□ Rollback available
```

---

# 316. Definition of Done — New Dependency

A new direct dependency is ready when:

```text
✓ Requirement justifies it
✓ Existing alternatives inspected
✓ Package/source identity verified
✓ Appropriate risk review completed
✓ Version policy established
✓ Lockfile updated
✓ Security status acceptable
✓ License acceptable
✓ Transitive impact understood
✓ Provenance considered
✓ Tests pass
✓ Owner exists
```

---

# 317. Definition of Done — Dependency Upgrade

An upgrade is complete when:

```text
✓ Intended version resolved
✓ Lockfile reflects change
✓ Release/migration notes reviewed
✓ Security findings reviewed
✓ License remains acceptable
✓ Automated tests pass
✓ Critical integrations verified
✓ Production artifact contains expected version
```

---

# 318. Definition of Done — Vulnerability Remediation

A dependency vulnerability is remediated only when:

```text
✓ Affected deployment identified
✓ Correct fix selected
✓ Fixed artifact built
✓ Tests pass
✓ Production deployment completed
✓ Actual deployed version/patch verified
✓ Temporary suppression removed where applicable
```

Updating a manifest alone is not remediation.

---

# 319. Definition of Done — Dependency Removal

Removal is complete when:

```text
✓ Imports removed
✓ Manifest removed
✓ Lockfile updated
✓ Transitives recalculated
✓ Configuration removed
✓ Build scripts updated
✓ License notices updated if needed
✓ Tests pass
```

---

# 320. Dependency Anti-Patterns

Avoid:

```text
npm install random-package
```

before checking existing capabilities.

Avoid:

```text
package added because AI suggested it
```

without verification.

Avoid:

```text
latest
```

in production dependency resolution.

Avoid:

```text
Git dependency from main
```

for production.

Avoid:

```text
delete lockfile and reinstall
```

as routine troubleshooting.

Avoid:

```text
three competing lockfiles
```

in one workspace.

Avoid:

```text
CI modifies lockfile automatically
```

during normal verification.

Avoid:

```text
vulnerability scanner disabled because noisy
```

Avoid:

```text
critical CVE suppressed forever
```

Avoid:

```text
package popular
therefore secure
```

Avoid:

```text
package old
therefore abandoned
```

Avoid:

```text
repository active
therefore secure
```

Avoid:

```text
signed release
therefore safe
```

Avoid:

```text
provenance generated
but never verified
```

Avoid:

```text
no license
therefore free to use
```

Avoid:

```text
source available
therefore open source
```

Avoid:

```text
license scanner says MIT
therefore no review ever needed
```

Avoid:

```text
entire utility framework
for one helper
```

Avoid:

```text
custom crypto
to avoid dependency
```

Avoid:

```text
auth library copied into app
to avoid upgrades
```

Avoid:

```text
unmaintained auth library
kept because migration is inconvenient
```

Avoid:

```text
private package name resolves from public registry
```

Avoid:

```text
install script runs with production secrets
without review
```

Avoid:

```text
curl remote script | shell
```

in privileged builds.

Avoid:

```text
fork dependency
then never sync security fixes
```

Avoid:

```text
vendored code
with unknown upstream
```

Avoid:

```text
local patch
with no removal condition
```

Avoid:

```text
dependency override
nobody remembers why
```

Avoid:

```text
unused packages left forever
```

Avoid:

```text
all dependency updates batched annually
```

Avoid:

```text
SBOM lists package
but shipped artifact differs
```

---

# 321. AI Dependency Rules

AI coding agents MUST inspect existing dependencies before introducing new packages.

---

# 322. AI Search-Before-Add Rule

AI MUST check:

```text
standard library
platform APIs
framework capability
existing project dependency
existing internal library
```

before recommending a new dependency.

---

# 323. AI Verification Rule

AI MUST NOT assume a package exists or is trustworthy from its name.

Before adoption, verify:

```text
registry presence
official source
publisher
documentation
```

---

# 324. AI Slopsquatting Rule

An unfamiliar AI-generated package name MUST be treated as potentially unsafe until independently verified.

---

# 325. AI Install Rule

AI MUST NOT add packages opportunistically merely to reduce implementation effort.

---

# 326. AI Local-Code Rule

AI SHOULD prefer a small local implementation when:

```text
logic is trivial
stable
safe
easy to test
```

and a new dependency would add disproportionate maintenance.

---

# 327. AI Security-Library Rule

AI MUST prefer established implementations for security-sensitive protocols/algorithms rather than writing custom alternatives.

---

# 328. AI Package-Manager Rule

AI MUST use the repository's canonical package manager.

---

# 329. AI Lockfile Rule

AI MUST update the canonical lockfile whenever dependency resolution changes.

---

# 330. AI Lockfile Integrity Rule

AI MUST NOT regenerate the entire lockfile unnecessarily.

---

# 331. AI Version Rule

AI MUST NOT use:

```text
latest
*
main
HEAD
```

as production dependency versions.

---

# 332. AI Range Rule

AI SHOULD follow established repository version-range policy rather than inventing its own.

---

# 333. AI Major-Upgrade Rule

AI MUST NOT silently introduce a major dependency upgrade while implementing an unrelated feature.

---

# 334. AI Security Update Rule

When fixing a dependency vulnerability, AI MUST verify the fixed version is actually resolved in the lockfile/build.

---

# 335. AI Vulnerability Rule

AI MUST NOT silence a vulnerability alert solely to make CI green.

---

# 336. AI Suppression Rule

Any suppression AI adds MUST include:

```text
reason
scope
owner/review context
```

according to repository conventions.

---

# 337. AI Provenance Rule

For critical dependencies, AI SHOULD prefer artifacts with trustworthy provenance/signing where ecosystem support exists.

---

# 338. AI License Rule

AI MUST inspect package license before introducing a new external dependency.

---

# 339. AI License-Uncertainty Rule

If license is:

```text
missing
custom
ambiguous
restricted
```

AI SHOULD flag review rather than assume permissive use.

---

# 340. AI Transitive Rule

AI SHOULD inspect major transitive expansion when adding a new direct package.

---

# 341. AI Install-Script Rule

AI MUST flag dependencies that introduce unexpected install-time scripts into privileged environments.

---

# 342. AI Bundle Rule

For browser dependencies, AI SHOULD evaluate likely bundle/runtime cost.

---

# 343. AI Duplicate-Functionality Rule

AI MUST NOT add a second library providing an existing capability without explicit justification.

---

# 344. AI Abandoned-Package Rule

AI SHOULD NOT introduce a deprecated/archived package when a maintained equivalent exists.

---

# 345. AI Fork Rule

AI MUST NOT casually fork a dependency.

It should first evaluate:

```text
upgrade
replacement
upstream contribution
local adapter
```

---

# 346. AI Vendoring Rule

When vendoring code, AI MUST preserve:

```text
upstream identity
license
version
local modification record
```

---

# 347. AI Private-API Rule

AI SHOULD NOT import undocumented package internals merely to avoid a supported public API limitation.

---

# 348. AI Dependency-Removal Rule

When removing feature code, AI SHOULD check whether its dependency can also be removed.

---

# 349. AI CI Rule

AI-generated dependency changes SHOULD preserve:

```text
frozen installs
vulnerability scanning
license scanning
provenance controls
```

already established by CI.

---

# 350. AI Gold Rule

When uncertain:

```text
Platform capability
>
Existing approved dependency
>
Small owned implementation
>
Mature maintained dependency
>
Heavy dependency
>
Unverified package
```

For existing packages:

```text
Upgrade
>
Replace
>
Supported backport
>
Temporary owned patch
>
Permanent vulnerable abandonment
```

---

# 351. Golden Dependency Rules

**1. Every dependency must justify its long-term ownership cost.**

**2. Check the platform, framework, and existing packages before adding another dependency.**

**3. Do not reinvent complex security or protocol implementations merely to avoid dependencies.**

**4. Small stable logic may be cheaper to own directly than a package.**

**5. Direct and transitive dependencies both count as attack surface.**

**6. Build tools and CI plugins are dependencies too.**

**7. Package popularity is a signal, not proof of trust.**

**8. Verify package identity, source, and publisher before adoption.**

**9. AI-recommended package names are untrusted until independently verified.**

**10. Unexpected install-time execution receives heightened scrutiny.**

**11. Production builds use controlled approved registries.**

**12. Internal package namespaces are protected against dependency confusion.**

**13. Production dependency resolution never uses uncontrolled `latest`, `main`, or equivalent floating identifiers.**

**14. Applications commit and enforce their canonical lockfiles.**

**15. CI uses frozen/immutable lockfile installation.**

**16. Lockfile changes are security-relevant review material.**

**17. Dependency updates happen continuously in manageable increments.**

**18. Known vulnerabilities always have an explicit owner and disposition.**

**19. Vulnerability scanners are triage inputs, not automatic truth and not optional noise.**

**20. Suppressions are narrow, documented, and reviewable.**

**21. Unsupported dependency versions require upgrade, replacement, or formal maintained backports.**

**22. Package provenance is verified where assurance requirements justify it.**

**23. Signatures prove identity/integrity, not correctness.**

**24. SBOMs reflect the actual shipped artifact.**

**25. Every external dependency has known licensing status.**

**26. Publicly available code is not automatically reusable.**

**27. No-license code is not assumed permitted.**

**28. SPDX identifiers are preferred for standardized license metadata.**

**29. License changes between versions require review.**

**30. Required attribution and notices are preserved.**

**31. Critical dependencies have internal ownership even when maintained externally.**

**32. Unused dependencies are removed.**

**33. Duplicate libraries for the same responsibility require justification.**

**34. Browser dependencies are reviewed for bundle/runtime cost.**

**35. Privileged dependencies receive stronger review than low-risk presentation dependencies.**

**36. Vendoring transfers maintenance responsibility to the organization.**

**37. Forking creates an ongoing security and upgrade obligation.**

**38. Local dependency patches have explicit provenance and an exit condition.**

**39. Package-manager overrides are temporary, documented, and tested.**

**40. An inactive project is not automatically abandoned; evaluate maintenance evidence contextually.**

**41. An archived, vulnerable, unsupported critical dependency requires a migration decision.**

**42. Build reproducibility includes dependency provenance and resolution.**

**43. Arbitrary remote code downloads during trusted builds are minimized.**

**44. Third-party SDK privacy behavior is reviewed, not assumed.**

**45. Dependency upgrades run meaningful behavioral tests, not only compilation.**

**46. Critical dependency changes are easy to trace to a PR and owner.**

**47. Dependency governance is proportional to risk rather than uniform bureaucracy.**

**48. Dependency exceptions have owners and review dates.**

**49. Dependency health is maintained continuously, not only during security incidents.**

**50. If the organization cannot identify, reproduce, patch, replace, license, and own a dependency, that dependency is not adequately governed.**

---

# 352. Canonical Dependency Standard

The organizational standard is:

> **Dependencies are adopted deliberately rather than opportunistically. Before introducing an external package, engineers inspect platform and framework capabilities, existing approved dependencies, internal libraries, and the cost of a small owned implementation. Third-party packages are selected according to functional fit, maintenance, security posture, provenance, dependency-tree size, performance impact, licensing, compatibility, ownership, and replacement cost. Security-sensitive functionality uses mature proven implementations rather than bespoke reimplementation solely to reduce package count.**

> **Dependency resolution is deterministic and reviewable. Applications use one canonical package manager and committed lockfile, CI performs frozen or immutable installation, and production resolution avoids floating versions such as `latest`, mutable branches, or uncontrolled ranges. Package identity, registry origin, integrity metadata, publisher identity, and provenance are verified according to risk. Build tools, CI actions, container images, SDKs, plugins, transitive packages, and internal packages are governed as dependencies rather than treated as trusted infrastructure by default.**

> **Dependencies are continuously maintained. Automated tooling identifies new versions and known vulnerabilities, while owning teams assess exploitability, exposure, compatibility, and remediation priority. Fixed supported versions are preferred, followed by supported vendor backports or replacement. Private patches and forks are temporary or intentionally maintained commitments with explicit provenance, testing, ownership, security-update processes, and exit strategies. Vulnerability findings are neither blindly ignored nor blindly treated as proof of exploitability; every material finding receives an explicit disposition.**

> **Every external dependency has known licensing status before production use. Standard SPDX identifiers and expressions are preferred for machine-readable licensing metadata. License compatibility, attribution, notice, copyleft, distribution, network-use, commercial, and custom-license obligations are reviewed according to the product model, including relevant transitive dependencies. Public availability, source availability, or absence of a license is never interpreted automatically as unrestricted permission to reuse software.**

> **Critical dependencies have accountable internal owners and are monitored for upstream health. Deprecated, archived, unsupported, compromised, or genuinely abandoned packages trigger a deliberate decision to upgrade, replace, fork, vendor, maintain a controlled backport, or formally accept time-bounded risk. Unused packages, obsolete overrides, temporary patches, duplicate functionality, and stale forks are removed rather than allowed to become permanent dependency debt.**

A production-grade dependency architecture should make it easy to answer:

```text
Why do we need this package?
Could the platform already do it?
Do we already have another package for it?
Who owns our use of it?
Which exact version is deployed?
Which lockfile resolved it?
Where was the package obtained?
Who published it?
Can its provenance be verified?
Which transitive dependencies does it introduce?
Does it execute code during installation?
Does it contain a known vulnerability?
Who owns remediation?
Is the current version supported?
What license governs it?
Are there notice/source obligations?
Has its license changed?
How large is its browser/runtime cost?
What happens if upstream disappears?
Can we replace it?
Are we carrying local patches?
Are those patches documented?
When will temporary overrides/forks be removed?
```

If those questions cannot be answered, the dependency is functioning as unmanaged third-party code rather than a governed engineering component.

A few distinctions are especially important. OWASP explicitly recommends dependency inventory, automated vulnerability monitoring, and lockfile/version controls; it also emphasizes that **silencing a scanner or merely changing a version string is not remediation** when the deployed artifact remains vulnerable. citeturn203050search1turn203050search4turn203050search10

For provenance, SLSA 1.2 defines provenance as verifiable information about **where, when, and how an artifact was produced**, but provenance does not itself establish that the code is safe. OpenSSF Scorecard is similarly useful as a collection of project-security signals rather than a single approval score. citeturn203050search3turn203050search5

For licensing, the current SPDX specification is **SPDX 3.0**, and the SPDX License List provides standardized identifiers and expressions specifically so license information can be represented consistently and machine-readably. citeturn203050search14turn203050search11

In the master hierarchy, **Dependencies** sits directly before Git & Repository:

**… → Analytics → Privacy & Data Governance → Configuration & Environments → Dependencies → Git & Repository → CI/CD → Infrastructure & Deployment → Backup & Disaster Recovery → Feature Flags → Release & Versioning → Documentation → Governance.**
