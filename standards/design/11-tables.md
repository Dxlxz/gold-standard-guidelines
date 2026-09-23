---
id: "tables"
title: "Tables & Data Grid"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "tables", "data", "grid"]
applies_to: ["data"]
related: ["aesthetic"]
legacy_number: 55
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 61719
provenance: baseline

---

The standard below treats tables and data grids as distinct interaction models, defines the retrieval/rendering choices explicitly, and makes server-side correctness, authorization, stable row identity, and accessibility part of the component contract.

# Tables & Data Grid — Gold Standard 2026

**Status:** Canonical  
**Standard level:** Gold Standard 2026  
**Canonical placement:** **Components → Tables & Data Grid → Layout Patterns → Accessibility**  
**Component baseline:** shadcn/ui  
**Behavioural baseline:** TanStack Table or an equivalent approved headless table engine  
**Applies to:** Read-only tables, administrative tables, analytical tables, interactive data grids, selectable datasets, editable grids, virtualised datasets, and tabular data embedded in application workflows.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements unless an approved exception is documented.

---

# 1. Purpose

## 1.1 Objective

This standard defines how structured datasets MUST be presented, navigated, queried, selected, edited, exported, and made accessible.

It governs:

- table versus data-grid selection;
- density modes;
- headers and column behaviour;
- sorting;
- filtering and search;
- faceted filtering;
- pagination;
- infinite scrolling;
- virtualisation;
- row selection;
- bulk actions;
- inline editing;
- column visibility and ordering;
- column resizing and pinning;
- sticky headers and columns;
- responsive transformation;
- loading, empty, error, and stale states;
- export;
- keyboard interaction;
- semantic and assistive-technology behaviour.

This standard MUST be applied together with:

- Security;
- Data & Database;
- API;
- State Management;
- Forms & Validation;
- Accessibility;
- Design Tokens;
- Component;
- Pattern;
- Layout standards.

A table MUST NOT be treated as a purely visual component. The correctness of the dataset, query operations, permissions, interaction state, and semantic structure are part of the table contract.

---

## 1.2 Table versus data grid

The system MUST distinguish a **table** from a **data grid**.

A **table** is primarily a tabular presentation of information. It MAY contain links, buttons, checkboxes, menus, sorting controls, and similar controls while retaining native HTML table semantics.

A **data grid** is an interactive composite widget in which users navigate cells or rows using a managed keyboard interaction model and MAY perform spreadsheet-like operations such as direct cell editing, row manipulation, or advanced selection.

Native HTML table semantics SHOULD be used whenever they adequately represent the interaction.

An interface MUST NOT receive `role="grid"` merely because it:

- sorts;
- filters;
- paginates;
- contains checkboxes;
- contains row actions;
- has sticky headers;
- has horizontal scrolling.

WAI-ARIA defines `grid` as a composite widget requiring managed focus and directional keyboard navigation, whereas a table is a non-composite tabular structure. Native HTML table elements are preferred where possible. citeturn999313search0turn999313search1

If `role="grid"` is used, the implementation MUST implement the corresponding keyboard and focus-management contract. Partial grid semantics MUST NOT be shipped.

---

## 1.3 shadcn/ui baseline

shadcn/ui MUST provide the visual component baseline.

Simple tables SHOULD begin with the canonical shadcn/ui `Table` primitives.

Complex tables SHOULD compose the canonical table primitives with TanStack Table or the approved project table engine.

The table engine MUST remain headless with respect to the Design System. It MAY own data-model behaviour but MUST NOT become an independent visual system.

The current shadcn/ui Data Table guidance follows this composition model and explicitly treats individual data tables as use-case-specific rather than prescribing one universal data-grid component. citeturn726245search0turn726245search1

Projects SHOULD extract reusable table capabilities such as:

- sortable headers;
- filter controls;
- selection controls;
- pagination controls;
- column-management controls;
- bulk-action bars;
- table-state displays;

into canonical application components when those capabilities recur.

A feature team MUST NOT create a separate table design system for an individual module.

---

## 1.4 Governing principle

Tables MUST optimise for:

1. **correctness;**
2. **comprehension;**
3. **efficient comparison;**
4. **predictable interaction;**
5. **accessible navigation;**
6. **appropriate information density.**

Visual compactness MUST NOT override these priorities.

The primary purpose of a table is to expose relationships between rows and columns. If that relationship is not useful, another Pattern SHOULD be used.

---

# 2. Rules

## 2.1 Selecting the correct presentation pattern

A table SHOULD be used when users need to compare multiple records against consistent attributes.

A list SHOULD be preferred when:

- records do not share a meaningful column structure;
- reading order matters more than comparison;
- each item contains heterogeneous content;
- the dominant interaction is opening an item rather than comparing values.

Cards SHOULD NOT be used as a default substitute for tables.

A data grid SHOULD be used only where the interaction genuinely benefits from grid-style navigation or editing.

A spreadsheet-like interface MUST NOT be introduced merely because the dataset is large.

The Pattern standard MUST determine the interaction model before table styling is applied.

---

## 2.2 Data correctness and row identity

Every row MUST have a stable logical identifier.

Row identity MUST be derived from a canonical entity identifier or stable composite key.

Array index, rendered position, current page offset, or visible order MUST NOT be used as persistent row identity.

Stable row identity MUST be used for:

- React keys;
- row selection;
- optimistic updates;
- editing;
- bulk actions;
- expansion state;
- cross-page selection where supported.

Sorting, filtering, pagination, or virtualisation MUST NOT silently transfer row state to a different record.

Database primary keys MUST NOT automatically be exposed to users if Security or domain rules prohibit doing so.

The UI MAY use an opaque stable identifier while displaying a separate human-readable identifier.

---

## 2.3 Column definition

Each column MUST have a defined semantic purpose.

A column definition SHOULD specify, as applicable:

- stable column identifier;
- heading;
- data accessor;
- data type;
- formatting;
- alignment;
- sortable state;
- filterable state;
- editable state;
- default visibility;
- hideability;
- width constraints;
- pinning eligibility;
- responsive priority;
- export behaviour.

Column behaviour MUST NOT be inferred solely from the displayed string.

Numbers MUST be treated as numbers.

Dates and timestamps MUST be treated according to their canonical data type and timezone semantics.

Domain enums MUST be treated as domain values rather than arbitrary text.

Sorting MUST operate on canonical values, not visually formatted strings, unless lexical ordering is explicitly the domain requirement.

For example, a currency column MUST NOT sort using formatted strings such as `$1,000` and `$900`.

---

## 2.4 Column headers

Every data column MUST have an understandable header.

Headers SHOULD be concise.

Abbreviations that are not widely understood MUST be expanded through visible text or an accessible explanation.

