---
id: "design-system"
title: "Design System Gold Standard — shadcn/ui Primary"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "system", "shadcn", "ui"]
applies_to: ["ui"]
related: []
legacy_number: 1
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 45405
provenance: baseline

---

Below is a complete standard suitable for a **design-system spec, engineering handbook, or AI-agent instruction set**. It treats shadcn/ui as the primary implementation layer while establishing stricter product-level rules above it.

# Design System Gold Standard

## 1. Purpose

This document defines the canonical standard for designing and implementing product interfaces.

The system exists to produce interfaces that are:

- Consistent
- Accessible
- Composable
- Maintainable
- Responsive
- Predictable
- Visually restrained
- Fast to build
- Easy to extend without fragmentation

**shadcn/ui is the primary UI foundation.**

shadcn components are implementation primitives, not the final design system. The product design system consists of:

1. Foundations and semantic tokens
2. Canonical UI primitives
3. Product components
4. Reusable interaction patterns
5. Page templates
6. Accessibility standards
7. Content conventions
8. Engineering conventions
9. Governance and contribution rules

The fundamental rule is:

> **Use the system first. Extend the system second. Create bespoke UI only when the existing system cannot express the requirement cleanly.**

---

# 2. Normative Language

The terms below are intentional:

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless there is a documented reason not to.
- **SHOULD NOT** — generally prohibited unless justified.
- **MAY** — optional.

Exceptions to a MUST require explicit design-system review.

---

# 3. System Hierarchy

Use the following hierarchy:

```text
Design Tokens
    ↓
shadcn/ui Primitives
    ↓
Canonical Product Components
    ↓
Product Patterns
    ↓
Page Templates
    ↓
Features
```

Features SHOULD consume components from higher layers rather than recreating lower-level styling themselves.

For example:

```text
Semantic tokens
    ↓
Button
    ↓
ConfirmAction
    ↓
DeleteProjectDialog
    ↓
Project Settings
```

Feature code SHOULD express product intent, not redesign fundamental UI behavior.

---

# 4. Core Principles

## 4.1 System over local preference

Do not optimize individual screens at the expense of system consistency.

A slightly less bespoke solution that follows established patterns is generally preferable to a locally optimized solution that introduces another pattern.

---

## 4.2 Composition over duplication

Build complex UI by composing established primitives.

Prefer:

```text
Dialog
├── DialogHeader
│   ├── DialogTitle
│   └── DialogDescription
├── Form
└── DialogFooter
```

over a custom modal with independently implemented focus, spacing, typography, actions, and keyboard handling.

---

## 4.3 Semantic styling over literal styling

Use semantic roles.

Prefer:

```text
background
foreground
primary
primary-foreground
muted
muted-foreground
border
destructive
ring
```

Do not encode product meaning through literal values such as:

```text
zinc-950
gray-500
red-600
#18181b
rgba(...)
```

inside feature code.

---

## 4.4 Familiarity over novelty

Standard interface behavior SHOULD remain standard.

Examples:

- Buttons look clickable.
- Links look navigational.
- Destructive actions are clearly identified.
- Dialogs behave like dialogs.
- Form labels describe inputs.
- Disabled controls look disabled.
- Selected items are distinguishable from hovered items.
- Focus is visible.
- Tables behave like tables.

Avoid novelty that reduces comprehension.

---

## 4.5 Accessibility is structural

Accessibility MUST NOT be treated as final QA polish.

Correct semantics, focus handling, keyboard behavior, labeling, contrast, reduced motion, and screen-reader behavior are component requirements.

---

## 4.6 Progressive disclosure

Do not expose complexity earlier than necessary.

Show:

- the most important information first;
- primary actions prominently;
- advanced controls when relevant;
- secondary metadata with lower visual emphasis.

Avoid making every element visually important.

---

# 5. Component Source Policy

Use this priority order when implementing UI:

### Priority 1 — Existing product-system component

If a canonical internal component exists, use it.

Do not reinstall or recreate a separate version.

### Priority 2 — Existing shadcn/ui component

Use the corresponding shadcn component and adapt it through the central design system.

### Priority 3 — Compose existing components

Combine sanctioned components to create the needed behavior.

### Priority 4 — Extend centrally

If the requirement repeats or represents a general product concept, create or extend a design-system component.

### Priority 5 — Approved external component

Third-party components MAY be introduced when there is substantial implementation value and no suitable system solution.

They MUST be reviewed for:

- accessibility;
- dependency quality;
- bundle impact;
- API design;
- maintainability;
- visual compatibility;
- SSR/RSC compatibility where applicable;
- keyboard behavior;
- long-term ownership.

### Priority 6 — Bespoke implementation

Build from scratch only where existing primitives cannot adequately satisfy the requirement.

Bespoke foundational controls require design-system review.

---

# 6. Design Tokens

Tokens are the source of truth for visual decisions.

Feature code MUST NOT create independent visual scales.

## 6.1 Token categories

Maintain tokens for:

- Color
- Typography
- Spacing
- Sizing
- Radius
- Border
- Shadow
- Motion
- Breakpoints
- Z-index
- Data visualization where applicable

---

