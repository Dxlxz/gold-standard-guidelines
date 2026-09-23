---
id: "email"
title: "Email Guidelines — Gold Standard 2026"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "email"]
applies_to: ["ai"]
related: ["security", "accessibility", "privacy-data-governance", "configuration-environment", "file-media"]
legacy_number: 43
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 76600
provenance: baseline

---

Canonical placement: **Notifications → Email → Internationalization → Content & UX Writing**. Notifications owns *when/why* communication is sent; Email owns the delivery channel, template/runtime contract, authentication, deliverability, suppression, and unsubscribe infrastructure.

# Email Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for product-generated email, including:

- transactional email;
- security email;
- account email;
- product notifications;
- subscription email;
- marketing/promotional email;
- templates;
- responsive HTML email;
- plain-text alternatives;
- accessibility;
- localization;
- sender identity;
- sending domains;
- SPF;
- DKIM;
- DMARC;
- TLS;
- DNS;
- return paths;
- deliverability;
- IP/domain reputation;
- one-click unsubscribe;
- preference management;
- bounce handling;
- complaints;
- suppression;
- retries;
- queues;
- idempotency;
- provider webhooks;
- email analytics;
- privacy;
- security;
- template testing;
- operational monitoring.

The objective is to make email:

```text
Reliable
Authenticated
Recognizable
Deliverable
Accessible
Responsive
Secure
Localized
Unsubscribable where required
Observable
Governed
```

The core principle is:

> **Email is an asynchronous external delivery channel, not a guaranteed synchronous transport. Every message must have a legitimate purpose, authenticated sender identity, explicit delivery semantics, and safe failure behavior.**

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
Email category
Affected recipients
Deliverability impact
Security/privacy impact
Owner
Review date
```

---

# 3. Email Is Not Guaranteed Delivery

A successful provider API response means:

```text
Provider accepted message
```

It does **not** mean:

```text
Recipient received it
Recipient inboxed it
Recipient opened it
Recipient read it
Recipient acted on it
```

---

# 4. Email Category Must Be Explicit

Every email type MUST belong to one defined category.

Canonical categories:

```text
Security-critical
Transactional
Subscription / product notification
Marketing / promotional
Operational/internal
```

---

# 5. Security-Critical Email

Examples:

```text
Password reset
New login alert
MFA recovery
Email-address verification
Security-key change
Account recovery
```

These messages exist to secure or restore an account.

---

# 6. Transactional Email

Examples:

```text
Receipt
Order confirmation
Booking confirmation
Invoice
Payment confirmation
Invite accepted
Form submission confirmation
```

These messages are directly caused by a user/business transaction.

---

# 7. Subscription / Product Notification

Examples:

```text
Weekly digest
Saved-search alert
Project activity digest
Product update subscription
Comment notifications
```

These may not be promotional but are recurring subscriptions/preferences.

---

# 8. Marketing / Promotional Email

Examples:

```text
Newsletter
Promotion
Sales campaign
Product marketing
Re-engagement campaign
Cross-sell
```

---

# 9. Operational/Internal Email

Examples:

```text
Production alert
Security operations alert
Finance operations report
Internal workflow notification
```

These are normally employee/operator communications.

---

# 10. Category Drives Policy

Email category determines:

```text
Sender stream
Priority
Retry policy
Unsubscribe behavior
Consent requirements
Template requirements
Reputation isolation
Tracking
Retention
```

---

# 11. Do Not Misclassify Marketing

Marketing content MUST NOT be labelled transactional merely to avoid unsubscribe or consent requirements.

---

# 12. Transactional Purity

Security-critical and transactional email SHOULD NOT contain substantial unrelated promotional content.

---

# 13. Separate Sending Streams

At minimum, the architecture SHOULD separate:

```text
Security/transactional traffic
Subscription/marketing traffic
```

---

# 14. Stronger Separation

At meaningful volume, use separate:

```text
sending subdomains
From addresses
provider streams
queues
rate limits
reputation monitoring
```

for transactional and marketing mail.

---

# 15. Example Domain Structure

Conceptually:

```text
notify.example.com
→ transactional

security.example.com
→ security

