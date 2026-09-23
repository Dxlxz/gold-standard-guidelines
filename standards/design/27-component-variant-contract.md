---
id: "component-variant-contract"
title: "Component Design & Variant Contract"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "component", "variant", "contract"]
applies_to: ["ui"]
related: ["accessibility"]
legacy_number: 107
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 62140
provenance: baseline

---

Research completed with Firecrawl. The specification below treats a component as a **semantic + behavioural + visual API contract**: Radix/WAI-ARIA own interaction semantics, CVA/tokens own variants, shadcn/ui supplies the baseline implementation, and Storybook/browser tests verify the public contract.

# Component Design & Variant Contract — Gold Standard 2026

**Canonical placement:** Design Tokens → Components → **Component Design & Variant Contract** → Component Catalogue → Patterns → Facade  
**Status:** Normative  
**Implementation baseline:** React 19+, TypeScript, shadcn/ui, Radix Primitives, Tailwind CSS, CVA  
**Accessibility target:** WCAG 2.2 AA or higher  
**Applies to:** shared UI primitives, composite components, application components, component libraries, design-system packages, Storybook documentation, and AI-generated component code.

---

# 1. Purpose

The Component Design & Variant Contract defines the minimum public, visual, semantic, interaction, accessibility, and testing guarantees required for every reusable component.

A component is not merely:

```text
markup
+
classes
```

A production component is a contract across:

```text
anatomy
+
semantics
+
props
+
variants
+
state
+
keyboard behaviour
+
focus behaviour
+
composition
+
tokens
+
documentation
+
tests
```

The same component MUST behave predictably regardless of:

- page;
- tenant;
- theme;
- density;
- responsive context;
- input method;
- application state.

Implementation flexibility is permitted **behind** the public contract.

Consumers SHOULD NOT need to understand Radix internals, Tailwind implementation details, or component-local DOM structure to use a stable component.

The WAI-ARIA Authoring Practices Guide defines interaction contracts for common widgets such as buttons, tabs, accordions, switches, toolbars, and radio groups. Those semantics and keyboard expectations take precedence over visual preference.  
https://www.w3.org/WAI/ARIA/apg/patterns/

Radix Primitives provides low-level accessible interaction primitives designed for composition and exposes state through structured APIs and `data-*` attributes.  
https://www.radix-ui.com/primitives/docs/

shadcn/ui remains the baseline component implementation layer, but its generated source MUST be normalized into this contract rather than becoming an uncontrolled parallel standard.  
https://ui.shadcn.com/docs/components

---

# 2. Rules

# 2.1 Component contract model

Every reusable component MUST define:

```text
1. purpose
2. anatomy
3. semantics
4. public API
5. variants
6. states
7. interactions
8. accessibility
9. composition contract
10. token contract
11. testing contract
12. usage guidance
```

A component MUST NOT be promoted into the shared library solely because its markup is reused twice.

Shared components require stable semantics.

---

# 2.2 Component anatomy

Every component MUST identify a **Root**.

Complex components SHOULD identify stable semantic slots or parts.

Canonical terminology:

```text
Root
Trigger
Content
Header
Body
Footer
Label
Description
Icon
Indicator
Action
Handle
Separator
```

Examples:

```text
Card.Root
Card.Header
Card.Title
Card.Description
Card.Content
Card.Footer

Tabs.Root
Tabs.List
Tabs.Trigger
Tabs.Content

Accordion.Root
Accordion.Item
Accordion.Trigger
Accordion.Content
```

Part names SHOULD describe semantic responsibility rather than CSS position.

Use:

```text
Header
Footer
Leading
Trailing
```

rather than:

```text
Top
Bottom
Left
Right
```

when semantic naming is possible.

---

# 2.3 Root contract

A Root component MUST own:

- component-level context;
- shared state;
- orientation where relevant;
- inherited size/density where relevant;
- shared accessibility relationships;
- `data-slot` identity where the system uses slot markers.

The Root MUST NOT own domain state unrelated to component behaviour.

For example:

```text
Tabs.Root
```

may own active-tab state.

It MUST NOT fetch the business record displayed inside a tab panel.

---

# 2.4 Slot contract

Slots exist where consumers need structured composition.

Slots SHOULD be introduced when:

- order matters;
- semantic relationships matter;
- styling depends on position/function;
- accessibility relationships must be maintained.

A slot SHOULD NOT exist merely to expose every nested `<div>`.

The component contract MUST NOT expose accidental implementation wrappers.

---

# 2.5 Public props API

Public props MUST describe semantic choices.

Good:

```ts
size="sm"
tone="danger"
emphasis="secondary"
loading
disabled
orientation="vertical"
```

Avoid:

```ts
red
hasShadow
rounded16
padding12
blueHover
makeBold
```

A public prop SHOULD describe **what the caller means**, not how the component happens to render that choice.

---

# 2.6 Variant axes

The canonical conceptual variant model is:

```text
size
×
tone
×
state
×
emphasis
```

These axes have different ownership.

| Axis | Examples | Owner |
|---|---|---|
| Size | `xs`, `sm`, `md`, `lg` | caller/context |
| Tone | `neutral`, `brand`, `danger` | caller/semantics |
| Emphasis | `primary`, `secondary`, `tertiary`, `ghost`, `link` | caller/hierarchy |
| State | hover, focus, active, selected, disabled, loading, error | runtime/component |

**State is a design axis but MUST NOT generally become a free-form public variant prop.**

This is non-conformant:

```tsx
<Button state="hover" />
<Button state="focused" />
```

Transient states MUST derive from real interaction.

Persistent semantic state MAY be represented through explicit props such as:

```tsx
disabled
loading
selected
invalid
readOnly
```

when that state belongs to the component.

---

# 2.7 Size naming

Shared components MUST use the canonical size vocabulary:

```text
xs
sm
md
lg
```

`md` SHOULD be the default unless the product's density standard specifies otherwise.

A component SHOULD NOT invent:

```text
tiny
normal
regular
mediumLarge
jumbo
```

when canonical sizes are sufficient.

A component MAY support only a subset.

For example:

```text
Avatar:
xs sm md lg

Button:
sm md lg

Badge:
sm md
```

---

# 2.8 Tone naming

Canonical interaction tones:

```text
neutral
brand
danger
```

Status/display components MAY additionally support:

```text
info
success
warning
danger
```

Action components SHOULD NOT automatically expose `success` as an action tone.

"Success" generally describes system status rather than an action's consequence.

---

# 2.9 Emphasis naming

Canonical action emphasis is:

```text
primary
secondary
tertiary
ghost
link
```

Destruction SHOULD be represented through tone:

```tsx
<Button tone="danger" emphasis="primary">
  Delete account
</Button>
```

rather than encoding destruction and hierarchy into one overloaded string.

shadcn/ui currently ships button styles including default, secondary, destructive, outline, ghost, and link. The Gold Standard MAY remap these implementation styles into separate semantic `tone` and `emphasis` axes while continuing to use the shadcn implementation baseline.  
https://ui.shadcn.com/docs/components/base/button

---

# 2.10 Variant naming rules

Variant names MUST:

- be semantic;
- remain stable across themes;
- remain meaningful without knowing the CSS;
- avoid brand-specific colour names where possible.

Prefer:

```text
tone="danger"
```

over:

```text
variant="red"
```

Prefer:

```text
emphasis="secondary"
```

over:

```text
variant="outline"
```

when the public contract is describing hierarchy rather than rendering technique.

