---
id: "framework"
title: "Framework Guidelines — Gold Standard"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "framework"]
applies_to: ["general"]
related: []
legacy_number: 7
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 58987
provenance: baseline

---

Next.js currently describes the **App Router** as the newer router supporting Server Components, and Server Components are the default model in that architecture. Its own guidance also supports direct server-side data access from Server Components and Server Actions/Functions for mutations, while React documents Server Components and Server Functions as stable React 19 features. citeturn523018search3turn523018search2turn523018search4turn510758search1turn510758search10

# Framework Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical framework architecture for product applications.

The framework standard exists to ensure applications are:

- predictable;
- maintainable;
- secure;
- performant;
- accessible;
- type-safe;
- observable;
- testable;
- upgradeable;
- understandable by humans and AI coding agents.

For the primary web application stack:

```text
Next.js App Router
+
React
+
TypeScript
+
Tailwind CSS
+
shadcn/ui
```

The framework is infrastructure for delivering the product.

It must not become the product architecture itself.

The core principle is:

> **Use framework-native capabilities first, preserve clear server/client boundaries, and introduce additional abstractions only when they solve a demonstrated product or architectural need.**

---

# 2. Canonical Stack

The default application stack is:

```text
Framework
→ Next.js App Router

UI runtime
→ React

Language
→ TypeScript

Styling
→ Tailwind CSS

UI foundation
→ shadcn/ui

Validation
→ canonical schema library

Database
→ approved persistence layer

Authentication
→ approved identity/auth system

Testing
→ approved unit + integration + browser stack

Observability
→ approved logging, metrics, tracing
```

Feature teams MUST NOT independently replace foundational stack components without architectural review.

---

# 3. Version Policy

Production applications MUST run on:

```text
Current supported stable / Active LTS framework line
+
Current security-patched release
```

Do not remain on an outdated patch release when security fixes exist.

Avoid automatic unreviewed major-version upgrades.

Recommended lifecycle:

```text
Security patches
→ expedite

Patch releases
→ routine adoption

Minor releases
→ scheduled adoption

Major releases
→ planned migration
```

---

# 4. Framework Ownership

The framework layer owns:

- rendering architecture;
- routing mechanics;
- server/client boundaries;
- application bootstrapping;
- request lifecycle;
- metadata;
- framework caching primitives;
- route loading/error boundaries;
- build behavior;
- runtime selection.

The framework layer SHOULD NOT own:

- business policy;
- domain authorization semantics;
- product component semantics;
- arbitrary global state;
- business workflow orchestration.

---

# 5. Application Architecture

Use explicit architectural layers.

```text
App / Routes
      ↓
Features
      ↓
Domain
      ↓
Infrastructure
      ↓
External Systems
```

Shared presentation:

```text
Foundations
↓
Design System
↓
Product Components
↓
Feature UI
```

Dependencies should generally point downward toward more stable layers.

---

# 6. Framework-Native First

Prefer built-in framework capabilities before introducing alternative infrastructure.

Examples:

```text
Routing
→ App Router

Layouts
→ layout.tsx

Loading
→ loading.tsx / Suspense

Errors
→ error boundaries

404
→ not-found handling

Metadata
→ Metadata API

Internal navigation
→ framework Link/navigation APIs

Server mutations
→ Server Functions/Actions where suitable

HTTP endpoints
→ Route Handlers
```

Do not introduce an additional router, rendering framework, or request abstraction without a clear requirement.

---

# 7. App Router Standard

New applications MUST use the App Router unless a documented constraint requires otherwise.

Existing Pages Router applications MAY remain until migration is justified.

Do not mix routing models casually within new architecture.

The App Router should define:

```text
routes
layouts
loading boundaries
error boundaries
metadata
server/client composition
```

---

# 8. Route Files

Route files SHOULD remain thin.

A page typically coordinates:

```text
Authorization/context
↓
Data requirements
↓
Page composition
```

Avoid implementing an entire feature inside `page.tsx`.

Prefer:

```text
page.tsx
↓
feature components
↓
domain/application services
```

---

# 9. Route Folder Organization

Route folders represent URL architecture.

They SHOULD NOT become general-purpose code directories.

Good:

```text
app/
  projects/
    [projectId]/
      page.tsx
      loading.tsx
      error.tsx
```

Reusable feature code belongs outside route-specific files where appropriate.

---

# 10. Route Groups

Use route groups for implementation organization without altering product URLs.

Examples:

```text
(auth)
(app)
(marketing)
(admin)
```

Route groups SHOULD represent:

- layout boundaries;
- product areas;
- security/context boundaries.

Do not create route groups merely for aesthetic filesystem organization.

---

# 11. Layouts

Use framework layouts for UI that genuinely persists across descendant routes.

Examples:

```text
Root shell
Workspace shell
Settings navigation
Project context
```

Do not place unrelated business state in persistent layouts solely to keep it mounted.

---

# 12. Root Layout

The root layout SHOULD own only application-wide concerns such as:

```text
HTML/body
fonts
theme initialization
global providers
global accessibility structure
application metadata defaults
```

Avoid turning the root layout into a giant dependency container.

---

# 13. Nested Layouts

A nested layout should correspond to persistent product structure.

Good:

```text
/settings/*
→ SettingsLayout
```

Poor:

```text
nested layout
→ exists only to avoid repeating one div
```

Use normal components for ordinary composition.

---

# 14. Server-First Architecture

Components SHOULD remain Server Components unless client-side execution is required.

Server-first is the default.

Use Client Components only for browser-dependent behavior such as:

- local interactive state;
- event handlers;
- browser APIs;
- effects;
- client-only third-party libraries;
- interactive primitives requiring client execution.

---

# 15. `"use client"` Rule

`"use client"` creates a client boundary.

It SHOULD be introduced at the smallest practical interactive boundary.

Prefer:

```text
Server Page
├── Server Header
├── Server Content
└── Client Filter
```

over:

```text
"use client"

Entire Page
├── Header
├── Content
└── Filter
```

when only the filter requires browser execution.

---

# 16. Client Boundary Blast Radius

Remember that the client boundary pulls the relevant dependency graph into the client environment.

Before adding `"use client"` high in a tree, ask:

```text
Does this entire subtree need client JavaScript?
```

If no, move the boundary downward.

---

# 17. `"use server"` Rule

`"use server"` identifies server-callable functions, not Server Components.

Do not add `"use server"` to ordinary server components.

Server Components are server-rendered by framework architecture without a `"use server"` directive.

---

# 18. Server-Only Code

