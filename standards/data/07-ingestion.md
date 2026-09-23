---
id: "ingestion"
title: "Data Ingestion ETL ELT"
domain: "data"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["data", "ingestion", "etl", "elt"]
applies_to: ["data"]
related: ["tables"]
legacy_number: 59
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 60851
provenance: baseline

---

# Data Ingestion, ETL/ELT — Gold Standard 2026

**Status:** Canonical  
**Standard level:** Gold Standard 2026  
**Canonical placement:** **Data & Database → Ingestion → Jobs & Queue → Observability**  
**Applies to:** Batch ingestion, streaming ingestion, CDC, ETL, ELT, replication, file imports, event pipelines, scheduled synchronisation, warehouse/lakehouse loading, backfills, reprocessing, transformation jobs, and pipeline-operated exports.  
**UI baseline:** shadcn/ui for operator-facing ingestion consoles and administrative tooling only.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements unless an approved exception is documented.

---

# 1. Purpose

## 1.1 Objective

This standard defines how data MUST enter, move through, be transformed within, and become trustworthy inside the platform.

It governs:

- batch versus streaming ingestion;
- change data capture;
- ETL versus ELT;
- delivery guarantees;
- idempotency;
- exactly-once claims;
- incremental processing;
- checkpoints and watermarks;
- backfills and replay;
- data contracts;
- schema evolution;
- validation;
- quarantine;
- orchestration;
- dependencies;
- retries;
- dead-letter handling;
- concurrency and backpressure;
- throughput;
- resource and cost control;
- data lineage;
- observability;
- freshness SLIs/SLOs;
- recovery and operational ownership.

This standard MUST be applied together with:

- Security;
- Data & Database;
- API;
- Jobs & Queue;
- State Management;
- Forms & Validation;
- Accessibility;
- Design Tokens;
- Component;
- Pattern;
- Observability standards.

Data ingestion MUST be treated as a correctness boundary, not as a file-copying or message-moving concern.

A successful pipeline MUST mean more than "the process exited successfully."

A successful pipeline MUST establish, as applicable:

1. the intended source scope was consumed;
2. the expected records were processed;
3. invalid data was handled according to policy;
4. duplicate effects were prevented;
5. the destination was committed consistently;
6. progress/checkpoint state was committed correctly;
7. observability signals were emitted;
8. downstream freshness expectations remain satisfiable.

---

## 1.2 Governing principles

Pipelines MUST be designed for:

**correctness before throughput; replayability before convenience; observable failure before silent degradation; and deterministic recovery before manual repair.**

The canonical ingestion design SHOULD assume that:

- processes can crash;
- networks can partition;
- messages can be duplicated;
- events can arrive late or out of order;
- schemas can change;
- source systems can resend data;
- downstream systems can become unavailable;
- operators will eventually need to replay historical data.

A pipeline that functions only under uninterrupted happy-path execution is non-conformant.

---

## 1.3 ETL versus ELT

ETL and ELT are both permitted.

**ETL** SHOULD be used when transformation is required before the destination may safely or practically receive the data.

Examples include:

- sensitive data removal;
- format normalisation required by the destination;
- untrusted payload isolation;
- strict target contracts;
- constrained target systems.

**ELT** SHOULD be used when the destination provides suitable scalable transformation capability and preserving source fidelity before transformation provides operational or analytical value.

Regardless of architecture, raw ingestion MUST NOT become an excuse to persist unrestricted sensitive, malformed, or prohibited data.

Security and data-classification requirements apply before storage as well as after transformation.

---

# 2. Rules

## 2.1 Ingestion mode selection

Every pipeline MUST explicitly identify its ingestion mode.

Permitted primary modes are:

1. batch;
2. streaming/event ingestion;
3. change data capture;
4. hybrid.

The mode MUST be selected from business and operational requirements rather than infrastructure fashion.

### 2.1.1 Batch

Batch ingestion SHOULD be preferred when:

- minute/hour/day-level latency is sufficient;
- the source naturally produces bounded files or snapshots;
- operational simplicity is materially valuable;
- recomputation is inexpensive;
- continuous infrastructure is unnecessary.

Batch MUST NOT be replaced by streaming solely to achieve architectural uniformity.

### 2.1.2 Streaming

Streaming SHOULD be used when:

- low end-to-end latency is an actual requirement;
- events naturally occur continuously;
- consumers require near-real-time state;
- continuous processing materially improves the workflow.

A streaming architecture MUST define:

- event ordering scope;
- partition/key strategy;
- delivery guarantee;
- checkpointing;
- replay behaviour;
- late-event handling;
- backpressure;
- retention requirements.

"Real time" MUST NOT be used as an unspecified requirement.

Latency requirements MUST be measurable.

### 2.1.3 Change data capture

CDC SHOULD be used when downstream systems require database changes with lower latency or greater fidelity than periodic snapshot/polling provides.

Log-based CDC SHOULD be preferred over repeated full-table scans or trigger-based replication where the source platform and operational constraints permit it.

CDC MUST define treatment of:

- inserts;
- updates;
- deletes;
- transaction ordering;
- source positions;
- snapshots;
- schema changes;
- connector downtime;
- source-log retention.

CDC MUST NOT be treated as a replacement for domain events when downstream consumers require business intent rather than database-row mutation.

A changed row answers **what changed in storage**. It does not necessarily answer **why the business event occurred**.

---

## 2.2 Snapshot and CDC bootstrap

A CDC pipeline that requires existing historical state MUST have an explicit bootstrap/snapshot strategy.

The bootstrap MUST establish a consistent boundary between:

- snapshot data;
- changes captured during or after that snapshot.

The implementation MUST prevent gaps between snapshot completion and incremental CDC consumption.

The implementation MUST prevent snapshot records and CDC records from creating unintended duplicate effects.

The initial source position or equivalent checkpoint MUST be retained.

Large snapshots SHOULD be throttled to protect production source systems.

Snapshot workloads MUST NOT exhaust source database:

- I/O;
- CPU;
- connection pools;
- locks;
- transaction-log retention;
- replication resources.

---

## 2.3 Delivery semantics

Every pipeline MUST document its actual delivery semantics.

Permitted descriptions SHOULD use precise terms such as:

- at-most-once;
- at-least-once;
- exactly-once within a defined transactional boundary;
- effectively-once result through idempotent processing.

Unqualified claims of **exactly once** MUST NOT be used.

An exactly-once claim MUST identify:

- source boundary;
- processor boundary;
- sink boundary;
- transaction mechanism;
- checkpoint mechanism;
- failure cases covered;
- external side effects excluded from the guarantee, if any.

Exactly-once processing inside one streaming platform MUST NOT be described as end-to-end exactly once when writes to an external database, API, email system, object store, or other sink can independently duplicate.

### 2.3.1 Preferred default

At-least-once delivery plus deterministic idempotent processing SHOULD be the default design for distributed ingestion where it provides the required correctness.

