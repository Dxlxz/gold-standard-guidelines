---
id: "governance"
title: "Governance Guidelines — Gold Standard 2026"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["process", "governance"]
applies_to: ["team"]
related: ["security"]
legacy_number: 48
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 74188
provenance: baseline

---

Canonical placement: **AI/LLM → Governance**. Governance sits last because it does not replace domain standards; it defines **who owns them, how they evolve, how exceptions are controlled, how decisions are reviewed, and how compliance becomes enforceable rather than aspirational**.

# Governance Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for engineering governance, including:

- standards ownership;
- policy hierarchy;
- normative requirements;
- standards lifecycle;
- standards registry;
- RFCs;
- ADRs;
- architecture review;
- exceptions;
- waivers;
- deprecations;
- technical debt;
- maturity levels;
- Definition of Done enforcement;
- policy-as-code;
- compliance evidence;
- engineering review boundaries;
- standards adoption;
- local standards;
- paved roads;
- governance metrics;
- continuous improvement.

The objective is to make engineering governance:

```text
Explicit
Owned
Risk-based
Versioned
Reviewable
Enforceable
Evidence-based
Exception-aware
Adaptable
Low-friction
```

The core principle is:

> **A standard without an owner becomes stale, a requirement without enforcement becomes optional, and an exception without expiry becomes the new architecture.**

---

# 2. Normative Language

The corpus uses:

- **MUST** — mandatory requirement.
- **MUST NOT** — mandatory prohibition.
- **SHOULD** — expected default; deviation requires a reason.
- **SHOULD NOT** — generally prohibited unless justified.
- **MAY** — optional.

Uppercase normative terms are deliberate.

---

# 3. Requirement Interpretation

A **MUST** means:

```text
Implement
or
hold an approved exception
```

A **SHOULD** means:

```text
Use as default
or
document why another approach is superior for the case
```

A **MAY** creates no compliance obligation.

---

# 4. No Informal MUST

Documents MUST NOT casually use uppercase:

```text
MUST
MUST NOT
SHOULD
```

unless they are intentionally creating normative requirements.

---

# 5. Governance Is Not Bureaucracy

Governance exists to reduce:

```text
Repeated decisions
Architectural drift
Unbounded risk
Hidden exceptions
Inconsistent systems
Long-term maintenance cost
```

It SHOULD NOT exist merely to create approval meetings.

---

# 6. Governance Principle

Prefer:

```text
Guardrails
+
paved roads
+
automation
```

over:

```text
Committees
+
manual permission
+
checklists for everything
```

---

# 7. Risk-Based Governance

The amount of governance MUST scale with:

```text
Blast radius
Irreversibility
Security impact
Data sensitivity
Customer impact
Cost
Contractual impact
Operational complexity
```

---

# 8. Routine Engineering

Routine work that follows existing standards SHOULD NOT require architecture committee approval.

---

# 9. Exceptional Engineering

Architecture/governance review SHOULD focus on:

```text
New boundaries
New risks
New irreversible commitments
New organizational dependencies
Exceptions
```

---

# 10. Standards Are Organizational Interfaces

A standard defines the agreement between:

```text
Product teams
Platform teams
Security
Data
Operations
Design
Architecture
Governance
```

about how a class of engineering decision should be made.

---

# 11. One Authoritative Source

Each engineering rule MUST have one authoritative source.

---

# 12. Cross-Reference Instead of Duplication

If Security already defines secret management, another standard SHOULD say:

```text
Follow Security Guidelines.
```

rather than redefining secret-management rules.

---

# 13. Avoid Competing Standards

The corpus MUST NOT maintain multiple contradictory standards for the same concern.

---

# 14. Standards Hierarchy

Recommended hierarchy:

```text
Principles
↓
Policies
↓
Standards
↓
Guidelines / Patterns
↓
Procedures / Runbooks
↓
Implementation
```

---

# 15. Principles

Principles explain enduring engineering values.

Examples:

```text
Least privilege
Server-authoritative security
One source of truth
Prefer reversible change
```

---

# 16. Policies

Policies define organizational obligations.

Example:

```text
Production secrets MUST use approved secret management.
```

---

# 17. Standards

Standards define mandatory or recommended engineering implementation expectations.

---

# 18. Guidelines

Guidelines provide preferred approaches where multiple compliant implementations may exist.

---

# 19. Patterns

Patterns provide reusable implementation structures.

---

# 20. Procedures

Procedures/runbooks explain exact operational steps.

---

# 21. Implementation Does Not Override Standard

Existing code MUST NOT be interpreted as more authoritative than the current standard merely because it already exists.

Legacy behavior may instead be:

```text
compliant
exception
technical debt
deprecated
```

---

# 22. External Requirements

External:

```text
Law
Regulation
Contract
Industry requirement
Security obligation
```

override internal convenience.

---

# 23. Standards Cannot Waive Law

An internal standards owner MUST NOT approve an exception that unlawfully overrides applicable legal/regulatory requirements.

---

# 24. Governance Corpus

The organization SHOULD maintain one canonical standards corpus.

---

# 25. Standards Registry

Every canonical standard SHOULD appear in a registry containing:

```text
ID
Title
Version
Status
Owner
Maintainers
Review date
Dependencies
Applicable systems
```

---

# 26. Stable Standard ID

A standard SHOULD have a stable identifier independent of its display title.

---

# 27. Standard Version

Material changes SHOULD create a visible version or revision history.

---

# 28. Standard Status

Canonical lifecycle:

```text
Draft
Proposed
Active
Deprecated
Retired
```

---

# 29. Draft

Draft means:

```text
under construction
not yet normative
```

unless explicitly declared otherwise.

---

# 30. Proposed

Proposed means:

```text
ready for organizational review
not yet active
```

---

# 31. Active

Active means the standard governs relevant new engineering work.

---

# 32. Deprecated Standard

Deprecated means:

```text
still referenced by existing systems
new adoption prohibited or discouraged
replacement exists or retirement planned
```

---

# 33. Retired Standard

Retired means it no longer governs active engineering.

Historical copies SHOULD remain available for audit/reference.

---

# 34. Standard Owner

Every Active standard MUST have one accountable owner.

---

# 35. Ownership ≠ Authorship

The person who wrote the standard does not automatically remain its permanent owner.

---

# 36. Standard Owner Responsibilities

The owner MUST ensure:

```text
Correctness
Current relevance
Conflict resolution
Exception review
Periodic review
Deprecation
Enforcement mapping
```

---

# 37. Maintainers

Standards MAY have multiple maintainers.

Maintainers perform operational stewardship.

---

# 38. Accountable Owner

Accountability SHOULD remain clearly assignable even when several maintainers exist.

---

# 39. Domain Ownership

Standards SHOULD be owned by the team/function closest to the domain.

Examples:

```text
Security → Security owner
Data → Data/platform owner
Design System → Design-system owner
CI/CD → Platform/release owner
```

---

# 40. Governance Owner

A central governance function MAY coordinate the corpus.

It SHOULD NOT become the expert owner of every domain standard.

---

# 41. Governance Council

A governance/architecture council MAY exist to:

```text
Resolve cross-domain conflicts
Review foundational RFCs
Approve high-impact exceptions
Coordinate deprecations
Review maturity
```

---

# 42. Governance Council Is Not PR Review

The council SHOULD NOT review ordinary feature pull requests.

---

# 43. Owner Backup

Critical standards SHOULD have a secondary maintainer or owning team.

---

# 44. Orphaned Standard

An Active standard with no accountable owner MUST be reassigned or deprecated.

---

# 45. Owner Change

Ownership changes MUST update the registry.

---

# 46. Standards Review Cadence

Every Active standard SHOULD have a defined review cadence.

---

# 47. Event-Driven Review

A standard MUST also be reviewed when material external/internal changes occur.

Examples:

```text
Major incident
Major framework change
New regulation
New architecture model
Provider deprecation
Material security advisory
```

---

# 48. Review Does Not Mean Rewrite

A review MAY conclude:

```text
No change required.
```

That conclusion SHOULD still be recorded.

---

# 49. Stale Standard

A standard that has exceeded its review window SHOULD be marked for review rather than silently assumed current.

---

# 50. Standards Change Classes

Changes SHOULD be classified as:

```text
Editorial
Clarification
Compatible requirement change
Breaking governance change
Emergency update
```

---

# 51. Editorial Change

An editorial change does not materially change obligations.

---

# 52. Clarification

Clarification removes ambiguity without changing intended behavior.

---

# 53. Compatible Requirement Change

A compatible change introduces requirements most compliant systems already satisfy or can adopt without significant migration.

