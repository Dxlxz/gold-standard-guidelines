---
id: "pattern"
title: "Pattern Guidelines — Gold Standard 2026"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "pattern"]
applies_to: ["team"]
related: ["routes", "file-media", "accessibility", "search", "component"]
legacy_number: 49
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 71400
provenance: baseline

---

Canonical placement: **Design Tokens → Layout → Facade → Components → Forms → Patterns → Accessibility → Responsive & Device**. Components define reusable primitives; Forms owns field/validation mechanics; **Patterns own recurring end-to-end interaction structures and state transitions**.

# Pattern Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for recurring product interaction patterns, including:

- CRUD;
- collections and lists;
- list/detail;
- search;
- filtering;
- sorting;
- pagination;
- selection;
- settings;
- onboarding;
- multi-step flows;
- wizards;
- task lists;
- review/check-answer flows;
- bulk actions;
- approval workflows;
- destructive actions;
- delete confirmation;
- import;
- export;
- completion and success states;
- drafts;
- asynchronous operations;
- recovery;
- permissions;
- responsive behavior;
- accessibility;
- observability;
- testing.

A **pattern** is a reusable interaction solution for a recurring user task.

Patterns sit above individual components.

Conceptually:

```text
Design Tokens
↓
Components
↓
Forms
↓
Patterns
↓
Product workflows
```

The core principle is:

> **Use a consistent proven interaction pattern for a recurring user problem, while allowing domain-specific content and business rules to vary.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions follow Governance Guidelines.

---

# 3. Pattern vs Component

A component is a reusable UI primitive.

Examples:

```text
Button
Input
Dialog
Table
Tabs
Combobox
Toast
```

A pattern combines components into a meaningful workflow.

Examples:

```text
Create record
Filter collection
Delete account
Approve request
Import CSV
Configure settings
```

---

# 4. Pattern vs Feature

A pattern describes reusable interaction behavior.

A feature applies one or more patterns to a domain.

Example:

```text
Pattern:
List + Filter + Bulk Action

Feature:
Invoice Management
```

---

# 5. Pattern vs Business Rule

Patterns MUST NOT become the source of domain policy.

Example:

```text
Pattern:
Delete confirmation

Domain rule:
Invoices cannot be deleted after finalization
```

The business rule remains in the domain layer.

---

# 6. Pattern vs Route

Routes Guidelines own:

```text
URL structure
route hierarchy
query-state semantics
navigation/history
```

Patterns consume those contracts.

---

# 7. Pattern vs Form

Forms Guidelines own:

```text
field semantics
validation
submission mechanics
error association
```

Patterns define when forms appear and how they fit into the workflow.

---

# 8. Pattern vs Component

Component Guidelines own individual widget anatomy, states, keyboard behavior, and accessibility.

Pattern Guidelines MUST reuse those components rather than recreate them locally.

---

# 9. Pattern vs Search

Search Guidelines own:

```text
index architecture
ranking
typo tolerance
permissions
search backend
```

Pattern Guidelines own the search interaction experience.

---

# 10. Pattern vs Files

File & Media Guidelines own:

```text
upload security
MIME validation
storage
scanning
signed URLs
```

Pattern Guidelines own import/export workflow UX.

---

# 11. Pattern Hierarchy

Prefer:

```text
Existing canonical pattern
↓
Small pattern extension
↓
Documented product-specific pattern
↓
New canonical pattern
```

---

# 12. Do Not Invent Per Feature

Teams SHOULD NOT independently reinvent:

```text
Delete confirmation
Table filtering
Bulk selection
Settings navigation
Wizard progression
```

for every feature.

---

# 13. Pattern Registry

Canonical product patterns SHOULD have a registry containing:

```text
Name
Purpose
When to use
When not to use
Anatomy
States
Components
Accessibility
Responsive behavior
Examples
Owner
```

---

# 14. Pattern Ownership

Every canonical pattern SHOULD have an owner.

---

# 15. Pattern State Model

Patterns MUST define relevant states.

Common states include:

```text
Initial
Loading
Populated
Empty
Filtered-empty
Partial
Saving
Success
Error
Disabled
Unauthorized
```

---

# 16. State Completeness

A pattern is incomplete if it defines only the happy path.

---

# 17. Pattern Selection

Choose a pattern based on:

```text
User goal
Frequency
Risk
Information volume
Complexity
Reversibility
Device constraints
```

not visual preference alone.

---

# 18. User Goal First

Pattern selection starts from:

> **What is the user trying to accomplish?**

not:

> **Which component can we place here?**

---

# 19. Minimize Interaction Cost

Patterns SHOULD minimize unnecessary:

```text
Clicks
Screens
Fields
Decisions
Context switches
```

without hiding important consequences.

---

# 20. Progressive Disclosure

Expose complexity only when the user needs it.

---

# 21. Preserve Context

Patterns SHOULD preserve relevant context across:

```text
navigation
editing
errors
back navigation
tenant switching
```

where safe.

---

# 22. Explicit Completion

Users SHOULD know when a meaningful operation is complete.

---

# 23. Explicit Failure

Users MUST know when an operation failed or only partially completed.

---

# 24. Recoverability

Patterns SHOULD provide a clear recovery path after errors.

---

# 25. Undo vs Confirmation

For reversible low-risk actions, prefer:

```text
Action
+
Undo
```

over unnecessary confirmation.

---

# 26. Confirmation vs Undo

For irreversible/high-impact actions, confirmation SHOULD occur before execution.

---

# 27. Risk-Calibrated Friction

Interaction friction MUST correspond to consequence.

---

# 28. Do Not Confirm Everything

Routine reversible actions SHOULD NOT require confirmation.

---

# 29. Do Not Hide High Risk

Critical consequences MUST NOT be buried in subtle copy or hover text.

---

# 30. Page vs Dialog

Prefer a page when the task:

```text
Is complex
Has several fields
Needs deep linking
Needs substantial context
May take time
```

---

# 31. Dialog Use

Prefer a dialog when the task:

```text
Is focused
Is short
Preserves parent context
Can be completed quickly
```

---

# 32. Avoid Dialog Workflows

Do not place entire complex workflows inside nested dialogs.

---

# 33. Drawer Use

A drawer MAY be appropriate for contextual:

```text
inspection
quick edit
secondary workflow
```

when maintaining list context is useful.

---

# 34. Drawer Is Not Universal

Do not use a drawer simply because it feels modern.

---

# 35. CRUD Pattern

CRUD encompasses:

```text
Create
Read
Update
Delete
```

but these operations do not necessarily deserve symmetrical UX.

---

# 36. CRUD Resource Identity

Every CRUD workflow MUST make the resource being acted upon clear.

---

# 37. Create Pattern

Create flows SHOULD answer:

```text
What am I creating?
What information is required?
What happens when I submit?
Where will I go afterward?
```

---

# 38. Create Entry Point

Use an explicit action label.

Prefer:

```text
Create project
Add member
New invoice
```

over:

```text
Add
New
+
```

when ambiguity exists.

---

# 39. Create Destination

Creation MAY use:

```text
Dedicated page
Dialog
Inline form
Wizard
```

depending on task complexity.

---

# 40. Simple Creation

Use a focused dialog or inline pattern only when creation is short and low complexity.

---

# 41. Complex Creation

Use a dedicated page or wizard when:

```text
many fields
dependencies
review required
multiple steps
high consequences
```

exist.

---

# 42. Create Defaults

Defaults SHOULD:

```text
be safe
reflect common intent
be reversible
```

---

# 43. Create Success

After creation, users SHOULD normally receive:

```text
Clear success indication
Created resource identity
Useful next action
```

---

# 44. Create Navigation

After creation, navigate to:

```text
detail page
relevant collection
next workflow step
```

according to likely user intent.

---

# 45. Create Duplicate Protection

Repeated submission MUST NOT accidentally create duplicate resources where duplication is harmful.

---

# 46. Read Pattern

Read/detail experiences SHOULD emphasize:

```text
Identity
Status
Important attributes
Relationships
Available actions
History where relevant
```

---

# 47. Detail Page Header

A detail page SHOULD clearly display:

```text
Resource name/title
Resource type/context
Status
Primary actions
```

---

# 48. Detail Hierarchy

Important operational information appears before low-value metadata.

