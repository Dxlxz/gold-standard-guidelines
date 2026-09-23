---
id: "analytics"
title: "Analytics Guidelines — Gold Standard"
domain: "data"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["data", "analytics"]
applies_to: ["data"]
related: []
legacy_number: 21
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 75132
provenance: baseline

---

Below is the canonical standard. It treats analytics as a **versioned data contract**, not scattered tracking calls.

# Analytics Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical standard for product and business analytics across:

- web applications;
- mobile applications;
- backend services;
- APIs;
- onboarding;
- funnels;
- subscriptions;
- commerce;
- experimentation;
- multi-tenant products;
- product usage;
- lifecycle analytics.

They govern:

- event taxonomy;
- event naming;
- event schemas;
- event properties;
- user properties;
- account/tenant properties;
- identity;
- anonymous users;
- sessions;
- funnels;
- conversion metrics;
- product metrics;
- attribution;
- deduplication;
- client events;
- server events;
- experimentation;
- analytics privacy;
- PII restrictions;
- validation;
- governance;
- retention;
- testing.

The objective is to create analytics data that is:

- trustworthy;
- consistent;
- explainable;
- privacy-conscious;
- durable;
- queryable;
- comparable over time;
- resistant to duplicate events;
- usable for product decisions.

The core principle is:

> **Analytics measures product behavior through intentional, stable, documented data contracts—not arbitrary tracking calls scattered throughout the application.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented reason exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Analytics exceptions SHOULD document:

```text
Reason
Affected event/metric
Data-quality impact
Privacy impact
Owner
Review date
```

---

# 3. Analytics Is a Product Data System

Analytics instrumentation is production code.

It requires:

```text
Design
↓
Schema
↓
Implementation
↓
Validation
↓
Delivery
↓
Modeling
↓
Interpretation
↓
Governance
```

Do not treat analytics as:

```text
add tracking later
```

after feature implementation.

---

# 4. Analytics vs Observability

These systems serve different purposes.

```text
Analytics
→ What are users doing with the product?

Observability
→ Is the system operating correctly?
```

Examples:

```text
project_created
→ analytics

database_timeout
→ observability
```

Do not use the analytics platform as the primary system-health monitor.

---

# 5. Analytics vs Audit Logs

Audit logs answer:

```text
Who performed a sensitive action?
What changed?
When?
```

Analytics answers:

```text
How do users behave in aggregate?
```

Audit data normally requires stronger integrity and retention controls.

Analytics MUST NOT replace audit logging.

---

# 6. Analytics vs Business Transaction Data

The analytics system is not the authoritative record for critical business state.

Authoritative:

```text
Orders
Payments
Subscriptions
Invoices
Users
Permissions
```

belong in transactional systems.

Analytics represents measurements derived from those systems.

---

# 7. Analytics Must Not Be a Security Boundary

Never authorize an operation based on:

```text
analytics user property
analytics cohort
analytics event
client analytics state
```

Analytics data can be:

- delayed;
- duplicated;
- manipulated;
- missing.

---

# 8. Canonical Analytics Architecture

Preferred conceptual architecture:

```text
Product
│
├─ Client semantic events
├─ Server authoritative events
└─ Experiment exposure
        ↓
Canonical analytics collection layer
        ↓
Validation / enrichment / privacy controls
        ↓
Analytics destination(s)
        ↓
Warehouse / semantic layer
        ↓
Metrics / funnels / reports
```

---

# 9. Instrumentation Should Be Vendor-Neutral

Product code SHOULD use a canonical analytics interface rather than calling vendor APIs throughout the application.

Prefer:

```ts
analytics.track(...)
```

over:

```text
vendorA.track()
vendorB.capture()
vendorC.event()
```

scattered through features.

---

# 10. Analytics Wrapper Justification

An analytics abstraction is justified because it establishes organizational policy around:

```text
schema validation
identity
consent
PII filtering
environment
deduplication
destinations
```

It SHOULD remain thin.

Do not create an enormous analytics framework that hides normal event semantics.

---

# 11. Semantic Events

Events SHOULD represent meaningful product facts.

Prefer:

```text
project_created
invoice_paid
member_invited
search_performed
checkout_started
```

over:

```text
button_clicked
modal_opened
div_clicked
```

unless the UI interaction itself is genuinely the measurement of interest.

---

# 12. Measure Intent, Not DOM Structure

Analytics should survive UI refactoring.

Bad:

```text
green_button_clicked
```

Good:

```text
subscription_upgrade_started
```

Changing the button color should not change analytics semantics.

---

# 13. Event Taxonomy

Canonical event categories are:

```text
Lifecycle
Navigation
Discovery
Intent
Action
Outcome
Engagement
Experiment exposure
System-generated business event
```

---

# 14. Lifecycle Events

Lifecycle events represent meaningful lifecycle transitions.

Examples:

```text
account_created
workspace_created
subscription_activated
subscription_cancelled
```

---

# 15. Navigation Events

Navigation events represent meaningful navigation.

Examples:

```text
page_viewed
screen_viewed
```

Do not create bespoke navigation event names for every page unless required.

---

# 16. Discovery Events

Discovery events represent users finding or exploring information.

Examples:

```text
search_performed
filter_applied
product_viewed
```

---

# 17. Intent Events

Intent events represent a meaningful initiation.

Examples:

```text
checkout_started
upgrade_started
invite_started
```

Use them when initiation itself matters.

---

# 18. Action Events

Action events represent explicit user actions with product meaning.

Examples:

```text
project_archived
member_invited
report_exported
```

---

# 19. Outcome Events

Outcome events represent completed results.

Examples:

```text
checkout_completed
subscription_activated
file_upload_completed
```

These are often better conversion events than button-click events.

---

# 20. Engagement Events

Use engagement events only when the engagement has actual product meaning.

Examples may include:

```text
document_shared
comment_posted
report_viewed
```

Avoid meaningless:

```text
user_active
```

without a precise definition.

---

# 21. System-Generated Business Events

Some analytics events should originate from trusted backend systems.

Examples:

```text
payment_completed
subscription_expired
invoice_paid
workspace_deleted
```

when the server is authoritative.

---

# 22. Event Naming Convention

The canonical event naming format is:

```text
lower_snake_case
```

Examples:

```text
project_created
checkout_started
payment_completed
member_invited
```

---

# 23. Event Name Grammar

Event names SHOULD generally describe:

```text
<object>_<action>
```

where the action represents a completed fact or clearly defined state transition.

---

# 24. Past-Tense Facts

Prefer factual event names:

```text
project_created
report_exported
subscription_cancelled
```

rather than command names:

```text
create_project
export_report
cancel_subscription
```

Analytics records what occurred.

---

# 25. Started Events

`*_started` is appropriate when initiation is independently meaningful.

Example:

```text
checkout_started
```

is distinct from:

```text
checkout_completed
```

---

# 26. Failed Events

Do not automatically create:

```text
project_creation_failed
```

for every technical failure.

Technical failure belongs primarily to observability.

A failed event MAY be analytics-relevant when the failure materially represents product behavior.

Example:

```text
payment_failed
```

may be a meaningful business outcome.

---

# 27. Avoid Generic Event Names

Avoid:

```text
clicked
submitted
opened
completed
```

without the object/context in the name or schema.

---

# 28. Avoid UI Element Names

Avoid:

```text
save_button_clicked
upgrade_modal_button_clicked
```

Prefer semantic business events.

---

# 29. Avoid Page-Specific Duplication

Do not create:

```text
homepage_upgrade_clicked
settings_upgrade_clicked
billing_upgrade_clicked
```

if one event can represent:

```text
upgrade_started
```

with:

```text
source
```

as a property.

---

# 30. Event Name Stability

Event names become data contracts.

Do not casually rename:

```text
project_created
```

to:

```text
project_added
```

because wording preference changed.

---

# 31. Event Semantics Must Remain Stable

Never reuse an existing event name for a different behavior.

If semantics materially change:

```text
version
or
new event
```

is required.

---

# 32. Canonical Event Envelope

A standard event SHOULD conceptually include:

```text
event_id
event_name
occurred_at
received_at
schema_version
source
environment

identity:
  user_id
  anonymous_id
  account_id / tenant_id
  session_id

properties
context
```

Fields may vary by platform but semantics should remain consistent.

---

# 33. Event ID

Important events SHOULD have a globally unique:

```text
event_id
```

used for:

- deduplication;
- retries;
- tracing;
- investigation.

---

# 34. Event ID Generation

