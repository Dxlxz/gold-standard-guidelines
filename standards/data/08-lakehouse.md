---
id: "lakehouse"
title: "Lakehouse & Table Format"
domain: "data"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["data", "lakehouse", "table", "format"]
applies_to: ["ui", "data"]
related: []
legacy_number: 60
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 68533
provenance: baseline

---

Below is the canonical companion standard for lakehouse storage and table management. It treats Iceberg, Delta Lake, and Hudi as transactional table layers over object/file storage, while keeping physical layout, retention, catalog state, and production-data governance explicit.

# Lakehouse & Table Format Guidelines — Gold Standard 2026

**Canonical placement:** `Data & Database → Lakehouse → Analytics → Infrastructure`  
**Status:** Gold Standard 2026  
**Applies to:** Analytical lakehouses, object-storage data lakes, Apache Iceberg, Delta Lake, Apache Hudi, Parquet datasets, batch and streaming ingestion, CDC/upsert pipelines, analytical tables, table catalogs, table-maintenance services, and query engines consuming open table formats.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are used as requirements.

---

# 1. Purpose

## 1.1 Objective

A production lakehouse is not a collection of Parquet files.

A production lakehouse is a managed data system comprising:

```text
Catalog
   ↓
Table-format metadata
   ↓
Snapshots / transaction history
   ↓
Manifests / transaction logs / timelines
   ↓
Data and delete/log files
   ↓
Object storage
```

The table format is responsible for turning immutable object-storage files into a transactional table abstraction.

Production lakehouse design MUST therefore govern:

- table-format selection;
- data-file format;
- catalog ownership;
- object-storage locations;
- partitioning;
- clustering and sort order;
- target file sizing;
- compaction;
- schema evolution;
- partition evolution;
- concurrency;
- transaction history;
- time travel;
- rollback;
- snapshot retention;
- orphan cleanup;
- metadata growth;
- storage lifecycle;
- interoperability;
- disaster recovery;
- security;
- observability;
- cost.

The governing principle is:

> **Applications and users interact with logical tables. The table format and catalog own the physical files that implement those tables.**

Data files MUST NOT be treated as independently mutable records once managed by a transactional table format.

## 1.2 Core principles

Production lakehouse systems MUST follow these principles.

1. **Tables, not directories, are the unit of management.** Readers and writers MUST use the table format rather than reconstructing table state by listing files.
2. **One authoritative metadata plane.** Every table MUST have a clearly defined catalog and table-format metadata history.
3. **Parquet by default.** Analytical base data SHOULD use Apache Parquet unless a documented workload requirement justifies another supported file format.
4. **Partition for elimination, cluster for locality.** Partitioning MUST NOT be used as a substitute for every possible query optimization.
5. **Avoid physical-layout overfitting.** Table layout SHOULD optimize dominant access patterns while remaining maintainable as workloads evolve.
6. **Small files are operational debt.** Continuous ingestion MUST include a file-sizing and compaction strategy.
7. **History has a cost.** Time travel, rollback, streaming recovery, audit requirements, and storage retention MUST be designed together.
8. **Cleanup is a correctness operation.** Snapshot expiration, cleaning, vacuuming, and orphan deletion MUST use table-format-aware maintenance rather than arbitrary object deletion.
9. **Schema changes are contracts.** Compatibility MUST be evaluated against producers, consumers, query engines, and historical data.
10. **Concurrency must be intentional.** Multiple writers and maintenance services MUST operate only under supported concurrency semantics.
11. **Object storage is not a database transaction manager.** Commit correctness MUST come from the table format and catalog protocol.
12. **Maintenance is production workload.** Compaction, clustering, snapshot cleanup, manifest maintenance, and catalog maintenance MUST be observable, budgeted, and scheduled.
13. **Production data remains governed data.** Open file formats do not weaken Security, Data & Database, retention, residency, or privacy requirements.

---

# 2. Rules

## 2.1 Canonical lakehouse architecture

A production deployment SHOULD follow this logical architecture:

```text
Producers / CDC / Batch / Streaming
              ↓
        Write Services
              ↓
        Table Format
  ┌───────────┼───────────┐
Iceberg      Delta       Hudi
  └───────────┼───────────┘
              ↓
       Catalog / Metadata
              ↓
        Object Storage
              ↓
      Parquet Data Files
              ↓
 Query / ETL / ML Engines
```

Storage and metadata responsibilities MUST remain distinct.

The object store owns objects.

The table format owns:

- which objects belong to a table;
- which version is current;
- which files are visible;
- which files have been superseded;
- table schema;
- partition or clustering metadata;
- transaction history.

The catalog owns, or provides access to, the authoritative table identity and current metadata pointer appropriate to the selected format.

Compute engines MUST NOT infer current table state independently from object-storage directory contents.

---

## 2.2 Table-format selection

The organization SHOULD support a deliberately limited set of production table formats.

A platform MUST NOT introduce Iceberg, Delta, and Hudi interchangeably on a table-by-table basis without a documented decision framework.

The selected format SHOULD reflect:

- query-engine ecosystem;
- write pattern;
- update frequency;
- CDC requirements;
- incremental-query requirements;
- multi-engine interoperability;
- catalog architecture;
- streaming requirements;
- operational expertise;
- managed-platform constraints.

### Apache Iceberg

Iceberg SHOULD be considered when requirements emphasize:

- multi-engine analytical interoperability;
- catalog-driven table management;
- hidden partitioning;
- partition evolution;
- flexible schema evolution;
- snapshot-based analytical tables;
- object-storage-native operation;
- standardized catalog APIs.

Iceberg tracks table state in metadata and snapshots, supports schema and partition-spec evolution, and uses atomic table metadata replacement for transactional commits. Its format specification explicitly separates logical table state from physical partition layout. citeturn987166search8turn384992search5

Iceberg REST Catalog SHOULD be preferred where a standardized catalog protocol materially improves engine interoperability, centralized authorization, credential vending, or metadata control. The REST protocol provides a common catalog API and supports server-side commit coordination and conflict handling. citeturn987166search1

### Delta Lake

Delta Lake SHOULD be considered when requirements emphasize:

- Delta-native processing;
- Spark-centric workloads;
- transactional batch and streaming pipelines;
- frequent `MERGE`, `UPDATE`, and `DELETE`;
- ecosystem support for Delta transaction-log semantics;
- clustering and optimization workflows.

Delta Lake provides snapshot isolation and optimistic concurrency control, validating write conflicts before committing a new table version. citeturn725997search0

Delta's current open-source implementation also supports liquid clustering for evolving data-layout requirements without requiring traditional static partitioning for every clustering dimension. citeturn725997search1

### Apache Hudi

Hudi SHOULD be considered when requirements emphasize:

- high-frequency ingestion;
- CDC;
- upserts and deletes;
- incremental consumption;
- streaming-oriented storage management;
- integrated compaction, clustering, cleaning, and indexing.

Hudi's storage engine explicitly integrates table services such as compaction, clustering, cleaning, indexing, and concurrency control around frequent data changes. citeturn292154search6

### Format proliferation

A new table format MUST NOT be approved solely because:

- a team prefers its syntax;
- one engine has a convenient connector;
- a benchmark demonstrates one isolated advantage;
- a new feature is fashionable.

Adoption MUST include operational ownership, catalog compatibility, recovery procedures, maintenance, monitoring, and interoperability analysis.

---

## 2.3 Table-format ownership

Every production table MUST have exactly one authoritative transactional format at any point in time.

The platform MUST NOT independently mutate the same logical table through multiple incompatible metadata formats.

