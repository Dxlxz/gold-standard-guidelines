---
id: "data-database"
title: "Data & Database Guidelines — Gold Standard"
domain: "data"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["data", "database"]
applies_to: ["data"]
related: ["code-review"]
legacy_number: 11
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 78736
provenance: baseline

---

Below is the complete **Data & Database Gold Standard**, designed to sit immediately after Architecture and Security in the master engineering standard.

# Data & Database Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical standards for:

- data modeling;
- relational databases;
- NoSQL databases;
- schemas;
- keys;
- constraints;
- transactions;
- migrations;
- indexes;
- queries;
- tenant isolation;
- security;
- backups;
- replication;
- retention;
- archival;
- analytics boundaries;
- data lifecycle;
- performance;
- operational ownership.

The database is not merely storage.

It is a system responsible for preserving:

```text
Identity
Relationships
Invariants
History
Consistency
Durability
```

The core principle is:

> **Data correctness takes precedence over implementation convenience.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless there is a documented reason not to.
- **SHOULD NOT** — generally prohibited unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
Risk
Owner
Compensating control
Review date
```

---

# 3. Database Technology Default

For general transactional web applications, the organizational default SHOULD be:

```text
PostgreSQL
```

unless a workload provides a concrete reason to use another database.

Reasons may include:

- document-specific workloads;
- specialized search;
- time-series workloads;
- graph traversal;
- extreme key-value scale;
- analytical workloads;
- embedded/offline use.

Do not introduce another database merely because it is fashionable.

---

# 4. One Database Is Usually Enough Initially

Start with the minimum number of persistent technologies.

Preferred:

```text
PostgreSQL
+
Object storage when needed
+
Cache only when needed
```

before:

```text
PostgreSQL
MongoDB
Redis
Elasticsearch
ClickHouse
Graph database
```

for a product that has not demonstrated those needs.

Every additional database introduces:

- operations;
- backup;
- monitoring;
- security;
- consistency;
- migration;
- failure modes.

---

# 5. Data Architecture Principle

Choose storage according to data semantics.

Ask:

```text
What is authoritative?
What must be transactional?
What relationships matter?
What consistency is required?
How is the data queried?
How long must it survive?
How sensitive is it?
```

Then choose technology.

---

# 6. Source of Truth

Every important data concept MUST have one authoritative source.

Example:

```text
Subscription state
→ Billing database

Search result
→ projection, not source of truth

Analytics dashboard
→ analytical copy, not operational truth
```

Avoid multiple independently mutable copies of the same business fact.

---

# 7. Data Ownership

Every important dataset MUST have an owner.

Ownership includes:

```text
Schema
Meaning
Access
Retention
Security
Quality
Migration
Backup
Recovery
```

---

# 8. Domain Ownership

Data SHOULD belong to the domain that owns its business semantics.

Example:

```text
Billing
owns:
subscriptions
invoices
payments
```

Projects should not casually mutate billing data.

---

# 9. Database Is Not a Global Shared Object

Avoid:

```text
Any feature
→ any table
```

Prefer:

```text
Domain
→ owns tables
→ exposes operations
```

even inside a modular monolith.

---

# 10. Logical Ownership in Shared Databases

A modular monolith MAY share one physical PostgreSQL database.

Logical ownership still matters.

Example:

```text
identity.*
projects.*
billing.*
```

or equivalent conceptual ownership.

Physical schema separation is optional.

Logical responsibility is mandatory.

---

# 11. Relational First

Use relational modeling when data contains:

- identities;
- relationships;
- invariants;
- transactions;
- structured querying.

Relational databases remain a strong default for product systems.

---

# 12. NoSQL Decision

Use NoSQL when workload characteristics justify it.

Potential reasons include:

```text
Massive key-value access
Flexible document structure
Specialized horizontal partitioning
Low-latency distributed access
```

Do not choose NoSQL merely to avoid schema design.

---

# 13. Polyglot Persistence

Use multiple databases only when different workloads genuinely require different persistence models.

Each database MUST have:

```text
Owner
Purpose
Source-of-truth status
Backup strategy
Monitoring
Security model
```

---

# 14. Operational vs Analytical Data

Separate:

```text
OLTP
→ operational transactions

OLAP
→ analysis/reporting
```

when analytical workloads materially impact transactional performance or require different schemas.

Do not turn the primary production database into an unrestricted analytics warehouse.

---

# 15. Schema Design Philosophy

A schema should encode the business model.

Do not treat tables merely as implementation containers.

The schema should make invalid states difficult to represent.

---

# 16. Model the Domain

Prefer:

```text
workspaces
memberships
projects
invoices
subscriptions
```

over abstract:

```text
entities
objects
records
items
things
```

unless the domain genuinely requires generic entities.

---

# 17. Tables

One table SHOULD generally represent one coherent entity or relation.

Do not combine unrelated concepts merely to reduce table count.

---

# 18. Table Naming

Use one naming convention.

Recommended:

```text
snake_case
plural table names
```

Example:

```text
users
workspace_memberships
payment_methods
```

Consistency matters more than whether singular or plural is chosen.

---

# 19. Column Naming

Use:

```text
snake_case
```

with clear semantic names.

Good:

```text
created_at
workspace_id
email_verified_at
```

Avoid:

```text
cdate
wid
ev
```

unless abbreviation is canonical domain language.

---

# 20. Reserved Words

Avoid SQL/database reserved words for table and column names.

Avoid ambiguous names such as:

```text
user
order
group
key
```

when they create quoting requirements or confusion.

---

# 21. Naming Reflects Meaning

Prefer:

```text
deleted_at
```

over:

```text
status_flag_3
```

Names should expose semantics without requiring code archaeology.

---

# 22. Primary Keys

Every entity table SHOULD have a stable primary key.

Primary keys MUST:

- uniquely identify the row;
- remain stable;
- not depend on mutable business attributes.

---

# 23. Public vs Internal IDs

Distinguish when necessary:

```text
database identity
public resource identity
business identifier
```

They MAY be the same value.

They do not have to be.

---

# 24. Surrogate Keys

Surrogate keys are recommended for many application entities.

Examples:

```text
UUID
ULID
other stable generated ID
```

Use natural keys when the domain guarantees their stability and uniqueness.

---

# 25. UUIDs

UUIDs are appropriate when:

- distributed ID generation matters;
- IDs are exposed externally;
- predictable sequential IDs are undesirable;
- merging datasets is possible.

Use a canonical UUID generation strategy.

---

# 26. Time-Sortable IDs

Time-sortable identifiers MAY improve:

- index locality;
- operational sorting;
- distributed creation.

Use a standard implementation.

Do not invent custom ID formats casually.

---

# 27. Human-Readable IDs

Business-facing identifiers MAY be separate.

Example:

```text
internal id:
0194...

invoice number:
INV-2026-001482
```

Do not use mutable display names as primary identity.

---

# 28. Foreign Keys

Relationships that must remain valid SHOULD use foreign-key constraints.

Example:

```text
projects.workspace_id
→ workspaces.id
```

Application validation alone is not sufficient for important referential integrity.

---

# 29. Referential Integrity

The database SHOULD enforce relationships whenever practical.

Prevent:

```text
membership
→ references nonexistent workspace
```

rather than relying on application cleanup later.

---

# 30. Foreign Key Actions

Choose deliberately:

```text
RESTRICT
CASCADE
SET NULL
```

Never add `ON DELETE CASCADE` merely because it is convenient.

Understand the business consequence.

---

# 31. Cascading Deletes

Cascading deletes are appropriate where child data has no independent meaning.

Example:

```text
temporary child configuration
```

They are dangerous where deletion has substantial business or compliance impact.

---

# 32. NOT NULL

Use `NOT NULL` when absence is not a valid state.

Do not leave columns nullable merely because adding constraints requires more thought.

Nullability is part of the domain model.

---

# 33. NULL Semantics

`NULL` should mean something deliberate.

Usually:

```text
unknown
not supplied
not applicable
```

Do not use `NULL` inconsistently to mean:

```text
empty
false
zero
deleted
default
```

depending on the query.

---

# 34. Defaults

Database defaults are useful when there is one safe canonical default.

Examples:

```text
created_at
boolean initial state
version number
```

Do not hide meaningful business decisions behind invisible database defaults.

---

# 35. CHECK Constraints

Use CHECK constraints for simple database-level invariants.

Examples:

```text
amount >= 0

