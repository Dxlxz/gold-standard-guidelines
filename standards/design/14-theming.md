---
id: "theming"
title: "Theming & Multi-Brand"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "theming", "multi", "brand"]
applies_to: ["ui"]
related: []
legacy_number: 64
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 65985
provenance: baseline

---

Below is the canonical companion standard for multi-brand theming, runtime theme resolution, accessibility, token synchronization, and brand governance.

# Theming & Multi-Brand Guidelines — Gold Standard 2026

**Canonical placement:** `Design Tokens → Theming → Design System → Governance`  
**Status:** Gold Standard 2026  
**Applies to:** Web and application themes, multi-brand products, white-label products, tenant-specific branding, light/dark/high-contrast modes, design-token pipelines, Figma libraries, CSS variables, native-platform theme generation, design-system components, and theme administration interfaces.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are used as requirements.

---

# 1. Purpose

## 1.1 Objective

Theming is the controlled mapping of stable design-system semantics to different visual expressions.

A production theme is not a collection of replacement colors.

A production theming system is a governed token graph comprising:

```text
Foundation / Primitive Tokens
            ↓
       Brand Tokens
            ↓
      Semantic Tokens
            ↓
     Component Tokens
            ↓
       Components
            ↓
     Product Interfaces
```

Theme dimensions may additionally modify the resulting semantic values:

```text
Brand
  ×
Color Scheme
  ×
Contrast Mode
  ×
Platform
  ×
Approved Tenant Variation
```

Components MUST consume stable semantic contracts regardless of which brand or mode is active.

Changing:

```text
Brand A → Brand B
Light → Dark
Standard → High Contrast
```

MUST NOT require component authors to rewrite component markup or branch application logic around individual colors.

The governing principle is:

> **Brands change token values. Modes change token values. Components consume semantic meaning.**

The theming architecture MUST preserve:

- accessibility;
- semantic consistency;
- component behavior;
- application state;
- security;
- brand identity;
- maintainability;
- runtime performance;
- deterministic rendering;
- cross-platform synchronization.

## 1.2 Core principles

Production theme systems MUST follow these principles.

1. **Semantics before appearance.** Components MUST consume semantic tokens rather than brand-specific primitive values.
2. **One token graph.** Brand, mode, contrast, and tenant variation MUST resolve through a controlled token architecture rather than independent style systems.
3. **Brands are data, not forks.** Adding a brand SHOULD primarily add token values and approved assets, not duplicate the component library.
4. **Modes are orthogonal to brands.** Light, dark, and high-contrast modes MUST NOT be implemented as separate brands.
5. **Accessibility is invariant.** Every supported theme combination MUST meet the Accessibility standard.
6. **Contrast is a contract.** Brand preference MUST NOT override minimum contrast requirements.
7. **User preference has authority.** User-selected accessibility and theme preferences SHOULD be respected consistently across sessions and devices where product policy permits.
8. **Forced colors belong to the user agent.** Applications MUST NOT defeat operating-system/user-agent forced-color behavior merely to preserve brand appearance.
9. **Runtime theme selection is state.** Theme resolution MUST be deterministic, observable, and governed by the State Management standard.
10. **One canonical token source.** Figma and production code MUST NOT become independent mutable sources of truth.
11. **Theme configuration is validated configuration.** Per-tenant theming MUST use typed, allowlisted properties rather than arbitrary CSS injection.
12. **Components remain brand-agnostic.** Component code SHOULD NOT contain explicit brand branches.
13. **Theme quality is testable.** Token integrity, contrast, component rendering, and mode coverage MUST be validated automatically.
14. **Adding a brand is a governed release.** A brand MUST NOT enter production until token completeness, accessibility, assets, component coverage, and ownership are approved.

---

# 2. Rules

## 2.1 Canonical token architecture

The canonical token architecture SHOULD contain four layers:

```text
Layer 1 — Foundation / Primitive
Layer 2 — Brand
Layer 3 — Semantic
Layer 4 — Component
```

Each layer MUST have a distinct responsibility.

### Foundation tokens

Foundation tokens define reusable raw design values.

Examples:

```text
color.blue.50
color.blue.100
color.blue.500
color.neutral.950

space.1
space.2
space.4

radius.sm
radius.md

font.family.sans
font.weight.medium
```

Foundation tokens MAY be shared across brands.

Foundation tokens MUST NOT normally be consumed directly by product components.

For example:

```text
BAD:
Button → color.blue.600

GOOD:
Button → action.primary.background
```

### Brand tokens

Brand tokens map brand identity to controlled primitive values.

Example:

```text
brand.acme.primary
brand.acme.secondary
brand.acme.neutral
brand.acme.focus
brand.acme.logo
```

Brand tokens MAY point to foundation values or define brand-owned values.

They SHOULD describe brand identity rather than UI behavior.

### Semantic tokens

Semantic tokens describe purpose.

Examples:

```text
background.default
background.subtle
foreground.default
foreground.muted

surface.default
surface.raised

border.default
border.strong

action.primary.background
action.primary.foreground

status.success.background
status.success.foreground

focus.ring

input.border
```

Semantic tokens MUST remain stable across brands and modes wherever possible.

For example:

```text
action.primary.background
```

may resolve to:

```text
Brand A light  → blue
Brand A dark   → lighter blue
Brand B light  → burgundy
Brand B dark   → coral
```

while the component continues to reference one semantic token.

### Component tokens

Component-specific tokens MAY be introduced where semantic tokens alone cannot express a legitimate component contract.

Examples:

```text
button.primary.background
button.primary.foreground
dialog.backdrop
navigation.activeIndicator
```

Component tokens SHOULD alias semantic tokens rather than independently invent values.

Component-token proliferation SHOULD be avoided.

If:

```text
button.primary.background
card.primary.background
dropdown.primary.background
```

all mean the same semantic concept, they SHOULD use a shared semantic token instead.

---

## 2.2 Token dependency direction

Token aliases MUST follow a predictable dependency direction:

```text
Foundation
    ↓
Brand
    ↓
Semantic
    ↓
Component
```

The architecture MUST NOT create uncontrolled reverse references.

For example:

```text
BAD:

semantic.primary
  → button.primary.background

button.primary.background
  → semantic.primary
```

Circular aliases MUST fail CI.

Token resolution MUST be deterministic.

Every production token MUST resolve to a concrete supported value before being emitted to the target platform.

---

## 2.3 Semantic token naming

Token names MUST represent purpose rather than current visual appearance.

Prefer:

```text
foreground.muted
background.inverse
border.danger
action.primary.background
status.warning.foreground
```

Avoid:

```text
grayText
whiteBackground
blueButton
redError
darkBorder
```

because those names embed implementation choices that may become false across brands or modes.

### State tokens

Interactive state SHOULD be encoded semantically.

Examples:

```text
action.primary.background.default
action.primary.background.hover
action.primary.background.active
action.primary.background.disabled

input.border.default
input.border.focus
input.border.invalid
```

States MUST NOT be inferred by arbitrary opacity modification at the component layer if approved state tokens exist.

---

## 2.4 Canonical theme axes

Theme variation MUST be modeled through explicit orthogonal axes.

The canonical conceptual model is:

```text
theme =
    brand
  × colorScheme
  × contrast
  × approvedPlatformVariation
```

Tenant identity MAY select a brand or approved customization profile but MUST NOT become an uncontrolled additional styling architecture.

### Brand

Examples:

```text
core
brand-a
brand-b
partner-c
```

### Color scheme

Canonical values:

```text
light
dark
system
```

`system` is a preference-resolution state rather than a separate visual token set.

It SHOULD resolve to:

```text
light
or
dark
```

using the user's environment preference.

The CSS `prefers-color-scheme` feature exists specifically for detecting a user's light/dark preference. citeturn726650search4

### Contrast mode

Canonical values SHOULD include:

```text
standard
high
system
```

where product requirements justify a product-controlled high-contrast mode.

The browser/OS may separately provide forced-color behavior.

### Platform

Platform-specific values MAY differ where necessary:

```text
web
ios
android
desktop
```

but platform variation SHOULD preserve the same semantic token names.

---

## 2.5 Mode composition

Themes MUST be compositional.

The system SHOULD resolve values through layered overrides rather than copy complete themes for every permutation.

Conceptually:

```text
base semantic values
      +
brand overrides
      +
color-scheme overrides
      +
contrast overrides
      +
approved tenant overrides
      =
resolved theme
```

A brand with:

```text
light
dark
high-contrast-light
high-contrast-dark
```

SHOULD NOT require four unrelated full token files.

Instead, common values SHOULD be inherited and only necessary differences overridden.

This reduces:

- duplication;
- drift;
- incomplete modes;
- inconsistent fixes;
- token maintenance cost.

---

## 2.6 shadcn/ui baseline

**shadcn/ui is the canonical component baseline.**

shadcn/ui currently recommends CSS variables for theming and maps components through semantic tokens such as:

```text
background
foreground
primary
primary-foreground
secondary
muted
accent
destructive
border
input
ring
```

so changing token values changes component appearance without rewriting component classes. citeturn262228search0turn262228search7

The corpus theming architecture MUST preserve this model.

### shadcn semantic mapping

Corpus semantic tokens SHOULD map into the approved shadcn token layer.

Example:

```text
semantic.background.default
    → --background

semantic.foreground.default
    → --foreground

semantic.action.primary.background
    → --primary

semantic.action.primary.foreground
    → --primary-foreground

semantic.border.default
    → --border

semantic.focus.ring
    → --ring
```

### Components

Components SHOULD use:

```text
bg-background
text-foreground
bg-primary
text-primary-foreground
border-border
ring-ring
```

or approved equivalent semantic utilities.

Components SHOULD NOT use brand-specific classes such as:

```text
bg-brand-a-blue
dark:bg-brand-a-blue-300
```

when a semantic token exists.

shadcn's own current guidance prefers semantic tokens and explicitly describes dark mode as overriding the same variables rather than requiring components to carry separate hard-coded color logic. citeturn262228search0turn262228search3

---

## 2.7 Brand architecture

A brand package SHOULD contain only the visual identity required to express that brand within the common design system.

A brand definition MAY include:

```text
brand ID
display name
color primitives
semantic mappings
typography choices
logo assets
approved icon variation
radius policy
illustration assets
approved motion variation
```

A brand SHOULD NOT contain:

```text
forked Button implementation
forked Dialog implementation
forked form system
independent spacing architecture
independent accessibility rules
```

unless the underlying experience genuinely requires a separate design system and has been governed as such.

### Brand invariant

All brands MUST preserve the common semantic contract.

For example, every supported brand MUST define valid mappings for required tokens such as:

```text
background
foreground
card
card-foreground
primary
primary-foreground
secondary
secondary-foreground
muted
muted-foreground
accent
accent-foreground
destructive
border
input
ring
```

plus corpus-specific required tokens.

A missing required token MUST fail theme validation.

---

## 2.8 Light mode

Light mode MUST define a complete semantic theme.

It MUST NOT depend upon browser defaults for required foreground/background pairs.

Text and background colors SHOULD be defined as pairs so contrast can be deterministically validated.

W3C notes that authors cannot guarantee contrast when combining unspecified system colors with author-defined colors; matching foreground and background values must be controlled together where contrast guarantees are required. citeturn726650search2

Light mode MUST define, at minimum:

```text
application background
default foreground
surface hierarchy
primary action
secondary action
muted content
borders
inputs
focus
status colors
destructive states
selection where customized
```

---

## 2.9 Dark mode

Dark mode MUST be designed rather than mechanically inverted.

The system MUST NOT implement dark mode using naïve transformations such as:

```text
lightness = 100% - lightness
```

across all tokens.

Dark mode MUST separately validate:

- text contrast;
- border visibility;
- input visibility;
- focus rings;
- disabled states;
- elevation/surface distinction;
- status colors;
- data visualizations;
- illustrations;
- logos.

### Shared semantics

Dark mode MUST preserve semantic meaning.

For example:

```text
status.danger
```

must remain the danger semantic even if the literal hue/lightness differs significantly from light mode.

### Elevation

Dark themes SHOULD distinguish elevation through the approved combination of:

- surface tokens;
- border tokens;
- shadows where appropriate.

They MUST NOT rely on imperceptible black shadows alone.

---

## 2.10 System color-scheme preference

Applications offering a `system` option SHOULD honor the user's current `prefers-color-scheme` preference.

Theme switching SHOULD respond when the system preference changes while the application is active if the user has selected `system`.

An explicit user choice of:

```text
light
or
dark
```

SHOULD override system color-scheme preference.

The preferred resolution order SHOULD therefore be:

```text
explicit user preference
        ↓
system preference
        ↓
product default
```

Brand/tenant selection is resolved separately.

---

## 2.11 High-contrast mode

A product-controlled high-contrast theme MUST be more than a color saturation variant.

It SHOULD deliberately strengthen:

- text contrast;
- interactive boundaries;
- focus indication;
- selected state;
- form boundaries;
- error indication;
- disabled differentiation;
- data visualization distinguishability.

### Contrast objectives

Every mode MUST satisfy the corpus Accessibility standard.

WCAG 2.2 AA requires at least:

```text
4.5:1 — normal text
3:1   — large text
3:1   — visual information needed to identify
         UI components and states
```

citeturn266716search0turn266716search1

A theme explicitly marketed as **high contrast** SHOULD target the stronger WCAG enhanced text contrast thresholds wherever applicable:

```text
7:1   — normal text
4.5:1 — large text
```

while maintaining clearly distinguishable component boundaries and interaction states. citeturn266716search0

### Non-color cues

High-contrast mode MUST NOT rely solely on hue differentiation.

Where appropriate it SHOULD strengthen:

- borders;
- underline treatment;
- iconography;
- shape;
- text labels;
- pattern.

---

## 2.12 Forced colors and OS accessibility modes

Browser or operating-system forced-color modes MUST be treated as user-controlled accessibility behavior, not as another marketing theme.

The web platform defines `forced-colors: active` for situations where the user agent applies a user-selected constrained color palette. citeturn726650search0turn726650search2

Applications MUST allow forced colors to operate normally.

### `forced-color-adjust`

`forced-color-adjust: none` MUST NOT be applied globally.

It SHOULD be used only for narrowly reviewed cases where:

- automatic forced-color rendering destroys necessary semantics;
- the application supplies an equally accessible adaptation;
- the affected component has been tested in forced-color environments.

W3C explicitly advises authors to opt out only when they are themselves managing colors appropriately for the user's contrast requirements. citeturn726650search2

### System colors

When a component requires special forced-color handling, CSS system color keywords SHOULD be preferred where appropriate.

### Visual effects

