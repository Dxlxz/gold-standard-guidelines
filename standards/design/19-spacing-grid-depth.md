---
id: "spacing-grid-depth"
title: "Spacing, Grid, Density, Elevation & Hierarchy"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "spacing", "grid", "density", "elevation"]
applies_to: ["general"]
related: []
legacy_number: 99
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 51977
provenance: baseline

---

Research completed with Firecrawl first, then supplemented with current W3C, MDN, NN/g, web.dev, and shadcn/ui documentation where the primary corpus needed narrower technical evidence.

# Spacing, Grid, Density, Elevation & Visual Hierarchy — Gold Standard 2026

**Canonical placement:** Design Tokens → Layout Foundations → **Spacing, Grid, Density, Elevation & Visual Hierarchy** → Layout Patterns → Facade → Components  
**Status:** Normative  
**Baseline:** shadcn/ui  
**Accessibility target:** WCAG 2.2 AA or higher  
**Applies to:** application shells, responsive product surfaces, dashboards, administration systems, data-dense tools, forms, navigation, content pages, overlays, maps, visual editors, and component composition.

---

# 1. Purpose

This specification defines the canonical spatial and visual-composition system for the product.

It governs:

- spacing scales;
- semantic spacing tokens;
- page containers;
- grids and gutters;
- responsive breakpoints;
- container queries and subgrid;
- density modes;
- data-dense and dashboard composition;
- elevation and surface separation;
- z-index;
- shadow usage;
- blur and translucency;
- shape and corner radii;
- visual hierarchy;
- grouping, alignment, and scan paths;
- optical correction.

This standard sits between foundational Design Tokens and Layout Patterns.

Design Tokens define the available values.

This standard defines **how those values are composed into spatial relationships**.

Layout Patterns define **how those relationships become canonical page structures**.

Components MUST consume this system rather than introducing independent spacing, radius, elevation, or density conventions.

The system MUST optimize for:

1. consistency;
2. information hierarchy;
3. responsive operability;
4. accessibility;
5. predictable composition;
6. maintainability;
7. rendering performance.

Spacing MUST be intentional. IBM Carbon explicitly treats spacing as a system of tokens and layout relationships and notes that proximity and surrounding space affect perceived relationships and hierarchy.  
https://carbondesignsystem.com/elements/spacing/overview/

---

# 2. Rules

## 2.1 Spatial model

The system MUST distinguish four classes of spatial values:

| Class | Purpose |
|---|---|
| Primitive | Raw spacing/radius/elevation values |
| Semantic | Meaning such as `inset`, `stack`, `gutter`, `surface` |
| Component | Component-specific mappings such as input padding |
| Pattern | Page/layout-specific mappings such as dashboard gutter |

Application code SHOULD consume semantic or component tokens.

Application code SHOULD NOT consume raw pixel values when an appropriate semantic token exists.

Primitive values MUST NOT encode business semantics.

Semantic tokens MUST NOT encode individual page names.

For example:

```text
GOOD
space.4
space.6

inset.control
stack.section
gutter.page

BAD
customer-page-gap
billing-form-padding
random-18px
```

---

# 2.2 Spacing scale

## 2.2.1 Base unit

The canonical spatial base unit MUST be **4 CSS pixels** at the default root font size.

A 2px half-unit MAY exist for micro-adjustments where 4px is too coarse.

A 1px value MUST be reserved primarily for:

- borders;
- rules;
- hairlines;
- rendering corrections where a physical CSS pixel is intentional.

The existence of 1px and 2px values MUST NOT turn the system into an unrestricted integer scale.

Carbon similarly uses a constrained spacing system containing small increments for component-level relationships and progressively larger increments for layout density and hierarchy.  
https://carbondesignsystem.com/elements/spacing/overview/

---

## 2.2.2 Hybrid ramp

The spacing system MUST use a **hybrid ramp**:

- approximately linear increments at small values;
- increasingly larger jumps at layout scale.

A pure geometric sequence SHOULD NOT be used at small sizes because it removes useful intermediate relationships.

A pure linear sequence SHOULD NOT continue indefinitely because it creates excessive, weakly differentiated large-spacing tokens.

Canonical primitive spacing:

```text
0
2
4
8
12
16
20
24
32
40
48
64
80
96
128
160
```

These values SHOULD be represented in `rem` where appropriate while preserving their intended CSS-pixel relationship at the default root font size.

The scale deliberately becomes coarser as distance increases.

The distinction between 8px and 12px is useful inside components.

The distinction between 128px and 132px generally is not.

---

## 2.2.3 Semantic spacing tokens

Primitive values MUST be mapped to semantic relationships.

Canonical semantic families are:

### Inset

Space **inside** a bounded surface.

```text
inset.2xs
inset.xs
inset.sm
inset.md
inset.lg
inset.xl
```

Use for:

- buttons;
- fields;
- cards;
- alerts;
- dialogs;
- panels;
- cells.

### Stack

Vertical separation between sequential blocks.

```text
stack.2xs
stack.xs
stack.sm
stack.md
stack.lg
stack.xl
stack.section
```

Use for:

- field groups;
- paragraphs;
- form sections;
- cards;
- page sections.

### Inline

Horizontal separation between related elements.

```text
inline.2xs
inline.xs
inline.sm
inline.md
inline.lg
```

Use for:

- icon + text;
- button groups;
- badges;
- metadata;
- toolbar controls.

### Gutter

Separation associated with page or grid structure.

```text
gutter.compact
gutter.default
gutter.wide
gutter.grid
gutter.panel
```

Use for:

- page edges;
- columns;
- dashboard tracks;
- major panes.

The semantic name MUST express the **relationship**, not merely repeat the primitive size.

---

## 2.2.4 Recommended mapping

The default mapping SHOULD be:

| Semantic token | Default |
|---|---:|
| `inline.2xs` | 4px |
| `inline.xs` | 8px |
| `inline.sm` | 12px |
| `inline.md` | 16px |
| `inline.lg` | 24px |
| `stack.2xs` | 4px |
| `stack.xs` | 8px |
| `stack.sm` | 12px |
| `stack.md` | 16px |
| `stack.lg` | 24px |
| `stack.xl` | 32px |
| `stack.section` | 48–64px |
| `inset.xs` | 8px |
| `inset.sm` | 12px |
| `inset.md` | 16px |
| `inset.lg` | 24px |
| `inset.xl` | 32px |
| `gutter.compact` | 16px |
| `gutter.default` | 24px |
| `gutter.wide` | 32px |