percentage BETWEEN 0 AND 100
```

Database constraints provide a final line of correctness.

---

# 36. UNIQUE Constraints

Use unique constraints for actual uniqueness requirements.

Example:

```text
workspace_id + slug
```

Do not implement uniqueness solely through:

```text
SELECT
then
INSERT
```

which is vulnerable to races.

---

# 37. Composite Uniqueness

Use composite constraints when uniqueness exists within scope.

Example:

```text
UNIQUE(workspace_id, email)
```

if email uniqueness is tenant-specific.

---

# 38. Constraints Are Documentation

Constraints document the data model.

A schema containing:

```text
PK
FK
NOT NULL
UNIQUE
CHECK
```

is easier to reason about than one relying entirely on undocumented application assumptions.

---

# 39. Database Constraints vs Application Validation

Use both where appropriate.

Application validation provides:

```text
good UX
domain-specific errors
```

Database constraints provide:

```text
final integrity
concurrency safety
```

They are complementary.

---

# 40. Booleans

Use booleans for actual binary state.

Avoid multiple ambiguous booleans representing a state machine.

Bad:

```text
is_active
is_cancelled
is_pending
is_completed
```

where contradictory combinations are possible.

---

# 41. Enumerated State

For exclusive workflow state, prefer a canonical state field.

Example:

```text
status =
draft
submitted
approved
rejected
```

State transition rules belong in domain logic.

---

# 42. Database ENUMs

Database-native enums MAY be useful for highly stable closed domains.

Consider migration implications before adoption.

For rapidly evolving state, a constrained textual representation may be easier to migrate.

---

# 43. String Length

Set meaningful limits.

Do not use:

```text
VARCHAR(255)
```

mechanically for everything.

Limits should reflect domain constraints where useful.

---

# 44. TEXT

Use unbounded text types when the domain permits long content.

Application-level size limits may still be required for security and performance.

---

# 45. Numbers

Use integer/numeric types based on domain requirements.

Do not store numbers as strings without reason.

---

# 46. Money

Never use binary floating-point for authoritative monetary values.

Use:

```text
integer minor units
```

or:

```text
fixed precision decimal/numeric
```

according to financial requirements.

---

# 47. Currency

Money values MUST include currency context when multiple currencies are possible.

Example:

```text
amount
currency
```

Never assume currency solely from deployment region.

---

# 48. Monetary Precision

Define precision per domain.

Some currencies do not use two decimal places.

Financial representation must not assume all currencies behave identically.

---

# 49. Percentages

Store percentages with explicit semantics.

Clarify whether:

```text
0.15
```

means:

```text
15%
```

or whether:

```text
15
```

means `15%`.

Use one convention.

---

# 50. Dates vs Timestamps

Distinguish:

```text
calendar date
timestamp/instant
local time
duration
```

They are not interchangeable.

---

# 51. Timestamps

Authoritative event timestamps SHOULD normally represent an absolute instant.

Use timezone-aware semantics.

Avoid relying on database server local timezone.

---

# 52. UTC

Persist absolute timestamps in a consistent canonical timezone representation, commonly UTC.

Convert to user locale/timezone at presentation boundaries.

---

# 53. Local Calendar Dates

Values such as:

```text
birthday
billing date
public holiday
```

may be calendar dates without timezone semantics.

Do not convert them as timestamps unnecessarily.

---

# 54. Time Zones

If a business rule depends on timezone, store the timezone explicitly.

Example:

```text
scheduled_at
timezone
```

where required.

---

# 55. Created and Updated Timestamps

Most mutable domain records SHOULD have:

```text
created_at
updated_at
```

where operationally useful.

Do not add audit columns mechanically to immutable lookup tables without purpose.

---

# 56. Actor Fields

Security/business-sensitive mutations MAY record:

```text
created_by
updated_by
deleted_by
```

where audit semantics require them.

Do not confuse these convenience fields with a complete audit log.

---

# 57. JSON Columns

JSON/JSONB is useful for:

- variable metadata;
- external payload snapshots;
- sparse extensible attributes;
- configuration.

Do not use JSON merely to avoid schema design.

---

# 58. JSON Is Not a Schema Escape Hatch

Bad:

```text
data JSONB
```

containing the entire core business object.

If fields are:

- important;
- frequently queried;
- constrained;
- related;

they likely deserve first-class columns/tables.

---

# 59. JSON Validation

Important JSON structures SHOULD still be validated at the application boundary.

Document their schema.

---

# 60. Arrays

Database arrays MAY be suitable for small atomic value collections.

Avoid arrays when elements:

- require independent identity;
- need frequent querying;
- have relationships;
- require metadata.

Use relational tables instead.

---

# 61. Many-to-Many Relationships

Use join tables.

Example:

```text
users
roles
user_roles
```

Join tables MAY contain relationship-specific fields.

---

# 62. Relationship Entities

If a relationship has meaningful behavior, model it as an entity.

Example:

```text
workspace_membership
```

may own:

```text
role
joined_at
invited_by
status
```

---

# 63. Polymorphic Relationships

Use polymorphic relationships cautiously.

They often weaken foreign-key enforcement.

Prefer explicit relationships when the set of target types is small and stable.

---

# 64. Generic Entity Tables

Avoid:

```text
entity_type
entity_id
key
value
```

as the default architecture for domain data.

Generic schemas trade short-term flexibility for weak integrity and poor discoverability.

---

# 65. EAV

Entity-attribute-value models SHOULD be reserved for genuinely dynamic schemas.

They are rarely appropriate for ordinary application entities.

---

# 66. Normalization

Normalize transactional data enough to:

- preserve integrity;
- avoid contradictory copies;
- model relationships clearly.

Do not denormalize before identifying a real performance need.

---

# 67. Denormalization

Denormalization MAY be appropriate for:

- performance;
- reporting;
- read models;
- projections.

Every duplicate value requires an explicit synchronization strategy.

---

# 68. Derived Data

Do not persist easily derived values unless there is a reason.

Prefer:

```text
derive
```

when calculation is cheap and canonical.

Persist when:

- computation is expensive;
- historical snapshot matters;
- query performance requires it.

---

# 69. Snapshot Data

Sometimes retaining a historical snapshot is correct.

Example:

```text
invoice customer name/address at issue time
```

should not necessarily change when the customer's current profile changes.

Distinguish snapshots from duplication mistakes.

---

# 70. Mutable vs Immutable Data

Define whether records are:

```text
mutable
append-only
immutable
```

according to domain semantics.

Financial/audit events often benefit from append-oriented design.

---

# 71. Immutable Records

Do not mutate historical facts merely for convenience.

Example:

```text
payment transaction
```

may require compensating entries rather than rewriting history.

---

# 72. Audit Trail

Critical systems SHOULD maintain durable audit information for meaningful changes.

Audit information should identify:

```text
actor
action
resource
before/after where appropriate
time
result
```

---

# 73. Audit Log Is Not Application Log

Application logs answer:

```text
What happened operationally?
```

Audit logs answer:

```text
Who did what to which protected/business resource?
```

Treat them separately.

---

# 74. Soft Delete

Use soft deletion only when a real requirement exists.

Examples:

- recovery;
- audit;
- regulatory workflow;
- business history.

Do not add `deleted_at` to every table automatically.

---

# 75. Soft Delete Complexity

Soft delete affects:

```text
uniqueness
queries
indexes
relationships
analytics
security
```

Every query must understand whether deleted data is visible.

---

# 76. Hard Delete

Use hard deletion where records should actually disappear and no retention requirement exists.

Deletion policy must be explicit.

---

# 77. Tombstones

For distributed systems, deletion may require a tombstone so downstream systems can learn that an object was removed.

Do not simply disappear a record if replicas/projections need deletion events.

---

# 78. Data Lifecycle

Every sensitive or important dataset SHOULD define:

```text
Creation
Active use
Archive
Retention
Deletion
Backup expiry
```

---

# 79. Data Retention

Do not retain data indefinitely by default.

Retention should reflect:

- product need;
- security;
- legal requirements;
- operational requirements.

---

# 80. Archival

Move rarely accessed historical data out of hot operational paths when scale warrants it.

Archive architecture must preserve retrieval requirements.

---

# 81. Purging

Data purge processes SHOULD be:

```text
bounded
observable
restartable
safe
```

Do not issue enormous unbounded delete operations against production tables without planning.

---

# 82. PII

Personally identifiable information SHOULD have:

```text
clear owner
purpose
retention
access control
deletion behavior
```

Do not collect PII casually.

---

# 83. Sensitive Fields

Classify sensitive database fields.

Examples:

```text
credentials
financial data
government identifiers
private health information
security tokens
```

Apply stronger controls.

---

# 84. Encryption in Transit

Production database connections MUST use protected transport where exposure warrants it.

Do not send sensitive database traffic over insecure networks.

---

# 85. Encryption at Rest

Sensitive production databases SHOULD use supported encryption-at-rest controls.

Encryption complements authorization.

It does not replace it.

---

# 86. Field-Level Encryption

Field-level encryption MAY be appropriate where database-level protection is insufficient.

Use when threat model warrants additional separation.

Define:

```text
key ownership
rotation
query implications
recovery
```

---

# 87. Passwords

Passwords MUST NOT be stored in plaintext or reversibly encrypted.

Use the authentication standard's approved password hashing scheme.

---

# 88. Tokens

Authentication/session/API tokens SHOULD NOT be stored in plaintext when validation can be performed against a secure hash.

Exact architecture depends on token type.

---

# 89. Secrets

Database tables should not become a generic secret-management system.

Use approved secret management for infrastructure credentials.

---

# 90. Database Credentials

Applications MUST use dedicated database identities.

Do not run ordinary application traffic as:

```text
root
postgres
database owner
superuser
```

---

# 91. Least Privilege

Database identities SHOULD receive only required privileges.

Separate where appropriate:

```text
runtime
migration
read-only analytics
backup
administration
```

---

# 92. Network Isolation

Production databases SHOULD be exposed only to required systems.

They SHOULD NOT normally be directly accessible from the public internet.

OWASP similarly recommends restricting backend database network access to the minimum required hosts. citeturn274092search3

---

# 93. SQL Injection

All queries containing untrusted values MUST use parameterized queries or equivalent safe structured APIs.

Never concatenate user input into executable SQL.

OWASP identifies parameterized queries/prepared statements as a primary SQL injection defense. citeturn274092search0turn274092search1

---

# 94. Dynamic Identifiers

Parameters cannot normally represent:

```text
table names
column names
sort direction
```

Map dynamic structural choices through explicit allowlists.

Example:

```text
sort = "name"
↓
code maps to known column
```

Never insert arbitrary client-provided SQL identifiers.

---

# 95. Escaping Is Not Primary Defense

Do not rely on escaping user input as the standard SQL injection strategy.

Use:

```text
parameterization
+
validation
```

instead. OWASP describes escaping as a fragile, discouraged fallback compared with parameterized approaches. citeturn274092search0turn274092search2

---

# 96. ORM Safety

An ORM does not automatically make all queries safe.

Unsafe raw queries can still create injection vulnerabilities.

Follow safe parameterization for raw SQL.

---

# 97. Raw SQL

Raw SQL is acceptable when it improves:

- performance;
- clarity;
- database capability;
- maintainability.

It MUST remain:

- parameterized;
- tested;
- reviewed.

Do not avoid raw SQL dogmatically.

---

# 98. ORM Principle

ORMs are mapping/query tools.

They are not replacements for understanding:

```text
SQL
indexes
transactions
constraints
query plans
```

---

# 99. Repository/Data Access Layer

Use a data-access layer when it creates meaningful:

- ownership;
- policy;
- testability;
- domain isolation.

Do not create generic repository abstractions automatically.

---

# 100. Do Not Hide SQL Entirely

Developers working with relational systems SHOULD understand the queries their abstractions generate.

Database performance cannot be managed through abstraction ignorance.

---

# 101. Query Ownership

Complex/high-impact queries SHOULD have identifiable ownership.

Know which feature produces expensive database work.

---

# 102. SELECT Explicit Columns

Prefer selecting required fields.

Avoid:

```sql
SELECT *
```

for stable application contracts unless all fields are intentionally required.

This reduces:

- bandwidth;
- coupling;
- accidental exposure.

---

# 103. Excessive Data Retrieval

Queries SHOULD return only required rows and columns.

Do not retrieve 100,000 records to filter 20 in application memory.

---

# 104. Filtering

Filter at the database where practical.

Databases are optimized for data selection.

---

# 105. Pagination

Large collections MUST have bounded retrieval.

Use:

```text
cursor/keyset pagination
```

where large-scale stable pagination matters.

Offset pagination MAY be appropriate for smaller/simple datasets.

---

# 106. Page Size

Every paginated API/query SHOULD enforce a maximum page size.

Never permit client-controlled unlimited retrieval.

---

# 107. Offset Pagination

Offset pagination is simple and appropriate for many cases.

Limitations include:

- increasing scan cost;
- instability under concurrent writes.

Understand these tradeoffs.

---

# 108. Cursor Pagination

Prefer cursor/keyset pagination for:

- large datasets;
- frequently changing data;
- feeds;
- APIs needing stable pagination.

Cursor ordering MUST be deterministic.

---

# 109. Stable Ordering

Pagination requires stable order.

Example:

```text
ORDER BY created_at, id
```

not merely:

```text
ORDER BY created_at
```

if timestamps may tie.

---

# 110. Search Queries

Do not implement sophisticated search using increasingly complex `%LIKE%` scans indefinitely.

Use database full-text search or a dedicated search engine when requirements justify it.

---

# 111. N+1 Queries

N+1 queries are a defect when they materially increase query volume.

Example:

```text
1 query for projects
+
1 query per project owner
```

Use:

- joins;
- batching;
- eager loading;
- data loaders;

as appropriate.

---

# 112. Avoid Over-Fetching Relationships

The opposite problem also exists.

Do not eager-load enormous object graphs when only a few fields are needed.

---

# 113. Join Strategy

Use database joins where relational semantics and performance support them.

Do not rebuild relational joins in application code without reason.

---

# 114. Query Plans

Slow or important queries SHOULD be examined using the database's query-plan tooling.

Do not guess about database performance.

---

# 115. EXPLAIN

Use `EXPLAIN` / execution-plan analysis appropriately to understand:

```text
scan type
join strategy
row estimates
index usage
sorting
```

for problematic queries.

---

# 116. Query Performance Budget

Critical paths SHOULD establish reasonable query budgets.

Example:

```text
request:
≤ N database round trips
```

where useful.

Do not turn the budget into an arbitrary rule that prevents legitimate queries.

---

# 117. Slow Query Monitoring

Production systems SHOULD identify slow queries.

Capture enough context to determine:

```text
query
frequency
latency
caller
```

without leaking sensitive parameters.

---

# 118. Indexes

Indexes exist to support access patterns.

Do not create indexes merely because a column "looks important."

---

# 119. Index Every Primary Key

Primary keys should be indexed through the database's standard mechanism.

---

# 120. Foreign Key Indexing

Frequently joined/filtering foreign keys SHOULD usually be indexed.

Verify actual workload.

---

# 121. Index Query Patterns

Index based on:

```text
WHERE
JOIN
ORDER BY
```

patterns.

A useful index reflects query shape.

---

# 122. Composite Indexes

Column order matters.

Design composite indexes according to actual predicates and sorting.

Example:

```text
(workspace_id, created_at)
```

for tenant-scoped recent records.

---

# 123. Tenant Index Prefix

Multi-tenant queries frequently benefit from indexes beginning with tenant scope.

Example:

```text
(workspace_id, status)
```

if every query is workspace-scoped.

---

# 124. Partial Indexes

Partial indexes MAY improve performance for commonly queried subsets.

Example:

```text
active records only
undeleted records only
```

Use based on measured query patterns.

---

# 125. Unique Indexes

Use unique indexes/constraints to enforce actual uniqueness.

---

# 126. Over-Indexing

Every index costs:

```text
storage
write performance
vacuum/maintenance
migration time
```

Do not index every column.

---

# 127. Unused Indexes

Monitor and remove indexes proven unnecessary after appropriate review.

Do not delete solely from a short observation period.

---

# 128. Index Changes

Large index operations require production planning.

Use online/concurrent mechanisms where supported and required.

---

# 129. Transactions

Transactions protect invariants spanning multiple database operations.

Use them when partial completion would produce invalid state.

---

# 130. Transaction Boundary

Transactions should align with a business operation.

Example:

```text
Create order
+
order lines
+
reservation
```

where atomicity is required.

---

# 131. Keep Transactions Short

Avoid holding transactions open while performing:

```text
HTTP requests
email
large computation
user interaction
```

Long transactions increase:

- locks;
- contention;
- failure impact.

---

# 132. External Calls Inside Transactions

Avoid:

```text
BEGIN
database write
call payment provider
database write
COMMIT
```

unless architecture explicitly accounts for failure.

External systems cannot participate in ordinary local ACID transactions.

---

# 133. Isolation Levels

Choose transaction isolation according to correctness requirements.

Understand:

- dirty reads;
- non-repeatable reads;
- phantom behavior;
- serialization conflicts.

Do not use stronger isolation blindly.

---

# 134. Race Conditions

Application logic must account for concurrency.

Bad:

```text
check balance
↓
separate update
```

without concurrency protection.

Use:

- transactions;
- atomic updates;
- locks;
- constraints;
- optimistic concurrency;

as appropriate.

---

# 135. Optimistic Concurrency

For workflows where concurrent editing is possible, version fields MAY be useful.

Example:

```text
version
```

Update only when expected version still matches.

---

# 136. Pessimistic Locking

Use row locking when strong serialization of a critical resource is required.

Keep lock duration short.

---

# 137. Deadlocks

Deadlocks can occur even in valid transactional systems.

Applications SHOULD:

```text
use consistent lock order
keep transactions short
retry safe deadlock failures
```

where appropriate.

---

# 138. Atomic Operations

Prefer atomic database operations over application read-modify-write where possible.

Example:

```sql
UPDATE counters
SET value = value + 1
```

rather than unsafe concurrent state manipulation.

---

# 139. Upserts

Use upsert operations when domain semantics genuinely permit create-or-update behavior.

Do not use them where creation vs modification has different authorization or business meaning.

---

# 140. Idempotency

Database writes supporting retryable operations SHOULD have idempotency where duplicate execution would be harmful.

Examples:

```text
payments
orders
webhooks
provisioning
```

---

# 141. Idempotency Keys

Store idempotency records with:

```text
key
scope
result
expiry
```

where appropriate.

---

# 142. Migrations

All production schema changes MUST use version-controlled migrations.

Never rely on developers manually modifying production schemas.

---

# 143. Migration Ownership

Each migration SHOULD be associated with the feature/change that requires it.

Migration files are production code.

---

# 144. Migration Review

Review migrations for:

```text
correctness
locking
runtime
data loss
rollback
compatibility
```

not merely syntax.

---

# 145. Forward-Only Migrations

Production database migrations MAY use a forward-fix model where reverting would risk data loss.

Rollback strategy should be deliberate.

Not every migration can safely be reversed.

---

# 146. Expand/Contract

Use expand/contract for breaking schema changes.

Example:

```text
1. Add new column.
2. Deploy code supporting old + new.
3. Backfill.
4. Switch reads/writes.
5. Remove old column later.
```

Avoid requiring schema and application changes to happen atomically across deployments.

---

# 147. Renaming Columns

Treat column rename as potentially breaking.

For zero-downtime environments:

```text
add
dual support
migrate
remove
```

may be safer than immediate rename.

---

# 148. Dropping Columns

Never drop a production column until:

- no deployed code reads it;
- no jobs depend on it;
- no analytics/reporting depends on it;
- backups/rollback implications are understood.

---

# 149. Adding NOT NULL

On large existing tables:

```text
backfill
validate
then enforce
```

rather than performing risky blocking changes blindly.

---

# 150. Backfills

Large data backfills SHOULD be:

```text
batched
restartable
observable
rate-limited
idempotent
```

when practical.

---

# 151. Never Hide Huge Backfills in App Startup

Avoid application startup code that silently migrates millions of production rows.

Use explicit migration jobs.

---

# 152. Migration Testing

Migrations SHOULD be tested against realistic schema/data sizes where risk warrants it.

A migration that runs instantly on an empty local database may behave very differently in production.

---

# 153. Migration Metrics

For high-risk migrations, monitor:

```text
duration
locks
database load
replication lag
errors
```

---

# 154. Seed Data

Seed scripts are for:

- development;
- test;
- required immutable reference data.

Do not mix arbitrary demo data into production migrations.

---

# 155. Reference Data

Canonical static/reference values MAY be managed through migrations or a dedicated controlled mechanism.

Examples:

```text
country codes
system permissions
```

depending on architecture.

---

# 156. Test Data

Test data MUST be clearly separated from production data.

Never populate production environments with default/demo credentials.

---

# 157. Production Data in Development

Avoid copying raw production data into:

```text
developer laptops
test
preview
staging
```

without explicit controls.

Prefer:

```text
synthetic
masked
anonymized
```

data.

---

# 158. Data Masking

Masking must preserve useful structure without retaining sensitive values.

Do not consider simple visual redaction sufficient if underlying identifiable values remain.

---

# 159. Multi-Tenancy

Tenant isolation is a database architecture requirement.

Every tenant-scoped record SHOULD have a clear tenant ownership path.

---

# 160. Tenant Key

A common shared-schema model uses:

```text
workspace_id
tenant_id
organization_id
```

on tenant-owned tables.

Use one canonical concept.

---

# 161. Tenant Query Rule

All tenant-scoped queries MUST establish tenant scope from trusted authorization context.

Never trust a client-supplied tenant ID alone.

---

# 162. Cross-Tenant Protection

Test attempts such as:

```text
authenticated Tenant A user
+
Tenant B object ID
```

against:

- read;
- update;
- delete;
- export;
- bulk operations.

---

# 163. Row-Level Security

Database row-level security MAY provide defense in depth for multi-tenant systems.

If used:

- policy ownership must be clear;
- application/database context must be correct;
- automated tenant-isolation tests are mandatory.

Do not adopt RLS without understanding operational complexity.

---

# 164. RLS Is Not a Substitute for Application Authorization

Database tenant isolation and business authorization solve related but distinct problems.

Keep both where required.

---

# 165. Separate Database Per Tenant

Use separate databases where requirements justify:

```text
strong isolation
customer-specific backup
residency
enterprise requirements
```

Accept increased operational cost.

---

# 166. Schema Per Tenant

Separate schema per tenant can provide isolation while sharing infrastructure.

Evaluate:

- migrations;
- tenant count;
- tooling;
- operations.

---

# 167. Shared Schema

Shared schema is often simplest for high tenant counts.

It requires disciplined tenant predicates and indexes.

---

# 168. Tenant Migration Strategy

Tenant architecture must define how:

```text
schema migrations
backups
exports
deletion
```

operate across tenants.

---

# 169. Connection Management

Applications SHOULD use appropriate connection pooling.

Do not allow each request to create uncontrolled database connections.

---

# 170. Connection Pool

Configure pools according to:

```text
database connection capacity
application instances
worker concurrency
query duration
```

More connections do not necessarily mean more throughput.

---

# 171. Connection Exhaustion

Connection exhaustion should be monitored.

A database with all connections consumed may become unavailable even when CPU usage is low.

---

# 172. Serverless Environments

Serverless architectures require deliberate pooling/proxy behavior because instance count can multiply connection demand.

Do not assume traditional process pool settings remain appropriate.

---

# 173. Connection Timeouts

Define:

```text
connect timeout
statement/query timeout
transaction timeout where useful
```

Do not allow indefinite waits.

---

# 174. Query Timeouts

Queries exposed to unpredictable workload SHOULD have reasonable execution bounds.

Handle timeout errors explicitly.

---

# 175. Long-Running Queries

Operational/analytical long-running work SHOULD be isolated from interactive request workloads where appropriate.

---

# 176. Database Resource Limits

Critical production systems SHOULD monitor:

```text
CPU
memory
storage
IO
connections
locks
replication lag
transaction age
```

---

# 177. Capacity Planning

Track growth in:

```text
rows
bytes
indexes
write volume
query volume
backup size
```

before capacity becomes an emergency.

---

# 178. Storage Growth

Data growth MUST have an expected retention/archival strategy.

Infinite accumulation is not a strategy.

---

# 179. Table Bloat / Maintenance

Understand the maintenance characteristics of the selected database engine.

Operational procedures should include the database's required routine maintenance mechanisms.

---

# 180. Statistics

Query optimizers depend on statistics.

Keep database statistics appropriately maintained.

Unexpected query-plan regressions may result from stale or incorrect estimates.

---

# 181. Partitioning

Use partitioning when data scale/access patterns justify it.

Common dimensions:

```text
time
tenant
region
```

Do not partition small tables merely because the database supports it.

---

# 182. Partitioning Tradeoffs

Partitioning affects:

- constraints;
- indexes;
- migrations;
- query planning;
- operational tooling.

Treat it as architecture.

---

# 183. Time Partitioning

Time-based partitioning can be useful for:

- logs;
- events;
- large time-series tables;
- retention.

It can simplify archival and deletion.

---

# 184. Sharding

Sharding is a major complexity increase.

Adopt only after simpler options have been evaluated.

Potential prior options:

```text
query optimization
indexes
vertical scaling
read replicas
archival
partitioning
```

---

# 185. Shard Key

A shard key affects:

```text
distribution
hotspots
cross-shard queries
transactions
resizing
```

Choose based on actual workload.

---

# 186. Cross-Shard Transactions

Avoid architectures requiring frequent cross-shard transactions.

This often indicates poor partition boundaries.

---

# 187. Read Replicas

Use read replicas for workloads that tolerate replica lag.

Examples:

```text
reporting
noncritical dashboards
read-heavy browsing
```

---

# 188. Read-After-Write

User workflows often expect to immediately see newly written data.

Do not route read-after-write requests to replicas without considering replication delay.

---

# 189. Replica Lag

Monitor replication lag.

Systems depending on replicas should define acceptable staleness.

---

# 190. Failover

High-availability database systems MUST define failover behavior.

Understand:

```text
automatic vs manual
expected downtime
data-loss risk
client reconnection
```

---

# 191. Primary Failure

Applications should handle database primary transitions without assuming connections survive forever.

Retry only when operation semantics make retry safe.

---

# 192. Backups

Critical production databases MUST be backed up.

Backups SHOULD define:

```text
frequency
retention
encryption
storage location
ownership
```

---

# 193. Backup ≠ Recovery

A backup strategy is incomplete until restoration has been tested.

---

# 194. Restore Testing

Critical systems SHOULD periodically perform restore tests.

Verify:

```text
backup readable
credentials available
procedure works
recovery time achievable
data integrity
```

---

# 195. RPO

Define Recovery Point Objective.

Example:

```text
RPO: 5 minutes
```

The backup/replication architecture must support it.

---

# 196. RTO

Define Recovery Time Objective.

Example:

```text
RTO: 30 minutes
```

Test whether this is achievable.

---

# 197. Point-in-Time Recovery

Point-in-time recovery SHOULD be available where recovery requirements justify it.

This protects against:

- accidental deletion;
- bad migrations;
- application corruption.

---

# 198. Backup Isolation

Backups should not share all failure modes with the primary database.

Consider:

```text
separate account
separate storage
immutability
retention protection
```

according to risk.

---

# 199. Backup Access

Backups contain production data and require equivalent or stronger access controls.

---

# 200. Disaster Recovery

Database DR documentation MUST define:

```text
primary failure
region failure where relevant
credential loss
corruption
operator error
```

---

# 201. Deletion and Backups

A deleted record may continue to exist temporarily in backups.

Retention/deletion promises must account for backup lifecycle.

---

# 202. Data Export

Where product/business requirements demand it, provide a reliable export path.

Exports SHOULD use documented formats.

---

# 203. Export Security

Sensitive exports require:

```text
authorization
audit logging
expiration
secure storage
```

Large exports may require asynchronous generation.

---

# 204. Import

Imported data is untrusted input.

Validate:

```text
schema
size
row count
relationships
permissions
```

before persistence.

---

# 205. Bulk Inserts

Large imports should use efficient batching/bulk operations.

Do not issue one transaction/network request per row unless volume is trivial.

---

# 206. Bulk Updates

Bulk operations require careful authorization.

Do not authorize only the collection and assume every selected object is permitted.

---

# 207. Search Index

A search index is normally a projection.

The primary database remains source of truth.

---

# 208. Search Synchronization

Define how records reach the search system.

Examples:

```text
outbox events
change data capture
scheduled indexing
```

---

# 209. Search Deletion

Deletion must propagate to search projections.

Do not leave private/deleted data searchable indefinitely.

---

# 210. Analytics Pipelines

Analytics ingestion SHOULD avoid direct coupling to production transactional schemas when scale/ownership requires separation.

Use controlled events, CDC, replicas, or ETL/ELT pipelines.

---

# 211. Analytics Definitions

Business metrics require canonical definitions.

Example:

```text
Active user
Revenue
Conversion
Churn
```

should not be independently defined by every analyst.

---

# 212. Analytics Freshness

Document whether analytics is:

```text
real-time
near-real-time
hourly
daily
```

Do not imply real-time accuracy when pipelines are delayed.

---

# 213. Data Warehouse

Introduce a warehouse when analytical workloads justify:

- columnar processing;
- broad historical analysis;
- large aggregations;
- cross-domain reporting.

---

# 214. Data Lake

A data lake is not automatically required for mature architecture.

Use when raw heterogeneous data retention provides a clear benefit.

Without governance, it can become a data swamp.

---

# 215. Data Lineage

Important analytical systems SHOULD understand:

```text
source
transformations
destination
```

for critical metrics/data products.

---

# 216. Change Data Capture

CDC MAY be useful for:

- analytics;
- replication;
- search;
- integration.

Do not treat raw database changes automatically as stable business events.

---

# 217. CDC vs Domain Events

CDC says:

```text
row changed
```

Domain event says:

```text
invoice paid
```

They serve different purposes.

Do not confuse them.

---

# 218. Cache vs Database

A cache is not a primary database unless specifically designed as one.

Cached values must be recoverable from authoritative sources or otherwise have explicit durability semantics.

---

# 219. Redis

Use Redis or similar systems for workloads such as:

```text
cache
ephemeral coordination
rate limiting
queues where appropriate
```

Do not move durable business data into Redis casually.

---

# 220. Cache Keys

Cache keys MUST include all context affecting the result.

Examples:

```text
tenant
resource
locale
permission scope
version
```

where applicable.

---

# 221. Cache Tenant Isolation

Never allow one tenant's cache entry to satisfy another tenant's request.

Tenant context must be encoded in keys or isolated physically.

---

# 222. Cache Invalidation

Every cached database value requires an invalidation or expiry strategy.

No invalidation strategy means caching architecture is incomplete.

---

# 223. Write-Through / Write-Behind

Use advanced cache write strategies only when requirements justify the complexity.

The authoritative source must remain clear.

---

# 224. Data Contracts

Cross-boundary data formats are contracts.

Examples:

```text
API schemas
events
exports
webhooks
```

Database schemas are not automatically public contracts.

---

# 225. Database Model vs API Model

Do not expose database records directly.

Preferred:

```text
Database entity
↓
domain/application model
↓
API response
```

This prevents persistence details from becoming permanent public API.

---

# 226. Database Column Names vs UI Labels

Do not couple UI wording directly to database schema naming.

The database represents domain semantics, not presentation copy.

---

# 227. Schema Changes vs API Changes

A database schema can change without breaking the public API.

Likewise, an API change may not require a schema change.

Treat boundaries separately.

---

# 228. Database Views

Views MAY provide:

- stable read abstraction;
- reporting;
- security boundaries.

Do not create layers of views that obscure where data originates.

---

# 229. Materialized Views

Materialized views MAY improve expensive read workloads.

Define:

```text
refresh mechanism
freshness
failure handling
```

---

# 230. Stored Procedures

Stored procedures MAY be appropriate for:

- data-intensive atomic operations;
- database-specific functionality;
- security boundaries;
- complex operations best executed near data.

Do not move all application business logic into stored procedures by default.

---

# 231. Triggers

Triggers SHOULD be used cautiously.

They are appropriate for certain:

```text
integrity
auditing
database-maintained metadata
```

cases.

Avoid hidden complex business workflows in triggers.

---

# 232. Trigger Visibility

If triggers materially affect data behavior, document them.

Hidden database behavior creates debugging difficulty.

---

# 233. Generated Columns

Generated/computed columns MAY be useful for deterministic derived values supported by the database.

Do not duplicate application business logic unnecessarily.

---

# 234. Sequence/Identity Values

Database sequences/identity columns are appropriate internal keys where global distributed generation is unnecessary.

Do not expose predictable identifiers where enumeration creates unacceptable risk without proper authorization.

---

# 235. Authorization Is Still Required

Unpredictable UUIDs do not replace authorization.

A resource ID is identification, not permission.

---

# 236. Database Error Handling

Translate database errors into meaningful application outcomes.

Examples:

```text
unique violation
→ conflict