Teams MUST test components whose meaning depends on:

```text
box-shadow
background images
subtle borders
SVG fill/stroke
color-only state
```

because forced-color mode can alter or remove such styling. citeturn726650search2

---

## 2.13 `prefers-contrast`

Applications MAY respond to `prefers-contrast` where product behavior benefits from doing so.

The media feature can represent preferences including:

```text
more
less
custom
```

and integrates with forced-color preferences where supported. citeturn726650search0turn726650search3

A `prefers-contrast: more` signal SHOULD NOT automatically select an unrelated marketing theme.

It MAY:

- resolve `system` contrast preference to high;
- strengthen borders;
- strengthen focus indication;
- increase semantic separation.

User-controlled product settings SHOULD remain understandable and reversible.

---

## 2.14 Contrast guarantees

Every supported resolved theme MUST pass contrast validation.

This means validation MUST cover combinations such as:

```text
brand-a / light / standard
brand-a / dark / standard
brand-a / light / high
brand-a / dark / high

brand-b / light / standard
...
```

### Foreground/background pairs

Semantic foreground/background pairs MUST be tested together.

Examples include:

```text
background / foreground
card / card-foreground
popover / popover-foreground
primary / primary-foreground
secondary / secondary-foreground
accent / accent-foreground
destructive / destructive-foreground
warning / warning-foreground
success / success-foreground
```

### Interactive boundaries

CI MUST also test required non-text contrast pairs such as:

```text
input border vs adjacent surface
focus indicator vs adjacent surface
checkbox indicator vs checkbox surface
selected state indicator
chart line vs plot background
```

where those colors carry the required visual information.

### Dynamic composition

If components may legally combine tokens dynamically, the valid combination matrix MUST be tested rather than assuming each token is independently accessible.

---

## 2.15 Color representation

Canonical source tokens SHOULD use a perceptually useful modern color representation where supported by the token toolchain.

For current shadcn-generated themes, OKLCH is a supported and commonly used representation. citeturn262228search0

However:

- the design system MUST define target-platform compatibility;
- build output MAY transform canonical values as required;
- contrast validation MUST evaluate the effective rendered color space;
- unsupported target platforms MUST receive deterministic fallbacks.

A chosen source color notation MUST NOT become part of the semantic token name.

Prefer:

```text
action.primary.background
```

not:

```text
action.primary.oklchBlue
```

---

## 2.16 Runtime theme switching

Theme changes SHOULD occur without application reload where technically appropriate.

Runtime switching MUST change theme variables or equivalent platform theme state rather than remount the entire application solely to update colors.

### DOM strategy

A web implementation SHOULD use stable root attributes/classes such as:

```text
data-brand="acme"
data-theme="dark"
data-contrast="high"
```

or an equivalent controlled mechanism.

Individual product components SHOULD NOT manage their own brand class.

### Atomicity

A theme change SHOULD become visually effective atomically.

The interface SHOULD NOT temporarily show mixed old/new theme values.

### Transition animation

Global theme changes SHOULD NOT animate every color property by default.

Large cross-page color transitions can:

- create visual noise;
- expose intermediate invalid contrast;
- perform poorly;
- conflict with reduced-motion expectations.

If theme transitions are animated, the behavior MUST comply with the Accessibility and motion standards.

---

## 2.17 Initial theme resolution and flash prevention

The initial theme SHOULD be resolved before the application becomes visibly interactive.

The application SHOULD avoid:

- flash of light theme before dark theme;
- flash of default brand before tenant brand;
- hydration mismatch caused by client-only theme discovery.

For server-rendered applications, sufficient non-sensitive theme state SHOULD be available during initial rendering.

Theme state MAY be resolved from:

```text
tenant configuration
authenticated profile
safe preference cookie
system preference
product default
```

according to the product's state model.

The implementation MUST NOT expose sensitive tenant information merely to prevent theme flash.

---

## 2.18 Theme state precedence

Theme resolution MUST have a documented precedence model.

A recommended model is:

```text
1. Accessibility-forced user-agent behavior
2. Explicit user accessibility/theme preference
3. Tenant/organization policy where legitimately mandatory
4. System preference
5. Brand default
6. Product default
```

Exact product policy MAY differ, but precedence MUST be deterministic.

### User versus tenant policy

A tenant MAY select:

```text
brand identity
approved logo
approved default mode
```

but SHOULD NOT normally prevent a user from selecting an accessibility-oriented contrast preference.

A tenant's brand requirements MUST NOT override accessibility needs.

---

## 2.19 Persistence

Theme preferences SHOULD persist when user expectations imply persistence.

Persistence MAY use:

- authenticated user profile;
- local storage;
- cookie;
- application settings service.

The authoritative scope MUST be defined.

For example:

```text
brand       → tenant-owned
colorScheme → user-owned
contrast    → user-owned
```

### Anonymous users

Anonymous preference SHOULD be stored only where justified and consistent with privacy policy.

Theme preference SHOULD NOT require tracking identifiers unrelated to theme persistence.

---

## 2.20 Per-tenant theming

Tenant theming MUST use constrained configuration.

A tenant MUST NOT be permitted to upload arbitrary production CSS or JavaScript through the theme system.

A tenant theme configuration SHOULD reference:

```text
approved brand/theme ID
approved logo assets
approved typography option
approved semantic token overrides
```

### Allowed overrides

Per-tenant overrides SHOULD be allowlisted.

Example:

```text
primary
primary-foreground
secondary
accent
logo
font-heading
```

may be permitted.

Security-critical or accessibility-critical properties SHOULD NOT be freely tenant-configurable.

For example:

```text
focus visibility
error semantics
destructive semantics
hidden content behavior
z-index architecture
interaction-state visibility
```

SHOULD remain design-system controlled.

### Validation

Every tenant override MUST pass the same:

- schema validation;
- contrast validation;
- token-reference validation;
- asset validation;
- security validation

as first-party themes.

### Fallback

If tenant theme configuration becomes invalid or unavailable, the product MUST fall back to a known-valid theme.

It MUST NOT render partially unresolved CSS variables.

---

## 2.21 Tenant theme security

Theme configuration is application input and MUST follow the Security standard.

### Arbitrary CSS

Tenant-provided arbitrary CSS MUST NOT be accepted as the default customization mechanism.

Untrusted CSS can affect:

- content visibility;
- interaction visibility;
- phishing-like presentation;
- URL-based resource loading;
- privacy;
- layout integrity;
- security messaging.

### Asset URLs

Logo and image assets MUST come from approved origins or an approved asset pipeline.

Externally supplied SVG MUST be sanitized according to the Security standard before inline use.

### Fonts

Custom tenant fonts MUST use approved delivery mechanisms.

Theme configuration MUST NOT be allowed to load arbitrary executable or tracking resources.

### Authorization

Changing a tenant's theme MUST require the appropriate tenant administration permission.

A tenant administrator MUST NOT be able to modify another tenant's theme by supplying a different tenant identifier.

---

## 2.22 Theme configuration API

Theme configuration exposed through APIs MUST use typed schemas.

A canonical response MAY resemble:

```text
themeId
brandId
version
defaultColorScheme
allowedColorSchemes
defaultContrast
assets
approvedOverrides
```

Raw executable CSS SHOULD NOT be the API contract.

### Versioning

Theme responses SHOULD include a theme version or immutable revision identifier.

Clients MAY use this value for:

- cache invalidation;
- diagnostics;
- visual regression correlation;
- support.

