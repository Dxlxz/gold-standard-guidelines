---
id: "a11y-inclusive"
title: "Accessibility & Inclusive Design Patterns"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "a11y", "accessibility", "inclusive", "patterns"]
applies_to: ["ui", "team"]
related: ["extension"]
legacy_number: 112
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 73042
provenance: baseline

---

Research completed first via Firecrawl. The document below distinguishes **formal WCAG requirements**, **platform guidance**, **jurisdiction-specific policy**, and **house design standards** so implementation teams do not mistake recommended product thresholds for legal requirements.

# Gold Standard 2026 — Accessibility & Inclusive Design Patterns

**Status:** Canonical design standard  
**Scope:** Product design, interaction design, visual design, content design, localization, prototyping, accessibility review, and inclusive-design validation  
**Conformance target:** WCAG 2.2 Level AA minimum  
**Component baseline:** shadcn/ui  
**Companion:** Accessibility Engineering Standard  
**Normative language:** **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** indicate requirement strength.

---

# 1. Purpose

Accessibility is a product-quality requirement, not an engineering remediation phase.

Design determines many accessibility outcomes before code exists:

- whether information depends on color;
- whether text survives zoom;
- whether controls are large enough to operate;
- whether keyboard focus has a sensible destination;
- whether errors are understandable;
- whether gestures have alternatives;
- whether complex widgets have coherent interaction models;
- whether content assumes memory, dexterity, hearing, vision, language, culture, or one input modality;
- whether localization can fit without breaking the interface.

WCAG 2.2 organizes accessibility around perceivable, operable, understandable, and robust experiences and adds Level AA criteria particularly relevant to modern interaction design, including **Focus Not Obscured (Minimum)**, **Dragging Movements**, **Target Size (Minimum)**, and **Accessible Authentication (Minimum)**.  
https://www.w3.org/WAI/WCAG22/Understanding/

This design standard therefore MUST be applied alongside:

- Security;
- Data & Database;
- API;
- State Management;
- Forms & Validation;
- Accessibility Engineering;
- Design Tokens;
- Components;
- Overlays & Feedback;
- Content and localization standards.

## Rules

1. Accessibility MUST be designed into flows before implementation.
2. WCAG 2.2 AA MUST be treated as the product baseline, not an aspirational enhancement.
3. Meeting WCAG mechanically MUST NOT be treated as proof of inclusive usability.
4. Designers MUST specify accessible interaction behavior for custom and composite widgets.
5. A shadcn/ui primitive MUST NOT be assumed accessible merely because it comes from the component library; its composition, labeling, content, states, and surrounding interaction still require review.  
   https://ui.shadcn.com/docs/components
6. Accessibility MUST be reviewed across disability, language, device, and input modality—not only screen-reader use.
7. Product requirements SHOULD exceed WCAG minima where doing so materially reduces exclusion.
8. Accessibility requirements MUST survive theme changes, localization, zoom, responsive layout, and content variation.

### Do / Don't

| Do | Don't |
|---|---|
| Design accessibility states in the source design | Add an “accessibility pass” after visual approval |
| Treat keyboard, touch, voice, and AT as first-class input methods | Assume mouse + screen reader covers accessibility |
| Record accessible names and behavior with components | Leave semantics for engineering to infer |
| Test real workflows | Audit only isolated screens |
| Prefer robust inclusive defaults | Depend on special “accessible mode” for basic access |

## Anti-patterns

- “Engineering will fix accessibility later.”
- designing focus only after handoff;
- using an accessible component with inaccessible copy or hierarchy;
- inaccessible desktop behavior justified because mobile works;
- WCAG checklist passed but core task still impractical with magnification or keyboard.

## Checklist

- [ ] WCAG 2.2 AA is the minimum baseline.
- [ ] Inclusive requirements appear in design acceptance criteria.
- [ ] Accessibility behavior is present in component specs.
- [ ] Localization and input-modality effects are reviewed.
- [ ] Engineering is not expected to infer missing interaction semantics.

## Canonical summary

**Accessibility is a design constraint from the first wireframe, not a compliance layer added to the final interface.**

---

# 2. Standards, Legal and Policy Baseline

## Purpose

Separate the product accessibility target from jurisdiction-specific legal requirements.

## Rules

## 2.1 WCAG 2.2

The canonical product target is:

```text id="uo6fz5"
WCAG 2.2
Level AA
Web and web-derived product interfaces
```

W3C recommends WCAG 2.2 as the current WCAG 2 standard.  
https://www.w3.org/WAI/standards-guidelines/wcag/

The product SHOULD also adopt selected AAA practices where they substantially improve usability without unreasonable constraint—for example stronger focus indicators and reduced-motion behavior.

WCAG AA is a floor.

It MUST NOT be treated as the maximum accessibility requirement.

---

## 2.2 EN 301 549

As of September 2026, **EN 301 549 V4.1.1 (2026-09)** is the newest published European ICT accessibility standard. It updates its web, document, and software requirements to align with WCAG 2.2 and contains additional requirements beyond ordinary web-content conformance.  
https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf

Publication of a new EN version does **not itself mean that every EU legal instrument immediately references that edition**. The European AccessibleEU centre noted at publication that the new version did not create an immediate new compliance obligation merely by being published; applicable harmonization and procurement requirements must be checked for the relevant jurisdiction and contract.  
https://accessible-eu-centre.ec.europa.eu/content-corner/news/european-accessibility-standard-en-301-549-has-been-updated-2026-09-07_en

Products subject to European accessibility procurement or market requirements SHOULD therefore maintain an EN 301 549 gap assessment in addition to a WCAG audit.

---

## 2.3 ADA — United States

For U.S. state and local governments covered by **ADA Title II**, the U.S. Department of Justice web/mobile accessibility rule specifies **WCAG 2.1 Level AA** as its technical standard.  
https://www.ada.gov/resources/2024-03-08-web-rule/

This product standard remains WCAG **2.2 AA**, because meeting a newer internal baseline avoids designing down to a jurisdiction that currently names an older WCAG version.

Other ADA contexts MUST receive jurisdiction-specific legal review. Teams MUST NOT assume that the Title II technical rule automatically defines every private-sector ADA obligation.

---

## 2.4 Malaysia public-sector context

Malaysia's **Pekeliling Pendigitalan Perkhidmatan Awam Bilangan 1 Tahun 2025** includes public-sector guidance that accessibility for persons with disabilities in agency portals, websites, and service applications is **encouraged to be guided by WCAG**. The wording is guidance/expectation rather than a statement that every Malaysian digital product is automatically subject to one universal WCAG conformance statute.  
https://trglib.gov.my/index.php/muat-turun/category/1-pekeliling?download=92:pekeliling-pendigitan-perkhidmatan-awam-bil-1-tahun-2025

For Malaysian government or government-adjacent work, teams MUST confirm:

- agency requirements;
- procurement requirements;
- applicable circulars and standards;
- accessibility-statement obligations;
- required Bahasa Melayu and other language support.

### Do / Don't

| Do | Don't |
|---|---|
| Use WCAG 2.2 AA as the internal baseline | Reduce the product to the oldest legal standard encountered |
| Check EN/ADA/Malaysia obligations by scope | Treat WCAG itself as legislation |
| Record procurement requirements separately | Assume one jurisdiction's rule applies worldwide |
| Re-check standards during procurement/release | Copy a 2023 compliance matrix indefinitely |

## Anti-patterns

- “WCAG compliant” without version and level;
- claiming EN 301 549 conformance based solely on WCAG testing;
- describing Malaysia's WCAG guidance as a universal statutory mandate;
- describing ADA Title II's WCAG rule as the technical rule for every ADA-covered entity.

## Checklist

- [ ] WCAG version and level named.
- [ ] Jurisdiction identified.
- [ ] EN requirements checked where relevant.
- [ ] ADA scope distinguished correctly.
- [ ] Malaysian public-sector requirements reviewed for relevant projects.
- [ ] Legal/procurement requirements stored separately from house design rules.

## Canonical summary

**WCAG defines the product baseline; law and procurement determine which requirements are legally enforceable in a particular context.**

---

# 3. Perception — Contrast, Colour and Visual Meaning

## Purpose