Exact semantic mappings MAY vary by approved density mode.

---

## 2.2.5 Parent-owned spacing

Parent layout primitives SHOULD own the space **between** siblings.

Components SHOULD NOT normally carry external margins.

Prefer:

```css
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
}
```

over components that individually declare arbitrary `margin-bottom`.

Carbon describes the same parent-layout principle through its Stack utility, allowing layout to control the space between component children rather than requiring children to position themselves.  
https://carbondesignsystem.com/elements/spacing/overview/

This rule reduces margin collapse, conditional-last-child logic, and composition-specific overrides.

---

## 2.2.6 When the scale MAY be broken

Off-scale values MUST be exceptional.

They MAY be used for:

- 1px borders;
- mathematically derived dimensions;
- intrinsic media ratios;
- native platform safe-area values;
- accessible minimum sizes;
- third-party embed constraints;
- data-visualization stroke widths;
- optical alignment corrections;
- concentric-radius geometry;
- browser/platform quirks that cannot be represented correctly through an existing token.

An off-scale value that appears in more than one meaningful location SHOULD become a named token.

An off-scale value MUST NOT be introduced merely because a designer prefers 18px to 20px in one screenshot.

---

# 2.3 Layout primitives

## 2.3.1 Containers

Every page MUST deliberately select a horizontal containment model.

Canonical containers:

| Token | Reference max width | Typical use |
|---|---:|---|
| `container.reading` | 42–46rem | prose, help, policy |
| `container.form` | 48–56rem | forms, workflows |
| `container.standard` | 72rem | ordinary application pages |
| `container.wide` | 90rem | dashboards, broad detail pages |
| `container.full` | none | maps, canvases, dense workspaces |

Content MUST NOT expand indefinitely merely because viewport width is available.

GOV.UK recommends starting from small screens and constraining common desktop layouts so that text lines do not become excessively long. Its system uses a page-width container rather than treating the entire viewport as content width.  
https://design-system.service.gov.uk/styles/layout/

Full-bleed surfaces MUST follow the Full-Bleed vs Contained Layout Pattern standard.

---

# 2.4 Grid system

## 2.4.1 Default grid

The canonical application grid MUST use **12 columns** by default.

Twelve columns provide convenient half, third, quarter, and sixth subdivisions without requiring fractional custom tracks.

A 12-column grid SHOULD be used for:

- ordinary application pages;
- form/detail layouts;
- content + sidebar;
- general dashboards;
- responsive landing surfaces.

---

## 2.4.2 Sixteen-column grid

A **16-column grid** MAY be used for wide, information-dense workspaces.

Typical cases include:

- monitoring dashboards;
- trading/operations interfaces;
- analytics workbenches;
- large-screen control surfaces;
- complex data dashboards.

A 16-column grid MUST NOT be selected simply because it offers more placement choices.

The choice between 12 and 16 columns MUST occur at a page/pattern boundary.

Components MUST NOT assume whether the parent uses 12 or 16 columns.

---

## 2.4.3 Grid gutters

Grid gutters MUST come from semantic tokens.

Recommended defaults:

```text
compact viewport   16px
medium viewport    24px
wide viewport      24–32px
```

Gutters SHOULD increase more slowly than viewport width.

Large displays MUST NOT produce arbitrarily enormous gutters.

Content priority SHOULD determine whether additional width becomes:

- larger gutters;
- wider columns;
- additional columns;
- a wider container.

---

# 2.5 Responsive breakpoints

The canonical viewport classes MUST remain aligned with the Layout Patterns standard:

```text
compact   < 48rem
medium    48rem–79.999rem
wide      ≥ 80rem
```

Projects MAY introduce an additional extra-wide breakpoint when a documented pattern requires it.

Breakpoints MUST describe a change in composition.

They MUST NOT exist solely to target:

- an iPhone model;
- a tablet model;
- a laptop resolution;
- a screenshot width.

GOV.UK similarly advises designing for screen sizes rather than making assumptions about device categories.  
https://design-system.service.gov.uk/styles/layout/

Responsive changes SHOULD occur when the content ceases to remain viable, not because the viewport crossed a fashionable device width.

---

# 2.6 Reflow

Layouts MUST reflow without requiring horizontal document scrolling at the equivalent WCAG reference width except where two-dimensional content is intrinsically required.

W3C Technique C32 describes responsive Grid/media-query layouts that collapse columns while retaining meaningful source order and targets WCAG 1.4.10 Reflow at an equivalent width of 320 CSS pixels. It also warns that CSS Grid visual reordering can disconnect visual and keyboard order.  
https://www.w3.org/WAI/WCAG22/Techniques/css/C32

Grid placement MUST therefore preserve meaningful DOM order.

Visual rearrangement MUST NOT create a contradictory keyboard sequence.

---

# 2.7 Container queries

Viewport breakpoints MUST govern **page architecture**.

Container queries SHOULD govern **component adaptation inside variable regions**.

A card placed in:

- a dashboard;
- a sidebar;
- a split pane;
- a full-width content area

SHOULD be able to adapt to its actual available container width rather than attempting to infer it from viewport width.

CSS container queries explicitly allow styles to respond to a containing element rather than the viewport. citeturn577682search2

Use container queries for:

- card orientation;
- toolbar compaction;
- metadata wrapping;
- local multi-column transitions;
- chart control placement;
- responsive component density where justified.

Do NOT create a container query on every wrapper.

Containment boundaries SHOULD correspond to reusable, independently responsive composition regions.

---

# 2.8 Subgrid

CSS `subgrid` SHOULD be used where nested content needs to remain aligned to the track system of an ancestor.

This is particularly useful for:

- card collections;
- repeated metadata rows;
- aligned forms;
- nested dashboard modules;
- comparison layouts.

With `subgrid`, nested grids can inherit the parent grid's track sizing rather than establishing unrelated tracks. citeturn421730search4