For example, a directory MUST NOT simultaneously be treated as:

```text
plain Parquet
and
independently managed Iceberg
and
independently managed Delta
```

unless an explicitly supported metadata interoperability layer governs the arrangement.

Metadata translation or compatibility layers MAY be used only where:

- supported by the involved table systems;
- ownership is unambiguous;
- write authority is defined;
- consistency behavior is understood;
- failure recovery is tested.

A compatibility layer MUST NOT create multiple independent writers believing they each own table state.

---

## 2.4 File format

### Parquet baseline

**Apache Parquet is the canonical analytical data-file format.**

Production analytical tables SHOULD store base data in Parquet unless a format-specific requirement justifies an alternative.

Parquet is column-oriented and stores column-chunk and row-group metadata that allows readers to locate and selectively read required column data. citeturn292154search0

Parquet SHOULD be used for:

- analytical scans;
- warehouse/lakehouse facts and dimensions;
- historical event tables;
- feature and ML datasets;
- intermediate analytical datasets intended for repeated reuse.

### Row groups

Parquet row-group sizing SHOULD balance:

- predicate pruning;
- parallelism;
- compression;
- memory;
- scan granularity.

Writers MUST NOT independently select pathological row-group sizes without workload evidence.

A table platform SHOULD standardize sensible defaults per compute engine and workload tier.

### Compression

A supported columnar compression codec SHOULD be enabled by default.

Codec selection SHOULD prioritize:

- broad engine compatibility;
- compression ratio;
- decompression CPU cost;
- scan performance.

The platform SHOULD standardize codec choices instead of permitting arbitrary per-job variation.

### Format correctness

Application jobs MUST NOT mutate Parquet files in place.

Changes to a transactional table MUST create new data/delete/log files and commit them through the table-format protocol.

---

## 2.5 Table identity and catalog management

Every production table MUST be registered in an approved catalog unless the table-format architecture explicitly provides an equivalent authoritative metadata service.

A canonical table identity SHOULD follow:

```text
catalog.namespace.table
```

or the equivalent hierarchy for the selected platform.

Examples:

```text
prod.sales.orders
prod.finance.invoice_lines
analytics.product.daily_metrics
```

### Catalog authority

The catalog or table-format metadata MUST be authoritative for:

- table existence;
- namespace;
- schema;
- table location;
- current metadata;
- supported table properties;
- current version/snapshot;
- ownership metadata.

Object-storage path existence MUST NOT independently establish table existence.

### Catalog bypass

Applications SHOULD NOT create production tables by manually writing files and later attempting to “discover” them.

Table creation SHOULD occur through the approved catalog/table API.

### Catalog interoperability

If multiple engines access a table, all engines MUST use catalog integrations compatible with the table's transactional semantics.

A stale external metastore schema MUST NOT be assumed to reflect current table metadata where the table format maintains its own schema.

### Iceberg catalog baseline

For Iceberg, a production catalog SHOULD provide atomic commit semantics suitable for concurrent writers. Current Iceberg supports multiple catalog implementations and a standardized REST catalog protocol; REST Catalog centralizes catalog interactions and can provide server-side commit processing. citeturn987166search3turn987166search1

### Catalog availability

Catalog infrastructure MUST be operated as production control-plane infrastructure.

It SHOULD have:

- high availability appropriate to workload;
- authentication;
- authorization;
- backup or recoverability;
- monitoring;
- latency SLOs;
- change audit;
- capacity planning.

---

## 2.6 Object-storage layout

Object-storage locations MUST be platform-owned.

A canonical hierarchy SHOULD resemble:

```text
<environment>/<domain>/<namespace>/<table>/
```

or use a catalog-managed opaque equivalent.

Human readability MAY be provided but MUST NOT be required for query planning.

### Environment isolation

Production, staging, development, and test data MUST use separate storage security boundaries or rigorously separated prefixes with equivalent enforcement.

Production jobs MUST NOT accidentally write into development prefixes or vice versa.

### Direct path access

Consumers SHOULD reference catalog tables, not raw storage paths.

Direct path access SHOULD be restricted to:

- maintenance tooling;
- disaster recovery;
- controlled migrations;
- platform diagnostics.

### File naming

Applications MUST NOT depend on data-file names.

Files SHOULD be treated as opaque immutable objects.

### Partition path assumptions

Consumers MUST NOT parse object paths to infer business values when the table format provides partition metadata.

This is particularly important for formats such as Iceberg, where partitioning is logical table metadata and may evolve independently of query syntax. Iceberg specifically supports hidden partitioning and multiple partition specifications coexisting within one table. citeturn384992search7

### Object distribution

At very large scale, physical object layout MAY include hash distribution or other prefix-spreading mechanisms to avoid pathological object-store access patterns.

For example, Iceberg provides an object-storage location provider capable of incorporating hashes into file paths. citeturn987166search2

Applications MUST NOT rely on a specific physical prefix layout when the table format abstracts it.

---

## 2.7 Partitioning strategy

Partitioning MUST be driven by measurable data skipping, write behavior, retention, and query patterns.

Tables MUST NOT be partitioned by convention alone.

### Good partition candidates

Partitioning SHOULD favor columns or transforms that:

- appear frequently in selective query predicates;
- create bounded partition counts;
- distribute sufficient data per partition;
- align with lifecycle or retention boundaries;
- reduce files touched by common mutation operations.

Typical candidates include:

```text
event_date
business_date
region
tenant_group
bounded source category
```

depending on cardinality and scale.

### High-cardinality partitioning

Tables SHOULD NOT physically partition by extremely high-cardinality dimensions such as:

```text
user_id
session_id
transaction_id
request_id
UUID
email
```

unless workload-specific evidence proves that such layout is appropriate.

High-cardinality partitioning frequently creates:

- excessive metadata;
- sparse partitions;
- small files;
- planning overhead;
- costly directory/object counts.

Delta's own best-practice guidance similarly warns against high-cardinality partition columns and recommends partitioning only where partitions contain meaningful data volume. citeturn725997search7

### Over-partitioning

A partition SHOULD contain enough data to justify being an independent pruning unit.

The platform SHOULD flag tables where typical partitions contain only a small number of files or megabytes of data.

As an initial analytical rule of thumb, physical partitions SHOULD generally represent **hundreds of megabytes to multiple gigabytes** rather than thousands of tiny fragments, unless streaming latency or another documented requirement dictates otherwise.

This is a starting point, not a universal constant.

### Time partitioning

Time-series tables SHOULD select the coarsest time transform that still provides required pruning.

Prefer:

```text
day(timestamp)
```

over:

```text
hour(timestamp)
```

unless hourly layout has measurable benefit.

Prefer:

```text
month(timestamp)
```

when daily partitions provide no useful additional pruning.

### Query syntax

Query authors SHOULD filter logical business columns, not synthetic physical partition path columns, where the table format supports partition transforms.

---

## 2.8 Partition evolution

Changing data scale or access patterns MUST NOT automatically require rebuilding an entire logical table.

### Iceberg

Iceberg SHOULD use native partition evolution where appropriate.

Old files may remain under earlier partition specifications while new writes use a new specification; Iceberg plans each layout according to its corresponding metadata. citeturn384992search7

This means a table may evolve, for example:

```text
month(event_time)
        ↓
day(event_time)
```

without requiring an immediate rewrite of all historical data.

### Delta

Traditional Delta physical partitioning MUST be changed deliberately because existing partition layout is materially reflected in stored data.

