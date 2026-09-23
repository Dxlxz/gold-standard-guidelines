---
id: "state-management"
title: "State Management Guidelines — Gold Standard"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["engineering", "state", "management"]
applies_to: ["general"]
related: []
legacy_number: 13
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 52842
provenance: baseline

---

# State Management Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical standard for application state.

They govern:

- server state;
- URL state;
- form state;
- local component state;
- shared context;
- global client stores;
- derived state;
- persisted state;
- cached state;
- optimistic state;
- realtime state;
- synchronization;
- invalidation;
- hydration;
- state ownership.

The objective is to make state:

- predictable;
- minimal;
- correctly owned;
- recoverable;
- shareable where necessary;
- easy to invalidate;
- resistant to synchronization bugs.

The core principle is:

> **Every piece of state should have one authoritative owner. Everything else should be derived, projected, cached, or synchronized deliberately.**

---

# 2. State Is an Ownership Problem

Before choosing a library, ask:

```text
Who owns this value?
Where is its source of truth?
Who needs it?
How long should it live?
Should it survive refresh?
Should it be shareable?
Can it become stale?
```

State-management tools come after these decisions.

---

# 3. Canonical State Categories

Every application state SHOULD be classified into one of these categories:

```text
Server state
URL state
Form state
Local UI state
Contextual state
Global client state
Derived state
Persisted client state
Realtime state
```

Do not treat all state as one generic category.

---

# 4. State Selection Order

When deciding where state belongs, evaluate in this order:

```text
Can it be derived?
    ↓ yes
Do not store it.

Is the server authoritative?
    ↓ yes
Server state.

Does navigation/shareability define it?
    ↓ yes
URL state.

Is it unsaved user input?
    ↓ yes
Form state.

Does one component/subtree own it?
    ↓ yes
Local state.

Does a bounded subtree need it?
    ↓ yes
Context.

Does unrelated client UI require shared ephemeral state?
    ↓ yes
Global store.

Does it need persistence?
    ↓ yes
Persist only the minimum necessary state.
```

---

# 5. Golden State Hierarchy

Prefer:

```text
Derived
↓
Server
↓
URL
↓
Form
↓
Local
↓
Context
↓
Global store
↓
Persistent global store
```

The further down this hierarchy you go, the stronger the justification should be.

---

# 6. Minimize State

State creates:

- synchronization;
- lifecycle;
- invalidation;
- debugging;
- persistence;
- concurrency;

obligations.

Therefore:

> **The best state is often state you do not store.**

---

# 7. Single Source of Truth

Every important fact MUST have one authoritative source.

Bad:

```text
server user
+
global-store user
+
context user
+
local user
```

all independently mutable.

Good:

```text
server/user cache
→ authoritative remote representation

local components
→ consume derived projection
```

---

# 8. Duplicate State

Duplicate state is allowed only when explicitly treated as:

```text
cache
snapshot
draft
projection
optimistic representation
```

Its relationship to the source of truth MUST be clear.

---

# 9. Derived State

If a value can be calculated reliably from existing authoritative state, derive it.

Example:

```ts
const fullName = `${firstName} ${lastName}`
```

Do not store:

```text
firstName
lastName
fullName
```

and manually synchronize all three.

---

# 10. Derived Collections

Prefer:

```text
items
+
filter
→ filteredItems
```

rather than storing:

```text
items
filteredItems
```

independently.

---

# 11. Derived Counts

Prefer:

```text
items.length
```

rather than separately storing:

```text
itemCount
```

unless count comes from an independent server query or has different semantics.

---

# 12. Derived Booleans

Prefer:

```text
status === "loading"
```

rather than:

```text
status
isLoading
```

if one is fully derivable from the other.

---

# 13. Illegal State Combinations

Avoid:

```text
isLoading
isSuccess
isError
```

when combinations can contradict one another.

Prefer:

```text
status =
idle
loading
success
error
```

---

# 14. Server State

Server state is data whose authoritative source lives remotely.

Examples:

```text
User account
Projects
Invoices
Permissions
Notifications
Search results
Subscription state
```

The client does not own this data.

It holds a representation of it.

---

# 15. Server State Principle

Treat server state as:

```text
remote
potentially stale
shared
asynchronous
authoritative elsewhere
```

This makes it fundamentally different from local UI state.

---

# 16. Server-First Default

For server-rendered applications, initial server data SHOULD generally be obtained on the server where practical.

Prefer:

```text
Server Component
→ data layer
→ database/API
```

over:

```text
render empty page
→ useEffect
→ fetch
→ loading spinner
```

for initial data.

---

# 17. Do Not Copy Server State Into a Global Store

Avoid:

```text
fetch projects
↓
copy into global Zustand/Redux
↓
manually synchronize
```

unless the global store genuinely becomes an intentional application state machine.

Remote data should normally remain server/cache state.

---

# 18. Server State Cache

A client/server-state library MAY maintain a local cache.

That cache remains:

```text
cache
```

not independent product truth.

The server remains authoritative.

---

# 19. Server State Questions

For every server state query define:

```text
Query key
Freshness
Cache scope
Invalidation
Authorization
Error behavior
Loading behavior
```

---

# 20. Server State Freshness

Not all data needs the same freshness.

Examples:

```text
Permissions
→ correctness-sensitive

Billing balance
→ freshness-sensitive

Country list
→ highly cacheable

Activity feed
→ moderately stale acceptable
```

---

# 21. Avoid Arbitrary Refetching

Do not repeatedly fetch remote state simply because a component rendered.

Data fetching must have an intentional lifecycle.

---

# 22. Server State Deduplication

Equivalent concurrent requests SHOULD be deduplicated where platform/cache support makes this practical.

Avoid multiple components independently fetching the same canonical data unnecessarily.

---

# 23. Server State Ownership

Fetch data at the narrowest meaningful server ownership boundary.

Avoid giant page loaders returning unrelated data to every child.

