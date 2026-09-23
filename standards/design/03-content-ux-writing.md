---
id: "content-ux-writing"
title: "Content & UX Writing Guidelines — Gold Standard 2026"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "content", "ux", "writing"]
applies_to: ["general"]
related: ["accessibility", "internationalization", "analytics", "release-versioning", "search"]
legacy_number: 37
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 70200
provenance: baseline

---

Canonical placement: **Notifications → Internationalization → Content & UX Writing → Testing**. Internationalization defines how language is represented and localized; Content & UX Writing defines **what the product says and how it says it**.

# Content & UX Writing Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- UX writing;
- interface copy;
- terminology;
- product vocabulary;
- voice;
- tone;
- labels;
- headings;
- buttons;
- links;
- menus;
- tabs;
- tooltips;
- helper text;
- instructions;
- validation messages;
- errors;
- warnings;
- confirmations;
- destructive actions;
- empty states;
- success states;
- loading states;
- permission messages;
- authentication copy;
- onboarding;
- notifications;
- settings;
- status terminology;
- capitalization;
- punctuation;
- numbers;
- accessibility;
- localization readiness;
- content governance.

The objective is to make product content:

```text
Clear
Consistent
Concise
Actionable
Accurate
Accessible
Calm
Human
Localized
Trustworthy
```

The core principle is:

> **Interface text exists to help users understand the current state, make a decision, or complete an action. Every word should earn its place.**

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
Affected surface
User impact
Terminology impact
Localization impact
Owner
Review date
```

---

# 3. UX Writing Is Product Design

UX copy is part of the interaction model.

It is not merely:

```text
text added after design
```

Words influence:

```text
comprehension
decision quality
trust
task completion
error recovery
accessibility
conversion
support load
```

---

# 4. Content Is Interface

The product's interface includes:

```text
visual design
interaction
information architecture
content
```

Poor copy can make technically correct functionality unusable.

---

# 5. Write for User Intent

Before writing a string, answer:

```text
What is happening?
What does the user need to know?
What decision do they need to make?
What action can they take?
What happens next?
```

---

# 6. Content Priority

Prefer this order:

```text
What matters
↓
What happened
↓
What the user can do
↓
Optional explanation
```

Do not begin with implementation detail.

---

# 7. Plain Language

Use familiar, direct language.

Prefer:

```text
Use
```

over:

```text
Utilize
```

Prefer:

```text
You can't upload this file because it's larger than 20 MB.
```

over:

```text
The uploaded object exceeds the maximum allowable payload threshold.
```

---

# 8. User Vocabulary

Use words users recognize.

Internal implementation terminology SHOULD NOT leak into customer-facing UI unless users themselves use that terminology.

---

# 9. Avoid Jargon

Avoid unexplained:

```text
payload
recordset
HTTP 403
backend
cron
ACL
serialization
```

in ordinary product copy.

---

# 10. Domain Terminology

Domain-specific terminology MAY be used when:

```text
the audience understands it
the term has precise meaning
simplification would reduce accuracy
```

---

# 11. Consistency Over Variety

If two things mean the same thing, use the same term.

Do not rotate synonyms merely to make copy sound varied.

Bad:

```text
Workspace
Team space
Project area
Collaboration area
```

when all refer to one product concept.

---

# 12. One Concept, One Name

Each important product concept SHOULD have one canonical user-facing name.

---

# 13. Terminology Registry

Maintain a canonical glossary containing:

```text
Concept
Preferred term
Definition
Deprecated terms
Do-not-use synonyms
Capitalization
Plural form
Context notes
Translation notes
Owner
```

---

# 14. Glossary Is Authoritative

When UX copy, documentation, support, API descriptions, and marketing refer to the same product concept, they SHOULD use the same approved term unless audience needs differ deliberately.

---

# 15. Technical vs User Vocabulary

An internal class may be:

```text
OrganizationMembership
```

while users see:

```text
Workspace member
```

That is acceptable.

Do not force implementation naming into UX.

---

# 16. Terminology Ownership

Important terminology MUST have an accountable product/content owner.

---

# 17. New Term Review

Before introducing a new user-facing term ask:

```text
Does an existing term already mean this?
Will users understand it?
Will it conflict with another term?
Can it be translated clearly?
```

---

# 18. Avoid Near-Synonymous Concepts

Do not introduce:

```text
Archive
Deactivate
Disable
Close
Retire
```

for one lifecycle state unless each has genuinely distinct behavior.

---

# 19. Define State Terms

Lifecycle terms such as:

```text
Draft
Active
Paused
Archived
Deleted
Expired
```

MUST have defined behavior.

---

# 20. Avoid Ambiguous Statuses

Bad:

```text
Pending
```

when it could mean:

```text
waiting for payment
waiting for approval
processing
scheduled
```

Use the actual state.

---

# 21. Status Copy

Status labels SHOULD describe state, not process implementation.

Prefer:

```text
Processing
```

over:

```text
Worker queued
```

---

# 22. Voice

Voice is the product's relatively stable communication character.

Voice SHOULD remain consistent across surfaces.

---

# 23. Tone

Tone adapts to context.

For example:

```text
Success
→ concise and positive

Error
→ calm and helpful

Security warning
→ direct and serious

Destructive action
→ precise and consequence-focused

