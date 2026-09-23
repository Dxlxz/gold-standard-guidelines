---
id: "search-navigation"
title: "Search, Navigation & Wayfinding"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "search", "navigation", "wayfinding"]
applies_to: ["ui"]
related: []
legacy_number: 109
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 59948
provenance: baseline

---

The research supports a clear separation between **information architecture, navigation surfaces, search, filters, and browser/history state**. Current Baymard research also reinforces showing applied-filter context and using suggestions to improve query formulation rather than treating autocomplete merely as typing acceleration. citeturn343680search0turn797227search0turn797227search3

# Search, Navigation & Wayfinding — Gold Standard 2026

**Canonical placement:** Design Tokens → Layout → Navigation & Wayfinding → Search & Filtering → Layout Patterns → Facade → Components  
**Status:** Normative  
**Implementation baseline:** shadcn/ui + accessible native/Radix primitives  
**Accessibility target:** WCAG 2.2 AA or higher  
**Applies to:** authenticated products, enterprise applications, public services, dashboards, data products, geospatial systems, mobile applications, settings, search interfaces, multi-pane workspaces, and deep-linkable application state.

---

# 1. Purpose

Search, Navigation & Wayfinding define how users answer three different questions:

```text
Where am I?
Where can I go?
How do I find something I do not yet know how to navigate to?
```

These are related but distinct responsibilities.

**Information architecture (IA)** defines the underlying organisation, relationships, and naming of content and functionality.

**Navigation** exposes routes through that architecture.

**Search** provides retrieval across an information space.

**Filtering** changes the scope of an existing collection.

**Wayfinding** helps users understand current location, hierarchy, scope, and how to return to meaningful prior contexts.

NN/g explicitly distinguishes IA from navigation: IA is the underlying organisation and nomenclature of content/functionality, while navigation is the set of interface mechanisms used to move through that structure. Navigation choices SHOULD therefore follow IA rather than determine it.  
https://www.nngroup.com/articles/ia-vs-navigation/

The system MUST preserve:

- predictable location;
- clear current state;
- stable browser history;
- deep linking;
- navigable URLs;
- meaningful page titles;
- accessible keyboard interaction;
- recoverable search/filter states.

A user MUST NOT need to remember the exact path used to reach a page in order to understand where that page belongs.

---

# 2. Rules

# 2.1 Information architecture precedes navigation

Product teams MUST define the primary information architecture before committing to:

- top navigation;
- sidebar navigation;
- tabs;
- mega menus;
- command palettes;
- breadcrumbs.

NN/g warns that choosing navigation patterns before understanding content volume, structure, and depth can force the information architecture to fit an unsuitable visual mechanism.  
https://www.nngroup.com/articles/ia-vs-navigation/

The IA SHOULD identify:

```text
top-level domains
primary objects
primary workflows
secondary objects
hierarchical relationships
cross-links
search scopes
settings domains
administrative domains
```

A product sitemap SHOULD exist independently from its rendered navigation.

---

# 2.2 Canonical top-level IA models

A product SHOULD select one dominant IA model and document exceptions.

Canonical models include:

| Model | Appropriate for |
|---|---|
| Object-based | Cases, customers, datasets, projects, assets |
| Task-based | Apply, review, approve, reconcile, monitor |
| Domain-based | Finance, Operations, Compliance, Forestry |
| Lifecycle-based | Draft → Review → Approved → Archived |
| Audience-based | Rare; only when user populations genuinely require separate structures |
| Hybrid | Large enterprise systems with clear primary and secondary dimensions |

Object- and task-based models SHOULD generally be preferred over vague organisational structures.

Navigation labels MUST NOT blindly mirror the internal company org chart.

A user seeking:

```text
Invoices
```

SHOULD NOT have to know that invoices are owned internally by:

```text
Shared Services → Commercial Operations → Financial Enablement
```

---

# 2.3 Breadth vs depth

Navigation SHOULD expose sufficiently specific top-level choices rather than artificially compressing a broad product into a few vague categories.

NN/g notes that forcing a broad information space into too few generic top-level categories can reduce information scent and require additional navigation effort.  
https://www.nngroup.com/articles/vertical-nav/

Prefer:

```text
Cases
Inspections
Permits
Land parcels
Reports
```

over:

```text
Work
Data
Tools
More
```

when the former better reflects user concepts.

Depth MUST remain understandable.

Deep hierarchies SHOULD provide stronger location cues through:

- persistent section navigation;
- breadcrumbs;
- clear headings;
- URL hierarchy.

---

# 2.4 Navigation labels

Labels MUST use terminology users recognise.

Navigation SHOULD use:

```text
user nouns
user tasks
domain vocabulary
```

rather than internal implementation language.

Prefer:

```text
Invoices
Forest alerts
Field inspections
User access
```

over:

```text
FinancialArtifactManager
Monitoring Module
Workflow Processor
IAM
```

when the audience does not naturally use the latter terms.

Labels SHOULD be concise but MUST NOT become vague merely to fit a narrow layout.

---

# 2.5 One label, one concept

The same destination SHOULD use the same label throughout the product.

Do NOT alternate among:

```text
Settings
Preferences
Configuration
Options
Setup
```

for the same destination.

Synonyms MAY be indexed by search even when only one canonical UI label is shown.

---

# 2.6 Global navigation model

Global navigation contains stable top-level destinations.

Desktop product applications SHOULD normally use one of:

```text
persistent sidebar
or
persistent top-level navigation
```

A product SHOULD NOT simultaneously create competing top-level hierarchies in both.

Wireframe:

```text
┌──────────────────────────────────────────────────────────┐
│ Product / tenant                     Search   User       │
├──────────────┬───────────────────────────────────────────┤
│ Overview     │                                           │
│ Cases        │                  PAGE                     │
│ Inspections  │                                           │
│ Maps         │                                           │
│ Reports      │                                           │
│              │                                           │
│ Settings     │                                           │
└──────────────┴───────────────────────────────────────────┘
```

shadcn/ui `Sidebar` SHOULD be the baseline primitive where a persistent application sidebar is appropriate.  
https://ui.shadcn.com/docs/components/base/sidebar

---

# 2.7 Sidebar navigation

A sidebar SHOULD be preferred when:

- there are several stable destinations;
- labels benefit from remaining visible;
- users switch frequently between domains;
- the product is desktop/workspace oriented;
- hierarchy requires nested groups.

Sidebar navigation SHOULD NOT collapse to icons-only by default for ordinary users.

Icons MAY supplement labels.

Icons MUST NOT replace unfamiliar navigation labels merely to conserve width.

NN/g research consistently finds visible navigation more discoverable than navigation hidden behind generic menu controls, although constrained mobile layouts may justify hiding some destinations.  
https://www.nngroup.com/articles/hamburger-menus/  
https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/

---

# 2.8 Top navigation

Top navigation is appropriate when:

- top-level breadth is limited;
- labels remain short;
- content width is valuable;
- the product resembles a site/service more than a dense workstation.