news.example.com
→ marketing/subscription
```

Exact naming is product-specific.

---

# 16. Separation Purpose

Separation reduces the risk that:

```text
marketing complaint spike
→ password-reset deliverability degradation
```

---

# 17. IP Separation

Dedicated or separate sending IP pools MAY be used when volume and sender reputation justify them.

They are not automatically better for low-volume senders.

---

# 18. Queue Separation

High-value transactional mail SHOULD NOT compete in the same delivery queue with a large campaign blast.

---

# 19. Priority

Recommended conceptual priority:

```text
Security-critical
↓
Transactional
↓
Subscription
↓
Marketing
```

---

# 20. Email Provider

Production email SHOULD use an approved email-service provider or professionally operated mail infrastructure.

---

# 21. Provider Evaluation

Email providers SHOULD be reviewed for:

```text
Deliverability
SPF/DKIM support
Custom return path
DMARC compatibility
Webhook security
Regional/data requirements
Suppression handling
Rate limits
API reliability
SLA
Pricing
Vendor risk
```

---

# 22. Provider Does Not Own Policy

An ESP implements transport.

The application remains responsible for:

```text
message category
recipient eligibility
consent
template correctness
suppression
business deduplication
security
```

---

# 23. Sender Identity

Every production message MUST have an intentional:

```text
From name
From address
Envelope sender / Return-Path
Reply-To where applicable
Message-ID
```

---

# 24. From Name

The visible From name SHOULD be stable and recognizable.

Examples:

```text
Acme
Acme Security
Acme Billing
```

---

# 25. Avoid Sender Identity Churn

Do not change sender names frequently to manipulate inbox recognition.

---

# 26. From Address

Use category-appropriate stable addresses.

Examples:

```text
security@security.example.com
receipts@notify.example.com
updates@news.example.com
```

---

# 27. Same Category, Stable From

Messages of the same category SHOULD use a consistent From identity.

---

# 28. Reply-To

Use `Reply-To` when user replies should go somewhere different from the visible sender address.

---

# 29. Monitored Reply Address

When users reasonably expect replies to receive support, replies SHOULD reach a monitored mailbox/workflow.

---

# 30. No-Reply Addresses

`no-reply@` MAY be used only when inbound replies genuinely cannot be processed and another clear support path exists where needed.

---

# 31. Envelope Sender

The SMTP envelope sender SHOULD use a domain controlled by the organization/provider and configured for SPF and bounce handling.

---

# 32. Custom Return Path

When supported, configure a branded/custom return-path domain aligned with sender infrastructure.

---

# 33. Message-ID

Messages SHOULD use globally unique `Message-ID` values under an appropriate controlled domain/provider implementation.

---

# 34. RFC Message Format

Production messages MUST conform to Internet email message-format requirements.

---

# 35. UTF-8

Templates and application content SHOULD use UTF-8 throughout the rendering pipeline.

---

# 36. MIME

HTML email SHOULD normally be sent as:

```text
multipart/alternative
├─ text/plain
└─ text/html
```

---

# 37. Plain-Text Alternative

HTML messages SHOULD include a meaningful text/plain alternative.

---

# 38. Plain Text Is Not HTML Stripping

Plain text SHOULD be intentionally readable.

It should not be raw HTML mechanically stripped into broken text.

---

# 39. Attachments

Attachments SHOULD be avoided unless genuinely useful.

Prefer secure download links where practical.

---

# 40. Attachment Risks

Attachments add:

```text
message size
malware risk
filtering risk
recipient storage
versioning problems
```

---

# 41. Attachment Validation

Generated or user-originated attachments follow File & Media Guidelines.

---

# 42. Sensitive Attachments

Sensitive documents SHOULD use authenticated, expiring access links when that provides safer access than persistent attachments.

---

# 43. Authentication Baseline

Every production sending domain MUST implement:

```text
SPF
DKIM
DMARC
```

regardless of whether a mailbox provider's minimum requirement is weaker.

---

# 44. Why All Three

SPF, DKIM, and DMARC solve different problems.

They MUST NOT be treated as interchangeable.

---

# 45. SPF

SPF authorizes SMTP sending infrastructure to use a domain in the relevant envelope identity.

---

# 46. SPF Record

Each sending domain SHOULD have one authoritative SPF policy.

---

# 47. SPF Sources

The SPF record MUST include every legitimate sender using that envelope domain.

---

# 48. Remove Obsolete SPF Sources

When an email provider is retired, its SPF authorization SHOULD be removed.

---

# 49. SPF Include Governance

Do not add provider `include:` mechanisms without ownership/review.

---

# 50. SPF Lookup Limits

SPF configuration MUST remain within the protocol's DNS lookup constraints.

---

# 51. SPF Complexity

Avoid long include chains.

Excessive indirection creates:

```text
failure risk
audit difficulty
unexpected authorization
```

---

# 52. SPF `+all`

Never publish an SPF policy that effectively authorizes everyone.

---

# 53. SPF Enforcement

Once the authorized sender inventory is verified, an appropriately restrictive terminal policy SHOULD be used according to the organization's mail architecture.

---

# 54. SPF Is Not Forwarding-Robust Alone

Forwarding can break SPF because the final SMTP sender differs.

Therefore DMARC resilience SHOULD NOT depend only on SPF.

---

# 55. DKIM

Every production message SHOULD be DKIM-signed.

---

# 56. DKIM Signing Domain

DKIM signing SHOULD use a domain controlled by the organization and aligned appropriately with the visible From domain.

---

# 57. DKIM Keys

Private DKIM keys are secrets.

They MUST be protected through approved secret/key-management practices.

---

# 58. DKIM Selector

DKIM selectors are public identifiers and SHOULD support key rotation.

---

# 59. DKIM Key Strength

Use provider-supported contemporary cryptographic key sizes.

For broad Gmail compatibility, RSA DKIM SHOULD generally use **2048-bit keys** where supported.

---

# 60. Key Rotation

DKIM keys MUST rotate:

```text
on compromise
on provider/security requirement
when operational policy requires
```

Periodic rotation SHOULD be supported operationally.

---

# 61. Rotation Without Outage

Key rotation SHOULD follow:

```text
publish new key
↓
begin signing
↓
allow DNS/message propagation
↓
retire old key
```

---

# 62. DKIM Coverage

Important headers required for security features such as RFC 8058 one-click unsubscribe MUST be covered by the relevant DKIM signature.

---

# 63. DMARC

DMARC connects the visible author domain to authenticated SPF/DKIM identities.

---

# 64. Current DMARC Baseline

The canonical standards baseline is **RFC 9989**.

---

# 65. DMARC Alignment

Production messages MUST achieve DMARC alignment through:

```text
aligned DKIM
or
aligned SPF
```

and SHOULD operationally support both where possible.

---

# 66. Prefer Aligned DKIM

Aligned DKIM is particularly important because it commonly survives forwarding more reliably than SPF.

---

# 67. DMARC Record

Every production author/sending domain MUST have an appropriate DMARC policy record.

---

# 68. DMARC Monitoring

DMARC aggregate reports SHOULD be collected and analyzed.

---

# 69. DMARC Deployment

Recommended progression:

```text
Inventory all legitimate senders
↓
SPF + DKIM
↓
DMARC p=none
↓
Monitor reports
↓
Correct unknown/misaligned senders
↓
Increase enforcement
↓
quarantine/reject where appropriate
```

---

# 70. Do Not Jump Blindly to Reject

Do not publish strict DMARC enforcement before legitimate mail sources are known and aligned.

---

# 71. Do Not Remain `p=none` Forever

For domains intended to prevent spoofing, `p=none` SHOULD normally be a deployment/monitoring phase rather than the permanent final state.

---

# 72. DMARC Enforcement

Domains SHOULD progress toward an appropriate enforcement policy when operational evidence shows legitimate senders are aligned.

---

# 73. Subdomain Policy

DMARC subdomain behavior MUST be intentional.

Do not allow unused subdomains to become ungoverned spoofing surfaces.

---

# 74. DMARC Reports

Aggregate reports SHOULD feed:

```text
authorized sender inventory
authentication failures
unknown sources
alignment failures
spoofing investigation
```

---

# 75. Report Privacy

DMARC-report processing follows Privacy & Data Governance requirements.

---

# 76. TLS

Outbound SMTP delivery MUST use TLS where required by current mailbox-provider expectations and provider infrastructure.

---

# 77. Opportunistic TLS

Provider infrastructure SHOULD negotiate secure SMTP transport wherever receiving infrastructure supports it.

---

# 78. MTA-STS

Organizations operating their own inbound email domains SHOULD consider MTA-STS where it improves protection against SMTP downgrade/interception.

---

# 79. TLS Reporting

MTA-STS deployments SHOULD consider TLS reporting for operational visibility.

---

# 80. DNS

Sending IPs/domains MUST have correct DNS configuration required by mailbox providers.

---

# 81. Reverse DNS

Dedicated sending IPs MUST have valid PTR/reverse DNS configured appropriately.

---

# 82. Forward Confirmation

The PTR hostname SHOULD resolve forward to the corresponding sending IP where required.

---

# 83. DNS Ownership

Email-related DNS records MUST be owned and reviewed as production configuration.

---

# 84. DNS Changes

Changes to:

```text
SPF
DKIM
DMARC
MX
PTR-related infrastructure
MTA-STS
TLS reporting
```

SHOULD follow Configuration/Infrastructure change governance.

---

# 85. DNS Monitoring

Critical email DNS SHOULD be monitored for accidental deletion or unauthorized change.

---

# 86. Marketing Consent

Marketing email MUST only be sent to recipients with a legitimate approved basis under applicable policy/law.

---

# 87. No Purchased Lists

The organization MUST NOT send normal product marketing campaigns to purchased, scraped, harvested, or otherwise unapproved mailing lists.

---

# 88. Consent Evidence

Subscription systems SHOULD retain auditable evidence such as:

```text
recipient
subscription source
timestamp
list/category
consent state
```

according to privacy policy.

---

# 89. Confirmation

Public self-service mailing-list subscription SHOULD use address confirmation/double opt-in where practical, especially where abuse or typo risk is meaningful.

---

# 90. Email Verification ≠ Marketing Consent

Verifying that:

```text
user owns address
```

does not automatically mean:

```text
user consented to marketing
```

---

# 91. Transaction ≠ Marketing Consent

Creating an account or buying a product MUST NOT automatically be treated as unrestricted marketing consent where such consent is required.

---

# 92. Subscription Categories

Preference systems SHOULD distinguish:

```text
Security
Required account
Product activity
Digests
Announcements
Marketing
```

where user choice differs.

---

# 93. Required Email

Some email cannot reasonably be disabled.

Examples MAY include:

```text
password reset
security-critical alert
legally required transaction record
```

---

# 94. Optional Transactional Notifications

Optional product notifications SHOULD expose preference controls.

---

# 95. Marketing Unsubscribe

Every marketing/subscription message covered by subscription requirements MUST provide straightforward unsubscribe.

---

# 96. Visible Body Unsubscribe

Marketing/subscription email MUST include a clearly visible unsubscribe mechanism in the message body.

---

# 97. One-Click Unsubscribe

Marketing/subscription mail MUST implement RFC 8058 one-click unsubscribe where applicable.

---

# 98. Required Headers

Canonical one-click structure includes:

```text
List-Unsubscribe: <https://...>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

---

# 99. DKIM Coverage for One-Click

The one-click unsubscribe headers MUST be covered by a valid DKIM signature as required by RFC 8058.

---

# 100. One-Click Means One-Click

The one-click endpoint MUST complete the unsubscribe without:

```text
login
password
confirmation page
additional user input
```

---

# 101. HTTPS Endpoint

The RFC 8058 endpoint MUST use HTTPS.

---

# 102. Opaque Identifier

Unsubscribe URLs SHOULD contain an opaque, hard-to-forge token rather than exposing unnecessary recipient information.

---

# 103. No Session Dependency

The one-click endpoint MUST NOT require:

```text
browser cookie
authenticated session
existing web state
```

---

# 104. No Redirect

The one-click POST endpoint SHOULD process the request directly rather than relying on HTTP redirects.

---

# 105. Body Preference Link

In addition to one-click headers, the visible body link MAY lead to a preference center.

---

# 106. Body Link Is Not Replacement

A preference-center link in the body does NOT replace RFC 8058 one-click behavior where the latter is required.

---

# 107. Unsubscribe Scope

The unsubscribe operation MUST clearly map to the relevant:

```text
subscription
list
marketing stream
```

---

# 108. Global Marketing Opt-Out

Users SHOULD have a simple way to stop all optional marketing where appropriate.

---

# 109. Unsubscribe Processing Time

Unsubscribe requests SHOULD be applied immediately.

Operational hard limit:

> **No later than 48 hours.**

Applicable law MAY require additional or stricter behavior.

---

# 110. Suppression First

An unsubscribe SHOULD immediately create suppression state even if downstream campaign systems synchronize asynchronously.

---

# 111. Resubscribe

A suppressed recipient MUST NOT be silently re-subscribed by:

```text
import
CRM sync
list regeneration
campaign creation
```

---

# 112. Fresh Intent

Resubscription SHOULD require a new affirmative user action.

---

# 113. List Identifier

Subscription mail SHOULD provide a stable human-understandable/list identifier through appropriate mail headers or distinct sender identity.

---

# 114. Transactional Unsubscribe

Mandatory security/transactional messages SHOULD NOT include a misleading unsubscribe that suggests the user can disable required account communication.

---

# 115. Preference Link in Transactional Mail

