---
id: "observability"
title: "Observability Guidelines — Gold Standard 2026"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["operations", "observability"]
applies_to: ["infra"]
related: []
legacy_number: 20
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 71827
provenance: baseline

---

For the implementation baseline, **OpenTelemetry** should be the default vendor-neutral model for traces, metrics, logs, resources, and semantic naming. Its log model explicitly supports correlating logs with traces through trace/span IDs, and its Semantic Conventions provide standardized naming across signals. citeturn217442search1turn217442search5turn217442search6

For reliability governance, the standard below follows the SLI → SLO model: measure user-relevant service behavior, define the target level, then use that target to drive operational decisions. citeturn217442search13

# Observability Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical standard for production observability across:

- applications;
- APIs;
- frontend clients;
- databases;
- queues;
- background workers;
- infrastructure;
- external dependencies;
- security events;
- distributed systems;
- AI services;
- scheduled jobs.

They govern:

- structured logs;
- metrics;
- distributed tracing;
- correlation IDs;
- telemetry context;
- dashboards;
- alerting;
- SLIs;
- SLOs;
- error budgets;
- audit logs;
- error monitoring;
- production debugging;
- telemetry retention;
- telemetry privacy;
- telemetry cost.

The objectives are to make production systems:

```text
Observable
Diagnosable
Measurable
Auditable
Alertable
Debuggable
Operationally understandable
```

The core principle is:

> **A production system is not complete if engineers cannot determine whether it is healthy, understand how users are affected, identify where a failure occurred, and safely investigate why.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented reason exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Observability exceptions SHOULD document:

```text
Reason
Missing visibility
Operational impact
Compensating mechanism
Owner
Review date
```

---

# 3. Observability Is Not Logging

Observability is the ability to understand system behavior from externally observable signals.

The canonical telemetry model includes:

```text
Logs
Metrics
Traces
Events
Profiles where useful
```

plus:

```text
Deployment metadata
Configuration context
Audit trails
User-impact measurements
```

---

# 4. Three Core Signals

The traditional primary signals are:

```text
Logs
Metrics
Traces
```

They answer different questions.

---

# 5. Logs

Logs answer questions such as:

```text
What happened?
What context was available?
Which error occurred?
What business/security event took place?
```

---

# 6. Metrics

Metrics answer:

```text
How much?
How often?
How fast?
How saturated?
Is this changing?
```

---

# 7. Traces

Traces answer:

```text
Where did time go?
Which services participated?
Which dependency failed?
What was the request path?
```

---

# 8. Signals Must Correlate

Observability signals SHOULD share enough common context to move between them.

Example:

```text
Alert
↓
Metric
↓
Trace
↓
Span
↓
Correlated logs
```

This is substantially more useful than isolated dashboards and log files.

---

# 9. OpenTelemetry Baseline

OpenTelemetry SHOULD be the default vendor-neutral telemetry model where platform support allows it.

Use standardized semantic conventions before inventing organization-specific naming.

---

# 10. Vendor Independence

Product/application telemetry SHOULD NOT unnecessarily depend on proprietary instrumentation APIs when a standard abstraction is suitable.

Backend storage/query tooling MAY remain vendor-specific.

---

# 11. Semantic Conventions

Use standard semantic attributes for concepts such as:

```text
service
HTTP
database
RPC
messaging
cloud
errors
```

where standardized definitions exist.

---

# 12. Semantic Version Discipline

Telemetry semantic conventions can evolve.

Pin and upgrade telemetry libraries/conventions deliberately rather than allowing inconsistent naming across services.

---

# 13. Resource Identity

Every telemetry signal SHOULD identify its originating resource where applicable.

Useful context includes:

```text
service.name
service.version
deployment.environment
region
instance
```

according to platform architecture.

---

# 14. Canonical Service Name

Every deployable service MUST have a stable canonical service name.

Avoid:

```text
api-new
api2
api-final
api-prod
```

as uncontrolled identities.

---

# 15. Environment

Telemetry MUST distinguish environments.

Examples:

```text
production
staging
development
test
```

Production dashboards must not accidentally combine test traffic.

---

# 16. Service Version

Telemetry SHOULD record application/release version.

This enables:

```text
error introduced in release X
latency changed after deployment Y
```

analysis.

---

# 17. Deployment Markers

Dashboards SHOULD display deployment/change markers for relevant services.

Operators should be able to correlate:

```text
error spike
+
deployment
```

without searching another system.

---

# 18. Observability by Design

Before implementing a critical feature, determine:

```text
What indicates success?
What indicates failure?
What should operators measure?
What context is needed to diagnose failure?
What should alert?
```

Do not add observability only after an incident.

---

# 19. Telemetry Ownership

Every production service MUST have an owner responsible for its:

```text
instrumentation
dashboards
alerts
SLOs where applicable
runbooks
```

---

# 20. Telemetry Is Production Code

Instrumentation requires:

```text
review
testing
versioning
maintenance
```

Poor instrumentation can cause:

```text
cost explosions
privacy incidents
performance regressions
misleading alerts
```

---

# 21. Structured Logging

Production application logs MUST be structured where operational tooling supports it.

---

# 22. Structured Means Schema

JSON alone does not automatically make a log structured.

A structured log requires stable:

```text
field names
types
semantics
```

---

# 23. Canonical Log Record

A typical application log may include:

```text
timestamp
severity
event.name
message
service.name
service.version
environment
trace_id
span_id
request_id
operation
error.type
```

plus safe domain context where required.

---

# 24. Timestamp

Logs MUST contain timestamps generated using a consistent machine-readable format.

Use UTC as the canonical storage/transport representation unless infrastructure imposes another standard.

---

# 25. Clock Synchronization

Production infrastructure SHOULD maintain reliable clock synchronization.

Distributed telemetry becomes difficult to correlate when host clocks drift significantly.

---

# 26. Severity

Use a small consistent severity model.

Canonical conceptual levels:

```text
DEBUG
INFO
WARN
ERROR
FATAL
```

where supported.

---

# 27. DEBUG

Use DEBUG for detailed diagnostic information not normally required during routine production operation.

---

# 28. INFO

Use INFO for meaningful normal lifecycle/business/operational events.

Do not log every function invocation.

---

# 29. WARN

WARN means:

```text
unexpected or degraded condition
but operation/system may continue
```

---

# 30. ERROR

ERROR represents a meaningful failed operation or unexpected error requiring investigation or explicit handling.

---

# 31. FATAL

FATAL means:

```text
process cannot safely continue
```

Use rarely.

---

# 32. Log-Level Inflation

Do not classify routine expected behavior as ERROR.

Examples:

```text
user entered invalid form
404 for missing optional resource
expected conflict
```

should not automatically generate production exception noise.

---

# 33. Expected Errors

Expected domain/client errors SHOULD use:

```text
structured events
metrics
appropriate lower-severity logs
```

rather than exception-level reporting by default.

---

# 34. Unexpected Errors

Unexpected failures SHOULD record enough context to diagnose:

```text
error type
stack
operation
trace
release
```

while protecting sensitive data.

---

# 35. Event Names

Important structured logs SHOULD use stable event names.

Example:

```text
project.created
auth.login_failed
billing.payment_failed
worker.job_failed
```

---

# 36. Event Name Stability

Do not encode dynamic values in event names.

Bad:

```text
user_918273_logged_in
```

Good:

```text
auth.login_succeeded
```

with identity as a separate safe attribute where appropriate.

---

# 37. Human Message

A log MAY include a human-readable message.

Machine queries MUST rely primarily on structured fields rather than parsing message prose.

---

# 38. Do Not Parse Log Text

Avoid operational queries such as:

```text
message contains "timeout from Stripe"
```

when stable fields could be:

```text
dependency.name
error.type
```

---

# 39. Structured Errors

Unexpected error logs SHOULD identify:

```text
error.type
error.code where applicable
exception information
```

using canonical semantics.

---

# 40. Stack Traces

Stack traces SHOULD be captured for unexpected programming failures where useful.

They MUST NOT be exposed directly to untrusted application users.

---

# 41. Cause Chains

Preserve meaningful error causes where runtime support allows.

Example:

```text
CheckoutFailed
← PaymentProviderTimeout
← SocketTimeout
```