Headers MUST remain visually and semantically associated with their columns.

Interactive column headers MUST preserve the header's semantic role.

For sortable native tables, the sorting control SHOULD normally be a button inside the column header rather than making an unsemantic container clickable.

A sortable header MUST make its interactivity discoverable without relying solely on hover.

The current sort state MUST be represented visually and programmatically.

For single-column sorting, the active sorted header MUST expose the appropriate `aria-sort` value. WAI-ARIA defines `ascending`, `descending`, `other`, and `none`; sortable-table guidance places the sort control within the header and exposes the active direction on the header itself. citeturn999313search2turn999313search3

---

## 2.5 Multi-level and grouped headers

Grouped headers MAY be used where columns form a genuine semantic group.

Header grouping MUST reflect the underlying data relationship.

Decorative grouping MUST NOT introduce unnecessary multi-row headers.

Complex header associations MUST remain understandable to assistive technologies.

Where native `scope` is insufficient for a complex structure, explicit header associations MUST be implemented and tested.

Merged header cells MUST NOT be used merely to produce visual centring.

---

## 2.6 Column alignment

Alignment MUST follow content type.

As a default:

- prose and categorical text SHOULD align to the inline start;
- numeric quantities SHOULD align consistently, normally to the inline end;
- monetary values SHOULD use consistent numeric alignment;
- compact state or icon columns MAY be centred;
- row actions SHOULD use consistent placement.

Alignment MUST support both LTR and RTL layouts.

Physical assumptions such as always using `left` and `right` SHOULD be avoided where logical inline-start and inline-end behaviour is available.

---

## 2.7 Density modes

Applications MAY provide multiple table density modes when data volume and usage frequency justify them.

The canonical density model SHOULD contain no more than:

- **Comfortable** — lower-density reading and mixed-content tables;
- **Default** — standard application use;
- **Compact** — expert, high-frequency, data-dense workflows.

Exact heights, spacing, typography, and control dimensions MUST be provided by Design Tokens and Components.

Density MUST be applied systematically.

Feature code MUST NOT create local pseudo-density modes through arbitrary padding overrides.

Compact density MAY reduce:

- row padding;
- whitespace;
- non-essential decorative spacing.

Compact density MUST NOT reduce:

- text legibility;
- visible focus;
- semantic information;
- touch target requirements where touch interaction is expected;
- error or validation visibility.

Density SHOULD NOT alter the meaning or available capabilities of a table.

A user density preference SHOULD be persisted through the approved preference mechanism when the product supports user-customisable density.

---

## 2.8 Row height and wrapping

Row height SHOULD be predictable but MUST accommodate legitimate content.

Single-line rows SHOULD truncate only when the omitted value remains discoverable through an approved mechanism.

Tooltips MUST NOT be the only way to access essential data.

Multi-line wrapping SHOULD be allowed when reading the complete value is more important than maintaining uniform row height.

A table MUST NOT force every value onto one line solely to preserve a visually compact grid.

Variable-height rows MAY be used, but virtualised tables MUST explicitly support them rather than assuming a fixed row height incorrectly.

---

## 2.9 Column width

Columns SHOULD be sized according to information need rather than distributed uniformly.

Identifier, status, number, date, action, and free-text columns SHOULD normally use different width strategies.

Columns SHOULD define sensible minimum and maximum widths where applicable.

A column MUST NOT collapse until its content or controls become ambiguous.

Wide free-text content SHOULD normally have a bounded width.

The table SHOULD avoid expanding to the width of its longest unbroken value.

Long identifiers, URLs, paths, or machine values MUST have a defined wrapping, truncation, or overflow policy.

---

## 2.10 Column resizing

User-resizable columns MAY be provided when users benefit materially from controlling information density.

Resizing MUST enforce minimum and maximum constraints.

The resize affordance MUST be visible or reasonably discoverable.

Column resizing MUST NOT cause unrelated columns to become unusable.

If keyboard-accessible resizing cannot be implemented directly, an equivalent accessible means of changing widths SHOULD be provided where column width customisation is essential.

Column-width preferences MAY be persisted as user preferences.

Persisted widths MUST be invalidated or migrated safely if the underlying column model changes.

---

## 2.11 Sticky headers

Column headers SHOULD remain visible during vertical scrolling when:

- the table is long;
- column meaning would otherwise be lost;
- the table has its own meaningful scrolling context.

Sticky headers MUST remain part of the semantic table or grid structure.

A duplicated visual header detached from semantics MUST NOT create duplicate accessible content.

Sticky positioning MUST account for application chrome and nested scroll containers.

Headers MUST NOT cover the first visible row.

Background, border, and elevation tokens MUST ensure that sticky headers remain visually distinguishable from scrolling rows.

---

## 2.12 Sticky and pinned columns

Columns MAY be pinned when persistent context materially improves usability.

Good candidates include:

- primary record identity;
- row-selection control;
- essential status;
- row actions in specialised workflows.

Pinning MUST remain limited.

A table SHOULD NOT pin enough columns to leave insufficient space for the scrollable data region.

Pinned columns MUST have a clear visual boundary from horizontally scrolling columns.

Overlapping pinned columns MUST NOT occur.

Pinned columns MUST preserve correct reading and navigation order.

Column pinning MUST NOT change underlying semantic column order merely for visual convenience unless the semantic model is updated accordingly.

RTL behaviour MUST be explicitly supported.

---

## 2.13 Horizontal overflow

Wide tables MAY scroll horizontally.

Horizontal scrolling MUST be visually discoverable when overflow exists.

Critical row identity SHOULD remain available through:

- pinning;
- sticky context;
- another approved responsive technique.

The page MUST NOT accidentally create two competing horizontal scroll containers around the same table.

Hidden scrollbars MUST NOT make horizontal overflow undiscoverable.

Keyboard and pointer users MUST be able to reach horizontally overflowed content.

---

## 2.14 Sorting

Sorting MUST be deterministic.

If the selected sort field contains duplicate values, the backend or client SHOULD apply a stable secondary key where necessary to prevent records from appearing to move unpredictably between requests or pages.

The default sort MUST be domain-appropriate.

The table MUST NOT invent a default ordering that implies meaning not present in the data.

Sortable columns MUST identify their sortable state.

Activating a sortable header SHOULD normally cycle through the supported states predictably.

The application MAY support:

- ascending;
- descending;
- unsorted.

If unsorted means "return to server/default order," that behaviour MUST be explicit in implementation.

### 2.14.1 Client versus server sorting

Client-side sorting MUST be used only when the client possesses the complete authoritative dataset being sorted.

If only one server page or subset is loaded, sorting that subset MUST NOT be represented as sorting the entire result set.

