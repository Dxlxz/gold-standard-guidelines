---
id: "concurrency"
title: "Concurrency & Consistency"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "concurrency", "consistency"]
applies_to: ["general"]
related: []
legacy_number: 73
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 81217
provenance: baseline

---

The canonical baseline is: **use the smallest consistency mechanism that actually protects the business invariant**. Local ACID transactions should protect single-database invariants; optimistic concurrency should be the normal user-edit baseline; pessimistic locking is reserved for short, contention-sensitive critical sections; and distributed workflows should assume retries, duplicates, partial completion, and compensation rather than pretending a cross-service call chain is one database transaction.

# Concurrency & Consistency Guidelines — Gold Standard 2026

**Canonical placement:** Data & Database → Concurrency → API → Jobs & Queue  
**Status:** Canonical  
**Applies to:** Databases, APIs, transactional workflows, CRUD applications, forms, inventory, reservations, counters, payments, background jobs, queues, event-driven systems, microservices, distributed workflows, optimistic UI, and any feature where multiple actors can read or modify related state concurrently  
**Component baseline:** shadcn/ui  
**Normative terms:** MUST, MUST NOT, SHOULD, SHOULD NOT, MAY

---

# 1. Purpose

## 1.1 Objective

This standard defines the canonical architecture, database, API, state-management, user-experience, distributed-systems, retry, messaging, and testing requirements for concurrency and consistency.

It covers:

1. business invariants;
2. transaction boundaries;
3. isolation levels;
4. concurrency anomalies;
5. optimistic concurrency control;
6. pessimistic locking;
7. deadlocks;
8. atomic writes;
9. counters;
10. inventory and reservations;
11. idempotency keys;
12. duplicate requests;
13. retries;
14. UI race conditions;
15. stale responses;
16. lost updates;
17. distributed transactions;
18. sagas;
19. compensating actions;
20. transactional outbox;
21. inbox/deduplication;
22. message ordering;
23. eventual consistency;
24. background jobs and queues;
25. optimistic UI;
26. conflict UX;
27. consistency-aware APIs;
28. observability; and
29. concurrency testing.

The purpose is to ensure that concurrent operations preserve the **business invariants that matter**, even when requests are duplicated, reordered, retried, delayed, interrupted, or executed simultaneously.

## 1.2 Core principle

Concurrency design MUST begin with an invariant.

Examples:

```text
inventory_available >= 0

account_balance >= allowed_minimum

one active reservation per seat

username unique within tenant

invoice number unique within legal entity

only one published version per document

order total = sum(order lines)

a message is applied at most once per consumer effect

a workflow cannot transition from completed back to pending
```

The canonical design process is:

```text
Business invariant
      ↓
Consistency boundary
      ↓
Concurrency threat
      ↓
Database / application mechanism
      ↓
Retry behavior
      ↓
User-visible conflict behavior
      ↓
Tests + observability
```

A lock, transaction, queue, or idempotency key MUST NOT be introduced without understanding which invariant it protects.

## 1.3 Consistency is not one global setting

Applications MUST distinguish between:

- **strong consistency** — operations must observe a state compatible with the required invariant immediately;
- **transactional consistency** — related local mutations commit or roll back as one unit;
- **snapshot consistency** — reads observe one stable database snapshot;
- **eventual consistency** — independent components may temporarily disagree but are expected to converge;
- **read-your-writes consistency** — a user should observe their own completed mutation;
- **monotonic state progression** — users should not observe state apparently moving backwards;
- **ordered processing** — operations affecting one entity must be applied in the required sequence.

A system MUST NOT advertise itself simply as "strongly consistent" or "eventually consistent" without identifying the scope.

## 1.4 Relationship to other standards

This standard MUST be implemented consistently with:

- **Security:** authorization races, TOCTOU checks, replay attacks, duplicate privileged actions, tenant boundaries, fraud controls, lock abuse, and audit trails;
- **Data & Database:** constraints, transactions, indexes, foreign keys, unique constraints, schema design, row versions, replication, and integrity;
- **API:** conditional requests, idempotency keys, retries, status codes, conflicts, ETags, timeout behavior, and error envelopes;
- **State Management:** server-state ownership, optimistic mutations, stale requests, cancellation, cache invalidation, mutation lifecycle, and reconciliation;
- **Forms & Validation:** edit conflicts, duplicate submissions, dirty state, version tokens, server validation, and preservation of user work;
- **Accessibility:** conflict announcements, progress states, error recovery, focus management, and status messages;
- **Design Tokens:** warning/error/conflict states, loading, disabled controls, status badges, and optimistic-state treatments;
- **Component standards:** Alert, AlertDialog, Dialog, Button, Badge, Progress, Spinner, Skeleton, Table, Data Table, Form, Input, and Toast;
- **Pattern standards:** CRUD, forms, destructive actions, loading/error states, background processing, bulk operations, and notifications; and
- **Jobs & Queue:** acknowledgement, retries, dead-letter handling, ordering, deduplication, poison messages, and worker concurrency.

PostgreSQL's current concurrency documentation is a useful illustration of why these choices matter: Read Committed uses statement-level snapshots, Repeatable Read provides a stable transaction snapshot, and Serializable additionally prevents executions that could not correspond to some serial ordering by aborting one transaction with a serialization failure. Applications using Serializable therefore MUST be prepared to retry. citeturn922985search33turn922985search0

---

# 2. Rules

## 2.1 Define the invariant first

Every concurrency-sensitive feature MUST document the invariant it protects.

Preferred:

```text
Invariant:
A seat may have at most one confirmed reservation.

Mechanism:
Unique constraint on active seat reservation +
transactional status transition.

Conflict behavior:
Second confirmer receives reservation conflict.
```

Avoid:

```text
Use locking because multiple users may click at once.
```

The implementation MUST protect the invariant at the authoritative data layer whenever feasible.

UI behavior alone MUST NOT enforce a database invariant.

---

## 2.2 Put integrity in the database where possible

Structural invariants SHOULD use database constraints.

Preferred mechanisms include:

```text
PRIMARY KEY
UNIQUE
FOREIGN KEY
CHECK
NOT NULL
exclusion constraint
conditional/partial unique constraint
```

The application MUST NOT rely on:

```text
SELECT to check
→ if absent
→ INSERT
```

as the sole uniqueness mechanism.

Concurrent callers can both pass the check.

The database MUST reject the invalid second state.

---

## 2.3 Transaction boundary

A transaction MUST contain the smallest complete unit of work that requires atomic consistency.

All local writes required to preserve one invariant SHOULD occur in the same transaction when they share one transactional datastore.

Example:

```text
create order
create order lines
reserve local inventory
write outbox event
```

MAY belong to one transaction if all rows are in the same database and together define one atomic state transition.

Transactions SHOULD be short.

---

## 2.4 Do not hold transactions across remote calls

A database transaction SHOULD NOT remain open while performing:

- HTTP requests;
- email sends;
- payment-provider calls;
- object-storage uploads;
- message-broker publishing outside a transactional bridge;
- user interaction;
- lengthy computation; or
- arbitrary external tool execution.

Holding locks during external calls increases:

- lock duration;
- contention;
- deadlocks;
- timeout risk;
- transaction age; and
- resource exhaustion.

Instead, commit local state and coordinate the external effect through an appropriate distributed pattern.

---

## 2.5 Transaction outcome

A transaction MUST have an explicit outcome.

Application code MUST:

```text
commit on complete success
rollback on failure
```

Partial local mutation MUST NOT escape a transaction when the domain requires all-or-nothing behavior.

Exceptions MUST NOT be swallowed while accidentally allowing a transaction to commit incomplete work.

---

## 2.6 Keep transaction logic deterministic

Code inside a transaction SHOULD minimize nondeterministic external dependencies.

Where possible, obtain required user input and validate static request syntax before entering the transaction.

Business rules dependent on current database state MUST be revalidated inside the transaction.

---

## 2.7 Do not trust pre-transaction checks

This sequence is unsafe:

```text
1. Read availability
2. Wait
3. Start transaction
4. Write reservation
```

because availability may have changed.

Any state-dependent condition required for correctness MUST be validated atomically within the protecting transaction or mutation.

---

## 2.8 Isolation level is a business decision

The isolation level MUST be chosen based on permitted anomalies.

Teams MUST NOT blindly:

- accept the database default; or
- set every transaction to Serializable

without understanding the workload.

The application's data-access layer SHOULD document the expected isolation level for concurrency-sensitive operations.

---

## 2.9 Read Committed

Read Committed MAY be used when statement-level consistency plus explicit atomic writes/constraints provide sufficient protection.

Under PostgreSQL, Read Committed is the default; each statement observes data committed before that statement began, so successive statements in one transaction can observe different committed states. citeturn922985search33turn922985search2

Read Committed SHOULD NOT be assumed to provide a stable transaction-wide snapshot.

A multi-statement read/check/write algorithm MUST be reviewed for concurrency anomalies.

---

## 2.10 Non-repeatable reads

A non-repeatable read occurs when:

```text
T1 reads row = A
T2 updates row = B and commits
T1 reads same row = B
```

This MAY be acceptable for ordinary dashboard/read operations.

It MUST NOT be accepted where a multi-step calculation depends on the value remaining stable.

