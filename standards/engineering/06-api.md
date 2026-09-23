---
id: "api"
title: "API Guidelines — Gold Standard"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "api"]
applies_to: ["api"]
related: []
legacy_number: 12
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 70981
provenance: baseline

---

This API standard assumes **HTTP APIs as the default external contract**, REST/resource-oriented semantics where appropriate, RPC/action endpoints where the domain is inherently command-oriented, and OpenAPI as the canonical machine-readable contract. Error responses follow RFC 9457 Problem Details rather than inventing a different error envelope for every service.

# API Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical standards for designing, implementing, documenting, securing, operating, evolving, and retiring APIs.

They apply to:

- public APIs;
- partner APIs;
- internal service APIs;
- browser-facing APIs;
- mobile APIs;
- server-to-server APIs;
- webhooks;
- SDK-facing APIs;
- asynchronous API contracts where applicable.

The objectives are:

- predictable interfaces;
- stable contracts;
- strong security;
- consistent semantics;
- explicit ownership;
- controlled evolution;
- efficient client integration;
- operational visibility;
- resilience;
- long-term maintainability.

The core principle is:

> **An API is a product contract, not merely a transport mechanism.**

---

# 2. Normative Language

The following words are intentional:

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented reason exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions to API standards SHOULD document:

```text
Reason
Consumer impact
Security impact
Compatibility impact
Owner
Review date
```

---

# 3. API Design Principles

APIs SHOULD be:

```text
Predictable
Consistent
Explicit
Secure
Composable
Discoverable
Observable
Evolvable
```

Prefer boring consistency over cleverness.

---

# 4. Contract First

Before implementation, significant APIs SHOULD define:

```text
Purpose
Consumers
Resources/actions
Authentication
Authorization
Request schema
Response schema
Errors
Pagination
Rate limits
Idempotency
Compatibility
Ownership
```

Do not let implementation accidents become the public API.

---

# 5. API as a Stable Boundary

Once consumers depend on an API, its behavior becomes a contract.

This includes:

```text
Paths
Methods
Fields
Types
Nullability
Defaults
Errors
Status codes
Ordering
Pagination
Rate-limit behavior
Semantics
```

Changing semantics can be breaking even when JSON shape remains unchanged.

---

# 6. API Types

Classify every API.

Recommended classifications:

```text
Public
Partner
Internal
Frontend/BFF
Administrative
Webhook
Machine-to-machine
```

Different classes may have different compatibility and security requirements.

---

# 7. Public API

Public APIs require the strongest contract discipline.

They SHOULD have:

```text
Stable versioning
Published documentation
Authentication documentation
Rate-limit policy
Deprecation policy
Changelog
SDK strategy where useful
Support expectations
```

---

# 8. Internal API

Internal does not mean informal.

Internal APIs still require:

- authorization;
- schemas;
- ownership;
- error semantics;
- observability;
- compatibility discipline.

Organizational boundaries can make internal APIs as consequential as external APIs.

---

# 9. Private Module API

Do not create HTTP boundaries where function/module boundaries are sufficient.

Inside a modular monolith:

```text
module call
>
internal HTTP call
```

unless HTTP provides a real architectural boundary.

---

# 10. API Style Decision

Choose deliberately between:

```text
REST/resource-oriented
RPC/action-oriented
GraphQL
Event/message API
```

Do not mix styles randomly within one API surface.

---

# 11. REST as Default

Resource-oriented HTTP APIs are the default when the domain naturally exposes:

```text
resources
collections
relationships
state
```

Examples:

```text
/projects
/projects/{projectId}
/users/{userId}
/invoices/{invoiceId}
```

---

# 12. RPC

RPC-style APIs are appropriate when behavior is naturally command-oriented.

Examples:

```text
/calculate-quote
/verify-domain
/reconcile-account
```

or equivalent method-oriented contracts.

Do not force every domain action into awkward CRUD semantics.

---

# 13. GraphQL

Use GraphQL where client-driven graph querying provides substantial value.

GraphQL requires governance for:

```text
Schema ownership
Authorization
Complexity limits
N+1 prevention
Deprecation
Caching
Observability
```

Do not choose GraphQL merely to avoid designing resource APIs.

---

# 14. Resource Naming

Resource names SHOULD use nouns.

Preferred:

```text
/projects
/invoices
/members
```

Avoid:

```text
/getProjects
/createInvoice
/deleteMember
```

for ordinary REST resources.

---

# 15. Collection Naming

Collections SHOULD generally use plural nouns.

Example:

```text
/users
/projects
/invoices
```

Use one consistent convention.

---

# 16. Lowercase Paths

Paths SHOULD use lowercase.

Preferred:

```text
/payment-methods
```

Avoid:

```text
/paymentMethods
/PaymentMethods
```

---

# 17. Path Word Separation

Use hyphens for multi-word static path segments.

Preferred:

```text
/payment-methods
/api-keys
```

Avoid:

```text
/payment_methods
/paymentMethods
```

---

# 18. Resource Identity

Individual resources use stable identifiers.

Example:

```text
/projects/{projectId}
```

Do not use mutable names as canonical identity unless the domain guarantees stability.

---

# 19. Nested Resources

Nest resources when the parent relationship is semantically necessary.

Good:

```text
/workspaces/{workspaceId}/members
```

Avoid excessive nesting:

```text
/organizations/{id}/workspaces/{id}/projects/{id}/tasks/{id}/comments/{id}
```

when the lower resource can be addressed directly.

---

# 20. Route Depth

Keep API paths shallow.

The path should contain only context required to identify or scope the operation.

---

# 21. HTTP GET

Use `GET` for retrieval.

GET MUST NOT intentionally perform destructive or state-changing business operations.

GET should be safe.

---

# 22. HTTP POST

Use `POST` for:

- creating resources where the server determines identity;
- commands;
- operations without naturally idempotent semantics.

Example:

```text
POST /projects
```

---

# 23. HTTP PUT

Use `PUT` for complete replacement or idempotent creation/update semantics where the client identifies the target.

Do not use PUT merely because it represents "update."

---

# 24. HTTP PATCH

Use `PATCH` for partial updates.

The patch semantics MUST be explicit.

Possible standards include:

```text
JSON Merge Patch
JSON Patch
documented domain-specific patch object
```

Do not silently change patch semantics between resources.

---

# 25. HTTP DELETE

Use `DELETE` to request deletion of the addressed resource.

Deletion semantics MUST specify whether deletion is:

```text
immediate
soft
asynchronous
scheduled
```

---

# 26. HEAD and OPTIONS

Support `HEAD` and `OPTIONS` where protocol behavior or infrastructure requires them.

Do not implement them manually unless necessary.

---

# 27. Safe Methods

Methods intended to be safe MUST NOT produce business-state changes visible to the user.

Operational side effects such as logging may still occur.

---

# 28. Idempotent Methods

Understand HTTP idempotency semantics.

Conceptually:

```text
PUT
DELETE
safe methods
```

are expected to be idempotent at the protocol semantics level.

Application behavior must respect that expectation.

---

# 29. HTTP Status Codes

Use standard HTTP status semantics.

Do not create an API where every response is:

```text
200 OK
```

with an internal field:

```json
{
  "success": false
}
```

for ordinary HTTP errors.

---

# 30. 200 OK

Use when a successful request returns a representation/result.

---

# 31. 201 Created

Use when a resource was successfully created.

Where useful, include the canonical resource location.

---

# 32. 202 Accepted

Use when the request is accepted for asynchronous processing but is not complete.

The API SHOULD provide a way to determine operation status where appropriate.

---

# 33. 204 No Content

Use when success does not require a response body.

Do not return an empty JSON object solely because every endpoint is expected to have JSON.

---

# 34. 400 Bad Request

Use for malformed or semantically invalid requests that do not fit a more specific status.

---

# 35. 401 Unauthorized

Use when authentication credentials are missing or invalid.

Despite the historical name, this status primarily concerns authentication.

---

# 36. 403 Forbidden

Use when the authenticated principal is understood but is not permitted to perform the operation.

Security policy MAY deliberately return 404 instead where resource existence should not be disclosed.

---

# 37. 404 Not Found