---

# 24. Server State Mutations

A mutation should generally follow:

```text
Validate
↓
Authenticate
↓
Authorize
↓
Perform operation
↓
Persist
↓
Invalidate/update affected state
↓
Render/return result
```

---

# 25. Mutation Is Not State Assignment

Do not treat remote mutation as:

```text
globalStore.user.name = ...
```

The actual operation happens against the authoritative source.

The client representation is updated afterward.

---

# 26. Server State Invalidation

Every mutation MUST determine what existing remote representations became stale.

Examples:

```text
Create project
→ project collection stale

Rename project
→ project detail stale
→ relevant lists potentially stale

Delete project
→ project list stale
→ project detail no longer valid
```

---

# 27. Invalidate Narrowly

Prefer:

```text
invalidate affected project
invalidate affected project list
```

over:

```text
invalidate everything
```

when safe.

---

# 28. Avoid Fragile Manual Cache Mutation

Manual cache updates are appropriate when semantics are clear.

Do not manually reproduce complex backend state transitions across many cached queries if revalidation is safer.

---

# 29. Mutation Result Reuse

If a mutation returns the canonical updated resource, the client MAY update its cache directly.

Example:

```text
PATCH project
→ returns current Project
→ update project cache
```

---

# 30. Revalidation

Revalidate when:

- server performs additional transformations;
- multiple records may change;
- permissions influence result;
- computed values are difficult to reproduce safely.

---

# 31. Optimistic State

Optimistic updates represent expected future server state before confirmation.

Use them only when:

```text
success probability is high
rollback is understandable
user benefit is meaningful
```

---

# 32. Good Optimistic Operations

Typical candidates:

```text
Like
Toggle
Simple reorder
Minor label change
Low-risk preference
```

---

# 33. Risky Optimistic Operations

Be cautious with:

```text
Payments
Permission changes
Account deletion
Inventory reservation
Complex workflows
```

where failure has consequential meaning.

---

# 34. Optimistic Rollback

Every optimistic update MUST define:

```text
success reconciliation
failure rollback
concurrent update behavior
```

---

# 35. Optimistic State Is Temporary

Once the authoritative result returns:

```text
optimistic representation
→ reconcile with server truth
```

Do not keep an independent client version indefinitely.

---

# 36. URL State

URL state represents navigational/shareable application state.

Examples:

```text
Search query
Filters
Sorting
Pagination
Selected resource
Meaningful tab
Date range
View mode
```

---

# 37. URL State Principle

Use URL state when the user should reasonably expect:

```text
Refresh
Share
Bookmark
Back
Forward
```

to preserve the state.

---

# 38. Search State

Prefer:

```text
/projects?search=acme
```

over only:

```text
localSearchState = "acme"
```

when search results are a navigational state.

---

# 39. Filter State

Data-page filters SHOULD normally be URL-backed when users benefit from sharing or refreshing the filtered view.

---

# 40. Sort State

Sorting SHOULD generally be URL-backed on meaningful collection pages.

---

# 41. Pagination State

Pagination usually belongs in the URL.

Example:

```text
?page=3
```

or cursor representation where appropriate.

---

# 42. Meaningful Tabs

If selecting a tab changes meaningful page content and should be deep-linkable:

```text
URL state
```

is appropriate.

---

# 43. Cosmetic Tabs

If a tab is purely transient presentation with no value on refresh/share:

```text
local state
```

may be sufficient.

---

# 44. URL vs Local Test

Ask:

> If I send this URL to another user with equivalent access, should they see the same view?

If yes, URL state is likely appropriate.

---

# 45. Do Not Duplicate URL State

Bad:

```text
URL:
?status=active

Global store:
status = "pending"
```

Avoid competing sources of truth.

If the URL owns the state, derive UI from the URL.

---

# 46. URL Normalization

Invalid URL state SHOULD:

- fall back safely;
- be normalized;
- or be rejected predictably.

Never allow malformed query state to crash the page.

---

# 47. URL Serialization

Define one convention for:

```text
arrays
booleans
dates
enums
ranges
```

Do not let features invent independent encodings.

---

# 48. Sensitive State in URLs

Never store:

```text
passwords
session tokens
API keys
private secrets
sensitive personal data
```

in navigational URLs.

---

# 49. Form State

Form state represents user input not yet committed to authoritative state.

Examples:

```text
Input values
Touched state
Validation errors
Dirty state
Submission state
Draft changes
```

---

# 50. Form State Has Different Semantics

A form may intentionally diverge from server state.

Example:

```text
server name:
"Acme"

form draft:
"Acme International"
```

This divergence is correct until submission/cancellation.

---

# 51. Form Ownership

The form owns its unsaved input.

Do not update server/global canonical state for every keystroke unless the product intentionally implements autosave.

---

# 52. Server Data → Form Initial Values

Use remote data to initialize form state.

After initialization, clearly define whether later remote updates should:

```text
replace draft
merge
warn
be ignored
```

Do not reset user input unexpectedly.

---

# 53. Avoid Form Mirroring

Bad:

```text
form library
+
local useState for every field
+
global store copy
```

Choose one form-state owner.

---

# 54. Form Validation

Client-side validation is part of form UX.

Server-side validation remains authoritative.

Do not assume valid client form state means valid mutation input.

---

# 55. Field Errors

Field errors belong to form submission/validation state.

They should not become global application state.

---

# 56. Form Submission State

Form state MAY include:

```text
idle
submitting
success
error
```

Do not rely solely on global loading state.

---

# 57. Dirty State

Track dirty state when it influences:

- unsaved-change warning;
- save button;
- autosave;
- reset.

Do not compute complex dirty state independently if the form framework already owns it.

---

# 58. Draft Persistence

Persist form drafts only where losing them would materially harm the user.

Examples:

```text
Long application form
Long article editor
Complex workflow
```

Do not persist every two-field dialog.

---

