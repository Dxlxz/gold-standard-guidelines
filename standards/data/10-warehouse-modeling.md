---
id: "warehouse-modeling"
title: "Analytics & Warehouse Modeling"
domain: "data"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["data", "warehouse", "analytics", "modeling"]
applies_to: ["data"]
related: ["code-review"]
legacy_number: 82
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 56076
provenance: baseline

---

Below is the corpus-ready standard. It deliberately makes **grain, metric semantics, historical behavior, and reproducibility** contractual properties of the warehouse rather than conventions left to individual dashboards or analysts.

# Analytics & Warehouse Modeling Guidelines — Gold Standard 2026

**Canonical placement:** Data & Database → Warehouse Modeling → Analytics → AI/LLM  
**Status:** Gold Standard 2026  
**Modeling baseline:** source-conformed staging → business-conformed core → consumer-facing marts  
**Analytical baseline:** dimensional modeling and governed semantic metrics where appropriate  
**Component baseline:** shadcn/ui for warehouse administration, data-quality, catalog, and self-service interfaces

---

# 1. Purpose

## 1.1 Scope

This standard defines the canonical requirements for analytical warehouse modeling and governed analytical data products.

It covers:

- ingestion and source modeling;
- staging models;
- core/conformed models;
- analytical marts;
- dimensional modeling;
- star schemas;
- dimensions and facts;
- fact-table grain;
- transaction and snapshot facts;
- slowly changing dimensions;
- conformed dimensions;
- surrogate and natural keys;
- late-arriving data;
- metric definitions;
- semantic layers;
- materialization;
- incremental processing;
- data-quality testing;
- freshness;
- lineage;
- backfills;
- reproducibility;
- schema evolution;
- self-service analytics;
- AI/LLM access to analytical data.

This standard applies to:

- analytical warehouses;
- lakehouses;
- ELT transformation projects;
- business intelligence datasets;
- metrics platforms;
- reporting models;
- machine-learning feature inputs where analytical modeling is used;
- governed data exposed to AI systems.

---

## 1.2 Design objective

An analytical data model MUST make business meaning more stable, not merely make queries shorter.

A conforming warehouse MUST enable users to determine:

1. **what one row represents;**
2. **where the data originated;**
3. **how historical changes are represented;**
4. **how a metric is calculated;**
5. **how fresh the data is;**
6. **whether the result can be reproduced;**
7. **which data product is authoritative for a business concept.**

Analytical correctness MUST take precedence over dashboard convenience.

A model MUST NOT silently change grain, metric semantics, historical interpretation, or access policy simply because a downstream query becomes easier.

---

## 1.3 Warehouse models are data contracts

Warehouse models MUST be treated as governed interfaces.

A published model MAY be consumed by:

- BI;
- operational analytics;
- finance;
- experimentation;
- reverse ETL;
- APIs;
- notebooks;
- AI/LLM systems.

Breaking analytical models can therefore have impact comparable to breaking APIs.

Published models SHOULD define:

- ownership;
- grain;
- keys;
- important dimensions;
- measures;
- freshness;
- quality expectations;
- access classification.

---

## 1.4 Relationship to other standards

Warehouse implementations MUST conform to corpus standards for:

- **Security** — warehouse authorization, sensitive fields, row/column controls, audit;
- **Data & Database** — schemas, types, constraints, retention, timestamps, identifiers;
- **API** — analytical APIs and downstream machine interfaces;
- **State Management** — application state MUST NOT be mistaken for analytical source-of-truth;
- **Forms & Validation** — data-entry interfaces remain responsible for transactional validation;
- **Accessibility** — catalog, quality, metrics, and analytics-management interfaces;
- **Design Tokens** — analytical status, freshness, lineage, warning, and quality presentation;
- **Components** — shadcn/ui for administrative UI;
- **Patterns** — tables, filters, search, dashboards, errors, loading;
- **Analytics** — visualization and reporting rules;
- **AI/LLM** — governed analytical context and semantic access.

A transformation framework or warehouse vendor MUST NOT define business semantics merely because it provides a technical feature.

---

# 2. Rules

## 2.1 The canonical modeling flow MUST be layered

The corpus-standard analytical flow is:

**source/raw → staging → core → marts → semantic/consumer layer**

Not every project requires a physical object at every layer.

The conceptual responsibilities MUST nevertheless remain distinct.

### Staging

Source-conformed cleanup and normalization.

### Core

Business-conformed integration, reusable entities, historical logic, canonical relationships, and transformations shared across marts.

### Marts

Consumer-oriented models representing defined analytical processes, facts, dimensions, or domain entities.

### Semantic layer

Governed metrics, dimensions, joins, and analytical definitions exposed consistently to downstream consumers.

dbt's current project guidance similarly separates source-conformed staging from purpose-built intermediate transformations and business-oriented marts. citeturn543950view0turn543950view1turn543950view2

---

## 2.2 Raw/source data MUST remain recoverable

The initial analytical ingestion layer SHOULD preserve source data with minimal semantic transformation.

Where feasible, ingestion MUST preserve enough metadata to determine:

- source system;
- source object;
- ingestion time;
- source extraction time;
- batch/run identifier;
- source record identifier;
- source change/version information.

Raw ingestion SHOULD support replay or reconstruction of downstream transformations.

Source data MUST NOT be destructively normalized in a way that prevents later interpretation of the original value unless retention or security requirements explicitly prohibit preservation.

---

## 2.3 Raw data MUST NOT become the normal consumer interface

Analysts and BI tools SHOULD NOT build long-lived production logic directly against raw ingestion tables.

Raw schemas MAY contain:

- unstable source names;
- provider-specific types;
- duplicated events;
- ingestion metadata;
- source defects.

Published analytical products MUST pass through governed transformation boundaries.

---

## 2.4 Staging MUST remain source-conformed

A staging model SHOULD normally represent one source object or one coherent source-level concept.

Staging SHOULD perform deterministic cleanup such as:

- renaming;
- type casting;
- basic canonical formatting;
- null normalization;
- source-specific code normalization;
- documented derivations that are universally required downstream.

dbt's current guidance similarly treats staging as source-conformed building blocks and discourages aggregation and ordinary cross-entity joins because these prematurely change grain. citeturn543950view0

---

## 2.5 Staging MUST NOT redefine business meaning

Staging MUST NOT normally:

- aggregate;
- introduce business KPIs;
- apply reporting-specific filters;
- join unrelated business entities;
- implement dashboard semantics.

A staging layer SHOULD answer:

> “What is the clean, typed, reusable representation of this source concept?”

It SHOULD NOT answer:

> “What does the business report?”

---

## 2.6 Source-system differences SHOULD terminate upstream

Source-specific quirks SHOULD be normalized as early as practical.

Examples include:

- differing boolean representations;
- inconsistent casing;
- source-specific timestamps;
- encoded status fields;
- source-specific monetary units.

Downstream marts SHOULD NOT repeatedly reimplement the same source cleanup.

---

## 2.7 Core models MUST be business-conformed

The core layer MUST begin moving from source semantics toward stable business semantics.

Core models MAY:

- join source systems;
- deduplicate;
- resolve identities;
- standardize business entities;
- derive canonical keys;
- implement SCD history;
- harmonize equivalent attributes;
- reshape data to stable grains.

Core models SHOULD be reusable across more than one downstream analytical use where practical.

---

## 2.8 Core concepts SHOULD have one canonical representation

Common business entities SHOULD NOT be independently rebuilt by multiple departments without a reason.

Examples include:

- customer;
- account;
- product;
- subscription;
- employee;
- order.

Where Finance and Marketing require genuinely different definitions, those differences MUST be explicit rather than implemented as silently divergent copies of the same model name.

---

## 2.9 Marts MUST be designed around analytical use

Marts SHOULD represent understandable business processes or analytical entities.

Examples include:

- orders;
- subscriptions;
- invoices;
- customer activity;
- support cases;
- revenue transactions.

Marts MUST expose stable and documented grain.

Downstream users SHOULD NOT need to understand raw source-system joins merely to calculate routine business measures.

---

## 2.10 Dimensional modeling SHOULD be the default for broad BI consumption

For reusable analytical reporting, a dimensional star schema SHOULD normally be preferred where it improves:

- interpretability;
- query consistency;
- performance;
- self-service.

A star schema typically separates:

- **fact tables** — measurements at a defined event or snapshot grain;
- **dimension tables** — descriptive context.

The Kimball dimensional techniques remain explicit about facts, dimensions, conformed dimensions, star schemas, fact-table types, and slowly changing dimensions. citeturn543950view5

---

## 2.11 Star schemas SHOULD remain understandable

A mart intended for self-service analytics SHOULD favor a clear star over deeply normalized analytical structures.

Dimensions SHOULD usually be denormalized enough that consumers do not require long join chains for routine attributes.

A snowflaked dimension MAY be justified when:

- hierarchy management requires it;
- reuse materially outweighs usability cost;
- the semantic layer hides the complexity safely.

Database normalization principles for transactional systems MUST NOT be copied mechanically into analytical marts.

---

## 2.12 Every fact table MUST declare grain first

Before a fact table is implemented, its grain MUST be written in plain language.

Examples:

- one row per order line;
- one row per account per calendar day;
- one row per support ticket lifecycle;
- one row per payment attempt.

The grain MUST be defined before facts and dimensions are selected.

Kimball describes grain as the binding statement of exactly what one fact-table row represents and explicitly warns against mixing different grains in the same fact table. citeturn543950view4

---

## 2.13 Fact tables MUST NOT mix grains

A single fact table MUST NOT contain rows representing different measurement grains.

For example:

- order-line rows;
- order-total rows

MUST NOT coexist as indistinguishable records in the same fact table.

Different grains SHOULD use separate fact tables.

---

## 2.14 Atomic grain SHOULD be preserved

Fact tables SHOULD usually retain the lowest useful business-process grain available.

Aggregated facts MAY be added for:

- performance;
- common analytical access;
- cost reduction.

Aggregate tables MUST NOT become the only surviving representation where users reasonably require atomic detail.

Kimball's guidance likewise favors atomic grain as the most flexible base for unpredictable analytical queries. citeturn543950view4

---

## 2.15 Facts MUST conform to the declared grain

Every measure in a fact table MUST be valid at the table's declared grain.

A measure at order grain MUST NOT be repeated across order-line rows unless:

- repetition is analytically intentional;
- double-counting controls are explicit.

---

## 2.16 Fact additivity MUST be documented

Facts SHOULD be classified conceptually as:

- additive;
- semi-additive;
- non-additive.

Examples:

- transaction amount is often additive;
- account balance may be additive across accounts but not across time;
- ratios are generally non-additive.

Consumers MUST NOT be encouraged to `SUM()` non-additive metrics blindly.

---

## 2.17 Ratios SHOULD be derived from their components

Where possible, ratios and percentages SHOULD be calculated from additive numerator and denominator measures.

Prefer:

`SUM(successes) / SUM(attempts)`

over:

`AVG(precomputed_success_rate)`

unless the latter has specifically valid weighting semantics.

---

## 2.18 Transaction fact tables SHOULD represent events

A transaction fact SHOULD contain one row per measurement event at the declared business-process grain.

Examples include:

- purchase;
- invoice line;
- page event;
- shipment;
- payment.

Transaction facts SHOULD preserve event timestamps and relevant dimension keys.

---

## 2.19 Periodic snapshots MUST define the period

A periodic snapshot MUST explicitly define:

- entity grain;
- snapshot interval;
- snapshot timestamp/date;
- time-zone semantics.

For example:

> one row per subscription per UTC calendar day.

Missing snapshot rows MUST have defined semantics.

---

## 2.20 Accumulating snapshots SHOULD represent workflows

An accumulating snapshot MAY represent a process with defined lifecycle milestones.

Examples include:

- order fulfilment;
- recruitment;
- insurance claim processing.

Milestone columns MUST have stable semantics.

An accumulating snapshot SHOULD NOT be used for a process with arbitrary unbounded events better represented as transactions.

---

## 2.21 Factless facts MAY represent events without numeric measures

A fact table MAY contain no numeric fact when the business event itself is the measurement.

Examples include:

- attendance;
- eligibility;
- promotion exposure;
- relationship occurrence.

The grain remains mandatory.

---

## 2.22 Dimensions MUST provide descriptive context

Dimension attributes SHOULD answer analytical questions such as:

- who;
- what;
- where;
- how;
- classification.

Facts SHOULD NOT become wide collections of repeated descriptive text where a stable dimension relationship is appropriate.

