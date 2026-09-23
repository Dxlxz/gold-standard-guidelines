---
id: "security"
title: "Security Guidelines — Gold Standard"
domain: "security"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["security"]
applies_to: ["security"]
related: ["code-review"]
legacy_number: 5
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 59166
provenance: baseline

---

This version treats security as a **product architecture constraint**, not a final penetration-test phase. The baseline is aligned to the current **OWASP ASVS 5.0.0**, **OWASP Top 10:2025**, NIST SSDF, and current NIST SP 800-63-4 identity guidance. OWASP’s 2025 Top 10 now places Broken Access Control first and explicitly includes Software Supply Chain Failures and Mishandling of Exceptional Conditions, so those are first-class sections below. citeturn293660search0turn977297search0turn977297search1

# Security Guidelines — Gold Standard

## 1. Purpose

These guidelines define the minimum security standard for product engineering.

The objective is to ensure that products are:

- secure by design;
- secure by default;
- resilient to misuse;
- resistant to common attack classes;
- defensible during incidents;
- observable;
- recoverable;
- maintainable;
- testable;
- least-privileged;
- safe across tenant boundaries.

Security is a product property.

It is not:

- a penetration test performed before launch;
- a compliance checkbox;
- a responsibility delegated solely to infrastructure;
- something users must manually configure correctly;
- something that can be added after architecture is complete.

The core principle is:

> **The secure path must be the default path.**

---

# 2. Normative Language

The following terms are intentional:

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless an explicitly documented exception exists.
- **SHOULD NOT** — generally prohibited unless justified.
- **MAY** — optional.

Exceptions to mandatory security controls require:

1. documented justification;
2. risk assessment;
3. compensating controls;
4. named owner;
5. expiration/review date.

---

# 3. Security Hierarchy

Security should be applied at every architectural layer.

```text
Product Requirements
        ↓
Threat Model
        ↓
Identity
        ↓
Authorization
        ↓
Application Logic
        ↓
Data Protection
        ↓
API / Network Boundaries
        ↓
Infrastructure
        ↓
Supply Chain
        ↓
Deployment
        ↓
Monitoring
        ↓
Incident Response
```

A secure UI over an insecure backend is not a secure product.

---

# 4. Security Principles

## 4.1 Secure by design

Security requirements MUST be considered while designing the feature.

Do not design:

```text
Feature
↓
Implementation
↓
Launch
↓
Security review
```

Prefer:

```text
Requirements
↓
Threat model
↓
Security requirements
↓
Implementation
↓
Verification
↓
Launch
```

---

## 4.2 Secure by default

The default configuration MUST be the safe configuration.

Users SHOULD NOT need to:

- discover security settings;
- disable dangerous defaults;
- buy a higher plan for fundamental protections;
- understand infrastructure security to use the product safely.

---

## 4.3 Deny by default

When authorization is unclear:

```text
deny
```

not:

```text
allow
```

Access should require a positive authorization decision.

---

## 4.4 Least privilege

Every:

- user;
- service;
- API key;
- worker;
- database role;
- CI job;
- integration;

MUST receive only the permissions required to perform its function.

---

## 4.5 Minimize trust

Do not trust a value merely because it comes from:

- your own frontend;
- another microservice;
- a mobile application;
- an authenticated user;
- a signed-in administrator;
- a webhook;
- an internal network.

Validate trust at boundaries.

---

## 4.6 Defense in depth

Critical controls SHOULD have independent protective layers.

Example:

```text
Authentication
+
Authorization
+
Tenant isolation
+
Database constraints
+
Audit logging
```

Do not rely on one control to prevent catastrophic compromise.

---

## 4.7 Fail securely

Unexpected conditions MUST default to safe behavior.

If authorization cannot be determined:

```text
deny
```

If security configuration is unavailable:

```text
fail closed where appropriate
```

If a signature cannot be validated:

```text
reject
```

Never interpret an unexpected condition as permission.

---

# 5. Security Ownership

Every production system MUST have identifiable owners for:

- application security;
- authentication;
- authorization;
- infrastructure;
- secrets;
- dependency management;
- incident response;
- vulnerability remediation.

Security responsibilities MUST NOT depend on institutional memory.

---

# 6. Asset Classification

Before implementing security controls, identify what is being protected.

Typical categories:

```text
Public
Internal
Confidential
Highly sensitive
Regulated
Secret / credential material
```

Examples of high-risk assets:

- authentication credentials;
- session tokens;
- API keys;
- private encryption keys;
- financial data;
- personal data;
- health information;
- security logs;
- recovery credentials.

Controls should reflect data sensitivity.

---

# 7. Threat Modeling

Significant features SHOULD undergo threat modeling before implementation.

At minimum identify:

```text
Assets
Actors
Trust boundaries
Entry points
Privileges
Data flows
External dependencies
Failure modes
Abuse cases
```

Ask:

1. What are we protecting?
2. Who could attack it?
3. Where does untrusted data enter?
4. Where does privilege change?
5. What happens if this dependency is compromised?
6. What happens if the client is malicious?
7. What happens if one tenant attempts to access another?
8. How would abuse be detected?

---

# 8. Threat Model Triggers

Threat review is particularly important for:

- authentication;
- authorization;
- payments;
- file uploads;
- webhooks;
- public APIs;
- admin tools;
- multi-tenant boundaries;
- encryption;
- secrets;
- account recovery;
- data exports;
- integrations;
- user-generated content;
- AI agents or autonomous actions.

---

# 9. Authentication

Authentication establishes identity.

Authorization establishes permission.

Never confuse the two.

A valid login does not imply authorization to access every resource.

---

# 10. Prefer Established Identity Systems

Do not build custom authentication protocols unless identity is a core product capability and the organization has appropriate security expertise.

Prefer established:

- identity providers;
- authentication frameworks;
- OAuth/OIDC implementations;
- WebAuthn/passkey libraries.

Authentication code has a high failure cost.

---

# 11. Phishing-Resistant Authentication

Phishing-resistant authentication SHOULD be offered wherever practical.

Preferred mechanisms include:

```text
Passkeys / WebAuthn
Hardware security keys
Enterprise federation with strong authenticators
```

Privileged administrative accounts SHOULD use phishing-resistant authentication.

---

# 12. Password Policy

Where passwords are supported:

- permit long passphrases;
- block known compromised/common passwords;
- do not impose arbitrary character-composition rules;
- do not require routine password rotation without evidence of compromise;
- permit password managers and paste;
- do not truncate passwords silently.

Recommended baseline:

```text
Single-factor password:
minimum 15 characters

Password used as part of MFA:
minimum 8 characters

Maximum accepted length:
at least 64 characters
```