Use when the resource does not exist or should be indistinguishable from inaccessible resources.

---

# 38. 405 Method Not Allowed

Use when the resource exists but the HTTP method is unsupported.

---

# 39. 409 Conflict

Use when the request conflicts with current resource state.

Examples:

```text
duplicate resource
state transition conflict
version conflict
```

---

# 40. 410 Gone

Use where a previously available resource is intentionally and permanently unavailable and that distinction is useful to consumers.

---

# 41. 412 Precondition Failed

Use for failed conditional request semantics where applicable.

---

# 42. 413 Content Too Large

Use when request payload exceeds accepted limits.

---

# 43. 415 Unsupported Media Type

Use when request media type is unsupported.

---

# 44. 422 Unprocessable Content

Use when request syntax is valid but supplied content cannot be processed because of semantic validation failures, where this convention fits the API.

Use consistently.

---

# 45. 429 Too Many Requests

Use for rate-limit enforcement.

Provide retry metadata where practical.

---

# 46. 500 Internal Server Error

Use for unexpected server failures.

Do not expose implementation details in the response.

---

# 47. 502 Bad Gateway

Use when acting as a gateway/proxy and an upstream service gives an invalid response.

---

# 48. 503 Service Unavailable

Use for temporary service unavailability.

`Retry-After` MAY be useful where recovery timing is known.

---

# 49. 504 Gateway Timeout

Use when an upstream dependency exceeds the gateway's allowed response time.

---

# 50. Do Not Invent Status Codes

Use registered HTTP semantics.

Domain-specific detail belongs in the response representation, not custom three-digit status codes.

---

# 51. Response Format

JSON is the default representation for ordinary APIs unless another media type provides clear value.

Use:

```text
application/json
```

for normal JSON responses.

---

# 52. Content-Type

Requests and responses MUST use accurate media types.

Do not accept arbitrary content types silently.

---

# 53. Content Negotiation

Implement content negotiation only when multiple representations create actual value.

Do not introduce complexity merely because HTTP supports it.

---

# 54. JSON Naming

Use one JSON field naming convention.

Recommended:

```text
camelCase
```

for JavaScript/TypeScript-centric application ecosystems.

Example:

```json
{
  "createdAt": "...",
  "workspaceId": "..."
}
```

Do not mix:

```text
created_at
createdAt
CreatedAt
```

within one API without reason.

---

# 55. JSON Types

Use proper JSON types.

Do not encode:

```text
boolean
integer
array
object
```

as strings without protocol necessity.

Bad:

```json
{
  "enabled": "true",
  "count": "23"
}
```

---

# 56. IDs

IDs SHOULD generally be serialized as strings when their representation may exceed language-safe integer ranges or is inherently nonnumeric.

Example:

```json
{
  "id": "prj_..."
}
```

---

# 57. Money

Never send ambiguous monetary values.

Prefer:

```json
{
  "amount": 12500,
  "currency": "MYR"
}
```

when using minor units.

Document unit semantics explicitly.

---

# 58. Dates

Calendar dates SHOULD use unambiguous ISO-style representation.

Example:

```text
2026-09-22
```

---

# 59. Timestamps

Timestamps SHOULD use an unambiguous RFC 3339-compatible timestamp representation.

Example:

```text
2026-09-22T13:25:30Z
```

Preserve timezone/offset semantics where necessary.

---

# 60. Durations

Document duration units explicitly.

Avoid ambiguous:

```json
{
  "timeout": 30
}
```

Prefer semantic naming such as:

```json
{
  "timeoutSeconds": 30
}
```

when no standardized duration representation is used.

---

# 61. Nullability

`null`, missing, and empty values have different semantics.

Define them intentionally.

Do not use them interchangeably.

---

# 62. Missing Fields

A missing field SHOULD mean something clear.

Possible semantics:

```text
not requested
not available
not applicable
not changed
```

depending on contract.

---

# 63. Empty Collections

When a collection exists but contains no items, prefer:

```json
{
  "items": []
}
```

rather than `null`.

---

# 64. Boolean Fields

Boolean fields SHOULD use positive names where possible.

Prefer:

```text
enabled
archived
verified
```

over double-negative concepts.

---

# 65. Enums

Enum/string values SHOULD be stable machine-oriented identifiers.

Example:

```text
pending
active
cancelled
```

Do not expose localized display text as enum identity.

---

# 66. Enum Evolution

Adding a new enum value can break consumers that assume exhaustiveness.

Document whether consumers MUST tolerate unknown values.

---

# 67. Request Validation

Every request MUST validate applicable:

```text
path parameters
query parameters
headers
body
files
```

at a trusted server boundary.

---

# 68. Type Validation

Validate runtime types.

TypeScript types do not validate HTTP requests.

---

# 69. Semantic Validation

After structural validation, validate domain semantics.

Example:

```text
startDate <= endDate
quantity > 0
status transition allowed
```

---

# 70. Validation Allowlist

Prefer known valid values.

Do not attempt to enumerate every possible malicious input.

---

# 71. Unknown Request Fields

Define a consistent policy.

Possible approaches:

```text
reject unknown fields
ignore unknown fields
```

For security-sensitive write APIs, rejection is often easier to reason about.

Use one documented convention.

---

# 72. Mass Assignment

Never map arbitrary request bodies directly into privileged persistence models.

Bad:

```text
updateUser(request.body)
```

Prefer explicit mapping.

---

# 73. Size Limits

Define maximum:

```text
request body
string
array
batch
file
page size
```

where abuse or resource exhaustion is possible.

---

# 74. Query Parameters

Use query parameters for collection/view modifiers.

Examples:

```text
?status=active
?sort=createdAt
?pageSize=50
```

---

# 75. Filtering

Filtering syntax SHOULD be consistent across APIs.

Simple example:

```text
?status=active
?type=invoice
```

Complex filtering may require a structured convention.

Do not let each endpoint invent a query language.

---

# 76. Multi-Value Filtering

Choose one convention.

Example:

```text
?status=active&status=pending
```

or:

```text
?status=active,pending
```

Do not mix conventions unnecessarily.

---

# 77. Sorting

Use explicit sort semantics.

Example:

```text
?sort=createdAt
?sort=-createdAt
```

or:

```text
?sort=createdAt&order=desc
```

Choose one organization-wide pattern.

---

# 78. Sort Allowlist

Clients MUST NOT control raw database column names or SQL expressions.

Map supported sort values to known server-side fields.

---

# 79. Searching

Simple search may use:

```text
?search=acme
```

or:

```text
?q=acme
```

Choose one convention.

Search semantics must be documented.

---

# 80. Field Selection

Sparse field selection MAY be offered when response size materially matters.

Example:

```text
?fields=id,name,status
```

Do not introduce it unless consumer needs justify the additional contract complexity.

---

# 81. Includes / Expansion

Related resources MAY be optionally expanded.

Example:

```text
?include=owner,members
```

Expansion must remain:

- authorized;
- bounded;
- predictable.

---

# 82. Pagination Is Mandatory for Large Collections

Collection endpoints capable of large growth MUST use bounded pagination.

Never expose unbounded:

```text
GET /users
```

returning the entire dataset.

---

# 83. Pagination Strategy

Use:

```text
cursor/keyset pagination
```

for large or frequently changing datasets.

Use offset pagination when:

- collections are reasonably bounded;
- human page-number navigation matters;
- consistency requirements are modest.

---

# 84. Cursor Pagination

A typical response:

```json
{
  "items": [],
  "nextCursor": "..."
}
```

Cursor content should be opaque to consumers.

---

# 85. Cursor Security

Do not place sensitive information into client-readable cursors unless appropriately protected.

Prefer opaque encoding/signing where necessary.

---

# 86. Cursor Stability

Cursors should remain valid according to documented semantics.

Avoid making clients reconstruct cursor internals.

---

# 87. Offset Pagination

Typical:

```text
?page=3&pageSize=50
```

or:

```text
?offset=100&limit=50
```

Choose one pattern.

---

# 88. Pagination Maximum

Enforce a server-side maximum page size.

Do not allow:

```text
?pageSize=10000000
```

to exhaust resources.

---

# 89. Pagination Metadata

