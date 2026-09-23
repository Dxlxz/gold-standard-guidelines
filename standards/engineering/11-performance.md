---
id: "performance"
title: "Performance Guidelines — Gold Standard"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["engineering", "performance"]
applies_to: ["ui"]
related: []
legacy_number: 18
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 60188
provenance: baseline

---

For the web-performance baseline, the current Core Web Vitals remain **LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1**, evaluated at the **75th percentile**, segmented by mobile and desktop. citeturn441053search2turn441053search4

# Performance Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical performance standard for applications across:

- frontend;
- browser runtime;
- server rendering;
- APIs;
- application servers;
- databases;
- caches;
- queues;
- third-party dependencies;
- media;
- fonts;
- JavaScript;
- CSS;
- network delivery;
- streaming;
- background processing.

The objective is to produce systems that are:

- fast under realistic conditions;
- responsive during interaction;
- efficient with compute and bandwidth;
- predictable under load;
- measurable;
- regression-resistant;
- scalable without unnecessary complexity.

The core principle is:

> **Performance is a product requirement and an architectural constraint, not a cleanup task after implementation.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented reason exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Performance exceptions SHOULD document:

```text
Reason
Measured impact
Affected users
Tradeoff
Owner
Review date
```

---

# 3. Performance Is End-to-End

User-perceived latency is the sum of many layers:

```text
Navigation
↓
DNS / connection / TLS
↓
CDN / edge
↓
Server
↓
Database / dependencies
↓
HTML
↓
CSS / fonts / images / JS
↓
Hydration / rendering
↓
Interaction
```

Optimizing one layer while ignoring the dominant bottleneck is ineffective.

---

# 4. Performance Must Be Measured

Do not optimize primarily from intuition.

Use:

```text
Field telemetry
Profiling
Tracing
Query plans
Browser performance tools
Synthetic testing
Load testing
```

to identify actual bottlenecks.

---

# 5. User Experience Over Benchmark Vanity

Optimize user-important operations.

Prefer improving:

```text
page opens
search responds
save completes
checkout completes
dialog opens
```

over optimizing internal benchmarks that users never experience.

---

# 6. Performance Budget

Every important product SHOULD define performance budgets.

Budgets turn:

```text
"make it fast"
```

into measurable constraints.

---

# 7. Budget Categories

Performance budgets MAY cover:

```text
Core Web Vitals
Page weight
JavaScript
Images
Fonts
API latency
Server latency
Database queries
Query count
External calls
Background jobs
Memory
CPU
```

---

# 8. Budgets Are Guardrails

A budget is not a promise that every operation must have identical latency.

Different product surfaces require different targets.

---

# 9. Performance Classes

Classify operations where useful:

```text
Instant interaction
Interactive request
Normal navigation
Heavy report
Background task
Batch processing
```

Each class may have different budgets.

---

# 10. Suggested Interaction Expectations

Useful UX targets:

```text
Immediate feedback
→ approximately within one frame / visually immediate

Simple interaction
→ feels effectively instant

Interactive network operation
→ clear progress if perceptible

Long operation
→ explicit progress / async workflow
```

Do not rely on one latency target for all operations.

---

# 11. Core Web Vitals

The canonical web UX metrics are:

```text
LCP
→ loading

INP
→ responsiveness

CLS
→ visual stability
```

---

# 12. Core Web Vitals Targets

Organizational minimum target:

```text
LCP ≤ 2.5 seconds

INP ≤ 200 milliseconds

CLS ≤ 0.1
```

Measured at the 75th percentile of applicable user visits.

---

# 13. Aim Below Thresholds

Do not intentionally design exactly at the acceptable threshold.

Leave regression and device/network margin.

---

# 14. Field Data Wins

Production Real User Monitoring is the authoritative indicator of actual user experience when sufficient data exists.

Lab testing remains essential for diagnosis and pre-production prevention.

---

# 15. Field vs Lab

Use:

```text
Field
→ What users experience

Lab
→ Why it happens
```

Neither replaces the other.

---

# 16. Segment Performance

Analyze performance by relevant dimensions.

Examples:

```text
mobile / desktop
region
browser
device class
network
route
tenant
application version
```

Aggregates can hide severe performance problems.

---

# 17. Percentiles

Do not optimize only average latency.

Track:

```text
p50
p75
p95
p99
```

where appropriate.

Tail latency often determines perceived reliability.

---

# 18. Median Is Not Enough

A 100 ms average can coexist with:

```text
5-second p99
```

for meaningful portions of traffic.

---

# 19. Largest Contentful Paint

LCP measures when the main visible content becomes rendered.

Optimize:

```text
TTFB
resource discovery
resource download
render delay
```

not merely file size.

---

# 20. LCP Candidate

Identify the actual LCP element.

Common examples:

```text
hero image
page title
large content block
```

Do not optimize unrelated resources first.

---

# 21. LCP Resource Discovery

Critical LCP resources SHOULD be discoverable early.

Avoid hiding them behind:

```text
client-side JS
late API calls
CSS background discovery
unnecessary dependency chains
```

where possible.

---

# 22. Do Not Lazy-Load LCP

Likely above-the-fold/LCP images MUST NOT normally use lazy loading.

They should be fetched early.

---

# 23. LCP Priority

Critical above-the-fold image resources MAY use appropriate browser priority mechanisms when they materially improve loading.

Do not mark every image as high priority.

---

# 24. LCP Image Size

Serve appropriately sized and compressed LCP media.

Avoid downloading a:

```text
4000 × 3000
```

image for a 700-pixel container.

---

# 25. LCP Render Delay

If the resource is downloaded early but appears late, investigate:

```text
client rendering
blocking JS
hydration
CSS
animation
conditional rendering
```

---

# 26. Interaction to Next Paint

INP reflects responsiveness to user interactions throughout the page lifecycle.

Do not focus performance only on initial loading.

---

# 27. Interaction Budget

Interactive handlers SHOULD perform the minimum synchronous work necessary before visual feedback.

---

# 28. Long Tasks

Break long main-thread tasks where practical.

Large synchronous work blocks:

```text
click
keyboard
paint
```

and degrades interaction responsiveness.

---

# 29. Yielding

Large client-side workloads SHOULD yield to the browser where appropriate.

Do not monopolize the main thread unnecessarily.

---

# 30. Heavy Client Computation

Move suitable heavy computation to:

```text
server
worker
background process
```

when this improves responsiveness.

---

# 31. Input Responsiveness

Typing should not trigger expensive whole-page operations synchronously.

Examples:

```text
search
filter
editor
large table
```

require appropriate update architecture.

---

# 32. Debouncing

Debounce expensive secondary effects where appropriate.

Do not debounce the visible input itself unnecessarily.

---

# 33. Cumulative Layout Shift

CLS measures unexpected layout movement.

The page SHOULD reserve space for content before it arrives.

---

# 34. Media Dimensions

Images/video SHOULD have known:

```text
width
height
aspect ratio
```