Wireframe:

```text
┌─────────────────────────────────────────────────────────────┐
│ Brand   Products   Projects   Reports   Help     Search  Me │
├─────────────────────────────────────────────────────────────┤
│ Breadcrumb                                                 │
│ Page title                                                 │
│                                                            │
│ Content                                                    │
└─────────────────────────────────────────────────────────────┘
```

Top navigation MUST NOT horizontally compress dozens of destinations.

Overflow MUST be deliberate.

---

# 2.9 Contextual sub-navigation

Contextual navigation applies to the current object or product domain.

Example:

```text
Customer: Acme Industries

Overview
Contacts
Invoices
Contracts
Audit log
```

Contextual navigation MUST NOT be visually indistinguishable from global navigation.

The user SHOULD be able to infer:

```text
these destinations belong to this customer
```

rather than:

```text
these are unrelated global destinations
```

---

# 2.10 In-page tabs

Tabs SHOULD switch between alternate views or closely related sections inside the same conceptual context.

NN/g recommends tabs when content can be concisely labelled and users do not need to see multiple panels simultaneously; mixing navigation tabs and in-page tabs within the same tab control can disorient users.  
https://www.nngroup.com/articles/tabs-used-right/

Example:

```text
Case FR-1024

[ Overview ] [ Evidence ] [ Activity ] [ Permissions ]
```

Tabs MUST NOT be used as a substitute for an entire deep global hierarchy.

Where tab state represents a stable shareable view, the active tab SHOULD appear in the URL.

Example:

```text
/cases/FR-1024/evidence
```

or:

```text
/cases/FR-1024?view=evidence
```

depending on routing semantics.

---

# 2.11 In-page anchors

Anchor navigation SHOULD be used for long pages where sections remain simultaneously part of one document.

Example:

```text
On this page

Overview
Eligibility
Requirements
Fees
Appeals
```

Anchor links SHOULD update the fragment identifier when appropriate:

```text
/policy#appeals
```

Sticky anchor navigation MUST NOT obscure focused section headings.

---

# 2.12 Tabs vs anchors

Use **tabs** when only one panel should normally be visible.

Use **anchors** when sections form one continuous document.

Do NOT use tabs solely to make a long page appear shorter.

---

# 2.13 Breadcrumbs

Breadcrumbs MUST represent **information hierarchy**, not browser history.

Example:

```text
Home > Cases > Forestry > FR-1024
```

NOT:

```text
Dashboard > Search results > FR-1024
```

merely because that was today's click path.

NN/g defines breadcrumbs as hierarchical wayfinding aids showing the page and its ancestors.  
https://www.nngroup.com/articles/breadcrumbs/

The WAI-ARIA Breadcrumb Pattern uses a labelled navigation landmark and identifies the current page with `aria-current="page"`.  
https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/

---

# 2.14 Breadcrumb anatomy

Canonical structure:

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/cases">Cases</a></li>
    <li><a href="/cases/forestry">Forestry</a></li>
    <li>
      <a
        href="/cases/forestry/FR-1024"
        aria-current="page"
      >
        FR-1024
      </a>
    </li>
  </ol>
</nav>
```

shadcn/ui `Breadcrumb` SHOULD be used as the visual baseline where appropriate.  
https://ui.shadcn.com/docs/components/base/breadcrumb

Breadcrumbs SHOULD NOT replace global navigation.

They are secondary wayfinding.

---

# 2.15 Breadcrumb depth

Desktop breadcrumbs SHOULD normally expose the meaningful hierarchy.

Compact layouts MAY collapse intermediate ancestors:

```text
Cases > … > FR-1024
```

but MUST preserve access to omitted ancestors if they matter.

The current page MAY be plain text or a current-page link according to the component contract, but MUST remain programmatically identifiable.

---

# 2.16 URL strategy

A stable information object SHOULD have a stable URL.

Prefer:

```text
/cases/FR-1024
/datasets/land-cover-2026
/settings/security
```

Avoid URLs whose only meaning is implementation state:

```text
/page?screen=7&widget=22&mode=x
```

unless those parameters represent meaningful shareable application state.

---

# 2.17 Canonical URL-state categories

URL state SHOULD be classified as:

| State | URL? |
|---|---|
| Current record/entity | MUST |
| Search query | SHOULD |
| Material filters | SHOULD |
| Sort order | SHOULD where shareability matters |
| Pagination/cursor | SHOULD where restoration/shareability matters |
| Current map extent | MAY |
| Selected map feature | SHOULD when deep linking matters |
| Current persistent tab | SHOULD |
| Temporary tooltip | MUST NOT |
| Hover | MUST NOT |
| Open ephemeral menu | MUST NOT |
| Local animation state | MUST NOT |

The URL SHOULD describe useful application state, not every UI implementation detail.

---

# 2.18 Footer navigation

Footer navigation MAY provide:

- legal;
- privacy;
- accessibility;
- documentation;
- support;
- status;
- corporate information.

A product footer MUST NOT become the primary escape route for important operational destinations.

Operational navigation belongs in the application's primary navigation architecture.

---

# 2.19 Mobile bottom navigation

Bottom navigation MAY be used when the application has approximately three to five high-frequency peer destinations.

Example:

```text
┌─────────────────────────────┐
│                             │
│          CONTENT            │
│                             │
├─────────────────────────────┤
│ Home  Cases  Map  Alerts Me │
└─────────────────────────────┘
```

Destinations SHOULD be:

- stable;
- peer-level;
- high-frequency.

Bottom navigation MUST NOT become horizontally scrolling primary navigation.

Less-frequent destinations SHOULD move to an explicit secondary menu.

---

# 2.20 Mobile navigation priority

Where space requires hidden navigation, the most important destinations SHOULD remain exposed where feasible.

NN/g's research shows that even though the hamburger pattern is now widely recognised, hiding navigation still reduces discoverability compared with visible alternatives.  
https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/  
https://www.nngroup.com/articles/find-navigation-mobile-even-hamburger/

---

# 2.21 Overflow menus

Overflow menus are appropriate for:

- secondary actions;
- lower-frequency navigation;
- contextual actions.

Example:

```text
[ Edit ] [ Share ] [ More ▾ ]

More:
  Duplicate
  Export
  Archive
  Delete
```

Overflow MUST NOT hide the primary action merely to obtain visual symmetry.

Dangerous actions SHOULD normally be separated visually from routine actions.

---

# 2.22 Current and active state

Navigation MUST indicate current location.

The indicator SHOULD use more than colour alone.

Possible mechanisms include:

```text
background
text weight
border / indicator
position
aria-current
```

NN/g describes "you are here" navigation as a core orientation mechanism and recommends visible current-location cues.  
https://www.nngroup.com/articles/navigation-you-are-here/

---

# 2.23 Current-state semantics

| Context | Semantic state |
|---|---|
| Current page link | `aria-current="page"` |
| Current workflow step | `aria-current="step"` where appropriate |
| Selected in-page tab | `aria-selected="true"` |
| Checked filter | native checked / `aria-checked` |
| Expanded navigation group | `aria-expanded="true"` |

Do NOT use `aria-selected` as a generic replacement for every visual highlight.

---

# 2.24 Parent-current state

When a descendant route is active, a parent section MAY show an expanded/current-section indication.

Example:

```text
Cases                 ← current section
  Open
  Assigned to me
  Archived
