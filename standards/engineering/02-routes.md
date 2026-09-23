---
id: "routes"
title: "Routes Guidelines — Gold Standard"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "routes"]
applies_to: ["general"]
related: []
legacy_number: 4
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 41464
provenance: baseline

---

Yes. This should cover **URL architecture, route hierarchy, layouts, navigation, state in URLs, auth boundaries, resource naming, redirects, deep linking, error routes, and implementation rules**.

# Routes Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical routing architecture for product applications.

The routing system exists to ensure that application URLs are:

- predictable;
- stable;
- readable;
- shareable;
- deep-linkable;
- hierarchical;
- secure;
- framework-compatible;
- easy to maintain;
- aligned with product information architecture.

Routes are part of the product interface.

A URL communicates:

- location;
- hierarchy;
- resource identity;
- application state;
- navigational context.

The core principle is:

> **Routes should describe product structure, not implementation structure.**

---

# 2. Route Principles

## 2.1 URLs are product contracts

Public and application-facing URLs SHOULD be treated as stable interfaces.

Changing a URL can break:

- bookmarks;
- documentation;
- support references;
- integrations;
- browser history;
- shared links;
- external links.

Do not rename routes casually.

---

## 2.2 Routes represent resources and destinations

Prefer URLs that describe what the user is viewing.

Good:

```text
/projects
/projects/123
/projects/123/settings
/settings/billing
/team/members
```

Avoid URLs that expose implementation details:

```text
/pages/projects
/components/settings
/project-page?id=123
/dashboard-view-v2
```

---

## 2.3 Route structure should match information architecture

The URL hierarchy SHOULD mirror the conceptual hierarchy of the product.

Example:

```text
/workspaces/:workspaceId/projects/:projectId/settings
```

means:

```text
Workspace
└── Project
    └── Settings
```

Avoid route nesting that does not correspond to a meaningful product relationship.

---

# 3. Canonical Route Structure

A product route may consist of:

```text
Origin
└── Product area
    └── Resource
        └── Resource identifier
            └── Subresource
                └── View
```

Example:

```text
/app/projects/123/settings/members
```

Do not add hierarchy without semantic value.

---

# 4. Route Naming

Routes MUST use stable, readable naming.

Recommended:

```text
/projects
/settings
/members
/billing
/activity
/integrations
```

Avoid:

```text
/proj
/conf
/usr-mgmt
/page1
/module-x
```

Prefer complete domain terms unless an abbreviation is universally understood.

---

# 5. Case Convention

Routes SHOULD use lowercase.

Use:

```text
/account-settings
```

not:

```text
/AccountSettings
/accountSettings
/ACCOUNT-SETTINGS
```

Lowercase reduces ambiguity and avoids case-sensitive platform differences.

---

# 6. Word Separation

Use hyphens for multi-word route segments.

Preferred:

```text
/api-keys
/team-members
/account-settings
```

Avoid:

```text
/api_keys
/teamMembers
/accountsettings
```

---

# 7. Singular vs Plural

Use plural nouns for collections.

```text
/projects
/users
/members
/invoices
```

Individual resources live beneath the collection:

```text
/projects/:projectId
/users/:userId
```

Use singular routes for true singleton resources:

```text
/profile
/account
/settings
```

The convention MUST remain consistent.

---

# 8. Nouns Over Verbs

Routes SHOULD generally identify resources rather than actions.

Prefer:

```text
/projects/123
/projects/123/settings
```

over:

```text
/view-project/123
/manage-project/123
```

Navigation describes destinations.

Actions usually belong in the UI or mutation layer rather than the path.

---

# 9. Action Routes

Action-oriented route segments MAY be appropriate when representing a distinct workflow.

Examples:

```text
/login
/signup
/reset-password
/onboarding
/import
/checkout
```

For resource operations, prefer UI actions over dedicated action URLs unless users meaningfully navigate to that workflow.

---

# 10. Dynamic Segments

Dynamic identifiers SHOULD use clear semantic names internally.

Example framework notation:

```text
/projects/[projectId]
/teams/[teamId]
/users/[userId]
```

Prefer:

```text
projectId
```

over:

```text
id
```

when multiple resource types may appear in the same route hierarchy.

---

# 11. Stable Resource Identifiers

URLs SHOULD use stable identifiers.

Possible identifiers include:

- UUID;
- canonical slug;
- database-safe public ID;
- immutable external identifier.

Avoid identifiers that may frequently change.

---

# 12. IDs vs Slugs

Use IDs when:

- identity must remain immutable;
- names are frequently changed;
- uniqueness matters;
- lookup performance or simplicity matters.

Use slugs when:

- readability matters;
- resources are human-facing;
- names are sufficiently stable.

Example:

```text
/projects/acme-redesign
```

A hybrid model MAY use:

```text
/projects/prj_123-acme-redesign
```