---

# 54. Breaking Governance Change

A breaking change may invalidate previously compliant systems.

---

# 55. Breaking Change Migration

Breaking standards changes SHOULD include:

```text
Effective date
Affected scope
Migration guidance
Transition period
Owner
```

---

# 56. Immediate Security Change

Critical security requirements MAY become effective immediately where risk justifies it.

---

# 57. Standards Changelog

Material changes SHOULD have a changelog.

---

# 58. Requirement IDs

Important normative requirements SHOULD have stable identifiers where automated compliance/evidence benefits from them.

Example:

```text
SEC-AUTHZ-001
DATA-MIG-004
GOV-EXC-002
```

---

# 59. Requirement Registry

Large organizations SHOULD maintain a requirement/control registry linking:

```text
Requirement
Standard
Scope
Owner
Enforcement
Evidence
Exception process
```

---

# 60. Requirement Duplication

One requirement SHOULD NOT have multiple unrelated identifiers merely because several standards refer to it.

---

# 61. Applicability

Every standard MUST make clear which systems it applies to.

---

# 62. Applicability Profile

Examples:

```text
All repositories
Public web applications
Multi-tenant SaaS
Systems processing payments
AI-enabled products
Production infrastructure
```

---

# 63. Non-Applicability

A requirement that genuinely does not apply SHOULD be recorded as:

```text
Not applicable
```

with a short reason where evidence is required.

---

# 64. Not Applicable ≠ Exception

If a standard explicitly does not apply to a system, no exception is required.

---

# 65. Standard Conflict

When two active standards conflict:

```text
Stop
Identify conflict
Escalate to owners
Resolve authoritative rule
Update documentation
```

Do not let each implementation choose independently.

---

# 66. Conflict Resolution

Conflict resolution SHOULD consider:

```text
External obligation
Security/privacy
Domain authority
Specificity
Recency
Architecture impact
```

---

# 67. Specific vs General

A domain-specific standard MAY refine a general standard.

It MUST NOT silently contradict it.

---

# 68. Local Standards

Teams MAY define local standards when:

```text
Canonical corpus is silent
Local domain genuinely differs
Rule does not weaken organization-wide requirements
```

---

# 69. Local Standard Scope

Local standards MUST state their scope clearly.

---

# 70. Local Standard Cannot Weaken MUST

A team-local standard MUST NOT downgrade an organizational MUST without an approved exception.

---

# 71. Promotion

A useful local standard SHOULD be promoted to the canonical corpus when it becomes broadly applicable.

---

# 72. Standard Profiles

Products MAY define applicability profiles such as:

```text
Public website profile
Internal-tool profile
High-security profile
Payment profile
Multi-tenant SaaS profile
```

---

# 73. Profiles Are Compositions

Profiles SHOULD reference existing requirements.

They SHOULD NOT duplicate entire standards.

---

# 74. Paved Road

For common requirements, governance SHOULD provide a paved-road implementation.

---

# 75. Paved Road Definition

A paved road is:

```text
Approved
Supported
Documented
Tested
Maintained
Default
```

---

# 76. Paved Road Benefits

Teams following the paved road SHOULD face less review burden.

---

# 77. Escape Hatch

Paved roads SHOULD allow legitimate alternatives through documented engineering judgment/exception processes.

---

# 78. Golden Path ≠ Lock-In

The purpose of a golden path is to make the compliant solution easiest—not to prohibit all alternatives without reason.

---

# 79. RFC Purpose

An RFC is used to review a consequential proposal **before** the organization becomes committed to it.

---

# 80. RFC Trigger

An RFC SHOULD be required for decisions involving one or more of:

```text
New architectural boundary
New platform/runtime
New persistent data ownership
New public API contract
New tenant-isolation model
New authentication model
New payment architecture
New production infrastructure class
Cross-team platform dependency
Major irreversible migration
Major vendor lock-in
Material security/privacy impact
```

---

# 81. RFC Not Required

RFC SHOULD NOT be required for:

```text
Routine implementation
Small refactoring
Normal feature work
Following existing approved patterns
Reversible local choices
```

---

# 82. RFC Cost Principle

The expected cost of the RFC process SHOULD be lower than the expected cost of correcting a bad decision later.

---

# 83. RFC Before Implementation

RFC review SHOULD occur before substantial irreversible implementation.

---

# 84. Prototype Before RFC Decision

A prototype MAY precede final RFC acceptance when uncertainty needs empirical evidence.

---

# 85. Prototype Is Not Approval

Prototype existence does not automatically approve the architecture.

---

# 86. RFC Template

A canonical RFC SHOULD contain:

```text
Title
Status
Authors
Owner
Context/problem
Goals
Non-goals
Constraints
Proposal
Alternatives
Trade-offs
Security/privacy
Data implications
Operational implications
Migration
Rollback
Open questions
Decision
```

---

# 87. RFC Problem First

An RFC MUST explain the problem before presenting technology.

---

# 88. RFC Goals

Goals SHOULD state measurable desired outcomes.

---

# 89. RFC Non-Goals

Non-goals prevent the proposal from expanding indefinitely.

---

# 90. RFC Constraints

Constraints MAY include:

```text
Compliance
Budget
Latency
Migration
Team capability
Existing architecture
Timeline
```

---

# 91. Alternatives

A consequential RFC SHOULD document credible alternatives.

---

# 92. No Strawman Alternatives

Alternatives SHOULD be represented fairly.

---

# 93. Status Quo

For major architecture changes, the current architecture SHOULD be considered as an explicit alternative.

---

# 94. Trade-Offs

RFCs SHOULD document disadvantages of the proposed option.

---

# 95. No Perfect Architecture Claims

Avoid:

```text
This has no downside.
```

Meaningful architecture always carries trade-offs.

---

# 96. Decision Criteria

Decision criteria SHOULD be written before final selection where useful.

---

# 97. Evidence

RFC decisions SHOULD use:

```text
Benchmarks
Prototype results
Incident evidence
Cost estimates
Operational history
```

where uncertainty can be measured.

---

# 98. RFC Reviewers

Reviewers SHOULD represent materially affected domains.

---

# 99. Reviewer Count

More reviewers are not automatically better.

Invite people with:

```text
Relevant expertise
Ownership
Affected responsibilities
```

---

# 100. Review Deadline

RFCs SHOULD have bounded review periods.

---

# 101. No Endless RFC

An RFC MUST eventually move to:

```text
Accepted
Rejected
Withdrawn
Superseded
```

---

# 102. RFC Consensus

RFC decisions SHOULD aim for informed rough consensus, not unanimous preference.

---

# 103. Consensus Does Not Mean Everyone Prefers It

A reviewer MAY disagree personally while accepting that objections were adequately considered.

---

# 104. Objections

Material technical objections MUST be addressed.

---

# 105. Silence

Lack of comments SHOULD NOT automatically be interpreted as strong consensus for high-impact decisions.

---

# 106. Decision Owner

Every RFC MUST identify who makes the final decision when consensus cannot be reached.

---

# 107. Decision Escalation

Escalation SHOULD resolve:

```text
Risk ownership
Organizational priority
Conflicting constraints
```

not simply override engineering evidence arbitrarily.

---

# 108. RFC Voting

Simple majority vote SHOULD NOT be the normal mechanism for technical architecture decisions.

---

# 109. RFC Outcome

Accepted RFCs SHOULD record:

```text
Decision
Date
Approver/decision owner
Outstanding follow-ups
```

---

# 110. RFC Immutability

After acceptance, historical RFC text SHOULD remain stable.

Substantial later changes SHOULD use:

```text
amendment
superseding RFC
ADR
```

rather than rewriting history invisibly.

---

# 111. RFC Supersession

A superseded RFC MUST point to its replacement.

---

# 112. ADR Purpose

An Architecture Decision Record captures a specific architectural decision and its context.

---

# 113. RFC vs ADR

Canonical distinction:

```text
RFC = proposal + review process
ADR = durable decision record
```

---

# 114. RFC May Produce ADR

A significant RFC MAY result in one or more ADRs.

---

# 115. ADR Without RFC

A local architecture decision MAY need an ADR but not an RFC.

---

# 116. ADR Template

Recommended:

```text
Title
Status
Context
Decision
Consequences
Alternatives
Date
Owner
Related RFCs
```

---

# 117. ADR Status

ADR status MAY include:

```text
Proposed
Accepted
Deprecated
Superseded
```

---

# 118. ADR Immutability

Accepted ADRs SHOULD remain as historical records.

Do not rewrite the past after a new decision.

---

# 119. Superseded ADR

