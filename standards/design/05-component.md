---
id: "component"
title: "Component Guidelines — Gold Standard 2026"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "component"]
applies_to: ["ui"]
related: ["forms-validation", "dependency", "internationalization"]
legacy_number: 39
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 81267
provenance: baseline

---

Canonical placement: **Design Tokens → Layout → Facade → Components → Forms → Patterns → Accessibility**. This standard owns reusable UI primitives and their interaction contracts; Forms owns form workflows, while Patterns owns multi-component compositions.

# Component Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for reusable interface components, including:

- Button;
- Icon Button;
- Input;
- Textarea;
- Label;
- Field;
- Checkbox;
- Radio Group;
- Switch;
- Native Select;
- Select;
- Combobox;
- Autocomplete;
- Command Palette;
- Dialog;
- Alert Dialog;
- Sheet;
- Drawer;
- Popover;
- Dropdown Menu;
- Context Menu;
- Tooltip;
- Tabs;
- Table;
- Data Table;
- Data Grid;
- Toast;
- Alert;
- Badge;
- Calendar;
- Date Picker;
- Pagination;
- Accordion;
- Collapsible;
- Toggle;
- Toggle Group;
- Slider;
- Progress;
- Spinner;
- Skeleton;
- Avatar;
- Breadcrumb;
- Navigation Menu;
- Separator;
- Scroll Area;
- Empty-state primitives;
- component anatomy;
- variants;
- sizes;
- states;
- keyboard interaction;
- focus;
- semantics;
- accessible names;
- ARIA;
- responsive behavior;
- localization;
- theming;
- composition;
- testing;
- governance.

The objective is to make components:

```text
Predictable
Accessible
Composable
Semantic
Token-driven
Consistent
Themeable
Keyboard-operable
Localization-ready
Maintainable
```

The core principle is:

> **A component is a reusable interaction contract, not merely reusable styling.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
Component
Affected behavior
Accessibility impact
Design-system impact
Owner
Review date
```

---

# 3. Component Hierarchy

The canonical hierarchy is:

```text
Native platform semantics
↓
shadcn/ui / approved primitive implementation
↓
Product Design System component
↓
Domain component
↓
Feature composition
```

---

# 4. shadcn/ui Position

For the canonical web stack:

> **shadcn/ui is the primary implementation layer for supported primitives, not the complete design system.**

Use:

```text
shadcn primitive
+
canonical tokens
+
organization variants
+
organization accessibility rules
=
product component
```

---

# 5. Use shadcn First

For a component already provided by the approved shadcn/ui stack:

```text
Use it
↓
Configure it
↓
Extend it carefully
↓
Create a new primitive only when necessary
```

---

# 6. Do Not Fork Casually

Do not copy a shadcn component into multiple feature directories and independently modify each copy.

Shared changes belong in the canonical component layer.

---

# 7. Component Selection Principle

Before creating a component ask:

```text
Does native HTML already solve this?
Does the Design System already solve this?
Does shadcn already provide the primitive?
Can existing primitives compose the behavior?
Is a new reusable abstraction actually necessary?
```

---

# 8. Native HTML First

Prefer native semantic elements whenever they provide the required behavior.

Examples:

```text
<button>
<input>
<textarea>
<select>
<table>
<details>
<a>
```

Native semantics generally provide:

```text
keyboard behavior
focus
form integration
accessibility semantics
browser interoperability
```

for free.

---

# 9. ARIA Does Not Replace HTML

Do not replace:

```text
<button>
```

with:

```text
<div role="button">
```

without a genuine technical requirement.

---

# 10. ARIA Responsibility

Once a component implements a non-native ARIA widget, engineering owns:

```text
role
state
keyboard interaction
focus management
accessible naming
disabled behavior
selection behavior
```

explicitly.

---

# 11. Component Contract

Every stable component SHOULD define:

```text
Purpose
Anatomy
Props/API
Variants
Sizes
States
Keyboard model
Accessibility semantics
Content rules
Responsive behavior
Theming
Composition rules
```

---

# 12. Component Anatomy

An anatomy describes named internal parts.

Example:

```text
Dialog
├─ Trigger
├─ Overlay
├─ Content
├─ Header
├─ Title
├─ Description
├─ Body
├─ Footer
└─ Close
```

---

# 13. Anatomy Must Be Stable

Consumers SHOULD depend on stable public component parts, not private DOM structure.

---

# 14. Public vs Private Parts

A component MAY internally contain implementation elements.

Do not expose every internal node merely because it exists.

---

# 15. Components Are Behavioral

Two controls that look identical may be different components if their interaction semantics differ.

Example:

```text
Button
≠
Link
```

---

# 16. Component State Model

Components SHOULD explicitly consider applicable states:

```text
default
hover
focus-visible
active/pressed
selected
checked
expanded
disabled
readonly
loading
invalid
success
open
closed
```

Not every component needs every state.

---

# 17. State ≠ Variant

These are different:

```text
variant = destructive
state = disabled
```

---

# 18. Variant

A variant represents a stable semantic presentation/use.

Examples:

```text
primary
secondary
outline
ghost
destructive
```

---

# 19. State

A state represents temporary component condition.

Examples:

```text
hover
focus
disabled
loading
selected
```

---

# 20. Variant Count

Variants SHOULD remain intentionally small.

A component with:

```text
17 appearance variants
```

usually indicates unclear semantics or excessive component responsibility.

---

# 21. Size Variants

Size variants SHOULD map to legitimate density/interaction needs.

Typical:

```text
sm
md
lg
```

Do not create size variants for arbitrary one-off screens.

---

# 22. Default Size

Every component SHOULD have one canonical default size.

---

# 23. Token Consumption

Components MUST consume Design Tokens.

Feature components SHOULD NOT introduce arbitrary:

```text
colors
spacing
radius
shadow
motion
```

inside foundational components.

---

# 24. Semantic Color

Component states SHOULD consume semantic tokens.

Example:

```text
button.primary.background
→ color.action.primary
```

---

# 25. Dark Mode

Component code SHOULD NOT separately redesign itself for dark mode when semantic tokens can handle the change.

---

# 26. Focus

Every interactive component MUST have a visible keyboard focus state.

---

# 27. Focus vs Hover

Focus and hover MUST NOT be treated as the same state.

---

# 28. Never Remove Focus Without Replacement

Avoid:

```css
outline: none;
```

unless an equally visible accessible focus treatment replaces it.

---

# 29. Focus Obscuration

Sticky headers, overlays, popovers, and other authored content MUST NOT completely hide the focused component.

---

# 30. Focus Order

Keyboard focus order MUST follow logical interaction order.

Do not manipulate positive `tabindex` values to force layout order.

---

# 31. Positive Tabindex

Avoid:

```text
tabindex="1"
tabindex="2"
```

Use DOM order and widget-specific roving focus instead.

---

# 32. Touch Targets

Component hit targets MUST satisfy the Accessibility standard.

Visual dimensions and hit-target dimensions MAY differ.

---

# 33. Pointer Is Not Enough

Any interaction available by mouse/pointer MUST also be available through an appropriate keyboard interaction unless the task is inherently pointer-based.

---

# 34. Accessible Name

Every interactive component MUST have an accessible name.

---

# 35. Visible Name

Where a visible label exists, the accessible name SHOULD contain and normally match that visible label.

---

# 36. Icon-Only Control

An icon-only control MUST have an accessible name.

Example:

```text
visible:
[trash icon]

accessible name:
Delete project
```

---

# 37. Title Attribute

`title` alone SHOULD NOT be used as the primary accessible naming mechanism.

---

# 38. Disabled vs Readonly

`disabled` and `readonly` are distinct.

```text
disabled
→ cannot interact/change

readonly
→ value is available/focusable as appropriate but cannot be edited
```

Do not use them interchangeably.

---

# 39. Disabled Semantics

Disabled controls SHOULD use the platform/component's true disabled semantics where possible.

---

# 40. `aria-disabled`

`aria-disabled="true"` communicates state but does not automatically disable behavior.

If used, code MUST also prevent the action.

---

# 41. Loading State

A loading component SHOULD:

```text
prevent duplicate actions where needed
preserve understandable label/context
communicate progress state where useful
```

---

# 42. Loading Is Not Disabled

A loading action MAY temporarily become non-interactive, but loading and permanently disabled are semantically different states.

---

# 43. Loading Label

Prefer preserving meaning.

Example:

```text
Save changes
→ Saving…
```

rather than replacing the button with an unlabeled spinner.

---

# 44. Layout Stability

Loading indicators SHOULD avoid unnecessary component-size changes.

---

# 45. Errors

Components that expose validation/error state MUST provide semantic state in addition to visual styling.

---

# 46. Invalid State

Form controls MAY use:

```text
aria-invalid="true"
```

where applicable.

Error text SHOULD be programmatically associated.

---

# 47. Required State

Required fields MUST expose required semantics.

---

# 48. Content Rules

Component APIs SHOULD support good UX writing by construction.

Example:

```text
Button
→ short action phrase

DialogTitle
→ clear task/question

