---
id: "events-webhooks"
title: "Events & Webhooks"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["operations", "events", "webhooks"]
applies_to: ["api"]
related: []
legacy_number: 72
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 82862
provenance: baseline

---

Below is the canonical companion standard for asynchronous event contracts, broker delivery, webhooks, reliability, replay, and subscriber operations.

# Event & Webhook Guidelines — Gold Standard 2026

**Canonical placement:** `API → Events & Webhooks → Jobs & Queue → Security`  
**Status:** Gold Standard 2026  
**Applies to:** Domain events, integration events, event buses, message brokers, queues, pub/sub, outbound webhooks, inbound webhooks, CDC-derived events, transactional outbox relays, subscriber workers, replay/backfill systems, dead-letter queues, and event administration interfaces.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are used as requirements.

---

# 1. Purpose

## 1.1 Objective

Events and webhooks are asynchronous APIs.

They MUST therefore be designed with the same discipline applied to synchronous APIs:

```text
stable contracts
+ authentication
+ authorization
+ versioning
+ validation
+ reliability
+ observability
+ lifecycle management
```

An event communicates that something **has happened**.

A webhook is one delivery mechanism for communicating such an event to an HTTP endpoint.

A queue message may represent:

- an event;
- a command;
- a work item;
- a notification.

These concepts MUST NOT be conflated merely because they use the same broker.

The canonical flow is:

```text
Domain transaction
       ↓
Durable event record / Outbox
       ↓
Publisher / Relay
       ↓
Broker / Webhook delivery
       ↓
Subscriber ingress
       ↓
Idempotent processing
       ↓
Authoritative subscriber state
```

The governing principle is:

> **Producers guarantee durable event publication. Transports may deliver more than once. Consumers guarantee correct repeated processing.**

The default cross-service delivery assumption MUST be **at least once**.

Even when a particular broker offers stronger delivery guarantees, application logic MUST NOT assume that every downstream side effect is exactly once.

A message broker can deduplicate broker operations while a consumer can still:

- time out after committing a database write;
- send the same email twice;
- call an external API twice;
- publish the same downstream event twice.

Exactly-once claims MUST therefore state precisely what boundary they cover. For example, Google Pub/Sub's exactly-once capability has specific subscription and regional semantics, while its default subscription behavior remains at-least-once; Kafka's idempotent and transactional producers likewise provide specific broker/stream guarantees rather than universal exactly-once external side effects. citeturn238958search1turn238958search7turn826926search1

## 1.2 Core principles

Production event systems MUST follow these principles.

1. **Events describe facts.** Event types SHOULD represent completed occurrences rather than commands.
2. **Event contracts are APIs.** Names, schemas, semantics, compatibility, ownership, and deprecation MUST be governed.
3. **State and publication commit together.** Where a database state change produces an event, durable intent to publish MUST be committed atomically with the state change.
4. **Assume duplicate delivery.** Consumers MUST be idempotent.
5. **Delivery identity and event identity are different.** Retrying transport MUST NOT create a new logical occurrence.
6. **Ordering is scoped.** Global ordering MUST NOT be assumed unless explicitly provided and required.
7. **Retry only recoverable failures.** Permanent failures MUST NOT loop indefinitely.
8. **Dead letters require ownership.** A DLQ is an operational recovery mechanism, not a permanent dumping ground.
9. **Replays are controlled production writes.** Replays and backfills MUST be scoped, authorized, observable, and bounded.
10. **Webhook authenticity MUST be verified.** HTTPS alone does not prove that a request was sent by the expected webhook producer.
11. **Replay attacks MUST be considered separately from duplicate delivery.**
12. **Subscribers own their processing reliability.** Producers MUST NOT depend upon subscriber implementation details for correctness.
13. **Events are immutable.** A published event's historical meaning MUST NOT be retroactively changed.
14. **Minimize event payloads.** Event streams MUST NOT become uncontrolled copies of production databases or sensitive records.
15. **Operational health is subscriber-specific.** Backlog, latency, retries, DLQs, signature failures, and processing errors MUST be observable per subscription.

---

# 2. Rules

## 2.1 Event, command, and work-item semantics

The system MUST distinguish asynchronous message intent.

### Event

An event describes something that already occurred.

Examples:

```text
invoice.paid
customer.created
shipment.dispatched
subscription.cancelled
```

An event does not ask a subscriber for permission to make the historical occurrence true.

### Command

A command requests an action.

Examples:

```text
issueRefund
generateInvoice
sendNotification
```

Commands SHOULD identify the intended handler or bounded capability.

### Work item

A work item describes processing that should occur but is primarily an implementation concern.

Examples:

```text
resizeImage
rebuildSearchIndex
generateReport
```

A queue containing work items SHOULD NOT automatically be exposed as a public event contract.

### Semantic boundary

The message:

```text
invoice.pay
```

is ambiguous and SHOULD NOT be used.

Prefer:

```text
invoice.paid
```

for an event, or:

```text
payInvoice
```

for a command.

---

## 2.2 Event naming

Event names MUST describe stable business semantics.

The canonical pattern SHOULD be:

```text
<organization>.<domain>.<resource>.<event>[.v<major>]
```

For example:

```text
com.example.billing.invoice.paid.v1
com.example.identity.user.created.v1
com.example.shipping.package.dispatched.v1
```

Internal platforms MAY omit globally unique organization prefixes where the event namespace already provides equivalent uniqueness.

### Tense

Event names SHOULD normally use completed/past-tense facts:

```text
created
approved
rejected
paid
cancelled
dispatched
```

Avoid command-like names:

```text
create
approve
pay
cancel
```

### Meaningful names

Avoid vague types such as:

```text
entity.changed
data.updated
record.event
notification
```

unless the vague semantics are genuinely the contract.

Prefer events that explain what changed meaningfully:

```text
subscription.renewal_failed
invoice.payment_due
account.access_revoked
```

### Topic names

An event type MUST NOT be defined solely by the broker topic.

The same logical event MAY move between transport topics without changing its business meaning.

Conceptually:

```text
topic = transport organization
type  = contract meaning
```

---

## 2.3 Canonical event envelope

Cross-service events SHOULD use a **CloudEvents 1.0-compatible envelope** unless the platform has an approved equivalent standard.

CloudEvents defines a common vendor-neutral event model and requires:

```text
id
source
specversion
type
```

with optional attributes including `subject`, `time`, `datacontenttype`, and `dataschema`. It also defines `source + id` as the uniqueness boundary consumers may use to recognize duplicate events. citeturn136797search0turn136797search3

A canonical JSON event SHOULD resemble:

```text
{
  "specversion": "1.0",
  "id": "evt_...",
  "source": "https://events.example.com/billing",
  "type": "com.example.billing.invoice.paid.v1",
  "subject": "invoice/inv_123",
  "time": "2026-09-23T02:30:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://schemas.example.com/events/invoice-paid/v1",
  "data": {
    ...
  }
}
```

The platform MAY define standardized extensions for:

```text
correlation ID
causation ID
trace context
```

where required.

Extensions MUST have documented ownership and semantics.

---

## 2.4 Identifier semantics

The architecture MUST distinguish at least four identifier concepts.

### Event ID

Identifies the immutable logical event.

```text
event_id = occurrence identity
```

A transport retry MUST preserve the same event ID.

### Delivery ID

Identifies a transport delivery or delivery record.

```text
event
  ├── delivery attempt 1
  ├── delivery attempt 2
  └── delivery attempt 3
```

A webhook system MAY use one stable delivery ID across redelivery attempts or separate attempt IDs, but its semantics MUST be documented.

GitHub, for example, uses a delivery identifier to identify webhook deliveries and explicitly notes that a manual redelivery retains the original delivery identifier. citeturn238958search5

### Correlation and causation IDs

A correlation identifier connects related work across a workflow.

A causation identifier identifies the event/request that directly caused another event.

For example:

```text
request
  ↓
order.created
  ↓
payment.authorized
  ↓
shipment.requested
```

may share:

```text
correlation_id = workflow-123
```

while each event references its immediate predecessor through:

```text
causation_id
```

### Idempotency key

An idempotency key identifies a logical side-effect request that MUST NOT be applied more than once.

It is not automatically the same thing as:

```text
event ID
delivery ID
correlation ID
```

though event ID MAY form part of an idempotency key for subscriber processing.

---

## 2.5 Event timestamp semantics

Event timestamps MUST have defined meaning.

The canonical `time` field SHOULD represent when the underlying occurrence happened.

It MUST NOT be silently repurposed to mean:

```text
broker publish time
webhook attempt time
subscriber processing time
```

where those differ.

Platforms MAY separately record:

```text
occurred_at
recorded_at
published_at
delivered_at
processed_at
```

where those timestamps are operationally important.

All machine timestamps SHOULD use UTC and RFC 3339-compatible representation unless another established platform format applies.

Ordering MUST NOT be inferred solely from wall-clock timestamp.

Clock skew, concurrent operations, and delayed publication make timestamps insufficient for strict ordering.

---

## 2.6 Event payload design

Event payloads MUST expose the minimum information required by the event contract.

Two principal event styles are supported.

### Notification event

Contains enough information to identify the occurrence and affected resource.

Example:

```text
{
  "invoice_id": "inv_123"
}
```

Subscribers fetch authoritative state if needed.

Use when:

- latest state matters more than historical state;
- the source API is reliably available;
- minimizing replicated sensitive data is desirable.

### Event-carried state

Carries the relevant state as it existed when the occurrence happened.

Example:

```text
{
  "invoice_id": "inv_123",
  "amount": {
    "currency": "USD",
    "minor_units": 12500
  },
  "paid_at": "..."
}
```

Use when:

- subscribers need historical facts;
- subscriber independence is important;
- source API fan-out would be undesirable.

### Hybrid design

Hybrid payloads MAY be used, but included fields MUST have deliberate semantics.

A producer MUST NOT add arbitrary resource fields merely because they are conveniently available.

---

## 2.7 Payload minimization

Events MUST follow data-minimization requirements.

Event payloads MUST NOT include:

```text
passwords
API keys
access tokens
session tokens
private signing keys
unnecessary authentication material
```

Sensitive business or personal fields SHOULD be excluded unless consumers legitimately require them.

### Fan-out consideration

A field placed into an event may be:

```text
persisted by the broker
replicated
logged
replayed
stored by many consumers
retained in DLQs
```

The decision to include sensitive data MUST account for this expanded lifecycle.

### Large payloads

Large binary objects SHOULD NOT be embedded directly into ordinary event messages.

Prefer a claim/reference pattern such as:

```text
event
  ↓
authorized object reference
  ↓
consumer retrieves object
```

where access control and expiry are appropriate.

---

## 2.8 Event schema ownership

Every production event type MUST have an owning producer team.

The owner is responsible for:

```text
meaning
schema
documentation
compatibility
versioning
deprecation
publication reliability
```

A subscriber MUST NOT redefine the producer's event semantics.

### Schema registry

Production event schemas SHOULD be stored in an approved schema repository or registry.

Supported representations MAY include:

```text
JSON Schema
Avro
Protocol Buffers
```

The format SHOULD match the platform ecosystem.

Schema definitions MUST be source-controlled or otherwise versioned and reviewable.

---

## 2.9 Schema contract

Schemas SHOULD constrain:

```text
field names
types
required fields
nullability
enums
nested structures
formats
```

where supported.

The schema MUST NOT attempt to encode all business semantics solely through syntax.

For example:

```text
amount >= 0
```

may be syntactically enforceable, while:

```text
amount equals the actual invoice payment
```

requires domain correctness.

### Consumer tolerance

Consumers SHOULD tolerate unknown additive fields.

Consumers MUST NOT fail merely because a compatible producer version includes a field they do not use.

---

## 2.10 Event-schema versioning

Event schema changes MUST be classified as backward-compatible or breaking.

### Generally compatible changes

Examples include:

```text
add optional field
add metadata that consumers may ignore
relax a safe constraint
```

These SHOULD normally retain the same event type.

CloudEvents guidance similarly recommends keeping the same `type` for backward-compatible payload changes. citeturn136797search2

### Potentially breaking changes

Examples include:

```text
remove field
rename field
change field type
optional → required
change units
change semantic meaning
change identifier semantics
change null behavior
```

Adding enum members MAY also be breaking where consumers use exhaustive matching.

Breaking changes MUST create a new major event contract.

For example:

```text
com.example.billing.invoice.paid.v1
                ↓
com.example.billing.invoice.paid.v2
```

CloudEvents guidance likewise recommends changing the event type for backward-incompatible data changes and potentially publishing both versions during migration. citeturn136797search2

---

## 2.11 Semantic versioning

Schema compatibility is not only structural.

Changing:

```text
amount = gross payment
```

to:

```text
amount = net settlement
```

is breaking even when both values remain:

```text
decimal
```

Semantic changes MUST follow the same governance as structural breaking changes.

A field MUST NOT silently acquire a new business meaning.

---

## 2.12 Event version migration

Breaking event versions SHOULD have an explicit migration period.

A producer MAY publish:

```text
v1
and
v2
```

simultaneously while consumers migrate.

Migration MUST define:

```text
new contract
consumer migration deadline
dual-publish period
v1 deprecation date
v1 removal criteria
```

Dual publishing MUST preserve event identity/correlation semantics sufficiently for subscribers to avoid accidental double effects.

A consumer MUST NOT subscribe to both versions and process them as independent business occurrences unless explicitly intended.

---

## 2.13 Event catalog

The organization SHOULD maintain an event catalog.

Every externally shared or cross-domain event SHOULD document:

```text
event type
owner
description
schema
example
source
subject semantics
ordering key
delivery semantics
retention/replay availability
PII/data classification
version/deprecation status
```

The event catalog SHOULD make it possible for a subscriber to understand the contract without inspecting producer implementation.

---

## 2.14 Transactional publication

When an application:

```text
updates authoritative state
+
publishes an event
```

those actions MUST NOT be implemented as an unsafe independent dual write when consistency matters.

This is unsafe:

```text
1. UPDATE invoice SET status = 'paid'
2. COMMIT
3. publish(invoice.paid)
```

because the service can fail between steps 2 and 3.

This is also unsafe:

```text
1. publish(invoice.paid)
2. update database
```

because the database write can fail after the event becomes visible.

The transactional outbox pattern exists specifically to solve this dual-write failure by writing state and publication intent within one database transaction. citeturn238958search0

---

## 2.15 Transactional outbox

Services that publish events resulting from transactional database changes SHOULD use a transactional outbox or an approved equivalent.

Conceptually:

```text
BEGIN TRANSACTION

UPDATE invoice ...

INSERT INTO outbox (
    event_id,
    event_type,
    aggregate_id,
    aggregate_sequence,
    payload,
    created_at
)

COMMIT
```

A separate relay publishes committed outbox events.

### Atomicity

The domain mutation and outbox write MUST participate in the same authoritative transaction.

If the transaction rolls back, the event MUST NOT be published as a committed domain event.

### Event identity

The outbox row MUST receive the final logical event ID before publication.

Relay retries MUST preserve that ID.

### Relay

The relay MAY use:

- database polling;
- transaction-log CDC;
- database stream capabilities.

The selected implementation MUST guarantee that only committed publication intent becomes eligible.

AWS's transactional-outbox guidance explicitly supports both outbox-table and CDC-style implementations and notes that duplicate relay delivery remains possible, requiring idempotent consumers. citeturn238958search0

---

## 2.16 Outbox lifecycle

An outbox is production state and MUST be operated accordingly.

The platform SHOULD monitor:

```text
unpublished row count
oldest unpublished age
publish latency
relay failures
duplicate publishes
cleanup backlog
```

### Cleanup

Published outbox records MAY be deleted or archived according to an explicit retention policy.

Records MUST NOT be deleted before the publication system has durably accepted the event according to the platform's guarantee.

### Relay crash

The following sequence is expected:

```text
relay publishes
       ↓
relay crashes before marking published
       ↓
relay publishes again
```

Therefore duplicate publication MUST be safe.

---

## 2.17 Change Data Capture

CDC MAY be used as the outbox relay or event source where appropriate.

CDC-derived events MUST distinguish:

```text
database change
```

from:

```text
business event
```

A database row update does not automatically define a stable domain event.

For example:

```text
orders table UPDATE
```

does not necessarily mean:

```text
order.fulfilled
```

Business events SHOULD be deliberately modeled even when CDC transports them.

---

## 2.18 Delivery semantics

The default cross-service contract MUST assume:

```text
at-least-once delivery
```

unless a stronger guarantee is explicitly documented and applicable end to end.

At-least-once means:

```text
event may arrive once
event may arrive more than once
```

Subscriber correctness MUST survive redelivery.

Pub/Sub systems commonly expose this behavior; Google Pub/Sub, for example, defaults to at-least-once delivery and explicitly requires clients to tolerate redelivery. citeturn238958search7turn238958search9

### Exactly once

The phrase **exactly once** MUST include its precise scope.

Valid phrasing might be:

```text
broker writes each producer sequence once
```

or:

```text
transaction atomically commits output records and consumed offsets
```

It MUST NOT be generalized into:

```text
all business effects will happen exactly once
```

unless the complete system proves that property.

---

## 2.19 Idempotent consumers

Every at-least-once consumer that performs a non-idempotent side effect MUST implement deduplication or an equivalent idempotent operation.

A common pattern is:

```text
BEGIN TRANSACTION

INSERT processed_event (
    consumer_id,
    event_id
)
ON CONFLICT → already processed

apply domain state change

COMMIT
```

The unique constraint SHOULD enforce:

```text
(consumer_id, event_id)
```

or an equivalent logical scope.

### Atomicity

The deduplication marker and subscriber database mutation SHOULD commit atomically.

This is unsafe:

```text
mark processed
COMMIT

update business state
```

because a crash can permanently suppress required processing.

### External side effects

Where the effect occurs in another system, the consumer SHOULD use that system's idempotency facility where available.

A stable idempotency key MAY be derived from:

```text
subscriber
+
event ID
+
operation
```

For example:

```text
billing-email:evt_123:send-receipt
```

---

## 2.20 Idempotency retention

The consumer MUST retain deduplication state long enough to cover the possible redelivery or replay window required by the system.