`outline` MAY remain an internal CVA recipe.

---

# 2.11 Defaults

Every optional variant axis MUST define an intentional default.

CVA provides `defaultVariants` specifically for this purpose.  
https://cva.style/getting-started/variants/

Example:

```ts
const buttonVariants = cva(base, {
  variants: {
    size: {
      sm: "...",
      md: "...",
      lg: "...",
    },
    tone: {
      neutral: "...",
      brand: "...",
      danger: "...",
    },
    emphasis: {
      primary: "...",
      secondary: "...",
      tertiary: "...",
      ghost: "...",
      link: "...",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "brand",
    emphasis: "primary",
  },
});
```

A default MUST NOT be accidental merely because the first branch in a conditional happened to render correctly.

---

# 2.12 Forbidden prop combinations

Illegal combinations MUST be prevented through one or more of:

- TypeScript unions;
- separate components;
- development assertions;
- documented contract;
- runtime validation where necessary.

Canonical forbidden or strongly discouraged combinations include:

| Combination | Rule |
|---|---|
| `value` + `defaultValue` | MUST NOT both control the same state |
| `checked` + `defaultChecked` | MUST NOT both control the same state |
| icon-only button without accessible name | MUST NOT render |
| ordinary Button + `selected` | MUST use toggle/selection semantics instead |
| Button + `readOnly` | Invalid concept |
| `href` on native `<button>` | Invalid |
| disabled navigation link | SHOULD be avoided rather than simulated |
| `Badge` + `onClick` | Use Button/Tag/action component |
| radio-style SegmentedControl + multiple selection | MUST use ToggleGroup/multi-select primitive |
| loading anchor/navigation action | SHOULD NOT imply cancellable command semantics |
| interactive Card wrapping nested interactive descendants | MUST NOT create invalid nested interaction |
| `asChild` changing semantic role incorrectly | MUST NOT be permitted by usage |
| uncontrolled state becoming controlled during lifecycle | MUST NOT occur |

---

# 2.13 Representative TypeScript — shared variant contract

```ts
type ComponentSize = "xs" | "sm" | "md" | "lg";

type ActionTone =
  | "neutral"
  | "brand"
  | "danger";

type ActionEmphasis =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "link";

type StatusTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger";

interface BaseComponentProps {
  className?: string;
  "data-testid"?: string;
}
```

Applications SHOULD NOT define competing copies of these vocabularies in individual feature folders.

---

# 2.14 Representative Button interface

```ts
import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

interface ButtonSemanticProps {
  tone?: ActionTone;
  emphasis?: ActionEmphasis;
  size?: Exclude<ComponentSize, "xs">;
  loading?: boolean;
}

type ButtonNativeProps =
  Omit<
    React.ComponentProps<"button">,
    "color"
  >;

export type ButtonProps =
  ButtonNativeProps &
  ButtonSemanticProps & {
    ref?: React.Ref<HTMLButtonElement>;
  };
```

With React 19, refs can be accepted as ordinary component props, and `forwardRef` is no longer necessary for new function components. Libraries supporting React 18 MAY retain `forwardRef` as a compatibility mechanism.  
https://react.dev/reference/react/forwardRef  
https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop

The contract is therefore:

> A component that represents or wraps a focusable DOM primitive MUST expose the relevant ref transparently.

The contract is **not**:

> Every React component MUST use `forwardRef`.

---

# 2.15 Controllable-state interface

Stateful primitives SHOULD follow a consistent controlled/uncontrolled API.

```ts
interface ControllableValueProps<T> {
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
}
```

For booleans:

```ts
interface ControllableCheckedProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
```

If `value` is supplied, the component is controlled.

If `defaultValue` is supplied without `value`, the component is uncontrolled.

A component MUST NOT change between controlled and uncontrolled mode during normal lifecycle.

---

# 2.16 State semantics

The component system MUST distinguish:

```text
hover
active
selected
checked
pressed
expanded
focus
disabled
loading
invalid
read-only
```

These terms are NOT interchangeable.

Use:

- `aria-selected` for selection widgets such as tabs/options where appropriate;
- `aria-checked` for checkbox/radio/switch semantics;
- `aria-pressed` for toggle buttons;
- `aria-expanded` for disclosure state;
- `aria-disabled` or native `disabled` for unavailable interaction.

The WAI-ARIA Button Pattern specifically defines `aria-pressed` for toggle buttons and distinguishes button actions from navigation links.  
https://www.w3.org/WAI/ARIA/apg/patterns/button/

---

# 2.17 Component state matrix

Every applicable interactive component MUST define the following state matrix.

| State | Meaning | Required token families | Required behaviour |
|---|---|---|---|
| Default | Resting available state | `fg.default`, `bg.default`, `border.default` | Stable baseline |
| Hover | Pointer indication | `bg.hover`, `fg.hover`, optional `border.hover` | MUST NOT cause layout shift |
| Focus-visible | Keyboard/programmatic focus | `focus.ring`, `focus.offset`, optional `border.focus` | MUST remain visible |
| Active | Pointer/key currently pressed | `bg.active`, `fg.active`, optional `elevation.active` | Temporary only |
| Selected | Persistent selection | `selected.bg`, `selected.fg`, `selected.border` | Programmatically exposed |
| Disabled | Unavailable action | `disabled.bg`, `disabled.fg`, `disabled.border` | Cannot activate |
| Loading | Action in progress | `loading.indicator`, stable action surface | Prevent duplicate action where necessary |
| Error | Validation/failure state | `danger.border`, `danger.fg`, `danger.ring` | Error exposed beyond colour |
| Read-only | Value viewable but not editable | `readonly.bg`, `readonly.fg`, `readonly.border` | Focusability based on control semantics |
| Draggable | Object supports repositioning | `drag.handle`, `drag.preview`, `drop.target` | Drag MUST NOT be sole operation |

State tokens MUST resolve through Design Tokens.

Components MUST NOT invent state colours locally.

---

# 2.18 State precedence

When states coexist, component recipes MUST define deterministic precedence.

Recommended precedence:

```text
disabled
>
loading
>
error / invalid
>
selected / checked / pressed
>
focus-visible
>
active
>
hover
>
default
```

This is a styling precedence model, not an accessibility model.

For example:

```text
selected + focus-visible
```

MUST preserve both:

- persistent selected indication;
- visible focus indication.

Focus MUST NOT disappear merely because another state has stronger colour.

---

# 2.19 Hover

Hover treatment MUST:

- reinforce affordance;
- remain subtle;
- avoid geometry changes.

Hover MUST NOT:

- increase border width and shift layout;
- dramatically scale routine controls;
- reveal essential information unavailable to keyboard/touch users.

Touch interfaces MUST remain fully usable without hover.

---

# 2.20 Focus-visible

Interactive components MUST provide a visible keyboard focus indicator.

A canonical focus token SHOULD provide:

```text
focus.ring.color
focus.ring.width
focus.ring.offset
```

Focus styling MUST NOT be removed with:

```css
outline: none;
```

unless an equal or stronger replacement is provided.

WCAG 2.2 includes Focus Not Obscured requirements and additional focus-appearance guidance.  
https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum  
https://www.w3.org/TR/WCAG22/#focus-appearance

---

# 2.21 Active vs selected

`active` means an interaction is presently being actuated.

Example:

```text
mouse button down
Space key down
```

`selected` means a persistent choice is current.

A tab can be:

```text
selected
+
focused
+
hovered
```

simultaneously.

The component implementation MUST NOT use a single generic `.active` class for all of these meanings.

