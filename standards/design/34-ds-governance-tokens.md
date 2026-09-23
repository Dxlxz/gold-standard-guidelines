---
id: "ds-governance-tokens"
title: "Design System Governance, Tokens & Docs"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "ds", "system", "governance", "tokens"]
applies_to: ["ui", "team"]
related: []
legacy_number: 114
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 50472
provenance: baseline

---

Research completed first. Firecrawl was used to search and scrape five primary/reference sources: DTCG, W3C/WAI, GOV.UK Design System, Carbon, and Style Dictionary; additional first-party sources were then verified for shadcn/ui, Apple, Android Material 3, Tokens Studio, Storybook, and SemVer.

# Design System Governance, Tokens & Documentation — Gold Standard 2026

**Status:** Canonical  
**Applies to:** Design tokens, UI components, patterns, themes, design-tool libraries, platform packages, documentation, and contribution workflows  
**Component baseline:** shadcn/ui for web implementation conventions, adapted through the organization’s semantic token and accessibility contracts  
**Normative terms:** **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are requirements terms.

---

# 1. Purpose

This standard defines how a production design system is governed, tokenized, built, themed, documented, versioned, adopted, measured, deprecated, and evolved across web, iOS, Android, and design tools.

The system MUST treat design tokens and component APIs as **shared product infrastructure**, not as a styling convenience. A change to a public semantic token, component contract, theme axis, accessibility behavior, or generated platform API can affect many applications and MUST therefore receive the same lifecycle discipline as other public APIs.

The canonical token interchange format MUST be DTCG-compatible JSON. DTCG 2025.10 defines a stable interchange model around explicit `$value`, `$type`, groups, aliases/references, `$deprecated`, and `$extensions`; it also explicitly positions design tokens as platform-independent design decisions intended to flow between design, translation, and documentation tools. citeturn846669search3turn848493search0

This standard aligns with the organization’s **Security, Data & Database, API, State Management, Forms & Validation, Accessibility, Design Tokens, Component, and Pattern standards**. Design-system conventions MUST NOT create exceptions to those standards. In particular:

- tokens MUST NOT contain secrets, credentials, personal data, environment secrets, or business configuration;
- components MUST NOT own application data, authorization, business-state synchronization, or backend contracts that belong to the Data, API, or State standards;
- form components MUST expose accessible primitives for labels, errors, descriptions, required state, focus, and validation but MUST NOT create a parallel business-validation architecture;
- accessibility requirements are release gates, not documentation recommendations;
- shadcn/ui components are the web implementation baseline, but their CSS variables, classes, and source code MUST be adapted to the system’s semantic contracts instead of becoming a second design-token system. shadcn/ui itself recommends semantic CSS-variable theming and maps those variables to Tailwind utilities. citeturn524027search0

---

# 2. Rules

## 2.1 Design-token architecture

### 2.1.1 Three mandatory layers

Every production token MUST belong to exactly one architectural layer.

| Layer | Purpose | Example | Product-code consumption |
|---|---|---|---|
| **Primitive** | Encodes a raw design value or scale with no product meaning. | `primitive.color.blue.600`, `primitive.space.4` | **MUST NOT** normally be consumed directly by product UI. |
| **Semantic** | Encodes intent or role independently of component implementation. | `semantic.color.text.default`, `semantic.color.surface.danger` | **MUST** be the normal public styling API. |
| **Component** | Encodes a component slot/property when a semantic token is not sufficiently precise. | `component.button.container.background.primary.hover` | MAY be consumed by the owning component; public overrides require documentation. |

The dependency direction MUST be:

**primitive → semantic → component → rendered UI**

References MUST NOT point upward in the architecture. A primitive MUST NOT reference a semantic token; a semantic token MUST NOT depend on a component token.

Semantic names MUST describe **why a value is used**, not what the current value looks like. Role-based theming lets one token identity retain the same role while its value changes by theme; Carbon uses this distinction explicitly between token, role, theme, and value, and Material 3 similarly exposes role-oriented color schemes rather than requiring components to consume raw palette values. citeturn605633search10turn714792search0

Component tokens SHOULD be sparse. Creating a component token for every CSS property merely reproduces CSS as JSON and destroys the value of semantic reuse.

### 2.1.2 Naming grammar

DTCG deliberately permits broad JSON token names; this standard imposes a stricter grammar so generated APIs remain predictable across languages. DTCG paths are hierarchical and references can use those paths, so organization-level naming discipline is a governance responsibility. citeturn846669search3

| Rule | Required grammar | Good | Invalid / discouraged |
|---|---|---|---|
| Case | lowercase ASCII | `semantic.color.text.default` | `Semantic.Color.Text.Default` |
| Segment separator | `.` through JSON hierarchy | `component.button.label.color` | `component/button/label/color` |
| Multiword segment | kebab-case | `focus-ring` | `focusRing`, `focus_ring` |
| Primitive | `primitive.<category>.<scale-or-name>` | `primitive.space.4` | `primitive.small-gap` |
| Semantic | `semantic.<category>.<role>[.<emphasis>][.<state>]` | `semantic.color.border.focus` | `semantic.color.blue.500` |
| Component | `component.<component>.<slot>.<property>[.<variant>][.<state>]` | `component.button.container.background.primary.hover` | `button-blue-hover` |
| State | final semantic segment where needed | `...hover`, `...disabled` | `hover-button-primary` |
| Value names | MUST NOT encode current values outside primitives | `semantic.radius.control` | `semantic.radius.8px` |
| Brand/tenant | MUST NOT normally appear in token identity | `semantic.color.action.primary` | `semantic.color.acme.primary` |
| Mode | MUST NOT appear in normal public token identity | same token across modes | `text.default.dark` |
| Abbreviations | only approved glossary abbreviations | `background`, `foreground` | arbitrary `bg2`, `fg-alt-x` |