---

## 2.11 Phantom-like changes

A query may return a different matching set after another transaction inserts or deletes qualifying rows.

For example:

```text
SELECT count(*)
WHERE status = 'active'
```

may produce a different count later in the same Read Committed transaction.

Business logic depending on stable sets MUST choose an isolation/locking strategy that protects the required invariant.

---

## 2.12 Repeatable Read

Repeatable Read SHOULD be used when a transaction requires a stable snapshot but true serial execution is not required.

PostgreSQL's Repeatable Read uses a stable snapshot and prevents the usual non-repeatable-read behavior, but its documentation explicitly warns that snapshot consistency alone does not guarantee that business-rule checks are equivalent to some serial execution. citeturn922985search31turn922985search0

Applications MUST understand the actual database implementation rather than infer behavior solely from the isolation-level name.

---

## 2.13 Write skew

Write skew is a critical anomaly where two transactions:

1. read a shared condition;
2. independently conclude their own update is valid;
3. update different rows; and
4. collectively violate a cross-row invariant.

Example:

```text
At least one doctor must remain on call.

T1 sees Alice + Bob on call.
T2 sees Alice + Bob on call.

T1 takes Alice off call.
T2 takes Bob off call.

Both commit.
No doctor remains on call.
```

Unique row locking alone MAY not prevent this because the transactions update different rows.

Cross-row invariants SHOULD use:

- Serializable isolation;
- explicit locking of a shared controlling row;
- a database constraint capable of representing the invariant; or
- another proven serialization mechanism.

---

## 2.14 Serializable isolation

Serializable SHOULD be preferred when:

- correctness depends on multi-row predicates;
- explicit locking would be complex;
- concurrency is moderate enough for retries;
- and the database provides mature serializable behavior.

Serializable transactions MUST be prepared for serialization failures.

A serialization failure is an expected concurrency-control outcome, not automatically an application defect.

PostgreSQL's Serializable level detects unsafe read/write dependency patterns and rolls back one transaction to preserve behavior equivalent to serial execution. citeturn720384search34turn922985search0

---

## 2.15 Serializable retries

Serializable transactions SHOULD be executed through a retry helper.

Retry logic MUST:

- rerun the **entire transaction**;
- use a new transaction/snapshot;
- be bounded;
- use appropriate backoff/jitter under contention;
- preserve request idempotency;
- stop on non-retryable failures.

The application MUST NOT retry only the final SQL statement after serialization failure when earlier transaction decisions depended on the old snapshot.

---

## 2.16 Retryable transaction function

A canonical transaction wrapper SHOULD conceptually resemble:

```text
retryTransaction(() => {
  begin serializable

  reread authoritative state
  validate invariant
  apply changes

  commit
})
```

External side effects MUST remain outside this retried unit unless independently idempotent.

---

## 2.17 Pessimistic locking

Pessimistic locking MAY be used when contention is expected and conflicting concurrent work should wait rather than fail at commit.

Typical cases include:

- reservation allocation;
- dequeueing database-backed jobs;
- ordered sequence allocation;
- short high-value financial updates;
- contention around a small known row set.

Row locks SHOULD be preferred over table locks where they protect the required invariant.

---

## 2.18 `SELECT ... FOR UPDATE`

Where supported, row-level locking such as:

```sql
SELECT ... FOR UPDATE
```

MAY protect rows before dependent mutation.

PostgreSQL documents row locks as blocking conflicting modifications to the selected rows until the locking transaction completes. citeturn720384search0turn720384search32

A row lock MUST NOT be assumed to protect:

- rows that do not yet exist;
- arbitrary predicates;
- unrelated rows;
- external systems; or
- business invariants outside the locked set.

---

## 2.19 Lock the right resource

The locked resource MUST correspond to the invariant.

Example:

If only one booking may exist for a timeslot, locking:

```text
the user row
```

does not necessarily protect:

```text
the timeslot
```

The transaction SHOULD lock or constrain the data object representing the contested resource.

---

## 2.20 Lock ordering

When transactions may lock multiple resources, the application SHOULD acquire locks in one deterministic order.

Example:

```text
always lock account IDs ascending
```

rather than:

```text
lock source, then target
```

for transfers where two requests may reverse source and target.

Consistent ordering materially reduces deadlock probability.

---

## 2.21 Deadlocks

Applications MUST assume deadlocks can still occur.

PostgreSQL detects deadlocks and aborts one participating transaction; applications must not rely on which transaction is chosen. citeturn922985search6

Deadlock errors SHOULD normally be treated as retryable when:

- the operation itself is safe to retry; and
- the entire transactional unit is replayed.

---

## 2.22 Lock timeout

Pessimistic-lock operations SHOULD have bounded waiting behavior appropriate to the use case.

The product MUST NOT let a request wait indefinitely for a contested lock.

Depending on the feature, an exhausted lock wait MAY become:

```text
retryable server failure
409 conflict
423-like locked state under an application contract
job retry
```

according to the API standard.

---

## 2.23 `SKIP LOCKED`

`SKIP LOCKED` MAY be used for queue-like worker allocation where skipping currently claimed rows is desirable.

It MUST NOT be used as a general-purpose consistency mechanism.

PostgreSQL explicitly notes that `SKIP LOCKED` gives an inconsistent view and is appropriate for queue-like workloads rather than general querying. citeturn720384search32

---

## 2.24 Advisory locks

Application-level/advisory locks MAY be used for coordination that does not map cleanly to individual rows.

They SHOULD be used sparingly.

The lock-key scheme MUST be:

- deterministic;
- collision-safe within its namespace;
- documented;
- observable.

Advisory locks MUST NOT replace database constraints where a constraint can enforce the invariant directly.

---

## 2.25 Optimistic locking

Optimistic concurrency SHOULD be the default for ordinary user-edited resources with relatively low contention.

The resource SHOULD carry a version token such as:

```text
version = 17
```

or another concurrency identifier.

An update SHOULD conceptually execute:

```sql
UPDATE document
SET body = ..., version = version + 1
WHERE id = ?
  AND version = ?
```

If zero rows are affected, a concurrent modification occurred.

---

## 2.26 Version token

A concurrency version MUST change whenever relevant resource state changes.

Appropriate tokens MAY include:

- integer revision;
- opaque version identifier;
- entity tag;
- database-native row version;
- content hash where semantically correct.

A human-visible `updated_at` timestamp SHOULD NOT be the first choice when precision, clock behavior, or unrelated writes can make it unreliable as a version token.

---

## 2.27 API optimistic concurrency

HTTP APIs SHOULD expose optimistic concurrency using a clear contract.

Suitable patterns include:

```text
ETag
If-Match
```

or an explicit:

```json
{
  "version": 17
}
```

request field.

An API MUST reject a stale update rather than silently overwriting newer state when lost updates are prohibited.

---

## 2.28 Conflict response

A stale optimistic update SHOULD produce a structured conflict response, typically aligned with:

```text
409 Conflict
```

or an appropriate precondition status under the API contract.

The error SHOULD include enough safe information to allow the client to:

- refetch;
- compare;
- merge;
- retry deliberately.

It MUST NOT expose another user's protected data merely to explain the conflict.

---

## 2.29 Lost update prevention

Read-modify-write workflows MUST protect against lost updates.

Unsafe:

```text
GET balance = 100

client A: +10
client B: +20

A PUT balance=110
B PUT balance=120
```

Final value becomes 120 instead of 130.

Use one of:

- atomic arithmetic;
- optimistic versioning;
- row locking;
- Serializable isolation;
- domain-specific command semantics.

---

## 2.30 Prefer semantic commands over replacement writes

APIs SHOULD expose semantic mutations where concurrent merge behavior matters.

Preferred:

```text
POST /account/{id}/credits
amount = 10
```

over:

```text
PUT /account/{id}
balance = 110
```

when the operation semantically means "add 10."

Command-shaped APIs can make atomic implementation clearer and reduce lost-update risk.

---

## 2.31 Atomic counters

Counters MUST be updated atomically at the authoritative store.

Unsafe:

```text
read counter
counter = counter + 1
write counter
```

Preferred:

```sql
UPDATE counters
SET value = value + 1
WHERE id = ?
RETURNING value;
```

The database operation MUST perform the arithmetic atomically.

---

## 2.32 Counter semantics

Teams MUST distinguish:

- exact authoritative counter;
- eventually consistent derived count;
- analytics approximation;
- cached display count.

A badge such as "12 unread" MAY tolerate temporary staleness.

A financial balance generally may not.

The consistency requirement MUST derive from business meaning.

---

## 2.33 Hot counters

A heavily contended exact counter MAY become a scalability bottleneck.

Alternatives MAY include:

- partitioned/sharded counters;
- append-only events plus aggregation;
- approximate counters;
- asynchronous materialization.

A scalability optimization MUST NOT weaken accuracy when the counter is itself an invariant.

---

## 2.34 Inventory decrement

Inventory MUST NOT use an unprotected read-then-write sequence.

A canonical conditional mutation is:

```sql
UPDATE inventory
SET available = available - :quantity
WHERE sku = :sku
  AND available >= :quantity
RETURNING available;
```

If no row is returned, the reservation fails.

The availability predicate and decrement occur atomically.

