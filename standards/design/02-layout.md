---
id: "layout"
title: "Layout Guidelines — Gold Standard"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "layout"]
applies_to: ["ui"]
related: []
legacy_number: 3
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 37879
provenance: baseline

---

Below is a full **Layout Guidelines Gold Standard** designed to sit alongside your Foundations, Facade, Components, and Patterns standards.

# Layout Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical rules for structuring product interfaces.

The layout system exists to ensure that every screen:

- has clear hierarchy;
- uses predictable spatial relationships;
- scales across viewport sizes;
- preserves usability under content growth;
- supports accessibility;
- avoids arbitrary positioning;
- remains visually coherent across features.

Layout is not decoration.

Layout communicates:

- importance;
- grouping;
- sequence;
- context;
- relationship;
- interaction priority.

The core principle is:

> **Structure first. Styling second.**

A strong layout should remain understandable even before color, borders, shadows, and decoration are added.

---

# 2. Layout Hierarchy

All product layouts SHOULD follow a predictable hierarchy.

```text
Application
└── App Shell
    ├── Global Navigation
    ├── Secondary Navigation
    └── Main Content
        ├── Page Container
        │   ├── Page Header
        │   ├── Page Controls
        │   └── Page Content
        │       ├── Section
        │       ├── Section
        │       └── Section
        └── Optional Contextual Region
```

Features SHOULD fit into this architecture rather than inventing independent page structures.

---

# 3. Layout Principles

## 3.1 Alignment before decoration

Use alignment to establish relationships before adding:

- borders;
- background colors;
- cards;
- separators;
- shadows.

Aligned elements visually belong together.

Misalignment creates unnecessary visual noise.

---

## 3.2 Whitespace communicates structure

Spacing is structural.

Use smaller gaps between strongly related elements and larger gaps between conceptual groups.

Example:

```text
Page title
8px
Description

32px

Section title
8px
Description
16px
Content

40px

Next section
```

Exact values depend on the system scale, but the hierarchy must remain consistent.

---

## 3.3 Content drives layout

Do not force content into a rigid composition that only works with ideal data.

Layouts MUST tolerate:

- long text;
- short text;
- missing optional data;
- localization;
- empty states;
- error states;
- loading states;
- permission differences;
- user-generated content.

---

## 3.4 Responsive means recomposition

Responsive design is not shrinking desktop UI.

At narrower widths, interfaces SHOULD:

- stack;
- reorder;
- collapse;
- simplify;
- prioritize;
- transform.

Preserve task hierarchy even when visual structure changes.

---

## 3.5 Prefer flow over positioning

Use normal document flow, Flexbox, and Grid.

Avoid absolute positioning for primary page layout.

Absolute positioning SHOULD be limited to situations such as:

- badges;
- overlay controls;
- decorative elements;
- positioned affordances;
- intentional layered interfaces.

Core content MUST NOT depend on fragile absolute coordinates.

---

# 4. Layout Tokens

Layout values SHOULD come from a controlled system.

Maintain tokens for:

- page gutters;
- container widths;
- spacing;
- grid gaps;
- sidebar widths;
- header heights;
- content widths;
- breakpoints;
- sticky offsets;
- maximum reading widths.

Avoid feature-specific arbitrary dimensions.

---

# 5. Spacing Scale

Use the canonical spacing scale.

Example:

```text
1  = 4px
2  = 8px
3  = 12px
4  = 16px
5  = 20px
6  = 24px
8  = 32px
10 = 40px
12 = 48px
16 = 64px
20 = 80px
24 = 96px
```

The exact implementation may differ, but all layout spacing SHOULD map to system values.

Avoid:

```text
13px
19px
27px
37px
```

unless mathematically or technically required.

---

# 6. Spacing Semantics

Use spacing based on relationship.

## Tight spacing

Use between strongly related elements.

Examples:

- label and input;
- title and subtitle;
- icon and label;
- metadata pairs.

## Standard spacing

Use between sibling controls or rows.

Examples:

- fields;
- list items;
- buttons in a group.

## Section spacing

Use between conceptual groups.

Examples:

- form sections;
- dashboard regions;
- settings groups.

## Page spacing

Use between major page regions.

Examples:

- page header and body;
- major application modules.

The larger the conceptual separation, the larger the spacing.

---

# 7. Page Container

Every standard page SHOULD use a canonical page container.

The container controls:

- horizontal gutters;
- maximum width;
- vertical page spacing;
- alignment with other pages.

Do not manually recreate page padding in each feature.

Example conceptual API:

```tsx
<PageContainer>
  ...
</PageContainer>
```