where the stable ID controls lookup and the slug improves readability.

---

# 13. Do Not Expose Sensitive Identifiers

URLs MUST NOT contain secrets.

Never place in routes or query strings:

- access tokens;
- passwords;
- session secrets;
- API credentials;
- authentication codes beyond established short-lived flows;
- sensitive internal identifiers where disclosure creates risk.

URLs are frequently logged, copied, cached, and included in browser history.

---

# 14. Resource Hierarchy

Nest resources only when the parent relationship is meaningful.

Good:

```text
/workspaces/:workspaceId/projects/:projectId
```

when projects belong to a workspace context.

Avoid unnecessary nesting:

```text
/organizations/:organizationId/workspaces/:workspaceId/projects/:projectId/tasks/:taskId/comments/:commentId
```

when the child can be uniquely addressed more simply.

Excessive route depth reduces usability.

---

# 15. Maximum Route Depth

Keep routes as shallow as practical.

Prefer:

```text
/projects/:projectId/activity
```

over:

```text
/workspaces/:workspaceId/projects/:projectId/project-details/activity-log
```

unless each hierarchy level is required for product context.

A route should contain the minimum context necessary to uniquely and correctly identify the destination.

---

# 16. Product Areas

Top-level route segments SHOULD represent stable product domains.

Examples:

```text
/dashboard
/projects
/customers
/orders
/analytics
/settings
```

Avoid creating top-level routes for minor UI components.

---

# 17. Dashboard Route

Use `/` or `/dashboard` intentionally.

Choose `/` when the application has one obvious landing destination.

Choose `/dashboard` when:

- the dashboard is one product area among several;
- `/` performs workspace or authentication routing;
- the explicit route improves navigation clarity.

Do not maintain both without a canonical redirect strategy.

---

# 18. Route Groups

Framework-specific route groups MAY be used for implementation organization without affecting URLs.

Example conceptual structure:

```text
(auth)
(app)
(marketing)
```

Implementation groups SHOULD NOT leak into visible URL paths unless they have product meaning.

---

# 19. Route Layouts

Shared route hierarchy SHOULD map to shared layouts.

Example:

```text
/settings
/settings/profile
/settings/security
/settings/billing
```

can share:

```text
SettingsLayout
```

Shared layouts MAY own:

- navigation;
- page shell;
- breadcrumbs;
- tabs;
- persistent context;
- permission checks.

Avoid duplicating layout structure across sibling routes.

---

# 20. Nested Layouts

Use nested layouts when the UI has a real persistent hierarchy.

Example:

```text
AppLayout
└── WorkspaceLayout
    └── ProjectLayout
        └── ProjectSettingsLayout
```

Do not create nested layouts simply because the framework supports them.

Every nested layout should own meaningful persistent structure.

---

# 21. Navigation and Routes

Primary navigation MUST map predictably to canonical routes.

Example:

```text
Projects    → /projects
Customers   → /customers
Analytics   → /analytics
Settings    → /settings
```

Users SHOULD be able to infer destinations from navigation labels.

---

# 22. Active Navigation

Active navigation state SHOULD derive from route state.

Do not maintain unrelated local state for current navigation when the URL already expresses it.

Examples:

```text
/settings/profile
```

should activate:

```text
Settings
```

and potentially:

```text
Profile
```

in nested navigation.

---

# 23. Parent Route Activation

Nested destinations SHOULD preserve parent navigation context.

Example:

```text
/projects/123/settings
```

should still identify:

```text
Projects
```

as the active primary product area.

---

# 24. Breadcrumbs

Breadcrumbs SHOULD map to navigable route hierarchy.

Example:

```text
Projects / Acme Redesign / Settings
```

corresponding to:

```text
/projects
/projects/acme-redesign
/projects/acme-redesign/settings
```

Do not use breadcrumbs as browser history.

---

# 25. Canonical URLs

Every destination SHOULD have one canonical URL.

Avoid multiple equivalent routes such as:

```text
/project/123
/projects/123
/projects?id=123
/view-project/123
```

Choose one.

Redirect deprecated alternatives where necessary.

---

# 26. Trailing Slashes

Choose one trailing-slash policy and enforce it consistently.

For example:

```text
/projects
```

rather than mixing:

```text
/projects
/projects/
```

The framework should canonicalize automatically where practical.

---

# 27. Query Parameters

Use query parameters for state that modifies a destination rather than defining a new resource.

Appropriate:

```text
/projects?status=active
/projects?sort=updated-desc
/projects?page=2
/projects?search=mobile
```

The base destination remains `/projects`.

---

# 28. Query State Categories

URL query state is appropriate for:

- search;
- filtering;
- sorting;
- pagination;
- selected view mode;
- date ranges;
- tab selection where deep-linking matters;
- non-sensitive display configuration.

---

# 29. Query Parameter Naming

