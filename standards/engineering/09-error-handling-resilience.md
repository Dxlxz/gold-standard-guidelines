---
id: "error-handling-resilience"
title: "Error Handling & Resilience Guidelines — Gold Standard"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "error", "handling", "resilience"]
applies_to: ["general"]
related: []
legacy_number: 16
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 65734
provenance: baseline

---

Below is the canonical standard for **application errors, distributed-system failure, dependency outages, retries, timeout budgets, degradation, and recovery behavior**.

# Error Handling & Resilience Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical standard for:

- error classification;
- typed errors;
- validation failures;
- domain errors;
- infrastructure failures;
- exception handling;
- API error propagation;
- retries;
- backoff;
- timeouts;
- cancellation;
- circuit breakers;
- bulkheads;
- graceful degradation;
- fallbacks;
- partial failures;
- dependency outages;
- queue failures;
- reconciliation;
- recovery;
- observability;
- user-facing error UX.

The objectives are to make failures:

- predictable;
- contained;
- diagnosable;
- recoverable;
- secure;
- observable;
- understandable to users;
- safe to retry where appropriate.

The core principle is:

> **Failure is a normal operating condition. Systems must define how they fail, how far failure propagates, what remains available, and how recovery occurs.**

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
Failure mode
Blast radius
Compensating control
Owner
Review date
```

---

# 3. Errors Are Part of the Contract

For every meaningful operation, define:

```text
Success
Expected failure
Unexpected failure
Retry behavior
Recovery behavior
User-facing behavior
Observability
```

Do not design only the success path.

---

# 4. Failure Taxonomy

Every failure SHOULD be classified into a meaningful category.

Canonical categories:

```text
Validation
Authentication
Authorization
Not found
Conflict
Rate limit
Quota
Domain rule
Dependency
Timeout
Concurrency
Transient infrastructure
Permanent infrastructure
Data integrity
Programming defect
Security incident
Unknown
```

---

# 5. Expected vs Unexpected Errors

The most important distinction is:

```text
Expected error
→ known business/operational outcome

Unexpected error
→ defect, infrastructure surprise, or unclassified failure
```

---

# 6. Expected Errors

Expected errors include:

```text
Invalid user input
Permission denied
Resource not found
Duplicate resource
Quota exceeded
Invalid state transition
Conflict
Rate limit exceeded
```

These SHOULD have intentional handling.

---

# 7. Unexpected Errors

Unexpected errors include:

```text
Null dereference
Invariant violation
Unknown database failure
Serialization defect
Unexpected provider response
Unhandled exception
Memory exhaustion
```

These SHOULD surface through generic safe user-facing behavior and detailed internal diagnostics.

---

# 8. Do Not Treat Expected Errors as Crashes

Bad:

```text
User enters duplicate email
→ throw generic Error
→ log as production exception
→ 500
```

Better:

```text
duplicate email
→ typed conflict/domain error
→ safe user message
→ expected metric
```

---

# 9. Do Not Hide Unexpected Errors

Bad:

```text
try {
  ...
} catch {
  return null
}
```

Unexpected failures must not silently become valid-looking empty state.

---

# 10. Typed Errors

Important application errors SHOULD use explicit machine-readable types or codes.

Conceptually:

```text
ValidationError
AuthenticationError
AuthorizationError
NotFoundError
ConflictError
RateLimitError
DependencyError
TimeoutError
```

---

# 11. Error Identity

Machine behavior should depend on:

```text
error type
error code
structured metadata
```

not human-readable strings.

---

# 12. Never Parse Error Messages

Avoid:

```text
if (error.message.includes("duplicate"))
```

Use stable error types/codes.

---

# 13. Error Message vs Error Code

Distinguish:

```text
code
→ stable machine contract

message
→ human/debug text
```

Messages may change.

Codes should remain stable if callers depend on them.

---

# 14. Error Metadata

Structured errors MAY include:

```text
code
category
retryable
httpStatus
cause
resourceId
field
retryAfter
requestId
```

depending on layer.

Do not expose all internal metadata to clients.

---

# 15. Error Cause Chains

Preserve causal context internally.

Example:

```text
PaymentCaptureError
caused by
ProviderTimeoutError
caused by
SocketTimeout
```

This improves diagnosis.

---

# 16. Do Not Lose Root Cause

Avoid wrapping errors repeatedly while discarding original cause.

Preserve causal chains where runtime/language permits it.

---

# 17. Error Boundaries by Layer

Different layers have different error responsibilities.

```text
Infrastructure
↓
Application
↓
API / Presentation
↓
User
```

Each boundary may translate errors.

---

# 18. Infrastructure Errors

Infrastructure code may produce detailed implementation errors such as:

```text
database connection failure
provider timeout
queue publish failure
storage failure
```

These should not leak directly to product consumers.

---

# 19. Application Error Translation

Application layer translates infrastructure failure into domain-relevant semantics where possible.

Example:

```text
Stripe timeout
↓
PaymentProviderUnavailable
```

---

# 20. Presentation Error Translation

Presentation/API layer translates application errors into:

```text
HTTP status
error code
user-safe message
UI state
```

---

# 21. Error Translation Should Preserve Meaning

Do not map every failure to:

```text
Something went wrong.
```

internally.

Keep rich structured cause data for operators.

---

# 22. Domain Errors

Use domain errors when the requested action is invalid according to business rules.

Examples:

```text
InvoiceAlreadyPaid
SubscriptionAlreadyCancelled
LastOwnerCannotBeRemoved
InsufficientInventory
```

---

# 23. Domain Errors Are Expected

Domain errors usually SHOULD NOT:

```text
page operators
trigger exception alerts
produce stack-trace noise
```

unless frequency itself indicates abuse or regression.

---

# 24. Validation Errors

Validation failures SHOULD identify actionable fields/constraints.

They are not system failures.

---

# 25. Authentication Errors

Authentication failures include:

```text
missing credentials
invalid credentials
expired credentials
invalid session
```

They require security-aware handling.

---

# 26. Authorization Errors

Authorization errors mean:

```text
identity understood
+
requested action not permitted
```

Do not expose sensitive policy internals unnecessarily.

---

# 27. Not Found

Not-found errors may mean:

```text
resource does not exist
```

or intentionally:

```text
caller should not know resource exists
```

depending on security policy.

---

# 28. Conflict

Conflict errors represent valid requests that cannot proceed due to current state.

Examples:

```text
duplicate slug
stale version
already completed
resource locked
```

---

# 29. Concurrency Errors

Concurrency failures SHOULD be explicit.

Examples:

```text
OptimisticLockConflict
SerializationFailure
VersionMismatch
```

They often have specialized retry/recovery semantics.

---

# 30. Rate-Limit Errors

Rate limiting should return or expose:

```text
limit exceeded
retry timing where appropriate
scope where safe
```

Do not treat rate limit as generic infrastructure failure.

---

# 31. Quota Errors

Quota exhaustion differs from rate limiting.

```text
Rate limit
→ too much activity now