---

# 2.22 Disabled

Native form controls SHOULD use native `disabled` where its semantics are appropriate.

`aria-disabled` MAY be used where an element must remain discoverable/focusable while communicating that activation is unavailable.

The chosen pattern MUST be documented.

Disabled styling MUST NOT be the sole authorization mechanism.

Security/API authorization remains authoritative.

---

# 2.23 Loading

Loading MUST describe an actual asynchronous operation.

A loading action SHOULD:

- preserve its width;
- retain enough label context to identify the action;
- expose progress/busy semantics where useful;
- prevent accidental duplicate submission when duplicate execution is unsafe.

Example:

```tsx
<Button loading>
  Save changes
</Button>
```

SHOULD visually preserve `"Save changes"` context rather than collapsing into an unlabeled spinner.

A spinner alone is insufficient for icon-free actions unless the accessible name remains available.

---

# 2.24 Error / invalid

Validation-state components MUST use semantic error tokens.

For form controls:

```tsx
aria-invalid={true}
aria-describedby={errorId}
```

SHOULD be connected to the associated error message where appropriate.

Error state MUST NOT rely on red border alone.

The Forms & Validation standard remains authoritative for error timing and message content.

---

# 2.25 Read-only

Read-only is not disabled.

Read-only values MAY remain:

- selectable;
- copyable;
- focusable where the native primitive supports it.

Read-only styling SHOULD preserve normal text contrast.

Do NOT reduce read-only content to disabled opacity.

---

# 2.26 Draggable

Draggable elements MUST have a visually identifiable handle where dragging is not implicit.

The system MUST provide an alternative to dragging when required by WCAG 2.2 Dragging Movements.  
https://www.w3.org/TR/WCAG22/#dragging-movements

Examples include:

- Move up/down actions;
- keyboard reordering;
- numerical position control.

Dragging MUST NOT be the sole way to perform a required operation.

---

# 2.27 Interaction primitive hierarchy

Canonical action hierarchy:

```text
Primary
Secondary
Tertiary
Ghost
Link
```

`danger` is a semantic tone layered over appropriate emphasis.

Carbon similarly differentiates button hierarchy and explicitly distinguishes primary, tertiary, ghost, and danger treatment according to prominence and consequence.  
https://carbondesignsystem.com/components/button/usage/

---

# 2.28 Primary Button

Use for the dominant action in the local decision context.

Examples:

```text
Save changes
Submit application
Approve request
Create case
```

A surface SHOULD normally contain no more than one visually dominant primary action in one local action group.

Not every page requires a primary button.

Carbon explicitly notes that not every page needs a primary button and recommends lower-prominence styles for supporting actions.  
https://carbondesignsystem.com/components/button/usage/

---

# 2.29 Secondary Button

Use for an important alternative action.

Examples:

```text
Save draft
Back
Preview
```

A secondary action MUST remain visually subordinate to the local primary action.

---

# 2.30 Tertiary Button

Use for lower-emphasis but clearly bounded actions.

Examples:

```text
Edit filters
Manage columns
View details
```

Tertiary MUST remain recognisable as interactive without competing with primary actions.

---

# 2.31 Ghost Button

Use where container chrome is unnecessary.

Typical uses:

- toolbars;
- compact supporting controls;
- cancel/back actions;
- repetitive row operations.

Ghost buttons MUST retain visible hover and focus treatment.

A ghost button MUST NOT become invisible merely because its resting background is transparent.

---

# 2.32 Link action

A link navigates.

A button acts.

WAI-ARIA explicitly distinguishes button actions from links and recommends that appearance and role match function.  
https://www.w3.org/WAI/ARIA/apg/patterns/button/

Therefore:

```tsx
<a href="/reports">View reports</a>
```

is preferred for navigation.

```tsx
<button>Generate report</button>
```

is preferred for an action.

Styling MUST NOT reverse semantic responsibility.

---

# 2.33 Destructive actions

Destructive actions MUST use `tone="danger"`.

The component MAY vary emphasis according to consequence and context:

```text
danger primary
danger tertiary
danger ghost
```

Immediate irreversible actions SHOULD NOT be visually indistinguishable from ordinary actions.

Confirmation behaviour belongs to the relevant Pattern/Form standard, not to Button itself.

---

# 2.34 Icon Button

Icon-only buttons MUST have an accessible name.

Example:

```tsx
<IconButton
  aria-label="Close panel"
>
  <XIcon />
</IconButton>
```

Tooltip text MAY duplicate/explain the control for sighted users.

A tooltip MUST NOT be the sole accessible name.

Icon buttons MUST meet the applicable pointer-target requirement.

WCAG 2.2 Target Size (Minimum) requires a target of at least 24×24 CSS pixels unless an exception applies. The Gold Standard SHOULD normally exceed that minimum in comfortable/touch contexts.  
https://www.w3.org/TR/WCAG22/#target-size-minimum

---

# 2.35 Icon Button interface

```ts
type IconButtonProps =
  Omit<ButtonProps, "children"> & {
    children: React.ReactElement;
    "aria-label": string;
  };
```

If the icon is decorative within an already labelled button, it SHOULD be hidden from assistive technology where appropriate.

---

# 2.36 Split Button

A split button consists of two independent interactive elements:

```text
[ Primary action ][ ▼ ]
```

The first activates the default action.

The second opens alternate actions.

The controls MUST be separate focusable elements.

The dropdown trigger MUST follow menu-button semantics.

The component MUST NOT create a single ambiguous focus target with two clickable regions.

---

# 2.37 Toggle Button

Use a toggle button when the same labelled action has pressed/unpressed state.

Examples:

```text
Bold
Mute
Pin
```

A toggle button SHOULD expose `aria-pressed`.

WAI-ARIA states that a toggle button uses `aria-pressed` and recommends retaining the same label while pressed state changes.  
https://www.w3.org/WAI/ARIA/apg/patterns/button/

---

# 2.38 Switch

Use a Switch for an immediate binary on/off setting.

Examples:

```text
Email notifications  On / Off
Dark mode            On / Off
```

A Switch MUST NOT be used for:

- form submission;
- three-state choices;
- navigation.

Switch semantics SHOULD follow the WAI-ARIA Switch Pattern or a native checkbox where appropriate.  
https://www.w3.org/WAI/ARIA/apg/patterns/switch/

---

# 2.39 Segmented Control

A segmented control representing **one choice among mutually exclusive options** SHOULD use radio-group semantics.

Example:

```text
[ List ] [ Grid ] [ Map ]
```

Arrow-key navigation SHOULD follow radio-group conventions.

WAI-ARIA specifies arrow navigation for radio groups and manages focus as one composite choice set.  
https://www.w3.org/WAI/ARIA/apg/patterns/radio/

If multiple segments may be simultaneously active, use a Toggle Group instead of radio semantics.

---

# 2.40 Tabs

Tabs are for switching among layered panels within one context.

Tabs MUST follow:

```text
tablist
tab
tabpanel
```

semantics.

The active tab MUST expose `aria-selected="true"`.

Arrow keys move among tabs.

WAI-ARIA recommends automatic activation only when the tab panel can appear without noticeable latency; otherwise manual activation using `Enter`/`Space` is appropriate.  
https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

Tabs MUST NOT be used merely as visually styled navigation links between unrelated pages.

---

# 2.41 Tabs keyboard contract

