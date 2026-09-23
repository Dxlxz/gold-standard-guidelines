---
id: "testing"
title: "Testing Guidelines — Gold Standard"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "testing"]
applies_to: ["team"]
related: []
legacy_number: 17
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 58528
provenance: baseline

---

Below is the canonical **Testing Guidelines — Gold Standard**, designed to integrate with Architecture, Security, Data, API, State, Forms, and Error/Resilience standards.

# Testing Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical standard for software testing across:

- unit tests;
- integration tests;
- component tests;
- contract tests;
- API tests;
- end-to-end tests;
- visual regression;
- accessibility testing;
- security testing;
- performance-oriented tests;
- database tests;
- migration tests;
- resilience tests;
- fixtures;
- mocks;
- test data;
- coverage;
- flaky tests;
- CI execution;
- production verification.

The objective is to create a test system that provides:

```text
Confidence
+
Fast feedback
+
Regression protection
+
Architectural verification
+
Safe delivery
```

The core principle is:

> **Test behavior at the lowest realistic layer that provides meaningful confidence, and use higher-level tests to verify boundaries and critical user journeys.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Testing exceptions SHOULD document:

```text
Reason
Risk
Alternative verification
Owner
Review date
```

---

# 3. Testing Philosophy

Tests exist to protect:

```text
Behavior
Contracts
Invariants
Security
Critical workflows
```

Tests do not exist primarily to maximize a percentage.

---

# 4. Confidence Over Test Count

Prefer:

```text
10 meaningful tests
```

over:

```text
100 implementation-detail tests
```

Test count is not a quality metric.

---

# 5. Testing Pyramid / Trophy

A healthy product typically contains many:

```text
Unit
+
Integration
+
Component
```

tests and fewer expensive:

```text
E2E
```

tests.

Exact ratios are not prescribed.

---

# 6. Test Layer Selection

Use the lowest layer capable of proving the behavior meaningfully.

Decision order:

```text
Pure logic?
→ Unit test

Multiple internal modules / database / framework boundary?
→ Integration test

UI component behavior?
→ Component test

Service/provider contract?
→ Contract test

Critical user journey across application?
→ E2E test
```

---

# 7. Do Not Test Everything Through E2E

E2E tests are:

- slower;
- harder to diagnose;
- more environment-sensitive;
- more expensive to maintain.

They should protect critical journeys, not every conditional branch.

---

# 8. Do Not Test Everything Through Units

Unit tests cannot prove:

```text
database behavior
routing integration
serialization
authorization wiring
browser behavior
provider contracts
```

Use realistic integration where boundaries matter.

---

# 9. Test User-Visible Behavior

Prefer tests that describe what the system guarantees.

Good:

```text
Member without billing permission cannot update billing settings.
```

Poor:

```text
mocked function called exactly twice.
```

unless that call count is itself the contract.

---

# 10. Implementation Details

Tests SHOULD avoid coupling to:

```text
private method names
component internals
DOM structure without semantic meaning
local variable choices
implementation-specific call order
```

unless those details are intentionally contractual.

---

# 11. Test Boundaries

Critical boundaries deserve direct tests.

Examples:

```text
HTTP → application
application → database
application → provider
server → client
tenant → tenant
```

---

# 12. Test Invariants

Critical invariants MUST be explicitly tested.

Examples:

```text
Last owner cannot be removed.
Invoice cannot be paid twice.
Tenant A cannot read Tenant B.
Balance cannot become invalid.
```

---

# 13. Positive and Negative Testing

Every important behavior should consider:

```text
Allowed
Denied
Invalid
Boundary
Failure
```

Testing only successful cases is incomplete.

---

# 14. Happy Path

The happy path verifies normal intended use.

It should be tested, but it is only one part of the suite.

---

# 15. Failure Paths

Test:

```text
invalid input
unauthenticated
unauthorized
dependency failure
timeout
conflict
duplicate request
```

where relevant.

---

# 16. Boundary Cases

Boundary cases often include:

```text
0
1
maximum
minimum
empty
null
duplicate
expired
first page
last page
```

according to domain semantics.

---

# 17. Regression Tests

Every meaningful defect SHOULD result in a regression test when practical.

The test should reproduce the faulty behavior before the fix and protect against recurrence.

---

# 18. Test Names

Test names SHOULD communicate:

```text
condition
behavior
expected outcome
```

Example:

```text
denies project deletion when member lacks projects.delete
```

---

# 19. Avoid Generic Test Names

Avoid:

```text
works
test1
handles error
should work
```

Use domain language.

---

# 20. Arrange–Act–Assert

Tests SHOULD generally be understandable as:

```text
Arrange
Act
Assert
```

even when not explicitly labelled.

---

# 21. One Behavioral Reason to Fail

A test SHOULD ideally fail for one coherent behavioral reason.

This does not require one assertion per test.

Multiple assertions about one outcome are acceptable.

---

# 22. Assertions

Assertions should verify meaningful outcomes.

Prefer:

```text
invoice.status === "paid"
payment recorded once
```

over irrelevant internal details.

---

# 23. Assertion Specificity

Use the most meaningful assertion available.

Prefer:

```text
expect(user.roles).toContain("admin")
```

over vague:

```text
expect(result).toBeTruthy()
```

when stronger semantics exist.

---

# 24. Unit Tests

Unit tests verify isolated business logic or deterministic functions.

Ideal candidates:

```text
calculations
validation
state transitions
policy rules
transformations
domain services
```

---

# 25. Unit Test Characteristics

Good unit tests are generally:

```text
Fast
Deterministic
Isolated
Easy to diagnose
```

---

# 26. Pure Functions

Pure domain functions SHOULD have strong unit coverage when business-critical.

Example:

```text
calculateInvoiceTotal()
```

---

# 27. Domain Rules

Authorization/domain state transitions are excellent unit-test candidates.

Example:

```text
canTransferOwnership()
```

---

# 28. Unit Tests Should Not Reimplement Production Logic

Do not calculate the expected value using the same algorithm being tested.

Use independent expected outcomes.

---

# 29. Unit Test Database Mocking

Do not mock database behavior merely to claim code has unit tests if the important behavior depends on actual database semantics.

Use integration tests instead.

---

# 30. Mocking Pure Dependencies

Unit tests MAY mock true external boundaries.

Examples:

```text
clock
random source
provider adapter
```

when isolation improves determinism.

---

# 31. Integration Tests

Integration tests verify multiple real components working together.

Typical examples:

```text
application + PostgreSQL
route + authorization + database
worker + queue adapter
API + serialization
```

---

# 32. Integration Tests Are Core

For modern application development, integration tests SHOULD provide substantial confidence because many defects occur at boundaries.

---

# 33. Real Database

Database-dependent behavior SHOULD preferably be tested against the actual database engine.