---

# 42. Log Context

Useful request context MAY include:

```text
request_id
trace_id
route
method
status
duration
tenant where safe
actor category
```

---

# 43. Avoid Raw URLs as Metric Dimensions

Dynamic raw URL paths such as:

```text
/projects/893847
```

create unbounded cardinality.

Use normalized routes:

```text
/projects/{projectId}
```

for aggregation.

---

# 44. Request Logging

Applications MAY log request completion summaries.

Typical fields:

```text
method
normalized route
status
duration
request_id
trace_id
```

---

# 45. Do Not Log Entire Requests

Do not routinely log:

```text
request body
all headers
all cookies
```

for every request.

These frequently contain sensitive information.

---

# 46. Do Not Log Entire Responses

The same applies to response bodies.

Record only information required for operational purposes.

---

# 47. Secret Redaction

Logs MUST NOT contain:

```text
passwords
session IDs
access tokens
refresh tokens
API-key secrets
private keys
OTP values
recovery tokens
```

---

# 48. Credential Headers

Authorization/cookie headers MUST be:

```text
excluded
or
redacted
```

before entering telemetry systems.

---

# 49. Personal Data

PII in telemetry must be intentionally justified.

Prefer:

```text
internal opaque IDs
aggregated dimensions
```

over personal identifiers.

---

# 50. Email Addresses

Do not use email addresses as routine high-volume log/metric labels.

Use internal IDs where investigation genuinely requires identity correlation.

---

# 51. Sensitive Domain Data

Do not log:

```text
medical records
financial credentials
private message bodies
government identifiers
```

unless an explicit approved security/compliance use case requires it.

---

# 52. Redaction Before Export

Sensitive data SHOULD be removed as close to collection as practical.

Do not depend solely on analysts remembering not to query it.

---

# 53. Log Injection

Treat untrusted values as data.

Do not allow newline/control characters or crafted user input to manipulate log structure.

---

# 54. Log Schema

Shared platforms SHOULD define canonical logging fields.

Do not let every service independently invent:

```text
requestId
request_id
requestID
correlation
```

for the same concept.

---

# 55. Logging Library

Use the repository/platform canonical structured logging abstraction.

Avoid directly mixing multiple incompatible logging frameworks within one service.

---

# 56. Logging Performance

High-volume logging can increase:

```text
CPU
I/O
network
storage
cost
```

Instrument intentionally.

---

# 57. Hot-Loop Logging

Do not emit high-volume logs inside:

```text
per-row loops
per-pixel interactions
polling loops
```

without a clear diagnostic need.

---

# 58. Log Sampling

High-volume repetitive logs MAY be sampled.

Sampling MUST NOT eliminate critical:

```text
audit
security
billing
integrity
```

events.

---

# 59. Log Deduplication

Repeated identical operational errors MAY be aggregated/sampled while retaining accurate counts through metrics.

---

# 60. Logs Are Not Metrics

Do not rely exclusively on log counting for every operational number when a metric is the appropriate signal.

---

# 61. Log Retention

Retention SHOULD be based on:

```text
operational need
security need
legal requirement
privacy
cost
```

---

# 62. Retention Classes

Different telemetry may require different retention.

Example:

```text
debug logs
→ short

operational logs
→ medium

audit records
→ policy-defined
```

---

# 63. Delete Expired Telemetry

Do not retain telemetry indefinitely without a defined need.

---

# 64. Metrics

Metrics represent numerical measurements over time.

Use them for:

```text
rates
counts
latency
saturation
capacity
business outcomes
```

---

# 65. Metric Types

Understand the underlying metric/instrument semantics.

Common concepts include:

```text
Counter
Gauge
Histogram
```

and framework-specific equivalents.

---

# 66. Counters

Counters SHOULD represent monotonically accumulating events.

Examples:

```text
requests
errors
jobs completed
```

---

# 67. Gauges

Gauges represent current state.

Examples:

```text
queue depth
active connections
memory use
```

---

# 68. Histograms

Histograms are appropriate for distributions such as:

```text
latency
payload size
job duration
```

---

# 69. Latency Histograms

Use histograms rather than storing only:

```text
average response time
```

so percentiles/distributions can be analyzed.

---

# 70. Metric Naming

Metric names MUST be stable and semantic.

Avoid embedding environment/service identity in the metric name when those belong as resource attributes.

---

# 71. Units

Metrics MUST use explicit consistent units.

Examples:

```text
seconds
bytes
requests
items
```

Avoid ambiguous metrics like:

```text
request_duration
```

where unit is unclear.

---

# 72. Cardinality

Metric label cardinality MUST be controlled.

This is one of the most important observability constraints.

---

# 73. High-Cardinality Labels

Avoid using:

```text
user ID
request ID
trace ID
raw URL
email
random UUID
```

as metric dimensions.

---

# 74. Good Metric Dimensions

Useful bounded dimensions may include:

```text
normalized route
method
status class
region
dependency
operation type
```

where the cardinality remains controlled.

---

# 75. Cardinality Review

Every new metric label SHOULD answer:

```text
How many distinct values can this produce?
```

---

# 76. Unbounded Cardinality

Metrics capable of generating unlimited label values MUST NOT be deployed without a deliberate backend/cost strategy.

---

# 77. Metric Explosion

One metric with:

```text
20 services
× 1000 tenants
× 100 routes
× 20 error types
```

can create massive series count.

Evaluate dimension combinations, not labels independently.

---

# 78. Tenant Metrics

Per-tenant metrics SHOULD only be created where business/operations genuinely need them and tenant cardinality is manageable.

Alternative:

```text
logs
traces
analytics
```

may be more appropriate.

---

# 79. RED Method

For request-driven services, a useful baseline is:

```text
Rate
Errors
Duration
```

---

# 80. USE Method

For infrastructure/resources, useful baseline:

```text
Utilization
Saturation
Errors
```

---

# 81. RED and USE Are Heuristics

Do not mechanically collect every possible signal.

Use what answers operational questions.

---

# 82. Request Rate

Measure requests/operations per unit time for important interfaces.

---

# 83. Error Rate

Distinguish meaningful server/service failures from expected client failures.

---

# 84. Duration

Track latency distributions by meaningful operation.

---

# 85. Saturation

Saturation indicators may include:

```text
queue wait
connection wait
CPU throttling
worker backlog
thread exhaustion
```

---

# 86. Business Metrics

Operational observability MAY include critical business-process measurements.

Examples:

```text
checkout success rate
successful signup
payment completion
document processing completion
```

---

# 87. Business vs Analytics

Observability business metrics should answer:

```text
Is the product/service functioning?
```

They are distinct from broad product analytics.

---

# 88. Never Include Secret Data in Metric Labels

Metric systems often replicate and retain data broadly.

Sensitive values are inappropriate dimensions.

---

# 89. Metrics Aggregation

Use aggregation windows appropriate to the operational problem.

Avoid smoothing away short severe incidents.

---

# 90. Percentiles

Track useful percentiles such as:

```text
p50
p75
p95
p99
```

depending on system scale/risk.

---

# 91. Average Latency

Average latency alone is insufficient.

Tail behavior matters.

---

# 92. Apdex

Apdex MAY be used as a supplemental experience metric.

Do not substitute it for service-specific user outcome measures without justification.

---

# 93. Frontend Metrics

Web applications SHOULD observe applicable:

```text
Core Web Vitals
page errors
navigation failures
API failures
```

according to privacy/performance policy.

---

# 94. Real User Monitoring

RUM SHOULD be considered for user-facing web applications.

It reveals real:

```text
device
network
browser
regional
route
```

performance differences.

---

# 95. RUM Sampling

Client telemetry MAY be sampled.

Sampling should preserve sufficient data for meaningful percentile/regression analysis.

---

# 96. Client Privacy

Do not capture DOM contents or user text indiscriminately through frontend telemetry.

---

# 97. Session Replay

Session replay is highly sensitive.

If used, it requires separate:

```text
privacy
security
masking
retention
access
```

governance.

It MUST NOT be enabled casually.

---

# 98. Database Metrics

Observe:

```text
query latency
connection utilization
connection wait
locks
deadlocks
replication lag
transaction rate
storage
```

as applicable.

---