| Key | Horizontal Tabs |
|---|---|
| `Tab` | Enters active tab / leaves tablist |
| `Left Arrow` | Previous tab |
| `Right Arrow` | Next tab |
| `Home` | First tab, optional |
| `End` | Last tab, optional |
| `Enter` / `Space` | Activate in manual mode |

Vertical tabs use Up/Down for tab movement.

These behaviours follow WAI-ARIA APG.  
https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

---

# 2.42 Cards

A Card is a visual grouping surface.

A Card MUST NOT automatically imply interactivity.

Static cards SHOULD normally remain semantic containers such as:

```html
<section>
<article>
<div>
```

according to content.

Do NOT add:

```text
role="button"
tabindex="0"
```

simply because a hover effect was added.

---

# 2.43 Interactive Cards

If the entire card navigates, the primary semantic action SHOULD generally be a link.

Nested interactive controls MUST remain separately operable.

The implementation MUST NOT create invalid nested interactive content such as a `<button>` inside a wrapping `<button>`.

Overlay-link patterns MUST preserve:

- text selection;
- nested actions;
- keyboard access;
- focus visibility.

---

# 2.44 Card anatomy

Canonical Card slots:

```text
Card
├── Header
│   ├── Title
│   └── Description
├── Content
└── Footer
```

Optional action areas MAY be added where semantically justified.

Every card SHOULD NOT be forced to contain all slots.

---

# 2.45 List Item

List items MUST preserve parent list semantics.

Use:

```html
<ul>
  <li>...</li>
</ul>
```

for unordered semantic lists.

Use ordered lists when sequence matters.

Interactive result collections MAY require richer patterns, but a standard list item MUST NOT become a `gridcell` simply because it contains several columns.

---

# 2.46 Accordion

Accordion headers MUST be interactive buttons associated with expandable regions.

The trigger exposes `aria-expanded`.

`Enter` and `Space` expand/collapse the section under the WAI-ARIA Accordion Pattern.  
https://www.w3.org/WAI/ARIA/apg/patterns/accordion/

Canonical anatomy:

```text
Accordion.Root
└── Accordion.Item
    ├── Accordion.Trigger
    └── Accordion.Content
```

The heading hierarchy around triggers MUST remain meaningful.

---

# 2.47 Panel

A Panel is a bounded application region.

Panels MAY be:

- static;
- collapsible;
- resizable;
- docked;
- floating.

"Panel" does NOT imply a particular ARIA role.

Semantics come from content/function.

A generic panel MUST NOT receive `role="region"` unless it needs to function as a labelled landmark.

---

# 2.48 Toolbar

A Toolbar groups related controls.

WAI-ARIA recommends composite keyboard handling for toolbars so users do not need to tab through every individual button in a large group.  
https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/

A toolbar SHOULD therefore use arrow-key navigation/roving focus when the interaction pattern genuinely constitutes a toolbar.

Do NOT apply `role="toolbar"` to every horizontal collection of buttons.

---

# 2.49 Badge

A Badge is normally non-interactive.

Use for:

- status;
- count;
- category;
- short metadata.

Example:

```text
Pending
12
External
```

A badge MUST NOT acquire `onClick` and silently become a button.

Use a Button, FilterChip, or removable Tag instead.

---

# 2.50 Avatar

An Avatar identifies an entity visually.

Canonical anatomy:

```text
Avatar.Root
├── Avatar.Image
└── Avatar.Fallback
```

If an adjacent visible label already identifies the person/entity, image alternative text SHOULD avoid unnecessary repetition.

Fallback content SHOULD use:

- initials;
- approved icon;
- neutral placeholder.

Generated faces MUST NOT be used as authentic identity.

---

# 2.51 Tag

A Tag represents categorical metadata.

A Tag MAY be removable.

If removable:

```text
[ Finance × ]
```

the remove action MUST be an actual focusable button with an accessible name such as:

```text
Remove Finance
```

The entire tag MUST NOT become one ambiguous multi-purpose button.

---

# 2.52 Polymorphic composition

Polymorphism MUST preserve semantics.

Changing the rendered element is not merely a styling concern.

A component MAY expose:

```text
asChild
```

or another controlled polymorphism mechanism.

The caller remains responsible for choosing a semantically valid child.

Example:

```tsx
<Button asChild>
  <a href="/reports">
    View reports
  </a>
</Button>
```

is valid when the rendered component behaves as navigation.

---

# 2.53 Radix `asChild`

Radix's composition model allows primitives to merge behaviour and props onto consumer-supplied elements through `asChild`.

When a custom child component is used, it must transparently spread received props and expose the underlying ref required by the primitive.  
https://www.radix-ui.com/primitives/docs/guides/composition

The Gold Standard rule is:

> Composition MUST preserve the behavioural and accessibility contract of the primitive being composed.

---

# 2.54 Polymorphism restrictions

`as` / `asChild` MUST NOT be used to make invalid semantic substitutions.

Non-conformant:

```tsx
<Button asChild>
  <div>Submit</div>
</Button>
```

where the `<div>` does not preserve expected button semantics.

Polymorphism is an escape hatch for semantic composition, not permission to erase semantics.

---

# 2.55 Slots vs props

Use **props** for:

- semantic variants;
- state;
- primitive values;
- known configuration.

Use **slots/children** for:

- meaningful content;
- custom composition;
- extensible structure.

Good:

```tsx
<Alert tone="danger">
  <Alert.Title>Upload failed</Alert.Title>
  <Alert.Description>
    File size exceeds 50 MB.
  </Alert.Description>
</Alert>
```

Avoid:

```tsx
<Alert
  titleText="Upload failed"
  bodyText="File size exceeds 50 MB."
  leftThing={<Icon />}
  bottomThing={<Button />}
/>
```

when slots provide clearer composition.

---

# 2.56 Compound components

Compound APIs SHOULD be used where a component has meaningful internal relationships.

Good candidates:

```text
Tabs
Accordion
Card
Dialog
DropdownMenu
Table
Select
FormField
```

Compound components SHOULD share internal context where needed.

They MUST NOT require consumers to manually coordinate IDs or state that the component can safely own.

---

# 2.57 Controlled vs uncontrolled state

Stateful primitives SHOULD support both models where developer ergonomics justify it.

Uncontrolled:

```tsx
<Tabs defaultValue="overview">
```

Controlled:

```tsx
<Tabs
  value={tab}
  onValueChange={setTab}
>
```

Controlled mode SHOULD be used where:

- URL state owns selection;
- application state coordinates multiple components;
- server/domain state determines the active value.

Local uncontrolled state SHOULD be preferred for isolated UI behaviour.

---

# 2.58 Ref contract

Focusable primitives MUST expose the underlying relevant DOM node or an explicitly documented imperative handle.

React 19 permits refs to be received directly as props.  
https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop

Therefore new components SHOULD prefer:

```ts
function Button({
  ref,
  ...props
}: ButtonProps) {
  return <button ref={ref} {...props} />;
}
```

when the target React baseline supports it.

React 18-compatible libraries MAY use:

```ts
React.forwardRef(...)
```

The public capability—not the implementation syntax—is normative.

---

# 2.59 Imperative handles

Custom imperative handles SHOULD be avoided when native element access is sufficient.

Use `useImperativeHandle` only when a component needs to expose a deliberate limited imperative API.

React's own documentation recommends preferring props when the behaviour can be expressed declaratively.  
https://react.dev/reference/react/useImperativeHandle

---

# 2.60 shadcn/ui baseline

shadcn/ui source SHOULD be adopted as owned application code.

Teams MAY:

- map styles to canonical tokens;
- add documented variants;
- wrap components with domain-specific APIs;
- add tests;
- add Storybook coverage.

Teams SHOULD NOT fork baseline behaviour merely to alter colour, spacing, or radius.

Visual differences belong primarily in:

- tokens;
- CVA recipes;
- Tailwind classes.

---

# 2.61 Radix baseline

Where shadcn uses Radix, Radix SHOULD remain the semantic/behavioural primitive.

Do NOT reimplement:

- roving focus;
- escape handling;
- focus return;
- dismissable layers;
- tab semantics;
- menu keyboard navigation

solely to avoid the dependency.

Extend the appearance before replacing battle-tested interaction behaviour.

---

# 2.62 `data-*` state attributes

Radix exposes stable state attributes such as:

```text
data-state
data-disabled
data-orientation
```

For example, Radix Tabs exposes:

```text
data-state="active|inactive"
data-disabled
data-orientation
```

on relevant parts.  
https://www.radix-ui.com/primitives/docs/components/tabs

These attributes SHOULD be used as styling hooks rather than duplicating internal component state.

Example:

```tsx
className="
  data-[state=active]:bg-selected
  data-[state=active]:text-selected-foreground
  data-[disabled]:opacity-50
"
```

---

# 2.63 `data-slot`

Shared components SHOULD expose stable `data-slot` identifiers where useful for:

- diagnostics;
- styling compound descendants;
- visual testing;
- internal design-system tooling.

Example:

```html
<button data-slot="button">
```

`data-slot` MUST describe the semantic component part, not implementation order.

---

# 2.64 CVA contract

CVA SHOULD own finite visual variants.

CVA supports:

- variants;
- boolean variants;
- compound variants;
- default variants.

https://cva.style/getting-started/variants/

Example:

```ts
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-medium",
    "focus-visible:outline-none",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5",
      },
      tone: {
        neutral: "",
        brand: "",
        danger: "",
      },
      emphasis: {
        primary: "",
        secondary: "",
        tertiary: "",
        ghost: "",
        link: "",
      },
    },
    compoundVariants: [
      {
        tone: "danger",
        emphasis: "primary",
        className:
          "bg-danger text-danger-foreground",
      },
    ],
    defaultVariants: {
      size: "md",
      tone: "brand",
      emphasis: "primary",
    },
  },
);
```

---

# 2.65 Compound variants

Compound variants SHOULD handle interactions between independent semantic axes.

Example:

```text
danger × primary
brand × ghost
neutral × tertiary
```

Do NOT create combined public variant names such as:

```text
dangerPrimary
brandGhost
neutralOutlineSmall
```

when independent axes express the model more accurately.

---

# 2.66 Tailwind class contract

Tailwind classes MUST be centralized in:

- component variant definitions;
- shared slot recipes;
- token mappings.

Consumers SHOULD NOT need to repeat component internals.

Bad:

```tsx
<Button
  className="
    bg-blue-600
    hover:bg-blue-700
    rounded-md
    text-white
  "
>
```

for routine usage.

Good:

```tsx
<Button>
```

or:

```tsx
<Button
  tone="danger"
  emphasis="secondary"
>
```

---

# 2.67 `className` escape hatch

Reusable components MAY expose `className`.

`className` is intended primarily for:

- layout;
- sizing in context;
- exceptional local composition.

Consumers SHOULD NOT use it to redefine:

- disabled state;
- focus ring;
- semantic error colour;
- component anatomy;
- interaction semantics.

A repeated `className` override SHOULD trigger review for a missing variant or token.

---

# 2.68 Class merge

Shared Tailwind components SHOULD use a canonical class-merge helper such as:

```ts
cn(...)
```

which combines conditional class assembly and Tailwind-aware conflict resolution where the project has standardized that approach.

Call sites MUST NOT accumulate multiple competing merge helpers.

---

# 2.69 Accessibility baseline

Every interactive component MUST define:

- role/native element;
- accessible name;
- keyboard interaction;
- focus behaviour;
- disabled semantics;
- applicable state attributes;
- target geometry.

Native HTML MUST be preferred where it provides the required semantics.

ARIA MUST supplement semantics, not recreate HTML unnecessarily.

---

# 2.70 Keyboard interaction matrix

| Component | Keyboard contract |
|---|---|
| Button | `Enter` and `Space` activate |
| Link | `Enter` follows link |
| Icon Button | Same as Button |
| Split Button | Each portion separately focusable; menu portion follows menu-button pattern |
| Toggle Button | `Enter`/`Space` toggle pressed state |
| Switch | `Space` toggles; implementation MAY support Enter per underlying primitive |
| Radio/Segmented | Arrow keys move selection/focus per radio pattern |
| Tabs | Arrow keys move tabs; `Enter`/`Space` in manual activation mode |
| Accordion | `Enter`/`Space` expand/collapse |
| Toolbar | Arrow keys move between toolbar controls |
| Removable Tag | Tab to remove button; `Enter`/`Space` removes |
| Draggable item | Keyboard alternative MUST exist for required drag operation |

Button and tab requirements are defined by WAI-ARIA APG.  
https://www.w3.org/WAI/ARIA/apg/patterns/button/  
https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

---

# 2.71 Focus management

Components that open temporary UI MUST define focus movement.

Examples:

```text
Dialog open:
focus moves into dialog

Dialog close:
focus generally returns to opener

Popover/menu close:
focus returns according to interaction context
```

WAI-ARIA explicitly describes context-sensitive focus behaviour after button activation.  
https://www.w3.org/WAI/ARIA/apg/patterns/button/

Radix focus behaviour SHOULD be preserved unless an approved pattern requires modification.

---

# 2.72 Accessible names

Icon-only controls MUST have explicit names.

Visible text SHOULD normally provide the accessible name where possible.

Do NOT add redundant `aria-label` values that conflict with visible button text.

---

# 2.73 ARIA state mapping

| Visual concept | Semantic mechanism |
|---|---|
| Toggle pressed | `aria-pressed` |
| Tab selected | `aria-selected` |
| Disclosure expanded | `aria-expanded` |
| Checkbox/switch checked | `aria-checked` / native checked semantics |
| Invalid input | `aria-invalid` |
| Busy region | `aria-busy` where appropriate |
| Disabled custom control | `aria-disabled` where appropriate |

Do NOT apply generic `aria-selected` to every highlighted element.

---

# 2.74 Target size

Interactive targets MUST satisfy WCAG 2.2 Target Size (Minimum), including applicable spacing and exceptions.  
https://www.w3.org/TR/WCAG22/#target-size-minimum

The design system SHOULD normally target:

```text
compact      ≥ 32px control box
comfortable  ≥ 40px
spacious     ≥ 48px
```

while ensuring any smaller rendered target still satisfies the applicable WCAG requirement.

---

# 2.75 Non-text contrast

Control boundaries, states, and focus indicators MUST satisfy applicable non-text contrast requirements.

Semantic state MUST NOT rely on extremely faint borders that disappear in:

- high contrast;
- low-quality displays;
- bright environments.

https://www.w3.org/TR/WCAG22/#non-text-contrast

---

# 2.76 Button accessibility

Button acceptance requires:

```text
native button when possible
accessible name
Enter
Space
focus-visible
disabled semantics
target size
loading announcement where needed
```

A link styled as a button remains a link if it navigates.

---

# 2.77 Toggle accessibility

Toggle controls MUST expose state programmatically.

Do NOT communicate:

```text
on
off
selected
```

solely through colour.

---