foreign key failure
→ invalid relationship

serialization failure
→ safe retry where appropriate
```

Do not leak raw database errors to end users.

---

# 237. Unexpected Database Errors

Unexpected errors should:

```text
be logged
be correlated
return safe generic error
```

without exposing:

- connection strings;
- SQL;
- schema names;
- credentials.

---

# 238. Query Logging

Production query logging must balance observability and privacy.

Do not log sensitive parameters casually.

---

# 239. Parameter Redaction

Sensitive query values SHOULD be redacted in:

```text
APM
logs
traces
```

where required.

---

# 240. Database Metrics

Monitor:

```text
query latency
throughput
connection usage
lock waits
deadlocks
replication lag
disk usage
cache hit ratio
slow queries
```

as appropriate.

---

# 241. Alerts

Alerts should detect user-impacting/database-risk conditions.

Avoid alerts on every minor fluctuation.

---

# 242. Capacity Alerts

Alert before:

```text
disk full
connections exhausted
replication critically delayed
```

becomes an outage.

---

# 243. Lock Monitoring

Production systems with meaningful concurrent writes SHOULD have visibility into lock contention.

---

# 244. Long Transactions

Monitor unusually long transactions.

They can interfere with:

- vacuum/cleanup;
- locks;
- replication;
- migrations.

---

# 245. Schema Documentation

Important tables SHOULD be understandable through:

```text
clear naming
constraints
schema docs where needed
```

Do not depend solely on tribal knowledge.

---

# 246. Data Dictionary

Large systems SHOULD maintain a data dictionary for important business fields.

Define:

```text
meaning
owner
source
sensitivity
```

---

# 247. Database Documentation

A production database SHOULD document:

```text
Purpose
Owner
Engine/version
Topology
Backups
Recovery
Security
Migration process
Critical tables
```

---

# 248. ER Diagrams

ER diagrams MAY help explain important relationships.

They should not attempt to represent every technical table when that harms usefulness.

---

# 249. Schema as Code

Database schema and migrations MUST be version-controlled.

A database console is not the source of truth for schema evolution.

---

# 250. Production Manual Changes

Manual production schema/data changes should be exceptional.

If emergency changes are necessary:

```text
record
review
replicate into migration/code
```

afterward.

---

# 251. Administrative Queries

High-risk production manual queries SHOULD be reviewed or use controlled tooling.

Especially:

```text
DELETE
UPDATE
DROP
TRUNCATE
```

against important datasets.

---

# 252. Safer Production Operations

For manual changes:

```text
identify rows first
verify count
use transaction when suitable
capture backup/recovery path
execute bounded change
verify outcome
```

---

# 253. Read-Only Production Access

Prefer read-only access for ordinary debugging/analytics.

Write access should be more restricted.

---

# 254. Database Admin Access

Administrative database access SHOULD require stronger controls.

Examples:

```text
MFA
short-lived credentials
audit logging
approved network path
```

---

# 255. Data Access by Support Staff

Support personnel should not receive unrestricted database access merely for convenience.

Build appropriate support tooling.

---

# 256. Privacy by Architecture

If support does not need to see sensitive fields, architecture should prevent access rather than rely on policy alone.

---

# 257. Database Testing

Test database behavior at multiple levels.

```text
Unit:
domain logic