---

## 2.23 Conformed dimensions MUST have consistent semantics

A dimension reused across facts MUST mean the same thing everywhere it is used.

A conformed `customer` dimension MUST NOT change:

- identifier semantics;
- hierarchy;
- key meaning;
- historical behavior

from one mart to another without explicit versioning.

Conformed dimensions are a core dimensional-modeling integration mechanism. citeturn543950view5

---

## 2.24 Surrogate keys SHOULD decouple warehouse identity from source identity

Dimensions requiring historical tracking or cross-source integration SHOULD normally use a warehouse surrogate key.

Natural/business keys SHOULD remain available as descriptive or durable identifiers where useful.

A source primary key MUST NOT automatically be assumed globally unique or permanent.

---

## 2.25 Unknown dimension members SHOULD be explicit

Facts with unavailable dimension context SHOULD use an explicit strategy such as:

- Unknown;
- Not applicable;
- Not yet known.

Null foreign-key semantics MUST be defined consistently.

Unknown and not-applicable MUST NOT be silently conflated where their distinction matters.

---

## 2.26 Slowly changing behavior MUST be attribute-specific

Every mutable dimension attribute SHOULD have an explicit historical policy.

The policy MUST NOT be chosen merely because a modeling tool calls one type its default.

Common patterns include:

- **Type 0** — retain original;
- **Type 1** — overwrite;
- **Type 2** — create a historical row;
- **Type 3** — retain limited prior state.

Kimball explicitly distinguishes these and additional hybrid SCD techniques. citeturn543950view5

---

## 2.27 SCD Type 1 MUST be used only when history is not analytically required

Type 1 overwrite is appropriate when:

- correcting an error;
- history has no business meaning;
- only current state is intentionally required.

Type 1 MUST NOT overwrite meaningful historical context merely to simplify a dimension.

---

## 2.28 SCD Type 2 MUST preserve historical context

Type 2 SHOULD be used when facts must be interpreted using the dimension state that was valid at the relevant historical time.

A Type 2 dimension SHOULD normally include:

- surrogate key;
- durable/business key;
- validity start;
- validity end;
- current-row indicator or equivalent.

Intervals SHOULD use a consistent convention, preferably:

`[valid_from, valid_to)`

where compatible with platform and domain requirements.

---

## 2.29 Type 2 rows MUST NOT overlap unintentionally

For a given durable business key, Type 2 validity intervals MUST NOT overlap unless multiple simultaneous states are explicitly part of the model.

There SHOULD normally be at most one current row per business key.

Automated quality tests SHOULD enforce these invariants.

---

## 2.30 Facts MUST join to the historically correct dimension row

A historical fact MUST NOT automatically join to the current Type 2 dimension record.

The join MUST follow the defined historical relationship.

Where the fact stores the dimension surrogate key at load time, the pipeline MUST resolve the correct historical member consistently.

---

## 2.31 Late-arriving dimensions MUST have defined behavior

When a fact arrives before its corresponding dimension record, the pipeline MUST define whether it:

- uses an inferred member;
- holds the fact;
- uses an unknown key;
- repairs the relationship later.

The behavior MUST be deterministic.

---

## 2.32 Late-arriving facts MUST preserve event semantics

A late-arriving fact MUST retain its real business/event timestamp.

It MUST NOT be assigned to the ingestion date merely because it arrived late.

Historical dimension lookup SHOULD use the event's relevant business time, not pipeline execution time, where the domain requires historical interpretation.

---

## 2.33 Business time and warehouse time MUST remain distinct

Models SHOULD distinguish concepts such as:

- occurred_at;
- effective_at;
- ingested_at;
- loaded_at;
- updated_at.

One generic timestamp MUST NOT substitute for multiple materially different time semantics.

---

## 2.34 Time zones MUST be governed

Timestamp normalization MUST follow the Data & Database standard.

The warehouse SHOULD preserve source timezone context where required.

Reporting dates MUST define their business timezone.

A `daily_revenue` metric MUST NOT silently switch between UTC and a local business day across tools.

---

## 2.35 Metric definitions MUST have one governed owner

Material business metrics MUST have a canonical definition.

Examples include:

- revenue;
- ARR;
- active customers;
- conversion rate;
- churn;
- gross margin.

The definition SHOULD include:

- name;
- description;
- owner;
- formula;
- source measures;
- allowed dimensions;
- time semantics;
- filters/exclusions;
- unit;
- grain;
- status/version.

---

## 2.36 Metrics MUST NOT be independently redefined in every dashboard

Critical metrics SHOULD be defined in the transformation or semantic layer rather than duplicated in:

- BI calculations;
- spreadsheets;
- notebook snippets;
- application code.

dbt's current Semantic Layer guidance likewise centers critical metric definitions so downstream applications and tools can use consistent logic. citeturn543950view3

---

## 2.37 The semantic layer SHOULD be the governed analytics interface

Organizations with multiple BI, analytics, or AI consumers SHOULD use a semantic layer or equivalent governed metric abstraction.

The semantic layer SHOULD define:

- entities;
- dimensions;
- measures;
- metrics;
- valid join relationships;
- time dimensions;
- access controls.

A semantic layer MUST NOT become an opaque location where undocumented metric logic is hidden.

---

## 2.38 Semantic definitions MUST be version-controlled

Metric and semantic-model definitions SHOULD live in version-controlled, reviewable code or an equivalent governed configuration system.

Changes SHOULD support:

- code review;
- lineage impact;
- testing;
- rollback.

Critical metric changes MUST NOT be made only through an undocumented BI UI.

---

## 2.39 Metric changes MUST be treated as breaking changes when meaning changes

A formula change that materially changes historical results MUST be communicated as a semantic change.

The team SHOULD consider:

- versioning;
- effective date;
- restatement;
- migration period.

A metric name MUST NOT remain unchanged while its business meaning silently changes.

---

## 2.40 Metrics MUST specify denominator semantics

Rates, ratios, and percentages MUST specify:

- numerator population;
- denominator population;
- exclusion criteria;
- time period.

For example, `conversion_rate` without a defined eligible population is non-conforming.

---

## 2.41 Distinct-count metrics require explicit identity semantics

Metrics such as:

- active users;
- customers;
- accounts

MUST define the identifier being counted.

A metric MUST NOT alternate between:

- user ID;
- account ID;
- email;
- device ID

