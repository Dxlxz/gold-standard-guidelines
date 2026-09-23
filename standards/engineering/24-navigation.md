---
id: "navigation"
title: "Navigation & Information Architecture"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["engineering", "navigation", "information", "architecture"]
applies_to: ["ui", "team"]
related: ["architecture"]
legacy_number: 65
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 79772
provenance: baseline

---

This version makes URL/history semantics part of the IA contract rather than treating navigation as presentation. It also distinguishes ordinary navigation links from ARIA menu widgets and tabs: WAI specifically treats breadcrumb navigation as a labelled navigation landmark, while tabs are a composite widget with tab/tabpanel keyboard semantics. citeturn257991search2turn971484search0

# Navigation & Information Architecture Guidelines — Gold Standard 2026

**Canonical placement:** Routes → Navigation & IA → Layout Patterns → Accessibility  
**Status:** Canonical  
**Applies to:** Web applications, responsive applications, authenticated products, dashboards, administration interfaces, content sites, multi-tenant products, mobile web, client-side routing, nested resources, search interfaces, workspaces, and deep-linked application states  
**Component baseline:** shadcn/ui  
**Normative terms:** MUST, MUST NOT, SHOULD, SHOULD NOT, MAY

---

# 1. Purpose

## 1.1 Objective

This standard defines the canonical information-architecture, routing, navigation, wayfinding, responsive, state-management, accessibility, and URL requirements for application navigation.

It covers:

1. information architecture;
2. primary navigation;
3. secondary navigation;
4. sidebars;
5. top bars;
6. utility navigation;
7. breadcrumbs;
8. tabs;
9. segmented controls;
10. disclosure navigation;
11. navigation menus;
12. command palettes;
13. search placement;
14. deep linking;
15. URL contracts;
16. route parameters;
17. query parameters;
18. fragments;
19. browser Back/Forward semantics;
20. route-driven UI state;
21. scroll and focus restoration;
22. mobile navigation;
23. tenant/workspace switching;
24. permission-aware navigation;
25. orientation and wayfinding;
26. navigation loading/error states;
27. accessibility;
28. localization and RTL;
29. analytics and observability; and
30. navigation testing.

Navigation has two core functions:

```text
Tell users where they are.
Enable users to go somewhere else.
```

W3C describes these as the two central purposes of navigability and emphasizes headings, current-location cues, focus order, bypass mechanisms, and multiple methods for locating content. citeturn802046search12turn802046search5

## 1.2 Core principle

The canonical navigation model is:

```text
Information architecture
        ↓
Stable route model
        ↓
URL contract
        ↓
Navigation hierarchy
        ↓
Responsive presentation
        ↓
Accessible interaction
```

Visual navigation MUST be derived from the application's information architecture and route model.

The route model MUST NOT be reverse-engineered from whichever sidebar design is visually convenient.

A sidebar is not the information architecture.

A command palette is not the information architecture.

Search is not the information architecture.

Breadcrumbs are not browser history.

Tabs are not automatically navigation.

## 1.3 Navigation versus action

A control that takes the user to another resource or location SHOULD use link semantics.

A control that performs an operation SHOULD use button semantics.

Examples:

```text
View invoices       → link
Open settings       → link
Save changes        → button
Delete record       → button
Refresh data        → button
Expand navigation   → button
```

Visual styling MUST NOT change semantic meaning.

A link MAY look like a button.

A button MAY be visually subtle.

The semantic role MUST follow behavior.

WAI explicitly distinguishes link/navigation behavior from button actions and recommends matching role to function. citeturn257991search6

## 1.4 Navigation hierarchy

The canonical hierarchy is:

```text
Global product
└── Primary destination
    └── Section / workspace
        └── Secondary destination
            └── Resource
                └── Resource subview
```

Products MAY omit levels that are unnecessary.

Products MUST NOT invent additional navigation levels merely to fill a sidebar.

Each level SHOULD answer a distinct orientation question:

| Level | Question |
|---|---|
| Product | Which application am I in? |
| Tenant/workspace | Which organizational context am I using? |
| Primary navigation | Which major product area am I in? |
| Secondary navigation | Which part of that area am I in? |
| Breadcrumb | Where is this resource in the hierarchy? |
| Tabs/subview navigation | Which view of this resource is active? |
| Page heading | What am I looking at now? |

## 1.5 Relationship to other standards

This catalogue MUST be implemented consistently with:

- **Security:** authentication, authorization, tenant boundaries, permission-aware routes, sensitive URL data, redirects, open-redirect prevention, and navigation to privileged resources;
- **Data & Database:** stable identifiers, slugs, tenant identity, resource hierarchy, soft deletion, canonical resource identity, and referential stability;
- **API:** route/API separation, canonical identifiers, redirects, pagination, filters, errors, and deep-linked query state;
- **State Management:** router state, URL state, local navigation state, cached pages, Back/Forward restoration, loading, cancellation, and optimistic transitions;
- **Forms & Validation:** unsaved-change handling, route-blocking, wizard steps, query validation, and form state restoration;
- **Accessibility:** landmarks, focus order, skip links, link purpose, current-page state, keyboard navigation, visible focus, meaningful headings, and modal navigation;
- **Design Tokens:** sidebar width, header height, spacing, focus, active states, hover, surfaces, dividers, elevation, and responsive breakpoints;
- **Component standards:** Link, Button, Sidebar, NavigationMenu, Breadcrumb, Tabs, Sheet, Command, DropdownMenu, Popover, Tooltip, Separator, ScrollArea, Collapsible, and Dialog;
- **Pattern standards:** page shell, master/detail, search, tables, filters, settings, multi-step flows, mobile layout, and state catalogues; and
- **Internationalization:** localized labels, text expansion, RTL layout, translated URLs where approved, and locale-specific content hierarchy.

---

# 2. Rules

## 2.1 Information architecture before navigation UI

Every application MUST define its information architecture before selecting navigation components.

The IA SHOULD identify:

```text
product areas
resources
parent/child relationships
tasks
cross-cutting utilities
tenant/workspace context
search scope
permission boundaries
```

Navigation groups MUST correspond to concepts users can understand.

Navigation MUST NOT expose backend service boundaries, database modules, microservices, or internal team ownership unless those concepts are genuinely part of the user's domain.

Preferred:

```text
Customers
Invoices
Reports
Settings
```

Avoid implementation-driven structures such as:

```text
Customer Service
Billing API
Reporting Engine
Config DB
```

unless the product audience genuinely operates those systems.

---

## 2.2 Navigation depth

Navigation depth SHOULD be kept as shallow as domain complexity permits.

Primary navigation SHOULD normally contain major destinations rather than individual tasks.

Secondary navigation SHOULD represent subdivisions of the active primary area.

Third-level navigation MAY exist for genuinely deep products, but teams SHOULD first evaluate whether:

- the IA can be simplified;
- the content belongs in tabs;
- the content belongs in-page;
- the resource should have its own landing page; or
- search/command access is more appropriate.

Persistent navigation SHOULD NOT routinely exceed three visible hierarchical levels.

Deep resource hierarchy MAY still exist in URLs and breadcrumbs without every ancestor becoming a permanent sidebar item.

---

## 2.3 Primary navigation

Primary navigation identifies the major stable destinations of a product.

Examples:

```text
Overview
Projects
Customers
Billing
Reports
Administration
```

Primary navigation MUST:

- remain consistent across pages within the same application context;
- use stable labels;
- reflect major user mental models;
- identify the active destination;
- be available without requiring command-palette knowledge;
- support keyboard navigation; and
- adapt responsively without changing conceptual hierarchy.

Repeated navigation should remain in a consistent relative order across views. WCAG 2.2 requires repeated navigational mechanisms to appear in the same relative order unless users initiate the change. citeturn802046search8

Primary navigation SHOULD NOT change ordering based on:

- recent usage;
- analytics;
- A/B personalization;
- user role

unless the user explicitly controls that customization and the resulting behavior remains understandable.

Permission-based removal of inaccessible destinations is allowed.

---

## 2.4 Primary navigation size

Primary navigation SHOULD contain a manageable set of top-level choices.

A useful design target is approximately:

```text
5–8 major destinations
```

but domain coherence takes precedence over a numeric limit.

If primary navigation grows substantially beyond this range, teams SHOULD consider:

- grouping;
- secondary navigation;
- an application switcher;
- administration separation;
- overflow navigation; or
- revising the IA.

A long undifferentiated list of top-level items SHOULD NOT be treated as a successful sidebar merely because scrolling is possible.

---

## 2.5 Secondary navigation

Secondary navigation provides navigation within one primary area or resource family.

Examples:

```text
Settings
├── General
├── Members
├── Security
├── Billing
└── Integrations
```

Secondary navigation SHOULD remain contextual to its parent.

It MAY appear as:

- a sidebar subsection;
- local side navigation;
- horizontal sub-navigation;
- route-linked tabs; or
- an in-page contents pattern.

Secondary navigation MUST NOT duplicate primary navigation without adding useful hierarchy.

---

## 2.6 Utility navigation

Utility navigation contains cross-cutting destinations or actions such as:

```text
Help
Notifications
Profile
Account settings
Tenant switcher
Theme
Sign out
```

Utility navigation SHOULD be visually separated from primary navigation.

Utility items MUST NOT compete visually with core product destinations.

Sign-out, profile actions, theme preferences, and account switching SHOULD generally live in a user/account menu rather than the main navigation tree.

---

## 2.7 Sidebar baseline

For desktop application shells with substantial product hierarchy, shadcn/ui `Sidebar` is the canonical primitive baseline.

The current component provides explicit structures for:

```text
SidebarProvider
Sidebar
SidebarHeader
SidebarContent
SidebarGroup
SidebarMenu
SidebarFooter
SidebarRail
SidebarTrigger
SidebarInset
```

and supports off-canvas, icon-collapsed, and non-collapsible modes. citeturn971484search1

Feature teams SHOULD compose these primitives rather than creating unrelated sidebar implementations.

---

## 2.8 Sidebar anatomy

A canonical application sidebar SHOULD follow:

```text
Sidebar
├── Header
│   ├── Product/workspace identity
│   └── Optional switcher
├── Content
│   ├── Primary navigation group
│   ├── Contextual navigation groups
│   └── Optional secondary navigation
└── Footer
    ├── Help/support
    └── User/account control
```

Navigation content MUST remain scrollable independently when it exceeds the viewport.

Header and footer MAY remain sticky.

Main content MUST NOT become inaccessible because sidebar content is long.

---

## 2.9 Sidebar active state

Active navigation state MUST derive from canonical route state.

Feature code SHOULD NOT independently maintain:

```text
activeSidebarItem
```

when the router already determines the active route.

The active item MUST remain identifiable through more than color alone.

Appropriate cues include:

- background;
- text weight;
- indicator;
- icon treatment;
- `aria-current="page"`; and
- expanded ancestor state.

Only the destination representing the current page SHOULD normally use:

```text
aria-current="page"
```

Parent sections MAY use other visual expanded/selected cues without falsely claiming to be the current page.

---

## 2.10 Sidebar collapse

A collapsible desktop sidebar MAY collapse to icons.

When collapsed:

- every navigation destination MUST retain an accessible name;
- icon-only items SHOULD expose a discoverable visible label through Tooltip or equivalent;
- current-location state MUST remain perceivable;
- keyboard operation MUST remain complete; and
- collapse MUST NOT remove destinations.

An icon-only sidebar SHOULD NOT be the initial state for unfamiliar or low-frequency applications unless product evidence justifies it.

Icons MUST supplement labels rather than require users to memorize the product's icon vocabulary.

---

## 2.11 Sidebar collapsed-state persistence

User-selected sidebar collapse state MAY persist.

Persistence SHOULD normally be scoped to:

```text
user
+ application
```

and MAY also include:

```text
tenant/workspace
```

where layouts differ meaningfully.

Collapse state MUST NOT be encoded in the URL unless sharing that visual state has a product requirement.

Sidebar collapse is normally presentation state, not resource state.

---

## 2.12 Navigation groups

Navigation groups SHOULD reflect meaningful conceptual groupings.

Group labels SHOULD be short nouns or noun phrases.

Avoid meaningless groups such as:

```text
General
Other
More
Miscellaneous
```

unless those terms are genuinely understood in the product domain.

Groups containing only one item SHOULD normally be reconsidered.

A group MUST NOT be collapsible merely to reduce visual length if collapsing significantly harms discoverability.

---

## 2.13 Expandable navigation

Nested navigation that expands and collapses SHOULD use disclosure semantics where it primarily reveals additional links.

A disclosure trigger MUST communicate its expanded state using `aria-expanded`; Enter and Space must operate a disclosure button. citeturn257991search0

Ordinary website/application navigation SHOULD NOT automatically use ARIA `menu`/`menubar` semantics merely because designers call it a "menu."

WAI's disclosure-navigation guidance specifically demonstrates navigation as nested lists and disclosure buttons rather than requiring desktop application-menu semantics. citeturn257991search4

---

## 2.14 Top bars

A top bar SHOULD contain global context and utilities rather than duplicate the complete sidebar.

Typical top-bar content MAY include:

```text
mobile navigation trigger
breadcrumbs
global search
command palette trigger
tenant/workspace switcher
notifications
help
user/account control
```

A top bar MUST NOT become an arbitrary dumping ground for every page action.

Page-specific actions SHOULD normally remain in the page header or relevant content region.

---

## 2.15 Top-bar consistency

Global top-bar elements SHOULD remain in stable positions across product views.

A user-control area SHOULD NOT switch sides or order unpredictably from page to page.

Search placement SHOULD remain consistent when search scope is global.

Mobile and desktop arrangements MAY differ, but conceptual roles MUST remain recognizably equivalent.

---

## 2.16 Page header

Each navigable page SHOULD have a page header that establishes context.

A canonical page header MAY contain:

```text
breadcrumbs
page title
description
status
primary page action
secondary page actions
```

The page title SHOULD correspond to the document/page title and primary route context.

The primary page heading MUST NOT be replaced by breadcrumb text alone.

---

## 2.17 Breadcrumb purpose

Breadcrumbs represent **hierarchical location**.

They MUST NOT represent:

- the user's browsing history;
- every previously visited page;
- application Back behavior;
- workflow completion; or
- arbitrary route segments with no user meaning.

WAI defines a breadcrumb trail as an ordered set of links to parent pages that communicates a page's hierarchical location. citeturn257991search2

---

## 2.18 Breadcrumb baseline

shadcn/ui `Breadcrumb` is the canonical primitive baseline and provides:

```text
Breadcrumb
BreadcrumbList
BreadcrumbItem
BreadcrumbLink
BreadcrumbPage
BreadcrumbSeparator
```

for representing the current resource hierarchy. citeturn971484search3

Breadcrumbs MUST use a labelled navigation landmark.

The current page SHOULD be represented as the terminal item.

If the current item is a link, it MUST use:

```text
aria-current="page"
```

WAI recommends a labelled navigation landmark and `aria-current="page"` for the current breadcrumb link. citeturn257991search2turn257991search5

---

## 2.19 Breadcrumb structure

Breadcrumb hierarchy SHOULD reflect stable IA relationships rather than mechanically printing each URL segment.

Preferred:

```text
Projects
/
Atlas Migration
/
Settings
```

Avoid:

```text
app
/
tenant
/
a84cc1
/
projects
/
72811
/
settings
```

Internal IDs MUST NOT appear solely because they occur in the route.

Breadcrumb labels SHOULD use recognizable resource names.

---

## 2.20 Breadcrumb depth and truncation

Long breadcrumb trails MAY collapse intermediate ancestors.

The first meaningful ancestor and the immediate parent SHOULD remain discoverable where practical.

A collapsed breadcrumb control MUST remain keyboard accessible.

Hidden ancestors MAY be exposed through a menu or popover.

The current page MUST NOT become ambiguous because all useful ancestors were collapsed.

---

## 2.21 Breadcrumbs on small screens

Breadcrumbs MAY be simplified on mobile.

Mobile MAY show:

```text
← Projects
```

or:

```text
Projects / Current item
```

instead of the entire hierarchy.

The mobile treatment MUST preserve sufficient orientation and a route to the immediate parent.

A "back" link representing a stable parent route MUST NOT falsely imitate browser Back semantics when it actually navigates to a specific parent.

Use parent destination language where necessary:

```text
Back to projects
```

rather than a generic browser-like "Back."

---

## 2.22 Tabs purpose

Tabs represent multiple panels of closely related content where one panel is displayed at a time.

shadcn/ui `Tabs` is the canonical tab component baseline. citeturn971484search6

ARIA tabs use:

```text
tablist
tab
tabpanel
```

with specific selection and keyboard behavior. citeturn971484search0

Tabs MUST NOT be used merely because several links fit horizontally.

---

## 2.23 Tabs versus route navigation

Use **ARIA Tabs** when:

- content panels form one composite interface;
- changing selection primarily changes the visible panel;
- users reasonably perceive the content as one view; and
- tab keyboard behavior is appropriate.

Use **navigation links styled as local navigation** when:

- each destination is independently meaningful;
- each destination should behave like an ordinary page;
- normal link behavior is desired;
- opening in a new tab/window is useful;
- browser link context menus should apply; or
- each route has substantial independent hierarchy.

Route-backed tabs MAY still be appropriate, but the semantics MUST be deliberately chosen.

A collection of links MUST NOT be given `role="tab"` merely because it visually resembles tabs.

---

## 2.24 Deep-linkable tabs

Meaningful tab selection SHOULD be deep-linkable when:

- users share the selected view;
- reload should preserve the selected view;
- Back/Forward should traverse selections;
- content performs separate data retrieval; or
- the selected view materially changes the page's meaning.

Selection MAY be represented through:

```text
path segment
query parameter
fragment
```

according to the URL contract.

Purely transient presentation tabs MAY remain local state.

---

## 2.25 Tab activation

Tabs SHOULD use automatic activation on focus only when the associated panel can appear without noticeable latency.