Password requirements SHOULD be revisited when authoritative identity guidance changes.

---

# 13. Password Storage

Passwords MUST NOT be:

- stored in plaintext;
- reversibly encrypted for authentication;
- logged;
- exposed through support tooling.

Use an approved password hashing algorithm designed for password storage.

Prefer:

```text
Argon2id
```

when supported.

Use:

- unique salts;
- appropriate work factors;
- versioned hashing parameters;
- safe migration strategy.

---

# 14. Multi-Factor Authentication

MFA SHOULD be available for user accounts and required where risk warrants it.

MFA SHOULD be mandatory for:

- privileged operators;
- administrative consoles;
- production infrastructure;
- source control administration;
- security-sensitive internal systems.

Prefer phishing-resistant factors over SMS or manually entered OTP where practical.

---

# 15. Authentication Rate Limiting

Authentication endpoints MUST resist automated guessing.

Controls MAY include:

- rate limiting;
- progressive delay;
- IP/device risk signals;
- compromised-password detection;
- bot mitigation.

Avoid permanent account lockouts that create trivial denial-of-service attacks.

---

# 16. Authentication Enumeration

Authentication and recovery flows SHOULD avoid unnecessary account enumeration.

Responses such as:

```text
No account exists with that email.
```

may expose registered accounts.

Where relevant, use consistent responses such as:

```text
If an account exists, recovery instructions have been sent.
```

Do not compromise usability blindly; apply this where enumeration creates meaningful risk.

---

# 17. Reauthentication

Require stronger or recent authentication before security-sensitive operations.

Examples:

- changing password;
- changing primary email;
- adding an authenticator;
- disabling MFA;
- viewing recovery codes;
- transferring ownership;
- changing payout information;
- deleting an account;
- modifying privileged access.

---

# 18. Account Recovery

Account recovery is an authentication mechanism and MUST receive equivalent security scrutiny.

Recovery MUST NOT be weaker than normal authentication without explicit risk analysis.

Recovery credentials MUST:

- be random;
- be single-use where appropriate;
- expire;
- be protected from disclosure.

High-risk recovery events SHOULD generate security notifications.

---

# 19. Email Verification

Email ownership SHOULD be verified before relying on an email address for:

- account recovery;
- sensitive notifications;
- invitations;
- identity decisions.

Changing the primary email SHOULD require appropriate reauthentication.

---

# 20. Session Management

Authenticated sessions are security credentials.

Treat session identifiers with the same care as authentication credentials.

Session identifiers MUST:

- be unpredictable;
- have sufficient entropy;
- be transmitted only over protected channels;
- not appear in URLs;
- be invalidated appropriately.

---

# 21. Session Cookies

Web session cookies SHOULD use appropriate attributes such as:

```text
Secure
HttpOnly
SameSite
```

Use the most restrictive `SameSite` behavior compatible with required workflows.

Prefer host-bound cookies where architecture allows it.

Do not make session tokens accessible to client-side JavaScript unless the architecture explicitly requires and secures that model.

---

# 22. Session Rotation

Session identifiers SHOULD rotate following security-sensitive transitions such as:

- authentication;
- privilege elevation;
- account recovery;
- major credential change.

This reduces session fixation risk.

---

# 23. Session Expiration

Sessions MUST have defined expiration behavior.

Consider:

```text
Idle timeout
Absolute lifetime
Reauthentication interval
Remember-me behavior
```

Higher-risk contexts require shorter or stronger reauthentication policies.

---

# 24. Session Revocation

The system SHOULD support revoking:

- a single session;
- all sessions for a user;
- sessions associated with compromised credentials.

Security-sensitive credential changes SHOULD invalidate affected sessions where appropriate.

---

# 25. Logout

Logout MUST invalidate the server-side session or equivalent credential state where applicable.

Removing only client-side UI state is insufficient.

---

# 26. Authorization

Authorization is one of the highest-risk application concerns.

Every sensitive operation MUST enforce authorization on the trusted server side.

Never rely solely on:

- hidden buttons;
- disabled controls;
- frontend route guards;
- client-side role checks.

---

# 27. Object-Level Authorization

Every request for a resource MUST verify that the requester can access that specific resource.

Example:

```text
GET /projects/123
```

must verify:

```text
Can this principal access project 123?
```

not merely:

```text
Is this principal authenticated?
```

---

# 28. Function-Level Authorization

Sensitive operations require explicit permission checks.

Examples:

```text
create
read
update
delete
invite
export
approve
administer
transfer
```

Do not assume access to a resource implies permission for every operation.

---

# 29. Authorization Model

Use a deliberate authorization model such as:

```text
RBAC
ABAC
ReBAC
Policy-based authorization
```

Avoid scattered ad hoc checks such as:

```text
if user.email === ...
```

or feature-specific permission logic with no central semantics.

---

# 30. Authorization Centralization

Authorization policy SHOULD be centralized enough to:

- audit;
- test;
- reason about;
- evolve safely.

Avoid duplicating subtly different authorization checks across controllers, routes, workers, and UI code.

---

# 31. Ownership Checks

Never trust an object identifier from the client to establish ownership.

Bad:

```text
userId supplied by client
↓
query resource
```

Preferred:

```text
authenticated principal
↓
authorized scope
↓
resource lookup
```

---

# 32. Multi-Tenant Isolation

Tenant boundaries are security boundaries.

Every tenant-scoped operation MUST establish tenant context independently from untrusted client claims.

Verify:

```text
principal
↓
tenant membership
↓
permission
↓
resource ownership
```

before returning or modifying tenant data.

---

# 33. Tenant Context

Do not rely solely on:

```text
workspaceId from request
```

or:

```text
tenantId from frontend state
```

Use authenticated identity and authoritative membership data to validate tenant context.

---

# 34. Cross-Tenant Testing

Multi-tenant systems MUST include tests specifically attempting:

```text
Tenant A user
→ Tenant B object ID
```

for:

- reads;
- writes;
- deletes;
- exports;
- file downloads;
- search;
- bulk actions;
- background tasks.

---

# 35. Privileged Roles

Administrative access MUST be tightly controlled.

Privileged accounts SHOULD:

- be minimal in number;
- use strong MFA;
- be logged extensively;
- avoid routine day-to-day use;
- have narrowly scoped permissions where possible.

---

# 36. Impersonation

Support/admin impersonation is a high-risk capability.

If supported, it MUST include:

- explicit permission;
- visible impersonation state;
- audit logging;
- reason/context where appropriate;
- controlled exit;
- restrictions on highly sensitive actions.

Never make impersonation invisible to operators.

---

# 37. Input Validation

All untrusted input MUST be validated at a trusted boundary.

