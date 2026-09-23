---
id: "authentication-authorization"
title: "Authentication & Authorization Guidelines — Gold Standard 2026"
domain: "security"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["security", "authentication", "authorization"]
applies_to: ["security"]
related: []
legacy_number: 15
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 73385
provenance: baseline

---

For the **2026 baseline**, this standard should explicitly align with **NIST SP 800-63-4 / 800-63B-4** for authenticator management, **RFC 9700** for OAuth security, **OpenID Connect Core** for federated authentication, and **WebAuthn Level 3**, which became a W3C Recommendation on **August 25, 2026**. citeturn161761search4turn161761search1turn171750search0turn171750search6turn171750search1

# Authentication & Authorization Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical standard for:

- identity;
- authentication;
- authorization;
- sessions;
- passwords;
- passkeys;
- WebAuthn;
- MFA;
- OAuth;
- OpenID Connect;
- federation;
- roles;
- permissions;
- RBAC;
- ABAC;
- ReBAC;
- multi-tenancy;
- service identities;
- impersonation;
- account recovery;
- privileged access;
- credential lifecycle;
- audit;
- authentication monitoring.

The objectives are to ensure that systems can reliably answer:

```text
Who is this?
How was their identity established?
How strongly were they authenticated?
What are they allowed to do?
To which resource?
Within which tenant?
Under which conditions?
For how long?
How can access be revoked?
How can the decision be audited?
```

The core principle is:

> **Authentication establishes identity. Authorization determines access. Every protected action requires both an authenticated context where required and a server-side authorization decision for the specific action and resource.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented reason exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
Threat model
Affected identities/resources
Compensating control
Owner
Review date
```

---

# 3. Authentication vs Authorization

Never combine these concepts mentally or architecturally.

```text
Authentication
→ Who are you?

Authorization
→ May you perform this action?
```

A valid login does not imply permission to every resource.

---

# 4. Identity Architecture

An identity system SHOULD distinguish:

```text
Human identity
Service/workload identity
Session
Credential/authenticator
Membership
Role
Permission
Tenant
```

Do not represent all of these as one generic `user` object.

---

# 5. Identity Source of Truth

Every identity has one authoritative identity record.

Other systems may hold:

```text
profile projections
session representations
claims
cached permission data
```

but must not become competing identity authorities accidentally.

---

# 6. Internal User ID

Every user SHOULD have a stable internal identifier.

Prefer an immutable generated identifier.

Do not use mutable attributes such as:

```text
email
username
display name
phone number
```

as the permanent internal primary identity.

---

# 7. Login Identifier vs Identity

A user may authenticate using:

```text
email
username
phone
passkey
federated identity
```

These are login mechanisms or identifiers.

They are not necessarily the canonical internal identity.

---

# 8. Email Address

Email is:

```text
contact attribute
+
potential login identifier
```

not inherently permanent identity.

Users may change email.

---

# 9. Email Verification

If email ownership matters, verify it before relying on it.

Do not infer ownership merely because:

```text
user entered address
```

---

# 10. Account Lifecycle

Identity lifecycle SHOULD include:

```text
Create
Verify
Activate
Authenticate
Manage credentials
Suspend
Disable
Recover
Delete
Archive where applicable
```

---

# 11. Account Creation

Account creation MUST validate applicable:

```text
identity attributes
tenant membership
invitation
credential setup
policy
```

server-side.

---

# 12. Registration Enumeration

Registration and recovery workflows SHOULD avoid unnecessary disclosure of whether an identity already exists.

Balance security with usable account recovery.

---

# 13. Account Activation

Activation SHOULD be explicit when approval, email verification, or organizational provisioning is required.

Do not silently grant access before required checks complete.

---

# 14. Account Suspension

Suspension should prevent future authenticated access while preserving required records.

Define whether suspension:

```text
revokes active sessions
revokes tokens
blocks API keys
blocks service delegation
```

---

# 15. Account Disablement

High-risk disable actions SHOULD immediately invalidate applicable active credentials/sessions.

---

# 16. Account Deletion

Deletion must coordinate:

```text
sessions
authenticators
OAuth grants
API keys
memberships
personal data
audit requirements
```

according to retention policy.

---

# 17. Authentication Architecture

Prefer established authentication providers, protocols, and libraries over custom cryptographic authentication implementations.

Do not implement custom authentication protocols where mature standards exist.

---

# 18. Authentication Methods

Supported methods MAY include:

```text
Passkey / WebAuthn
Password + MFA
Federated OIDC
Enterprise federation
Hardware security key
Other approved cryptographic authenticators
```

---

# 19. Authentication Method Preference

Preferred order for high-assurance modern applications:

```text
Phishing-resistant cryptographic authentication
↓
Strong MFA
↓
Password authentication
```

Password-only authentication SHOULD NOT be the preferred option for privileged/high-risk access.

---

# 20. Passkeys

Passkeys SHOULD be strongly considered as a primary authentication option.

Passkeys use WebAuthn public-key credentials and avoid sharing a reusable password secret with the server.

---

# 21. WebAuthn

WebAuthn is the canonical web standard for public-key authentication.

Applications SHOULD use established WebAuthn libraries rather than implementing the protocol from primitives.

---

# 22. WebAuthn Relying Party

The Relying Party configuration MUST be intentional.

Understand:

```text
RP ID
origin
credential scope
domain architecture
```

before deployment.

Changing domain architecture later can affect credentials.

---

# 23. Passkey Registration

Passkey registration MUST occur in a sufficiently authenticated account context.

Do not allow an attacker with a weak temporary session to silently register a permanent strong authenticator.

---

# 24. Authenticator Binding

Adding an authenticator is a security-sensitive operation.

Consider requiring:

```text
recent authentication
existing strong authenticator
additional verification
```

according to account risk.

---

# 25. Multiple Authenticators

Users SHOULD be able to register multiple authenticators where product/security requirements permit.

This improves recoverability.

---

# 26. Authenticator Naming

Users MAY name authenticators for recognition.

Example:

```text
MacBook passkey
Office security key
```

Do not expose unnecessary device fingerprinting details.

---

# 27. Authenticator Removal

Removing an authenticator requires authorization and SHOULD require recent authentication for sensitive accounts.

---

# 28. Last Strong Authenticator

Do not casually allow users to remove their last recovery-capable strong authenticator without explaining the resulting recovery state.

---

# 29. Synced Passkeys

Syncable passkeys MAY be supported according to organizational assurance requirements.

Do not assume synced and device-bound credentials have identical assurance properties in every threat model.

---

# 30. Device-Bound Credentials

High-assurance environments MAY require device-bound hardware-backed credentials.

Choose based on actual assurance requirement.

---

# 31. Attestation

WebAuthn attestation SHOULD only be required when a concrete policy requires authenticator provenance.

Unnecessary attestation can increase:

```text
privacy impact
compatibility friction
operational complexity
```

---

# 32. User Verification

Configure WebAuthn user-verification requirements according to security context.

Do not request weaker behavior solely for convenience on privileged operations.

---

# 33. Phishing Resistance

High-value administrative and sensitive operations SHOULD prefer phishing-resistant authenticators.

Examples:

```text
passkeys
FIDO security keys
appropriate certificate-backed authentication
```

---

# 34. Passwords

Passwords MAY remain supported where required.

If supported, they MUST follow modern password guidance.

---

# 35. Password Length

Organizational baseline:

```text
Single-factor password
→ minimum 15 characters

Password used as part of MFA
→ minimum 8 characters