For workloads where clustering provides better flexibility, teams SHOULD evaluate liquid clustering rather than repeatedly redesigning static partition layouts. Liquid clustering permits clustering-column changes while existing data can be incrementally or explicitly reclustered. citeturn725997search1

### Hudi

Hudi partition-layout changes MUST follow currently supported Hudi migration/evolution capabilities for the deployed engine/version.

Teams MUST NOT assume Iceberg-style transparent partition-spec evolution semantics apply to Hudi.

### General rule

Partition evolution MUST be tested against:

- all query engines;
- streaming readers;
- incremental readers;
- maintenance jobs;
- data lifecycle tooling;
- downstream assumptions.

---

## 2.9 Clustering and sort strategy

Clustering and sorting SHOULD optimize data locality within or instead of physical partitions.

Clustering SHOULD be considered for frequently filtered dimensions that are unsuitable for coarse physical partitioning.

Typical examples include:

```text
customer_id
account_id
device_id
country
category
event_type
timestamp within a date partition
```

### Cluster-column selection

Clustering columns SHOULD:

- appear frequently in selective filters;
- have measurable pruning/data-skipping benefit;
- avoid unnecessary redundancy with highly correlated columns;
- remain small in number.

Teams MUST NOT cluster on every commonly queried column.

### Workload-driven design

Clustering strategy MUST be validated using real query telemetry.

The platform SHOULD periodically evaluate whether:

- clustering keys remain useful;
- query patterns have changed;
- skew has increased;
- rewrite cost exceeds benefit.

### Delta

Delta liquid clustering MAY be used for tables whose access pattern is difficult to represent with static partitions, particularly high-cardinality or evolving filter dimensions. Current Delta documentation specifically identifies high-cardinality filters, skew, fast-growing data, and evolving access patterns as suitable cases. citeturn725997search1

### Hudi

Hudi clustering MAY be used to:

- consolidate small files;
- reorganize file groups;
- sort data by query-relevant keys.

Hudi separates clustering from merge-on-read compaction: compaction merges delta logs into base files, while clustering reorganizes layout and can consolidate files. citeturn292154search4

### Iceberg

Iceberg data-file rewrite operations MAY use bin-packing or sorting strategies as appropriate. Current Iceberg maintenance procedures support rewriting data files with bin-pack or sort strategies, including Z-order options in supported integrations. citeturn384992search1

---

## 2.10 Small-file problem

Small-file accumulation MUST be actively monitored.

A high count of small files causes:

- object-open overhead;
- query-planning overhead;
- excess manifests/log metadata;
- scheduler overhead;
- poor compression;
- inefficient scans;
- higher API/storage-operation costs.

Iceberg documentation explicitly notes that increasing file counts increases metadata and file-open overhead, and provides data-file rewriting for compaction. citeturn384992search0

Delta similarly recommends regular compaction where continuous writes accumulate many small files. citeturn292154search11turn725997search7

Hudi clustering is designed in part to consolidate small files into more efficient target-sized files. citeturn292154search4

### Target file size

Analytical tables SHOULD define a target file size.

A reasonable initial platform baseline is commonly:

```text
256 MiB – 512 MiB
```

for large analytical Parquet tables.

Tables MAY use:

```text
128 MiB
```

for lower-latency or lower-volume workloads, or larger targets such as:

```text
512 MiB – 1 GiB
```

for scan-heavy environments where engine behavior and object-store throughput justify it.

These are platform starting points, not universal constants.

Target size MUST be validated against:

- query engine;
- scan parallelism;
- write throughput;
- object-store latency;
- partition size;
- memory;
- compaction cost.

### Micro-batch ingestion

Streaming and micro-batch writers SHOULD NOT force every ingestion interval to produce independently finalized tiny Parquet files when buffering or table services can safely achieve healthier file sizes.

Freshness requirements and file efficiency MUST be balanced explicitly.

---

## 2.11 Compaction

Compaction MUST be considered part of table operation, not emergency cleanup.

The platform SHOULD define automatic or scheduled compaction triggers based on metrics such as:

```text
small-file count
median file size
p10/p50 file size
files per partition
bytes requiring rewrite
query scan amplification
commit count
elapsed time
```

### Trigger design

Compaction SHOULD be triggered based on table condition rather than an arbitrary universal cron schedule where practical.

For example:

```text
IF small_files > threshold
OR median_file_size < target * threshold
THEN schedule compaction
```

### Bounded rewrites

Compaction jobs SHOULD limit:

- bytes rewritten per run;
- partitions rewritten;
- concurrent jobs;
- runtime;
- compute cost.

A single maintenance cycle SHOULD NOT needlessly rewrite an entire multi-petabyte table.

### Concurrent writes

Compaction MUST use native format-aware rewrite operations.

It MUST NOT:

1. read Parquet files;
2. manually replace them;
3. delete old files;
4. attempt to repair metadata afterward.

### Iceberg

Use table-format-aware data-file rewrite operations such as `rewrite_data_files`. Iceberg can safely commit compaction under its optimistic concurrency model when the source files remain valid; conflicting changes must fail validation rather than silently overwrite concurrent work. citeturn384992search5turn384992search1

### Delta

Use supported `OPTIMIZE`/compaction semantics. Delta treats compaction as a transactional table operation and its optimistic concurrency control detects conflicting file rewrites. citeturn292154search11turn725997search0

### Hudi

Copy-on-write tables MAY primarily use clustering/file sizing.

Merge-on-read tables MUST additionally operate an appropriate compaction strategy to merge accumulated delta logs into base file slices. Hudi explicitly distinguishes this merge-on-read compaction operation from clustering. citeturn292154search3turn292154search4

---

## 2.12 Maintenance scheduling

Every production table MUST belong to a maintenance policy.

The policy SHOULD cover as applicable:

```text
compaction
clustering
snapshot expiration
vacuum / cleaning
orphan cleanup
metadata cleanup
manifest rewrite
statistics refresh
index maintenance
```

Maintenance MUST NOT rely solely on someone noticing degraded query performance.

### Maintenance tiers

The platform SHOULD define table-service tiers such as:

```text
High-change
Standard
Archive
Regulated-history
```

with different:

- compaction frequency;
- history retention;
- cleanup schedule;
- query-performance targets.

### Maintenance ownership

Every maintenance workflow MUST have:

- owner;
- scheduler;
- resource budget;
- failure alert;
- retry policy;
- concurrency policy;
- observability.

---

## 2.13 Snapshot, transaction-log, and timeline retention

Historical table metadata MUST have an explicit retention policy.

Retention MUST be derived from requirements such as:

```text
time-travel window
rollback window
streaming lag
incremental consumption
audit requirements
recovery objectives
legal retention
storage budget
```

History MUST NOT be retained indefinitely by accident.

History MUST NOT be deleted aggressively without understanding reader and recovery requirements.

### Minimum safe window

The retention window MUST exceed all known operations that still legitimately depend on historical files.

This includes:

- longest-running queries;
- slow or paused stream readers;
- rollback requirements;
- incremental readers;
- disaster-recovery procedures.

### Iceberg

Every Iceberg write creates a snapshot. Regular snapshot expiration is recommended to prevent unused files and metadata from growing without bound. Once an old snapshot is expired, it is no longer available for time travel. citeturn384992search0

### Delta

Delta `VACUUM` deletes unreferenced data files older than the retention threshold. Current Delta documentation defaults the data-file retention threshold to seven days and warns that retention must exceed the longest concurrent transaction and stream lag; vacuuming older files removes corresponding time-travel capability. citeturn725997search4

### Hudi

Hudi cleaning reclaims older file slices according to configured retention policy. Cleaning directly constrains how much history remains usable for time travel and incremental consumption. Hudi recommends regular cleaning so storage does not grow without bound. citeturn292154search1

