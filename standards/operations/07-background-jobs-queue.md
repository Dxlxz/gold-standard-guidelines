---
id: "background-jobs-queue"
title: "Background Jobs & Queue Guidelines — Gold Standard 2026"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["operations", "background", "jobs", "queue"]
applies_to: ["infra"]
related: ["security", "architecture"]
legacy_number: 31
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 72008
provenance: baseline

---

Below is the canonical **Background Jobs & Queue Guidelines — Gold Standard 2026**. It keeps queue infrastructure concerns aligned with the existing Architecture, Error Handling, State Management, Data, Observability, Security, and Deployment standards.

# Background Jobs & Queue Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- background jobs;
- asynchronous work;
- job queues;
- message queues;
- workers;
- schedulers;
- delayed jobs;
- recurring jobs;
- retries;
- backoff;
- jitter;
- idempotency;
- deduplication;
- concurrency;
- ordering;
- priority;
- rate limiting;
- queue backpressure;
- dead-letter queues;
- poison jobs;
- visibility/lease timeouts;
- job payloads;
- cancellation;
- replay;
- observability;
- recovery;
- graceful worker shutdown.

The objective is to make asynchronous processing:

```text
Reliable
Idempotent
Bounded
Observable
Recoverable
Scalable
Secure
Operable
Predictable
```

The core principle is:

> **A background job must remain correct when it runs late, runs more than once, partially succeeds, loses its worker, or encounters a temporarily unavailable dependency.**

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
Job/queue
Risk
Failure behavior
Compensating control
Owner
Review date
```

---

# 3. What Belongs in a Background Job

Use background execution when work:

```text
does not need to complete before the request returns
takes substantial time
depends on slow external systems
should be retried independently
needs buffering
needs scheduled execution
requires fan-out
```

Examples:

```text
email delivery
report generation
image processing
webhook delivery
data import/export
search indexing
notification fan-out
scheduled maintenance
```

---

# 4. What Should Remain Synchronous

Keep work synchronous when the caller requires immediate authoritative success/failure.

Examples may include:

```text
permission validation
transactional balance update
critical invariant enforcement
```

Do not move correctness-critical work to a queue merely to make request latency look smaller.

---

# 5. Async Boundary

Moving work to a queue changes the contract from:

```text
request
→
result
```

to:

```text
request
→
accepted/persisted intent
→
eventual processing
```

The product/API MUST reflect that semantic difference.

---

# 6. Queue Is Not Magic Reliability

A queue can improve:

```text
buffering
decoupling
retry
failure isolation
```

but can also create:

```text
duplicates
delay
backlogs
ordering problems
operational complexity
```

---

# 7. Queue Necessity Test

Before introducing a queue ask:

```text
Can synchronous work meet latency/SLO?
Is asynchronous execution actually required?
Do we need buffering?
Do we need independent retry?
Do producer and consumer need decoupling?
```

If not, a queue may be unnecessary.

---

# 8. Background Job vs Event

A **job/command** means:

> Perform this work.

An **event** means:

> This fact happened.

Example:

```text
Job:
send_invoice_email

Event:
invoice_paid
```

Do not confuse the two.

---

# 9. Queue vs Pub/Sub

Use a work queue when one logical worker group should perform work.

Use pub/sub/event distribution when multiple independent consumers need notification of the same fact.

---

# 10. Job Ownership

Every production job type MUST have an owning team.

Ownership includes:

```text
correctness
retry policy
capacity
monitoring
DLQ handling
schema evolution
cleanup
```

---

# 11. Queue Ownership

Every production queue MUST have an identifiable owner.

---

# 12. Delivery Semantics

The application MUST understand the queue's delivery semantics.

Common models include:

```text
at-most-once
at-least-once
broker-specific exactly-once guarantees
```

---

# 13. Default Engineering Assumption

Unless the entire end-to-end workflow provides a stronger verified guarantee:

> **Consumers SHOULD be designed assuming at-least-once execution and possible duplicates.**

---

# 14. Exactly-Once Caution

Broker-level exactly-once delivery does not automatically guarantee exactly-once business effects.

External effects can still create ambiguity.

Example:

```text
charge card
↓
worker crashes before acknowledging
↓
message retried
```

The payment provider may already have processed the charge.

---

# 15. Business Idempotency

Correctness should generally come from:

```text
idempotent operations
+
stable operation identity
+
state constraints
```

rather than hoping duplicates never occur.

---

# 16. Idempotency Definition

An idempotent operation can execute multiple times and produce the same intended business outcome as one successful execution.

---

# 17. Idempotency Is Domain-Specific

This is naturally idempotent:

```text
set user.status = "verified"
```

This is not inherently idempotent:

```text
balance = balance + 100
```

---

# 18. Idempotency Key

Side-effecting jobs SHOULD have a stable operation/job identity where duplicate processing could cause harm.

Examples:

```text
payment_attempt_id
invoice_email_id
export_request_id
webhook_delivery_id
```

---

# 19. Idempotency Key Scope

The key MUST be scoped to the operation whose uniqueness matters.

Bad:

```text
user_id
```

for every email ever sent to that user.

Better:

```text
invoice:{invoice_id}:receipt:v1
```

---

# 20. Idempotency Key Stability

Retries MUST reuse the same logical idempotency key.

Generating a fresh key on every retry defeats deduplication.

---

# 21. Producer Retry Idempotency

Producer-side retries can also create duplicate queue messages.

Publishing SHOULD have stable message/job identity where the queue or application can deduplicate.

---

# 22. Consumer Idempotency

Consumers MUST remain safe when a logically duplicate job reaches them despite producer deduplication.

---

# 23. Broker Deduplication Is Defense in Depth

Queue-level deduplication is useful.

It SHOULD NOT be the only protection for financially or operationally sensitive side effects.

---

# 24. Idempotency Storage

Idempotency MAY be implemented using:

```text
unique DB constraint
processed_message table
operation record
idempotency-key table
state-machine transition
provider idempotency key
```

---

# 25. Prefer Durable Idempotency

If the business effect is durable, deduplication state SHOULD also be durable enough to survive worker restart.

---

# 26. In-Memory Deduplication

In-memory sets MAY reduce duplicate work but MUST NOT be the sole correctness mechanism where worker restart loses the record.

---

# 27. Unique Constraint

Database uniqueness is often a strong idempotency primitive.

Example:

```text
UNIQUE(invoice_id, notification_type)
```

---

# 28. Check-Then-Act Race

Avoid:

```text
if not exists:
    create
```

without atomic protection.

Concurrent workers may both observe:

```text
not exists
```

and both act.

---

# 29. Atomic Claim

Prefer:

```text
insert with unique constraint
compare-and-set
transactional state transition
```

for claiming one-time operations.

---

# 30. Idempotency and External APIs

When providers support idempotency keys:

```text
use them
```

for retryable side-effecting operations.

---

# 31. Provider Idempotency Window

Understand how long the external provider remembers an idempotency key.

Application retries exceeding that window may need additional protection.

---

# 32. Partial Success

Jobs performing multiple side effects MUST define behavior when:

```text
step 1 succeeds
step 2 fails
```

---

# 33. Do Not Restart Blindly

A retry SHOULD NOT blindly repeat already-successful irreversible effects.

---

# 34. Checkpointing

Long multi-stage jobs MAY persist progress.

Example:

```text
created export
uploaded file
sent notification
```

so retries can resume safely.

---

# 35. Workflow State

Complex workflows SHOULD use explicit durable state rather than encoding progress only in worker memory.

---

# 36. Saga / Compensation

Distributed workflows requiring multiple durable side effects MAY require:

```text
workflow orchestration
saga
compensation
```

according to Architecture Guidelines.

---

# 37. Transactional Enqueue Problem

A common failure is:

```text
DB transaction commits
↓
queue publish fails
```

or:

```text
queue publishes
↓
DB transaction rolls back
```

---

# 38. Transactional Outbox

When queue publication must correspond reliably to a database transaction, use a transactional outbox or equivalent pattern.

---

# 39. Outbox Flow

Canonical pattern:

```text
DB transaction:
  business change
  +
  outbox record