Use:

```css
.card {
  display: grid;
  grid-template-columns: subgrid;
}
```

when inherited track alignment carries real semantic or visual value.

Do NOT use subgrid merely because it is available.

---

# 2.9 Density modes

Density controls spatial allocation inside interactive and repeated structures.

The canonical modes are:

| Mode | Primary use |
|---|---|
| Compact | expert, high-frequency, data-dense work |
| Comfortable | default application experience |
| Spacious | low-frequency, touch-oriented, presentation-rich surfaces |

Comfortable MUST be the default unless the product domain strongly justifies another default.

Density MAY modify:

- control padding;
- row height;
- cell padding;
- list spacing;
- toolbar gaps;
- card inset;
- panel spacing.

Density SHOULD NOT arbitrarily modify:

- body font size;
- contrast;
- focus-ring visibility;
- information architecture;
- validation behaviour;
- accessibility semantics.

Compact MUST NOT mean “miniature.”

WCAG 2.2 requires pointer targets to be at least 24 × 24 CSS pixels unless an explicit exception applies. citeturn150428search2

Recommended interactive geometry:

| Mode | Typical control/row target |
|---|---:|
| Compact | 32–36px |
| Comfortable | 40–44px |
| Spacious | 48–56px |

These values are product-system targets, not replacements for WCAG criteria.

Compact interfaces SHOULD preserve additional pointer spacing where adjacent small controls would otherwise become error-prone.

---

# 2.10 Responsive density

Density MUST NOT be determined by viewport width alone.

A wide viewport does not automatically imply compact mode.

A compact viewport does not automatically imply spacious mode.

Responsive layout MAY override density when input ergonomics or available space require it.

For example:

```text
Desktop expert table:
compact

Same table transformed into mobile record cards:
comfortable
```

User density preference MAY be persisted when the Components and State Management standards support the preference safely.

Density changes MUST preserve semantic state.

---

# 2.11 Dashboard and data-dense layouts

## 2.11.1 Panel organisation

Dashboards MUST express hierarchy before symmetry.

Panels MUST be grouped by:

1. task relationship;
2. shared filtering context;
3. information priority;
4. update cadence.

Panels MUST NOT be arranged solely to create an aesthetically complete rectangle.

The page SHOULD contain:

- one primary information region;
- a small number of secondary regions;
- tertiary/supporting modules.

Every panel MUST justify its containment boundary.

Not every metric requires a `Card`.

---

## 2.11.2 Dashboard spacing

Dashboard inter-panel spacing SHOULD normally use:

```text
compact dashboard   12–16px
default dashboard   16–24px
presentation mode   24–32px
```

Internal panel padding SHOULD normally be equal to or smaller than the inter-panel gap.

A panel with 32px interior padding separated from its neighbour by 8px generally produces the wrong grouping hierarchy.

---

## 2.11.3 Dense tables

Data-dense tables MUST prioritize:

- column alignment;
- consistent row rhythm;
- scanability;
- stable headers;
- meaningful whitespace.

Dense tables MUST NOT compensate for poor information architecture by reducing every dimension.

Column alignment SHOULD carry more grouping responsibility than borders.

Vertical rules SHOULD be avoided unless they materially improve separation.

Row striping MAY be used where long horizontal scanning genuinely benefits.

---

# 2.12 Resizable splitters

Resizable panels SHOULD use the canonical Split-Pane Pattern.

shadcn/ui `ResizablePanelGroup`, `ResizablePanel`, and `ResizableHandle` SHOULD be the default primitive where their behaviour matches the task; the current implementation explicitly provides accessible resizing with keyboard support. citeturn421730search1

Resizable regions MUST define:

- minimum size;
- maximum size;
- initial/default size;
- collapse behaviour, if any;
- persistence behaviour.

A resize handle MUST be discoverable.

Drag interaction MUST NOT be the sole accessible means of changing pane size.

Persisted sizes MUST be clamped when viewport/container dimensions change.

---

# 2.13 Full-bleed maps and spatial surfaces

Maps, canvases, topology diagrams, and spatial editors MAY use `container.full`.

The spatial surface SHOULD consume available width because screen area directly improves the task.

Controls overlaid on the spatial surface MUST still consume semantic spacing tokens.

Overlay controls SHOULD be grouped into bounded control clusters rather than scattered as unrelated floating buttons.

Maps MUST NOT force the entire application into full-bleed mode if surrounding content benefits from containment.

A composition MAY therefore use:

```text
contained heading/filter region
↓
full-bleed map
↓
contained explanatory/detail region
```

---

# 2.14 Sticky headers and toolbars

Sticky positioning MAY be used for:

- primary table headers;
- persistent contextual actions;
- navigation required during long traversal;
- split-pane toolbars.

Sticky chrome MUST NOT accumulate without limit.

The combined height of stacked sticky regions SHOULD be minimized, especially on compact viewports.

Author-created sticky regions MUST NOT fully obscure the currently focused element under WCAG 2.2 Focus Not Obscured. citeturn150428search0turn150428search4

Implementations SHOULD use appropriate `scroll-padding` or equivalent focus-reveal behaviour.

Sticky elements SHOULD acquire a surface separator when content scrolls beneath them.

That separator MAY be:

- a border;
- a tonal surface change;
- a low elevation shadow.

It SHOULD NOT require a large shadow.

---

# 2.15 Elevation and surfaces

## 2.15.1 Elevation principle

Elevation communicates **layer relationship**, not decoration.

Material 3 defines elevation as relative separation between surfaces and explicitly allows elevation to be conveyed through tonal difference, shadows, or scrims. It also recommends restraint: fewer elevation levels make them more meaningful.  
https://m3.material.io/styles/elevation/applying-elevation

The system MUST therefore prefer the least visually expensive mechanism that makes the layer relationship clear.

Use, in preference order when sufficient:

1. spacing;
2. background/surface tone;
3. border;
4. shadow;
5. scrim/modal separation.

A shadow MUST NOT be the default treatment for every bounded region.

---

# 2.16 Surface roles

Canonical surfaces SHOULD include:

```text
surface.base
surface.subtle
surface.raised
surface.overlay
surface.inverse
surface.scrim
```

