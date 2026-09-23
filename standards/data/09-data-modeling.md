---
id: "data-modeling"
title: "Data Modeling & Schema Evolution"
domain: "data"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["data", "modeling", "schema", "evolution"]
applies_to: ["data"]
related: ["events-webhooks"]
legacy_number: 80
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 57393
provenance: baseline

---

# Data Modeling & Schema Evolution Guidelines — Gold Standard 2026

**Canonical placement:** Data & Database → **Data Modeling** → Migrations → API

---

# 1. Purpose

Data models define the durable meaning, integrity, ownership, and lifecycle of application state.

Schema evolution defines how those models change without corrupting data, breaking running application versions, violating tenant boundaries, or causing unacceptable production load.

This standard defines the canonical requirements for:

- table and column naming;
- primary keys and stable identities;
- foreign keys and relationships;
- normalization and denormalization;
- immutable versus mutable data;
- soft delete and hard delete;
- audit and history modeling;
- multi-tenant schemas;
- integrity constraints;
- online migrations;
- backward-compatible schema evolution;
- backfills;
- index creation;
- destructive migrations;
- application/database compatibility;
- operational verification and rollback.

A database schema **MUST** be treated as a durable contract shared by application code, background workers, APIs, analytics, operational tooling, and migrations.

Schema changes **MUST** account for mixed-version deployments.

The canonical compatibility assumption is:

```text
old application
+ new application
+ transitional schema
```

may coexist during deployment.

A migration **MUST NOT** rely on all application processes changing atomically unless the architecture explicitly guarantees such deployment semantics.

Database constraints **MUST** be treated as the final integrity boundary for invariants the database can authoritatively enforce.

Application validation remains necessary, but application validation **MUST NOT** substitute for durable database integrity.

This standard aligns with the canonical **Security**, **Data & Database**, **API**, **Events & Webhooks**, **Jobs & Queue**, **State Management**, **Forms & Validation**, **Accessibility**, **Design Tokens**, **Component**, and **Pattern** standards.

For administrative and data-management interfaces, **shadcn/ui is the component baseline**.

---

# 2. Rules

## 2.1 Schema ownership

Every production table **MUST** have an owning service, bounded context, or clearly designated system of record.

Ownership **MUST** define who controls:

- schema changes;
- data semantics;
- retention;
- access;
- migration policy;
- integrity constraints.

Several applications **SHOULD NOT** independently mutate the same tables unless the architecture explicitly defines a shared database ownership model.

Consumers outside the owning boundary **SHOULD** access data through approved APIs, events, read models, or governed analytical interfaces rather than directly coupling to internal tables.

---

## 2.2 Naming conventions

Database identifiers **MUST** follow one consistent organizational naming convention.

For SQL schemas, the canonical default is:

```text
snake_case
```

Examples:

```text
customer_accounts
invoice_items
created_at
tenant_id
```

Table and column names **MUST** communicate domain meaning rather than incidental implementation details.

Avoid:

```text
tbl_user
data1
value2
misc
flag
status2
```

Names **SHOULD** avoid reserved words where practical.

Abbreviations **SHOULD NOT** be used unless they are established domain terminology.

The same concept **SHOULD** use the same name across related schemas.

For example:

```text
tenant_id
```

**SHOULD NOT** become:

```text
org
account
workspace_key
tenant
```

in adjacent tables unless those concepts are genuinely different.

---

## 2.3 Table naming

Tables **SHOULD** represent durable domain entities, relationships, events, history, or explicitly materialized read models.

Names **SHOULD** be nouns.

Examples:

```text
customers
orders
invoice_items
subscription_history
```

Join tables **SHOULD** use deterministic names derived from the related concepts.

For example:

```text
user_roles
project_members
```

Tables **MUST NOT** expose temporary migration semantics through long-lived names such as:

```text
users_new
orders_final_v2
temporary_customers
```

unless they are truly temporary migration artifacts with a defined removal plan.

---

## 2.4 Column naming

Columns **MUST** describe stored semantics precisely.

Boolean columns **SHOULD** read naturally as predicates:

```text
is_active
has_access
requires_review
```

Time columns **SHOULD** describe the associated event:

```text
created_at
updated_at
deleted_at
verified_at
expires_at
```

Identifier columns **SHOULD** use:

```text
<entity>_id
```

Examples:

```text
customer_id
tenant_id
invoice_id
```

Units **MUST** be explicit where ambiguity is possible.

Prefer:

```text
amount_minor
duration_seconds
size_bytes
```

over:

```text
amount
duration
size
```

when the unit is not otherwise guaranteed by the schema contract.

---

## 2.5 Primary keys

Every durable relational entity **MUST** have a stable primary key unless the table's semantics clearly justify a composite key.

Primary keys **MUST NOT** change when ordinary mutable business attributes change.

A person's email address, username, display name, or phone number **SHOULD NOT** normally be used as the primary key.

Generated surrogate keys **SHOULD** be preferred when business identifiers are mutable, externally controlled, or excessively large.

Primary-key choice **MUST** consider:

- uniqueness;
- immutability;
- index size;
- insertion behavior;
- replication;
- public exposure;
- federation;
- offline generation requirements.

---

## 2.6 Identifier formats

Identifier formats **MUST** be standardized per platform or service boundary.

Acceptable choices may include:

- database sequences;
- UUIDs;
- time-sortable globally unique identifiers;
- other approved immutable identifiers.

The same entity **MUST NOT** casually acquire multiple competing canonical identities.

If both an internal primary key and external public ID exist, their roles **MUST** be explicit.

Example:

```text
id              internal relational identity
public_id       externally exposed stable identity
```

The API **MUST NOT** expose internal identifiers merely because they are convenient if doing so violates the API or Security standards.

---

## 2.7 Natural keys

Natural keys **MAY** be used when the business identifier is:

- truly immutable;
- compact;
- globally or contextually unique;
- authoritative.

Even when not used as the primary key, meaningful natural uniqueness **SHOULD** be enforced through a database uniqueness constraint.

For example:

```text
UNIQUE (tenant_id, external_customer_id)
```

where that uniqueness is a real business invariant.

---

## 2.8 Foreign keys

Relationships representing durable referential integrity **SHOULD** use database foreign keys when operationally compatible with the database architecture.

Foreign keys **MUST** reference the correct ownership scope.

In multi-tenant systems, a relationship **MUST NOT** permit a row from one tenant to reference a row belonging to another tenant.

