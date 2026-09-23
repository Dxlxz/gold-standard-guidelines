---
id: "layout-patterns"
title: "Layout Patterns Catalogue"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "layout", "patterns", "catalogue"]
applies_to: ["ui", "data", "team"]
related: []
legacy_number: 50
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 63903
provenance: baseline

---

Below is the canonical chapter, structured for direct insertion at **Design Tokens → Layout → Layout Patterns → Facade → Components**. The specification distinguishes geometric layouts from interaction patterns and treats responsive transformation, scroll ownership, accessibility, state, and shadcn/ui composition as part of each pattern’s contract.

# Layout Patterns — Gold Standard 2026

**Canonical placement:** Design Tokens → Layout → **Layout Patterns** → Facade → Components  
**Status:** Normative  
**Baseline:** shadcn/ui  
**Accessibility target:** WCAG 2.2 AA or higher  
**Applies to:** application shells, product surfaces, authenticated applications, administration interfaces, operational tools, portals, and responsive web applications.

---

# 1. Purpose

Layout Patterns define the canonical page-level compositions permitted across the product system.

A Layout Pattern is larger than a component and more specific than a spacing or grid token. It defines:

- the semantic regions of a page;
- their visual relationship;
- their responsive transformation;
- scroll ownership;
- reading and focus order;
- persistence and navigation expectations;
- the relationship between application state and layout state;
- the appropriate shadcn/ui composition primitives.

Layout Patterns MUST NOT redefine component behaviour, authorization rules, API contracts, data ownership, form-validation semantics, or design tokens. Those concerns remain owned by their respective standards.

A page MUST begin with the simplest canonical pattern capable of supporting its information architecture and interaction model.

A page MUST NOT acquire additional columns, panes, drawers, or independently scrolling regions solely because screen space is available.

The canonical patterns are:

1. One-column
2. Two-column
3. Three-column
4. Master-detail
5. List-detail
6. Dashboard grid
7. Split-pane
8. Canvas + inspector
9. Feed
10. Gallery
11. Wizard
12. Full-bleed vs contained
13. Dense vs comfortable

Patterns 1–3 primarily describe **geometry**. Patterns 4–11 primarily describe **interaction and information architecture**. Patterns 12–13 are **composition modifiers** and MUST be applied only in conjunction with an appropriate base pattern.

---

# 2. Global Rules

## 2.1 Pattern selection

The visual number of columns MUST NOT be used as the sole basis for pattern selection.

For example:

- a navigation rail beside an article is a two-column composition;
- a customer table beside the selected customer record is list-detail;
- an IDE-style navigator, editor, and properties panel is a multi-pane interaction pattern rather than merely three columns.

Teams MUST choose the semantic pattern first and derive its geometry second.

A page SHOULD use one primary pattern. Nested sub-layouts MAY use another pattern where the nested region forms a coherent component or task surface.

Patterns MUST NOT be arbitrarily combined until the resulting page no longer has a clear primary reading order or scroll owner.

---

## 2.2 Responsive vocabulary

The following terms describe responsive behaviour, not physical device detection:

| Class | Reference viewport | Meaning |
|---|---:|---|
| Mobile / compact | `< 48rem` | Single-primary-surface presentation |
| Tablet / medium | `48rem–79.999rem` | Limited simultaneous regions |
| Desktop / wide | `≥ 80rem` | Full canonical composition where useful |

Projects MUST represent these thresholds through Design Tokens or equivalent responsive abstractions.

Implementations SHOULD use container queries when the layout is embedded within another surface and viewport queries would misrepresent the available space.

User-agent sniffing MUST NOT determine layout composition.

Breakpoint changes MUST represent a meaningful change in information architecture, not merely accommodate a specific device model.

All layouts MUST remain operable at the WCAG reflow reference width of 320 CSS pixels unless the content genuinely requires two-dimensional presentation, such as maps, diagrams, large data tables, or spatial editors. citeturn943383search3turn943383search4

---

## 2.3 Layout tokens

Implementations MUST consume semantic Layout and Design Tokens rather than scattering arbitrary dimensions through page code.

The system SHOULD expose semantic tokens equivalent to:

```text
layout.content.max
layout.reading.max
layout.gutter
layout.section-gap
layout.column-gap
layout.sidebar.min
layout.sidebar.default
layout.sidebar.max
layout.inspector.default
layout.panel.min
layout.header.height
layout.density.comfortable
layout.density.dense
layout.breakpoint.compact
layout.breakpoint.medium
layout.breakpoint.wide
```

A pattern MAY override a token through an explicitly documented pattern variant.

Pattern implementations MUST NOT redefine foundational spacing, radius, typography, elevation, colour, or focus-ring values already owned by Design Tokens.

---

## 2.4 Semantic regions and accessibility

Each page SHOULD have one primary `main` landmark. Navigation, complementary content, search, header, and footer regions SHOULD use their native HTML landmarks wherever applicable. Landmark proliferation MUST be avoided; regions exist to communicate meaningful page structure, not every visual container. citeturn402545search0turn402545search1

DOM order MUST preserve a meaningful reading and interaction sequence.

CSS `order`, grid placement, absolute positioning, or responsive repositioning MUST NOT create a visual order that materially contradicts DOM reading or keyboard focus order. WCAG requires focus sequences to preserve meaning and operability. citeturn943383search2turn943383search5

Repeated application chrome SHOULD provide a skip mechanism to primary content. citeturn943383search0

Author-created sticky regions MUST NOT fully obscure the currently focused control. citeturn624085search5

Pointer targets MUST satisfy WCAG 2.2 target-size requirements. Comfortable touch-oriented layouts SHOULD use targets materially larger than the 24 × 24 CSS pixel minimum. citeturn943383search1turn943383search6

Layout alone MUST NOT communicate state. Selection, active state, validation, hierarchy, or status MUST have programmatic and non-spatial representation.

---

## 2.5 Scroll ownership

The document viewport SHOULD be the default vertical scroll owner.

Nested vertical scrolling MUST be introduced only when independently persistent regions materially improve the task.

A page MUST NOT contain ambiguous stacked scroll containers in which users cannot predict which region receives wheel, touch, keyboard, or assistive-technology scrolling.

Where independent pane scrolling is required:

- each pane MUST have an explicit bounded size;
- focus MUST remain visible;
- sticky content MUST be scoped to the correct scroll root;
- restoring navigation SHOULD restore the appropriate pane scroll position;
- the pane MUST remain keyboard reachable without trapping focus.

shadcn/ui `ScrollArea` MAY be used where custom cross-browser presentation is required; native overflow SHOULD remain the default where custom treatment provides no value. shadcn/ui explicitly exposes `ScrollArea` as an augmentation of native scrolling. citeturn624085search0

Horizontal document scrolling MUST NOT be used to compensate for a layout that should have reflowed.

---

## 2.6 State management

Layout state MUST remain distinct from domain state.