---

## 2.35 Inventory invariants

Inventory schemas SHOULD additionally enforce:

```text
available >= 0
```

through an appropriate database constraint when possible.

Application checks improve UX.

The database constraint protects integrity.

Both MAY be used.

---

## 2.36 Reservations

Where stock can be held temporarily, the domain SHOULD distinguish:

```text
available
reserved
committed
released
expired
```

A reservation is not equivalent to a completed purchase.

Reservation expiry MUST be idempotent.

Confirmation and expiry racing against one another MUST have a defined atomic winner.

---

## 2.37 Unique allocation

For scarce unique resources such as:

- seat;
- room;
- username;
- serial number;
- time slot,

the authoritative allocation SHOULD normally use a unique/exclusion constraint in addition to application logic.

"Check then insert" alone is insufficient.

---

## 2.38 Idempotency

Any operation likely to be retried after uncertain network outcomes SHOULD have an idempotency strategy.

This is especially important for:

- payment creation;
- order submission;
- invitation sending;
- webhook handling;
- external commands;
- job dispatch;
- resource creation where duplicate creation is harmful.

---

## 2.39 Idempotency key scope

An idempotency key MUST have a clearly defined scope.

A scope SHOULD normally include some combination of:

```text
tenant/principal
operation
resource or endpoint
idempotency key
```

A key from one tenant MUST NOT suppress an operation in another tenant.

---

## 2.40 Idempotency key source

For client-retryable operations, the client SHOULD generate a stable high-entropy key before the first attempt and reuse that key for retries of the same logical operation.

The client MUST NOT generate a new key for every retry.

A new logical action MUST use a new key.

---

## 2.41 Idempotency key payload binding

The server SHOULD bind an idempotency key to a normalized request fingerprint or equivalent request identity.

If the same key is reused with materially different input, the server MUST NOT silently execute the second payload as though it were the same operation.

It SHOULD return a conflict or validation error.

---

## 2.42 Idempotency record

An idempotency record SHOULD contain enough data to determine:

```text
key
scope
request fingerprint
status
created_at
completed_at
result identity
response status
expiry
```

Sensitive full request/response bodies SHOULD NOT be retained unless required.

---

## 2.43 Idempotency transaction

For local database mutations, the idempotency claim and protected mutation SHOULD participate in one transactional consistency strategy.

The design MUST prevent:

```text
business mutation commits
idempotency record does not
```

which would allow a retry to duplicate the effect.

---

## 2.44 In-progress duplicate

If a second request arrives while the same idempotency key is currently executing, the server MUST define behavior.

It MAY:

- wait briefly for the first result;
- return a processing state;
- return a conflict/in-progress error.

It MUST NOT normally execute the operation concurrently a second time.

---

## 2.45 Cached idempotent response

A completed duplicate request MAY return the previously committed result.

The returned response SHOULD represent the original logical operation rather than re-executing downstream side effects.

---

## 2.46 Idempotency retention

Idempotency keys MUST have a retention policy based on the maximum plausible retry window and domain risk.

The server MUST document what happens after key expiry.

High-consequence operations MAY require longer deduplication retention than ordinary resource creation.

---

## 2.47 Idempotency is not universal uniqueness

An idempotency key answers:

```text
Is this a retry of the same logical operation?
```

It does not necessarily answer:

```text
May this business event occur only once ever?
```

Permanent business uniqueness MUST use domain constraints.

---

## 2.48 Client submit protection

Form submission controls SHOULD prevent accidental immediate duplicate activation while a mutation is pending.

The submit button MAY become pending/disabled when repeated execution would be unsafe.

This improves UX.

It MUST NOT replace server-side idempotency or concurrency control.

---

## 2.49 Network timeout ambiguity

A client timeout does not prove that the server operation failed.

The operation may have:

- failed;
- not reached the server;
- committed successfully;
- committed but lost the response.

For unsafe-to-repeat mutations, the client MUST use idempotency or status reconciliation before repeating.

The UI SHOULD communicate uncertainty where applicable.

---

## 2.50 UI request races

Client applications MUST assume network responses can arrive out of order.

Example:

```text
search "a" starts
search "ab" starts
"ab" finishes
"a" finishes later
```

The stale `"a"` response MUST NOT replace the current `"ab"` results.

---

## 2.51 Cancel stale requests

Clients SHOULD cancel superseded requests when the platform/API supports cancellation.

Cancellation reduces wasted work.

Cancellation alone MUST NOT be the sole correctness mechanism because:

- the request may already have reached the server;
- cancellation may race with completion;
- a server-side mutation may already have committed.

State reconciliation MUST still reject stale results.

---

## 2.52 Request identity

Client state SHOULD associate asynchronous results with the request or query state that produced them.

A response MUST only update state if it remains applicable.

Suitable mechanisms include:

- query keys;
- request IDs;
- mutation IDs;
- sequence counters;
- framework-managed server-state identity.

---

## 2.53 Last response is not necessarily correct

The UI MUST NOT assume:

```text
last response to arrive = latest user intent
```

Correctness is determined by logical request identity.

---

## 2.54 Route race conditions

When users navigate rapidly:

```text
A → B → C
```

a late response for A or B MUST NOT replace C.

Route loaders and client state MUST cancel, ignore, or scope stale results.

---

## 2.55 Optimistic UI

Optimistic UI MAY be used when:

- success probability is high;
- rollback is understandable;
- side effects are limited;
- the operation has a reliable authoritative reconciliation path.

Optimistic UI MUST NOT imply that the server has committed if it has not.

---

## 2.56 Optimistic mutation state

An optimistic item SHOULD be distinguishable internally as:

```text
pending
```

until authoritative confirmation.

The application MUST reconcile:

- generated IDs;
- server normalization;
- timestamps;
- version tokens;
- rejected mutations.

---

## 2.57 Optimistic rollback

If an optimistic mutation fails, the UI MUST either:

- rollback;
- mark the item failed;
- retain user work for retry.

It MUST NOT silently leave fictitious successful state.

---

## 2.58 Optimistic concurrency conflict

If an optimistic edit is rejected because the resource changed concurrently, the UI SHOULD preserve the user's unsaved edits.

Preferred:

```text
This record changed while you were editing.

Your edits are still available. Review the latest version
before saving again.

[Review changes]
```

---

## 2.59 Merge behavior

Automatic field-level merge MAY be used when:

- fields are independent;
- merge rules are deterministic;
- conflicting fields can be detected.

Automatic last-write-wins MUST NOT be used where it can silently discard meaningful concurrent work.

---

## 2.60 Last-write-wins

Last-write-wins MAY be acceptable for low-risk ephemeral preferences.

Examples:

```text
sidebar collapsed
sort preference
last selected view
```

It SHOULD NOT normally be used for:

- collaborative business records;
- financial fields;
- approvals;
- inventory;
- entitlement;
- policy content.

---

## 2.61 Conflict UX

A user-visible concurrency conflict SHOULD explain:

1. what happened;
2. whether the user's work is preserved;
3. what can be done next.

Avoid:

```text
409 Conflict
VersionMismatchException
OptimisticLockException
```

Preferred:

```text
This item was updated by someone else.

Review the latest version before saving your changes.
```

---

## 2.62 Conflict comparison

Where users must manually merge significant edits, the product SHOULD provide enough context to compare:

```text
your version
latest version
```

The interface MUST respect Security rules and MUST NOT expose protected editor identity or content without authorization.

---

## 2.63 Conflict dialog

An `AlertDialog` SHOULD NOT be used merely to announce that a conflict occurred.

Use an in-flow `Alert`, conflict page, `Dialog`, or comparison surface when users need to inspect state.

`AlertDialog` is appropriate when the user must make an immediate consequential choice such as intentionally overwriting a newer version. shadcn/ui defines AlertDialog as an interruptive modal requiring a response. citeturn385991search0

---

## 2.64 Force overwrite

"Overwrite anyway" SHOULD be rare.

It MUST:

- be explicitly authorized;
- communicate that newer changes may be lost;
- use the latest version token or deliberate bypass mechanism;
- create an audit event where domain risk warrants it.

A stale client MUST NOT accidentally force-write simply by retrying the old request.

---

## 2.65 Authorization and TOCTOU

Authorization that depends on mutable state MUST be checked at the point of mutation.

This is unsafe:

```text
check permission
...
time passes
...
perform privileged mutation without revalidation
```

if permission could change in between.

The mutation transaction or authoritative service MUST enforce current authorization.

---

## 2.66 Tenant boundaries under concurrency

Tenant identity MUST be included in all relevant:

- uniqueness constraints;
- lock scopes;
- idempotency scopes;
- message deduplication scopes;
- cache keys;
- queries.

A concurrency-control mechanism MUST NOT accidentally serialize or deduplicate unrelated tenants together unless intentionally global.

---

## 2.67 Distributed transaction boundary

A local database transaction cannot atomically roll back independent remote systems.

Code such as:

```text
BEGIN
update database
call payment service
publish message
COMMIT
```

MUST NOT be assumed to form one ACID transaction merely because the database transaction wraps the function.

Remote side effects require an explicit distributed consistency design.

---

## 2.68 Two-phase commit