Generate event IDs at the point where the logical event is first created.

Retries SHOULD reuse the same ID.

---

# 35. Do Not Generate New ID on Retry

Bad:

```text
send event
→ timeout
→ retry with new event ID
```

This can create duplicate analytics facts.

---

# 36. Event Timestamp

`occurred_at` represents when the event happened.

---

# 37. Received Timestamp

`received_at` represents when the analytics system received the event.

These values may differ because of:

- offline use;
- queues;
- retries;
- delayed processing.

---

# 38. UTC

Analytics timestamps SHOULD use UTC internally.

Localization belongs at presentation/reporting time.

---

# 39. Client Clock Trust

Client event timestamps may be inaccurate because device clocks can be incorrect.

For authoritative server outcomes, prefer server timestamps.

---

# 40. Schema Version

Important events SHOULD expose:

```text
schema_version
```

when evolution cannot be handled safely through backward-compatible optional fields alone.

---

# 41. Event Source

Every event SHOULD identify its logical origin.

Canonical examples:

```text
web
mobile
server
worker
integration
```

---

# 42. Environment

Analytics MUST distinguish:

```text
production
staging
development
test
```

Production product metrics MUST NOT accidentally contain development traffic.

---

# 43. App Version

Client/server version SHOULD be included where it materially helps:

- rollout analysis;
- bug investigation;
- migration analysis.

---

# 44. Platform

Useful bounded values may include:

```text
web
ios
android
desktop
api
```

according to the product.

---

# 45. Event Properties

Event properties describe the event.

Example:

```text
report_exported

properties:
  report_type
  format
  source
```

---

# 46. User Properties

User properties describe relatively persistent user attributes.

Example:

```text
plan
account_age_bucket
preferred_locale
```

They should not describe one individual event.

---

# 47. Event vs User Property

Bad:

```text
user.last_export_format = "pdf"
```

if the question is about an export event.

Good:

```text
report_exported.format = "pdf"
```

---

# 48. Account Properties

B2B/multi-tenant applications SHOULD distinguish:

```text
user properties
```

from:

```text
account / workspace / organization properties
```

---

# 49. User and Account Are Different Dimensions

Example:

```text
User:
role = member

Workspace:
plan = enterprise
```

Do not flatten every organization attribute onto every user permanently.

---

# 50. Property Naming

Property names SHOULD use:

```text
lower_snake_case
```

consistently.

---

# 51. Boolean Properties

Boolean values SHOULD be true booleans.

Prefer:

```text
is_trial: true
```

over:

```text
is_trial: "yes"
```

---

# 52. Numeric Properties

Numbers SHOULD remain numeric.

Avoid:

```text
amount: "125.50"
```

when numerical analysis is expected.

---

# 53. Currency

Monetary events MUST include explicit currency when amounts are reported.

Example:

```text
amount_minor: 12500
currency: "MYR"
```

or the canonical monetary convention established by Data Guidelines.

---

# 54. Enum Properties

Use documented stable enum values.

Example:

```text
source:
  dashboard
  search
  notification
```

Do not allow arbitrary strings when the conceptual domain is bounded.

---

# 55. Enum Stability

Do not silently rename enum values.

They affect historical reporting.

---

# 56. Free-Text Properties

Free-text analytics properties SHOULD generally be prohibited.

Examples to avoid:

```text
search_query
comment_text
project_name
message_body
```

unless explicitly approved.

Free text creates substantial:

- privacy;
- cardinality;
- governance;

risk.

---

# 57. Search Analytics

If search terms genuinely need analysis, use a dedicated privacy-reviewed search-analytics policy.

Do not automatically capture raw queries.

---

# 58. URLs

Do not blindly capture complete URLs.

URLs may contain:

```text
IDs
email addresses
search terms
tokens
private resource names
```

---

# 59. Canonical Route

Prefer:

```text
route_name
```

or:

```text
normalized_route
```

over raw dynamic URL.

---

# 60. Query Strings

Query-string collection SHOULD use an explicit allowlist.

Never automatically send every query parameter.

---

# 61. URL Fragments

Fragments may also contain application-sensitive data.

Do not automatically capture them.

---

# 62. Referrers

Referrer data may expose sensitive paths.

Capture only according to approved privacy policy.

---

# 63. Property Cardinality

Every property intended for grouping/filtering SHOULD have understood cardinality.

High-cardinality values may be valid for warehouse analysis but inappropriate for some analytics platforms.

---

# 64. IDs as Event Properties

Opaque IDs MAY be included when needed for:

- deduplication;
- joining;
- debugging;
- entity-level analysis.

Do not expose IDs merely because they are available.

---

# 65. IDs Are Not Metric Dimensions Automatically

A property may exist in raw analytics data without being appropriate for dashboard grouping.

---

# 66. Schema Registry

Canonical events SHOULD be documented in an analytics schema registry/catalog.

Each event definition SHOULD contain:

```text
Event name
Description
Owner
Source
Trigger
Required properties
Optional properties
Property types
PII classification
Schema version
Consumers
```

---

# 67. One Authoritative Event Definition

Avoid competing definitions across:

```text
code comments
spreadsheet
analytics UI
wiki
```

One source should be canonical.

---

# 68. Typed Analytics

Where the language/tooling allows it, event schemas SHOULD be typed.

Example conceptually:

```ts
track("project_created", {
  creation_source,
  project_type,
})
```

with compile-time/runtime schema support.

---

# 69. Runtime Validation

Analytics events SHOULD be runtime-validated at a suitable collection boundary where malformed events could contaminate downstream datasets.

---

# 70. Unknown Properties

The collector MAY reject, strip, or quarantine unknown properties according to governance policy.

Do not silently allow uncontrolled schema growth.

---

# 71. Required Properties

Only make a property required when the event cannot be interpreted correctly without it.

Excessive required properties make instrumentation fragile.

---

# 72. Optional Properties

Optional properties SHOULD have clear semantics when absent.

Distinguish:

```text
missing
```

from:

```text
false
0
empty
unknown
```

---

# 73. Null Semantics

Define whether `null` means:

```text
known absence
unknown
not applicable
```

Avoid inconsistent interpretation.

---

# 74. Property Defaults

Do not manufacture defaults that change meaning.

Bad:

```text
plan = "free"
```

when the plan is actually unknown.

---

# 75. Schema Evolution

Schema changes fall into:

```text
Additive
Breaking
Semantic
```

---

# 76. Additive Changes

Adding an optional property is generally backward compatible.

---

# 77. Breaking Changes

Examples:

```text
rename event
remove property
change property type
change enum meaning
```

require deliberate migration/versioning.

---

# 78. Semantic Changes

Even when the JSON shape is unchanged, changing what an event means is effectively breaking.

---

# 79. Never Rewrite Historical Meaning

Do not change the definition of:

```text
activated_user
```

and continue comparing old and new values as though they represent the same concept.

---

# 80. Deprecation

Deprecated analytics events SHOULD define:

```text
replacement
deprecation date
consumer migration
removal date
```

---

# 81. Dual Emission

During migrations, temporary dual emission MAY be used.

It must be:

```text
time-bounded
documented
deduplicated correctly
```

---

# 82. Event Ownership

Every nontrivial analytics event needs an owner.

Owner responsibilities include:

- meaning;
- schema;
- quality;
- deprecation.

---

# 83. Event Proliferation

Do not create a new event whenever one extra dimension is needed.

Often add a controlled property to an existing semantic event.

---

# 84. Mega Events

Avoid one generic event:

```text
user_action
```

with:

```text
action_type
```

covering hundreds of unrelated semantics.

This makes contracts difficult to reason about.

---

# 85. Balance

Prefer:

```text
small coherent event vocabulary
+
meaningful bounded properties
```

over both extremes.

---

# 86. Client Events

Client analytics is appropriate for events only the client can reliably observe.

Examples:

```text
page_viewed
filter_applied
tab_selected
tooltip_help_opened
```

where those interactions matter.

---

# 87. Server Events

Server analytics is preferred for authoritative business outcomes.

Examples:

```text
payment_completed
subscription_activated
workspace_created
invoice_paid
```

---

# 88. Authoritative Event Rule

If the server can authoritatively determine an outcome:

> Prefer server-side emission for the canonical outcome event.

---

# 89. Client Confirmation Is Not Authority

Bad:

```text
client receives 200
→ payment_completed
```

if the payment provider/server is the true authority.

---

# 90. Client Intent + Server Outcome

Often both are useful:

```text
checkout_started
→ client

payment_completed
→ server
```