Badge
→ short state
```

---

# 49. Localization

Components MUST support translated content expansion.

---

# 50. No English-Sized Controls

Avoid fixed-width buttons, tabs, or menu items designed around one English label.

---

# 51. RTL

Components MUST use logical layout concepts where RTL is supported.

---

# 52. Leading/Trailing

Prefer:

```text
leading icon
trailing icon
```

over:

```text
left icon
right icon
```

for direction-sensitive component APIs.

---

# 53. Responsive Composition

Components MAY recompose responsively.

Do not merely shrink every component indefinitely.

---

# 54. Container Queries

Reusable components whose behavior depends on available local width SHOULD consider container queries.

---

# 55. Controlled vs Uncontrolled APIs

Interactive components MAY support:

```text
controlled state
uncontrolled/default state
```

where the underlying primitive supports both.

---

# 56. Avoid Conflicting Control

A component MUST NOT simultaneously treat:

```text
value
```

and:

```text
defaultValue
```

as competing sources of truth.

---

# 57. Event APIs

Event callbacks SHOULD describe user/domain interaction.

Examples:

```text
onOpenChange
onValueChange
onCheckedChange
```

Prefer established primitive conventions.

---

# 58. Do Not Leak DOM Internals

Avoid component APIs that require consumers to understand internal implementation selectors.

---

# 59. Composition

Prefer component composition over giant configuration objects.

---

# 60. Escape Hatches

Escape hatches such as:

```text
className
asChild
render props
```

MAY be supported when necessary.

They MUST NOT make normal component usage dependent on rewriting internals.

---

# 61. `asChild`

Polymorphic composition MUST preserve correct semantics.

Do not render:

```text
<Button asChild>
  <div>...</div>
</Button>
```

and accidentally remove button semantics.

---

# 62. Button

A Button performs an action.

Examples:

```text
Save
Delete
Open dialog
Start upload
```

A navigation action is normally a Link.

---

# 63. Button Anatomy

```text
Button
├─ LeadingIcon?
├─ Label
├─ TrailingIcon?
└─ Spinner?
```

---

# 64. Button Variants

Canonical variants SHOULD remain small.

Recommended conceptual set:

```text
primary/default
secondary
outline
ghost
destructive
link-like only where justified
```

---

# 65. Button Hierarchy

A surface SHOULD usually have one visually dominant primary action.

---

# 66. Button Label

Button copy MUST describe the action.

Prefer:

```text
Save changes
Create project
Delete account
```

over:

```text
OK
Submit
Proceed
```

---

# 67. Native Button

Use native `<button>` semantics wherever possible.

---

# 68. Button Type

Inside forms, explicitly manage:

```text
type="button"
type="submit"
type="reset"
```

Do not accidentally submit forms because button type was unspecified.

---

# 69. Button Keyboard

Buttons MUST activate through expected native keyboard behavior, including:

```text
Enter
Space
```

---

# 70. Button Disabled

Disabled buttons SHOULD NOT trigger their action.

---

# 71. Why Disabled?

Do not disable an important primary action without making the reason understandable when users can reasonably correct it.

---

# 72. Loading Button

During an idempotency-sensitive submission:

```text
activate
↓
pending/loading
↓
prevent duplicate submit
↓
success/error
```

---

# 73. Toggle Button

A persistent two-state button MAY use toggle semantics.

If using `aria-pressed`, state MUST remain accurately synchronized.

---

# 74. Toggle Label

When `aria-pressed` represents the state, keep the semantic button label stable.

Example:

```text
Mute
pressed=true
```

rather than changing both label and pressed semantics inconsistently.

---

# 75. Icon Button

An Icon Button is a Button whose visible content is primarily an icon.

---

# 76. Icon Button Name

Every Icon Button MUST have an accessible name.

---

# 77. Icon Ambiguity

Use Tooltip where an icon's action may not be obvious.

Tooltip does not replace the accessible name.

---

# 78. Icon Button Target

Icon Buttons MUST maintain adequate hit target size even if the icon itself is small.

---

# 79. Link

Use a link for navigation to another:

```text
URL
route
document
location
```

---

# 80. Button vs Link

Rule:

```text
Changes state / performs action
→ Button

Navigates
→ Link
```

Styling does not determine semantics.

---

# 81. Input

Text Input captures short free-form textual data.

---

# 82. Input Anatomy

```text
Field
├─ Label
├─ Input
├─ Description?
└─ Error?
```

The Field abstraction MAY own the complete relationship.

---

# 83. Visible Label

Inputs SHOULD have visible labels.

Placeholder MUST NOT be the only label.

---

# 84. Native Input Type

Use the most appropriate native type where beneficial:

```text
email
password
search
tel
url
number
date
```

subject to Forms Guidelines and browser UX requirements.

---

# 85. Input Autocomplete

Use appropriate `autocomplete` values for supported personal/account fields.

---

# 86. Input Mode

`inputmode` MAY improve virtual keyboard behavior.

It does not replace server validation.

---

# 87. Input Placeholder

Placeholder SHOULD be:

```text
example
format hint
```

rather than an essential instruction.

---

# 88. Input Invalid

Invalid state SHOULD include:

```text
visual indication
aria-invalid where appropriate
associated error text
```

---

# 89. Input Disabled

Use disabled only when the field truly cannot be interacted with.

---

# 90. Input Readonly

Readonly is preferable when users need to:

```text
focus
select
copy
```

a value they cannot edit.

---

# 91. Input Prefix/Suffix

Visual prefixes/suffixes such as:

```text
$
kg
https://
```

must not obscure the actual field value semantics.

---

# 92. Password Input

Password fields SHOULD support appropriate:

```text
autocomplete
show/hide password
password manager behavior
```

according to Authentication Guidelines.

---

# 93. Clear Button

A clearable input SHOULD have an accessible clear action.

---

# 94. Search Input

A search field SHOULD be labeled by purpose.

Example:

```text
Search projects
```

not merely:

```text
Search
```

when multiple search scopes can exist.

---

# 95. Textarea

Textarea is for multi-line free-form text.

It follows Input label/error rules.

---

# 96. Textarea Resize

Do not disable user resize unless layout requirements genuinely require it.

---

# 97. Character Count

Character counts SHOULD only appear where a meaningful limit exists.

---

# 98. Checkbox

Checkbox represents independent binary selection.

---

# 99. Checkbox Label

The entire visible label area SHOULD usually activate the checkbox.

---

# 100. Checkbox Group

A group of related checkboxes SHOULD have a group label where the relationship matters.

---

# 101. Indeterminate Checkbox

A tri-state parent checkbox MAY visually/programmatically represent partial selection.

Indeterminate is not the same as checked.

---

# 102. Radio Group

Radio Group represents mutually exclusive choices where one choice from a small set is selected.

---

# 103. Radio Labels

Each option MUST have a clear label.

The group MUST have a group label.

---

# 104. Radio vs Select

Prefer Radio Group when:

```text
options are few
options should remain visible
comparison matters
```

Prefer Select when compactness matters and options are straightforward.

---

# 105. Switch

Switch represents immediate binary on/off state.

---

# 106. Switch vs Checkbox

Use Switch when toggling a persistent setting or feature state immediately.

Use Checkbox when selecting values in a form or multi-selection group.

---

# 107. Switch Label

The label SHOULD describe the controlled setting.

Good:

```text
Email notifications [switch]
```

Avoid:

```text
Enable email notifications [switch]
```

when redundant.

---

# 108. Switch State

The visual and programmatic checked state MUST remain synchronized.

---

# 109. Select

A Select allows choosing one value from a predefined list.

---

# 110. Native Select First

Prefer native `<select>` when it provides sufficient product behavior.

Advantages include:

```text
platform accessibility
mobile-native UI
keyboard behavior
form integration
lower complexity
```

---

# 111. Custom Select

Use a custom Select when requirements justify behavior native Select cannot provide consistently.

---

# 112. Select Is Not Combobox

A Select is primarily selection.

A Combobox provides an input associated with a popup and may support typing/filtering.

Do not use the terms interchangeably.

---

# 113. Select Anatomy

```text
Select
├─ Label
├─ Trigger
│  ├─ Value
│  └─ Indicator
└─ Popup
   ├─ Group?
   ├─ Label?
   ├─ Option
   └─ Separator?
```

---

# 114. Select Placeholder

Use placeholder such as:

```text
Select a country
```

only before a real value has been chosen.

---

# 115. Select Option

An option SHOULD represent a selectable value—not a nested mini-interface.

---

# 116. Interactive Controls Inside Options

Do not place:

```text
buttons
checkboxes
links
menus
```

inside ordinary listbox options unless using a different accessible composite pattern.

---

# 117. Select Keyboard

Custom Select MUST implement the keyboard model of its underlying approved primitive/pattern.

---

# 118. Select Typeahead

Typeahead MAY allow jumping to options by typing characters.

---

# 119. Select Disabled Option

Disabled options SHOULD be clearly unavailable and skipped appropriately during interaction.

---

# 120. Combobox

A Combobox is an input associated with a popup of values or suggestions.

---

# 121. Combobox Use

Use when users benefit from:

```text
typing
filtering
autocomplete
large option sets
```

---

# 122. Combobox Anatomy

```text
Combobox
├─ Label
├─ Input / Trigger
├─ Clear?
├─ OpenButton?
└─ Popup
   ├─ Listbox/Grid
   ├─ Option/Row
   ├─ Empty state
   └─ Loading state