For server-backed datasets, sorting SHOULD occur in the API/database query.

The API sort contract MUST use approved field identifiers rather than accepting arbitrary raw SQL or database expressions.

### 2.14.2 Multi-column sorting

Multi-column sorting MAY be provided for expert workflows.

When enabled:

- sort priority MUST be understandable;
- each sorted column SHOULD indicate its direction;
- sort priority SHOULD be visible when more than one key is active;
- the query contract MUST preserve sort order deterministically.

Because `aria-sort` does not encode multi-sort priority comprehensively, additional accessible explanation SHOULD be provided when multi-column sort materially affects interpretation. citeturn999313search3

---

## 2.15 Global search

Global search SHOULD be used when users reasonably conceptualise the operation as searching across the dataset.

The interface MUST define what search covers.

Search MUST NOT silently search only visible rows if the interface implies that it searches all results.

For remote datasets, search SHOULD normally execute server-side.

Search queries SHOULD be debounced where appropriate, but the debounce MUST NOT create an ambiguous state.

The interface SHOULD indicate when a query is being updated.

Search terms that materially define the current view SHOULD normally be represented in navigable state such as the URL, subject to Security requirements.

Sensitive search terms MUST NOT be placed in URLs when doing so would violate the Security standard.

---

## 2.16 Column filters

Column filters SHOULD match the column's semantic data type.

Examples include:

- text contains/exact match;
- enum selection;
- Boolean state;
- numeric range;
- date or date-time range;
- entity selector;
- status selection.

Free-text fields SHOULD NOT receive arbitrary dropdown filter interfaces merely for visual consistency.

Date filtering MUST define timezone and inclusive/exclusive boundary semantics.

Numeric filtering MUST distinguish exact values from ranges.

Filter semantics MUST match the API contract.

The client MUST NOT label an operation "contains" while the backend performs prefix or exact matching.

---

## 2.17 Filter visibility and active state

Active filters MUST remain discoverable.

Complex tables SHOULD expose active filters as:

- visible controls;
- filter chips;
- a filter summary;
- another approved equivalent.

Users MUST have a clear mechanism to remove individual filters.

Tables with multiple filters SHOULD provide **Clear all** or an equivalent reset.

Reset MUST restore the canonical unfiltered state and SHOULD preserve unrelated preferences such as density or column width.

The interface SHOULD display the number of active filters when filters are hidden inside a popover, drawer, or toolbar menu.

---

## 2.18 Faceted filtering

Faceted filtering MAY be used for categorical or bounded datasets.

Facet options SHOULD communicate useful context such as available values and, where appropriate, result counts.

Facet counts MUST represent the defined query scope.

A count derived only from the current visible page MUST NOT be presented as the count for the complete dataset.

For remotely paginated data, authoritative facet options and counts SHOULD normally be computed server-side.

Facet counts MUST respect:

- authorization;
- row-level security;
- current query context;
- applicable filters.

A user MUST NOT be able to infer restricted records through facet counts.

Facet behaviour MUST explicitly define whether counts represent:

- the current complete filter context;
- the context excluding the facet's own active filter;
- another documented query model.

Different facets MUST NOT silently use inconsistent counting models.

---

## 2.19 Query state

Sorting, filtering, search, grouping, pagination, and other query operations MUST have a single canonical state owner.

Shareable dataset views SHOULD encode durable user-intent state in the URL where appropriate.

Typical candidates include:

- search;
- filters;
- sort;
- page;
- page size.

Ephemeral interaction state SHOULD normally remain local.

Typical examples include:

- currently hovered row;
- open row-action menu;
- active resize drag;
- temporary edit draft before submission.

User preferences MAY be persisted separately.

Typical examples include:

- density;
- visible columns;
- column order;
- column widths;
- pinned columns.

The State Management standard MUST determine ownership and persistence.

The table engine MUST NOT become an undeclared second application-state store.

TanStack Table permits controlled table-state slices to be lifted into application or URL state; canonical implementations SHOULD use that capability deliberately rather than allowing conflicting state owners. citeturn726245search2

---

## 2.20 Pagination, infinite scroll, and virtualisation

These mechanisms solve different problems and MUST NOT be treated as interchangeable.

| Mechanism | Primary purpose | SHOULD be used when | SHOULD NOT be the default when |
|---|---|---|---|
| **Pagination** | Divide a dataset into navigable result sets | Users need stable pages, precise navigation, bulk administration, auditability, or predictable location | The experience is primarily continuous discovery |
| **Infinite scroll / incremental loading** | Continuously append content | Users browse or discover sequential content and exact position is secondary | Users need precise record location, select-all, reliable footer access, audit workflows, or bounded navigation |
| **Virtualisation** | Reduce DOM/rendering cost | Large rendered row/column counts cause measurable performance problems | The dataset is small enough to render normally |

Virtualisation is a rendering optimisation.

Virtualisation MUST NOT be described as pagination.

Virtualisation MUST NOT replace a required backend data-retrieval strategy.

A system MAY combine:

- server pagination + virtualised rendering;
- cursor loading + virtualisation;
- client dataset + virtualisation.

The responsibilities MUST remain separate.

---

## 2.21 Pagination

Pagination SHOULD be the default large-dataset navigation model for administrative and record-management interfaces unless another Pattern is materially better.

Pagination controls MUST make available, where known:

- current position;
- previous/next navigation;
- reasonable page navigation;
- page size where user control provides value.

A table MUST return to a valid page when filtering reduces the number of pages.

Changing a query SHOULD normally reset pagination to the first applicable page unless maintaining position is demonstrably correct.

Page size options SHOULD be limited to useful values.

Extremely large page sizes MUST NOT be provided merely as a workaround for missing export or bulk-operation functionality.

### 2.21.1 Server pagination

Large or authoritative datasets SHOULD paginate at the API/database layer.

Offset pagination MAY be appropriate for stable administrative datasets where page-number navigation matters.

Cursor/keyset pagination SHOULD be considered for large, rapidly changing, or high-performance result sets.

A cursor MUST be opaque to clients unless its structure is explicitly part of the API contract.

Stable sorting MUST accompany pagination.

A pagination implementation MUST NOT allow duplicate or missing rows merely because records share the primary sort value.

---

## 2.22 Result counts

The interface MAY show total result counts when the value is authoritative and economically reasonable to compute.

The UI MUST NOT fabricate an exact count when the backend does not provide one.

If the backend supplies an estimate, the UI MUST represent it as an estimate where that distinction matters.

Result-count queries SHOULD NOT create disproportionate database load solely to satisfy a decorative UI convention.

"Showing 1–50" MAY be preferable to an expensive exact total in appropriate systems.

---

