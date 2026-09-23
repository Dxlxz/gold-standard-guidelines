---
id: "facade"
title: "Facade Guidelines"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["engineering", "facade"]
applies_to: ["general"]
related: ["component"]
legacy_number: 2
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 19630
provenance: baseline

---

Yes. For a shadcn-primary system, I’d define a separate **Facade Guidelines** section covering the visible presentation layer: page shells, surfaces, hierarchy, density, decoration, and overall visual character.

# Facade Guidelines

## 1. Purpose

The facade is the visible product surface users interact with.

It includes:

- application shell;
- page structure;
- navigation;
- surfaces;
- cards;
- panels;
- headers;
- toolbars;
- typography hierarchy;
- borders;
- elevation;
- spacing;
- color treatment;
- responsive composition.

The facade MUST make the underlying system feel coherent regardless of which feature is being used.

The objective is not visual novelty.

The objective is:

> **Clear hierarchy, restrained presentation, predictable structure, and high information usability.**

---

# 2. Facade Principle

The default product facade SHOULD be:

- clean;
- neutral;
- structured;
- restrained;
- dense but readable;
- low-decoration;
- content-first.

The UI SHOULD feel like a product interface rather than a collection of decorative cards.

Use visual treatment only when it communicates:

- hierarchy;
- grouping;
- state;
- interaction;
- emphasis.

---

# 3. Page Anatomy

Use a predictable page structure.

```text
App Shell
├── Primary Navigation
├── Optional Secondary Navigation
└── Main
    ├── Page Header
    │   ├── Breadcrumb / Context
    │   ├── Title
    │   ├── Description / Metadata
    │   └── Actions
    ├── Optional Toolbar
    │   ├── Search
    │   ├── Filters
    │   └── View Controls
    └── Content
```

Equivalent workflows SHOULD use equivalent page anatomy.

Do not invent a new structural model for each feature.

---

# 4. Application Shell

The shell SHOULD remain visually quieter than the content it contains.

It MUST establish:

- primary navigation;
- current product context;
- account/workspace context where relevant;
- stable content boundaries.

Navigation chrome SHOULD NOT dominate the viewport.

Avoid:

- oversized sidebars;
- excessive navigation separators;
- heavy shadows around persistent navigation;
- decorative backgrounds competing with content.

---

# 5. Main Content Surface

The main content area SHOULD generally use the canonical `background` token.

Avoid placing the entire interface inside one giant card.

Prefer:

```text
Application background
    ↓
Natural page content
    ↓
Cards only where grouping requires them
```

rather than:

```text
Application background
    ↓
Huge outer card
        ↓
Nested cards
            ↓
More nested cards
```

---

# 6. Surface Hierarchy

Use a limited surface hierarchy.

Recommended model:

### Level 0 — Page

Base application background.

### Level 1 — Section

Usually separated through spacing, typography, or subtle borders.

### Level 2 — Contained surface

Card, panel, table container, settings group.

### Level 3 — Overlay

Popover, dropdown, tooltip, command surface.

### Level 4 — Modal

Dialog or alert dialog.

Each additional elevation level must have a functional reason.

---

# 7. Avoid Card Proliferation

A card is a semantic grouping mechanism, not the default container for everything.

Use a card when:

- content forms a discrete unit;
- the unit benefits from visual separation;
- the unit has its own actions;
- multiple similar units are browsed together.

Do not use cards merely to create visual decoration.

Prefer whitespace for ordinary section separation.

---

# 8. Borders

Borders SHOULD be subtle.

Use them to clarify:

- containers;
- rows;
- fields;
- separators;
- interactive boundaries.

Avoid using strong borders around every element.

Preferred hierarchy:

```text
spacing > background distinction > subtle border > shadow
```

Use the least visually heavy mechanism that communicates the relationship.

---

# 9. Shadows

Shadows SHOULD primarily represent elevation.

Appropriate:

- menus;
- popovers;
- dialogs;
- floating controls.

Usually unnecessary:

- every card;
- every table;
- every button;
- static page sections.

Large diffuse shadows SHOULD be rare in application UI.

---

# 10. Radius Language

Use one coherent radius family.

Typical facade treatment:

```text
Inputs / controls        medium
Cards / panels           medium-large
Dialogs                  medium-large
Pills                    full only when semantically appropriate
```

Avoid combining:

- sharp tables;
- heavily rounded cards;
- pill buttons;
- giant rounded modals;

without a deliberate system rationale.

---

# 11. Visual Hierarchy

Every page should have an obvious order of importance.

Recommended hierarchy:

```text
Page title
    ↓
Primary content / primary task
    ↓
Section headings
    ↓
Standard content
    ↓
Supporting metadata
```