This approach SHOULD be preferred over introducing complex distributed transactions merely to eliminate duplicate delivery.

Duplicates in transport are acceptable only when duplicate **effects** are prevented where correctness requires them to be prevented.

---

## 2.4 Idempotency

Retrying or replaying the same logical input MUST produce the same intended final result unless the domain explicitly defines accumulation.

Every retryable pipeline stage SHOULD be idempotent.

Common mechanisms MAY include:

- deterministic destination keys;
- upsert/merge;
- compare-and-set;
- idempotency keys;
- source event identifiers;
- immutable partition replacement;
- deduplication tables;
- transactional writes;
- deterministic object paths.

Idempotency MUST be defined against the **logical operation**, not merely the execution attempt.

A new retry identifier MUST NOT defeat deduplication of the same business event.

### 2.4.1 Idempotency keys

Where idempotency keys are used, the key MUST be:

- stable for the logical operation;
- unique across operations that must remain distinct;
- persisted for a sufficient deduplication horizon.

The retention period MUST account for realistic replay and retry windows.

A deduplication record MUST NOT expire before an event can legitimately be replayed if duplicate effects after expiry would be harmful.

### 2.4.2 Side effects

Pipeline stages performing external side effects require special handling.

Examples include:

- sending email;
- charging payment;
- publishing notifications;
- calling non-idempotent APIs.

A transformation task MUST NOT blindly repeat external side effects after ambiguous failure.

Where necessary, an outbox, idempotency contract, transactional handoff, or equivalent Pattern MUST be used.

---

## 2.5 Atomic data and checkpoint commits

Where correctness depends on the relationship between processed data and pipeline progress, the two MUST be committed atomically or through a protocol that preserves equivalent correctness.

The pipeline MUST prevent both failure modes:

**Data committed, checkpoint not committed**  
→ causes replay and potential duplicates.

**Checkpoint committed, data not committed**  
→ causes data loss.

If atomic commitment across data and checkpoint stores is impossible, downstream processing MUST be idempotent and the failure/recovery model MUST be documented.

---

## 2.6 Event identity

Streaming and CDC records SHOULD carry sufficient metadata to establish identity and provenance.

Where applicable this SHOULD include:

- event ID;
- source system;
- source entity/key;
- event type;
- event time;
- ingestion time;
- source position/offset;
- schema/version;
- correlation or trace identifier.

Event identifiers MUST have defined uniqueness semantics.

A timestamp alone MUST NOT be assumed to uniquely identify an event.

---

## 2.7 Event time, ingestion time, and processing time

Pipelines MUST distinguish relevant time concepts.

**Event time** is when the business/source event occurred.

**Ingestion time** is when the platform received the event.

**Processing time** is when a processing stage executed.

These values MUST NOT be used interchangeably.

Business analytics SHOULD normally use event time when the metric concerns when something happened.

Operational pipeline metrics SHOULD use ingestion and processing timestamps where appropriate.

Timezone semantics MUST be explicit.

Canonical persisted timestamps SHOULD follow the Data & Database standard.

---

## 2.8 Incremental loading

Incremental pipelines MUST define their change-detection mechanism.

Permitted mechanisms MAY include:

- CDC positions;
- monotonically increasing IDs;
- version columns;
- modification timestamps;
- high-watermarks;
- source-generated sequence numbers;
- immutable partitions.

An incremental pipeline MUST NOT assume that a timestamp is safe merely because a source contains `updated_at`.

The source field MUST have known guarantees concerning:

- monotonicity;
- precision;
- timezone;
- transaction behaviour;
- delayed updates;
- clock skew.

---

## 2.9 Watermarks

A watermark represents known processing progress and MUST have explicitly documented semantics.

A watermark MUST identify what has safely been processed.

Examples include:

- maximum source sequence;
- committed log position;
- event-time threshold;
- timestamp plus tie-breaker.

Watermarks MUST be durable if loss would create an incorrect resume point.

A watermark MUST NOT advance beyond data that has not been safely committed.

### 2.9.1 Timestamp watermarks

Timestamp-only watermarks SHOULD be avoided where multiple records can share the same timestamp.

Where necessary, a stable secondary key MUST be used.

For example, an incremental cursor MAY conceptually represent:

`(updated_at, primary_key)`

rather than only:

`updated_at`.

### 2.9.2 Overlap windows

Polling pipelines MAY intentionally overlap incremental windows to protect against:

- timestamp precision;
- clock skew;
- delayed transactions;
- visibility lag.

If overlap is used, downstream processing MUST tolerate the resulting duplicates.

Overlap MUST NOT be used without corresponding idempotency.

---

## 2.10 Late and out-of-order data

Streaming pipelines MUST define an explicit lateness policy.

The policy SHOULD specify:

- allowed lateness;
- event-time watermark behaviour;
- window closure behaviour;
- correction policy;
- retention period for state;
- treatment of events arriving after closure.

Late events MUST NOT be silently discarded unless that is an explicitly approved domain rule.

Possible treatments include:

- update previous aggregates;
- produce correction events;
- send to a late-data stream;
- quarantine;
- reject with observable accounting.

The chosen behaviour MUST be measurable.

---

## 2.11 Backfills

Any pipeline containing derived or replaceable historical data SHOULD be designed for backfill from its initial implementation.

A backfill MUST define:

- source range;
- intended destination scope;
- pipeline/code version;
- concurrency;
- resource limits;
- write strategy;
- interaction with live ingestion;
- validation;
- rollback/recovery approach.

A backfill MUST NOT accidentally advance or overwrite the live pipeline checkpoint unless explicitly designed to do so.

Backfill execution SHOULD be logically separable from live execution.

### 2.11.1 Backfill safety

Historical processing MUST be idempotent or execute into isolated output before atomic promotion.

Large backfills SHOULD use bounded concurrency.

Backfills MUST NOT be permitted to starve production workloads.

Database, warehouse, stream, and API quotas MUST be considered before execution.

### 2.11.2 Reprocessing policies

The platform SHOULD distinguish:

- missing-data backfill;
- failed-run retry;
- historical recomputation;
- corrected-source replay;
- transformation-version rebuild.

These operations SHOULD NOT be represented as one undifferentiated "rerun" operation.

---

## 2.12 Replay

Streaming pipelines SHOULD retain sufficient source history to support the required replay horizon.

Replay MUST begin from a precisely defined:

- offset;
- sequence;
- timestamp boundary;
- partition boundary;
- snapshot version.

Replay MUST preserve source ordering guarantees where downstream correctness depends on them.

Replayed events MUST remain distinguishable operationally from original live processing when that information is needed for audit or troubleshooting.

A replay MUST NOT trigger non-repeatable external side effects unless those side effects are explicitly protected.

---

## 2.13 Deterministic transformation

Transformations SHOULD be deterministic whenever practical.

Given:

- the same input;
- the same transformation version;
- the same reference data/version;
- the same configuration;

the transformation SHOULD produce the same logical output.

Use of implicit current time, random values, mutable external lookups, or environment-dependent behaviour SHOULD be avoided.

If non-deterministic input is required, it MUST be explicit and captured sufficiently for reproducibility where the domain requires it.

---

## 2.14 Transformation versioning

Material transformation logic SHOULD be versioned.

Where historical values may need recomputation, the system SHOULD be able to identify which transformation version produced existing data.

Changing transformation semantics MUST trigger explicit consideration of:

- historical rebuild;
- forward-only application;
- migration;
- compatibility.

Transformation changes MUST NOT silently rewrite historical semantics unless that is the approved behaviour.

---

## 2.15 Raw and canonical layers

Platforms MAY retain source-aligned raw data where justified.

Raw storage SHOULD preserve sufficient source fidelity to support:

- audit;
- debugging;
- reprocessing;
- schema investigation.

Raw storage MUST NOT bypass:

- Security;
- data classification;
- retention;
- residency;
- encryption;
- access-control requirements.

Canonical/curated layers SHOULD expose stable domain semantics independent of irrelevant source quirks.

Downstream consumers SHOULD depend on canonical contracts where available rather than individually normalising the same raw source.

---

## 2.16 Data contracts

Every material ingestion interface SHOULD have an explicit data contract.

The contract MUST define, as applicable:

- owner;
- source;
- dataset/event name;
- schema;
- field types;
- field semantics;
- required/optional fields;
- nullability;
- keys;
- uniqueness;
- event identity;
- ordering;
- units;
- timezone;
- enum semantics;
- deletion semantics;
- compatibility policy;
- sensitivity/classification;
- retention;
- expected volume;
- freshness expectation.

A schema alone is not a complete data contract.

Data meaning MUST NOT depend solely on tribal knowledge.

---

## 2.17 Contract ownership

Every production dataset or event stream MUST have an accountable producing owner.

Consumers MUST have a defined escalation path for contract violations.

Producer teams MUST communicate breaking changes according to the approved compatibility process.

Consumer pipelines MUST NOT rely indefinitely on undocumented implementation details of a source system.

---

## 2.18 Schema evolution

Schema evolution MUST have a compatibility policy.

The policy SHOULD distinguish:

- additive compatible changes;
- compatible type widening;
- removals;
- renames;
- nullability changes;
- semantic changes;
- incompatible type changes.

New optional fields MAY usually be treated as compatible.

Removing or changing the meaning of an existing field MUST be considered breaking unless the contract explicitly defines otherwise.

Renaming a field MUST NOT be assumed to be additive plus removal if existing consumers require the original identity.

### 2.18.1 Semantic drift

Schema compatibility does not guarantee semantic compatibility.

A field whose type remains `string` but whose meaning, unit, enum vocabulary, or formatting changes MAY represent a breaking change.

Semantic changes MUST be versioned or communicated as contract changes.

---

## 2.19 Schema drift handling

Unexpected schema drift MUST produce an explicit operational outcome.

Pipelines MUST choose a policy such as:

- reject incompatible records;
- quarantine them;
- route to a compatibility handler;
- pause the affected pipeline.

Pipelines MUST NOT silently coerce arbitrary unknown schemas into apparently valid canonical records.

Automatic schema evolution SHOULD be limited to approved compatible changes.

Production tables MUST NOT blindly add columns or change types based solely on an untrusted incoming payload.

---

## 2.20 Schema registry or equivalent governance

Event-oriented platforms SHOULD use a schema registry or equivalent versioned contract mechanism where multiple producers/consumers depend on structured messages.

Schemas SHOULD be:

- versioned;
- testable;
- discoverable;
- associated with compatibility rules.

Deployments SHOULD verify compatibility before publishing incompatible contracts.

Runtime failure SHOULD NOT be the first indication that a schema change broke consumers.

---

## 2.21 Validation layers

Validation SHOULD occur at the earliest boundary capable of making the decision reliably.

Validation MAY include:

1. transport validation;
2. structural/schema validation;
3. field validation;
4. relational validation;
5. domain/business validation;
6. destination integrity validation.

Validation rules MUST distinguish invalid data from pipeline infrastructure failure.

A malformed record MUST NOT necessarily fail an entire large ingestion run if the contract permits per-record quarantine.

Conversely, structural failures affecting the trustworthiness of the whole dataset MUST NOT be reduced to harmless row warnings.

---

## 2.22 Validation severity

Validation rules SHOULD have defined severity.

Useful classes MAY include:

- fatal;
- quarantine;
- warning;
- informational.

Severity MUST correspond to actual operational consequence.

Warnings MUST NOT become an unbounded mechanism for ignoring bad data.

Repeated warning conditions SHOULD trigger review if they exceed defined thresholds.

---

## 2.23 Quarantine

Records that cannot safely enter canonical storage but may require investigation SHOULD be placed in quarantine.

Quarantine MUST preserve sufficient context to diagnose the failure.

This MAY include:

- source;
- source identifier;
- ingestion timestamp;
- pipeline/run ID;
- schema version;
- validation code;
- safe error detail;
- payload or payload reference where permitted.

Quarantine MUST obey the same Security and data-classification requirements as the original record.

Quarantine MUST NOT become permanent unmanaged storage.

It MUST define:

- retention;
- access control;
- remediation process;
- replay/release process;
- monitoring.

A quarantined record MUST NOT disappear from operational accounting.

---

## 2.24 Poison records

A permanently invalid input that repeatedly causes processing failure MUST NOT remain in an infinite retry loop.

The pipeline MUST detect or bound repeated failures.

Depending on domain requirements, the record SHOULD:

- move to quarantine;
- move to a dead-letter destination;
- be marked terminally failed;
- trigger operator intervention.

The pipeline MUST preserve sufficient evidence for investigation without exposing prohibited sensitive content.

---

## 2.25 Orchestration

Multi-stage pipelines MUST have an explicit orchestration model.

Orchestration MUST define:

- task dependency;
- scheduling;
- triggering;
- retry;
- timeout;
- concurrency;
- backfill behaviour;
- cancellation;
- success criteria.

Task dependencies MUST represent true data/control dependencies.

Artificial dependencies added only to force a convenient execution order SHOULD be avoided.

---

## 2.26 Task boundaries

An orchestration task SHOULD represent a coherent retryable unit.

Tasks SHOULD be small enough that failure recovery does not require unnecessary reprocessing.

Tasks SHOULD be large enough that orchestration overhead does not dominate useful work.

A task MUST NOT report success before its durable outputs satisfy its contract.

Partially written final outputs MUST NOT be represented as successfully committed output.

Temporary/staging locations SHOULD be used when atomic publication requires them.

---

## 2.27 Dependency readiness

A downstream task MUST NOT start merely because an upstream process exists or a clock time has elapsed.