Token names MUST remain stable when a value changes. Renaming a semantic token solely because its current color, spacing, radius, or typography changes is prohibited.

### 2.1.3 DTCG JSON contract

Token source files MUST use DTCG syntax. `$type` SHOULD be declared at the narrowest group level that makes type inheritance obvious. References SHOULD be used instead of duplicating identical values. `$description` MUST exist for public semantic and component tokens. DTCG `$deprecated` MUST be used for token deprecation, with a replacement named whenever one exists. Organization-specific metadata MUST be placed under a reverse-domain `$extensions` key so tools can preserve it without confusing it with standardized DTCG properties. citeturn846669search3turn848493search0

Canonical example:

```json
{
  "$extensions": {
    "com.example.design-system": {
      "schemaVersion": "1.4.0",
      "owner": "design-system"
    }
  },
  "primitive": {
    "color": {
      "$type": "color",
      "blue": {
        "600": {
          "$value": {
            "colorSpace": "srgb",
            "components": [0.145, 0.388, 0.922],
            "hex": "#2563EB"
          }
        }
      },
      "white": {
        "$value": {
          "colorSpace": "srgb",
          "components": [1, 1, 1],
          "hex": "#FFFFFF"
        }
      }
    }
  },
  "semantic": {
    "color": {
      "$type": "color",
      "action": {
        "primary": {
          "$value": "{primitive.color.blue.600}",
          "$description": "Primary interactive action background."
        },
        "on-primary": {
          "$value": "{primitive.color.white}",
          "$description": "Foreground content displayed on primary actions."
        },
        "brand": {
          "$value": "{semantic.color.action.primary}",
          "$deprecated": "Use {semantic.color.action.primary} instead."
        }
      }
    }
  },
  "component": {
    "button": {
      "container": {
        "background": {
          "primary": {
            "default": {
              "$type": "color",
              "$value": "{semantic.color.action.primary}",
              "$description": "Primary button container background."
            }
          }
        }
      },
      "label": {
        "color": {
          "primary": {
            "$type": "color",
            "$value": "{semantic.color.action.on-primary}",
            "$description": "Primary button label and icon color."
          }
        }
      }
    }
  }
}
```

### 2.1.4 Theme and mode axes

Themes MUST be modeled as **orthogonal axes**, not as copies of the component library.

The canonical supported axes are:

| Axis | Typical values | Contract |
|---|---|---|
| Color mode | `light`, `dark` | Changes color-role resolution. |
| Contrast | `standard`, `more` | Raises differentiation and contrast without changing component semantics. |
| Brand | `default`, named approved brands | Changes brand expression while retaining semantic roles. |
| Tenant | `default`, approved tenant IDs | Applies constrained tenant-specific overrides. |
| Density | `comfortable`, `compact` | Changes spacing/control geometry, not meaning or accessibility minimums. |

Additional axes require an RFC because each new axis multiplies testing and documentation obligations.

Token identity MUST remain stable across axes. A dark theme therefore changes the resolved value of `semantic.color.surface.default`; it does not create `semantic.color.surface.default.dark`.

Theme resolution SHOULD use centrally declared token sets or a resolver manifest. Tokens Studio supports combining multiple token sets into themes and applying multiple themes as a matrix; this reinforces the separation between token identity and selected theme configuration. citeturn848493search8

A recommended resolution contract is:

**core primitives → brand + color mode semantic mapping → contrast overrides → approved tenant override → density mapping → component aliases**

Where two axes can legally modify the same token, the combination MUST be explicitly resolved and tested. Teams MUST NOT depend on accidental file-import order.

### 2.1.5 Versioning and deprecation

The token package MUST have its own Semantic Version and changelog. SemVer defines patch releases for backward-compatible fixes, minor releases for backward-compatible additions and deprecations, and major releases for incompatible public API changes. citeturn848493search14

For this system:

- **PATCH**: metadata/documentation corrections and generator fixes that do not alter the documented public contract.
- **MINOR**: additive semantic/component tokens, additive theme capabilities, and deprecations. Intentional visual-value changes that preserve token meaning MAY be minor but MUST carry a `visual-change` changelog entry.
- **MAJOR**: removal or rename of a public token, token type change, incompatible semantic-role change, incompatible theme contract, or other change requiring consumer code modification.

Primitive tokens SHOULD be treated as internal unless explicitly exported. Semantic tokens are public API by default. Component tokens are public API only when documented as supported extension points.

A deprecated token MUST:

1. retain its existing path during the deprecation window;
2. set DTCG `$deprecated` to a meaningful string where possible;
3. name its replacement or explain why no replacement exists;
4. emit generated deprecation metadata where the target language supports it;
5. appear in the changelog and migration guide;
6. be removed only in a major release.

DTCG 2025.10 explicitly defines `$deprecated` for both tokens and groups, including explanatory strings and inherited group deprecation. citeturn848493search0

Stable public APIs MUST receive at least **180 calendar days** of deprecation before removal and MUST NOT be removed before the next major version. Security or critical accessibility defects MAY use an accelerated path, but the exception requires an ADR and migration guidance.

---

## 2.2 Token pipeline

### 2.2.1 One source of truth

Version-controlled **DTCG JSON in Git MUST be the canonical source of truth**.

Figma Variables, Tokens Studio state, generated CSS, Tailwind configuration, Swift, Android resources, Storybook data, and documentation tables are projections of that source.