Ensure information remains perceivable when users have reduced acuity, color-vision differences, contrast sensitivity differences, or customized display settings.

## Rules

## 3.1 Text contrast

WCAG 2.2 AA requires:

```text id="9tfegq"
normal text        ≥ 4.5:1
large text         ≥ 3:1
```

WCAG defines large text approximately as:

```text id="6thh2n"
18 pt / 24 CSS px regular
or
14 pt / ~18.7 CSS px bold
```

https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

Contrast MUST be tested against the **actual rendered background**, including:

- gradients;
- images;
- overlays;
- disabled/hover/focus states;
- light theme;
- dark theme.

Decorative disabled content that users do not need to understand may fall under exceptions, but disabled-looking treatment MUST NOT be used for important explanatory content.

---

## 3.2 Non-text contrast

WCAG requires at least **3:1** contrast for visual information needed to identify UI components/states and for graphical objects necessary to understand content.  
https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html

Examples include:

- input boundaries where the boundary is required to identify the field;
- selected-state outlines;
- chart lines conveying data;
- focus indicators;
- essential icons.

---

## 3.3 Never use colour alone

Colour MUST NOT be the sole indicator of:

- error;
- success;
- warning;
- selection;
- status;
- chart category;
- required state;
- availability.

WCAG explicitly prohibits use of color as the only visual means of conveying information.  
https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html

Pair colour with one or more of:

- text;
- shape;
- icon;
- pattern;
- position;
- explicit label.

Example:

```text id="4kxx5z"
● Failed
```

is stronger than a red dot alone.

---

## 3.4 Charts

Charts MUST remain interpretable without hue discrimination.

Series SHOULD differ through combinations of:

- colour;
- line style;
- point shape;
- labels;
- direct annotation.

Hover-only values MUST NOT be the only path to exact data.

Critical charts SHOULD provide a table or structured textual alternative.

---

## 3.5 Dark mode

Dark mode is not automatically accessible.

Teams MUST recalculate:

- text contrast;
- border contrast;
- icon contrast;
- focus visibility;
- chart distinctions.

Do not invert arbitrary light-theme colors.

Use semantic design tokens:

```text id="jn4evv"
background
foreground
muted
muted-foreground
border
input
ring
destructive
chart-*
```

Dark mode MUST remain a complete semantic theme rather than a CSS filter.

---

## 3.6 High-contrast and forced-colour modes

Critical meaning MUST survive user-imposed high-contrast/forced-colour modes.

Design specs SHOULD identify:

- required visible boundaries;
- selected states;
- focus outlines;
- icons whose meaning would disappear if custom fills were removed.

Do not use background-image differences as the sole active-state mechanism.

### Do / Don't

| Do | Don't |
|---|---|
| Test real foreground/background combinations | Approve palette tokens in isolation |
| Pair colour with text/icon/shape | Use green/red dots alone |
| Re-test dark mode independently | Assume inversion preserves contrast |
| Label chart series directly | Require users to distinguish similar hues |
| Preserve boundaries in high-contrast modes | Encode state only in background fill |

## Anti-patterns

- light-grey body copy for visual subtlety;
- placeholder text carrying necessary instructions;
- error border with no message;
- status heatmap with no legend/value alternative;
- dark mode produced by global inversion.

## Checklist

- [ ] Normal text ≥ 4.5:1.
- [ ] Large text ≥ 3:1.
- [ ] Essential non-text visuals ≥ 3:1.
- [ ] Colour is never the only carrier of meaning.
- [ ] Dark theme independently tested.
- [ ] Essential information survives forced colours.
- [ ] Chart categories have non-colour distinctions.

## Canonical summary

**Colour may reinforce meaning; it MUST NOT own meaning.**

---

# 4. Perception — Typography and Readability

## Purpose

Make text robust under low vision, cognitive differences, dyslexia, zoom, language variation, and display customization.

## Rules

WCAG does not prescribe one universal body-font size or font weight. The following are therefore **house design standards**, not WCAG thresholds.

### 4.1 House typography minimums

```text id="smr4xk"
default body text         16 CSS px or larger
compact functional text  14 CSS px minimum
12 CSS px                 exceptional nonessential metadata only

normal functional weight 400 minimum
emphasis                  500–700 as typeface supports
light weights <400        SHOULD NOT be used for functional UI copy
```

Contrast requirements still apply regardless of size.

Apple's accessibility guidance likewise recommends sufficient type size, scalable text, and attention to font weight and contrast.  
https://developer.apple.com/design/human-interface-guidelines/accessibility

---

## 4.2 Scaling

Designs MUST survive **200% text enlargement** without loss of content or functionality as required by WCAG.  
https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html

Interfaces SHOULD also remain usable under 400% browser zoom/reflow conditions required by applicable WCAG reflow rules.  
https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

Do not freeze container heights around copy.

---

## 4.3 Text spacing resilience

Content MUST remain functional when users override text spacing to WCAG test values including increased line, paragraph, letter, and word spacing.  
https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html

These values are compatibility tests, not mandatory default typography.

---

## 4.4 Dyslexia and reading differences

No single typeface should be advertised as universally “dyslexia accessible.”

Prefer typography that provides:

- distinguishable glyph shapes;
- stable letter spacing;
- clear punctuation;
- adequate x-height;
- consistent weight.

Body text SHOULD generally use:

```text id="pcasqv"
line-height: 1.4–1.6
moderate line length
left alignment for LTR prose
```

Long paragraphs SHOULD NOT be:

- fully justified;
- written in all caps;
- heavily italicized;
- compressed through tight tracking.

Users' font/browser overrides MUST NOT break layout.

---

## 4.5 Content hierarchy

Heading size alone MUST NOT carry structure.

Hierarchy SHOULD use:

- actual heading levels;
- spacing;
- font size;
- weight;
- grouping.

Heading levels MUST follow document meaning rather than visual preference.

### Do / Don't

| Do | Don't |
|---|---|
| Start ordinary body copy around 16 px | Use 11–12 px for core product text |
| Let text wrap and containers grow | Fix card heights to English copy |
| Use genuine heading structure | Style random text as a heading |
| Keep prose left-aligned in LTR languages | Fully justify long UI copy |
| Allow browser/font overrides | Prevent user text customization |

## Anti-patterns

- 12 px muted text used for important instructions;
- 300-weight functional labels;
- fixed-height buttons that clip enlarged text;
- text baked into images;
- arbitrary heading-level skips for visual size.

## Checklist

- [ ] Core body text follows house minimum.
- [ ] Functional copy does not use ultra-light weights.
- [ ] 200% text works.
- [ ] 400% zoom/reflow tested for applicable views.
- [ ] Text-spacing overrides do not break content.
- [ ] Headings reflect document structure.
- [ ] Long prose avoids fully justified layout.

## Canonical summary

**Readable typography is flexible typography: it must survive enlargement, reflow, different languages, and user preference.**

---

# 5. Perception — Motion and Vestibular Safety

## Purpose

Use motion without triggering discomfort, disorientation, or unnecessary cognitive burden.

## Rules

Motion MUST have a functional reason:

- spatial relationship;
- state change;
- direct-manipulation feedback;
- progress;
- orientation.

Decorative motion SHOULD be removable.

W3C provides `prefers-reduced-motion` techniques for users who request reduced animation.  
https://www.w3.org/WAI/WCAG22/Techniques/css/C39

### Reduce or remove

Under reduced-motion preference:

- parallax MUST stop;
- large zoom/scale transitions SHOULD become fades;
- large panning SHOULD be removed;
- looping decorative movement SHOULD stop;
- simulated depth/camera motion SHOULD be removed;
- rapid peripheral animation SHOULD be minimized.

Apple similarly recommends reducing repetitive, zooming, scaling, and peripheral motion when Reduce Motion is active.  
https://developer.apple.com/design/human-interface-guidelines/accessibility

### Flashing

Content MUST satisfy WCAG flash thresholds and MUST NOT introduce dangerous flashing animation.  
https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html

### Autoplay

Autoplaying motion SHOULD be avoided unless:

- expected by task;
- easily paused;
- nonessential motion can be disabled.

### Do / Don't