Optional notification preferences MAY be linked from transactional/product-notification messages when relevant.

---

# 116. Marketing Separation

Marketing messages SHOULD NOT use the same exact sender stream as password-reset/security mail.

---

# 117. Subject Line

Subject lines MUST accurately describe the message.

---

# 118. Deceptive Subjects

Do not use misleading:

```text
Re:
Fwd:
Urgent:
Account suspended
```

unless they truthfully represent the message/context.

---

# 119. Subject Privacy

Do not place sensitive information in subject lines.

Subjects may appear on:

```text
lock screens
shared devices
notification previews
server logs
```

---

# 120. Subject Brevity

Front-load important meaning.

Avoid long promotional filler.

---

# 121. Preheader

HTML email SHOULD define useful preheader/preview text where client support makes it useful.

---

# 122. Preheader Complements Subject

Preheader SHOULD add context rather than simply duplicate the subject.

---

# 123. Hidden Preheader

Hidden preview text MUST NOT interfere with screen-reader reading order.

---

# 124. Template Anatomy

A typical message MAY contain:

```text
Preheader
Brand/sender identity
Primary heading
Core message
Primary CTA
Supporting details
Fallback URL/help
Footer
Preferences/unsubscribe where applicable
```

---

# 125. One Primary Purpose

Each email SHOULD have one primary communication purpose.

---

# 126. One Primary CTA

Where an action is required, the email SHOULD generally have one visually dominant CTA.

---

# 127. CTA Label

CTA copy MUST state the action.

Prefer:

```text
Reset password
View invoice
Review request
Verify email address
```

over:

```text
Click here
Continue
Learn more
```

when the action can be named.

---

# 128. CTA as Link

Navigation CTAs in email SHOULD use ordinary HTTPS links.

---

# 129. Fallback URL

High-value action emails MAY provide a readable fallback link when button rendering fails.

---

# 130. Link Destination

The destination MUST match the CTA promise.

---

# 131. HTTPS Links

Production email links MUST use HTTPS except where a protocol-specific link is deliberately required.

---

# 132. Open Redirects

Email CTA URLs MUST NOT use unsafe open redirects.

---

# 133. Tracking Redirects

Tracking redirect infrastructure MUST preserve:

```text
security
availability
destination integrity
latency
```

---

# 134. Security Links

Security-sensitive links SHOULD minimize unnecessary third-party tracking redirects.

---

# 135. Link Scanner Safety

Email-security systems may prefetch or open links automatically.

Therefore:

> **GET requests from email links MUST NOT directly perform destructive or irreversible actions.**

---

# 136. Password Reset

A password-reset link SHOULD open a reset workflow.

The password change itself occurs only after explicit user action.

---

# 137. Magic Links

Magic-link authentication MUST account for automated link scanners and prefetchers.

Where scanner activation could authenticate a session, use a safer confirmation/exchange design.

---

# 138. Email Verification

Verification GET behavior SHOULD be designed so automated scanners cannot cause damaging side effects.

---

# 139. Destructive Links

Never implement:

```text
GET /delete-account?token=...
```

that immediately deletes data.

---

# 140. Sensitive Tokens

Action tokens MUST be:

```text
unguessable
purpose-bound
time-limited where appropriate
revocable/single-use where required
```

---

# 141. Token Logging

Sensitive email tokens MUST NOT be logged in plaintext unnecessarily.

---

# 142. Query Strings

Avoid including sensitive personal data directly in email-link query parameters.

---

# 143. Template Rendering

Templates SHOULD be rendered from version-controlled application/template source.

---

# 144. Provider Templates

Provider-hosted templates MAY be used if they preserve:

```text
review
versioning
localization
testing
rollback
```

requirements.

---

# 145. Template Registry

The system SHOULD maintain a canonical registry:

```text
Template ID
Purpose
Category
Owner
Locales
Sender
Unsubscribe policy
Data schema
```

---

# 146. Template Data Contract

Every template SHOULD define a typed input/data contract.

---

# 147. No Arbitrary Template Data

Avoid passing a giant untyped object such as:

```text
everything about user
everything about account
```

into templates.

---

# 148. Data Minimization

Pass only values needed to render the message.

---

# 149. Template Escaping

Dynamic content MUST be correctly escaped for:

```text
HTML
text
URL
attribute
```

contexts.

---

# 150. User HTML

User-generated HTML MUST NOT be inserted into an email template unsanitized.

---

# 151. Rich User Content

If user-generated rich content is included:

```text
sanitize
limit
escape
```

according to Security Guidelines.

---

# 152. HTML Email Reality

Email clients support a more constrained and inconsistent HTML/CSS environment than modern browsers.

Templates MUST be designed accordingly.

---

# 153. JavaScript

JavaScript MUST NOT be required for email functionality.

---

# 154. Forms

Critical interaction SHOULD NOT depend on HTML forms embedded in email.

Use links to the authenticated/public product instead.

---

# 155. Complex Widgets

Do not place:

```text
custom dropdowns
modal dialogs
client-side widgets
SPA interactions
```

inside ordinary HTML email.

---

# 156. Layout

Email layouts SHOULD use robust, conservative HTML structures proven across supported mail clients.

---

# 157. Presentation Tables

Table-based presentation MAY be used for robust email layout.

Presentation-only tables SHOULD be marked appropriately so they do not create misleading data-table semantics where supported.

---

# 158. Email Width

A centered readable content region is recommended.

A common practical desktop max width is approximately:

```text
600–640 CSS px
```

but this is a design heuristic, not a protocol rule.

---

# 159. Fluid Mobile Width

At narrow widths, content SHOULD expand fluidly to available width with safe gutters.

---

# 160. Responsive CSS

Media queries MAY enhance responsive email where supported.

Critical readability MUST NOT depend exclusively on them.

---

# 161. Mobile-First Content

Important content and CTA SHOULD remain understandable even if advanced responsive CSS is stripped.

---

# 162. Inline CSS

Email CSS SHOULD generally be compatible with the target email-client matrix.

Build tooling MAY inline styles where this improves compatibility.

---

# 163. CSS Complexity

Avoid unnecessary reliance on advanced browser CSS that common email clients do not consistently support.

---

# 164. Web Fonts

Custom web fonts MAY be used as progressive enhancement.

A robust fallback font stack MUST exist.

---

# 165. Font Size

Body text SHOULD remain comfortably readable on mobile without requiring zoom.

---

# 166. Touch CTA

Primary tappable actions SHOULD generally provide an ergonomic target around:

```text
44 × 44 CSS px
```

or larger where practical.

---

# 167. Image Width

Images MUST scale within the message viewport.

---

# 168. Image Dimensions

Images SHOULD have dimensions/aspect ratios specified where useful to reduce layout instability.

---

# 169. Image Blocking

Email MUST remain understandable when remote images are blocked.

---

# 170. Image-Only Email

Never place essential message meaning exclusively in an image.

---

# 171. Alt Text

Meaningful email images SHOULD have appropriate `alt` text.

Decorative images SHOULD use empty/decorative alt semantics.

---

# 172. Text as Image

Avoid embedding important headings, instructions, codes, or CTAs entirely inside images.

---

# 173. Retina Images

Higher-resolution assets MAY be supplied for high-density displays while rendered at sensible CSS dimensions.

---

# 174. Image Size

Optimize image file sizes.

A visually small email image should not require a multi-megabyte download.

---

# 175. Background Images

Background images MAY be used decoratively.

Critical text/contrast MUST remain correct if they are unsupported.

---

# 176. Dark Mode

Email clients may modify colors automatically in dark mode.

Templates MUST be resilient to client-side color transformation.

---

# 177. Dark Mode Is Not Fully Controllable

Do not assume application-style exact dark-mode control inside every email client.

---

# 178. Dark Mode Testing

Core templates SHOULD be tested in representative clients using:

```text
light mode
dark mode
```

---

# 179. Logo Dark Mode

Brand marks SHOULD remain visible when clients alter backgrounds/colors.

---

# 180. Transparent Images

Transparent assets SHOULD be reviewed against both light and dark backgrounds.

---

# 181. Accessibility

Email content MUST follow applicable Accessibility Guidelines.

---

# 182. Document Language

HTML email SHOULD declare the appropriate language where possible.

---

# 183. RTL

Localized RTL email MUST define correct direction and layout behavior.

---

# 184. Heading Structure

Use meaningful heading hierarchy.

Do not use visual font size alone to simulate headings.

---

# 185. Reading Order

Source order MUST remain logical.

---

# 186. Contrast

Text and essential UI elements MUST have sufficient contrast.

---

# 187. Link Text

Links SHOULD have descriptive text.

Avoid repeated:

```text
Click here
Read more
```

where destination can be stated.

---

# 188. Color Alone

Status/meaning MUST NOT depend only on color.

---

# 189. Accessible CTA

Button-like links MUST remain understandable as links if CSS styling is removed.