There MUST NOT be two independently authoritative token databases.

Tokens Studio MAY be used as an authoring interface if its remote sync provider writes changes into the canonical repository and all resulting changes pass normal pull-request review. Tokens Studio explicitly supports external token storage through sync providers rather than requiring tokens to remain isolated inside a Figma file. citeturn846669search1

### 2.2.2 Build pipeline

The required pipeline is:

```text
DTCG JSON
   ↓ validate schema + naming + references + governance metadata
resolve selected token sets/themes
   ↓
Style Dictionary / approved token compiler
   ├── CSS custom properties
   ├── Tailwind/shadcn theme bindings
   ├── iOS Swift + color/assets
   ├── Android XML / Kotlin / Compose
   ├── Figma Variables manifest
   ├── Storybook/docs metadata
   └── machine-readable token catalog
```

Style Dictionary is appropriate for this translation boundary because it accepts platform-agnostic token input, supports DTCG format, and applies platform-specific transforms and output formats independently. Its documented transforms can modify names, values, and attributes for target platforms, and its formats include CSS custom-variable output. citeturn605633search4turn605633search5turn605633search8

Every generated artifact MUST include the source token package version and build provenance.

Generated files MUST NOT be hand-edited.

CI MUST regenerate every committed generated artifact and fail when `git diff` is non-empty.

### 2.2.3 Platform output contracts

| Target | Required output |
|---|---|
| Web | Semantic CSS custom properties; theme selectors; TypeScript token-name types where useful. |
| Tailwind / shadcn | Tailwind theme bindings that resolve to semantic CSS variables rather than raw primitives. |
| iOS | Type-safe Swift accessors and, for adaptive colors, appropriate asset/dynamic-color definitions. |
| Android | Resource/Compose mappings using the same semantic roles; Material 3 integration MAY adapt these into `ColorScheme`, typography, and shape contracts. |
| Figma | Managed Variable collections/modes using the same stable token identity and aliases where supported. |
| Docs | Generated token tables containing name, type, value per mode, description, status, ownership, version, and replacement information. |

For shadcn/ui, generated theme bindings SHOULD map the organization’s semantics onto shadcn’s expected concepts such as `background`, `foreground`, `primary`, `primary-foreground`, `border`, `input`, and `ring`. Product teams MUST NOT independently redefine those values in feature CSS. shadcn’s current theming model uses semantic CSS variables and Tailwind mappings for exactly this purpose. citeturn524027search0

Material 3 likewise separates a role-oriented `ColorScheme`, typography, and shapes and provides distinct light/dark schemes; generated Android bindings SHOULD map into those roles rather than bypassing them with arbitrary component colors. citeturn714792search0

### 2.2.4 Automated design/code drift detection

CI MUST detect drift in both directions.

The pipeline MUST:

1. normalize canonical Git tokens into a deterministic token snapshot;
2. normalize managed Figma Variables/collections into the same path/type/mode representation;
3. compare token identity, alias target, type, resolved mode value, description, and deprecation status;
4. fail when an unmanaged difference exists;
5. permit differences only through an explicit allowlist with owner and expiry;
6. publish a drift report identifying whether Git or the design tool diverged.

A design-tool edit MUST ultimately become a repository change before it is considered released. Direct edits that exist only inside Figma MUST be treated as unpublished drift.

Where round-trip synchronization is not reliable, the direction MUST be **Git → Figma**, not bidirectional guesswork.

---

## 2.3 Runtime theming and multi-brand

### 2.3.1 Scoping

Web runtime themes MUST be scoped through explicit root attributes or equivalent platform context:

```html
<html
  data-mode="dark"
  data-contrast="standard"
  data-brand="acme"
  data-tenant="enterprise"
  data-density="comfortable"
>
```

The emitted CSS MUST change semantic custom-property values under these scopes. Components MUST continue to consume the same semantic property names.

Theme-specific component forks such as `DarkButton`, `AcmeButton`, or `HighContrastButton` are prohibited unless the underlying behavior—not merely presentation—is actually different.

Carbon’s theme model keeps token roles constant while varying assigned values, and shadcn similarly implements dark mode by overriding the same semantic CSS variables. citeturn605633search10turn524027search0

### 2.3.2 System preferences

Applications SHOULD respect operating-system appearance preferences unless the product has a documented reason not to do so. Apple’s HIG explicitly recommends adaptive semantic colors and testing across light, dark, and increased-contrast contexts; Android Material 3 likewise exposes system-aware light/dark and dynamic color schemes. citeturn524027search1turn524027search4turn714792search0

High contrast MUST be an independent axis rather than an assumption that dark mode is inherently high contrast.

Forced-colors or comparable platform accessibility modes MUST NOT be defeated by unnecessary hard-coded colors.

Density changes MUST NOT shrink interactive targets below Accessibility-standard minimums.

### 2.3.3 SSR and flash prevention

Server-rendered applications MUST NOT render one theme and switch to another after hydration when the final theme can be known before first paint.

The server SHOULD determine brand, tenant, density, and any persisted user theme preference before producing HTML.

Where color mode depends on a client-only system preference, a minimal **CSP-compliant pre-paint bootstrap** MAY set the root theme attribute before the application renders. It MUST use the Security standard’s approved nonce/hash mechanism.

The same theme resolver MUST be used by server and client. Hydration code MUST NOT contain a second, divergent theme algorithm.

The page SHOULD declare a matching browser `color-scheme` so browser-native controls are consistent with the selected appearance.

### 2.3.4 Tenant overrides

Tenant overrides MUST be data constrained by an approved schema.