Supported maximum
→ at least 64 characters
```

Do not unnecessarily truncate longer passwords.

---

# 36. Password Composition

Do not require arbitrary composition rules such as:

```text
1 uppercase
1 lowercase
1 number
1 symbol
```

as the default password policy.

Favor length and compromised-password screening.

---

# 37. Password Rotation

Do not require periodic password changes merely because time has passed.

Require changes when evidence indicates compromise or policy/risk demands it.

---

# 38. Compromised Password Blocklist

New and changed passwords MUST be checked against a blocklist of known/common/compromised choices.

Reject compromised values.

---

# 39. Password Hints

Do not provide publicly retrievable password hints.

---

# 40. Security Questions

Do not use knowledge-based questions such as:

```text
mother's maiden name
first school
first pet
```

as password recovery authenticators.

---

# 41. Password Managers

Password fields MUST support:

```text
password managers
autofill
copy
paste
```

Do not deliberately disable these capabilities.

---

# 42. Password Visibility

A show/hide control MAY improve usability.

It must remain accessible.

---

# 43. Password Hashing

Passwords MUST be stored using an approved slow password-hashing function.

Preferred organizational baseline:

```text
Argon2id
```

with parameters periodically reviewed against current hardware and threat models.

---

# 44. Password Storage

Never store passwords:

```text
plaintext
reversibly encrypted
logs
analytics
debug output
```

---

# 45. Salt

Password hashes MUST use appropriate unique salts according to the selected hashing scheme.

---

# 46. Pepper

A separately protected server-side pepper MAY provide additional defense where architecture supports it.

Do not store it beside the password database.

---

# 47. Hash Migration

Password verification architecture SHOULD allow transparent migration to stronger parameters/algorithms after successful authentication.

---

# 48. Password Reset

Password reset is account recovery.

It MUST be treated as a high-risk authentication flow.

---

# 49. Password Change

An authenticated password change SHOULD normally require:

```text
current/recent authentication
```

according to session assurance.

---

# 50. Password Change Consequences

After password change, determine whether to:

```text
rotate session
revoke other sessions
revoke reset tokens
notify user
```

based on threat model.

---

# 51. Multi-Factor Authentication

MFA requires multiple distinct authentication factors.

Two secrets of the same factor category do not automatically constitute MFA.

---

# 52. Factor Categories

Conceptually:

```text
Something you know
Something you have
Something you are
```

---

# 53. MFA Requirement

MFA SHOULD be mandatory for:

```text
administrators
privileged staff
production access
high-value accounts
security-sensitive workflows
```

and strongly considered for ordinary accounts.

---

# 54. MFA Enrollment

MFA enrollment is a sensitive operation.

Require an appropriate authenticated session.

---

# 55. MFA Factor Hierarchy

Prefer:

```text
Phishing-resistant cryptographic factor
```

over:

```text
OTP
```

where practical.

---

# 56. TOTP

Time-based OTP MAY be supported as a fallback MFA factor.

Protect:

```text
seed
enrollment QR
backup process
```

carefully.

---

# 57. TOTP Secret Storage

TOTP secrets require confidentiality because the server must generally be able to generate/verify OTP values from the secret.

Protect them as sensitive credential material.

---

# 58. SMS OTP

SMS-based authentication SHOULD generally be treated as a weaker fallback rather than the strongest available authentication mechanism.

Consider:

```text
SIM swap
number reassignment
telecom interception
```

risks.

---

# 59. Email OTP

Email-based codes depend on the security of the email account.

Treat them as lower assurance than phishing-resistant cryptographic credentials.

---

# 60. OTP Lifetime

OTP values MUST have:

```text
short expiry
attempt limits
single-use semantics where applicable
```

---

# 61. OTP Rate Limiting

Rate-limit OTP verification.

Do not allow unlimited brute-force attempts.

---

# 62. OTP Replay

Successfully used one-time codes MUST NOT remain valid.

---

# 63. Recovery Codes

Recovery codes SHOULD be:

```text
high entropy
single-use
stored securely
```

---

# 64. Recovery Code Display

Show recovery codes clearly once during generation and provide an intentional regeneration mechanism.

---

# 65. Recovery Code Storage

Store recovery codes using one-way verification where possible.

Do not store plaintext recovery codes unnecessarily.

---

# 66. Recovery Code Regeneration

Generating a new recovery-code set SHOULD invalidate previous unused codes.

---

# 67. MFA Reset

MFA reset is equivalent to weakening/replacing account authentication.

Apply account-recovery-level security.

---

# 68. Step-Up Authentication

Sensitive operations MAY require stronger or more recent authentication than ordinary browsing.

Examples:

```text
change email
change password
disable MFA
create API key
export sensitive data
transfer ownership
impersonate user
```

---

# 69. Recent Authentication

Define maximum authentication age for sensitive operations where relevant.

Example:

```text
authenticated strongly within recent period
```

rather than merely possessing a weeks-old session.

---

# 70. Risk-Based Authentication

Risk signals MAY influence authentication requirements.

Possible signals:

```text
new device
unusual geography
impossible travel
IP reputation
high-risk operation
suspicious account activity
```

---

# 71. Risk Signals Are Advisory

Risk signals can produce false positives.

Do not use fragile signals such as IP address alone as permanent identity proof.

---

# 72. Session Architecture

A session represents authenticated continuity after login.

It is not the identity itself.

---

# 73. Session Identifier

Session identifiers MUST be:

```text
unpredictable
high entropy
opaque where practical
```

and MUST NOT embed secrets unnecessarily.

---

# 74. Session Storage

For first-party web applications, server-managed sessions with opaque browser cookies are the preferred default where architecture allows.

---

# 75. Browser Session Cookie

Session cookies SHOULD use strong attributes such as:

```text
Secure
HttpOnly
SameSite
```

according to application requirements.

---

# 76. Host-Scoped Cookies

Prefer host-scoped session cookies.

Avoid broad parent-domain cookies unless cross-subdomain sharing is genuinely required.

---

# 77. Cookie Path

Use the narrowest practical cookie scope while maintaining application functionality.

For many session cookies:

```text
Path=/
```

is appropriate.

---

# 78. Secure

Authentication/session cookies MUST use `Secure` in production.

---

# 79. HttpOnly

Authentication/session cookies SHOULD use `HttpOnly` where JavaScript does not legitimately need direct access.

---

# 80. SameSite

Configure `SameSite` deliberately.

Do not rely solely on browser defaults.

`SameSite` is defense in depth and does not replace complete CSRF architecture where CSRF is applicable.

---

# 81. Session IDs in URLs

Session IDs MUST NOT be transmitted through:

```text
URL path
query string
fragment
```

because URLs commonly leak to logs, browser history, referrers, and analytics.

---

# 82. Session Fixation

Regenerate/rotate session identity after authentication and meaningful privilege changes.

---

# 83. Privilege Change

Consider session rotation after:

```text
login
role escalation
password change
MFA change
impersonation transition
```

---

# 84. Session Expiration

Sessions SHOULD have:

```text
idle timeout
absolute lifetime
```

appropriate to application risk.

---

# 85. Remember Me

Persistent-login functionality MUST be explicitly designed.

Do not implement:

```text
remember me
→ session never expires
```

---

# 86. Persistent Login

Long-lived login mechanisms SHOULD use revocable credentials/session records with safe rotation rather than endlessly extending one static bearer value.

---

# 87. Logout

Logout SHOULD invalidate the server-side session or equivalent credential state where architecture permits.

Deleting the browser cookie alone may be insufficient.

---

# 88. Logout Everywhere

Users SHOULD be able to revoke other active sessions for applications where account compromise is meaningful.

---

# 89. Session Inventory

Security-sensitive applications SHOULD provide users visibility into active sessions/devices where useful.

Possible information:

```text
approximate device
creation time
last activity
approximate location
```

Avoid false precision.

---

# 90. Session Revocation

Revocation must take effect within a documented bounded period.

---

# 91. Session Store

Server-side session records SHOULD permit:

```text
revocation
expiration
user association
tenant/context association where required
```

---

# 92. Session Data Minimization

Do not place large or rapidly changing domain data directly in session records/cookies without reason.

---

# 93. Client-Side Session Objects

Signed/encrypted client-side session objects MAY be used, but understand that revocation and immediate state updates become harder.

---

# 94. Stateless JWT Session Anti-Pattern

Do not choose self-contained JWT sessions solely to avoid server storage.

Consider:

```text
revocation
permission changes
user disablement
token leakage
size
rotation
```

first.

---

# 95. JWT Is a Format

JWT is not automatically:

```text
authentication
authorization
secure session management
```

It is a token format.

---

# 96. JWT Validation

When consuming JWTs, validate applicable:

```text
signature
issuer
audience
expiry
not-before
algorithm expectations
token type
```

according to protocol.

---

# 97. Algorithm Pinning

Do not accept arbitrary token algorithms determined solely by untrusted token metadata.

Use expected algorithms configured by the verifier.

---

# 98. Token Audience

Access tokens SHOULD be restricted to intended resource servers.

A token for service A must not automatically grant access to service B.

---

# 99. Token Scope

Token scope SHOULD follow least privilege.

Avoid:

```text
scope=everything
```

as a normal model.

---

# 100. Token Lifetime

Bearer-token lifetime should be minimized according to operational requirements.

The longer the bearer token lives, the longer a stolen token can potentially be useful.

---

# 101. Refresh Tokens

Refresh tokens are high-value credentials.

Protect them more strongly than ordinary short-lived access tokens.

---

# 102. Refresh-Token Rotation

Public/browser/native clients SHOULD use appropriate refresh-token replay protections such as rotation or sender-constrained mechanisms where supported.

---

# 103. Refresh Token Revocation

Refresh tokens SHOULD be revocable.

Consider revocation after:

```text
logout
password compromise
account disable
credential reset
detected replay
```

---

# 104. Browser Token Storage

Avoid exposing OAuth access and refresh tokens to browser JavaScript when a secure server-side architecture can avoid it.

---

# 105. BFF Pattern

For sensitive browser applications using OAuth, a Backend-for-Frontend pattern SHOULD be strongly considered.

Conceptually:

```text
Browser
↓ secure session cookie
BFF
↓ access token
Resource server
```

Tokens remain on the server side rather than being directly exposed to browser JavaScript.

---

# 106. First-Party Web Apps

A first-party frontend and backend sharing a suitable application domain often do not require OAuth between browser and its own backend.

A conventional protected session may be simpler.

---

# 107. OAuth Purpose

OAuth is primarily an authorization framework.

Do not use an OAuth access token as proof of end-user authentication unless the relevant protocol explicitly defines that behavior.

---

# 108. OpenID Connect

Use OpenID Connect when authentication/federated identity is required on top of OAuth.

OIDC provides standardized identity assertions such as ID Tokens.

---

# 109. ID Token vs Access Token

Distinguish:

```text
ID Token
→ information about authentication / identity for the client