Where appropriate, tenant-safe relationships **SHOULD** use composite constraints such as:

```text
(tenant_id, customer_id)
```

rather than relying only on application code.

Foreign-key deletion behavior **MUST** be intentional.

`CASCADE`, `RESTRICT`, `SET NULL`, and equivalent behavior **MUST NOT** be selected by habit.

---

## 2.9 Uniqueness

Business uniqueness **MUST** be enforced at the database layer where the database has sufficient information to define the invariant.

Examples:

```text
UNIQUE (email_normalized)
UNIQUE (tenant_id, slug)
UNIQUE (subscription_id, billing_period)
```

Application-level:

```text
SELECT ...
if not found:
    INSERT ...
```

**MUST NOT** be relied on as the sole uniqueness mechanism under concurrent writes.

Uniqueness constraints **SHOULD** match the actual business scope.

A globally unique constraint **MUST NOT** be used when uniqueness is tenant-scoped.

---

## 2.10 Check constraints

Database check constraints **SHOULD** enforce inexpensive row-local invariants.

Examples include:

```text
quantity > 0
end_at > start_at
amount_minor >= 0
```

Constraints **MUST** reflect domain truth rather than temporary application assumptions.

Complex business workflows involving multiple external systems **SHOULD NOT** be forced into database constraints where the database cannot authoritatively determine the outcome.

---

## 2.11 Nullability

`NULL` **MUST** have a documented semantic meaning.

Nullable columns **MUST NOT** be used merely because determining the real invariant is inconvenient.

If a value is required for every valid row, it **SHOULD** eventually be enforced with `NOT NULL`.

A new required field in an existing table **MUST NOT** normally be introduced in a single blocking step.

The canonical sequence is:

```text
add nullable column
→ deploy compatible writers
→ backfill
→ verify completeness
→ enforce NOT NULL
```

---

## 2.12 Defaults

Database defaults **MUST** represent valid domain defaults, not merely migration convenience.

A default **MUST NOT** fabricate historical meaning.

For example, adding:

```text
created_at DEFAULT now()
```

to existing rows can incorrectly imply that historical records were created at migration time.

Defaults affecting application semantics **MUST** be coordinated with application behavior.

Application defaults and database defaults **SHOULD** agree.

---

## 2.13 Enumerated values

Finite domain states **MAY** use:

- lookup tables;
- constrained strings;
- database enum types;
- another approved representation.

The choice **MUST** account for migration flexibility.

Values **MUST NOT** be silently repurposed.

Removing or renaming an enum value **MUST** be treated as a compatibility-sensitive schema change.

State-machine transitions **SHOULD** be validated at the application/domain layer even when the database constrains the set of possible stored values.

---

## 2.14 Monetary data

Money **MUST NOT** be stored using binary floating-point types.

Monetary values **SHOULD** use:

- fixed-precision decimal; or
- integer minor units;

according to the canonical financial-data standard.

Currency **MUST** be stored or unambiguously derivable wherever multiple currencies are possible.

Amount semantics **MUST** define:

- currency;
- unit;
- rounding rules.

---

## 2.15 Temporal data

Persisted instants **SHOULD** use timezone-aware types or an equivalent unambiguous representation.

Business-local dates such as:

```text
2026-09-23
```

**SHOULD** use a date type rather than an arbitrary midnight timestamp.

The schema **MUST** distinguish:

- date;
- local wall-clock time;
- absolute instant;
- duration.

Timezone semantics **MUST NOT** depend on an implicit server timezone.

---

## 2.16 Mutable versus immutable data

The model **SHOULD** distinguish mutable state from immutable historical facts.

Mutable records are appropriate for current state such as:

```text
customer_profile
subscription
project
```

Immutable or append-oriented records are appropriate for:

- audit events;
- ledger entries;
- historical state transitions;
- event records.

Immutable history **MUST NOT** be rewritten as ordinary current-state updates unless the domain explicitly permits correction.

Corrections to immutable financial or audit records **SHOULD** normally be represented through compensating records or superseding versions.

---

## 2.17 Normalization

Transactional source-of-truth schemas **SHOULD** begin from a normalized model.

Normalization **SHOULD** separate entities where doing so:

- prevents update anomalies;
- expresses ownership clearly;
- avoids contradictory copies;
- improves integrity.

A value **SHOULD NOT** be duplicated across many authoritative rows merely to make reads easier.

The database **SHOULD** have one clear authoritative representation for important mutable facts.

---

## 2.18 Denormalization

Denormalization **MAY** be introduced for:

- read performance;
- analytical workloads;
- search;
- reporting;
- immutable historical snapshots;
- distributed read models.

Every denormalized field **MUST** have an identified source of truth.

The synchronization model **MUST** be documented.

Possible strategies include:

- synchronous transactional update;
- event-driven projection;
- generated column;
- materialized view;
- scheduled rebuild.

A denormalized copy **MUST NOT** silently become a second independent authority.

---

## 2.19 Cached derived data

Derived values stored for performance **MUST** be reproducible from authoritative state or have explicit semantics explaining why they are not.

Examples:

```text
order_total_minor
comment_count
last_activity_at
```

The model **MUST** define when derived values are updated.

If temporary divergence is possible, the acceptable consistency model **MUST** be documented.

---

## 2.20 JSON and semi-structured columns

JSON or equivalent semi-structured fields **MAY** be used where:

- structure is genuinely variable;
- schema flexibility is required;
- the value is primarily stored and retrieved as a unit.

JSON **SHOULD NOT** replace normal relational modeling for stable, queryable, constrained domain fields.

Fields used for:

- authorization;
- joins;
- uniqueness;
- critical filtering;
- referential integrity;

**SHOULD** normally have explicit schema representation.

Important JSON structure **MUST** still be validated.

A schemaless storage type **MUST NOT** imply schemaless domain semantics.

---

## 2.21 Soft deletion

Soft deletion **MAY** be used where the domain requires:

- restoration;
- reversible deletion;
- retention;
- auditability;
- delayed purge.

The canonical field is typically:

```text
deleted_at
```

rather than a bare boolean when deletion time is operationally useful.

Soft-deleted rows **MUST** have explicit query semantics.

The system **MUST NOT** rely on every developer remembering:

```text
WHERE deleted_at IS NULL
```

manually.