Surface roles MUST be defined through colour tokens.

Component code MUST NOT synthesize arbitrary background shades to imitate elevation.

Adjacent surfaces SHOULD have sufficient visual separation for their function.

Interactive boundaries MUST remain perceivable under supported themes and contrast modes.

---

# 2.17 Z-index contract

Z-index MUST be centrally governed.

Arbitrary values such as:

```text
999
9999
2147483647
```

MUST NOT appear in ordinary product code.

Canonical layer contract:

| Layer | Token | Reference z-index | Typical content |
|---|---|---:|---|
| Document | `z.base` | 0 | normal flow |
| Raised local | `z.raised` | 5 | local floating affordance |
| Sticky | `z.sticky` | 10 | sticky headers/toolbars |
| Dropdown | `z.dropdown` | 20 | menus/select content |
| Popover | `z.popover` | 30 | popovers/date pickers |
| Overlay | `z.overlay` | 40 | scrims/drawers |
| Modal | `z.modal` | 50 | dialogs |
| Toast | `z.toast` | 60 | transient notification |
| Tooltip | `z.tooltip` | 70 | short contextual overlay |

A component MUST use the semantic layer token associated with its role.

A component MUST NOT increment its z-index to “win” against another component.

Layer conflicts MUST be corrected by fixing stacking context ownership.

---

# 2.18 Shadow scale

Shadows MUST use semantic elevation tokens.

Recommended conceptual scale:

```text
elevation.0   no shadow
elevation.1   local separation
elevation.2   floating control / raised card
elevation.3   dropdown / popover
elevation.4   drawer / floating panel
elevation.5   modal or exceptional high layer
```

Shadow geometry MUST come from tokens.

Shadow colour MUST come from theme tokens.

Dark mode MAY require materially different shadow and surface treatment.

Simply reusing light-mode black-shadow values at higher opacity SHOULD NOT be assumed to produce equivalent hierarchy.

Material 3 notes that smaller/sharper shadows suggest closer surfaces while larger/softer shadows suggest greater distance.  
https://m3.material.io/styles/elevation/applying-elevation

---

# 2.19 Borders vs shadows

Use a **border** when the primary requirement is:

- edge definition;
- component boundary;
- grouping;
- data/table separation;
- separation on flat surfaces.

Use a **shadow** when the primary requirement is:

- overlap;
- floating depth;
- content passing beneath another surface;
- transient layer separation.

Use neither when spacing and surface tone already communicate the relationship.

Borders and shadows MAY be combined for high-contrast or complex backgrounds, but the combination MUST be deliberate.

A one-pixel border plus three layered shadows on every card is non-conformant.

---

# 2.20 Blur and translucency

Blur and translucency MUST be treated as an enhancement, not a structural dependency.

`backdrop-filter` applies graphical effects to content behind a translucent element. citeturn606328search0

Use it sparingly for:

- temporary overlays;
- compact floating chrome;
- intentional glass-like surfaces.

Blur MUST NOT be required for:

- text contrast;
- control identification;
- layer identification;
- navigation comprehension.

Text MUST remain legible when backdrop filtering is unavailable.

web.dev explicitly cautions that `backdrop-filter` may harm performance and recommends testing before deployment. citeturn606328search5

Large animated blur regions SHOULD NOT be used over continuously changing:

- maps;
- video;
- canvas;
- large scrolling lists.

The larger the filtered region and the more frequently the pixels behind it change, the more carefully the implementation MUST be profiled.

Products SHOULD support increased opacity or removal of transparency when user preferences call for reduced transparency. Chrome documents `prefers-reduced-transparency` specifically for this type of adaptation. citeturn606328search8

---

# 2.21 Shape language

## 2.21.1 Radius scale

Corner radii MUST come from a constrained scale.

Material 3 likewise defines roundedness through a shape/corner-radius scale rather than independent component-specific values.  
https://m3.material.io/styles/shape/corner-radius-scale

Canonical scale:

```text
radius.none   0
radius.xs     2px
radius.sm     4px
radius.md     6px
radius.lg     8px
radius.xl     12px
radius.2xl    16px
radius.3xl    24px
radius.full   9999px / 50%
```

A product SHOULD normally use three to five of these levels actively.

Availability does not imply that every level should appear on one page.

---

# 2.22 Rounded, pill, and sharp forms

### Sharp

`radius.none` or `radius.xs`

Use for:

- strongly structured data surfaces;
- technical editors;
- tables;
- edge-to-edge panels;
- nested regions where rounding would create visual noise.

### Rounded

`radius.sm` through `radius.2xl`

Use as the default family for:

- cards;
- inputs;
- dialogs;
- menus;
- panels.

### Pill

`radius.full`

Use only where the geometry communicates an appropriate object type, including:

- tags;
- status chips;
- segmented controls;
- compact badges;
- avatar groups;
- intentionally capsule-shaped buttons.

Pill geometry MUST NOT become the universal radius treatment.

Large rectangular forms with arbitrary pill corners tend to weaken alignment and waste edge space.

---

# 2.23 Corner nesting rule

When two rounded rectangular surfaces are intended to appear **concentric**, the inner radius SHOULD approximately satisfy:

```text
inner radius = max(outer radius − inset distance, 0)
```

Example:

```text
outer radius = 16px
padding      = 8px
inner radius = 8px
```

Using the same 16px radius on both nested rectangles usually makes the inner corner visually too round.

This rule MAY be adjusted optically when borders or asymmetric inset alter the geometry.

The adjustment MUST remain systematic.

---

# 2.24 Icon shapes

Icon glyphs MUST follow the Iconography standard.

Layout components MAY place icons within shaped containers.

Icon containers SHOULD inherit the surrounding shape language.

Examples:

```text
toolbar action         subtle rounded square
status indicator       circle where semantically appropriate
category badge         rounded square or pill
destructive icon well  same structural radius as peer actions
```

Icons MUST NOT be given circular backgrounds merely because they are icons.

Shape MUST support semantic grouping.

---

# 2.25 Avatar shapes

Human avatars SHOULD normally be circular unless the product's established identity system specifies otherwise.

Organisation, workspace, application, bot, or asset avatars MAY use rounded rectangles to distinguish them from people.