# 2.78 Tabs accessibility

Tabs MUST:

- expose `tablist`, `tab`, and `tabpanel`;
- expose selection state;
- support arrow navigation;
- preserve logical focus;
- label panels.

These requirements align with WAI-ARIA APG.  
https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

---

# 2.79 Accordion accessibility

Accordion trigger MUST:

- be keyboard operable;
- expose expanded state;
- remain associated with its content.

WAI-ARIA specifies `Enter`/`Space` activation and `aria-expanded` on the trigger.  
https://www.w3.org/WAI/ARIA/apg/patterns/accordion/

---

# 2.80 Toolbar accessibility

Toolbars with many controls SHOULD use roving keyboard focus.

The toolbar MUST have an accessible label when necessary to distinguish it from other toolbars.

WAI-ARIA's toolbar guidance specifically describes toolbar-level keyboard navigation.  
https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/

---

# 2.81 Badge accessibility

Badge text MUST remain readable.

Status badges MUST NOT communicate status through background colour alone.

If the text already communicates:

```text
Failed
```

the colour is supplementary.

---

# 2.82 Avatar accessibility

If avatar information is redundant with nearby text:

```html
<img alt="">
```

MAY be appropriate.

If the image contains unique relevant information, provide suitable alternative text.

Avatar fallback initials MUST NOT be treated as globally unique identity.

---

# 2.83 Documentation requirements

Every shared component MUST have documentation covering:

```text
Purpose
Anatomy
Variants
States
Props
Examples
Accessibility
Keyboard interaction
Composition
Do
Don't
```

Documentation SHOULD explain **when not to use** the component.

---

# 2.84 Storybook baseline

Every shared visual component MUST have Storybook coverage.

Storybook's current testing model supports:

- render tests;
- interaction tests;
- accessibility checks;
- visual tests;
- coverage reporting.

https://storybook.js.org/docs/writing-tests

A story is therefore not merely documentation.

It is part of the component's executable contract.

---

# 2.85 Required Storybook states

Applicable components MUST include stories for:

```text
default
all public sizes
all public tones
all public emphasis levels
disabled
loading
error/invalid
selected/checked/pressed
read-only
long content
icon content
RTL where supported
high-density or constrained layout
dark theme
```

Full Cartesian coverage is NOT required where it would create hundreds of redundant stories.

High-risk compound combinations MUST be covered.

---

# 2.86 Visual regression

Visual regression MUST cover:

- default states;
- each visual variant axis;
- compound semantic states;
- focus-visible;
- high-risk responsive states;
- light/dark themes where applicable.

Storybook supports visual testing against accepted visual baselines.  
https://storybook.js.org/docs/writing-tests/visual-testing

A visual diff MUST be reviewed rather than mechanically updated.

---

# 2.87 Interaction tests

Interactive components MUST have browser-level tests for their primary keyboard and pointer behaviour.

Storybook interaction tests render components in the browser and simulate real user interaction through `play` functions.  
https://storybook.js.org/docs/writing-tests/interaction-testing

Representative test:

```ts
export const KeyboardActivation: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", {
      name: "Save changes",
    });

    await userEvent.tab();
    await expect(button).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await expect(onSave).toHaveBeenCalled();
  },
};
```

---

# 2.88 Unit tests

Unit tests SHOULD verify logic that does not require visual browser interaction.

Examples:

- controlled-state transitions;
- prop normalization;
- forbidden combinations;
- token/class selection;
- callback execution;
- loading guards.

Do NOT rely on DOM snapshots as the only form of component testing.

Storybook itself recommends visual or interaction testing for many UI concerns rather than relying exclusively on markup snapshots.  
https://storybook.js.org/docs/writing-tests/snapshot-testing

---

# 2.89 Accessibility tests

Automated accessibility checks MUST run against representative stories.

Automation does not replace manual keyboard and assistive-technology review for complex widgets.

Storybook provides accessibility testing as part of its component-test model.  
https://storybook.js.org/docs/writing-tests/accessibility-testing

---

# 2.90 Do / Don't documentation

Every high-use component SHOULD contain concrete misuse examples.

Example:

### Button

**Do**

```text
Use a button for actions.
```

**Don't**

```text
Use a button for ordinary page navigation.
```

### Badge

**Do**

```text
Use for concise status/category metadata.
```

**Don't**

```text
Add onClick and turn it into an undocumented control.
```

---

# 2.91 Component versioning

Breaking changes include changes to:

- public prop names;
- semantics;
- keyboard behaviour;
- slot structure relied on publicly;
- state attributes documented as stable;
- ref target;
- controlled-state behaviour.

A visual token update is not necessarily an API breaking change.

Removing a semantic capability may be.

---

# 2.92 Security alignment

Component state MUST NOT enforce authorization.

Examples:

```text
hidden button ≠ authorization
disabled button ≠ authorization
read-only UI ≠ API denial
```

Server/API policy remains authoritative.

Component APIs MUST NOT accept untrusted arbitrary HTML or CSS without the controls defined by the Security standard.

---

# 2.93 Data & Database alignment

Generic components MUST NOT fetch domain data themselves unless they are explicitly defined as data-connected composites.

Prefer:

```tsx
<UserSelect
  options={users}
/>
```

over a foundational `Select` that silently calls a user API.

Presentation primitives MUST remain data-source agnostic.

---

# 2.94 API alignment

UI action state SHOULD reflect actual API capability.

A `loading` state MUST correspond to a real in-flight operation.

A disabled action MUST NOT claim an API operation is unavailable if the API would accept it.

Capabilities SHOULD derive from authoritative domain/application state.

---

# 2.95 State Management alignment

Local component state SHOULD remain local.

Examples:

```text
popover open
accordion expanded
temporary hover
uncontrolled toggle
```

Application state SHOULD own values requiring:

- persistence;
- cross-component coordination;
- URL synchronization;
- server authority.

The component library MUST NOT introduce a global store for primitive interaction state.

---

# 2.96 Forms & Validation alignment

Form components MUST preserve native form integration where applicable:

```text
name
value
required
disabled
readOnly
aria-invalid
form association
```

A visual wrapper MUST NOT break browser form behaviour.

Form controls SHOULD integrate with the canonical FormField composition rather than invent local label/error APIs.

---

# 2.97 Design Token alignment

Component classes MUST consume semantic tokens.

Canonical direction:

```text
primitive token
↓
semantic interaction token
↓
component token / CVA recipe
↓
rendered class
```

Do NOT hard-code:

```text
blue-600
red-500
rounded-[13px]
shadow-[...]
```

inside reusable component definitions unless the Design Tokens standard explicitly maps that value.

---

# 2.98 Pattern alignment

Components implement local interaction.

Patterns govern larger workflows.

A `Dialog` component MUST NOT decide:

- whether deletion requires confirmation;
- whether wizard navigation saves state;
- whether authentication is required.

Those are Pattern/domain concerns.

---

# 3. Anti-patterns

## 3.1 Variant explosion

Non-conformant:

```ts
variant:
  "primary"
  "primarySmall"
  "primaryDanger"
  "primaryDangerSmall"
  "secondarySmall"
```

Use orthogonal axes.

---

## 3.2 Boolean soup

Avoid:

```tsx
<Button
  primary
  danger
  outlined
  compact
  rounded
/>
```

when those booleans can contradict one another.

Use explicit finite axes.

---

## 3.3 CSS-state props

Do NOT expose:

```tsx
hovered
focused
active
```

as ordinary production props.

