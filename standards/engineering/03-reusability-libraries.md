---
id: "reusability-libraries"
title: "Reusability & Libraries Guidelines — Gold Standard"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "reusability", "libraries"]
applies_to: ["general"]
related: ["adr"]
legacy_number: 6
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 56905
provenance: baseline

---

This should govern **what becomes shared, where it lives, how it is consumed, and how shared code avoids turning into an unmaintainable abstraction layer**.

# Reusability & Libraries Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical standard for reusable code, shared libraries, packages, components, utilities, hooks, services, and internal platform modules.

The system exists to ensure shared code is:

- intentional;
- composable;
- stable;
- discoverable;
- maintainable;
- testable;
- documented;
- appropriately scoped;
- independently understandable;
- safe to evolve.

Reusability is not the objective by itself.

The objective is:

> **Reduce repeated knowledge and behavior without creating unnecessary coupling or abstraction.**

A reusable abstraction is valuable only when it makes multiple consumers simpler and safer.

---

# 2. Core Principle

Do not optimize for maximum reuse.

Optimize for:

```text
Correct abstraction
+
Clear ownership
+
Stable contract
+
Low coupling
+
Useful reuse
```

Duplication is sometimes cheaper than the wrong abstraction.

Premature generalization can create more maintenance cost than repeated code.

---

# 3. Reuse Hierarchy

Use this hierarchy when deciding where code belongs:

```text
Platform / external standard
        ↓
Organization-wide library
        ↓
Product design system
        ↓
Domain library
        ↓
Feature-shared module
        ↓
Feature-local implementation
```

Code SHOULD live at the narrowest scope that correctly represents its responsibility.

Do not promote code upward merely because another file might eventually use it.

---

# 4. Golden Rule of Reusability

The default progression is:

```text
Implement
↓
Observe repetition
↓
Identify invariant
↓
Extract
↓
Stabilize
↓
Document
↓
Promote
```

Avoid:

```text
Predict hypothetical reuse
↓
Create abstraction
↓
Force future features into it
```

---

# 5. When to Reuse

Reuse code when consumers share the same:

- behavior;
- semantics;
- constraints;
- lifecycle;
- ownership assumptions;
- expected evolution.

Similar appearance alone does not always justify one abstraction.

Similar implementation alone does not always imply the same concept.

---

# 6. When Not to Reuse

Do not combine implementations merely because they currently look similar.

Keep implementations separate when they:

- represent different domain concepts;
- are likely to evolve independently;
- have different permissions;
- have different lifecycle requirements;
- have different accessibility semantics;
- have substantially different failure behavior.

Duplication can be temporary and intentional.

---

# 7. Rule of Three

A useful heuristic:

```text
First occurrence
→ implement locally

Second occurrence
→ compare patterns

Third stable occurrence
→ strongly consider abstraction
```

This is a heuristic, not a mandatory threshold.

A foundational concern may deserve abstraction immediately.

A coincidental pattern may never deserve one.

---

# 8. Extract Knowledge, Not Lines

The best reusable abstractions centralize knowledge.

Good extraction:

```text
Permission policy
Currency formatting
Date handling
Design-system Button
API client
Telemetry event schema
```

Poor extraction:

```text
Three identical lines moved into a helper
```

because they happened to repeat.

---

# 9. Abstraction Test

Before extracting shared code, ask:

1. What invariant is being captured?
2. Which consumers currently need it?
3. Are they semantically the same?
4. Are they likely to change together?
5. Does the abstraction reduce consumer complexity?
6. Can the API be explained clearly?
7. Does extraction reduce or increase coupling?
8. Who will own it?
9. How will breaking changes be handled?
10. Can consumers use it without knowing its internals?

If these questions cannot be answered clearly, the abstraction may be premature.

---

# 10. Shared Code Categories

Use explicit categories.

## Primitive

Low-level, broadly reusable building block.

Examples:

```text
Button
Stack
Date formatter
Result type
HTTP client
```

## Product component

Reusable product-semantic UI.

Examples:

```text
WorkspaceSwitcher
UserAvatar
PlanBadge
PermissionPicker
```

## Domain library

Reusable business behavior within one domain.

Examples:

```text
billing
permissions
projects
notifications
```

## Infrastructure library

Cross-cutting technical behavior.

Examples:

```text
logging
telemetry
auth
config
database
queue
```

## Utility

Small stateless operation with clear semantics.

## Feature module

Code reusable only inside a specific product area.

Do not mix these levels indiscriminately.

---

# 11. Library Boundaries

A library SHOULD have one coherent responsibility.

Good:

```text
@company/auth
@company/telemetry
@company/ui
@company/permissions
```

Poor:

```text
@company/common
@company/helpers
@company/shared
@company/utils-everything
```

Broad miscellaneous libraries tend to become dumping grounds.

---

# 12. Cohesion

Things that change together SHOULD usually live together.

Things that evolve independently SHOULD generally remain separated.

High cohesion is preferable to maximal sharing.

---

# 13. Coupling

Reusable code SHOULD minimize knowledge of consumers.

A library SHOULD NOT depend on:

- feature-specific routes;
- arbitrary feature state;
- consumer-specific copy;
- consumer-specific database models;
- unrelated product modules.

Dependency direction should move toward more stable layers.

---

# 14. Dependency Direction

Preferred:

```text
Feature
↓
Domain
↓
Platform
↓
Foundations
```

Avoid:

```text
Foundation
↓
Feature
```

A design-system Button should never import project-management business logic.

---

# 15. Dependency Graph

The dependency graph SHOULD remain acyclic.

Avoid:

```text
Library A → Library B
Library B → Library A
```

Circular dependencies usually indicate unclear ownership or incorrect boundaries.

---

# 16. Stable Dependencies Principle

More widely consumed packages SHOULD depend on components that are equally or more stable.

Foundational libraries must not depend on rapidly changing feature code.

---

# 17. Public vs Private API

Every library SHOULD clearly distinguish:

```text
Public API
Internal implementation
```

Consumers MUST import from supported public entry points.

Avoid:

```ts
import { something } from "@company/ui/src/internal/button/utils"
```

Prefer:

```ts
import { Button } from "@company/ui"
```

Internal file structure should remain refactorable.

---

# 18. Export Discipline

Libraries SHOULD expose the minimum useful public API.

Do not export everything automatically.

Every export increases:

- maintenance obligation;
- compatibility requirements;
- discovery complexity;
- potential misuse.