# 99. Query Observability

Slow/important queries SHOULD be identifiable by normalized operation/fingerprint rather than raw SQL values.

---

# 100. Query Parameters

Do not record sensitive raw query parameters solely for performance analysis.

---

# 101. Queue Metrics

Queues SHOULD expose:

```text
depth
oldest-message age
processing rate
failure rate
retry rate
DLQ depth
```

---

# 102. Queue Age

Oldest-message age is often more meaningful than raw queue count.

---

# 103. Worker Metrics

Workers SHOULD expose:

```text
jobs started
jobs completed
jobs failed
duration
concurrency
```

where operationally useful.

---

# 104. Scheduled Job Metrics

Critical scheduled jobs SHOULD expose:

```text
last successful run
duration
failure
next/expected run
```

or equivalent monitoring.

---

# 105. Missing Job Detection

Observability must detect:

```text
job never ran
```

not only:

```text
job ran and failed
```

---

# 106. External Dependency Metrics

Critical dependencies SHOULD expose internal measurements for:

```text
request rate
latency
failure
timeout
rate limiting
circuit state
```

---

# 107. Dependency Name

Use stable logical dependency names.

Avoid making dashboards dependent on raw hostname values that may change.

---

# 108. Third-Party Status

Provider status pages MAY supplement internal observations.

They do not replace measuring what your application experiences.

---

# 109. Distributed Tracing

Tracing SHOULD be used where requests/jobs cross enough boundaries that individual logs cannot explain behavior efficiently.

---

# 110. Trace

A trace represents an end-to-end operation.

Example:

```text
Browser/API request
↓
Application
↓
Database
↓
Payment API
↓
Queue
```

---

# 111. Span

A span represents a meaningful operation within a trace.

---

# 112. Span Naming

Span names SHOULD have low-cardinality stable operation names.

Good:

```text
GET /projects/{projectId}
```

Bad:

```text
GET /projects/prj_839201
```

---

# 113. Span Attributes

Include useful bounded context such as:

```text
HTTP method
normalized route
DB system
operation
dependency
status
```

using standard semantic conventions.

---

# 114. Do Not Put Secrets in Spans

Trace attributes are telemetry and require the same data-protection rules as logs.

---

# 115. Trace Errors

Failed spans SHOULD record appropriate error state/type.

Do not mark expected successful protocol outcomes as trace errors incorrectly.

---

# 116. Trace Duration

Trace timing should enable operators to identify which operation dominates total latency.

---

# 117. Root Span

Every trace SHOULD have a clear root operation.

---

# 118. Context Propagation

Trace context MUST propagate through supported synchronous boundaries.

Examples:

```text
HTTP
RPC
```

---

# 119. Async Context Propagation

Where useful, propagate or link trace context across:

```text
queues
events
background jobs
```

using the platform's canonical semantics.

---

# 120. Trace Links

Trace links MAY represent causality that does not fit a strict parent/child structure.

Useful for:

```text
batch processing
fan-in
queue processing
```

---

# 121. Request ID vs Trace ID

These concepts may coexist.

```text
Trace ID
→ distributed observability identity

Request ID
→ application/support request identity
```

Do not invent redundant identifiers without need.

---

# 122. Correlation ID

A correlation identifier provides an operator-visible way to connect related telemetry.

Where distributed tracing exists, trace identity SHOULD normally provide the primary technical correlation mechanism.

---

# 123. User-Facing Support ID

Unexpected errors MAY expose a safe support/request identifier.

Example:

```text
Reference: req_...
```

This must not reveal secrets.

---

# 124. Propagate Request IDs

If a canonical request/correlation ID exists, propagate it through internal boundaries where useful.

---

# 125. Client-Supplied Correlation IDs

Treat externally supplied IDs as untrusted.

Do not allow arbitrary user input to overwrite security-sensitive internal correlation context.

---

# 126. Baggage

Distributed context baggage MAY carry small contextual values.

Use sparingly.

---

# 127. Baggage Security

Baggage can propagate broadly.

Never place:

```text
secrets
sensitive PII
large payloads
```

into baggage.

---

# 128. Trace Sampling

Distributed tracing usually requires sampling at meaningful scale.

---

# 129. Head Sampling

Head sampling decides early whether to retain a trace.

It is operationally simple but may miss unusual failures.

---

# 130. Tail Sampling

Tail sampling can prioritize traces based on completed behavior.

Examples:

```text
errors
high latency
specific critical operations
```

---

# 131. Sampling Strategy

Critical systems SHOULD define sampling intentionally.

Do not depend indefinitely on whichever SDK default was installed.

---

# 132. Error Traces

Unexpected failed requests SHOULD have a substantially higher chance of trace retention than ordinary successful traffic.

---

# 133. Slow Traces

Tail-sampling policy MAY retain high-latency traces.

---

# 134. Sampling Bias

Sampling changes statistical interpretation.

Ensure teams understand which telemetry is complete versus sampled.

---

# 135. Trace Cost

Trace volume can become expensive.

Control:

```text
sample rate
span count
attributes
retention
```

---

# 136. Over-Instrumentation

Do not create a span for every:

```text
tiny function
loop iteration
property access
```

Trace meaningful operations.

---

# 137. Profiles

Continuous/runtime profiling MAY supplement observability for performance-sensitive systems.

Use when it answers:

```text
Where is CPU spent?
Where is memory allocated?
```

more effectively than traces.

---

# 138. Profiling Privacy

Profiles can expose code paths and metadata.

Apply normal telemetry access controls.

---

# 139. Dashboards

Dashboards should answer operational questions.

They are not collections of every available graph.

---

# 140. Dashboard Question

Every dashboard panel should answer something like:

```text
Are users succeeding?
Is latency degraded?
Which dependency is unhealthy?
Is capacity near saturation?
```

---

# 141. Service Overview Dashboard

Every critical service SHOULD have an overview dashboard.

---

# 142. Recommended Service Overview

Typical panels:

```text
Traffic
Success/error rate
Latency
Saturation
Dependency health
Deployment markers
```

---

# 143. User-Journey Dashboards

Critical journeys SHOULD have end-to-end dashboards.

Examples:

```text
Login
Checkout
Signup
Upload
Report generation
```

---

# 144. User Outcome First

Dashboard hierarchy SHOULD begin with user/service outcomes before low-level infrastructure metrics.

---

# 145. Drill-Down

Dashboard flow should support:

```text
User symptom
↓
Service
↓
Dependency
↓
Trace/log
```

---

# 146. Dashboard Time Range

Panels should behave correctly across useful time ranges.

Do not construct queries that become unusably expensive over longer windows.

---

# 147. Dashboard Units

Every graph should have clear:

```text
unit
legend
title
```

---

# 148. Dashboard Axes

Avoid misleading y-axis scaling where it distorts operational interpretation.

---

# 149. Dual Axes

Use dual-axis graphs sparingly.

They can create misleading apparent relationships.

---

# 150. Dashboard Noise

Do not display dozens of irrelevant metrics simply because they are available.

---

# 151. Dashboard Ownership

Critical dashboards MUST have an owner.

---

# 152. Dashboard as Code

Dashboard definitions SHOULD be version-controlled where platform tooling supports it.

---

# 153. Dashboard Review

Changes to critical dashboards/alerts SHOULD receive code/review discipline similar to other operational configuration.

---

# 154. SLIs

A Service Level Indicator measures an aspect of service behavior that matters to users.

---

# 155. SLI Examples

Useful SLIs may include:

```text
availability
request success
latency
freshness
durability
correctness
```

depending on the service.

---

# 156. User-Centric SLIs

Prefer indicators close to actual user outcomes.

Example:

```text
successful checkout requests
/
valid checkout attempts
```

rather than:

```text
server process is running
```

---

# 157. Availability SLI

Availability SHOULD represent usable service success, not merely host uptime.

---

# 158. Latency SLI

Latency SLIs SHOULD identify which requests count as sufficiently fast.

---

# 159. Freshness SLI

Data pipelines/search/indexes may require freshness indicators.

Example:

```text
percentage of documents indexed within target delay
```

---

# 160. Durability SLI

Systems managing critical stored data MAY require durability/error-loss objectives.

---

# 161. Correctness SLI