---

# 190. Localization

Email locale follows Internationalization Guidelines.

---

# 191. Recipient Locale

Render email in the recipient's intended locale, not the sender/operator locale.

---

# 192. Locale Resolution

Recommended priority:

```text
explicit user preference
↓
account preference
↓
known signup locale
↓
application default
```

---

# 193. Fallback Locale

Every email template MUST have deterministic fallback behavior.

---

# 194. Missing Translation

A missing translation MUST NOT send raw translation keys to recipients.

---

# 195. Date and Time

Dates/times MUST use the relevant:

```text
locale
timezone
```

according to the event/message semantics.

---

# 196. Timezone Context

When time matters, include enough context to avoid ambiguity.

---

# 197. Currency

Money MUST retain authoritative currency and use locale-aware formatting.

---

# 198. Subject Localization

Subject and preheader are part of the localized template.

---

# 199. Unsubscribe Localization

Unsubscribe/preferences copy MUST be understandable in the recipient's message locale.

---

# 200. Legal/Footer Localization

Required sender/legal information SHOULD be localized where applicable.

---

# 201. Content Tone

Email copy follows Content & UX Writing Guidelines.

---

# 202. Transactional Tone

Transactional email SHOULD be:

```text
specific
calm
concise
outcome-focused
```

---

# 203. Security Tone

Security email SHOULD be direct and serious without unnecessary alarmism.

---

# 204. Marketing Tone

Marketing MAY use more expressive brand voice but MUST remain truthful.

---

# 205. No False Urgency

Do not use fake:

```text
URGENT
LAST CHANCE
ACCOUNT AT RISK
```

language merely to increase opens/clicks.

---

# 206. Security Warning Anatomy

Security email SHOULD answer:

```text
What happened?
When?
Where/which account?
Was this me?
What should I do if not?
```

without exposing excessive sensitive detail.

---

# 207. Transaction Identifier

Receipts/invoices SHOULD provide identifiers users need for support/reconciliation.

---

# 208. Sensitive Data

Include the minimum personal/account information necessary.

---

# 209. Full Payment Details

Do not send full card/account credentials through email.

---

# 210. Passwords

Passwords MUST NEVER be emailed.

---

# 211. Recovery Codes

Long-lived recovery secrets SHOULD NOT be sent casually by email unless the security architecture explicitly requires and protects that flow.

---

# 212. Verification Codes

Short-lived verification codes MAY be emailed according to Authentication Guidelines.

---

# 213. Code Expiration

When a code/link expires, the email SHOULD communicate relevant expiry semantics without misleading precision.

---

# 214. Queueing

Email SHOULD normally be dispatched through a background-job/queue architecture.

---

# 215. Request Path

A web request SHOULD NOT remain blocked until the remote email provider finishes delivery.

---

# 216. Transaction Commit

Queue email only after the authoritative business state required to justify the email has been committed.

---

# 217. Outbox

High-value message workflows SHOULD consider an outbox/reliable-event pattern where database transaction + message creation consistency matters.

---

# 218. Exactly Once

Exactly-once email delivery cannot be assumed.

Design for:

```text
at-least-once processing
+
idempotent send decision
```

where duplicates matter.

---

# 219. Email Idempotency

Messages SHOULD have a logical idempotency key.

Conceptually:

```text
template
+
business event ID
+
recipient
+
version/category
```

---

# 220. Duplicate Prevention

Retries MUST NOT send duplicate receipts, invites, or security messages when the original provider request actually succeeded but the client lost the response.

---

# 221. Provider Idempotency

Use provider idempotency features where available.

Application-level deduplication SHOULD still exist for important messages.

---

# 222. Job Payload

Email jobs SHOULD contain stable identifiers rather than copying large sensitive domain objects.

Example:

```text
message_type
event_id
recipient_id
locale
```

---

# 223. Render Timing

Decide whether email content is rendered:

```text
when event happens
or
when job executes
```

according to consistency requirements.

---

# 224. Immutable Transaction Snapshot

Receipts and legally significant confirmations SHOULD preserve the historical transaction facts rather than re-query mutable current state and accidentally changing the message.

---

# 225. Marketing Freshness

Marketing content MAY render closer to send time when freshness is desired.

---

# 226. Retry Policy

Retry only failures that may be transient.

---

# 227. Transient Failure

Examples:

```text
provider timeout
temporary 4xx SMTP response
rate limit
network failure
```

may justify retry.

---

# 228. Permanent Failure

Examples such as hard recipient rejection SHOULD NOT be retried indefinitely.

---

# 229. Exponential Backoff

Retries SHOULD use bounded exponential backoff with jitter.

---

# 230. Retry TTL

Every email type SHOULD define how long it remains useful.

---

# 231. Expired Email

Do not deliver a stale password-reset email after its reset token has expired.

---

# 232. Security Message TTL

Security email retries SHOULD account for token/session expiry.

---

# 233. Receipt TTL

Receipts may remain useful for much longer and MAY use a longer retry window.

---

# 234. Campaign TTL

Time-sensitive campaigns SHOULD stop retrying when the offer/message is no longer relevant.

---

# 235. Rate Limits

Sending infrastructure MUST respect provider and mailbox-provider rate limits.

---

# 236. Gradual Volume

Large sending-volume increases SHOULD be gradual.

Do not suddenly send massive campaigns from a cold domain/IP.

---

# 237. Reputation Warm-Up

New dedicated sending infrastructure SHOULD be warmed according to legitimate recipient engagement/volume patterns.

---

# 238. No Fake Warm-Up

Do not manufacture engagement or send synthetic traffic to manipulate reputation.

---

# 239. Backpressure

Marketing traffic MUST yield capacity when required to protect security/transactional delivery.

---

# 240. Bounce Classification

Delivery events SHOULD distinguish:

```text
Delivered/accepted
Soft bounce
Hard bounce
Deferred
Rejected
Complaint
Unsubscribed
```

according to provider information.

---

# 241. Accepted ≠ Inbox

Provider/mailbox acceptance does not prove inbox placement.

---

# 242. Hard Bounce

A confirmed permanent invalid-recipient bounce SHOULD suppress further normal sending to that address.

---

# 243. Soft Bounce

Temporary failures MAY be retried according to bounded policy.

---

# 244. Repeated Soft Bounce

Repeated soft bounces SHOULD eventually suppress or require recipient correction.

---

# 245. Suppression Registry

The application SHOULD maintain authoritative suppression state independent of one provider.

---

# 246. Suppression Reasons

Examples:

```text
Unsubscribed
Hard bounce
Spam complaint
Administrative block
Abuse prevention
```

---

# 247. Suppression Scope

Suppression MUST distinguish where appropriate:

```text
marketing only
specific subscription
all optional email
entire address
```

---

# 248. Hard-Bounce Scope

A structurally invalid/nonexistent mailbox may require suppression across all ordinary message types until the address is changed or revalidated.

---

# 249. Critical Security Exception

Security/legal architecture MAY require special handling for otherwise suppressed addresses.

Such behavior MUST be deliberate and monitored.

---

# 250. Spam Complaint

A spam complaint SHOULD immediately stop optional marketing/subscription sends to that recipient.

---

# 251. Complaint Reputation

Complaint rate is a critical deliverability metric.

---

# 252. Complaint Threshold

Sending systems MUST keep complaint/spam rates below mailbox-provider requirements.

---

# 253. Internal Alert Threshold

Internal operating thresholds SHOULD be stricter than provider enforcement thresholds so teams receive warning before deliverability is at risk.

---

# 254. Current Provider Ceiling

A complaint rate approaching **0.3%** is already operationally dangerous for major mailbox providers and MUST trigger investigation.

---

# 255. Complaint Investigation

Investigate:

```text
list source
campaign
sender identity
frequency
content mismatch
unsubscribe failure
consent
```

---

# 256. Provider Webhooks

Delivery-event webhooks SHOULD be used where available.

---

# 257. Webhook Authentication

Provider webhooks MUST be authenticated/verified.

---

# 258. Webhook Idempotency

Webhook processing MUST be idempotent.

---

# 259. Webhook Ordering

Do not assume provider events arrive exactly once or strictly in order.

---

# 260. Event State Machine

Email delivery status updates SHOULD tolerate sequences such as:

```text
accepted
→ deferred
→ delivered
```

and duplicated events.

---

# 261. Webhook Replay

Replay protection SHOULD be used where provider signing scheme supports it.

---

# 262. Provider Event Retention

Do not depend on the email provider as the permanent authoritative event archive.

---

# 263. Email Audit

Important application sends SHOULD record:

```text
logical message ID
recipient reference
template/version
category
locale
queued timestamp
provider acceptance
delivery state
```

subject to privacy/retention requirements.

---

# 264. Body Retention

Full email bodies SHOULD NOT be retained indefinitely merely for debugging.

---

# 265. Sensitive Logs