If consumers do not need it, keep it internal.

---

# 19. Deep Imports

Deep imports into library internals SHOULD be prohibited unless explicitly documented as stable entry points.

Bad:

```text
@company/auth/src/session/internal/token
```

Good:

```text
@company/auth/session
```

when `session` is an intentional public entry point.

---

# 20. Barrel Files

Barrel exports MAY improve ergonomics.

They SHOULD NOT:

- hide dependency cycles;
- cause massive unintended bundles;
- obscure ownership;
- expose private internals.

Use intentional package entry points rather than indiscriminate `export *`.

---

# 21. API Design

Reusable APIs should optimize for clarity.

Prefer:

```ts
formatCurrency(amount, currency)
```

over:

```ts
formatThing(value, {
  mode: "money",
  maybeCurrency: currency,
  behavior: "standard"
})
```

when the abstraction does not require that flexibility.

---

# 22. Small Public Surface

Prefer a small, powerful public API.

Consumers SHOULD NOT need to understand internal implementation details.

Good abstraction:

```text
simple common case
clear extension path
explicit uncommon case
```

Avoid exposing dozens of knobs because hypothetical future consumers might need them.

---

# 23. Semantic APIs

Name APIs according to product or technical meaning.

Prefer:

```text
canManageWorkspace()
createSession()
formatMoney()
trackEvent()
```

over:

```text
checkThing()
doAuth()
formatValue()
sendData()
```

Specific naming improves discoverability.

---

# 24. Boolean Arguments

Avoid ambiguous positional booleans.

Bad:

```ts
createUser(data, true, false)
```

Prefer:

```ts
createUser(data, {
  sendInvitation: true,
  requireVerification: false,
})
```

For complex behavior, prefer explicit options or separate functions.

---

# 25. Boolean Prop Explosion

Avoid APIs like:

```tsx
<Card
  compact
  bordered
  elevated
  clickable
  blue
  special
  noPadding
/>
```

This often indicates too many unrelated responsibilities.

Prefer:

- composition;
- meaningful variants;
- smaller abstractions.

---

# 26. Configuration

Configuration SHOULD expose stable policy choices, not every internal implementation detail.

Good:

```text
timeout
retry policy
locale
permission scope
```

Poor:

```text
internal function call order
private class names
internal state flags
```

Consumers should not configure implementation accidents.

---

# 27. Defaults

Libraries SHOULD provide safe, useful defaults.

The common case should require minimal configuration.

Avoid requiring every consumer to repeat the same setup.

Repeated consumer configuration may indicate missing library-level defaults.

---

# 28. Escape Hatches

Reusable libraries MAY provide escape hatches.

Escape hatches should be:

- explicit;
- uncommon;
- documented;
- narrower than complete internal exposure.

An escape hatch must not turn every abstraction into an untyped passthrough.

---

# 29. Composition Over Configuration

When behavior becomes complex, prefer composition.

Prefer:

```tsx
<Dialog>
  <DialogHeader />
  <DialogContent />
  <DialogFooter />
</Dialog>
```

over:

```tsx
<Dialog
  title=""
  description=""
  showFooter
  footerAlign=""
  footerButtons={...}
  ...
/>
```

when composition provides clearer flexibility.

---

# 30. Composition Over Inheritance

Prefer composition for reusable application libraries.

Inheritance introduces strong coupling and hidden behavior.

Use inheritance only where the language/framework model clearly benefits from it.

---

# 31. Pure Functions

Reusable logic SHOULD be pure where practical.

Pure functions are easier to:

- test;
- reason about;
- reuse;
- parallelize;
- cache.

Side effects should be explicit.

---

# 32. Side Effects

Libraries that perform side effects SHOULD make them visible through their API.

Examples:

```text
sendEmail()
persistSession()
publishEvent()
```

Avoid helpers that silently mutate global state or trigger unrelated operations.

---

# 33. Global State

Shared libraries SHOULD avoid owning global mutable state unless that state is fundamental to their responsibility.

Hidden global state creates:

- test coupling;
- race conditions;
- unpredictable initialization;
- difficult server rendering.

Prefer explicit dependencies.

---

# 34. Dependency Injection

Use dependency injection when it materially improves:

- testability;
- environment portability;
- implementation substitution;
- ownership clarity.

Do not introduce elaborate dependency-injection frameworks solely for architectural purity.

Simple explicit parameters are often sufficient.

---

# 35. Environment Independence

Reusable libraries SHOULD avoid assuming a specific runtime unless runtime coupling is intentional.

Clearly distinguish:

```text
browser
server
edge
worker
Node
native
```

where behavior differs.

---

# 36. Server and Client Boundaries

Shared packages MUST clearly indicate whether code is:

```text
server-only
client-only
universal
```

Server-only functionality MUST NOT accidentally become importable into client bundles.

Examples:

- database clients;
- secrets;
- private API clients;
- filesystem access.

---

# 37. Library Structure

A reusable library SHOULD have a clear internal structure.

Example:

```text
package/
├── src/
│   ├── index
│   ├── public modules
│   └── internal/
├── tests/
├── README
├── package metadata
└── changelog where required
```

Exact structure may vary.

The public boundary should remain obvious.

---

# 38. Monorepo Libraries

In a monorepo, package boundaries SHOULD represent architectural ownership rather than merely folders.

A package should justify:

- a public contract;
- independent testing;
- controlled dependencies;
- meaningful ownership.

Do not create a package for every folder.

---

# 39. Package vs Module Decision

Use a normal module when code:

- belongs to one application;
- has no independent consumers;
- does not require independent ownership.

Use a package when code:

- has multiple meaningful consumers;
- requires a stable contract;
- benefits from independent versioning/build/testing;
- represents an architectural boundary.

---

# 40. Feature-Local First

New abstractions SHOULD generally begin near their first consumer.

Example:

```text
features/projects/components/
```

not immediately:

```text
packages/shared/
```

Promote only once broader ownership is justified.

---

# 41. Promotion Path

Recommended lifecycle:

```text
Feature-local
↓
Feature-shared
↓
Domain-shared
↓
Product-shared
↓
Organization-wide
```

Each promotion increases compatibility obligations.

Promotion should be deliberate.

---

# 42. Design-System Reuse

For UI, use the established hierarchy:

```text
shadcn primitive
↓
canonical design-system component
↓
product component
↓
feature composition
```

Feature teams SHOULD consume canonical components rather than copying their source and modifying them locally.