so layout space can be reserved.

---

# 35. Dynamic Content

Do not insert unexpected content above existing visible content without preserving layout.

Examples:

```text
banner
advertisement
error
notification
```

---

# 36. Skeleton Layout

Skeletons SHOULD approximate final geometry.

A skeleton that later changes dramatically can still cause visual instability.

---

# 37. Font Layout Shift

Font selection/loading must consider changes in text dimensions.

Choose compatible fallbacks where practical.

---

# 38. Animation and CLS

Prefer transforms/opacity for visual movement where appropriate rather than properties causing repeated layout.

---

# 39. First Contentful Paint

FCP MAY be monitored as supporting diagnostic data.

It does not replace Core Web Vitals.

---

# 40. Time to First Byte

TTFB is a key input into server-delivered page performance.

Slow TTFB delays:

```text
HTML
resource discovery
LCP
```

---

# 41. Server Latency

Server latency SHOULD have explicit budgets.

Measure separately:

```text
routing
authentication
authorization
application
database
external dependencies
serialization
```

---

# 42. Server Latency Budget

A request budget should be distributed across dependencies.

Example:

```text
Total target
500 ms

Application
50 ms

Database
150 ms

External dependency
200 ms

Remaining overhead
100 ms
```

Use actual product-specific targets.

---

# 43. Server p95

Critical interactive server endpoints SHOULD track at least p95 latency.

A fast median with a poor tail is insufficient.

---

# 44. Server p99

High-volume or reliability-sensitive systems SHOULD inspect p99.

Do not necessarily make every CI check depend on p99 due to statistical noise.

---

# 45. Separate Queue Time

Distinguish:

```text
request processing time
```

from:

```text
waiting for worker/thread/connection
```

Queue contention may be the real bottleneck.

---

# 46. Server Profiling

Profile before optimizing.

Identify:

```text
CPU
I/O
locking
allocation
serialization
network
database
```

cost.

---

# 47. Server CPU

CPU-heavy transformations SHOULD not block request capacity unnecessarily.

Move suitable workloads to background processing.

---

# 48. Server Memory

Monitor:

```text
baseline memory
peak memory
leaks
allocation pressure
```

especially for long-lived processes.

---

# 49. Memory Leaks

Use profiling/soak testing when memory grows continuously under stable traffic.

---

# 50. Serialization Cost

Large JSON serialization can materially affect:

```text
CPU
memory
network
client parsing
```

Return only necessary data.

---

# 51. Compression

Compress suitable text responses.

Examples:

```text
HTML
CSS
JavaScript
JSON
SVG
```

Do not waste CPU recompressing already compressed formats without benefit.

---

# 52. Database Performance

Database performance must be treated as part of application latency.

Track:

```text
query latency
query count
connection wait
lock wait
rows scanned
rows returned
```

---

# 53. Query Budget

Critical request paths SHOULD have a query budget.

Example:

```text
GET project page
≤ 5 primary DB round trips
```

when that provides useful regression protection.

Budget values are route-specific.

---

# 54. Query Count Is Not Everything

One terrible query can be slower than 10 efficient queries.

Monitor both:

```text
count
+
latency
```

---

# 55. N+1 Queries

Avoid harmful N+1 behavior.

Example:

```text
1 query list
+
100 individual owner queries
```

Use:

```text
join
batch
eager loading
data loader
```

as appropriate.

---

# 56. Distributed N+1

Also detect:

```text
1 API request
+
100 downstream HTTP requests
```

Distributed N+1 can be substantially worse than database N+1.

---

# 57. Query Plans

Use database execution plans for slow/important queries.

Do not infer index use by inspection alone.

---

# 58. Indexes

Indexes SHOULD reflect real:

```text
filter
join
sort
```

patterns.

Do not add indexes blindly.

---

# 59. Index Cost

Remember every index increases:

```text
storage
write cost
maintenance
migration cost
```

---

# 60. Rows Scanned

Watch for query plans scanning orders of magnitude more rows than returned.

---

# 61. Select Required Columns

Avoid retrieving large unused columns.

Especially:

```text
large JSON
text
binary metadata
```

when the view requires only identifiers and names.

---

# 62. Pagination

Large queries MUST be bounded.

Do not fetch thousands of rows to display 20.

---

# 63. Cursor Pagination

Prefer keyset/cursor pagination for large frequently changing collections.

---

# 64. Offset Cost

Large offsets can become expensive.

Understand database access patterns before relying on:

```text
OFFSET 100000
```

---

# 65. Aggregates

Large aggregation queries MAY need:

```text
precomputation
materialized views
warehouse
summary tables
```

rather than repeated interactive computation.

---

# 66. Reporting Isolation

Heavy reporting should not degrade transactional workloads.

Use separate:

```text
replica
warehouse
queue
read model
```

where necessary.

---

# 67. Database Connection Pool

Configure pool size based on actual database capacity.

More connections can reduce performance through contention.

---

# 68. Connection Wait

Measure time waiting for a DB connection separately from query execution.

---

# 69. Connection Storm

Autoscaling/serverless systems MUST avoid multiplying database connections beyond database capacity.

---

# 70. Transactions

Keep transactions short.

Long transactions can increase:

```text
lock contention
replication lag
cleanup pressure
```

---

# 71. Locks

Measure lock waits when concurrent writes become slow.

Do not assume database CPU is always the cause.

---

# 72. Cache Principle

Caching trades:

```text
freshness complexity
```

for:

```text
latency / capacity improvement
```

Use it deliberately.

---

# 73. Cache Only When Needed

Do not add cache solely because a route feels conceptually cacheable.

Measure first.

---

# 74. Cache Layers

Potential cache layers:

```text
browser
CDN
framework
application
distributed cache
database buffer/cache
```

Understand which one owns each optimization.

---

# 75. Browser HTTP Cache

Prefer browser HTTP caching over custom JavaScript storage for static resources.

---

# 76. Immutable Assets

Content-hashed immutable assets SHOULD receive long-lived caching.

Example conceptually:

```text
app.abc123.js

Cache-Control:
long max-age
immutable
```

---

# 77. HTML Caching

HTML caching strategy depends on:

```text
personalization
freshness
authorization
deployment
```

Do not apply static asset policy blindly to HTML.

---

# 78. Private Responses

Sensitive personalized responses MUST NOT accidentally become shared-cache/public responses.

---

# 79. Cache-Control

Define explicit cache semantics where caches materially affect behavior.

---

# 80. stale-while-revalidate

Stale-while-revalidate MAY reduce revalidation latency where temporary stale data is acceptable.

---

# 81. stale-if-error

Safe read-only content MAY use stale data during temporary upstream failures when domain semantics permit it.

---

# 82. Cache Key

A cache key MUST contain all state affecting the result.

Examples:

```text
tenant
resource
locale
permission scope
query
version
```

where applicable.

---

# 83. Cache Invalidation

Every application cache requires an invalidation strategy.

---

