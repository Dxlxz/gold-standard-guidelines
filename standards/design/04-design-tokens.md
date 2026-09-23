---
id: "design-tokens"
title: "Design Tokens Guidelines — Gold Standard 2026"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "tokens"]
applies_to: ["ui"]
related: ["internationalization", "layout", "performance", "accessibility", "dependency"]
legacy_number: 38
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 71348
provenance: baseline

---

Canonical placement: **State Management → Design Tokens → Layout → Facade → Components → Forms/Patterns**. Design Tokens owns the **visual decision primitives and semantic contracts**; Layout, Facade, Components, and the shadcn/ui-based Design System consume them rather than redefining their own values.

# Design Tokens Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- design tokens;
- color;
- typography;
- spacing;
- sizing;
- borders;
- radius;
- elevation;
- shadows;
- opacity;
- motion;
- easing;
- breakpoints;
- responsive foundations;
- semantic tokens;
- component tokens;
- state tokens;
- dark mode;
- high-contrast themes;
- brand themes;
- token naming;
- token aliases;
- token source files;
- token compilation;
- platform transformation;
- Figma/design-tool synchronization;
- CSS custom properties;
- Tailwind integration;
- shadcn/ui integration;
- token testing;
- token governance;
- deprecation;
- migration.

The objective is to make visual design decisions:

```text
Consistent
Semantic
Accessible
Themeable
Composable
Platform-neutral
Reviewable
Versioned
Machine-readable
Maintainable
```

The core principle is:

> **Product code consumes semantic design decisions, not arbitrary visual values.**

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
Affected token/domain
Product impact
Accessibility impact
Migration path
Owner
Review date
```

---

# 3. What Is a Design Token?

A design token is a named design decision represented in a machine-readable form.

Examples:

```text
color.text.primary
space.4
radius.control
font.size.body
motion.duration.fast
```

A token is more than a constant.

It provides:

```text
meaning
identity
reuse
governance
themeability
cross-platform translation
```

---

# 4. Tokens Are Design Contracts

A token creates a contract between:

```text
Design
Engineering
Accessibility
Brand
Product
Multiple platforms
```

Changing the value of a token MAY affect every consumer.

Token changes therefore require the same discipline as changing a shared API.

---

# 5. Tokens Are Not Merely Variables

This:

```text
const blue = "#2563EB"
```

is a variable.

This:

```text
color.action.primary
```

is a semantic design decision.

---

# 6. Token Architecture

The canonical hierarchy is:

```text
Primitive tokens
↓
Semantic tokens
↓
Component tokens
↓
Component implementation
```

Example:

```text
color.blue.600
↓
color.action.primary
↓
button.primary.background
↓
<Button variant="default">
```

---

# 7. Primitive Tokens

Primitive tokens represent reusable raw design values.

Examples:

```text
color.blue.50
color.blue.500
color.gray.950

space.1
space.2
space.4

radius.sm
radius.md

font.size.14
```

Primitive tokens answer:

> **What values exist in the system?**

---

# 8. Semantic Tokens

Semantic tokens describe intended usage.

Examples:

```text
color.text.primary
color.text.muted
color.surface.default
color.surface.elevated
color.border.subtle
color.action.primary
color.status.danger
```

Semantic tokens answer:

> **What does this value mean?**

---

# 9. Component Tokens

Component tokens describe a design decision specific to a reusable component.

Examples:

```text
button.primary.background
button.primary.foreground
input.border.focus
dialog.shadow
```

Component tokens answer:

> **How does this component use the system?**

---

# 10. Default Preference

Consumers SHOULD prefer:

```text
semantic token
```

over:

```text
primitive token
```

unless the consumer is part of the token/design-system implementation itself.

---

# 11. Primitive Leakage

Feature/product code SHOULD NOT directly use:

```text
color.blue.600
color.gray.200
```

when the intended meaning is:

```text
color.action.primary
color.border.default
```

---

# 12. Why Semantic Tokens Matter

Suppose:

```text
color.text.primary
```

maps to:

```text
color.gray.950
```

in light mode and:

```text
color.gray.50
```

in dark mode.

Consumers do not change.

Only the semantic mapping changes.

---

# 13. Token Dependency Direction

The dependency direction MUST remain:

```text
Primitive
↓
Semantic
↓
Component
```

Avoid:

```text
Component
→ Primitive
→ Component
```

or circular aliases.

---

# 14. No Alias Cycles

Token references MUST NOT form cycles.

Invalid:

```text
color.a → color.b
color.b → color.a
```

---

# 15. Alias Depth

Alias chains SHOULD remain short enough to understand.

Prefer:

```text
primitive
→ semantic
→ component
```

over:

```text
token
→ token
→ token
→ token
→ token
→ token
```

---

# 16. Canonical Token Source

The organization MUST have one authoritative token source.

Recommended:

```text
version-controlled token files
```

using a vendor-neutral structure compatible with the Design Tokens Community Group model where practical.

---

# 17. Design Tool Is Not Automatically Source of Truth

Figma or another design tool MAY consume and edit tokens.

It MUST NOT silently become a separate conflicting source of truth.

---

# 18. Single Authority

The system SHOULD avoid:

```text
Figma values
+
CSS values
+
Tailwind config
+
iOS constants
+
Android resources
```

being maintained independently.

---

# 19. Canonical Flow

Recommended architecture:

```text
Canonical token source
↓
Validation
↓
Token resolver/compiler
↓
CSS variables
Tailwind mappings
iOS resources
Android resources
Design-tool sync
Documentation
```

---

# 20. DTCG Compatibility

New platform-neutral token files SHOULD align with the stable Design Tokens Community Group format where tooling permits.

Core concepts include:

```text
$value
$type
$description
groups
aliases/references
```

---

# 21. Type Declaration

Tokens SHOULD have explicit types where supported.

Examples:

```text
color
dimension
fontFamily
fontWeight
duration
cubicBezier
shadow
typography
border
gradient
```

---

# 22. Token Schema Validation

CI MUST validate token structure before compilation.

Invalid tokens MUST fail the build rather than produce silently broken platform output.

---

# 23. Token Naming Principles

Token names SHOULD be:

```text
semantic
predictable
lowercase
hierarchical
technology-neutral
stable
```

---

# 24. Canonical Name Structure

Recommended structure:

```text
<category>.<concept>.<role>.<state>
```

Examples:

```text
color.text.primary
color.action.primary.hover
color.border.input.focus
motion.duration.enter
```

Not every token needs every segment.

---

# 25. Category First

The first namespace SHOULD normally describe the token category.

Examples:

```text
color.*
space.*
size.*
radius.*
shadow.*
font.*
motion.*
breakpoint.*
opacity.*
layer.*
```

---

# 26. Semantic Name Over Visual Name

Prefer:

```text
color.text.muted
```

over:

```text
color.gray.light
```

for semantic tokens.

---

# 27. Avoid Implementation Names

Bad:

```text
color.tailwind.gray.700
color.css.primary
color.figma.blue
```

Token meaning MUST NOT depend on one implementation technology.

---

# 28. Avoid Screen Names in Global Tokens

Bad:

```text
dashboard.card.blue
settings.padding
```

unless the token is intentionally component/domain scoped.

---

# 29. No Arbitrary Numbering for Semantic Tokens

Bad:

```text
color.text.1
color.text.2
```

Prefer:

```text
color.text.primary
color.text.secondary
color.text.muted
```

---

# 30. Numeric Primitive Scales

Primitive palettes MAY use numeric scales:

```text
color.gray.50
color.gray.100
...
color.gray.950
```

because these represent ordered raw values rather than semantic roles.

---

# 31. Stable Names

Changing a token name is a breaking design-system change even if its value remains identical.

---

# 32. Token Description

Non-obvious semantic tokens SHOULD include a description explaining intended usage.

Example:

```text
color.text.muted