True distributed transactions/two-phase commit MAY be used where all participants support the protocol and the operational trade-offs are justified.

They SHOULD NOT be the default microservice coordination strategy.

Teams MUST evaluate:

- participant availability;
- blocking/failure behavior;
- operational complexity;
- database support;
- coordinator failure;
- latency;
- recovery procedures.

---

## 2.69 Saga pattern

A saga MAY coordinate a business operation that spans independently committed services.

A saga consists of local transactions plus:

- subsequent steps;
- retries;
- compensations; or
- completion behavior.

Microsoft's current Saga guidance describes the pattern as a sequence of local transactions, with compensating transactions used when a later step fails. It also notes the lack of automatic isolation across services and the need to manage anomalies explicitly. citeturn308769search0

---

## 2.70 Saga is not rollback

A compensating action is a new business operation.

It is not a database rollback.

Example:

```text
charge card
ship item
shipping fails
refund card
```

The refund is an externally observable new transaction.

The system MUST NOT assume compensation restores every observable effect to a state indistinguishable from "nothing happened."

---

## 2.71 Compensation semantics

Every compensable saga step SHOULD define:

```text
forward action
compensation action
retry behavior
idempotency key
irreversibility point
```

Compensation MUST itself be idempotent or safely deduplicated.

---

## 2.72 Irreversible steps

A saga MUST identify steps that cannot reliably be reversed.

Examples:

- physical shipment;
- irreversible third-party submission;
- external notification already read;
- legally committed filing.

Irreversible steps SHOULD occur only after necessary compensable prerequisites have succeeded where business sequencing permits.

---

## 2.73 Saga pivot

Long-running distributed workflows SHOULD identify their commitment/pivot point.

Before the pivot, failure may lead to compensation.

After the pivot, failure may instead require persistent retry until completion.

Microsoft's Saga guidance explicitly distinguishes compensable, pivot, and retryable transactions. citeturn308769search0

---

## 2.74 Orchestration versus choreography

Sagas MAY use:

- orchestration — one coordinator manages state transitions; or
- choreography — participants react to events.

Orchestration SHOULD be preferred when:

- workflow is complex;
- state visibility is important;
- branching and compensation are substantial.

Choreography MAY suit small loosely coupled flows.

Large event chains MUST NOT become an implicit unobservable workflow with no authoritative state.

---

## 2.75 Saga state

A nontrivial saga SHOULD persist explicit workflow state.

Example:

```text
pending_payment
payment_complete
inventory_reserved
shipment_requested
compensating
completed
failed
manual_intervention
```

The current state MUST be reconstructable after process restart.

---

## 2.76 Saga isolation

Sagas do not automatically provide database-style isolation across services.

Other workflows may observe intermediate states.

AWS and Microsoft guidance both note that saga-based workflows require explicit handling of eventual consistency, idempotency, and isolation anomalies. citeturn308769search3turn308769search0

Domain state SHOULD communicate when an entity is:

```text
pending
processing
reserved
compensating
```

rather than falsely presenting final completion.

---

## 2.77 Dual-write problem

A service MUST NOT rely on:

```text
1. commit database
2. publish event
```

as a reliable atomic sequence without a durability mechanism.

Failure after step 1 but before step 2 loses the event.

Likewise:

```text
1. publish event
2. commit database
```

can publish an event for a change that later rolls back.

This is the dual-write problem.

---

## 2.78 Transactional outbox

The transactional outbox SHOULD be the default pattern when a committed database change must reliably cause an event/message.

Within one transaction, write:

```text
business state
+
outbox record
```

Then an independent publisher forwards committed outbox rows to the broker.

AWS describes this pattern specifically as a way to resolve database/message dual writes by storing the business update and outbox event atomically. citeturn308769search1

---

## 2.79 Outbox event schema

An outbox record SHOULD include:

```text
event_id
event_type
aggregate_id
aggregate_version or sequence
tenant_id
payload
occurred_at
created_at
publishing state
```

Sensitive fields MUST follow Data and Security standards.

---

## 2.80 Outbox publisher

The outbox publisher MUST assume that delivery acknowledgement can fail after a broker has already accepted the message.

Therefore, the publisher MAY publish the same event more than once.

Consumers MUST tolerate duplicates.

AWS explicitly calls out duplicate delivery as a consideration of transactional outbox and recommends idempotent consumers. citeturn308769search1

---

## 2.81 Outbox row deletion

Published outbox records SHOULD NOT be deleted before the delivery policy has sufficient evidence of successful handoff.

Retention or archival SHOULD support operational diagnosis.

Unbounded outbox growth MUST be prevented through cleanup/partitioning policy.

---

## 2.82 Inbox pattern

Consumers SHOULD use an inbox/deduplication pattern when duplicate message delivery could repeat side effects.

The consumer SHOULD record:

```text
consumer identity
message/event ID
processing status
processed_at
```

in a transaction coordinated with its local state update where feasible.

---

## 2.83 Inbox transaction

A canonical consumer transaction is:

```text
BEGIN

if event already processed:
    return success

apply local state change
record inbox event as processed

COMMIT
```

This ensures that a crash after committing local effects does not cause a retry to apply those effects again.

---

## 2.84 Exactly-once claims

Systems SHOULD avoid claiming end-to-end "exactly once" unless the precise semantics and boundary are proven.

A broker's exactly-once feature does not automatically make:

- external HTTP calls;
- email sends;
- database writes;
- third-party effects

exactly once.

Application correctness SHOULD assume duplicate delivery and use idempotency/deduplication where side effects matter.

---

## 2.85 At-least-once delivery

Queue consumers SHOULD generally be designed under an at-least-once delivery assumption unless the infrastructure contract demonstrably provides stronger semantics across the required boundary.

Duplicate messages MUST NOT corrupt local invariants.

AWS's messaging guidance likewise notes that message duplication can occur and consumers must be idempotent where the broker may redeliver. citeturn308769search5

---

## 2.86 Message acknowledgement

A worker MUST acknowledge a message only after the required durable local effect has succeeded.

Acknowledging before persistence risks message loss.

Persisting then failing before acknowledgement can cause redelivery.

The latter MUST be safe through idempotency.

---

## 2.87 Message ordering

Ordering requirements MUST be explicit.

Systems MUST distinguish:

- no ordering needed;
- ordering per aggregate/entity;
- ordering per partition;
- global ordering.

Global ordering SHOULD NOT be introduced when entity-level ordering is sufficient.

---

## 2.88 Aggregate sequence

Events requiring per-entity order SHOULD carry a monotonically increasing aggregate version/sequence where practical.

Example:

```text
order_id = 123
sequence = 17
```

A consumer can then detect:

- duplicate;
- expected next event;
- gap;
- stale event.

---

## 2.89 Out-of-order events

Consumers MUST define behavior when an older event arrives after a newer one.

They MAY:

- ignore stale version;
- buffer until gap resolved;
- fetch authoritative state;
- retry;
- dead-letter.

Blind last-arrival-wins processing SHOULD NOT be used for versioned state.

---

## 2.90 Event payload style

Events MAY carry:

- complete state;
- changed fields;
- domain facts;
- identifiers requiring fetch.

The choice MUST consider concurrency and ordering.

A consumer that fetches "current state" after receiving an older event MAY observe newer state; this may be correct or incorrect depending on the event contract.

The contract MUST be explicit.

---

## 2.91 Job idempotency

Background jobs MUST assume they may execute more than once when:

- acknowledgement is uncertain;
- workers crash;
- leases expire;
- retries occur;
- schedulers redeliver.

Jobs with side effects MUST therefore be idempotent or deduplicated.

---

## 2.92 Job identity

Jobs SHOULD have a stable execution/logical operation ID.

Retries of the same logical job SHOULD retain that identity.

A newly scheduled independent occurrence MUST receive a new logical identity.

---

## 2.93 Worker claim

Multiple workers MUST claim work atomically.

Unsafe:

```text
SELECT next pending job
UPDATE it to running
```

as two unprotected operations.

Use:

- atomic status update;
- row locking;
- `SKIP LOCKED` queue allocation;
- broker lease semantics;
- equivalent atomic claim.

---

## 2.94 Job lease expiry

If workers use leases, expiry MUST be designed for:

```text
worker crashes
slow execution
clock behavior
renewal race
duplicate execution
```

A recovered job MAY overlap briefly with the original worker.

The work itself MUST remain safe under that possibility.

---

## 2.95 Retry policy

Retries SHOULD be limited to transient failures.

A retry policy MUST define:

```text
retryable errors
maximum attempts
backoff
jitter
maximum duration
dead-letter/manual intervention behavior
```

Validation, authorization, and deterministic business-rule failures SHOULD NOT be repeatedly retried.

---

## 2.96 Retry amplification

Nested retries can multiply traffic.

Example:

```text
HTTP client retries 3×
service retries DB 3×
queue retries job 5×
```

can produce large amplification.

Retry ownership SHOULD be defined per boundary.

Services SHOULD expose enough error classification for callers to make correct retry decisions.

---

## 2.97 Backoff and jitter

Transient retries SHOULD use bounded exponential backoff with jitter when contention or shared dependency recovery is involved.

Immediate tight retry loops MUST NOT be used for:

- serialization conflicts;
- deadlocks;
- rate limits;
- transient dependency outages.