# 59. Draft Keying

Persisted drafts MUST be scoped appropriately.

Example:

```text
user
resource
form version
```

Avoid one global key such as:

```text
draft
```

---

# 60. Draft Versioning

Persisted form structures may outlive deployments.

Include versioning/migration or safe discard behavior.

---

# 61. Draft Security

Do not persist sensitive form values in browser storage unnecessarily.

Examples:

```text
password
payment credentials
government ID
```

require strong scrutiny.

---

# 62. Autosave

Autosave requires explicit state:

```text
dirty
saving
saved
error
conflict
```

Users should understand whether changes are durable.

---

# 63. Autosave Debouncing

Debounce or batch autosave where appropriate.

Do not create a network mutation for every keystroke without need.

---

# 64. Autosave Conflict

Collaborative or multi-tab editing requires conflict semantics.

Do not silently overwrite newer server data.

---

# 65. Local Component State

Local state is the default for transient state owned by one component or tightly coupled subtree.

Examples:

```text
Dropdown open
Accordion expanded
Hovered item
Temporary selection
Local panel state
```

---

# 66. Keep State Local

If only one component needs state:

> Keep it there.

Do not move it into context/global store for theoretical reuse.

---

# 67. Lift State Only When Necessary

Move state upward when multiple sibling components need to coordinate around the same state.

Do not lift state to the application root prematurely.

---

# 68. Colocation

State SHOULD live near the code that owns its behavior.

Colocation improves:

- readability;
- deletion;
- refactoring;
- debugging.

---

# 69. Transient UI State

Typical local state:

```text
popover open
menu open
selected row during interaction
hovered chart item
```

Do not persist or globalize by default.

---

# 70. Modal State

Simple modal visibility usually belongs locally.

Example:

```text
isDeleteDialogOpen
```

unless modal state is route-backed or shared through a centralized workflow.

---

# 71. Route-Backed Modal

If a modal represents a meaningful deep-linkable destination:

```text
route/URL state
```

may be more appropriate than local modal state.

---

# 72. Controlled Components

Use controlled state when the parent needs to own or coordinate the value.

Example:

```text
value
onValueChange
```

---

# 73. Uncontrolled Components

Use internal/uncontrolled state when the state is genuinely encapsulated.

Do not expose control props automatically for every component.

---

# 74. Controlled/Uncontrolled Ambiguity

A component MUST NOT unpredictably switch between controlled and uncontrolled state.

The contract should be clear.

---

# 75. Context

Context is appropriate for bounded cross-tree state or dependencies.

Good examples:

```text
Theme
Compound component state
Editor context
Workspace UI context
Form sub-context
```

---

# 76. Context Is Not Automatically Global State

Context solves propagation.

It does not automatically solve:

- caching;
- selectors;
- persistence;
- complex updates;
- synchronization.

---

# 77. Context Scope

Providers SHOULD be placed at the lowest meaningful common ancestor.

Avoid putting feature-specific providers around the entire application.

---

# 78. Root Provider Discipline

Keep the application root provider tree small.

Avoid:

```text
<AuthProvider>
  <ProjectProvider>
    <BillingProvider>
      <SearchProvider>
        <ModalProvider>
          ...
```

when those concerns can remain route/feature scoped.

---

# 79. Context Update Cost

Large frequently-changing context values may trigger excessive rerenders.

Split contexts or use selectors/store architecture where actual performance requires it.

---

# 80. Stable Context Values

Avoid unnecessarily recreating complex provider values every render when identity stability matters.

Do not cargo-cult memoization when it does not.

---

# 81. Context for Dependencies

Context MAY provide stable runtime dependencies such as:

```text
locale
feature configuration
editor controller
```

when prop passing would be inappropriate.

---

# 82. Global Client State

Global client state is justified when unrelated parts of the client need to coordinate around shared ephemeral state.

Examples may include:

```text
Complex editor session
Realtime collaborative state
Cross-route draft workflow
Client-only desktop-like workspace state
```

---

# 83. Global Store Is Last Resort, Not First Choice

Do not create global stores for:

```text
server data
URL filters
simple form state
one modal
one component selection
```

without strong reason.

---

# 84. Global Store Qualification Test

Before creating a global store, verify:

```text
Multiple distant consumers exist.
State is genuinely client-owned.
URL is not the right owner.
Server is not the right owner.
Context alone is insufficient.
Persistence semantics are understood.
```

---

# 85. Store Boundaries

Prefer domain/feature-specific stores.

Example:

```text
editorStore
```

over:

```text
appStore
```

containing every application value.

---

# 86. Avoid Mega Stores

Avoid:

```text
user
projects
forms
filters
modals
notifications
theme
permissions
```

all inside one universal store.

Separate ownership.

---

# 87. Store Shape

Store canonical values.

Derive secondary values through selectors.

Avoid storing every derived representation.

---

# 88. Store Selectors

Consumers SHOULD subscribe only to state they need when the store system supports selectors.

This reduces unnecessary coupling and rerendering.

---

# 89. Store Actions

Complex global stores SHOULD expose meaningful operations.

Prefer:

```text
openDocument()
selectNode()
resetWorkspace()
```

over exposing arbitrary unrestricted mutation.

---

# 90. Store Invariants

If store state has valid transitions, centralize those transitions.

Do not let every component mutate low-level fields independently.

---

# 91. Global Store Serialization

If state is persisted, distinguish serializable durable state from runtime-only state.

Do not attempt to persist:

```text
DOM nodes
functions
connections
AbortController
service instances
```

---

# 92. Store Reset

Global stores SHOULD have a clear reset lifecycle.

Examples:

```text
logout
tenant switch
session expiration
```

must not leave stale state from the previous user/tenant.

---

# 93. Tenant Switching

On tenant/workspace change, explicitly reset or re-scope:

```text
client stores
queries
drafts
caches
subscriptions
```

where tenant-specific.

---

# 94. User Switching