### Validation

The API MUST validate:

- brand existence;
- tenant authorization;
- supported mode;
- approved overrides;
- token syntax;
- asset ownership.

---

## 2.23 Theme caching

Resolved themes SHOULD be cacheable where safe.

Cache keys MUST include every dimension that materially affects the theme.

This MAY include:

```text
brand
theme version
tenant theme revision
color scheme
contrast mode
platform
```

Cross-tenant caches MUST NOT return another tenant's private branding configuration.

Public shared brand themes MAY use broadly shared cache entries where appropriate.

---

## 2.24 State Management alignment

Theme state MUST follow the State Management standard.

The system MUST distinguish:

```text
tenant brand configuration
user theme preference
system preference
resolved active theme
temporary preview theme
```

These MUST NOT be represented as one ambiguous `theme` string when their ownership differs.

### Canonical state example

Conceptually:

```text
brand = tenant.brand
colorSchemePreference = user | system
contrastPreference = user | system
resolvedColorScheme = light | dark
resolvedContrast = standard | high
```

### Derived state

Resolved theme values SHOULD be derived from authoritative configuration and user preference.

The application SHOULD NOT persist every resolved value if it can safely derive it.

### Preview

Administrative theme preview MUST remain separate from committed tenant theme state.

Previewing a brand MUST NOT write production configuration until the explicit save/publish action succeeds.

---

## 2.25 Theme validation

Every theme MUST pass automated validation before release.

At minimum, validation MUST include:

```text
token schema
required-token coverage
type correctness
alias resolution
cycle detection
dangling-reference detection
contrast
mode completeness
unsupported-value detection
```

### Token type safety

Color tokens MUST resolve to colors.

Dimension tokens MUST resolve to dimensions.

Typography tokens MUST resolve to valid typography structures.

A token resolver MUST NOT silently coerce incompatible types.

### Missing values

A required semantic token missing from any supported mode MUST fail CI.

The system MUST NOT silently substitute an arbitrary raw default unless the fallback is explicitly part of the theme contract.

---

## 2.26 Theme validation in CI

Theme CI MUST operate as a release gate.

A theme change SHOULD trigger:

```text
token validation
token build
contrast testing
component test suite
visual regression
forced-color checks
light/dark checks
high-contrast checks
artifact diff
```

### Matrix strategy

CI SHOULD test a representative matrix containing every approved brand/mode combination.

Where the matrix becomes large, component visual testing MAY use:

- complete automated token checks for every permutation;
- strategically selected full-page visual permutations;
- complete component-library theme coverage.

Accessibility-critical combinations MUST NOT be sampled away.

### Regression

A token change affecting a widely reused semantic token MUST be treated as a potentially broad visual change.

For example, changing:

```text
border.default
```

may affect hundreds of components and MUST receive corresponding review.

---

## 2.27 Contrast CI

Contrast validation MUST be machine-enforced for deterministic token pairs.

CI MUST fail when a required WCAG contrast threshold is not met.

WCAG values MUST be evaluated as thresholds and MUST NOT be rounded upward to produce a passing result. W3C explicitly notes, for example, that a computed `2.999:1` does not satisfy a `3:1` requirement. citeturn266716search1

### Visual verification

Automated token-pair contrast checks MUST NOT be the only accessibility test.

Human or rendered-component testing remains necessary for cases involving:

- gradients;
- images;
- overlays;
- opacity;
- compositing;
- complex data visualization;
- dynamic backgrounds.

---

## 2.28 Visual regression

The design system SHOULD maintain theme-aware visual regression testing.

Core components SHOULD be rendered against all approved theme modes.

At minimum, visual coverage SHOULD include:

```text
Button
Input
Textarea
Select
Checkbox
Radio
Switch
Tabs
Dialog
AlertDialog
Popover
Tooltip
Dropdown
Card
Table
Navigation
Badge
Alert
Toast
Skeleton
Charts
```

where they exist in the corpus.

Visual regression MUST distinguish intended theme changes from unintended component changes.

---

## 2.29 Component theme contract

Components MUST remain visually valid under every approved resolved theme.

A component MUST NOT assume:

```text
background is white
foreground is black
primary is blue
destructive is red
dark means #000
```

unless that value is itself the semantic requirement.

### Foreground pairing

Components SHOULD use designated foreground pairs.

For example:

```text
bg-primary text-primary-foreground
```

rather than:

```text
bg-primary text-white
```

The former permits `primary` to change safely across brands and modes.

shadcn/ui explicitly uses this semantic background/foreground pairing convention. citeturn262228search0

---

## 2.30 Raw-value restrictions

Product component code SHOULD NOT introduce raw visual values when an applicable token exists.

Linting SHOULD detect or restrict unauthorized:

```text
hex colors
rgb/hsl/oklch literals
arbitrary shadows
raw radii
brand-specific utility classes
manual dark-mode colors
```

Exceptions MUST be documented.

Examples of legitimate exceptions MAY include:

- external brand logos;
- data originating from user-generated content;
- visualization palettes that use a separately governed token family.

---

## 2.31 Typography across brands

Brands MAY vary typography within the approved type system.

A brand MAY define:

```text
font.family.heading
font.family.body
```

but MUST preserve:

- readable minimum sizes;
- line-height requirements;
- layout resilience;
- localization compatibility;
- character coverage;
- accessibility.

### Font loading

Font selection MUST NOT make core content unavailable while custom assets load.

Fallback stacks MUST be defined.

Brand fonts SHOULD be evaluated for:

- variable-font support;
- weight availability;
- language support;
- performance;
- licensing.

---

## 2.32 Logo and brand assets

Logo assets MUST be treated separately from semantic UI tokens.

Each brand SHOULD provide approved variants such as:

```text
logo.lightSurface
logo.darkSurface
mark.lightSurface
mark.darkSurface
```

where required.

A theme MUST NOT use CSS filters as the default mechanism for converting an unsuitable logo between light and dark environments.

Brand assets MUST preserve accessible naming where the image communicates identity.

Decorative repetitions MAY be hidden appropriately from assistive technology according to the Accessibility standard.

---

## 2.33 Data visualization themes

Charts and visualizations MUST consume governed visualization tokens.

They MUST NOT reuse generic UI status colors indiscriminately.

The token system SHOULD define families such as:

```text
chart.categorical.1
chart.categorical.2
chart.categorical.3

chart.positive
chart.negative
chart.neutral

chart.axis
chart.grid
chart.foreground
```

Every brand/mode combination MUST preserve sufficient chart legibility.

Meaning MUST NOT rely solely on color.

Visualizations SHOULD support:

- labels;
- patterns;
- marker differences;
- direct annotation;
- accessible data alternatives

where required by the Accessibility standard.

---

## 2.34 Forms & Validation alignment

Form semantics MUST remain consistent across brands.

A validation error MUST NOT change meaning because a tenant's brand color resembles the default destructive color.

The theme architecture MUST define stable semantic tokens such as:

```text
input.background
input.foreground
input.border
input.border.focus
input.border.invalid

validation.error.foreground
validation.error.background

validation.success.foreground
```

### Invalid states

Invalid inputs MUST remain identifiable without color alone.

Theme variation MUST preserve:

- error text;
- icons where used;
- semantic ARIA state;
- visible focus;
- border/state differentiation.

shadcn components and corpus form patterns MUST consume these common semantic states rather than brand-specific implementations.

---

