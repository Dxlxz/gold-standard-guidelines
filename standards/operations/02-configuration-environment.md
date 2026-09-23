---
id: "configuration-environment"
title: "Configuration & Environment Guidelines — Gold Standard"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["operations", "configuration", "environment"]
applies_to: ["infra"]
related: ["analytics"]
legacy_number: 23
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 66832
provenance: baseline

---

This standard treats **configuration as a deploy/runtime contract**, **secrets as a separate security class**, and **environments as isolated deployment contexts rather than branches of application logic**.

# Configuration & Environment Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical standard for:

- application configuration;
- local development;
- test environments;
- preview environments;
- development environments;
- staging;
- production;
- environment variables;
- `.env` files;
- runtime configuration;
- build-time configuration;
- configuration validation;
- secrets;
- credentials;
- secret managers;
- feature flags;
- environment parity;
- configuration ownership;
- configuration promotion;
- CI/CD configuration;
- infrastructure configuration;
- emergency configuration changes.

The objective is to ensure configuration is:

```text
Explicit
Validated
Secure
Owned
Auditable
Environment-aware
Reproducible
Easy to operate
Difficult to misuse
```

The core principle is:

> **Code defines behavior. Configuration selects approved behavior for a deployment. Secrets authorize access. These concerns must remain distinct.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented exception exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
Affected environment
Security impact
Operational impact
Owner
Expiry/review date
```

---

# 3. Configuration Definition

Configuration is information that can legitimately vary between deployments without changing application code.

Examples:

```text
DATABASE_URL
PUBLIC_APP_URL
EMAIL_PROVIDER_REGION
LOG_LEVEL
QUEUE_NAME
PAYMENT_PROVIDER_MODE
```

---

# 4. Configuration vs Code

A value belongs in configuration when:

```text
same application code
+
different deployment
→
different value
```

A value belongs in code when it expresses stable application behavior.

---

# 5. Code Example

Good code-owned constant:

```text
MAX_PROJECT_NAME_LENGTH = 120
```

if this is a stable product rule.

Potential configuration:

```text
UPLOAD_BUCKET
```

because it changes between deployments.

---

# 6. Do Not Externalize Everything

Not every constant should become an environment variable.

Excessive external configuration creates:

- hidden behavior;
- deployment complexity;
- weak discoverability;
- testing explosion.

Prefer code unless legitimate deploy-time variability exists.

---

# 7. Configuration Categories

The canonical configuration categories are:

```text
Static code configuration
Deployment configuration
Runtime configuration
Secret configuration
Feature configuration
Infrastructure configuration
User/product settings
```

---

# 8. Static Code Configuration

Static application behavior that does not vary by deployment belongs in version-controlled code.

Examples:

```text
route definitions
domain invariants
component defaults
supported file types
```

---

# 9. Deployment Configuration

Deployment configuration varies between deployed instances.

Examples:

```text
database host
public hostname
storage bucket
provider endpoint
```

---

# 10. Runtime Configuration

Runtime configuration may change without rebuilding the application.

Examples may include:

```text
operational kill switch
runtime feature rollout
rate limit
```

when architecture explicitly supports dynamic updates.

---

# 11. Secret Configuration

Secrets include:

```text
passwords
API keys
private keys
signing secrets
database credentials
OAuth client secrets
encryption keys
```

Secrets require stronger handling than ordinary configuration.

---

# 12. Feature Configuration

Feature flags control:

```text
availability
rollout
experimentation
operational disablement
```

They require dedicated lifecycle governance.

---

# 13. Infrastructure Configuration

Infrastructure configuration includes:

```text
CPU/memory
autoscaling
network
load balancer
regions
storage class
```

and SHOULD generally be managed through Infrastructure as Code.

---

# 14. User/Product Settings

User-editable application settings are not deployment environment variables.

Examples:

```text
workspace timezone
notification preferences
branding
```

belong in application data/configuration systems.

---

# 15. Environment Model

Canonical deployment environments are conceptually:

```text
Local
Test
Preview
Development / Integration
Staging
Production
```

Not every project needs every environment.

---

# 16. Environment Purpose

Each environment MUST have a defined purpose.

Do not create environments because:

```text
"every company has staging"
```

Create them when they provide meaningful isolation or verification.

---

# 17. Local Environment

Local exists for developer iteration.

Goals:

```text
fast startup
safe experimentation
reasonable production similarity
independence
```

---

# 18. Local Must Be Safe

Local development MUST NOT require production:

```text
credentials
databases
customer data
queues
storage
```

for ordinary engineering work.

---

# 19. Test Environment

Test environments exist for automated verification.

They SHOULD be:

```text
isolated
repeatable
disposable
deterministic
```

---

# 20. Preview Environment

Preview environments provide deployment-like verification for a branch/change.

They SHOULD be ephemeral where practical.

---

# 21. Preview Isolation

Preview deployments MUST NOT share mutable production resources.

---

# 22. Preview Credentials

Preview credentials must have:

```text
limited privileges
non-production scope
automatic expiry where practical
```

---

# 23. Development Environment

Shared development/integration environments MAY support:

```text
cross-service integration
QA
internal demonstrations
```

They MUST NOT be treated as production.

---

# 24. Staging Environment

Staging exists to validate production-like behavior before production.

It SHOULD resemble production in architecture where this provides real verification value.

---

# 25. Production Environment

Production serves real users/business operations.

It requires the strongest:

```text
access controls
change controls
secret handling
observability
auditability
```

---

# 26. Environment Separation

Production MUST be isolated from non-production where compromise or accidental modification could affect users.

Isolation SHOULD include applicable:

```text
accounts/projects
credentials
databases
buckets
queues
networks
domains
```

---

# 27. Separate Credentials

Each environment MUST use its own credentials.

Never use:

```text
same production API key
```

for staging, preview, or local development.

---

# 28. Separate Databases

Production and non-production databases MUST be separate.

---

# 29. Separate Storage

Production object storage SHOULD be separate from non-production storage.

---

# 30. Separate Queues

Production queues/topics SHOULD be separate from non-production.

---

# 31. Separate External Provider Modes

Use:

```text
sandbox
test mode
development account
```

for external providers when available.

---

# 32. Environment Naming

Environment names SHOULD be stable and consistent.

Canonical examples:

```text
local
test
development
staging
production
```

---

# 33. Avoid Environment Synonyms

Do not inconsistently use:

```text
prod
production
prd
live
```

through different systems for the same concept.

Pick one canonical identifier.

---

# 34. Production Name

Recommended canonical machine identifier:

```text
production
```

---

# 35. Environment Is Not Feature Logic

Avoid code such as:

```ts
if (environment === "production") {
  enableBusinessFeature();
}
```

for ordinary product behavior.

Use explicit configuration/feature flags.

---

# 36. Environment Checks

Environment checks are appropriate for true environment-specific behavior such as:

```text
development tooling
test isolation
production debugging restrictions
```

---

# 37. Avoid Environment Explosion

Do not encode configuration into dozens of named environment categories.

Prefer independent explicit config values.

---

# 38. Orthogonal Configuration

Configuration values SHOULD be independently controllable.

Prefer:

```text
EMAIL_ENABLED=false
PAYMENTS_MODE=sandbox
```

over an overloaded:

```text
ENVIRONMENT=qa-eu-special
```

that implicitly controls everything.

---

# 39. Environment Parity

Environment parity means:

> Important production characteristics should be represented in pre-production environments closely enough to expose meaningful defects.

---

# 40. Parity Is Not Identity

Staging does not need production scale.

Example:

```text
Production
20 app instances