Do not assume an in-memory substitute behaves identically to PostgreSQL.

---

# 34. Database Integration Tests

Test:

```text
constraints
transactions
queries
locking
migrations
tenant isolation
```

against real database behavior where meaningful.

---

# 35. Integration Environment

Integration test infrastructure SHOULD be:

```text
repeatable
isolated
automatically provisioned
```

---

# 36. Test Containers / Ephemeral Services

Ephemeral database/service instances MAY be used to improve realism and isolation.

They should remain fast enough for development workflows.

---

# 37. Component Tests

Component tests verify UI behavior with realistic user interaction.

They SHOULD focus on:

```text
rendering
interaction
state changes
validation
accessible semantics
```

---

# 38. Component Test Perspective

Test the component from the user's perspective.

Prefer:

```text
find field by label
click button by role
```

over:

```text
query .form-field:nth-child(2)
```

---

# 39. Semantic Selectors

Preferred test selectors include:

```text
role
accessible name
label
visible text
```

because these often align with accessibility.

---

# 40. Test IDs

`data-testid` MAY be used where no stable semantic selector exists.

Do not make every DOM element require a test ID.

---

# 41. CSS Selectors

Avoid brittle selectors based on:

```text
class names
DOM nesting
generated CSS
```

unless styling structure itself is being tested.

---

# 42. Component Dependencies

Component tests MAY mock network boundaries while retaining realistic component behavior.

Do not mock the component's own business logic excessively.

---

# 43. Component Integration

Complex components such as:

```text
forms
tables
dialogs
comboboxes
editors
```

SHOULD receive interaction-level testing.

---

# 44. Form Component Testing

Test:

```text
labels
input
validation
submission
errors
focus
keyboard behavior
```

where relevant.

---

# 45. Dialog Testing

Test:

```text
open
initial focus
keyboard navigation
close
focus restoration
```

for important dialog patterns.

---

# 46. Contract Tests

Contract tests verify that independently evolving systems agree on interface semantics.

Examples:

```text
service API
webhook
event
provider adapter
SDK
```

---

# 47. API Contract Testing

Test API behavior against its authoritative schema.

Validate:

```text
request shape
response shape
status codes
error model
```

---

# 48. OpenAPI Contract

Meaningful HTTP API contracts SHOULD be checked against the authoritative OpenAPI schema.

Schema drift is a defect.

---

# 49. Consumer-Driven Contracts

Consumer-driven contract testing MAY be useful where:

```text
services evolve independently
many consumers exist
consumer expectations differ
```

---

# 50. Contract Tests Do Not Replace Integration Tests

A schema-compatible response can still have incorrect semantics.

Use both where appropriate.

---

# 51. Event Contract Tests

Published events SHOULD test:

```text
event type
schema
required fields
version
compatibility
```

---

# 52. Webhook Contract Tests

Test:

```text
signature
schema
duplicate delivery
invalid signature
event identity
```

---

# 53. Provider Adapter Tests

Adapters for external services SHOULD verify mapping between:

```text
provider behavior
↔
internal contract
```

---

# 54. Provider Sandbox Tests

Where providers offer sandboxes/test environments, selected integration tests MAY run against them.

Do not make the entire routine suite dependent on external availability.

---

# 55. End-to-End Tests

E2E tests verify real user journeys across major application boundaries.

Examples:

```text
sign in
create workspace
invite member
create project
checkout
```

---

# 56. E2E Scope

E2E SHOULD cover:

```text
critical revenue journeys
critical security workflows
high-value CRUD journeys
cross-system integration
```

not every UI variation.

---

# 57. E2E Journey

A strong E2E test should represent a real user goal.

Good:

```text
workspace owner invites a member and the member joins
```

Poor:

```text
click 27 unrelated controls
```

---

# 58. E2E Independence

Each E2E test SHOULD be independently runnable where practical.

Avoid one enormous suite where:

```text
test B depends on test A
test C depends on test B
```

---

# 59. E2E State

Provision required state explicitly.

Do not depend on arbitrary leftovers from previous test execution.

---

# 60. E2E Setup Through APIs

Tests MAY create prerequisite state through trusted test APIs/factories when doing so improves speed.

Not every prerequisite must be created through UI.

---

# 61. Test What Matters Through UI

Use UI interaction for the behavior being verified.

Setup may occur at lower layers.

---

# 62. E2E Cleanup

Test-created data SHOULD be:

```text
isolated
identifiable
cleaned
```

or automatically expired.

---

# 63. E2E Parallelism

Parallel execution must not cause tests to share mutable records accidentally.

Use unique test identities/resources.

---

# 64. E2E Authentication

Authentication setup MAY reuse pre-authenticated test state for ordinary feature tests.

Keep separate dedicated tests for actual authentication flows.

---

# 65. E2E Retries

Do not hide flaky E2E tests behind large automatic retry counts.

Retries MAY collect diagnostic evidence, but the underlying flake remains a defect.

---

# 66. Critical Path Smoke Tests

A small fast subset SHOULD verify after deployment:

```text
application loads
authentication works
critical read works
critical write works
```

where appropriate.

---

# 67. Production Smoke Tests

Production smoke tests MUST use safe:

```text
test tenants
synthetic resources
non-destructive flows
```

where possible.

---

# 68. Synthetic Monitoring

Critical workflows MAY be tested periodically from outside the application.

This complements, not replaces, CI tests.

---

# 69. Visual Regression Testing

Visual regression detects unintended visual changes.

It is useful for:

```text
design-system components
layouts
complex UI
responsive states
```

---

# 70. Visual Testing Is Not Functional Testing

A screenshot matching expected pixels does not prove:

```text
button works
authorization works
screen reader works
```

Visual tests are supplementary.

---

# 71. Visual Baselines

Visual baseline updates MUST be reviewed intentionally.

Do not automatically approve new screenshots because the build changed.

---

# 72. Baseline Change Review

Reviewer should determine:

```text
expected change?
unexpected regression?
environment noise?
```

before accepting baseline.

---

# 73. Visual Determinism

Visual tests require control of:

```text
viewport
fonts
animations
timestamps
randomness
content
```

where possible.

---

# 74. Disable Animation for Screenshots

Animations SHOULD be disabled/frozen for deterministic visual capture unless animation itself is being tested.

---

# 75. Dynamic Data

Replace unstable:

```text
timestamps
random avatars
live metrics
```

with deterministic fixtures in visual tests.

---

# 76. Responsive Visual Tests

Critical UI SHOULD include representative widths such as:

```text
mobile
tablet where materially different
desktop
```

according to design system breakpoints.

---

# 77. Dark Mode Visual Tests

Dark mode SHOULD have visual coverage for canonical components/pages where supported.

---

# 78. Component Visual Coverage

Design-system components SHOULD cover meaningful states:

```text
default
hover where tool supports
focus
disabled
error
loading
```

where useful.

---

# 79. Visual Noise

Do not capture hundreds of screenshots with minimal value.

Target high-risk visual surfaces.

---

# 80. Accessibility Testing

Accessibility testing is mandatory for significant UI.

It requires multiple layers.

---

# 81. Automated Accessibility Tests

Automated checks SHOULD detect issues such as:

```text
missing labels
invalid ARIA
contrast where tool supports
landmark problems
```

---

# 82. Automated Accessibility Limits

Automated accessibility tests cannot verify everything.

They cannot reliably determine:

```text
meaningful focus order
good alt text
usable screen-reader workflow
appropriate interaction semantics
```

alone.

---

# 83. Keyboard Testing

Important workflows MUST be testable with keyboard.

Verify:

```text
Tab
Shift+Tab
Enter
Space
Escape
Arrow keys
```

where appropriate.

---

# 84. Focus Testing

Test:

```text
visible focus
dialog focus trap
focus restoration
error focus
route-change focus
```

for critical patterns.

---

# 85. Screen Reader Testing

Critical complex interactions SHOULD receive representative screen-reader testing.

Examples:

```text
dialogs
comboboxes
tables
forms
live regions
```

---

# 86. Accessibility Regression

Known accessibility defects SHOULD receive automated regression tests where feasible.

---

# 87. Security Testing

Security testing is part of normal engineering.

It is not only a periodic penetration test.

---

# 88. Security Unit Tests

Useful for:

```text
authorization policies
token validation
security utility logic
```

---

# 89. Authorization Integration Tests

Every sensitive resource SHOULD verify:

```text
allowed role
wrong role
wrong tenant
unauthenticated
revoked membership
```

---

# 90. Cross-Tenant Testing

Multi-tenant systems MUST automatically test:

```text
Tenant A identity
+
Tenant B resource
→ denied
```

for critical operations.

---

# 91. Security Negative Tests

Attempt:

```text
modified IDs
unexpected fields
role escalation
oversized input
invalid signatures
replayed requests
```

where relevant.

---

# 92. Mass Assignment Testing

Verify clients cannot modify protected fields such as:

```text
role
tenantId
ownerId
isAdmin
price
```

through generic payloads.

---

# 93. Authentication Testing

Test:

```text
invalid credentials
expired session
revoked session
MFA requirement
recovery tokens
OAuth validation
```

according to architecture.

---

# 94. CSRF Testing

Cookie-authenticated mutation endpoints SHOULD verify CSRF defenses where applicable.

---

# 95. XSS Testing

Rich-text/user-content surfaces SHOULD have tests protecting relevant sanitization/output behavior.

---

# 96. SQL Injection Testing

Parameterized query architecture should be reinforced with security tests on risky dynamic query surfaces.

---

# 97. SSRF Testing

Server-side URL-fetch features SHOULD test restricted destination behavior.

---

# 98. File Security Tests

Upload systems SHOULD test:

```text
wrong type
oversize
dangerous filename
malformed file
authorization
```

---

# 99. Rate-Limit Tests

Abuse-sensitive endpoints SHOULD verify that limits actually apply under intended scope.

---

# 100. Dependency Security Scanning

Dependency vulnerability scanning SHOULD run automatically.

Findings must follow the vulnerability-management process.

---

# 101. Static Analysis

Security/static analysis MAY catch:

```text
unsafe APIs
secret leaks
dangerous patterns
```

Treat findings as signals requiring triage.

---

# 102. Secret Scanning

Repositories/CI SHOULD scan for committed secrets.

False positives should be managed without disabling the control broadly.

---

# 103. Dynamic Security Testing

Externally exposed high-risk applications SHOULD receive dynamic security testing proportionate to risk.

---

# 104. Penetration Testing

High-risk or externally significant systems SHOULD receive periodic specialist penetration testing according to organizational risk.

Penetration testing does not replace everyday automated security tests.

---

# 105. Resilience Testing

Resilience behavior MUST be tested for important dependencies.

Test:

```text
timeout
503
connection failure
malformed response
```

---

# 106. Retry Tests

Verify:

```text
correct failures retried
permanent failures not retried
maximum attempts
backoff behavior
idempotency
```

---

# 107. Timeout Tests

Verify the operation actually stops waiting within expected bounds.

Configuration alone is insufficient evidence.

---

# 108. Circuit Breaker Tests

Where used, test:

```text
closed
open
half-open
recovery
```

---

# 109. Partial Failure Tests

Verify independent sections continue functioning when one dependency fails.

---

# 110. Graceful Degradation Tests

Test defined fallback behavior.

Example:

```text
recommendation provider down
→ default content remains usable
```

---

# 111. Queue Tests

Background processing SHOULD test:

```text
success
retry
duplicate delivery
poison message
DLQ
timeout
```

---

# 112. Idempotency Tests

High-impact retryable operations MUST test:

```text
same key + same input
→ one effective result
```

and:

```text
same key + different input
→ appropriate rejection
```

---

# 113. Reconciliation Tests

Critical external-state integrations SHOULD test mismatches and reconciliation.

---

# 114. Database Testing

Database behavior deserves explicit testing.

---

# 115. Constraint Tests

Verify critical:

```text
UNIQUE
FOREIGN KEY
NOT NULL
CHECK
```

constraints where they protect important invariants.

---

# 116. Transaction Tests

Test operations requiring atomicity.

Verify partial writes do not survive failure.

---

# 117. Concurrency Tests

Critical concurrent workflows SHOULD test races.

Examples:

```text
two users claim final inventory
two payments
two ownership transfers
```

---

# 118. Optimistic Concurrency Tests

Verify stale versions are rejected appropriately.

---

# 119. Deadlock Handling Tests

Where database deadlocks/serialization retries are expected, verify retry behavior.

---

# 120. Query Tests

Complex important queries SHOULD test:

```text
filtering
sorting
pagination
tenant scope
```

---

# 121. Migration Tests

Database migrations are production code.

They SHOULD be tested.

---

# 122. Migration Forward Test

Verify:

```text
previous supported schema
→ current migration
→ application works
```

for high-risk migrations.

---

# 123. Migration Data Test

Where migration transforms data, verify resulting semantics.

---

# 124. Migration Scale Testing

Large migrations SHOULD be tested with realistic data volume when lock/runtime risk exists.

---

# 125. Backfill Testing

Backfill jobs SHOULD test:

```text
restart
duplicate execution
partial progress
batching
```

---

# 126. API Testing

HTTP APIs SHOULD test:

```text
method
status
schema
authorization
validation
pagination
errors
```

---

# 127. API Happy Path

Verify canonical response shape and semantics.

---

# 128. API Validation Tests

Test invalid:

```text
path
query
headers
body
```

according to endpoint.

---

# 129. API Authorization Tests