---

# 49. Detail Sections

Large details SHOULD be grouped into meaningful sections.

---

# 50. Detail Tabs

Tabs MAY be used when sections:

```text
are peers
remain within one resource
can be understood independently
```

---

# 51. Tabs vs Navigation

Do not use tabs to disguise fundamentally separate pages.

---

# 52. Deep Link Detail Sections

Important detail subsections MAY require distinct routes rather than tab-only state.

---

# 53. Edit Pattern

Edit flows MUST make the current resource and editable scope clear.

---

# 54. Edit Scope

Prefer focused editing of coherent fields rather than unnecessarily exposing the entire object.

---

# 55. Edit Entry

Use explicit:

```text
Edit details
Change billing address
Rename project
```

when scope matters.

---

# 56. View/Edit Separation

Read-only views SHOULD NOT look editable unless they are interactive.

---

# 57. Inline Editing

Inline editing MAY be used for:

```text
small
frequent
low-risk
independent
```

changes.

---

# 58. Avoid Inline Editing for Complex Forms

Complex dependent values SHOULD use a proper form workflow.

---

# 59. Dirty State

Edit workflows MUST define behavior when leaving with unsaved changes.

---

# 60. Save Pattern

Use explicit save behavior when changes should be committed as one operation.

---

# 61. Autosave

Autosave SHOULD only be used when:

```text
state is recoverable
save status is visible
conflicts are handled
```

---

# 62. Autosave Feedback

Autosave SHOULD expose:

```text
Saving…
Saved
Save failed
```

when useful.

---

# 63. Optimistic Update

Optimistic UI MAY be used for low-risk reversible mutations.

---

# 64. Optimistic Failure

If optimistic mutation fails:

```text
restore/reconcile state
show failure
preserve user intent where possible
```

---

# 65. Delete Pattern

Delete is not merely another CRUD button.

Deletion requires lifecycle semantics.

---

# 66. Delete Meaning

Before implementing Delete, define whether it means:

```text
Archive
Disable
Remove membership
Soft delete
Hard delete
Purge
```

---

# 67. Prefer Reversible Lifecycle

Where domain semantics permit:

```text
Archive
Disable
Trash
```

SHOULD be preferred over immediate permanent deletion.

---

# 68. Permanent Delete

Permanent deletion MUST clearly state irreversibility.

---

# 69. List Pattern

A collection/list pattern enables users to:

```text
Discover
Scan
Compare
Filter
Sort
Select
Open
Act
```

on multiple resources.

---

# 70. Choose List Representation

Common representations:

```text
Simple list
Cards
Table
Data grid
Tree
Timeline
```

Choose according to user task.

---

# 71. Table Use

Use a table when users need to compare structured values across rows.

---

# 72. Card Use

Use cards when:

```text
items are heterogeneous
visual identity matters
comparison across many columns does not
```

---

# 73. Simple List

Use a simple list when users primarily need:

```text
scan
navigate
perform one or two row actions
```

---

# 74. Data Grid

Use an interactive grid only when users need spreadsheet-like:

```text
keyboard navigation
cell editing
complex selection
```

behavior.

---

# 75. Do Not Use Grid for Ordinary Table

A normal table SHOULD remain a normal table when spreadsheet interaction is unnecessary.

---

# 76. Collection Header

A collection SHOULD show relevant:

```text
Title
Count where useful
Primary create action
Search/filter controls
Bulk controls when active
```

---

# 77. Result Count

Result count SHOULD describe the current collection/filter state where useful.

---

# 78. Count Accuracy

Do not display a misleading global count next to filtered results.

---

# 79. Primary Row Identity

Each row/item MUST have an obvious primary identity.

---

# 80. Row Navigation

The resource name/title SHOULD generally be the primary navigation link.

---

# 81. Clickable Rows

Whole-row click targets MAY improve usability.

They MUST NOT obscure:

```text
links
buttons
selection
keyboard behavior
```

---

# 82. Row Actions

Frequently used row actions MAY be visible.

Secondary actions SHOULD often use an overflow menu.

---

# 83. Avoid Action Clutter

Do not place many equally prominent buttons in every row.

---

# 84. Status

Status SHOULD use canonical Badge/Status components.

---

# 85. Empty Collection

An empty collection SHOULD explain:

```text
What this area contains
Why it is empty where useful
What the user can do next
```

---

# 86. First-Use Empty State

For zero created resources, prioritize the creation path.

---

# 87. Filtered Empty State

When filters produce zero results, distinguish this from no resources existing.

Example:

```text
No projects match these filters.
```

---

# 88. Filtered Empty Recovery

Provide:

```text
Clear filters
Modify search
```

where useful.

---

# 89. Loading Collection

Loading state SHOULD preserve expected layout where feasible.

---

# 90. Error Collection

Collection load errors SHOULD offer an appropriate retry/recovery path.

---

# 91. Sorting

Sortable collections MUST clearly indicate:

```text
Sortable column
Current sort key
Current direction
```

---

# 92. Default Sort

Default sorting MUST be intentional.

---

# 93. Stable Sort

Results SHOULD have deterministic secondary ordering when primary values tie.

---

# 94. Sort URL State

Shareable meaningful sort state SHOULD follow Routes Guidelines and normally live in the URL.

---

# 95. Pagination

Pagination SHOULD be used when:

```text
result sets are large
users need predictable navigation
```

---

# 96. Infinite Scroll

Infinite scroll SHOULD NOT be the default for operational/business collections.

---

# 97. Pagination Position

Long tables MAY expose pagination at appropriate top/bottom positions.

---

# 98. Page Size

Page size controls SHOULD only be offered when user benefit justifies additional complexity.

---

# 99. Pagination Reset

Changing major filters SHOULD normally reset to a valid page.

---

# 100. Result Stability

Pagination MUST define behavior when underlying results change.

---

# 101. Cursor Pagination

Backend pagination semantics follow API/Data Guidelines.

The UI MAY still present conventional next/previous controls.

---

# 102. Search Pattern

Search is appropriate when users know or can describe what they seek.

---

# 103. Search vs Filter

Search answers:

> **Which items match this query?**

Filters answer:

> **Which subset matches these structured criteria?**

---

# 104. Search Field

The search field SHOULD identify its scope.

Examples:

```text
Search projects
Search users
Search invoices
```

---

# 105. Search Submit

Search MAY execute:

```text
on explicit submit
after debounce
```

depending on latency and semantics.

---

# 106. Search-as-You-Type

Search-as-you-type SHOULD only be used when:

```text
responses are fast enough
requests are bounded
result changes are understandable
```

---

# 107. Debounce

High-frequency remote searches SHOULD use suitable request control/debouncing.

---

# 108. Search Loading

Users SHOULD receive visible feedback for delayed search.

---

# 109. Search Query State

Meaningful search queries SHOULD generally be represented in URL state when the results are shareable/navigation-relevant.

---

# 110. Search Persistence

Returning from a detail page SHOULD normally preserve the user's collection/search context.

---

# 111. Search No Results

No-result state SHOULD display the effective query.

---

# 112. Search No-Result Guidance

Useful recovery MAY include:

```text
Check spelling
Broaden terms
Remove filters
Clear search
```

---

# 113. No Fake Results

Do not silently show unrelated items when exact search produced no results unless they are clearly labelled as suggestions.

---

# 114. Search Highlighting

Matching terms MAY be highlighted when it aids scanning.

---

# 115. Search Security

Search MUST respect permissions and tenant boundaries before results/counts/facets reach the UI.

---

# 116. Filter Pattern

Filters refine a known collection using structured dimensions.

---

# 117. Filter Types

Common filters include:

```text
Status
Owner
Date
Category
Range
Boolean
Tag
Tenant-scoped attribute
```

---

# 118. Filter Component Choice

Use:

```text
Checkboxes for multi-select
Radio/select for one-of-many
Date controls for dates
Range controls for bounded numbers
```

according to Component/Form Guidelines.

---

# 119. Filter Location

Filters MAY appear:

```text
Inline toolbar
Sidebar
Drawer/sheet
```

depending on count and viewport.

---

# 120. Desktop Filters

A sidebar MAY work well for many persistent filters.

---

# 121. Mobile Filters