---

# 8. Page Gutters

Page gutters MUST remain consistent across equivalent surfaces.

Typical strategy:

```text
Mobile        → 16px
Small tablet  → 20px
Tablet        → 24px
Desktop       → 32px
Wide desktop  → 40px
```

Exact values should come from tokens.

Avoid dramatic gutter changes between neighboring pages.

---

# 9. Maximum Width

Content SHOULD NOT automatically grow indefinitely with the viewport.

Define maximum widths according to task type.

Suggested categories:

```text
Reading       → narrow
Form          → medium
Detail        → medium-wide
Application   → wide
Data-heavy    → full-width
```

Examples:

### Narrow

Use for:

- articles;
- documentation;
- policy text;
- long-form reading.

### Medium

Use for:

- forms;
- account settings;
- focused workflows.

### Wide

Use for:

- detail pages;
- dashboards;
- management screens.

### Full

Use for:

- dense tables;
- large data grids;
- visual editors;
- multi-panel applications.

---

# 10. Reading Width

Long-form text SHOULD have a readable line length.

Avoid paragraphs spanning an entire large monitor.

As a general principle, prose SHOULD usually remain around:

```text
50–80 characters per line
```

depending on typography and content.

UI tables and dashboards are exempt where full width provides functional value.

---

# 11. Page Vertical Rhythm

Use a predictable vertical structure.

Recommended model:

```text
Page top padding

Page header

Header → controls gap

Controls

Controls → content gap

Content sections

Page bottom padding
```

Comparable pages SHOULD use comparable vertical rhythm.

---

# 12. App Shell

The application shell defines persistent layout.

Common structure:

```text
┌─────────────────────────────────────────────┐
│ Top Navigation / Header                     │
├────────────┬────────────────────────────────┤
│ Sidebar    │ Main Content                   │
│            │                                │
│            │                                │
└────────────┴────────────────────────────────┘
```

The shell MUST define:

- navigation region;
- content boundary;
- scroll ownership;
- responsive collapse behavior;
- sticky behavior;
- overflow handling.

---

# 13. Scroll Ownership

Every layout MUST intentionally define what scrolls.

Common options:

### Page scroll

Preferred for ordinary pages.

```text
Browser viewport
└── Page content scrolls naturally
```

### Panel scroll

Use for bounded application interfaces.

```text
App shell
├── Fixed nav
└── Scrollable main panel
```

### Nested scroll

Use only when functionally justified.

Avoid multiple nested scroll regions where users cannot easily predict which area will move.

---

# 14. App Header

Persistent headers SHOULD be compact.

They MAY contain:

- global navigation;
- workspace switching;
- global search;
- notifications;
- account controls.

Do not overload persistent headers with page-specific actions unless the application architecture requires it.

---

# 15. Sidebar Layout

Sidebars SHOULD have a defined canonical width.

Typical variants:

```text
Expanded
Collapsed
Hidden/mobile
```

The width SHOULD NOT vary unpredictably between screens.

If resizable sidebars are supported, define:

- minimum width;
- default width;
- maximum width;
- persistence behavior.

---

# 16. Sidebar + Content

Main content MUST not inherit arbitrary spacing from sidebar internals.

The shell should define a clean content boundary.

Good:

```text
Sidebar | Page container
```

Avoid:

```text
Sidebar
  ↓
Feature manually calculates left margins
```

---

# 17. Multi-Column Application Layouts

For applications requiring multiple panels, define explicit regions.

Example:

```text
Navigation | List | Detail
```

or:

```text
Sidebar | Main | Inspector
```

Each region SHOULD have:

- purpose;
- width constraints;
- collapse rules;
- scroll behavior;
- responsive treatment.

---

# 18. Two-Column Page Layout

Use two columns when content has a clear primary/secondary relationship.

Example:

```text
Primary content            Sidebar
────────────────────────────────────
Main form                  Summary
Main data                  Metadata
Main activity              Context
```

Recommended proportions:

```text
2:1
3:1
```

depending on content density.

Avoid equal columns unless both regions have equal importance.

---

# 19. Sidebar Content Columns

Secondary page columns MAY contain:

- metadata;
- activity;
- help;
- status;
- summary;
- related items.

Do not place the primary task in the visually secondary column.

---

# 20. Grid System

Use CSS Grid when both rows and columns matter.

Typical grid structures:

```text
12-column
6-column
4-column
2-column
```

The exact grid SHOULD be less important than consistent alignment.

Use grids for:

- dashboards;
- card collections;
- form arrangements;
- analytics panels;
- responsive content blocks.

---

# 21. Grid Span

