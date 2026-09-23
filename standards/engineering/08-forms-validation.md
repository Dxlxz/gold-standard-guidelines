---
id: "forms-validation"
title: "Forms & Validation Guidelines — Gold Standard"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "forms", "validation"]
applies_to: ["ui"]
related: []
legacy_number: 14
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 71898
provenance: baseline

---

Below is the canonical **Forms & Validation Gold Standard**, aligned with the Security, State Management, Data, API, Accessibility, and shadcn-based component standards.

# Forms & Validation Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical standard for forms, user input, validation, submission workflows, drafts, autosave, multi-step forms, file uploads, destructive actions, and accessible error handling.

The objectives are to make forms:

- understandable;
- efficient;
- accessible;
- secure;
- resilient;
- predictable;
- recoverable;
- difficult to misuse;
- easy to maintain.

The core principle is:

> **Forms collect user intent; trusted server logic decides whether that intent is valid and permitted.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented reason exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

---

# 3. Form Architecture

A canonical form flow is:

```text
Existing server state
↓
Initial form values
↓
User edits draft
↓
Client validation
↓
Submission
↓
Server validation
↓
Authentication
↓
Authorization
↓
Domain validation
↓
Transaction/mutation
↓
Canonical server result
↓
Form reconciliation
```

---

# 4. Validation Layers

Validation MUST be understood as multiple layers:

```text
HTML/native constraints
↓
Client schema validation
↓
Server structural validation
↓
Authorization
↓
Domain/business validation
↓
Database constraints
```

Each layer solves a different problem.

---

# 5. Client Validation Is UX

Client validation exists primarily to:

- provide immediate feedback;
- prevent avoidable round trips;
- guide valid input;
- improve usability.

It is not the authoritative security boundary.

---

# 6. Server Validation Is Mandatory

Every submitted value from the browser MUST be treated as untrusted.

The server MUST validate data even when:

```text
client schema passed
HTML required was used
button was disabled
field was hidden
TypeScript says value is valid
```

A client can bypass all of these controls.

---

# 7. Database Integrity Is Final Defense

Critical invariants SHOULD also be enforced by appropriate database constraints.

Example:

```text
Client:
email appears unique

Server:
checks uniqueness

Database:
UNIQUE constraint
```

The database protects correctness under concurrency.

---

# 8. Form Ownership

Unsaved values belong to form state.

Do not duplicate form values simultaneously in:

```text
form library
+
useState
+
global store
```

without a concrete need.

---

# 9. Form State vs Server State

These are intentionally different:

```text
Server:
name = "Acme"

Form draft:
name = "Acme International"
```

The draft may diverge until saved or cancelled.

---

# 10. Native HTML First

Use semantic HTML form elements first:

```html
<form>
<label>
<input>
<select>
<textarea>
<button>
<fieldset>
<legend>
```

before custom recreations.

---

# 11. Progressive Enhancement

Where practical, forms SHOULD work through native form semantics and be enhanced with JavaScript.

Do not recreate standard form behavior unnecessarily with:

```text
div
+
click handler
+
manual keyboard behavior
```

---

# 12. Form Structure

A standard form should generally contain:

```text
Form title
Description where needed

Section
  Label
  Description/help
  Control
  Validation message

Actions
```

---

# 13. Single-Column Default

Most application forms SHOULD use a single primary column.

This improves:

- scanning;
- mobile behavior;
- error association;
- keyboard flow.

---

# 14. Multi-Column Forms

Use multiple columns when fields are semantically paired.

Examples:

```text
First name | Last name

City | State | Postal code

Start date | End date
```

Do not create dense spreadsheet-like forms merely to reduce vertical length.

---

# 15. Reading Order

Visual order MUST match logical DOM and keyboard order.

Do not use CSS layout to create a visual sequence different from accessibility/navigation order.

---

# 16. Group Related Fields

Related controls SHOULD be visually and semantically grouped.

Examples:

```text
Personal information
Billing address
Notification preferences
Security
```

---

# 17. Fieldsets

Use `<fieldset>` and `<legend>` where a group of fields shares a question or label.

Especially appropriate for:

```text
radio groups
checkbox groups
related choice sets
```

---

# 18. Form Sections

Long forms SHOULD be divided into clear sections.

Avoid one uninterrupted block containing dozens of controls.

---

# 19. Section Titles

Section headings should explain the information requested.

Prefer:

```text
Billing address
```

over:

```text
Section 3
```

---

# 20. Field Order

Order fields according to:

```text
user workflow
mental model
dependency
```

not database column order.

---

# 21. Ask Only What Is Necessary

Every field imposes:

- cognitive cost;
- completion time;
- validation burden;
- privacy cost;
- storage responsibility.

Do not collect information "just in case."

---

# 22. Required Fields

Required fields MUST be clearly identifiable.

Do not rely only on:

```text
color
asterisk without explanation
```

to communicate requirement.

---

# 23. Mostly Required Forms

If nearly every field is required, it may be clearer to mark only optional fields:

```text
Middle name (optional)
```

provided the convention remains clear.

---

# 24. Labels

Every form control MUST have an accessible label.

Preferred:

```html
<label for="email">Email address</label>
<input id="email" ...>
```

or the equivalent relationship provided by the component system.

---

# 25. Placeholder Is Not a Label

Do not replace the field label with placeholder text.

Placeholder text:

- disappears;
- may have poor contrast;
- does not consistently communicate field identity;
- is not an adequate label architecture.

---

# 26. Label Position

For most application forms:

```text
Label
Control
```

is the preferred layout.

Top-aligned labels usually work well across responsive widths and long translated text.

---

# 27. Labels Should Be Concise

Prefer:

```text
Email address
Workspace name
```

instead of full instructions in the label.

Put additional information in description/help text.

---

# 28. Labels Use Product Language

Use terminology established in the product.

Do not expose database or internal implementation terminology.

---

# 29. Help Text

Use help text when users need information before answering.

Example:

```text
Workspace URL

Used in links to your workspace.
```

---

# 30. Help Text vs Error

Help text explains expected input.

Error text explains why the current input is unacceptable.

Do not replace useful help text with errors after validation unless layout requires it.

---

# 31. Instructions Before Input

When a format is non-obvious, explain it before the user commits an error.

Example:

```text
Date of birth
DD/MM/YYYY
```

where locale and product requirements make the format necessary.

---

# 32. Native Input Types

Use semantically appropriate HTML input types.

Examples:

```text
email
url
tel
number
date
password
```

when their native behavior matches product requirements.

---

# 33. Do Not Use Number Input for Non-Numeric Identifiers

Values such as:

```text
postal code
phone number
credit-card-like identifiers
OTP
```

are often not mathematical numbers.

Do not choose `type="number"` solely because they contain digits.

---

# 34. Input Mode

Use appropriate input modes for mobile keyboard optimization when useful.

Examples:

```text
numeric
decimal
email
tel
url
```

---

# 35. Autocomplete

Use standardized autocomplete attributes where applicable.

Examples:

```text
name
email
street-address
postal-code
current-password
new-password
one-time-code
```

This improves speed and accessibility.

---

# 36. Do Not Disable Password Managers

Authentication forms MUST support:

- paste;
- password managers;
- autocomplete;

where appropriate.

Do not deliberately block them.

---

# 37. Text Fields

Use text inputs for short single-line content.

Use textarea for genuinely multi-line content.

---

# 38. Textarea Sizing

Textarea should provide enough visible room for expected content.

A 500-word response should not begin inside a one-line-high field.

---

# 39. Auto-Growing Textareas

Auto-growing textareas MAY improve long-form editing.

They should retain:

- predictable limits;
- accessible behavior;
- usable scrolling.

---

# 40. Select

Use Select for relatively constrained option sets.

Do not use a traditional Select for:

```text
thousands of users
countries with search requirements
large dynamic resources
```

when Combobox is more suitable.

---

# 41. Combobox

Use Combobox when users benefit from:

```text
search
filtering
keyboard navigation
large dynamic lists
```

Its accessibility behavior MUST be implemented correctly.