On small viewports, complex filter panels SHOULD normally recompose into a sheet/dialog/dedicated view.

---

# 122. Applied Filters

Applied filters MUST remain visible or easily discoverable.

---

# 123. Filter Chips

Removable filter chips MAY summarize active criteria.

---

# 124. Clear Filter

Users SHOULD be able to clear:

```text
one filter
all filters
```

when multiple filters are applied.

---

# 125. Filter Count

A filter control MAY indicate the number of active filters.

---

# 126. Apply Button

Use explicit Apply when:

```text
filtering is expensive
many fields change together
mobile drawer commits a batch
```

---

# 127. Immediate Filtering

Immediate application is suitable when updates are:

```text
fast
predictable
not disruptive
```

---

# 128. Filter Results Feedback

After applying filters, focus/announcement behavior MUST make result updates understandable.

---

# 129. URL Filter State

Shareable/reload-safe filters SHOULD generally live in the URL.

---

# 130. Default Filters

Hidden/default filters MUST NOT mislead users about the collection's real scope.

---

# 131. Permission Filters

Never expose unauthorized options/counts through filter controls.

---

# 132. Saved Views

Frequently reused filter/sort/search configurations MAY be saved as views.

---

# 133. Saved View State

Saved views SHOULD contain:

```text
Filter
Sort
Visible columns where supported
```

not hidden security permissions.

---

# 134. Default View

Users MAY choose a default saved view where useful.

---

# 135. View Ownership

Saved views SHOULD clearly distinguish:

```text
Personal
Shared
System
```

views.

---

# 136. List/Detail Pattern

List/detail combines collection browsing with resource inspection.

---

# 137. Dedicated Detail Page

Use a dedicated detail page when:

```text
resource has substantial information
deep links matter
workflow is complex
```

---

# 138. Split View

A split list/detail view MAY work well for rapid inspection workflows.

---

# 139. Split View Requirement

The selected item MUST remain visually and semantically clear.

---

# 140. Split View URL

Selection SHOULD be route-addressable when deep linking/history matters.

---

# 141. Mobile Split View

Split view SHOULD normally recompose to separate screens on narrow devices.

---

# 142. Back to Results

Returning from detail SHOULD preserve:

```text
Search
Filters
Sort
Page
Scroll position where useful
```

---

# 143. Settings Pattern

Settings manage persistent configuration rather than a one-time workflow.

---

# 144. Settings Structure

Group settings by user mental model.

Examples:

```text
Profile
Notifications
Security
Billing
Integrations
Advanced
```

---

# 145. Avoid Settings Dump

Do not create one giant page containing every application option.

---

# 146. Settings Navigation

Large settings areas SHOULD use stable route-based navigation.

---

# 147. Settings Search

Very large enterprise settings systems MAY provide settings search.

---

# 148. Settings Labels

Labels SHOULD describe the setting outcome.

---

# 149. Boolean Settings

Use switches only for immediate binary settings.

---

# 150. Switch Semantics

A switch SHOULD generally take effect when toggled.

If a Save button is required for a group, a checkbox may better represent pending form state.

---

# 151. Settings Save Model

Do not mix:

```text
some controls autosave
some require Save
```

without making behavior obvious.

---

# 152. Settings Scope

The UI MUST make scope explicit:

```text
My settings
Workspace settings
Organization settings
System settings
```

---

# 153. Privileged Settings

Administrative/security settings require appropriate authorization.

---

# 154. Dangerous Settings

High-impact settings SHOULD separate ordinary configuration from dangerous operations.

---

# 155. Settings Defaults

Defaults SHOULD be understandable and safe.

---

# 156. Reset to Default

Where useful, allow restoration to product/system defaults.

---

# 157. Settings Dependencies

When one setting controls another, dependency SHOULD be visually and semantically clear.

---

# 158. Disabled Dependent Setting

Explain why a dependent setting is unavailable when necessary.

---

# 159. Onboarding Pattern

Onboarding helps a new user reach meaningful first value.

---

# 160. Onboarding Goal

Onboarding SHOULD optimize:

```text
time to meaningful value
```

not completion of every possible configuration task.

---

# 161. Do Not Teach Everything

Do not front-load every feature during onboarding.

---

# 162. Required vs Optional

Onboarding MUST distinguish:

```text
Required
Recommended
Optional
```

steps.

---

# 163. Skip

Optional onboarding steps SHOULD normally be skippable.

---

# 164. Resume

Long onboarding SHOULD be resumable.

---

# 165. Progress

Progress SHOULD be shown when the process contains meaningful multiple steps.

---

# 166. Progress Accuracy

Progress MUST reflect actual required completion.

Avoid fake:

```text
90% complete
```

when substantial work remains.

---

# 167. Onboarding Checklist

A checklist/task-list pattern MAY be useful when users can complete setup tasks in flexible order.

---

# 168. Linear Onboarding

A wizard is better when steps have strict dependencies.

---

# 169. Contextual Onboarding

Teach advanced features contextually rather than forcing them into initial setup.

---

# 170. Empty-State Onboarding

Product empty states MAY act as contextual onboarding.

---

# 171. Onboarding Completion

Completion SHOULD direct the user to the primary product experience.

---

# 172. Revisit

Users SHOULD be able to access relevant setup/settings after onboarding.

---

# 173. Wizard Pattern

A wizard is a sequence of steps required to complete one coherent task.

---

# 174. Wizard Use

Use a wizard when:

```text
task is complex
information has dependencies
staging reduces cognitive load
```

---

# 175. Avoid Wizard for Simple Form

Do not split a short straightforward form into many unnecessary pages.

---

# 176. Wizard State

Wizard state MUST have a clear authoritative owner.

---

# 177. Wizard URLs

Important wizard steps SHOULD use stable route semantics when reload/back navigation must work.

---

# 178. Step Indicator

A wizard SHOULD show progress where users benefit from knowing:

```text
current step
remaining work
```

---

# 179. Step Names

Prefer meaningful step names over:

```text
Step 1
Step 2
Step 3
```

alone.

---

# 180. Back Navigation

Users SHOULD normally be able to return to previous steps without losing completed data.

---

# 181. Browser Back

Browser Back MUST not corrupt wizard state.

---

# 182. Step Validation

Validate information needed for the current step before proceeding.

---

# 183. Deferred Validation

Cross-step/business validation MAY occur later when dependent information becomes available.

---

# 184. Branching Wizard

Conditional steps SHOULD be derived from authoritative answers.

---

# 185. Hidden Steps

When a prior answer changes, now-invalid downstream data MUST be:

```text
cleared
revalidated
or deliberately retained
```

according to domain semantics.

---

# 186. Save and Resume

Long or high-effort wizards SHOULD support save/resume where feasible.

---

# 187. Draft State

Incomplete wizard records SHOULD be explicitly represented as drafts where they persist.

---

# 188. Draft vs Submitted

Draft data MUST remain semantically distinct from submitted/committed business state.

---

# 189. Review Step

Consequential multi-step transactions SHOULD provide a final review/check-answer stage.

---

# 190. Review Contents

The review should show:

```text
Important submitted values
Grouped sections
Change links/actions
Final consequence
```

---

# 191. Change From Review

Users SHOULD be able to edit an answer and return predictably to the review step.

---

# 192. Final Submit

The final action MUST clearly communicate the commitment.

Prefer:

```text
Submit application
Place order
Create account
Approve request
```

over:

```text
Continue
Next
```

for final commitment.

---

# 193. Final Submit Idempotency

Repeated final submission MUST NOT duplicate consequential transactions.

---

# 194. Confirmation Page

A completed significant transaction SHOULD have a clear confirmation/completion state.

---

# 195. Confirmation Contents

Confirmation SHOULD answer:

```text
What happened?
What is the reference/resource?
What happens next?
When?
What can I do now?
```

---

# 196. Confirmation ≠ Toast

A toast alone SHOULD NOT be the sole completion feedback for a major transaction.

---

# 197. Task List Pattern

A task list is suitable for long processes where:

```text
multiple tasks exist
tasks may span sessions
order may be flexible
```

---

# 198. Task List Status

Each task SHOULD have explicit state such as:

```text
Not started
In progress
Complete
Cannot start yet
```

---

# 199. Task Dependencies

Blocked tasks SHOULD explain required preceding work where useful.