```

---

# 123. Editable Combobox

An editable Combobox MUST distinguish:

```text
text input
current option
selected value
popup state
```

---

# 124. Combobox Accessible State

The component implementation SHOULD correctly manage relevant states such as:

```text
aria-expanded
aria-controls
aria-activedescendant
aria-autocomplete
```

according to its interaction pattern.

---

# 125. Combobox Focus

Focus commonly remains in the text input while visual focus moves through popup suggestions using active-descendant semantics.

Do not invent another keyboard model casually.

---

# 126. Combobox Arrow Keys

Arrow keys SHOULD navigate popup options according to the chosen accessible pattern.

---

# 127. Combobox Enter

`Enter` SHOULD choose the active suggestion where appropriate.

---

# 128. Combobox Escape

`Escape` SHOULD dismiss the popup without causing unrelated navigation.

---

# 129. Combobox Empty

When filtering returns nothing, show a proper:

```text
No results
```

state rather than an empty popup.

---

# 130. Combobox Loading

Remote Comboboxes SHOULD expose loading without destroying the current text input.

---

# 131. Remote Race

Older search results MUST NOT replace newer Combobox results after out-of-order network responses.

---

# 132. Multi-Select Combobox

Multi-selection increases interaction complexity.

Use it only when requirements warrant it.

---

# 133. Selected Chips

If selected values are represented as removable chips, each removal control MUST be keyboard-accessible and named.

---

# 134. Command Palette

A Command Palette provides keyboard-oriented discovery/execution of commands.

It is not a new accessibility role.

---

# 135. Command Palette Composition

A typical Command Palette SHOULD compose established primitives:

```text
Dialog
+
Combobox/Search Input
+
Listbox/Command Results
+
Groups
+
Keyboard shortcuts
```

---

# 136. Command Palette Trigger

Common trigger:

```text
Ctrl/Cmd + K
```

MAY be provided.

The feature MUST remain discoverable without knowing the shortcut.

---

# 137. Command Palette Semantics

Do not create custom:

```text
role="commandpalette"
```

ARIA semantics.

Use established roles corresponding to actual widgets.

---

# 138. Command Result

Each result MUST have:

```text
accessible name
command action
focus/active state
```

---

# 139. Command Grouping

Commands MAY group by:

```text
navigation
actions
recent
settings
```

with accessible group labels.

---

# 140. Command Shortcuts

Displayed shortcuts are supplementary.

Every command remains operable without the shortcut.

---

# 141. Command Search

Search/filtering SHOULD preserve stable keyboard behavior as results change.

---

# 142. Command Destructive Action

High-risk commands SHOULD follow the same confirmation/destructive standards as actions invoked elsewhere.

---

# 143. Dropdown Menu

Dropdown Menu presents a set of actions or commands.

---

# 144. Menu vs Select

Use:

```text
Dropdown Menu
→ commands/actions

Select
→ choose a value
```

Do not use menu semantics for a normal form Select.

---

# 145. Dropdown Anatomy

```text
MenuButton
└─ Menu
   ├─ MenuItem
   ├─ CheckboxItem?
   ├─ RadioGroup?
   ├─ Separator?
   └─ Submenu?
```

---

# 146. Menu Trigger

The menu trigger MUST expose menu-button semantics through the approved primitive.

---

# 147. Menu Keyboard

Menu interaction SHOULD support established behavior such as:

```text
Enter / Space → open
Arrow keys → navigate
Escape → close
```

according to the underlying menu pattern.

---

# 148. Menu Item

Menu Items SHOULD be concise action labels.

---

# 149. Menu Item With Dialog

A menu action MAY open a dialog.

Focus behavior MUST remain predictable.

---

# 150. Menu Destructive Action

Destructive menu items SHOULD be visually distinguishable but not rely on color alone.

---

# 151. Menu Separator

Separators MAY visually group commands.

Do not create excessive segmentation.

---

# 152. Submenus

Submenus SHOULD be avoided when a flat grouping can remain comprehensible.

Nested menus increase keyboard and pointer complexity.

---

# 153. Context Menu

A Context Menu provides contextual commands for a selected/right-clicked target.

---

# 154. Context Menu Alternative

All essential Context Menu actions MUST remain discoverable through another interface.

Right-click cannot be the only access path.

---

# 155. Popover

Popover is a non-modal floating surface anchored to a trigger.

---

# 156. Popover Use

Suitable for:

```text
supplementary controls
small forms
filters
date picker
details
```

that do not require a full modal interaction.

---

# 157. Popover Is Not Tooltip

Popover may contain interactive content and receive focus.

Tooltip does not.

---

# 158. Popover Is Not Dialog Automatically

If the interaction requires:

```text
focus containment
inert background
modal commitment
```

use Dialog.

---

# 159. Popover Dismissal

Popover SHOULD support appropriate dismissal through:

```text
Escape
outside interaction
trigger
```

according to task requirements.

---

# 160. Popover Focus

Focus movement depends on contents.

Do not automatically trap focus inside ordinary non-modal popovers.

---

# 161. Dialog

Dialog is an overlaid window containing a focused task or interaction.

---

# 162. Modal Dialog

A modal Dialog makes content outside it inert until it closes.

---

# 163. Dialog Anatomy

```text
Dialog
├─ Trigger
├─ Overlay
└─ Content
   ├─ Title
   ├─ Description?
   ├─ Body
   ├─ Actions
   └─ Close
```

---

# 164. Dialog Title

Every Dialog MUST have an accessible name.

A visible title is strongly preferred.

---

# 165. Dialog Description

Use description when it adds useful concise context.

Do not force an entire multi-paragraph dialog into one `aria-describedby` announcement.

---

# 166. Dialog Focus on Open

When a modal Dialog opens, focus MUST move inside it.

---

# 167. Dialog Initial Focus

Initial focus SHOULD be selected deliberately.

Possible targets:

```text
first field
dialog heading/static content
least destructive action
primary action
```

depending on task.

---

# 168. Destructive Dialog Focus

For irreversible actions, do not automatically focus the destructive action merely because it is visually primary.

---

# 169. Dialog Focus Trap

A modal Dialog MUST contain tab navigation.

`Tab` / `Shift+Tab` must not escape to background controls.

---

# 170. Dialog Escape

`Escape` SHOULD close ordinary Dialogs unless task integrity explicitly prevents it.

---

# 171. Dialog Close Control

Dialogs SHOULD include an obvious close/cancel mechanism.

---

# 172. Dialog Background

Modal background content must actually be inert when exposed as modal.

---

# 173. Fake Modal

Never set modal semantics while users can still interact with background content.

---

# 174. Dialog Focus Return

When a Dialog closes, focus SHOULD generally return to:

```text
the trigger
```

or another logical element if the workflow changed the context.

---

# 175. Dialog Size

Dialogs SHOULD not become entire complex application pages squeezed into overlays.

---

# 176. Dialog vs Page

Use a page rather than Dialog when:

```text
task is complex
deep linking matters
long workflow
large information architecture
browser history matters
```

---

# 177. Alert Dialog

Alert Dialog is reserved for brief, important interruptions requiring a user decision.

---

# 178. Alert Dialog Use

Appropriate for:

```text
destructive confirmation
critical interruption
important acknowledgement
```

Not every confirmation needs `alertdialog`.

---

# 179. Alert Dialog Copy

Follow Content & UX Writing destructive-copy rules.

---

# 180. Sheet

Sheet is an edge-mounted overlay surface.

Use for:

```text
secondary workflows
inspectors
mobile navigation
contextual editing
```

when the interaction model suits it.

---

# 181. Sheet Semantics

If modal, a Sheet follows Dialog focus/inert semantics.

If non-modal, do not pretend it is modal.

---

# 182. Drawer

Drawer often provides bottom/side overlay interaction, particularly on touch/mobile layouts.

Its accessibility semantics follow its underlying Dialog/Popover model.

---

# 183. Responsive Dialog/Drawer

A pattern MAY render as:

```text
Dialog on desktop
Drawer on mobile
```

if the semantic task remains equivalent and keyboard/focus behavior remains correct.

---

# 184. Tooltip

Tooltip provides short supplementary information for an element.

---

# 185. Tooltip Is Supplementary

Essential instructions MUST NOT exist only inside a Tooltip.

---

# 186. Tooltip Trigger

Tooltip SHOULD appear from both:

```text
hover
keyboard focus
```

where supported.

---

# 187. Tooltip Focus

Tooltip content itself SHOULD NOT receive focus.

If content includes controls or links, use Popover/non-modal Dialog instead.

---

# 188. Tooltip Escape

Tooltip SHOULD dismiss with `Escape`.

---

# 189. Tooltip Accessible Description

Tooltip content MAY be connected to the trigger as an accessible description.

---

# 190. Tooltip Delay

Use a small, consistent delay sufficient to avoid accidental flashing.

---

# 191. Tooltip Persistence

Pointer users SHOULD be able to move over the Tooltip without it disappearing immediately where hover behavior requires this.

---

# 192. Tooltip Length

Tooltips SHOULD remain short.

Long documentation belongs elsewhere.

---

# 193. Tabs

Tabs switch among related panels without navigating to unrelated destinations.

---

# 194. Tabs Anatomy

```text
Tabs
├─ TabList
│  ├─ Tab
│  ├─ Tab
│  └─ ...
└─ TabPanels
   ├─ TabPanel
   ├─ TabPanel
   └─ ...