Provide only metadata consumers actually need.

Possible:

```text
nextCursor
previousCursor
hasMore
totalCount
```

`totalCount` may be expensive and SHOULD NOT be guaranteed unless the product requires it.

---

# 90. Stable Ordering

Pagination MUST use deterministic ordering.

Example:

```text
createdAt DESC
id DESC
```

where `createdAt` alone may not be unique.

---

# 91. Error Model

APIs MUST have one predictable error model.

For HTTP APIs, RFC 9457 Problem Details is the preferred baseline.

Conceptually:

```json
{
  "type": "https://api.example.com/problems/validation-error",
  "title": "Validation failed",
  "status": 422,
  "detail": "One or more fields are invalid.",
  "instance": "...",
  "errors": []
}
```

---

# 92. Error Type

Machine-actionable error identity SHOULD be stable.

Consumers MUST NOT need to parse human-readable messages.

---

# 93. Human-Readable Error Text

Human-readable error descriptions may evolve.

Clients should not depend on exact message text.

---

# 94. Validation Errors

Validation errors SHOULD identify affected fields/locations.

Conceptually:

```json
{
  "errors": [
    {
      "field": "email",
      "code": "invalid_format",
      "detail": "Enter a valid email address."
    }
  ]
}
```

---

# 95. Error Codes

Domain-specific machine error codes MAY supplement HTTP status.

Examples:

```text
duplicate_workspace_slug
quota_exceeded
invoice_already_paid
```

They MUST remain stable if clients depend on them.

---

# 96. Do Not Leak Internal Errors

Never return:

```text
SQL
stack traces
filesystem paths
secret values
internal hostnames
provider credentials
```

through public error responses.

---

# 97. Correlation ID

Unexpected errors SHOULD expose a safe correlation/support identifier where useful.

Example:

```text
requestId
```

This enables support without exposing internal details.

---

# 98. Authentication

Protected APIs MUST authenticate the caller.

Use one canonical authentication architecture.

Potential mechanisms include:

```text
session credentials
OAuth/OIDC access tokens
API keys
workload identity
mTLS
```

depending on consumer type.

---

# 99. Authorization

Authentication does not imply access.

Every protected operation MUST enforce authorization for:

```text
principal
action
specific resource
tenant
```

---

# 100. Object-Level Authorization

For:

```text
GET /projects/{projectId}
```

verify:

```text
Can this principal read this project?
```

not merely:

```text
Is this principal signed in?
```

---

# 101. Function-Level Authorization

Privileged operations require distinct authorization.

Examples:

```text
read
update
delete
export
invite
approve
administer
```

---

# 102. Tenant Isolation

Multi-tenant API operations MUST derive or validate tenant context from trusted identity information.

Client-provided tenant IDs are claims, not proof.

---

# 103. API Keys

API keys SHOULD be:

- high entropy;
- scoped;
- revocable;
- attributable;
- rotatable.

Avoid universal administrative keys.

---

# 104. API Key Prefix

A non-secret prefix MAY identify:

```text
environment
key type
product
```

and improve secret scanning.

The secret portion must remain unpredictable.

---

# 105. OAuth

Use established OAuth/OIDC libraries and protocol flows.

Do not create custom bearer-token protocols when established standards fit.

---

# 106. Token Scope

Access tokens SHOULD have the minimum required:

```text
audience
scope
lifetime
```

Do not issue universal credentials by default.

---

# 107. Service-to-Service Authentication

Services SHOULD authenticate using unique workload identities or scoped service credentials.

Avoid one shared internal secret used by every service.

---

# 108. HTTPS

Sensitive/authenticated APIs MUST use HTTPS.

Do not permit credentials over plaintext transport.

---

# 109. CORS

CORS is a browser policy, not API authentication.

Configure allowed origins explicitly where browser access is required.

Do not use permissive wildcard credential configurations.

---

# 110. CSRF

Cookie-authenticated browser APIs MUST address CSRF.

Bearer-token APIs have different threat models.

Apply the Security Gold Standard.

---

# 111. Rate Limiting

Rate-limit endpoints vulnerable to:

```text
brute force
enumeration
spam
expensive computation
resource exhaustion
financial abuse
```

---

# 112. Rate-Limit Dimensions

Possible dimensions:

```text
user
API key
tenant
IP
endpoint
resource
```

Choose according to abuse model.

---

# 113. Rate-Limit Response

When rejecting due to limits:

```text
429 Too Many Requests
```

is generally appropriate.

Expose useful retry information when possible.

---

# 114. Rate-Limit Headers

Use documented rate-limit headers consistently if the API exposes quota metadata.

Do not expose misleading precision if the limiter uses approximate/distributed behavior.

---

# 115. Quotas vs Rate Limits

Distinguish:

```text
Rate limit
→ activity per time interval

Quota
→ allowed amount over broader billing/product period
```

They solve different problems.

---

# 116. Resource Limits

Bound:

```text
request body size
batch count
query complexity
file size
response size
execution time
```

according to endpoint risk.

---

# 117. Timeouts

Every outbound API call SHOULD have a bounded timeout.

Avoid indefinite waits.

---

# 118. Timeout Budget

Timeout values should consider the caller's overall latency budget.

Bad:

```text
caller timeout: 5 seconds

dependency A: 5 seconds
dependency B: 5 seconds
dependency C: 5 seconds
```

when dependencies execute sequentially.

---

# 119. Retries

Retry only failures likely to be transient.

Examples:

```text
connection reset
temporary unavailable
rate-limited with retry guidance
```

Do not retry:

```text
validation failure
authorization failure
permanent conflict
```

---

# 120. Retry Policy

Use:

```text
bounded attempts
exponential backoff
jitter
```

where appropriate.

Infinite retries are prohibited.

---

# 121. Retry Safety

Do not automatically retry non-idempotent operations unless an idempotency mechanism protects them.

---

# 122. Idempotency

Operations where duplicate execution may cause harm SHOULD support idempotency.

Examples:

```text
payments
orders
resource provisioning
invitations
external side effects
```

---

# 123. Idempotency-Key

A write API MAY support:

```text
Idempotency-Key
```

or equivalent protocol mechanism.

The server should scope it appropriately.

---

# 124. Idempotency Result

Repeated requests with the same valid idempotency key SHOULD produce the same effective business result.

Define behavior when the same key is reused with different payloads.

Prefer rejection.

---

# 125. Idempotency Retention

Define how long idempotency records remain effective.

Document this where clients depend on it.

---

# 126. Concurrency Control

APIs modifying shared state MUST account for concurrent updates.

Possible approaches:

```text
transactions
optimistic concurrency
ETag/version
conditional requests
domain locks
```

---

# 127. Optimistic Concurrency

Version resources when lost updates matter.

Example:

```json
{
  "version": 7
}
```

Require expected version when updating where appropriate.

---

# 128. ETag

ETags MAY support conditional reads/writes.

Useful patterns:

```text
If-None-Match
If-Match
```

when resource version semantics fit HTTP.

---

# 129. Lost Updates

Do not blindly accept:

```text
client A reads
client B reads
client A writes
client B overwrites A
```

when the domain requires conflict detection.

---

# 130. Asynchronous Operations

Long-running operations SHOULD use asynchronous workflows.

Example:

```text
POST /exports
→ 202 Accepted

GET /operations/{operationId}
→ status
```

rather than holding requests indefinitely.

---

# 131. Operation Resource

Long-running operations MAY expose:

```json
{
  "id": "...",
  "status": "processing",
  "createdAt": "...",
  "completedAt": null
}
```

---

# 132. Async States

Use explicit states such as:

```text
queued
processing
succeeded
failed
cancelled
```

Avoid ambiguous booleans.

---

# 133. Polling

If clients poll operation status, define:

- appropriate poll frequency;
- rate limits;
- terminal states.

Where useful, provide retry guidance.

---

# 134. Cancellation

Long-running operations MAY support cancellation if semantics allow it.

Document whether cancellation is:

```text
best effort
guaranteed before execution
not possible after a point
```

---

# 135. Bulk APIs

Use bulk endpoints when consumers need to process many resources efficiently.

Example:

```text
POST /users/batch
```