Test object and function authorization separately where relevant.

---

# 130. API Pagination Tests

Verify:

```text
first page
next page
empty result
invalid cursor
stable ordering
maximum page size
```

---

# 131. API Error Contract

Expected API failures SHOULD test their stable machine-readable error codes/schema.

---

# 132. API Compatibility Tests

Stable API changes SHOULD be checked for breaking schema/semantic changes.

---

# 133. Webhook Tests

Test provider/consumer webhook semantics:

```text
valid signature
invalid signature
duplicate event
old event
malformed payload
```

---

# 134. State Management Tests

Test state according to ownership.

---

# 135. Derived State Tests

Complex derivations SHOULD be tested as pure logic where possible.

---

# 136. URL State Tests

Verify:

```text
filters reflected in URL
reload restores view
back/forward works
```

for important route state.

---

# 137. Form State Tests

Verify:

```text
dirty state
validation
submit
reset
error preservation
```

---

# 138. Server-State Tests

Verify cache/invalidation behavior where stale state would materially harm UX/correctness.

---

# 139. Optimistic UI Tests

Test:

```text
optimistic success
server rejection
rollback
concurrent mutation
```

---

# 140. Persistence Tests

Persisted client state SHOULD test:

```text
reload
expiration
old schema
corruption
logout
tenant switch
```

---

# 141. Multi-Tab Tests

Security-sensitive or collaboration-heavy features SHOULD test multi-tab behavior where relevant.

---

# 142. Realtime Tests

Test:

```text
duplicate events
late events
out-of-order events
disconnect
reconnect
missed messages
```

according to protocol.

---

# 143. Fixture Philosophy

Fixtures should make tests:

```text
clear
minimal
valid by default
easy to override
```

---

# 144. Minimal Fixtures

Create only the state required for the test.

Avoid giant global fixtures containing the entire product universe.

---

# 145. Valid Defaults

Fixture factories SHOULD generate valid objects by default.

Example:

```text
buildUser()
```

creates a valid user unless overridden.

---

# 146. Explicit Important Values

Values relevant to the behavior being tested SHOULD be explicit.

Bad:

```text
buildInvoice()
```

when the test depends critically on its amount/status but those are hidden defaults.

---

# 147. Factories

Factories/builders are preferred for flexible test data.

Conceptually:

```text
createUser({
  role: "admin"
})
```

---

# 148. Fixture Ownership

Domain test fixtures should usually live near the domain that owns them.

Avoid one giant cross-project fixtures file.

---

# 149. Fixture Layers

Distinguish:

```text
object factory
database factory
API setup
E2E setup
```

when useful.

---

# 150. Shared Fixture Caution

Shared fixtures can create invisible coupling.

Changing one default should not break unrelated tests unexpectedly.

---

# 151. Golden Fixtures

Large immutable "golden" fixtures MAY be useful for:

```text
parser tests
serialization
complex schemas
```

but require deliberate maintenance.

---

# 152. Snapshot Testing

Snapshots are useful when the complete structured output is genuinely the contract.

---

# 153. Snapshot Anti-Pattern

Avoid enormous snapshots that reviewers approve without understanding.

---

# 154. Snapshot Review

Snapshot changes MUST be reviewed semantically.

Do not update snapshots merely to make tests green.

---

# 155. Inline Snapshots

Small inline snapshots MAY improve readability for compact stable structures.

---

# 156. Mocks

Mocks replace dependencies for test control.

They should be used deliberately.

---

# 157. Mock External Boundaries

Good mocking targets include:

```text
payment provider
email provider
clock
randomness
external HTTP API
```

---

# 158. Avoid Mocking Your Own Code Excessively

If every internal module is mocked, the test may only prove mocks interact with mocks.

---

# 159. Mock the Boundary, Not Every Function

Prefer:

```text
mock PaymentGateway
```

over mocking ten internal helper calls inside billing.

---

# 160. Fake

A fake provides a lightweight working implementation.

Example:

```text
in-memory email sink
fake clock
```

Fakes can be more realistic and less brittle than strict mocks.

---

# 161. Stub

A stub provides predetermined responses.

Useful where the test only needs controlled output.

---

# 162. Spy

Use spies when verifying an externally meaningful side effect.

Avoid spying on internal calls merely because the framework makes it easy.

---

# 163. Test Double Choice

Choose:

```text
fake
stub
mock
spy
```

according to what behavior requires control.

Do not call every test double a mock.

---

# 164. Mock Contract Drift

Mocks can diverge from real provider behavior.

High-value external mocks SHOULD be backed by:

```text
contract tests
sandbox tests
schema fixtures
```

where practical.

---

# 165. HTTP Mocking

Mock HTTP at a realistic boundary.

Prefer request-level mocking to replacing every application function when testing client behavior.

---

# 166. Database Mocking

Do not mock the database for tests whose correctness depends on SQL semantics.

---

# 167. Time Mocking

Tests depending on time SHOULD use a controlled clock.

Avoid:

```text
sleep(1000)
```

to make time pass.

---

# 168. Randomness

Inject/control randomness.

Tests MUST NOT unpredictably fail because of random data.

---

# 169. Randomized Property Tests

Property-based testing MAY intentionally generate randomized input.

When failure occurs:

```text
seed
minimal failing example
```

should be reproducible.

---

# 170. Network Calls

Routine unit/integration tests SHOULD NOT unexpectedly call the public internet.

External access should be explicit.

---

# 171. Mock Failure Modes

Mocks should represent realistic failures, not only success.

Examples:

```text
timeout
429
500
invalid schema
```

---

# 172. Test Data Philosophy

Test data MUST be:

```text
safe
deterministic
isolated
representative
```

---

# 173. Production Data

Raw production data SHOULD NOT be copied into test environments casually.

---

# 174. Synthetic Data

Prefer synthetic data for development/testing.

---

# 175. Sanitized Production-Like Data

Where production characteristics are necessary, use appropriately:

```text
masked
anonymized
synthetic
```

datasets under governance.

---

# 176. PII in Fixtures

Do not include real customer PII in committed fixtures.

---

# 177. Test Credentials

Test credentials MUST be separate from production credentials.

---

# 178. Secrets in Tests

Never commit real secrets because:

```text
"it's only test code"
```

---

# 179. Deterministic IDs

Tests MAY use fixed IDs where readability benefits.

Parallel tests need sufficient isolation.

---

# 180. Unique Test Data

Generate unique identifiers for shared/parallel environments.

Examples:

```text
test-run ID
random suffix with controlled generation
```

---

# 181. Test Data Cleanup

Cleanup strategy may be:

```text
transaction rollback
database reset
namespace isolation
explicit deletion
TTL
```

Choose one predictable model.

---

# 182. Transaction Rollback

Rollback can make integration tests fast but may not test commit-dependent behavior.