Readiness SHOULD be based on an explicit condition such as:

- successful upstream run;
- committed partition;
- dataset availability marker;
- event;
- checkpoint;
- data-quality gate.

Fixed sleep delays MUST NOT be used as a primary dependency mechanism.

---

## 2.28 Scheduling

Scheduled ingestion MUST define timezone semantics.

Schedules involving local civil time MUST explicitly account for daylight-saving behaviour where applicable.

A daily pipeline MUST define what business/data interval "daily" means.

Execution time and logical data interval MUST NOT be conflated.

For example, a run executing at 01:00 on Tuesday MAY process Monday's data.

The logical interval MUST be explicit in metadata and observability.

---

## 2.29 Retries

Transient failures SHOULD be retried automatically.

Permanent failures MUST NOT be retried indefinitely.

Retry policy MUST define:

- maximum attempts or maximum elapsed time;
- initial delay;
- backoff;
- jitter where appropriate;
- retryable failure classes;
- non-retryable failure classes.

Exponential backoff with jitter SHOULD be used for distributed services where synchronized retries could worsen an incident.

Authentication failure, validation failure, malformed schemas, and permission denial SHOULD generally NOT be retried as transient infrastructure failures unless a specific recovery condition exists.

---

## 2.30 Retry storms

The platform MUST protect downstream systems from retry storms.

Protection MAY include:

- exponential backoff;
- jitter;
- circuit breaking;
- concurrency limits;
- rate limits;
- queue buffering;
- global retry budgets.

A recovering dependency MUST NOT immediately receive the full accumulated retry load without controlled ramp-up.

---

## 2.31 Dead-letter handling

Dead-letter destinations MAY be used when processing can continue safely while individual events require investigation.

A dead-letter record SHOULD preserve:

- original event identity;
- safe payload or reference;
- source location;
- failure stage;
- error classification;
- attempt count;
- first/last failure time;
- schema version;
- pipeline version.

Dead-letter queues/topics MUST NOT be treated as an automatic correctness mechanism.

Sending an event to DLQ does not make data loss acceptable.

Every DLQ MUST have:

- monitoring;
- ownership;
- retention;
- investigation procedure;
- replay procedure.

An unmonitored DLQ is non-conformant.

---

## 2.32 Backpressure

Streaming systems MUST have defined backpressure behaviour.

When consumers cannot sustain producer throughput, the system MUST avoid uncontrolled memory growth or silent loss.

Backpressure strategies MAY include:

- durable buffering;
- partition scaling;
- consumer scaling;
- rate limiting;
- source throttling where supported.

Lag MUST be observable.

Backlog growth MUST trigger alerts before source retention limits threaten recoverability.

---

## 2.33 Ordering

Ordering guarantees MUST be documented by scope.

Global ordering MUST NOT be assumed unless the platform explicitly provides it.

Where ordering is required per entity, messages SHOULD be partitioned or keyed consistently by the required ordering key.

Changing partition keys MUST be treated as a behavioural contract change.

Consumers MUST be able to tolerate out-of-order arrival when the transport does not guarantee the order they require.

---

## 2.34 Deletes

Ingestion contracts MUST define deletion semantics.

Possible representations include:

- physical delete;
- tombstone;
- soft-delete marker;
- status transition;
- validity interval.

A missing record in a snapshot MUST NOT automatically be interpreted as deletion unless the source contract guarantees complete snapshot semantics.

CDC consumers MUST handle delete events explicitly.

Deletion handling MUST comply with retention, privacy, legal hold, and audit requirements.

---

## 2.35 Source correction

Sources MAY correct historical records.

Pipelines MUST define how corrections propagate.

Possible strategies include:

- upsert current canonical state;
- append correction event;
- rebuild affected partitions;
- maintain temporal history.

"Previously processed" MUST NOT automatically mean "permanently immutable" unless the source contract guarantees immutability.

---

## 2.36 Referential dependencies

Pipelines ingesting related entities MUST define behaviour when dependencies arrive out of order.

The implementation MAY:

- defer dependent records;
- use staging;
- retry;
- quarantine;
- permit temporary unresolved relationships where the canonical model allows them.

Foreign-key constraints MUST NOT be disabled permanently merely to make ingestion ordering easier.

Data integrity requirements remain authoritative.

---

## 2.37 Security

All ingestion paths MUST comply with the Security standard.

### 2.37.1 Authentication and authorization

Source and destination connections MUST use approved authentication.

Service identities SHOULD be dedicated to the pipeline.

Permissions MUST follow least privilege.

Ingestion jobs MUST NOT use unrestricted administrator/database-owner credentials merely for operational convenience.

### 2.37.2 Secrets

Credentials, keys, tokens, and certificates MUST be stored in approved secret-management mechanisms.

Secrets MUST NOT appear in:

- pipeline source code;
- orchestration configuration committed to repositories;
- payload logs;
- error messages;
- dashboards;
- dead-letter metadata.

### 2.37.3 Encryption

Sensitive data MUST be encrypted in transit and at rest according to classification requirements.

Intermediate and quarantine storage MUST NOT receive weaker controls than final storage merely because it is temporary.

### 2.37.4 Data minimisation

Pipelines MUST ingest only data necessary for the approved purpose.

"Copy everything in case it is useful later" MUST NOT be the default ingestion policy for sensitive data.

---

## 2.38 Data classification and lineage

Ingested datasets SHOULD carry data-classification metadata.

Sensitive classifications MUST propagate through derived datasets where sensitivity remains applicable.

Lineage SHOULD identify, where appropriate:

- source dataset;
- transformation;
- pipeline version;
- destination;
- upstream/downstream relationships.

Derived datasets MUST NOT lose governance merely because they were transformed.

---

## 2.39 API ingestion

Pipelines consuming APIs MUST respect the API's published contract.

They MUST account for:

- pagination/cursors;
- rate limits;
- authentication expiry;
- retry semantics;
- idempotency;
- versioning;
- partial responses;
- deletion semantics.

The pipeline MUST NOT assume that HTTP `200` alone proves complete data ingestion.

Cursor exhaustion, response completeness, record counts, and error bodies MUST be handled according to the API contract.

Rate-limit responses MUST NOT cause aggressive immediate retry.

---

## 2.40 File ingestion

File-based ingestion MUST define:

- naming/identity;
- encoding;
- schema;
- delimiter/format;
- compression;
- completeness signal;
- transfer integrity;
- duplicate-file behaviour;
- archival/retention.

A pipeline MUST NOT process a file while the producer is still writing it unless the protocol guarantees safe concurrent consumption.

Completeness SHOULD be established through mechanisms such as:

- atomic rename;
- manifest;
- completion marker;
- object-finalisation event;
- checksum.

Filename timestamp alone MUST NOT prove completeness.

---

## 2.41 File identity and duplicate detection

File pipelines SHOULD maintain stable source-file identity.

Duplicate detection MAY use:

- source object ID/version;
- canonical path + generation;
- checksum;
- manifest ID;
- producer-provided batch ID.

Filename alone SHOULD NOT be assumed unique unless the contract guarantees uniqueness.

Re-uploading corrected content under the same filename MUST have explicit semantics.

---

## 2.42 Integrity verification

Where corruption or incomplete transport is material, pipelines SHOULD verify integrity using appropriate:

- checksums;
- hashes;
- record counts;
- manifests;
- source/target reconciliation.

Integrity checks MUST be performed at meaningful trust boundaries.

A matching row count alone does not prove semantic correctness.

---

## 2.43 Reconciliation

Material pipelines SHOULD implement reconciliation appropriate to their risk.

Reconciliation MAY compare:

- record counts;
- source/destination totals;
- checksums;
- aggregate control totals;
- sequence continuity;
- missing IDs;
- CDC positions.

Financial, regulatory, billing, identity, entitlement, or similarly high-consequence pipelines SHOULD implement stronger reconciliation than low-risk analytical feeds.

Successful task execution MUST NOT replace reconciliation where independent verification is required.

---

## 2.44 Throughput

Pipeline capacity MUST be defined in terms relevant to the workload.

Examples include:

- records/second;
- bytes/second;
- partitions/hour;
- files/hour;
- events/second;
- end-to-end latency.

Capacity targets SHOULD include expected normal load and credible burst conditions.

The system MUST NOT optimise peak throughput at the cost of violating correctness, source safety, or cost boundaries.

---

## 2.45 Concurrency

Concurrency SHOULD be bounded.

Increasing workers MUST NOT be treated as a universal performance fix.

Concurrency decisions MUST consider:

- source limits;
- sink limits;
- connection pools;
- database contention;
- partition count;
- ordering;
- API quotas;
- memory;
- cost.

A pipeline MUST NOT create unbounded concurrent tasks from unbounded input.

---

## 2.46 Batching

Streaming or API ingestion MAY batch writes when doing so improves throughput or cost.

Batch size MUST balance:

- latency;
- memory;
- transaction size;
- retry impact;
- sink limitations.

Extremely large batches SHOULD be avoided when a single bad record would force expensive replay of otherwise valid work.

The batch unit SHOULD remain idempotent.

---

## 2.47 Cost control

Production ingestion MUST have explicit resource boundaries where workload scale can materially affect cost.

Cost controls MAY include:

- concurrency limits;
- warehouse sizing;
- auto-suspend;
- job timeouts;
- partition pruning;
- incremental processing;
- file compaction;
- bounded retention;
- sampling for non-critical telemetry;
- backfill budgets.

Pipelines MUST NOT repeatedly scan or recompute complete historical datasets when incremental processing provides equivalent correctness.

A backfill MUST have an estimated impact when it can materially affect shared infrastructure or spend.

---

## 2.48 Small-file control

Lake/object-storage pipelines SHOULD avoid uncontrolled proliferation of very small objects.

Small-file accumulation can increase:

- metadata operations;
- planning overhead;
- query cost;
- downstream processing overhead.

Compaction SHOULD be performed where appropriate.

Compaction MUST preserve logical data correctness and lineage.

---

## 2.49 Partitioning

Partitioning MUST follow actual access and processing patterns.

Partition keys MUST NOT be selected solely because they are conventional.

The design SHOULD consider:

- ingestion pattern;
- query pruning;
- update/delete behaviour;
- skew;
- cardinality;
- retention;
- backfills.

Over-partitioning MUST be avoided.

A single hot partition MUST be treated as a capacity defect when it materially prevents scaling.

---

## 2.50 Pipeline observability

Every production pipeline MUST emit sufficient observability signals to determine:

- whether it is running;
- whether it is succeeding;
- whether it is making progress;
- whether the data is correct enough to publish;
- whether it is fresh;
- where failure occurred.

Observability MUST include metrics and structured logs appropriate to the platform.

Distributed traces SHOULD be used when execution crosses multiple services and correlation materially improves diagnosis.

---

## 2.51 Required run metadata

Scheduled or batch pipeline runs SHOULD record:

- pipeline name;
- run ID;
- logical data interval;
- start time;
- finish time;
- code/version;
- status;
- attempt;
- source position/range;
- input count;
- accepted count;
- rejected/quarantined count;
- output count;
- checkpoint;
- error class.

Streaming pipelines SHOULD expose equivalent continuous-state metadata.

---

## 2.52 Core pipeline metrics

Production ingestion SHOULD measure, where applicable:

- records/bytes received;
- records/bytes written;
- records rejected;
- records quarantined;
- duplicates detected;
- retry count;
- error rate;
- processing latency;
- end-to-end latency;
- throughput;
- queue depth;
- consumer lag;
- watermark;
- last successful checkpoint;
- last successful ingestion time;
- source/destination reconciliation difference.

Metrics MUST avoid high-cardinality labels that make observability infrastructure unsafe or prohibitively expensive.

Record IDs, user IDs, raw URLs, or arbitrary error text SHOULD NOT become metric labels.

---

## 2.53 Freshness

Material datasets MUST have an explicit freshness definition.

Freshness SHOULD be expressed from the consumer/data perspective rather than merely scheduler health.

A dataset that has an hourly job marked "green" MAY still be stale.

A freshness SLI SHOULD measure something equivalent to:

**current time − latest successfully available source/event time**

or another domain-appropriate measure.

Freshness MUST NOT be inferred solely from the most recent process start.

---

## 2.54 Freshness SLOs

Business-critical or dependency-critical datasets MUST have a documented freshness SLO.

The SLO SHOULD define:

- measurement;
- objective;
- observation window;
- ownership;
- alert threshold;
- allowed exceptions.

Examples include requirements conceptually equivalent to:

- 99.9% of the month, customer-state data is less than 10 minutes behind source;
- daily finance close dataset available by 06:00 local business time.

The chosen SLO MUST reflect actual consumer requirements.

Every pipeline MUST NOT automatically receive an aggressive real-time SLO.

SLOs SHOULD distinguish business-critical lateness from harmless scheduling variation.

---

## 2.55 Completeness and correctness SLIs

Freshness alone is insufficient.

Material pipelines SHOULD also define SLIs for:

- completeness;
- correctness/validation success;
- duplication;
- availability.

A pipeline that rapidly publishes half of its expected records is not healthy merely because freshness is low.

---

## 2.56 Alerting

Alerts MUST be actionable.

Alerts SHOULD be generated for symptoms requiring intervention, such as:

- freshness SLO risk/breach;
- stalled watermark;
- sustained consumer lag;
- repeated pipeline failure;
- elevated quarantine;
- DLQ growth;
- reconciliation mismatch;
- source retention risk.

Operators SHOULD NOT be paged for every transient task retry if automatic recovery remains within the defined reliability budget.

Alerts MUST identify:

- affected pipeline/dataset;
- environment;
- failure class;
- relevant run/window;
- runbook or diagnostic entry point where available.

---

## 2.57 Stalled-pipeline detection

Streaming pipelines MUST detect lack of progress independently of process liveness.

A process can be alive while consuming no data.

Health SHOULD therefore consider signals such as:

- offset advancement;
- watermark advancement;
- event throughput;
- checkpoint advancement.

Heartbeat alone MUST NOT establish pipeline health.

---

## 2.58 Logging

Pipeline logs MUST be structured where supported.

Logs SHOULD include correlation fields such as:

- pipeline;
- run;
- task;
- attempt;
- source;
- partition;
- trace/correlation ID.

Logs MUST NOT routinely contain complete raw payloads.

Sensitive data MUST be redacted according to Security standards.

Expected row-level validation failures SHOULD be aggregated or sampled where logging every record would create excessive cost or exposure.

---

## 2.59 Tracing

Tracing SHOULD be used for ingestion paths spanning multiple networked services when it materially helps explain latency or failure.

Trace context SHOULD propagate through asynchronous boundaries where supported.

Tracing MUST NOT require placing sensitive business payloads into span attributes.

---

## 2.60 Data-quality observability

Data validation MUST produce aggregate observability.

Teams SHOULD be able to answer:

- what fraction passed;
- what fraction failed;
- which validation classes failed;
- whether quality is degrading;
- which source or partition is affected.

Data-quality metrics SHOULD support trends over time.

A pipeline MUST NOT silently accept increasing validation failures because individual jobs still complete.

---

## 2.61 Operational ownership

Every production pipeline MUST have an identified owning team or service owner.

Ownership SHOULD cover:

- source contract;
- runtime operation;
- downstream publication;
- incident response.

A pipeline MUST have an escalation path.

Mission-critical pipelines SHOULD have a runbook.

A runbook SHOULD explain, as applicable:

- common failures;
- safe retry;
- replay;
- backfill;
- checkpoint recovery;
- DLQ handling;
- schema failure;
- source outage;
- rollback.

---

## 2.62 Deployment

Pipeline code MUST follow normal deployment and change-management standards.

Production pipelines MUST NOT be edited manually in-place as the primary release mechanism.

Changes SHOULD be version controlled, reviewable, and reproducible.

Pipeline deployments SHOULD be testable independently of production data.

Breaking contract changes MUST NOT be deployed solely because producer and consumer happen to deploy simultaneously unless the deployment mechanism guarantees that coordination.

---

## 2.63 Testing

Pipeline tests SHOULD cover:

- normal input;
- duplicate input;
- retry after partial failure;
- invalid record;
- schema evolution;
- empty input;
- late input;
- out-of-order input;
- source outage;
- sink outage;
- backfill;
- replay;
- checkpoint recovery;
- high-volume behaviour.

High-consequence pipelines SHOULD test failure at commit boundaries.

Idempotency MUST be tested by executing equivalent input more than once.

A replayable pipeline SHOULD be tested through an actual controlled replay path rather than only unit-level transformation tests.

---

## 2.64 Contract testing

Producers and consumers SHOULD have automated contract validation where practical.

Compatibility tests SHOULD execute before deployment.

Breaking contract changes SHOULD fail CI/CD rather than waiting for a production consumer failure.

Representative payload fixtures MUST follow data-classification requirements.

Production customer data SHOULD NOT be copied into test fixtures without an approved process.

---

## 2.65 Observability validation

Pipeline deployment SHOULD verify that required observability remains present.

A pipeline MUST NOT be considered production-ready when data moves successfully but:

- freshness cannot be measured;
- failures cannot be correlated to runs;
- quarantine cannot be monitored;
- checkpoint progress cannot be observed.

---

## 2.66 Operator-facing UI

Where ingestion operations have a web console, shadcn/ui MUST provide the Component baseline.

Operator consoles SHOULD expose:

- pipeline/run status;
- freshness;
- throughput;
- lag;
- quarantined/DLQ counts;
- retries;
- source and logical interval;
- safe operational actions.

Dangerous actions such as:

- replay;
- backfill;
- checkpoint reset;
- DLQ redrive;
- data deletion;

MUST follow canonical destructive/confirmation Patterns.

A visually hidden or disabled action MUST NOT be considered an authorization boundary.

All operations MUST be authorized server-side.

---

## 2.67 Forms & Validation relationship

Operator forms for:

- backfill intervals;
- replay offsets;
- filters;
- batch sizes;
- concurrency;
- data import;

MUST follow Forms & Validation standards.

Client validation MAY protect against obvious mistakes but MUST NOT replace server validation.

Dangerous numeric or temporal ranges MUST be validated against platform safety limits.

A user MUST NOT be able to request an unrestricted historical backfill merely by modifying the client payload if the service imposes a safe maximum.

---

## 2.68 Accessibility relationship

Operator-facing ingestion tools MUST follow the Accessibility standard.

Pipeline status MUST NOT rely on colour alone.

Tables showing runs, offsets, failures, or quarantined records MUST follow the canonical Tables & Data Grid standard.

Live status interfaces SHOULD avoid excessive announcements.

Keyboard users MUST be able to execute all permitted operational actions.

Confirmation dialogs MUST preserve accessible focus behaviour.

---

## 2.69 Design Tokens and Component relationship

Operational ingestion interfaces MUST consume canonical Design Tokens and Components.

Status colours MUST use the same semantic meanings as the wider application.

"Failed," "warning," "running," and "successful" MUST NOT invent ingestion-specific arbitrary colour semantics.

Backend pipeline architecture MUST remain independent of shadcn/ui.

The UI framework MUST NOT determine ingestion protocol, data model, or orchestration architecture.

---

## 2.70 State Management relationship

Operator UI state MUST be separated from authoritative pipeline state.

The browser MUST NOT be the canonical owner of:

- job execution;
- checkpoint;
- retry state;
- replay state;
- pipeline progress.

Client state MAY represent controls and optimistic presentation, but authoritative execution state MUST originate from backend/orchestrator systems.

Polling, subscriptions, or stream updates MUST reconcile to authoritative server state.

---

## 2.71 API relationship

Operational APIs controlling ingestion MUST define explicit contracts.

High-impact actions SHOULD use identifiers such as:

- run ID;
- pipeline ID;
- replay request ID;
- backfill request ID.

Control APIs SHOULD be idempotent where operators or automation may retry them.

Starting the same backfill twice accidentally MUST be prevented where duplicate execution would be harmful.

Long-running ingestion operations SHOULD return an operation/run resource rather than holding an interactive HTTP request open for the entire execution.

---

## 2.72 Jobs & Queue relationship

Ingestion tasks executed through job/queue infrastructure MUST follow the Jobs & Queue standard.

The ingestion layer defines:

- data correctness;
- source/destination semantics;
- checkpointing;
- replay.

The Jobs & Queue layer defines:

- dispatch;
- worker execution;
- queue semantics;
- worker retry;
- scheduling infrastructure.

Queue delivery semantics MUST NOT automatically be assumed to provide ingestion-level exactly-once semantics.

---

## 2.73 Exceptions

A deviation from this standard MUST document:

- affected pipeline;
- requirement being waived;
- reason;
- correctness impact;
- security impact;
- data-loss/duplication risk;
- operational recovery;
- expiry or review date where appropriate.

Repeated exceptions SHOULD result in improvement of the platform Pattern rather than permanent local workarounds.

---

# 3. Anti-patterns

The following are non-conformant unless explicitly covered by an approved exception.

## 3.1 "Exactly once" by assertion

A pipeline is described as exactly once because its message broker or framework has an exactly-once feature, while external side effects remain outside that transaction boundary.

## 3.2 Retry equals idempotency

A job is considered safe because the orchestrator retries it, despite repeated execution producing duplicate rows or side effects.

## 3.3 Checkpoint before commit

Progress is recorded before destination output is durably committed.

## 3.4 Timestamp-only cursor without guarantees

`updated_at > last_timestamp` is used despite shared timestamps, limited precision, delayed commits, or mutable clocks.

## 3.5 Full reload forever

Large historical datasets are scanned and rewritten on every run even though a safe incremental model is available.

## 3.6 CDC as domain events

Database mutations are exposed as if they inherently encode business intent.

## 3.7 Snapshot/CDC gap

The initial snapshot and CDC start position are not coordinated, allowing missing changes.

## 3.8 Infinite poison retry

The same malformed record is retried indefinitely.

## 3.9 DLQ graveyard

Failures are sent to a dead-letter queue that has no owner, alert, retention, or redrive procedure.

## 3.10 Quarantine as permanent storage

Invalid records accumulate indefinitely without remediation or retention policy.

## 3.11 Silent schema coercion

Unexpected fields or incompatible types are coerced until records appear valid.

## 3.12 Auto-evolve production schema

Incoming untrusted payloads directly alter production destination schemas without compatibility governance.

## 3.13 Schema-only contract

A JSON/Avro/Protobuf/database schema is treated as the complete contract without semantics, ownership, freshness, or compatibility rules.

## 3.14 Processing-time analytics

Processing timestamp is substituted for event time simply because it is easier to query.

## 3.15 Backfill on live checkpoint

Historical backfill mutates the active live-processing watermark and causes skips or duplicates.

## 3.16 Replay with side effects

Historical replay re-sends emails, charges, webhooks, or notifications unintentionally.

## 3.17 Manual production patch pipeline

Operators repair data routinely with one-off production scripts outside versioned ingestion logic.

## 3.18 Sleep dependency

A downstream pipeline waits an arbitrary number of minutes rather than depending on explicit data readiness.

## 3.19 Retry storm

Thousands of workers retry a failing downstream service simultaneously without backoff or jitter.

## 3.20 Unlimited concurrency

Worker count scales without regard to source/database/API capacity.

## 3.21 Heartbeat-only health

A streaming process is considered healthy because the process is running despite its offset or watermark being stalled.

## 3.22 Green-but-stale pipeline

The scheduler reports success while no current data has arrived, and no freshness metric detects the condition.

## 3.23 Row-count-only quality

Equal source and target record counts are treated as proof that data is correct.

## 3.24 Raw payload logging

Sensitive complete events or records are routinely logged for debugging.

## 3.25 Metric-cardinality explosion

Record IDs, customer IDs, exception strings, URLs, or other unbounded values are used as metric labels.

## 3.26 Hidden ingestion failure

Invalid rows are dropped without quarantine, rejection counts, or alerts.

## 3.27 Source overload

Backfills or snapshots saturate the production database to maximise ingestion speed.

## 3.28 Filename means complete

A file is consumed immediately upon appearance even though it may still be uploading.

## 3.29 Filename means unique

Duplicate detection relies solely on filenames without a producer guarantee.

## 3.30 UI-owned job

An ingestion operation stops or loses authoritative state because the browser session closed.

## 3.31 Admin credential ingestion

Pipelines use broad database-administrator or cloud-administrator identities because permission design was not implemented.

## 3.32 Current-time transformation

Derived values depend implicitly on `now()` such that replay of historical input produces different semantics.

## 3.33 No replay horizon

Stream retention is shorter than the stated incident-recovery or backfill requirement.

## 3.34 Real time by default

A streaming architecture is introduced where a simple scheduled batch would satisfy consumer needs more reliably and economically.

---

# 4. Checklist

A production ingestion pipeline conforms to this standard only when the following can be answered **yes** where applicable.

### Architecture

- [ ] Batch, streaming, CDC, or hybrid mode is explicitly selected.
- [ ] The selected mode follows an actual latency and business requirement.
- [ ] ETL versus ELT responsibilities are clear.
- [ ] CDC is not being used as an accidental substitute for domain events.
- [ ] Snapshot/bootstrap behaviour is defined.

### Delivery and idempotency

- [ ] Delivery semantics are documented.
- [ ] Any exactly-once claim has an explicit transactional boundary.
- [ ] Retryable stages are idempotent where required.
- [ ] Stable event or operation identity exists.
- [ ] Data and checkpoint commit ordering cannot cause silent loss.
- [ ] External side effects have explicit duplicate protection.

### Incremental processing

- [ ] Change-detection semantics are documented.
- [ ] Watermark/checkpoint semantics are precise.
- [ ] Watermarks never advance beyond safely committed data.
- [ ] Timestamp cursors have deterministic tie-breaking where necessary.
- [ ] Overlap windows are paired with idempotency.
- [ ] Event, ingestion, and processing time are distinguished.

### Streaming

- [ ] Ordering guarantees are documented by scope.
- [ ] Partition/key strategy follows required ordering.
- [ ] Late-data policy exists.
- [ ] Backpressure behaviour exists.
- [ ] Lag is measurable.
- [ ] Replay retention meets the recovery requirement.

### Backfills and replay

- [ ] Historical processing is designed, not improvised.
- [ ] Backfills do not corrupt live checkpoints.
- [ ] Backfill concurrency is bounded.
- [ ] Live workloads are protected.
- [ ] Replay boundaries are precise.
- [ ] Replays cannot duplicate prohibited external side effects.
- [ ] Transformation versions can be identified where required.

### Data contracts

- [ ] Producer ownership is identified.
- [ ] Field semantics, keys, nullability, and types are documented.
- [ ] Compatibility policy exists.
- [ ] Sensitivity/classification is documented.
- [ ] Freshness expectations are documented.
- [ ] Deletion semantics are explicit.
- [ ] Semantic drift is treated as a contract change.

### Validation and quarantine

- [ ] Structural and domain validation occurs at appropriate boundaries.
- [ ] Validation failures are classified by severity.
- [ ] Invalid records cannot silently enter trusted canonical data.
- [ ] Quarantine has retention, ownership, and remediation.
- [ ] Poison inputs cannot retry forever.
- [ ] Rejected and quarantined records are included in operational accounting.