Do not allow:

- badges;
- decorative icons;
- borders;
- bright colors;
- action buttons;

to compete with the page title or primary task without reason.

---

# 12. Primary Action

Each meaningful surface SHOULD normally have one dominant primary action.

Examples:

```text
Create project
Invite member
Save changes
Publish
Continue
```

Secondary actions SHOULD receive less emphasis.

Avoid multiple adjacent primary buttons.

Bad:

```text
[Save] [Publish] [Share] [Export]
```

Better:

```text
[More ▾] [Save changes]
```

where the workflow permits it.

---

# 13. Page Headers

Canonical page header:

```text
Optional eyebrow / breadcrumb

Page title                     Primary action
Short description              Secondary actions
Optional metadata
```

Page titles SHOULD usually be concise.

Descriptions SHOULD explain context, not restate the title.

Bad:

```text
Projects

This is the projects page where you can manage your projects.
```

Better:

```text
Projects

Create and manage projects available to your workspace.
```

---

# 14. Section Headers

Sections SHOULD generally use:

```text
Section title
Optional short description
Optional contextual action
```

Avoid oversized section titles.

Page-level typography should remain visually distinct from section-level typography.

---

# 15. Density

Default product density SHOULD favor practical information usage over excessive whitespace.

Avoid interfaces where:

- each row occupies excessive vertical space;
- simple settings require very long scrolling;
- cards contain more padding than content;
- every section behaves like a marketing landing page.

Use generous spacing at major structural boundaries and tighter spacing inside functional groups.

---

# 16. Horizontal Alignment

Establish consistent alignment anchors.

Page elements SHOULD align to:

- page gutter;
- content column;
- table boundary;
- form control boundary;
- card boundary.

Misaligned edges create visual noise.

Avoid arbitrary independent horizontal offsets.

---

# 17. Vertical Rhythm

Maintain predictable vertical rhythm.

Example:

```text
Page title

Description

Large section gap

Section heading
Small description gap
Content

Large section gap

Next section
```

Do not use arbitrary gaps to compensate for weak hierarchy.

---

# 18. Content Width

Do not automatically stretch all content across large screens.

Use widths appropriate to the content.

### Narrow

Best for:

- prose;
- settings descriptions;
- forms requiring focused reading.

### Medium

Best for:

- forms;
- detail views;
- configuration pages.

### Full-width

Best for:

- tables;
- dashboards;
- dense data;
- multi-column interfaces.

The shell MAY be wide while individual content regions remain constrained.

---

# 19. Forms Facade

Forms SHOULD generally use a restrained layout.

Preferred:

```text
Label
Description
[Input]

Label
[Input]
```

For settings interfaces:

```text
Setting title          [Control]
Supporting copy
```

Avoid placing every field inside a decorative card unless each field represents an independent setting group.

---

# 20. Settings Pages

Settings pages SHOULD emphasize structure over decoration.

Recommended pattern:

```text
Settings
├── General
├── Members
├── Billing
└── Security
```

Within a section:

```text
Section title
Description

Setting
Setting
Setting
─────────────
Setting group
```

Cards MAY be used for clearly independent configuration domains.

Avoid one card per setting.

---

# 21. Tables

Tables SHOULD usually feel integrated with the page rather than floating as decorative objects.

Recommended structure:

```text
Section/Header
Toolbar
Table container
Pagination
```

Use:

- subtle borders;
- clear headers;
- restrained row separators;
- predictable hover states.

Avoid:

- excessive rounded treatment;
- heavy shadow;
- alternating decorative backgrounds unless necessary;
- excessive badges inside every cell.

---

# 22. Dashboards

Dashboards SHOULD prioritize information hierarchy.

Use:

```text
Important metrics
    ↓
Primary visualization or operational content
    ↓
Secondary data
```

Do not make every metric equally prominent.

Avoid filling the page with many identical cards.

Prefer differentiated hierarchy through:

- size;
- grouping;
- position;
- typography.

Not through arbitrary color.

---

# 23. Metric Cards

Metric cards SHOULD contain only necessary information.

Typical:

```text
Revenue
$124,320
+8.4% from last month
```

Avoid:

- multiple decorative icons;
- gradients;
- unnecessary charts;
- large status pills;
- excessive borders.

The metric itself should dominate.

---

# 24. Color Usage

Most facade surfaces SHOULD use neutral semantic colors.

Brand or primary color SHOULD primarily indicate:

- actionable emphasis;
- selection;
- focus;
- active state;
- important branded moments.

Do not tint every large surface with brand color.