---

## 2.98 Dead-letter queues

Messages that exceed retry policy SHOULD enter a defined terminal or quarantine path.

A DLQ MUST NOT become an unmonitored graveyard.

Operations SHOULD expose:

```text
message count
age
failure reason
original operation
replay status
```

---

## 2.99 Replay

Message/job replay MUST be treated as a normal concurrency event.

Consumers MUST remain idempotent under replay.

Replay tooling SHOULD support scoped selection.

Bulk replay MUST include rate controls to avoid overwhelming downstream systems.

---

## 2.100 Eventual consistency

Eventual consistency MUST be part of the product contract where users can observe it.

The UI MUST NOT claim that a cross-service operation is complete merely because the initiating local transaction committed.

Use states such as:

```text
Saving…
Processing…
Pending synchronization
Payment confirmed; fulfilment pending
```

when appropriate.

---

## 2.101 Completion semantics

The product MUST define what "completed" means.

For a distributed workflow:

```text
order saved
```

may differ from:

```text
payment confirmed
```

which may differ from:

```text
order fully processed
```

State labels MUST map to real consistency milestones.

---

## 2.102 Read-your-writes UX

After a successful user mutation, the product SHOULD avoid immediately presenting an older replica/cache view that appears to undo the change.

Options include:

- optimistic cache update;
- write-through authoritative read;
- sticky primary/read-after-write routing;
- local reconciliation;
- version-aware polling.

The system SHOULD maintain read-your-writes behavior where users reasonably expect it.

---

## 2.103 Replica lag

Applications reading from asynchronous replicas MUST account for replication lag.

A successful write followed by a replica read MAY return stale state.

Critical post-write reads SHOULD use a source capable of satisfying the required consistency guarantee.

---

## 2.104 Cache invalidation

Caches MUST participate in the consistency model.

A transaction commit does not automatically invalidate:

- application cache;
- CDN;
- browser cache;
- search index;
- materialized view;
- replica.

The architecture MUST identify how and when derived views converge.

---

## 2.105 Derived state freshness

Derived views SHOULD expose freshness where stale data materially affects decisions.

Example:

```text
Last updated 10:42 AM
```

A user MUST NOT be invited to make an irreversible decision from known-stale data without suitable warning or refresh.

---

## 2.106 Pending state

Records participating in a distributed operation SHOULD have an explicit intermediate state instead of pretending atomic completion.

Example:

```text
pending
confirmed
failed
compensating
cancelled
```

Intermediate states SHOULD be valid business states, not hidden implementation accidents.

---

## 2.107 Pending UI

Pending state SHOULD use canonical shadcn/ui primitives such as:

- `Badge`;
- `Spinner`;
- `Progress`;
- `Alert`.

shadcn/ui currently provides Badge, Spinner, Progress, AlertDialog, Table, and Data Table primitives suitable for state and administrative concurrency UX. citeturn385991search2turn385991search3turn385991search7turn385991search5

---

## 2.108 Status accessibility

Pending, conflict, retry, and failure states MUST follow the Accessibility and States Catalogue standards.

Dynamic changes SHOULD be announced through appropriate polite status messaging without stealing focus.

A rapidly retrying job MUST NOT announce every internal retry to assistive technology.

---

## 2.109 Eventual consistency copy

Preferred:

```text
Your changes are saved.
Updating reporting data…
```

Preferred:

```text
Payment received.
We're preparing the order.
```

Avoid:

```text
Success
```

when important downstream work is still pending.

---

## 2.110 User-triggered refresh

Where convergence delay can be meaningful, the UI MAY expose:

```text
Refresh
Check status
```

A refresh action SHOULD query authoritative/current enough state.

Repeated manual refresh MUST NOT cause duplicate mutations.

---

## 2.111 Forms and stale edits

Edit forms SHOULD load a concurrency token with the record.

That token MUST be submitted with the mutation when optimistic locking applies.

A client-side form MUST NOT discard the token during state transformation.

---

## 2.112 Form conflict preservation

When a form submit conflicts, entered user values MUST remain available unless prohibited for security.

The user SHOULD NOT be forced to retype substantial work because another user edited the record first.

---

## 2.113 Field-level merge

For structured forms, the product MAY detect which fields changed server-side versus client-side.

Non-overlapping changes MAY be merged automatically.

Overlapping changes SHOULD require explicit resolution when data loss matters.

---

## 2.114 Bulk operations

Bulk actions MUST define partial-failure semantics.

Possible contracts include:

```text
all-or-nothing transaction
per-item independent result
batch saga
```

The UI MUST NOT say "All updated" when only some items succeeded.

---

## 2.115 Bulk transaction size

Large bulk updates SHOULD NOT necessarily run as one massive transaction.

Teams MUST balance:

- atomicity requirement;
- lock duration;
- transaction log growth;
- timeout risk;
- retry cost.

If all-or-nothing semantics are not required, chunked independent transactions MAY be preferable.

---

## 2.116 Batch idempotency

Bulk APIs SHOULD distinguish:

```text
idempotency of entire batch
```

from:

```text
idempotency of individual item operations
```

A retry after partial processing MUST NOT unknowingly duplicate successful items.

---

## 2.117 API conflict contract

Concurrency errors SHOULD have machine-readable error codes.

Example:

```json
{
  "code": "RESOURCE_VERSION_CONFLICT",
  "message": "This record changed since it was loaded.",
  "currentVersion": 18
}
```

Safe conflict metadata MAY be provided.

Raw database errors MUST NOT be exposed.

---

## 2.118 API retry metadata

Retryable responses SHOULD provide useful machine semantics where applicable.

Examples:

```text
Retry-After
retryable: true
```

or a canonical error code.

Clients SHOULD NOT infer retryability merely from free-text messages.

---

## 2.119 Mutation request ID

Important writes SHOULD have a correlation/request ID independent of the idempotency key.

The correlation ID helps trace one transport attempt.

The idempotency key identifies one logical operation across attempts.

They MUST NOT be conflated.

---

## 2.120 Audit events

High-risk concurrent mutations SHOULD record sufficient audit data to reconstruct:

```text
actor
resource
previous version
new version
logical operation ID
request ID
timestamp
result
```

Audit logs MUST NOT be the mechanism that enforces the invariant.

---

## 2.121 Metrics

Concurrency-sensitive systems SHOULD monitor:

```text
serialization failure rate
deadlock rate
lock wait time
transaction duration
optimistic conflict rate
idempotency duplicate rate
outbox backlog
inbox duplicate rate
queue retry rate
DLQ depth
saga compensation rate
saga age
replica lag
```

Metrics SHOULD be segmented by operation where useful.

---

## 2.122 Lock observability

Production systems SHOULD be able to diagnose:

- current lock waits;
- long transactions;
- deadlocks;
- blocked sessions;
- lock holder;
- affected operation.

Long-held locks SHOULD be alertable when they threaten availability.

---

## 2.123 Transaction duration

Transaction duration SHOULD be measured.

Long-running transactions SHOULD be investigated because they may:

- retain old snapshots;
- hold locks;
- delay cleanup;
- enlarge deadlock windows;
- increase rollback cost.

---

## 2.124 Conflict-rate signal

A high optimistic-lock conflict rate may indicate that a low-contention design assumption is false.

The system SHOULD consider:

- finer-grained resources;
- merge support;
- pessimistic locking;
- command-based updates;
- workflow redesign.

The UI SHOULD NOT simply force users through repeated conflict dialogs indefinitely.

---

## 2.125 Concurrency test strategy

Concurrency correctness MUST be tested using overlapping execution.

Sequential unit tests are insufficient.

A concurrency test SHOULD intentionally coordinate operations so the contested window occurs.

---

## 2.126 Barrier-based tests

Tests SHOULD use barriers/latches to force deterministic interleaving.

Example:

```text
T1 reads
T2 reads
release both
T1 writes
T2 writes
```

This is preferable to hoping two threads randomly collide.

---

## 2.127 Lost-update tests

Any editable shared resource SHOULD have a test that:

1. loads version N twice;
2. updates one copy;
3. attempts to save the stale second copy;
4. verifies the stale update cannot silently overwrite the first.

---

## 2.128 Inventory concurrency test

Inventory tests SHOULD launch enough concurrent reservations to exceed available stock.

The test MUST prove:

```text
successful reservations <= available quantity
final inventory >= 0
```

under concurrent execution.

---

## 2.129 Unique-resource test

For a unique resource, concurrent creation attempts MUST prove that at most one authoritative allocation succeeds.

The database constraint SHOULD be part of the test, not mocked away.

---

## 2.130 Serializable retry test

Serializable code SHOULD have tests proving:

- serialization failure is retried;
- entire transaction reruns;
- retry is bounded;
- external side effects are not duplicated.

---

## 2.131 Deadlock test

Where complex lock acquisition exists, tests SHOULD intentionally create representative deadlock patterns or verify deterministic lock ordering.

Recovery behavior MUST be tested.

---

## 2.132 Idempotency test

Idempotent endpoints MUST test:

```text
same key + same payload
same key concurrently
same key + different payload
retry after timeout
retry after completed request
new key + same payload
expired key
```

Only the intended cases should produce duplicate business effects.

---