| Do | Don't |
|---|---|
| Use motion to explain state | Animate because empty space feels boring |
| Replace large movement with fade for reduced motion | Merely slow down motion |
| Allow pause/stop where appropriate | Loop decorative animation indefinitely |
| Keep success effects brief | Block progress until animation completes |
| Test peripheral and full-screen motion | Use parallax as default navigation |

## Anti-patterns

- full-screen zoom transitions for routine navigation;
- essential status visible only through animation;
- endless skeleton shimmer;
- “reduced motion” with the same movement at half speed.

## Checklist

- [ ] Every motion has purpose.
- [ ] Reduced-motion variant defined.
- [ ] Large spatial motion removed under preference.
- [ ] Loops can stop.
- [ ] Flash criteria reviewed.
- [ ] Animation never delays essential action.

## Canonical summary

**Motion MUST clarify the interface without becoming a prerequisite for tolerating it.**

---

# 6. Operability — Target Size and Pointer Interaction

## Purpose

Support people with limited dexterity, tremor, touch use, pen input, magnification, and imprecise pointing.

## Rules

WCAG 2.2 AA Target Size (Minimum) requires pointer targets to be at least **24 × 24 CSS pixels** or satisfy specified spacing/exception conditions.  
https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

The Gold Standard SHOULD exceed that minimum.

### House touch-target standard

```text id="z8pi1a"
preferred touch hit area  44 × 44 CSS px
WCAG AA floor             24 × 24 CSS px, subject to WCAG exceptions
preferred target gap      ≥ 8 CSS px where adjacent hit areas remain compact
```

Apple also recommends 44 × 44 pt as the default touch-control target on iOS/iPadOS.  
https://developer.apple.com/design/human-interface-guidelines/accessibility

A visible icon MAY be smaller than 44 px if its actual interactive hit area remains sufficient.

---

## 6.1 Complex gestures

Any functionality using multipoint or path-based gestures MUST provide a simpler alternative unless the gesture is essential.  
https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html

Examples:

- pinch zoom → `+` / `−` zoom controls;
- swipe delete → visible Delete action;
- freehand gesture shortcut → normal command.

---

## 6.2 Dragging

WCAG 2.2 AA requires functionality using dragging movements to have a single-pointer alternative unless dragging is essential.  
https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html

Examples:

- reorder drag → Move up/down or move-to-position;
- map marker drag → editable coordinates;
- slider drag → typed numeric field;
- kanban drag → Move to… command.

---

## 6.3 Pointer cancellation

Actions SHOULD commit on **up**, not initial pointer-down, allowing users to cancel accidental activation where practical.

https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html

### Do / Don't

| Do | Don't |
|---|---|
| Aim for 44 px touch areas | Treat 24 px as the preferred design size |
| Provide visible alternatives to swipes | Make swipe the only delete mechanism |
| Pair drag with commands | Require pixel-precise dragging |
| Enlarge hit area around small icons | Force the visible glyph itself to be 44 px |
| Allow accidental activation to be cancelled | Trigger destructive action on pointer-down |

## Anti-patterns

- 16 px icon-only targets;
- tightly packed row actions;
- map controls operable only through pinch;
- drag-only prioritization;
- hover-only actions required for completion.

## Checklist

- [ ] Touch targets meet WCAG floor.
- [ ] Primary targets aim for 44 × 44.
- [ ] Adjacent targets have adequate separation.
- [ ] Gesture alternatives exist.
- [ ] Drag alternatives exist.
- [ ] Pointer cancellation considered.

## Canonical summary

**Users SHOULD NOT need precision motor control to perform ordinary product actions.**

---

# 7. Operability — Keyboard, Focus and Navigation

## Purpose

Ensure complete operation without a mouse or touch screen.

## Rules

All interactive functionality MUST be reachable and usable by keyboard unless the underlying function inherently requires path-dependent input.

WCAG requires keyboard operability and prohibits keyboard traps.  
https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html  
https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html

---

## 7.1 Focus order

Focus MUST follow a logical task/read order.

Visual rearrangement MUST NOT create a DOM/focus order that appears to jump unpredictably.

Avoid positive `tabindex` models in design specifications.

---

## 7.2 Focus visibility

Keyboard focus MUST always be visible.  
https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html

WCAG 2.2 AA additionally requires focused components not to be entirely hidden by author-created content.  
https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html

### House focus standard

The Gold Standard adopts a stronger focus appearance than bare AA:

```text id="8hs9gj"
visible outline thickness: 2 CSS px minimum
clear visual offset where needed
contrast: target ~3:1 against adjacent colours
focus MUST remain visible under sticky headers/footers
```

This is a house rule informed by WCAG's stronger Focus Appearance guidance.  
https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html

Focus MUST NOT be removed for aesthetic reasons.

---

## 7.3 Skip links

Long application shells SHOULD provide a **Skip to main content** mechanism.

The skip link SHOULD:

- be the first or one of the first focusable elements;
- become visible on focus;
- move focus to the intended content region.

GOV.UK treats skip links as a standard accessibility component.  
https://design-system.service.gov.uk/components/skip-link/

---

## 7.4 Landmarks

Design specifications SHOULD identify page regions such as:

- header/banner;
- primary navigation;
- main;
- search;
- complementary;
- footer/contentinfo.

WAI notes that landmark regions help assistive-technology users understand and navigate page structure and can serve as skip-link destinations.  
https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/

Repeated landmarks such as multiple navigation regions MUST have distinguishable names.

### Do / Don't

| Do | Don't |
|---|---|
| Design an explicit focus state | Hide browser focus rings |
| Keep focus sequence aligned to task order | Use visual CSS ordering that scrambles Tab order |
| Include skip navigation for large shells | Force users through global navigation every time |
| Identify page landmarks | Wrap every card in a landmark |
| Keep focused content clear of sticky UI | Let sticky banners cover keyboard focus |

## Anti-patterns

- focus invisible on dark background;
- modal closes and focus disappears;
- tab order follows CSS column source rather than visual workflow;
- entire page constructed from unlabeled `region` landmarks.

## Checklist

- [ ] Full task is keyboard-operable.
- [ ] No keyboard trap exists.
- [ ] Focus order is logical.
- [ ] Focus indicator is obvious.
- [ ] Focus cannot be obscured.
- [ ] Skip link exists where needed.
- [ ] Landmark structure is specified.

## Canonical summary

**Keyboard focus is the user's cursor. It MUST never become invisible, lost, or unpredictably relocated.**

---

# 8. Operability — Time Limits, Sessions and Authentication

## Purpose

Avoid excluding users who require additional time to read, understand, enter, or verify information.

## Rules

Where a product imposes time limits, WCAG requires users to be able to turn off, adjust, or extend them except for specific exceptions.  
https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html

### Session expiry

Before expiring a session that could lose meaningful work, the interface SHOULD:

1. warn before expiry;
2. state remaining time;
3. provide a simple **Stay signed in** or extension action;
4. preserve draft work where security requirements allow;
5. explain what happens on expiry.

Security policy may legitimately constrain extension, but expiry MUST NOT arrive without understandable feedback where warning is possible.

### Authentication

WCAG 2.2 Accessible Authentication (Minimum) reduces reliance on cognitive function tests during authentication and permits mechanisms such as password managers and copy/paste.  
https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html

Products MUST NOT disable paste into passwords or one-time-code fields without an extraordinary security justification.

### Do / Don't

| Do | Don't |
|---|---|
| Warn before session expiry | Log users out with no warning |
| Offer extension in one action | Require re-entry of the whole form |
| Preserve safe draft state | Delete work automatically |
| Support password managers/paste | Block clipboard use reflexively |
| Separate security need from arbitrary timer | Add timers to create urgency |

## Anti-patterns

- 30-second confirmation that disappears;
- session timer only visible in screen-reader-inaccessible tooltip;
- blocking password managers;
- CAPTCHA that depends solely on memory/puzzle solving without accessible alternative.

## Checklist

- [ ] Time limit justified.
- [ ] Extension path exists where applicable.
- [ ] Expiry consequence is stated.
- [ ] User work is protected where possible.
- [ ] Authentication supports assistive mechanisms.

## Canonical summary

**Users needing more time MUST NOT be treated as abnormal behavior.**

---

# 9. Cognition — Comprehension and Complexity

## Purpose

Reduce avoidable cognitive load, memory burden, and decision ambiguity.