Use appropriate strategy.

---

# 183. Database Reset

Full reset provides strong isolation but may be expensive.

Use when cost remains acceptable.

---

# 184. Parallel Isolation

Parallel tests MUST NOT write to shared canonical resources accidentally.

---

# 185. Time Zones

Tests SHOULD explicitly set timezone where time behavior matters.

Do not rely on developer-machine locale.

---

# 186. Locale

Localization-sensitive tests SHOULD control locale.

---

# 187. Environment Variables

Tests SHOULD define required configuration deterministically.

Do not rely on whatever happens to exist on the developer machine.

---

# 188. Hermetic Tests

Prefer tests whose outcome depends only on controlled inputs and declared dependencies.

---

# 189. Determinism

A deterministic test:

```text
same code
+
same inputs
+
same environment
→
same result
```

---

# 190. Flaky Tests

A flaky test is a defect.

Definition:

> A test that can pass and fail against unchanged relevant code due to uncontrolled behavior.

---

# 191. Flaky Tests Must Not Be Normalized

Do not accept:

```text
"just rerun CI"
```

as the standard workflow.

---

# 192. Common Flake Sources

Typical causes:

```text
timing
race conditions
shared data
network dependency
animations
randomness
time
order dependence
resource exhaustion
```

---

# 193. Flake Diagnosis

When a test flakes:

```text
capture evidence
identify cause
repair test or product race
```

---

# 194. Quarantine

A flaky test MAY be temporarily quarantined if it blocks development disproportionately.

Quarantine MUST have:

```text
owner
issue
reason
remediation target
```

---

# 195. Quarantine Is Temporary

Quarantined tests must not become a permanent hidden suite.

---

# 196. Critical Test Flake

Critical security/payment/data-integrity tests SHOULD NOT simply be quarantined without replacing their protection.

---

# 197. Retry as Flake Detection

CI MAY rerun a failed test once to classify potential flakiness and gather evidence.

The first failure still matters.

---

# 198. Retry Is Not Fix

A test that passes on second attempt is not automatically healthy.

---

# 199. Flake Rate

Mature teams SHOULD track flaky-test rate.

---

# 200. Flake Budget

Teams MAY establish a maximum tolerated flaky-test rate approaching zero for core suites.

---

# 201. Test Order Independence

Tests MUST NOT depend on execution order unless a suite explicitly models a sequential workflow.

---

# 202. Randomized Order

Selected suites MAY randomize test order to expose hidden dependencies.

Failures must remain reproducible.

---

# 203. Parallel Execution

Tests SHOULD support parallel execution where practical.

This forces better isolation and improves CI speed.

---

# 204. Coverage Philosophy

Coverage is a diagnostic tool.

It is not proof of correctness.

---

# 205. Coverage Dimensions

Coverage tools may measure:

```text
lines
statements
functions
branches
```

None alone proves behavioral completeness.

---

# 206. Coverage Thresholds

Minimum thresholds MAY prevent severe testing gaps.

Do not optimize engineering work solely to reach arbitrary percentages.

---

# 207. Critical Code Coverage

Critical code deserves stronger behavioral coverage regardless of global percentage.

Examples:

```text
authorization
billing
security
money
tenant isolation
state transitions
```

---

# 208. 100% Coverage

100% line coverage can still miss:

```text
incorrect assertions
missing edge cases
integration failures
security bugs
```

Do not treat 100% as automatic proof of quality.

---

# 209. Low Coverage

Low coverage can reveal risk, especially in frequently changed critical modules.

Investigate rather than blindly chase numbers.

---

# 210. Changed-Code Coverage

Changed-code coverage MAY help prevent adding entirely untested behavior.

It should not encourage meaningless assertions.

---

# 211. Coverage Exclusions

Generated code and trivial mechanical files MAY be excluded where testing them provides little value.

Document exclusions.

---

# 212. Mutation Testing

Mutation testing MAY be used for critical pure logic to assess whether tests genuinely detect incorrect behavior.

Do not require it universally.

---

# 213. Property-Based Testing

Property-based testing is valuable when domain invariants hold across broad input spaces.

Examples:

```text
serialization round trips
financial invariants
parsers
state machines
```

---

# 214. Fuzz Testing

Fuzz testing is useful for:

```text
parsers
file formats
protocol handling
security-sensitive inputs
```

---

# 215. Golden Tests

Golden/reference-output tests are useful for deterministic transformations.

Baseline updates require review.

---

# 216. Approval Tests

Approval-style tests MAY help review large structured outputs.

Do not turn them into blind snapshot updating.

---

# 217. Architecture Tests

Architecture constraints SHOULD be automated where practical.

Examples:

```text
domain cannot import UI
client cannot import server-only module
feature cannot deep-import another feature
dependency cycles absent
```

---

# 218. Dependency Tests

CI SHOULD verify dependency policy where appropriate:

```text
lockfile consistency
forbidden packages
license policy
vulnerability policy
```

---

# 219. Lint vs Test

Static linting/type checks are not tests, but they are part of the verification pipeline.

Keep concerns distinct.

---

# 220. Type Checking

Strict type checking SHOULD run in CI.

Types eliminate some defect classes before runtime tests.

---

# 221. Build Verification

Production build SHOULD run before merge/deployment.

Development-mode tests alone cannot verify build compatibility.

---

# 222. CI Test Layers

A typical pipeline:

```text
Fast static checks
↓
Unit
↓
Integration/component
↓
Build
↓
E2E/visual/security as appropriate
↓
Deployment verification
```

Exact ordering may optimize parallelism.

---

# 223. Fast Feedback

Fast, deterministic tests SHOULD run earliest.

Fail quickly before expensive suites consume resources.

---

# 224. Parallel CI

Independent suites SHOULD run in parallel where infrastructure permits.

---

# 225. Test Sharding

Large suites MAY be sharded across workers.

Sharding requires reliable test isolation.

---

# 226. CI Time Budget

Test suites should have explicit attention to runtime.

A test suite that becomes too slow will eventually be bypassed.

---

# 227. Slow Test Tracking

Track slow tests/suites.

Optimize high-cost low-value tests first.

---

# 228. Do Not Sacrifice Confidence for Speed Blindly

Fast tests that prove nothing are not useful.

Balance realism and feedback time.

---

# 229. Local Test Workflow

Developers SHOULD be able to run relevant tests locally without requiring the complete production environment.

---

# 230. Focused Test Commands

Repositories SHOULD support:

```text
single test
single file
single package
affected tests
full suite
```

---

# 231. Watch Mode

Fast unit/component suites MAY support watch mode for local iteration.

---

# 232. Pre-Commit Testing

Pre-commit hooks SHOULD remain fast.

Do not run an hour-long E2E suite before every commit.

---

# 233. Pre-Push Testing