Use concise semantic names.

Preferred:

```text
?search=
?status=
?sort=
?page=
?view=
?from=
?to=
```

Avoid:

```text
?q1=
?filterTypeValue=
?currentSelectedStatusOption=
```

---

# 30. Query Parameter Stability

Query parameter names are part of the route contract.

Do not rename them casually if URLs may be shared externally.

---

# 31. Search State in URL

Search SHOULD usually be represented in the URL when users benefit from:

- sharing results;
- browser back/forward;
- refreshing without losing state;
- bookmarking searches.

Example:

```text
/customers?search=acme
```

---

# 32. Filter State in URL

Filters SHOULD usually be URL-backed on data-heavy pages.

Example:

```text
/orders?status=overdue&region=apac
```

This preserves state across:

- refresh;
- sharing;
- navigation history.

---

# 33. Multi-Value Filters

Use one canonical format.

Possible strategies:

```text
?status=active,pending
```

or:

```text
?status=active&status=pending
```

Choose one system-wide convention.

Do not allow every feature to invent its own encoding.

---

# 34. Sorting

Sorting SHOULD use a stable explicit convention.

Examples:

```text
?sort=name-asc
?sort=updated-desc
```

or:

```text
?sort=updated&order=desc
```

Select one convention.

---

# 35. Pagination

Pagination state SHOULD usually live in the URL.

Example:

```text
/invoices?page=3
```

Optional page-size state:

```text
/invoices?page=3&pageSize=50
```

Do not place pagination exclusively in local state when navigation history matters.

---

# 36. Tabs

Use route segments for tabs when each tab represents a meaningful destination.

Example:

```text
/projects/123/overview
/projects/123/activity
/projects/123/settings
```

Use query parameters or local state when the tab is lightweight presentation state.

Example:

```text
/projects/123?tab=activity
```

Choose based on navigational significance.

---

# 37. Route vs Query Decision

Use a **route segment** when the destination:

- has meaningful independent identity;
- should be linkable;
- changes page-level context;
- may have its own permissions;
- may have its own layout or loading behavior.

Use a **query parameter** when the state:

- modifies the same resource view;
- represents filtering or sorting;
- does not materially change page identity.

---

# 38. URL vs Local State

Use URL state when users benefit from:

- shareability;
- persistence across refresh;
- browser history;
- deep linking.

Use local state for transient interaction such as:

- open dropdown;
- hover;
- temporary field draft;
- accordion state;
- nonessential modal state.

Do not push every interaction into the URL.

---

# 39. Modal Routes

Modal state MAY be route-backed when deep linking materially improves the experience.

Example:

```text
/projects
/projects/123
```

where the project opens as a contextual modal over the list.

This pattern requires careful handling of:

- direct navigation;
- back button;
- refresh;
- accessibility;
- focus restoration;
- standalone fallback rendering.

Use only when the product benefits from it.

---

# 40. Authentication Routes

Authentication routes SHOULD remain simple.

Typical:

```text
/login
/signup
/forgot-password
/reset-password
/verify-email
```

Avoid deep nesting unless necessary.

---

# 41. Authenticated Route Boundaries

Authenticated application routes SHOULD have one clear protected boundary.

Conceptually:

```text
Public
├── /
├── /login
└── /signup

Authenticated
├── /dashboard
├── /projects
└── /settings
```

Authentication enforcement SHOULD occur at the appropriate server or middleware boundary.

Do not depend solely on client-side hiding.

---

# 42. Authorization

Routing must distinguish authentication from authorization.

Authentication answers:

> Who is the user?

Authorization answers:

> Can this user access this resource?

A valid authenticated session does not imply access to every route.

---

# 43. Unauthorized Access

When users are authenticated but lack permission:

Use the product-standard behavior.

Possible outcomes:

```text
403 / access denied page
resource-specific restricted state
redirect to permitted parent route
```

Do not silently render broken or incomplete interfaces.

---

# 44. Unauthenticated Access

Protected routes SHOULD preserve an intended return destination when appropriate.

Example flow:

```text
/projects/123
↓
/login
↓
successful login
↓
/projects/123
```

Return URLs MUST be validated to prevent unsafe redirects.

---

# 45. Workspace and Tenant Routing

Multi-tenant products require one canonical tenancy strategy.

Common models:

```text
/workspaces/:workspaceId/projects
```

or:

```text
/:workspaceSlug/projects
```

or tenant-aware subdomains.

The system MUST clearly define:

- workspace resolution;
- switching behavior;
- deep-link behavior;
- unavailable workspace handling;
- permissions.

Do not mix tenancy strategies without architectural justification.

---

# 46. Workspace Context

If workspace identity is required to resolve a resource, include it explicitly where appropriate.

If resources are globally unique and the workspace context can be inferred safely, shorter routes MAY be preferable.

Choose one consistent model.

---