Never allow persistent state from user A to leak into user B's session on shared devices or long-lived browser state.

---

# 95. Persistent Client State

Persistence means state survives page refresh or browser restarts.

Possible mechanisms:

```text
URL
cookie
localStorage
IndexedDB
server
```

Choose based on semantics.

---

# 96. Persist Only What Must Survive

Do not persist merely because it is easy.

Every persisted state introduces:

- migration;
- stale data;
- security;
- cleanup;
- synchronization.

---

# 97. Persistence Decision

Ask:

```text
Should this survive reload?
Should it survive browser restart?
Should it follow the user across devices?
Is it sensitive?
```

Answers determine storage location.

---

# 98. Cross-Device State

If state should follow the user across devices:

```text
server
```

is usually the correct owner.

Browser storage is device-specific.

---

# 99. Browser Preference State

Local persistence is appropriate for some device/browser preferences.

Examples:

```text
sidebar collapsed
table density
dismissed local hint
```

when server sync is unnecessary.

---

# 100. User Preferences

Important user preferences SHOULD generally be persisted server-side if they should:

- follow account;
- work on multiple devices;
- participate in backup.

---

# 101. Theme Preference

Theme may be:

```text
system
light
dark
```

and persisted via cookie/local preference depending on rendering requirements.

Avoid hydration flashes by making server/client theme strategy coherent.

---

# 102. LocalStorage

Use `localStorage` only for non-sensitive browser-owned persistence.

Remember:

```text
available to client JavaScript
not server-authoritative
not cross-device
```

---

# 103. IndexedDB

Use IndexedDB for larger structured offline/client datasets where requirements justify it.

Do not introduce it for trivial preferences.

---

# 104. Cookies

Cookies are appropriate for request-relevant server-visible state.

Examples:

```text
session
locale
theme hint
```

Apply Security Gold Standard attributes.

---

# 105. Sensitive State

Do not persist sensitive state in browser storage unless architecture explicitly accepts the risk.

Never treat local storage as a secure credential vault.

---

# 106. Persistent State Versioning

Persisted client state MUST be treated like a schema.

Define:

```text
version
migration
fallback/reset
```

for state likely to outlive deployments.

---

# 107. Stale Persisted State

On load, persisted state may no longer be valid.

Validate before use.

Do not assume yesterday's browser state matches today's application contract.

---

# 108. Persistence Expiration

Some persisted values SHOULD expire.

Examples:

```text
temporary drafts
recent search
wizard state
```

Define TTL where stale state creates confusion.

---

# 109. Hydration

Hydration bridges server-rendered output and client state.

Initial client state MUST be compatible with server-rendered UI.

---

# 110. Hydration Mismatch

Do not render one value on the server and a different immediate client value without intentional handling.

Typical causes:

```text
localStorage
current time
random values
browser dimensions
```

---

# 111. Persisted State Hydration

If client-only persisted state is required, design a loading/initialization strategy that avoids incorrect initial UI.

Do not globally suppress hydration warnings.

---

# 112. Server-to-Client Initial State

Pass only the minimum client state required.

Do not serialize complete server caches or sensitive resources automatically.

---

# 113. Client-to-Server State

Any value sent from the client is untrusted.

State-management architecture does not provide security.

Server MUST validate and authorize mutations.

---

# 114. State and Authentication

Authentication session state has a server/security owner.

Client UI may derive:

```text
signed in
signed out
loading
```

but must not independently create authorization truth.

---

# 115. Permissions

Permissions SHOULD be authoritative on the server.

Client-side permission state exists for UX only.

Never rely on:

```text
canDelete === false
```

in client state as the security boundary.

---

# 116. Permission Caching

Permission representations may be cached but should be invalidated appropriately after:

```text
role changes
membership changes
ownership changes
```

---

# 117. Realtime State

Realtime state represents server state delivered through subscriptions.

Examples:

```text
presence
chat
live metrics
collaborative changes
```

---

# 118. Realtime Source of Truth

Determine whether realtime messages are:

```text
authoritative events
cache updates
notifications to refetch
```

Do not treat every event payload as authoritative full state automatically.

---

# 119. Realtime Reconciliation

A safe pattern may be:

```text
event received
↓
update known cache
or
invalidate/refetch
```

depending on event semantics.

---

# 120. Realtime Duplication

Realtime messages may arrive:

```text
twice
late
out of order
```

State logic must tolerate this where protocol permits it.

---

# 121. Presence State

Presence is usually ephemeral.

Do not persist indefinitely as durable business state.

---

# 122. Multi-Tab State

Browser tabs may represent multiple concurrent client sessions.

If state needs synchronization across tabs, define it explicitly.

Possible mechanisms:

```text
BroadcastChannel
storage events
service worker
server realtime
```

---

# 123. Multi-Tab Auth

Logout/session invalidation SHOULD eventually propagate to other open tabs.

Do not leave stale privileged UI indefinitely.

---

# 124. Cross-Tab Drafts

Be cautious synchronizing drafts automatically.

Two tabs editing the same resource can create data loss.

Define conflict behavior.

---

# 125. State Machines

Use explicit state machines for interaction/workflow states with meaningful transitions.

Examples:

```text
upload
checkout
onboarding
approval
connection
```

---

# 126. State Machine Example

Prefer:

```text
idle
↓
uploading
↓
processing
↓
complete
```

with explicit failure transitions.

Avoid many independent booleans.

---

# 127. State Transition Validation

Only valid transitions should be possible.

Example:

```text
processing
→ complete

complete
→ uploading
```

may be invalid unless explicitly restarted.

---

# 128. Async State

Async operations SHOULD distinguish:

```text
idle
pending
success
error
```

or an equivalent model.

Do not interpret `data === undefined` as every possible loading/error state.

---

# 129. Previous Data

Some UI should retain previous successful data while a new request loads.

Example:

```text
filter change
→ keep table
→ indicate refreshing
```