```

The parent MUST NOT falsely claim to be the exact current page if it is only an ancestor.

---

# 2.25 Deep linking

Users SHOULD be able to link directly to stable work contexts.

Examples:

```text
specific case
specific tab
saved search
filtered dataset
map selection
audit event
settings section
```

Deep links MUST enforce the same authorization as ordinary navigation.

A deep link MUST NOT bypass authorization checks.

---

# 2.26 Browser Back correctness

Browser Back MUST undo meaningful navigation history rather than trigger surprising resets.

The following transitions SHOULD generally create browser history entries:

```text
page → page
record → record
search results → record
major tab route → another major tab route
```

Ephemeral transitions generally SHOULD NOT:

```text
tooltip
hover
popover
dropdown menu
accordion where not deep-linkable
```

Filter updates MAY use history replacement while editing and history push on committed state, depending on the product's interaction model.

The behaviour MUST be documented.

---

# 2.27 Search-results return

When a user follows:

```text
Search results
→
Record
→
Back
```

the system SHOULD restore:

- query;
- filters;
- sort;
- pagination;
- approximate scroll position.

It SHOULD NOT return the user to an empty default list.

---

# 2.28 History integrity

Applications MUST NOT trap users by:

- replacing every history entry;
- pushing entries for every keystroke;
- intercepting Back to reopen the same view;
- recreating browser history in a custom stack unnecessarily.

Browser navigation is a platform contract.

Application routing SHOULD work with it.

---

# 2.29 Unsaved-state guards

Unsaved-state protection MAY intercept a navigation attempt where real user work would otherwise be lost.

The guard MUST NOT appear merely because a form was focused.

It SHOULD trigger only when:

```text
current editable state
≠
last safely persisted state
```

Wireframe:

```text
Leave this page?

You have unsaved changes to Inspection FR-1024.

[Stay and continue editing]
[Discard changes and leave]
```

The safe/default action SHOULD be unambiguous.

The user MUST NOT receive repeated prompts after intentionally discarding.

---

# 2.30 Autosave and history

Where reliable autosave exists, the product SHOULD avoid unnecessary unsaved-changes dialogs.

Autosave state MUST be truthful:

```text
Saving…
Saved
Save failed
Offline — changes stored locally
```

A "Saved" indicator MUST NOT appear before authoritative persistence semantics permit that claim.

---

# 2.31 Search entry points

Search visibility MUST match expected use.

High-frequency search SHOULD be persistently visible.

Lower-frequency search MAY use:

- search button;
- keyboard command;
- command palette.

Search MUST NOT be hidden solely to create a visually cleaner header if retrieval is a core product task.

---

# 2.32 Global vs scoped search

Search inputs MUST communicate their scope.

Examples:

```text
Search all cases
Search this dataset
Search users
Search map features
Search settings
```

Avoid ambiguous:

```text
Search…
```

when multiple plausible scopes exist.

---

# 2.33 Search scope model

Canonical search scopes:

```text
global
domain
collection
current context
```

A product MAY allow explicit scope switching.

Example:

```text
Search [ All data ▾ ]
```

When scope changes automatically, the change MUST be perceptible.

---

# 2.34 Submitted vs instant search

Use **submitted search** when:

- queries are expensive;
- results are large;
- users compose structured expressions;
- accidental execution is costly;
- search is server intensive.

Use **instant search** when:

- result latency is low;
- the collection is modest;
- incremental refinement materially helps discovery.

Instant search MUST debounce network execution where necessary.

It MUST NOT push a browser history entry for every character.

---

# 2.35 Query persistence

After submission, the query MUST remain visible.

Bad:

```text
Search: [             ]

Results for "forest loss"
```

Good:

```text
Search: [ forest loss ]

2,184 results
```

Users SHOULD be able to modify the existing query without reconstructing it from memory.

---

# 2.36 Query syntax

Products with advanced syntax MUST expose it deliberately.

Examples:

```text
status:open
owner:me
type:inspection
area>5ha
```

Syntax SHOULD be:

- composable;
- documented;
- tolerant of spacing/case where feasible;
- discoverable through suggestions.

The default search experience SHOULD NOT require users to learn syntax before obtaining useful results.

---

# 2.37 Search suggestions

Suggestions MAY include:

```text
query completions
entities
recent queries
saved searches
actions
scopes
```

These types MUST be visually distinguishable when mixed.

Example:

```text
Search

forest fire
──────────────
Queries
  forest fire alerts
  forest fire Sabah

Places
  Forest Reserve 14

Recent
  forest loss > 5ha
```

---

# 2.38 Suggestion semantics

An editable search field with an associated suggestion popup SHOULD follow the WAI-ARIA Combobox Pattern.

The pattern defines:

- `combobox`;
- associated popup;
- `aria-expanded`;
- `aria-controls`;
- active descendant/selection semantics;
- keyboard interaction.

https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

A suggestion popup MUST NOT be implemented as a purely visual `<div>` list that is inaccessible by keyboard.

---

# 2.39 Suggestion keyboard contract

Typical editable search suggestion behaviour SHOULD support:

| Key | Behaviour |
|---|---|
| Down Arrow | Move into/through suggestions |
| Up Arrow | Previous suggestion |
| Enter | Accept active suggestion / submit |
| Escape | Close suggestions without destroying query |
| Tab | Follow documented focus model |
| Printable characters | Continue editing query |

The implementation MUST preserve ordinary text-editing keys.

---

# 2.40 Purpose of autocomplete

Autocomplete SHOULD improve query quality, not merely save keystrokes.

Baymard's large-scale ecommerce research finds that useful autocomplete can teach terminology, suggest scopes, reduce typo impact, and guide users toward queries likely to return useful results. Although this evidence comes from ecommerce, the principles generalise to product search when equivalent retrieval behaviour exists.  
https://baymard.com/ecommerce-design-examples/34-autocomplete-suggestions

---

# 2.41 Typo tolerance

Search SHOULD tolerate reasonable:

```text
misspellings
pluralisation
punctuation differences
case differences
spacing differences
```

where domain safety permits it.

For high-stakes identifiers such as:

```text
case ID
account number
chemical code
legal reference
```

fuzzy matching MUST NOT silently substitute another entity.

The UI MAY instead show:

```text
No exact match for FR-1204.
Did you mean FR-1024?
```

Baymard's search research shows that autocomplete and result recovery degrade sharply when simple misspellings produce irrelevant or empty outcomes.  
https://baymard.com/research-articles/mass-merchant-best-practices  
https://baymard.com/blog/findability-vs-discoverability-ux

---

# 2.42 Synonyms

Search SHOULD index recognised synonyms.

Examples:

```text
parcel / lot
customer / client
permit / licence
forest loss / canopy loss
```

Synonym dictionaries SHOULD be domain-owned rather than inferred indefinitely from arbitrary user input.

---

# 2.43 Search-result anatomy

Canonical result:

```text
Title / primary identifier
Secondary identity / type
Contextual snippet
Metadata
Status
Optional matched-field indication
```

Example:

```text
FR-2026-1842 — Probable canopy loss