# 47. Cross-Workspace Navigation

Switching tenant/workspace context SHOULD produce a valid canonical route.

Do not leave users on a resource that does not exist in the newly selected context.

---

# 48. Settings Routes

Use structured settings routes.

Example:

```text
/settings
/settings/profile
/settings/security
/settings/notifications
/settings/billing
```

For resource-specific settings:

```text
/projects/:projectId/settings
/projects/:projectId/settings/members
```

Avoid one giant settings page controlled entirely by hidden local state.

---

# 49. Create Routes

Creation workflows MAY use:

```text
/projects/new
```

when creation is substantial or independently navigable.

Use an in-page dialog when creation is lightweight and does not need deep-linking.

`new` SHOULD be reserved as a static segment and not conflict with resource identifiers.

---

# 50. Edit Routes

Use dedicated edit routes when editing is a substantial workflow.

Example:

```text
/projects/:projectId/edit
```

For lightweight inline editing, no separate route may be necessary.

Avoid duplicate detail and edit routes when the product naturally supports editing directly in the detail view.

---

# 51. Duplication and Clone Workflows

Avoid action-heavy URLs unless the workflow itself is navigable.

Prefer:

```text
/projects/new?from=:projectId
```

or application actions over:

```text
/projects/:projectId/duplicate-project-now
```

The route should remain understandable.

---

# 52. Delete Actions

Deletion SHOULD normally be a mutation, not a navigable route.

Avoid:

```text
/projects/:projectId/delete
```

unless the product explicitly requires a separate destructive workflow page.

Use an alert dialog or equivalent interaction.

---

# 53. Route Ordering and Conflicts

Static segments SHOULD take precedence conceptually over dynamic segments.

Example:

```text
/projects/new
/projects/:projectId
```

The router must not interpret `"new"` as a project identifier.

Reserve important static keywords.

---

# 54. Reserved Route Segments

Maintain a known set where needed.

Examples:

```text
new
edit
settings
activity
history
members
billing
integrations
```

Resource slugs SHOULD avoid collisions with reserved segments where relevant.

---

# 55. Route Constants

Route construction SHOULD be centralized for complex applications.

Conceptually:

```ts
routes.projects.list()
routes.projects.detail(projectId)
routes.projects.settings(projectId)
```

This reduces:

- typos;
- duplicated path logic;
- inconsistent query encoding;
- brittle route changes.

Avoid scattering complex literal route strings across the codebase.

---

# 56. Typed Routes

Typed route helpers SHOULD be used where the framework and tooling support them.

They improve:

- parameter correctness;
- refactoring;
- autocomplete;
- query consistency.

Typing SHOULD simplify route use rather than create excessive abstraction.

---

# 57. Link Components

Use the framework's canonical navigation primitive.

Internal links SHOULD use client-aware navigation where appropriate.

External links SHOULD use standard anchor behavior.

Do not use buttons with imperative routing when a semantic link is correct.

---

# 58. Button vs Link

Use:

```text
Link → navigation
Button → action
```

Example:

```text
View project → link
Delete project → button
```

Do not make navigation inaccessible by implementing every link as an `onClick`.

---

# 59. Browser History

Routing behavior MUST respect expected browser controls.

Users should be able to use:

- Back;
- Forward;
- Refresh;
- Copy URL;
- Open in new tab.

Avoid route models that break standard browser expectations.

---

# 60. Push vs Replace

Use history **push** when navigation creates a meaningful new history entry.

Use history **replace** when:

- canonicalizing a URL;
- correcting invalid query state;
- updating nonhistorical routing state;
- redirecting obsolete paths.

Do not fill history with meaningless micro-state changes.

---

# 61. Scroll Restoration

Navigation SHOULD have intentional scroll behavior.

Typical:

- new page → top;
- back navigation → restored position;
- query-only filtering → preserve position where useful;
- anchor link → target element.

Do not reset scroll unpredictably.

---

# 62. Focus Management

Client-side route navigation SHOULD maintain accessible focus behavior.

When navigating to a new page, focus SHOULD move to an appropriate landmark or heading when necessary.

Do not leave keyboard users focused on a control that no longer exists.

---

# 63. Route Loading States

Each substantial route SHOULD define an appropriate loading experience.

Loading states SHOULD preserve known structure.

Example:

```text
App shell
Page header
Content skeleton
```

Avoid blank-screen transitions where the shell can remain stable.

---

# 64. Route Error Boundaries

Meaningful route boundaries SHOULD have error handling.

Examples:

```text
Application error
Workspace error
Project error
Settings error
```

Errors SHOULD be isolated to the smallest useful route boundary.

Do not allow a minor nested data failure to crash the entire application unnecessarily.

---

# 65. Not Found

Unknown resources MUST produce a clear not-found state.

Examples:

```text
/project does not exist
resource was deleted
URL is invalid
user lacks visibility
```