# 84. TTL Is Not Invalidation

TTL means:

```text
how long value may remain cached
```

Invalidation means:

```text
which known mutation makes it stale now
```

---

# 85. Cache Stampede

Prevent large numbers of requests simultaneously rebuilding an expired high-value cache item.

Potential mechanisms:

```text
request coalescing
locking
jitter
soft expiration
stale-while-revalidate
```

---

# 86. Cache Hit Rate

Measure hit rate.

A cache with low reuse may add complexity without benefit.

---

# 87. Cache Latency

Measure cache access latency too.

A remote cache is still a network dependency.

---

# 88. CDN

Use CDN/edge caching for appropriate static/public assets.

Typical:

```text
JS
CSS
images
fonts
public media
```

---

# 89. CDN Geographic Benefit

CDN reduces physical distance and origin load for cacheable resources.

Do not assume it automatically improves uncached personalized application logic.

---

# 90. JavaScript Budget

JavaScript SHOULD have a route/surface budget.

JavaScript costs:

```text
download
decompression
parsing
compilation
execution
memory
```

---

# 91. JavaScript Cost Is Device-Dependent

A bundle that is fast on a high-end development laptop may be expensive on a low-end phone.

Test representative hardware.

---

# 92. Client JavaScript Minimum

Default principle:

> **Ship only JavaScript required for user interaction.**

Server-rendered/static content should not require unnecessary client execution.

---

# 93. Server-First Rendering

In server-first frameworks, prefer server-rendered components/content where interaction does not require client state.

---

# 94. Client Boundary

Keep client-side interactive boundaries as narrow as practical.

Do not mark entire application trees client-side merely because one button is interactive.

---

# 95. Hydration Cost

Hydration consumes:

```text
CPU
main-thread time
memory
```

Reduce unnecessary hydrated component trees.

---

# 96. Hydration Payload

Do not serialize large amounts of server data to clients merely to hydrate components that do not need it.

---

# 97. Partial Hydration / Islands

Architectures supporting isolated interactive islands MAY reduce client runtime cost.

Use framework-native patterns rather than building custom mechanisms unnecessarily.

---

# 98. Code Splitting

Split code by meaningful loading boundaries.

Examples:

```text
route
heavy editor
charting
admin feature
```

---

# 99. Do Not Oversplit

Hundreds of tiny chunks can increase:

```text
request overhead
coordination
cache complexity
```

Use bundler/framework capabilities intelligently.

---

# 100. Dynamic Imports

Use dynamic imports for genuinely heavy functionality not needed during initial interaction.

Examples:

```text
rich text editor
code editor
large chart library
PDF renderer
```

---

# 101. Lazy Loading

Lazy load resources unlikely to be needed immediately.

Good candidates:

```text
below-fold images
secondary dialogs
heavy charts
optional editors
third-party embeds
```

---

# 102. Do Not Lazy Everything

Critical above-fold resources should load eagerly.

Lazy loading the resource required to render the initial experience can make performance worse.

---

# 103. Prefetching

Prefetch resources/routes when there is a high probability they will soon be needed and the bandwidth/cost tradeoff is acceptable.

---

# 104. Over-Prefetching

Do not prefetch the entire application.

This wastes:

```text
bandwidth
battery
server resources
```

especially on constrained networks.

---

# 105. Preloading

Use preload only for known high-priority resources.

Excessive preload competes with truly critical work.

---

# 106. Resource Priority

Performance is partly resource prioritization.

The browser should receive critical resources before low-value resources.

---

# 107. CSS

Keep critical rendering CSS efficient.

Avoid shipping enormous unused CSS bundles.

---

# 108. Utility CSS

Utility CSS frameworks are compatible with good performance when build tooling removes unused output and CSS remains bounded.

---

# 109. CSS Imports

Avoid long chains of blocking CSS imports.

---

# 110. Critical CSS

Framework/tooling MAY inline/extract critical CSS where this improves initial rendering.

Do not manually duplicate large CSS blocks unnecessarily.

---

# 111. Expensive CSS

Be cautious with expensive effects across large surfaces.

Examples:

```text
large blur
complex filters
huge shadows
backdrop effects
```

Measure on representative hardware.

---

# 112. DOM Size

Avoid unnecessarily enormous DOM trees.

Large DOM can increase:

```text
style calculation
layout
memory
interaction cost
```

---

# 113. Virtualization

Use list/table virtualization when rendering very large collections materially degrades performance.

---

# 114. Do Not Virtualize Small Lists

Virtualization introduces:

```text
complexity
accessibility challenges
scroll behavior complexity
```

Do not use it for ordinary 20-row lists.

---

# 115. Pagination Before Virtualization

If users do not need thousands of rows simultaneously, pagination may be simpler.

---

# 116. Rendering Large Tables

Large tables may require:

```text
server pagination
column minimization
row virtualization
memoized expensive cells
```

depending on scale.

---

# 117. Images

Image optimization SHOULD consider:

```text
dimensions
format
compression
responsive sizing
loading priority
caching
```

---

# 118. Responsive Images

Serve image sizes appropriate to viewport/container.

Use framework/browser responsive-image capabilities.

---

# 119. Image Formats

Use efficient modern formats when supported by delivery architecture.

Do not convert blindly if visual quality or compatibility is worse.

---

# 120. Image Compression

Compress images appropriately for their visual purpose.

Avoid lossless assets when visually equivalent compressed alternatives are substantially smaller.

---

# 121. Image Dimensions

Always reserve dimensions/aspect ratio where possible.

This helps prevent layout shift.

---

# 122. Above-Fold Images

Critical visible images SHOULD load eagerly.

---

# 123. Below-Fold Images

Off-screen images SHOULD generally be lazy-loaded.

---

# 124. Lazy Loading Native Support

Prefer native browser lazy-loading mechanisms for ordinary images/iframes over custom JavaScript.

---

# 125. Image CDN

An image transformation/CDN service MAY provide:

```text
resizing
format negotiation
compression
geographic distribution
```

where useful.

---

# 126. User Upload Images

Generate display variants/thumbnails rather than repeatedly serving original multi-megabyte uploads into small UI.

---

# 127. Decorative Images

Avoid large decorative media that adds significant performance cost without proportional product value.

---

# 128. SVG

SVG is effective for many icons/vector graphics.

Avoid extremely complex SVG DOM/path structures when simpler assets suffice.

---

# 129. Icons

Prefer the canonical icon system.

Do not download a huge icon package/client bundle when only a small subset is required.

---

# 130. Fonts

Fonts affect:

```text
network
rendering
layout
CLS
```

and require explicit optimization.

---

# 131. Font Families

Minimize unnecessary font families.

Each family increases resource cost.

---

# 132. Font Weights

Load only weights/styles actually used.

Avoid:

```text
100
200
300
400
500
600
700
800
900
```

if the product uses only three weights.

---

# 133. Variable Fonts

Variable fonts MAY reduce file count when the file-size and browser tradeoff is favorable.