A dedupe entry MUST NOT expire after one hour if events may legitimately redeliver after several days.

If historical replay can occur after deduplication records expire, the replay model MUST explicitly define the expected behavior.

### Business idempotency

Where possible, consumers SHOULD also make the business transition naturally idempotent.

For example:

```text
SET subscription_status = 'cancelled'
```

is easier to make safe than:

```text
increment cancellation_count
```

for duplicate events.

---

## 2.21 Acknowledgment semantics

Consumers MUST acknowledge a broker message only after the point at which loss of that delivery is acceptable.

For synchronous processing:

```text
receive
→ validate
→ process
→ commit
→ acknowledge
```

Acknowledging before durable processing can turn a consumer crash into message loss.

### Durable handoff

A consumer MAY acknowledge after durably placing the work in another reliable local queue.

In that case, the local queue becomes part of the delivery guarantee.

### Long processing

If processing can exceed broker visibility/lease time, the subscriber SHOULD:

- extend the acknowledgment deadline;
- adjust visibility timeout;
- or durably hand off work.

It SHOULD NOT allow predictable timeout-driven duplicate floods.

---

## 2.22 Webhook receiver acknowledgment

A webhook receiver SHOULD perform minimal synchronous work:

```text
1. accept TLS connection
2. validate request constraints
3. verify signature
4. verify replay window
5. validate event envelope enough for routing
6. durably enqueue/store delivery
7. return 2xx
```

Business processing SHOULD normally occur asynchronously after durable acceptance.

GitHub similarly recommends acknowledging webhook deliveries promptly and moving longer processing to a queue. citeturn238958search5

### Successful acknowledgment

A `2xx` response SHOULD mean:

```text
this delivery was durably accepted
```

not necessarily:

```text
all downstream business processing has completed
```

The webhook contract MUST document this distinction.

---

## 2.23 Retry classification

Retries MUST be failure-aware.

Failures SHOULD be classified into categories such as:

### Transient

Examples:

```text
timeout
connection reset
broker temporarily unavailable
HTTP 429
HTTP 503
```

MAY be retried.

### Permanent payload/contract failure

Examples:

```text
invalid schema
unsupported event type
permanently malformed payload
```

SHOULD NOT be retried indefinitely.

### Authorization/configuration failure

Examples:

```text
invalid webhook secret
HTTP 401/403
deleted destination
```

SHOULD trigger configuration investigation rather than high-frequency retries.

### Explicit destination removal

A response such as an agreed `410 Gone` MAY disable or suspend delivery according to the webhook contract.

---

## 2.24 Retry policy

Automatic retries SHOULD use:

```text
bounded attempts
+
exponential backoff
+
jitter
```

where appropriate.

The policy MUST define:

```text
initial delay
maximum delay
maximum attempts or retry horizon
retryable failure classes
```

Retry loops MUST NOT continue forever.

### `Retry-After`

Webhook/event HTTP senders SHOULD honor a valid `Retry-After` response where the protocol and policy support it.

### Event identity

A retry MUST preserve the logical event ID.

Retry metadata MUST NOT modify the original occurrence semantics.

---

## 2.25 Retry storms

Infrastructure MUST protect itself and subscribers from synchronized retry storms.

Systems SHOULD use:

- jitter;
- concurrency limits;
- circuit breakers;
- backpressure;
- per-subscriber rate limits.

A subscriber outage MUST NOT cause every failed event to retry simultaneously when the endpoint recovers.

---

## 2.26 Dead-letter handling

Messages that exhaust normal retry policy SHOULD enter a dead-letter state when manual or specialized recovery is possible.

The dead-letter record SHOULD retain:

```text
event identity
event type
subscriber
failure category
last error
attempt count
first failure time
last failure time
payload or secure payload reference
```

### Sensitive data

DLQs MUST comply with the same Security and Data requirements as their source streams.

A DLQ MUST NOT become an uncontrolled long-retention copy of sensitive payloads.

### Alerting

Critical DLQ growth SHOULD trigger alerting.

A DLQ with permanently increasing depth MUST NOT be considered healthy simply because main consumption continues.

---

## 2.27 Poison messages

A malformed or systematically failing message MUST NOT block an entire ordered stream indefinitely without an explicit policy.

The subscriber SHOULD be capable of:

```text
quarantine
dead-letter
skip under controlled policy
or halt intentionally
```

depending on domain correctness requirements.

Skipping an event that is necessary for later ordered events MAY be unsafe.

The decision MUST account for state consistency.

---

## 2.28 DLQ redrive

Redriving a DLQ MUST be an explicit operational action or approved automation.

Redrive MUST:

- preserve logical event identity;
- preserve audit provenance;
- remain rate-limited;
- pass current authorization;
- use the current subscriber contract or a deliberately selected compatible version.

Operators SHOULD support a dry run or preview where practical.

### Redrive loops

A redriven item that fails again MUST NOT bounce automatically between main queue and DLQ forever.

Attempt history SHOULD remain observable.

---

## 2.29 Webhook transport security

Production webhooks MUST use HTTPS.

TLS certificate validation MUST NOT be disabled.

Webhook authenticity MUST additionally be protected through one of the approved mechanisms such as:

```text
HMAC signature
asymmetric digital signature
HTTP Message Signatures
authenticated private transport
```

where appropriate.

TLS protects transport between endpoints but does not by itself provide application-level evidence that a webhook payload was produced by the expected signing identity across all intermediary architectures. RFC 9421 defines HTTP Message Signatures specifically to provide integrity/authenticity over selected HTTP message components and also notes that signatures supplement rather than replace TLS. citeturn231797search0

---

## 2.30 Webhook signing

Outbound public webhooks MUST have a documented signature scheme.

A signature SHOULD bind, directly or through the selected standard:

```text
payload
timestamp
relevant request metadata
```

to the endpoint's signing credential.

Where HTTP Message Signatures are used, the implementation MUST define the exact covered components, algorithms, key resolution, and verification policy; RFC 9421 deliberately requires the application profile to specify such details. citeturn231797search0

### Secret scope

Symmetric webhook signing secrets SHOULD be unique per:

```text
webhook subscription
or
destination
```

rather than shared globally across unrelated subscribers.

Compromise of one subscriber MUST NOT unnecessarily compromise every webhook destination.

### Algorithms

Only Security-approved signing algorithms MUST be supported.

The verifier MUST reject unsupported or deprecated algorithms rather than accepting arbitrary signer-selected algorithms.

---

## 2.31 Raw payload verification

Where the webhook signature is defined over the HTTP body, verification MUST use the exact bytes required by the signing specification.

The receiver MUST NOT:

```text
parse JSON
reformat JSON
reorder fields
re-serialize
then verify
```

unless the signature specification explicitly defines such canonicalization.

The implementation SHOULD retain access to the raw request bytes through signature verification.

---

## 2.32 Signature verification order

A webhook receiver SHOULD verify security properties before business processing.

Conceptually:

```text
receive request
     ↓
size/content checks
     ↓
timestamp/replay checks
     ↓
signature verification
     ↓
event parsing/schema
     ↓
durable ingress
```

Invalid signatures MUST NOT reach ordinary business handlers as trusted webhook events.

### Constant-time comparison

MAC/signature comparison MUST use appropriate cryptographic verification functions rather than naïve string equality.

---

## 2.33 Replay-attack protection

A valid cryptographic signature does not inherently prove freshness.

Captured signed requests may otherwise be replayed.

Webhook signature profiles MUST therefore use one or more of:

```text
signed creation timestamp
expiration
nonce
delivery identifier
replay cache
```

with a bounded freshness policy.

RFC 9421 specifically identifies signature replay as a threat and defines timestamps, expiry values, and nonces as mechanisms for limiting or detecting replay. citeturn231797search0

### Freshness

Receivers SHOULD reject signed requests whose timestamp falls outside an approved freshness window, accounting for bounded clock skew.

A universal arbitrary tolerance MUST NOT be assumed; the platform Security standard SHOULD define or approve the window appropriate to the environment.

### Delivery replay cache

Where delivery IDs are available, receivers SHOULD record recently accepted IDs for the relevant replay period.

A previously accepted delivery MAY legitimately be redelivered by the provider; in that case the idempotent receiver MUST safely recognize it.

---

## 2.34 Duplicate delivery versus replay attack

The system MUST distinguish:

```text
legitimate transport redelivery
```

from:

```text
unauthorized captured-request replay
```

Both may contain identical payloads.

A valid producer retry normally:

- uses the expected authenticated channel;
- meets signature freshness rules or the provider's documented redelivery scheme;
- has a valid delivery identity;
- is still safe because the consumer is idempotent.

A stale attacker replay SHOULD fail freshness or replay-cache validation.

---

## 2.35 Webhook key rotation

Signing credentials MUST support rotation.

A safe rotation process SHOULD support an overlap period:

```text
signing key A
      ↓
A + B accepted
      ↓
sign with B
      ↓
B only accepted
```

The sender MAY attach a key identifier where the signature profile supports it.

Receivers MUST NOT continue accepting retired keys indefinitely.

Rotation events SHOULD be auditable.

---

## 2.36 Webhook endpoint registration

Webhook destination registration MUST be treated as security-sensitive configuration.