## Rules

### 9.1 Plain language

Content SHOULD use:

- familiar words;
- short sentences;
- concrete verbs;
- direct action labels.

Domain terminology SHOULD be retained when users know it, with explanation where necessary.

Prefer:

> Delete survey

to:

> Initiate record-removal operation

---

## 9.2 Chunking

Long content MUST be divided into meaningful sections.

Use:

- headings;
- lists where structurally appropriate;
- progressive disclosure;
- related field groups;
- task stages.

Do not use accordion structures merely to make dense content look shorter.

---

## 9.3 One primary action

**House standard:** a normal task view SHOULD communicate one dominant next action.

Secondary actions MAY exist, but should not compete with the primary CTA.

Exceptions include expert tools where no action is naturally primary.

---

## 9.4 Consistent placement

Repeated help, navigation, support, and actions SHOULD remain in predictable locations.

WCAG 2.2 specifically introduces **Consistent Help** to reduce the burden of locating assistance repeatedly.  
https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html

---

## 9.5 Memory offloading

Interfaces SHOULD display information instead of requiring users to remember it.

Examples:

- retain values from prior step;
- show selected filters;
- show source record while editing;
- display password requirements while creating password;
- show recent values;
- provide review screens.

WCAG 2.2 Redundant Entry similarly requires previously entered information within a process not to be unnecessarily re-entered except where required.  
https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html

---

## 9.6 Progress and completion

Long processes SHOULD answer:

- Where am I?
- What remains?
- Has my work been saved?
- Am I finished?

Completion cues MUST distinguish:

```text id="oza5y7"
Saved
Submitted
Published
Processing
Complete
```

These are not interchangeable.

### Do / Don't

| Do | Don't |
|---|---|
| Use plain, specific labels | Use internal system terminology |
| Show information users need | Force memory across steps |
| Keep repeated controls predictable | Move actions for novelty |
| Chunk by user concept | Create arbitrary accordion sections |
| Tell users when a task is complete | Leave them guessing after submit |

## Anti-patterns

- multiple equally styled “primary” buttons;
- hidden state users must remember;
- changing terminology between screens;
- long instructions before every simple action;
- completion signaled only by disappearance of the form.

## Checklist

- [ ] Language is direct.
- [ ] Content is chunked.
- [ ] Dominant action is identifiable.
- [ ] Repeated patterns stay consistent.
- [ ] Users do not re-enter known information unnecessarily.
- [ ] Progress and completion are explicit.

## Canonical summary

**The interface SHOULD carry memory and structure so the user does not have to.**

---

# 10. Cognition — Error Prevention, Recovery and Undo

## Purpose

Reduce the consequences of mistakes without burdening users with constant defensive confirmation.

## Rules

### Error prevention

The interface SHOULD constrain invalid states before they become errors when this does not interfere with normal entry.

Examples:

- unavailable date disabled;
- units visible;
- impossible ranges rejected;
- destructive control visually separated.

### Undo before confirmation

For reversible low/medium-risk actions, **undo SHOULD be preferred over confirmation**.

Example:

```text id="trp8ec"
Message archived. Undo
```

is usually better than:

> Archive this message? Are you sure?

Confirmation SHOULD be reserved for actions where:

- consequences are hard to reverse;
- cost is substantial;
- security/safety is affected;
- legal or financial commitment is material.

WAI recommends confirmation and undo mechanisms for important or irreversible data operations.  
https://www.w3.org/WAI/tutorials/forms/validation/

### Errors

Errors MUST explain:

- what happened;
- where;
- how to correct it.

Do not merely announce failure.

### Do / Don't

| Do | Don't |
|---|---|
| Prefer reversible actions | Confirm every trivial action |
| Explain recovery | Say only “Invalid” |
| Preserve entered values | Clear the form after error |
| Prevent impossible selections | Wait for submit to reject obviously impossible states |
| Confirm genuinely irreversible work | Rely on “Are you sure?” for every delete |

## Anti-patterns

- confirmation fatigue;
- destructive action beside safe actions with no distinction;
- error recovery that requires starting over;
- undo toast disappearing too quickly to use.

## Checklist

- [ ] Preventable errors are prevented.
- [ ] Undo considered before confirmation.
- [ ] Irreversible actions receive proportionate protection.
- [ ] Input survives recoverable failure.
- [ ] Error explains correction.

## Canonical summary

**Accessible error prevention reduces consequence, not merely the probability of making a mistake.**

---

# 11. Assistive Technology — Labels and Descriptions

## Purpose

Design UI copy and structure so nonvisual interfaces expose the same task meaning as the visible product.

## Rules

### Accessible name

Every interactive control MUST have a meaningful name.

Whenever practical, the **visible label SHOULD be the accessible name source**.

WCAG Label in Name requires visible control text to be contained in its accessible name, supporting speech-input users who identify controls by what they see.  
https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html

Good:

```text id="xuc847"
Visible: Save changes
Accessible name: Save changes
```

Bad:

```text id="5gvnmh"
Visible: Save
Accessible name: Submit record mutation
```

### Descriptions

Descriptions SHOULD add information rather than restate the label.

```text id="df4v7w"
Label: Search radius
Description: Maximum distance from the selected location.
```

Avoid:

```text id="qftc9v"
Label: Search radius
Description: Enter search radius.
```

WAI APG emphasizes accessible names and descriptions as fundamental author responsibilities.  
https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/

### Icon controls

Icon-only controls MUST have an authored name:

```text id="dpgdrk"
Close dialog
Remove Wetland
Zoom in
Open filters
```

Not:

```text id="lup1qz"
X
button
icon
```

### Do / Don't

| Do | Don't |
|---|---|
| Make visible and spoken names align | Give screen readers unrelated technical labels |
| Name icon buttons by action | Use icon filename as label |
| Add descriptions only when useful | Duplicate label verbatim |
| Include object context in repeated actions | Label every row action just “Delete” |

## Anti-patterns

- `aria-label` chosen later by engineers because no content spec exists;
- identical unlabeled icon buttons;
- visually hidden text contradicting visible wording.

## Checklist

- [ ] Every control has authored accessible name.
- [ ] Visible and accessible names align.
- [ ] Repeated controls include context.
- [ ] Descriptions add information.
- [ ] Icons are not expected to self-describe.

## Canonical summary

**If a designer cannot state what a control should be called aloud, its design is incomplete.**

---

# 12. Assistive Technology — Dynamic Content and Live Regions

## Purpose

Ensure asynchronous interfaces communicate meaningful changes without overwhelming screen-reader users.

## Rules

Dynamic changes SHOULD be announced when users need to know about them to understand task state.

Examples:

- save failed;
- upload completed;
- search result count updated after explicit query;
- background operation finished;
- validation message appeared.

### Politeness

**Polite** announcements SHOULD be the default.

Assertive interruption SHOULD be reserved for truly urgent state.

### Avoid announcement spam

Do not announce:

- every progress percentage;
- every character entered;
- every keystroke-driven filter result;
- decorative loading changes;
- repeated identical status.

Batch rapidly changing information.

Example:

Prefer:

> 24 results found.

over announcements for 1, 2, 3 … 24.

W3C provides ARIA live-region techniques for communicating dynamic errors and status changes.  
https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA19

### Toasts

Visual toast appearance MUST NOT automatically imply that focus moves to the toast.

Transient status should normally be announced without stealing focus.

### Do / Don't

| Do | Don't |
|---|---|
| Announce important asynchronous state | Announce every UI mutation |
| Use polite announcements by default | Use assertive for routine success |
| Collapse repeated updates | Read every progress increment |
| Keep keyboard focus stable | Move focus to every toast |

## Anti-patterns

- live region around entire application;
- loading animation repeatedly announced;
- auto-focus used instead of an appropriate status announcement;
- simultaneous toast + modal + live alert for same event.

## Checklist

- [ ] Dynamic information requiring awareness is identified.
- [ ] Announcement urgency matches state.
- [ ] Repeated messages are suppressed.
- [ ] Focus is not stolen unnecessarily.
- [ ] Visual and AT feedback describe the same state.

## Canonical summary

**Assistive feedback SHOULD announce meaningful state transitions, not narrate the DOM.**

---