Jerantut Forest District · Detection
3.8 ha · Confidence 82% · Observed 18 Sep 2026

Matched: "Jerantut"
```

The result MUST contain enough information to distinguish likely duplicates.

---

# 2.44 Snippets

Search snippets SHOULD explain why the result matched.

They SHOULD display a relevant surrounding fragment rather than always the first sentence of the document.

Highlighted match terms MAY aid scanning.

Highlighting MUST NOT be the only indication of match context.

---

# 2.45 Search highlighting

Highlighting SHOULD be restrained.

Do NOT turn every occurrence into a visually dominant badge.

Search highlighting MUST remain legible in:

- light theme;
- dark theme;
- high-contrast environments.

---

# 2.46 Result ranking

Where ranking matters, search product owners SHOULD define ranking factors explicitly.

Possible factors:

```text
exact identifier match
exact title match
field match
recency
permission
domain relevance
user context
```

The product MUST NOT promise:

```text
Best match
Most relevant
```

without a ranking model that reasonably supports that description.

---

# 2.47 Search-result state matrix

| State | Required UX |
|---|---|
| Idle | Scope + query entry |
| Typing | Suggestions where supported |
| Searching | Preserve query; stable loading state |
| Results | Count/scope + result list |
| Partial results | Explain omitted/unavailable scope where material |
| Zero results | Query retained + recovery actions |
| Error | Explain search failure separately from no-results |
| Offline | Explain local/cached search limits |
| Permission-limited | Do not expose restricted result existence unless policy permits |

"0 matches" and "search service failed" MUST NOT use the same empty state.

---

# 2.48 Zero-result recovery

A zero-result page MUST NOT be a dead end.

It SHOULD offer relevant recovery such as:

```text
correct spelling
remove restrictive filters
broaden scope
search related terminology
browse likely category
clear date constraints
```

Example:

```text
No detections match:

"canopy fire"
Region: Pahang
Confidence: ≥ 90%
Date: Last 7 days

Try:
• lowering confidence to 70%
• extending the date range
• searching "forest fire"

[Clear filters]
```

Baymard observed that generic no-result advice performs poorly compared with contextual recovery suggestions.  
https://baymard.com/research-articles/mobile-ecommerce-search-and-navigation

---

# 2.49 Search within datasets

Dataset search MUST distinguish:

```text
full-text search
field search
filtering
```

A table search box labelled:

```text
Search rows
```

MUST NOT imply it searches archived records, hidden datasets, or external services unless it actually does.

Large dataset search SHOULD normally execute server-side.

---

# 2.50 Search within maps

Map search MAY support:

- place names;
- coordinates;
- parcel IDs;
- feature IDs;
- assets;
- administrative units.

The result MUST distinguish between:

```text
navigate map to this location
select this feature
run domain search
```

Example:

```text
Search "Jerantut"

Places
  Jerantut, Pahang

Administrative units
  Jerantut District

Forest assets
  Jerantut Reserve 14
```

Map search MUST NOT silently change analytical filters unless the UI communicates the change.

---

# 2.51 Saved searches

Saved search SHOULD preserve:

```text
query
scope
filters
sort
```

and MAY preserve:

```text
visible columns
map extent
result view
```

when those are meaningful to the task.

Saved searches MUST have stable names.

They SHOULD expose:

```text
owner
modified date
shared/private state
```

where collaboration exists.

---

# 2.52 Recent search and recent items

Recent items SHOULD assist repeated work.

Recents MUST be distinguishable from search results.

Example:

```text
Recently viewed

FR-1024
FR-1087
Dataset: Land Cover 2026
```

Sensitive recents MUST respect current authorization.

A record removed from a user's access MUST NOT remain usable merely because it appears in recent history.

---

# 2.53 Filtering vs search

Search answers:

```text
What matches this query?
```

Filtering answers:

```text
Within this collection, which records satisfy these criteria?
```

The UI SHOULD preserve this distinction.

A product SHOULD NOT label a set of checkboxes:

```text
Advanced search
```

when they merely filter the current result set.

---

# 2.54 Filter placement

Desktop data-heavy products SHOULD normally place frequent filters:

```text
in a persistent left sidebar
or
in a visible filter toolbar
```

depending on count and complexity.

Wireframe:

```text
┌───────────────┬──────────────────────────────────────┐
│ Filters       │ Search results                      │
│               │                                      │
│ Status        │ [Active: Open ×] [Owner: Me ×]      │
│ □ Open        │                                      │
│ □ Closed      │ 184 results                         │
│               │                                      │
│ Owner         │ Result                              │
│ □ Me          │ Result                              │
│ □ Team        │ Result                              │
└───────────────┴──────────────────────────────────────┘
```

---

# 2.55 Filter placement on mobile

Mobile filters SHOULD generally open in:

```text
Sheet
Drawer
full-screen filter view
```

depending on complexity.

The result page MUST still show that filters are active after the filter surface closes.

shadcn/ui `Sheet`, `Drawer`, `Checkbox`, `RadioGroup`, `Select`, and related form primitives SHOULD provide the baseline implementation.

---

# 2.56 Facet behaviour

Within one facet, multi-select SHOULD normally mean OR:

```text
Status:
☑ Open
☑ Pending

=> Open OR Pending
```

Across independent facets, selection SHOULD normally mean AND:

```text
Status = Open
AND
Owner = Me
```

Exceptions MUST be explicit.

Users SHOULD NOT need to reverse-engineer Boolean logic from result counts.

---

# 2.57 Applied filters

Active filters MUST remain visible or readily discoverable outside the closed filter control.

Baymard's current filtering research finds that applied-filter overviews improve confirmation, removal, and understanding of the current result-list context. Although researched in ecommerce, this directly applies to filterable enterprise collections where the same orientation problem exists.  
https://baymard.com/research-articles/how-to-design-applied-filters

Canonical pattern:

```text
Applied filters:

[Status: Open ×]
[Owner: Me ×]
[Priority: High ×]