## 2.35 Accessibility alignment

**Accessibility requirements override brand requirements.**

Every supported brand and mode MUST meet the corpus Accessibility standard.

### WCAG baseline

Web themes MUST meet WCAG 2.2 AA unless a stricter applicable standard requires more.

WCAG 2.2 specifies at least `4.5:1` for normal text, `3:1` for large text, and `3:1` for visual information necessary to identify controls and states. citeturn266716search0turn266716search1

### Focus

Every theme MUST provide clearly perceivable keyboard focus.

A brand MUST NOT remove focus outlines because they conflict with brand aesthetics.

### Disabled controls

Disabled states SHOULD remain identifiable but MUST NOT be used to communicate essential information solely through reduced contrast.

### Color independence

No theme may make color the only way to identify:

- errors;
- success;
- selected items;
- required state;
- chart categories where distinction is necessary;
- destructive actions.

---

## 2.36 Security alignment

Theme systems MUST comply with the Security standard.

The theming system MUST NOT become a mechanism for:

- CSS injection;
- JavaScript injection;
- arbitrary remote asset loading;
- tenant impersonation;
- phishing-like replacement of trusted UI;
- hiding mandatory security controls.

### Security UI

Security-critical controls MUST preserve stable semantics across brands.

A tenant theme MUST NOT hide or visually de-emphasize required:

```text
permission warnings
authentication controls
security notices
destructive confirmations
privacy controls
```

below the minimum product standard.

### User content

User-authored rich content MUST NOT be able to redefine application theme variables outside its authorized rendering scope.

---

## 2.37 Data & Database alignment

Persistent theme configuration is application data.

It MUST follow the Data & Database standard for:

- schema;
- ownership;
- migrations;
- auditing;
- retention;
- tenant isolation.

A tenant theme record SHOULD use stable identifiers rather than store arbitrary generated styles.

For example:

```text
tenant_id
brand_id
theme_revision
approved_overrides
logo_asset_id
```

is preferable to:

```text
tenant_id
css_blob
```

### Migration

Token renaming or removal MUST include migration behavior for persisted theme configuration.

A stored tenant override MUST NOT silently stop working after a token rename.

---

## 2.38 API alignment

Theme-management APIs MUST follow the API standard.

They MUST provide:

- typed request/response contracts;
- authorization;
- validation;
- versioning where required;
- stable error semantics;
- auditability.

A theme update SHOULD use semantic configuration such as:

```text
{
  "brandId": "...",
  "overrides": {
    "action.primary.background": "..."
  }
}
```

rather than arbitrary CSS.

Invalid or inaccessible token names MUST be rejected.

---

## 2.39 Design Tokens alignment

This document extends, rather than replaces, the canonical Design Tokens standard.

The Design Tokens standard defines:

- token taxonomy;
- naming;
- token types;
- primitive values;
- aliasing;
- distribution.

This Theming standard defines:

- brand layering;
- mode layering;
- runtime resolution;
- accessibility constraints;
- multi-tenant behavior;
- governance.

### Exchange format

The design-system toolchain SHOULD use a standards-oriented token interchange format where feasible.

The Design Tokens Community Group published its stable `2025.10` format specification for interoperable design-token exchange; it provides a suitable contemporary baseline for exchanging token definitions between tools. citeturn262228search1turn262228search9

Platform-specific outputs MAY transform from this canonical representation.

---

## 2.40 Canonical token source of truth

Exactly one system MUST be designated as the canonical mutable source for production token definitions.

Recommended default:

```text
Version-controlled token repository
          ↓
Validation / CI
          ↓
Generated platform artifacts
          ├── Web
          ├── Native
          ├── Figma
          └── Documentation
```

Figma SHOULD generally consume or propose changes to the governed token source rather than becoming an independent production fork.

### Alternate authoring model

An organization MAY choose Figma as the primary authoring interface, but production publication MUST still pass through:

```text
export
→ schema validation
→ diff/review
→ CI
→ version control
→ generated artifacts
```

before release.

### Prohibited topology

The following is prohibited:

```text
Developer edits code tokens
          ↕
Designer independently edits Figma variables
          ↕
No authoritative reconciliation
```

Two mutable sources of truth inevitably create drift.

---

## 2.41 Figma-to-code token synchronization

Figma variable collections SHOULD mirror the logical token architecture rather than use unrelated naming.

Figma currently exposes Variables APIs capable of reading and writing reusable variable definitions and explicitly supports integration with CI systems and source-of-truth synchronization workflows. citeturn262228search6

### Mapping

Figma variable identifiers SHOULD map deterministically to canonical tokens.

Example:

```text
Figma:
semantic/background/default

Repository:
semantic.background.default
```

Mapping transformations MUST be documented.

### Modes

Figma modes MAY represent:

```text
light
dark
```

or other suitable token axes.

However, organizations SHOULD avoid creating an unmaintainable Cartesian explosion of Figma modes such as:

```text
Brand A Light
Brand A Dark
Brand A High Light
Brand A High Dark
Brand B Light
Brand B Dark
...
```

when collections/aliasing or generated libraries can represent the architecture more cleanly.

### Sync direction

Every synchronization workflow MUST define its permitted direction:

```text
code → Figma
Figma → code through PR
or
controlled bidirectional reconciliation
```

Unreviewed bidirectional synchronization SHOULD NOT be used.

### Publication

Updated Figma variables intended for shared consumption MUST follow the organization's Figma publication workflow; Figma notes that variables updated through its API must be published before other files consume those changes. citeturn262228search6

---

## 2.42 Token versioning

Theme tokens MUST be version-controlled.

Changes SHOULD produce an identifiable revision such as:

```text
theme version
design-system package version
Git commit
generated artifact version
```

### Breaking changes

A token change is breaking when it:

- removes a consumed token;
- changes semantic meaning;
- changes type;
- alters an alias contract incompatibly;
- removes a supported theme/mode.

Breaking changes MUST follow the Design System versioning policy.

### Visual change

A value change may be visually significant without being API-breaking.

Such changes MUST still undergo:

- review;
- visual regression;
- contrast validation.

---

## 2.43 Theme artifact generation

Generated theme artifacts MUST be deterministic.

The same canonical token revision and build-tool version SHOULD produce equivalent output.

Generated artifacts MAY include:

```text
CSS custom properties
Tailwind/shadcn mappings
TypeScript types
JSON
native platform resources
Figma sync payload
documentation
```

Generated files SHOULD NOT be hand-edited.

A generated artifact SHOULD carry its source revision where practical.

---

## 2.44 Theme loading performance

Theming MUST NOT introduce unnecessary runtime cost.

The implementation SHOULD avoid shipping every brand's complete token payload to every user when only one brand is required.

Strategies MAY include:

- server-rendered tenant variables;
- brand-specific CSS layers;
- cached theme bundles;
- generated static styles.

### Core variables

The active theme variables SHOULD remain small enough to apply efficiently.

Runtime JS SHOULD NOT recalculate hundreds of independent design values on every render when CSS inheritance can perform the work.

---

## 2.45 SSR and hydration

Server-rendered applications MUST ensure theme resolution is compatible with hydration.

Server and client SHOULD agree on the initial:

```text
brand
color scheme
contrast
```

whenever these values are available at request time.

If the client must refine a system preference, the transition MUST avoid inaccessible or disruptive intermediate UI.

Theme state MUST NOT cause uncontrolled hydration warnings to be ignored globally.

---