Staging
2 app instances
```

may still have useful architectural parity.

---

# 41. Parity Priorities

Prioritize parity for:

```text
runtime version
database engine/version
deployment mechanism
migration process
network assumptions
authentication integration
build artifact
```

---

# 42. Same Artifact Principle

Production SHOULD deploy the same immutable application artifact that was tested earlier.

Prefer:

```text
Build once
↓
Test artifact
↓
Promote artifact
↓
Deploy production
```

---

# 43. Do Not Rebuild for Production

Avoid:

```text
build staging artifact
↓
test
↓
rebuild from source for production
```

when avoidable.

The production build may differ from the tested artifact.

---

# 44. Environment-Specific Configuration Injection

Prefer:

```text
same artifact
+
environment-specific configuration
```

over separate source builds.

---

# 45. Runtime Version Parity

Local/CI/staging SHOULD use the supported production runtime version.

Examples:

```text
Node
Python
Java
PostgreSQL
```

---

# 46. Database Engine Parity

If production uses PostgreSQL:

```text
SQLite in tests
```

is not sufficient verification for database-specific behavior.

---

# 47. Service Parity

Mocking may be appropriate locally, but integration/staging SHOULD exercise real classes of dependencies where their behavior matters.

---

# 48. Configuration Source of Truth

Each configuration item MUST have one authoritative source.

Avoid competing values in:

```text
.env
CI variables
Terraform
deployment YAML
runtime admin UI
```

without precedence rules.

---

# 49. Configuration Precedence

If multiple configuration sources exist, precedence MUST be documented.

Example:

```text
runtime secret manager
>
deployment environment
>
safe default
```

Do not leave precedence to framework accident.

---

# 50. Recommended Precedence Simplicity

Prefer as few configuration layers as possible.

Every additional layer increases ambiguity.

---

# 51. Configuration Registry

Significant applications SHOULD maintain a configuration registry/catalog.

Each item SHOULD document:

```text
Name
Purpose
Type
Required?
Default
Secret?
Scope
Owner
Example
Validation
Restart/reload behavior
```

---

# 52. Configuration Naming

Environment/config variables SHOULD use:

```text
UPPER_SNAKE_CASE
```

unless platform convention requires otherwise.

---

# 53. Name for Meaning

Prefer:

```text
DATABASE_POOL_MAX
```

over:

```text
MAX
```

---

# 54. Boolean Naming

Boolean configuration SHOULD communicate positive meaning.

Prefer:

```text
EMAIL_SENDING_ENABLED
```

over:

```text
DISABLE_EMAIL_SENDING
```

when practical.

---

# 55. Units in Names

Include units where ambiguity exists.

Prefer:

```text
REQUEST_TIMEOUT_MS
CACHE_TTL_SECONDS
MAX_UPLOAD_BYTES
```

---

# 56. Configuration Names Are Contracts

Renaming a production environment variable can break deployment.

Treat important config names as external contracts.

---

# 57. Typed Configuration

Configuration MUST be parsed into typed application values.

Do not use raw strings throughout the application.

---

# 58. Boolean Parsing

Bad:

```ts
Boolean(process.env.FEATURE_ENABLED)
```

because:

```text
"false"
```

is truthy in many languages.

Use explicit parsing.

---

# 59. Number Parsing

Validate:

```text
integer
range
unit
```

not merely that a string can be converted.

---

# 60. URL Parsing

URL configuration SHOULD be parsed/validated structurally.

---

# 61. Enum Configuration

Bounded configuration SHOULD use explicit enum validation.

Example:

```text
LOG_LEVEL:
debug
info
warn
error
```

---

# 62. Unknown Values

Unknown enum/config values MUST fail validation rather than silently map to a fallback.

---

# 63. Configuration Schema

Every production application SHOULD define one canonical configuration schema.

---

# 64. Configuration Schema Responsibilities

The schema SHOULD define:

```text
name
type
required/optional
default
validation
secret classification where useful
```

---

# 65. Validate at Startup

Required configuration MUST be validated during application startup.

---

# 66. Fail Fast

Invalid critical configuration SHOULD cause the process to fail before serving traffic.

Bad:

```text
app starts
↓
first customer request
↓
DATABASE_URL undefined
```

---

# 67. Clear Startup Errors

Configuration validation errors should clearly identify:

```text
which config is invalid
expected format
```

without printing secret values.

---

# 68. Missing Config

Prefer:

```text
PAYMENT_PROVIDER_KEY is required.
```

not:

```text
Configuration error.
```

---

# 69. Secret Validation Error

Do not output:

```text
Invalid token: sk_live_...
```

Instead:

```text
PAYMENT_API_KEY is invalid or unavailable.
```

---

# 70. No Silent Defaults for Critical Config

Do not silently default:

```text
AUTH_REQUIRED=false
TLS_VERIFY=false
```

when configuration is missing.

Security-sensitive config MUST have safe behavior.

---

# 71. Safe Defaults

Defaults SHOULD be:

```text
secure
predictable
low-risk
```

---

# 72. Required vs Default

Critical external configuration SHOULD often be required rather than defaulted.

Example:

```text
DATABASE_URL
```

normally has no production default.

---

# 73. Development Defaults

Safe development defaults MAY exist.

They must not accidentally become production behavior.

---

# 74. Production Validation

The application SHOULD explicitly prevent unsafe development defaults in production.

---

# 75. Example

Invalid:

```text
production
+
EMAIL_PROVIDER=console
```

if real email delivery is mandatory.

Configuration validation can reject this combination.

---

# 76. Cross-Field Validation

Configuration schemas SHOULD support invariants between fields.

Example:

```text
TLS_ENABLED=true
→ TLS_CERTIFICATE required
```

---

# 77. Conditional Configuration

Conditional requirements SHOULD remain explicit.

---

# 78. Dead Configuration

Unused configuration SHOULD be removed.

Do not leave mysterious variables indefinitely.

---

# 79. Configuration Discovery

Developers should be able to determine required configuration without searching the entire source tree.

---

# 80. `.env` Purpose

`.env` files MAY be used as a developer convenience for local environment variables.

They are not a secrets-management platform.

---

# 81. `.env.example`

Repositories SHOULD provide:

```text
.env.example
```

or equivalent documentation containing:

```text
variable names
safe example values
comments where useful
```

---

# 82. Never Put Real Secrets in `.env.example`

Example files MUST contain only safe placeholders.

Good:

```text
PAYMENT_API_KEY=replace_me
```

---

# 83. `.env` Git Ignore

Local secret-containing `.env` files MUST be excluded from version control.

---

# 84. Explicit Ignore Patterns

Repositories SHOULD explicitly ignore applicable variants such as:

```text
.env
.env.local
.env.*.local
```

according to framework conventions.

---

# 85. Beware `.env.production`

A filename containing:

```text
production
```

does not make it safe.

Do not commit production credentials to source control.

---

# 86. Local Secret Provisioning

Local development secrets SHOULD come from:

```text
developer secret manager
approved CLI
local ignored file
short-lived identity
```

according to platform maturity.

---

# 87. `.env` Permissions

Local `.env` files containing secrets SHOULD have appropriately restrictive filesystem access where supported.

---

# 88. `.env` Duplication

Avoid many inconsistent local files such as:

```text
.env
.env.dev
.env.development
.env.local
.env.user
.env.override
```

without documented precedence.

---

# 89. Framework Loading Rules

Document framework-specific `.env` loading precedence.

Do not rely on developer memory.

---

# 90. Environment Variables

Environment variables are suitable for many simple deployment configuration values.

They are not automatically secure.

---

# 91. Environment Variables Are Strings

Treat them as untrusted string input until validated.

---

# 92. Secret Environment Variables

Environment variables MAY carry secrets when platform architecture requires it, but stronger secret injection mechanisms SHOULD be preferred where practical.

---

# 93. Environment Variable Exposure

Secrets in environment variables may leak through:

```text
process inspection
crash dumps
debug output
child processes
diagnostic tooling
```

depending on platform.

---

# 94. Build-Time Environment Variables

Build-time configuration is embedded during build.

Examples:

```text
PUBLIC_API_ORIGIN
PUBLIC_ANALYTICS_ID
```

depending on framework architecture.

---

# 95. Build-Time Values Are Frozen

Changing a build-time value generally requires a rebuild.

Do not pretend it is runtime configuration.

---

# 96. Runtime Configuration

Runtime config is read by the running deployment.

Changing it may require:

```text
restart
reload
```

depending on platform.

---

# 97. Build-Time vs Runtime Must Be Documented

Every important config value SHOULD identify:

```text
build_time
runtime
dynamic_runtime
```

semantics.

---

# 98. Public Configuration

Frontend/browser configuration is public.

Any value delivered to browser JavaScript MUST be treated as visible to users.

---

# 99. Public Prefixes

Frameworks often use conventions such as:

```text
PUBLIC_
NEXT_PUBLIC_
VITE_
```

Treat such variables as intentionally exposed.

---

# 100. Never Put Secrets in Browser Config

No:

```text
database password
private API key
OAuth client secret
signing key
```

may be exposed to client bundles.

---

# 101. Browser Build Inspection

Assume users can inspect:

```text
JavaScript
source maps
network
HTML
```

Do not rely on obscurity.

---

# 102. Secret Definition

A secret is any value whose disclosure could allow unauthorized:

```text
access
identity impersonation
data decryption
privilege
signing
```

or other sensitive capability.

---

# 103. Common Secrets

Examples:

```text
database passwords
API keys
private signing keys
TLS private keys
OAuth client secrets
webhook signing secrets
```

---

# 104. Not Every Configuration Value Is Secret

Examples typically nonsecret:

```text
region
public hostname
queue name
log level
```

Do not force ordinary config through secret storage unnecessarily.

---

# 105. Secret Management Platform

Production secrets SHOULD be stored in an approved secret-management system.

---

# 106. Secret Manager Capabilities

Preferred capabilities include:

```text
encryption
access policy
audit
rotation
versioning
runtime delivery
```

---

# 107. No Hardcoded Secrets

Secrets MUST NOT be committed into:

```text
source code
Dockerfile
container image
Terraform variable defaults
documentation
tests
fixtures
```

---

# 108. Secret Scanning

Source repositories and CI SHOULD run secret scanning.

---

# 109. Secret Leak Response

A committed secret is considered exposed even if:

```text
commit was deleted
branch was removed
```

Rotate/revoke it.

---

# 110. Git History

Removing a secret from the current file does not erase it from Git history.

---

# 111. Secret Rotation

All long-lived secrets SHOULD support rotation.

---

# 112. Rotation Without Downtime

Where practical, support:

```text
new credential
↓
overlap
↓
deployment update
↓
old credential revoke
```

---

# 113. Secret Versioning

Secret stores SHOULD support versions so deployments can migrate safely.

---

# 114. Secret Expiration

Prefer short-lived credentials where platform capabilities permit.

---

# 115. Workload Identity

Prefer:

```text
workload identity
managed identity
federated identity
```

over static credentials when available.

---

# 116. Human vs Workload Credentials

Do not use personal developer credentials for production application workloads.

---

# 117. Environment-Specific Secrets

Production and staging secrets MUST be different.

---

# 118. Secret Naming

Secret identifiers SHOULD communicate:

```text
service
purpose
environment
```

without embedding the secret itself.

---

# 119. Secret Scope

A secret should grant only the minimum required permissions.

---

# 120. Shared Secrets

Avoid one secret shared across many unrelated services.

Shared credentials increase blast radius and reduce attribution.

---

# 121. Secret Ownership

Every important secret SHOULD have:

```text
owner
purpose
consumer
rotation policy
```

---

# 122. Secret Inventory

Maintain an inventory of important production credentials.

---

# 123. Secret Access

Secret-manager access MUST follow least privilege.

---

# 124. Developer Secret Access

Developers SHOULD NOT need routine read access to production application secrets.

---

# 125. CI Secret Access

CI jobs receive only secrets required for that workflow.

---

# 126. Pull Request Safety

Untrusted pull requests/forks MUST NOT automatically receive production secrets.

---

# 127. CI Logging

Pipeline logs MUST NOT expose secret values.

---

# 128. Shell Tracing

Avoid:

```text
set -x
```

or equivalent debugging when it could print credentials.

---

# 129. Secret Masking

CI secret masking is defense in depth.

It does not make arbitrary secret printing acceptable.

---

# 130. Secret Files

Secrets MAY be injected as temporary files when supported.

File permissions and cleanup must be controlled.

---

# 131. Mounted Secrets

Mounted secret files can be preferable to environment variables for some workloads.

The application SHOULD read them through a clear secret abstraction if needed.

---

# 132. Container Images

Container images MUST NOT contain environment-specific secrets.

---

# 133. Docker Build Arguments

Build args are not safe secret storage.

Do not pass production secrets into image builds unless using dedicated secure build-secret mechanisms.

---

# 134. Kubernetes ConfigMaps

Non-confidential deployment configuration MAY use ConfigMaps or equivalent configuration resources.

---

# 135. ConfigMap Is Not Secret Storage

Confidential values MUST NOT be treated as safe merely because they are stored in a configuration object.

---

# 136. Kubernetes Secrets

Kubernetes Secrets MAY store confidential deployment data, but their existence alone does not guarantee sufficient protection.

Cluster:

```text
encryption
RBAC
namespace isolation
secret-store integration
```

must still be considered.

---

# 137. Immutable Config

Critical deployment config MAY use immutable/versioned resources to reduce accidental mutation.

---

# 138. Configuration Changes Are Deployments

A configuration change can be as consequential as a code change.

Treat high-impact configuration changes with equivalent review discipline.

---

# 139. Configuration-as-Code

Non-secret infrastructure/deployment configuration SHOULD be version-controlled where practical.

---

# 140. Benefits of Configuration-as-Code

This provides:

```text
review
history
reproducibility
rollback
ownership
```

---

# 141. Secret Values Are Not Configuration-as-Code

Version-control the:

```text
secret reference
secret identifier
access policy
```

not plaintext secret contents.

---

# 142. Configuration Review

Changes to production configuration SHOULD be reviewed.

---

# 143. High-Risk Configuration

Examples requiring stronger review:

```text
authentication bypass
authorization policy
network allowlist
payment provider
retention
encryption
rate limits
```

---

# 144. Change History

Production configuration changes SHOULD be auditable.

---

# 145. Actor

Audit should identify:

```text
who changed
what
when
environment
```

for important production config.

---

# 146. Reason

High-impact manual changes SHOULD record:

```text
ticket
incident
reason
```

where operational process supports it.

---

# 147. Config Diff

Operators SHOULD be able to inspect the effective difference before applying a production change.

---

# 148. Dry Run

Infrastructure/config tooling SHOULD offer:

```text
plan
preview
dry-run
```

where feasible.

---

# 149. Automatic Deployment

Normal production config changes SHOULD flow through approved delivery automation.

Avoid console-click configuration drift.

---

# 150. Emergency Changes

Emergency manual configuration changes MAY be allowed during incidents.

They MUST be:

```text
scoped
authorized
audited
reversible
```

---

# 151. Reconcile Emergency Changes

After the incident, any manual production change MUST be reconciled into the canonical configuration source or reverted.

---

# 152. Configuration Drift

Configuration drift means actual deployed config differs from intended/configured state.

---

# 153. Drift Detection

Infrastructure/platform tooling SHOULD detect important drift.

---

# 154. Drift Is a Defect

Persistent undocumented drift undermines:

```text
reproducibility
disaster recovery
incident diagnosis
```

---

# 155. Configuration Promotion

Configuration SHOULD be promoted deliberately across environments.

Do not blindly copy all staging values to production.

---

# 156. Promotion Pattern

Conceptually:

```text
Same config schema
+
environment-specific values
```

rather than:

```text
copy staging config wholesale
```

---

# 157. Production-Specific Values

Expected differences include:

```text
hostnames
credentials
resource capacity
provider account
regions
```

---

# 158. Staging Is Not Source of Production Truth

Production configuration has its own governed values.

Staging merely validates configuration shape and behavior.

---

# 159. Environment Parity Check

CI/CD SHOULD verify required config keys exist across applicable deployment definitions.

---

# 160. Configuration Migration

Changing configuration contracts requires migration planning.

Example:

```text
OLD_API_URL
→
SERVICE_BASE_URL
```

---

# 161. Config Rename

Safe sequence:

```text
support new + old
↓
deploy
↓
update environment
↓
verify
↓
remove old support
```

when zero-downtime compatibility is needed.

---

# 162. Config Deprecation

Deprecated variables SHOULD have:

```text
replacement
warning
removal date/version
```

---

# 163. Unknown Configuration

Applications MAY warn/fail on unknown environment variables within their owned namespace where this helps detect typos.

---

# 164. Typo Example

```text
DATABASE_POOL_MXA=20
```

should not silently appear to work.

---

# 165. Configuration Documentation

Every required production config item MUST be documented.

---

# 166. Example Values

Documentation SHOULD include safe examples.

---

# 167. Secret Documentation

Document:

```text
secret purpose
source
required permissions
```

not the value.

---

# 168. Config Ownership

Every major configuration namespace SHOULD have an owner.

Example:

```text
DATABASE_*
→ Platform/Data team