# 13. Assistive Technology — Complex Widgets, Tables, Maps and Canvas

## Purpose

Ensure rich product interfaces expose equivalent structure and operations outside their visual rendering.

## Rules

## 13.1 Complex widgets

For custom widgets, design specifications MUST include:

- semantic role/pattern;
- accessible name;
- states;
- keyboard model;
- focus entry;
- focus exit;
- selection behavior;
- announcement behavior where relevant.

Relevant WAI ARIA Authoring Practices patterns SHOULD be used rather than inventing keyboard conventions.  
https://www.w3.org/WAI/ARIA/apg/

Examples:

- dialog;
- tabs;
- combobox;
- tree;
- menu;
- grid;
- listbox.

---

## 13.2 Tables

Actual tabular data MUST use a table model.

Designs SHOULD specify:

- caption/title;
- column headings;
- row headings where meaningful;
- sorting state;
- selection behavior;
- expandable details.

Do not turn a visual layout grid into a data table purely because it has columns.

W3C identifies semantic table markup as the appropriate mechanism for tabular information.  
https://www.w3.org/WAI/WCAG22/Techniques/html/H51

---

## 13.3 Maps

A map MUST NOT be the only path to information or task completion where users need exact locations, records, or controls.

Provide one or more equivalent representations:

- searchable location list;
- data table;
- coordinate entry;
- ordered results list;
- textual summary;
- keyboard-operable zoom/pan alternatives.

For map-selected geometry, expose underlying:

- coordinates;
- object name;
- area/measurement where appropriate.

---

## 13.4 Canvas/WebGL

Canvas visualization MUST provide semantic alternatives for meaningful data.

A generic alt label such as:

> Interactive chart

is insufficient if the chart is central to the task.

Equivalent access MAY require:

- summary;
- data table;
- structured list;
- controls external to canvas;
- downloadable accessible data.

### Do / Don't

| Do | Don't |
|---|---|
| Specify keyboard model with custom widgets | Invent arrow-key behavior ad hoc |
| Use semantic tables for real tables | Build critical tables as canvas pixels |
| Pair maps with lists/data | Make map interaction the only route |
| Provide structured chart data | Rely on a one-sentence canvas alt text |
| Name states like selected/expanded | Encode state only visually |

## Anti-patterns

- clickable `<div>` interaction design with no semantic pattern;
- grid navigation copied from spreadsheet behavior without specifying focus;
- canvas chart accessible only through image alt text;
- inaccessible map required to select service location.

## Checklist

- [ ] Widget pattern identified.
- [ ] Keyboard behavior documented.
- [ ] Table semantics match data.
- [ ] Map has equivalent non-map task path.
- [ ] Canvas data has structured equivalent.
- [ ] Selection/state is available nonvisually.

## Canonical summary

**Complex visualization is not exempt from accessibility; it requires an equivalent information and interaction model.**

---

# 14. Input Modality Diversity

## Purpose

Ensure users can operate the product through the input methods available to them.

## Rules

Design review MUST consider at least:

- touch;
- mouse/trackpad;
- pen;
- keyboard only;
- switch access;
- voice control;
- screen reader;
- screen magnification.

No essential task SHOULD assume one modality.

### Touch

Provide large targets, no hover dependency, and gesture alternatives.

### Mouse

Hover MAY reveal enhancement but MUST NOT be required for essential actions.

### Pen

Do not require pressure, tilt, or handwriting when simpler controls can perform the task.

### Keyboard

All actions require keyboard-equivalent operation.

### Switch access

Keep focus order manageable and avoid forcing users through dozens of irrelevant controls.

### Voice

Visible labels SHOULD be short, distinctive, and aligned with accessible names.

Avoid several visible controls all named:

```text id="slhmw5"
More
More
More
```

when voice users cannot easily distinguish them.

### Magnification

Interfaces MUST work when only a small portion of the screen is visible.

Important consequences:

- keep error near control;
- avoid distant detached buttons;
- do not move focus unexpectedly;
- ensure sticky UI does not cover focus;
- preserve reflow.

### Do / Don't

| Do | Don't |
|---|---|
| Design every core action for multiple modalities | Treat touch as the universal fallback |
| Align visible labels with voice names | Give five actions the visible label “More” |
| Keep focus order compact | Require switch users to traverse decorative controls |
| Place feedback near its source | Put errors only at top of long page |
| Make hover enhancements optional | Hide critical controls until hover |

## Anti-patterns

- mouse-only drag;
- hidden hover actions;
- keyboard shortcut with no visible command;
- 100-item focus sequence through decorative regions.

## Checklist

- [ ] Touch works.
- [ ] Mouse works without precision dependency.
- [ ] Keyboard-only task succeeds.
- [ ] Switch traversal is feasible.
- [ ] Voice labels are distinct.
- [ ] Magnified workflow remains coherent.
- [ ] Pen-specific gestures have alternatives.

## Canonical summary

**The product MUST respond to user intent, not demand a particular physical input method.**

---

# 15. Inclusive Representation

## Purpose

Represent people and cultures without assuming one identity, household, naming convention, age, gender, body type, or cultural norm.

## Rules

### Imagery

Product imagery SHOULD represent genuine human variety without turning difference into decoration.

Avoid associating demographic appearance with:

- technical ability;
- seniority;
- occupation;
- wealth;
- trustworthiness;
- authority.

Representation SHOULD include variation in:

- age;
- skin tone;
- visible/nonvisible disability context where relevant;
- family structure;
- gender presentation;
- clothing;
- body type.

Do not force every illustration to depict diversity symbolically.

---

## 15.1 Names

Example data MUST NOT assume every user has a Western first-name/surname structure.

Where product requirements do not genuinely need name components, prefer:

```text id="w73w98"
Full name
```

to mandatory:

```text id="qxljz2"
First name
Last name
```

Internationalization requirements include variation in people's names, addresses, and cultural conventions.  
https://www.w3.org/International/i18n-drafts/nav/about

---

## 15.2 Malaysian and South-East Asian contexts

For products used in Malaysia or the wider region, test example content against real regional structures.

Designers SHOULD account for:

- Malay naming structures;
- Chinese Malaysian names;
- Indian Malaysian names;
- Sabah/Sarawak and indigenous naming patterns;
- multilingual addresses;
- honorifics only when required;
- names that do not map cleanly to given-name/family-name assumptions.

Do not infer:

- ethnicity from a name;
- religion from clothing;
- marital status from title;
- language preference from ethnicity.

A Malaysian product SHOULD feel locally competent without reducing Malaysia to flags, batik motifs, food imagery, or stereotyped cultural symbols.

---

## 15.3 Gender and age

Ask gender, sex, age, title, or marital status only when product requirements actually need them.

Options SHOULD reflect the actual domain requirement.

Do not add demographic fields merely for personalization.

### Do / Don't

| Do | Don't |
|---|---|
| Use realistic regional names and formats | Fill every demo with Western names |
| Represent variety naturally | Tokenize one “diverse” person per illustration |
| Ask identity data only when needed | Collect gender/title by habit |
| Use neutral role language | Default unknown users to “he” |
| Test regional naming conventions | Force every name into first/last name fields |

## Anti-patterns

- stereotyped cultural clothing as shorthand for nationality;
- demographic identity used to signal occupation;
- assuming all Malaysian users prefer the same language;
- “Mr/Mrs” required when no legal purpose exists.

## Checklist

- [ ] Example data reflects intended audience.
- [ ] Naming assumptions reviewed.
- [ ] Identity questions are necessary.
- [ ] Imagery avoids stereotypes.
- [ ] Role copy is gender-neutral where possible.
- [ ] Regional representation is contextual, not decorative.

## Canonical summary

**Inclusive representation means designing for real human variation without turning identity into a visual trope or data-model shortcut.**

---

# 16. Language and Localization

## Purpose

Ensure interface structure remains understandable when language, script, direction, grammar, and formatting change.

W3C Internationalization guidance emphasizes language identification, flexible layout, directionality, names/addresses, dates, numbers, currencies, and script-specific behavior.  
https://www.w3.org/International/techniques/authoring-html  
https://www.w3.org/International/i18n-drafts/nav/about

## Rules

## 16.1 Do not concatenate sentences

Localization MUST operate on complete translatable messages.