A new ADR SHOULD supersede the old one explicitly.

---

# 120. ADR Location

ADRs SHOULD live close enough to the relevant system/repository that engineers can discover them easily.

---

# 121. Architecture Review Purpose

Architecture review exists to detect:

```text
Cross-boundary risk
Irreversibility
Systemic inconsistency
Missing operational design
```

before it becomes expensive.

---

# 122. Architecture Review Is Not Design Ownership

Architecture reviewers SHOULD challenge and advise.

The implementing team remains responsible for understanding and operating the design.

---

# 123. Architecture Review Triggers

Formal architecture review SHOULD be triggered by material changes to:

```text
Trust boundaries
Authentication
Authorization
Tenant isolation
Data ownership
Public API contracts
Database topology
Event contracts
Payment flows
AI autonomous tools
Infrastructure topology
Critical third-party dependency
Residency
Disaster recovery
```

---

# 124. Risk-Based Review

Not every trigger requires the same review depth.

---

# 125. Review Levels

Recommended:

```text
L0 — Team review
L1 — Domain-owner review
L2 — Cross-domain architecture review
L3 — Executive/risk approval
```

---

# 126. L0 Review

Appropriate for:

```text
Local
Reversible
Low-impact
Standard-conforming
```

changes.

---

# 127. L1 Review

Appropriate when one specialized domain requires oversight.

Example:

```text
Security
Data
Accessibility
Payments
```

---

# 128. L2 Review

Appropriate for changes crossing multiple major system boundaries.

---

# 129. L3 Review

Reserved for decisions involving substantial:

```text
Business risk
Legal risk
Financial commitment
Strategic lock-in
```

---

# 130. Review Checklist

Architecture reviews SHOULD inspect:

```text
Problem
Boundaries
Data ownership
Contracts
Security
Failure modes
Observability
Migration
Operations
Rollback
Cost
```

---

# 131. Architecture Diagrams

Material architecture reviews SHOULD include appropriate diagrams.

---

# 132. Diagrams Are Supporting Evidence

A diagram alone is not architecture documentation.

---

# 133. Architecture Description

Important systems SHOULD maintain an architecture description appropriate to their complexity.

---

# 134. Current-State Architecture

Documentation SHOULD distinguish:

```text
Current state
Target state
Migration state
```

---

# 135. Architecture Review Outcome

Outcome SHOULD be one of:

```text
Approved
Approved with conditions
Changes requested
Escalated
```

---

# 136. Conditions

Conditional approval MUST identify:

```text
Required condition
Owner
Deadline
Verification
```

---

# 137. No Verbal Approval

High-impact review outcomes SHOULD be recorded.

---

# 138. Review Expiry

An architecture approval MAY require re-review if implementation changes materially.

---

# 139. Significant Drift

If delivered implementation differs materially from reviewed design, the original approval does not automatically apply.

---

# 140. Exception Principle

An exception is an explicit temporary decision to deviate from an applicable normative requirement.

---

# 141. Exception Is Not Non-Applicability

If a requirement does not apply, mark it not applicable.

If it applies but cannot be met, use an exception.

---

# 142. Exception Is Not Preference

"I prefer another library" is not automatically an exception-worthy justification.

---

# 143. Exception Types

Recommended:

```text
Temporary standards exception
Legacy variance
Emergency waiver
Experimental variance
```

---

# 144. Temporary Exception

Used when a requirement cannot currently be satisfied but migration is expected.

---

# 145. Legacy Variance

Used to identify inherited existing non-conformance.

It SHOULD still have an owner and remediation disposition.

---

# 146. Emergency Waiver

Used only when urgent operational needs prevent normal approval timing.

---

# 147. Experimental Variance

Used for bounded experiments testing a potentially superior alternative.

---

# 148. Exception Record

Every material exception MUST record:

```text
Requirement
System/scope
Reason
Risk
Compensating controls
Owner
Approver
Start date
Expiry
Remediation/review plan
```

---

# 149. Exception Scope

Exceptions MUST be narrow.

Avoid:

```text
Security Guidelines do not apply to Service X.
```

Prefer:

```text
SEC-XYZ-004 exception for endpoint A until date B.
```

---

# 150. Exception Owner

Every exception MUST have an accountable owner.

---

# 151. Exception Approver

The exception SHOULD be approved by the owner of the risk/standard—not only the implementation team.

---

# 152. Risk Acceptance

Exception approval means accepting documented residual risk.

---

# 153. Compensating Control

Where possible, exceptions SHOULD include compensating controls.

---

# 154. Exception Expiry

Temporary exceptions MUST expire automatically.

---

# 155. No Indefinite Waiver

Avoid:

```text
expiry = none
```

for ordinary exceptions.

---

# 156. Renewal

Renewal MUST require explicit review.

---

# 157. Renewal Evidence

Repeated renewal SHOULD require stronger justification.

---

# 158. Exception Aging

Long-lived exceptions SHOULD receive increasing governance attention.

---

# 159. Exception Budget

Teams with many recurring exceptions SHOULD trigger architectural/process review.

---

# 160. Exception Register

The organization SHOULD maintain a searchable exception register.

---

# 161. Exception Visibility

Teams MUST be able to determine which active exceptions affect their systems.

---

# 162. Expiry Alert

Exception owners SHOULD be notified before expiry.

---

# 163. Expired Exception

An expired exception means:

```text
Requirement applies again
```

unless renewed.

---

# 164. Emergency Exception

Emergency waivers MAY be approved rapidly.

---

# 165. Emergency Review

Emergency waivers MUST receive retrospective review after stabilization.

---

# 166. Emergency Is Not Permanent

Emergency implementation MUST either:

```text
become compliant
receive normal exception
be removed
```

after the emergency.

---

# 167. Experiment Guardrail

Experimental variances SHOULD define:

```text
Hypothesis
Scope
Duration
Success criteria
Rollback
```

---

# 168. Experiment Promotion

If the experiment demonstrates a superior general approach, update the standard instead of maintaining permanent exceptions.

---

# 169. Exception Data

Governance SHOULD track exception patterns to detect bad standards or missing paved roads.

---

# 170. Many Exceptions May Mean Standard Is Wrong

Repeated legitimate deviation is evidence that the standard MAY require redesign.

---

# 171. Zero Exceptions Is Not Goal

An organization with no exceptions may have:

```text
perfect compliance
or
hidden non-compliance
or
overly weak standards
```

Governance SHOULD distinguish these.

---

# 172. Technical Debt Definition

Technical debt is a known engineering compromise that increases future:

```text
Change cost
Risk
Operational burden
Complexity
```

---

# 173. Not Everything Is Debt

A normal unfinished feature is not automatically technical debt.

---

# 174. Debt Categories

Recommended:

```text
Architecture debt
Code debt
Test debt
Security debt
Data debt
Operational debt
Dependency debt
Documentation debt
UX/accessibility debt
```

---

# 175. Security Vulnerability ≠ Mere Debt

Known security vulnerabilities MUST follow vulnerability-management severity policy.

Do not downgrade them to harmless backlog debt.

---

# 176. Debt Record

Material debt SHOULD record:

```text
Description
Origin
Affected system
Risk/cost
Owner
Trigger
Remediation
Target horizon
```

---

# 177. Debt Ownership

Unowned technical debt is unlikely to be repaid.

---

# 178. Debt Interest

Debt SHOULD describe its carrying cost where meaningful.

Examples:

```text
Every feature takes longer
Incident frequency increases
Upgrade blocked
Manual operation required
```

---

# 179. Debt Principal

Debt remediation cost SHOULD be estimated sufficiently for prioritization.

---

# 180. Debt Trigger

Not all debt needs an arbitrary date.

A trigger MAY be:

```text
Before next major upgrade
Before scaling beyond X
Before public API launch
Before compliance audit
```

---

# 181. High-Risk Debt Deadline

Security/reliability debt with material ongoing risk SHOULD have time-bound remediation.

---

# 182. Debt Budget

Teams SHOULD reserve capacity for material technical debt appropriate to risk.

---

# 183. Debt Register

Material debt SHOULD be discoverable.

---

# 184. Inline TODO

A TODO comment alone is insufficient for material cross-system debt.

---

# 185. Debt Review

Debt SHOULD be reviewed during planning and architecture reviews.

---

# 186. Debt Paydown

Paydown SHOULD prioritize:

```text
Risk reduction
Unblocking change
Operational burden
Compounding cost
```

rather than age alone.

---

# 187. Rewrite Is Not Automatic Paydown

A rewrite MAY replace one form of debt with another.