```

---

# 195. Tabs Semantics

A Tabs implementation MUST expose the proper relationship between:

```text
tablist
tab
tabpanel
selected tab
```

---

# 196. Tabs Keyboard

Horizontal Tabs SHOULD support expected arrow-key navigation according to the approved tabs pattern.

---

# 197. Tab Sequence

The tablist SHOULD generally occupy one page tab stop rather than every tab being separate sequential stops.

---

# 198. Automatic Activation

Tabs MAY automatically activate when focus moves when panel content appears with negligible latency.

---

# 199. Manual Activation

Use manual activation when loading/switching a panel is sufficiently expensive that automatic arrow navigation becomes disruptive.

---

# 200. Tab Content Loading

Do not create perceptible network delays for every arrow-key movement if using automatic activation.

---

# 201. Tabs vs Navigation

Do not use ARIA Tabs merely to style ordinary page-navigation links as tabs.

If changing URL/page context, navigation links may be more appropriate.

---

# 202. Tabs Overflow

When tabs exceed available width, use a deliberate responsive behavior such as:

```text
horizontal scroll
overflow menu
different navigation
```

Do not shrink text to unreadable sizes.

---

# 203. Table

Table presents static tabular data.

Prefer native HTML `<table>`.

---

# 204. Table Anatomy

```text
Table
├─ Caption?
├─ Header
│  └─ Header Cells
└─ Body
   └─ Rows
      └─ Cells
```

---

# 205. Table Is Not Grid

A static Table and an interactive ARIA Grid are different patterns.

Do not apply `role="grid"` merely because a Table contains buttons.

---

# 206. Native Table

For ordinary tabular information:

```text
<table>
<thead>
<tbody>
<tr>
<th>
<td>
```

is the preferred foundation.

---

# 207. Table Headers

Column/row headers MUST be programmatically identifiable.

---

# 208. Table Caption

Complex Tables SHOULD provide a clear accessible name/caption.

---

# 209. Table Actions

A Table may contain buttons/links.

Those widgets remain normal tab stops.

This alone does not make the Table a Grid.

---

# 210. Responsive Table

Do not destroy table relationships merely to fit small screens.

Possible strategies:

```text
horizontal scrolling
column prioritization
responsive card representation
detail view
```

must preserve meaning.

---

# 211. Sticky Headers

Sticky table headers MUST NOT obscure keyboard focus.

---

# 212. Data Table

Data Table is a product pattern composed from:

```text
Table
sorting
filtering
selection
pagination
column controls
actions
```

It is not automatically an ARIA Grid.

---

# 213. Data Table Sort

Sortable columns SHOULD expose current sort state appropriately.

---

# 214. Sort Button

Column sorting SHOULD be initiated through an actual interactive control inside the header.

---

# 215. Selection

Row selection should use explicit:

```text
checkbox
radio
```

or appropriate selection interaction.

Clicking anywhere on a row SHOULD NOT ambiguously toggle selection if rows also contain links/actions.

---

# 216. Select All

Select-all behavior MUST define whether it means:

```text
visible page
loaded results
all filtered results
entire dataset
```

---

# 217. Bulk Action

Bulk actions MUST state scope clearly.

---

# 218. Table Empty State

Empty, loading, no-result, and error states MUST remain distinct.

---

# 219. Data Grid

Use Grid semantics only when the experience genuinely behaves like an interactive composite grid/spreadsheet.

---

# 220. Grid Complexity

ARIA Grid requires explicit keyboard focus management.

Do not introduce it casually.

---

# 221. Grid Tab Model

A Grid generally contributes one active descendant/cell to the page tab sequence and uses directional keys internally.

---

# 222. Grid Editing

When a cell enters edit mode, the implementation MUST define how keyboard keys transition between:

```text
grid navigation
editing the nested control
```

---

# 223. Grid Virtualization

Virtualized grids MUST preserve correct:

```text
row semantics
position
focus
selection
accessible context
```

---

# 224. Toast

Toast communicates brief asynchronous status without blocking the workflow.

---

# 225. Toast Use

Good uses:

```text
Changes saved
Invitation sent
Project archived
```

---

# 226. Toast Is Not for Critical Decisions

Do not place information requiring:

```text
careful reading
mandatory action
security acknowledgement
```

only in transient Toasts.

---

# 227. Toast State

Toast MAY represent:

```text
success
info
warning
error
```

according to semantic message state.

---

# 228. Toast Accessibility

Toast announcements SHOULD use an appropriate live-region strategy without unnecessarily interrupting screen-reader users.

---

# 229. Toast Focus

A Toast SHOULD NOT automatically steal keyboard focus.

---

# 230. Toast Action

Toast MAY contain a small action such as:

```text
Undo
View
```

---

# 231. Actionable Toast Lifetime

If a Toast contains an important interactive action, it MUST remain available long enough or provide another way to perform that action.

---

# 232. Toast Duration

Do not use one arbitrary timeout for every message.

Content length and actionability matter.

---

# 233. Persistent Error

An important error that prevents task completion SHOULD normally remain in the affected interface, not exist only as a Toast.

---

# 234. Toast Stacking

Limit simultaneous Toasts.

Do not create an unreadable notification stack.

---

# 235. Alert

Alert is an inline or page-level status/message.

It is preferable to Toast when information should remain visible.

---

# 236. Alert Anatomy

```text
Alert
├─ Icon?
├─ Title?
├─ Description
└─ Action?
```

---

# 237. Alert Severity

Use semantic variants:

```text
info
success
warning
danger
```

only when they reflect actual state.

---

# 238. Alert Color

Severity MUST NOT rely solely on color.

---

# 239. Badge

Badge displays compact metadata or status.

Examples:

```text
Active
Beta
3
Admin
```

---

# 240. Badge Is Not a Button

A Badge SHOULD be non-interactive.

If it is clickable, use the correct interactive component semantics.

---

# 241. Badge Meaning

Badge text SHOULD be short and understandable.

---

# 242. Status Badge

Status Badge SHOULD use canonical domain status terminology.

---

# 243. Badge Color

Color supports meaning but does not replace label text where state must be understood.

---

# 244. Count Badge

Count badges SHOULD have accessible context.

A visible:

```text
3
```

alone may need an accessible label such as:

```text
3 unread notifications
```

---

# 245. Calendar

Calendar presents dates for browsing/selection.

Calendar keyboard interaction requires special care.

---

# 246. Calendar vs Date Picker

Calendar is the date grid itself.

Date Picker composes:

```text
date field/trigger
+
calendar
+
popover/dialog
```

---

# 247. Date Picker

Date Picker allows a user to enter or choose a date.

---

# 248. Date Picker Input

Where practical, users SHOULD be able to:

```text
type a date
or
choose a date
```

rather than forcing pointer-only calendar selection.

---

# 249. Date Format Help

If text entry expects a specific format, expose that format accessibly.

---

# 250. Date Picker Dialog

When the calendar opens modally, it follows Dialog semantics.

---

# 251. Calendar Grid

Interactive date grids SHOULD use an appropriate Grid-like keyboard model.

---

# 252. Calendar Keyboard

Expected navigation MAY include:

```text
Arrow keys → adjacent days
Home/End → week boundaries
Page Up/Down → month movement
```

according to implementation/pattern.

The chosen behavior MUST be documented and tested.

---

# 253. Date Selection

Selected date, today's date, focus date, and unavailable date are distinct states.

---

# 254. Date Picker Disabled Dates

Unavailable dates MUST be programmatically disabled/unselectable, not merely gray.

---

# 255. Date Picker Locale

Date Picker MUST follow Internationalization Guidelines for:

```text
month names
weekday names
week start
date format
locale
```

---

# 256. Date Picker Timezone

A date-only picker MUST NOT accidentally convert dates across time zones.

---

# 257. Range Date Picker

Date ranges MUST clearly expose:

```text
start date
end date
range state
invalid order
```

---

# 258. Pagination

Pagination navigates through discrete pages/result segments.

---

# 259. Pagination Anatomy

```text
Pagination
├─ Previous
├─ Page links
├─ Ellipsis?
└─ Next
```

---

# 260. Pagination Semantics

Pagination SHOULD live in a navigation landmark with an accessible label where appropriate.

---

# 261. Current Page

Current page MUST be programmatically identifiable.

---

# 262. Page Label

Numeric links SHOULD have meaningful accessible names such as:

```text
Page 4
```

and:

```text
Page 4, current page
```

where appropriate.

---

# 263. Previous/Next

Use clear labels:

```text
Previous
Next
```

with context when necessary.

---

# 264. Disabled Pagination

Previous/Next should use correct disabled/unavailable behavior at boundaries.

---

# 265. Infinite Scroll

Infinite Scroll is not equivalent to Pagination.

Use only when product/navigation/accessibility implications have been considered.

---

# 266. Accordion

Accordion exposes collapsible sections usually controlled by headings/buttons.

---

# 267. Accordion Trigger

Accordion headers SHOULD use actual Buttons inside appropriate headings where possible.

---

# 268. Accordion State

Expanded/collapsed state MUST be programmatically exposed.

---

# 269. Accordion Multiple Open

Define whether:

```text
one
or
multiple
```

panels may be open.

---

# 270. Collapsible

Collapsible controls visibility for a single associated region.

Use when full Accordion group semantics are unnecessary.

---

# 271. Disclosure Trigger

The trigger SHOULD communicate expanded state.

---

# 272. Progress

Progress communicates known completion progress.

---

# 273. Determinate Progress

Use determinate Progress when the total/proportion is known.

---

# 274. Indeterminate Progress

Use Spinner/indeterminate Progress when completion percentage cannot be determined.

---

# 275. Progress Label

Important progress indicators SHOULD communicate:

```text
what is progressing
current value/status
```

where useful.

---

# 276. Spinner

Spinner indicates ongoing indeterminate activity.

---

# 277. Spinner Accessible Context

A Spinner alone MUST NOT be the only information available to assistive technology.

Provide an appropriate status label such as:

```text
Loading projects
```

where needed.

---

# 278. Skeleton

Skeleton represents expected layout while content loads.

---

# 279. Skeleton Is Decorative

Skeleton shapes SHOULD normally be hidden from assistive technology.

Expose the loading state through a meaningful status instead.

---

# 280. Skeleton Fidelity

Skeleton SHOULD roughly preserve final layout to reduce layout shift.

---

# 281. Skeleton Overuse

Do not replace every loading state with elaborate skeletons when a simple progress indicator is clearer.

---

# 282. Avatar

Avatar represents a person/entity image or fallback.

---

# 283. Avatar Image Alt

If nearby text already identifies the person, the avatar image MAY be decorative.

Avoid redundant screen-reader announcements.

---

# 284. Avatar Fallback

Fallback MAY use:

```text
initials
generic icon
```

but MUST not create ambiguous critical identity decisions.

---

# 285. Breadcrumb

Breadcrumb communicates hierarchical location.

---

# 286. Breadcrumb Structure

Use navigation semantics and ordered links.

---

# 287. Current Breadcrumb

The current page SHOULD be identified programmatically and normally not require navigation to itself.

---

# 288. Separator

Separator communicates structural separation.

Decorative separators should not create unnecessary accessibility noise.

---

# 289. Slider

Slider is used for selecting a value from a bounded continuous/discrete range.

---

# 290. Slider Keyboard

Slider MUST support established keyboard controls.

---

# 291. Slider Label

Slider MUST have:

```text
name
value
minimum
maximum
```

available programmatically.

---

# 292. Slider Fallback

Where precision matters, consider allowing direct numeric input in addition to a Slider.

---

# 293. Slider Touch

Slider must remain operable without precise dragging.

---

# 294. Toggle Group

Toggle Group represents a set of related toggles.

Its selection model MUST be explicit:

```text
single
multiple
```

---

# 295. Toolbar

A Toolbar groups related controls.

Use only when the grouping/keyboard behavior benefits users.

---

# 296. Component Loading Architecture

Data-aware components SHOULD NOT become responsible for arbitrary application data fetching by default.

Prefer:

```text
feature/domain owns data
↓
component receives state
```

unless the component is explicitly a higher-level domain abstraction.

---

# 297. Primitive Components Are Data-Agnostic

Foundational components SHOULD usually accept:

```text
value
items
loading
error
callbacks
```

rather than own domain API calls.

---

# 298. Headless vs Styled

Internal architecture MAY separate:

```text
behavior/primitive
+
visual component
```

when this creates real reuse.

Do not create an additional abstraction layer without need.

---

# 299. State Ownership

A component SHOULD own only interaction state appropriate to its abstraction.

Example:

```text
Popover
→ owns open state optionally