Avoid constructing:

```text id="4n5brt"
"You have " + count + " files"
```

where grammar assumes English structure.

---

## 16.2 Text expansion

Layouts MUST remain flexible.

The following are **house localization stress-test budgets**, not universal linguistic rules:

```text id="y5yj6x"
normal UI string         +40% width expansion
short labels/buttons     up to +100% stress case
headings                 multiline wrapping expected
```

Critical components MUST NOT depend on fixed English string width.

Text expansion varies dramatically by language and source-string length; short English labels may expand much more proportionally.

---

## 16.3 RTL

RTL interfaces SHOULD mirror the spatial flow of UI where appropriate.

Typically mirror:

- page layout;
- navigation direction;
- directional arrows indicating spatial movement;
- forward/back relationships.

Typically do **not** blindly mirror:

- logos;
- photographs;
- charts whose axes have semantic direction;
- media play symbols where platform convention says otherwise;
- numbers;
- user-generated LTR text.

Mixed-direction content MUST be anticipated.

---

## 16.4 CJK

Chinese, Japanese, and Korean layouts MUST NOT assume Western word spaces or manually inserted line breaks.

Allow script-appropriate line breaking.

Avoid fixed-height text blocks based on English line count.

Font fallback MUST include appropriate glyph coverage.

---

## 16.5 Dates and time

Do not hardcode:

```text id="26qomj"
09/10/26
```

where the order is ambiguous.

Use locale-aware display and clear formats for consequential dates.

Example:

```text id="hhkgwh"
23 September 2026
23 Sep 2026
2026-09-23
```

depending context.

Timezones MUST be shown where users could interpret the same time differently.

---

## 16.6 Numbers

Number formatting MUST respect locale conventions.

The UI model MUST distinguish presentation from canonical numeric storage.

---

## 16.7 Currency

Currency MUST be unambiguous where symbols overlap.

Prefer:

```text id="kqhfh6"
MYR 120.00
USD 120.00
SGD 120.00
```

when `$` or another symbol could confuse international audiences.

---

## 16.8 Language selector

Language selectors SHOULD use language names, not national flags.

Example:

```text id="zr0hng"
Bahasa Melayu
English
中文
தமிழ்
```

A flag represents a country, not a language.

---

## 16.9 Dual-language interfaces

A dual-language interface MAY be justified in regulated, public-service, educational, or transitional contexts.

However, duplicated side-by-side text can significantly increase cognitive and visual density.

When two languages must appear simultaneously:

- establish a consistent primary/secondary language order;
- visually group translations;
- avoid mixing languages within a sentence;
- preserve adequate line height;
- ensure controls remain clearly associated with both labels.

For ordinary applications, a persistent language switcher is often preferable to duplicating every UI string.

### Do / Don't

| Do | Don't |
|---|---|
| Let translated text expand | Fix controls to English width |
| Mirror RTL spatial structure intentionally | Apply `transform: scaleX(-1)` to entire app |
| Use locale-aware date/number/currency formats | Hardcode `MM/DD/YYYY` globally |
| Let CJK text wrap naturally | Insert manual line breaks for English |
| Label languages by their names | Use flags as language selectors |

## Anti-patterns

- truncated German/French labels because English fit;
- fixed 32 px button height clipping CJK;
- bilingual controls where translation is visually detached;
- hard-coded dollar symbol;
- unsupported mixed Arabic/Latin direction.

## Checklist

- [ ] +40% text expansion stress test passes.
- [ ] Short labels survive larger expansion.
- [ ] RTL behavior explicitly designed.
- [ ] CJK wrapping tested.
- [ ] Locale formats are not hard-coded.
- [ ] Currency is unambiguous.
- [ ] Language selector avoids flags.
- [ ] Dual-language layout has intentional hierarchy.

## Canonical summary

**Localization changes layout, direction, grammar, and data presentation—not merely strings.**

---

# 17. High-contrast, Dark-mode and User Preference Design

## Purpose

Allow system and user accessibility preferences to modify presentation without losing meaning.

## Rules

The design-token system MUST support semantic remapping rather than fixed component colors.

Accessibility-related preferences SHOULD include where platform support exists:

- light/dark;
- increased contrast;
- reduced transparency;
- reduced motion;
- larger text.

Design specs MUST NOT assume:

```text id="eucrae"
white background
black border
blue link
```

as immutable rendering.

Instead define semantic purpose:

```text id="6jxjus"
surface
content
interactive
focus
selected
destructive
disabled
```

Icons that disappear under forced-colour modes require a robust fallback.

### Do / Don't

| Do | Don't |
|---|---|
| Build from semantic tokens | Hardcode meaningful colour values in illustrations |
| Test theme combinations | Assume dark mode is accessibility mode |
| Preserve state under forced colours | Use background tint as sole selected state |
| Respect OS preference | Override user's contrast preference for branding |

## Anti-patterns

- theme-specific screenshots as sole instructions;
- disabled state defined only by opacity;
- focus ring disappearing in high-contrast mode.

## Checklist

- [ ] Semantic token purpose is documented.
- [ ] Light/dark independently tested.
- [ ] High-contrast state remains understandable.
- [ ] User preferences do not erase critical state.
- [ ] Reduced-motion design exists.

## Canonical summary

**User preferences MAY change presentation; they MUST NOT change the availability of information.**

---

# 18. shadcn/ui Accessibility Design Baseline

## Purpose

Apply accessibility consistently when composing the chosen component baseline.

## Rules

shadcn/ui components SHOULD be used as the starting interaction primitives where applicable.  
https://ui.shadcn.com/docs/components

However, designers MUST still specify the content and interaction contract.

### Examples

**Dialog**
- title;
- accessible description if needed;
- initial focus;
- destructive/safe action;
- focus restoration.

**Tooltip**
- supplemental content only;
- no essential instructions.

**DropdownMenu / ContextMenu**
- logical groups;
- clear action names;
- destructive separation;
- alternative access for context-menu-only commands.

**Tabs**
- meaningful labels;
- selected state;
- clear content relationship.

**Form fields**
- persistent label;
- help text;
- error text;
- required/optional rule.

**Data Table**
- caption/context;
- column/row meaning;
- sorting and selection states.

A visually customized component MUST retain its accessibility behavior.

### Do / Don't

| Do | Don't |
|---|---|
| Start with established primitives | Invent a new combobox because it looks cleaner |
| Specify focus/error/disabled states | Provide only resting visual state |
| Preserve component behavior while styling | Remove focus outline to match mocks |
| Test composed patterns | Assume primitive accessibility guarantees whole-page accessibility |

## Anti-patterns

- shadcn component used with empty accessible name;
- modal inside modal without focus plan;
- icon button created without label spec;
- `Command` pattern used as arbitrary custom select without correct semantics.

## Checklist

- [ ] Correct component selected.
- [ ] Accessible state specs present.
- [ ] Keyboard behavior preserved.
- [ ] Styling does not remove semantic cues.
- [ ] Composite interaction reviewed.

## Canonical summary

**A good primitive reduces accessibility risk; it does not remove design responsibility.**

---

# 19. Inclusive Design Review Process

## Purpose

Move accessibility from ad hoc audit to repeatable product practice.

## Rules

Accessibility review MUST happen at multiple stages.

### Stage 1 — discovery

Identify:

- disability-related barriers;
- high-risk workflows;
- high-volume interactions;
- legal/procurement scope;
- localization scope.

### Stage 2 — interaction design

Review:

- task structure;
- focus sequence;
- keyboard model;
- gesture alternatives;
- time limits;
- cognitive complexity.

### Stage 3 — visual design

Review:

- contrast;
- type size;
- focus appearance;
- target size;
- color independence;
- zoom/reflow resilience.

### Stage 4 — prototype

Test:

- keyboard-only path;
- screen magnification behavior;
- motion preferences;
- touch;
- localized copy.

### Stage 5 — implementation validation

Engineering and design MUST jointly verify that implementation matches accessible interaction intent.

### Stage 6 — post-release

Accessibility defects MUST enter the ordinary defect backlog with severity and ownership.

They MUST NOT be held indefinitely in a separate “accessibility someday” list.

### Do / Don't