---

# 43. shadcn Ownership Model

When a shadcn component becomes part of the product system, the organization owns the resulting implementation.

Do not treat upstream defaults as immutable.

Central changes SHOULD be made to the canonical internal component rather than copied variants across features.

---

# 44. Internal Component Registry

Where appropriate, reusable UI SHOULD be distributed through the internal component registry.

The registry may contain:

- components;
- hooks;
- layout primitives;
- blocks;
- styles;
- tokens;
- patterns;
- utilities.

The registry is a distribution mechanism, not permission to make everything globally reusable.

---

# 45. Product Components

A product component is appropriate when repeated UI represents the same product concept.

Examples:

```text
WorkspaceSwitcher
MemberAvatar
InvoiceStatus
PermissionBadge
PlanSelector
```

Product components SHOULD encode product semantics.

They SHOULD NOT become generic merely to appear reusable.

---

# 46. Hooks

Reusable hooks SHOULD capture reusable behavior rather than simply reduce component length.

Good:

```text
useMediaQuery
usePermission
useWorkspace
useDebouncedValue
```

Questionable:

```text
useProjectPageButtonThing
```

unless it genuinely captures a repeated domain concept.

---

# 47. Hook Boundaries

Hooks SHOULD have predictable:

- inputs;
- outputs;
- side effects;
- lifecycle;
- dependency behavior.

Avoid hooks that secretly coordinate many unrelated systems.

---

# 48. Utility Libraries

Utilities SHOULD remain:

- small;
- deterministic where practical;
- clearly named;
- domain-neutral if placed globally.

Avoid turning `utils.ts` into an unstructured repository.

Prefer focused modules such as:

```text
currency
dates
strings
identifiers
validation
```

---

# 49. Domain Utilities

Business-specific utilities belong near the domain.

Example:

```text
billing/calculate-proration
permissions/can-edit-project
```

Do not place domain rules into generic utility packages.

---

# 50. Business Rules

Business rules SHOULD have one authoritative implementation where practical.

Avoid duplicating critical calculations across:

- frontend;
- backend;
- workers;
- reporting systems.

If multiple environments require the same logic, consider a shared domain package or protocol-level source of truth.

---

# 51. Validation Schemas

Schemas MAY be reusable where the same contract genuinely exists across boundaries.

Examples:

```text
API request
Form input
Queue message
Domain command
```

Do not reuse a schema merely because fields currently overlap if validation semantics differ.

---

# 52. Shared Types

Shared types SHOULD represent stable contracts.

Avoid creating a global type package containing every internal type.

Good candidates:

```text
API contracts
domain identifiers
public events
shared protocol models
```

Poor candidates:

```text
arbitrary component state
temporary implementation interfaces
private database row types
```

---

# 53. Database Types

Database schema types SHOULD NOT automatically become public domain types.

Persistence representation and product representation are different contracts.

Avoid coupling all consumers directly to database structure.

---

# 54. API Models

API models SHOULD be intentionally defined.

Do not expose internal database entities merely because TypeScript makes it convenient.

Public contracts should remain stable even if persistence changes.

---

# 55. Shared Constants

Share constants when they represent one authoritative concept.

Examples:

```text
permission names
supported currencies
event names
route identifiers
```

Do not centralize every string or number purely to avoid literals.

---

# 56. Magic Values

Values with domain meaning SHOULD be named.

Example:

```text
MAX_UPLOAD_SIZE
```

rather than an unexplained numeric literal repeated across modules.

---

# 57. Enums

Use enums or equivalent closed sets when the domain is genuinely closed.

Do not create rigid enums for data expected to evolve dynamically from backend configuration.

---

# 58. Cross-Layer Constants

Be cautious sharing constants between frontend and backend.

The fact that both layers currently use the same value does not necessarily make them one contract.

Share only where consistency is a requirement.

---

# 59. Library Ownership

Every significant shared library MUST have an owner.

Ownership includes:

- API decisions;
- maintenance;
- security updates;
- compatibility;
- documentation;
- deprecations;
- consumer support.

Ownerless shared code eventually becomes frozen infrastructure.

---

# 60. Ownership Boundaries

Ownership SHOULD align with domain expertise.

Examples:

```text
Design system → Design Systems team
Authentication → Identity/Platform
Billing → Billing domain
Telemetry → Platform/Observability
```

Do not centralize ownership merely because code lives in one repository.

---

# 61. Consumer Responsibility

Library authors own the contract.

Consumers own correct use of that contract.

Consumers MUST NOT rely on undocumented internal behavior.

---

# 62. Documentation

Every significant reusable library SHOULD document:

```text
Purpose
Scope
Installation/import
Primary API
Examples
Constraints
Runtime compatibility
Security considerations
Ownership
Version policy
Migration guidance
```

Users should be able to adopt a library without reading all source code.

---

# 63. Examples

Documentation SHOULD prioritize realistic examples.

Good:

```text
common case
advanced case
error handling
integration example
```

Avoid examples that demonstrate only trivial syntax while hiding required setup.

---

# 64. README Standard

A reusable package README SHOULD answer:

1. Why does this library exist?
2. When should it be used?
3. When should it not be used?
4. What is its public API?
5. Who owns it?
6. How is it tested?
7. What runtime does it support?
8. How are changes released?

---

# 65. Discoverability

Shared code provides no value if teams cannot find it.

Maintain searchable:

- package naming;
- component docs;
- registry;
- API references;
- examples.

Use consistent terminology.

---

# 66. Naming

Library names SHOULD describe capability.

Prefer:

```text
auth
telemetry
permissions
ui
email
payments
```

Avoid:

```text
core2
misc
common-new
shared-v2
helpers
```

Names should survive organizational changes where possible.

---

# 67. Package Naming Convention

Use one canonical naming convention.

Example:

```text
@company/ui
@company/auth
@company/telemetry
@company/config
```

Avoid independent naming conventions by team.

---

# 68. Stability Levels

Libraries MAY define explicit maturity levels.

Example:

```text
Experimental
Beta
Stable
Deprecated
```

Consumers should understand compatibility expectations.

Do not present experimental APIs as production-stable.

---

# 69. Experimental APIs

Experimental APIs MAY change without normal compatibility guarantees.

They MUST be clearly identified.

Critical production systems SHOULD avoid depending heavily on experimental contracts without explicit acceptance.

---

# 70. Stable APIs

Stable APIs require disciplined evolution.