Access Token
→ authorization credential for a resource server
```

Do not send ID Tokens as generic API access tokens.

---

# 110. Authorization Code Flow

Modern browser/native OAuth clients SHOULD use the Authorization Code flow with appropriate security extensions.

---

# 111. PKCE

Public OAuth clients MUST use PKCE.

Use:

```text
S256
```

rather than weaker challenge methods.

---

# 112. Implicit Flow

New applications MUST NOT use OAuth Implicit flow for browser access-token acquisition.

Use Authorization Code-based flows instead.

---

# 113. Resource Owner Password Grant

The Resource Owner Password Credentials grant MUST NOT be used.

Do not collect a user's IdP password inside an OAuth client.

---

# 114. Redirect URIs

OAuth redirect URIs MUST be registered and validated strictly.

Avoid wildcard redirect behavior.

---

# 115. Open Redirects

Authentication endpoints MUST NOT contain unrestricted redirect behavior.

Validate:

```text
returnTo
next
redirect
redirectUri
```

against approved destinations.

---

# 116. OAuth State

Use protocol-required request correlation and CSRF protections correctly.

Do not invent substitutes casually.

---

# 117. OIDC Nonce

Use and validate `nonce` where the OIDC flow requires it.

---

# 118. Discovery

OIDC/OAuth discovery metadata SHOULD come from trusted configured issuers.

Do not accept arbitrary attacker-controlled discovery endpoints.

---

# 119. Issuer Validation

Federated tokens/assertions MUST be validated against the exact expected issuer.

---

# 120. Audience Validation

Validate intended audience/client/resource.

A correctly signed token intended for another service is not necessarily valid for yours.

---

# 121. Federation

Federated authentication delegates identity authentication to an Identity Provider.

Authorization remains the application's responsibility.

---

# 122. Enterprise SSO

Enterprise SSO MAY use:

```text
OIDC
SAML
```

according to ecosystem requirements.

OIDC SHOULD generally be preferred for modern application integrations where both are practical.

---

# 123. Federation Account Linking

Federated identities must be linked to internal users deliberately.

Do not automatically merge accounts based solely on unverified or ambiguous attributes.

---

# 124. Subject Identifier

Use stable provider identity such as an issuer + subject combination.

Do not assume email alone uniquely identifies a federated account forever.

---

# 125. Email Claim

Email claims require appropriate verification semantics before being trusted as proof of email control.

---

# 126. Federation Domain Restrictions

Enterprise domain restrictions must be enforced against trusted identity-provider claims/configuration, not user-entered email text.

---

# 127. Just-in-Time Provisioning

JIT provisioning MAY create internal users during first federated login.

It MUST still enforce:

```text
allowed tenant
allowed organization
role/default permissions
account lifecycle policy
```

---

# 128. SCIM / Provisioning

Enterprise user provisioning MAY use SCIM or equivalent lifecycle systems.

Authentication federation and user provisioning are different concerns.

---

# 129. Deprovisioning

When an enterprise user is removed upstream, access SHOULD be revoked according to synchronization requirements.

Do not leave indefinite orphaned access.

---

# 130. Authorization Principle

Authorization MUST be:

```text
server-side
deny-by-default
resource-aware
action-aware
tenant-aware
```

---

# 131. Deny by Default

If no rule explicitly grants access:

```text
DENY
```

---

# 132. Authorization Every Request

Every protected request/action MUST perform authorization at an appropriate trusted layer.

Do not assume:

```text
previous page checked
middleware checked login
button was hidden
```

means resource access is authorized.

---

# 133. Client Authorization

Client-side authorization is for UX only.

Example:

```text
hide Delete button
```

may improve usability.

The server must still independently reject unauthorized deletion.

---

# 134. Object-Level Authorization

Always ask:

```text
Can principal P perform action A on resource R?
```

not merely:

```text
Is P authenticated?
```

---

# 135. Function-Level Authorization

Privileged functionality requires explicit authorization.

Examples:

```text
export
approve
delete
impersonate
manage billing
change roles
```

---

# 136. Field-Level Authorization

Some operations require authorization at field level.

Example:

```text
member
→ update display name

admin
→ update role
```

Do not expose privileged fields through a generic update payload.

---

# 137. Collection Authorization

List/search endpoints MUST restrict which records are visible.

Do not retrieve all data then hide unauthorized rows client-side.

---

# 138. Search Authorization

Search results must use the same access-control semantics as direct resource access.

---

# 139. Export Authorization

Exports can reveal far more information than individual UI pages.

Treat export permissions separately where needed.

---

# 140. Bulk Authorization

Bulk operations MUST authorize every affected object or operate within a rigorously authorized scope.

---

# 141. Role-Based Access Control

RBAC assigns permissions through roles.

Conceptually:

```text
User
↓
Role
↓
Permissions
```

---

# 142. Good RBAC

Example:

```text
Owner
Admin
Member
Viewer
```

where roles represent stable product concepts.

---

# 143. Avoid Role Explosion

Do not create:

```text
BillingAdmin
BillingAdminNoExport
BillingAdminWithReports
BillingAdminWithReportsButNoDelete
...
```

until roles become impossible to reason about.

Use attributes/permissions where needed.

---

# 144. Roles Are Bundles

A role SHOULD usually represent a named bundle of permissions.

Authorization logic SHOULD ultimately reason about capabilities/actions.

---

# 145. Hardcoded Role Checks

Avoid widespread code such as:

```text
if role === "admin"
```

when the actual business requirement is:

```text
canManageBilling
```

---

# 146. Permission Vocabulary

Permissions SHOULD be semantic.

Good:

```text
projects.read
projects.create
projects.update
projects.delete

members.invite
members.remove

