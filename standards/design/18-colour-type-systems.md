---
id: "colour-type-systems"
title: "Colour, Typography & Type Systems"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "colour", "typography", "type", "systems"]
applies_to: ["ui"]
related: ["accessibility"]
legacy_number: 98
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 43488
provenance: baseline

---

Research was performed with Firecrawl first, including searches and scrapes of W3C/WAI, Material 3, GOV.UK, Carbon, and shadcn/ui documentation, then cross-checked against current primary references for CSS Color 4, typography, Tailwind, and data-visualisation guidance.

# Colour, Typography & Type Systems — Gold Standard 2026

**Status:** Canonical production standard  
**Baseline:** Web applications using React, Tailwind CSS, and shadcn/ui  
**Conformance language:** **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are normative requirements.

---

# 1. Purpose

This standard defines the canonical production rules for **colour architecture, contrast, data-visualisation palettes, typography, type behaviour in components, implementation tokens, and rendering modes**.

The system MUST:

- separate **primitive values** from **semantic roles** and **component usage**;
- meet or exceed **WCAG 2.2 AA**, with selected AAA requirements adopted as the internal Gold Standard;
- remain usable under light, dark, high-contrast/forced-colours, print, zoom, text resizing, and common colour-vision deficiencies;
- support international products across Latin, CJK, Arabic and other required scripts without treating Latin metrics as universal;
- expose stable design-token contracts to application code rather than raw colour or type values;
- align with the Accessibility, Design Tokens, Component, Pattern, Forms & Validation, Data & Database, API, State Management, and Security standards.

WCAG 2.2 remains the normative accessibility baseline; it defines A, AA and AAA conformance levels and recommends adoption of the current version when developing or updating accessible content. citeturn390627search1turn459865search6

shadcn/ui is the component baseline. Its theming model uses semantic CSS variables such as `background`, `foreground`, `primary`, `primary-foreground`, `border`, `input`, `ring`, and chart tokens, with dark mode implemented by replacing semantic values rather than rewriting component styles. urlshadcn/ui theming documentationhttps://ui.shadcn.com/docs/theming

---

# 2. Rules — Colour Architecture

## 2.1 Three-layer colour model

Every production colour MUST belong to one of three layers:

1. **Primitive tokens** — raw reusable ramps such as blue, neutral, red and green.
2. **Semantic tokens** — purpose-based roles such as `surface.canvas`, `text.primary`, `interactive.primary`, and `status.error`.
3. **Component tokens** — optional aliases for genuinely component-specific requirements.

Application code MUST consume semantic tokens. It MUST NOT directly consume primitive ramp values except inside the design-system implementation.

This follows the role-based pattern used by systems such as Material, GOV.UK and shadcn/ui: implementation values can change while functional meaning remains stable. GOV.UK explicitly recommends functional colours rather than copying hexadecimal values, and shadcn maps semantic theme variables to components. citeturn459865search1 urlshadcn/ui theming documentationhttps://ui.shadcn.com/docs/theming

### Required semantic namespaces

```text
color.surface.*
color.text.*
color.border.*
color.icon.*
color.interactive.*
color.status.*
color.focus.*
color.data.*
```

Examples:

```text
color.surface.canvas
color.surface.raised
color.surface.sunken
color.text.primary
color.text.secondary
color.text.muted
color.text.inverse
color.border.subtle
color.border.default
color.border.strong
color.interactive.primary
color.interactive.primary-hover
color.interactive.primary-active
color.status.error.surface
color.status.error.text
color.status.error.border
color.focus.ring
color.data.categorical.1
```

---

## 2.2 OKLCH is the authoring colour space

Primitive ramps MUST be authored in **OKLCH**, not HSL.

HSL MAY be accepted at an API boundary for legacy integration but MUST NOT be the source from which production ramps are generated.

CSS Color 4 defines Oklab and OKLCH and describes Oklab as having improved hue, chroma and perceptual uniformity. That makes lightness progression more suitable for systematic palette construction than manipulating HSL percentages. citeturn396279search0turn396279search1

The practical distinction is:

```text
HSL:   convenient cylindrical transform of RGB
OKLCH: L = perceptual lightness
       C = chroma
       H = hue
```

The design system MUST treat equal numeric steps as **design inputs**, not proof of accessibility. Every semantic pairing MUST still be contrast-tested after gamut mapping to the rendered output.

---

## 2.3 Canonical primitive ramps

The following values are the baseline production ramps. Brand systems MAY replace `brand`, but MUST preserve the semantic contrast contracts later in this standard.