Changes SHOULD prioritize:

```text
backward compatibility
clear migration
predictable behavior
```

Stable does not mean immutable.

It means change is managed deliberately.

---

# 71. Semantic Versioning

Published libraries SHOULD use semantic versioning where appropriate.

Conceptually:

```text
MAJOR → incompatible change
MINOR → backward-compatible capability
PATCH → backward-compatible fix
```

Internal monorepos MAY use coordinated versioning or source-based consumption instead.

The compatibility policy must still be explicit.

---

# 72. Breaking Changes

A breaking change includes more than TypeScript compilation failure.

Examples:

- renamed export;
- altered runtime behavior;
- changed default;
- different error behavior;
- CSS change affecting layout;
- permission behavior change;
- altered serialization.

Assess compatibility semantically.

---

# 73. Breaking Change Process

Breaking changes SHOULD include:

```text
Reason
Affected consumers
Replacement
Migration instructions
Deprecation window
Removal version/date
```

Avoid surprise removal.

---

# 74. Deprecation

Deprecated APIs SHOULD:

- remain functional for the stated migration period;
- clearly point to the replacement;
- stop receiving new adoption;
- eventually be removed.

Do not maintain permanent deprecated APIs indefinitely.

---

# 75. Migration Tooling

High-impact migrations SHOULD provide automation where practical.

Examples:

- codemods;
- lint rules;
- automated renames;
- migration scripts.

Library authors should bear part of the migration cost they introduce.

---

# 76. Changelogs

Published or broadly shared libraries SHOULD maintain useful change records.

Record:

- behavior changes;
- new features;
- security changes;
- deprecations;
- migration requirements.

Do not fill changelogs with meaningless commit noise.

---

# 77. Compatibility

Define supported environments.

Examples:

```text
Node versions
Browser support
React versions
Framework versions
Runtime assumptions
```

Consumers should not discover incompatibility after deployment.

---

# 78. Peer Dependencies

Use peer dependencies where consumers must supply a compatible shared runtime.

Typical examples:

```text
React
framework runtime
design-system peer library
```

Do not duplicate large singleton dependencies unnecessarily.

---

# 79. Dependency Policy

Libraries SHOULD keep dependency count low.

Before adding a dependency, evaluate:

```text
Need
Maintenance
Security
Size
License
Runtime impact
Transitive dependencies
Replacement difficulty
```

A dependency in a widely reused library has multiplied impact.

---

# 80. Dependency Direction in Packages

Foundational packages SHOULD have fewer dependencies than feature packages.

A low-level utility package should not import a high-level UI or domain package.

---

# 81. Duplicate Dependencies

Avoid multiple incompatible versions of major runtime dependencies when practical.

They may cause:

- bundle inflation;
- inconsistent behavior;
- duplicated singleton state;
- security maintenance complexity.

---

# 82. Dependency Pinning

Dependency resolution SHOULD be deterministic.

Use:

- lockfiles;
- approved update processes;
- reproducible builds where practical.

Do not rely on uncontrolled floating production dependencies.

---

# 83. Supply Chain

Shared libraries have amplified supply-chain impact.

Library owners SHOULD consider:

- dependency provenance;
- package integrity;
- malicious updates;
- abandoned packages;
- typosquatting;
- build scripts.

The more widely reused the package, the stronger the review requirement.

---

# 84. Security

Shared packages MUST follow the security standard.

Especially:

- validation libraries;
- auth helpers;
- permission systems;
- serialization;
- file handling;
- network clients.

A vulnerability in reusable infrastructure can become systemic.

---

# 85. Internal Libraries and Secrets

Reusable libraries MUST NOT embed:

- credentials;
- tenant-specific configuration;
- production secrets;
- hidden environment assumptions.

Configuration should be injected securely.

---

# 86. Testability

Reusable code requires stronger tests than feature-local code because its blast radius is larger.

Critical libraries SHOULD include:

```text
unit tests
contract tests
integration tests
negative tests
type tests where applicable
```

---

# 87. Contract Tests

Public behavior SHOULD be tested at the public API boundary.

Tests should protect consumers against unintended contract changes.

Do not test only private implementation details.

---

# 88. Consumer Tests

Critical shared libraries MAY maintain integration fixtures or representative consumer tests.

This helps detect compatibility regressions.

---

# 89. Visual Regression

Reusable UI libraries SHOULD use visual regression tests for significant states.

Test where applicable:

```text
default
hover
focus
disabled
loading
error
dark
responsive
```

---

# 90. Accessibility Tests

Reusable UI components require accessibility verification.

A defect in a shared component propagates to every consumer.

Test:

- semantics;
- keyboard behavior;
- focus;
- accessible names;
- states;
- contrast where tooling supports it.

---

# 91. Performance

Reusable abstractions SHOULD not impose large hidden costs.

Evaluate:

- bundle size;
- runtime overhead;
- unnecessary renders;
- network use;
- initialization cost.

A small cost multiplied across hundreds of consumers becomes significant.

---

# 92. Tree Shaking

Frontend libraries SHOULD support dead-code elimination where applicable.

Consumers should not need to ship an entire library to use one small capability.

---

# 93. Lazy Loading

Large optional capabilities MAY be dynamically loaded.

Examples:

- rich text editors;
- charting;
- syntax highlighting;
- heavy media tools.

Do not make every consumer pay the cost of optional behavior.

---

# 94. CSS Ownership

Reusable UI components SHOULD own their core styling.

Consumers may control:

- composition;
- placement;
- supported variants.

Consumers SHOULD NOT routinely override:

- internal selectors;
- private class names;
- component internals.

Frequent overrides indicate an insufficient public API or incorrect abstraction.

---

# 95. Tokens

Reusable UI MUST use canonical semantic design tokens.

Do not embed product-specific literal styling into foundational libraries.

---

# 96. Theme Support

Shared UI SHOULD inherit theme behavior from system tokens.

Avoid per-component hardcoded light/dark values.

---

# 97. Localization

Reusable components containing text SHOULD support localization appropriately.

Avoid hardcoding English copy into foundational components unless that component owns the product text itself.

---

# 98. Accessibility Copy

Accessible labels may require caller-provided context.

Generic components SHOULD not invent misleading accessible names.

---

# 99. Error Handling

Libraries SHOULD provide predictable error behavior.

Define whether an API:

- throws;
- returns a result type;
- returns nullable state;
- invokes callbacks.

Do not mix error models arbitrarily within one library.