Where technically measurable, correctness can be a meaningful SLI.

Do not claim it if the metric cannot actually detect incorrect output.

---

# 162. SLOs

A Service Level Objective defines the target level for an SLI over a defined window.

---

# 163. SLO Example

Conceptually:

```text
99.9% of valid API requests succeed
over rolling 30 days
```

---

# 164. SLO Window

Every SLO requires a time window.

Examples:

```text
7 days
28 days
30 days
calendar month
```

Use one organization convention where practical.

---

# 165. SLO Scope

Specify:

```text
service
operation population
excluded traffic
measurement source
```

clearly.

---

# 166. SLO Denominator

Be explicit about what counts in the denominator.

Ambiguous denominators create meaningless SLOs.

---

# 167. Valid Requests

Do not penalize service availability for clearly invalid client requests unless the product definition intentionally treats them as service failures.

---

# 168. User-Caused Errors

Typical:

```text
400
401
403
```

should not automatically count as server availability failures.

The exact SLI classification depends on product semantics.

---

# 169. Server Errors

Unexpected:

```text
5xx
timeouts
invalid output
```

are typical service failures.

---

# 170. SLO Target Selection

SLO targets should reflect:

```text
user need
business need
architecture
cost
```

not prestige.

---

# 171. Five Nines Is Not Automatically Better

Higher SLOs can dramatically increase:

```text
engineering cost
operational complexity
infrastructure cost
```

Choose justified targets.

---

# 172. SLO Must Be Achievable

An SLO above the reliability of an unavoidable dependency requires architectural compensation.

---

# 173. SLO ≠ SLA

Distinguish:

```text
SLI
→ measurement

SLO
→ internal/operational target

SLA
→ contractual commitment/consequence
```

---

# 174. Error Budget

The error budget represents how much unreliability the SLO permits.

---

# 175. Error Budget Purpose

Error budgets help balance:

```text
reliability
delivery velocity
```

using measurable service health.

---

# 176. Error Budget Policy

Critical services SHOULD define what happens when error-budget consumption becomes excessive.

Potential responses:

```text
investigate
pause risky rollout
prioritize reliability
reduce change velocity
```

---

# 177. Error Budget Is Not Permission to Fail Deliberately

It represents tolerated reliability variance, not a goal to consume fully.

---

# 178. Burn Rate

Alerting SHOULD consider the rate at which the error budget is being consumed.

---

# 179. Fast Burn

Fast burn indicates severe degradation capable of exhausting budget rapidly.

It deserves fast response.

---

# 180. Slow Burn

Slow sustained degradation may require investigation without immediate paging.

---

# 181. Multi-Window Burn Alerts

Mature SLO alerting SHOULD consider multiple windows to distinguish:

```text
severe short incident
```

from:

```text
persistent lower-rate degradation
```

---

# 182. SLO Dashboard

Critical services SHOULD expose:

```text
current SLI
SLO target
error-budget remaining
burn rate
```

---

# 183. SLO Review

Review SLOs periodically.

An SLO that:

```text
never matters
always passes trivially
always fails
```

may be poorly designed.

---

# 184. Alerting

Alerts exist to trigger human or automated action.

If nobody needs to act:

> It should probably not page.

---

# 185. Alert Types

Distinguish:

```text
Page
Ticket
Notification
Dashboard-only signal
```

---

# 186. Paging

Pages are for urgent conditions requiring timely human intervention.

---

# 187. Ticket Alerts

Nonurgent actionable issues MAY create tickets/work items.

---

# 188. Informational Notifications

Informational events SHOULD not use the same channel/severity as incidents.

---

# 189. Symptom-Based Alerts

Prefer alerting on:

```text
user-visible symptoms
SLO impact
```

over internal causes alone.

---

# 190. Cause Alerts

Cause-based alerts may supplement user-impact alerts when early intervention reliably prevents impact.

---

# 191. CPU Alert Anti-Pattern

Avoid paging simply because:

```text
CPU > 80%
```

if there is no evidence of service impact or imminent capacity failure.

---

# 192. Alert Actionability

Every alert SHOULD answer:

```text
What is wrong?
What is affected?
How urgent is it?
Where do I investigate?
```

---

# 193. Alert Runbook

Critical alerts SHOULD link to a runbook.

---

# 194. Alert Owner

Every alert MUST have an owner/team.

---

# 195. No Orphan Alerts

An alert routed to:

```text
nobody
old team
unmonitored channel
```

is worse than no alert because it creates false confidence.

---

# 196. Alert Threshold

Thresholds SHOULD derive from:

```text
SLO
baseline
capacity limit
known failure condition
```

rather than arbitrary values.

---

# 197. Static Thresholds

Static thresholds work for predictable limits.

---

# 198. Dynamic/Anomaly Detection

Anomaly detection MAY supplement fixed thresholds for highly variable signals.

Do not assume machine-detected anomalies are automatically actionable.

---

# 199. Alert Duration

Require conditions to persist for a suitable duration when brief spikes are harmless.

---

# 200. Immediate Alerts

Some events require immediate alerting regardless of duration.

Examples:

```text
break-glass account used
critical signing key compromised
mass data deletion detected
```

---

# 201. Alert Deduplication

Related symptoms SHOULD be grouped/deduplicated where possible.

---

# 202. Alert Storm

One underlying outage should not generate:

```text
500 independent pages
```

for every downstream symptom.

---

# 203. Dependency Alerting

When a shared dependency fails, alert routing should identify the likely shared cause.

---

# 204. Alert Suppression

Temporary alert suppression MAY be appropriate during planned maintenance.

It must be:

```text
scoped
time-bounded
auditable
```

---

# 205. Never Disable Alerts Permanently to Stop Noise

Fix:

```text
threshold
signal
routing
instrumentation
```

instead.

---

# 206. Alert Quality

Track alert quality where useful.

Potential measurements:

```text
actionable percentage
false-positive rate
pages per incident
```

---

# 207. Alert Fatigue

Too many low-value alerts reduce response quality to real incidents.

---

# 208. Error Monitoring

Unexpected application exceptions SHOULD flow into a centralized error-monitoring system.

---

# 209. Error Grouping

Error monitoring SHOULD group equivalent failures rather than produce one issue per request.

---

# 210. Error Fingerprint

Grouping SHOULD rely on stable technical characteristics.

Do not group solely by raw message when messages contain dynamic values.

---

# 211. Release Association

Errors SHOULD be associated with:

```text
release/version
environment
service
```

---

# 212. First Seen

Error tooling SHOULD expose:

```text
first seen
last seen
frequency
affected releases
```

where platform supports it.

---

# 213. Regression Detection

Previously resolved errors that reappear after deployment SHOULD be detectable.

---

# 214. Error Volume

A single exception can matter, but volume/rate provides additional prioritization.

---

# 215. User Impact

Where privacy allows, error monitoring MAY estimate:

```text
affected sessions
affected requests
affected tenants
```

without recording sensitive identity unnecessarily.

---

# 216. Source Maps

Frontend error monitoring SHOULD use securely managed source maps where this materially improves diagnosis.

---

# 217. Source Map Exposure

Do not expose source maps publicly when organizational/security policy requires private upload/storage.

---

# 218. Error Context

Useful context can include:

```text
route
browser
release
trace
request
feature flag
```

where safe.

---

# 219. Breadcrumbs

Error-monitoring breadcrumbs MAY provide preceding operational context.

Do not collect sensitive form values or private content casually.

---

# 220. Handled Errors

Do not report every expected handled error into exception monitoring.

---

# 221. Unexpected Client Errors

Unexpected browser exceptions SHOULD be monitored for major user-facing applications.

---

# 222. Promise/Rejection Monitoring

Unhandled asynchronous client/server failures SHOULD be visible through the runtime/platform error pipeline.

---

# 223. Audit Logs

Audit logging is distinct from ordinary operational logging.

---

# 224. Audit Purpose

Audit logs answer:

```text
Who did what
To which resource
When
In which tenant/context
With what result
```

---

# 225. Audit Events

Typical auditable actions include:

```text
role change
permission change
member removal
API key creation/revocation
data export
ownership transfer
impersonation
security-setting changes
high-impact deletion
```

---

# 226. Audit Actor

Every audit event SHOULD identify the true actor.