Approved repository/query abstractions, views, row policies, or equivalent mechanisms **SHOULD** reduce accidental inclusion.

---

## 2.22 Soft-delete uniqueness

Soft deletion **MUST** account for uniqueness constraints.

For example, if usernames can be reused after deletion, the schema **MUST** deliberately model uniqueness among active records.

A soft-delete design **MUST NOT** discover after production launch that deleted rows permanently consume unique business identifiers unless that behavior is intended.

Partial or filtered unique constraints **SHOULD** be used where supported and appropriate.

---

## 2.23 Hard deletion

Hard deletion **SHOULD** be used when data is no longer required and retention obligations permit permanent removal.

Hard deletion **MUST** be used where legal, privacy, security, or retention policy requires actual deletion.

Soft delete **MUST NOT** be used as a substitute for regulatory deletion.

Deletion policy **MUST** define treatment of:

- primary records;
- child records;
- search indexes;
- caches;
- analytics;
- backups;
- event archives;
- derived data.

---

## 2.24 Deletion semantics

Deletion **MUST** be modeled as a domain operation rather than an ad hoc SQL concern.

The owner **MUST** define whether deletion means:

- deactivate;
- archive;
- hide;
- anonymize;
- soft delete;
- permanently erase.

These meanings **MUST NOT** be conflated.

APIs and administrative interfaces **MUST** use language matching the actual effect.

A button labeled **Delete** **MUST NOT** merely hide a record indefinitely if users reasonably expect permanent deletion.

---

## 2.25 Audit tables

Security- or business-relevant changes **SHOULD** produce durable audit records according to the Security and Governance standards.

Audit records **SHOULD** contain appropriate metadata such as:

```text
actor_id
action
resource_type
resource_id
occurred_at
request_id
reason
```

Audit tables **MUST** be access-controlled.

Audit records **MUST NOT** indiscriminately copy secrets or unrestricted sensitive payloads.

Audit history **SHOULD** be append-oriented.

---

## 2.26 Audit versus application history

Audit history and business history **MUST** be distinguished.

An audit record answers questions such as:

```text
Who changed this?
When?
Through which operation?
```

Business history answers questions such as:

```text
What was the subscription status on this date?
What price applied to this invoice?
```

One table **SHOULD NOT** be assumed to satisfy both requirements unless explicitly designed to do so.

---

## 2.27 History tables

History tables **SHOULD** record meaningful historical state when the domain requires point-in-time reconstruction.

History rows **SHOULD** include an effective interval or sequence where appropriate.

For example:

```text
valid_from
valid_to
```

or:

```text
version
```

History models **MUST** define whether time represents:

- business effective time;
- database observation time;
- transaction time.

Those concepts **MUST NOT** be silently conflated.

---

## 2.28 Slowly changing reference data

Reference data whose historical meaning affects existing records **SHOULD** be versioned or snapshotted where necessary.

For example, an invoice **MUST NOT** depend on the current mutable product price to reconstruct its historical amount.

Historical records **SHOULD** store the material facts necessary to preserve their original meaning.

---

## 2.29 Multi-tenant modeling

Multi-tenant systems **MUST** explicitly model tenant ownership.

Tenant-scoped tables **SHOULD** contain:

```text
tenant_id
```

or use an equivalent authoritative isolation mechanism.

Tenant context **MUST** be available wherever data isolation decisions are made.

Tenant isolation **MUST NOT** depend solely on client-provided identifiers.

---

## 2.30 Tenant-safe keys

Business keys in multi-tenant systems **SHOULD** generally scope uniqueness to the tenant unless the identifier is intentionally global.

Example:

```text
UNIQUE (tenant_id, project_slug)
```

rather than:

```text
UNIQUE (project_slug)
```

Tenant-aware indexes **SHOULD** begin with or otherwise account for tenant predicates where that matches common access patterns.

---

## 2.31 Tenant-safe relationships

Relationships between tenant-owned tables **MUST NOT** permit cross-tenant references.

Where supported, the database **SHOULD** enforce composite referential integrity.

Conceptually:

```text
FOREIGN KEY (tenant_id, project_id)
REFERENCES projects (tenant_id, id)
```

Application-layer tenant checks **MUST** still exist where authorization is required.

Database tenant constraints provide defense in depth; they do not replace authorization.

---

## 2.32 Shared versus isolated tenancy

The choice between:

- shared schema;
- schema per tenant;
- database per tenant;

**MUST** be driven by documented isolation, operational, scalability, and compliance requirements.

The model **MUST** account for:

- migration coordination;
- backup and restore;
- tenant export;
- retention;
- noisy-neighbor risk;
- operational automation.

A tenancy model **MUST NOT** be chosen solely because it appears simpler during initial development.

---

## 2.33 Tenant migration

Tenant movement between shards, regions, or databases **MUST** preserve identity, referential integrity, and authorization boundaries.

Migration tooling **MUST** prevent one tenant's data from being merged into another tenant's scope.

Large tenant migrations **SHOULD** be resumable and auditable.

---

## 2.34 Index design

Indexes **MUST** support demonstrated query and integrity requirements.

Indexes **SHOULD** be designed from actual access patterns.

Index creation **MUST** consider:

- write amplification;
- storage;
- lock behavior;
- creation time;
- replication impact;
- cardinality.

Indexes **MUST NOT** be added speculatively without an expected query or constraint benefit.

Duplicate or redundant indexes **SHOULD** be removed through a safe migration process.

---

## 2.35 Composite indexes

Composite index order **MUST** reflect actual query predicates and sorting requirements.

For example, a common tenant-scoped query:

```sql
WHERE tenant_id = ?
  AND status = ?
ORDER BY created_at DESC
```

may justify an index structured around:

```text
tenant_id, status, created_at
```

depending on the database and workload.

Index design **MUST** be verified against the target database query planner rather than inferred solely from column names.

---

## 2.36 Database constraints as final defense

Critical invariants the database can authoritatively enforce **MUST** use database-level constraints.

This includes where applicable:

- primary keys;
- foreign keys;
- uniqueness;
- nullability;
- check constraints.

Application validation **MUST** provide good user and developer feedback.

Database constraints **MUST** provide final race-safe integrity.

The canonical model is:

```text
Forms / client validation
→ API validation
→ domain/business validation
→ database constraints
```

Each layer has a different responsibility.

---

## 2.37 Constraint errors

Applications **MUST** handle expected integrity violations predictably.

