---
id: "architecture"
title: "Architecture Guidelines — Gold Standard"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "architecture"]
applies_to: ["team"]
related: ["code-review", "adr"]
legacy_number: 10
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 60999
provenance: baseline

---

# Architecture Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical architecture standard for software products.

The architecture exists to make systems:

- understandable;
- secure;
- maintainable;
- scalable;
- testable;
- observable;
- resilient;
- evolvable;
- operable;
- economical to change.

Architecture is not primarily about diagrams or technology selection.

Architecture defines:

```text
Responsibilities
Boundaries
Dependencies
Ownership
Contracts
Data
Trust
Failure
Change
```

The core principle is:

> **Architecture should make correct changes easy, incorrect changes difficult, and system behavior understandable from its boundaries.**

---

# 2. Normative Language

The following terms are intentional:

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented reason exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Architecture exceptions require:

```text
Reason
Tradeoff
Owner
Risk
Compensating control
Review date
```

---

# 3. Architecture Is About Change

A good architecture optimizes for the expected pattern of change.

The relevant question is not:

> What architecture looks most sophisticated?

The relevant questions are:

```text
What changes frequently?
What must remain stable?
What must be independently deployable?
What must be independently secured?
What must be independently scaled?
What must fail independently?
What must remain strongly consistent?
```

Architecture should follow those answers.

---

# 4. Start With the Simplest Viable Architecture

Default to the simplest architecture that meets:

- current requirements;
- expected near-term growth;
- security needs;
- operational needs;
- team capability.

Do not introduce distributed-system complexity without a concrete requirement.

Preferred default for most new products:

```text
Modular monolith
+
clear domain boundaries
+
explicit contracts
+
strong observability
```

before microservices.

---

# 5. Complexity Must Pay Rent

Every architectural mechanism must justify its cost.

Examples:

```text
Microservice
Message broker
Distributed cache
Event sourcing
CQRS
Graph database
Service mesh
Plugin architecture
Multi-region active-active
```

should only exist when their benefits materially exceed their operational and cognitive cost.

---

# 6. Architecture Decision Order

When designing a system, decide in this order:

```text
Product problem
↓
Domain model
↓
Boundaries
↓
Data ownership
↓
Security/trust boundaries
↓
Communication contracts
↓
Failure behavior
↓
Deployment topology
↓
Technology selection
```

Do not start architecture with:

```text
Which database?
Which cloud?
Which framework?
Microservices or monolith?
```

Technology follows structure.

---

# 7. Architecture Layers

A typical application architecture may contain:

```text
Presentation
↓
Application
↓
Domain
↓
Infrastructure
```

Conceptually:

### Presentation

Owns:

- routes;
- UI;
- HTTP transport;
- serialization;
- user interaction.

### Application

Owns:

- use cases;
- orchestration;
- authorization coordination;
- transactions;
- workflow coordination.

### Domain

Owns:

- business rules;
- invariants;
- domain state;
- domain concepts.

### Infrastructure

Owns:

- database;
- external APIs;
- queues;
- email;
- storage;
- cloud services.

---

# 8. Dependency Direction

Dependencies SHOULD point toward more stable policy.

Preferred:

```text
Presentation
↓
Application
↓
Domain
```

Infrastructure should implement interfaces required by higher-level policy where appropriate.

Avoid:

```text
Domain
↓
Next.js
↓
ORM
↓
Stripe SDK
```

as direct architectural coupling.

---

# 9. Domain Independence

Core business rules SHOULD remain independent from:

- UI framework;
- database ORM;
- transport protocol;
- cloud provider;
- external vendor SDK.

Example:

Good:

```text
calculateInvoice(invoice)
```

Poor:

```text
calculateInvoice(nextRequest, prismaClient, stripeClient)
```

---

# 10. Framework as Adapter

Framework code should adapt external requests into application/domain operations.

Example:

```text
HTTP request
↓
Route Handler
↓
Application command
↓
Domain
↓
Persistence
```

The framework should not become the domain model.

---

# 11. Modular Monolith as Default

A modular monolith is the preferred starting architecture for many applications.

It provides:

- one deployment;
- simple transactions;
- easier local development;
- lower operational cost;
- strong modular boundaries;
- future extraction paths.

Conceptually:

```text
Application
├── Identity
├── Projects
├── Billing
├── Notifications
└── Reporting
```

Each module should behave like an internal service boundary.

---

# 12. Monolith Does Not Mean Unstructured

A monolith MUST NOT mean:

```text
everything imports everything
```

A high-quality monolith still requires:

- module boundaries;
- ownership;
- public APIs;
- data ownership;
- dependency rules.

---

# 13. Distributed Monolith Anti-Pattern

Avoid:

```text
Many services
+
shared database
+
synchronous coupling
+
coordinated deployments
```

This produces microservice operational complexity without meaningful independence.

---

# 14. Microservice Decision

A module SHOULD become a separate service only when at least one significant architectural requirement exists.

Examples:

```text
Independent scaling
Independent deployment
Different security boundary
Different runtime requirement
Failure isolation
Strong ownership boundary
Independent release cadence
Regulatory isolation
```

Do not extract services merely to reduce repository size.

---

# 15. Microservices Are Organizational Architecture

Service boundaries often imply:

```text
Ownership
On-call
Deployment
Observability
Security
Data ownership
SLA
```

If the organization cannot own those independently, service separation may be premature.

---

# 16. Service Independence

A true service SHOULD ideally own:

```text
Code
Data
Runtime
Deployment
Observability
Operational responsibility
```

If another team must coordinate every change, independence is weak.

---

# 17. Service Extraction

Before extracting a module:

```text
1. Establish clean internal boundary.
2. Define public contract.
3. Remove cross-boundary database access.
4. Introduce adapter.
5. Measure reason for extraction.
6. Extract deployment only if justified.
```

Do not use network boundaries to fix poor modularity.

---

# 18. Domain Boundaries

Boundaries SHOULD follow business capability where possible.

Examples:

```text
Identity
Projects
Billing
Subscriptions
Notifications
Search
Reporting
```

Avoid grouping primarily by technical type:

```text
controllers
services
models
helpers
```

across the entire product.

---

# 19. Feature/Domain Organization

Prefer:

```text
features/
  projects/
  billing/
  members/
```

over:

```text
controllers/
services/
repositories/
models/
```

for application-level organization where feature ownership is important.

Technical layers may still exist inside each domain.

---

# 20. Bounded Context

Use bounded contexts when the same term has different meanings across domains.

Example:

```text
Customer
```

may mean different things in:

```text
Billing
Support
Sales
Identity
```

Do not force one universal model across contexts.

---

# 21. Ubiquitous Language

Each domain SHOULD have consistent terminology.

Use the same terms across:

```text
Code
Database
API
UI
Documentation
Tests
```

unless a deliberate translation boundary exists.

---

# 22. Domain Model

Model concepts that matter to the business.

Examples:

```text
Workspace
Project
Invoice
Subscription
Membership
Permission
Order
```

Avoid reducing every domain to:

```text
CRUD table wrapper
```

when significant business behavior exists.

---

# 23. Entities

Use entities when identity persists across state changes.

Example:

```text
Project
User
Invoice
```

Identity matters independently of the current attribute values.

---

# 24. Value Objects

Use value objects where meaning comes from values rather than identity.

Examples:

```text
Money
EmailAddress
DateRange
Coordinates
```

They can encode validation and invariants.

---

# 25. Domain Invariants

Critical business rules SHOULD have one authoritative enforcement location.

Examples:

```text
Invoice total cannot be negative.
Owner cannot remove their last ownership role.
Subscription cannot transition directly from cancelled to trial.
```

Do not rely solely on UI validation.

---

# 26. Application Services

Application services orchestrate use cases.

Example:

```text
InviteMember
CreateProject
CancelSubscription
ApproveInvoice
```

They may coordinate:

- domain operations;
- authorization;
- transactions;
- notifications;
- events.

---

# 27. Avoid God Services

Avoid:

```text
AppService
MainService
CommonService
ProjectManagerService
```

containing unrelated responsibilities.

Services should express coherent capabilities.

---

# 28. Commands and Queries

Separate conceptual intent:

```text
Command
→ changes state

Query
→ reads state
```

This does not require full CQRS.

It simply improves clarity.

---

# 29. CQRS

Use full CQRS only when the read and write models genuinely need independent optimization.

Potential reasons:

```text
Very different read/write workloads
Complex reporting
Event-driven projections
Different scaling requirements
```

Do not adopt CQRS merely because command/query names are useful.

---

# 30. Event Sourcing

Event sourcing requires strong justification.

Appropriate where:

```text
Complete historical state is fundamental
Temporal reconstruction is required
Auditability is core business behavior
Domain naturally models events
```

It introduces significant complexity.

Do not use it merely to obtain an audit log.

---

# 31. Data Ownership

Every domain should have a clear data owner.

Example:

```text
Billing
owns:
Invoices
Payment records
Subscription state
```

Other domains SHOULD access owned data through intentional contracts where boundaries matter.

---

# 32. Shared Database

A modular monolith MAY use one physical database.

That does not imply unrestricted table access.

Logical ownership should remain clear.

---

# 33. Cross-Domain Database Access

Avoid:

```text
Billing code
→ directly updates Identity tables
```

Prefer:

```text
Billing
→ Identity public module operation
```

This preserves invariants.

---

# 34. Service Databases

Independent services SHOULD generally own their persistence.

Avoid services sharing mutable tables.

Shared physical infrastructure MAY be acceptable while logical ownership remains isolated.

---

# 35. Database Is Not Integration API

Other systems SHOULD NOT integrate by directly querying your internal database unless explicitly designed as a data product/interface.

Database schema is an implementation detail unless declared otherwise.

---

# 36. Transactions

Use local database transactions for invariants requiring atomicity.

Example:

```text
Create order
+
reserve inventory
+
record local payment intent
```

if they live in one transactional boundary.

---

# 37. Distributed Transactions

Avoid distributed transactions where simpler consistency models are sufficient.

Prefer:

```text
local transaction
+
event/message
+
idempotent downstream processing
```

for cross-service workflows.

---

# 38. Strong Consistency

Use strong consistency where violating an invariant would be unacceptable.

Examples:

```text
Financial balance
Inventory reservation
Permission state
Ownership transfer
```

Do not relax consistency casually for architectural fashion.

---

# 39. Eventual Consistency

Use eventual consistency where temporary divergence is acceptable.

Examples:

```text
Search index
Analytics
Recommendation model
Email notification
Reporting projection
```

Document expected convergence behavior.

---

# 40. Consistency Must Be Explicit

For every important cross-boundary state, define:

```text
Source of truth
Consistency model
Maximum acceptable staleness
Conflict behavior
Recovery mechanism
```

---

# 41. Synchronous Communication

Use synchronous calls when the caller needs an immediate response.

Examples:

```text
Authorization check
Current price lookup
Immediate validation
```

Synchronous dependencies increase latency and failure coupling.

---

# 42. Asynchronous Communication

Use async messaging when:

- immediate response is unnecessary;
- work is expensive;
- loose coupling matters;
- retries are acceptable;
- independent processing is useful.

Examples:

```text
Send email
Index search
Generate report
Process media
Publish analytics
```

---

# 43. Do Not Use Queues as Decoration

Do not insert a queue simply to appear scalable.

Queues introduce:

```text
Retries
Duplicates
Ordering issues
Dead letters
Monitoring
Operational complexity
```

Use them when asynchronous semantics are actually valuable.

---

# 44. Message Ownership

Every message/event must have:

```text
Producer
Owner
Schema
Version
Delivery semantics
Consumer expectations
```

---

# 45. Domain Events

Domain events express business facts.

Examples:

```text
ProjectCreated
InvoicePaid
MemberInvited
SubscriptionCancelled
```

Prefer past-tense facts.

---

# 46. Integration Events

Integration events are contracts for external modules/services.

A domain event does not automatically belong on a public event bus.

Translate internal events into stable integration events where necessary.

---

# 47. Event Contracts

Published events become durable contracts.

Do not casually rename:

```text
event type
fields
semantics
```

after consumers exist.

---

# 48. Event Versioning

Breaking event changes require:

```text
New version
Migration
Parallel compatibility
Consumer coordination
```

where appropriate.

---

# 49. Delivery Semantics

Assume most distributed event systems provide behavior closer to:

```text
at least once
```

than:

```text
exactly once
```

Design consumers to tolerate duplicates.

---

# 50. Idempotency

Operations that can be retried MUST define idempotency where duplicate execution creates harm.

Examples:

```text
Payments
Webhook handling
Provisioning
Invitations
Order creation
```

---

# 51. Idempotency Key

Where appropriate:

```text
Client/producer supplies stable operation key
↓
Server records result
↓
Duplicate request returns equivalent result
```

Define retention and scope.

---

# 52. Ordering

Do not assume global event ordering.

If ordering matters, define:

```text
partition key
entity sequence
version number
```

or another explicit mechanism.

---

# 53. Outbox Pattern

For reliable database-change + message publication:

```text
Database transaction
├── update domain state
└── insert outbox record
↓
publisher
↓
message bus
```

This prevents common dual-write failure modes.

---

# 54. Inbox/Deduplication

Consumers MAY maintain processed-message state when duplicate side effects are harmful.

Design deduplication deliberately.

---

# 55. Saga

Use a saga when a business process spans multiple independent transaction boundaries.

Example:

```text
Create booking
↓
Reserve seat
↓
Charge payment
↓
Issue ticket
```

Define compensating behavior.

---

# 56. Compensation Is Not Rollback

In distributed systems, compensation usually means:

```text
new operation that reverses business effect
```

not literal transaction rollback.

Example:

```text
Charge payment
↓ failure later
Refund payment
```

---

# 57. Workflow Ownership

Long-running workflows SHOULD have one explicit coordinator or clearly documented choreography.

Avoid distributed behavior where nobody owns overall state.

---

# 58. Choreography

Event choreography works best when:

- dependencies are simple;
- consumers react independently;
- workflow state is not complex.

Do not let dozens of implicit event reactions become an invisible business process.

---

# 59. Orchestration

Use explicit orchestration when:

- steps are ordered;
- compensation matters;
- workflow state matters;
- operational visibility matters.

---

# 60. API Boundaries

Every system/module API should expose intention, not internal implementation.

Prefer:

```text
createProject()
inviteMember()
cancelSubscription()
```

over:

```text
insertProjectRow()
updateMembershipTable()
```

---

# 61. Contract-First Thinking

Before exposing an interface, define:

```text
Purpose
Inputs
Outputs
Errors
Authorization
Idempotency
Compatibility
Ownership
```

---

# 62. Internal APIs Are Still APIs

An internal module API deserves discipline.

Internal consumers can create as much coupling as external ones.

Do not expose internals simply because they are in the same repository.

---

# 63. Public vs Private Module API

Each module SHOULD distinguish:

```text
Public
Internal
```

Other modules import from public entry points only.

---

# 64. Dependency Inversion

High-level policy SHOULD not depend directly on unstable low-level details where abstraction provides real value.

Example:

```text
Billing domain
↓
PaymentGateway interface
↓
Stripe adapter
```

This makes provider policy explicit.

---

# 65. Avoid Interface for Everything

Do not create an interface for every class or function.

Abstract where:

- multiple implementations exist;
- testing materially benefits;
- provider boundary exists;
- architectural isolation matters.

---

# 66. Adapter Pattern

Adapters should isolate external systems.

Examples:

```text
EmailProvider
ObjectStorage
PaymentGateway
SearchIndex
AnalyticsSink
```

The domain should not know vendor-specific API details.

---

# 67. Anti-Corruption Layer

When integrating with a foreign domain model, translate it.

Example:

```text
External CRM model
↓
Adapter / translation
↓
Internal Customer model
```

Do not allow external vocabulary to spread through internal architecture unnecessarily.

---

# 68. Vendor Lock-In

Vendor-specific architecture is acceptable when benefits exceed switching risk.

Do not build unnecessary generic abstractions solely to claim portability.

Assess:

```text
Switch likelihood
Switch cost
Business criticality
Vendor stability
Data portability
```

---

# 69. Buy vs Build

Use external platforms for commodity capability when they provide significant leverage.

Build internally when:

- capability differentiates product;
- custom behavior is core;
- external constraints are unacceptable;
- ownership provides strategic advantage.

---

# 70. Architecture Ownership

Every major domain/system MUST have an owner.

Ownership includes:

```text
Architecture
Reliability
Security
Documentation
Operations
Technical debt
Lifecycle
```

---

# 71. Conway's Law Awareness

System boundaries and team communication structures influence each other.

Architecture SHOULD consider team ownership.

Do not create ten independently deployed services owned by one two-person team without strong reason.

---

# 72. Team Cognitive Load

Architecture must fit what teams can reasonably understand and operate.

More services do not automatically create more scalability.

They often create more cognitive load.

---

# 73. Service Ownership

Every independent service needs:

```text
Owner
On-call/escalation
Deployment process
SLO
Dashboard
Runbook
Security owner
```

A service with no operational owner should not exist.

---

# 74. Architecture Documentation

Every significant system SHOULD have:

```text
Context diagram
Major components
Data ownership
Trust boundaries
External dependencies
Critical flows
```

Keep it current.

---

# 75. C4-Style Documentation

Useful architecture levels:

```text
System Context
↓
Containers / Deployables
↓
Components
↓
Code detail when necessary
```

Do not create giant diagrams containing every class.

---

# 76. Diagram Rule

A diagram should answer a specific question.

Examples:

```text
Who talks to whom?
Where does data live?
Where are trust boundaries?
What happens during checkout?
```

If a diagram cannot answer a useful question, remove it.

---

# 77. Architecture Decision Records

Use ADRs for consequential decisions.

Examples:

```text
Use modular monolith
Choose PostgreSQL
Adopt event-driven billing integration
Choose single-region deployment
```

---

# 78. ADR Structure

Recommended:

```text
Title
Status
Context
Decision
Alternatives
Consequences
Date
Owners
```

---

# 79. ADRs Record Tradeoffs

An ADR should explain why the decision was made.

Not just:

```text
We use PostgreSQL.
```

But:

```text
Why PostgreSQL?
What alternatives?
What constraints?
What consequences?
```

---

# 80. Architecture RFCs

Use RFCs for decisions requiring broader discussion before implementation.

RFCs may cover:

```text
New service
Major domain boundary
New data model
Large platform migration
New event architecture
```

---

# 81. RFC vs ADR

Use:

```text
RFC
→ proposed design and discussion

ADR
→ final durable decision
```

An accepted RFC may result in one or more ADRs.

---

# 82. Non-Functional Requirements

Architecture MUST explicitly consider:

```text
Availability
Latency
Throughput
Consistency
Security
Privacy
Scalability
Recovery
Cost
Operability
```

Do not design only for functional requirements.

---

# 83. Quality Attributes

Every critical system SHOULD prioritize its most important quality attributes.

Example:

```text
Payments:
Correctness > consistency > auditability > latency

Search:
Availability > latency > eventual consistency
```

Not every subsystem optimizes for the same thing.

---

# 84. Architecture Tradeoffs

There is no architecture maximizing:

```text
Consistency
Availability
Latency
Cost
Simplicity
Scalability
```

simultaneously.

Tradeoffs must be explicit.

---

# 85. Capacity Assumptions

Architecture SHOULD define rough scale assumptions.

Examples:

```text
Users
Requests/sec
Database size
Event volume
File volume
Peak concurrency
```

Do not build for imaginary planet-scale load.

---

# 86. Scale Based on Evidence

Scale architecture when:

```text
Measurement
Capacity model
Known roadmap
```

justifies it.

Avoid premature sharding and distributed complexity.

---

# 87. Vertical Scaling

Vertical scaling is valid.

Do not jump to distributed architecture before simpler capacity increases are exhausted.

---

# 88. Horizontal Scaling

Use horizontal scaling when:

- workload is stateless or partitionable;
- single-instance capacity is insufficient;
- availability requirements justify redundancy.

---

# 89. Stateless Application Tier

Application servers SHOULD remain stateless where practical.

Persist durable state in appropriate shared systems.

This simplifies:

```text
Scaling
Recovery
Deployment
Load balancing
```

---

# 90. Stateful Systems

Stateful services require explicit:

```text
Replication
Backup
Failover
Consistency
Recovery
```

architecture.

---

# 91. Partitioning

Partition only when necessary.

Possible dimensions:

```text
Tenant
Region
Time
Resource ID
```

Partition choice affects future queries and operations.

---

# 92. Sharding

Sharding is a major architectural commitment.

Do not shard databases without clear capacity evidence.

Prefer simpler:

```text
indexes
query optimization
read replicas
vertical scale
archival
```

first when suitable.

---

# 93. Read Replicas

Use read replicas for appropriate read scaling.

Understand:

```text
replication lag
read-after-write behavior
failover
```

Do not serve correctness-sensitive reads from stale replicas blindly.

---

# 94. Caching

Caching is an architectural consistency decision.

Every cache requires:

```text
Key
Owner
TTL
Invalidation
Scope
Tenant boundary
Staleness tolerance
```

---

# 95. Cache Aside

Typical:

```text
Read cache
↓ miss
Read source
↓
Populate cache
```

Use intentionally.

---

# 96. Cache Invalidation

Invalidation must follow business semantics.

Do not use:

```text
flush all
```

for every mutation unless justified.

---

# 97. Cache Security

Never allow cache keys to leak data across:

```text
users
tenants
permissions
regions
```

Authorization-sensitive caches require careful scoping.

---

# 98. CDN

Use CDN for:

- static assets;
- public content;
- cacheable responses.

Do not cache personalized or sensitive content publicly by accident.

---

# 99. Resilience

Systems must assume dependencies fail.

Design for:

```text
timeouts
partial failure
unavailability
latency spikes
invalid responses
network partitions
```

---

# 100. Timeouts

Every external call SHOULD have bounded timeout behavior.

Infinite waiting is not resilience.

---

# 101. Retries

Retry only transient failures.

Use:

```text
bounded attempts
exponential backoff
jitter
```

where appropriate.

Do not retry validation or authorization failures.

---

# 102. Retry Storms

Retries can amplify outages.

Architecture should consider:

```text
retry limits
backoff
circuit breaking
queue buffering
```

---

# 103. Circuit Breakers

Circuit breakers MAY protect against repeatedly calling failing dependencies.

Use when failure amplification is a real risk.

Do not add circuit breakers mechanically everywhere.

---

# 104. Bulkheads

Separate failure domains where one workload can exhaust another.

Examples:

```text
Separate worker pools
Separate queue
Separate DB connection pools
```

for high-risk workloads.

---

# 105. Graceful Degradation

Noncritical subsystem failure SHOULD not always make the entire product unusable.

Example:

```text
Analytics unavailable
→ product still works
```

or:

```text
Recommendation unavailable
→ fallback content
```

---

# 106. Fail Closed for Security

For authorization/security controls:

```text
dependency uncertain
→ deny
```

where appropriate.

Availability must not override security boundaries.

---

# 107. Fail Open Carefully

Fail-open behavior MAY be acceptable for nonsecurity convenience features.

It must be explicit.

---

# 108. Backpressure

Systems processing queued or streamed work must control overload.

Use:

```text
queue limits
concurrency limits
rate limits
load shedding
```

where needed.

---

# 109. Load Shedding

Under extreme load, dropping low-priority work can protect core operations.

Define priorities.

Example:

```text
Checkout
>
Analytics processing
```

---

# 110. Rate Limiting

Rate limiting serves:

- abuse protection;
- fairness;
- capacity protection.

Limits should align with identity/tenant/API semantics.

---

# 111. Availability

Availability targets SHOULD reflect product need.

Do not promise:

```text
99.999%
```

without architecture and operations capable of supporting it.

---

# 112. SLO

Critical services SHOULD define SLOs.

Examples:

```text
Availability
Latency
Error rate
Freshness
```

---

# 113. Error Budgets

Teams MAY use error budgets to balance reliability and feature velocity.

Reliability should be managed quantitatively where scale warrants it.

---

# 114. Single Points of Failure

Identify critical single points of failure.

Not every SPOF must be eliminated.

But it must be known and accepted.

---

# 115. Multi-AZ

Use availability-zone redundancy when downtime from a single-zone failure is unacceptable.

Architecture should match reliability requirement.

---

# 116. Multi-Region

Multi-region architecture is expensive.

Use only when required by:

```text
Availability
Latency
Data residency
Disaster recovery
```

Do not add it by default.

---

# 117. Active-Active

Active-active systems introduce substantial:

```text
consistency
conflict
routing
replication
operational
```

complexity.

Require strong justification.

---

# 118. Active-Passive

Active-passive is often simpler for disaster recovery.

Define:

```text
Failover trigger
RPO
RTO
Recovery test
```

---

# 119. RPO

Recovery Point Objective defines acceptable data loss.

Example:

```text
RPO = 5 minutes
```

Architecture must support it.

---

# 120. RTO

Recovery Time Objective defines acceptable recovery duration.

Example:

```text
RTO = 30 minutes
```

Runbooks and infrastructure must make it achievable.

---

# 121. Backup Is Architecture

Backup strategy MUST include:

```text
Frequency
Retention
Encryption
Access
Restore testing
```

A backup is not useful until restoration has been verified.

---

# 122. Disaster Recovery

Critical systems SHOULD have:

```text
Failure scenarios
Recovery process
Dependencies
Roles
Verification
```

documented.

---

# 123. Security Architecture

Security is not a separate afterthought.

Architecture MUST define:

```text
Trust boundaries
Identity
Authorization
Secret boundaries
Data sensitivity
Network exposure
Audit
```

---

# 124. Trust Boundaries

Every architecture diagram SHOULD make significant trust boundaries visible where relevant.

Examples:

```text
Browser ↔ Server
Service ↔ External provider
Tenant A ↔ Tenant B
Public network ↔ Internal network
```

---

# 125. Zero Trust Principle

Do not trust a request because it originated:

```text
inside network
from another service
from frontend
from internal tool
```

Authenticate and authorize based on architecture.

---

# 126. Identity Propagation

Distributed systems must define how identity and authorization context propagates.

Do not blindly forward user tokens everywhere.

Use appropriately scoped identities.

---

# 127. Service Identity

Services SHOULD have distinct machine identities.

Avoid one shared credential for all internal systems.

---

# 128. Secret Boundaries

Architecture must show where secrets may exist.

Secrets SHOULD NOT cross into:

```text
browser
logs
analytics
public build artifacts
```

---

# 129. Data Classification

Architecture should classify important data.

Examples:

```text
Public
Internal
Confidential
Highly sensitive
Regulated
```

Controls should follow classification.

---

# 130. Data Minimization

Do not propagate complete objects across every boundary.

Send only required fields.

This improves:

```text
security
privacy
performance
coupling
```

---

# 131. PII Boundaries

Personally identifiable or sensitive data SHOULD have clear:

```text
owner
storage location
retention
access policy
```

---

# 132. Multi-Tenancy

Tenant isolation must be architectural.

Define:

```text
Tenant identity
Tenant data ownership
Query isolation
Cache isolation
File isolation
Job isolation
Analytics isolation
```