Where tab selection triggers substantial network loading, manual activation SHOULD be considered so arrow-key traversal does not trigger multiple expensive navigations.

WAI specifically recommends automatic activation when panel display has no noticeable latency and notes that latency can significantly impair keyboard navigation. citeturn971484search0

---

## 2.26 Segmented controls

A segmented control represents a compact mutually exclusive choice.

Examples:

```text
List | Grid
Daily | Weekly | Monthly
Metric | Imperial
```

A segmented control generally changes:

- presentation;
- filter mode;
- sort mode;
- input value; or
- local view preference.

It SHOULD NOT use tab semantics unless it actually controls tab panels.

The appropriate primitive MAY be:

- Toggle Group;
- Radio Group;
- buttons with pressed state; or
- another canonical single-selection control.

The semantic choice MUST depend on the underlying value model, not visual appearance.

---

## 2.27 Tabs versus segmented controls

Use Tabs when the choices label content panels:

```text
Overview
Activity
Members
```

Use a segmented control when choices express a value or viewing mode:

```text
Table
Cards
```

A segmented control SHOULD NOT replace page-level navigation.

Tabs SHOULD NOT be used for binary field input such as:

```text
Enabled / Disabled
```

when Switch, Radio Group, or equivalent input semantics are correct.

---

## 2.28 Navigation menus

shadcn/ui `NavigationMenu` MAY be used for horizontally presented collections of navigation links, especially when top-level destinations expose structured groups of child links. The component is explicitly positioned as a collection of links for website navigation. citeturn971484search2

Navigation menus SHOULD be used sparingly in dense authenticated applications where a sidebar offers clearer persistent orientation.

Large flyout menus MUST:

- remain keyboard operable;
- dismiss predictably;
- not obscure required content without a close path;
- group child links meaningfully; and
- preserve normal link behavior.

---

## 2.29 Menubar semantics

ARIA `menubar` semantics SHOULD generally be reserved for interfaces that intentionally emulate desktop application menu behavior with the corresponding keyboard model.

Ordinary site navigation MUST NOT receive `menu`/`menubar` roles simply because it is visually presented as a menu.

WAI describes menu/menubar as composite widgets modeled on native application menus, with specialized focus and arrow-key behavior. citeturn257991search9

When the content is simply navigation links, semantic lists, links, disclosures, and `<nav>` landmarks SHOULD generally be preferred.

---

## 2.30 Command palette

A command palette is an accelerator for expert and frequent use.

It MAY provide:

```text
route navigation
resource search
recent destinations
actions
settings
keyboard shortcuts
```

It MUST NOT be the only way to discover core destinations.

Primary navigation MUST remain visible or otherwise conventionally discoverable.

---

## 2.31 Command component baseline

shadcn/ui `Command` and `CommandDialog` are the canonical primitive baseline for command-palette experiences. The current component exposes input, grouped results, empty state, items, separators, shortcuts, and dialog composition. citeturn971484search5turn971484search8

Command items MUST clearly distinguish:

```text
navigation
action
search result
```

when activating them produces materially different outcomes.

---

## 2.32 Command palette shortcut

A command palette MAY use a standard shortcut such as:

```text
⌘K
Ctrl+K
```

The shortcut SHOULD be visible near the search/command trigger where helpful.

Keyboard shortcuts MUST NOT conflict with critical browser, operating-system, or assistive-technology shortcuts.

There MUST always be a pointer/touch-accessible method to open the palette.

---

## 2.33 Command palette routing

Selecting a navigation result SHOULD navigate to its canonical route.

Selecting a navigation item MUST NOT create a second parallel navigation state that cannot be reproduced through the URL.

Recent destinations SHOULD refer to stable route identities rather than cached screen objects.

Permission changes MUST remove inaccessible command results.

---

## 2.34 Search versus command palette

Global search and command palettes MAY share presentation but SHOULD retain conceptual clarity.

Search answers:

```text
What content/resource am I looking for?
```

Commands answer:

```text
What do I want the application to do?
```

A combined palette SHOULD visually group:

```text
Pages
Records
Commands
```

or equivalent categories.

Search results MUST NOT be indistinguishable from destructive commands.

---

## 2.35 Global search placement

Global search SHOULD occupy a stable product-level location such as:

- top bar;
- prominent sidebar header; or
- persistent command/search trigger.

Global search MUST indicate when it searches across the complete permitted product scope.

A global search field SHOULD NOT visually appear inside a local resource panel where users may infer the wrong scope.

---

## 2.36 Scoped search placement

Scoped search SHOULD be placed close to the collection it filters.

Examples:

```text
Customers
[Search customers]
```

or:

```text
Audit log
[Search this log]
```

The label or placeholder SHOULD identify scope where ambiguity exists.

Preferred:

```text
Search customers
```

Avoid:

```text
Search…
```

when several search scopes are visible.

---

## 2.37 Search is an additional navigation method

Search SHOULD supplement hierarchical navigation.

Search MUST NOT be used as an excuse to create an incoherent IA.

For sets of pages, users should generally have more than one method for locating content, except when the page is part of a required process. WCAG 2.2 formalizes this principle through its Multiple Ways criterion. citeturn802046search9

---

## 2.38 Canonical route contract

Every navigable resource or meaningful application state MUST have a defined route contract.

A route contract SHOULD specify:

```text
route pattern
resource identity
required parameters
optional parameters
query-state schema
authorization requirement
canonicalization rules
redirect behavior
page title
breadcrumb mapping
deep-link behavior
```

Routes are application contracts.

They MUST NOT be casually changed as a visual refactor.

---

## 2.39 Deep linking

A deep link MUST load the intended state without requiring the user to first navigate through the application manually.

A valid deep-linked route MUST:

- survive reload;
- load the correct tenant/resource context;
- reconstruct relevant URL-owned state;
- apply authorization;
- show appropriate loading/error states; and
- render sufficient orientation.

The application MUST NOT require previous in-memory navigation state to interpret a valid canonical URL.

---

## 2.40 Route identity

Resource identity SHOULD use stable identifiers.

A route MAY use:

```text
/projects/01J8...
```

or:

```text
/projects/atlas-migration
```

provided identity remains deterministic.

Display names MUST NOT be used as permanent route identity when they can freely change unless the application has explicit redirect/canonicalization support.

Stable opaque IDs MAY coexist with readable slugs:

```text
/projects/01J8.../atlas-migration
```

where product requirements justify the complexity.

---

## 2.41 URLs as state contracts

Meaningful user-controlled state SHOULD be encoded in the URL when users reasonably expect it to survive:

- reload;
- sharing;
- bookmarking; or
- Back/Forward traversal.

Typical URL-owned state includes:

```text
search query
active filters
sort
page/cursor
selected resource
meaningful subview
date range
report configuration
```

Purely transient presentation state SHOULD normally remain outside the URL.

Examples:

```text
tooltip open
hover state
temporary animation
sidebar hover
focused control
```

---

## 2.42 Path versus query parameters

Path segments SHOULD represent resource hierarchy or primary route identity.

Example:

```text
/customers/123/invoices/456
```

Query parameters SHOULD represent optional view/query state.

Example:

```text
/invoices?status=overdue&sort=due-date
```

This is not an absolute technical restriction, but the product SHOULD apply one consistent mental model.

A filter MUST NOT randomly move between route segment and query parameter across similar features.

---

## 2.43 Fragments

URL fragments SHOULD identify locations or subresources within the current document when appropriate.

Example:

```text
/settings/security#sessions
```

Fragments MAY also be used for local selected state when that behavior matches normal browser semantics.

Fragment identifiers SHOULD be stable.

A heading's deep-link fragment SHOULD NOT depend on a translated display string when localization would break existing links unless redirect/canonicalization behavior is provided.

---

## 2.44 URL normalization

Equivalent application state SHOULD normally resolve to one canonical URL.

Normalization MAY include:

```text
trailing slash policy
parameter ordering
default parameter removal
case policy
legacy redirect
slug canonicalization
```

Normalization SHOULD use replacement rather than creating unnecessary history entries.

A redirect MUST preserve intended resource identity and security context.

---

## 2.45 URL safety

Sensitive values MUST NOT be placed in URLs unless the Security standard explicitly permits them.

URLs SHOULD be assumed capable of appearing in:

- browser history;
- logs;
- analytics;
- referrer metadata;
- screenshots;
- shared links; and
- monitoring tools.

URLs MUST NOT contain:

```text
passwords
access tokens
session secrets
private encryption material
```

Sensitive PII SHOULD also be avoided where stable opaque identifiers can be used.

---

## 2.46 Navigation is not authorization

Hiding a navigation item MUST NOT be treated as access control.

Every protected route MUST enforce authorization independently.

A user manually entering a protected URL MUST receive the correct secure authorization result.

Navigation MAY remove destinations the current principal cannot access, but server/API authorization MUST remain authoritative.

---

## 2.47 Unauthorized routes

An unauthorized deep link MUST follow the Security standard.

Depending on disclosure policy, the route MAY produce:

```text
403 / no-access state
404 / existence-hiding state
authentication redirect
```