Sensitive server code MUST remain server-only.

Examples:

```text
database access
private API credentials
filesystem operations
secret management
privileged SDKs
authorization infrastructure
```

Use explicit server-only boundaries where supported.

Never depend on developers merely remembering not to import sensitive code into client modules.

---

# 19. Client-Only Code

Browser-dependent modules SHOULD be clearly separated.

Examples:

```text
window
document
localStorage
navigator
ResizeObserver
browser-only SDKs
```

Do not make server modules import browser-only dependencies.

---

# 20. Serialization Boundary

Data crossing server-to-client boundaries MUST be intentionally serializable.

Do not pass arbitrary:

- database clients;
- class instances;
- privileged service objects;
- secrets;
- server closures;

into Client Components.

Pass the minimum data required by the client.

---

# 21. Data Minimization Across Client Boundary

Prefer:

```text
Client receives:
id
name
display status
```

rather than:

```text
Client receives:
entire database entity
internal metadata
private fields
authorization fields
```

The browser is not a trusted environment.

---

# 22. Data Fetching Default

Prefer server-side data retrieval when:

- data is required for initial rendering;
- credentials must remain private;
- SEO matters;
- client interactivity is unnecessary;
- the server can access the data source directly.

Avoid client-side `useEffect` fetching as the default application architecture.

---

# 23. Data Access Location

Place data-access logic in dedicated modules.

Example:

```text
features/projects/
  data/
    get-project.ts
    list-projects.ts
```

or:

```text
server/
  projects/
```

rather than placing raw SQL/database access throughout page components.

---

# 24. Database Access

Server Components MAY call trusted data-access code directly when architecture permits.

Do not create an internal HTTP API solely so your own Server Component can call your own server.

Prefer:

```text
Server Component
↓
Data access layer
↓
Database
```

over:

```text
Server Component
↓ HTTP
API route
↓
Database
```

unless the HTTP boundary serves an actual architectural purpose.

---

# 25. APIs Still Have a Role

Use Route Handlers or equivalent HTTP APIs when:

- external consumers require HTTP;
- mobile/native clients consume the service;
- webhooks are received;
- a browser client requires a client-visible endpoint;
- external service architecture requires the boundary;
- streaming/protocol behavior requires HTTP handling.

Do not eliminate useful APIs merely because Server Components exist.

---

# 26. Fetch at the Point of Ownership

Data SHOULD be fetched close to the server component that semantically owns it.

Avoid giant page-level loaders returning enormous unrelated objects.

Prefer coherent data ownership.

---

# 27. Avoid Fetch Waterfalls

Independent data requests SHOULD begin concurrently.

Avoid:

```text
await A
↓
await B
↓
await C
```

when B and C do not depend on A.

Prefer parallel work where dependencies allow.

---

# 28. Intentional Waterfalls

Sequential data fetching is correct when one request genuinely depends on another.

Do not parallelize merely for style.

Correctness and dependency semantics come first.

---

# 29. Suspense

Use Suspense boundaries to allow independent UI regions to stream or wait independently.

Place boundaries according to user-perceived content structure.

Good:

```text
Page Header
Main Summary
<Suspense>
  Secondary Analytics
</Suspense>
```

Avoid wrapping every tiny component in its own Suspense boundary.

---

# 30. Streaming

Streaming SHOULD improve perceived performance by delivering useful structure before slow secondary work finishes.

Use it for:

- dashboards;
- large detail pages;
- secondary panels;
- slow independent data.

Do not stream arbitrary fragments if the resulting page feels unstable.

---

# 31. Loading States

Use route-level `loading` boundaries when they improve navigation behavior.

Use component-level Suspense when smaller regions have independent latency.

Loading UI SHOULD preserve expected geometry.

---

# 32. Loading Hierarchy

Use the smallest useful loading boundary.

Avoid:

```text
small widget reload
→ whole-page loading state
```

when the rest of the interface can remain stable.

---

# 33. Caching Is Explicit Architecture

Do not treat caching as an invisible performance trick.

Every cache should answer:

```text
What is cached?
For whom?
For how long?
How is it invalidated?
What consistency is required?
```

---

# 34. Cache Based on Data Semantics

Use caching according to business requirements.

Examples:

```text
Public documentation
→ highly cacheable

Product catalog
→ revalidation appropriate

User dashboard
→ user-scoped/dynamic

Permissions
→ correctness-sensitive

Bank balance
→ freshness-sensitive
```

Do not apply one caching policy application-wide.

---

# 35. Framework Cache APIs

Use current framework-supported caching primitives rather than historical patterns copied from old tutorials.

Caching APIs evolve significantly between framework versions.

Version-specific code MUST follow version-matched documentation.

---

# 36. Cache Invalidation

A cache without an invalidation strategy is incomplete.

Mutations SHOULD explicitly determine which cached views become stale.

Prefer semantic invalidation when supported.

---

# 37. Avoid Global Cache Busting

Do not invalidate the entire application after small mutations.

Invalidate the narrowest coherent data scope practical.

---

# 38. Dynamic Rendering

Use dynamic rendering when request-time context materially affects output.

Examples:

```text
session
authorization
request-specific context
highly fresh data
```

Do not make an entire application dynamic unnecessarily.

---

# 39. Static Rendering

Use static rendering when content can safely be produced ahead of requests.

Good candidates:

- marketing content;
- documentation;
- stable public pages.

Do not force dynamic infrastructure onto static content.

---

# 40. Rendering Decision

Choose rendering according to:

```text
Freshness
Personalization
Security
Latency
Cost
SEO
Interaction
```

Do not use one rendering mode because it is currently fashionable.

---

# 41. Mutations

Mutations SHOULD have a clear server-side command boundary.

Suitable options include:

```text
Server Function/Action
Route Handler/API
Domain application service
```

The choice depends on consumer requirements.

---

# 42. Server Functions / Actions

Use Server Functions for application-owned mutations when they simplify:

- forms;
- server-side validation;
- authorization;
- revalidation;
- redirect flow.

Do not use them as a reason to bypass architectural layering.

---

# 43. Mutation Structure

A mutation SHOULD generally follow:

```text
Receive untrusted input
↓
Authenticate
↓
Authorize
↓
Validate
↓
Perform domain operation
↓
Persist
↓
Invalidate/update cache
↓
Return result / redirect
```

The UI invocation mechanism does not change these requirements.

---

# 44. Validation

Server mutation input MUST be validated.

TypeScript types do not validate runtime data.

Validate:

```text
FormData
JSON
query params
path params
headers
cookies
third-party payloads
```

at trusted boundaries.

---

# 45. Mutation Return Types

Mutations SHOULD expose predictable structured outcomes.

Conceptually:

```ts
type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: KnownError }
```

where appropriate.

Do not force clients to interpret arbitrary exception strings.

---

# 46. Redirect After Mutation

Redirect when the product workflow genuinely changes destination.

Examples:

```text
Create
→ new resource

Delete detail resource
→ collection
```

Do not redirect merely because mutation code runs on the server.

---

# 47. Progressive Enhancement

Forms SHOULD preserve native web behavior when practical.

Prefer semantic:

```html
<form>
<button>
<input>
```

and framework-enhanced behavior over custom click handlers that unnecessarily recreate form semantics.

---

# 48. Optimistic Updates

Use optimistic UI when:

- success is highly likely;
- rollback is understandable;
- latency materially affects experience.

Do not optimistically represent irreversible or high-risk operations without a deliberate failure model.

---

# 49. Client Data Fetching

Client-side fetching is appropriate for:

- continuously updating data;
- browser-specific information;
- user-triggered refresh;
- highly interactive views;
- client-side polling/subscriptions.

It should not be the automatic default for initial page data.

---

# 50. Client Data Library

Do not introduce a client data-fetching library unless application requirements justify it.

If adopted, standardize one approach.

Avoid:

```text
fetch
+
SWR
+
React Query
+
custom hook
+
Redux request state
```

all representing the same class of server state.

---

# 51. Server State vs Client State

Distinguish:

```text
Server state
→ authoritative remote data

Client state
→ transient browser interaction

URL state
→ navigational/shareable state

Form state
→ pending user input
```

Do not put all four into one global store.

---

# 52. State Ownership

State SHOULD live at the narrowest owner that needs it.

Prefer:

```text
component state
```

before:

```text
page state
```

before:

```text
global state
```

unless broader ownership is genuinely required.

---

# 53. Global State

Global client state requires justification.

Appropriate examples may include:

- complex editor state;
- deeply shared ephemeral application context;
- specialized realtime application state.

Inappropriate examples:

- server data already represented by routes;
- simple modal visibility;
- every form field;
- current page route.

---

# 54. URL State

Search, filtering, sorting, pagination, and meaningful navigational state SHOULD follow the Routes Gold Standard and use the URL when shareability/history matters.

Do not duplicate URL state into independent global state without need.

---

# 55. Derived State

Do not store values that can safely and cheaply be derived from existing state.

Prefer:

```text
derive during render
```

over:

```text
state
+
effect synchronizing duplicate state
```

Duplicate state creates inconsistency.

---

# 56. Effects

Effects are for synchronization with external systems.

Do not use effects as the default mechanism for ordinary data transformation.

Before `useEffect`, ask:

```text
Can this happen during render?
Can this happen in an event handler?
Can this happen on the server?
```

If yes, an effect may be unnecessary.

---

# 57. Effect Dependencies

Effects MUST accurately describe their dependencies.

Do not disable dependency lint rules merely to silence warnings.

If dependency behavior is difficult to express, reconsider the component architecture.

---

# 58. React Component Standard

Components SHOULD be:

- focused;
- composable;
- semantically named;
- easy to understand;
- appropriately scoped.

Avoid both:

```text
2,000-line page components
```

and:

```text
hundreds of meaningless 3-line wrappers
```

---

# 59. Component Responsibility

A component SHOULD have one coherent UI responsibility.

That does not mean every component must be visually tiny.

A cohesive complex component can be preferable to fragmented indirection.

---

# 60. Component Naming

Use domain or UI semantics.

Good:

```text
ProjectHeader
InvoiceTable
MemberPicker
DeleteProjectDialog
```

Poor:

```text
Component1
GenericBox
ContentThing
MainWrapper2
```

---

# 61. Component Location

Start feature-specific components inside the feature.

Promote them according to the Reusability Gold Standard.

Do not place every component in a global `/components` directory.

---

# 62. Props

Props SHOULD express component semantics.

Avoid passing enormous generic configuration objects when explicit props or composition would be clearer.

---

# 63. Prop Drilling

Normal prop passing is not inherently a problem.

Do not introduce global state merely to avoid passing props through a few coherent levels.

Use context only where shared ownership genuinely exists.

---

# 64. React Context

Context is appropriate for stable cross-tree context such as:

```text
theme
compound component state
specialized application context
```

Do not turn Context into a generic global-state replacement.

---

# 65. Context Scope

Providers SHOULD be placed as low in the tree as practical.

Avoid wrapping the entire application in a provider when only one feature requires it.

---

# 66. Provider Discipline

The root provider tree SHOULD remain small.

Avoid:

```text
Provider
  Provider
    Provider
      Provider
        Provider
          entire application
```

for feature-specific dependencies.

---

# 67. Memoization

Do not add `useMemo`, `useCallback`, or memoization mechanically.

Optimize when:

- measurement identifies cost;
- identity stability is required;
- a library contract requires it;
- recomputation is materially expensive.

Readability takes precedence over speculative micro-optimization.

---

# 68. React Compiler

Where the supported framework/compiler stack enables React Compiler, prefer its standard supported model over widespread manual memoization.

Manual optimizations MAY remain where:

- profiling justifies them;
- compiler behavior is unsuitable;
- identity semantics require them.

---

# 69. Refs

Use refs for imperative interaction with:

- DOM;
- third-party imperative APIs;
- mutable values that should not trigger render.

Do not use refs to hide ordinary state-management problems.

---

# 70. Keys

List keys MUST represent stable identity.

Bad:

```text
array index
```

when elements may reorder.

Good:

```text
stable resource ID
```

Keys are not arbitrary warning suppressors.

---

# 71. TypeScript Mandatory

Application code SHOULD use TypeScript.

New production modules MUST NOT introduce JavaScript where TypeScript is the established repository language without explicit justification.

---

# 72. Strict Mode

TypeScript `strict` SHOULD remain enabled.

Do not disable strictness globally to accommodate poorly typed code.

Resolve types or isolate the exception.

---

# 73. `any`

Avoid explicit `any`.

Prefer:

```text
known type
generic
unknown
validated runtime type
```

Use `any` only at narrow, documented integration boundaries when no better representation exists.

---

# 74. `unknown`

Use `unknown` for untrusted or genuinely unknown values.

Narrow through:

- schema validation;
- type guards;
- explicit checking.

This is particularly important at external boundaries.

---

# 75. Type Assertions

