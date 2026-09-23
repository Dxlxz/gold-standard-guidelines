---
id: "handoff-figma"
title: "Handoff, Prototyping & Figma Library"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "handoff", "prototyping", "figma", "library"]
applies_to: ["ui"]
related: []
legacy_number: 116
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 52088
provenance: baseline

---

Research complete. Firecrawl was used first for source discovery and primary-page scraping; the standard below also incorporates current Figma, W3C, Storybook, Playwright, and shadcn/ui documentation verified on 23 September 2026.

# Handoff, Prototyping & Figma Library — Gold Standard 2026

**Status:** Canonical  
**Applies to:** Product design, design systems, frontend engineering, QA, accessibility, content design  
**Baseline:** shadcn/ui composition model; organisation design tokens; WCAG 2.2 / WAI-ARIA APG  
**Normative terms:** **MUST** and **MUST NOT** are non-negotiable. **SHOULD** and **SHOULD NOT** are defaults that may be overridden only with an explicit, documented reason.

---

# 1. Purpose

This standard defines the contract between design artifacts, prototypes, the Figma design system, and production code.

Its purpose is not to make engineering reproduce screenshots mechanically. Its purpose is to make design intent **unambiguous, testable, versioned, accessible, and traceable to production**.

A mature design system has at least three representations of the same product language:

1. **Design intent** — Figma libraries, product designs, prototypes and specifications.
2. **Executable UI** — code components, normally surfaced through Storybook or equivalent.
3. **Machine-readable system decisions** — design tokens, component metadata, test fixtures and release metadata.

These representations MUST converge on the same contract. None may silently become an independent fork.

Figma's current guidance explicitly treats design tokens as shared named decisions spanning design and code, with primitive, semantic and component-specific layers; variables and modes provide the native Figma mechanism for representing those decisions.  
**Source:** https://www.figma.com/resource-library/design-tokens/

shadcn/ui is the component baseline because it exposes component source code and emphasizes composition rather than treating the design system as an opaque dependency. The organisation MUST own the resulting component API, accessibility behavior, styling and upgrade policy rather than assuming upstream defaults are permanently authoritative. citeturn197850search0

---

# 2. Rules

## 2.1 System boundaries and ownership

Handoff MUST preserve the boundaries defined by the rest of the engineering and design standards.

| Concern | Design / this standard owns | Other standard / engineering owns |
|---|---|---|
| Security | User-visible permission, authentication and destructive-action states | Authentication architecture, authorization enforcement, secrets, threat controls |
| Data & Database | Display states, missing-data behavior, formatting, density and content rules | Schema, indexes, persistence, migrations, transaction semantics |
| API | Loading, empty, degraded, error, retry and optimistic UX | Endpoint shape, transport, retries, caching implementation, observability |
| State Management | Observable UI state model and state transitions | Store architecture, server/client boundaries, framework implementation |
| Forms & Validation | Validation timing, message placement, content, disabled/pending/success states | Validation implementation and server enforcement |
| Accessibility | Required semantics, keyboard model, focus behavior and announcements | Correct implementation in DOM/platform APIs and automated/manual testing |
| Design Tokens | Semantic intent and approved token use | Build pipeline and platform transformation |
| Components | Supported visual/behavioral contract | Internal implementation |
| Patterns | User-flow and composition contract | Routing and application architecture |

A design specification **MUST NOT invent backend, API, security or database behavior** merely to make a screen appear complete.

Engineering **MUST NOT silently alter user-observable behavior** because an implementation detail is more convenient.

When the design contract conflicts with Security, Accessibility, Forms & Validation, Data, API or another higher-order standard, that conflict MUST be resolved before release rather than hidden in implementation.

---

## 2.2 File and library architecture

### 2.2.1 Multi-product Figma architecture

A multi-product organisation MUST distinguish **system files** from **product files**.

A recommended topology is:

```text
Design System
├── DS • Foundations
├── DS • Icons
├── DS • Components • Web
├── DS • Components • iOS        [if applicable]
├── DS • Components • Android    [if applicable]
└── DS • Patterns • Web

Products
├── Product • Alpha • Working
├── Product • Alpha • Release Specs
├── Product • Beta • Working
└── Product • Beta • Release Specs

Archive
└── YYYY • Product/File • Archived
```

The names may vary, but the separation MUST NOT.

**System libraries MUST contain reusable system decisions. Product files MUST contain product composition and product-specific decisions.**

A product file MUST NOT become an unofficial component library because teams found it faster to copy local components.

### 2.2.2 Published libraries

Only deliberately supported assets MUST be published.

**Published:**

- approved token variables;
- shared icons;
- production-supported components;
- production-supported patterns where reuse is intentional;
- required styles that cannot yet be represented adequately as variables.

**Not published:**

- experiments;
- one-off product layouts;
- abandoned alternatives;
- research prototypes;
- speculative components;
- components that do not exist in or have an agreed path to production code.

Every published component MUST have:

- an owner;
- a code equivalent or explicit implementation status;
- supported variants and states;
- accessibility requirements;
- release/change history.

### 2.2.3 Variables and token layers

Figma variables MUST mirror the organisation's token architecture rather than introduce a second taxonomy.

The required dependency direction is:

```text
Component token → Semantic token → Primitive token → Raw value
```

The organisation SHOULD use three conceptual layers:

```text
Primitives
color.blue.500
space.200
radius.200

Semantic
color.text.default
color.surface.brand
space.control.inline

Component
button.primary.background
dialog.footer.gap
```

Component-specific tokens SHOULD exist only when a reusable component requires a stable override or semantic decision that cannot be expressed cleanly through the shared semantic layer.

Designs MUST reference the highest meaningful semantic layer. Product designers MUST NOT normally bind UI directly to `blue.500`, `#2563EB`, `16px`, or other primitives when a semantic token exists.