Avatar shape MUST remain stable across:

- lists;
- headers;
- menus;
- detail pages.

Shape MUST NOT be the sole means of communicating entity type.

Accessible text, labels, or context MUST carry the semantic distinction.

shadcn/ui `Avatar` MAY be used as the implementation baseline where its semantics and fallback behaviour fit the product.

---

# 2.26 Visual hierarchy

Visual hierarchy MUST be established deliberately through a limited number of coordinated levers.

The canonical hierarchy levers are:

1. size;
2. weight;
3. colour;
4. space;
5. depth.

A design SHOULD use the minimum number of simultaneous levers necessary.

For example, a page title does not ordinarily require:

- largest size;
- boldest weight;
- brand colour;
- largest spacing;
- shadow;
- outlined container

all at once.

Hierarchy becomes weaker when everything attempts to be prominent.

---

# 2.27 Size

Size SHOULD indicate meaningful rank.

Typical hierarchy:

```text
page title
section heading
subsection heading
body
supporting metadata
```

Size MUST NOT be used to compensate for missing document semantics.

A visually small heading can still be an `<h2>`.

A large visual label MUST NOT become a heading unless it structures the document.

---

# 2.28 Weight

Weight SHOULD be used more conservatively than size.

The interface SHOULD avoid making all labels, buttons, headings, navigation, and table cells semibold.

If everything is bold, weight no longer provides hierarchy.

Weight SHOULD normally distinguish:

- headings from body;
- selected navigation from unselected navigation;
- primary values from labels;
- high-emphasis actions from surrounding text.

---

# 2.29 Colour

Colour MAY establish emphasis, state, or categorisation.

Colour MUST NOT be the sole carrier of:

- validation state;
- selection;
- disabled state;
- severity;
- required status.

Hierarchy colours SHOULD come from semantic foreground tokens.

Avoid using brand colour for every clickable or important object when structure, underline, weight, or placement communicates the role more effectively.

---

# 2.30 Space as hierarchy

Whitespace MUST be treated as hierarchy, not unused screen area.

Elements close together are perceived as a group; increasing separation weakens that relationship. Carbon explicitly documents proximity and spacing as mechanisms for communicating grouping and importance.  
https://carbondesignsystem.com/elements/spacing/overview/

Therefore:

```text
label → control
```

MUST normally have less separation than:

```text
one field group → next field group
```

and:

```text
section heading → own content
```

MUST normally have less separation than:

```text
previous section → next section
```

A common hierarchy should resemble:

```text
Heading
  8–16
Content
  32–64
Next Heading
```

rather than equal 24px gaps between everything.

---

# 2.31 Depth

Depth SHOULD be the final hierarchy lever, not the first.

Elevation is most effective when relatively rare.

Use depth to communicate:

- overlap;
- modal priority;
- temporary floating content;
- persistent chrome above scrolling content.

Do NOT elevate ordinary static content solely to attract attention.

---

# 2.32 Scan paths

Layouts MUST support predictable scanning.

## F-pattern

NN/g eye-tracking research documents an F-shaped scanning pattern that can occur on text-heavy web pages, particularly where content is weakly formatted. NN/g explicitly cautions that this pattern is not universal and that good formatting can reduce undesirable F-shaped scanning. citeturn577682search0

Therefore the system MUST NOT treat “design an F-pattern” as a page-layout requirement.

Instead, text-heavy pages SHOULD support efficient scanning through:

- descriptive headings;
- front-loaded labels;
- lists;
- visible grouping;
- meaningful whitespace;
- constrained line length.

## Z-path

A Z-shaped path MAY be used as a **composition heuristic** for sparse surfaces containing a small number of high-priority elements, such as:

```text
identity/header        utility/action
          ↓
        message
          ↓
supporting content     primary CTA
```

The Z-path MUST NOT be treated as a universal eye-tracking law.

Application dashboards, tables, forms, and dense tools SHOULD generally prioritize alignment and grouping over forced Z composition.

---

# 2.33 Grouping by proximity

Proximity SHOULD be the primary grouping mechanism before decorative containment.

Prefer:

```text
Heading
small gap
Content

large gap

Heading
small gap
Content
```

over placing every group inside a separately shadowed card.

A border or card SHOULD be introduced when the group requires an explicit boundary, independent interaction, different surface state, or movable containment.

---

# 2.34 Alignment discipline

Every page SHOULD have a small number of dominant alignment lines.

Text, controls, cards, panels, and headings SHOULD align to:

- grid tracks;
- container edges;
- consistent content insets.

Near-alignment MUST be treated as misalignment.

For example:

```text
24px
24px
24px
22px   ← non-conformant without a reason
```

Controls SHOULD NOT drift several pixels simply because their internal component structure differs.

Components MUST expose enough composition flexibility to align their visible content correctly.

---

# 2.35 Optical vs mathematical centring

Mathematical centring SHOULD be the default.

Optical correction MAY be applied when visual mass produces a perceptible imbalance.

Common examples include:

- triangular play icons;
- asymmetric logos;
- chevrons;
- glyphs with unequal side bearings;
- irregular illustrations.

Optical corrections SHOULD be small and tokenized or component-owned.

A 1px optical correction MAY therefore be legitimate even though it falls outside the normal spacing scale.

Application pages MUST NOT accumulate arbitrary optical offsets.

---

# 2.36 shadcn/ui composition baseline

shadcn/ui MUST be treated as the default component primitive library where an equivalent primitive exists.

Relevant primitives include:

- `Card`;
- `Separator`;
- `Sidebar`;
- `Resizable`;
- `ScrollArea`;
- `Sheet`;
- `Drawer`;
- `Dialog`;
- `Popover`;
- `Tooltip`;
- `Table`;
- `Avatar`;
- `Skeleton`.

`Sidebar` currently provides a composable structure with sticky header/footer and a scrollable content region. citeturn421730search0

`ScrollArea` augments native scrolling and SHOULD be used only when its custom behaviour/presentation provides value; native scrolling remains preferred for ordinary page flow. citeturn421730search2

shadcn/ui visual defaults MAY be adapted to the canonical tokens in this specification.

Its default class values MUST NOT become an undocumented second design-token system.

---