Examples of layout state include:

```text
sidebar collapsed
panel width
active responsive pane
density preference
inspector visibility
dashboard arrangement
```

Layout state MAY be persisted when persistence improves continuity.

Shareable navigation state SHOULD be represented in the URL when doing so produces a stable, meaningful route.

Sensitive values, secrets, authorization decisions, or unnecessary personal data MUST NOT be persisted solely to restore layout.

Responsive presentation state SHOULD normally be derived from layout conditions rather than persisted as competing application state.

A server-rendered layout MUST avoid hydration-dependent structural flashes where practical.

---

## 2.7 Security alignment

Visual absence is not authorization.

Hiding a pane, column, action, route, inspector field, or responsive control MUST NOT be treated as an access-control mechanism.

The API and server-side authorization layers MUST enforce all data and operation permissions independently of layout.

A collapsed, hidden, off-canvas, or unmounted region MUST NOT expose data the current principal is unauthorized to retrieve.

URL-addressable selections MUST NOT make otherwise protected records accessible.

---

## 2.8 Data and API alignment

Layout composition MUST NOT dictate inefficient data-fetching behaviour.

Independent regions SHOULD have explicit loading, error, empty, and stale states where they can fail independently.

Opening a detail or inspector region SHOULD lazily retrieve expensive secondary data unless it is already required for the primary surface.

Responsive transformation MUST NOT cause duplicate requests merely because content moves between panes, tabs, sheets, or stacked regions.

Large collections SHOULD use pagination, incremental loading, or virtualization according to the Data and Component standards rather than relying on unconstrained DOM growth.

---

## 2.9 Forms and validation alignment

Moving a form between columns, steps, sheets, or panes MUST NOT change its validation contract.

Validation ownership remains defined by Forms & Validation.

Responsive layouts MUST preserve:

- label/control association;
- error/control association;
- error summary behaviour;
- logical focus movement;
- submit semantics;
- preservation of entered values.

Layout changes MUST NOT silently reset an in-progress form.

---

## 2.10 shadcn/ui baseline

shadcn/ui components are the default composition baseline, not a substitute for semantic architecture.

Relevant primitives include:

- `Sidebar`, `SidebarProvider`, `SidebarInset`, `SidebarTrigger`;
- `Sheet` and `Drawer`;
- `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`;
- `ScrollArea`;
- `Tabs`;
- `Card`;
- `Separator`;
- `Breadcrumb`;
- `Table`;
- `Dialog`;
- `Collapsible`;
- `Pagination`;
- `Skeleton`.

The current shadcn/ui `Sidebar` explicitly supports responsive/collapsible state and defines separately scrollable sidebar content; `Resizable` supplies accessible resizable panel groups; `Sheet` provides complementary off-canvas content. citeturn624085search1turn624085search2turn624085search4

Page semantics MUST remain visible in application code rather than being obscured by generic component wrappers.

---

# 3. One-Column Pattern

## 3.1 Purpose

One-column is the default canonical page composition.

It establishes a single primary reading and interaction flow and SHOULD be preferred whenever parallel regions are unnecessary.

Typical uses include:

- article and documentation pages;
- settings pages;
- forms;
- record pages;
- simple search results;
- empty states;
- confirmation pages.

## 3.2 Rules

### When to use

Use one-column when:

- content has one dominant reading order;
- secondary material can appear inline;
- tasks are sequential rather than comparative;
- additional columns would primarily create decorative whitespace.

### When NOT to use

Do NOT use one-column when:

- users must continuously compare independent regions;
- persistent navigation and content legitimately need simultaneous visibility;
- a spatial tool requires controls beside its workspace;
- flattening distinct surfaces produces excessive navigation back-and-forth.

### Canonical wireframe

```text
┌──────────────────────────────────────────────┐
│ Header / Breadcrumb / Actions                │
├──────────────────────────────────────────────┤
│                                              │
│              Primary content                 │
│              ┌──────────────┐                │
│              │              │                │
│              │              │                │
│              └──────────────┘                │
│                                              │
└──────────────────────────────────────────────┘
```

### Responsive transform

**Mobile:** MUST remain one column. Gutters reduce through tokens; content MUST NOT simply scale down.

**Tablet:** MUST remain one column unless the task itself crosses the threshold into another canonical pattern.

**Desktop:** SHOULD remain one column. Wider viewports SHOULD increase surrounding whitespace or allow media to expand according to the full-bleed modifier rather than indefinitely increasing text measure.

Long-form reading content SHOULD be constrained by a readable line-length token rather than the application maximum width.

### Scrolling

The document SHOULD own vertical scrolling.

Independent scroll areas SHOULD NOT be introduced inside the content column without a specific interaction requirement.

Sticky local controls MAY be used where they do not obscure focus or consume excessive compact-viewport height.

### Accessibility and composition

DOM order MUST match the reading sequence.

The page heading SHOULD precede task content.

Content SHOULD use semantic headings rather than cards merely to create visual sections.

A one-column page MUST NOT become a sequence of unnecessary cards nested inside cards.

## 3.3 Anti-patterns

- Stretching prose edge-to-edge on desktop.
- Adding an empty secondary column for visual symmetry.
- Wrapping every section in a bordered `Card`.
- Using horizontal scrolling for content that can reflow.
- Making a sticky header consume a material fraction of the compact viewport.

## 3.4 Checklist

- [ ] One dominant reading/task sequence exists.
- [ ] Main content has a deliberate maximum width.
- [ ] Document scroll is the primary scroll owner.
- [ ] Heading order is semantic.
- [ ] Compact view works at 320 CSS pixels.
- [ ] No decorative column has been introduced.

## 3.5 Canonical summary

**Default choice:** use one-column until the information architecture proves that simultaneous regions are necessary.

---

# 4. Two-Column Pattern

## 4.1 Purpose

Two-column presents a primary region alongside a persistent secondary region without implying a selection/detail relationship.

Typical examples include:

- documentation + table of contents;
- settings navigation + settings content;
- article + supporting sidebar;
- form + contextual guidance.

## 4.2 Rules

### When to use

Use two-column when one secondary region materially supports the primary region and benefits from simultaneous visibility.

The primary and secondary regions MUST have clear semantic roles.

### When NOT to use

Do NOT use generic two-column when the secondary panel represents:

- the selected record from a collection — use list-detail;
- properties of a spatial object — use canvas + inspector;
- an equally weighted working surface — use split-pane;
- hierarchy navigation controlling entity detail — use master-detail.

### Canonical wireframe

```text
┌────────────────────────────────────────────────────┐
│ Header                                             │
├───────────────┬────────────────────────────────────┤
│ Secondary     │ Primary                            │
│               │                                    │
│               │                                    │
│               │                                    │
└───────────────┴────────────────────────────────────┘
```

The secondary region SHOULD normally be narrower than the primary region.

### Responsive transform