---

# 100. Error Types

Meaningful libraries SHOULD expose stable error categories where consumers need programmatic handling.

Avoid requiring consumers to parse error-message strings.

---

# 101. Logging

Libraries SHOULD NOT log indiscriminately.

Prefer:

```text
return structured error
accept logger
emit sanctioned telemetry
```

where appropriate.

A reusable library should not flood consumer production logs.

---

# 102. Telemetry

Shared libraries generating telemetry MUST use canonical telemetry conventions.

Event names and payloads are contracts.

Avoid emitting consumer-specific analytics implicitly from foundational libraries.

---

# 103. Configuration Ownership

Global application configuration SHOULD have one authoritative mechanism.

Avoid libraries independently reading random environment variables when explicit configuration can be provided.

---

# 104. Initialization

Reusable libraries SHOULD minimize required global initialization.

If initialization is necessary, it should be:

- explicit;
- idempotent where practical;
- documented;
- safe under supported runtimes.

---

# 105. Singleton Use

Singletons SHOULD be used only when lifecycle truly requires one shared instance.

Avoid singleton state merely for convenience.

Singleton assumptions may break:

- tests;
- serverless environments;
- multi-tenant processing;
- SSR.

---

# 106. State Ownership

Reusable components SHOULD not own business state unnecessarily.

Prefer:

```text
controlled state
or
well-defined internal interaction state
```

Do not hide critical product state in opaque shared components.

---

# 107. Controlled vs Uncontrolled APIs

Components MAY support controlled and uncontrolled modes where useful.

The distinction MUST be clear.

Do not create ambiguous synchronization between both models.

---

# 108. Framework Wrappers

Do not wrap every third-party library solely to hide that it exists.

Create an internal wrapper when it provides meaningful value such as:

- stable API;
- security policy;
- telemetry;
- design-system styling;
- default configuration;
- future provider replacement.

Thin wrappers with no policy often increase indirection without benefit.

---

# 109. Vendor Abstraction

Abstract an external provider when:

- replacement is plausible;
- provider-specific concepts should not leak;
- the organization needs policy enforcement;
- multiple implementations exist.

Do not build a generic provider abstraction based only on hypothetical future migration.

---

# 110. Adapter Pattern

Adapters are useful at architectural boundaries.

Example:

```text
Domain
↓
EmailPort
↓
ProviderAdapter
↓
External provider
```

This keeps provider details outside domain logic.

---

# 111. Domain Interfaces

Domain abstractions should use domain language.

Prefer:

```text
sendInvitation()
```

over:

```text
sendTemplateEmail("invite_v4")
```

inside business logic.

Provider specifics belong at the adapter boundary.

---

# 112. Reusable Services

Services SHOULD represent coherent business or infrastructure capabilities.

Avoid large:

```text
AppService
CommonService
UtilityService
```

classes containing unrelated operations.

---

# 113. Repository Pattern

Repositories MAY provide useful persistence abstraction for complex domains.

Do not introduce repository layers automatically if the underlying data access is already clear and sufficiently isolated.

Abstractions must earn their complexity.

---

# 114. Shared API Clients

External API clients SHOULD be centralized when multiple consumers require consistent:

- authentication;
- retry behavior;
- timeouts;
- error translation;
- telemetry.

Do not duplicate low-level provider integration across features.

---

# 115. HTTP Client Standard

The application SHOULD have a canonical networking approach.

Shared behavior MAY include:

```text
base configuration
authentication
timeouts
retry policy
error normalization
observability
```

Do not create one HTTP wrapper per feature.

---

# 116. Retry Libraries

Retry behavior SHOULD be centralized enough to enforce safe defaults.

Do not retry:

- non-idempotent operations indiscriminately;
- validation failures;
- authorization failures.

Shared retry utilities should encode policy, not merely looping.

---

# 117. Caching

Caching utilities SHOULD make:

```text
key
scope
TTL
invalidation
ownership
```

explicit.

Do not hide cache semantics behind generic helpers that make stale-data behavior unpredictable.

---

# 118. Event Libraries

Shared event schemas SHOULD define:

```text
event name
version
payload
ownership
compatibility
```

Events become distributed contracts and require stronger stability than local function calls.

---

# 119. Event Versioning

Breaking event-schema changes require migration strategy.

Do not assume all producers and consumers deploy simultaneously.

---

# 120. Internal vs External Contracts

External contracts require stronger stability guarantees than internal contracts.

Examples:

```text
Public API
Webhook
SDK
Published package
```

require careful versioning.

Internal packages may evolve faster when all consumers are under coordinated control.

---

# 121. SDKs

An SDK SHOULD make correct API usage easier than raw HTTP.

It should provide:

- authentication integration;
- types;
- meaningful methods;
- error handling;
- pagination support;
- stable naming.

Do not expose server internals through SDK design.

---

# 122. Generated Code

Generated clients/types MAY be appropriate when there is a canonical schema.

Generated code SHOULD:

- be clearly identified;
- not be hand-edited;
- have a reproducible generation process.

Keep domain ergonomics above generated low-level types where necessary.

---

# 123. Code Generation

Use generation when it reliably eliminates mechanical repetition.

Do not use generation to hide an unclear architecture.

Generated complexity still has maintenance cost.

---

# 124. Template Libraries

Templates MAY encode stable application patterns.

Examples:

```text
list page
settings page
CRUD flow
```

Templates SHOULD remain composable.

Avoid generated boilerplate that immediately requires substantial deletion.

---

# 125. Copy vs Dependency

Sometimes copying a small stable utility is safer than introducing a package dependency.

Use judgment based on:

- update ownership;
- security;
- bug-fix propagation;
- coupling.

“Never copy” is not a valid architectural rule.

---

# 126. Shared Source vs Published Package

Use shared source inside a monorepo when:

- deployment is coordinated;
- consumers evolve together;
- independent distribution adds little value.

Publish packages when:

- repositories are separate;
- release boundaries differ;
- external consumers exist;
- compatibility contracts matter.

---

# 127. Version Synchronization

Closely related internal packages MAY use coordinated versioning.

Independent libraries MAY use independent versions.

Choose based on release ownership rather than tooling preference.

---

# 128. Monorepo Boundary Enforcement

Monorepos SHOULD enforce dependency boundaries through tooling where practical.

Examples:

```text
feature cannot import another feature's internals
client cannot import server-only package
foundation cannot import feature layer
```