---

# 200. Approval Workflow

Approval patterns govern requests that require another authorized actor to decide.

---

# 201. Approval Domain Model

Approval SHOULD have explicit states.

Example:

```text
Draft
Submitted
Pending approval
Approved
Rejected
Canceled
Expired
```

---

# 202. Requester ≠ Approver

Where separation of duties is required, the requester MUST NOT approve their own request.

---

# 203. Approval Request

An approval request SHOULD show:

```text
Requester
Target
Requested change
Reason
Evidence/context
Time
```

---

# 204. Approval Decision

Approvers MUST see the exact action they are authorizing.

---

# 205. Approve Button

Use explicit:

```text
Approve request
Reject request
```

rather than generic:

```text
Confirm
```

---

# 206. Rejection Reason

Rejection MAY require a reason where it assists accountability or resubmission.

---

# 207. Approval Mutation

Changing material request parameters after approval MUST invalidate the approval.

---

# 208. Approval Expiry

High-risk approval MAY expire if not executed in time.

---

# 209. Approval Audit

Approval workflows MUST retain:

```text
Requester
Approver
Decision
Timestamp
Reason
Final executed state
```

where auditability matters.

---

# 210. Multi-Stage Approval

Use multiple stages only where policy truly requires them.

---

# 211. Avoid Approval Bureaucracy

Do not create approval workflows merely because an operation feels important.

Use risk and separation-of-duties requirements.

---

# 212. Bulk Action Pattern

Bulk actions apply one operation to multiple selected records.

---

# 213. Bulk Eligibility

Only expose bulk actions meaningful for the selected resources.

---

# 214. Selection

Selection MUST be distinct from row navigation.

---

# 215. Row Checkbox

Tables commonly use a dedicated selection checkbox.

---

# 216. Select All Semantics

"Select all" MUST identify its scope.

Possible scopes:

```text
Current page
Loaded rows
All filtered results
Entire collection
```

---

# 217. Select All Filtered

When selecting all matching results, communicate the total explicitly.

Example:

```text
All 4,218 matching users selected.
```

---

# 218. Bulk Toolbar

Bulk controls SHOULD appear prominently once selection exists.

---

# 219. Selection Count

Show the selected count.

---

# 220. Mixed Eligibility

If only some selected items support an action, the UI SHOULD:

```text
disable with explanation
exclude clearly
or require refined selection
```

rather than fail mysteriously.

---

# 221. Bulk Preview

High-impact bulk actions SHOULD preview:

```text
Action
Count
Scope
Important consequences
```

---

# 222. Bulk Confirmation

Confirmation should be proportional to impact.

---

# 223. Bulk Async

Large bulk operations SHOULD normally execute asynchronously.

---

# 224. Bulk Job

Long-running bulk operations SHOULD have a trackable job state.

---

# 225. Bulk Progress

Expose:

```text
Queued
Processing
Succeeded
Partially succeeded
Failed
Canceled
```

as applicable.

---

# 226. Partial Failure

Bulk workflows MUST define partial failure semantics.

---

# 227. Bulk Result

After completion, show:

```text
Succeeded count
Failed count
Skipped count
```

where applicable.

---

# 228. Retry Failed

Users SHOULD be able to retry failed subset where safe.

---

# 229. Bulk Idempotency

Retry MUST NOT duplicate already successful effects.

---

# 230. Bulk Cancel

Cancelable jobs MAY support cancellation if business semantics permit.

---

# 231. Selection After Action

After a completed bulk action, selection SHOULD normally be cleared or reconciled.

---

# 232. Destructive Action Pattern

A destructive action permanently or materially reduces:

```text
Data
Access
Ownership
Configuration
```

---

# 233. Destructive Action Placement

Destructive actions SHOULD be visually separated from common positive actions.

---

# 234. Destructive Label

Use exact consequence.

Prefer:

```text
Delete project
Remove member
Revoke API key
Cancel subscription
```

---

# 235. Delete Confirmation Need

Permanent or high-impact deletion SHOULD require explicit confirmation.

---

# 236. Delete Dialog Context

Confirmation MUST identify:

```text
Object
Consequence
Reversibility
```

---

# 237. Delete Confirmation Copy

Bad:

```text
Are you sure?
```

Better:

```text
Delete “Quarterly Report”?

This permanently deletes the report and cannot be undone.
```

---

# 238. Confirmation Button

The final button should repeat the action.

Example:

```text
Delete report
```

not:

```text
Yes
```

---

# 239. Typed Confirmation

Typed confirmation MAY be appropriate when deleting:

```text
Tenant
Production environment
Large dataset
Critical resource
```

---

# 240. Do Not Overuse Typed Confirmation

Do not require typing names for routine low-impact deletion.

---

# 241. Secondary Confirmation

Multiple consecutive confirmation dialogs SHOULD be avoided.

Use one well-designed confirmation unless policy requires multiple approvals.

---

# 242. Referential Impact

Delete confirmation SHOULD expose meaningful dependent impact.

Example:

```text
23 scheduled jobs will also be removed.
```

---

# 243. Delete In Progress

Large deletion MAY become an asynchronous lifecycle state.

---

# 244. Delete Success

After deletion, navigate to a valid context and clearly confirm outcome.

---

# 245. Undo Delete

Soft delete/trash MAY provide Undo when reliable.

---

# 246. Import Pattern

Import converts external user-supplied data into application state.

It MUST be designed as a staged workflow.

---

# 247. Canonical Import Flow

```text
Select/upload source
↓
Validate file
↓
Parse
↓
Map fields/options
↓
Validate records
↓
Review
↓
Import
↓
Results/reconciliation
```

---

# 248. Import Is Not Immediate Upload

Uploading a file SHOULD NOT automatically commit its contents to production data unless the format/workflow is extremely controlled.

---

# 249. Import Template

Where a structured input format is expected, provide:

```text
Template
Example
Schema/documentation
```

---

# 250. Import Limits

Before upload, communicate useful constraints such as:

```text
Accepted format
Size
Record limits
Required fields
```

---

# 251. Upload Security

Actual file validation, MIME verification, storage, and scanning follow File & Media Guidelines.

---

# 252. Import Parse

Parsing errors MUST distinguish file-level failure from row-level data failure.

---

# 253. Import Mapping

Column mapping SHOULD be offered when external column names vary.

---

# 254. Automatic Mapping

Automatic column mapping MAY suggest mappings.

The user SHOULD be able to review ambiguous matches.

---

# 255. Import Validation

Validate before commit where practical.

---

# 256. Row Validation

Validation results SHOULD identify:

```text
Row
Field
Problem
Expected correction
```

---

# 257. Error Download

Large import errors MAY be downloadable as a correction report.

---

# 258. Import Preview

Before mutation, show:

```text
Records to create
Records to update
Records to skip
Records with errors
```

where semantics permit.

---

# 259. Upsert Semantics

Imports MUST define whether existing records are:

```text
Rejected
Updated
Merged
Ignored
```

---

# 260. Upsert Identity

Matching/upsert keys MUST be explicit and tenant-safe.

---

# 261. Import Dry Run

Large/high-risk imports SHOULD support dry-run validation.

---

# 262. Import Atomicity

Import MUST define:

```text
All-or-nothing
Partial commit
Batch commit
```

semantics.

---

# 263. Partial Import

If valid rows can succeed while invalid rows fail, this MUST be communicated before execution.

---

# 264. Import Idempotency

Re-uploading/retrying the same import SHOULD NOT create unintended duplicates.

---

# 265. Import Job

Large imports SHOULD run asynchronously.

---

# 266. Import Status

Expose:

```text
Queued
Validating
Importing
Complete
Complete with errors
Failed
```

---

# 267. Import Resume

Restartable import jobs SHOULD resume safely after infrastructure failure where practical.

---

# 268. Import Cancellation

Cancellation MAY be offered before irreversible commits or between safe batches.

---

# 269. Import Audit

High-impact imports SHOULD record:

```text
Actor
Tenant
File/import ID
Counts
Result
Timestamp
```

---

# 270. Import Retention

Uploaded source files and error files MUST follow privacy/retention policy.

---

# 271. Export Pattern

Exports transform application data into a downloadable/transferable artifact.

---

# 272. Export Scope