Grid item spans SHOULD reflect information importance.

Example:

```text
Primary chart    → 8 columns
Summary panel    → 4 columns
Secondary card   → 4 columns
```

Do not assign widths purely for visual symmetry when content importance differs.

---

# 22. Grid Gaps

Use canonical spacing tokens for grid gaps.

Avoid:

```text
gap-[18px]
```

Prefer:

```text
gap-4
gap-6
gap-8
```

according to the system scale.

---

# 23. Flexbox

Use Flexbox for one-dimensional layout.

Good use cases:

- button groups;
- header rows;
- navigation;
- toolbar alignment;
- icon + label;
- action clusters.

Avoid using Flexbox when explicit two-dimensional alignment is required.

---

# 24. Wrapping

Layouts MUST define wrapping behavior.

For horizontal control groups, decide whether controls:

- wrap;
- truncate;
- scroll;
- collapse;
- move to overflow.

Do not allow accidental wrapping.

---

# 25. Content Priority

Responsive layouts SHOULD preserve priority.

A useful classification:

```text
P1 — essential
P2 — important
P3 — supporting
P4 — optional
```

At narrow widths:

- P1 remains visible;
- P2 remains accessible;
- P3 may compress or move;
- P4 may enter overflow or secondary disclosure.

Never hide essential functionality solely to make the layout cleaner.

---

# 26. Breakpoints

Breakpoints SHOULD represent layout transitions rather than specific devices.

A system MAY use breakpoints such as:

```text
sm
md
lg
xl
2xl
```

but behavior should be defined based on available space.

Do not think:

```text
md = tablet
```

Think:

```text
md = point where this composition no longer fits comfortably
```

---

# 27. Mobile-First Layout

Base layout SHOULD generally work at narrow widths.

Enhance as width increases.

This reduces reliance on desktop assumptions.

Example:

```text
Base:
Single column

md:
Two columns

xl:
Primary + sidebar + auxiliary panel
```

---

# 28. Responsive Recomposition

At small widths, layouts MAY transform.

Examples:

```text
Sidebar
→ Sheet navigation
```

```text
Horizontal toolbar
→ Wrapped toolbar
```

```text
Table
→ Reduced columns / horizontal scroll
```

```text
Two-column form
→ Single-column form
```

```text
Right inspector
→ Drawer
```

The structure may change while the workflow remains the same.

---

# 29. Mobile Page Layout

Recommended mobile hierarchy:

```text
Page title
Description
Primary action
Secondary actions
Filters
Content
```

Controls SHOULD follow the natural task sequence.

Avoid requiring users to scroll past secondary content before reaching the primary action.

---

# 30. Desktop Page Layout

Recommended desktop hierarchy:

```text
Page title                         Primary action
Description                        Secondary actions

Toolbar / filters

Main content
```

Desktop width permits horizontal composition but does not require everything to be placed in one row.

---

# 31. Small Screen Action Layout

Buttons that fit side-by-side on desktop MAY stack on mobile.

Example:

```text
Desktop:
[Cancel] [Save changes]

Mobile:
[Save changes]
[Cancel]
```

The primary action MAY become full width when appropriate.

Preserve correct action hierarchy.

---

# 32. Forms Layout

Form layouts SHOULD optimize completion, not visual novelty.

Default to one column unless horizontal grouping has strong semantic value.

Use two columns for fields such as:

```text
First name | Last name
City       | Postal code
Start date | End date
```

Do not place unrelated fields side by side simply to reduce page height.

---

# 33. Form Width

Forms SHOULD generally have a controlled width.

Avoid full-screen text inputs on large monitors.

Good:

```text
Page
└── Form container
    └── Fields
```

Form controls MAY still use full width inside the form container.

---

# 34. Field Width

Field width may communicate expected input length.

Examples:

```text
Postal code    → short
Name           → medium
URL            → wide
Description    → full
```

However, responsive behavior SHOULD simplify widths where necessary.

---

# 35. Form Sections

Long forms MUST be divided into meaningful sections.

Example:

```text
Profile
────────────
Fields

Contact
────────────
Fields

Permissions
────────────
Fields
```

Use section spacing to reinforce grouping.

---

# 36. Form Actions

Form actions SHOULD occupy a predictable position.

Typical patterns:

```text
Form fields
────────────
Cancel        Save changes
```

or:

```text
Sticky footer
Cancel        Save changes
```

for long workflows.

Do not place Save buttons randomly between fields.

---

# 37. Settings Layout

Settings pages SHOULD use a consistent pattern.

Typical desktop layout:

```text
Settings nav | Settings content
```