without changing its definition.

---

## 2.42 Metric filters MUST be part of the definition

Permanent exclusions required for metric meaning MUST live with the metric or governed model.

Examples include:

- test accounts;
- cancelled test transactions;
- internal tenants.

Downstream dashboards SHOULD NOT each independently remember those exclusions.

---

## 2.43 Materialization MUST follow workload characteristics

Materialization MUST be chosen intentionally based on:

- freshness;
- query latency;
- compute cost;
- data volume;
- build complexity;
- reproducibility.

A transformation framework's default MUST NOT become architecture policy without evaluation.

---

## 2.44 Views SHOULD be the simplest starting point

Views SHOULD be preferred where:

- computation is inexpensive;
- freshness is important;
- query demand is moderate;
- persisted storage provides little benefit.

Materialization SHOULD become more complex only when measured workload requires it.

dbt's current guidance similarly recommends starting simple and moving from views toward tables and incremental models as query or build cost justifies the complexity. citeturn543950view2turn543950view6

---

## 2.45 Tables SHOULD be used for expensive reusable results

A physical table SHOULD be considered when:

- repeated transformation cost is material;
- consumer latency matters;
- results are reused broadly;
- reproducible build boundaries are useful.

A table MUST have defined refresh semantics.

---

## 2.46 Incremental models MUST have correctness semantics before performance semantics

An incremental model MUST define:

- change-detection mechanism;
- unique key or merge identity where applicable;
- late-data window;
- update behavior;
- delete behavior;
- full-refresh behavior.

Incremental materialization MUST NOT be adopted merely because a table is large.

---

## 2.47 Incremental logic MUST converge to full rebuild results

Given equivalent source inputs, a correct incremental build SHOULD produce the same analytical result as a clean full rebuild, subject to intentionally documented exceptions.

This property SHOULD be tested for critical models.

---

## 2.48 Delete handling MUST be explicit

Incremental pipelines MUST define the semantics of source deletion.

Possible strategies include:

- hard deletion;
- tombstone;
- invalidation;
- retained historical record.

Ignoring source deletes MUST be an explicit choice.

---

## 2.49 Materialized views SHOULD target repeated expensive access patterns

Warehouse-native materialized views MAY be used when repeated computation can be efficiently maintained by the platform.

They SHOULD NOT be introduced indiscriminately.

Both Snowflake and BigQuery document materialized views primarily as precomputed structures for improving repeated-query performance, with platform-specific maintenance semantics. citeturn421263search7turn421263search54

---

## 2.50 Materialization freshness MUST be observable

Persisted analytical models MUST expose or make discoverable:

- last successful build;
- source freshness where relevant;
- failure state;
- expected refresh interval.

A successfully queried table MUST NOT automatically be assumed current.

---

## 2.51 Every published model MUST have basic data-quality tests

At minimum, critical published models SHOULD test applicable:

- uniqueness;
- not-null requirements;
- accepted domain values;
- referential relationships;
- grain uniqueness.

Tests MUST correspond to actual model contracts rather than being added only to increase test count.

---

## 2.52 Grain MUST be testable

Where practical, the declared fact grain SHOULD have an automated uniqueness test.

For a grain:

> one row per account per date

the combination:

`account_key + date_key`

SHOULD be unique unless the model explicitly documents another distinguishing key.

---

## 2.53 Referential integrity SHOULD be tested analytically

Fact-to-dimension relationships SHOULD be tested for unexpected orphan keys.

The warehouse MAY permit explicit unknown dimension members.

Unexpected unmatched keys SHOULD NOT be silently accepted indefinitely.

---

## 2.54 SCD invariants MUST be tested

Type 2 dimensions SHOULD test:

- one current row per durable key;
- non-overlapping validity intervals;
- valid start/end ordering;
- surrogate-key uniqueness.

---

## 2.55 Metric invariants SHOULD be tested

Important business rules SHOULD have tests.

Examples include:

- quantity cannot be negative where impossible;
- recognized revenue cannot precede contract inception;
- completion time cannot precede start time.

A successful SQL statement does not establish analytical correctness.

---

## 2.56 Source freshness MUST be monitored

Sources with analytical SLAs MUST have freshness expectations.

Freshness SHOULD distinguish:

- source not updated;
- ingestion failed;
- transformation failed.

A stale dashboard MUST NOT appear current merely because the final mart query succeeds.

---

## 2.57 Row-count anomaly tests SHOULD be used carefully

Volume anomaly detection MAY identify:

- ingestion loss;
- duplication;
- sudden source changes.

Fixed row-count thresholds SHOULD NOT be used where natural volume has large variation.

Anomaly tests SHOULD incorporate expected seasonality or operating patterns where necessary.

---

## 2.58 Distribution and statistical quality tests MAY supplement deterministic tests

Material datasets MAY benefit from tests for:

- null-rate changes;
- distribution shifts;
- unexpected cardinality changes;
- category emergence;
- numeric range changes.

Statistical quality tests MUST NOT replace known deterministic business invariants.

---

## 2.59 Data quality severity MUST be defined

Tests SHOULD distinguish:

- warning;
- blocking error;
- informational monitor.

A failed cosmetic metadata check SHOULD NOT necessarily prevent all production data builds.

A failed primary-grain test on a financial mart SHOULD normally block publication.

---

## 2.60 Bad data MUST NOT silently overwrite good published data

If a critical new build fails quality controls, the platform SHOULD preserve the last known valid published state where architecture permits.

The UI and metadata MUST communicate staleness rather than presenting failed refreshes as fresh data.

---

## 2.61 Data contracts SHOULD protect critical interfaces

High-value upstream sources and published models SHOULD define contracts for:

- schema;
- type;
- required fields;
- grain;
- ownership.

Breaking schema changes SHOULD fail early rather than silently propagating nulls or incorrect values through the warehouse.

---

## 2.62 Schema evolution MUST be intentional

Adding nullable columns is generally less disruptive than:

- changing type;
- renaming;
- deleting;
- changing semantics.

Breaking model changes SHOULD use migration/deprecation patterns analogous to API versioning.

---

## 2.63 Lineage MUST be available for published data

Teams MUST be able to determine relevant upstream dependencies of critical:

- marts;
- metrics;
- dashboards;
- AI data products.

Lineage SHOULD support impact analysis before changing upstream models.

---