BillingForm
→ owns billing domain workflow
```

---

# 300. Component Side Effects

Foundational components SHOULD NOT:

```text
navigate unexpectedly
call APIs
show global notifications
mutate domain data
```

without explicit contract.

---

# 301. Error Boundaries

Component-level errors SHOULD not silently swallow domain failures.

---

# 302. Portal

Overlay components MAY render through portals.

Portal behavior MUST preserve:

```text
accessibility
theme tokens
direction
focus
```

---

# 303. Portal Theme

Portaled content MUST receive the same active:

```text
theme
RTL direction
design tokens
```

as its logical caller.

---

# 304. Nested Overlays

Nested:

```text
Dialog
Popover
Menu
Tooltip
```

interactions SHOULD be minimized and tested carefully.

---

# 305. Overlay Stack

Use the governed layer system rather than arbitrary `z-index`.

---

# 306. Escape Handling

When overlays are nested, `Escape` SHOULD dismiss the topmost appropriate layer first.

---

# 307. Outside Click

Outside-click dismissal MUST NOT cause unintended destructive commits.

---

# 308. Scroll Lock

Modal overlays MAY lock background scroll.

Scroll lock MUST not break:

```text
keyboard
mobile
screen reader
layout
```

behavior.

---

# 309. Autofocus

Autofocus SHOULD be used deliberately.

Do not move focus unexpectedly merely for convenience.

---

# 310. Autofocus Mobile

Automatically focusing text fields on mobile MAY trigger the keyboard and obscure context.

Evaluate before enabling.

---

# 311. Component Content Overflow

Components MUST handle:

```text
long labels
long words
long numbers
translated text
```

without destructive clipping.

---

# 312. Truncation

Truncation MAY be used for low-priority display text.

Critical:

```text
actions
errors
field labels
warnings
```

SHOULD generally remain fully available.

---

# 313. Accessible Truncation

If important text is visually truncated, the full value SHOULD remain discoverable accessibly.

---

# 314. Responsive Components

Components SHOULD remain usable at:

```text
narrow mobile widths
zoomed layouts
large desktop containers
```

---

# 315. Component Width

Do not hard-code widths around one demonstration string.

---

# 316. Component Density

Compact component variants MUST NOT violate:

```text
touch target
focus visibility
readability
```

requirements.

---

# 317. High Contrast

Components SHOULD remain perceivable in system high-contrast/forced-color environments.

---

# 318. Motion

Opening/closing/selection motion MUST follow Motion Tokens and Reduced Motion settings.

---

# 319. Reduced Motion

Component functionality MUST remain fully understandable with reduced motion enabled.

---

# 320. Iconography

Icons inside components MUST use the canonical icon system.

---

# 321. Icon Semantics

Decorative icons SHOULD be hidden from assistive technology when text already provides the name.

---

# 322. Status Icon

A status icon cannot be the sole means of communicating status.

---

# 323. Component API Naming

Props SHOULD use consistent vocabulary.

Prefer:

```text
disabled
loading
invalid
size
variant
```

across components.

---

# 324. Avoid Synonymous APIs

Do not mix:

```text
isDisabled
disabled
disable
```

across the same component library without a deliberate convention.

---

# 325. Boolean Props

Boolean props SHOULD describe affirmative states.

Prefer:

```text
disabled
required
readonly
```

over double negatives.

---

# 326. Polymorphism

Polymorphic rendering MUST NOT permit invalid accessibility semantics silently.

---

# 327. Ref Forwarding

Reusable primitives SHOULD expose refs where consumers legitimately need:

```text
focus
measurement
integration
```

---

# 328. DOM Props

Components wrapping native controls SHOULD forward appropriate native properties when safe.

---

# 329. Avoid Over-Wrappering

Do not make a simple native Input impossible to use because the abstraction hides necessary native attributes.

---

# 330. Forms Integration

Form controls MUST integrate with Forms & Validation Guidelines.

---

# 331. Label Association

Input-like components MUST support reliable:

```text
label
description
error
```

association.

---

# 332. Form Submission

Custom form controls MUST participate correctly in form state/submission where required.

---

# 333. Reset

Controlled/custom controls MUST define form reset behavior.

---

# 334. Native Validation

Do not accidentally disable useful native semantics unless replacing them intentionally through the application validation architecture.

---

# 335. Server Errors

Component-level invalid state MUST be able to display errors returned by the authoritative server validation flow.

---

# 336. Composition With Field

Canonical Form components SHOULD share a consistent Field abstraction.

Example:

```text
<Field>
  <FieldLabel />
  <Input />
  <FieldDescription />
  <FieldError />