Before export, users SHOULD understand:

```text
Dataset
Filters
Date range
Fields
Format
```

---

# 273. Export Current View

"Export" MUST state whether it exports:

```text
Visible rows
Selected rows
All matching results
All data
```

---

# 274. Export Permission

Export authorization MUST be enforced server-side.

---

# 275. Sensitive Export

Sensitive/bulk export MAY require stronger permission, audit, or approval.

---

# 276. Export Format

Formats SHOULD match intended use.

Examples:

```text
CSV
XLSX
JSON
PDF
```

---

# 277. CSV Safety

CSV exports SHOULD account for spreadsheet-formula injection where relevant.

---

# 278. Export Small Dataset

Small exports MAY download synchronously.

---

# 279. Export Large Dataset

Large exports SHOULD run asynchronously.

---

# 280. Export Job Pattern

Canonical flow:

```text
Request export
↓
Confirm scope
↓
Generate asynchronously
↓
Notify when ready
↓
Download
↓
Expire artifact
```

---

# 281. Export Progress

Do not show fake percentage progress unless actual progress is measurable.

---

# 282. Export Completion

The UI SHOULD show:

```text
Ready
Failed
Expired
```

states.

---

# 283. Export Expiry

Sensitive generated files SHOULD expire.

---

# 284. Export Reauthorization

Downloading an export SHOULD re-check authorization where applicable.

---

# 285. Export Audit

Sensitive export creation/download SHOULD be auditable.

---

# 286. Import/Export Tenant Isolation

Import and export MUST preserve tenant context end-to-end.

---

# 287. Confirmation Pattern

Confirmation communicates successful completion of a meaningful transaction.

---

# 288. Success Notification vs Confirmation Page

Use a lightweight notification/toast when the user remains inside the same workflow.

Use a dedicated confirmation state/page after a major completed transaction.

---

# 289. Toast Use

Toast is suitable for:

```text
Saved
Copied
Archived
Minor update completed
```

---

# 290. Toast Limits

Toast MUST NOT be the only channel for:

```text
Critical failure
Validation errors
Major completion
Required next action
```

---

# 291. Persistent Outcome

Important outcome messages SHOULD remain visible long enough to be understood.

---

# 292. Status Message Accessibility

Dynamic outcomes SHOULD use appropriate accessible status/alert behavior without stealing focus unnecessarily.

---

# 293. Error Recovery Pattern

Errors SHOULD appear near the context where users can fix them.

---

# 294. Page-Level Error

A page-level summary SHOULD complement field-level validation when multiple errors exist.

---

# 295. Server Error

Unexpected server failures SHOULD preserve user-entered data where safe.

---

# 296. Retry

Retry actions SHOULD only be offered where retry may reasonably succeed.

---

# 297. Unknown Outcome

If the system cannot know whether a mutation succeeded, do not tell the user simply to repeat it.

Provide:

```text
Status lookup
Reconciliation
Safe retry
```

as appropriate.

---

# 298. Permission-Aware Patterns

Patterns MUST account for:

```text
Read-only user
Editor
Approver
Admin
Unauthorized
```

states where applicable.

---

# 299. Hide vs Disable

Use hiding when the action is irrelevant or unauthorized.

Use disabled state when understanding the unavailable action provides value and explanation exists.

---

# 300. Security Authorization

Whether an action is visible does not determine whether it is permitted.

The server MUST enforce authorization.

---

# 301. Tenant Context

Multi-tenant workflows MUST keep the current tenant clear wherever acting on the wrong tenant has consequences.

---

# 302. Tenant Switch

Tenant switching MUST reconcile:

```text
Lists
Filters
Selections
Forms
Wizards
Bulk actions
Exports
```

according to Multi-Tenancy Guidelines.

---

# 303. Loading Pattern

Loading indicators SHOULD match expected duration and layout.

---

# 304. Skeleton

Skeletons MAY be useful for known stable content structures.

---

# 305. Spinner

Spinners MAY indicate short indeterminate operations.

---

# 306. Long Operation

Long-running tasks SHOULD become explicit background-job states instead of indefinite spinner screens.

---

# 307. Progress Bar

Use deterministic progress only when meaningful progress can be measured.

---

# 308. Cancellation

Long-running user-initiated workflows SHOULD support cancellation where technically safe and useful.

---

# 309. Responsive Patterns

Patterns MUST recompose—not merely shrink—when needed.

---

# 310. Responsive Table

Wide data tables MAY use:

```text
Horizontal scroll
Priority columns
Responsive detail views
```

according to Responsive Guidelines.

---

# 311. Do Not Cardify Blindly

Do not convert every table row into an enormous mobile card automatically.

Preserve the user's comparison task.

---

# 312. Mobile Bulk Actions

Bulk selection/action controls MUST remain usable on touch devices.

---

# 313. Mobile Filter

Filters SHOULD remain discoverable after moving into a mobile sheet/dialog.

---

# 314. Mobile Wizard

Wizard navigation MUST keep:

```text
Back
Continue
Progress
```

clear on narrow viewports.

---

# 315. Sticky Controls

Sticky actions MAY be useful for long forms/tables.

They MUST not obscure content or keyboard focus.

---

# 316. Accessibility Baseline

All patterns MUST follow Accessibility Guidelines and WCAG 2.2 AA organizational baseline.

---

# 317. Native Semantics

Prefer native semantic HTML and established component semantics.

---

# 318. ARIA Pattern Use

If implementing ARIA widgets such as:

```text
Dialog
Tabs
Combobox
Grid
```

follow the canonical Component Guidelines and relevant WAI-ARIA Authoring Practices.

---

# 319. Dialog Focus

Modal workflows MUST correctly manage:

```text
Initial focus
Focus containment
Escape/close behavior
Focus restoration
```

---

# 320. Table Semantics

Ordinary data tables SHOULD remain semantic tables.

Interactive grid behavior should only be introduced when needed.

---

# 321. Keyboard

Every pattern MUST be usable with keyboard-only input.

---

# 322. Focus After Navigation

After workflow navigation or major content replacement, focus MUST move/behave predictably.

---

# 323. Focus After Delete

After deleting an item from a collection, focus SHOULD return to a logical surviving context.

---

# 324. Focus After Dialog

Closing a dialog SHOULD normally restore focus to the invoking control or another logical target.

---

# 325. Focus After Errors

Validation workflows SHOULD direct users toward the relevant error context.

---

# 326. Dynamic Result Announcement

Search/filter result changes SHOULD be announced appropriately to assistive technology when updates occur without navigation.

---

# 327. Color

Pattern state MUST NOT be communicated through color alone.

---

# 328. Status Text

Status such as:

```text
Approved
Pending
Failed
```

SHOULD have textual representation.

---

# 329. Touch

Interactive controls MUST meet the accessibility/device target requirements defined elsewhere.

---

# 330. Localization

Patterns MUST support:

```text
Longer translated text
Pluralization
Date/time differences
RTL
Different name/address formats
```

where applicable.

---

# 331. Do Not Hard-Code English Width

Pattern layouts SHOULD tolerate substantial text expansion.

---

# 332. Content

Pattern labels and messages follow Content & UX Writing Guidelines.

---

# 333. Explicit Verbs

Action labels SHOULD state the action.

Prefer:

```text
Create project
Save changes
Export invoices
Approve request
```

---

# 334. Avoid Generic Continue

Use `Continue` only when moving to another non-final step is genuinely the intended meaning.

---

# 335. Error Copy

Errors SHOULD explain:

```text
What went wrong
How to correct it
```

where possible.

---

# 336. Pattern Analytics

Analytics MAY measure:

```text
Start
Completion
Abandonment
Errors
Step drop-off
Bulk success/failure
```

according to Analytics Guidelines.

---

# 337. Do Not Autocapture Sensitive Fields

Pattern analytics MUST NOT indiscriminately capture form values or private data.

---

# 338. Funnel Interpretation

Wizard/onboarding drop-off does not automatically mean a UX defect.

Investigate intent and business constraints.

---

# 339. Observability

Operational pattern flows SHOULD expose failures in:

```text
Mutation
Background jobs
Imports
Exports
Approvals
```

through Observability Guidelines.

---

# 340. Pattern Tests

Canonical patterns SHOULD have reusable automated tests.