Clear all
```

---

# 2.58 Applied-filter chip semantics

Removing an applied-filter chip MUST update:

- visible filters;
- results;
- URL state where serialized;
- result count.

The chip remove action MUST be keyboard accessible.

An accessible name SHOULD provide context:

```text
Remove filter: Status Open
```

---

# 2.59 Filter counts

Facet counts MAY show the number of matching results:

```text
Open (184)
Pending (32)
Closed (481)
```

Counts MUST have defined semantics.

The product MUST determine whether counts represent:

```text
current-filter context
or
total unfiltered collection
```

and remain consistent.

Counts that cannot be maintained correctly SHOULD be omitted rather than shown stale.

---

# 2.60 Filter URL serialization

Material filtering state SHOULD be serializable when users benefit from:

- sharing;
- bookmarking;
- browser navigation;
- reproducibility.

Example:

```text
/cases?
status=open,pending
&owner=me
&sort=updated-desc
```

Parameter order and encoding SHOULD be canonicalized.

Sensitive filter values MUST NOT be exposed in URLs if doing so violates Security/privacy standards.

---

# 2.61 Filter reset

The system SHOULD support:

```text
remove one filter
clear facet
clear all
```

when applicable.

"Reset" MUST have clear scope.

Avoid an ambiguous control that might mean:

```text
reset filters
reset sort
reset columns
reset entire workspace
```

---

# 2.62 Saved filter sets

High-frequency operational systems MAY support named filter sets.

Example:

```text
My queue
High-risk unreviewed
Pahang weekly review
```

Saved sets SHOULD preserve only intentional search/list state.

Transient UI state SHOULD NOT be persisted accidentally.

---

# 2.63 Wayfinding hierarchy

Complex products SHOULD provide several reinforcing location cues:

```text
global current section
breadcrumb
page/object heading
contextual navigation
URL
```

These cues SHOULD agree.

Example:

```text
Sidebar:
Cases

Breadcrumb:
Cases > Forestry > FR-1024

Heading:
FR-1024

URL:
/cases/forestry/FR-1024
```

A disagreement between those mechanisms is a wayfinding defect.

---

# 2.64 Deep hierarchy orientation

When hierarchy exceeds the visible navigation depth, the interface SHOULD preserve ancestry through:

- breadcrumbs;
- tree expansion;
- parent context;
- clear page title.

Users MUST NOT land on:

```text
Edit
```

as the only page heading.

Prefer:

```text
Edit access policy
Pahang Forestry Workspace
```

where contextual identity matters.

---

# 2.65 Multi-pane wayfinding

In master-detail/list-detail layouts, selection state and navigation state MUST remain distinct.

Example:

```text
Inbox                  Ticket #1842
──────────────────     ───────────────────
> #1842 Failed sync    Selected record
  #1841 Export ready
```

The detail pane SHOULD have a stable deep link where sharing or opening separately is useful.

---

# 2.66 Multi-window workflows

Opening a record in a new browser tab/window MUST preserve sufficient context.

A detail URL MUST not depend entirely on ephemeral parent-memory state.

Example:

```text
/cases/FR-1024
```

MUST be independently resolvable.

A window opened from a filtered list MAY omit the list's filter context unless that context materially affects the record.

---

# 2.67 Duplicate working contexts

Where users may open multiple records simultaneously, page titles SHOULD make them distinguishable in browser tabs.

Good:

```text
FR-1024 — Canopy loss — ProductName
```

Bad:

```text
Case — ProductName
```

---

# 2.68 Map + list synchronisation

Map and list are two representations of the same result set when used in a coupled geospatial interface.

Canonical relationships SHOULD be:

```text
hover list row
→ highlight map feature

hover map feature
→ highlight list row

select either
→ same selected record

filter
→ update both map and list
```

Hover SHOULD NOT automatically trigger navigation.

Selection MAY update the URL where deep linking matters.

---

# 2.69 Map viewport vs result scope

The product MUST define whether moving the map:

```text
changes result scope
or
only changes viewpoint
```

If map movement affects results, provide a clear mechanism such as:

```text
[Search this area]
```

rather than silently changing results on every pan where that would destabilise the user's work.

Wireframe:

```text
┌─────────────────────────────┬───────────────────────┐
│ MAP                         │ RESULTS               │
│                             │                       │
│      moved viewport         │ 184 current results   │
│                             │                       │
│ [Search this area]          │                       │
└─────────────────────────────┴───────────────────────┘
```

---

# 2.70 Map/list state matrix

| Event | Map | List | URL |
|---|---|---|---|
| Hover result | Highlight feature | Hover row | No change |
| Select result | Select feature | Select row | MAY update |
| Filter | Re-query/re-render | Re-query | SHOULD update |
| Pan map | Viewport changes | Usually unchanged | MAY replace |
| Search this area | Scope changes | Results change | SHOULD update |
| Open detail | Preserve map context | Preserve list context | Push route |

---

# 2.71 Keyboard-first navigation

All core navigation MUST work without pointer input.

Keyboard users MUST be able to:

```text
reach navigation
identify current location
activate links
open/close menus
use search suggestions
change tabs
operate filters
reach results
return to prior context
```

Focus order MUST remain consistent with meaningful visual order.

---

# 2.72 Skip navigation

Applications with persistent navigation SHOULD provide a bypass mechanism such as:

```text
Skip to main content
```

when repeated chrome would otherwise require substantial keyboard traversal.

WCAG 2.2 includes Bypass Blocks requirements.  
https://www.w3.org/TR/WCAG22/#bypass-blocks

---

# 2.73 Command palette purpose

A command palette provides **accelerated expert access**.

It MUST NOT be the only way to discover core product navigation.

shadcn/ui's `Command` primitive is explicitly intended for search and quick actions and SHOULD be the baseline composition primitive where appropriate.  
https://ui.shadcn.com/docs/components/base/command

---

# 2.74 Command-palette trigger

Canonical trigger:

```text
Ctrl/Cmd + K
```

MAY be supported where it does not conflict with product/platform requirements.

A visible trigger SHOULD also exist for discoverability.

Example:

```text
[ Search or run a command…    ⌘K ]
```

Keyboard shortcuts MUST NOT be the only access mechanism.

---

# 2.75 Command-palette scopes

Command palette content SHOULD be grouped.

Example:

```text
Navigate
  Go to cases
  Go to reports
  Open settings

Recent
  FR-1024
  Dataset: Land Cover 2026

Actions
  Create inspection
  Upload dataset
```

Navigation and commands MUST be visually distinguishable where the consequence differs.

---

# 2.76 Actions vs navigation

Palette entries MUST make semantic intent clear.

Examples:

```text
Navigate:
Open case FR-1024

Action:
Archive case FR-1024
```

Destructive actions SHOULD NOT execute immediately from a fuzzy result without appropriate safeguards.

---

# 2.77 Command palette recents

Recents MAY be prioritised when the palette opens empty.

Recents MUST remain permission-filtered.

Users SHOULD be able to type immediately without clearing prepopulated text.

---

# 2.78 Command-palette keyboard contract

Typical contract:

| Key | Behaviour |
|---|---|
| `Ctrl/Cmd+K` | Open/close |
| Characters | Filter commands/search |
| Down/Up | Move active option |
| Enter | Activate |
| Escape | Close / return to prior scope |
| Backspace on empty scoped query | Return to parent scope, where implemented |

The active option MUST be programmatically represented according to the underlying combobox/listbox implementation.

---

# 2.79 Command palette accessibility

The command palette SHOULD follow established combobox/dialog/listbox semantics rather than a custom "keyboard div" implementation.

shadcn's `Command` uses the `cmdk` primitive and can be composed inside a dialog.  
https://ui.shadcn.com/docs/components/base/command

The palette MUST have:

- accessible label;
- visible focus/active state;
- keyboard selection;
- result grouping that remains understandable to assistive technology.

---

# 2.80 Settings and preferences IA

Settings MUST have an independent information architecture.

Settings SHOULD NOT become a chronological dump of every option added to the product.

Canonical categories MAY include:

```text
Profile
Account
Appearance
Notifications
Security
Privacy
Integrations
Billing
Workspace
Members & access
Developer
```

Only categories relevant to the product SHOULD exist.

---

# 2.81 User vs workspace vs system settings

Settings MUST identify ownership scope.

Example:

```text
My settings
  Appearance
  Notifications