or another documented convention.

---

# 136. Bulk Authorization

Every item in a bulk operation MUST be authorized.

Do not authorize the request based solely on the first resource.

---

# 137. Bulk Limits

Enforce maximum batch size.

Bulk endpoints must not become unbounded resource-exhaustion mechanisms.

---

# 138. Bulk Partial Failure

Define whether batch operations are:

```text
atomic
best effort
per-item result
```

Do not leave partial-failure semantics ambiguous.

---

# 139. Bulk Result

For non-atomic batch requests, return item-level result identities.

Clients should be able to determine which operations succeeded.

---

# 140. File Upload APIs

File endpoints MUST define:

```text
maximum size
accepted types
authorization
storage semantics
processing status
retention
```

Do not trust client MIME type alone.

---

# 141. Direct-to-Storage Upload

Large uploads MAY use signed upload URLs.

Flow:

```text
authorize
↓
issue restricted signed upload
↓
upload
↓
validate/process
```

---

# 142. Download APIs

Protected file downloads require authorization.

Signed URLs SHOULD be:

```text
short-lived
resource-scoped
generated after authorization
```

---

# 143. Webhooks

Webhooks are APIs initiated by the provider toward a consumer.

They require the same contract discipline as ordinary APIs.

---

# 144. Webhook Event Names

Webhook events SHOULD use stable names.

Examples:

```text
invoice.paid
project.created
subscription.cancelled
```

Choose one naming convention.

---

# 145. Webhook Payload

Webhook payloads SHOULD include:

```text
eventId
eventType
createdAt
data
```

or equivalent predictable structure.

---

# 146. Webhook Event ID

Every event SHOULD have a stable unique identifier.

Consumers can use this for deduplication.

---

# 147. Webhook Signature

Webhook payloads MUST be authenticated where the architecture supports it.

Use established cryptographic signature mechanisms.

---

# 148. Webhook Timestamp

Signed webhook protocols SHOULD include a timestamp or equivalent replay protection where appropriate.

---

# 149. Webhook Replay

Consumers SHOULD be able to reject excessively old/replayed deliveries where threat model requires it.

---

# 150. Webhook Delivery

Assume webhook delivery may occur:

```text
more than once
out of order
after delay
```

Consumers should be idempotent.

---

# 151. Webhook Retry

Document provider retry behavior:

```text
schedule
maximum attempts
timeout
terminal failure
```

---

# 152. Webhook Response

Webhook handlers SHOULD acknowledge quickly.

Move expensive work to background processing where possible.

---

# 153. Webhook Versioning

Webhook contracts require compatibility discipline.

Adding fields is generally safer than removing or changing semantics.

---

# 154. Webhook Testing

Provide development/test mechanisms where feasible.

Examples:

```text
test delivery
event replay
sandbox
signature example
```

---

# 155. API Versioning

Avoid versioning until compatibility cannot reasonably be maintained.

Once versioning is required, use one explicit strategy.

---

# 156. Versioning Philosophy

Prefer backward-compatible evolution through:

```text
adding optional fields
adding endpoints
adding operations
adding nonbreaking capabilities
```

instead of frequent major versions.

---

# 157. Major Version

A new major API version is appropriate for incompatible contract changes that cannot be safely migrated within the existing contract.

---

# 158. Version Location

Common strategies include:

```text
/v1/projects
```

or:

```text
versioned media type/header
```

For general public HTTP APIs, explicit path versioning is often the easiest operationally.

Choose one standard.

---

# 159. Do Not Version Every Endpoint Independently

Prefer coherent API versions.

Avoid:

```text
/projects/v2
/users/v1
/invoices/v5
```

unless architecture explicitly requires independent product APIs.

---

# 160. Breaking Changes

Potential breaking changes include:

```text
removing field
renaming field
changing type
making optional field required
changing enum semantics
changing status code
changing default
changing ordering
changing pagination semantics
tightening validation unexpectedly
```

Breaking change detection must consider behavior, not only schema syntax.

---

# 161. Adding Fields

Consumers SHOULD be designed to tolerate unknown response fields.

Adding optional response fields should normally be nonbreaking.

---

# 162. Removing Fields

Do not remove fields used by active consumers without a deprecation/migration process.

---

# 163. Nullability Changes

Changing:

```text
nullable → non-null
```

or:

```text
non-null → nullable
```

may break consumers depending on direction and usage.

Review explicitly.

---

# 164. Enum Changes

Adding enum values can break exhaustive clients.

Design consumer guidance accordingly.

---

# 165. Deprecation

Deprecated API behavior SHOULD clearly identify:

```text
what is deprecated
replacement
migration
timeline
```

---

# 166. Deprecation Period

Public APIs require an explicit support/deprecation policy.

Do not remove capabilities unexpectedly.

---

# 167. Sunset

Where useful, communicate retirement timing through documentation and protocol metadata.

The organization should have a defined sunset process.

---

# 168. Consumer Inventory

Before breaking an internal API, identify consumers.

Do not assume nobody depends on an endpoint because documentation shows no consumers.

---

# 169. Compatibility Testing

Important APIs SHOULD use automated compatibility checks against their previous published contract.

---

# 170. Contract Tests

Use provider/consumer contract tests where cross-service compatibility risk warrants it.

---

# 171. API Schema

Each request and response SHOULD have an explicit machine-readable schema.

Schemas should define:

```text
types
required fields
formats
nullability
constraints
examples
```

---

# 172. OpenAPI

HTTP APIs SHOULD maintain an OpenAPI description when they form a meaningful service/product contract.

The OpenAPI description should be:

```text
generated from authoritative definitions
```

or:

```text
used as authoritative design input
```

but not maintained as an unrelated manually drifting copy.

---

# 173. OpenAPI Source of Truth

Choose one model:

```text
design-first
```

or:

```text
code-first
```

Either can work.

Do not maintain two independently authoritative schemas.

---

# 174. OpenAPI Validation

OpenAPI definitions SHOULD be validated in CI.

Check:

```text
syntax
schema validity
broken references
breaking changes
```

where tooling supports it.

---

# 175. OpenAPI Version

Use an organization-approved current OpenAPI 3.x version supported by the relevant toolchain.

Do not upgrade specification versions before required:

```text
documentation
generation
validation
gateway
SDK
```

tools support them reliably.

---

# 176. Schema Reuse

Reuse schema components for concepts that are genuinely identical.

Do not create one gigantic universal schema hierarchy merely to eliminate repetition.

---

# 177. Request vs Response Models

Request and response models SHOULD be separate when their semantics differ.

Example:

```text
CreateUserRequest
UserResponse
UpdateUserRequest
```

Do not force one model to serve every context.

---

# 178. Persistence Models

Database entities MUST NOT automatically become API models.

Persistence and public contracts have different lifecycles.

---

# 179. Examples

API documentation SHOULD contain realistic examples.

Examples must conform to schemas.

Avoid examples that contain fake fields not actually supported.

---

# 180. Documentation

Every consumer-facing API SHOULD document:

```text
Purpose
Authentication
Authorization expectations
Endpoints/operations
Requests
Responses
Errors
Pagination
Filtering
Rate limits
Idempotency
Versioning
Examples
```

---

# 181. Documentation Generated From Contracts

Generate mechanical reference from OpenAPI where useful.

Human-written guides should complement generated reference.

---

# 182. API Tutorials

Provide task-oriented tutorials for important integration journeys.

Example:

```text
Authenticate
Create first project
Receive webhook
Handle pagination
```

Reference docs alone are insufficient for complex public APIs.

---

# 183. API Changelog

Public and broadly consumed APIs SHOULD maintain a consumer-focused changelog.

Document:

```text
new capability
behavior change
deprecation
security-relevant change
migration
```

---

# 184. SDKs

Provide SDKs when they materially reduce integration complexity.

SDKs SHOULD wrap protocol ergonomics—not hide the API so completely that debugging becomes impossible.

---

# 185. SDK Responsibilities

A high-quality SDK may provide:

```text
authentication setup
typed models
pagination helpers
retry behavior
error mapping
idempotency support
```

---

# 186. SDK Versioning

SDK versioning and API versioning are separate concerns.