---

# 227. Subject

If actor acts on behalf of another identity, record both.

Example:

```text
support_admin
acting_as
customer_user
```

---

# 228. Audit Target

Identify affected:

```text
resource
tenant
object type
```

where applicable.

---

# 229. Audit Result

Record:

```text
attempted/succeeded/failed
```

where useful.

---

# 230. Audit Timestamp

Audit events require trustworthy timestamps.

---

# 231. Audit Reason

High-risk administrative actions MAY require a reason/ticket identifier.

---

# 232. Audit Before/After

Selected configuration changes MAY record safe before/after representations.

Do not copy secrets into audit logs.

---

# 233. Audit Immutability

Audit trails SHOULD be protected against unauthorized:

```text
modification
deletion
```

---

# 234. Audit Access

Access to audit data MUST itself be restricted and, where appropriate, audited.

---

# 235. Audit Retention

Audit retention is governed separately from ordinary debug log retention.

Consider:

```text
security
compliance
legal
privacy
contractual
```

requirements.

---

# 236. Audit Availability

Users/tenant administrators MAY receive access to appropriate tenant audit history.

Platform-internal fields should remain protected.

---

# 237. Audit vs Security Logs

Audit logs and security-detection logs overlap but have distinct purposes.

Do not force everything into one undifferentiated stream.

---

# 238. Security Logging

Security-sensitive applications SHOULD log meaningful events such as:

```text
authentication changes
authorization failures where suspicious
credential creation/revocation
security policy changes
unexpected validation anomalies
```

according to Security standards.

---

# 239. Security Signal Noise

Do not make every routine 403 a critical security alert.

Context and volume matter.

---

# 240. Tamper Protection

Critical security/audit logs should be protected against tampering in transit and at rest.

---

# 241. Central Collection

Production telemetry SHOULD be centrally searchable or queryable.

Local server files alone are insufficient in ephemeral/distributed systems.

---

# 242. Telemetry Pipeline

Canonical flow:

```text
Application/Infrastructure
↓
Telemetry SDK/Agent
↓
Collector/Pipeline
↓
Processing/Redaction/Sampling
↓
Backend Storage
↓
Dashboards/Alerts/Investigation
```

---

# 243. Collector

A telemetry collector/gateway MAY centralize:

```text
export
redaction
sampling
routing
enrichment
```

---

# 244. Collector High Availability

If telemetry is operationally critical, collector infrastructure SHOULD be sufficiently resilient.

---

# 245. Telemetry Failure Must Not Take Product Down

Routine observability export failure MUST NOT normally make the business operation fail.

---

# 246. Telemetry Backpressure

Telemetry pipelines must have bounded:

```text
queues
memory
disk buffering
```

so an exporter outage cannot exhaust the application.

---

# 247. Drop Policy

If telemetry must be dropped during overload, prioritize retaining:

```text
errors
critical security events
audit data
```

according to architecture.

Audit data requiring guaranteed durability may require a separate pipeline.

---

# 248. Export Timeout

Telemetry export calls require bounded timeouts.

---

# 249. Async Export

Application request paths SHOULD NOT synchronously wait on remote telemetry storage.

---

# 250. Batch Export

Use batching where supported to reduce export overhead.

---

# 251. Shutdown Flush

Applications SHOULD attempt bounded flushing of important buffered telemetry during graceful shutdown.

---

# 252. Telemetry Health

Monitor the observability system itself.

Examples:

```text
dropped spans
export failures
collector queue
ingestion errors
```

---

# 253. Missing Telemetry

A silent absence of data may itself represent a failure.

---

# 254. Heartbeats

Critical scheduled/infrequent systems MAY emit heartbeat/success signals to detect absence.

---

# 255. Cardinality Governance

Cardinality is an explicit operational/cost concern.

Every telemetry review SHOULD consider it.

---

# 256. Cardinality Budget

Large systems SHOULD establish telemetry cardinality budgets or practical guardrails.

---

# 257. Attribute Allowlist

For high-volume signals, use approved attribute sets rather than arbitrary context dumping.

---

# 258. Dynamic Attribute Names

Never generate telemetry field names dynamically from user/resource input.

Values may be dynamic within controlled semantics; schema should remain stable.

---

# 259. Cost Governance

Observability has real infrastructure cost.

Track cost by:

```text
signal
service
team
retention
```

where useful.

---

# 260. Telemetry Volume

Measure:

```text
logs/day
metric series count
spans/sec
trace retention
```

for major systems.

---

# 261. Cost Optimization Order

Prefer:

```text
remove useless telemetry
↓
reduce cardinality
↓
sample
↓
shorten retention
↓
compress/archive
```

before sacrificing critical visibility.

---

# 262. Cost vs Incident Capability

Do not eliminate the telemetry required to diagnose critical incidents merely to reduce storage cost.

---

# 263. Debug Logs

Verbose debugging SHOULD be disabled by default in production unless specifically justified.

---

# 264. Temporary Debug Logging

Temporary production diagnostics MAY be enabled when:

```text
scoped
time-limited
reviewed
safe
```

---

# 265. Debug Logging Expiry

Temporary verbose instrumentation MUST have an explicit removal/expiry path.

---

# 266. Dynamic Log Levels

If runtime log-level adjustment exists, it must be:

```text
authorized
auditable
bounded
```

---

# 267. Production Debugging Principle

Production debugging MUST prioritize:

```text
Safety
Read-only observation
Minimal blast radius
Auditability
Reversibility
```

---

# 268. Observe Before Mutating

Production investigation order:

```text
Dashboard
↓
Metrics
↓
Traces
↓
Logs
↓
Safe read-only queries
↓
Controlled intervention
```

---

# 269. No Debugging by Random Mutation

Do not modify production data/configuration merely to see what happens.

---

# 270. No Ad Hoc Print Debugging

Do not ship uncontrolled:

```text
console.log(...)
```

containing arbitrary production objects or secrets.

Use structured controlled telemetry.

---

# 271. Production Shell Access

Direct shell access to production SHOULD be minimized.

Prefer managed operational tooling.

---

# 272. Named Access

Production debugging access MUST use identifiable individual accounts.

Shared credentials are prohibited.

---

# 273. Least Privilege

Engineers receive only the production access required for their role.

---

# 274. Just-in-Time Access

Sensitive production access SHOULD be temporary/JIT where organizational infrastructure supports it.

---

# 275. Break-Glass Access

Emergency high-privilege access must be:

```text
rare
strongly authenticated
audited
alerted
reviewed
```

---

# 276. Production Database Access

Direct production DB access SHOULD be restricted.

Use:

```text
read replicas
controlled query tools
admin tooling
```

where practical.

---

# 277. Read-Only First

Investigations SHOULD begin with read-only access.

---

# 278. Production Queries

Ad hoc production queries MUST consider:

```text
full scans
locks
CPU
replica impact
sensitive output
```

---

# 279. Query Limits

Operational query tools SHOULD apply:

```text
timeouts
row limits
read-only constraints
```

where practical.

---

# 280. Sensitive Data During Debugging

Operational necessity does not authorize unrestricted viewing of customer data.

Data-access policies still apply.

---

# 281. No Production Data Copying

Do not download production datasets to personal machines for debugging without explicit authorized process.

---

# 282. Screenshots

Incident screenshots can contain sensitive information.

Treat them according to data-handling policy.

---

# 283. Temporary Scripts

Emergency production scripts require:

```text
review where practical
dry-run
scope
audit
rollback/recovery plan
```

---

# 284. One-Off Data Fix

A data repair should preferably become:

```text
version-controlled script
migration
admin operation
```

rather than an unrecorded console command.

---

# 285. Dry Run

High-impact repair tooling SHOULD offer dry-run/preview where practical.

---

# 286. Data Repair Audit

Record:

```text
actor
reason
affected scope
time
result
```

for consequential production repair.

---

# 287. Feature Flags During Incident

Feature flags MAY disable problematic functionality quickly.

Changes must be:

```text
authorized
auditable
reversible
```

---

# 288. Kill Switch

Critical integrations/features MAY require operational kill switches.

They should have explicit observability.

---

# 289. Incident Debugging

During incidents, preserve:

```text
timeline
hypotheses
changes
observations
```