Workspace settings
  Members
  Roles
  Integrations

Organisation settings
  Security
  Retention
  Billing
```

A user MUST NOT be left guessing whether changing a preference affects:

```text
me
my team
the tenant
all users
```

---

# 2.82 Settings permissions

Users SHOULD be able to discover settings they legitimately need.

Restricted settings MUST obey authorization.

The interface MAY:

- hide settings the user should not know exist;
- show read-only settings;
- show disabled settings with permission explanation;

depending on Security/product policy.

Visual availability MUST NOT replace server authorization.

---

# 2.83 Settings navigation

Large settings spaces SHOULD use persistent contextual navigation.

Wireframe:

```text
┌───────────────────────────────────────────────────────────┐
│ Settings                                                  │
├──────────────────┬────────────────────────────────────────┤
│ Profile          │ Security                               │
│ Notifications    │                                        │
│ Appearance       │ Password                               │
│ Security       ● │ Sessions                               │
│ Privacy          │ Multi-factor authentication            │
│ Integrations     │                                        │
└──────────────────┴────────────────────────────────────────┘
```

Settings pages SHOULD be directly linkable:

```text
/settings/security
/settings/notifications
```

---

# 2.84 Settings search

Large enterprise settings areas MAY provide:

```text
Search settings
```

Results SHOULD navigate to the exact setting or section.

Synonyms SHOULD be indexed.

Example:

```text
Search: "2FA"

Result:
Multi-factor authentication
Security
```

Search SHOULD NOT create a second undocumented taxonomy.

---

# 2.85 Preferences vs policy

The UI MUST distinguish editable preference from enforced policy.

Example:

```text
Session timeout
30 minutes