## 2.23 Infinite scroll

Infinite scroll SHOULD be reserved for discovery-oriented experiences.

It MUST NOT be the default for:

- security administration;
- financial records;
- approval queues;
- audit logs;
- bulk record maintenance;
- datasets where users routinely navigate to an exact result position.

Infinite-scroll views MUST preserve meaningful restoration when users open a record and navigate back.

Loading additional records MUST NOT unexpectedly shift keyboard focus.

The user MUST receive understandable loading and end-of-results feedback.

Important page controls MUST NOT be placed permanently below an effectively unbounded infinite-scroll region.

---

## 2.24 Virtualisation

Virtualisation SHOULD be introduced in response to demonstrated rendering cost, not by default.

Virtualised tables MUST preserve:

- keyboard interaction;
- row identity;
- focus;
- selection;
- scroll restoration;
- sticky behaviour;
- accessibility semantics.

When the DOM contains only a subset of the logical table, implementations MAY need to expose total row/column counts and logical row/column positions through appropriate ARIA properties. WAI-ARIA specifically defines `aria-rowcount`, `aria-colcount`, `aria-rowindex`, and `aria-colindex` for cases where the DOM does not contain the complete table or grid. citeturn999313search1turn999313search3

Virtualisation MUST be tested with supported browser and assistive-technology combinations.

Visual virtualisation MUST NOT cause a screen reader user to receive incorrect row counts or row positions.

---

## 2.25 Row interaction

A row MAY open a detail view when the Pattern clearly communicates that behaviour.

A whole row SHOULD NOT become a generic click target when the row also contains multiple interactive controls and the resulting interaction becomes ambiguous.

If the row is clickable:

- keyboard access MUST be equivalent;
- interactive descendants MUST remain separately operable;
- focus treatment MUST be clear;
- text selection SHOULD NOT accidentally trigger navigation.

Double-click MUST NOT be the only mechanism for an essential action.

Hover MUST NOT be required to discover critical row actions.

---

## 2.26 Row selection

Row selection MUST represent a clear domain action.

Selection MUST use stable row identifiers.

Checkboxes SHOULD normally be used for explicit multi-row selection.

The selection control MUST have an accessible name identifying the row.

The header selection checkbox SHOULD represent:

- unchecked when no applicable rows are selected;
- checked when all rows in its defined scope are selected;
- indeterminate when some are selected.

The scope of **Select all** MUST be explicit.

The application MUST distinguish between:

- select all visible rows;
- select all rows on this page;
- select all loaded rows;
- select all results matching the current filter.

These MUST NOT be treated as equivalent.

---

## 2.27 Cross-page selection

Cross-page selection MAY be provided for high-value bulk workflows.

When enabled, the interface MUST make the selection scope unmistakable.

A pattern such as:

**50 rows on this page selected. Select all 3,842 matching results**

MAY be used where appropriate.

The system MUST NOT silently convert page selection into dataset-wide selection.

If selection represents **all matching results**, the backend operation MUST use the authoritative filter/query definition rather than attempting to transmit thousands of client-side row IDs unnecessarily.

Excluded rows, if supported, MUST be represented explicitly in the selection model.

Changing a filter while a dataset-wide selection is active MUST have defined behaviour.

The application SHOULD either:

- clear the selection;
- recompute the scope explicitly;
- ask the user to confirm the changed scope.

Silent scope mutation MUST NOT occur.

---

## 2.28 Bulk actions

Bulk actions MUST appear only when applicable.

The bulk-action interface MUST state the number and scope of selected records.

Destructive bulk actions MUST follow the destructive-action Pattern and Security standard.

The backend MUST authorize every affected record or authoritative query scope.

The presence of a row in the client selection MUST NOT be treated as authorization.

Bulk operations SHOULD provide a meaningful result summary when individual records can succeed or fail independently.

The system MUST NOT report complete success when only part of the operation succeeded.

Bulk operations MUST account for records that changed after selection.

Where concurrency is material, the API SHOULD define conflict behaviour explicitly.

---

## 2.29 Row actions

Routine row actions SHOULD use consistent placement.

Primary high-frequency row actions MAY be visible.

Secondary actions MAY be placed in an action menu.

An ellipsis menu MUST NOT contain the only discoverable route to a critical primary task when that task is expected to be frequent.

Menu contents SHOULD remain stable enough for users to build familiarity.

Actions unavailable because of permission or state SHOULD follow the Component and Security standards.

Security-sensitive permissions MUST NOT be inferred from whether a control is visible.

The API MUST enforce authorization independently.

---

## 2.30 Inline editing

Inline editing SHOULD be used when it materially reduces workflow friction.

It SHOULD be preferred for:

- short fields;
- simple categorical values;
- low-context edits;
- repeated high-frequency maintenance.

Inline editing SHOULD NOT be the default for:

- complex records;
- highly consequential changes;
- multi-field validation dependencies;
- security settings;
- actions requiring explanation;
- changes requiring extensive supporting information.

### 2.30.1 Edit state

Editable and read-only states MUST remain distinguishable.

A cell MUST NOT appear editable only after the user accidentally clicks it.

Edit activation MUST be keyboard accessible.

If a grid interaction model is used, edit-mode entry and exit MUST follow the documented grid keyboard model.

### 2.30.2 Commit and cancel

Editing MUST define:

- when a draft begins;
- how it is committed;
- how it is cancelled;
- what happens on blur;
- what happens when navigation occurs;
- what happens when the API fails.

`Enter`, `Escape`, `Tab`, pointer interaction, and focus movement MUST behave predictably for the selected interaction model.

Blur MUST NOT silently commit a high-consequence value unless that behaviour is intentional and safe.

### 2.30.3 Validation

Inline editing MUST follow Forms & Validation standards.

Client validation MAY provide immediate feedback but MUST NOT replace authoritative server validation.

Validation errors MUST remain associated with the edited field.

The user MUST NOT lose an invalid draft merely because a row re-rendered.

### 2.30.4 Optimistic updates

Optimistic updates MAY be used when:

- failure is uncommon;
- the operation is reversible;
- misleading temporary success creates little risk.

Optimistic state MUST NOT disguise a failed authoritative save.

High-consequence changes SHOULD wait for confirmed server success before presenting final success state.

---

## 2.31 Concurrency

Editable tables MUST define behaviour when the underlying record changes concurrently.

Possible strategies include:

- optimistic concurrency tokens;
- version numbers;
- ETags;
- timestamp/version checks;
- explicit conflict resolution.

The UI MUST NOT silently overwrite newer authoritative data when concurrency protection is required by the domain.

Conflict errors SHOULD explain what changed and provide a safe recovery path.

The Data & Database and API standards own the authoritative concurrency model.