Empty state
→ informative and constructive
```

---

# 24. Tone Is Contextual

Do not use the same cheerful tone for:

```text
successful upload
```

and:

```text
permanent data deletion
```

---

# 25. Default Voice

Product copy SHOULD generally be:

```text
clear
direct
calm
concise
respectful
```

---

# 26. Avoid Forced Personality

Do not make every UI string:

```text
funny
quirky
cute
clever
```

A joke that obscures meaning is a usability defect.

---

# 27. Humor

Humor SHOULD NOT appear in:

```text
errors
security warnings
billing failures
data loss
account recovery
accessibility-critical instructions
```

unless exceptionally appropriate.

---

# 28. Empathy Without Performance

Content MAY acknowledge inconvenience.

It SHOULD NOT overdo emotional language.

Prefer:

```text
We couldn't save your changes.
```

over:

```text
Oh no! We're super sorry! Something terrible happened!
```

---

# 29. Avoid Blame

Do not blame users.

Bad:

```text
You entered an invalid password.
You forgot to complete this field.
```

Prefer:

```text
Enter your password.
Enter an email address in the correct format.
```

---

# 30. Avoid System Self-Drama

Bad:

```text
Fatal error!
Catastrophic failure!
```

unless it literally describes an operational state users must understand.

---

# 31. Active Voice

Prefer active voice when it makes responsibility/action clearer.

Prefer:

```text
Delete this project
```

over:

```text
This project will be deleted
```

for action labels.

---

# 32. Direct Address

Use:

```text
you
your
```

where it improves clarity.

---

# 33. Avoid "the user"

Do not write UI copy such as:

```text
The user must select a file.
```

Prefer:

```text
Select a file.
```

---

# 34. First Person

Use:

```text
I
my
```

sparingly.

Settings often work better as:

```text
Email me when...
```

than:

```text
Email the current user when...
```

---

# 35. Product "We"

"We" MAY represent the product/company when responsibility is genuinely organizational.

Do not use "we" to obscure responsibility.

---

# 36. Concision

Remove words that do not improve:

```text
meaning
decision quality
actionability
trust
```

---

# 37. Concise Does Not Mean Incomplete

A six-word error that gives no recovery path is not better than a twelve-word error that explains the next action.

---

# 38. Front-Load Important Information

Prefer:

```text
Your card was declined. Try another payment method.
```

over:

```text
Unfortunately, while attempting to complete your transaction, we discovered...
```

---

# 39. Sentence Length

Prefer short, readable sentences.

Split complex instructions into separate sentences or steps.

---

# 40. Paragraph Length

Interface paragraphs SHOULD be short.

Long documentation belongs in:

```text
help
documentation
support article
```

when not required to make the immediate decision.

---

# 41. Progressive Disclosure

Show essential content first.

Provide details through:

```text
helper text
tooltip
Learn more
expandable detail
```

where useful.

---

# 42. Scannability

Users scan interfaces.

Use:

```text
clear headings
short labels
meaningful verbs
structured grouping
```

---

# 43. Capitalization Standard

The canonical UI capitalization style is:

> **Sentence case.**

---

# 44. Sentence Case

Capitalize:

```text
first word
proper nouns
official product/brand names
required acronyms
```

Lowercase ordinary words.

Preferred:

```text
Account settings
Delete project
Payment method
Create API key
```

Avoid:

```text
Account Settings
Delete Project
Payment Method
Create API Key
```

unless an established proper name requires it.

---

# 45. Sentence Case Scope

Sentence case SHOULD apply to:

```text
page titles
section headings
buttons
labels
tabs
menus
dialog titles
table headings
settings
empty-state headings
```

---

# 46. Proper Nouns

Preserve canonical capitalization:

```text
GitHub
PostgreSQL
OpenAI
JavaScript
iOS
```

---

# 47. Acronyms

Use an acronym only if the intended audience understands it or the term is defined.

Preserve canonical form:

```text
API
URL
PDF
MFA
```

---

# 48. All Caps

Do not use ALL CAPS for emphasis.

Exceptions MAY include established abbreviations such as:

```text
API
SMS
PDF
```

---

# 49. Lowercase Styling

Do not force all-lowercase copy as a visual design style if it harms readability or proper naming.

---

# 50. Title Case

Title Case SHOULD NOT be the default application UI style.

It MAY be used where a separate editorial/brand standard explicitly requires it.

---

# 51. Capitalization Consistency

The same product concept MUST maintain consistent capitalization.

Do not alternate:

```text
Workspace
workspace
WorkSpace
```

without semantic reason.

---

# 52. Punctuation

Punctuation SHOULD clarify meaning, not decorate the interface.

---

# 53. Button Punctuation

Buttons, tabs, labels, and menu commands generally SHOULD NOT end with periods.

Good:

```text
Save changes
Delete project
```

---

# 54. Full Sentences

Full-sentence:

```text
helper text
error messages
dialog descriptions
empty-state descriptions
```

SHOULD normally end with appropriate punctuation.

---

# 55. Heading Punctuation

Headings generally SHOULD NOT end with a period.

Question headings MAY use a question mark when the heading is genuinely a question.

---

# 56. Exclamation Marks

Use exclamation marks sparingly.

Avoid:

```text
Payment failed!
Account deleted!
```

---

# 57. Multiple Exclamation Marks

Never use:

```text
!!!
```

in ordinary product UI.

---

# 58. Ellipsis

An ellipsis MAY indicate:

```text
progress
unfinished thought
an action requiring further input
```

but SHOULD NOT be added mechanically to command labels.

---

# 59. Ampersand

Prefer:

```text
and
```

instead of:

```text
&
```

unless space constraints, brand names, or established terminology justify it.

---

# 60. Slash

Avoid ambiguous constructions such as:

```text
and/or
Save/continue
```

Rewrite clearly.

---

# 61. Parentheses

Use parenthetical information sparingly in UI.

If the information is essential, it often deserves a normal sentence.

---

# 62. Contractions

Natural contractions MAY be used where appropriate.

Examples:

```text
can't
don't
we're
```

Avoid contractions where legal, formal, or translation concerns make them unsuitable.

---

# 63. Labels

Labels identify:

```text
fields
controls
sections
values
```

They SHOULD be concise and specific.

---

# 64. Form Labels

Use:

```text
Email address
Company name
Billing country
```

not:

```text
Please enter your email address here
```

---

# 65. Labels Are Not Instructions

The label tells users what the field is.

Helper text explains unusual requirements.

---

# 66. Visible Labels

Important form controls SHOULD have visible labels.

Placeholder text SHOULD NOT replace labels.

---

# 67. Placeholder

Placeholder MAY provide:

```text
example
expected pattern
```

when useful.

It MUST NOT be the only mechanism for conveying required meaning.

---

# 68. Placeholder Example

Good:

```text
Label: Workspace name
Placeholder: Acme design team
```

---

# 69. Required Fields

Forms SHOULD establish one consistent convention for required/optional fields.

---

# 70. Optional Label

If most fields are required, marking:

```text
Optional
```

may be clearer than adding asterisks everywhere.

---

# 71. Required Indicator

If an asterisk is used, it MUST have an accessible explanation.

---

# 72. Helper Text

Helper text SHOULD explain requirements users cannot reasonably infer.

Example:

```text
Use 8–64 characters.
```

---

# 73. Do Not Repeat Labels

Bad:

```text
Label: Username
Helper: Enter your username.
```

The helper provides no new information.

---

# 74. Examples

Examples SHOULD be realistic but not contain real sensitive personal data.

---

# 75. Button Principle

> **Buttons describe the action that will happen when selected.**

---

# 76. Button Verbs

Prefer explicit verbs:

```text
Save changes
Create project
Send invitation
Download report
Delete account
```

---

# 77. Avoid Generic "OK"

Avoid:

```text
OK
Yes
No
Submit
Confirm
Proceed
```

when a more specific action can be named.

---

# 78. Generic Buttons Exception

`OK` MAY be acceptable for a purely informational message with no meaningful choice.

---

# 79. "Submit"

Prefer the actual outcome.

Bad:

```text
Submit
```

Better:

```text
Create account
Send request
Place order
```

---

# 80. Button Outcome

The button MUST describe the immediate result, not an earlier implementation step.

---

# 81. Button Consistency

If the product calls the action:

```text
Archive project
```

do not use:

```text
Close project
```

elsewhere for the same behavior.

---

# 82. Primary Button

Primary CTA copy SHOULD represent the main task.

---

# 83. Secondary Button

Secondary actions SHOULD remain clear without competing linguistically with the primary action.

---

# 84. Cancel

`Cancel` is appropriate for abandoning an operation that has not yet committed.

---

# 85. Close

Use:

```text
Close
```

when dismissing informational content without cancelling a pending operation.

---

# 86. Back

Use `Back` to navigate to the previous step, not to cancel the whole process unless that is actually what occurs.

---

# 87. Done

Use `Done` when the task is already complete and the action primarily closes/exits the workflow.

---

# 88. Save vs Save changes

Use:

```text
Save
```

when context is unmistakable.

Use:

```text
Save changes
```

when multiple actions exist or the outcome needs clarity.

---

# 89. Links

Link text SHOULD describe the destination or action.

Good:

```text
View billing history
Read security documentation
```

Bad:

```text
Click here
Learn more
```

when the destination can be made explicit.

---

# 90. "Learn more"

`Learn more` MAY be acceptable when surrounding context clearly identifies the subject.

---

# 91. Links vs Buttons

Content MUST reflect interaction semantics.

Use an action verb for a button performing an operation.

Use destination-oriented copy for navigation.

---

# 92. Tabs

Tab labels SHOULD be:

```text
short
parallel
noun-oriented where appropriate
```

Examples:

```text
Overview
Members
Billing
Security
```

---

# 93. Menu Items

Menu commands SHOULD clearly describe actions.

Example:

```text
Rename
Duplicate
Archive
Delete
```

---

# 94. Navigation Labels

Navigation SHOULD reflect user concepts, not technical subsystem names.

---

# 95. Headings

Headings SHOULD communicate the subject or user task.

---

# 96. Page Title

A page title SHOULD answer:

```text
Where am I?
```

Examples:

```text
Billing
API keys
Team members
```

---

# 97. Task Heading

For focused workflows, task-oriented headings MAY be preferable:

```text
Create a workspace
Reset your password
Invite team members
```

---

# 98. Avoid Welcome Headings

Bad default dashboard heading:

```text
Welcome to your dashboard
```

when:

```text
Overview
```

or actual content communicates more.

---

# 99. Parallel Structure

Sibling headings and options SHOULD use parallel grammatical forms.

Good:

```text
Create project
Import project
Join project
```

Bad:

```text
Create project
Project import
Joining projects
```

---

# 100. Tooltips

Tooltips SHOULD provide useful supplementary information.

They SHOULD NOT contain essential instructions required to complete a task.

---

# 101. Tooltip Brevity

Tooltips SHOULD generally be short.

---

# 102. Icon-Only Actions

Icon-only actions MUST have accessible names and SHOULD have discoverable labels/tooltips where meaning is not obvious.

---

# 103. Abbreviations

Avoid unexplained abbreviations.

Prefer:

```text
Maximum
```

over:

```text
Max.
```

unless space/domain conventions strongly support it.

---

# 104. Validation

Validation copy answers:

```text
What is wrong?
Where is it wrong?
How can it be fixed?
```

---

# 105. Error Identification

When validation detects an error, the affected field/item MUST be identifiable and the problem MUST be described in text.

---

# 106. Error Message Formula

A good validation error often follows:

```text
Action + requirement
```

Examples:

```text
Enter your email address.
Enter a valid date in the format DD/MM/YYYY.
Choose a payment method.
Use at least 12 characters.
```

---

# 107. Avoid "Invalid"

Prefer a specific requirement.

Bad:

```text
Invalid email.
```

Better:

```text
Enter an email address in the format name@example.com.
```

---

# 108. Avoid "Error"

The visible word:

```text
Error
```

often adds little.

Prefer to state the problem.

---

# 109. Avoid "Please"

Validation messages generally do not need:

```text
Please
```

The instruction is already clear.

---

# 110. Avoid "You Forgot"

Bad:

```text
You forgot to enter your name.
```

Prefer:

```text
Enter your name.
```

---

# 111. Avoid "You Failed"

Never use blame-oriented language such as:

```text
You failed to...
```

---

# 112. Match Error to Label

Error messages SHOULD reuse the language of the associated field label.

Example:

```text
Label:
Date of birth