Debt remediation requires explicit expected benefit.

---

# 188. Intentional Debt

Teams MAY knowingly take debt to accelerate delivery.

The compromise SHOULD be explicit.

---

# 189. Accidental Debt

Discovered debt SHOULD be recorded when materially important.

---

# 190. Debt Trend

Increasing high-risk debt is a governance signal.

---

# 191. Deprecation Principle

> **Nothing with active consumers should disappear without an intentional lifecycle.**

---

# 192. Deprecation Scope

Deprecation MAY apply to:

```text
API
Component
Library
Service
Route
Configuration
Feature flag
Infrastructure
Data format
Standard
```

---

# 193. Deprecation Record

A material deprecation SHOULD identify:

```text
Deprecated item
Replacement
Reason
Owner
Announcement date
End-of-support date
Removal date
Migration guidance
```

---

# 194. Replacement

Where practical, a supported replacement SHOULD exist before deprecation begins.

---

# 195. Deprecation Without Replacement

Removal without replacement MAY be valid when the capability itself is obsolete.

---

# 196. Deprecation Phases

Recommended:

```text
Announce
↓
Stop new adoption
↓
Warn
↓
Migrate
↓
End support
↓
Remove
```

---

# 197. Stop New Adoption

Deprecated technologies SHOULD normally be prohibited for new implementations.

---

# 198. Migration Guidance

Consumers SHOULD receive clear migration instructions.

---

# 199. Migration Tooling

Large migrations SHOULD provide:

```text
Codemod
Script
Compatibility layer
Automation
```

where cost-effective.

---

# 200. Consumer Inventory

Before removal, identify known consumers.

---

# 201. Usage Telemetry

Runtime/dependency telemetry SHOULD be used where possible to validate remaining usage.

---

# 202. Deprecation Warning

Developer-facing warnings SHOULD identify:

```text
What is deprecated
Replacement
Removal horizon
```

---

# 203. Runtime Warning Safety

Do not flood production logs/users with repeated deprecation warnings.

---

# 204. Support Window

Support windows SHOULD reflect:

```text
Consumer migration difficulty
Security
Contracts
Ecosystem impact
```

---

# 205. Security Override

Unsafe components MAY require accelerated deprecation/removal.

---

# 206. Removal Criteria

Removal SHOULD require evidence that:

```text
Consumers migrated
or
remaining risk has been explicitly accepted
```

---

# 207. Silent Removal

Do not silently remove a widely consumed contract.

---

# 208. Deprecation Owner

Every active deprecation MUST have an owner.

---

# 209. Deprecation Deadline

Deprecation without any removal decision SHOULD not persist indefinitely.

---

# 210. Compatibility Layer

Temporary compatibility layers SHOULD have their own removal condition.

---

# 211. Legacy Policy

Legacy systems MAY operate under migration-aware governance.

They are not exempt from risk management.

---

# 212. Legacy Baseline

For large legacy systems, define:

```text
Current compliance
Critical gaps
Accepted debt
Migration target
```

---

# 213. No Impossible All-at-Once Compliance

Governance SHOULD NOT demand immediate complete modernization of every legacy system regardless of risk.

---

# 214. Critical Minimum Floor

Legacy systems MUST still meet non-negotiable critical controls.

Examples may include:

```text
Authentication
Authorization
Critical security fixes
Backups
Audit
```

according to system risk.

---

# 215. Grandfathering

"Grandfathered" MUST mean:

```text
recognized legacy condition
```

not:

```text
permanent exemption from engineering responsibility
```

---

# 216. Definition of Done Governance

Definition of Done converts standards into release criteria.

---

# 217. DoD Principle

A requirement belongs in DoD when it must be satisfied before relevant work can be considered production-ready.

---

# 218. Global DoD

The organization SHOULD define baseline Definition of Done requirements applying broadly.

---

# 219. Domain DoD

Each standard MAY add domain-specific DoD requirements.

---

# 220. Feature DoD

A feature MAY have additional requirements based on its risk.

---

# 221. DoD Inheritance

Conceptually:

```text
Organization DoD
+
Product profile
+
Domain standard DoD
+
Feature-specific DoD
```

---

# 222. No Checklist Explosion

DoD SHOULD NOT require every engineer to manually answer hundreds of irrelevant questions.

---

# 223. Applicability-Driven DoD

Checks SHOULD activate based on:

```text
Changed files
Feature type
Architecture
Data classification
Risk labels
```

where practical.

---

# 224. Enforce MUST

Applicable MUST requirements MUST map to:

```text
Automated enforcement
Manual evidence
or
Approved exception
```

---

# 225. Enforcement Matrix

Every mature standard SHOULD maintain:

```text
Requirement
Scope
Enforcement mechanism
Evidence
Owner
Exception process
```

---

# 226. Enforcement Hierarchy

Prefer:

```text
Platform invariant
↓
Automated CI/control
↓
Automated test
↓
Structured review
↓
Manual checklist
```

---

# 227. Automate Repeatable Rules

If a rule can reliably be checked mechanically, it SHOULD eventually be automated.

---

# 228. Do Not Automate Judgment Poorly

Architectural judgment SHOULD NOT be replaced by brittle automation merely to claim enforcement.

---

# 229. Policy as Code

Machine-checkable governance SHOULD be encoded as:

```text
CI checks
Linters
Repository rules
Infrastructure policies
Admission controls
Schema validation
Security scanners
```

where suitable.

---

# 230. Central Policy

High-value organization-wide controls SHOULD be centrally maintained where possible.

---

# 231. Local Escape

A local repository SHOULD NOT silently disable central mandatory controls.

---

# 232. Bypass

Bypassing a mandatory automated control MUST require an authorized auditable mechanism.

---

# 233. Bypass Is Exception

A sustained bypass SHOULD become a registered exception.

---

# 234. CI Failure

Applicable mandatory controls SHOULD fail the pipeline where confidence is sufficiently high.

---

# 235. Warning Mode

New rules MAY begin in:

```text
observe
warn
enforce
```

stages.

---

# 236. Enforcement Rollout

Recommended:

```text
Measure current state
↓
Warn
↓
Provide remediation
↓
Enforce
```

unless urgency requires faster action.

---

# 237. False Positive Budget

Automated governance with high false-positive rates SHOULD be fixed.

---

# 238. Ignored Gates

A control everyone routinely bypasses is governance failure.

---

# 239. Evidence Principle

> **Compliance claims require evidence.**

---

# 240. Evidence Types

Evidence MAY include:

```text
CI results
Test reports
Configuration
Audit events
Architecture records
Dependency manifests
Approval records
Deployment records
```

---

# 241. Evidence Automation

Evidence SHOULD be collected automatically where practical.

---

# 242. Evidence Freshness

Evidence MUST correspond to a relevant version/environment/time.

---

# 243. Screenshot Evidence

Screenshots SHOULD NOT be the default evidence for controls that can be verified mechanically.

---

# 244. Self-Attestation

Self-attestation MAY be used for judgment-heavy requirements.

It SHOULD identify the accountable reviewer.

---

# 245. No Evidence, No Claim

A team SHOULD NOT mark a mandatory control "compliant" merely because they believe it is probably implemented.

---

# 246. Compliance Snapshot

High-risk systems MAY maintain a machine-generated compliance/control snapshot.

---

# 247. Continuous Controls

Controls that can drift SHOULD be evaluated continuously or periodically—not only at initial release.

---

# 248. Production Reality

A control passing in CI but disabled in production is not effective compliance.

---

# 249. Control Effectiveness

Governance SHOULD measure whether controls operate as intended.

---

# 250. Maturity Model

Governance maturity SHOULD be assessed per:

```text
Standard
Control family
Product
Team
```

not only as one organization-wide number.

---

# 251. Maturity Level 0 — Unknown

```text
No defined standard
No reliable ownership
Compliance unknown
```

---

# 252. Maturity Level 1 — Documented

```text
Standard exists
Owner exists
Teams can discover it
```

but adoption may be inconsistent.

---

# 253. Maturity Level 2 — Adopted

```text
Teams generally follow the standard
Paved road exists
Exceptions visible
```

---

# 254. Maturity Level 3 — Enforced

```text
Critical requirements have gates/controls
Evidence exists
Bypasses are governed
```

---

# 255. Maturity Level 4 — Measured

```text
Compliance
Exceptions
Failures
Control effectiveness
```

are measured.

---

# 256. Maturity Level 5 — Optimizing

```text
Metrics/incidents drive improvement
Low-value controls removed
Paved roads improve
Standards evolve systematically
```

---

# 257. Maturity Is Not Certification