Figma documents the same primitive → semantic → component-specific hierarchy and supports variable modes for themes, brands and platform contexts.  
**Source:** https://www.figma.com/resource-library/design-tokens/

### 2.2.4 Modes

Modes MUST represent genuine contextual axes, for example:

```text
Color scheme: Light | Dark
Contrast: Standard | High
Brand: Core | PartnerA
Platform: Web | iOS
```

A mode MUST NOT be used as a disguised product override such as:

```text
Normal | CheckoutSpecial | MarketingFix | OldBlue
```

If two axes vary independently, they SHOULD NOT be collapsed into one combinatorial mode collection unless Figma limitations make that unavoidable.

Design and code MUST use the same mode vocabulary wherever practical.

### 2.2.5 Component names map to code

The root Figma component-set name MUST map **1:1 to the public code component name**.

Examples:

```text
Figma                 Code
Button             →  Button
AlertDialog        →  AlertDialog
Checkbox           →  Checkbox
DataTable          →  DataTable
AsyncCombobox      →  AsyncCombobox
```

Do not rename code concepts for presentation:

```text
BAD
Figma: CTA / Primary / Big
Code:  Button variant="default" size="lg"
```

Instead:

```text
GOOD
Component: Button
variant=default
size=lg
```

Variant properties SHOULD map to public component props when the distinction is meaningful in code:

```text
variant = default | destructive | outline | secondary | ghost | link
size    = sm | md | lg | icon
state   = default | loading
```

Visual pseudo-states such as `hover`, `focus-visible` and `pressed` MAY be represented as demonstration properties in Figma even if they are CSS/browser states rather than public React props. They MUST be clearly marked as **state previews**, not API props.

The shadcn/ui baseline SHOULD be treated as a compositional starting point, not as a frozen upstream API. The organisation owns its copied component source and may adapt it to the canonical API. citeturn197850search0turn197850search6

### 2.2.6 Assets and icons

UI icons MUST come from one controlled icon source.

For a shadcn/ui baseline, Lucide is the default source unless the product has an approved replacement. Brand or domain-specific icons MAY extend it.

Rules:

- icon names MUST map to the code symbol wherever possible;
- UI icons MUST normally be vectors;
- product teams MUST NOT redraw standard icons;
- filled/outlined duplicates MUST NOT proliferate without semantic need;
- icon size, optical alignment and stroke treatment MUST be system-controlled;
- accessible names MUST come from component context, not from an arbitrary Figma layer name;
- decorative icons MUST remain decorative in code;
- raster assets MUST have a documented export size and format;
- SVG assets MUST be optimized and inspected for hard-coded colors when token-controlled theming is required.

### 2.2.7 Library naming convention

| Artifact | Canonical pattern | Example | Rule |
|---|---|---|---|
| Figma foundation file | `DS • Foundations` | `DS • Foundations` | One authoritative variable foundation per system boundary |
| Component library | `DS • Components • <Platform>` | `DS • Components • Web` | Published |
| Icon library | `DS • Icons` | `DS • Icons` | Names track code icon names |
| Pattern library | `DS • Patterns • <Platform>` | `DS • Patterns • Web` | Only established reusable compositions |
| Product file | `Product • <Product> • <Purpose>` | `Product • Billing • Working` | Not a shared library |
| Component | `<CodeSymbol>` | `AlertDialog` | Exact public component symbol |
| Variant property | `<propName>` | `variant` | Match public code API where possible |
| Variant value | `<codeValue>` | `destructive` | Match code enum/string |
| Boolean property | `<propName>` | `loading=true` | Avoid Yes/No if code uses boolean |
| Primitive variable | `<category>.<family>.<step>` | `color.blue.600` | Value-oriented |
| Semantic variable | `<category>.<role>.<state?>` | `color.text.muted` | Purpose-oriented |
| Component variable | `<component>.<part>.<property>.<state?>` | `button.container.bg.hover` | Use sparingly |
| Icon | `<CodeIconName>` | `Search` | Exact symbol where possible |
| Exportable image | `<domain>-<meaning>-<variant>` | `empty-inbox-dark` | Stable kebab-case filename |
| Handoff frame | `<Flow>/<Step>/<State>` | `Checkout/Payment/Error` | Searchable and deterministic |

---

## 2.3 Design-to-code contract

### 2.3.1 Fidelity contract

Engineering MUST implement the **specified contract**, not merely imitate the screenshot.

The contract comprises:

- component selection;
- component variants;
- tokens;
- layout rules;
- responsive behavior;
- interaction model;
- states;
- content constraints;
- motion;
- accessibility behavior;
- important edge cases.

Visual comparison is evidence of implementation quality, but visual similarity alone is not proof of correctness.

### 2.3.2 What design MUST specify

For every non-trivial interface, design MUST specify the following where relevant:

**States**

```text
default
hover
focus-visible
active/pressed
selected
disabled
read-only
loading/pending
success
warning
error/invalid
empty
partial/degraded
skeleton
```

**Tokens**

Token names MUST be supplied when a governed token exists.

```text
GOOD
padding-inline: space.300 (12px)

BAD
padding: about 12px
```

**Spacing and layout**

Specify:

- gap;
- padding;
- minimum/maximum sizes;
- alignment;
- wrapping;
- overflow;
- truncation;
- sticky/fixed behavior;
- responsive breakpoint behavior.

**Motion**

Specify:

- trigger;
- property;
- duration token;
- easing token;
- entrance/exit behavior;
- interruption behavior;
- reduced-motion alternative.

**Content rules**

Specify:

- label grammar;
- maximum expected length;
- wrapping or truncation;
- empty values;
- localization expansion;
- number/date/currency formatting assumptions;
- whether placeholders are examples, instructions or defaults.

**Edge cases**