| Step | Neutral | Brand / blue | Error / red | Warning / amber | Success / green |
|---|---|---|---|---|---|
| 50 | `oklch(0.985 0 0)` | `oklch(0.970 0.014 254.604)` | `oklch(0.971 0.013 17.380)` | `oklch(0.987 0.022 95.277)` | `oklch(0.982 0.018 155.826)` |
| 100 | `oklch(0.967 0.001 286.375)` | `oklch(0.932 0.032 255.585)` | `oklch(0.936 0.032 17.717)` | `oklch(0.962 0.059 95.617)` | `oklch(0.962 0.044 156.743)` |
| 200 | `oklch(0.920 0.004 286.320)` | `oklch(0.882 0.059 254.128)` | `oklch(0.885 0.062 18.334)` | `oklch(0.924 0.120 95.746)` | `oklch(0.925 0.084 155.995)` |
| 300 | `oklch(0.871 0.006 286.286)` | `oklch(0.809 0.105 251.813)` | `oklch(0.808 0.114 19.571)` | `oklch(0.879 0.169 91.605)` | `oklch(0.871 0.150 154.449)` |
| 400 | `oklch(0.705 0.015 286.067)` | `oklch(0.707 0.165 254.624)` | `oklch(0.704 0.191 22.216)` | `oklch(0.828 0.189 84.429)` | `oklch(0.792 0.209 151.711)` |
| 500 | `oklch(0.552 0.016 285.938)` | `oklch(0.623 0.214 259.815)` | `oklch(0.637 0.237 25.331)` | `oklch(0.769 0.188 70.080)` | `oklch(0.723 0.219 149.579)` |
| 600 | `oklch(0.442 0.017 285.786)` | `oklch(0.546 0.245 262.881)` | `oklch(0.577 0.245 27.325)` | `oklch(0.666 0.179 58.318)` | `oklch(0.627 0.194 149.214)` |
| 700 | `oklch(0.370 0.013 285.805)` | `oklch(0.488 0.243 264.376)` | `oklch(0.505 0.213 27.518)` | `oklch(0.555 0.163 48.998)` | `oklch(0.527 0.154 150.069)` |
| 800 | `oklch(0.274 0.006 286.033)` | `oklch(0.424 0.199 265.638)` | `oklch(0.444 0.177 26.899)` | `oklch(0.473 0.137 46.201)` | `oklch(0.448 0.119 151.328)` |
| 900 | `oklch(0.210 0.006 285.885)` | `oklch(0.379 0.146 265.522)` | `oklch(0.396 0.141 25.723)` | `oklch(0.414 0.112 45.904)` | `oklch(0.393 0.095 152.535)` |
| 950 | `oklch(0.141 0.005 285.823)` | `oklch(0.282 0.091 267.935)` | `oklch(0.258 0.092 26.042)` | `oklch(0.279 0.077 45.635)` | `oklch(0.266 0.065 152.934)` |

Tailwind itself now exposes design tokens through CSS theme variables and uses OKLCH throughout its default colour system, which makes this representation compatible with the production implementation baseline. citeturn998581search0turn998581search3

### Ramp generation rules

Generated ramps MUST:

- progress primarily through **lightness**, not saturation alone;
- preserve recognizable hue through the useful middle range;
- reduce chroma near white and black where required by gamut;
- include at least the functional points needed for surfaces, borders, foregrounds and interactive states;
- be checked after sRGB gamut conversion;
- NOT mechanically derive semantic dark mode by reversing numeric steps.

---

## 2.4 Semantic colour roles

### Surface

```text
surface.canvas
surface.raised
surface.overlay
surface.sunken
surface.inverse
```

### Text

```text
text.primary
text.secondary
text.muted
text.disabled
text.inverse
text.link
text.link-hover
```

### Border

```text
border.subtle
border.default
border.strong
border.interactive
border.invalid
```

A low-contrast decorative separator MAY use `border.subtle`. A border required to identify a control MUST meet the non-text contrast requirement and MUST therefore use an appropriate interactive/strong token rather than the decorative border token. WCAG 1.4.11 requires at least 3:1 contrast for visual information needed to identify UI controls, states and meaningful graphics. citeturn459865search8turn390627search2

### Interactive

```text
interactive.primary
interactive.primary-hover
interactive.primary-active
interactive.secondary
interactive.secondary-hover
interactive.selected
interactive.disabled
interactive.link
interactive.link-hover
```

### Status

```text
status.info.*
status.success.*
status.warning.*
status.error.*
```

Status tokens MUST include at minimum:

```text
surface
text
border
icon
```

---

## 2.5 Dark-mode inversion rules

Dark mode MUST be a **semantic remapping**, not `50 ↔ 950`, CSS inversion, or a global filter.

The following rules apply:

1. `surface.canvas` becomes dark.
2. Elevated surfaces usually become **lighter than the canvas**, not darker.
3. Primary text becomes a near-white neutral rather than absolute white where appropriate.
4. Brand and status colours MUST be individually remapped to variants that preserve semantic contrast.
5. Shadows SHOULD reduce in importance; borders and tonal surface differences SHOULD carry more elevation information.
6. Saturated colours SHOULD generally use lighter variants against dark surfaces.
7. Interactive states MUST remain distinguishable by more than hue alone.

Role-oriented light/dark colour schemes are consistent with Material's tonal-role architecture and shadcn's model of overriding identical semantic tokens inside a dark-mode scope. urlMaterial 3 design-system documentationhttps://developer.android.com/develop/ui/compose/designsystems/material3 urlshadcn/ui theming documentationhttps://ui.shadcn.com/docs/theming

---

# 3. Rules — Contrast and Accessibility Maths

## 3.1 WCAG contrast requirements

The product MUST meet these minimums:

| Content | Minimum |
|---|---:|
| Normal text — WCAG AA | **4.5:1** |
| Large text — WCAG AA | **3:1** |
| Normal text — WCAG AAA | **7:1** |
| Large text — WCAG AAA | **4.5:1** |
| Essential non-text UI/graphics | **3:1** |
| Gold Standard focus indicator | **3:1 state/adjacent contrast** |

WCAG defines large text approximately as **24 CSS px regular** or **18.5 CSS px bold**, based on its 18pt / 14pt bold thresholds. The contrast figures are thresholds and MUST NOT be rounded upward: `4.499:1` does not satisfy `4.5:1`. citeturn390627search3turn390627search6

The Gold Standard requires:

- **AA as a release blocker**;
- **AAA contrast SHOULD be targeted for long-form reading text** where it does not materially damage hierarchy;
- interactive text MUST remain AA-compliant in hover, focus, active, selected and visited states.

---

## 3.2 Contrast formula

WCAG contrast is:

```text
contrast = (Llighter + 0.05) / (Ldarker + 0.05)
```

For sRGB:

```text
L = 0.2126R + 0.7152G + 0.0722B
```

Each normalized channel uses:

```text
if CsRGB <= 0.04045:
    C = CsRGB / 12.92
else:
    C = ((CsRGB + 0.055) / 1.055) ^ 2.4
```

The current WCAG definition uses `0.04045`; older implementations may still contain the obsolete `0.03928` threshold. citeturn390627search0turn390627search7

Contrast testing MUST operate on the final composited/rendered foreground and background colours, not merely token names.

---

## 3.3 Automated contrast guard

A production design-system package SHOULD include an executable contrast assertion:

```ts
function linearise(channel8: number) {
  const c = channel8 / 255
  return c <= 0.04045
    ? c / 12.92
    : Math.pow((c + 0.055) / 1.055, 2.4)
}

function luminance([r, g, b]: [number, number, number]) {
  return (
    0.2126 * linearise(r) +
    0.7152 * linearise(g) +
    0.0722 * linearise(b)
  )
}

function contrast(a: [number, number, number], b: [number, number, number]) {
  const l1 = luminance(a)
  const l2 = luminance(b)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

expect(contrast(textPrimary, surfaceCanvas)).toBeGreaterThanOrEqual(4.5)
```

CI SHOULD test the semantic token matrix rather than attempting every primitive-to-primitive combination.

---

## 3.4 Focus indicators

Every keyboard-focusable component MUST expose a visible focus indicator.

Gold Standard focus treatment MUST:

- be equivalent to at least a **2 CSS px perimeter**;
- achieve at least **3:1** contrast relative to the relevant unfocused/adjacent colour;
- remain visible when the element touches a container edge;
- not be completely hidden by sticky headers, overlays or clipping;
- remain visible in forced-colours mode.

WCAG 2.4.13 defines the enhanced focus appearance requirement using an indicator area at least as large as a 2 CSS pixel perimeter and a 3:1 state contrast. WCAG 2.2 also adds AA requirements addressing focus being obscured. citeturn390627search0turn390627search4

Recommended implementation:

```css
:where(a, button, input, textarea, select, [tabindex]):focus-visible {
  outline: 2px solid var(--ds-focus-ring);
  outline-offset: 2px;
}

@media (forced-colors: active) {
  :where(a, button, input, textarea, select, [tabindex]):focus-visible {
    outline: 2px solid Highlight;
  }
}
```

---

## 3.5 Never-colour-alone rule

Colour MUST NOT be the sole means of communicating:

- validation state;
- success or failure;
- required/optional state;
- selected state;
- chart category;
- increase/decrease;
- availability;
- map classification;
- interactive affordance.

WCAG 1.4.1 explicitly requires information conveyed through colour to have an additional visual means such as text, shape or another distinguishable feature. citeturn459865search2

Therefore:

```text
Error = icon + “Error”/message + colour
Selected = checkmark/position/shape + colour
Chart series = colour + marker/dash/direct label
Map boundary = colour + stroke/pattern/label where needed
```

---

## 3.6 Colour-vision deficiency

There is no production rule under which “passes a colour-blind simulator” permits meaning to be encoded by hue alone.

Approved CVD-oriented categorical pairs include members of the Okabe–Ito family:

| Pair | Value |
|---|---|
| Blue | `#0072B2` |
| Orange | `#E69F00` |
| Sky blue | `#56B4E9` |
| Vermilion | `#D55E00` |
| Bluish green | `#009E73` |
| Reddish purple | `#CC79A7` |

These MUST still be accompanied by shape, line style, marker, direct label, position, or text when category identity matters. ColorBrewer likewise distinguishes qualitative, sequential and diverging schemes and provides explicit filtering for colour-vision-safe mapping schemes. citeturn505237search0turn505237search1

---

# 4. Rules — Data-Visualisation Colour

Application UI colours MUST NOT be reused indiscriminately as chart palettes.

Carbon explicitly separates data-visualisation palettes from the general product palette and defines categorical, sequential and diverging usage according to the structure of the data. citeturn396279search3turn970780view1

## 4.1 Categorical palette

Categorical palettes MUST represent **nominal/discrete categories without implied magnitude**. citeturn505237search1turn396279search3

### Light surface

```text
data.categorical.1 = #0072B2
data.categorical.2 = #E69F00
data.categorical.3 = #009E73
data.categorical.4 = #CC79A7
data.categorical.5 = #D55E00
data.categorical.6 = #56B4E9
data.categorical.7 = #000000
data.categorical.8 = #F0E442
```

`#F0E442` MUST NOT be used for small marks on white without a dark outline or other redundant encoding.

### Dark surface

```text
data.categorical.1 = #56B4E9
data.categorical.2 = #FFC857
data.categorical.3 = #5ED6B3
data.categorical.4 = #E59BC8
data.categorical.5 = #FF8266
data.categorical.6 = #A78BFA
data.categorical.7 = #E4E4E7
data.categorical.8 = #F0E442
```

Dark-surface chart palettes MUST be separately tested against the actual chart background. They MUST NOT be produced by applying CSS `filter: invert()` to light palettes.