A uniqueness violation **MUST NOT** normally surface to the user as an unhandled database exception.

The API layer **SHOULD** translate known constraint failures into the canonical structured error model.

Constraint names **SHOULD** be stable and meaningful enough to support diagnostics where database tooling permits.

---

## 2.38 Migration principles

Production schema migrations **MUST** be designed for:

- correctness;
- mixed-version compatibility;
- bounded locking;
- bounded resource consumption;
- resumability where applicable;
- observability.

The safe default is **expand → migrate → contract**.

Conceptually:

```text
expand schema
→ deploy compatible code
→ migrate/backfill data
→ verify
→ switch reads/writes
→ remove legacy behavior
→ contract schema
```

---

## 2.39 Expand phase

The expand phase **MUST** add new capabilities without breaking old application versions.

Typical expand operations include:

- adding nullable columns;
- adding new tables;
- adding compatible indexes;
- adding new optional relationships;
- adding permissive constraints that can be validated later.

The expand phase **MUST NOT** remove schema elements still required by deployed code.

---

## 2.40 Dual-read and dual-write transitions

Some schema changes **MAY** require temporary dual-read or dual-write behavior.

Dual writes **MUST** define which representation is authoritative during transition.

Failure behavior **MUST** be explicit.

Blind application-level dual writes to two independent stores **SHOULD NOT** be used where partial success creates unresolvable inconsistency.

When dual writes are necessary, repair and reconciliation **MUST** be designed before deployment.

---

## 2.41 Read migration

Applications migrating between old and new representations **SHOULD** adopt a deliberate read strategy.

Possible phases include:

```text
read old
→ write both
→ backfill new
→ compare
→ read new with fallback
→ read new only
→ stop old writes
```

The exact sequence **MUST** preserve correctness throughout mixed deployments.

Fallback behavior **MUST NOT** hide persistent migration defects indefinitely.

---

## 2.42 Adding columns

Adding an optional column is generally backward-compatible, but its operational safety **MUST** be verified against the target database.

Adding a required column to a large existing table **MUST** normally be decomposed into several phases.

The canonical sequence is:

```text
1. add nullable column
2. deploy writers
3. backfill existing rows
4. verify no nulls remain
5. add/enforce NOT NULL
```

A large table **MUST NOT** be rewritten under production load without explicit operational review.

---

## 2.43 Renaming columns

Direct column renaming **SHOULD NOT** be used when old and new application versions may coexist.

The canonical migration is:

```text
add new column
→ write both
→ backfill
→ migrate reads
→ stop old writes
→ remove old column
```

A compatibility view or database alias **MAY** be used where appropriate.

Logical renames are compatibility-sensitive even when the database can perform the rename instantly.

---

## 2.44 Changing column types

Changing a column type **MUST** be treated as potentially destructive and operationally expensive.

An in-place type conversion **SHOULD NOT** be used on large or critical tables without proving its lock and rewrite behavior.

The preferred pattern is often:

```text
add new typed column
→ dual write
→ backfill
→ verify conversion
→ migrate reads
→ remove old representation
```

Lossy conversions **MUST** have explicit product/domain approval.

---

## 2.45 Removing columns

A column **MUST NOT** be removed while any supported application version, worker, migration, report, or integration may still depend on it.

Before removal:

- reads **MUST** stop;
- writes **MUST** stop;
- usage **SHOULD** be verified;
- required retention **MUST** be considered.

Removal **SHOULD** occur in a later deployment than the application change that stops using the column.

---

## 2.46 Removing tables

Dropping a table **MUST** follow the same compatibility discipline as dropping a column.

The owner **MUST** verify:

- no application dependency;
- no operational tooling dependency;
- no reporting dependency;
- no retention requirement;
- no rollback requirement.

Critical dropped data **MUST NOT** rely solely on "we have backups" as a migration plan.

---

## 2.47 Renaming tables

Direct table renames **SHOULD** be avoided when mixed application versions are possible.

Use:

```text
new table / compatibility view
→ migrate writes
→ migrate data
→ migrate reads
→ retire old name
```

where required.

---

## 2.48 Adding constraints safely

Constraints on existing large datasets **MUST** account for validation cost and lock behavior.

Where the database supports staged validation, teams **SHOULD**:

```text
add constraint without full validation
→ validate existing rows separately
→ enforce for all rows
```

or use the database-specific safe equivalent.

Before enforcing a new invariant, existing violations **MUST** be measured and resolved.

---

## 2.49 Foreign-key migrations

Adding a foreign key to large populated tables **MUST** account for:

- validation scan;
- locking;
- supporting indexes;
- invalid historical data.

Required supporting indexes **SHOULD** be created before or as part of the safe constraint rollout.

Foreign keys **MUST NOT** be added blindly during peak traffic if the target database's validation behavior can create disruptive locks.

---

## 2.50 Index creation under load

Large production indexes **MUST** use the database's online or concurrent creation mechanism where available and appropriate.

Teams **MUST** understand whether index creation:

- blocks writes;
- blocks reads;
- increases replication lag;
- consumes temporary disk;
- can fail partially.

Failed index builds **MUST** be cleaned up deliberately.

---

## 2.51 Lock awareness

Every potentially blocking migration **MUST** be assessed for lock type and lock duration.

DDL that is fast in a development database **MUST NOT** be assumed fast on a production dataset.

Migration execution **SHOULD** use bounded lock timeouts where supported.

A migration **SHOULD** fail safely rather than wait indefinitely for a destructive lock during production traffic.

---

## 2.52 Transaction scope

Migration transactions **MUST** be sized appropriately.

Schema operations requiring atomicity **SHOULD** use transactions where supported.

Large data backfills **MUST NOT** normally execute as one transaction across millions of rows.

Long-running transactions can cause:

- lock retention;
- replication lag;
- vacuum/version-store pressure;
- rollback cost;
- operational instability.

---

## 2.53 Backfills

Backfills **MUST** be designed as operational jobs, not incidental migration SQL, when data volume or runtime is material.

Large backfills **SHOULD** be:

- batched;
- resumable;
- idempotent;
- rate-limited;
- observable;
- cancellable where practical.

The backfill **MUST** define the authoritative source used to calculate the new value.

---

## 2.54 Backfill batching

Backfills **SHOULD** process bounded batches.

Batching **SHOULD** use a stable cursor such as:

```text
primary key
created_at + primary key
```

