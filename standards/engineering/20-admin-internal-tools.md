---
id: "admin-internal-tools"
title: "Admin & Internal Tools Guidelines — Gold Standard 2026"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "admin", "internal", "tools"]
applies_to: ["general"]
related: ["feature-flag", "security", "authentication-authorization", "error-handling-resilience", "observability"]
legacy_number: 44
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 71302
provenance: baseline

---

Canonical placement: **Security → Authentication & Authorization → Admin & Internal Tools → Data & Database**. Security/Auth own the underlying authorization model; this standard owns the **human operator experience and privileged workflows** built on top of it.

# Admin & Internal Tools Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- administrative interfaces;
- internal tools;
- support tooling;
- operations tooling;
- privileged dashboards;
- production consoles;
- customer-support interfaces;
- impersonation;
- "view as user";
- break-glass access;
- just-in-time access;
- production data access;
- user administration;
- role and permission management;
- tenant administration;
- feature management;
- configuration management;
- high-risk actions;
- approval workflows;
- auditability;
- bulk administrative actions;
- sensitive-data access;
- exports;
- account recovery support;
- refunds and financial adjustments;
- moderation;
- trust and safety;
- production debugging;
- database/support consoles;
- operational safety;
- internal-tool testing;
- privileged-access governance.

The objective is to make privileged tooling:

```text
Least-privileged
Explicit
Authenticated strongly
Auditable
Reversible where possible
Context-aware
Operator-safe
Production-safe
Tenant-safe
Privacy-preserving
Governed
```

The core principle is:

> **Administrative convenience must never bypass the security, authorization, privacy, business-rule, or audit controls that protect the production system.**

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
Privilege required
Affected system/data
Risk
Compensating control
Approver
Owner
Expiry/review date
```

---

# 3. Admin Is a Separate Trust Boundary

Administrative interfaces MUST be treated as a distinct high-trust surface.

They are not merely:

```text
the normal application
+
more buttons
```

---

# 4. Privilege Amplification

Admin tools can often:

```text
Read more data
Modify more data
Cross tenant boundaries
Change permissions
Change security controls
Trigger irreversible actions
Act on behalf of users
Change production configuration
```

A defect in an admin tool therefore has a larger potential blast radius than a normal user-interface defect.

---

# 5. Security Baseline

Admin tooling MUST inherit all applicable:

```text
Security Guidelines
Authentication & Authorization Guidelines
Privacy & Data Governance Guidelines
Observability Guidelines
Error Handling & Resilience Guidelines
```

with stricter controls where risk warrants them.

---

# 6. No Admin Bypass Architecture

Administrative interfaces MUST NOT bypass application authorization merely because they are "internal."

---

# 7. Internal ≠ Trusted

Being available only to:

```text
employees
VPN users
corporate devices
internal networks
```

does not eliminate the need for authorization.

---

# 8. Default Deny

Privileged functions MUST use a default-deny model.

Access exists only when explicitly granted.

---

# 9. Least Privilege

Operators receive the minimum privileges necessary to perform their assigned tasks.

---

# 10. Role Granularity

Avoid one universal:

```text
Admin
```

role granting all privileges.

Prefer task-oriented roles such as:

```text
Support Viewer
Support Agent
Billing Operator
Fraud Reviewer
Content Moderator
Tenant Administrator
Security Administrator
Platform Operator
```

according to real organizational responsibilities.

---

# 11. Capability-Based Permissions

Permissions SHOULD describe actual operations.

Examples:

```text
user.read
user.email.change
user.session.revoke
tenant.read
tenant.member.remove
billing.refund
feature_flag.read
feature_flag.write
production_log.read
```

---

# 12. Avoid Role Logic in UI Only

Hiding a button is not authorization.

The server MUST authorize every privileged operation.

---

# 13. Object-Level Authorization

Admin access to a function does not automatically grant access to every object.

Example:

```text
Support Agent
→ may view customer accounts
```

does not imply:

```text
may view every restricted tenant
may view employee accounts
may view legal-hold records
```

---

# 14. Contextual Authorization

Privileged authorization SHOULD consider:

```text
Operator identity
Role
Tenant/resource
Action
Resource state
Sensitivity
Environment
Approval state
Current elevation
```

where relevant.

---

# 15. Authorization Per Request

Every privileged server operation MUST re-evaluate authorization.

Do not rely on:

```text
admin page already opened
role checked during login
button was visible
```

as proof of continuing authorization.

---

# 16. Privileged Roles Are Not Domain Rules

Administrative privileges MUST NOT silently bypass business invariants unless a separate explicit override permission exists.

---

# 17. Example Business Rule

A support operator allowed to edit an order still MUST NOT:

```text
refund more than paid
approve their own financial adjustment
change an immutable transaction identifier
```

unless a separately governed override path exists.

---

# 18. Separate Override Privilege

Exceptional business-rule overrides SHOULD use distinct permissions such as:

```text
billing.refund
billing.refund.override_limit
```

rather than having one broad role bypass everything.

---

# 19. Separation of Duties

High-impact workflows SHOULD separate incompatible responsibilities.

Examples:

```text
Requester ≠ Approver
Developer ≠ Production access approver
Refund initiator ≠ large-refund approver
Access administrator ≠ audit-log administrator
```

where risk warrants it.

---

# 20. Self-Approval

Users MUST NOT approve their own actions where separation of duties is required.

---

# 21. Strong Authentication

Privileged interfaces MUST require strong authentication.

---

# 22. MFA

Privileged access SHOULD require phishing-resistant MFA where supported by the organizational authentication architecture.

---

# 23. Step-Up Authentication

High-risk actions SHOULD require recent step-up authentication.

Examples:

```text
Disable MFA
Change customer email
Generate recovery credential
View highly sensitive data
Impersonate user
Issue large refund
Delete tenant
Change production security settings
```

---

# 24. Recent Authentication

Step-up freshness SHOULD be bounded.

A login from hours earlier SHOULD NOT automatically authorize highly sensitive action indefinitely.

---

# 25. Device/Posture

Production/admin access MAY require:

```text
managed device
device certificate
healthy endpoint posture
approved network path
```

according to organizational security policy.

---

# 26. Admin Session

Privileged sessions SHOULD have stricter session policies than normal end-user sessions.

---

# 27. Admin Session Timeout

Idle and absolute session lifetimes SHOULD reflect the sensitivity of privileged access.

---

# 28. Reauthentication

Sensitive operation reauthentication is preferred to excessively long globally elevated sessions.

---

# 29. Separate Admin Role

Where practical, day-to-day product use SHOULD occur without administrative privilege enabled.

---

# 30. Separate Admin Identity

High-risk operational environments MAY require a separate administrative identity/account from the user's ordinary account.

---

# 31. Just-in-Time Privilege

Elevated production access SHOULD be granted only when needed.

Preferred flow:

```text
Normal account
↓
Request privilege
↓
Reason / ticket
↓
Approval where required
↓
Time-limited elevation
↓
Perform task
↓
Privilege expires
```

---

# 32. Avoid Permanent Production Admin

Permanent always-on production administrator access SHOULD be minimized.

---

# 33. Privilege Expiration

Temporary privilege MUST expire automatically.

---

# 34. Extension

Extending elevation SHOULD require an explicit new action.

Do not silently auto-renew elevated access.

---

# 35. Access Reason

Privileged elevation SHOULD capture:

```text
Reason
Incident/ticket/customer case
Requested privilege
Requested duration
```

---

# 36. Approval

Approval SHOULD be risk-based.

Not every low-risk support read needs manual approval.

High-impact privilege SHOULD.

---

# 37. Access Review

Standing privileged memberships MUST be reviewed periodically.

---

# 38. Offboarding

Privileged access MUST be revoked promptly when:

```text
employment ends
role changes
team changes
contract expires
```

---

# 39. Dormant Privilege

Unused privileged access SHOULD be automatically flagged or removed according to policy.

---

# 40. Break-Glass Access

Break-glass is emergency access for exceptional operational failure.

It MUST NOT become the normal path.

---

# 41. Break-Glass Requirements

Break-glass access SHOULD require:

```text
Strong authentication
Explicit reason
Very short expiry
Prominent logging
Immediate alerting
Post-event review
```

---

# 42. Break-Glass Audit

Every break-glass use MUST produce a high-priority audit event.

---

# 43. Break-Glass Credentials

Shared static break-glass passwords SHOULD be avoided where stronger emergency-access mechanisms are available.

---

# 44. Shared Admin Accounts

Shared human administrator accounts SHOULD NOT be used.

Actions must be attributable to an individual identity.

---

# 45. Service Identities

Automated administrative tasks MUST use dedicated machine/service identities rather than human accounts.

---

# 46. Admin UI Identification

Administrative UI MUST be unmistakably distinguishable from customer-facing UI.

---

# 47. Environment Identification

Admin tools MUST prominently indicate:

```text
Production
Staging
Development
```

when multiple environments are accessible.

---

# 48. Production Visual Indicator

Production SHOULD have a persistent, non-subtle environment indicator.

---

# 49. Environment Confusion

Operators MUST NOT have to infer production from:

```text
URL color
browser tab memory
hostname familiarity
```

alone.

---

# 50. Cross-Environment Separation

Production and non-production admin sessions SHOULD be isolated where practical.

---

# 51. Production Links

Links from non-production tooling SHOULD NOT silently navigate into production privileged operations.

---

# 52. Production Access Principle

Production access exists to:

```text
operate
support
recover
investigate
```

the system—not as the default development environment.

---

# 53. Production Changes

Normal application changes SHOULD flow through:

```text
source control
CI/CD
configuration management
migration tooling
```

rather than manual production editing.

---

# 54. Manual Production Change

Manual production modification SHOULD be exceptional.

It MUST be:

```text
authorized
auditable
bounded
reconcilable
```

---

# 55. Reconcile Manual Change

Emergency/manual production changes MUST later be reconciled with the authoritative source of truth.

---

# 56. Database Console

Direct production database access SHOULD be highly restricted.

---

# 57. Read-Only First

Production investigation SHOULD prefer:

```text
read-only tooling
observability
admin APIs
safe query interfaces
```

before direct write access.

---

# 58. Production DB Write

Direct production database write access SHOULD require exceptional authorization.

---

# 59. Business Logic Bypass

Direct DB modification can bypass:

```text
validation
authorization
audit
events
cache invalidation
derived data
webhooks
```

and SHOULD therefore not be routine operational tooling.

---

# 60. Production Shell Access

Interactive shell access to production compute SHOULD be minimized.

---

# 61. Ephemeral Shell

When shell access is required, prefer:

```text
time-limited
identity-bound
audited
restricted
```

sessions.

---

# 62. Copying Production Data

Operators MUST NOT copy production customer data to:

```text
local laptop
personal storage
chat
unapproved spreadsheets
test environments
```

without explicit approved process.

---

# 63. Support Tooling Principle

Support tools SHOULD expose only the customer information and actions necessary to solve support cases.

---

# 64. Support Read Access

Support read access SHOULD be scoped by:

```text
case
customer
tenant
data sensitivity
operator role
```

where practical.

---

# 65. Case Context

Sensitive support access SHOULD require a customer/support case reference.

---

# 66. Case-Scoped Access

High-sensitivity organizations SHOULD consider granting temporary customer-specific support access tied to an active case.

---

# 67. Customer Search

Support search MUST enforce tenant/data access restrictions.

---

# 68. Search Does Not Bypass Privacy

A support user searching by:

```text
email
phone
name
external identifier
```

MUST be restricted to legitimate support need.

---

# 69. Sensitive Search Logging

Searches for sensitive user records SHOULD be auditable where risk requires it.

---

# 70. Data Minimization

Support UI SHOULD default to masked or summarized data.

---

# 71. Reveal-on-Demand

Highly sensitive fields MAY use explicit:

```text
Reveal
```

controls.

---

# 72. Reveal Logging

Revealing high-sensitivity data SHOULD generate an audit event.

---

# 73. No Secret Reveal

Admin tooling MUST NOT display:

```text
Passwords
Raw authentication secrets
Private signing keys
Session cookies
API key secret values after creation
```

unless a specific secure-secret workflow absolutely requires it.

---

# 74. Credentials

Where credentials can be rotated or replaced, support tools SHOULD prefer:

```text
revoke
rotate
reset
```

over revealing the existing secret.

---

# 75. Personal Data

Admin views of personal data MUST follow Privacy & Data Governance classification and minimization.

---

# 76. Restricted Data

Restricted fields SHOULD require a stronger permission than general account read access.

---

# 77. Bulk Data Export

Bulk customer-data export is a high-risk privileged operation.

---

# 78. Export Controls

Administrative exports SHOULD require:

```text
specific permission
scope preview
reason
audit
expiry
```

and potentially approval.

---

# 79. Export Minimization

Exports MUST contain only the fields required for the legitimate purpose.

---

# 80. Export Expiration

Generated sensitive export files SHOULD expire automatically.

---

# 81. Export Download Logging

Sensitive export creation and download MUST be auditable.

---

# 82. Clipboard Risk

Highly sensitive admin data SHOULD not be unnecessarily optimized for one-click copying.

---

# 83. Impersonation

Impersonation allows an operator to act or view the system using a customer's effective context.

It is one of the highest-risk support capabilities.

---

# 84. Impersonation Must Be Explicit

Impersonation MUST never happen invisibly.

---

# 85. Impersonation Permission

Impersonation MUST have a dedicated privilege.

General:

```text
support.read
```

does not imply:

```text
user.impersonate
```

---

# 86. Impersonation Reason

Starting impersonation SHOULD require a reason or support-case reference.

---

# 87. Impersonation Duration

Impersonation sessions MUST be time-limited.

---

# 88. Impersonation Banner

During impersonation, the interface MUST prominently display:

```text
You are impersonating <user/context>
```

or equivalent.

---

# 89. Persistent Indicator

The impersonation indicator MUST remain visible throughout the impersonated session.

---

# 90. Exit Impersonation

A clear:

```text
Exit impersonation
```

action MUST always be available.

---

# 91. Operator Identity

The system MUST preserve the real operator identity while impersonating.

---

# 92. Do Not Replace Actor

Audit records MUST distinguish:

```text
actor = support operator
effective subject = customer user
```

---

# 93. Impersonation Audit

Audit each:

```text
start
end
privileged action
```

performed under impersonation.

---

# 94. Impersonation Login Events

User-facing account security records SHOULD distinguish genuine customer login from staff impersonation where disclosure policy supports it.

---

# 95. Read-Only Impersonation

Prefer read-only/view-as-user capability when that satisfies support needs.

---

# 96. Write Impersonation

Write-capable impersonation SHOULD require stronger privilege and controls.

---

# 97. Restricted Impersonation Actions

Even during write impersonation, some actions SHOULD remain prohibited.

Examples:

```text
Change password
Disable MFA
Reveal recovery secrets
Transfer ownership
Delete account
Generate API credentials
Approve financial transaction
```

unless separately authorized.

---

# 98. Never Inherit Customer Secrets

Impersonation MUST NOT expose or copy the customer's authentication credentials.

---

# 99. Impersonation Session Isolation

Impersonated sessions SHOULD be logically distinct from ordinary operator sessions.

---

# 100. Impersonation Links

Links generated during impersonation MUST NOT accidentally leak privileged/operator state to the customer.

---

# 101. Impersonation Notifications

Whether customers are notified about staff impersonation SHOULD be an explicit policy decision based on security, privacy, support, and regulatory context.

---

# 102. Impersonation Scope

An operator authorized for Tenant A MUST NOT impersonate a user in Tenant B merely because the account identifier is known.

---

# 103. View As User

A non-mutating:

```text
View as user
```

preview MAY be implemented separately from true impersonation.

---

# 104. Prefer Projection When Possible

For UI troubleshooting, a simulated/read-only projection of user permissions/state MAY be safer than obtaining a real effective session.

---

# 105. High-Risk Actions

Every admin action SHOULD be classified by risk.

Example:

```text
Low
Medium
High
Critical
```

---

# 106. High-Risk Examples

Examples include:

```text
Delete tenant
Disable account security
Transfer ownership
Change primary email
Issue large refund
Grant admin role
Export many users
Modify authentication policy
Change production feature globally
Rotate critical secret
```

---

# 107. Risk Drives Friction

Higher-risk actions SHOULD require stronger:

```text
authorization
authentication
confirmation
approval
audit
```

---

# 108. Confirmation Is Not Authorization

A confirmation dialog cannot replace server authorization.

---

# 109. Confirmation Copy

High-risk confirmation MUST clearly state:

```text
Action
Target
Scope
Consequence
Reversibility
```

---

# 110. Avoid Generic Confirmation

Bad:

```text
Are you sure?
[Yes] [No]
```

Prefer:

```text
Delete tenant "Atlas"?