## 2.64 Ownership MUST be explicit

Every published data product MUST have an accountable owner.

Ownership SHOULD include responsibility for:

- semantics;
- quality;
- freshness;
- deprecation.

`data-team` SHOULD NOT be the universal owner if a business-domain team actually defines the concept.

---

## 2.65 Backfills MUST be first-class operations

A backfill MUST NOT be treated as ad hoc SQL typed directly into production.

Material backfills SHOULD be:

- parameterized;
- repeatable;
- observable;
- tested;
- idempotent where practical.

The system MUST define the target:

- date range;
- partitions;
- entities;
- model selection.

---

## 2.66 Backfills MUST use reproducible code

Historical recomputation SHOULD use version-controlled transformations.

Manually edited one-off SQL MUST NOT become the authoritative historical calculation for critical data without being preserved and reviewed.

---

## 2.67 Reproducibility MUST distinguish data version from code version

Reproducing an analytical result may require:

- transformation code version;
- source data version/snapshot;
- reference-data version;
- metric definition version.

The warehouse SHOULD preserve enough lineage or immutability to reconstruct critical historical outputs according to business requirements.

---

## 2.68 Backfills MUST NOT silently use today's dimension state

Historical backfills MUST respect the intended historical semantics of:

- SCD dimensions;
- exchange rates;
- classification tables;
- business rules.

Using today's customer segment for a report intended to show historical segment at event time MUST be an explicit metric choice.

---

## 2.69 Reprocessing MUST be idempotent where practical

Re-running the same transformation for the same logical input SHOULD NOT create:

- duplicate facts;
- duplicate dimension versions;
- repeated side effects.

Warehouse jobs MUST NOT rely solely on “we never rerun this batch” as their duplication control.

---

## 2.70 Backfill compute scope MUST be bounded

A backfill SHOULD process the minimum required data consistent with correctness.

A one-day correction MUST NOT automatically rebuild a multi-year warehouse if dependency semantics permit narrower reconstruction.

Optimization MUST NOT compromise reproducibility.

---

## 2.71 Backfills MUST consider downstream impact

Before material backfills, teams SHOULD identify affected:

- marts;
- semantic metrics;
- extracts;
- caches;
- reverse-ETL systems;
- AI indexes;
- external consumers.

Correcting the warehouse while leaving stale downstream copies may not complete the correction.

---

## 2.72 Historical restatements MUST be communicated

If a backfill changes previously published business results materially, affected consumers SHOULD be notified.

Financial, regulatory, or executive metrics MAY require explicit restatement procedures.

---

## 2.73 Self-service MUST use governed entry points

Self-service analysts SHOULD consume:

- documented marts;
- semantic metrics;
- certified datasets

rather than reconstructing core business logic from raw tables.

Self-service means independent analysis within guardrails, not unrestricted reinvention of business definitions.

---

## 2.74 Certified datasets MUST be identifiable

The catalog SHOULD distinguish:

- certified/governed;
- experimental;
- deprecated;
- raw/internal.

A dataset MUST NOT appear equally authoritative merely because users can query it.

---

## 2.75 Self-service models MUST expose understandable metadata

Consumer-facing datasets SHOULD document:

- purpose;
- grain;
- owner;
- freshness;
- important keys;
- metric guidance;
- sensitivity.

A user SHOULD NOT have to inspect transformation SQL to learn what one row means.

---

## 2.76 Self-service joins MUST have guardrails

The semantic or catalog layer SHOULD identify valid relationships.

Many-to-many relationships MUST be explicit.

BI tools MUST NOT be allowed to silently fan out facts and double-count measures through ambiguous joins where governance controls can prevent it.

---

## 2.77 Fact-to-fact joins SHOULD be avoided in consumer queries

Consumers SHOULD normally compare multiple fact processes through conformed dimensions or governed semantic logic.

Direct arbitrary fact-to-fact joins often cause fan-out and incorrect aggregation.

Where such joins are valid, the intended grain transformation MUST be explicit.

---

## 2.78 Query guardrails SHOULD protect shared warehouse capacity

Self-service access SHOULD include reasonable controls on:

- scan volume;
- query duration;
- concurrency;
- result size.

Cost and workload policies MUST NOT silently change analytical semantics merely to make queries cheaper.

---

## 2.79 Sandboxes SHOULD be separated from certified production data products

Users SHOULD have a workspace for exploration without turning every exploratory table into a published mart.

Sandbox objects SHOULD have:

- ownership;
- retention/expiry;
- resource boundaries.

Temporary analyst tables MUST NOT accumulate indefinitely in production schemas.

---

## 2.80 Publication MUST be intentional

A dataset SHOULD require a clear promotion step before becoming a governed production model.

Publication SHOULD require appropriate:

- documentation;
- tests;
- owner;
- access control;
- naming.

“Someone made a table and a dashboard uses it” MUST NOT automatically confer certified status.

---

## 2.81 Security MUST be enforced at governed layers

Sensitive analytical fields MUST follow Security classification.

Access control MAY include:

- schema permissions;
- row-level policy;
- column policy;
- masking;
- secured views.

A mart MUST NOT duplicate restricted source data into a less-protected schema accidentally.

---

## 2.82 Sensitive attributes SHOULD be minimized

Consumer marts SHOULD expose only the sensitive attributes required by their analytical purpose.

Broad `SELECT *` propagation of PII across warehouse layers SHOULD NOT be the default.

---

## 2.83 Tenant isolation MUST survive transformation

In multi-tenant analytical models, tenant keys MUST remain correct through:

- staging;
- joins;
- aggregation;
- marts;
- semantic access.

A cross-tenant join defect is a Security incident, not merely a warehouse-quality issue.

---

## 2.84 Metric access MUST respect underlying data policy

A semantic layer MUST NOT allow a user to infer restricted detail through unrestricted dimensions or filters.

Aggregated access SHOULD be evaluated for small-group disclosure where privacy requirements apply.

---

## 2.85 AI/LLM systems SHOULD consume governed analytical interfaces

AI assistants answering business-data questions SHOULD preferentially use:

- semantic metrics;
- governed marts;
- certified metadata.

They SHOULD NOT be given unrestricted raw warehouse access merely because they can generate SQL.

---

## 2.86 Text-to-SQL MUST NOT replace metric governance

LLMs MAY help generate analytical queries.