This supports funnel analysis without confusing intent and outcome.

---

# 91. Server Events Are Not Automatically Better

The server may not know:

```text
button exposure
tab interaction
viewport experience
```

Use the source closest to authoritative observation.

---

# 92. Single Canonical Emitter

For every semantic event, define the canonical emitting source.

Avoid:

```text
project_created
```

from both client and server unless there is a deliberate deduplication design.

---

# 93. Client + Server Duplication

Common anti-pattern:

```text
client emits order_completed
server emits order_completed
```

resulting in conversion count ≈ 2× reality.

---

# 94. Deduplication

Any event that can be delivered more than once SHOULD support deduplication.

---

# 95. At-Least-Once Reality

Distributed analytics delivery often behaves effectively like:

```text
at least once
```

because retries are necessary.

Design for duplicate delivery.

---

# 96. Event Deduplication Key

Prefer:

```text
event_id
```

as the canonical deduplication key.

---

# 97. Business Identity Deduplication

Some events may additionally use business identifiers.

Example:

```text
payment_completed
payment_id
```

to ensure one business outcome is counted once.

---

# 98. Do Not Deduplicate Only by Timestamp

Two legitimate events can occur at the same time.

Timestamp alone is not a reliable deduplication key.

---

# 99. Deduplication Window

If downstream systems use time-bounded deduplication, document the window.

Late retries beyond the window can otherwise reappear as duplicates.

---

# 100. Exactly-Once Claims

Avoid casually claiming:

```text
exactly once analytics
```

across distributed systems.

Prefer:

```text
idempotent production
+
deduplication
+
reconciliation
```

where high accuracy matters.

---

# 101. Delivery Retry

Analytics transport MAY retry temporary failures.

Retries MUST reuse event identity.

---

# 102. Analytics Must Not Block Product Actions

Routine analytics delivery failure SHOULD NOT normally block:

```text
checkout
save
navigation
login
```

unless analytics is actually part of a legally required transaction record—which should generally be another system.

---

# 103. Client Buffering

Client event buffering MAY improve delivery.

It must be:

```text
bounded
privacy-aware
expiration-aware
```

---

# 104. Offline Events

Offline-capable applications MAY queue analytics.

Queued events SHOULD retain:

```text
original occurred_at
event_id
identity context
```

appropriately.

---

# 105. Late Events

Analytics pipelines must tolerate events arriving after their occurrence time.

Reports should distinguish:

```text
event time
```

from:

```text
processing time
```

where relevant.

---

# 106. Ordering

Do not assume events arrive in perfect order.

Example:

```text
checkout_completed
```

could theoretically be processed before:

```text
checkout_started
```

due to pipeline timing.

---

# 107. Funnel Engines Must Handle Ordering Explicitly

Funnel definitions should use:

```text
occurred_at
```

and explicit sequence semantics rather than ingestion ordering.

---

# 108. Identity

Analytics identity is one of the most sensitive and error-prone areas.

Canonical concepts:

```text
anonymous_id
user_id
account_id / tenant_id
session_id
```

---

# 109. User ID

`user_id` SHOULD be a stable internal immutable product identifier.

Do not use:

```text
email
username
phone
```

as the canonical analytics identity.

---

# 110. Anonymous ID

Unauthenticated activity SHOULD use an opaque:

```text
anonymous_id
```

when anonymous behavioral continuity is needed and permitted.

---

# 111. Anonymous IDs Are Not Anonymous by Definition

A pseudonymous identifier can still be privacy-relevant.

Treat it according to Data Governance policy.

---

# 112. Identify Transition

When a user signs in/registers:

```text
anonymous identity
→ authenticated identity
```

should be associated according to the canonical identity-merging policy.

---

# 113. Identity Merge

Merge rules MUST be deterministic.

Do not let every destination independently decide how anonymous activity connects to a user.

---

# 114. Shared Devices

Never assume:

```text
one browser = one human forever
```

Logout/user switching requires analytics identity reset.

---

# 115. Logout

On logout:

```text
user identity context
```

MUST be cleared from client analytics state.

---

# 116. User Switch

If User A logs out and User B signs in:

```text
User B
```

must not inherit User A's analytics user context.

---

# 117. Tenant Context

Multi-tenant analytics SHOULD capture:

```text
account_id / workspace_id / tenant_id
```

separately from user identity when needed.

---

# 118. Same User, Multiple Tenants

A user may belong to:

```text
Workspace A
Workspace B
```

Analytics MUST preserve this distinction where tenant behavior is analyzed.

---

# 119. Role Property

If role matters, clarify whether it represents:

```text
global role
tenant role
role at event time
```

---

# 120. Historical Role

Event-level role should normally represent the role at:

```text
event occurrence
```

not today's current role.

---

# 121. Slowly Changing User Properties

Analytics must define whether user/account properties represent:

```text
current value
```

or:

```text
historical value at event time
```

These answer different questions.

---

# 122. Event-Time Attributes

For historically accurate cohort analysis, important changing attributes MAY be included on events.

Example:

```text
plan_at_event
```

where necessary.

---

# 123. Current Profile Attributes

Current user/profile properties are suitable for questions about users' present state.

Do not use them unknowingly for historical state.

---

# 124. Session ID

Use `session_id` only if the product has a defined session model.

Do not inherit a vendor-specific session definition without understanding it.

---

# 125. Analytics Session

An analytics session is not necessarily the same as:

```text
authentication session
```

---

# 126. Session Definition

Define session rules explicitly.

Example considerations:

```text
inactivity timeout
new browser session
cross-device behavior
midnight handling
```

---

# 127. Session Metrics

Metrics such as:

```text
sessions per user
session conversion
```

are meaningless unless sessionization is stable.

---

# 128. Device Identity

Device IDs should be used only when required and permitted.

Avoid fingerprinting mechanisms that violate privacy policy.

---

# 129. Bots

Automated traffic SHOULD be excluded or separately classified when it would distort product analytics.

---

# 130. Internal Users

Employee/internal/test usage SHOULD be:

```text
excluded
flagged
or
segmentable
```

from core product metrics.

---

# 131. Test Accounts

Test automation MUST NOT pollute core production conversion metrics.

Use:

```text
test account flag
synthetic identity
environment separation
```

as appropriate.

---

# 132. Page Views

Web products SHOULD define one canonical:

```text
page_viewed
```

event or equivalent navigation model.

---

# 133. SPA Navigation

Single-page application route transitions require explicit page-view semantics.

Do not rely on full-page browser loads only.

---

# 134. Page View Timing

Define what counts as viewed.

Possible semantic trigger:

```text
route committed / meaningful page rendered
```

rather than:

```text
link clicked
```

---

# 135. Duplicate Page Views

Avoid emitting page views from both:

```text
router integration
+
component useEffect
```

for the same navigation.

---

# 136. Page Properties

Useful page properties may include:

```text
page_name
route_name
referrer category
```

not uncontrolled entire URLs.

---

# 137. Screen Views

Native/mobile applications SHOULD use consistent semantic screen names independent from component class names.

---

# 138. Interaction Events

Track interactions only when they support a defined analytics question.

Do not track every click.

---

# 139. Instrumentation Question

Before adding an event, answer:

> What product or business question will this event help answer?

If no meaningful question exists, reconsider collection.

---

# 140. Event Purpose

Every important event SHOULD have at least one known consumer:

```text
metric
funnel
experiment
analysis
```

---

# 141. Zombie Events

Events no longer used by anyone SHOULD be reviewed for removal.

Unused collection creates:

- cost;
- privacy exposure;
- complexity.

---

# 142. Autocapture

Automatic capture of clicks/forms/DOM interaction SHOULD NOT be the canonical product analytics strategy.

---

# 143. Autocapture Risks

Autocapture can create:

```text
PII leakage
event noise
unstable selectors
high volume
unclear semantics
```

---

# 144. Restricted Autocapture

If autocapture is used, it requires:

```text
privacy review
allowlist/blocklist controls
sensitive-field masking
volume controls
```

---

# 145. Semantic Tracking Preferred

Explicit semantic instrumentation SHOULD remain the trusted layer for critical:

```text
conversion
activation
retention
revenue
```

metrics.

---

# 146. Funnels

A funnel measures progression through ordered behavioral states.

Example:

```text
signup_started
↓
account_created
↓
workspace_created
↓
first_project_created
```

---

# 147. Funnel Contract

Every funnel MUST define:

```text
Population
Identity unit
Steps
Ordering
Conversion window
Filters
Exclusions
Time zone
```