Tenants MUST NOT be permitted to provide arbitrary runtime CSS, arbitrary JavaScript, or unvalidated token JSON.

By default, tenant customization MAY modify approved **semantic branding tokens** only. Changes to component geometry, focus treatment, validation state, typography scale, or accessibility-critical tokens require design-system approval.

Every tenant theme MUST be compiled and validated before deployment.

A tenant override MUST NOT bypass the semantic layer by rebinding a component directly to primitives unless an RFC establishes a supported extension point.

### 2.3.5 Contrast validation in CI

Every supported theme combination MUST pass automated color-contract validation.

At minimum, tests MUST evaluate declared foreground/background and UI-indicator pairs against WCAG 2.2 thresholds:

- ordinary text: **4.5:1** minimum;
- large text: **3:1** minimum;
- visual information needed to identify UI controls and meaningful graphical objects: **3:1** against adjacent colors.

W3C specifies these as threshold values rather than values to round up; for example, 4.499:1 does not satisfy a 4.5:1 threshold. citeturn213156view0turn846669search0

Token metadata SHOULD declare expected contrast relationships so validation does not depend on guessing every possible pairing.

Component accessibility tests MUST supplement token-level contrast checks because valid individual tokens can still be combined incorrectly.

---

## 2.4 Contribution and governance

### 2.4.1 Who can propose

Any consumer, designer, engineer, researcher, accessibility specialist, content designer, or maintainer MAY propose:

- a token;
- a component or pattern;
- a component API change;
- a new theme axis;
- a documentation change;
- a deprecation;
- a pipeline/tooling change.

Proposal access SHOULD be broad; merge authority MUST remain controlled.

GOV.UK’s contribution process provides a useful governance model: proposals are accepted from the community, but publication requires evidence that the contribution is useful and non-duplicative and that the eventual implementation is usable, consistent, versatile, and tested. citeturn605633search0turn605633search1

### 2.4.2 Proposal levels

A normal issue or PR MAY handle a local bug fix, documentation correction, additive example, or non-public refactor.

An **RFC MUST precede** any change involving:

- a new or changed public token naming/taxonomy rule;
- a new theme axis;
- a new stable component or pattern;
- a public component API redesign;
- a breaking token/component change;
- a major accessibility-interaction decision;
- a fundamental build/distribution model change;
- a new cross-platform contract;
- a major tenant customization capability.

Once accepted, the durable decision MUST be recorded as an **ADR**. The RFC captures the discussion; the ADR records the final architecture decision and consequences.

### 2.4.3 Semantic versioning

Components and token packages MUST use Semantic Versioning once stable. Additive backward-compatible API is minor; deprecation is minor; backward-incompatible public API is major. citeturn848493search14

A change is breaking when existing valid consumer code or design usage must change to retain documented behavior.

Breaking-change PRs MUST include:

- accepted RFC/ADR;
- migration guide;
- codemod where the change is mechanically transformable;
- before/after examples;
- release-note entry;
- deprecated-path warnings before removal;
- versioned documentation for both old and new APIs.

A redesign being aesthetically preferable is not sufficient justification for breaking API compatibility.

### 2.4.4 Review SLAs

The default governance SLA is:

| Item | SLA |
|---|---:|
| New issue/proposal triage | 3 business days |
| First maintainer review on review-ready PR | 5 business days |
| Cross-disciplinary review request | 7 business days |
| Review-ready RFC decision target | 10 business days |
| Critical security/accessibility regression triage | Same business day |
| Stalled review escalation | After 10 business days without substantive movement |

The SLA measures **response and decision flow**, not guaranteed completion. A proposal missing evidence, accessibility work, implementation quality, or migration planning MAY remain open until those requirements are satisfied.

### 2.4.5 Maintainer roles

The system MUST identify named maintainers for tokens, components, accessibility, platform implementations, and documentation.

No critical package may depend on one undocumented individual.

At least two maintainers SHOULD be capable of releasing each critical package.

CODEOWNERS or an equivalent mechanism MUST enforce required review domains.

### 2.4.6 Governance RACI

**Roles:**  
**DSL** = Design System Lead; **TM** = Token Maintainer; **CM** = Component Maintainer; **A11Y** = Accessibility Lead; **PLAT** = Web/iOS/Android Platform Maintainers; **DOCS** = Documentation/Content Maintainer; **SEC** = Security reviewer; **CONS** = Consumer teams.

| Activity | DSL | TM | CM | A11Y | PLAT | DOCS | SEC | CONS |
|---|---|---|---|---|---|---|---|---|
| Token taxonomy/public token API | A | R | C | C | C | C | I | C |
| New stable component/pattern | A | C | R | C | R | C | I | C |
| Accessibility release gate | I | C | R | A | R | C | I | I |
| Token build pipeline | I | A/R | C | C | R | I | C | I |
| Breaking API release | A | R | R | C | R | C | C | I |
| Tenant theme approval | A | R | C | C | C | I | C | I |
| Component documentation | I | C | R | C | C | A/R | I | C |
| Deprecation/removal decision | A | R | R | C | C | C | I | I |
| Security-affecting component behavior | I | I | R | C | C | I | A | I |
| Adoption/migration programme | A | R | R | C | C | R | I | R |

There MUST be exactly one accountable role for each governance decision, even when multiple teams perform the implementation.

### 2.4.7 RFC template