Specify the cases that change layout or behavior, especially:

- no data;
- one item;
- many items;
- long content;
- unavailable data;
- delayed response;
- partial response;
- offline/retry;
- permission denied;
- destructive failure;
- concurrent updates.

**Accessibility**

Specify user-observable accessibility requirements:

- semantic role or expected native element where important;
- accessible name source;
- keyboard interaction;
- focus entry/exit;
- focus restoration;
- error/status announcement;
- reading order;
- reduced-motion expectations;
- alternative to pointer-only interaction.

WCAG requires programmatically determinable names, roles, values and relevant states for UI controls; the ARIA APG additionally defines expected keyboard behavior for common composite widgets. citeturn197703search0turn197703search2  
**Source:** https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/

### 2.3.3 What engineering owns

Unless the behavior is user-observable, engineering owns:

- DOM structure choices consistent with required semantics;
- React/internal component decomposition;
- memoization;
- caching;
- state-store choice;
- API implementation;
- retry algorithms;
- database schema;
- network request strategy;
- concurrency control;
- security enforcement;
- telemetry implementation;
- error logging;
- performance optimization;
- bundling;
- test architecture.

Design MUST NOT prescribe these through Figma annotations unless the decision has a direct UX requirement.

### 2.3.4 Annotation conventions

Annotations MUST communicate decisions that are **not already obvious from components, auto layout, tokens or the spec**.

Do not annotate every 8px gap merely because Figma can display it.

Use short typed prefixes:

```text
INT-   Interaction
A11Y-  Accessibility
CNT-   Content
RESP-  Responsive
MOT-   Motion
EDGE-  Edge case
DATA-  Data assumption
REL-   Release/change note
```

Examples:

```text
A11Y-01
On error, retain focus in the field and announce the error via the form error summary.

INT-03
Escape closes the popover without committing the highlighted option.

RESP-02
Below 640px the action row stacks; primary action remains last in DOM order.

REL-04
Changed destructive confirmation copy after implementation review; reset to Ready for Dev required.
```

Each annotation MUST express one decision.

Figma currently supports annotations, measurements, Ready for Dev status, version comparison and development integrations in Dev Mode, so these mechanisms SHOULD be used instead of duplicating the same information in disconnected redlines.  
**Source:** https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode  
citeturn812741search1turn812741search3

### 2.3.5 Avoid pixel-perfect theatre

Teams MUST NOT confuse precision with screenshot worship.

The following are not acceptable handoff practices:

- hand-labeling every measurement that already comes from auto layout;
- requiring arbitrary 1px equality where browser font rendering differs by platform;
- approving inaccessible markup because the screenshot matches;
- hard-coding raw values to reproduce an accidental Figma position;
- rejecting a semantically correct responsive layout because a screenshot was captured at another text-rendering environment.

A defect exists when the implementation violates the agreed **token, component, layout, content, behavior or accessibility contract**.

A screenshot difference is a signal. It is not automatically a defect.

---

## 2.4 Handoff workflow

### 2.4.1 Required workflow

Every implementation SHOULD pass through these checkpoints:

```text
Design working
   ↓
Design + engineering contract review
   ↓
Ready for Dev
   ↓
Implementation starts
   ↓
Integrated implementation review
   ↓
Visual + interaction + accessibility QA
   ↓
Release
   ↓
Figma / Storybook reconciliation
```

### 2.4.2 Before Ready for Dev

A frame or flow MUST NOT be marked Ready for Dev until:

- design-system components are used where available;
- unsupported component changes have an owner;
- tokens are bound;
- states are defined;
- responsive behavior is defined;
- content is realistic;
- empty/error/loading states are addressed;
- motion is specified where meaningful;
- keyboard/focus requirements are defined for custom interaction;
- known unresolved decisions are explicitly called out;
- engineering has reviewed non-trivial behavior;
- implementation ticket/issue is linked.

Figma's current Dev Mode provides a Ready for Dev workflow specifically to expose designs intended for implementation.  
**Source:** https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode

### 2.4.3 Review cadence

A minimum of three reviews MUST occur for significant UI work:

1. **Contract review before handoff**  
   Designer + engineer review state model, component reuse, responsive behavior, content, accessibility and known risks.

2. **Implementation review at first integrated build**  
   Review behavior in the browser/device rather than waiting for polish.

3. **Pre-release review**  
   Resolve material visual, interaction and accessibility defects and update design or implementation where either representation changed.

Complex flows SHOULD additionally use a three-amigos review with design, engineering and QA/product accessibility representation.

### 2.4.4 Question channel

Every feature MUST have one durable question/decision channel: ticket thread, implementation issue, linked design conversation, or equivalent.

Material decisions MUST NOT exist only in:

- private DMs;
- ephemeral calls;
- unrecorded screen shares.

After a verbal decision, the artifact or ticket MUST be updated.

### 2.4.5 Change management

Once a design is marked Ready for Dev:

- material design changes MUST receive a change note;
- affected engineers MUST be notified through the agreed workflow;
- Ready for Dev MUST be reset or re-issued for a material change;
- the ticket MUST state whether the change is required for the current release or a subsequent release.

Changing a Figma frame after handoff without change communication is a process defect.

### 2.4.6 Version pinning

Each release or implementation ticket SHOULD capture:

```text
Figma file key
Figma node ID(s)
Figma version / named checkpoint
Design-system library version
Token package version
Storybook build URL / build ID
Application commit SHA
Release identifier
```

When a release must be reproducible, implementation SHOULD consume or reference a pinned Figma version rather than an always-moving latest frame.

The Figma REST file API accepts a specific version when retrieving file data or rendered images, enabling automation against a stable design snapshot. citeturn271006search0

### 2.4.7 Figma ↔ Storybook synchronization

Figma and Storybook have different responsibilities:

```text
Figma      = design intent and composition
Storybook  = executable component contract
Production = integrated behavior
```

For system components:

- every production-supported Figma component SHOULD have a Storybook story;
- major Figma variants SHOULD map to story args or explicit stories;
- Storybook MUST contain non-happy states needed for implementation and QA;
- Figma Code Connect SHOULD map design components to real code components where supported;
- changes to the public component contract SHOULD update Figma and Storybook in the same change window.

Figma Code Connect is explicitly designed to associate Figma components with code components and surface production-oriented snippets during inspection. citeturn197850search16

### 2.4.8 Drift detection

Drift detection MUST be automated for the design system.

At minimum:

```text
Token drift
Figma variables ↔ token repository

Component mapping drift
Figma components ↔ Code Connect metadata ↔ code exports

Visual drift
Storybook baseline ↔ changed Storybook

Integrated drift
Stable test environment ↔ production/pre-production screenshots
```

A Figma-to-browser screenshot diff MAY be used as a **drift signal**, but SHOULD NOT normally be an unconditional pixel gate because browser typography, rendering engines and platform differences create legitimate variance.

Storybook visual tests are explicitly designed around comparing story screenshots to approved baselines. citeturn197850search15

Playwright likewise supports screenshot assertions against reference images and warns that baseline and comparison environments should be held consistent because operating system, browser and hardware differences can alter rendering. citeturn812741search0

---

## 2.5 Prototyping

### 2.5.1 Prototype fidelity ladder

Prototype fidelity MUST be chosen according to the question being answered.

| Level | Form | Appropriate question |
|---|---|---|
| L0 | sketch / paper / rough flow | Are we solving the right problem? |
| L1 | wireflow / static frames | Is the information architecture and task sequence understandable? |
| L2 | clickable flow | Can users navigate the intended workflow? |
| L3 | system-realistic Figma prototype | Do content, hierarchy, interaction and component behavior work together? |
| L4 | coded prototype / feature spike | Does this work with real browser behavior, data, performance or assistive technology? |
| L5 | production-like environment | Does the integrated implementation work under realistic conditions? |

Higher fidelity is not inherently better.

NN/g distinguishes fidelity across interactivity, visuals and content and notes that both low- and high-fidelity prototypes have different research advantages.  
**Source:** https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/

### 2.5.2 Prototype for decision vs prototype for demo

Every prototype MUST declare its purpose.

**Decision prototype**

Optimized for learning.

It SHOULD:

- expose uncertainty;
- implement only paths necessary to answer the research question;
- be cheap to change;
- use realistic enough content for the tested decision;
- include deliberate test cases;
- avoid polish unrelated to the decision.

**Demo prototype**

Optimized for communication.

It SHOULD:

- have controlled navigation;
- avoid dead ends that distract from the narrative;
- identify simulated behavior;
- avoid implying that mocked integrations or data are implemented.

A demo MUST NOT be presented as evidence that implementation complexity, performance, accessibility or backend behavior has been solved.

### 2.5.3 Usability-testing prototypes

A usability-testing prototype MUST have sufficient fidelity in every dimension that materially affects the research question.

If testing:

```text
navigation      → navigation must behave realistically
content         → content must be realistic
form recovery   → errors and retry states must exist
search          → result relevance and empty states must be plausible
mobile controls → target sizes and gestures must be realistic
```

The prototype SHOULD be pilot-tested before sessions.

NN/g specifically recommends testing prototypes before implementation and notes that prototype errors can distort a participant's mental model and invalidate observations.  
**Source:** https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/

### 2.5.4 Variables-based prototype logic

Figma variables MAY be used for:

- toggles;
- selected states;
- counters;
- progressive disclosure;
- branching;
- conditional flows;
- theme switching;
- controlled form-state demonstrations.

Figma variables SHOULD be preferred to dozens of duplicated frames when they make the prototype easier to understand and maintain.

They SHOULD NOT be used to reproduce an application's full state-management or business-logic layer.

Figma explicitly supports variables both for design-system values and advanced prototyping.  
**Source:** https://www.figma.com/resource-library/design-tokens/

### 2.5.5 Realistic content

Prototype content MUST NOT be filled with `Lorem ipsum`, repeated fake names or unnaturally neat data if content length or meaning can affect behavior.

Test at least:

- short content;
- typical content;
- long content;
- zero values;
- large values;
- missing optional information;
- localization expansion where applicable.

Content fidelity is part of prototype fidelity, not decoration.  
**Source:** https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/

### 2.5.6 When a prototype is a liability

A Figma prototype SHOULD NOT be built or extended when:

- the real question concerns browser behavior;
- the real question concerns performance;
- accessibility must be tested with actual assistive technology;
- live validation or server timing is central to the task;
- substantial prototype logic would be discarded immediately;
- engineering can produce a coded spike more cheaply;
- the prototype would duplicate an already working Storybook component;
- stakeholders are likely to mistake simulated functionality for completed software.

Where a coded prototype is appropriate, it SHOULD use actual design-system components rather than recreating them.

GOV.UK's prototyping guidance follows the same principle: prototypes are expected to use the Design System's real component implementation rather than hand-recreating existing controls.  
**Source:** https://design-system.service.gov.uk/get-started/prototyping/

---

## 2.6 Spec authoring

### 2.6.1 The rule

A specification MUST state observable behavior precisely enough that two competent engineers independently implementing it would make substantially the same user-facing decisions.

Specifications MUST use:

- exact numbers where numbers are required;
- token references;
- defined states;
- interaction tables;
- responsive rules;
- error matrices;
- focus behavior;
- accessibility expectations;
- explicit ownership boundaries.

Avoid:

```text
slightly
roughly
some spacing
similar to
normal animation
as needed
desktop behavior
make responsive
standard error
```

### 2.6.2 Numbers