---

# 148. Identity Unit

A funnel may be measured by:

```text
user
account
session
order
```

These produce different numbers.

Always state the unit.

---

# 149. User Funnel

Example:

```text
percentage of users
who complete B after A
```

---

# 150. Account Funnel

B2B products may care more about:

```text
workspaces
organizations
accounts
```

than individual users.

---

# 151. Session Funnel

Session funnels answer:

```text
did this happen within one session?
```

Do not use them for long lifecycle workflows.

---

# 152. Ordered Funnel

An ordered funnel requires:

```text
A before B before C
```

---

# 153. Unordered Funnel

Use unordered semantics only if order is truly irrelevant.

---

# 154. Funnel Window

Every funnel requires a defined completion window.

Examples:

```text
30 minutes
24 hours
7 days
30 days
```

based on workflow semantics.

---

# 155. Funnel Window Is Product Semantics

Do not pick a conversion window merely because the analytics tool defaults to it.

---

# 156. Funnel Entry

Define whether users may enter the funnel:

```text
once
multiple times
once per day
once per resource
```

---

# 157. Repeated Attempts

For workflows users can retry, define whether conversion uses:

```text
first attempt
latest attempt
any attempt
```

---

# 158. Funnel Step Deduplication

One user generating the same event ten times should not automatically count as ten funnel users.

---

# 159. Conversion Rate

Conversion requires a precise denominator.

Conceptually:

```text
qualified completed units
/
qualified starting units
```

---

# 160. Denominator Governance

Most misleading conversion metrics result from poorly defined denominators.

Always document:

```text
who was eligible
who was excluded
```

---

# 161. Eligibility

Example:

```text
upgrade conversion
```

should not necessarily include customers already on the highest plan.

---

# 162. Cohorts

Funnels SHOULD support meaningful cohort segmentation.

Examples:

```text
signup month
plan
acquisition source
company size band
```

where permitted.

---

# 163. Funnel Comparison

Do not compare two funnel periods if:

```text
event definitions
eligibility
identity logic
```

changed materially without adjustment.

---

# 164. Funnel Versioning

Material funnel-definition changes SHOULD create a new metric/funnel version.

---

# 165. Activation

Activation MUST have a concrete behavioral definition.

Avoid:

```text
user activated
```

without a measurable product state.

---

# 166. Activation Event

Good activation definitions represent experienced product value.

Example:

```text
workspace created
+
first project created
+
teammate invited
```

if that accurately reflects the product.

---

# 167. Activation Is Product-Specific

Do not copy another company's activation metric.

---

# 168. Retention

Retention measures whether a cohort returns to perform a meaningful qualifying behavior.

---

# 169. Retention Event

Define what counts as retained behavior.

Avoid:

```text
opened application
```

if merely opening does not indicate useful engagement.

---

# 170. Retention Window

Specify:

```text
day
week
month
```

and calendar/rolling methodology.

---

# 171. Classic Retention

Typical concept:

```text
cohort active in period 0
AND
active again in target period
```

---

# 172. Rolling Retention

Rolling retention has different semantics.

Do not compare it directly with classic retention without explanation.

---

# 173. Resurrection

Products MAY distinguish:

```text
retained
resurrected
new
churned
```

users/accounts.

Definitions must remain explicit.

---

# 174. Active User

`active_user` MUST have a product-specific qualifying event definition.

Avoid:

```text
any event = active
```

without justification.

---

# 175. DAU

DAU means unique qualifying users during a defined calendar day.

Timezone must be specified.

---

# 176. WAU

WAU means unique qualifying users during the defined week/window.

Define whether:

```text
calendar week
rolling 7-day
```

is used.

---

# 177. MAU

Similarly define:

```text
calendar month
```

or:

```text
rolling 30-day
```

explicitly.

---

# 178. Stickiness Ratios

Metrics such as:

```text
DAU / MAU
```

MAY be useful, but only if the active-user definition genuinely represents repeat usage value.

---

# 179. Product Metrics

A product metric SHOULD have a written metric contract.

---

# 180. Metric Contract

Every important metric SHOULD define:

```text
Metric name
Business question
Formula
Unit
Population
Numerator
Denominator
Events / tables
Filters
Exclusions
Window
Time zone
Owner
Freshness
```

---

# 181. Metric Source of Truth

Critical business/product metrics SHOULD have one canonical definition.

Avoid:

```text
Finance revenue
Product revenue
Dashboard revenue
Marketing revenue
```

all using different undocumented formulas.

---

# 182. Semantic Layer

A shared semantic/metrics layer SHOULD be considered when many teams repeatedly calculate the same important metrics.

---

# 183. Metric Ownership

Every Tier-1/core metric requires an owner.

---

# 184. Metric Tiers

Organizations MAY classify metrics:

```text
Tier 1
→ executive/critical canonical metrics

Tier 2
→ product operating metrics

Tier 3
→ exploratory analysis
```

with stronger governance for higher tiers.

---

# 185. Vanity Metrics

Avoid optimizing metrics that grow without demonstrating meaningful product value.

Examples may include raw:

```text
page views
clicks
events sent
```

without context.

---

# 186. Outcome Metrics

Prefer outcome-oriented measurements where possible.

Example:

```text
projects successfully published
```

over:

```text
publish button clicks
```

---

# 187. Guardrail Metrics

Feature changes SHOULD consider guardrail metrics.

Examples:

```text
error rate
latency
cancellations
support contact
retention
```

depending on product risk.

---

# 188. Metric Tradeoffs

Do not optimize one conversion metric while ignoring downstream harm.

Example:

```text
signup conversion ↑
but
retention ↓
```

may indicate low-quality acquisition or misleading UX.

---

# 189. Revenue Metrics

Revenue-related analytics SHOULD originate from authoritative billing/order systems.

Do not calculate canonical revenue solely from:

```text
checkout button clicked
```

---

# 190. Revenue Currency

Multi-currency analytics MUST define:

```text
original currency
conversion currency
exchange-rate methodology
conversion time
```

if values are aggregated across currencies.

---

# 191. Subscription Metrics

Definitions such as:

```text
MRR
ARR
churn
expansion
contraction
```

require formal business metric contracts.

Do not infer them loosely from frontend events.

---

# 192. Product Usage Metrics

Usage SHOULD be tied to meaningful capabilities.

Examples:

```text
reports generated
projects published
API operations completed
team collaborations
```

---

# 193. Unique Counts

Unique-user/account counts depend on identity resolution.

Document identity limitations.

---

# 194. Cross-Device Identity

Authenticated user IDs can unify cross-device activity after login.

Anonymous cross-device stitching SHOULD NOT use invasive fingerprinting.

---

# 195. Identity Uncertainty

Analytics should acknowledge cases where:

```text
one human → multiple identities
multiple humans → shared device identity
```

may occur.

---

# 196. Attribution

Acquisition attribution requires its own documented model.

---

# 197. Attribution Dimensions

Common concepts:

```text
source
medium
campaign
referrer
landing page
```

should use canonical property names.

---

# 198. Campaign Parameters

Capture only an explicit allowlist of campaign parameters.

Do not collect arbitrary URL parameters.

---

# 199. First Touch

First-touch attribution means the first qualifying acquisition touch under the defined identity model.

---

# 200. Last Touch

Last-touch attribution means the latest qualifying touch before conversion under the defined window.

---

# 201. Attribution Window

Attribution MUST specify its lookback window.

---

# 202. Attribution Is a Model

Attribution is not objective ground truth.

Different models answer different questions.

Do not label one model simply:

```text
the source of the customer
```

without definition.

---

# 203. Direct Traffic

Define how missing/unknown referrer information is classified.

Do not silently overwrite previous attribution with "direct" unless the chosen model specifies that behavior.

---

# 204. Experiments

Analytics is critical to experimentation.

Experimentation requires:

```text
assignment
exposure
outcome
```

to remain distinct.

---

# 205. Experiment Assignment

Assignment means:

```text
user/account allocated to variant
```

It does not prove they saw the treatment.

---

# 206. Experiment Exposure

Exposure means the participant actually encountered the treatment according to the experiment definition.

---

# 207. Exposure Event

Canonical exposure data SHOULD include:

```text
experiment_id
variant_id
subject_id / unit
exposure_time
```

plus approved context.

---

# 208. Emit Exposure Once Per Defined Unit

Do not emit hundreds of exposure events because a component rerenders.

---

# 209. Exposure Must Match Reality

Do not emit exposure simply because code loaded if the user never had an opportunity to experience the treatment.