A maturity level is an internal improvement model unless formally mapped to an external certification scheme.

---

# 258. No Average Concealment

A system SHOULD NOT claim:

```text
Overall maturity = 4
```

while a critical security domain remains Level 0.

---

# 259. Critical Floor

High-risk domains MAY require minimum maturity levels before production.

---

# 260. Maturity Evidence

Maturity claims SHOULD be supported by evidence.

---

# 261. Adoption Metric

Measure meaningful adoption rather than document page views.

---

# 262. Useful Governance Metrics

Examples:

```text
Compliance rate
Exception count
Exception age
Exception renewal rate
Deprecated usage
Architecture review lead time
Control bypass frequency
High-risk debt
Standards freshness
```

---

# 263. Avoid Vanity Metrics

Do not optimize:

```text
Number of standards
Number of RFCs
Number of approvals
```

as if higher automatically means better governance.

---

# 264. Governance Effectiveness

Better indicators include:

```text
Fewer repeated incidents
Lower architectural drift
Faster compliant delivery
Less manual review
Lower exception recurrence
```

---

# 265. Exception Metrics

Track:

```text
Open
Expired
Renewed
By standard
By team
By age
```

---

# 266. Deprecation Metrics

Track remaining consumers against deprecation milestones.

---

# 267. Debt Metrics

Track high-risk debt and debt that blocks strategic changes.

---

# 268. Review Lead Time

Architecture/RFC governance SHOULD monitor review delay.

---

# 269. Governance SLO

Organizations MAY define service expectations for:

```text
RFC review
Exception review
Architecture review
```

to avoid governance becoming a delivery bottleneck.

---

# 270. Expedite Path

Urgent reviews SHOULD have a defined expedited path.

---

# 271. Expedite ≠ Skip Evidence

Urgency MAY shorten review time.

It does not automatically eliminate risk ownership.

---

# 272. Technical Decision Ownership

Every consequential technical decision SHOULD have one accountable owner.

---

# 273. Ownership Is Not Dictatorship

The owner listens to expertise and objections.

Ownership prevents indecision; it does not eliminate review.

---

# 274. Product vs Engineering Decision

Governance SHOULD distinguish:

```text
Product outcome decisions
Technical implementation decisions
Risk acceptance decisions
```

---

# 275. Risk Owner

The person accepting business risk SHOULD have authority appropriate to that risk.

---

# 276. Engineer Cannot Accept Unlimited Business Risk

An individual developer SHOULD NOT unilaterally waive high-impact security/compliance/business controls.

---

# 277. Architecture Owner

System architecture SHOULD have identifiable stewardship.

---

# 278. Shared Architecture

For cross-team systems, ownership boundaries MUST be explicit.

---

# 279. CODEOWNERS

Repository ownership MAY be encoded using CODEOWNERS or equivalent review routing.

---

# 280. CODEOWNERS ≠ Full Governance

Code ownership assists review routing.

It does not replace domain accountability.

---

# 281. Decision Documentation

Important decisions SHOULD be searchable.

---

# 282. Chat Is Not Canonical Record

A decision made in:

```text
Slack
Teams
Chat
Meeting
```

SHOULD be captured in the appropriate durable record when consequential.

---

# 283. Meeting Minutes

Meeting minutes MAY support context.

They SHOULD NOT replace an RFC/ADR for material architecture decisions.

---

# 284. Documentation Linkage

Relevant:

```text
RFC
ADR
Standard
Runbook
Exception
Debt record
```

SHOULD cross-reference one another where useful.

---

# 285. Governance Searchability

Engineers SHOULD be able to discover:

```text
What rule applies?
Why does it exist?
Who owns it?
How do I comply?
How do I request an exception?
```

without organizational archaeology.

---

# 286. Onboarding

Engineering onboarding SHOULD teach:

```text
Corpus location
Requirement semantics
RFC process
Exception process
Architecture review triggers
DoD
```

---

# 287. Training

Specialized standards MAY require targeted training.

---

# 288. Security Champions / Domain Champions

Teams MAY designate domain champions to improve local expertise.

---

# 289. Champion Is Not Sole Owner

A champion SHOULD NOT become the only person responsible for compliance.

---

# 290. Governance Feedback

Every standard SHOULD have a low-friction feedback/change path.

---

# 291. Bad Standard Feedback

Engineers SHOULD be able to say:

```text
This requirement creates unnecessary cost.
```

without bypassing it silently.

---

# 292. Standard Amendment

Improving the standard is preferable to accumulating repeated exceptions.

---

# 293. Incident Feedback Loop

Material incidents SHOULD ask:

```text
Did a standard fail?
Was the standard missing?
Was enforcement missing?
Was the paved road poor?
Was an exception involved?
```

---

# 294. Root Cause

Do not always conclude:

```text
Engineer failed to follow standard.
```

The governance system itself may be the root cause.

---

# 295. Incident-Driven Change

Incident lessons MAY produce:

```text
New requirement
New automated control
New runbook
New eval/test
New paved road
```

---

# 296. Postmortem Action Governance

Postmortem actions SHOULD have:

```text
Owner
Priority
Completion criteria
```

---

# 297. Standards Debt

The standards corpus itself may accumulate debt.

Examples:

```text
Contradictions
Obsolete requirements
Duplicated rules
No enforcement
No owner
```

---

# 298. Governance Refactoring

The corpus SHOULD periodically be refactored like software.

---

# 299. Delete Bad Rules

Obsolete rules SHOULD be removed/deprecated rather than preserved forever.

---

# 300. Rule Value

Every meaningful requirement SHOULD have a defensible reason.

---

# 301. Rationale

Non-obvious MUST requirements SHOULD include rationale where practical.

---

# 302. Cargo-Cult Rule

Avoid requirements whose only rationale is:

```text
We have always done this.
```

---

# 303. Industry Practice

"Industry best practice" alone is insufficient justification without understanding applicability.

---

# 304. External Standard Adoption

External standards SHOULD be:

```text
Referenced
Mapped
Adapted
```

rather than copied blindly into the internal corpus.

---

# 305. External Version

When an internal requirement depends on a versioned external standard, record the relevant version.

---

# 306. External Standard Update

A new external version does not automatically become internal policy before impact review unless law/contract makes it immediately applicable.

---

# 307. Control Mapping

Organizations with compliance obligations SHOULD map internal controls to external requirements.

---

# 308. One Control, Many Frameworks

Where possible, one strong internal control SHOULD satisfy multiple external frameworks.

---

# 309. Audit Preparation

Governance evidence SHOULD emerge from normal engineering processes rather than being recreated immediately before audits.

---

# 310. Evidence Retention

Compliance evidence retention SHOULD follow applicable legal/security requirements.

---

# 311. Audit Finding

Audit findings SHOULD enter the same:

```text
Exception
Debt
Incident
Remediation
```

governance system rather than separate forgotten spreadsheets.

---

# 312. Vendor Governance

Critical technology/vendor decisions MAY require governance review based on:

```text
Lock-in
Security
Privacy
Availability
Cost
Exit difficulty
```

---

# 313. Buy vs Build

Major buy/build decisions SHOULD document:

```text
Strategic value
Total cost
Operating model
Data risk
Exit plan
```

---

# 314. Exit Strategy

Critical external dependencies SHOULD have a realistic exit/replacement position.

---

# 315. Reversibility

Architecture governance SHOULD prefer reversible decisions when uncertainty is high.

---

# 316. One-Way Door

Irreversible or expensive-to-reverse decisions warrant stronger review.

---

# 317. Two-Way Door

Reversible local decisions SHOULD normally remain team-owned.

---

# 318. Governance Friction Allocation

Spend governance effort on:

```text
One-way doors
```

rather than:

```text
every two-way door
```

---

# 319. Exceptions vs RFCs

An RFC asks:

```text
Should we choose this architecture?
```

An exception asks:

```text
May this system temporarily deviate from an existing rule?
```

They are different processes.

---

# 320. RFC vs Technical Debt

An RFC decides direction.

Technical debt records a known compromise in implemented reality.

---

# 321. ADR vs Exception

An ADR documents a decision.

It does not automatically authorize deviation from a mandatory standard.

---

# 322. Deprecation vs Exception

Deprecation changes the lifecycle of a standard/component.

An exception temporarily permits non-compliance.

---

# 323. Review Independence

High-risk risk acceptance SHOULD involve someone other than the implementer where practical.

---

# 324. Conflict of Interest

A team should not be the sole approver of an exception that transfers substantial risk to other teams/customers.

---

# 325. Governance Escalation

Escalation path SHOULD be known before conflict occurs.