Measure actual result.

---

# 134. Font Subsetting

Subset fonts by required character ranges where appropriate and safe for localization strategy.

---

# 135. Font Preload

Preload only fonts needed immediately.

Do not preload every font file.

---

# 136. Font Display

Use an appropriate `font-display` strategy according to branding/readability requirements.

Avoid unnecessarily blocking text rendering.

---

# 137. Self-Hosting Fonts

Self-hosting MAY improve control, privacy, and caching.

It does not automatically make an unoptimized font payload fast.

---

# 138. Font Caching

Static font files SHOULD use effective long-term HTTP caching where versioned appropriately.

---

# 139. Third-Party Scripts

Third-party scripts are performance and security dependencies.

Examples:

```text
analytics
chat
advertising
tag managers
embedded widgets
```

---

# 140. Third-Party Script Budget

Every third-party script SHOULD justify:

```text
bytes
CPU
network
privacy
business value
```

---

# 141. Delay Noncritical Third Parties

Load noncritical third-party functionality after critical product content/interactivity where possible.

---

# 142. Tag Managers

Tag managers do not exempt scripts from performance governance.

Measure total resulting third-party execution.

---

# 143. Duplicate Analytics SDKs

Do not load multiple overlapping analytics systems casually.

---

# 144. Embeds

Heavy third-party embeds SHOULD be lazy-loaded or facade-loaded where appropriate.

Examples:

```text
maps
video
social widgets
```

---

# 145. Streaming

Streaming MAY improve perceived performance by sending useful content before the entire operation completes.

---

# 146. Streaming Principle

Stream independent useful content.

Do not stream merely to create implementation complexity.

---

# 147. Server Rendering Streaming

Use server rendering/streaming to send stable page structure while slower regions resolve independently.

---

# 148. Suspense Boundaries

Place loading boundaries around meaningful independent content.

Avoid:

```text
one giant boundary
```

that delays everything for one slow query.

---

# 149. Too Many Boundaries

Do not create dozens of visually noisy independent loading states.

Balance incremental rendering with coherent UX.

---

# 150. Stream Critical Content First

Prioritize:

```text
shell
primary heading
core content
primary actions
```

before secondary recommendations/analytics.

---

# 151. Streaming Does Not Fix Slow Backends

Streaming can improve perceived latency.

It does not reduce actual expensive work.

Optimize backend bottlenecks separately.

---

# 152. Client Streaming

Streaming APIs/chats SHOULD define:

```text
first-byte latency
chunk cadence
cancellation
partial failure
```

---

# 153. Partial Stream Failure

If a stream fails, distinguish incomplete output from a complete successful result.

---

# 154. Server Components

Where applicable, server components SHOULD fetch data close to the authoritative data source and avoid unnecessary client data-fetch waterfalls.

---

# 155. Data Fetch Waterfalls

Avoid:

```text
fetch A
↓
render
↓
fetch B
↓
render
↓
fetch C
```

when requests can be parallelized safely.

---

# 156. Parallel Data Fetching

Independent data fetches SHOULD execute concurrently.

---

# 157. Dependent Fetches

Do not force concurrency where B genuinely requires A's result.

Optimize the dependency graph instead.

---

# 158. API Waterfalls

Client architectures should avoid requiring sequential APIs for one common screen.

Consider:

```text
aggregation
broader server query
server rendering
```

where appropriate.

---

# 159. Promise Parallelism

Concurrency should respect downstream capacity.

Do not replace:

```text
sequential 1,000 operations
```

with:

```text
Promise.all(1,000)
```

blindly.

---

# 160. Bounded Concurrency

Use bounded concurrency for expensive bulk work.

---

# 161. Background Work

Move non-user-blocking work away from synchronous request paths.

Examples:

```text
email
analytics
media processing
report generation
search indexing
```

---

# 162. Request Path

The critical request path should contain only work necessary to produce the requested result safely.

---

# 163. Fire-and-Forget

Do not start important async work and assume it completes after returning.

Use durable jobs/outbox where completion matters.

---

# 164. Async Operations

Long operations SHOULD expose:

```text
queued
processing
completed
failed
```

rather than making interactive HTTP requests wait indefinitely.

---

# 165. Queue Latency

Background performance includes:

```text
queue wait
processing duration
retry delay
```

not only worker runtime.

---

# 166. Job SLO

Critical jobs SHOULD have freshness/completion targets.

Example:

```text
95% of notifications processed within N seconds
```

where business needs warrant it.

---

# 167. Queue Backlog

Monitor backlog age, not only message count.

10,000 tiny current jobs may be less concerning than 50 jobs stuck for hours.

---

# 168. External Dependencies

External dependency latency contributes directly to product latency when calls are synchronous.

---

# 169. Dependency Budget

Each synchronous provider SHOULD have:

```text
latency budget
timeout
retry policy
```

---

# 170. Minimize Synchronous Providers

Do not put optional providers in the synchronous critical path.

---

# 171. Parallel Provider Calls

Independent external calls MAY execute in parallel.

Account for aggregate:

```text
failure rate
capacity
cost
```

---

# 172. Tail Amplification

Fan-out requests increase the chance that one slow dependency determines total latency.

---

# 173. Avoid Wide Fan-Out

A request depending synchronously on 20 services is difficult to make consistently fast.

Review architecture.

---

# 174. Timeouts and Performance

Timeouts bound resource consumption and tail latency.

Every network call requires a finite timeout.

---

# 175. Retries Increase Latency

Retries can improve success rate but increase:

```text
latency
load
cost
```

Use only according to Error & Resilience Guidelines.

---

# 176. Retry Budget

Do not spend the entire user latency budget on retries.

---

# 177. Serverless Cold Starts

Where serverless runtimes are used, measure:

```text
cold start
warm latency
connection setup
bundle/runtime initialization
```

---

# 178. Cold-Start Sensitive Paths

Critical low-latency paths SHOULD minimize startup dependencies and initialization.

---

# 179. Runtime Selection

Choose edge/server/serverless/container runtime based on actual:

```text
latency
database proximity
library compatibility
cost
```

rather than trend.

---

# 180. Edge Computing

Edge execution can reduce network distance but may worsen performance if it causes:

```text
remote DB calls
limited runtime
extra hops
```

Measure end-to-end.

---

# 181. Data Locality

Compute SHOULD run near data when data access dominates latency.

---

# 182. Database Region

Place latency-sensitive application/database workloads with appropriate network proximity.

---

# 183. Cross-Region Calls

Cross-region synchronous dependencies should be explicit and minimized.

---

# 184. Multi-Region Performance

Multi-region deployment does not guarantee lower latency if data still lives in one distant region.

---

# 185. Browser Main Thread

Protect the main thread.

Expensive JavaScript competes directly with:

```text
input
layout
paint
animation
```

---

# 186. Long Task Profiling

Use browser tooling to identify long tasks and their call stacks.

---

# 187. Event Handlers