---

# 210. Experiment Unit

Define whether randomization occurs by:

```text
user
account
device
session
```

---

# 211. Stable Assignment

Subjects SHOULD remain consistently assigned for the intended experiment duration unless the experiment design says otherwise.

---

# 212. Experiment Outcome

Use existing canonical outcome events/metrics where possible.

Do not create duplicate events only for experiments.

---

# 213. Feature Flags vs Experiments

Feature flags manage rollout/configuration.

Experiments measure causal treatments.

A flag is not automatically an experiment.

---

# 214. Experiment Logging

Experiment instrumentation should make it possible to identify:

```text
who was eligible
who was assigned
who was exposed
what outcome occurred
```

---

# 215. Experiment Contamination

Prevent one subject from unintentionally receiving multiple variants when the experiment requires stable assignment.

---

# 216. Experiment Mutual Exclusion

Experiments MAY use mutually exclusive groups when overlapping treatments would invalidate interpretation.

---

# 217. Experiment Metric Definition

Primary and guardrail metrics SHOULD be defined before evaluating the experiment.

Avoid selecting whichever metric looks favorable afterward.

---

# 218. Analytics Sampling

Analytics events MAY be sampled for extremely high-volume low-value signals.

Critical conversion/business events SHOULD generally not be sampled.

---

# 219. Sampling Metadata

Sampled data must record enough information to correctly interpret or weight results.

---

# 220. Sample Consistently

For user-level behavioral analysis, deterministic user/account sampling may be preferable to independent per-event sampling.

---

# 221. Do Not Sample Money Randomly

Canonical financial outcome events should remain complete or reconcile against authoritative systems.

---

# 222. Data Completeness

Analytics pipelines SHOULD monitor:

```text
event volume
schema validity
delivery delay
duplicates
missing required fields
```

---

# 223. Volume Anomaly Detection

Large unexpected changes in event volume MAY indicate:

```text
instrumentation bug
deployment bug
product change
bot traffic
pipeline failure
```

---

# 224. Zero-Event Detection

For critical events, a sudden drop to zero should be detectable.

---

# 225. Event Ratio Monitoring

Useful ratios can detect instrumentation issues.

Example:

```text
checkout_completed
>
checkout_started
```

at impossible rates may reveal duplicate/misordered instrumentation.

---

# 226. Data Freshness

Dashboards SHOULD make expected data freshness clear.

Example:

```text
near realtime
hourly
daily
```

---

# 227. Pipeline Lag

Measure:

```text
occurred_at
→ available_for_analysis_at
```

for critical analytics pipelines.

---

# 228. Backfills

Backfilled events/data MUST be identifiable when their ingestion affects operational dashboards.

---

# 229. Historical Reprocessing

If historical analytics is recomputed, document:

```text
what changed
which periods changed
why
```

for critical metrics.

---

# 230. Reconciliation

High-value analytics SHOULD periodically reconcile against authoritative data.

Examples:

```text
orders completed
subscriptions active
payments succeeded
```

---

# 231. Analytics Revenue Reconciliation

Analytics conversion events should reconcile reasonably against billing/transaction systems.

Material divergence requires investigation.

---

# 232. Dashboard Trust

A dashboard should not be considered trusted merely because it renders.

It depends on:

```text
valid instrumentation
valid identity
correct metric definition
complete pipeline
```

---

# 233. Analytics Testing

Analytics instrumentation MUST be tested.

---

# 234. Event Unit Tests

Event builders/schemas SHOULD test:

```text
name
required properties
types
PII filtering
```

where useful.

---

# 235. Integration Tests

Critical flows SHOULD verify that the expected canonical event is emitted.

---

# 236. Test Semantics

Prefer:

```text
checkout success emits one checkout_completed
```

over verifying every low-level vendor SDK call.

---

# 237. Exactly One Assertion

For conversion events, tests SHOULD verify:

```text
exactly one logical event
```

where duplicate emission is a known risk.

---

# 238. No-Event Tests

Important privacy/security paths MAY test that forbidden fields/events are NOT emitted.

---

# 239. Client Navigation Tests

SPA page-view instrumentation SHOULD test:

```text
initial load
client navigation
back/forward
no duplicate page event
```

---

# 240. Identity Tests

Test:

```text
anonymous activity
login identify
logout reset
user switch
tenant switch
```

where analytics identity exists.

---

# 241. Tenant Switch Test

When changing workspaces:

```text
account_id
role context
```

must update correctly.

---

# 242. Server Event Tests

Authoritative business outcomes SHOULD verify server analytics emission after successful committed state.

---

# 243. Transaction Timing

Do not emit:

```text
order_created
```

before the transaction actually commits if a rollback could occur.

---

# 244. Post-Commit Analytics

Where practical:

```text
commit authoritative state
↓
durably publish/outbox analytics event
```

for important server outcomes.

---

# 245. Analytics Outbox

High-value events MAY use an outbox/event pipeline if delivery reliability matters.

---

# 246. Analytics Event Failure

If analytics publication fails after the business transaction succeeds, do not rollback the successful transaction merely for ordinary product analytics.

Recover asynchronously.

---

# 247. Analytics QA Environment

Teams SHOULD have a way to inspect events in:

```text
development
staging
```

before production rollout.

---

# 248. Event Debugger

Useful tooling includes a view showing:

```text
event name
source
identity
properties
schema validation
destination
```

for test sessions.

---

# 249. Production Event Validation

Critical events SHOULD be monitored after deployment.

Do not assume passing CI means production instrumentation is correct.

---

# 250. Analytics Release Review

Feature review SHOULD include analytics when the feature changes:

```text
activation
conversion
retention
monetization
experiments
```

---

# 251. Analytics Plan

Significant features SHOULD define instrumentation before implementation.

A lightweight plan may contain:

```text
Question
Event
Source
Properties
Metric/funnel consumer
Privacy classification
```

---

# 252. Event Review

New Tier-1 events SHOULD receive:

```text
product
engineering
data/analytics
privacy where necessary
```

review.

---

# 253. Event Discoverability

Engineers/analysts should be able to search the event catalog.

---

# 254. Event Documentation

Documentation SHOULD include examples.

Example:

```text
Event:
project_created

Trigger:
Project creation transaction committed.

Source:
server

Required:
creation_source
project_type
```

---

# 255. Product Metric Documentation

Dashboards SHOULD link or expose canonical metric definitions where feasible.

---

# 256. Do Not Define Metrics Only in Dashboard UI

Important metric logic should exist in version-controlled or governed analytical definitions where practical.

---

# 257. Dashboard Naming

Dashboard titles SHOULD communicate:

```text
subject
population
time model
```

where ambiguity exists.

---

# 258. Dashboard Filters

Default filters MUST NOT silently exclude meaningful populations.

---

# 259. Time Zone

Every business-critical dashboard must have an explicit timezone.

---

# 260. Date Boundaries

Daily/weekly/monthly metrics depend on date boundaries.

Use the canonical business timezone or clearly state UTC.

---

# 261. Historical Comparisons

Comparing periods requires consistent:

```text
timezone
metric definition
population
```

---

# 262. Partial Current Periods

Avoid comparing:

```text
today through 10 AM
```

with:

```text
full yesterday
```

without clear normalization.

---

# 263. Seasonality

Product metrics SHOULD account for:

```text
weekday effects
holidays
seasonality
```

where interpretation depends on them.

---

# 264. Small Samples

Do not over-interpret tiny cohorts.

Dashboards MAY show sample size alongside rates.

---

# 265. Rates Need Counts

Whenever practical, show:

```text
conversion rate
+
numerator/denominator
```

so users understand scale.

---

# 266. Percent Change

Do not show huge percentage change without baseline context.

Example:

```text
1 → 2
= +100%
```

but only one extra user.

---

# 267. Statistical Uncertainty

Experiment and small-sample metrics SHOULD communicate uncertainty where appropriate.

Do not treat tiny differences as definitive.

---

# 268. Analytics Privacy

Analytics collection MUST follow data-minimization principles.

Collect:

> **Only data required for a defined analytical purpose.**

---

# 269. Purpose Limitation

Every sensitive property SHOULD have a documented analytical purpose.

---

# 270. Prohibited Analytics Data

The following MUST NOT be sent to ordinary product analytics:

```text
passwords
session tokens
access tokens
refresh tokens
API-key secrets
private keys
OTP codes
recovery codes
payment card security codes
```

---

# 271. Highly Sensitive Data