# 2.37 Cross-standard alignment

## Security

Spacing, surface, opacity, elevation, clipping, and responsive hiding MUST NOT function as access control.

Invisible content is not unauthorized content.

Sensitive information MUST NOT be rendered behind:

- blur;
- collapsed panels;
- transparent overlays;
- off-screen transforms

when the current principal is not authorized to access it.

---

## Data & Database

Density MUST NOT cause applications to request or render unbounded data.

A denser table permits more visible rows; it does not justify retrieving an unlimited dataset.

Large datasets MUST follow pagination, virtualization, or incremental-loading standards.

---

## API

Panel composition MUST NOT dictate API ownership.

Independent dashboard modules MAY fetch independently when their lifecycle warrants it.

They SHOULD share request/cache state when they consume the same underlying resource.

Responsive layout changes MUST NOT duplicate API calls solely because a component moved between columns or panes.

---

## State Management

Persist only useful layout preferences, such as:

- density;
- panel sizes;
- sidebar state;
- dashboard arrangement.

Persisted values MUST be validated against current constraints.

A previously stored 800px inspector width MUST NOT make a 700px viewport unusable.

---

## Forms & Validation

Density changes MUST preserve:

- label relationships;
- error relationships;
- focus order;
- field visibility;
- hit targets.

Form hierarchy SHOULD be created through spacing and headings before introducing excessive cards or dividers.

---

## Accessibility

All density, grid, sticky, overlay, and responsive behaviour MUST conform to the Accessibility standard.

WCAG reflow, target-size, focus-order, and focus-obscuration requirements take precedence over visual density goals.  
https://www.w3.org/WAI/WCAG22/Techniques/css/C32  
citeturn150428search0turn150428search2

---

# 2.38 Canonical token catalogue

The following table defines the reference token architecture.

Products MAY theme visual values but MUST preserve the semantic model.

| Family | Token | Reference value / intent |
|---|---|---|
| Spacing | `space.0` | 0 |
| Spacing | `space.0_5` | 2px |
| Spacing | `space.1` | 4px |
| Spacing | `space.2` | 8px |
| Spacing | `space.3` | 12px |
| Spacing | `space.4` | 16px |
| Spacing | `space.5` | 20px |
| Spacing | `space.6` | 24px |
| Spacing | `space.8` | 32px |
| Spacing | `space.10` | 40px |
| Spacing | `space.12` | 48px |
| Spacing | `space.16` | 64px |
| Spacing | `space.20` | 80px |
| Spacing | `space.24` | 96px |
| Spacing | `space.32` | 128px |
| Spacing | `space.40` | 160px |
| Radius | `radius.none` | 0 |
| Radius | `radius.xs` | 2px |
| Radius | `radius.sm` | 4px |
| Radius | `radius.md` | 6px |
| Radius | `radius.lg` | 8px |
| Radius | `radius.xl` | 12px |
| Radius | `radius.2xl` | 16px |
| Radius | `radius.3xl` | 24px |
| Radius | `radius.full` | 9999px / 50% |
| Elevation | `elevation.0` | none |
| Elevation | `elevation.1` | subtle/local surface separation |
| Elevation | `elevation.2` | raised interactive surface |
| Elevation | `elevation.3` | dropdown/popover |
| Elevation | `elevation.4` | drawer/floating panel |
| Elevation | `elevation.5` | modal/high-priority temporary layer |
| Z-index | `z.base` | 0 |
| Z-index | `z.raised` | 5 |
| Z-index | `z.sticky` | 10 |
| Z-index | `z.dropdown` | 20 |
| Z-index | `z.popover` | 30 |
| Z-index | `z.overlay` | 40 |
| Z-index | `z.modal` | 50 |
| Z-index | `z.toast` | 60 |
| Z-index | `z.tooltip` | 70 |

Elevation tokens SHOULD resolve to a complete recipe containing:

```text
shadow geometry
shadow colour
optional border
surface tone
```

rather than to `box-shadow` alone.

---

# 2.39 Worked page-composition example

## Operations dashboard

### Requirement

The page contains:

- global navigation;
- page title;
- time range;
- primary KPIs;
- an operational map;
- active-incidents table;
- secondary health metrics.

The page uses a **12-column dashboard grid** at ordinary desktop width.