This differs from initial loading.

---

# 130. Initial Loading vs Refreshing

Distinguish:

```text
no data yet + loading
```

from:

```text
existing data + refreshing
```

They usually deserve different UX.

---

# 131. Error State

Errors SHOULD live at the narrowest scope capable of recovering appropriately.

Do not put every request error into one global error string.

---

# 132. Global Errors

Global error state is appropriate only for truly application-global incidents.

Examples:

```text
session invalidated
application offline
critical configuration failure
```

---

# 133. Toasts Are Not State Ownership

A toast is feedback.

It should not become the only representation of persistent failure state.

Important errors belong near the failed operation.

---

# 134. Loading Indicators Are Derived

Avoid manually storing:

```text
isSaving
```

when the mutation framework already exposes pending state.

Derive from operation state.

---

# 135. Global Loading Spinner

Avoid one global application loading flag for unrelated operations.

Example:

```text
global.isLoading
```

cannot meaningfully represent simultaneous independent requests.

---

# 136. Operation-Specific Pending State

Prefer:

```text
createProjectPending
deleteMemberPending
```

or mutation-instance state where relevant.

---

# 137. Concurrent Operations

State architecture must support multiple simultaneous operations.

Do not assume:

```text
one request at a time
```

in modern applications.

---

# 138. Request Identity

For concurrent requests, state may require request/resource identity.

Avoid one shared result slot for multiple active resources.

---

# 139. Race Conditions

Common race:

```text
search "a" starts
search "ab" starts
"ab" finishes
"a" finishes
old result overwrites new
```

Prevent stale-response overwrite.

---

# 140. Request Cancellation

Cancel obsolete requests where practical.

Alternatively ensure stale results are ignored.

---

# 141. Debounced State

Debounce effects, not necessarily the visible input value.

Preferred:

```text
input state updates immediately
↓
debounced query changes later
```

This preserves responsive typing.

---

# 142. Throttled State

Use throttling for high-frequency signals where full fidelity is unnecessary.

Examples:

```text
scroll
resize
pointer movement
```

Do not make business state eventually update by throttling without careful semantics.

---

# 143. Undo

Undo architecture requires intentional history.

Possible models:

```text
local operation history
command history
server compensating operation
```

Do not implement undo by retaining arbitrary uncontrolled snapshots.

---

# 144. Redo

Redo is usually meaningful only when state transitions are deterministic and history is well modeled.

---

# 145. Selection State

Transient list selection MAY remain local.

If selection drives:

```text
bulk operations
URL navigation
cross-panel coordination
```

scope it accordingly.

---

# 146. Table State

Possible table state categories:

```text
Pagination → URL
Filters → URL
Sort → URL
Row selection → local
Column visibility → local/user preference
Column width → local/user preference
Server rows → server state
```

Do not place all table state into one generic store automatically.

---

# 147. Dashboard State

Dashboard widgets may combine:

```text
server data
URL filters
local expansion state
user preferences
```

Keep these sources distinct.

---

# 148. Wizard State

Wizard state may involve:

```text
route/current step
form draft
server-created resource
```

Model these separately.

Avoid one massive wizard object unless it is genuinely the domain draft.

---

# 149. Wizard URL

If steps should support refresh/back/deep linking, step identity SHOULD be route/URL state.

---

# 150. Onboarding State

Distinguish:

```text
server-completed onboarding milestones
```

from:

```text
current temporary UI step
```

Do not confuse durable account state with navigation.

---

# 151. Feature Flags

Feature flags come from an authoritative configuration service/server.

The client may consume their result.

Do not treat client-modifiable feature state as authority.

---

# 152. Experiment State

Experiment assignment should have one authoritative allocation strategy.

Avoid reassigning randomly on every render.

---

# 153. Locale State

Locale may be owned by:

```text
URL
account preference
cookie/request context
```

according to internationalization architecture.

Choose one canonical priority.

---

# 154. Responsive State

Do not store viewport width in global state merely to style layouts.

Prefer CSS media/container queries.

Use JavaScript state only when behavioral differences genuinely require it.

---

# 155. Online/Offline State

Connectivity state is advisory.

`navigator.onLine` or equivalent does not guarantee server reachability.

Design offline behavior around actual operations.

---

# 156. Offline State

Offline-first applications require explicit architecture for:

```text
local persistence
queueing writes
conflict resolution
sync
schema migration
```

Do not add offline storage casually.

---

# 157. Offline Mutation Queue

If writes are queued offline, define:

```text
operation identity
ordering
retry
idempotency
conflict behavior
expiration
```

---

# 158. Conflict Resolution

Offline/collaborative systems may use:

```text
last-write-wins
optimistic concurrency
merge
CRDT
manual conflict resolution
```

Choose according to domain semantics.

---

# 159. Do Not Use LWW Automatically

Last-write-wins can silently destroy valid work.

Use only when this tradeoff is acceptable.

---

# 160. State Normalization

Large interconnected client stores MAY normalize entities by identity.

Do not normalize small/simple state automatically.

Normalization creates its own complexity.

---

# 161. Normalized Server Cache

If a data library handles normalized or keyed server caching, do not duplicate another normalization layer unless needed.

---

# 162. State Denormalization

UI-oriented projections MAY be denormalized for convenient rendering.

They should remain derived from canonical state.

---

# 163. Memoization

Memoization is not state management.

Do not store values purely to avoid calculation when memoization/derivation is sufficient.

---

# 164. Memoization Rule

Use memoization when:

- computation is materially expensive;
- reference identity matters;
- measurement supports it.

Do not memoize every derived value.

---

# 165. Effects

Effects synchronize React/client state with external systems.

Examples:

```text
subscription
browser API
imperative third-party widget
```

They are not a general-purpose state pipeline.

---

# 166. Avoid Effect-Based Derivation

Bad:

```text
state A changes
↓
useEffect
↓
set state B
```