billing.manage
```

---

# 147. Permission Granularity

Permissions should be granular enough to express real policy but not so granular that policy becomes incomprehensible.

---

# 148. Permission Stability

Permission identifiers become security contracts.

Rename/remove them deliberately.

---

# 149. Permission Matrix

Every significant application SHOULD maintain a clear matrix.

Example:

| Capability | Owner | Admin | Member | Viewer |
|---|---:|---:|---:|---:|
| View project | ✓ | ✓ | ✓ | ✓ |
| Create project | ✓ | ✓ | ✓ | — |
| Delete project | ✓ | ✓ | — | — |
| Manage billing | ✓ | — | — | — |
| Transfer ownership | ✓ | — | — | — |

The authoritative implementation may be code/policy rather than this documentation table, but the intended model should remain reviewable.

---

# 150. Permission Matrix Scope

Matrices SHOULD identify:

```text
role
resource
action
conditions
```

where necessary.

---

# 151. ABAC

Attribute-Based Access Control evaluates attributes such as:

```text
user department
resource classification
tenant
region
subscription
time
device posture
```

---

# 152. When to Use ABAC

Use ABAC when authorization depends materially on dynamic contextual attributes that cannot be represented cleanly through stable roles.

---

# 153. ABAC Complexity

ABAC can become difficult to audit.

Policies must remain:

```text
testable
explainable
owned
```

---

# 154. ReBAC

Relationship-Based Access Control bases permission on relationships.

Examples:

```text
user owns document
user belongs to workspace
user manages team containing resource
document shared with group
```

---

# 155. When to Use ReBAC

ReBAC is useful for collaborative products with graph-like sharing relationships.

Examples:

```text
documents
projects
folders
organizations
repositories
```

---

# 156. Ownership Relationship

Do not reduce all authorization to role when the true rule is:

```text
creator/owner/member/shared-with
```

---

# 157. Hybrid Authorization

Real products commonly combine:

```text
RBAC
+
ABAC
+
ReBAC
```

Example:

```text
User is workspace Admin
AND
resource belongs to workspace
AND
resource classification permits action
```

---

# 158. Policy Layer

Complex authorization SHOULD have a canonical policy layer.

Examples conceptually:

```text
canReadProject()
canUpdateProject()
canInviteMember()
```

or a policy engine.

---

# 159. Policy Decision

A policy decision should accept enough context to answer correctly:

```text
Principal
Action
Resource
Tenant
Context
```

---

# 160. Policy Enforcement Point

Authorization must be enforced before the protected operation occurs.

Do not calculate policy only for UI decoration.

---

# 161. Centralized vs Distributed Policies

Centralize common policy semantics while keeping enforcement close to resources.

Avoid:

```text
one remote authorization service
```

becoming an unavailable single bottleneck unless architecture requires it.

---

# 162. Authorization Cache

Permission decisions MAY be cached only when invalidation semantics are understood.

Security-sensitive policy changes often require rapid invalidation.

---

# 163. Stale Authorization

Never knowingly allow long stale caches to preserve privileges after:

```text
role revoked
membership removed
account disabled
ownership transferred
```

without an accepted risk model.

---

# 164. Database Constraints

Database constraints can reinforce ownership/integrity but do not replace authorization logic.

---

# 165. Row-Level Security

Database Row-Level Security MAY provide defense in depth.

If used, test tenant isolation and policy configuration rigorously.

---

# 166. Tenant Identity

Every tenant-scoped request MUST establish a trusted tenant context.

---

# 167. Tenant IDs

A client-provided:

```text
workspaceId
tenantId
organizationId
```

is a resource selector.

It is not authorization proof.

---

# 168. Tenant Membership

Authorization SHOULD confirm:

```text
user
→ current active membership
→ target tenant
```

before tenant-scoped access.

---

# 169. Cross-Tenant Access

Explicitly test:

```text
Tenant A user
+
Tenant B resource ID
```

against:

```text
read
update
delete
export
search
files
jobs
API endpoints
```

---

# 170. Tenant-Scoped Permissions

Roles may differ by tenant.

Example:

```text
User X
Admin in Workspace A
Viewer in Workspace B
```

Do not store one global role if the product has tenant-scoped roles.

---

# 171. Global Roles

Global roles should be reserved for genuine platform-level capabilities.

Example:

```text
platform administrator
```

Keep these separate from tenant roles.

---

# 172. Platform Administrator

Platform administrators require extremely strong controls.

Consider:

```text
phishing-resistant MFA
restricted access path
audit
step-up
just-in-time privilege
```

---

# 173. Ownership Role

Tenant ownership may have special capabilities.

Examples:

```text
transfer ownership
delete tenant
manage billing owner
```

Do not treat ownership as merely another interchangeable label without considering invariants.

---

# 174. Last Owner

Prevent removal/demotion of the final required owner where business continuity requires an owner.

Enforce this server-side and transactionally.

---

# 175. Invitations

Invitations grant potential future membership.

Treat invitation tokens as credentials.

---

# 176. Invitation Token

Invitation tokens MUST be:

```text
unpredictable
time-limited where appropriate
single-purpose
revocable
```

---

# 177. Invitation Scope

Invitation should encode/associate authoritative:

```text
tenant
intended role
inviter
expiry
```

server-side.

---

# 178. Invitation Acceptance

Revalidate invitation status and policy at acceptance time.

Do not trust values supplied by the invitation acceptance client.

---

# 179. Role Assignment

Role changes require authorization distinct from ordinary profile editing.

---

# 180. Privilege Escalation Protection

A user MUST NOT be able to assign:

```text
role
permission
tenant
```

beyond the actor's delegation authority.

---

# 181. Self-Privilege Changes

Do not allow generic account-update endpoints to modify the caller's own privileged role unless explicitly intended and authorized.

---

# 182. Impersonation

Impersonation is a privileged support/admin capability where an operator temporarily acts in another user's context.

It requires explicit security architecture.

---

# 183. Impersonation Preconditions

Impersonation SHOULD require:

```text
privileged permission
strong authentication
recent authentication
business justification where appropriate
```

---

# 184. Impersonation Session

Impersonation SHOULD create a distinct session/context.

Do not silently replace the administrator identity.

---

# 185. Preserve Actor Identity

During impersonation, maintain:

```text
actual actor
impersonated subject
```

separately.

---

# 186. Impersonation Audit

Audit records MUST show both:

```text
Admin A
acting as
User B
```

---

# 187. Impersonation Banner

The UI MUST clearly indicate impersonation.

Example:

```text
You are viewing this account as Alice.
```

---

# 188. Exit Impersonation

Provide a clear, safe way to return to the operator's original session.

---

# 189. Impersonation Restrictions

Consider prohibiting especially sensitive operations during impersonation.

Examples:

```text
change password
disable MFA
view recovery codes
create credentials
financial transfer
```

unless explicitly required.

---

# 190. Impersonation Notifications

High-risk environments MAY notify the affected user when impersonation occurs.

---

# 191. Support Access

Prefer scoped support tools over unrestricted database or impersonation access.

Give support staff only the information/action capability required.

---

# 192. Just-in-Time Privilege

High-risk administrative permissions SHOULD be temporary where practical.

Example:

```text
request elevation
↓
approval/step-up
↓
temporary privilege
↓
automatic expiry
```

---

# 193. Break-Glass Accounts

Critical systems MAY maintain break-glass access for emergencies.

These accounts must be:

```text
rare
strongly protected
monitored
tested
audited
```

---

# 194. Break-Glass Use

Every break-glass use SHOULD trigger immediate audit/alert review.

---

# 195. Shared Accounts

Human users SHOULD NOT share accounts.

Shared accounts destroy attribution.

---

# 196. Named Administrators

Privileged access should map to identifiable individuals or workload identities.

---

# 197. Service Identities

Machine-to-machine access MUST use service/workload identity, not borrowed human credentials.

---

# 198. Service Account

A service identity SHOULD have:

```text
unique ID
owner
purpose
permissions
credential lifecycle
```

---

# 199. Service Least Privilege

Service accounts receive only permissions required by their workload.

---

# 200. Workload Identity

Prefer platform-native workload identity and short-lived credentials where available.

Avoid static long-lived secrets when stronger identity mechanisms exist.

---

# 201. Client Credentials

OAuth Client Credentials MAY be appropriate for machine-to-machine authorization.

Do not represent the service as an end user.

---

# 202. Service Token Subject

Resource servers must distinguish:

```text
user subject
```

from:

```text
service/client subject
```

where both token types exist.

---

# 203. API Keys

API keys MAY identify/invoke machine or integration access.

They should not be the default mechanism where stronger standardized workload identity exists.

---

# 204. API Key Properties

API keys SHOULD be:

```text
high entropy
scoped
revocable
rotatable
attributable
```

---

# 205. API Key Storage

Store key secrets safely.

Prefer storing a verification hash rather than recoverable plaintext when full secret retrieval is unnecessary.

---

# 206. API Key Display

Display the full secret only when necessary, typically once at creation.

---

# 207. API Key Prefix

A nonsecret identifier/prefix MAY assist:

```text
lookup
auditing
secret scanning
environment identification
```

---

# 208. API Key Expiration

High-risk keys SHOULD have expiration or enforced rotation appropriate to use case.

---

# 209. Key Rotation

Rotation SHOULD support overlap where necessary to prevent downtime:

```text
create new
deploy new
verify
revoke old
```

---

# 210. Credential Inventory

Users/admins SHOULD be able to identify active credentials where appropriate.

Examples:

```text
passkeys
security keys
API keys
OAuth grants
sessions
```

---

# 211. Credential Naming

Credentials should be identifiable without exposing secrets.

---

# 212. Credential Last Used

Recording last-use metadata MAY improve security management.

Avoid presenting imprecise values as proof of compromise.

---

# 213. Credential Revocation

Every long-lived credential type SHOULD have a revocation mechanism.

---

# 214. Credential Revocation Audit

High-value credential creation/revocation SHOULD be auditable.

---

# 215. Account Recovery

Account recovery is an authentication mechanism of last resort.

It must not be substantially weaker than the authentication it replaces without an explicit risk decision.

---

# 216. Recovery Methods

Potential recovery methods include:

```text
remaining registered authenticator
recovery codes
verified recovery contact
identity re-proofing where appropriate
administrator-assisted enterprise recovery
```

---

# 217. Recovery Notification

Successful account recovery SHOULD trigger notification through an independent trusted channel where possible.

---

# 218. Recovery Delay

High-risk accounts MAY use intentional recovery delays when immediate recovery would create unacceptable takeover risk.

---

# 219. Recovery Contact

Recovery contacts must be verified and managed as sensitive account attributes.

---

# 220. Recovery Codes

Recovery codes should be considered authenticators.

Protect them accordingly.

---

# 221. Avoid Security Questions

Knowledge-based personal questions SHOULD NOT be used for account recovery.

---

# 222. Recovery Rate Limiting

Recovery flows require:

```text
rate limiting
abuse monitoring
enumeration resistance
```

---

# 223. Recovery Session

A recovery token/session should have limited scope.

It should not automatically become an unrestricted authenticated session before required recovery steps finish.

---

# 224. Recovery Token

Recovery tokens MUST be:

```text
high entropy
short-lived
single-use
purpose-bound
```

---

# 225. Password Reset Link

Password reset links SHOULD expire and become unusable after successful reset.

---

# 226. Recovery Replay

Used or superseded recovery tokens must not remain valid.

---

# 227. Recovery and Existing Sessions

After suspected compromise or credential recovery, consider revoking existing sessions and long-lived credentials.

---

# 228. Account Email Change

Changing the account's primary email is security-sensitive.

Consider:

```text
recent authentication
verification of new email
notification to old email
delay for high-risk accounts
```

---

# 229. Phone Change

Phone-number changes require similar protection if phone participates in authentication/recovery.

---

# 230. MFA Disable

Disabling MFA SHOULD require strong recent authentication.

Do not let possession of a weak session silently disable stronger factors.

---

# 231. Passkey Removal

Removing passkeys/security keys is a credential-management event and may warrant notification.

---

# 232. Identity Linking

Linking another login provider creates another path into the account.

Treat it like adding an authenticator.

---

# 233. Identity Unlinking

Ensure users retain at least one viable approved authentication method before unlinking the last provider where appropriate.

---

# 234. Account Merge

Account merge is high risk.

Explicitly define:

```text
identity proof
resource ownership
tenant memberships
billing
credentials
audit
```

Do not auto-merge accounts solely because two emails happen to match.

---

# 235. Reauthentication

Require reauthentication after meaningful risk events.

Examples:

```text
credential recovery
suspicious session
critical identity change
high-risk privilege action
```

---

# 236. Authentication UX

Security controls should remain understandable.

Users should know:

```text
what is being requested
why
what happens next
```

---

# 237. Generic Authentication Errors

For login failures, avoid unnecessary account enumeration.

Example:

```text
Email or password is incorrect.
```

rather than proving that a specific account exists.

---

# 238. Authentication Timing

Avoid obvious timing differences that disclose account existence where practical.

---

# 239. Login Rate Limiting

Authentication endpoints MUST resist brute-force and credential-stuffing attacks.

Controls MAY combine:

```text
account
IP
device/risk
velocity
```

---

# 240. Account Lockout

Permanent hard lockout from a few failed attempts can itself enable denial-of-service.

Prefer progressive throttling/risk controls appropriate to the threat model.

---

# 241. Credential Stuffing

Defend password authentication against:

```text
breached password reuse
automated login attempts
distributed attacks
```

using layered controls.

---

# 242. CAPTCHA

CAPTCHA/challenges MAY be used when abuse requires them.

Do not use them as the primary authentication security architecture.

---

# 243. Failed Login Notification

Security-sensitive products MAY notify users of meaningful suspicious authentication activity.

Avoid notification spam for ordinary typing mistakes.

---

# 244. Login History

Applications MAY expose recent login/session activity.

This can help users detect unauthorized access.

---

# 245. Device Recognition

Device recognition MAY improve risk assessment and UX.

Do not treat a client-side device identifier as strong authentication.

---

# 246. Trusted Device

"Trust this device" must have:

```text
expiry
revocation
scope
security meaning
```

defined.

Do not make it an indefinite MFA bypass.

---

# 247. Authentication Assurance

Classify operations by required authentication assurance.

Example:

```text
General browsing
→ normal authenticated session