# 7. Color System

## 7.1 Semantic colors

The canonical color layer SHOULD expose semantic tokens such as:

```text
background
foreground

card
card-foreground

popover
popover-foreground

primary
primary-foreground

secondary
secondary-foreground

muted
muted-foreground

accent
accent-foreground

destructive
destructive-foreground

border
input
ring
```

Additional semantic states MAY include:

```text
success
success-foreground

warning
warning-foreground

info
info-foreground
```

Data-visualization tokens MAY use:

```text
chart-1
chart-2
chart-3
chart-4
chart-5
```

---

## 7.2 Never encode meaning using raw colors

Avoid:

```tsx
className="text-red-600"
```

for destructive states.

Prefer:

```tsx
className="text-destructive"
```

This keeps meaning stable across themes and future brand changes.

---

## 7.3 Background/foreground pairing

Every semantic surface SHOULD have an intentional foreground pair.

For example:

```text
primary
primary-foreground
```

Never assume white or black text will remain correct if the surface token changes.

---

## 7.4 Dark mode

Dark mode MUST use the same semantic hierarchy as light mode.

Do not build an independent dark UI.

Components SHOULD reference semantic tokens so theme changes occur at the token layer.

Dark mode MUST preserve:

- hierarchy;
- readability;
- accessible contrast;
- interaction states;
- border visibility;
- destructive/status distinction.

---

## 7.5 Color cannot be the only signal

Never communicate a state through color alone.

Pair color with at least one additional indicator such as:

- text;
- icon;
- shape;
- label;
- position;
- pattern.

---

# 8. Typography

Typography should create hierarchy, not decoration.

## 8.1 Roles

Maintain semantic typography roles rather than arbitrary sizes.

Recommended hierarchy:

| Role | Typical purpose |
|---|---|
| Display | Rare marketing/product hero use |
| H1 | Page title |
| H2 | Major page section |
| H3 | Card/section subsection |
| H4 | Minor grouping |
| Body | Standard content |
| Body Small | Secondary content |
| Label | Form/control labels |
| Caption | Supporting metadata |
| Code | Technical values |

---

## 8.2 Typography rules

Page hierarchy SHOULD generally contain one primary H1.

Do not choose heading level based on desired visual size. Use correct semantic structure and style separately.

Body copy SHOULD prioritize readability.

Avoid excessive font weights.

Recommended emphasis:

- Normal body: regular
- Interface emphasis: medium
- Headings: semibold where appropriate
- Bold: exceptional emphasis only

Avoid long runs of low-contrast muted text.

---

## 8.3 Text alignment

Default interface text to left alignment in left-to-right languages.

Centered text SHOULD generally be limited to:

- empty states;
- confirmation moments;
- onboarding;
- marketing surfaces;
- narrow standalone messages.

Long text SHOULD NOT be centered.

---

# 9. Spacing

Use a consistent spacing scale.

Do not introduce arbitrary spacing values to fix isolated layout issues.

Typical scale:

```text
1
2
3
4
5
6
8
10
12
16
20
24
```

Use smaller spacing for relationships within a component and larger spacing between conceptual sections.

General hierarchy:

```text
Label ↔ Input              tight
Title ↔ Description        tight
Items in same group        moderate
Groups in same section     larger
Independent sections       largest
```

Whitespace MUST communicate grouping.

---

# 10. Density

Products MAY support density variants where necessary:

- Comfortable
- Default
- Compact

Density SHOULD be controlled systematically rather than by individual screens.

Do not mix arbitrary control heights within the same interaction group.

Compact layouts MUST remain usable and accessible.

---

# 11. Border Radius

Use a centralized radius scale.

Suggested semantic application:

```text
sm   → small controls / tags
md   → inputs and compact components
lg   → cards and standard surfaces
xl   → prominent surfaces
full → avatars, pills, circular controls
```

Avoid random radius values.

A product SHOULD have a recognizable radius language rather than mixing sharp, rounded, and pill-shaped controls indiscriminately.

---

# 12. Borders and Elevation

Borders and shadows establish surface hierarchy.

Use borders for:

- separation;
- grouping;
- input boundaries;
- low-elevation surfaces.

Use shadow sparingly for:

- overlays;
- floating menus;
- popovers;
- dialogs;
- elevated transient surfaces.

Do not add shadows solely as decoration.

Avoid excessive card nesting.

A border, background change, spacing, or typography hierarchy is often sufficient.

---

# 13. Icons

Use one sanctioned icon family throughout the product.

Do not mix icon styles unless there is a strong product requirement.

Icons MUST:

- have consistent optical sizing;
- use predictable stroke weight;
- align correctly with labels;
- include accessible labels when meaning is not otherwise communicated.

Icon-only controls MUST have an accessible name.

Tooltips SHOULD be provided when the icon's meaning is not universally apparent.

Do not use icons as decoration when they add no information.

---

# 14. Motion

Motion exists to communicate:

- state change;
- spatial relationship;
- continuity;
- feedback.

Motion MUST NOT obstruct task completion.

Typical transitions SHOULD be brief.

Avoid:

- gratuitous bouncing;
- excessive scaling;
- long page transitions;
- continuous decorative movement;
- animation on every hover state.