Client-side validation improves UX.

It does not provide security.

Server-side validation remains mandatory.

---

# 38. Allowlist Validation

Prefer defining what is valid.

Example:

```text
status ∈ {
  active,
  paused,
  archived
}
```

instead of attempting to enumerate every invalid value.

---

# 39. Type and Range Validation

Validate:

- type;
- length;
- range;
- structure;
- allowed values;
- required relationships.

Example:

```text
page:
integer
>= 1
<= safe maximum
```

Never assume framework type coercion is sufficient.

---

# 40. Injection Prevention

Do not construct executable queries by concatenating untrusted input.

Use safe APIs and parameterization for:

- SQL;
- NoSQL;
- shell commands;
- LDAP;
- templates;
- search languages;
- expression languages.

Preferred:

```text
parameterized operation
```

not:

```text
string concatenation
```

---

# 41. SQL Injection

Use parameterized queries or safe ORM query construction.

Never interpolate untrusted input directly into SQL.

Dynamic:

- column names;
- sort directions;
- table names;

must be mapped against explicit allowlists.

---

# 42. Command Injection

Avoid invoking shell commands with user-controlled values.

Where operating-system interaction is necessary:

- avoid shell parsing;
- use safe process APIs;
- provide arguments separately;
- allowlist permissible values.

---

# 43. Cross-Site Scripting

Treat output context correctly.

Prefer framework-native output encoding.

Avoid unsafe rendering primitives such as raw HTML injection unless content has undergone appropriate sanitization.

User-controlled HTML MUST be sanitized with a purpose-built, maintained sanitizer.

---

# 44. HTML Sanitization

Do not attempt to sanitize HTML using regular expressions.

Use a vetted HTML sanitizer configured according to the product's allowed markup.

Sanitization policy should be explicit.

---

# 45. Content Security Policy

Web applications SHOULD deploy a meaningful Content Security Policy.

Prefer policies that restrict:

- scripts;
- frames;
- object sources;
- base URIs;
- form destinations.

Avoid relying indefinitely on extremely broad policies such as unrestricted inline script execution.

CSP is defense in depth and does not replace safe output handling.

---

# 46. Cross-Site Request Forgery

State-changing requests authenticated through browser credentials MUST address CSRF risk.

Use appropriate protections such as:

- CSRF tokens;
- origin verification;
- same-site cookies;
- framework protections.

`SameSite` cookies are defense in depth, not a universal replacement for CSRF controls.

---

# 47. CORS

CORS policy MUST be explicit.

Do not deploy:

```text
Access-Control-Allow-Origin: *
```

for credentialed sensitive APIs.

Allow only origins required by the architecture.

Validate origins exactly rather than using unsafe substring matching.

---

# 48. Security Headers

Web applications SHOULD deliberately configure relevant headers, including where applicable:

```text
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
frame restrictions
```

Do not rely on historical browser defaults.

---

# 49. HTTPS

All authenticated and sensitive traffic MUST use HTTPS.

HTTP SHOULD redirect to HTTPS where appropriate.

Production systems SHOULD enable HSTS once deployment architecture is known to support it safely.

---

# 50. TLS

Use supported modern TLS configurations.

Do not manually create cryptographic transport protocols.

Certificate issuance and renewal SHOULD be automated and monitored.

---

# 51. Cryptography

Use established cryptographic libraries and protocols.

Never create custom cryptographic algorithms.

Developers SHOULD NOT manually combine cryptographic primitives unless they have specialist expertise and a reviewed design.

---

# 52. Encryption at Rest

Sensitive data SHOULD be encrypted at rest according to threat model and platform capabilities.

Encryption keys MUST be separated from encrypted data to the extent practical.

Encryption does not replace authorization.

---

# 53. Encryption in Transit

Sensitive data MUST be protected in transit.

This applies to:

- browser connections;
- service-to-service communication where risk warrants;
- database connections;
- administrative interfaces;
- integrations.

---

# 54. Key Management

Encryption keys MUST have controlled lifecycle management.

Define:

```text
Creation
Storage
Access
Rotation
Revocation
Backup
Destruction
```

Prefer managed key-management systems for production.

---

# 55. Secrets

Secrets include:

- API keys;
- private keys;
- database passwords;
- signing secrets;
- OAuth client secrets;
- webhook secrets;
- service credentials.

Secrets MUST NOT be committed to source control.

---

# 56. Secret Storage

Production secrets SHOULD be stored in an approved secret-management system.

Avoid:

```text
source files
frontend bundles
Docker images
documentation
chat messages
shared spreadsheets
```

as secret storage.

---

# 57. Secret Rotation

Secrets MUST be rotatable.

High-value secrets SHOULD support rotation without prolonged downtime.

Rotation procedures SHOULD be tested before an incident occurs.

---

# 58. Secret Exposure

If a secret is exposed:

```text
Revoke/rotate
↓
Investigate
↓
Determine exposure window
↓
Review logs
↓
Remediate source
```

Deleting the secret from Git history alone does not invalidate it.

---

# 59. Frontend Secrets

Anything shipped to a browser or mobile client must be considered observable by the user.

Never embed server secrets in frontend environment variables.

A variable being called:

```text
SECRET
```

does not make it secret once included in a client bundle.

---

# 60. Data Minimization

Collect only the data required for legitimate product needs.

Do not collect sensitive data merely because it may become useful later.

Reduced data collection reduces breach impact.

---

# 61. Data Retention

Sensitive information MUST have a defined retention policy.

Define:

```text
Why collected
How long retained
Where stored
How deleted
Backup lifecycle
```

Do not retain data indefinitely without a documented reason.

---

# 62. Data Deletion

Deletion semantics MUST be explicit.

Distinguish:

```text
soft delete
hard delete
scheduled deletion
legal retention
backup expiration
```

Do not tell users that data is permanently deleted if recoverable production copies remain indefinitely.

---

# 63. Sensitive Data in Logs

Never intentionally log:

- passwords;
- session tokens;
- access tokens;
- refresh tokens;
- recovery tokens;
- private keys;
- full payment card data.

PII and other sensitive fields SHOULD be minimized or redacted.

---

# 64. Sensitive Data in URLs

Do not put confidential information or secrets in URLs.

URLs may leak through:

- browser history;
- referrer headers;
- analytics;
- proxy logs;
- screenshots;
- support logs.

---

# 65. APIs

Every API endpoint MUST define:

```text
Authentication
Authorization
Input schema
Output schema
Error behavior
Rate limits where required
Audit requirements
```

Public APIs additionally require versioning and abuse considerations.

---

# 66. API Authorization

API authorization MUST be enforced on the server for every protected operation.