Content:

```text
Section title
Description

Setting
Setting
Setting
```

On mobile:

```text
Settings navigation
→ top-level navigation / drill-in / sheet
```

---

# 38. Detail Page Layout

A detail page SHOULD distinguish:

- identity;
- primary state;
- primary actions;
- content;
- metadata.

Example:

```text
Object title                      Actions
Status / metadata

Main information        Secondary metadata

Activity / history
```

Avoid scattering object identity across multiple cards.

---

# 39. List Page Layout

Canonical list page:

```text
Page header

Search / filters / actions

List or table

Pagination / load controls
```

This structure SHOULD remain consistent across list-oriented features.

---

# 40. Dashboard Layout

Dashboards SHOULD establish explicit priority.

Example:

```text
Primary KPI     Primary KPI     Primary KPI

Main chart / workflow area

Secondary metrics / secondary data
```

Avoid grids where every module has identical size and emphasis.

---

# 41. Card Grid Layout

Cards SHOULD use responsive grids.

Example:

```text
Mobile:
1 column

Tablet:
2 columns

Desktop:
3 columns
```

Cards within the same group SHOULD align when their content allows it.

Avoid forcing identical heights when it produces excessive empty space.

---

# 42. Table Layout

Tables require stable width behavior.

Define whether columns are:

- fixed;
- flexible;
- minimum-width;
- maximum-width;
- truncating;
- wrapping.

High-value columns SHOULD receive more space.

Low-value metadata SHOULD not dominate width.

---

# 43. Table Horizontal Overflow

If a table cannot fit:

Preferred options include:

1. reduce secondary columns;
2. allow controlled horizontal scroll;
3. create responsive detail disclosure;
4. use alternate mobile representation.

Do not make text illegibly small to preserve all columns.

---

# 44. Table Container

For data-heavy pages, tables MAY use the full available content width.

Avoid artificially constraining them to prose widths.

The table header, toolbar, and pagination SHOULD share the same alignment boundary.

---

# 45. Toolbar Layout

Toolbars SHOULD group related controls.

Recommended structure:

```text
Left:
Search
Filters

Right:
View options
Secondary actions
Primary action
```

On small screens:

```text
Search
Filters
Primary action
More
```

Toolbars SHOULD reflow intentionally.

---

# 46. Filter Layout

Filters MAY be:

- inline;
- popover-based;
- sidebar-based;
- drawer-based.

Use inline filters when the set is small.

Use popovers or drawers when filters are numerous.

Active filters MUST remain visible or discoverable.

---

# 47. Tabs Layout

Tabs SHOULD remain visually connected to their content.

Avoid placing large unrelated gaps between:

```text
Tabs
```

and:

```text
Tab panel
```

If tabs overflow horizontally on mobile, define controlled scroll or alternate navigation.

---

# 48. Sticky Layouts

Sticky elements MUST account for other persistent UI.

Example:

```text
Top header height: 56px
Sticky toolbar top: 56px
```

Do not allow sticky regions to overlap each other.

---

# 49. Sticky Footer Actions

Use sticky actions where long workflows make persistent access beneficial.

Examples:

- long forms;
- editors;
- approval workflows.

Sticky footers SHOULD:

- remain visually distinct;
- avoid covering content;
- respect mobile safe areas.

---

# 50. Full-Height Interfaces

Editors, inboxes, chats, and management consoles MAY use full-height application layouts.

Define:

```text
Viewport
├── Fixed header
└── Remaining height
    ├── Sidebar
    └── Main panel
```

Use explicit overflow rules.

Do not rely on arbitrary `100vh` calculations without considering browser and mobile viewport behavior.

---

# 51. Split Panes

Split panes MAY be used where users need simultaneous context.

Examples:

```text
Inbox list | Message
Files      | Preview
Issues     | Details
```

Define:

- default ratio;
- minimum width;
- maximum width;
- resize behavior;
- mobile collapse.

---

# 52. Inspector Panels

Right-side inspector panels SHOULD contain contextual information or controls.

Examples:

- properties;
- configuration;
- metadata;
- history.

The inspector SHOULD NOT contain unrelated primary navigation.

On mobile, inspectors SHOULD usually become drawers or dedicated screens.

---

# 53. Drawers and Sheets

Use drawers as responsive or contextual alternatives to permanent panels.

Examples:

```text
Desktop sidebar
→ Mobile sheet
```

```text
Desktop inspector
→ Mobile drawer
```

The drawer should preserve the logical position and task meaning of the desktop panel.

---

# 54. Dialog Layout

Dialogs SHOULD use constrained widths based on task complexity.