Where a value is governed by a token, write both token and resolved value when clarity requires it:

```text
min-height: size.control.md (40px)
padding-inline: space.300 (12px)
gap: space.200 (8px)
radius: radius.md (8px)
```

The token is authoritative. The resolved value improves reviewability.

### 2.6.3 Interaction tables

Complex interactions MUST use a table.

Canonical form:

| Event | Precondition | State transition | Visual result | Focus | Announcement |
|---|---|---|---|---|---|
| Trigger | Current state | New state | What changes | Where focus goes | What AT receives |

### 2.6.4 Error matrices

Networked or validated components MUST state error behavior explicitly.

| Failure | User-visible state | Recovery | Focus | Announcement |
|---|---|---|---|---|
| Validation | Field invalid | Correct input | Field or summary policy | Error text |
| Network | Inline error | Retry | Remains stable | Status/error announcement |
| Permission | Access unavailable | Alternate action | Relevant action | Error context |
| Timeout | Delayed/failed | Retry | Stable | Status message |

### 2.6.5 Canonical spec template

```text
# <Component / Feature>

## 1. Intent
Problem:
User goal:
Out of scope:

## 2. References
Figma:
Storybook:
Ticket:
Code component:
Token version:

## 3. Anatomy
1.
2.
3.

## 4. Component contract
Base component:
Variants:
Sizes:
Slots:
Props represented in design:

## 5. Tokens
Property | Token | Resolved value | Notes

## 6. Layout
Container:
Width:
Height:
Padding:
Gap:
Alignment:
Overflow:
Truncation:

## 7. Responsive behavior
Viewport/context | Layout | Hidden/changed behavior

## 8. State model
State | Entry condition | Visual treatment | Available actions

## 9. Interaction
Event | Precondition | State transition | Result | Focus | Announcement

## 10. Motion
Trigger:
Duration token:
Easing token:
Reduced-motion behavior:

## 11. Content rules
Labels:
Length:
Formatting:
Localization:
Empty values:

## 12. Data states
Loading:
Empty:
Partial:
Error:
Retry:
Stale:
Offline:

## 13. Validation / error matrix
Condition | Message | Placement | Recovery | Focus | Announcement

## 14. Accessibility
Semantic pattern:
Accessible name:
Keyboard:
Focus order:
Focus restoration:
Announcements:
Target size:
Reduced motion:

## 15. Analytics
Observable event requirements only.
Implementation owned by engineering/data standards.

## 16. Edge cases
-

## 17. Acceptance criteria
-

## 18. Ownership / unresolved decisions
Owner:
Open decision:
Due:
```

---

## 2.7 Example complex component spec — `AsyncCombobox`

This example demonstrates required specificity. Token resolutions below are illustrative for this component contract; organisation-wide token definitions remain governed by the Design Tokens standard.

### Intent

`AsyncCombobox` allows a user to search a remote list and select exactly one permitted value.

It is an **editable combobox with list autocomplete**.

Its behavior MUST follow the WAI-ARIA combobox interaction model rather than inventing custom arrow-key or Escape behavior. citeturn545777search0

### Anatomy

```text
Label
Input/combobox
Clear control, conditional
Popup
  Loading state
  Result options
  Empty state
  Error state
Helper text / field error
```

### Component contract

```text
Component: AsyncCombobox

Public design/code properties:
size        = sm | md
disabled    = boolean
invalid     = boolean
loading     = boolean
clearable   = boolean

Observable data state:
idle | searching | results | empty | error
```

A server error is a data state, not a visual `variant` prop unless the production component API explicitly models it that way.

### Tokens

| Property | Token | Example resolution |
|---|---|---:|
| Control height | `size.control.md` | 40px |
| Inline padding | `space.300` | 12px |
| Input/icon gap | `space.200` | 8px |
| Popup offset | `space.100` | 4px |
| Option min-height | `size.control.md` | 40px |
| Popup radius | `radius.md` | 8px |
| Popup background | `color.surface.overlay` | mode-dependent |
| Text | `color.text.default` | mode-dependent |
| Muted text | `color.text.muted` | mode-dependent |
| Focus ring | `color.focus.ring` | mode-dependent |
| Invalid border | `color.border.critical` | mode-dependent |

### Search behavior

```text
0 characters:
Show no remote result popup unless recent values are an explicit product requirement.

1 character:
Do not request results.

≥2 characters:
Begin search after 200ms debounce.

New query before previous response:
Previous result MUST NOT replace results for the newer query.

Request pending:
Keep user text editable.
Show loading indicator.
Do not clear existing text.

No results:
Show “No results for ‘{query}’.”
Do not convert the query into a valid value.

Request failure:
Show inline popup error and Retry action.
Do not clear the query.
```

The 200ms value is part of this example's observable UX contract. The implementation mechanism remains engineering-owned.

### Interaction table

| Event | Precondition | Transition | Result | Focus | Announcement |
|---|---|---|---|---|---|
| Input receives focus | Closed | No required transition | Field becomes focus-visible | Input | Accessible name/value exposed |
| Type second character | Idle | Searching | Popup opens with loading state | Input | Optional polite loading status |
| Results arrive | Searching | Results | Options replace loader | Input; active descendant model | Result count MAY be announced |
| `Down Arrow` | Results visible | Results | First option highlighted | DOM focus remains on input | Active option exposed |
| `Up Arrow` | Results visible | Results | Last/previous option highlighted | Input | Active option exposed |
| `Enter` | Option active | Selected → Closed | Option committed | Input | New value exposed |
| `Escape` | Popup open | Closed | Popup dismissed; text/value not implicitly committed | Input | No unnecessary announcement |
| Clear | Value selected | Idle | Value removed | Input | Empty value exposed |
| Retry | Error | Searching | Request repeated | Input | Loading status if used |
| Blur | Uncommitted text | Closed | Invalid free text is not silently committed | Next focus target | Error only if validation policy requires it |