---

# 42. Radio Buttons

Use radio buttons for a small set of mutually exclusive choices where displaying choices aids comprehension.

---

# 43. Checkboxes

Use checkboxes for independent selections.

Do not use checkboxes to mimic mutually exclusive radio behavior.

---

# 44. Switches

Use switches for immediate binary settings where changing the value conceptually takes effect.

Example:

```text
Enable weekly summary
```

Do not use switches where the user expects to choose options and later click Save if that creates ambiguous semantics.

---

# 45. Checkbox vs Switch

Conceptually:

```text
Checkbox
→ selection

Switch
→ on/off setting
```

Choose based on meaning, not appearance.

---

# 46. Date Inputs

Use date controls appropriate to the task.

Distinguish:

```text
calendar date
date/time instant
date range
```

---

# 47. Date Picker

A date picker SHOULD supplement, not make impossible, efficient keyboard/text entry where the use case benefits from direct entry.

---

# 48. Date Range

For ranges, enforce:

```text
start <= end
```

and provide a useful cross-field error.

---

# 49. Time Zones

If a date/time operation depends on timezone, communicate the relevant timezone.

Do not silently assume users understand server timezone.

---

# 50. Numeric Inputs

Define:

```text
minimum
maximum
precision
unit
```

when applicable.

---

# 51. Units

Place units near the value.

Example:

```text
Timeout
[ 30 ] seconds
```

Avoid requiring users to infer the unit.

---

# 52. Currency Inputs

Currency fields MUST communicate currency.

Example:

```text
MYR 125.00
```

or equivalent local convention.

Never assume currency solely from number formatting.

---

# 53. Currency Parsing

Parse user-facing formatted currency into the canonical monetary representation.

Do not use floating-point arithmetic for authoritative money operations.

---

# 54. Percentage Fields

Make representation clear.

Users normally expect:

```text
15
```

to mean:

```text
15%
```

even if the backend stores `0.15`.

---

# 55. Password Fields

Password controls SHOULD include:

- correct autocomplete;
- show/hide option where useful;
- password-manager support;
- clear requirements.

Avoid excessive complexity rules inconsistent with the Security Gold Standard.

---

# 56. Password Confirmation

Password confirmation MAY be useful where accidental mistyping creates significant friction.

Do not require confirmation automatically for every password workflow if visibility/password-manager support makes it unnecessary.

---

# 57. OTP Fields

OTP entry should:

- allow paste;
- support autocomplete where available;
- avoid one-input-per-digit complexity unless accessibility is handled correctly;
- clearly indicate expiry/retry state.

---

# 58. Hidden Fields

Hidden input values are untrusted.

Never use hidden fields as:

```text
authorization proof
price authority
tenant authority
permission state
```

---

# 59. Disabled Fields

Disabled controls are presentation behavior.

A malicious request can still submit equivalent fields separately.

Server authorization remains mandatory.

---

# 60. Read-Only Fields

Use read-only controls when a value should remain visible/selectable but not editable.

Do not confuse disabled and read-only semantics.

---

# 61. Schema Validation

Complex forms SHOULD have an explicit schema.

A form schema may define:

```text
type
required state
length
range
format
enum
nested structures
cross-field rules
```

---

# 62. Canonical Schema Strategy

Prefer:

```text
canonical domain/request schema
↓
server validation
↓
client-compatible schema/constraints
```

where semantics genuinely match.

---

# 63. Do Not Blindly Reuse Schemas

The same fields may have different validation semantics.

Example:

```text
CreateUser
UpdateUser
DatabaseUser
PublicUser
```

should not automatically share one schema.

---

# 64. Input Schema vs Domain Schema

Input validation establishes:

> Is this a structurally acceptable request?

Domain validation establishes:

> Is this operation valid in the current business context?

These are separate.

---

# 65. Structural Validation

Examples:

```text
email is string
quantity is integer
status is allowed value
array ≤ 50 items
```

---

# 66. Domain Validation

Examples:

```text
invoice may still be edited
workspace has not exceeded quota
user may invite this role
date does not conflict with booking
```

---

# 67. Database Validation

Examples:

```text
unique constraint
foreign key
not null
check constraint
```

Do not duplicate all database semantics into arbitrary client logic and assume concurrency disappears.

---

# 68. Allowlist Validation

Prefer defining what is acceptable.

Example:

```text
role ∈
admin
member
viewer
```

rather than filtering known bad strings.

---

# 69. Length Validation

Every untrusted text/array/file input SHOULD have reasonable bounds.

Validate minimum and maximum according to the domain.

---

# 70. Trim Policy

Define whitespace semantics.

For identifiers/names where surrounding whitespace is meaningless:

```text
"  Acme  "
→ "Acme"
```

may be normalized.

Do not trim content where whitespace carries meaning.

---

# 71. Normalization

Normalize deliberately.

Potential normalization:

```text
Unicode normalization
case normalization
whitespace normalization
phone formatting
```

must follow domain semantics.

---

# 72. Email Validation

Email validation SHOULD reject clearly invalid structure without trying to prove mailbox existence syntactically.

If mailbox ownership matters:

```text
send verification
```

rather than relying on increasingly restrictive regex.

---

# 73. Phone Validation

Phone numbers are international identifiers.

Do not assume one country's length or formatting unless the product is explicitly jurisdiction-limited.

---

# 74. URL Validation

URL fields require:

```text
parsing
protocol policy
domain/security policy where relevant
```

not merely string prefix checks.

---

# 75. Server-Side URL Inputs

If submitted URLs will later be fetched by the server, apply SSRF protections in addition to normal form validation.

---

# 76. Filename Validation

Uploaded filenames are metadata.

Never trust them as filesystem paths.

---

# 77. Regex Validation

Regex is appropriate for constrained textual patterns.

Avoid:

- overly permissive patterns;
- catastrophic patterns;
- regex attempting to solve complex semantic parsing better handled by a parser.

---

# 78. Cross-Field Validation

Use cross-field validation when one field depends on another.

Examples:

```text
password confirmation
start/end date
country/postal code
minimum/maximum range
```

---

# 79. Conditional Validation

If one field makes another required, communicate the relationship clearly.

Example:

```text
Invoice type:
Company

→ Company registration number becomes required.
```

---

# 80. Hidden Conditional Fields

When a conditional field is hidden, determine intentionally whether its previous value should:

```text
remain
clear
be ignored
```

Do not accidentally submit stale hidden values.

---

# 81. Client Validation Timing

Validate at times that help rather than interrupt.

Typical strategy:

```text
During initial typing
→ avoid aggressive error

Blur
→ validate completed field

Submit
→ validate all

After error
→ revalidate as corrected
```

---

# 82. Do Not Validate Too Early

Avoid showing:

```text
Invalid email
```

after the user has typed:

```text
a
```

into an empty email field.

Premature errors create noise.

---

# 83. Submit Validation

All relevant client validation MUST run before sending when possible.

Server validation remains mandatory afterward.

---

# 84. Revalidation After Error

Once a field is invalid, feedback SHOULD update as the user corrects it.

Do not force another full submission to discover whether a simple field is now valid.

---

# 85. Expensive Validation

Do not perform expensive remote validation on every keystroke.

Use:

```text
blur
debounce
explicit check
```

as appropriate.

---

# 86. Async Validation

Examples:

```text
username availability
domain ownership
coupon validity
```

require asynchronous validation.

---

# 87. Async Validation Is Advisory

Availability checks performed before submit can become stale.

Final server-side mutation must still enforce authoritative constraints.

---

# 88. Async Validation Race Conditions

Prevent:

```text
check "alice"
↓
check "alice2"
↓
alice2 returns valid
↓
alice returns invalid late
↓
UI incorrectly shows invalid
```

Only the relevant/latest validation result should win.

---

# 89. Async Validation State

Represent:

```text
idle
checking
valid
invalid
error
```

where appropriate.

Do not display "available" while request remains pending.

---

# 90. Error Message Principle

An error should answer:

```text
What is wrong?
How can I fix it?
```