rather than repeated full-table scans using large offsets.

The batch strategy **MUST** remain correct when concurrent application writes occur.

---

## 2.55 Backfill idempotency

A backfill **MUST** be safe to restart.

Re-running completed work **MUST NOT** corrupt data.

Where values may have changed since the backfill began, the job **MUST** define whether it:

- skips already populated rows;
- recomputes values;
- compares source revisions;
- retries conditionally.

---

## 2.56 Backfill rate control

Backfill throughput **MUST** be bounded according to production capacity.

Backfills **MUST NOT** saturate:

- database CPU;
- I/O;
- connection pools;
- replication;
- caches;
- downstream event systems.

Live production traffic **SHOULD** receive priority.

Rate limits **SHOULD** be adjustable without redeploying the application where operationally valuable.

---

## 2.57 Backfill observability

Large backfills **MUST** expose progress.

Useful metrics include:

```text
rows_examined
rows_updated
rows_skipped
rows_failed
last_cursor
batch_duration
estimated_remaining
```

Errors **MUST** be attributable to specific rows or batches without logging inappropriate sensitive data.

Completion **MUST** be verified independently from the worker merely reporting "done."

---

## 2.58 Backfill verification

Before the migration proceeds to contract/destructive phases, the backfill **MUST** be verified.

Verification **SHOULD** include:

- remaining null count;
- old/new value comparison;
- invariant checks;
- sample validation;
- aggregate counts;
- mismatch rate.

A large data migration **MUST NOT** rely solely on the absence of job exceptions as evidence of correctness.

---

## 2.59 Backfills and events

A schema backfill **MUST** explicitly define whether it should emit domain events.

Most purely technical backfills **SHOULD NOT** accidentally trigger external business side effects.

If historical domain events are required, they **MUST** follow the Events & Webhooks standard for controlled backfill/replay semantics.

Database triggers or application callbacks **MUST NOT** silently transform a technical migration into millions of external notifications.

---

## 2.60 Contract phase

Destructive cleanup **MUST** occur only after the new representation is verified and old code paths have been removed.

Contract operations include:

- dropping old columns;
- dropping compatibility views;
- removing old indexes;
- tightening nullability;
- removing dual-write code.

Contract migrations **SHOULD** be separate from expand/application deployments where practical.

---

## 2.61 Backward-compatible schema changes

A schema change is backward-compatible only when currently deployed applications remain valid.

Generally compatible changes include, subject to operational safety:

- new nullable columns;
- new tables;
- new optional indexes;
- additional permissive metadata.

Generally breaking changes include:

- column removal;
- column rename;
- table rename;
- incompatible type change;
- tighter constraints old writers violate;
- changing default semantics relied on by old code.

Compatibility **MUST** consider both reads and writes.

---

## 2.62 Forward compatibility

New application versions **SHOULD** tolerate the transitional schema state expected during rollout.

The application **MUST NOT** assume a destructive migration has completed before the migration system guarantees it.

Deployments that support rollback **MUST** preserve enough schema compatibility for the rollback window.

---

## 2.63 API compatibility

Database migration and API migration **MUST** be coordinated but **MUST NOT** be conflated.

A storage rename **MUST NOT** require an API rename unless product semantics have changed.

Public API contracts **MUST** remain governed by the API compatibility standard.

Internal schema details **SHOULD NOT** leak directly into API response shapes.

---

## 2.64 State Management alignment

The database or approved server-side system of record **MUST** remain authoritative for durable server state.

Frontend state **MUST NOT** become the source of truth for migrated or partially migrated database values.

Optimistic UI **MAY** represent pending updates but **MUST** reconcile with authoritative persisted state.

Schema migration states **SHOULD NOT** leak into product UI as contradictory records.

---

## 2.65 Forms & Validation alignment

Form validation **SHOULD** mirror user-visible database/domain constraints where relevant.

The server remains authoritative.

A required field in the UI **SHOULD** correspond to the actual domain requirement.

A database `NOT NULL` constraint **MUST NOT** be the first place ordinary invalid user input is discovered.

Conversely, client validation **MUST NOT** be treated as sufficient to preserve database integrity.

---

## 2.66 Security alignment

Sensitive columns **MUST** follow the canonical Security and Data classification rules.

The schema **SHOULD** minimize storage of sensitive information.

Encryption, hashing, tokenization, and access controls **MUST** be selected according to the data's security semantics.

Secrets **MUST NOT** be stored as ordinary application data unless the approved secrets architecture explicitly requires it.

Multi-tenant constraints **SHOULD** provide defense in depth against authorization defects.

---

## 2.67 Personally identifiable data

PII or equivalent sensitive identity data **MUST** have defined:

- purpose;
- retention;
- access scope;
- deletion behavior.

Duplicating PII through denormalization **SHOULD** be minimized.

Historical and audit tables **MUST NOT** become uncontrolled permanent copies of data that the primary table is required to delete.

---

## 2.68 Generated and computed columns

Generated/computed columns **MAY** be used where the database can deterministically derive the value.

The expression **MUST** be stable and documented.

Generated columns **SHOULD NOT** encode volatile application business logic likely to change frequently.

Migration cost **MUST** be assessed before adding a stored generated column to a large table.

---

## 2.69 Database triggers

Triggers **SHOULD** be used sparingly.

They **MAY** be appropriate for:

- tightly scoped integrity;
- auditing;
- infrastructure-level consistency.

Triggers **SHOULD NOT** hide complex domain workflows from application code.

Trigger behavior **MUST** be documented and tested.

Triggers producing external side effects **SHOULD NOT** be used.

---

## 2.70 Stored procedures

Stored procedures **MAY** be appropriate for operations requiring tightly controlled transactional database behavior.

They **MUST** follow:

- versioning;
- ownership;
- testing;
- migration;
- observability;

standards equivalent to application code.

Business logic **MUST NOT** be split unpredictably between application and database layers.

---

## 2.71 Read replicas

Applications using read replicas **MUST** account for replication lag.

A write followed by a replica read **MUST NOT** assume immediate read-after-write consistency unless explicitly guaranteed.

Security decisions **SHOULD NOT** rely on stale replicas where stale state could permit unauthorized access.

Migration verification **MUST** distinguish primary and replica observations where lag matters.

---

## 2.72 Sharding

Sharded data models **MUST** identify a stable shard key.

Shard key selection **MUST** account for:

- tenant locality;
- transaction boundaries;
- query patterns;
- hotspot risk;
- resharding.

Cross-shard foreign keys **MUST NOT** be assumed available unless the database platform guarantees them.

Application-level integrity required because of sharding **MUST** be explicitly documented.

---

## 2.73 Large-table migrations

Changes affecting large or critical tables **MUST** have an operational migration plan.

The plan **SHOULD** include:

- estimated row count;
- table/index size;
- expected lock behavior;
- replication impact;
- disk requirements;
- backfill rate;
- rollback strategy;
- verification query.

A migration safe on a table of 10,000 rows **MUST NOT** automatically be considered safe at 1 billion rows.

---

## 2.74 Migration observability

Production migrations **MUST** be observable.

Operators **SHOULD** have access to:

- migration identifier;
- start time;
- current phase;
- duration;
- lock waits;
- error state;
- backfill progress;
- completion.

Schema version **SHOULD** be queryable.

Migration failures **MUST** be visible to deployment systems.

---

## 2.75 Migration ownership

Every production migration **MUST** have an owner.

High-risk migrations **SHOULD** define:

- execution window;
- abort criteria;
- rollback or roll-forward plan;
- operator.

Automated migration frameworks **MUST NOT** eliminate human ownership of high-risk changes.

---

## 2.76 Migration testing

Schema migrations **MUST** be tested before production.

Testing **SHOULD** include:

- clean database creation;
- upgrade from representative previous schemas;
- application compatibility;
- rollback where supported;
- representative data volume for risky migrations.

Large migrations **SHOULD** be benchmarked against production-like data distribution.

---

## 2.77 Migration rollback

Rollback strategy **MUST** be explicit.

For additive migrations, rollback **MAY** mean application rollback while leaving compatible schema additions in place.

Destructive migrations **MUST NOT** assume that dropping columns can be trivially rolled back.

For irreversible data transformations, roll-forward recovery **MAY** be safer than rollback.

The chosen strategy **MUST** be documented before execution.

---

## 2.78 Destructive migrations

Destructive migrations **MUST** receive heightened review.

Examples include:

- dropping tables;
- dropping columns;
- destructive type conversion;
- bulk deletion;
- key remapping;
- irreversible anonymization.

The operator **MUST** verify the intended target immediately before execution where practical.

Production destructive operations **SHOULD NOT** be bundled casually with unrelated schema changes.

---

## 2.79 Migration tooling

Schema migrations **MUST** be represented as version-controlled code or an equivalent auditable declarative system.

Manual production DDL **SHOULD NOT** be the normal migration mechanism.

Emergency manual changes **MUST** be reconciled into the canonical migration history afterward.

Migration ordering **MUST** be deterministic.

---

## 2.80 CI/CD migration gates

CI/CD **SHOULD** automatically detect known unsafe schema-change patterns.

Examples include:

- dropping populated columns;
- blocking index creation;
- adding required columns without transition;
- table rewrites;
- incompatible type changes.

Risky migrations **SHOULD** require explicit review.

Migration tools **MUST NOT** automatically execute destructive operations solely because generated ORM state differs from the database.

---

## 2.81 ORM-generated migrations

ORM migration generation **MAY** accelerate development but **MUST** be reviewed as production database code.

Generated migrations **MUST NOT** be assumed safe.

Reviewers **MUST** evaluate actual DDL, not only the high-level model diff.

An ORM rename detection failure that generates:

```text
DROP COLUMN old_name
ADD COLUMN new_name
```

instead of a data-preserving migration **MUST** be corrected before production.

---

## 2.82 Data repair

Data repair scripts **MUST** follow migration-grade engineering practices when run against production.

They **SHOULD** be:

- scoped;
- idempotent;
- reviewed;
- observable;
- auditable;
- rate-limited where needed.

One-off scripts **MUST NOT** bypass tenant isolation or security controls merely because they are operational tools.

---

## 2.83 Data validation jobs

Critical datasets **SHOULD** have automated integrity validation where corruption would otherwise remain latent.

Validation **MAY** detect:

- orphaned relationships;
- impossible states;
- cross-tenant references;
- denormalization drift;
- unexpected nulls.

Validation jobs **MUST NOT** replace database constraints where the invariant can be enforced synchronously.

---

## 2.84 Administrative UI

Administrative data-management interfaces **MUST** follow the canonical Component and Pattern standards with **shadcn/ui as the component baseline**.

Appropriate primitives include:

- `Table` / Data Table for records and migration status;
- `Badge` for textual lifecycle state;
- `Tabs` for overview, history, migration, and audit views;
- `Dialog` or `Sheet` for contextual inspection;
- `AlertDialog` for destructive operations;
- `Alert` for integrity or migration warnings;
- `Field`, `FieldLabel`, `FieldDescription`, and `FieldError` for data-editing forms;
- `Skeleton` for loading state.

Raw custom UI controls **SHOULD NOT** be introduced where approved primitives exist.

---

## 2.85 Destructive data UI

Destructive administrative actions **MUST** communicate their actual data effect.

For example:

```text
Permanently delete 1,842 archived records
```

is preferred over:

```text
Delete
```

when impact is substantial.

High-impact operations **SHOULD** present:

- target scope;
- affected count where known;
- reversibility;
- retention implications.

Soft delete, archive, anonymize, and permanent delete **MUST** use distinct terminology.

---

## 2.86 Accessibility

Data administration interfaces **MUST** comply with the Accessibility standard.

State **MUST NOT** be communicated through color alone.

Tables **MUST** have meaningful headers.

Form controls **MUST** have labels and accessible errors.

Destructive confirmation dialogs **MUST** be keyboard operable and correctly manage focus.

Large data grids **MUST NOT** discard semantic accessibility solely for visual performance.

---

## 2.87 Design Tokens

Database and migration administration UI **MUST** use canonical Design Tokens.

Status presentation such as:

- active;
- archived;
- migrating;
- failed;
- complete;

**MUST** use semantic design-system tokens.

Hard-coded one-off status colors **MUST NOT** be introduced.

---

# 3. Anti-patterns

## 3.1 Email address as primary key

Email addresses can change and may have normalization complexity.

**Use:** stable surrogate identity plus an appropriate unique email constraint.

---

## 3.2 UUID everywhere without analysis

Globally unique identifiers can be valuable, but using them automatically ignores index locality, size, and database behavior.

**Use:** choose an identifier strategy intentionally.