Do not assume matching major numbers are always required.

---

# 187. SDK Generated Code

Generated SDK code SHOULD be clearly separated from hand-written ergonomic layers.

Do not hand-edit generated source.

---

# 188. SDK Retry Policy

SDKs MUST NOT blindly retry unsafe writes.

Retries should understand:

```text
method
idempotency
failure type
```

---

# 189. SDK Error Types

Expose structured errors.

Consumers should not parse strings to distinguish:

```text
authorization
validation
rate limit
conflict
```

---

# 190. Caching

HTTP APIs SHOULD use HTTP caching semantics where appropriate.

Possible mechanisms:

```text
Cache-Control
ETag
Last-Modified
```

---

# 191. Cache-Control

Public/static representations may be cacheable.

Sensitive/private responses MUST use appropriate cache directives.

Never accidentally cache personalized responses publicly.

---

# 192. Authorization and Caching

Cache keys must account for all security-sensitive context.

Do not serve one user's authorized representation to another user.

---

# 193. Conditional GET

Use conditional requests where they materially reduce transfer/load.

Example:

```text
If-None-Match
→ 304 Not Modified
```

---

# 194. Compression

Support appropriate HTTP compression for suitable response types.

Do not compress formats already highly compressed where unnecessary.

---

# 195. Response Size

Monitor large responses.

Prefer:

```text
pagination
field reduction
compression
streaming
```

over massive JSON payloads.

---

# 196. Streaming

Use streaming where:

- results are large;
- incremental delivery matters;
- the client can process incrementally.

Streaming changes failure semantics and must be designed deliberately.

---

# 197. SSE

Server-Sent Events may be appropriate for server-to-client realtime streams where one-direction communication is sufficient.

Define:

```text
reconnection
event identity
authorization
retention/replay
```

---

# 198. WebSockets

Use WebSockets when persistent bidirectional communication creates clear product value.

They require:

```text
connection authentication
subscription authorization
heartbeat
reconnection
backpressure
message limits
```

---

# 199. WebSocket Authorization

Authorization MUST apply to individual channels/resources, not only initial connection establishment.

---

# 200. Realtime Message Versioning

Realtime messages are contracts and require compatibility discipline.

---

# 201. BFF APIs

A Backend-for-Frontend may tailor APIs to:

```text
web
mobile
specialized client
```

when client requirements materially differ.

Do not create a BFF for every page.

---

# 202. BFF Ownership

BFFs SHOULD own composition/presentation adaptation.

Core domain rules remain in domain services/modules.

---

# 203. API Gateway

An API gateway MAY own cross-cutting concerns such as:

```text
TLS termination
routing
coarse rate limiting
authentication validation
request limits
```

Do not move all business authorization into the gateway.

---

# 204. Gateway Is Not Domain Authorization

Resource-level authorization still belongs near authoritative business resources.

---

# 205. API Aggregation

Aggregation endpoints MAY combine multiple underlying sources to prevent excessive client fan-out.

Avoid creating hidden distributed N+1 behavior.

---

# 206. Fan-Out

A single API request calling many downstream services synchronously creates latency and failure amplification.

Review large synchronous fan-out.

---

# 207. Dependency Failure

APIs MUST define behavior when dependencies fail.

Possible:

```text
fail request
return partial response
serve stale data
degrade optional capability
```

Choose intentionally.

---

# 208. Partial Responses

Use partial responses only where consumers can correctly interpret missing portions.

Never silently return incomplete data as complete success.

---

# 209. Resilience

External dependency calls SHOULD implement appropriate:

```text
timeout
retry
circuit breaking where warranted
fallback
observability
```

---

# 210. Circuit Breakers

Use circuit breakers where repeated failing calls would amplify outages.

Do not introduce them mechanically.

---

# 211. Load Shedding

Under severe load, low-priority API work MAY be rejected to protect core operations.

Priorities must be explicit.

---

# 212. Health Endpoints

Operational health APIs SHOULD distinguish where useful:

```text
liveness
readiness
```

Avoid exposing sensitive internal topology.

---

# 213. Health Endpoint Security

Health endpoints should reveal only information needed by operational systems.

Do not expose:

```text
credentials
database details
internal hostnames
stack traces
```

---

# 214. Metrics Endpoints

Internal metrics endpoints SHOULD be protected from public access unless intentionally exposed.

---

# 215. Observability

Every production API SHOULD provide sufficient telemetry for:

```text
traffic
latency
errors
saturation
dependency health
```

---

# 216. Structured Logs

Log structured API events.

Typical context:

```text
requestId
route
method
status
duration
tenant where safe
principal category
```

Do not log secrets.

---

# 217. Request IDs

Every request SHOULD have a correlation/request identifier.

Propagate appropriate correlation context across internal calls.

---

# 218. Distributed Tracing

Use tracing when request flow crosses enough boundaries to make ordinary logs insufficient.

---

# 219. Metrics

Useful API metrics include:

```text
request rate
error rate
latency
p50/p95/p99
rate-limit rejection
dependency latency
```

---

# 220. Route Cardinality

Metrics MUST use normalized route names rather than raw IDs.

Good:

```text
/projects/{projectId}
```

Bad metric label:

```text
/projects/123456
```

which creates high cardinality.

---

# 221. Logging Request Bodies

Do not routinely log complete request/response bodies.

They may contain:

```text
credentials
PII
financial data
large payloads
```

Log only what is operationally required.

---

# 222. Audit Logging

High-risk API actions SHOULD generate audit events.

Examples:

```text
permission changes
exports
API key changes
ownership transfers
administrative operations
```

---

# 223. Audit Identity

Audit records SHOULD capture:

```text
actor
action
target
tenant
timestamp
result
```

where applicable.

---

# 224. API Security Testing

Critical APIs SHOULD test:

```text
unauthenticated access
wrong role
wrong tenant
modified object ID
invalid input
oversized input
rate limits
replay
duplicate operation
```

---

# 225. Negative Authorization Tests

Every sensitive endpoint requires tests proving who **cannot** perform the operation.

Successful-path tests alone are insufficient.

---

# 226. Fuzz / Robustness Testing

High-risk parsers and public APIs MAY benefit from fuzz/property-based testing.

---

# 227. Contract Testing

Validate actual implementation against documented API schema.

Documentation that diverges from runtime behavior is a defect.

---

# 228. Schema Fuzzing

Generated schema examples and boundary values MAY be used to test:

```text
minimum
maximum
enum
nullability
malformed content
```

---

# 229. Performance Testing

High-traffic or expensive endpoints SHOULD be tested at realistic concurrency.

Measure:

```text
latency
database load
external calls
memory
response size
```

---

# 230. SLOs

Critical APIs SHOULD define service-level objectives where operational maturity warrants it.

Examples:

```text
availability
latency
error rate
```

---

# 231. Latency Budget

Critical request paths SHOULD have a latency budget distributed across:

```text
gateway
application
database
external dependencies
```

---

# 232. Public API Availability

Do not promise availability targets the architecture cannot sustain.

API contractual SLAs and engineering SLOs should be aligned.

---

# 233. API Ownership

Every API MUST have an owner.

Ownership includes:

```text
contract
security
documentation
operations
consumer support
versioning
deprecation
```

---

# 234. Endpoint Ownership

Large platforms MAY assign ownership at API/domain level rather than individual endpoints.

Ownership must remain discoverable.

---

# 235. API Catalog

Large organizations SHOULD maintain a catalog of significant APIs.

Useful metadata:

```text
name
purpose
owner
classification
base address
authentication
version
documentation
SLO
```

---

# 236. Shadow APIs

Avoid undocumented production APIs.

Every externally reachable endpoint should be intentional and owned.

---

# 237. Administrative APIs

Administrative APIs require stronger controls.

Consider:

```text
strong authentication
MFA
network restrictions
audit logs
narrow permissions
```

---

# 238. Debug APIs

Debug endpoints MUST NOT expose sensitive production internals.

Remove or protect them before production.

---

# 239. Internal-Only APIs

"Internal" MUST be enforced by architecture, not merely naming.

Use:

```text
network policy
identity
authorization
gateway rules
```

as appropriate.

---