Architecture should not depend entirely on developer discipline.

---

# 129. Import Aliases

Use consistent import aliases.

Good:

```text
@/components
@/features
@/lib
@company/ui
```

Avoid inconsistent relative traversal such as:

```text
../../../../shared/utils
```

when architecture supports clearer imports.

---

# 130. Circular Dependency Prevention

Automated tooling SHOULD detect circular dependencies in significant codebases.

Cycles should be resolved by clarifying responsibility, not hidden through lazy import hacks unless runtime architecture genuinely requires them.

---

# 131. Dead Code

Reusable libraries SHOULD periodically remove unused:

- exports;
- components;
- variants;
- compatibility paths.

Shared libraries naturally accumulate legacy APIs unless actively maintained.

---

# 132. Usage Measurement

For broad internal libraries, maintain visibility into:

```text
which exports are used
which applications consume them
which versions remain deployed
```

This improves safe deprecation.

---

# 133. Consumer Discovery Before Change

Before making a breaking shared-library change, identify actual consumers.

Do not infer usage solely from documentation.

---

# 134. Migration Ownership

The team making a breaking foundational change SHOULD contribute materially to consumer migration.

Do not externalize all migration cost onto feature teams.

---

# 135. Backward Compatibility

Maintain backward compatibility when its value exceeds its complexity.

Do not preserve poor APIs indefinitely purely because they once existed.

Use deprecation and migration intentionally.

---

# 136. Compatibility Shims

Temporary compatibility shims MAY ease migrations.

They MUST have:

- explicit purpose;
- removal plan;
- owner.

Do not let migration layers become permanent architecture.

---

# 137. Forking Libraries

Internal forks of shared libraries SHOULD be avoided.

A fork creates:

```text
duplicated bugs
duplicated maintenance
divergent behavior
migration cost
```

Prefer extending the canonical library.

---

# 138. External Library Forks

Fork an external library only when:

- required capability cannot be upstreamed;
- security/maintenance ownership is accepted;
- replacement alternatives are insufficient.

A fork means the organization now owns maintenance responsibility.

---

# 139. Wrapper Proliferation

Avoid chains such as:

```text
Library
↓
Wrapper
↓
Company wrapper
↓
Feature wrapper
↓
Component wrapper
```

Each layer should contribute meaningful policy or semantics.

If it does not, remove it.

---

# 140. Generic Components

Do not make a component generic beyond actual needs.

Bad abstraction:

```text
UniversalDataEntityContentRenderer
```

that accepts dozens of configuration objects.

Prefer specific composable primitives.

---

# 141. God Libraries

Avoid libraries that own:

- networking;
- formatting;
- authentication;
- UI;
- caching;
- business logic;

simultaneously.

Broad shared packages become architectural bottlenecks.

---

# 142. Shared Mutable Models

Avoid domain objects that are shared and mutated across unrelated layers.

Prefer immutable data contracts and explicit transitions.

---

# 143. Temporal Coupling

Libraries SHOULD avoid APIs requiring hidden call order.

Bad:

```text
init()
setContext()
prepare()
run()
```

where incorrect sequence breaks behavior.

Prefer APIs that make required state explicit.

---

# 144. Locality

Keep implementation near the concept it serves until broader reuse is proven.

Locality improves:

- discoverability;
- change safety;
- domain understanding.

Not all reuse requires global placement.

---

# 145. Reuse Across Products

Cross-product libraries require a higher abstraction threshold than within-product reuse.

Before promoting cross-product, confirm the behavior is genuinely shared rather than coincidentally similar.

---

# 146. Organizational Reuse

Organization-wide libraries should capture organization-wide policy.

Strong candidates:

```text
authentication
observability
design system
security configuration
API conventions
feature flags
```

Weak candidates:

```text
one team's workflow-specific helper
```

---

# 147. Platform Libraries

Platform libraries SHOULD provide paved-road solutions.

The preferred path should be:

- secure;
- observable;
- documented;
- easy to adopt.

Teams should not need to rebuild foundational infrastructure.

---

# 148. Paved Road Principle

For recurring infrastructure needs, provide one recommended implementation.

Examples:

```text
auth
logging
metrics
HTTP
queues
configuration
secrets
```

Alternatives MAY exist, but the standard path should be obvious.

---

# 149. Extensibility

Libraries SHOULD support foreseeable variation without attempting to support every hypothetical variation.

Prefer:

```text
small stable core
+
explicit extension points
```

over a massively configurable abstraction.

---

# 150. Extension Points

Good extension mechanisms include:

```text
composition
callbacks
interfaces
plugins
adapters
strategy functions
```

Use the simplest mechanism compatible with the problem.

---

# 151. Plugin Architecture

Plugin systems SHOULD only be introduced when independent extension is a real product or platform requirement.

Plugins increase:

- API stability requirements;
- security surface;
- lifecycle complexity;
- compatibility concerns.

Do not create plugin architectures for ordinary internal composition.

---

# 152. Dependency Inversion

High-level domain behavior SHOULD depend on stable contracts rather than vendor-specific implementation where replacement or testing materially benefits.

Do not apply dependency inversion mechanically to every small function.

---

# 153. Library Security Boundary

A library does not automatically create a security boundary.

Code running in the same process generally has equivalent runtime trust unless explicit isolation exists.

Do not mistake module separation for sandboxing.

---

# 154. Error Isolation

A library failure SHOULD not unnecessarily crash unrelated application regions where recoverable isolation is possible.

However, do not silently swallow critical errors merely to preserve availability.

---

# 155. Resilience

Infrastructure libraries SHOULD define behavior for:

- timeout;
- cancellation;
- retry;
- partial failure;
- dependency outage.

Consumers should not invent inconsistent resilience policies.

---

# 156. Cancellation

Long-running reusable operations SHOULD support cancellation when appropriate.

Examples:

- searches;
- network requests;
- background processing.

Cancellation semantics should be documented.

---

# 157. Async APIs

Asynchronous libraries SHOULD define:

- timeout expectations;
- retry ownership;
- concurrency behavior;
- cancellation;
- error semantics.

Avoid ambiguous promises that may never settle under dependency failure.

---

# 158. Concurrency

Reusable libraries SHOULD document thread/process/concurrency assumptions where relevant.

Avoid hidden mutable state that breaks under parallel execution.

---

# 159. Idempotency

Shared operations that may be retried SHOULD clearly document whether they are idempotent.

Do not let consumers guess whether repeating an operation is safe.