```text
# RFC: <title>

Status: Draft | Review | Accepted | Rejected | Superseded
Authors:
Reviewers:
Owners:
Created:
Decision deadline:
Target release:

## 1. Summary
One-paragraph description of the proposed change.

## 2. Problem
What user, product, design, engineering, accessibility, or operational
problem exists today?

## 3. Evidence
Links to consumer examples, research, support requests, duplication,
accessibility defects, or implementation constraints.

## 4. Scope
What is included? What is explicitly excluded?

## 5. Proposed public contract
Tokens, component API, variants, states, theme behavior, platform behavior,
documentation behavior, and generated artifacts.

## 6. Alternatives considered
Include "do nothing" and explain trade-offs.

## 7. Accessibility
Keyboard, focus, semantics, screen reader behavior, contrast, zoom/reflow,
motion, forced colors, touch targets, and required manual testing.

## 8. Cross-platform implications
Web, iOS, Android, Figma/design libraries, documentation.

## 9. Compatibility
Backward compatibility, version impact, deprecated APIs, supported versions.

## 10. Migration
Codemod, manual migration, compatibility shim, migration guide.

## 11. Rollout
Experimental/stable plan, feature flags where applicable, release sequencing.

## 12. Telemetry and success measures
Adoption, duplication reduction, defects, accessibility results, build time.

## 13. Security / privacy / data impact
Explicitly state "none" when not applicable.

## 14. Documentation changes
Foundations/components/patterns/content/a11y/changelog pages affected.

## 15. Open questions
Unresolved decisions.

## 16. Decision
Filled in by maintainers after review.

## 17. ADR
Link to the resulting ADR when accepted.
```

---

## 2.5 Adoption and enforcement

### 2.5.1 Lint rules

Compliance MUST be mechanically enforced where possible.

Web linting MUST detect at least:

- raw colors outside approved token-source/generated files;
- prohibited direct primitive use in product UI;
- hard-coded spacing/radius values where a semantic contract exists;
- undeclared z-index values;
- direct theme-specific branching that should resolve through tokens;
- deprecated token names;
- imports from private design-system internals;
- duplicate local implementations of protected primitives where reliably detectable.

False-positive suppression MUST require an inline reason and, for architectural exceptions, an owner and expiry.

A suppression with no reason is invalid.

### 2.5.2 Codemods

The design-system repository MUST maintain codemods for recurring or breaking mechanical migrations.

Codemods SHOULD cover:

- token rename/replacement;
- component import changes;
- renamed props;
- variant migrations;
- old utility classes to semantic tokens;
- deprecated composition patterns.

A breaking change that could have been mechanically migrated but ships without a codemod SHOULD be treated as incomplete.

Codemods MUST be safe to run repeatedly or clearly document non-idempotent behavior.

### 2.5.3 Migration guides

Each migration guide MUST include:

**before → after → rationale → automated command → manual exceptions → validation steps → deadline**

Migration guidance MUST describe visual or behavioral differences, not merely compile errors.

### 2.5.4 Sunset process

Stable API sunset MUST follow:

**announce → deprecate → measure → migrate → warn → remove**

Removal requires all of the following:

- deprecation window satisfied;
- next-major release;
- migration guide published;
- codemod provided when feasible;
- major known consumers notified;
- adoption telemetry reviewed;
- old documentation preserved in its versioned location;
- ADR or release decision records why removal is now acceptable.

Emergency removals require explicit Security or Accessibility justification.

### 2.5.5 Adoption and duplication measurement

The system MUST measure adoption rather than inferring success from package downloads.

Required adoption indicators include:

- percentage of eligible screens using design-system components;
- percentage of eligible styling references resolved through semantic tokens;
- number of raw color/spacing violations introduced per release;
- number of known duplicated local components overlapping stable system components;
- percentage of supported tenant/brand surfaces using the official theme pipeline;
- migration completion by deprecated API.

A component MAY have low adoption because it solves a rare problem; low adoption alone is not evidence that it should be deleted.

Duplication reports MUST distinguish intentional product-specific UI from ungoverned reimplementation.

---

## 2.6 Documentation site

### 2.6.1 Information architecture

The documentation site MUST expose these top-level areas:

1. **Foundations** — color, typography, spacing, grid/layout, elevation, radius, motion, iconography, tokens and theming.
2. **Components** — component contracts, variants, states and APIs.
3. **Patterns** — compositions solving recurring user/product problems.
4. **Content** — labels, errors, empty states, terminology and content patterns.
5. **Accessibility** — principles, testing, keyboard interaction, contrast, assistive-technology guidance and known constraints.
6. **Changelog** — additions, changes, fixes, deprecations, removals and migrations.

The docs MUST clearly separate **component** guidance from **pattern** guidance. A component is a reusable UI primitive; a pattern explains how multiple primitives work together to solve a recurring user need.

### 2.6.2 Component-page contract

Every stable component page MUST contain:

- status and lifecycle stage;
- package and current version;
- owner/maintainer;
- **last updated** date generated from source-control metadata;
- supported platforms;
- when to use;
- when not to use;
- anatomy;
- variants;
- states;
- responsive behavior where applicable;
- content guidance;
- accessibility behavior;
- keyboard interactions;
- live examples;
- API/props table;
- relevant semantic and component tokens;
- do/don’t examples;
- design-tool linkage;
- related patterns;
- changelog;
- deprecation/migration notice where applicable.

“Last updated” MUST be generated, not manually typed.

A docs page MUST NOT imply support for an API version different from the example currently rendered.

### 2.6.3 Live examples and Storybook

Stable component docs MUST use the actual production component implementation for interactive examples.

Storybook SHOULD serve as the executable component example layer. Storybook Autodocs can derive documentation from stories and component metadata, while Controls can expose live argument manipulation; this makes stories useful as both documentation and test fixtures. citeturn848493search1turn848493search2

The canonical docs site MAY embed or deep-link Storybook, but there MUST NOT be a separately hand-coded “documentation version” of a component.