rather than relying on memory.

---

# 290. Correlate Changes

Investigation SHOULD examine:

```text
deployments
config changes
feature flags
traffic changes
dependency incidents
```

near onset.

---

# 291. Change Events

Operationally significant changes SHOULD produce deploy/configuration events that can be overlaid on telemetry.

---

# 292. Production Sampling Changes

Sampling changes during an incident may be useful.

They must consider:

```text
cost
performance
privacy
```

and be reverted afterward.

---

# 293. Production Debug Headers

Internal diagnostic headers/endpoints MUST NOT expose sensitive information to arbitrary users.

---

# 294. Debug Endpoints

Production debug endpoints should be absent or strongly restricted.

---

# 295. Profiling Production

Production profiling MAY be performed using low-overhead approved tooling.

Do not attach invasive debuggers casually to critical processes.

---

# 296. Heap Dumps

Heap/core dumps can contain:

```text
secrets
PII
credentials
```

Treat them as highly sensitive artifacts.

---

# 297. Incident Artifact Retention

Incident telemetry/artifacts should follow defined security and retention rules.

---

# 298. Dashboard During Incident

Incident responders SHOULD have a known service dashboard rather than creating every query from scratch.

---

# 299. Runbooks

Alerts for critical services SHOULD reference runbooks.

---

# 300. Runbook Structure

Useful runbook:

```text
Meaning of alert
Likely causes
Initial checks
Dashboard links
Safe remediation
Escalation
Recovery verification
```

---

# 301. Observability and Incident Response

Observability should make it possible to answer:

```text
When did impact start?
Who is affected?
How severe is it?
Which component is failing?
What changed?
Is mitigation working?
Has recovery completed?
```

---

# 302. Recovery Verification

Do not close an incident simply because an error disappeared.

Verify:

```text
SLIs recovered
backlog draining
dependency healthy
error rate normal
reconciliation complete
```

---

# 303. Post-Incident Review

After meaningful incidents, identify telemetry gaps.

Ask:

```text
What did we wish we could see?
Which alert was late/noisy?
Which correlation was missing?
```

---

# 304. Observability Improvement

Incident action items MAY include:

```text
new metric
better trace attribute
new dashboard
alert correction
additional audit event
```

when they close a real diagnostic gap.

---

# 305. Synthetic Monitoring

Critical public workflows MAY use synthetic monitoring.

Examples:

```text
login availability
checkout probe
public API health
```

---

# 306. Synthetic Monitoring Is External

Synthetic monitoring SHOULD execute from outside the application boundary where the objective is end-user availability.

---

# 307. Synthetic Accounts

Use dedicated controlled test accounts/tenants.

Do not use real customer identities.

---

# 308. Synthetic Side Effects

Avoid uncontrolled:

```text
payments
emails
customer notifications
```

from synthetic monitoring.

---

# 309. Health Endpoints

Health endpoints should expose what orchestration needs—not a complete internal diagnostic report.

---

# 310. Liveness

Liveness answers:

```text
Should this process be restarted?
```

---

# 311. Readiness

Readiness answers:

```text
Can this instance safely receive traffic?
```

---

# 312. Health Privacy

Health endpoints MUST NOT expose:

```text
connection strings
secrets
database topology
stack traces
```

publicly.

---

# 313. Frontend Error Correlation

Where possible, frontend error reports SHOULD correlate to backend request/trace identifiers.

---

# 314. API Correlation

API responses MAY expose a safe request ID for support/debugging.

---

# 315. Database Correlation

Database spans/query fingerprints SHOULD correlate with originating requests where tracing support exists.

---

# 316. Queue Correlation

Job/message processing SHOULD include durable operation/message identity plus trace linkage where appropriate.

---

# 317. Webhook Correlation

Webhook processing SHOULD retain:

```text
provider event ID
internal request/trace
processing result
```

without logging signature secrets.

---

# 318. Idempotency Correlation

High-impact writes MAY record a safe hashed/reference form of idempotency identity where needed for investigation.

Do not expose reusable credentials.

---

# 319. Authentication Observability

Authentication systems SHOULD monitor:

```text
login success
login failure
MFA challenges
recovery activity
session revocation
```

at appropriate aggregate levels.

---

# 320. Authorization Observability

Monitor unusual:

```text
access denials
cross-tenant attempts
privilege changes
```

according to security requirements.

---

# 321. Security vs Operational Dashboards

Security detection may require separate dashboards/access from general service operations.

---

# 322. Payment Observability

Payment workflows SHOULD expose states such as:

```text
attempted
provider accepted
confirmed
failed
unknown
reconciled
```

where architecture supports them.

---

# 323. Unknown Financial Outcome

Unknown payment outcomes require high-quality tracing/reconciliation visibility.

Do not infer failure merely because the request timed out.

---

# 324. AI Observability

AI-backed functionality requires additional telemetry.

Potential signals:

```text
model/provider
latency
token/usage volume
tool invocation
failure type
fallback
cost
```

subject to privacy/security policy.

---

# 325. AI Prompt Logging

Do not automatically log full user prompts or model responses.

They may contain:

```text
PII
secrets
confidential business content
```

---

# 326. AI Content Telemetry

Prefer metadata such as:

```text
model
token counts
latency
outcome
safe operation IDs
```

unless content capture is explicitly approved.

---

# 327. AI Tool Calls

Privileged AI tool actions SHOULD be auditable.

---

# 328. AI Cost

AI features SHOULD monitor cost-related usage where financially material.

---

# 329. AI Fallback

Record when:

```text
fallback model
fallback provider
```

is used so quality/availability behavior can be analyzed.

---

# 330. AI Safety Events

Security/safety-relevant events MAY require a separate controlled telemetry path.

---

# 331. Multi-Tenant Observability

Tenant identity may be useful for diagnosis but can create:

```text
cardinality
privacy
access-control
```

problems.

Use deliberately.

---

# 332. Tenant Dashboards

Per-tenant operational views MAY be appropriate for enterprise support.

Prefer queryable logs/traces rather than unbounded per-tenant metric series at large scale.

---

# 333. No Cross-Tenant Telemetry Exposure

Customer-facing observability must never expose another tenant's data.

---

# 334. Customer Observability

Enterprise products MAY expose:

```text
audit history
usage
API logs
webhook delivery history
```

with strict tenant authorization.

---

# 335. Support Diagnostics

Support tools SHOULD expose curated diagnostics rather than granting unrestricted access to internal logging systems.

---

# 336. Observability Security

Telemetry platforms are sensitive systems.

They may contain:

```text
architecture
identifiers
errors
customer metadata
security events
```

---

# 337. Telemetry Access

Use:

```text
SSO
MFA
RBAC
least privilege
```

for observability platforms.

---

# 338. Telemetry Export Security

Use encrypted transport when exporting telemetry across untrusted networks.

---

# 339. Telemetry Storage

Protect stored telemetry according to its data classification.

---

# 340. Telemetry Access Audit

Sensitive log/audit-system access SHOULD itself be auditable.

---

# 341. Telemetry Injection

Do not allow untrusted external callers to fabricate trusted internal security/audit telemetry.

---

# 342. Source Trust

Telemetry from less-trusted systems must be treated accordingly.

Do not assume all reported metadata is trustworthy.

---

# 343. Metric Spoofing

Security decisions SHOULD NOT rely exclusively on unauthenticated client-provided telemetry.

---

# 344. Client Analytics ≠ Security Evidence

Browser telemetry can be modified by the user.

It may inform diagnostics, not authoritative security decisions.

---

# 345. Telemetry Availability

Loss of observability should itself trigger investigation for critical systems.

Running blind is an operational risk.

---

# 346. Observability Degraded Mode

If telemetry backend is down:

```text
product continues where safe
local buffering bounded
operators notified
```

---

# 347. Audit Durability

Audit events requiring compliance durability may need stronger guarantees than ordinary application logs.

---

# 348. Testing Instrumentation

Important telemetry SHOULD be tested where practical.

---

# 349. Structured Log Tests

Test critical log/event schema without tightly coupling every test to exact prose.

---

# 350. Metric Tests

Verify critical counters/histograms are emitted with bounded labels and correct semantics.

---

# 351. Trace Tests