The application MUST validate:

```text
scheme
host
URL syntax
authorization
tenant ownership
```

### SSRF

Systems delivering webhooks to user-configurable URLs MUST defend against server-side request forgery.

Unless intentionally supported, destinations SHOULD be prevented from targeting:

```text
loopback
link-local
cloud metadata services
private/internal networks
restricted infrastructure
```

according to the Security standard.

DNS resolution and redirect behavior MUST account for DNS rebinding and redirect-to-private-network attacks.

### Redirects

Webhook senders SHOULD NOT automatically follow arbitrary redirects.

If redirects are supported, destination and security policy MUST be revalidated.

Signing material MUST NOT be leaked to redirected destinations.

---

## 2.37 Webhook request limits

Webhook endpoints MUST enforce reasonable:

```text
body size
header size
connection timeout
request timeout
```

limits.

Payload size limits SHOULD be part of the public contract.

Oversized payloads SHOULD fail before expensive parsing.

---

## 2.38 Subscriber authorization

Internal event systems MUST apply topic/stream/subscription authorization.

A service SHOULD receive access only to events required for its domain.

The ability to:

```text
subscribe
publish
replay
delete
administer
```

SHOULD be independently permissionable.

A consumer that may read:

```text
billing.invoice.paid
```

MUST NOT automatically gain read access to every sensitive event topic.

---

## 2.39 Ordering guarantees

No event system MUST assume global ordering unless the transport explicitly guarantees it and the architecture requires it.

The default should be:

```text
unordered globally
```

with ordering scoped only where needed.

### Entity ordering

When sequential processing matters for one entity, events SHOULD share a stable partition/ordering key such as:

```text
order_id
account_id
subscription_id
```

Kafka, for example, lets producers select a partition through a semantic key; records for the same key can therefore be routed consistently to one partition where the partition log supplies ordering. citeturn826926search0turn826926search2

### Global ordering

Global ordering SHOULD be avoided because it limits parallelism and creates a large failure domain.

---

## 2.40 Partitioning keys

A partition key MUST be chosen according to required ordering and workload distribution.

A good key SHOULD:

- group events requiring ordered handling;
- distribute traffic sufficiently;
- remain stable.

For entity state changes, the entity identifier is often appropriate.

### Hot keys

A very high-volume entity can create a hot partition.

The architecture MUST evaluate whether strict per-entity ordering is actually required before sacrificing throughput.

### Changing partition counts

Consumers MUST NOT infer business meaning from broker partition numbers.

A partition number is transport state, not domain identity.

---

## 2.41 Aggregate sequence numbers

Where strict logical ordering matters, producers SHOULD include a monotonic sequence or aggregate version.

Example:

```text
order_id: ord_123
aggregate_version: 41
```

then:

```text
order.updated version 42
```

A subscriber can detect:

```text
duplicate
gap
out-of-order delivery
```

without relying on timestamps.

### Gap handling

A detected sequence gap SHOULD have an explicit policy:

```text
wait/buffer
retry missing event
fetch authoritative current state
or fail deliberately
```

The consumer MUST NOT silently assume missing events never existed.

---

## 2.42 Out-of-order delivery

Consumers SHOULD be designed to tolerate out-of-order delivery where transport ordering is not guaranteed.

Strategies MAY include:

- version checks;
- compare-and-set;
- monotonic state transitions;
- buffering;
- authoritative state lookup.

Example:

```text
received:
subscription.version = 12

stored:
subscription.version = 14
```

A consumer SHOULD NOT overwrite version 14 with stale version 12.

This is a State Management invariant, not merely a messaging concern.

---

## 2.43 Event ordering and retries

Retry behavior MUST NOT accidentally reorder operations whose order is required.

An ordered subscriber SHOULD understand the transport's retry semantics.

For example, a poison message may prevent later messages on the same key from being safely applied.

The architecture MUST choose explicitly between:

```text
preserve order and block
```

and:

```text
skip/quarantine and reconcile
```

depending on domain requirements.

---

## 2.44 Replay terminology

The platform MUST distinguish several operations often called “replay.”

### Redelivery

Send the same event to the same subscriber again because delivery or processing failed.

```text
same logical event ID
```

### Historical replay

Deliver historical events to a subscriber again.

Typically used for:

- rebuilding projections;
- repairing consumers;
- testing new subscribers.

### Backfill

Produce or deliver events covering a historical range that was not previously processed.

### Re-emission

Create a new logical event based on earlier historical state.

These operations MUST NOT be treated as interchangeable.

---

## 2.45 Replay tooling

Production replay tooling MUST be governed as a privileged production capability.

Replay requests MUST define:

```text
source stream/event type
subscriber
start boundary
end boundary
filters
estimated event count
rate limit
replay mode
```

### Authorization

Replay MUST require authorization appropriate to the affected data and side effects.

An operator permitted to inspect a stream MUST NOT automatically be allowed to re-trigger its downstream effects.

### Preview

Large or consequential replays SHOULD support:

```text
count/impact preview
or
dry run
```

before execution.

---

## 2.46 Replay identity

Ordinary redelivery or historical replay of the same logical event SHOULD preserve its event ID.

This ensures idempotent consumers can recognize duplicates.

However, this creates an important distinction:

```text
re-deliver historical event
```

does **not** mean:

```text
force an already successful consumer to perform the side effect again
```

### Forced reprocessing

If a system intentionally needs to recompute already processed historical data, it SHOULD use one of:

- reset consumer projection/checkpoint under a governed process;
- dedicated reprocessing workflow;
- newly emitted derived event with a new event ID and explicit causation metadata.

The platform MUST NOT casually bypass idempotency protections to make replay “work.”

---

## 2.47 Replay isolation

Large replay workloads SHOULD be isolated from live traffic where they could cause unacceptable latency or backlog.

The platform SHOULD provide:

```text
replay rate limit
replay concurrency limit
subscriber throttling
pause/cancel
```

### Live interleaving

If replayed and live events can interleave, ordering semantics MUST be understood.

A historical event MUST NOT overwrite newer state merely because it was replayed later.

---

## 2.48 Replay auditability

Every privileged replay SHOULD record:

```text
replay_id
initiating principal
reason
scope
filters
started_at
completed_at
event count
failures
cancellation
```

The replay ID SHOULD propagate into delivery metadata where practical.

Replay-generated operational metadata MUST NOT alter the immutable original event payload.

---

## 2.49 Backfill generation

When missing historical events must be constructed after the fact, the generated events MUST have documented semantics.

The system MUST decide whether the generated item represents:

```text
the original historical occurrence
```

or:

```text
a new backfill occurrence representing reconstructed history
```

If a new logical event is produced, it MUST receive a new event ID.

It SHOULD record provenance such as:

```text
backfill execution
source record/version
historical occurrence time
```

where appropriate.

---

## 2.50 Subscriber observability

Every production subscriber MUST expose operational health.

At minimum, monitor as applicable:

```text
delivery rate
processing success rate
processing failure rate
processing latency
event age
queue lag/backlog
oldest pending event
retry count
DLQ depth
idempotency/deduplication hits
```

### Security metrics

Webhook subscribers SHOULD additionally monitor:

```text
invalid signatures
expired signatures
unknown signing keys
replay detections
oversized requests
invalid schemas
```

### Ordering metrics

Ordered consumers SHOULD monitor:

```text
sequence gaps
out-of-order events
stale-version drops
hot partitions
```

---

## 2.51 Producer observability

Event producers SHOULD monitor:

```text
events generated
outbox backlog
outbox age
publish success/failure
publish latency
broker rejects
schema failures
```

A healthy API transaction combined with a growing outbox backlog MUST be considered a degraded asynchronous system.

---

## 2.52 Webhook-delivery observability

Outbound webhook systems SHOULD retain delivery metadata according to retention policy.

Each delivery SHOULD be traceable by:

```text
event ID
delivery ID
subscription/endpoint ID
attempt
status
latency
timestamp
next retry
```

Response bodies SHOULD be truncated and sanitized if retained.

They MUST NOT become an uncontrolled store for subscriber secrets or sensitive error pages.

### Delivery history

Subscribers SHOULD have access to sufficient delivery history to troubleshoot their integration.

GitHub, for example, exposes recent webhook deliveries and allows authorized redelivery, illustrating the operational value of delivery-level tooling. citeturn238958search3

---

## 2.53 Distributed tracing

Events SHOULD propagate approved trace context when a distributed trace is useful.

Tracing MUST distinguish:

```text
producer transaction
publish span
delivery span
consumer processing span
downstream effects
```

Trace IDs MUST NOT replace durable business correlation identifiers where the latter are required.

A trace may expire long before a business workflow completes.

---

## 2.54 Subscriber SLOs

Critical event subscriptions SHOULD define SLOs.

Examples:

```text
99.9% successfully processed within 5 minutes
p95 processing latency < 2 seconds
oldest backlog < 10 minutes
DLQ depth = 0 for critical events
```

Exact values MUST reflect the domain.

### Freshness versus throughput

A subscriber that eventually processes every event but remains three days behind MAY still be operationally failed.

Backlog age MUST therefore be observable, not merely message count.

---

## 2.55 Backpressure

Subscribers MUST have a defined backpressure strategy.

