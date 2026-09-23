---
id: "privacy-data-governance"
title: "Privacy & Data Governance Guidelines — Gold Standard"
domain: "security"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["security", "privacy", "data", "governance"]
applies_to: ["data", "security", "team"]
related: ["governance"]
legacy_number: 22
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 74557
provenance: baseline

---

Current standards baseline: the document below is intentionally **jurisdiction-neutral**. It uses privacy-by-design principles consistent with GDPR-style purpose limitation, minimization, storage limitation and accountability, while allowing jurisdiction-specific overlays such as access, correction, deletion, portability, objection/opt-out and similar rights. GDPR expressly includes these principles and rights, while California’s current privacy regime likewise includes rights to know, correct and delete plus purpose-limitation/minimization requirements. citeturn358257search0turn442570search12

# Privacy & Data Governance Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical organizational standard for:

- privacy engineering;
- personal data;
- personally identifiable information;
- sensitive data;
- data classification;
- data inventory;
- purpose limitation;
- data minimization;
- consent and preferences;
- retention;
- deletion;
- legal holds;
- data export;
- subject-access requests;
- correction requests;
- portability;
- objection and restriction;
- analytics privacy;
- cookies and tracking;
- logs and telemetry;
- third-party processors;
- subprocessors;
- data sharing;
- cross-border transfers;
- data localization;
- de-identification;
- pseudonymization;
- backups;
- breach readiness;
- AI/LLM data processing;
- data lifecycle governance.

The objectives are to ensure that the organization can answer:

```text
What data do we collect?
Why do we collect it?
Whose data is it?
Where does it go?
Who can access it?
How sensitive is it?
How long do we retain it?
How can it be corrected?
How can it be exported?
How can it be deleted?
Which third parties receive it?
What happens when the original purpose ends?
```

The core principle is:

> **Collect the minimum data necessary for a defined purpose, use it only within approved purposes, protect it according to sensitivity, retain it only as long as justified, and make its lifecycle controllable and auditable.**

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
Data involved
Purpose
Risk
Affected users
Compensating controls
Owner
Review date
```

---

# 3. Privacy Is Not Only Compliance

Privacy engineering concerns the problems people may experience because of:

```text
collection
use
sharing
inference
retention
exposure
loss of control
```

over data about them.

Legal compliance is one requirement.

Responsible product design is another.

---

# 4. Privacy vs Security

Security asks:

> How do we prevent unauthorized access, modification, or destruction?

Privacy additionally asks:

> Should we collect or use this data at all?

Perfect encryption does not justify unnecessary collection.

---

# 5. Privacy vs Data Governance

Privacy focuses particularly on people and their data.

Data governance additionally covers:

```text
ownership
quality
lineage
classification
retention
access
definitions
lifecycle
```

for organizational data generally.

These standards intentionally overlap.

---

# 6. Jurisdictional Overlay

Privacy law varies by:

```text
country
state/province
industry
data subject
product
processing purpose
```

This standard establishes the engineering baseline.

Applicable legal requirements MAY impose stronger:

```text
notice
consent
retention
residency
request deadlines
breach notification
processor-contract
children's-data
```

requirements.

---

# 7. Do Not Encode One Jurisdiction as Universal Law

Avoid building assumptions such as:

```text
All deletion requests always behave identically.
All processing requires consent.
All rights apply to all records.
```

Instead:

```text
Canonical privacy workflow
+
jurisdiction/policy rules
```

should determine the outcome.

---

# 8. Privacy Principles

The organizational privacy principles are:

```text
Purpose limitation
Data minimization
Transparency
User control where applicable
Accuracy
Storage limitation
Security
Accountability
Privacy by design
Privacy by default
```

---

# 9. Purpose Limitation

Every personal-data collection MUST have a defined purpose.

Bad:

```text
Collect birth date.

Reason:
Maybe useful later.
```

Good:

```text
Collect date of birth.

Purpose:
Required to determine eligibility for regulated service.
```

---

# 10. Purpose Before Collection

The correct sequence is:

```text
Define purpose
↓
Determine minimum data
↓
Determine authority/basis
↓
Design controls
↓
Collect
```

Not:

```text
Collect everything
↓
Find uses later
```

---

# 11. Secondary Use

Before using personal data for a materially new purpose, evaluate:

```text
compatibility with original purpose
user expectation
legal/policy authority
required notice
required consent/choice
privacy risk
```

Do not assume possession equals permission for unlimited use.

---

# 12. Data Minimization

Collect only data:

```text
necessary
relevant
proportionate
```

for the approved purpose.

---

# 13. Minimization Question

For every collected field ask:

> What breaks if we do not collect this?

If there is no meaningful answer, reconsider the field.

---

# 14. Minimize Precision

Collect the minimum precision necessary.

If the requirement is:

```text
adult / minor
```

you may not necessarily need permanent storage of:

```text
full date of birth
```

depending on domain requirements.

---

# 15. Minimize Scope

If the application needs:

```text
country
```

do not collect:

```text
exact street address
```

unless required for another approved purpose.

---

# 16. Minimize Frequency

Do not repeatedly collect data that is already reliably available.

---

# 17. Minimize Retention

Data minimization applies to:

```text
what
how much
how precise
how often
how long
who can access
```

---

# 18. Data Is a Liability

Every additional personal-data field creates:

```text
security exposure
privacy exposure
retention burden
deletion burden
export burden
processor burden
breach impact
```

---

# 19. Privacy by Design

Privacy controls MUST be considered during:

```text
requirements
architecture
design
implementation
testing
deployment
operation
decommissioning
```

---

# 20. Privacy by Default

The default product configuration SHOULD expose only the minimum personal data and processing necessary for the primary service.

Users should not need to discover obscure settings to obtain a reasonable privacy baseline.

---

# 21. Data Inventory

The organization MUST maintain an inventory of important data processing.

---

# 22. Inventory Scope

The inventory SHOULD identify:

```text
Data category
Data source
Data subject
Purpose
System
Storage
Owner
Classification
Recipients
Processors
Retention
Deletion mechanism
Transfer region
```

where applicable.

---

# 23. Data Mapping

For significant processing, understand the data flow:

```text
User
↓
Client
↓
API
↓
Database
├─ Analytics
├─ Email provider
├─ Search index
├─ Object storage
└─ Backup
```

Deletion and export depend on knowing these flows.

---

# 24. Unknown Data Stores Are Governance Failures

If the organization cannot identify where a category of personal data exists:

```text
retention
deletion
access control
subject requests
breach assessment
```

cannot be reliably managed.

---

# 25. Data Owner

Every important dataset SHOULD have an accountable owner.

The owner is responsible for:

```text
purpose
classification
quality
retention
access policy
lifecycle
```

---

# 26. System Owner vs Data Owner

These roles may differ.

```text
System owner
→ operates the service