**Mobile:** MUST collapse to one primary flow. Persistent navigation SHOULD become a `Sheet`, `Drawer`, disclosure, or preceding inline region according to task frequency.

**Tablet:** MAY remain two columns if both regions retain viable minimum widths. Otherwise it MUST use the mobile transform.

**Desktop:** SHOULD render both regions simultaneously when the secondary content remains useful.

A breakpoint MUST be triggered by content viability, not by preserving an arbitrary proportion.

### Scrolling

The default is document scrolling with both columns participating in one flow.

A sticky secondary column MAY remain visible within the document.

Independent scrolling SHOULD be reserved for application-style shells with persistent region boundaries.

### Accessibility and composition

The DOM SHOULD follow meaningful reading order.

Moving the secondary column visually MUST NOT create confusing focus movement.

If the secondary region is navigation, use `nav`.

If it is materially complementary content, use `aside` where appropriate.

A responsive off-canvas navigation region MUST have a labelled trigger and appropriate focus management.

shadcn/ui `Sidebar` or `Sheet` SHOULD be preferred over custom drawer mechanics where their behaviour matches the requirement.

## 4.3 Anti-patterns

- Treating two arbitrary cards as a “two-column pattern.”
- Making both columns independently scroll by default.
- Reducing the primary column below its content minimum simply to preserve the sidebar.
- Hiding necessary secondary functionality entirely on mobile.
- Using a sidebar to conceal required workflow steps.

## 4.4 Checklist

- [ ] Secondary content has a distinct semantic purpose.
- [ ] This is not actually list-detail, master-detail, split-pane, or canvas + inspector.
- [ ] Mobile provides equivalent access to the secondary region.
- [ ] Column minimum widths are tokenized.
- [ ] Scroll ownership is explicit.
- [ ] Focus order remains logical after responsive transformation.

## 4.5 Canonical summary

Two-column is for **primary + supporting region**, not for every interface that happens to contain two vertical rectangles.

---

# 5. Three-Column Pattern

## 5.1 Purpose

Three-column supports a dominant primary region with two simultaneously useful supporting regions.

It is an exceptional rather than default composition.

Common uses include:

- navigation + document + contextual index;
- application navigation + work surface + passive context;
- complex information-dense reference surfaces.

## 5.2 Rules

### When to use

Three-column SHOULD be used only where all three regions have recurring, simultaneous utility on sufficiently wide viewports.

At least one region MUST remain visually dominant.

### When NOT to use

Do NOT use three-column:

- merely to fill a wide monitor;
- where either supporting region is rarely used;
- for editor/inspector interfaces that are better represented by canvas + inspector;
- where the regions require user-controlled relative sizing — use split-pane;
- when all three regions compete for primary attention.

### Canonical wireframe

```text
┌────────────────────────────────────────────────────────────┐
│ Header                                                     │
├────────────┬───────────────────────────────┬───────────────┤
│ Support A  │ Primary                       │ Support B     │
│            │                               │               │
│            │                               │               │
│            │                               │               │
└────────────┴───────────────────────────────┴───────────────┘
```

### Responsive transform

**Mobile:** MUST expose one primary region at a time. Secondary regions MUST transform to inline disclosures, sheets, drawers, dedicated routes, or tabs according to their semantics.

**Tablet:** SHOULD ordinarily become two regions. The least essential supporting region SHOULD move off-canvas or inline.

**Desktop:** MAY expose all three regions when minimum viable widths are satisfied.

Responsive removal MUST follow information priority, not simply hide the rightmost region.

### Scrolling

Document scrolling remains preferred for document-oriented compositions.

Application-style three-column shells MAY assign independent scroll ownership to supporting regions, but the main working region MUST remain obvious.

Three simultaneous vertical scrollbars SHOULD be treated as a design warning and MUST be justified by the task model.

### Accessibility and composition

Semantic landmarks MUST describe the regions independently of their physical left/centre/right location.

Controls MUST NOT use “left panel” or “right panel” as their accessible name when the panel has a meaningful functional name.

Responsive movement MUST preserve logical DOM and focus order.

Secondary regions moved to `Sheet`/`Drawer` MUST restore focus to their invoking control on close.

## 5.3 Anti-patterns

- Three equally weighted columns.
- Three unrelated feeds.
- Forced 25/50/25 percentages irrespective of content.
- Independent scroll roots with no visible boundary.
- Hiding a critical region at intermediate widths without an alternate control.

## 5.4 Checklist

- [ ] Every region has simultaneous desktop utility.
- [ ] One region remains primary.
- [ ] Tablet has a defined two-region transformation.
- [ ] Mobile has a defined single-surface transformation.
- [ ] Region semantics do not depend on physical position.
- [ ] Scrollbars and sticky behaviour remain intelligible.

## 5.5 Canonical summary

Three-column is a **high-information exception**. It MUST earn its complexity.

---

# 6. Master-Detail Pattern

## 6.1 Purpose

Master-detail provides persistent navigation through a structured set of entities while presenting the selected entity's detail.

The master may be a tree, hierarchical navigator, grouped table, folder system, or other structural index.

## 6.2 Rules

### When to use

Use master-detail when users repeatedly move between entities and require persistent context about their position within a hierarchy or structured collection.

Selection SHOULD have stable identity.

### When NOT to use

Do NOT use master-detail for a simple homogeneous result list without structural navigation; use list-detail.

Do NOT use it where selecting an item begins a distinct workflow that deserves its own route and full page.

Do NOT render detail merely on hover.

### Canonical wireframe

```text
┌─────────────────────────────────────────────────────┐
│ Header / Context                                    │
├──────────────────┬──────────────────────────────────┤
│ Master           │ Detail                           │
│ ├─ Group A       │ Entity title                     │
│ │  ├─ Item       │                                  │
│ │  └─ Item ●     │ Detail content                   │
│ └─ Group B       │                                  │
└──────────────────┴──────────────────────────────────┘
```

### Responsive transform

**Mobile:** SHOULD become route-to-route navigation: master → detail. A back affordance MUST restore the previous master context and preferably its scroll/selection state.

**Tablet:** MAY use overlay detail or side-by-side presentation where minimum widths permit.

**Desktop:** SHOULD preserve master context while detail changes.

The detail route SHOULD be directly addressable when stable deep linking is useful.

### Scrolling

Master and detail MAY scroll independently when persistent navigation provides material productivity benefits.

Their scroll positions SHOULD be retained independently during selection changes.

Detail loading MUST NOT reset the master scroll position.

### Accessibility and composition

Selected master items MUST expose selected/current state programmatically where the component semantics support it.

Focus and selection MUST remain distinct.

Changing selection SHOULD NOT arbitrarily move keyboard focus into detail unless activation explicitly represents navigation into the detail surface.

Tree masters MUST follow tree keyboard semantics; table masters MUST follow table/grid semantics according to the relevant Component standard.

## 6.3 Anti-patterns