---

# 341. State Tests

Test:

```text
Loading
Empty
Populated
Filtered empty
Success
Failure
Unauthorized
```

where relevant.

---

# 342. Navigation Tests

Test:

```text
Back
Forward
Refresh
Deep link
Return from detail
```

for URL-aware patterns.

---

# 343. Selection Tests

Bulk patterns MUST test:

```text
single selection
page selection
all-results selection
selection after filtering
```

where supported.

---

# 344. Permission Tests

Test patterns under multiple roles.

---

# 345. Responsive Tests

Critical patterns MUST be tested on:

```text
Mobile
Tablet
Desktop
Keyboard
Touch/pointer
```

as applicable.

---

# 346. Accessibility Tests

Automated accessibility checks MUST be supplemented by manual keyboard/focus testing for complex patterns.

---

# 347. Pattern Review Checklist

```text
□ User goal clear
□ Existing pattern reused
□ States defined
□ Route/state behavior
□ Loading
□ Empty
□ Error
□ Success
□ Permission behavior
□ Mobile behavior
□ Keyboard/focus
□ Analytics/observability
□ Tests
```

---

# 348. CRUD Checklist

```text
□ Resource identity
□ Create entry
□ Validation
□ Duplicate protection
□ Detail hierarchy
□ Edit scope
□ Dirty state
□ Save behavior
□ Delete lifecycle semantics
□ Success navigation
```

---

# 349. List Checklist

```text
□ Appropriate representation
□ Primary identity
□ Status
□ Search
□ Filters
□ Sort
□ Pagination
□ Empty states
□ Row actions
□ Context preserved
```

---

# 350. Filter/Search Checklist

```text
□ Search scope
□ Search vs filter distinction
□ Active filters visible
□ Clear controls
□ Result count
□ URL state
□ Loading
□ Zero results
□ Permissions
□ Mobile behavior
```

---

# 351. Settings Checklist

```text
□ Scope clear
□ Grouping understandable
□ Save model consistent
□ Boolean control semantics
□ Dependencies
□ Permissions
□ Dangerous settings separated
□ Defaults
```

---

# 352. Onboarding Checklist

```text
□ First-value goal
□ Required/optional distinction
□ Skip where optional
□ Progress
□ Resume
□ Contextual education
□ Completion destination
```

---

# 353. Wizard Checklist

```text
□ Wizard justified
□ Meaningful steps
□ State ownership
□ Back navigation
□ Refresh
□ Validation
□ Branching
□ Draft behavior
□ Review step
□ Idempotent final submit
□ Confirmation
```

---

# 354. Bulk Action Checklist

```text
□ Selection semantics
□ Select-all scope
□ Selected count
□ Eligibility
□ Preview
□ Confirmation
□ Async execution
□ Partial failure
□ Retry
□ Idempotency
```

---

# 355. Approval Checklist

```text
□ Requester
□ Approver
□ Exact requested change
□ Evidence/reason
□ Separation of duties
□ Approval expiry
□ Mutation invalidates approval
□ Audit
```

---

# 356. Delete Checklist

```text
□ Delete semantics defined
□ Reversible alternative considered
□ Target identified
□ Consequences explained
□ Dependencies explained
□ Confirmation proportional
□ Explicit final button
□ Focus/navigation after completion
```

---

# 357. Import Checklist

```text
□ Supported format
□ File constraints
□ File security
□ Parsing
□ Mapping
□ Validation
□ Preview
□ Upsert policy
□ Partial failure policy
□ Dry run
□ Idempotency
□ Async job
□ Audit
```

---

# 358. Export Checklist

```text
□ Scope clear
□ Permissions
□ Filters represented
□ Format
□ Sensitive fields
□ Async threshold
□ Expiry
□ Reauthorization
□ Audit
□ Tenant isolation
```

---

# 359. Definition of Done — New Pattern

A canonical pattern is ready when:

```text
✓ User problem defined
✓ When-to-use defined
✓ When-not-to-use defined
✓ Anatomy defined
✓ States defined
✓ Components reused
✓ Route/state semantics defined
✓ Loading/error/empty/success defined
✓ Accessibility behavior defined
✓ Responsive behavior defined
✓ Permission behavior defined
✓ Examples exist
✓ Automated/manual tests exist
✓ Owner assigned
```

---

# 360. Definition of Done — CRUD Feature

```text
✓ Create behavior
✓ Detail behavior
✓ Edit behavior
✓ Delete lifecycle
✓ Permissions
✓ URL/state behavior
✓ Validation
✓ Idempotency
✓ Empty/loading/error states
✓ Responsive
✓ Accessibility
✓ Tests
```

---

# 361. Definition of Done — Multi-Step Workflow

```text
✓ Steps justified
✓ Progress clear
✓ Back/reload safe
✓ Draft model
✓ Branching safe
✓ Cross-step validation
✓ Review
✓ Final action explicit
✓ Duplicate submission protected
✓ Completion state
✓ Resume where required
```

---

# 362. Definition of Done — Bulk Workflow

```text
✓ Exact selection scope
✓ Permission enforcement
✓ Impact preview
✓ Safe confirmation
✓ Async strategy
✓ Idempotency
✓ Partial failure
✓ Progress
✓ Result summary
✓ Audit where required
```

---

# 363. Definition of Done — Import/Export Workflow

```text
✓ Scope/security defined
✓ Tenant context enforced
✓ Validation
✓ Preview
✓ Async behavior
✓ Retry/reconciliation
✓ Artifact retention
✓ Sensitive-data handling
✓ Audit
✓ Accessibility
```

---

# 364. Pattern Anti-Patterns

Avoid:

```text
every feature invents its own pattern
```

Avoid:

```text
component = pattern
```

Avoid selecting patterns based only on visual trend.

Avoid:

```text
dialog inside dialog inside dialog
```

Avoid entire complex settings systems inside one modal.

Avoid treating Delete as symmetric with Edit.

Avoid permanent deletion when Archive would meet the user need.

Avoid confirming every harmless action.

Avoid no confirmation for catastrophic action.

Avoid:

```text
Are you sure?
```

without target/consequence.

Avoid destructive buttons labelled:

```text
Yes
Confirm
Proceed
```

Avoid:

```text
toast
```

as the only feedback for a major completed transaction.

Avoid empty states that say only:

```text
No data.
```

Avoid treating:

```text
No resources exist
```

and:

```text
No results match filters
```

as the same state.

Avoid every row having five prominent buttons.

Avoid making the entire table a custom ARIA grid when normal HTML table behavior is enough.

Avoid cardifying every table on mobile without preserving comparison needs.

Avoid hidden active filters.

Avoid filter sidebars that disappear completely on mobile.

Avoid search results losing query/filters after opening one item.

Avoid:

```text
search query
```

stored only in ephemeral state when sharing/back navigation matters.

Avoid infinite scroll for operational datasets by default.

Avoid sort indicators visible only through color.

Avoid:

```text
settings page
```

containing unrelated destructive account deletion next to ordinary preferences.

Avoid mixing autosave and Save-button behavior with no explanation.

Avoid:

```text
switch
```

for a value that does not take effect until a later Save.

Avoid onboarding that teaches every feature before users reach the product.

Avoid forcing users through optional onboarding.

Avoid onboarding progress that misrepresents remaining effort.

Avoid a wizard for a three-field form.

Avoid wizard steps called only:

```text
Step 1
Step 2
Step 3
```

when meaningful names exist.

Avoid Browser Back corrupting wizard state.

Avoid changing an early answer while retaining invalid hidden downstream answers silently.

Avoid final submission labelled:

```text
Next
```

Avoid final submission with no duplicate protection.

Avoid approval workflows where requester can approve themselves contrary to policy.

Avoid approval after material request details changed.

Avoid approval UI that does not show the exact requested action.

Avoid:

```text
Select all
```

with ambiguous scope.

Avoid running a 100,000-record bulk action synchronously inside the browser request.

Avoid retrying an entire bulk job after partial success with no idempotency.

Avoid presenting partial success as full success.

Avoid upload immediately mutating production records before parsing/validation.

Avoid import upsert keys that ignore tenant scope.

Avoid importing valid rows partially when users believe the operation is atomic.

Avoid export buttons whose scope is unclear.