↓
commit
↓
publisher reads outbox
↓
publish
↓
mark delivered
```

---

# 40. Outbox Publisher Idempotency

The outbox publisher MUST tolerate duplicate publication.

---

# 41. Inbox Pattern

Consumers MAY maintain an inbox/processed-message record to deduplicate incoming messages.

---

# 42. Inbox Transaction

When practical:

```text
dedup record
+
business state mutation
```

SHOULD occur in one database transaction.

---

# 43. Job State

Important jobs SHOULD have explicit state such as:

```text
queued
running
succeeded
failed
cancelled
```

when product/operational requirements need durable visibility.

---

# 44. Queue Is Not Always Job State

A broker's message state does not necessarily provide adequate product-level job history.

---

# 45. User-Facing Jobs

User-triggered long-running operations SHOULD often expose a durable operation resource.

Example:

```text
POST /exports
→ 202 Accepted
→ operation_id
```

---

# 46. Operation Status

A long-running operation MAY expose:

```text
queued
running
completed
failed
cancelled
```

with safe progress information.

---

# 47. Retry Principle

Retry only failures that may succeed later.

---

# 48. Retryable Errors

Examples may include:

```text
timeout
temporary network failure
HTTP 429
temporary 5xx
database failover
provider unavailable
```

---

# 49. Non-Retryable Errors

Examples often include:

```text
invalid payload
missing required resource
permanent authorization failure
unsupported file format
business-rule rejection
```

---

# 50. Typed Error Classification

Workers SHOULD classify failures into categories such as:

```text
Transient
Permanent
Rate limited
Conflict
Cancelled
Poison
Unknown
```

---

# 51. Unknown Error

Unknown failures SHOULD normally receive a bounded retry policy before quarantine/escalation.

---

# 52. Infinite Retry Is Prohibited

Jobs MUST NOT retry forever without explicit exceptional justification.

---

# 53. Retry Budget

Every retrying job MUST define a bounded retry budget.

This MAY be expressed as:

```text
attempt count
elapsed time
deadline
```

or a combination.

---

# 54. Maximum Attempts

Maximum attempts SHOULD be chosen based on:

```text
failure type
business deadline
provider recovery characteristics
side-effect risk
```

---

# 55. Backoff

Retries SHOULD use increasing delay for transient failures.

---

# 56. Exponential Backoff

A common pattern is:

```text
delay_n = base × 2^n
```

subject to a maximum delay.

---

# 57. Jitter

Retry delay SHOULD include jitter when many workers could retry simultaneously.

This reduces synchronized retry storms.

---

# 58. Retry Example

Conceptually:

```text
5 sec
12 sec
27 sec
55 sec
2 min
5 min
...
```

rather than:

```text
5 sec
5 sec
5 sec
5 sec
```

for a sustained outage.

---

# 59. Maximum Backoff

Retry delay SHOULD have a reasonable upper bound.

---

# 60. Retry Deadline

Time-sensitive jobs SHOULD stop retrying after their business value expires.

Example:

```text
"Your login code"
```

should not be delivered two days later.

---

# 61. Expiration

Jobs SHOULD support expiry/deadline when stale execution could be harmful or useless.

---

# 62. Retry-After

For dependencies returning explicit retry guidance such as:

```text
Retry-After
```

workers SHOULD respect it when safe.

---

# 63. Do Not Retry Every 4xx

Client/business errors SHOULD NOT generally be retried automatically.

---

# 64. Authentication Error

A temporary token-expiry condition MAY be resolved by refreshing credentials.

An actual permission denial SHOULD normally not be retried repeatedly.

---

# 65. Rate Limit Error

Rate-limited jobs SHOULD retry according to:

```text
provider guidance
backoff
jitter
```

---

# 66. Database Deadlock

A deadlock/serialization conflict MAY be retryable when the whole transaction is safe to repeat.

---

# 67. Retry Scope

Retry the smallest safe unit of work.

Do not repeat an entire 60-minute workflow because its final notification failed.

---

# 68. Nested Retries

Avoid uncontrolled retry multiplication.

Example:

```text
queue retries 10x
×
HTTP client retries 5x
×
SDK retries 3x
=
150 attempts
```

---

# 69. Retry Ownership

One layer SHOULD normally own the main retry policy for a given failure boundary.

---

# 70. Retry Storm

A dependency outage MUST NOT cause every job to retry aggressively at once.

---

# 71. Circuit Breaker

Persistent dependency failure MAY justify temporarily stopping attempts through a circuit breaker or queue pause.

---

# 72. Queue Pause

Operators SHOULD be able to pause consumption where continuing work would worsen:

```text
dependency outage
data corruption
provider rate limit
```

---

# 73. Resume Safety

Resuming a paused queue MUST account for potentially large accumulated backlog.

---

# 74. Dead-Letter Queue

A DLQ stores messages that could not be successfully processed under normal retry policy.

---

# 75. DLQ Is Not a Trash Bin

Every DLQ MUST have:

```text
owner
alerting
inspection process
resolution path
retention
replay policy
```

---

# 76. DLQ Conditions

A job MAY enter DLQ after:

```text
maximum retries
explicit poison classification
permanent processing failure
```

depending on queue architecture.

---

# 77. Immediate DLQ

Obviously invalid or unrecoverable jobs MAY be sent directly to DLQ instead of wasting retries.

---

# 78. Poison Job

A poison job repeatedly fails because the job itself or its data consistently triggers failure.

Examples:

```text
malformed payload
unsupported schema
corrupt file
deterministic application bug
```

---

# 79. Poison Job Detection

Repeated failure with the same deterministic error SHOULD trigger poison-job handling.

---

# 80. Poison Jobs Must Not Block the Queue

One poison message MUST NOT indefinitely prevent unrelated work from progressing.

---

# 81. Ordered Queue Poison Job

Strict ordering can make one failing message block later messages with the same ordering key.

The design MUST define how to:

```text
fix
skip
quarantine
```

such messages safely.

---

# 82. Quarantine

Poison jobs SHOULD be quarantined with enough information for diagnosis.

---

# 83. Quarantine Data

Useful fields include:

```text
job/message ID
job type
attempt count
last error type
first failure time
last failure time
payload reference
correlation ID
```

subject to privacy rules.

---

# 84. DLQ Alert

DLQ growth MUST be observable.

---

# 85. DLQ Alert Threshold

For critical jobs, even:

```text
1 dead-lettered message
```

may be significant.

Threshold depends on semantics.

---

# 86. DLQ Age

Monitor not only DLQ count but:

```text
oldest unresolved DLQ message age
```

---

# 87. DLQ Replay

Messages MUST NOT be replayed blindly.

Before replay:

```text
understand failure
fix cause
verify idempotency
verify payload still valid
control replay rate
```

---

# 88. Replay Storm

Large DLQ replay SHOULD be rate-limited.

---

# 89. Replay Identity

Replay SHOULD preserve original logical operation identity when idempotency depends on it.

---

# 90. Replay Audit

Manual replay of critical jobs SHOULD be auditable.

---

# 91. DLQ Retention

Retention SHOULD be sufficient for:

```text
investigation
fix
replay
```

but should follow data-retention/privacy policy.

---

# 92. Expired DLQ Data

Dead-letter storage MUST NOT become permanent forgotten storage of PII.

---

# 93. Visibility / Lease Timeout

Many queues temporarily hide/lease a message while a worker processes it.

The lease duration MUST match processing behavior.

---

# 94. Lease Too Short

If processing takes:

```text
5 minutes
```

but visibility is:

```text
30 seconds
```

another worker may receive the same message while the first still runs.

---

# 95. Lease Too Long

An excessively long lease can delay recovery when a worker dies.

---

# 96. Lease Renewal

Long-running jobs SHOULD renew/extend the processing lease or heartbeat where the queue supports it.

---

# 97. Heartbeat

A worker processing long jobs MAY periodically report:

```text
still alive
progress
lease extension
```

---

# 98. Heartbeat Failure

If heartbeats stop, the system SHOULD eventually make the work available for recovery.

---

# 99. Lease Does Not Prevent Duplicate Effects

Even with leases, consumer logic SHOULD remain idempotent.

---

# 100. Acknowledge After Success

A worker SHOULD acknowledge/remove a message only after the required durable business work has completed.

---

# 101. Ack Too Early

Bad:

```text
receive
↓
ack
↓
perform DB write
↓
worker crashes
```

The work can be permanently lost.

---

# 102. Ack Too Late

Acknowledging after unrelated optional work may cause unnecessary retry of already-completed critical work.

Define the true completion boundary.

---

# 103. Processing Transaction

For database-backed workers, the desired sequence is often:

```text
process durable state
↓
commit
↓
ack
```

with idempotency protecting the ambiguity between commit and acknowledgment.

---

# 104. Concurrency

Worker concurrency MUST be deliberate.

---

# 105. Concurrency Is Not Free Throughput

Higher concurrency increases pressure on:

```text
database
external APIs
CPU
memory
connections
locks
```

---

# 106. Worker Concurrency Budget

Set concurrency from measured capacity.

---

# 107. Database Connection Budget

Worker concurrency MUST respect database connection limits.

Example:

```text
web connections
+
worker connections
+
admin/reserve
<
safe DB maximum
```

---

# 108. External Provider Limit

Worker concurrency SHOULD be capped to downstream provider capacity.

---

# 109. Per-Tenant Concurrency

Multi-tenant systems MAY require per-tenant concurrency limits to prevent one tenant from monopolizing workers.

---

# 110. Per-Key Concurrency

Jobs affecting the same logical entity MAY require serialization.

Example:

```text
account_id
order_id
document_id
```

---

# 111. Concurrency Lock

Locks MAY enforce one-at-a-time processing where domain correctness requires it.

---

# 112. Distributed Lock Caution

Distributed locks add failure semantics:

```text
expiry
lease ownership
network partition
fencing
```

Use only when necessary.

---

# 113. Database Constraint First

Prefer transactional/database invariants over distributed locks where they solve the problem more robustly.

---

# 114. Optimistic Concurrency

Version checks/compare-and-set MAY provide safer concurrency for some jobs.

---

# 115. Fencing Token

When stale lock holders could mutate state, fencing/version tokens SHOULD be considered.

---

# 116. Race Conditions

Two workers MUST NOT be able to violate business invariants simply because concurrency increased.

---

# 117. Horizontal Worker Scaling

Workers SHOULD generally be horizontally scalable when queue architecture allows it.

---

# 118. Stateless Worker

Worker process memory SHOULD NOT be the only record of durable job progress.

---

# 119. Autoscaling

Queue workers SHOULD commonly scale using queue pressure rather than CPU alone.

---

# 120. Useful Scaling Signals

Useful signals include:

```text
ready queue depth
oldest ready message age
arrival rate
processing rate
job duration
```

---

# 121. Oldest Message Age

Oldest message age is often more meaningful than queue depth.

Example:

```text
10,000 jobs
processed in 10 sec
```

may be healthy.

```text
5 jobs
waiting 6 hours
```

may be broken.

---

# 122. Autoscaling Delay

Scale-up time MUST be considered.

Workers may require:

```text
container startup
runtime initialization
connection setup
```

before processing.

---

# 123. Maximum Workers

Every worker pool SHOULD have a maximum concurrency/capacity limit.

---

# 124. Scaling and Rate Limits

Autoscaling SHOULD NOT cause workers to exceed downstream rate limits.

---

# 125. Backpressure

The system MUST define behavior when work arrives faster than it can be processed.

---

# 126. Backlog Is a Form of Backpressure

Queues can absorb temporary bursts.

They do not create infinite processing capacity.

---

# 127. Maximum Backlog

Critical systems SHOULD understand acceptable:

```text
queue depth
queue age
```

before degraded service becomes unacceptable.

---

# 128. Producer Throttling

When backlog exceeds safe capacity, producers MAY need:

```text
rate limiting
load shedding
rejection
degradation
```

---

# 129. Unbounded Producer

Do not permit unlimited producer throughput when consumers have strictly bounded capacity and backlog growth creates operational failure.

---

# 130. Admission Control

Expensive asynchronous tasks SHOULD consider admission quotas.

Example:

```text
exports per tenant
video jobs per account
```

---

# 131. Fairness

Shared queues SHOULD prevent one tenant/workload class from starving others where fairness matters.

---

# 132. Tenant Fairness

Strategies MAY include:

```text
per-tenant quotas
weighted scheduling
separate queues
fair dispatch
```

---

# 133. Priority

Priority queues MAY be used when some work legitimately has greater urgency.

---

# 134. Priority Is Not Importance Labeling

Do not classify every new feature:

```text
high priority
```

---

# 135. Starvation

Priority systems MUST prevent low-priority jobs from waiting forever.

---

# 136. Separate Queues

Different workload classes SHOULD use separate queues when they differ materially in:

```text
latency SLO
resource usage
retry behavior
rate limit
priority
```

---

# 137. Queue Isolation

Examples:

```text
emails
media_processing
billing
exports
webhooks
```

may merit separate worker pools.

---

# 138. Critical vs Bulk Work

Do not let a 100,000-record export block:

```text
password reset emails
```

because both share one saturated queue.

---

# 139. Queue Naming

Queue names SHOULD reflect workload semantics.

Good:

```text
billing-events
email-delivery
image-processing
```

Bad:

```text
queue1
jobs-new
misc
```

---

# 140. Job Naming

Job types SHOULD use stable semantic names.

Example:

```text
invoice.generate_pdf
webhook.deliver
search.reindex_document
```

---

# 141. Job Versioning

Job/message contracts require versioning or compatible evolution.

---

# 142. Producer/Consumer Version Skew

During deployment:

```text
old producer
new consumer
new producer
old consumer
```

may coexist.

Payload changes MUST account for this where applicable.

---

# 143. Additive Evolution

Adding optional fields is generally safer than replacing/removing required fields.

---

# 144. Required Field Addition

Adding a mandatory field can break queued messages created by older producers.

---

# 145. Queue Retention Creates Compatibility Window

If messages can remain queued for:

```text
7 days
```

a new worker may still receive seven-day-old payloads.

---

# 146. Schema Version

Explicit payload schema versions SHOULD be used when incompatible evolution is possible.

---

# 147. Upcaster / Adapter

Consumers MAY adapt older payload versions into the current internal model.

---

# 148. Do Not Depend on Current Database State Alone

A queued job should include sufficient stable identity/context to perform its intended work later.

---

# 149. Payload Design

Job payloads SHOULD be:

```text
small
explicit
versionable
non-secret
self-identifying
```

---

# 150. Prefer IDs Over Entire Models

Good:

```text
{ "invoiceId": "inv_123" }
```

rather than serializing a huge ORM entity.

---

# 151. Snapshot vs Reference

Whether to send:

```text
record ID
```

or:

```text
data snapshot
```

depends on intended semantics.

---

# 152. Reference Semantics

An ID means approximately:

> Process the current state of this entity when the job runs.

---

# 153. Snapshot Semantics

A snapshot means approximately:

> Process the state as captured when this job was created.

---

# 154. Choose Deliberately

Do not accidentally rely on reference semantics when historical state matters.

---

# 155. Example

For:

```text
send invoice as it existed at finalization
```

a version/snapshot reference may be required.

Using current mutable invoice state could produce incorrect output.

---

# 156. Large Payload

Large files/blobs SHOULD NOT normally be placed directly into queue messages.

Prefer:

```text
object storage
+
reference
```

---

# 157. Payload Size Limit

Every queue has practical/provider payload constraints.

Application payload budgets SHOULD stay comfortably below hard limits.

---

# 158. Payload Security

Job payloads MUST be treated as stored/transmitted data.

---

# 159. Secrets in Payloads

Do not place:

```text
passwords
API keys
private keys
long-lived tokens
```

in queue payloads.

---

# 160. Credential Reference

Workers SHOULD obtain current credentials through approved secret/workload-identity systems at execution time.

---

# 161. PII

Include only PII required for processing.

---

# 162. Payload Encryption

Sensitive job infrastructure SHOULD use provider/platform encryption in transit and at rest.

---

# 163. Payload Logs

Do not automatically log entire job payloads.

---

# 164. Payload Validation

Consumers MUST validate payload structure before processing.

---

# 165. Queue Is Not a Trust Boundary

A message coming from an internal queue is not automatically safe.

---

# 166. Authorization Context

If the job performs an operation requiring authorization semantics, the system MUST define whether authorization is:

```text
checked at enqueue time
checked at execution time
or both
```

---

# 167. User Permission Changes

A job queued while a user has permission may execute after that permission is revoked.

The correct behavior depends on domain semantics.

---

# 168. Execution-Time Authorization

For sensitive future actions, execution-time authorization SHOULD be considered.

---

# 169. Actor Identity

Audit-sensitive jobs SHOULD retain the initiating actor identity or trusted service identity where appropriate.

---

# 170. Actor Is Not Credential

Persist:

```text
actor_id
```

not:

```text
actor_access_token
```

---

# 171. Correlation ID

Jobs SHOULD preserve correlation/trace identity from the originating workflow where useful.

---

# 172. Causation ID

Event-driven systems MAY preserve:

```text
correlation_id
causation_id
message_id
```

to trace workflow chains.

---

# 173. Scheduling

Scheduled work MUST use a reliable scheduler appropriate to the workload.

---

# 174. Scheduled Job Types

Distinguish:

```text
one-time delayed job
recurring job
calendar schedule
periodic sweep
```

---

# 175. Recurring Job

A recurring job SHOULD have one authoritative schedule definition.

---

# 176. Duplicate Schedulers

Multiple instances MUST NOT unintentionally enqueue duplicate scheduled work unless the operation is safely idempotent.

---

# 177. Scheduler Leader

Recurring scheduling MAY use:

```text
managed scheduler
leader election
distributed claim
database advisory lock
```

to prevent accidental duplicate scheduling.

---

# 178. Scheduler Idempotency

Even when one scheduler is expected, scheduled jobs SHOULD remain idempotent.

---

# 179. Scheduled Job Identity

Recurring executions SHOULD have a deterministic logical identity such as:

```text
daily-report:2026-09-23
```

when duplicate suppression matters.

---

# 180. Time Zone

Recurring schedules MUST define their timezone explicitly.

---

# 181. UTC Default

Use UTC for operational schedules unless business semantics require a local timezone.

---

# 182. Local-Time Schedules

If business logic says:

```text
9:00 AM customer local time
```

timezone is part of the business requirement.

---

# 183. Daylight Saving Time

Local schedules in DST regions MUST define behavior for:

```text
missing local time
repeated local time
```

---

# 184. Missed Schedule

The scheduler MUST define what happens when an execution is missed.

Options include:

```text
run immediately
skip
catch up all missed occurrences
coalesce
```

---

# 185. Catch-Up Storm

Do not automatically execute thousands of missed scheduled jobs simultaneously after a long outage.

---

# 186. Schedule Overlap

Recurring jobs MUST define whether a second occurrence may begin while the previous one is still running.

---

# 187. No-Overlap Job

Jobs such as:

```text
monthly billing close
```

may require explicit non-overlap protection.

---

# 188. Overlap-Safe Job

Other jobs may safely run concurrently.

Do not serialize needlessly.

---

# 189. Long Scheduled Job

If execution can exceed its recurrence interval:

```text
schedule
concurrency
overlap
```

must be explicitly designed.

---

# 190. Cron Is Scheduling Syntax, Not Reliability

A cron expression alone does not provide:

```text
high availability
deduplication
monitoring
recovery
```

---

# 191. Schedule Monitoring

Critical scheduled tasks SHOULD alert when:

```text
expected execution did not start
execution did not finish
execution failed
```

---

# 192. Schedule Delay

Track:

```text
scheduled_at
started_at
```

for latency-sensitive scheduled jobs.

---

# 193. Job Delay Metrics

Useful timings include:

```text
enqueue latency
queue wait
processing duration
end-to-end latency
```

---

# 194. Cancellation

Long-running jobs SHOULD support cancellation where the product requires it.

---

# 195. Cancellation Semantics

Cancellation MUST define whether it means:

```text
do not start
stop at safe checkpoint
best effort
fully compensate prior work
```

---

# 196. Cancellation Is Cooperative

Terminating a process is not generally a safe business-level cancellation strategy.

---

# 197. Cancellation Checkpoint

Long-running jobs SHOULD check cancellation at safe boundaries.

---

# 198. Irreversible Step

After an irreversible external action:

```text
cancel
```

may no longer mean:

```text
undo
```

---

# 199. Cancel vs Compensate

Use explicit compensation where undo is required.

---

# 200. Cancellation Idempotency

Repeated cancellation requests SHOULD be safe.

---

# 201. Worker Shutdown

Workers MUST support graceful shutdown.

---

# 202. Shutdown Flow

Canonical pattern:

```text
stop claiming new work
↓
finish / safely checkpoint current work
↓
ack completed work
↓
release unfinished work
↓
exit
```

---

# 203. Shutdown Deadline

Graceful shutdown MUST be bounded.

---

# 204. Deployment Shutdown

Worker termination during deployments MUST NOT silently lose jobs.

---

# 205. Long Job and Deployment

Long jobs may require:

```text
long termination grace
checkpointing
lease extension
draining
```

---

# 206. Forced Termination

Jobs MUST remain recoverable after worker process termination.

---

# 207. Worker Crash

A worker crash SHOULD eventually result in:

```text
job retry
or
job quarantine
```

according to policy.

---

# 208. Process Memory

Do not store the only copy of job state in worker memory.

---

# 209. Rate Limiting

Jobs calling constrained dependencies MUST respect rate limits.

---

# 210. Rate Limit Scopes

Limits MAY apply by:

```text
global provider
API key
tenant
endpoint
region
user
```

---

# 211. Global Rate Limit

A shared external-provider quota requires coordination across all workers.

---

# 212. Per-Worker Limit Is Insufficient

If:

```text
10 workers × 100 requests/sec
```

but provider limit is:

```text
100 requests/sec
```

limiting each worker to 100 is incorrect.

---

# 213. Distributed Rate Limiting

Shared limits MAY require:

```text
central token bucket
distributed semaphore
queue dispatch rate
provider-managed throttle
```

---

# 214. Burst

Rate policy SHOULD distinguish:

```text
sustained rate
burst capacity
```

when the dependency does.

---

# 215. Per-Tenant Rate Limit

One customer SHOULD NOT consume the entire shared provider quota when fairness matters.

---

# 216. Queue-Level Throttle

Queue dispatch MAY be rate-limited before worker execution.

---

# 217. Backoff vs Rate Limiting

Backoff reacts to failure.

Rate limiting proactively constrains traffic.

Use both where appropriate.

---

# 218. Concurrency Limit vs Rate Limit

Concurrency controls simultaneous work.

Rate limit controls work over time.

They are not equivalent.

---

# 219. Semaphore

Concurrency against an expensive dependency MAY use a bounded semaphore.

---

# 220. Provider 429

HTTP 429 SHOULD normally reduce request pressure, not trigger immediate parallel retry.

---

# 221. Token Refresh Storm

Workers SHOULD avoid every instance simultaneously refreshing credentials under load.

---

# 222. Ordering

Queues SHOULD remain unordered unless ordering is a real domain requirement.

---

# 223. Ordering Has Cost

Strict ordering can reduce:

```text
parallelism
throughput
failure isolation
```

---

# 224. Global Ordering

Global ordering SHOULD be avoided unless truly necessary.

---

# 225. Per-Key Ordering

Prefer ordering within a meaningful key:

```text
account
aggregate
document
```

rather than globally.

---

# 226. Ordering Key

All operations requiring order MUST use a stable ordering key.

---

# 227. Out-of-Order Tolerance

Consumers SHOULD tolerate out-of-order messages where domain semantics allow.

---

# 228. Sequence Number

Workflows requiring order MAY include:

```text
version
sequence
revision
```

and reject/stage stale messages.

---

# 229. Stale Job

A job MAY become obsolete before execution.

Example:

```text
resize avatar version 4
```

while avatar is already version 7.

---

# 230. Obsolete Job Check

Consumers SHOULD detect and skip superseded work where possible.

---

# 231. Coalescing

High-frequency updates MAY be coalesced.

Example:

```text
rebuild search index for document
```

does not always need one execution for every intermediate edit.

---

# 232. Last-Write-Wins Jobs

Some workloads MAY safely collapse multiple queued jobs into the latest desired state.

This MUST be intentional.

---

# 233. Batch Jobs

Workers MAY process messages in batches for efficiency.

---

# 234. Batch Failure

Batching requires explicit partial-failure semantics.

Do not reprocess successful batch items blindly if only one item failed.

---

# 235. Per-Item Result

Large batches SHOULD preserve item-level success/failure when partial retry matters.

---

# 236. Batch Size

Batch size SHOULD be bounded based on:

```text
memory
latency
provider limits
transaction size
```

---

# 237. Huge Database Transaction

Do not process thousands of independent jobs inside one giant transaction merely for convenience.

---

# 238. Bulk Jobs

Large jobs SHOULD often be divided into smaller independently retryable units.

---

# 239. Fan-Out

A coordinator MAY fan out:

```text
1 parent
→
N child jobs
```

for parallel processing.

---

# 240. Fan-Out Limit

Fan-out MUST be bounded.

One input MUST NOT unexpectedly create millions of child jobs without controls.

---

# 241. Fan-In

If a parent waits for children, completion tracking must tolerate:

```text
duplicate child completion
failed child
late child
```

---

# 242. Parent Completion

The parent SHOULD derive completion from durable child state rather than volatile worker counters.

---

# 243. Progress

User-visible long jobs MAY report progress.

---

# 244. Progress Is Approximate

Progress percentages SHOULD only be shown when meaningful.

Bad:

```text
99%
```

for an unknown-duration final stage lasting an hour.

---

# 245. Progress State

Progress SHOULD be monotonic where possible.

---

# 246. Job Result

Large results SHOULD be stored in appropriate durable storage and referenced by the operation record.

---

# 247. Result Expiry

Temporary generated files/results SHOULD have explicit retention.

---

# 248. Observability

Background work MUST be observable independently from web-request health.

---

# 249. Queue Metrics

Every important queue SHOULD expose relevant:

```text
ready messages
in-flight messages
oldest message age
enqueue rate
processing rate
retry rate
failure rate
DLQ count
```

---

# 250. Worker Metrics

Worker pools SHOULD expose:

```text
active workers
concurrency
job duration
success
failure
timeout
shutdown
```

---

# 251. Job-Type Metrics

Important job types SHOULD be measurable separately.

---

# 252. Queue Depth Alone Is Insufficient

Monitor:

```text
depth
+
age
+
arrival rate
+
processing rate
```

for meaningful capacity diagnosis.

---

# 253. Saturation

Useful saturation signals include:

```text
all workers busy
DB pool exhausted
provider quota exhausted
queue age increasing
```

---

# 254. Retry Metrics

Track retry reasons.

A rising:

```text
third_party_timeout retry
```

can reveal a dependency incident.

---

# 255. Attempt Count

Logs/traces SHOULD include attempt number where useful.

---

# 256. Job Logs

Structured job logs SHOULD include:

```text
job_id
job_type
queue
attempt
correlation_id
duration
outcome
```

as appropriate.

---

# 257. Sensitive Payload Logging

Payload values SHOULD NOT be logged indiscriminately.

---

# 258. Tracing

Distributed tracing SHOULD propagate through enqueue and processing where operationally useful.

---

# 259. Producer Span

Trace context MAY record:

```text
enqueue
```

as the producer step.

---

# 260. Consumer Span

Worker processing SHOULD continue the causal trace appropriately.

---

# 261. Queue Delay in Trace

Observability SHOULD distinguish:

```text
queue wait
```

from:

```text
processing time
```

---

# 262. Error Monitoring

Unhandled worker exceptions MUST reach error monitoring.

---

# 263. Alerting

Alerts SHOULD focus on user/business impact or actionable queue degradation.

---

# 264. Useful Alerts

Examples:

```text
oldest message age exceeds SLO
DLQ receives critical job
failure rate spikes
scheduler failed
queue depth growing continuously
worker fleet zero
```

---

# 265. Queue Age SLO

Latency-sensitive job systems SHOULD define an acceptable maximum queue age.

---

# 266. End-to-End SLI

A business job SLI MAY measure:

```text
time from accepted intent
to successful business completion
```

---

# 267. Email Example

For transactional email:

```text
95% delivered to provider within 60 seconds
```

may be more meaningful than worker CPU.

---

# 268. Dashboard

Critical async systems SHOULD have dashboards showing:

```text
backlog
age
throughput
errors
retries
DLQ
worker capacity
```

---

# 269. Operational Drill-Down

Operators should be able to find:

```text
why queue is growing
which job type fails
which dependency fails
which tenant dominates
```

---

# 270. Admin Tooling

Critical job systems MAY provide controlled operational tools for:

```text
inspect
retry
cancel
pause
resume
replay
```

---

# 271. Admin Tool Security

Operational tooling MUST use:

```text
authentication
authorization
audit
tenant controls
```

---

# 272. Raw Payload Exposure

Admin interfaces SHOULD mask sensitive payload fields.

---

# 273. Manual Retry

Manual retry SHOULD preserve idempotency semantics.

---

# 274. Manual Delete

Deleting a failed critical job SHOULD require explicit reason when it abandons business work.

---

# 275. Audit Log

Critical manual job actions SHOULD record:

```text
actor
job
action
reason
time
```

---

# 276. Worker Timeouts

Every job type SHOULD have a bounded execution timeout where meaningful.

---

# 277. Timeout vs Lease

Execution timeout and queue lease/visibility timeout are different.

Both must be coordinated.

---

# 278. Timeout Cancellation

A timed-out operation may still be executing remotely.

Do not automatically assume timeout means no side effect occurred.

---

# 279. External Timeout Ambiguity

Example:

```text
POST payment
↓
client timeout
```

means:

```text
outcome unknown
```

not necessarily:

```text
payment failed
```

---

# 280. Reconciliation

Ambiguous external operations SHOULD have a reconciliation mechanism.

---

# 281. Job Deadline

Distinguish:

```text
execution timeout
```

from:

```text
business deadline
```

---

# 282. Worker Memory

Jobs processing large inputs SHOULD stream/chunk rather than load unbounded data into memory.

---

# 283. Worker CPU

CPU-heavy jobs MAY use separate worker pools from I/O-heavy jobs.

---

# 284. Specialized Worker Pools

Separate pools MAY be appropriate for:

```text
GPU work
media encoding
high-memory reports
latency-sensitive jobs
```

---

# 285. Resource Isolation

Heavy background processing SHOULD NOT starve request-serving application resources.

---

# 286. Shared Deployment

If web and workers share compute, resource reservations MUST prevent workers from exhausting web capacity.

---

# 287. Worker Security

Workers SHOULD use dedicated least-privilege identities.

---

# 288. Queue Permissions

Producer typically needs:

```text
send
```

Consumer typically needs:

```text
receive
ack/delete
```

Do not grant both unnecessary admin rights.

---

# 289. Queue Administrator

Queue-management permissions SHOULD be limited.

---

# 290. Message Encryption

Sensitive queue traffic MUST use approved encryption and access controls.

---

# 291. Untrusted Data

Workers processing files, URLs, documents, archives, HTML, or external payloads MUST treat them as untrusted input.

---

# 292. SSRF

Jobs fetching user-provided URLs require SSRF protections from Security Guidelines.

---

# 293. File Processing

File-processing workers SHOULD run with restricted:

```text
filesystem
network
CPU
memory
```

where appropriate.

---

# 294. Sandbox

High-risk document/media processing MAY require process/container sandboxing.

---

# 295. Poison Payload Security

A repeatedly crashing payload MAY indicate:

```text
bug
malformed input
attack
resource exhaustion
```

and should be investigated accordingly.

---

# 296. Job Creation Authorization

Users MUST NOT enqueue privileged jobs they are not authorized to request.

---

# 297. Queue Name Is Not Authorization

Access to:

```text
admin-jobs
```

does not itself determine business authorization.

---

# 298. Tenant Boundary

Worker execution MUST enforce tenant isolation independently.

---

# 299. Tenant ID Validation

Do not trust arbitrary tenant IDs from queue payloads without authoritative context checks where required.

---

# 300. Data Residency

Queue region/storage location MUST satisfy applicable data residency constraints.

---

# 301. Retention

Queue and DLQ retention MUST align with:

```text
business need
replay need
privacy
cost
```

---

# 302. Deletion Requests

Queued copies of deleted personal data require lifecycle handling according to Privacy Guidelines.

---

# 303. Stale PII

Long queue retention SHOULD NOT accidentally preserve customer data longer than intended.

---

# 304. Disaster Recovery

Critical queue systems require recovery semantics.

---

# 305. Queue Loss

Ask:

```text
Can pending work be reconstructed?
Is authoritative intent stored elsewhere?
Would queue loss cause business loss?
```

---

# 306. Durable Intent

For critical business work, consider storing the authoritative operation state outside the broker.

---

# 307. Broker Is Often Delivery Infrastructure

The queue SHOULD often transport durable intent rather than be the only durable business record.

---

# 308. Queue Outage

When the queue provider is unavailable, producers SHOULD define:

```text
fail
buffer
persist locally
outbox
degrade
```

behavior.

---

# 309. Do Not Buffer Unbounded in Process Memory

An application MUST NOT accumulate unlimited unsent jobs in memory during prolonged queue outage.

---

# 310. Recovery Replay

After outage, replay/republication SHOULD be rate-controlled.

---

# 311. Regional Queue Failure

Regional DR MUST account for:

```text
pending messages
dedup state
scheduled jobs
ordering state
```

where relevant.

---

# 312. Queue Replication

Cross-region message replication does not automatically preserve exactly-once semantics.

---

# 313. Reconstructible Queue

If queue work can be recreated from:

```text
database state
outbox
event log
```

document the reconstruction procedure.

---

# 314. Scheduled Jobs During DR

DR MUST prevent both primary and recovery schedulers from executing singleton recurring work simultaneously unless safe.

---

# 315. Clock Skew

Distributed scheduling/job deadlines SHOULD tolerate reasonable clock differences.

---

# 316. Job Version During Recovery

Recovered workers may process old retained messages.

Payload compatibility MUST cover the recovery retention window.

---

# 317. Testing

Background systems require dedicated tests beyond normal request testing.

---

# 318. Unit Tests

Test:

```text
business logic
retry classification
idempotency
payload validation
```

independently where possible.

---

# 319. Integration Tests

Test against realistic:

```text
database
queue
external adapter
```

boundaries.

---

# 320. Duplicate Delivery Test

Critical consumers MUST be tested with duplicate delivery.

---

# 321. Crash Test

Test worker crash:

```text
after side effect
before acknowledgment
```

for important jobs.

---

# 322. Retry Test

Test transient failure followed by success.

---

# 323. Retry Exhaustion Test

Verify permanent failure eventually reaches the intended terminal state/DLQ.

---

# 324. Poison Job Test

Verify one malformed job does not indefinitely block unrelated work.

---

# 325. Concurrency Test

Test simultaneous execution against the same logical resource where races are possible.

---

# 326. Ordering Test

Where ordering is required, test:

```text
duplicate
late
out-of-order
```

messages.

---

# 327. Rate-Limit Test

Verify worker fleets remain within downstream limits under scale.

---

# 328. Backlog Test

Load tests SHOULD validate how the system recovers from a large backlog.

---

# 329. Graceful Shutdown Test

Workers SHOULD be tested during deployment termination.

---

# 330. Scheduler Test

Scheduled jobs SHOULD test:

```text
duplicate scheduler
missed occurrence
overlap
timezone
```

when relevant.

---

# 331. Payload Compatibility Test

New consumers SHOULD test representative older queued payloads.

---

# 332. Replay Test

Critical DLQ/replay tooling SHOULD be exercised before an incident.

---

# 333. Production Data in Tests

Do not use uncontrolled production payloads as test fixtures.

---

# 334. Queue Configuration as Code

Important queue configuration SHOULD be managed through IaC/configuration as code where practical.

---

# 335. Queue Configuration

Relevant configuration includes:

```text
retention
visibility timeout
DLQ
retry/redrive
encryption
access
ordering
```

---

# 336. Configuration Review

Changes to:

```text
retention
max attempts
DLQ
permissions
```

can materially change correctness and SHOULD be reviewed.

---

# 337. Visibility Change

Increasing visibility timeout dramatically can slow recovery from worker crashes.

---

# 338. Retry Change

Changing:

```text
max attempts 5 → 50
```

can multiply load and side effects.

---

# 339. Queue Deletion

Deleting a queue MUST account for pending business work.

---

# 340. Queue Migration

Moving queues/providers requires planning for:

```text
in-flight messages
deduplication
ordering
worker coexistence
cutover
rollback
```

---

# 341. Dual Consumption

During migration, dual consumers MUST NOT perform duplicate irreversible work.

---

# 342. Drain Strategy

A safe queue migration MAY:

```text
stop producers
drain old queue
switch
resume
```

or use a compatible dual-publish strategy.

---

# 343. Dual Publish

Dual publishing introduces its own:

```text
partial publication
duplicate
ordering
```

failure modes.

---

# 344. Observability During Migration

Queue migrations SHOULD compare:

```text
enqueue rate
processing rate
failure
age
DLQ
```

before and after cutover.

---

# 345. Background Job Review Checklist

```text
□ Async execution justified
□ Owner assigned
□ Queue selected
□ Delivery semantics understood
□ Idempotency strategy
□ Retry classification
□ Retry budget
□ Timeout
□ Payload schema
□ Security/privacy
□ Observability
□ DLQ behavior
□ Recovery behavior
```

---

# 346. Idempotency Checklist

```text
□ Logical operation ID
□ Retry uses same ID
□ Consumer duplicate-safe
□ DB race protected
□ External side effect protected
□ Partial success handled
□ Dedup retention sufficient
□ Concurrent duplicate tested
```

---

# 347. Retry Checklist

```text
□ Transient vs permanent classified
□ Maximum attempts
□ Maximum elapsed time
□ Backoff
□ Jitter
□ Retry-After respected where appropriate
□ Nested retries considered
□ Deadline/expiry
□ Terminal failure path
```

---

# 348. DLQ Checklist

```text
□ DLQ configured where needed
□ Owner
□ Alerting
□ Retention
□ Failure metadata
□ PII controls
□ Inspection tooling
□ Fix-before-replay process
□ Replay throttling
□ Audit
```

---

# 349. Concurrency Checklist

```text
□ Worker concurrency budget
□ DB connections
□ Downstream capacity
□ Tenant fairness
□ Same-resource race
□ Locking/version strategy
□ Horizontal scaling
□ Maximum workers
```

---

# 350. Scheduling Checklist

```text
□ Schedule owner
□ Timezone
□ DST semantics where relevant
□ Duplicate scheduler protection
□ Job idempotency
□ Missed-run behavior
□ Overlap behavior
□ Deadline
□ Monitoring
□ DR behavior
```

---

# 351. Payload Checklist

```text
□ Small payload
□ Explicit schema
□ Version where needed
□ Stable IDs
□ Reference vs snapshot intentional
□ No secrets
□ Minimum PII
□ Runtime validation
□ Size bounded
□ Compatible with retained old messages
```

---

# 352. Rate-Limit Checklist

```text
□ Downstream limit known
□ Scope known
□ Global vs per-worker considered
□ Burst considered
□ Worker concurrency aligned
□ 429 handled
□ Backoff
□ Tenant fairness
□ Autoscaling cannot exceed limit
```

---

# 353. Poison Job Checklist

```text
□ Deterministic failure identified
□ Retries bounded
□ Message quarantined
□ Queue not blocked
□ Error metadata retained
□ Security possibility considered
□ Owner alerted
□ Fix validated
□ Controlled replay
```

---

# 354. Observability Checklist

```text
□ Queue depth
□ Oldest message age
□ Enqueue rate
□ Processing rate
□ Duration
□ Retry rate
□ Failure rate
□ DLQ count
□ DLQ age
□ Worker capacity
□ Correlation/trace
□ Actionable alerts
```

---

# 355. Definition of Done — New Job

A production job is ready when:

```text
✓ Async boundary justified
✓ Owner exists
✓ Job type named
✓ Payload defined
✓ Payload validated
✓ Idempotency defined
✓ Retry policy defined
✓ Timeout defined
✓ Concurrency understood
✓ Rate limits understood
✓ Terminal failure path defined
✓ DLQ policy defined where required
✓ Metrics/logging available
✓ Tests include duplicate/retry behavior
✓ Security/privacy reviewed
```

---

# 356. Definition of Done — Queue

A production queue is ready when:

```text
✓ Owner
✓ Purpose
✓ Delivery semantics known
✓ Retention defined
✓ Visibility/lease configured
✓ Encryption
✓ IAM
✓ DLQ/redrive policy
✓ Capacity/scaling
✓ Monitoring
✓ IaC
✓ Disaster/reconstruction behavior
```

---

# 357. Definition of Done — Scheduled Job

```text
✓ Authoritative schedule
✓ Timezone
✓ Idempotent execution
✓ Duplicate scheduling safe
✓ Overlap semantics
✓ Missed-run semantics
✓ Monitoring
✓ Retry behavior
✓ DR behavior
```

---

# 358. Definition of Done — Failed Job Recovery

```text
✓ Root cause identified
✓ Permanent/transient classification confirmed
✓ Corrective change deployed
✓ Idempotency verified
✓ Replay population identified
✓ Replay rate controlled
✓ Results monitored
✓ DLQ cleared intentionally
✓ Audit/history retained
```

---

# 359. Background Job Anti-Patterns

Avoid:

```text
queue it
```

as a substitute for fixing slow synchronous architecture.

Avoid:

```text
exactly-once broker
therefore business side effect exactly once
```

Avoid:

```text
retry forever
```

Avoid:

```text
retry immediately 100 times
```

Avoid:

```text
random sleep
```

as a retry strategy without policy.

Avoid:

```text
every 4xx retried
```

Avoid:

```text
queue retries × SDK retries × HTTP retries
```

without a total retry budget.

Avoid:

```text
ack message
then do important work
```

Avoid:

```text
visibility = 30 sec
job = 20 min
```

without renewal.

Avoid:

```text
one poison message blocks all ordered work forever
```

Avoid:

```text
DLQ nobody monitors
```

Avoid:

```text
DLQ = permanent graveyard
```

Avoid:

```text
replay entire DLQ
```

without root-cause fix.

Avoid:

```text
new replay job IDs
```

that defeat idempotency.

Avoid:

```text
max worker concurrency = unlimited
```

Avoid:

```text
autoscale workers infinitely
```

without downstream capacity.

Avoid:

```text
CPU autoscaling only
```

for queue backlog workloads.

Avoid:

```text
one bulk export blocks password resets
```

Avoid:

```text
global ordering
```

when per-entity ordering is enough.

Avoid:

```text
random per-request ordering key
```

when ordering matters.

Avoid:

```text
full ORM object serialized into job
```

without explicit snapshot semantics.

Avoid:

```text
API access token stored in queue payload
```

Avoid:

```text
huge file encoded into queue message
```

Avoid:

```text
tenant ID in payload
therefore authorized
```

Avoid:

```text
cron on every web instance
```

creating duplicate recurring tasks.

Avoid:

```text
9 AM
```

with no timezone definition.

Avoid:

```text
missed hourly job
→ execute 4,000 occurrences simultaneously
```

Avoid:

```text
scheduled task
previous execution still running
new execution starts unknowingly
```

Avoid:

```text
timeout means external operation definitely failed
```

Avoid:

```text
kill worker process
```

as business cancellation.

Avoid:

```text
job success
```

measured only by worker process exit code.

Avoid:

```text
queue depth = healthy
```

without message age.

Avoid:

```text
full payload in every error log
```

Avoid:

```text
queue is durable
therefore no DR plan needed
```

Avoid:

```text
queue itself is the only record
```

of critical financial/business intent without deliberate justification.

---

# 360. AI Background Job Rules

AI coding agents MUST determine whether asynchronous execution is actually needed before creating a queue/job.

---

# 361. AI Idempotency Rule

AI MUST assume a background job may execute more than once unless a stronger complete end-to-end guarantee is verified.

---

# 362. AI Operation-ID Rule

AI SHOULD define a stable logical operation identifier for duplicate-sensitive side effects.

---

# 363. AI Retry Rule

AI MUST classify errors before retrying them.

---

# 364. AI Infinite-Retry Rule

AI MUST NOT create unbounded retries.

---

# 365. AI Backoff Rule

Retryable failures SHOULD use bounded backoff with jitter.

---

# 366. AI Nested-Retry Rule

AI MUST consider retries performed by:

```text
queue
SDK
HTTP client
application
```

together.

---

# 367. AI DLQ Rule

When creating a DLQ, AI MUST also define:

```text
owner
monitoring
inspection
replay
retention
```

---

# 368. AI Replay Rule

AI MUST NOT replay poison/dead-letter jobs before the underlying issue and idempotency behavior are understood.

---

# 369. AI Ack Rule

AI SHOULD acknowledge messages only after required durable work succeeds.

---

# 370. AI Lease Rule

AI MUST coordinate job duration with queue visibility/lease semantics.

---

# 371. AI Concurrency Rule

AI MUST NOT choose arbitrary high worker concurrency without considering:

```text
DB
provider
memory
CPU
rate limits
```

---

# 372. AI Scaling Rule

AI SHOULD prefer:

```text
queue age
queue depth
arrival/processing rate
```

over CPU alone when designing worker autoscaling.

---

# 373. AI Payload Rule

AI SHOULD prefer small stable job contracts containing IDs/references over serialized internal objects.

---

# 374. AI Snapshot Rule

AI MUST decide explicitly whether a job should process:

```text
state now
```

or:

```text
state at enqueue time
```

---

# 375. AI Secret Rule

AI MUST NOT place secrets/long-lived credentials into job payloads.

---

# 376. AI Tenant Rule

AI MUST preserve server-side tenant authorization and isolation during background execution.

---

# 377. AI Outbox Rule

When a DB mutation and job/event publication must be atomic in business terms, AI SHOULD consider transactional outbox rather than naive:

```text
DB commit
then publish
```

---

# 378. AI Schedule Rule

AI-generated schedules MUST define:

```text
timezone
overlap
missed execution
duplicate execution
```

where relevant.

---

# 379. AI Cron Rule

AI MUST NOT assume cron syntax alone provides distributed singleton execution.

---

# 380. AI Poison Rule

AI SHOULD quarantine deterministic poison jobs rather than repeatedly retrying them.

---

# 381. AI Rate-Limit Rule

AI MUST account for aggregate worker traffic against shared downstream rate limits.

---

# 382. AI Ordering Rule

AI SHOULD avoid strict ordering unless domain semantics require it.

---

# 383. AI Long-Job Rule

Long-running jobs SHOULD support:

```text
heartbeat
checkpoint
lease renewal
cancellation
```

where appropriate.

---

# 384. AI External-Side-Effect Rule

AI MUST treat network timeout after a non-idempotent external call as an ambiguous outcome.

---

# 385. AI Observability Rule

Every important new job SHOULD expose enough information to answer:

```text
queued?
running?
retrying?
stuck?
failed?
dead-lettered?
```

---

# 386. AI PII Rule

AI SHOULD minimize job payload and log data under Privacy Guidelines.

---

# 387. AI Queue-Proliferation Rule

AI SHOULD NOT create a separate queue for every job type automatically.

Separate queues only when:

```text
SLO
resource
priority
security
retry
```

differences justify it.

---

# 388. AI Gold Rule

When uncertain:

```text
Synchronous simplicity
>
Unnecessary asynchronous architecture
```

When asynchronous processing is justified:

```text
Durable intent
>
Small explicit payload
>
Idempotent worker
>
Bounded retry
>
Observable failure
>
Controlled replay
```

---

# 389. Golden Background Jobs & Queue Rules

**1. Use asynchronous execution only when the product or operational requirement justifies it.**

**2. A queue changes the consistency and completion contract; APIs and UX must acknowledge that.**

**3. Consumers assume duplicate execution unless stronger end-to-end guarantees are proven.**

**4. Broker exactly-once semantics do not eliminate application-level idempotency requirements for external side effects.**

**5. Every duplicate-sensitive operation has a stable logical identity.**

**6. Retries reuse the same logical operation identity.**

**7. Idempotency relies on durable atomic guarantees where correctness matters.**

**8. Database uniqueness and state transitions are preferred over race-prone check-then-act logic.**

**9. Provider idempotency capabilities are used for retryable external side effects where available.**

**10. Partial success is modeled explicitly.**

**11. Complex workflows persist progress rather than relying on worker memory.**

**12. Database mutations and queue publication use transactional outbox or equivalent patterns when atomic intent matters.**

**13. Retry only failures likely to succeed later.**

**14. Every retry policy is bounded.**

**15. Retries use backoff and jitter where repeated failure could create load amplification.**

**16. Nested retry layers have a combined retry budget.**

**17. Jobs expire when delayed execution would no longer be useful or safe.**

**18. DLQs have owners, alerts, retention, inspection, and replay procedures.**

**19. DLQs are not garbage bins.**

**20. Poison jobs are quarantined rather than allowed to block unrelated work.**

**21. DLQ replay happens only after the failure cause and idempotency behavior are understood.**

**22. Queue lease/visibility duration matches processing behavior.**

**23. Long jobs renew leases or heartbeat where necessary.**

**24. Messages are acknowledged only after the required durable work succeeds.**

**25. Worker concurrency is bounded by complete-system capacity.**

**26. Worker scaling accounts for databases, connections, external providers, quotas, CPU, and memory.**

**27. Queue age is monitored in addition to queue depth.**

**28. Backlogs represent delayed work, not unlimited capacity.**

**29. Producers are throttled or degraded when backlog becomes unsafe.**

**30. Shared worker systems preserve tenant/workload fairness where required.**

**31. High-priority work cannot starve normal work indefinitely.**

**32. Workloads with materially different SLOs or resource profiles may use separate queues/pools.**

**33. Queue payloads are small, explicit, versionable, and validated.**

**34. Secrets and long-lived credentials never belong in job payloads.**

**35. PII in jobs is minimized and governed by retention policy.**

**36. Reference-versus-snapshot payload semantics are chosen deliberately.**

**37. Large files are stored externally and referenced rather than embedded in queue messages.**

**38. Queue messages are not trusted merely because the queue is internal.**

**39. Background workers enforce tenant and security boundaries independently.**

**40. Job contracts account for producer/consumer version skew and retained old messages.**

**41. Scheduled work has one authoritative schedule definition.**

**42. Recurring jobs remain idempotent even when singleton scheduling is expected.**

**43. Every schedule defines timezone semantics.**

**44. Missed-run and overlap behavior are explicit.**

**45. Cron syntax alone does not create reliable distributed scheduling.**

**46. Worker shutdown stops new claims before terminating active work where possible.**

**47. Worker crashes do not permanently lose recoverable work.**

**48. Cancellation is a business semantic, not merely process termination.**

**49. Concurrency limits and rate limits solve different problems and may both be needed.**

**50. Shared downstream quotas are enforced across the worker fleet, not independently per worker.**

**51. Strict ordering is introduced only when required by domain semantics.**

**52. Per-key ordering is preferred over unnecessary global ordering.**

**53. Stale/superseded jobs are skipped where the latest state makes them obsolete.**

**54. Large workloads are decomposed into independently retryable bounded units where practical.**

**55. Fan-out is bounded.**

**56. Partial batch failures preserve per-item correctness.**

**57. Queue health includes depth, age, throughput, retries, failures, and DLQ behavior.**

**58. Background-job telemetry is distinguishable from synchronous request telemetry.**

**59. Manual retry, cancellation, deletion, and replay of critical jobs are authorized and auditable.**

**60. Queue infrastructure is configured and reviewed as production infrastructure.**

**61. Queue retention is not a substitute for an authoritative business record when pending work cannot be lost.**

**62. Critical job intent is recoverable after broker or regional failure.**

**63. DR prevents duplicate singleton schedulers from running simultaneously unless safe.**

**64. Duplicate delivery, crash-before-ack, retry exhaustion, poison jobs, concurrency, and graceful shutdown are explicitly tested.**

**65. Queue migration plans account for in-flight work, duplicates, ordering, and rollback.**

**66. Timeouts after external side effects are treated as potentially ambiguous outcomes.**

**67. Reconciliation exists for important ambiguous external operations.**

**68. Operators can determine whether important work is queued, late, retrying, failing, or dead-lettered.**

**69. Every background job has an explicit terminal failure strategy.**

**70. If nobody can explain what happens when a job executes twice, crashes halfway through, or fails every retry, the job is not production-grade.**

---

# 390. Canonical Background Jobs & Queue Standard

The organizational standard is:

> **Background execution is introduced only when asynchronous processing, buffering, independent retry, delayed execution, or producer-consumer decoupling provides concrete value. Moving work to a queue changes the product contract from immediate completion to durable intent followed by eventual processing, and APIs, user experience, observability, and recovery behavior reflect that distinction.**

> **Consumers are designed for duplicate delivery by default. Important side effects have stable logical operation identifiers, retries preserve those identifiers, database constraints and transactional state transitions prevent concurrent duplication, and external-provider idempotency features are used where available. Broker deduplication or exactly-once delivery capabilities supplement rather than replace end-to-end business idempotency because worker crashes, producer retries, external systems, and ambiguous network outcomes can still create duplicate effects.**

> **Retries are selective and bounded. Transient errors use controlled backoff and jitter, permanent errors fail without wasteful repetition, rate-limit responses respect downstream guidance, and nested queue/SDK/network retry policies are evaluated as one retry budget. Jobs with finite business value expire, while retry exhaustion transitions work into an explicit terminal state or owned dead-letter path rather than retrying forever.**

> **Dead-letter queues are operational queues, not disposal bins. They have owners, alerts, retention, investigation metadata, privacy controls, and controlled replay procedures. Poison jobs are isolated before they block healthy work, and replay occurs only after the underlying defect is corrected and duplicate effects are understood. Large replay operations are throttled and audited.**

> **Worker concurrency, queue scaling, and dispatch rates are bounded by the capacity of the complete system. Worker pools account for database connections, CPU, memory, external provider quotas, per-tenant fairness, and shared service limits. Queue age, arrival rate, processing rate, retries, and saturation drive capacity decisions alongside raw depth, while admission control and backpressure prevent finite consumer capacity from becoming an infinitely growing backlog.**

> **Job payloads form versioned contracts. Payloads are small, explicit, schema-validated, and free of long-lived secrets; they contain stable identifiers or deliberate snapshots according to business semantics. Large data is stored in appropriate object/data storage and referenced from the job. Retained messages remain processable across application deployments, and workers account for producer-consumer version skew during rolling releases and disaster recovery.**

> **Scheduled work has explicit time, concurrency, and recovery semantics. Every important recurring job defines timezone, duplicate-execution behavior, overlap policy, missed-run handling, idempotent execution, monitoring, and disaster-recovery behavior. A cron expression alone is not treated as distributed scheduling, and recovery or multi-instance deployments cannot accidentally create uncontrolled duplicate schedulers.**

> **Background jobs are observable as first-class production workloads. Queues expose backlog depth, oldest-message age, throughput, retries, failures, dead-letter state, and worker saturation; individual operations preserve safe job, correlation, and attempt identifiers; and distributed traces distinguish queue wait from execution time where useful. Operators have controlled, audited mechanisms for pause, resume, retry, replay, cancellation, and inspection without exposing unnecessary customer data.**

> **Queue infrastructure is recoverable, secured, and reproducible. Producers and consumers use least-privilege identities, queue contents follow privacy and residency controls, critical business intent remains recoverable independently of a transient worker or broker failure, worker shutdown and crashes do not silently lose work, and queue/scheduler configuration is managed as reviewed infrastructure where practical.**

A production-grade background-job architecture should make it easy to answer:

```text
Why is this operation asynchronous?
What is the authoritative record that the work was requested?
What queue/job type handles it?
Who owns it?
Can the message be delivered twice?
What prevents duplicate business effects?
What is the idempotency key?
How long is deduplication effective?
Which errors are retryable?
How many attempts occur?
How long can retry continue?
What backoff and jitter are used?
What happens after retries are exhausted?
Where do poison jobs go?
Who monitors that DLQ?
How are dead-lettered jobs replayed safely?
How long is the queue processing lease?
Can the job exceed that lease?
How is the lease renewed?
When is the message acknowledged?
What happens if the worker crashes after committing data but before acknowledgment?
How many workers can run concurrently?
Can the database support that concurrency?
Can downstream providers support it?
How is tenant fairness preserved?
What happens when producers exceed consumer capacity?
What is the oldest message age?
Which queue latency violates the business SLO?
What is inside the job payload?
Is it a reference or a snapshot?
Can old retained payloads still be processed after a deployment?
Does the job contain PII or secrets?
What happens to missed recurring executions?
Can two schedulers enqueue the same job?
Can scheduled executions overlap?
Which timezone controls the schedule?
Can the job be cancelled safely?
How does a worker shut down?
Can the system recover pending work after broker failure?
Can operators identify, inspect, pause, retry, replay, and audit failed work?
```

If those questions cannot be answered reliably, the background-processing system is not yet production-grade.

One important baseline is that **at-least-once remains a normal default assumption** for mainstream message infrastructure. Google Pub/Sub, for example, documents at-least-once delivery as its default and separately offers stronger exactly-once semantics for specific subscription modes; even its exactly-once documentation notes that publish-side retries can still create multiple logically related publications. citeturn620389search1turn620389search3

Likewise, broker-level duplicate suppression should be treated as defense in depth rather than the application’s sole correctness mechanism. Azure Service Bus currently implements duplicate detection using application-controlled message IDs over a configured history window, which means application identity and window semantics still matter. citeturn620389search0

For ordering, the cost should remain explicit: current Pub/Sub ordering is scoped by an **ordering key**, and delivery/acknowledgment behavior for one key can constrain progress behind earlier messages. This supports the standard above to prefer **per-entity ordering over global ordering** and to design poison-message handling carefully. citeturn620389search4turn620389search5

In the master hierarchy, this belongs alongside other runtime/data-flow standards rather than CI/CD:

**… → Error Handling & Resilience → Caching → Background Jobs & Queue → Files & Media → Search → Notifications → Internationalization → Testing → Performance → Observability → …**