Larger verification MAY run before push if team workflow benefits.

CI remains authoritative.

---

# 234. Pull Request Gates

Required gates SHOULD protect:

```text
type correctness
lint/static checks
tests
build
critical security checks
```

according to risk.

---

# 235. Merge Blocking

A failing required test MUST block merge unless an authorized exception process exists.

---

# 236. Do Not Comment Out Failing Tests

Never:

```text
test.skip(...)
```

a legitimate failing test merely to obtain a green build without tracking the underlying defect.

---

# 237. Temporary Skip

A temporary skip requires:

```text
issue
owner
reason
```

where tooling/process permits.

---

# 238. Test Failure Ownership

A red main branch is an engineering incident.

Restore it promptly.

---

# 239. Main Branch Health

The default branch SHOULD remain releasable and green.

---

# 240. Branch-Specific Failures

If failures result from infrastructure rather than code, they still require ownership.

Do not normalize unreliable CI.

---

# 241. Test Reporting

CI failures SHOULD expose enough information to diagnose:

```text
failed assertion
logs
screenshots
trace
video where useful
```

without leaking secrets.

---

# 242. E2E Artifacts

For failed E2E tests, retain relevant:

```text
screenshot
trace
network log
video
```

where useful.

---

# 243. Artifact Privacy

Test artifacts may contain sensitive synthetic/account information.

Apply appropriate retention and access.

---

# 244. Screenshot-on-Failure

Prefer capture on failure rather than storing enormous numbers of unneeded screenshots.

---

# 245. Test Logs

Tests SHOULD emit useful diagnostics but avoid noisy logs on every successful path.

---

# 246. Test Failure Messages

Custom assertion messages MAY explain domain context when failures would otherwise be obscure.

---

# 247. CI Environment

CI SHOULD resemble production in important runtime characteristics.

It does not need to duplicate production scale.

---

# 248. Environment Parity

Critical differences such as:

```text
database engine
runtime version
feature flags
```

should be controlled.

---

# 249. Test Against Supported Runtime

Run tests against the actual supported production runtime/toolchain.

---

# 250. Browser Matrix

Test supported browsers according to product compatibility policy.

Do not run exhaustive browser combinations without user/business justification.

---

# 251. Primary Browser Coverage

Critical E2E journeys SHOULD run against at least the organization's primary supported browser engine.

---

# 252. Cross-Browser Coverage

Representative critical workflows SHOULD run against other supported engines when browser differences create meaningful risk.

---

# 253. Mobile Browser Testing

Responsive/mobile-critical workflows SHOULD receive representative mobile viewport/browser testing.

---

# 254. Real Device Testing

Real-device verification MAY be required for:

```text
mobile keyboard
touch
camera
file picker
passkeys
platform-specific behavior
```

where emulation is insufficient.

---

# 255. Test Data Contracts

Fixtures consumed by multiple packages/services should have documented ownership.

---

# 256. External Contract Recording

Recorded provider responses MAY be used as fixtures.

Review them for:

```text
PII
secrets
staleness
provider changes
```

---

# 257. Record/Replay Tests

Record/replay tools can accelerate deterministic external integration testing.

Do not blindly replay obsolete provider behavior forever.

---

# 258. Test Clock

Applications with significant temporal logic SHOULD expose a controllable clock abstraction where this meaningfully improves tests.

---

# 259. Time Boundary Tests

Test:

```text
expiry exact boundary
DST
month/year boundary
leap day
timezone conversion
```

where the domain depends on them.

---

# 260. Money Testing

Financial logic SHOULD test:

```text
rounding
currency precision
zero
negative restrictions
large values
```

according to domain rules.

---

# 261. Localization Tests

Internationalized interfaces SHOULD test representative:

```text
long translations
RTL where supported
number/date formatting
```

---

# 262. Empty-State Tests

Verify empty data renders an intentional empty state rather than looking broken.

---

# 263. Loading-State Tests

Verify loading behavior where asynchronous UX is important.

---

# 264. Error-State Tests

Verify error handling separately from empty/loading.

---

# 265. Permission-State Tests

Verify the UI does not expose misleading actions to unauthorized users, while server tests independently enforce authorization.

---

# 266. Feature-Flag Tests

Critical flag-controlled behavior SHOULD test:

```text
flag off
flag on
migration coexistence
```

where relevant.

---

# 267. Feature Flag Cleanup

Tests for removed flags should be removed or consolidated after permanent rollout.

Do not preserve obsolete branches indefinitely.

---

# 268. Upgrade Testing

Framework/library/database upgrades SHOULD run the complete relevant regression suite.

---

# 269. Dependency Upgrade Tests

High-risk dependencies may require targeted integration tests.

Examples:

```text
auth
database ORM
payments
serialization
```

---

# 270. Migration Between Providers

Provider migrations SHOULD include compatibility tests comparing old/new behavior where possible.

---

# 271. Performance Regression Tests

Critical performance-sensitive operations MAY enforce budgets.

Examples:

```text
bundle size
query count
render performance
API latency
```

---

# 272. Performance Tests Are Environment Sensitive

Use stable controlled environments for benchmark comparisons.

Do not fail builds on tiny noisy fluctuations.

---

# 273. Query Count Tests

High-risk paths MAY test against excessive query growth.

Example:

```text
listing 100 projects should not execute 101 owner queries
```

---

# 274. Bundle Tests

Frontend builds MAY enforce bundle-size budgets.

---

# 275. Load Tests

Critical services SHOULD undergo load testing when expected concurrency or capacity risk warrants it.

---

# 276. Load Test Environment

Do not conduct uncontrolled load testing against production.

Use approved scoped tests.

---

# 277. Stress Testing

Stress tests identify behavior beyond normal expected capacity.

Use to discover:

```text
failure point
degradation
recovery
```

---

# 278. Soak Testing

Long-duration tests MAY reveal:

```text
memory leaks
connection leaks
queue accumulation
```

---

# 279. Recovery Testing

Test not only failure but return to healthy state.

---

# 280. Backup Restore Tests

Database backup strategy is incomplete until restore is tested.

---

# 281. Disaster Recovery Exercises

Critical systems SHOULD periodically exercise significant recovery scenarios.

---

# 282. Test Documentation

Testing strategy SHOULD document:

```text
test layers
commands
environment requirements
fixture patterns
CI gates
```

---

# 283. Test Code Is Production Engineering Code

Tests require:

```text
readability
review
refactoring
ownership
```

Poor test code eventually slows product development.

---

# 284. Duplicate Test Helpers

Reusable test helpers SHOULD follow Reusability Guidelines.

Do not create a giant:

```text
testUtils
```

dumping ground.

---

# 285. Test Helper Scope

Prefer:

```text
feature-specific helper
domain factory
shared platform helper
```

at the narrowest correct scope.

---

# 286. Custom Assertions