---

# 160. Testing Shared UI

Canonical reusable UI SHOULD verify:

```text
visual states
keyboard behavior
responsive behavior
dark/light themes
content overflow
loading
disabled
error
```

The more consumers a component has, the higher the regression cost.

---

# 161. Test Utilities

Shared test utilities MAY reduce repeated setup.

They SHOULD represent stable testing conventions.

Avoid large testing helper frameworks that obscure what the test actually does.

---

# 162. Fixtures

Shared fixtures SHOULD be:

- deterministic;
- realistic enough;
- easy to understand.

Do not create one enormous global fixture representing every domain.

---

# 163. Mocking

Mock boundaries, not implementation details.

Over-mocking reusable libraries can produce tests that pass while integration is broken.

Contract tests are particularly valuable at shared boundaries.

---

# 164. Library CI

Critical shared libraries SHOULD independently verify:

```text
type checks
tests
lint
build
security checks
API compatibility where relevant
```

A broken foundational package should be caught before consumer deployment.

---

# 165. Release Automation

Package releases SHOULD be reproducible.

Prefer automated:

```text
version
build
test
publish
provenance
```

over manual developer-machine publication.

---

# 166. Package Provenance

Important published packages SHOULD originate from controlled CI.

Avoid publishing organizational packages using long-lived credentials on individual workstations.

---

# 167. Licensing

External dependencies MUST have acceptable licensing.

Internal reusable libraries SHOULD make ownership and distribution constraints clear where relevant.

---

# 168. Documentation as Contract

For reusable code, documentation forms part of the public contract.

If behavior matters to consumers, document it.

Avoid relying on consumers to infer critical behavior from source.

---

# 169. Reference Implementations

Where useful, provide one canonical implementation showing recommended usage.

Teams SHOULD copy architecture, not necessarily code.

---

# 170. Example Applications

Complex platform libraries MAY maintain a small example application or integration fixture.

This can verify:

- setup;
- imports;
- runtime behavior;
- documentation accuracy.

---

# 171. API Review

Significant public library APIs SHOULD be reviewed before broad adoption.

Review:

```text
naming
scope
extensibility
error behavior
compatibility
security
consumer ergonomics
```

It is cheaper to improve an API before dozens of consumers exist.

---

# 172. Architecture Decision Records

Significant reusable infrastructure SHOULD record major architectural decisions.

Examples:

```text
Why package exists
Why provider was chosen
Why API uses specific model
Why behavior differs from previous standard
```

---

# 173. Reuse Metrics

Do not measure library success solely by number of consumers.

Useful indicators include:

- reduced duplication;
- reduced defects;
- easier adoption;
- consistent behavior;
- reduced implementation time;
- fewer security deviations.

High adoption of a painful library is not success.

---

# 174. Consumer Experience

A well-designed library should make the correct implementation easy.

A consumer should not need to:

- read internals;
- override private behavior;
- understand provider quirks;
- copy undocumented configuration.

Repeated consumer work should inform library improvement.

---

# 175. Feedback Loop

Library teams SHOULD actively collect consumer feedback.

Repeated:

```text
workarounds
overrides
wrappers
forks
support requests
```

are architecture signals.

---

# 176. Escape-Hatch Monitoring

If every consumer uses the same escape hatch, that behavior may belong in the supported API.

If only one consumer uses it, the exception may appropriately remain local.

---

# 177. Library Retirement

Libraries should be retired when:

- no longer used;
- superseded;
- unsafe;
- too costly to maintain;
- fundamentally incorrect.

Retirement requires migration planning where consumers remain.

---

# 178. Archive Policy

Retired packages SHOULD clearly indicate:

```text
deprecated
unsupported
replacement
```

Do not leave abandoned packages appearing actively supported.

---

# 179. Reusability Anti-Patterns

Avoid:

```text
shared/
  utils.ts
```

containing unrelated functionality.

Avoid:

```text
CommonComponent
GenericComponent
UniversalComponent
```

without a clearly defined semantic role.

Avoid:

```text
one abstraction
+
30 flags
```

to accommodate unrelated consumers.

Avoid:

```text
copy canonical component
→ rename
→ customize locally
```

when extension is appropriate.

Avoid:

```text
shared library
→ depends on feature
```

inverting architecture.

Avoid:

```text
deep imports into package internals
```

Avoid:

```text
every folder becomes a package
```

Avoid:

```text
every repeated line becomes a helper
```

Avoid:

```text
database model = public API model
```

Avoid:

```text
internal implementation detail = public export
```

Avoid:

```text
wrapper around wrapper around wrapper
```

without new semantics.

Avoid:

```text
shared state hidden inside utilities
```

Avoid:

```text
dependency added for five trivial lines
```

without justification.

Avoid:

```text
generic library nobody understands
```

for hypothetical future reuse.

---

# 180. Library Review Checklist

Before creating or promoting reusable code, verify:

```text
□ Repeated need exists or foundational need is clear
□ Consumers share semantics, not merely syntax
□ Responsibility is coherent
□ Scope is correct
□ Dependency direction is correct
□ No circular dependency introduced
□ Public API is intentionally small
□ Internal implementation remains private
□ Naming expresses domain/capability
□ Defaults are useful and safe
□ Extension path is clear
□ Error semantics are defined
□ Runtime assumptions are defined
□ Client/server boundary is safe
□ Security implications reviewed
□ Performance impact understood
□ Dependencies justified
□ Tests cover public contract
□ Documentation exists
□ Ownership is assigned
□ Versioning strategy exists
□ Migration strategy is possible
```

---

# 181. Component Promotion Checklist

Before promoting a feature component into the design system:

```text
□ Pattern occurs in multiple meaningful contexts
□ Semantics are consistent
□ Component API is domain-independent enough for target layer
□ All visual states are understood
□ Accessibility behavior is defined
□ Responsive behavior is defined
□ Tokens are used
□ Consumer-specific copy removed where appropriate
□ Business logic remains outside primitive layer
□ Tests added
□ Documentation added
□ Owner assigned
```

---

# 182. Package Creation Checklist

Before creating a new package:

```text
□ Package boundary represents real architecture
□ Multiple consumers or independent lifecycle justify it
□ Ownership is clear
□ Public API is defined
□ Dependency rules are known
□ Build output is defined
□ Runtime compatibility is defined
□ Testing is independent
□ Version/release strategy is defined
□ Documentation exists
□ Existing package cannot reasonably own capability
```