The navigation shell MUST NOT reveal protected resource names, breadcrumb labels, counts, or other metadata before authorization allows disclosure.

---

## 2.48 Tenant-aware routes

Multi-tenant products MUST make tenant context deterministic.

Tenant context MAY be represented through:

```text
subdomain
path segment
authenticated workspace context
```

but the architecture MUST define one authoritative mechanism.

A user-provided tenant path segment MUST NOT override authenticated authorization.

Changing tenant/workspace MUST invalidate or re-scope:

- navigation;
- cached data;
- search;
- command results;
- breadcrumbs;
- recent destinations; and
- resource links

where applicable.

---

## 2.49 Browser history semantics

The browser Back and Forward controls are first-class navigation mechanisms.

The application MUST preserve their expected meaning.

A meaningful user navigation SHOULD normally create a history entry.

MDN documents `pushState()` as adding an entry to the session history and `replaceState()` as modifying the current entry. citeturn257991search10turn939653search2

Client-side routing MUST NOT make Back behave like:

```text
Go to app home
```

unless app home truly is the previous history entry.

---

## 2.50 Push versus replace

Use **push** semantics when a user intentionally moves to a meaningfully distinct navigable state.

Examples:

```text
opening another resource
committing a search
changing a meaningful subview
moving to another page of results
```

Use **replace** semantics when modifying the current entry without creating a useful Back destination.

Examples:

```text
canonicalizing a URL
removing default parameters
correcting invalid view state
synchronizing high-frequency transient URL state
```

Every keystroke in a search input SHOULD NOT ordinarily create a new history entry.

A committed search MAY create one.

---

## 2.51 Back/Forward restoration

Back and Forward traversal MUST reconstruct the historical navigable state represented by that entry.

This MAY include:

- route;
- filters;
- sort;
- pagination;
- selected view;
- scroll position; and
- relevant ephemeral history state.

The browser emits history traversal events for active history-entry changes; client routers MUST correctly restore matching application state rather than treating Back as a fresh arbitrary navigation. citeturn939653search0turn939653search5

---

## 2.52 Duplicate history entries

The application SHOULD avoid adding duplicate adjacent history entries for equivalent state.

Examples to avoid:

```text
/projects
/projects
/projects
```

caused by repeated clicking of an already-active destination.

Clicking the current navigation item MAY scroll to top or do nothing according to product convention, but SHOULD NOT repeatedly pollute history.

---

## 2.53 Overlay history

Dialogs, sheets, and drawers MAY participate in URL/history state when they represent meaningful deep-linkable content.

Examples:

```text
/customer list
→ customer detail sheet
```

may use a route such as:

```text
/customers/123
```

while rendering the detail as an overlay on large screens.

In that case:

- the URL MUST open the same resource directly;
- Back SHOULD close/leave the overlay by returning to the previous route;
- reload MUST reconstruct a valid experience; and
- mobile MAY render the same route as a full page.

Transient utility popovers SHOULD NOT normally create history entries.

---

## 2.54 Scroll restoration

Back navigation SHOULD restore prior scroll position where this matches browser/user expectations.

Examples:

```text
long list
→ detail
→ Back
```

SHOULD ordinarily return the user to the previous list position.

New forward navigation to a distinct page SHOULD normally position users at the beginning of the new primary content unless:

- a fragment identifies another location;
- stored history restoration applies; or
- the pattern defines another meaningful position.

---

## 2.55 Focus after navigation

Client-side route changes MUST manage focus deliberately.

After a full page-like SPA navigation, focus SHOULD normally move to an appropriate beginning-of-content target, such as:

- main heading; or
- main content region.

It MUST NOT remain invisibly attached to a navigation link whose contextual meaning no longer matches the displayed view when this impairs operation.

WAI's SPA navigation example demonstrates moving focus to the newly loaded page heading after link-triggered content navigation. citeturn257991search8

Back/Forward restoration MAY restore previous focus where the interaction model supports it.

---

## 2.56 Page title after navigation

Every navigable route MUST have a meaningful document title.

The title SHOULD update when client-side navigation changes the page.

A canonical format MAY be:

```text
Project Settings – Atlas – Product Name
```

The most specific page identity SHOULD normally appear first.

Generic titles such as:

```text
Dashboard
Application
Untitled
```

SHOULD NOT persist across unrelated routes.

---

## 2.57 Main heading

Every primary page view SHOULD contain one clear level-one heading or equivalent primary heading structure.

The page title, active navigation destination, and heading SHOULD use consistent terminology.

Avoid:

```text
Sidebar: Customers
Page title: Accounts
Heading: Organizations
```

when all three refer to the same concept.

---

## 2.58 Orientation cues

Users MUST have sufficient cues to understand their current location.

Depending on layout, cues SHOULD include a suitable combination of:

```text
active primary navigation
active secondary navigation
breadcrumb
page heading
active tab/subview
tenant/workspace identity
URL
document title
```

No single cue is required in every layout.

The complete experience MUST provide clear orientation.

---

## 2.59 Current-location semantics

Current-page and current-step indicators SHOULD use appropriate programmatic semantics.

Typical navigation links use:

```text
aria-current="page"
```

Workflow steps MAY use:

```text
aria-current="step"
```

Current state MUST NOT rely solely on:

- color;
- underline;
- icon fill; or
- font weight.

---

## 2.60 Multiple navigation landmarks

Pages MAY contain several `<nav>` landmarks.

When more than one exists, each SHOULD have a useful accessible label.

Examples:

```text
Primary
Breadcrumb
Project settings
Pagination
```

Avoid several indistinguishable landmarks all announced merely as:

```text
Navigation
```

---

## 2.61 Skip navigation

Applications with repeated navigation blocks MUST provide an efficient method to bypass them.

A visible-on-focus **Skip to main content** link is the canonical baseline.

WCAG 2.2 requires a mechanism to bypass repeated content, and W3C specifically identifies skip links and landmarks as sufficient techniques. citeturn802046search3turn802046search10

The skip link MUST move keyboard focus to the main content target, not merely scroll visually.

---

## 2.62 Focus order

Navigation focus order MUST preserve meaning and operation.

Visual CSS reordering MUST NOT cause keyboard focus to jump unpredictably relative to what users see.

WCAG requires sequential focus to preserve meaning and operability. citeturn802046search0

On responsive layouts, DOM order SHOULD support both mobile and desktop presentation without requiring inaccessible focus-order hacks.

---

## 2.63 Keyboard access

All navigation must be keyboard operable.

Ordinary links SHOULD remain in normal Tab sequence.

Custom navigation components MUST implement the expected keyboard model for their semantic pattern.

Teams MUST NOT add custom arrow-key behavior to ordinary navigation links merely to mimic desktop menus unless the component uses a documented composite-widget pattern.

---

## 2.64 Navigation link labels

Link labels MUST make their destination sufficiently clear in context.

Avoid:

```text
Click here
More
Go
Open
```

when the target cannot be understood.

Preferred:

```text
View invoice
Billing settings
Open audit log
```

Icon-only navigation MUST provide equivalent accessible labels.

---

## 2.65 External navigation

External destinations SHOULD remain ordinary links.

Opening a destination in a new tab/window SHOULD be reserved for cases where that behavior is genuinely useful.

When opening a new context is likely to surprise users, the interface SHOULD communicate it.

Security-sensitive external redirects MUST follow redirect-validation rules.

---

## 2.66 Mobile navigation

Mobile navigation MUST preserve the desktop IA even when presentation changes.

A desktop sidebar MAY become:

- off-canvas navigation;
- Sheet;
- compact top navigation;
- bottom navigation for a constrained primary set; or
- another responsive pattern.

The hierarchy MUST NOT become materially different merely because viewport width changes.

---

## 2.67 Mobile sidebar baseline

shadcn/ui `Sidebar` supports an off-canvas mobile mode, and `Sheet` is the canonical complementary primitive for edge-mounted modal content. citeturn971484search1turn971484search4

A mobile navigation sheet MUST:

- have a clear accessible name;
- trap focus only while modal;
- close through an explicit control;
- restore focus to its trigger;
- close after successful navigation where appropriate; and
- preserve selected/current destination state.

---

## 2.68 Mobile menu trigger

The mobile navigation trigger MUST use a button.

It MUST have an accessible name such as:

```text
Open navigation
```

Its expanded/modal state MUST be communicated by the underlying accessible component behavior.

A standalone hamburger icon with no accessible name is prohibited.

---

## 2.69 Bottom navigation

Bottom navigation MAY be used on small screens for a small number of high-frequency primary destinations.

It SHOULD normally contain a tightly constrained set, commonly around:

```text
3–5 destinations
```

with visible labels.

Bottom navigation MUST NOT attempt to reproduce a large desktop sidebar.

Lower-frequency destinations SHOULD remain available through another navigation surface.

Icon-only bottom navigation SHOULD NOT be used where labels materially improve comprehension.

---

## 2.70 Mobile back controls

A native/browser Back mechanism MUST remain functional.

An in-app Back button MAY be added when the product context benefits from it.

An application Back control MUST distinguish whether it means:

```text
history back
```

or:

```text
go to known parent
```

These are not interchangeable.

If the action always navigates to a known parent, its label SHOULD indicate that destination.

---

## 2.71 Responsive navigation state

Opening mobile navigation SHOULD NOT change the canonical route.

Closing navigation SHOULD NOT lose route state.

Desktop sidebar collapse and mobile drawer open/closed state SHOULD generally remain presentation state.

A viewport change MUST NOT unexpectedly navigate the user.

---

## 2.72 Search on mobile

Global search SHOULD remain reasonably accessible on mobile.

It MAY become:

- a prominent icon/button;
- command/search Sheet;
- dedicated search route; or
- top-bar input.

The mobile pattern MUST clearly communicate search scope.

Desktop-only keyboard shortcuts MUST NOT be the sole discoverability mechanism.

---

## 2.73 Wayfinding during loading

Navigation shell SHOULD remain stable during page-level data loading.

Changing routes SHOULD NOT cause:

- sidebar disappearance;
- primary navigation reflow;
- active-state flicker; or
- complete loss of orientation

unless the shell itself depends on data not yet available.

The active destination SHOULD update consistently with route transition policy.

---

## 2.74 Navigation loading state

Navigation interactions SHOULD provide feedback when route resolution is noticeably delayed.

Suitable feedback includes:

- page-region Skeleton;
- progress indicator;
- local pending state; or
- subtle route loading indicator.

Navigation links SHOULD NOT all become disabled during ordinary page loading.

Users MUST retain escape/navigation paths unless interaction is unsafe.

---

## 2.75 Navigation failures

A failed route-level data request MUST follow the States Catalogue.

The application shell SHOULD remain usable when safe.

A page-level failure MUST NOT automatically erase global navigation.

An invalid deep link SHOULD produce the appropriate:

```text
not found
no access
expired
error
```

state rather than silently redirecting users to the home page.

Silent fallback to home destroys orientation and hides broken links.

---

## 2.76 Not-found routes

Unknown routes SHOULD render a clear Not Found state.

The state SHOULD provide recovery such as:

```text
Go to dashboard
Go to parent section
Search
```

depending on context.

The browser URL SHOULD normally remain the invalid URL while the Not Found state is displayed so users can diagnose or copy the failing link.

---

## 2.77 Redirects

Redirects SHOULD be used for:

- canonicalization;
- moved resources;
- renamed routes;
- authentication entry;
- approved post-action transitions; or
- legacy compatibility.

Redirect loops are release-blocking defects.

A redirect MUST NOT erase query parameters that remain semantically required unless the route contract intentionally discards them.

---

## 2.78 Post-authentication navigation

After authentication, users SHOULD return to the originally intended permitted destination where safe.

A post-login redirect target MUST be validated to prevent open redirects.

Authentication flow MUST NOT blindly accept arbitrary external `returnUrl` values.

If the original resource is no longer permitted, the application MUST render the appropriate authorization state or safe destination.

---

## 2.79 Unsaved changes

Navigation away from an edit surface MAY require confirmation when unsaved user work would genuinely be lost.

The warning MUST NOT appear merely because a form was focused or touched.

The product SHOULD track meaningful dirty state.

Confirmation MUST cover:

- internal links;
- browser Back/Forward;
- reload/close where browser capabilities allow; and
- route changes from command/search navigation

where relevant.

---

## 2.80 Unsaved-change dialogs

An unsaved-change confirmation SHOULD use the canonical Dialog/AlertDialog pattern.

Copy SHOULD identify the consequence:

```text
Leave without saving?

Your unsaved changes will be lost.

[Keep editing]
[Leave without saving]
```

The confirmation MUST NOT trap users permanently.

Safe autosaved work SHOULD NOT trigger unnecessary leave warnings.

---

## 2.81 Multi-step flows

Required process steps MAY use a dedicated stepper/wizard navigation model rather than global page navigation.

Steps MUST reflect actual process sequence.

Future unavailable steps SHOULD NOT appear interactive.

Completed steps MAY be revisitable where business rules allow.

Browser Back SHOULD behave predictably and MUST NOT corrupt submitted state.

Wizard steps that users should bookmark/share SHOULD have route representation.

---

## 2.82 Pagination navigation

Pagination is navigation within a collection.

Meaningful page/cursor state SHOULD be deep-linkable where feasible.

Back from an item detail SHOULD restore the relevant collection position and query state.

Pagination controls MUST have accessible names and current-page semantics.

---

## 2.83 Filters and navigation

Applying filters SHOULD update the URL when filter state is meaningful to sharing, reload, or Back/Forward.

Rapid filter manipulation MAY use replacement while editing and push on commitment, depending on pattern.

Clearing filters MUST return to a canonical unfiltered state.

Filter URLs MUST NOT leak sensitive values.

---

## 2.84 Sort state

User-selected sort SHOULD usually be URL-owned for list/report pages where it changes the result order materially.

Default sort MAY be omitted from the canonical URL.

Sort labels in URLs SHOULD use stable machine values:

```text
sort=created-desc
```

rather than localized labels.

---

## 2.85 Navigation state ownership

The router/URL MUST be the source of truth for route-owned state.

Feature-local state MUST NOT duplicate route identity and drift from the URL.

Example anti-state:

```text
URL says /customers
local state says activeSection = "reports"
```

Active navigation, breadcrumbs, page title, and route-level tabs SHOULD derive from the same canonical route state.

---

## 2.86 Query-state validation

URL parameters MUST be validated like other untrusted input.

Invalid:

- filters;
- sort values;
- page numbers;
- tab IDs;
- date ranges; and
- resource parameters

MUST be handled deterministically.

The application MAY:

- reject;
- normalize;
- replace with default; or
- show validation/not-found state

according to the route contract.

It MUST NOT crash or enter undefined navigation state.

---

## 2.87 Route versioning

Public or externally shared URL contracts SHOULD be treated as durable interfaces.

Breaking route changes SHOULD provide redirects where practical.

Internal refactoring MUST NOT casually invalidate bookmarks, documentation, notifications, or shared links.

Routes exposed in emails or external systems require especially strong stability.

---

## 2.88 Localization

Navigation labels MUST use the localization system.

Layouts SHOULD support text expansion.

Fixed widths MUST NOT cause translated navigation labels to truncate essential meaning.

Truncation MAY be used where necessary, but full labels SHOULD remain accessible.

Machine route keys SHOULD generally remain locale-independent unless localized URLs are an explicit product strategy.

---

## 2.89 RTL

Navigation layouts MUST support the application's RTL strategy.

Relevant presentation MAY mirror:

- sidebar edge;
- directional chevrons;
- breadcrumb separators;
- drawer direction;
- disclosure icons; and
- horizontal navigation order

according to the design system.

Semantic hierarchy MUST remain unchanged.

Directional icons MUST be tested rather than assuming all icons should mirror.

---

## 2.90 Icons

Navigation icons SHOULD represent stable, recognizable concepts.

Icons MUST NOT replace text labels where the icon meaning is non-obvious.

The same destination SHOULD use the same icon across contexts when possible.

A single icon MUST NOT represent multiple unrelated destinations.

Decorative icons SHOULD be hidden from assistive technology when the adjacent text already supplies the accessible name.

---

## 2.91 Badges and counts

Navigation items MAY show counts or status badges.

Examples:

```text
Inbox 12
Approvals 3
```

Counts SHOULD represent useful current information.

Badge content MUST NOT make the accessible name confusing.

Rapidly changing counts SHOULD NOT cause excessive screen-reader announcements.

A badge MUST NOT be the only cue that a destination requires attention if the status is critical.

---

## 2.92 Notification navigation

Selecting a notification SHOULD navigate to the most specific valid destination associated with the notification.

If that resource was deleted or access was revoked, the destination MUST produce an appropriate current state rather than exposing stale protected information.

Notification URLs SHOULD use canonical routes.

---

## 2.93 Recent and favourite destinations

Products MAY provide favourites or recent pages.

These are navigation accelerators.

They MUST NOT change canonical resource hierarchy.

Deleted/inaccessible resources MUST be removed or rendered safely.

Recent-navigation data MAY be user-private and MUST comply with Privacy requirements.

---

## 2.94 Current tenant/workspace orientation

Multi-tenant products MUST make the active tenant/workspace sufficiently visible when actions could affect different organizations.

A workspace switcher SHOULD not be visually indistinguishable from ordinary navigation.

Switching context SHOULD provide a clear post-switch orientation cue.

The active context SHOULD also be represented in accessible text.

---

## 2.95 Destructive navigation adjacent to normal navigation

Destructive actions such as:

```text
Delete workspace
Leave organization
Sign out everywhere
```

MUST NOT be styled or positioned as ordinary navigation links when doing so creates accidental activation risk.

Destructive actions belong to appropriate action/dialog patterns.

---

## 2.96 Header and navigation landmarks

Application shell regions SHOULD use semantic landmarks:

```text
header
nav
main
aside
footer
```

where appropriate.

Landmarks SHOULD correspond to meaningful page regions rather than decorative containers.