- Using hover as the only selection mechanism.
- Resetting the master list on every detail fetch.
- Losing hierarchy expansion state when detail changes.
- Making the master so narrow that labels become unusable.
- Visually marking selection without accessible state.
- Fetching every entity’s complete detail upfront.

## 6.4 Checklist

- [ ] Master represents meaningful structure.
- [ ] Selection identity is stable.
- [ ] Mobile has master → detail navigation.
- [ ] Master scroll/expansion state survives detail changes.
- [ ] Detail permissions are enforced server-side.
- [ ] Focus behaviour distinguishes selection from navigation.

## 6.5 Canonical summary

Master-detail is for **structured navigation + entity detail**, especially when persistent location context reduces repeated navigation cost.

---

# 7. List-Detail Pattern

## 7.1 Purpose

List-detail is the canonical pattern for rapid traversal of a homogeneous collection while inspecting one selected item.

It is a specialization of master-detail with a flat or lightly grouped list as the controlling region.

Typical uses include:

- inbox + message;
- ticket queue + ticket;
- customer search results + customer preview;
- notification list + notification detail.

## 7.2 Rules

### When to use

Use list-detail when:

- users inspect multiple nearby items in one session;
- retaining result/filter context matters;
- the collection is the primary navigation mechanism;
- detail can change without discarding the list.

### When NOT to use

Do NOT use list-detail where:

- users normally open one result and leave search context behind;
- detail requires most of the viewport and a long independent workflow;
- the controlling structure is deeply hierarchical;
- comparison of several details is the actual task.

### Canonical wireframe

```text
┌──────────────────────────────────────────────────────┐
│ Search / Filters                                     │
├───────────────────┬──────────────────────────────────┤
│ List              │ Selected detail                  │
│ ┌───────────────┐ │                                  │
│ │ Item          │ │                                  │
│ │ Item ●        │ │                                  │
│ │ Item          │ │                                  │
│ └───────────────┘ │                                  │
└───────────────────┴──────────────────────────────────┘
```

### Responsive transform

**Mobile:** MUST normally use list → detail navigation. Detail SHOULD be a route when users need deep linking, browser history, or substantial interaction.

**Tablet:** MAY use list + detail where viable or detail in a large sheet/drawer for shorter inspection tasks.

**Desktop:** SHOULD show list and selected detail simultaneously when this materially accelerates traversal.

Selection MAY be encoded in the URL.

### Scrolling

List and detail MAY scroll independently.

The list’s scroll position MUST NOT reset when selection changes.

Infinite or incremental lists MUST preserve current selection as new data arrives.

When returning from mobile detail to list, prior scroll, filters, sorting, and selection SHOULD be restored.

### Accessibility and composition

The selected list item MUST be perceivable without colour alone.

Keyboard users MUST be able to traverse items efficiently.

A list MUST NOT be given `role="grid"` merely because items are arranged in rows. ARIA grid semantics introduce a composite keyboard model and MUST only be used when that interaction model is intentionally implemented. citeturn402545search4

## 7.3 Anti-patterns

- Losing list state after opening detail.
- Loading detail on focus alone.
- Coupling list scrolling to detail scrolling.
- Encoding a sensitive record payload in URL state.
- Rendering an entire desktop detail pane below every mobile list item.
- Using a modal dialog for long-lived record detail.

## 7.4 Checklist

- [ ] Rapid sequential inspection is a real workflow.
- [ ] List state survives selection.
- [ ] Mobile supports a clear return path.
- [ ] Deep linking is defined where appropriate.
- [ ] Selection is programmatically conveyed.
- [ ] List and detail fetch/error states are independently resilient.

## 7.5 Canonical summary

List-detail optimizes **collection traversal + focused inspection** while preserving list context.

---

# 8. Dashboard Grid Pattern

## 8.1 Purpose

Dashboard grid presents multiple independently meaningful summaries within one overview surface.

A dashboard is for monitoring, orientation, and drill-down—not for assembling arbitrary cards.

## 8.2 Rules

### When to use

Use dashboard grid when users need a simultaneous overview of several metrics, states, trends, alerts, or work queues.

Each module MUST answer a distinct information need.

### When NOT to use

Do NOT use dashboard grid:

- as the default home page merely because several features exist;
- for long-form reading;
- for a sequential workflow;
- as an excuse to place every feature inside a card;
- where the modules have a strict reading dependency better represented as one page flow.

### Canonical wireframe

```text
┌──────────────────────────────────────────────────────┐
│ Dashboard header / date / global filters             │
├───────────────────────┬──────────────────────────────┤
│ KPI / summary         │ KPI / summary                │
├───────────────────────┼──────────────────────────────┤
│ Chart / trend         │ Queue / alert                │
│                       ├──────────────────────────────┤
│                       │ Secondary summary            │
└───────────────────────┴──────────────────────────────┘
```

The grid MUST communicate priority through span, placement, typography, or grouping.

### Responsive transform

**Mobile:** MUST become a single-column ordered sequence. Module priority MUST determine order.

**Tablet:** SHOULD use one or two columns according to module minimum widths.

**Desktop:** MAY use a multi-column CSS Grid based on semantic span tokens.

Responsive layout SHOULD preserve relative information priority.

A dashboard MUST NOT simply scale each desktop card to an unusably narrow mobile card.

### Scrolling

The document SHOULD own dashboard scrolling.

Modules SHOULD size naturally.

Nested scrolling inside cards MUST NOT be used merely to force equal card heights.

A module MAY use constrained scrolling only where the content itself is a bounded operational queue and its independent scroll behaviour is intentional.

### Accessibility and composition

Dashboard DOM order MUST represent meaningful reading priority.

CSS Grid MUST NOT visually reorder content into a sequence that conflicts with DOM order.

Charts MUST provide accessible equivalents under the Data Visualization standard.

Auto-refresh MUST follow the Accessibility and State Management standards and MUST NOT unexpectedly move focus or reorder content under active interaction.

## 8.3 Anti-patterns

- “Card soup.”
- Equal visual weight for critical and incidental information.
- Equal-height cards with hidden overflow.
- A chart with no accessible textual/table alternative where required.
- Responsive CSS that changes visual reading order independently of DOM order.
- Auto-refresh that causes layout shift or destroys active state.

## 8.4 Checklist

- [ ] Every module supports an overview decision.
- [ ] Information priority is explicit.
- [ ] Mobile module order is deliberate.
- [ ] Cards are used only when containment has semantic value.
- [ ] Dashboard scrolling belongs primarily to the page.
- [ ] Loading/error states do not collapse the entire grid unpredictably.

## 8.5 Canonical summary

A dashboard grid is an **overview composition**, not a generic collection of cards.

---

# 9. Split-Pane Pattern

## 9.1 Purpose

Split-pane provides two or more peer work surfaces whose dimensions users may need to adjust.

Typical uses include:

- source + preview;
- query + results;
- editor + console;
- comparison surfaces;
- code + rendered output.

## 9.2 Rules

### When to use

Use split-pane when:

- both panes are active work surfaces;
- users benefit from simultaneous visibility;
- relative space requirements vary by task;
- resizing creates material productivity value.

### When NOT to use

Do NOT use split-pane for:

- static sidebar + content;
- collection + record detail when widths need not be user controlled;
- decorative resizing;
- mobile layouts that cannot support minimum pane dimensions.

### Canonical wireframe

```text
┌──────────────────────────────────────────────────────┐
│ Toolbar                                              │
├────────────────────────┬─┬───────────────────────────┤
│ Pane A                 │↔│ Pane B                    │
│                        │ │                           │
│                        │ │                           │
└────────────────────────┴─┴───────────────────────────┘
```

The separator MUST be visually and interactively discoverable when resizing is supported.

shadcn/ui `ResizablePanelGroup`, `ResizablePanel`, and `ResizableHandle` SHOULD be the baseline implementation where appropriate; its current primitive explicitly supports keyboard-accessible resizing. citeturn624085search2

### Responsive transform

**Mobile:** MUST become a single active pane, stacked sequential surfaces, or tabs/routes. Drag resizing MUST NOT remain the only way to reach content.

**Tablet:** MAY retain split-pane when both minimum widths are viable; otherwise use the mobile transform.

**Desktop:** MAY expose resizable simultaneous panes.

Saved pane widths SHOULD be clamped against current minimum/maximum constraints.

### Scrolling

Each pane MAY independently scroll.

Independent scroll ownership is intrinsic to this pattern and MUST be visually legible.

The resize handle MUST NOT become a scroll trap.

Pane resize MUST preserve useful scroll positions where possible.

### Accessibility and composition

Resizing MUST have a keyboard-operable equivalent.

WCAG 2.2 requires functionality dependent on dragging to have a non-dragging single-pointer alternative unless dragging is essential. citeturn943383search6

A resize separator MUST communicate orientation and current state through the underlying accessible primitive.

Pane ordering MUST remain meaningful at compact widths.

Focus MUST NOT be lost when a pane is collapsed.

## 9.3 Anti-patterns

- Invisible one-pixel drag handles.
- Drag-only resizing.
- Persisting an invalid width that makes a pane inaccessible.
- Three or more resizable panes without a demonstrable expert workflow.
- Nesting split panes recursively without strict information architecture.
- Interpreting a collapsed pane as permission revocation.

## 9.4 Checklist

- [ ] Both surfaces are true peers.
- [ ] User resizing has demonstrated value.
- [ ] Minimum and maximum sizes are defined.
- [ ] Keyboard resizing works.
- [ ] Compact mode provides an alternative to simultaneous display.
- [ ] Focus and pane state survive resize/collapse.

## 9.5 Canonical summary

Split-pane is for **simultaneous peer work surfaces with variable spatial demand**.

---

# 10. Canvas + Inspector Pattern

## 10.1 Purpose

Canvas + inspector supports manipulation of a spatial or directly editable work surface while exposing properties and controls for the current selection.

Typical uses include:

- diagram editors;
- design tools;
- map editors;
- workflow builders;
- page builders;
- visual configuration systems.

## 10.2 Rules

### When to use

Use canvas + inspector when selection on the canvas determines the contextual controls shown beside it.

The canvas MUST remain the primary task surface.

### When NOT to use

Do NOT use canvas + inspector:

- for ordinary record forms;
- when properties are the main task and the visual preview is incidental;
- for list-detail disguised as a graphical interface;
- where the “canvas” is simply a large empty container.

### Canonical wireframe

```text
┌────────────────────────────────────────────────────────────┐
│ Toolbar                                                    │
├───────────┬────────────────────────────────┬───────────────┤
│ Optional  │                                │ Inspector     │
│ tools     │          Canvas                │               │
│           │         [selection]            │ Properties    │
│           │                                │ Actions       │
└───────────┴────────────────────────────────┴───────────────┘
```

### Responsive transform

**Mobile:** The canvas SHOULD occupy the primary viewport. Inspector controls SHOULD move to a bottom sheet, full-screen sheet, mode switch, or dedicated properties view.

**Tablet:** Canvas SHOULD remain dominant. Inspector MAY be docked or overlayed according to available width.

**Desktop:** Inspector SHOULD normally be docked and MAY be resizable within constrained tokens.

Toolbars MAY compact by grouping lower-frequency controls; required operations MUST remain discoverable.

### Scrolling

Canvas pan/zoom behaviour MUST be intentionally separated from document scroll.

The document SHOULD normally remain fixed while the spatial workspace manages its own viewport.

Inspector content MAY scroll independently.

Wheel, trackpad, pointer, and keyboard behaviour MUST avoid ambiguous competition between canvas zoom, canvas pan, inspector scroll, and browser scroll.

### Accessibility and composition

A visual canvas MUST NOT be the only interface to essential information or operations where an accessible structured alternative is feasible.

Selected objects MUST expose non-visual identity and state.

Keyboard access to object selection and primary actions MUST be defined under the relevant component/pattern standard.

Inspector labels MUST describe the selected object context.

Closing a mobile inspector SHOULD restore focus or interaction context to the originating canvas control/object where technically meaningful.

## 10.3 Anti-patterns

- Treating canvas gestures as the only operation method.
- Opening properties in repeated modal dialogs.
- Allowing the inspector to consume more space than the primary canvas without user intent.
- Mixing browser scroll and canvas zoom unpredictably.
- Moving essential toolbar controls behind unexplained icons solely to preserve the desktop layout.

## 10.4 Checklist

- [ ] Canvas is genuinely spatial/direct manipulation.
- [ ] Inspector reflects current selection.
- [ ] Canvas remains spatially dominant.
- [ ] Mobile inspector behaviour is explicitly defined.
- [ ] Gesture operations have accessible alternatives where required.
- [ ] Canvas, inspector, and browser scrolling do not conflict.

## 10.5 Canonical summary

Canvas + inspector is the standard composition for **spatial manipulation + contextual property editing**.

---

# 11. Feed Pattern

## 11.1 Purpose

Feed presents a chronologically, algorithmically, or operationally ordered stream of repeatable content units.

Examples include:

- activity streams;
- audit/event views;
- social streams;
- operational timelines;
- continuously updating news/activity surfaces.

## 11.2 Rules

### When to use

Use feed when users primarily move through an ordered stream and each item can be independently understood.

### When NOT to use

Do NOT use feed for:

- structured search results requiring strong faceting/comparison;
- dense tabular operational data;
- arbitrary dashboard modules;
- a collection whose information architecture is primarily hierarchical.

### Canonical wireframe