Avoid:

```text
Export
```

meaning "all customer data" unexpectedly.

Avoid permanent public download URLs for sensitive exports.

Avoid using client-side filtering for permission enforcement.

Avoid hiding unauthorized actions while server APIs still permit them.

Avoid keeping Tenant A selections/forms after switching to Tenant B.

Avoid endless spinners for work that should be modeled as a background job.

Avoid fake progress percentages.

Avoid dynamic result changes with no screen-reader feedback.

Avoid focus disappearing after deleting a row/dialog action.

Avoid using color alone for status.

Avoid component-level keyboard semantics invented differently in each pattern.

Avoid analytics autocapture of sensitive forms/import data.

Avoid judging pattern success purely by fewer clicks.

---

# 365. AI Pattern Rules

AI coding agents MUST search for an existing canonical pattern before inventing a new workflow.

---

# 366. AI Component Rule

AI MUST reuse canonical components inside patterns.

---

# 367. AI Business Rule

AI MUST NOT embed domain authorization/business invariants only in UI pattern logic.

---

# 368. AI State Rule

AI SHOULD define:

```text
Loading
Empty
Success
Failure
Unauthorized
```

states for new patterns where applicable.

---

# 369. AI CRUD Rule

AI MUST clarify lifecycle semantics before implementing Delete.

---

# 370. AI List Rule

AI SHOULD choose table, list, card, or grid according to user task rather than styling preference.

---

# 371. AI Search Rule

AI MUST preserve Search Guidelines' authorization and ranking boundaries.

---

# 372. AI Filter Rule

AI SHOULD place shareable meaningful filters in URL state according to Routes Guidelines.

---

# 373. AI Settings Rule

AI MUST make the settings scope explicit.

---

# 374. AI Wizard Rule

AI MUST NOT split simple forms into unnecessary multi-step flows.

---

# 375. AI Submission Rule

AI MUST protect consequential final submission against duplicates.

---

# 376. AI Bulk Rule

AI MUST make selection scope explicit before bulk execution.

---

# 377. AI Approval Rule

AI MUST invalidate approval when material request parameters change.

---

# 378. AI Delete Rule

AI MUST communicate object, consequence, and reversibility for destructive actions.

---

# 379. AI Import Rule

AI SHOULD implement import as staged validation/review before mutation.

---

# 380. AI Export Rule

AI MUST define export scope and enforce server authorization.

---

# 381. AI Accessibility Rule

AI MUST preserve canonical keyboard/focus behavior defined by Components and Accessibility Guidelines.

---

# 382. AI Mobile Rule

AI SHOULD recompose complex patterns for narrow devices rather than merely shrinking desktop UI.

---

# 383. AI Gold Rule

When uncertain:

```text
Existing pattern
>
novel interaction
```

```text
Explicit state
>
implicit behavior
```

```text
Reversible
>
irreversible
```

```text
Clear scope
>
convenient ambiguity
```

---

# 384. Golden Pattern Rules

**1. Patterns solve recurring user tasks; components solve reusable UI primitives.**

**2. Existing canonical patterns are reused before new ones are invented.**

**3. Patterns compose Components, Forms, Routes, and domain rules rather than duplicating them.**

**4. Pattern choice starts with user intent, not visual preference.**

**5. Every production pattern handles more than the happy path.**

**6. Loading, empty, error, success, and permission states are deliberate.**

**7. Interaction friction is proportional to consequence.**

**8. Reversible actions prefer undo over unnecessary confirmation.**

**9. Irreversible/high-impact actions receive clear confirmation.**

**10. Complex workflows use pages instead of being forced into dialogs.**

**11. Dialogs remain focused and bounded.**

**12. Drawers preserve context only when that context provides genuine value.**

**13. CRUD operations need not have symmetrical UX.**

**14. Create flows make resource type and next state clear.**

**15. Complex creation uses a dedicated page or wizard.**

**16. Creation is idempotent where duplicate records are harmful.**

**17. Detail pages emphasize identity, state, important attributes, and actions.**

**18. Edit scope is explicit.**

**19. Inline editing is reserved for small independent changes.**

**20. Unsaved state has defined navigation behavior.**

**21. Autosave exposes meaningful save/failure state where needed.**

**22. Delete semantics distinguish archive, disable, soft delete, and hard delete.**

**23. Reversible lifecycle operations are preferred where domain semantics permit them.**

**24. Lists are optimized for scanning, comparison, discovery, and action.**

**25. Tables are used when structured cross-row comparison matters.**

**26. Cards are not a substitute for every table.**

**27. Interactive ARIA grids are not used when a normal table suffices.**

**28. Every collection item has a clear primary identity.**

**29. Row action clutter is minimized.**

**30. First-use empty states differ from filtered-empty states.**

**31. Filtered-empty states provide a path to broaden results.**

**32. Sorting communicates key and direction.**

**33. Meaningful collection state survives navigation and reload where appropriate.**

**34. Pagination is preferred to uncontrolled infinite scroll for operational data.**

**35. Search and filters serve different purposes and are modeled separately.**

**36. Search fields communicate their search scope.**

**37. Search-as-you-type uses controlled request frequency.**

**38. Search no-result states communicate the query and recovery options.**

**39. Search permissions are enforced before results or counts are returned.**

**40. Applied filters remain discoverable.**

**41. Users can clear individual and all filters where relevant.**

**42. Filter changes are either immediate and predictable or explicitly applied.**

**43. Shareable search/filter/sort state normally belongs in the URL.**

**44. Hidden default filters must not misrepresent the result set.**

**45. Returning from details preserves relevant collection context.**

**46. Split views recompose appropriately on narrow devices.**

**47. Settings are grouped by user mental model rather than implementation module.**

**48. Setting scope—user, workspace, organization, system—is always explicit.**

**49. Settings use a consistent save model.**

**50. Switches represent immediate binary state rather than arbitrary pending form fields.**

**51. Dangerous settings are separated from ordinary preferences.**

**52. Onboarding optimizes time to first meaningful value.**

**53. Onboarding distinguishes required and optional tasks.**

**54. Optional onboarding is normally skippable.**

**55. Long onboarding can be resumed.**

**56. Wizards are used only when staged complexity provides real value.**

**57. Wizard steps use meaningful names.**

**58. Back, refresh, and resume behavior is deliberately designed.**

**59. Changing earlier answers revalidates dependent downstream state.**

**60. Persistent incomplete workflows are explicitly drafts.**

**61. Consequential multi-step flows provide a review stage where useful.**

**62. Final actions describe the actual commitment rather than saying merely Continue.**

**63. Final consequential submission is duplicate-safe.**

**64. Major completed transactions receive durable confirmation rather than only a toast.**

**65. Confirmation tells users what happened and what happens next.**

**66. Task lists are used for long flexible multi-session processes, not simple short forms.**

**67. Approval workflows model request, decision, and execution explicitly.**

**68. Approvers see exactly what they authorize.**

**69. Material request changes invalidate prior approval.**

**70. Separation-of-duties policy is enforced by the backend, not UI convention.**

**71. Bulk selection is distinct from navigation.**

**72. Select-all scope is never ambiguous.**

**73. Bulk controls show the selected count.**

**74. High-impact bulk changes preview scope and consequence.**

**75. Large bulk operations execute asynchronously.**

**76. Bulk workflows expose partial failure honestly.**

**77. Retrying failed subsets does not repeat completed effects.**

**78. Destructive actions use explicit verbs and identify their targets.**

**79. Delete confirmation describes consequence and reversibility.**

**80. Typed confirmation is reserved for unusually consequential actions.**

**81. Import is treated as a staged data workflow, not simply file upload.**

**82. Imports validate before committing where practical.**

**83. Import matching/upsert behavior is explicit.**

**84. Large imports support preview or dry run where risk warrants it.**

**85. Import partial-success semantics are defined before execution.**

**86. Imports are idempotent/restartable where duplicate effects matter.**

**87. Export controls state exactly which records are exported.**

**88. Export authorization occurs server-side.**

**89. Large exports become asynchronous jobs.**

**90. Sensitive exports expire and are reauthorized on download where applicable.**

**91. Import/export preserve tenant isolation from request through artifact.**

**92. Long-running work becomes explicit job state rather than an indefinite spinner.**