Managed by organisation policy
```

Do NOT render a policy-enforced value as an ordinary editable control that simply fails when changed.

---

# 2.86 Navigation state table

| State | Visual requirement | Semantic requirement |
|---|---|---|
| Available | Normal link/action | Link/button semantics |
| Hover | Clear affordance | No semantic change |
| Focus-visible | Strong visible indicator | Focus remains on element |
| Current page | Persistent visible current cue | `aria-current="page"` |
| Current section | Distinct ancestor cue | MUST NOT falsely claim exact current page |
| Expanded | Disclosure indicator | `aria-expanded` |
| Disabled/unavailable | Rare in navigation | Must have documented semantics |
| Permission hidden | No presentation | Server/API still enforces access |

---

# 2.87 Filter/search state ownership

State SHOULD be owned according to durability.

| State | Owner |
|---|---|
| Search input before commit | Local UI |
| Submitted query | URL/application state |
| Applied filters | URL/application state |
| Saved search definition | Server/domain state |
| Recent searches | User preference/history store |
| Open filter drawer | Local UI |
| Hovered map feature | Local UI |
| Selected map feature | URL/application state where shareable |

This division keeps ephemeral interaction out of durable state while preserving meaningful contexts.

---

# 2.88 shadcn/ui baseline

The following primitives SHOULD provide the baseline where they fit the semantic pattern:

```text
Sidebar
NavigationMenu
Breadcrumb
Tabs
Command
Combobox
Input
Popover
DropdownMenu
Sheet
Drawer
Checkbox
RadioGroup
Select
Button
Badge
ScrollArea
Separator
Dialog
```

shadcn components MUST NOT dictate the information architecture.

They implement interaction and presentation after IA/pattern selection.

---

# 2.89 Security alignment

Navigation visibility MUST NOT be authorization.

A hidden destination MUST remain protected at:

```text
route
API
data
action
```

levels.

Search MUST NOT reveal restricted records through:

- suggestions;
- result counts;
- autocomplete;
- recent items;
- snippets;
- filter counts.

Sensitive query parameters SHOULD NOT be placed in URLs.

---

# 2.90 Data & Database alignment

Search and filtering MUST reflect actual data semantics.

Do NOT build client-side filtering over partial data and present it as global dataset filtering.

Large collections SHOULD use server-side:

```text
search
filtering
sorting
pagination
```

unless the complete relevant collection is intentionally local.

Filter values SHOULD derive from authoritative metadata where practical.

---

# 2.91 API alignment

Search APIs SHOULD distinguish:

```text
query
filters
sort
cursor/page
scope
```

rather than encode the entire request in a single opaque string unless query-language semantics explicitly require it.

Query/state normalization SHOULD allow equivalent URLs to produce equivalent results.

---

# 2.92 State Management alignment

Navigation state SHOULD NOT be duplicated across:

```text
router
global store
component local state
```

without a reason.

If URL state is canonical, components SHOULD derive from the URL/router.

Browser history MUST remain coherent.

---

# 2.93 Forms & Validation alignment

Unsaved-state guards depend on the Forms/State standards.

Search fields SHOULD NOT present validation errors merely because no results exist.

No results is a valid search outcome.

Invalid query syntax is a validation/error condition.

Those states MUST remain distinct.

---

# 2.94 Accessibility alignment

All navigation/search/filter controls MUST preserve:

- keyboard operation;
- visible focus;
- logical order;
- accessible names;
- current state;
- expanded/selected state;
- sufficient target size;
- reflow.

WAI-ARIA patterns provide normative interaction guidance for breadcrumbs, comboboxes, menu buttons, and tabs.  
https://www.w3.org/WAI/ARIA/apg/patterns/

---

# 3. Anti-patterns

## 3.1 Designing navigation before IA

Do NOT start with:

```text
"We want a left sidebar."
```

before understanding the content and task structure.

---

## 3.2 Org-chart navigation

Do NOT expose internal departmental structure when it does not match user mental models.

---

## 3.3 Generic top-level labels

Avoid:

```text
Manage
Tools
Resources
Solutions
Other
More
```

as primary categories when more specific language is possible.

---

## 3.4 Icon-only primary navigation

Do NOT expect users to memorise unfamiliar sidebar icons.

---

## 3.5 Multiple competing global navs

Do NOT create a sidebar taxonomy and a top-bar taxonomy that both claim to be the primary hierarchy.

---

## 3.6 Tabs for unrelated destinations

Do NOT place unrelated application areas inside an in-page tab control.

NN/g specifically warns against mixing navigation-tab and in-page-tab behaviours.  
https://www.nngroup.com/articles/tabs-used-right/

---

## 3.7 Breadcrumb history

Do NOT construct:

```text
Home > Search > Result > Edit
```

from the user's click history.

Breadcrumbs communicate hierarchy.

---

## 3.8 Current state by colour only

Current location MUST NOT depend solely on blue text, background hue, or another colour distinction.

---

## 3.9 Broken Back

Do NOT make Back:

- lose search state;
- return to the same page;
- exit the application unexpectedly;
- step through every individual typed query character.

---

## 3.10 SPA history spam

Do NOT push a new browser-history entry for each:

```text
keystroke
hover
menu open
map pixel movement
```

---

## 3.11 Unsaved-warning fatigue

Do NOT display a discard warning when nothing meaningful changed.

---

## 3.12 Search scope ambiguity

Avoid:

```text
Search…
```

when it is unclear whether the search covers:

```text
this table
this tenant
all records
the current map
the entire product
```

---

## 3.13 Hidden submitted query

Do NOT clear the user's search field after showing results.

---

## 3.14 Autocomplete as inaccessible dropdown

Do NOT render suggestions as pointer-only `<div>` elements.

Use an accessible combobox/listbox pattern.  
https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

---

## 3.15 Autocomplete noise

Do NOT fill suggestion menus with:

- unrelated promotions;
- trending queries;
- irrelevant actions;

when they obscure direct matches.

---

## 3.16 Unsafe fuzzy matching

Do NOT silently fuzzy-match sensitive unique identifiers to a different record.

---

## 3.17 Fake instant search

Do NOT fire expensive server queries on every un-debounced keystroke merely to call the interface "instant."

---

## 3.18 Zero-results dead end

Do NOT show only:

```text
No results.
```

Contextual recovery SHOULD be provided.

---

## 3.19 Error equals zero results

Network/search-engine failure MUST NOT appear as a legitimate zero-result response.

---

## 3.20 Filter drawer with invisible state

After mobile filters are applied, the result screen MUST indicate that filtering remains active.

---

## 3.21 Hidden filters

Do NOT require users to reopen a multi-page filter panel merely to determine what currently limits the result set.

Baymard's applied-filter research shows why persistent filter context materially improves orientation.  
https://baymard.com/research-articles/how-to-design-applied-filters

---

## 3.22 Filter Boolean ambiguity

Do NOT make users guess whether two selected options mean:

```text
A AND B
```

or:

```text
A OR B
```

---

## 3.23 Stale facet counts

Do NOT display filter counts that are known to be incorrect.

---

## 3.24 Reset-all ambiguity

"Reset" MUST NOT unpredictably clear query, filters, sort, columns, and layout preference together.

---

## 3.25 Map pan destroys list

Panning a map MUST NOT silently destroy the user's result context unless viewport-driven search is an intentional, visible pattern.

---

## 3.26 Hover equals navigation

Hovering a map feature or result MUST NOT change route/history.

---

## 3.27 Command-palette-only IA

A command palette is an accelerator, not a replacement for discoverable navigation.

---

## 3.28 Destructive fuzzy commands

Do NOT allow:

```text
Delete …
Archive …
Revoke …
```

to execute accidentally from ambiguous fuzzy matching.

---

## 3.29 Settings junk drawer

Do NOT add each new feature's options to one unstructured:

```text
General
```

page.

---

## 3.30 Scope ambiguity in settings

Users MUST NOT have to guess whether an option modifies:

```text
their profile
the workspace
the tenant
all users
```

---

# 4. Wayfinding QA Checklist

## Information architecture

- [ ] Top-level information model is documented.
- [ ] Navigation was derived from IA rather than vice versa.
- [ ] Labels use user/domain terminology.
- [ ] Equivalent concepts use consistent labels.
- [ ] Breadth/depth trade-offs were tested with realistic content.
- [ ] Generic categories such as "More" do not hide primary domains unnecessarily.

## Global navigation

- [ ] Exactly one primary global-navigation model is obvious.
- [ ] Current section is visible.
- [ ] Labels remain visible where discoverability matters.
- [ ] Sidebar/top navigation does not duplicate competing taxonomies.
- [ ] Mobile transformation preserves essential destinations.
- [ ] Overflow contains secondary, not primary, tasks.

## Breadcrumbs and location

- [ ] Breadcrumb represents hierarchy.
- [ ] Breadcrumb does not represent browser history.
- [ ] Current page is programmatically identified.
- [ ] Deep pages expose enough ancestry for orientation.
- [ ] Page heading, breadcrumb, sidebar state, and URL agree.

## URLs

- [ ] Important entities have stable URLs.
- [ ] Stable views are deep-linkable.
- [ ] Material filters/search state are serialised where useful.
- [ ] URLs contain no prohibited sensitive state.
- [ ] Ephemeral hover/menu state is absent from URLs.
- [ ] Shared URLs reproduce the intended useful context.

## History

- [ ] Browser Back returns to meaningful prior state.
- [ ] Search → record → Back restores search state.
- [ ] Scroll restoration works where appropriate.
- [ ] Keystrokes do not spam browser history.
- [ ] Popovers/tooltips do not create route entries.
- [ ] Forward navigation remains meaningful after Back.

## Unsaved state

- [ ] Guard triggers only for actual unsaved change.
- [ ] Discard action is explicit.
- [ ] Safe action is clear.
- [ ] Guard does not loop.
- [ ] Autosave state is truthful.
- [ ] Closing/reloading behaviour has been tested.

## Search

- [ ] Search scope is explicit.
- [ ] Query remains visible after submission.
- [ ] Submitted vs instant behaviour is intentional.
- [ ] Suggestions are keyboard accessible.
- [ ] Suggestions distinguish entity/query/action types.
- [ ] Typo handling is appropriate to domain risk.
- [ ] Relevant synonyms are supported.
- [ ] Result ranking logic is defined.
- [ ] Search errors are distinct from zero results.

## Search results

- [ ] Results are distinguishable from one another.
- [ ] Result title/identifier is meaningful.
- [ ] Snippet explains match context.
- [ ] Status and metadata are available where useful.
- [ ] Matching term highlighting is restrained.
- [ ] Result count has defined semantics.
- [ ] Permission-sensitive information is not leaked.

## Zero results

- [ ] Original query remains visible.
- [ ] Applied filters remain visible.
- [ ] Contextual recovery is offered.
- [ ] Clear-filter/broaden-scope options exist where useful.
- [ ] Spell/synonym suggestions are safe.
- [ ] Generic "try again" is not the only guidance.

## Filters

- [ ] Filter placement fits count and complexity.
- [ ] Within-facet multi-select semantics are defined.
- [ ] Cross-facet Boolean semantics are defined.
- [ ] Applied filters are visible after controls close.
- [ ] Individual filters can be removed.
- [ ] Clear-all has explicit scope.
- [ ] Facet counts are correct or omitted.
- [ ] Filter state is serialized where shareability matters.
- [ ] Saved filter sets have stable ownership/names.

## Map + list

- [ ] Map and list share one result model.
- [ ] Hover synchronizes non-destructively.
- [ ] Selection synchronizes.
- [ ] Filtering updates both.
- [ ] Pan behaviour has explicit semantics.
- [ ] "Search this area" is used when automatic refresh would destabilise work.
- [ ] Selected feature can deep-link where necessary.

## Keyboard

- [ ] Global navigation is keyboard usable.
- [ ] Skip-to-content mechanism exists where applicable.
- [ ] Tabs follow expected arrow-key behaviour.
- [ ] Search suggestions follow combobox interaction.
- [ ] Menu/overflow controls expose correct semantics.
- [ ] Focus remains visible.
- [ ] Focus order matches visual/semantic order.

## Command palette

- [ ] Visible discovery trigger exists.
- [ ] Shortcut is documented.
- [ ] Recents are permission-aware.
- [ ] Navigation and actions are distinguishable.
- [ ] Destructive actions have safeguards.
- [ ] Arrow/Enter/Escape behaviour works.
- [ ] Empty/no-match state is useful.
- [ ] Core features remain discoverable without the palette.

## Settings

- [ ] Settings IA is independently designed.
- [ ] Personal/workspace/organisation scope is clear.
- [ ] Settings pages are deep-linkable.
- [ ] Permission restrictions are clear.
- [ ] Enforced policy is distinguished from editable preference.
- [ ] Large settings spaces support findability.
- [ ] Terminology matches the rest of the product.

## Security and data

- [ ] Hidden navigation is not treated as authorization.
- [ ] Search suggestions do not leak restricted entities.
- [ ] Filter counts do not leak restricted data.
- [ ] Recents re-check authorization.
- [ ] URL state contains no forbidden sensitive values.
- [ ] Search/filter operations apply to the authoritative dataset scope.

---

# 5. Canonical Summary

Search, Navigation & Wayfinding follow this hierarchy:

```text
information architecture
        ↓