A restrained neutral interface makes meaningful color more effective.

---

# 25. Accent Color

Accent color SHOULD be used sparingly.

Appropriate:

- selected navigation;
- active tab;
- primary button;
- focus indication;
- selected filter;
- significant status.

Inappropriate:

- every heading;
- every icon;
- all card borders;
- decorative background strips.

---

# 26. Muted Content

Use muted content for secondary information.

Examples:

- timestamps;
- helper text;
- identifiers;
- supplemental metadata.

Muted content must remain readable.

Do not use low contrast simply to make a page feel visually quieter.

---

# 27. Icons in the Facade

Icons SHOULD support comprehension.

Good:

```text
Search
Settings
Delete
External link
Calendar
```

when paired with familiar conventions.

Avoid placing an icon before every heading purely for decoration.

Section titles do not automatically require icons.

---

# 28. Badges

Badges SHOULD communicate compact categorical information.

Examples:

```text
Active
Draft
Admin
Beta
Overdue
```

Do not badge ordinary text unnecessarily.

Avoid turning every metadata value into a pill.

Too many pills produce visual fragmentation.

---

# 29. Empty Space

Whitespace is structural.

Use it to indicate relationships and separate conceptual regions.

Avoid both extremes:

### Too little

Everything merges together.

### Too much

The product becomes inefficient and marketing-like.

The default should be **compact clarity**.

---

# 30. Dividers

Use dividers when spacing alone does not sufficiently communicate a boundary.

Do not place separators between every adjacent item.

For lists and tables, consistent row structure may be sufficient.

---

# 31. Navigation Facade

Navigation SHOULD have strong state clarity.

Users must easily distinguish:

- active;
- inactive;
- hovered;
- focused;
- disabled.

Active navigation SHOULD NOT rely on color alone.

Possible indicators include:

- background;
- font weight;
- border;
- position marker.

Avoid overly prominent active treatments that overpower page content.

---

# 32. Sidebar

A sidebar SHOULD be functionally dense and visually quiet.

Recommended:

- compact items;
- clear grouping;
- consistent icon sizing;
- restrained active state;
- predictable collapse behavior.

Avoid:

- large cards inside sidebars;
- decorative gradients;
- excessive section labels;
- multiple accent colors.

---

# 33. Top Navigation

Top navigation SHOULD be used where horizontal hierarchy is appropriate.

Keep persistent header height restrained.

The top bar SHOULD NOT become a large decorative banner in productivity interfaces.

---

# 34. Toolbars

Toolbars SHOULD place controls by frequency and importance.

Typical order:

```text
Search | Filters | View controls                 Primary action
```

or:

```text
Selection actions                        Secondary controls
```

Avoid scattered actions across multiple unrelated page regions.

---

# 35. Secondary Controls

Use subtle variants for secondary controls:

- outline;
- ghost;
- icon button;
- dropdown menu.

Do not make secondary operations visually equal to the primary task.

---

# 36. Destructive Visual Treatment

Destructive styling SHOULD be reserved for actual destructive behavior.

Do not use red for:

- generic warnings;
- active filters;
- navigation;
- routine negative values;

unless the semantic meaning is genuinely destructive or critical.

Overusing destructive color weakens its meaning.

---

# 37. Status Colors

Status colors MUST be semantically consistent across the application.

For example:

```text
Success → successful/completed
Warning → attention/risk
Destructive → failure/danger
Info → neutral informational state
```

A status token MUST NOT mean different things on different pages.

---

# 38. Modals

Dialogs SHOULD visually separate from the page without excessive dramatization.

Use:

- clear overlay;
- defined surface;
- moderate elevation;
- strong heading hierarchy.

Avoid:

- giant radius;
- very heavy shadows;
- oversized title treatment;
- decorative gradients.

---

# 39. Overlays

Dropdowns, popovers, command menus, and tooltips SHOULD share an identifiable overlay language.

Keep consistent:

- radius;
- border;
- shadow;
- background;
- padding;
- animation.

Users should recognize overlays as part of one system.

---

# 40. Responsive Facade

Responsive layouts MUST preserve hierarchy.

Desktop:

```text
Title                          Actions
Description

Toolbar
Content
```

Mobile:

```text
Title
Description

Primary action
Secondary actions

Toolbar
Content
```

Do not simply shrink desktop controls until they fit.

Recompose intentionally.

---

# 41. Mobile Facade

On mobile:

- prioritize one-column flow;
- preserve primary actions;
- stack control groups;
- collapse secondary controls;
- avoid excessive fixed headers;
- maintain comfortable touch targets;
- keep headings proportionate.

Do not reproduce desktop density blindly.

---