AUTH_*
→ Identity team
```

according to organization.

---

# 169. Ownership Questions

For every important config ask:

```text
Who defines it?
Who can change it?
Who reviews changes?
Who responds if it breaks?
```

---

# 170. Product vs Platform Ownership

Feature teams should not casually modify platform-level settings.

Platform teams should not independently change domain semantics.

---

# 171. Config Change Blast Radius

Before changing configuration determine:

```text
single instance?
service?
region?
all production?
all tenants?
```

---

# 172. Canary Configuration

High-risk dynamic configuration MAY be rolled out gradually.

---

# 173. Regional Rollout

Configuration MAY be applied region-by-region where architecture supports this.

---

# 174. Tenant-Specific Config

Tenant-specific behavior usually belongs in product configuration/data, not environment variables.

---

# 175. Avoid Per-Tenant Environment Variables

Bad:

```text
TENANT_123_FEATURE_ENABLED=true
TENANT_456_FEATURE_ENABLED=false
```

Use a governed product/feature configuration system.

---

# 176. Feature Flags

Feature flags are temporary or operational controls over specific behavior.

---

# 177. Feature Flag Categories

Canonical categories:

```text
Release flag
Experiment flag
Operational flag
Permission/entitlement-adjacent flag
Kill switch
```

---

# 178. Release Flag

Used for progressive delivery of incomplete/new functionality.

---

# 179. Experiment Flag

Used to assign product experiments.

Experiment semantics follow Analytics Guidelines.

---

# 180. Operational Flag

Controls behavior for operational reasons.

Example:

```text
disable expensive recommendation service
```

---

# 181. Kill Switch

A kill switch can rapidly disable risky functionality.

---

# 182. Feature Flag ≠ Authorization

Feature flags MUST NOT replace server-side authorization.

Bad:

```text
if feature_enabled:
   allow_admin_action