when B can be calculated during render.

---

# 167. Avoid Effect Chains

Avoid:

```text
A changes
→ effect updates B
→ effect updates C
→ effect updates D
```

This produces fragile temporal coupling.

Model the source state better.

---

# 168. Event-Driven Updates

User-driven state changes SHOULD occur directly in event handlers or store actions when possible.

Do not detect a button action later through effects unnecessarily.

---

# 169. Initialization

State initialization SHOULD be deterministic.

Avoid complex effects whose only purpose is to initialize values that could be calculated at construction/render time.

---

# 170. Reset Semantics

Every complex stateful feature SHOULD define reset behavior.

Examples:

```text
close dialog
cancel edit
change resource
logout
switch tenant
```

---

# 171. State Leakage

Component reuse must not accidentally retain old state for a new resource.

Use stable resource identity and component keys intentionally where reset semantics require them.

---

# 172. React Keys

Keys identify component state ownership.

Changing the key intentionally resets component-local state.

Use this deliberately, not as a random rendering fix.

---

# 173. State and Navigation

Decide whether navigating between resources should:

```text
preserve local state
reset local state
restore history state
```

according to UX expectations.

---

# 174. Back Navigation

Browser back SHOULD restore meaningful URL-driven state.

This is a major reason not to hide navigational state in global stores.

---

# 175. Scroll State

Browser/framework scroll restoration SHOULD be preferred.

Store custom scroll position only when application architecture requires it.

---

# 176. Local Persistence and Privacy

Persisted state can reveal user behavior on shared devices.

Do not persist:

```text
recent sensitive searches
private resource names
sensitive drafts
```

without considering privacy.

---

# 177. Store Encryption

Client-side encryption cannot make browser-controlled state fully trusted.

Do not treat encrypted local storage as equivalent to server-side secret storage.

---

# 178. State Cleanup

Persistent and global state requires cleanup.

Define cleanup for:

```text
logout
expiration
resource deletion
tenant deletion
version migration
```

---

# 179. Resource Deletion

When a resource is deleted:

```text
server cache
URL
selection
drafts
global store references
realtime subscriptions
```

must no longer assume it exists.

---

# 180. Cache Keys

Server-state cache keys SHOULD encode all state that changes the result.

Examples:

```text
resource ID
tenant
filters
sort
page
locale
permission-relevant scope
```

---

# 181. Cache-Key Consistency

Centralize key construction where complexity warrants it.

Avoid slightly different representations of the same query.

---

# 182. Cache Authorization

Never allow caches to cross authorization boundaries.

A cache hit must not bypass current permission checks where security requires fresh authorization.

---

# 183. Cache Staleness

Explicitly distinguish:

```text
fresh
stale but usable
invalid
```

where state-management library semantics support it.

---

# 184. Stale-While-Revalidate

Stale-while-revalidate is useful when temporary staleness is acceptable.

Example:

```text
render cached value
↓
refresh in background
↓
replace when current result arrives
```

---

# 185. Freshness Is Domain-Specific

Do not choose one universal stale time.

A configuration page and live trading price have different freshness requirements.

---

# 186. Cache Expiry Is Not Invalidation

TTL answers:

> How long may this representation remain cached?

Invalidation answers:

> What known change makes it incorrect now?

Use both where necessary.

---

# 187. Mutation Invalidation Map

For important domains, know relationships such as:

```text
createProject
→ projects list
→ dashboard project count

updateProject
→ project detail
→ projects list

deleteProject
→ project detail
→ projects list
→ search result
```

---

# 188. Avoid Manual Synchronization Explosion

If every mutation requires manually modifying 12 client collections, state architecture is probably too duplicated.

Prefer canonical cache/invalidation patterns.

---

# 189. Query Keys Are Contracts

Changing query-key structure can break cache behavior.

Treat central cache-key conventions intentionally.

---

# 190. State Persistence vs Cache Persistence

Do not confuse:

```text
persisted application state
```

with:

```text
persisted remote cache
```

A persisted cache can be stale immediately when reopened.

---

# 191. Persisted Server Cache

If server cache is persisted client-side:

```text
validate age
scope to user
scope to tenant
clear on logout
```

and treat it as untrusted stale data.

---

# 192. SSR Cache Isolation

Server-side request caches MUST NOT accidentally share user-specific data across users.

Understand request/process/global cache scope.

---

# 193. State Security

State location does not create authorization.

Anything in:

```text
URL
local state
context
global store
localStorage
IndexedDB
```

is client-controlled.

---

# 194. Hidden State Is Not Secure

Do not assume state is secure because:

```text
not shown in UI
not exposed in URL
stored in Redux
encoded
```

Client environments are inspectable.

---

# 195. Sensitive Server State

Sensitive state should remain server-side whenever client knowledge is unnecessary.

---

# 196. Global Store and Secrets

Never store server secrets in global client state.

---

# 197. State Observability

Complex state systems SHOULD be debuggable.

Useful capabilities include:

```text
action logging
state inspection
query inspection
request IDs
realtime event tracing
```

in development.

---

# 198. Production State Logging

Do not dump entire state trees into production logs.

They may contain:

```text
PII
tokens
draft content
sensitive resource data
```

---

# 199. Store DevTools

Development tools MAY be used for debugging.

Ensure production exposure does not leak sensitive data or create unsafe mutation capabilities.

---

# 200. State Testing

Test state behavior according to ownership.

```text
Derived state
→ unit tests where logic is complex

Form state
→ interaction tests

Server state
→ integration tests

URL state
→ navigation tests

Global state
→ store/state-machine tests

Persistence
→ reload/migration tests
```

---

# 201. Test User Outcomes

Prefer tests such as:

```text
user applies filter
URL updates
results update
back restores previous filter
```

over tests tightly coupled to implementation details such as a specific store action name.

---

# 202. Invalidation Tests

Important mutations SHOULD verify affected views eventually reflect authoritative state.