Transient visual state MUST come from actual interaction.

---

## 3.4 Generic selected prop

Do NOT use one universal:

```tsx
selected
```

across buttons, switches, checkboxes, tabs, accordions, and disclosure controls.

Use the semantic state appropriate to the widget.

---

## 3.5 Styling a div into a button

Do NOT recreate button behaviour on:

```html
<div>
<span>
```

when `<button>` can be used.

---

## 3.6 Link/button inversion

Do NOT use a button for page navigation or a link for command execution merely to obtain a preferred style.

---

## 3.7 `asChild` semantic erasure

Do NOT use polymorphism to produce a visually correct but semantically invalid component.

---

## 3.8 Forking Radix for visual changes

Do NOT rewrite focus management, keyboard navigation, or open/close semantics because the default class structure is inconvenient.

Change visual styling first.

---

## 3.9 Forking shadcn for colour

Do NOT create:

```text
ButtonCorporate
ButtonAdmin
ButtonGreen
ButtonBlue
```

when tokens/variants solve the requirement.

---

## 3.10 Tailwind leakage

Consumers SHOULD NOT need intimate knowledge of internal Tailwind recipes to render standard states.

---

## 3.11 `!important` escalation

Reusable component styles MUST NOT resolve routine conflicts through repeated `!important`.

Fix variant ownership or specificity architecture.

---

## 3.12 Invisible focus

Hover styling MUST NOT exist without equivalent visible keyboard focus.

---

## 3.13 Disabled opacity everywhere

Read-only, unavailable, pending, stale, and unauthorized states MUST NOT all be represented using:

```css
opacity: .5;
```

They are different semantics.

---

## 3.14 Spinner replacing identity

Loading MUST NOT turn:

```text
Delete account
```

into an unlabeled spinner with no remaining accessible action identity.

---

## 3.15 Cardification

A border and radius do not make every content grouping a new component.

---

## 3.16 Clickable badge

A Badge with `onClick` is almost always another component being disguised.

---

## 3.17 Interactive card nesting

Do NOT wrap a Card in a button when it also contains:

- links;
- menu buttons;
- checkboxes;
- secondary actions.

---

## 3.18 Accordion for everything

Do NOT hide information behind disclosure merely to shorten the page.

---

## 3.19 Tabs as routing camouflage

Do NOT use tabs for unrelated application destinations simply because a horizontal tab bar looks compact.

---

## 3.20 Storybook happy-path only

One default story is not sufficient coverage for a stateful shared component.

---

## 3.21 Snapshot-only testing

Rendered-markup snapshots MUST NOT substitute for interaction, accessibility, or visual-regression testing.

---

## 3.22 Unbounded `className` customization

If every consumer must override:

```text
padding
colour
focus
radius
state
```

the component contract has failed.

---

## 3.23 Public DOM dependency

Consumers MUST NOT depend on undocumented internal selectors such as:

```css
.component > div:nth-child(2) > span
```

Expose semantic slots instead.

---

# 4. Acceptance Checklist

# 4.1 Universal component acceptance

Every shared component MUST pass the following before release.

### Contract

- [ ] Purpose is documented.
- [ ] Anatomy is documented.
- [ ] Root is identified.
- [ ] Public slots are intentional.
- [ ] Props are semantic.
- [ ] Defaults are intentional.
- [ ] Forbidden combinations are prevented or documented.
- [ ] Variant axes are orthogonal.

### State

- [ ] Default is defined.
- [ ] Hover is defined where relevant.
- [ ] Focus-visible is defined.
- [ ] Active is defined where relevant.
- [ ] Selected/checked/pressed state is semantically correct.
- [ ] Disabled is defined.
- [ ] Loading is defined where relevant.
- [ ] Error/invalid is defined where relevant.
- [ ] Read-only is distinct from disabled.
- [ ] Dragging has non-drag alternative where required.

### Accessibility

- [ ] Correct native element/role is used.
- [ ] Accessible name exists.
- [ ] Keyboard contract is tested.
- [ ] Focus behaviour is tested.
- [ ] Applicable ARIA state is exposed.
- [ ] Colour is not sole state indicator.
- [ ] Target sizing passes.
- [ ] Focus is not obscured.

### Composition

- [ ] Polymorphism preserves semantics.
- [ ] Slots are preferred over prop explosion.
- [ ] Controlled mode works.
- [ ] Uncontrolled mode works where offered.
- [ ] Ref reaches documented underlying element.
- [ ] `className` escape hatch does not replace variants.

### Implementation

- [ ] shadcn/Radix primitive is used where appropriate.
- [ ] CVA owns finite visual variants.
- [ ] `data-*` state hooks are used where available.
- [ ] Design Tokens drive styling.
- [ ] No arbitrary colour/radius/shadow system was introduced.

### Testing

- [ ] Storybook stories exist.
- [ ] Public variants are represented.
- [ ] Critical states are represented.
- [ ] Interaction tests pass.
- [ ] Automated accessibility tests pass.
- [ ] Visual regression baseline exists where appropriate.
- [ ] Unit tests cover component logic.
- [ ] Do/Don't guidance exists.

---

# 4.2 Button acceptance

- [ ] Uses native `<button>` for command actions.
- [ ] `type` behaviour is intentional.
- [ ] `Enter` activates.
- [ ] `Space` activates.
- [ ] Primary/secondary/tertiary hierarchy is documented.
- [ ] Danger is semantic tone.
- [ ] Loading preserves action identity.
- [ ] Disabled prevents activation.
- [ ] Focus-visible passes.
- [ ] Icons do not replace required label without an accessible name.

WAI-ARIA Button reference:  
https://www.w3.org/WAI/ARIA/apg/patterns/button/

---

# 4.3 Icon Button acceptance

- [ ] Accessible name is mandatory.
- [ ] Icon is visually centred.
- [ ] Target size passes.
- [ ] Tooltip is optional supplemental help, not the accessible-name mechanism.
- [ ] Focus ring remains visible.
- [ ] Destructive icon actions expose consequence clearly.

---

# 4.4 Split Button acceptance

- [ ] Primary and menu actions are separate controls.
- [ ] Both controls are keyboard reachable.
- [ ] Primary action remains identifiable.
- [ ] Menu trigger exposes correct popup semantics.
- [ ] Menu focus/escape behaviour follows the menu pattern.
- [ ] Visual grouping does not erase separate interaction boundaries.

---

# 4.5 Toggle / Switch acceptance

- [ ] Binary behaviour is appropriate.
- [ ] Programmatic checked/pressed state exists.
- [ ] Label remains understandable in both states.
- [ ] State is not colour-only.
- [ ] Keyboard activation works.
- [ ] Disabled state is defined.

WAI-ARIA Switch reference:  
https://www.w3.org/WAI/ARIA/apg/patterns/switch/

---

# 4.6 Segmented Control acceptance

- [ ] Mutual exclusivity is explicit.
- [ ] Radio-group semantics are used for single selection.
- [ ] Arrow-key navigation works.
- [ ] Current selection is programmatic.
- [ ] Focus indication remains distinct from selection.
- [ ] Multi-select uses a different semantic primitive.

---

# 4.7 Tabs acceptance

- [ ] `tablist`, `tab`, and `tabpanel` semantics exist.
- [ ] Active tab exposes selected state.
- [ ] Arrow keys work.
- [ ] Activation mode is intentional.
- [ ] Automatic activation introduces no material latency.
- [ ] Each panel is associated with its tab.
- [ ] Focus remains predictable.