Billing/admin
→ MFA

Critical security changes
→ recent phishing-resistant authentication
```

---

# 248. Session Assurance

A session SHOULD retain enough server-side context to determine:

```text
authentication method
authentication time
MFA status
assurance level
```

where step-up policies need it.

---

# 249. Do Not Trust Client Assurance Claims

The browser must not be able to set:

```text
mfaVerified=true
```

and thereby satisfy server policy.

---

# 250. Authorization Context

A policy decision MAY use:

```text
principal
tenant membership
role
relationships
resource attributes
session assurance
request context
```

---

# 251. Authorization Result

Policy interfaces SHOULD default to:

```text
allow / deny
```

with optional explanation for internal diagnostics.

Do not expose sensitive policy internals to untrusted clients.

---

# 252. Permission Denial UX

User-facing denial should explain enough to recover.

Example:

```text
You need the Billing Admin permission to change this setting.
```

when disclosure is appropriate.

---

# 253. 403 vs 404

Sensitive resources MAY return a not-found-style response to unauthorized callers where revealing existence creates risk.

Use consistently.

---

# 254. Authorization Failure Logging

Meaningful denied privileged operations MAY be security events.

Avoid generating overwhelming logs for routine harmless denials.

---

# 255. Audit Logging

Security-sensitive authentication/authorization actions SHOULD create audit events.

Examples:

```text
login success/failure where appropriate
password changed
MFA enrolled/removed
passkey added/removed
role changed
permission changed
session revoked
API key created
impersonation started
recovery completed
```

---

# 256. Audit Actor

Audit records SHOULD identify:

```text
actor
subject where different
action
resource
tenant
time
result
```

---

# 257. Audit Integrity

Audit logs SHOULD be protected from unauthorized modification.

---

# 258. Do Not Log Secrets

Never log:

```text
password
session ID
access token
refresh token
OTP
recovery token
API key secret
WebAuthn private material
```

---

# 259. Session Logging

If session correlation is needed, log a safe opaque identifier/hash rather than the reusable session credential itself.

---

# 260. Authentication Metrics

Monitor:

```text
login success/failure
MFA challenges
recovery attempts
credential resets
OAuth errors
token failures
suspicious velocity
```

at appropriate aggregation.

---

# 261. Authorization Metrics

Monitor unusual:

```text
denial rate
cross-tenant attempts
privilege escalation attempts
admin actions
```

where security operations can act on them.

---

# 262. Alerting

High-confidence signals SHOULD alert security/operations.

Examples:

```text
break-glass account used
administrator MFA removed
mass role escalation
recovery spike
refresh-token replay
```

---

# 263. Privacy

Authentication telemetry can contain sensitive information.

Collect only what is necessary.

---

# 264. IP Addresses

IP addresses may be useful security signals but are not reliable identity.

They can change or be shared.

---

# 265. Geolocation

Approximate location inferred from network data should not be presented as exact proof of physical location.

---

# 266. Biometrics

Application servers SHOULD generally avoid storing raw biometric data.

For passkeys/platform authenticators, biometric verification normally occurs locally on the authenticator/device.

---

# 267. Biometric Factor

Biometrics are not passwords and cannot simply be "changed" after compromise.

Use established authenticator platforms rather than inventing central biometric comparison systems without a justified specialist design.

---

# 268. Authorization Data Model

A typical multi-tenant model may include:

```text
users
tenants
memberships
roles
permissions
role_permissions
```

with more advanced relationships only when required.

---

# 269. Membership

Membership connects:

```text
User
↔
Tenant
```

and SHOULD carry tenant-specific authorization information.

---

# 270. Membership Status

Possible states:

```text
invited
active
suspended
removed
```

Use explicit semantics.

---

# 271. Removed Membership

Removed users MUST lose tenant access promptly.

Do not merely hide tenant navigation.

---

# 272. Role Assignment Ownership

Define who may assign each role.

Do not assume all admins may assign Owner or platform-level roles.

---

# 273. Delegation

Permission to perform an action does not automatically imply permission to delegate that action to others.

Model delegation separately where required.

---

# 274. Permission Inheritance

If roles inherit permissions, inheritance rules must remain understandable.

Avoid deep role inheritance trees.

---

# 275. Negative Permissions

Avoid mixing allow and deny rules unnecessarily.

Deny rules can make permission evaluation difficult.

Use them only where the model genuinely needs exceptions.

---

# 276. Policy Precedence

If multiple policy systems exist, precedence MUST be explicit.

Example:

```text
platform suspension
→ always deny