---

## 3.3 Application-only uniqueness

```text
SELECT WHERE email = ?
if none:
    INSERT
```

races under concurrency.

**Use:** database uniqueness constraint plus application error handling.

---

## 3.4 Application-only tenant isolation

```text
WHERE id = ?
```

without tenant scope can become a cross-tenant data leak.

**Use:** authorization plus tenant-aware query/model constraints.

---

## 3.5 Nullable forever because migration was easier

Temporary migration nullability becomes permanent ambiguity.

**Use:** expand, backfill, verify, enforce the real invariant.

---

## 3.6 JSON for the entire domain model

Putting stable relational fields into one large JSON object prevents effective integrity and indexing.

**Use:** explicit columns and relationships for stable domain concepts.

---

## 3.7 Denormalization without an owner

Two copies of a mutable value become contradictory.

**Use:** identify authoritative state and synchronization semantics.

---

## 3.8 Soft delete by default

Soft deletion creates query complexity, uniqueness problems, and indefinite retention.

**Use:** soft delete only when the product or retention model requires it.

---

## 3.9 Soft delete as privacy deletion

Marking:

```text
deleted_at = now()
```

does not necessarily remove sensitive data.

**Use:** actual purge/anonymization according to retention policy.

---

## 3.10 Cascade delete without blast-radius review

A single parent deletion can unexpectedly remove large data trees.

**Use:** select cascade semantics deliberately.

---

## 3.11 Audit table as a full database copy

Copying every row mutation indefinitely creates cost and privacy risk without meaningful audit semantics.

**Use:** record security/business-relevant evidence with explicit retention.

---

## 3.12 Current reference data for historical meaning

Recomputing an old invoice using today's product price changes history.

**Use:** snapshot/version historically material values.

---

## 3.13 Direct required-column migration

```sql
ALTER TABLE customers
ADD COLUMN region text NOT NULL;
```

on a populated table may fail, rewrite data, or require an artificial default.

**Use:** nullable → writers → backfill → verify → `NOT NULL`.

---

## 3.14 Rename during rolling deploy

Old code continues requesting the previous column name.

**Use:** additive compatibility migration followed by later cleanup.

---

## 3.15 Drop column in the same deployment that stops reading it

Rollback or still-running workers may require it.

**Use:** stop usage, observe, then drop in a later deployment.

---

## 3.16 One giant migration transaction

Millions of updates in a single transaction increase lock, log, rollback, and replication risk.

**Use:** bounded resumable batches.

---

## 3.17 OFFSET-based large backfill

Repeated:

```text
OFFSET 10000000
```

becomes increasingly expensive and can behave poorly under concurrent changes.

**Use:** stable keyset/cursor iteration.

---

## 3.18 Backfill with no idempotency

A worker crash forces uncertain manual recovery.

**Use:** resumable idempotent processing.

---

## 3.19 Backfill at maximum throughput

Finishing quickly is not useful if production latency collapses.

**Use:** rate limiting and production-priority capacity management.

---

## 3.20 Backfill that accidentally emits notifications

Technical row updates trigger application callbacks and email millions of users.

**Use:** define event semantics explicitly and isolate technical migration writes.

---

## 3.21 Default `now()` for historical timestamps

Existing rows appear to have been created during migration.

**Use:** preserve known historical values or model unknown values honestly.

---

## 3.22 Blocking index creation during peak traffic

A seemingly ordinary DDL statement can block writers.

**Use:** online/concurrent index operations where available.

---

## 3.23 DDL with unlimited lock wait

A migration eventually obtains a lock at the worst possible moment.

**Use:** bounded lock timeout and controlled retry.

---

## 3.24 ORM-generated SQL without review

Model convenience can generate destructive or blocking DDL.

**Use:** review actual database operations.

---

## 3.25 Schema equals API

Renaming an internal column causes an unnecessary public API breaking change.

**Use:** keep persistence and external contracts decoupled.

---

## 3.26 UI validation as database integrity

Concurrent or non-UI callers bypass browser validation.

**Use:** client feedback plus API/domain validation plus database constraints.

---

## 3.27 Database error as user validation

Returning raw uniqueness or check-constraint exceptions creates poor UX and leaks implementation details.

**Use:** translate predictable integrity failures into canonical domain/API errors.

---

## 3.28 Cross-tenant foreign keys

A valid foreign key can still be a security defect if it connects records from different tenants.

**Use:** tenant-safe relational integrity.

---

## 3.29 Hidden migration with no observability

Operators cannot tell whether a migration is blocked, running, or partially complete.

**Use:** migration and backfill status telemetry.

---

## 3.30 "We can restore the backup" as migration rollback

Restoring an entire production database is rarely a practical response to one bad column migration.

**Use:** design safe rollout and recovery before destructive execution.

---

# 4. Checklist

## Naming and identity

- [ ] Table and column naming follows the canonical convention.
- [ ] Domain terminology is consistent.
- [ ] Every durable entity has a stable primary key.
- [ ] Mutable business fields are not used as primary identity without explicit justification.
- [ ] External and internal IDs have defined roles where both exist.
- [ ] Business uniqueness is enforced at the correct scope.

## Relationships and integrity

- [ ] Foreign keys exist where durable referential integrity is required.
- [ ] Deletion behavior is intentional.
- [ ] `NOT NULL` reflects actual domain requirements.
- [ ] Check constraints enforce appropriate row-local invariants.
- [ ] Database uniqueness protects concurrency-sensitive invariants.
- [ ] Expected constraint violations are mapped to canonical application/API errors.

## Modeling

- [ ] Source-of-truth schema is normalized appropriately.
- [ ] Every denormalized value has an identified authority.
- [ ] Synchronization semantics are documented.
- [ ] Stable relational data is not unnecessarily hidden in JSON.
- [ ] Monetary units and currencies are explicit.
- [ ] Temporal semantics are explicit.
- [ ] Mutable state and immutable history are distinguished.

## Deletion and retention

- [ ] Soft delete is used only where required.
- [ ] Soft-delete query behavior is centralized or otherwise protected.
- [ ] Unique constraints account for soft-deleted rows.
- [ ] Hard-delete requirements are defined.
- [ ] Archive, soft delete, anonymize, and permanent delete are distinct operations.
- [ ] Derived stores and history respect deletion policy.
- [ ] Audit/history retention complies with security and privacy requirements.

## Audit and history