Integration:
real database behavior

Migration:
schema transitions

E2E:
critical user workflow
```

---

# 258. Real Database Integration Tests

For important database behavior, prefer integration tests against the actual database engine.

Mocks cannot accurately reproduce:

- transactions;
- constraints;
- SQL behavior;
- locking.

---

# 259. Test Database Isolation

Tests should isolate state through:

- transactions;
- separate schemas/databases;
- deterministic cleanup.

Tests must not depend on arbitrary execution order.

---

# 260. Fixture Design

Fixtures should be minimal and intentional.

Avoid one enormous shared database fixture used by every test.

---

# 261. Factory Data

Factories/builders MAY make domain test data easier to construct.

Defaults should remain valid.

---

# 262. Migration Tests

Critical migration paths SHOULD test:

```text
old schema
→ migrate
→ current application works
```

where practical.

---

# 263. Constraint Tests

Important invariants SHOULD have negative tests.

Example:

```text
duplicate workspace slug
→ rejected
```

---

# 264. Tenant Isolation Tests

Tenant boundaries require explicit integration tests.

Never rely solely on code review.

---

# 265. Performance Tests

Critical high-volume query paths SHOULD be performance tested against realistic data volumes when risk warrants it.

---

# 266. Synthetic Scale Data

Use synthetic large datasets for performance work rather than uncontrolled production data copies.

---

# 267. ORM Schema Generation

ORM-generated migrations MUST still be reviewed.

Generated does not mean safe.

---

# 268. Schema Drift

Production schema should match migration history.

Detect unauthorized/manual drift where operational maturity requires it.

---

# 269. Database Version Policy

Production databases SHOULD run supported database versions.

Plan upgrades before end-of-support becomes urgent.

---

# 270. Major Upgrades

Major database upgrades require:

```text
compatibility review
extension review
performance testing
backup
rollback/failover plan
```

---

# 271. Extension Policy

Database extensions add capability and operational dependency.

Before adding one, evaluate:

```text
maintenance
availability
managed-provider support
security
upgrade compatibility
```

---

# 272. Database Portability

Do not sacrifice major capabilities merely to remain theoretically database-independent.

Database-specific features are acceptable when their benefits justify lock-in.

Document important dependencies.

---

# 273. ORM Portability Myth

Using an ORM does not automatically make an application portable between database engines.

SQL semantics, indexes, transactions, and features still differ.

---

# 274. Database as Product Infrastructure

Treat the database as critical production infrastructure.

It requires:

```text
owner
monitoring
security
backup
capacity planning
upgrade lifecycle
```

---

# 275. Data Quality

Data correctness extends beyond schema validity.

Important datasets SHOULD define quality expectations such as:

```text
completeness
uniqueness
validity
freshness
consistency
```

---

# 276. Quality Checks

Automated data quality checks MAY be appropriate for:

- analytical pipelines;
- imports;
- migrations;
- critical integrations.

---

# 277. Reconciliation

Systems integrating financial or external authoritative data SHOULD support reconciliation.

Example:

```text
our payment records
↔
payment provider records
```

Do not assume successful webhook processing guarantees permanent consistency.

---

# 278. Financial Ledgers

Financial ledger-like systems SHOULD favor append-only entries and explicit balancing/reconciliation.

Do not model financial history merely as mutable account totals.

---

# 279. Counter Values

If a value can be recomputed from authoritative events, distinguish:

```text
cached balance
```

from:

```text
ledger source of truth
```

---

# 280. Counters Under Concurrency

Use atomic operations or transactional aggregates.

Do not implement unsafe:

```text
read count
count++
write count
```

under concurrency.

---

# 281. Sequence Numbers

Business sequence requirements such as invoice numbers require deliberate design.

Do not assume database primary-key ordering satisfies legal/business numbering semantics.

---

# 282. Time Ordering

Timestamps alone may not provide a perfect total ordering.

If exact ordering matters, use:

```text
sequence
version
event position
```

as appropriate.

---

# 283. Event Tables

High-volume event/history tables MAY require different:

- partitioning;
- indexing;
- retention;

than ordinary entities.

---

# 284. Append-Only Event Data

Append-only does not mean never delete.

Retention/privacy requirements may still require deletion or anonymization.

---

# 285. Logs Do Not Belong in Primary OLTP Forever

Application logs should generally go to observability infrastructure rather than indefinitely accumulating in primary business tables.

---

# 286. Data Residency

If residency requirements exist, architecture MUST define where:

```text
primary data
replicas
backups
logs
analytics copies
```

are stored.

---

# 287. Cross-Region Replication

Cross-region replication may affect:

- residency;
- consistency;
- recovery;
- latency.

It is not merely an infrastructure checkbox.

---

# 288. Data Localization

Some data may require tenant-specific residency.

Model region ownership explicitly where needed.

---

# 289. Data Deletion Across Systems

Deleting primary database data is insufficient if copies exist in:

```text
cache
search
analytics
object storage
backups
third-party providers
```

Define deletion propagation.

---

# 290. Deletion Events

Complex systems MAY publish deletion events so projections can remove data.

Ensure events do not themselves preserve prohibited sensitive content.

---

# 291. Right-to-Deletion Workflows

Where required, deletion should be an observable workflow with:

```text
request
authorization
execution
downstream cleanup
verification
```

---

# 292. Data Export Portability

Use stable interchange formats where practical.

Avoid proprietary binary exports when customer portability matters.

---

# 293. Import Idempotency

Large imports should be safely retryable where practical.

Track:

```text
import job
source row
result
```

if duplicate creation is a risk.

---

# 294. ETL/ELT Jobs

Data pipelines MUST define:

```text
source
destination
schedule
owner
retry
quality checks
freshness
```

---

# 295. Pipeline Failure

Analytics/data pipeline failure SHOULD NOT corrupt operational source data.

Use one-way boundaries where possible.

---

# 296. Schema Evolution for Events/Data Lakes

Long-lived serialized data needs versioning.

Do not assume today's schema can deserialize every historical object forever without a strategy.

---

# 297. Data Catalog

Large organizations MAY use a data catalog to track:

```text
datasets
owners
schemas
lineage
classification
```

Do not introduce one until organizational complexity justifies it.

---

# 298. Data Contracts Between Teams

High-value datasets consumed across teams SHOULD have explicit contracts.

Define:

```text
semantics
schema
freshness
owner
change policy
```

---

# 299. Schema Breaking Changes

A change can be breaking even if the database accepts it.

Examples:

```text
change semantics
change units
change timezone meaning
reinterpret enum value
```

Data semantics matter as much as data type.

---

# 300. Semantic Migration

When meaning changes, migrate data and consumers deliberately.

Do not rename a column while silently changing its meaning.

---

# 301. Data Ownership Transfer

Moving a dataset between domains requires:

```text
new owner
migration
contract update
access update
documentation
```

---

# 302. Duplicate Sources of Truth

Avoid:

```text
users.plan
subscriptions.plan
workspaces.plan
```

all independently writable.

Define one authority.

Other copies must be projections.

---

# 303. Derived Projection

A duplicated field may be acceptable when explicitly designated as:

```text
projection
cache
snapshot
```

Its source and update mechanism must be known.

---

# 304. Data Coupling

Cross-domain joins increase coupling.

Inside a modular monolith, some joins may be practical.

Do not allow convenience joins to erase ownership boundaries.

---

# 305. Cross-Service Queries

Do not create cross-service database joins.

If services are truly independent, integrate through:

```text
API
event
read model
```

---

# 306. Reporting Across Domains

Cross-domain reporting should generally use:

```text
warehouse
read model
replicated reporting database
```

when operational domain isolation matters.

---

# 307. Materialized Reporting Tables

Use reporting projections where complex live joins threaten operational performance.

Document freshness.

---

# 308. Database Procedures and Security

Stored procedures do not automatically prevent injection if they construct unsafe dynamic SQL.

Use safe parameterization inside them.

---

# 309. Database Roles

Avoid a single credential used by:

```text
application
migration
analytics
admin
backup
```

if privilege separation provides meaningful protection.

---

# 310. Migration Credentials

Migration identities may require stronger schema privileges than runtime applications.

Keep them separate where practical.

---

# 311. Read-Only Credentials

Analytics/reporting users SHOULD use read-only credentials.

---

# 312. Credential Rotation

Database credentials must be rotatable.

Prefer short-lived/workload identities where platform support exists.

---

# 313. Connection Strings

Connection strings MUST NOT be:

```text
hardcoded
committed
logged
returned to clients
```

Store them through approved configuration/secrets systems. OWASP likewise advises against hard-coded database connection strings. citeturn274092search4

---

# 314. Production Database Access

Ordinary application developers should not require unrestricted persistent production DB access.

Use controlled access procedures.

---

# 315. Break-Glass Access

Emergency privileged access SHOULD be:

```text
time-limited
audited
approved where practical
```

---

# 316. Data Exfiltration Protection

Database security architecture SHOULD consider:

```text
large exports
mass reads
admin queries
compromised credentials
```

not merely SQL injection.

---

# 317. Row Limits

Interactive endpoints should enforce maximum result counts.

Never allow accidental:

```text
SELECT every customer
```

through unbounded UI requests.

---

# 318. Batch Limits

Bulk requests require bounded batch sizes.

Large operations should be chunked or moved to background processing.

---

# 319. Statement Timeout

Potentially expensive user-driven queries SHOULD have time limits where practical.

---

# 320. Resource Governance

Where supported and required, use database-level resource controls for:

```text
analytics
reporting
maintenance
application
```

workloads.

---

# 321. Production Query Review

New high-cost query patterns may require review before deployment.

Examples:

```text
large joins
large aggregations
full-table scans
recursive queries
```

---

# 322. Query Hints

Avoid optimizer hints unless there is a measured and documented reason.

They can become brittle across data growth/version changes.

---

# 323. Database Cursors

Server/database cursors MAY be useful for very large sequential processing.

Use with explicit transaction/resource lifecycle.

---

# 324. Streaming Large Results

Do not load massive result sets entirely into application memory if streaming/batching is appropriate.

---

# 325. ORM Pagination

Ensure ORM pagination does not accidentally load all records before slicing in memory.

---

# 326. ORM Transactions

Understand how the ORM handles:

```text
connections
nested transactions
savepoints
retries
```

Do not assume API names map perfectly to database semantics.

---

# 327. ORM Lazy Loading

Lazy loading can create hidden N+1 behavior.

Prefer explicit data access in performance-sensitive code.

---

# 328. ORM Cascades

Review ORM-level cascades independently from database cascade behavior.

Unexpected cascade deletes/updates are high risk.

---

# 329. ORM Schema Sync

Production applications SHOULD NOT rely on automatic destructive schema synchronization.

Use explicit migrations.

---

# 330. Development Auto-Sync

Developer schema synchronization MAY be convenient locally.

It must not become the production deployment mechanism.

---

# 331. Database Naming in Code

Repository/domain APIs should use business semantics rather than exposing table-centric methods everywhere.

Prefer:

```text
findWorkspaceMember()
```

over:

```text
selectWorkspaceMembershipRows()
```

outside infrastructure code.

---

# 332. Data Access APIs

Data functions SHOULD make scope explicit.

Good:

```text
listProjectsForWorkspace(workspaceId)
```

Potentially dangerous:

```text
listProjects(filters)
```

where tenant scope can be forgotten.

---

# 333. Secure-by-Construction Data APIs

Design APIs so unsafe access is difficult.

Example:

```text
ProjectRepository.forWorkspace(workspaceId)
```

may be preferable where it guarantees tenant scoping.

---

# 334. Authorization and Querying

Authorization should occur before sensitive data is returned.

Avoid loading complete unauthorized records and filtering them only in the UI.

---

# 335. Column-Level Sensitivity

Not every caller needs every field.

Repositories/services SHOULD support minimal projections for sensitive entities.

---

# 336. Search Authorization

Search indexes/results MUST preserve authorization semantics.

Do not index private tenant data into globally queryable indexes without security controls.

---

# 337. Analytics Privacy

Analytics copies require the same privacy thinking as operational data.

Moving data to a warehouse does not remove its sensitivity.

---

# 338. Backup Privacy

Backups are production data.

Apply:

```text
access control
encryption
retention
auditing
```

accordingly.

---

# 339. Data Classification Metadata

Important databases/datasets SHOULD identify their data classification.

Example:

```text
Confidential
Contains PII
```

where useful.

---

# 340. Data Access Review

High-risk databases SHOULD periodically review who has access.

Remove obsolete:

- users;
- service identities;
- credentials.

---

# 341. Schema Review Checklist

Before approving a schema:

```text
□ Domain ownership clear
□ Table names clear
□ Primary key defined
□ Foreign keys defined
□ Nullability intentional
□ Uniqueness enforced
□ Check constraints considered
□ Money represented safely
□ Dates/times modeled correctly
□ Tenant ownership clear
□ Sensitive data identified
□ Indexes match expected queries
□ Retention considered
□ Delete behavior defined
```

---

# 342. Query Review Checklist

Before approving important queries:

```text
□ Parameterized
□ Tenant scoped
□ Authorization accounted for
□ Required fields only
□ Bounded result size
□ Appropriate ordering
□ Pagination defined
□ Index support considered
□ N+1 avoided
□ Query plan checked when necessary
□ Sensitive data minimized
```

---

# 343. Migration Review Checklist

```text
□ Version controlled
□ Backward compatibility considered
□ Old/new application coexistence considered
□ Lock risk understood
□ Data loss risk understood
□ Backfill strategy defined
□ Large-table impact evaluated
□ Index creation strategy safe
□ Monitoring defined
□ Rollback/forward-fix plan defined
```

---

# 344. Multi-Tenant Data Checklist

```text
□ Tenant ownership explicit
□ Tenant scope established server-side
□ Queries tenant scoped
□ Unique constraints tenant aware
□ Indexes tenant aware
□ Cache tenant isolated
□ Search tenant isolated
□ Jobs tenant isolated
□ Files tenant isolated
□ Exports tenant isolated
□ Cross-tenant tests exist
```

---

# 345. Backup Checklist

```text
□ Automated backups enabled
□ Retention defined
□ Encryption defined
□ Backup access restricted
□ Restore procedure documented
□ Restore tested
□ RPO defined
□ RTO defined
□ Region/account failure considered
```

---

# 346. Production Database Checklist

```text
□ Supported database version
□ Database not publicly exposed unnecessarily
□ Runtime credentials least privileged
□ Migration credentials separated where appropriate
□ TLS/protected transport enabled
□ Backups operational
□ Monitoring operational
□ Slow-query visibility exists
□ Capacity alerts exist
□ Connection pool configured
□ Query timeouts considered
□ Recovery runbook exists
```

---

# 347. Definition of Done — Data Feature

A data-backed feature is complete only when:

```text
✓ Data owner identified
✓ Schema expresses domain semantics
✓ Primary/foreign keys correct
✓ Required invariants constrained
✓ Tenant isolation enforced
✓ Runtime validation exists
✓ Queries parameterized
✓ Indexes considered
✓ Transaction boundaries defined
✓ Concurrency considered
✓ Migration created
✓ Migration reviewed
✓ Deletion semantics defined
✓ Sensitive data classified
✓ Tests cover database behavior
✓ Monitoring considered
```

---

# 348. Definition of Done — Database Change

```text
✓ Migration committed
✓ Application compatibility verified
✓ Backfill completed where required
✓ Constraints validated
✓ Indexes validated
✓ Performance evaluated
✓ Production migration observed
✓ Old compatibility path removed when safe
✓ Documentation updated
```

---

# 349. Data Anti-Patterns

Avoid:

```text
Database as unstructured JSON bucket
```

Avoid:

```text
No foreign keys because application handles it
```

Avoid:

```text
No constraints because ORM validates
```

Avoid:

```text
SELECT *
everywhere
```

Avoid:

```text
Unbounded list queries
```

Avoid:

```text
User input concatenated into SQL
```

Avoid:

```text
Database superuser for application runtime
```

Avoid:

```text
Every table has deleted_at by default
```

Avoid:

```text
Every field nullable
```

Avoid:

```text
Every field VARCHAR(255)
```

Avoid:

```text
Money stored as float
```

Avoid:

```text
Local server timezone used implicitly
```

Avoid:

```text
No tenant column/index strategy
```

Avoid:

```text
Application performs uniqueness check without database constraint
```

Avoid:

```text
Huge transaction containing external HTTP calls
```

Avoid:

```text
New index for every column
```

Avoid:

```text
Schema auto-sync in production
```

Avoid:

```text
Manual production database changes with no migration
```

Avoid:

```text
Raw production data copied to developer laptops
```

Avoid:

```text
Backup never restore-tested
```

Avoid:

```text
Search index treated as source of truth
```

Avoid:

```text
Analytics queries saturating primary OLTP database
```

Avoid:

```text
Shared mutable tables across independent microservices
```

---

# 350. AI Data Rules

AI-generated data/database code MUST follow this standard.

Before creating tables or queries, AI SHOULD inspect:

```text
existing schema
migration conventions
database engine
ORM/query layer
tenant model
data access patterns
naming conventions
```

---

# 351. AI Schema Rule

AI MUST NOT create a new table without determining:

```text
Domain owner
Primary key
Relationships
Nullability
Constraints
Tenant ownership
Expected access patterns
```

---

# 352. AI Constraint Rule

AI SHOULD encode stable invariants as database constraints where appropriate.

Do not rely solely on generated application validation.

---

# 353. AI Query Rule

AI MUST use parameterized queries.

It MUST NOT generate executable SQL using string concatenation with untrusted values.

---

# 354. AI Tenant Rule

Before querying tenant-scoped data, AI MUST identify how tenant context is established.

It MUST NOT trust arbitrary client `tenantId` values as authorization.

---

# 355. AI Migration Rule

AI MUST create explicit migrations according to repository convention.

It SHOULD NOT modify schema definitions without a migration when migrations are the authoritative mechanism.

---

# 356. AI Destructive Migration Rule

AI MUST NOT casually generate:

```text
DROP TABLE
DROP COLUMN
TRUNCATE
mass DELETE
```

without considering:

```text
data loss
compatibility
backups
deployment sequence
```

---

# 357. AI Index Rule

AI SHOULD recommend indexes based on actual query patterns.

It MUST NOT create indexes mechanically for every foreign key/column without considering workload.

---

# 358. AI Performance Rule

Before "optimizing" a query, AI SHOULD inspect:

```text
query plan
indexes
data scale
call frequency
```

where available.

Do not optimize from intuition alone.

---

# 359. AI Transaction Rule

AI MUST identify whether multi-step writes require atomicity.

Use a transaction where partial success violates invariants.

---

# 360. AI Concurrency Rule

AI MUST consider race conditions when generating:

```text
counters
inventory
balances
uniqueness checks
ownership changes
```

---

# 361. AI ORM Rule

AI MUST understand that ORM types are not runtime security/data validation.

Validate external input separately.

---

# 362. AI Raw SQL Rule

AI MAY use raw SQL when appropriate.

It MUST:

```text
parameterize
use existing DB conventions
test
document non-obvious behavior
```

---

# 363. AI Data-Minimization Rule

AI SHOULD select only required fields.

It MUST NOT expose entire database entities to clients merely for convenience.

---

# 364. AI Secret Rule

AI MUST NOT place:

```text
DB credentials
connection strings
passwords
private tokens
```

in source code.

---

# 365. AI Production Rule

AI MUST NOT suggest unsafe direct production operations as routine development workflow.

Prefer controlled migrations/jobs/runbooks.

---

# 366. AI Backup Rule

For destructive database operations, AI SHOULD consider whether recovery exists.

Do not assume a backup exists without evidence.

---

# 367. AI New-Database Rule

AI MUST NOT introduce a new database technology merely because one feature could use it.

First evaluate whether the existing database can satisfy the requirement.

---

# 368. AI JSON Rule

AI MUST NOT default to JSON/JSONB simply because the structure is initially inconvenient to model.

Core domain data should remain structured.

---

# 369. AI Generic-Schema Rule

AI SHOULD avoid generic:

```text
entities
attributes
metadata
```

architectures unless the domain is genuinely dynamic.

---

# 370. AI Gold Rule

When uncertain:

```text
Correctness
>
Integrity
>
Security
>
Clarity
>
Measured performance
>
Convenience
```

---

# 371. Golden Data & Database Rules

**1. One authoritative source for every important business fact.**

**2. Data belongs to the domain that owns its meaning.**

**3. Start with one relational database unless requirements justify more.**

**4. PostgreSQL is the default general-purpose relational database.**

**5. Model the domain explicitly.**

**6. Every entity has stable identity.**

**7. Enforce relationships with foreign keys where practical.**

**8. Use `NOT NULL` when null is not valid.**

**9. Enforce uniqueness in the database.**

**10. Encode stable invariants with constraints where appropriate.**

**11. Application validation does not replace database integrity.**

**12. Use safe monetary types; never authoritative floating-point money.**

**13. Model dates, timestamps, and time zones intentionally.**

**14. JSON is useful, not an escape from schema design.**

**15. Normalize first; denormalize deliberately.**

**16. Every duplicated value requires a synchronization story.**

**17. Every query containing untrusted values is parameterized.**

**18. Select only required data.**

**19. Bound large results.**

**20. Eliminate harmful N+1 patterns.**

**21. Index access patterns, not every column.**

**22. Transactions protect business invariants.**

**23. Keep transactions short.**

**24. Concurrency is part of correctness.**

**25. Schema changes use migrations.**

**26. Prefer expand/contract for breaking production changes.**

**27. Backfills are observable production jobs.**

**28. Tenant boundaries are enforced in every data path.**

**29. Database credentials follow least privilege.**

**30. Production databases are not publicly exposed by default.**

**31. Backups are production data and must be protected.**

**32. A backup is not valid until restore has been tested.**

**33. Search, caches, and analytics are projections unless explicitly authoritative.**

**34. Data deletion must propagate to secondary systems.**

**35. Retention is explicit; indefinite storage is not the default.**

**36. Production data does not casually enter development environments.**

**37. Database performance is measured through query plans and production metrics.**

**38. Additional databases require a demonstrated workload need.**

**39. Database schemas are implementation details unless explicitly published as contracts.**

**40. Data correctness outranks developer convenience.**

---

# 372. Canonical Data & Database Standard

The organizational standard is:

> **Product data is modeled explicitly around stable domain concepts, with clear ownership and one authoritative source for each important business fact. PostgreSQL is the default transactional database unless demonstrated workload requirements justify another technology. Database schemas enforce important integrity through primary keys, foreign keys, nullability, uniqueness, and appropriate constraints, while application validation provides user-facing and domain-specific feedback. External input is never trusted, and all SQL involving untrusted values uses parameterized queries or equivalent safe structured APIs.**

> **Database access follows least privilege and tenant isolation is enforced across queries, indexes, caches, search, jobs, files, and exports. Schema changes are version-controlled and deployed through deliberate migrations, with expand/contract strategies for compatibility-sensitive changes. Transactions align with business invariants, concurrency is treated as a correctness concern, and performance work is driven by observed access patterns and query plans rather than assumptions.**

> **Operational databases remain distinct from caches, search indexes, and analytical projections. Data lifecycle, retention, deletion, privacy, backup, point-in-time recovery, replication, disaster recovery, observability, and capacity planning are first-class database architecture concerns. A database is considered production-ready only when the organization can protect it, observe it, migrate it, recover it, and explain who owns every critical dataset.**

The data architecture should make it easy to answer:

```text
What does this data mean?
Who owns it?
Where is its source of truth?
What identifies it?
What relationships must remain valid?
What may be null?
What must be unique?
Which tenant owns it?
Who can read it?
Who can change it?
How is concurrency handled?
What queries access it?
Which indexes support those queries?
How does its schema evolve?
How long is it retained?
How is it deleted?
Where is it replicated?
How is it backed up?
How is it restored?
```

If those questions cannot be answered, the data model is not yet production-grade.

For the security portion, this aligns with OWASP's current guidance that parameterized queries/prepared statements are the preferred SQL injection defense and that backend databases should have tightly restricted network exposure and credentials rather than broad access. citeturn274092search0turn274092search3

In the master sequence, I’d place it as:

**Foundations → Architecture → Framework → Security → Auth/AuthZ → Data & Database → API → Routes → State Management → Design System → Testing → Performance → Observability → Infrastructure → Documentation → Governance.**