## 2.46 Component ownership

The Design System team owns the semantic component contract.

Brand teams MAY propose token values and approved brand assets.

Brand teams MUST NOT independently fork core components to achieve token-expressible styling.

If a brand requirement cannot be expressed through the existing semantic architecture, the design-system team MUST determine whether:

1. a missing semantic token exists;
2. a legitimate component variant is required;
3. the requirement conflicts with the shared design system.

A new brand MUST NOT automatically cause new component variants.

---

## 2.47 Governance for adding a brand

Every new production brand MUST pass a formal onboarding process.

The proposing team MUST provide:

```text
brand owner
business/product scope
required platforms
approved visual identity
token mappings
light theme
dark theme where supported
high-contrast behavior
logo/assets
typography
accessibility evidence
component visual review
launch plan
maintenance owner
```

### Token completeness

The brand MUST define every required semantic mapping.

Incomplete brands MUST NOT launch with implicit fallback to another brand's values unless that inheritance is explicitly part of the brand specification.

### Accessibility

Every supported mode MUST pass:

- text contrast;
- non-text contrast;
- focus visibility;
- form-state validation;
- component accessibility testing.

Brand guidelines requiring inaccessible combinations MUST be adapted.

### Component review

Core shadcn/corpus components MUST be reviewed under the new brand.

At minimum, the review MUST cover interactive and semantic states:

```text
default
hover
active
focus
disabled
selected
invalid
destructive
loading
```

### Ownership

Every brand MUST have an accountable owner.

Brands without a maintenance owner SHOULD NOT remain indefinitely supported.

---

## 2.48 Brand deprecation

Brands MUST have a governed retirement process.

Retirement SHOULD define:

```text
affected tenants/products
migration theme
asset migration
stored preferences
API behavior
token removal version
support window
```

Theme identifiers SHOULD NOT be silently reassigned to a different brand.

A deprecated brand ID MUST NOT begin resolving to visually unrelated values without an explicit migration.

---

## 2.49 Theme preview tooling

Designers and administrators SHOULD have a controlled theme preview environment.

Preview SHOULD render real production components rather than isolated swatches only.

A useful preview SHOULD include:

```text
typography
buttons
forms
navigation
dialogs
alerts
tables
charts
status
focus
disabled states
errors
```

Preview MUST support relevant:

```text
light
dark
high contrast
```

modes.

Preview output MUST NOT be treated as approved production configuration until validation and publication succeed.

---

## 2.50 Theme administration UI

Tenant or design-system theme administration MUST follow the Component and Pattern standards.

**shadcn/ui is the canonical component baseline.**

Appropriate primitives SHOULD include:

```text
Tabs
Card
Input
Select
Switch
Button
Alert
Dialog
AlertDialog
Table
Popover
Tooltip
```

### Color input

Color configuration SHOULD expose:

- accessible text input where appropriate;
- validated color controls;
- immediate contrast result;
- semantic token target;
- preview.

A color swatch alone MUST NOT be the only representation of a selected value.

### Publishing

The distinction between:

```text
draft
preview
published
```

MUST be clear.

Publishing a tenant-wide theme change SHOULD require explicit intent.

---

## 2.51 Observability

Theme resolution SHOULD be diagnosable without inspecting arbitrary DOM styling manually.

Production diagnostics SHOULD be capable of identifying:

```text
brand ID
theme revision
resolved color scheme
resolved contrast mode
tenant override revision
design-system version
```

Sensitive tenant information MUST NOT be exposed publicly merely for diagnostics.

Theme errors such as:

```text
unknown theme
invalid override
failed theme fetch
missing token
```

SHOULD be observable.

---

# 3. Anti-patterns

## 3.1 Brand-specific component forks

**Anti-pattern:**

```text
Button.tsx
ButtonBrandA.tsx
ButtonBrandB.tsx
```

where only colors differ.

**Why it fails:** Component behavior and accessibility drift across brands.

**Required correction:** Express brand differences through semantic token mappings.

---

## 3.2 Brand name in component styling

**Anti-pattern:**

```text
if (brand === "acme") {
  className = "bg-blue-600"
}
```

**Required correction:** Resolve `primary` through the active theme.

---

## 3.3 Raw color proliferation

**Anti-pattern:**

```text
text-[#71717a]
bg-[#ffffff]
dark:bg-[#09090b]
```

throughout feature code.

**Required correction:** Use semantic theme tokens.

---

## 3.4 Manual dark mode per component

**Anti-pattern:**

```text
bg-white text-black
dark:bg-black dark:text-white
```

for every component.

**Required correction:** Map the same semantic variables for light and dark themes.

---

## 3.5 Dark mode as inversion

**Anti-pattern:** Algorithmically reversing every light-mode color.

**Required correction:** Design and validate a distinct dark semantic mapping.

---

## 3.6 High contrast equals saturation

**Anti-pattern:** Increasing saturation while leaving low-contrast text, borders, and focus states unchanged.

**Required correction:** Design explicitly for perceptibility and contrast.

---

## 3.7 Brand overrides accessibility

**Anti-pattern:**

```text
Brand guidelines require this pale yellow text.
```

despite insufficient contrast.

**Required correction:** Accessibility requirements override brand color preference.

---

## 3.8 Disable forced colors

**Anti-pattern:**

```css
* {
  forced-color-adjust: none;
}
```

**Required correction:** Allow the browser's forced-color behavior; narrowly override only proven problematic elements.

---

## 3.9 Color-only semantics

**Anti-pattern:** Error, selected, or chart state differs only by hue.

**Required correction:** Add semantic text, iconography, border, pattern, or other appropriate signals.

---

## 3.10 Copy every theme permutation

**Anti-pattern:**

```text
brand-a-light.json
brand-a-dark.json
brand-a-high-light.json
brand-a-high-dark.json
```

containing mostly duplicate values.

**Required correction:** Compose brand, scheme, and contrast layers.

---

## 3.11 Figma and code both authoritative

**Anti-pattern:** Designers change Figma while developers independently change production token JSON.

**Required correction:** Establish one canonical mutable source and controlled synchronization.

---

## 3.12 Manual generated-file edits

**Anti-pattern:** Editing generated CSS token output directly.

**Required correction:** Change the source token and regenerate artifacts.

---

## 3.13 Arbitrary tenant CSS

**Anti-pattern:**

```text
tenant.customCss = "..."
```

with unrestricted production application scope.

**Required correction:** Use allowlisted typed semantic overrides.

---

## 3.14 Tenant JavaScript theming

**Anti-pattern:** Permitting tenant-supplied JavaScript to manipulate product styling.

**Required correction:** Theme via governed configuration and assets.

---

## 3.15 Unvalidated tenant colors

**Anti-pattern:** Tenant selects any primary color and it immediately goes live with white text.

**Required correction:** Validate every derived foreground/background pairing before publication.

---

## 3.16 One foreground for every brand color

**Anti-pattern:**

```text
primary-foreground = white
```

for all possible tenant primary colors.

**Required correction:** Treat surface and foreground as a validated pair.

---

## 3.17 UI-level mode ownership

**Anti-pattern:** Each page or component independently decides whether the product is dark.

**Required correction:** Resolve theme state centrally and inherit it.

---

## 3.18 Theme switch reload

**Anti-pattern:** Full page navigation solely to change light/dark variables where runtime switching is supported.

**Required correction:** Apply the new theme state through the centralized runtime theme layer.

---