Keep frequently invoked event handlers lightweight.

Examples:

```text
scroll
mousemove
keypress
resize
```

---

# 188. Passive Event Listeners

Use appropriate passive listeners where scrolling behavior allows it.

---

# 189. Layout Thrashing

Avoid repeatedly alternating:

```text
read layout
write layout
read layout
write layout
```

within hot code paths.

Batch work where possible.

---

# 190. Forced Synchronous Layout

Profile layout-forcing DOM patterns in interaction-sensitive components.

---

# 191. Rendering Work

Large UI state updates can cause expensive reconciliation/layout.

Keep update scope narrow.

---

# 192. State Granularity

Do not put rapidly changing state at the root of enormous component trees without need.

---

# 193. Context Performance

Large frequently changing context providers MAY cause broad rerenders.

Split only where measured performance warrants it.

---

# 194. Global Stores

Use selectors to avoid subscribing components to unrelated state when supported.

---

# 195. Memoization

Memoize expensive computations when profiling identifies benefit.

Do not memoize every function/component automatically.

---

# 196. Memoization Cost

Memoization consumes:

```text
memory
comparison work
complexity
```

and may worsen performance when applied indiscriminately.

---

# 197. Compiler Optimizations

Use framework/compiler-provided optimization where supported.

Do not add manual memoization rituals merely because older practices recommended them.

---

# 198. Large Objects

Avoid repeatedly cloning enormous state/data structures in interaction-critical paths.

---

# 199. Parsing

Large client-side JSON parsing may block the main thread.

Reduce response payload or move processing where appropriate.

---

# 200. Browser Storage

Large synchronous browser-storage operations can block execution.

Use appropriate storage mechanisms for large data.

---

# 201. Hydration Mismatch Workarounds

Do not defer huge parts of the application to client-only rendering merely to avoid hydration design problems.

Fix ownership/rendering architecture.

---

# 202. Initial Render

Prioritize content users need immediately.

Secondary UI may load progressively.

---

# 203. Above-the-Fold Principle

Do not equate above-the-fold with "download everything immediately."

Only genuinely critical content receives priority.

---

# 204. Lazy Routes

Large independent application routes SHOULD load only their required code where framework routing supports this naturally.

---

# 205. Admin Code

Do not ship large admin-only functionality to ordinary users when it can remain route-separated.

---

# 206. Role-Based Code Loading

Security must remain server-side, but client bundles MAY avoid loading large privileged-only interfaces unnecessarily.

---

# 207. Feature Flags

Disabled heavy features SHOULD ideally not impose substantial client bundle/runtime cost where build/runtime architecture allows avoidance.

---

# 208. Locale Bundles

Do not ship all translations to all users if routing/build architecture can load only required locale data.

---

# 209. Charting Libraries

Charts can be expensive.

Load chart code only where needed.

---

# 210. Editors

Rich text/code editors are strong candidates for lazy loading.

---

# 211. PDF / Document Tools

Heavy document tooling SHOULD load on demand.

---

# 212. Maps

Interactive map SDKs are often large third-party dependencies.

Use lightweight placeholders/facades until interaction if appropriate.

---

# 213. Bundle Analysis

Frontend projects SHOULD support bundle inspection.

Use it to identify:

```text
large modules
duplicate libraries
unexpected client dependencies
```

---

# 214. Bundle Regression

Significant bundle-size regressions SHOULD be visible in CI/review.

---

# 215. Bundle Budget

Set budgets by route/chunk where useful.

Avoid only one global number that hides large route regressions.

---

# 216. Duplicate Dependencies

Detect multiple versions/copies of heavy libraries where consolidation is practical.

---

# 217. Tree Shaking

Libraries intended for frontend reuse SHOULD support effective dead-code elimination where possible.

---

# 218. Import Discipline

Prefer targeted imports where package architecture requires them.

Avoid import patterns known to pull unnecessary modules.

---

# 219. Client/Server Boundary Imports

Server-only libraries MUST NOT leak into browser bundles.

Use architectural import restrictions.

---

# 220. Source Maps

Source maps improve production diagnosis but should be delivered/configured in a way that does not create unnecessary user payload or sensitive exposure.

---

# 221. Profiling

Performance optimization workflow:

```text
Observe
↓
Measure
↓
Profile
↓
Identify bottleneck
↓
Change
↓
Measure again
```

---

# 222. Never Optimize Without Re-Measurement

Every meaningful optimization should verify:

```text
Did it improve the target metric?
Did another metric regress?
```

---

# 223. CPU Profiling

Use CPU profiles for:

```text
slow JS
server compute
serialization
expensive render
```

---

# 224. Memory Profiling

Use memory profiles for:

```text
leaks
large retention
high allocation churn
```

---

# 225. Network Profiling

Inspect:

```text
request waterfall
connection reuse
resource priority
cache status
payload size
```

---

# 226. Database Profiling

Use:

```text
slow query logs
EXPLAIN / execution plans
lock monitoring
connection metrics
```

---

# 227. Distributed Tracing

Tracing is useful for identifying latency across:

```text
gateway
service
database
provider
queue
```

---

# 228. Trace Sampling

Use an appropriate tracing sample strategy.

Do not generate more telemetry than the system can economically retain.

---

# 229. RUM

Production web applications SHOULD collect Real User Monitoring where privacy and architecture allow it.

---

# 230. RUM Context

Useful dimensions may include:

```text
route
device class
network
application version
```

without high-cardinality sensitive labels.

---

# 231. Synthetic Monitoring

Use controlled synthetic navigation to detect regressions even when production traffic is low.

---

# 232. Lighthouse / Lab Tools

Lab tools MAY be used for:

```text
development
CI
diagnosis
baseline comparison
```

They do not replace field data.

---

# 233. Benchmark Environment

Performance benchmarks require stable:

```text
hardware
runtime
dataset
configuration
```

for meaningful comparison.

---

# 234. Benchmark Noise

Do not fail builds on insignificant variations inside normal measurement noise.

---

# 235. Baseline

Performance changes SHOULD compare against a known baseline.

---

# 236. Regression Threshold

Define what constitutes a significant regression.

Examples:

```text
bundle +X%
latency +Y%
query count +N
```

according to project risk.

---

# 237. CI Performance Gates

CI SHOULD enforce stable mechanical budgets such as:

```text
bundle size
query count
asset size
```

where reliable.

---

# 238. CI Latency Benchmarks

Latency benchmarks MAY run in CI when environment variance can be controlled sufficiently.

---

# 239. Performance Test Tiering

Potential tiers:

```text
PR
→ quick budget checks

Main/nightly
→ broader benchmarks

Pre-release
→ load/performance testing

Production
→ RUM
```

---

# 240. Query Regression Tests

Critical paths MAY assert query-count ceilings.

Use as regression guardrails, not universal dogma.

---

# 241. Load Testing

Load testing verifies behavior at expected concurrency.

It should answer:

```text
capacity
latency
error rate
resource saturation
```