Quota
→ allocation exhausted
```

The recovery UX differs.

---

# 32. Dependency Errors

External dependency failures SHOULD identify the dependency class internally.

Example:

```text
PaymentProviderUnavailable
EmailProviderUnavailable
ObjectStorageUnavailable
```

Do not expose provider internals unnecessarily to end users.

---

# 33. Timeout Errors

Timeout is a distinct failure category.

It does not necessarily mean the downstream operation failed.

It may mean:

```text
result unknown
```

This matters for retry safety.

---

# 34. Unknown Outcome

Critical operations must distinguish:

```text
failed
```

from:

```text
client did not receive confirmation
```

Example:

```text
payment request timed out
```

may have succeeded at the provider.

---

# 35. Ambiguous Outcome

When outcome is ambiguous:

```text
do not blindly repeat
```

Use:

```text
idempotency key
status lookup
reconciliation
```

---

# 36. Programming Errors

Programming defects include:

```text
assertion failure
impossible state
unexpected null
invalid internal enum
```

These SHOULD be treated as unexpected.

---

# 37. Assertions

Assertions are appropriate for internal invariants.

Do not use assertions for expected user input validation.

---

# 38. Invariant Violations

An invariant violation SHOULD:

```text
fail loudly
be logged
be correlated
trigger investigation
```

rather than being silently corrected unless the correction is deliberate.

---

# 39. Error Catching

Catch an error only when the current layer can:

```text
recover
translate
add meaningful context
cleanup
```

Do not catch simply to rethrow identical information.

---

# 40. Narrow Catch Blocks

Prefer narrow catch scope.

Bad:

```text
try {
  200 lines of unrelated work
} catch {
  ...
}
```

A narrow scope makes cause classification more reliable.

---

# 41. Avoid Catch-All Suppression

Avoid:

```text
catch (error) {
  return undefined
}
```

unless absence is genuinely the intended recovery contract.

---

# 42. Finally

Use cleanup/finalization constructs for:

```text
release lock
close resource
clear temporary state
```

that must occur regardless of success/failure.

---

# 43. Resource Cleanup

Resources such as:

```text
file handles
database connections
leases
temporary files
streams
```

must have deterministic cleanup behavior.

---

# 44. User-Facing Error Language

User-facing errors should answer:

```text
What happened?
Can I recover?
What should I do next?
```

---

# 45. Error UX Severity

Not every failure deserves a modal.

Use severity proportional to impact.

---

# 46. Field Error

Use field-level errors for input-specific problems.

---

# 47. Inline Error

Use inline contextual errors when a local operation fails.

Example:

```text
Couldn’t load comments. Retry
```

---

# 48. Page-Level Error

Use page-level error state when the primary page resource cannot load.

---

# 49. Global Error

Use global error treatment only when the application as a whole is affected.

Examples:

```text
session invalid
offline
major service outage
```

---

# 50. Toast Errors

Toasts MAY communicate transient secondary failures.

Do not use a disappearing toast as the only recovery path for a critical failed operation.

---

# 51. Modal Errors

Use modal interruption only where immediate attention is required.

Do not turn ordinary recoverable network failures into modal spam.

---

# 52. Preserve User Work

Recoverable failures SHOULD preserve:

```text
form input
draft
selection
context
```

where safe.

---

# 53. Retry UI

When retry is safe, provide a clear:

```text
Retry
```

action close to the failed content.

---

# 54. Disable Impossible Retry

Do not show Retry when:

```text
operation is permanently invalid
permission was revoked
resource was deleted
```

Use appropriate alternate recovery.

---

# 55. Explain Permission Recovery

Where appropriate:

```text
You no longer have access to this workspace.
```

is more useful than:

```text
Something went wrong.
```

---

# 56. Error Pages

Canonical application error pages SHOULD exist for:

```text
404
403 where exposed
unexpected page error
maintenance/unavailable
```

according to routing architecture.

---

# 57. Error Page Recovery

Provide useful recovery paths such as:

```text
Back
Home
Retry
Return to workspace
```

rather than dead ends.

---

# 58. Partial Failure

Many operations have multiple sub-results.

Examples:

```text
dashboard with 8 widgets
batch mutation
multi-provider data
multi-file upload
```

Partial failure should be modeled intentionally.

---

# 59. Partial Failure Principle

If one independent section fails, do not automatically fail the entire product surface.

---

# 60. Dashboard Example

Prefer:

```text
Revenue widget
→ loaded

Activity widget
→ failed + Retry

Projects
→ loaded
```

over:

```text
whole dashboard = error
```

when dependencies are independent.

---

# 61. Atomic Operations

Partial success is inappropriate when the business operation must be atomic.

Example:

```text
transfer money
```

must not silently complete only half the transaction.

---

# 62. Batch Operations

Batch APIs MUST define:

```text
atomic all-or-nothing
```

or:

```text
per-item results
```

---

# 63. Per-Item Results

For partial batch success, return enough information to identify:

```text
succeeded
failed
reason
retryable
```

for each item.

---

# 64. Bulk UX

Bulk operation UI should communicate:

```text
37 succeeded
3 failed
```

rather than simply:

```text
Operation failed
```

when partial results are legitimate.

---

# 65. Partial Failure Recovery

Allow retrying only the failed subset where practical.

---

# 66. Graceful Degradation

Graceful degradation means preserving core functionality when noncritical capability fails.

---

# 67. Critical vs Optional Dependencies

Classify dependencies:

```text
Critical
Important
Optional
```

---

# 68. Critical Dependency

If a critical dependency fails:

```text
operation may need to fail
```

Example:

```text
authorization service unavailable
```

may require denial.

---

# 69. Optional Dependency

If an optional dependency fails:

```text
core operation may continue
```

Example:

```text
analytics unavailable
```

must not block checkout.

---

# 70. Important Dependency

Important dependencies may permit degraded operation.

Example:

```text
recommendation service unavailable
→ show default recommendations
```

---

# 71. Failure Independence

Architect systems so optional features do not share unnecessary failure domains with core workflows.

---

# 72. Fallback UX

Fallbacks should be:

```text
safe
predictable
clearly limited
```

not invented dynamically after an outage.

---

# 73. Good Fallbacks

Examples:

```text
live recommendations unavailable
→ popular items

avatar CDN unavailable
→ initials placeholder

analytics unavailable
→ continue without event

preview generation unavailable
→ show source file
```

---

# 74. Unsafe Fallbacks

Never degrade:

```text
authorization unavailable
→ allow everyone
```

or:

```text
fraud service unavailable
→ approve all high-risk payments
```

without explicit risk policy.

---

# 75. Security Fails Closed

Security-sensitive controls SHOULD generally fail closed.

Examples:

```text
permission service unknown
→ deny

signature validation unavailable
→ reject
```

---

# 76. Availability Fails Open Carefully

Non-security features MAY fail open where safe.

Example:

```text
analytics collector unavailable
→ continue request
```

---

# 77. Dependency Outage Plan

For every critical external dependency define:

```text
Detection
Timeout
Retry
Circuit breaker
Fallback
User impact
Operator response
Recovery
Reconciliation
```

---

# 78. Dependency Inventory

Maintain awareness of:

```text
database
identity provider
payment provider
email
storage
search
queue
AI provider
third-party API
```

used by critical flows.

---

# 79. Timeout Principle

Every network call MUST have a finite timeout.

Infinite waiting is prohibited.

---

# 80. Timeout Layers

Different timeouts may exist:

```text
connection timeout
read timeout
write timeout
overall request timeout
```

Understand what the platform exposes.

---

# 81. Timeout Budget

Timeouts should derive from the end-to-end latency budget.

Example:

```text
User request budget: 3 s

Application:
2.5 s

Database:
500 ms target

Provider A:
800 ms