---

# 133. Multi-Tenant Models

Possible models include:

```text
Shared database/shared schema
Shared database/separate schema
Separate database
Separate account/project
```

Choose according to:

```text
Security
Scale
Cost
Compliance
Operational complexity
```

---

# 134. Tenant Context

Tenant context MUST be established from trusted identity/membership data.

Do not treat:

```text
tenantId from client
```

as proof of access.

---

# 135. Region/Data Residency

If data residency matters, architecture must define:

```text
Where data is stored
Where backups reside
Where processing occurs
Where logs reside
```

---

# 136. Privacy Architecture

Privacy requirements should influence:

```text
collection
storage
access
retention
deletion
analytics
```

from the beginning.

---

# 137. Observability Architecture

Every production system should emit sufficient:

```text
Logs
Metrics
Traces
Audit events
```

for its critical behavior.

---

# 138. Structured Logging

Use structured logs.

Include relevant context such as:

```text
request ID
service
tenant
operation
result
```

without sensitive secrets.

---

# 139. Distributed Tracing

Use distributed tracing when requests cross enough services that correlation is otherwise difficult.

Do not add it solely because observability tooling supports it.

---

# 140. Metrics

Architecture-level metrics SHOULD measure:

```text
traffic
latency
errors
resource saturation
queue depth
cache behavior
dependency health
```

---

# 141. Audit Events

Security/business-critical actions SHOULD be auditable.

Examples:

```text
Role change
Ownership transfer
API key creation
Export
Payment state change
```

---

# 142. Operability

Architecture must make production operation possible.

Every major component should answer:

```text
How do we know it is healthy?
How do we deploy it?
How do we rollback?
How do we debug it?
How do we recover it?
```

---

# 143. Health Checks

Health checks should distinguish where useful:

```text
Process alive
Ready to receive traffic
Dependency degraded
```

Avoid health checks that create cascading failure by requiring every dependency to be perfect.

---

# 144. Graceful Shutdown

Services SHOULD handle shutdown gracefully.

Examples:

```text
stop accepting requests
finish in-flight work
release leases
close connections
```

---

# 145. Deployment Architecture

Deployments SHOULD be:

```text
Repeatable
Automated
Observable
Reversible where possible
```

---

# 146. Immutable Artifacts

Production deployments SHOULD use immutable/versioned artifacts where practical.

Avoid changing production servers manually.

---

# 147. Backward-Compatible Deployment

For distributed systems, assume old and new versions may coexist temporarily.

Changes SHOULD support rolling deployment.

---

# 148. Expand/Contract Migration

For breaking database/API changes:

```text
Expand
→ support old + new

Migrate
→ move consumers/data

Contract
→ remove old
```

Avoid schema changes requiring all systems to update at the exact same instant.

---

# 149. Database Migration

Database migration should be:

```text
Versioned
Reviewed
Observable
Rollback-aware
```

Large migrations require operational planning.

---

# 150. Zero-Downtime Migration

Where availability requires it, migrations must avoid:

- long blocking locks;
- incompatible schema removal;
- application/schema mismatch.

---

# 151. Compatibility

Architecture should define compatibility rules for:

```text
APIs
Events
Database schema
SDKs
Configuration
```

---

# 152. Backward Compatibility

Prefer additive changes.

Examples:

```text
new optional field
new endpoint
new event version
```

over changing existing semantics.

---

# 153. Breaking Change

Breaking changes require:

```text
Impact assessment
Migration
Versioning
Communication
Deadline
```

---

# 154. Versioning

Version only boundaries that require independent evolution.

Do not version every internal function.

---

# 155. Feature Flags

Feature flags are rollout mechanisms, not architectural boundaries.

Use for:

```text
Gradual rollout
Experiment
Kill switch
Migration
```

Remove stale flags.

---

# 156. Feature Flags and Data

Flagged features that change data models require careful forward/backward compatibility.

Do not assume disabling the UI reverses data migration.

---

# 157. Plugin Architecture

Use plugin architecture only when independent extension is a real requirement.

Plugins increase:

```text
API stability obligations
Security surface
Compatibility burden
Lifecycle complexity
```

---

# 158. Extension Points

Prefer narrow extension mechanisms:

```text
Callbacks
Adapters
Hooks
Events
Interfaces
```

over exposing internals.

---

# 159. Architecture for Testability

Boundaries should enable testing.

Domain logic SHOULD be testable without:

```text
Browser
Network
Real database
Cloud
```

when practical.

---

# 160. Contract Tests

Use contract tests at important boundaries.

Examples:

```text
Service API
Provider adapter
Event schema
SDK
```

---

# 161. Integration Tests

Integration tests SHOULD verify:

```text
Database
Queue
External adapter
Authorization
Transaction behavior
```

where boundaries matter.

---

# 162. End-to-End Tests

Use E2E testing for critical system journeys.

Architecture should not make critical paths impossible to test realistically.

---

# 163. Test Environment

Test environments SHOULD resemble important production behavior enough to catch architectural issues.

Do not assume mocks prove distributed behavior.

---

# 164. Architecture and Performance

Performance should be considered at boundaries.

Typical sources:

```text
Network calls
Database queries
Serialization
Cache misses
External dependencies
Client bundle
```

---

# 165. Avoid Chatty Interfaces

Cross-process APIs should avoid dozens of small sequential calls.

Prefer appropriately coarse operations.

Network calls are not function calls.

---

# 166. N+1 Across Services

Distributed N+1 calls can be more damaging than database N+1.

Design bulk APIs or aggregation where needed.

---

# 167. Aggregation Layer

A backend-for-frontend or composition layer MAY aggregate multiple downstream services for UI needs.

Use only when it clarifies ownership and reduces client coupling.

---

# 168. Backend for Frontend

BFFs are useful when clients have significantly different needs.

Examples:

```text
Web
Mobile
Partner API
```

Do not create a BFF for every screen.

---

# 169. GraphQL

Use GraphQL when flexible graph-shaped client querying materially improves architecture.

Do not adopt it simply to avoid designing APIs.

GraphQL still requires:

```text
Authorization
Query limits
N+1 prevention
Caching strategy
Schema governance
```

---

# 170. REST

REST remains a strong default for many resource-oriented APIs.

Use consistent:

```text
resources
methods
status codes
pagination
errors
```

---

# 171. RPC

RPC-style APIs can be appropriate for action-oriented internal systems.

Use explicit contracts.

Do not hide business behavior behind generic endpoints.

---

# 172. External Integrations

Every external integration should have:

```text
Owner
Adapter
Timeout
Retry policy
Error translation
Observability
Credential ownership
```

---

# 173. Third-Party Failure

Architecture MUST define what happens when a major third party fails.

Examples:

```text
Payment provider
Email provider
Identity provider
Cloud storage
```

---

# 174. Provider Abstraction

Abstract providers when:

- multiple providers exist;
- replacement is plausible;
- domain should not depend on vendor semantics;
- testing benefits.