Carbon similarly supplies theme-aware categorical/sequential treatment and reverses the interpretation of sequential lightness for dark themes. citeturn970780view3

---

## 4.2 Sequential palettes

Sequential palettes MUST be used for ordered low→high data.

Light mode example:

```text
#EFF6FF
#DBEAFE
#BFDBFE
#93C5FD
#60A5FA
#2563EB
#1E3A8A
```

Dark mode example:

```text
#172554
#1E3A8A
#1D4ED8
#2563EB
#60A5FA
#93C5FD
#DBEAFE
```

The dominant visual ordering MUST be lightness, not arbitrary hue variation. ColorBrewer defines sequential schemes around ordered lightness progression; Carbon likewise uses monochromatic sequential scales and reverses the high-value lightness treatment on dark surfaces. citeturn505237search1turn970780view0

---

## 4.3 Diverging palettes

Diverging palettes MUST have a meaningful central reference point such as:

- zero;
- target;
- median;
- baseline;
- no change.

Example neutral-centred palette:

```text
#6D28D9
#8B5CF6
#C4B5FD
#F4F4F5
#99F6E4
#2DD4BF
#0F766E
```

The centre MUST NOT imply a meaningful value unless the domain genuinely contains one.

ColorBrewer defines diverging schemes as emphasizing a critical midpoint and both extremes, while Carbon provides red–cyan and purple–teal diverging families. citeturn505237search1turn970780view1

---

## 4.4 Maps and geospatial visualisation

Choropleth maps MUST use:

- sequential scales for one-direction magnitude;
- diverging scales when a meaningful midpoint exists;
- qualitative palettes only for nominal areas.

Map fills MUST NOT obscure required borders, roads, labels or selection states.

Point and line layers MUST use redundant encoding:

```text
colour + shape
colour + dash pattern
colour + stroke width
colour + direct label
```

ColorBrewer is explicitly designed as colour guidance for cartography and distinguishes sequential, diverging and qualitative schemes according to data semantics. citeturn505237search0turn505237search2

A geographic layer that must remain detectable MUST have sufficient contrast against the basemap or receive an outline/halo that does.

---

## 4.5 Chart accessibility

Every chart SHOULD provide a non-visual representation appropriate to the task:

- accessible summary;
- data table;
- downloadable data;
- programmatic labels;
- textual description of significant trends.

Series identification MUST NOT rely solely on legend colour.

For line charts, adjacent series SHOULD differ by at least two of:

```text
colour
dash
marker
direct label
stroke width
```

---

# 5. Rules — Typography System

## 5.1 Font selection contract

A production typeface MUST be evaluated on:

1. **legibility at UI sizes**;
2. availability of required weights without synthetic bold;
3. variable-font support where operationally beneficial;
4. clear punctuation and disambiguation of `I/l/1`, `O/0`;
5. numeric OpenType features;
6. diacritic and currency-symbol coverage;
7. script and language coverage;
8. redistribution/webfont/app-embedding licence terms;
9. acceptable file size and subset strategy;
10. stable metrics across fallback fonts.

Apple recommends legible sizes, avoiding very light weights at small sizes, limiting unnecessary typeface proliferation, and supporting dynamic text scaling when custom fonts are used. citeturn998581search1turn998581search2

Variable fonts SHOULD be preferred where they materially reduce font requests or provide useful axes such as weight, width or optical size. CSS Fonts 4 defines variable-font axes and recommends high-level properties such as `font-weight` and `font-optical-sizing` rather than low-level `font-variation-settings` for registered axes. citeturn388923search0

---

## 5.2 Script coverage

A single Latin-optimized font MUST NOT be assumed to cover all product locales adequately.

The system MUST expose script-aware families.

```css
:root {
  --font-latin:
    "InterVariable",
    "Inter",
    ui-sans-serif,
    system-ui,
    sans-serif;

  --font-cjk-sc:
    "Noto Sans CJK SC",
    "Noto Sans SC",
    system-ui,
    sans-serif;

  --font-cjk-tc:
    "Noto Sans CJK TC",
    "Noto Sans TC",
    system-ui,
    sans-serif;

  --font-cjk-jp:
    "Noto Sans CJK JP",
    "Noto Sans JP",
    system-ui,
    sans-serif;

  --font-cjk-kr:
    "Noto Sans CJK KR",
    "Noto Sans KR",
    system-ui,
    sans-serif;

  --font-arabic:
    "Noto Sans Arabic",
    system-ui,
    sans-serif;

  --font-mono:
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace;
}
```

The actual licensed font packages MUST be recorded in the repository's third-party-licence inventory.

For Arabic:

- letter spacing MUST normally remain `normal`;
- text MUST retain contextual shaping and ligatures;
- Latin assumptions such as uppercase labels MUST NOT be projected onto Arabic;
- components MUST be verified in RTL.

CJK type MAY require script-specific line-height and punctuation treatment rather than inheriting Latin values blindly.

---

## 5.3 Type scale

The base body size MUST be `1rem` and MUST respect user font preferences.

Canonical scale:

| Token | Size |
|---|---:|
| `text-xs` | `0.75rem` / 12px |
| `text-sm` | `0.875rem` / 14px |
| `text-md` | `1rem` / 16px |
| `text-lg` | `1.125rem` / 18px |
| `text-xl` | `1.25rem` / 20px |
| `text-2xl` | 24–28px fluid |
| `text-3xl` | 30–36px fluid |
| `text-4xl` | 36–48px fluid |
| `text-5xl` | 48–64px fluid |