Controls SHOULD include:

```text
consumer concurrency
prefetch/flow-control limits
maximum in-flight messages
rate limiting
autoscaling
```

A subscriber MUST NOT accept unlimited work into memory.

Google Pub/Sub's subscriber guidance, for example, explicitly recommends flow control to bound outstanding message count/bytes and avoid overloaded subscribers and resulting redeliveries. citeturn238958search9

---

## 2.56 Schema validation at ingress

Consumers SHOULD validate event contracts before performing side effects.

Validation SHOULD include:

```text
supported event type
supported major version
required envelope fields
payload schema
basic semantic invariants
```

Unknown compatible fields MUST NOT cause unnecessary failure.

Unsupported major versions SHOULD fail explicitly.

### Invalid production event

Repeated schema failures from a producer SHOULD trigger producer-side alerting.

A subscriber SHOULD NOT silently normalize arbitrary malformed events into whatever shape happens to work.

---

## 2.57 Unknown event types

A subscriber MUST define behavior for unknown event types.

When using a broad topic, it SHOULD generally:

```text
ignore unsupported event types safely
```

rather than fail the entire subscriber.

A subscription intended to receive only one known type MAY instead treat unexpected types as configuration errors.

---

## 2.58 Subscriber deployment compatibility

Subscriber deployments MUST be compatible with events already in flight.

A deployment MUST NOT assume:

```text
all queued v1 messages disappeared when v2 code deployed
```

Consumers SHOULD support the necessary overlapping event versions throughout the maximum relevant backlog/retry window.

---

## 2.59 Producer deployment compatibility

Producers MUST NOT publish a breaking new schema until subscriber migration requirements are satisfied.

Schema compatibility checks SHOULD run in CI.

Where a schema registry supports compatibility enforcement, the platform SHOULD configure an appropriate compatibility policy.

Contract tests SHOULD verify representative producer payloads against published schemas.

---

## 2.60 Event retention

Broker/event retention MUST be explicit.

Retention SHOULD reflect:

```text
operational recovery
replay requirements
audit requirements
storage cost
privacy/retention policy
```

Event streams MUST NOT retain sensitive events forever merely because storage is inexpensive.

### Subscriber independence

Retention MUST be long enough for the guaranteed subscriber recovery model.

A subscriber cannot be promised a seven-day outage recovery window if events expire after one day.

---

## 2.61 Events and deletion/privacy

Event immutability MUST be reconciled with applicable privacy and deletion requirements.

Sensitive mutable information SHOULD be minimized in durable event history.

Where regulations or policy require physical deletion or anonymization, the architecture MUST define how that applies to:

```text
broker retention
event archives
DLQs
replay stores
delivery logs
```

“Events are immutable” MUST NOT be interpreted as exemption from applicable Data & Database obligations.

---

## 2.62 Event sourcing boundary

Ordinary event-driven integration MUST NOT be confused with event sourcing.

In normal integration:

```text
database/domain service
=
authoritative state
```

and events communicate changes.

In event sourcing:

```text
event log
=
authoritative state history
```

and application state is derived from that history.

Event sourcing introduces additional requirements for:

- immutable event preservation;
- strict sequence semantics;
- upcasters/versioning;
- aggregate rebuilding;
- snapshotting.

Teams MUST NOT accidentally create an undocumented event-sourced architecture.

---

## 2.63 Multi-region systems

Multi-region event architectures MUST explicitly define:

```text
event identity
ordering scope
failover
duplicate publication
regional replication
consumer location
```

Cross-region failover MAY produce duplicate publications if producers retry uncertain commits.

Event identity MUST remain stable wherever the same occurrence is being retried.

Global ordering SHOULD NOT be assumed across independently active regions without a deliberate global sequencing design.

---

## 2.64 Broker transactions

Broker-native transactions MAY strengthen delivery guarantees inside a defined messaging boundary.

For Kafka, for example, idempotent producers prevent broker duplicates from producer retries within their supported scope, while transactional producers can atomically publish across partitions/topics and commit consumed offsets when used correctly. citeturn826926search1turn826926search8

These capabilities MUST NOT be used to claim transactional atomicity with an unrelated database unless an architecture explicitly provides that guarantee.

For:

```text
database write
+
broker publish
```

the transactional outbox remains the preferred general solution where a shared distributed transaction is unavailable.

---

## 2.65 Publisher idempotency

Publishers MUST avoid creating multiple logical event IDs for one occurrence merely because publication status is uncertain.

This is unsafe:

```text
publish evt_A
timeout

retry by generating evt_B
```

because subscribers see two independent events.

Retry SHOULD instead publish:

```text
evt_A
```

again.

### Application-level resend

Broker producer idempotence does not automatically deduplicate application code that deliberately creates a second independent message.

Kafka's producer documentation explicitly distinguishes broker-level idempotent retries from application-level re-sends. citeturn826926search1

---

## 2.66 Subscriber state transitions

Consumers MUST validate state transitions independently.

Receiving:

```text
payment.refunded
```

does not justify an invalid local transition if the subscriber's authoritative model says the target resource does not exist or is already in an incompatible state.

Consumers SHOULD use:

```text
event version
aggregate version
current state
```

where needed to prevent stale state corruption.

---

## 2.67 Side-effect chaining

Consumers that process an event and publish another event SHOULD apply the same transactional-publication requirements.

For example:

```text
invoice.paid
       ↓
consumer updates loyalty balance
       ↓
loyalty.points_credited
```

The second consumer MUST NOT use an unsafe:

```text
database commit
then publish
```

dual write.

Outbox semantics recurse through event-driven systems.

---

## 2.68 Webhook consumer API behavior

Public webhook documentation MUST specify:

```text
endpoint method
content type
event envelope
event types
signature scheme
timestamp/freshness semantics
delivery guarantee
retry policy
ordering guarantee
expected response
timeout
payload limit
redelivery/replay tooling
versioning
```

A webhook contract MUST NOT require subscribers to reverse-engineer retries from production behavior.

---

## 2.69 Webhook event subscriptions

Subscribers SHOULD select only events they require.

Producers SHOULD support event-type filtering where practical.

An endpoint subscribed to:

```text
*
```

will receive additional future event types as the producer expands its platform, increasing:

- cost;
- attack surface;
- accidental processing risk.

The receiver MUST still validate the event type before processing. GitHub similarly recommends checking event type/action before handling because event sets evolve over time. citeturn238958search5

---

## 2.70 Subscriber disablement

Webhook producers SHOULD define conditions under which an unhealthy destination is:

```text
paused
disabled
or requires intervention
```

Examples include:

- extended consecutive failures;
- permanent endpoint deletion;
- invalid configuration.

Automatic disablement MUST be visible to the subscriber.

Re-enabling SHOULD require validation or a test delivery where appropriate.

---

## 2.71 Test deliveries

Webhook platforms SHOULD provide safe endpoint testing.

A test event MUST be distinguishable from production business events.

It MUST NOT accidentally trigger real production side effects merely because it resembles a business event.

Possible approaches include:

```text
dedicated ping event
test-mode environment
explicit test metadata
```

depending on the contract.

---

## 2.72 Local and staging testing

Webhook testing SHOULD support:

- non-production signing secrets;
- test event generation;
- delivery inspection;
- deterministic redelivery.

Production signing credentials MUST NOT be reused unnecessarily in development environments.

Staging endpoints MUST NOT receive production-sensitive event payloads unless explicitly governed.

---

## 2.73 Security alignment

Events and webhooks MUST comply with the Security standard.

### Producer permissions

Only authorized producers MUST publish to protected streams.

### Subscriber permissions

Only authorized subscribers MUST read protected event classes.

### Secrets

Webhook signing secrets MUST:

- be stored through approved secret management;
- be scoped;
- be rotatable;
- never appear in event bodies.

### Logs

Logs MUST NOT record signing secrets or authentication headers.

### Untrusted payloads

Webhook payloads and event data MUST be treated as untrusted input even after transport authentication.

A correctly signed producer can still send malformed data because of bugs or compromise.

Signature validation does not replace schema or business validation.

---

## 2.74 Data & Database alignment

Event publication resulting from a database transaction MUST preserve database consistency.

The transactional outbox SHOULD be the default pattern when one transaction must both mutate state and trigger asynchronous publication. AWS's current guidance describes this specifically as the solution to the database/message dual-write problem. citeturn238958search0

### Event data classification

Event schemas MUST participate in Data & Database classification.

The event catalog SHOULD identify:

```text
public
internal
confidential
restricted
```

or the organization's equivalent classification.

### Derived copies

Every subscriber creating a local projection becomes another data store and MUST follow appropriate retention, access, and deletion requirements.

---

## 2.75 API alignment

Events and webhooks are part of the API surface.

They MUST follow API standards for:

```text
ownership
naming
versioning
schemas
deprecation
documentation
authentication
errors
observability
```

### API event parity

Synchronous APIs and emitted events SHOULD use consistent domain identifiers and terminology.

An API should not call a resource:

```text
subscription
```

while the event contract calls the same object:

```text
membershipAgreement
```

without deliberate domain reasons.

---

## 2.76 State Management alignment

An event represents an occurrence, not automatically the complete current application state.

Consumers MUST distinguish:

```text
event time
processing time
current authoritative state
```

A stale event replayed today MUST NOT automatically overwrite newer application state.

### UI state

Administrative UIs MAY display cached subscriber health.

Before destructive actions such as:

```text
replay
purge DLQ
disable subscription
rotate secret
```

the backend MUST reload authoritative configuration and validate the operation.

---

## 2.77 Jobs & Queue alignment

Background-job systems consuming events MUST follow Jobs & Queue standards for:

- concurrency;
- acknowledgment;
- retries;
- scheduling;
- cancellation;
- dead letters;
- worker health.

An event handler MUST NOT implement an independent unbounded retry loop inside a job already governed by a queue retry mechanism.

One layer SHOULD own retry scheduling.

---

## 2.78 Forms & Validation alignment

Administrative event/webhook interfaces MUST use typed validation.

Configuration forms MUST validate fields such as:

```text
endpoint URL
event subscriptions
retry policy
replay range
rate limit
signing-key configuration
```

### Consequential operations

Replay, purge, secret rotation, and endpoint disablement SHOULD expose:

```text
scope
estimated impact
affected subscriber
```

before execution.

Generated or imported configuration MUST pass the same validation as manually entered configuration.

---

## 2.79 Accessibility alignment

Webhook and event administration UIs MUST comply with the Accessibility standard.

Interfaces for:

- delivery history;
- retry status;
- DLQs;
- replay;
- signing-key rotation;
- subscription health

MUST be keyboard accessible.

### Event tables

Delivery/event tables MUST use semantic table/data-grid patterns.

State such as:

```text
delivered
retrying
failed
dead-lettered
replayed
```

MUST NOT be indicated only through color.

### Live updates

Real-time delivery dashboards SHOULD avoid excessive live-region announcements.

Meaningful failures SHOULD be accessible without announcing every successful event.

---

## 2.80 Design Tokens alignment

Event-management UI MUST use canonical semantic Design Tokens.

Status presentation SHOULD map to approved semantics such as:

```text
success
warning
danger
informational
muted
```

Operational severity MUST NOT be represented through arbitrary colors.

Retrying and dead-letter states SHOULD have consistent semantics throughout the product.

---

## 2.81 Component and Pattern alignment

**shadcn/ui is the canonical component baseline** for React-based event and webhook administration.

Approved shadcn components SHOULD be used for relevant interfaces including:

```text
Table / DataTable
Badge
Tabs
Card
Alert
AlertDialog
Dialog
Sheet
Input
Select
Checkbox
Button
Tooltip
Popover
Progress
Skeleton
```

### Delivery history

Delivery inspection SHOULD use the approved data-table and detail-panel patterns.

### Replay

Replay flows SHOULD use an explicit form followed by consequential-action confirmation.

### Secret rotation

Signing-secret values MUST use the corpus credential/secret-display pattern rather than ordinary unrestricted text fields.

### DLQ purge

Permanent DLQ deletion MUST use the canonical destructive-action confirmation pattern.

---

## 2.82 Event contract testing

Every published event SHOULD have automated contract tests.

Producer CI SHOULD verify:

```text
event type
envelope
schema validity
compatibility
example fixtures
```

Consumer tests SHOULD verify representative supported versions.

### Compatibility gates

A breaking schema change MUST fail compatibility CI unless:

- a new major event version is created;
- migration is explicitly governed.

---

## 2.83 Reliability testing

Production event workflows SHOULD be tested for failure at each boundary.

Scenarios SHOULD include:

```text
database commit succeeds, relay unavailable
broker publish timeout
duplicate publication
duplicate delivery
consumer crash before commit
consumer crash after commit before ACK
out-of-order event
poison event
DLQ redrive
```

The expected final state MUST be defined.

---

## 2.84 Webhook security testing

Webhook implementations MUST test:

```text
invalid signature
missing signature
wrong key
expired timestamp
future timestamp
duplicate delivery
captured replay
modified payload
oversized payload
SSRF endpoint registration
redirect attack
key rotation
```

Verification MUST fail closed for invalid authenticity data.

---

## 2.85 Replay testing

Replay tooling SHOULD be tested before production incidents require it.

Tests SHOULD establish:

```text
scope filtering
rate limiting
pause/cancel
audit
ordering behavior
idempotency behavior
failure handling
```

A replay mechanism that has never been exercised SHOULD NOT be assumed to provide reliable disaster recovery.

---

# 3. Anti-patterns

## 3.1 Database commit then publish

**Anti-pattern:**

```text
COMMIT database
publish event
```

as two unrelated operations.

**Why it fails:** A crash between them creates committed state with no event.

**Required correction:** Use transactional outbox or an equivalent atomic publication-intent mechanism.

---

## 3.2 Publish then database commit

**Anti-pattern:** Publishing an event before the authoritative transaction commits.

**Why it fails:** Consumers may observe an occurrence that later rolls back.

**Required correction:** Publish only committed occurrences.

---

## 3.3 New event ID on retry

**Anti-pattern:**

```text
attempt 1 → evt_100
timeout
attempt 2 → evt_101
```

for the same occurrence.

**Required correction:** Preserve event identity across publication retries.

---

## 3.4 “Exactly once everywhere”

**Anti-pattern:** Claiming exactly-once business processing because a broker offers an exactly-once feature.

**Required correction:** State the precise transport/transaction boundary and keep external effects idempotent.

---

## 3.5 Non-idempotent consumer

**Anti-pattern:**

```text
on invoice.paid:
    creditAccount()
```

with no duplicate protection.

**Required correction:** Deduplicate by logical event and make downstream effects idempotent.

---

## 3.6 Acknowledge before processing

**Anti-pattern:**

```text
ACK
then update database
```

**Required correction:** Acknowledge after durable processing or durable handoff.

---

## 3.7 Process marker outside transaction

**Anti-pattern:**

```text
mark event processed
COMMIT

update state
```

**Required correction:** Commit dedupe and subscriber state together where possible.

---

## 3.8 Infinite retry

**Anti-pattern:**

```text
while true:
    retry()
```

**Required correction:** Use bounded policy, backoff, jitter, and DLQ/recovery.

---

## 3.9 Retry permanent schema errors

**Anti-pattern:** Reprocessing the same malformed message thousands of times.

**Required correction:** Classify and dead-letter/quarantine permanent failures.

---

## 3.10 DLQ as trash

**Anti-pattern:** Messages enter a DLQ and are never monitored.

**Required correction:** Assign ownership, alerts, inspection, and redrive procedures.

---

## 3.11 Automatic DLQ loop

**Anti-pattern:**

```text
DLQ → main queue → fail → DLQ → main queue
```

forever.

**Required correction:** Bound redrive attempts and preserve failure history.

---

## 3.12 Command masquerading as event

**Anti-pattern:**

```text
customer.sendEmail
```

published as a domain event.

**Required correction:** Model facts and commands distinctly.

---

## 3.13 Topic is contract

**Anti-pattern:** Consumers decide event meaning solely from:

```text
topic = payments
```

**Required correction:** Use explicit event type and schema.

---

## 3.14 Event named `updated`

**Anti-pattern:** One giant:

```text
customer.updated
```

event carries every unrelated business transition.

**Required correction:** Use meaningful domain events where consumers depend on the distinction.

---

## 3.15 Schema change without version governance

**Anti-pattern:** Rename a required field and assume subscribers will adapt.

**Required correction:** Preserve compatibility or create a new major contract.

---

## 3.16 Semantic change without schema change

**Anti-pattern:** Same field and type acquire a different business meaning.

**Required correction:** Treat semantic compatibility as contract compatibility.

---

## 3.17 Consumer rejects unknown fields

**Anti-pattern:** Compatible producer addition breaks every subscriber.

**Required correction:** Consumers SHOULD ignore fields they do not use unless the contract explicitly requires closed structures.

---

## 3.18 One global webhook secret

**Anti-pattern:** Every customer endpoint shares one signing secret.

**Required correction:** Scope credentials per subscription/destination where feasible.

---

## 3.19 Verify parsed JSON

**Anti-pattern:** Parsing and reserializing a signed raw JSON payload before signature verification.

**Required correction:** Verify the bytes required by the signature profile.

---

## 3.20 HTTPS equals authenticity

**Anti-pattern:** Accepting any HTTPS POST as a valid webhook.

**Required correction:** Verify application-level producer authenticity.

---

## 3.21 Valid signature equals fresh request

**Anti-pattern:** Accepting an old captured signed request indefinitely.

**Required correction:** Validate timestamps/expiry/nonces/delivery IDs according to the signature profile.

---

## 3.22 Signature equals trusted payload

**Anti-pattern:** Skip payload validation because the signature is valid.

**Required correction:** Authenticate the sender and validate payload semantics independently.

---

## 3.23 Arbitrary webhook destination

**Anti-pattern:** Users can configure:

```text
http://169.254.169.254/...
```

or internal administrative targets.

**Required correction:** Apply SSRF-safe destination validation and network controls.

---

## 3.24 Follow redirects blindly

**Anti-pattern:** Webhook client follows arbitrary redirect to an internal service while preserving sensitive headers.

**Required correction:** Restrict or disable redirects and revalidate destination security.

---