---

# 203. Optimistic Tests

Test:

```text
optimistic success
optimistic failure
rollback
concurrent mutation
```

where optimistic UI is used.

---

# 204. Persistence Tests

Persisted state SHOULD test:

```text
reload
old version
corrupt value
logout
tenant switch
```

where relevant.

---

# 205. Multi-Tab Tests

Security-sensitive or collaboration-heavy applications SHOULD test multi-tab scenarios.

---

# 206. Realtime Tests

Test:

```text
duplicate event
out-of-order event
disconnect
reconnect
missed events
```

where protocol requires resilience.

---

# 207. State Performance

Performance problems can arise from:

```text
oversized providers
global rerenders
large store subscriptions
expensive derived selectors
high-frequency events
```

Measure before redesigning.

---

# 208. Rerendering Is Not Automatically a Problem

Do not create architectural complexity merely to eliminate harmless rerenders.

Optimize when user-visible or measured cost exists.

---

# 209. Selector Granularity

Use narrow selectors when large global stores create unnecessary rerendering.

---

# 210. High-Frequency State

High-frequency values such as:

```text
pointer position
animation values
scroll
```

should not necessarily flow through ordinary application-global state.

Use appropriate specialized mechanisms.

---

# 211. Animation State

Visual animation state SHOULD generally remain close to the visual system.

Do not persist or globalize ephemeral animation progress.

---

# 212. Server State Libraries

Introduce a dedicated server-state library when the client has substantial needs such as:

```text
client fetching
background refetch
mutation cache updates
deduplication
complex stale/fresh behavior
offline cache
```

Do not add one merely because it is popular if server-first framework primitives already satisfy the application.

---

# 213. Global Store Libraries

A global store library is justified by state complexity, not application size.

Large application:

```text
may need no global store
```

Small desktop-like editor:

```text
may legitimately need one
```

---

# 214. One Library Per Concern

Avoid:

```text
Redux
+
Zustand
+
MobX
+
Context
```

all solving generic global state without explicit reason.

Different tools MAY coexist when responsibilities are clearly distinct.

---

# 215. State Library Wrappers

Do not wrap a state library in a large custom abstraction unless it establishes meaningful organizational policy.

Unnecessary wrappers obscure normal library semantics.

---

# 216. Migration Between State Tools

Tool migration should preserve state ownership semantics.

Changing Redux to another store does not fix incorrect source-of-truth architecture by itself.

---

# 217. State Architecture Review

Before adding shared state, ask:

```text
What is the source of truth?
Who needs it?
What is its lifetime?
Does it need URL representation?
Does it need persistence?
Can it be derived?
How does it become stale?
How is it reset?
```

---

# 218. Local State Checklist

Use local state when:

```text
□ One component/subtree owns it
□ It is ephemeral
□ It is not navigational
□ It does not need cross-device persistence
□ It is not server-authoritative
```

---

# 219. URL State Checklist

Use URL state when:

```text
□ Refresh should preserve it
□ Back/forward should track it
□ Sharing the URL should reproduce the view
□ It materially changes page/query state
□ It is safe to expose in a URL
```

---

# 220. Form State Checklist

Use form state when:

```text
□ Value is unsaved user input
□ It may intentionally diverge from server data
□ Validation/touched/dirty state matters
□ Submission owns transition to server truth
```

---

# 221. Context Checklist

Use context when:

```text
□ A bounded subtree shares state/dependency
□ Prop drilling materially harms structure
□ State does not require a full global-store model
□ Provider scope is clear
```

---

# 222. Global Store Checklist

Use a global store when:

```text
□ State is client-owned
□ Multiple distant consumers require it
□ URL is inappropriate
□ Server is not the owner
□ Context is insufficient
□ Lifecycle/reset rules are defined
```

---

# 223. Persistence Checklist

Persist client state only when:

```text
□ Survival across reload has user value
□ Storage location is appropriate
□ Sensitive-data risk is acceptable
□ Expiration defined where needed
□ Schema/version strategy exists
□ Logout/tenant cleanup defined
```

---

# 224. Server State Checklist

For every remote query:

```text
□ Source of truth known
□ Query scope defined
□ Authentication/authorization defined
□ Freshness requirement known
□ Cache behavior defined
□ Invalidation known
□ Loading state defined
□ Error state defined
```

---

# 225. Mutation Checklist

For every state-changing operation:

```text
□ Input validated
□ Auth/authz enforced
□ Server mutation is authoritative
□ Affected cached state identified
□ Invalidation/update strategy defined
□ Optimistic behavior justified
□ Error rollback defined
□ Concurrent behavior considered
```

---

# 226. State Anti-Patterns

Avoid:

```text
Everything in Redux/global store.
```

Avoid:

```text
Everything in React Context.
```

Avoid:

```text
Server data copied permanently into client store.
```

Avoid:

```text
URL filter + different global-store filter.
```

Avoid:

```text
Form library + useState duplicate field values.
```

Avoid:

```text
Stored fullName when firstName + lastName exist.
```

Avoid:

```text
useEffect to synchronize derived state.
```

Avoid:

```text
Global isLoading boolean.
```

Avoid:

```text
Multiple independent booleans describing one state machine.
```

Avoid:

```text
localStorage as secure server storage.
```

Avoid:

```text
Every state persisted forever.
```

Avoid:

```text
Every Client Component wrapped in global providers.
```

Avoid:

```text
Manual cache mutations scattered throughout components.
```

Avoid:

```text
One global store containing every domain.
```

Avoid:

```text
Client permission state treated as security.
```

Avoid:

```text
Cache invalidation = refresh entire application.
```

Avoid:

```text
Persisted state with no version migration.
```

---

# 227. AI State Management Rules

AI coding agents MUST identify state category before introducing state.

Before writing:

```text
useState
Context
global store
localStorage
query cache
```

AI should answer:

```text
Who owns this state?
What is the source of truth?
What lifetime does it need?
```