Security considerations may require indistinguishable not-found behavior for unauthorized private resources.

---

# 66. 404 Page

A canonical 404 route SHOULD:

- clearly indicate the destination was not found;
- preserve application context where useful;
- provide a recovery path;
- avoid exposing internal routing details.

Typical actions:

```text
Go to dashboard
Go back
Search
```

depending on the product.

---

# 67. Redirects

Redirects SHOULD be used for:

- renamed routes;
- canonical URL normalization;
- post-auth navigation;
- moved resources;
- deprecated route migration.

Redirect chains SHOULD be avoided.

Prefer:

```text
old → canonical
```

not:

```text
old → newer → newest → canonical
```

---

# 68. Permanent vs Temporary Redirects

Use permanent redirects only when the route change is intended to remain canonical.

Use temporary redirects when:

- state is conditional;
- authentication determines destination;
- migration is not final.

Redirect semantics matter for caching and indexing.

---

# 69. Deprecated Routes

When changing a mature route:

1. define the new canonical route;
2. maintain redirect compatibility where practical;
3. update internal links;
4. update documentation;
5. remove old aliases only when safe.

Do not silently break existing deep links.

---

# 70. SEO and Public Routes

Public routes SHOULD define:

- canonical URLs;
- metadata;
- indexability;
- meaningful slugs;
- redirects;
- locale behavior.

Private application routes generally SHOULD NOT be treated like SEO pages.

---

# 71. Metadata

Each route SHOULD define appropriate page metadata.

At minimum where relevant:

```text
title
description
canonical URL
social metadata
robots behavior
```

Application routes SHOULD have useful browser titles.

Example:

```text
Acme Redesign · Projects
```

rather than:

```text
App
```

---

# 72. Route Titles

Browser titles SHOULD follow one consistent convention.

Example:

```text
{Page} · {Product}
```

or:

```text
{Resource} · {Section} · {Product}
```

Avoid inconsistent title patterns.

---

# 73. Anchor Links

Use fragment identifiers for meaningful in-page destinations.

Example:

```text
/settings/security#sessions
```

Anchors SHOULD reference stable section identifiers.

Do not use fragments as a substitute for route architecture.

---

# 74. Locale Routing

Internationalized products MUST define one locale strategy.

Common examples:

```text
/en/projects
/ms/projects
```

or locale negotiation without path segments.

The system must define:

- default locale;
- canonical URLs;
- locale switching;
- fallback;
- deep-link preservation.

Do not mix locale strategies arbitrarily.

---

# 75. Route State Validation

All path and query parameters MUST be validated.

Treat URLs as untrusted input.

Validate:

- identifiers;
- enums;
- pagination;
- date ranges;
- sort values;
- filter values;
- redirect destinations.

Invalid values SHOULD degrade predictably.

---

# 76. Invalid Query State

When query parameters are invalid:

Preferred behavior may include:

- ignoring unsupported values;
- replacing with safe defaults;
- canonicalizing the URL.

Do not allow invalid query values to crash the page.

---

# 77. Unknown Dynamic Resource

If:

```text
/projects/:projectId
```

does not resolve, return the canonical not-found behavior.

Do not render a generic empty project screen.

---

# 78. Route Security

Never treat route obscurity as authorization.

Knowing or guessing a route MUST NOT grant resource access.

Authorization must be enforced against the resource itself.

---

# 79. Open Redirect Protection

Parameters such as:

```text
?returnTo=
?redirect=
?next=
```

MUST be validated.

Do not allow arbitrary external URLs without explicit trusted handling.

---

# 80. Sensitive Query Parameters

Avoid placing sensitive data in query strings because URLs can appear in:

- logs;
- analytics;
- referrers;
- screenshots;
- browser history.

Use safer request mechanisms where appropriate.

---

# 81. Analytics

Route naming SHOULD support stable analytics.

Analytics events SHOULD use canonical route concepts rather than raw fragile path strings where practical.

Example:

```text
route_name: project_detail
```

alongside relevant resource metadata.

---

# 82. Route Observability

Route-level monitoring SHOULD be able to identify:

- error rate;
- latency;
- navigation failures;
- not-found rates;
- redirect loops.

Canonical route names simplify observability.

---

# 83. Feature Flags

Feature flags SHOULD NOT create permanent duplicate route architectures.

When a new experience replaces an old one, preserve a canonical route where practical and switch implementation behind it.

Avoid:

```text
/projects
/projects-v2
/projects-new
```

as long-term product routes.

---

# 84. Experiments

Experiments SHOULD preferably occur behind the same canonical route.

The URL should not expose test variants unless the variant itself requires shareable state.

---

# 85. Mobile and Desktop Routes

Responsive layout differences SHOULD generally share the same route.

Do not create:

```text
/mobile/projects
/desktop/projects
```