# 240. API Discovery

Clients should know where authoritative API documentation and schemas live.

Do not require reading source code to discover supported endpoints.

---

# 241. API Base URL

Use stable environment-specific base addresses.

Example:

```text
api.example.com
```

Do not encode transient infrastructure details into consumer contracts.

---

# 242. Environments

Clearly distinguish:

```text
production
sandbox
test
```

where public integration workflows require them.

---

# 243. Sandbox

Public/partner APIs SHOULD provide a sandbox where integration risk justifies it.

Sandbox behavior should approximate production semantics without production data.

---

# 244. Sandbox Credentials

Sandbox credentials MUST NOT work against production.

---

# 245. Test Resources

Avoid mixing obvious development endpoints into production APIs.

Bad:

```text
/test-charge
/debug-create-user
```

unless explicitly secured operational tools.

---

# 246. API Secrets in URLs

Never send secrets through query strings when safer headers/body mechanisms are available.

URLs may appear in:

```text
logs
history
referrers
analytics
```

---

# 247. Sensitive Query Data

Avoid sensitive personal information in URL paths/query parameters for the same reason.

---

# 248. Header Usage

Use headers for protocol metadata.

Use bodies for domain payload.

Do not move arbitrary business fields into custom headers.

---

# 249. Custom Headers

Custom headers should have clear semantics and documentation.

Avoid creating dozens of organization-specific headers when ordinary HTTP mechanisms suffice.

---

# 250. User-Agent / Client Identification

SDKs and API consumers MAY identify client/version where this materially improves support and analytics.

Do not rely on client identity as authorization.

---

# 251. Locale

If API-generated human text is localized, define locale selection.

Machine identifiers MUST remain locale-independent.

---

# 252. Internationalization

APIs dealing with:

```text
currency
dates
time zones
addresses
names
phone numbers
```

must not assume one locale.

---

# 253. Time Zone Semantics

API contracts MUST distinguish:

```text
instant
calendar date
local time
timezone
```

---

# 254. Geographic Data

Coordinates must document:

```text
coordinate order
unit
reference system
```

where relevant.

---

# 255. Units

Never return ambiguous measurement units.

Prefer explicit naming:

```text
weightKg
distanceMeters
durationSeconds
```

or a structured quantity model.

---

# 256. IDs and Enumeration

Unpredictable IDs can reduce accidental enumeration but do not provide authorization.

Always enforce access control.

---

# 257. Resource Existence Leakage

For sensitive resources, consider whether:

```text
403
```

vs:

```text
404
```

should expose existence.

Apply consistently.

---

# 258. Data Minimization

Return only information required for the consumer's use case.

Do not expose internal fields merely because they exist.

---

# 259. Sensitive Fields

Fields such as:

```text
passwordHash
internalRiskScore
secretToken
providerCredential
```

MUST never be included in ordinary API serialization.

---

# 260. Serializer Allowlist

Prefer explicit response mapping.

Do not automatically serialize complete ORM/database objects.

---

# 261. Field-Level Authorization

Some resources require field-level restrictions.

Example:

```text
basic member
→ name

admin
→ name + email + audit details
```

Apply server-side.

---

# 262. Overposting

Request DTOs SHOULD expose only fields consumers are permitted to change.

Never reuse database/entity models blindly for updates.

---

# 263. Optimistic UI Support

APIs MAY provide semantics enabling optimistic interfaces.

Examples:

```text
stable IDs
idempotency
version numbers
predictable validation
```

---

# 264. Resource Creation IDs

Where useful, clients MAY provide idempotent resource IDs.

Otherwise server-generated IDs remain the common default.

---

# 265. Create Response

Creation SHOULD generally return enough information for the client to identify/use the new resource.

---

# 266. Update Response

Choose one convention:

```text
return updated representation
```

or:

```text
204 + client re-fetch
```

based on product needs.

Use consistently.

---

# 267. Delete Response

Deletion behavior should clarify whether:

```text
resource immediately disappears
cleanup is asynchronous
recovery remains possible
```

---

# 268. Soft Delete API Semantics

Do not expose implementation terms like `deleted_at` unless part of the public domain contract.

Expose meaningful states such as:

```text
archived
trashed
```

when relevant.

---

# 269. Restore

If deletion is reversible, expose restoration as an intentional operation rather than database implementation leakage.

---

# 270. State Transitions

Domain state transitions SHOULD have clear API semantics.

Example:

```text
POST /invoices/{id}/approve
```

can be preferable to:

```json
PATCH /invoices/{id}

{
  "status": "approved"
}
```

when approval has distinct authorization/business effects.

---

# 271. Actions

Resource actions are acceptable when they represent domain commands.

Examples:

```text
approve
cancel
publish
archive
restore
```

Use predictable conventions.

---

# 272. Do Not CRUD Complex Workflows Blindly

If changing a field invokes:

```text
permissions
payments
notifications
side effects
audit
```

represent the business operation explicitly.

---

# 273. Command Result

Domain command responses SHOULD make outcome clear.

Avoid exposing implementation workflow steps unless consumers need them.

---

# 274. Transactions and APIs

An API operation should define the atomic business boundary.

Clients should not need to orchestrate low-level calls to maintain server invariants where the server can own that transaction.

---

# 275. Chatty APIs

Avoid requiring clients to make many sequential calls for one common business task.

Provide appropriately coarse operations.

---

# 276. Fine-Grained APIs

Do not make APIs so coarse that they become generic:

```text
/doEverything
```

Balance network efficiency with semantic clarity.

---

# 277. N+1 API Calls

Watch for clients doing:

```text
GET list
↓
GET each item separately
```

to assemble common views.

Consider:

```text
expansion
batch retrieval
aggregation
```

where appropriate.

---

# 278. Batch Retrieval

Batch lookup MAY use:

```text
POST /projects/batch-get
```

or another canonical convention when query length/complexity makes GET impractical.

Document read semantics.

---

# 279. URL Length

Do not depend on arbitrarily long query URLs.

For complex queries, a POST-based query endpoint MAY be appropriate when semantics justify it.

---

# 280. Query APIs

Complex read-only domain queries MAY use command-like POST endpoints when the request structure cannot reasonably fit ordinary GET semantics.

Document that the operation is read-only.

---

# 281. API Evolution

Prefer:

```text
add
deprecate
migrate
remove
```

over:

```text
break
notify later
```

---

# 282. Strangler Migration

When replacing an API:

```text
old contract
↓
adapter/migration
↓
new implementation
↓
consumer migration
↓
old retirement
```

is often safer than simultaneous replacement.

---

# 283. Adapter Compatibility

Temporary compatibility adapters MUST have:

```text
owner
purpose
removal plan
```

Do not allow legacy translation layers to become permanent accidentally.

---

# 284. Third-Party API Consumption

External APIs are unreliable dependencies from your application's perspective.

Wrap important providers when this provides:

```text
timeouts
retry policy
auth configuration
error translation
observability
provider isolation
```

---

# 285. External API Schema

Validate external responses when incorrect/malformed data could affect correctness or security.

Do not blindly trust third-party JSON.

---

# 286. Provider Changes

Third-party providers may change behavior.

Monitor:

```text
deprecation notices
API versions
SDK versions
error rates
```

for critical providers.

---

# 287. External API Credentials

Provider credentials MUST use the secret-management standard.

Never ship server credentials to clients.

---

# 288. Provider Sandbox

Use provider sandbox/test environments where available.

Do not test destructive integrations against production by default.

---

# 289. API Testing Layers

Use:

```text
Unit
→ domain/validation

Integration
→ actual API + data boundary

Contract
→ API schema compatibility

E2E
→ critical consumer journeys
```

---

# 290. Endpoint Integration Tests

Important endpoints SHOULD test:

```text
success
validation failure
unauthenticated
unauthorized
not found
conflict
dependency failure
```

as applicable.

---

# 291. Pagination Tests

Test:

```text
first page
next page
empty page
boundary values
stable ordering
invalid cursor
```

---

# 292. Idempotency Tests

Critical idempotent operations SHOULD verify:

```text
same key + same request
→ same effective result

same key + different request
→ rejected or documented behavior
```

---

# 293. Rate-Limit Tests