```text
┌──────────────────────────────────────────────┐
│ Feed header / controls                       │
├──────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────┐ │
│ │ Feed item                                │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Feed item                                │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Feed item                                │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

### Responsive transform

**Mobile:** MUST remain a single dominant stream.

**Tablet:** SHOULD remain a single stream, optionally with nonessential supporting context beside it.

**Desktop:** SHOULD NOT turn the stream itself into unrelated masonry columns merely to consume width.

Readable feed width SHOULD be constrained.

### Scrolling

The document SHOULD normally own scrolling.

Infinite loading MAY be used only where it does not prevent reaching necessary content, orientation controls, or footer functions.

Pagination or “load more” SHOULD be preferred when users benefit from position, stable history, or bounded traversal.

New live items MUST NOT unexpectedly shift the content currently being read. A “new items” affordance SHOULD be used instead.

ARIA defines an optional feed interaction model for appropriate infinite-scrolling implementations, including navigation between articles; if that model is adopted, its keyboard semantics MUST be implemented deliberately rather than applying `role="feed"` superficially. citeturn402545search5

### Accessibility and composition

Each item SHOULD have a meaningful heading or accessible label where appropriate.

Repeated action bars MUST remain understandable when encountered sequentially by keyboard.

Virtualization MUST preserve accessible item semantics and focus continuity.

Live updates MUST respect announcement and motion standards.

## 11.3 Anti-patterns

- Infinite scrolling without recoverable position.
- Inserting new content above the reader and shifting the viewport.
- Multiple nested feeds with unclear boundaries.
- Applying `role="feed"` without implementing its interaction expectations.
- Unbounded rendering of thousands of items.
- Turning desktop feed items into masonry solely for aesthetics.

## 11.4 Checklist

- [ ] Content forms a meaningful ordered stream.
- [ ] Item boundaries are semantic.
- [ ] Loading strategy is intentional.
- [ ] Position can be recovered where important.
- [ ] Live additions do not steal context.
- [ ] Virtualization preserves keyboard/focus behaviour.

## 11.5 Canonical summary

Feed is an **ordered stream pattern**. Its primary design problem is continuity of traversal, not card styling.

---

# 12. Gallery Pattern

## 12.1 Purpose

Gallery presents a collection where visual recognition is the primary means of scanning and choosing items.

Typical uses include:

- media libraries;
- asset browsers;
- template selection;
- product imagery;
- visual portfolios.

## 12.2 Rules

### When to use

Use gallery when imagery or visual preview is more important to item recognition than row-oriented metadata.

### When NOT to use

Do NOT use gallery when:

- users primarily compare textual/numeric attributes;
- dense batch operations dominate;
- hierarchy matters more than visual recognition;
- image previews add little decision value.

### Canonical wireframe

```text
┌──────────────────────────────────────────────────────┐
│ Search / filters / sort / view controls              │
├──────────────────────────────────────────────────────┤
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐          │
│ │ image  │ │ image  │ │ image  │ │ image  │          │
│ │ label  │ │ label  │ │ label  │ │ label  │          │
│ └────────┘ └────────┘ └────────┘ └────────┘          │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐          │
│ │ image  │ │ image  │ │ image  │ │ image  │          │
│ └────────┘ └────────┘ └────────┘ └────────┘          │
└──────────────────────────────────────────────────────┘
```

### Responsive transform

**Mobile:** SHOULD reduce column count while retaining viable preview size.

**Tablet:** SHOULD use a moderate responsive grid.

**Desktop:** MAY increase column count up to the point that visual recognition or metadata legibility would degrade.

Column count MUST be derived from minimum item width, not from fixed device assumptions.

CSS Grid SHOULD be preferred for regular galleries.

Masonry SHOULD be used only where differing item aspect ratios are intrinsic to the content and reading order remains understandable.

### Scrolling

The document SHOULD own vertical scrolling.

Horizontal carousels MUST NOT replace a browsable gallery solely to fit mobile.

Pagination, incremental loading, or virtualization SHOULD be selected according to collection scale.

### Accessibility and composition

Images MUST follow the Accessibility and Content standards for alternative text.

Selection MUST have programmatic state and a visible indicator other than colour alone.

Keyboard order SHOULD follow the same logical sequence as the visual grid.

A visual grid MUST NOT automatically receive ARIA `grid` semantics. ARIA grid is a composite interaction model requiring deliberate keyboard focus management. citeturn402545search4

## 12.3 Anti-patterns

- Tiny desktop thumbnails caused by excessive column count.
- Masonry where reading order becomes ambiguous.
- Using a carousel for an entire searchable collection.
- Icon-only metadata that requires hover.
- Visual selection indicated only through border colour.
- Implementing ARIA grid semantics solely because CSS Grid is used.

## 12.4 Checklist

- [ ] Visual recognition is central to selection.
- [ ] Minimum useful thumbnail/card width is defined.
- [ ] Responsive column count follows available space.
- [ ] Keyboard/DOM order remains coherent.
- [ ] Images have appropriate accessible treatment.
- [ ] Large collections have a defined loading strategy.

## 12.5 Canonical summary

Gallery is for **visual browsing and recognition**, not merely any collection that can be displayed as cards.

---

# 13. Wizard Pattern

## 13.1 Purpose

Wizard decomposes a bounded, ordered task into meaningful stages where later steps depend on earlier input or where presenting everything at once would create excessive cognitive load.

## 13.2 Rules

### When to use

Use wizard when:

- the task has a meaningful sequence;
- branching depends on prior answers;
- staged validation materially assists completion;
- the complete form would otherwise be unmanageably complex.

### When NOT to use

Do NOT use wizard:

- to make a short form appear simpler;
- when users frequently need fields from several sections simultaneously;
- when order is arbitrary;
- to hide optional configuration that could use disclosure instead.

### Canonical wireframe

```text
┌──────────────────────────────────────────────┐
│ Task title                                   │
│ Step 2 of 4   ●────●────○────○               │
├──────────────────────────────────────────────┤
│                                              │
│ Current step                                 │
│                                              │
│ [fields / content]                           │
│                                              │
├──────────────────────────────────────────────┤
│ Back                         Continue         │
└──────────────────────────────────────────────┘
```

### Responsive transform

**Mobile:** MUST use one primary step surface. Step indicators SHOULD compact to preserve content space.

**Tablet:** SHOULD remain one primary task surface. Supplementary guidance MAY appear beside the form if genuinely useful.

**Desktop:** SHOULD NOT place several future steps side-by-side merely because space is available.

The wizard is sequential by semantics, not because of viewport constraints.

### Scrolling

The current step SHOULD normally use document scrolling.

Sticky action bars MAY be used where they preserve field visibility and never obscure keyboard focus.

Moving to a new step SHOULD place focus at an appropriate step heading, validation summary, or first invalid field according to Forms & Validation.

### Accessibility and composition

Current step, completed steps, and total progress MUST be conveyed programmatically and in text.

Visual progress alone is insufficient.

Validation MUST be associated with fields.

A step MUST NOT be marked complete solely because the user visited it.

Back navigation SHOULD preserve entered values.

Client validation MAY improve immediacy; authoritative business validation MUST remain aligned with API/server validation rules.

Final submission MUST NOT assume that successful completion of previous client steps proves authorization or server validity.

## 13.3 Anti-patterns

- Five steps for five ordinary fields.
- Disabling Back without a domain reason.
- Destroying prior values when navigating backward.
- Validating only at the final screen when earlier correction is necessary.
- Using colour-only progress indicators.
- Changing step count unpredictably without communicating the branch.
- Treating hidden client-side steps as a security boundary.

## 13.4 Checklist

- [ ] The task has a meaningful staged sequence.
- [ ] Progress is textual and programmatic.
- [ ] Back navigation preserves data.
- [ ] Validation ownership follows Forms & Validation.
- [ ] Focus moves appropriately on error/step change.
- [ ] Mobile does not compress multiple steps into one viewport.

## 13.5 Canonical summary

Wizard is for **meaningfully sequential tasks**, not for artificially fragmenting ordinary forms.

---

# 14. Full-Bleed vs Contained Modifier

## 14.1 Purpose

Full-bleed and contained define the horizontal boundary relationship between a pattern and its viewport.

They are modifiers, not standalone information architectures.

## 14.2 Rules

### Contained

Contained layouts constrain primary content within a maximum width and provide responsive gutters.

Use contained presentation for:

- prose;
- forms;
- ordinary record views;
- settings;
- most application content;
- layouts where very long line lengths reduce usability.

### Full-bleed

Full-bleed allows selected surfaces to occupy the available viewport width.

Use full-bleed for:

- data-dense workspaces;
- maps;
- canvases;
- large tables where two-dimensional space is intrinsic;
- dashboards benefiting materially from additional width;
- immersive media.

A full-bleed page MAY still contain contained text regions.

### When NOT to use full-bleed

Full-bleed MUST NOT be used merely to eliminate “unused” whitespace.

Prose MUST NOT expand without a readable measure.

A full-bleed surface MUST NOT remove necessary compact-view padding around controls.

### Canonical wireframe

Contained:

```text
┌──────────────────────────────────────────────────────┐
│          ┌──────────────────────────────┐            │
│          │ Content                      │            │
│          │ max-width                    │            │
│          └──────────────────────────────┘            │
└──────────────────────────────────────────────────────┘
```

Full-bleed:

```text
┌──────────────────────────────────────────────────────┐
│ Surface uses available viewport width                │
│                                                      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