---

# 326. Appeal

Teams SHOULD be able to appeal governance decisions with new evidence.

---

# 327. Appeal Is Evidence-Based

An appeal SHOULD explain:

```text
What changed?
What evidence was missed?
What trade-off is reconsidered?
```

---

# 328. Reopening Decisions

Accepted RFCs SHOULD NOT be reopened continuously without new information.

---

# 329. New Evidence

Reconsideration is appropriate when:

```text
Assumptions changed
Major failure occurred
Cost materially changed
New requirement appeared
```

---

# 330. Sunset Review

Major architecture commitments SHOULD occasionally be checked for continued relevance.

---

# 331. Governance Automation Ownership

Every automated governance gate MUST have an owner.

---

# 332. Broken Gate

A broken mandatory gate MUST have a known escalation path.

---

# 333. Gate Override

Emergency override mechanisms MUST be:

```text
Restricted
Logged
Time-bounded
Reviewed
```

---

# 334. Shadow Governance

Avoid unwritten rules known only by senior engineers.

---

# 335. Rule Publication

If engineers are expected to follow a rule, it MUST be discoverable.

---

# 336. Surprise Rejection

Reviewers SHOULD NOT block delivery based on undocumented preferences unless a genuine newly discovered risk exists.

---

# 337. Reviewer Preference

Personal style preference MUST NOT masquerade as organizational policy.

---

# 338. Governance Consistency

Similar decisions SHOULD receive similar governance treatment unless context differs materially.

---

# 339. Architecture Precedent

Existing approved architecture MAY be precedent.

It is not automatically universally appropriate.

---

# 340. Standards as Defaults

Strong standards reduce repeated design decisions.

---

# 341. Exceptions Preserve Flexibility

A controlled exception mechanism prevents standards from becoming inflexible dogma.

---

# 342. Enforcement Preserves Meaning

Enforcement ensures mandatory requirements retain semantic force.

---

# 343. Evidence Preserves Trust

Evidence allows the organization to know whether standards are operating in reality.

---

# 344. Maturity Preserves Improvement

Maturity assessment helps governance evolve from:

```text
Documented intent
```

to:

```text
Measured engineering system
```

---

# 345. Governance Review Checklist

```text
□ Applicable standards identified
□ Owners known
□ Required RFC completed
□ Architecture review completed
□ Exceptions registered
□ DoD controls pass
□ Deprecations considered
□ Material debt recorded
□ Evidence available
□ Documentation updated
```

---

# 346. Standard Creation Checklist

```text
□ Problem defined
□ Scope defined
□ Owner
□ Normative language
□ Rationale
□ Applicability
□ Cross-standard boundaries
□ Examples
□ Anti-patterns
□ Enforcement mapping
□ Exception process
□ DoD
□ Review cadence
```

---

# 347. Standard Review Checklist

```text
□ Still needed
□ Owner active
□ External references current
□ Requirements still correct
□ Conflicts
□ Exceptions
□ Enforcement
□ False positives
□ Adoption
□ Paved road quality
□ Deprecations
□ Changelog
```

---

# 348. RFC Checklist

```text
□ Problem
□ Goals
□ Non-goals
□ Constraints
□ Proposal
□ Alternatives
□ Trade-offs
□ Security/privacy
□ Data ownership
□ Failure modes
□ Operations
□ Migration
□ Rollback
□ Reviewers
□ Decision owner
```

---

# 349. Architecture Review Checklist

```text
□ Boundaries
□ Dependencies
□ Data ownership
□ Trust boundaries
□ Authentication
□ Authorization
□ Tenancy
□ API/contracts
□ Failure behavior
□ Observability
□ Deployment
□ Migration
□ Rollback
□ Cost
□ Ownership
```

---

# 350. Exception Checklist

```text
□ Exact requirement
□ Exact scope
□ Reason
□ Residual risk
□ Compensating controls
□ Owner
□ Approver
□ Start date
□ Expiry
□ Remediation/review
```

---

# 351. Technical Debt Checklist

```text
□ Debt category
□ System
□ Cause
□ Risk
□ Carrying cost
□ Owner
□ Remediation
□ Deadline/trigger
□ Dependencies
```

---

# 352. Deprecation Checklist

```text
□ Item
□ Replacement
□ Owner
□ Consumer inventory
□ Announcement
□ New-adoption blocked
□ Migration guide
□ Support window
□ Removal criteria
□ Removal date
```

---

# 353. DoD Enforcement Checklist

```text
□ Applicable MUSTs mapped
□ Automated checks where feasible
□ Manual evidence defined
□ Exceptions supported
□ CI blocks material violations
□ Production drift monitored
□ Bypass audited
□ Evidence retained
```

---

# 354. Definition of Done — New Standard

A canonical engineering standard is ready when:

```text
✓ Scope defined
✓ Accountable owner assigned
✓ Boundaries with other standards defined
✓ MUST/SHOULD/MAY used intentionally
✓ Applicability defined
✓ Rationale documented
✓ Examples and anti-patterns provided
✓ Enforcement matrix exists
✓ Exception process defined
✓ Definition of Done exists
✓ Review cadence exists
✓ Registry updated
```

---

# 355. Definition of Done — RFC

```text
✓ Decision genuinely warrants RFC
✓ Problem understood
✓ Alternatives considered
✓ Material objections addressed
✓ Security/privacy/data reviewed
✓ Operational consequences understood
✓ Migration/rollback defined
✓ Decision owner identified
✓ Outcome recorded
✓ ADR/follow-up created where required
```

---

# 356. Definition of Done — Exception

```text
✓ Requirement identified
✓ Scope minimal
✓ Risk understood
✓ Standard/risk owner approved
✓ Compensating controls applied
✓ Accountable owner
✓ Expiry
✓ Remediation/review plan
✓ Registry updated
```

---

# 357. Definition of Done — Architecture Review

```text
✓ Correct review tier
✓ Relevant domain owners represented
✓ Architecture description available
✓ Risks documented
✓ Conditions recorded
✓ Decision recorded
✓ Follow-ups assigned
✓ Material implementation drift triggers re-review
```

---

# 358. Definition of Done — Deprecation

```text
✓ Owner
✓ Replacement or removal rationale
✓ Consumer inventory
✓ Migration path
✓ New adoption prevented
✓ Timeline communicated
✓ Usage monitored
✓ Removal conditions defined
✓ Documentation updated
```

---

# 359. Definition of Done — Governance Enforcement

```text
✓ Applicable control identified
✓ Enforcement mechanism exists
✓ Evidence proves current state
✓ Bypass controlled
✓ Exceptions visible
✓ False-positive behavior acceptable
✓ Owner maintains control
✓ Production behavior matches expected control
```

---

# 360. Governance Anti-Patterns

Avoid:

```text
standard exists
→ nobody owns it
```

Avoid:

```text
owner = Engineering
```

with no accountable person/team.

Avoid duplicate standards describing the same rule differently.

Avoid:

```text
MUST
```

with no enforcement or exception process.

Avoid:

```text
SHOULD
```

being interpreted as universally mandatory.

Avoid:

```text
MAY
```

being blocked by reviewer preference.

Avoid architecture governance requiring committee approval for every feature.

Avoid architecture councils owning implementation details for teams.

Avoid RFCs for trivial reversible decisions.

Avoid skipping RFC for irreversible strategic changes.

Avoid technology-first RFCs with no problem statement.

Avoid RFCs containing only one obviously favored option.

Avoid voting as the default architecture decision mechanism.

Avoid requiring unanimous agreement.

Avoid leaving material objections unanswered.

Avoid:

```text
RFC accepted
```

with no decision owner.

Avoid rewriting accepted RFC history silently.

Avoid ADRs being treated as authorization to violate standards.

Avoid architecture approval based only on diagrams.

Avoid undocumented verbal approvals.

Avoid architecture review performed only after implementation is complete.

Avoid:

```text
exception approved forever
```

Avoid:

```text
temporary exception
```

with no expiry.

Avoid exceptions scoped to entire standards when only one requirement is problematic.

Avoid implementation teams approving their own high-risk exceptions alone.

Avoid repeated automatic exception renewal.

Avoid emergency waivers becoming normal operations.

Avoid hiding legacy non-compliance instead of recording it.

Avoid:

```text
grandfathered
```

meaning no remediation ever.

Avoid:

```text
technical debt
```

as a euphemism for an active critical vulnerability.

Avoid technical-debt tickets with no owner.

Avoid debt registers containing thousands of meaningless low-value items.

Avoid prioritizing debt purely by age.