Respect `prefers-reduced-motion`.

Essential interactions MUST remain understandable when animation is reduced or removed.

---

# 15. Responsive Design

Design responsive behavior intentionally.

Do not treat mobile as a compressed desktop.

The interface SHOULD work across:

- narrow mobile;
- mobile;
- tablet;
- laptop;
- desktop;
- wide desktop.

Breakpoints represent layout transitions, not target devices.

---

## 15.1 Responsive hierarchy

At narrower widths:

- preserve primary actions;
- stack content where appropriate;
- collapse secondary navigation;
- reduce nonessential metadata;
- transform wide tables when necessary;
- avoid horizontal overflow.

Do not hide critical functionality solely because the viewport is small.

---

## 15.2 Mobile interaction

Touch targets MUST be comfortably operable.

Avoid placing multiple tiny actions immediately adjacent to one another.

Hover MUST NOT be required to discover essential functionality.

---

# 16. Layout

Use predictable page anatomy.

A typical application page:

```text
App Shell
├── Global Navigation
├── Context Navigation
└── Main
    ├── Page Header
    │   ├── Title
    │   ├── Description / Metadata
    │   └── Page Actions
    ├── Optional Tabs / Filters
    └── Page Content
```

Use consistent page gutters and maximum widths.

Do not invent unique page margins for individual features.

---

# 17. Page Headers

A page header SHOULD establish:

- current location;
- primary title;
- optional supporting description;
- important metadata;
- primary action.

Do not overload page headers with low-priority controls.

Primary action placement SHOULD remain consistent across comparable pages.

---

# 18. Buttons

Use the canonical `Button`.

Do not implement clickable `<div>` or `<span>` elements where a button is semantically correct.

## 18.1 Button hierarchy

Typical variants:

- Primary/default
- Secondary
- Outline
- Ghost
- Destructive
- Link

Use primary styling sparingly.

A surface generally SHOULD NOT contain multiple competing primary actions.

---

## 18.2 Button labels

Use action-oriented language.

Prefer:

```text
Create project
Save changes
Invite member
Delete project
Continue
```

Avoid vague labels such as:

```text
OK
Yes
Submit
Click here
```

when a specific action can be stated.

---

## 18.3 Button states

Buttons MUST support:

- default;
- hover;
- active;
- focus-visible;
- disabled;
- loading where required.

Loading actions SHOULD prevent accidental repeated submission.

If the operation changes the button label during loading, layout shift SHOULD be minimized.

---

# 19. Links

Use links for navigation.

Use buttons for actions.

A control that performs an operation MUST NOT be styled as a navigation link solely for visual convenience.

External links SHOULD be identifiable where the distinction materially affects user expectations.

---

# 20. Forms

Forms are one of the highest-priority consistency areas.

Use established field primitives.

Typical structure:

```text
Field
├── Label
├── Control
├── Description
└── Error
```

Labels MUST be programmatically associated with their controls.

Placeholder text MUST NOT replace a label.

---

## 20.1 Field ordering

Use logical reading order.

Related fields SHOULD be grouped.

Do not divide a form into visual columns unless the grouping remains obvious.

Long forms SHOULD be sectioned.

---

## 20.2 Required fields

Use one consistent convention.

If nearly every field is required, identifying optional fields is often clearer than decorating every required field.

---

## 20.3 Validation

Validation errors SHOULD:

- identify the affected field;
- explain the problem;
- indicate how to correct it;
- persist until resolved where appropriate.

Avoid messages like:

```text
Invalid input
Error
Bad value
```

Prefer:

```text
Enter a valid email address.
Password must contain at least 8 characters.
Project name is required.
```

Do not clear user input after validation failure.

---

## 20.4 Validation timing

Validate at the moment most useful to the user.

Avoid aggressively showing errors before users have had an opportunity to interact with the field.

Server-side validation remains required when relevant regardless of client-side validation.

---

# 21. Inputs

Use the canonical input components.

Do not introduce locally styled input borders, focus states, heights, or typography.

Input variants SHOULD be driven by state:

```text
default
disabled
invalid
read-only
```

Do not encode domain-specific meaning into arbitrary variants.

---

# 22. Selects and Comboboxes

Use a Select for constrained option sets where search is unnecessary.

Use a Combobox where:

- options are numerous;
- search matters;
- users need fast keyboard selection.

Use native select where native behavior provides substantial accessibility or mobile advantages and custom behavior is unnecessary.

---

# 23. Checkbox, Radio, and Switch

Use:

- **Checkbox** for independent selections.
- **Radio Group** for one selection from a mutually exclusive set.
- **Switch** for an immediate binary setting.

A switch SHOULD generally represent a setting that takes effect immediately.

Do not use a switch as a decorative replacement for every checkbox.

---

# 24. Dialogs

Use dialogs for focused tasks requiring temporary interruption.

Dialogs SHOULD contain one clear purpose.

Do not place entire applications inside dialogs.

Use consistent structure:

```text
Dialog
├── DialogHeader
│   ├── DialogTitle
│   └── DialogDescription
├── DialogContent
└── DialogFooter
```