Type assertions do not validate runtime data.

Avoid:

```ts
request.json() as User
```

as a substitute for validation.

Assertions should represent verified knowledge, not wishful typing.

---

# 76. Non-Null Assertions

Avoid routine:

```ts
value!
```

If null is impossible, architecture or validation should preferably establish that fact.

Use assertions only where the invariant is genuinely guaranteed.

---

# 77. Domain Types

Use types that encode meaningful domain concepts.

Prefer:

```text
ProjectId
Money
Permission
InvoiceStatus
```

where doing so materially prevents misuse.

Do not create nominal wrappers for every primitive without value.

---

# 78. Discriminated Unions

Use discriminated unions for finite state when they improve correctness.

Example:

```text
idle
loading
success
error
```

with state-specific data.

Avoid illegal combinations of booleans.

---

# 79. Exhaustiveness

Closed domain states SHOULD support exhaustive handling.

A new state should produce a compile-time or test-visible failure rather than silently reaching an arbitrary fallback.

---

# 80. Runtime Validation

TypeScript stops at runtime boundaries.

Runtime validation is required for:

```text
HTTP
forms
environment variables
webhooks
files
external APIs
queue messages
stored untrusted JSON
```

---

# 81. Environment Variables

Environment variables MUST be validated at startup/build time where practical.

Fail early for missing or invalid required configuration.

Do not scatter raw `process.env` access throughout application code.

---

# 82. Environment Configuration

Centralize configuration.

Conceptually:

```text
env
↓ validation
config
↓
application
```

Do not allow every feature to interpret environment variables independently.

---

# 83. Public Environment Variables

Anything intentionally exposed to the browser MUST be treated as public.

Never place secrets into client-visible environment configuration.

---

# 84. Import Boundaries

Architecture SHOULD be enforceable through import rules.

Examples:

```text
client
× server-only module

design system
× feature domain

foundation
× application feature

feature A internals
× feature B internals
```

Use linting/build tooling where practical.

---

# 85. Feature Architecture

A feature MAY contain:

```text
components/
actions/
data/
schemas/
types/
hooks/
utils/
```

only as required.

Do not mechanically create every folder for every feature.

Structure should reflect actual complexity.

---

# 86. Feature Encapsulation

Features SHOULD expose an intentional interface.

Other features should not deep-import arbitrary implementation files.

Cross-feature interaction should flow through:

- domain contracts;
- shared libraries;
- intentional public exports.

---

# 87. Domain Logic

Business logic should not live primarily inside React components.

Prefer:

```text
Component
↓
action/application service
↓
domain behavior
```

Components should coordinate presentation and interaction.

---

# 88. Framework Independence of Domain

Core business rules SHOULD avoid unnecessary framework coupling.

A billing calculation should not require React or Next.js to execute.

This improves:

- testing;
- portability;
- clarity;
- reuse.

---

# 89. Framework Adapters

Framework-specific code SHOULD adapt the product architecture to framework concerns.

Examples:

```text
route
→ calls application service

Server Action
→ calls application service

Route Handler
→ calls application service
```

Do not make business logic depend on route objects unnecessarily.

---

# 90. Error Architecture

Errors should be handled at appropriate layers.

```text
Domain
→ meaningful domain failure

Application layer
→ translate/orchestrate

Route/server action
→ transport/UI representation

UI
→ useful recovery state
```

Do not collapse every failure into `"Something went wrong"` internally.

---

# 91. Expected Errors

Expected failures SHOULD be represented deliberately.

Examples:

```text
validation failure
permission denied
resource conflict
quota exceeded
```

Avoid treating ordinary business outcomes as mysterious unhandled exceptions.

---

# 92. Unexpected Errors

Unexpected exceptions SHOULD reach controlled error boundaries and observability.

Do not swallow them silently.

---

# 93. Route Error Boundaries

Use framework error boundaries at meaningful route segments.

A nested failure SHOULD NOT crash the entire application shell when isolation is possible.

---

# 94. Not Found

Use canonical not-found behavior for absent resources.

Do not render:

```text
Project: undefined
```

or an empty detail page when the resource does not exist.

---

# 95. Error Logging

Unexpected server failures SHOULD be captured in approved observability.

User-facing messages SHOULD not expose sensitive stack or infrastructure details.

---

# 96. Metadata

Every meaningful page SHOULD define useful document metadata.

Use framework metadata capabilities rather than manual `<head>` manipulation.

Examples:

```text
title
description
robots
canonical
social metadata
```

where relevant.

---

# 97. Page Titles

Use the Routes Gold Standard convention.

Example:

```text
Acme Redesign · Projects · Product
```

Do not leave every route titled:

```text
App
```

---

# 98. Images

Use framework image optimization where it provides meaningful benefit and deployment compatibility.

Always consider:

- explicit dimensions/aspect ratio;
- responsive sizes;
- loading priority;
- remote source restrictions;
- layout stability.

---

# 99. Font Loading

Use the framework-supported font mechanism.

Goals:

```text
minimal layout shift
controlled loading
self-hosting where appropriate
consistent typography
```

Avoid manually loading fonts through multiple conflicting mechanisms.

---

# 100. Scripts

Third-party scripts SHOULD use framework-supported loading controls.

Choose loading priority according to actual need.

Third-party scripts are:

- performance cost;
- privacy consideration;
- security surface.

Do not add them casually.

---

# 101. Styling

Tailwind is the canonical utility styling layer.

shadcn/ui is the primary component foundation.

Semantic tokens define product meaning.

The hierarchy is:

```text
Design tokens
↓
Tailwind utilities
↓
shadcn primitives
↓
Design system
↓
Product components
↓
Feature UI
```

---

# 102. Global CSS

Global CSS SHOULD contain genuinely global concerns:

```text
token definitions
base/reset behavior
global typography foundations
theme variables
```

Do not place feature styling into global stylesheets.

---

# 103. Arbitrary Tailwind Values

Avoid arbitrary values for established system properties.

Prefer:

```text
gap-6
rounded-lg
text-muted-foreground
```

over:

```text
gap-[23px]
rounded-[11px]
text-[#777]
```

unless the value has a legitimate exceptional requirement.

---

# 104. CSS Specificity

Avoid building a high-specificity CSS hierarchy that fights Tailwind and component styles.

Prefer clear component ownership.

Do not routinely use `!important` to resolve architecture problems.

---

# 105. shadcn Components

Use existing canonical internal shadcn-based components first.

Do not repeatedly run upstream generators and create duplicate implementations without inspecting the repository.