Data owner
→ governs the data
```

Do not assume infrastructure ownership implies policy authority.

---

# 27. Data Steward

Large organizations MAY assign data stewards responsible for operational governance.

---

# 28. Data Classification

Every significant data category MUST have a classification.

A recommended internal taxonomy is:

```text
Public
Internal
Confidential
Restricted
```

---

# 29. Public Data

Public data is approved for unrestricted public disclosure.

Example:

```text
published marketing content
public documentation
```

---

# 30. Internal Data

Internal data is not intended for public disclosure but has relatively low sensitivity.

---

# 31. Confidential Data

Confidential data requires controlled organizational access.

Examples may include:

```text
customer account data
internal business information
contracts
```

---

# 32. Restricted Data

Restricted data has high potential harm if improperly accessed or disclosed.

Examples may include:

```text
authentication secrets
financial credentials
sensitive personal information
private keys
certain regulated datasets
```

---

# 33. Classification Drives Controls

Classification SHOULD determine:

```text
access
encryption
logging
sharing
retention
export
backup
environment use
```

---

# 34. Personal Data

Personal data means information relating to an identifiable individual under the applicable policy/legal definition.

It can include direct and indirect identifiers.

---

# 35. Direct Identifiers

Examples:

```text
name
email
phone
government identifier
```

---

# 36. Indirect Identifiers

Examples may include combinations of:

```text
device identifier
location
IP address
unique account ID
behavioral history
```

that can relate data to an individual.

---

# 37. Pseudonymous Data

Replacing obvious identifiers with an ID does not necessarily make data anonymous.

Example:

```text
user_83a19...
```

may still be linkable back to a person.

Treat pseudonymous personal data accordingly.

---

# 38. Anonymous Data

Data is considered anonymous only when applicable re-identification risk has been sufficiently removed under organizational and legal standards.

Do not label data anonymous merely because:

```text
name column was removed
```

---

# 39. De-Identification

De-identification techniques MAY include:

```text
aggregation
generalization
suppression
tokenization
pseudonymization
```

depending on the purpose.

---

# 40. Re-Identification Risk

Evaluate whether supposedly de-identified information can be linked using:

```text
other datasets
rare attributes
timestamps
locations
```

---

# 41. Sensitive Personal Data

Sensitive data requires stronger governance.

Potential categories include:

```text
health
biometric
financial
government identifiers
precise location
children's data
private communications
authentication information
```

depending on jurisdiction and policy.

---

# 42. Credentials Are Restricted

The following MUST be treated as Restricted regardless of ordinary user-data classification:

```text
passwords
session credentials
access tokens
refresh tokens
API-key secrets
private keys
OTP secrets
recovery tokens
```

---

# 43. Data Classification Metadata

Where practical, schemas/data catalogs SHOULD record classifications such as:

```text
personal_data
sensitive
retention_class
```

---

# 44. Classification Is About Data, Not Tables

One database table may contain:

```text
Public
Confidential
Restricted
```

fields simultaneously.

Avoid assigning overly coarse controls when field-level sensitivity differs materially.

---

# 45. Purpose Registry

Important processing activities SHOULD record an approved purpose identifier.

Example:

```text
account_management
billing
fraud_prevention
product_analytics
marketing_communications
```

---

# 46. Processing Basis / Authority

Where policy or applicable law requires a processing basis, it MUST be recorded separately from the purpose.

Do not assume:

```text
purpose = consent
```

---

# 47. Consent Is Not Universal

Consent is one possible authority for processing.

Do not ask for consent when:

```text
the processing is mandatory
the user cannot meaningfully refuse
another required basis governs
```

unless the relevant policy/legal analysis requires it.

---

# 48. Valid Consent

Where consent is the chosen basis, it SHOULD be:

```text
specific
informed
unambiguous
freely given where required
demonstrable
withdrawable
```

according to applicable requirements.

---

# 49. No Bundled Consent

Avoid:

```text
By creating an account you agree to:
service operation +
marketing +
analytics +
third-party profiling
```

when these purposes require separate choices.

---

# 50. Granular Preferences

Separate materially different optional purposes where appropriate.

Example:

```text
Product emails
Marketing emails
Personalization
Optional analytics
```

---

# 51. No Dark Patterns

Privacy choices MUST NOT manipulate users through:

```text
false urgency
confusing button hierarchy
double negatives
obscured reject option
repeated nagging
```

---

# 52. Consent Records

Where proof of consent matters, record:

```text
subject
purpose
policy/version
choice
timestamp
source
```

---

# 53. Consent Versioning

If the processing purpose materially changes, previous consent may not automatically cover the new purpose.

Track policy/purpose version where necessary.

---

# 54. Consent Withdrawal

Withdrawal SHOULD be as operationally straightforward as giving consent where applicable.

---

# 55. Withdrawal Effect

Withdrawal must propagate to relevant future processing.

Do not merely change a settings checkbox while downstream systems continue processing unchanged.

---

# 56. Historical Processing

Consent withdrawal does not automatically imply all historical processing was invalid.

Deletion/retention behavior must follow applicable requirements.

---

# 57. Preference Center

Products with multiple optional processing/communication choices SHOULD provide one understandable preference surface.

---

# 58. Consent State Is Server-Controlled

Critical consent/preference records SHOULD have authoritative server persistence.

Do not rely solely on:

```text
localStorage flag
```

for important compliance decisions.

---

# 59. Cookies and Tracking

Nonessential tracking mechanisms MUST follow the applicable consent/preference policy.

---

# 60. Cookie Classification

Cookies/storage SHOULD be classified conceptually as:

```text
Strictly necessary
Functional
Analytics
Advertising/targeting
```

or the jurisdictionally appropriate taxonomy.

---

# 61. Necessary Cookies

Security/session cookies required to provide requested functionality should not be mislabeled as optional analytics.

---

# 62. Analytics Cookies

Optional analytics identifiers must respect the applicable analytics/consent policy.

---

# 63. Cookie Inventory

Maintain an inventory of important cookies/browser-storage mechanisms including:

```text
name
purpose
owner
lifetime
classification
third party
```

---

# 64. Browser Storage

Privacy governance applies to:

```text
cookies
localStorage
IndexedDB
service-worker caches
device IDs
```

not only server databases.

---

# 65. Hidden Browser Storage

Do not retain identifiers in obscure storage as a mechanism to bypass user deletion/preferences.

---

# 66. Retention Policy

Every meaningful personal-data category MUST have a retention rule.

---

# 67. Retention Rule Components

A retention policy SHOULD define:

```text
Data category
Purpose
Retention trigger
Retention period
Deletion/action
Exceptions
Owner
```

---

# 68. Retention Trigger

Retention may begin from:

```text
collection
last activity
account closure
contract termination
transaction completion
```

depending on the domain.

Specify which one applies.

---

# 69. Retention Must Be Justified

Avoid:

```text
Keep forever.
```

or:

```text
Keep indefinitely in case useful.
```

---

# 70. Retention Classes

Organizations MAY standardize classes such as:

```text
30 days
90 days
1 year
7 years
Account lifetime + N
```

where legally/business appropriate.

The exact periods belong to the retention schedule, not arbitrary feature code.

---

# 71. Retention as Configuration

Where practical, retention periods SHOULD be centrally configurable/policy-driven.

Avoid duplicating magic values throughout services.

---

# 72. Automated Retention Enforcement

High-volume data SHOULD use automated lifecycle controls.

Examples:

```text
database cleanup jobs
object-storage lifecycle policies
log retention
warehouse partitions
```

---

# 73. Retention Job

Retention jobs must be:

```text
observable
idempotent
tested
bounded
```

---

# 74. Retention Verification

Periodically verify data actually disappears according to policy.

A documented retention period without enforcement is not a control.

---

# 75. Derived Data

Retention applies to derived copies too.

Example:

```text
raw events
feature tables
search index
materialized views
exports
```

---

# 76. Aggregated Data

Data sufficiently aggregated/de-identified may be eligible for different retention rules.

The transformation and re-identification risk must be documented.

---

# 77. Legal Hold

A legal/compliance hold MAY override normal deletion where authorized.

---

# 78. Legal Hold Scope

A hold should identify:

```text
records
reason
authority
start
owner
review
release
```

---

# 79. Legal Hold Is Not Global Forever

Do not suspend deletion for unrelated data merely because one matter exists.

Scope holds narrowly.

---

# 80. Data Deletion

Deletion is an end-to-end workflow.

It is not:

```text
DELETE FROM users
```

alone.

---

# 81. Deletion Inventory

Deletion MAY need to reach:

```text
primary DB
secondary DB
object storage
search
analytics
support systems
notifications
third-party processors
exports
caches
backups
```

depending on policy.

---

# 82. Hard Delete

Hard deletion physically removes the active record.

Use where appropriate.

---

# 83. Soft Delete

Soft deletion marks a record unavailable while retaining it.

Soft deletion alone does not satisfy an erasure requirement if policy requires actual removal.

---

# 84. Soft Delete Purpose

Use soft delete when required for:

```text
undo
recovery
workflow
temporary quarantine
```

with a defined eventual deletion lifecycle.

---

# 85. Tombstones

A minimal tombstone MAY remain when necessary to prevent:

```text
re-import
reprocessing
duplicate account recreation
```

provided it contains only the minimum information needed and is policy-approved.

---

# 86. Deletion Propagation

Canonical pattern:

```text
Deletion request
↓
Verify authority
↓
Determine scope/exceptions
↓
Mark workflow
↓
Delete primary data
↓
Propagate downstream
↓
Notify processors where required
↓
Verify completion
↓
Record non-sensitive evidence
```

---

# 87. Asynchronous Deletion

Large deletion workflows MAY execute asynchronously.

Users should receive truthful state such as:

```text
Deletion requested
Deletion processing
Deletion completed
```

---

# 88. Deletion Idempotency

Deletion workflows MUST tolerate retries.

Running deletion twice must not restore or duplicate data.

---

# 89. Deletion Failures

If one downstream destination fails:

```text
record failure
retry
escalate if required
```

Do not silently mark the whole request complete.

---

# 90. Deletion Verification

Completion should mean all required active systems have reached the expected state.

---

# 91. Backup Deletion

Immediate selective removal from immutable backups may be technically impractical.

The backup policy MUST define:

```text
backup retention
restricted access
restore behavior
post-restore deletion replay
```

according to applicable requirements.

---

# 92. Restore Must Not Resurrect Deleted Data

If an old backup is restored:

```text
historical deletion records
```

must be reapplied before restored personal data becomes operational where required.

---

# 93. Deletion Ledger

Systems MAY maintain a privacy-safe deletion ledger/tombstone containing enough data to prevent accidental resurrection.

It MUST NOT recreate the deleted profile.

---

# 94. Processor Deletion

When processors hold personal data on the organization's behalf, deletion workflows must include them where applicable.

---

# 95. Account Deletion vs Data Deletion

Account deletion may have multiple outcomes:

```text
delete account
retain legally required transaction records
de-identify analytics
retain audit evidence
```

Document the policy.

---

# 96. Account Closure

Do not conflate:

```text
account disabled
account closed
data deleted
```

These are different lifecycle states.

---

# 97. User-Generated Content

Deletion policy MUST define what happens to content shared with others.

Examples:

```text
comments
shared documents
forum posts
messages
```

---

# 98. Shared Data Rights

Deleting one user's data MUST NOT improperly delete data belonging to another user.

Subject rights are bounded by others' rights and system obligations.

---

# 99. Data Subject Requests

The organization SHOULD maintain one canonical request workflow for applicable individual privacy rights.

---

# 100. Request Types

Depending on jurisdiction/policy, requests MAY include:

```text
Access
Correction
Deletion
Portability
Restriction
Objection
Opt-out
Consent withdrawal
```

---

# 101. Request Intake

Requests may originate through:

```text
account UI
support
privacy portal
email
authorized agent
```

according to policy.

All intake channels SHOULD enter a common workflow.

---

# 102. Request Tracking

Every request SHOULD receive a stable request ID and lifecycle status.

---

# 103. Request Status

Example:

```text
received
identity_verification
in_review
processing
completed
partially_completed
denied_with_reason
```

according to applicable policy.

---

# 104. Identity Verification

Before disclosing or deleting personal data, verify the requester to a level proportionate to the risk.

---

# 105. Do Not Over-Collect for Verification

Verification itself MUST follow data minimization.

Do not request government identification for a low-risk account request if existing account authentication is sufficient.

---

# 106. Account Authentication

For logged-in users, recent account authentication may satisfy many verification needs.

High-risk requests MAY require stronger verification.

---

# 107. Unauthorized Disclosure Risk

A poorly verified access request can become a privacy breach.

Treat export workflows as sensitive operations.

---

# 108. Authorized Agents

If applicable law/policy supports authorized representatives, define verification of:

```text
agent
authorization
subject
```

separately.

---

# 109. Request Deadline

Applicable response deadlines MUST be stored as policy/configuration, not assumed universally in feature code.

---

# 110. Deadline Monitoring

Privacy-request queues SHOULD alert before requests become overdue.

---

# 111. Access Request

An access response may need to explain:

```text
data held
categories
purposes
sources
recipients
retention
rights
```

depending on applicable requirements.

---

# 112. Data Copy

When a data copy is required, provide it through a secure mechanism.

Do not attach sensitive exports unencrypted to ordinary email by default.

---

# 113. Export Generation

Privacy exports SHOULD be generated server-side through a controlled job.

---

# 114. Export Format

Machine-readable exports SHOULD use stable documented formats.

Examples:

```text
JSON
CSV
ZIP package
```

depending on the data.

---

# 115. Export Manifest

Large exports SHOULD include a manifest describing:

```text
dataset
file
format
generated_at
```

---

# 116. Export Scope

Export only the subject's applicable data.

Cross-tenant and cross-user leakage is a critical privacy failure.

---

# 117. Export Authorization

Every export dataset MUST enforce authorization independently.

Do not create:

```text
one giant unrestricted SQL query
```

for convenience.

---

# 118. Export Sensitive Data

Do not export credential secrets merely because they relate to the user.

Examples excluded:

```text
password hash
session token
private key
recovery code
```

---

# 119. Export Third-Party Rights

Access/export responses MUST consider information about other individuals.

Do not disclose another person's confidential data unnecessarily.

---

# 120. Export Download

Downloads SHOULD use:

```text
short-lived signed access
authentication
expiry
```

where appropriate.

---

# 121. Export Retention

Generated exports SHOULD expire automatically.

---

# 122. Export Logging

High-risk export generation/download SHOULD be auditable.

---

# 123. Correction Requests

Users SHOULD be able to correct ordinary profile data directly when safe.

Do not require support tickets for every editable field.

---

# 124. Authoritative Records

Some data cannot be directly edited because it represents an authoritative transaction/history.

Correction may require:

```text
amendment
new record
support review
```

instead.

---

# 125. Correction Propagation

When corrected personal data is replicated:

```text
primary DB
search
CRM
analytics profile
processor
```

relevant copies SHOULD update according to policy.

---

# 126. Data Portability

Where portability applies, exports SHOULD be:

```text
structured
commonly usable
machine-readable
```

rather than screenshots or PDFs alone.

---

# 127. Portability vs Access

An access report and a portability dataset are not necessarily identical.

Implement them as distinct policy concepts where required.

---

# 128. Restriction

Some requests may require preventing further processing while retaining data.

A restricted record needs enforceable processing-state semantics.

---

# 129. Restriction Is Not a UI Flag

If processing is restricted, downstream workflows must actually respect it.

---

# 130. Objection / Opt-Out

Where applicable, the system SHOULD enforce opt-out at the relevant processing layer.

A preference stored but ignored downstream is not effective.

---

# 131. Data Processing State

For complex privacy controls, consider explicit state such as:

```text
marketing_allowed
analytics_allowed
processing_restricted
```

rather than inferring everything from UI settings.

---

# 132. Data Accuracy

Personal data used for consequential decisions SHOULD remain appropriately accurate and current.

---

# 133. Stale Data

Do not retain stale personal information indefinitely when it continues driving:

```text
eligibility
risk
communications
personalization
```

without a refresh strategy.

---

# 134. User Correction

Provide correction mechanisms where appropriate.

---

# 135. Derived Inferences

Inferences about individuals can themselves create privacy impact.

Examples:

```text
risk score
interest category
predicted churn
behavior profile
```

should be governed, not treated as harmless metadata.

---

# 136. Profiling

Significant profiling SHOULD document:

```text
inputs
purpose
output
retention
recipients
impact
```

---

# 137. Automated Decisions

Systems making consequential automated decisions SHOULD receive dedicated privacy/legal/risk review.

---

# 138. Human Review

Where policy requires meaningful human review, do not create a rubber-stamp interface around a fully automated conclusion.

---

# 139. Analytics Privacy

Analytics follows the Analytics Gold Standard plus additional privacy constraints here.

---

# 140. Analytics Minimization

Analytics events SHOULD contain only properties needed for defined analyses.

Avoid:

```text
entire user object
entire request
entire route query
```

---

# 141. Analytics Identifiers

Prefer:

```text
opaque internal user_id
```

over:

```text
email
phone
name
```

---

# 142. Analytics Free Text

General analytics MUST NOT capture arbitrary:

```text
messages
notes
documents
search strings
form values
```

by default.

---

# 143. Autocapture

Unrestricted DOM/form autocapture is prohibited as the default organizational model.

---

# 144. Session Replay

Session replay requires explicit privacy review.

Controls SHOULD include:

```text
field masking
content suppression
sampling
access restrictions
retention
consent where applicable
```

---

# 145. Replay Sensitive Screens

Sensitive areas SHOULD be excluded entirely where masking cannot provide adequate confidence.

Examples:

```text
passwords
payments
health data
private communications
```

---

# 146. Analytics IP Address

Avoid retaining full IP addresses for product analytics unless required.

Use privacy-preserving regional derivation where appropriate.

---

# 147. Precise Location

Exact location is highly sensitive.

Collect only when the feature genuinely requires it and with appropriate controls.

---

# 148. Approximate Location

If approximate regional information satisfies the requirement, do not retain precise coordinates.

---

# 149. Telemetry Privacy

Logs, metrics, traces, and error reporting are also data-processing systems.

They MUST follow this standard.

---

# 150. Logs

Do not log personal data simply because logging makes debugging easier.

---

# 151. Logging Identifiers

Use opaque IDs where correlation is necessary.

---

# 152. Error Monitoring

Error reports must avoid capturing:

```text
passwords
tokens
request bodies
sensitive form values
```

unless a narrowly approved workflow requires selected fields.

---

# 153. Trace Attributes

Trace baggage/spans MUST NOT contain sensitive payloads unnecessarily.

---

# 154. Audit Logs

Audit records may legitimately retain:

```text
actor
resource
action
timestamp
```

longer than ordinary logs.

Their retention must still be governed.

---

# 155. Support Systems

CRM/ticketing/support platforms often accumulate personal data.

They MUST be included in:

```text
inventory
retention
subject requests
processor review
```

where applicable.

---

# 156. Support Copy/Paste

Support staff SHOULD avoid copying unnecessary sensitive customer information into tickets/chat.

---

# 157. Screenshots

Customer screenshots may contain:

```text
PII
tokens
financial data
other users
```

Treat attachments according to classification.

---

# 158. Admin Tools

Administrative interfaces MUST apply least privilege to personal data.

---

# 159. Default Admin Views

Do not show sensitive fields by default when operators rarely need them.

Use deliberate reveal/access workflows.

---

# 160. Masking

Sensitive values MAY be masked:

```text
••••1234
```

when operators only need partial identification.

---

# 161. Privileged Reveal

Full reveal of sensitive information SHOULD require:

```text
specific permission
justification where appropriate
audit
```

---

# 162. Impersonation

Impersonation does not automatically grant unlimited access to private data.

Follow Authentication & Authorization standards.

---

# 163. Employee Access

Employee access to customer personal data follows:

```text
need to know
least privilege
purpose limitation
```

---

# 164. Shared Accounts

Shared support/admin accounts are prohibited because they destroy accountability.

---

# 165. Production Access

Direct production-data access SHOULD be minimized through:

```text
curated admin tools
read replicas
controlled queries
```

---

# 166. Non-Production Environments

Production personal data SHOULD NOT be copied into:

```text
development
test
demo
```

environments by default.

---

# 167. Synthetic Test Data

Use synthetic data for development/testing whenever practical.

---

# 168. Sanitized Production Data

If production-like data is essential:

```text
de-identify
mask
minimize
approve
restrict
```

before use.

---

# 169. Demo Environments

Demos MUST NOT expose real customer data without explicit authorization.

---

# 170. Database Dumps

Production database dumps are Restricted artifacts.

They must not be stored casually on developer laptops.

---

# 171. Debugging Exports

Temporary data extracted for debugging must have:

```text
purpose
access limit
retention
secure deletion
```

---

# 172. Data Sharing

Before sharing personal data with another internal team or external entity, define:

```text
purpose
dataset
recipient
authority
retention
security
```

---

# 173. Internal Sharing Is Still Processing

Do not assume:

```text
same company
```

means unlimited reuse is appropriate.

---

# 174. Third-Party Processor

A processor/service provider processes data on the organization's behalf according to the applicable relationship.

---

# 175. Third-Party Inventory

Maintain a processor/vendor inventory including:

```text
Vendor
Service
Purpose
Data categories
Data subjects
Regions
Subprocessors
Retention
Contract owner
Security review
```

---

# 176. Vendor Review Before Integration

Do not send production personal data to a new vendor before required:

```text
security
privacy
legal/procurement
```

reviews complete.

---

# 177. Processor Contract

Where required, processor agreements SHOULD address:

```text
processing purpose
instructions
confidentiality
security
subprocessors
rights assistance
deletion/return
incident notification
audit/assurance
```

---

# 178. Subprocessors

Important processors SHOULD disclose or govern subprocessors according to contractual/privacy requirements.

---

# 179. Subprocessor Change

Material subprocessor changes MAY require:

```text
review
notification
objection process
```

depending on contract/law.

---

# 180. Processor Minimization

A processor should receive only the data required to provide its service.

---

# 181. Vendor Convenience Is Not a Purpose

Do not send every user attribute merely because an SDK accepts them.

---

# 182. Processor Retention

Understand what happens when:

```text
data deleted in our product
account terminated
processor contract ends
```

---

# 183. Processor Deletion Verification

For high-risk data, consider contractual or technical evidence of deletion where appropriate.

---

# 184. Processor Access

Know whether vendor personnel can access unencrypted customer data.

---

# 185. Processor Encryption

Evaluate:

```text
transport encryption
storage encryption
key management
```

according to classification.

---

# 186. Processor AI Training

When using AI/SaaS processors, explicitly determine whether customer data may be:

```text
retained
used for provider training
used for service improvement
reviewed by humans
```

Do not assume.

---

# 187. Vendor Feature Changes

A vendor adding an AI/training feature may materially change processing.

Review material processing changes.

---

# 188. Third-Party SDKs

Browser/mobile SDKs can collect data directly from users.

They require the same vendor/privacy review as server integrations.

---

# 189. SDK Data Collection

Understand whether an SDK automatically captures:

```text
device IDs
IP
URL
screen content
contacts
location
```

before adoption.

---

# 190. Third-Party Cookies

Third-party tracking technologies require explicit governance.

---

# 191. Third-Party Failure

If a nonessential third-party processor fails, core product operations SHOULD continue where safe.

---

# 192. Vendor Exit

Critical processors SHOULD have an exit plan addressing:

```text
data export
data return
deletion
replacement
```

---

# 193. Data Portability Between Vendors

Avoid unnecessary vendor lock-in around critical customer data.

---

# 194. Cross-Border Processing

Personal data crossing jurisdictional boundaries requires deliberate review where applicable.

---

# 195. Transfer Inventory

The data map SHOULD identify significant:

```text
source region
processing region
storage region
recipient region
```

---

# 196. Data Residency

If contractual/regulatory residency exists, enforce it technically.

A policy document alone is insufficient.

---

# 197. Regional Architecture

Multi-region systems SHOULD know whether:

```text
primary DB
backup
logs
analytics
support
```

stay inside required regions.

---

# 198. Support Access Across Borders

Remote human access can itself create cross-border considerations.

Include it in transfer analysis where applicable.

---

# 199. Backup Regions

Backup storage location is part of residency architecture.

---

# 200. CDN and Edge Services

CDN/edge processing may cross regions.

Understand what personal data reaches edge nodes.

---

# 201. Encryption Does Not Eliminate Transfer

Encrypted data may still be subject to data-transfer rules.

Do not use encryption as the sole legal classification.

---

# 202. Data Sharing APIs

APIs exposing personal data MUST follow:

```text
authentication
authorization
minimization
pagination
rate limits
audit where appropriate
```

---

# 203. API Response Minimization

Do not return:

```text
full user record
```

when the caller needs:

```text
id
display_name
```

---

# 204. Public APIs

External API contracts SHOULD clearly document personal-data fields.

---

# 205. GraphQL

GraphQL schemas MUST NOT make sensitive user fields broadly queryable simply because field-level selection exists.

Authorization remains mandatory.

---

# 206. Bulk Export APIs

Bulk personal-data APIs require elevated authorization and monitoring.

---

# 207. Webhooks

Webhooks SHOULD contain the minimum necessary payload.

Where practical, send:

```text
event
resource ID
```

instead of an entire personal-data object.

---

# 208. Webhook Destinations

Customers configuring webhooks become recipients of data.

Document what data is sent.

---

# 209. Search Indexes

Search copies personal data into another datastore.

Search indexes belong in:

```text
inventory
retention
deletion
access controls
```

---

# 210. Caches

Caches can contain personal data.

Define:

```text
TTL
scope
invalidation
encryption where needed
```

---

# 211. Shared Cache Keys

Tenant/user scope MUST be represented correctly in cache keys.

Cross-user cache leakage is a privacy/security defect.

---

# 212. Browser Cache

Sensitive responses SHOULD use appropriate HTTP caching controls.

---

# 213. CDN Caching

Never accidentally cache personalized confidential responses publicly.

---

# 214. Files

Uploaded files often contain personal data beyond what application schemas know.

Treat content according to classification.

---

# 215. File Metadata

Metadata such as:

```text
filename
EXIF
author
GPS
```

may contain personal data.

Strip metadata where the product does not need it.

---

# 216. Image Metadata

User image pipelines SHOULD consider removing unnecessary location/device metadata.

---

# 217. Document Metadata

Generated/shared documents may leak:

```text
author name
local paths
revision history
```

Review where risk warrants.

---

# 218. Notifications

Email/SMS/push notifications can expose personal data on:

```text
lock screens
shared inboxes
SMS previews
```

Minimize sensitive content.

---

# 219. Email Subject Lines

Do not place highly sensitive information in notification subjects unnecessarily.

---

# 220. Push Notifications

Push previews SHOULD be privacy-conscious because devices may be visible to others.

---

# 221. URLs

Sensitive personal data and secrets MUST NOT be placed in URLs.

URLs leak to:

```text
history
logs
analytics
referrers
screenshots
```

---

# 222. Query Parameters

Avoid personal data in query parameters when body/server state can represent it safely.

---

# 223. Password Reset Tokens

Recovery tokens appearing in URLs must be:

```text
short-lived
single-use
redacted from telemetry
```

according to Authentication standards.

---

# 224. Referral Parameters

Do not include raw personal identity in referral/tracking parameters.

---

# 225. Data at Rest

Sensitive personal data MUST receive appropriate storage protection according to Security standards.

---

# 226. Data in Transit

Use secure transport for personal data.

---

# 227. Field Encryption

Field/application-level encryption MAY be appropriate for highly sensitive fields.

Do not add custom cryptography casually.

---

# 228. Encryption Key Separation

Encrypted data and its controlling keys SHOULD have appropriately separated access.

---

# 229. Hashing

Hashing can protect verification values but does not automatically anonymize low-entropy personal data.

Example:

```text
hash(email)
```

can often still be matched against candidate emails.

---

# 230. Salted Hash

Salt improves password/hash security but does not necessarily remove privacy classification.

---

# 231. Tokenization

Tokenization MAY reduce exposure by separating identifiers from primary data.

---

# 232. Access Control

Access to personal data MUST follow least privilege.

---

# 233. Role Design

Roles should reflect actual operational need.

Avoid:

```text
everyone in support
→ all customer data
```

---

# 234. Field-Level Access

Highly sensitive fields MAY require separate authorization.

---

# 235. Database Access

Application DB credentials SHOULD have the minimum required access.

---

# 236. Data Warehouse Access

Analytical warehouses can contain broader datasets than production applications.

They require strong access governance.

---

# 237. Warehouse Raw Layer

Raw personal-data access SHOULD be limited to teams/roles that genuinely need it.

---

# 238. BI Dashboards

Prefer aggregated/de-identified views for broad organizational access.

---

# 239. Spreadsheet Exports

Spreadsheets are a common source of unmanaged personal-data copies.

Minimize and expire exports where possible.

---

# 240. Local Downloads

Sensitive data downloaded to endpoints falls under endpoint/data-protection policies.

---

# 241. Data Loss Prevention

High-risk organizations MAY use DLP controls to detect improper movement of sensitive information.

---

# 242. Data Lineage

For important datasets, lineage SHOULD answer:

```text
Where did this data originate?
Which transformations occurred?
Which systems consume it?
```

---

# 243. Data Lineage and Deletion

Deletion workflows depend on lineage.

If:

```text
raw.user.email
```

feeds five derived tables, those copies must be understood.

---

# 244. Data Quality

Privacy includes accurate personal data where inaccurate information can harm individuals.

---

# 245. Source of Truth

Each important attribute SHOULD have an authoritative source.

---

# 246. Duplicate Profiles

Identity duplication can produce:

```text
incomplete access responses
failed deletion
incorrect personalization
```

Implement identity governance where relevant.

---

# 247. Data Merge

Profile/account merge workflows MUST preserve:

```text
privacy requests
consent
retention
audit
```

semantics.

---

# 248. Data Split

If incorrectly merged identities are separated, ensure each person's data and request history is reconstructed safely.

---

# 249. Privacy Impact Assessment

New high-risk processing SHOULD undergo a documented privacy impact/risk assessment.

---

# 250. Assessment Triggers

Examples:

```text
sensitive data
large-scale profiling
precise location
biometrics
children
AI decision-making
new surveillance/tracking
new third-party sharing
cross-border expansion
```

---

# 251. Assessment Content

Assess:

```text
purpose
necessity
data categories
subjects
data flow
risks to people
controls
retention
recipients
rights
residual risk
```

---

# 252. Privacy Review Before Launch

A feature requiring privacy assessment MUST NOT ship before required review is completed.

---

# 253. Change Review

Material changes in:

```text
purpose
data category
recipient
retention
algorithm
region
```

may trigger reassessment.

---

# 254. Children and Minors

Products involving children/minors require dedicated policy and legal review.

Do not rely on ordinary adult privacy defaults.

---

# 255. Age Collection

Do not collect exact birth dates merely to avoid thinking about age policy.

Design the minimum age/eligibility mechanism required.

---

# 256. Parental Consent

Where parental authorization is required, use a dedicated verified workflow rather than a checkbox saying:

```text
I am a parent.
```

---

# 257. Children's Tracking

Advertising/profiling/tracking around children may have substantially stronger restrictions.

Treat as high risk.

---

# 258. AI & LLM Privacy

AI systems MUST follow the same privacy principles as conventional processing.

"AI" is not a special exemption.

---

# 259. AI Prompt Data

Prompts may contain:

```text
personal data
confidential data
secrets
customer content
```

Treat them according to classification.

---

# 260. AI Data Minimization

Send only context required for the model task.

Bad:

```text
entire customer database
```

Good:

```text
small relevant authorized subset
```

---

# 261. AI Provider Review

Before sending data to an AI provider, establish:

```text
processing purpose
retention
training use
region
subprocessors
security
deletion
```

---

# 262. Training Use

Customer/user data MUST NOT automatically become model-training data merely because it passes through an AI feature.

Training requires separate governance.

---

# 263. Retrieval Systems

RAG/vector systems create additional copies:

```text
chunks
embeddings
indexes
metadata
```

that must follow deletion and access rules.

---

# 264. Embeddings

Embeddings derived from personal data SHOULD NOT automatically be treated as anonymous.

---

# 265. AI Conversation History

Conversation retention must have an explicit product/policy purpose.

---

# 266. AI Logs

Avoid logging full prompts/responses to general observability systems by default.

---

# 267. AI Evaluation Datasets

Production conversations moved into evaluation datasets require:

```text
approval
minimization
de-identification where appropriate
retention
access control
```

---

# 268. AI Fine-Tuning

Fine-tuning on customer/user personal data requires dedicated governance because deletion becomes substantially more complex.

---

# 269. AI Output

Generated output may reproduce personal data supplied in context.

Authorization must apply to retrieved/contextual information before generation.

---

# 270. Privacy-Preserving Retrieval

AI must not become a bypass around normal:

```text
tenant
role
document
field
```

authorization.

---

# 271. Model Telemetry

Usage metrics should prefer:

```text
model
tokens
latency
safe IDs
outcome
```

over prompt content.

---

# 272. Data Breach

A privacy/data breach response process MUST exist.

---

# 273. Breach Detection

Potential breach signals may originate from:

```text
security monitoring
customer report
vendor notification
employee report
audit log
```

---

# 274. Breach Containment

Initial technical response should:

```text
contain
preserve evidence
revoke access where needed
identify scope
```

according to Incident Response standards.

---

# 275. Breach Assessment

Determine:

```text
data involved
subjects
sensitivity
volume
access/exfiltration
encryption
affected regions
```

---

# 276. Notification Requirements

Legal notification obligations vary.

Escalate to the responsible privacy/legal/security functions immediately rather than hard-coding universal deadlines into this engineering document.

---

# 277. Processor Breach

Processor contracts/workflows must ensure incidents are communicated to the organization quickly enough to meet its obligations.

---

# 278. Breach Records

Maintain appropriate incident/breach records without unnecessarily duplicating affected personal data into incident documents.

---

# 279. Data Disposal

Deletion applies beyond application databases.

---

# 280. Hardware Disposal

Storage media containing personal data requires secure disposal according to Security/Infrastructure standards.

---

# 281. SaaS Decommissioning

When retiring a SaaS tool:

```text
export needed records
remove integrations
revoke credentials
request deletion
verify where appropriate
```

---

# 282. Product Decommissioning

Before shutting down a product:

```text
notify users where required
provide exports where appropriate
apply retention
delete processors
revoke credentials
close data stores
```

---

# 283. Dataset Decommissioning

Old analytical datasets should not survive indefinitely because no one remembered them.

---

# 284. Data Retention During Migration

System migration MUST define:

```text
source retention
destination validation
cutover
source deletion
backup lifecycle
```

---

# 285. Duplicate Data During Migration

Temporary duplicate copies require an expiry/removal plan.

---

# 286. Legacy Systems

Legacy applications remain subject to privacy governance.

Age is not an exception.

---

# 287. Unsupported Systems

Systems incapable of meeting deletion/access/security requirements should be prioritized for:

```text
remediation
isolation
migration
retirement
```

according to risk.

---

# 288. Privacy Notices

Privacy notices SHOULD accurately reflect actual system processing.

Engineering data maps and legal/user notices must not contradict one another.

---

# 289. Notice Change

Material processing changes may require notice updates before launch.

---

# 290. Plain Language

User-facing privacy explanations SHOULD use understandable language.

Avoid intentionally opaque legalistic wording where simpler accurate wording works.

---

# 291. Just-in-Time Notice

For unusual or sensitive collection, contextual notice near the collection point MAY improve transparency.

---

# 292. Settings Transparency

A privacy setting should explain:

```text
what changes
what processing stops
what remains
```

---

# 293. No False Privacy Controls

Never provide a toggle that appears to stop tracking while the same tracking continues through another path.

---

# 294. Data Export UX

Self-service export SHOULD communicate:

```text
what is included
generation status
expiry
security implications
```

---

# 295. Data Deletion UX

Deletion UX SHOULD communicate:

```text
scope
consequence
retained exceptions
time/state
reversibility
```

where appropriate.

---

# 296. Deletion Confirmation

High-impact account deletion requires appropriate confirmation.

Confirmation does not replace authorization.

---

# 297. Reauthentication

High-risk privacy operations MAY require recent/strong authentication.

Examples:

```text
download complete data export
delete account
change privacy contact information
```

---

# 298. Notifications

Users MAY be notified when high-risk:

```text
export
deletion
privacy setting change
```

occurs, according to risk.

---

# 299. Abuse Prevention

Privacy rights workflows require protection against:

```text
account takeover
mass export abuse
deletion sabotage
```

without making legitimate rights unnecessarily difficult to exercise.

---

# 300. Rate Limiting

Subject-request endpoints MAY use reasonable abuse controls.

Do not use rate limiting to obstruct valid privacy rights.

---

# 301. Secure Export Generation

Generated privacy exports MUST NOT be publicly guessable.

---

# 302. Export Encryption

Highly sensitive export packages MAY require additional encryption depending on delivery channel/risk.

---

# 303. Export Password Delivery

If separate passwords are used, do not send package and password through the same insecure channel without reason.

---

# 304. Background Jobs

Privacy workflows implemented through queues/jobs MUST follow Error & Resilience standards.

---

# 305. Privacy Job Idempotency

Deletion/export/correction propagation jobs MUST tolerate duplicate delivery.

---

# 306. Dead-Letter Privacy Jobs

A privacy job in a dead-letter queue requires priority ownership.

It may represent an incomplete rights obligation.

---

# 307. Privacy Observability

Monitor:

```text
request backlog
request age
deletion failures
processor failures
retention-job failures
export failures
```

---

# 308. Privacy Metrics

Use aggregated operational metrics.

Do not place subject IDs into low-cardinality metric systems.

---

# 309. Privacy Audit Events

Important events MAY include:

```text
privacy_export_requested
privacy_export_completed
deletion_requested
deletion_completed
consent_changed
restriction_changed
```

without logging unnecessary personal payloads.

---

# 310. Audit Separation

Privacy audit evidence SHOULD remain separate from normal product analytics.

---

# 311. Retention Monitoring

Alert when:

```text
retention job fails
old data exceeds retention policy
```

for important stores.

---

# 312. Processor Monitoring

Critical processor privacy obligations SHOULD have accountable owners and review dates.

---

# 313. Access Reviews

Teams with broad personal-data access SHOULD undergo periodic access review according to risk.

---

# 314. Dormant Access

Remove unused privileged data access.

---

# 315. Data Access Audit

High-risk datasets SHOULD expose sufficient auditability to answer:

```text
who accessed
what
when
why where applicable
```

---

# 316. Query Auditing

Sensitive warehouse/database query access MAY require auditing.

---

# 317. Data Governance Catalog

Mature organizations SHOULD maintain a searchable catalog connecting:

```text
Dataset
Owner
Classification
Purpose
Lineage
Retention
Access
```

---

# 318. Data Dictionary

Important business/data fields SHOULD have canonical definitions.

---

# 319. Naming Consistency

Avoid multiple fields:

```text
customer_id
client_id
user_identifier
uid
```

representing the same concept without governance.

---

# 320. Schema Review

New sensitive fields SHOULD undergo explicit review during schema/API design.

---

# 321. Unknown JSON Blobs

Avoid storing arbitrary user metadata in unrestricted:

```text
JSON
metadata
custom_fields
```

without governance.

Such fields become hidden personal-data reservoirs.

---

# 322. Custom Fields

If customers can define custom fields, inform them about allowed data and apply retention/export/deletion semantics.

---

# 323. Free-Text Risk

Free text is difficult to classify because users may enter unexpected sensitive information.

Minimize its replication.

---

# 324. Data Parsing

Do not extract additional personal attributes from free text merely because technically possible without an approved purpose.

---

# 325. Data Enrichment

Third-party enrichment adds personal data and requires:

```text
purpose
source
accuracy
rights handling
processor/controller analysis
```

---

# 326. Data Brokers

Acquiring personal data from brokers/sources requires dedicated privacy/legal review.

---

# 327. Public Data

Information publicly accessible on the internet is not automatically free of privacy obligations.

---

# 328. Scraping

Large-scale collection of public personal data requires explicit governance.

---

# 329. Machine Learning Features

Before adding a personal attribute as an ML feature, ask:

```text
Is it necessary?
Is it appropriate?
Could it create unfair/prohibited inference?
How will deletion propagate?
```

---

# 330. Sensitive Proxies

Apparently harmless attributes can proxy sensitive characteristics.

High-impact models require appropriate review.

---

# 331. Privacy Testing

Privacy controls MUST be tested.

---

# 332. Deletion Tests

Test deletion across:

```text
primary record
children/dependencies
search
files
cache
derived stores
```

where applicable.

---

# 333. Backup Restore Tests

Verify deleted users do not unintentionally become active again after restore.

---

# 334. Export Tests

Test:

```text
correct subject
correct tenant
no other user's data
no secrets
expected datasets
expiry
```

---

# 335. Authorization Tests

Attempt:

```text
User A requests User B export
Tenant A requests Tenant B data
```

and verify denial.

---

# 336. Consent Tests

Test:

```text
default state
grant
withdrawal
downstream enforcement
```

where consent applies.

---

# 337. Analytics Tests

Verify prohibited sensitive values never enter analytics payloads.

---

# 338. Logging Tests

Test redaction of:

```text
token
password
restricted fields
```

---

# 339. Retention Tests

Time/lifecycle tests SHOULD verify data becomes eligible for deletion correctly.

---

# 340. Processor Integration Tests

Where deletion/export APIs exist at processors, integration tests MAY verify orchestration.

---

# 341. Privacy Regression Tests

Privacy bugs SHOULD receive regression coverage.

---

# 342. Privacy CI

Static checks MAY detect:

```text
forbidden logging
unapproved analytics fields
sensitive-field propagation
```

where feasible.

---

# 343. Privacy Review Checklist

Before introducing new personal-data processing:

```text
□ Purpose documented
□ Minimum data identified
□ Data subject identified
□ Classification assigned
□ Processing authority/basis identified where needed
□ User notice considered
□ Consent/choice considered
□ Retention defined
□ Deletion defined
□ Export/access implications considered
□ Recipients/processors identified
□ Region/transfer assessed
□ Security controls defined
□ Analytics/logging implications reviewed
□ Owner assigned
```

---

# 344. Data Classification Checklist

```text
□ Is it personal data?
□ Is it sensitive?
□ Is it a credential?
□ Is it customer confidential?
□ Could it identify someone indirectly?
□ Correct classification applied
□ Access controls match classification
□ Logging rules match classification
□ Test-environment rules match classification
```

---

# 345. Data Minimization Checklist

```text
□ Why is this field required?
□ Can less precise data work?
□ Can it be derived temporarily instead?
□ Do we need to persist it?
□ Do all recipients need it?
□ Does it need to appear in logs?
□ Does analytics need it?
□ Can retention be shorter?
```

---

# 346. Consent Checklist

```text
□ Consent is actually the appropriate mechanism
□ Purpose specific
□ Language understandable
□ Choice not bundled improperly
□ No manipulative design
□ Evidence recorded where needed
□ Withdrawal supported
□ Withdrawal propagates
□ Versioning considered
```

---

# 347. Retention Checklist

```text
□ Data category identified
□ Purpose identified
□ Trigger defined
□ Period defined
□ Exception defined
□ Automatic enforcement
□ Downstream stores included
□ Backups considered
□ Owner identified
□ Periodic verification
```

---

# 348. Deletion Checklist

```text
□ Request verified
□ Scope identified
□ Legal/policy exceptions evaluated
□ Primary DB
□ Related records
□ Files
□ Search
□ Cache
□ Analytics
□ Warehouse
□ Third-party processors
□ Backups/restores addressed
□ Failures retried
□ Completion verified
□ Audit evidence retained minimally
```

---

# 349. Privacy Export Checklist

```text
□ Requester verified
□ Scope correct
□ Tenant isolation
□ Third-party data protected
□ Secrets excluded
□ Format usable
□ Export encrypted/protected as needed
□ Link expires
□ Export auto-deletes
□ Generation/download audited where appropriate
```

---

# 350. Processor Checklist

```text
□ Purpose
□ Data categories
□ Processing regions
□ Security assessment
□ Privacy assessment
□ Contract/DPA where needed
□ Subprocessors
□ Retention
□ Deletion
□ Export/return
□ Breach notification
□ Training/secondary use
□ Exit plan
□ Owner
```

---

# 351. Analytics Privacy Checklist

```text
□ Semantic event only
□ Personal fields minimized
□ No secrets
□ No free-text content
□ Raw URL avoided
□ Query params allowlisted
□ Internal opaque IDs preferred
□ Consent respected where applicable
□ Session replay reviewed
□ Autocapture restricted
□ Destination approved
□ Retention defined
```

---

# 352. AI Privacy Checklist

```text
□ Purpose identified
□ Minimum context
□ Data classification known
□ Provider reviewed
□ Training use known
□ Retention known
□ Region known
□ Subprocessors known
□ Human review known
□ Prompt logging minimized
□ Vector/embedding deletion supported
□ Authorization enforced before retrieval
```

---

# 353. Data Subject Request Checklist

```text
□ Request type
□ Identity verification
□ Scope
□ Jurisdiction/policy rules
□ Deadline
□ Systems searched
□ Processors included
□ Other people's rights protected
□ Exceptions documented
□ Response securely delivered
□ Completion recorded
```

---

# 354. Definition of Done — New Data Field

A new personal-data field is not production-ready until:

```text
✓ Purpose documented
✓ Necessity justified
✓ Classification applied
✓ Schema ownership clear
✓ Access policy defined
✓ API exposure minimized
✓ Logging policy reviewed
✓ Analytics policy reviewed
✓ Retention defined
✓ Deletion behavior defined
✓ Export/access behavior defined
✓ Processor sharing reviewed
✓ Tests updated
```

---

# 355. Definition of Done — New Processor

A new processor integration is not production-ready until:

```text
✓ Vendor owner assigned
✓ Processing purpose documented
✓ Data categories minimized
✓ Security review complete
✓ Privacy review complete
✓ Agreement completed where required
✓ Subprocessors understood
✓ Regions understood
✓ Retention understood
✓ Deletion path understood
✓ Incident path understood
✓ Secondary/training use understood
✓ Exit process understood
```

---

# 356. Definition of Done — Privacy Request System

A privacy-request workflow is complete when:

```text
✓ Intake exists
✓ Identity verification exists
✓ Request tracking exists
✓ Policy/jurisdiction routing exists
✓ Data inventory supports discovery
✓ Export works
✓ Correction workflow works
✓ Deletion orchestration works
✓ Processor propagation works
✓ Deadlines monitored
✓ Exceptions recorded
✓ Secure response delivery exists
✓ Audit evidence exists
✓ Failure/retry handling works
```

---

# 357. Privacy Anti-Patterns

Avoid:

```text
Collect it now, decide purpose later.
```

Avoid:

```text
Every profile field is required.
```

Avoid:

```text
Keep everything forever.
```

Avoid:

```text
Deleting user row = complete deletion.
```

Avoid:

```text
Soft deleted = legally erased.
```

Avoid:

```text
Production dump in developer laptop.
```

Avoid:

```text
Email as analytics identity.
```

Avoid:

```text
Raw user object sent to analytics.
```

Avoid:

```text
Log entire HTTP body.
```

Avoid:

```text
Session replay on everything.
```

Avoid:

```text
Consent hidden in Terms of Service.
```

Avoid:

```text
Reject button harder to find than Accept.
```

Avoid:

```text
Consent withdrawn
but downstream tracking continues.
```

Avoid:

```text
One privacy setting for unrelated purposes.
```

Avoid:

```text
Vendor SDK added before privacy review.
```

Avoid:

```text
Third party can have all fields because API supports them.
```

Avoid:

```text
Hash(email) = anonymous.
```

Avoid:

```text
Publicly available = no privacy concern.
```

Avoid:

```text
User requested deletion
→ remove frontend account
→ keep everything indefinitely.
```

Avoid:

```text
Backup restored
→ deleted account resurrected.
```

Avoid:

```text
Data export containing password hashes/tokens.
```

Avoid:

```text
Privacy export available through permanent public URL.
```

Avoid:

```text
Privacy request queue nobody monitors.
```

Avoid:

```text
AI provider added without knowing training/retention policy.
```

Avoid:

```text
Embedding deleted profile but keep vectors forever.
```

Avoid:

```text
Privacy is legal team's responsibility only.
```

---

# 358. AI Coding Rules — Privacy

AI coding agents MUST inspect existing:

```text
data classification
privacy utilities
retention model
consent model
analytics schema
logging policy
processor architecture
```

before introducing new personal-data handling.

---

# 359. AI Data-Minimization Rule

AI MUST NOT add a user field because:

```text
it might be useful
```

It must identify a feature requirement/purpose.

---

# 360. AI Schema Rule

When adding a personal-data field, AI SHOULD surface:

```text
purpose
classification
retention
deletion
```

implications.

---

# 361. AI API Rule

AI MUST NOT return entire database user objects through APIs by default.

Map only the required fields.

---

# 362. AI Logging Rule

AI MUST NOT add:

```text
console.log(user)
logger.info(request.body)
```

to production code when those objects may contain personal/sensitive information.

---

# 363. AI Analytics Rule

AI MUST NOT spread user/domain objects into analytics.

Only approved allowlisted properties are emitted.

---

# 364. AI URL Rule

AI MUST NOT place:

```text
email
token
private resource title
sensitive search
```

into URLs without explicit architecture justification.

---

# 365. AI Consent Rule

AI MUST NOT add a consent checkbox merely to "make processing compliant."

It must follow the established privacy-purpose/authority policy.

---

# 366. AI Retention Rule

AI MUST NOT implement permanent storage by default.

If new persistent personal data is introduced, retention must be identified.

---

# 367. AI Deletion Rule

When creating a new personal-data store, AI MUST consider whether existing deletion workflows need integration.

---

# 368. AI Export Rule

When creating a new personal-data store, AI MUST consider whether subject exports/access workflows need integration.

---

# 369. AI Processor Rule

AI MUST NOT add a third-party SDK or API that receives personal data without flagging processor/privacy review requirements.

---

# 370. AI Secrets Rule

AI MUST distinguish:

```text
personal data
```

from:

```text
credentials/secrets
```

and apply the stronger Security requirements to credentials.

---

# 371. AI Pseudonymization Rule

AI MUST NOT claim that:

```text
hash
opaque ID
token
```

automatically makes data anonymous.

---

# 372. AI Test-Data Rule

AI SHOULD generate synthetic test data rather than copying production personal information.

---

# 373. AI Data-Export Rule

AI-generated export code MUST explicitly authorize:

```text
actor
subject
tenant
dataset
```

---

# 374. AI Deletion Idempotency Rule

AI-generated deletion workflows MUST be retry-safe and should track downstream completion.

---

# 375. AI Backup Rule

AI SHOULD consider restore semantics when deletion requirements interact with backups.

---

# 376. AI AI-Feature Rule

Before sending user content to an LLM/provider, AI MUST inspect:

```text
data classification
minimum required context
provider policy
```

and preserve normal authorization.

---

# 377. AI Retrieval Rule

AI-generated RAG queries MUST NOT retrieve documents merely because vector similarity matches.

Normal access-control rules still apply.

---

# 378. AI Embedding Rule

Deleting personal content SHOULD trigger deletion/invalidation of relevant:

```text
chunks
embeddings
indexes
cached context
```

according to the canonical AI/data architecture.

---

# 379. AI Gold Rule

When uncertain:

```text
Do not collect
>
Collect minimally
>
Process locally
>
Share minimally
>
Retain briefly
>
Control access
>
Delete reliably
```

---

# 380. Golden Privacy & Data Governance Rules

**1. Every personal-data collection has a defined purpose.**

**2. Possession does not imply unlimited permission to use data.**

**3. Collect the minimum data necessary.**

**4. Minimize precision, frequency, recipients, access, and retention—not just fields.**

**5. Privacy is designed before implementation.**

**6. Privacy-friendly behavior is the default.**

**7. Maintain an inventory of personal-data processing.**

**8. Know where data flows.**

**9. Every important dataset has an owner.**

**10. Classify data according to sensitivity.**

**11. Credentials are always highly restricted.**

**12. Pseudonymous data is not automatically anonymous.**

**13. Hashing an identifier does not necessarily anonymize it.**

**14. Sensitive data receives stronger controls.**

**15. Consent is used only where it is the appropriate processing mechanism.**

**16. Consent is specific, understandable, demonstrable, and withdrawable where applicable.**

**17. Privacy choices never use manipulative design.**

**18. User preference changes propagate to downstream processing.**

**19. Every personal-data category has a retention rule.**

**20. Retention is automatically enforced where practical.**

**21. "Forever" requires extraordinary justification.**

**22. Deletion is an end-to-end distributed workflow.**

**23. Soft deletion does not automatically equal erasure.**

**24. Deleted data must not silently resurrect from backups.**

**25. Privacy request workflows verify identity proportionately.**

**26. Verification itself follows data minimization.**

**27. Subject exports never contain reusable credentials.**

**28. Export links are authenticated/short-lived where appropriate.**

**29. Exported files expire.**

**30. Correction propagates to relevant downstream systems.**

**31. Portability and access may have different scopes.**

**32. Restriction/opt-out controls must actually stop applicable processing.**

**33. Analytics contains only approved minimal properties.**

**34. General analytics does not ingest arbitrary free-form user content.**

**35. Session replay and autocapture require dedicated governance.**

**36. Logs and traces are also privacy surfaces.**

**37. Production personal data is not casually copied to development.**

**38. Third-party processors receive only necessary data.**

**39. Every processor has an owner, purpose, retention model, deletion model, and exit path.**

**40. Subprocessors and processing regions are understood.**

**41. AI providers follow the same processor/privacy requirements as other vendors.**

**42. Customer data is not automatically eligible for model training.**

**43. Embeddings and derived AI data participate in lifecycle/deletion governance.**

**44. Cross-border processing is mapped and reviewed where applicable.**

**45. Data residency requirements are technically enforced.**

**46. URLs do not contain unnecessary sensitive information.**

**47. Personal-data APIs return the minimum required fields.**

**48. Caches, search indexes, warehouses, files, exports, and backups are part of the data lifecycle.**

**49. Privacy controls are tested.**

**50. If data cannot be found, controlled, exported, retained correctly, and deleted correctly, it is not governed.**

---

# 381. Canonical Privacy & Data Governance Standard

The organizational standard is:

> **Personal data is collected only for defined legitimate product or operational purposes, and collection is limited to the minimum scope, precision, frequency, recipients, accessibility, and retention necessary to fulfill those purposes. Data is classified according to sensitivity, assigned accountable ownership, mapped across systems and processors, and managed through explicit lifecycle controls from collection through final disposal.**

> **Privacy is implemented by design and by default. Optional processing choices are understandable and non-manipulative, consent is used only when appropriate to the processing model, preferences are stored authoritatively where required, and withdrawal or opt-out propagates to downstream systems rather than remaining cosmetic UI state.**

> **Retention is defined per data category and enforced automatically where practical. Deletion is treated as an idempotent distributed workflow covering primary databases, files, search indexes, caches, analytics systems, warehouses, processors, and backup/restore behavior according to applicable policy. Privacy requests use proportionate identity verification and controlled workflows for applicable access, correction, deletion, portability, restriction, objection, and related rights. Data exports are authorization-scoped, exclude credentials, use secure delivery, and expire automatically.**

> **Product analytics, observability, support systems, development environments, AI systems, search indexes, caches, generated exports, and third-party SaaS tools are all included in the privacy boundary. General analytics and telemetry minimize personal data and avoid unrestricted free text, secrets, sensitive form values, and raw content capture. Third-party processors receive only necessary data and are governed for security, subprocessors, regions, retention, deletion, incident response, secondary use, and exit.**

> **Privacy engineering is supported by data inventories, classification, lineage, retention schedules, processor inventories, access controls, privacy risk assessments, testing, auditability, observability, and periodic review. Legal requirements are implemented as jurisdiction-specific policy overlays rather than hard-coded assumptions that every user, dataset, or request is governed identically.**

A production-grade privacy architecture should make it easy to answer:

```text
What personal data do we have?
Why do we have it?
Is every field necessary?
Who is the data subject?
What is its classification?
Who owns the dataset?
Where is the source of truth?
Which systems contain copies?
Which third parties receive it?
Which countries/regions process it?
What authority permits the processing?
What user controls exist?
How long is the data retained?
What triggers deletion?
Can the user access it?
Can it be corrected?
Can it be exported?
Can it be deleted?
What prevents deleted data from returning?
Does analytics contain it?
Do logs contain it?
Does an AI provider receive it?
Can support staff see it?
What happens when a processor contract ends?
How do we prove the lifecycle actually works?
```

If those questions cannot be answered, the data is not yet adequately governed.

A few standards details matter. GDPR’s Article 5 explicitly establishes **purpose limitation, data minimization, storage limitation, integrity/confidentiality and accountability**, and Article 25 requires privacy/data protection safeguards to be built into design and defaults. Its access, erasure and portability rights also illustrate why data inventory, deletion orchestration and export architecture need to be engineered rather than handled manually after a request arrives. citeturn358257search0turn358257search1

For processor governance, the EDPB maintains detailed controller/processor guidance, while the broader NIST Privacy Framework treats privacy as enterprise risk management across the complete data lifecycle. As of **September 2026**, NIST still describes Privacy Framework **1.1 as an Initial Public Draft / forthcoming update**, so I would not label PF 1.1 as a finalized normative baseline yet. citeturn358257search3turn442570search3

In the master hierarchy, this fits cleanly after Analytics because Analytics is one major consumer of governed personal data:

**… → Testing → Performance → Observability → Analytics → Privacy & Data Governance → Configuration & Environments → Dependencies → CI/CD → Infrastructure & Deployment → Backup & Disaster Recovery → Documentation → Governance.**