WAI-ARIA's combobox guidance specifies the input as the tab stop, defines `Down Arrow`, `Escape` and `Enter` behavior, and describes use of `aria-expanded`, `aria-controls` and `aria-activedescendant`. citeturn545777search0

### Accessibility

The implementation MUST:

- expose the control as the appropriate combobox pattern;
- expose a programmatic label;
- update expanded state;
- associate the popup with the combobox;
- preserve standard text-editing keys;
- expose the active option correctly;
- ensure the selected/highlighted option is visually distinct;
- keep focus visible;
- announce meaningful error/status changes without forcing focus to transient status text.

WCAG requires UI component names, roles, values and states to be programmatically available and status messages to be available to assistive technologies. citeturn197703search0

### Error matrix

| Condition | UI | Recovery | Focus | Announcement |
|---|---|---|---|---|
| No matches | `No results for "{query}"` | Modify query | Input | Optional results status |
| Search request fails | `Couldn’t load results` + Retry | Retry | Input | Error/status |
| Required field left empty | Field error below control | Select value | Form policy | Error |
| Selected value becomes unavailable | Invalid state explaining value is no longer available | Re-select | Input on correction flow | Error |
| Permission removed | Disabled/unavailable explanation | Follow product authorization flow | Stable | Relevant status |

### Acceptance criteria

Implementation is accepted only when:

- token use matches the approved token contract;
- all listed states exist;
- keyboard behavior passes the agreed combobox interaction tests;
- long options truncate/wrap according to the content rule;
- stale network responses cannot replace a newer query;
- focus remains predictable through open/close/select/error;
- dark/high-contrast modes render correctly where supported;
- Storybook contains idle, loading, populated, long-content, empty, error, disabled and invalid stories;
- visual regression baselines exist for system-owned states.

---

## 2.8 Tooling and automation

### 2.8.1 Figma REST API

Automation SHOULD use Figma APIs for repeatable machine-readable workflows rather than requiring humans to manually copy values.

Appropriate uses include:

- auditing component names;
- retrieving file metadata;
- enumerating nodes;
- retrieving variables;
- detecting unbound/raw values;
- exporting reference renders;
- checking library/component metadata;
- generating drift reports.

Figma's Variables REST API supports querying and changing variables and can be integrated with CI workflows, subject to current plan and permission restrictions. citeturn197850search2turn197850search5

Because API availability and plan requirements can change, automation MUST degrade clearly rather than silently skipping checks.

### 2.8.2 Code Connect and Dev Mode

Production-supported components SHOULD use Code Connect when supported.

Mappings MUST point to actual production components, not illustrative snippets copied into a documentation repository.

Code Connect SHOULD be updated when:

- component symbol changes;
- public props change;
- variant names change;
- import path changes;
- a component is deprecated.

Figma's current recommended Code Connect workflow connects a Figma design library to an existing design-system codebase through published mapping templates. citeturn197850search16

### 2.8.3 Token synchronization

There MUST be one declared machine-readable authority for token values.

Acceptable models include:

```text
Token repository → generated Figma variables + platform outputs
```

or, where governance requires it:

```text
Figma variables → validated export → token repository → platform outputs
```

Bidirectional synchronization MUST NOT permit uncontrolled last-write-wins behavior.

Every sync SHOULD validate:

- valid token names;
- dependency cycles;
- unexpected primitives;
- missing aliases;
- invalid mode coverage;
- deleted tokens still referenced by components;
- changed resolved values;
- generated platform output.

### 2.8.4 Image export pipeline

Production image exports SHOULD be automated for governed assets.

A canonical pipeline is:

```text
Approved Figma asset nodes
        ↓
Pinned Figma file version
        ↓
REST render/export
        ↓
Deterministic filename
        ↓
SVG/image optimization
        ↓
Dimension/format validation
        ↓
Repository / CDN
        ↓
Visual diff on change
```

Exports MUST reference stable node IDs and a pinned or deliberately selected design version.

Figma's REST file endpoints can return node data and render nodes to SVG, PNG, JPG or PDF, including against a specified version. citeturn271006search0

Developers MUST NOT manually download and rename governed icons as a normal release process.

### 2.8.5 Automated screenshot comparison

Two forms of visual regression SHOULD exist.

**Component visual regression**

```text
Storybook stories
→ deterministic browser
→ screenshots
→ approved baselines
→ reviewed diffs
```

Storybook's visual-testing model creates screenshots from stories and compares them with accepted baselines. citeturn197850search15

**Integrated product regression**

```text
Stable seeded environment
→ Playwright route
→ deterministic viewport
→ wait for stable UI
→ screenshot
→ baseline
→ diff
```

Playwright provides native screenshot comparison through `toHaveScreenshot()` and recommends consistent execution environments for reliable comparisons. citeturn812741search0

Visual tests SHOULD mask or normalize unavoidable volatility such as:

- clocks;
- generated IDs;
- rotating ads/content;
- uncontrolled remote imagery;
- animations.

Tolerance MUST NOT be raised broadly merely to make failing tests green.

### 2.8.6 Drift report

A CI drift report SHOULD produce actionable output such as:

```text
ERROR  Button: Figma variant `danger` has no code mapping.
ERROR  Dialog: code exports `size=fullscreen`; Figma missing variant.
WARN   color.text.muted differs between token source and published Figma variable.
WARN   Checkbox Figma node changed since pinned release version.
INFO   3 approved Storybook visual baselines changed in this PR.
```

The report MUST identify the artifact, discrepancy and owner/action. A red/green status without diagnosis is insufficient.

---

## 2.9 Collaboration rituals

### 2.9.1 Design/development pairing

Designers and engineers SHOULD pair early on:

- new components;
- unfamiliar responsive behavior;
- complex forms;
- data-heavy interfaces;
- advanced interaction;
- novel motion;
- accessibility-sensitive composite controls.

Pairing SHOULD happen **before** the design is polished enough to create sunk-cost resistance.

### 2.9.2 Three-amigos review

For significant flows, a short review SHOULD include:

```text
Design
Engineering
QA / accessibility / product quality representative
```

The review covers:

- user-observable states;
- edge cases;
- integration failure;
- acceptance criteria;
- testing strategy;
- ambiguity in the spec.

The purpose is contract clarification, not sign-off ceremony.

### 2.9.3 Visual-defect triage

Visual bugs MUST be triaged by contract impact.

**P0/P1 equivalent**
- prevents task completion;
- critical content obscured;
- severe accessibility regression;
- destructive action materially misrepresented.

**High**
- wrong component/state;
- broken responsive layout;
- missing focus;
- unreadable contrast;
- clipping/truncation that changes meaning.

**Normal**
- incorrect governed token;
- spacing or typography drift;
- wrong icon;
- motion mismatch.

**Low**
- cosmetic deviation with no material system or usability impact.

Teams MUST NOT use the phrase "design QA" as a catch-all for late-stage visual policing. Design quality is continuous.

---

## 2.10 Onboarding

### 2.10.1 New designers

A new designer MUST learn, in this order:

1. token architecture;
2. published Figma libraries;
3. component and pattern reuse;
4. product file conventions;
5. prototyping fidelity;
6. handoff contract;
7. Dev Mode annotations/status;
8. accessibility expectations;
9. change-management process.

The onboarding exercise SHOULD require the designer to:

- build a small feature using only governed components;
- switch supported modes;
- produce loading/empty/error states;
- create a small decision prototype;
- prepare the feature for handoff;
- review it with an engineer.

They SHOULD NOT begin by creating new components.

### 2.10.2 New developers

A new frontend developer MUST learn:

1. token package and generated outputs;
2. shadcn/ui-derived component source;
3. Storybook;
4. component public API conventions;
5. Figma inspection / Dev Mode;
6. Code Connect where used;
7. accessibility test expectations;
8. visual-regression workflow;
9. how design changes are versioned.

Their onboarding exercise SHOULD require them to implement one small design and compare:

```text
Figma intent
Storybook component
production-like route
keyboard behavior
visual diff
```

### 2.10.3 System literacy

Onboarding is complete only when the contributor understands **where a change belongs**.

Examples:

```text
New brand color      → token system
New button appearance→ Button contract, not product CSS
Checkout-only layout → product composition
New reusable workflow→ pattern candidate
New API error        → API + UX error contract
Focus defect         → accessibility/component defect
```

Documentation that teaches only where files are stored is insufficient.

---

# 3. Anti-patterns

The following practices are prohibited or strongly discouraged.

### 3.1 The giant Figma file

One file contains foundations, components, product screens, experiments and archived work.

**Why it fails:** ownership, publishing, permissions, search and release history become ambiguous.

### 3.2 Figma-only design system

A component is considered real because it exists in Figma even though no production equivalent exists.

**Rule:** published system status MUST reflect implementation reality.

### 3.3 Code-only component drift

Engineering adds variants and states without reconciling Figma.

**Rule:** public contract changes MUST propagate to design representation.

### 3.4 Screenshot handoff

The engineer receives screens and must infer states, behavior and edge cases.

**Rule:** a screenshot is not a specification.

### 3.5 Redline archaeology

Hundreds of manually placed dimensions duplicate auto-layout and token information.

**Rule:** annotations MUST encode intent or exceptions, not restate inspectable properties.

### 3.6 Pixel-perfect theatre

Teams optimize screenshots while shipping incorrect semantics, broken keyboard behavior or brittle responsive code.

**Rule:** contract fidelity outranks screenshot identity.

### 3.7 Prototype-as-product

A polished Figma prototype causes stakeholders to assume integrations, accessibility, data behavior or performance are solved.

**Rule:** simulated behavior MUST be explicit.

### 3.8 Prototype logic sink

A designer spends days recreating server state in variables even though a coded prototype could answer the question directly.

**Rule:** prototype fidelity MUST remain proportional to the decision.

### 3.9 Happy-path specification

Only populated, successful desktop screens are handed off.

**Rule:** loading, empty, error, long-content and responsive states are part of the design.

### 3.10 Raw-value leakage

Production components accumulate `#hex`, arbitrary pixels or one-off Tailwind values despite equivalent system tokens.

**Rule:** governed decisions MUST use governed tokens.

### 3.11 Variant explosion

Figma component properties encode every permutation rather than true independent dimensions.

```text
BAD
Primary/Hover/WithIcon/Dark/Compact

GOOD
variant=default
state=hover
iconStart=true
size=sm
theme provided by mode
```

### 3.12 Unversioned Ready for Dev

A developer starts against a frame that continues changing without release metadata.

**Rule:** handoff MUST be a trackable checkpoint.

### 3.13 Decisions in private chat

A requirement exists only in Slack/Teams/DM history.

**Rule:** durable decisions live with the durable artifact.

### 3.14 Figma-vs-browser pixel gate

CI fails because text anti-aliasing differs between Figma and Chromium.

**Rule:** Figma comparison is a drift signal; executable baseline comparison is the primary visual regression mechanism.

---

# 4. Checklists

## 4.1 Handoff readiness checklist

A design is **Ready for Dev** only when all applicable items below are complete.

### Architecture

- [ ] Correct product and library files are used.
- [ ] No local replacement exists for a supported system component.
- [ ] Unsupported new components have an owner and implementation plan.
- [ ] Component names and variants match code vocabulary.

### Tokens