---

# 91. Good Error Messages

Prefer:

```text
Enter an email address in the format name@example.com.
```

over:

```text
Invalid input.
```

---

# 92. Do Not Blame Users

Avoid:

```text
You entered the wrong value.
```

Prefer:

```text
Enter a value between 1 and 100.
```

---

# 93. Error Specificity

Messages should be specific enough to recover without leaking sensitive system information.

---

# 94. Security-Sensitive Errors

Authentication/recovery flows MAY intentionally avoid revealing whether an account exists.

Security requirements can override maximum specificity.

---

# 95. Field-Level Errors

Place field-specific errors close to the corresponding control.

Associate them programmatically with the field.

---

# 96. Form-Level Errors

Use a form-level error when the problem concerns:

- the entire submission;
- external service failure;
- cross-field business rule;
- authorization;
- global conflict.

---

# 97. Error Summary

Long forms SHOULD consider an error summary after unsuccessful submission.

The summary should:

- state that submission failed;
- list relevant errors;
- link/focus to corresponding controls where practical.

---

# 98. Error Identification

Errors MUST be communicated in text.

Color or a red border alone is insufficient.

---

# 99. Error Icons

Icons MAY supplement error messages.

They MUST NOT be the only error communication.

---

# 100. Error Association

Use accessible relationships such as:

```text
aria-describedby
aria-errormessage
```

or equivalent supported component behavior.

---

# 101. Invalid State

Set appropriate programmatic invalid state when a field has an error.

Example:

```text
aria-invalid="true"
```

when applicable.

---

# 102. Error Focus

After failed submission of a long form, move focus intentionally to:

```text
error summary
```

or:

```text
first invalid field
```

depending on UX architecture.

Do not leave keyboard users unaware that submission failed.

---

# 103. Preserve User Input on Error

Server validation failure MUST NOT unnecessarily erase valid user input.

This is especially important for long forms.

---

# 104. Password Preservation

Security-sensitive values may intentionally not be preserved after submission.

If cleared, make recovery obvious.

---

# 105. Validation Messages and Layout

Reserve enough space or design adaptive layout so errors do not create confusing UI jumps where possible.

Do not sacrifice readability merely to eliminate all movement.

---

# 106. Validation Success Indicators

Do not show success ticks on every ordinary valid field by default.

Use them when validation is meaningful, such as:

```text
username available
domain verified
```

---

# 107. Required Message Consistency

Use one product-wide convention.

Example:

```text
This field is required.
```

Do not alternate randomly between:

```text
Required
Cannot be empty
Please fill this
Missing
```

---

# 108. Limit Messages

Tell users the actual limit.

Example:

```text
Use 100 characters or fewer.
```

---

# 109. Remaining Character Count

Use character counters where users need to manage strict content limits.

Do not show counters unnecessarily for short conventional fields.

---

# 110. Server Error Mapping

Server validation results SHOULD map to:

```text
field errors
form error
conflict
authorization failure
```

predictably.

---

# 111. Do Not Parse Server Error Strings

Use structured error codes/fields.

Bad:

```text
if message.includes("email")
```

---

# 112. Submission

Submit through a semantic form.

Use a submit button:

```html
<button type="submit">
```

rather than click-only behavior.

---

# 113. Enter Key

Single-purpose forms SHOULD preserve expected Enter-key submission semantics where appropriate.

Do not break keyboard submission accidentally.

---

# 114. Submit Button

The primary submit action should clearly describe the operation.

Prefer:

```text
Create project
Save changes
Send invitation
```

over generic:

```text
Submit
```

when a specific action is known.

---

# 115. Button Hierarchy

Typical:

```text
Primary → Save/Create/Continue
Secondary → Cancel
```

Do not provide multiple equally prominent competing primary actions without reason.

---

# 116. Submit While Invalid

The default form UX SHOULD generally allow users to attempt submission and receive clear validation, rather than hiding all explanation behind a permanently disabled button.

A disabled button MAY be appropriate where the missing prerequisite is obvious and communicated.

---

# 117. Disabled Submit Anti-Pattern

Avoid:

```text
Save disabled
```

with no explanation of what remains incomplete.

---

# 118. Pending Submission

While submitting:

- prevent accidental duplicate submission where necessary;
- indicate progress;
- preserve content;
- maintain accessible status.

---

# 119. Duplicate Submission

High-impact submissions MUST be protected server-side against duplicate execution where necessary.

Client button disabling alone is insufficient.

---

# 120. Submit Label During Pending

It MAY change to:

```text
Saving…
Creating…
Sending…
```

if this improves clarity.

Do not cause the button width to jump significantly when avoidable.

---

# 121. Pending Button Accessibility

Do not remove the button from the accessibility tree while operation remains pending if users need the status.

---

# 122. Submission Result

On success, choose intentionally:

```text
stay on form
reset
redirect
show resulting resource
close dialog
```

according to workflow.

---

# 123. Success Feedback

Success should be visible enough for the context.

For persistent saved state, updated UI often provides stronger evidence than a toast alone.

---

# 124. Toast Usage

Toasts MAY confirm:

```text
Settings saved
Invitation sent
```

but should not be the only evidence for important state changes.

---

# 125. Failed Submission

After failure:

```text
preserve draft
show recoverable error
allow retry
```

unless security semantics require otherwise.

---

# 126. Network Failure

Do not report a network failure as:

```text
Invalid form.
```

Distinguish transport failure from validation failure.

---

# 127. Retry

Allow retry when failure is transient.

Do not require users to re-enter valid data after ordinary network/server failure.

---

# 128. Dirty State

A form is dirty when the current user-editable draft differs meaningfully from its baseline.

---

# 129. Dirty Comparison

Dirty state SHOULD follow form semantics.

Examples:

```text
trimmed equivalent values
normalized phone values
reordered unrelated metadata
```

may require deliberate comparison rules.

---

# 130. Save Button and Dirty State

For editable settings forms:

```text
not dirty
→ Save may be disabled

dirty
→ Save enabled
```

provided required-state semantics remain clear.

---

# 131. Unsaved Change Warning

Warn users before discarding substantial unsaved work.

Appropriate for:

```text
long forms
complex settings
editors
multi-step workflows
```

---

# 132. Do Not Warn for Trivial Forms

Avoid confirmation fatigue.

A two-field search form usually does not need a leave-page warning.

---

# 133. Navigation Guard

Unsaved-change prompts should trigger when navigation would genuinely lose meaningful input.

---

# 134. Successful Save Resets Dirty Baseline

After canonical save succeeds:

```text
current canonical result
→ new clean baseline
```

Do not leave the form permanently dirty.

---

# 135. Cancel

Cancel SHOULD either:

```text
restore baseline
close transient form
navigate away
```

according to context.

If cancellation loses substantial changes, confirmation MAY be required.

---

# 136. Reset

Avoid ambiguous `Reset` buttons.

Users may not know whether reset means:

```text
defaults
last saved values
blank
```

Use explicit wording when necessary.

---

# 137. Autosave

Autosave is appropriate when frequent explicit Save actions would interrupt the workflow.

Examples:

```text
documents
notes
profile/settings with safe isolated changes
```

---

# 138. Autosave Is Not Universal

Do not use autosave for:

```text
high-risk destructive settings
payment actions
permission escalation
legal acceptance
```

without deliberate design.

---

# 139. Autosave State Model

A robust autosave state includes:

```text
Clean
Dirty
Saving
Saved
Error
Conflict
Offline
```

as applicable.

---

# 140. Autosave Feedback

Users should be able to determine whether changes are durable.

Examples:

```text
Saving…
Saved
Couldn't save
```

---

# 141. Autosave Debounce

Debounce rapid edits.

Do not mutate server state on every keystroke unless that behavior is explicitly designed.

---

# 142. Autosave Scope

Save the smallest coherent unit.

Do not submit an entire 50-field form because one toggle changed if independent fields are safely separable.

---

# 143. Autosave Validation

Invalid drafts SHOULD NOT automatically overwrite valid server state unless the product intentionally permits storing incomplete drafts.