Mixed:

```text
┌──────────────────────────────────────────────────────┐
│          ┌──────── contained text ───────┐           │
│          └───────────────────────────────┘           │
│ ┌────────────── full-bleed surface ────────────────┐ │
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### Responsive transform

**Mobile:** Both variants MUST retain safe gutters for controls unless edge-to-edge media/spatial interaction is intentional.

**Tablet:** Contained content SHOULD expand until its max token. Full-bleed surfaces MAY use remaining width.

**Desktop:** Contained content MUST stop growing at its intended maximum. Full-bleed surfaces MAY continue to expand while their internal composition respects minimum/maximum region constraints.

### Scrolling

Full-bleed MUST NOT imply horizontal document scrolling.

Two-dimensional surfaces MAY manage their own horizontal movement where spatially essential.

Contained content SHOULD use ordinary document scrolling.

### Accessibility and composition

Zoom and text reflow MUST remain functional.

Full-width sticky bars MUST not obscure focus.

Edge-to-edge presentation MUST NOT remove focus indicators or interaction spacing.

## 14.3 Anti-patterns

- `width: 100vw` creating unwanted horizontal overflow.
- Full-width prose.
- Nested containers with inconsistent arbitrary maxima.
- Removing mobile gutters to gain a few pixels.
- Assuming “full-bleed” means every child stretches.

## 14.4 Checklist

- [ ] Base semantic pattern is identified separately.
- [ ] Full-bleed has a functional reason.
- [ ] Reading content retains readable measure.
- [ ] Horizontal document overflow is absent.
- [ ] Gutters and maxima come from tokens.
- [ ] Zoom/reflow remains functional.

## 14.5 Canonical summary

Use **contained by default**. Use full-bleed when additional spatial area directly improves the task.

---

# 15. Dense vs Comfortable Modifier

## 15.1 Purpose

Density controls how much information and interaction can fit into a given viewport without changing the underlying information architecture.

Density MUST be treated as a controlled layout/component modifier, not ad-hoc spacing reduction.

## 15.2 Rules

### Comfortable

Comfortable density SHOULD be the default for:

- general consumer and business interfaces;
- touch-oriented interaction;
- forms;
- infrequent workflows;
- mixed-input environments.

### Dense

Dense presentation MAY be used for:

- expert operational workflows;
- high-volume queues;
- data tables;
- monitoring tools;
- interfaces where repeated scanning speed materially matters.

Dense MUST NOT mean inaccessible.

### Canonical wireframe

Comfortable:

```text
┌──────────────────────────────────────┐
│ Row                                  │
│                                      │
├──────────────────────────────────────┤
│ Row                                  │
│                                      │
├──────────────────────────────────────┤
│ Row                                  │
└──────────────────────────────────────┘
```

Dense:

```text
┌──────────────────────────────────────┐
│ Row                                  │
├──────────────────────────────────────┤
│ Row                                  │
├──────────────────────────────────────┤
│ Row                                  │
├──────────────────────────────────────┤
│ Row                                  │
└──────────────────────────────────────┘
```

### Responsive transform

**Mobile:** Comfortable SHOULD normally be used. Dense desktop presentation MUST NOT automatically carry into touch-oriented compact layouts.

**Tablet:** Density SHOULD reflect input mode and task complexity rather than viewport alone.

**Desktop:** Dense MAY be enabled for expert information-heavy surfaces.

A persisted user density preference MAY override the product default where the component system supports both modes safely.

### Scrolling

Density changes MAY alter scroll length but MUST NOT alter semantic ordering or cause state loss.

Changing density SHOULD preserve the user's approximate viewport context.

### Accessibility and composition

Dense mode MUST continue to satisfy applicable target-size and target-spacing requirements. WCAG 2.2 defines a 24 × 24 CSS pixel minimum target requirement subject to specified exceptions. citeturn943383search1turn943383search6

Text MUST NOT become unreadably small to achieve density.

Focus indicators MUST retain required visibility.

Information MUST NOT become hover-only because compact spacing removed persistent labels.

Density MUST be implemented through system-level component and spacing variants.

Individual pages MUST NOT create bespoke “extra dense” variants outside the component system.

## 15.3 Anti-patterns

- Reducing font size instead of improving information design.
- Sub-24px adjacent action targets without satisfying an allowed exception.
- Dense rows containing large comfortable controls that destroy alignment.
- Mixing arbitrary densities within the same repeated collection.
- Automatically equating desktop with dense and mobile with comfortable.
- Hiding labels behind tooltips solely to reduce width.

## 15.4 Checklist

- [ ] Density has a task-based rationale.
- [ ] Target-size compliance remains intact.
- [ ] Typography remains within approved tokens.
- [ ] Density comes from component/token variants.
- [ ] Changing density preserves state.
- [ ] Compact touch layouts remain operable.

## 15.5 Canonical summary

Comfortable is the default. Dense is a **productivity mode**, not permission to violate interaction, typography, or accessibility standards.

---

# 16. Pattern Selection Matrix

| User need | Canonical pattern |
|---|---|
| One dominant reading/task flow | One-column |
| Primary content + supporting region | Two-column |
| Primary content + two persistent supports | Three-column |
| Structured/hierarchical navigator + selected entity | Master-detail |
| Repeated homogeneous collection + selected item | List-detail |
| Simultaneous overview of several summaries | Dashboard grid |
| Two peer work surfaces with adjustable allocation | Split-pane |
| Spatial work surface + contextual properties | Canvas + inspector |
| Ordered stream of repeated content | Feed |
| Visual browsing/selection | Gallery |
| Ordered multi-stage task | Wizard |
| Horizontal boundary choice | Full-bleed vs contained modifier |
| Information-spacing choice | Dense vs comfortable modifier |

Selection MUST be based on the task and information model rather than superficial visual resemblance.

---

# 17. Global Anti-patterns

The following compositions are non-canonical unless another standard explicitly defines them:

1. **Card soup** — every piece of content receives an independent container despite having no containment semantics.
2. **Pane proliferation** — additional panels are added because desktop space exists.
3. **Scroll nesting** — multiple vertical scroll roots occur without a task requirement.
4. **Responsive disappearance** — functionality is simply removed at smaller widths.
5. **CSS reordering** — visual placement contradicts meaningful DOM/focus order.
6. **Magic geometry** — arbitrary widths, gaps, or breakpoints bypass Design Tokens.
7. **Desktop shrinkage** — desktop composition is compressed rather than transformed for compact widths.
8. **Layout authorization** — hiding a region is treated as security.
9. **ARIA by appearance** — `grid`, `feed`, `tree`, or other ARIA patterns are added because a layout visually resembles them without implementing their interaction model.
10. **Density as miniaturization** — text and targets are reduced below usable dimensions instead of adopting a supported density variant.
11. **Responsive state duplication** — the same semantic content is mounted multiple times merely to support different breakpoints.
12. **Modal substitution** — persistent page-level detail is placed in a modal solely to avoid designing responsive navigation.

---

# 18. Global Checklist

A Layout Pattern implementation is conformant only when all applicable answers are **yes**.

## Pattern

- [ ] Is the canonical pattern named explicitly?
- [ ] Does the chosen pattern match the task semantics rather than only its visual geometry?
- [ ] Is there one obvious primary surface?
- [ ] Have unnecessary parallel regions been removed?

## Responsive

- [ ] Are mobile, tablet, and desktop transforms explicitly defined?
- [ ] Does compact mode transform rather than merely shrink?
- [ ] Is all essential functionality available at every supported width?
- [ ] Does the layout remain usable at WCAG reflow conditions where applicable?
- [ ] Are breakpoints represented through tokens or responsive abstractions?

## Scroll

- [ ] Is the primary scroll owner obvious?
- [ ] Are nested scroll containers necessary?
- [ ] Do independently scrolling panes preserve focus visibility?
- [ ] Is horizontal document scrolling avoided except where two-dimensional content intrinsically requires it?

## Accessibility

- [ ] Are landmarks semantic and restrained?
- [ ] Does DOM order preserve meaningful reading and focus order?
- [ ] Can repeated chrome be bypassed?
- [ ] Can focus remain visible around sticky regions?
- [ ] Are targets appropriately sized and spaced?
- [ ] Do responsive drawers/sheets manage and restore focus correctly?
- [ ] Are ARIA widget roles used only where the complete interaction pattern exists?

## State

- [ ] Is layout state separate from domain state?
- [ ] Is persisted layout state genuinely useful?
- [ ] Are URL-addressable selections safe and meaningful?
- [ ] Does responsive transformation avoid duplicate semantic state?
- [ ] Are scroll, selection, and form states preserved where users expect continuity?

## Security

- [ ] Is authorization enforced independently of visibility?
- [ ] Can hidden/collapsed regions retrieve only authorized data?
- [ ] Is sensitive information excluded from unnecessary layout persistence and URLs?

## Data/API

- [ ] Does the layout avoid duplicate or unnecessary requests?
- [ ] Are independently failing regions resilient?
- [ ] Are expensive secondary details lazy-loaded appropriately?
- [ ] Are large collections bounded through the approved data-loading strategy?

## Forms

- [ ] Does responsive movement preserve values?
- [ ] Are label and error relationships intact?
- [ ] Does validation remain aligned with the Forms & Validation standard?
- [ ] Does server-side validation remain authoritative where required?

## Components

- [ ] Does the implementation use shadcn/ui primitives where they match the requirement?
- [ ] Are page semantics still clear above those primitives?
- [ ] Are spacing, sizing, radii, focus, typography, and colour sourced from Design Tokens?
- [ ] Has the page avoided creating a bespoke component behaviour already owned by the Component or Pattern standards?

---

# 19. Canonical Summary

Layout Patterns define the **page-level contract between information architecture, responsive behaviour, scrolling, accessibility, and component composition**.

The canonical hierarchy is:

```text
Design Tokens
    ↓