Do not log:

```text
password reset tokens
magic-link secrets
verification codes
sensitive attachment URLs
```

---

# 266. Observability

Email operations SHOULD monitor:

```text
queue depth
send latency
provider errors
bounce rate
complaint rate
suppression rate
unsubscribe processing
authentication health
```

---

# 267. Separate Metrics by Stream

Metrics SHOULD be segmented by:

```text
transactional
security
subscription
marketing
provider/domain
```

where useful.

---

# 268. Deliverability Dashboard

At meaningful scale, maintain a dashboard for:

```text
SPF
DKIM
DMARC
spam complaints
bounce rate
provider deferrals
rejections
```

---

# 269. Gmail Postmaster Tools

High-volume Gmail senders SHOULD monitor relevant Postmaster Tools data.

---

# 270. DMARC Dashboard

DMARC aggregate reporting SHOULD make unauthorized/misaligned senders visible.

---

# 271. Alerting

Alert on meaningful degradation such as:

```text
DKIM failures
DMARC failures
provider rejection spike
queue growth
hard-bounce spike
complaint spike
unsubscribe endpoint failure
```

---

# 272. Synthetic Test

Critical email infrastructure SHOULD have periodic delivery/synthetic checks.

---

# 273. Synthetic Caveat

Synthetic inbox tests do not prove broad real-world deliverability.

They detect obvious failures.

---

# 274. Deliverability Is Multi-Factor

Inbox placement depends on factors including:

```text
authentication
sender reputation
recipient engagement
complaints
content
volume patterns
infrastructure
```

There is no single "deliverability score" proving inbox placement.

---

# 275. Open Tracking

Open tracking SHOULD be optional and privacy-reviewed.

---

# 276. Open Rate Is Unreliable

Image proxies, privacy protections, image blocking, and automated processing mean:

> **Open events are not authoritative proof that a person read the message.**

---

# 277. Security Decisions

Security or business decisions MUST NOT rely on open tracking.

---

# 278. Click Tracking

Click tracking SHOULD be privacy-reviewed and used only where analytically justified.

---

# 279. Security Email Tracking

Security/recovery emails SHOULD minimize tracking infrastructure that rewrites sensitive links.

---

# 280. Transactional Analytics

For transactional email, prefer reliable operational metrics:

```text
queued
sent
accepted
bounced
complaint
user completed task
```

over superficial open metrics.

---

# 281. Marketing Analytics

Marketing analytics follows Analytics/Privacy requirements and user consent rules.

---

# 282. Tracking Domains

Tracking links/images SHOULD use controlled branded domains where technically feasible and trustworthy.

---

# 283. Privacy

Email addresses are personal data.

They MUST follow Privacy & Data Governance Guidelines.

---

# 284. Recipient Minimization

Only retain recipient information needed for:

```text
delivery
preferences
suppression
audit
compliance
```

---

# 285. Email Provider as Processor

Third-party sending providers MUST undergo vendor/privacy review appropriate to the data they receive.

---

# 286. Template Privacy

Do not include more private account data than the recipient needs.

---

# 287. Shared Mailboxes

Assume an email address may be:

```text
shared
forwarded
archived
visible on lock screens
```

Design content accordingly.

---

# 288. BCC

Do not send multi-recipient customer email by exposing recipient addresses through `To` or `Cc`.

---

# 289. Bulk Personalization

Bulk messages SHOULD be individually addressed through proper campaign systems rather than giant BCC lists.

---

# 290. Email Enumeration

Password reset/signup flows MUST NOT expose account existence through differing application responses where enumeration risk applies.

---

# 291. Send Timing

Marketing sends SHOULD respect user preferences and applicable quiet-hour/policy requirements.

---

# 292. Security Email Timing

Security-critical messages SHOULD be sent promptly and not delayed for marketing quiet-hour rules.

---

# 293. Scheduled Email

Scheduled sends MUST account for recipient timezone when timing semantics are user-local.

---

# 294. Frequency Caps

Optional email programs SHOULD support frequency controls where message volume could become excessive.

---

# 295. Digesting

High-volume low-urgency notifications SHOULD consider digests rather than one email per event.

---

# 296. Deduplication

Closely related events MAY be combined when this improves recipient usefulness without hiding important state.

---

# 297. Email Storm Prevention

The system MUST protect against:

```text
event loop
retry loop
import bug
automation bug
```

causing thousands of duplicate emails to one recipient.

---

# 298. Per-Recipient Guardrail

High-risk mail systems SHOULD have anomalous-volume protection per recipient/template/category.

---

# 299. Campaign Kill Switch

Marketing/bulk-send infrastructure SHOULD have an operational kill switch.

---

# 300. Transactional Protection

A marketing kill switch MUST NOT unnecessarily disable password resets or other critical transactional mail.

---

# 301. Template Preview

Every core template SHOULD have preview fixtures covering representative data.

---

# 302. Preview Data

Preview fixtures MUST use synthetic/non-sensitive data.

---

# 303. Email Client Testing

Core templates SHOULD be tested against a representative mail-client matrix.

---

# 304. Test Matrix

Consider representative environments across:

```text
Gmail web/mobile
Apple Mail
Outlook environments
mobile clients
light/dark mode
```

according to actual customer use.

---

# 305. Pixel Identity

Perfect pixel identity across all email clients is not required.

Required goals are:

```text
readability
brand recognition
correct hierarchy
working CTA
accessibility
```

---

# 306. Rendering Differences

Minor:

```text
font rendering
spacing
border
shadow
```

differences MAY be acceptable.

---

# 307. Functional Differences

Broken:

```text
CTA
content
links
layout
reading order
unsubscribe
```

are not acceptable.

---

# 308. Link Testing

Automated tests SHOULD verify critical template links are valid and use expected hosts/protocols.

---

# 309. Unsubscribe Testing

Marketing test suites MUST verify:

```text
visible unsubscribe
RFC 8058 headers
one-click POST
suppression update
no authentication requirement
```

---

# 310. Authentication Test

Production smoke checks SHOULD verify messages produce expected:

```text
SPF
DKIM
DMARC
```

results.

---

# 311. Header Test

Tests SHOULD validate:

```text
From
Reply-To
List-Unsubscribe
List-Unsubscribe-Post
List-ID where applicable
Message-ID
```

---

# 312. Plain-Text Test

Text/plain rendering SHOULD be inspected for readability.

---

# 313. Accessibility Test

Core templates SHOULD receive automated and manual accessibility review where tooling permits.

---

# 314. Localization Test

Test:

```text
long translations
RTL
different date formats
currency
names
```

---

# 315. Dark-Mode Test

Critical templates SHOULD be visually reviewed under representative dark-mode clients.

---

# 316. Image-Off Test

Templates SHOULD remain understandable with images disabled.

---

# 317. Production Seed List

High-value sending streams MAY use controlled seed addresses for production delivery health checks.

---

# 318. Test Recipients

Test mail MUST NOT accidentally send production-sensitive customer data to seed/test recipients.

---

# 319. Development Environment

Development/staging MUST NOT freely send email to arbitrary external customer addresses.

---

# 320. Safe Test Sink

Non-production environments SHOULD use:

```text
mail catcher
test provider sandbox
recipient allowlist
address rewriting
```

---

# 321. Staging Guardrail

If staging can send externally, recipient destinations MUST be explicitly constrained.

---

# 322. Test Subject Marker

Non-production messages SHOULD be clearly marked where they can reach real mailboxes.

Example:

```text
[STAGING]
```

---

# 323. Preview Links

Preview tools MUST not expose production secrets or private user data.

---

# 324. Email Configuration

Sender domains, provider credentials, API keys, webhook secrets, and stream IDs follow Configuration & Environment Guidelines.

---

# 325. Provider API Key

Provider credentials MUST be stored in approved secret management.

---

# 326. Least Privilege

Use the narrowest provider API permission capable of sending required mail.

---

# 327. Credential Separation

Production and non-production email credentials MUST be separate.

---

# 328. Domain Separation

Where possible, non-production email SHOULD NOT use the exact same sending identity/reputation stream as production.

---

# 329. Incident Response

Email incidents MAY include:

```text
credential compromise
spam campaign
spoofing
authentication failure
campaign sent to wrong audience
broken unsubscribe
mass duplicate send
```

---

# 330. Emergency Stop

Operations MUST be able to stop affected sending quickly.

---

# 331. Credential Compromise

On suspected provider/DKIM credential compromise:

```text
disable/revoke
rotate
investigate
review provider logs
verify DNS/authentication
assess unauthorized sends
```

according to Incident Response Guidelines.

---

# 332. Wrong-Audience Campaign

A mistaken bulk send SHOULD be treated as a privacy/product incident where appropriate.

---

# 333. Unsubscribe Outage

An outage of required unsubscribe infrastructure SHOULD stop affected marketing sends until compliance is restored.

---