---

# 106. Upstream shadcn Changes

Treat shadcn as source code the organization owns after adoption.

Upstream changes should be reviewed and intentionally incorporated.

Do not automatically overwrite internal product customization.

---

# 107. Accessibility

Framework choices MUST preserve semantic HTML.

React abstraction is not permission to replace native semantics.

Prefer:

```text
button
a
form
input
label
nav
main
table
```

over generic div-based recreations.

---

# 108. Hydration

Avoid avoidable server/client rendering differences.

Do not intentionally produce different initial DOM based on browser-only values without a safe hydration strategy.

---

# 109. Hydration Errors

Hydration warnings MUST be investigated.

Do not globally suppress hydration warnings as a routine fix.

Suppression is appropriate only for known unavoidable mismatches with documented reasoning.

---

# 110. Browser APIs

Access browser globals only inside client-safe contexts.

Do not reference:

```text
window
document
localStorage
```

during server rendering.

---

# 111. Local Storage

Use local storage for genuinely client-owned non-sensitive persistence.

Do not use it as the authoritative store for:

- authentication;
- authorization;
- server data;
- secrets.

---

# 112. Cookies

Cookie access SHOULD follow the Security Gold Standard.

Server-readable security-sensitive state generally belongs in appropriately protected cookies rather than arbitrary browser storage.

---

# 113. Middleware / Request Interception

Use framework middleware/proxy/request-interception features only for suitable cross-cutting request behavior.

Potential uses:

```text
redirects
locale resolution
request normalization
coarse authentication routing
```

Do not put the entire application's business authorization layer in middleware.

---

# 114. Authorization Still Belongs Near Resources

Middleware MAY reject obviously unauthenticated requests.

Resource-level authorization MUST still occur in trusted server operations.

Never assume:

```text
middleware passed
→ all downstream resources authorized
```

---

# 115. Route Handlers

Route Handlers SHOULD behave as intentional API endpoints.

They require:

```text
authentication
authorization
validation
structured errors
rate/resource limits where required
```

Do not treat them as unrestricted server escape hatches.

---

# 116. HTTP Semantics

Use appropriate HTTP semantics.

Examples:

```text
GET
→ retrieval

POST
→ command/create

PUT/PATCH
→ update

DELETE
→ deletion
```

where an API boundary exists.

Return meaningful status codes.

---

# 117. Request Parsing

Request bodies are untrusted.

Validate before passing data into domain or database operations.

Do not cast request JSON directly into trusted TypeScript types.

---

# 118. Serialization

API response serialization SHOULD be intentional.

Do not return complete ORM/database objects by default.

Map to explicit response models.

---

# 119. Authentication Integration

Authentication SHOULD use one canonical infrastructure path.

Avoid:

```text
feature A session helper
feature B custom JWT
feature C local cookie
```

Authentication consistency is security architecture.

---

# 120. Authorization Integration

Framework handlers SHOULD call the canonical policy layer.

Avoid duplicating role logic across pages, route handlers, Server Functions, and components.

---

# 121. Security Boundary Rule

The server/client boundary is a trust boundary.

Anything originating in the client may be manipulated.

This includes:

```text
hidden fields
disabled controls
route parameters
query parameters
cookies
form data
client state
```

Validate and authorize server-side.

---

# 122. Secrets

Secrets MUST remain in server-only modules.

Never import a secret-bearing configuration module from a Client Component.

---

# 123. Build-Time vs Runtime Secrets

Understand whether configuration is:

```text
build-time
runtime
client-exposed
server-only
```

A variable embedded at build time may become part of a public bundle.

---

# 124. Performance Philosophy

Performance SHOULD be architectural before micro-optimization.

Priority order:

```text
Reduce unnecessary client JS
↓
Avoid network waterfalls
↓
Use appropriate caching
↓
Stream slow content
↓
Optimize assets
↓
Measure
↓
Micro-optimize
```

---

# 125. JavaScript Budget

Every Client Component contributes toward client-side application cost.

Do not move server-renderable content into the client without reason.

---

# 126. Bundle Discipline

Avoid importing:

- entire icon libraries;
- entire utility libraries;
- heavy editors;
- large chart systems;

when only a small capability is required.

Use appropriate modular imports and lazy loading.

---

# 127. Dynamic Imports

Dynamically load heavy optional client functionality where it materially reduces baseline cost.

Examples:

```text
rich text editor
advanced charting
map
code editor
large media tool
```

Do not dynamically import tiny components without measurable benefit.

---

# 128. Third-Party Client Libraries

Client-side dependencies require stronger scrutiny because they affect:

- bundle size;
- security;
- runtime;
- hydration;
- browser compatibility.

Prefer native platform/framework capability when sufficient.

---

# 129. Performance Measurement

Optimize based on measurement.

Monitor relevant:

- Core Web Vitals;
- server response latency;
- route transition latency;
- bundle size;
- data-fetch latency;
- cache behavior.

Do not optimize based only on intuition.

---

# 130. Web Vitals

User-perceived performance SHOULD be measured in production where possible.

Laboratory benchmarks are useful but do not replace real-user behavior.

---

# 131. Prefetching

Use framework prefetching defaults unless measurement or resource cost justifies adjustment.

Do not manually prefetch large quantities of unlikely destinations.

---

# 132. Navigation

Internal navigation SHOULD use framework navigation primitives.

Prefer links for destinations.

Do not use imperative router calls for ordinary clickable navigation when a semantic link is appropriate.

---

# 133. Browser Expectations

Preserve:

```text
Open in new tab
Copy link
Back
Forward
Refresh
Deep link
```

Framework abstractions must not break basic web behavior.

---

# 134. Forms

Use semantic forms.

Prefer framework/server-enhanced native form behavior before constructing elaborate client-side submission systems.

Use client form libraries when form complexity genuinely requires them.

---

# 135. Form Libraries

A form library may be justified for:

- highly dynamic forms;
- field arrays;
- complex client validation;
- sophisticated interaction.

Do not install one merely to manage two text inputs.

---

# 136. Form Validation Architecture

Where practical, share domain-compatible validation semantics across client and server.

Server validation remains authoritative.

Client validation improves user experience.

---

# 137. Error Display

Form action failures SHOULD return structured errors that can be mapped to:

```text
field errors
form errors
authorization errors
conflicts
```

Do not expose raw backend error strings.

---

# 138. Concurrency

Server mutations must consider concurrent execution.

Framework convenience does not remove the need for:

- transactions;
- uniqueness constraints;
- idempotency;
- locking;