Layout
    ↓
Layout Patterns
    ↓
Facade
    ↓
Components
```

The governing rules are:

```text
Start with one column.
Add regions only when the task requires simultaneous context.
Choose semantic interaction patterns before geometric column counts.
Transform at constrained widths; do not merely shrink.
Keep scroll ownership explicit.
Keep DOM, reading, and focus order coherent.
Treat layout state as UI state, not domain truth.
Treat visibility as presentation, never authorization.
Use Design Tokens for geometry and density.
Use shadcn/ui as the primitive baseline.
Use ARIA semantics only when their complete interaction contract is implemented.
Prefer comfortable density; justify dense.
Prefer contained content; justify full-bleed.
```

A Gold Standard layout is not the composition that places the most information on screen.

It is the simplest canonical composition that preserves **task clarity, information priority, state continuity, responsive operability, accessibility, and system consistency** across every supported viewport and input mode.

The chapter deliberately makes **master-detail vs list-detail**, **two-column vs split-pane**, and **three-column vs canvas + inspector** separate contracts; those distinctions are where page-layout standards tend to become ambiguous. The accessibility rules are grounded in current W3C guidance on landmarks, logical focus order, reflow, bypass mechanisms, focus visibility, and target sizing, while the component mapping reflects the current shadcn/ui primitives. citeturn402545search0turn943383search2turn943383search0turn624085search5turn943383search6turn624085search7