tenant role
→ grants action

resource relationship
→ additional constraint
```

---

# 277. Default Role

New memberships should receive the least privileged useful default role.

Never default new users to administrator.

---

# 278. Subscription Entitlements

Product entitlements and security authorization are related but distinct.

Example:

```text
Plan includes feature
+
User has permission
→ action allowed
```

---

# 279. Feature Flags

Feature flags MUST NOT be used as authorization.

A user modifying client-side flag state must not gain protected capability.

---

# 280. Licensing/Entitlement Enforcement

Paid-plan entitlements must be enforced at trusted backend boundaries where bypass matters.

---

# 281. Admin Interfaces

Admin interfaces require stronger authentication/authorization controls than ordinary product UI where risk warrants it.

---

# 282. Separate Admin Origin

Highly sensitive systems MAY place administrative interfaces on separate origins/network paths.

This is defense in depth, not a substitute for authorization.

---

# 283. Admin Session

Administrative operations MAY require a distinct elevated session or step-up state.

---

# 284. Production Access

Production operational access SHOULD use:

```text
individual identities
strong MFA
least privilege
temporary elevation where possible
audit
```

---

# 285. Database Authentication

Database administrators/services MUST use database identities appropriate to their roles.

Do not use product-user authentication directly as database superuser credentials.

---

# 286. Authentication Secrets

All server credential secrets MUST live in approved secret-management systems.

---

# 287. Key Management

Signing/encryption keys require:

```text
ownership
rotation
access control
versioning/key ID
retirement
```

---

# 288. Signing-Key Rotation

Token-validation systems SHOULD support overlapping signing-key rotation.

Do not require global downtime for routine key replacement.

---

# 289. JWKS

When using JSON Web Key Sets, consumers should handle controlled key rotation and validate trusted issuer endpoints.

---

# 290. Token Introspection

Opaque access-token systems MAY use introspection where immediate central status checks provide value.

---

# 291. Opaque vs Self-Contained Tokens

Choose based on:

```text
revocation needs
latency
service topology
privacy
operational complexity
```

Neither format is universally superior.

---

# 292. Sender-Constrained Tokens

High-security OAuth deployments SHOULD consider sender-constrained access tokens where ecosystem support and threat model justify them.

---

# 293. DPoP / mTLS

Mechanisms such as:

```text
DPoP
mTLS
```

may limit usefulness of stolen bearer tokens.

Adopt according to client environment and interoperability requirements.

---

# 294. Native Applications

Native applications using OAuth SHOULD use system browser-based authorization rather than embedded collection of provider credentials.

---

# 295. Native Redirects

Use platform-appropriate secure redirect mechanisms and PKCE.

---

# 296. Mobile Secure Storage

Long-lived mobile credentials/tokens require platform-provided secure storage where available.

---

# 297. Desktop Applications

Desktop apps are generally public OAuth clients unless they can truly protect a client secret.

Do not embed a "secret" and assume compiled binaries keep it confidential.

---

# 298. Browser Applications

Browser JavaScript is a public environment.

Do not place confidential client secrets in frontend bundles.

---

# 299. Service Secrets

Confidential-client credentials belong on trusted server systems only.

---

# 300. Authentication Dependency

If using a third-party identity provider, define behavior when it is unavailable.

Examples:

```text
existing sessions continue
new login unavailable
admin emergency access
```

according to risk.

---

# 301. Authorization Dependency

Avoid architectures where a transient authorization-service outage unexpectedly grants access.

Security-critical failures should generally fail closed.

---

# 302. Fail Closed

When authorization cannot determine that access is allowed:

```text
DENY
```

unless an explicit exceptional policy says otherwise.

---

# 303. Resilience

Fail-closed design still requires operational resilience.

Use:

```text
high availability
safe caching where justified
local policy evaluation
```

to avoid unnecessary outages.

---

# 304. Testing Strategy

Authentication/authorization requires:

```text
unit policy tests
integration tests
protocol tests
security tests
E2E critical workflows
```

---

# 305. Authentication Tests

Test:

```text
valid login
invalid credential
disabled user
expired credential
MFA required
MFA failure
recovery
session expiry
logout
```

as applicable.

---

# 306. Authorization Tests

Every protected resource SHOULD test:

```text
allowed user
unauthenticated user
wrong role
wrong tenant
wrong resource ownership
revoked membership
```

---

# 307. Negative Testing

Authorization testing is incomplete without proving forbidden actions fail.

---

# 308. Cross-Tenant Automated Tests

Multi-tenant systems MUST include cross-tenant isolation tests.

---

# 309. Permission Matrix Tests

High-value permission matrices SHOULD be executable/testable where practical.

A role-policy change should visibly affect test expectations.

---

# 310. Policy Unit Tests

Test policy combinations directly.

Example:

```text
Admin + same tenant
→ allow update