where domain correctness requires them.

---

# 139. Idempotency

Operations likely to be retried SHOULD define idempotency semantics.

Examples:

```text
payment
invitation
provisioning
external side effect
```

Do not assume one button click equals one server execution.

---

# 140. Runtime Selection

Choose runtime intentionally.

Use the default supported server runtime unless edge/serverless-specific benefits justify another runtime.

Runtime choice affects:

- available APIs;
- database drivers;
- libraries;
- latency;
- observability;
- execution limits.

---

# 141. Edge Runtime

Do not choose edge execution merely because it sounds faster.

Use it when workload characteristics and dependency compatibility support it.

Database topology often matters more than geographic function placement.

---

# 142. Node Runtime

Use Node-compatible runtime when application dependencies require:

- native Node APIs;
- conventional database drivers;
- filesystem/process capabilities;
- libraries not designed for edge environments.

---

# 143. Runtime Mixing

Different routes MAY use different runtimes where justified.

Keep runtime boundaries obvious.

Do not force shared code to assume APIs unavailable in one target runtime.

---

# 144. Timeouts

External I/O SHOULD have bounded timeout behavior.

Do not allow server requests to wait indefinitely on third-party systems.

---

# 145. Retries

Retry policy belongs in appropriate infrastructure.

Do not blindly retry all requests.

Consider:

```text
idempotency
failure type
latency budget
downstream load
```

---

# 146. External Services

Third-party service calls SHOULD go through coherent service adapters where this provides:

- authentication policy;
- timeouts;
- observability;
- error translation;
- provider isolation.

Do not scatter raw provider SDK usage throughout UI code.

---

# 147. Webhooks

Webhook handling belongs in Route Handlers or appropriate server endpoints.

Apply the Security Gold Standard:

```text
signature verification
replay protection
idempotency
validation
bounded processing
```

---

# 148. Background Work

Long-running work SHOULD be moved outside request lifecycle when appropriate.

Examples:

```text
large imports
email campaigns
video processing
complex reports
bulk exports
```

Do not hold an interactive HTTP request open for arbitrarily long processing.

---

# 149. Queue Boundary

Queued work should carry minimum required stable identifiers.

Avoid placing unnecessary sensitive or stale complete objects into job payloads.

---

# 150. Observability

Framework-level observability SHOULD capture:

```text
route latency
server errors
external calls
database performance
background operations
critical mutations
```

Use the organization's canonical observability platform.

---

# 151. Logging

Use structured server logs.

Do not use scattered production:

```ts
console.log(...)
```

as the observability architecture.

Development logging MAY remain simpler.

---

# 152. Correlation

Requests and significant asynchronous operations SHOULD have enough correlation context to trace failures across:

```text
web request
database
external API
queue
worker
```

where architecture requires it.

---

# 153. Telemetry Boundaries

Client analytics and server observability solve different problems.

Do not mix:

```text
product analytics
security audit
application logs
performance telemetry
```

into one undifferentiated event stream.

---

# 154. Development Environment

Local development SHOULD approximate production architecture without requiring production credentials.

Use:

- development credentials;
- local/test data;
- isolated services;
- safe defaults.

Never casually depend on production databases during normal development.

---

# 155. Environment Parity

Important runtime behavior should remain consistent across:

```text
development
CI
preview
production
```

where practical.

Avoid production-only surprises caused by substantially different architecture.

---

# 156. Preview Environments

Preview deployments SHOULD:

- use safe isolated configuration;
- not expose production secrets unnecessarily;
- make branch behavior reviewable;
- support product/design QA.

Preview is still an externally reachable security surface.

---

# 157. Build

The build MUST fail for meaningful correctness violations such as:

```text
type errors
invalid required config
unresolved modules
critical static analysis failures
```

Do not configure production builds to ignore TypeScript errors merely to ship.

---

# 158. Linting

Linting SHOULD enforce architectural and correctness rules.

Useful categories:

```text
React correctness
import boundaries
accessibility
unused code
framework rules
security-sensitive patterns
```

Do not accumulate a lint configuration with thousands of ignored violations.

---

# 159. Formatting

Use one automatic formatter.

Code formatting should not consume review attention.

Formatting configuration SHOULD be repository-wide.

---

# 160. Code Quality

Framework code should optimize for:

```text
clarity
predictability
explicit ownership
small dependency surface
```

Not cleverness.

A straightforward implementation is preferable to a sophisticated abstraction that future contributors cannot safely modify.

---

# 161. Testing Pyramid

Use multiple levels of testing.

```text
Unit
→ domain and isolated behavior

Integration
→ data/service/framework boundaries

Browser/E2E
→ critical user journeys
```

Do not attempt to prove everything with one testing layer.

---

# 162. Unit Tests

Unit tests are most valuable for:

- domain rules;
- transformations;
- validation;
- permissions;
- algorithms;
- state machines.

Do not unit-test framework internals.

---

# 163. Component Tests

Test meaningful component behavior.

Prioritize:

```text
user interaction
accessibility behavior
states
conditional rendering
```

Avoid tests coupled to internal implementation details.

---

# 164. Integration Tests

Integration tests SHOULD cover:

```text
server mutations
database interactions
authorization
Route Handlers
external adapters
```

where failures can cross architectural boundaries.

---

# 165. End-to-End Tests

Critical journeys SHOULD have browser-level verification.

Examples:

```text
sign in
onboarding
create core resource
edit
delete
permissions
checkout
critical settings
```

Do not E2E-test every trivial rendering permutation.

---

# 166. Framework Upgrade Testing

Framework upgrades SHOULD run:

```text
type checking
unit tests
integration tests
E2E critical flows
build
bundle/performance checks
```

before production rollout.

---

# 167. Upgrade Discipline

Do not let framework versions stagnate for years.

Small regular upgrades are generally easier than emergency multi-major migrations.

Maintain a routine dependency-upgrade cadence.

---

# 168. Security Releases

Framework security updates require prioritized review and deployment.

If upstream identifies critical affected versions, patching takes precedence over ordinary feature work according to the Security Gold Standard.

---

# 169. Canary / Experimental APIs

Experimental framework capabilities MAY be evaluated in controlled contexts.

They SHOULD NOT become critical production infrastructure without:

```text
clear benefit
known migration path
owner
risk acceptance
```

---

# 170. Framework Lock-In

Using framework capabilities is not inherently bad lock-in.

Avoid unnecessary framework-independent abstractions that merely duplicate well-designed framework APIs.

Abstract where:

- domain portability matters;
- testing benefits;
- vendor replacement is plausible;
- architectural ownership requires separation.

---

# 171. Avoid Framework Leakage into Domain

Business rules should remain portable in principle.

Example:

Bad:

```text
calculateInvoice(nextRequest)
```

Better:

```text
calculateInvoice(invoice)
```

and let framework code adapt the request.

---

# 172. Package Structure

A typical application MAY use:

```text
app/
components/
features/
lib/
server/
styles/
```

or equivalent.

Folder names matter less than:

- clear ownership;
- predictable imports;
- dependency direction.

---

# 173. Example Architecture

```text
src/
├── app/
│   ├── (auth)/
│   ├── (app)/
│   ├── api/
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   └── product/
│
├── features/
│   ├── projects/
│   ├── members/
│   └── billing/
│
├── domain/
│
├── server/
│   ├── auth/
│   ├── data/
│   └── integrations/
│
├── lib/
│
└── styles/
```

This is an example, not a requirement to create empty folders.

---

# 174. `lib/` Rule

`lib/` MUST NOT become a miscellaneous dumping ground.

Use it for coherent cross-cutting modules.

Bad:

```text
lib/
  stuff.ts
  helpers.ts
  misc.ts
```

Prefer:

```text
lib/
  dates/
  currency/
  validation/
```

where these truly belong at shared scope.

---

# 175. Server Directory

A dedicated server area MAY contain:

```text
data access
server services
privileged integrations
auth infrastructure
```

when this makes server/client boundaries clearer.

Server code MUST remain inaccessible to client bundles.

---

# 176. Import Convention

Prefer stable aliases over deeply nested relative imports.

Good:

```ts
import { Button } from "@/components/ui/button"
```

Avoid:

```ts
import { Button } from "../../../../components/ui/button"
```

where aliases are established.

---

# 177. Import Public APIs

Features and packages SHOULD import from sanctioned entry points.

Do not deep-import another feature's private internals.

---

# 178. Circular Dependencies

Circular dependencies SHOULD be treated as architecture defects.

Resolve ownership rather than masking cycles with dynamic imports unless runtime behavior truly requires them.

---

# 179. Dead Code

Remove obsolete:

- components;
- route handlers;
- utilities;
- exports;
- feature flags;
- compatibility shims.

Framework upgrades become harder when dead architecture accumulates.

---

# 180. Feature Flags

Feature flags are deployment/product controls.

They MUST NOT become authorization controls.

Keep feature evaluation close to product ownership.

Remove completed flags.

---

# 181. Experimental Features

Experiments SHOULD preferably reuse canonical routes and product contracts.

Avoid long-lived:

```text
PageV2
PageNew
PageFinal
```

architectures.

---

# 182. Internationalization

If localization is required, establish one application-wide approach.

Define:

```text
locale resolution
routing
translations
formatting
server/client loading
fallback
RTL support
```

Do not allow each feature to implement localization independently.

---

# 183. Date and Time

Use shared date/time abstractions.

Always distinguish:

```text
stored instant
timezone
locale display
calendar date
```

Avoid implicit server-local timezone behavior.

---

# 184. Money

Do not represent monetary domain behavior with casual floating-point calculations.

Use the domain-approved money representation and formatting utilities.

UI formatting belongs above authoritative financial calculation.

---

# 185. IDs

Use stable resource IDs.

Avoid exposing database implementation assumptions unnecessarily.

Types MAY distinguish important identifiers where this prevents mistakes.

---

# 186. Error Boundaries vs Business Errors

Do not use React error boundaries for expected validation/business outcomes.

Use them for unexpected rendering/execution failures.

Expected states belong in ordinary product UI.

---

# 187. Empty States

No data is not necessarily an error.

Framework architecture should distinguish:

```text
loading
empty
not found
forbidden
error
```

These states have different semantics.

---

# 188. Authorization State

Do not render sensitive content and hide it after client authorization resolves.

Authorization should occur before privileged content is returned to the browser.

---

# 189. Server Component Security

Server Components may access privileged systems.

That does not make them automatically secure.

Every resource access still requires correct authorization.

---

# 190. Server Function Security

A Server Function callable from client UI MUST be treated like an exposed mutation endpoint.

It requires:

```text
authentication
authorization
runtime validation
safe errors
```

Never assume it is protected because no visible URL exists.

---

# 191. Framework Anti-Patterns

Avoid:

```text
"use client"
```

at the top of every page.

Avoid:

```text
useEffect
→ fetch initial data
```

when server fetching is appropriate.

Avoid:

```text
Server Component
→ fetch own internal API
→ database
```

without architectural reason.

Avoid:

```text
entire database model
→ Client Component
```

Avoid:

```text
all application state
→ global store
```

Avoid:

```text
business logic
→ page.tsx
```

Avoid:

```text
authorization
→ hidden button only
```

Avoid:

```text
any
```

as the default type escape.

Avoid:

```text
process.env
```

scattered everywhere.

Avoid:

```text
ignore build type errors
```

to ship.

Avoid:

```text
custom router
```

inside a framework already providing routing.

Avoid:

```text
abstraction over every framework API
```

for theoretical portability.

Avoid:

```text
useMemo / useCallback everywhere
```

without justification.

Avoid:

```text
giant root provider tree
```

Avoid:

```text
one loading spinner for every async state
```

Avoid:

```text
one global error boundary only
```

Avoid:

```text
blindly cache everything
```

or:

```text
disable caching everywhere
```

without data semantics.

---

# 192. Framework Review Checklist

Before approving implementation, verify:

```text
□ App Router conventions followed
□ Route files remain focused
□ Server Component used by default
□ Client boundaries minimized
□ Sensitive modules remain server-only
□ Data crossing client boundary minimized
□ Initial data fetched server-side where appropriate
□ No unnecessary internal HTTP hop
□ Data fetching avoids accidental waterfalls
□ Suspense/loading boundaries intentional
□ Rendering strategy appropriate
□ Cache semantics understood
□ Cache invalidation defined
□ Mutations validate input
□ Mutations authenticate/authorize
□ Domain logic kept outside UI where appropriate
□ TypeScript strict preserved
□ No unjustified any
□ Runtime inputs validated
□ Environment config validated
□ Error handling intentional
□ Not-found state handled
□ Accessibility semantics preserved
□ URL state follows route standards
□ Global state justified
□ Effects used for synchronization only
□ Client bundle cost considered
□ Third-party dependencies justified
□ Observability included
□ Tests added at appropriate layer
```

---