- [ ] Governed properties use variables/tokens.
- [ ] No unjustified raw colors exist.
- [ ] No unjustified arbitrary spacing values exist.
- [ ] Modes have been checked where applicable.
- [ ] Dark/high-contrast/brand variants are covered where required.

### States

- [ ] Default state exists.
- [ ] Hover/active/focus states are defined where material.
- [ ] Loading state exists.
- [ ] Empty state exists.
- [ ] Error state exists.
- [ ] Disabled/read-only states exist where applicable.
- [ ] Success/confirmation behavior is defined.
- [ ] Long-content behavior is defined.

### Interaction

- [ ] Trigger behavior is explicit.
- [ ] Keyboard behavior is explicit for non-trivial controls.
- [ ] Focus entry is defined.
- [ ] Focus restoration is defined.
- [ ] Escape/cancel behavior is defined.
- [ ] Destructive behavior is defined.
- [ ] Motion is specified or deliberately absent.

### Responsive

- [ ] Narrowest supported layout has been designed.
- [ ] Largest expected layout has been checked.
- [ ] Wrapping and truncation are explicit.
- [ ] Sticky/fixed regions are explicit.
- [ ] Overflow behavior is explicit.

### Content

- [ ] Final or representative copy is present.
- [ ] Content constraints are documented.
- [ ] Empty/null behavior is defined.
- [ ] Localization expansion has been considered.
- [ ] Numbers/dates/currency follow the content/data standard.

### Accessibility

- [ ] Accessible name source is clear.
- [ ] Correct semantic pattern is identified for custom interaction.
- [ ] Keyboard operation is possible.
- [ ] Focus-visible design exists.
- [ ] Status/error announcements are identified where needed.
- [ ] Pointer-only interaction has an equivalent.
- [ ] Reduced-motion requirement is documented.
- [ ] Reading/focus order is logical.

### Integration

- [ ] Relevant Security/Data/API/Form standards have been considered.
- [ ] Data loading/failure assumptions are documented.
- [ ] Engineering has reviewed complex behavior.
- [ ] Implementation ticket is linked.
- [ ] Storybook component references are linked.
- [ ] Known unanswered questions have owner + deadline.

### Release

- [ ] Frame/section is marked Ready for Dev.
- [ ] Design checkpoint/version is recorded.
- [ ] Design-system/token version is recorded where required.
- [ ] Post-handoff changes will follow change-control rules.

---

## 4.2 Implementation review checklist

- [ ] Correct system components are used.
- [ ] Props/variants correspond to the approved contract.
- [ ] No unexplained raw tokens/values were introduced.
- [ ] All required states are implemented.
- [ ] Browser/device responsive behavior matches the contract.
- [ ] Keyboard behavior has been manually exercised.
- [ ] Focus order/restoration is correct.
- [ ] Status and errors are announced appropriately.
- [ ] Content behaves under short/long/empty inputs.
- [ ] Storybook reflects new component behavior.
- [ ] Automated visual baselines exist or were updated intentionally.
- [ ] Deviations from Figma are documented where implementation revealed a better/correct solution.
- [ ] Figma is reconciled when implementation becomes the new approved contract.

---

# 5. Canonical summary

The Gold Standard is:

```text
One design language.
One component vocabulary.
One token taxonomy.
Multiple synchronized representations.
```

Figma MUST express design intent using governed libraries, variables, modes and production-aligned component names.

Code MUST implement the same observable contract through accessible, composable system components, using shadcn/ui as the baseline rather than an immutable visual dependency.

A handoff MUST include behavior, state, tokens, responsive rules, content, motion, accessibility and edge cases—not merely screens.

A prototype MUST answer a declared question. Fidelity MUST be proportional to that question. Figma MUST NOT become a substitute for coded testing when real browser, data, performance or accessibility behavior is what matters.

Specs MUST use exact tokens, values, interaction tables and error matrices when ambiguity would otherwise exist.

Ready for Dev MUST be a versioned checkpoint, not a casual label.

Storybook MUST represent the executable component contract. Code Connect SHOULD bind the design representation to that contract. Tokens SHOULD be machine-synchronized. Visual regression SHOULD test Storybook and integrated product surfaces automatically.

Figma-to-production drift MUST be detectable.

Design changes after handoff MUST be communicated and versioned.

Designers and engineers MUST review the contract together before implementation becomes expensive.

The outcome is not "pixel perfect."

The outcome is **contract perfect: visually coherent, behaviorally correct, accessible, testable, versioned and maintainable.**

---

# Sources

## Primary sources scraped with Firecrawl

1. **Figma — Design tokens: How to sync design and code in Figma**  
   https://www.figma.com/resource-library/design-tokens/

2. **Figma — Guide to Dev Mode**  
   https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode

3. **W3C WAI — Developing a Keyboard Interface, ARIA Authoring Practices Guide**  
   https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/

4. **GOV.UK Design System — Prototyping**  
   https://design-system.service.gov.uk/get-started/prototyping/

5. **Nielsen Norman Group — UX Prototypes: Low Fidelity vs. High Fidelity**  
   https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/

## Supplemental current documentation verified during research

- urlFigma Code Connect — Getting started with Code Connect CLIturn197850search16
- urlFigma Variables REST APIturn197850search2
- urlFigma REST API file and image endpointsturn271006search0
- urlFigma Dev Mode annotations and inspectionturn812741search2
- urlshadcn/ui — Introductionturn197850search0
- urlStorybook — Visual teststurn197850search15
- urlPlaywright — Visual comparisonsturn812741search0
- urlW3C — WCAG 2.2turn197703search0
- urlW3C — ARIA Combobox Patternturn545777search0

**Research date:** 23 September 2026.

I can also convert this into the same tighter house style as the other Gold Standards—for example, with identical section numbering, RFC-style requirement IDs (`HF-001`, `PROTO-014`), and compliance-test criteria.