**93. Fake percentage progress is prohibited.**

**94. Dynamic result and status changes remain accessible to assistive technology.**

**95. Focus after dialogs, deletions, errors, and major updates remains predictable.**

**96. Responsive patterns recompose rather than merely shrink.**

**97. Product analytics do not capture sensitive workflow data indiscriminately.**

**98. Canonical patterns have reusable tests across states, roles, devices, and accessibility modes.**

**99. New interaction novelty requires evidence that an established pattern cannot solve the problem well.**

**100. If users must relearn the same task every time it appears in another feature, the product does not yet have a coherent pattern system.**

---

# 385. Canonical Pattern Standard

The organizational standard is:

> **Interaction patterns are reusable solutions to recurring user tasks and sit above components, forms, routes, and domain rules. Components define individual controls, Forms define data-entry mechanics, Routes define navigation and addressable state, and domain services define business invariants; Pattern Guidelines determine how those primitives are composed into predictable end-to-end user journeys.**

> **Patterns are selected from user intent, task frequency, information density, consequence, reversibility, and device constraints rather than visual novelty. Existing canonical patterns are reused before feature-specific variants are introduced, and frequently repeated local variants are promoted back into the pattern system rather than copied indefinitely.**

> **CRUD behavior is lifecycle-aware. Creation clearly identifies the new resource and uses the simplest interaction capable of collecting its required state; detail pages prioritize identity, status, important data, and actions; editing preserves unsaved work and communicates save state; and deletion distinguishes archive, disable, soft delete, permanent deletion, and other domain lifecycles instead of treating every removal as the same operation.**

> **Collection patterns optimize discovery, scanning, comparison, and action. Tables are used for structured comparison, lists for navigational scanning, cards when visual or heterogeneous information dominates, and interactive grids only when genuine spreadsheet-like interaction is required. Collections deliberately handle search, filters, sorting, pagination, selection, loading, empty states, filtered-empty states, failures, permissions, and restoration of context when users navigate into and back from details.**

> **Search and filtering maintain understandable state. Search represents user-entered retrieval intent, filters represent structured narrowing, applied criteria remain visible, zero-result states provide useful recovery, permissions and tenant boundaries are enforced before results and counts are returned, and shareable or navigation-relevant query/filter/sort state is represented through the routing model rather than ephemeral UI memory alone.**

> **Settings expose persistent configuration according to user mental models and explicit scope. User, workspace, organization, and system settings are distinguished; save behavior is consistent; switches represent immediate binary state where appropriate; setting dependencies remain understandable; and security-sensitive or destructive configuration is separated from everyday preferences and protected through the underlying authorization model.**

> **Onboarding minimizes the time between account entry and useful product value. Required, recommended, and optional setup are distinguished; optional education is skippable; long setup can be resumed; flexible multi-session work may use task lists while strictly dependent work may use a wizard; and advanced concepts are introduced contextually rather than overwhelming users before they can use the product.**

> **Wizards represent genuinely staged tasks. Step names communicate purpose, navigation and browser history preserve valid state, branching answers invalidate or revalidate dependent data, persisted incomplete work is explicitly modeled as a draft, consequential transactions provide review when necessary, and final actions clearly state the commitment and are protected from accidental duplicate execution.**

> **Approval workflows explicitly model proposal, review, decision, and execution. The approver sees the exact target, requested change, reason, and supporting evidence; required separation of duties is enforced server-side; material modifications invalidate previous approval; expiry and multi-stage approval are introduced only where risk justifies them; and approval history remains auditable.**

> **Bulk operations make blast radius unmistakable. Selection semantics explicitly distinguish current page, loaded results, filtered results, and whole collections; selected counts and eligibility remain visible; high-impact actions preview scope; large operations execute as observable background jobs; partial success is reported honestly; and retry behavior operates only on failed work without duplicating completed effects.**

> **Destructive actions receive risk-calibrated friction. Low-impact reversible actions prefer immediate execution with undo, while irreversible or high-consequence operations clearly identify the target, dependent effects, reversibility, and final action. Typed confirmation and multi-party approval are reserved for scenarios where they materially reduce risk rather than becoming ritual interaction.**

> **Imports are controlled data-ingestion workflows. Files are secured according to File & Media Guidelines, parsed and validated before production mutation where practical, external columns may be explicitly mapped, upsert identities and tenant boundaries are defined, review or dry-run stages expose expected create/update/error counts, atomicity and partial-failure behavior are communicated, and large imports are idempotent, restartable asynchronous jobs with durable results and audit records.**

> **Exports are privileged data-read workflows. Users understand whether an export includes selected records, filtered results, visible rows, or the complete dataset; authorization and tenant scope are enforced server-side; sensitive fields and file formats are governed deliberately; large exports execute asynchronously; generated artifacts have controlled access and retention; and sensitive export creation and download are auditable.**

> **Patterns include all material interaction states rather than only successful screenshots. Loading, empty, filtered-empty, saving, success, validation failure, server failure, unauthorized, partially successful, background-running, expired, and unknown-outcome states are designed according to applicability, and users are given a clear next action whenever recovery is possible.**

> **Pattern accessibility derives from semantic components and predictable workflow behavior. Native elements are preferred, established WAI-ARIA widget patterns are followed when custom semantics are genuinely required, keyboard and assistive-technology interaction remains complete, dynamic updates communicate meaningful status, and focus is deliberately restored or moved after dialogs, errors, deletion, navigation, and major state changes.**

> **Patterns recompose across devices instead of merely shrinking desktop layouts. Filter sidebars may become mobile sheets, split views may become separate screens, wide tables preserve their underlying comparison task, bulk controls remain touch-accessible, and the same task retains equivalent semantics across pointer, touch, and keyboard environments.**

> **Canonical patterns are versioned, tested, documented, and owned. Reusable tests cover significant states, navigation, role/permission variants, tenant isolation, mobile and desktop behavior, keyboard interaction, and critical failure paths; pattern changes are reviewed for consistency across products; and novel interactions are introduced only when established solutions cannot adequately satisfy the user problem.**

A production-grade pattern system should make it easy to answer:

```text
Which canonical pattern solves this task?
Why does this workflow need a new pattern?
Which components compose it?
What owns its state?
Which state belongs in the URL?
What happens while loading?
What happens with zero records?
What happens when filters return zero matches?
What happens after a server failure?
What happens when the user lacks permission?
Can the user recover?
Is the operation reversible?
Should it use undo or confirmation?
Does it need a page, dialog, drawer, or inline interaction?
How is collection context preserved?
What does Select all actually mean?
How are partial bulk failures handled?
What happens when an early wizard answer changes?
Can the workflow survive Back, refresh, and resume?
Is final submission duplicate-safe?
What exact request is an approver authorizing?
What invalidates an approval?
What does Delete actually mean for this domain?
Does import validate before commit?
What happens to invalid import rows?
What exact data does Export include?
Does the pattern preserve tenant and authorization boundaries?
How does the interaction recompose on mobile?
Where does keyboard focus move after completion or failure?
How are dynamic status changes communicated?
Which reusable tests prove the pattern works?
```

If those questions cannot be answered consistently, the application contains UI flows, but it does not yet have a governed interaction-pattern system.

This framing matches the current distinction used by mature design systems: GOV.UK defines patterns as **user-focused solutions that commonly combine one or more reusable components**, rather than treating a component and a workflow as the same abstraction. Its current guidance also uses distinct patterns for check-answer/review stages, completion pages, and long-running multi-task journeys. citeturn669674search0turn669674search1turn669674search3turn669674search5

For accessibility, the current W3C APG remains the appropriate implementation reference for complex widget behavior such as dialogs, comboboxes, tabs, tables, and grids; notably, APG distinguishes a static semantic table from an interactive grid and recommends native HTML equivalents where possible. citeturn651705search1turn651705search3turn651705search6turn651705search7 WCAG 2.2 remains the current W3C Recommendation baseline used by this corpus for web accessibility, and W3C's AA conformance material was updated in February 2026. citeturn901487search0turn901487search2

Canonical master placement:

**… → Design Tokens → Layout → Facade → Components → Forms & Validation → Patterns → Accessibility → Responsive & Device → Browser & Compatibility → SEO → …**