---

# 144. Draft vs Published State

For editing workflows, distinguish:

```text
draft
```

from:

```text
published/canonical
```

where users must be allowed incomplete intermediate work.

---

# 145. Autosave Error

If autosave fails:

- preserve local draft;
- notify appropriately;
- provide retry;
- avoid falsely displaying "Saved."

---

# 146. Autosave Conflict

If server state changed elsewhere, do not blindly overwrite it.

Use:

```text
versioning
conflict warning
merge
refresh
```

according to domain.

---

# 147. Offline Autosave

If autosave supports offline drafts, define:

```text
persistence
retry
ordering
conflict
expiry
```

explicitly.

---

# 148. Multi-Step Forms

Use multi-step forms when:

- the workflow is naturally sequential;
- cognitive load is high;
- later questions depend on earlier answers;
- sections are meaningfully distinct.

Do not split simple forms merely to increase page count.

---

# 149. Multi-Step Form Anatomy

Typical structure:

```text
Title
Progress indicator
Step heading
Step fields
Back
Continue
```

Final step:

```text
Review where appropriate
Submit
```

---

# 150. Progress Indicator

Indicate current progress for substantial workflows.

Examples:

```text
Step 2 of 4
```

or descriptive step navigation.

---

# 151. Step Names

Prefer:

```text
Account
Company
Billing
Review
```

over:

```text
Step 1
Step 2
Step 3
```

alone.

---

# 152. Multi-Step URL

For significant flows, current step MAY belong in the route/URL when:

- refresh should preserve it;
- back/forward matters;
- deep linking is safe.

---

# 153. Back Button

Back SHOULD preserve previously entered values.

Never unexpectedly reset completed prior steps.

---

# 154. Browser Back

Browser Back behavior should remain predictable.

Do not trap users in wizard flows unnecessarily.

---

# 155. Step Validation

Validate fields required to leave the current step.

Do not force validation of unseen future steps.

---

# 156. Cross-Step Validation

Validation spanning multiple steps MAY occur:

- when dependent values become available;
- during review;
- on final submission.

---

# 157. Partial Persistence

For long multi-step workflows, consider server-side draft persistence.

This is especially useful when:

- completion may take a long time;
- workflow crosses devices;
- losing progress is costly.

---

# 158. Resume Later

If supported, clearly communicate:

```text
what is saved
how long
how to resume
```

---

# 159. Review Step

Use a review step when users benefit from verifying consequential information before commitment.

Examples:

```text
payment
legal submission
large configuration
account provisioning
```

---

# 160. Edit From Review

Review screens SHOULD allow users to return directly to the relevant step where practical.

---

# 161. Multi-Step Final Validation

Final submission MUST validate the complete authoritative payload on the server regardless of prior step validation.

---

# 162. Server State May Change During Wizard

Long workflows must handle stale server context.

Example:

```text
plan available on step 1
becomes unavailable before final submit
```

The final operation must revalidate.

---

# 163. File Uploads

File uploads are untrusted input.

Validate:

```text
authorization
count
size
actual type
extension policy
content where necessary
storage location
```

---

# 164. Upload Selection UI

The file input should communicate:

```text
accepted types
maximum size
maximum count
```

before users choose files.

---

# 165. Drag and Drop

Drag-and-drop upload MUST have an accessible keyboard/file-picker equivalent.

Do not make drag-and-drop the only mechanism.

---

# 166. File Type Validation

Do not trust:

```text
filename extension
client MIME type
```

alone.

Inspect actual file characteristics where risk requires it.

---

# 167. File Size

Enforce size limits both:

```text
client-side for UX
server-side for authority
```

---

# 168. Upload Count

Bound the number of files accepted in one operation.

---

# 169. Upload Progress

For significant uploads, show progress.

Distinguish:

```text
uploading
processing
complete
failed
```

---

# 170. Upload vs Processing

A file reaching storage does not necessarily mean processing has completed.

Example:

```text
Uploaded
↓
virus/security scan
↓
image processing
↓
ready
```

Represent these states separately.

---

# 171. Direct Uploads

Large files MAY use restricted signed direct-to-storage uploads.

Flow:

```text
authorize
↓
issue signed upload
↓
upload
↓
verify
↓
associate with domain resource
```

---

# 172. Signed Upload Scope

Signed upload authorization SHOULD be:

```text
short-lived
size-limited where supported
resource-scoped
content-policy constrained
```

---

# 173. File Names

Do not use untrusted filenames as internal storage paths.

Generate safe storage identifiers.

Keep original filename only as metadata when needed.

---

# 174. Dangerous Files

Files capable of active content require additional handling.

Examples:

```text
HTML
SVG
Office macros
archives
executables
```

Do not serve dangerous uploads blindly from a trusted application origin.

---

# 175. File Scanning

Security-sensitive applications SHOULD perform malware/content scanning where threat model warrants it.

---

# 176. Image Processing

Treat image parsers/processors as security-sensitive.

Apply:

```text
size limits
pixel/dimension limits
processing isolation
supported formats
```

where appropriate.

---

# 177. Archive Uploads

Compressed archives require:

```text
expanded size limits
file-count limits
path traversal protection
```

when extraction is supported.

---

# 178. Upload Failure

Failed uploads should provide recoverable per-file status.

Do not force successful files to re-upload unnecessarily when partial success is supported.

---

# 179. File Removal

Before final submit, users SHOULD be able to remove accidentally selected files where applicable.

---

# 180. File Accessibility

Uploaded-file lists should expose:

```text
filename
status
remove/retry controls
```

accessibly.

---

# 181. Destructive Forms

Destructive actions require elevated clarity.

Examples:

```text
Delete workspace
Revoke access
Cancel subscription
Remove member
Reset production data
```

---

# 182. Destructive Action Principle

The amount of friction should match:

```text
severity
reversibility
scope
likelihood of accidental activation
```

Do not add maximum friction to every delete.

---

# 183. Low-Risk Destructive Actions

For reversible low-risk actions:

```text
Delete item
→ action
→ Undo
```

may provide better UX than a confirmation dialog.

---

# 184. High-Risk Confirmation

Use explicit confirmation for:

- irreversible deletion;
- large blast radius;
- security changes;
- expensive actions;
- organizational/account deletion.

---

# 185. Confirmation Dialog Content

State:

```text
What will happen
What will be deleted/changed
Whether recovery is possible
```

Do not use generic:

```text
Are you sure?
```

alone.

---

# 186. Confirmation Button

Use explicit action text.

Preferred:

```text
Delete workspace
Revoke API key
Cancel subscription
```

Avoid:

```text
Yes
Confirm
OK
```

for consequential actions.

---

# 187. Destructive Color

Destructive visual treatment should support semantics.

Color alone MUST NOT communicate danger.

---

# 188. Typed Confirmation

Require typed confirmation only for unusually consequential actions.

Examples:

```text
delete organization
destroy production environment
```

Do not require typing `DELETE` for every minor item.

---

# 189. Resource-Name Confirmation

For very high-risk deletion, requiring the user to type the resource name may reduce wrong-target deletion.

Use sparingly.

---

# 190. Reauthentication

Sensitive actions MAY require recent authentication or step-up authentication.

Examples:

```text
change password
disable MFA
export highly sensitive data
transfer ownership
```

Follow Security Gold Standard.

---

# 191. Destructive Authorization

Confirmation does not equal authorization.

The server MUST still authorize the destructive operation.

---

# 192. Delete Race Conditions

Revalidate:

```text
resource exists
resource still belongs to tenant
actor still has permission
```

at the time of deletion.

---

# 193. Undo

Use Undo when reversal is safe and easy.

Undo MAY be implemented through:

```text
soft delete
delayed commit
compensating operation
```

depending on architecture.

---

# 194. Destructive Side Effects

If deletion affects:

```text
members
billing
files
integrations
```

communicate material consequences before execution.

---

# 195. Form Accessibility Standard

Forms MUST satisfy applicable WCAG 2.2 AA requirements.

Accessibility applies to:

```text
labels
instructions
errors
keyboard operation
focus
status changes
contrast
touch targets
timing
```

---

# 196. Visible Labels

Controls SHOULD have visible labels unless the control's purpose is inherently clear and an accessible name is still provided.

---

# 197. Accessible Name Consistency

The accessible name should correspond closely to the visible label.

Avoid:

```text
Visible:
Email

Screen reader:
Customer electronic communication identifier input
```

without reason.

---

# 198. Descriptions

Help/error text should be programmatically associated with the relevant field.

---

# 199. Keyboard Operation

Every form control MUST be usable with keyboard where appropriate.

Do not require:

```text
mouse
drag
hover
```

for essential actions.

---

# 200. Focus Indicator

Focused controls MUST have a visible focus indicator.

Do not remove it for cosmetic reasons.

---

# 201. Focus Order

Keyboard focus order MUST follow meaningful reading and workflow order.

---

# 202. Modal Forms

When a form appears in a dialog:

- focus enters the dialog;
- focus remains appropriately contained;
- dialog has accessible name;
- focus returns logically after close.

---

# 203. Validation Announcement

Dynamic validation messages SHOULD be perceivable by assistive technologies.

Avoid excessive live announcements on every keystroke.

---

# 204. Submission Announcement

Users relying on assistive technology should be informed when:

```text
submission succeeds
submission fails
saving begins/ends
```

where status is not otherwise obvious.

---

# 205. Do Not Use Color Alone

Required, invalid, successful, or disabled states need non-color cues.

---

# 206. Contrast

Labels, instructions, errors, controls, placeholders, and focus indicators must meet applicable contrast requirements.

---

# 207. Touch Targets

Form controls and interactive actions should provide sufficiently usable pointer/touch targets.

Do not create tiny checkbox, remove, or calendar controls.

---

# 208. Zoom

Forms MUST remain usable at browser zoom and text enlargement.

Do not depend on fixed pixel heights that clip error text.

---

# 209. Responsive Forms

Mobile forms SHOULD:

```text
remain single-column where practical
use full usable width
avoid horizontal scrolling
keep primary actions reachable
```

---

# 210. Mobile Keyboard

Use semantic input types and input modes to display useful mobile keyboards.

---

# 211. Mobile Sticky Actions

Sticky form actions MAY be useful for long mobile forms.

They MUST NOT obscure:

```text
fields
errors
keyboard
content
```

---

# 212. Safe Areas

Mobile fixed/sticky controls should account for device safe areas.

---

# 213. Keyboard and Sticky Footer

Ensure mobile software keyboard does not permanently cover:

```text
active field
validation message
submit controls
```

---

# 214. Responsive Paired Fields

Paired desktop fields should stack on small screens.

Do not shrink them until labels/content become unreadable.

---

# 215. Error Placement on Mobile

Error text should remain adjacent to the relevant field rather than moved to a distant desktop-oriented column.

---

# 216. Localization

Forms must accommodate:

- longer labels;
- longer validation messages;
- different name/address structures;
- RTL where supported;
- locale-specific formats.

---

# 217. Name Fields

Avoid assuming every person has:

```text
first name
middle name
last name
```

unless business requirements genuinely require those concepts.

---

# 218. Address Forms

Address structure varies internationally.

Do not hard-code one country's address format into global products.

---

# 219. Date Localization

Display dates appropriately to locale while maintaining unambiguous canonical values internally.

---

# 220. Decimal Separators

Numeric/currency entry may differ by locale.

Parsing and formatting rules should be intentional.

---

# 221. Form Performance

Avoid making form typing dependent on expensive whole-page rerenders.

Optimize only when measured or obvious interaction degradation exists.

---

# 222. Large Forms

For very large forms:

- partition rendering where useful;
- avoid unnecessary expensive validations;
- avoid giant global form subscriptions;
- consider sections or progressive disclosure.

---

# 223. Controlled Inputs

Controlled inputs are useful when application logic needs current values.

They are not mandatory for every field if the form library/runtime provides an appropriate alternative.

---

# 224. Uncontrolled Inputs

Uncontrolled/native form state can improve simplicity and performance where direct React ownership is unnecessary.

Use according to the established form architecture.

---

# 225. Form Library

Use the organization's canonical form library when complexity warrants it.

Do not introduce a different form library per feature.

---

# 226. When a Form Library Is Useful

A library provides value for:

```text
nested values
dynamic arrays
validation integration
dirty/touched state
complex submission
```

---

# 227. Simple Forms

A form containing:

```text
email
submit
```

may not require a large form framework.

Avoid dependency-driven architecture.

---

# 228. Schema Library

Use one canonical runtime schema system where practical.

This improves:

- API consistency;
- type inference;
- client/server semantics;
- error mapping.

---

# 229. Schema as Runtime Contract

Static TypeScript types do not replace runtime schemas at untrusted boundaries.

---

# 230. Dynamic Fields

When users add/remove repeated fields:

```text
team members
addresses
conditions
```

use stable item identities.

Do not rely exclusively on array index identity.

---

# 231. Dynamic Field Validation

Errors should remain associated with the correct logical item after:

```text
insert
delete
reorder
```

---

# 232. Maximum Dynamic Fields

Bound user-generated field arrays to prevent:

- poor UX;
- resource exhaustion;
- oversized submissions.

---

# 233. Conditional Sections

Progressively reveal fields when they become relevant.

Do not overwhelm users with controls that do not apply.

---

# 234. Progressive Disclosure

Hidden advanced options SHOULD remain discoverable.

Do not hide required information behind unexpected disclosure controls.

---

# 235. Dependent Selects

For:

```text
country
→ state
→ city
```

loading behavior should be explicit.

Changing a parent value must reconcile invalid child selections.

---

# 236. Defaults

Defaults SHOULD be:

- safe;
- common;
- reversible.

Do not default users into consequential choices without clear intent.

---

# 237. Preselection

Do not preselect consent, paid upgrades, destructive behavior, or privacy-sensitive choices inappropriately.

---

# 238. Default Values vs Placeholder

Defaults are submitted values.

Placeholders are hints.

Do not confuse them.

---

# 239. Form Prefill

Prefill known information where:

- correct;
- secure;
- useful.

Do not force users to repeatedly enter information the system already reliably knows.

---

# 240. Prefilled Sensitive Data

Do not reveal sensitive stored information merely to make forms convenient.

Examples:

```text
full card number
existing password
secret API key
```

---

# 241. Immutable Information

If a field cannot be changed:

```text
show as normal text
```

may be preferable to a disabled form input.

Use controls only where interaction semantics require them.

---

# 242. Inline Editing

Inline editing is appropriate for simple isolated changes.

Do not turn complex business workflows into dozens of hidden inline forms.

---

# 243. Inline Save

Define whether an inline edit:

```text
autosaves
requires Save
commits on Enter
```

and make the behavior predictable.

---

# 244. Escape and Cancel

Inline editing SHOULD generally provide an understandable cancellation path.

Keyboard Escape MAY cancel when that convention fits.

---

# 245. Enter Behavior

For single-line inline edits, Enter MAY submit.

For textarea:

```text
Enter
→ newline
```

should usually remain intact.

Use explicit shortcuts for submission if needed.

---

# 246. Search Forms

Search input is usually URL/query state rather than durable form state.

Pressing Enter and search buttons should preserve standard form semantics.

---

# 247. Filter Forms

Desktop filters MAY update immediately.

Mobile filter panels may benefit from:

```text
draft selections
↓
Apply
```

to avoid repeated navigation/request churn.

---

# 248. Filter Reset

Use:

```text
Clear filters
```

when the action means removing filter constraints.

Avoid ambiguous:

```text
Reset
```

---

# 249. Settings Forms

Group settings by semantic ownership.

Do not create one Save button controlling dozens of unrelated configuration sections unless atomic submission is intentional.

---

# 250. Settings Save Scope

For independent settings, section-level save or autosave may be clearer.

For tightly related configuration, one transactional Save may be correct.

---

# 251. Permission Forms