Never infer permission from the fact that the frontend exposed the endpoint.

---

# 67. API Schemas

Requests and responses SHOULD use explicit schemas.

Reject unexpected or invalid data when appropriate.

Avoid mass-assignment vulnerabilities by mapping permitted fields explicitly.

---

# 68. Mass Assignment

Do not bind untrusted request bodies directly to privileged database models.

Bad:

```text
updateUser(request.body)
```

where request body could contain:

```text
role: "admin"
```

Prefer explicit fields:

```text
updateUser({
  displayName,
  timezone
})
```

---

# 69. Excessive Data Exposure

API responses SHOULD return only fields required by the consumer.

Do not serialize complete internal models by default.

Sensitive server fields must remain server-side.

---

# 70. Rate Limiting

Rate-limit operations vulnerable to:

- brute force;
- enumeration;
- spam;
- expensive computation;
- resource exhaustion;
- financial abuse.

Limits SHOULD consider identity, IP, tenant, resource, or other appropriate dimensions.

---

# 71. Resource Limits

Requests SHOULD have bounded:

- body size;
- file size;
- batch size;
- page size;
- query complexity;
- processing time;
- concurrency.

Unbounded operations create denial-of-service risk.

---

# 72. GraphQL

GraphQL deployments SHOULD control:

- query depth;
- complexity;
- pagination;
- authorization;
- batching abuse;
- introspection where appropriate.

Authorization must occur at relevant resource boundaries, not merely at the top-level query.

---

# 73. Webhooks — Incoming

Incoming webhooks MUST be authenticated where the provider supports it.

Use mechanisms such as:

```text
signature verification
timestamp verification
shared secret
mTLS
```

Verify the raw payload exactly as required by the provider.

---

# 74. Webhook Replay Protection

Signed webhooks SHOULD defend against replay where supported.

Use:

- timestamp tolerance;
- unique event IDs;
- deduplication.

Webhook handlers SHOULD be idempotent.

---

# 75. Webhooks — Outgoing

Do not allow arbitrary webhook destinations without considering SSRF risk.

Restrict protocols and destination behavior as appropriate.

Webhook secrets SHOULD be:

- generated securely;
- rotatable;
- protected;
- redacted from UI after creation where feasible.

---

# 76. SSRF

Server-side network requests using user-controlled destinations are high risk.

Defenses MAY include:

- destination allowlists;
- DNS/IP validation;
- blocked internal address ranges;
- controlled egress;
- redirect restrictions;
- dedicated outbound proxies.

Protect cloud metadata and internal administrative endpoints.

---

# 77. URL Fetching

Features that fetch:

- previews;
- images;
- imports;
- webhooks;
- remote documents;

MUST treat destination URLs as hostile input.

Validate after redirects and resolution as required by the threat model.

---

# 78. File Uploads

File uploads MUST be treated as hostile.

Validate:

- size;
- declared type;
- actual content where practical;
- filename;
- extension;
- storage location.

Do not trust the browser-provided MIME type.

---

# 79. Uploaded File Storage

User uploads SHOULD be stored outside directly executable application paths.

Where feasible:

```text
upload
↓
quarantine/validation
↓
object storage
↓
controlled retrieval
```

Do not allow uploaded files to become executable server code.

---

# 80. File Names

Do not use user-provided filenames directly as storage paths.

Generate server-controlled identifiers.

Store original names as metadata if needed.

Prevent:

- traversal;
- overwrite;
- control-character issues.

---

# 81. File Downloads

Downloads require authorization just like API resources.

A difficult-to-guess object-storage URL is not an authorization mechanism.

Signed URLs SHOULD be:

- scoped;
- short-lived;
- generated after authorization.

---

# 82. Path Traversal

Never concatenate untrusted paths directly into filesystem locations.

Normalize and constrain filesystem access to intended directories.

Prefer server-generated storage identifiers.

---

# 83. Archive Extraction

Treat archive uploads carefully.

Protect against:

- path traversal;
- decompression bombs;
- excessive file counts;
- oversized expanded content.

Enforce limits before and during extraction.

---

# 84. Image and Document Processing

Media parsers increase attack surface.

Use maintained processing libraries and isolate high-risk processing where warranted.

Apply resource limits.

---

# 85. Database Security

Production databases MUST NOT be broadly internet-accessible unless explicitly required and secured.

Applications SHOULD use restricted database identities.

Application credentials SHOULD NOT have unrestricted administrative privileges.

---

# 86. Database Roles

Separate roles where practical:

```text
application runtime
migrations
read-only analytics
administration
backup
```

Do not run ordinary application queries as a database superuser.

---

# 87. Database Constraints

Security-sensitive invariants SHOULD be reinforced at the database layer where practical.

Examples:

- unique relationships;
- foreign keys;
- tenant ownership relationships;
- state constraints.

Application checks alone may be insufficient under concurrency or bugs.

---

# 88. Backups

Backups are sensitive production data.

They MUST be:

- access-controlled;
- encrypted where appropriate;
- monitored;
- retention-managed;
- tested for restoration.

A backup that has never been restored is not a verified recovery mechanism.

---

# 89. Background Jobs

Workers MUST enforce appropriate authorization and tenant context.

Do not assume a queued job is trustworthy merely because it originated inside the application.

Job payloads SHOULD contain stable identifiers, not unnecessary sensitive data.

---

# 90. Queue Security

Queues SHOULD have:

- restricted access;
- authenticated publishers/consumers;
- message limits;
- poison-message handling;
- retry controls.

Repeated failures MUST NOT cause unbounded processing.

---

# 91. Idempotency

Sensitive repeatable operations SHOULD support idempotency where duplicate execution creates risk.

Examples:

- payments;
- provisioning;
- invitations;
- webhook processing;
- external side effects.

---

# 92. Error Handling

Errors MUST fail predictably.

Do not expose:

- stack traces;
- database queries;
- infrastructure addresses;
- filesystem paths;
- secrets;
- internal implementation details;

to untrusted users.

---

# 93. Exceptional Conditions

Applications MUST intentionally handle:

```text
timeouts
dependency failures
partial responses
invalid states
race conditions
retry exhaustion
resource exhaustion
unexpected exceptions
```

Unexpected conditions MUST NOT accidentally bypass authorization or validation.

---

# 94. Client Error Messages

User-facing errors SHOULD explain:

```text
what happened
what the user can do
```

without exposing sensitive internal diagnostics.

---

# 95. Server Diagnostics

Detailed error information MAY be retained in protected observability systems.

Correlate user-facing failures with internal diagnostics using safe request or incident identifiers.

---

# 96. Logging

Security-relevant systems MUST produce sufficient logs to investigate incidents.