Admin + different tenant
→ deny update
```

---

# 311. Session Tests

Verify:

```text
session rotation
expiry
revocation
logout
cookie attributes
fixation resistance
```

---

# 312. OAuth Tests

Verify:

```text
issuer
audience
PKCE
redirect validation
state
nonce where applicable
token expiry
key rotation
```

---

# 313. Recovery Tests

Attempt:

```text
expired token
used token
wrong account
multiple reset attempts
factor reset
```

---

# 314. Impersonation Tests

Verify:

```text
unauthorized operator denied
actor identity retained
audit created
restricted actions blocked
exit works
```

---

# 315. Security Review Triggers

Formal review SHOULD be triggered by:

```text
new authentication method
new federation provider
new admin role
new permission model
new tenant model
impersonation
recovery changes
token architecture changes
```

---

# 316. Authentication Documentation

Document:

```text
supported methods
MFA policy
session lifecycle
recovery
credential management
```

for maintainers and users as appropriate.

---

# 317. Authorization Documentation

Document:

```text
roles
permissions
resource ownership
tenant boundaries
policy rules
```

---

# 318. Sensitive Documentation

Do not expose operational secrets or bypass procedures in broadly available public documentation.

---

# 319. Identity Provider Ownership

Every authentication provider integration MUST have an owner.

---

# 320. Permission Ownership

Every major permission namespace/domain needs an owner.

Do not let permissions accumulate without governance.

---

# 321. Permission Review

Periodically review privileged permissions for:

```text
continued need
role membership
stale accounts
service identities
```

---

# 322. Access Reviews

High-risk organizations SHOULD perform periodic access certification where appropriate.

---

# 323. Dormant Accounts

Dormant privileged accounts SHOULD be disabled or reviewed according to policy.

---

# 324. Orphaned Service Accounts

Every service identity must have a current owner.

Orphaned service identities should be removed.

---

# 325. Credential Expiry

Not every credential requires arbitrary scheduled rotation.

Rotation requirements should depend on:

```text
credential type
exposure risk
provider capabilities
compromise evidence
organizational policy
```

---

# 326. Secret Rotation

Static machine secrets SHOULD be rotatable without requiring extended downtime.

---

# 327. Incident Response

Authentication incidents should support:

```text
credential revocation
session revocation
account suspension
key rotation
provider disablement
```

quickly.

---

# 328. Compromised Account

Provide an operator/user process to:

```text
secure identity
revoke sessions
replace authenticators
review credentials
review critical changes
```

---

# 329. Compromised Provider

Federated identity architecture must support disabling or removing a compromised provider without destroying internal accounts.

---

# 330. Audit Investigation

Operators should be able to reconstruct:

```text
who authenticated
how
when
which privileged actions followed
```

within privacy/retention requirements.

---

# 331. Authentication Anti-Patterns

Avoid:

```text
password-only administrator accounts
```

Avoid:

```text
security questions
```

Avoid:

```text
mandatory 30/60/90-day password changes without cause
```

Avoid:

```text
password composition rules as main security control
```

Avoid:

```text
tokens in localStorage by default for sensitive first-party web apps
```

Avoid:

```text
session IDs in URLs
```

Avoid:

```text
JWT = automatically secure
```

Avoid:

```text
OAuth = authentication
```

Avoid:

```text
ID token used as generic API access token
```

Avoid:

```text
Implicit OAuth flow in new browser apps
```

Avoid:

```text
Resource Owner Password Credentials flow
```

Avoid:

```text
wildcard redirect URIs
```

Avoid:

```text
email claim alone = permanent identity
```

Avoid:

```text
signed in = authorized
```

Avoid:

```text
hidden button = access control
```

Avoid:

```text
tenantId from request = tenant permission
```

Avoid:

```text
role check scattered throughout frontend
```

Avoid:

```text
isAdmin boolean controlling everything
```

Avoid:

```text
feature flag = permission
```

Avoid:

```text
one administrator shared account
```

Avoid:

```text
support database access instead of scoped support tooling
```

Avoid:

```text
impersonation without audit
```

Avoid:

```text
account recovery weaker than ordinary login with no risk controls
```

---

# 332. Authentication Review Checklist

```text
□ Stable internal user ID
□ Login identifiers separated from identity
□ Authentication methods documented
□ Passkeys/WebAuthn considered
□ Password policy modern
□ Compromised-password screening enabled
□ MFA policy defined
□ Privileged users require stronger auth
□ Session architecture defined
□ Secure cookie attributes defined
□ Session rotation implemented
□ Idle/absolute expiration defined
□ Session revocation available
□ Logout behavior verified
□ Account recovery defined
□ Credential lifecycle defined
□ Authentication events audited
```

---

# 333. OAuth/OIDC Checklist

```text
□ OAuth actually needed
□ OIDC used for authentication where required
□ Authorization Code flow
□ PKCE configured
□ S256 used
□ Implicit flow absent
□ Password grant absent
□ Exact redirect validation
□ Open redirect protection
□ Issuer validation
□ Audience validation
□ State/correlation validation
□ Nonce handled where applicable
□ Token lifetimes bounded
□ Refresh-token security defined
□ Browser token exposure minimized
□ BFF considered for sensitive apps
```

---

# 334. Authorization Checklist

```text
□ Deny by default
□ Authorization server-side
□ Every protected request evaluated
□ Resource-level checks exist
□ Action-level checks exist
□ Tenant scope checked
□ Collection queries scoped
□ Search scoped
□ Export scoped
□ Bulk operations scoped
□ Permission vocabulary clear
□ Policy layer exists where complexity warrants it
□ Permission caches have invalidation
□ Revocation propagates promptly
```

---

# 335. Tenant Checklist

```text
□ Tenant context comes from trusted membership
□ Client tenant ID not trusted alone
□ Roles tenant-scoped where appropriate
□ Cross-tenant read denied
□ Cross-tenant write denied
□ Cross-tenant delete denied
□ Cross-tenant search denied
□ Cross-tenant file access denied
□ Cross-tenant exports denied
□ Cross-tenant tests automated
```

---

# 336. Impersonation Checklist

```text
□ Separate permission
□ Strong authentication
□ Recent authentication considered
□ Original actor retained
□ Impersonated user retained
□ Visible UI banner
□ Audit log
□ Restricted operations defined
□ Exit mechanism
□ Notifications considered
```

---

# 337. Account Recovery Checklist

```text
□ Recovery methods explicitly approved
□ Security questions absent
□ Recovery tokens high entropy
□ Tokens short-lived
□ Tokens single-use
□ Rate limits
□ Enumeration resistance
□ Recovery notification
□ Session revocation considered
□ MFA reset protected
□ Audit event created
```

---

# 338. Service Identity Checklist

```text
□ Unique workload identity
□ Human credentials not reused
□ Owner identified
□ Purpose documented
□ Least privilege
□ Short-lived identity preferred
□ Static secrets minimized
□ Rotation possible
□ Revocation possible
□ Activity observable
```

---

# 339. Definition of Done — Authentication

Authentication is production-ready only when:

```text
✓ Identity source is clear
✓ Approved authenticator method used
✓ Password handling meets baseline if enabled
✓ MFA requirements implemented
✓ Sessions protected
✓ Session rotation works
✓ Expiration works
✓ Revocation works
✓ Logout works
✓ Credential changes protected
✓ Recovery protected
✓ Audit logging works
✓ Security tests pass
```

---

# 340. Definition of Done — Authorization

Authorization is production-ready only when:

```text
✓ Principal identified
✓ Tenant established
✓ Resource identified
✓ Action identified
✓ Policy evaluated server-side
✓ Default behavior is deny
✓ Wrong-tenant access denied
✓ Collection/search access scoped
✓ Privileged operations separately controlled
✓ Permission changes invalidate access appropriately
✓ Negative tests pass
✓ Audit requirements met
```

---

# 341. AI Authentication Rules

AI coding agents MUST inspect existing identity architecture before changing authentication.

Inspect:

```text
auth provider
session model
password/passkey support
MFA
OAuth/OIDC
permission model
tenant model
recovery
```

---

# 342. AI Auth-Library Rule

AI MUST prefer the established authentication library/provider.

It MUST NOT implement custom password/session/OAuth cryptography because the feature appears straightforward.

---

# 343. AI Password Rule

AI MUST NOT generate obsolete password policies such as:

```text
8 chars
uppercase
lowercase
number
symbol
change every 90 days
```

as the default organizational standard.

---

# 344. AI Passkey Rule

When implementing passkeys, AI MUST use established WebAuthn libraries and follow version-matched platform documentation.

---

# 345. AI Session Rule

AI MUST NOT place authentication tokens in browser storage merely because it simplifies code.

It must first inspect the established session architecture.

---

# 346. AI JWT Rule

AI MUST NOT introduce JWT merely to make authentication "stateless."

It must consider revocation and permission-change requirements.

---

# 347. AI OAuth Rule

AI MUST distinguish:

```text
OAuth
→ authorization