---

# 242. Load Test Model

Use realistic workload distributions.

Do not test only:

```text
one endpoint
constant request rate
perfect cache hits
```

if production is more complex.

---

# 243. Expected Peak

Test expected peak load with margin.

---

# 244. Stress Testing

Stress testing determines behavior beyond expected capacity.

Identify:

```text
saturation point
failure behavior
recovery
```

---

# 245. Spike Testing

Spike tests evaluate abrupt traffic changes.

Useful for products with bursty traffic.

---

# 246. Soak Testing

Long-duration testing detects:

```text
memory leaks
connection leaks
resource buildup
queue growth
```

---

# 247. Performance Under Failure

Performance testing SHOULD include degraded dependencies where resilience matters.

Retries and timeouts can drastically alter latency under outage.

---

# 248. Cache-Warm vs Cold

Measure both where relevant:

```text
cold cache
warm cache
```

Do not publish only best-case warmed results.

---

# 249. Cold Start vs Warm

Serverless/elastic environments should measure both paths.

---

# 250. Database Dataset Size

Performance tests must use representative data scale.

A query fast on 100 rows may fail at 100 million.

---

# 251. Cardinality

Representative data should model realistic:

```text
tenant sizes
relationship counts
distribution
skew
```

---

# 252. Hot Tenants

Large tenants may require separate performance analysis from typical tenants.

---

# 253. Multi-Tenant Fairness

One tenant SHOULD NOT consume unbounded shared resources.

Apply:

```text
quotas
concurrency controls
rate limits
```

where needed.

---

# 254. Noisy Neighbor

Monitor tenant workloads capable of degrading others.

---

# 255. Rate Limiting

Rate limits can protect capacity but should not substitute for fixing inefficient architecture.

---

# 256. Backpressure

Systems SHOULD slow/reject work before uncontrolled overload causes collapse.

---

# 257. Load Shedding

Low-priority operations MAY be shed during extreme capacity pressure.

Protect critical paths.

---

# 258. Graceful Degradation

Performance degradation under load should remain understandable.

Better:

```text
recommendations disabled
```

than:

```text
entire checkout unavailable
```

where dependencies are optional.

---

# 259. Capacity Planning

Track:

```text
traffic growth
storage growth
CPU
memory
connections
queue depth
provider quotas
```

before reaching limits.

---

# 260. Headroom

Production systems SHOULD maintain capacity headroom appropriate to scaling architecture.

Running continuously at maximum capacity is fragile.

---

# 261. Autoscaling

Autoscaling should use signals aligned with actual bottlenecks.

Examples:

```text
CPU
concurrency
queue depth
requests
```

---

# 262. Scaling Delay

Account for the time required to add capacity.

Reactive autoscaling may not handle instant spikes without baseline headroom.

---

# 263. Vertical Scaling

Vertical scaling is often the simplest performance improvement.

Do not dismiss it merely because horizontal scaling appears more sophisticated.

---

# 264. Horizontal Scaling

Use horizontal scaling when workload supports it and availability/capacity requirements justify it.

---

# 265. Database Scaling Order

Before sharding, evaluate:

```text
query optimization
indexes
better schema
vertical scale
read replicas
archival
partitioning
```

---

# 266. Sharding

Sharding SHOULD require demonstrated scale need.

It introduces significant query and operational complexity.

---

# 267. Read Replicas

Use read replicas for workloads that tolerate replication lag.

---

# 268. Read-After-Write

Do not route freshness-sensitive reads to stale replicas blindly.

---

# 269. Compression Tradeoff

Higher compression may reduce bytes while increasing CPU.

Choose appropriate compression level for:

```text
dynamic
static
edge-cached
```

resources.

---

# 270. Static Asset Precompression

Build/CDN infrastructure SHOULD precompress static assets where supported.

---

# 271. HTTP Versions

Use modern HTTP protocol support provided by infrastructure.

Do not build application architecture around assumptions from old connection limits unnecessarily.

---

# 272. Connection Reuse

Avoid repeatedly establishing expensive connections where pooling/reuse is appropriate.

---

# 273. Keep-Alive

Use appropriate persistent connection behavior for:

```text
database
HTTP dependencies
```

according to client/server architecture.

---

# 274. DNS

Excessive third-party origins create DNS/TLS/connection overhead.

Minimize unnecessary origins.

---

# 275. Origin Consolidation

Do not split static assets across many domains without measured benefit.

---

# 276. Request Count

Request count remains useful, but payload and CPU cost matter more than simplistic "fewest requests" rules under modern HTTP.

---

# 277. Payload Budget

Large API payloads SHOULD have explicit review.

---

# 278. GraphQL Performance

GraphQL APIs MUST guard against:

```text
unbounded query complexity
N+1
deep nesting
large result sets
```

---

# 279. GraphQL DataLoader

Batching/caching mechanisms MAY solve repeated backend lookups where appropriate.

---

# 280. REST Performance

REST collection endpoints must remain:

```text
paginated
bounded
filterable
```

rather than requiring clients to download everything.

---

# 281. API Compression

Large JSON responses SHOULD be compressed where infrastructure supports it.

---

# 282. Mobile Performance

Mobile performance must consider:

```text
slower CPU
limited memory
battery
cellular latency
bandwidth
```

---

# 283. Develop on Representative Devices

Do not use a high-end development machine as the only performance test device.

---

# 284. Network Throttling

Use network throttling for diagnosis.

Remember simulated throttling is not identical to real-world mobile conditions.

---

# 285. Low-End Device Testing

Consumer-facing products SHOULD periodically test representative lower-performance devices.

---

# 286. Battery and Power

Avoid unnecessary:

```text
polling
animation
background work
repeated network calls
```

on mobile.

---

# 287. Polling

Polling intervals SHOULD reflect actual freshness needs.

Do not poll every second for data that changes once an hour.

---

# 288. Visibility-Aware Polling

Pause/reduce appropriate polling when pages are backgrounded or inactive.

---

# 289. Realtime vs Polling

Choose realtime connections when latency requirements justify persistent infrastructure.

Polling may be simpler and cheaper.

---

# 290. WebSockets

Realtime systems should monitor:

```text
connection count
message rate
reconnect storms
backpressure
```

---

# 291. Reconnect Jitter

Use backoff/jitter for mass reconnect after outage.

---

# 292. Performance and Accessibility

Do not sacrifice accessibility for micro-performance gains.

Native semantic controls are often both accessible and efficient.

---

# 293. Performance and Security

Do not weaken:

```text
authorization
encryption
validation
security headers
```

to improve benchmarks.

---

# 294. Performance and Correctness

Correctness outranks speed.

An instant wrong answer is not an optimization.

---

# 295. Performance and Maintainability

Avoid obscure micro-optimizations without measured user benefit.

Readable maintainable code is usually preferable until profiling demonstrates a hotspot.

---

# 296. Premature Optimization

Do not introduce:

```text
cache
sharding
worker
custom memory pool
complex memoization
```