The route identifies product state, not viewport implementation.

---

# 86. Native and Web Deep Links

Products with native applications SHOULD define compatible deep-link semantics where possible.

The same conceptual destination should map consistently across surfaces.

Example concept:

```text
Project → project identifier → settings
```

even when URI schemes differ.

---

# 87. Route Prefetching

Route prefetching MAY improve performance when:

- destination probability is high;
- payload cost is acceptable;
- framework support is robust.

Do not aggressively prefetch every possible destination.

---

# 88. Route-Level Data Loading

Data loading SHOULD align with route boundaries.

Load data at the highest boundary that owns it.

Avoid fetching the same resource independently across multiple nested route components.

---

# 89. Parallel Data Requirements

Routes MAY load independent datasets concurrently when the UI allows it.

Do not create unnecessary sequential loading chains based solely on component nesting.

---

# 90. Route Caching

Caching rules SHOULD reflect data semantics.

Examples:

```text
public static content → long-lived
user dashboard → dynamic
project metadata → revalidatable
billing data → fresh/sensitive
```

Route architecture and caching architecture SHOULD not conflict.

---

# 91. Route Mutations

After mutations, route state SHOULD remain coherent.

Examples:

### Create

```text
POST/create
↓
redirect to /projects/:newId
```

### Delete

```text
/projects/:id
↓ delete
/projects
```

### Rename

Resource ID remains stable.

### Filter mutation

Preserve applicable query state.

---

# 92. Post-Create Destination

Creation flows MUST define the post-create destination.

Possible:

```text
new resource detail
resource edit/setup
parent collection
```

Choose intentionally.

Do not let each feature invent inconsistent behavior.

---

# 93. Post-Delete Destination

Deleting the current resource MUST define where the user goes next.

Usually:

```text
parent collection
```

or:

```text
next relevant resource
```

Do not leave users on a dead route.

---

# 94. Unsaved Changes

Routes containing editable state SHOULD define unsaved-change behavior.

Consider:

- internal navigation;
- browser back;
- closing tab;
- switching workspace;
- redirect.

Do not block navigation unnecessarily, but protect meaningful unsaved work.

---

# 95. Route Transitions

Transitions SHOULD preserve orientation.

Users should understand:

- where they were;
- where they moved;
- how to return.

Avoid dramatic route animations in productivity applications.

---

# 96. Route Design and Layout

Route hierarchy and layout hierarchy SHOULD reinforce each other.

Example:

```text
/settings/security
```

should look and behave as part of:

```text
Settings
```

rather than as an unrelated standalone interface.

---

# 97. Route Design and Tabs

Do not make a visual tab look local while routing to an unrelated application domain.

Visual hierarchy and URL hierarchy must agree.

---

# 98. Route Design and Breadcrumbs

Breadcrumbs MUST NOT invent hierarchy that is absent from the product model.

If the URL is:

```text
/projects/123
```

a breadcrumb such as:

```text
Dashboard / Administration / Work / Projects / Project
```

is likely over-modeled.

Show only meaningful navigable ancestry.

---

# 99. Route Design and Sidebar

Sidebar navigation SHOULD correspond to stable product route groups.

Example:

```text
Projects
Customers
Analytics
Settings
```

Avoid creating navigation items that merely toggle temporary local UI unless clearly distinguished.

---

# 100. Naming Resources

Use the same domain terminology across:

- routes;
- navigation;
- headings;
- APIs where practical;
- documentation.

Do not call the same concept:

```text
Clients
Customers
Accounts
Organizations
```

in different product layers without a deliberate distinction.

---

# 101. Legacy Naming

If product terminology changes, routes MAY remain stable temporarily to preserve links.

Visible terminology and URL terminology do not have to change simultaneously.

Migration should be deliberate.

---

# 102. API Routes

Application page routes and backend API routes SHOULD have separate conventions.

Do not assume frontend route structure must mirror backend endpoint structure.

The UI route represents user-facing information architecture.

The API represents data and service architecture.

---

# 103. Webhook Routes

Webhook endpoints SHOULD be clearly isolated from application UI routes.

Example:

```text
/api/webhooks/provider
```

They should not share user-facing route behavior.

---

# 104. Internal Utility Routes

Internal operational routes SHOULD be clearly separated.

Examples:

```text
/internal
/admin
/dev
```

Access MUST be enforced explicitly.

Do not rely on obscure URLs for protection.

---

# 105. Admin Routes

Administration routes SHOULD use one clear domain boundary if the experience is meaningfully distinct.

Example:

```text
/admin/users
/admin/audit
/admin/settings
```

Do not scatter privileged functionality unpredictably throughout unrelated routes.

---

# 106. Public vs Private Routes

The architecture SHOULD clearly distinguish:

```text
Public
Authenticated
Privileged
System/internal
```

This improves:

- security review;
- middleware;
- layouts;
- testing.