---

## 2.32 Column visibility

Users MAY hide optional columns.

Essential context columns SHOULD NOT be hideable if hiding them would make records ambiguous.

Column visibility MUST be represented as preference state rather than deleting data semantics.

Hiding a column MUST NOT be considered a security mechanism.

Unauthorized data MUST NOT be returned merely because its column is hidden.

Hidden columns SHOULD NOT automatically appear in export unless the export Pattern explicitly states that export includes more than the current visible view.

---

## 2.33 Column ordering

Column reordering MAY be provided for advanced workflows.

The default order MUST remain domain-informed.

User ordering preferences MAY be persisted.

System-required column relationships SHOULD be protected where arbitrary ordering would harm comprehension.

Selection, hierarchy, identity, and action columns MAY have restricted positions.

Column reordering MUST NOT change export field semantics unless export is explicitly configured to follow visible column order.

---

## 2.34 Column management

Tables with many configurable columns SHOULD provide a single canonical column-management interface.

The interface MAY control:

- visibility;
- ordering;
- pinning;
- width reset;
- restore defaults.

Column-management state SHOULD be versionable.

If a product release removes, renames, or replaces columns, stale user preferences MUST fail safely.

The application SHOULD provide **Reset to default** where extensive customisation exists.

---

## 2.35 Responsive behaviour

Responsive transformation MUST preserve the user's ability to understand the relationship between values and their labels.

Tables MUST NOT automatically transform into visually attractive cards if cross-row comparison is essential.

The preferred mobile strategies, in order of applicability, SHOULD include:

1. preserve the table with horizontal overflow;
2. reduce optional columns according to responsive priority;
3. pin or preserve the record identity column;
4. expose secondary information through row expansion or a detail surface;
5. transform records into labelled stacked structures only when comparison is no longer the dominant mobile task.

Breakpoint values belong to Layout and Design Tokens.

### 2.35.1 Mobile column priority

Columns SHOULD have a defined responsive priority where automatic reduction occurs.

Critical identity and action context MUST survive.

Automatically hidden information MUST remain accessible through an approved mechanism.

A user MUST NOT be forced to rotate the device solely to perform a core workflow.

### 2.35.2 Card transformation

When a table becomes a card/list representation:

- every value MUST retain an understandable label;
- actions MUST remain equivalent;
- selection semantics MUST remain understandable;
- sort and filter state MUST be preserved;
- important information MUST NOT disappear merely because it lacks room.

The mobile representation MAY be structurally different while preserving domain semantics.

---

## 2.36 Loading state

Initial table loading SHOULD preserve expected page structure.

Headers SHOULD normally remain visible if the column model is already known.

Skeleton rows MAY be used.

Skeletons SHOULD resemble table structure without simulating real data too precisely.

A full loading replacement SHOULD NOT occur when useful existing data can remain visible during a refetch.

For background query changes, stale content MAY remain visible with a restrained updating state when permitted by the State Management and API standards.

Loading MUST NOT be represented as empty data.

---

## 2.37 Empty state

An empty table MUST distinguish:

- no records exist;
- no records match the current query.

These are different states.

A zero-record system state MAY explain how to create or import the first record.

A no-results state SHOULD:

- identify that filters/search produced no results;
- preserve the active query;
- provide a useful reset or adjustment path.

The table MUST NOT render several blank rows as an empty state.

---

## 2.38 Error state

A query failure MUST be visually distinct from an empty result.

The interface SHOULD preserve useful table context where possible.

Recoverable errors SHOULD provide a retry action.

Error messages MUST NOT expose:

- raw SQL;
- stack traces;
- database names;
- infrastructure topology;
- access tokens;
- sensitive request payloads;
- other prohibited implementation detail.

Partial errors MUST be represented accurately.

A failed background refresh SHOULD NOT necessarily destroy previously valid displayed data.

The UI MAY retain stale data and identify the refresh problem where that is safer and more useful.

---

## 2.39 Stale and refreshed data

Tables backed by frequently changing data SHOULD have a defined freshness model.

The system MAY provide:

- explicit refresh;
- automatic refresh;
- event-driven updates;
- stale indicators.

Automatic updates MUST NOT unpredictably move a record while the user is actively interacting with it.

Sorting or filtering changes caused by live updates SHOULD be handled deliberately.

An edited, selected, or focused row SHOULD NOT disappear or relocate mid-interaction without an appropriate strategy.

---

## 2.40 Export

Export is a data operation, not merely a front-end convenience.

Export MUST have an explicit scope.

The interface MUST distinguish, where applicable:

- export visible rows;
- export selected rows;
- export current page;
- export all filtered results;
- export complete authorised dataset.

The default MUST NOT be ambiguous.

### 2.40.1 Export authority

Large or authoritative exports SHOULD be generated from the server-side query model.

Client-generated exports MUST NOT imply that they contain the complete dataset when only a page or subset is loaded.

Export queries MUST reuse or faithfully reproduce the authoritative:

- filters;
- search;
- sort where relevant;
- tenant scope;
- row-level authorization;
- field-level authorization.

### 2.40.2 Export security

Export MUST follow Security and Data & Database standards.

The export operation MUST NOT expose fields merely because they exist in the database.

Hidden UI columns MUST NOT be treated as authorization boundaries.

Sensitive fields SHOULD be excluded by default according to data classification rules.

Export permissions MAY be stricter than read permissions.

High-risk exports SHOULD be auditable where required.

CSV and spreadsheet-compatible exports MUST mitigate formula-injection risks for untrusted text values according to the Security standard.

### 2.40.3 Export formatting

Export data SHOULD preserve machine-usable values where that is the purpose of the export.

Display formatting and export formatting MAY differ.

For example:

- machine exports MAY use canonical ISO date/time formats;
- user-facing spreadsheets MAY use appropriate display formats.

The contract MUST be intentional.

Null, blank, zero, unavailable, and redacted values MUST remain distinguishable where domain semantics require it.

---

## 2.41 Native table accessibility

Ordinary data tables SHOULD use semantic HTML:

- `<table>`;
- `<caption>` where appropriate;
- `<thead>`;
- `<tbody>`;
- `<tr>`;
- `<th>`;
- `<td>`.

Native semantics SHOULD be preferred over recreating a table with generic containers. WAI-ARIA guidance explicitly recommends native HTML table elements where possible. citeturn999313search1turn999313search4

Column headers MUST use header semantics.

Simple column headers SHOULD use the appropriate `scope`.

Row headers SHOULD be identified semantically where the first or another column functions as the row's label.

The table MUST have an accessible name or understandable surrounding context.

Captions MAY be visually hidden where the visible page heading already provides sufficient context, but the accessible naming relationship MUST remain clear.