Carbon similarly uses explicit type tokens and a finite type scale instead of arbitrary per-component font sizes. citeturn459865search0turn459865search3

### Fluid display type

UI/body text SHOULD remain predictable. Larger editorial/display styles MAY use `clamp()`:

```css
--text-2xl: clamp(1.5rem, 1.36rem + 0.45vw, 1.75rem);
--text-3xl: clamp(1.875rem, 1.66rem + 0.75vw, 2.25rem);
--text-4xl: clamp(2.25rem, 1.82rem + 1.55vw, 3rem);
--text-5xl: clamp(3rem, 2.43rem + 2vw, 4rem);
```

Fluid scaling MUST NOT prevent browser zoom, text resizing, wrapping or reflow.

---

## 5.4 Line height

Canonical values:

```text
caption / xs      1.333
small UI          1.429
body              1.500
comfortable body  1.625
heading            1.10–1.25
display            1.00–1.15
```

The system MUST NOT use `line-height: 1` for body text.

Apple specifically notes that longer passages can benefit from more leading and cautions against tight leading for multi-line text. citeturn998581search1

---

## 5.5 Measure

Long-form body text SHOULD target approximately:

```text
45ch–75ch
canonical default: 66ch
```

Wide application layouts MUST NOT automatically make text columns full-width.

This is a system readability constraint, not a grid constraint: data tables, code, dashboards and visualisations may legitimately exceed prose measure.

---

## 5.6 Weight

Default weight policy:

```text
Regular body: 400
Medium UI emphasis: 500
Semibold headings/labels: 600–650
Bold: 700 only where hierarchy requires it
```

Thin/light weights SHOULD NOT be used for small functional text. Apple recommends avoiding light system-font weights where legibility may suffer. citeturn998581search1

Synthetic bold and synthetic italic SHOULD be disabled when the real face exists.

```css
font-synthesis: none;
```

---

## 5.7 Optical sizing and alignment

Fonts with an `opsz` axis SHOULD use:

```css
font-optical-sizing: auto;
```

CSS Fonts 4 defines optical sizing specifically so glyph design can adapt to rendered size when the font provides that axis. citeturn388923search0

Visual alignment MAY require optical rather than mathematical treatment for:

- icons beside text;
- cap-height alignment;
- punctuation at card edges;
- large quotation marks;
- badges;
- numeric columns.

Such corrections MUST be encoded in component tokens or layout rules, not repeated as arbitrary one-off pixel offsets throughout product code.

---

## 5.8 Numerals

Data-heavy components MUST use tabular lining figures where column stability matters:

```css
.metric,
.numeric-column,
.money,
.timestamp {
  font-variant-numeric: tabular-nums lining-nums;
}
```

CSS Fonts explicitly defines `tabular-nums` for equal-width numeric figures and `lining-nums` for lining forms. citeturn388923search0

Normal prose SHOULD use the font's default proportional numerals unless alignment requires otherwise.

IDs and code MAY additionally use:

```css
font-variant-numeric: tabular-nums slashed-zero;
```

where supported.

---

## 5.9 Number and date rendering

Applications MUST format numbers, currencies and dates according to locale rather than concatenating strings manually.

```ts
const money = new Intl.NumberFormat(locale, {
  style: "currency",
  currency,
}).format(value)

const date = new Intl.DateTimeFormat(locale, {
  dateStyle: "medium",
  timeZone,
}).format(timestamp)
```

Data received from the API SHOULD remain machine-typed—for example ISO timestamps and numeric amounts. Presentation formatting belongs at the display boundary, consistent with the API and Data standards.

User-facing dates MUST avoid unexplained ambiguous formats such as `03/04/26` when locale is unknown.

---

# 6. Rules — Type in Components

## 6.1 Canonical text roles

| Role | Default specification |
|---|---|
| Display | fluid 48–64px, 600–650, 1.0–1.1 |
| H1 | 36–48px, 600–650, 1.1 |
| H2 | 30–36px, 600–650, 1.15 |
| H3 | 24–28px, 600, 1.2 |
| H4 | 20px, 600, 1.3 |
| Body | 16px, 400, 1.5 |
| Body small | 14px, 400, 1.43 |
| Label | 14px, 500–600, 1.43 |
| Caption | 12px, 400–500, 1.33 |
| Code | 13–14px mono, 1.5 |
| Dense table | 13–14px, 400/500, ≥18px line box |
| Metric | role-specific, tabular lining numerals |

Components MUST request a role/token. They MUST NOT invent new `13.5px`, `15px`, `17px`, etc. values without design-system review.

---

## 6.2 Headings

Heading typography MUST express semantic hierarchy but MUST NOT be used as a substitute for semantic HTML.

Correct:

```tsx
<h2 className="text-heading-lg">Billing details</h2>
```

Incorrect:

```tsx
<div className="text-heading-lg">Billing details</div>
```

Visual level and document outline MAY differ when component composition requires it, but both decisions must be explicit.

---

## 6.3 Labels

Form labels MUST:

- remain visible;
- use `14px` or larger by default;
- use at least medium weight;
- not rely on placeholder text as the only label;
- preserve adequate contrast when disabled states are not applicable.

Validation state MUST combine text/iconography with colour, consistent with the Forms & Validation and Accessibility standards. citeturn459865search2

---

## 6.4 Captions and secondary text

Caption size MAY be 12px for non-critical supporting information.

Critical instructions, validation errors, legal obligations and primary actions MUST NOT be demoted to caption styling merely to save space.

Muted text MUST still satisfy normal-text contrast requirements when the content is required to use the product.