Integration tests MAY verify meaningful spans/context propagation for critical cross-service workflows.

---

# 352. Audit Tests

Security-sensitive actions SHOULD verify expected audit records.

---

# 353. Redaction Tests

Test that:

```text
tokens
passwords
sensitive fields
```

do not appear in telemetry.

---

# 354. Cardinality Tests

Static/CI rules MAY detect obvious dynamic-label mistakes.

---

# 355. Dashboard Testing

Dashboard/query definitions SHOULD be validated automatically where platform tooling supports it.

---

# 356. Alert Testing

Alerts SHOULD be tested/simulated before relying on them.

---

# 357. Page Delivery Test

Critical paging paths SHOULD periodically verify that notifications reach the expected on-call target.

---

# 358. Runbook Testing

Runbooks SHOULD be exercised during:

```text
incidents
game days
failure drills
```

so obsolete procedures are discovered.

---

# 359. SLO Validation

Verify SLI queries represent actual intended user populations.

A mathematically correct query can still measure the wrong thing.

---

# 360. Telemetry Development Environment

Developers SHOULD be able to inspect relevant logs/traces locally or in development environments without needing production access.

---

# 361. Local Traceability

Complex distributed applications SHOULD provide a practical local/development telemetry workflow.

---

# 362. Production Parity

Telemetry schemas SHOULD remain broadly consistent across environments so debugging knowledge transfers.

---

# 363. Environment-Specific Volume

Log levels/sample rates MAY differ between environments.

Schema semantics should not.

---

# 364. Documentation

Every critical service SHOULD document:

```text
dashboards
SLOs
alerts
runbooks
log/trace query basics
ownership
```

---

# 365. Service Catalog Integration

The service catalog SHOULD link:

```text
owner
repository
dashboard
SLO
alerts
runbook
dependencies
```

where platform maturity supports it.

---

# 366. Observability Review Trigger

Review instrumentation when introducing:

```text
new service
new dependency
critical workflow
queue
payment flow
authentication flow
multi-tenant boundary
AI provider
```

---

# 367. Telemetry Schema Governance

Shared telemetry fields SHOULD have documented ownership.

Do not create duplicate fields with overlapping semantics.

---

# 368. Deprecating Telemetry

When changing metric/log/attribute names:

```text
update dashboards
update alerts
update runbooks
update queries
```

before removing old data.

---

# 369. Observability Backward Compatibility

Telemetry may have operational consumers just like APIs.

Treat important signal changes deliberately.

---

# 370. Production Debugging Checklist

Before investigating:

```text
□ Confirm user impact
□ Confirm environment/service
□ Check recent deployments
□ Check SLO/burn
□ Check dependencies
□ Find trace/request example
□ Inspect correlated logs
□ Prefer read-only investigation
□ Avoid sensitive-data exposure
□ Record interventions
```

---

# 371. Structured Logging Checklist

```text
□ Stable schema
□ Timestamp
□ Severity
□ Event name
□ Service/environment
□ Request/trace correlation
□ Error type when relevant
□ No secrets
□ PII minimized
□ No dynamic field names
□ Volume appropriate
```

---

# 372. Metrics Checklist

```text
□ Metric answers operational question
□ Correct instrument type
□ Unit explicit
□ Labels bounded
□ Cardinality estimated
□ No IDs/secrets
□ Histogram used for distributions
□ Dashboard/alert consumer known
□ Retention/cost acceptable
```

---

# 373. Tracing Checklist

```text
□ Meaningful root span
□ Stable span names
□ Context propagated
□ Critical dependencies instrumented
□ Error state correct
□ Sensitive attributes excluded
□ Sampling policy defined
□ Trace-to-log correlation works
```

---

# 374. Dashboard Checklist

```text
□ User/service outcome visible first
□ Traffic visible
□ Error visible
□ Latency visible
□ Saturation visible
□ Dependencies visible
□ Deployment markers
□ Units/labels clear
□ Drill-down possible
□ Owner known
```

---

# 375. Alert Checklist

```text
□ Actionable
□ Owner/on-call known
□ User impact understood
□ Severity appropriate
□ Threshold justified
□ Duration justified
□ Deduplication considered
□ Runbook linked
□ Tested
```

---

# 376. SLO Checklist

```text
□ User-relevant SLI
□ Population defined
□ Success criteria defined
□ Measurement source defined
□ Window defined
□ Target defined
□ Error budget calculable
□ Burn-rate visibility
□ Policy for excessive burn
□ Reviewed periodically
```

---

# 377. Audit Logging Checklist

```text
□ Actor
□ Subject where different
□ Action
□ Target
□ Tenant
□ Timestamp
□ Result
□ No secrets
□ Integrity protected
□ Access controlled
□ Retention defined
```

---

# 378. Error Monitoring Checklist

```text
□ Centralized collection
□ Production environment
□ Release association
□ Useful grouping
□ Stack/source context
□ Trace/request correlation
□ Sensitive data redacted
□ Regression detection
□ Ownership/routing
```

---

# 379. External Dependency Checklist

```text
□ Dependency name
□ Request rate
□ Latency
□ Errors
□ Timeouts
□ Rate limits
□ Circuit state where used
□ Trace spans
□ Alerting
□ Runbook for critical dependency
```

---

# 380. Queue Observability Checklist

```text
□ Queue depth
□ Oldest-message age
□ Processing throughput
□ Processing latency
□ Retry rate
□ Failure rate
□ DLQ depth
□ Stuck jobs
□ Worker saturation
```

---

# 381. Observability Definition of Done — Feature

A significant feature is not production-ready until:

```text
✓ Success/failure outcomes measurable
✓ Unexpected errors observable
✓ Relevant structured logs exist
✓ Metrics exist where aggregate behavior matters
✓ Trace propagation preserved
✓ Sensitive data excluded
✓ Operational owner known
✓ Critical alerts/dashboards updated
✓ Audit events added where required
```

---

# 382. Definition of Done — Service

A production service is observability-ready when:

```text
✓ Canonical service identity
✓ Structured logging
✓ Request correlation
✓ RED/service metrics
✓ Relevant infrastructure saturation metrics
✓ Distributed tracing where justified
✓ Overview dashboard
✓ Error monitoring
✓ Critical dependency monitoring
✓ Alerts
✓ Runbooks
✓ SLOs where service criticality warrants them
✓ Telemetry retention/access defined
```

---

# 383. Definition of Done — Critical Workflow

Critical workflows additionally require:

```text
✓ User-outcome metric
✓ Failure taxonomy
✓ End-to-end traceability
✓ Dependency visibility
✓ SLI/SLO where applicable
✓ SLO burn alerting
✓ Safe incident diagnostics
✓ Recovery verification metric
```

---

# 384. Observability Anti-Patterns

Avoid:

```text
console.log(object)
```

as production observability architecture.

Avoid:

```text
plain text only
```

when structured logging is available.

Avoid:

```text
"something failed"
```

with no error type/context.

Avoid:

```text
every request body logged
```

Avoid:

```text
Authorization header logged
```

Avoid:

```text
email address as metric label
```

Avoid:

```text
request ID as metric label
```

Avoid:

```text
raw URL path as metric dimension
```

Avoid:

```text
average latency only
```

Avoid:

```text
CPU dashboard = service health
```

Avoid:

```text
500 graphs on one dashboard
```

Avoid:

```text
page on every exception
```

Avoid:

```text
alert with no owner
```

Avoid:

```text
alert with no action
```

Avoid:

```text
alert threshold copied from another service
```

Avoid:

```text
SLO = 99.99%
```

because it sounds impressive.

Avoid:

```text
server running = availability
```

Avoid:

```text
audit trail mixed into disposable debug logs
```

Avoid:

```text
trace every function
```

Avoid:

```text
100% trace sampling forever
```

without cost justification.

Avoid:

```text
production issue
→ SSH
→ random commands
```

Avoid:

```text
production debugging
→ full DB dump to laptop
```

Avoid:

```text
turn off alert because noisy
```

without fixing the signal.

Avoid:

```text
observability exporter unavailable
→ product request fails
```

Avoid:

```text
collect everything forever
```

as retention policy.

---

# 385. AI Observability Rules

AI coding agents MUST inspect existing observability conventions before adding instrumentation.