Only one primary `<main>` landmark SHOULD represent the main content of a page.

---

## 2.97 Main content target

The main content container SHOULD have a stable target for:

- skip navigation;
- focus after route navigation; and
- semantic landmark navigation.

The target SHOULD NOT be destroyed and recreated unnecessarily in ways that break focus restoration.

---

## 2.98 Visual active state

Canonical active navigation styling MUST use Design Tokens.

Features MUST NOT introduce arbitrary one-off active colors.

The design system SHOULD define:

```text
nav default
nav hover
nav active
nav focus
nav disabled
nav parent-expanded
```

states.

Active styling MUST satisfy contrast and non-color requirements.

---

## 2.99 Hover state

Hover MUST NOT be required to discover essential navigation.

Hover-driven flyouts MUST also be operable by keyboard and touch.

Hovering across large menu systems SHOULD NOT cause unstable menus that disappear while users move the pointer toward child items.

---

## 2.100 Focus-visible state

Every keyboard-focusable navigation element MUST have a visible focus indicator that conforms to the Accessibility and Design Token standards.

Focus styling MUST remain visible on:

- active items;
- dark sidebars;
- selected tabs;
- icon-only controls; and
- mobile navigation surfaces.

Active state MUST NOT visually erase focus state.

---

## 2.101 Navigation overlays

Navigation overlays such as mobile Sheets, command dialogs, or large navigation panels MUST use the appropriate modal/non-modal primitive.

A modal navigation surface MUST:

- trap focus while open;
- provide a close action;
- respond to Escape where appropriate;
- restore focus to its trigger; and
- prevent interaction with obscured content.

A non-modal navigation surface MUST NOT apply modal focus trapping.

---

## 2.102 Search result navigation

Search result links MUST use canonical resource routes.

Search MUST NOT create alternate inaccessible pseudo-routes that only function from search state.

Opening a result in a new tab SHOULD work where normal link semantics apply.

Search results SHOULD indicate resource type when identical names could be ambiguous.

---

## 2.103 Keyboard shortcut hints

Shortcut labels such as:

```text
⌘K
Ctrl+K
```

MAY be displayed through `kbd` styling or canonical shortcut presentation.

Shortcuts are supplementary.

They MUST NOT replace an accessible text label.

---

## 2.104 Analytics

Navigation analytics MAY measure:

```text
destination selection
search navigation
command-palette navigation
breadcrumb use
mobile navigation usage
not-found routes
redirects
abandoned flows
```

Analytics MUST NOT alter navigation ordering automatically without deliberate product design.

Route analytics MUST follow Privacy requirements.

Sensitive query parameters MUST be redacted from telemetry.

---

## 2.105 Navigation observability

Applications SHOULD monitor:

```text
404 rate
403 route attempts
redirect loops
route load failures
deep-link failure rate
broken breadcrumb targets
client-routing exceptions
route transition latency
```

A rising not-found rate after deployment SHOULD be treated as a possible broken URL-contract regression.

---

## 2.106 shadcn/ui baseline

The canonical component mapping is:

| Navigation need | shadcn/ui baseline |
|---|---|
| Desktop application navigation | `Sidebar` |
| Top-level link collections | `NavigationMenu` |
| Hierarchy/location | `Breadcrumb` |
| Content panels | `Tabs` |
| Mobile/off-canvas navigation | `Sidebar` off-canvas or `Sheet` |
| Command palette | `Command`, `CommandDialog` |
| Account/action menu | `DropdownMenu` |
| Expand/collapse navigation | `Collapsible` / disclosure composition |
| Supplemental popup navigation | `Popover` |
| Icon-label assistance | `Tooltip` |
| Long navigation region | `ScrollArea` |
| Group separation | `Separator` |
| Unsaved-change confirmation | `AlertDialog` |
| Navigation trigger/action | `Button` |
| Destination | semantic Link / framework link |

shadcn/ui currently provides dedicated Sidebar, Navigation Menu, Breadcrumb, Tabs, Command, and Sheet primitives suitable for these compositions. citeturn971484search1turn971484search2turn971484search3turn971484search5turn971484search6turn971484search4

---

## 2.107 Required navigation test catalogue

Reusable application shells and navigation systems SHOULD include test scenarios for:

```text
primary route active
nested secondary route
deep resource
breadcrumb overflow
collapsed sidebar
expanded sidebar
mobile navigation
command palette
global search
route loading
route error
not found
no permission
tenant switch
unsaved changes
browser back
browser forward
query-filter restoration
scroll restoration
keyboard-only navigation
screen-reader landmarks
RTL
long translated labels
```

Route-driven tabs SHOULD additionally test:

```text
direct deep link
reload
Back
Forward
invalid tab
loading panel
```

---

# 3. Anti-patterns

## 3.1 Sidebar-driven information architecture

**Anti-pattern:** Teams add every new feature as another sidebar item.

**Rule:** Navigation MUST reflect the information architecture, not replace IA design.

---

## 3.2 Flat list of everything

**Anti-pattern:** Twenty-five unrelated destinations appear at one hierarchy level.

**Rule:** Primary navigation SHOULD represent major stable areas and use meaningful grouping or secondary structure.

---

## 3.3 Navigation based on backend architecture

**Anti-pattern:**

```text
Identity Service
Records API
Reports Worker
Blob Storage
```

**Rule:** User navigation MUST reflect user concepts unless infrastructure itself is the product domain.

---

## 3.4 Buttons used for navigation

**Anti-pattern:** Every route destination is rendered as a JavaScript button.

**Rule:** Navigable destinations SHOULD preserve link semantics.

---

## 3.5 Links used for actions

**Anti-pattern:** `<a href="#">Delete</a>` performs destructive mutation.

**Rule:** Actions MUST use appropriate button/action semantics.

---

## 3.6 Hidden active route state

**Anti-pattern:** Sidebar state is maintained separately from the router and highlights the wrong item.

**Rule:** Route state MUST drive navigation state.

---

## 3.7 Color-only current state

**Anti-pattern:** Current navigation differs only through a blue text color.

**Rule:** Current location MUST have additional visual/programmatic indication.

---

## 3.8 Icon-only primary navigation by default

**Anti-pattern:** Users must memorize eight abstract sidebar icons.

**Rule:** Primary navigation SHOULD expose text labels unless strong evidence supports an expert compact mode.

---

## 3.9 Breadcrumb as browser history

**Anti-pattern:**

```text
Home / Search / Invoice / Customer / Invoice
```

reflects pages the user visited.

**Rule:** Breadcrumbs represent hierarchy.

---

## 3.10 Breadcrumb generated directly from URL segments

**Anti-pattern:** Internal IDs and routing implementation appear as breadcrumb labels.

**Rule:** Breadcrumbs MUST map routes to user-meaningful hierarchy.

---

## 3.11 Generic Back pretending to be parent navigation

**Anti-pattern:** "Back" always navigates to `/projects`, regardless of actual history.

**Rule:** Use history semantics for Back or label stable parent navigation explicitly.

---

## 3.12 Tabs used for page navigation without semantic decision

**Anti-pattern:** Five ordinary links receive `role="tab"` because the design has an underline.

**Rule:** ARIA tabs MUST only be used when tab-panel semantics and keyboard interaction are appropriate.

---

## 3.13 Segmented controls used as site navigation

**Anti-pattern:** Main product destinations are presented as a toggle group.

**Rule:** Value-selection widgets MUST NOT replace semantic navigation.

---

## 3.14 ARIA menubar everywhere

**Anti-pattern:** Ordinary website navigation receives `role="menubar"` and specialized arrow-key behavior.

**Rule:** Menubar semantics SHOULD be limited to deliberate application-menu patterns.

---

## 3.15 Command palette as sole IA

**Anti-pattern:** Core destinations are absent from visible navigation because "users can press ⌘K."

**Rule:** Command palettes are accelerators, not substitutes for visible IA.

---

## 3.16 Search as sole discoverability

**Anti-pattern:** Users must know what to search because there is no coherent navigation hierarchy.

**Rule:** Search supplements navigation.

---

## 3.17 Search scope ambiguity

**Anti-pattern:** Three inputs all say:

```text
Search…
```

without clarifying scope.

**Rule:** Scoped search MUST be identifiable.

---

## 3.18 Non-deep-linkable meaningful state

**Anti-pattern:** A complex report is configured entirely in local state and cannot be refreshed, bookmarked, or shared.

**Rule:** Meaningful shareable navigable state SHOULD be encoded in the URL.

---

## 3.19 URL containing ephemeral visual state

**Anti-pattern:**

```text
?tooltip=open&sidebar=hovered
```

**Rule:** Transient presentation state SHOULD remain local unless it has deliberate navigational meaning.

---

## 3.20 URL containing secrets

**Anti-pattern:**

```text
?access_token=...
?password=...
```

**Rule:** Secrets MUST NOT be placed in navigable URLs.

---

## 3.21 Client-side authorization by hidden link

**Anti-pattern:** User cannot see Admin in the sidebar, so `/admin` is assumed protected.

**Rule:** Routes and APIs MUST independently enforce authorization.

---