Every stable component SHOULD provide stories for:

- default;
- each public variant;
- interactive states that can be represented;
- disabled/read-only states where supported;
- loading/error/empty states where relevant;
- long/short/localized content;
- light/dark;
- high contrast;
- supported density modes;
- representative brand/tenant treatment.

### 2.6.4 API tables

API tables MUST be generated from the actual type/schema definition whenever the platform permits it.

Each public property entry MUST state:

**name, type, required/default, description, constraints, accessibility implications, deprecation status**.

The docs MUST distinguish supported API from implementation details.

Private CSS selectors, DOM structure, internal utility classes, and unexported component internals MUST NOT be presented as stable extension points.

### 2.6.5 Search

Documentation search MUST index:

- canonical names;
- common synonyms;
- previous/deprecated names;
- component names;
- pattern names;
- token names;
- accessibility concepts;
- error and empty-state terminology.

Deprecated names SHOULD redirect or surface the replacement.

Current-version results MUST rank ahead of archived-version results.

### 2.6.6 Versioned documentation

Stable major versions MUST retain corresponding documentation.

URLs SHOULD make the viewed version explicit or provide a reliable version selector.

Archived documentation MUST display a prominent version banner.

Search-engine canonicalization SHOULD favor the current stable version.

When a component or token is removed, its old documentation MUST NOT simply disappear; the final supported version MUST remain discoverable for teams completing migrations.

---

## 2.7 Component lifecycle

Every component, pattern, and public token family MUST have an explicit lifecycle state.

| Stage | Meaning | Entry gate | Compatibility contract | Exit |
|---|---|---|---|---|
| **Experimental** | API and behavior are being validated. | Named owner, problem evidence, a11y plan, initial docs/tests. | Breaking changes MAY occur without a package major, but MUST be announced. | Evidence and quality gates met, or experiment withdrawn. |
| **Stable** | Supported for production use. | Cross-platform contract where applicable, documented API, tests, accessibility review, maintainer coverage, migration posture. | SemVer applies. | Deprecation RFC/decision. |
| **Deprecated** | Supported temporarily; new adoption discouraged. | Replacement/migration path and sunset notice. | Existing behavior remains supported through window. | Major release after sunset gates. |
| **Removed** | No longer present in current package. | Removal gates complete. | Versioned historical docs remain. | Terminal state. |

GOV.UK’s contribution criteria reinforce the principle that publication requires evidence of usability, consistency, versatility, and accessibility testing rather than code completion alone. citeturn605633search0

### 2.7.1 Required lifecycle metadata

Each governed artifact MUST track:

```text
id
name
kind: token | component | pattern
status
owner
maintainers
introducedVersion
stableVersion
deprecatedVersion
removalVersion
replacement
platforms
docsUrl
sourcePath
figmaId / design-tool reference where applicable
rfc
adr
accessibilityReview
lastReviewed
lastUpdated
```

A stable artifact without an owner is non-compliant.

Lifecycle metadata SHOULD be machine-readable and feed the docs site, lint rules, release tooling, and governance dashboards from the same record.

Experimental components MUST be visually identified as experimental in documentation and design libraries.

---

## 2.8 Operating metrics

Metrics MUST be used to locate friction and system health, not to reward superficial component count.

No universal benchmark is asserted here. Each organization MUST establish a baseline and an explicit target for its products.

| Metric | Canonical definition | Why it matters |
|---|---|---|
| **Time to build a screen** | Median and p75 elapsed implementation time from design-ready UI to review-ready production UI, sampled consistently. | Tests whether the system reduces implementation friction. |
| **Token misuse rate** | New lint-detectable raw-value, deprecated-token, or prohibited primitive usages per defined unit of changed UI code. | Measures erosion of token governance. |
| **Accessibility violations** | New confirmed automated + manual accessibility defects attributable to system/component use, segmented by severity. | Tests whether reusable infrastructure is preventing or propagating defects. |
| **Docs freshness** | Percentage of stable pages whose API, examples and metadata match the current supported release and have passed the defined review interval. | Detects stale guidance. |
| **Request throughput** | Proposals received, triaged, accepted/rejected, merged, and median cycle time by request class. | Reveals governance bottlenecks. |
| **First-review latency** | Median/p75 business time from review-ready status to substantive maintainer feedback. | Measures maintainer responsiveness. |
| **Adoption** | Eligible product usage of stable components and semantic tokens. | Measures real system reach. |
| **Duplication** | Known product-local implementations materially overlapping stable system capabilities. | Identifies missing adoption or missing system capability. |
| **Drift** | Number and duration of unresolved design-tool ↔ code token differences. | Measures synchronization health. |
| **Deprecation debt** | Deprecated APIs still used, weighted by age and consumer count. | Quantifies migration risk. |

Metrics MUST distinguish design-system defects from consumer misuse.

Accessibility dashboards MUST NOT rely solely on automated scanners; automation does not cover the entire accessibility contract.

Metrics SHOULD be segmented by platform, package version, product, theme, and lifecycle stage where useful.

---

# 3. Anti-patterns