## 3.25 Synchronous heavy webhook handler

**Anti-pattern:** Perform a multi-minute workflow before acknowledging a webhook.

**Required correction:** Verify, durably enqueue, acknowledge, process asynchronously.

---

## 3.26 Global ordering requirement

**Anti-pattern:** Serialize millions of unrelated entities because some operations require entity-local order.

**Required correction:** Order on the smallest necessary key.

---

## 3.27 Random partition key for ordered entity

**Anti-pattern:** Updates for one account are distributed across random partitions while consumers assume order.

**Required correction:** Partition by stable ordering scope.

---

## 3.28 Timestamp as sequence

**Anti-pattern:** Use timestamps alone to determine the latest event.

**Required correction:** Use authoritative versions/sequence numbers when order matters.

---

## 3.29 Stale replay overwrites current state

**Anti-pattern:** Historical replay applies old entity state unconditionally.

**Required correction:** Validate aggregate/state version.

---

## 3.30 Replay bypasses idempotency

**Anti-pattern:** Disable duplicate protection globally because an operator wants to replay data.

**Required correction:** Use a dedicated reprocessing model.

---

## 3.31 Unbounded replay

**Anti-pattern:** Operator selects:

```text
replay all events ever
```

and immediately saturates production consumers.

**Required correction:** Preview, authorize, bound, throttle, and monitor.

---

## 3.32 Replay without audit

**Anti-pattern:** Historical events suddenly reappear with no record of who initiated them.

**Required correction:** Assign a replay execution ID and retain audit metadata.

---

## 3.33 Sensitive event as database dump

**Anti-pattern:** Publish every database column in every event.

**Required correction:** Publish the minimum stable contract.

---

## 3.34 Secrets in events

**Anti-pattern:** Include access tokens or credentials because a consumer needs to call another service.

**Required correction:** Consumers obtain their own credentials.

---

## 3.35 Raw database CDC as domain API

**Anti-pattern:** Every physical row change becomes a permanent public integration contract.

**Required correction:** Translate storage changes into intentional domain events.

---

## 3.36 No outbox monitoring

**Anti-pattern:** API looks healthy while millions of unpublished outbox rows accumulate.

**Required correction:** Monitor outbox age and relay health.

---

## 3.37 Subscriber monitoring only by queue depth

**Anti-pattern:** Queue depth is low, therefore subscriber is healthy.

**Required correction:** Monitor age, errors, latency, retries, and DLQ state.

---

## 3.38 Event delivery log stores secrets

**Anti-pattern:** Persist full request authentication headers indefinitely for debugging.

**Required correction:** Redact secrets and minimize retained delivery data.

---

## 3.39 Event log used as application state accidentally

**Anti-pattern:** Consumers start rebuilding authoritative state from an integration event stream not designed for event sourcing.

**Required correction:** Define source of truth explicitly.

---

## 3.40 Admin UI bypasses corpus standards

**Anti-pattern:** Hand-built replay buttons, inaccessible delivery tables, arbitrary status colors, or unvalidated webhook URL forms.

**Required correction:** Follow shadcn/ui, Forms & Validation, Accessibility, Design Tokens, Components, and Patterns.

---

# 4. Checklist

## 4.1 Event semantics

- [ ] Is this message an event, command, or work item?
- [ ] Does an event describe a completed fact?
- [ ] Is the name domain-specific and meaningful?
- [ ] Is command/event ambiguity avoided?
- [ ] Is the event type independent of transport topic?

## 4.2 Event envelope

- [ ] Is there a globally/scopably unique event ID?
- [ ] Is the source explicit?
- [ ] Is the event type explicit?
- [ ] Is occurrence time defined?
- [ ] Is subject/resource identity defined?
- [ ] Is the schema/version identifiable?
- [ ] Are correlation and causation semantics defined where needed?
- [ ] Are delivery IDs separate from event IDs?

## 4.3 Contract

- [ ] Is the event owned by a producer team?
- [ ] Is the schema versioned?
- [ ] Is the business meaning documented?
- [ ] Are required and optional fields explicit?
- [ ] Are sensitive fields minimized?
- [ ] Is an example fixture maintained?
- [ ] Is the event registered in the catalog?

## 4.4 Versioning

- [ ] Is the change backward-compatible?
- [ ] Are unknown additive fields tolerated?
- [ ] Are enum changes assessed for compatibility?
- [ ] Are semantic changes treated as contract changes?
- [ ] Do breaking changes create a new major contract?
- [ ] Is dual publishing bounded and documented?
- [ ] Is deprecation communicated?

## 4.5 Transactional publication

- [ ] Does a database state change produce this event?
- [ ] If so, is dual-write failure prevented?
- [ ] Are state and outbox publication intent committed atomically?
- [ ] Is the final event ID created before relay?
- [ ] Does relay publish only committed events?
- [ ] Can relay duplicates be processed safely?
- [ ] Is outbox backlog monitored?

## 4.6 Delivery semantics

- [ ] Is the delivery guarantee documented?
- [ ] Is at-least-once assumed by consumers?
- [ ] Are exactly-once claims scoped precisely?
- [ ] Are redeliveries expected?
- [ ] Does publication retry preserve event identity?

## 4.7 Consumer idempotency

- [ ] Can the same event arrive twice safely?
- [ ] Is deduplication keyed by stable event identity?
- [ ] Are dedupe and database mutation atomic?
- [ ] Are external API side effects idempotent?
- [ ] Is dedupe state retained for the required period?
- [ ] Are naturally idempotent state transitions preferred?

## 4.8 Acknowledgment

- [ ] Does ACK occur only after durable processing/handoff?
- [ ] Is broker lease/visibility long enough?
- [ ] Are long-running handlers extending leases or handing off?
- [ ] Can a crash after commit/before ACK be tolerated?

## 4.9 Retries

- [ ] Are transient and permanent failures distinguished?
- [ ] Are attempts bounded?
- [ ] Is exponential backoff used where appropriate?
- [ ] Is jitter applied?
- [ ] Is `Retry-After` respected where applicable?
- [ ] Are retry storms controlled?
- [ ] Are authorization/configuration failures escalated rather than hammered?

## 4.10 Dead letters

- [ ] Is there an explicit DLQ policy?
- [ ] Is DLQ depth monitored?
- [ ] Is an owner assigned?
- [ ] Is failure context retained?
- [ ] Are payloads protected appropriately?
- [ ] Is redrive bounded?
- [ ] Are repeat failures retained rather than looped indefinitely?

## 4.11 Webhook transport

- [ ] Is production HTTPS-only?
- [ ] Is TLS validation enabled?
- [ ] Is webhook authenticity cryptographically verified?
- [ ] Is signature scope documented?
- [ ] Is exact raw content available for verification?
- [ ] Are signing algorithms allowlisted?
- [ ] Are secrets endpoint/subscription scoped?
- [ ] Is key rotation supported?

## 4.12 Replay protection

- [ ] Does the signature bind freshness information?
- [ ] Is the timestamp/expiry validated?
- [ ] Is bounded clock skew allowed deliberately?
- [ ] Are delivery IDs/nonces tracked where appropriate?
- [ ] Can stale captured requests be rejected?
- [ ] Is legitimate duplicate delivery still idempotent?

## 4.13 Webhook endpoint security

- [ ] Is endpoint registration authorized?
- [ ] Is the URL validated?
- [ ] Are private/link-local/metadata destinations blocked where required?
- [ ] Is DNS rebinding considered?
- [ ] Are redirects restricted?
- [ ] Are payload/header sizes bounded?
- [ ] Are request timeouts bounded?

## 4.14 Webhook receiver

- [ ] Is signature verification performed before business processing?
- [ ] Is the event type validated?
- [ ] Is the payload/schema validated?
- [ ] Is durable ingress completed before 2xx?
- [ ] Is long work moved to a queue?
- [ ] Is duplicate handling safe?

## 4.15 Ordering

- [ ] Is ordering actually required?
- [ ] What is the smallest ordering scope?
- [ ] Is the partition key stable?
- [ ] Is hot-key risk understood?
- [ ] Is global ordering avoided?
- [ ] Are sequence/aggregate versions present where needed?
- [ ] Is gap behavior defined?
- [ ] Is out-of-order processing safe?

## 4.16 Replay and backfill

- [ ] Are redelivery, replay, backfill, and re-emission distinct?
- [ ] Does ordinary replay preserve event IDs?
- [ ] Is forced reprocessing explicitly modeled?
- [ ] Is replay scope bounded?
- [ ] Is impact preview available?
- [ ] Is replay authorized?
- [ ] Is replay rate-limited?
- [ ] Can replay be paused/cancelled?
- [ ] Is replay audit metadata retained?
- [ ] Can stale replay events not overwrite current state?

## 4.17 Observability

- [ ] Is producer publish success visible?
- [ ] Is outbox lag visible?
- [ ] Is subscriber processing rate visible?
- [ ] Is oldest-event age visible?
- [ ] Are retries visible?
- [ ] Is DLQ depth visible?
- [ ] Are idempotency hits visible?
- [ ] Are signature failures visible?
- [ ] Are ordering gaps visible?
- [ ] Are correlation/trace IDs available?

## 4.18 SLOs