Fallback/recovery:
remaining budget
```

---

# 82. Nested Timeout Rule

A child dependency timeout must leave enough time for:

```text
cleanup
fallback
error handling
```

before the parent deadline expires.

---

# 83. Do Not Stack Excessive Timeouts

Bad:

```text
API gateway 60 s
app 60 s
provider 60 s
database 60 s
```

This creates long resource retention.

---

# 84. Short vs Long Operations

Interactive requests should generally have shorter bounded timeouts.

Long work should move to:

```text
background job
async operation
```

where appropriate.

---

# 85. Timeout Is Not Cancellation

A caller timing out does not guarantee the downstream operation stopped.

---

# 86. Cancellation Propagation

Where supported, propagate cancellation/deadline signals downstream.

Examples:

```text
client disconnect
request cancelled
deadline exceeded
```

---

# 87. Cancellation Safety

Cancellation must not leave:

```text
corrupt transaction
half-written file
unreleased lock
```

---

# 88. Retry Principle

Retry only when:

```text
failure is plausibly transient
AND
operation can be safely retried
```

---

# 89. Retryable Failures

Potential examples:

```text
temporary connection failure
temporary 503
rate limit with Retry-After
deadlock
serialization conflict
```

depending on operation.

---

# 90. Non-Retryable Failures

Usually do not retry:

```text
validation
authentication failure
authorization failure
not found
business-rule rejection
malformed request
```

---

# 91. Retry Limit

All retries MUST be bounded.

Avoid:

```text
while (true) retry()
```

---

# 92. Exponential Backoff

Use increasing delay where retries are appropriate.

Conceptually:

```text
1 s
2 s
4 s
8 s
```

subject to configured limits.

---

# 93. Jitter

Add jitter for distributed retries to avoid synchronized retry storms.

---

# 94. Retry-After

Respect explicit server retry guidance where appropriate.

---

# 95. Retry Budget

Retries consume:

```text
latency
capacity
dependency load
money
```

They are not free.

---

# 96. Retry Storm

During outages:

```text
100 requests
× 3 retries
= 300 downstream requests
```

can make the outage worse.

---

# 97. Layered Retry Explosion

Avoid retrying the same operation independently at:

```text
SDK
service
gateway
queue
```

unless carefully coordinated.

---

# 98. Retry Ownership

Define which layer owns retries.

Do not let every layer retry automatically.

---

# 99. Idempotency

Retryable writes MUST be idempotent or otherwise protected from duplicate side effects.

---

# 100. Idempotency Keys

Use stable operation identity for high-impact writes.

Examples:

```text
payment
order creation
provisioning
invitation
webhook processing
```

---

# 101. Idempotency Result

Repeated identical operations should return the same effective business result where contract permits.

---

# 102. Idempotency Conflict

Same idempotency key with different semantic request SHOULD be rejected.

---

# 103. Unknown Outcome Recovery

For timeout after an idempotent write:

```text
retry with same idempotency key
```

or query operation status.

---

# 104. Retry Reads

Read operations are generally safer to retry.

Still consider:

```text
cost
load
rate limit
consistency
```

---

# 105. Retry Deletes

HTTP DELETE may be idempotent semantically, but downstream side effects must still be designed accordingly.

---

# 106. Queue Retry

Background jobs often require retry policies separate from HTTP retry policies.

---

# 107. Queue Retry Categories

Classify job failures:

```text
transient
permanent
poison payload
dependency outage
business rejection
```

---

# 108. Dead-Letter Queue

Messages/jobs that repeatedly fail SHOULD move to:

```text
dead-letter queue
quarantine
failure store
```

where operators can inspect/recover.

---

# 109. DLQ Is Not Disposal

A dead-letter queue requires:

```text
owner
monitoring
retention
replay procedure
```

---

# 110. Poison Messages

A malformed/permanently invalid message SHOULD NOT be retried forever.

---

# 111. Retry Scheduling

Queue retries should use increasing delays where appropriate.

---

# 112. Job Idempotency

Background workers MUST tolerate duplicate delivery where the queue may provide at-least-once semantics.

---

# 113. Circuit Breakers

A circuit breaker temporarily stops calls to a failing dependency.

Canonical states:

```text
Closed
Open
Half-open
```

---

# 114. Closed Circuit

Normal calls proceed.

Failure rate is monitored.

---

# 115. Open Circuit

Calls fail fast without reaching the unhealthy dependency.

---

# 116. Half-Open Circuit

A small number of probe requests test whether dependency health has recovered.

---

# 117. Circuit Breaker Purpose

Use circuit breakers to:

```text
prevent repeated expensive failure
protect resources
reduce cascading failure
allow dependency recovery
```

---

# 118. Do Not Add Circuit Breakers Everywhere

Circuit breakers add state and operational complexity.

Use where:

```text
dependency failure is repeated
calls are expensive
failure amplification is meaningful
```

---

# 119. Circuit Breaker Scope

Scope may be:

```text
per dependency
per endpoint
per tenant
per region
```

according to failure semantics.

---

# 120. Circuit Breaker Thresholds

Thresholds SHOULD derive from:

```text
failure rate
latency
minimum request count
time window
```

not arbitrary copied numbers.

---

# 121. Circuit Breaker Error

When circuit is open, return/propagate a distinct internal error.

Do not pretend the dependency was actually called.

---

# 122. Circuit Recovery

Recovery should be gradual.

Avoid sending full traffic immediately after one successful probe.

---

# 123. Bulkheads

Bulkheads isolate resource pools so one failing workload does not consume all capacity.

Examples:

```text
separate thread pools
separate worker pools
separate queues
separate connection pools
```

---

# 124. Bulkhead Use

Useful when:

```text
slow external provider
```

could otherwise exhaust resources needed for core requests.

---

# 125. Shared Pool Risk

One shared pool can allow:

```text
optional workload
```

to starve:

```text
critical workload
```

---

# 126. Connection Pool Isolation

High-risk dependency workloads MAY receive separate connection pools.

---

# 127. Queue Isolation

Separate queues MAY be appropriate for:

```text
critical jobs
bulk jobs
low-priority analytics
```

---

# 128. Concurrency Limits

Bound concurrent requests to expensive dependencies.

---

# 129. Semaphore Pattern

A concurrency limiter can prevent:

```text
1000 simultaneous calls
```

from overwhelming a dependency that supports 50.

---

# 130. Backpressure

Backpressure means refusing/slowing incoming work when downstream capacity is saturated.

---

# 131. Backpressure Mechanisms

Examples:

```text
queue limits
429/503
concurrency limits
producer throttling
load shedding
```

---

# 132. Load Shedding

Reject lower-priority work under extreme load to protect core functionality.

---

# 133. Priority

Explicitly define workload priority.

Example:

```text
Checkout
>
Account settings
>
Analytics export
```

---

# 134. Load-Shed Response

Rejected traffic should fail quickly and clearly.

Do not let it consume scarce resources before rejection.

---

# 135. Graceful Degradation Matrix

Critical products SHOULD define something similar to:

| Dependency | Normal | Degraded | Hard Failure |
|---|---|---|---|
| Search | Full search | Basic DB search | Browse only |
| Email | Send immediately | Queue | Show pending |
| Analytics | Record events | Buffer/drop | Product continues |
| Recommendations | Personalized | Popular defaults | Hidden |
| AuthZ | Policy evaluation | Safe cached policy if approved | Deny |

---

# 136. Fallback Data

Fallback data should identify its freshness when stale data matters.

---

# 137. Stale Data

Serving stale cached data MAY be preferable to failure when:

```text
temporary staleness is safe
```

---

# 138. Stale-If-Error

For eligible read-only content:

```text
fresh dependency failure
→ use safe stale value
```

can improve availability.

---

# 139. Unsafe Stale Data

Do not serve stale values for:

```text
authorization
account lock state
critical financial balance
security configuration
```

unless an explicit risk model permits it.

---

# 140. Default Values as Fallback

Do not substitute fabricated defaults that change business meaning.

Bad:

```text
pricing service failed
→ price = 0
```

---

# 141. Fallback Must Preserve Semantics

Fallback should be a legitimate degraded behavior.

Not an invented value.

---

# 142. Dependency Caching

Cache dependency results when:

```text
freshness tolerance exists
dependency calls are expensive
availability benefits
```

---

# 143. Cached Fallback

Know:

```text
age
source
authorization context
```

of cached fallback data.

---

# 144. Dependency Failure Isolation

Failure of:

```text
email
analytics
notifications
```

should not roll back a successful core database transaction unless they are part of the business invariant.

---

# 145. Post-Commit Side Effects

Use:

```text
outbox
queue
background processing
```

for side effects that need reliable execution after a successful transaction.

---

# 146. Dual-Write Failure

Avoid:

```text
write DB
↓
publish message
```

without handling failure between the two steps.

---

# 147. Outbox Pattern

Use an outbox where reliable event publication must correspond to committed database state.

---

# 148. Compensating Actions

When distributed steps cannot be atomically rolled back, define business compensation.

Example:

```text
charge succeeded
ticket creation failed
→ refund/void according to workflow
```

---

# 149. Compensation Is Business Logic

Compensation should be:

```text
explicit
idempotent where possible
auditable
```

---

# 150. Saga Failure

Long-running workflows SHOULD track:

```text
current step
completed steps
failed step
compensation state
```

---

# 151. Recovery State

Do not leave distributed workflows in invisible unknown state.

Persist orchestration status where necessary.

---

# 152. Reconciliation

Systems interacting with external authorities SHOULD have reconciliation.

Examples:

```text
payments
orders
subscriptions
provisioning
```

---

# 153. Reconciliation Principle

Do not assume:

```text
no webhook
= operation never happened
```

Use authoritative status retrieval where needed.

---

# 154. Scheduled Reconciliation

Critical integrations MAY periodically reconcile:

```text
our state
↔
provider state
```

---

# 155. Manual Reconciliation

Provide operator tooling for exceptional mismatches.

---

# 156. Dependency Timeouts

Each dependency adapter SHOULD define its own timeout policy.

Do not scatter raw timeout constants across feature code.

---

# 157. Dependency Retry Policy

Centralize provider-specific retry behavior where practical.

---

# 158. Error Translation at Adapters

Provider adapters SHOULD translate provider-specific errors into application-level types.

Example:

```text
Stripe 429
→ PaymentProviderRateLimited