Dialogs MUST:

- trap focus correctly when modal;
- provide keyboard dismissal when appropriate;
- return focus appropriately;
- have an accessible title;
- preserve destructive-action clarity.

---

# 25. Alert Dialogs

Use Alert Dialog for consequential confirmation that requires explicit acknowledgment.

Examples:

- destructive deletion;
- irreversible reset;
- account removal;
- significant irreversible state transition.

Do not require confirmation for routine reversible actions.

Confirmation fatigue reduces the value of confirmation.

---

# 26. Destructive Actions

Destructive actions require deliberate hierarchy.

Typical pattern:

```text
Delete project
```

opens:

```text
Delete project?

This permanently removes the project and its associated data.

[Cancel] [Delete project]
```

The destructive button MUST describe the actual action.

Avoid ambiguous destructive confirmations such as:

```text
[No] [Yes]
```

Prefer explicit verbs.

---

# 27. Dropdown Menus

Use dropdown menus for secondary or contextual actions.

Primary actions SHOULD generally remain visible.

Do not hide the only important action inside an overflow menu without a good reason.

Menu items MUST have predictable keyboard behavior.

Separate destructive items when appropriate.

---

# 28. Tooltips

Tooltips provide supplementary explanation.

They MUST NOT contain information required to complete a workflow.

Use them primarily for:

- unfamiliar icon-only controls;
- abbreviated content;
- concise clarification.

Avoid tooltips for obvious controls.

---

# 29. Popovers

Use popovers for lightweight contextual interaction.

Examples:

- compact filters;
- date selection;
- auxiliary settings;
- explanatory content with interaction.

Use dialogs when the task becomes complex enough to require stronger focus management or more space.

---

# 30. Sheets and Drawers

Use sheets/drawers for secondary workflows that benefit from preserving page context.

Examples:

- details;
- mobile navigation;
- filters;
- quick editing;
- contextual settings.

Avoid using sheets simply because they appear visually modern.

The interaction model must justify the pattern.

---

# 31. Cards

Cards group related information and actions.

A card SHOULD have a clear information boundary.

Do not turn every section into a card.

Avoid:

```text
Card
  → Card
      → Card
          → Card
```

Prefer whitespace and section hierarchy when no meaningful container boundary exists.

---

# 32. Tables and Data Tables

Use semantic tables for genuinely tabular information.

Data tables MAY provide:

- sorting;
- filtering;
- column visibility;
- selection;
- pagination;
- bulk actions;
- row actions.

Avoid converting every list into a data table.

---

## 32.1 Table hierarchy

Table headers MUST be clearly distinguishable.

Numeric values SHOULD generally align consistently.

Actions SHOULD occupy a predictable location.

Selection controls SHOULD remain separate from row navigation behavior.

---

## 32.2 Table empty state

A table with zero results SHOULD explain why.

Differentiate:

```text
No records exist.
```

from:

```text
No results match the current filters.
```

Offer the appropriate recovery action.

---

## 32.3 Responsive tables

Do not blindly shrink wide desktop tables.

Depending on the task, use:

- horizontal scrolling;
- reduced columns;
- expandable rows;
- responsive card representations;
- dedicated detail views.

Information priority should determine the transformation.

---

# 33. Navigation

Navigation must answer:

1. Where am I?
2. Where can I go?
3. What level of hierarchy am I viewing?

Use stable placement for primary navigation.

Avoid moving major navigation controls between comparable pages.

---

# 34. Breadcrumbs

Use breadcrumbs when they communicate meaningful hierarchy.

Do not use breadcrumbs merely because the component exists.

Breadcrumbs SHOULD represent navigable structure rather than browser history.

---

# 35. Tabs

Tabs switch between peer views within the same context.

Use tabs when sections are related and users benefit from switching without leaving the contextual object.

Do not use tabs as arbitrary styling for unrelated navigation.

Tab labels SHOULD remain concise.

---

# 36. Pagination

Use pagination where datasets are intentionally divided into pages.

Where appropriate, display enough context for users to understand:

- current range;
- current page;
- total results or pages.

Infinite scroll SHOULD only be used when the browsing model benefits from continuous discovery.

---

# 37. Search

Search SHOULD be easy to identify and clear.

Use domain-specific placeholder language only when useful.

For example:

```text
Search projects…
```

rather than:

```text
Type something…
```

Search results SHOULD distinguish:

- loading;
- empty dataset;
- no matching results;
- failure.

---

# 38. Filters

Filters SHOULD make the current state apparent.

Users must be able to:

- understand active filters;
- remove an individual filter;
- clear filters where appropriate.

Do not allow hidden filter state to produce inexplicable results.

---

# 39. Command Interfaces

Use command palettes for expert acceleration, not as the only way to access important functions.

Commands SHOULD:

- have clear labels;
- support keyboard navigation;
- be searchable;
- group related actions;
- indicate shortcuts consistently.

Critical actions MUST remain discoverable elsewhere unless the product is explicitly command-centric.

---

# 40. Status and Feedback

Every asynchronous operation needs an intentional feedback model.

Possible states:

```text
idle
loading
success
empty
error
partial
disabled
```