Do not create speculative abstractions without value.

---

# 175. Data Export

Critical product data SHOULD have a documented export strategy where business requirements demand portability.

Avoid irreversible vendor lock-in without understanding it.

---

# 176. Technical Debt

Technical debt must be explicit.

Classify:

```text
Intentional
Accidental
Temporary
Structural
Operational
Security
```

---

# 177. Debt Record

Significant debt SHOULD document:

```text
Why it exists
Risk
Impact
Owner
Trigger for remediation
```

---

# 178. Architecture Drift

Architecture will drift unless boundaries are enforced.

Use:

```text
Lint rules
Import restrictions
Code review
Architecture tests
Ownership
```

where appropriate.

---

# 179. Architecture Tests

Architecture can be tested.

Examples:

```text
Domain cannot import UI
Client cannot import server-only
Feature A cannot deep-import Feature B
Foundation cannot import product feature
```

---

# 180. Fitness Functions

Use automated architecture fitness functions when useful.

Examples:

```text
dependency cycles = 0
bundle size < target
service latency < threshold
forbidden dependency = none
```

---

# 181. Dependency Cycles

Circular dependencies usually indicate unclear ownership.

Resolve the model.

Do not hide cycles through lazy imports.

---

# 182. Shared Libraries

Shared libraries should capture stable cross-cutting capability.

Examples:

```text
Auth
Observability
Design system
Validation
HTTP infrastructure
```

Avoid giant:

```text
common
utils
shared
```

packages.

---

# 183. Shared Domain Model

Avoid one global enterprise object model.

Different domains may need different representations of the same real-world concept.

Translate at boundaries.

---

# 184. Canonical Data Model

Use a canonical model only where genuine organization-wide semantics justify it.

Do not centralize merely to eliminate translation.

---

# 185. Integration Database Anti-Pattern

Avoid using one database as the integration mechanism for many independent systems.

It creates hidden coupling.

---

# 186. Shared File System Anti-Pattern

Avoid systems communicating through undocumented shared files/directories.

Use explicit contracts.

---

# 187. Global Mutable State

Avoid hidden shared state across modules/processes.

Global mutable state complicates:

```text
Testing
Concurrency
Scaling
Failure recovery
```

---

# 188. Temporal Coupling

Avoid architecture requiring undocumented call order.

If order matters, encode it in:

```text
workflow
state machine
API
```

---

# 189. State Machines

Use explicit state machines for workflows with meaningful transitions.

Examples:

```text
Payment
Order
Approval
Subscription
```

---

# 190. State Transition Validation

Define valid transitions.

Example:

```text
draft → submitted
submitted → approved
submitted → rejected
approved → completed
```

Prevent illegal transitions centrally.

---

# 191. Workflow State

Do not derive critical workflow state from scattered booleans.

Bad:

```text
isApproved
isSubmitted
isCancelled
isCompleted
```

may allow impossible combinations.

Prefer a deliberate state model.

---

# 192. Architecture Security Review

Architecture changes requiring security review include:

```text
New trust boundary
New external integration
New auth system
New public endpoint
New tenant model
New secret path
New data classification
New file processing
```

---

# 193. Architecture Performance Review

Performance review is warranted for:

```text
New high-volume path
Large synchronous fan-out
New expensive query pattern
New media processing
New realtime system
```

---

# 194. Architecture Cost Review

Cloud cost is architectural.

Evaluate:

```text
Compute
Storage
Egress
Database
Observability
Queues
Third-party API
```

before large-scale adoption.

---

# 195. Cost Visibility

Significant systems SHOULD support cost attribution by:

```text
service
tenant
feature
environment
```

where economically useful.

---

# 196. Avoid Premature Platform Engineering

Do not build a general internal platform before recurring needs are understood.

First:

```text
solve concrete problems
observe repetition
standardize
automate
platformize
```

---

# 197. Paved Roads

Platform architecture SHOULD provide recommended paths for common needs.

Examples:

```text
Auth
Database
Queue
Logging
Deployment
Secrets
```

Teams should have a safe default.

---

# 198. Escape Hatches

Paved roads MAY allow exceptions.

Exceptions should be:

```text
explicit
owned
reviewed
```

not accidental fragmentation.

---

# 199. Multi-Repository vs Monorepo

Choose based on:

```text
Ownership
Release cadence
Dependency coordination
Tooling
Access control
```

Neither is inherently superior.

---

# 200. Monorepo

A monorepo works well when:

```text
teams share tooling
changes cross packages
coordinated refactoring matters
```

It still requires dependency boundaries.

---

# 201. Polyrepo

Multiple repositories work well when:

```text
ownership is independent
deployments are independent
access differs
release lifecycle differs
```

Cross-repo coordination cost must be accepted.

---

# 202. Repository Is Not Architecture

A repository boundary does not automatically mean:

```text
service boundary
domain boundary
security boundary
```

Treat these separately.

---

# 203. Deployment Unit

Define each deployment unit intentionally.

Examples:

```text
Web app
API
Worker
Scheduler
Search indexer
```

Do not create deployment units solely because folders exist.

---

# 204. Process Boundary

A process boundary should correspond to operational or technical need.

Each process introduces:

```text
deployment
monitoring
failure
resource
```

responsibility.

---

# 205. Background Workers

Separate workers when:

- workload is asynchronous;
- resource profile differs;
- failure isolation matters;
- scale differs.

---

# 206. Scheduled Jobs

Scheduled work MUST define:

```text
Owner
Concurrency
Idempotency
Retry
Timeout
Monitoring
```

Cron is architecture too.

---

# 207. Realtime Architecture

Realtime features should define:

```text
Connection model
Authentication
Subscription authorization
Backpressure
Reconnect behavior
Ordering
Presence semantics
```

---

# 208. WebSocket vs Polling

Choose based on actual latency requirements.

Polling is often simpler.

Use realtime connections when product value justifies stateful infrastructure.

---

# 209. Search Architecture

Search should have a clear source of truth.

Typically:

```text
Primary database
↓
indexing pipeline
↓
search index
```

Search index should not silently become authoritative business state.

---

# 210. Analytics Architecture

Operational state and analytics state SHOULD be separated conceptually.

Analytics pipelines may tolerate different consistency and storage models.

Do not run every analytical query against the production transactional database.

---

# 211. OLTP vs OLAP

Use transactional systems for operational workloads.

Use analytical systems when large-scale aggregation requires it.

Do not force one database to solve every workload.

---

# 212. Reporting

Reporting MAY use replicated or transformed data.

Document:

```text
freshness
consistency
source
```

so users understand delays.

---

# 213. File Architecture

Files should have explicit:

```text
owner
storage
metadata
authorization
retention
```

Object storage usually owns bytes; application database owns business metadata.

---

# 214. Signed URLs

Use short-lived signed access where direct object storage access is appropriate.

Authorization should occur before issuance.

---

# 215. Content Processing

