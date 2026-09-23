---
id: "caching"
title: "Caching Guidelines — Gold Standard 2026"
domain: "data"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["data", "caching"]
applies_to: ["general"]
related: []
legacy_number: 32
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 67805
provenance: baseline

---

Below is the canonical **Caching Guidelines — Gold Standard 2026**. It treats caching as a consistency/performance mechanism rather than a source-of-truth system, and makes cache keys, tenant isolation, invalidation, and stale behavior explicit engineering contracts.

# Caching Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- browser caching;
- HTTP caching;
- CDN caching;
- edge caching;
- reverse-proxy caching;
- server/application caching;
- request memoization;
- Redis/distributed caches;
- database caching;
- database buffer caches;
- query-result caching;
- materialized projections;
- cache keys;
- tenant isolation;
- TTL;
- freshness;
- expiration;
- invalidation;
- revalidation;
- stale-while-revalidate;
- stale-if-error;
- negative caching;
- cache stampedes;
- cache warming;
- eviction;
- consistency;
- cache observability;
- cache failure;
- cache security;
- cache migrations.

The objective is to make caching:

```text
Correct
Fast
Bounded
Tenant-safe
Observable
Invalidatable
Recoverable
Simple enough to reason about
```

The core principle is:

> **A cache is a disposable copy or projection of authoritative state. It may improve latency, availability, and cost, but it must never silently redefine correctness.**

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
Cache layer
Consistency impact
Security impact
Failure behavior
Owner
Review date
```

---

# 3. Cache Hierarchy

A typical application may contain:

```text
Browser
↓
CDN / Edge
↓
Reverse proxy
↓
Application memory
↓
Distributed cache / Redis
↓
Database buffer cache
↓
Authoritative database/storage
```

Not every application needs every layer.

---

# 4. Caching Is Not Free

Each cache introduces:

```text
Staleness
Invalidation complexity
Memory/storage cost
Observability requirements
Security considerations
Failure modes
```

A cache SHOULD be introduced only when its benefit is measurable or strongly justified.

---

# 5. Cache Necessity Test

Before adding a cache ask:

```text
What is slow?
What is expensive?
How often is it requested?
How often does it change?
How stale may it be?
How will it be invalidated?
What happens on cache failure?
```

If those questions cannot be answered, caching is premature.

---

# 6. Measure Before Caching

Prefer evidence from:

```text
latency
query profile
CPU
network
provider cost
database load
repeat access patterns
```

before creating application-level caches.

---

# 7. Fix Root Causes First

Do not use caching to hide:

```text
missing indexes
N+1 queries
unbounded queries
poor algorithms
unnecessary API calls
bad architecture
```

when those problems should be fixed directly.

---

# 8. Source of Truth

Every cached value MUST have an authoritative source.

Examples:

```text
PostgreSQL row
Object storage object
External API
Domain computation
Configuration service
```

---

# 9. Cache Is Disposable

Ordinary caches SHOULD be safe to:

```text
flush
evict
lose
rebuild
```

without destroying authoritative business state.

---

# 10. Cache Failure Principle

For ordinary caches:

> **Cache loss should usually reduce performance, not corrupt business correctness.**

---

# 11. Durable Cache Exception

If a system uses Redis or another cache-like technology as authoritative durable storage, it MUST be governed as a datastore—not merely as a cache.

---

# 12. Cache Classification

Every cache SHOULD be classified as one of:

```text
Request-local memoization
Process-local cache
Browser cache
Shared HTTP/CDN cache
Distributed application cache
Database-managed cache
Derived/materialized projection
```

---

# 13. Freshness Contract

Every important cache SHOULD define:

```text
Maximum acceptable staleness
Refresh mechanism
Invalidation mechanism
Failure fallback
```

---

# 14. Strong Correctness Data

Data requiring current authoritative correctness SHOULD NOT rely on stale cache values.

Examples may include:

```text
authorization
account balance
inventory reservation
payment status
security configuration
```

unless a formally designed consistency model permits it.

---

# 15. Cache-Controlled UX vs Security

Caches MAY control display performance.

They MUST NOT weaken security boundaries.

---

# 16. Authentication State

Authentication validity SHOULD be determined through the authoritative session/token model.

Do not rely solely on long-lived cached client state.

---

# 17. Authorization Data

Permission caching MAY be used carefully, but server authorization remains authoritative.

---

# 18. Permission Revocation

If permission revocation must take effect quickly, cache freshness/invalidation MUST meet that requirement.

---

# 19. Tenant Isolation

Tenant identity MUST be part of any cache key whose result differs by tenant.

---

# 20. Tenant Cache Rule

Never use:

```text
user:123
```

for tenant-scoped data if user ID `123` may exist in multiple tenants.

Prefer:

```text
tenant:t_456:user:123
```

---

# 21. Cache Boundary Is Security Boundary

A cache serving one tenant's data to another tenant is a data-isolation vulnerability.

Cache key correctness is therefore security-sensitive.

---

# 22. Cache-Key Principle

A cache key MUST encode every dimension that can materially change the cached result.

---

# 23. Common Key Dimensions

Depending on semantics:

```text
tenant
resource ID
user
locale
currency
role/permission scope
query/filter
sort
pagination
feature version
schema version
```

may belong in the key.

---

# 24. Cache-Key Formula

Conceptually:

```text
cache_key =
namespace
+ version
+ tenant
+ resource
+ variant
+ query dimensions
```

---

# 25. Example

Good:

```text
v3:tenant:t_42:project:p_89:summary:locale:en
```

Poor:

```text
project-summary
```

---

# 26. Stable Key Format

Cache key formats SHOULD be:

```text
deterministic
documented
parseable
bounded in size
```

---

# 27. Cache Key Namespaces

Use namespaces to prevent collisions.

Example:

```text
user:
project:
billing:
permissions:
```

---

# 28. Versioned Keys

Cache key versioning MAY simplify major cache schema changes.

Example:

```text
v1:project:...
→
v2:project:...
```

---

# 29. Namespace Versioning

Versioning allows old entries to age out naturally without dangerous bulk deletion.

---

# 30. Key Version Bump

Do not increment cache versions casually.

A version bump temporarily reduces hit rate and may create backend load spikes.

---

# 31. Hashing Large Inputs

Large query/filter structures MAY be normalized and hashed into a bounded cache-key component.

---

# 32. Canonical Serialization

When hashing structured inputs:

```text
field ordering
normalization
default values
encoding
```

MUST be deterministic.

---

# 33. Sensitive Data in Keys

Cache keys SHOULD NOT contain:

```text
passwords
access tokens
full PII
secrets
```

---

# 34. PII in Operational Metadata

Remember that cache keys often appear in:

```text
logs
metrics
admin tools
monitoring
```

Minimize sensitive values.

---

# 35. User IDs in Keys

Opaque internal identifiers are generally preferable to emails or names.

---

# 36. Query Parameter Normalization

Equivalent queries SHOULD map to the same cache key when semantics are identical.

Example:

```text
?a=1&b=2
```

and:

```text
?b=2&a=1
```

may need canonicalization.

---

# 37. Irrelevant Parameters

Tracking parameters SHOULD NOT fragment cache keys when they do not alter content.

Examples:

```text
utm_source
utm_campaign
```

where safe.

---

# 38. Content-Changing Parameters

Parameters that affect output MUST remain in the key.

---

# 39. Authorization Dimension

If response content differs according to authorization scope, either:

```text
do not shared-cache it
```

or:

```text
include a safe authorization-derived cache dimension
```

under a deliberate design.

---

# 40. Avoid Raw Permission Sets in Keys

Do not create enormous cache keys from raw permission objects.

Use stable permission/entitlement versions or avoid caching the response.

---

# 41. Cache Cardinality

A cache key design MUST consider cardinality.

---

# 42. High-Cardinality Cache

Examples:

```text
every arbitrary search string
every user × every filter
every timestamp
```

can create unbounded cache growth.

---

# 43. Cardinality Budget

Caches SHOULD have bounded:

```text
entry count
memory
key cardinality
```

through TTL, eviction, admission policy, or architecture.

---

# 44. Cache Admission

Not every computed result must be cached.

Cache high-value results with realistic reuse probability.

---

# 45. One-Hit Cache Pollution

Caching values requested only once can consume memory without improving hit rate.

---

# 46. Hot Data

Cache candidates are strongest when data is:

```text
frequently read
expensive to compute/fetch
relatively stable
```

---

# 47. Browser Caching

Browser caching SHOULD use standard HTTP semantics where applicable.

---

# 48. Browser Cache Ownership

Browser caches are outside direct server control after a response is delivered.

Headers therefore form a contract.

---

# 49. Cache-Control

HTTP responses SHOULD use explicit `Cache-Control` appropriate to content.

---

# 50. `max-age`

`max-age` defines how long a response remains fresh for applicable caches.

---

# 51. `s-maxage`

`s-maxage` MAY define a different freshness lifetime for shared caches such as CDNs.

---

# 52. `private`

Use:

```text
Cache-Control: private
```

when a response may be cached by a user agent but MUST NOT be reused by shared caches.

---

# 53. `public`

`public` MAY explicitly permit shared caching where semantics are safe.

---

# 54. `no-store`

Use:

```text
Cache-Control: no-store
```

when the response should not be stored by caches.

---

# 55. `no-cache`

`no-cache` does NOT mean:

```text
do not store
```

It means the cached response must be successfully validated before reuse.

---

# 56. `no-store` vs `no-cache`

These directives MUST NOT be treated as interchangeable.

---

# 57. `must-revalidate`

Use `must-revalidate` when serving stale content after expiry could cause incorrect behavior.

---

# 58. Validator

HTTP resources SHOULD use validators where revalidation provides value.

Examples:

```text
ETag
Last-Modified
```

---

# 59. Conditional Request

Clients/caches MAY revalidate using:

```text
If-None-Match
If-Modified-Since
```

---

# 60. `304 Not Modified`

A successful conditional validation MAY return:

```text
304 Not Modified
```

without retransmitting the full representation.

---

# 61. ETag

ETags SHOULD change when the representation's meaningful cached content changes.

---

# 62. Strong vs Weak ETag

Choose strong or weak validators according to HTTP semantics.

Do not invent arbitrary ETag behavior without understanding representation equivalence.

---

# 63. Fingerprinted Assets

Static immutable assets SHOULD use content-based filenames.

Example:

```text
app.8af31c.js
```

---

# 64. Immutable Asset Caching

Fingerprinted static assets MAY use very long cache lifetimes because content changes create a new URL.

Example:

```text
Cache-Control: public, max-age=31536000, immutable
```

where appropriate.

---

# 65. Never Long-Cache Mutable Asset URLs Blindly

Bad:

```text
/app.js
Cache-Control: max-age=31536000
```

if `/app.js` content changes in place.

---

# 66. HTML Caching

Application HTML usually requires more conservative caching than fingerprinted static assets.

---

# 67. Dynamic HTML

Dynamic HTML SHOULD use explicit freshness/revalidation semantics according to product needs.

---

# 68. Personalized HTML

User-personalized HTML MUST NOT be publicly shared-cached without a proven safe cache partitioning model.

---

# 69. Authenticated Response

The default for user-specific authenticated responses SHOULD be conservative:

```text
private
no-store
or explicitly partitioned caching
```

according to sensitivity.

---

# 70. Browser Back/Forward Cache

Browser navigation caches such as bfcache are distinct from ordinary HTTP response caching.

Applications SHOULD test critical authentication/session behavior accordingly.

---

# 71. CDN

CDNs SHOULD cache content only when:

```text
reuse is likely
privacy is safe
freshness semantics are known
```

---

# 72. CDN Cache Key

The CDN cache key MUST include every request dimension that changes the response.

---

# 73. CDN Host

Host/domain normally participates in cache isolation.

Custom CDN configuration MUST NOT accidentally merge unrelated origins.

---

# 74. CDN Query String

CDN query-string key behavior MUST be explicitly configured.

---

# 75. CDN Headers

Only headers that legitimately alter representation SHOULD fragment the CDN key.

---

# 76. `Vary`

HTTP `Vary` SHOULD identify request-header dimensions that alter cacheable responses.

---

# 77. Example `Vary`

```text
Vary: Accept-Encoding
```

is common where representation encoding differs.

---

# 78. Locale Variation

Localized responses MAY vary by:

```text
URL
locale parameter
cookie
Accept-Language
```

but the caching strategy MUST remain deterministic.

---

# 79. `Vary: *`

Avoid designs resulting in:

```text
Vary: *
```

for cacheable performance-critical content because it effectively prevents ordinary reuse.

---

# 80. Cookie Fragmentation

Using the entire cookie header as a cache-key dimension can destroy CDN hit rates.

Prefer explicit relevant dimensions.

---

# 81. Authorization Header

Shared caching of requests involving authorization requires deliberate standards-compliant design.

Default to avoiding shared caching of sensitive authenticated data.

---

# 82. CDN Origin Shield

Origin shielding MAY reduce repeated origin requests across many edge locations.

---

# 83. CDN Stale Content

CDNs MAY serve controlled stale content when product semantics permit it.

---

# 84. CDN Purge

Purge/invalidation APIs SHOULD be used selectively.

---

# 85. Purge Everything

Avoid:

```text
purge /*
```

for routine updates.

It can cause massive origin traffic.

---

# 86. Versioned Static Assets

Prefer URL versioning/fingerprinting over CDN purge for immutable assets.

---

# 87. CDN Invalidation Delay

Understand that purge propagation may not be instantaneous.

---

# 88. Origin Protection

Caching SHOULD reduce load on the origin, not make the origin vulnerable to synchronized cache misses.

---

# 89. Server Cache

Server-side caches MAY hold:

```text
database results
external API results
expensive calculations
configuration
rendered fragments
```

---

# 90. Process-Local Cache

A process-local cache is:

```text
fast
simple
non-shared
```

but each application instance has an independent view.

---

# 91. Process-Local Consistency

Do not assume invalidating one process invalidates every other process.

---

# 92. Local Cache Best Use

Good candidates include:

```text
immutable metadata
compiled templates
stable configuration
small lookup tables
```

where per-process divergence is acceptable.

---

# 93. Instance Churn

Process-local cache warming must account for:

```text
deployments
autoscaling
serverless cold starts
```

---

# 94. Distributed Cache

Use a distributed cache when multiple application instances benefit from shared cached state.

---

# 95. Distributed Cache Cost

A distributed cache adds:

```text
network hop
serialization
operational service
failure mode
```

Do not use it when process-local or request-local caching is sufficient.

---

# 96. Redis

Redis MAY be used as a distributed cache when its operational characteristics fit the workload.

---

# 97. Redis Is Not Mandatory

Do not introduce Redis merely because:

```text
we need caching
```

Many workloads are adequately served by:

```text
HTTP cache
CDN
framework cache
database buffer cache
```

---

# 98. Redis Cache-Aside

A common pattern is:

```text
read cache
↓ hit
return

miss
↓
read source
↓
write cache
↓
return
```

This is cache-aside.

---

# 99. Cache-Aside Advantage

Cache-aside is simple and keeps the authoritative datastore explicit.

---

# 100. Cache-Aside Race

Concurrent cache misses may all query the backend simultaneously.

This requires stampede consideration.

---

# 101. Write-Through Cache

Write-through writes authoritative state and cache together through one abstraction.

It MAY simplify read freshness but introduces dual-write complexity.

---

# 102. Write-Behind Cache

Write-behind delays authoritative persistence after cache writes.

It introduces substantial durability/consistency risk.

It SHOULD NOT be the default for business-critical data.

---

# 103. Cache as Primary Write Target

If losing Redis loses acknowledged business writes:

```text
Redis is not merely acting as a cache
```

and datastore durability standards apply.

---

# 104. Redis TTL

Cache entries SHOULD generally have TTLs unless explicit invalidation plus memory management provides a better bounded lifecycle.

---

# 105. Redis Expiration

Expiration controls freshness/lifetime.

Eviction controls memory-pressure behavior.

These are different concepts.

---

# 106. TTL ≠ Eviction

A key may expire because its TTL elapsed even with plenty of memory.

A key may be evicted before TTL because memory is exhausted.

---

# 107. Redis Memory Limit

A Redis cache SHOULD have deliberate memory limits.

---

# 108. Eviction Policy

Redis eviction policy MUST match the workload.

Potential policies include:

```text
LRU-style
LFU-style
TTL-oriented
random
no eviction
```

depending on platform configuration.

---

# 109. Cache Workload Eviction

For pure cache workloads, eviction is generally acceptable because entries can be reconstructed.

---

# 110. Persistent + Cache Data

Do not casually mix:

```text
evictable cache data
```

and:

```text
must-never-be-evicted durable data
```

in the same Redis instance.

---

# 111. Separate Concerns

Where practical, separate Redis workloads for:

```text
cache
sessions
queues
durable coordination
```

when their durability/eviction/security requirements differ.

---

# 112. Redis Key Size

Keys SHOULD remain reasonably short while preserving uniqueness and diagnosability.

---

# 113. Redis Value Size

Avoid caching enormous values that:

```text
block network
increase memory pressure
slow serialization
```

without measured benefit.

---

# 114. Serialization

Cached values SHOULD use a stable serialization format.

---

# 115. Internal Serialization Version

Values requiring incompatible schema evolution SHOULD include a cache schema version or versioned key namespace.

---

# 116. Compression

Large cache values MAY be compressed when:

```text
CPU cost
network savings
memory savings
```

justify it.

---

# 117. Database Cache

Databases already use internal caches such as:

```text
buffer pools
page cache
plan cache
```

Do not add Redis solely because repeated database reads are observed.

---

# 118. Database Buffer Cache

Frequently accessed database pages may already remain in memory.

Measure actual database latency before adding application caches.

---

# 119. Database Query Result Cache

Application-level query-result caching MAY help expensive repetitive queries.

It requires proper keying and invalidation.

---

# 120. Query Cache Key

Query-result cache keys MUST include all query semantics.

Examples:

```text
tenant
filters
sort
pagination
authorization scope
locale
```

---

# 121. Raw SQL as Cache Key

Using raw SQL text directly as the only cache key is often fragile.

Prefer a semantic normalized cache key.

---

# 122. Materialized View

A database materialized view is a derived persisted projection.

It is not exactly the same as an ordinary ephemeral cache.

---

# 123. Materialized Projection

Materialized projections require:

```text
refresh semantics
staleness policy
ownership
```

---

# 124. Read Replica

A read replica is not a cache.

It is a replicated datastore with consistency/lag semantics.

---

# 125. Database Connection Cache

Connection pooling is resource reuse, not data caching.

Keep terminology precise.

---

# 126. Request Memoization

Request memoization deduplicates repeated work within one request/render/execution context.

---

# 127. Request Cache Scope

Request-local memoization MUST NOT accidentally persist across unrelated users/requests.

---

# 128. Request Memoization Example

If one render calls:

```text
getProject("p_123")
```

three times, request memoization may perform one underlying fetch.

---

# 129. Request Memoization Freshness

Because scope is one request/execution, long TTL semantics usually do not apply.

---

# 130. Request Memoization Lifetime

The lifecycle MUST be explicit:

```text
one HTTP request
one server render
one transaction
one worker execution
```

---

# 131. Global Memoization Danger

A utility named:

```text
memoize()
```

MUST NOT silently become an unbounded process-global cache unless intentionally designed.

---

# 132. Memoized Error

Determine whether errors/rejections are cached within the memoization scope.

Unexpected error memoization can prevent legitimate retry.

---

# 133. Mutation Within Request

If the request mutates data after a memoized read, subsequent reads may become stale.

The application MUST understand this behavior.

---

# 134. TTL

TTL defines how long cached data may remain available/fresh before expiry or required refresh.

---

# 135. TTL Is Domain-Specific

There is no universal correct TTL.

---

# 136. TTL Decision

TTL SHOULD consider:

```text
change frequency
maximum acceptable staleness
backend cost
traffic
invalidation reliability
security sensitivity
```

---

# 137. Example TTL Classes

Conceptually:

```text
Seconds
→ highly dynamic data

Minutes
→ moderately changing data

Hours
→ stable reference data

Days/year
→ immutable versioned assets
```

These are heuristics, not rules.

---

# 138. TTL Is Not Invalidation

Expiration says:

> Eventually stop using this entry.

Invalidation says:

> This entry is known to be outdated now.

---

# 139. TTL Safety Net

Even when explicit invalidation exists, a TTL SHOULD often remain as a fallback against missed invalidation.

---

# 140. Infinite TTL

Infinite caching requires strong proof of immutability or reliable explicit versioning.

---

# 141. Immutable Data

Immutable content addressed by immutable identity can safely use very long TTLs.

---

# 142. Mutable Data

Mutable records SHOULD NOT use effectively infinite TTL without guaranteed invalidation.

---

# 143. TTL Jitter

Caches with many entries created simultaneously SHOULD consider TTL jitter.

Example:

```text
base TTL = 10 min
actual TTL = 9–11 min
```

---

# 144. TTL Jitter Purpose

Jitter prevents thousands of entries expiring simultaneously and overwhelming the backend.

---

# 145. TTL Consistency

Do not add large TTL randomness when product semantics require a strict maximum age.

---

# 146. Soft TTL

A soft TTL MAY define when background refresh begins.

---

# 147. Hard TTL

A hard TTL defines when the value must no longer be served.

---

# 148. Two-Window Cache

A useful model:

```text
fresh window
↓
stale-but-servable window
↓
expired/unusable
```

---

# 149. Stale-While-Revalidate

SWR allows a stale value to be served temporarily while refresh occurs asynchronously.

---

# 150. SWR Objective

SWR trades bounded freshness for lower latency and reduced synchronized refresh.

---

# 151. SWR Suitability

Good candidates include:

```text
public content
catalog pages
noncritical dashboards
configuration that tolerates brief staleness
```

---

# 152. SWR Unsuitable Data

Avoid stale serving for data where old values may create incorrect or dangerous actions.

Examples:

```text
permission revocation
available account balance
current inventory reservation
one-time security state
```

---

# 153. SWR Windows

Define:

```text
fresh TTL
stale revalidation window
absolute maximum staleness
```

---

# 154. Revalidation Ownership

Only one/few workers SHOULD ideally refresh a hot stale item at once.

---

# 155. Stale-If-Error

A cache MAY serve stale content during backend errors when availability is preferable to freshness.

---

# 156. Stale-If-Error Suitability

Examples:

```text
public documentation
product catalog metadata
marketing content
```

---

# 157. Stale-If-Error Risk

Do not use stale-if-error for business operations requiring current authoritative state.

---

# 158. Maximum Stale Age

Stale-if-error MUST have a bounded acceptable stale period.

---

# 159. Error Masking

Stale serving MUST NOT hide origin failures from observability.

---

# 160. Invalidation

Cache invalidation is the mechanism for marking cached data unusable after authoritative state changes.

---

# 161. Invalidation Strategies

Common strategies include:

```text
TTL only
Delete exact key
Delete related keys
Tag-based invalidation
Namespace/version bump
Event-driven invalidation
Write-through update
```

---

# 162. TTL-Only Invalidation

TTL-only is appropriate when bounded staleness is acceptable.

---

# 163. Explicit Invalidation

Use explicit invalidation when changes must propagate faster than the TTL.

---

# 164. Invalidate After Commit

Invalidate/update caches only after the authoritative transaction successfully commits.

---

# 165. Invalidate Before Commit Risk

Bad:

```text
delete cache
↓
DB update fails
↓
cache repopulates old value
```

may create unnecessary inconsistency/churn.

---

# 166. Post-Commit Failure

If:

```text
DB commit succeeds
↓
cache invalidation fails
```

the cache can remain stale.

Architecture MUST tolerate this.

---

# 167. Invalidation Reliability

Critical invalidation MAY require:

```text
outbox
event
retry
short fallback TTL
```

---

# 168. Database Transaction + Cache

Ordinary Redis operations are not part of the database transaction.

Do not pretend they are atomic.

---

# 169. Cache-Aside Write Pattern

Typical safe sequence:

```text
commit authoritative write
↓
invalidate cached value
```

---

# 170. Update vs Delete

Deleting the cache entry is often safer than attempting to update multiple cached representations correctly.

---

# 171. Delete-on-Write

A simple default:

```text
write DB
↓
delete affected cache keys
↓
next read repopulates
```

---

# 172. Cache Update

Directly updating cache after a write MAY reduce misses but creates more coordination logic.

Use when justified.

---

# 173. Related Caches

One authoritative mutation may invalidate:

```text
detail
list
count
summary
search
aggregate
```

caches.

---

# 174. Invalidation Map

Complex domains SHOULD document which mutations affect which cache namespaces/tags.

---

# 175. Manual Invalidation Explosion

If every mutation must manually delete dozens of keys, the cache architecture may be too complex.

---

# 176. Tag-Based Invalidation

Caches MAY associate entries with tags such as:

```text
project:p_42
tenant:t_8
catalog
```

to invalidate groups.

---

# 177. Tag Cardinality

Tag-based systems must control metadata/cardinality overhead.

---

# 178. Namespace Invalidation

Versioning a namespace can invalidate an entire cache family without scanning/delete operations.

---

# 179. Namespace Bump Cost

A namespace bump creates an immediate cold cache.

Plan backend capacity.

---

# 180. Event-Driven Invalidation

Domain/change events MAY invalidate distributed caches across services.

---

# 181. Event Delivery

Invalidation event consumers MUST tolerate:

```text
duplicate
late
out-of-order
missing-until-retry
```

events.

---

# 182. Invalidation Event Failure

A fallback TTL SHOULD generally bound staleness if an invalidation event is missed.

---

# 183. Cross-Service Cache

A service SHOULD NOT reach into another service's private cache directly.

---

# 184. Cache Ownership Boundary

Each service owns its cache semantics.

Cross-service updates occur through:

```text
API
event
contract
```

not direct cache mutation.

---

# 185. Cache Stampede

A cache stampede occurs when many requests simultaneously miss/expire and all recompute the same expensive value.

---

# 186. Stampede Example

```text
popular key expires
↓
10,000 requests miss
↓
10,000 DB queries
```

---

# 187. Stampede Controls

Possible controls:

```text
single-flight/request collapsing
distributed lock
SWR
TTL jitter
early refresh
background refresh
```

---

# 188. Single-Flight

Single-flight allows one computation to populate a key while concurrent callers wait/share the result.

---

# 189. Single-Flight Scope

Process-local single-flight only coordinates one process.

Distributed caches MAY require distributed coordination for globally hot keys.

---

# 190. Distributed Lock

A distributed lock MAY protect expensive regeneration.

It MUST have:

```text
bounded lease
owner identity
failure behavior
```

---

# 191. Lock Failure

If refresh lock holder dies, other requests must eventually recover.

---

# 192. Stale While Refreshing

Serving bounded stale content while one worker refreshes is often preferable to blocking every caller.

---

# 193. Probabilistic Early Refresh

Hot keys MAY refresh before expiry probabilistically to avoid synchronized misses.

---

# 194. Cold Start

After:

```text
deploy
cache flush
region startup
major invalidation
```

the system may experience cold-cache load.

---

# 195. Backend Must Survive Cache Misses

A cache SHOULD NOT be the only thing preventing immediate backend collapse.

---

# 196. Cache Warming

Prewarming MAY be used for predictable hot datasets.

---

# 197. Warm Selectively

Do not prefill millions of low-value entries merely because they might be requested.

---

# 198. Deployment Warming

Deployments SHOULD avoid having every new instance simultaneously warm identical expensive local caches.

---

# 199. Cache Penetration

Repeated requests for nonexistent data can continually miss the cache and hit the backend.

---

# 200. Negative Caching

Caching:

```text
not found
empty result
```

for a short duration MAY reduce repeated expensive misses.

---

# 201. Negative Cache TTL

Negative entries SHOULD usually have shorter TTL than positive entries when resources may soon be created.

---

# 202. Authorization and Negative Cache

Do not cache:

```text
not authorized
```

under an insufficiently scoped key.

User A's denial must not become User B's result.

---

# 203. Temporary Error Negative Cache

Do not accidentally cache transient:

```text
500
timeout
dependency failure
```

as a long-lived valid result.

---

# 204. HTTP Error Caching

HTTP error status caching MUST be explicit and semantically justified.

---

# 205. Cache Poisoning

A cache poisoning vulnerability causes malicious or incorrect input to populate a cached response that later affects other requests.

---

# 206. Cache Poisoning Defense

Cache keys MUST include all attacker-controlled request dimensions that legitimately affect the response, or those inputs MUST be normalized/rejected.

---

# 207. Unkeyed Input

Any input that changes response content but does not participate in the cache key is a cache-poisoning risk.

---

# 208. Host Header

Do not generate cached absolute content from untrusted Host-like headers without validation.

---

# 209. Forwarded Headers

Proxy-derived headers used in cached output MUST come from trusted infrastructure and correct normalization.

---

# 210. Cache Deception

Sensitive dynamic content SHOULD NOT become cacheable simply because a crafted URL resembles a static asset.

---

# 211. Private Data

Shared caches MUST NOT store/replay private responses without deliberate isolation.

---

# 212. Cache Encryption

Sensitive distributed caches SHOULD use encryption in transit and appropriate storage encryption.

---

# 213. Redis Network Exposure

Redis SHOULD NOT be directly public internet infrastructure for ordinary application caches.

---

# 214. Redis Authentication

Distributed cache access MUST use approved authentication/identity controls.

---

# 215. Least Privilege

Application identities SHOULD receive only required cache access.

---

# 216. Separate Environments

Production, staging, and development MUST NOT accidentally share cache namespaces or instances in ways that expose production data.

---

# 217. Environment Prefix

Keys SHOULD include environment scope where infrastructure is shared.

Stronger infrastructure isolation is preferable for production.

---

# 218. Tenant Cache Test

Testing MUST include attempts to retrieve:

```text
tenant A cached result
```

through:

```text
tenant B request
```

for critical multi-tenant cache paths.

---

# 219. User-Level Cache

User-scoped cached data MUST include a stable user/security scope.

---

# 220. Anonymous-to-Authenticated Transition

A cache created for anonymous content MUST NOT incorrectly survive into authenticated personalized behavior.

---

# 221. Permission Change

Caching authorization-derived UI MAY lag server permissions, but protected server actions MUST immediately enforce current authorization according to policy.

---

# 222. Cache Consistency Models

Caches SHOULD explicitly choose one of:

```text
Strong-ish invalidation
Bounded staleness
Eventual consistency
Immutable
Request-local only
```

---

# 223. Do Not Claim Strong Consistency Casually

A distributed cache updated separately from its source generally does not provide true transactional strong consistency.

---

# 224. Read-Your-Write

If users must immediately see their own mutation, the system SHOULD provide a read-your-write strategy.

---

# 225. Read-Your-Write Strategies

Options include:

```text
invalidate immediately
update cache
bypass cache temporarily
return mutation result directly
version-aware read
```

---

# 226. Cache Bypass

A caller MAY bypass cache for:

```text
freshness-critical request
post-write verification
operator debugging
```

under controlled conditions.

---

# 227. Bypass Is Not Normal Architecture

Do not create widespread:

```text
?nocache=true
```

public behavior without authorization/control.

---

# 228. Debug Bypass

Internal cache bypass tools MUST NOT expose private backend behavior to unauthorized users.

---

# 229. Cache Coherence Across Layers

Multi-layer caching requires coordinated freshness.

Example:

```text
browser TTL = 1h
CDN TTL = 5m
Redis TTL = 30s
```

may make CDN/Redis invalidation irrelevant to a browser holding a one-hour copy.

---

# 230. Outer Layer Dominates

The longest uncontrolled outer cache may define effective staleness.

---

# 231. Multi-Layer Freshness

Document:

```text
Browser
CDN
Server
Redis
```

freshness together for important content.

---

# 232. Double Caching

Do not add Redis behind CDN if CDN already solves the relevant workload and Redis provides little additional benefit.

---

# 233. Layer Purpose

Each cache layer SHOULD have a distinct reason:

```text
browser → avoid network
CDN → avoid origin/network distance
server memory → avoid repeated local work
Redis → share expensive results
DB buffer → avoid disk
```

---

# 234. Cache Failure

Cache infrastructure SHOULD fail predictably.

---

# 235. Redis Outage

For ordinary read cache:

```text
cache unavailable
↓
fallback to source
```

may be appropriate.

---

# 236. Backend Protection During Cache Outage

Fallback MUST NOT overload the database uncontrollably.

Possible controls:

```text
rate limiting
circuit breaker
load shedding
request coalescing
```

---

# 237. Cache Dependency

A cache intended only as optimization SHOULD NOT become an accidental hard dependency without explicit decision.

---

# 238. Fail Open vs Fail Closed

For ordinary performance caches:

```text
miss/failure → source
```

is common.

For security-sensitive cached decisions, failure semantics require separate analysis.

---

# 239. Cache Timeout

Cache calls MUST have bounded timeouts.

---

# 240. Slow Cache

A cache slower than the source is counterproductive.

---

# 241. Cache Circuit Breaker

Repeated distributed-cache failure MAY justify temporarily bypassing the cache to avoid adding timeout latency to every request.

---

# 242. Recovery

After cache recovery, traffic SHOULD return gradually if refill load could create a stampede.

---

# 243. Redis Persistence

For disposable cache-only Redis, persistence MAY be unnecessary.

---

# 244. Persistence Decision

Do not enable Redis persistence automatically for cache-only workloads if recovery from source is acceptable.

Conversely, do not disable it if Redis contains authoritative state.

---

# 245. Redis Replication

Cache replication may improve availability.

It does not convert cached values into authoritative data.

---

# 246. Redis Cluster

Clustering SHOULD be justified by:

```text
capacity
availability
throughput
```

rather than introduced automatically.

---

# 247. Cache Sharding

Distributed caches MAY shard keys.

Hot-key distribution must be considered.

---

# 248. Hot Key

A single extremely popular key can overload one shard even when total cache capacity is healthy.

---

# 249. Hot-Key Mitigation

Potential strategies:

```text
local L1 cache
replicated reads
SWR
request collapsing
key replication
```

depending on platform.

---

# 250. L1 + L2 Cache

Applications MAY use:

```text
L1 = process-local
L2 = distributed
```

caching.

---

# 251. L1/L2 Invalidation

L1 caches introduce additional invalidation lag.

The architecture MUST explicitly tolerate or address it.

---

# 252. Cache Eviction

Eviction is a resource-management decision.

---

# 253. Eviction Policy

The eviction algorithm SHOULD match access patterns.

Examples include:

```text
LRU
LFU
TTL-oriented
random
```

---

# 254. Eviction Is Normal for Cache

A well-designed application SHOULD tolerate cache eviction.

---

# 255. No-Eviction Mode

`noeviction`-style behavior may be appropriate when dropped cache writes are preferable to deleting existing entries, but it changes failure semantics.

---

# 256. Eviction Monitoring

Monitor:

```text
evictions
memory usage
hit rate
miss rate
```

to determine whether cache capacity is adequate.

---

# 257. Hit Rate

Cache hit rate is useful but not sufficient.

---

# 258. High Hit Rate Can Still Be Bad

A 99% hit rate may still be poor if:

```text
the 1% misses overload the DB
cached values are dangerously stale
```

---

# 259. Low Hit Rate

A low hit rate may indicate:

```text
bad key cardinality
TTL too short
poor candidate selection
insufficient capacity
```

---

# 260. Cache Metrics

Important caches SHOULD expose:

```text
hit
miss
hit ratio
latency
errors
timeouts
evictions
memory
entry count
refreshes
invalidations
```

where available.

---

# 261. Staleness Metrics

Important stale-serving systems SHOULD measure:

```text
fresh serves
stale serves
refresh success
refresh failure
maximum age served
```

---

# 262. Keyspace Metrics

Avoid metrics labels containing raw cache keys.

That creates extreme metric cardinality.

---

# 263. Namespace Metrics

Prefer metrics by:

```text
cache namespace
operation
tenant tier
result
```

where appropriate.

---

# 264. Cache Tracing

Distributed traces MAY record:

```text
cache hit/miss
cache layer
lookup latency
```

without exposing sensitive key values.

---

# 265. Database Load Correlation

Operators SHOULD be able to correlate:

```text
cache hit-rate drop
↓
database load increase
```

---

# 266. Invalidation Metrics

Important invalidation systems SHOULD track:

```text
events emitted
events processed
failures
lag
```

---

# 267. Cache Fill Metrics

Monitor expensive regeneration/fill duration.

---

# 268. Stampede Detection

Sudden spikes in identical backend operations following expiry can indicate stampede.

---

# 269. Cache Dashboard

Critical shared caches SHOULD have dashboards for:

```text
latency
hit/miss
memory
eviction
errors
backend impact
```

---

# 270. Cache Alerting

Alert on actionable conditions such as:

```text
cache unavailable
latency high
eviction unexpectedly high
memory saturated
miss rate causing backend saturation
```

---

# 271. Do Not Alert on Hit Rate Alone

Low hit rate may be normal during:

```text
deployment
new feature
low traffic
```

---

# 272. Cache Cost

Caching consumes:

```text
RAM
CDN transfer/storage
managed-service capacity
engineering complexity
```

Cost SHOULD be evaluated against backend savings.

---

# 273. Cache Value Budget

Do not cache a 50 MB object to save a 5 ms database read.

---

# 274. Serialization Cost

Cache serialization/deserialization time counts toward latency.

---

# 275. Network Cost

Remote cache network latency may exceed a well-indexed local database query.

Measure.

---

# 276. Cache Compression Cost

Compression is worthwhile only when:

```text
memory/network savings
>
CPU/latency cost
```

---

# 277. Database Query Budget

Caching does not remove the need for database query budgets.

Cache misses still occur.

---

# 278. Cache Warming Budget

Prewarming must be rate-limited to avoid overwhelming origin systems.

---

# 279. Invalidations During Deployment

Deployments SHOULD account for cache schema/key changes.

---

# 280. Backward-Compatible Cache Changes

During rolling deploys, old and new application versions may share the cache.

Key/value formats MUST remain mutually compatible or be version-separated.

---

# 281. Cache Schema Migration

For incompatible cached value formats:

```text
new key namespace
↓
deploy readers/writers
↓
old cache ages out
```

is often safer than in-place mutation.

---

# 282. Rolling Deployment

Never assume all application instances upgrade simultaneously.

---

# 283. Deserialization Safety

Consumers MUST NOT deserialize incompatible cached objects blindly.

---

# 284. Language-Native Serialization

Avoid fragile serialized in-memory language objects when version evolution is likely.

Prefer stable data representations.

---

# 285. Deployment Cache Flush

Routine deployment SHOULD NOT require flushing the entire distributed cache unless unavoidable.

---

# 286. Flush Dependency

If every deployment requires:

```text
FLUSHALL
```

the cache design should be reconsidered.

---

# 287. Emergency Cache Flush

Emergency flush MAY be used for:

```text
bad cached data
schema mismatch
security exposure
```

under controlled procedures.

---

# 288. Flush Blast Radius

A large flush can cause:

```text
DB spike
external API spike
latency spike
```

and must be rate/capacity planned.

---

# 289. Cache Warm After Flush

Critical systems SHOULD have a strategy for cold-cache recovery.

---

# 290. Cache Prepopulation

Prepopulation MAY be appropriate for:

```text
reference data
top catalog items
known hot aggregates
```

---

# 291. Write Invalidation Testing

Tests SHOULD prove that mutations invalidate/update all required cache representations.

---

# 292. Cache-Miss Testing

Applications MUST work correctly when the cache is empty.

---

# 293. Cache-Outage Testing

Critical systems SHOULD test:

```text
cache unavailable
cache timeout
cache full/evicting
```

behavior.

---

# 294. Stale Data Testing

Tests SHOULD verify acceptable behavior for stale values where stale serving is allowed.

---

# 295. Tenant Isolation Testing

Multi-tenant caches MUST test cross-tenant key collisions and authorization scope.

---

# 296. Stampede Testing

High-traffic hot keys SHOULD be tested under simultaneous expiry/miss.

---

# 297. Invalidation Failure Test

Test:

```text
DB update succeeds
cache invalidation fails
```

for important domains.

---

# 298. Rolling Version Test

Test old/new application versions against shared cache when rolling deployments use the same cache.

---

# 299. Eviction Test

Applications SHOULD tolerate values disappearing before TTL due to eviction.

---

# 300. Request Memoization Test

Verify request-local memoization does not leak values between users or requests.

---

# 301. Negative Cache Test

Verify:

```text
not found
```

entries expire or invalidate when the resource is later created.

---

# 302. Security Review Checklist

```text
□ Tenant in key where required
□ User/security scope in key where required
□ No secret values in keys
□ No private response shared publicly
□ Authorization independent
□ Cache poisoning considered
□ Input normalization
□ Redis not publicly exposed
□ Cache credentials protected
□ Environment isolation
```

---

# 303. Browser Cache Checklist

```text
□ Content classified
□ Cache-Control explicit
□ max-age appropriate
□ private/public intentional
□ no-store vs no-cache correct
□ validators where useful
□ mutable URLs not long-cached
□ fingerprinted immutable assets
□ personalized data protected
```

---

# 304. CDN Checklist

```text
□ Cacheable content only
□ Cache key explicit
□ Query params reviewed
□ Vary/header dimensions reviewed
□ Auth/private data protected
□ TTL
□ SWR/stale-if-error decision
□ Purge strategy
□ Origin protection
□ Stampede control
```

---

# 305. Server Cache Checklist

```text
□ Expensive/repeated operation
□ Source of truth identified
□ Key dimensions complete
□ TTL
□ Invalidation
□ Failure fallback
□ Cardinality bounded
□ Stampede considered
□ Metrics
```

---

# 306. Redis Checklist

```text
□ Redis justified
□ Cache-only vs durable role clear
□ Memory limit
□ Eviction policy
□ TTL policy
□ Key namespace
□ Tenant boundary
□ Value size budget
□ Authentication
□ Network restriction
□ Timeout
□ Outage fallback
□ Metrics
```

---

# 307. Cache-Key Checklist

```text
□ Namespace
□ Version
□ Environment
□ Tenant
□ Resource
□ User/permission scope where relevant
□ Locale/currency where relevant
□ Filter/sort/page dimensions
□ Deterministic serialization
□ No unnecessary PII
□ Cardinality acceptable
```

---

# 308. TTL Checklist

```text
□ Maximum acceptable staleness known
□ Change frequency considered
□ TTL justified
□ Explicit invalidation available where needed
□ TTL fallback exists
□ Jitter considered
□ SWR considered
□ Hard stale limit known
```

---

# 309. Invalidation Checklist

```text
□ Mutation identified
□ Affected cache entries known
□ Invalidate after commit
□ Invalidation retry/failure considered
□ Fallback TTL
□ List/detail/aggregate caches included
□ Event duplicates safe
□ Cold-cache impact acceptable
```

---

# 310. SWR Checklist

```text
□ Stale data acceptable
□ Fresh window
□ Stale window
□ Absolute stale limit
□ Single refresh behavior
□ Refresh failures observable
□ Security-critical data excluded
□ Backend protected from stampede
```

---

# 311. Stampede Checklist

```text
□ Hot key identified
□ Concurrent miss behavior known
□ Single-flight considered
□ TTL jitter considered
□ SWR considered
□ Refresh lock bounded
□ Backend can survive cold start
```

---

# 312. Definition of Done — New Cache

A new production cache is ready when:

```text
✓ Performance problem identified
✓ Cache layer justified
✓ Source of truth identified
✓ Consistency model defined
✓ Cache key specified
✓ Tenant/security isolation verified
✓ TTL specified
✓ Invalidation specified
✓ Failure behavior specified
✓ Stampede considered
✓ Capacity/eviction policy defined
✓ Metrics available
✓ Cache-miss behavior tested
```

---

# 313. Definition of Done — Cached Mutation

A mutation affecting cached data is complete when:

```text
✓ Authoritative transaction succeeds first
✓ Relevant cache entries invalidated/updated
✓ Failure of invalidation handled
✓ Read-your-write expectation satisfied
✓ Cross-tenant isolation maintained
✓ Related aggregate/list caches addressed
✓ Tests cover stale-cache scenario
```

---

# 314. Definition of Done — HTTP/CDN Cache

```text
✓ Cacheability classified
✓ Cache-Control explicit
✓ Browser/shared TTL intentional
✓ Vary/cache-key correct
✓ Personalized data excluded or partitioned safely
✓ Revalidation defined
✓ Purge/version strategy defined
✓ Stale behavior defined
✓ Origin-load behavior tested
```

---

# 315. Caching Anti-Patterns

Avoid:

```text
Redis because caching is best practice.
```

Avoid:

```text
cache everything
```

without reuse analysis.

Avoid:

```text
cache hides missing DB index
```

instead of fixing the query.

Avoid:

```text
cache is the only copy
```

of business data while calling it disposable.

Avoid:

```text
project:p_42
```

for tenant-scoped data without tenant identity.

Avoid:

```text
user email
```

as a cache key when an opaque ID will work.

Avoid:

```text
authorization response
```

cached across users.

Avoid:

```text
browser max-age=1y
```

for mutable HTML.

Avoid:

```text
no-cache = do not cache
```

Avoid:

```text
no-store = revalidate
```

Avoid:

```text
CDN cache key ignores locale
```

while response is localized.

Avoid:

```text
CDN cache ignores authorization
```

for personalized output.

Avoid:

```text
Vary: Cookie
```

blindly for every request when only one small dimension matters.

Avoid:

```text
purge entire CDN
```

on every deployment.

Avoid:

```text
Redis TTL = forever
```

for mutable data.

Avoid:

```text
TTL only
```

when permission revocation must be immediate.

Avoid:

```text
invalidate before DB commit
```

as default write strategy.

Avoid:

```text
DB commit succeeds
cache invalidation failure ignored forever
```

Avoid:

```text
manual delete 37 keys
```

for every domain mutation without a sustainable invalidation model.

Avoid:

```text
all hot keys expire at exactly midnight
```

without stampede planning.

Avoid:

```text
10,000 misses
→
10,000 identical DB queries
```

Avoid:

```text
distributed lock
```

with no timeout/lease.

Avoid:

```text
serve stale permissions
```

because SWR improves latency.

Avoid:

```text
stale-if-error
```

for a financial transaction decision.

Avoid:

```text
cache 404 forever
```

for resources that may later exist.

Avoid:

```text
500 response cached as normal data
```

without explicit design.

Avoid:

```text
entire ORM object serialized
```

into Redis indefinitely.

Avoid:

```text
same Redis
```

for disposable cache and critical non-evictable state without intentional isolation.

Avoid:

```text
no memory limit
```

on a shared Redis cache.

Avoid:

```text
one Redis cache lookup = 20 ms
DB query = 4 ms
```

and still assuming the cache helps.

Avoid:

```text
FLUSHALL on every deploy
```

Avoid:

```text
cache flush
→
database overload
```

with no recovery plan.

Avoid:

```text
process-global memoization
```

when the developer intended request-local memoization.

Avoid:

```text
request cache leaks data between tenants
```

Avoid:

```text
cache hit ratio = 99%
therefore cache healthy
```

without freshness/backend analysis.

Avoid:

```text
cache miss = error
```

for an ordinary disposable cache.

Avoid:

```text
Redis outage = entire product outage
```

when Redis exists only for optimization and no deliberate dependency decision was made.

---

# 316. AI Caching Rules

AI coding agents MUST identify the actual performance problem before introducing caching.

---

# 317. AI Source-of-Truth Rule

AI MUST identify the authoritative source before caching a value.

---

# 318. AI Cache-Necessity Rule

AI SHOULD first evaluate:

```text
query optimization
indexing
request deduplication
HTTP caching
framework-native caching
```

before adding a distributed cache.

---

# 319. AI Redis Rule

AI MUST NOT introduce Redis merely because repeated reads exist.

---

# 320. AI Cache-Key Rule

AI MUST include every result-affecting scope in cache keys.

---

# 321. AI Tenant Rule

AI MUST include tenant identity for tenant-scoped cache entries.

---

# 322. AI Authorization Rule

AI MUST NOT use cached client state as an authorization boundary.

---

# 323. AI Privacy Rule

AI MUST avoid unnecessary PII/secrets in:

```text
cache keys
cache values
cache logs
```

---

# 324. AI TTL Rule

AI MUST NOT choose arbitrary TTL values without considering acceptable staleness.

---

# 325. AI Infinite-TTL Rule

AI SHOULD NOT use infinite TTL for mutable data unless reliable explicit invalidation/versioning is proven.

---

# 326. AI Invalidation Rule

AI MUST define cache invalidation when implementing a cached mutable read.

---

# 327. AI Post-Commit Rule

AI SHOULD invalidate cache only after authoritative writes commit successfully.

---

# 328. AI TTL-Fallback Rule

AI SHOULD retain a bounded TTL as a safety net when invalidation can be missed.

---

# 329. AI Stampede Rule

AI MUST consider concurrent miss behavior for hot/expensive cache entries.

---

# 330. AI Jitter Rule

AI SHOULD consider TTL jitter when many related entries are likely to expire together.

---

# 331. AI SWR Rule

AI SHOULD use stale-while-revalidate only when stale data is explicitly acceptable.

---

# 332. AI Security-Staleness Rule

AI MUST NOT use SWR/stale-if-error casually for:

```text
permissions
security state
financial correctness
critical inventory
```

---

# 333. AI Browser Rule

AI MUST distinguish:

```text
no-store
no-cache
private
public
max-age
s-maxage
```

when generating HTTP caching headers.

---

# 334. AI Immutable-Asset Rule

AI SHOULD use long-lived caching only for immutable/fingerprinted static assets.

---

# 335. AI CDN Rule

AI MUST NOT shared-cache personalized responses without an explicit safe partitioning model.

---

# 336. AI Vary Rule

AI SHOULD use `Vary` only for request dimensions that genuinely alter the representation.

---

# 337. AI Request-Memoization Rule

AI MUST understand whether framework memoization is:

```text
request-local
process-local
persistent
distributed
```

before relying on it.

---

# 338. AI Cache-Failure Rule

AI MUST define behavior when the cache:

```text
misses
times out
fails
is flushed
```

---

# 339. AI Backend-Capacity Rule

AI SHOULD verify the backend can survive:

```text
cold cache
cache outage
major invalidation
```

within expected limits.

---

# 340. AI Redis-Eviction Rule

AI SHOULD configure memory/eviction behavior intentionally for Redis cache workloads.

---

# 341. AI Durable-Redis Rule

If Redis stores authoritative state, AI MUST stop treating it as a disposable cache and apply datastore reliability rules.

---

# 342. AI Multi-Layer Rule

AI MUST inspect outer cache layers before adding an inner cache.

---

# 343. AI Deployment Rule

AI SHOULD version incompatible cache schemas rather than requiring global flush during rolling deployments.

---

# 344. AI Negative-Cache Rule

AI SHOULD use short negative caching only when repeated misses are expensive and creation/freshness semantics remain safe.

---

# 345. AI Metrics Rule

AI SHOULD expose:

```text
hit
miss
latency
errors
evictions
refresh/invalidation
```

for important new caches.

---

# 346. AI Gold Rule

When uncertain:

```text
No cache
>
Request memoization
>
HTTP/browser/CDN cache
>
Process-local cache
>
Distributed cache
>
Complex multi-layer cache
```

when each simpler layer satisfies the requirement.

For mutable data:

```text
Authoritative source
>
Explicit invalidation
>
Bounded TTL
>
Controlled stale behavior
>
Unbounded stale cache
```

---

# 347. Golden Caching Rules

**1. A cache is a disposable copy or derived projection, not the default source of truth.**

**2. Introduce caching only for a known latency, load, availability, or cost problem.**

**3. Fix bad queries and missing indexes before hiding them behind caches.**

**4. Every cached value has a known authoritative source.**

**5. Every important cache has an explicit consistency model.**

**6. Every cache key includes all result-affecting dimensions.**

**7. Tenant identity is always part of tenant-scoped cache keys.**

**8. Authorization and security scope are never accidentally shared through caching.**

**9. Secrets and unnecessary PII do not appear in cache keys.**

**10. Cache key formats are deterministic and versionable.**

**11. Cache cardinality and memory usage are bounded.**

**12. Browser and CDN caching use standard HTTP semantics.**

**13. `no-cache` means revalidate; `no-store` means do not store.**

**14. Fingerprinted immutable assets may use very long TTLs.**

**15. Mutable URLs are not given effectively permanent browser cache lifetimes without versioning.**

**16. Personalized responses are not publicly shared-cached by default.**

**17. `Vary` and CDN cache keys include all representation-changing request dimensions.**

**18. CDN invalidation is selective; immutable asset versioning is preferred over routine full purges.**

**19. Request memoization remains scoped to its documented execution lifecycle.**

**20. Process-local cache is not assumed coherent across application instances.**

**21. Redis is introduced only when distributed caching provides concrete value.**

**22. Redis expiration and memory eviction are separate concerns.**

**23. Redis cache workloads have explicit memory limits and eviction policies.**

**24. Disposable and non-evictable Redis workloads are separated when their requirements conflict.**

**25. Database buffer caching is considered before adding application caches for repeated reads.**

**26. Read replicas are not caches.**

**27. Materialized views are derived persistent projections and receive explicit refresh semantics.**

**28. TTL is derived from acceptable staleness, not arbitrary convention.**

**29. Explicit invalidation is used when mutation visibility must beat TTL expiry.**

**30. TTL remains a useful safety net against missed invalidation.**

**31. Mutable entries do not use infinite TTL without reliable invalidation/versioning.**

**32. Cache invalidation occurs after authoritative writes commit.**

**33. Cache invalidation failure is treated as an expected distributed failure mode.**

**34. Complex invalidation uses sustainable tags, events, or namespace strategies rather than fragile manual deletion lists.**

**35. Invalidation events are duplicate-safe and have fallback freshness bounds.**

**36. Cache stampedes are prevented for hot expensive keys.**

**37. Single-flight, SWR, jitter, early refresh, or bounded locks are used where appropriate.**

**38. Backend systems remain capable of surviving reasonable cache loss or cold starts.**

**39. Stale-while-revalidate is used only where bounded stale data is acceptable.**

**40. Stale-if-error improves availability only where stale data remains safe.**

**41. Security-sensitive, financial, and authorization decisions do not casually use stale data.**

**42. Negative caching uses bounded TTLs and correct user/tenant scope.**

**43. Transient errors are not mistaken for durable negative results.**

**44. Cache poisoning is considered whenever attacker-controlled inputs influence cached output.**

**45. Any request input that changes cached output must be normalized, validated, or represented in the cache key.**

**46. Multi-layer caches have coordinated freshness semantics.**

**47. Outer caches cannot silently make inner invalidation ineffective.**

**48. Every cache layer has a distinct reason to exist.**

**49. Ordinary cache failure degrades performance rather than corrupting data.**

**50. Cache calls have bounded latency/timeouts.**

**51. Cache outage fallbacks do not overwhelm authoritative systems uncontrollably.**

**52. Cache flushes and namespace bumps are treated as capacity events.**

**53. Rolling deployments preserve cache-format compatibility or use versioned namespaces.**

**54. Routine deployments do not require whole-cache flushing.**

**55. Cache hit rate is interpreted together with latency, staleness, eviction, and backend impact.**

**56. Cache observability includes hits, misses, errors, latency, memory, and evictions where relevant.**

**57. Important stale-serving systems measure stale serves and refresh failures.**

**58. Raw cache keys are not used as unbounded metric labels.**

**59. Multi-tenant cache isolation is tested.**

**60. Applications are tested with an empty cache.**

**61. Important systems are tested with cache outage and timeout conditions.**

**62. Hot cache entries are tested for simultaneous miss/expiry behavior.**

**63. Negative cache behavior is tested when previously absent resources appear.**

**64. A cache implementation is incomplete until invalidation is designed.**

**65. If engineers cannot explain when a cached value becomes stale, how it is invalidated, and whether another tenant can ever receive it, the cache is not production-grade.**

---

# 348. Canonical Caching Standard

The organizational standard is:

> **Caching is introduced deliberately to address measured or strongly justified latency, load, availability, or cost problems. A cache is ordinarily a disposable copy or projection of authoritative state and is designed so that eviction, flush, process restart, or cache-service failure does not silently destroy business correctness. Query design, indexing, architecture, and resource efficiency are addressed before additional cache layers are introduced.**

> **Every cached representation has a defined source of truth, key schema, consistency model, maximum acceptable staleness, TTL or freshness policy, invalidation mechanism, failure fallback, ownership, and observability strategy. Cache keys include every request or domain dimension that can affect the result—including tenant, resource, locale, filters, pagination, and authorization scope where relevant—and exclude unnecessary secrets or personal data. Tenant cache isolation is treated as a security requirement and tested explicitly.**

> **HTTP, browser, and CDN caches follow standard HTTP caching semantics. `Cache-Control`, validators, freshness, `Vary`, shared-versus-private behavior, revalidation, and stale controls are configured intentionally. Immutable fingerprinted assets may use long-lived browser and CDN caching, while personalized or security-sensitive dynamic content is private or non-cacheable unless a proven safe shared-cache partitioning model exists. CDN cache keys include all representation-changing dimensions and do not fragment unnecessarily on irrelevant cookies, headers, or tracking parameters.**

> **Application caching uses the narrowest effective scope. Request memoization is preferred for repeated work within one execution, process-local caches are used where per-instance divergence is acceptable, and distributed caches such as Redis are introduced only when cross-instance reuse or workload characteristics justify their operational cost. Redis cache workloads use explicit memory bounds, eviction policies, TTLs, secure networking, and failure behavior; if Redis contains authoritative data, it is governed as a datastore rather than assumed disposable.**

> **Mutable cache entries use bounded freshness and explicit invalidation where required. Authoritative writes commit before corresponding cache invalidation or refresh occurs, invalidation failure is treated as a possible distributed-system failure, and TTLs provide a bounded fallback where invalidations may be lost. Complex domains prefer sustainable namespace, tag, or event-driven invalidation over manually maintaining large lists of individual keys. Cache schemas evolve through compatible representations or versioned namespaces so rolling deployments do not require unsafe whole-cache flushes.**

> **High-traffic caches are designed against stampedes, cold starts, and penetration. Hot keys may use request collapsing, single-flight, bounded refresh locks, TTL jitter, early refresh, or stale-while-revalidate. Negative results may be cached briefly when doing so prevents expensive repeated misses, while temporary backend errors are not converted into durable negative state. Major invalidation, flush, recovery, and namespace migration events are treated as backend-capacity events rather than purely cache-local operations.**

> **Stale serving is intentional and bounded. Stale-while-revalidate may return an expired representation while asynchronous validation occurs when the application can tolerate temporary staleness, and stale-if-error may preserve availability when serving old content is safer than returning an error. Neither mechanism is used casually for authorization, payment correctness, security state, critical inventory, or other domains where obsolete data may authorize an invalid action or produce an incorrect business outcome.**

> **Caching remains observable as part of production behavior. Important cache layers expose lookup latency, hits, misses, errors, timeouts, memory, evictions, invalidations, refresh behavior, stale serves, and backend effects as applicable. Systems correlate cache degradation with database or dependency saturation, avoid high-cardinality metrics derived from raw keys, and test empty-cache, cold-cache, cache-outage, tenant-isolation, concurrent-expiry, negative-cache, invalidation-failure, and rolling-version scenarios.**

A production-grade caching design should make it easy to answer:

```text
Why does this cache exist?
What expensive operation does it avoid?
What is the authoritative source?
Which cache layer owns this copy?
What exactly is the cache key?
Does the key contain tenant identity?
Does user/permission scope affect the result?
What is the TTL?
Why was that TTL chosen?
What is the maximum acceptable staleness?
What invalidates the value?
What happens if invalidation fails?
What happens if the cache is empty?
What happens if Redis/CDN is unavailable?
Can the database survive the resulting misses?
Can many clients miss the same hot key simultaneously?
How is stampede prevented?
Can stale data be served?
For how long?
Is stale data safe for this domain?
Can private data ever enter a shared cache?
Can one tenant ever receive another tenant's cached value?
Are missing resources negatively cached?
How quickly does that negative entry disappear after creation?
Which memory/eviction policy applies?
What happens when the cache reaches capacity?
What happens during a deployment with old and new cache formats?
Does a cache flush overload the backend?
What metrics reveal hit rate, latency, evictions, stale serving, and invalidation failure?
```

If those questions cannot be answered reliably, caching is functioning as hidden mutable state rather than controlled performance infrastructure.

The HTTP rules above align with **RFC 9111**, which defines freshness, validation, `Cache-Control`, shared/private behavior, `Vary`, and the requirement that caches respect representation-changing request dimensions. It also makes the distinction around `must-revalidate` important for cases where serving stale responses can produce incorrect behavior. citeturn243148search0turn243148search1

`stale-while-revalidate` and `stale-if-error` remain defined by **RFC 5861**: SWR permits bounded stale serving while revalidation occurs asynchronously, while stale-if-error permits stale content in selected failure cases. Neither directive removes the need to define how stale the application can safely become. citeturn243148search2turn243148search3

For Redis specifically, current Redis documentation distinguishes **expiration** from **memory-pressure eviction** and supports policies including LRU-, LFU-, TTL-, random-, and no-eviction behavior. That supports treating TTL and capacity policy as separate decisions rather than assuming TTL alone controls memory. citeturn868348search0turn868348search6

In the master hierarchy, this sits immediately before background processing:

**… → Error Handling & Resilience → Caching → Background Jobs & Queue → Files & Media → Search → Notifications → Internationalization → Testing → Performance → Observability → …**