This permanently removes 412 user accounts and scheduled jobs.

[Delete tenant] [Cancel]
```

---

# 111. Typed Confirmation

Typed target confirmation MAY be appropriate for unusually destructive broad-impact actions.

---

# 112. Typed Confirmation Limits

Typed confirmation MUST NOT be used as fake security theatre for routine reversible operations.

---

# 113. Step-Up Before Confirmation

For critical actions, step-up authentication SHOULD occur before or as part of the final authorization.

---

# 114. Two-Person Rule

Selected critical actions SHOULD require independent approval.

---

# 115. Maker-Checker

Where required:

```text
Maker creates action
Checker reviews exact action
Checker approves/rejects
System executes
```

---

# 116. Approval Context

Approvers MUST see the exact:

```text
target
old value
new value
scope
reason
```

before approval.

---

# 117. Approval Integrity

Changing the action after approval MUST invalidate the approval.

---

# 118. Approval Expiry

High-risk approvals SHOULD expire.

---

# 119. Bulk Actions

Bulk admin actions are high-blast-radius operations.

---

# 120. Bulk Preview

Before execution, show:

```text
Query/filter
Affected count
Representative objects
Action
Exclusions
```

---

# 121. Bulk Scope

The system MUST make scope unambiguous.

Examples:

```text
Selected 25 rows
Current page 100 rows
All 18,392 matching users
```

---

# 122. Select All

"Select all" MUST clearly state whether it means:

```text
visible page
loaded items
all filtered results
entire dataset
```

---

# 123. Bulk Limits

High-risk bulk operations SHOULD use limits/batching.

---

# 124. Bulk Dry Run

Where feasible, risky transformations SHOULD support a dry-run/preview.

---

# 125. Bulk Idempotency

Bulk jobs SHOULD be idempotent/restartable where practical.

---

# 126. Bulk Progress

Long-running operations SHOULD show:

```text
queued
running
completed
partially failed
failed
```

states.

---

# 127. Partial Failure

Bulk tools MUST define partial-failure behavior.

---

# 128. Bulk Retry

Retry failed objects rather than blindly repeating successful mutations.

---

# 129. Bulk Undo

Where reversibility is feasible, provide:

```text
rollback
undo
restore
```

rather than relying only on confirmation.

---

# 130. Delete Policy

Administrative deletion follows Privacy, Data, and Pattern Guidelines.

---

# 131. Delete vs Disable

Support/admin tools MUST clearly distinguish:

```text
Disable
Suspend
Archive
Soft delete
Hard delete
```

---

# 132. User Suspension

Suspension SHOULD usually preserve data while preventing access.

---

# 133. User Deletion

Deletion MUST state:

```text
what is deleted
what is retained
retention timing
downstream effects
recovery window
```

where relevant.

---

# 134. Account Recovery Support

Support agents MUST NOT bypass account recovery controls merely because a customer requests help.

---

# 135. Recovery Verification

Recovery-support procedures MUST use approved identity verification.

---

# 136. Support Cannot Reveal Password

Support tools MUST NOT show users' passwords.

---

# 137. MFA Reset

Resetting/disabling MFA is high risk.

It SHOULD require:

```text
dedicated privilege
identity verification
step-up auth
audit
```

---

# 138. Email Change

Changing an account's primary email is equivalent to changing an important authentication/recovery identifier.

Treat it as high-risk.

---

# 139. Session Revocation

Support/admin tooling MAY revoke user sessions.

The action MUST be scoped and audited.

---

# 140. Session Inspection

Administrative session-inspection tooling MUST NOT expose raw session tokens.

---

# 141. API Key Administration

Admins SHOULD be able to:

```text
identify
revoke
rotate
```

API credentials without revealing secret material unnecessarily.

---

# 142. Feature Management

Feature-management UI MUST follow Feature Flag Guidelines.

---

# 143. Admin Tool Is Not Flag Authority

An admin UI is only the management interface.

Feature Flag Guidelines define:

```text
flag lifecycle
ownership
rollout
targeting
cleanup
```

---

# 144. Feature Permission

Reading flags and changing flags SHOULD be separate privileges.

---

# 145. Production Flag Change

Changing a production flag MUST be auditable.

---

# 146. High-Risk Flag

Flags affecting:

```text
authentication
authorization
billing
data migration
security
global kill switches
```

SHOULD receive stronger controls.

---

# 147. Rollout Preview

Feature-management UI SHOULD show:

```text
Environment
Current state
Targeting
Rollout percentage
Affected segment
Owner
Expiry
```

before modification.

---

# 148. Global Toggle Warning

A global production enable/disable SHOULD clearly communicate its blast radius.

---

# 149. Flag Override

Temporary account/tenant flag overrides SHOULD show:

```text
reason
owner
expiry
```

---

# 150. Configuration Management

Operational configuration changes follow Configuration & Environment Guidelines.

---

# 151. Admin Config UI

An admin configuration screen MUST NOT turn arbitrary environment configuration into uncontrolled runtime editing.

---

# 152. Config Classification

Only approved dynamic configuration belongs in runtime admin tools.

---

# 153. Static Config

Configuration requiring deployment/restart/source review SHOULD remain in the governed configuration pipeline.

---

# 154. Secret Management

Admin tools MUST NOT be general-purpose plaintext secret editors.

---

# 155. Secret Update

If secret rotation is exposed:

```text
new value write-only
existing value not revealed
audit metadata
```

is preferred.

---

# 156. Financial Actions

Refunds, credits, discounts, and balance adjustments MUST have explicit authorization.

---

# 157. Refund Scope

Refund screens SHOULD show:

```text
Original transaction
Amount paid
Already refunded
Maximum refundable
Requested refund
Currency
Reason
```

---

# 158. Refund Limits

Role-based monetary limits SHOULD apply where financial risk warrants.

---

# 159. Large Refund

Large/high-risk financial actions MAY require dual approval.

---

# 160. Currency Safety

Never perform financial admin actions with ambiguous currency.

---

# 161. Financial Audit

Financial administrative mutations MUST have durable audit records.

---

# 162. Moderation Tools

Moderation actions SHOULD distinguish:

```text
Hide
Remove
Suspend
Ban
Delete
Restore
```

with defined semantics.

---

# 163. Moderation Evidence

Moderators SHOULD have access only to evidence necessary for the action.

---

# 164. Moderation Reason

High-impact moderation actions SHOULD require a structured reason.

---

# 165. Moderation Appeal

If the product supports appeals, tooling SHOULD preserve sufficient reason/evidence/history for review.

---

# 166. User Administration

Administrative user management SHOULD expose:

```text
Identity
Status
Roles
Tenant memberships
Security state summary
Recent relevant events
```

subject to operator permission.

---

# 167. Role Assignment

Granting privileged roles is itself a privileged action.

---

# 168. Privilege Escalation Protection

An administrator SHOULD NOT be able to grant privileges exceeding their own delegated administrative authority unless explicitly permitted.

---

# 169. Role Change Audit

Record:

```text
Actor
Target user
Old role/permissions
New role/permissions
Reason
Time
```

---

# 170. Tenant Administration

Multi-tenant admin tooling MUST make current tenant context unmistakable.

---

# 171. Tenant Banner

When viewing/managing a tenant, display:

```text
Tenant name
Tenant identifier
Environment
```

in persistent context.

---

# 172. Tenant Isolation

Every admin data request MUST enforce tenant scope server-side.

---

# 173. Cross-Tenant Access

Cross-tenant access requires an explicit permission and legitimate operational purpose.

---

# 174. Cross-Tenant Search

Global search across tenants SHOULD be more restricted than within-tenant support search.

---

# 175. Tenant Switch

Tenant switching SHOULD be explicit.

Do not infer tenant from stale UI state.

---

# 176. Dangerous Tenant Context

High-impact actions SHOULD repeat the target tenant/resource in confirmation.

---

# 177. Production Data Browsers

Generic data-browser tools SHOULD default to read-only.

---

# 178. Arbitrary Query Tools

Arbitrary production query consoles are high risk and SHOULD be restricted to specialized roles.

---

# 179. Query Limits

Read tooling SHOULD enforce:

```text
row limits
timeouts
resource limits
```

where feasible.

---

# 180. Query Privacy

Support queries MUST not become an unrestricted mechanism for bulk personal-data discovery.

---

# 181. Production Search Logs

Sensitive admin query activity SHOULD be auditable.

---

# 182. Admin API

Privileged UI SHOULD call explicit server APIs/services rather than directly connecting browsers to databases or infrastructure control planes.

---

# 183. Admin API Authorization

Every endpoint MUST have explicit privileged authorization.

---

# 184. Hidden Internal Endpoint

A URL being undocumented or internal does not make it secure.

---

# 185. CSRF

Cookie-authenticated privileged mutations MUST have appropriate CSRF protection.

---

# 186. CORS

Admin APIs SHOULD have narrow intentional CORS policy.

---

# 187. Rate Limits

Privileged endpoints MAY still require rate and abuse controls.

---

# 188. Session Fixation

Admin authentication and elevation MUST follow secure session lifecycle rules.

---

# 189. Sensitive Page Caching

Privileged pages containing sensitive data SHOULD use appropriate cache-control policies.

---

# 190. Browser Storage

Admin tools SHOULD avoid persisting sensitive customer data in unnecessary browser storage.

---

# 191. Local Downloads

Sensitive admin downloads SHOULD require deliberate user action.

---

# 192. Clipboard

Clipboard access SHOULD not happen automatically for sensitive values.

---

# 193. Screenshot Risk

Admin tooling cannot fully prevent screenshots.

Therefore the UI SHOULD minimize unnecessary exposure of sensitive data.

---

# 194. Audit Logging

All material privileged activity MUST be auditable.

---

# 195. Audit vs Application Logs

Audit records are not merely ordinary debug/application logs.

They have a distinct integrity/accountability purpose.

---

# 196. Minimum Audit Event

A privileged audit record SHOULD include:

```text
Event ID
Timestamp
Actor identity
Actor privilege/context
Effective/impersonated subject if any
Environment
Action
Target
Tenant
Result
Reason
Request/correlation ID
```

---

# 197. Before/After

State-changing high-risk audit events SHOULD include:

```text
before
after
```

or an equivalent controlled diff when safe.

---

# 198. Sensitive Audit Content

Audit logs MUST NOT contain raw:

```text
passwords
tokens
session cookies
secret keys
```

---

# 199. Audit Reason

Where the operator supplied a reason/case, it SHOULD be recorded.

---

# 200. Failed Privileged Attempts

Unauthorized/failed privileged attempts SHOULD also be logged.

---

# 201. Audit Integrity

Audit data MUST be protected against unauthorized:

```text
modification
deletion
```

---

# 202. Audit Access

Access to audit records SHOULD itself be restricted and monitored.

---

# 203. Audit Administrator Separation

Where risk warrants, operators administering audit infrastructure SHOULD be separate from operators whose actions the logs record.

---

# 204. Audit Retention

Retention follows:

```text
security
privacy
legal
operational
```

requirements.

---

# 205. Audit Search

Authorized security/operations users SHOULD be able to query audit records by:

```text
actor
target
tenant
action
time range
case
```

---

# 206. Privileged Activity Timeline

Customer/support investigations MAY benefit from a normalized privileged-action timeline.

---

# 207. Alerting

Critical privileged events SHOULD trigger security/operational alerts.

Examples:

```text
Break-glass access
Privilege grant
Mass export
MFA reset
Production security config change
Large refund
Bulk delete
```

---

# 208. Alert Noise

Do not alert on every harmless admin page view.

Prioritize material risk.

---

# 209. Non-Repudiation

The system SHOULD make privileged activity attributable to the real human or machine identity performing it.

---

# 210. Operator Notes

Free-form operator notes SHOULD NOT be used as the sole audit record.

---

# 211. Operator Notes Privacy

Free-form notes SHOULD discourage unnecessary sensitive personal information.

---

# 212. Admin UI Design

Admin interfaces MAY be denser than consumer interfaces.

Density MUST NOT reduce:

```text
clarity
target size
focus visibility
confirmation quality
```

for high-risk controls.

---

# 213. Information Density

Prioritize operational information over decorative presentation.

---

# 214. Context Visibility

Admin pages SHOULD persistently show enough context to prevent acting on the wrong:

```text
environment
tenant
user
resource
```

---

# 215. High-Risk Action Placement

Dangerous actions SHOULD NOT be visually adjacent to frequent harmless actions without sufficient separation.

---

# 216. Color

Destructive styling MUST NOT rely solely on red.

---

# 217. Action Labels

Use explicit verbs:

```text
Suspend account
Revoke sessions
Reset MFA
Refund US$250
Delete tenant
```

---

# 218. Avoid Generic Admin Actions

Avoid:

```text
Execute
Run
Apply
Proceed
```

where specific action wording is possible.

---

# 219. Current State

Before an admin changes state, display the current state.

---

# 220. Expected New State

Where useful, preview the resulting state before execution.

---

# 221. Sensitive Data Masking

Masked data SHOULD be the default where full value is not necessary.

---

# 222. Pagination

Large admin datasets MUST paginate or otherwise bound retrieval.

---

# 223. Filter Preservation

Admin filters SHOULD survive navigation where this improves operational workflows without causing accidental action scope.

---

# 224. Bulk Selection Persistence

If bulk selection persists across pages, the UI MUST clearly communicate it.

---

# 225. Search Precision

Admin search SHOULD reduce the risk of selecting the wrong customer/resource.

Use multiple identifiers when ambiguity exists.

---

# 226. Similar Names

Do not rely on display name alone for high-risk operations.

Show stable identifiers/context.

---

# 227. Copy Identifier

Stable identifiers MAY be copyable for operational use.

Sensitive secret identifiers SHOULD not be.

---

# 228. Production Warning Fatigue

Do not put a scary confirmation on every production action.

Excessive warnings train operators to click through.

---

# 229. Risk-Calibrated Friction

Use friction where it changes behavior meaningfully.

---

# 230. Undo Over Confirmation

For safe reversible operations, prefer:

```text
perform
+
Undo
```

where practical.

---

# 231. Irreversible Action

Irreversible high-risk operations require stronger pre-execution review.

---

# 232. Support Macros

Support macros/automations MUST have the same authorization and audit controls as manually triggered operations.

---

# 233. Automation Identity

Automated support actions MUST record the triggering:

```text
operator
workflow
automation identity
```

where applicable.

---

# 234. Admin Scripts

One-off scripts modifying production are administrative tools and MUST follow privileged-access governance.

---

# 235. Script Review

High-impact production scripts SHOULD be:

```text
version controlled
reviewed
dry-run capable
bounded
observable
```

---

# 236. Script Credentials

Admin scripts MUST NOT use hard-coded production credentials.

---

# 237. Script Audit

The resulting production mutations SHOULD remain attributable and auditable.

---

# 238. Feature Management

Internal product controls such as:

```text
feature flags
entitlements
experiments
configuration
```

MUST remain semantically distinct.

---

# 239. Entitlements

Customer entitlements MUST NOT be implemented as ordinary temporary feature flags if they represent contractual authorization.

---

# 240. Internal Tool Discovery

Admin routes SHOULD NOT appear in ordinary customer navigation.

---

# 241. Obscurity

Hidden routes are not security boundaries.

---

# 242. Separate Application

A separate admin application MAY improve:

```text
blast-radius isolation
authentication policy
deployment
CSP
dependency surface
```

but is not mandatory for every product.

---

# 243. Separate Domain

Admin interfaces MAY use a dedicated domain/subdomain.

Authorization remains mandatory.

---

# 244. Network Boundary

Network restrictions MAY add defense in depth.

They MUST NOT replace identity and authorization.

---

# 245. CSP

Admin tools SHOULD use strong Content Security Policy appropriate to their capabilities.

---

# 246. Third-Party Scripts

Privileged admin surfaces SHOULD minimize third-party scripts.

---

# 247. Analytics

Customer-product analytics SDKs SHOULD NOT automatically run in privileged admin tools unless explicitly justified.

---

# 248. Session Replay

Session replay in admin tooling requires strong privacy/security review and SHOULD generally exclude sensitive information.

---

# 249. Browser Extensions

Highly privileged environments SHOULD account for endpoint/browser-extension risk through device-security policy where warranted.

---

# 250. Admin Dependencies

Admin tools follow Dependency Guidelines.

Do not accept poorly maintained UI/data-grid packages merely because the tool is internal.

---

# 251. "Internal Tool" Quality

Internal tooling is production software.

It requires:

```text
security
testing
error handling
ownership
documentation
```

appropriate to its risk.

---

# 252. Prototype Admin Tools

A temporary internal script/tool MUST NOT silently become permanent production infrastructure without governance.

---

# 253. Error Handling

Admin errors SHOULD be more operationally informative than consumer errors without exposing unnecessary secrets.

---

# 254. Correlation ID

Failures SHOULD expose a safe correlation/reference ID.

---

# 255. Partial Failure

Admin tools MUST communicate when an operation:

```text
partially succeeded
```

rather than showing a generic success.

---

# 256. Unknown Outcome

If the client cannot determine whether a privileged mutation succeeded, the UI MUST NOT encourage blind repetition.

---

# 257. Reconciliation

Unknown-outcome high-risk operations SHOULD offer status lookup/reconciliation.

---

# 258. Idempotency

Privileged financial/bulk/state-changing operations SHOULD use idempotency where duplicate execution is harmful.

---

# 259. Concurrency

Admin tools MUST handle conflicting operator actions safely.

---

# 260. Optimistic Locking

Version checks/ETags/revision numbers SHOULD be used where simultaneous edits can overwrite important state.

---

# 261. Stale Data

Before executing a high-risk action based on stale data, the system SHOULD revalidate relevant current state server-side.

---

# 262. Approval Race

Approval workflows MUST ensure the approved object has not changed before execution.

---

# 263. Maintenance Mode

Operational modes affecting many users MUST be clearly scoped and audited.

---

# 264. Kill Switch

Emergency operational switches SHOULD be:

```text
fast
authorized
auditable
reversible
```

---

# 265. Kill Switch Testing

A kill switch that has never been tested is not reliable emergency tooling.

---

# 266. Production Access Monitoring

Privileged production sessions SHOULD be observable.

---

# 267. Session Start/End

Record privileged session/elevation:

```text
start
end
duration
```

where the access system supports it.

---

# 268. Command Audit

Infrastructure/database privileged commands SHOULD be logged where the platform supports secure audit.

---

# 269. Sensitive Read Audit

Reading certain high-sensitivity records MAY warrant audit, not only modification.

---

# 270. Privacy Access Reports

Organizations MAY provide periodic reports of who accessed restricted personal data where policy requires it.

---

# 271. Support Data Boundaries

Support roles SHOULD be designed around legitimate support workflows rather than database schemas.

---

# 272. Minimum Necessary View

The support tool SHOULD answer:

```text
What does this agent need to solve this case?
```

not:

```text
What can the database expose?
```

---

# 273. Customer Consent

Some support operations MAY require explicit customer approval before accessing or acting on customer data.

This should be a policy-driven workflow.

---

# 274. Customer-Visible History

Selected staff actions MAY be shown to customers in account/security history when transparency improves trust and risk management.

---

# 275. Support Attachments

Customer-provided support attachments follow File & Media and Privacy Guidelines.

---

# 276. Malware Handling

Internal tools displaying uploaded files SHOULD preserve file-scanning/sandboxing protections.

---

# 277. HTML Content

Admin views MUST NOT render user-controlled HTML unsafely merely because the audience is staff.

---

# 278. Stored XSS

Admin/support tools are attractive targets for stored XSS.

Untrusted customer content MUST remain safely encoded/sanitized.

---

# 279. CSV Injection

Administrative exports MUST protect against spreadsheet-formula injection where relevant.

---

# 280. URL Safety

Links supplied by users/customers SHOULD be treated as untrusted.

---

# 281. Support Messaging

Support tools sending email/SMS/push MUST follow Notifications and Email Guidelines.

---

# 282. Template Approval

Support agents SHOULD use approved message templates for high-risk communications where consistency matters.

---

# 283. Free-Form Messaging

Free-form communication MAY remain available when necessary but requires appropriate audit/privacy controls.

---

# 284. Production Feature Testing

Admin tools SHOULD have dedicated test tenants/accounts in production where operational testing is necessary and safe.

---

# 285. Test Accounts

Production test accounts MUST be clearly identifiable and excluded from inappropriate business/analytics processes where possible.

---

# 286. Never Test on Random Customers

Operators MUST NOT use arbitrary real customer accounts for routine admin-tool experimentation.

---

# 287. Sandbox

High-risk admin flows SHOULD have a safe staging/sandbox environment for training and testing.

---

# 288. Training

Operators receiving high-impact privileges SHOULD receive role-appropriate training.

---

# 289. Operational Documentation

Privileged workflows SHOULD document:

```text
When to use
Required permission
Risk
Procedure
Rollback/recovery
Audit expectations
Escalation
```

---

# 290. Runbooks

Critical operations SHOULD have runbooks.

---

# 291. Tooltips Are Not Runbooks

Do not hide complex operational policy only inside UI tooltips.

---

# 292. Human Error

Admin UX MUST assume competent operators can still make mistakes.

---

# 293. Safety Design

Prefer controls that prevent errors structurally rather than relying on perfect attention.

---

# 294. Safe Defaults

Defaults SHOULD minimize blast radius.

Examples:

```text
Current tenant
Read-only
Small batch
Dry-run
Non-production
```

where appropriate.

---

# 295. Dangerous Defaults

Avoid defaults such as:

```text
All tenants
All users
Global enable
Permanent access
Hard delete
```

for ordinary workflows.

---

# 296. Environment Default

Tools capable of accessing multiple environments SHOULD default to the least risky relevant environment unless operational needs require otherwise.

---

# 297. Production Entry

Entering production privileged context SHOULD be deliberate.

---

# 298. High-Risk Search Result

Before acting on a search result, high-risk workflows SHOULD require explicit target selection rather than acting on the top result automatically.

---

# 299. Auditability Definition

A privileged action is properly auditable when investigators can answer:

```text
Who acted?
As whom/effective subject?
When?
From what context?
On what?
What changed?
Why?
Was it allowed?
Did it succeed?
```

---

# 300. Privileged Action Taxonomy

Audit taxonomy SHOULD distinguish actions such as:

```text
admin.login
admin.elevate
admin.impersonation.start
admin.impersonation.end
user.role.change
user.mfa.reset
user.session.revoke
tenant.delete
data.export
feature_flag.change
config.change
billing.refund
break_glass.use
```

---

# 301. Audit IDs

Privileged mutations SHOULD generate stable event IDs.

---

# 302. Correlation

Audit events SHOULD correlate with:

```text
request
job
approval
ticket
incident
```

when applicable.

---

# 303. Audit Time

Audit timestamps MUST use authoritative synchronized time.

---

# 304. Before/After Privacy

Before/after diffs SHOULD mask secrets and unnecessary sensitive values.

---

# 305. Audit Failure

A high-risk operation SHOULD fail safely if mandatory audit recording cannot be guaranteed, where architecture permits.

---

# 306. Audit Pipeline Failure

At minimum, loss of privileged audit capability MUST trigger operational alerting.

---

# 307. Audit Deletion

Ordinary administrators SHOULD NOT be able to delete their own privileged audit history.

---

# 308. Admin Access Review Checklist

```text
□ Role still required
□ User still employed/assigned
□ Permissions still minimum necessary
□ Production access justified
□ Break-glass membership justified
□ Inactive privilege removed
□ Service identities owned
```

---

# 309. New Admin Feature Checklist

```text
□ Legitimate operator use case
□ Correct role
□ Dedicated permission
□ Server authorization
□ Object/tenant scope
□ Risk classification
□ Audit event
□ Failure behavior
□ Sensitive-data minimization
□ Accessibility
□ Tests
□ Owner
```

---

# 310. High-Risk Action Checklist

```text
□ Exact actor
□ Exact target
□ Environment visible
□ Tenant visible
□ Current state
□ Proposed state
□ Authorization
□ Step-up auth if needed
□ Approval if needed
□ Explicit confirmation
□ Reversibility
□ Audit
□ Alerting
```

---

# 311. Impersonation Checklist

```text
□ Dedicated permission
□ Case/reason
□ Time-limited
□ Operator identity retained
□ Effective user recorded
□ Persistent banner
□ Clear exit
□ Read-only preferred
□ Restricted actions blocked
□ Start/end audited
□ Customer notification policy defined
```

---

# 312. Production Access Checklist

```text
□ Least privilege
□ JIT where possible
□ Strong MFA
□ Managed device/network policy
□ Reason/ticket
□ Approval where required
□ Automatic expiry
□ Read-only first
□ Session logged
□ Commands/actions auditable
□ Post-event review where needed
```

---

# 313. Support Tool Checklist

```text
□ Case context
□ Minimum customer data
□ Masking
□ Reveal-on-demand
□ Search restrictions
□ Tenant isolation
□ No secret reveal
□ Impersonation controlled
□ Mutations explicit
□ Audit timeline
```

---

# 314. Bulk Action Checklist

```text
□ Scope unambiguous
□ Count displayed
□ Preview
□ Dry run where feasible
□ Batch limits
□ Idempotency
□ Partial failure model
□ Retry failed subset
□ Rollback where possible
□ Audit
```

---

# 315. Feature Management Checklist

```text
□ Read/write permissions separate
□ Environment explicit
□ Owner visible
□ Current state
□ Targeting visible
□ Rollout visible
□ Blast radius
□ Expiry/cleanup
□ High-risk approval if required
□ Audit
```

---

# 316. Production Data Checklist

```text
□ Need established
□ Read-only path considered
□ Minimum fields
□ Tenant scope
□ Restricted data permission
□ Export limits
□ No local copy
□ Access audited
□ Retention respected
```

---

# 317. Audit Checklist

```text
□ Actor
□ Effective subject
□ Timestamp
□ Environment
□ Tenant
□ Action
□ Target
□ Before/after where useful
□ Result
□ Reason
□ Correlation ID
□ Secrets excluded
□ Integrity protected
```

---

# 318. Definition of Done — New Admin Tool

An admin/internal tool is production-ready when:

```text
✓ Operator use case defined
✓ Threat/risk reviewed
✓ Roles and permissions defined
✓ Server-side authorization implemented
✓ Tenant/object boundaries tested
✓ Strong authentication integrated
✓ Audit events defined
✓ High-risk actions classified
✓ Production environment obvious
✓ Sensitive data minimized
✓ Error/unknown-outcome behavior defined
✓ Accessibility verified
✓ Automated tests pass
✓ Operator documentation/runbook exists
✓ Owner assigned
```

---

# 319. Definition of Done — Impersonation

```text
✓ Dedicated permission
✓ Strong authentication
✓ Reason/case required
✓ Duration bounded
✓ Real actor preserved
✓ Effective identity recorded
✓ Persistent UI indicator
✓ Exit control
✓ Restricted operations defined
✓ Read-only mode supported where appropriate
✓ Start/end/actions audited
✓ Tenant isolation tests
✓ Session isolation tests
```

---

# 320. Definition of Done — Production Privilege

```text
✓ Business/operational need
✓ Least privilege
✓ JIT model where feasible
✓ Approval rules
✓ MFA
✓ Device/network requirements
✓ Automatic expiration
✓ Audit coverage
✓ Monitoring
✓ Emergency/break-glass model
✓ Access review cadence
✓ Offboarding integration
```

---

# 321. Definition of Done — High-Risk Action

```text
✓ Explicit permission
✓ Object authorization
✓ Current state revalidated
✓ Target/context visible
✓ Step-up auth if required
✓ Approval if required
✓ Consequences stated
✓ Idempotency where applicable
✓ Audit durable
✓ Alerting where applicable
✓ Recovery/rollback known
```

---

# 322. Admin & Internal Tools Anti-Patterns

Avoid:

```text
role === "admin"
→ allow everything
```

Avoid:

```text
internal network
→ trusted
```

Avoid:

```text
button hidden
→ secure
```

Avoid:

```text
/admin-secret-url
```

as access control.

Avoid permanent:

```text
everyone in engineering = production admin
```

Avoid shared:

```text
root
admin
support
```

human accounts.

Avoid:

```text
support can read all customer data
```

because it is convenient.

Avoid:

```text
support.read
→ impersonation
```

implicitly.

Avoid impersonation with no banner.

Avoid impersonation with no expiry.

Avoid audit records showing only:

```text
user_id = customer
```

when a staff operator actually acted.

Avoid:

```text
impersonate
→ change password
```

without separate authorization.

Avoid:

```text
View as user
```

that secretly creates a full write-capable customer session.

Avoid:

```text
production and staging look identical
```

Avoid:

```text
environment inferred from hostname
```

as the only indicator.

Avoid:

```text
production database editor
```

as normal support workflow.

Avoid routine manual SQL updates.

Avoid:

```text
download customer database
→ investigate locally
```

Avoid displaying raw session tokens.

Avoid displaying password hashes as if useful support data.

Avoid exposing secret API keys after creation.

Avoid:

```text
Reveal PII
```

with no reason or audit for high-sensitivity fields.

Avoid unrestricted:

```text
Export all customers
```

for normal support roles.

Avoid bulk action where:

```text
Select all
```

has ambiguous scope.

Avoid:

```text
Delete
```

when action really means suspend/archive.

Avoid:

```text
Are you sure?
```

as the only high-risk context.

Avoid typing:

```text
DELETE
```

for every routine action.

Avoid self-approval in maker-checker workflows.

Avoid approval that remains valid after the requested values change.

Avoid:

```text
global feature flag
```

changed with no audit.

Avoid feature flags used to bypass authorization.

Avoid:

```text
runtime config editor
```

for every environment variable.

Avoid secret plaintext editor.

Avoid:

```text
refund amount
```

without currency/current refundable balance.

Avoid:

```text
refund
```

with unlimited role authority.

Avoid:

```text
MFA reset
```

as ordinary low-risk support action.

Avoid account email changes without identity/security controls.

Avoid generic admin API endpoints with no object authorization.

Avoid direct browser-to-production-database connectivity.

Avoid permissive admin CORS because "only staff use it."

Avoid third-party analytics/session replay blindly added to privileged tools.

Avoid storing copied customer records in browser localStorage unnecessarily.

Avoid user HTML rendered unsafely in support tools.

Avoid CSV exports vulnerable to formula injection.

Avoid one-off production scripts outside source control.

Avoid scripts with embedded production credentials.

Avoid:

```text
manual prod fix
```

that is never reconciled into code/config.

Avoid break-glass access with no alert.

Avoid permanent break-glass membership for broad teams.

Avoid audit logs operators can edit/delete freely.

Avoid privileged audit logs containing secrets.

Avoid logging only successful admin actions.

Avoid warning banners on every harmless operation until operators ignore all warnings.

Avoid overly decorative consumer-style UI that obscures operational state.

Avoid test actions on random real customers.

Avoid temporary internal tools with no owner becoming permanent critical infrastructure.

---

# 323. AI Admin & Internal Tools Rules

AI coding agents MUST treat every administrative capability as privileged by default.

---

# 324. AI Authorization Rule

AI MUST implement server-side authorization for every privileged operation.

---

# 325. AI UI Rule

AI MUST NOT treat hidden/disabled UI controls as an authorization mechanism.

---

# 326. AI Least-Privilege Rule

AI SHOULD introduce the narrowest useful permission rather than granting a universal admin role.

---

# 327. AI Tenant Rule

AI MUST enforce tenant/object boundaries even for privileged users unless explicit cross-tenant permission exists.

---

# 328. AI Production Rule

AI MUST make production context visually explicit in privileged interfaces.

---

# 329. AI JIT Rule

AI SHOULD prefer temporary elevation over permanent broad production access.

---

# 330. AI Break-Glass Rule

AI MUST design break-glass access as exceptional, short-lived, logged, and alerted.

---

# 331. AI Impersonation Rule

AI MUST preserve both:

```text
real operator
effective user
```

identities during impersonation.

---

# 332. AI Impersonation UI Rule

AI MUST provide a persistent impersonation indicator and exit action.

---

# 333. AI Impersonation Scope Rule

AI SHOULD default impersonation to the narrowest capability, preferably read-only where sufficient.

---

# 334. AI Secret Rule

AI MUST prefer:

```text
revoke
reset
rotate
```

over revealing existing secrets.

---

# 335. AI Sensitive-Data Rule

AI SHOULD mask high-sensitivity data by default.

---

# 336. AI Audit Rule

AI MUST create auditable events for material privileged operations.

---

# 337. AI Audit-Secrets Rule

AI MUST exclude secrets, session tokens, passwords, and raw credentials from audit logs.

---

# 338. AI High-Risk Rule

AI SHOULD classify destructive, financial, security, permission, export, and global configuration actions as high risk.

---

# 339. AI Confirmation Rule

AI MUST include target/scope/consequence in high-risk confirmations.

---

# 340. AI Approval Rule

AI MUST invalidate approval if the approved action changes before execution.

---

# 341. AI Bulk Rule

AI MUST make bulk-action scope explicit and handle partial failures.

---

# 342. AI Production-Data Rule

AI SHOULD prefer read-only supported administrative APIs over direct production-database modification.

---

# 343. AI Feature-Flag Rule

AI MUST defer flag lifecycle, targeting, rollout, and cleanup semantics to Feature Flag Guidelines.

---

# 344. AI Config Rule

AI MUST NOT expose arbitrary static/secret environment configuration through runtime admin UI without an approved configuration model.

---

# 345. AI Support Rule

AI MUST NOT make all user data available to support roles simply because it simplifies implementation.

---

# 346. AI Error Rule

AI MUST distinguish:

```text
failed
partially succeeded
unknown outcome
```

for privileged operations.

---

# 347. AI Idempotency Rule

AI SHOULD use idempotency for privileged mutations where duplicate execution would be harmful.

---

# 348. AI Script Rule

AI MUST treat production maintenance scripts as privileged production tools subject to review, authorization, and audit.

---

# 349. AI Third-Party Rule

AI SHOULD minimize third-party scripts and session replay on privileged surfaces.

---

# 350. AI Gold Rule

When uncertain:

```text
Read-only
>
Narrow mutation
>
Broad mutation
```

```text
Temporary access
>
Permanent privilege
```

```text
Specific permission
>
Universal admin
```

```text
Revoke/rotate
>
Reveal secret
```

```text
Reversible
>
Irreversible
```

---

# 351. Golden Admin & Internal Tools Rules

**1. Internal does not mean trusted.**

**2. Administrative interfaces are high-trust security boundaries.**

**3. Every privileged operation is authorized server-side.**

**4. Hidden buttons are never authorization controls.**

**5. Default deny applies to administrative capabilities.**

**6. Least privilege is the default administrative access model.**

**7. Universal super-admin roles are minimized.**

**8. Permissions describe concrete administrative capabilities.**

**9. Privilege does not automatically bypass business invariants.**

**10. Exceptional overrides use explicit separate authority.**

**11. High-risk duties are separated where abuse or error warrants it.**

**12. Users do not approve their own protected operations.**

**13. Privileged access uses strong authentication.**

**14. Phishing-resistant MFA is preferred for privileged identities.**

**15. Critical actions may require recent step-up authentication.**

**16. Ordinary work should not require always-on privileged state.**

**17. Production privilege should be just-in-time and automatically expiring where feasible.**

**18. Standing privileged access is reviewed periodically.**

**19. Privilege is revoked promptly after role or employment changes.**

**20. Break-glass access is exceptional, short-lived, alerted, and reviewed.**

**21. Shared human administrator accounts are prohibited by default.**

**22. Automated administrative processes use dedicated service identities.**

**23. Production, staging, and development are unmistakably distinguishable.**

**24. Production access is for operation and recovery, not ordinary development.**

**25. Normal production changes flow through governed deployment/configuration mechanisms.**

**26. Manual production changes are exceptional and reconciled afterward.**

**27. Read-only production investigation is preferred before write access.**

**28. Direct database writes are not normal support tooling.**

**29. Customer data is not copied casually to local machines or spreadsheets.**

**30. Support tools expose only the minimum data needed for the support task.**

**31. Highly sensitive values are masked by default where possible.**

**32. Revealing sensitive information may itself require audit.**

**33. Existing passwords, session tokens, and private secrets are never exposed through ordinary admin UI.**

**34. Reset/revoke/rotate is preferred to secret revelation.**

**35. Bulk exports are high-risk privileged operations.**

**36. Sensitive exports are minimized, audited, and expire.**

**37. Impersonation has a dedicated privilege.**

**38. Impersonation always remains visibly obvious to the operator.**

**39. The real operator identity is never lost during impersonation.**

**40. Audit events distinguish operator from effective impersonated user.**

**41. Impersonation is time-limited.**

**42. Read-only view-as-user is preferred where it solves the support need.**

**43. Write-capable impersonation requires stronger governance.**

**44. Some security and ownership actions remain prohibited even during impersonation unless separately authorized.**

**45. Impersonation never requires or reveals the user's credentials.**

**46. High-risk actions are explicitly classified.**

**47. Higher risk receives stronger authorization, authentication, confirmation, approval, and audit.**

**48. Confirmation is not a substitute for authorization.**

**49. High-risk confirmations state target, scope, consequence, and reversibility.**

**50. Generic Yes/No confirmations are avoided for meaningful administrative actions.**

**51. Typed confirmation is reserved for unusually consequential actions.**

**52. Two-person approval is used selectively where risk warrants it.**

**53. Approved actions cannot change underneath an existing approval.**

**54. Bulk-action scope is always explicit.**

**55. "Select all" states exactly what population is selected.**

**56. High-risk bulk operations support preview/dry-run where practical.**

**57. Bulk jobs define partial failure and retry semantics.**

**58. Reversible administrative actions prefer restore/undo where feasible.**

**59. Delete, suspend, archive, disable, and hard delete remain distinct lifecycle operations.**

**60. Support staff do not bypass approved identity-recovery controls.**

**61. MFA resets and primary email changes are high-risk operations.**

**62. Session-management tooling never reveals raw session tokens.**

**63. Feature-management UI follows Feature Flag governance rather than inventing independent semantics.**

**64. Production feature changes are audited.**

**65. Runtime administration exposes only configuration designed to be dynamically managed.**

**66. Admin UI is not a general-purpose plaintext secret manager.**

**67. Financial operations show exact amount, currency, scope, and remaining limits.**

**68. High-value financial adjustments may require additional approval.**

**69. Role assignment is itself privileged.**

**70. Administrators cannot grant privileges beyond their delegated authority by default.**

**71. Multi-tenant admin tooling always makes tenant context explicit.**

**72. Tenant boundaries are enforced server-side on every admin request.**

**73. Cross-tenant support access is separately authorized.**

**74. Browser-based admin UI calls explicit privileged APIs rather than direct databases.**

**75. Hidden/internal URLs are not security controls.**

**76. Admin APIs receive CSRF, CORS, session, input-validation, and rate-control protections as applicable.**

**77. Sensitive admin pages avoid unnecessary persistent browser storage.**

**78. Every material privileged action produces an audit event.**

**79. Audit records contain the real actor, target, action, context, result, and reason where relevant.**

**80. Privileged audit records exclude credentials and secrets.**

**81. Failed privileged attempts are logged as well as successful ones.**

**82. Audit data is protected against unauthorized modification/deletion.**

**83. Access to audit logs is itself privileged and monitored.**

**84. Ordinary administrators cannot erase evidence of their own actions.**

**85. Critical privileged events generate appropriate security/operations alerts.**

**86. Production warning friction is risk-calibrated to avoid warning fatigue.**

**87. Administrative UI prioritizes operational clarity over decoration.**

**88. Environment, tenant, user, and target context remain visible when mistakes would be costly.**

**89. Dangerous actions are separated from routine actions visually and semantically.**

**90. Support macros and automations receive the same authorization/audit treatment as manual actions.**

**91. Production maintenance scripts are versioned privileged tooling.**

**92. Privileged scripts do not contain embedded production credentials.**

**93. Internal tools receive production-grade security, testing, and ownership according to their risk.**

**94. Temporary tooling is not allowed to become permanent critical infrastructure without governance.**

**95. Partial success and unknown outcomes are surfaced explicitly.**

**96. Duplicate high-risk actions are prevented through idempotency where applicable.**

**97. Concurrent operator edits are detected where lost updates would be dangerous.**

**98. Admin tools assume human error is possible and use safe defaults to reduce blast radius.**

**99. Dangerous defaults such as all tenants, global enable, permanent access, and hard delete are avoided.**

**100. If investigators cannot determine who performed a privileged action, under what effective identity, against which resource, why, and with what result, the administrative system is not production-grade.**

---

# 352. Canonical Admin & Internal Tools Standard

The organizational standard is:

> **Administrative and internal tools are treated as privileged production systems rather than trusted shortcuts. Every privileged function uses strong identity, explicit server-side authorization, least privilege, object- and tenant-aware access control, secure session handling, and complete auditability. Internal network placement, hidden routes, corporate employment, or a disabled button never replaces these controls.**

> **Administrative permissions are task-oriented and narrowly scoped. Broad super-admin capability is minimized, sensitive business-rule overrides have separate authority, and separation-of-duties or independent approval is applied where financial, security, compliance, or operational risk warrants it. Standing production privileges are reviewed and minimized; elevated access is preferably just-in-time, reason-bound, automatically expiring, and protected by strong MFA and appropriate device/network controls.**

> **Production access favors the least dangerous interface capable of solving the problem. Operators use observability, approved admin APIs, and read-only support tooling before direct shells, databases, or infrastructure control planes. Manual production mutation is exceptional, auditable, bounded, and reconciled with the authoritative configuration, source, or deployment system so emergency changes do not become invisible permanent drift.**

> **Support tooling applies privacy-by-design. Operators see only the customer records and fields necessary for the current legitimate support task, highly sensitive values are masked or revealed only through separately governed actions, bulk exports are restricted and auditable, and passwords, raw session credentials, signing keys, and other recoverable-by-rotation secrets are never exposed simply because an operator has administrative access.**

> **Impersonation is a dedicated high-risk capability. It requires explicit permission and legitimate support context, remains time-limited and visibly indicated throughout the session, preserves the real operator identity separately from the effective customer identity, records start/end and material actions, enforces tenant boundaries, and preferably operates read-only where that solves the support case. Write-capable impersonation does not automatically grant account-recovery, ownership-transfer, credential, billing, or security-sensitive capabilities.**

> **High-risk administrative mutations are designed for operator safety. Interfaces show the current environment, tenant, target, relevant current state, proposed state, blast radius, consequence, and reversibility; sensitive operations may require recent step-up authentication or independent approval; bulk operations expose exact scope and support preview or dry-run where practical; and reversible controls are preferred to irreversible destruction where product semantics permit.**

> **Administrative management interfaces do not redefine the systems they manage. Feature-management UI follows Feature Flag governance, runtime configuration UI follows Configuration & Environment governance, production deployment remains governed by CI/CD, entitlements remain authorization/business contracts rather than temporary flags, and secrets remain under dedicated secrets-management architecture rather than becoming editable plaintext fields in a generic admin console.**

> **Privileged activity produces durable security-grade audit evidence. Records identify the actual human or service actor, any impersonated/effective subject, environment, tenant, target, action, result, reason, correlation context, and meaningful before/after state while excluding passwords, session tokens, private keys, and other secrets. Failed authorization attempts and break-glass access are logged; audit data is protected against tampering; and administrators cannot silently remove the evidence of their own actions.**

> **Internal tooling is production software. It receives secure coding, authorization tests, tenant-boundary testing, accessibility, error and concurrency handling, dependency review, monitoring, ownership, documentation, incident procedures, and lifecycle maintenance appropriate to its blast radius. Stored customer content remains untrusted, third-party scripts are minimized, production scripts are governed, and temporary operational tooling cannot quietly evolve into critical infrastructure without formal ownership and review.**

A production-grade privileged tooling system should make it easy to answer:

```text
Who can access this tool?
Which exact privilege allows this action?
Is authorization checked server-side?
Can the operator access every tenant or only specific scope?
Is production unmistakably visible?
Is elevation temporary?
Why does this operator currently have production access?
When does that access expire?
What strong authentication protects it?
Can this task be performed read-only?
Does the operator need to see this sensitive field?
Can the value be reset rather than revealed?
What happens when impersonation begins?
Who is the real actor during impersonation?
Which actions remain prohibited while impersonating?
How is impersonation ended?
Does this action require step-up authentication?
Does it require another approver?
Can the approver see exactly what will change?
Can approval become stale?
What population does this bulk action affect?
Can the operation be previewed or dry-run?
What happens on partial failure?
Can it be undone?
What audit event is emitted?
Does the audit record include actor, target, reason, before/after, and result?
Can the actor delete that audit evidence?
What happens if audit infrastructure is unavailable?
Can two operators overwrite each other?
What happens if the result is unknown?
Who owns this tool?
How is production access reviewed and revoked?
```

If those questions cannot be answered reliably, the organization has internal functionality, but it does not yet have a governed privileged-operations architecture.

The external security baseline strongly supports these controls. NIST SP 800-53 defines both **separation of duties** and **least privilege**, including restricting privileged accounts, using non-privileged access for ordinary functions, periodically reviewing assigned privileges, and logging execution of privileged functions. citeturn357034search48turn357034search49turn357034search50

OWASP's current authorization guidance likewise emphasizes that authentication does not imply authorization, and privileged access must be enforced against the specific resource and operation. Its business-logic guidance explicitly recommends checking authorization on every request and warns that internal/admin entry points must enforce the same business invariants as public paths. citeturn926210search0turn926210search2

For privileged auditability, OWASP's Logging Cheat Sheet specifically calls out user administration, privilege changes, administrator activity, break-glass use, sensitive-data access, imports/exports, and configuration changes as high-risk events that should be logged, while also requiring log protection against unauthorized modification or deletion. citeturn357034search0

For production/admin access, current CISA guidance describes secure administration using strong authentication such as phishing-resistant MFA and says privileged access should be available only for the duration necessary, with on-demand authorization where feasible. OWASP's Zero Trust guidance similarly recommends separate admin access, just-in-time elevation, and avoiding permanent admin rights. citeturn357034search51turn926210search6

Canonical master placement:

**… → Framework → Security → Authentication & Authorization → Admin & Internal Tools → Data & Database → API → Routes → …**