| Anti-pattern | Why it fails | Required replacement |
|---|---|---|
| Product UI uses raw `#hex`, `px`, radius, or shadow values | Creates an ungoverned parallel visual language. | Semantic tokens. |
| Semantic token called `blue-600` | Encodes implementation rather than intent. | `semantic.color.action.primary`. |
| Every property becomes a component token | Recreates CSS in token form and prevents reuse. | Prefer semantic roles; add component tokens only for genuine component contracts. |
| Dark/brand/tenant appears in every token name | Creates combinatorial token explosion. | Stable token identity + theme axes. |
| Figma and Git are both “the source of truth” | Drift becomes structurally unavoidable. | One canonical DTCG source with generated/synchronized projections. |
| Designers change production variables only in Figma | Change bypasses review/versioning/release controls. | Sync/export change into the canonical repository and release pipeline. |
| Components read primitives directly | Theme semantics become coupled to palette implementation. | Semantic aliases. |
| `AcmeButton`, `DarkButton`, `CompactButton` forks | Themes become component duplication. | One component consuming resolved semantic/component tokens. |
| Tenant uploads arbitrary CSS | Breaks accessibility, security, supportability, and upgrade guarantees. | Schema-limited semantic override manifests. |
| Theme applied after hydration | Causes wrong-theme flash and inconsistent SSR. | Server/pre-paint theme resolution. |
| Contrast checked only for the default light theme | Other supported themes may be inaccessible. | CI validation for every shipped theme combination. |
| Breaking rename with only a changelog note | Transfers migration cost to every consumer. | Deprecation, codemod, migration guide, major release. |
| Deprecated API disappears from docs | Consumers cannot complete migrations. | Versioned archived docs and replacement guidance. |
| Docs reimplement the component | Examples drift from production behavior. | Render production code/Storybook stories. |
| API table is manually maintained | Documentation inevitably diverges from code. | Generate from types/schema. |
| “Last updated” is manually typed | It cannot be trusted. | Generate from source control. |
| Component is called stable because implementation is finished | Ignores user evidence, a11y, docs, testing and support. | Stable lifecycle entry gate. |
| Forking shadcn styles per application | Creates many incompatible design systems. | Map shadcn to the central semantic theme contract. |
| Lint suppression without reason or expiry | Exceptions become permanent invisible debt. | Governed exception metadata. |
| Metrics measure component count | Incentivizes unnecessary inventory. | Measure adoption, build time, defects, duplication and throughput. |

---

# 4. Checklist

## 4.1 Token architecture

- [ ] Primitive, semantic, and component layers are explicit.
- [ ] Dependencies only flow primitive → semantic → component.
- [ ] Semantic names describe intent rather than value.
- [ ] Theme/brand/tenant/mode names are not embedded in normal token identities.
- [ ] Public tokens contain descriptions and lifecycle metadata.
- [ ] Source files are valid DTCG JSON.
- [ ] `$deprecated` identifies deprecated tokens and replacement guidance.
- [ ] Organization metadata lives under namespaced `$extensions`.
- [ ] Token package has SemVer and changelog.

## 4.2 Pipeline

- [ ] One Git-backed DTCG source of truth exists.
- [ ] Generated outputs are never hand-edited.
- [ ] CI performs deterministic rebuild + diff.
- [ ] CSS custom properties are generated.
- [ ] Tailwind/shadcn bindings use semantic variables.
- [ ] iOS output is generated.
- [ ] Android/Compose output is generated.
- [ ] Managed Figma Variables are generated or synchronization-controlled.
- [ ] Docs token tables are generated.
- [ ] Design-tool/code drift is automatically detected.

## 4.3 Theming and accessibility

- [ ] Light and dark are supported where required.
- [ ] Increased contrast is an independent axis.
- [ ] Brand and tenant overrides preserve semantic roles.
- [ ] Density cannot violate target-size requirements.
- [ ] SSR resolves theme before paint whenever possible.
- [ ] Client bootstrap is CSP compliant.
- [ ] Tenant customization is schema constrained.
- [ ] Every supported theme passes automated token contrast checks.
- [ ] Components receive accessibility tests in representative theme combinations.
- [ ] Forced-colors/system accessibility behavior is not unnecessarily overridden.

## 4.4 Governance

- [ ] Anyone can file a proposal.
- [ ] Public API changes have designated owners.
- [ ] Required changes use RFC + ADR.
- [ ] Components and tokens follow SemVer after stabilization.
- [ ] Breaking changes include migration guidance.
- [ ] Mechanical breaking migrations include codemods where feasible.
- [ ] Review SLAs are measured.
- [ ] CODEOWNERS/equivalent reviewer controls exist.
- [ ] RACI ownership is current.
- [ ] No critical package has an undocumented single-person owner.

## 4.5 Adoption and deprecation

- [ ] Raw-value and deprecated-token lint rules run in CI.
- [ ] Exceptions have reasons and expiries.
- [ ] Migration guides include before/after examples.
- [ ] Stable removals happen only in major releases.
- [ ] Stable removals respect the minimum deprecation window.
- [ ] Deprecated usage is measured.
- [ ] Design-system adoption is measured at actual UI usage level.
- [ ] Duplicate local components are inventoried.

## 4.6 Documentation

- [ ] Foundations, Components, Patterns, Content, Accessibility and Changelog are top-level IA.
- [ ] Every stable component page includes status/version/owner/last-updated metadata.
- [ ] Production components power live examples.
- [ ] Storybook stories cover public variants and representative modes.
- [ ] API tables are generated from source types/schema.
- [ ] Do/don’t guidance exists where misuse is plausible.
- [ ] Search recognizes old and current terminology.
- [ ] Deprecated names lead to replacements.
- [ ] Historical major-version documentation remains accessible.
- [ ] Archived docs identify themselves clearly.

## 4.7 Lifecycle and operations

- [ ] Every artifact is Experimental, Stable, Deprecated or Removed.
- [ ] Stable entry includes accessibility and documentation gates.
- [ ] Lifecycle metadata is machine-readable.
- [ ] Time-to-build is measured.
- [ ] Token misuse is measured.
- [ ] Accessibility defects are measured.
- [ ] Documentation freshness is measured.
- [ ] Request/review throughput is measured.
- [ ] Drift and deprecation debt are measured.
- [ ] Metrics have baselines, owners and target direction.