Log events such as:

- authentication success/failure;
- MFA changes;
- password/recovery changes;
- authorization failures;
- privilege changes;
- administrative actions;
- API key lifecycle;
- sensitive exports;
- account deletion;
- security configuration changes.

---

# 97. Audit Logs

High-value business actions SHOULD produce durable audit events.

An audit event SHOULD include where appropriate:

```text
actor
action
target
tenant
timestamp
result
source/context
```

Do not log secrets.

---

# 98. Audit Integrity

Security audit records SHOULD be protected from ordinary application users.

High-risk systems SHOULD make tampering or deletion difficult and observable.

---

# 99. Monitoring

Security logs are useful only if important events can be detected.

Define alerting for suspicious behavior such as:

- repeated authentication failures;
- unusual privilege changes;
- abnormal API key use;
- large data exports;
- cross-tenant authorization failures;
- unusual administrative access;
- sudden security-control failures.

---

# 100. Time Synchronization

Systems generating security events SHOULD use reliable synchronized time.

Incident investigation depends on trustworthy event ordering.

---

# 101. Dependency Security

Third-party code becomes part of the product attack surface.

Maintain visibility into:

- direct dependencies;
- transitive dependencies;
- runtime dependencies;
- build dependencies;
- container base images.

---

# 102. Dependency Minimization

Do not add a dependency for trivial functionality without considering:

```text
maintenance
security history
ownership
transitive dependencies
update frequency
licensing
package integrity
```

Less dependency surface generally means less supply-chain surface.

---

# 103. Lockfiles

Applications SHOULD commit and enforce appropriate dependency lockfiles.

Build pipelines SHOULD produce reproducible or sufficiently deterministic dependency resolution.

---

# 104. Dependency Updates

Security updates MUST have an established remediation process.

Do not depend solely on ad hoc developer awareness.

Automated dependency alerts SHOULD feed a triaged workflow rather than being ignored as noise.

---

# 105. Package Installation

Be cautious with:

- install scripts;
- untrusted registries;
- package-name typos;
- newly published packages;
- abandoned libraries.

Internal package naming SHOULD avoid dependency-confusion risk.

---

# 106. Software Bill of Materials

Organizations with meaningful supply-chain requirements SHOULD generate and retain an SBOM for production releases.

The SBOM should enable identifying affected software when dependency vulnerabilities emerge.

---

# 107. Artifact Integrity

Production artifacts SHOULD have verifiable provenance where supported.

Build outputs should originate from controlled CI/CD rather than individual developer machines.

---

# 108. Source Control

Production source repositories MUST enforce appropriate access controls.

Strongly recommended:

```text
MFA
protected branches
review requirements
restricted administrative access
auditability
```

Critical protections SHOULD not be bypassable by ordinary contributors.

---

# 109. Branch Protection

Critical branches SHOULD require:

- reviewed changes;
- passing required checks;
- controlled force pushes;
- controlled deletion.

Direct production changes should be exceptional.

---

# 110. Code Review

Security-sensitive code requires deliberate review.

Particularly:

- authentication;
- authorization;
- cryptography;
- payment;
- tenant isolation;
- file handling;
- deserialization;
- infrastructure permissions;
- secret handling.

---

# 111. CI/CD Security

CI systems are production-security infrastructure.

Protect:

- CI credentials;
- deployment tokens;
- signing keys;
- package publishing credentials;
- cloud identities.

CI jobs SHOULD receive only required secrets.

---

# 112. Pull Request Security

Untrusted pull request code MUST NOT automatically gain access to privileged production secrets.

This is particularly important for:

- public repositories;
- forks;
- external contributors;
- automated dependency PRs.

---

# 113. Environment Separation

Production SHOULD be meaningfully separated from:

- development;
- local environments;
- test environments;
- preview deployments.

Do not casually reuse:

- production credentials;
- production databases;
- production secrets;

in lower environments.

---

# 114. Production Data in Development

Production data SHOULD NOT be copied into lower environments without explicit controls.

Where representative data is required, prefer:

- synthetic data;
- anonymized data;
- appropriately masked data.

---

# 115. Infrastructure as Code

Production infrastructure SHOULD be defined through reviewable infrastructure-as-code where practical.

This improves:

- reproducibility;
- review;
- auditability;
- drift detection.

Manual production configuration should be minimized.

---

# 116. Cloud IAM

Cloud permissions MUST follow least privilege.

Avoid persistent broad permissions such as:

```text
*
```

unless strictly justified.

Prefer workload identity and short-lived credentials over static long-lived access keys.

---

# 117. Network Exposure

Services SHOULD expose only required interfaces.

Internal services SHOULD NOT become publicly accessible by default.

Administrative interfaces require stronger access controls.

---

# 118. Administrative Interfaces

Production administrative surfaces SHOULD have:

- strong authentication;
- least privilege;
- network restrictions where useful;
- audit logging;
- short sessions;
- clear privileged-state indication.

---

# 119. Containers

Container images SHOULD:

- use maintained base images;
- minimize unnecessary packages;
- avoid embedded secrets;
- avoid privileged execution;
- run as non-root where practical;
- be scanned for known vulnerabilities.

---

# 120. Production Configuration

Debug or development settings MUST NOT reach production unintentionally.

Production MUST NOT expose:

- debug consoles;
- development error pages;
- source maps containing sensitive source where prohibited;
- test endpoints;
- development credentials.

---

# 121. Secure Defaults

New deployments SHOULD default to:

```text
authentication enabled
least privilege
private resources
logging enabled
safe cookie settings
TLS
restricted network exposure
```

Security controls should not require customers to discover hidden configuration.

---

# 122. Feature Flags

Feature flags MUST NOT be treated as authorization.

A hidden or disabled feature can still be attacked if the backend endpoint remains exposed.

Authorization remains mandatory.

---

# 123. Debug and Support Tools

Debug capabilities MUST NOT create hidden bypasses.

Support tools require:

- authorization;
- audit logs;
- explicit production policy;
- removal or disabling when unnecessary.

---

# 124. Remote Code Execution Features

Features capable of executing:

- user code;
- templates;
- scripts;
- queries;
- plugins;

require strong isolation.

Do not execute untrusted code directly inside the primary application environment.

---

# 125. Sandboxing

Untrusted code execution SHOULD use appropriately hardened isolation.

Depending on risk:

```text
separate process
container
VM
specialized sandbox
separate account/project
```

Resource and network limits are required.

---

# 126. Deserialization

Avoid unsafe deserialization of untrusted data.

Use data formats and libraries that do not instantiate arbitrary executable objects.

Treat serialized input as untrusted input.

---

# 127. Redirects