| Do | Don't |
|---|---|
| Review accessibility at each design phase | Wait for annual audit |
| Put defects in normal delivery system | Maintain a separate low-priority accessibility backlog |
| Test whole workflows | Test only component Storybook examples |
| Make accessibility acceptance criteria explicit | Rely on verbal intent |

## Anti-patterns

- accessibility review after development freeze;
- automated scan treated as full accessibility test;
- defect ownership assigned only to accessibility specialist.

## Checklist

- [ ] Discovery review completed.
- [ ] Interaction review completed.
- [ ] Visual review completed.
- [ ] Prototype review completed.
- [ ] Implementation review planned.
- [ ] Post-release owner identified.

## Canonical summary

**Accessibility quality improves when it is part of the delivery process, not an external inspection event.**

---

# 20. Assistive Technology Testing

## Purpose

Validate actual usability beyond static WCAG interpretation.

## Rules

Critical workflows SHOULD be tested with representative assistive-technology combinations.

A practical web test matrix SHOULD include as relevant:

```text id="9cxrcr"
Keyboard only
NVDA + Chromium/Firefox on Windows
VoiceOver + Safari on macOS
VoiceOver on iOS
TalkBack on Android
Browser zoom 200% and 400%
Windows High Contrast / forced colours
Reduced motion
```

Exact combinations SHOULD follow the supported-product/browser matrix.

Testing MUST prioritize user tasks:

- sign in;
- navigation;
- form completion;
- search/filter;
- create/edit/delete;
- data table use;
- upload;
- map/data visualization where applicable.

Screen-reader testing MUST NOT consist only of reading a page top-to-bottom.

Test:

- headings navigation;
- landmark navigation;
- forms mode;
- errors;
- dialogs;
- state changes;
- live content;
- data structures.

### Do / Don't

| Do | Don't |
|---|---|
| Test real workflows | Test only homepage |
| Use multiple AT/platform combinations | Assume one screen reader represents all |
| Include zoom and high contrast | Treat screen reader as the whole discipline |
| Test asynchronous state | Test only static content |

## Anti-patterns

- “works with VoiceOver” based on one button;
- browser extension score treated as user testing;
- testing only at default zoom.

## Checklist

- [ ] Keyboard-only workflow completed.
- [ ] Primary supported screen-reader combinations tested.
- [ ] Mobile AT tested where relevant.
- [ ] Zoom/high contrast tested.
- [ ] Motion preference tested.
- [ ] Dynamic state tested.

## Canonical summary

**Automated checks find code patterns; assistive-technology testing finds product barriers.**

---

# 21. Inclusive User Research and Panels

## Purpose

Include disabled people in product evaluation instead of designing entirely through proxy.

## Rules

Research SHOULD include people who use a range of access strategies.

Depending on product scope, recruit users with experience of:

- screen readers;
- magnification;
- keyboard-only operation;
- switch/alternative input;
- cognitive or learning disabilities;
- reduced motion needs;
- hearing-related accessibility features.

One participant MUST NOT be treated as representative of an entire disability category.

Participants SHOULD be compensated consistently with other specialist research contributors.

Sessions MUST allow participants to use their own:

- devices;
- browser;
- AT;
- preferences

where practical.

Research scripts SHOULD test actual product goals rather than ask:

> Is this accessible?

Ask users to perform the task.

### Do / Don't

| Do | Don't |
|---|---|
| Recruit for varied access strategies | Ask one blind tester to represent accessibility |
| Test real work | Ask abstract preference questions only |
| Allow personal AT setup | Force every participant onto lab defaults |
| Pay disabled participants appropriately | Treat participation as charitable feedback |

## Anti-patterns

- accessibility testing exclusively by nondisabled experts;
- recruiting only employees;
- one-off disability research before launch with no follow-up.

## Checklist

- [ ] Relevant user groups identified.
- [ ] Access needs captured before sessions.
- [ ] Tasks reflect real product workflows.
- [ ] Participants can use familiar technology.
- [ ] Findings feed the normal product backlog.

## Canonical summary

**Inclusive design is stronger when people affected by barriers participate in finding them.**

---

# 22. Accessibility Defect Severity Model

## Purpose

Prioritize barriers according to user impact rather than cosmetic visibility.

## Rules

Accessibility defects MUST be triaged through the normal product severity system.

### Severity 0 — Critical blocker

Examples:

- critical task completely impossible for affected users;
- keyboard trap;
- authentication impossible with supported AT;
- inaccessible security/safety decision;
- content capable of causing serious flashing risk.

Expected response: release blocker or emergency remediation.

### Severity 1 — Major

Examples:

- core task cannot be completed with one major modality;
- form labels missing across key workflow;
- modal unusable with screen reader;
- large region inaccessible under 400% zoom.

Expected response: highest normal defect priority.

### Severity 2 — Moderate

Examples:

- task is possible but requires significant workaround;
- incorrect focus restoration;
- secondary visualization lacks adequate alternative;
- touch targets routinely below house target but still meet technical floor.

### Severity 3 — Minor

Examples:

- isolated redundant announcement;
- nonessential decorative alt issue;
- local focus styling inconsistency without loss of visibility.

### Rules for severity

Severity MUST consider:

```text id="o9fw0r"
task criticality
× barrier magnitude
× frequency
× affected population
× availability/quality of workaround
```

WCAG level alone MUST NOT determine defect severity.

An A-level failure can be low-volume; an AA usability issue can completely block a critical task.

### Do / Don't

| Do | Don't |
|---|---|
| Rank by user/task impact | Rank only by WCAG A/AA/AAA |
| Treat blockers as release risks | Put all accessibility issues at one severity |
| Record workaround quality | Assume workaround means low impact |
| Include frequency/scope | Use visual prominence as severity |

## Anti-patterns

- every accessibility issue labeled “medium”;
- closing defect because one obscure workaround exists;
- severity reduced because “only keyboard users” are affected.

## Checklist

- [ ] Task impact evaluated.
- [ ] Scope evaluated.
- [ ] Workaround evaluated.
- [ ] Affected modalities identified.
- [ ] Release-blocking criteria applied consistently.

## Canonical summary

**Accessibility defect severity measures exclusion from the task, not how noticeable the bug looks.**

---

# 23. Pattern Review Matrix

## Purpose

Provide a compact per-pattern reference.

## Rules

| Pattern | Do | Don't |
|---|---|---|
| Colour/status | Use text + icon/shape | Use colour only |
| Text | Allow wrap, zoom, user overrides | Fix heights to English copy |
| Motion | Provide reduced/static path | Force parallax/zoom |
| Targets | Aim for 44 px touch areas | Design tiny icon hitboxes |
| Gesture | Provide button/command alternative | Require swipe/pinch/drag |
| Focus | Use clear persistent focus | Remove outline |
| Navigation | Use logical order/landmarks | Reorder visually against focus order |
| Timeout | Warn and extend | Surprise-expire work |
| Plain language | Use specific verbs | Use internal jargon |
| Errors | Explain recovery | Blame user or say only “Invalid” |
| Labels | Align visible/accessible names | Invent separate SR vocabulary |
| Dynamic status | Announce meaningful changes | Announce every mutation |
| Tables | Preserve data semantics | Render semantic data as layout-only divs |
| Maps | Add list/table/coordinate path | Make map the sole workflow |
| Localization | Design flexible layout | Hardcode English dimensions |
| Representation | Model real human diversity | Encode stereotypes |
| AT testing | Test tasks | Depend on scanner score |
| Research | Include disabled users | Treat one user as representative |

## Anti-patterns

Any repeated failure in this matrix SHOULD be treated as a design-system problem rather than a one-screen defect.

## Checklist

- [ ] Pattern review matrix applied to feature.
- [ ] Systemic failures escalated to component/design-system ownership.

## Canonical summary

**Recurring accessibility barriers should be fixed once in the system, not repeatedly in feature teams.**

---

# 24. Inclusive Design Review Checklist

## Purpose

Provide the mandatory design-side sign-off checklist.

## Perception