# 334. DKIM Failure

A systemic DKIM failure SHOULD stop or strongly gate high-volume nonessential mail until repaired.

---

# 335. DMARC Failure Spike

An unexplained DMARC failure spike requires investigation before continuing large campaigns.

---

# 336. Queue Recovery

After provider outage recovery, queued email MUST be rate-controlled.

Do not release hours of backlog instantaneously without considering:

```text
relevance
provider limits
reputation
recipient flooding
```

---

# 337. Backlog Expiry

Expired/stale emails SHOULD be dropped rather than delivered late.

---

# 338. Business Continuity

Critical product email SHOULD define provider outage behavior.

---

# 339. Secondary Provider

A secondary ESP MAY be maintained for high-criticality systems.

It requires:

```text
authentication readiness
tested templates
routing
suppression synchronization
operational drills
```

---

# 340. Failover Is Not Automatic Magic

Moving to a cold backup sender/domain can itself cause deliverability problems.

Failover design MUST account for reputation.

---

# 341. Suppression Portability

Critical suppression state SHOULD remain under organizational control so provider migration does not reactivate unsubscribed/bounced recipients.

---

# 342. Template Portability

Provider migration SHOULD NOT require reconstructing every template manually from screenshots.

---

# 343. Email Review Checklist

```text
□ Category defined
□ Recipient eligibility
□ Correct sending stream
□ Sender identity
□ SPF
□ DKIM
□ DMARC
□ Subject
□ Preheader
□ HTML
□ Plain text
□ Responsive
□ Accessible
□ Localized
□ CTA safe
□ Queue/retry policy
□ Suppression behavior
□ Tracking/privacy
□ Tests
```

---

# 344. Transactional Email Checklist

```text
□ Triggered by authoritative event
□ Correct recipient
□ No unnecessary marketing
□ Idempotency key
□ Queue priority
□ Retry TTL
□ Sender stream
□ Clear subject
□ Expected action
□ Security-safe links
□ No misleading unsubscribe
```

---

# 345. Marketing Email Checklist

```text
□ Legitimate subscription
□ Consent/source recorded
□ Marketing sending stream
□ Visible unsubscribe
□ RFC 8058 one-click
□ Preference center
□ Suppression checked
□ Complaint rate monitored
□ Frequency limits
□ Tracking approved
□ Locale/timezone
```

---

# 346. Authentication Checklist

```text
□ SPF record valid
□ All senders authorized
□ No obsolete providers
□ DNS lookup limits respected
□ DKIM enabled
□ DKIM aligned
□ Strong key
□ DMARC published
□ DMARC reports monitored
□ Alignment passes
□ Enforcement plan
□ PTR/forward DNS correct where applicable
□ TLS
```

---

# 347. Template Checklist

```text
□ One primary purpose
□ Clear subject
□ Useful preheader
□ Heading hierarchy
□ Responsive width
□ Mobile CTA
□ Image-off readable
□ Dark-mode resilient
□ Semantic reading order
□ Descriptive links
□ Plain-text alternative
□ Long translation safe
□ RTL where relevant
```

---

# 348. Security Checklist

```text
□ No password
□ No sensitive subject data
□ HTTPS links
□ No open redirect
□ Token opaque
□ Token scoped
□ Token expiry
□ GET not destructive
□ Link scanners considered
□ User content sanitized
□ Provider webhook verified
□ Secrets not logged
```

---

# 349. Deliverability Checklist

```text
□ Authentication passes
□ Complaint rate healthy
□ Bounce rate healthy
□ Volume stable
□ Domain reputation monitored
□ Sender category consistent
□ Marketing/transactional separated
□ List quality
□ Easy unsubscribe
□ No purchased list
□ Provider rejects monitored
```

---

# 350. Unsubscribe Checklist

```text
□ Marketing/subscription only where appropriate
□ Body link visible
□ List-Unsubscribe
□ List-Unsubscribe-Post
□ HTTPS POST
□ DKIM covers headers
□ No login
□ No confirmation required
□ Opaque token
□ Suppression immediate
□ Completed within 48 hours
□ Resubscribe requires new intent
```

---

# 351. Queue Checklist

```text
□ Background job
□ Transaction committed first
□ Idempotency key
□ Category priority
□ Bounded retry
□ Backoff + jitter
□ Expiration
□ Duplicate protection
□ Provider rate limit
□ Backpressure
□ Dead-letter/reconciliation
```

---

# 352. Bounce Checklist

```text
□ Hard vs soft distinguished
□ Hard bounce suppresses
□ Soft bounce bounded retry
□ Repeated soft bounce policy
□ Complaint suppression
□ Provider webhook verified
□ Events idempotent
□ State not provider-only
```

---

# 353. Operational Checklist

```text
□ Queue depth
□ Send latency
□ Provider error rate
□ Bounce rate
□ Complaint rate
□ DMARC reports
□ DKIM/SPF health
□ Unsubscribe endpoint
□ Kill switch
□ Incident owner
```

---

# 354. Definition of Done — New Email Template

A new email template is production-ready when:

```text
✓ Category defined
✓ Purpose documented
✓ Owner assigned
✓ Recipient eligibility defined
✓ Sender stream defined
✓ Template contract typed
✓ Subject/preheader complete
✓ HTML + plain text
✓ Responsive
✓ Accessible
✓ Localized
✓ Dark-mode reviewed
✓ Security links reviewed
✓ Unsubscribe policy implemented
✓ Queue/retry policy defined
✓ Idempotency defined
✓ Tests pass
✓ Production authentication verified
```

---

# 355. Definition of Done — New Sending Domain

```text
✓ Domain/subdomain purpose defined
✓ DNS ownership
✓ SPF
✓ DKIM
✓ DMARC
✓ Alignment
✓ DMARC reporting
✓ PTR where applicable
✓ TLS
✓ Provider verified
✓ Reputation plan
✓ Stream separation
✓ Monitoring
✓ Incident runbook
```

---

# 356. Definition of Done — Marketing Program

```text
✓ Subscription source legitimate
✓ Recipient consent evidence
✓ List/category defined
✓ Sender identity stable
✓ Dedicated stream
✓ One-click unsubscribe
✓ Visible body unsubscribe
✓ Suppression registry
✓ Complaint monitoring
✓ Frequency controls
✓ Bounce handling
✓ Deliverability dashboard
✓ Privacy/legal review
```

---

# 357. Definition of Done — Provider Migration

```text
✓ Sending domains verified
✓ SPF updated
✓ DKIM active
✓ DMARC alignment verified
✓ Return path configured
✓ Templates migrated/tested
✓ Suppressions migrated
✓ Webhooks verified
✓ Queue/rate limits configured
✓ Warm-up/reputation plan
✓ Old provider removed from SPF after cutover
✓ Rollback plan
```

---

# 358. Email Anti-Patterns

Avoid:

```text
sendEmail()
```

directly inside request handling with no queue.

Avoid:

```text
marketing blast
+
password reset
```

sharing one unprioritized queue.

Avoid:

```text
marketing@example.com
```

for password-reset mail.

Avoid:

```text
SPF only
```

as the entire authentication architecture.

Avoid:

```text
DKIM only
```

with no DMARC.

Avoid permanent:

```text
p=none
```

with no enforcement roadmap for a protected sending domain.

Avoid:

```text
v=spf1 +all
```

Avoid giant SPF include chains nobody owns.

Avoid stale provider authorization in SPF.

Avoid unsigned production mail.

Avoid weak/unmanaged DKIM private-key handling.

Avoid:

```text
From domain
```

unrelated to authenticated identities without DMARC alignment.

Avoid:

```text
no-reply@
```

when users reasonably expect support from replies and no alternate route exists.

Avoid:

```text
subject = "URGENT!!!"
```

for ordinary marketing.

Avoid deceptive:

```text
Re:
Fwd:
```

subjects.

Avoid sensitive:

```text
full account number
reset token
medical/private data
```

in subject/preheader.

Avoid:

```text
image-only email
```

Avoid essential CTA rendered only as an image.

Avoid:

```text
JavaScript
```

as required email functionality.

Avoid complex embedded forms for critical actions.

Avoid:

```text
desktop fixed-width 900px
```

templates.

Avoid email that cannot be read with images disabled.

Avoid:

```text
white transparent logo
```

that disappears in altered dark mode.

Avoid plain text generated as unreadable HTML debris.

Avoid:

```text
Click here
```

for every CTA.

Avoid:

```text
GET /unsubscribe
```

that requires login and five confirmation steps for marketing.

Avoid marketing email with no visible unsubscribe.

Avoid body unsubscribe only when one-click headers are required.

Avoid:

```text
List-Unsubscribe
```

without processing infrastructure.

Avoid:

```text
unsubscribe
→ wait for next nightly CRM sync
→ keep sending meanwhile
```

Avoid re-importing unsubscribed users.

Avoid purchased mailing lists.