Suggested categories:

```text
Small       → confirmations
Medium      → forms
Large       → complex configuration
Fullscreen  → exceptional workflows
```

Do not use an oversized dialog for a small confirmation.

---

# 55. Dialog Height

Dialogs SHOULD fit within the viewport.

If content exceeds available height:

```text
Header
Scrollable content
Footer
```

Header and actions MAY remain fixed.

Avoid allowing the entire browser page behind the dialog to become the primary scroll surface.

---

# 56. Empty State Layout

Empty states SHOULD occupy the content area without creating excessive vertical emptiness.

Typical:

```text
Content region
    ↓
Centered or top-aligned empty state
```

Centering is appropriate for broad empty areas.

Top alignment may be preferable where users expect list or table continuity.

---

# 57. Error Page Layout

Full-page errors SHOULD preserve enough shell context to orient users when possible.

Example:

```text
App shell
└── Error content
    ├── Clear title
    ├── Explanation
    └── Recovery action
```

Avoid removing navigation unnecessarily.

---

# 58. Loading Layout

Loading should preserve expected geometry.

Prefer:

```text
Page header visible
Toolbar visible
Content skeleton
```

over:

```text
Blank screen
Centered spinner
```

where stable structure is already known.

---

# 59. Navigation Layout

Navigation architecture SHOULD remain predictable.

Possible hierarchy:

```text
Global nav
    ↓
Product area
    ↓
Section navigation
    ↓
Page
```

Do not mix global and local navigation within one undifferentiated list.

---

# 60. Breadcrumb Layout

Breadcrumbs SHOULD sit close to the page title.

Typical:

```text
Breadcrumb
Title
Description
```

Avoid placing breadcrumbs in distant locations where they lose contextual relationship.

---

# 61. Content Ordering

DOM order SHOULD generally match visual order.

Avoid layouts where CSS visually reorders content in ways that make:

- keyboard navigation;
- screen-reader reading;
- source order;

different from visual meaning.

Responsive reordering MUST preserve logical reading order.

---

# 62. Accessibility and Layout

Layout MUST remain usable under:

- 200% zoom;
- larger text;
- keyboard navigation;
- reduced viewport;
- screen magnification.

Do not rely on:

- fixed-height text containers;
- clipped overflow;
- tiny interaction zones.

---

# 63. Localization

Layouts MUST accommodate translated text.

Design for:

- longer labels;
- longer button text;
- longer headings;
- RTL where supported.

Do not hardcode widths based solely on English copy.

---

# 64. Text Truncation

Truncation MAY be used where layout integrity requires it.

Use intentionally.

Good for:

- filenames;
- IDs;
- table cells;
- long object names in constrained areas.

Do not truncate information users need to complete the task without providing another way to access it.

---

# 65. Minimum and Maximum Sizes

Use `min-width`, `max-width`, and `minmax()` strategically.

Example:

```css
grid-template-columns:
  minmax(0, 1fr)
  minmax(240px, 320px);
```

This is generally safer than rigid widths.

---

# 66. Intrinsic Sizing

Prefer intrinsic layout where practical.

Use:

- `min-content`;
- `max-content`;
- `fit-content`;
- flexible fractions;
- `minmax()`.

Avoid unnecessary fixed pixel widths.

---

# 67. Overflow

Every constrained region MUST define overflow behavior.

Possible strategies:

```text
visible
hidden
auto
scroll
truncate
wrap
```

Do not allow accidental horizontal page overflow.

---

# 68. Long Content

Layouts MUST tolerate:

- long names;
- long emails;
- URLs;
- unbroken IDs;
- large numbers;
- translated labels.

Use wrapping or truncation intentionally.

---

# 69. Safe Areas

Mobile persistent controls SHOULD account for device safe areas.

Especially:

- bottom action bars;
- drawers;
- full-screen modals;
- mobile navigation.

Do not place essential controls flush against unsafe screen edges.

---

# 70. Keyboard and Virtual Keyboard

On mobile form layouts, account for the software keyboard.

Important actions and focused fields should remain reachable.

Avoid fixed elements that obstruct form fields when the keyboard opens.

---

# 71. Z-Index

Maintain a centralized z-index hierarchy.

Example:

```text
base
sticky
dropdown
popover
overlay
modal
toast
critical
```

Do not use arbitrary values such as:

```text
z-[99999]
```

Feature code SHOULD NOT invent its own stacking system.

---

# 72. Overlay Hierarchy

Define which surfaces may appear above others.

Example:

```text
Page
< Sticky navigation
< Dropdown
< Popover
< Dialog overlay
< Dialog
< Toast
```