AWS timeout
→ ObjectStorageTimeout
```

---

# 159. Provider SDK Errors

Do not leak vendor SDK classes across the entire application.

Contain them at adapter boundaries where practical.

---

# 160. Dependency Health

Monitor:

```text
availability
latency
error rate
rate limiting
```

of critical dependencies.

---

# 161. Dependency SLO Awareness

Know external provider reliability assumptions for critical flows.

Do not architect your system as more reliable than its unavoidable dependencies without fallback.

---

# 162. Authentication Provider Outage

Define:

```text
existing session behavior
new login behavior
admin access
recovery
```

during identity-provider outage.

---

# 163. Payment Provider Outage

Possible behavior:

```text
checkout unavailable
order remains unpaid
safe retry later
status reconciliation
```

Do not fabricate payment success.

---

# 164. Email Provider Outage

Possible behavior:

```text
core transaction succeeds
email queued for retry
user sees operation succeeded
```

if email is noncritical.

---

# 165. Storage Outage

Define whether upload:

```text
fails
queues
temporarily disables capability
```

according to product semantics.

---

# 166. Search Outage

Possible fallback:

```text
search unavailable
```

or:

```text
basic database search
```

if safe and affordable.

---

# 167. Queue Outage

If queue publication fails after database success, use outbox/retry rather than silently losing work.

---

# 168. Database Outage

A primary transactional database outage will often make core writes unavailable.

Fail quickly and preserve clear user state.

---

# 169. Read Replica Outage

Fallback to primary MAY be acceptable if capacity permits.

Avoid causing primary overload automatically during replica failure.

---

# 170. Cache Outage

A cache should not normally be required for correctness unless explicitly designed as durable state.

On cache outage, consider:

```text
bypass
limited fallback
load protection
```

---

# 171. Cache Stampede

When a shared cached item expires, avoid thousands of simultaneous recomputations.

Possible controls:

```text
request coalescing
soft TTL
jitter
locking
stale-while-revalidate
```

---

# 172. Thundering Herd

Distributed recovery should avoid synchronized reconnect/retry storms.

Use jitter and staged recovery.

---

# 173. Startup Dependency Failure

Decide whether a service should:

```text
fail startup
start degraded
retry initialization
```

for each dependency.

---

# 174. Required Startup Dependencies

If the process cannot operate safely without a dependency, fail readiness until dependency is usable.

---

# 175. Optional Startup Dependencies

Optional systems should not necessarily block startup.

---

# 176. Liveness vs Readiness

Distinguish:

```text
Liveness
→ process should be restarted?