---

## 2.14 Orphan-file cleanup

Orphan cleanup MUST be format-aware.

An orphan is not simply:

```text
"a file older than N days"
```

It is a file that the authoritative table metadata determines is no longer referenced or required.

### Safety interval

Orphan deletion MUST use a safety interval longer than the maximum plausible duration of incomplete writes and maintenance operations.

The cleanup process MUST NOT classify a still-running writer's staged file as orphaned.

Iceberg specifically warns that orphan deletion with retention shorter than the expected duration of writes can corrupt a table; its current default orphan-cleanup interval is three days. citeturn384992search0

### Dry run

Destructive orphan cleanup SHOULD support or use a dry-run/list mode before deletion, particularly:

- during initial rollout;
- after storage migration;
- after path/scheme changes;
- following catalog recovery.

Iceberg's current procedure includes a dry-run option for this purpose. citeturn384992search1

### Manual deletion

Operators MUST NOT manually delete suspected orphan files from production table directories except through an approved disaster-recovery procedure.

---

## 2.15 Metadata maintenance

Data files are not the only source of table growth.

Teams MUST monitor table-format metadata growth.

Depending on format, this includes:

```text
snapshots
manifest lists
manifests
transaction logs
checkpoints
timeline metadata
indexes
metadata-table files
```

### Iceberg

High-commit-frequency Iceberg tables SHOULD manage snapshot, manifest, and metadata-file growth.

Iceberg provides:

- snapshot expiration;
- orphan deletion;
- metadata-file retention controls;
- manifest rewriting.

Its documentation notes that streaming/high-frequency tables can accumulate many metadata versions and may require active cleanup. citeturn384992search0

### Delta

Delta transaction-log/checkpoint retention SHOULD be configured consistently with required history and operational recovery.

Vacuum policy and log-retention policy MUST be considered together rather than independently. Delta distinguishes data-file vacuum retention from transaction-log retention. citeturn725997search4

### Hudi

Hudi timeline, metadata, cleaning, compaction, clustering, and indexing services SHOULD be monitored as part of table health.

---

## 2.16 Schema ownership

Every table MUST have an authoritative schema.

Schema changes MUST be executed through the table-format/catalog interface rather than by independently changing Parquet writers.

A producer MUST NOT assume that writing files with additional columns automatically changes the production table contract.

### Schema change classes

Schema changes SHOULD be classified as:

```text
Compatible
Conditionally compatible
Breaking
```

Examples commonly include:

**Generally compatible**

```text
add nullable column
add field with compatible default semantics
supported numeric widening
```

**Conditionally compatible**

```text
rename column
reorder fields
change nullability
change nested structure
```

**Breaking**

```text
drop consumed column
incompatible type change
semantic repurposing of an existing field
```

Exact compatibility MUST follow the selected table format and all production readers.

---

## 2.17 Schema evolution

Schema evolution MUST be tested across every supported read/write engine.

Support by the table format does not guarantee that every downstream connector handles the change identically.

### Iceberg

Iceberg SHOULD use native schema evolution.

Iceberg assigns field identities in metadata and supports safe logical operations including adding, dropping, renaming, and reordering fields according to the format specification. citeturn987166search8turn987166search14

### Delta

Delta schema validation MUST remain enabled.

Automatic schema evolution SHOULD be scoped to explicit operations rather than globally enabled without governance.

Delta validates incoming data against the table schema and supports explicit and operation-scoped schema evolution. Current Delta releases provide operation-level schema-evolution APIs in addition to earlier `mergeSchema` behavior. citeturn725997search5

A pipeline MUST NOT automatically absorb arbitrary upstream columns merely because automatic schema merge exists.

### Hudi

Hudi SHOULD prefer backward-compatible evolution such as nullable-column additions and supported type promotions.

More complex schema-on-read behavior MUST be treated cautiously; in current Hudi 1.2 documentation, schema-on-read support for backward-incompatible evolution remains experimental. citeturn987166search0

### Contracts

Breaking schema changes MUST trigger the normal Data & Database contract-change process.

---

## 2.18 Semantic schema changes

A physical schema-compatible change may still be semantically breaking.

For example:

```text
amount: decimal(18,2)
```

remaining the same type while changing from:

```text
gross_amount
```

to:

```text
net_amount
```

is a breaking contract change.

Teams MUST NOT use schema-evolution support to bypass semantic versioning or consumer coordination.

Columns SHOULD have documented business meaning where the table is a shared data product.

---

## 2.19 Concurrent writers

Concurrent writing MUST use only concurrency modes explicitly supported by the selected table format and deployment architecture.

Teams MUST NOT infer safety from the fact that writers target different physical object paths.

### Iceberg

Iceberg supports optimistic concurrency.

Writers create new metadata and atomically attempt to make it current. If another writer has committed first, the conflicting writer validates assumptions against the updated table state and retries or fails. citeturn384992search5

Writers MUST use a catalog/commit mechanism that provides the required atomic commit semantics.

### Delta

Delta uses optimistic concurrency control with read, write/stage, and validate/commit phases.

Conflicting `UPDATE`, `DELETE`, `MERGE`, or compaction operations MAY fail when they touch overlapping data. citeturn725997search0

Pipelines MUST treat conflict exceptions as transaction conflicts rather than generic infrastructure failures.

### Hudi

Hudi supports several concurrency models, including:

- single-writer;
- optimistic concurrency control;
- MVCC interactions with table services;
- specific non-blocking concurrency configurations.

The configured mode MUST match the table type, writer architecture, and supported feature set. Current Hudi documentation notes limitations on non-blocking concurrency and recommends appropriate coordination for multi-writer deployments. citeturn292154search2

### Retry safety

Concurrency retries MUST:

- be bounded;
- distinguish conflicts from transient failures;
- preserve write idempotency;
- avoid duplicating ingested source records.

---

## 2.20 Streaming writers

Streaming pipelines MUST have deterministic checkpoint and idempotency semantics.

A restarted stream MUST NOT duplicate or omit data merely because the target table supports ACID transactions.

The source checkpoint and destination commit semantics MUST be designed together.

### Checkpoint uniqueness

Independent active streaming jobs MUST NOT share the same writer checkpoint identity unless the streaming framework explicitly supports that configuration.

Delta, for example, documents concurrent use of the same streaming checkpoint location as an invalid concurrent transaction scenario. citeturn725997search0

### Streaming and maintenance

Maintenance retention MUST allow for the maximum acceptable streaming lag.

Files required by lagging readers MUST NOT be cleaned prematurely.

---

## 2.21 Time travel

Time travel MUST be treated as a governed recovery and reproducibility feature.

It SHOULD support uses such as:

- incident analysis;
- reproducible analytics;
- debugging;
- audit;
- accidental-write recovery;
- comparison across versions.

### Retention dependency

Time travel is available only while required historical metadata and files remain retained.

Applications MUST NOT promise:

```text
"90-day time travel"
```

while cleanup policies retain only seven days of necessary data.

### Stable references

For reproducible workflows, explicit version/snapshot identifiers SHOULD be preferred over approximate wall-clock timestamps where supported.

A job expected to reproduce an exact historical result SHOULD persist the table version/snapshot ID used.

### Historical schemas

Consumers using historical versions MUST account for the schema associated with those versions.

---

## 2.22 Rollback and restore

Rollback MUST use table-format-aware operations.

Operators MUST NOT implement rollback by:

```text
copying old Parquet files back
deleting recent objects manually
rewriting metadata pointers by hand
```