Avoid overlapping surfaces with ambiguous precedence.

---

# 73. Fixed Positioning

Fixed elements SHOULD be rare and intentional.

Appropriate:

- global nav;
- persistent mobile actions;
- floating support button;
- application chrome.

Too many fixed elements reduce usable viewport space.

---

# 74. Floating Actions

Floating action buttons SHOULD only be used where the interaction model strongly supports them.

They SHOULD NOT replace ordinary page actions simply because they are visually prominent.

Ensure they do not obscure:

- content;
- navigation;
- pagination;
- form controls.

---

# 75. Page Templates

Canonical layout templates SHOULD be provided.

Recommended templates:

```text
List
Detail
Form
Settings
Dashboard
Wizard
Split pane
Editor
Authentication
Onboarding
Error
Empty workspace
```

Features SHOULD start from the closest canonical template.

---

# 76. List Template

```text
Page Container
├── Page Header
│   ├── Title
│   ├── Description
│   └── Primary Action
├── Toolbar
│   ├── Search
│   └── Filters
├── List / Table
└── Pagination
```

---

# 77. Detail Template

```text
Page Container
├── Breadcrumb
├── Object Header
│   ├── Identity
│   ├── Status
│   └── Actions
├── Main Layout
│   ├── Primary Content
│   └── Secondary Metadata
└── Activity / Related Content
```

---

# 78. Form Template

```text
Page Container
├── Page Header
├── Form Container
│   ├── Section
│   ├── Section
│   └── Section
└── Actions
```

---

# 79. Settings Template

```text
Settings Layout
├── Settings Navigation
└── Settings Content
    ├── Section Header
    ├── Settings Group
    └── Settings Group
```

---

# 80. Dashboard Template

```text
Page Header
Primary Metrics
Primary Operational Area
Secondary Analysis
Supplementary Data
```

Dashboard layout MUST express priority.

---

# 81. Wizard Template

```text
Progress / Steps

Step title
Description

Step content

Back                Continue
```

The width SHOULD remain focused.

Avoid full-width wizard content unless the step requires large data interaction.

---

# 82. Authentication Layout

Authentication screens SHOULD prioritize task completion.

Typical:

```text
Brand
Title
Description
Form
Primary action
Secondary navigation
```

Avoid excessive decorative content that competes with the form.

---

# 83. Onboarding Layout

Onboarding SHOULD maintain focus.

Each step should have:

- one primary task;
- one obvious continuation action;
- limited secondary distractions.

Long onboarding MAY use progress indication.

---

# 84. Layout Density Modes

If the product supports density options, define them centrally.

Example:

```text
Comfortable
Default
Compact
```

Density MAY affect:

- row heights;
- card padding;
- control spacing;
- table spacing.

It MUST NOT alter fundamental information hierarchy.

---

# 85. Layout Consistency Rules

Comparable screens SHOULD use:

- the same page gutter;
- similar header placement;
- matching section spacing;
- matching action placement;
- consistent content widths;
- consistent toolbar patterns.

Users should not need to relearn spatial conventions on every page.

---

# 86. Avoid Pixel-Perfect Fragility

Layouts SHOULD be robust rather than tuned to one screenshot.

Avoid implementation that only works when:

- content has a specific length;
- browser is a specific width;
- no error text is shown;
- no translation is applied;
- user has default font size.

The screenshot is a reference, not the layout specification.

---

# 87. Avoid Excessive Nesting

Too many layout wrappers create complexity.

Avoid:

```text
Container
  Wrapper
    InnerWrapper
      SectionWrapper
        ContentWrapper
```

unless each layer has a distinct structural role.

Prefer shallow, understandable composition.

---

# 88. Layout Components

Create reusable layout primitives where they reduce repetition.

Possible examples:

```text
PageContainer
PageHeader
Section
Stack
Inline
Cluster
Grid
Split
SidebarLayout
DetailLayout
SettingsLayout
```

These should encode stable structural rules.

Do not create abstractions for every `div`.

---

# 89. Stack Primitive

A Stack represents vertically arranged content.

Conceptually:

```tsx
<Stack gap="md">
  ...
</Stack>
```

Use for repeated vertical rhythm.

It SHOULD reduce arbitrary `space-y-*` decisions.

---

# 90. Inline Primitive

An Inline represents horizontally arranged controls or content.

Conceptually:

```tsx
<Inline gap="sm" align="center">
  ...
</Inline>
```

Use for:

- button groups;
- metadata;
- compact control groups.

---

# 91. Cluster Primitive

A Cluster is useful when items wrap responsively.