User-controlled redirects MUST be validated.

Do not implement:

```text
?next=https://attacker.example
```

without restricting acceptable destinations.

Prefer relative or allowlisted application destinations.

---

# 128. OAuth and OIDC

Use established protocol libraries.

Validate where applicable:

- issuer;
- audience;
- signature;
- state;
- nonce;
- redirect URI;
- token expiration.

Do not manually parse and trust token payloads without cryptographic validation.

---

# 129. OAuth Redirect URIs

Redirect URIs SHOULD be exact and narrowly configured.

Avoid broad wildcard redirect destinations.

OAuth state must not become an open-redirect mechanism.

---

# 130. API Keys

API keys MUST be:

- generated with sufficient entropy;
- scoped;
- revocable;
- attributable;
- protected from disclosure.

Where possible:

```text
display secret once
store verifier/hash where architecture permits
```

---

# 131. API Key Prefixes

API keys MAY use non-secret prefixes to:

- identify key type;
- improve secret scanning;
- support operational debugging.

The secret portion must remain high entropy.

---

# 132. API Key Scoping

Keys SHOULD support appropriate restriction by:

- tenant;
- environment;
- permission;
- API surface.

Avoid universal administrator keys when narrower credentials suffice.

---

# 133. API Key Rotation

Users and operators SHOULD be able to rotate keys without unnecessary downtime.

Support temporary overlap where necessary for safe migration.

---

# 134. Service-to-Service Authentication

Services SHOULD authenticate to one another using managed workload identity or strong service credentials.

Avoid one static secret shared across the entire architecture.

---

# 135. WebSocket Security

WebSocket connections MUST establish authorization.

Do not assume authorization remains valid forever merely because the initial connection succeeded.

Validate sensitive channel subscriptions and tenant scope.

---

# 136. Realtime Channels

Users MUST NOT be able to subscribe to:

```text
another user's channel
another tenant's channel
privileged event streams
```

by manipulating channel identifiers.

---

# 137. Search

Search endpoints can create data-leakage paths.

Search results MUST enforce the same authorization boundaries as direct object retrieval.

Do not index data into globally searchable stores without tenant/access controls.

---

# 138. Exports

Data exports are high-value exfiltration paths.

Exports SHOULD require:

- explicit authorization;
- appropriate audit logging;
- secure temporary storage;
- expiration;
- protected download URLs.

Large or sensitive exports MAY warrant reauthentication.

---

# 139. Bulk Operations

Bulk actions MUST authorize every affected resource.

Do not authorize only the first object or collection-level page.

---

# 140. Imports

Imported files and records are untrusted input.

Validate:

- schema;
- size;
- record count;
- permissions;
- resource ownership;
- references.

Provide bounded processing.

---

# 141. Notifications

Security-sensitive notifications SHOULD be sent for meaningful account changes such as:

- password changed;
- MFA disabled;
- email changed;
- new recovery method;
- suspicious login;
- API credential created where appropriate.

Do not include secrets in notification content.

---

# 142. Email Security

Emails MUST NOT be treated as a trusted rendering or authentication environment.

Links involving sensitive actions SHOULD use:

- limited-purpose tokens;
- expiration;
- single use where appropriate.

Do not put long-lived session credentials into email URLs.

---

# 143. Race Conditions

Security-sensitive state changes MUST consider concurrency.

Examples:

- coupon redemption;
- balance changes;
- permissions;
- invitations;
- resource ownership;
- inventory.

Use database transactions, locking, idempotency, or atomic operations where required.

---

# 144. Business Logic Abuse

Security testing must consider valid operations used maliciously.

Examples:

```text
creating thousands of free resources
inviting unlimited users
repeated trial creation
abusing refunds
automation intended for humans
bypassing workflow sequencing
```

Security is broader than injection vulnerabilities.

---

# 145. Abuse Controls

High-abuse features SHOULD define:

```text
rate limits
quotas
verification
monitoring
cost controls
manual review thresholds
```

These controls should reflect real abuse models.

---

# 146. Denial of Service

Expensive operations MUST be bounded.

Consider:

- query complexity;
- memory;
- CPU;
- upload size;
- export size;
- job concurrency;
- pagination;
- retries.

One user should not be able to exhaust shared infrastructure trivially.

---

# 147. Retry Behavior

Retries MUST be bounded.

Use:

- maximum attempts;
- exponential backoff;
- jitter where appropriate;
- dead-letter handling.

Never retry permanent errors indefinitely.

---

# 148. Security Logging vs Privacy

Collect enough telemetry to investigate incidents without creating unnecessary repositories of sensitive user data.

Security observability and privacy must be designed together.

---

# 149. Vulnerability Management

The organization MUST have a defined vulnerability lifecycle:

```text
Discover
↓
Triage
↓
Prioritize
↓
Remediate
↓
Verify
↓
Close
↓
Learn
```

---

# 150. Vulnerability Severity

Severity SHOULD reflect more than CVSS alone.

Consider:

```text
exploitability
internet exposure
data sensitivity
privilege required
tenant impact
active exploitation
blast radius
existing mitigations
```

---

# 151. Remediation Targets

Define organization-specific remediation SLAs.

Example policy structure:

```text
Critical → immediate priority
High     → accelerated remediation
Medium   → planned remediation
Low      → backlog/risk-managed
```

Exact deadlines SHOULD reflect organizational risk and operational capability.

---

# 152. Known Exploited Vulnerabilities

Actively exploited vulnerabilities affecting exposed production assets require elevated remediation priority.

Do not treat active exploitation as an ordinary backlog item.

---

# 153. Security Testing

Security verification SHOULD combine:

```text
code review
unit/integration tests
SAST
dependency analysis
secret scanning
DAST where appropriate
infrastructure scanning
manual security testing
penetration testing where warranted
```

No single tool provides sufficient coverage.

---

# 154. Security Unit Tests

Security invariants SHOULD have automated tests.

Examples:

```text
User cannot access another tenant
Member cannot perform admin action
Expired token is rejected
Invalid webhook signature is rejected
Private file requires authorization
```

---

# 155. Negative Testing

Security tests MUST attempt forbidden behavior, not only correct behavior.

Test:

```text
wrong user
wrong tenant
wrong role
missing token
expired token
modified ID
invalid state
duplicate request
oversized request
```

---

# 156. Authorization Matrix Testing

Significant applications SHOULD maintain testable relationships among:

```text
Roles × Resources × Actions
```

Example:

| Role | Read | Create | Update | Delete | Admin |
|---|---|---|---|---|---|
| Viewer | ✓ | — | — | — | — |
| Member | ✓ | ✓ | scoped | — | — |
| Admin | ✓ | ✓ | ✓ | ✓ | scoped |