Avoid treating account signup as unlimited marketing consent.

Avoid:

```text
transactional
```

classification simply because the email was generated automatically.

Avoid promotional banners dominating password-reset email.

Avoid:

```text
GET /verify-and-delete
```

state-changing links.

Avoid scanner-sensitive magic links with no mitigation.

Avoid passwords in email.

Avoid reset tokens in application logs.

Avoid unsanitized user HTML.

Avoid:

```text
send retry
→ duplicate invoice email
```

with no idempotency.

Avoid infinite retry.

Avoid sending expired codes hours later.

Avoid retrying permanent hard bounces.

Avoid:

```text
provider delivered
→ user read email
```

as a business assumption.

Avoid:

```text
open pixel fired
→ human opened email
```

as authoritative evidence.

Avoid security decisions based on open tracking.

Avoid tracking every transactional/security email without purpose.

Avoid webhook endpoints with no signature verification.

Avoid assuming webhook events are ordered/exactly-once.

Avoid provider suppression as the only copy of organizational unsubscribe state.

Avoid releasing a huge queue backlog instantly after an outage.

Avoid cold backup-provider failover with no reputation plan.

Avoid staging email to real customers by accident.

Avoid sharing production ESP credentials with development environments.

Avoid production templates edited manually in a provider dashboard with no review/version history.

Avoid email DNS records with no owner.

---

# 359. AI Email Rules

AI coding agents MUST classify an email before implementing it.

---

# 360. AI Category Rule

AI MUST distinguish:

```text
security
transactional
subscription
marketing
```

rather than treating every automated email as transactional.

---

# 361. AI Queue Rule

AI SHOULD use the approved background-job architecture for email delivery.

---

# 362. AI Idempotency Rule

AI MUST define duplicate-send protection for high-value transactional/security messages.

---

# 363. AI Authentication Rule

AI MUST assume production email requires SPF, DKIM, and DMARC.

---

# 364. AI Alignment Rule

AI MUST preserve DMARC alignment when configuring sender/provider domains.

---

# 365. AI Marketing Rule

AI MUST NOT send marketing to recipients merely because their email exists in the database.

---

# 366. AI Unsubscribe Rule

AI MUST implement visible and RFC 8058 one-click unsubscribe for applicable marketing/subscription messages.

---

# 367. AI Suppression Rule

AI MUST check suppression state before optional bulk sends.

---

# 368. AI Security-Link Rule

AI MUST NOT create destructive or irreversible email actions through GET links.

---

# 369. AI Scanner Rule

AI MUST consider automated email-security link scanners for verification/magic-link workflows.

---

# 370. AI Template Rule

AI SHOULD use the existing template/component system before inventing independent HTML-email markup.

---

# 371. AI CSS Rule

AI MUST NOT assume modern browser CSS support inside email clients.

---

# 372. AI JavaScript Rule

AI MUST NOT require JavaScript inside email.

---

# 373. AI Plain-Text Rule

AI SHOULD preserve a meaningful text/plain alternative.

---

# 374. AI Accessibility Rule

AI MUST retain semantic reading order, accessible links, image alternatives, and readable contrast.

---

# 375. AI Localization Rule

AI MUST render subject, preheader, body, dates, numbers, and CTA in the recipient's appropriate locale.

---

# 376. AI Dark-Mode Rule

AI SHOULD not rely on exact client-controlled dark-mode rendering.

---

# 377. AI Retry Rule

AI MUST distinguish transient from permanent delivery failures.

---

# 378. AI Expiry Rule

AI MUST NOT retry time-sensitive email beyond its useful lifetime.

---

# 379. AI Webhook Rule

AI MUST authenticate and idempotently process provider webhooks.

---

# 380. AI Privacy Rule

AI MUST minimize personal/sensitive data in subjects, templates, URLs, logs, and provider payloads.

---

# 381. AI Open-Tracking Rule

AI MUST NOT treat open tracking as reliable proof that a human read a message.

---

# 382. AI Provider Rule

AI MUST NOT make the email provider the sole source of subscription/suppression truth.

---

# 383. AI Gold Rule

When uncertain:

```text
Required user communication
>
Optional notification
>
Marketing
```

for priority.

And:

```text
Authenticated sender
+
legitimate recipient
+
clear purpose
+
safe unsubscribe where applicable
>
send volume
```

---

# 384. Golden Email Rules

**1. Every email has a defined category and purpose.**

**2. Automated does not automatically mean transactional.**

**3. Security-critical, transactional, subscription, and marketing traffic are governed separately.**

**4. Marketing reputation must not jeopardize password resets or receipts.**

**5. Sending streams are separated by category where practical.**

**6. Production email uses stable recognizable sender identities.**

**7. Users are not forced to reply to unmonitored addresses when replies are reasonably expected.**

**8. HTML mail includes a useful plain-text alternative.**

**9. Production mail conforms to Internet email-format standards.**

**10. All production sending domains use SPF, DKIM, and DMARC.**

**11. SPF authorizes only legitimate senders.**

**12. SPF configuration is kept within protocol limits and unnecessary senders are removed.**

**13. Every production message is DKIM-signed where supported by the controlled infrastructure.**

**14. DKIM private keys are secrets and support safe rotation.**

**15. DMARC alignment is mandatory.**

**16. Both SPF and DKIM are deployed even though DMARC can pass with one aligned mechanism.**

**17. Forwarding resilience is not based solely on SPF.**

**18. DMARC reports are actively monitored.**

**19. DMARC `p=none` is generally a rollout phase, not the permanent target for protected domains.**

**20. DMARC enforcement is increased only after legitimate senders are inventoried and aligned.**

**21. SMTP transport uses TLS according to current provider requirements.**

**22. Sending infrastructure has correct forward/reverse DNS where applicable.**

**23. Email-related DNS is governed production configuration.**

**24. Marketing recipients have legitimate subscription/consent provenance.**

**25. Purchased and scraped lists are prohibited.**

**26. Email verification and marketing consent are different states.**

**27. Account creation does not automatically authorize unrestricted marketing.**

**28. Marketing/subscription email contains a visible unsubscribe mechanism.**

**29. Applicable marketing/subscription email supports RFC 8058 one-click unsubscribe.**

**30. One-click unsubscribe requires no login or confirmation step.**

**31. One-click unsubscribe endpoints use opaque hard-to-forge recipient/list identifiers.**

**32. One-click unsubscribe infrastructure is DKIM-protected and operationally monitored.**

**33. Unsubscribe requests are suppressed immediately and fully honored within 48 hours at maximum.**

**34. Preference-center UX supplements rather than replaces required one-click unsubscribe.**

**35. Unsubscribed recipients are not silently re-added during imports or CRM synchronization.**

**36. Resubscription requires fresh user intent.**

**37. Mandatory account/security messages do not use misleading marketing-style unsubscribe language.**

**38. Subjects accurately describe the message.**

**39. Subjects and preheaders avoid unnecessary sensitive data.**

**40. Deceptive reply/forward prefixes and artificial urgency are prohibited.**

**41. Each message has one primary purpose.**

**42. CTAs describe the actual action.**

**43. Critical actions use ordinary secure HTTPS links with safe fallback behavior.**

**44. Email GET links do not perform destructive irreversible mutations.**

**45. Magic links and verification links account for automated security scanners.**

**46. Email action tokens are purpose-bound, unguessable, and expire where appropriate.**

**47. Passwords are never sent through email.**

**48. Sensitive tokens are not logged in plaintext.**

**49. Templates are version-controlled and reviewable.**

**50. Template data contracts are explicit and minimized.**

**51. Untrusted content is escaped/sanitized before email rendering.**

**52. JavaScript is never required for ordinary email functionality.**

**53. Critical interaction does not depend on embedded forms or sophisticated browser widgets.**

**54. Responsive email remains understandable even when advanced CSS is unsupported.**

**55. Images scale correctly on narrow screens.**

**56. Essential meaning survives image blocking.**

**57. Images have appropriate accessibility alternatives.**

**58. Important text is not embedded solely in images.**

**59. Email remains usable in representative light and dark client modes.**

**60. Email accessibility includes semantic order, contrast, descriptive links, and readable text.**

**61. Localized email uses recipient locale and correct timezone/currency semantics.**

**62. RTL email is treated as a full directionality mode.**

**63. Email is normally sent asynchronously through background jobs.**

**64. Business state is committed before email dependent on that state is queued.**

**65. High-value sends have idempotency/deduplication protection.**

**66. Exactly-once email delivery is never assumed.**

**67. Retries are bounded and reserved for transient failures.**

**68. Time-sensitive email expires rather than arriving after its action becomes invalid.**

**69. Provider rate limits and throttling are respected.**

**70. New sending infrastructure increases volume gradually.**

**71. Marketing traffic yields capacity to security/transactional traffic.**

**72. Hard bounces suppress further normal sending to invalid recipients.**