## 3.19 Theme flash

**Anti-pattern:** Every dark-theme user sees a bright default page before client JavaScript runs.

**Required correction:** Resolve sufficient initial theme state before visible rendering.

---

## 3.20 Tenant brand wins over user accessibility

**Anti-pattern:** A tenant locks users out of higher-contrast rendering because the alternative does not match brand guidelines.

**Required correction:** Preserve accessible user preferences.

---

## 3.21 Swatches as accessibility proof

**Anti-pattern:** Approving a palette because individual swatches look sufficiently different.

**Required correction:** Test actual semantic foreground/background and component-state combinations.

---

## 3.22 Contrast rounding

**Anti-pattern:** Treating `4.48:1` as `4.5:1`.

**Required correction:** Threshold values MUST be met without upward rounding.

---

## 3.23 Token names encode literal appearance

**Anti-pattern:**

```text
dark-gray-text
white-card
blue-primary
```

**Required correction:** Name tokens by semantics.

---

## 3.24 Excessive component tokens

**Anti-pattern:** Every component receives its own unrelated colors.

**Required correction:** Reuse semantic tokens unless a true component-specific contract exists.

---

## 3.25 Global theme as one ambiguous string

**Anti-pattern:**

```text
theme = "acme-dark-high"
```

used as the only persisted state.

**Required correction:** Model brand, color-scheme preference, and contrast preference independently.

---

## 3.26 No theme CI

**Anti-pattern:** Brand token JSON is merged after visual review of a marketing mock-up only.

**Required correction:** Enforce token, accessibility, component, and visual regression checks.

---

## 3.27 Logo through CSS inversion

**Anti-pattern:**

```css
filter: invert(1);
```

as the universal dark-mode logo solution.

**Required correction:** Supply approved brand assets for supported surfaces.

---

## 3.28 Uncontrolled custom fonts

**Anti-pattern:** Tenants provide arbitrary external font URLs.

**Required correction:** Use approved assets, origins, licensing, and performance controls.

---

## 3.29 Marketing palette used directly in UI

**Anti-pattern:** Every marketing brand color automatically becomes a component color.

**Required correction:** Map brand palette into accessible UI semantics.

---

## 3.30 Brand governance through screenshots

**Anti-pattern:** A screenshot is the only specification for a new brand.

**Required correction:** Brand approval requires machine-readable token definitions, assets, accessibility validation, and ownership.

---

# 4. Checklist

## 4.1 Architecture

- [ ] Are foundation, brand, semantic, and component tokens distinct?
- [ ] Is token dependency direction documented?
- [ ] Are circular aliases rejected?
- [ ] Do components consume semantic tokens?
- [ ] Are brand-specific component forks avoided?
- [ ] Are theme dimensions modeled independently?

## 4.2 Semantic tokens

- [ ] Are tokens named by purpose rather than color?
- [ ] Are foreground/background pairs explicit?
- [ ] Are state tokens defined?
- [ ] Are status tokens stable across brands?
- [ ] Are component-specific tokens introduced only where needed?
- [ ] Are raw values absent from ordinary feature components?

## 4.3 Brand

- [ ] Does the brand have an ID and owner?
- [ ] Are approved primitives defined?
- [ ] Are semantic mappings complete?
- [ ] Are typography and assets defined?
- [ ] Is the brand implemented without component forks?
- [ ] Are all required modes supported or explicitly excluded?

## 4.4 Light and dark

- [ ] Is light mode complete?
- [ ] Is dark mode intentionally designed rather than inverted?
- [ ] Are surface/elevation relationships valid in both?
- [ ] Are borders visible?
- [ ] Are inputs visible?
- [ ] Are focus states visible?
- [ ] Are disabled and selected states distinguishable?
- [ ] Are brand assets appropriate for each surface?

## 4.5 High contrast

- [ ] Does high-contrast mode materially increase perceptibility?
- [ ] Does normal text meet the target contrast?
- [ ] Are component boundaries strengthened where needed?
- [ ] Are focus states clear?
- [ ] Are status and selection states distinguishable without color alone?
- [ ] Are charts and data visualizations usable?

## 4.6 Forced colors

- [ ] Has `forced-colors: active` been tested?
- [ ] Is browser/user-agent forced-color behavior allowed by default?
- [ ] Is `forced-color-adjust: none` used only for justified cases?
- [ ] Do components remain identifiable when shadows/backgrounds are removed?
- [ ] Are system colors used where appropriate?
- [ ] Are SVGs/icons legible?

## 4.7 Contrast

- [ ] Does normal text meet at least 4.5:1?
- [ ] Does large text meet at least 3:1?
- [ ] Do required UI boundaries/states meet at least 3:1?
- [ ] Are ratios tested without upward rounding?
- [ ] Are all foreground/background pairs validated?
- [ ] Is every brand/mode combination covered?
- [ ] Are composited/gradient cases visually tested?

## 4.8 Runtime switching

- [ ] Can the theme switch without unnecessary reload?
- [ ] Is theme state resolved centrally?
- [ ] Are root theme selectors controlled and stable?
- [ ] Are mixed-theme intermediate states avoided?
- [ ] Is system preference observed when selected?
- [ ] Are theme transitions compatible with reduced-motion requirements?

## 4.9 Initial rendering

- [ ] Is the initial brand known before visible rendering where possible?
- [ ] Is the light/dark preference resolved early?
- [ ] Is theme flash minimized?
- [ ] Are hydration mismatches avoided?
- [ ] Is no sensitive tenant state leaked during resolution?

## 4.10 Theme state

- [ ] Are brand, scheme preference, and contrast preference modeled separately?
- [ ] Is state ownership documented?
- [ ] Is explicit user preference distinguished from resolved theme?
- [ ] Does tenant configuration remain distinct from user preference?
- [ ] Is preview state separate from published state?
- [ ] Is fallback behavior deterministic?

## 4.11 Tenant theming

- [ ] Are tenant overrides allowlisted?
- [ ] Is arbitrary CSS prohibited?
- [ ] Is arbitrary JS prohibited?
- [ ] Are custom assets validated?
- [ ] Does every override pass contrast validation?
- [ ] Is tenant authorization enforced?
- [ ] Is there a known-valid fallback?
- [ ] Are cross-tenant caches safely scoped?

## 4.12 Token CI

- [ ] Is the token schema validated?
- [ ] Are token types checked?
- [ ] Are aliases resolved?
- [ ] Are cycles rejected?
- [ ] Are dangling references rejected?
- [ ] Are required semantic tokens complete?
- [ ] Are unsupported values rejected?
- [ ] Is artifact generation deterministic?

## 4.13 Theme CI

- [ ] Is every approved brand/mode permutation tested?
- [ ] Is contrast automated?
- [ ] Are core components rendered?
- [ ] Is visual regression enabled?
- [ ] Are form states tested?
- [ ] Are focus states tested?
- [ ] Are forced colors tested?
- [ ] Are high-contrast modes tested?
- [ ] Are accessibility failures release-blocking?

## 4.14 Figma synchronization

- [ ] Is one canonical mutable token source identified?
- [ ] Are Figma variables mapped deterministically to canonical tokens?
- [ ] Is sync direction documented?
- [ ] Do Figma and code use the same semantic naming?
- [ ] Is DTCG-compatible interchange used where practical?
- [ ] Do Figma-originated changes pass version control and CI?
- [ ] Are updated shared Figma variables published deliberately?
- [ ] Is uncontrolled bidirectional editing prohibited?