Example:

```text
[Filter] [Filter] [Filter] [Filter]
```

and wrap naturally when space is constrained.

---

# 92. Split Primitive

A Split represents two regions separated by flexible space.

Example:

```text
Title                       Actions
```

Use cautiously when narrow layouts require stacking.

---

# 93. Section Primitive

A section SHOULD encode:

- vertical spacing;
- optional title;
- optional description;
- content boundary.

Sections should reduce repeated page-level spacing logic.

---

# 94. Layout API Rules

Layout component APIs SHOULD use semantic properties.

Prefer:

```tsx
<Stack gap="lg">
```

over:

```tsx
<Stack gap={37}>
```

Prefer:

```tsx
<Grid columns={{ base: 1, md: 2 }}>
```

over arbitrary embedded CSS for routine layouts.

---

# 95. Tailwind Layout Rules

Tailwind utilities are appropriate for:

- Grid;
- Flexbox;
- spacing;
- width;
- alignment;
- responsive behavior.

Prefer canonical utilities.

Avoid unnecessary arbitrary values.

Good:

```tsx
className="grid gap-6 lg:grid-cols-3"
```

Avoid:

```tsx
className="grid gap-[23px] lg:grid-cols-[337px_1fr_289px]"
```

unless the layout genuinely requires those dimensions.

---

# 96. Responsive Utility Discipline

Responsive classes SHOULD represent meaningful transitions.

Good:

```tsx
grid-cols-1 md:grid-cols-2 xl:grid-cols-4
```

Avoid dozens of breakpoint-specific overrides that indicate the base layout is poorly structured.

---

# 97. Container Queries

Container queries MAY be used for reusable components whose layout depends more on container size than viewport size.

Good use cases:

- dashboard modules;
- cards;
- embedded widgets;
- reusable panels.

They SHOULD NOT replace ordinary responsive page architecture without reason.

---

# 98. Aspect Ratios

Use controlled aspect ratios for media.

Examples:

```text
16:9
4:3
1:1
```

Do not allow image dimensions to create unpredictable layout shifts.

---

# 99. Images

Images SHOULD define dimensions or aspect ratio before loading where possible.

Avoid cumulative layout shift.

Use:

- object-fit;
- responsive sizing;
- max-width constraints.

---

# 100. Layout Shift

Interfaces SHOULD minimize layout movement during:

- loading;
- data refresh;
- image load;
- validation;
- async actions.

Reserve expected space where practical.

---

# 101. Validation Layout

Validation messages SHOULD appear near affected controls without destabilizing the page unnecessarily.

Forms should tolerate error text without overlapping or clipping adjacent elements.

---

# 102. Dynamic Content

Components SHOULD expand naturally when content grows.

Avoid fixed heights for:

- cards containing variable content;
- alerts;
- text areas;
- descriptions.

Use maximum heights only when accompanied by deliberate overflow behavior.

---

# 103. Empty Optional Regions

Optional sections SHOULD collapse cleanly when absent.

Do not leave unexplained whitespace where optional data has not rendered.

---

# 104. Conditional Actions

Layouts SHOULD remain stable when users have different permissions.

Example:

If a primary action is unavailable, avoid leaving awkward empty placeholder space unless preserving alignment serves a clear purpose.

---

# 105. Permission-Aware Layouts

Do not expose large blank regions for inaccessible functionality.

The layout SHOULD adapt while preserving the overall information architecture.

---

# 106. Skeleton Layout

Skeletons SHOULD mirror the real composition.

Example:

```text
Title skeleton
Description skeleton

Toolbar skeleton

Row skeleton
Row skeleton
Row skeleton
```

Avoid generic boxes unrelated to final geometry.

---

# 107. Print Layout

If printing is a supported workflow, define explicit print behavior.

Hide:

- navigation;
- irrelevant controls;
- interactive-only elements.

Optimize:

- typography;
- page breaks;
- table width;
- content ordering.

---

# 108. Fullscreen Mode

Fullscreen layouts SHOULD be used only when immersion or space materially benefits the workflow.

Examples:

- editors;
- presentation;
- maps;
- complex visualization.

Provide a clear exit path.

---

# 109. Modal vs Page Decision

Use a page when:

- workflow is complex;
- deep linking matters;
- significant navigation is needed;
- content is lengthy;
- users need persistent context.

Use a dialog when:

- task is focused;
- transient;
- limited in scope;
- context should remain visible.

Do not force a page-sized workflow into a modal.

---

# 110. Drawer vs Page Decision

Use a drawer when:

- context should remain visible;
- task is secondary;
- workflow is short.