**73. Soft bounces use bounded retry and eventual suppression policy.**

**74. Spam complaints immediately stop optional marketing/subscription traffic.**

**75. Internal alert thresholds remain below provider complaint enforcement thresholds.**

**76. Provider webhooks are authenticated and idempotent.**

**77. Webhook ordering and exactly-once delivery are not assumed.**

**78. Suppression state remains under organizational control rather than one ESP alone.**

**79. Delivery acceptance is not equivalent to inbox placement or human reading.**

**80. Open tracking is not authoritative evidence of human engagement.**

**81. Security decisions never depend on email opens.**

**82. Tracking is minimized and privacy-reviewed.**

**83. Email addresses and message content are governed personal data.**

**84. Full message bodies are not retained indefinitely by default.**

**85. Shared mailboxes and notification previews are assumed possible when deciding what content to include.**

**86. Recipient addresses are never exposed to unrelated recipients.**

**87. Optional mail respects preferences, frequency, and quiet-hour policy where applicable.**

**88. High-volume low-urgency activity should prefer digests over email storms.**

**89. Per-recipient anomaly controls prevent accidental mass duplicate sends.**

**90. Marketing/bulk infrastructure has an operational kill switch.**

**91. Marketing shutdown does not unnecessarily disable critical security email.**

**92. Core templates are tested across representative mail clients.**

**93. Pixel-perfect client equality is not required; usability and message integrity are.**

**94. Templates are tested with images disabled, dark mode, mobile widths, long localization, and plain-text rendering.**

**95. Non-production environments cannot freely email real customers.**

**96. Production and non-production ESP credentials are isolated.**

**97. Authentication, bounce, complaint, queue, and unsubscribe health are monitored continuously.**

**98. Provider migrations preserve suppression, sender authentication, and reputation planning.**

**99. A backup provider is not useful unless authentication, templates, suppressions, and reputation behavior have been prepared and tested.**

**100. If the organization cannot explain why an email was sent, how its sender was authenticated, how delivery failures are handled, and how the recipient can stop optional mail, the email system is not production-grade.**

---

# 385. Canonical Email Standard

The organizational standard is:

> **Product-generated email is an asynchronous external communication channel with explicit purpose, category, recipient eligibility, sender identity, delivery priority, retry lifetime, and suppression behavior. Security-critical, transactional, subscription, marketing, and operational messages are not treated as interchangeable traffic, and high-volume promotional sending is isolated sufficiently that complaint or reputation problems cannot unnecessarily impair password-reset, security, billing, or other critical delivery.**

> **Every production sender uses authenticated organizational identities. SPF authorizes legitimate SMTP sources, DKIM cryptographically signs production mail under controlled domains, and DMARC aligns the visible author domain with authenticated SPF or DKIM identities while providing policy and reporting. All three mechanisms are deployed as the organizational baseline, DMARC reports are analyzed, enforcement progresses only after legitimate senders are verified, TLS and DNS infrastructure meet current provider expectations, and sender authentication is monitored as production infrastructure rather than configured once and forgotten.**

> **Recipient authorization is governed separately from address ownership. Marketing and recurring subscription traffic is sent only to legitimate subscribed audiences, public subscriptions are confirmed where appropriate, purchased or scraped lists are prohibited, and unsubscribe state remains an authoritative organizational record. Applicable promotional/subscription mail provides both a visible body unsubscribe mechanism and RFC 8058 one-click unsubscribe, processes one-click requests without login or extra confirmation, suppresses affected traffic immediately, and honors opt-outs within 48 hours at maximum.**

> **Templates are versioned product artifacts. Every message has a typed data contract, minimal required recipient data, a clear subject and primary purpose, meaningful HTML and plain-text representations, responsive conservative email markup, accessible reading order, safe CTA links, image-independent meaning, localization, timezone/currency correctness, and representative light/dark-client behavior. Templates do not depend on JavaScript, complex embedded interaction, or modern browser CSS assumptions to communicate or complete critical tasks.**

> **Email links are security-sensitive interfaces. HTTPS is the default, open redirects are prohibited, action tokens are purpose-bound and appropriately time-limited, sensitive values are not leaked through logs or unnecessary query parameters, and GET requests do not directly perform destructive or irreversible actions. Password-reset, verification, and magic-link designs account for automated email-security scanners so link prefetching cannot accidentally consume credentials, authenticate sessions, or perform damaging state transitions.**

> **Delivery is queued and idempotent. Authoritative product state is committed before dependent messages are scheduled; high-value sends use logical idempotency keys; provider acceptance is not interpreted as human delivery; retries use bounded backoff only for transient failure and stop when the message becomes stale; and high-priority security/transactional traffic is protected from bulk campaign backpressure. Hard bounces, repeated failures, complaints, and unsubscribes feed an organizational suppression registry independent of a single vendor.**

> **Email operations are observable. Queue depth, send latency, provider errors, deferrals, bounces, complaints, authentication results, unsubscribe processing, suppression changes, and relevant reputation data are monitored by category and sender stream. Provider webhooks are authenticated and idempotent, message-event ordering is not assumed, complaint spikes and authentication failures trigger operational investigation, and queued backlogs are released carefully after outages rather than producing reputation-damaging floods.**

> **Email analytics are subordinate to privacy and delivery reality. Open pixels are optional and never treated as authoritative proof that a human opened or read a message; click tracking is used only where justified; security-sensitive messages minimize unnecessary tracking/rewrite infrastructure; recipient addresses and content are handled as personal data; full message content is not retained indefinitely by default; and email vendors, logs, templates, links, and reports follow the organization's Privacy and Security standards.**

> **Email infrastructure is tested and governed throughout its lifecycle. Core templates are validated across representative clients, narrow/mobile layouts, image blocking, dark mode, localization, RTL, accessibility, and plain-text rendering; authentication and unsubscribe headers are verified in production smoke tests; non-production delivery is constrained to safe sinks or allowlisted recipients; provider/domain changes follow reviewed migrations; suppression state remains portable; and incident procedures can stop compromised, duplicate, or incorrect mail streams without unnecessarily disabling critical communication.**

A production-grade email system should make it easy to answer:

```text
Why is this email being sent?
Which category does it belong to?
Is the recipient eligible to receive it?
Which sender domain and From identity are used?
Does SPF pass?
Does DKIM pass?
Does DMARC align?
What DMARC policy is deployed?
Who monitors DMARC reports?
Which queue and priority does the message use?
What prevents duplicate sends?
How long is retry useful?
What happens after a hard bounce?
What happens after a spam complaint?
Where is suppression stored?
Can a provider migration preserve that suppression?
Does marketing use a separate reputation stream?
Does the message need one-click unsubscribe?
Is List-Unsubscribe-Post present?
Can unsubscribe complete without authentication?
How quickly does suppression take effect?
Does the template work with images blocked?
Does it work on mobile?
Does it work in dark mode?
Does it have readable plain text?
Is it localized for the recipient?
Could an email-security scanner activate this link?
Does any GET link mutate destructive state?
Are sensitive tokens exposed in URLs or logs?
Is the provider webhook authenticated?
Can staging accidentally email customers?
What happens if the provider is unavailable?
Can operations stop a bad campaign immediately?
```

If those questions cannot be answered reliably, the product sends email, but it does not yet have a governed production email architecture.

A few current external baselines are worth locking into this standard. As of **September 23, 2026**, Gmail requires senders exceeding **5,000 messages/day to Gmail accounts** to use **SPF + DKIM + DMARC**, maintain DMARC alignment, use TLS, keep reported spam below **0.3%**, and implement one-click unsubscribe plus a visible body unsubscribe for marketing/subscribed messages. Gmail has also been ramping up enforcement against non-compliant traffic since **November 2025**. citeturn765211view0turn174704search0

Yahoo's current bulk-sender requirements similarly require SPF, DKIM, DMARC and easy unsubscribe, require complaint rates below **0.3%**, and state that unsubscribes should be honored within **2 days**. That supports the corpus-level **≤48-hour hard limit**, while the implementation standard remains "suppress immediately." citeturn174704search1

The DMARC standards baseline has changed recently: **RFC 9989**, published in **May 2026**, is now the current DMARC specification and **obsoletes RFC 7489 and RFC 9091**. It continues to use SPF and DKIM authenticated identifiers plus alignment with the visible author domain, and recommends using both mechanisms rather than depending on only one. citeturn669073search0

For one-click unsubscribe, RFC 8058 specifies `List-Unsubscribe` with an HTTPS URI plus `List-Unsubscribe-Post: List-Unsubscribe=One-Click`; the relevant headers must be covered by a valid DKIM signature, and the endpoint is designed to complete without cookies, authentication context, or a confirmation workflow. citeturn501638search0

Canonical master placement:

**… → File & Media → Search → Notifications → Email → Internationalization → Content & UX Writing → Testing → …**