### Wide desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ Global navigation                                           │
├──────────────────────────────────────────────────────────────┤
│ Operations                      [Range] [Filters] [Refresh]   │
│ stack.section = 48                                      │
├───────────────┬───────────────┬───────────────┬──────────────┤
│ KPI           │ KPI           │ KPI           │ KPI          │
│ 3 cols        │ 3 cols        │ 3 cols        │ 3 cols       │
├───────────────────────────────────────┬──────────────────────┤
│                                       │ Health               │
│              MAP                      │                      │
│              8 cols                   │ 4 cols               │
│              full local bleed         ├──────────────────────┤
│                                       │ Alerts               │
├───────────────────────────────────────┴──────────────────────┤
│ Active incidents — sticky table header                      │
│ 12 cols                                                     │
│ ──────────────────────────────────────────────────────────── │
│ row                                                         │
│ row                                                         │
└──────────────────────────────────────────────────────────────┘
```

Reference composition:

```text
container       container.wide
page gutter     gutter.wide = 32px
grid            12 columns
grid gap        24px
section gap     48px
panel inset     16–24px
panel radius    radius.lg
static panels   elevation.0 + border/subtle surface
map controls    elevation.2
popover         elevation.3 / z.popover
sticky header   z.sticky
```

The KPI modules MUST NOT each receive a dramatic shadow.

Their alignment, common height, shared surface treatment, and 24px grid gap already establish grouping.

The map MAY fill its entire eight-column region because spatial content benefits directly from additional area.

Map controls MAY float at `elevation.2`.

The map itself MUST NOT be placed inside another heavily padded card merely to match adjacent KPI cards.

The incident table SHOULD use compact density where expert scanning is the primary task.

Its sticky header MUST remain above rows at `z.sticky`, with a border or low elevation appearing when rows pass underneath.

The sticky header MUST NOT hide focused row controls. citeturn150428search4

### Medium

The grid SHOULD transform to:

```text
KPIs       2 × 2
Map        full row
Health     1/2 row
Alerts     1/2 row
Incidents  full row
```

The page MUST NOT preserve an 8/4 map split if either region becomes unusably narrow.

### Compact

The composition MUST become:

```text
Title/actions
KPI
KPI
KPI
KPI
Map
Health
Alerts
Incidents
```

The table MAY transform into a compact responsive record-list pattern if its column structure cannot reflow.

The document MUST NOT acquire horizontal scrolling merely to preserve the desktop grid. W3C's reflow guidance explicitly supports collapsing Grid layouts into fewer columns while retaining logical source order.  
https://www.w3.org/WAI/WCAG22/Techniques/css/C32

### Container-aware panel

The Health panel SHOULD use its own container query.

When the panel is wide:

```text
Metric | Metric | Metric
```

When narrow:

```text
Metric
Metric
Metric
```

That transformation SHOULD depend on the panel's actual inline size rather than on the page viewport. citeturn577682search2

---

# 3. Anti-patterns

## 3.1 Arbitrary magic numbers

Non-conformant:

```css
padding: 19px;
gap: 27px;
top: 13px;
width: calc(100% - 37px);
```

without a documented geometric, accessibility, or external-system reason.

An arbitrary value MUST NOT be introduced merely to match one screenshot.

---

## 3.2 Mixing spacing systems

A feature MUST NOT simultaneously invent:

```text
Bootstrap spacing
Tailwind defaults
legacy Sass values
Figma-only values
local component values
Gold Standard tokens
```

as independent systems.

Third-party/component-library spacing MUST be mapped into the canonical token model.

---

## 3.3 Shadow stacking

Do NOT stack multiple elevation effects simply to make a component “pop.”

Common non-conformant composition:

```text
border
+
inner highlight
+
small shadow
+
large shadow
+
glow
```

on routine cards.

Elevation MUST communicate a real layer relationship.

---

## 3.4 Centred-everything layouts

Pages MUST NOT centre every:

- heading;
- paragraph;
- form label;
- button group;
- data value;
- navigation control

merely for visual symmetry.

Left/start alignment SHOULD be the default for substantial reading, forms, tables, and operational interfaces.

Centre alignment MAY be appropriate for:

- small empty states;
- confirmations;
- short marketing messages;
- isolated metrics.

---

## 3.5 Radius soup

A single page SHOULD NOT casually mix:

```text
2px
5px
7px
10px
13px
18px
9999px
```

corners.

Shape hierarchy MUST come from the radius system.

---

## 3.6 Pill everything

Buttons, cards, inputs, navigation, panels, dialogs, and tables MUST NOT all become pills.

Pill geometry MUST have a structural or semantic reason.

---

## 3.7 Z-index escalation

Do NOT fix layer bugs with successively larger integers.

```text
100
1000
9999
99999
```

indicates an unresolved stacking-context problem.

---

## 3.8 Blur everywhere

Large translucent surfaces MUST NOT become the default product chrome.

Blur can reduce legibility, increase contrast variability, complicate stacking contexts, and harm rendering performance. citeturn606328search0turn606328search5

---

## 3.9 Dashboard card soup

A dashboard MUST NOT place every metric, sentence, control, and chart in an equally weighted card.

Containment MUST reflect information structure.

---

## 3.10 False grid precision

Designers MUST NOT force unrelated content onto the same column boundary merely because the grid allows it.

The grid is a coordination system, not a prohibition against necessary content sizing.

---

## 3.11 Breakpoint proliferation

Pages MUST NOT introduce numerous local viewport breakpoints to repair a brittle composition.

If a component needs local responsiveness, use container queries.

If a page needs many emergency breakpoints, reconsider the underlying Layout Pattern.

---

## 3.12 CSS visual reordering

CSS Grid/Flex ordering MUST NOT make visual sequence contradict DOM/focus sequence.

W3C explicitly warns that Grid placement can create a keyboard-navigation disconnect when visual and source order diverge.  
https://www.w3.org/WAI/WCAG22/Techniques/css/C32

---

## 3.13 Density by font shrinkage

Compact mode MUST NOT be created primarily by reducing body text size.

Density SHOULD primarily change:

- padding;
- gaps;
- row height;
- secondary-content visibility where semantically appropriate.

---

## 3.14 Sticky-chrome accumulation

A page MUST NOT stack:

```text
global header
subnav
breadcrumbs
filter bar
tabs
toolbar
table header
```

all as sticky regions without an explicit viewport-budget analysis.

Persistent chrome MUST earn the space it consumes.

---

## 3.15 Optical-adjustment proliferation

A handful of icon corrections MAY be legitimate.

Dozens of:

```text
translateY(-1px)
left: 2px
margin-top: -3px
```

rules across application pages indicate a broken component or alignment system.

---

# 4. Checklist

## Spacing

- [ ] Does the feature use the canonical primitive scale?
- [ ] Are relationships expressed through semantic `inset`, `stack`, `inline`, or `gutter` tokens?
- [ ] Does the parent own sibling spacing?
- [ ] Is every off-scale value justified?
- [ ] Would a repeated exception be better represented as a new semantic token?

## Grid and containers

- [ ] Is the page's container type explicit?
- [ ] Is a 12- or 16-column grid selected intentionally?
- [ ] Are gutters tokenized?
- [ ] Does the layout transform rather than shrink?
- [ ] Can the page reflow without unnecessary horizontal document scrolling?
- [ ] Does DOM order remain meaningful after transformation?

## Container responsiveness

- [ ] Are page-level changes governed by viewport/layout breakpoints?
- [ ] Are reusable local components using container queries where parent width matters?
- [ ] Is `subgrid` used where genuine cross-level alignment is required?
- [ ] Have unnecessary containment boundaries been avoided?

## Density

- [ ] Is comfortable the default unless the workflow justifies another mode?
- [ ] Does compact mode preserve accessible pointer targets?
- [ ] Is typography still legible?
- [ ] Does density preserve semantic state and validation behaviour?
- [ ] Is density independent from viewport size unless ergonomics justify an override?

## Dashboard/data density

- [ ] Is there an obvious information hierarchy?
- [ ] Are panels grouped by task and data relationship?
- [ ] Are cards used only where containment is meaningful?
- [ ] Are resizable panes bounded by min/max sizes?
- [ ] Are sticky table headers necessary and correctly layered?
- [ ] Can full-bleed spatial surfaces coexist with contained content?

## Elevation

- [ ] Is elevation communicating a real layer relationship?
- [ ] Could spacing, tone, or a border do the job more simply?
- [ ] Does every layer use a semantic z-index token?
- [ ] Are arbitrary z-index values absent?
- [ ] Are shadows tokenized?
- [ ] Are modal/dropdown/popover levels clearly differentiated without excessive depth?

## Blur/translucency

- [ ] Is blur optional rather than structurally required?
- [ ] Does text remain readable without the filter?
- [ ] Has the surface been profiled on realistic hardware/content?
- [ ] Is reduced-transparency behaviour supported where applicable?
- [ ] Are large animated filtered regions avoided?

## Shape

- [ ] Are all radii drawn from the canonical scale?
- [ ] Is pill geometry semantically justified?
- [ ] Do nested rounded surfaces use concentric geometry?
- [ ] Are avatar shapes consistent?
- [ ] Is shape never the sole semantic indicator?

## Visual hierarchy

- [ ] Is hierarchy achieved through a controlled combination of size, weight, colour, space, and depth?
- [ ] Does whitespace communicate grouping?
- [ ] Are dominant alignment lines obvious?
- [ ] Has unnecessary centre alignment been avoided?
- [ ] Are important labels/content easy to scan?
- [ ] Are F/Z concepts being used as heuristics rather than rigid page templates?
- [ ] Are optical corrections component-owned and exceptional?

## Cross-standard conformance

- [ ] Does responsive hiding remain separate from authorization?
- [ ] Does density remain separate from data-fetch volume?
- [ ] Do layout changes avoid duplicate API requests?
- [ ] Is persisted layout state validated?
- [ ] Are forms and validation relationships preserved?
- [ ] Does accessibility override visual-density preferences where necessary?
- [ ] Are shadcn/ui primitives mapped back to canonical Design Tokens?

---

# 5. Canonical Summary

The canonical spatial system is:

```text
4px foundational unit
↓
constrained hybrid primitive scale
↓
semantic spacing tokens
↓
container + grid primitives
↓
density modes
↓
Layout Patterns
↓
shadcn/ui component composition
```

The governing rules are:

```text
Use tokens, not magic numbers.