# 193. Definition of Done — Framework

Framework implementation is complete only when:

```text
✓ Route architecture follows product IA
✓ Server/client boundary is intentional
✓ Authentication is enforced
✓ Authorization is enforced
✓ Runtime input is validated
✓ Server-only data stays server-side
✓ Loading behavior is defined
✓ Empty behavior is defined
✓ Not-found behavior is defined
✓ Error behavior is defined
✓ Caching behavior is defined
✓ Mutation invalidation is defined
✓ Type checking passes
✓ Lint checks pass
✓ Production build passes
✓ Critical tests pass
✓ Mobile rendering verified
✓ Accessibility verified
✓ Performance impact considered
✓ No duplicate framework infrastructure introduced
```

---

# 194. AI Framework Rules

AI coding agents MUST use the repository's established framework architecture.

Before implementing code, inspect:

```text
package.json
framework version
app router structure
existing layouts
server/client conventions
design system
auth
data access
validation
state management
testing
linting
```

Do not assume conventions from unrelated projects.

---

# 195. AI Version Awareness

AI MUST consult version-matched framework documentation when implementing version-sensitive APIs.

Do not copy patterns from old framework tutorials when repository behavior has changed.

Particularly verify:

```text
caching
routing
middleware/proxy behavior
Server Functions
request APIs
build configuration
```

---

# 196. AI Server-First Rule

AI SHOULD generate a Server Component by default.

It may add `"use client"` only when required by actual client behavior.

---

# 197. AI Client Boundary Rule

When adding interactivity, AI SHOULD isolate the smallest useful Client Component.

It MUST NOT convert an entire page to a Client Component merely because one button requires state.

---

# 198. AI Data-Fetching Rule

AI SHOULD first determine whether data can be fetched directly on the server.

It MUST NOT automatically generate:

```text
useEffect
+
loading state
+
fetch('/api/...')
```

for initial server-renderable data.

---

# 199. AI API Rule

AI MUST NOT create an internal API endpoint merely because it needs data in a Server Component.

Create an HTTP endpoint only when HTTP is an actual architectural boundary.

---

# 200. AI Mutation Rule

When generating a mutation, AI MUST account for:

```text
authentication
authorization
validation
domain operation
error handling
cache invalidation
result/redirect
```

A database write alone is incomplete.

---

# 201. AI Type Rule

AI MUST preserve TypeScript strictness.

It MUST NOT solve type errors by broadly introducing:

```text
any
@ts-ignore
non-null assertions
```

unless the exception is narrow and justified.

---

# 202. AI State Rule

AI SHOULD choose state ownership in this order:

```text
derived value
↓
local component state
↓
URL state
↓
feature context/store
↓
global state
```

according to semantics.

Do not reach for global state first.

---

# 203. AI Effect Rule

Before generating `useEffect`, AI SHOULD determine whether the logic belongs:

```text
during render
in an event handler
on the server
inside data fetching
```

Effects are not general lifecycle utilities.

---

# 204. AI Dependency Rule

AI MUST inspect existing dependencies before installing another package.

Prefer:

```text
platform
framework
existing repository dependency
small local implementation
```

before adding new infrastructure.

---

# 205. AI Component Rule

Before generating a UI primitive, AI MUST search existing:

```text
components/ui
design system
registry
product components
```

and reuse the canonical implementation.

---

# 206. AI Security Rule

AI MUST treat:

```text
Server Function
Route Handler
Server Component data access
```

as server security boundaries requiring the same security standard as conventional endpoints where applicable.

---

# 207. AI Cache Rule

AI MUST NOT add caching without understanding:

```text
scope
freshness
invalidation
authorization
```

Incorrect caching can become a correctness or security defect.

---

# 208. AI Error Rule

AI MUST distinguish:

```text
validation error
not found
forbidden
expected business failure
unexpected server error
```

Do not map every failure to one generic exception.

---

# 209. AI Refactoring Rule

AI MUST NOT rewrite established framework architecture solely to implement one feature.

Prefer the smallest change consistent with the repository's current system.

---

# 210. Framework Golden Rules

**1. Use the App Router.**  
New application architecture uses the current framework model.

**2. Server first.**  
Client execution is opt-in.

**3. Keep client boundaries small.**

**4. Keep secrets and privileged logic server-side.**

**5. Fetch initial data on the server when appropriate.**

**6. Do not create internal HTTP hops without reason.**

**7. Treat caching as explicit architecture.**

**8. Stream independent slow content when useful.**

**9. Validate all runtime boundaries.**

**10. Authenticate and authorize every protected server operation.**

**11. Keep business logic outside React where practical.**

**12. Use TypeScript strict mode.**

**13. Avoid `any` as an escape strategy.**

**14. Use URL state for navigational state.**

**15. Keep transient state local.**

**16. Effects synchronize with external systems; they are not a default data architecture.**

**17. Use framework primitives before introducing competing infrastructure.**

**18. Measure performance before micro-optimizing.**

**19. Keep framework versions security-patched.**

**20. Prefer version-matched official documentation over remembered patterns.**

---

# 211. Canonical Framework Standard

The organizational standard is:

> **Web applications use Next.js App Router, React, TypeScript strict mode, Tailwind CSS, and the canonical shadcn-based design system. Server Components are the default rendering primitive and Client Components are introduced only at explicit interaction boundaries. Server-side data access is preferred for initial application data, mutations are implemented through intentional server command boundaries, runtime inputs are validated, authorization occurs on the trusted server, and caching is treated as explicit data architecture. Framework-native capabilities take precedence over competing abstractions unless a documented requirement justifies otherwise. Domain logic remains independently understandable from the framework, shared infrastructure follows established library boundaries, and applications remain on supported security-patched framework releases.**

The framework architecture should make it easy to answer:

```text
Where does this code execute?
Who owns this state?
Where is this data loaded?
Who may access it?
What crosses the server/client boundary?
What is cached?
How is it invalidated?
How does it fail?
How is it tested?
```

If those questions cannot be answered quickly, the framework architecture is too ambiguous.

Two current-framework details are particularly important for this standard. **TypeScript `strict` remains the appropriate baseline** because it enables the strict family of type checks, while Tailwind's current Next.js installation uses its PostCSS integration and `@import "tailwindcss"` rather than older configuration patterns. citeturn510758search3turn510758search0

I would place this in the master system as:

**Foundations → Framework → Security → Routes → Layouts → Facade → Components → Patterns → Reusability & Libraries → Data/API → Testing → Performance → Accessibility → Governance.**