Permission assignment forms are security-sensitive.

They MUST:

- show actual scope;
- identify affected user/resource;
- server-authorize changes;
- audit important changes.

---

# 252. Billing Forms

Billing/payment forms require:

- explicit totals;
- currency;
- final action;
- loading state;
- duplicate protection;
- provider security requirements.

---

# 253. Consent Forms

Consent must be:

```text
specific
understandable
deliberate
```

Do not bundle unrelated consent into obscure language or misleading defaults.

---

# 254. Legal Acceptance

When recording legal agreement, preserve required:

```text
agreement version
timestamp
actor
```

according to product/legal requirements.

---

# 255. Form Security

Forms MUST follow the Security Gold Standard.

Potential controls include:

```text
CSRF protection
authorization
rate limits
anti-automation
upload protection
input validation
```

depending on the threat model.

---

# 256. CSRF

Cookie-authenticated mutation forms require appropriate CSRF defense.

Do not assume POST itself provides protection.

---

# 257. XSS

Input validation does not replace correct output encoding/sanitization.

A value valid for storage may still require safe rendering.

---

# 258. SQL Injection

Validation does not replace parameterized database queries.

Use both correct validation and safe query construction.

---

# 259. Rate Limits

Forms vulnerable to abuse SHOULD have appropriate server controls.

Examples:

```text
login
password reset
contact
invitation
coupon
OTP
signup
```

---

# 260. CAPTCHA / Challenge

Use anti-bot challenges only when abuse requires them.

They add accessibility and conversion cost.

Prefer risk-based or less intrusive anti-abuse mechanisms where sufficient.

---

# 261. Honeypots

Honeypot fields MAY supplement spam prevention.

They MUST NOT be the only protection against meaningful abuse.

---

# 262. Double Submit Protection

Protect expensive or irreversible operations with server-side idempotency/concurrency controls.

Client pending state is not enough.

---

# 263. Multi-Tab Forms

Two open editing tabs can produce lost updates.

Use versioning/conflict detection where this matters.

---

# 264. Optimistic Concurrency

A form MAY submit:

```text
resource version
```

and reject changes if server state has moved since the form was loaded.

---

# 265. Conflict UX

When a conflict occurs:

```text
explain
preserve draft
show latest state where useful
provide recovery
```

Do not silently discard the user's edits.

---

# 266. Form State Reset on Resource Change

When editing resource A then navigating to resource B, ensure form state belongs to B.

Do not leak draft values across resource identity.

---

# 267. Skeletons

Skeletons MAY represent form loading before initial values exist.

Do not allow users to interact with a placeholder form that has not loaded authoritative state.

---

# 268. Partial Loading

If only one auxiliary field is loading, do not block the entire form unless necessary.

---

# 269. Form Loading vs Submission

Distinguish:

```text
initial form loading
```

from:

```text
form submitting
```

They have different UX.

---

# 270. Server-Rendered Forms

Where architecture supports it, initial values SHOULD preferably be rendered from authoritative server state rather than loaded through a post-render client effect.

---

# 271. Hydration

Initial client form state MUST align with server-rendered values.

Avoid hydration mismatches caused by client-only defaults.

---

# 272. Time-Based Defaults

Do not compute a changing default independently on server and client.

Pass one authoritative initial value where needed.

---

# 273. Validation Consistency

Client and server should agree on core validation semantics.

Do not create situations where:

```text
client:
valid

server:
invalid
```

for predictable structural rules.

Server may always enforce additional business/security constraints.

---

# 274. Validation Error Taxonomy

Standardize categories such as:

```text
required
invalid_format
too_short
too_long
out_of_range
conflict
not_allowed
```

where machine-readable mapping creates value.

---

# 275. Error Copy Ownership

Reusable validation primitives MAY own generic messages.

Domain-specific business validation should use domain terminology.

---

# 276. Localization of Errors

Validation error codes should be separate from localized user-facing text where localization is required.

---

# 277. Do Not Return Raw Schema Errors

Internal validation library output may include implementation details.

Map it into the canonical form/API error model.

---

# 278. Server Validation Response

A useful server validation structure may conceptually contain:

```text
fieldErrors
formError
errorCode
```

according to the API standard.

---

# 279. Form Submission Contract

Submission should send the smallest coherent domain input.

Avoid sending every loaded resource property back to the server unnecessarily.

---

# 280. Explicit Mapping

Map fields explicitly to mutation payload.

Do not blindly submit an entire state object containing:

```text
UI state
hidden metadata
server-only fields
permission fields
```

---

# 281. Create vs Update Schema

Separate create/update schemas where semantics differ.

For example:

```text
Create:
name required

Update:
name optional
```

---

# 282. Patch Semantics

If an update uses partial patch semantics, distinguish:

```text
missing
→ unchanged

null
→ explicitly cleared
```

where applicable.

---

# 283. Form Arrays

When submitting arrays, define:

```text
maximum count
item validation
ordering semantics
duplicate behavior
```

---

# 284. Form Object Depth

Bound deeply nested arbitrary structures when submitted by untrusted clients.

---

# 285. Form Metadata

Do not trust client metadata such as:

```text
createdBy
tenantId
role
price
```

when the server can derive authoritative values.

---

# 286. Server-Derived Values

Prefer the server to derive:

```text
actor ID
tenant
permissions
timestamps
calculated totals
```

from trusted context.

---

# 287. Server Mutation Transaction

When a form represents one atomic business operation, mutation persistence SHOULD use an appropriate transaction.

---

# 288. Partial Form Success

If a submission can partially succeed, make that contract explicit.

Do not display:

```text
Saved
```

if only half the intended operation succeeded.

---

# 289. Retry Semantics

Retryable submissions require clear idempotency behavior.

Especially:

```text
payments
orders
invitations
provisioning
```

---

# 290. Cancelled Request

A client disconnect or cancellation does not necessarily mean the server mutation was cancelled.

Do not blindly resubmit non-idempotent operations.

---

# 291. Analytics

Form analytics MAY track:

```text
start
completion
validation category
abandonment
```

when product need justifies it.

Do not collect submitted sensitive values unnecessarily.

---

# 292. Validation Analytics

Track categories, not raw sensitive input.

Example:

```text
errorCode = "invalid_format"
```

rather than logging the invalid password/identifier.

---

# 293. Privacy

Forms are a major data-collection boundary.

Every collected field SHOULD have a purpose.

Do not use forms to accumulate unnecessary PII.

---

# 294. Sensitive Form Logging

Never log:

```text
password
OTP
full payment credentials
secret token
```

from submitted forms.

Other sensitive fields require deliberate redaction policy.

---

# 295. Browser History

Sensitive form values SHOULD NOT appear in URLs or browser history.

---

# 296. Password Reset Forms

Password reset flow SHOULD:

- avoid account enumeration;
- validate reset token server-side;
- enforce expiry;
- invalidate appropriately after use.

Follow Authentication Gold Standard.

---

# 297. Email Change Forms

Changing identity-critical data MAY require:

```text
reauthentication
verification
notification
```

according to security risk.

---

# 298. Permission Escalation Forms

High-impact privilege changes MAY require:

- reauthentication;
- confirmation;
- audit log.

---

# 299. Form Component Architecture

The design system SHOULD provide canonical form primitives.

Examples:

```text
Form
FormField
FormItem
FormLabel
FormControl
FormDescription
FormMessage
```

or the equivalent shadcn-based architecture.

---

# 300. Canonical Input Components

Product features SHOULD consume canonical:

```text
Input
Textarea
Select
Checkbox
RadioGroup
Switch
Combobox
DatePicker
```

rather than feature-specific clones.

---

# 301. Component Responsibility

Input components own:

```text
visual presentation
interaction conventions
accessible baseline
```

They SHOULD NOT own arbitrary business validation.

---

# 302. Form Field Wrapper

A canonical field wrapper SHOULD standardize:

```text
label
description
control relationship
required indication
error state
```

---

# 303. Error Styling

All form controls should use one canonical error treatment.

Avoid feature-specific red borders/messages.