</Field>
```

---

# 337. Design System Documentation

Every core component SHOULD document:

```text
Purpose
When to use
When not to use
Anatomy
Variants
Sizes
States
Keyboard behavior
Accessibility
Content
Examples
Anti-patterns
```

---

# 338. Story Coverage

Component documentation SHOULD visually demonstrate:

```text
default
hover/focus
disabled
loading
invalid
long content
dark mode
RTL
```

where relevant.

---

# 339. Interactive Documentation

Complex components SHOULD have functional examples rather than static screenshots alone.

---

# 340. Component Tests

Core components SHOULD have:

```text
unit/behavior tests
accessibility tests
keyboard tests
visual regression
integration tests where needed
```

---

# 341. Native Semantics Test

Testing SHOULD confirm the rendered element/role matches intended semantics.

---

# 342. Accessible Name Test

Interactive components SHOULD be testable through accessible name/role rather than CSS selectors.

Example conceptual test:

```text
getByRole("button", { name: "Save changes" })
```

---

# 343. Keyboard Test

Complex widgets MUST test their expected keyboard model.

---

# 344. Focus Test

Test:

```text
focus entry
focus movement
focus-visible
focus return
focus containment
```

where relevant.

---

# 345. Screen Reader Testing

Critical custom widgets SHOULD receive manual screen-reader testing.

Automated accessibility testing alone is insufficient.

---

# 346. Browser Testing

Complex primitives SHOULD be tested against the organization's supported browser matrix.

---

# 347. Mobile Testing

Touch-heavy components such as:

```text
Select
Combobox
Drawer
Date Picker
Slider
```

SHOULD receive actual mobile interaction testing.

---

# 348. Zoom Testing

Components SHOULD remain usable at Accessibility-standard zoom/reflow conditions.

---

# 349. RTL Testing

Core components SHOULD be tested in an RTL context.

---

# 350. Localization Testing

Test long translated:

```text
button labels
tabs
menu items
field labels
dialog actions
```

---

# 351. Dark Mode Testing

Every visual component MUST work in all supported themes.

---

# 352. Forced-Color Testing

Critical controls SHOULD be tested in forced/high-contrast modes where supported by the platform.

---

# 353. Reduced-Motion Testing

Animated components SHOULD test reduced-motion behavior.

---

# 354. Component Regression

A shared component change requires regression against representative consuming pages, not merely its isolated story.

---

# 355. Performance

Components SHOULD avoid unnecessary:

```text
JavaScript
client boundaries
observers
re-renders
portals
large dependency trees
```

---

# 356. Server-First Architecture

Purely presentational components SHOULD remain server-compatible where the framework permits.

---

# 357. Client Boundary

Only interactive behavior requiring browser state SHOULD force a client component boundary.

---

# 358. Bundle Cost

Introducing a complex primitive solely for trivial behavior SHOULD be justified against bundle/runtime cost.

---

# 359. Lazy Loading

Very heavy optional component functionality MAY load lazily when this improves performance without interaction regressions.

---

# 360. Virtualization

Virtualization SHOULD only be introduced for real scale requirements.

It creates accessibility/focus complexity and MUST be tested accordingly.

---

# 361. Component Dependencies

Component dependencies follow Dependency Guidelines.

Do not add another component library merely because one control is missing.

---

# 362. Third-Party Component

Third-party UI components require review for:

```text
accessibility
styling integration
tokens
bundle size
maintenance
license
security
API stability
```

---

# 363. Mixed Component Libraries

Avoid simultaneously maintaining multiple competing foundational component libraries.

---

# 364. New Component Criteria

Create a new canonical component when:

```text
repeated interaction exists
semantics are stable
design is reusable
ownership is clear
existing primitives are insufficient
```

---

# 365. Do Not Promote Too Early

A component used once SHOULD normally remain feature-local until reuse/stability is demonstrated.

---

# 366. Promotion Path

Canonical progression:

```text
Feature implementation
↓
Repeated need
↓
Shared component
↓
Stabilized API
↓
Design System component
```

---

# 367. Breaking Changes

Breaking component API/behavior changes MUST follow migration/deprecation policy.

---

# 368. Component Deprecation

Deprecated components SHOULD specify:

```text
replacement
reason
migration
removal target
```

---

# 369. Do Not Keep Duplicate Components

Avoid permanent parallel components such as:

```text
OldButton
Button2
NewButton
ButtonV3
```

---

# 370. Component Ownership

Every foundational component MUST have a clear owning team/group.

---

# 371. Review — New Component

Before adding a component ask:

```text
Does native HTML solve it?
Does shadcn solve it?
Does an existing component solve it?
Is this a component or a pattern?
What is its semantic role?
What keyboard model applies?
Who owns it?
```

---

# 372. Review — Accessibility

```text
□ Semantic role
□ Accessible name
□ Keyboard operation
□ Focus-visible
□ Focus order
□ Disabled behavior
□ State exposed programmatically
□ Contrast
□ Target size
□ Zoom/reflow
□ Screen reader
□ High contrast
```

---

# 373. Review — API

```text
□ Purpose focused
□ Minimal props
□ Consistent naming
□ Controlled/uncontrolled model
□ Native props preserved
□ Escape hatch justified
□ No domain leakage
□ Stable composition
```

---

# 374. Review — Visual

```text
□ Design tokens
□ Light mode
□ Dark mode
□ Hover
□ Focus
□ Active
□ Disabled
□ Loading
□ Invalid
□ Long content
□ RTL
□ Responsive
```

---

# 375. Button Checklist

```text
□ Action not navigation
□ Native button
□ type explicit where needed
□ Accessible name
□ Action-oriented label
□ Enter/Space
□ Focus visible
□ Disabled works
□ Loading prevents duplicate action
□ Icon decorative/name handled
```

---

# 376. Input Checklist

```text
□ Visible label
□ Native type
□ autocomplete
□ inputmode where useful
□ Placeholder optional
□ Description association
□ Error association
□ Required
□ Invalid
□ Disabled/readonly correct
□ Server validation supported
```

---

# 377. Select Checklist

```text
□ Native Select considered first
□ Label
□ Clear option semantics
□ Keyboard behavior
□ Focus
□ Disabled options
□ Typeahead where useful
□ No interactive elements inside options
□ Error state
□ Mobile tested
```

---

# 378. Combobox Checklist

```text
□ Combobox justified
□ Label
□ Input state
□ Popup state
□ Active option
□ Selected option
□ Arrow navigation
□ Enter selection
□ Escape
□ Empty state
□ Loading
□ Remote race handling
□ Screen reader tested
```

---

# 379. Command Palette Checklist

```text
□ Discoverable without shortcut
□ Dialog semantics
□ Search/combobox semantics
□ Result list semantics
□ Keyboard navigation
□ Escape
□ Commands named
□ Shortcuts supplementary
□ Destructive commands protected
□ Empty state
```

---

# 380. Dialog Checklist

```text
□ Dialog genuinely needed
□ Accessible title/name
□ Description appropriate
□ Focus moves inside
□ Initial focus deliberate
□ Focus contained
□ Escape
□ Visible close/cancel
□ Background inert
□ Focus returned
□ Mobile behavior
□ Long-content scrolling
```

---

# 381. Dropdown Checklist

```text
□ Commands, not value selection
□ Menu-button semantics
□ aria-expanded handled by primitive
□ Keyboard open/navigation
□ Escape
□ Focus return
□ Disabled items
□ Submenus minimized
□ Destructive items clear
```

---

# 382. Tabs Checklist

```text
□ Related panels
□ Correct roles/relations
□ One active tab
□ Arrow keyboard behavior
□ Focus visible
□ Automatic/manual activation chosen deliberately
□ Panel loading latency acceptable
□ Overflow behavior
□ Not misused for page navigation
```

---

# 383. Table Checklist

```text
□ Native table
□ Correct headers
□ Caption/name if needed
□ Sorting control accessible
□ Row actions semantic
□ Selection scope clear
□ Responsive strategy
□ Empty/loading/error distinct
□ Sticky headers don't obscure focus
□ Grid role not added casually
```

---

# 384. Toast Checklist

```text
□ Appropriate transient information
□ Does not steal focus
□ Live region appropriate
□ Duration adequate
□ Action remains usable
□ Critical error not toast-only
□ Stack bounded
□ Close action accessible where provided
```

---

# 385. Tooltip Checklist

```text
□ Supplementary only
□ Trigger has accessible name
□ Hover support
□ Focus support
□ Escape
□ Tooltip not focusable
□ No interactive content
□ Short copy
□ Not sole carrier of essential instruction
```

---

# 386. Date Picker Checklist

```text
□ Date Picker justified
□ Manual typing considered
□ Format guidance
□ Calendar keyboard model
□ Selected/today/focus distinct
□ Disabled dates semantic
□ Locale
□ Week start
□ Date-only timezone safety
□ Dialog/Popover semantics
□ Screen reader tested
```

---

# 387. Definition of Done — New Core Component

A core component is ready when:

```text
✓ Purpose defined
✓ Native semantics evaluated
✓ shadcn/approved primitive evaluated
✓ Anatomy defined
✓ API reviewed
✓ States defined
✓ Design Tokens used
✓ Keyboard model implemented
✓ Accessible name/state semantics verified
✓ Focus behavior verified
✓ Light/dark mode verified
✓ RTL/localization verified
✓ Responsive behavior verified
✓ Automated tests pass
✓ Manual accessibility review completed where needed
✓ Documentation/examples complete
✓ Owner assigned
```

---

# 388. Definition of Done — Component Change

```text
✓ Consumer impact known
✓ API compatibility evaluated
✓ Behavior regression tests
✓ Accessibility tests
✓ Keyboard tests where applicable
✓ Visual regression
✓ Theme regression
✓ RTL/localization regression
✓ Migration notes if breaking
✓ Documentation updated
```

---

# 389. Component Anti-Patterns

Avoid:

```text
<div onClick={...}>
```

as a Button.

Avoid:

```text
<a href="#" onClick={save}>
```

as a save action.

Avoid:

```text
<Button>
  <Trash />