They MUST NOT independently redefine:

- revenue;
- customer;
- churn;
- conversion;
- other governed business concepts

from arbitrary columns when canonical definitions exist.

As of 2026, dbt explicitly positions the semantic layer as a centralized metric interface for consistent downstream applications and tooling. citeturn543950view3

---

## 2.87 AI context SHOULD include model semantics

Where AI queries governed warehouse data, its available metadata SHOULD include:

- model description;
- grain;
- dimension meanings;
- metric definitions;
- valid relationships;
- synonyms where governed.

The model SHOULD NOT be expected to infer grain solely from column names.

---

## 2.88 AI warehouse permissions MUST follow least privilege

AI workloads MUST use dedicated identities.

They SHOULD receive only the datasets, metrics, or APIs required for their task.

Prompt text MUST NOT expand warehouse authorization.

---

## 2.89 AI-generated SQL MUST have execution guardrails

Where AI-generated SQL can execute against analytical platforms, controls SHOULD include:

- read-only access by default;
- query timeouts;
- scan/cost limits;
- result-size limits;
- approved schema scope.

Generated SQL MUST NOT receive administrative or write privileges merely for convenience.

---

## 2.90 AI answers MUST distinguish warehouse facts from inference

When an AI system uses analytical data, generated narrative inference MUST remain distinguishable from retrieved or computed warehouse facts.

A semantic metric result such as:

`Revenue = 4.2M`

has different provenance from:

`The decline may have been caused by seasonality.`

The interface SHOULD preserve that distinction where material.

---

## 2.91 Naming conventions MUST communicate layer and purpose

Model naming SHOULD be predictable.

A reasonable corpus convention is:

- `stg_<source>__<entity>`;
- `int_` or `core_` for reusable transformation/core concepts;
- `dim_<entity>`;
- `fct_<process>`;
- domain/entity mart names where appropriate.

Naming conventions MUST NOT substitute for metadata and documentation.

---

## 2.92 Warehouse objects MUST NOT be named after temporary implementation details

Consumer models SHOULD use stable business language.

Names such as:

- `new_table_2`;
- `final_final_orders`;
- `temp_revenue`;

MUST NOT become published production contracts.

---

## 2.93 Materialized consumer models SHOULD be cost-aware

Repeated expensive logic SHOULD be computed at an appropriate reusable boundary.

The system SHOULD avoid both extremes:

- recomputing complex transformations for every consumer;
- materializing every trivial intermediate step.

Materialization decisions SHOULD be measurable through warehouse workload telemetry.

---

## 2.94 Transformation DAG complexity MUST remain manageable

A model SHOULD have a coherent purpose.

Extremely large models with numerous unrelated joins SHOULD be decomposed.

Conversely, hundreds of trivial one-line transformation models SHOULD NOT be introduced without benefit.

Current dbt guidance similarly recommends intermediate models to isolate complex transformations while cautioning against unnecessary structural complexity. citeturn543950view1turn543950view2

---

## 2.95 Warehouse documentation SHOULD be generated from model metadata where practical

Documentation SHOULD remain close to governed definitions.

The catalog SHOULD expose:

- model;
- columns;
- tests;
- owner;
- lineage;
- metrics;
- freshness.

Documentation MUST NOT become a disconnected wiki that routinely drifts from implementation.

---

## 2.96 Administrative interfaces MUST use canonical components

shadcn/ui MUST remain the baseline for warehouse-management interfaces.

Preferred mappings include:

| Concern | Baseline |
|---|---|
| Model catalog | `Table`, canonical data-table pattern |
| Certified/deprecated status | `Badge` |
| Data-quality failure | `Alert` |
| Lineage/model details | `Sheet`, `Drawer`, dedicated page |
| Filters/search | `Input`, `Command`, `Select`, `Popover` |
| Backfill configuration | standard `Form` controls |
| Destructive rebuild/retire | `AlertDialog` |
| Freshness/build progress | `Progress`, `Skeleton` where appropriate |
| Supplementary definitions | `Tooltip`, `Popover` |

UI controls MUST NOT become the source of metric or warehouse semantics.

---

## 2.97 Data-quality state MUST NOT rely on colour alone

Quality and freshness UI MUST include text, iconography, status, or another non-colour cue.

Examples include:

- Healthy;
- Stale;
- Failed tests;
- Build failed.

Charts and warehouse observability MUST follow the Data Visualization Accessibility standard.

---

## 2.98 Breaking changes MUST have migration paths

Published models SHOULD support deprecation before removal where practical.

Deprecation SHOULD identify:

- replacement model;
- removal date;
- affected consumers.

Critical downstream consumers SHOULD be discoverable through lineage before destructive schema change.

---

## 2.99 Warehouse CI MUST validate changed models

Transformation changes SHOULD be tested before production deployment.

CI SHOULD validate relevant:

- compilation;
- schema contracts;
- unit/model tests;
- data tests;
- changed dependency graph.

CI SHOULD avoid rebuilding the entire warehouse unnecessarily when changed-state execution can provide equivalent confidence.

---

## 2.100 Production deployment MUST be observable

Warehouse runs MUST expose:

- run status;
- duration;
- failed model;
- test failures;
- affected dependencies.

A pipeline failure MUST NOT be discoverable only because a user notices a dashboard is stale.

---

# 3. Anti-patterns

The following are non-conforming unless a documented requirement provides a stronger justification.

## 3.1 Layering

- Dashboards querying raw ingestion directly.
- Staging models containing business KPIs.
- Multiple teams independently implementing `customer`.
- Marts exposing source-specific technical complexity unnecessarily.
- Layers existing only because a framework tutorial showed them.

## 3.2 Grain

- Fact table with no written grain.
- Order and order-line rows mixed together.
- Order-level revenue repeated on every line and then summed.
- Historical snapshots and transactions mixed in one undifferentiated table.
- One model whose grain changes depending on row type.

## 3.3 Dimensions

- Using source IDs as universal warehouse keys without evaluation.
- Duplicate definitions of the same dimension across marts.
- Joining historical facts to the current customer record by default.
- Type 1 overwrite of attributes required for historical reporting.
- Overlapping Type 2 rows.

## 3.4 Metrics

- Revenue defined differently in every BI dashboard.
- Ratio metrics averaged without weighting semantics.
- `active_users` with no definition of active or user.
- Test-account exclusions copied manually into dozens of queries.
- A metric formula changed silently while retaining the same semantic contract.