Verify rate limits do not accidentally:

```text
block unrelated tenants
allow easy bypass
return unsafe errors
```

---

# 294. API Documentation Tests

Examples SHOULD be executable or schema-validated where practical.

---

# 295. Backward Compatibility Tests

API CI SHOULD detect accidental:

```text
field removal
type change
required-field change
path removal
operation removal
```

for stable APIs.

---

# 296. Production Monitoring

Every critical API route should be diagnosable from production telemetry.

Operators should be able to answer:

```text
Is it failing?
Is it slow?
Which dependency?
Which version?
Which clients?
```

---

# 297. API Dashboards

Critical APIs SHOULD have dashboards for relevant:

```text
traffic
latency
errors
rate limits
dependency failures
```

---

# 298. API Alerts

Alerts SHOULD reflect meaningful user/service impact.

Do not alert on every individual 4xx client error.

---

# 299. 4xx vs 5xx Monitoring

Distinguish client-driven failures from server failures.

Unexpected growth in either may reveal:

```text
client regression
attack
deployment defect
contract mismatch
```

---

# 300. Deprecation Metrics

Measure usage of deprecated APIs.

Do not remove a deprecated API without knowing whether important consumers remain where measurement is feasible.

---

# 301. API Cost

Expensive endpoints SHOULD understand resource cost.

Examples:

```text
database work
external API cost
compute
AI tokens
large exports
```

---

# 302. Cost Abuse

Where operations directly incur financial cost, enforce:

```text
authorization
quota
rate limit
budget
```

as appropriate.

---

# 303. AI API Endpoints

AI-backed API endpoints require additional controls for:

```text
input size
token limits
model cost
tool permissions
output validation
prompt injection
PII
timeouts
```

---

# 304. AI Output

AI-generated content MUST be treated as untrusted.

Do not allow an LLM response directly to become:

```text
SQL
shell command
permission decision
financial transaction
privileged API call
```

without controls.

---

# 305. AI Structured Output

Where downstream software consumes AI output, use structured schema validation.

Do not rely solely on prose instructions to guarantee format.

---

# 306. API Gateway Authentication

Gateway-level authentication can reject invalid credentials early.

Resource-level authorization remains mandatory downstream.

---

# 307. mTLS

Mutual TLS MAY be appropriate for high-assurance service-to-service or partner integrations.

It does not replace application authorization.

---

# 308. IP Allowlisting

IP allowlists MAY provide defense in depth.

They MUST NOT be the sole authorization mechanism for sensitive APIs.

---

# 309. Signature Authentication

Signed request schemes MAY be suitable where integrity/replay protection is important.

Use established protocols where possible.

Avoid inventing custom cryptography.

---

# 310. Replay Protection

High-risk signed requests SHOULD define:

```text
timestamp
nonce/event ID
allowed time skew
deduplication
```

as appropriate.

---

# 311. API Enumeration

APIs SHOULD minimize unnecessary information leakage during:

```text
authentication
resource lookup
password recovery
invitation
```

where enumeration creates security risk.

---

# 312. Sensitive Errors

Security errors should provide enough information for legitimate recovery without providing attackers unnecessary detail.

---

# 313. API Input Encoding

Normalize and validate:

```text
Unicode
filenames
URLs
identifiers
```

where ambiguous encoding could create security or correctness issues.

---

# 314. URL Inputs

Server-side URL fetch APIs MUST consider SSRF.

Validate destination and network behavior according to the Security Gold Standard.

---

# 315. Redirect Inputs

Redirect parameters such as:

```text
next
returnTo
redirectUri
```

must be validated.

Prevent open redirects.

---

# 316. API File Names

Do not trust client filenames as storage paths.

Treat them as metadata.

---

# 317. Content Disposition

File-download endpoints SHOULD set safe content behavior appropriate to file type.

Do not allow dangerous content to execute in trusted product origins accidentally.

---

# 318. API Compression Bombs

Compressed/uploaded data processing must enforce expanded-size/resource limits where relevant.

---

# 319. API Serialization Security

Serialization libraries MUST NOT instantiate arbitrary executable types from untrusted data.

Use data-oriented serialization formats.

---

# 320. API Lifecycle

Every significant API goes through:

```text
Design
↓
Review
↓
Implement
↓
Validate
↓
Publish
↓
Observe
↓
Evolve
↓
Deprecate
↓
Retire
```

---

# 321. API Design Review

Significant APIs SHOULD undergo design review before consumers exist.

Review:

```text
resource model
security
schema
naming
errors
pagination
versioning
operability
```

It is cheaper to fix a contract before adoption.

---

# 322. Public API Review

Public APIs require stronger review because mistakes have higher long-term compatibility cost.

---

# 323. Security Review Trigger

Security review is warranted for:

```text
new public API
new authentication method
new privileged operation
new file processing
new webhook
new partner integration
new tenant boundary
```

---

# 324. API Governance

The organization SHOULD define ownership for:

```text
API design standard
OpenAPI tooling
gateway
security baseline
version policy
deprecation policy
SDK conventions
```

---

# 325. API Exception Process

Deviations from the standard SHOULD document why the standard cannot reasonably satisfy the requirement.

Do not create feature-level conventions casually.

---

# 326. API Design Checklist

Before implementing:

```text
□ Consumer identified
□ API classification identified
□ Resource/action model clear
□ Naming follows standard
□ HTTP method appropriate
□ Authentication defined
□ Authorization defined
□ Tenant scope defined
□ Request schema defined
□ Response schema defined
□ Error model defined
□ Pagination defined where needed
□ Filtering/sorting defined
□ Idempotency considered
□ Concurrency considered
□ Rate limits considered
□ Resource limits considered
□ Version impact considered
□ Observability considered
□ OpenAPI ownership defined
```

---

# 327. Endpoint Review Checklist

```text
□ Path canonical
□ Method semantic
□ Request bounded
□ Runtime validation present
□ Unknown-field behavior defined
□ Authentication enforced
□ Object authorization enforced
□ Tenant isolation enforced
□ Mass assignment prevented
□ Response fields minimized
□ Sensitive fields excluded
□ Status codes correct
□ Problem/error format consistent
□ Expected errors tested
□ Unexpected errors safe
□ Database queries bounded
□ Timeout defined for dependencies
□ Retry behavior safe
□ Audit event added where needed
```

---

# 328. Public API Release Checklist

```text
□ OpenAPI published
□ Documentation published
□ Authentication guide published
□ Examples verified
□ Errors documented
□ Pagination documented
□ Rate limits documented
□ Idempotency documented
□ Changelog initialized
□ Version policy published
□ Deprecation policy published
□ SDKs tested where provided
□ Security assessment complete
□ Monitoring operational
□ Support ownership defined
```

---

# 329. Webhook Checklist

```text
□ Stable event name
□ Unique event ID
□ Timestamp
□ Schema documented
□ Signature validation documented
□ Replay considerations defined
□ Duplicate delivery expected
□ Ordering semantics documented
□ Retry policy documented
□ Consumer acknowledgement behavior documented
□ Test mechanism provided where appropriate
```

---

# 330. API Definition of Done

An API operation is complete only when:

```text
✓ Contract is explicit
✓ Schema validated
✓ Authentication enforced where required
✓ Authorization enforced
✓ Tenant isolation verified
✓ Validation implemented
✓ Error model implemented
✓ Status codes appropriate
✓ Result sizes bounded
✓ Idempotency handled where required
✓ Concurrency considered
✓ External calls bounded by timeout
✓ Retries safe
✓ Logs/metrics available
✓ Tests cover positive and negative behavior
✓ OpenAPI/reference updated
✓ Documentation updated
```

---

# 331. API Anti-Patterns

Avoid:

```text
POST /getUsers
```

for ordinary resource retrieval.

Avoid:

```text
GET /deleteUser?id=123
```

for mutation.

Avoid:

```text
200 OK
{
  "error": true
}
```

for ordinary protocol failures.

Avoid:

```text
/api/doEverything
```

generic mega-endpoints.

Avoid:

```text
request.body
→ ORM update
```

mass assignment.

Avoid:

```text
client sends tenantId
→ trusted automatically
```