except under documented format-specific disaster-recovery procedures.

### Recovery testing

Critical tables SHOULD regularly test rollback/restore procedures.

Testing SHOULD establish:

- recovery time;
- maximum rollback window;
- downstream consistency behavior;
- interaction with streaming jobs;
- whether new history is created by the restore.

### Rollback is not backup

Time travel and rollback MUST NOT be considered a substitute for required backups or disaster recovery.

A catastrophic loss of the object-storage account, catalog, or encryption keys may destroy both current and historical snapshots.

---

## 2.23 Delete semantics

Logical row deletion and physical file deletion MUST be distinguished.

A row `DELETE` may:

- rewrite data files;
- create position/equality delete files;
- create delta logs;
- produce new table versions.

Physical removal normally occurs later through table maintenance.

Privacy or regulatory deletion workflows MUST therefore account for both:

```text
logical invisibility
and
physical retention lifecycle
```

where required by policy or law.

Deletion SLAs MUST specify which semantic is required.

---

## 2.24 Data lifecycle and storage tiers

Each table MUST have a lifecycle classification.

A table policy SHOULD specify:

```text
hot query window
time-travel window
rollback window
legal retention
archive policy
deletion policy
expected growth
```

### Object-store lifecycle rules

Generic object-store lifecycle policies MUST NOT independently delete objects inside active transactional-table locations unless the table-format architecture explicitly supports that lifecycle action.

For example, a rule such as:

```text
delete all objects older than 30 days
```

MUST NOT be applied blindly to a live Iceberg, Delta, or Hudi table prefix.

Files older than the cutoff may still be referenced by current table state.

### Storage classes

Moving table objects to colder storage MAY be permitted only if:

- query engines support the storage class;
- retrieval latency meets requirements;
- table metadata remains consistent;
- restore costs are understood.

---

## 2.25 Cost management

Lakehouse cost MUST be measured across more than raw stored bytes.

Platform teams SHOULD monitor:

```text
stored bytes
historical bytes
orphan bytes
object count
GET/LIST/PUT/DELETE operations
metadata operations
scan bytes
compaction bytes rewritten
maintenance compute
catalog infrastructure
query compute
```

### Write amplification

Tables with frequent updates MUST monitor write amplification.

If changing:

```text
1 GiB logical data
```

regularly causes:

```text
50 GiB physical rewrite
```

the storage layout or table mode requires review.

### Maintenance ROI

Compaction and clustering MUST NOT be run simply because they exist.

The cost of maintenance SHOULD be compared against:

- query savings;
- ingestion savings;
- metadata reduction;
- object-operation reduction.

---

## 2.26 Table health metrics

Every production table SHOULD expose health indicators.

At minimum:

```text
total data size
data-file count
average / median file size
small-file count
partition count
files per partition
snapshot/version count
metadata size
orphan cleanup age
last compaction
last cleanup
last successful maintenance
write throughput
query scan bytes
commit failure/conflict rate
```

Format-specific tables SHOULD additionally expose appropriate metrics such as:

**Iceberg**

```text
manifest count
manifest size
delete-file count
snapshot count
```

**Delta**

```text
transaction-log growth
checkpoint health
vacuum age
OPTIMIZE status
```

**Hudi**

```text
file-slice health
log-file growth
compaction backlog
clustering backlog
cleaner status
timeline health
```

---

## 2.27 Maintenance SLOs

Critical tables SHOULD define maintenance SLOs.

Examples:

```text
p50 data file size ≥ 256 MiB
small files < 10% of table files
snapshot cleanup age < 48 h
no failed maintenance > 24 h
compaction backlog < configured threshold
orphan cleanup completed within 7 days
```

Exact thresholds MUST be workload-specific.

Alerts SHOULD target sustained unhealthy conditions rather than isolated small writes.

---

## 2.28 Table properties as infrastructure configuration

Production-critical table properties MUST be managed as code where practical.

This includes:

```text
format version
retention
partition spec
sort order
clustering keys
file-size targets
compression
write distribution
schema
cleanup configuration
```

Manual ad hoc modifications in production SHOULD be avoided.

Changes MUST be:

- reviewed;
- observable;
- reproducible;
- rollback-aware.

---

## 2.29 Table protocol and format upgrades

Table-format or protocol upgrades MUST be treated as compatibility changes.

Before upgrading a table to a newer format/protocol feature, teams MUST verify:

```text
all writers support it
all readers support it
all query engines support it
maintenance tools support it
recovery tooling supports it
```

An upgrade MUST NOT occur merely because the latest writer supports it.

### Irreversible upgrades

Features whose protocol version cannot be downgraded MUST receive particular review.

For example, Delta's liquid clustering activates table features with protocol implications, and its documentation notes that corresponding protocol versions cannot simply be downgraded. citeturn725997search1

---

## 2.30 Cross-engine compatibility

A table is production-compatible only if every supported engine is verified against:

- table-format version;
- schema types;
- delete semantics;
- partition evolution;
- time travel;
- clustering;
- catalog;
- authentication;
- encryption.

“Can read Parquet” does not mean:

```text
"Can correctly read this lakehouse table."
```

Readers MUST interpret table-format metadata.

Bypassing metadata may return:

- logically deleted rows;
- superseded files;
- duplicate versions;
- incomplete writes.

---

## 2.31 Migration between formats

Format migration MUST be treated as a data-system migration.

A migration plan MUST define:

```text
source of truth during migration
write freeze or dual-write behavior
metadata conversion
historical version behavior
validation
cutover
rollback
cleanup
```

### Dual write

Dual writing the same source independently into two formats SHOULD be avoided where exact equivalence is required unless deterministic reconciliation exists.

### Historical semantics

A new table format MUST NOT be assumed to preserve the source table's complete historical version lineage.

Migration validation MUST include data correctness, not merely row counts.

---

## 2.32 Security alignment

Lakehouse infrastructure MUST comply with Security standards.

### Object storage

Production table locations MUST enforce:

- private access;
- least-privilege IAM;
- encryption at rest;
- encryption in transit;
- environment isolation;
- access logging where required.

Users SHOULD access tables through approved engines/catalog identities rather than unrestricted object-store credentials.

### Catalog security

Catalog authorization SHOULD be centrally enforced where possible.

Catalog permissions SHOULD distinguish:

```text
list
read
create
alter
write
drop
maintenance
```

### Credential exposure

Compute engines SHOULD receive short-lived or scoped credentials where supported.

Long-lived object-storage credentials MUST NOT be embedded in table metadata or job source code.

Iceberg's REST catalog protocol, for example, supports secure table sharing patterns including credential vending or remote request signing. citeturn987166search1

### Direct object access

An identity authorized to query a table MUST NOT automatically receive permission to delete arbitrary underlying table files.

---

## 2.33 Data & Database alignment

Lakehouse tables are databases for governance purposes.

They MUST comply with the canonical Data & Database standard for:

- ownership;
- naming;
- classification;
- retention;
- quality;
- lineage;
- schema contracts;
- PII;
- residency;
- deletion;
- access control.

Open storage formats MUST NOT be used to bypass normal database governance.

### Source of truth

Each shared table MUST identify whether it is:

```text
source of record
derived canonical dataset
serving projection
temporary/intermediate
```

Temporary tables MUST have lifecycle expiration.

---

## 2.34 API alignment

Programmatic table management MUST occur through approved APIs, catalogs, engine integrations, or table-format libraries.

Maintenance APIs MUST have:

- authenticated identity;
- validated parameters;
- authorization;
- idempotency where relevant;
- error semantics;
- auditability.

