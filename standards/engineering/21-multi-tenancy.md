---
id: "multi-tenancy"
title: "Multi-Tenancy Guidelines — Gold Standard 2026"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "multi", "tenancy"]
applies_to: ["general"]
related: ["security", "internationalization", "admin-internal-tools"]
legacy_number: 45
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 76985
provenance: baseline

---

Canonical placement: **Authentication & Authorization → Admin & Internal Tools → Multi-Tenancy → Data & Database → API**. Multi-Tenancy owns the **tenant-context and isolation contract** spanning requests, data, caches, files, queues, search, analytics, exports, jobs, and infrastructure; individual subsystem standards implement that contract.

# Multi-Tenancy Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for multi-tenant systems, including:

- tenant identity;
- tenant resolution;
- tenant context;
- tenant membership;
- tenant switching;
- tenant-aware authorization;
- pooled and isolated tenancy models;
- database isolation;
- tenant-aware queries;
- row-level security;
- schemas and dedicated databases;
- cache isolation;
- file/object isolation;
- queue and background-job isolation;
- search indexing;
- analytics;
- exports;
- imports;
- API design;
- webhooks;
- notifications;
- observability;
- rate limits;
- noisy-neighbor protection;
- feature flags;
- configuration;
- encryption;
- backups;
- residency;
- lifecycle;
- onboarding;
- offboarding;
- admin access;
- impersonation;
- testing;
- incident response.

The objective is to make tenant boundaries:

```text
Explicit
Verified
Server-controlled
End-to-end
Fail-closed
Auditable
Testable
Scalable
Resource-aware
Difficult to bypass accidentally
```

The core principle is:

> **Every tenant-owned operation must have one verified tenant context, and every resource boundary must enforce that context before data or effects can cross it.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
Affected tenant/resource
Isolation model
Risk
Compensating control
Owner
Review/expiry date
```

---

# 3. What Is a Tenant?

A tenant is an independently governed customer/account/domain boundary whose data, configuration, authorization, quotas, and operational effects must remain isolated from other tenants according to product policy.

Typical examples:

```text
Organization
Company
Workspace
School
Customer account
Agency
Project account
```

A tenant is not automatically equivalent to:

```text
user
role
subscription
region
environment
```

---

# 4. Tenant Boundary Is a Security Boundary

Tenant separation MUST be treated as a security boundary.

Cross-tenant leakage is not merely a filtering bug.

It is a potential authorization and confidentiality failure.

---

# 5. Authentication Does Not Establish Isolation

A user may be:

```text
authenticated
+
authorized for application functionality
```

and still access another tenant unless tenant ownership is independently enforced.

---

# 6. Authorization Does Not Imply Tenant Context

Permission:

```text
invoice.read
```

does not mean:

```text
read invoice belonging to any tenant
```

Authorization is evaluated against:

```text
Actor
Tenant
Resource
Action
```

---

# 7. Tenant Isolation Is End-to-End

Tenant isolation applies to:

```text
Requests
Database rows
Caches
Search indexes
Files
Queues
Workers
Events
Webhooks
Analytics
Exports
Logs
Backups
Configuration
Rate limits
```

A tenant-safe database alone does not make the system tenant-safe.

---

# 8. Canonical Context Model

Every tenant-scoped operation SHOULD conceptually carry:

```text
Actor
Authenticated identity
Tenant ID
Tenant membership/authorization
Roles/permissions
Environment
Request/correlation ID
```

---

# 9. Tenant ID

Every tenant MUST have a stable internal identifier.

---

# 10. Tenant Identifier Type

Tenant identifiers SHOULD be:

```text
immutable
opaque where practical
non-sensitive
globally unique within the product
```

---

# 11. Display Name Is Not Identity

Never identify a tenant solely by:

```text
company name
workspace name
subdomain label
display slug
```

Display attributes may change or collide.

---

# 12. Tenant Slug

Human-readable slugs MAY exist for routing.

They SHOULD resolve to the stable tenant ID.

---

# 13. Slug Changes

Changing a slug MUST NOT change tenant ownership or internal identity.

---

# 14. Opaque IDs Are Not Authorization

A UUID or random identifier reduces enumeration.

It does not prove the caller may access that tenant.

---

# 15. Tenant Resolution

Tenant resolution determines:

> **Which tenant context is requested for this operation?**

---

# 16. Tenant Resolution Sources

Tenant selection MAY originate from:

```text
Subdomain
Route segment
Authenticated session
Explicit workspace selector
API credential
Trusted service metadata
```

according to architecture.

---

# 17. Tenant Selector ≠ Tenant Authorization

A value such as:

```text
X-Tenant-ID
/workspaces/:tenantId
tenant.example.com
```

is a selector.

It MUST NOT be accepted as proof of authorization.

---

# 18. Tenant Context Establishment

For tenant-scoped requests, tenant context SHOULD be established early in the request lifecycle.

Example:

```text
Authenticate
↓
Resolve requested tenant
↓
Verify membership/service scope
↓
Create verified tenant context
↓
Execute application logic
```

---

# 19. Trusted Context

Downstream application code SHOULD consume a server-verified tenant context rather than repeatedly trusting raw request parameters.

---

# 20. Client-Supplied Tenant Header

A client-supplied tenant header MUST be validated against authenticated identity and current authorization before becoming trusted context.

---

# 21. No Default Tenant Guessing for Mutations

A mutation SHOULD NOT silently fall back to:

```text
first tenant
last tenant
default tenant
```

when tenant context is ambiguous.

Fail explicitly.

---

# 22. Single-Tenant User Convenience

If a user belongs to only one tenant, UI MAY select it automatically.

Server authorization is still mandatory.

---

# 23. Missing Tenant Context

A tenant-scoped operation with no valid tenant context MUST fail closed.

---

# 24. Invalid Tenant Context

A requested tenant outside the actor's authorized scope MUST fail without revealing unnecessary tenant information.

---

# 25. Tenant Enumeration

Unauthorized responses SHOULD avoid exposing whether arbitrary tenant IDs exist where enumeration creates risk.

---

# 26. Global Routes

Not every route needs tenant context.

Examples:

```text
Login
Health checks
Public marketing
Tenant creation
Global user profile
```

Do not fabricate a fake tenant for global operations.

---

# 27. Cross-Tenant Operations

Intentional cross-tenant operations MUST be explicit.

Examples:

```text
platform analytics
billing reconciliation
security investigation
global migration
support administration
```

---

# 28. Cross-Tenant Identity

Cross-tenant jobs/services MUST use dedicated identities/scopes.

Do not execute them under an arbitrary tenant.

---

# 29. User Membership

Tenant membership SHOULD be modeled explicitly.

Conceptually:

```text
User
↕
Membership
↕
Tenant
```

---

# 30. Membership Record

Membership SHOULD capture:

```text
user_id
tenant_id
status
roles/permissions
joined_at
```

and related domain metadata where needed.

---

# 31. Tenant Role Is Membership-Scoped

A user MAY be:

```text
Admin in Tenant A
Viewer in Tenant B
No access in Tenant C
```

Roles are not necessarily global.

---

# 32. Membership Status

Membership lifecycle MAY include:

```text
invited
active
suspended
removed
```

---

# 33. Removed Membership

Removing membership MUST invalidate future tenant authorization.

---

# 34. Session Staleness

Long-lived sessions MUST NOT permanently retain obsolete membership.

Authorization SHOULD reflect sufficiently current membership state.

---

# 35. Tenant Switching

Tenant switching is a security-context change.

---

# 36. Tenant Switch Flow

Canonical flow:

```text
User requests Tenant B
↓
Server verifies current membership/permission
↓
Tenant context changes
↓
Tenant-sensitive state invalidated/reloaded
↓
UI clearly displays Tenant B
```

---

# 37. Tenant Switch Must Be Explicit

For users belonging to multiple tenants, switching SHOULD be deliberate and visible.

---

# 38. Current Tenant Visibility

The active tenant SHOULD be persistently understandable in:

```text
navigation
page context
breadcrumbs/header
high-risk actions
```

where mistakes would matter.

---

# 39. Tenant Switch and URL

Where routes are shareable/deep-linkable, tenant context SHOULD normally be reflected in the URL or another stable routing model.

---

# 40. Stale Tenant UI

After tenant switch, UI MUST NOT retain data from the previous tenant.

---

# 41. Tenant Switch Invalidation

Switching tenant SHOULD invalidate or separate:

```text
server-query cache
client query cache
permissions
feature flags
search results
forms
selected records
notifications
```

as applicable.

---

# 42. Dirty State

Switching tenant while an unsaved form exists SHOULD trigger an appropriate unsaved-work policy.

---

# 43. Tenant-Aware URL

A URL targeting Tenant A MUST NOT silently execute within Tenant B because the session's current tenant differs.

---

# 44. Deep Link

When opening a tenant-scoped deep link:

```text
resolve route tenant
verify membership
activate route context
```

rather than ignoring the URL tenant.

---

# 45. Tenant Switch Confirmation

Routine tenant switching SHOULD not require confirmation unless unsaved/high-risk state exists.

---

# 46. Multiple Tabs

Different browser tabs MAY legitimately operate in different tenant contexts.

Architecture SHOULD NOT rely exclusively on one global mutable browser value that makes tabs corrupt each other.

---

# 47. Browser Storage

Tenant selection persisted in browser storage is convenience state, not authorization proof.

---

# 48. Multi-Tenant Storage Models

Canonical isolation models are:

```text
Silo
Pool
Hybrid / Bridge
```

---

# 49. Silo Model

A silo model dedicates significant resources to one tenant.

Examples:

```text
database per tenant
account/project per tenant
cluster per tenant
bucket per tenant
```

---

# 50. Pool Model

A pool model shares infrastructure across tenants while enforcing logical isolation.

Examples:

```text
shared application
shared database
shared table
shared queue
```

---

# 51. Hybrid Model

A hybrid model shares some resources while isolating others.

Example:

```text
shared application tier
+
shared cache
+
dedicated database for regulated tenants
```

---

# 52. Isolation Is a Spectrum

The entire application does not need one tenancy model.

Each resource MAY have a different isolation strategy.

---

# 53. Isolation Decision

Choose isolation based on:

```text
Security
Compliance
Data residency
Performance
Noisy-neighbor risk
Cost
Operational complexity
Customer requirements
Service limits
```

---

# 54. Stronger Isolation Tier

Some tenants MAY require more isolation than others.

This MUST be deliberate and testable.

---

# 55. Tenancy Tier

Examples:

```text
Pooled
Dedicated database
Dedicated infrastructure
```

MAY be product/service tiers.

---

# 56. Same Contract Across Models

Application semantics SHOULD remain consistent even when different tenants use different infrastructure isolation models.

---

# 57. Isolation Transparency

Business logic SHOULD not need pervasive:

```text
if enterprise tenant use DB-A
else DB-B
```

checks.

Encapsulate tenant resource resolution.

---

# 58. Tenant Resource Resolver

Infrastructure/data layers SHOULD be able to map:

```text
tenant_id
→ storage/resource placement
```

through a controlled resolver.

---

# 59. Tenant Placement Metadata

Placement information MAY include:

```text
database
schema
region
storage account
search index
encryption key
deployment shard
```

---

# 60. Placement Is Server-Controlled

Clients MUST NOT select arbitrary physical tenant storage placement.

---

# 61. Database Tenancy

Common database strategies include:

```text
Database per tenant
Schema per tenant
Shared tables with tenant ownership
```

---

# 62. Database Per Tenant

Useful when:

```text
strong isolation
custom residency
large tenant
customer-specific backup/restore
regulatory requirement
```

justify operational cost.

---

# 63. Schema Per Tenant

Schema isolation MAY offer an intermediate model.

It still requires disciplined:

```text
schema resolution
permissions
migrations
connection handling
```

---

# 64. Shared Tables

Shared-table tenancy SHOULD represent tenant ownership through an enforceable association.

Typically:

```text
tenant_id
```

or a parent relationship that reliably establishes it.

---

# 65. Tenant Ownership

Every tenant-owned record MUST have an unambiguous path to its tenant.

---

# 66. Direct vs Inherited Tenant ID

A table MAY:

```text
carry tenant_id directly
```

or:

```text
inherit tenant through a parent relation
```

when enforcement remains reliable.

---

# 67. Direct Tenant ID Preference

Frequently queried tenant-owned tables SHOULD usually carry tenant identity directly when it simplifies:

```text
isolation
indexes
constraints
RLS
debugging
```

---

# 68. Global Data

Global/reference data MUST be explicitly classified as global.

Do not simply omit tenant ownership accidentally.

---

# 69. Data Classification

Tables/resources SHOULD be classified:

```text
Global
Tenant-owned
User-owned within tenant
Authorized cross-tenant
```

---

# 70. Tenant-Aware Query Rule

An ordinary tenant-scoped data access path MUST NOT issue an unscoped query against tenant-owned data.

---

# 71. Good Query Shape

Conceptually:

```text
WHERE tenant_id = currentTenant
  AND id = requestedId