Avoid rewrite proposals with no measurable debt-reduction goal.

Avoid deprecated libraries remaining the easiest path for new development.

Avoid deprecations with no replacement/migration guidance.

Avoid deprecations with no consumer inventory.

Avoid permanent compatibility layers.

Avoid silent API/component removal.

Avoid Definition of Done as a 300-item manual checklist.

Avoid asking developers to manually attest to facts CI already knows.

Avoid automated controls with constant false positives.

Avoid bypass mechanisms everyone uses routinely.

Avoid:

```text
CI green
→ production compliant
```

without considering drift.

Avoid screenshot-heavy compliance processes where machine evidence exists.

Avoid:

```text
trust me, this is compliant
```

with no evidence.

Avoid measuring governance success by number of policies or meetings.

Avoid maturity averages that hide critical gaps.

Avoid standards review that automatically changes documents merely to show activity.

Avoid leaving obsolete rules active because deletion feels risky.

Avoid external-framework requirements copied without contextualization.

Avoid:

```text
best practice
```

as the entire rationale for a rule.

Avoid technical decisions living only in chat history.

Avoid undocumented senior-engineer conventions.

Avoid reviewers blocking PRs on personal architectural preferences not reflected in standards.

Avoid every team creating slightly different local copies of canonical standards.

Avoid governance processes with no appeal/escalation route.

Avoid governance bodies with no review-time expectation.

Avoid emergency processes that require normal multi-week governance timelines.

Avoid:

```text
zero exceptions
```

as the target metric.

Avoid:

```text
more RFCs
```

as evidence of better engineering.

Avoid compliance evidence recreated manually before every audit.

Avoid incidents whose lessons never update tests, standards, or paved roads.

---

# 361. AI Governance Rules

AI coding agents MUST treat active canonical standards as authoritative engineering constraints.

---

# 362. AI Applicability Rule

AI SHOULD identify which standards apply before designing consequential systems.

---

# 363. AI Conflict Rule

AI MUST NOT silently resolve contradictions between active standards by inventing a rule.

It SHOULD surface the conflict for owner resolution.

---

# 364. AI Exception Rule

AI MUST NOT create or assume approval for standards exceptions.

---

# 365. AI Waiver Rule

AI MAY draft an exception request.

A human/risk owner must authorize it.

---

# 366. AI RFC Rule

AI MAY draft and analyze RFCs.

It MUST NOT represent an RFC as accepted without recorded approval.

---

# 367. AI Architecture Review Rule

AI MAY identify architecture-review triggers.

It MUST NOT claim formal governance approval it did not receive.

---

# 368. AI ADR Rule

AI SHOULD preserve existing ADR history and create superseding records rather than rewriting accepted decisions.

---

# 369. AI DoD Rule

AI MUST NOT mark a mandatory control complete without evidence.

---

# 370. AI Evidence Rule

AI SHOULD distinguish:

```text
Verified
Inferred
Unknown
```

when assessing compliance.

---

# 371. AI Technical Debt Rule

AI SHOULD identify meaningful technical debt when its implementation intentionally creates future cost/risk.

---

# 372. AI Deprecation Rule

AI SHOULD NOT introduce deprecated technology into new implementations unless an approved exception exists.

---

# 373. AI Paved-Road Rule

AI SHOULD prefer organizational paved roads and canonical libraries before introducing novel infrastructure.

---

# 374. AI Governance Gold Rule

When uncertain:

```text
Existing canonical standard
>
local invention
```

```text
Evidence
>
assumption
```

```text
Recorded decision
>
chat memory
```

```text
Temporary explicit exception
>
silent divergence
```

---

# 375. Golden Governance Rules

**1. Every active standard has an accountable owner.**

**2. Ownership is distinct from original authorship.**

**3. One engineering rule has one authoritative source.**

**4. Standards cross-reference rather than duplicate one another.**

**5. Principles, policies, standards, patterns, and procedures are distinct governance layers.**

**6. External legal and contractual obligations override internal convenience.**

**7. Internal standards cannot waive applicable law.**

**8. Canonical standards are maintained in a discoverable registry.**

**9. Standards have explicit lifecycle states.**

**10. Active standards are periodically reviewed.**

**11. Material events can trigger review before the normal cadence.**

**12. Standard changes have identifiable change classes and history.**

**13. Breaking governance changes include migration expectations.**

**14. Requirements use MUST, SHOULD, and MAY intentionally.**

**15. Applicable MUST requirements mean comply or hold an approved exception.**

**16. SHOULD represents the expected default while preserving justified engineering judgment.**

**17. Local standards cannot silently weaken organizational requirements.**

**18. Team-specific practices may be promoted when they become broadly useful.**

**19. Governance provides paved roads, not merely prohibitions.**

**20. Following the paved road should reduce review burden.**

**21. Governance effort scales with risk and irreversibility.**

**22. Routine compliant engineering stays team-owned.**

**23. High-impact one-way-door decisions receive stronger review.**

**24. RFCs are used for consequential decisions before commitment.**

**25. RFCs start with the problem rather than a chosen technology.**

**26. Material RFCs describe credible alternatives and trade-offs.**

**27. The status quo is considered when replacing established architecture.**

**28. RFCs use evidence where uncertainty can be measured.**

**29. RFC review is bounded in time.**

**30. Architecture decisions do not require unanimous preference.**

**31. Material objections are addressed rather than counted as votes.**

**32. Every RFC has a final decision owner.**

**33. Accepted RFC history is not silently rewritten.**

**34. ADRs record decisions; RFCs facilitate consequential proposal review.**

**35. Accepted ADRs remain historical records and are superseded rather than rewritten.**

**36. Architecture reviews focus on boundaries, risks, contracts, failure, and operations.**

**37. Architecture review depth is risk-based.**

**38. Not every pull request requires architecture review.**

**39. Formal reviews produce recorded outcomes.**

**40. Conditional approvals have owners and completion criteria.**

**41. Material implementation drift can invalidate architecture approval.**

**42. Exceptions are explicit deviations from applicable requirements.**

**43. Non-applicability is not an exception.**

**44. Exceptions are scoped as narrowly as possible.**

**45. Every exception records residual risk.**

**46. Every exception has an accountable owner.**

**47. Material exceptions are approved by an appropriate risk/standard owner.**

**48. Compensating controls are used where practical.**

**49. Temporary exceptions expire automatically.**

**50. Exception renewal is an explicit new decision.**

**51. Repeated renewal receives increasing scrutiny.**

**52. Emergency waivers are reviewed after stabilization.**

**53. Experiments define hypothesis, bounds, success criteria, and rollback.**

**54. Repeated legitimate exceptions may indicate that the standard needs improvement.**

**55. Zero exceptions is not itself a governance objective.**

**56. Material technical debt has an owner.**

**57. Debt describes risk or carrying cost rather than merely age.**

**58. Critical vulnerabilities are governed as vulnerabilities, not hidden as normal technical debt.**

**59. Debt remediation is prioritized by risk, compounding cost, and strategic blockage.**

**60. Intentional debt is documented when material.**

**61. Deprecation is a lifecycle, not an announcement.**

**62. New adoption of deprecated technology is normally blocked.**

**63. Consumers receive replacement and migration guidance where practical.**

**64. Material deprecations identify active consumers before removal.**

**65. Compatibility layers have removal criteria.**

**66. Legacy systems are migration-managed rather than indefinitely exempt.**

**67. Legacy systems still satisfy non-negotiable critical controls.**

**68. Definition of Done inherits requirements from organization, profile, domain, and feature scope.**

**69. Applicable MUST requirements map to enforcement, evidence, or an approved exception.**

**70. Repeatable controls are automated where reliable.**

**71. Judgment-heavy architecture is not forced into brittle automated checks.**

**72. Platform-level invariants are preferred to repeated manual review.**

**73. Central mandatory controls cannot be silently disabled by repositories.**

**74. Control bypass is restricted and auditable.**

**75. New controls may progress through observe, warn, and enforce modes.**

**76. Controls with unacceptable false-positive rates are repaired rather than routinely bypassed.**

**77. Compliance claims require evidence.**

**78. Evidence corresponds to the relevant version and production reality.**

**79. Machine-verifiable evidence is preferred to screenshots and memory.**

**80. Continuous controls continue to be checked after deployment where drift is possible.**

**81. Governance maturity is assessed per meaningful domain rather than hidden behind one average.**

**82. Maturity progresses from unknown to documented, adopted, enforced, measured, and optimizing.**

**83. Critical control domains may require a minimum maturity floor.**

**84. Governance metrics measure risk reduction and delivery quality rather than paperwork volume.**