The actual matrix depends on product semantics.

---

# 157. Penetration Testing

Independent penetration testing SHOULD be considered for:

- high-risk applications;
- major architecture changes;
- regulated systems;
- externally exposed sensitive systems;
- significant authentication/authorization changes.

Penetration testing does not replace ongoing secure development.

---

# 158. Secure Development Lifecycle

Security MUST be integrated into ordinary product development.

Recommended lifecycle:

```text
Requirements
↓
Threat model
↓
Design review
↓
Implementation
↓
Automated checks
↓
Code review
↓
Security verification
↓
Deployment
↓
Monitoring
↓
Feedback
```

---

# 159. Security Requirements

Features involving sensitive behavior SHOULD include explicit security requirements alongside functional requirements.

Example:

```text
Functional:
Workspace owner can invite a member.

Security:
Only authorized workspace administrators may create invitations.
Invitation is tenant-bound.
Invitation expires.
Invitation cannot be reused.
Invitation events are auditable.
```

---

# 160. Security Design Review

Security review SHOULD occur before code becomes expensive to change.

Architecture requiring specialist review includes:

- custom authentication;
- cryptography;
- tenancy;
- payments;
- sandboxing;
- external code execution;
- high-risk integrations;
- secret-management changes.

---

# 161. Security Champions

Engineering teams MAY designate security champions to improve local ownership.

Security champions support secure engineering.

They do not replace dedicated security expertise where required.

---

# 162. Incident Response

Production systems MUST have an incident response process.

It should define:

```text
Detection
Triage
Containment
Eradication
Recovery
Communication
Post-incident analysis
```

---

# 163. Incident Access

During incidents, emergency access procedures MUST remain controlled and auditable.

Do not normalize permanent excessive privileges merely because they may be useful during emergencies.

---

# 164. Security Contacts

The organization SHOULD maintain an obvious internal escalation path for suspected vulnerabilities and incidents.

Public-facing software organizations SHOULD consider a documented vulnerability-reporting channel.

---

# 165. Vulnerability Disclosure

External vulnerability reports SHOULD receive:

- acknowledgment;
- triage;
- safe communication;
- remediation;
- appropriate disclosure handling.

Good-faith reports should not disappear into ordinary customer support queues.

---

# 166. Incident Logging

Incident investigations require preserved evidence.

Ensure relevant:

- application logs;
- authentication logs;
- cloud audit logs;
- infrastructure events;

have suitable retention and access controls.

---

# 167. Recovery

Security architecture MUST consider recovery from compromise.

Define how to rotate:

- user sessions;
- API keys;
- service credentials;
- database credentials;
- signing keys;
- encryption keys where possible.

---

# 168. Disaster Recovery

Security and availability overlap.

Critical systems SHOULD define:

```text
Recovery Point Objective
Recovery Time Objective
Backup strategy
Restore procedure
Failover procedure
```

Recovery procedures must be tested.

---

# 169. Supply-Chain Incident Readiness

The organization SHOULD be able to answer:

```text
Are we using dependency X?
Which production versions contain it?
Where are those deployments?
Can we patch or remove it quickly?
```

This requires dependency visibility and release traceability.

---

# 170. Security Documentation

Security-critical architecture SHOULD be documented.

Documentation MAY include:

- trust boundaries;
- auth flows;
- authorization model;
- tenant model;
- key ownership;
- secret lifecycle;
- data classification;
- incident procedures.

Do not rely entirely on tribal knowledge.

---

# 171. Security Decisions

Material security tradeoffs SHOULD be documented through an architecture or security decision record.

Include:

```text
Decision
Threat
Alternatives
Chosen control
Residual risk
Owner
Review date
```

---

# 172. Security Exceptions

Exceptions MUST NOT silently become permanent defaults.

Every exception requires:

```text
reason
risk
compensating control
owner
expiration
```

Expired exceptions require review.

---

# 173. Security and UX

Security controls SHOULD minimize unnecessary user burden.

Good security UX:

- supports password managers;
- supports passkeys;
- explains sensitive actions;
- makes account security visible;
- uses secure defaults;
- avoids needless repeated prompts.

Poor UX can cause users to circumvent controls.

---

# 174. Destructive Actions

Sensitive destructive actions SHOULD require deliberate confirmation proportionate to consequence.

Authorization must still be server-side.

A confirmation dialog is a UX safeguard, not a security boundary.

---

# 175. Security Settings

Security-critical settings SHOULD clearly communicate:

- current state;
- consequences;
- recent changes;
- recovery implications.

Avoid hiding critical security configuration inside obscure advanced menus.

---

# 176. AI-Generated Code

AI-generated code MUST meet the same security standard as human-written code.

AI output is untrusted until reviewed and tested.

---

# 177. AI Security Inspection

Before implementing security-sensitive code, an AI coding agent SHOULD inspect existing:

```text
auth utilities
authorization policies
middleware
tenant resolution
validation schemas
secret management
database abstractions
security headers
logging
rate limiting
```

The AI MUST reuse established controls rather than invent parallel security systems.

---

# 178. AI Authentication Rule

An AI MUST NOT casually implement custom:

```text
password hashing
session protocols
token signing
OAuth
MFA
cryptography
```

when established repository/framework mechanisms exist.

---

# 179. AI Authorization Rule

AI-generated endpoints MUST explicitly consider authorization.

For each protected operation, answer:

```text
Who is the principal?
What resource is being accessed?
Which tenant owns it?
What action is requested?
Where is permission enforced?
```

---

# 180. AI Input Rule

AI-generated server handlers MUST assume all external input is malicious until validated.

This includes data from:

```text
URL
query string
headers
cookies
forms
JSON
webhooks
files
third-party APIs
AI output
```

---

# 181. AI Secret Rule

AI MUST NOT:

- hardcode credentials;
- invent production secrets;
- expose server environment variables to clients;
- log sensitive tokens;
- commit `.env` contents.

Use existing secret-management patterns.

---

# 182. AI Dependency Rule

AI SHOULD NOT add a new dependency if the existing platform safely provides the required capability.

When adding one, inspect:

```text
maintenance
security
license
dependency tree
repository maturity
```

---

# 183. AI Security Comments

Do not produce comments such as:

```text
// TODO: add auth later
```

for production-sensitive endpoints and consider the feature complete.

Missing security controls are incomplete functionality.

---

# 184. AI Fail-Secure Rule

If the AI cannot determine whether an operation is authorized, it MUST NOT invent permissive behavior.

Prefer:

```text
explicit denial
```

or integration with the established policy layer.

---

# 185. AI Database Rule

AI-generated queries MUST:

- use parameterization;
- preserve tenant boundaries;
- avoid mass assignment;
- avoid excessive data return;
- use transactions for relevant invariants.

---

# 186. AI Route Rule

AI-generated protected routes MUST align with the route security standard:

```text
authentication
authorization
input validation
safe error handling
audit logging where applicable
```

Client-side route protection alone is insufficient.

---

# 187. Security Anti-Patterns

Never:

```text
Trust the frontend
```

Never:

```text
Hide a button and call it authorization
```

Never:

```text
Store plaintext passwords
```

Never:

```text
Put secrets in source control
```

Never:

```text
Ship secrets to the browser
```

Never:

```text
Construct SQL from user strings
```

Never:

```text
Use wildcard production permissions by default
```

Never:

```text
Expose debug mode in production
```

Never:

```text
Use obscurity as access control
```

Never:

```text
Treat a guessed URL as proof of permission
```

Never:

```text
Trust uploaded MIME type
```

Never:

```text
Log authentication tokens
```

Never:

```text
Disable certificate verification to fix connectivity
```

Never:

```text
Write custom crypto because it seems simple
```

Never:

```text
Use feature flags as authorization
```

Never:

```text
Make core security protections an optional premium configuration
```

---

# 188. Security Review Checklist

Before approving a feature, verify:

```text
□ Assets identified
□ Trust boundaries understood
□ Threat model considered
□ Authentication appropriate
□ Authorization server-side
□ Object-level authorization enforced
□ Tenant isolation enforced
□ Input validated
□ Output handled safely
□ SQL/query operations parameterized
□ CSRF considered
□ XSS considered
□ SSRF considered
□ CORS configured intentionally
□ Security headers considered
□ Sensitive data identified
□ Data minimization applied
□ Secrets handled correctly
□ Logging avoids secrets
□ Audit events defined
□ Rate limiting considered
□ Resource limits defined
□ Error handling fails safely
□ Dependency risk reviewed
□ File handling safe
□ Webhooks authenticated where applicable
□ Race conditions considered
□ Abuse cases considered
□ Loading/failure conditions cannot bypass controls
□ Security tests added
□ Negative authorization tests added
□ Operational monitoring exists where required
```

---

# 189. Pre-Launch Security Gate

Production release MUST NOT proceed with an unresolved security issue that creates unacceptable risk.

Before launch:

```text
✓ Auth boundaries verified
✓ Authorization matrix tested
✓ Cross-tenant access tested
✓ Production secrets configured correctly
✓ Debug behavior disabled
✓ HTTPS enforced
✓ Cookies configured securely
✓ Security headers reviewed
✓ Production permissions reviewed
✓ Sensitive logging reviewed
✓ Dependency vulnerabilities triaged
✓ Database privileges reviewed
✓ Backup/recovery verified as appropriate
✓ Alerts operational for critical security events
✓ Incident ownership identified
```

---

# 190. Definition of Done — Security

A feature is not complete merely because authorized users can make it work.

It is complete only when:

```text
✓ Intended users can perform the action
✓ Unauthorized users cannot perform the action
✓ Other tenants cannot access the resource
✓ Invalid input is rejected safely
✓ Malicious input does not alter execution semantics
✓ Sensitive data remains protected
✓ Credentials are not exposed
✓ Errors do not disclose internal secrets
✓ Abuse is bounded where necessary
✓ Relevant activity is observable
✓ Recovery/failure behavior is safe
✓ Applicable security tests pass
```

---

# 191. Golden Security Rules

When uncertain, follow these rules.

**1. Never trust the client.**  
Clients communicate intent, not authority.

**2. Authenticate identity.**  
Know who is making the request.

**3. Authorize every protected operation.**  
Login is not permission.

**4. Verify the specific object.**  
Prevent object-level access-control failures.

**5. Establish tenant context server-side.**  
Tenant IDs from clients are claims, not proof.

**6. Deny by default.**  
Uncertainty must not create access.

**7. Grant least privilege.**  
Reduce blast radius.

**8. Validate at trust boundaries.**  
All external input is untrusted.

**9. Parameterize executable queries.**  
Never mix data with executable syntax unnecessarily.

**10. Keep secrets server-side.**  
Anything shipped to a client is observable.

**11. Use established cryptography.**  
Do not invent crypto.

**12. Treat sessions as credentials.**

**13. Make secure behavior the default.**

**14. Minimize sensitive data.**

**15. Bound expensive operations.**

**16. Design failure behavior.**  
Exceptional conditions are part of the threat model.

**17. Log security-relevant events without logging secrets.**

**18. Protect the software supply chain.**

**19. Test forbidden behavior, not only successful behavior.**

**20. Assume compromise is possible and design recovery.**

---

# 192. Canonical Security Standard

The organizational standard is:

> **All product systems must be secure by design, secure by default, deny access by default, and enforce least privilege. Authentication establishes identity; server-side authorization establishes access. Tenant boundaries, resource ownership, input validation, secrets, data protection, dependency integrity, infrastructure permissions, logging, failure handling, and recovery are first-class architecture concerns. Security controls are implemented throughout the software development lifecycle and verified through automated and manual testing. Client behavior, URLs, hidden controls, feature flags, obscurity, and trusted-network assumptions are never treated as security boundaries.**

A secure product should remain defensible when:

- the client is hostile;
- identifiers are manipulated;
- requests are replayed;
- dependencies fail;
- one tenant targets another;
- credentials are compromised;
- unusual states occur;
- the system is under abuse;
- engineers make mistakes.

Security quality is demonstrated not only by what the system allows legitimate users to do, but by what it reliably prevents everyone else from doing.

### Standards basis

For the system documentation, I would formally set **OWASP ASVS 5.0.0 as the application-security verification baseline** rather than using the OWASP Top 10 as the acceptance checklist; OWASP describes ASVS specifically as a testable set of requirements for application security controls. citeturn293660search0 The Top 10:2025 remains useful as the risk-awareness layer. citeturn977297search0

For identity, NIST SP 800-63-4 is now the current suite; the older SP 800-63-3 was superseded on **August 1, 2025**. Its current password guidance includes a 15-character minimum for single-factor passwords, at least 8 characters when a password is used as part of MFA, blocking compromised/common passwords, no arbitrary composition rules, and no periodic forced rotation without evidence of compromise. It also calls for phishing-resistant options at AAL2. citeturn740204search0turn740204search3turn740204search5

For the engineering process, **NIST SSDF SP 800-218** supplies the secure-SDLC foundation, while CISA's Secure by Design guidance reinforces that manufacturers should take responsibility for customer security outcomes and make safe configuration the default rather than pushing that burden onto customers. citeturn977297search1turn293660search36