Use a page when:

- task becomes primary;
- complexity grows;
- deep linking or navigation matters.

---

# 111. Layout Anti-Patterns

Avoid:

```text
Every page has different horizontal padding
```

Avoid:

```text
Arbitrary max-width values per feature
```

Avoid:

```text
Desktop layout compressed directly onto mobile
```

Avoid:

```text
Absolute positioning for normal content
```

Avoid:

```text
Nested scroll areas everywhere
```

Avoid:

```text
Three sidebars without clear hierarchy
```

Avoid:

```text
Full-width forms on large desktop
```

Avoid:

```text
Huge empty margins around operational UI
```

Avoid:

```text
Data tables squeezed into narrow cards
```

Avoid:

```text
Actions moving to unpredictable locations
```

Avoid:

```text
Different grid gaps on every page
```

Avoid:

```text
Layout based on screenshot-specific pixel nudging
```

---

# 112. Layout Review Checklist

Before approving a layout, verify:

```text
□ Clear information hierarchy
□ Correct app shell
□ Canonical page container used
□ Consistent page gutters
□ Appropriate max width
□ Correct reading width
□ Stable vertical rhythm
□ Related items grouped spatially
□ Primary content receives most space
□ Primary action is easy to locate
□ Desktop composition intentional
□ Tablet composition intentional
□ Mobile composition intentional
□ No accidental horizontal overflow
□ Long text tested
□ Empty states tested
□ Error states tested
□ Loading states tested
□ Permission states tested
□ Localization considered
□ Zoom considered
□ Scroll ownership intentional
□ Sticky behavior intentional
□ No unnecessary nested scrolling
□ No arbitrary z-index
□ No fragile absolute positioning
□ No arbitrary spacing values
□ DOM order matches logical reading order
□ Layout survives dynamic content
```

---

# 113. Definition of Done — Layout

A layout is complete only when:

```text
✓ Canonical page/container structure is used
✓ Desktop layout is verified
✓ Tablet transition is verified
✓ Mobile layout is verified
✓ Long content is verified
✓ Empty state is verified
✓ Loading state is verified
✓ Error state is verified
✓ Narrow viewport overflow is verified
✓ Zoom behavior is verified
✓ Keyboard reading order is correct
✓ Sticky elements do not overlap
✓ Scroll behavior is deliberate
✓ Dynamic content does not break geometry
✓ No arbitrary dimensions without justification
✓ Layout tokens are used
✓ Content hierarchy remains clear without decoration
```

---

# 114. Golden Layout Rules

When uncertain, use these rules:

**1. Start with document flow.**  
Do not position manually unless necessary.

**2. Use one canonical page container.**  
Page alignment should feel consistent everywhere.

**3. Use spacing to establish hierarchy.**  
Do not reach for borders and cards first.

**4. Give important content more space.**  
Layout proportions should reflect task priority.

**5. Constrain content intentionally.**  
Not everything should fill the viewport.

**6. Let dense content be wide.**  
Tables and complex operational views need space.

**7. Keep focused workflows narrow.**  
Forms and reading experiences benefit from controlled width.

**8. Recompose responsively.**  
Do not shrink desktop UI.

**9. Define what scrolls.**  
Accidental nested scrolling is a layout defect.

**10. Avoid arbitrary dimensions.**  
Use tokens, intrinsic sizing, Grid, and Flexbox.

**11. Design for real content.**  
Long labels, missing values, loading, and errors are normal states.

**12. Preserve logical order.**  
Visual structure and semantic reading order should agree.

**13. Use fewer layout models.**  
Repeated page structures build product familiarity.

**14. Prefer resilience over screenshot precision.**  
A layout should survive content and viewport variation.

**15. Structure should work without decoration.**  
If hierarchy disappears when borders and color are removed, improve the layout.

---

# 115. Canonical Layout Standard

The organizational standard is:

> **All product interfaces use a predictable application shell, canonical page containers, controlled content widths, semantic spacing, responsive recomposition, intentional scroll behavior, and reusable layout patterns. Layout decisions reflect information priority rather than visual novelty. Features consume standardized templates and layout primitives instead of inventing independent page geometry.**

The result should feel:

- aligned;
- balanced;
- efficient;
- stable;
- predictable;
- responsive;
- structurally obvious.

A user should understand the page before reading every label.

A developer should be able to predict how a new screen is structured from existing screens.

A designer should be able to compose most new layouts from established templates rather than starting from a blank canvas.

This should sit in the system order as:

**Foundations → Layouts → Facade → Components → Patterns → Templates → Accessibility → Governance.**