Media/document processing should be isolated from request path where expensive or risky.

---

# 216. External Command Execution

If architecture executes untrusted code, use strong isolation.

Do not run untrusted code in the application process.

---

# 217. Sandbox Boundary

Sandboxing must be a real technical boundary.

A module or container alone may not provide sufficient isolation depending on threat model.

---

# 218. AI/LLM Architecture

AI capabilities should be treated as external probabilistic systems.

Architecture should define:

```text
Prompt source
Model
Tool permissions
Data access
Output validation
Human approval
Cost limits
Observability
Fallback
```

---

# 219. AI Output Is Untrusted

LLM output must not directly become:

```text
SQL
shell command
authorization decision
financial transaction
privileged action
```

without validation and controls.

---

# 220. Prompt Injection Boundary

External content entering an AI context is untrusted.

Tool permission design must prevent prompt content from becoming authority.

---

# 221. Human-in-the-Loop

Use human approval for consequential AI actions when risk requires it.

Examples:

```text
Payments
Account deletion
Permission changes
External publication
```

---

# 222. Architecture Lifecycle

Architecture evolves through:

```text
Design
Implement
Measure
Operate
Learn
Refactor
Retire
```

Architecture is not frozen at launch.

---

# 223. Evolutionary Architecture

Prefer architectures that allow incremental change.

Good architecture supports:

```text
module extraction
provider replacement
schema evolution
API versioning
incremental migration
```

without full rewrites.

---

# 224. Strangler Pattern

For legacy replacement:

```text
Legacy
↓
route selected capability to new implementation
↓
increase coverage
↓
retire legacy
```

Prefer incremental migration over big-bang rewrites when feasible.

---

# 225. Big-Bang Rewrite

A full rewrite requires unusually strong justification.

Common risks:

```text
Lost business behavior
Long feedback gap
Migration failure
Feature freeze
```

Prefer incremental modernization when possible.

---

# 226. Legacy Systems

Legacy does not mean bad.

A stable older system may remain valuable.

Modernize based on:

```text
Risk
Cost
Change difficulty
Security
Operational burden
```

not age alone.

---

# 227. Architecture Retirement

Components/services should be retired intentionally.

Define:

```text
Replacement
Migration
Data disposition
Traffic removal
Dependency cleanup
Observability removal
```

---

# 228. Tombstones

Retired interfaces may require temporary:

```text
redirect
compatibility response
clear deprecation error
```

to prevent silent failure.

---

# 229. Architecture Review

Architecture review SHOULD focus on:

```text
Boundaries
Data ownership
Trust
Failure
Dependencies
Operability
Evolution
```

not stylistic preferences.

---

# 230. Architecture Review Questions

Ask:

```text
What owns this capability?
What owns the data?
Who may call it?
What happens when it fails?
What is the source of truth?
How is it deployed?
How is it observed?
How does it evolve?
```

---

# 231. Architecture Review Trigger

Formal review is appropriate for:

```text
New service
New database
New message broker
New external provider
New trust boundary
New tenant model
New region
Major migration
```

---

# 232. Small Changes

Do not require heavy architecture process for ordinary feature work.

Governance should be proportional to risk.

---

# 233. Architecture Principles Over Diagrams

A beautiful diagram cannot compensate for:

```text
unclear ownership
shared mutable state
circular dependencies
unknown failure behavior
```

Architecture quality is operational.

---

# 234. Architecture Anti-Patterns

Avoid:

```text
Microservices because large companies use them.
```

Avoid:

```text
One giant application with unrestricted internal imports.
```

Avoid:

```text
Shared database as integration contract.
```

Avoid:

```text
Every service calls every other service synchronously.
```

Avoid:

```text
Shared "common" library containing business logic from every domain.
```

Avoid:

```text
Framework types throughout domain logic.
```

Avoid:

```text
Vendor SDK imported everywhere.
```

Avoid:

```text
One global enterprise model.
```

Avoid:

```text
Distributed transactions for ordinary workflows.
```

Avoid:

```text
Event bus with no schema ownership.
```

Avoid:

```text
Queue added for every operation.
```

Avoid:

```text
Caching with no invalidation strategy.
```

Avoid:

```text
Retries with no limits.
```

Avoid:

```text
No timeout on external calls.
```

Avoid:

```text
Multi-region before product-market fit without requirement.
```

Avoid:

```text
Architecture optimized for hypothetical billion-user scale.
```

Avoid:

```text
Big-bang rewrite as default modernization strategy.
```

Avoid:

```text
Every architectural concern wrapped in generic abstraction.
```

Avoid:

```text
No owner.
```

---

# 235. Architecture Review Checklist

Before approving significant architecture:

```text
□ Product problem clearly defined
□ Simplest viable architecture considered
□ Domain boundaries identified
□ Ownership identified
□ Dependency direction defined
□ Data ownership defined
□ Source of truth defined
□ Transaction boundaries defined
□ Consistency requirements defined
□ Trust boundaries identified
□ Authentication model defined
□ Authorization model defined
□ Tenant boundaries defined where relevant
□ Public contracts defined
□ Failure behavior defined
□ Timeout behavior defined
□ Retry behavior defined
□ Idempotency considered
□ Scaling assumptions documented
□ Cache semantics documented
□ External dependencies identified
□ Observability defined
□ Deployment ownership defined
□ Recovery strategy defined
□ Security reviewed
□ Cost implications understood
□ Testing approach defined
□ Migration/evolution path defined
□ ADR/RFC created where warranted
```

---

# 236. New Service Checklist

Before creating a new service:

```text
□ Why can this not remain a module?
□ Independent ownership exists
□ Independent deployment creates value
□ Data ownership is clear
□ Contract is defined
□ Service identity defined
□ Authorization defined
□ Database ownership defined
□ Failure behavior defined
□ Timeout/retry defined
□ Observability exists
□ SLO defined where required
□ CI/CD exists
□ Runbook exists
□ On-call ownership exists
□ Local development is practical
```

If these cannot be answered, extraction may be premature.

---

# 237. New Database Checklist

Before introducing another database technology:

```text
□ Current database cannot reasonably satisfy requirement
□ Workload difference is meaningful
□ Operational owner exists
□ Backup strategy exists
□ Security model exists
□ Monitoring exists
□ Migration path exists
□ Data ownership defined
□ Consistency model understood
□ Team can operate technology
```

---

# 238. New Queue Checklist

Before introducing messaging:

```text
□ Async semantics provide real value
□ Producer defined
□ Consumer defined
□ Schema defined
□ Retry policy defined
□ Dead-letter strategy defined
□ Idempotency defined
□ Ordering assumptions defined
□ Monitoring defined
□ Replay behavior understood
```

---

# 239. New External Provider Checklist

```text
□ Capability required
□ Vendor risk reviewed
□ Security reviewed
□ Data shared is understood
□ Credentials managed
□ Timeout defined
□ Retry defined
□ Failure fallback defined
□ Cost understood
□ Data portability understood
□ Adapter/ownership model defined
```