---

## 6.5 Code

Code SHOULD use a dedicated monospace font.

Inline code MUST remain visually distinguishable without reducing contrast:

```css
.code-inline {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--ds-surface-sunken);
  border: 1px solid var(--ds-border-subtle);
  border-radius: 0.25rem;
  padding-inline: 0.25em;
}
```

Syntax highlighting MUST obey the never-colour-alone rule where colour represents diagnostics or semantic state.

---

## 6.6 Dense tables

Dense tables MAY use 13–14px type provided:

- zoom and text resizing remain functional;
- row height does not clip glyphs;
- line height remains at least approximately 18px;
- headers retain clear hierarchy;
- numeric columns use tabular figures;
- focus and selection states remain visible.

Density MUST be implemented with spacing tokens, not by shrinking critical text below usable sizes.

---

## 6.7 Truncation

Truncation MUST be deliberate.

Single-line ellipsis:

```css
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

Multi-line truncation MAY use `line-clamp`.

The following SHOULD NOT be truncated when the complete value is operationally important:

- error messages;
- security warnings;
- destructive action labels;
- primary headings;
- record identifiers needed for disambiguation;
- monetary totals;
- critical status.

Where truncation is necessary, the full content MUST remain programmatically and practically retrievable—for example expandable text, an accessible disclosure, or copy affordance.

Apple likewise recommends minimizing text truncation as accessibility text sizes increase. citeturn998581search1

---

# 7. Rules — Implementation

## 7.1 CSS custom properties

Production CSS MUST expose primitive and semantic layers separately.

```css
:root {
  /* Primitive */
  --ds-neutral-50: oklch(0.985 0 0);
  --ds-neutral-300: oklch(0.871 0.006 286.286);
  --ds-neutral-500: oklch(0.552 0.016 285.938);
  --ds-neutral-600: oklch(0.442 0.017 285.786);
  --ds-neutral-950: oklch(0.141 0.005 285.823);

  --ds-blue-400: oklch(0.707 0.165 254.624);
  --ds-blue-600: oklch(0.546 0.245 262.881);
  --ds-blue-700: oklch(0.488 0.243 264.376);

  /* Semantic */
  --ds-surface-canvas: white;
  --ds-surface-raised: var(--ds-neutral-50);

  --ds-text-primary: var(--ds-neutral-950);
  --ds-text-secondary: var(--ds-neutral-700);
  --ds-text-muted: var(--ds-neutral-600);

  --ds-border-subtle: var(--ds-neutral-300);
  --ds-border-interactive: var(--ds-neutral-500);

  --ds-interactive-primary: var(--ds-blue-600);
  --ds-interactive-primary-hover: var(--ds-blue-700);

  --ds-focus-ring: var(--ds-blue-600);
}
```

---

## 7.2 Token naming contract

Token names MUST describe **purpose**, not appearance.

Correct:

```text
--ds-text-primary
--ds-border-invalid
--ds-surface-raised
--ds-status-warning-text
```

Incorrect:

```text
--dark-gray
--light-blue
--red-border
--card-gray
--blue-button
```

Primitive tokens MAY describe colour families because their purpose is to represent raw values.

Semantic tokens MUST NOT contain mode names such as `dark-primary-text`. Modes override the same semantic contract.

---

## 7.3 shadcn/ui mapping

The application MUST preserve the standard shadcn semantic interface where shadcn components are used:

```css
:root {
  --background: var(--ds-surface-canvas);
  --foreground: var(--ds-text-primary);

  --card: var(--ds-surface-raised);
  --card-foreground: var(--ds-text-primary);

  --popover: var(--ds-surface-overlay);
  --popover-foreground: var(--ds-text-primary);

  --primary: var(--ds-interactive-primary);
  --primary-foreground: var(--ds-text-on-primary);

  --secondary: var(--ds-interactive-secondary);
  --secondary-foreground: var(--ds-text-primary);

  --muted: var(--ds-surface-muted);
  --muted-foreground: var(--ds-text-muted);

  --border: var(--ds-border-subtle);
  --input: var(--ds-border-interactive);
  --ring: var(--ds-focus-ring);

  --destructive: var(--ds-status-error-action);
}
```

shadcn's documented convention intentionally pairs a surface token with its foreground token and maps the same variables into dark mode. urlshadcn/ui theming documentationhttps://ui.shadcn.com/docs/theming

---

## 7.4 Tailwind mapping

For Tailwind CSS v4:

```css
@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);

  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);

  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --font-sans: var(--ds-font-sans);
  --font-mono: var(--ds-font-mono);
}
```

Tailwind v4 uses `@theme` variables as design tokens that generate corresponding utilities and CSS custom properties. citeturn998581search0turn998581search6

Product code SHOULD therefore use:

```html
<div class="bg-background text-foreground border-border">
```

and SHOULD NOT use:

```html
<div class="bg-zinc-50 text-zinc-950 border-zinc-300">
```

for semantic product surfaces.

---

## 7.5 Per-mode semantic token table

| Semantic token | Light | Dark | High contrast | Print |
|---|---|---|---|---|
| `surface.canvas` | `#FFFFFF` | `neutral-950` | `Canvas` | `#FFFFFF` |
| `surface.raised` | `neutral-50` | `neutral-900` | `Canvas` | `#FFFFFF` |
| `text.primary` | `neutral-950` | `neutral-50` | `CanvasText` | `#000000` |
| `text.secondary` | `neutral-700` | `neutral-300` | `CanvasText` | `#222222` |
| `text.muted` | `neutral-600` | `neutral-400` | `GrayText` | `#555555` |
| `border.subtle` | `neutral-300` | `neutral-800` | `CanvasText` | `#B0B0B0` |
| `border.interactive` | `neutral-500` | `neutral-500` | `ButtonText` | `#555555` |
| `interactive.primary` | `blue-600` | `blue-400` | `Highlight` | `#000000` |
| `text.on-primary` | `#FFFFFF` | `neutral-950` | `HighlightText` | `#FFFFFF` |
| `interactive.link` | `blue-700` | `blue-300` | `LinkText` | `#000000` |
| `focus.ring` | `blue-600` | `blue-400` | `Highlight` | `#000000` |
| `status.error.text` | `red-800` | `red-300` | `CanvasText` | `#000000` |
| `status.success.text` | `green-800` | `green-300` | `CanvasText` | `#000000` |
| `status.warning.text` | `amber-900` | `amber-300` | `CanvasText` | `#000000` |