## 3.22 Protected metadata in breadcrumbs

**Anti-pattern:** Unauthorized resource title appears before a 403 state.

**Rule:** Navigation metadata MUST obey disclosure policy.

---

## 3.23 Home redirect on every error

**Anti-pattern:** Unknown, forbidden, or broken routes silently send users to dashboard.

**Rule:** Preserve the failing route and present the appropriate state unless a redirect has explicit product semantics.

---

## 3.24 Every state change pushes history

**Anti-pattern:** Typing five letters into search creates five Back entries.

**Rule:** History entries MUST correspond to useful navigational states.

---

## 3.25 Everything uses replaceState

**Anti-pattern:** Meaningful route changes never enter history.

**Rule:** User navigation SHOULD create appropriate history entries.

---

## 3.26 Back button overridden

**Anti-pattern:** Browser Back is intercepted and always sends users to a product-defined parent.

**Rule:** Browser session history MUST retain expected semantics.

---

## 3.27 Back loses list state

**Anti-pattern:** Opening a record and returning resets filters, pagination, and scroll to the beginning.

**Rule:** Meaningful historical collection state SHOULD restore.

---

## 3.28 Route changes without title update

**Anti-pattern:** Every SPA page remains titled "Application."

**Rule:** Navigable views MUST update document identity.

---

## 3.29 Route changes without focus management

**Anti-pattern:** Content changes but keyboard/screen-reader focus remains in stale navigation context.

**Rule:** SPA navigation MUST establish logical post-navigation focus.

---

## 3.30 Mobile IA differs from desktop

**Anti-pattern:** Important desktop sections disappear on mobile instead of moving to a responsive navigation surface.

**Rule:** Presentation MAY change; conceptual IA MUST remain available.

---

## 3.31 Hamburger without label

**Anti-pattern:** An unlabeled icon button opens mobile navigation.

**Rule:** Navigation triggers MUST have accessible names.

---

## 3.32 Bottom nav with ten items

**Anti-pattern:** Entire desktop sidebar is compressed into horizontal bottom navigation.

**Rule:** Bottom navigation MUST remain a constrained primary set.

---

## 3.33 Hover-dependent navigation

**Anti-pattern:** Child destinations can only be accessed by precise pointer hover.

**Rule:** Navigation MUST be keyboard- and touch-operable.

---

## 3.34 Tooltip as primary label

**Anti-pattern:** Icon navigation is only understandable by mouse hover.

**Rule:** Accessible names are mandatory; visible labels SHOULD remain available where understanding requires them.

---

## 3.35 Inconsistent navigation ordering

**Anti-pattern:** Billing appears second on one page and seventh on another because navigation was dynamically reordered.

**Rule:** Repeated navigation MUST remain consistently ordered unless user customization explains the change.

---

## 3.36 Destructive action inside destination list

**Anti-pattern:** "Delete workspace" appears among normal workspace links.

**Rule:** Destructive actions MUST use action semantics and appropriate separation.

---

## 3.37 Raw IDs as user-facing route labels

**Anti-pattern:**

```text
Customers / c_8108afd3
```

**Rule:** Orientation UI SHOULD use meaningful resource labels when authorized.

---

## 3.38 Modal navigation without restoration

**Anti-pattern:** Closing mobile navigation leaves focus at the top of the document.

**Rule:** Modal navigation MUST return focus predictably.

---

## 3.39 Recreating shell on every route

**Anti-pattern:** Sidebar/top bar unmount and flash during every child navigation.

**Rule:** Stable application chrome SHOULD remain mounted across child route changes where architecture permits.

---

## 3.40 Navigation analytics driving silent personalization

**Anti-pattern:** Frequently used items silently reorder for each user.

**Rule:** Navigation predictability takes priority unless users explicitly control personalization.

---

# 4. Checklist

## 4.1 Information architecture

- [ ] Product areas are defined independently of visual navigation.
- [ ] Primary destinations correspond to user mental models.
- [ ] Secondary navigation has a clear parent.
- [ ] Backend architecture does not leak into IA unnecessarily.
- [ ] Navigation depth is justified.
- [ ] Route hierarchy and resource hierarchy are documented.
- [ ] Search is supplemental rather than compensating for weak IA.

## 4.2 Primary navigation

- [ ] Major destinations are stable.
- [ ] Repeated navigation order is consistent.
- [ ] Current destination is visually and programmatically identified.
- [ ] Core destinations remain discoverable without shortcuts.
- [ ] Permission-based removal does not replace authorization.
- [ ] Navigation labels are concise and meaningful.
- [ ] Icons supplement rather than replace unclear labels.

## 4.3 Sidebar

- [ ] shadcn/ui Sidebar or canonical wrapper is used.
- [ ] Header/content/footer roles are coherent.
- [ ] Long navigation scrolls safely.
- [ ] Active state derives from route.
- [ ] Collapse retains accessible labels.
- [ ] Collapse state does not remove destinations.
- [ ] User collapse preference is scoped appropriately.
- [ ] Nested groups use correct disclosure semantics.

## 4.4 Top bar and page header

- [ ] Global utilities are separated from page actions.
- [ ] Top-bar placement is stable across routes.
- [ ] Page heading clearly identifies the view.
- [ ] Page title and navigation terminology agree.
- [ ] Tenant/workspace context is visible where consequential.
- [ ] Mobile trigger is accessible.

## 4.5 Breadcrumbs

- [ ] Breadcrumbs represent hierarchy, not history.
- [ ] Breadcrumb nav has an accessible label.
- [ ] Current page is marked appropriately.
- [ ] Labels are user-meaningful.
- [ ] Internal IDs are not leaked as labels unnecessarily.
- [ ] Overflow behavior preserves useful ancestors.
- [ ] Mobile breadcrumb treatment preserves orientation.
- [ ] Breadcrumb links resolve to valid canonical routes.

## 4.6 Tabs and segmented controls

- [ ] Tabs are only used for true panel semantics.
- [ ] Route navigation is not mislabeled as ARIA tabs without reason.
- [ ] Tab keyboard behavior matches WAI expectations.
- [ ] Automatic activation is only used when latency permits.
- [ ] Meaningful selected views are deep-linkable.
- [ ] Segmented controls represent values/view modes rather than resource navigation.
- [ ] Input semantics match the actual selection model.

## 4.7 Command palette

- [ ] Command palette supplements visible navigation.
- [ ] Pointer/touch access exists.
- [ ] Shortcut is discoverable where appropriate.
- [ ] Search results and actions are clearly distinguished.
- [ ] Permission changes affect command results.
- [ ] Navigation commands resolve to canonical routes.
- [ ] Destructive actions are clearly identified and protected.

## 4.8 Search

- [ ] Global search has stable placement.
- [ ] Scoped search is placed near its scope.
- [ ] Search scope is clear.
- [ ] Results use canonical links.
- [ ] Search is keyboard accessible.
- [ ] Search is not the only way to locate ordinary content where alternatives are required.
- [ ] Mobile search remains discoverable.

## 4.9 Routes and URLs

- [ ] Every navigable state has a route contract.
- [ ] Deep links survive reload.
- [ ] Path parameters represent stable resource identity.
- [ ] Query parameters represent optional view/query state consistently.
- [ ] Fragments have stable meaning.
- [ ] Canonicalization rules are defined.
- [ ] Default URL state is normalized.
- [ ] Secrets are excluded from URLs.
- [ ] Sensitive PII is minimized.
- [ ] URL parameters are validated.
- [ ] Public URLs receive redirect support when changed.

## 4.10 Security

- [ ] Navigation visibility is not used as authorization.
- [ ] Protected routes enforce access independently.
- [ ] Tenant context is trusted server-side.
- [ ] Protected breadcrumb/resource names are not disclosed prematurely.
- [ ] Return URLs are validated.
- [ ] External redirects are controlled.
- [ ] Cached navigation/search data is tenant/permission scoped.
- [ ] Deep links follow 403/404 disclosure policy.

## 4.11 Browser history

- [ ] Meaningful user navigation pushes history.
- [ ] Canonicalization/transient updates replace rather than pollute history.
- [ ] Search typing does not create excessive entries.
- [ ] Browser Back restores historical state.
- [ ] Browser Forward restores historical state.
- [ ] Duplicate equivalent entries are avoided.
- [ ] Deep-link overlays use history intentionally.
- [ ] Browser controls are not overridden with unrelated parent navigation.

## 4.12 Scroll and focus

- [ ] Back restores meaningful list scroll where appropriate.
- [ ] New route navigation starts at meaningful content.
- [ ] Fragment navigation reaches the intended target.
- [ ] SPA transitions manage focus.
- [ ] Modal navigation restores focus on close.
- [ ] Skip-to-content works.
- [ ] Focus order follows visual/logical meaning.

## 4.13 Mobile

- [ ] Mobile retains the same conceptual IA.
- [ ] Sidebar/off-canvas navigation is accessible.
- [ ] Navigation closes appropriately after destination selection.
- [ ] Bottom navigation is constrained to major destinations.
- [ ] Mobile Back semantics are explicit.
- [ ] Touch users can access all nested navigation.
- [ ] Viewport changes do not cause route changes.