## 3.5 Materialization

- Every staging object persisted as a large table without reason.
- Every model made incremental by default.
- Incremental pipeline with no delete semantics.
- Incremental data diverging permanently from full refresh.
- Materialized views created without workload evidence.
- Persisting trivial intermediates while recomputing expensive shared logic repeatedly.

## 3.6 Data quality

- Tests added only to increase coverage numbers.
- No uniqueness test for declared grain.
- Failed referential-integrity checks ignored indefinitely.
- Row-count checks with arbitrary hard thresholds.
- Pipeline publishing known-invalid financial data because the SQL completed.
- Stale data shown as current after upstream failure.

## 3.7 Backfills

- Production backfill written as one-off console SQL.
- Reprocessing creates duplicate facts.
- Backfill uses today's dimension state for historical events unintentionally.
- Historical correction made without downstream refresh.
- Critical historical result impossible to reproduce because source data was overwritten.
- Multi-year warehouse rebuilt unnecessarily for a localized repair.

## 3.8 Self-service

- Self-service defined as access to every raw table.
- Analysts expected to know which of five `customer` tables is correct.
- Many-to-many BI joins permitted silently.
- No distinction between certified and experimental datasets.
- Temporary analyst tables kept forever.
- Query access with no workload guardrails.

## 3.9 Security

- PII copied into every mart via `SELECT *`.
- Tenant key lost during aggregation.
- Semantic metrics exposing dimensions users cannot otherwise access.
- Warehouse service accounts shared by all analysts.
- AI assistant given administrator warehouse credentials.

## 3.10 AI/LLM

- LLM reconstructing business metrics from raw column names.
- Text-to-SQL treated as replacement for dimensional modeling.
- Model granted write privileges for read-only analytics.
- Prompt text able to bypass warehouse authorization.
- AI answer mixing queried values and speculation without distinction.
- Semantic metadata omitted while expecting an LLM to infer grain correctly.

## 3.11 Governance

- Published dataset with no owner.
- Wiki-only documentation unrelated to model code.
- Breaking a heavily used mart without lineage review.
- `final_final_v3` becoming a production contract.
- Pipeline failure detected only through executive dashboard complaints.

---

# 4. Checklist

## 4.1 Layering

- [ ] Raw/source data remains recoverable where required.
- [ ] Staging is source-conformed.
- [ ] Staging avoids unnecessary joins and aggregation.
- [ ] Core models provide reusable business-conformed concepts.
- [ ] Marts serve clear analytical purposes.
- [ ] Semantic definitions sit above governed models.
- [ ] Layers exist for defined responsibilities rather than ceremony.

## 4.2 Dimensional modeling

- [ ] Fact and dimension responsibilities are clear.
- [ ] Broad self-service marts favor understandable star schemas.
- [ ] Conformed dimensions are reused consistently.
- [ ] Surrogate keys are used where historical/cross-source identity requires them.
- [ ] Unknown/not-applicable dimension semantics are defined.

## 4.3 Grain

- [ ] Every fact table has a written grain statement.
- [ ] Grain is defined before measures and dimensions.
- [ ] Different grains are not mixed.
- [ ] Measures conform to grain.
- [ ] Grain uniqueness is tested where practical.
- [ ] Additive, semi-additive, and non-additive behavior is understood.

## 4.4 Slowly changing dimensions

- [ ] Mutable dimension attributes have defined history behavior.
- [ ] Type 1 is used only where history is unnecessary.
- [ ] Type 2 validity intervals are consistent.
- [ ] Type 2 rows do not overlap unintentionally.
- [ ] There is at most one current row where required.
- [ ] Historical facts resolve to the intended historical dimension state.
- [ ] Late-arriving dimensions have deterministic handling.

## 4.5 Time

- [ ] Business/event time is distinct from ingestion time.
- [ ] Late facts retain actual event time.
- [ ] Reporting timezone is defined.
- [ ] Snapshot interval and timezone are explicit.
- [ ] Backfills preserve historical time semantics.

## 4.6 Metrics and semantic layer

- [ ] Material business metrics have canonical definitions.
- [ ] Metric owner is known.
- [ ] Formula, units, filters, and time semantics are documented.
- [ ] Ratio denominator semantics are explicit.
- [ ] Distinct-count identity is defined.
- [ ] Permanent exclusions live with governed logic.
- [ ] Definitions are version-controlled.
- [ ] Semantic changes are treated as contract changes.
- [ ] BI tools do not independently redefine critical metrics.

## 4.7 Materialization

- [ ] Views are used where simple recomputation is adequate.
- [ ] Tables are justified by reuse/performance.
- [ ] Incremental models define keys, updates, deletes, and late data.
- [ ] Incremental and full rebuild results converge.
- [ ] Materialized views are workload-driven.
- [ ] Refresh and freshness state are observable.
- [ ] Materialization does not add complexity without measurable benefit.

## 4.8 Data quality

- [ ] Published models have appropriate not-null/uniqueness/domain tests.
- [ ] Declared grain is validated.
- [ ] Fact/dimension relationships are tested.
- [ ] SCD invariants are tested.
- [ ] Business invariants are tested.
- [ ] Source freshness is monitored.
- [ ] Quality-test severity is defined.
- [ ] Invalid new builds do not silently replace known-good published data where preventable.

## 4.9 Contracts and lineage

- [ ] Critical sources/models have schema contracts where appropriate.
- [ ] Ownership is explicit.
- [ ] Published models have lineage.
- [ ] Breaking changes have impact analysis.
- [ ] Deprecation path exists where practical.
- [ ] Documentation is tied closely to model metadata.

## 4.10 Backfill and reproducibility

- [ ] Backfills are parameterized and repeatable.
- [ ] Backfill code is version-controlled.
- [ ] Reprocessing is idempotent where practical.
- [ ] Code version and data version are distinguishable.
- [ ] Historical dimension semantics are preserved.
- [ ] Compute scope is bounded appropriately.
- [ ] Downstream copies are refreshed where required.
- [ ] Material historical restatements are communicated.

## 4.11 Self-service

- [ ] Certified datasets are clearly identified.
- [ ] Consumers can discover model grain and owner.
- [ ] Valid joins are documented or governed.
- [ ] Many-to-many relationships are explicit.
- [ ] Fact-to-fact joins are controlled.
- [ ] Sandboxes are separate from certified products.
- [ ] Temporary data has retention/expiry.
- [ ] Query guardrails protect shared resources.