```

without permission validation.

---

# 183. Feature Flag ≠ Entitlement by Default

Commercial entitlement should have an authoritative entitlement model.

A feature flag may participate in rollout but should not become accidental billing logic.

---

# 184. Flag Naming

Feature flags SHOULD use stable descriptive names.

Example:

```text
projects_new_editor
```

---

# 185. Avoid Negated Flags

Prefer:

```text
new_checkout_enabled
```

over:

```text
disable_old_checkout
```

when practical.

---

# 186. Flag Metadata

Every flag SHOULD have:

```text
owner
purpose
type
created date
expected removal
safe default
```

---

# 187. Flag Defaults

Feature flag defaults must be explicitly defined.

---

# 188. Remote Flag Failure

If the remote feature-flag service is unavailable, the application MUST have safe fallback behavior.

---

# 189. Security Flag Default

Security-sensitive flags SHOULD fail conservatively.

---

# 190. Optional Feature Default

Optional enhancements MAY safely default off.

---

# 191. Cached Flags

Remote flags MAY use cached last-known values where appropriate.

Freshness semantics must be understood.

---

# 192. Flag Evaluation Location

Critical server behavior should evaluate flags on trusted servers.

Client flags control presentation, not security.

---

# 193. User-Targeted Flags

Targeting rules may use:

```text
account
region
cohort
plan
```

where permitted.

Avoid unnecessary PII.

---

# 194. Flag Consistency

Determine whether one operation requires consistent evaluation.

Do not let the same user receive:

```text
old behavior
new behavior
old behavior
```

during one transactional workflow unexpectedly.

---

# 195. Flag Snapshot

Long-running operations MAY capture the flag version/decision at start.

---

# 196. Flag Analytics

Important experiment/release exposure SHOULD follow Analytics Guidelines.

---

# 197. Flag Lifecycle

Canonical lifecycle:

```text
Create
↓
Roll out
↓
100% stable
↓
Remove conditional
↓
Delete flag
```

---

# 198. Flag Debt

Flags are not permanent architecture.

Temporary release flags MUST be removed after rollout.

---

# 199. Flag Expiry

Temporary flags SHOULD have an expiry/review date.

---

# 200. Flag Cleanup

Removing a flag includes:

```text
remove branches
remove tests for obsolete path
remove dashboard/config
remove flag definition
```

---

# 201. Long-Lived Flags

Long-lived configuration should graduate into a proper product/runtime configuration mechanism when appropriate.

---

# 202. Flag Count

Large numbers of interacting flags create combinatorial state explosion.

Keep active flag count controlled.

---

# 203. Flag Dependency

Avoid flag logic such as:

```text
A && !B || (C && D)
```

across features.

Complex flag dependencies require redesign.

---

# 204. Flag Testing

Critical flags SHOULD test:

```text
off
on
```

and migration coexistence where needed.

---

# 205. Dynamic Runtime Configuration

Dynamic configuration changes without deployment require stronger governance because they bypass normal artifact promotion.

---

# 206. Dynamic Config Use Cases

Appropriate examples:

```text
rate limits
operational thresholds
kill switches
runtime capacity settings
```

---

# 207. Dynamic Config Schema

Dynamic config MUST be validated using the same rigor as startup config.

---

# 208. Dynamic Config Update

Invalid dynamic values MUST NOT replace the last valid configuration.

---

# 209. Last Known Good

Dynamic config systems SHOULD retain:

```text
last known good
```

values where appropriate.

---

# 210. Atomic Config Updates

Related values SHOULD update atomically when inconsistent intermediate states would be unsafe.

---

# 211. Configuration Version

Dynamic config SHOULD have version/revision identity.

---

# 212. Config Rollback

Operators SHOULD be able to restore a previous valid version.

---

# 213. Config Propagation

Know whether changes propagate:

```text
instantly
eventually
on restart
```

---

# 214. Propagation Monitoring

Critical dynamic configuration SHOULD expose rollout state.

---

# 215. Inconsistent Instances

If different instances can temporarily run different config versions, determine whether the application can tolerate it.

---

# 216. Configuration Cache

Runtime config MAY be cached.

Define:

```text
TTL
refresh
failure
last-known-good
```

behavior.

---

# 217. Config Service Outage

Applications SHOULD NOT depend synchronously on a remote config service for every request.

Use cached/evaluated configuration where architecture allows.

---

# 218. Startup Config Dependency

If required config cannot be loaded safely:

```text
fail readiness/startup
```

rather than guessing values.

---

# 219. Configuration Security

Configuration can alter security posture.

Examples:

```text
CORS
cookie mode
TLS
authorization
debugging
```

must receive security review.

---

# 220. Debug Mode

Production MUST NOT run general development/debug mode.

---

# 221. Debug Endpoints

Development-only debugging endpoints MUST be disabled or strongly restricted in production.

---

# 222. Verbose Errors

Production configuration MUST NOT expose stack traces/debug details to untrusted users.

---

# 223. TLS Verification

Never introduce:

```text
TLS_VERIFY=false
```

as an ordinary production workaround.

---

# 224. Insecure Production Overrides

Dangerous configuration overrides SHOULD be explicitly prohibited by production validation.

---

# 225. CORS Configuration

CORS origins MUST be explicit and environment-specific.

Avoid:

```text
*
```

for credentialed production applications.

---

# 226. Hostname Configuration

Public/canonical URLs MUST match the deployment environment.

They affect:

```text
links
OAuth redirects
cookies
metadata
webhooks
```

---

# 227. Cookie Configuration

Production cookies should use appropriate:

```text
Secure
SameSite
domain
```

configuration.

Do not derive sensitive cookie behavior from loosely defined environment checks.

---

# 228. Authentication Callback URLs

OAuth/OIDC callback URLs SHOULD be explicit per deployment.

Never allow arbitrary wildcard behavior to simplify environment configuration.

---

# 229. Webhook Endpoints

Provider webhook configuration is environment-specific.

Test and production endpoints must be separate.

---

# 230. Email Configuration

Non-production environments SHOULD prevent accidental real-user email delivery.

---

# 231. Safe Email Defaults

Strategies include:

```text
email sandbox
allowlist
sink
provider test mode
```

---

# 232. SMS/Push Safety

The same applies to:

```text
SMS
push
phone calls
```

during testing.

---

# 233. Payment Safety

Non-production environments MUST use provider test/sandbox payment facilities.

---

# 234. Production Data in Non-Production

Configuration MUST NOT point local/staging applications at production datasets under normal workflows.

---

# 235. Read-Only Production Connections

Exceptional production read access requires explicit controlled tooling, not a developer changing:

```text
DATABASE_URL
```

locally.

---

# 236. Environment Banner

Administrative/non-production interfaces MAY visibly identify the current environment.

Example:

```text
STAGING
```

to reduce operator mistakes.

---

# 237. Production Confirmation

High-risk operational tooling MAY require additional confirmation when operating against production.

---

# 238. CLI Environment Safety

Operational CLIs SHOULD make the selected environment explicit.

---

# 239. Dangerous CLI Defaults

Never default destructive operational commands to production.

---

# 240. Production Explicitness

Prefer:

```text
--environment production
```

for dangerous operations rather than implicit production targeting.

---

# 241. CI/CD Configuration

CI configuration SHOULD be version-controlled.

---

# 242. CI Environment Separation

CI jobs should have explicit environments such as:

```text
test
preview
staging
production
```

with different permissions.

---

# 243. Protected Production Deployment

Production deployment jobs SHOULD require protected branches/workflows and appropriate authorization.

---

# 244. Environment Protection

CI/CD platforms SHOULD use environment protection capabilities where available.

---

# 245. Production Secret Access

Only production deployment/runtime jobs should access production deployment secrets.

---

# 246. Build Jobs

Ordinary build/test jobs SHOULD NOT receive production secrets.

---

# 247. Build Reproducibility

Build output SHOULD depend on:

```text
source
lockfile
toolchain
declared build configuration
```

not undocumented developer state.

---

# 248. Build-Time Public Variables

Build pipelines SHOULD explicitly document which values become part of public frontend bundles.

---

# 249. Artifact Metadata

Build artifacts SHOULD record:

```text
version
commit
build ID
```

for observability/debugging.

---

# 250. Deployment Config Audit

A production deployment SHOULD make it possible to identify:

```text
artifact version
config revision
secret references
feature-state revision where relevant
```

---

# 251. Config Snapshot

Critical deployments MAY persist a non-secret snapshot/hash of effective config for later diagnosis.

---

# 252. Never Snapshot Secret Values into Logs

Configuration diagnostics should show:

```text
PAYMENT_API_KEY=<configured>
```

not the value.

---

# 253. Effective Config Debugging

Applications MAY expose an authenticated internal diagnostic view showing:

```text
config key
source
effective nonsecret value
secret presence
```

without exposing credentials.

---

# 254. Config Redaction

Config-dump tooling MUST redact secrets by classification, not by hoping names contain:

```text
PASSWORD
SECRET
```

only.

---

# 255. Configuration Testing

Configuration behavior MUST be tested.

---

# 256. Schema Tests

Test that required production configuration fails appropriately when missing.

---

# 257. Type Tests

Test parsing of:

```text
boolean
integer
URL
enum
duration
```

where configuration libraries do not already guarantee it.

---

# 258. Unsafe Value Tests

Security-sensitive config should test rejection of unsafe combinations.

---

# 259. Environment Matrix Tests

Avoid testing every theoretical combination.

Test supported meaningful environment/config modes.

---

# 260. Feature Flag Tests

Test both flag branches while both are supported.

---

# 261. Flag Removal Tests

After rollout cleanup, remove tests for obsolete behavior.

---

# 262. Secrets Tests

Tests should verify applications can consume secret references without exposing values.

---

# 263. Secret Redaction Tests

Verify secret values do not appear in:

```text
logs
errors
diagnostics
telemetry
```

---

# 264. CI Tests

CI SHOULD verify `.env.example` or configuration documentation remains aligned with the actual schema where practical.

---

# 265. Environment Contract Test

Deployments MAY validate required configuration before rollout.

---

# 266. Preflight Validation

A deployment preflight SHOULD detect:

```text
missing config
invalid secret reference
invalid hostname
unsupported enum
```

before replacing healthy instances.

---

# 267. Readiness

An instance MUST NOT become ready if required runtime configuration is invalid.

---

# 268. Partial Rollout

If new instances fail config validation:

```text
retain healthy previous deployment
```

according to deployment strategy.

---

# 269. Config Rollback Test

Critical config systems SHOULD periodically verify rollback/recovery procedures.

---

# 270. Disaster Recovery

Disaster recovery MUST include restoration of:

```text
configuration
secret references
feature configuration
```

not only databases.

---

# 271. Secret Recovery

Backup/recovery plans should account for secret-management infrastructure.

---

# 272. Do Not Backup Secrets Casually

Secret backups require encryption and access controls equivalent to or stronger than live secrets.

---

# 273. Infrastructure Rebuild

Infrastructure-as-code plus managed configuration SHOULD allow rebuilding an environment without relying on undocumented manual settings.

---

# 274. Environment Bootstrap

A new environment SHOULD be creatable through documented automation.

---

# 275. Snowflake Environments

Avoid environments dependent on years of unrecorded manual changes.

---

# 276. Environment Teardown

Ephemeral environments SHOULD support automated cleanup.

---

# 277. Preview Cleanup

Delete:

```text
database
bucket
DNS
secrets
queues
```

associated with expired preview environments where applicable.

---

# 278. Orphan Resources

Configuration/environment automation SHOULD identify stale resources.

---

# 279. Cost Governance

Environment configuration controls resource cost.

Non-production SHOULD use appropriately smaller capacity when production-scale resources are unnecessary.

---

# 280. Cost vs Parity

Do not destroy useful architecture parity purely to save small amounts of cost.

Optimize responsibly.

---

# 281. Data Residency

Environment configuration MUST preserve applicable region/residency requirements.

---

# 282. Region Configuration

Region selection is high-impact configuration.

Changes require architectural review.

---

# 283. Time Zone Configuration

Server infrastructure SHOULD generally operate using UTC.

Business timezone belongs in explicit product/domain configuration.

---

# 284. Locale Configuration

Default locale MAY be deployment/product config.

User locale remains user state.

---

# 285. Clock Configuration

Do not depend on manually configured host time.

Infrastructure should provide synchronized system clocks.

---

# 286. Rate-Limit Configuration

Rate limits MAY be runtime configuration.

They require:

```text
safe bounds
owner
observability
rollback
```

---

# 287. Timeout Configuration

Timeouts SHOULD have:

```text
units
minimum
maximum
```

validation.

---

# 288. Retry Configuration

Retry counts/backoff may be configurable but SHOULD have safe limits.

Never allow:

```text
RETRY_COUNT=999999
```

without validation.

---

# 289. Connection Pool Configuration

Database pool sizing should be bounded relative to deployment/database capacity.

---

# 290. Memory/CPU Configuration

Infrastructure resource limits SHOULD be version-controlled and reviewed.

---

# 291. Configuration Coupling

Avoid hidden dependencies such as:

```text
if REGION=us
then PAYMENTS_MODE automatically becomes live
```

unless explicitly modeled.

---

# 292. Explicit Beats Magical

Prefer:

```text
PAYMENTS_MODE=test
```

over deriving it from unrelated environment naming.

---

# 293. Config Composability

Independent config should remain orthogonal where possible.

---

# 294. Config Explosion

If one feature requires 20 environment variables, review whether configuration architecture is too fragmented.

---

# 295. Structured Config

For complex structured configuration, a validated configuration file/service MAY be preferable to dozens of flat variables.

---

# 296. Structured Config Security

Do not commit secret values simply because the format is YAML/JSON.

---

# 297. Configuration Files

Version-controlled configuration files are suitable for non-secret declarative settings.

---

# 298. Config File Schema

Structured config files SHOULD have schema validation.

---

# 299. Unsupported Fields

Unknown critical config-file fields SHOULD fail or warn explicitly.

---

# 300. Comments

Configuration documentation/comments should explain:

```text
why
units
constraints
```

rather than restating the name.

---

# 301. Configuration Defaults in Code

Defaults SHOULD be declared centrally with the configuration schema.

Avoid defaults scattered across consumers.

---

# 302. One Parse Point

Environment/raw configuration should be parsed once near application startup.

Application modules consume typed configuration.

---

# 303. Good Architecture

```text
Raw environment
↓
Configuration parser
↓
Validated typed Config
↓
Application
```

---

# 304. Bad Architecture

```text
Feature A → process.env.X
Feature B → process.env.X
Feature C → process.env.Y
```

throughout the codebase.

---

# 305. Dependency Injection

Typed configuration MAY be injected into modules/services to improve:

```text
testing
clarity
dependency ownership
```

---

# 306. Server/Client Config Boundary

Maintain separate typed models for:

```text
server configuration
public client configuration
```

where applicable.

---

# 307. Public Config Allowlist

Only explicitly approved keys may cross into client-side configuration.

---

# 308. Config Serialization

Do not serialize the entire server config object to clients.

---

# 309. Environment Detection

Prefer canonical platform environment identity.

Do not infer production from:

```text
hostname contains "prod"
```

---

# 310. Hostname Is Not Environment Authority

Domains can change.

Explicit deployment metadata is safer.

---

# 311. Config Observability

Applications SHOULD expose safe signals about configuration state.

Examples:

```text
config revision
feature flag revision
secret version/reference
```

without secret values.

---

# 312. Configuration Change Metrics

High-risk runtime config systems MAY monitor:

```text
change rate
failed evaluations
propagation lag
```

---

# 313. Configuration Alerts

Alert when:

```text
required dynamic config unavailable
critical config invalid
secret near expiry
configuration drift detected
```

where action is required.

---

# 314. Secret Expiry Alerting

Certificates/credentials with expiry SHOULD alert sufficiently before expiration.

---

# 315. Secret Rotation Monitoring

Operators should know whether new versions have been adopted by workloads before revoking old versions.

---

# 316. Feature Flag Monitoring

Monitor rollout distribution and failures for critical flags.

---

# 317. Production Config Dashboard

Critical platforms MAY provide an operational view showing:

```text
deployment
config revision
feature changes
secret health
```

without revealing values.

---

# 318. Incident Investigation

During an incident inspect:

```text
recent deployments
config changes
secret rotation
feature flag changes
```

early.

---

# 319. Config Changes as Change Events

Observability SHOULD capture production config-change markers.

---

# 320. Configuration Incident

A misconfiguration causing user impact is a production incident just like a bad code deployment.

---

# 321. Rollback

Every high-impact config change should have a known rollback path.

---

# 322. Last Known Good Config

Dynamic systems SHOULD preserve previous known-good versions.

---

# 323. Configuration Freeze

During severe incidents or critical business periods, organizations MAY temporarily restrict nonessential config changes.

---

# 324. Change Freeze Does Not Replace Review

Routine review discipline still applies.

---

# 325. Configuration Access Control

Who can:

```text
read
write
approve
deploy
```

configuration should be deliberately controlled.

---

# 326. Read vs Write

Production configuration read access does not automatically imply write access.

---

# 327. Secret Read vs Use

Prefer architectures where workloads can use secrets without humans routinely retrieving plaintext values.

---

# 328. Four-Eyes Review

High-risk configuration changes MAY require approval by another authorized person.

---

# 329. Break-Glass Config Changes

Emergency privileges should follow Security and Authentication standards.

---

# 330. Audit Administrative Access

Sensitive config/secret-management systems SHOULD record administrative actions.

---

# 331. Production Console Access

Direct cloud/provider console changes SHOULD be restricted.

Prefer managed pipelines/IaC.

---

# 332. Console Changes

Where manual console changes occur, reconcile them into source-controlled configuration.

---

# 333. Config Review Checklist

Before adding configuration:

```text
□ Does this legitimately vary by deployment?
□ Could this remain code?
□ Is it secret?
□ What is its type?
□ What is its unit?
□ Is it required?
□ What is its safe default?
□ Who owns it?
□ Build-time or runtime?
□ Does changing it require restart?
□ What happens if invalid?
□ Is documentation updated?
```

---

# 334. Environment Checklist

```text
□ Purpose defined
□ Production isolated
□ Database isolated
□ Storage isolated
□ Credentials isolated
□ Provider modes isolated
□ Runtime versions aligned
□ Deployment mechanism aligned
□ Data policy appropriate
□ Access controls appropriate
```

---

# 335. `.env` Checklist

```text
□ Local use only where appropriate
□ Ignored from Git
□ .env.example exists
□ No real secrets in example
□ Loading precedence documented
□ Variables validated by application
□ Production does not depend on checked-in .env secrets
```

---

# 336. Secret Management Checklist

```text
□ Secret manager used
□ No source-code secret
□ Environment-specific
□ Least privilege
□ Owner
□ Consumer known
□ Rotation possible
□ Expiry monitored
□ Audit available
□ CI exposure minimized
□ Redaction tested
□ Revocation process known
```

---

# 337. Feature Flag Checklist

```text
□ Clear purpose
□ Correct category
□ Owner
□ Safe default
□ Server/client evaluation defined
□ Security not delegated to flag
□ Failure behavior defined
□ On/off tested
□ Rollout observed
□ Expiry/removal defined
```

---

# 338. Dynamic Config Checklist

```text
□ Schema validated
□ Bounds validated
□ Versioned
□ Owner
□ Change audited
□ Propagation understood
□ Last-known-good behavior
□ Rollback available
□ Outage behavior defined
□ Metrics/alerts present where critical
```

---

# 339. Production Change Checklist

```text
□ Exact environment confirmed
□ Change reviewed
□ Diff understood
□ Blast radius understood
□ Secrets not exposed
□ Rollback available
□ Monitoring ready
□ Change recorded
□ Post-change verification completed
```

---

# 340. Environment Parity Checklist

```text
□ Same application artifact model
□ Same runtime family/version
□ Same DB engine where behavior matters
□ Same migration mechanism
□ Same config schema
□ Same auth architecture
□ Same deployment mechanism
□ Intentional differences documented
```

---

# 341. CI/CD Configuration Checklist

```text
□ Pipeline version-controlled
□ Production environment protected
□ Non-prod jobs lack prod secrets
□ Fork/PR secrets protected
□ Artifact reproducible
□ Config validated before deployment
□ Artifact/version identifiable
□ Config changes auditable
```

---

# 342. Definition of Done — New Configuration

A new configuration item is complete when:

```text
✓ Need for external config justified
✓ Canonical name chosen
✓ Type defined
✓ Validation implemented
✓ Safe default/required status defined
✓ Secret classification known
✓ Owner assigned
✓ Build/runtime semantics defined
✓ Example/documentation added
✓ Failure behavior tested
✓ Production deployment updated
```

---

# 343. Definition of Done — New Environment

A new environment is production-worthy when:

```text
✓ Purpose documented
✓ Isolation defined
✓ Identity/accounts isolated
✓ Secrets isolated
✓ Datastores isolated
✓ Deployment automated
✓ Configuration validated
✓ Monitoring available
✓ Cleanup/lifecycle defined
✓ Access ownership established
```

---

# 344. Definition of Done — New Feature Flag

```text
✓ Purpose/type documented
✓ Owner assigned
✓ Safe default defined
✓ Evaluation location defined
✓ Rollout plan defined
✓ Failure behavior defined
✓ Tests cover active branches
✓ Analytics/observability considered
✓ Cleanup date/condition defined
```

---

# 345. Definition of Done — Secret

```text
✓ Secret is not in source
✓ Stored in approved system
✓ Access least-privileged
✓ Production/non-prod separated
✓ Rotation supported
✓ Expiry monitored where applicable
✓ Logs/redaction safe
✓ Consumer documented
✓ Revocation procedure exists
```

---

# 346. Configuration Anti-Patterns

Avoid:

```text
if NODE_ENV === "production"
  enableFeature()