## 4.14 State management

- [ ] Router/URL is the source of truth for route-owned state.
- [ ] Active sidebar state is derived rather than duplicated.
- [ ] Tabs/filters/sort are URL-owned where meaningful.
- [ ] Sidebar visual state remains local where appropriate.
- [ ] Tenant switching clears/re-scopes dependent state.
- [ ] Route cancellation prevents stale content from replacing new navigation.
- [ ] Loading state does not destabilize global navigation.

## 4.15 Forms and workflows

- [ ] Dirty-state detection reflects meaningful unsaved changes.
- [ ] Leave warnings cover relevant navigation paths.
- [ ] Safe autosave does not trigger unnecessary warnings.
- [ ] Wizard steps match process semantics.
- [ ] Browser Back does not corrupt workflow state.
- [ ] Deep-linkable steps have routes where appropriate.

## 4.16 Accessibility

- [ ] Navigation uses appropriate landmarks.
- [ ] Multiple nav landmarks have distinct labels.
- [ ] Skip navigation is available.
- [ ] Current page uses `aria-current` where appropriate.
- [ ] Link purpose is understandable.
- [ ] All navigation is keyboard operable.
- [ ] Focus indicators remain visible.
- [ ] Focus order is logical.
- [ ] Navigation meaning does not rely only on color.
- [ ] Icon-only controls have accessible names.
- [ ] Disclosure state is exposed with `aria-expanded`.
- [ ] Tab semantics and keyboard behavior are correct.
- [ ] Modal mobile navigation traps/restores focus correctly.

## 4.17 Localization and RTL

- [ ] Navigation labels are localized.
- [ ] Text expansion is supported.
- [ ] Machine route keys are stable.
- [ ] RTL layout is tested.
- [ ] Directional icons are reviewed.
- [ ] Breadcrumb direction is correct.
- [ ] Sidebar/drawer side follows design-system RTL policy.

## 4.18 Components and design tokens

- [ ] shadcn/ui primitives or canonical wrappers are used.
- [ ] Active, hover, focus, and disabled navigation states use Design Tokens.
- [ ] Sidebar widths use shared tokens/variables.
- [ ] Top-bar dimensions use layout tokens.
- [ ] Arbitrary feature-specific navigation colors are avoided.
- [ ] Tooltip is supplementary, not the only semantic label.
- [ ] Navigation surfaces use canonical elevation and border treatments.

## 4.19 Failures

- [ ] Invalid routes show Not Found rather than silent home redirect.
- [ ] Unauthorized routes show security-approved state.
- [ ] Route data errors preserve usable shell navigation.
- [ ] Broken deep links remain diagnosable.
- [ ] Redirect loops are tested.
- [ ] Failed tenant switches retain safe state.
- [ ] Loading/error states follow the States Catalogue.

## 4.20 Testing and observability

- [ ] Primary and nested routes are tested.
- [ ] Deep links are tested from cold load.
- [ ] Reload is tested.
- [ ] Back and Forward are tested.
- [ ] Scroll restoration is tested.
- [ ] Query/filter restoration is tested.
- [ ] Mobile navigation is tested.
- [ ] Keyboard-only navigation is tested.
- [ ] Screen-reader landmarks are tested.
- [ ] RTL is tested.
- [ ] Long localized labels are tested.
- [ ] 404/403 routing is tested.
- [ ] Route-transition failures are monitored.
- [ ] Broken-route and redirect rates are observable.

---

# 5. Canonical summary

The following rules define the Gold Standard 2026 baseline.

1. **Information architecture MUST precede navigation UI.** A sidebar is a rendering of the IA, not a substitute for defining it.

2. **Navigation MUST reflect user concepts rather than implementation architecture.**

3. **Links navigate; buttons act.** Semantic behavior MUST remain correct regardless of visual styling.

4. **Primary navigation MUST identify stable major product destinations.** It SHOULD remain consistently ordered across related views.

5. **Secondary navigation MUST remain contextual to a clear parent area or resource.**

6. **Utility navigation SHOULD remain distinct from primary product navigation.**

7. **shadcn/ui Sidebar is the canonical desktop application-navigation baseline.** Collapse, off-canvas behavior, grouping, and triggers SHOULD compose the shared primitive rather than recreate parallel systems.

8. **Active navigation state MUST derive from canonical route state.** Duplicate local active-state models SHOULD NOT exist.

9. **Current location MUST NOT be communicated through color alone.**

10. **Collapsed/icon navigation MUST retain accessible names and discoverable labels.**

11. **Breadcrumbs represent hierarchy, not browsing history.**

12. **Breadcrumbs MUST use meaningful resource labels and an accessible navigation landmark.**

13. **Tabs MUST represent tab panels when ARIA tab semantics are used.** Ordinary links MUST NOT become tabs merely because they are styled horizontally.

14. **Segmented controls represent a value or viewing mode, not general page navigation.**

15. **Automatic tab activation SHOULD only be used when panel changes have no noticeable latency.**

16. **ARIA menu/menubar semantics MUST NOT be applied casually to ordinary application navigation.** Semantic links and disclosures SHOULD be preferred for conventional navigation.

17. **Command palettes are accelerators, not the primary IA.** Core destinations MUST remain conventionally discoverable.

18. **Search supplements navigation.** Global and scoped search MUST communicate their scope.

19. **Every meaningful navigable resource/state MUST have a defined URL contract.**

20. **Deep links MUST work from a cold load.** A valid route MUST NOT depend on previous in-memory application navigation.

21. **Meaningful shareable state SHOULD live in the URL.** Transient visual state generally SHOULD NOT.

22. **Paths SHOULD identify hierarchy/resources; query parameters SHOULD represent optional view/query state under a consistent product convention.**

23. **URLs MUST be treated as potentially exposed data.** Secrets MUST NOT appear in them.

24. **Navigation visibility is not authorization.** Every protected route and API MUST independently enforce access.

25. **Tenant context MUST derive from trusted identity/context, not arbitrary route input.**

26. **Browser Back and Forward are first-class navigation mechanisms and MUST retain expected session-history semantics.**

27. **Meaningful user navigation SHOULD add history entries; normalization and transient adjustments SHOULD replace the current entry.**

28. **High-frequency input changes MUST NOT pollute session history.**

29. **Back navigation SHOULD restore meaningful collection state such as filters, pagination, and scroll position where practical.**

30. **SPA route changes MUST update document title and manage focus appropriately.**

31. **Users MUST receive clear orientation through an appropriate combination of current navigation, page heading, breadcrumbs, subview state, tenant context, URL, and document title.**

32. **Applications MUST provide a mechanism to bypass repeated navigation, normally a Skip to main content link plus semantic landmarks.**

33. **Focus order MUST preserve meaning and operation.**

34. **Navigation labels MUST communicate destination purpose.** Icon-only controls require accessible names.

35. **Mobile navigation MAY change presentation but MUST preserve the same conceptual IA.**

36. **shadcn/ui Sidebar off-canvas or Sheet SHOULD form the mobile navigation baseline.**

37. **Bottom navigation SHOULD be limited to a small set of high-frequency primary destinations rather than duplicating a full desktop sidebar.**

38. **An in-app parent link and browser Back are different concepts and MUST NOT be conflated.**

39. **Route-owned state MUST use the router/URL as its source of truth.**

40. **URL input MUST be validated.** Invalid tabs, filters, sort values, resource IDs, and route parameters MUST resolve deterministically.

41. **Public/deep-linked URLs SHOULD be treated as durable interfaces and receive redirects when changed.**

42. **Unsaved-change warnings MAY block navigation only when meaningful user work would actually be lost.**

43. **Stable application chrome SHOULD remain usable during route loading and recoverable page errors.**

44. **Invalid or inaccessible deep links SHOULD produce explicit Not Found or No Access states rather than silently redirecting to home.**

45. **Navigation landmarks, skip links, current-page semantics, keyboard behavior, focus visibility, and responsive focus management MUST comply with the Accessibility standard.**

46. **Navigation MUST remain usable under localization, text expansion, and RTL layouts.**

47. **shadcn/ui Sidebar, NavigationMenu, Breadcrumb, Tabs, Command, Sheet, DropdownMenu, Collapsible, ScrollArea, Separator, Tooltip, Button, and AlertDialog form the canonical primitive baseline.**

48. **Navigation testing MUST cover cold deep links, reload, Back, Forward, mobile, permissions, tenant switching, keyboard behavior, focus restoration, query state, 404/403 states, localization, and RTL.**

49. **Navigation observability SHOULD detect broken routes, redirects, deep-link failures, and route-transition regressions.**

50. **The canonical rule is: users must always be able to understand where they are, reach where they need to go through predictable semantics, and reproduce meaningful navigation state through a stable URL and browser history.**

A particularly important implementation distinction in this standard is that **browser history, hierarchy, and parent navigation are three different concepts**. Keeping those separate prevents a large class of SPA failures where breadcrumbs, custom Back buttons, and URL state all appear reasonable individually but contradict one another in actual navigation.