## 4.12 Security

- [ ] Sensitive fields follow classification and least privilege.
- [ ] PII is minimized in consumer marts.
- [ ] Tenant identity survives every transformation.
- [ ] Row/column policies apply at consumer interfaces.
- [ ] Metric access cannot trivially bypass underlying policy.
- [ ] Production warehouse identities are attributable.

## 4.13 AI/LLM

- [ ] AI consumes governed marts or semantic metrics where practical.
- [ ] Text-to-SQL does not redefine governed business concepts.
- [ ] AI receives grain and semantic metadata.
- [ ] AI identity has least-privilege warehouse access.
- [ ] Generated queries have scan/time/result guardrails.
- [ ] Retrieved warehouse facts remain distinguishable from AI inference.
- [ ] Prompt content cannot extend authorization.

## 4.14 Operations

- [ ] Warehouse CI validates changed models.
- [ ] Production builds are observable.
- [ ] Build failures alert appropriate owners.
- [ ] Freshness failures are distinguishable from transformation failures.
- [ ] Warehouse workload cost is monitored.
- [ ] Expensive reusable transformations have appropriate materialization.

## 4.15 UX and accessibility

- [ ] Catalog and quality status do not rely only on colour.
- [ ] Administrative interfaces use shadcn/ui.
- [ ] Tables and filters follow canonical component patterns.
- [ ] Destructive rebuild/deprecation actions use explicit confirmation.
- [ ] Analytics interfaces follow Data Visualization accessibility standards.

## 4.16 Corpus alignment

- [ ] Security controls sensitive analytical access.
- [ ] Data & Database standards govern types, time, retention, and identifiers.
- [ ] APIs expose governed analytical contracts where required.
- [ ] State Management does not substitute transient client state for warehouse truth.
- [ ] Forms & Validation remains authoritative for transactional user input.
- [ ] Accessibility applies to catalog and analytical-management UI.
- [ ] Design Tokens govern freshness, quality, and status presentation.
- [ ] shadcn/ui is the administrative component baseline.
- [ ] Analytics consumes governed marts and metrics.
- [ ] AI/LLM systems consume semantic definitions rather than invent them.

---

# 5. Canonical summary

A Gold Standard 2026 warehouse MUST turn source data into stable, governed analytical meaning through explicit modeling boundaries.

The canonical conceptual flow is **raw/source → staging → core → marts → semantic/consumer layer**. Staging SHOULD remain source-conformed; core SHOULD establish reusable business-conformed concepts; marts SHOULD expose understandable analytical processes and entities.

Dimensional star schemas SHOULD be the default for broad self-service BI where they provide clearer analytical semantics. Facts represent measurements or events; dimensions provide descriptive context.

Every fact table MUST declare its grain before dimensions or measures are selected. Different grains MUST NOT be mixed in one fact table. Kimball describes grain as the binding definition of what a single fact-table row represents and recommends atomic-grained facts as the flexible analytical foundation. citeturn543950view4

Conformed dimensions MUST preserve consistent business semantics across facts and domains.

Slowly changing dimension behavior MUST be deliberate at the attribute level. Type 1 overwrites history; Type 2 preserves historical versions. Type 2 dimensions MUST maintain valid, non-overlapping historical intervals and facts MUST resolve to the historically intended row. citeturn543950view5

Material business metrics MUST have canonical definitions. Formula, denominator, exclusions, time semantics, units, dimensions, and ownership MUST be governed. Critical metrics SHOULD live in a semantic layer or equivalent central definition rather than being independently reconstructed in every BI tool. Current dbt Semantic Layer guidance follows this model by centralizing metrics for consistent consumption across downstream applications. citeturn543950view3

Materialization MUST follow measured workload needs. Teams SHOULD begin with the simplest adequate representation and adopt tables, incremental models, materialized views, or other persisted structures only when freshness, latency, compute, or scale justify the complexity. citeturn543950view2turn543950view6

Incremental processing MUST have correctness semantics for keys, updates, deletes, late data, and full refresh. Given equivalent inputs, incremental and clean rebuilds SHOULD converge to equivalent analytical results.

Published analytical models MUST have quality controls appropriate to their contract. Grain uniqueness, required values, valid relationships, SCD invariants, business rules, and freshness SHOULD be tested automatically.

Bad new data MUST NOT silently replace known-good published data where the architecture can preserve the previous valid state.

Backfills MUST be engineered operations, not untracked production SQL. They SHOULD be parameterized, version-controlled, repeatable, bounded, observable, and idempotent where practical. Historical recomputation MUST use the intended historical dimensions, reference data, and metric semantics.

Critical analytical results SHOULD be reproducible from identifiable versions of transformation code and source/reference data to the degree required by the business and retention model.

Self-service analytics MUST mean governed independence rather than unrestricted raw access. Consumers SHOULD receive certified datasets, documented grain, valid join paths, canonical metrics, lineage, and understandable freshness.

Security and tenancy MUST survive transformation. Sensitive attributes SHOULD be minimized, authorization MUST remain effective in marts and semantic layers, and cross-tenant analytical leakage is a security defect.

AI/LLM systems SHOULD consume governed analytical interfaces. Text-to-SQL MAY assist query generation, but it MUST NOT replace dimensional modeling, semantic metrics, authorization, or data-quality controls. AI systems SHOULD receive explicit model grain, dimensions, relationships, and metric definitions rather than being expected to infer business meaning from arbitrary warehouse columns.

shadcn/ui is the canonical component baseline for warehouse-management interfaces. Catalog, lineage, data-quality, backfill, and metric-administration UI MUST preserve the same accessibility, security, status, and confirmation patterns as the wider application.

**Canonical rule:** an analytical model is conforming only when a consumer can determine what one row means, which history it represents, which metrics it supports, where the data came from, whether it is fresh and valid, how it can be reproduced, and which governed interface should be used without reverse-engineering source-system SQL.

One deliberate corpus choice is the explicit **`staging → core → marts`** vocabulary. dbt's current published guidance uses `staging → intermediate → marts`; this standard treats **core** as the broader business-conformed boundary, which may contain intermediate transformation models internally without exposing them as consumer contracts.