- [ ] Normal text meets 4.5:1 minimum.
- [ ] Large text meets 3:1 minimum.
- [ ] Essential UI graphics/states meet 3:1 non-text contrast.
- [ ] Colour never carries meaning alone.
- [ ] Charts include non-colour distinctions.
- [ ] Core body typography follows house size rules.
- [ ] Functional text avoids ultra-light weights.
- [ ] Text survives 200% enlargement.
- [ ] Applicable content survives 400% zoom/reflow.
- [ ] Text-spacing overrides do not break layout.
- [ ] Dark mode independently passes contrast review.
- [ ] High-contrast/forced-colour mode retains meaning.
- [ ] Reduced-motion design exists.
- [ ] Dangerous flashing has been excluded.

## Operability

- [ ] WCAG minimum target sizing is met.
- [ ] Primary touch targets aim for 44 × 44.
- [ ] Adjacent controls have sufficient separation.
- [ ] Pointer gestures have simple alternatives.
- [ ] Drag interactions have non-drag alternatives.
- [ ] Full task is keyboard accessible.
- [ ] Focus order is logical.
- [ ] Focus indicator is obvious.
- [ ] Focus cannot be obscured by sticky UI.
- [ ] Skip link exists where needed.
- [ ] Landmarks are specified.
- [ ] Timeouts are justified.
- [ ] Session expiry warning/extension is designed.
- [ ] Authentication supports password managers and paste.

## Cognition

- [ ] Plain language used.
- [ ] Long content is chunked.
- [ ] Primary action is visually understandable.
- [ ] Repeated controls remain in consistent locations.
- [ ] Previously entered information is reused where possible.
- [ ] Error prevention is built into controls.
- [ ] Undo is considered before confirmation.
- [ ] Progress is communicated.
- [ ] Completion state is explicit.
- [ ] Unnecessary complexity has been removed.

## Assistive technology

- [ ] Every control has an authored accessible name.
- [ ] Visible and spoken labels align.
- [ ] Descriptions add useful context.
- [ ] Icon-only controls are named.
- [ ] Important asynchronous states are identified for announcement.
- [ ] Live updates will not produce announcement spam.
- [ ] Complex widget pattern and keyboard model are specified.
- [ ] Tables have semantic structure.
- [ ] Maps have equivalent non-map paths.
- [ ] Canvas/visualizations have structured alternatives.

## Input modalities

- [ ] Touch works.
- [ ] Mouse works without hover dependency.
- [ ] Pen does not require precision features unnecessarily.
- [ ] Keyboard-only task succeeds.
- [ ] Switch focus sequence is practical.
- [ ] Voice-control labels are distinctive.
- [ ] Magnification workflow remains coherent.

## Representation

- [ ] Imagery avoids stereotypes.
- [ ] Example data reflects intended audiences.
- [ ] Regional names and addresses have been tested.
- [ ] Identity fields are actually required.
- [ ] Gender-neutral language is used where possible.
- [ ] Malaysian/SEA context is represented without cultural shorthand.

## Localization

- [ ] Language expansion stress testing completed.
- [ ] RTL layout defined where supported.
- [ ] Directional icons reviewed.
- [ ] CJK wrapping works.
- [ ] Dates are locale-aware.
- [ ] Numbers are locale-aware.
- [ ] Currency is unambiguous.
- [ ] Timezones appear where necessary.
- [ ] Language selector uses language names, not flags.
- [ ] Dual-language hierarchy is intentional.

## Process

- [ ] Accessibility reviewed before visual sign-off.
- [ ] Prototype has keyboard review.
- [ ] Required AT matrix identified.
- [ ] Disabled-user research is planned for high-risk workflows.
- [ ] Defect severity model is applied.
- [ ] Legal/procurement baseline is documented.

## Canonical summary

**A design is not accessibility-ready until perception, operation, cognition, assistive technology, localization, and human diversity have all been reviewed.**

---

# 25. Gold Standard Summary

A Gold Standard accessible and inclusive product in 2026:

- targets WCAG 2.2 AA as its technical baseline;
- treats accessibility as product design rather than remediation;
- provides sufficient text and non-text contrast;
- never relies on colour alone;
- uses scalable, robust typography;
- survives zoom, text resizing, and user spacing overrides;
- supports reduced motion and vestibular safety;
- uses generous touch targets;
- provides alternatives to gestures and dragging;
- is fully keyboard-operable;
- keeps focus visible and unobscured;
- provides skip navigation and meaningful landmarks;
- allows sufficient time and protects users from avoidable session loss;
- minimizes unnecessary cognitive load and repeated data entry;
- favors reversible actions over confirmation fatigue;
- defines accessible labels before implementation;
- handles dynamic announcements deliberately;
- provides semantic equivalents for tables, charts, maps, and canvas content;
- works with touch, mouse, pen, keyboard, switch, voice, screen readers, and magnification;
- represents human and cultural diversity without stereotypes;
- supports Malaysian and South-East Asian naming and language realities as well as international users;
- treats RTL, CJK, expansion, numbers, currencies, dates, and timezones as layout concerns rather than translation cleanup;
- includes disabled people in user research;
- tests real tasks with assistive technologies;
- prioritizes accessibility defects according to actual exclusion;
- uses shadcn/ui as a component baseline without treating component provenance as proof of conformance;
- keeps legal compliance, technical conformance, and inclusive usability distinct but aligned.

The canonical principle is:

> **Design so that differences in vision, hearing, movement, cognition, language, culture, device, or input method do not unnecessarily become differences in access to the product.**

---

# Sources

1. **W3C Web Accessibility Initiative — WCAG 2.2 Understanding Documents**  
   https://www.w3.org/WAI/WCAG22/Understanding/

2. **W3C WAI — WCAG 2 Overview**  
   https://www.w3.org/WAI/standards-guidelines/wcag/

3. **W3C WAI — Contrast (Minimum)**  
   https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

4. **W3C WAI — Non-text Contrast**  
   https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html

5. **W3C WAI — Use of Color**  
   https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html

6. **W3C WAI — Resize Text**  
   https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html

7. **W3C WAI — Reflow**  
   https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

8. **W3C WAI — Text Spacing**  
   https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html

9. **W3C WAI — Target Size (Minimum)**  
   https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

10. **W3C WAI — Dragging Movements**  
    https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html

11. **W3C WAI — Keyboard**  
    https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html

12. **W3C WAI — Focus Visible**  
    https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html

13. **W3C WAI — Focus Not Obscured (Minimum)**  
    https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html

14. **W3C WAI — Accessible Authentication (Minimum)**  
    https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html

15. **W3C WAI — Consistent Help**  
    https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html

16. **W3C WAI — Redundant Entry**  
    https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html

17. **W3C WAI — ARIA Authoring Practices Guide**  
    https://www.w3.org/WAI/ARIA/apg/

18. **W3C WAI APG — Accessible Names and Descriptions**  
    https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/

19. **W3C WAI APG — Landmark Regions**  
    https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/

20. **W3C Internationalization — Authoring Web Pages**  
    https://www.w3.org/International/techniques/authoring-html

21. **W3C Internationalization — About Internationalization**  
    https://www.w3.org/International/i18n-drafts/nav/about

22. **Apple Human Interface Guidelines — Accessibility**  
    https://developer.apple.com/design/human-interface-guidelines/accessibility

23. **GOV.UK Design System — Skip Link**  
    https://design-system.service.gov.uk/components/skip-link/

24. **ETSI — EN 301 549 V4.1.1 (2026-09)**  
    https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf

25. **AccessibleEU — EN 301 549 update, September 2026**  
    https://accessible-eu-centre.ec.europa.eu/content-corner/news/european-accessibility-standard-en-301-549-has-been-updated-2026-09-07_en

26. **U.S. Department of Justice / ADA.gov — Title II Web and Mobile Accessibility Rule**  
    https://www.ada.gov/resources/2024-03-08-web-rule/

27. **Malaysia — Pekeliling Pendigitalan Perkhidmatan Awam Bilangan 1 Tahun 2025**  
    https://trglib.gov.my/index.php/muat-turun/category/1-pekeliling?download=92:pekeliling-pendigitan-perkhidmatan-awam-bil-1-tahun-2025

28. **shadcn/ui — Components**  
    https://ui.shadcn.com/docs/components

The numeric **44 px touch target, 16/14 px typography, +40% localization expansion, focus-ring, and similar thresholds** are explicitly framed as house design standards; the WCAG thresholds remain separately identified so teams can distinguish product policy from conformance requirements.