- [ ] Audit requirements are defined.
- [ ] Audit history is append-oriented where appropriate.
- [ ] Audit records avoid inappropriate secrets and sensitive payloads.
- [ ] Business history is separate from security audit where needed.
- [ ] Historical records preserve historically material values.
- [ ] Effective-time semantics are explicit.

## Multi-tenancy

- [ ] Tenant ownership is explicit in tenant-scoped data.
- [ ] Uniqueness uses the correct tenant scope.
- [ ] Relationships cannot cross tenants unintentionally.
- [ ] Tenant authorization does not rely solely on client-provided tenant IDs.
- [ ] Indexes support common tenant-scoped queries.
- [ ] Cross-tenant data repair/migration risks have been reviewed.

## Indexes and performance

- [ ] Indexes correspond to real access patterns or constraints.
- [ ] Composite index order has been evaluated.
- [ ] Redundant indexes are avoided.
- [ ] Large index creation uses safe online mechanisms where available.
- [ ] Storage, write amplification, and replication impact have been considered.

## Migration compatibility

- [ ] Migration supports mixed application versions.
- [ ] Expand → migrate → contract is used where applicable.
- [ ] New required fields use staged rollout.
- [ ] Renames use compatibility transition when needed.
- [ ] Type changes have a safe conversion strategy.
- [ ] Old columns/tables are removed only after usage stops.
- [ ] Application rollback remains possible for the required window.

## Migration safety

- [ ] Lock behavior is understood.
- [ ] Lock timeout is bounded where appropriate.
- [ ] Large-table rewrite risk has been assessed.
- [ ] Migration disk requirements are understood.
- [ ] Replication impact has been assessed.
- [ ] High-risk migration has an owner.
- [ ] Abort criteria are defined.
- [ ] Rollback or roll-forward strategy is defined.

## Backfills

- [ ] Backfill has an authoritative source.
- [ ] Processing is batched.
- [ ] Cursor iteration is stable.
- [ ] Job is resumable.
- [ ] Job is idempotent.
- [ ] Rate limiting protects production traffic.
- [ ] Progress is observable.
- [ ] Row/batch failures are diagnosable.
- [ ] Completion is independently verified.
- [ ] Event/notification behavior is explicitly defined.

## API and application

- [ ] Internal schema changes do not unnecessarily alter public API contracts.
- [ ] Server validation aligns with database constraints.
- [ ] Form validation provides early user feedback.
- [ ] Database constraints remain the final integrity defense.
- [ ] Server state remains authoritative.
- [ ] Application code tolerates transitional schema state.

## Security

- [ ] Sensitive columns are classified.
- [ ] PII collection and retention are justified.
- [ ] Secrets are not modeled as ordinary application data without an approved design.
- [ ] Multi-tenant constraints provide appropriate defense in depth.
- [ ] Operational migration tools preserve authorization and tenant boundaries.
- [ ] Migration/audit logs do not leak sensitive data.

## UI and accessibility

- [ ] shadcn/ui is the component baseline.
- [ ] Data-management forms use canonical validation patterns.
- [ ] Destructive operations state their actual effect.
- [ ] Soft delete, archive, and permanent delete have distinct language.
- [ ] Status is not communicated by color alone.
- [ ] Tables have semantic headers.
- [ ] Keyboard operation is complete.
- [ ] Dialog focus behavior is correct.
- [ ] Design Tokens are used for status and lifecycle states.

---

# 5. Canonical summary

A database schema is a **durable domain contract**, not an implementation artifact.

Tables and columns **MUST** use consistent, semantically precise naming.

Entities **MUST** have stable identities.

Business uniqueness, referential integrity, nullability, and row-local invariants **MUST** be enforced by the database where the database has enough information to do so safely.

The canonical validation chain is:

```text
client / form validation
→ API validation
→ domain validation
→ database constraints
```

The outer layers provide good interaction and business semantics.

The database provides the final race-safe integrity boundary.

Transactional source-of-truth schemas **SHOULD** begin normalized.

Denormalization **MAY** be introduced deliberately for performance, search, reporting, or read models, but every duplicate value **MUST** have one defined authoritative source and synchronization strategy.

Soft delete **MUST NOT** be the default answer to every deletion problem.

Use soft deletion when restoration or retention semantics require it.

Use hard deletion or anonymization when policy requires actual removal.

Audit history, business history, and current state **MUST** remain conceptually distinct.

Multi-tenant systems **MUST** model tenant ownership explicitly.

Tenant boundaries **MUST** be enforced through authorization and **SHOULD** receive database-level defense in depth through tenant-aware uniqueness and referential constraints.

Schema evolution **MUST** assume mixed application versions.

The canonical migration strategy is:

```text
expand
→ deploy compatible code
→ backfill / migrate
→ verify
→ switch reads and writes
→ observe
→ contract
```

Breaking in-place schema changes **SHOULD NOT** be used during rolling deployments.

Renames, required fields, incompatible type changes, and destructive removals **MUST** use staged transitions where old and new application versions may coexist.

Large data changes **MUST** be handled as operational backfills.

Backfills **MUST** be:

```text
batched
+ resumable
+ idempotent
+ rate-limited
+ observable
+ verifiable
```

They **MUST NOT** overwhelm live production traffic or accidentally generate unrelated domain side effects.

Production migrations **MUST** account for locks, transaction duration, replication, disk, index behavior, and rollback or roll-forward recovery.

A migration that succeeds quickly on an empty development database **MUST NOT** be assumed safe under production load.

The canonical schema-evolution chain is:

```text
model invariant
→ encode database constraint
→ expand schema compatibly
→ deploy compatible application
→ migrate data safely
→ verify invariants
→ tighten constraints
→ remove legacy representation
```

Database constraints are the final defense, not the first user experience.

Application code **MUST** produce clear domain and validation errors before ordinary invalid input reaches them, while the database **MUST** remain capable of rejecting invalid state under concurrency, retries, alternate clients, background jobs, and future code paths.

Administrative interfaces **MUST** follow the canonical State Management, Forms & Validation, Accessibility, Design Tokens, Component, and Pattern standards, with **shadcn/ui as the component baseline**.

The final standard is:

> **Model domain truth explicitly. Preserve stable identity. Enforce critical invariants in the database. Evolve schemas additively before destructively. Backfill under bounded load. Verify before contracting. Never trade data integrity for migration convenience.**