An API exposing:

```text
deleteObject(path)
```

SHOULD NOT be used as the normal table-maintenance interface.

Prefer semantic operations:

```text
expireSnapshots(table, policy)
compactTable(table, predicate)
vacuumTable(table, retention)
```

where policy is enforced by trusted infrastructure.

---

## 2.35 State Management alignment

The authoritative table state MUST come from table-format metadata and the approved catalog.

Applications MUST NOT maintain independent mutable state such as:

```text
current_snapshot = "..."
current_files = [...]
```

without a defined consistency relationship with the authoritative catalog.

### UI state

Administrative UIs MAY cache displayed table health state.

Cached UI state MUST NOT be treated as authoritative for destructive actions.

Before performing:

```text
rollback
vacuum
expire snapshots
drop table
change partitioning
```

the backend MUST reload authoritative table state and revalidate the operation.

---

## 2.36 Forms & Validation alignment

Any control plane that allows operators to configure tables MUST use typed validation.

Fields such as:

```text
snapshot retention
target file size
partition transform
clustering columns
maintenance interval
orphan threshold
```

MUST have domain validation.

For example:

```text
orphanRetention = 1 minute
```

MUST NOT be accepted merely because it is a syntactically valid duration if it violates the platform safety floor.

Dangerous retention reductions SHOULD require:

- impact preview;
- confirmation;
- policy validation.

Generated configuration MUST undergo the same validation as manually entered configuration.

---

## 2.37 Accessibility alignment

Lakehouse administrative interfaces MUST conform to the Accessibility standard.

Interfaces for:

- table health;
- schema changes;
- snapshot browsing;
- rollback;
- cleanup;
- compaction;
- lifecycle configuration

MUST remain keyboard accessible and semantically structured.

### Data tables

Large metadata tables MUST use accessible table patterns.

Column headers, sorting state, pagination, selection, and row actions MUST have programmatic semantics.

### Status

States such as:

```text
Healthy
Maintenance overdue
Compaction running
Cleanup failed
Rollback pending
```

MUST NOT be represented through color alone.

### Destructive actions

Rollback, vacuum, snapshot expiry, table deletion, and other consequential operations MUST expose their impact clearly to assistive technology.

---

## 2.38 Design Tokens alignment

Any lakehouse management UI MUST use approved semantic design tokens.

The interface MUST NOT invent arbitrary styling for:

- health state;
- storage tier;
- warning state;
- destructive actions;
- retention risk;
- query cost.

Status semantics MUST use established tokens such as the corpus-approved equivalents of:

```text
success
warning
danger
muted
informational
```

Color MUST NOT be the only semantic signal.

---

## 2.39 Component and Pattern alignment

**shadcn/ui is the canonical component baseline** for React-based lakehouse management interfaces.

Approved shadcn components SHOULD be used for common infrastructure-management interactions, including:

```text
Table / DataTable
Badge
Tabs
Card
Dialog
AlertDialog
Alert
Tooltip
Popover
Select
Input
Switch
Button
Progress
Skeleton
Sheet
```

### Table management

Table-health views SHOULD use approved table/data-grid patterns rather than custom div-based grids.

### Destructive maintenance

Operations such as:

```text
VACUUM
expire snapshots
remove orphans
drop table
rollback
```

MUST use the corpus-standard consequential/destructive-action pattern.

### Retention changes

A retention change that may permanently eliminate historical recovery MUST require a clearly differentiated confirmation flow.

### Primitive layer

Generated UI SHOULD target the approved shadcn component abstraction rather than depend directly on the underlying primitive library unless implementation requirements demand it.

Project configuration remains authoritative.

---

# 3. Anti-patterns

## 3.1 “It's just Parquet”

**Anti-pattern:** Reading all `.parquet` objects underneath a transactional table.

**Why it fails:** The directory may contain superseded, deleted, staged, or historical files.

**Required correction:** Read through the table-format metadata.

---

## 3.2 Directory listing as table state

**Anti-pattern:**

```text
LIST s3://bucket/table/
→ assume returned files = current table
```

**Required correction:** Resolve current state through the catalog/table format.

---

## 3.3 Every team chooses a format

**Anti-pattern:** One team uses Iceberg, another Delta, another Hudi without platform criteria or operational ownership.

**Required correction:** Maintain an approved decision framework and intentionally limited platform surface.

---

## 3.4 Direct object deletion

**Anti-pattern:**

```text
rm s3://warehouse/orders/old-file.parquet
```

because the object appears unused.

**Required correction:** Use format-aware cleanup.

---

## 3.5 Object-store lifecycle deleting table files

**Anti-pattern:**

```text
DELETE objects older than 30 days
```

on a live table prefix.

**Why it fails:** Referenced files can be older than the lifecycle threshold.

**Required correction:** Let table-format maintenance establish physical eligibility for deletion.

---

## 3.6 Partition by ID

**Anti-pattern:**

```text
PARTITION BY user_id
```

for millions of users.

**Required correction:** Use coarser partitioning and clustering/data skipping.

---

## 3.7 Partition every filter column

**Anti-pattern:** Mirroring common `WHERE` predicates directly into physical partition hierarchy.

**Required correction:** Separate coarse partition elimination from finer clustering and statistics.

---

## 3.8 Tiny time partitions

**Anti-pattern:**

```text
year/month/day/hour/minute
```

on a table producing only a few megabytes per hour.

**Required correction:** Use the coarsest partition granularity that achieves meaningful pruning.

---

## 3.9 No compaction strategy

**Anti-pattern:** Streaming writes indefinitely produce thousands or millions of tiny Parquet files.

**Required correction:** Define target sizes and condition-driven compaction.

---

## 3.10 Compact everything every night

**Anti-pattern:** Rewriting the entire table nightly regardless of file health.

**Why it fails:** It generates unnecessary compute, storage I/O, and write amplification.

**Required correction:** Rewrite only partitions/file groups requiring maintenance.

---

## 3.11 Confusing Hudi compaction and clustering

**Anti-pattern:** Treating Hudi MOR compaction and clustering as identical.

**Required correction:** Use compaction to reconcile delta logs into base files and clustering to optimize physical layout/file sizing.

---

## 3.12 Infinite snapshot history

**Anti-pattern:** Never expiring snapshots or transaction history “just in case.”

**Required correction:** Define explicit recovery and audit windows.

---

## 3.13 Aggressive cleanup

**Anti-pattern:** Setting cleanup retention near zero to reduce storage bills.

**Why it fails:** Active writers/readers and required recovery versions may lose files.

**Required correction:** Retention MUST exceed maximum legitimate dependency windows.

---

## 3.14 Cleanup before understanding streaming lag

**Anti-pattern:** Vacuuming/cleaning data older than a lagging consumer's checkpoint requirements.

**Required correction:** Align cleanup retention with consumer recovery guarantees.

---

## 3.15 Orphan cleanup with no safety window

**Anti-pattern:** Deleting every currently unreferenced file immediately.

**Required correction:** Use a safe age threshold exceeding incomplete-write duration.

---

## 3.16 Manual schema mutation in files

**Anti-pattern:** A writer starts emitting extra Parquet columns without table-level schema evolution.

**Required correction:** Change the logical table schema first or through a controlled schema-evolution operation.

---

## 3.17 Global automatic schema merge

**Anti-pattern:** Enabling unrestricted schema auto-merge across all production pipelines.

**Why it fails:** Producer mistakes silently become shared data contracts.

**Required correction:** Scope evolution explicitly and validate proposed schema changes.

---

## 3.18 Type-compatible semantic break