Error:
Enter your date of birth.
```

---

# 113. Error Specificity

Bad:

```text
Something went wrong.
```

Better when known:

```text
We couldn't upload the file because it's larger than 20 MB.
```

---

# 114. Unknown Error

When cause is genuinely unknown:

```text
We couldn't save your changes. Try again.
```

is better than inventing a cause.

---

# 115. Do Not Fabricate Recovery

Do not tell users:

```text
Try again
```

if retry cannot possibly succeed.

---

# 116. Recovery Action

If the user can solve the problem, tell them how.

---

# 117. System Error

When only the service can solve it, say what users can expect.

Example:

```text
We couldn't generate the report. Your request wasn't completed. Try again later.
```

---

# 118. Preserve User Work

When relevant, error copy SHOULD explain whether user data has been preserved.

Example:

```text
We couldn't save your changes. Your edits are still here.
```

---

# 119. Error Codes

Technical error IDs MAY be shown when they help support/debugging.

They SHOULD be secondary.

Example:

```text
Reference ID: 8K2M-P4Q
```

---

# 120. Raw Exceptions

Never expose raw:

```text
stack traces
SQL errors
exception names
cloud provider messages
```

to ordinary users.

---

# 121. Error Summary

Forms with multiple errors SHOULD provide an accessible error summary where appropriate.

---

# 122. Error Ordering

Errors SHOULD appear in a logical order matching the form/workflow.

---

# 123. Inline Error

Place field-specific errors near the field.

---

# 124. Error Persistence

Errors SHOULD remain visible until:

```text
the user corrects them
or
the application intentionally revalidates
```

Do not make messages disappear before users can act.

---

# 125. Validation Timing

Avoid disruptive validation while users are still typing unless early feedback is genuinely useful.

---

# 126. Required-Field Timing

Do not show:

```text
This field is required.
```

the instant a user focuses an empty field.

---

# 127. Positive Validation

Success messages for individual fields SHOULD be used sparingly.

Do not add visual/content noise with:

```text
Looks good!
Great!
Perfect!
```

after every input.

---

# 128. Warnings

A warning communicates risk before the user proceeds.

---

# 129. Warning Formula

A warning SHOULD identify:

```text
the action
the consequence
whether it is reversible
what the user can do
```

---

# 130. Warning Specificity

Bad:

```text
Are you sure?
```

Better:

```text
Delete this API key?
Applications using this key will stop working.
```

---

# 131. Confirmation Dialogs

Confirmation dialogs SHOULD be used only when they prevent meaningful mistakes.

---

# 132. Do Not Confirm Everything

Routine reversible actions SHOULD NOT be interrupted with:

```text
Are you sure?
```

---

# 133. Confirmation Value

Use confirmation when:

```text
action is destructive
action is hard to reverse
action has significant external effect
action affects many records
consequence is difficult to infer
```

---

# 134. Confirmation Dialog Anatomy

A confirmation SHOULD generally contain:

```text
Specific title
Consequence/context
Explicit primary action
Clear cancel/secondary action
```

---

# 135. Question + Answer Alignment

Dialog actions SHOULD clearly answer the question posed by the title.

Example:

```text
Delete this project?

[Delete project] [Cancel]
```

---

# 136. Avoid Yes/No

Bad:

```text
Delete this project?

[Yes] [No]
```

The action becomes less scannable and more error-prone.

---

# 137. Destructive Copy

Destructive copy MUST name the destructive action explicitly.

Prefer:

```text
Delete project
Remove member
Revoke access
Cancel subscription
```

---

# 138. Destructive Consequence

State the meaningful consequence.

Example:

```text
Delete “Atlas”?

This permanently deletes the project and its files. This action can't be undone.
```

---

# 139. "Permanent"

Use words such as:

```text
permanently
can't be undone
```

only when technically true.

---

# 140. Recoverable Deletion

If deletion can be restored for 30 days, say so.

Example:

```text
Move this project to trash?

You can restore it for 30 days.
```

Do not say:

```text
This can't be undone.
```

---

# 141. Delete vs Remove

Use:

```text
Delete
```

when the object itself is destroyed.

Use:

```text
Remove
```

when an association/membership is removed but the underlying object remains.

---

# 142. Archive vs Delete

`Archive` MUST NOT be used as a softer synonym for delete.

It should represent a real retained/restorable state.

---

# 143. Disable vs Delete

`Disable` SHOULD mean the object/account remains but cannot currently be used.

---

# 144. Cancel Subscription

Distinguish:

```text
Cancel subscription
```

from:

```text
Delete account
```

and state what remains available.

---

# 145. Typed Confirmation

Typing an object name to confirm MAY be appropriate for unusually high-risk destructive actions.

It SHOULD NOT be used for ordinary deletion simply to add friction.

---

# 146. Checkbox Confirmation

Avoid meaningless:

```text
I understand.
```

checkboxes unless acknowledgement itself has real legal/security significance.

---

# 147. Destructive Button Label

The destructive button SHOULD repeat the action:

```text
Delete workspace
```

not:

```text
Confirm
```

---

# 148. Success Messages

Success copy SHOULD confirm the result when users may otherwise be uncertain.

---

# 149. Do Not Celebrate Routine Actions

Avoid:

```text
Awesome!
Fantastic!
Woohoo!
```

for routine administrative operations.

---

# 150. Success Formula

Usually:

```text
Object + result
```

Examples:

```text
Changes saved.
Invitation sent.
API key created.
```

---

# 151. Success Without Message

If the resulting UI state clearly proves success, an additional toast MAY be unnecessary.

---

# 152. Persistence

Success messages SHOULD remain visible long enough to perceive.

---

# 153. Status Messages

Non-modal status updates SHOULD communicate asynchronous progress and completion accessibly.

---

# 154. Loading Copy

Loading text SHOULD describe real work when useful.

Examples:

```text
Uploading file…
Generating report…
Saving changes…
```

---

# 155. Avoid Fake Precision

Do not say:

```text
Almost done…
```

when the system cannot know that.

---

# 156. Progress

When meaningful progress is known, show it.

Example:

```text
Uploading 4 of 10 files
```

---

# 157. Unknown Duration

Use an indeterminate state when progress cannot be accurately measured.

---

# 158. Long Operations

Long-running operations SHOULD explain:

```text
what is happening
whether users can leave
how they will know it is complete
```

---

# 159. Background Completion

Example:

```text
Your export is being prepared. You can leave this page; we'll notify you when it's ready.
```

only when notification behavior actually exists.

---

# 160. Empty States

An empty state explains why expected content is absent and what users can do next.

---

# 161. Empty State Types

Distinguish:

```text
First-use empty
User-cleared empty
Filter/search empty
Permission-limited empty
Error masquerading as empty
```

---

# 162. First-Use Empty

First-use empty states SHOULD explain:

```text
what belongs here
why it matters
how to create/add the first item
```

---

# 163. Example First-Use State

```text
No projects yet