---

## 2.42 Sort accessibility

Sortable headers MUST be keyboard operable.

The interactive target MUST receive a visible focus indication.

Sort direction MUST NOT be communicated through icon orientation alone.

The active sort state MUST be programmatically exposed.

Icons distinguishing unsorted, ascending, and descending states SHOULD differ by more than colour alone.

If additional instructions are necessary, they SHOULD be provided without forcing every header to announce repetitive instructions. The WAI sortable-table example uses a description associated with the table to avoid unnecessary repeated verbosity. citeturn999313search2

---

## 2.43 Selection accessibility

Selection checkboxes MUST have accessible names.

A row checkbox SHOULD identify the row using its human-readable record identity.

The select-all checkbox MUST communicate its scope.

Indeterminate visual state MUST have equivalent programmatic state.

Selection changes SHOULD be announced when the effect would otherwise be unclear, particularly when dataset-wide selection is enabled.

Bulk actions MUST remain keyboard reachable immediately enough that users can operate efficiently after selection.

Focus MUST NOT unexpectedly jump when the bulk-action interface appears.

---

## 2.44 Data-grid accessibility

An implementation using the ARIA grid pattern MUST support managed focus.

Only the appropriate element within the composite grid SHOULD participate in the ordinary page tab sequence at a time.

Directional keyboard navigation MUST follow the approved grid Pattern.

Grid cells containing editing controls or widgets MUST have an explicit mechanism for transitioning between:

- grid navigation;
- interaction inside the cell.

The application MUST NOT intercept arrow keys blindly when those keys are required by an active editor such as:

- text input;
- combobox;
- slider;
- radio group.

The WAI-ARIA grid pattern specifically distinguishes cell-to-cell navigation from operating widgets or editing content within a cell. citeturn999313search0

Advanced data grids MUST be tested with the project's supported assistive-technology matrix.

Passing automated accessibility tests alone is insufficient for a custom grid interaction model.

---

## 2.45 Focus preservation

Sorting, filtering, pagination, refreshing, virtualisation, editing, and row updates MUST have deliberate focus behaviour.

Querying MUST NOT routinely reset focus to the document start.

If a focused row disappears because of a user-triggered operation, focus SHOULD move to the nearest logical location.

Closing a row menu, dialog, or inline editor SHOULD restore focus appropriately.

Virtualisation MUST NOT destroy and recreate focused content without preserving a valid focus model.

---

## 2.46 Announcements

Dynamic tables SHOULD communicate material asynchronous changes to assistive technologies where those changes would otherwise be missed.

Useful announcements MAY include:

- result count after a filter;
- page change;
- selection scope;
- save success;
- validation failure;
- bulk-operation outcome.

Live-region announcements SHOULD be concise.

Routine rendering details MUST NOT create excessive screen-reader chatter.

---

## 2.47 Design Tokens relationship

Reusable table visual values MUST resolve to Design Tokens.

This includes:

- row heights;
- cell padding;
- header typography;
- borders;
- selection backgrounds;
- hover states;
- focus styles;
- sticky elevation;
- pinned-column boundaries;
- density values;
- skeleton treatment;
- resize handles.

Feature code MUST NOT invent independent table spacing or colour systems.

Semantic status colours MUST follow the Aesthetic & Visual Language and Design Tokens standards.

---

## 2.48 Component standard relationship

The canonical table implementation SHOULD expose reusable capabilities rather than a single feature-heavy universal component.

Components MAY include:

- Table;
- DataTable;
- DataTableToolbar;
- DataTableColumnHeader;
- DataTablePagination;
- DataTableFilters;
- DataTableViewOptions;
- DataTableBulkActions;
- DataTableEmptyState.

Actual component naming MAY vary by project.

A reusable capability MUST have a clear contract.

A table MUST NOT enable every available feature simply because the table engine supports it.

Feature composition SHOULD be explicit.

---

## 2.49 Pattern standard relationship

The Pattern standard MUST own decisions involving:

- master-detail;
- row expansion;
- batch administration;
- editable grids;
- comparison tables;
- audit tables;
- searchable directories;
- responsive record browsing.

Tables MUST NOT independently invent workflow patterns.

A row detail drawer, for example, SHOULD follow the canonical drawer/sheet Pattern rather than implementing table-specific modal behaviour.

---

## 2.50 API relationship

Remote tables MUST have a defined query contract.

Where supported, the API SHOULD define:

- search;
- filters;
- sort keys;
- sort direction;
- cursor or page;
- page size;
- total-count semantics;
- facet semantics;
- export scope.

Clients MUST NOT send raw database expressions as sort or filter instructions.

Field identifiers MUST be allowlisted by the API.

Invalid sort/filter parameters MUST fail predictably or fall back only according to a documented contract.

Client and server query semantics MUST agree.

A UI filter MUST NOT appear active if the API ignored it.

---

## 2.51 Data & Database relationship

Database access for tables MUST follow authoritative domain rules.

Filtering, sorting, pagination, facet counting, and export SHOULD be executed against appropriately indexed access paths for large datasets.

UI design MUST NOT force pathological queries solely because a particular table interaction appears convenient.

Null semantics MUST remain explicit.

The UI MUST NOT collapse distinct database/domain states such as:

- `NULL`;
- empty string;
- zero;
- false;
- missing relation;
- unknown;
- redacted.

Database ordering MUST be deterministic for paginated result sets.

The table standard does not override database transaction, integrity, isolation, or concurrency requirements.

---

## 2.52 Security relationship

The server remains the authorization boundary.

The following MUST NOT be considered security mechanisms:

- hidden columns;
- hidden row actions;
- disabled controls;
- client filtering;
- omitted rows in local state;
- client-side pagination.

Every server operation MUST enforce applicable:

- authentication;
- authorization;
- tenant boundaries;
- row-level permissions;
- field-level permissions.

Facet counts MUST NOT reveal restricted records.

Search suggestions MUST NOT reveal restricted records.

Exports MUST NOT reveal restricted records.

Bulk operations MUST NOT bypass per-record or query-scope authorization.

Sensitive query values MUST follow logging and URL-handling requirements.

---

## 2.53 Forms & Validation relationship

Editable tables MUST use the same validation rules as equivalent standalone forms.

The table MUST NOT create a second weaker validation system.

Canonical schemas SHOULD be shared where architecture permits.

Server validation remains authoritative.

Inline errors MUST be understandable and associated with the corresponding field.

A table SHOULD NOT allow multiple invalid cells to become visually indistinguishable from successfully saved values.

Unsaved changes MUST have an explicit lifecycle.

Navigation away from material unsaved edits SHOULD follow the canonical unsaved-changes Pattern.

---