# 42. Sticky Elements

Sticky UI requires functional justification.

Appropriate:

- table headers;
- primary navigation;
- important save controls;
- persistent filter context.

Avoid stacking multiple sticky bars that consume significant viewport height.

---

# 43. Marketing vs Application Facade

Do not mix marketing visual language indiscriminately into core application UI.

Marketing surfaces MAY use:

- larger typography;
- imagery;
- gradients;
- expressive composition;
- broader spacing.

Application surfaces SHOULD favor:

- information density;
- efficiency;
- stability;
- predictability.

Shared brand tokens may remain consistent without requiring identical layouts.

---

# 44. Decorative Effects

The following are opt-in, not default:

```text
Gradients
Glassmorphism
Backdrop blur
Glow
Noise textures
Large illustrations
Animated backgrounds
3D effects
Oversized shadows
```

They require a specific product or brand rationale.

Do not introduce them simply to make an interface appear more "premium."

---

# 45. Data Visualization Facade

Charts SHOULD integrate with the surrounding UI.

Use a restrained chart palette.

Do not use:

- excessive gradients;
- 3D charts;
- unnecessary animation;
- unrelated colors.

Chart color must encode meaningful distinction.

Important values SHOULD remain available outside color alone where possible.

---

# 46. Loading Facade

Loading states SHOULD preserve page geometry where practical.

Prefer:

```text
Existing shell
Existing title
Existing controls where usable
Skeleton/content loading
```

over:

```text
Entire page disappears
↓
Centered spinner
```

Stable structure improves perceived performance.

---

# 47. Error Facade

Errors SHOULD appear near the context where they occurred.

Page-level failures may use a larger error surface.

Field errors remain field-level.

Action errors remain action-contextual where possible.

Avoid unnecessarily turning recoverable failures into full-page states.

---

# 48. Empty State Facade

Empty states SHOULD be visually quieter than successful content.

Typical structure:

```text
Optional simple icon

No projects yet

Create a project to start organizing your work.

[Create project]
```

Avoid excessive illustration unless the product brand explicitly calls for it.

---

# 49. Focus and Hover

Hover is a supporting state.

Focus is an accessibility state and MUST be clearly visible.

Do not make hover substantially transform the component.

Preferred:

- subtle background shift;
- border shift;
- underline;
- light elevation change where appropriate.

Avoid dramatic scaling or movement.

---

# 50. Visual Noise Budget

Every additional visual signal consumes attention.

Signals include:

- color;
- icon;
- border;
- badge;
- shadow;
- bold typography;
- animation;
- background tint.

If five signals communicate the same thing, remove most of them.

Aim for the minimum number of signals required to establish hierarchy.

---

# 51. Facade Anti-Patterns

Avoid:

```text
Card inside card inside card
```

Avoid:

```text
Every section has an icon
Every item has a badge
Every card has a shadow
Every button uses primary color
```

Avoid:

```text
Large radius
+ gradient
+ shadow
+ border
+ tinted background
```

on a single ordinary component.

Avoid:

```text
Different page structure for every feature
```

Avoid:

```text
Marketing landing-page spacing inside operational workflows
```

Avoid:

```text
Dashboard composed entirely of equal-sized cards
```

Avoid:

```text
Raw shadcn defaults with no product-level hierarchy
```

The design system must still make deliberate product decisions.

---

# 52. Facade Review Checklist

Before approving a facade, verify:

```text
□ Clear page hierarchy
□ Primary task obvious
□ No competing primary actions
□ Consistent page gutters
□ Consistent content alignment
□ Appropriate content width
□ Semantic surfaces
□ Limited elevation hierarchy
□ No unnecessary cards
□ No excessive borders
□ No excessive shadows
□ Consistent radius
□ Brand color used selectively
□ Status colors semantically consistent
□ Typography hierarchy clear
□ Spacing expresses relationships
□ Information density appropriate
□ Mobile layout intentionally recomposed
□ Empty state considered
□ Loading state considered
□ Error state considered
□ Focus state visible
□ Dark mode preserves hierarchy
□ No decorative treatment without purpose
```

---

# 53. Golden Facade Rule

When choosing between two treatments, prefer the one that uses:

- fewer containers;
- fewer colors;
- fewer borders;
- fewer shadows;
- fewer decorative icons;
- stronger alignment;
- clearer typography;
- better spacing;
- more obvious hierarchy.

The final facade should feel **intentional rather than decorated**.

For your broader standard, I’d place this **after Foundations and before individual Component Guidelines**. That gives you a clean hierarchy:

**Foundations → Facade → Components → Patterns → Templates → Accessibility → Governance.**