Sensitive personal information SHOULD NOT be captured in product analytics unless explicitly approved under a dedicated data-governance process.

Examples include sensitive:

```text
health
financial
identity-document
biometric
precise-location
private communication
```

information.

---

# 272. Authentication Data

Do not send raw:

```text
password
MFA secret
passkey credential secret material
recovery token
```

to analytics.

---

# 273. Payment Data

Do not send full payment credentials.

Use non-sensitive business metadata such as:

```text
payment_method_type
currency
amount
outcome
```

where permitted.

---

# 274. Email

Email addresses SHOULD NOT be ordinary analytics identifiers.

Use:

```text
user_id
```

instead.

---

# 275. Phone Numbers

Phone numbers SHOULD NOT be product analytics identifiers.

---

# 276. Names

Personal names generally should not be required for behavioral analysis.

Avoid capturing them by default.

---

# 277. Free-Form User Content

Never automatically capture:

```text
notes
messages
document content
chat prompts
search text
```

into general analytics.

---

# 278. Form Autocapture

Sensitive form values MUST be excluded from any autocapture/session-replay mechanism.

---

# 279. Analytics Consent

Where applicable privacy policy or law requires consent/choice, analytics MUST respect the resulting consent state.

---

# 280. Consent Before Tracking

Systems requiring prior consent MUST NOT queue prohibited behavioral events before consent and send them later.

---

# 281. Consent Withdrawal

When a user withdraws applicable consent:

```text
future collection
```

must follow the new state promptly.

Historical deletion obligations follow Data Governance policy.

---

# 282. Consent State

Analytics systems MAY record a bounded non-sensitive:

```text
consent_state
```

to enforce downstream rules where appropriate.

---

# 283. Purpose Separation

Do not reuse data collected for:

```text
security
```

for:

```text
marketing analytics
```

without appropriate governance.

---

# 284. Data Classification

Analytics properties SHOULD be classified.

Potential categories:

```text
Public
Internal
Pseudonymous
Personal
Sensitive
Prohibited
```

according to the organization's Data Governance standard.

---

# 285. Schema Privacy Annotation

The event registry SHOULD allow property-level privacy classification.

---

# 286. Analytics Vendor Review

Third-party analytics services are data processors/dependencies.

Evaluate:

```text
data handling
retention
regions
subprocessors
security
deletion capabilities
```

under procurement/privacy governance.

---

# 287. Multiple Destinations

Do not automatically send every event to every analytics destination.

Different systems may have different approved purposes.

---

# 288. Destination Allowlist

Sensitive event/property routing SHOULD use destination allowlists where needed.

---

# 289. Data Residency

Analytics architecture SHOULD respect organizational data residency requirements where applicable.

---

# 290. Data Retention

Product analytics MUST have explicit retention periods.

Do not retain behavioral data forever simply because storage is available.

---

# 291. Raw vs Aggregate Retention

Raw event retention MAY be shorter than:

```text
aggregated metrics
```

where long-term trends remain useful.

---

# 292. Deletion

Analytics systems SHOULD support user/account deletion or de-identification according to the Data Governance and applicable privacy policy.

---

# 293. User Deletion Propagation

Deleting a user from the production database does not automatically remove their analytics data.

Deletion workflows must account for downstream analytics systems where required.

---

# 294. Tenant Deletion

Tenant deletion requirements MAY apply to:

```text
event warehouse
profiles
session replay
exports
```

depending on governance.

---

# 295. Backup Retention

Deletion guarantees should account for analytics backups according to policy.

---

# 296. Access Control

Analytics platforms MUST use:

```text
SSO
MFA
RBAC
least privilege
```

where organizational capabilities support them.

---

# 297. Raw Data Access

Access to raw behavioral data SHOULD be more restricted than access to aggregated dashboards where appropriate.

---

# 298. Export Control

Bulk export of raw analytics data requires authorization and governance.

---

# 299. Analytics Auditability

Sensitive analytics configuration changes MAY require audit logging.

Examples:

```text
new destination
retention change
PII collection change
consent rule change
```

---

# 300. Analytics Security

Client analytics payloads are untrusted.

Do not use them as authoritative evidence that:

```text
payment succeeded
permission granted
user is premium
```

---

# 301. Event Spoofing

Users can potentially emit fabricated client events.

Metrics requiring authoritative outcomes SHOULD use server events.

---

# 302. Bot / Fraud Manipulation

High-value business metrics should be resistant to obvious:

```text
bot
fraud
automation
```

pollution where meaningful.

---

# 303. Server-Side Conversion Authority

For important conversions such as:

```text
purchase
subscription
successful application
```

use authoritative backend status.

---

# 304. Client Event Validation

Client events MAY be schema validated, but validation does not make them trusted.

---

# 305. Event Signing

Do not introduce cryptographic event signing merely to protect ordinary analytics unless the threat model genuinely requires it.

Prefer server-authoritative events for critical facts.

---

# 306. Analytics Reliability

Not every analytics event requires perfect delivery.

Classify event criticality.

---

# 307. Event Criticality

Potential classes:

```text
Tier A
→ canonical conversion/business metrics

Tier B
→ important product behavior

Tier C
→ exploratory interaction telemetry
```

---

# 308. Tier A Delivery

Tier A events SHOULD favor:

```text
server emission
durable delivery
deduplication
reconciliation
```

---

# 309. Tier C Delivery

Tier C interaction events MAY accept:

```text
sampling
loss
shorter retention
```

according to use.

---

# 310. Analytics SLO

Critical analytics pipelines MAY define operational objectives for:

```text
freshness
completeness
schema validity
delivery
```

---

# 311. Data Quality Metrics

Useful analytics pipeline metrics include:

```text
invalid_event_rate
duplicate_rate
late_event_rate
pipeline_lag
missing_required_property_rate
```

---

# 312. Event Volume Budget

High-volume events SHOULD have explicit volume awareness.

One event emitted:

```text
100 times per second per user
```

can create substantial cost.

---

# 313. Scroll Events

Do not emit analytics on every scroll position change.

Use meaningful milestones if needed.

---

# 314. Mouse Movement

Do not emit raw pointer/mouse movement as ordinary analytics.

---

# 315. Keystrokes

Do not capture individual keystrokes for product analytics.

---

# 316. Resize Events

Do not send every browser resize event.

---

# 317. Performance Telemetry

Detailed performance measurements belong primarily under Observability/Performance telemetry.

Analytics MAY consume aggregated UX classifications where product analysis needs them.

---

# 318. Error Analytics

Technical errors belong in error monitoring.

Analytics MAY include high-level business failure outcomes.

Example:

```text
checkout_failed
reason_category = payment_declined
```

if appropriate.

---

# 319. Error Detail

Do not send:

```text
stack trace
SQL error
raw exception
```

to the product analytics event.

---

# 320. Reason Categories

Use bounded semantic categories.

Good:

```text
failure_reason:
  insufficient_funds
  expired_method
  provider_unavailable
```

according to privacy/security policy.

---

# 321. Feature Adoption

Feature adoption SHOULD be measured through meaningful successful feature use.

Avoid:

```text
feature tab viewed
```

as the sole proof of adoption.

---

# 322. First Use

A canonical first-use metric may be derived from:

```text
first occurrence of feature outcome event
```

rather than a special one-time event.

---

# 323. Frequency

Feature engagement may consider:

```text
users
frequency
breadth
depth
```

depending on the feature.

---

# 324. Breadth

Breadth answers:

```text
How many eligible users/accounts used the feature?
```

---

# 325. Depth

Depth answers:

```text
How much meaningful usage occurs among adopters?
```

---

# 326. Frequency

Frequency answers:

```text
How often is the meaningful behavior repeated?
```

---

# 327. User Success Metrics

Where possible, measure completion of user goals rather than merely product interactions.

---

# 328. Time to Value

Products MAY define:

```text
time from qualifying entry
→ first value event
```

as a key lifecycle metric.

Definitions must be explicit.

---

# 329. Time-Based Metrics

For duration metrics distinguish:

```text
wall-clock time
active time
business time
```

where it changes interpretation.

---

# 330. Client Active-Time Measurement

Do not assume tab open duration equals engaged time.

Use visibility/activity semantics if such metrics are genuinely needed.

---

# 331. Background Tabs

Browser background time SHOULD NOT automatically count as active engagement.

---

# 332. Session Duration

Session duration metrics are often approximate.

Document calculation limitations.

---

# 333. B2B Analytics

Multi-tenant B2B products SHOULD prioritize both:

```text
user-level behavior
account-level behavior
```

---

# 334. Account Activation

A workspace/account may have activation semantics distinct from individual user activation.

---

# 335. Seat-Based Products

Seat counts and active seats SHOULD derive from authoritative membership/licensing sources rather than client events.

---

# 336. Role Segmentation

Product behavior MAY be segmented by:

```text
owner
admin
member
viewer
```

if roles are product-relevant and privacy-appropriate.

---

# 337. Multi-Tenant Denominators

When measuring account adoption, denominator might be:

```text
eligible accounts
```

not:

```text
all users
```

---

# 338. Account Size

Prefer bounded bands:

```text
1
2-10
11-50
51-200
201+
```

where exact size is unnecessary.

This reduces unnecessary precision/cardinality.

---

# 339. Data Warehouse

Raw analytics SHOULD be available in a governed analytical store/warehouse when long-term analysis requires flexibility.

---

# 340. Warehouse Event Model

A canonical event model should preserve:

```text
raw event identity
occurred time
received time
identity
event properties
schema version
source
```

---

# 341. Raw vs Modeled Tables

Separate:

```text
raw immutable events
```

from:

```text
cleaned/modelled analytical datasets
```

where architecture supports it.

---

# 342. Raw Event Mutation

Raw events SHOULD generally remain immutable after ingestion.

Corrections belong in modeled layers unless data-governance requirements require deletion.

---

# 343. Modeling

Analytics models SHOULD:

```text
deduplicate
normalize
document
test
```

rather than forcing every analyst to redo basic cleanup.

---

# 344. Analytics Transformation Tests

Important transformations SHOULD test:

```text
uniqueness
not-null
accepted values
relationships
business rules
```

where tooling supports it.

---

# 345. Metric Reproducibility

Canonical metrics should be reproducible from governed source data.

---

# 346. Dashboard-Only Logic

Avoid critical metrics that exist only as opaque vendor-dashboard configuration with no reproducible definition.

---

# 347. Data Lineage

Important metrics SHOULD have traceable lineage:

```text
source event/table
↓
transformation
↓
metric
↓
dashboard
```

---

# 348. Data Quality Ownership

Broken analytics is an engineering/data-quality defect.

Do not silently use obviously corrupted metrics.

---

# 349. Data Quality Incident

Material breakage of core business metrics MAY be treated as an operational data incident.

---

# 350. Metric Certification

Organizations MAY mark key metrics:

```text
Certified
Experimental
Deprecated
```

to distinguish trust level.

---

# 351. Exploratory Analytics

Exploratory events/metrics MAY have lighter governance.

They must still follow:

```text
PII
security
environment
naming
```

rules.

---

# 352. Promotion

A metric moving from exploratory to canonical SHOULD receive:

```text
formal definition
owner
tests
data quality checks
```

---

# 353. Analytics Review Checklist

Before adding an event:

```text
□ What question does it answer?
□ Does an existing event already answer it?
□ Is event name semantic?
□ Is source authoritative?
□ Is schema documented?
□ Are properties bounded and typed?
□ Is identity correct?
□ Could duplicate emission occur?
□ Does it contain PII?
□ Is server-side emission more appropriate?
□ Which metric/funnel consumes it?
□ Who owns it?
```

---

# 354. Event Schema Checklist

```text
□ lower_snake_case event name
□ Stable semantics
□ event_id where needed
□ occurred_at
□ source
□ environment
□ schema version where needed
□ Required properties minimal
□ Types explicit
□ Enum values documented
□ Free text avoided
□ PII classification completed
```

---

# 355. Identity Checklist

```text
□ Stable internal user_id
□ anonymous_id policy
□ Login merge behavior
□ Logout reset behavior
□ User switch tested
□ Tenant/account identity separate
□ Session definition documented
□ No email/phone as primary ID
```

---

# 356. Server vs Client Checklist

Use **server** when:

```text
□ Server is authoritative
□ Event represents committed business outcome
□ Client event could be spoofed
□ Cross-device accuracy matters
```

Use **client** when:

```text
□ Only client can observe interaction
��� Event represents UI exposure/interaction
□ Missing event does not corrupt authoritative business state
```

---

# 357. Funnel Checklist

```text
□ Population defined
□ Unit defined
□ Entry event defined
□ Steps defined
□ Ordering defined
□ Conversion window defined
□ Repeated attempts defined
□ Exclusions defined
□ Timezone defined
□ Identity model understood
```

---

# 358. Metric Checklist

```text
□ Business question
□ Formula
□ Numerator
□ Denominator
□ Population
□ Unit
□ Window
□ Timezone
□ Source
□ Exclusions
□ Owner
□ Freshness
□ Version
```

---

# 359. Experiment Checklist

```text
□ Experiment ID
□ Randomization unit
□ Assignment stable
□ Eligibility defined
□ Exposure event defined
□ Exposure emitted correctly
□ Variant ID
□ Primary metric predefined
□ Guardrail metrics
□ Outcome uses canonical events
```

---

# 360. Privacy Checklist

```text
□ Purpose documented
□ Data minimized
□ No secrets
□ No auth tokens
□ No prohibited payment data
□ Free text avoided
□ URL/query collection controlled
□ PII classified
□ Consent respected
□ Retention defined
□ Deletion supported where required
□ Destination approved
```

---

# 361. Data Quality Checklist

```text
□ Volume monitored
□ Duplicate rate understood
□ Freshness monitored
□ Invalid schema monitored
□ Required properties monitored
□ Reconciliation exists for critical events
□ Test traffic excluded/flagged
□ Bot traffic considered
```

---

# 362. Definition of Done — Analytics Event

An event is production-ready only when:

```text
✓ Business/product question identified
✓ Existing taxonomy checked
✓ Canonical name chosen
✓ Trigger precisely defined
✓ Canonical emitter selected
✓ Event schema documented
✓ Property types documented
✓ Privacy classification completed
✓ Identity behavior defined
✓ Deduplication defined where needed
✓ Tests added
✓ Staging validation completed
✓ Owner identified
```

---

# 363. Definition of Done — Product Metric

A canonical product metric is complete when:

```text
✓ Business question documented
✓ Formula documented
✓ Numerator/denominator explicit
✓ Population explicit
✓ Event/source data governed
✓ Identity model understood
✓ Timezone/window explicit
✓ Data-quality tests exist
✓ Owner assigned
✓ Dashboard/report uses canonical definition
✓ Version/history maintained
```

---

# 364. Definition of Done — Funnel

A funnel is complete when:

```text
✓ Unit defined
✓ Eligibility defined
✓ Entry defined
✓ Steps defined
✓ Ordering defined
✓ Conversion window defined
✓ Duplicate behavior defined
✓ Reattempt behavior defined
✓ Source events validated
✓ Identity limitations documented
```

---

# 365. Analytics Anti-Patterns

Avoid:

```text
track every click
```

Avoid:

```text
button_clicked
```

as the primary product metric.

Avoid:

```text
event name includes UI color/location
```

Avoid:

```text
user_action
```

for every behavior.

Avoid:

```text
event names change every redesign
```

Avoid:

```text
email = user_id
```

Avoid:

```text
one browser = one human
```

Avoid:

```text
raw URL captured automatically
```

Avoid:

```text
all query parameters captured
```

Avoid:

```text
free-form text as event property
```

Avoid:

```text
client payment_success = canonical revenue
```

Avoid:

```text
same conversion emitted client + server
```

without deduplication.

Avoid:

```text
new event_id on retry
```

Avoid:

```text
every event sent to every vendor
```

Avoid:

```text
every property copied from application object
```

Avoid:

```text
entire user profile attached to every event
```

Avoid:

```text
current user property used as historical fact
```

Avoid:

```text
page view from router + component
```

Avoid:

```text
experiment assigned = experiment exposed
```

Avoid:

```text
feature flag enabled = experiment conversion
```

Avoid:

```text
conversion rate with undocumented denominator
```

Avoid:

```text
active user = any event
```

Avoid:

```text
dashboard formula exists nowhere else
```

Avoid:

```text
production test automation counted as customers
```

Avoid:

```text
autocapture everything
```

Avoid:

```text
analytics platform = audit system
```

Avoid:

```text
analytics platform = security authorization
```

---

# 366. AI Analytics Rules

AI coding agents MUST inspect the existing analytics taxonomy before adding instrumentation.

---

# 367. AI Search-Before-Create Rule

Before creating an event, AI MUST search for:

```text
existing semantic event
existing metric
existing property
existing funnel
```