## 2.54 State Management relationship

Table state MUST be divided intentionally into:

**Query state**
- search;
- filters;
- sort;
- page/cursor;
- page size.

**Preference state**
- density;
- visible columns;
- column order;
- width;
- pinning.

**Ephemeral interaction state**
- active menu;
- hovered row;
- resize drag;
- temporary edit draft;
- focus.

**Domain state**
- selected entities when selection has workflow meaning;
- editing transactions;
- server mutations.

These categories MUST NOT be persisted indiscriminately.

State ownership MUST follow the State Management standard.

Server/cache state MUST NOT be duplicated into local component state without a specific need.

---

## 2.55 Performance

Table performance MUST be measured rather than inferred from row count alone.

Optimisation MAY include:

- server-side query operations;
- pagination;
- cursor retrieval;
- memoised column definitions;
- efficient row rendering;
- virtualisation;
- deferred non-critical rendering.

Virtualisation SHOULD NOT be introduced before simpler causes of poor performance are understood.

Rendering thousands of hidden rows MUST NOT be used as an implementation shortcut.

Expensive formatters or cell components SHOULD be profiled.

Table updates SHOULD avoid unnecessary rerendering of unrelated rows.

Performance optimisation MUST NOT weaken semantics, focus behaviour, or state correctness.

---

## 2.56 Internationalisation

Tables MUST support locale-aware presentation where required.

Formatting SHOULD use canonical locale mechanisms for:

- numbers;
- currency;
- percentages;
- dates;
- times.

Sorting semantics MUST distinguish display locale from canonical data ordering where necessary.

Translated header strings MUST be allowed to expand.

Column widths MUST NOT assume English label length.

RTL behaviour MUST be supported by the underlying Component and Layout systems.

Pinned columns, horizontal scrolling, action placement, and resize behaviour MUST be tested in RTL where the product supports it.

---

## 2.57 Testing

Canonical table components MUST be tested beyond static rendering.

Test coverage SHOULD include, as applicable:

- empty data;
- one row;
- many rows;
- long values;
- null values;
- duplicate sort values;
- loading;
- refetching;
- query errors;
- partial mutation errors;
- sorting;
- filtering;
- facets;
- pagination boundaries;
- row selection;
- cross-page selection;
- inline editing;
- validation;
- column visibility;
- column pinning;
- horizontal overflow;
- responsive behaviour;
- keyboard interaction;
- screen-reader semantics;
- RTL;
- light/dark mode.

Virtualised and ARIA-grid implementations MUST receive explicit accessibility and focus testing.

---

# 3. Anti-patterns

The following are non-conformant unless explicitly covered by an approved Pattern or exception.

## 3.1 Table-by-default

Every dataset is displayed as a table regardless of whether users need cross-record comparison.

## 3.2 Fake grid semantics

`role="grid"` is added to an ordinary table without implementing managed grid focus and keyboard interaction.

## 3.3 DIV table recreation

A semantic table is rebuilt from generic `div` elements without a demonstrated need.

## 3.4 Client-side partial sorting

Only the currently loaded server page is sorted while the interface implies that the full dataset has been sorted.

## 3.5 Client-side partial filtering

Only loaded rows are searched or filtered while the control implies that the complete dataset is queried.

## 3.6 Facet-count leakage

Facet counts expose records that the current user is not authorised to access.

## 3.7 Index identity

Row selection or editing uses array index as record identity.

## 3.8 Ambiguous select-all

A header checkbox says "Select all" without distinguishing the current page from all matching records.

## 3.9 Hidden-column security

Sensitive data is returned to the browser and merely hidden through column visibility.

## 3.10 Cardification on mobile

Every table automatically becomes independent cards, destroying efficient comparison and increasing scrolling.

## 3.11 Infinite-scroll administration

An administrative or audit dataset uses infinite scroll despite requiring precise location, selection, and return navigation.

## 3.12 Virtualisation as architecture

Virtualisation is used to hide the absence of appropriate pagination, API filtering, or database query design.

## 3.13 Skeleton replacement during refetch

Useful existing data disappears and is replaced by skeletons whenever a background query refresh occurs.

## 3.14 Blank-row empty state

An empty dataset is represented as a header followed by empty table rows.

## 3.15 Silent destructive bulk action

A destructive action executes against a large selection without exposing the selection scope or consequence.

## 3.16 Implicit inline save

High-impact changes save automatically on blur without a clear interaction contract.

## 3.17 Lost edit draft

A failed save or row rerender silently discards the user's edit.

## 3.18 Raw backend error

SQL errors, stack traces, database identifiers, or internal API messages are rendered inside a table error state.

## 3.19 Column overload

Dozens of columns are visible by default because the data model contains dozens of fields.

## 3.20 Pin everything

Large numbers of columns are pinned until the scrollable region becomes unusable.

## 3.21 Action-menu dumping

Every possible row action is placed in an ellipsis menu without prioritising common operations.

## 3.22 Hover-only actions

Important actions exist only while a pointing device hovers over a row.

## 3.23 Colour-only status

Rows or cells communicate critical state entirely through background or text colour.

## 3.24 Arbitrary density

Individual tables override cell padding locally to appear "more compact."

## 3.25 Fake total

The UI presents an exact total result count even though the backend supplied only a page or estimate.

## 3.26 Export current DOM

"Export all" serialises only the rows currently mounted in a paginated or virtualised table.

## 3.27 Unauthorised export expansion

Export includes hidden or backend fields that the user is not authorised to access.

## 3.28 Formulas from untrusted CSV values

User-controlled spreadsheet values are exported without handling formula-injection risk.

## 3.29 Unstable pagination

Rows disappear, duplicate, or move unpredictably between pages because pagination lacks deterministic ordering.

## 3.30 Scroll-container nesting

The table introduces unnecessary nested horizontal or vertical scrolling regions that make navigation difficult.

---

# 4. Checklist

A table or data grid conforms to this standard only when the following can be answered **yes** where applicable.

### Pattern and semantics

- [ ] A table is the correct Pattern for the information.
- [ ] Native table semantics are used unless a true interactive grid is required.
- [ ] `role="grid"` is used only with a complete grid keyboard/focus model.
- [ ] The table has understandable accessible context or naming.
- [ ] Row and column headers have correct semantics.

### Data correctness

- [ ] Every row has stable identity.
- [ ] Array position is not used as persistent row identity.
- [ ] Null, empty, zero, false, unknown, and redacted values remain distinct where required.
- [ ] Sorting uses canonical values.
- [ ] Paginated ordering is deterministic.
- [ ] Display formatting does not alter domain semantics.

### Density and layout