Readiness
→ process can receive traffic?
```

---

# 177. Bad Health Check

Avoid health checks that mark the whole process dead because one optional dependency is temporarily unavailable.

---

# 178. Readiness Failure

A service that cannot safely process requests SHOULD become unready.

---

# 179. Dependency Health Checks

Do not overload dependencies with constant expensive health checks.

Use lightweight checks.

---

# 180. Self-Healing

Automated recovery MAY include:

```text
restart
failover
retry
reconnect
reschedule
```

but must not mask persistent defects indefinitely.

---

# 181. Restart Is Not Recovery Strategy

If a bug reappears after every restart, restarting merely delays diagnosis.

---

# 182. Crash-Only Strategy

For some processes, terminating on corrupted/unrecoverable internal state is safer than continuing.

Supervision can restart cleanly.

---

# 183. Process-Level Fatal Errors

Fatal examples may include:

```text
invalid boot configuration
required secret missing
database schema incompatible
irrecoverable internal corruption
```

---

# 184. Request-Level Errors

Ordinary request failures should not crash the process.

---

# 185. Error Isolation

One malformed request should not bring down:

```text
worker
service
application
```

unless runtime architecture requires it.

---

# 186. Worker Isolation

Background job failure should normally fail the job, not the entire worker fleet.

---

# 187. Uncaught Exceptions

Global exception handlers are final safeguards, not normal control flow.

---

# 188. Unhandled Promise/Rejection

Runtime-level unhandled asynchronous errors must be surfaced and handled according to platform safety guidance.

---

# 189. Graceful Shutdown

During shutdown:

```text
stop accepting work
complete or cancel in-flight work
release leases
flush essential state
close resources
```

within a bounded deadline.

---

# 190. Shutdown Timeout

Graceful shutdown itself must have a maximum duration.

---

# 191. Job Lease

Long-running workers SHOULD use leases/heartbeats where duplicate processing after worker death must be managed.

---

# 192. Orphaned Work

Define recovery when a worker dies mid-job.

---

# 193. Distributed Locks

Distributed locks require:

```text
expiry
ownership
renewal
failure semantics
```

Do not assume a lock is permanent.

---

# 194. Fencing Tokens

For high-risk distributed locking, fencing/version mechanisms MAY be necessary to prevent stale lock holders acting after lease expiry.

---

# 195. Error Logging

Unexpected errors SHOULD be logged with enough structured context to diagnose.

---

# 196. Structured Error Logs

Typical fields:

```text
error type
error code
requestId
operation
service
tenant where safe
resource
dependency
duration
```

---

# 197. Stack Traces

Stack traces are useful for unexpected internal errors.

Do not expose them to untrusted clients.

---

# 198. Expected Error Logging

Expected user errors SHOULD NOT flood exception monitoring.

Use:

```text
metrics
structured events
lower-severity logs
```

as appropriate.

---

# 199. Error Severity

Suggested internal levels:

```text
Debug
Info
Warn
Error
Fatal
```

Use consistently.

---

# 200. Warning

A warning indicates:

```text
unexpected/degraded condition
but operation may continue
```

---

# 201. Error

An error indicates meaningful operation failure requiring diagnosis or expected handling.

---

# 202. Fatal

Fatal means the process/system cannot safely continue.

Use rarely.

---

# 203. Correlation IDs

Every unexpected distributed failure SHOULD be traceable through a correlation/request ID.

---

# 204. Trace Context

Propagate trace/correlation context across:

```text
HTTP
queues
workers
service calls
```

where supported.

---

# 205. Error Cardinality

Do not create unbounded metric labels from:

```text
raw message
resource ID
user input
```

Use stable error codes.

---

# 206. Error Metrics

Track categories such as:

```text
5xx rate
dependency errors
timeout rate
retry rate
circuit-open rate
DLQ growth
```

---

# 207. SLO Errors

SLO/error-budget calculations should distinguish user-impacting failures from expected client misuse where appropriate.

---

# 208. Alerting

Alert on:

```text
sustained unexpected error rate
critical dependency outage
circuit breaker open
queue backlog
DLQ growth
reconciliation mismatch
```

where action is required.

---

# 209. Avoid Alerting on Every Error

One isolated error is often not an incident.

Alert based on:

```text
rate
duration
impact
criticality
```

---

# 210. Error Spike Detection

Sudden change from baseline can reveal deployment regressions even before absolute threshold is exceeded.

---

# 211. Dependency Dashboard

Critical dependency dashboards SHOULD show:

```text
latency
success rate
timeout rate
retry count
circuit state
```

---

# 212. Recovery Metrics

Measure recovery:

```text
time to dependency recovery
queue drain time
reconciliation backlog
circuit close time
```

for mature systems.

---

# 213. User Impact Metrics

Operational dashboards should connect technical failures to user outcomes.

Example:

```text
checkout completion rate
```

may be more important than raw payment-provider error count.

---

# 214. Error Sampling

High-volume identical errors MAY be sampled for logs while maintaining accurate metrics.

Do not let logs cause secondary outages.

---

# 215. Logging Failure

Logging/telemetry failure should not generally block core product operations.

---

# 216. Telemetry Backpressure

Bound observability buffers.

Do not exhaust memory because log exporter is unavailable.

---

# 217. Error Privacy

Error logs MUST NOT expose:

```text
passwords
tokens
secrets
payment credentials
private keys
sensitive payloads
```

---

# 218. Redaction

Redact sensitive values before they reach shared logging systems.

---

# 219. Error Messages and Security

Do not expose:

```text
SQL
stack
internal paths
provider credentials
internal network names
```

to users.

---

# 220. Error Classification Security

Some failures require intentionally generic responses to prevent enumeration.

Example:

```text
login failure
```

---

# 221. Error Boundaries in UI

Client applications SHOULD use UI error boundaries where framework architecture supports isolation of rendering failures.

---

# 222. UI Error Boundary Purpose

Rendering failure in one subtree should not necessarily crash the whole application.

---

# 223. Error Boundary Scope

Place boundaries around meaningful recoverable regions.

Avoid:

```text
one boundary around every tiny component
```

or only:

```text
one root boundary for everything
```

if finer isolation provides value.

---

# 224. UI Boundary Recovery

Possible actions:

```text
Retry rendering
Reload data
Return to safe route
Refresh page
```

---

# 225. Rendering Error vs Data Error

Do not use rendering error boundaries as the normal mechanism for API validation or expected fetch failures.

---

# 226. Loading/Error/Empty

These are distinct states:

```text
Loading
Error
Empty
Success
```

Do not render "No data" while a request actually failed.

---

# 227. Stale + Error

A useful state may be:

```text
old data visible
+
refresh failed
```

This is different from total failure.

---

# 228. Offline UX

When network is unavailable, communicate:

```text
offline
what remains available
which actions are queued/unavailable
```

---

# 229. Offline Mutation

Do not claim an operation succeeded when it is only locally queued unless the product communicates that distinction.

---

# 230. Recovery UX

After connectivity returns:

```text
retry
sync
reconcile
```

according to application model.

---

# 231. Dependency Maintenance

Scheduled provider maintenance SHOULD be considered in operational design for critical external services.

---

# 232. Planned Degradation

Products MAY intentionally enter degraded mode during:

```text
maintenance
migration
capacity incident
```

---

# 233. Maintenance Mode

Maintenance mode should be:

```text
intentional
bounded
clear to users
observable
```

---

# 234. Read-Only Mode

Read-only degradation MAY be useful when:

```text
writes unsafe
reads still valid
```

---

# 235. Read-Only Mode Security

Do not allow hidden mutation paths to remain active accidentally.

---

# 236. Feature Kill Switch

High-risk features SHOULD consider operational kill switches where rapid shutdown may be necessary.

---

# 237. Kill Switch Scope

Kill switches should be:

```text
narrow
auditable
owned
easy to remove
```

---

# 238. Feature Flag Failure

Do not make safety-critical functionality depend on a remote feature-flag system without a safe default.

---

# 239. Safe Defaults

For failure-sensitive configuration:

```text
security
→ conservative default