that already represents the behavior.

---

# 368. AI Semantic Event Rule

AI MUST prefer:

```text
project_created
```

over:

```text
create_project_button_clicked
```

unless raw interaction is explicitly required.

---

# 369. AI Naming Rule

AI-generated events MUST follow:

```text
lower_snake_case
<object>_<action>
```

according to the canonical taxonomy.

---

# 370. AI Server Authority Rule

When the server owns the final business result, AI SHOULD emit the canonical outcome event from the server.

---

# 371. AI Client Rule

AI SHOULD use client events for:

```text
views
exposures
UI interactions
```

that cannot be reliably reconstructed server-side.

---

# 372. AI Duplicate Rule

AI MUST inspect whether the event is already emitted elsewhere before adding a second emitter.

---

# 373. AI Deduplication Rule

For retryable/important analytics events, AI MUST preserve stable:

```text
event_id
```

across retries.

---

# 374. AI Property Rule

AI MUST NOT spread arbitrary application/domain objects directly into analytics properties.

Bad:

```ts
track("project_created", project)
```

unless the object itself is an explicitly approved analytics schema.

---

# 375. AI Allowlist Rule

AI SHOULD map analytics properties explicitly.

---

# 376. AI PII Rule

AI MUST NOT introduce:

```text
email
phone
personal names
free-form content
raw search query
```

into analytics merely because those values are available.

---

# 377. AI Secret Rule

AI MUST NEVER send:

```text
password
token
cookie
OTP
API secret
private key
payment credential
```

to analytics.

---

# 378. AI URL Rule

AI MUST NOT automatically attach:

```text
window.location.href
```

to analytics events without applying the canonical safe route/query policy.

---

# 379. AI Identity Rule

AI MUST use the canonical internal:

```text
user_id
```

and tenant/account identifiers.

Do not derive identity from email.

---

# 380. AI Logout Rule

If AI modifies authentication/logout flows, it MUST preserve analytics identity reset behavior.

---

# 381. AI Tenant Rule

If AI adds tenant switching, analytics account/tenant context MUST switch with it.

---

# 382. AI Metric Rule

AI MUST NOT invent a product metric without defining:

```text
population
numerator
denominator
window
```

---

# 383. AI Funnel Rule

AI MUST NOT describe a funnel without specifying:

```text
unit
order
window
eligibility
```

---

# 384. AI Active-User Rule

AI MUST NOT define active users as:

```text
users who generated any event
```

without explicit product justification.

---

# 385. AI Experiment Rule

AI MUST distinguish:

```text
assignment
exposure
conversion
```

in experiment instrumentation.

---

# 386. AI Exposure Rule

AI MUST NOT emit experiment exposure simply because a component rendered if the treatment was not meaningfully exposed.

---

# 387. AI Autocapture Rule

AI MUST NOT enable unrestricted autocapture/session replay by default.

---

# 388. AI Analytics-Failure Rule

AI SHOULD ensure analytics transport failure does not normally break core user workflows.

---

# 389. AI Testing Rule

AI-generated critical events SHOULD include tests for:

```text
correct event
correct source
required properties
no duplicate event
```

---

# 390. AI Privacy-Test Rule

When analytics touches sensitive flows, AI SHOULD add tests proving prohibited values are not emitted.

---

# 391. AI Schema-Evolution Rule

AI MUST NOT rename/remove established event properties without reviewing downstream consumers.

---

# 392. AI Dashboard Rule

AI SHOULD use canonical metrics rather than recreating alternative formulas in a new dashboard.

---

# 393. AI Gold Rule

When uncertain:

```text
Authoritative business fact
>
Stable semantic event
>
Minimal properties
>
Clear metric definition
>
Additional tracking volume
```

---

# 394. Golden Analytics Rules

**1. Analytics is a governed production data system.**

**2. Analytics measures behavior; observability measures system health; audit logs record accountable actions.**

**3. Transactional systems remain authoritative for business state.**

**4. Every event answers a known analytical question.**

**5. Track semantic product facts, not arbitrary DOM interactions.**

**6. Event names use stable lower_snake_case semantics.**

**7. Prefer `<object>_<action>` factual names.**

**8. UI refactoring should not change event semantics.**

**9. Events have one canonical definition.**

**10. Important events have one canonical emitter.**

**11. Server-side events represent authoritative business outcomes whenever possible.**

**12. Client events represent client-only observation and interaction.**

**13. Intent and outcome are separate events when both matter.**

**14. Client analytics is never trusted as security or financial authority.**

**15. Events use stable unique IDs where deduplication matters.**

**16. Retries reuse event identity.**

**17. Analytics pipelines assume duplicate and late delivery can occur.**

**18. User identity uses stable internal IDs, not email.**

**19. Anonymous, user, account, and session identity are separate concepts.**

**20. Logout and user switching reset analytics identity correctly.**

**21. Multi-tenant analytics preserves account/workspace context.**

**22. Event properties describe events; user properties describe persistent identity attributes.**

**23. Current user properties are not automatically historical event attributes.**

**24. Property types and enum semantics remain stable.**

**25. Free-text properties are prohibited by default.**

**26. Raw URLs and arbitrary query strings are not automatically collected.**

**27. Secrets never enter analytics.**

**28. Personal data is minimized.**

**29. Analytics collection respects applicable consent and privacy controls.**

**30. Autocapture is not the canonical source for critical product metrics.**

**31. Funnels define population, unit, steps, ordering, and window.**

**32. Conversion metrics define their denominator explicitly.**

**33. Active-user metrics define what meaningful activity means.**

**34. Retention is based on qualifying product behavior.**

**35. Revenue/conversion outcomes originate from authoritative systems.**

**36. Experiment assignment and exposure are different states.**

**37. Experiments reuse canonical product outcomes where possible.**

**38. Critical metrics have one governed definition.**

**39. Analytics instrumentation is tested and monitored.**

**40. Collect the minimum data necessary to answer the product question.**

---

# 395. Canonical Analytics Standard

The organizational standard is:

> **Product analytics is implemented as a versioned, governed data-contract system. Events represent stable semantic product and business facts rather than DOM structure or arbitrary clicks. Event and property names follow canonical lower_snake_case conventions, event schemas have explicit types and ownership, identity uses stable internal identifiers, and important events include durable event identity for deduplication and reliable processing.**

> **Client instrumentation is used for client-observable behaviors such as navigation, exposure, and meaningful interface interaction. Authoritative business outcomes such as payment, subscription, provisioning, and persisted resource creation are emitted from trusted server systems. Where both intent and outcome matter, they are represented separately. The same logical outcome is not independently emitted by multiple sources without an explicit deduplication strategy.**

> **Funnels, activation, retention, conversion, engagement, and other product metrics use written metric contracts that identify their population, unit, numerator, denominator, qualifying events, window, filters, timezone, data source, and owner. Experimentation distinguishes assignment from actual exposure and evaluates outcomes through canonical metrics wherever possible.**

> **Analytics collection follows data-minimization and privacy principles. Secrets, authentication credentials, payment credentials, unrestricted free-form user content, and other prohibited sensitive information never enter general product analytics. Direct identifiers are avoided when stable internal pseudonymous IDs satisfy the analytical requirement. URLs, query parameters, form data, session replay, autocapture, and third-party destinations are governed explicitly rather than collected by default.**

> **Critical analytics is tested, monitored for schema validity, freshness, duplication, and volume anomalies, and reconciled against authoritative systems where business accuracy matters. Analytics schemas and metric definitions evolve through controlled versioning and deprecation, and historical semantics are never silently redefined under an existing name.**

A production-grade analytics system should make it easy to answer:

```text
What question are we trying to answer?
Which event represents the behavior?
What exactly triggers it?
Who is the canonical emitter?
Is the event an intent or an outcome?
Is the server authoritative?
What is the event schema?
Which properties are required?
Which identity unit are we measuring?
Can this event be duplicated?
How is it deduplicated?
Could the event arrive late?
Does it contain personal or sensitive data?
Which funnel or metric consumes it?
What is the metric's numerator?
What is the denominator?
What is the conversion window?
What timezone is used?
How are test/internal users handled?
How do we detect broken instrumentation?
Who owns this event and metric?
```

If those answers are unclear, the analytics instrumentation is not yet production-grade.

In the master hierarchy, **Analytics should sit after Observability but remain explicitly separate from it**:

**… → Testing → Performance → Observability → Analytics → Privacy & Data Governance → Configuration & Environments → Infrastructure & Deployment → Documentation → Governance.**