**Anti-pattern:** Reusing an existing column for a new business meaning because its physical datatype remains valid.

**Required correction:** Treat semantic meaning as part of the contract.

---

## 3.19 Assuming every engine handles evolution equally

**Anti-pattern:** A schema/partition change works in Spark, therefore it is considered safe for Trino, Flink, BI, and streaming consumers.

**Required correction:** Test the complete supported engine matrix.

---

## 3.20 Naive multi-writer jobs

**Anti-pattern:** Multiple jobs modify a table concurrently with no documented conflict model.

**Required correction:** Use supported transactional concurrency and handle conflict outcomes explicitly.

---

## 3.21 Retry every commit failure

**Anti-pattern:**

```text
while failure:
    retry forever
```

**Required correction:** Distinguish transient storage/catalog failure from actual transaction conflict and bound retries.

---

## 3.22 Reusing streaming checkpoints

**Anti-pattern:** Starting multiple active stream writers under one checkpoint identity.

**Required correction:** Maintain a unique authoritative checkpoint per stream topology.

---

## 3.23 Time travel as backup

**Anti-pattern:** Assuming snapshots protect against object-store deletion, account compromise, catalog destruction, or key loss.

**Required correction:** Maintain independent disaster-recovery controls where required.

---

## 3.24 Rollback by file copy

**Anti-pattern:** Copying historical objects over current table files.

**Required correction:** Use native snapshot/version restore semantics.

---

## 3.25 Path-coupled applications

**Anti-pattern:** Application code knows that partition data lives at:

```text
/year=2026/month=09/day=23/
```

and constructs paths directly.

**Required correction:** Query logical columns through the catalog/table.

---

## 3.26 Unbounded maintenance

**Anti-pattern:** A compaction task accidentally rewrites a petabyte-scale table in one invocation.

**Required correction:** Bound partitions, bytes, runtime, and concurrency.

---

## 3.27 Protocol upgrade without compatibility check

**Anti-pattern:** Enabling a new table feature that older production readers cannot understand.

**Required correction:** Verify the entire writer/reader/maintenance matrix before protocol upgrade.

---

## 3.28 Cross-environment warehouse

**Anti-pattern:** Development and production jobs can both write beneath the same warehouse prefix.

**Required correction:** Enforce environment isolation in catalog, IAM, and storage.

---

## 3.29 Query-user delete rights on storage

**Anti-pattern:** An analyst who can query a table can also delete its Parquet objects directly.

**Required correction:** Separate logical data permissions from physical storage administration.

---

## 3.30 Lakehouse admin UI outside standards

**Anti-pattern:** Hand-built destructive dialogs, inaccessible metadata grids, arbitrary status colors, or bespoke form controls.

**Required correction:** Use approved shadcn components, accessibility behavior, forms, validation, patterns, and semantic design tokens.

---

# 4. Checklist

## 4.1 Table format

- [ ] Is the authoritative table format explicit?
- [ ] Is the format approved by the platform?
- [ ] Does the selection match write and query patterns?
- [ ] Are all supported engines compatible?
- [ ] Is one system clearly responsible for transactional metadata?
- [ ] Is format proliferation justified?

## 4.2 File format

- [ ] Is Parquet used for analytical base files unless an exception is documented?
- [ ] Is compression standardized?
- [ ] Are row-group settings appropriate?
- [ ] Are physical files treated as immutable?
- [ ] Are consumers prevented from bypassing table metadata?

## 4.3 Catalog

- [ ] Is the table registered in an approved catalog?
- [ ] Is catalog identity authoritative?
- [ ] Does the catalog provide appropriate commit semantics?
- [ ] Is catalog authorization enforced?
- [ ] Is catalog infrastructure observable?
- [ ] Is catalog recovery documented?
- [ ] Are all engines using compatible catalog integration?

## 4.4 Object storage

- [ ] Are production and non-production locations isolated?
- [ ] Are table locations platform-owned?
- [ ] Do applications use table names instead of raw paths?
- [ ] Are physical filenames treated as opaque?
- [ ] Are lifecycle policies table-aware?
- [ ] Is direct file deletion prohibited?
- [ ] Are encryption and access controls enabled?

## 4.5 Partitioning

- [ ] Is partitioning justified by measured access patterns?
- [ ] Are high-cardinality partition keys avoided?
- [ ] Is partition granularity coarse enough?
- [ ] Are partitions sufficiently large?
- [ ] Does the layout support lifecycle requirements?
- [ ] Are queries written against logical columns rather than paths?

## 4.6 Partition evolution

- [ ] Is the table format's evolution model understood?
- [ ] Can the partition strategy evolve without full rebuild?
- [ ] Have existing readers been tested?
- [ ] Have streaming/incremental readers been tested?
- [ ] Are downstream path assumptions absent?

## 4.7 Clustering

- [ ] Are clustering keys based on query telemetry?
- [ ] Is the number of clustering columns limited?
- [ ] Are clustering and partitioning responsibilities distinct?
- [ ] Is reclustering cost measured?
- [ ] Are layout benefits periodically reevaluated?

## 4.8 File health

- [ ] Is a target file size defined?
- [ ] Are average and median file sizes observable?
- [ ] Is small-file count observable?
- [ ] Are files-per-partition monitored?
- [ ] Are streaming writers generating acceptable file sizes?

## 4.9 Compaction

- [ ] Is compaction automated or scheduled?
- [ ] Are triggers based on table health?
- [ ] Are rewrite bytes bounded?
- [ ] Are affected partitions bounded?
- [ ] Is compaction concurrency safe?
- [ ] Is compaction cost observable?
- [ ] Does Hudi MOR have an appropriate compaction policy where applicable?

## 4.10 Maintenance

- [ ] Does every table have a maintenance tier?
- [ ] Is maintenance ownership assigned?
- [ ] Are maintenance jobs monitored?
- [ ] Are failures alerted?
- [ ] Are retries bounded?
- [ ] Are compute budgets defined?
- [ ] Is maintenance concurrency controlled?

## 4.11 Snapshots and retention

- [ ] Is a time-travel requirement defined?
- [ ] Is a rollback window defined?
- [ ] Is maximum stream lag known?
- [ ] Is history retention explicitly configured?
- [ ] Does retention exceed active-reader/writer requirements?
- [ ] Is indefinite history avoided unless required?

## 4.12 Orphan cleanup

- [ ] Is cleanup format-aware?
- [ ] Is a safe minimum age configured?
- [ ] Does the age exceed maximum write duration?
- [ ] Is dry-run validation available?
- [ ] Are path/scheme migrations considered?
- [ ] Is manual object deletion prohibited?

## 4.13 Metadata health

- [ ] Is snapshot/version count monitored?
- [ ] Is metadata growth monitored?
- [ ] Are manifests/logs/timelines maintained?
- [ ] Are checkpoints healthy?
- [ ] Is old metadata cleanup configured where appropriate?

## 4.14 Schema evolution

- [ ] Is the logical schema authoritative?
- [ ] Are schema changes classified for compatibility?
- [ ] Are nullable additions preferred where appropriate?
- [ ] Is automatic schema evolution scoped?
- [ ] Are semantic changes reviewed?
- [ ] Are all supported engines tested?
- [ ] Are streaming consumers tested?
- [ ] Are breaking changes coordinated with consumers?

## 4.15 Concurrency

- [ ] Is the write-concurrency model documented?
- [ ] Are concurrent writer combinations supported?
- [ ] Are conflicts observable?
- [ ] Are conflict retries bounded?
- [ ] Are writes idempotent where required?
- [ ] Are maintenance services concurrency-safe?
- [ ] Are shared streaming checkpoints prohibited?