## 2.133 Queue duplicate test

Consumers MUST be tested by delivering the same message more than once.

The final authoritative state MUST remain correct.

---

## 2.134 Consumer crash test

A consumer SHOULD be tested for a crash:

```text
after state write
before broker acknowledgement
```

Redelivery MUST NOT duplicate the committed effect.

This is a core inbox/idempotency scenario.

---

## 2.135 Outbox failure tests

Outbox systems SHOULD test:

```text
transaction rollback
publisher crash before publish
publisher crash after publish but before marking sent
broker temporary failure
duplicate publish
```

The business event MUST eventually be delivered without corrupting consumer state.

---

## 2.136 Saga failure matrix

Every material saga SHOULD test failure at every step.

For each step, verify:

```text
retry
compensation
terminal state
manual intervention path
```

as applicable.

A saga tested only on the happy path is incomplete.

---

## 2.137 Compensation failure

Tests MUST include compensation failure where compensation is part of the design.

The system MUST have a durable state such as:

```text
compensation_failed
manual_intervention
```

rather than losing the workflow.

---

## 2.138 Ordering tests

Ordered consumers SHOULD test:

```text
1, 2, 3
1, 3, 2
2 before 1
duplicate 2
missing 2
```

Behavior MUST match the event ordering contract.

---

## 2.139 UI race tests

Client tests SHOULD cover:

```text
old search completes after new search
old route request completes after navigation
mutation response arrives after refetch
double submit
optimistic rollback
conflict after optimistic edit
```

Stale results MUST NOT replace current state.

---

## 2.140 Load and contention testing

High-contention features SHOULD be tested under realistic concurrent load.

Tests SHOULD measure:

- throughput;
- p95/p99 latency;
- lock waits;
- conflict rate;
- retry rate;
- deadlocks.

A design that is logically correct but collapses under expected contention is incomplete.

---

## 2.141 Property/invariant testing

Concurrency tests SHOULD verify invariants rather than only expected individual responses.

Examples:

```text
stock never negative

total money conserved

at most one active owner

every committed domain event has an outbox row

every processed inbox message changes state at most once
```

Invariant-based testing often detects interleavings that example assertions miss.

---

## 2.142 Fault injection

Distributed workflows SHOULD use controlled fault injection where practical.

Inject failures such as:

- timeout;
- broker unavailable;
- worker crash;
- duplicate delivery;
- delayed delivery;
- reordered event;
- database failover;
- dependency retry.

Correctness MUST be evaluated after recovery, not only during ideal operation.

---

## 2.143 Production replay tests

Replay mechanisms SHOULD be tested in non-production environments using production-like event history where privacy permits.

Replay MUST NOT depend on transient fields that cannot be reproduced.

---

## 2.144 shadcn/ui component baseline

Concurrency and consistency UX SHOULD build on canonical shadcn/ui primitives:

| UX need | shadcn/ui baseline |
|---|---|
| Version conflict | `Alert`, `Dialog` |
| Dangerous overwrite choice | `AlertDialog` |
| Pending synchronization | `Badge`, `Spinner` |
| Long-running workflow | `Progress` |
| Retry action | `Button` |
| Background-job table | `Table`, `Data Table` |
| Conflict comparison | `Dialog`, `Sheet`, `ScrollArea` |
| Processing state | `Skeleton`, `Spinner` |
| Partial/degraded state | `Alert` |
| Empty job/conflict list | `Empty` |
| Job/state status | `Badge` |

Component styling MUST use Design Tokens rather than feature-specific concurrency colors. citeturn385991search5

---

# 3. Anti-patterns

## 3.1 Check then insert without constraint

**Anti-pattern:**

```text
SELECT whether username exists
if not:
  INSERT
```

**Rule:** Business uniqueness MUST be enforced atomically, normally by a database constraint.

---

## 3.2 Read-modify-write counter

**Anti-pattern:**

```text
count = SELECT count
count++
UPDATE count
```

**Rule:** Counters MUST use atomic mutation or equivalent concurrency protection.

---

## 3.3 Inventory check outside update

**Anti-pattern:**

```text
if stock >= 1:
    stock = stock - 1
```

across separate unprotected statements.

**Rule:** Check and decrement MUST form one protected atomic operation.

---

## 3.4 UI disabling as concurrency control

**Anti-pattern:** Submit is disabled, therefore duplicates are considered impossible.

**Rule:** Client UX MAY reduce duplicates; authoritative server controls MUST handle them.

---

## 3.5 Last-write-wins everywhere

**Anti-pattern:** Concurrent edits silently overwrite each other.

**Rule:** Shared consequential records SHOULD use optimistic concurrency or stronger protection.

---

## 3.6 `updated_at` as unreliable lock token

**Anti-pattern:** Millisecond timestamp is assumed to uniquely identify every resource revision without guaranteeing precision or update semantics.

**Rule:** Use a reliable version token.

---

## 3.7 Locking everything

**Anti-pattern:** Table locks are used whenever concurrency is possible.

**Rule:** Use the smallest mechanism that protects the invariant.

---

## 3.8 Transaction around an HTTP call

**Anti-pattern:**

```text
BEGIN
UPDATE row
call remote service
COMMIT
```

**Rule:** Local transactions SHOULD NOT remain open across remote calls.

---

## 3.9 Transaction too large

**Anti-pattern:** Thousands of independent records are updated in one transaction merely because "atomic is safer."

**Rule:** Transaction scope MUST follow required atomicity, not convenience.

---

## 3.10 Lock without timeout

**Anti-pattern:** A web request can wait indefinitely for a row lock.

**Rule:** Contention waiting MUST be bounded operationally.

---

## 3.11 Inconsistent lock ordering

**Anti-pattern:** Different code paths acquire the same locks in different orders.

**Rule:** Multi-resource locking SHOULD use deterministic order.

---

## 3.12 Serialization failure treated as 500 only

**Anti-pattern:** Serializable conflict is logged as unexplained server failure with no retry.

**Rule:** Expected serialization conflicts SHOULD use bounded full-transaction retry.

---

## 3.13 Retry only final statement

**Anti-pattern:** A failed transaction replays only the final `UPDATE`.

**Rule:** Transaction-level concurrency failure requires replaying the entire business transaction.

---

## 3.14 Infinite transaction retry

**Anti-pattern:** Serialization failures retry forever.

**Rule:** Retries MUST be bounded and observable.

---

## 3.15 New idempotency key per retry

**Anti-pattern:** Client regenerates the key after timeout.

**Rule:** Retries of one logical action MUST reuse the same key.

---

## 3.16 Same key, different operation

**Anti-pattern:** Server executes a materially different second request under an existing idempotency key.

**Rule:** Key and request identity MUST be bound.

---

## 3.17 Idempotency key without tenant scope

**Anti-pattern:** Two tenants using the same UUID collide.

**Rule:** Deduplication scope MUST include appropriate security/business identity.

---

## 3.18 Idempotency without atomicity

**Anti-pattern:** Business record commits but idempotency record is written later.

**Rule:** The deduplication state and local protected mutation MUST be consistently coordinated.

---

## 3.19 Timeout means failure

**Anti-pattern:** Client repeats a payment because it did not receive a response.

**Rule:** Ambiguous outcomes require idempotency or reconciliation.

---

## 3.20 Last network response wins

**Anti-pattern:** Old search response overwrites newer results because it arrived later.

**Rule:** Response applicability MUST follow logical request identity.

---

## 3.21 Optimistic UI without rollback

**Anti-pattern:** UI shows success immediately and leaves it indefinitely after rejection.

**Rule:** Optimistic state MUST reconcile with authority.

---

## 3.22 Generic conflict error

**Anti-pattern:**

```text
OptimisticLockingException
```

is shown to end users.

**Rule:** Conflict UX must explain the human consequence and preserve work.

---

## 3.23 Remote side effects inside retried transaction

**Anti-pattern:** Transaction auto-retry sends an email again on each attempt.

**Rule:** Retried transactions MUST NOT contain unsafe non-idempotent external effects.

---

## 3.24 Database + broker dual write

**Anti-pattern:**

```text
COMMIT database
publish message
```

without outbox/CDC or an equivalent durability mechanism.

**Rule:** Reliable cross-system publication MUST address the dual-write gap.

---

## 3.25 Publish before commit

**Anti-pattern:** Event announces a state change that subsequently rolls back.

**Rule:** Events representing committed local state MUST be transactionally tied to that state through an approved pattern.

---

## 3.26 Outbox consumer assumed exactly once

**Anti-pattern:** Publisher or consumer assumes an event can never be delivered twice.

**Rule:** Outbox downstream processing MUST tolerate duplicates.

---

## 3.27 Queue acknowledgement before commit

**Anti-pattern:** Message is acknowledged, then local database update fails.

**Rule:** Required durable effect MUST complete before acknowledgement.

---

## 3.28 Non-idempotent worker

**Anti-pattern:** Retried job charges, emails, or inserts again.

**Rule:** Side-effecting jobs MUST support safe retry.

---

## 3.29 Blind last-arrival-wins events

**Anti-pattern:** Event version 4 overwrites state already updated by version 5.

**Rule:** Ordered state changes MUST enforce version/order semantics.

---