WAI-ARIA Tabs reference:  
https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

---

# 4.8 Card acceptance

- [ ] Static vs interactive role is explicit.
- [ ] Card is not made focusable without interaction.
- [ ] Heading structure is appropriate.
- [ ] Nested controls remain valid.
- [ ] Entire-card navigation uses link semantics.
- [ ] Card variants do not become arbitrary decoration.

---

# 4.9 List Item acceptance

- [ ] Parent list semantics are preserved.
- [ ] Selection semantics exist only when list actually supports selection.
- [ ] Interactive descendants remain separately operable.
- [ ] Long content wraps correctly.
- [ ] Leading/trailing slots have defined alignment.
- [ ] Density variant remains accessible.

---

# 4.10 Accordion acceptance

- [ ] Trigger is a button.
- [ ] Expanded state is exposed.
- [ ] `Enter` works.
- [ ] `Space` works.
- [ ] Heading hierarchy is maintained.
- [ ] Content association is correct.
- [ ] Open/close animation respects reduced-motion rules.

WAI-ARIA Accordion reference:  
https://www.w3.org/WAI/ARIA/apg/patterns/accordion/

---

# 4.11 Panel acceptance

- [ ] Purpose is clear.
- [ ] Landmark role is added only when semantically useful.
- [ ] Scroll ownership is explicit.
- [ ] Collapsible/resizable behaviour uses appropriate primitive.
- [ ] Focus is preserved when panel changes state.
- [ ] Panel state does not hide unauthorized data.

---

# 4.12 Toolbar acceptance

- [ ] Controls are meaningfully related.
- [ ] Toolbar is labelled when necessary.
- [ ] Arrow-key navigation works where toolbar semantics are used.
- [ ] Tab sequence is not needlessly inflated.
- [ ] Toggle/radio controls retain their own semantics inside toolbar.
- [ ] Disabled and selected states remain distinguishable.

WAI-ARIA Toolbar reference:  
https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/

---

# 4.13 Badge acceptance

- [ ] Non-interactive by default.
- [ ] Short readable label.
- [ ] Status remains understandable without colour.
- [ ] Tone comes from semantic status tokens.
- [ ] Long prose is not placed inside Badge.
- [ ] Click behaviour has not been added.

---

# 4.14 Avatar acceptance

- [ ] Image/fallback behaviour exists.
- [ ] Alt behaviour avoids duplicate nearby identity.
- [ ] Initials are not treated as unique identifier.
- [ ] Shape follows Avatar/Corporate Visual standard.
- [ ] Broken images fall back safely.
- [ ] Generated portraits are not represented as authentic people.

---

# 4.15 Tag acceptance

- [ ] Tag represents real metadata/category.
- [ ] Removable state is explicit.
- [ ] Remove control is separately focusable.
- [ ] Remove control has contextual accessible name.
- [ ] Tag is not overloaded as navigation, filter, status and delete control simultaneously.
- [ ] Keyboard removal works through the button semantics.

---

# 5. Canonical Summary

The Component Design & Variant Contract follows this hierarchy:

```text
native semantics
+
WAI-ARIA interaction contract
        ↓
Radix primitive
        ↓
shadcn/ui implementation baseline
        ↓
Design Tokens
        ↓
CVA variant recipe
        ↓
Gold Standard component API
        ↓
application composition
```

The canonical variant model is:

```text
size
×
tone
×
emphasis
×
runtime state
```

The governing rules are:

```text
Props express meaning.
Classes express implementation.

Use semantic variant axes,
not combined variant names.

State is not one generic property.

hover ≠ active
active ≠ selected
selected ≠ checked
checked ≠ pressed
pressed ≠ expanded

Transient interaction states
must come from real interaction.

Use native HTML first.

A button acts.
A link navigates.

Danger is a tone.
Primary is emphasis.

Do not fork accessible behaviour
to achieve visual differences.

Use Radix data-state hooks
instead of duplicating internal state.

Use CVA for finite visual variants.

Use Design Tokens for colour,
spacing, radius, elevation and focus.

Use compound components
when structural relationships matter.

Use slots for meaningful composition.
Use props for configuration.

Controlled and uncontrolled state
must have predictable contracts.

Refs must reach the documented DOM primitive.
React 19 uses ref as a prop;
forwardRef is compatibility, not doctrine.

Accessibility is part of the component API.

Storybook stories are executable specification.

Test:
appearance,
interaction,
accessibility,
and state —
not just markup.
```

A **Gold Standard 2026** component MUST be understandable from four perspectives:

```text
Designer:
What visual and semantic choices exist?

Developer:
What is the stable TypeScript API?

User:
How does it behave with mouse, touch and keyboard?

Tester:
Which observable states and guarantees must never regress?
```

If those four views describe different components, the contract is incomplete.

---

# 6. Sources

1. **W3C WAI — ARIA Authoring Practices Guide: Patterns**  
   https://www.w3.org/WAI/ARIA/apg/patterns/

2. **W3C WAI — Button Pattern**  
   https://www.w3.org/WAI/ARIA/apg/patterns/button/

3. **W3C WAI — Tabs Pattern**  
   https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

4. **W3C WAI — Accordion Pattern**  
   https://www.w3.org/WAI/ARIA/apg/patterns/accordion/

5. **W3C WAI — Switch Pattern**  
   https://www.w3.org/WAI/ARIA/apg/patterns/switch/

6. **W3C WAI — Toolbar Pattern**  
   https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/

7. **W3C WAI — Radio Group Pattern**  
   https://www.w3.org/WAI/ARIA/apg/patterns/radio/

8. **W3C — Web Content Accessibility Guidelines (WCAG) 2.2**  
   https://www.w3.org/TR/WCAG22/

9. **Radix Primitives — Composition**  
   https://www.radix-ui.com/primitives/docs/guides/composition

10. **Radix Primitives — Tabs**  
    https://www.radix-ui.com/primitives/docs/components/tabs

11. **Radix Primitives — Accordion**  
    https://www.radix-ui.com/primitives/docs/components/accordion

12. **Radix Primitives — Toolbar**  
    https://www.radix-ui.com/primitives/docs/components/toolbar

13. **shadcn/ui — Button**  
    https://ui.shadcn.com/docs/components/base/button

14. **Class Variance Authority — Variants**  
    https://cva.style/getting-started/variants/

15. **React — `forwardRef`**  
    https://react.dev/reference/react/forwardRef

16. **React 19 — `ref` as a prop**  
    https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop

17. **React — `useImperativeHandle`**  
    https://react.dev/reference/react/useImperativeHandle

18. **Storybook — Testing UI Components**  
    https://storybook.js.org/docs/writing-tests

19. **Storybook — Interaction Testing**  
    https://storybook.js.org/docs/writing-tests/interaction-testing

20. **Storybook — Accessibility Testing**  
    https://storybook.js.org/docs/writing-tests/accessibility-testing

21. **Storybook — Visual Testing**  
    https://storybook.js.org/docs/writing-tests/visual-testing

22. **Storybook — Snapshot Testing**  
    https://storybook.js.org/docs/writing-tests/snapshot-testing

23. **IBM Carbon Design System — Button Usage**  
    https://carbondesignsystem.com/components/button/usage/

A particularly important 2026 change in this version is the separation of **semantic variant axes from runtime state**, plus the React 19 ref contract. That avoids two increasingly common sources of design-system drift: APIs such as `variant="dangerOutlineSmall"` and obsolete blanket requirements to wrap every primitive in `forwardRef`.