```

for ordinary product features.

Avoid:

```text
SECRET="abc123"
```

in source control.

Avoid:

```text
.env.production
```

committed with credentials.

Avoid:

```text
same DATABASE_URL
```

for staging and production.

Avoid:

```text
same API key
```

for local and production.

Avoid:

```text
process.env.*
```

throughout the application.

Avoid:

```text
Boolean(process.env.FLAG)
```

without explicit parsing.

Avoid:

```text
missing value
→ silently assume insecure default
```

Avoid:

```text
environment name controls ten unrelated behaviors
```

Avoid:

```text
production config edited directly in console forever
```

Avoid:

```text
manual emergency change never reconciled
```

Avoid:

```text
staging = production database with different frontend
```

Avoid:

```text
production secret available to every CI job
```

Avoid:

```text
secret value printed to troubleshoot
```

Avoid:

```text
feature flag = authorization
```

Avoid:

```text
release flag left forever
```

Avoid:

```text
hundreds of interacting flags
```

Avoid:

```text
remote config required synchronously for every request
```

Avoid:

```text
invalid runtime config replaces working config
```

Avoid:

```text
config changed
no audit
no rollback
```

Avoid:

```text
staging build tested
production rebuilt differently
```

Avoid:

```text
local development requires production credentials
```

Avoid:

```text
browser env variable treated as secret
```

Avoid:

```text
Kubernetes Secret exists
therefore secret is secure
```

Avoid:

```text
ConfigMap containing credentials
```

Avoid:

```text
configuration files nobody owns
```

Avoid:

```text
unknown configuration variables ignored forever
```

Avoid:

```text
production debugging mode enabled temporarily
and never disabled
```

---

# 347. AI Configuration Rules

AI coding agents MUST inspect the existing configuration schema before adding new configuration.

---

# 348. AI Code-vs-Config Rule

Before adding an environment variable, AI MUST ask conceptually:

```text
Does this genuinely vary between deployments?
```

If not, keep it in code.

---

# 349. AI Search-Before-Create Rule

AI SHOULD search for an existing:

```text
config key
configuration object
feature flag
secret reference
```

before creating another.

---

# 350. AI Typed-Config Rule

AI MUST use the canonical typed/validated configuration layer.

It MUST NOT scatter direct environment access across features.

---

# 351. AI Fail-Fast Rule

Required invalid configuration MUST fail startup clearly.

---

# 352. AI Safe-Default Rule

AI MUST NOT invent insecure defaults for missing security-sensitive config.

---

# 353. AI Secret Rule

AI MUST NOT place credentials in:

```text
source
.env.example
tests
Dockerfile
frontend config
documentation
```

---

# 354. AI Public-Config Rule

AI MUST treat any browser-delivered environment/config value as public.

---

# 355. AI `.env` Rule

AI MAY use ignored local `.env` files for developer convenience but MUST NOT treat them as production secret management.

---

# 356. AI Feature-Flag Rule

AI MUST NOT use feature flags as authorization.

---

# 357. AI Flag-Lifecycle Rule

When creating a temporary release flag, AI SHOULD define its cleanup condition.

---

# 358. AI Environment Rule

AI MUST NOT add production-specific business behavior through environment-name checks if an explicit feature/config value is more appropriate.

---

# 359. AI Database Rule

AI MUST NOT point local/test/staging configuration to production databases as a shortcut.

---

# 360. AI Provider Rule

AI SHOULD use provider sandbox/test modes in non-production.

---

# 361. AI Logging Rule

AI MUST NOT print the complete configuration object if it may contain secrets.

---

# 362. AI CI Rule

AI MUST NOT expose production secrets to generic PR/test workflows.

---

# 363. AI Container Rule

AI MUST NOT bake runtime credentials into container images.

---

# 364. AI Kubernetes Rule

AI MUST distinguish nonsecret ConfigMap-style configuration from secret material.

---

# 365. AI Dynamic-Config Rule

When implementing dynamic configuration, AI MUST define:

```text
validation
versioning
failure behavior
last-known-good behavior
rollback
```

---

# 366. AI Config-Migration Rule

AI SHOULD maintain backward compatibility during config-key migrations when rolling deployment requires it.

---

# 367. AI Observability Rule

High-impact runtime config/flag changes SHOULD remain observable and auditable.

---

# 368. AI Ownership Rule

New high-impact configuration SHOULD have an explicit owner documented in the appropriate registry.

---

# 369. AI Gold Rule

When uncertain:

```text
Code-owned stable behavior
>
Explicit typed configuration
>
Runtime dynamic configuration
>
Feature flag
>
Environment-name magic
```

and for credentials:

```text
Workload identity
>
Short-lived managed secret
>
Long-lived managed secret
>
Local environment secret
>
Hardcoded secret
```

---

# 370. Golden Configuration & Environment Rules

**1. Code defines behavior; configuration selects deployment-specific behavior.**

**2. Do not externalize values that do not need deployment variability.**

**3. Configuration, secrets, feature flags, and user settings are different concepts.**

**4. Production and non-production are isolated.**

**5. Production credentials are never reused in local, test, preview, or staging.**

**6. Production data is not an ordinary development dependency.**

**7. Use the same application artifact across promotion stages where practical.**

**8. Important runtime and database versions remain reasonably production-parallel.**

**9. Every configuration key has one authoritative source.**

**10. Configuration precedence is explicit.**

**11. Parse raw configuration once into a typed validated model.**

**12. Environment variables are untrusted strings until validated.**

**13. Critical invalid configuration fails fast.**

**14. Security-sensitive settings never silently fall back to insecure defaults.**

**15. `.env` is a local-development convenience, not a production secret manager.**

**16. `.env.example` contains names and safe examples, never real secrets.**

**17. Secrets never enter source control or immutable application artifacts.**

**18. Production secrets live in an approved secret-management system.**

**19. Prefer short-lived workload identity over static credentials where possible.**

**20. Secrets are environment-specific, least-privileged, rotatable, and owned.**

**21. CI jobs receive only the secrets they actually require.**

**22. Untrusted pull requests never receive production secrets.**

**23. Browser configuration is public.**

**24. Build-time and runtime configuration are explicitly distinguished.**

**25. Configuration changes are treated as production changes.**

**26. Important production config changes are reviewed and auditable.**

**27. Manual emergency changes are reconciled or reverted.**

**28. Configuration drift is detected and removed.**

**29. Feature flags do not replace authorization.**

**30. Feature flags have an owner, safe default, and lifecycle.**

**31. Temporary rollout flags are removed after rollout.**

**32. Dynamic configuration validates new values before activation.**

**33. Invalid dynamic config never replaces the last known good configuration.**

**34. Remote configuration outages have defined safe behavior.**

**35. Environment checks are reserved for genuine environment semantics.**

**36. External provider test/sandbox modes are used outside production.**

**37. Non-production notification systems cannot accidentally contact real customers.**

**38. Configuration and secret health are observable without revealing secret values.**

**39. Disaster recovery includes configuration and secret dependencies, not only data.**

**40. An environment should be reproducible from declared automation rather than undocumented manual state.**

---

# 371. Canonical Configuration & Environment Standard

The organizational standard is:

> **Application behavior is divided deliberately between stable code and deployment-specific configuration. Values vary by deployment only where real operational variability exists; stable domain rules remain version-controlled code. Raw configuration is read through one canonical layer, validated into typed values before the application becomes ready, and consumed through explicit configuration interfaces rather than scattered environment-variable access. Invalid critical configuration fails fast, while security-sensitive configuration uses conservative defaults or requires explicit values.**

> **Local, test, preview, development, staging, and production environments exist only for defined purposes and remain appropriately isolated. Production databases, storage, queues, credentials, customer data, provider accounts, and other sensitive resources are not reused as ordinary non-production dependencies. Important production characteristics—runtime, database technology, deployment mechanism, migrations, configuration schema, and application artifact—remain sufficiently parallel across pre-production environments to provide meaningful verification. The preferred promotion model builds an immutable artifact once and deploys that same artifact with environment-specific configuration.**

> **Secrets are not ordinary configuration. Production secrets are stored in approved secret-management infrastructure, separated by environment, restricted through least privilege, rotated and revoked through known workflows, prevented from entering source control, images, logs, frontend bundles, documentation, and untrusted CI jobs, and replaced with short-lived workload identities where practical. `.env` files are a local-development convenience only and never constitute the production secret-management architecture.**

> **Feature flags and dynamic configuration are governed operational systems. Flags have explicit purpose, type, owner, safe default, targeting semantics, failure behavior, tests, and removal lifecycle; they never substitute for authorization or authoritative entitlement. Dynamic configuration is typed, bounded, versioned, auditable, rollback-capable, and does not replace a known-good value until validation succeeds. Remote configuration failure has a defined safe operating mode.**

> **Production configuration changes receive engineering discipline comparable to code changes: ownership, review, audit history, blast-radius assessment, rollout, monitoring, and rollback. Non-secret deployment and infrastructure configuration is version-controlled where practical; emergency manual changes are temporary and reconciled into the canonical source of truth. Configuration drift, expired credentials, missing values, invalid configuration, unsafe environment combinations, and failed propagation are detectable operational conditions.**

A production-grade configuration architecture should make it easy to answer:

```text
What configuration does this application require?
Which values are stable code rather than config?
Which configuration varies by deployment?
Which values are secrets?
Which values are exposed to the browser?
Which values are build-time?
Which are runtime?
Which can change dynamically?
What validates each value?
What happens if it is missing?
What happens if it is malformed?
What is the safe default?
Who owns it?
Where is its source of truth?
Which environments define it?
How are production and staging isolated?
How is a secret rotated?
Can CI expose the secret?
Which feature flags are temporary?
When will each flag be removed?
How are config changes audited?
How do we roll back?
Can an environment be rebuilt from declared automation?
```

If those questions cannot be answered, configuration is acting as hidden application logic rather than a controlled deployment contract.

The foundational distinction is consistent with the Twelve-Factor configuration principle: deployment-varying configuration should remain separate from application code, and independent config values scale better than encoding many behaviors into named environment groups. citeturn349383search0

For secrets, the stronger rule above deliberately goes beyond “put it in an environment variable.” OWASP recommends centralized secret management, tight access control, auditing and rotation, and specifically notes that environment variables can leak through processes, logs or dumps; short-lived/managed credentials should be preferred where the platform supports them. citeturn349383search1 Kubernetes makes the same distinction operationally: ConfigMaps are for **non-confidential** configuration, while Secrets are intended for confidential values—but Kubernetes also warns that Secret objects still require encryption-at-rest and least-privilege RBAC rather than being assumed secure automatically. citeturn349383search2turn349383search3

In the master hierarchy, this sits naturally after Privacy/Data Governance and before dependency/repository/delivery concerns:

**… → Observability → Analytics → Privacy & Data Governance → Configuration & Environments → Dependencies → Git & Repository → CI/CD → Infrastructure & Deployment → Backup & Disaster Recovery → Documentation → Governance.**