## 3.30 Global ordering without need

**Anti-pattern:** Entire system serializes all events to guarantee order needed only within one order/customer.

**Rule:** Use the narrowest ordering scope required by the domain.

---

## 3.31 Saga treated as ACID transaction

**Anti-pattern:** Engineers assume intermediate states cannot be observed.

**Rule:** Sagas require explicit handling of partial progress and isolation anomalies.

---

## 3.32 Compensation treated as perfect rollback

**Anti-pattern:** Refund is assumed equivalent to the charge never occurring.

**Rule:** Compensation is a new business action with its own effects and failure modes.

---

## 3.33 Compensation not idempotent

**Anti-pattern:** Retrying cancellation issues several refunds.

**Rule:** Compensating operations MUST be safe under retries.

---

## 3.34 Invisible saga

**Anti-pattern:** A seven-service workflow exists only as undocumented event reactions.

**Rule:** Complex distributed workflows SHOULD have explicit state and observability.

---

## 3.35 "Exactly once" marketing assumption

**Anti-pattern:** Broker feature is assumed to guarantee exactly-once end-to-end external effects.

**Rule:** Exact guarantees MUST be proven at the actual business-effect boundary.

---

## 3.36 Replica read after write

**Anti-pattern:** User saves a record and immediately sees the old value from an asynchronously lagging replica.

**Rule:** Required read-your-writes behavior MUST be designed explicitly.

---

## 3.37 Eventual consistency hidden from UX

**Anti-pattern:** UI reports final completion while downstream state is still pending.

**Rule:** User-visible status MUST reflect actual workflow state.

---

## 3.38 Retry every error

**Anti-pattern:** Authorization, validation, and business conflicts are automatically retried.

**Rule:** Only transient/retryable failures SHOULD retry.

---

## 3.39 Nested uncontrolled retries

**Anti-pattern:** Every layer independently retries several times.

**Rule:** Retry ownership and budgets MUST be coordinated.

---

## 3.40 DLQ without ownership

**Anti-pattern:** Failed messages accumulate indefinitely without alerts or replay process.

**Rule:** Dead-letter states MUST be observable and operationally owned.

---

## 3.41 Concurrency testing with sleeps only

**Anti-pattern:** Tests hope two requests collide based on timing.

**Rule:** Use deterministic barriers/interleavings where feasible.

---

## 3.42 Sequential tests declared concurrency-safe

**Anti-pattern:** One successful create/update test is treated as proof against races.

**Rule:** Concurrent overlap MUST be explicitly tested.

---

## 3.43 Mocking away database constraints

**Anti-pattern:** Unit tests validate concurrency behavior against an in-memory mock without real transaction/constraint semantics.

**Rule:** Critical concurrency behavior MUST be integration-tested against the real database technology or faithful equivalent.

---

# 4. Checklist

## 4.1 Invariants

- [ ] Business invariant is explicitly documented.
- [ ] Authoritative enforcement layer is identified.
- [ ] Database constraints are used where possible.
- [ ] Tenant scope is included where required.
- [ ] Failure behavior when the invariant conflicts is defined.

## 4.2 Transactions

- [ ] Transaction contains one required atomic unit.
- [ ] Transaction is as short as practical.
- [ ] Remote calls are outside local transaction where possible.
- [ ] Required state-dependent checks occur inside the protecting boundary.
- [ ] Exceptions cannot accidentally commit partial work.
- [ ] Transaction duration is observable.
- [ ] External effects are not duplicated by transaction retry.

## 4.3 Isolation

- [ ] Required isolation level is documented.
- [ ] Read Committed behavior is understood.
- [ ] Stable-snapshot requirements are identified.
- [ ] Write-skew risk is evaluated.
- [ ] Predicate/cross-row invariants have suitable protection.
- [ ] Serializable transactions have bounded full retry.
- [ ] Database-specific isolation semantics are documented.

## 4.4 Optimistic locking

- [ ] Shared editable resources have reliable version tokens where required.
- [ ] Version changes with relevant mutation.
- [ ] API accepts/checks the version or ETag.
- [ ] Stale writes cannot silently overwrite newer state.
- [ ] Conflict response is machine readable.
- [ ] User work remains available after conflict.
- [ ] Force overwrite requires deliberate authorization/UX.

## 4.5 Pessimistic locking

- [ ] Locked resource corresponds to the invariant.
- [ ] Row-level scope is used where sufficient.
- [ ] Locks are acquired in deterministic order.
- [ ] Lock duration is minimized.
- [ ] Lock waiting is bounded.
- [ ] Deadlock errors are handled.
- [ ] `SKIP LOCKED` is restricted to appropriate queue-like workloads.
- [ ] Advisory locks have documented key namespace.

## 4.6 Counters and inventory

- [ ] Counter update is atomic.
- [ ] Exact versus approximate counter semantics are documented.
- [ ] Inventory check and decrement are atomic.
- [ ] Non-negative inventory constraint exists where appropriate.
- [ ] Reservation state is explicit.
- [ ] Reservation expiry is idempotent.
- [ ] Unique resource allocation has authoritative constraint.

## 4.7 Idempotency

- [ ] Retryable high-consequence mutations have an idempotency strategy.
- [ ] Client reuses one key for retries of one logical operation.
- [ ] Key scope includes tenant/principal/operation as appropriate.
- [ ] Same key with different payload is rejected.
- [ ] In-progress duplicates do not execute twice.
- [ ] Completed duplicates return the original logical result where appropriate.
- [ ] Idempotency state is atomically coordinated with local mutation.
- [ ] Retention window is documented.
- [ ] Domain uniqueness does not incorrectly rely only on key retention.

## 4.8 UI races

- [ ] Stale search results cannot replace newer query state.
- [ ] Route responses cannot replace later navigation.
- [ ] Superseded requests are cancelled where useful.
- [ ] Correctness does not depend solely on cancellation.
- [ ] Double submit is handled server-side.
- [ ] Optimistic state reconciles with authoritative state.
- [ ] Failed optimistic updates rollback or visibly fail.

## 4.9 Forms and conflicts

- [ ] Form loads concurrency token.
- [ ] Form submits concurrency token.
- [ ] Concurrent edit produces controlled conflict.
- [ ] User-entered values survive conflict.
- [ ] Merge strategy is defined.
- [ ] Last-write-wins is only used where acceptable.
- [ ] Conflict copy is user-facing rather than technical.

## 4.10 Distributed workflows

- [ ] Local and remote transactional boundaries are explicit.
- [ ] Cross-service flow does not pretend to be one local ACID transaction.
- [ ] Saga is used only where appropriate.
- [ ] Every saga step has failure behavior.
- [ ] Compensable actions have compensation.
- [ ] Compensation is idempotent.
- [ ] Irreversible/pivot point is identified.
- [ ] Workflow state persists across process restart.
- [ ] Intermediate states are valid and observable.

## 4.11 Outbox

- [ ] Business write and outbox insert share one local transaction.
- [ ] Event has stable ID.
- [ ] Tenant/aggregate identity is included.
- [ ] Ordering metadata exists where required.
- [ ] Publisher tolerates retry.
- [ ] Consumers tolerate duplicate publication.
- [ ] Outbox backlog is monitored.
- [ ] Cleanup/retention is defined.

## 4.12 Inbox and consumers

- [ ] Consumer identifies message uniquely.
- [ ] Duplicate processing is detected.
- [ ] Inbox record and local side effect are transactionally coordinated where possible.
- [ ] Message is acknowledged only after durable effect.
- [ ] Crash after commit/before acknowledgement is safe.
- [ ] Duplicate delivery tests exist.

## 4.13 Ordering

- [ ] Ordering scope is explicitly defined.
- [ ] Global ordering is avoided unless required.
- [ ] Per-aggregate sequence exists where appropriate.
- [ ] Duplicate event behavior is defined.
- [ ] Stale event behavior is defined.
- [ ] Gap behavior is defined.
- [ ] Out-of-order tests exist.

## 4.14 Jobs and queues

- [ ] Jobs are safe under redelivery.
- [ ] Logical job ID survives retry.
- [ ] Worker claim is atomic.
- [ ] Lease-expiry races are handled.
- [ ] Retryable errors are classified.
- [ ] Retry count/backoff/jitter are bounded.
- [ ] Nested retry amplification is controlled.
- [ ] DLQ is monitored.
- [ ] Replay is safe and rate controlled.

## 4.15 Eventual consistency UX

- [ ] User-visible state distinguishes pending from complete.
- [ ] Completion definition is explicit.
- [ ] Read-your-writes behavior is designed.
- [ ] Replica lag cannot visibly undo recent changes where prohibited.
- [ ] Stale derived data is identified where material.
- [ ] Refresh/status action exists where useful.
- [ ] Pending status is accessible.
- [ ] Final success is not announced prematurely.

## 4.16 Security

- [ ] Authorization is enforced at mutation time.
- [ ] TOCTOU permission races are considered.
- [ ] Idempotency is tenant scoped.
- [ ] Locks cannot cross tenant boundaries unintentionally.
- [ ] Retry cannot repeat unauthorized side effects.
- [ ] Sensitive conflict details are not leaked.
- [ ] Audit identifies actor and operation.
- [ ] Replays cannot bypass current authorization policy where reauthorization is required.