If most answers are no, use a module rather than a package.

---

# 183. Definition of Done — Reusable Library

A reusable library is complete only when:

```text
✓ Scope is coherent
✓ Public API is intentionally defined
✓ Internal API remains private
✓ Ownership is assigned
✓ Dependencies are justified
✓ Error behavior is predictable
✓ Security reviewed where applicable
✓ Tests cover contract
✓ Documentation exists
✓ Examples exist where useful
✓ Supported runtimes are known
✓ Version policy is known
✓ Breaking changes can be managed
✓ Consumer adoption does not require internal overrides
```

---

# 184. Definition of Done — Reusable Component

A reusable UI component is complete only when:

```text
✓ Uses canonical tokens
✓ Uses sanctioned primitives
✓ Public props represent meaningful semantics
✓ No feature-specific behavior leaks into primitive API
✓ Default state defined
✓ Hover state defined where relevant
✓ Focus state verified
✓ Disabled state defined
✓ Loading state defined where relevant
✓ Error state defined where relevant
✓ Keyboard behavior verified
✓ Accessible naming verified
✓ Responsive behavior verified
✓ Long content tested
✓ Dark/light themes verified where supported
✓ Documentation provided
✓ Tests provided
✓ Ownership assigned
```

---

# 185. AI Reusability Rules

AI-generated code MUST follow the same reuse hierarchy.

Before creating a new shared abstraction, the AI SHOULD inspect existing:

```text
components
hooks
utilities
domain modules
packages
design-system registry
API clients
validation schemas
types
```

The AI MUST NOT invent duplicates when an established implementation already exists.

---

# 186. AI Search-Before-Create Rule

Before generating:

```text
Button
Modal
Card
HTTP client
formatting utility
permission helper
date helper
validation helper
```

the AI SHOULD search the repository for the existing canonical implementation.

Reuse is preferable to parallel invention.

---

# 187. AI Extraction Rule

The AI MUST NOT extract code merely because two snippets look similar.

It should first determine whether they share a stable concept.

Prefer a small amount of duplication over an incorrect abstraction.

---

# 188. AI Promotion Rule

AI SHOULD initially keep highly feature-specific logic local.

It SHOULD recommend promotion only when:

```text
reuse is real
semantics are stable
target layer is clear
```

---

# 189. AI Dependency Rule

AI MUST NOT introduce a dependency without checking whether:

```text
existing platform functionality
existing repository dependency
small local implementation
```

already solves the requirement appropriately.

---

# 190. AI API Rule

AI-generated reusable APIs SHOULD optimize for:

```text
clarity
small surface
safe defaults
composition
explicit behavior
```

Avoid speculative configurability.

---

# 191. AI Shared-Type Rule

AI SHOULD NOT move every interface into a global shared-types directory.

Types should remain near ownership unless they represent an actual cross-boundary contract.

---

# 192. AI Utility Rule

AI MUST NOT use generic dumping grounds such as:

```text
utils.ts
helpers.ts
common.ts
misc.ts
```

for unrelated functionality.

Create focused modules.

---

# 193. AI Wrapper Rule

AI SHOULD NOT create an internal wrapper around a dependency unless the wrapper provides:

```text
policy
stable abstraction
design-system treatment
security
observability
provider isolation
```

A wrapper with no meaningful responsibility is unnecessary indirection.

---

# 194. AI Import Rule

AI MUST use public package entry points.

It SHOULD NOT deep-import internal implementation files merely because they are technically accessible.

---

# 195. AI Client/Server Rule

AI MUST verify that reusable server code does not leak into client bundles.

It must treat:

```text
database
filesystem
secrets
private environment variables
service credentials
```

as server-only.

---

# 196. AI Breaking-Change Rule

When modifying broadly reused code, AI SHOULD identify:

```text
affected exports
consumer usage
behavior changes
migration implications
```

before changing the public contract.

Do not casually rewrite shared infrastructure to satisfy one feature.

---

# 197. AI Gold Rule

When uncertain:

```text
Reuse established code
>
Compose existing primitives
>
Extend canonical abstraction
>
Extract proven shared behavior
>
Create new generic abstraction
```

The last option carries the highest architectural cost.

---

# 198. Golden Reusability Rules

**1. Reuse concepts, not coincidental code.**  
Shared semantics justify abstraction.

**2. Start local. Promote deliberately.**  
Global placement is not a badge of quality.

**3. Abstract after understanding variation.**  
Do not predict requirements prematurely.

**4. Keep public APIs small.**  
Every export becomes a maintenance commitment.

**5. Hide implementation details.**  
Consumers depend on contracts.

**6. Prefer composition.**  
Avoid giant configurable abstractions.

**7. Keep dependency direction clean.**  
Stable layers must not depend on features.

**8. Avoid circular dependencies.**

**9. Assign ownership.**  
Shared code without an owner becomes legacy infrastructure.

**10. Document reusable contracts.**

**11. Test the public behavior.**

**12. Make safe defaults easy.**

**13. Resist dependency proliferation.**

**14. Avoid miscellaneous shared buckets.**

**15. Do not fork canonical components locally.**

**16. Separate persistence models from public contracts.**

**17. Treat widely reused code as higher risk.**  
Its blast radius is larger.

**18. Make breaking changes deliberately.**

**19. Remove obsolete abstractions.**

**20. Prefer understandable duplication over the wrong abstraction.**

---

# 199. Canonical Reusability Standard

The organizational standard is:

> **Reusable code must represent stable shared semantics rather than superficial duplication. Code begins at the narrowest appropriate scope and is promoted only when broader reuse is proven or foundational ownership is clear. Shared libraries expose small intentional public APIs, hide implementation details, maintain clean dependency direction, provide safe defaults, document contracts, carry explicit ownership, and support controlled evolution. Composition is preferred over highly configurable abstractions, and existing canonical libraries and design-system components take precedence over feature-level forks.**

The architecture should make it easy to answer:

```text
Where should this code live?
Who owns it?
Who may depend on it?
What is its public contract?
How may it change?
```

If those questions cannot be answered clearly, the abstraction is not mature enough to become shared.

For the overall engineering standard, I’d place this layer as:

**Foundations → Security → Routes → Layouts → Facade → Components → Patterns → Reusability & Libraries → Data/API → Testing → Performance → Accessibility → Governance.**

That ordering makes **reusability a consequence of established architecture**, rather than something that drives premature abstraction.