---

# 5. Canonical summary

A Gold Standard 2026 design system is governed as a **versioned platform**, not a component gallery.

**Tokens:** The canonical hierarchy is **primitive → semantic → component**. Public code consumes semantic intent, not raw visual values. Token files use DTCG format, aliases, descriptions, namespaced extensions and explicit deprecation metadata. citeturn846669search3turn848493search0

**Themes:** Light, dark, increased contrast, brand, tenant and density are orthogonal axes over stable token identities. Themes modify values, not component APIs. Carbon, shadcn, Apple, and Material 3 all reinforce the broader principle of role-based/adaptive values rather than theme-specific component forks. citeturn605633search10turn524027search0turn524027search4turn714792search0

**Pipeline:** Version-controlled DTCG JSON is the source of truth. A deterministic build generates web, Tailwind/shadcn, iOS, Android, Figma and documentation artifacts. CI fails on generated drift or unexplained design-tool/code divergence. Style Dictionary’s token, transform and format model provides the reference architecture for platform translation. citeturn605633search4turn605633search5turn605633search8

**Runtime:** Applications resolve themes before first paint, scope values through explicit runtime context, constrain tenant overrides, and validate every supported visual configuration. Accessibility contrast thresholds apply to the resulting combinations, not merely to individual palette values. citeturn213156view0turn846669search0

**Governance:** Contribution is open; release authority is explicit. Public API changes receive RFC/ADR treatment, SemVer, migration guidance, and codemods where possible. Evidence of usefulness, non-duplication, usability, accessibility, consistency and versatility precedes stabilization. citeturn605633search0turn605633search1turn848493search14

**Adoption:** Compliance is enforced through lint rules, CI, migration automation and a formal sunset process. A deprecation that is not measurable and migratable is unfinished work.

**Documentation:** Documentation is part of the API. It renders real production components, derives API information from source, identifies version/status/owner/freshness, preserves historical versions and uses Storybook as executable documentation rather than duplicating implementations. citeturn848493search1turn848493search2

**Lifecycle:** Every component, pattern and public token moves deliberately through **Experimental → Stable → Deprecated → Removed**, with machine-readable metadata and explicit entry/exit gates.

**Operations:** Success is measured through screen-build time, token misuse, accessibility defects, documentation freshness, adoption, duplication, drift, deprecation debt and governance throughput—not by the number of components in the library.

The governing rule is therefore:

> **One semantic contract, one canonical source, many generated platforms; themes change values rather than APIs; accessibility and documentation are release gates; public changes are versioned, migratable and measurable.**

---

# 6. Sources

1. **Design Tokens Community Group — Design Tokens Format Module 2025.10**, Final Community Group Report. urlDTCG Format Module 2025.10https://www.designtokens.org/TR/2025.10/format/
2. **Style Dictionary — Design Tokens.** urlStyle Dictionary: Design Tokenshttps://styledictionary.com/info/tokens/
3. **Style Dictionary — Transforms.** urlStyle Dictionary: Transformshttps://styledictionary.com/reference/hooks/transforms/
4. **Style Dictionary — Formats.** urlStyle Dictionary: Formatshttps://styledictionary.com/reference/hooks/formats/
5. **W3C/WAI — WCAG 2.2, Understanding SC 1.4.3 Contrast (Minimum).** urlW3C: Contrast Minimumhttps://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
6. **W3C/WAI — WCAG 2.2, Understanding SC 1.4.11 Non-text Contrast.** urlW3C: Non-text Contrasthttps://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
7. **GOV.UK Design System — Contribution criteria.** urlGOV.UK Design System: Contribution criteriahttps://design-system.service.gov.uk/community/contribution-criteria/
8. **GOV.UK Design System — Propose a component or pattern.** urlGOV.UK: Propose a component or patternhttps://design-system.service.gov.uk/community/propose-a-component-or-pattern/
9. **Carbon Design System — Themes.** urlCarbon: Themeshttps://carbondesignsystem.com/elements/themes/overview/
10. **shadcn/ui — Theming.** urlshadcn/ui: Theminghttps://ui.shadcn.com/docs/theming
11. **Tokens Studio — Manage Sync Providers.** urlTokens Studio: Sync Providershttps://docs.tokens.studio/token-storage/manage-sync-provider/
12. **Tokens Studio — Themes.** urlTokens Studio: Themeshttps://docs.tokens.studio/manage-themes/themes-overview
13. **Apple Human Interface Guidelines — Dark Mode.** urlApple HIG: Dark Modehttps://developer.apple.com/design/human-interface-guidelines/dark-mode
14. **Apple Human Interface Guidelines — Color.** urlApple HIG: Colorhttps://developer.apple.com/design/human-interface-guidelines/color
15. **Android Developers — Material Design 3 in Compose.** urlAndroid: Material Design 3 in Composehttps://developer.android.com/develop/ui/compose/designsystems/material3
16. **Storybook — Automatic documentation.** urlStorybook: Autodocshttps://storybook.js.org/docs/writing-docs/autodocs
17. **Storybook — Controls.** urlStorybook: Controlshttps://storybook.js.org/docs/essentials/controls
18. **Semantic Versioning 2.0.0.** urlSemantic Versioning 2.0.0https://semver.org/

I can also turn this into the same corpus format as your other Gold Standards—e.g. a shorter policy edition plus a separate implementation/reference appendix—if those standards have a fixed section or metadata schema.