---

# 304. Form Width

Forms SHOULD use a reasonable maximum width for readability.

Do not stretch short text inputs across huge desktop canvases merely because space exists.

---

# 305. Field Width Indicates Expected Input

Where appropriate:

```text
postal code
```

need not visually occupy the same width as:

```text
street address
```

but responsive simplicity takes precedence over excessive micro-layout.

---

# 306. Vertical Rhythm

Use consistent:

```text
label → control
control → description/error
field → field
section → section
```

spacing.

---

# 307. Action Placement

Primary form actions SHOULD appear consistently.

Common application pattern:

```text
Cancel     Save
```

with primary action at the logical end for the interface direction.

---

# 308. Long Forms

Long forms MAY repeat or provide sticky action access where usability requires it.

Avoid forcing users to scroll excessively merely to save.

---

# 309. Sticky Form Actions

Sticky actions should not hide:

- final fields;
- error messages;
- mobile keyboard content.

---

# 310. Modal Form Actions

Dialog forms should generally keep actions in the canonical dialog footer.

Avoid placing Save in an unexpected corner.

---

# 311. Enter and Modal Forms

Pressing Enter should not accidentally trigger destructive primary actions from unrelated controls.

Test keyboard behavior carefully.

---

# 312. Escape in Modal Forms

Escape may close the dialog according to dialog conventions.

If the form contains meaningful unsaved changes, consider confirmation before discarding.

---

# 313. Destructive Form Layout

Do not place destructive actions immediately adjacent to primary safe actions without sufficient distinction.

---

# 314. Review Before High-Impact Commit

For particularly consequential forms:

```text
edit
↓
review
↓
commit
```

can be preferable to immediate submission.

---

# 315. Preview

Content-oriented forms MAY offer preview where the rendered result is difficult to infer from fields.

Examples:

```text
email campaign
article
notification template
```

---

# 316. Preview Is Not Validation

A preview does not replace validation or authorization.

---

# 317. Form Documentation

Reusable or complex forms SHOULD document:

```text
purpose
field semantics
validation
submission behavior
accessibility
error behavior
```

where maintainers need it.

---

# 318. Testing Strategy

Forms SHOULD be tested at several layers:

```text
Schema
→ validation rules

Component
→ interaction/accessibility

Integration
→ real mutation/server validation

E2E
→ critical user workflow
```

---

# 319. Schema Tests

Test important:

```text
valid values
boundaries
invalid values
cross-field rules
normalization
```

---

# 320. Form Interaction Tests

Test behavior from the user's perspective:

```text
fill
select
submit
see error
correct
resubmit
```

---

# 321. Server Validation Tests

Attempt requests that bypass client validation.

Server tests MUST prove invalid direct requests are rejected.

---

# 322. Authorization Tests

Test:

```text
unauthenticated
wrong user
wrong tenant
wrong role
```

for protected submissions.

---

# 323. Accessibility Tests

Automated checks should be complemented by keyboard and screen-reader-oriented verification for important form patterns.

---

# 324. Keyboard Tests

Verify:

```text
Tab
Shift+Tab
Space
Enter
Escape
Arrow keys
```

where controls use those interactions.

---

# 325. Error Tests

Verify:

```text
error visible in text
field associated
focus behavior correct
input retained
```

---

# 326. Upload Tests

Test:

```text
valid file
wrong type
oversize
multiple files
upload failure
processing failure
```

---

# 327. Autosave Tests

Test:

```text
success
network failure
rapid edits
stale response
conflict
reload
```

where applicable.

---

# 328. Multi-Step Tests

Test:

```text
forward
back
refresh
validation
resume
final submission
```

according to supported behavior.

---

# 329. Destructive Tests

Verify:

```text
confirmation
authorization
correct resource
double submission
failure recovery
audit
```

where appropriate.

---

# 330. Form Performance Tests

For unusually large/dynamic forms, measure:

```text
typing responsiveness
render behavior
validation latency
submission payload
```

---

# 331. Form Review Checklist

Before approval:

```text
□ Form purpose clear
□ Only necessary fields requested
□ Logical field order
□ Related fields grouped
□ Every control labeled
□ Required fields indicated
□ Help text provided where needed
□ Correct native control used
□ Autocomplete/inputmode considered
□ Schema defined
□ Client validation useful
□ Server validation authoritative
□ Domain validation defined
□ Error messages actionable
□ Errors programmatically associated
□ Invalid fields identifiable without color
□ Submission pending state defined
□ Duplicate submission considered
□ Dirty state defined
□ Unsaved-change behavior defined
□ Success behavior defined
□ Failure recovery defined
□ Mobile behavior verified
□ Keyboard behavior verified
□ Accessibility verified
```

---

# 332. File Upload Checklist

```text
□ Authorization before upload
□ File count bounded
□ File size bounded
□ Allowed type defined
□ Actual type verification considered
□ Storage key server-controlled
□ Filename treated as metadata
□ Dangerous formats considered
□ Scanning considered
□ Processing state defined
□ Retry/removal supported
□ Download authorization defined
□ Retention defined
```

---

# 333. Autosave Checklist

```text
□ Autosave actually improves workflow
□ Dirty state defined
□ Debounce/batching defined
□ Validation strategy defined
□ Saving indicator defined
□ Error state defined
□ Local draft preserved on failure
□ Conflict strategy defined
□ Stale responses handled
□ Offline behavior defined if supported
```

---

# 334. Multi-Step Checklist

```text
□ Splitting form is justified
□ Step names meaningful
□ Progress visible
□ Back preserves values
□ Browser navigation considered
□ Step validation scoped appropriately
□ Final server validation complete
□ Draft persistence considered
□ Resume behavior defined
□ Review step used where appropriate
```

---

# 335. Destructive Form Checklist

```text
□ Resource clearly identified
□ Consequence explained
□ Reversibility understood
□ Friction proportional to risk
□ Button names explicit action
□ Server authorization enforced
□ Reauthentication considered
□ Duplicate execution protected
□ Audit event considered
□ Recovery/undo considered
```

---

# 336. Definition of Done — Form

A form is complete only when:

```text
✓ Semantic structure exists
✓ Labels and instructions are clear
✓ Input types are correct
✓ Client validation works
✓ Server validation works independently
✓ Authorization occurs server-side
✓ Domain rules are enforced
✓ Database integrity remains protected
✓ Field errors are actionable
✓ Form errors are recoverable
✓ Input survives recoverable failure
✓ Loading/submitting states are defined
✓ Dirty state is handled
✓ Success behavior is defined
✓ Responsive behavior works
✓ Keyboard behavior works
✓ Accessibility verified
✓ Sensitive fields are protected
✓ Tests cover critical failure paths
```

---

# 337. Form Anti-Patterns

Avoid:

```text
Placeholder as label
```

Avoid:

```text
Every field optional because validation is difficult
```

Avoid:

```text
Every field required because product asked for everything
```

Avoid:

```text
Only client-side validation
```

Avoid:

```text
TypeScript = runtime validation
```

Avoid:

```text
request.body → database update
```

Avoid:

```text
Disabled submit with no explanation
```

Avoid:

```text
Red border as only error signal
```

Avoid:

```text
"Invalid input"
```

when a useful explanation is possible.

Avoid:

```text
Validate aggressively after every keystroke
```

Avoid:

```text
Reset all input after server error
```

Avoid:

```text
Global loading flag for every form
```

Avoid:

```text
Form library + duplicate useState for every field
```

Avoid:

```text
Hidden field as permission/security control
```

Avoid:

```text
Client-provided tenantId trusted directly
```

Avoid:

```text
Browser storage for passwords/secrets
```

Avoid:

```text
Autosave with no saved/error indication
```

Avoid:

```text
Autosave silently overwriting conflicts
```

Avoid:

```text
Multi-step flow that loses previous values
```

Avoid:

```text
File extension as sole upload validation
```

Avoid:

```text
Original filename as server path
```

Avoid:

```text
Generic "Are you sure?"
```

for irreversible high-impact actions.

Avoid:

```text
Typed DELETE confirmation for every trivial action
```

Avoid:

```text
Custom div-based controls where native semantics suffice
```

---

# 338. AI Forms Rules

AI coding agents MUST inspect existing:

```text
form primitives
schema conventions
server mutation pattern
error model
design system
accessibility conventions
```

before generating a form.

---

# 339. AI Native-Control Rule

AI SHOULD use the semantic native control or canonical design-system wrapper before building custom interaction.

---

# 340. AI Label Rule

AI MUST provide an accessible label for every input.

Placeholder alone is insufficient.

---

# 341. AI Schema Rule

AI MUST identify the runtime schema for submitted data.

It MUST NOT assume TypeScript types validate client input.

---

# 342. AI Server Validation Rule

AI MUST implement or use existing server validation even when equivalent client validation exists.

---

# 343. AI Authorization Rule

AI-generated form handlers MUST determine:

```text
actor
tenant
resource
action
```

from trusted server context.

---

# 344. AI Mapping Rule

AI MUST explicitly map validated form fields into domain mutation input.

Do not spread arbitrary submitted objects into persistence models.

---

# 345. AI Error Rule

AI SHOULD use the canonical error structure and display errors close to affected controls.

---

# 346. AI Error Copy Rule

AI-generated errors should:

```text
identify the issue
suggest correction
avoid blame
```

---

# 347. AI Validation-Timing Rule

AI SHOULD avoid showing errors while users are still entering ordinary valid values.

Use submit/blur/revalidation behavior according to the established form standard.

---

# 348. AI State Rule

AI MUST NOT duplicate canonical form state into additional component/global state without a concrete requirement.

---

# 349. AI Dirty-State Rule

AI SHOULD consider whether navigating away loses meaningful work.

Do not automatically add leave warnings to trivial forms.

---

# 350. AI Autosave Rule

AI MUST NOT introduce autosave simply because it is technically easy.

It must define:

```text
save timing
feedback
validation
failure
conflict
```

---

# 351. AI Multi-Step Rule

AI SHOULD create multiple steps only when doing so reduces cognitive complexity or reflects workflow structure.

---

# 352. AI Upload Rule

AI-generated file uploads MUST define:

```text
authorization
size
count
type
storage naming
processing
```

and follow the Security Gold Standard.

---

# 353. AI Destructive Rule

AI MUST match confirmation friction to consequence.

It should not indiscriminately generate either:

```text
no confirmation
```

or:

```text
type DELETE
```

for every destructive action.

---

# 354. AI Accessibility Rule

AI-generated forms MUST preserve:

```text
semantic controls
labels
description/error associations
keyboard access
focus visibility
textual errors
```

---

# 355. AI Server-State Rule

After successful mutation, AI SHOULD reconcile the form with canonical server state and invalidate affected server-state representations.

---

# 356. AI Concurrency Rule

AI SHOULD consider lost updates for edit forms where multiple sessions may modify the same resource.

---

# 357. AI Security Rule

AI MUST NOT trust:

```text
hidden inputs
disabled fields
client calculations
client permission state
```

as authoritative.

---

# 358. AI Gold Rule

When uncertain:

```text
Native semantics
>
Canonical design-system primitive
>
Minimal form state
>
Client validation for UX
>
Server validation for authority
>
Domain validation
>
Database integrity
```

---

# 359. Golden Forms & Validation Rules

**1. Use semantic HTML forms.**

**2. Every control has an accessible label.**

**3. Placeholder is not a label.**

**4. Ask only for information actually needed.**

**5. Group fields according to user meaning.**

**6. Use the correct control for the data.**

**7. Prefer native semantics before custom controls.**

**8. Client validation improves UX; server validation establishes trust.**

**9. TypeScript does not validate runtime input.**

**10. Validate untrusted input at the server boundary.**

**11. Distinguish structural validation from business validation.**

**12. Database constraints remain part of integrity.**

**13. Prefer allowlist validation.**

**14. Bound sizes, lengths, counts, and ranges.**

**15. Validate at a useful time—not immediately and noisily.**

**16. Errors explain what is wrong and how to fix it.**

**17. Errors are communicated in text, not color alone.**

**18. Preserve valid user input after recoverable failure.**

**19. One form-state owner; avoid duplicated values.**

**20. Dirty state reflects meaningful unsaved change.**

**21. Warn about unsaved work only when losing it matters.**

**22. Autosave always communicates durability.**

**23. Autosave failures preserve the draft.**

**24. Multi-step forms validate progressively and fully on final submit.**

**25. Browser Back should remain predictable.**

**26. Files are hostile input until validated.**

**27. Never trust client MIME type or filename alone.**

**28. Destructive friction is proportional to consequence.**

**29. Confirmation does not replace authorization.**

**30. High-risk operations may require reauthentication.**

**31. Prevent duplicate consequential submissions server-side.**

**32. Form accessibility is a baseline requirement, not enhancement.**

**33. Keyboard users can complete every essential form operation.**

**34. Focus moves intentionally after validation failures.**

**35. Client-derived tenant, role, price, and permission values are not authority.**

**36. Server results remain canonical after mutation.**

**37. Form schemas evolve deliberately.**

**38. Persist drafts only when their survival provides real value.**

**39. Sensitive drafts are not stored casually in the browser.**

**40. Test failure and forbidden paths, not only successful submission.**

---

# 360. Canonical Forms & Validation Standard

The organizational standard is:

> **Forms use semantic HTML and canonical shadcn-based design-system controls, with explicit visible labels, accessible instructions, predictable keyboard interaction, and logically grouped fields. Form state owns unsaved user input and remains separate from authoritative server state. Client-side validation provides immediate usable feedback, while every server mutation independently validates all untrusted input, authenticates the caller, authorizes the specific resource and action, applies domain rules, and relies on appropriate database constraints for final integrity.**

> **Validation errors are specific, textual, programmatically associated with their controls, and designed to help users recover without losing valid work. Forms distinguish initial loading, editing, dirty, submitting, saved, validation failure, server failure, and conflict states. Autosave is used only when its workflow benefit justifies its synchronization complexity and always exposes saving, success, failure, and conflict behavior. Multi-step forms preserve progress, validate at appropriate boundaries, and perform full authoritative validation before final commitment.**

> **File uploads are treated as untrusted content with explicit authorization, count, size, type, storage, processing, and retention controls. Destructive actions receive friction proportional to their consequence, and confirmation never replaces server authorization. Forms comply with the accessibility standard, preserve native browser behavior where appropriate, and remain usable with keyboard, assistive technology, mobile input, zoom, and localization.**

A production-grade form should make it easy to answer:

```text
What information are we asking for?
Why do we need it?
Who owns the draft?
What is the authoritative schema?
What is validated on the client?
What is validated on the server?
What domain rules apply?
What database invariants apply?
When does validation appear?
How can the user recover from an error?
What happens to valid input after failure?
What counts as dirty?
What happens when the user leaves?
Does it autosave?
How are conflicts handled?
Can submission execute twice?
What happens if the network fails?
Is the operation destructive?
Is reauthentication required?
Can a keyboard-only user complete it?
Can a screen-reader user identify and correct errors?
```

If those answers are unclear, the form is not yet production-grade.

The standard deliberately requires server-side validation even when native HTML and client schemas are present: browser validation can be bypassed, and MDN explicitly notes that server validation remains necessary. OWASP likewise recommends validating all potentially untrusted input as early as practical. citeturn158907search0turn158907search3

For accessibility, WCAG 2.2 requires automatically detected input errors to identify the affected item and describe the error in text; W3C's forms guidance also emphasizes explicit labels/instructions, required/optional indications, and accessible format guidance. citeturn158907search2turn158907search7

In the master hierarchy, this fits naturally as:

**Architecture → Framework → Security → Auth/AuthZ → Data & Database → API → Routes → State Management → Design Tokens → Layouts → Facade → Components → Forms & Validation → Patterns → Accessibility → Reusability → Testing → Performance → Observability → Infrastructure → Documentation → Governance.**