### Orchestration

- [ ] Task dependencies represent real readiness.
- [ ] Fixed sleeps are not used for primary dependency coordination.
- [ ] Task success means durable output was committed.
- [ ] Retries distinguish transient from permanent failure.
- [ ] Backoff and jitter are configured where appropriate.
- [ ] Timeouts and concurrency limits exist.
- [ ] Logical data intervals are distinct from execution timestamps.

### Dead-letter handling

- [ ] DLQ use has a defined correctness rationale.
- [ ] Failed events contain enough safe diagnostic context.
- [ ] DLQ growth is monitored.
- [ ] Ownership exists.
- [ ] Retention exists.
- [ ] A tested redrive/replay path exists.

### Security

- [ ] Pipeline identities use least privilege.
- [ ] Secrets use approved secret management.
- [ ] Sensitive data is encrypted where required.
- [ ] Temporary, staging, quarantine, and raw layers receive appropriate security controls.
- [ ] Ingestion follows data-minimisation requirements.
- [ ] Logs and telemetry exclude prohibited sensitive payloads.

### Performance and cost

- [ ] Required throughput and latency are measurable.
- [ ] Concurrency is bounded.
- [ ] Source and sink limits are respected.
- [ ] Batch sizes have intentional limits.
- [ ] Full historical recomputation is avoided where unnecessary.
- [ ] Backfills have resource/cost controls.
- [ ] Partitioning follows actual access patterns.
- [ ] Small-file accumulation is controlled where applicable.

### Data integrity

- [ ] Appropriate reconciliation exists.
- [ ] Deletes have defined semantics.
- [ ] Source corrections propagate intentionally.
- [ ] Out-of-order dependent records have a defined policy.
- [ ] Temporary partial output cannot masquerade as complete output.

### Observability

- [ ] Run or stream progress is observable.
- [ ] Input/output/rejected counts are measured where meaningful.
- [ ] Retry and failure rates are observable.
- [ ] Lag/watermark/checkpoint state is observable.
- [ ] Freshness is measured from a consumer/data perspective.
- [ ] Stalled processing can be distinguished from process liveness.
- [ ] Data-quality failures are observable.
- [ ] Metrics avoid uncontrolled cardinality.

### Freshness and reliability

- [ ] Important datasets have defined freshness expectations.
- [ ] Critical datasets have freshness SLOs.
- [ ] Completeness/correctness SLIs exist where freshness alone is insufficient.
- [ ] Alerting occurs before recoverability is threatened.
- [ ] Alerts are actionable and routed to an owner.

### Operations

- [ ] The pipeline has an owner.
- [ ] Critical pipelines have operational runbooks.
- [ ] Retry, replay, backfill, checkpoint recovery, and DLQ procedures are documented where applicable.
- [ ] Pipeline code is version-controlled and reproducibly deployed.
- [ ] Idempotency and replay behaviour are tested.

### Cross-standard alignment

- [ ] Data & Database integrity rules remain authoritative.
- [ ] API ingestion follows API contracts and rate limits.
- [ ] Jobs & Queue delivery semantics are not confused with ingestion-level guarantees.
- [ ] Backend state remains authoritative over operator UI state.
- [ ] Operator forms use canonical validation.
- [ ] Operational UI follows Accessibility requirements.
- [ ] Operator tables follow Tables & Data Grid standards.
- [ ] shadcn/ui and Design Tokens are used only for presentation and do not dictate backend architecture.

---

# 5. Canonical summary

Data ingestion MUST be designed under the assumption that **retries, duplicate delivery, late data, schema changes, partial failure, source outages, and historical reprocessing will occur**.

**Batch SHOULD be preferred when batch satisfies the requirement. Streaming MUST solve a real latency or continuous-processing requirement.**

**CDC SHOULD capture database change efficiently, but database mutation MUST NOT automatically be treated as business intent.**

**At-least-once transport with deterministic idempotent processing SHOULD be the default distributed design where it provides the required correctness.**

**"Exactly once" MUST NOT be claimed without identifying the precise transactional boundary across which it is guaranteed.**

**Retries MUST be safe. Replay MUST be safe. Backfills MUST be safe.**

**Data and checkpoint progress MUST NOT be committed in an order that can silently lose data.**

**Incremental loads MUST use trustworthy progress markers. Timestamp-only watermarks MUST NOT be assumed safe without precision, ordering, and tie-breaking guarantees.**

**Event time, ingestion time, and processing time MUST remain distinct concepts.**

**Late data and out-of-order data MUST have an explicit policy. Silent loss is not a policy.**

**Backfills MUST be isolated from live checkpoint state and MUST operate within controlled concurrency and resource budgets.**

**Data contracts MUST define meaning, ownership, compatibility, sensitivity, and freshness—not merely structure.**

**Schema drift MUST produce a deliberate compatibility outcome. Pipelines MUST NOT silently coerce incompatible data until it appears valid.**

**Invalid data MUST be rejected, quarantined, or otherwise accounted for explicitly. Quarantine and dead-letter destinations MUST have ownership, retention, monitoring, and recovery procedures.**

**Retries MUST distinguish transient failure from permanent invalidity. Infinite retry loops and retry storms are non-conformant.**

**Concurrency, throughput, and backfills MUST respect source, sink, infrastructure, and cost boundaries.**

**Pipeline health MUST measure progress and data freshness, not merely whether a process or scheduler is running.**

**Freshness SLOs MUST be defined from the consumer's perspective for material datasets. A green scheduler does not prove fresh data.**

**Critical pipelines SHOULD measure completeness and correctness in addition to freshness.**

**Security applies to every ingestion stage, including raw, staging, quarantine, DLQ, logs, telemetry, and backfill infrastructure.**

**Operator-facing tools MUST follow the same Security, State Management, Forms & Validation, Accessibility, Design Tokens, Component, Pattern, and Tables & Data Grid standards as the rest of the platform. shadcn/ui is the UI baseline; it is not part of the ingestion architecture.**

The Gold Standard is achieved when any production pipeline can be **retried, inspected, reconciled, replayed, backfilled, and recovered without relying on luck, duplicate side effects, silent data loss, or undocumented operator knowledge.**

The reliability model is consistent with current platform guidance: Debezium documents at-least-once delivery unless stronger Kafka Connect transactional guarantees are used, while Kafka's exactly-once mechanism explicitly couples processing, state, output records, and consumed offsets within its transaction boundary. citeturn559583search5turn749928search5 Airflow likewise recommends retry-safe/idempotent tasks and provides explicit historical reprocessing controls for backfills. citeturn559583search8turn559583search10 The observability section follows the current logs/metrics/traces model and SLI/SLO terminology documented by OpenTelemetry. citeturn559583search0turn559583search2