---

# 228. AI Derivation Rule

AI MUST NOT store a value if it can be reliably and cheaply derived from existing canonical state.

---

# 229. AI Server-State Rule

AI MUST NOT automatically copy fetched server data into global client state.

Prefer the established server/cache architecture.

---

# 230. AI URL-State Rule

AI SHOULD use URL state for:

```text
search
filters
sorting
pagination
meaningful tabs
```

when navigation/shareability matters.

---

# 231. AI Form-State Rule

AI MUST keep unsaved form data within the canonical form-state mechanism.

Do not create redundant state per field unless architecture requires it.

---

# 232. AI Local-State Rule

AI SHOULD start transient UI interaction as local state.

Promote only when additional consumers justify it.

---

# 233. AI Context Rule

AI MUST NOT create an application-wide context merely to avoid passing one prop through a few components.

---

# 234. AI Global-Store Rule

Before introducing a global store, AI must demonstrate:

```text
distant shared consumers
client ownership
URL unsuitable
server ownership unsuitable
```

---

# 235. AI Persistence Rule

AI MUST NOT persist state automatically.

It must consider:

```text
sensitivity
lifetime
versioning
logout cleanup
tenant scope
```

---

# 236. AI Effect Rule

Before generating `useEffect` + `setState`, AI MUST determine whether the value can instead be:

```text
derived during render
updated directly by event
owned by server
owned by URL
```

---

# 237. AI Cache Rule

AI must define:

```text
key
scope
freshness
invalidation
authorization
```

before introducing caching.

---

# 238. AI Mutation Rule

AI-generated mutations MUST explicitly update or invalidate all known affected state.

Do not leave stale UI indefinitely.

---

# 239. AI Optimistic Rule

AI SHOULD use optimistic updates only where rollback and server reconciliation are clear.

---

# 240. AI Tenant Rule

AI MUST reset/re-scope state when tenant context changes.

No tenant-specific state may leak between workspaces.

---

# 241. AI Auth Rule

AI MUST NOT treat client authentication/permission state as authoritative server authorization.

---

# 242. AI Persistence-Migration Rule

If AI changes the shape of persisted client state, it MUST consider:

```text
migration
version bump
safe reset
```

---

# 243. AI Realtime Rule

AI-generated realtime state logic MUST consider:

```text
duplicates
ordering
reconnect
missed events
```

---

# 244. AI Gold Rule

When uncertain, choose:

```text
Derived
>
Authoritative server state
>
URL
>
Form/local state
>
Bounded context
>
Global store
>
Persistent global state
```

---

# 245. Golden State Management Rules

**1. Every state has one authoritative owner.**

**2. Do not store what can be derived.**

**3. Server-owned data remains server state.**

**4. A client cache is not a new source of truth.**

**5. Navigational state belongs in the URL.**

**6. Unsaved user input belongs in form state.**

**7. Transient UI state starts locally.**

**8. Lift state only when ownership expands.**

**9. Context is for bounded cross-tree sharing.**

**10. Global stores require real global/client ownership.**

**11. Do not duplicate URL state in a store.**

**12. Do not duplicate form values in multiple systems.**

**13. Avoid effect-driven derived state.**

**14. Model mutually exclusive states explicitly.**

**15. Invalidation is part of every mutation design.**

**16. Optimistic state must reconcile with server truth.**

**17. Persistence is a feature, not a default.**

**18. Persist only the minimum necessary state.**

**19. Persisted state requires versioning and cleanup.**

**20. Sensitive state should remain server-side whenever possible.**

**21. Client state never replaces authorization.**

**22. Tenant changes reset tenant-scoped state.**

**23. Loading, refreshing, empty, error, and success are distinct states.**

**24. Async operations may occur concurrently.**

**25. Stale responses must not overwrite newer intent.**

**26. Realtime state must tolerate duplicates and reconnects.**

**27. Cache freshness is domain-specific.**

**28. Cache expiry does not replace invalidation.**

**29. One store should not become the entire application architecture.**

**30. Choose state location by semantics, not library preference.**

---

# 246. Canonical State Management Standard

The organizational standard is:

> **Application state is classified by ownership before implementation. Server-authoritative data remains server state and is accessed through the canonical server/data-cache architecture. Navigational and shareable state is represented in the URL. Unsaved user input belongs to form state. Transient interaction remains local to the smallest meaningful component subtree. Context is used for bounded cross-tree ownership, while global client stores are reserved for genuinely shared client-owned state that cannot correctly belong to the server, URL, form, or local component.**

> **Derived values are computed rather than independently stored. Duplicate state is permitted only when explicitly modeled as a cache, projection, snapshot, draft, or optimistic representation with a defined reconciliation strategy. Every mutation defines invalidation or cache-update behavior, and optimistic updates define rollback and authoritative reconciliation. Persistent state is introduced only when survival across reload or sessions creates clear user value, and persisted state includes security, tenant scope, expiration, migration, and cleanup rules.**

> **Client-side state is never treated as a security boundary. Authentication, authorization, permissions, tenant ownership, and critical business state remain authoritative on trusted server systems.**

A production-grade state architecture should make it easy to answer:

```text
What is the source of truth?
Who owns this state?
Can it be derived?
Should it survive refresh?
Should it appear in the URL?
Should it follow the user across devices?
Can it become stale?
How is it invalidated?
How is it reset?
What happens on logout?
What happens on tenant switch?
What happens when two operations occur concurrently?
What happens when the server disagrees with the client?
```

If those answers are unclear, the state is probably stored in the wrong place.

Untuk master hierarchy, letakkan ini selepas API/Routes architecture:

**Architecture → Framework → Security → Auth/AuthZ → Data & Database → API → Routes → State Management → Design Tokens → Layouts → Facade → Components → Forms → Patterns → Reusability → Testing → Performance → Observability → Infrastructure → Documentation → Governance.**