```

---

# 72. Bad Query Shape

Avoid:

```text
SELECT ...
WHERE id = requestedId
```

followed by:

```text
if record.tenant_id != tenant:
  reject
```

when the query can enforce ownership directly.

---

# 73. Scope at Retrieval

Tenant ownership SHOULD be part of the resource lookup itself.

---

# 74. Composite Identity

Within pooled systems, resource identity SHOULD often be modeled conceptually as:

```text
(tenant_id, resource_id)
```

even when resource IDs are globally unique.

---

# 75. Tenant-Aware Repository API

Prefer APIs such as:

```text
repository.get(tenantId, resourceId)
```

over:

```text
repository.get(resourceId)
```

for tenant-owned records.

---

# 76. Unscoped Repository Method

Generic unscoped access to tenant-owned data SHOULD be restricted to explicitly privileged infrastructure/admin modules.

---

# 77. Global Query Marker

Cross-tenant queries SHOULD be obvious in code and naming.

Example:

```text
adminRepository.listAcrossTenants(...)
```

not an invisible bypass.

---

# 78. Tenant Indexes

Shared-table queries SHOULD commonly index tenant ownership with access patterns.

Example conceptually:

```text
(tenant_id, id)
(tenant_id, created_at)
(tenant_id, status)
```

---

# 79. Uniqueness

Tenant-local uniqueness SHOULD be enforced with tenant scope.

Example:

```text
UNIQUE (tenant_id, external_key)
```

rather than global uniqueness unless domain rules require global uniqueness.

---

# 80. Foreign Keys

Tenant-local relationships SHOULD prevent accidental cross-tenant references.

---

# 81. Composite Foreign Keys

Where useful, constraints MAY include:

```text
tenant_id
+
parent_id
```

to ensure child and parent belong to the same tenant.

---

# 82. Database Defense in Depth

Application filtering SHOULD NOT be the only isolation mechanism when the database can safely provide stronger enforcement.

---

# 83. PostgreSQL Row-Level Security

For shared PostgreSQL tables, Row-Level Security MAY provide strong defense in depth.

---

# 84. RLS Default Deny

When PostgreSQL RLS is enabled and no applicable policy exists, normal access is default-deny.

This is useful for tenant isolation.

---

# 85. RLS Policy

Tenant RLS SHOULD enforce both:

```text
rows visible
```

and:

```text
rows insertable/updatable
```

through appropriate policy conditions.

---

# 86. `WITH CHECK`

Tenant-aware insert/update policies SHOULD prevent writing a row into a different tenant.

---

# 87. RLS Bypass

Application tenant-request connections MUST NOT use:

```text
superuser
BYPASSRLS
```

when RLS is relied upon as an isolation boundary.

---

# 88. Table Owner Caveat

PostgreSQL table owners normally bypass RLS unless forced.

Tenant-serving roles SHOULD therefore not accidentally operate as table owner.

---

# 89. `FORCE ROW LEVEL SECURITY`

`FORCE ROW LEVEL SECURITY` SHOULD be considered where owner bypass would undermine the intended model.

---

# 90. RLS Role Separation

Migration/schema-owning roles and runtime tenant-request roles SHOULD be separate.

---

# 91. Tenant DB Context

If RLS uses session/transaction context, that context MUST be derived from verified application tenant context.

---

# 92. Connection Pools

Connection pooling creates tenant-context leakage risk.

---

# 93. Transaction-Local Context

Tenant database context SHOULD be transaction-local where supported.

---

# 94. Session Variable Hazard

Avoid leaving:

```text
current tenant = Tenant A
```

on a pooled database connection that may later serve Tenant B.

---

# 95. Reset Safety

If session-scoped tenant state is unavoidable, reliable reset-on-checkout/check-in MUST be proven with tests.

---

# 96. Transaction Pattern

Preferred:

```text
BEGIN
SET LOCAL tenant_context = ...
queries...
COMMIT
```

or an equivalent safe mechanism.

---

# 97. RLS Testing

Every tenant-owned RLS table MUST have cross-tenant denial tests.

---

# 98. RLS Inventory

Maintain an inventory of tenant-owned tables requiring RLS/isolation policies.

---

# 99. Migration Safety

Adding a new tenant-owned table without its isolation policy MUST be detectable in review/CI where practical.

---

# 100. Raw SQL

Raw SQL touching tenant-owned tables MUST follow the same isolation rules as ORM queries.

---

# 101. ORM Scope

ORM convenience MUST NOT make tenant scope implicit and unreviewable.

---

# 102. Global ORM Scope

Automatic tenant filters MAY reduce mistakes.

They MUST provide deliberate explicit cross-tenant escape paths—not accidental hidden bypasses.

---

# 103. Background Queries

Jobs/scripts do not receive exemptions from tenant-aware query rules.

---

# 104. Cache Classification

Every cached item MUST be classified:

```text
Global
Tenant-scoped
User-scoped
```

---

# 105. Tenant Cache Key

Tenant-scoped cache keys MUST include tenant scope.

Conceptually:

```text
tenant:{tenantId}:project:{projectId}
```

---

# 106. Bad Cache Key

Avoid:

```text
project:{projectId}
```

when the value or permission varies by tenant.

---

# 107. User Within Tenant

User-specific tenant data SHOULD include both dimensions:

```text
tenant:{tenantId}:user:{userId}:preferences
```

---

# 108. Cache Key Completeness

Cache keys SHOULD also include any dimension that changes the result:

```text
locale
permission version
feature set
query/filter
version
```

---

# 109. Global Cache Namespace

Intentionally global cache values SHOULD have an explicit global namespace.

---

# 110. Authorization Before Cache

A cache hit does not replace authorization.

Authorize the request before serving protected cached data.

---

# 111. Cache Poisoning

One tenant MUST NOT be able to populate cache entries consumed as another tenant's authoritative value.

---

# 112. Shared Redis

A shared Redis instance MAY serve many tenants if key isolation and authorization are correct.

---

# 113. Dedicated Cache

High-risk tenants MAY receive separate cache instances/namespaces where stronger operational isolation is required.

---

# 114. Cache Invalidation

Tenant updates MUST invalidate only the intended tenant's cache entries unless the cached object is genuinely global.

---

# 115. Tenant Flush

Avoid:

```text
FLUSHALL
```

as routine per-tenant invalidation.

---

# 116. Tenant Cache Quota

Shared caches SHOULD consider per-tenant memory/entry/throughput controls where noisy-neighbor risk exists.

---

# 117. Session Data

Session state containing tenant permissions/context MUST not be reused across unauthorized tenant switches.

---

# 118. Files and Blob Storage

Every stored object SHOULD be classified:

```text
Global
Tenant
User within tenant
```

---

# 119. Tenant Object Key

Tenant-scoped object storage SHOULD use an enforceable tenant-aware key/bucket/account policy.

Example:

```text
tenants/{tenantId}/files/{fileId}
```

---

# 120. Path Is Not Authorization

Object path containing tenant ID does not itself authorize access.

---

# 121. File Access

Before returning/generating access to a tenant file:

```text
Authenticate
↓
Resolve tenant
↓
Authorize resource
↓
Generate/read exact object
```

---

# 122. Signed URL

Signed URLs MUST be scoped to:

```text
exact object
required method
appropriate expiry
```

---

# 123. Signed URL Generation

A signed URL MUST only be created after tenant/object authorization.

---

# 124. Signed URL Tenant Exposure

Tenant ID need not be public in a signed URL if authorization was already established securely.

---

# 125. Upload Destination

Clients MUST NOT choose arbitrary storage paths.

Server-side authorization should determine upload destination.

---

# 126. Upload Token

Presigned upload permissions SHOULD be constrained by:

```text
tenant path
object
method
size/type conditions where supported
expiry
```

---

# 127. File Metadata

Database file metadata MUST carry reliable tenant ownership.

---

# 128. Orphaned File

Object-storage cleanup MUST NOT accidentally delete another tenant's object because identifiers collide.

---

# 129. Encryption Keys

Tenant-specific encryption keys MAY be used when compliance/risk/customer tier requires cryptographic isolation.

---

# 130. Encryption Context

Encryption context SHOULD include tenant identity where supported and useful.

---

# 131. Queues

A shared queue is NOT a tenant-isolation boundary.

---

# 132. Job Classification

Every asynchronous job MUST be classified:

```text
Global
Tenant-scoped
Explicitly cross-tenant
```

---

# 133. Tenant Job Context

Tenant-scoped jobs MUST carry trusted tenant context.

---

# 134. Producer Authorization

The producer MUST derive the job tenant from verified request/service authorization.

---

# 135. Message Tenant Field

A tenant ID inside message payload is metadata.

The consumer MUST NOT trust it blindly without an authenticated/integrity-protected producer path.

---

# 136. Consumer Context

Workers MUST re-establish tenant context before tenant-owned work.

---

# 137. Delayed Authorization

When authorization may have changed between enqueue and execution, workers SHOULD re-check current membership/permission where required.

---

# 138. Job Payload

Prefer stable identifiers:

```text
tenant_id
resource_id
event_id
operation
```

rather than large copied tenant objects.

---

# 139. Queue Idempotency

Idempotency keys SHOULD include tenant scope when outcomes are tenant-specific.

---

# 140. Deduplication

Deduplication keys MUST NOT cause Tenant A's message to suppress Tenant B's distinct message.

---

# 141. Ordering

Per-tenant ordering SHOULD be used only where domain semantics require it.

---

# 142. Dead-Letter Queue

DLQ records MUST retain tenant identity.

---

# 143. DLQ Access

Operators replaying failed work MUST preserve the original authorized tenant context.

---

# 144. DLQ Replay

Do not replay messages under the operator's current tenant accidentally.

---

# 145. Queue Fairness

One tenant MUST NOT monopolize a shared worker fleet indefinitely.

---

# 146. Tenant Concurrency

Shared background processing SHOULD support per-tenant concurrency limits where workload can create noisy-neighbor effects.

---

# 147. Tenant Queue Quota

Queue depth MAY be bounded per tenant.

---

# 148. Global Protection

Per-tenant limits complement—not replace—global capacity limits.

---

# 149. Scheduled Jobs

Tenant schedules MUST preserve explicit tenant ownership.

---

# 150. Cron Fan-Out

A global scheduler MAY fan out to tenants.

Each generated job MUST then carry independent tenant context.

---

# 151. Global Job

A genuinely global job should use explicit global scope rather than a synthetic:

```text
tenant_id = 0
```

hack.

---

# 152. Events

Domain events for tenant-owned resources SHOULD include tenant identity.

---

# 153. Event Authorization

An event bus itself does not prove consumers are authorized for every tenant.

---

# 154. Event Partitioning

Tenant identity MAY participate in:

```text
routing
partition key
topic
subscription policy
```

where useful.

---

# 155. Cross-Tenant Event Consumers

Global consumers MUST have an explicit cross-tenant service role.

---

# 156. Webhooks

Outbound webhooks MUST belong to an explicit tenant.

---

# 157. Webhook Destination

Tenant A MUST NOT be able to configure a webhook that causes Tenant B's events/data to be delivered.

---

# 158. Webhook Config Ownership

Webhook endpoint configuration MUST be tenant-scoped and authorized.

---

# 159. Webhook Payload

Tenant webhook payloads SHOULD contain only that tenant's authorized event data.

---

# 160. Webhook Signing

Webhook signatures SHOULD bind the actual payload and relevant delivery metadata according to API/Webhook Guidelines.

---

# 161. Incoming B2B Requests

API credentials SHOULD be bound to:

```text
tenant
or authorized tenant set
environment
permissions
```

---

# 162. Cross-Tenant API Credentials

Credentials authorized across tenants MUST be explicit and strongly controlled.

---

# 163. Tenant ID in API Request

Tenant path/header parameters are never substitutes for credential scope.

---

# 164. Search

Search indexes MUST preserve tenant isolation.

---

# 165. Search Document

Each tenant-owned search document SHOULD contain an enforceable tenant ownership attribute or reside in a tenant-isolated index.

---

# 166. Search Strategy

Common options:

```text
shared index + tenant filter
index per tenant
hybrid/sharded approach
```

---

# 167. Search Filter

A pooled search query MUST apply verified tenant scope before returning results.

---

# 168. Client Search Filter

Do not retrieve cross-tenant search results and filter them in the browser.

---

# 169. Search Facets

Facets/counts MUST be tenant-scoped.

A zero-result list with a global count is still a data leak.

---

# 170. Search Suggestions

Autocomplete, suggestions, spell correction, and related-items features MUST not leak other tenants' content.

---

# 171. Search Cache

Search-response caches require tenant-aware keys.

---

# 172. Search Indexing Job

Indexer jobs MUST preserve tenant ownership when creating/updating/deleting documents.

---

# 173. Search Deletion

Tenant offboarding/deletion MUST include search-index cleanup.

---

# 174. Analytics

Product analytics MUST include deliberate tenant semantics.

---

# 175. Analytics Tenant ID

Tenant-aware events SHOULD use an opaque stable tenant identifier.

---

# 176. Analytics Does Not Authorize

An analytics `tenant_id` is attribution—not authorization.

---

# 177. Event Attribution

Tenant-scoped events SHOULD identify:

```text
tenant
user where appropriate
event
```

according to Analytics/Privacy Guidelines.

---

# 178. Cross-Tenant Dashboard

Internal aggregate analytics MAY span tenants.

Access to drill-down/customer-level details must remain privileged.

---

# 179. Tenant Analytics

Customer-visible analytics MUST only include that tenant's authorized data.

---

# 180. Warehouse Isolation

Warehouse/BI models MUST preserve tenant ownership when tenant-level data exists.

---

# 181. BI Tool

Business-intelligence tooling MUST NOT rely solely on analyst discipline to remember:

```text
WHERE tenant_id = ...
```

for customer-facing isolation.

---

# 182. Analytics Views

Provide governed tenant-scoped views/semantic models where possible.

---

# 183. Analytics Export

Analytics exports follow the same tenant/export authorization rules as transactional data.

---

# 184. Session Replay

Session replay data MUST retain tenant access boundaries and privacy controls.

---

# 185. Exports

Exports are privileged reads with potentially large blast radius.

---

# 186. Export Tenant Context

A tenant export MUST be generated from explicit verified tenant context.

---

# 187. Export Query

Every data source feeding the export MUST use the same tenant boundary.

---

# 188. Multi-Source Export

A report combining:

```text
database
warehouse
files
search
```

must ensure every subsystem resolves the same tenant.

---

# 189. Export Manifest

Large exports SHOULD include a manifest describing:

```text
tenant
generation time
scope
data categories
format/version
```

without exposing unnecessary secrets.

---

# 190. Export File Path

Generated export storage MUST be tenant-scoped.

---

# 191. Export Download

Download authorization MUST be checked when accessing the generated file—not only when creating it.

---

# 192. Signed Export URL

Signed export links SHOULD:

```text
expire
be scoped to exact file/method
be generated after authorization
```

---

# 193. Export Expiration

Sensitive exports SHOULD expire automatically.

---

# 194. Export Audit

Sensitive/bulk exports SHOULD generate audit events.

---

# 195. Cross-Tenant Export

Only separately privileged administrative workflows may export across tenants.

---

# 196. Import

Imports MUST bind imported data to an explicitly verified target tenant.

---

# 197. Import Target

The target tenant MUST remain visible during import review/execution.

---

# 198. Imported IDs

External IDs MUST NOT cause imported records to update resources in another tenant.

---

# 199. Import Upsert

Upsert keys SHOULD include tenant identity where uniqueness is tenant-local.

---

# 200. Import File

Uploaded import files must themselves be tenant-scoped.

---

# 201. Import Dry Run

Large/high-risk imports SHOULD provide validation/dry-run before mutation.

---

# 202. API Responses

Tenant-scoped APIs MUST never return another tenant's resource because an ID happens to exist.

---

# 203. 404 vs 403

When disclosure matters, unauthorized cross-tenant object access MAY return a not-found-style result rather than confirming resource existence.

The policy should be consistent.

---

# 204. API Collections

List endpoints MUST automatically scope collections by authorized tenant context.

---

# 205. Bulk API

Bulk requests MUST verify every object belongs to the active tenant.

---

# 206. GraphQL

GraphQL resolvers MUST enforce tenant context at every relevant object/data boundary.

---

# 207. Nested Resolution

A correctly scoped parent does not guarantee every nested resolver is tenant-safe.

---

# 208. DataLoader/Batching

Batching/cache loaders MUST include tenant scope in their keys.

---

# 209. Request Memoization

Per-request memoization MUST not key tenant-owned results solely by resource ID if multiple tenant contexts can coexist.

---

# 210. Service-to-Service Calls

Tenant-scoped service calls MUST propagate trusted tenant context.

---

# 211. Service Context Integrity

Tenant metadata between services SHOULD be protected by:

```text
authenticated service identity
trusted transport/claims
signed/integrity-protected context
```

according to architecture.

---

# 212. Internal Service Does Not Bypass Tenancy

"Internal service" is not permission to access all tenants.

---

# 213. Rate Limits

Shared services SHOULD apply tenant-aware rate limits where tenant consumption can affect others.

---

# 214. Multi-Dimensional Limits

Rate control MAY combine:

```text
tenant
user
IP
endpoint
service-wide
```

dimensions.

---

# 215. Noisy Neighbor

Multi-tenant systems MUST consider noisy-neighbor effects.

---

# 216. Shared Bottlenecks

Typical shared bottlenecks include:

```text
CPU
memory
DB connections
database locks
queue workers
cache
search
provider quotas
storage IOPS
API limits
```

---

# 217. Tenant Quotas

Products SHOULD define tenant-level quotas where resource consumption has meaningful cross-tenant cost or risk.

---

# 218. Fairness

One tenant should not be able to degrade every other tenant merely by consuming an unbounded shared resource.

---

# 219. Concurrency Isolation

Use per-tenant concurrency controls for shared workloads where required.

---

# 220. Database Connection Fairness

A single tenant SHOULD NOT monopolize the database connection pool.

---

# 221. Search Fairness

Large tenant searches MAY require query limits/timeouts.

---

# 222. Export Fairness

Huge exports SHOULD run asynchronously and respect per-tenant/system capacity.

---

# 223. File Quotas

Object-storage usage SHOULD be attributable to a tenant and enforce contractual/product limits where needed.

---

# 224. Cost Attribution

Shared-resource usage SHOULD be attributable to tenants where cost allocation or billing requires it.

---

# 225. Metering

Metering records MUST carry verified tenant identity.

---

# 226. Billing

Billing account/subscription identifiers SHOULD map explicitly to the tenant/customer contract they govern.

---

# 227. Feature Flags

Tenant targeting in Feature Flags MUST use verified tenant identity.

---

# 228. Client Flag Targeting

A client-supplied tenant ID MUST NOT enable an unauthorized feature.

---

# 229. Flag ≠ Entitlement

A feature flag is not a secure tenant entitlement boundary.

Authorization/business entitlement MUST be enforced server-side.

---

# 230. Tenant Overrides

Tenant-specific flag/config overrides SHOULD record:

```text
owner
reason
expiry
```

where temporary.

---

# 231. Configuration

Tenant configuration is data—not deployment environment configuration.

---

# 232. Tenant Settings

Tenant settings MUST have explicit tenant ownership and authorization.

---

# 233. Global Defaults

A tenant setting MAY inherit a global default.

Resolved configuration SHOULD conceptually be:

```text
global default
↓
plan/tier default
↓
tenant override
```

where product semantics require.

---

# 234. Configuration Leak

Tenant configuration MUST NOT be cached globally when it differs by tenant.

---

# 235. Localization

Tenant-level:

```text
locale
timezone
currency
branding
```

MAY influence rendering.

User preference may override tenant default according to Internationalization Guidelines.

---

# 236. Tenant Branding

Brand assets are tenant-owned files/configuration and must follow the same isolation controls.

---

# 237. Custom Domains

Custom tenant domains MUST map to exactly one authorized tenant context.

---

# 238. Domain Verification

Customer-controlled domains MUST be verified before association.

---

# 239. Domain Reassignment

Custom-domain reassignment MUST prevent stale ownership from routing traffic to the wrong tenant.

---

# 240. Authentication Domain Mapping

SSO/domain discovery MUST NOT grant membership solely because a request presents a tenant domain string.

---

# 241. SSO

Tenant SSO configuration MUST itself be tenant-scoped and protected.

---

# 242. Identity Provider Mapping

An IdP configuration MUST not authenticate users into another tenant due to ambiguous issuer/domain mapping.

---

# 243. Invitations

Tenant invitations MUST be bound to an explicit tenant.

---

# 244. Invite Acceptance

Invite acceptance MUST revalidate:

```text
invite
tenant
recipient/claim
expiry
membership state
```

---

# 245. Cross-Tenant Invitation

Accepting an invite into Tenant B MUST NOT remove/change Tenant A membership unless explicitly intended.

---

# 246. Notifications

Tenant notifications MUST use data from the intended tenant only.

---

# 247. Email Context

Tenant name/branding MAY appear in email.

The sending job MUST retain verified tenant identity.

---

# 248. Recipient Membership

Delayed tenant notifications SHOULD verify recipient eligibility when stale membership could create disclosure.

---

# 249. Cross-Tenant Notification Leak

An email, SMS, or push notification containing another tenant's name/content is a tenant-isolation incident.

---

# 250. Web Push Tokens

Push tokens associated with tenant-specific preferences MUST not leak notification content across contexts.

---

# 251. Observability

Tenant identity SHOULD be available in telemetry where operationally useful and privacy-appropriate.

---

# 252. Logs

Tenant-scoped application logs SHOULD include the verified tenant ID as structured context.

---

# 253. Never Trust Logged Selector

Log the verified tenant context—not merely raw `X-Tenant-ID`.

---

# 254. Metrics Cardinality

Tenant ID may create excessive metric cardinality.

Use it only where the telemetry backend and operational need justify it.

---

# 255. Traces

Distributed traces SHOULD propagate tenant context safely when needed for debugging.

---

# 256. Trace Privacy

Do not add sensitive tenant/user data merely for trace convenience.

---

# 257. Audit Events

Tenant-scoped privileged/security events MUST identify tenant context.

---

# 258. Cross-Tenant Attempt

Denied or suspicious cross-tenant access attempts SHOULD be observable and alertable according to risk.

---

# 259. Error Monitoring

Client/server error reports SHOULD provide enough tenant context for authorized debugging without exposing tenant data to unauthorized operators/tools.

---

# 260. Tenant Health

High-scale SaaS systems MAY maintain tenant-level health indicators such as:

```text
error rate
job backlog
provider failure
quota pressure
```

---

# 261. Admin Tools

Admin & Internal Tools Guidelines govern privileged cross-tenant access.

---

# 262. Admin Tenant Context

Administrative tooling MUST show the target tenant prominently.

---

# 263. Admin Cross-Tenant Search

Cross-tenant search MUST require explicit privileged authorization.

---

# 264. Admin Mutation

A platform admin's ability to locate any tenant does not automatically grant mutation authority.

---

# 265. Impersonation

Impersonation MUST preserve:

```text
operator
effective user
tenant
```

as separate auditable contexts.

---

# 266. Impersonation Tenant Boundary

An operator impersonating a user in Tenant A MUST NOT automatically gain user access in Tenant B.

---

# 267. Tenant Support Access

Support roles MAY have customer-scoped temporary access rather than standing global access.

---

# 268. Tenant Lifecycle

Canonical lifecycle MAY include:

```text
Provisioning
Active
Suspended
Offboarding
Deleted
```

---

# 269. Tenant Provisioning

Provisioning MUST create every required isolation resource consistently.

---

# 270. Provisioning Transaction

Where creation spans multiple services, provisioning SHOULD be retryable/reconcilable.

---

# 271. Provisioning Idempotency

Repeated provisioning requests MUST NOT accidentally create conflicting tenant resources.

---

# 272. Provisioning Checklist

Provisioning MAY include:

```text
tenant record
database/schema placement
storage namespace
keys
default config
billing mapping
search namespace
feature defaults
```

depending on model.

---

# 273. Partial Provisioning

A partially provisioned tenant MUST NOT be treated as fully active.

---

# 274. Tenant Activation

Activate only after critical isolation resources are verified.

---

# 275. Tenant Suspension

Suspension semantics MUST define:

```text
user login
API access
background jobs
incoming webhooks
outgoing notifications
billing
data retention
```

---

# 276. Suspension ≠ Deletion

Suspension normally preserves tenant data.

---

# 277. Tenant Offboarding

Offboarding MUST be an explicit workflow.

---

# 278. Offboarding Scope

Tenant data may exist in:

```text
primary DB
replicas
cache
files
search
warehouse
analytics
queues
DLQs
exports
backups
third-party processors
```

---

# 279. Deletion Inventory

The organization SHOULD maintain a system inventory mapping tenant data stores and deletion behavior.

---

# 280. Tenant Deletion

Deletion follows Privacy/Data Governance retention policy.

---

# 281. Cache Cleanup

Deleted tenant cache entries SHOULD be invalidated.

---

# 282. File Cleanup

Tenant files and object versions SHOULD be deleted/retained according to policy.

---

# 283. Search Cleanup

Search documents MUST be removed according to the deletion lifecycle.

---

# 284. Analytics Cleanup

Analytics/warehouse tenant data follows documented retention/legal requirements.

---

# 285. Queued Work

Pending tenant jobs MUST be cancelled or made deletion-aware.

---

# 286. Webhooks

Offboarding SHOULD disable webhook delivery before tenant data is destroyed.

---

# 287. Export Before Offboarding

Contractual/user data export MAY precede final deletion.

---

# 288. Tenant Tombstone

A minimal tombstone MAY be retained to prevent accidental recreation/reprocessing where policy allows.

---

# 289. Identifier Reuse

Deleted tenant IDs SHOULD NOT be reused.

---

# 290. Slug Reuse

Tenant slugs/custom domains MAY be reused only after security and stale-link implications are addressed.

---

# 291. Backups

Backup architecture MUST preserve tenant isolation/confidentiality.

---

# 292. Shared Backup

A pooled database backup containing multiple tenants is a multi-tenant sensitive asset.

---

# 293. Tenant Restore

A request to restore Tenant A MUST NOT overwrite or expose Tenant B's state.

---

# 294. Logical Tenant Restore

Pooled systems SHOULD define whether per-tenant logical restore is supported.

---

# 295. Restore Isolation

Tenant-level restore from shared backup may require:

```text
isolated restoration environment
tenant extraction
validation
controlled reimport
```

rather than direct production restore.

---

# 296. Backup Access

Access to shared backups is privileged cross-tenant access.

---

# 297. Backup Deletion

Retention/deletion policy MUST state how tenant deletion interacts with immutable backups.

---

# 298. Disaster Recovery

Failover MUST preserve tenant placement and isolation mappings.

---

# 299. Region

Tenant region/residency MUST be explicit where product/compliance requires it.

---

# 300. Tenant Residency

A tenant assigned to Region A MUST NOT silently store restricted data in Region B through:

```text
cache
search
analytics
backups
logs
files
```

without approved policy.

---

# 301. Global Control Plane

Global tenant metadata MAY exist centrally.

Classify which fields are allowed outside the tenant's data region.

---

# 302. Tenant Migration

Moving a tenant between:

```text
database
shard
region
isolation tier
```

is a controlled migration.

---

# 303. Migration Correctness

Tenant migration MUST ensure:

```text
no cross-tenant copy
no missing data
no duplicate active writes
correct routing after cutover
```

---

# 304. Migration Routing

Resource placement changes MUST update the tenant resolver atomically or through safe staged cutover.

---

# 305. Migration Verification

Before completion verify:

```text
source/target counts
integrity
permissions
files
search
jobs
configuration
```

where applicable.

---

# 306. Dual Write

Dual-write migrations require explicit consistency and rollback design.

---

# 307. Sharding

Tenant ID is a natural candidate for sharding/partition placement when domain requirements permit.

---

# 308. Large Tenant

A very large tenant MAY require dedicated shard/infrastructure.

---

# 309. Tenant Movement

Do not encode physical shard identity permanently into public tenant IDs.

---

# 310. Encryption

Encryption at rest and in transit follows Security Guidelines.

---

# 311. Per-Tenant Key

Dedicated encryption keys MAY be used for:

```text
higher isolation
customer-managed keys
regulatory controls
crypto-erasure
```

---

# 312. Key Mapping

Tenant→key mapping is sensitive infrastructure metadata and must be server-controlled.

---

# 313. Key Rotation

Key rotation MUST not cross-associate data between tenants.

---

# 314. Customer-Managed Keys

If supported, loss/revocation semantics must be explicitly defined.

---

# 315. Secrets

Tenant-supplied secrets SHOULD be stored in approved secret-management systems, scoped to that tenant.

---

# 316. Secret Namespaces

One tenant MUST not be able to reference another tenant's secret identifier.

---

# 317. Data Import/Integration Credentials

Third-party integration credentials belong to a tenant unless explicitly global.

---

# 318. OAuth Connections

OAuth provider connections MUST preserve tenant ownership.

---

# 319. Callback State

OAuth callback state MUST prevent attaching Tenant A's external account to Tenant B.

---

# 320. Integration Removal

Removing a tenant integration MUST revoke/delete the correct tenant credential only.

---

# 321. Testing Strategy

Tenant isolation requires dedicated adversarial testing.

---

# 322. Two-Tenant Minimum

Automated isolation tests SHOULD use at least:

```text
Tenant A
Tenant B
```

with overlapping-looking resource data.

---

# 323. Colliding IDs

Tests SHOULD intentionally use similar/local IDs where possible to catch missing tenant scope.

Example:

```text
Tenant A user #42
Tenant B user #42
```

---

# 324. Read Isolation Test

Tenant A MUST fail to read Tenant B resources.

---

# 325. Write Isolation Test

Tenant A MUST fail to update/delete Tenant B resources.

---

# 326. Create Isolation Test

Tenant A MUST fail to create a child resource linked to Tenant B's parent.

---

# 327. List Isolation Test

Tenant A collections MUST contain no Tenant B items.

---

# 328. Count Isolation Test

Counts and pagination metadata MUST be tenant-scoped.

---

# 329. Search Isolation Test

Search results and facets MUST exclude Tenant B.

---

# 330. Cache Isolation Test

Identical cacheable request shapes across A/B MUST not leak results.

---

# 331. File Isolation Test

Tenant A MUST fail to download/sign/delete Tenant B file.

---

# 332. Queue Isolation Test

Workers MUST execute A jobs under A context and B jobs under B context even with connection/process reuse.

---

# 333. Analytics Test

Tenant-facing reports MUST exclude other tenants.

---

# 334. Export Test

Tenant A export MUST contain zero Tenant B records/files.

---

# 335. Tenant Switch Test

Switching A→B MUST clear/reload all tenant-sensitive state.

---

# 336. Multi-Tab Test

Tenant A in one tab and Tenant B in another SHOULD not corrupt tenant context.

---

# 337. Admin Test

Cross-tenant admin behavior MUST require explicit privileged paths.

---

# 338. RLS Test

Tenant runtime DB roles MUST be proven unable to bypass RLS where RLS is the isolation boundary.

---

# 339. Connection Reuse Test

Tests SHOULD detect leaked tenant DB/session context across pooled connections.

---

# 340. Property/Fuzz Testing

High-risk systems SHOULD consider generating random tenant/resource combinations and asserting cross-tenant denial.

---

# 341. Architecture Test

Static/architecture tests MAY prevent unscoped repository APIs in ordinary feature modules.

---

# 342. Migration Test

Tenant-owned table migrations SHOULD verify ownership constraints/policies.

---

# 343. Penetration Testing

Security testing SHOULD specifically include tenant-boundary attacks.

---

# 344. Threat Scenarios

Threat modeling SHOULD include:

```text
IDOR
tenant-context injection
cache poisoning
search leakage
queue-context forgery
file URL leakage
admin cross-tenant abuse
noisy neighbor
```

---

# 345. Incident Classification

Confirmed cross-tenant disclosure or unauthorized mutation MUST be treated as a security/privacy incident.

---

# 346. Incident Containment

Potential containment MAY include:

```text
disable affected feature
revoke credentials
invalidate caches
stop workers
isolate tenant/resource
```

depending on failure.

---

# 347. Incident Investigation

Investigations SHOULD determine:

```text
affected tenants
data/actions exposed
entry point
duration
logs/audit
cache/job/search propagation
```

---

# 348. Notification

Customer/regulatory notification follows Incident Response and Privacy requirements.

---

# 349. Reconciliation

After an isolation incident, downstream:

```text
search
analytics
cache
webhooks
exports
```

must also be checked for leaked propagation.

---

# 350. Multi-Tenancy Review Checklist

```text
□ Tenant ID stable
□ Tenant resolver
□ Membership verified
□ Tenant context server-controlled
□ Missing context fails closed
□ Cross-tenant paths explicit
□ Database isolation
□ Cache isolation
□ File isolation
□ Queue isolation
□ Search isolation
□ Analytics isolation
□ Export isolation
□ Quotas/noisy-neighbor controls
□ Audit/observability
□ Lifecycle/deletion
□ Tests
```

---

# 351. Tenant Resolution Checklist

```text
□ Selector identified
□ Authentication first
□ Membership/scope verified
□ Stable tenant ID produced
□ Invalid tenant fails
□ Ambiguous tenant fails
□ Public/global paths separated
□ Context available to downstream layers
```

---

# 352. Database Checklist

```text
□ Tenant-owned tables classified
□ Ownership enforceable
□ Queries tenant-scoped
□ Indexes tenant-aware
□ Tenant-local unique constraints
□ Cross-tenant FK prevented
□ RLS considered
□ Runtime role cannot bypass isolation
□ Connection pooling safe
□ Cross-tenant admin path explicit
```

---

# 353. Cache Checklist

```text
□ Global/tenant/user classification
□ Tenant in key
□ User in key where needed
□ Permission/version dimensions
□ Authorization before hit
□ Invalidation tenant-scoped
□ No global poisoning
□ Quotas where needed
```

---

# 354. File Checklist

```text
□ Tenant ownership metadata
□ Tenant-aware storage namespace
□ Server-authorized path
□ Signed URL exact scope
□ Signed URL expiry
□ Upload constrained
□ Cross-tenant read denied
□ Cross-tenant delete denied
□ Encryption model
□ Offboarding cleanup
```

---

# 355. Queue Checklist

```text
□ Job global/tenant/cross-tenant classified
□ Producer tenant verified
□ Context integrity protected
□ Consumer re-establishes tenant
□ Authorization rechecked if stale
□ Tenant in idempotency/dedupe
□ DLQ retains tenant
□ Replay safe
□ Per-tenant concurrency if needed
□ Global limits retained
```

---

# 356. Search Checklist

```text
□ Tenant attribute/index isolation
□ Query tenant filter
□ Facets tenant-scoped
□ Suggestions tenant-scoped
□ Search cache tenant-aware
□ Index jobs preserve tenant
□ Deletion/offboarding cleanup
```

---

# 357. Analytics Checklist

```text
□ Opaque tenant ID
□ Event attribution
□ Warehouse tenant ownership
□ Customer reports tenant-safe
□ Internal cross-tenant access privileged
□ Privacy rules
□ Export isolation
□ Session replay isolation
```

---

# 358. Export Checklist

```text
□ Verified tenant
□ Every source same tenant
□ Scope preview
□ File tenant-scoped
□ Download reauthorized
□ Signed link limited/expiring
□ Audit event
□ Automatic expiry
□ Cross-tenant export separately privileged
```

---

# 359. Tenant Switch Checklist

```text
□ Membership revalidated
□ Tenant ID changes explicitly
□ UI context visible
□ Query cache separated
□ Permissions refreshed
□ Flags/config refreshed
□ Forms handled
□ Selected data reset/revalidated
□ Multi-tab safe
```

---

# 360. Lifecycle Checklist

```text
□ Provisioning idempotent
□ Isolation resources created
□ Partial provisioning safe
□ Suspension semantics
□ Export option
□ Offboarding workflow
□ DB cleanup/retention
□ File cleanup
□ Search cleanup
□ Queue cleanup
□ Analytics retention
□ Backup policy
□ Audit
```

---

# 361. Definition of Done — Tenant-Scoped Feature

A tenant-owned feature is production-ready when:

```text
✓ Tenant ownership model defined
✓ Tenant resolution uses verified context
✓ Server authorization implemented
✓ Database queries tenant-scoped
✓ Caches tenant-scoped
✓ Files tenant-scoped where applicable
✓ Background jobs retain tenant
✓ Search tenant-safe where applicable
✓ Analytics attribution defined
✓ Exports tenant-safe
✓ Tenant switching tested
✓ Cross-tenant negative tests pass
✓ Observability includes safe tenant context
```

---

# 362. Definition of Done — New Tenant-Owned Table

```text
✓ Ownership classification
✓ Tenant association
✓ Tenant-aware indexes
✓ Tenant-local uniqueness
✓ Foreign-key isolation
✓ Repository/query APIs scoped
✓ RLS decision recorded
✓ Runtime DB role reviewed
✓ Cross-tenant SELECT denied
✓ Cross-tenant INSERT/UPDATE/DELETE denied
✓ Migration tests
```

---

# 363. Definition of Done — New Queue Job

```text
✓ Global/tenant scope classified
✓ Tenant from trusted producer
✓ Message context integrity
✓ Consumer re-establishes context
✓ Current authorization rechecked if necessary
✓ Idempotency scoped
✓ Retry scoped
✓ DLQ tenant-aware
✓ Fairness controls
✓ Cross-tenant tests
```

---

# 364. Definition of Done — Tenant Export

```text
✓ Exact tenant verified
✓ Source queries tenant-safe
✓ Files tenant-safe
✓ Export metadata identifies scope
✓ Generated artifact isolated
✓ Download authorization
✓ Expiry
✓ Audit
✓ Deletion/retention
```

---

# 365. Definition of Done — New Isolation Tier

```text
✓ Isolation requirement documented
✓ Resource model defined
✓ Tenant placement resolver
✓ Provisioning
✓ Migration path
✓ Backups
✓ Search/files/cache/queues considered
✓ Observability
✓ Cost/capacity
✓ Failure blast radius
✓ Tenant tests
```

---

# 366. Multi-Tenancy Anti-Patterns

Avoid:

```text
tenant_id = request.headers["X-Tenant-ID"]
```

followed by immediate trust.

Avoid:

```text
tenant = queryParam
```

without membership verification.

Avoid:

```text
authenticated
→ tenant authorized
```

as an assumption.

Avoid:

```text
UUID is hard to guess
→ secure
```

Avoid:

```text
SELECT * FROM invoice WHERE id = ?
```

for tenant-owned data when tenant context can be part of the lookup.

Avoid:

```text
fetch object
→ then compare tenant
```

as the only isolation control.

Avoid unscoped repositories available throughout application code.

Avoid:

```text
admin mode
→ tenant filtering disabled everywhere
```

Avoid tenant request DB roles with:

```text
SUPERUSER
BYPASSRLS
```

when RLS is relied upon.

Avoid session-scoped tenant DB context leaking through connection pools.

Avoid tenant ownership existing only in application memory.

Avoid tenant-local unique fields enforced globally by mistake.

Avoid cross-tenant foreign-key relationships.

Avoid:

```text
cache:user:123
```

where user 123 can exist in multiple tenants.

Avoid:

```text
cache:settings
```

for tenant configuration.

Avoid authorization being skipped because cached data exists.

Avoid:

```text
bucket/objectId
```

without tenant ownership validation.

Avoid presigned URLs generated from arbitrary client object keys.

Avoid:

```text
queue message has tenant_id
→ trusted
```

without trusted producer context.

Avoid global idempotency keys that make Tenant A suppress Tenant B's work.

Avoid DLQ replay without tenant context.

Avoid one tenant monopolizing all workers.

Avoid:

```text
search query
→ retrieve globally
→ filter tenant client-side
```

Avoid global search counts/facets leaking other tenants.

Avoid analytics dashboards using client-selected tenant ID as the authorization mechanism.

Avoid BI users manually remembering tenant filters for customer-visible output.

Avoid exports generated from one tenant-scoped DB query plus an unscoped warehouse query.

Avoid export links remaining permanent/public.

Avoid:

```text
import external_id
→ update globally matching row
```

without tenant scope.

Avoid feature flags as authorization/entitlement.

Avoid tenant config stored in global cache keys.

Avoid tenant switch that leaves previous tenant data visible.

Avoid a single global `localStorage.currentTenant` causing all tabs to change context unexpectedly.

Avoid route tenant and session tenant disagreement being silently ignored.

Avoid cross-tenant admin access hidden behind obscure URLs.

Avoid tenant deletion that only deletes the primary database row.

Avoid search/files/cache surviving tenant deletion indefinitely.

Avoid:

```text
tenant suspended
```

without defining worker/API/webhook behavior.

Avoid restoring a shared backup directly over production merely to recover one tenant.

Avoid public IDs encoding physical shard/database placement.

Avoid cross-region replication violating tenant residency requirements.

Avoid integration credentials without tenant ownership.

Avoid SSO configuration keyed only by email domain with ambiguous tenant resolution.

Avoid test suites with only one tenant.

Avoid tenant-isolation testing where all IDs are globally unique and therefore never expose missing scope.

Avoid:

```text
we use RLS
→ every subsystem is tenant-safe
```

Avoid:

```text
we use database-per-tenant
→ caches/files/queues cannot leak
```

Avoid:

```text
multi-tenancy is a database concern
```

It is an end-to-end architecture concern.

---

# 367. AI Multi-Tenancy Rules

AI coding agents MUST identify whether every new resource is:

```text
Global
Tenant-scoped
User-scoped
Cross-tenant privileged
```

before implementing storage/access.

---

# 368. AI Tenant Resolution Rule

AI MUST NOT trust client-provided tenant identifiers without server-side verification.

---

# 369. AI Context Rule

AI SHOULD establish one verified tenant context early and pass/use that trusted context throughout the request.

---

# 370. AI Query Rule

AI MUST scope tenant-owned database queries by tenant at retrieval/mutation boundaries.

---

# 371. AI Repository Rule

AI SHOULD prefer tenant-aware repository APIs.

---

# 372. AI RLS Rule

When PostgreSQL RLS is part of the design, AI MUST ensure ordinary tenant runtime roles cannot bypass RLS.

---

# 373. AI Pool Rule

AI MUST consider connection-pool tenant-context leakage when using DB session state.

---

# 374. AI Cache Rule

AI MUST include tenant identity in cache keys whenever data or authorization varies by tenant.

---

# 375. AI File Rule

AI MUST authorize exact tenant file/object ownership before generating signed URLs.

---

# 376. AI Queue Rule

AI MUST derive asynchronous tenant context from an authenticated/authorized producer path and re-establish it in the worker.

---

# 377. AI Search Rule

AI MUST enforce tenant filters server-side in search/index queries.

---

# 378. AI Analytics Rule

AI MUST distinguish tenant attribution from tenant authorization.

---

# 379. AI Export Rule

AI MUST verify every source feeding an export uses the same authorized tenant context.

---

# 380. AI Switch Rule

AI MUST invalidate or separate tenant-sensitive client/server state when the active tenant changes.

---

# 381. AI Flag Rule

AI MUST NOT treat tenant-targeted feature flags as authorization.

---

# 382. AI Cross-Tenant Rule

AI MUST make intentional cross-tenant operations explicit, separately authorized, and auditable.

---

# 383. AI Admin Rule

AI MUST preserve tenant scope during admin/impersonation operations.

---

# 384. AI Delete Rule

AI SHOULD consider:

```text
DB
cache
files
search
analytics
queues
backups
```

when implementing tenant offboarding/deletion.

---

# 385. AI Testing Rule

AI SHOULD create at least two-tenant negative tests for every tenant-owned subsystem.

---

# 386. AI Gold Rule

When uncertain:

```text
Verified tenant context
>
client-selected tenant context
```

```text
Tenant-scoped API
>
generic unscoped API
```

```text
Defense-in-depth isolation
>
application convention alone
```

```text
Explicit cross-tenant privilege
>
implicit admin bypass
```

---

# 387. Golden Multi-Tenancy Rules

**1. Tenant isolation is a security boundary.**

**2. Authentication alone does not establish tenant isolation.**

**3. Authorization is evaluated against actor, tenant, resource, and action.**

**4. Every tenant-scoped request establishes one verified tenant context.**

**5. Client-provided tenant IDs are selectors, never authorization proof.**

**6. Missing or ambiguous tenant context fails closed.**

**7. Tenant IDs are stable identities; names and slugs are presentation/routing values.**

**8. Opaque identifiers reduce enumeration but do not replace authorization.**

**9. Intentional global and cross-tenant operations are explicit.**

**10. Cross-tenant service identities receive separate least-privileged scope.**

**11. Tenant membership is modeled explicitly.**

**12. Roles may differ by tenant for the same user.**

**13. Membership changes eventually invalidate stale access.**

**14. Tenant switching is a security-context change.**

**15. The current tenant remains visible wherever acting on the wrong tenant would matter.**

**16. Tenant switching invalidates or separates tenant-sensitive state.**

**17. Multiple browser tabs can safely operate against different tenants.**

**18. Database, schema, pool, and hybrid isolation are chosen per resource according to risk and economics.**

**19. Isolation strategy may differ between subsystems.**

**20. Application semantics remain consistent across isolation tiers.**

**21. Every tenant-owned record has an enforceable path to its tenant.**

**22. Ordinary tenant data access never performs unscoped tenant-owned queries.**

**23. Tenant ownership participates in the resource lookup itself.**

**24. Tenant-local uniqueness includes tenant scope.**

**25. Database constraints prevent accidental cross-tenant relationships where practical.**

**26. Database isolation provides defense in depth rather than relying solely on developer convention.**

**27. PostgreSQL tenant request roles do not use superuser or `BYPASSRLS` when RLS is an isolation boundary.**

**28. RLS policies govern both visibility and permitted writes.**

**29. Connection pooling must not leak database tenant context between requests.**

**30. Transaction-local database tenant context is preferred over unsafe session-scoped state.**

**31. Tenant-owned RLS tables receive explicit cross-tenant tests.**

**32. Raw SQL follows the same isolation model as ORM code.**

**33. Every cached value is classified as global, tenant, or user scoped.**

**34. Tenant-sensitive cache keys include tenant identity.**

**35. Authorization is still performed when serving protected cached values.**

**36. Cache population by one tenant cannot poison another tenant's results.**

**37. Cache invalidation is scoped to the intended tenant whenever possible.**

**38. Tenant files have explicit ownership independent of storage path appearance.**

**39. Signed file URLs are generated only after authorization.**

**40. Signed URLs are limited to exact object, method, and appropriate lifetime.**

**41. Clients do not choose arbitrary tenant storage namespaces.**

**42. Shared queues are not tenant-isolation boundaries.**

**43. Every background job is explicitly global, tenant-scoped, or cross-tenant.**

**44. Job tenant context comes from a trusted producer path.**

**45. Workers re-establish tenant context before acting.**

**46. Delayed jobs re-check authorization when stale permissions could matter.**

**47. Idempotency, deduplication, and retry state include tenant scope when required.**

**48. Dead-letter queues preserve tenant identity.**

**49. Replaying failed jobs preserves the original tenant context.**

**50. Tenant workloads do not receive unbounded shared-worker capacity by default.**

**51. Search results, counts, facets, autocomplete, and recommendations are tenant-isolated.**

**52. Tenant filtering happens in the search query/service—not after results reach the client.**

**53. Search indexing and deletion jobs preserve tenant ownership.**

**54. Analytics tenant ID is attribution metadata, not authorization.**

**55. Customer-visible analytics are tenant-scoped at an enforceable boundary.**

**56. Data warehouses retain tenant ownership for tenant-level records.**

**57. Exports are privileged reads and use one consistent verified tenant scope.**

**58. Every source feeding an export is independently tenant-safe.**

**59. Generated export files remain tenant-scoped and expire according to policy.**

**60. Export download authorization is rechecked at access time.**

**61. Cross-tenant exports require separate privileged authority.**

**62. Imports bind all mutations to one explicit target tenant.**

**63. Import upserts never use tenant-local identifiers globally.**

**64. List, count, pagination, and bulk API operations remain tenant-scoped.**

**65. Nested GraphQL/data-loader caches include tenant context where required.**

**66. Service-to-service requests propagate integrity-protected tenant context.**

**67. Internal services do not receive implicit all-tenant authority.**

**68. Tenant-aware rate limits protect shared infrastructure from noisy neighbors.**

**69. Per-tenant quotas complement global resource protections.**

**70. One tenant cannot monopolize database connections, queues, search, or shared compute unchecked.**

**71. Resource usage remains attributable to tenants where metering/cost/billing requires it.**

**72. Feature flags do not replace tenant entitlement or authorization.**

**73. Tenant configuration is isolated data and uses tenant-aware caching.**

**74. Custom domains resolve through verified server-controlled tenant mappings.**

**75. Tenant SSO configuration cannot bleed into another tenant.**

**76. Invitations are explicitly tenant-bound.**

**77. Notifications and emails preserve the tenant identity that produced their content.**

**78. Delayed notifications reconsider stale membership where disclosure risk exists.**

**79. Logs use verified tenant context rather than raw request selectors.**

**80. Tenant identifiers in metrics/traces are used deliberately to control cardinality and privacy.**

**81. Security/audit events identify the relevant tenant.**

**82. Cross-tenant denial attempts are observable.**

**83. Administrative cross-tenant access uses explicit privileges and visible tenant context.**

**84. Impersonation records operator, effective user, and tenant independently.**

**85. Tenant provisioning is idempotent and validates all required isolation resources.**

**86. Partially provisioned tenants are not treated as fully active.**

**87. Suspension semantics cover APIs, users, jobs, webhooks, and background effects.**

**88. Offboarding considers every tenant data store—not only the primary database.**

**89. Tenant deletion handles caches, files, search, analytics, queued work, exports, and backup retention.**

**90. Deleted tenant IDs are not reused.**

**91. Backups containing multiple tenants are privileged cross-tenant assets.**

**92. Tenant-level recovery from pooled backups is performed without exposing or overwriting other tenants.**

**93. Data residency requirements apply to secondary stores and telemetry as well as primary databases.**

**94. Tenant migrations between shards, databases, regions, or isolation tiers preserve exact ownership and routing.**

**95. Physical resource placement is not encoded into permanent public tenant identity.**

**96. Tenant-specific encryption keys are used when the threat/compliance model justifies cryptographic isolation.**

**97. Integrations and OAuth credentials have explicit tenant ownership.**

**98. Tenant isolation tests use at least two tenants and deliberately attempt cross-tenant reads and writes.**

**99. Isolation testing includes database, cache, files, queues, search, analytics, exports, and tenant switching—not merely HTTP endpoint tests.**

**100. If any subsystem cannot state which tenant owns a value, message, object, query, cache entry, or side effect, that subsystem is not multi-tenant safe.**

---

# 388. Canonical Multi-Tenancy Standard

The organizational standard is:

> **Multi-tenancy is an end-to-end isolation architecture rather than a database filtering convention. Every tenant-owned operation executes under one server-verified tenant context derived from authenticated identity and current membership or explicit service authorization. Client-supplied tenant IDs, hostnames, route values, headers, UUIDs, or browser state select a candidate tenant but never constitute authority to access it.**

> **Tenant identity is stable and distinct from mutable names, slugs, subscriptions, regions, and user identities. Membership explicitly connects users to tenants and tenant-scoped roles, and tenant switching is treated as a security-context transition that revalidates membership, changes the active context visibly, and separates or invalidates tenant-sensitive caches, permissions, flags, forms, selections, and data views.**

> **The organization may use pooled, siloed, or hybrid isolation independently across application, database, storage, cache, search, messaging, and infrastructure layers. Each choice balances security, compliance, noisy-neighbor risk, performance, cost, service limits, and customer requirements while presenting consistent product semantics through a server-controlled tenant-resource resolver.**

> **Tenant-owned database access is scoped at the query boundary. Shared tables carry or inherit an enforceable tenant association, tenant identity participates in relevant uniqueness and relationship constraints, repository APIs make tenant context explicit, and unscoped cross-tenant queries exist only in separately privileged pathways. Where PostgreSQL Row-Level Security is used, tenant runtime roles cannot bypass it, write policies constrain tenant ownership as well as reads, database tenant context is established safely under connection pooling, and every classified tenant table receives cross-tenant denial testing.**

> **All secondary data systems preserve the same tenant contract. Cache keys include tenant and other authorization-relevant dimensions; object storage maintains tenant ownership and authorizes exact objects before issuing signed URLs; search indexes enforce tenant scope for documents, results, counts, facets, and suggestions; analytics and warehouses retain tenant attribution without confusing it with authorization; and tenant exports verify every constituent data source before producing an isolated, access-controlled, expiring artifact.**

> **Asynchronous boundaries do not weaken isolation. Every job, event, scheduled task, and message is classified as global, tenant-scoped, or explicitly cross-tenant; tenant context originates from a verified producer; consumers independently restore the tenant context and re-evaluate stale authorization where necessary; idempotency, deduplication, ordering, retry, and dead-letter handling retain tenant semantics; and shared queues and worker fleets apply fairness controls so one tenant cannot exhaust capacity for others.**

> **Tenant context propagates through APIs and services as trusted security context rather than arbitrary metadata. Credentials are bound to authorized tenants or tenant sets, internal services receive only the tenant authority they require, bulk and nested operations apply tenant authorization consistently, and intentionally cross-tenant administrative/service access is explicit, least-privileged, visible, and auditable rather than implemented by disabling tenant filtering globally.**

> **Shared-resource availability is part of tenant isolation. Database connections, cache memory, search capacity, queue depth, worker concurrency, compute, storage, downstream-provider quotas, exports, and other bottlenecks are monitored and limited at tenant and system levels when necessary so a single tenant cannot become an uncontrolled noisy neighbor. Usage remains attributable to tenant identity where quotas, billing, capacity planning, or cost allocation depend on it.**

> **Tenant lifecycle is governed from provisioning through deletion. Provisioning idempotently creates and verifies required isolation resources before activation; suspension explicitly defines user, API, worker, webhook, and notification behavior; offboarding inventories every primary and derived data store; deletion and retention propagate through database, cache, files, search, analytics, queues, exports, processors, and backups according to Privacy and Data Governance policy; and tenant identifiers are not recycled in ways that can reactivate stale references.**

> **Tenant isolation survives operational architecture. Backups containing pooled data are protected as cross-tenant assets, per-tenant restoration does not expose or overwrite unrelated tenants, residency policy applies to replicas, search, caches, files, analytics, logs, and backups as well as the primary database, and migrations between shards, databases, regions, keys, or isolation tiers verify ownership, routing, completeness, and tenant boundaries before cutover.**

> **Isolation is continuously tested rather than assumed. Test suites use at least two tenants with deliberately similar resource identifiers and attempt cross-tenant reads, writes, relationships, caches, file access, queue execution, search, analytics, exports, switching, and privileged access. Connection reuse, background processing, RLS bypass, deletion, and administrative operations receive targeted tests, and any confirmed cross-tenant disclosure or unauthorized action is handled as a security/privacy incident requiring containment and downstream reconciliation.**

A production-grade multi-tenant system should make it easy to answer:

```text
How is the tenant selected?
Who verified that selection?
Can the client forge the tenant context?
Which tenant owns this record?
Can this query run without tenant scope?
What prevents a developer from forgetting tenant scope?
Does the database independently enforce isolation?
Can the runtime DB role bypass RLS?
Can a pooled database connection retain another tenant's context?
What tenant is included in this cache key?
Can one tenant poison another tenant's cache?
Which tenant owns this file?
Who authorized this signed URL?
Where did this queue message's tenant identity come from?
Does the worker re-establish tenant authorization?
Can one tenant monopolize the worker pool?
Can Tenant A's deduplication key suppress Tenant B's work?
How is tenant scope enforced in search?
Are search counts and facets tenant-safe?
How does the warehouse identify tenant ownership?
Can a customer-facing BI report ever query multiple tenants?
Which sources feed this export?
Are all of them scoped to the same tenant?
Can a tenant switch leave old tenant data in the UI?
Can two tabs use two tenants safely?
Are feature flags being mistaken for entitlements?
Can a custom domain resolve to the wrong tenant?
How does tenant SSO remain isolated?
What happens to queued jobs when a tenant is suspended?
What data survives tenant deletion and why?
How is one tenant restored from a pooled backup?
Which systems obey the tenant's residency requirements?
Can a large tenant exhaust shared database/search/queue capacity?
How is intentional cross-tenant admin access authorized and audited?
Which automated tests prove cross-tenant denial?
```

If those questions cannot be answered reliably, the application serves multiple customers, but it does not yet have a governed multi-tenant architecture.

The current OWASP Multi-Tenant Application Security guidance maps very closely to this standard: it explicitly treats tenant IDs from headers/parameters as **selectors rather than authorization proof**, calls for tenant-aware cache keys, trusted tenant context across asynchronous work, tenant-aware file storage and signed-URL authorization, tenant-aware resource limits, and explicit cross-tenant identities instead of fabricated tenant context. citeturn430268search2

AWS likewise separates ordinary authentication/authorization from **tenant isolation** and describes silo, pool, and bridge/hybrid approaches as legitimate choices depending on the resource and risk model. Its pooled model guidance also highlights the increased blast-radius/noisy-neighbor implications of shared infrastructure. citeturn493942search11turn493942search2turn493942search0 Microsoft frames isolation similarly as a spectrum rather than a single all-or-nothing architecture. citeturn430268search9

For PostgreSQL specifically, current documentation confirms that RLS policies can separately govern row visibility and rows permitted for `INSERT`/`UPDATE`; enabled RLS with no applicable policy is default-deny. It also warns that superusers and `BYPASSRLS` roles bypass row security, while table owners normally do unless `FORCE ROW LEVEL SECURITY` is enabled. Those details are why the standard treats runtime database roles and connection-pool tenant context as part of the isolation boundary rather than implementation trivia. citeturn430268search3turn430268search6

Canonical master placement:

**… → Security → Authentication & Authorization → Admin & Internal Tools → Multi-Tenancy → Data & Database → API → Routes → State Management → …**