---

# 240. Definition of Done — Architecture

A significant architecture change is complete only when:

```text
✓ Ownership is assigned
✓ Boundaries are clear
✓ Dependencies follow intended direction
✓ Data ownership is clear
✓ Trust boundaries are clear
✓ Contracts are explicit
✓ Security is enforced
✓ Failure behavior is understood
✓ Observability exists
✓ Deployment is automated
✓ Recovery is possible
✓ Tests cover critical boundaries
✓ Documentation exists
✓ Migration is complete
✓ Old architecture is removed where applicable
```

---

# 241. AI Architecture Rules

AI coding agents MUST respect existing architecture before creating new structure.

Before implementing a significant feature, inspect:

```text
Domain boundaries
Existing modules
Public APIs
Database ownership
Security model
Shared libraries
Event contracts
Repository rules
```

---

# 242. AI Simplest-Architecture Rule

AI SHOULD prefer the smallest architecture that satisfies the requirement.

It MUST NOT introduce:

```text
microservice
queue
event bus
new database
global store
generic framework
```

without demonstrated need.

---

# 243. AI Module Rule

New business capability SHOULD begin as a module unless existing architecture dictates otherwise.

Do not create a new deployable service by default.

---

# 244. AI Boundary Rule

AI MUST NOT deep-import another module's internals when a public contract exists.

If no public contract exists, prefer establishing one over bypassing ownership.

---

# 245. AI Data Rule

AI MUST identify data ownership before writing cross-domain data mutations.

It SHOULD NOT update another domain's tables directly unless architecture explicitly permits it.

---

# 246. AI Dependency Rule

AI MUST preserve dependency direction.

Example:

```text
Domain
MUST NOT
import presentation framework
```

unless existing architecture explicitly uses another model.

---

# 247. AI External Provider Rule

AI SHOULD isolate new third-party SDK usage behind an existing or appropriate adapter when provider coupling matters.

Do not scatter provider-specific behavior through feature code.

---

# 248. AI Event Rule

AI MUST NOT invent event schemas casually.

Before publishing a new event:

```text
check naming
ownership
schema
versioning
idempotency
consumer expectations
```

---

# 249. AI Queue Rule

AI MUST NOT add asynchronous processing merely because the operation is slow.

First determine whether:

```text
request can be optimized
background work is semantically acceptable
user requires immediate result
```

---

# 250. AI Cache Rule

AI MUST define:

```text
scope
key
TTL
invalidation
authorization impact
```

before introducing cache.

---

# 251. AI Security Architecture Rule

AI MUST treat new:

```text
external endpoint
service
queue
database
integration
```

as a potential trust-boundary change.

Apply the Security Gold Standard.

---

# 252. AI Migration Rule

AI SHOULD prefer incremental architecture migration over destructive rewrites.

Preserve compatibility while migrating where practical.

---

# 253. AI Architecture Documentation Rule

For meaningful architecture changes, AI SHOULD update:

```text
Architecture overview
ADR
Data flow
Relevant runbook
```

as appropriate.

---

# 254. AI Anti-Overengineering Rule

AI MUST NOT create abstractions purely to demonstrate architectural patterns.

Every abstraction should reduce real complexity.

---

# 255. Architecture Golden Rules

**1. Start simple.**  
Use the simplest architecture that satisfies real requirements.

**2. Prefer a modular monolith before distributed architecture.**

**3. Boundaries follow business capabilities.**

**4. Every important capability has an owner.**

**5. Every important dataset has an owner.**

**6. Dependencies point toward stable policy.**

**7. Keep domain logic independent from framework and vendors where practical.**

**8. Treat internal APIs as contracts.**

**9. Network calls are not function calls.**

**10. Distributed systems require explicit failure semantics.**

**11. Use synchronous communication for immediate dependencies.**

**12. Use asynchronous communication when decoupling is genuinely valuable.**

**13. Design consumers to tolerate duplicate messages.**

**14. Use strong consistency where invariants require it.**

**15. Use eventual consistency where temporary divergence is acceptable.**

**16. A cache requires an invalidation strategy.**

**17. External calls require timeouts.**

**18. Retries must be bounded.**

**19. Security boundaries are architectural boundaries.**

**20. Tenant boundaries are architectural boundaries.**

**21. Observability is part of architecture.**

**22. Recovery is part of architecture.**

**23. Cost is an architectural concern.**

**24. Architecture must fit team cognitive capacity.**

**25. A service without an owner should not exist.**

**26. Avoid global shared mutable state.**

**27. Avoid circular dependencies.**

**28. Do not use databases as undocumented integration APIs.**

**29. Prefer incremental migration to big-bang rewrites.**

**30. Record important architectural decisions.**

---

# 256. Canonical Architecture Standard

The organizational standard is:

> **Applications begin with the simplest architecture capable of satisfying current product, security, reliability, and scale requirements. The default architecture is a modular system with explicit business boundaries, clear ownership, intentional dependency direction, well-defined data ownership, and small stable contracts. Core domain logic remains independent from frameworks, databases, and vendor SDKs where practical. Distributed services, asynchronous messaging, additional databases, advanced caching, multi-region infrastructure, and other high-complexity mechanisms are introduced only when a demonstrated requirement justifies their operational and cognitive cost.**

> **Every architectural boundary defines ownership, trust, data, communication, consistency, failure, observability, deployment, and evolution behavior. Security, reliability, operability, cost, and recovery are treated as architecture—not post-implementation concerns.**

The architecture should make it easy to answer:

```text
What owns this capability?
What owns this data?
What may depend on it?
What is its public contract?
What is the source of truth?
What consistency does it provide?
What happens when it fails?
How is it secured?
How is it observed?
How is it deployed?
How is it recovered?
How can it change safely?
```

If those answers are unclear, the architecture is not yet mature.

---

# 257. Recommended Default Architecture

For most modern product applications, the recommended initial model is:

```text
Client
↓
Application Framework
↓
Route / Presentation Layer
↓
Application Use Cases
↓
Domain Modules
↓
Infrastructure Adapters
↓
Database / External Systems
```

With domain organization:

```text
Application
├── Identity
├── Workspaces
├── Projects
├── Billing
├── Notifications
└── Reporting
```

Each domain owns:

```text
Public interface
Business rules
Data responsibility
Authorization semantics
Events
Tests
Documentation
```

and does not expose its internals freely.

Start here.

Only distribute the architecture further when real requirements make the additional complexity worthwhile.

Dalam master standard kau, aku akan letak **Architecture** paling awal selepas Foundations:

**Foundations → Architecture → Framework → Security → Auth/AuthZ → Data & Database → API → Routes → State → Design Tokens → Layouts → Facade → Components → Patterns → Reusability → Testing → Performance → Observability → Deployment → Documentation → Governance.**

Architecture ialah layer yang menentukan **semua guideline di bawahnya duduk di mana dan siapa yang owns apa**.