A token matrix MUST be verified programmatically after any primitive-value change.

---

# 8. Rules — Light, Dark, High-Contrast and Print Modes

## 8.1 Light

Light mode MUST:

- use a near-white or white canvas;
- preserve ≥4.5:1 normal text contrast;
- reserve low-contrast borders for decorative separation only;
- use sufficiently dark text tokens rather than opacity hacks.

Text colour MUST NOT be produced as `color: rgb(... / 40%)` when the composited result is untested.

---

## 8.2 Dark

Dark mode MUST:

- use a near-black neutral rather than assuming absolute black;
- maintain the same semantic token names;
- retest all text, status and data colours;
- use lighter chromatic steps where required;
- avoid large high-chroma areas unless intentional;
- treat elevation through tonal surfaces and borders, not simply darker shadows.

---

## 8.3 High contrast / forced colours

The system MUST support platform forced-colour modes.

```css
@media (forced-colors: active) {
  :root {
    --ds-surface-canvas: Canvas;
    --ds-surface-raised: Canvas;
    --ds-text-primary: CanvasText;
    --ds-text-secondary: CanvasText;
    --ds-border-interactive: ButtonText;
    --ds-interactive-primary: Highlight;
    --ds-text-on-primary: HighlightText;
    --ds-focus-ring: Highlight;
  }

  .decorative-only {
    forced-color-adjust: none;
  }
}
```

`forced-color-adjust: none` MUST be exceptional. It MUST NOT be applied globally merely to preserve brand appearance.

A user-selected high-contrast environment has priority over aesthetic fidelity.

---

## 8.4 Print

Print styles MUST remove dependencies on:

- dark backgrounds;
- colour-only state;
- animation;
- hover;
- box shadows;
- interactive-only affordances.

```css
@media print {
  :root {
    --ds-surface-canvas: #fff;
    --ds-surface-raised: #fff;
    --ds-text-primary: #000;
    --ds-text-secondary: #222;
    --ds-border-subtle: #aaa;
    --ds-border-strong: #000;
  }

  * {
    box-shadow: none !important;
    text-shadow: none !important;
  }

  a {
    color: #000;
    text-decoration: underline;
  }
}
```

Charts intended for printing SHOULD provide patterns, labels, marker styles, or sufficient grayscale differentiation. ColorBrewer explicitly exposes print-friendly and photocopy-safe mapping options in addition to colour-vision-safe schemes. citeturn505237search0

---

# 9. Anti-patterns

| Do | Don't |
|---|---|
| Use semantic tokens such as `text.primary` | Hard-code `#111827` inside components |
| Author ramps in OKLCH | Generate “accessible” ramps by changing HSL lightness alone |
| Test actual composited contrast | Assume a named palette is automatically accessible |
| Remap semantic roles for dark mode | Reverse every primitive ramp mechanically |
| Use visible text/icon/shape plus status colour | Make an invalid field identifiable only because it is red |
| Use 2px+ high-contrast focus treatment | Remove browser outlines without replacement |
| Use `border.interactive` for essential control boundaries | Use a faint decorative border for form controls |
| Use qualitative palettes for categories | Use a sequential ramp for unrelated categories |
| Use sequential scales for ordered magnitudes | Use a rainbow merely because there are many values |
| Use a meaningful neutral midpoint in diverging scales | Use a diverging scale where no midpoint exists |
| Add markers/dashes/direct labels to chart series | Depend exclusively on legend hue |
| Use script-specific fallback policies | Assume one Latin webfont handles Arabic/CJK correctly |
| Use type tokens | Create arbitrary per-component font sizes |
| Use `font-optical-sizing: auto` where supported | Manually force arbitrary `opsz` values throughout components |
| Use tabular numerals for aligned numeric data | Use proportional numerals in financial columns |
| Format dates/numbers through locale APIs | Concatenate dates and currencies manually |
| Preserve complete critical text | Ellipsize warnings, error messages or decisive values |
| Honour forced colours | Disable forced colours globally to preserve branding |
| Use semantic Tailwind utilities such as `bg-background` | Couple product components to primitive `bg-blue-600` values |
| Provide printable labels/patterns | Assume coloured charts remain understandable in monochrome |

---

# 10. Checklist

A release conforming to this standard MUST verify:

- [ ] All production UI colours resolve through semantic tokens.
- [ ] Primitive ramps are defined in OKLCH.
- [ ] Light and dark modes use semantic remapping rather than automatic inversion.
- [ ] Normal text is ≥4.5:1.
- [ ] Large text is ≥3:1.
- [ ] Essential non-text UI indicators are ≥3:1.
- [ ] Focus is visible, ≥2 CSS px equivalent, and ≥3:1 where required by the Gold Standard.
- [ ] Meaning is never represented solely by colour.
- [ ] Status components contain text/icon/shape redundancy.
- [ ] Charts distinguish series through redundant visual encoding.
- [ ] Sequential/diverging/categorical palettes match the data semantics.
- [ ] Map layers have basemap-aware strokes/labels.
- [ ] Dark chart palettes are independently tested.
- [ ] Typography is tokenized.
- [ ] Body text defaults to 1rem.
- [ ] Long-form measure is constrained.
- [ ] Custom fonts have documented licences and locale coverage.
- [ ] Required CJK and Arabic locales are tested using actual strings.
- [ ] RTL layouts are tested where applicable.
- [ ] Variable font axes use standard CSS properties where available.
- [ ] Numeric tables use tabular lining figures.
- [ ] User-facing number/date formatting is locale-aware.
- [ ] Critical content is not irretrievably truncated.
- [ ] 200% zoom/text resizing does not remove content or functionality.
- [ ] shadcn semantic tokens map to the design-system tokens.
- [ ] Tailwind utilities consume semantic theme variables.
- [ ] Forced-colour mode remains functional.
- [ ] Print mode remains understandable without colour.
- [ ] Token contrast tests run in CI.
- [ ] Design-token changes receive visual-regression and accessibility testing.

---

# 11. Canonical Summary

The Gold Standard is:

**1. Colour is role-based.**  
Components consume semantic roles; raw palettes remain implementation details. GOV.UK and shadcn both reinforce purpose-based colour abstraction. citeturn459865search1 urlshadcn/ui theming documentationhttps://ui.shadcn.com/docs/theming

**2. OKLCH is the source of truth.**  
Its lightness/chroma/hue model is preferable for generating controlled perceptual ramps, while accessibility remains validated using final WCAG contrast maths. citeturn396279search1turn390627search0

**3. AA is mandatory; selected AAA behaviour is the internal standard.**  
Normal text MUST reach 4.5:1, essential non-text visuals 3:1, and focus treatment follows the enhanced 2px/3:1 target. citeturn390627search3turn390627search4

**4. Colour never carries meaning alone.**  
Errors, selections, series, map classes and states require text, shape, iconography, position, patterns or another redundant cue. citeturn459865search2

**5. Data palettes follow data semantics.**  
Categorical is for identity, sequential for ordered magnitude, diverging for values around a meaningful midpoint. citeturn505237search1turn396279search3

**6. Typography is a system, not a collection of font sizes.**  
Typeface, scale, weight, leading, numeric features, script coverage, variable axes and responsive behaviour are all tokenised. Carbon's type system similarly combines calibrated tokens with explicit scale and type-set roles. citeturn459865search0turn459865search3

**7. International typography is first-class.**  
Locale/script coverage, RTL behaviour, shaping and fallback metrics are production requirements, not post-localisation fixes.

**8. Numeric interfaces use numeric typography.**  
Financial, metric and tabular data use tabular lining figures when alignment is meaningful. citeturn388923search0

**9. Modes replace values, not contracts.**  
Light, dark, high-contrast and print all implement the same semantic interface.

**10. shadcn/ui is the component boundary.**  
The system preserves shadcn's semantic variables while mapping them into the canonical token layer; Tailwind utilities are generated from the same underlying contracts. citeturn998581search0 urlshadcn/ui theming documentationhttps://ui.shadcn.com/docs/theming

---

# 12. Sources

1. urlW3C — Web Content Accessibility Guidelines (WCAG) 2.2https://www.w3.org/TR/WCAG22/  
2. urlW3C/WAI — Understanding Contrast (Minimum)https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html  
3. urlW3C/WAI — Understanding Non-text Contrasthttps://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html  
4. urlW3C/WAI — Understanding Use of Colorhttps://www.w3.org/WAI/WCAG22/Understanding/use-of-color  
5. urlW3C/WAI — Understanding Focus Appearancehttps://www.w3.org/WAI/WCAG22/Understanding/focus-appearance  
6. urlW3C — CSS Color Module Level 4https://www.w3.org/TR/css-color-4/  
7. urlW3C — CSS Fonts Module Level 4https://www.w3.org/TR/css-fonts-4/  
8. urlMaterial 3 — Design systems and theminghttps://developer.android.com/develop/ui/compose/designsystems/material3  
9. urlGOV.UK Design System — Colourhttps://design-system.service.gov.uk/styles/colour/  
10. urlGOV.UK Design System — Typographyhttps://design-system.service.gov.uk/styles/typography/  
11. urlIBM Carbon — Colour palettes for data visualisationhttps://carbondesignsystem.com/data-visualization/color-palettes/  
12. urlIBM Carbon — Typography overviewhttps://carbondesignsystem.com/elements/typography/overview/  
13. urlApple Human Interface Guidelines — Typographyhttps://developer.apple.com/design/human-interface-guidelines/typography  
14. urlshadcn/ui — Theminghttps://ui.shadcn.com/docs/theming  
15. urlTailwind CSS — Theme variableshttps://tailwindcss.com/docs/theme  
16. urlColorBrewer 2.0 — Colour advice for mapshttps://colorbrewer2.org/

This version is structured as the canonical corpus-style standard: normative rules first, implementation contracts second, then anti-patterns, release checklist, and canonical summary.