Inspect:

```text
logging library
metric naming
tracing
OpenTelemetry setup
error monitoring
audit mechanism
```

---

# 386. AI Structured Logging Rule

AI MUST use structured fields rather than interpolating all context into a message string.

---

# 387. AI Secret Rule

AI MUST NOT log:

```text
passwords
tokens
cookies
API-key secrets
OTP
private keys
```

---

# 388. AI PII Rule

AI SHOULD minimize personal information in telemetry.

It MUST NOT add user-content logging simply to make debugging easier.

---

# 389. AI Metric Rule

Before adding a metric, AI should answer:

```text
What question does this metric answer?
```

---

# 390. AI Cardinality Rule

Before adding a metric label, AI MUST evaluate whether values are bounded.

Never add:

```text
userId
requestId
email
raw URL
```

as ordinary metric dimensions.

---

# 391. AI Trace Rule

AI SHOULD add spans around meaningful external/long-running operations where existing auto-instrumentation does not already cover them.

---

# 392. AI Duplicate Instrumentation Rule

AI MUST inspect existing auto-instrumentation before adding manual duplicate spans/metrics.

---

# 393. AI Correlation Rule

New server request/background-job code SHOULD preserve canonical trace/correlation context.

---

# 394. AI Error Rule

Unexpected errors SHOULD include enough safe context to diagnose and should flow into the canonical error-monitoring path.

---

# 395. AI Expected-Error Rule

AI MUST NOT send routine validation/domain errors to exception monitoring indiscriminately.

---

# 396. AI Audit Rule

When introducing privileged actions, AI SHOULD consider whether an audit event is required.

---

# 397. AI Dashboard Rule

A new critical service/flow is incomplete if its health cannot be seen from existing or updated dashboards.

---

# 398. AI Alert Rule

AI MUST NOT create paging alerts without:

```text
actionability
owner
severity
runbook/recovery context
```

---

# 399. AI SLO Rule

AI MUST NOT invent reliability percentages arbitrarily.

SLOs must reflect user/business requirements and measurable SLIs.

---

# 400. AI Production-Debugging Rule

AI MUST prefer:

```text
telemetry
read-only analysis
controlled tooling
```

over invasive production mutation.

---

# 401. AI Temporary-Debug Rule

Temporary production debugging instrumentation requires:

```text
scope
redaction
expiration/removal
```

---

# 402. AI Query Rule

AI MUST NOT recommend unbounded production database queries for investigation.

---

# 403. AI Telemetry-Cost Rule

AI SHOULD consider cardinality, volume, retention, and sampling before introducing high-volume instrumentation.

---

# 404. AI OpenTelemetry Rule

Where the system uses OpenTelemetry, AI SHOULD use established semantic conventions instead of inventing parallel attribute naming.

---

# 405. AI Gold Rule

When uncertain:

```text
User impact
>
Correct signal semantics
>
Correlation
>
Actionability
>
Diagnostic detail
>
Telemetry volume
```

---

# 406. Golden Observability Rules

**1. Production systems are designed to be observable.**

**2. Logs, metrics, and traces solve different problems and should correlate.**

**3. Use standardized telemetry conventions before inventing new ones.**

**4. Every service has a stable identity.**

**5. Every meaningful signal identifies environment and release where useful.**

**6. Production logs are structured.**

**7. Structured logging means stable schema, not merely JSON.**

**8. Machine behavior never depends on parsing log prose.**

**9. Secrets never enter telemetry.**

**10. PII is minimized.**

**11. Expected errors do not flood exception monitoring.**

**12. Unexpected errors retain useful diagnostic context.**

**13. Metrics use explicit units and appropriate instrument semantics.**

**14. Metric cardinality is controlled deliberately.**

**15. User IDs, request IDs, trace IDs, and raw URLs do not belong in ordinary metric labels.**

**16. Latency is measured as a distribution, not only an average.**

**17. Request-driven services observe rate, errors, and duration.**

**18. Resource systems observe utilization, saturation, and errors where relevant.**

**19. Distributed traces use stable low-cardinality operation names.**

**20. Trace context propagates through meaningful service boundaries.**

**21. Trace/log correlation works.**

**22. Sampling is an explicit architecture decision.**

**23. Dashboards begin with user/service outcomes.**

**24. Alerts are actionable.**

**25. Every alert has an owner.**

**26. Pages are reserved for urgent human-actionable conditions.**

**27. Alert on user impact/SLO burn before arbitrary infrastructure numbers where practical.**

**28. SLOs measure user-relevant service behavior.**

**29. SLO targets are justified, not chosen for prestige.**

**30. Error budgets inform reliability decisions.**

**31. Audit logs are distinct from ordinary debug logs.**

**32. Privileged actions are auditable.**

**33. Audit data is protected from unauthorized change/access.**

**34. Production debugging begins read-only.**

**35. Production changes during investigation are controlled, auditable, and reversible.**

**36. Direct production data access is minimized.**

**37. Telemetry exporter failure does not normally break the product.**

**38. Observability infrastructure is itself monitored.**

**39. Telemetry cost, retention, and cardinality are governed.**

**40. If an incident cannot be diagnosed from available signals, observability is incomplete.**

---

# 407. Canonical Observability Standard

The organizational standard is:

> **Production systems emit correlated, structured, privacy-conscious telemetry across logs, metrics, traces, error monitoring, and audit events. OpenTelemetry-compatible data models and semantic conventions are preferred where supported so telemetry remains consistent across services and vendors. Services expose stable identity, deployment version, environment, request/trace context, and meaningful operation semantics without including credentials or unnecessary personal information.**

> **Logs represent structured events and diagnostic context; metrics represent bounded aggregate measurements; traces represent causal distributed operations. Metrics maintain explicit units and controlled cardinality, traces use stable operation names and propagated context, and unexpected errors preserve sufficient diagnostic information without exposing internal details to users. Telemetry is sampled, retained, and stored according to diagnostic value, privacy, security, and cost rather than collected indefinitely.**

> **Critical services maintain dashboards centered on user-visible outcomes, traffic, errors, latency, saturation, dependency health, and relevant changes. Alerts exist only when a person or automated process can take useful action, are routed to an explicit owner, and include sufficient context and runbooks for response. Service Level Indicators represent user-relevant service behavior, Service Level Objectives define justified reliability targets over explicit windows, and error-budget consumption guides reliability response and change decisions.**

> **Security-sensitive and privileged actions produce protected audit trails distinct from disposable operational logs. Production debugging begins with telemetry and read-only investigation; privileged production access, data repairs, configuration changes, kill switches, and temporary diagnostics are tightly scoped, attributable, auditable, and reversible. Observability failure must not normally cause business-operation failure, but loss of critical telemetry is itself monitored as an operational risk.**

A production-grade observable system should make it easy to answer:

```text
Are users succeeding right now?
How many users/requests are affected?
When did degradation begin?
Was there a deployment or configuration change?
Which operation is failing?
Which dependency is slow?
What is the p95/p99 latency?
Are resources saturated?
What is the trace for a failed request?
Which logs correspond to that trace?
What error type occurred?
Is this a regression?
What is the service's SLO?
How quickly is the error budget burning?
Should someone be paged?
Who owns the alert?
What runbook should they use?
Who performed this privileged action?
Can we investigate without modifying production?
How do we know recovery is complete?
```

If those questions cannot be answered reliably, the system is not yet observability-ready.

Two governance distinctions are especially important. OpenTelemetry recommends structured logs with a **consistent schema**, and its model supports direct log/trace correlation through `TraceId` and `SpanId`; merely outputting arbitrary JSON does not by itself make logging well structured. citeturn217442search6turn217442search8 OWASP likewise recommends consistent application logging but warns that operational, security, transaction, and audit trails can have different purposes and may appropriately remain separate; it also calls for protection against unauthorized access, modification, deletion, and over-retention. citeturn217442search0

In the master hierarchy, I would now place it as:

**Architecture → Framework → Security → Authentication & Authorization → Data & Database → API → Routes → State Management → Design Tokens → Layouts → Facade → Components → Forms & Validation → Accessibility → Error Handling & Resilience → Testing → Performance → Observability → Infrastructure & Deployment → Documentation → Governance.**