Do not design only the ideal successful state.

---

# 41. Loading States

Use the least disruptive appropriate loading state.

### Spinner

For compact actions or indeterminate operations.

### Skeleton

When preserving content structure reduces perceived disruption.

### Progress indicator

When meaningful progress can be communicated.

Avoid replacing an entire stable page with a global spinner for small local updates.

Preserve existing information while refreshing where feasible.

---

# 42. Skeletons

Skeletons SHOULD approximate the structure of the eventual content.

Do not use arbitrary skeleton rectangles unrelated to final layout.

Avoid excessive animation.

---

# 43. Toasts

Toasts are appropriate for transient feedback that does not require immediate intervention.

Examples:

```text
Project created
Changes saved
Link copied
Invitation sent
```

Toasts SHOULD NOT be the sole communication channel for:

- critical errors;
- validation errors;
- destructive consequences;
- information users must reference later.

Avoid redundant success toasts when the resulting interface state already clearly communicates success.

---

# 44. Alerts

Use inline alerts when information must remain visible in context.

Severity MAY include:

```text
info
success
warning
destructive
```

Use semantic styling and explicit text rather than color alone.

---

# 45. Empty States

Empty states must explain the absence of content.

Distinguish at least:

### First-use empty state

Nothing has been created yet.

Include education or a creation action where appropriate.

### No-results empty state

Content exists, but no item matches search or filters.

Provide filter/search recovery.

### Unavailable/error state

Content could not be retrieved.

Provide useful recovery guidance.

Avoid decorative empty-state copy that obscures the actual situation.

---

# 46. Error States

Errors should answer:

1. What happened?
2. What can the user do?
3. Is their work safe?
4. Can they retry?

Do not expose raw infrastructure errors to ordinary users.

Technical details MAY be exposed through diagnostics when appropriate.

---

# 47. Success States

Success feedback SHOULD be proportional to the action.

Routine save:

```text
Changes saved
```

does not require a celebratory modal.

Major milestone completion MAY justify a stronger state.

---

# 48. State Preservation

Whenever practical, preserve:

- user-entered form data;
- search text;
- filters;
- pagination;
- tab selection;
- scroll position;
- expanded state.

Unexpected state loss damages trust.

---

# 49. Content Design

Interface copy is part of the design system.

Use concise, direct language.

Prefer:

```text
Create project
```

over:

```text
Proceed with project creation
```

Prefer:

```text
We couldn't save your changes.
```

over:

```text
An error occurred during the save operation.
```

Avoid technical terminology unless the target audience expects it.

---

# 50. Capitalization

Use one capitalization convention consistently.

Sentence case is recommended for most interface text:

```text
Account settings
Create project
Invite team member
```

Avoid unnecessary title case:

```text
Account Settings
Create Project
Invite Team Member
```

unless product brand standards explicitly require it.

---

# 51. Punctuation

Buttons and compact labels generally SHOULD NOT end in periods.

Descriptions and complete sentences SHOULD use normal punctuation.

Ellipses MAY indicate continuation where appropriate:

```text
Search…
Loading…
```

Do not use `"..."` indiscriminately in action labels.

---

# 52. Dates, Times, Numbers, and Units

Formatting MUST be localized where relevant.

Use one canonical abstraction for:

- dates;
- times;
- time zones;
- currency;
- percentages;
- decimal precision;
- file sizes;
- measurement units.

Do not manually format these independently across features.

---

# 53. Accessibility Standard

Accessibility compliance is mandatory.

As a baseline, components SHOULD target WCAG 2.2 AA unless a stricter organizational standard applies.

---

## 53.1 Keyboard

Every interactive feature MUST be keyboard usable.

Users must be able to:

- reach interactive elements;
- identify focus;
- activate controls;
- escape dismissible overlays;
- navigate composite widgets appropriately.

Do not create keyboard traps.

---

## 53.2 Focus

Focus indicators MUST remain visible.

Never globally remove outlines without providing an equivalent accessible focus state.

Use `focus-visible` behavior where appropriate to distinguish keyboard interaction without hiding keyboard focus.

---

## 53.3 Semantic HTML

Prefer native semantic elements.

Use:

```html
<button>
<a>
<input>
<label>
table
nav
main
header
section
```

appropriately.

Do not recreate native semantics using generic elements unless necessary.

---

## 53.4 Accessible names

Every interactive control MUST have an accessible name.

Icon-only buttons require accessible labeling.

Images require appropriate alt behavior.

Decorative images SHOULD be ignored by assistive technology.

---

## 53.5 Contrast

Text, controls, states, and focus indicators MUST meet applicable contrast requirements.

Muted styling cannot become unreadable styling.

---

## 53.6 Reduced motion

Respect reduced-motion preferences.

Remove or simplify nonessential animation where requested by the operating system.

---

## 53.7 Zoom and text resizing

Layouts SHOULD remain operable when users enlarge text or zoom substantially.

Do not depend on fixed dimensions that cause important text to clip.

---

# 54. Component API Standards

Canonical components should expose a predictable API.

Avoid excessive boolean props such as:

```tsx
<Card
  compact
  blue
  elevated
  rounded
  bordered
  interactive
  special
/>
```

Prefer composition and meaningful variants.

---

## 54.1 Variants

Variants must represent meaningful system-level alternatives.

Good:

```text
default
secondary
outline
ghost
destructive
```

Poor:

```text
marketingBlue
dashboardSpecial
settingsButton
greenButton
```

Feature names MUST NOT leak into foundational component APIs.

---

## 54.2 Escape hatches

Canonical components MAY accept `className` when appropriate, but feature-level class overrides SHOULD NOT redefine the component's core visual language.

`className` is not permission to fork the design system locally.

---

# 55. Tailwind Usage

Tailwind is an implementation mechanism, not the design language itself.

Feature code MAY use Tailwind utilities for layout and composition.

Feature code SHOULD NOT use arbitrary values for established design-system properties.

Avoid:

```tsx
mt-[13px]
rounded-[7px]
text-[#292929]
shadow-[...]
```

unless representing a legitimate exceptional requirement.

Prefer sanctioned utilities and semantic tokens.

---

# 56. `cn()` Usage

Use the canonical class-merging utility for conditional classes.

Keep conditions understandable.

Avoid enormous inline class expressions containing substantial business logic.

Complex variants belong in component definitions.

---

# 57. Product Components

When a repeated domain-specific pattern emerges, promote it above primitive level.

Examples:

```text
UserAvatar
MemberPicker
StatusBadge
Money
PlanBadge
WorkspaceSwitcher
PermissionSelector
DateRangeFilter
EntityHeader
AuditLogItem
```

These SHOULD encode product semantics while relying on foundational system primitives.

---

# 58. Pattern Layer

A pattern represents reusable behavior involving multiple components.

Examples:

```text
Search + filters + results
CRUD form
Delete confirmation
Bulk selection
Settings section
Editable detail panel
Table toolbar
Onboarding flow
Import workflow
File upload
Command menu
```

Patterns SHOULD document:

- anatomy;
- behavior;
- responsive treatment;
- validation;
- loading;
- error behavior;
- empty states;
- accessibility;
- content conventions.

---

# 59. Templates

Templates define reusable page-level architecture.

Maintain canonical templates where relevant:

```text
List page
Detail page
Create/edit page
Settings page
Dashboard
Authentication
Onboarding
Wizard
Empty workspace
Error page
```

Templates reduce unnecessary page-level invention.

---

# 60. Design System Registry

Maintain an internal registry as the canonical distribution mechanism where practical.

The registry SHOULD contain approved:

- components;
- hooks;
- utilities;
- patterns;
- blocks;
- themes;
- configuration;
- templates.

Teams SHOULD consume sanctioned registry components rather than copying source manually between projects.

---

# 61. Third-Party Registries

Community registry code MUST be treated as external source code.

Before adoption:

- inspect implementation;
- review dependencies;
- verify accessibility;
- check licensing;
- test keyboard behavior;
- validate styles;
- validate security implications;
- determine who owns future maintenance.

Do not install community components directly into production solely because they visually match a requirement.

---

# 62. Component Ownership

Every canonical component SHOULD have a clear owner.

Ownership includes:

- API stability;
- accessibility;
- bug fixes;
- documentation;
- dependency updates;
- migration guidance.

Shared code without ownership eventually becomes legacy code.

---

# 63. Documentation Requirements

Every canonical component SHOULD document:

### Purpose

What problem does it solve?

### When to use

What situations justify the component?

### When not to use

What commonly confused alternatives exist?

### Anatomy

What subcomponents compose it?

### Variants

What supported forms exist?

### States

At minimum where applicable:

```text
default
hover
focus
active
disabled
loading
error
empty
```

### Responsive behavior

How does it change by viewport?

### Accessibility

Keyboard and semantic expectations.

### Examples

Typical implementation.

---

# 64. Component Composition

Respect documented component composition.

Do not remove required structural elements simply to reduce markup.

For example, when a component API expects:

```text
Card
├── CardHeader
│   ├── CardTitle
│   └── CardDescription
├── CardContent
└── CardFooter
```

maintain the intended structure unless the component API explicitly allows alternatives.

Correct composition improves consistency, accessibility, and maintainability.

---

# 65. Testing Standard

Canonical components SHOULD include appropriate automated testing.

Depending on the component:

- rendering;
- interaction;
- keyboard behavior;
- disabled behavior;
- validation;
- accessible name;
- focus behavior;
- responsive behavior;
- visual regression.

High-risk foundational components require stronger test coverage than one-off presentation code.

---

# 66. Visual Regression

Critical design-system components SHOULD have visual regression coverage.

Test important states and themes, including:

- light;
- dark;
- compact where supported;
- mobile;
- desktop;
- hover/focus where tooling supports it;
- disabled;
- error;
- loading.

---

# 67. Browser Support

Define an explicit browser-support matrix.

Do not rely on accidental browser compatibility.

Components MUST be verified against the supported matrix before being considered stable.

---

# 68. Performance

Design-system abstractions MUST not create unnecessary performance cost.

Avoid:

- importing large dependencies for minor UI;
- unnecessary client boundaries;
- excessive animation libraries;
- excessive rerendering;
- shipping unused variants;
- oversized icon bundles.

Prefer platform capabilities where appropriate.

---

# 69. Server and Client Boundaries

In frameworks supporting server rendering or server components, components SHOULD remain server-compatible unless client-side behavior is required.

Do not mark large component trees as client-side solely because one nested control requires interaction.

Keep interactive boundaries intentional.

---

# 70. Dependency Policy

Adding a dependency to a foundational component has organization-wide consequences.

New shared dependencies MUST justify:

- capability gained;
- bundle impact;
- maintenance status;
- licensing;
- security;
- compatibility;
- migration risk.

Do not introduce an external dependency for functionality that can be implemented safely and simply within the existing stack.

---

# 71. Design-System Contribution Process

A new component SHOULD enter the system only if there is evidence of reusable value.

Before creating one, ask:

1. Does a system component already solve this?
2. Can an existing component be composed differently?
3. Is this product-specific or system-wide?
4. Will another feature reasonably need it?
5. Is the proposed API general enough?
6. Are all states understood?
7. Is accessibility defined?
8. Is responsive behavior defined?
9. Who owns it?
10. How will it be documented and tested?

---

# 72. Promotion Rule

Do not prematurely generalize every piece of feature UI.

A useful model:

```text
First occurrence:
Feature implementation

Repeated occurrence:
Evaluate shared pattern

Stable repeated pattern:
Promote to product component

Cross-product foundational pattern:
Promote to design system
```

Duplication is a signal to evaluate abstraction, not automatic proof that abstraction is required.

---

# 73. Breaking Changes

Shared component APIs require deliberate migration.

Breaking changes SHOULD include:

- rationale;
- migration instructions;
- affected components;
- deprecated API;
- replacement API;
- removal timeline where applicable.

Avoid silent behavior changes.

---

# 74. Deprecation

Deprecated components SHOULD be clearly marked.

New usage MUST stop before old usage is removed.

Migration SHOULD proceed systematically rather than allowing permanent parallel systems.

---

# 75. Design Review Criteria

A UI is not ready simply because it visually matches a mockup.

Review against:

### System

Does it use sanctioned components and tokens?

### Hierarchy

Is importance visually obvious?

### Interaction

Are behaviors predictable?

### States

Are loading, empty, failure, success, disabled, and permission states covered?

### Accessibility

Can the flow be completed with keyboard and assistive technology?

### Responsive behavior

Does it work at supported viewport sizes?

### Content

Are labels and messages understandable?

### Consistency

Does it behave like comparable parts of the product?

### Maintainability

Will another engineer understand and extend the implementation?

---

# 76. Definition of Done

UI work is complete only when all applicable criteria are satisfied.

A feature MUST NOT be considered complete when only the ideal desktop state exists.

Definition of Done:

```text
✓ Uses semantic tokens
✓ Uses canonical components
✓ No unnecessary bespoke primitives
✓ Light theme verified
✓ Dark theme verified where supported
✓ Mobile verified
✓ Desktop verified
✓ Keyboard navigation verified
✓ Focus states verified
✓ Accessible labels verified
✓ Loading state implemented
✓ Empty state implemented
✓ Error state implemented
✓ Disabled state implemented where applicable
✓ Validation behavior implemented
✓ Responsive behavior verified
✓ Destructive actions handled intentionally
✓ Content reviewed
✓ No arbitrary design values without justification
✓ No duplicate design-system component introduced
✓ Tests added where appropriate
```

---

# 77. Anti-Patterns

The following are prohibited by default.

### Bespoke buttons

```tsx
<div
  className="rounded-md bg-blue-600 px-4 py-2 text-white"
  onClick={save}
>
  Save
</div>
```

Use the canonical Button.

---

### Arbitrary colors

```tsx
text-red-500
bg-[#18181b]
border-gray-300
```

Use semantic tokens.

---

### Arbitrary dimensions

```tsx
h-[37px]
rounded-[9px]
gap-[13px]
```

Use the system scale.

---

### Local component forks

Do not create:

```text
SettingsButton
DashboardButton
SpecialButton
ButtonNew
Button2
```

to avoid extending the canonical Button.

---

### Excessive visual hierarchy

Avoid combining:

- border;
- shadow;
- background;
- radius;
- accent color;
- bold typography;

when one or two signals are sufficient.

---

### Card everywhere

Not every group requires a bordered rounded container.

---

### Modal everything

Do not convert ordinary navigation or editing into dialogs without an interaction reason.

---

### Icon-only ambiguity

Do not expect users to memorize unfamiliar icons.

---

### Hidden primary actions

Do not place frequent primary actions inside overflow menus merely to simplify layout.

---

### Placeholder labels

Placeholder text does not replace a form label.

---

### Color-only state

Never use red/green alone to communicate failure/success.

---

# 78. AI Coding Agent Rules

When an AI agent generates product UI, it MUST follow the same system.

The default instruction is:

> **Use shadcn/ui as the primary component foundation. Prefer existing product-system and shadcn components over bespoke implementation. Compose existing primitives before creating new ones. Use semantic design tokens and established spacing, typography, radius, state, responsive, and accessibility conventions. Extend shared components centrally rather than creating feature-level forks.**