Use for secondary explanatory text.
Not for disabled controls.
```

---

# 33. Describe Constraints

Descriptions MAY define:

```text
allowed surfaces
contrast assumptions
states
component usage
```

where necessary.

---

# 34. Token Metadata

Token metadata MAY include:

```text
owner
status
deprecated
replacement
introduced version
design-tool reference
documentation URL
```

through supported extensions.

---

# 35. Primitive Palette

The primitive color palette SHOULD be intentionally bounded.

Do not create hundreds of arbitrary color values without demonstrated need.

---

# 36. Color Families

A palette MAY contain families such as:

```text
neutral
brand
blue
green
amber
red
```

depending on product needs.

---

# 37. Primitive Color Is Not Meaning

A primitive:

```text
red.600
```

does not automatically mean:

```text
danger
```

The semantic layer establishes that meaning.

---

# 38. Semantic Color Families

The canonical semantic color model SHOULD cover at least:

```text
background
surface
text
icon
border
action
focus
status
selection
```

where applicable.

---

# 39. Surface Tokens

Example:

```text
color.surface.canvas
color.surface.default
color.surface.subtle
color.surface.elevated
color.surface.overlay
```

---

# 40. Text Tokens

Example:

```text
color.text.primary
color.text.secondary
color.text.muted
color.text.disabled
color.text.inverse
color.text.link
```

---

# 41. Border Tokens

Example:

```text
color.border.default
color.border.subtle
color.border.strong
color.border.focus
color.border.danger
```

---

# 42. Action Tokens

Example:

```text
color.action.primary
color.action.primary.hover
color.action.primary.active
color.action.primary.foreground
```

---

# 43. Status Tokens

Recommended roles:

```text
info
success
warning
danger
```

Additional roles MAY be introduced only when semantically necessary.

---

# 44. Status Color Is Not Enough

Status MUST NOT be communicated solely through color.

Tokens support presentation; Accessibility Guidelines govern meaning.

---

# 45. Interactive States

Interactive components SHOULD define required states explicitly:

```text
default
hover
active
focus
disabled
selected
```

as applicable.

---

# 46. Do Not Derive States Ad Hoc

Avoid product code such as:

```text
hover = darken(primary, 15%)
```

when an approved semantic hover token exists.

---

# 47. Programmatic Color Derivation

Programmatic derivation MAY exist inside the token build/generation system.

Consumers SHOULD receive approved resolved tokens.

---

# 48. Color Accessibility

Token combinations intended for foreground/background use MUST be validated against accessibility requirements.

---

# 49. Text Contrast

Semantic text/background combinations intended for ordinary text MUST meet the applicable WCAG contrast requirement.

---

# 50. Large Text Contrast

Large-text combinations MUST meet the applicable large-text threshold.

---

# 51. Non-Text Contrast

Required visual UI boundaries and states MUST meet applicable non-text contrast requirements.

---

# 52. Contrast Is Pairwise

A color token cannot be declared:

```text
accessible
```

in isolation.

Accessibility depends on its paired background/context.

---

# 53. Token Pair Documentation

Critical semantic foreground tokens SHOULD document compatible surface tokens.

---

# 54. Brand Color Exception

A brand color that fails accessibility on a particular background MUST NOT be used for required readable content merely because it is the official brand color.

---

# 55. Decorative Colors

Decorative tokens MAY use combinations not suitable for text.

Their names SHOULD make their non-semantic/decorative role clear.

---

# 56. Alpha Colors

Opacity-bearing colors MAY be tokens when transparency is an intentional design decision.

---

# 57. Avoid Hidden Contrast Dependence

Semi-transparent semantic text/border tokens SHOULD be tested against every supported surface on which they may appear.

---

# 58. Modern Color Spaces

The canonical token system MAY use modern color spaces when the supported toolchain can preserve them consistently.

---

# 59. Platform Transformation

If platforms require different color representations, transformation SHOULD happen during token compilation—not through independent manual palettes.

---

# 60. Dark Mode

Dark mode MUST be implemented primarily by remapping semantic tokens.

---

# 61. Dark Mode Architecture

Preferred:

```text
color.surface.default
color.text.primary
color.border.default
```

resolve differently according to theme.

Avoid feature code containing duplicated:

```text
light value
dark value
```

for every component.

---

# 62. Primitive Palettes May Remain Constant

Theme changes usually alter semantic mappings.

They do not necessarily require a completely separate primitive palette structure.

---

# 63. Dark Mode Is Not Color Inversion

Do not implement dark mode as:

```text
invert(light mode)
```

---

# 64. Dark Mode Surface Hierarchy

Dark-mode surfaces SHOULD preserve meaningful elevation/hierarchy while avoiding excessive arbitrary shades.

---

# 65. Dark Mode Contrast

Dark-mode token combinations MUST independently pass accessibility testing.

Passing in light mode does not imply passing in dark mode.

---

# 66. Dark Mode Saturation

Highly saturated colors MAY require different semantic values in dark mode to preserve readability and visual comfort.

---

# 67. Dark Mode Shadows

Shadows often behave differently on dark surfaces.

Elevation MAY require:

```text
border
highlight
surface shift
shadow
```

or combinations rather than merely reusing light-mode shadows.

---

# 68. Theme Preference

Theme selection SHOULD support:

```text
system
light
dark
```

unless product requirements differ.

---

# 69. System Theme

Web applications SHOULD respect the system preference when the user selects system/default mode.

---

# 70. Explicit Theme Choice

An explicit user theme choice SHOULD override system preference.

---

# 71. Theme Persistence

Theme preference SHOULD persist according to State/Configuration architecture.

---

# 72. No Theme Flash

SSR/web applications SHOULD avoid obvious light/dark theme flashes during initial rendering.

---

# 73. Pre-Hydration Theme Resolution

Where required, theme state SHOULD be resolved before visually significant rendering.

---

# 74. Theme Is Broader Than Dark Mode

The token architecture MAY support:

```text
brand themes
high-contrast themes
density themes
customer themes
```

but each additional theme adds combinatorial complexity.

---

# 75. Theme Proliferation

Do not create themes without a product requirement.

---

# 76. Semantic Stability Across Themes

A token such as:

```text
color.status.danger
```

MUST retain the same semantic meaning across themes even if its resolved value changes.

---

# 77. Theme Override Scope

Theme overrides SHOULD occur at the semantic layer.

Primitive-level duplication SHOULD be minimized.

---

# 78. High-Contrast Mode

Products MAY define explicit high-contrast token contexts.

Platform-native forced/high-contrast behavior MUST remain usable and MUST NOT be defeated solely to preserve branding.

---

# 79. Forced Colors

Web components SHOULD remain functional under user-agent forced-color modes where applicable.

---

# 80. Typography Tokens

Typography MUST be systematized through tokens for:

```text
font family
font size
font weight
line height
letter spacing
```

and composite text styles where useful.

---

# 81. Font Family Tokens

Example:

```text
font.family.sans
font.family.mono
```

---

# 82. Font Stack

Font-family tokens SHOULD include appropriate fallback stacks.

---

# 83. Script Coverage

Font selections MUST support the scripts required by Internationalization Guidelines.

---

# 84. Typography Primitive Scale

Primitive font sizes MAY use an intentionally limited scale.

Example:

```text
font.size.12
font.size.14
font.size.16
font.size.18
font.size.20
font.size.24
...
```

---

# 85. Semantic Typography

Product code SHOULD generally consume semantic typography roles such as:

```text
typography.body.sm
typography.body.md
typography.label.md
typography.heading.sm
typography.heading.lg
```

---

# 86. Typography Composite Tokens

A typography token MAY combine:

```text
font family
size
weight
line height
letter spacing
```

when those properties form one intentional style.

---

# 87. Avoid Arbitrary Text Styles

Do not create:

```text
font-size: 17px
line-height: 21px
font-weight: 563
```

inside feature code without a design-system reason.

---

# 88. Typography Hierarchy

The system SHOULD define a limited hierarchy for:

```text
display
heading
body
label
caption/code
```

according to product needs.

---

# 89. Typography Semantics

`heading.lg` describes role/scale.

It MUST NOT imply an HTML heading level.

Semantic HTML heading structure follows Accessibility/Layout Guidelines.

---

# 90. Font Size Accessibility

Typography tokens MUST support browser/user zoom and text scaling.

---

# 91. Web Font Units

Web typography SHOULD generally use scalable units such as:

```text
rem
```

for font sizes.

---

# 92. Pixel Use

Pixels MAY be used in generated artifacts where appropriate, but the web implementation MUST preserve accessibility scaling behavior.

---

# 93. Line Height

Body typography SHOULD use sufficient line height for readability.

---

# 94. Unitless Line Height

Unitless multipliers are often preferable for reusable web typography.

---

# 95. Tight Heading Line Height

Large headings MAY use tighter line-height than body copy while maintaining legibility across supported scripts.

---

# 96. Letter Spacing

Letter-spacing tokens SHOULD be used sparingly.

---

# 97. Script-Sensitive Typography

Latin-specific letter spacing MUST NOT be blindly applied to every script.

---

# 98. Font Weight

Define a bounded weight set appropriate to the selected fonts.

---

# 99. Synthetic Weight

Avoid relying on browser-synthesized unsupported font weights where visual consistency matters.

---

# 100. Variable Fonts

Variable fonts MAY use approved axis values through tokens or styles.

Do not expose arbitrary variation settings throughout product code.

---

# 101. Monospace Typography

Code/identifier surfaces SHOULD use a dedicated approved monospace stack where appropriate.

---

# 102. Spacing Tokens

Spacing MUST use a deliberate scale.

---

# 103. Spacing Purpose

Spacing tokens govern:

```text
padding
gap
margin where system-owned
layout rhythm
component internal spacing
```

---

# 104. Spacing Scale

A scale SHOULD be:

```text
small enough to govern
large enough to cover real needs
mathematically coherent enough to feel related
```

---

# 105. Example Spacing Scale

Conceptually:

```text
space.0
space.1
space.2
space.3
space.4
space.6
space.8
space.12
space.16
```

Exact values belong to the token source.

---

# 106. Spacing Base

A system MAY use a 4px-equivalent base rhythm.

It MUST NOT force every dimension to be a multiple of four where optical or accessibility requirements justify otherwise.

---

# 107. Semantic Spacing

High-level patterns MAY define semantic spacing:

```text
space.page.gutter
space.section
space.form.field
space.control.inline
```

where this improves system consistency.

---

# 108. Primitive Spacing Consumption

Design-system implementation MAY compose primitives.

Feature code SHOULD prefer component/layout APIs over choosing arbitrary primitive spacing directly.

---

# 109. No Arbitrary Spacing

Avoid:

```text
margin-top: 13px
gap: 19px
```

without a documented exception.

---

# 110. Optical Exceptions

Small optical adjustments MAY require values outside the main scale.

They SHOULD remain encapsulated in the owning component rather than becoming new global tokens automatically.

---

# 111. Negative Spacing

Negative spacing tokens SHOULD NOT be part of the default scale unless a legitimate recurring pattern requires them.

---

# 112. Layout Spacing vs Component Spacing

Different semantic layers MAY map to the same primitive value.

Do not create different primitive values merely because contexts differ.

---

# 113. Sizing Tokens

Repeated control/icon/container dimensions MAY be tokenized.

Examples:

```text
size.control.sm
size.control.md
size.icon.sm
size.icon.md
```

---

# 114. Do Not Tokenize Every Dimension

A one-off responsive container width does not automatically deserve a global token.

Tokenization requires reuse or semantic importance.

---

# 115. Control Heights

Control size tokens SHOULD align:

```text
button
input
select
combobox
```

where the design intends consistent sizing.

---

# 116. Touch Targets

Visual control size tokens MUST NOT undermine required accessible target sizes.

---

# 117. Icon Sizes

Define a small, consistent icon-size scale.

---

# 118. Avatar Sizes

Avatar sizes MAY be semantic component tokens when reused broadly.

---

# 119. Radius Tokens

Corner radius SHOULD use a bounded scale.

Example:

```text
radius.none
radius.sm
radius.md
radius.lg
radius.full
```

---

# 120. Radius Semantics

Components SHOULD consume semantic radius decisions where appropriate.

Examples:

```text
radius.control
radius.surface
radius.overlay
```

---

# 121. Radius Consistency

Buttons, inputs, cards, dialogs, and menus SHOULD not each invent unrelated radii.

---

# 122. Full Radius

`radius.full` MAY represent pills/circular surfaces.

It SHOULD NOT be used indiscriminately.

---

# 123. Nested Radius

Nested surfaces SHOULD account for geometry.

Inner radius may need to derive from:

```text
outer radius
-
inset
```

rather than blindly using the same value.

---

# 124. Radius and Brand

Brand expression MAY influence the radius scale.

The resulting scale still requires system governance.

---

# 125. Border Width Tokens

Repeated border/stroke widths SHOULD use bounded tokens such as:

```text
border.width.default
border.width.strong
```

---

# 126. Hairline Borders

Platform-specific hairline rendering MAY require transformed output rather than a universal raw pixel assumption.

---

# 127. Elevation

Elevation communicates:

```text
layering
separation
focus
overlay hierarchy
```

It MUST NOT become decorative noise.

---

# 128. Elevation Tokens

Recommended semantic scale:

```text
elevation.none
elevation.low
elevation.medium
elevation.high
elevation.overlay
```

Exact implementation MAY involve shadow and surface changes.

---

# 129. Shadow Tokens

Primitive/composite shadows SHOULD encode:

```text
offset
blur
spread
color
```

through the token system.

---

# 130. Do Not Invent Shadows

Feature components SHOULD NOT define arbitrary box-shadow strings.

---

# 131. Elevation Is Not Z-Index

Visual elevation and stacking order are related but distinct.

---

# 132. Layer Tokens

Stacking MAY use semantic tokens such as:

```text
layer.base
layer.sticky
layer.dropdown
layer.overlay
layer.modal
layer.toast
```

---

# 133. Avoid Arbitrary Z-Index

Bad:

```text
z-index: 999999
```

Use the governed layer model.

---

# 134. Layer Ordering

The layer system MUST define relative hierarchy.

---

# 135. Z-Index Context

Tokens cannot override CSS stacking-context rules.

Component architecture must still avoid accidental stacking contexts.

---

# 136. Dark-Mode Elevation

Dark themes MAY use different:

```text
shadow colors
surface tones
borders
highlight edges
```

while preserving elevation semantics.

---

# 137. Motion Tokens

Motion SHOULD be governed through:

```text
duration
easing
distance
```

where repeated.

---

# 138. Motion Purpose

Motion exists to communicate:

```text
relationship
state transition
focus
progress
spatial continuity
```

not merely decoration.

---

# 139. Duration Scale

Example:

```text
motion.duration.instant
motion.duration.fast
motion.duration.normal
motion.duration.slow
```

---

# 140. Avoid Arbitrary Durations

Feature code SHOULD NOT invent:

```text
173ms
427ms
```

unless interaction testing demonstrates a specific need.

---

# 141. Easing Tokens

Example:

```text
motion.easing.standard
motion.easing.enter
motion.easing.exit
motion.easing.emphasized
```

---

# 142. Enter/Exit Motion

Entering and exiting elements MAY intentionally use different easing/duration.

---

# 143. Motion Distance

Repeated translation distances MAY use semantic tokens.

---

# 144. Motion Composites

A transition token MAY combine:

```text
duration
delay
timing function
```

where supported.

---

# 145. Reduced Motion

The design token architecture MUST support reduced-motion behavior.

---

# 146. Reduced Motion Is Not Always Zero Motion

Reduced-motion mode MAY:

```text
remove large movement
shorten animation
replace spatial animation with fade
```

while preserving useful state feedback.

---

# 147. Motion Semantics Remain

A semantic transition:

```text
motion.dialog.enter
```

MAY resolve differently under reduced-motion preference.

---

# 148. No Essential Information Through Motion Alone

Motion MUST NOT be the only means of communicating required state.

---

# 149. Loading Motion

Loading indicators SHOULD follow accessibility/motion guidelines and remain understandable when animation is reduced.

---

# 150. Opacity Tokens

Repeated opacity levels MAY be tokenized.

Example:

```text
opacity.disabled
opacity.scrim
```

---

# 151. Disabled State

Do not solve disabled styling solely through low opacity if resulting text/control contrast becomes unusable.

---

# 152. Scrim Tokens

Overlay scrims SHOULD use semantic values:

```text
color.overlay.scrim
```

rather than arbitrary black-alpha values scattered through code.

---

# 153. Breakpoints

Responsive breakpoints SHOULD be governed centrally.

---

# 154. Breakpoints Are Behavioral Thresholds

A breakpoint exists because a layout needs to recompose.

It is not:

```text
a list of popular device widths
```

---

# 155. Content-Driven Breakpoints

Choose breakpoints based on:

```text
content fit
layout behavior
interaction constraints
```

rather than named devices.

---

# 156. Breakpoint Names

Prefer abstract ordered names such as:

```text
breakpoint.sm
breakpoint.md
breakpoint.lg
breakpoint.xl
```

over:

```text
breakpoint.iphone
breakpoint.ipad
breakpoint.desktop
```

---

# 157. Breakpoint Stability

Changing the value of a globally used breakpoint can affect many layouts.

Treat it as a breaking system change.

---

# 158. Breakpoint Count

Use the smallest number of global breakpoints that adequately supports the application.

---

# 159. Global vs Container Breakpoints

Global viewport breakpoints SHOULD NOT be used when a component's behavior depends on its own available container width.

---

# 160. Container Queries

Reusable components SHOULD prefer container-relative adaptation when their composition depends on container size rather than viewport size.

---

# 161. Container Breakpoint Tokens

Reusable layout/component primitives MAY define container thresholds separately from global viewport breakpoints.

---

# 162. Breakpoint Values in Product Code

Do not scatter raw media values such as:

```text
@media (min-width: 947px)
```

through feature code.

Use governed responsive abstractions/tokens.

---

# 163. Mobile-First

Where the framework follows mobile-first responsive behavior, breakpoint tokens SHOULD integrate consistently with that convention.

---

# 164. Breakpoint Units

Web breakpoint units SHOULD be chosen deliberately.

If user font scaling should influence layout threshold, relative units MAY be preferable.

---

# 165. Token vs Configuration

Breakpoints may require framework-specific configuration output.

The canonical decision still belongs to the token/foundation system.

---

# 166. Responsive Tokens Are Not Variants of Everything

Do not create:

```text
space.mobile.*
space.tablet.*
space.desktop.*
```

for the entire token system by default.

Responsive differences should be introduced only where meaningful.

---

# 167. Density

Density MAY be represented through semantic contexts such as:

```text
comfortable
compact
```

when product requirements justify multiple density modes.

---

# 168. Density Tokens

Density MAY alter:

```text
control size
spacing
table row height
```

while preserving accessibility.

---

# 169. Density Must Not Shrink Accessibility Away

Compact mode MUST NOT reduce essential:

```text
touch targets
focus visibility
text readability
```

below required thresholds.

---

# 170. Component Tokens

Component tokens SHOULD be introduced when:

```text
the component is reusable
the decision is stable
multiple implementations need the value
semantic global tokens are insufficient
```

---

# 171. Do Not Tokenize Every CSS Property

Bad:

```text
button.padding.left
button.padding.right
button.text.offset
button.icon.offset
```

for values that are ordinary internal implementation details.

---

# 172. Component Token Threshold

Create a component token when the value forms part of the component's stable design contract.

---

# 173. Component Token Example

```text
button.primary.background
→ color.action.primary