## 4.16 Time travel and rollback

- [ ] Can exact historical versions be identified?
- [ ] Is retention long enough for promised history?
- [ ] Are rollback procedures tested?
- [ ] Is downstream behavior after rollback understood?
- [ ] Is time travel distinguished from backup?
- [ ] Are critical snapshots/tags protected where supported?

## 4.17 Lifecycle and cost

- [ ] Is the hot-data window defined?
- [ ] Is the historical-data window defined?
- [ ] Is archival behavior defined?
- [ ] Are object count and storage-operation costs monitored?
- [ ] Is write amplification measured?
- [ ] Is compaction ROI measured?
- [ ] Are cold-storage transitions table-safe?
- [ ] Are temporary tables automatically expired?

## 4.18 Security

- [ ] Is object storage private?
- [ ] Is access least-privileged?
- [ ] Is encryption enabled?
- [ ] Are production environments isolated?
- [ ] Are catalog operations authorized?
- [ ] Are direct object delete permissions restricted?
- [ ] Are credentials short-lived/scoped where possible?
- [ ] Is sensitive data classification applied?

## 4.19 Data & Database

- [ ] Does every shared table have an owner?
- [ ] Is source-of-truth status documented?
- [ ] Is lineage available?
- [ ] Is retention documented?
- [ ] Are PII and sensitive fields classified?
- [ ] Are residency requirements satisfied?
- [ ] Are deletion semantics documented?
- [ ] Are data-quality expectations monitored?

## 4.20 API and State Management

- [ ] Are table operations exposed through semantic APIs?
- [ ] Are maintenance requests authenticated and validated?
- [ ] Is authoritative state read from the catalog/table metadata?
- [ ] Do administrative actions reload fresh state before execution?
- [ ] Are destructive operations idempotent or safely guarded?
- [ ] Are operation outcomes auditable?

## 4.21 Forms & Validation

- [ ] Are maintenance settings strongly typed?
- [ ] Are retention safety floors enforced?
- [ ] Are invalid partition/clustering configurations rejected?
- [ ] Do generated configurations undergo normal validation?
- [ ] Are dangerous reductions in retention explicitly confirmed?

## 4.22 Accessibility

- [ ] Are table-management interfaces keyboard accessible?
- [ ] Are metadata tables semantic and accessible?
- [ ] Are sorting and selection states programmatically exposed?
- [ ] Are health states communicated beyond color?
- [ ] Are destructive actions clearly labeled?
- [ ] Is focus correctly managed in confirmation flows?

## 4.23 Design Tokens, Components, and Patterns

- [ ] Does the UI use semantic design tokens?
- [ ] Does it use approved shadcn components?
- [ ] Are tables rendered through approved table/data-grid patterns?
- [ ] Are retention and cleanup warnings consistent with platform patterns?
- [ ] Are destructive maintenance actions handled by the canonical confirmation pattern?
- [ ] Are bespoke controls avoided where approved components exist?

## 4.24 Operations

- [ ] Are table-health SLOs defined?
- [ ] Are maintenance failures alerted?
- [ ] Are commit-conflict rates monitored?
- [ ] Are catalog availability/latency monitored?
- [ ] Are cleanup jobs observable?
- [ ] Are storage growth forecasts available?
- [ ] Are restore procedures exercised?

---

# 5. Canonical summary

A production lakehouse is a **transactional table system over object storage**, not a directory of files.

Every table **MUST** have one authoritative table format and one authoritative catalog/metadata path.

**Apache Parquet is the canonical analytical base-file format** unless a documented requirement justifies another supported format.

Consumers **MUST** read transactional tables through Iceberg, Delta Lake, Hudi, or the applicable table-format metadata. They **MUST NOT** reconstruct current table state by listing Parquet files.

Table-format choice **SHOULD** follow workload and ecosystem requirements. Iceberg is particularly suited to multi-engine, catalog-centric analytical tables and flexible partition evolution; Delta is strongly suited to Delta-native transactional batch/streaming workloads and evolving clustering strategies; Hudi is strongly oriented toward incremental ingestion, CDC/upserts, and integrated storage services. Format proliferation **MUST** remain governed.

Partitioning **MUST** be deliberate. High-cardinality physical partitions and excessively fine time partitions **SHOULD NOT** be used merely because those columns appear in queries.

Partitioning and clustering serve different purposes. Partitioning provides coarse elimination and lifecycle boundaries; clustering and sorting improve locality and data skipping within broader layouts.

Every actively written analytical table **MUST** have a file-size strategy. Small-file accumulation **MUST** be monitored and corrected through table-format-aware compaction or clustering.

A typical initial analytical file-size target is approximately **256–512 MiB**, but the actual target **MUST** be validated against workload, engine, storage, and latency characteristics.

Compaction **MUST** be bounded and transactionally safe. Raw Parquet files **MUST NOT** be manually replaced or deleted as a substitute for table maintenance.

Snapshot, transaction-log, timeline, and historical-file retention **MUST** be explicitly configured according to rollback, time travel, streaming lag, audit, and recovery requirements.

Cleanup is a correctness-sensitive operation. `VACUUM`, snapshot expiry, Hudi cleaning, and orphan removal **MUST NOT** use retention periods shorter than workloads that can legitimately reference older or uncommitted files.

Orphan cleanup **MUST** be table-format-aware and use an appropriate safety interval. Operators **MUST NOT** delete apparent orphan objects manually from production table locations.

Schema changes **MUST** occur through the logical table contract. Producers **MUST NOT** silently redefine shared schemas by emitting different Parquet structures.

Schema evolution **MUST** be evaluated against every supported reader and writer, not merely against the nominal capabilities of the table format.

Semantic compatibility is part of schema compatibility. Reusing a physically compatible column for a different meaning remains a breaking change.

Concurrent writers **MUST** use the selected format's supported transactional model. Commit conflicts **MUST** be handled as concurrency events, not bypassed through unbounded retries.

Streaming checkpoints, table commits, cleanup retention, and incremental-consumer recovery **MUST** be designed as one consistency system.

Time travel **SHOULD** be used for reproducibility, auditing, debugging, and recovery, but **MUST NOT** be treated as a substitute for disaster-recovery backups.

Object-store lifecycle policies **MUST NOT** independently remove objects from active table locations unless explicitly coordinated with table-format semantics.

The catalog and table metadata are authoritative. Object-storage path contents, caches, UI state, and model-generated configuration are not.

Production tables **MUST** be monitored for file size, file count, partition health, snapshots, metadata growth, maintenance status, concurrency failures, and storage cost.

Lakehouse infrastructure **MUST** follow Security, Data & Database, and API standards for identity, access, encryption, data classification, retention, schema ownership, and auditing.

Administrative interfaces **MUST** conform to State Management, Forms & Validation, Accessibility, Design Tokens, Component, and Pattern standards. **shadcn/ui is the canonical React component baseline**.

A production lakehouse table is complete only when the team can answer:

**Which format owns the table? Which catalog owns its metadata? What is the schema contract? How is it partitioned and clustered? What file size are we targeting? Who may write to it? What happens when writers conflict? How are small files compacted? How long is history retained? When may old files be physically deleted? How do we roll back? How is the table secured? What does it cost to operate? And how do we know its physical layout and metadata remain healthy as the workload evolves?**

The key corpus boundary is: **Data & Database defines the logical data contract; Lakehouse defines transactional storage and lifecycle semantics; Analytics defines consumption; Infrastructure operates catalogs, object storage, and maintenance.**