---

# 107. Route File Organization

Filesystem organization SHOULD mirror route architecture where the framework uses file-based routing.

Keep route files focused on route responsibilities.

Move reusable:

- components;
- hooks;
- domain logic;
- services;

outside route files when they are shared.

Do not turn route directories into miscellaneous feature dumping grounds.

---

# 108. Route Components

A route component SHOULD primarily coordinate:

- data;
- permissions;
- layout;
- page-level state;
- route metadata.

Reusable UI SHOULD live in reusable components.

---

# 109. Route-Level Business Logic

Avoid embedding excessive domain logic directly inside routing definitions.

Route code should orchestrate rather than become the entire feature architecture.

---

# 110. Route Constants Anti-Pattern

Do not create abstraction so deep that simple navigation becomes unreadable.

Bad:

```text
ROUTE_TREE.APP.WORKSPACE.PROJECTS.DETAIL.SETTINGS.MEMBERS(...)
```

when:

```text
routes.projectMembers(id)
```

would be clearer.

Route helpers should improve readability.

---

# 111. Testing Routes

Critical routes SHOULD test:

- direct navigation;
- authenticated access;
- unauthorized access;
- invalid identifiers;
- not-found behavior;
- query parsing;
- redirects;
- browser back;
- deep links;
- post-mutation navigation.

---

# 112. Deep-Link Testing

Every meaningful route SHOULD work when opened directly.

Do not assume users reached it through the expected previous screen.

Direct load MUST establish required context independently.

---

# 113. Refresh Testing

Refreshing a route SHOULD preserve meaningful URL-backed state.

Example:

```text
/projects?status=active&page=2
```

should reopen with equivalent filtering and pagination.

---

# 114. Back/Forward Testing

Test browser navigation around:

- dialogs;
- filters;
- tabs;
- pagination;
- creation flows;
- redirects.

History should feel natural rather than noisy.

---

# 115. Route Review Checklist

Before approving a route, verify:

```text
□ Route expresses product meaning
□ Naming uses canonical domain terminology
□ Path is lowercase
□ Multi-word segments use hyphens
□ Collection naming is consistent
□ Route depth is justified
□ Dynamic identifiers are stable
□ No sensitive information appears in URL
□ Canonical URL is defined
□ Query state is intentionally selected
□ Route vs query decision is appropriate
□ Route vs local-state decision is appropriate
□ Direct deep link works
□ Refresh works
□ Back/forward behavior works
□ Authentication behavior is defined
□ Authorization behavior is defined
□ Not-found behavior is defined
□ Loading behavior is defined
□ Error boundary is defined
□ Redirect behavior is defined
□ Mobile and desktop share canonical route
□ Breadcrumb hierarchy is coherent
□ Navigation active state is coherent
□ Metadata/title is defined
□ Analytics naming is stable
□ Old URLs are migrated safely
```

---

# 116. Definition of Done — Routes

A route is complete only when:

```text
✓ Canonical path is defined
✓ Naming follows route standards
✓ Direct navigation works
✓ Browser refresh works
✓ Back/forward works
✓ Authentication is enforced
✓ Authorization is enforced
✓ Invalid params are handled
✓ Not-found state is handled
✓ Loading state is handled
✓ Error state is handled
✓ Query params are validated
✓ Deep links preserve required state
✓ Active navigation is correct
✓ Breadcrumbs are correct where applicable
✓ Page title/metadata is correct
✓ Redirects are intentional
✓ Post-mutation navigation is defined
✓ Responsive UI uses the same product route
✓ No secrets appear in the URL
```

---

# 117. Route Anti-Patterns

Avoid:

```text
/projects-page
/settings-screen
/dashboard-view
```

Implementation terminology.

Avoid:

```text
/projects?id=123
```

when `/projects/123` represents a true resource.

Avoid:

```text
/projects/123/delete
```

for ordinary mutations.

Avoid:

```text
/projects-new
/projects-v2
/projects-final
```

for implementation versions.

Avoid:

```text
/pages/app/main/projects
```

that exposes code organization.

Avoid:

```text
/dashboard?modal=true&panel=2&step=4&thing=open
```

for substantial product destinations that deserve routes.

Avoid:

```text
/project/123
/projects/123
/view-project/123
```

multiple URLs for one destination.

Avoid:

```text
/workspaces/23/organizations/2/teams/8/projects/9/tasks/12
```

when much of the ancestry is unnecessary.

Avoid:

```text
/desktop/projects
/mobile/projects
```

viewport-specific routes.

Avoid:

```text
?token=secret
```

sensitive URL state.

---

# 118. Route Decision Framework

When adding a destination, ask:

### 1. Is this a distinct user destination?

If no, it may be local state.

### 2. Should users bookmark or share it?

If yes, URL state is likely appropriate.

### 3. Is it a resource or a modification of a view?