Create a project to organize your team's work.

[Create project]
```

---

# 164. Do Not Overwrite Empty States

Avoid long marketing copy when the user primarily needs one action.

---

# 165. Existing-but-Empty State

Example:

```text
No open invoices

Invoices that still need payment will appear here.
```

---

# 166. Filter Empty State

A filter-result empty state SHOULD mention that filters are restricting results.

Example:

```text
No projects match these filters.

Try changing or clearing your filters.
```

---

# 167. Search No-Result State

Search no-results follows Search Guidelines and MUST NOT be used when the request actually failed.

---

# 168. Permission Empty State

Do not reveal hidden content through copy such as:

```text
There are 12 files here, but you don't have permission to see them.
```

unless that disclosure is explicitly allowed.

---

# 169. Empty State CTA

The CTA SHOULD be the most useful available action.

Do not force a CTA when no action is appropriate.

---

# 170. Empty State Illustration

Illustration MAY support comprehension or tone.

It MUST NOT be required to understand the state.

---

# 171. Error State vs Empty State

A failed API request is not:

```text
No data yet
```

It is an error state.

---

# 172. Offline State

Offline copy SHOULD clearly distinguish:

```text
no network
cached data
unsynced changes
```

where relevant.

---

# 173. Permission Messages

Authorization copy SHOULD explain what the user can reasonably do next.

---

# 174. Access Denied

Prefer:

```text
You don't have access to this project.
```

over:

```text
403 Forbidden
```

---

# 175. Permission Recovery

Where possible, include a legitimate next step:

```text
Ask a workspace admin for access.
```

---

# 176. Do Not Leak Sensitive Existence

Security requirements may require:

```text
We couldn't find that page.
```

rather than confirming that a restricted resource exists.

---

# 177. Authentication Copy

Authentication content SHOULD be:

```text
clear
calm
non-accusatory
security-safe
```

---

# 178. Login Errors

Where account enumeration is a concern, login/recovery copy SHOULD avoid revealing whether a particular account exists.

---

# 179. Password Requirements

Explain password requirements before or while users create a password.

Do not wait until submission to reveal all constraints.

---

# 180. MFA Copy

Use terminology users can understand.

Examples:

```text
Authenticator app
Security key
Passkey
Recovery code
```

rather than internal protocol names unless useful.

---

# 181. Security Warning

Security copy SHOULD state:

```text
what happened
what risk exists
what action is recommended
```

---

# 182. Security Urgency

Urgency MUST reflect real severity.

Do not overuse:

```text
Urgent
Critical
Immediately
```

---

# 183. Billing Copy

Billing copy MUST clearly distinguish:

```text
price
currency
billing period
tax treatment
renewal
trial
discount
```

where relevant.

---

# 184. Monetary Ambiguity

Avoid:

```text
$20/month
```

when currency could be ambiguous.

Prefer:

```text
US$20/month
```

or properly localized equivalent where needed.

---

# 185. Trial Copy

Trials MUST state:

```text
length
what happens afterward
whether payment begins automatically
```

where relevant.

---

# 186. Subscription Cancellation

Cancellation copy SHOULD explain:

```text
effective date
remaining access
billing impact
data retention
```

where relevant.

---

# 187. Settings Copy

Settings SHOULD describe what the setting controls.

---

# 188. Toggle Labels

Toggle labels SHOULD describe the state/capability, not tell users to "enable" it redundantly.

Prefer:

```text
Email notifications
```

with a switch.

Avoid:

```text
Enable email notifications
```

if the switch already communicates on/off and context is clear.

---

# 189. Positive Toggle Labels

Prefer positive state labels.

Good:

```text
Email notifications
```

Avoid:

```text
Don't disable email notifications
```

---

# 190. Dangerous Toggle

A high-impact toggle SHOULD have explanatory helper text.

---

# 191. Radio Options

Radio options SHOULD be:

```text
mutually exclusive
parallel
individually understandable
```

---

# 192. Checkbox Copy

Checkbox text SHOULD describe the selected state.

---

# 193. Consent Checkbox

Consent copy MUST clearly state what the person is agreeing to.

Avoid vague:

```text
I agree.
```

when material terms require specificity.

---

# 194. Table Headings

Column headings SHOULD be concise nouns/phrases.

Examples:

```text
Name
Owner
Status
Created
```

---

# 195. Table Actions

Use explicit row action labels where possible.

Example:

```text
Edit Alice's access
```

for accessible naming even if the visible control shows only:

```text
Edit
```

---

# 196. Pagination Copy

Use predictable terms:

```text
Previous
Next
```

with contextual accessible names when needed.

---

# 197. Breadcrumbs

Breadcrumb labels SHOULD use the canonical names of destinations.

---

# 198. Filters

Filter labels SHOULD describe the underlying dimension.

Examples:

```text
Status
Owner
Created date
```

---

# 199. Filter Values

Filter values SHOULD match terminology used elsewhere.

Do not call a state:

```text
Inactive
```

in the filter and:

```text
Disabled
```

on the detail page.

---

# 200. Sorting

Sort options SHOULD state meaningful order.

Examples:

```text
Newest first
Oldest first
Name A–Z
Name Z–A
```

---

# 201. Relative Direction

Do not use ambiguous:

```text
Ascending
Descending
```

when a plain-language alternative is clearer to the audience.

---

# 202. Dates

UX copy SHOULD avoid ambiguous numeric dates where context matters.

Follow Internationalization Guidelines.

---

# 203. Time

When deadlines matter, specify enough timezone/context to prevent misunderstanding.

---

# 204. Numbers

Use digits when they improve scanability.

---

# 205. Large Numbers

Use locale-aware formatting and appropriate precision.

Do not overload users with meaningless decimal places.

---

# 206. Ranges

Write ranges clearly.

Prefer:

```text
8–64 characters
```

or localized equivalent.

---

# 207. Units

Include units whenever omission creates ambiguity.

Examples:

```text
20 MB
5 minutes
10 km
```

---

# 208. "Unlimited"

Do not say:

```text
Unlimited
```

if real technical/fair-use limits exist that materially affect users.

---

# 209. "Free"

Do not say:

```text
Free
```

if material required fees or conditions make the claim misleading.

---

# 210. "Instant"

Avoid absolute performance claims such as:

```text
instant
immediate
real-time
```

unless the system actually provides that behavior.

---

# 211. "Secure"

Do not use:

```text
100% secure
completely safe
```

absolute security claims.

---

# 212. "Guaranteed"

Use guarantee language only when the organization truly makes that commitment.

---

# 213. Irreversible Language

Words such as:

```text
permanent
irreversible
can't be undone
```

MUST reflect actual system behavior.

---

# 214. Product Claims

UX writing MUST NOT make claims inconsistent with:

```text
security
privacy
billing
availability
legal
support
```

policies.

---

# 215. Content Accuracy

Copy is incorrect if behavior changes and the text no longer reflects reality.

Content maintenance is therefore part of feature maintenance.

---

# 216. Dynamic Copy

Conditional messages MUST correspond to actual state.

Do not show:

```text
Payment successful
```

before payment is authoritative.

---

# 217. Optimistic UI Copy

Optimistic interfaces SHOULD distinguish:

```text
saving
saved
failed
```

correctly.

---

# 218. Saving State

Good:

```text
Saving…
```

then:

```text
Saved
```

only after the chosen success boundary is reached.

---

# 219. Async Accepted vs Completed

Do not say:

```text
Report generated
```

when the backend has merely accepted the generation job.

Prefer:

```text
Report generation started.
```

---

# 220. Confirmation Messages

Post-action confirmations SHOULD state the completed outcome.

---

# 221. Confirmation Specificity

Prefer:

```text
Maria was removed from the workspace.
```

over:

```text
Action completed successfully.
```

---

# 222. Undo

When safe and practical, reversible actions SHOULD prefer:

```text
action
+
Undo
```

over a blocking confirmation dialog.

---

# 223. Undo Copy

Example:

```text
Project archived. Undo
```

---

# 224. Undo Duration

Do not imply undo is available indefinitely when it expires.

---

# 225. Destructive Undo

True destructive actions MAY require confirmation instead of optimistic undo if restoration cannot be guaranteed.

---

# 226. Notification Copy

Notification copy follows Notifications Guidelines and SHOULD remain:

```text
specific
timely
actionable
privacy-aware
```

---

# 227. Email Subject Lines

Subject lines SHOULD communicate the purpose without requiring users to open the message.

---

# 228. Push Copy

Push notifications SHOULD front-load the most important information and avoid sensitive lock-screen details.

---

# 229. SMS Copy

SMS copy SHOULD be concise and identify the sender/product where otherwise ambiguous.

---

# 230. In-App Notification Copy

In-app notifications SHOULD say:

```text
what happened
who/what caused it where relevant
what resource is affected
```

---

# 231. Content and Accessibility

Content MUST support Accessibility Guidelines.

---

# 232. Accessible Labels

Accessible names MUST accurately describe controls.

---

# 233. Visible vs Accessible Label

The accessible name SHOULD align with visible copy.

A button visibly labeled:

```text
Save
```

should not have an unrelated accessible name:

```text
Submit form data
```

without good reason.

---

# 234. Color Independence

Copy MUST NOT rely on color alone.

Bad:

```text
Fields in red are required.
```

---

# 235. Directional Instructions

Avoid instructions relying only on visual position:

```text
Click the button on the right.
```

Prefer:

```text
Select Save changes.
```

---

# 236. Sensory Instructions

Avoid:

```text
Choose the round icon.
```

when a semantic label is available.

---

# 237. Link Meaning

Links SHOULD make sense from their accessible context.

Avoid repeated:

```text
Click here
Read more
```

when more descriptive text is practical.

---

# 238. Error Accessibility

Errors MUST be described textually, not solely through:

```text
red border
icon
color
```

---

# 239. Status Accessibility

Asynchronous success/error/status copy SHOULD be exposed programmatically as required by Accessibility Guidelines.

---

# 240. Content and Localization

All reusable product copy MUST follow Internationalization Guidelines.

---

# 241. No Fragment Concatenation

Bad:

```text
"Delete " + itemName + " permanently?"
```

when grammatical structure may differ by locale.

Use a complete localized message.

---

# 242. Translation Context

Strings SHOULD provide translators with:

```text
screen
purpose
meaning
placeholder descriptions
character constraints
```

where useful.

---

# 243. Avoid English Wordplay

Puns and idioms SHOULD be avoided when they create translation difficulty or ambiguity.

---

# 244. Idioms

Prefer:

```text
Start
```

over:

```text
Hit the ground running
```

for international product UI.

---

# 245. Cultural Neutrality

Avoid unnecessary culture-specific:

```text
sports metaphors
holiday references
slang
regional humor
```

in globally distributed core UI.

---

# 246. Expansion

Copy MUST tolerate localization expansion.

Do not artificially shorten translations to fit fixed English layouts.

---

# 247. Character Limits

Where real channel limits exist, document them for translators.

Do not invent arbitrary content limits simply to preserve layout.

---

# 248. Capitalization Localization

Do not force English capitalization rules onto languages that use different writing conventions.

---

# 249. Punctuation Localization

Punctuation may vary by language.

Translation systems should permit locale-appropriate punctuation.

---

# 250. Glossary Localization

Terminology registry SHOULD provide approved translations for key product terms where necessary.

---

# 251. Localization Consistency

A canonical product term should normally map consistently within each locale.

---

# 252. Content Design System

Reusable components SHOULD define content expectations.

Example:

```text
Button
→ verb phrase