button.primary.foreground
→ color.text.on-primary

button.radius
→ radius.control
```

---

# 174. Component Alias

Component tokens SHOULD alias semantic tokens rather than raw primitives where possible.

---

# 175. Component Variant Tokens

Variants MAY include:

```text
primary
secondary
ghost
destructive
```

only when they correspond to established component variants.

---

# 176. State Tokens

State-specific component tokens MAY include:

```text
default
hover
active
focus
disabled
selected
```

where implementation needs explicit values.

---

# 177. Token Explosion

Avoid generating every theoretical combination:

```text
component
× variant
× state
× theme
× density
× platform
```

as independent manually authored tokens.

Use inheritance/resolution.

---

# 178. Semantic Surface First

Before adding a new component color token, ask whether an existing semantic token already expresses the intent.

---

# 179. Product-Specific Tokens

A product/domain MAY define higher-level tokens only when the decision is genuinely shared across that domain.

---

# 180. One-Off Styling

A one-off visual exception SHOULD normally remain local rather than polluting the global token system.

---

# 181. Repeated Exception

If the same exception appears repeatedly, evaluate whether a missing semantic token exists.

---

# 182. Token Naming by Purpose

Good:

```text
color.status.success.foreground
```

Bad:

```text
color.green.text
```

at the semantic level.

---

# 183. Inverse Tokens

Use explicit inverse/on-color roles.

Examples:

```text
color.text.inverse
color.text.on-primary
```

where necessary.

---

# 184. "White" Semantic Token

Avoid semantic names such as:

```text
color.text.white
```

unless white itself is truly the invariant design requirement.

---

# 185. Semantic Neutrality

Theme-aware roles SHOULD avoid encoding one theme's actual appearance.

---

# 186. Focus Tokens

Focus indication SHOULD have dedicated semantic tokens.

Example:

```text
color.focus.ring
size.focus.ring
space.focus.offset
```

where appropriate.

---

# 187. Focus Visibility

Focus tokens MUST result in a clearly visible keyboard focus indicator.

---

# 188. Selected vs Focused

Do not use one token/state to represent both:

```text
selected
```

and:

```text
keyboard focus
```

They are distinct states.

---

# 189. Disabled vs Muted

Disabled content and low-emphasis content MUST NOT use the same semantic concept automatically.

---

# 190. Danger vs Brand Red

Destructive state colors SHOULD use:

```text
color.status.danger
```

not direct brand/palette red.

---

# 191. Data Visualization Tokens

Charts MAY define dedicated categorical/sequential/diverging palettes.

---

# 192. Data Visualization Accessibility

Chart palettes MUST consider:

```text
contrast
color blindness
adjacent distinction
dark mode
```

---

# 193. Chart Categories

Categorical colors SHOULD remain distinguishable without relying solely on hue where accessibility requires additional markers/patterns.

---

# 194. Do Not Use UI Status Palette Blindly for Charts

Status semantics and chart categorical semantics are different.

---

# 195. Visualization Scale

Large arbitrary chart palettes SHOULD NOT be added to the main UI palette unless required.

---

# 196. Brand Tokens

Brand-specific decisions MAY use a dedicated namespace:

```text
brand.color.primary
brand.logo.*
```

---

# 197. Brand Primitive vs Product Semantic

Brand colors SHOULD feed semantic application tokens rather than be used everywhere directly.

---

# 198. Multi-Brand Systems

Multi-brand products SHOULD preserve stable semantic token names while changing brand mappings.

---

# 199. Customer Theming

Customer-configurable themes MUST be constrained.

Do not accept arbitrary color choices that make product content inaccessible.

---

# 200. Theme Validation

Custom themes SHOULD validate:

```text
contrast
required semantic roles
supported token values
```

before activation.

---

# 201. Theme Escape Hatches

Do not permit customer CSS injection merely to implement theming.

---

# 202. CSS Custom Properties

Web semantic tokens SHOULD generally compile to CSS custom properties.

Example:

```text
--color-surface-default
--color-text-primary
--radius-control
```

---

# 203. CSS Variable Naming

Generated variable names SHOULD deterministically derive from canonical token names.

---

# 204. Do Not Author CSS Variables Separately

Generated token variables SHOULD NOT be manually duplicated in unrelated CSS files.

---

# 205. Root Theme Scope

Global semantic tokens MAY be defined at:

```text
:root
```

with theme overrides on:

```text
[data-theme="dark"]
```

or an equivalent system.

---

# 206. Local Theme Scope

Scoped theme contexts MAY override semantic tokens for embedded experiences when deliberately designed.

---

# 207. Avoid Deep Theme Overrides

Feature CSS SHOULD NOT override arbitrary global semantic token values locally merely to force one component appearance.

Use component variants or explicit local tokens.

---

# 208. Tailwind Integration

Tailwind utilities SHOULD map to the governed token system.

---

# 209. No Parallel Tailwind Palette

The application SHOULD NOT maintain:

```text
canonical token palette
+
independent Tailwind product palette
```

with different values.

---

# 210. Semantic Utilities

Product code SHOULD prefer semantic classes such as those ultimately backed by:

```text
background
foreground
muted
border
primary
destructive
```

roles.

---

# 211. Arbitrary Tailwind Values

Arbitrary values such as:

```text
mt-[13px]
bg-[#173F5F]
rounded-[11px]
```

SHOULD NOT appear in ordinary product code without a documented reason.

---

# 212. shadcn/ui Integration

The shadcn/ui implementation layer SHOULD consume the canonical semantic tokens through CSS variables/theming.

---

# 213. shadcn Is Consumer, Not Token Authority

The default shadcn token names MAY be mapped to the organization's semantic token model.

shadcn/ui does not independently define the canonical design foundation.

---

# 214. Component Customization

When adapting shadcn components:

```text
tokens
→ component variant
→ implementation
```

is preferred over hard-coded CSS overrides.

---

# 215. Platform Outputs

The same canonical tokens MAY compile to:

```text
Web CSS
Tailwind
React Native
Swift
Android resources
documentation
design tools
```

---

# 216. Platform-Specific Transformation

Transformation MAY convert:

```text
rem → platform units
color representation
font naming
shadow models
```

as needed.

---

# 217. Semantic Meaning Must Survive Transformation

A transformed token MUST retain the intended semantic role.

---

# 218. Platform-Specific Token

A platform-specific token SHOULD be introduced only when the platform genuinely requires a distinct design decision.

---

# 219. Avoid Lowest-Common-Denominator Tokens

Cross-platform tokens SHOULD NOT erase valuable native behavior merely to force identical implementation everywhere.

---

# 220. Native Conventions

Platforms MAY map semantic tokens differently to preserve native:

```text
accessibility
typography
elevation
motion
```

conventions.

---

# 221. Theme Resolution

Theme resolution SHOULD be deterministic.

Given:

```text
token
theme
platform
mode
```

the build/runtime MUST resolve one valid value.

---

# 222. Resolver Context

Supported contexts MAY include:

```text
light
dark
high contrast
brand
platform
density
```

only where required.

---

# 223. Context Precedence

Override precedence MUST be explicit.

Example conceptually:

```text
base
↓
brand
↓
mode
↓
high contrast
```

The exact precedence is system-defined.

---

# 224. Ambiguous Resolution

A token with multiple equally applicable unresolved values MUST fail validation rather than choose unpredictably.

---

# 225. Token Compilation

Generated token output MUST be reproducible.

---

# 226. Deterministic Build

The same:

```text
source
tool version
configuration
```

SHOULD produce the same token output.

---

# 227. Generated Files

Generated token outputs SHOULD be clearly identified as generated.

---

# 228. Do Not Edit Generated Output

Developers MUST NOT manually edit generated token artifacts.

Changes belong in the authoritative token source or transformation configuration.

---

# 229. Token Tooling Pinning

Token transformation/build dependencies SHOULD be version-pinned according to Dependency Guidelines.

---

# 230. Build Failure

Compilation MUST fail for:

```text
invalid references
cycles
invalid types
missing required contexts
duplicate conflicting names
```

---

# 231. Unused Tokens

CI or periodic tooling SHOULD identify unused/dead tokens.

---

# 232. Unresolved Tokens

No unresolved token references may reach production output.

---

# 233. Token Documentation

Every important token category SHOULD have documentation covering:

```text
meaning
usage
examples
anti-patterns
theme behavior
accessibility
```

---

# 234. Token Explorer

A token explorer/catalog SHOULD display:

```text
canonical name
resolved value
aliases
light/dark variants
description
usage
```

where practical.

---

# 235. Visual Documentation

Color, typography, spacing, radius, elevation, and motion tokens SHOULD have visual examples.

---

# 236. Alias Visibility

Documentation SHOULD allow engineers to understand:

```text
component token
→ semantic token
→ primitive
```

without inspecting generated code manually.

---

# 237. Token Governance

Global tokens are governed shared infrastructure.

Anyone MAY propose a token.

Not every proposed token SHOULD be accepted.

---

# 238. New Token Criteria

Before adding a token ask:

```text
Is the design decision repeated?
Is it semantically meaningful?
Is an existing token appropriate?
Will multiple consumers use it?
Does it belong globally, semantically, or locally?
Will its name remain useful if the visual value changes?
```

---

# 239. Do Not Tokenize Every Constant

Token systems fail when they become catalogs of every number or color ever used.

---

# 240. Token Value Change

Changing a token's value requires considering every consumer.

---

# 241. Primitive Change Impact

Changing:

```text
color.blue.600
```

can affect multiple semantic tokens.

Impact analysis SHOULD identify consumers.

---

# 242. Semantic Change Impact

Changing:

```text
color.text.primary
```

is usually higher impact because its meaning is consumed broadly.

---

# 243. Token Name Change

Renaming/removing a public/shared token requires a migration strategy.

---

# 244. Token Lifecycle

Recommended lifecycle:

```text
Proposed
↓
Experimental
↓
Stable
↓
Deprecated
↓
Removed
```

for larger systems where maturity states add value.

---

# 245. Experimental Tokens

Experimental tokens SHOULD NOT become broad dependencies until stabilized.

---

# 246. Stable Tokens

Stable tokens require compatibility discipline.

---

# 247. Deprecation

Deprecated tokens SHOULD include:

```text
replacement
reason
deprecation version/date
removal target
```

---

# 248. Deprecation Alias

A deprecated token MAY temporarily alias its replacement during migration.

---

# 249. Do Not Preserve Deprecated Tokens Forever

Token debt SHOULD be actively removed.

---

# 250. Breaking Token Change

Examples include:

```text
removing a token
renaming a token
changing semantic meaning
changing output type
```

---

# 251. Non-Breaking Value Adjustment

A visual value adjustment MAY be non-breaking at the API level but still requires visual/accessibility regression review.

---

# 252. Token Change Review

Significant token changes SHOULD include:

```text
before/after
affected components
themes
accessibility results
migration notes
```

---

# 253. Visual Regression

Token changes SHOULD run visual regression against representative components/pages.

---

# 254. Accessibility Regression

Color, typography, sizing, focus, and motion token changes MUST run relevant accessibility checks.

---

# 255. Theme Regression

A change affecting semantic tokens MUST be evaluated in every supported theme.

---

# 256. RTL/Localization Regression

Spacing/typography/layout-related token changes SHOULD be tested with:

```text
RTL
long translations
non-Latin scripts
```

where relevant.

---

# 257. Component Regression

Global token changes MUST be evaluated against representative:

```text
buttons
forms
tables
dialogs
navigation
alerts
```

rather than only the token specimen page.

---

# 258. No Screenshot-Only Approval

Visual review alone is insufficient for:

```text
contrast
token schema
alias validity
theme coverage
```

Automated validation SHOULD complement visual review.

---

# 259. Design-to-Code Parity

Design and implementation SHOULD resolve from the same token semantics.

---

# 260. Drift Detection

Tooling SHOULD identify meaningful drift between:

```text
design-tool tokens
canonical token source
generated implementation
```

where integrations permit.

---

# 261. Figma Variables

Figma variables/styles MAY mirror canonical tokens.

Names and collections SHOULD follow the same semantic architecture.

---

# 262. Figma Collection Strategy

Collections MAY correspond to:

```text
primitives
semantic themes
component tokens
```

only if this remains understandable to designers.

---

# 263. Figma Modes

Modes MAY represent:

```text
light
dark
brand
```

but SHOULD NOT create uncontrolled Cartesian combinations.

---

# 264. Design Tool Overrides

A designer SHOULD NOT introduce new global values in mockups without either:

```text
using an approved token
or
proposing a token/system change
```

---

# 265. Prototype Exception

Exploratory work MAY temporarily use untokenized values.

Before implementation/design-system promotion, those values MUST be reconciled.

---

# 266. Engineering Escape Hatch

Feature implementation MAY temporarily use an untokenized value when:

```text
requirement is exceptional
token is inappropriate
design review approves
```

The exception SHOULD remain local and documented.

---

# 267. Repeated Escape Hatch

Repeated exceptions indicate:

```text
missing token
missing component
or
incorrect pattern
```

and SHOULD trigger system review.

---

# 268. Token Ownership

The token foundation SHOULD have an explicit owning team or governance group.

---

# 269. Ownership Responsibilities

Owners are responsible for:

```text
naming
architecture
accessibility
tooling
review
documentation
migration
deprecation
```

---

# 270. Contribution Process

Token proposals SHOULD include:

```text
problem
existing alternatives
proposed name
proposed value/mapping
usage examples
theme behavior
accessibility impact
```

---

# 271. Design Review

Visual token changes SHOULD receive design-system review.

---

# 272. Accessibility Review

New semantic color/focus/motion tokens SHOULD receive accessibility review.

---

# 273. Engineering Review

Token schema/build/resolution changes SHOULD receive engineering review.

---

# 274. Brand Review

Brand tokens MAY require brand/design approval.

---

# 275. Token Changelog

Shared token packages SHOULD maintain a change history.

---

# 276. Release Versioning

Token packages SHOULD follow the organization's Release & Versioning Guidelines.

---

# 277. Package Consumer Compatibility

Token outputs consumed across repositories MUST define compatibility and upgrade strategy.

---

# 278. Token Package

Large systems SHOULD distribute resolved tokens through a versioned package/artifact rather than copying files manually.

---

# 279. No Copy-Paste Distribution

Do not distribute token updates through:

```text
copy this CSS file into your repo
```

as the normal architecture.

---

# 280. Token Security

Design-token files rarely contain secrets and MUST NOT become a place to store them.

---

# 281. No Sensitive Data

Tokens MUST NOT contain:

```text
API keys
customer identifiers
credentials
private URLs
```

---

# 282. Customer Brand Data

Customer-provided theme values MAY be configuration/data, not canonical global tokens.

Keep the distinction explicit.

---

# 283. Performance

Token architecture SHOULD avoid excessive runtime computation.

---

# 284. Runtime CSS Variables

Semantic CSS variables are generally appropriate for themeable web applications.

---

# 285. Excessive Variables

Do not emit thousands of unused CSS variables merely because every primitive exists in source.

Build tooling MAY tree-shake or scope outputs where appropriate.

---

# 286. Theme Payload

Theme support SHOULD avoid downloading huge unused token sets.

---

# 287. Font Performance

Typography token decisions affecting web fonts MUST account for:

```text
font loading
subset strategy
weight count
layout shift
```

according to Performance Guidelines.

---

# 288. Motion Performance

Motion tokens SHOULD favor properties that can animate efficiently where visual requirements permit.

---

# 289. Expensive Shadow Effects

Elevation design SHOULD consider rendering cost, especially for:

```text
large blurred shadows
animated shadows
many layered surfaces
```

---

# 290. Observability

Design tokens generally do not require runtime telemetry.

Governance SHOULD instead track:

```text
usage
deprecated token adoption
build failures
drift
accessibility regressions
```

---

# 291. Token Usage Analysis

Tooling MAY report:

```text
most used tokens
unused tokens
direct primitives in feature code
arbitrary values
deprecated usage
```

---

# 292. Linting

Lint rules SHOULD prevent common violations.

Examples:

```text
raw hex in product component
arbitrary radius
deprecated token
direct primitive usage
invalid token reference
```

---

# 293. Raw Color Linting

Feature code SHOULD fail lint/review for arbitrary:

```text
#RRGGBB
rgb()
hsl()
```

values unless explicitly allowed.

---

# 294. Arbitrary Spacing Linting

Lint MAY flag Tailwind arbitrary spacing values outside approved exceptions.

---

# 295. Token Coverage

Design-system components SHOULD have high token coverage.

Feature-level product code SHOULD increasingly depend on component APIs rather than raw token manipulation.

---

# 296. Testing — Token Schema

Tests MUST cover:

```text
valid schema
valid type
reference resolution
cycle detection
required modes
generated output
```

---

# 297. Testing — Color

Test semantic foreground/background pairs for required contrast.

---

# 298. Testing — Dark Mode

Test representative components/screens in:

```text
light
dark
```

and any other supported modes.

---

# 299. Testing — Typography

Test:

```text
zoom
text scaling
long copy
non-Latin scripts
font fallback
```

---

# 300. Testing — Spacing

Visual regression SHOULD detect systemic spacing/rhythm changes.

---

# 301. Testing — Motion

Test:

```text
normal motion
reduced motion
```

where motion tokens apply.

---

# 302. Testing — Breakpoints

Responsive tests SHOULD exercise values around breakpoint boundaries.

Example:

```text
breakpoint - 1
breakpoint
breakpoint + 1
```

---

# 303. Testing — Themes

Custom/multi-brand themes SHOULD run automated token completeness and accessibility tests.

---

# 304. Testing — Token Migration

Renamed/deprecated tokens SHOULD have tests preventing accidental reintroduction of removed names.

---

# 305. Review Checklist — New Primitive Token

```text
□ Repeated raw value exists
□ Value belongs to system palette/scale
□ Existing primitive cannot serve need
□ Type correct
□ Naming consistent
□ Cross-platform representation viable
□ Documentation added
```

---

# 306. Review Checklist — New Semantic Token

```text
□ Stable semantic concept
□ Meaning clear
□ Existing semantic token insufficient
□ Primitive mapping
□ Light mapping
□ Dark mapping
□ Accessibility validated
□ Description
□ Consumer examples
```

---

# 307. Review Checklist — New Component Token

```text
□ Reusable component contract
□ Existing semantic token insufficient directly
□ Semantic alias preferred
□ Variants/states bounded
□ Theme support
□ Naming follows component
□ Does not create token explosion
```

---

# 308. Color Checklist

```text
□ Primitive palette bounded
□ Semantic role
□ Light mode
□ Dark mode
□ Contrast pair tested
□ Hover/active/focus
□ Disabled semantics
□ Not color-only communication
□ No arbitrary feature hex
```

---

# 309. Typography Checklist

```text
□ Font family
□ Fallback stack
□ Font size
□ Weight
□ Line height
□ Letter spacing
□ Zoom safe
□ Script coverage
□ Localization expansion
□ Performance impact
```

---

# 310. Spacing Checklist

```text
□ Approved scale
□ Existing token reused
□ Layout/component scope correct
□ No arbitrary one-off global token
□ Responsive behavior deliberate
□ Density implications considered
```

---

# 311. Radius Checklist

```text
□ Approved radius scale
□ Semantic/component mapping
□ Nested geometry
□ Consistent controls/surfaces
□ Full/pill use justified
```

---

# 312. Elevation Checklist

```text
□ Elevation level justified
□ Shadow token
□ Dark-mode behavior
□ Border/surface alternatives considered
□ Layer/z-index distinct
□ Performance acceptable
```

---

# 313. Motion Checklist

```text
□ Motion has purpose
□ Approved duration
□ Approved easing
□ Reduced-motion behavior
□ No essential information only in motion
□ Performance
```

---

# 314. Breakpoint Checklist

```text
□ Content-driven threshold
□ Existing breakpoint insufficient
□ Global vs container query considered
□ Name device-independent
□ Boundary tests
□ Layout impact reviewed
□ Change blast radius understood
```

---

# 315. Dark-Mode Checklist

```text
□ Semantic remapping
□ No simple inversion
□ Foreground/background contrast
□ Status colors
□ Focus
□ Elevated surfaces
□ Shadows/borders
□ Charts
□ Images/icons where relevant
□ No initial flash
```

---

# 316. Token Governance Checklist

```text
□ Owner
□ Source of truth
□ Schema
□ Versioning
□ CI validation
□ Documentation
□ Design-tool sync
□ Generated outputs
□ Deprecation process
□ Changelog
□ Accessibility review
```

---

# 317. Definition of Done — New Token

A shared token is ready when:

```text
✓ Need is demonstrated
✓ Correct layer chosen
✓ Canonical name defined
✓ Type defined
✓ Description exists where needed
✓ Alias/mapping valid
✓ Required themes resolve
✓ Accessibility reviewed
✓ Build output validated
✓ Documentation updated
✓ Tests pass
✓ Owner accepts change
```

---

# 318. Definition of Done — Token Value Change

```text
✓ Consumer impact identified
✓ All themes checked
✓ Visual regression reviewed
✓ Accessibility regression passed
✓ Platform outputs generated
✓ Design-tool parity checked
✓ Migration documented if needed
✓ Changelog updated
```

---

# 319. Definition of Done — New Theme

```text
✓ Theme purpose documented
✓ Semantic token coverage complete
✓ Missing resolution impossible
✓ Contrast passes
✓ Focus states pass
✓ Component suite reviewed
✓ Charts reviewed
✓ Motion considered
✓ Typography considered
✓ RTL/localization reviewed
✓ Performance acceptable
✓ Theme switch/persistence works
```

---

# 320. Definition of Done — Token Deprecation

```text
✓ Replacement identified
✓ Deprecated metadata added
✓ Migration documented
✓ Consumers discoverable
✓ Lint warning available where practical
✓ Removal milestone defined
✓ Removal performed after migration window
```

---

# 321. Design Token Anti-Patterns

Avoid:

```text
#2563EB
```

scattered throughout feature code.

Avoid:

```text
color.blue.600
```

directly in ordinary product UI when meaning is:

```text
color.action.primary
```

Avoid:

```text
color.text.white
```

for a theme-dependent semantic text role.

Avoid:

```text
dark:bg-gray-950
dark:text-gray-100
```

repeated throughout every feature when semantic theme variables can handle it.

Avoid:

```text
dark mode = invert everything
```

Avoid:

```text
new theme
→ copy every token
→ change a few values
```

when semantic overrides would suffice.

Avoid:

```text
button blue
card gray
danger red
```

as global semantic names.

Avoid:

```text
spacing.13
spacing.17
spacing.19
```

because one mockup happened to contain those values.

Avoid:

```text
rounded-[11px]
```

across many components.

Avoid:

```text
box-shadow: arbitrary
```

inside feature code.

Avoid:

```text
z-index: 999999
```

Avoid:

```text
transition: 437ms
```

without system rationale.

Avoid:

```text
animation disabled = accessibility solved
```

without considering reduced-motion semantics.

Avoid:

```text
mobile
tablet
desktop
```

as assumptions tied to named physical devices rather than layout behavior.

Avoid:

```text
@media 847px
@media 913px
@media 967px
```

invented per screen.

Avoid:

```text
Figma says #xxx
CSS says #yyy
Tailwind says #zzz
```

with no single source of truth.

Avoid:

```text
design tokens maintained manually in five repositories
```

Avoid:

```text
generated tokens manually edited
```

Avoid:

```text
primitive
→ component
→ semantic
```

dependency inversion.

Avoid circular aliases.

Avoid alias chains that nobody can explain.

Avoid:

```text
new token for every CSS declaration
```

Avoid:

```text
component × variant × theme × state × density
```

manual Cartesian token explosion.

Avoid:

```text
every one-off design exception becomes global token
```

Avoid:

```text
brand primary
```

used directly as:

```text
error
link
focus
selected
```

because the color happens to look suitable.

Avoid:

```text
contrast checked against white only
```

for a token used across multiple surfaces.

Avoid:

```text
light contrast passed
therefore dark contrast passed
```

Avoid:

```text
opacity 30%
```

as the only disabled-state design without accessibility review.

Avoid:

```text
compact mode
```

that makes targets unusably small.

Avoid:

```text
theme customization = arbitrary customer CSS
```

Avoid:

```text
customer selects any foreground/background pair
```

without validation.

Avoid:

```text
breakpoint changed globally
```

with no regression testing.

Avoid:

```text
design token renamed
```

with no migration.

Avoid:

```text
deprecated forever
```

as token lifecycle.

Avoid:

```text
token value changed
```

without representative component visual review.

---

# 322. AI Design Token Rules

AI coding agents MUST inspect the existing token system before adding visual values.

---

# 323. AI Semantic-First Rule

AI SHOULD prefer:

```text
semantic token
```

over:

```text
primitive token
```

in product code.

---

# 324. AI Raw-Color Rule

AI MUST NOT introduce arbitrary color literals when an appropriate token exists.

---

# 325. AI Primitive Rule

AI MUST NOT create a new primitive merely to satisfy one isolated screen.

---

# 326. AI Token-Layer Rule

AI MUST determine whether a new decision belongs to:

```text
primitive
semantic
component
local implementation
```

before creating a token.

---

# 327. AI Naming Rule

AI SHOULD name tokens according to purpose rather than current visual appearance.

---

# 328. AI Theme Rule

AI MUST preserve semantic token identity across light/dark themes.

---

# 329. AI Dark-Mode Rule

AI SHOULD solve dark mode through semantic remapping rather than scattered conditional classes.

---

# 330. AI Contrast Rule

AI MUST NOT claim a color token is accessible without evaluating its actual foreground/background pairing.

---

# 331. AI Typography Rule

AI SHOULD reuse the approved typography scale rather than inventing new font sizes/weights/line heights.

---

# 332. AI Spacing Rule

AI SHOULD use established spacing/layout primitives rather than arbitrary values.

---

# 333. AI Radius Rule

AI SHOULD use approved radii instead of component-specific arbitrary rounding.

---

# 334. AI Elevation Rule

AI MUST distinguish:

```text
visual elevation
```

from:

```text
stacking order
```

---

# 335. AI Z-Index Rule

AI MUST NOT solve overlay problems with arbitrarily enormous z-index values.

---

# 336. AI Motion Rule

AI SHOULD use approved duration/easing tokens and provide reduced-motion behavior.

---

# 337. AI Breakpoint Rule

AI MUST NOT add a breakpoint merely to fit one device model.

---

# 338. AI Container-Query Rule

AI SHOULD consider container queries before introducing a new viewport breakpoint for reusable components.

---

# 339. AI Tailwind Rule

AI SHOULD avoid arbitrary Tailwind values where the token/design-system vocabulary can express the design.

---

# 340. AI shadcn Rule

AI SHOULD map shadcn/ui customization through the organization's semantic CSS variables/tokens rather than copying hard-coded values into component files.

---

# 341. AI Component-Token Rule

AI MUST NOT create component tokens when existing semantic tokens already express the decision adequately.

---

# 342. AI Token-Explosion Rule

AI SHOULD prefer aliases/context resolution over manually enumerating every theme/state combination.

---

# 343. AI Source-of-Truth Rule

AI MUST modify the authoritative token source rather than generated outputs.

---

# 344. AI Build Rule

AI MUST preserve schema/type/reference validation when modifying tokens.

---

# 345. AI Deprecation Rule

AI SHOULD migrate consumers before removing a shared token.

---

# 346. AI Design-Tool Rule

AI MUST NOT assume a value copied from a design mockup should become a permanent global token.

---

# 347. AI Accessibility Rule

AI SHOULD evaluate token changes against:

```text
contrast
focus
zoom
target size
motion
```

where relevant.

---

# 348. AI Localization Rule

AI SHOULD test typography/spacing changes against:

```text
long copy
RTL
non-Latin scripts
```

where the product supports them.

---

# 349. AI Gold Rule

When uncertain:

```text
Existing component API
>
Existing semantic token
>
Existing primitive token
>
New semantic token
>
New primitive token
>
Arbitrary local value
```

subject to using the narrowest correct abstraction.

And:

```text
Meaning
>
Current appearance
```

for token naming.

---

# 350. Golden Design Token Rules

**1. Design tokens represent governed design decisions, not every visual constant.**

**2. The canonical hierarchy is Primitive → Semantic → Component → Implementation.**

**3. Product code prefers semantic tokens over primitive values.**

**4. Feature code does not scatter raw colors, spacing, radii, shadows, or motion values.**

**5. Every shared token has one authoritative source.**

**6. Design tools, CSS, Tailwind, and native platforms consume the same canonical token semantics.**

**7. Generated token artifacts are not manually edited.**

**8. Token files are schema-validated and type-checked where supported.**

**9. Alias references cannot form cycles.**

**10. Alias chains remain understandable.**

**11. Token names describe semantic purpose rather than current visual appearance.**

**12. Primitive scales may use ordered numeric naming; semantic tokens use meaningful roles.**

**13. Token names are stable contracts and are not renamed casually.**

**14. Token descriptions document non-obvious usage constraints.**

**15. Primitive color palettes are intentionally bounded.**

**16. Semantic color roles cover surfaces, text, borders, actions, focus, and statuses.**

**17. Brand colors do not automatically become application semantic colors.**

**18. Accessibility is evaluated using actual foreground/background token combinations.**

**19. Color is never the only carrier of required state.**

**20. Dark mode is implemented primarily through semantic token remapping.**

**21. Dark mode is not generated by indiscriminate inversion.**

**22. Dark-mode accessibility is validated independently from light mode.**

**23. Theme-specific differences do not change semantic meaning.**

**24. Additional themes are introduced only for concrete product requirements.**

**25. Theme override precedence is deterministic.**

**26. Customer theming is constrained and accessibility-validated.**

**27. Typography is governed through approved family, size, weight, line-height, and spacing decisions.**

**28. User-facing typography supports zoom and text scaling.**

**29. Typography supports every script required by Internationalization Guidelines.**

**30. Latin-specific letter-spacing behavior is not blindly applied globally.**

**31. Spacing uses an intentional bounded scale.**

**32. One-off optical adjustments do not automatically become global tokens.**

**33. Repeated spacing exceptions trigger system review.**

**34. Control and icon sizing use consistent governed dimensions where appropriate.**

**35. Compact density never invalidates accessibility requirements.**

**36. Radius uses a bounded, coherent scale.**

**37. Components do not invent unrelated radii.**

**38. Elevation is used to communicate hierarchy rather than decoration.**

**39. Elevation and z-index are separate concepts.**

**40. Stacking uses semantic layer levels rather than arbitrary giant z-index values.**

**41. Motion uses governed durations and easing.**

**42. Motion exists for communication, not arbitrary decoration.**

**43. Reduced-motion behavior is part of the token model.**

**44. Reduced motion does not necessarily mean eliminating all useful state feedback.**

**45. Responsive breakpoints represent layout behavior, not device brands/models.**

**46. Breakpoint values are centrally governed.**

**47. Reusable components consider container queries before adding viewport-specific breakpoints.**

**48. A global breakpoint change receives system-wide regression review.**

**49. Component tokens exist only for stable reusable component contracts.**

**50. Component tokens prefer aliases to semantic tokens rather than primitives.**

**51. Token systems avoid combinatorial component/theme/state explosion.**

**52. Data-visualization palettes receive their own accessibility/relevance treatment.**

**53. shadcn/ui consumes the organization's semantic tokens; it is not the foundation's source of truth.**

**54. Tailwind utilities map to the token system rather than establishing a competing palette.**

**55. Arbitrary Tailwind values are exceptions, not ordinary implementation style.**

**56. Platform-specific output is generated from shared semantics.**

**57. Cross-platform consistency preserves semantic meaning without forcing identical native implementation.**

**58. Token compilation is deterministic and reproducible.**

**59. Invalid types, unresolved aliases, and cycles fail CI.**

**60. Token documentation exposes names, meaning, mappings, themes, and usage.**

**61. New global tokens require demonstrated reuse or semantic importance.**

**62. One-off visual exceptions normally remain local.**

**63. Repeated local exceptions are signals that the token system may be incomplete.**

**64. Stable shared tokens follow explicit deprecation and migration rules.**

**65. Deprecated tokens have a replacement and removal target.**

**66. Global token changes receive visual regression testing.**

**67. Color/focus/motion changes receive accessibility regression testing.**

**68. Theme-sensitive changes are tested in every supported theme.**

**69. Typography/layout token changes are tested against localization and RTL where relevant.**

**70. If engineers cannot explain what a token means independently of its current resolved value, the token is probably named at the wrong abstraction layer.**

---

# 351. Canonical Design Tokens Standard

The organizational standard is:

> **Design tokens are the authoritative, machine-readable representation of shared design decisions. The canonical dependency hierarchy is primitive tokens defining available raw values, semantic tokens expressing product meaning, component tokens expressing stable reusable component contracts, and implementation code consuming those contracts. Product features prefer semantic design decisions rather than direct palette values or arbitrary CSS constants.**

> **The organization maintains one authoritative token source that is version-controlled, schema-validated, deterministically compiled, and capable of generating the representations required by web, Tailwind, shadcn/ui, native platforms, documentation, and approved design tools. Generated artifacts are not manually edited, aliases are acyclic and understandable, and platform transformations preserve semantic intent rather than creating independently maintained visual systems.**

> **Token names are stable semantic contracts. Primitive scales may identify ordered raw values, while semantic and component tokens describe purpose rather than appearance. A token such as `color.text.primary` remains meaningful if its actual color changes; names such as `text.white`, `button.blue`, or implementation-specific values are avoided when the underlying decision is theme- or platform-dependent.**

> **Color architecture separates primitive palettes from semantic surfaces, foregrounds, borders, actions, focus states, and statuses. Accessibility is evaluated on intended token pairings rather than individual colors. Dark mode, high-contrast contexts, brand variants, and approved custom themes primarily alter semantic resolution while preserving meaning, and every supported theme independently satisfies applicable contrast, focus, interaction, and visualization requirements.**

> **Typography, spacing, sizing, radius, elevation, layer order, and motion use deliberately bounded systems rather than accumulating arbitrary values. Typography supports user scaling and target scripts; spacing establishes coherent rhythm without forbidding justified optical exceptions; radius and elevation preserve product hierarchy; z-index uses semantic layers; and motion uses approved durations and easing with first-class reduced-motion behavior.**

> **Responsive foundations define centrally governed, content-driven breakpoints rather than device-specific assumptions. Components use global viewport thresholds only when viewport behavior is actually relevant and prefer container-based adaptation when component composition depends on local available space. Responsive differences do not create an uncontrolled duplicate token hierarchy for every device class.**

> **Component tokens are created only when a decision forms part of a reusable component's stable contract and existing semantic tokens are insufficient. Component values preferentially alias semantic roles, theme/state variation is resolved through inheritance and context, and token systems deliberately avoid Cartesian explosions across component variants, states, themes, platforms, and density modes.**

> **Token governance treats shared design decisions like shared code APIs. Proposals identify the problem, correct abstraction layer, existing alternatives, mapping, theme behavior, accessibility impact, and expected consumers. Stable token renames, removals, semantic changes, and output-type changes follow migration and deprecation rules; deprecated tokens identify replacements and removal targets rather than remaining indefinitely.**

> **Token changes are verified through schema tests, reference resolution, visual regression, accessibility checks, representative component coverage, supported-theme testing, responsive boundary testing, and localization/RTL testing where relevant. Tooling identifies arbitrary values, deprecated tokens, direct primitive leakage, unused tokens, design/code drift, and invalid output before those inconsistencies become permanent product conventions.**

A production-grade token system should make it easy to answer:

```text
What is the authoritative token source?
Is this token primitive, semantic, component-specific, or merely a local implementation value?
What does its name mean independent of its current value?
Which primitive does it resolve to?
Which semantic role does this component consume?
What does the token resolve to in light mode?
What does it resolve to in dark mode?
Does that foreground/background combination meet accessibility requirements?
What happens in high-contrast or forced-color environments?
Which typography role does this text use?
Does the typography support zoom and all supported scripts?
Which spacing/radius/elevation scale does this component use?
Is this elevation visual or stacking-related?
Which semantic layer controls its z-index?
Which motion duration/easing applies?
What happens under reduced motion?
Why does this breakpoint exist?
Is it actually viewport-dependent, or should the component use a container query?
How does shadcn/ui consume the token?
How does Tailwind expose it?
What does the token become on another platform?
Can Figma/design tooling trace the same semantic decision?
What happens if the value changes?
Which components consume it?
Can the change be regression-tested?
Is the token deprecated?
What replaces it?
When will it be removed?
```

If those questions cannot be answered reliably, the system contains design constants rather than a governed design-token architecture.

The technical baseline is now unusually solid: the **Design Tokens Community Group published its first stable specification, 2025.10, on October 28, 2025**. The stable Format Module formally defines tokens, groups, aliases, typed values and composite types; the associated Resolver Module specifically covers resolving tokens across contexts such as light and dark themes. It is a W3C Community Group specification rather than a W3C Recommendation, but the group describes this release as stable and intended for implementation. citeturn569394search1turn569394search3turn569394search8

The color layer should remain tied to accessibility rather than brand intuition. WCAG 2.2 requires, among other rules, **3:1 non-text contrast** for visual information needed to identify UI components and states, while text contrast requirements are handled separately. That supports the standard above that accessibility belongs to tested **token pairings and states**, not a label such as “accessible blue.” citeturn569394search10

Canonical master placement:

**… → Routes → State Management → Design Tokens → Layout → Facade → Components → Forms → Patterns → Accessibility → Responsive Design → …**
