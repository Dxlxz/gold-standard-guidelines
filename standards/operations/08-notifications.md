---
id: "notifications"
title: "Notifications Guidelines — Gold Standard 2026"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["operations", "notifications"]
applies_to: ["infra"]
related: ["analytics", "internationalization", "routes", "privacy-data-governance", "dependency"]
legacy_number: 35
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 66364
provenance: baseline

---

Canonical placement: **Search → Notifications → Internationalization**. Notifications depend on background jobs, preferences/state, localization, analytics/privacy, and external delivery providers, but remain their own user-facing delivery subsystem.

# Notifications Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- email;
- mobile push;
- web push;
- in-app notifications;
- SMS;
- notification preferences;
- subscriptions;
- consent;
- transactional notifications;
- marketing notifications;
- security notifications;
- system notifications;
- templates;
- localization;
- personalization;
- quiet hours;
- urgency;
- retries;
- rate limits;
- deduplication;
- delivery state;
- scheduling;
- batching;
- digests;
- provider integration;
- deliverability;
- device tokens;
- unsubscribe;
- suppression;
- observability;
- retention;
- notification analytics.

The objective is to make notifications:

```text
Relevant
Authorized
Timely
Deduplicated
Respectful
Localized
Observable
Reliable
Recoverable
Compliant
```

The core principle is:

> **A notification is an interruption delivered on behalf of the product. The system must send the right information, to the right recipient, through an appropriate channel, at an appropriate time, no more often than necessary.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Notification type
Reason
Audience
Channel
User impact
Privacy/compliance impact
Owner
Review date
```

---

# 3. Notifications Are Product Behavior

Notifications are not merely transport calls such as:

```text
sendEmail()
sendSMS()
push()
```

A production notification system includes:

```text
Event / user intent
↓
Notification policy
↓
Recipient resolution
↓
Preference/consent evaluation
↓
Channel selection
↓
Template rendering
↓
Scheduling / quiet-hour rules
↓
Delivery job
↓
Provider
↓
Delivery outcome
↓
Analytics / suppression / retry
```

---

# 4. Notification Taxonomy

Every notification type MUST have a declared category.

Recommended categories:

```text
Security
Transactional
Operational
Product
Social
Reminder
Marketing
```

---

# 5. Security Notification

Security notifications communicate events such as:

```text
password changed
MFA changed
new login
recovery initiated
suspicious activity
```

They generally have stronger delivery requirements and fewer suppression options.

---

# 6. Transactional Notification

Transactional notifications communicate information directly related to an action or service relationship.

Examples:

```text
order confirmation
invoice ready
payment receipt
ticket update
export completed
```

---

# 7. Operational Notification

Operational notifications communicate system/workflow state.

Examples:

```text
deployment completed
job failed
quota threshold reached
service degradation
```

---

# 8. Product Notification

Product notifications communicate relevant product activity.

Examples:

```text
comment mention
workspace invitation
task assigned
document shared
```

---

# 9. Reminder

A reminder prompts action concerning an existing user intent or obligation.

Examples:

```text
appointment tomorrow
invoice due
draft incomplete
```

---

# 10. Marketing Notification

Marketing communications promote:

```text
offers
new products
campaigns
upsells
newsletters
```

and require separate preference/consent treatment.

---

# 11. Marketing Is Not Transactional

Do not classify:

```text
Your invoice is ready — and upgrade now for 30% off!
```

as purely transactional merely because it contains transactional content.

Promotional content can change the communication's regulatory and preference treatment.

---

# 12. Security Is Not Marketing

Critical account-security communications MUST NOT depend on marketing subscription status.

---

# 13. Notification Definition

Every notification type SHOULD have a registry entry containing:

```text
notification_key
category
purpose
owner
eligible recipients
supported channels
default channel
preference behavior
urgency
quiet-hour behavior
deduplication model
expiry
template IDs
analytics events
```

---

# 14. Stable Notification Key

Each notification type MUST have a stable semantic identifier.

Example:

```text
billing.invoice_paid
workspace.member_invited
security.password_changed
```

---

# 15. Avoid UI-Based Names

Bad:

```text
email_17
blue_banner_notification
push_new
```

Good:

```text
projects.comment_mentioned
```

---

# 16. Ownership

Every notification type MUST have an accountable owner.

The owner is responsible for:

```text
purpose
copy
preference behavior
delivery policy
template lifecycle
metrics
retirement
```

---

# 17. Notification Necessity Test

Before adding a notification ask:

```text
What user need does it serve?
What happens if it is not sent?
Is the information already visible elsewhere?
Does it require interruption?
Which channel is appropriate?
Can it be batched?
```

---

# 18. Do Not Notify Everything

A product event does not automatically imply a notification.

Bad:

```text
event emitted
→ notification sent
```

---

# 19. Notification Budget

Products SHOULD consider notification volume as a limited attention budget.

Excessive messaging causes:

```text
notification fatigue
mute/unsubscribe
app uninstall
spam complaints
ignored critical messages
```

---

# 20. Channel Taxonomy

Canonical channels:

```text
In-app
Email
Mobile push
Web push
SMS
```

Additional channels MAY include:

```text
voice
chat integrations
webhooks
```

but follow separate channel-specific policy.

---

# 21. Channel Selection

Channel SHOULD match:

```text
urgency
content length
sensitivity
user preference
delivery reliability
cost
```

---

# 22. In-App

In-app notifications are appropriate for product activity visible while users interact with the product.

---

# 23. Email

Email is appropriate for:

```text
durable messages
longer content
receipts
invitations
account notices
```

---

# 24. Push

Push is suitable for:

```text
timely
short
actionable
```

information.

Push SHOULD NOT be treated as guaranteed delivery.

---

# 25. SMS

SMS SHOULD be reserved for use cases where:

```text
immediacy matters
phone delivery is appropriate
cost is justified
user expectation exists
```

---

# 26. SMS Scarcity

Do not use SMS for routine high-volume product activity when less intrusive channels suffice.

---

# 27. Multi-Channel Notification

A notification MAY use multiple channels.

Example:

```text
security alert
→ email + push
```

but multi-channel delivery MUST NOT create unnecessary duplication.

---

# 28. Escalation

A system MAY escalate:

```text
in-app
↓
push
↓
email
↓
SMS
```

based on urgency/non-response where the product requires it.

---

# 29. Escalation Must Be Explicit

Do not automatically send every notification through every channel.

---

# 30. Channel Independence

A provider failure in one channel SHOULD NOT unnecessarily prevent another eligible channel from functioning.

---

# 31. Recipient Resolution

Recipients MUST be derived from authoritative domain state.

---

# 32. Never Trust Client Recipient Lists

A client MUST NOT be able to submit arbitrary:

```text
email addresses
phone numbers
user IDs
device tokens
```

for privileged notifications unless that is the intended product capability.

---

# 33. Recipient Authorization

Notification generation MUST respect tenant and domain authorization.

---

# 34. Cross-Tenant Safety

One tenant's event MUST NOT notify recipients belonging solely to another tenant.

---

# 35. Actor Exclusion

Some events SHOULD avoid notifying the actor who caused the event.

Example:

```text
Alice comments
→ notify mentioned Bob
→ don't notify Alice about her own comment
```

unless product semantics require it.

---

# 36. Recipient Snapshot

For delayed notifications, the system MUST define whether recipients are determined:

```text
at event time
or
at delivery time
```

---

# 37. Permission Changes

If a recipient loses access before delayed delivery, sensitive notifications SHOULD re-evaluate authorization before sending when feasible.

---

# 38. Sensitive Content

Notification content MUST contain only information the recipient is authorized to know.

---

# 39. Lock-Screen Exposure

Push/SMS content may appear on lock screens.

Sensitive details SHOULD be minimized.

---

# 40. Generic Security Push

Prefer:

```text
There was important activity on your account.
```

over exposing highly sensitive details when lock-screen privacy matters.

---

# 41. Email Privacy

Email is not an appropriate channel for arbitrary sensitive secrets.

---

# 42. No Secrets

Notifications MUST NOT contain:

```text
passwords
private keys
recovery codes
long-lived access tokens
```

---

# 43. OTP

One-time authentication codes MAY be sent through approved channels when authentication architecture requires it.

They MUST have:

```text
short expiry
single-purpose semantics
rate limiting
```

---

# 44. Notification Preferences

Users SHOULD be able to control non-mandatory notification categories.

---

# 45. Preference Hierarchy

A useful model:

```text
Global channel preference
↓
Category preference
↓
Notification-type preference
↓
Workspace/resource override
```

only where product complexity justifies it.

---

# 46. Avoid Preference Explosion

Do not expose hundreds of individual toggles unless users genuinely need that granularity.

---

# 47. Preference Model

Preferences SHOULD express meaningful user choices such as:

```text
Mentions
Assignments
Product updates
Weekly digest
Marketing
```

---

# 48. Mandatory Notifications

Some notifications MAY be non-optional.

Examples:

```text
security incidents
material account changes
legally required notices
```

Their mandatory status MUST be explicitly documented.

---

# 49. Mandatory Does Not Mean Every Channel

Even mandatory notification categories may have an appropriate channel policy.

---

# 50. Marketing Preference

Marketing preference MUST be separate from operational/transactional preference.

---

# 51. Consent

Where consent is required, the system MUST record sufficient evidence of:

```text
subject
purpose
channel/category
status
time
source
```

according to Privacy & Data Governance Guidelines.

---

# 52. Consent Withdrawal

Withdrawal MUST stop future affected communications within the required operational window.

---

# 53. Unsubscribe

Marketing/list email SHOULD provide clear unsubscribe mechanisms.

For applicable list mail, standards-based one-click unsubscribe SHOULD be supported.

---

# 54. Unsubscribe Is Not Login-Gated

A valid unsubscribe flow SHOULD NOT require the recipient to remember an account password merely to stop eligible marketing messages.

---

# 55. Suppression

The system SHOULD maintain suppression state for:

```text
unsubscribe
invalid address
hard bounce
spam complaint
invalid phone
invalid device token
```

as appropriate.

---

# 56. Suppression Is Authoritative

Once an address/token is suppressed, ordinary campaign jobs MUST NOT continue sending blindly.

---

# 57. Security Exception

Suppression of marketing email does not automatically suppress mandatory security communications where policy permits delivery.

---

# 58. Contact Verification

High-value notification channels SHOULD distinguish verified vs unverified destinations where relevant.

---

# 59. Email Verification

Critical account notifications SHOULD normally use the verified account email.

---

# 60. Phone Verification

SMS to sensitive accounts SHOULD use a verified phone number when appropriate.

---

# 61. Channel Change

When a verified destination changes, security-sensitive notifications MAY be sent to old and/or new destinations according to Authentication guidelines.

---

# 62. Preference Evaluation Time

Preferences SHOULD generally be checked close to delivery time.

This ensures recent unsubscribe/preferences are respected.

---

# 63. Event vs Delivery State

Do not bake notification preference permanently into the source business event.

The event states what happened.

Notification policy determines whether/how to inform someone.

---

# 64. Notification Intent

A durable notification intent MAY contain:

```text
notification_key
recipient
resource
event ID
created_at
priority
```

and resolve current preferences at delivery.

---

# 65. Quiet Hours

Non-urgent notifications SHOULD respect quiet hours where the product supports them.

---

# 66. Quiet-Hour Definition

Quiet hours MUST have:

```text
start
end
timezone
```

semantics.

---

# 67. User Timezone

Quiet hours SHOULD use the user's configured/preferred timezone.

---

# 68. Unknown Timezone

If timezone is unknown, use a documented fallback rather than guessing based solely on current IP location.

---

# 69. DST

Quiet-hour scheduling MUST handle daylight-saving transitions correctly where applicable.

---

# 70. Urgent Override

Certain notifications MAY bypass quiet hours.

Examples:

```text
security warning
time-sensitive service interruption
critical operational incident
```

This override MUST be explicit.

---

# 71. Marketing Quiet Hours

Marketing notifications SHOULD be held until an appropriate delivery window rather than bypass quiet hours.

---

# 72. Delay vs Drop

When a notification falls inside quiet hours, define whether to:

```text
delay until quiet hours end
or
drop because it will be stale
```

---

# 73. Expiry

Every time-sensitive notification SHOULD have an expiry/deadline.

---

# 74. Stale Notification

Do not deliver:

```text
Your meeting starts in 10 minutes
```

six hours later.

---

# 75. Channel TTL

Push notifications SHOULD use provider TTL/expiration appropriate to their useful lifetime.

---

# 76. TTL Meaning

A push provider accepting a notification does not mean the device has received it.

Offline delivery may occur later according to provider TTL.

---

# 77. Immediate-Only Push

For ephemeral events:

```text
incoming call
live invitation
```

use a short or zero delivery lifetime according to platform semantics.

---

# 78. Durable Information

If information remains important after push expiry, it SHOULD remain available in:

```text
in-app inbox
email
authoritative application state
```

as appropriate.

---

# 79. Notification Scheduling

Scheduled notifications MUST have explicit:

```text
scheduled_at
timezone
expiry
recipient
```

semantics.

---

# 80. Scheduled Preference Change

Preferences SHOULD be rechecked before scheduled delivery.

---

# 81. Scheduled Authorization Change

Sensitive scheduled messages SHOULD recheck recipient eligibility/access where applicable.

---

# 82. Deduplication

Notifications MUST prevent unintended duplicate delivery.

---

# 83. Notification Identity

A notification intent SHOULD have a stable logical identity.

Example:

```text
invoice:{invoice_id}:paid:user:{user_id}
```

---

# 84. Retry Identity

Retries MUST reuse the same logical delivery identity.

---

# 85. Event Replay

Replaying source events MUST NOT automatically re-notify users if the notification was already successfully delivered and semantics require one notification.

---

# 86. Delivery Deduplication

Each channel delivery SHOULD have a stable delivery ID.

---

# 87. Deduplication Scope

Deduplication MUST be scoped correctly.

Bad:

```text
user_id + notification_type
```

forever.

This could suppress legitimate future notifications.

---

# 88. Temporal Deduplication

Some notifications MAY deduplicate within a time window.

Example:

```text
20 users edited this document
```

instead of 20 immediate pushes.

---

# 89. Collapsing

Push systems MAY collapse obsolete notifications so only the latest relevant state remains.

---

# 90. Collapse Suitability

Collapsing is appropriate when:

```text
new message supersedes old message
```

Example:

```text
sync progress 10%
20%
50%
100%
```

---

# 91. Non-Collapsible Notifications

Do not collapse notifications where every message represents an independently important event.

---

# 92. Aggregation

High-frequency events SHOULD be aggregatable where possible.

Example:

```text
12 people commented on Project Atlas.
```

---

# 93. Digest

A digest groups notifications over time.

Examples:

```text
daily summary
weekly activity
```

---

# 94. Digest Preference

Digest frequency SHOULD be configurable when user value justifies it.

---

# 95. Digest Window

Digest generation MUST define:

```text
window start
window end
timezone
event inclusion
deduplication
```

---

# 96. Empty Digest

Do not send an empty digest unless there is a specific product reason.

---

# 97. Digest Idempotency

The same digest period MUST NOT be sent repeatedly due to scheduler retries.

---

# 98. Templates

Notification content SHOULD use version-controlled templates.

---

# 99. Template Registry

Each template SHOULD have:

```text
template ID
notification key
channel
locale
version
owner
```

---

# 100. Template Separation

Channel-specific templates are normally required.

Do not force one long email body into:

```text
SMS
push
in-app
```

unchanged.

---

# 101. Template Variables

Template variables MUST have an explicit schema.

---

# 102. Missing Variable

A missing required variable SHOULD cause a controlled rendering failure—not:

```text
Hello {{name}}
```

being sent literally.

---

# 103. Template Validation

Templates SHOULD be validated in CI/pre-production.

---

# 104. Escaping

Dynamic template data MUST be escaped for the target context.

Examples:

```text
HTML
plain text
URL
JSON
```

---

# 105. Template Injection

User content MUST NOT become executable template syntax.

---

# 106. HTML Email

HTML email MUST escape untrusted content.

---

# 107. Plain-Text Email

Important email templates SHOULD provide a plain-text alternative where appropriate.

---

# 108. Push Length

Push messages SHOULD be concise.

The application UI remains the full source of detail.

---

# 109. SMS Length

SMS content SHOULD be concise and cost-aware.

---

# 110. In-App Content

In-app notifications MAY contain richer structured metadata than external channels.

---

# 111. Template Preview

Teams SHOULD be able to preview templates using representative safe fixture data.

---

# 112. Template Test Matrix

Critical templates SHOULD be tested for:

```text
long names
missing optional values
RTL
long translated text
special characters
URLs
```

---

# 113. Localization

Notifications MUST follow Internationalization Guidelines.

---

# 114. Locale Resolution

Locale SHOULD come from an authoritative user preference.

Fallback sequence MAY be:

```text
user notification locale
→ user UI locale
→ tenant locale
→ product default
```

if explicitly defined.

---

# 115. Do Not Guess Locale From Email Domain

An email address does not reliably identify language.

---

# 116. Localization At Send Time

Where possible, render using the recipient's current preferred locale close to send time.

---

# 117. Persisted Historical Copy

If the exact message sent must be auditable, store the rendered/template-version information required to reconstruct it.

---

# 118. Localized Push

Push content MAY be rendered server-side or use application-bundled localization keys, depending on platform architecture.

---

# 119. Placeholder Grammar

Do not construct translations by concatenating fragments such as:

```text
"Alice" + " commented on " + "Document"
```

when language grammar may differ.

Use complete localized templates.

---

# 120. Pluralization

Templates MUST use locale-aware pluralization.

---

# 121. Number Formatting

Numbers SHOULD use locale-appropriate formatting where displayed.

---

# 122. Date/Time Formatting

Dates/times MUST respect:

```text
locale
timezone
```

and avoid ambiguous representations.

---

# 123. Currency

Monetary notifications MUST include currency explicitly.

---

# 124. RTL

Notification content SHOULD render correctly for RTL locales where supported.

---

# 125. Localization Fallback

Missing translations MUST have a defined fallback.

---

# 126. Do Not Fail Entire Delivery Fleet

One missing locale template MUST NOT block unrelated notification deliveries.

---

# 127. Marketing Translation Review

Marketing copy MAY require localized editorial review rather than direct machine translation.

---

# 128. Notification Links

Links SHOULD direct users to a meaningful authenticated application destination.

---

# 129. Deep Links

Push/in-app messages MAY use deep links following Routes Guidelines.

---

# 130. Deep-Link Authorization

Opening a notification link MUST re-authorize the user.

The notification itself does not grant permission.

---

# 131. Sensitive IDs

Do not place sensitive internal identifiers in public URLs when avoidable.

---

# 132. Tracking Parameters

Notification tracking links MUST follow Analytics and Privacy Guidelines.

---

# 133. Unsubscribe Tokens

Unsubscribe URLs MAY contain signed opaque recipient/list tokens.

They MUST NOT expose secrets or allow arbitrary preference manipulation.

---

# 134. Open Tracking

Email open tracking SHOULD be used only when justified by analytics/privacy requirements.

---

# 135. Open Tracking Limitations

Email opens are not reliable ground truth because clients may:

```text
block images
proxy images
prefetch
```

---

# 136. Click Tracking

Click tracking SHOULD be privacy-aware and purpose-limited.

---

# 137. Security Links

High-risk security flows SHOULD avoid unnecessary third-party click-tracking redirects.

---

# 138. Email Architecture

Email delivery SHOULD use an approved transactional/marketing provider or properly operated mail infrastructure.

---

# 139. Separate Email Streams

Transactional and marketing email SHOULD be logically separated.

This MAY include:

```text
sending domains/subdomains
provider streams
IP pools
suppression categories
```

when scale/reputation requires it.

---

# 140. Sender Identity

Email MUST use valid, intentional:

```text
From
Reply-To
Return-Path
```

semantics.

---

# 141. Authentication

Production email domains SHOULD implement appropriate email authentication such as:

```text
SPF
DKIM
DMARC
```

according to domain architecture.

---

# 142. DKIM

Outbound email SHOULD be DKIM-signed.

---

# 143. DMARC

Organizations operating significant outbound mail SHOULD define DMARC policy and monitor alignment.

---

# 144. Reply Handling

If users may reply, `Reply-To` MUST route somewhere meaningful.

Do not use:

```text
no-reply@
```

while telling users:

```text
Reply to this email for help.
```

---

# 145. Transactional Email Content

Transactional email SHOULD prioritize the transaction/service message over unrelated promotion.

---

# 146. Email Unsubscribe

Marketing/list emails MUST provide appropriate opt-out functionality.

---

# 147. One-Click Unsubscribe

Where applicable, list-email one-click unsubscribe SHOULD follow standardized email header semantics.

---

# 148. Bounce Handling

Email providers return delivery failures that MUST be processed.

---

# 149. Hard Bounce

Permanent failures SHOULD suppress future ordinary sends to that address until corrected.

---

# 150. Soft Bounce

Temporary failures MAY be retried according to bounded provider/application policy.

---

# 151. Spam Complaint

Spam complaints MUST influence suppression/marketing eligibility according to policy.

---

# 152. Email Retry

Do not retry known permanent address errors indefinitely.

---

# 153. Deliverability

Monitor:

```text
delivery
hard bounce
soft bounce
complaint
suppression
```

rates.

---

# 154. Email Reputation

A compromised marketing campaign SHOULD NOT unnecessarily damage critical transactional delivery reputation.

---

# 155. Push Architecture

Push requires a registration relationship between:

```text
application instance/device
provider token/subscription
user/device context
```

---

# 156. Device Token Is Not User Identity

A push token identifies an application/device endpoint.

It does not prove:

```text
who the current authenticated user is
```

forever.

---

# 157. Token Ownership

The application MUST associate push tokens/subscriptions with current authenticated user/device state.

---

# 158. Logout

When a user logs out from a device, the application MUST prevent future private notifications for that user from appearing on that device.

---

# 159. User Switch

If another account signs into the same device, push-token ownership MUST be updated safely.

---

# 160. Token Rotation

Push tokens MAY change.

Client applications MUST support registration refresh.

---

# 161. Invalid Tokens

Provider responses identifying invalid/unregistered tokens SHOULD remove or deactivate those tokens.

---

# 162. Token Retention

Inactive push tokens SHOULD eventually be cleaned up.

---

# 163. Push Permission

Platforms requiring user notification authorization MUST obtain that authorization through the platform's normal permission model.

---

# 164. Ask in Context

Applications SHOULD request push permission when the value is understandable to the user rather than reflexively on first launch unless product needs justify it.

---

# 165. Denied Push Permission

The product MUST continue to function appropriately when push permission is denied.

---

# 166. Push Is Advisory

Critical business state MUST remain retrievable from the application even when push is disabled or undelivered.

---

# 167. Push Payload

Push payload SHOULD contain only information necessary to:

```text
display notification
route app
identify update
```

---

# 168. Push Payload Security

Assume push payloads may be visible to:

```text
OS
lock screen
provider infrastructure
```

according to platform design.

---

# 169. Data Message

Background/data push SHOULD be used according to platform restrictions and not assumed to provide guaranteed immediate execution.

---

# 170. Push Priority

Push priority MUST reflect actual urgency.

Do not mark every notification high priority.

---

# 171. Battery Respect

Excessive high-priority/background push can harm battery and may be restricted by platforms.

---

# 172. Push TTL

Push TTL MUST reflect how long the information remains useful.

---

# 173. Push Collapse

Use collapse/coalescing keys when only the latest state matters.

---

# 174. Badge

Badge count semantics SHOULD be explicit.

Recommended:

```text
number of unread actionable notifications
```

or another documented model.

---

# 175. Badge Reconciliation

Do not rely solely on incremental:

```text
badge += 1
```

across unreliable message delivery.

The app SHOULD be able to reconcile against authoritative unread state.

---

# 176. Web Push

Web push subscriptions are bearer-like endpoint credentials and MUST be protected.

---

# 177. Web Push Permission

Browser push permission MUST be user-granted under browser rules.

---

# 178. Web Push Subscription Expiry

Expired/invalid subscriptions SHOULD be removed.

---

# 179. SMS Architecture

SMS delivery SHOULD use an approved messaging provider.

---

# 180. Phone Number Normalization

Phone numbers SHOULD be stored in a normalized international representation where appropriate.

---

# 181. SMS Country Constraints

SMS support differs by:

```text
country
sender type
carrier
regulation
```

and the system SHOULD maintain supported-market policy.

---

# 182. SMS Consent

Promotional SMS MUST follow applicable consent and opt-out requirements.

---

# 183. SMS STOP Handling

Where provider/jurisdiction conventions use standardized opt-out keywords, the system MUST honor provider suppression/opt-out state.

---

# 184. SMS Cost

SMS delivery has material per-message cost.

Rate and abuse controls MUST account for this.

---

# 185. SMS Abuse

Protect SMS endpoints against:

```text
OTP flooding
message bombing
enumeration
fraudulent destinations
```

---

# 186. Phone Enumeration

User-facing responses SHOULD NOT reveal whether a phone number belongs to an account when privacy/security policy forbids it.

---

# 187. In-App Notifications

In-app notifications SHOULD have durable application-side state where users need a notification center/history.

---

# 188. In-App Record

A notification record MAY contain:

```text
notification_id
recipient_id
type
created_at
read_at
resource
render data
```

---

# 189. In-App Source

The in-app notification record is not necessarily the authoritative source of the underlying business event.

---

# 190. Read State

Read/unread SHOULD have explicit semantics.

---

# 191. Mark Read

Marking a notification read SHOULD be idempotent.

---

# 192. Mark All Read

Bulk read operations MUST be tenant/user scoped.

---

# 193. Unread Count

Unread count SHOULD be computed/maintained consistently with read-state semantics.

---

# 194. Notification History

In-app notification retention SHOULD be bounded.

---

# 195. Deleted Resource

If a linked resource is deleted, the notification SHOULD degrade gracefully.

Example:

```text
This item is no longer available.
```

rather than failing catastrophically.

---

# 196. Provider Abstraction

Applications SHOULD isolate provider-specific delivery APIs behind a narrow channel adapter.

---

# 197. Provider Adapter

Example:

```text
EmailProvider
PushProvider
SmsProvider
```

---

# 198. Do Not Abstract Away Useful Semantics

Provider abstraction SHOULD preserve important distinctions such as:

```text
hard bounce
rate limit
invalid token
temporary outage
```

---

# 199. Provider Failover

Multi-provider failover MAY be justified for high-criticality channels.

---

# 200. Provider Failover Complexity

Failover MUST account for:

```text
duplicate sending
different suppression state
different sender identity
deliverability
regional/legal requirements
```

---

# 201. Delivery Queue

External notifications SHOULD normally be sent asynchronously using Background Jobs & Queue Guidelines.

---

# 202. Request Path

Ordinary user requests SHOULD NOT synchronously wait for:

```text
SMTP/provider email
push provider
SMS gateway
```

unless delivery itself is the immediate product contract.

---

# 203. Durable Intent

Important notifications SHOULD have durable send intent before external-provider delivery.

---

# 204. Retry Principle

Retry only delivery failures likely to succeed later.

---

# 205. Transient Notification Errors

Examples:

```text
provider timeout
temporary 5xx
429 rate limit
temporary network failure
```

---

# 206. Permanent Notification Errors

Examples:

```text
invalid destination
unregistered device token
permanent opt-out
invalid template
unsupported destination
```

---

# 207. Retry Budget

Every delivery job MUST have bounded retries.

---

# 208. Backoff

Transient failures SHOULD use exponential or otherwise increasing backoff with jitter.

---

# 209. Retry-After

Provider retry guidance SHOULD be respected.

---

# 210. Notification Expiry During Retry

Before each retry, verify the notification is still useful.

---

# 211. Preference During Retry

Before delayed retries, preferences/suppression SHOULD be rechecked where applicable.

---

# 212. Duplicate Provider Request

A timeout may leave delivery outcome unknown.

Provider-level idempotency/deduplication SHOULD be used where supported.

---

# 213. Delivery Attempt ID

Every attempt SHOULD have a stable:

```text
notification_id
delivery_id
attempt
```

model.

---

# 214. Provider Message ID

Store provider delivery identifiers where useful for:

```text
debugging
webhooks
delivery status
```

---

# 215. Provider Accepted ≠ Delivered

A provider accepting a request means:

```text
accepted for processing
```

not necessarily:

```text
human received/read it
```

---

# 216. Delivery State

Possible state model:

```text
pending
queued
provider_accepted
delivered
failed
suppressed
expired
```

depending on channel capability.

---

# 217. Read/Open State

Do not conflate:

```text
delivered
opened
clicked
read
acted
```

---

# 218. Delivery Receipts

Use provider delivery receipts where available, but understand their semantics and limitations.

---

# 219. Webhooks

Provider delivery webhooks MUST:

```text
authenticate source
validate payload
be idempotent
handle duplicates
handle out-of-order events
```

---

# 220. Webhook Ordering

A late:

```text
delivered
```

event MUST NOT incorrectly overwrite a newer:

```text
failed/complaint
```

status if provider semantics define stronger terminal state.

---

# 221. Provider Event Version

Delivery-state transitions SHOULD use explicit precedence/state-machine rules.

---

# 222. Rate Limits

Notifications require rate limits at multiple levels.

---

# 223. User Rate Limit

Limit messages per recipient where excessive volume would be harmful.

---

# 224. Tenant Rate Limit

One tenant SHOULD NOT monopolize shared provider capacity.

---

# 225. Provider Rate Limit

Respect global/channel provider quotas.

---

# 226. Template Rate Limit

High-volume accidental loops SHOULD be detectable per notification type.

---

# 227. Circuit Breaker

A sudden notification explosion SHOULD allow operators to:

```text
pause
throttle
disable
```

the affected notification type.

---

# 228. Kill Switch

High-volume notification systems SHOULD have operational kill switches for noncritical messaging.

---

# 229. Kill Switch Scope

Prefer:

```text
notification type
channel
tenant/cohort
```

scoped controls over disabling the entire notification system.

---

# 230. Security Notification Kill Switch

Security-critical notification disabling SHOULD require stronger controls and review.

---

# 231. Fan-Out

Large fan-out campaigns MUST use bounded asynchronous dispatch.

---

# 232. Fan-Out Batch

Do not enqueue tens of millions of jobs synchronously in one web request.

---

# 233. Campaign Snapshot

Marketing campaigns SHOULD define the eligible audience at a controlled point or use deliberate dynamic eligibility semantics.

---

# 234. Preference Recheck for Campaign

Even if audience was selected earlier, unsubscribe/suppression SHOULD be checked close to actual send.

---

# 235. Campaign Cancellation

Operators SHOULD be able to stop future unsent campaign work.

Already-provider-accepted messages may not be retractable.

---

# 236. Campaign Test

Marketing sends SHOULD support:

```text
preview
test recipients
small canary
```

before mass delivery.

---

# 237. Template Version Pinning

Large campaigns SHOULD generally pin a template version so content does not change halfway through unexpectedly.

---

# 238. Transactional Template Version

Transactional messages MAY render the latest approved template unless audit requirements demand version pinning.

---

# 239. Priority

Notification jobs MAY use priority.

---

# 240. Critical Priority

Examples:

```text
security event
OTP
service outage
```

may outrank:

```text
weekly digest
marketing newsletter
```

---

# 241. Priority Isolation

High-volume low-priority marketing MUST NOT delay security or transactional messages.

---

# 242. Separate Queues

Different notification classes SHOULD use separate queues/pools where they have materially different:

```text
SLO
provider
priority
retry
cost
```

requirements.

---

# 243. Quiet-Hour Queue

Delayed quiet-hour messages SHOULD not block urgent notification throughput.

---

# 244. Observability

Notifications MUST be observable by:

```text
notification type
channel
provider
outcome
```

without excessive personal-data exposure.

---

# 245. Core Metrics

Useful metrics include:

```text
intents created
suppressed
queued
sent/provider accepted
delivered where known
failed
retried
expired
```

---

# 246. Channel Metrics

Email:

```text
bounce
complaint
unsubscribe
```

Push:

```text
invalid token
provider failure
```

SMS:

```text
delivery failure
opt-out
```

---

# 247. Latency

Measure:

```text
event → notification intent
intent → provider accepted
event → delivered
```

where relevant.

---

# 248. Notification SLO

Time-sensitive notifications SHOULD define an end-to-end latency objective.

---

# 249. Queue Age

Oldest pending delivery age is an important operational signal.

---

# 250. Suppression Metrics

Unexpected suppression-rate increases SHOULD be observable.

---

# 251. Deliverability Alert

Large increases in:

```text
hard bounce
complaint
provider rejection
```

may indicate configuration, reputation, or abuse problems.

---

# 252. Push Token Alert

A sudden spike in invalid device tokens may indicate client/provider integration issues.

---

# 253. Notification Loop Detection

Detect situations where one action recursively generates repeated notifications.

---

# 254. Volume Anomaly

Alert when a notification type suddenly sends orders of magnitude more messages than normal.

---

# 255. Template Render Failures

Template failures MUST be observable.

---

# 256. Localization Failure

Missing locale/template errors SHOULD be separately measurable.

---

# 257. Raw Recipient Metrics

Do not use:

```text
email address
phone number
device token
user ID
```

as uncontrolled high-cardinality metrics labels.

---

# 258. Logs

Structured logs MAY include:

```text
notification_id
notification_key
channel
provider
attempt
outcome
```

---

# 259. No Sensitive Body Logging

Do not log full notification bodies by default.

---

# 260. Device Token Logging

Push tokens MUST NOT be routinely logged.

---

# 261. SMS Number Logging

Phone numbers SHOULD be masked/tokenized in normal operational logs.

---

# 262. Email Address Logging

Email addresses SHOULD be minimized/masked in broad operational telemetry.

---

# 263. Audit

Sensitive administrative notification actions SHOULD be auditable.

Examples:

```text
campaign launched
campaign cancelled
security notification disabled
template changed
suppression overridden
```

---

# 264. Notification Analytics

Notification analytics follows Analytics Guidelines.

---

# 265. Analytics Events

Potential events:

```text
notification_sent
notification_delivered
notification_opened
notification_clicked
notification_dismissed
```

only where meaningful and measurable.

---

# 266. Do Not Overclaim Open

Platform/provider capabilities differ.

Do not treat every channel as having reliable open/read tracking.

---

# 267. Conversion Attribution

A click followed by action MAY support notification attribution under a documented window/model.

It is not necessarily causal proof.

---

# 268. Marketing Analytics Privacy

Marketing notification analytics MUST follow consent/purpose/retention requirements.

---

# 269. A/B Testing

Notification copy/timing experiments follow Feature Flag and Analytics Guidelines.

---

# 270. Experiment Guardrails

Notification experiments SHOULD include:

```text
unsubscribe
complaint
mute
disable push
conversion
```

guardrails rather than optimizing clicks alone.

---

# 271. Do Not Experiment on Mandatory Security Meaning

Security-critical messages MUST retain clear required meaning.

---

# 272. Notification Storage

Only persist notification data necessary for:

```text
delivery
audit
user history
support
analytics
```

---

# 273. Retention

Each notification class SHOULD have retention policy.

---

# 274. In-App Retention

Old in-app notifications SHOULD eventually expire/archive according to product needs.

---

# 275. Delivery Logs

Provider delivery logs SHOULD have bounded retention.

---

# 276. Message Bodies

Long-term storage of fully rendered message bodies SHOULD be justified.

---

# 277. Sensitive Notifications

Highly sensitive notification content SHOULD have shorter retention where possible.

---

# 278. Right to Deletion

Notification records containing personal data must participate in applicable deletion workflows.

---

# 279. Provider Retention

Third-party notification providers are processors/vendors and MUST be reviewed under Privacy/Data Governance and Dependency Guidelines.

---

# 280. Data Minimization to Providers

Send only fields required for delivery.

---

# 281. Marketing Provider Separation

Do not automatically share transactional/security-recipient data with marketing tooling without appropriate purpose/governance.

---

# 282. Provider Region

Provider data storage/processing region MUST satisfy applicable residency requirements.

---

# 283. Provider Credentials

Email/push/SMS provider credentials are secrets.

---

# 284. Least Privilege

Provider API credentials SHOULD have the minimum required capability.

---

# 285. Environment Separation

Production and non-production notification credentials/configuration MUST be separated.

---

# 286. Non-Production Safety

Development/staging MUST NOT accidentally send notifications to real production users.

---

# 287. Test Recipient Allowlist

Non-production external delivery SHOULD use:

```text
allowlisted recipients
sandbox provider
capture mailbox
fake adapter
```

as appropriate.

---

# 288. SMS Sandbox

Test SMS MUST NOT create uncontrolled real-world charges/messages.

---

# 289. Push Environment

Development and production push credentials/tokens SHOULD remain correctly separated according to platform/provider architecture.

---

# 290. Local Development

Local development SHOULD use a fake/capture notification provider by default.

---

# 291. Template Testing

CI SHOULD verify:

```text
render success
required variables
supported locales
HTML escaping
link construction
```

for important templates.

---

# 292. Snapshot Tests

Template snapshot/visual tests MAY help detect unintended content changes.

---

# 293. Deliverability Tests

Email infrastructure SHOULD periodically verify:

```text
SPF
DKIM
DMARC
```

alignment and sending-domain configuration.

---

# 294. Duplicate Test

Notification workflows MUST test duplicate source events/retries.

---

# 295. Preference Test

Test:

```text
enabled
disabled
category disabled
global channel disabled
mandatory notification
```

cases.

---

# 296. Quiet-Hour Test

Test:

```text
inside window
outside window
window crosses midnight
DST transition
urgent override
```

where relevant.

---

# 297. Locale Test

Test notification rendering across supported:

```text
locale
timezone
RTL
long translated copy
```

---

# 298. Provider Failure Test

Test:

```text
timeout
429
5xx
invalid recipient/token
```

handling.

---

# 299. Retry Expiry Test

Verify stale time-sensitive messages expire rather than being delivered after relevance ends.

---

# 300. Token Lifecycle Test

Push implementations SHOULD test:

```text
token rotation
logout
account switch
invalid token
```

---

# 301. Cross-Tenant Test

Attempt to generate/access notifications across tenant boundaries.

---

# 302. Link Authorization Test

Opening notification links MUST still enforce authorization.

---

# 303. Suppression Test

Verify unsubscribe/bounce/complaint suppression blocks future applicable sends.

---

# 304. Campaign Test

Bulk campaigns SHOULD test:

```text
audience
suppression
template version
canary
rate limits
cancellation
```

---

# 305. Notification Review Checklist

```text
□ Stable notification key
□ Category
□ Owner
□ User purpose
□ Recipients
□ Channels
□ Preference rules
□ Consent rules
□ Quiet-hour policy
□ Expiry
□ Deduplication
□ Template
□ Localization
□ Privacy
□ Observability
□ Retention
```

---

# 306. Email Checklist

```text
□ Transactional/marketing classification
□ Verified sender domain
□ SPF/DKIM/DMARC
□ From/Reply-To
□ HTML escaping
□ Plain-text alternative where applicable
□ Unsubscribe where required
□ Bounce handling
□ Complaint handling
□ Suppression
□ Retry policy
□ Deliverability metrics
```

---

# 307. Push Checklist

```text
□ User permission
□ Token owner
□ Logout/user-switch handling
□ Token refresh
□ Invalid-token cleanup
□ Payload minimized
□ Sensitive lock-screen content reviewed
□ TTL
□ Collapse behavior
□ Priority
□ Deep-link authorization
□ Provider failure handling
```

---

# 308. SMS Checklist

```text
□ Phone verified where required
□ Country support
□ Consent
□ Opt-out handling
□ Short content
□ Cost control
□ Rate limits
□ Abuse controls
□ Delivery receipts
□ Retry policy
□ Sensitive content minimized
```

---

# 309. In-App Checklist

```text
□ Durable record if history needed
□ Tenant/user scope
□ Read/unread semantics
□ Unread count
□ Deep link
□ Deleted-resource handling
□ Retention
□ Localization
□ Accessibility
```

---

# 310. Preference Checklist

```text
□ Mandatory vs optional defined
□ Marketing separate
□ Channel controls
□ Category controls
□ Defaults documented
□ Consent evidence where required
□ Withdrawal immediate enough
□ Quiet hours
□ Timezone
□ Preference changes tested
```

---

# 311. Retry Checklist

```text
□ Stable delivery ID
□ Transient/permanent classified
□ Retry budget
□ Backoff
□ Jitter
□ Retry-After
□ Preference recheck
□ Expiry recheck
□ Provider idempotency considered
□ Terminal failure state
```

---

# 312. Deduplication Checklist

```text
□ Source event ID
□ Notification logical ID
□ Channel delivery ID
□ Replay-safe
□ Retry-safe
□ Aggregation window if needed
□ Collapse semantics if needed
□ Scope does not suppress legitimate future events
```

---

# 313. Quiet Hours Checklist

```text
□ User timezone
□ Start/end
□ Midnight crossing
□ DST
□ Delay/drop behavior
□ Urgent exceptions
□ Marketing policy
□ Expiry after delay
```

---

# 314. Localization Checklist

```text
□ Locale source
□ Fallback locale
□ Full translated templates
□ Pluralization
□ Number formatting
□ Timezone
□ Date formatting
□ Currency
□ RTL
□ Long-copy testing
```

---

# 315. Observability Checklist

```text
□ Intent count
□ Sent/provider accepted
□ Delivery where available
□ Failures
□ Retry rate
□ Queue age
□ Expiry
□ Suppression
□ Bounce/complaint
□ Invalid push tokens
□ Provider latency
□ Template errors
□ Volume anomalies
```

---

# 316. Definition of Done — New Notification Type

A notification type is ready when:

```text
✓ Purpose is explicit
✓ Category assigned
✓ Owner assigned
✓ Recipient semantics defined
✓ Mandatory/preference behavior defined
✓ Channels chosen
✓ Quiet-hour behavior defined
✓ Expiry defined
✓ Deduplication identity defined
✓ Templates approved
✓ Localization available
✓ Privacy classification complete
✓ Retry/failure policy defined
✓ Metrics/alerts available
✓ Tests cover preference/deduplication
```

---

# 317. Definition of Done — Email Channel

```text
✓ Sending identity configured
✓ SPF/DKIM/DMARC appropriate
✓ Transactional/marketing separation
✓ Template rendering safe
✓ Unsubscribe/suppression supported
✓ Bounce/complaint handling
✓ Retry classification
✓ Deliverability monitoring
✓ Non-production safety
```

---

# 318. Definition of Done — Push Channel

```text
✓ OS/browser permission workflow
✓ Token registration lifecycle
✓ Logout/account switch safe
✓ Invalid token cleanup
✓ TTL
✓ Collapse strategy
✓ Sensitive content reviewed
✓ Deep links authorized
✓ Provider metrics
✓ Retry handling
```

---

# 319. Definition of Done — Notification Preference

```text
✓ User choice corresponds to understandable category
✓ Mandatory messages excluded appropriately
✓ Marketing independently controllable
✓ Current preference applied before send
✓ Quiet hours supported where required
✓ Consent history retained where needed
✓ Withdrawal tested
```

---

# 320. Notification Anti-Patterns

Avoid:

```text
event exists
→ notify everybody
```

Avoid:

```text
send every channel
```

for every event.

Avoid:

```text
marketing opt-out
→ stop password-change alert
```

Avoid:

```text
marketing email disguised as transactional
```

Avoid:

```text
notification preference stored only in browser localStorage
```

when server delivery depends on it.

Avoid:

```text
unsubscribe requires login
```

for ordinary eligible marketing mail.

Avoid:

```text
preferences evaluated only when campaign created
```

and ignored at actual send time.

Avoid:

```text
quiet hours = server timezone
```

for global users.

Avoid:

```text
push delivered
```

because provider returned a message ID.

Avoid:

```text
push token = user ID
```

Avoid:

```text
logout
but old user's private pushes still arrive
```

Avoid:

```text
push TTL = four weeks
```

for a five-minute event invitation.

Avoid:

```text
every push high priority
```

Avoid:

```text
private message body
```

fully visible on lock screen unnecessarily.

Avoid:

```text
badge += 1
```

forever without reconciliation.

Avoid:

```text
SMS all product updates
```

because the phone number exists.

Avoid:

```text
retry invalid phone/email forever
```

Avoid:

```text
provider timeout
→ generate new delivery identity
→ duplicate message
```

Avoid:

```text
weekly digest with zero activity
```

Avoid:

```text
same event replay
→ send receipt again
```

Avoid:

```text
raw user HTML
→ email template
```

Avoid:

```text
Hello + name + translated fragment
```

for localization.

Avoid:

```text
link in notification
→ bypass authorization
```

Avoid:

```text
test environment
→ real customer email/SMS
```

Avoid:

```text
email provider credential
```

in client code.

Avoid:

```text
marketing flood shares same queue
```

with OTP/security notifications.

Avoid:

```text
spam complaint ignored
```

Avoid:

```text
invalid push tokens retained forever
```

Avoid:

```text
full email body
```

in normal logs.

Avoid:

```text
phone number as metric label
```

Avoid:

```text
campaign has no kill switch
```

Avoid:

```text
every notification stored forever
```

Avoid:

```text
click rate increased
therefore notification improved
```

while unsubscribe/complaint rates also rose.

---

# 321. AI Notification Rules

AI coding agents MUST classify a new notification before implementing it.

---

# 322. AI Necessity Rule

AI SHOULD ask whether a notification is necessary rather than assuming every business event requires one.

---

# 323. AI Category Rule

AI MUST distinguish:

```text
security
transactional
product
marketing
```

where policy differs.

---

# 324. AI Preference Rule

AI MUST NOT gate mandatory security notifications on marketing preferences.

---

# 325. AI Consent Rule

AI MUST respect existing consent/preference architecture for promotional channels.

---

# 326. AI Recipient Rule

AI MUST derive recipient identities from trusted server-side domain state.

---

# 327. AI Tenant Rule

AI MUST preserve tenant isolation when resolving recipients and content.

---

# 328. AI Sensitive-Content Rule

AI SHOULD minimize sensitive information in:

```text
push
SMS
subject lines
```

where it may appear outside the authenticated application.

---

# 329. AI Queue Rule

AI SHOULD send external notifications asynchronously using the approved queue architecture.

---

# 330. AI Idempotency Rule

AI MUST assume notification jobs may execute more than once.

---

# 331. AI Retry Rule

AI MUST distinguish transient provider failures from permanent destination failures.

---

# 332. AI Expiry Rule

AI MUST define expiration for time-sensitive messages.

---

# 333. AI Quiet-Hour Rule

AI SHOULD apply quiet hours to nonurgent notifications when the product supports them.

---

# 334. AI Timezone Rule

AI MUST NOT infer user quiet hours solely from server timezone or transient IP geolocation.

---

# 335. AI Template Rule

AI SHOULD use approved typed templates rather than constructing message strings inline throughout feature code.

---

# 336. AI Escaping Rule

AI MUST escape dynamic data for the target message format.

---

# 337. AI Localization Rule

AI MUST use complete localized templates rather than fragment concatenation.

---

# 338. AI Push-Token Rule

AI MUST NOT treat push tokens as permanent user identities.

---

# 339. AI Logout Rule

AI MUST account for logout/account switching when associating device endpoints.

---

# 340. AI Push-TTL Rule

AI SHOULD match push TTL to message usefulness.

---

# 341. AI Collapse Rule

AI SHOULD collapse/coalesce only notifications that genuinely supersede earlier states.

---

# 342. AI Email Rule

AI SHOULD maintain transactional and marketing email policy separation.

---

# 343. AI Unsubscribe Rule

AI MUST NOT omit required marketing/list opt-out mechanisms.

---

# 344. AI SMS Rule

AI MUST consider:

```text
consent
cost
rate limits
abuse
```

before adding SMS.

---

# 345. AI Provider Rule

AI SHOULD use existing approved provider adapters rather than adding a new notification vendor casually.

---

# 346. AI Observability Rule

Every important notification implementation SHOULD expose:

```text
created
suppressed
sent
failed
expired
```

states as relevant.

---

# 347. AI Logging Rule

AI MUST NOT log:

```text
full push tokens
full signed unsubscribe credentials
raw message bodies
```

without explicit need.

---

# 348. AI Test Rule

AI SHOULD test:

```text
preferences
duplicates
quiet hours
locale
provider failure
```

for new notification types.

---

# 349. AI Gold Rule

When uncertain:

```text
No interruption
>
In-app
>
Email
>
Push
>
SMS
```

only escalating channel intrusiveness when the user need warrants it.

And:

```text
One useful notification
>
Many redundant notifications
```

---

# 350. Golden Notification Rules

**1. Notifications exist to serve a concrete user need, not merely because an event occurred.**

**2. Every notification has a stable type, category, purpose, owner, and delivery policy.**

**3. Security, transactional, product, and marketing notifications remain distinct policy classes.**

**4. Marketing preference never suppresses mandatory security messages automatically.**

**5. Promotional content is not disguised as transactional communication.**

**6. Every recipient is derived from trusted server-side state.**

**7. Tenant boundaries apply to notification recipient resolution and message content.**

**8. Notification content reveals only information the recipient is authorized to know.**

**9. Push/SMS/subjects minimize sensitive lock-screen-visible content.**

**10. Secrets and long-lived credentials are never sent in notifications.**

**11. Non-mandatory messaging respects explicit user preferences.**

**12. Marketing consent and withdrawal are governed separately where applicable.**

**13. Unsubscribe/suppression state is authoritative for applicable communications.**

**14. Hard-bounced, complained, invalid, and opted-out destinations are not retried indefinitely.**

**15. Preferences are normally evaluated close to delivery time.**

**16. Quiet hours use the user's intended timezone.**

**17. Nonurgent messages respect quiet hours where the product supports them.**

**18. Urgent quiet-hour bypass is explicit, not accidental.**

**19. Time-sensitive messages have an expiry.**

**20. Stale notifications are discarded rather than delivered after they lose meaning.**

**21. External notification delivery is normally asynchronous.**

**22. Notification delivery assumes jobs may execute more than once.**

**23. Every duplicate-sensitive notification has a stable logical identity.**

**24. Retries preserve notification identity.**

**25. Replaying source events does not automatically resend already-completed notifications.**

**26. High-frequency activity is aggregated or digested where that improves user experience.**

**27. Push collapsing is used only when the newest state makes older messages obsolete.**

**28. Notifications that represent independent important events are not collapsed.**

**29. Templates are version-controlled and schema-driven.**

**30. Dynamic template values are escaped for their output format.**

**31. Missing required template variables cause controlled failures.**

**32. Email, push, SMS, and in-app use channel-appropriate templates.**

**33. Localization uses full message templates rather than concatenated translated fragments.**

**34. Locale and timezone come from explicit user/product state, not unreliable guesses.**

**35. Dates, numbers, plurals, and currency are locale-aware.**

**36. Notification deep links re-authorize access when opened.**

**37. Tracking and notification analytics follow Privacy and Analytics Guidelines.**

**38. Email open tracking is not treated as reliable proof that a human read the message.**

**39. Transactional and marketing email streams are logically separated where operationally appropriate.**

**40. Production email uses appropriately authenticated sending domains.**

**41. Applicable marketing/list mail provides effective unsubscribe handling.**

**42. Push permission is requested using the platform permission model.**

**43. The product continues to work when users deny push permission.**

**44. Push tokens identify endpoints, not permanent user identities.**

**45. Logout and account switching invalidate or reassign private push delivery correctly.**

**46. Invalid push tokens are removed.**

**47. Push TTL reflects actual notification usefulness.**

**48. Push provider acceptance does not equal device delivery.**

**49. SMS is used intentionally because of urgency/value, not merely because a phone number exists.**

**50. SMS rate limits and abuse controls account for financial and security risk.**

**51. In-app notification read state is idempotent and user scoped.**

**52. Notification providers are isolated behind controlled adapters without erasing useful failure semantics.**

**53. Every provider delivery path distinguishes transient from permanent failure.**

**54. Retry policies are bounded and use backoff/jitter.**

**55. Retry-time preference, suppression, authorization, and expiry are rechecked when required.**

**56. Delivery acceptance, delivery, open, click, and conversion remain separate states.**

**57. Provider webhooks are authenticated, idempotent, and tolerant of duplicate/out-of-order events.**

**58. Notification rate limits apply by recipient, tenant, provider, and type as needed.**

**59. Low-priority bulk messaging cannot starve OTP/security/transactional delivery.**

**60. High-volume notification types have pause/throttle/kill controls.**

**61. Notification systems detect anomalous volume and recursive notification loops.**

**62. Templates and localization failures are observable.**

**63. Telemetry avoids exposing message bodies, device tokens, phone numbers, and email addresses unnecessarily.**

**64. Notification providers receive only data necessary for delivery.**

**65. Production and non-production notification credentials are separated.**

**66. Development/staging cannot accidentally notify real users by default.**

**67. Notification histories and delivery logs have explicit retention.**

**68. Notification records participate in privacy deletion requirements.**

**69. Experiments optimize user value while monitoring unsubscribe, mute, complaint, and other harm signals.**

**70. If the team cannot explain why a notification is sent, whether the recipient wants it, when it expires, and what prevents duplicate delivery, the notification is not production-grade.**

---

# 351. Canonical Notifications Standard

The organizational standard is:

> **Notifications are treated as governed product interruptions rather than direct provider calls. Every notification type has a stable semantic identifier, explicit category and user purpose, accountable owner, recipient rules, supported channels, preference and consent semantics, urgency, quiet-hour behavior, expiration policy, deduplication model, localization templates, observability, and retention requirements.**

> **Notification recipients and content are derived from authoritative application state. Tenant, resource, and permission boundaries apply before delivery, sensitive information is minimized for externally visible channels, and opening a deep link always re-enters the normal application authentication and authorization path. Push endpoints, email addresses, and telephone numbers are delivery destinations rather than authorization identities.**

> **User communication preferences are enforced close to delivery. Marketing choices remain distinct from mandatory transactional or security communications, consent and withdrawal are recorded where required, unsubscribe and suppression state are authoritative for eligible communication, and quiet hours are evaluated in the intended recipient timezone. Time-sensitive notifications have explicit deadlines so retries or offline devices do not cause stale information to arrive after it has lost its purpose.**

> **External delivery is asynchronous, idempotent, and failure-aware. Each logical notification and channel delivery has stable identity, duplicate source events and job retries do not create repeated user-visible messages unintentionally, transient provider failures use bounded backoff and jitter, permanent destination failures stop retrying, and provider acceptance is never misrepresented as human delivery or readership. Delivery webhooks are authenticated and processed idempotently.**

> **Channels are selected according to user value, urgency, privacy, cost, and reliability. In-app delivery is preferred for ordinary product activity where interruption is unnecessary, email supports durable longer-form communication, push provides short timely alerts, and SMS is reserved for cases where phone delivery provides material benefit. Bulk or promotional traffic cannot consume the capacity required by critical security and transactional delivery.**

> **Templates are channel-specific, version-controlled, typed, safely escaped, and fully localized. Locale and timezone derive from user/product preferences, translated messages are constructed as complete linguistic units, and dates, currencies, numbers, pluralization, and RTL behavior follow Internationalization Guidelines. Large campaigns may pin template versions to guarantee consistent content during delivery.**

> **Email infrastructure maintains deliverability and sender integrity through appropriate authenticated-domain configuration, bounce processing, complaint processing, suppression, and standards-based unsubscribe behavior. Push delivery maintains correct device-token ownership throughout registration, token rotation, logout, and account switching; notification TTL and collapse semantics match actual user value. SMS delivery includes normalization, supported-market policy, consent/opt-out handling, cost controls, rate limiting, and abuse protection.**

> **Notification systems are observable as first-class production workloads. Systems measure notification intent creation, suppression, queue age, provider latency, acceptance, delivery where observable, failures, retries, expiry, email bounce/complaint rates, invalid device tokens, SMS delivery failures, localization/template errors, and anomalous volumes. Message bodies and sensitive destination credentials are minimized in logs, metrics, analytics, and provider payloads.**

> **Notification providers are governed dependencies and data processors. Production and non-production credentials and destinations are separated, development environments default to capture/fake delivery, provider access uses least privilege, and recipient/contact data is transferred only for approved notification purposes. Notification state and history have explicit retention and participate in applicable privacy deletion workflows.**

A production-grade notification system should make it easy to answer:

```text
Why does this notification exist?
What category is it?
Who owns it?
Who is eligible to receive it?
Is it mandatory or optional?
What preference controls it?
Does it require consent?
Which channel is used and why?
Does it respect quiet hours?
Which timezone is used?
When does it become stale?
What is its logical deduplication ID?
Can source-event replay send it twice?
What happens if the provider times out?
Which failures retry?
Which failures suppress the destination?
How does unsubscribe affect it?
Which template/version/locale is used?
Does the content expose sensitive information?
Can it appear on a device after logout?
How are invalid push tokens removed?
Does push TTL match the message's actual lifetime?
Can marketing traffic delay security notifications?
How is the provider rate limit enforced?
Can operators pause a runaway notification type?
What does provider accepted mean for this channel?
Can delivery actually be measured?
How are bounces, complaints, and opt-outs handled?
What notification data is retained?
Which third parties receive recipient information?
What metrics show whether delivery is healthy?
```

If those questions cannot be answered reliably, notifications are functioning as unmanaged messaging rather than a governed user-communication subsystem.

A few external standards reinforce the design. Apple explicitly treats user-visible notifications as potentially disruptive and requires user authorization for alerts, sounds, and badges, which supports contextual permission requests and graceful behavior when push is denied. Apple also supports localized notification payloads or app-bundled localization resources. citeturn365646search5turn365646search2

For push lifetime and collapsing, current Firebase Cloud Messaging documentation distinguishes provider acceptance from actual device delivery, supports explicit message TTL, and allows collapsible messages when a newer message supersedes an older pending one. That is why TTL and deduplication/collapse semantics need to reflect business meaning rather than provider defaults. citeturn365646search0turn365646search3

For marketing/list email, **RFC 8058** defines standardized one-click unsubscribe using `List-Unsubscribe` plus `List-Unsubscribe-Post`, supporting the rule that applicable list mail should provide straightforward standards-based opt-out rather than requiring an interactive account-login journey. citeturn365646search1

Canonical master placement:

**… → Caching → Background Jobs & Queue → File & Media → Search → Notifications → Internationalization → Testing → Performance → Observability → Analytics → …**