without a demonstrated need.

---

# 297. Performance Debt

Known performance compromises SHOULD document:

```text
impact
affected users
owner
trigger for remediation
```

---

# 298. Performance Incident

Severe sustained latency degradation can be an operational incident even when requests still technically succeed.

---

# 299. Performance Alerting

Alert on meaningful:

```text
latency
saturation
queue age
database contention
```

before complete failure where possible.

---

# 300. Performance Review Triggers

Performance review SHOULD occur for:

```text
new heavy dependency
new dashboard
new large table
new image-heavy experience
new provider
new background pipeline
new high-volume query
major framework change
```

---

# 301. Frontend Performance Checklist

```text
□ CWV targets defined
□ LCP resource identified
□ LCP image not lazy-loaded
□ Below-fold images lazy-loaded
□ Image dimensions reserved
□ Responsive images used
□ Font families/weights bounded
□ JavaScript budget reviewed
□ Heavy features code-split
□ Unnecessary client boundaries avoided
□ Third-party scripts reviewed
□ Layout shifts checked
□ Interaction responsiveness checked
□ Bundle analysis reviewed
```

---

# 302. Server Performance Checklist

```text
□ Endpoint latency measured
□ p50/p95 tracked
□ Latency budget defined
□ Blocking work minimized
□ External calls bounded
□ Independent calls parallelized where safe
□ CPU profile available for hotspots
□ Serialization size reviewed
□ Memory behavior understood
```

---

# 303. Database Performance Checklist

```text
□ Query count understood
□ Slow queries identified
□ Query plans inspected
□ N+1 absent
□ Appropriate indexes exist
□ Rows returned bounded
□ Pagination appropriate
□ Connection pool sized
□ Lock contention monitored
□ Dataset scale realistic
```

---

# 304. Caching Checklist

```text
□ Cache provides measured value
□ Source of truth known
□ Cache key correct
□ Tenant/auth scope correct
□ TTL defined
□ Invalidation defined
□ Stampede considered
□ Hit rate measured
□ Outage behavior defined
```

---

# 305. Image Checklist

```text
□ Correct dimensions
□ Correct format
□ Compressed
□ Responsive source
□ Width/height/aspect ratio
□ Correct loading priority
□ LCP image eager
□ Off-screen image lazy
□ Long-lived caching where versioned
```

---

# 306. Font Checklist

```text
□ Families minimized
□ Weights minimized
□ Font files optimized
□ Subsetting considered
□ Display behavior defined
□ Critical preload limited
□ Long caching enabled
□ Fallback layout checked
```

---

# 307. Bundle Checklist

```text
□ Route bundle analyzed
□ Heavy dependencies justified
□ Duplicate packages checked
□ Server-only modules excluded from client
□ Heavy optional UI lazily loaded
□ Locale/admin code separated where useful
□ Regression budget enforced
```

---

# 308. Streaming Checklist

```text
□ Streaming improves user-visible result
□ Critical content arrives first
□ Slow regions isolated
□ Too many loaders avoided
□ Partial stream failure handled
□ Cancellation considered
```

---

# 309. Performance Test Checklist

```text
□ Representative workload
□ Representative dataset
□ Cold/warm behavior considered
□ p50/p95/p99 where relevant
□ CPU/memory observed
□ Database observed
□ Failure behavior observed
□ Result compared with baseline
```

---

# 310. Performance Definition of Done

A significant feature is performance-ready when:

```text
✓ Critical user path identified
✓ Performance budget considered
✓ No obvious request waterfalls
✓ Query behavior bounded
✓ Payloads bounded
✓ Images/media optimized
✓ Client JS justified
✓ Third-party costs understood
✓ Loading behavior intentional
✓ Interaction remains responsive
✓ Production measurement available where relevant
✓ No known severe regression
```

---

# 311. Performance Anti-Patterns

Avoid:

```text
Optimize without profiling.
```

Avoid:

```text
Ship all JavaScript to every route.
```

Avoid:

```text
Turn entire server-first app into client components.
```

Avoid:

```text
Fetch initial page data only after client mount without reason.
```

Avoid:

```text
Lazy-load hero/LCP image.
```

Avoid:

```text
Preload every resource.
```

Avoid:

```text
Prefetch the entire application.
```

Avoid:

```text
Load all font weights.
```

Avoid:

```text
Serve original 10 MB image as thumbnail.
```

Avoid:

```text
No image dimensions.
```

Avoid:

```text
100-row list
→ 101 database queries
```

Avoid:

```text
SELECT *
```

for every API.

Avoid:

```text
No pagination.
```

Avoid:

```text
Add Redis before measuring DB.
```

Avoid:

```text
Cache with no invalidation.
```

Avoid:

```text
One-hour cache for permission decisions without revocation strategy.
```

Avoid:

```text
Promise.all on thousands of expensive tasks.
```

Avoid:

```text
Optional analytics in checkout critical path.
```

Avoid:

```text
Every UI component memoized.
```

Avoid:

```text
Virtualize every list.
```

Avoid:

```text
Microservice because function is slow.
```

Avoid:

```text
Edge deployment while database remains half the world away.
```

Avoid:

```text
Average latency is good, therefore performance is good.
```

Avoid:

```text
Lighthouse score = complete performance strategy.
```

---

# 312. AI Performance Rules

AI coding agents MUST consider performance as part of design, but MUST NOT prematurely optimize without evidence.

---

# 313. AI Measurement Rule

Before making a non-obvious optimization, AI SHOULD identify:

```text
metric
bottleneck
baseline
expected improvement
```

---

# 314. AI Server-First Rule

AI SHOULD avoid unnecessary client-side JavaScript when server rendering can satisfy the requirement.

---

# 315. AI Client Boundary Rule

AI MUST NOT add broad `"use client"`-style boundaries merely because one descendant requires interaction.

Use the smallest appropriate client boundary.

---

# 316. AI Fetch Rule

AI SHOULD identify independent requests and avoid avoidable sequential waterfalls.

---

# 317. AI Query Rule

AI MUST inspect database access for:

```text
N+1
unbounded retrieval
missing pagination
unnecessary fields
```

when implementing data-heavy features.

---

# 318. AI Index Rule

AI MUST NOT add indexes merely from intuition.

Indexes should correspond to known query patterns and be verified where performance matters.

---

# 319. AI Cache Rule

AI MUST NOT introduce caching without defining:

```text
source of truth
key
scope
freshness
TTL
invalidation
```

---

# 320. AI Image Rule

AI-generated image usage SHOULD include:

```text
appropriate dimensions
responsive sizing
aspect ratio
loading priority
```

---

# 321. AI LCP Rule

AI MUST NOT lazy-load a likely LCP/hero image by default.

---

# 322. AI Lazy-Loading Rule

AI SHOULD lazy-load heavy noncritical resources where delayed loading improves initial experience.

---

# 323. AI Dependency Rule

Before adding a heavy browser dependency, AI SHOULD inspect whether:

```text
native browser feature
existing dependency
smaller implementation
server-side alternative
```

already solves the requirement.

---

# 324. AI Bundle Rule

AI MUST avoid importing server-only dependencies into client code.

---

# 325. AI Third-Party Rule

AI SHOULD treat new third-party scripts as a performance dependency requiring justification.

---

# 326. AI Streaming Rule

AI SHOULD use streaming/Suspense-style boundaries only when meaningful independent content can render earlier.

---

# 327. AI Memoization Rule

AI MUST NOT automatically wrap every:

```text
function
component
derived value
```

in memoization.

Profile or demonstrate reason.

---

# 328. AI Virtualization Rule

AI SHOULD introduce virtualization only when collection size and measured rendering cost justify it.

---

# 329. AI Timeout Rule

AI-generated external network calls MUST remain bounded according to the Error & Resilience Standard.

---

# 330. AI Background Rule

AI SHOULD move noncritical expensive side effects out of synchronous request paths when durability/semantics allow.

---

# 331. AI Budget Rule

AI SHOULD preserve established:

```text
bundle
query
latency
asset
```

budgets.

If a change exceeds a budget, it should explain the tradeoff rather than silently bypassing the limit.

---

# 332. AI Performance-Test Rule

Performance-sensitive changes SHOULD include appropriate regression protection where measurement is deterministic enough.

---

# 333. AI Optimization Rule

AI SHOULD prefer removing work over making unnecessary work marginally faster.

Priority:

```text
Do less
↓
Do later
↓
Do concurrently
↓
Cache
↓
Optimize implementation
```

where semantics allow.

---

# 334. AI Gold Rule

When uncertain:

```text
Correctness
>
Security
>
Measured user experience
>
Simplicity
>
Micro-optimization
```

---

# 335. Golden Performance Rules

**1. Performance is a product requirement.**

**2. Measure before optimizing.**

**3. Optimize user-visible bottlenecks.**

**4. Define performance budgets.**

**5. Track percentiles, not averages alone.**

**6. Measure real users as well as lab environments.**

**7. Meet Core Web Vitals at the required population percentile.**

**8. Leave margin below performance thresholds.**

**9. Identify and optimize the actual LCP resource.**

**10. Never lazy-load likely LCP content by default.**

**11. Protect the main thread to preserve INP.**

**12. Reserve layout space to protect CLS.**

**13. Minimize JavaScript shipped to browsers.**

**14. Prefer server rendering for noninteractive content.**

**15. Keep client boundaries narrow.**

**16. Avoid data-fetch waterfalls.**

**17. Parallelize independent work.**

**18. Bound concurrency for large work.**

**19. Move noncritical work outside the synchronous request path.**

**20. Every large collection is bounded.**

**21. Eliminate harmful N+1 patterns.**

**22. Inspect query plans for slow queries.**

**23. Index real access patterns.**

**24. Treat query count and query latency separately.**

**25. Cache only when it solves a measured problem.**

**26. Every cache has invalidation semantics.**

**27. HTTP/browser/CDN caching should be preferred where appropriate.**

**28. Optimize image dimensions, format, compression, and priority.**

**29. Load only necessary font families and weights.**

**30. Lazy-load noncritical heavy content.**

**31. Do not over-prefetch or over-preload.**

**32. Third-party scripts require performance justification.**

**33. Streaming improves perceived latency but does not excuse slow backends.**

**34. Use representative devices, networks, and datasets.**

**35. Test cold and warm behavior where both occur in production.**

**36. Protect critical paths from noisy neighbors and overload.**

**37. Maintain capacity headroom.**

**38. Performance regressions should be visible before production where practical.**

**39. Profile after identifying a bottleneck and measure again after changing it.**

**40. Remove unnecessary work before optimizing necessary work.**

---

# 336. Canonical Performance Standard

The organizational standard is:

> **Performance is designed and measured across the complete user journey, from network connection and server processing through database access, resource delivery, browser rendering, hydration, and interaction. Critical user journeys maintain explicit performance budgets, and production performance is evaluated using field telemetry and percentile distributions rather than averages or laboratory scores alone. Web experiences target current Core Web Vitals good thresholds for the applicable user population, with engineering margin below those thresholds.**

> **Applications minimize work on critical paths. Initial content is rendered server-first where practical, client-side JavaScript is restricted to functionality that requires it, critical resources are prioritized, noncritical resources are deferred, independent data requests are parallelized, and expensive non-user-blocking operations move to durable asynchronous processing. Images, fonts, CSS, JavaScript, third-party scripts, API payloads, and database queries are treated as budgeted resources.**

> **Database performance is managed through bounded queries, suitable pagination, elimination of harmful N+1 patterns, appropriate indexes, execution-plan analysis, connection-pool management, and workload isolation. Caches are introduced only where measured benefit justifies their consistency complexity, with explicit key, scope, freshness, TTL, invalidation, and failure semantics.**

> **Performance optimization is evidence-driven. Teams observe production behavior, profile the actual bottleneck, make the smallest effective architectural or implementation change, and measure again. Complex caching, sharding, virtualization, memoization, edge execution, multi-region deployment, and other optimization mechanisms are adopted only when simpler approaches cannot satisfy demonstrated requirements.**

A production-grade performance architecture should make it easy to answer:

```text
What is the critical user journey?
What metric represents its performance?
What is its budget?
What do real users experience at p75/p95?
What is the LCP element?
What blocks interaction?
What causes layout shift?
How much JavaScript is shipped?
Which resources are critical?
Which resources can load later?
How many database queries occur?
Which query dominates latency?
Are result sizes bounded?
What is cached?
How is the cache invalidated?
Which dependency dominates server latency?
Can independent work execute concurrently?
Can noncritical work move to background processing?
How does performance behave on low-end devices?
How does it behave under load?
How do we detect a regression?
What measurement proves an optimization worked?
```

If those questions cannot be answered, performance is being managed reactively rather than engineered.

Two implementation details behind the standard are worth making explicit. Google’s current guidance says **INP should be ≤200 ms**, **LCP ≤2.5 s**, and **CLS ≤0.1**, judged at p75; INP also covers responsiveness throughout the page lifecycle, not merely initial load. citeturn441053search2turn441053search5

For loading policy, off-screen images and iframes are strong lazy-loading candidates, but likely above-the-fold/LCP images should **not** be lazy-loaded because doing so delays their discovery. citeturn208388search0turn208388search5 For versioned immutable static resources, long HTTP caching is appropriate; HTTP also provides `stale-while-revalidate` and `stale-if-error` semantics when the content’s freshness model permits them. citeturn208388search6

In the master hierarchy, **Performance** should sit immediately after Testing and before Observability:

**Architecture → Framework → Security → Authentication & Authorization → Data & Database → API → Routes → State Management → Forms & Validation → Error Handling & Resilience → Testing → Performance → Observability → Infrastructure & Deployment → Documentation → Governance.**