Use a hybrid spacing ramp:
fine control at small scale,
coarser distinction at large scale.

Express relationships through:
inset,
stack,
inline,
gutter.

Use 12 columns by default.
Use 16 only for justified wide, dense workspaces.

Use viewport breakpoints for page architecture.
Use container queries for component adaptation.
Use subgrid for real nested alignment.

Comfortable is the default density.
Compact is a productivity mode, not miniaturisation.

Use spacing and alignment before borders.
Use borders and surface tone before shadows.
Use shadows only when depth is real.

Z-index is a contract, not a competition.

Blur is enhancement, not structure.

Use a small shape language.
Pill geometry must have meaning.
Nested corners should be geometrically coherent.

Build hierarchy with:
size,
weight,
colour,
space,
depth —
in that order of restraint.

Treat F/Z scan paths as heuristics,
not templates or universal laws.

Alignment must be disciplined.
Optical exceptions must remain exceptional.
```

A Gold Standard composition MUST NOT maximize the amount of visual treatment.

It MUST minimize the number of spatial and visual rules needed to make **hierarchy, grouping, interaction, and responsive behaviour immediately legible**.

---

# 6. Sources

1. **IBM Carbon Design System — Spacing**  
   https://carbondesignsystem.com/elements/spacing/overview/

2. **GOV.UK Design System — Layout**  
   https://design-system.service.gov.uk/styles/layout/

3. **GOV.UK Design System — Spacing**  
   https://design-system.service.gov.uk/styles/spacing/

4. **Material Design 3 — Applying Elevation**  
   https://m3.material.io/styles/elevation/applying-elevation

5. **Material Design 3 — Corner Radius Scale**  
   https://m3.material.io/styles/shape/corner-radius-scale

6. **W3C WAI — Technique C32: Using media queries and grid CSS to reflow columns**  
   https://www.w3.org/WAI/WCAG22/Techniques/css/C32

7. **W3C WAI — WCAG 2.2 Target Size (Minimum)**  
   urlWCAG 2.2 Target Size (Minimum)https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

8. **W3C WAI — WCAG 2.2 Focus Not Obscured**  
   urlWCAG 2.2 Focus Not Obscuredhttps://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum

9. **MDN — CSS Container Queries**  
   urlMDN: CSS Container Querieshttps://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries

10. **MDN — CSS Subgrid**  
    urlMDN: CSS Subgridhttps://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid

11. **NN/g — F-Shaped Pattern of Reading: Misunderstood, But Still Relevant**  
    urlNN/g: F-Shaped Pattern of Readinghttps://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/

12. **MDN — `backdrop-filter`**  
    urlMDN: backdrop-filterhttps://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter

13. **web.dev — Create OS-style backgrounds with backdrop-filter**  
    urlweb.dev: backdrop-filterhttps://web.dev/articles/backdrop-filter

14. **Chrome for Developers — `prefers-reduced-transparency`**  
    urlChrome Developers: prefers-reduced-transparencyhttps://developer.chrome.com/blog/css-prefers-reduced-transparency

15. **shadcn/ui — Sidebar**  
    urlshadcn/ui: Sidebarhttps://ui.shadcn.com/docs/components/base/sidebar

16. **shadcn/ui — Resizable**  
    urlshadcn/ui: Resizablehttps://ui.shadcn.com/docs/components/aria/resizable

17. **shadcn/ui — Scroll Area**  
    urlshadcn/ui: Scroll Areahttps://ui.shadcn.com/docs/components/aria/scroll-area

The specification intentionally uses a **hybrid spacing ramp rather than declaring 8px-grid dogma**, and treats **12/16 columns, density, elevation, and radius as semantic systems rather than screenshot geometry**. This keeps it consistent with the earlier Layout Patterns chapter while making the token layer strict enough for implementation and design-system governance.