**85. Exception age and renewal rate are governance health signals.**

**86. Architecture-review lead time is monitored so governance does not become a bottleneck.**

**87. Consequential decisions have accountable owners.**

**88. Technical owners do not unilaterally accept unlimited organizational risk.**

**89. Durable decisions do not exist only in chat messages or meetings.**

**90. Engineers can discover what rule applies, why it exists, who owns it, and how to request change.**

**91. Standards provide a low-friction feedback and amendment path.**

**92. Incidents test whether standards and enforcement failed—not merely whether an individual made a mistake.**

**93. Incident lessons feed standards, controls, tests, paved roads, or runbooks.**

**94. The governance corpus itself is refactored and deprecated as needed.**

**95. Requirements without defensible rationale are reviewed rather than preserved as ritual.**

**96. External frameworks are mapped to internal controls rather than blindly copied.**

**97. Audit evidence emerges from normal engineering workflows wherever possible.**

**98. AI agents may draft governance artifacts but cannot grant themselves approvals or exceptions.**

**99. A governance mechanism that teams routinely bypass is a failed mechanism and must be redesigned.**

**100. If a standard has no owner, no enforcement, no evidence, no exception path, and no review lifecycle, it is documentation—not governance.**

---

# 376. Canonical Governance Standard

The organizational standard is:

> **Engineering governance is implemented as an owned, versioned, risk-based system of principles, policies, standards, decisions, controls, evidence, exceptions, and lifecycle management. Each rule has one authoritative source and an accountable owner; domain standards remain authoritative within their scope; cross-standard conflicts are resolved deliberately rather than left for individual implementations to interpret; and the governance corpus itself is maintained with the same discipline applied to production software.**

> **Normative requirements have operational meaning. Applicable MUST requirements are satisfied through implementation or an explicit approved exception, SHOULD requirements define the normal engineering default while permitting documented judgment, and MAY requirements remain genuinely optional. Mature requirements are linked to their scope, enforcement mechanism, evidence, ownership, and exception path so teams can determine not merely what a standard says, but how compliance is demonstrated.**

> **Governance is risk-calibrated rather than universally centralized. Routine, reversible, standard-conforming decisions remain within product teams, while high-blast-radius, cross-domain, security-sensitive, expensive-to-reverse, or strategically binding decisions receive progressively stronger domain, architecture, or risk review. Architecture committees do not become universal PR approvers; their purpose is to resolve boundaries and consequential trade-offs that individual teams cannot safely decide in isolation.**

> **RFCs govern consequential proposals before commitment. They define the problem, goals, constraints, alternatives, trade-offs, security/privacy/data implications, migration and rollback path, and final decision ownership. Review seeks informed rough consensus rather than unanimity or simple majority voting, material objections are addressed on their technical merits, prototypes and evidence are used where uncertainty is measurable, and accepted decisions remain historically stable through amendments or superseding records rather than invisible revision.**

> **ADRs provide durable architecture history. They record the context, accepted decision, consequences, alternatives, ownership, and related RFCs at the system level; local architectural decisions can use ADRs without triggering organization-wide RFCs; accepted ADRs are superseded rather than rewritten; and an ADR documents a decision but does not independently grant permission to violate a mandatory organizational standard.**

> **Exceptions preserve flexibility without creating hidden architecture. Every material deviation identifies the exact requirement and scope, residual risk, compensating controls, owner, approver, start date, expiry, and remediation or review plan. Temporary exceptions expire automatically, renewals require explicit reassessment, emergency waivers receive retrospective review, experimental variances are bounded by hypotheses and rollback criteria, and recurring exceptions are analyzed as possible evidence that either implementation architecture or the standard itself requires improvement.**

> **Technical debt is managed as a visible economic and risk obligation. Material debt identifies its cause, category, owner, carrying cost or risk, remediation path, and date or trigger; security vulnerabilities retain their vulnerability severity rather than being disguised as ordinary backlog debt; intentional compromises are documented when material; and remediation is prioritized by compounding change cost, operational burden, strategic blockage, and risk rather than by age alone.**

> **Deprecation is a managed migration lifecycle. Deprecated APIs, components, libraries, services, standards, configuration, and platforms identify their owner, replacement or removal rationale, affected consumers, support window, migration guidance, end-of-support state, and removal criteria; new adoption is normally prevented; usage is measured where practical; compatibility layers have their own expiry; and legacy systems receive migration-aware treatment while continuing to meet non-negotiable safety and security floors.**

> **Definition of Done translates governance into delivery gates. Organizational, product-profile, domain, and feature-specific requirements compose into the applicable DoD; repeatable controls are enforced through platform invariants, CI, automated tests, repository rules, schema validation, security scanners, or policy-as-code wherever reliable; judgment-heavy obligations use structured review and evidence; bypasses are authorized and auditable; and no mandatory control is considered satisfied without current evidence or an approved exception.**

> **Governance maturity evolves from documentation to measured control effectiveness. Standards and systems are assessed independently across Unknown, Documented, Adopted, Enforced, Measured, and Optimizing maturity levels; critical weaknesses are not hidden by organization-wide averages; metrics emphasize standards freshness, exception age, deprecation progress, control effectiveness, high-risk debt, review lead time, bypass frequency, and incident recurrence rather than counts of policies, meetings, RFCs, or approvals.**

> **Governance continuously learns from operation. Incidents, audits, exceptions, architectural friction, repeated technical debt, failed controls, and engineer feedback are used to improve standards, paved roads, automated enforcement, tests, and review boundaries. Bad or obsolete requirements are clarified, deprecated, or removed rather than preserved ceremonially, and governance itself is judged by whether it enables teams to deliver compliant systems faster while reducing systemic risk.**

A production-grade engineering-governance system should make it easy to answer:

```text
What standard governs this decision?
Is that standard Active?
Who owns it?
When was it last reviewed?
Which requirements are MUST versus SHOULD?
Does this requirement apply to this system?
How is it enforced?
What evidence proves compliance?
Can the control drift after deployment?
What is the approved paved road?
Does this change require an RFC?
Does it require an ADR?
Which architecture-review tier applies?
Who is the final decision owner?
What material objections remain?
Is there an active exception?
What exact requirement does the exception cover?
Who accepted the risk?
When does the exception expire?
How will it be remediated?
Which technical debt did this decision intentionally create?
Who owns that debt?
What is its carrying cost?
Is any technology involved already deprecated?
Who still consumes it?
When can it be removed?
Which Definition-of-Done gates apply?
Can CI enforce them?
What evidence is manual?
What happens when a governance gate must be bypassed during an emergency?
How is that bypass reviewed afterward?
What maturity level has actually been demonstrated?
Which governance metrics show whether the system is improving?
What incident, exception, or repeated friction should cause the standard itself to change?
```

If those questions cannot be answered reliably, the organization has engineering documents and review meetings, but it does not yet have an engineered governance system.

The normative-language model aligns with **BCP 14**, composed of RFC 2119 and RFC 8174: `MUST`, `SHOULD`, and `MAY` have defined requirement meanings when used in uppercase, while RFC 8174 clarifies the capitalization rule. citeturn314699search2turn154144search0

For the RFC decision model, RFC 7282's treatment of **rough consensus** is useful: it explicitly distinguishes consensus from majority voting and emphasizes addressing substantive objections rather than requiring unanimity. That maps well to architecture governance where one dissenter should not automatically veto a decision, but legitimate technical concerns cannot simply be outvoted. citeturn314699search3

For ownership and enforcement, NIST SSDF 1.1 explicitly calls for defined and periodically maintained SDLC roles/responsibilities, including project/code ownership, and for software-development requirements to be identified, documented, maintained, and integrated into the SDLC. As of **September 23, 2026**, SSDF **1.1 remains the final published version**; version 1.2 is still listed by NIST as an **Initial Public Draft** published December 17, 2025. citeturn314699search59turn154144search8turn154144search7

For architecture documentation, **ISO/IEC/IEEE 42010:2022** remains the published second edition and formalizes architecture descriptions, viewpoints, model kinds, and their relationships. It deliberately does **not** prescribe one architecture-development or governance process, which is why this corpus uses it as a documentation/description baseline rather than pretending it mandates the RFC/ADR process above. citeturn314699search0

This completes the current macro sequence:

**… → Release & Versioning → Documentation → AI/LLM → Governance.**

Governance is therefore the **control plane for the entire corpus**: every other Gold Standard defines *what good engineering looks like in its domain*; Governance defines **who keeps that definition authoritative, how deviations are controlled, and how the organization proves the standards are actually operating.**