Dialog title
→ action/question

Field error
→ corrective instruction

Empty state
→ state + explanation + optional CTA
```

---

# 253. Component Content Contract

Design-system components MAY specify:

```text
max recommended concepts
required text slots
content hierarchy
tone constraints
```

but SHOULD avoid brittle character-count limits.

---

# 254. Dialog Content Contract

A dialog component SHOULD conceptually support:

```text
title
description
primary action
secondary action
optional consequence/detail
```

---

# 255. Alert Content Contract

Alerts SHOULD include:

```text
state
meaning
next action if needed
```

---

# 256. Toast Content Contract

A toast SHOULD usually communicate one result.

Do not place long instructions inside transient toasts.

---

# 257. Banner Content Contract

Banners MAY communicate broader persistent:

```text
system
account
security
billing
```

conditions.

---

# 258. Banner Priority

Do not use banners for low-value information simply because banners are visually prominent.

---

# 259. Onboarding

Onboarding copy SHOULD help users reach meaningful product value.

---

# 260. Avoid Feature Tours by Default

Do not explain every UI element before users need it.

Prefer contextual guidance.

---

# 261. Onboarding Action

Onboarding SHOULD focus on actual tasks.

Prefer:

```text
Invite your team
```

over:

```text
Discover collaboration possibilities
```

---

# 262. Checklist Copy

Onboarding checklist items SHOULD represent meaningful completed outcomes.

---

# 263. Help Content

Inline help SHOULD solve the immediate question.

Long explanations SHOULD link to documentation where necessary.

---

# 264. Help Links

A help link SHOULD identify the topic.

Prefer:

```text
Learn about API key permissions
```

over generic:

```text
Learn more
```

when space permits.

---

# 265. Tooltip vs Help Text

Use persistent helper text when information is necessary before action.

Use tooltip/popover for supplementary detail.

---

# 266. Content for Expert Tools

Expert-facing interfaces MAY use established technical terminology.

Conciseness MUST NOT remove necessary precision.

---

# 267. Content for Novice Tools

Novice-facing interfaces SHOULD explain unfamiliar concepts instead of exposing raw implementation language.

---

# 268. Progressive Technical Detail

A useful model:

```text
Plain-language summary
↓
Action
↓
Technical details/reference ID
```

---

# 269. Content Hierarchy

When copy appears together, prioritize:

```text
Primary message
Supporting detail
Action
Technical detail
```

---

# 270. Avoid Repetition

Do not repeat identical meaning across:

```text
title
description
button
```

Example bad dialog:

```text
Delete project

Are you sure you want to delete this project?

Delete
```

Better:

```text
Delete “Atlas”?

This permanently deletes the project and its files.