OIDC
→ authentication layer
```

---

# 348. AI OAuth Flow Rule

AI MUST NOT generate new implementations using:

```text
Implicit flow
Resource Owner Password Credentials flow
```

---

# 349. AI PKCE Rule

Public OAuth clients MUST use PKCE according to the current OAuth security baseline.

---

# 350. AI Authorization Rule

Before implementing a protected operation, AI MUST answer:

```text
Who is the principal?
Which tenant?
Which resource?
Which action?
Which policy grants this?
```

---

# 351. AI UI Rule

AI MUST NOT treat:

```text
hidden control
disabled control
client role
route protection
```

as sufficient authorization.

---

# 352. AI Tenant Rule

AI MUST test the conceptual case:

```text
authenticated User A
+
Resource belonging to Tenant B
```

for every new tenant-scoped operation.

---

# 353. AI Generic Update Rule

AI MUST NOT allow arbitrary updates such as:

```text
updateUser(request.body)
```

where a client could submit:

```text
role
permissions
tenant
isAdmin
```

unexpectedly.

---

# 354. AI Permission Rule

AI SHOULD use semantic permission functions/policies instead of scattering raw role comparisons throughout the codebase.

---

# 355. AI Recovery Rule

AI MUST treat:

```text
password reset
MFA reset
email change
passkey replacement
```

as security-sensitive workflows.

---

# 356. AI Impersonation Rule

AI MUST never implement impersonation as:

```text
session.userId = targetUserId
```

while discarding the original actor.

---

# 357. AI Credential Rule

AI MUST NOT log or expose:

```text
password
OTP
access token
refresh token
session ID
recovery token
API key secret
```

---

# 358. AI Global-Admin Rule

AI SHOULD avoid introducing universal `isAdmin` bypasses.

Platform-wide override permissions require explicit architecture.

---

# 359. AI Audit Rule

AI SHOULD add audit events when introducing privileged identity/security operations.

---

# 360. AI Gold Rule

When uncertain:

```text
Strong identity
>
Least privilege
>
Deny by default
>
Server-side policy
>
Explicit resource authorization
>
Auditable decisions
>
Convenience
```

---

# 361. Golden Authentication & Authorization Rules

**1. Authentication and authorization are separate concerns.**

**2. Use stable internal identity, not mutable email, as primary identity.**

**3. Prefer phishing-resistant cryptographic authentication.**

**4. Support passkeys/WebAuthn where practical.**

**5. Passwords follow modern length/blocklist rules, not arbitrary complexity rituals.**

**6. Do not require routine password rotation without cause.**

**7. Password managers and paste must work.**

**8. Privileged accounts require stronger authentication.**

**9. Sessions use unpredictable identifiers and secure transport.**

**10. Rotate sessions after authentication and privilege changes.**

**11. Sessions expire and can be revoked.**

**12. Session IDs never belong in URLs.**

**13. OAuth is authorization; OIDC supplies authentication semantics.**

**14. New OAuth browser clients use Authorization Code flow and PKCE.**

**15. Do not use the Implicit flow in new applications.**

**16. Never use Resource Owner Password Credentials.**

**17. Validate issuer, audience, expiry, and protocol state.**

**18. Keep OAuth tokens out of browser JavaScript where architecture can avoid it.**

**19. Deny access by default.**

**20. Validate permissions on every protected request.**

**21. Authorize the specific action on the specific resource.**

**22. UI visibility never substitutes for authorization.**

**23. Tenant IDs are selectors, not permission proof.**

**24. Cross-tenant access is explicitly tested.**

**25. Roles are understandable permission bundles.**

**26. Prefer semantic permissions over scattered role checks.**

**27. Use ABAC/ReBAC when the domain actually requires contextual/relationship policy.**

**28. Permission changes invalidate stale authority promptly.**

**29. Impersonation preserves the real actor and is fully audited.**

**30. Recovery is an authentication path and deserves strong protection.**

**31. Do not use security questions.**

**32. Every long-lived credential is revocable.**

**33. Service identities are separate from human identities.**

**34. Machine credentials follow least privilege.**

**35. Shared administrator accounts are prohibited.**

**36. Secrets and authentication tokens are never logged.**

**37. Privileged actions generate useful audit trails.**

**38. Security-sensitive policy fails closed.**

**39. Negative authorization tests are mandatory.**

**40. Authentication convenience never overrides authorization correctness.**

---

# 362. Canonical Authentication & Authorization Standard

The organizational standard is:

> **Identity, authentication, session management, and authorization are separate but coordinated security concerns. Users receive stable internal identities independent from mutable login identifiers. Modern cryptographic authentication—particularly passkeys/WebAuthn—is preferred where practical, while passwords that remain supported follow modern length, compromised-password screening, secure hashing, and password-manager-compatible requirements rather than arbitrary composition or periodic-rotation rules. Privileged identities use stronger, preferably phishing-resistant authentication.**

> **Web sessions use securely transported, unpredictable, revocable session credentials with intentional expiration and rotation after authentication and privilege changes. OAuth is used for delegated authorization, OpenID Connect for federated authentication, and modern deployments use Authorization Code-based flows with PKCE rather than Implicit or Resource Owner Password Credentials flows. Browser architectures minimize direct exposure of bearer tokens and should consider server-side BFF/session designs for sensitive applications.**

> **Authorization is deny-by-default and enforced on trusted servers for every protected action. Decisions account for principal, action, resource, tenant, relationship, and relevant context. RBAC is used for understandable permission bundles, while ABAC and ReBAC are introduced only where contextual or relationship semantics require them. Tenant membership is established from trusted server-side data, and client-supplied resource or tenant identifiers never constitute authorization.**

> **Credential enrollment, credential removal, MFA reset, account recovery, identity linking, email changes, privilege changes, impersonation, administrative access, and service identity management are treated as security-sensitive lifecycle operations. Long-lived credentials are revocable, privileged actions are auditable, authentication and authorization events are observable, and cross-tenant and forbidden behavior are explicitly tested.**

A production-grade identity and access architecture should make it easy to answer:

```text
Who is this principal?
Is it a human or workload?
What immutable identity represents it?
How was it authenticated?
When was it authenticated?
What assurance did that authentication provide?
Which authenticators are registered?
What session represents the login?
When does the session expire?
How can the session be revoked?
Which tenant is active?
What relationship does the principal have to that tenant?
Which action is being attempted?
Which resource is affected?
Which policy grants or denies the action?
What happens when permissions change?
How is privileged access audited?
How does the account recover from lost credentials?
How can all access be revoked during compromise?
```

If those answers are unclear, the authentication and authorization architecture is not production-grade.

A few **2026-specific baselines** behind the document are important. NIST SP 800-63B-4 now specifies a **15-character minimum for passwords used as a single factor, at least 8 when the password is part of MFA, support for at least 64 characters, compromised/common-password blocklisting, no arbitrary character-composition requirements, and no routine periodic password changes absent compromise**. citeturn161761search0turn161761search2

For browser cryptographic authentication, **WebAuthn Level 3 became a W3C Recommendation on August 25, 2026**, so that should now be the standards reference for new passkey/WebAuthn implementation work. citeturn171750search1turn171750search3

For OAuth, **RFC 9700** is the current OAuth 2.0 Security Best Current Practice: public clients must use PKCE, the password grant must not be used, and the implicit flow is no longer recommended. The even newer **RFC 10017, OAuth 2.0 for Browser-Based Applications**, published in 2026, requires browser-based OAuth clients to use redirect-based Authorization Code flows rather than Implicit and describes the BFF pattern as the strongest of its three browser architecture patterns, strongly recommending it for sensitive/business applications and those handling personal data. citeturn438128search0turn438128search3turn636111search0

For authorization, the core rule also matches OWASP's current guidance: **deny by default and validate permissions on every request**, not merely at login or in frontend controls. citeturn700324search0

In the master hierarchy, I would now make the sequence:

**Foundations → Architecture → Framework → Security → Authentication & Authorization → Data & Database → API → Routes → State Management → Design Tokens → Layouts → Facade → Components → Forms & Validation → Patterns → Accessibility → Reusability → Testing → Performance → Observability → Infrastructure → Documentation → Governance.**