## 4.15 Versioning

- [ ] Is every theme revision identifiable?
- [ ] Are token changes source-controlled?
- [ ] Are removed/renamed tokens treated as contract changes?
- [ ] Are visual changes reviewed?
- [ ] Are generated artifacts traceable to source?
- [ ] Is rollback possible?

## 4.16 shadcn/ui

- [ ] Do components use semantic CSS-variable-backed tokens?
- [ ] Are `background` / `foreground` pairs preserved?
- [ ] Are `primary` / `primary-foreground` pairs preserved?
- [ ] Are `border`, `input`, and `ring` mapped semantically?
- [ ] Are manual brand conditions absent?
- [ ] Are unnecessary manual dark color overrides absent?
- [ ] Are approved shadcn components reused?

## 4.17 Forms & Validation

- [ ] Are error semantics stable across brands?
- [ ] Are invalid states visible without color alone?
- [ ] Are focus states accessible?
- [ ] Are theme configuration forms schema-validated?
- [ ] Do color inputs show contrast impact?
- [ ] Is publishing distinct from previewing?

## 4.18 Accessibility

- [ ] Does every theme meet the Accessibility standard?
- [ ] Are keyboard focus indicators visible?
- [ ] Are non-text controls identifiable?
- [ ] Are user contrast preferences respected?
- [ ] Are forced-color preferences respected?
- [ ] Are accessibility requirements allowed to override brand preference?
- [ ] Are color-independent cues present where required?

## 4.19 Security

- [ ] Can no tenant inject arbitrary CSS?
- [ ] Can no tenant inject arbitrary JavaScript?
- [ ] Are external assets restricted/sanitized?
- [ ] Are theme-admin operations authorized?
- [ ] Are cross-tenant theme mutations prevented?
- [ ] Can themes not hide mandatory security controls?
- [ ] Are user-generated styles appropriately scoped?

## 4.20 Data & Database

- [ ] Is persistent theme configuration structured?
- [ ] Is tenant scope enforced?
- [ ] Are revisions auditable?
- [ ] Are token migrations defined?
- [ ] Are arbitrary CSS blobs avoided?
- [ ] Are deleted/deprecated brands migrated safely?

## 4.21 API

- [ ] Are theme APIs typed?
- [ ] Are semantic overrides validated?
- [ ] Are inaccessible token names rejected?
- [ ] Is authorization enforced?
- [ ] Is the theme revision returned?
- [ ] Are errors structured?
- [ ] Is arbitrary executable style content excluded?

## 4.22 Performance

- [ ] Is unnecessary brand CSS excluded from client payload?
- [ ] Are resolved themes cacheable?
- [ ] Do cache keys include theme revision?
- [ ] Are runtime recalculations minimized?
- [ ] Is theme switching CSS-driven where appropriate?
- [ ] Are custom fonts performance-reviewed?

## 4.23 Adding a brand

- [ ] Is a business/product need documented?
- [ ] Is the owner identified?
- [ ] Are all required semantic tokens mapped?
- [ ] Are light/dark/high-contrast requirements defined?
- [ ] Are logos and typography approved?
- [ ] Does contrast CI pass?
- [ ] Do component visual regressions pass?
- [ ] Have form/error/focus states been reviewed?
- [ ] Has forced-colors behavior been tested?
- [ ] Is Figma synchronized?
- [ ] Is runtime configuration generated?
- [ ] Is operational ownership established?

---

# 5. Canonical summary

A production theme is a **semantic design-token mapping**, not a collection of CSS overrides.

The canonical token architecture is:

```text
Foundation
    ↓
Brand
    ↓
Semantic
    ↓
Component
```

Components **MUST** consume stable semantic tokens rather than literal brand colors.

Brands **SHOULD** change token values and approved assets rather than fork component implementations.

Light, dark, and high-contrast modes **MUST** remain orthogonal to brand identity.

Theme implementation **SHOULD** be compositional:

```text
brand
× color scheme
× contrast
× platform
× approved tenant variation
```

rather than represented as independently duplicated theme files for every possible combination.

**shadcn/ui is the canonical React component baseline.** Its semantic CSS-variable model—using tokens such as `background`, `foreground`, `primary`, `primary-foreground`, `border`, `input`, and `ring`—SHOULD form the implementation boundary between the token system and application components. citeturn262228search0

Components **MUST NOT** assume that the application background is white, text is black, the primary action is blue, or dark mode is literal black.

Every supported theme permutation **MUST** satisfy the Accessibility standard.

At minimum, WCAG 2.2 AA requires `4.5:1` contrast for normal text, `3:1` for large text, and `3:1` for visual information necessary to identify interface components and states. citeturn266716search0turn266716search1

A dedicated high-contrast mode **SHOULD** target stronger contrast than the ordinary theme and MUST improve more than hue or saturation.

Operating-system/browser forced-color behavior **MUST** be respected. Applications **MUST NOT** globally opt out of forced colors merely to preserve brand appearance. citeturn726650search0turn726650search2

Runtime theme switching **SHOULD** update centrally controlled theme variables rather than require product components to implement independent dark/brand styling.

Initial rendering **SHOULD** resolve enough brand and user preference information to avoid visible flashes of an incorrect theme.

Theme state **MUST** distinguish:

```text
tenant brand
user color-scheme preference
user contrast preference
system preference
resolved theme
preview state
```

instead of collapsing these concepts into one ambiguous value.

Per-tenant theming **MUST** be schema-driven and allowlisted.

Tenants **MUST NOT** receive unrestricted CSS or JavaScript as the normal theming mechanism.

Tenant overrides **MUST** pass the same token, contrast, accessibility, asset, and security validation as first-party brand themes.

Theme administration **MUST** comply with Security, Data & Database, API, State Management, Forms & Validation, Accessibility, Design Tokens, Component, and Pattern standards.

Exactly one system **MUST** be the canonical mutable source for production token definitions.

Figma and code **MUST NOT** evolve as independent sources of truth.

The token pipeline SHOULD use an interoperable representation such as the Design Tokens Community Group's stable `2025.10` format where practical, and Figma Variables MAY participate in automated CI synchronization. citeturn262228search1turn262228search6turn262228search9

Figma-originated token changes **MUST** pass through validation, review, version control, and CI before becoming production runtime artifacts.

Theme CI **MUST** validate:

```text
schema
types
required-token coverage
alias integrity
cycles
contrast
mode completeness
component rendering
accessibility-critical states
```

and accessibility failures **MUST** block release.

A new brand **MUST** have a named owner, complete semantic token mappings, approved assets, required modes, accessibility evidence, component validation, Figma synchronization, production artifacts, and a lifecycle plan before launch.

A production theming system is complete only when the team can answer:

**What is the canonical token source? Which layer owns this value? Is the component consuming semantics rather than appearance? How does the brand map into those semantics? What happens in light, dark, high-contrast, and forced-color environments? Does every combination meet contrast requirements? Who owns user versus tenant preferences? Can a tenant change only what it is authorized to change? How are Figma and code kept synchronized? What blocks an inaccessible brand from shipping? And can another brand be added without forking the design system?**

The corpus boundary is: **Design Tokens defines the reusable vocabulary and token types; Theming defines how brands, modes, accessibility preferences, and tenant configuration resolve that vocabulary; the Design System consumes the resulting semantic contract; Governance controls who may add, change, publish, or retire a brand.**