optional UX enhancement
→ functional default
```

---

# 240. Configuration Failure

Invalid critical configuration SHOULD fail fast at startup.

Do not run with silently guessed security values.

---

# 241. Dynamic Config Outage

Define whether cached last-known configuration is safe.

---

# 242. DNS Failure

External dependency resilience must consider failures below HTTP:

```text
DNS
TLS
connection establishment
```

not only status codes.

---

# 243. TLS Failure

Certificate validation errors MUST NOT be bypassed automatically to preserve availability.

---

# 244. Clock Skew

Distributed systems using:

```text
tokens
signed requests
leases
TTL
```

must tolerate realistic clock skew while preserving security.

---

# 245. Rate-Limit Dependencies

When upstream rate-limits your service:

```text
respect retry guidance
reduce concurrency
buffer where appropriate
degrade optional work
```

---

# 246. Quota Exhaustion

Quota exhaustion should alert before hard failure where usage is predictable.

---

# 247. Cost Failure

Usage-based providers can fail economically before technically.

Define budgets/limits for:

```text
AI
SMS
email
external APIs
```

where relevant.

---

# 248. AI Provider Resilience

AI-backed features SHOULD define:

```text
timeout
model fallback
provider fallback where justified
cost limit
output validation
user-visible degradation
```

---

# 249. AI Fallback

Do not silently switch to a model whose behavior materially violates expected quality/security.

Fallback compatibility must be evaluated.

---

# 250. AI Timeout

Long model calls should not hold synchronous application resources indefinitely.

Use bounded timeouts/async workflows where appropriate.

---

# 251. AI Partial Output

Streaming partial AI output requires explicit behavior if generation fails halfway.

Do not present incomplete content as complete.

---

# 252. External API Schema Failure

If dependency response violates expected schema:

```text
treat as dependency failure
```

not trusted business data.

---

# 253. Corrupt Data

When stored data violates application assumptions:

```text
fail safely
surface internal diagnostics
avoid silently manufacturing replacement
```

unless a defined repair strategy exists.

---

# 254. Data Repair

Automated repair should be:

```text
deterministic
auditable
tested
```

Do not "fix" production data heuristically without traceability.

---

# 255. Migration Failure

Database migrations MUST have:

```text
observation
failure plan
forward-fix/rollback strategy
```

---

# 256. Partial Migration

Application versions must handle migration rollout according to expand/contract rules.

Do not leave production between incompatible schemas.

---

# 257. Deployment Failure

Deployments SHOULD support:

```text
health verification
automatic stop
rollback or forward recovery
```

---

# 258. Canary

Canary releases MAY reduce blast radius for risky changes.

---

# 259. Automatic Rollback

Automatic rollback is useful when health signals reliably indicate regression.

Do not rollback automatically based on noisy metrics that can create deployment loops.

---

# 260. Failure Domains

Architecture SHOULD identify failure domains.

Examples:

```text
process
instance
availability zone
region
database
queue
provider
tenant
```

---

# 261. Blast Radius

Design to reduce how much of the product one failure can affect.

---

# 262. Tenant Isolation and Failure

Where architecture allows, one tenant's heavy workload/failure SHOULD NOT degrade all tenants.

---

# 263. Noisy Neighbor

Apply:

```text
rate limits
quotas
concurrency limits
resource isolation
```

where tenant workloads can interfere.

---

# 264. Regional Failure

Multi-region systems MUST define:

```text
routing
state
replication
failover
consistency
```

during region loss.

---

# 265. Failover Is Not Automatic by Definition

Automatic failover can create:

```text
split brain
stale writes
capacity overload
```

if not carefully designed.

---

# 266. Recovery Objective

Critical systems SHOULD define:

```text
RTO
RPO
```

for relevant failures.

---

# 267. Backups

Backups are part of resilience but do not replace high availability.

---

# 268. Restore Test

Recovery is unproven until restore is tested.

---

# 269. Disaster Recovery

DR plans should cover:

```text
infrastructure loss
data corruption
credential loss
provider outage
operator error
```

---

# 270. Chaos Testing

Mature systems MAY intentionally inject controlled failures to verify resilience.

Examples:

```text
kill instance
add latency
disable dependency
drop messages
```

---

# 271. Chaos Testing Safety

Chaos experiments require:

```text
scope
abort criteria
observability
owner
```

Do not experiment blindly in production.

---

# 272. Game Days

Run game days for critical scenarios.

Examples:

```text
database failover
IdP outage
payment provider outage
queue backlog
region failure
```

---

# 273. Runbooks

Critical failure modes MUST have operational runbooks.

---

# 274. Runbook Content

Include:

```text
Symptoms
Impact
Diagnosis
Immediate mitigation
Recovery
Verification
Escalation
```

---

# 275. Incident Escalation

The system should make it clear:

```text
who owns the failing dependency
who is on call
when escalation occurs
```

---

# 276. Incident vs Error

Not every error is an incident.

An incident is generally:

```text
meaningful service degradation
requiring coordinated response
```

---

# 277. Error Budget

Critical services MAY use error budgets to balance:

```text
reliability
delivery velocity
```

---

# 278. Reliability Targets

Do not claim reliability beyond the weakest unavoidable dependency unless architecture compensates for it.

---

# 279. Recovery Verification

After recovery, verify:

```text
new requests succeed
queues drain
data reconciles
circuits close
alerts clear
```

---

# 280. Post-Incident Repair

After incidents:

```text
fix root cause
improve detection
improve resilience
update runbook
remove temporary workarounds
```

---

# 281. Temporary Workaround

Every emergency workaround SHOULD have:

```text
owner
risk
removal task
```

---

# 282. Error Testing

Test errors deliberately.

Do not rely on production to discover failure behavior.

---

# 283. Unit Error Tests

Test domain/application error mapping.

---

# 284. Integration Failure Tests

Simulate:

```text
database error
provider timeout
provider 500
rate limit
invalid provider payload
```

where relevant.

---

# 285. Retry Tests

Verify:

```text
retry only correct failures
maximum attempts
backoff
idempotency
```

---

# 286. Timeout Tests

Test actual timeout behavior.

Do not only configure a timeout constant and assume it works.

---

# 287. Circuit Breaker Tests

Verify:

```text
opens
fails fast
half-open probes
recovers
```

---

# 288. Partial Failure Tests

Verify one failing dependency does not incorrectly hide successful independent sections.

---

# 289. Degradation Tests

Test fallback behavior while dependency is deliberately unavailable.

---

# 290. Queue Failure Tests

Verify:

```text
retry
DLQ
replay
deduplication
```

---

# 291. Reconciliation Tests

Test mismatched internal/provider states and recovery.

---

# 292. Chaos in Test Environments

Regularly simulate dependency failure in staging/controlled environments.

---

# 293. Error Contract Tests

APIs SHOULD test:

```text
status
error code
schema
retry metadata
```

for stable expected failures.

---

# 294. User Error UX Tests

Verify users can:

```text
understand
recover
retry
preserve work
```

---

# 295. Accessibility

Error messages MUST be accessible.

Dynamic errors should be discoverable by assistive technology without excessive interruption.

---

# 296. Error Focus

After submission failure, focus should move logically to:

```text
error summary
```

or:

```text
first invalid field
```

when appropriate.

---

# 297. Retry Accessibility

Retry controls must be keyboard accessible and clearly labelled.

---

# 298. Loading vs Error

Do not leave indefinite spinners after failure.

A timeout/failure must eventually become an explicit state.

---

# 299. Retry Button State

While retry is executing:

```text
prevent accidental duplicate retry
show progress
```

where needed.

---

# 300. Automatic Retry UX

Automatic retries SHOULD NOT make the UI appear frozen.

For longer recovery, communicate:

```text
Reconnecting…
Retrying…
```

where useful.

---

# 301. Offline Banner

Persistent offline state MAY deserve a persistent nonmodal indicator.

---

# 302. Recovery Success

When recovery completes, update stale error UI.

Do not leave permanent banners after service has recovered.

---

# 303. Typed Result Pattern

For expected errors, a typed result MAY be clearer than exceptions.

Conceptually:

```text
Result<T, DomainError>
```

---

# 304. Exceptions vs Results

Use results when:

```text
failure is expected
caller must branch explicitly
```

Use exceptions where runtime/framework idioms make unexpected propagation clearer.

Consistency matters more than dogma.

---

# 305. Don't Return `null` for Everything

`null` cannot distinguish:

```text
not found
permission denied
timeout
database failure
```

Use meaningful results/errors.

---

# 306. Boolean Failure

Avoid APIs returning:

```text
true / false
```

when callers need failure reason.

---

# 307. Error Union

Typed systems SHOULD use explicit error unions for operations with meaningful known failures.

---

# 308. Error Exhaustiveness

Callers SHOULD handle all expected error categories.

Unknown/unexpected cases still need a safe fallback.

---

# 309. Internal Error Codes

Use stable names such as:

```text
project_not_found
permission_denied
version_conflict
provider_unavailable
```

where structured handling matters.

---

# 310. Error Code Naming

Codes SHOULD describe semantic outcome, not implementation detail.

Prefer:

```text
payment_provider_unavailable
```

over:

```text
stripe_ecconnreset
```

for application contract.

---

# 311. Provider Error Retention

Provider-specific codes MAY still be retained in internal diagnostic metadata.

---

# 312. HTTP Mapping

Typical mappings:

```text
Validation
→ 400 / 422

Unauthenticated
→ 401

Unauthorized
→ 403 / sometimes 404

Not found
→ 404

Conflict
→ 409

Rate limited
→ 429

Unexpected
→ 500