The AI MUST inspect existing components before implementing new primitives.

It SHOULD determine whether the repository already contains:

```text
components/ui
components
design-system
registry
lib
hooks
styles
tokens
```

before generating equivalents.

---

# 79. AI Component Selection Rules

When generating UI, use this decision tree:

```text
Does an internal component exist?
    ↓ yes
Use it.
    ↓ no

Does shadcn provide the primitive?
    ↓ yes
Use/adapt it.
    ↓ no

Can sanctioned primitives compose the behavior?
    ↓ yes
Compose them.
    ↓ no

Will this pattern be reused?
    ↓ yes
Create a centrally owned product component.
    ↓ no

Implement the smallest appropriate feature-specific solution.
```

---

# 80. AI Styling Rules

AI-generated code MUST NOT casually introduce:

```text
arbitrary hex colors
arbitrary spacing
arbitrary radii
arbitrary shadows
new font sizes
new breakpoints
duplicate primitives
custom focus behavior
custom overlay behavior
```

The AI SHOULD use existing semantic tokens and utilities.

When no suitable token exists, it SHOULD identify the missing system requirement rather than silently inventing a value.

---

# 81. AI UX Requirements

AI-generated implementations MUST consider the complete state matrix.

Before completing UI, inspect whether the feature requires:

```text
Loading
Empty
Error
Success
Disabled
Read-only
Permission denied
No results
Partial results
Offline
Destructive confirmation
```

Implement applicable states.

Do not generate only the screenshot-perfect happy path.

---

# 82. AI Accessibility Requirements

AI MUST prefer semantic HTML and canonical accessible components.

It MUST NOT:

- replace buttons with clickable divs;
- remove focus indicators;
- rely only on color;
- create unlabeled icon controls;
- use placeholder text as the only label;
- introduce inaccessible custom dialogs or selects where sanctioned components exist.

---

# 83. AI Design Restraint

When uncertain, choose the simpler visual treatment.

Default product surfaces SHOULD feel:

- clean;
- structured;
- calm;
- dense enough to be useful;
- spacious enough to remain legible;
- minimally decorative.

Avoid automatically adding:

- gradients;
- glass effects;
- oversized radii;
- exaggerated shadows;
- decorative blobs;
- excessive badges;
- unnecessary icons;
- gratuitous animations;
- oversized hero typography;

unless explicitly required by the product's visual identity.

---

# 84. System Consistency Rule

Before introducing a new UI pattern, compare it with at least one existing analogous pattern.

Examples:

```text
New settings form
→ compare existing settings forms

New list actions
→ compare existing list actions

New table toolbar
→ compare existing table toolbars

New confirmation
→ compare existing confirmations
```

Comparable product actions SHOULD behave comparably.

---

# 85. Product Quality Bar

The final interface should feel like one coherent product rather than a collection of independently designed screens.

A user should be able to learn an interaction once and reuse that understanding elsewhere.

A developer should be able to inspect one established feature and correctly predict how another should be built.

A designer should be able to create new flows primarily by composing known foundations, components, and patterns.

That predictability is the purpose of the design system.

---

# 86. Golden Rules

When tradeoffs are unclear, use these rules:

**1. Use shadcn first.**  
Do not recreate a primitive that already exists.

**2. Internal system beats raw shadcn.**  
Once the organization has standardized a component, use the internal version.

**3. Semantic tokens only for product meaning.**  
Avoid feature-level literal styling.

**4. Compose before creating.**  
Most new interfaces should be assemblies of existing primitives.

**5. Centralize extensions.**  
Do not fork common components inside features.

**6. Design every state.**  
Happy-path-only UI is incomplete.

**7. Accessibility is mandatory.**  
Correct semantics and keyboard behavior are part of implementation.

**8. Responsive behavior is intentional.**  
Do not merely shrink desktop UI.

**9. Reduce rather than decorate.**  
Use the minimum visual treatment required to establish hierarchy.

**10. Consistency compounds.**  
A predictable pattern is usually more valuable than a clever local solution.

---

# 87. Canonical Standard

The organizational default is therefore:

> **shadcn/ui is the primary component foundation. The internal design system is the canonical product layer above shadcn. All interfaces use semantic design tokens, sanctioned components, predictable composition, accessible interaction patterns, intentional responsive behavior, and centrally governed extensions. Product teams consume the system rather than locally recreating it. New patterns enter the system only when they demonstrate durable reusable value.**

This standard applies to both human-written and AI-generated product interfaces.

A few parts of this standard deliberately track shadcn’s current architecture: shadcn describes itself as open, composable code used to build your own component library; its current theming guidance recommends CSS variables and semantic background/foreground token pairs; and its registry supports distributing custom components, hooks, pages, configuration, and rules. citeturn783215search10turn783215search0turn783215search2 Current shadcn documentation also provides explicit component-composition structures, which supports making composition conformance part of the standard. citeturn783215search8

For external registries, keeping the review gate is important: shadcn’s own registry directory explicitly advises reviewing third-party code before installation. citeturn783215search5