naming / taxonomy
        ↓
URL architecture
        ↓
global navigation
        ↓
contextual navigation
        ↓
breadcrumbs / current-state cues
        ↓
search + filtering
        ↓
deep links + browser history
        ↓
expert accelerators
```

The governing rules are:

```text
Design the IA before choosing the navigation.

Navigation tells users:
where they can go
and where they currently are.

Use labels users recognise.

Prefer visible navigation
when space and task frequency allow it.

A sidebar is global structure.
Tabs are alternate views inside one context.
Anchors navigate one continuous document.
Breadcrumbs show hierarchy, not history.

Stable objects need stable URLs.

Shareable application state should be deep-linkable.

Do not serialize ephemeral UI state.

Back must behave like Back.

Search scope must be explicit.

Keep the submitted query visible.

Autocomplete should improve the query,
not merely save keystrokes.

Use combobox semantics for search suggestions.

Typo tolerance must respect domain risk.

Zero results are a recovery state,
not a dead end.

Search and filtering are not the same operation.

Show applied filters outside the filter panel.

Define AND/OR facet semantics.

Use URL-serialized filters when reproducibility matters.

Map and list must share one selection/result model.

Do not let map movement silently destroy context.

A command palette is an accelerator,
not hidden primary navigation.

Settings need their own information architecture.

Always identify whether a setting belongs to:
the user,
the workspace,
or the organisation.

Visibility is never authorization.
```

A **Gold Standard 2026** product allows a user to enter through:

```text
the home page
a deep link
search
a saved filter
a bookmark
a browser Back action
another application
a command palette
```

and still answer, without guesswork:

```text
Where am I?

What am I looking at?

What scope is active?

What filters are changing what I see?

How did the system interpret my search?

What will happen if I go Back?

How do I return to a broader context?

Can I share this exact useful state?
```

If the correct answers depend on remembering the user's click path, the wayfinding architecture is incomplete.

---

# 6. Sources

1. **Nielsen Norman Group — The Difference Between Information Architecture and Navigation**  
   https://www.nngroup.com/articles/ia-vs-navigation/

2. **Nielsen Norman Group — Breadcrumbs: 11 Design Guidelines for Desktop and Mobile**  
   https://www.nngroup.com/articles/breadcrumbs/

3. **Nielsen Norman Group — Navigation: You Are Here**  
   https://www.nngroup.com/articles/navigation-you-are-here/

4. **Nielsen Norman Group — Left-Side Vertical Navigation on Desktop**  
   https://www.nngroup.com/articles/vertical-nav/

5. **Nielsen Norman Group — Tabs, Used Right**  
   https://www.nngroup.com/articles/tabs-used-right/

6. **Nielsen Norman Group — The Hamburger-Menu Icon Today: Is it Recognizable?**  
   https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/

7. **Nielsen Norman Group — How to Make Navigation Discoverable on Mobile**  
   https://www.nngroup.com/articles/find-navigation-mobile-even-hamburger/

8. **W3C WAI — ARIA Authoring Practices: Patterns**  
   https://www.w3.org/WAI/ARIA/apg/patterns/

9. **W3C WAI — Breadcrumb Pattern**  
   https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/

10. **W3C WAI — Combobox Pattern**  
    https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

11. **W3C WAI — Tabs Pattern**  
    https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

12. **W3C — WCAG 2.2**  
    https://www.w3.org/TR/WCAG22/

13. **Baymard Institute — Autocomplete Suggestions**  
    https://baymard.com/ecommerce-design-examples/34-autocomplete-suggestions

14. **Baymard Institute — Ecommerce Search UX 2026**  
    https://baymard.com/research-articles/ecommerce-search-query-types

15. **Baymard Institute — Display Applied Filters in an Overview**  
    https://baymard.com/research-articles/how-to-design-applied-filters

16. **Baymard Institute — Product List UX Best Practices**  
    https://baymard.com/research-articles/current-state-product-list-and-filtering

17. **Baymard Institute — Findability and Discoverability**  
    https://baymard.com/blog/findability-vs-discoverability-ux

18. **Baymard Institute — Mobile Search and Category Navigation**  
    https://baymard.com/research-articles/mobile-ecommerce-search-and-navigation

19. **shadcn/ui — Command**  
    https://ui.shadcn.com/docs/components/base/command

20. **shadcn/ui — Sidebar**  
    https://ui.shadcn.com/docs/components/base/sidebar

21. **shadcn/ui — Breadcrumb**  
    https://ui.shadcn.com/docs/components/base/breadcrumb

22. **shadcn/ui — Navigation Menu**  
    https://ui.shadcn.com/docs/components/base/navigation-menu

23. **shadcn/ui — Tabs**  
    https://ui.shadcn.com/docs/components/base/tabs

A key contract in this chapter is that **URL/history state is part of wayfinding**, not merely router implementation. That makes deep linking, Back behavior, search restoration, filters, tabs, map selection, and multi-pane workflows testable as one coherent navigation system rather than a collection of local components.