Avoid:

```text
SELECT *
→ serialize entire row
```

Avoid:

```text
unbounded collection response
```

Avoid:

```text
random custom error format per endpoint
```

Avoid:

```text
string error message as machine contract
```

Avoid:

```text
access token in URL
```

Avoid:

```text
retry every failure
```

Avoid:

```text
no timeout
```

Avoid:

```text
non-idempotent payment retry
```

without an idempotency mechanism.

Avoid:

```text
API v2
```

solely because implementation was rewritten.

Avoid:

```text
database schema = public API
```

Avoid:

```text
public API without owner
```

Avoid:

```text
internal API therefore no auth
```

Avoid:

```text
Swagger/OpenAPI document manually drifting from implementation
```

Avoid:

```text
webhook assumes exactly-once delivery
```

Avoid:

```text
rate limiting by IP only
```

when authenticated/tenant-aware abuse requires better scope.

---

# 332. AI API Rules

AI coding agents MUST inspect existing API conventions before creating endpoints.

Inspect:

```text
routes
OpenAPI
authentication
authorization
error format
pagination
query conventions
validation
API clients
tests
```

---

# 333. AI Existing-Contract Rule

AI MUST NOT invent a new API convention when an established one exists.

Consistency takes precedence over local preference.

---

# 334. AI Endpoint Rule

Before creating an endpoint, AI must identify:

```text
Who calls it?
What resource/action does it represent?
Why is HTTP needed?
What security boundary exists?
```

Do not create internal HTTP endpoints unnecessarily.

---

# 335. AI Method Rule

AI MUST choose HTTP methods according to operation semantics.

It MUST NOT use GET for destructive changes.

---

# 336. AI Validation Rule

AI-generated endpoints MUST validate runtime input.

Type annotations alone are insufficient.

---

# 337. AI Authorization Rule

For every protected operation, AI must answer:

```text
Who is the principal?
Which tenant?
Which resource?
Which action?
Where is authorization enforced?
```

---

# 338. AI Serialization Rule

AI MUST NOT serialize database models directly by default.

Create explicit response representations.

---

# 339. AI Error Rule

AI SHOULD reuse the canonical API error/problem model.

Do not create endpoint-specific ad hoc envelopes.

---

# 340. AI Pagination Rule

AI MUST add bounded pagination to collections capable of meaningful growth.

It SHOULD NOT generate `findMany()`-style unlimited public endpoints.

---

# 341. AI Idempotency Rule

Before generating:

```text
payment
order
invitation
provisioning
webhook processing
```

AI MUST evaluate duplicate execution.

---

# 342. AI Retry Rule

AI MUST NOT add retries without identifying:

```text
failure class
operation idempotency
attempt limit
backoff
```

---

# 343. AI Timeout Rule

AI-generated outbound HTTP calls require bounded timeouts where the platform supports them.

---

# 344. AI OpenAPI Rule

When an API contract changes, AI SHOULD update the authoritative OpenAPI definition in the same change.

---

# 345. AI Compatibility Rule

AI MUST evaluate whether an API modification breaks active consumers.

Do not casually:

```text
rename fields
remove fields
change types
change status codes
tighten required input
```

---

# 346. AI Security Rule

AI MUST apply the Security Gold Standard to:

```text
public APIs
Route Handlers
Server Functions exposed to clients
webhooks
service APIs
```

---

# 347. AI Rate-Limit Rule

AI SHOULD consider rate/resource limiting for abuse-sensitive endpoints.

Do not mechanically rate-limit every internal operation.

---

# 348. AI Webhook Rule

AI-generated webhook handlers MUST consider:

```text
signature verification
replay
duplicate delivery
idempotency
fast acknowledgement
```

---

# 349. AI Documentation Rule

AI-generated APIs are incomplete without updated:

```text
schema
examples
error documentation
consumer documentation
```

where the API is consumer-facing.

---

# 350. AI Gold Rule

When uncertain:

```text
Stable semantics
>
Explicit contracts
>
Correct authorization
>
Backward compatibility
>
Convenience
```

---

# 351. Golden API Rules

**1. APIs are contracts.**

**2. Design the contract before allowing implementation details to define it.**

**3. Use HTTP semantics correctly.**

**4. Prefer nouns for REST resources.**

**5. Use explicit domain actions when CRUD would hide important behavior.**

**6. One API surface uses one consistent naming convention.**

**7. Validate every untrusted request at runtime.**

**8. Authentication proves identity; authorization grants access.**

**9. Authorize the specific object and action.**

**10. Tenant IDs supplied by clients are claims, not authority.**

**11. Prevent mass assignment.**

**12. Return only required fields.**

**13. Never expose persistence models automatically.**

**14. Use standard HTTP status codes.**

**15. Use one predictable machine-readable error model.**

**16. Do not make clients parse error strings.**

**17. Paginate collections that can grow.**

**18. Bound request and response sizes.**

**19. Use deterministic pagination ordering.**

**20. Protect repeatable high-impact writes with idempotency.**

**21. External calls have timeouts.**

**22. Retries are bounded and semantics-aware.**

**23. Webhooks may be duplicated, delayed, and reordered.**

**24. Version only when compatibility cannot reasonably be preserved.**

**25. Prefer additive evolution.**

**26. Deprecate before removing.**

**27. OpenAPI is part of the API contract.**

**28. Documentation changes with the contract.**

**29. Public APIs have explicit owners.**

**30. Internal APIs still require engineering discipline.**

**31. Observe every critical production API.**

**32. Test forbidden behavior, not only successful behavior.**

**33. Security, rate limits, and resource limits are API design concerns.**

**34. Database schema is not automatically API schema.**

**35. Consumer experience is part of API quality.**

---

# 352. Canonical API Standard

The organizational standard is:

> **APIs are designed and maintained as stable product contracts. HTTP APIs use standard protocol semantics, resource-oriented structures where appropriate, explicit domain actions where CRUD semantics would obscure business behavior, runtime schema validation, server-side authentication and authorization, bounded resource consumption, consistent machine-readable errors, and deliberate compatibility management. Database and internal implementation models are never exposed automatically as public contracts.**

> **Collections are paginated when they can grow, high-impact repeatable operations use idempotency where required, external dependencies have bounded timeouts and safe retry policies, multi-tenant operations enforce tenant isolation, and sensitive data is minimized in requests, responses, logs, and URLs. Webhooks are designed for authenticated, duplicate, delayed, and potentially out-of-order delivery.**

> **Meaningful HTTP APIs maintain an authoritative OpenAPI contract, consumer-facing documentation, tests, observability, explicit ownership, and a controlled lifecycle from design through deprecation and retirement. Breaking changes are avoided through additive evolution wherever practical and introduced only through intentional versioning and migration.**

A production-grade API should make it easy to answer:

```text
Who consumes this API?
Who owns it?
What resource or action does it represent?
How is the caller authenticated?
What exactly are they authorized to do?
Which tenant owns the resource?
What input is accepted?
What output is guaranteed?
How are errors represented?
How large can requests/results become?
How is pagination performed?
Can the request be retried?
Is it idempotent?
What happens when a dependency fails?
What is the rate limit?
How does the contract evolve?
Where is its authoritative schema?
How do we know it is healthy?
How do consumers migrate away from deprecated behavior?
```

If those questions cannot be answered from the contract and its documentation, the API is not yet production-grade.

For the standards baseline: as of **September 22, 2026**, OpenAPI lists **3.2.1**, published September 10, 2026, as its latest specification. Its purpose is specifically to provide a language-agnostic description of HTTP APIs usable by documentation, client/server generation, and testing tooling. citeturn232342search0turn232342search1

For errors, **RFC 9457** is the current IETF Problem Details standard and supersedes RFC 7807. It standardizes the `application/problem+json` model and supports stable problem types plus extensions for cases such as field-level validation errors. citeturn705625search0

In the master standard, the sequence now becomes:

**Foundations → Architecture → Framework → Security → Auth/AuthZ → Data & Database → API → Routes → State Management → Design Tokens → Layouts → Facade → Components → Forms → Patterns → Reusability → Testing → Performance → Observability → Infrastructure → Documentation → Governance.**