- [ ] Is delivery freshness defined?
- [ ] Is processing latency defined?
- [ ] Is maximum backlog age defined?
- [ ] Are DLQ expectations defined?
- [ ] Are alerts tied to meaningful SLO violations?

## 4.19 Retention

- [ ] Is broker retention explicit?
- [ ] Does it support promised replay/recovery?
- [ ] Are sensitive events retained only as long as required?
- [ ] Are DLQ retention rules defined?
- [ ] Are delivery-log retention rules defined?
- [ ] Are privacy/deletion obligations addressed?

## 4.20 Security

- [ ] Are publishers authenticated/authorized?
- [ ] Are subscribers least-privileged?
- [ ] Are replay/admin permissions separated?
- [ ] Are signing secrets managed securely?
- [ ] Are secrets excluded from events and logs?
- [ ] Are webhook SSRF controls present?
- [ ] Are replay attacks tested?
- [ ] Are payloads still treated as untrusted after signature verification?

## 4.21 Data & Database

- [ ] Is event classification documented?
- [ ] Is sensitive data minimized?
- [ ] Is transactional publication used where required?
- [ ] Are derived subscriber projections governed as data stores?
- [ ] Is source-of-truth ownership explicit?
- [ ] Is event sourcing used only deliberately?

## 4.22 API

- [ ] Are events documented like APIs?
- [ ] Are naming and terminology consistent with synchronous APIs?
- [ ] Is versioning explicit?
- [ ] Are webhook delivery/retry semantics public?
- [ ] Are payload limits documented?
- [ ] Are deprecation policies documented?

## 4.23 State Management

- [ ] Is event state distinct from current authoritative state?
- [ ] Are stale events prevented from overwriting newer state?
- [ ] Are aggregate versions used where needed?
- [ ] Are admin operations based on fresh authoritative configuration?
- [ ] Is replay preview state separate from execution state?

## 4.24 Jobs & Queue

- [ ] Is retry ownership clear?
- [ ] Are worker concurrency limits defined?
- [ ] Is backpressure configured?
- [ ] Are ACK semantics correct?
- [ ] Are job cancellation and DLQ handling defined?
- [ ] Are nested independent retry loops avoided?

## 4.25 Forms & Validation

- [ ] Are webhook URLs schema/domain validated?
- [ ] Are subscription event types validated?
- [ ] Are replay ranges validated?
- [ ] Are dangerous actions previewed?
- [ ] Do imported/generated configurations receive normal validation?
- [ ] Are invalid signing configurations rejected?

## 4.26 Accessibility

- [ ] Are event/delivery tables semantic and keyboard accessible?
- [ ] Are statuses communicated beyond color?
- [ ] Are replay and DLQ actions accessible?
- [ ] Is focus correctly managed in confirmation flows?
- [ ] Are live updates not excessively announced?
- [ ] Are errors programmatically associated with configuration fields?

## 4.27 Design Tokens, Components, and Patterns

- [ ] Does administration UI use semantic Design Tokens?
- [ ] Does React UI use approved shadcn/ui components?
- [ ] Are delivery records shown through approved table patterns?
- [ ] Do destructive operations use the canonical AlertDialog/confirmation pattern?
- [ ] Are secrets displayed using the approved credential pattern?
- [ ] Are operational statuses visually consistent across the product?

## 4.28 Testing

- [ ] Are event contracts tested in CI?
- [ ] Are compatibility checks automated?
- [ ] Is duplicate publication tested?
- [ ] Is duplicate consumption tested?
- [ ] Is consumer crash-before/after-commit tested?
- [ ] Is out-of-order delivery tested?
- [ ] Are DLQ and redrive tested?
- [ ] Are webhook signatures/replay attacks tested?
- [ ] Is replay tooling exercised before an incident requires it?

---

# 5. Canonical summary

Events and webhooks are **versioned asynchronous API contracts**, not incidental messages between processes.

An event **MUST** describe a stable occurrence.

Commands and work items **MUST NOT** be disguised as events merely because they use the same queue infrastructure.

Cross-service events **SHOULD** use a consistent CloudEvents-compatible envelope with stable event identity, source, type, and schema metadata. CloudEvents defines `id`, `source`, `specversion`, and `type` as required event context and defines the combination of `source` and `id` as the identity subscribers may use for duplicate recognition. citeturn136797search0

The architecture **MUST** distinguish:

```text
event ID
delivery ID
correlation/causation ID
idempotency key
```

A delivery retry **MUST NOT** become a new logical event.

Event schemas **MUST** be owned, documented, versioned, and compatibility-tested.

Backward-compatible additive evolution **SHOULD** retain the existing event type.

Breaking structural or semantic changes **MUST** produce a new major event contract and follow a consumer migration plan.

When an authoritative database transaction produces an event, the system **SHOULD** use a transactional outbox or approved equivalent so database state and publication intent commit atomically. This pattern exists specifically to eliminate inconsistent database/message dual writes. citeturn238958search0

The default delivery contract **MUST** be **at least once** unless a stronger, precisely scoped guarantee is explicitly provided.

Consumers **MUST** therefore be idempotent.

Deduplication and local subscriber state mutation **SHOULD** commit atomically, and external side effects SHOULD use stable idempotency keys where supported.

“Exactly once” **MUST NOT** be used as an unqualified architecture claim. Broker-level producer idempotence, transactional stream processing, and subscription-level exactly-once features do not automatically make every database, HTTP request, email, or external effect exactly once. citeturn238958search1turn826926search1

Consumers **MUST** acknowledge only after processing or durable handoff reaches the point where losing that delivery is acceptable.

Retries **MUST** be bounded and failure-aware. Transient failures MAY retry with backoff and jitter; permanent failures **MUST NOT** loop indefinitely.

Dead-letter queues **MUST** have owners, monitoring, protected payload handling, and controlled redrive.

Production webhooks **MUST** use HTTPS and cryptographic authenticity verification.

Receivers **MUST** validate signatures according to the exact signing profile and **MUST** verify the content representation required by that profile rather than reserializing payloads arbitrarily.

Webhook signature schemes **MUST** defend against replay through bounded freshness, signed timestamps/expiry, nonces, delivery identifiers, or equivalent controls. RFC 9421 explicitly describes nonce and timestamp/expiration controls for mitigating signed-request replay. citeturn231797search0

Signing credentials **SHOULD** be scoped per webhook subscription/destination and **MUST** support safe rotation.

Webhook destination registration **MUST** be treated as a security-sensitive operation. User-configurable destinations **MUST** have SSRF defenses appropriate to the environment.

Webhook receivers SHOULD:

```text
verify
→ validate
→ durably enqueue
→ acknowledge
→ process asynchronously
```

rather than perform long-running business work before responding.

Ordering **MUST** be scoped to the smallest domain boundary that requires it.

Where updates for one resource require order, a stable entity key SHOULD be used as the partition/ordering key. Kafka's key-based partition model is a representative implementation of this approach. citeturn826926search0turn826926search2

Global ordering **SHOULD NOT** be introduced without a demonstrated requirement.

Where correctness depends on sequence, events SHOULD carry an aggregate version or monotonic sequence rather than relying on timestamps.

Replay tooling **MUST** distinguish:

```text
redelivery
historical replay
backfill
re-emission
forced reprocessing
```

Ordinary replay SHOULD preserve event identity.

A historical replay **MUST NOT** casually disable consumer idempotency just to recreate already completed effects.

Production replay **MUST** be authorized, scoped, rate-limited, auditable, observable, and cancellable where practical.

Subscribers **MUST** expose operational health through backlog age, delivery rate, processing success/failure, latency, retries, and DLQ state.

Webhook systems SHOULD additionally expose delivery history, signature failures, endpoint health, and redelivery controls.

Event payloads **MUST** follow Security and Data & Database requirements. Secrets **MUST NOT** be published in event bodies, and sensitive payloads SHOULD be minimized because events may be brokered, replicated, replayed, logged, dead-lettered, and stored by many subscribers.

Event processing **MUST** preserve API and State Management invariants. A stale or replayed event **MUST NOT** overwrite newer authoritative state solely because it arrived later.

Administrative event/webhook interfaces **MUST** conform to Forms & Validation, Accessibility, Design Tokens, Component, and Pattern standards.

**shadcn/ui is the canonical React component baseline** for delivery history, subscription configuration, replay workflows, DLQ management, signing-key administration, and operational status interfaces.

A production event system is complete only when the team can answer:

**What fact does this event represent? Who owns its contract? What is its stable identity? How is it versioned? How do we guarantee that committed state is eventually published? What happens when publication or delivery occurs twice? When do consumers acknowledge? Which failures retry, and which dead-letter? How are webhooks authenticated and protected from replay? What ordering is actually guaranteed? How do we safely replay history? How do we prevent stale replays from corrupting current state? And how does each producer and subscriber prove, operationally, that the asynchronous system is healthy?**

The corpus boundary is: **API owns asynchronous contract semantics; Events & Webhooks owns publication, delivery, identity, versioning, signatures, and replay; Jobs & Queue owns worker execution and queue mechanics; State Management owns authoritative transitions; Data & Database owns transactional state and retention; Security owns trust, credentials, SSRF, authentication, replay protection, and least privilege.**