Delete project
```

---

# 271. Content Density

Dense administrative/productivity interfaces SHOULD use concise copy without sacrificing meaning.

---

# 272. Marketing vs Product UI

Marketing language and application UI serve different purposes.

Do not import promotional language mechanically into operational interfaces.

---

# 273. Feature Naming

Feature names SHOULD be:

```text
distinct
understandable
searchable
pronounceable
translatable where appropriate
```

---

# 274. Avoid Naming Everything

Not every minor function requires a branded feature name.

---

# 275. Internal Codenames

Internal codenames MUST NOT leak into product UI unless intentionally adopted publicly.

---

# 276. Acronym Introduction

If an acronym is unfamiliar:

```text
single sign-on (SSO)
```

may be introduced once before using:

```text
SSO
```

---

# 277. Product Naming Consistency

Brand/product/service names MUST follow canonical naming.

---

# 278. Version Labels

Version/product release naming follows Release & Versioning Guidelines.

---

# 279. AI Terminology

AI-related terminology SHOULD describe actual behavior.

Do not label ordinary deterministic features:

```text
AI-powered
```

unless AI materially drives the functionality.

---

# 280. AI Confidence Copy

Do not describe model output as:

```text
certain
guaranteed
always correct
```

when it is probabilistic.

---

# 281. Generated Content

AI-generated user-visible output SHOULD distinguish:

```text
generated suggestion
authoritative product state
```

where ambiguity could mislead users.

---

# 282. Human Review Copy

If a generated result requires human review, say so in context.

---

# 283. Content Versioning

Critical content MAY need versioning.

Examples:

```text
terms
consent text
legal notices
security warnings
regulated disclosures
```

---

# 284. Content Change Review

A text-only change can materially alter:

```text
legal meaning
billing promises
security behavior
user expectation
```

It therefore MAY require the same review level as functional changes.

---

# 285. Source Control

Product copy SHOULD live in:

```text
source control
localization platform with version history
content-management system with audit history
```

according to architecture.

---

# 286. Reviewability

Reviewers SHOULD be able to see:

```text
old copy
new copy
context
affected locale/component
```

---

# 287. Content Ownership

High-impact surfaces SHOULD have clear product/content ownership.

---

# 288. Content Debt

Inconsistent:

```text
terminology
capitalization
error messages
status names
```

constitutes maintainability debt and SHOULD be corrected systematically.

---

# 289. Content Linting

Automated checks MAY detect:

```text
forbidden terms
capitalization
hard-coded strings
double spaces
placeholder errors
deprecated terminology
```

---

# 290. Spell Checking

Important user-facing copy SHOULD receive automated spell checking.

---

# 291. Grammar Tools

Automated grammar tools MAY assist review.

They MUST NOT override domain terminology or localization requirements blindly.

---

# 292. Screenshots

Content review SHOULD use actual interface context where practical.

A string may be correct in isolation but wrong in context.

---

# 293. Content Analytics

UX copy effectiveness MAY be evaluated through:

```text
task completion
error recovery
support contacts
abandonment
search behavior
```

according to Analytics Guidelines.

---

# 294. Avoid Click Optimization Alone

A button receiving more clicks is not automatically better if it causes:

```text
misunderstanding
accidental actions
cancellations
support load
```

---

# 295. Content Experiments

Copy experiments SHOULD preserve:

```text
truthfulness
accessibility
security
consent
billing clarity
```

as guardrails.

---

# 296. Dark Patterns

Content MUST NOT manipulate users into decisions contrary to their expressed interests.

---

# 297. Confirmshaming

Avoid:

```text
No thanks, I don't want to save money.
```

Use neutral:

```text
No thanks
```

or the actual alternative.

---

# 298. False Urgency

Do not claim:

```text
Only 2 minutes left!
```

without a real deadline.

---

# 299. Sneaking

Material fees, subscription terms, or data consequences MUST NOT be hidden in secondary copy.

---

# 300. Obstruction

Cancellation/deletion copy MUST NOT be intentionally confusing or misleading to prevent users from leaving.

---

# 301. Privacy Copy

Privacy-related UX MUST state:

```text
what data
why
who receives it
what choice exists
```

at the appropriate level of detail.

---

# 302. Consent Copy

Consent language SHOULD be specific rather than blanket.

Bad:

```text
I agree to everything.
```

---

# 303. Security Copy

Security UX MUST accurately distinguish:

```text
recommendation
requirement
risk
successful security state
```

---

# 304. Warning Fatigue

Do not overuse warnings.

Excessive warning language trains users to ignore important alerts.

---

# 305. Severity Vocabulary

Recommended conceptual hierarchy:

```text
Info
Success
Warning
Error
Critical/security alert
```

Visible copy SHOULD usually describe the actual state rather than displaying the severity word mechanically.

---

# 306. Content Review Checklist

```text
□ User goal understood
□ Important information first
□ Plain language
□ Canonical terminology
□ No internal jargon
□ Sentence case
□ Concise but complete
□ Action clear
□ No unnecessary repetition
□ Localization-ready
□ Accessible
□ Behavior accurately represented
```

---

# 307. Terminology Checklist

```text
□ Existing glossary checked
□ One concept, one name
□ Definition clear
□ Similar terms differentiated
□ Capitalization canonical
□ Translation impact reviewed
□ Deprecated synonyms documented
□ Owner identified
```

---

# 308. Button Checklist

```text
□ Describes action
□ Uses specific verb
□ Short
□ Sentence case
□ No period
□ Avoids OK/Yes/No where specificity is possible
□ Matches resulting behavior
□ Localizable
```

---

# 309. Label Checklist

```text
□ Names the field/control
□ Concise
□ Visible where needed
□ Not replaced by placeholder
□ Uses canonical terminology
□ Helper text adds new information
□ Sentence case
```

---

# 310. Validation Checklist

```text
□ Field identified
□ Problem explained in text
□ Corrective action stated
□ Uses label terminology
□ No blame
□ No jargon
□ No "invalid" when specifics are possible
□ No raw backend errors
□ Accessible association
```

---

# 311. Error Checklist

```text
□ What happened?
□ What was affected?
□ What can the user do?
□ Is retry actually useful?
□ Is user work preserved?
□ Is technical detail secondary?
□ Error ≠ empty state
□ Tone calm
```

---

# 312. Empty-State Checklist

```text
□ Correct empty-state type
□ Explains why content is absent
□ Useful next action
□ Query/filter preserved where relevant
□ Does not mask errors
□ Does not leak hidden content
□ Concise
```

---

# 313. Confirmation Checklist

```text
□ Confirmation truly needed
□ Action meaningful/high impact
□ Specific object/action named
□ Consequence stated
□ Reversibility accurate
□ Primary button repeats action
□ Cancel/secondary action clear
□ Avoid Yes/No
```

---

# 314. Destructive Copy Checklist

```text
□ Delete/remove/archive semantics correct
□ Object named
□ Scope stated
□ Downstream effects stated
□ Reversibility truthful
□ Retention/restoration window stated if relevant
□ Explicit destructive button
□ No euphemism hiding consequence
```

---

# 315. Success-State Checklist

```text
□ Success actually authoritative
□ Message needed
□ Result stated
□ No exaggerated celebration
□ Async accepted ≠ completed
□ Accessible status announcement where required
```

---

# 316. Capitalization Checklist

```text
□ Sentence case
□ Proper nouns correct
□ Product names canonical
□ Acronyms canonical
□ No decorative ALL CAPS
□ No unnecessary Title Case
□ Same term capitalized consistently
```

---

# 317. Localization Checklist

```text
□ Complete messages
□ No string concatenation
□ No English-specific wordplay
□ Placeholder context
□ Text expansion supported
□ Punctuation localizable
□ Capitalization not forcibly English
□ Terminology glossary available
```

---

# 318. Accessibility Checklist

```text
□ Visible label
□ Accessible name aligned
□ Error identified in text
□ No color-only meaning
□ Link meaning clear
□ Instructions not visual-position-only
□ Status messages accessible
□ Language understandable
```

---

# 319. Definition of Done — New UX Copy

A new user-facing string is ready when:

```text
✓ User purpose is known
✓ Canonical terminology used
✓ Voice/tone appropriate
✓ Sentence case applied
✓ Copy is actionable where necessary
✓ Behavior matches reality
✓ Localization structure valid
✓ Accessibility reviewed
✓ Related states considered
✓ Review completed at appropriate risk level
```

---

# 320. Definition of Done — New Form

```text
✓ Clear field labels
✓ Required/optional convention
✓ Useful helper text
✓ Input requirements visible
✓ Validation messages actionable
✓ Error summary where appropriate
✓ Submission action specific
✓ Success/failure states
✓ Localization-ready
✓ Accessibility passes
```

---

# 321. Definition of Done — Destructive Flow

```text
✓ Destructive operation named
✓ Scope and consequence accurate
✓ Recovery semantics known
✓ Confirmation justified
✓ Primary button explicit
✓ Cancel/escape path clear
✓ No misleading euphemism
✓ Success/failure copy defined
✓ Localization/accessibility checked
```

---

# 322. Definition of Done — Empty State

```text
✓ Empty-state cause understood
✓ Not actually an error/loading state
✓ Useful explanation
✓ Most useful next action available
✓ No hidden-data disclosure
✓ Content works with localization
✓ Accessible
```

---

# 323. Content & UX Writing Anti-Patterns

Avoid:

```text
Account Settings
```

when the standard is:

```text
Account settings
```

Avoid:

```text
SUBMIT
```

Avoid:

```text
Click Here
```

Avoid:

```text
OK
```

when a specific action exists.

Avoid:

```text
Yes / No
```

for destructive confirmation.

Avoid:

```text
Proceed
```

when:

```text
Delete account
```

is the actual action.

Avoid:

```text
Invalid input.
```

Avoid:

```text
An error occurred.
```

when the actual problem is known.

Avoid:

```text
Error 0x0043.
```

as primary user-facing copy.

Avoid:

```text
You forgot to enter your password.
```

Avoid:

```text
You failed to complete the form.
```

Avoid:

```text
Please enter a valid value.
```

when the requirement can be named.

Avoid:

```text
Something went wrong. Try again.
```

when retry cannot help.

Avoid:

```text
Success!
```

when the outcome can be stated specifically.

Avoid:

```text
Awesome! Your tax payment was submitted!
```

Avoid:

```text
Are you sure?
```

without stating the action.

Avoid:

```text
Confirm
```

as the button for account deletion.

Avoid:

```text
Delete
```

when the actual behavior is recoverable archive.

Avoid:

```text
Archive
```

when the item is permanently deleted.

Avoid:

```text
This can't be undone.
```

when the item can be restored.

Avoid:

```text
No projects found.
```

when the API failed.

Avoid:

```text
No files
```

when permissions intentionally hide them.

Avoid:

```text
Welcome to the amazing dashboard!
```

instead of useful orientation.

Avoid:

```text
Utilize the configuration interface to initiate authentication setup.
```

Avoid:

```text
Widget processing entity
```

because that is the database model name.

Avoid:

```text
left-hand button
```

in an RTL-capable product.

Avoid:

```text
the red field
```

as the only error identifier.

Avoid:

```text
placeholder = label
```

Avoid:

```text
Label: Email address
Helper: Enter your email address.
```

Avoid:

```text
"Delete " + projectName + "?"
```

as a localization strategy.

Avoid:

```text
one English string reused for multiple meanings
```

Avoid:

```text
temporary internal codename
```

appearing in production.

Avoid:

```text
different terms for the same state
```

across screens.

Avoid:

```text
Unlimited
```

when meaningful limits exist.

Avoid:

```text
Instant
```

for an asynchronous process.

Avoid:

```text
100% secure
```

Avoid:

```text
AI-powered
```

for ordinary deterministic logic.

Avoid:

```text
No thanks, I prefer missing out.
```

Avoid hidden fees or renewal terms in secondary text.

Avoid false scarcity or urgency.

Avoid cancelling through deliberately confusing wording.

---

# 324. AI Content & UX Writing Rules

AI coding agents MUST use the existing terminology registry before inventing new product terms.

---

# 325. AI Terminology Rule

AI MUST NOT introduce synonyms for an established concept merely for stylistic variation.

---

# 326. AI Capitalization Rule

AI SHOULD use sentence case for application UI unless an explicit product exception exists.

---

# 327. AI Button Rule

AI SHOULD label buttons with the specific resulting action.

---

# 328. AI Generic-CTA Rule

AI SHOULD avoid:

```text
Submit
Proceed
Confirm
OK
Yes
No
```

when a clearer action label exists.

---

# 329. AI Validation Rule

AI SHOULD describe the correction needed rather than label input merely:

```text
invalid
```

---

# 330. AI Error Rule

AI MUST NOT expose raw technical exceptions to ordinary users.

---

# 331. AI Recovery Rule

AI MUST NOT recommend retrying unless retry may plausibly resolve the failure.

---

# 332. AI Blame Rule

AI MUST NOT write validation/error copy that blames users.

---

# 333. AI Destructive Rule

AI MUST distinguish:

```text
delete
remove
archive
disable
cancel
revoke
```

according to actual behavior.

---

# 334. AI Confirmation Rule

AI SHOULD NOT add confirmation dialogs to routine reversible actions automatically.

---

# 335. AI Consequence Rule

For destructive operations, AI SHOULD state the concrete consequence and reversibility.

---

# 336. AI Yes/No Rule

AI SHOULD use explicit action labels instead of generic Yes/No buttons.

---

# 337. AI Empty-State Rule

AI MUST distinguish:

```text
empty
no results
permission restriction
loading
error
```

states.

---

# 338. AI Success Rule

AI MUST NOT claim completion before the system's authoritative success boundary.

---

# 339. AI Async Rule

AI SHOULD distinguish:

```text
queued
processing
completed
failed
```

in user-facing status copy.

---

# 340. AI Localization Rule

AI MUST write complete translatable messages rather than concatenated fragments.

---

# 341. AI Expansion Rule

AI MUST NOT shorten translations artificially to compensate for brittle layout.

---

# 342. AI Accessibility Rule

AI MUST ensure validation/error meaning exists in text and not solely through visual styling.

---

# 343. AI Label Rule

AI MUST NOT replace necessary visible labels with placeholder-only inputs.

---

# 344. AI Tone Rule

AI SHOULD adapt tone to consequence and urgency rather than apply one cheerful voice everywhere.

---

# 345. AI Accuracy Rule

AI MUST NOT invent:

```text
limits
deadlines
recovery behavior
pricing
security guarantees
```

merely to make copy sound complete.

---

# 346. AI Dark-Pattern Rule

AI MUST NOT produce manipulative cancellation, consent, privacy, billing, or marketing copy.

---

# 347. AI Content Review Rule

AI-generated user-facing copy is subject to the same review, localization, accessibility, security, and legal requirements as human-written copy.

---

# 348. AI Gold Rule

When uncertain:

```text
Clear
>
Clever
```

```text
Specific action
>
Generic CTA
```

```text
Actual consequence
>
Vague warning
```

```text
Canonical term
>
Stylistic synonym
```

```text
Truthful state
>
Reassuring but inaccurate copy
```

---

# 349. Golden Content & UX Writing Rules

**1. Product content is part of the interaction design.**

**2. Every string should help users understand, decide, or act.**

**3. Important information comes first.**

**4. Plain language is the default.**

**5. Internal implementation jargon stays internal unless the audience needs it.**

**6. One product concept has one canonical user-facing name.**

**7. Terminology is governed through an authoritative glossary.**

**8. Synonyms are not introduced merely for stylistic variety.**

**9. Status terminology has explicit behavioral meaning.**

**10. Voice remains consistent while tone adapts to context.**

**11. Serious situations receive serious, precise language.**

**12. Errors and validation never blame users.**

**13. Humor never obscures recovery, risk, security, billing, or data loss.**

**14. Copy is concise but never at the expense of necessary meaning.**

**15. The canonical UI capitalization style is sentence case.**

**16. Proper nouns, brands, and established acronyms preserve their canonical capitalization.**

**17. ALL CAPS is not used for emphasis.**

**18. Buttons generally have no terminal punctuation.**

**19. Complete explanatory sentences use normal punctuation.**

**20. Buttons describe the action users are taking.**

**21. Specific verbs are preferred over Submit, Proceed, Confirm, OK, Yes, and No.**

**22. Navigation labels describe destinations; action labels describe operations.**

**23. Visible labels are not replaced by placeholders.**

**24. Helper text adds information rather than repeating labels.**

**25. Input requirements appear before users need them where practical.**

**26. Validation errors identify what is wrong in text.**

**27. Validation messages explain how to correct the problem when possible.**

**28. Error copy uses the same terminology as the associated field or action.**

**29. Raw technical exceptions are never the primary user-facing error.**

**30. Retry instructions appear only when retry can actually help.**

**31. Errors explain whether unsaved user work has been preserved when relevant.**

**32. Empty states, errors, loading states, permissions, and no-result states remain distinct.**

**33. First-use empty states explain what belongs there and how to begin.**

**34. Search/filter no-result states help users broaden or clear constraints.**

**35. Empty-state copy does not leak hidden resources.**

**36. Confirmation dialogs exist only when they prevent meaningful mistakes.**

**37. Reversible routine actions prefer undo over unnecessary confirmation where practical.**

**38. Destructive confirmation titles name the actual destructive action.**

**39. Destructive buttons repeat the concrete action rather than saying Confirm.**

**40. Destructive copy states the material consequence.**

**41. Reversibility language is technically accurate.**

**42. Delete, remove, archive, disable, revoke, and cancel are not interchangeable.**

**43. Permanent is used only when the effect is genuinely permanent under the relevant product lifecycle.**

**44. Success messages describe actual outcomes.**

**45. Async acceptance is never described as completed work.**

**46. Progress language never claims precision the system does not know.**

**47. Settings labels describe what is controlled using positive understandable terminology.**

**48. Billing copy clearly communicates currency, billing period, renewal, and material charges where applicable.**

**49. Security copy distinguishes real risk from recommendation and does not exaggerate urgency.**

**50. Authentication copy avoids unnecessary account enumeration and security leakage.**

**51. Product claims remain consistent with actual system behavior and policy.**

**52. UX copy never hides material fees, data effects, consent, or cancellation consequences.**

**53. Confirmshaming and other dark-pattern copy are prohibited.**

**54. False urgency, artificial scarcity, and misleading guarantees are prohibited.**

**55. Accessible names remain aligned with visible labels.**

**56. Meaning is never communicated by color or screen position alone.**

**57. Link text describes its destination or purpose whenever practical.**

**58. Product copy remains localization-ready.**

**59. User-facing sentences are translated as complete grammatical units.**

**60. Translation layout expansion is solved through design, not by mutilating the content.**

**61. Cultural slang and wordplay are avoided when they create unnecessary global ambiguity.**

**62. Critical terminology has approved localized equivalents where necessary.**

**63. Product copy can be version-controlled and reviewed like code/configuration.**

**64. Text-only changes may require legal, security, billing, or product review when meaning changes materially.**

**65. Content linting, spell checking, and translation validation are automated where practical.**

**66. UX writing is reviewed in actual interface context, not only in a string file.**

**67. Content experiments optimize comprehension and outcomes, not clicks alone.**

**68. AI-generated UX copy follows exactly the same product standards as human-authored copy.**

**69. If the action is dangerous, the copy becomes more specific—not more dramatic.**

**70. If users cannot tell what happened, what an action will do, or how to recover from a problem, the content is not production-grade.**

---

# 350. Canonical Content & UX Writing Standard

The organizational standard is:

> **Product content is treated as an integral part of interface and interaction design. Every user-facing string has a clear purpose: orienting the user, identifying a concept or state, helping them make a decision, communicating an outcome, or enabling an action. Content uses plain, direct, concise language, places important information first, and avoids unnecessary jargon, personality, repetition, or implementation detail.**

> **Product terminology is governed. Important concepts have canonical names, definitions, capitalization, status semantics, approved alternatives, deprecated terminology, localization context, and accountable ownership. The same concept is not renamed across screens merely for stylistic variation, while technical implementation names remain separate from user vocabulary where that improves comprehension.**

> **Sentence case is the default capitalization convention for application UI, including headings, labels, buttons, tabs, menu items, settings, dialogs, and table headings. Proper nouns, official product names, and established acronyms retain their canonical capitalization; ALL CAPS and unnecessary Title Case are not used for visual emphasis. Short control labels generally omit terminal periods, while complete explanatory and error sentences use normal punctuation.**

> **Control copy communicates behavior precisely. Labels identify fields and concepts, helper text explains non-obvious requirements, links describe destinations, and buttons use specific active verbs describing their result. Generic labels such as Submit, Proceed, Confirm, OK, Yes, and No are replaced by meaningful actions where possible. Delete, remove, archive, disable, cancel, and revoke represent different product behaviors and are never treated as stylistic synonyms.**

> **Errors and validation are corrective rather than accusatory. Automatically detected errors are identified in text, connected to the affected field or task, and state the requirement or recovery action using terminology users recognize. Raw exceptions, infrastructure codes, blame-oriented language, and vague messages such as “Invalid input” or “Something went wrong” are avoided whenever more specific information is safely available. Retry is offered only when retry may genuinely succeed.**

> **Empty, loading, success, error, permission, offline, and no-result states are distinct interface states with distinct content. First-use empty states explain what belongs in the area and how to start, filter/search empty states help users recover from restrictive criteria, and backend failures are never represented as an empty dataset. Success messages reflect the actual authoritative completion boundary, while queued or asynchronous work is described as queued or processing until it is genuinely complete.**

> **Confirmation and destructive content are proportional to risk. Routine reversible actions avoid unnecessary confirmation; high-impact or hard-to-reverse actions name the object, action, scope, consequence, and real recovery semantics. Dialog actions use explicit verbs such as “Delete project” instead of generic confirmation labels, and statements such as “permanently deleted” or “can't be undone” appear only when they are technically true.**

> **Tone follows consequence. Routine product content remains calm and concise, security and billing warnings become more precise rather than more dramatic, error messages support recovery rather than blame, and marketing-style enthusiasm does not leak into serious operational workflows. Humor, idiom, slang, artificial urgency, manipulative cancellation copy, confirmshaming, misleading scarcity, hidden charges, and unsupported guarantees are excluded from core product UX.**

> **Content is accessible and internationalization-ready. Visible labels and accessible names align, errors exist in text rather than color alone, instructions do not rely solely on visual position, and links communicate useful meaning. Messages are localized as complete grammatical units, not concatenated fragments; terminology provides translator context; layouts tolerate text expansion; and English capitalization, punctuation, idioms, and wordplay are not forced onto other languages.**

> **UX content is governed throughout the software lifecycle. Copy lives in reviewable/versioned systems, critical terminology and high-impact messages have ownership, text changes receive security/legal/billing/privacy review when their meaning requires it, and CI may enforce spelling, terminology, capitalization, localization, and placeholder rules. AI-generated product copy is treated exactly like human-authored content and is not allowed to invent system guarantees, limits, recovery behavior, security claims, or policy.**

A production-grade UX writing system should make it easy to answer:

```text
What user need does this text serve?
Is this the canonical term for this concept?
Does the same concept use another name elsewhere?
Does the copy describe actual system behavior?
Is sentence case applied consistently?
Does this button say exactly what it does?
Can users understand the action without surrounding implementation knowledge?
If validation fails, do they know what to fix?
If an operation fails, do they know what happened and what they can do?
Are we blaming the user?
Is this an empty state, no-result state, loading state, permission state, or error?
Does the destructive action state what will actually be lost?
Is "permanent" technically accurate?
Can the action be undone or restored?
Would Undo be safer than a blocking confirmation?
Does success mean the operation really completed?
Can this copy be translated as one complete message?
Will translations fit without truncating important meaning?
Does the accessible name match the visible control?
Does any meaning depend only on color or position?
Are billing/security/privacy claims accurate?
Does this copy manipulate the user?
Who owns this terminology?
Can the content be reviewed and versioned?
```

If those questions cannot be answered reliably, product copy is functioning as incidental text rather than a governed UX system.

For capitalization, the canonical sentence-case rule aligns with Microsoft's current style guide, which uses sentence-style capitalization for most headings, UI labels, and buttons and explicitly discourages all-uppercase emphasis. Microsoft's guide was still receiving updates in July 2026, so this remains an actively maintained contemporary baseline. citeturn311108search0turn311108search6

For errors and validation, WCAG 2.2 requires automatically detected input errors to be identified and described in text. GOV.UK's current error-message guidance likewise recommends matching error wording to the field label, being concise and specific, and telling users how to correct the problem instead of using jargon or blame-oriented wording. citeturn311108search5turn311108search3

Microsoft's current interface-writing guidance also reinforces the operational rules above: buttons should use concise action language; dialogs should form a clear "question and response"; and errors should explain what happened and give a realistic recovery path without overwhelming the user. citeturn311108search1turn311108search12

Canonical master placement:

**… → Search → Notifications → Internationalization → Content & UX Writing → Testing → Performance → Observability → Analytics → Privacy & Data Governance → …**