Create domain-specific assertions where they materially improve clarity.

Example:

```text
expectAuditEvent(...)
```

---

# 287. Page Objects

E2E page objects MAY reduce repetition for stable interaction abstractions.

Avoid giant page-object layers that hide test intent.

---

# 288. Test Abstraction Principle

Abstract repetitive mechanics.

Do not abstract away the behavior being tested.

---

# 289. Helper Naming

Test helpers SHOULD use product/domain terminology.

---

# 290. AI Testing Rules

AI coding agents MUST inspect existing:

```text
test framework
test structure
factories
mocks
CI commands
coverage policy
```

before adding tests.

---

# 291. AI Test-First Failure Rule

For a reported reproducible bug, AI SHOULD add a failing regression test before or alongside the fix when practical.

---

# 292. AI Layer Rule

AI SHOULD choose the lowest meaningful test layer.

It MUST NOT automatically create E2E tests for every change.

---

# 293. AI Realism Rule

AI MUST NOT mock away the behavior actually under test.

If correctness depends on PostgreSQL:

```text
use PostgreSQL integration test
```

rather than a fake repository.

---

# 294. AI Assertion Rule

AI MUST assert meaningful outcomes.

Avoid weak tests that merely:

```text
call function
expect truthy
```

without proving requirements.

---

# 295. AI Mock Rule

AI SHOULD mock external boundaries, not every internal implementation function.

---

# 296. AI Test Data Rule

AI MUST NOT introduce real production PII or credentials into fixtures.

---

# 297. AI Fixture Rule

AI SHOULD use established factories and minimal fixtures.

Do not create huge setup payloads unnecessarily.

---

# 298. AI Authorization Rule

AI-generated protected features MUST include negative authorization tests.

---

# 299. AI Tenant Rule

AI MUST include cross-tenant tests for new tenant-scoped resource operations.

---

# 300. AI Error Rule

New failure handling SHOULD include tests for meaningful error paths.

---

# 301. AI Retry Rule

AI-generated retry logic MUST test:

```text
retryable error
non-retryable error
attempt limit
```

---

# 302. AI Idempotency Rule

AI-generated high-impact idempotent operations MUST test duplicate execution.

---

# 303. AI Form Rule

AI-generated forms SHOULD test:

```text
validation
submission
server rejection
input preservation
```

where meaningful.

---

# 304. AI Accessibility Rule

AI-generated interactive components MUST include accessibility-aware tests where the repository supports them.

---

# 305. AI Snapshot Rule

AI MUST NOT solve failing tests by blindly updating snapshots.

It should verify whether the behavior changed intentionally.

---

# 306. AI Flaky-Test Rule

AI MUST NOT simply add arbitrary waits or large retry counts to fix flaky tests.

Identify the synchronization or isolation problem.

---

# 307. AI Wait Rule

Prefer waiting for:

```text
specific UI condition
network completion
state transition
```

over:

```text
sleep(5000)
```

---

# 308. AI Coverage Rule

AI MUST NOT create meaningless tests solely to increase line coverage.

---

# 309. AI Existing-Test Rule

Before writing a new test, AI SHOULD search for existing tests covering the same behavior.

Extend the appropriate suite rather than duplicating coverage.

---

# 310. AI Test Removal Rule

AI MUST NOT delete failing tests merely because a refactor makes them inconvenient.

Determine whether the protected behavior still applies.

---

# 311. AI Production-Bug Rule

For production defects, AI SHOULD consider:

```text
regression test
monitoring improvement
missing boundary test
```

not merely patch code.

---

# 312. AI Security-Test Rule

Security fixes SHOULD include regression tests preventing recurrence where practical.

---

# 313. AI Gold Rule

When uncertain:

```text
Behavioral confidence
>
Realistic boundary verification
>
Determinism
>
Speed
>
Coverage percentage
```

---

# 314. Testing Review Checklist

Before merging substantial functionality:

```text
□ Critical behavior identified
□ Appropriate test layer selected
□ Happy path covered
□ Invalid input covered
□ Relevant authorization covered
□ Failure path covered
□ Boundary cases considered
□ Real integration used where semantics matter
□ Test data isolated
□ Tests deterministic
□ Tests readable
□ No unnecessary mocks
□ No arbitrary sleeps
□ No real secrets/PII
□ CI suite passes
```

---

# 315. Unit Test Checklist

```text
□ Logic worth isolating
□ Inputs explicit
□ Outputs/invariants explicit
□ External dependencies controlled
□ Test deterministic
□ Implementation details minimized
```

---

# 316. Integration Test Checklist

```text
□ Important boundary identified
□ Real dependency used where valuable
□ Environment isolated
□ Database state deterministic
□ Failure behavior covered
□ Cleanup/isolation reliable
```

---

# 317. Component Test Checklist

```text
□ User interaction tested
□ Semantic selectors used
□ Keyboard behavior considered
□ Error state tested
□ Accessible names present
□ Internal DOM details minimized
```

---

# 318. Contract Test Checklist

```text
□ Authoritative contract identified
□ Request schema checked
□ Response schema checked
□ Error contract checked
□ Compatibility considered
□ Provider/consumer ownership known
```

---

# 319. E2E Checklist

```text
□ Journey is business-critical
□ Setup deterministic
□ State isolated
□ UI used for target behavior
□ Assertions reflect user outcome
□ Diagnostics retained on failure
□ Test independently runnable
□ No arbitrary sleep
```

---

# 320. Visual Regression Checklist

```text
□ Surface is visually important
□ Viewport fixed
□ Dynamic content deterministic
□ Animations controlled
□ Baseline intentional
□ Difference manually reviewable
```

---

# 321. Accessibility Testing Checklist

```text
□ Automated scan
□ Semantic labels
□ Keyboard navigation
□ Focus behavior
□ Dynamic errors/status
□ Complex widgets manually verified where needed
```

---

# 322. Security Test Checklist

```text
□ Unauthenticated access
□ Unauthorized access
□ Wrong tenant
□ Mass assignment
□ Input boundaries
□ Replay/idempotency where relevant
□ Rate limiting where relevant
□ Sensitive output minimized
```

---

# 323. Flaky-Test Checklist

When a test flakes:

```text
□ Capture logs/trace
□ Reproduce
□ Check shared data
□ Check timing
□ Check race
□ Check network dependency
□ Check time/randomness
□ Fix root cause
□ Quarantine only temporarily if required
```

---

# 324. Test Data Checklist

```text
□ Synthetic/non-sensitive
□ Valid by default
□ Important values explicit
□ Unique where parallelism requires
□ Cleanup defined
□ No production credentials
□ Locale/time controlled where relevant
```

---

# 325. CI Checklist