Resource:

```text
route segment
```

View modification:

```text
query parameter
```

### 4. Does it require distinct permission, loading, or error handling?

If yes, a dedicated route boundary may be appropriate.

### 5. Is the hierarchy meaningful to users?

If no, do not encode it into the URL.

### 6. Can the destination be opened directly?

If no, reconsider the architecture.

---

# 119. Recommended Product Route Model

For a typical authenticated SaaS product:

```text
/
├── login
├── signup
├── onboarding
│
├── dashboard
│
├── projects
│   ├── new
│   └── :projectId
│       ├── overview
│       ├── activity
│       ├── members
│       └── settings
│
├── team
│   ├── members
│   └── invitations
│
├── analytics
│
└── settings
    ├── profile
    ├── security
    ├── notifications
    ├── billing
    └── integrations
```

This is a structural example, not a requirement to create unused routes.

---

# 120. Recommended Multi-Tenant Model

Where workspace context is part of every application destination:

```text
/
├── login
├── signup
│
└── :workspaceSlug
    ├── dashboard
    ├── projects
    │   ├── new
    │   └── :projectId
    │       ├── activity
    │       └── settings
    ├── team
    └── settings
```

Use this model only when workspace identity genuinely belongs in canonical URLs.

---

# 121. AI Routing Rules

AI-generated application code MUST follow the routing system.

Before creating a new route, the AI SHOULD inspect:

```text
existing route tree
existing layouts
route naming
auth boundaries
workspace/tenant convention
query parameter convention
route helpers
redirect patterns
```

The AI MUST NOT invent a new naming or hierarchy convention when an established one exists.

---

# 122. AI Route Selection

Use this decision tree:

```text
Does an existing destination already represent this?
    ↓ yes
Use it.

Is this a meaningful independent destination?
    ↓ no
Use component/local state.

Should the state be bookmarkable/shareable?
    ↓ yes
Represent it in the URL.

Does it modify an existing view?
    ↓ yes
Use a query parameter.

Does it represent a resource/subresource?
    ↓ yes
Use a route segment.

Does it require its own layout/permissions/error boundary?
    ↓ yes
Consider a dedicated route boundary.
```

---

# 123. AI Route Generation Rules

AI MUST NOT casually introduce:

```text
new top-level product areas
duplicate canonical URLs
route version suffixes
unnecessary nesting
sensitive query state
client-only auth protection
arbitrary query parameter names
different mobile routes
```

When route architecture is ambiguous, the AI SHOULD prefer the structure already established in the repository.

---

# 124. Route Governance

Any change affecting a stable product URL SHOULD be reviewed as an information-architecture change, not merely a code refactor.

Review should consider:

- existing external links;
- customer bookmarks;
- product documentation;
- support material;
- analytics;
- integrations;
- SEO where applicable;
- redirect requirements.

---

# 125. Golden Route Rules

When uncertain, follow these rules:

**1. Routes describe product concepts.**  
Never expose implementation structure unnecessarily.

**2. One destination, one canonical URL.**  
Avoid competing aliases.

**3. Use nouns for resources.**  
Use actions primarily for explicit workflows.

**4. Keep routes shallow.**  
Include only meaningful hierarchy.

**5. Use stable identifiers.**  
URLs should survive normal product changes.

**6. Use query parameters for view state.**  
Filters, sorting, and pagination usually modify a destination.

**7. Use route segments for real destinations.**  
Meaningful subresources deserve distinct URLs.

**8. Preserve browser behavior.**  
Back, forward, refresh, sharing, and new-tab navigation must work.

**9. Protect resources independently of routes.**  
A hidden URL is not authorization.

**10. Never put secrets in URLs.**

**11. Make deep links first-class.**  
Every meaningful route should work when opened directly.

**12. Route hierarchy and visual hierarchy must agree.**

**13. Preserve URLs through refactors.**  
Implementation may change without changing the product contract.

**14. Redirect deliberately.**  
Do not silently strand old links.

**15. Prefer predictability over clever routing.**

---

# 126. Canonical Route Standard

The organizational standard is:

> **Application routes must express stable product information architecture rather than implementation structure. Every meaningful destination has one canonical, readable, deep-linkable URL. Resource hierarchy is encoded only where semantically necessary; query parameters represent shareable view state; transient interaction remains local. Authentication, authorization, loading, errors, redirects, and browser history are treated as first-class routing concerns. Existing route conventions take precedence over feature-specific invention.**

The route system should be understandable enough that a user can interpret location, a developer can predict destination structure, and the application can evolve without routinely breaking existing links.

For the overall system architecture, I’d position this as:

**Foundations → Routes → Layouts → Facade → Components → Patterns → Templates → Accessibility → Governance.**

That puts **information architecture before spatial architecture**: first define *where a user is*, then define *how that destination is laid out*.