- [ ] Density uses canonical Design Tokens.
- [ ] Compact mode preserves accessibility.
- [ ] Column widths reflect content type.
- [ ] Long values have an explicit overflow policy.
- [ ] Sticky headers remain semantically correct.
- [ ] Pinned columns leave sufficient usable viewport.
- [ ] Horizontal overflow is discoverable.

### Sorting

- [ ] Sortable columns are discoverable.
- [ ] Sort state is visible and programmatically exposed.
- [ ] Server-backed partial data is sorted server-side.
- [ ] Duplicate sort values have deterministic tie-breaking where necessary.
- [ ] Multi-column sort priority is understandable if enabled.

### Search and filtering

- [ ] Search scope is clear.
- [ ] Filters match their data type and API semantics.
- [ ] Active filters remain discoverable.
- [ ] Individual filters can be removed.
- [ ] A reset mechanism exists where appropriate.
- [ ] Facet counts represent the declared scope.
- [ ] Facets do not leak unauthorised information.

### Retrieval model

- [ ] Pagination, infinite scroll, and virtualisation were selected for distinct reasons.
- [ ] Infinite scroll is limited to an appropriate discovery workflow.
- [ ] Virtualisation is used as a rendering optimisation, not a data-access substitute.
- [ ] Result-count semantics are truthful.
- [ ] Page/cursor state remains valid after query changes.

### Selection and bulk actions

- [ ] Selection uses stable record IDs.
- [ ] Header selection correctly represents checked/unchecked/indeterminate state.
- [ ] Select-all scope is explicit.
- [ ] Cross-page selection has a defined query model.
- [ ] Filter changes have defined selection behaviour.
- [ ] Bulk actions display affected record scope.
- [ ] The backend independently authorises the bulk operation.

### Editing

- [ ] Inline editing is appropriate for the field and workflow.
- [ ] Edit activation is discoverable and keyboard accessible.
- [ ] Commit, cancel, blur, and navigation semantics are defined.
- [ ] Client and server validation follow Forms & Validation standards.
- [ ] Failed saves preserve or recover the user's draft appropriately.
- [ ] Concurrency behaviour is defined where required.
- [ ] Optimistic success does not conceal authoritative failure.

### Column management

- [ ] Essential columns cannot be hidden accidentally.
- [ ] Column visibility is not used as a security boundary.
- [ ] Ordering and width preferences are persisted only where useful.
- [ ] Pinning has explicit constraints.
- [ ] Stored preferences survive schema evolution safely.
- [ ] A reset-to-default mechanism exists for substantial customisation.

### Responsive behaviour

- [ ] Mobile preserves labels and domain meaning.
- [ ] Comparison is not destroyed unnecessarily through card transformation.
- [ ] Critical record identity remains available.
- [ ] Secondary columns remain accessible if automatically hidden.
- [ ] Core tasks are usable without device rotation.

### Loading, empty, and error

- [ ] Loading is distinct from empty.
- [ ] Initial loading and background refetch are treated appropriately.
- [ ] "No data" and "no matching results" are distinct.
- [ ] Errors preserve useful context where possible.
- [ ] Backend implementation details are not exposed.
- [ ] Partial failures are represented truthfully.

### Export

- [ ] Export scope is explicit.
- [ ] "All" means the actual authorised query scope.
- [ ] Large/full exports use authoritative server data where appropriate.
- [ ] Filters and authorization are reapplied server-side.
- [ ] Sensitive fields follow data-classification rules.
- [ ] Spreadsheet/CSV injection risk is addressed.
- [ ] Null/redacted semantics remain correct.

### Accessibility

- [ ] Headers use correct semantic markup.
- [ ] Sort controls are keyboard operable.
- [ ] `aria-sort` or equivalent semantics represent active sorting.
- [ ] Selection controls have row-specific accessible names.
- [ ] Focus remains visible.
- [ ] Dynamic query changes do not cause unexplained focus loss.
- [ ] Virtualisation exposes correct logical position/count semantics where necessary.
- [ ] A true data grid implements the complete approved keyboard model.
- [ ] Grid editing does not steal keys required by controls inside cells.
- [ ] Supported assistive technologies have been tested for advanced grids.

### Cross-standard alignment

- [ ] Server authorization remains authoritative.
- [ ] API query semantics match the visible controls.
- [ ] Database queries support the required access pattern safely.
- [ ] Table state has a clear canonical owner.
- [ ] Editable values use canonical validation.
- [ ] Visual values resolve to Design Tokens.
- [ ] Repeated behaviours use canonical Components.
- [ ] Workflow composition follows the Pattern standard.

---

# 5. Canonical summary

A table MUST be used for **meaningful tabular comparison**, not merely because records can be arranged in rows.

A data grid MUST be reserved for genuinely interactive grid behaviour and MUST implement the corresponding managed keyboard and focus model.

**Native HTML table semantics SHOULD be the default.**

**shadcn/ui Table components MUST provide the visual baseline; complex behaviour SHOULD be composed with the approved headless table engine rather than implemented as an unrelated grid system.**

**Every row MUST have stable identity. Array position MUST NOT represent record identity.**

**Sorting, filtering, faceting, pagination, export, and bulk operations MUST operate over the authoritative intended dataset. Client operations over a partially loaded page MUST NOT be presented as global operations.**

**Pagination, infinite scrolling, and virtualisation solve different problems. Virtualisation is a rendering optimisation, not a data-access strategy.**

**Selection scope MUST always be explicit, particularly when selection crosses pages or represents all filtered records.**

**Bulk actions MUST be authorised server-side and MUST accurately report partial failure.**

**Inline editing MUST follow Forms & Validation, API, State Management, and concurrency rules. Editing convenience MUST NOT weaken data integrity.**

**Column visibility MUST NOT become a security mechanism. Hidden data that a user is not permitted to access MUST NOT be returned to the client.**

**Export MUST have an explicit scope and MUST reapply authorization, filtering, data-classification, and security requirements independently of the visible DOM.**

**Compact density MUST increase information efficiency without reducing legibility, focus visibility, interaction accessibility, or semantic clarity.**

**Sticky headers, pinned columns, column customisation, and responsive transformation MUST preserve the underlying information relationships rather than merely preserve desktop appearance.**

**Loading MUST NOT be confused with empty. Empty MUST NOT be confused with filtered-out. Error MUST NOT be represented as no data.**

**Accessible semantics, keyboard interaction, focus preservation, and assistive-technology behaviour are part of the table architecture—not post-implementation enhancements.**

The Gold Standard is achieved when a user can **understand, query, compare, select, modify, and export a dataset efficiently without losing correctness, context, accessibility, or security as the dataset scales.**

This is designed to sit directly beneath the Component standard and above the corresponding Layout Patterns and Accessibility implementation detail.