```text
□ Static checks run
□ Type check runs
□ Unit tests run
□ Integration tests run
□ Production build runs
□ Required E2E runs
□ Security checks run
□ Failures block merge
□ Test artifacts useful
□ Runtime remains sustainable
```

---

# 326. Definition of Done — Feature Testing

A feature is not complete until:

```text
✓ Core behavior tested
✓ Important domain invariants tested
✓ Invalid input tested
✓ Authorization tested
✓ Tenant isolation tested where applicable
✓ Error/failure behavior tested
✓ Important integration boundary tested realistically
✓ UI behavior tested where appropriate
✓ Accessibility considered
✓ Regression protection exists
✓ Tests are deterministic
✓ Relevant CI passes
```

---

# 327. Definition of Done — Bug Fix

A bug fix is complete when:

```text
✓ Root cause understood
✓ Defect reproduced
✓ Regression test added where practical
✓ Fix implemented
✓ Relevant adjacent cases reviewed
✓ Full relevant suite passes
```

---

# 328. Definition of Done — External Integration

```text
✓ Success path tested
✓ Authentication tested
✓ Mapping tested
✓ Timeout tested
✓ Retry tested
✓ Rate limit considered
✓ Invalid response tested
✓ Provider failure tested
✓ Idempotency/reconciliation tested where required
✓ Contract drift protection exists
```

---

# 329. Testing Anti-Patterns

Avoid:

```text
Tests only for code coverage.
```

Avoid:

```text
Everything through E2E.
```

Avoid:

```text
Everything mocked.
```

Avoid:

```text
Mock database while testing database-dependent behavior.
```

Avoid:

```text
Mocking internal functions until no real code interacts.
```

Avoid:

```text
One global fixture containing everything.
```

Avoid:

```text
Tests depending on execution order.
```

Avoid:

```text
Tests sharing mutable users/tenants.
```

Avoid:

```text
sleep(5000)
```

as synchronization.

Avoid:

```text
rerun until green
```

as flaky-test policy.

Avoid:

```text
update every snapshot
```

without review.

Avoid:

```text
100% coverage = quality
```

Avoid:

```text
one happy-path authorization test
```

Avoid:

```text
frontend hiding = authorization test
```

Avoid:

```text
production PII in fixtures
```

Avoid:

```text
real credentials in test code
```

Avoid:

```text
test.skip()
```

with no owner.

Avoid:

```text
one 45-minute sequential CI suite
```

when work can be isolated/parallelized.

Avoid:

```text
testing private implementation instead of behavior
```

Avoid:

```text
visual snapshots as accessibility proof
```

Avoid:

```text
automated accessibility scanner = complete accessibility testing
```

Avoid:

```text
penetration test = entire security testing strategy
```

---

# 330. Golden Testing Rules

**1. Test behavior, not implementation trivia.**

**2. Use the lowest realistic test layer that provides confidence.**

**3. Critical boundaries receive real integration tests.**

**4. Do not mock away the thing being tested.**

**5. Unit tests protect deterministic domain logic.**

**6. Integration tests protect real system boundaries.**

**7. Component tests interact as users do.**

**8. Contract tests protect independently evolving interfaces.**

**9. E2E tests protect critical journeys, not every branch.**

**10. Visual tests supplement functional tests.**

**11. Automated accessibility testing is necessary but insufficient.**

**12. Security testing is continuous engineering, not only penetration testing.**

**13. Every critical permission has negative tests.**

**14. Multi-tenant systems test cross-tenant denial.**

**15. Database invariants are tested against the real database.**

**16. Migrations are production code and deserve tests.**

**17. Retries, timeouts, and idempotency are explicitly tested.**

**18. External dependency failure is tested.**

**19. Test fixtures are minimal and valid by default.**

**20. Production PII does not belong in ordinary test fixtures.**

**21. Mock external boundaries, not the entire application.**

**22. Control time and randomness.**

**23. Tests are deterministic and order-independent.**

**24. Arbitrary sleeps are prohibited as synchronization strategy.**

**25. Flaky tests are defects.**

**26. Retries do not make flaky tests healthy.**

**27. Quarantine is temporary and owned.**

**28. Coverage is a signal, not a goal by itself.**

**29. Critical code deserves deeper coverage than trivial code.**

**30. Snapshot changes require semantic review.**

**31. Every significant bug deserves regression protection where practical.**

**32. A green test suite must be trusted.**

**33. Test failures block delivery unless explicitly waived through governance.**

**34. CI optimizes fast feedback without sacrificing meaningful confidence.**

**35. Testing strategy evolves with system risk and architecture.**

---

# 331. Canonical Testing Standard

The organizational standard is:

> **Testing is a layered confidence system rather than a coverage-percentage exercise. Pure business logic and invariants are verified through fast deterministic unit tests; database, framework, authorization, and infrastructure boundaries are verified through realistic integration tests; interactive UI behavior is verified through component tests using semantic user interactions; independently evolving APIs, events, webhooks, and providers are protected through contract tests; and a limited high-value end-to-end suite verifies critical business, security, and revenue journeys across the deployed application.**

> **Visual regression, accessibility, security, resilience, performance, migration, and production smoke testing supplement these core layers according to system risk. Tests use isolated deterministic synthetic data, real underlying technologies where their semantics matter, and mocks/fakes primarily at genuine external boundaries. Production PII and credentials are prohibited from ordinary fixtures. Time, randomness, environment, locale, and network behavior are controlled wherever they can create nondeterminism.**

> **Flaky tests are engineering defects rather than accepted CI behavior. Automatic reruns may assist diagnosis but do not transform an unreliable test into a passing one. Temporary quarantine requires an owner and remediation path. Coverage metrics are used to identify risk, but meaningful behavioral assertions and protection of critical invariants take precedence over arbitrary percentages.**

> **Every material feature tests successful behavior, invalid input, relevant authorization and tenant boundaries, expected failure, and important integration behavior. Production defects receive regression tests where practical, security fixes receive durable protection, migrations and external dependencies are treated as testable production behavior, and the default branch remains reliably releasable.**

A mature test suite should make it easy to answer:

```text
What behavior does this test protect?
Why is this the correct test layer?
What real boundaries are exercised?
What has been mocked?
Could the mock differ from production?
What test data is used?
Is the test deterministic?
Can it run independently?
Does it test failure?
Does it test unauthorized behavior?
Does it test tenant isolation?
How would this test fail if the product regressed?
Does CI run it at the correct stage?
Who owns it if it becomes flaky?
```

If those questions cannot be answered, the test may be providing activity rather than confidence.

In the master hierarchy, **Testing** should sit after the core behavioral standards and Error/Resilience, but before Performance and Observability:

**Architecture → Framework → Security → Authentication & Authorization → Data & Database → API → Routes → State Management → Forms & Validation → Error Handling & Resilience → Testing → Performance → Observability → Infrastructure → Documentation → Governance.**