Temporary unavailable
→ 503
```

Follow API Gold Standard.

---

# 313. Do Not Map All Dependency Failures to 500

If the API is temporarily unavailable because a required dependency is down:

```text
503
```

may be more accurate.

---

# 314. Retry Metadata

Where clients can safely retry, communicate:

```text
retryable
Retry-After
```

where appropriate.

---

# 315. Do Not Promise Retry Success

A retry hint means retry may be useful.

It does not guarantee success.

---

# 316. Browser Error Handling

Client code SHOULD translate network/API errors into product-level UI states.

Do not display raw:

```text
TypeError: Failed to fetch
```

to users.

---

# 317. Fetch Failure

Distinguish where possible:

```text
network failure
timeout
HTTP error
parse/schema failure
```

---

# 318. Schema Validation of Responses

Critical external responses SHOULD be runtime-validated when malformed responses could create incorrect behavior.

---

# 319. Invalid Response Schema

Treat schema mismatch as dependency/integration failure.

Do not partially trust malformed data.

---

# 320. Server Rendering Failure

Server-rendered applications should define:

```text
route error boundary
not-found behavior
partial streaming failure
```

according to framework capability.

---

# 321. Streaming Failure

If streaming fails mid-response, the application may not be able to replace already-sent output.

Design streamed boundaries and client recovery intentionally.

---

# 322. Partial Streaming UI

Independent streamed regions can isolate slower/failing data sources.

---

# 323. Server Actions / Mutations

Server-side mutation functions SHOULD return expected typed/domain failures while allowing unexpected failures to reach canonical error handling.

---

# 324. Do Not Return Stack Traces

Never serialize raw exception objects to clients.

---

# 325. Background Error Visibility

Background jobs have no user waiting synchronously.

They require:

```text
metrics
logs
retry
DLQ
operator visibility
```

---

# 326. Silent Background Failure

Background failures must not disappear merely because no HTTP request failed.

---

# 327. Scheduled Job Failure

Critical scheduled jobs SHOULD alert when:

```text
missed
repeatedly failed
ran unusually long
```

---

# 328. Missed Schedule

Monitoring should detect:

```text
job did not run
```

not only:

```text
job ran and failed
```

---

# 329. Job Timeout

Every background job SHOULD have a maximum execution duration where practical.

---

# 330. Stuck Jobs

Detect jobs stuck in:

```text
processing
```

beyond expected duration.

---

# 331. Long Workflow Monitoring

Long-running workflows should expose state and age.

---

# 332. Failure Ownership

Every critical failure mode needs an owner.

---

# 333. Dependency Owner

Every external dependency should have an internal owner responsible for:

```text
integration
credentials
failure policy
monitoring
upgrade
```

---

# 334. Error Ownership

Do not leave:

```text
"somebody should look at these errors"
```

as the operational model.

---

# 335. Resilience Budget

Every resilience mechanism adds complexity.

Use only when its benefit exceeds maintenance cost.

---

# 336. Over-Resilience Anti-Pattern

Avoid adding:

```text
retries
circuit breaker
queue
fallback
cache
secondary provider
```

to every endpoint without need.

---

# 337. Secondary Provider

A second provider MAY improve resilience when:

```text
provider outage cost is high
failover semantics are compatible
```

---

# 338. Provider Failover Complexity

Multi-provider failover introduces:

```text
data divergence
semantic differences
credentials
cost
testing
```

Do not assume two providers automatically double reliability.

---

# 339. Fallback Provider

A fallback provider must be continuously testable.

An untested provider is not a real fallback.

---

# 340. Feature Disablement

Sometimes the safest degradation is:

```text
temporarily disable feature
```

rather than attempt dangerous partial behavior.

---

# 341. Error Handling Review Checklist

```text
□ Expected errors identified
□ Unexpected failures identified
□ Error types/codes defined
□ User-facing messages defined
□ Internal context retained
□ Sensitive details hidden
□ Retryability defined
□ Idempotency defined
□ Timeout defined
□ Cancellation behavior defined
□ Invalidation/recovery defined
□ Observability defined
```

---

# 342. Dependency Resilience Checklist

```text
□ Dependency classified critical/important/optional
□ Timeout configured
□ Retry policy defined
□ Retry limit bounded
□ Backoff defined
□ Jitter considered
□ Circuit breaker considered
□ Concurrency limit considered
□ Fallback defined
□ Outage UX defined
□ Reconciliation defined where required
□ Monitoring exists
```

---

# 343. Retry Checklist

```text
□ Failure is transient
□ Operation is safe to retry
□ Idempotency exists where required
□ Maximum attempts defined
□ Backoff defined
□ Jitter defined
□ Deadline respected
□ Retry ownership defined
□ Retry storm risk considered
```

---

# 344. Timeout Checklist

```text
□ Connection timeout considered
□ Operation timeout defined
□ Parent deadline respected
□ Cleanup time remains
□ Timeout behavior tested
□ Unknown outcome handled
□ Cancellation propagated where supported
```

---

# 345. Circuit Breaker Checklist

```text
□ Dependency failure amplification exists
□ Scope defined
□ Failure threshold defined
□ Minimum volume defined
□ Open duration defined
□ Half-open probing defined
□ Fallback behavior defined
□ Circuit state observable
```

---

# 346. Partial Failure Checklist

```text
□ Atomic vs partial semantics defined
□ Successful results preserved
□ Failed results identifiable
□ Failed subset retry possible where appropriate
□ UI communicates partial success
□ Audit/reconciliation considered
```

---

# 347. Dependency Outage Checklist

```text
□ Detection
□ User impact
□ Automatic mitigation
□ Manual mitigation
□ Degraded mode
□ Data consistency
□ Queue/backlog behavior
□ Recovery procedure
□ Post-recovery reconciliation
□ Runbook
```

---

# 348. Queue Resilience Checklist

```text
□ Job idempotent
□ Retry policy
□ Retry limit
□ Backoff
□ Timeout
□ Dead-letter handling
□ Poison-message handling
□ Duplicate handling
□ Ordering assumptions
□ Replay tooling
□ Monitoring
```

---

# 349. Definition of Done — Error Handling

A feature is complete only when:

```text
✓ Expected failures identified
✓ User-facing errors intentional
✓ Unexpected errors propagate safely
✓ Structured error identity exists where needed
✓ Input is preserved on recoverable failure
✓ Retry behavior defined
✓ Timeout behavior defined
✓ Duplicate execution considered
✓ Dependency failure behavior defined
✓ Observability added
✓ Negative/failure tests added
```

---

# 350. Definition of Done — External Dependency

An external integration is production-ready only when:

```text
✓ Owner assigned
✓ Credentials managed
✓ Timeout defined
✓ Retry policy defined
✓ Rate limiting understood
✓ Error translation implemented
✓ Response validation considered
✓ Circuit breaker evaluated
✓ Fallback/degraded behavior defined
✓ Outage runbook exists where critical
✓ Monitoring exists
✓ Reconciliation exists where needed
```

---

# 351. Error Handling Anti-Patterns

Avoid:

```text
catch {
  return null
}
```

Avoid:

```text
throw new Error("Something went wrong")
```

for every expected failure.

Avoid:

```text
if (error.message.includes(...))
```

Avoid:

```text
retry every error
```

Avoid:

```text
retry forever
```

Avoid:

```text
no timeout
```

Avoid:

```text
timeout = cancellation
```

Avoid:

```text
payment timeout
→ automatically charge again
```

Avoid:

```text
optional analytics failure
→ fail checkout
```

Avoid:

```text
authorization service failure
→ allow request
```

Avoid:

```text
all errors = 500
```

Avoid:

```text
raw provider error returned to user
```

Avoid:

```text
stack trace in API response
```

Avoid:

```text
one global "Something went wrong" for every case
```

Avoid:

```text
infinite loading spinner
```

Avoid:

```text
empty state after failed request
```

Avoid:

```text
toast as only critical recovery path
```

Avoid:

```text
circuit breaker on every function call
```

Avoid:

```text
three independent retry layers
```

Avoid:

```text
DLQ nobody monitors
```

Avoid:

```text
fallback using fabricated data
```

Avoid:

```text
cache as source of truth accidentally
```

Avoid:

```text
provider outage discovered only by customers
```

---

# 352. AI Error-Handling Rules

AI coding agents MUST identify expected and unexpected failure modes before implementing a nontrivial operation.

---

# 353. AI Typed-Error Rule

AI SHOULD use the repository's canonical structured error model.

It MUST NOT invent ad hoc string-based error handling.

---

# 354. AI Catch Rule

AI MUST NOT add empty catch blocks or convert unknown errors to valid-looking values without justification.

---

# 355. AI Retry Rule

Before adding retry, AI MUST answer:

```text
Is the error transient?
Is the operation idempotent?
How many attempts?
What backoff?
Which layer owns retry?
```

---

# 356. AI Timeout Rule

AI-generated network/database/provider calls SHOULD use the established timeout mechanism.

---

# 357. AI Idempotency Rule

AI MUST consider idempotency before retrying:

```text
payments
orders
provisioning
invitations
webhooks
```

---

# 358. AI Dependency Rule

AI MUST classify a new dependency as:

```text
critical
important
optional
```

and define failure behavior.

---

# 359. AI Fallback Rule

AI MUST NOT invent fallback values that alter business meaning.

---

# 360. AI Security-Failure Rule

AI MUST NOT fail open for authentication/authorization merely to preserve availability.

---

# 361. AI Partial-Failure Rule

AI SHOULD isolate independent UI/data failures rather than collapsing an entire page where safe.

---

# 362. AI Queue Rule

AI-generated background jobs MUST define:

```text
timeout
retry
idempotency
dead-letter behavior
```

where applicable.

---

# 363. AI Error-Logging Rule

AI MUST preserve useful diagnostic context without logging sensitive values.

---

# 364. AI User-Message Rule

AI should translate internal failures into:

```text
clear
safe
recoverable
```

user-facing language.

---

# 365. AI Observability Rule

Unexpected failures introduced by new code SHOULD have enough telemetry to diagnose in production.

---

# 366. AI Graceful-Degradation Rule

AI SHOULD keep optional dependency failure from blocking core operations where semantics allow it.

---

# 367. AI Circuit-Breaker Rule

AI MUST NOT introduce circuit breakers without evidence that failure amplification warrants the added state and complexity.

---

# 368. AI Result-vs-Exception Rule

AI SHOULD follow existing project conventions for expected typed results vs exceptions.

It must not mix paradigms arbitrarily.

---

# 369. AI Gold Rule

When uncertain:

```text
Correctness
>
Safety
>
Containment
>
Recoverability
>
Observability
>
Availability optimization
```

---

# 370. Golden Error Handling & Resilience Rules

**1. Failure is a normal system state.**

**2. Design the failure path with the success path.**

**3. Distinguish expected errors from unexpected failures.**

**4. Use stable typed errors/codes, not message parsing.**

**5. Preserve root cause internally.**

**6. Do not expose internal implementation details to users.**

**7. Do not swallow unexpected errors.**

**8. Catch only when you can recover, translate, or add useful context.**

**9. Preserve user work after recoverable failure.**

**10. Error UX must explain recovery.**

**11. Empty, loading, and error are different states.**

**12. Partial failure should remain partial when operations are independent.**

**13. Atomic business operations remain atomic.**

**14. Every network operation has a finite timeout.**

**15. Timeout does not imply downstream failure.**

**16. Retry only transient failures.**

**17. Every retry is bounded.**

**18. Use exponential backoff and jitter where appropriate.**

**19. Coordinate retries across layers.**

**20. Never retry consequential writes blindly.**

**21. Idempotency protects retryable writes.**

**22. Circuit breakers are for real failure amplification, not decoration.**

**23. Bulkheads isolate critical resources.**

**24. Apply backpressure before overload becomes collapse.**

**25. Shed low-priority load to preserve critical workflows where necessary.**

**26. Optional dependencies must not block core transactions unnecessarily.**

**27. Security controls generally fail closed.**

**28. Fallbacks must preserve business semantics.**

**29. Stale data is acceptable only where the domain permits it.**

**30. Queued work requires retry, timeout, duplicate, and DLQ semantics.**

**31. Dead-letter queues require owners and recovery procedures.**

**32. Distributed workflows require reconciliation.**

**33. External provider errors are translated at adapter boundaries.**

**34. Unexpected errors are observable and correlated.**

**35. Expected failures do not flood exception monitoring.**

**36. Error metrics use stable low-cardinality codes.**

**37. Critical dependency outages have runbooks.**

**38. Recovery includes verification and reconciliation.**

**39. Every resilience mechanism must justify its complexity.**

**40. The safest degraded state is preferable to an unsafe available state.**

---

# 371. Canonical Error Handling & Resilience Standard

The organizational standard is:

> **Every application operation defines both success and failure semantics. Expected validation, authentication, authorization, conflict, quota, and domain failures are modeled as intentional structured outcomes, while unexpected programming, infrastructure, and integration failures propagate through controlled error boundaries with preserved internal causes, safe client responses, correlation, and observability. Human-readable messages are never used as machine contracts.**

> **Every network or external dependency call has a bounded timeout. Retries occur only for plausibly transient failures and only when the operation is safe to repeat or protected by idempotency. Retries are bounded, use appropriate backoff and jitter, respect parent deadlines, and are coordinated so multiple architecture layers do not amplify outages. Circuit breakers, bulkheads, concurrency limits, backpressure, load shedding, and secondary providers are introduced only when demonstrated failure modes justify their operational complexity.**

> **Dependencies are classified according to criticality. Failure of optional capabilities does not unnecessarily prevent core business operations, while security and integrity controls fail safely rather than granting access or fabricating success. Fallback behavior preserves real business semantics, partial failures remain isolated where operations are independent, and atomic operations never report partial success as complete success.**

> **Background work defines timeout, retry, idempotency, duplicate, poison-message, and dead-letter semantics. Distributed operations with ambiguous outcomes use durable operation identity, status lookup, compensation, or reconciliation rather than blind repetition. Critical dependency outages, queue backlogs, data inconsistency, and disaster scenarios have observable recovery paths and owned runbooks.**

A production-grade resilient system should make it easy to answer:

```text
What failures are expected?
What failures are unexpected?
Which error type represents each?
What does the user see?
Can the operation be retried?
Is retry safe?
What is the timeout?
What happens if the timeout occurs after the dependency already succeeded?
What happens if the dependency is completely unavailable?
Can the product degrade safely?
What fallback is used?
What data may be stale?
What happens if only part of the operation succeeds?
How is duplicate execution prevented?
How are background failures recovered?
What enters the dead-letter queue?
How does reconciliation work?
How is the failure observed?
Who owns recovery?
How do we know the system is healthy again?
```

If those answers are unclear, the resilience architecture is incomplete.

Dalam master hierarchy, aku akan letakkan ini **selepas State Management / Forms dan sebelum Testing**, sebab ia cross-cutting antara API, database, queues, UI, dan infrastructure:

**Architecture → Framework → Security → Authentication & Authorization → Data & Database → API → Routes → State Management → Forms & Validation → Error Handling & Resilience → Testing → Performance → Observability → Infrastructure → Documentation → Governance.**