</Button>
```

with no accessible name.

Avoid:

```text
placeholder = label
```

Avoid:

```text
outline: none
```

with no replacement.

Avoid:

```text
disabled via opacity only
```

Avoid:

```text
aria-disabled=true
```

while click handlers still execute.

Avoid:

```text
loading spinner replaces label
```

with no context.

Avoid:

```text
Button variant="blue"
```

instead of semantic variant.

Avoid:

```text
Select
```

for a list of commands.

Avoid:

```text
Dropdown Menu
```

for choosing a form value.

Avoid:

```text
Combobox
```

for three obvious choices better represented as Radios.

Avoid:

```text
interactive buttons inside listbox option
```

Avoid:

```text
role="commandpalette"
```

as invented ARIA.

Avoid:

```text
Dialog opens
focus remains behind overlay
```

Avoid:

```text
aria-modal=true
```

while background controls remain interactive.

Avoid:

```text
Dialog closes
focus disappears to body
```

Avoid:

```text
Are you sure?
[Yes] [No]
```

for destructive actions.

Avoid:

```text
Tooltip contains link/button
```

Avoid:

```text
tooltip only appears on hover
```

Avoid:

```text
essential instructions only in tooltip
```

Avoid:

```text
every row/cell focusable
```

and calling it Data Grid without implementing Grid keyboard behavior.

Avoid:

```text
role="grid"
```

on an ordinary Table because it looks sophisticated.

Avoid:

```text
click row = open
click row = select
```

simultaneously without a clear model.

Avoid:

```text
toast:
Payment failed
```

that disappears while the unresolved form remains.

Avoid:

```text
toast steals focus
```

Avoid:

```text
Badge
```

used as a clickable Button.

Avoid:

```text
calendar requires mouse
```

Avoid:

```text
Date object at UTC midnight
```

as universal date-only state.

Avoid:

```text
disabled date shown only gray
```

Avoid:

```text
pagination page 5000
```

with no scale strategy.

Avoid:

```text
Skeleton
```

announced as dozens of empty elements by screen readers.

Avoid:

```text
spinner only
```

with no loading status.

Avoid:

```text
z-index: 999999
```

for overlay conflicts.

Avoid:

```text
multiple competing component libraries
```

for the foundational UI layer.

Avoid:

```text
Button2
NewButton
LegacyButton
```

as permanent architecture.

Avoid:

```text
arbitrary Tailwind values
```

inside canonical components when tokens exist.

Avoid:

```text
every shared component fetches its own API
```

without deliberate domain abstraction.

Avoid:

```text
component API mirrors every internal DOM node
```

Avoid:

```text
50 boolean props
```

instead of coherent variants/composition.

Avoid:

```text
desktop-only hover behavior
```

for essential functionality.

Avoid:

```text
fixed width = 120px
```

because the English label fits.

Avoid:

```text
dark mode override copied into every component
```

instead of semantic token theming.

Avoid:

```text
visual story passes
therefore accessible
```

without behavior/keyboard testing.

---

# 390. AI Component Rules

AI coding agents MUST check the approved component library before creating a new primitive.

---

# 391. AI shadcn Rule

AI SHOULD use the canonical shadcn/ui component where one exists.

---

# 392. AI Native Rule

AI MUST prefer native semantic HTML when custom widget behavior is unnecessary.

---

# 393. AI Button Rule

AI MUST NOT implement actions using clickable `div`/`span` elements when a Button is appropriate.

---

# 394. AI Link Rule

AI MUST distinguish navigation from action.

---

# 395. AI Accessible-Name Rule

AI MUST provide an accessible name for every interactive component.

---

# 396. AI Icon-Button Rule

AI MUST add a meaningful accessible name to icon-only Buttons.

---

# 397. AI Focus Rule

AI MUST NOT remove focus indicators without an accessible replacement.

---

# 398. AI Disabled Rule

AI MUST ensure disabled semantics and behavior agree.

---

# 399. AI Loading Rule

AI SHOULD preserve an understandable action label/context during loading.

---

# 400. AI Select Rule

AI SHOULD consider native Select before custom Select.

---

# 401. AI Select-vs-Menu Rule

AI MUST distinguish:

```text
selection
```

from:

```text
commands
```

before choosing Select or Dropdown Menu.

---

# 402. AI Combobox Rule

AI MUST NOT create a custom Combobox keyboard interaction from scratch when an approved primitive already exists.

---

# 403. AI Command-Palette Rule

AI MUST compose Command Palette from established accessible widget semantics rather than inventing ARIA roles.

---

# 404. AI Dialog Rule

AI MUST define:

```text
initial focus
focus containment
Escape behavior
focus return
```

for modal Dialogs.

---

# 405. AI Modal Rule

AI MUST NOT set modal semantics unless background interaction is actually blocked.

---

# 406. AI Tooltip Rule

AI MUST NOT put essential information or interactive controls solely in Tooltip.

---

# 407. AI Table Rule

AI MUST NOT apply `role="grid"` to an ordinary table without implementing Grid interaction semantics.

---

# 408. AI Toast Rule

AI MUST NOT use transient Toasts as the sole presentation of task-blocking errors.

---

# 409. AI Date-Picker Rule

AI MUST consider:

```text
keyboard
manual input
locale
date-only semantics
timezone
```

when implementing Date Picker.

---

# 410. AI State Rule

AI MUST distinguish:

```text
variant
state
domain status
```

rather than conflating them.

---

# 411. AI Token Rule

AI MUST use Design Tokens rather than arbitrary visual values in canonical components.

---

# 412. AI Responsive Rule

AI MUST preserve usability under:

```text
narrow width
zoom
long translation
RTL
```

---

# 413. AI Portal Rule

AI MUST preserve:

```text
theme
direction
accessibility
focus
```

when rendering overlays through portals.

---

# 414. AI Component-State Rule

AI SHOULD explicitly consider:

```text
loading
empty
error
disabled
readonly
invalid
```

rather than implementing only the happy path.

---

# 415. AI API Rule

AI SHOULD use the existing component API conventions rather than introducing synonymous prop naming.

---

# 416. AI Dependency Rule

AI MUST NOT add another general UI library because one missing component is inconvenient.

---

# 417. AI Promotion Rule

AI SHOULD keep one-off components feature-local until reuse/stability justifies Design System promotion.

---

# 418. AI Test Rule

AI SHOULD test components through:

```text
roles
accessible names
user keyboard/pointer behavior
```

rather than implementation selectors.

---

# 419. AI Gold Rule

When uncertain:

```text
Native HTML
>
Existing Design System component
>
Existing shadcn primitive
>
Composition of existing primitives
>
New shared component
>
One-off custom widget
```

provided the earlier option satisfies the required interaction.

And:

```text
Semantic correctness
>
Visual imitation
```

---

# 420. Golden Component Rules

**1. A component is a reusable interaction contract, not reusable CSS.**

**2. Native semantic HTML is preferred whenever it satisfies the requirement.**

**3. shadcn/ui is the primary approved web implementation layer, not the source of design semantics.**

**4. Product Design System components wrap approved primitives with canonical tokens, variants, content, and accessibility rules.**

**5. Existing components are extended before new foundational primitives are invented.**

**6. Components have explicit purpose, anatomy, API, states, and accessibility behavior.**

**7. Private DOM implementation details are not casually exposed as public API.**

**8. Variant and state remain distinct concepts.**

**9. Variants remain semantically small and intentional.**

**10. Every component has one canonical default size/behavior.**

**11. Components consume Design Tokens rather than arbitrary visual values.**

**12. Dark mode is primarily a semantic-token concern, not duplicated component CSS.**

**13. Every interactive component has a programmatic accessible name.**

**14. Visible labels and accessible names remain aligned.**

**15. Icon-only actions always have meaningful accessible names.**

**16. Keyboard functionality exists for every pointer-driven interaction where applicable.**

**17. Visible keyboard focus is never removed without replacement.**

**18. Disabled semantics and disabled behavior always agree.**

**19. Readonly and disabled are not interchangeable.**

**20. Loading and disabled are separate semantic states.**

**21. Loading actions preserve sufficient action context.**

**22. Error/invalid states are represented programmatically as well as visually.**

**23. Components survive long translations, zoom, narrow widths, and RTL.**

**24. Logical leading/trailing APIs are preferred to physical left/right semantics.**

**25. Button means action; Link means navigation.**

**26. Buttons use native button semantics wherever possible.**

**27. Form button type is explicit where accidental submit is possible.**

**28. Toggle-button pressed state is represented accurately.**

**29. Inputs have persistent labels; placeholders are supplementary.**

**30. Input types, autocomplete, and input modes are chosen deliberately.**

**31. Select represents choosing a value; Menu represents invoking a command.**

**32. Native Select is considered before introducing a custom Select.**

**33. Listbox options do not become miniature collections of nested controls.**

**34. Combobox is reserved for input plus popup suggestion/selection behavior.**

**35. Combobox keyboard/focus behavior follows a known accessible pattern.**

**36. Command Palette uses established Dialog/Combobox/Listbox semantics rather than invented ARIA roles.**

**37. Keyboard shortcuts supplement but never replace discoverable commands.**

**38. Dropdown Menu exposes commands and uses proper menu-button behavior.**

**39. Essential Context Menu actions remain available without right-click.**

**40. Popover is non-modal unless actual modal behavior is required.**

**41. Tooltip contains supplementary, non-interactive information only.**

**42. Tooltip works for keyboard focus as well as hover.**

**43. Dialog receives focus when opened and returns focus logically when closed.**

**44. Modal Dialogs contain focus and make outside content genuinely inert.**

**45. `aria-modal` is never applied to a fake modal.**

**46. Dialog initial focus is deliberate rather than arbitrary.**

**47. High-risk Dialogs do not automatically focus the most destructive action by default.**

**48. Dialogs do not replace pages for complex workflows merely to avoid routing.**

**49. Tabs represent related panels, not arbitrary styled page navigation.**

**50. Tab keyboard behavior follows the established tab pattern.**

**51. Automatic tab activation is used only when panel switching is effectively immediate.**

**52. Static tabular content uses native Table semantics.**

**53. `role="grid"` is introduced only for true interactive grid behavior.**

**54. A Table containing buttons does not automatically become a Data Grid.**

**55. Data Table sorting, selection, filtering, pagination, and bulk-action scopes are explicit.**

**56. Grid keyboard navigation is implemented completely when Grid semantics are chosen.**

**57. Toasts communicate transient status without stealing focus.**

**58. Task-blocking errors remain visible in context rather than disappearing only in Toasts.**

**59. Actionable Toasts remain operable long enough or provide an alternative path.**

**60. Badges are informational by default, not disguised Buttons.**

**61. Status Badges use textual semantics in addition to color.**

**62. Date Picker supports keyboard interaction and, where practical, direct date entry.**

**63. Date-only components preserve date-only semantics rather than introducing timezone shifts.**

**64. Calendar selection, focus, today, and disabled states remain distinct.**

**65. Pagination identifies the current page and exposes meaningful navigation labels.**

**66. Accordion and disclosure expanded states are programmatically exposed.**

**67. Spinner/Skeleton states expose meaningful loading status without accessibility noise.**

**68. Skeletons are generally decorative to assistive technology.**

**69. Slider exposes name, current value, minimum, and maximum and remains keyboard-operable.**

**70. Portaled components inherit theme, direction, and accessibility context.**

**71. Nested overlays are minimized and dismiss from the topmost logical layer.**

**72. Component z-index uses the governed layer system.**

**73. Modal scroll locking does not break mobile or keyboard behavior.**

**74. Autofocus is deliberate and avoids surprising mobile keyboard activation.**

**75. Component content does not clip essential actions, errors, labels, or warnings.**

**76. Compact density does not compromise target size, focus, or readability.**

**77. Components remain usable in high-contrast/forced-color modes where applicable.**

**78. Reduced motion never removes understanding or functionality.**

**79. Foundational components remain domain-agnostic unless deliberately promoted to domain components.**

**80. Shared primitives do not perform hidden API calls, navigation, or global side effects.**

**81. Controlled and uncontrolled APIs follow one clear source-of-truth model.**

**82. Component prop naming is consistent across the library.**

**83. Native properties remain available when useful rather than hidden behind over-abstraction.**

**84. Form controls integrate with the shared Field, validation, and server-error architecture.**

**85. Component documentation covers behavior and accessibility, not only appearance.**

**86. Complex components include interactive documentation and keyboard instructions where necessary.**

**87. Core components receive behavior, keyboard, accessibility, visual, RTL, theme, and localization tests.**

**88. Manual screen-reader testing supplements automation for complex custom widgets.**

**89. Component changes are regression-tested against real consuming surfaces.**

**90. New third-party UI libraries require explicit design-system review.**

**91. Multiple competing foundational component libraries are prohibited by default.**

**92. New components begin at the narrowest correct reuse scope.**

**93. One-off feature UI is not prematurely promoted into the global component library.**

**94. Repeated stable interaction patterns may be promoted through the defined reuse lifecycle.**

**95. Deprecated components have replacements, migrations, and removal targets.**

**96. Permanent `Button2` / `NewDialog` parallel implementations are not accepted architecture.**

**97. Component accessibility behavior is part of the public contract and breaking changes are treated accordingly.**

**98. Visual similarity does not justify incorrect semantics.**

**99. If custom ARIA is required, engineering owns the complete keyboard and state model.**

**100. If a component cannot explain its semantic role, states, focus behavior, and keyboard interaction, it is not production-grade.**

---

# 421. Canonical Component Standard

The organizational standard is:

> **Reusable components are governed interaction contracts built on native platform semantics wherever possible, approved accessible primitives when native controls are insufficient, canonical Design Tokens, and the organization's product-specific API, content, and accessibility rules. On the canonical web stack, shadcn/ui is the preferred implementation layer for supported primitives, while the organization remains responsible for semantics, variants, token mappings, accessibility, composition, documentation, and governance.**

> **Components are designed from purpose and behavior rather than appearance. Every stable interactive component defines anatomy, variants, sizes, applicable states, accessible naming, keyboard interaction, focus behavior, controlled/uncontrolled state semantics, responsive behavior, localization behavior, theme behavior, and composition boundaries. Variants express stable meaning; states represent temporary interaction conditions; neither becomes an uncontrolled collection of stylistic options.**

> **Native elements remain the first choice. Buttons perform actions, links navigate, native inputs and selects are retained where their functionality is sufficient, native tables represent ordinary tabular data, and ARIA widgets are introduced only when richer behavior genuinely requires them. Once custom widget semantics are introduced, implementation owns the complete role, state, accessible-name, keyboard, focus-management, disabled, selection, and announcement model required by that widget.**

> **Accessibility is part of the component API. Every interactive control has an accessible name, keyboard operation, visible focus, programmatically represented state, appropriate target dimensions, correct disabled/readonly behavior, sufficient contrast, and compatibility with zoom, text scaling, RTL, high-contrast modes, and reduced-motion preferences. Visual states never substitute for semantic states, and automated checks are supplemented with keyboard and manual assistive-technology testing for complex widgets.**

> **Overlay components use explicit interaction models. Tooltips provide non-interactive supplementary descriptions; Popovers provide non-modal interactive content; Dialogs contain focused tasks; modal Dialogs genuinely make background content inert and contain focus; Alert Dialogs are reserved for brief important interruptions; Sheets and Drawers inherit the accessibility model corresponding to their actual modal or non-modal behavior. Focus entry, containment, dismissal, and return are deliberate rather than accidental side effects of a library implementation.**

> **Selection and command components remain semantically distinct. Select and Radio Group choose values, Combobox combines an input with suggestion or selection content, Dropdown and Context Menus expose commands, and Command Palette composes established Dialog, input/combobox, and list-selection semantics rather than inventing a proprietary accessibility role. Component choice follows the user's task, not visual similarity.**

> **Data presentation distinguishes static tables from interactive composite grids. Native Table is the default for tabular content, Data Table composes sorting/filtering/pagination/selection without automatically becoming an ARIA Grid, and Grid semantics are reserved for spreadsheet-like composite keyboard interaction with explicit directional focus management. Selection scopes, sorting state, pagination, virtualization, and bulk operations remain understandable and accessible.**

> **Feedback components reflect the importance and persistence of information. Toast communicates brief asynchronous status without stealing focus; task-blocking errors remain in context; Alerts communicate persistent status; Badges convey compact metadata rather than pretending to be controls; Spinner and Skeleton communicate loading without overwhelming assistive technology; and progress, error, success, empty, and unavailable states remain semantically distinct.**

> **Calendar and Date Picker components preserve real date semantics and internationalization. They support keyboard navigation, localized weekday/month presentation and week-start rules, correctly distinguish today, focus, selection, and disabled states, permit direct input where beneficial, and do not accidentally convert date-only values through UTC or viewer timezone transformations.**

> **Component implementation consumes the canonical token, content, form, state-management, layout, accessibility, responsive, and internationalization standards rather than recreating those policies locally. Components do not hide domain networking, navigation, or global side effects unless they are deliberately domain-level abstractions. Portals preserve active theme and direction; responsive implementations tolerate long translations, narrow containers, zoom, touch input, and supported platform conventions.**

> **The component library evolves through governed reuse. Feature-local UI is promoted only after repeated need and stable semantics emerge, shared component APIs undergo compatibility review, third-party primitives receive accessibility/dependency evaluation, breaking behavior follows migration and deprecation processes, and obsolete parallel implementations are removed rather than retained permanently.**

A production-grade component should make it easy to answer:

```text
What user task does this component serve?
Why is this a Button rather than a Link?
Why is this Select rather than Radio Group or Combobox?
Why is this Dropdown rather than Select?
Why is this Popover rather than Dialog?
Why is this Table rather than Grid?
Does native HTML already provide the behavior?
Which approved primitive implements it?
What is its anatomy?
What variants are semantically supported?
What states can it enter?
What does keyboard focus do?
Which keys operate it?
What is its accessible name?
How is selected/checked/expanded/invalid state represented?
What happens when disabled?
What happens while loading?
How are errors associated?
How does focus behave when an overlay opens?
Where does focus return when it closes?
Does the component work with keyboard only?
Does it work at 200% zoom and responsive reflow conditions?
Does it work in dark mode?
Does it work in RTL?
Does it survive long translation?
Does it remain understandable in high-contrast mode?
What happens under reduced motion?
Does it use canonical Design Tokens?
Does it introduce domain side effects?
How is it tested?
Who owns the component?
How will it be deprecated if replaced?
```

If those questions cannot be answered reliably, the implementation is a styled widget rather than a governed production component.

The accessibility baseline above follows the current **WAI-ARIA Authoring Practices Guide**. APG explicitly distinguishes native/static Table from interactive Grid, specifies modal Dialog focus containment and `aria-modal`, defines Combobox as an input with an associated popup, and defines the role/state relationships for Tabs and Menu Buttons. citeturn790792search3turn790792search7turn610825search0turn610825search1turn610825search5turn790792search10

Two caveats matter. First, APG itself stresses that once authors build custom GUI widgets with ARIA, browser-native keyboard support is no longer provided automatically; the author has to implement it. That supports this standard's **native HTML first** rule. citeturn790792search0turn790792search13 Second, W3C currently still marks the APG **Tooltip pattern as work in progress without task-force consensus**, so Tooltip implementations should stay conservative: supplementary non-interactive content, keyboard focus support on the trigger, no focus inside the tooltip, and `Escape` dismissal. citeturn610825search3

The current shadcn/ui catalog includes the component families this standard targets—Button, Input, Select, Dialog, Dropdown Menu, Table/Data Table, Tabs, Tooltip, Combobox, Command, Date Picker, Toast and related primitives—so the design-system rule remains: **use shadcn first, extend it through canonical tokens and behavior, and create a new primitive only when the existing layer cannot express the requirement cleanly.** citeturn790792search11

Canonical master placement:

**… → State Management → Design Tokens → Layout → Facade → Components → Forms & Validation → Patterns → Accessibility → Responsive Design → …**