## 4.17 API

- [ ] Concurrency conflict has structured error code.
- [ ] Conditional update contract is documented.
- [ ] Idempotency key contract is documented.
- [ ] Request ID and idempotency key are separate.
- [ ] Retryability is machine readable where appropriate.
- [ ] Timeout behavior acknowledges uncertain outcomes.
- [ ] Bulk operation partial-success semantics are explicit.

## 4.18 State management

- [ ] Server state remains authoritative.
- [ ] Mutation IDs/query keys prevent stale response overwrite.
- [ ] Optimistic mutations have rollback/reconciliation.
- [ ] Cache invalidation follows committed state.
- [ ] Query refetch does not overwrite newer optimistic/versioned state incorrectly.
- [ ] Tenant switching clears or re-scopes concurrency-sensitive cache.

## 4.19 Accessibility and components

- [ ] Pending state is communicated textually.
- [ ] Conflict meaning does not rely on color.
- [ ] Dynamic status announcements do not steal focus.
- [ ] Retry controls have clear accessible labels.
- [ ] Overwrite confirmations explain consequences.
- [ ] shadcn/ui primitives or canonical wrappers are used.
- [ ] Status variants use Design Tokens.

## 4.20 Testing

- [ ] Concurrency tests overlap operations deliberately.
- [ ] Barrier/latch tests exist for critical races.
- [ ] Lost-update tests exist.
- [ ] Inventory oversubscription tests exist where relevant.
- [ ] Unique-allocation race tests exist.
- [ ] Serializable retry tests exist.
- [ ] Deadlock behavior is tested where relevant.
- [ ] Idempotency concurrent duplicate tests exist.
- [ ] Message duplicate/redelivery tests exist.
- [ ] Outbox crash-window tests exist.
- [ ] Saga failure is tested at every step.
- [ ] Compensation failure is tested.
- [ ] Ordering/reordering tests exist.
- [ ] UI stale-response tests exist.
- [ ] Load/contention testing matches expected traffic.
- [ ] Invariants are asserted after concurrency tests.

## 4.21 Observability

- [ ] Transaction latency is monitored.
- [ ] Lock wait is monitored.
- [ ] Deadlocks are monitored.
- [ ] Serialization retries are monitored.
- [ ] Optimistic conflicts are monitored.
- [ ] Idempotency duplicates are measured.
- [ ] Outbox lag is monitored.
- [ ] Queue retries/DLQ are monitored.
- [ ] Saga age/compensation is monitored.
- [ ] Replica lag is monitored.
- [ ] Alerts identify affected operation/resource class.

---

# 5. Canonical summary

The following rules define the Gold Standard 2026 baseline.

1. **Concurrency design MUST begin with the business invariant.** A mechanism is correct only if it protects the actual invariant.

2. **Database constraints SHOULD enforce structural integrity whenever possible.** Application checks improve UX but MUST NOT replace authoritative constraints.

3. **Transactions MUST contain the smallest complete unit requiring atomicity.**

4. **Transactions SHOULD NOT span remote calls, user interaction, or other slow external effects.**

5. **State-dependent correctness checks MUST occur inside the consistency boundary that protects the subsequent mutation.**

6. **Isolation level MUST be selected deliberately.** Database defaults MUST NOT be treated as universal correctness guarantees.

7. **Read Committed is suitable only when statement-level snapshots plus atomic mutations/constraints satisfy the invariant.**

8. **Repeatable Read provides stable snapshots but MUST NOT automatically be assumed to protect all cross-row business invariants.**

9. **Write-skew and predicate invariants require explicit protection such as Serializable isolation, locking, or suitable constraints.**

10. **Serializable failures are expected concurrency outcomes.** Serializable operations MUST support bounded retry of the entire transaction.

11. **External non-idempotent side effects MUST NOT occur inside a transaction that may automatically retry.**

12. **Pessimistic locks MUST protect the right resource, remain short, and be acquired in deterministic order.**

13. **Deadlocks MUST be considered normal possible outcomes of explicit locking and handled safely.**

14. **`SKIP LOCKED` SHOULD be reserved for queue-like allocation rather than ordinary consistency-sensitive reads.**

15. **Optimistic concurrency SHOULD be the default for ordinary collaborative CRUD with low-to-moderate contention.**

16. **Shared mutable resources SHOULD expose reliable version tokens or ETags.**

17. **Stale writes MUST NOT silently overwrite newer changes when lost updates matter.**

18. **Conflict UX MUST preserve user work and clearly explain recovery.**

19. **Atomic arithmetic MUST replace read-modify-write for counters and similar values.**

20. **Inventory availability checks and decrements MUST occur atomically.**

21. **Scarce unique resource allocation SHOULD be backed by an authoritative uniqueness/exclusion constraint.**

22. **Client button disabling is UX, not concurrency control.**

23. **High-consequence retryable mutations MUST have an idempotency strategy.**

24. **Retries of the same logical operation MUST reuse the same idempotency key.**

25. **Idempotency keys MUST be scoped and bound to the intended request.**

26. **The idempotency record and protected local mutation MUST be coordinated so one cannot commit safely without the other.**

27. **A network timeout MUST NOT be interpreted as proof that a mutation failed.**

28. **Client applications MUST reject stale asynchronous responses.** Last response to arrive is not necessarily the response for the latest user intent.

29. **Cancellation SHOULD reduce obsolete client work but MUST NOT be considered a server-side rollback mechanism.**

30. **Optimistic UI MUST remain reconcilable with authoritative server state and MUST provide rollback or visible failure.**

31. **Authorization depending on mutable state MUST be enforced at the point of mutation to avoid time-of-check/time-of-use races.**

32. **A local database transaction cannot provide ACID rollback across independent external systems.**

33. **Distributed workflows MUST use an explicit consistency model such as saga, durable orchestration, or another approved mechanism.**

34. **A saga is a sequence of committed business operations, not one large rollback-capable database transaction.**

35. **Compensation is a new business operation and MUST have its own idempotency and failure handling.**

36. **Complex sagas SHOULD persist explicit workflow state and identify compensable, pivot, retryable, and manual-intervention states.**

37. **Database write + message publish MUST address the dual-write problem.**

38. **Transactional outbox SHOULD be the default when committed local state must reliably produce an event.**

39. **Outbox publication MUST assume duplicate delivery is possible.**

40. **Message consumers MUST be idempotent or use equivalent inbox/deduplication control when duplicate side effects matter.**

41. **Queue acknowledgement MUST occur only after the required durable effect succeeds.**

42. **End-to-end exactly-once behavior MUST NOT be assumed merely because one infrastructure component advertises exactly-once delivery.**

43. **Message ordering requirements MUST be explicit and scoped as narrowly as possible.**

44. **Versioned event streams SHOULD reject or reconcile stale and out-of-order events rather than apply last-arrival-wins blindly.**

45. **Background jobs MUST be safe under retry, redelivery, worker crash, and lease expiry.**

46. **Retry policy MUST distinguish transient failures from validation, authorization, and permanent business failures.**

47. **Retry attempts MUST be bounded and SHOULD use backoff/jitter where shared contention or outages are involved.**

48. **Nested retry policies MUST be coordinated to prevent retry amplification.**

49. **Dead-letter queues MUST have operational ownership, observability, and a safe replay path.**

50. **Eventual consistency MUST be reflected honestly in user-visible states.** Pending is not completed.

51. **User interfaces SHOULD preserve read-your-writes behavior where users reasonably expect their completed action to remain visible.**

52. **Replica lag, caches, indexes, and materialized views MUST be included in the consistency design rather than treated as invisible infrastructure.**

53. **Bulk APIs MUST explicitly define all-or-nothing versus per-item or distributed partial-success semantics.**

54. **Concurrency errors MUST use machine-readable API contracts and user-facing recovery copy rather than raw database exceptions.**

55. **Concurrency-sensitive systems MUST expose sufficient telemetry for locks, deadlocks, retries, conflicts, queues, outbox, sagas, and replica lag.**

56. **Sequential unit tests are insufficient proof of concurrency correctness.**

57. **Critical races MUST be tested with intentional overlapping execution, preferably deterministic barriers rather than arbitrary sleeps.**

58. **Concurrency tests SHOULD assert invariants after execution, not merely count successful HTTP responses.**

59. **Outbox, inbox, saga, and queue systems MUST be tested across crash windows, duplicate delivery, retries, reordering, and compensation failure.**

60. **shadcn/ui Alert, AlertDialog, Dialog, Badge, Spinner, Progress, Button, Table, Data Table, Sheet, ScrollArea, Skeleton, and Empty form the canonical component baseline for concurrency, workflow, conflict, and job-state UX.**

61. **The canonical rule is: protect invariants at the narrowest authoritative boundary, assume concurrency and retries will happen, make every distributed step recoverable, and never hide consistency uncertainty from either the system or the user.**

The most important architectural boundary is between **local atomicity** and **distributed convergence**. A transaction can make related rows atomic inside one datastore; once a workflow crosses independently committed systems, correctness comes from durable state, idempotency, outbox/inbox coordination, explicit intermediate states, and compensation—not from stretching the mental model of a database transaction across the network. citeturn308769search1turn308769search0
