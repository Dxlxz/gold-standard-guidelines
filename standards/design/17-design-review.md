---
id: "design-review"
title: "Design Review & Handoff"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "review", "handoff"]
applies_to: ["ui", "team"]
related: []
legacy_number: 91
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 42487
provenance: baseline

---

Below is the canonical standard in the requested corpus format.

# Design Review & Engineering Handoff — Gold Standard 2026

**Canonical placement:** Design System → Design Review → Documentation → Component  
**Status:** Canonical  
**Baseline component system:** shadcn/ui  
**Applies to:** Product design, design systems, frontend engineering, application engineering, QA, accessibility review, content design, and technical review

---

## 1. Purpose

Design review and engineering handoff exist to ensure that approved product design can be implemented **without ambiguity, silent interpretation, avoidable rework, or divergence from the design system**.

A design is not implementation-ready merely because its primary screen is visually complete. The handoff MUST define the intended system behaviour across layout, hierarchy, content, states, accessibility, tokens, responsive behaviour, component composition, data conditions, validation, permissions, errors, and interaction boundaries.

The review and handoff process MUST:

1. verify that the design is structurally and behaviourally complete;
2. confirm alignment with the Design System and engineering standards;
3. expose unresolved product, technical, accessibility, security, and data assumptions before implementation;
4. map design decisions to reusable tokens, components, patterns, and code contracts;
5. preserve traceability between the approved design and the released implementation;
6. establish controlled handling of design changes after implementation begins; and
7. require design QA before production release.

Design review MUST be treated as a **quality gate**, not as a presentation ceremony.

Engineering handoff MUST be treated as a **shared implementation contract**, not as a file transfer from Design to Engineering.

---

# 2. Rules

## 2.1 Scope and ownership

Every user-facing feature, significant component change, new interaction pattern, or material change to an existing flow MUST pass through the appropriate level of design review before implementation.

The review depth SHOULD be proportional to the impact of the change. Small token-compliant component changes MAY use a reduced review path. New flows, new primitives, new patterns, high-risk states, authentication or authorization experiences, destructive actions, sensitive data flows, and cross-product changes MUST receive full review.

Each review MUST identify:

- the responsible designer;
- the responsible engineering owner;
- the product or domain owner where applicable;
- affected components and patterns;
- affected routes or workflows;
- relevant technical dependencies;
- relevant standards;
- unresolved decisions; and
- the review gate currently being evaluated.

Design ownership MUST NOT end at handoff. Engineering ownership MUST NOT begin only after handoff. Designer-developer collaboration MUST start before implementation readiness is declared.

---

## 2.2 Review gates

The canonical review lifecycle consists of the following gates.

### Gate 0 — Problem and constraint review

Before detailed design begins, the team MUST agree on:

- the user problem;
- the intended outcome;
- primary and secondary user journeys;
- applicable business rules;
- known data constraints;
- authentication and authorization constraints;
- security and privacy constraints;
- supported platforms and responsive ranges;
- material technical constraints; and
- existing Design System components and patterns that SHOULD be reused.

A design MUST NOT proceed on an assumption that contradicts an established API, data, security, accessibility, or state-management contract without explicitly identifying the required contract change.

---

### Gate 1 — Structural design review

The design MUST demonstrate a coherent information and interaction hierarchy before detailed visual refinement.

The review MUST verify:

- page and component hierarchy;
- primary, secondary, and tertiary actions;
- navigation relationships;
- grouping and proximity;
- progressive disclosure;
- expected reading order;
- responsive structural behaviour;
- component boundaries;
- repeated patterns;
- content density;
- data dependencies; and
- state ownership.

A reviewer MUST be able to determine what is most important, what is actionable, and what happens next without relying on verbal explanation from the designer.

Visual treatment MUST NOT be used to conceal unresolved structural decisions.

---

### Gate 2 — Behaviour, state, and accessibility review

All behaviourally relevant states MUST be represented before a design is considered implementation-ready.

At minimum, applicable designs MUST define:

- default;
- hover;
- focus-visible;
- active or pressed;
- selected;
- disabled;
- read-only;
- loading;
- progressive loading where applicable;
- empty;
- no-results;
- success;
- warning;
- validation error;
- system error;
- offline or unavailable where applicable;
- partial-data;
- permission-restricted;
- destructive confirmation;
- optimistic update;
- rollback or failed optimistic update; and
- completed or terminal states.

Designs MUST distinguish between states that are visually similar but semantically different.

For example, **disabled**, **read-only**, **loading**, and **permission-restricted** controls MUST NOT be represented as the same state unless the underlying semantics and user affordance are genuinely identical.

Interactive behaviour MUST define:

- trigger;
- response;
- resulting state;
- persistence;
- dismissal;
- keyboard behaviour;
- focus movement;
- escape behaviour;
- interruption behaviour;
- error behaviour; and
- recovery behaviour.

Where state persists across navigation, refresh, URL changes, sessions, or devices, the design MUST align with the State Management standard.

---

## 2.3 Hierarchy review criteria

Every review MUST evaluate visual and semantic hierarchy.

Hierarchy MUST communicate:

1. page purpose;
2. primary task;
3. current context;
4. system status;
5. primary action;
6. secondary actions; and
7. supporting information.

Designs MUST NOT rely on arbitrary font-size, color, shadow, spacing, or decoration changes when an existing semantic token or component variant expresses the intended hierarchy.

Heading levels MUST reflect the semantic content hierarchy and MUST align with the Accessibility and Component standards.

The visual hierarchy SHOULD remain understandable when:

- color is unavailable;
- content length changes;
- text is zoomed;
- localization expands labels;
- validation messages appear;
- loading states replace final content; and
- viewport width changes.

---

## 2.4 Component baseline and reuse

shadcn/ui is the baseline component model for application UI.

Designs MUST first determine whether an approved Design System component based on, composed from, or compatible with the shadcn/ui baseline already satisfies the requirement.

Designers and developers MUST prefer, in order:

1. an existing approved product component;
2. an existing approved Design System component;
3. composition of approved components;
4. an approved extension or variant; and
5. a new component.

A new component MUST NOT be introduced solely because the proposed visual treatment differs from an existing component.

A component MAY be extended when the underlying semantics and behavioural contract remain compatible.

A new component MUST be considered when the proposed behaviour, accessibility model, data contract, state model, or semantic responsibility is materially distinct.

Raw shadcn/ui examples MUST NOT automatically be treated as production-ready product components. Product implementations MUST conform to the project’s tokens, accessibility requirements, component APIs, content standards, security constraints, and interaction standards.

Designs MUST NOT require developers to recreate an existing Design System primitive through bespoke CSS or local component code.

---

## 2.5 Design token compliance

Every implementation-relevant visual value MUST resolve to an approved semantic token wherever an applicable token exists.

This includes, as applicable:

- color;
- typography;
- spacing;
- sizing;
- radius;
- border;
- elevation;
- opacity;
- motion;
- breakpoint;
- focus treatment;
- layering; and
- icon sizing.

Design files MUST use the Design Token standard as the source of truth.

Designers MUST NOT hand off arbitrary hex values, pixel values, shadows, radii, or typography properties as authoritative implementation values when a system token exists.

Engineering MUST NOT infer new tokens from visual similarity.

Where a required value cannot be expressed using an existing token:

- the gap MUST be identified during review;
- the team MUST determine whether the requirement is exceptional or systemic;
- a token addition or amendment MUST follow the Design Token change process when systemic; and
- a local exception MUST be explicitly documented when approved.

Token names SHOULD express semantic intent rather than component-specific appearance.

For example, a design SHOULD reference semantic intent such as `background-destructive` or the project-equivalent semantic token rather than a raw red value.

---

## 2.6 Design-to-code component mapping

Every component in the handoff MUST have a clear relationship to code.

For reusable components, the handoff MUST identify, directly or through an established naming convention:

- design component name;
- Design System component name;
- implementation component name;
- relevant shadcn/ui primitive or composition;
- component variant;
- size;
- state;
- relevant tokens;
- required props or inputs;
- content slots;
- behavioural constraints; and
- accessibility expectations.

Design and code SHOULD use equivalent conceptual names.

A design named `StatusPill`, for example, SHOULD NOT map silently to several unrelated local implementations.

Where the design representation and code component intentionally differ, the handoff MUST document the mapping.

Design variants MUST NOT imply arbitrary boolean prop combinations that produce invalid component states.

Component APIs SHOULD model supported semantic variants rather than unrestricted visual switches.

Invalid or unsupported combinations MUST be prevented in code where practical.

---

## 2.7 Content review

Production-intent designs MUST use production-intent content whenever reasonably available.

Placeholder content such as `Lorem ipsum`, repeated dummy names, unrealistic timestamps, and artificially short labels MUST NOT be used to establish implementation requirements.

The review MUST assess:

- labels;
- headings;
- helper text;
- validation messages;
- empty-state content;
- loading language;
- error messages;
- destructive confirmations;
- success feedback;
- permission messages;
- date and time representations;
- numeric and currency formatting;
- truncation;
- wrapping;
- localization risk;
- user-generated content;
- sensitive content; and
- terminology consistency.

Content MUST conform to the project Content standard.

Error messages MUST describe the user-relevant problem and, where actionable, the recovery path.

Security-sensitive errors MUST NOT reveal implementation details, authorization rules, account existence, internal identifiers, database state, stack information, or other information prohibited by the Security standard.

Frontend copy MUST NOT invent rules that are not supported by backend validation or business logic.

---

## 2.8 Forms and validation

Any design containing user input MUST align with the Forms & Validation standard.

The handoff MUST identify:

- required and optional fields;
- field type;
- accepted format;
- input constraints;
- validation timing;
- validation source;
- client validation;
- server validation;
- error placement;
- form-level errors;
- field-level errors;
- submission loading state;
- duplicate submission behaviour;
- success state;
- cancellation behaviour;
- preservation of entered data; and
- recovery following failed submission.

Client-side validation MUST NOT be treated as a security boundary.

Designs MUST accommodate authoritative server-side validation responses.

A field MUST NOT be represented as valid merely because client validation has passed when server validation is still pending or can reject the input.

Required-state communication MUST NOT depend on color alone.

Error messages MUST be programmatically associated with the affected field where applicable.

The design MUST define focus behaviour after failed submission.

---

## 2.9 Accessibility review

Accessibility MUST be reviewed before engineering handoff and again during design QA.

Design review MUST verify all applicable requirements from the Accessibility standard, including:

- semantic structure;
- heading hierarchy;
- accessible names;
- labels;
- instructions;
- keyboard operation;
- focus order;
- focus visibility;
- focus management;
- contrast;
- non-color indicators;
- target sizing;
- error identification;
- status announcements;
- reduced-motion behaviour;
- zoom and reflow;
- responsive behaviour;
- screen-reader semantics;
- modal and overlay behaviour; and
- logical reading order.

An inaccessible interaction MUST NOT pass review because an accessible implementation is expected to be “worked out in code.”

Design MUST define the intended accessible behaviour whenever visual design alone is insufficient.

Engineering MUST preserve semantic HTML and accessibility behaviour provided by shadcn/ui-compatible primitives unless a reviewed exception requires otherwise.

Visual customization MUST NOT remove or obscure essential focus indicators, keyboard behaviour, labels, descriptions, or state semantics.

---

## 2.10 Security, privacy, and permission-aware design

Designs MUST align with the Security standard.

User interfaces MUST NOT be treated as authorization boundaries.

A hidden, disabled, absent, or visually obscured action MUST NOT be considered sufficient access control.

Where functionality depends on permissions, the design MUST specify the expected user experience for relevant authorization states while engineering MUST enforce authorization in the appropriate trusted layer.

Design review MUST identify:

- sensitive data;
- destructive actions;
- privileged actions;
- impersonation or administrative contexts;
- authentication transitions;
- session-expiry behaviour;
- permission-dependent states;
- disclosure risks;
- confirmation requirements; and
- relevant audit expectations.

Sensitive values SHOULD be minimized in the interface.

Secrets, credentials, tokens, internal security metadata, and prohibited sensitive information MUST NOT appear in design fixtures, screenshots, prototypes, or handoff artefacts.

---

## 2.11 Data and database alignment

UI design MUST distinguish between data presentation requirements and assumptions about database structure.

Design files MUST NOT prescribe tables, columns, joins, or storage models unless the design task explicitly includes an agreed data architecture decision.

The design MUST, however, communicate user-visible data requirements clearly enough for engineering to evaluate them.

Where applicable, handoff MUST define:

- fields shown;
- fields editable;
- derived values;
- sorting;
- filtering;
- grouping;
- pagination;
- aggregation;
- freshness expectations;
- missing values;
- stale values;
- partial values;
- synchronization state;
- conflicts; and
- ownership of computed presentation logic.

The design MUST account for realistic database and API states such as null values, deleted references, partial records, delayed processing, eventual consistency, and unavailable related data when these can occur.

---

## 2.12 API alignment

Design behaviour that depends on remote data MUST align with the API standard.

The design MUST NOT assume instantaneous success.

Where applicable, review MUST cover:

- request initiation;
- loading;
- latency;
- optimistic behaviour;
- cancellation;
- retry;
- timeout;
- partial success;
- pagination;
- rate limiting;
- conflict;
- stale data;
- authentication failure;
- authorization failure;
- validation failure;
- server failure; and
- recovery.

A prototype MUST NOT imply an API contract that has not been agreed.

If the experience depends on new API capabilities, the handoff MUST identify those dependencies explicitly.

Backend enums, status codes, database values, or internal error strings SHOULD NOT be exposed directly as user-facing content.

---

## 2.13 State management alignment

Design MUST identify state according to user-visible behaviour rather than leaving state ownership to visual inference.

The team MUST determine which relevant state is:

- local component state;
- form state;
- URL state;
- shared application state;
- server state;
- persisted client state; or
- externally authoritative state.

Design MUST NOT require duplicated sources of truth without a documented reason.

Filters, search parameters, selected tabs, pagination, and similar controls SHOULD use URL state when required by the State Management standard for shareability, navigation, or persistence.

Remote data SHOULD remain server-owned unless the application has an explicit reason to duplicate it into client-owned state.

The handoff MUST identify persistence expectations wherever users would reasonably observe persistence.

---

## 2.14 Responsive and adaptive behaviour

Design handoff MUST define behaviour across the supported responsive range.

A single desktop frame and a single mobile frame are insufficient when intermediate behaviour is ambiguous.

The handoff MUST communicate, as applicable:

- container behaviour;
- min/max widths;
- wrapping;
- stacking;
- ordering;
- overflow;
- scrolling;
- sticky behaviour;
- table adaptation;
- navigation transformation;
- content priority;
- hidden or deferred content;
- touch behaviour; and
- component changes at breakpoints.

Design MUST use approved breakpoint and layout tokens.

Responsive behaviour SHOULD be specified as rules rather than a collection of unrelated screenshots.

Content MUST NOT disappear solely because a smaller viewport makes the existing layout inconvenient unless the information is intentionally deprioritized and the alternative behaviour is documented.

---

## 2.15 Review artefacts

A design review MUST use artefacts appropriate to the decision being reviewed.

The canonical review package SHOULD include, where applicable:

- annotated design frames;
- component references;
- responsive examples;
- state matrices;
- interaction flows;
- prototypes;
- content specifications;
- accessibility annotations;
- token references;
- data examples;
- dependency notes;
- decision records; and
- unresolved-question tracking.

Annotations MUST describe behaviour or implementation intent that cannot be reliably inferred from the design itself.

Annotations MUST NOT restate obvious visible properties such as “button is blue” when that information is already encoded through the component and token system.

---

## 2.16 Prototype requirements

Prototypes MUST be used when interaction timing, sequencing, navigation, disclosure, focus movement, animation, gesture behaviour, or state transitions are material to implementation.

A prototype SHOULD demonstrate the smallest complete interaction necessary to remove ambiguity.

Prototypes MUST NOT be treated as authoritative for pixel values, tokens, or implementation architecture unless explicitly specified.

Prototype transitions MUST NOT introduce unsupported behaviour merely to make a presentation feel polished.

Where a prototype cannot accurately represent an accessibility or technical interaction, that limitation MUST be documented in the handoff.

Critical behaviour MUST NOT exist only inside an unannotated prototype.

---

## 2.17 Engineering handoff package

A feature MUST NOT be declared ready for implementation until its handoff package is sufficiently complete.

The handoff package MUST contain or reference, as applicable:

1. approved designs;
2. canonical component references;
3. token mapping;
4. responsive rules;
5. complete relevant state coverage;
6. interaction behaviour;
7. content and copy;
8. accessibility requirements;
9. form and validation behaviour;
10. API dependencies;
11. state-management expectations;
12. permission and security considerations;
13. realistic data examples;
14. loading, empty, error, and recovery behaviour;
15. relevant prototypes;
16. design-system exceptions;
17. known technical constraints;
18. unresolved items;
19. decision owners; and
20. acceptance criteria.

References MUST point to canonical artefacts rather than duplicated copies whenever possible.

An unresolved issue that can materially change implementation MUST be marked as unresolved and MUST NOT be disguised through placeholder design.

---

## 2.18 Readiness classification

Handoff status MUST be explicit.

A design SHOULD use one of the following states:

**Exploratory** — not intended for implementation.

**In review** — under active review; implementation SHOULD NOT begin except for agreed technical exploration.

**Conditionally ready** — implementation MAY begin where explicitly identified dependencies do not block current work.

**Ready for implementation** — required review gates have passed and material implementation ambiguity has been resolved.

**Superseded** — no longer authoritative.

There MUST be exactly one clearly identifiable authoritative design state for active implementation.

Old or exploratory frames MUST NOT be presented in a way that can reasonably be mistaken for the approved design.

---

## 2.19 Designer-developer pairing

Every material feature SHOULD have a named designer-developer pairing during implementation.

The pair SHOULD review the feature:

- before implementation begins;
- when component or technical constraints materially affect the design;
- after the first integrated implementation of the core experience; and
- before design QA sign-off.

Engineering SHOULD raise design-system, accessibility, API, state, security, or feasibility conflicts as soon as they become known.

Developers MUST NOT silently substitute materially different UX because implementation is difficult.

Designers MUST NOT insist on a visual solution that violates established accessibility, security, architecture, performance, or platform requirements.

When constraints conflict, the pair MUST resolve the underlying requirement together and record any material deviation.

---

## 2.20 Implementation questions and ambiguity

Developers SHOULD be able to answer ordinary implementation questions from the design system, handoff package, and established standards.

Where a decision affects product behaviour, accessibility, design-system integrity, content meaning, permissions, data integrity, or the user journey, the developer MUST NOT resolve the ambiguity through an undocumented local assumption.

The decision MUST be surfaced to the appropriate owner.

Minor implementation details MAY be resolved by engineering when they do not alter the reviewed contract.

---

## 2.21 Design changes after handoff

After a design is marked Ready for implementation, material changes MUST use change control.

A material change includes any change to:

- user flow;
- component semantics;
- data requirements;
- API requirements;
- validation;
- permissions;
- state model;
- responsive behaviour;
- accessibility behaviour;
- destructive behaviour;
- content meaning;
- design tokens;
- Design System components; or
- acceptance criteria.

Material changes MUST:

1. be identified as changes rather than silently replacing the handoff;
2. include the reason for the change;
3. identify affected implementation;
4. identify affected standards or contracts;
5. be reviewed by the responsible designer and engineer;
6. be communicated to affected owners;
7. update the canonical design or specification; and
8. trigger re-review where the original approval is no longer sufficient.

Cosmetic corrections that do not affect behaviour or established system contracts MAY use a lightweight change path.

Design files MUST NOT be altered after handoff in a way that obscures what engineering originally received.

Where auditability matters, teams SHOULD preserve meaningful revision history or decision records.

---

## 2.22 Engineering-driven deviations

When engineering must deviate from the approved design because of technical constraints, the deviation MUST be surfaced before release.

A deviation MUST identify:

- the original requirement;
- the implemented behaviour;
- the reason;
- user impact;
- accessibility impact;
- Design System impact;
- security or data impact where relevant; and
- whether the deviation is temporary or permanent.

Material deviations MUST receive appropriate design approval.

An implementation MUST NOT be declared design-complete while known material deviations remain undocumented.

---

## 2.23 Design QA

Design QA is a release gate for material user-facing changes.

Design QA MUST occur against an integrated implementation, not solely Storybook, static screenshots, or isolated components, unless the released artefact itself is an isolated component.

Design QA MUST verify the implementation against:

- approved design;
- component mapping;
- semantic tokens;
- hierarchy;
- spacing and layout;
- typography;
- iconography;
- responsive behaviour;
- content;
- all relevant states;
- interaction behaviour;
- keyboard behaviour;
- focus treatment;
- accessibility expectations;
- error behaviour;
- loading behaviour;
- permissions;
- validation;
- data variation; and
- approved post-handoff changes.

QA MUST test with realistic content rather than only ideal fixture data.

Relevant boundary conditions SHOULD be tested, including:

- long labels;
- long names;
- empty values;
- large numbers;
- localized content;
- validation errors;
- server errors;
- slow requests;
- narrow viewports;
- zoom;
- keyboard-only operation; and
- restricted permissions.

---

## 2.24 Design QA issue severity

Design QA findings SHOULD be classified by impact.

### Blocking

A blocking issue MUST be resolved before release.

Examples include:

- inaccessible critical functionality;
- incorrect authorization experience with security implications;
- missing required state;
- broken user flow;
- incorrect destructive-action behaviour;
- implementation of an unapproved interaction;
- major responsive failure;
- content or data exposure issue;
- component behaviour inconsistent with its semantic contract; or
- material divergence that changes the approved experience.

### Major

A major issue SHOULD be resolved before release unless the responsible owners explicitly accept and track it.

Examples include:

- substantial hierarchy divergence;
- incorrect component variant;
- missing non-critical state;
- significant token mismatch;
- focus-management defect;
- inconsistent validation behaviour; or
- material content discrepancy.

### Minor

A minor issue MAY be deferred when it does not materially affect comprehension, accessibility, behaviour, or Design System integrity.

Minor issues MUST NOT be used as a category to normalize repeated token, spacing, typography, or component drift.

---

## 2.25 Release sign-off

A feature MUST NOT receive design sign-off solely because the primary happy-path screen visually resembles the design.

Design sign-off requires:

- relevant review gates passed;
- blocking design QA issues resolved;
- material deviations approved;
- required accessibility behaviour verified;
- required states implemented;
- canonical design updated for accepted changes; and
- any approved deferred issues recorded.

Design sign-off does not replace engineering QA, automated tests, security review, accessibility testing, API validation, or product acceptance.

Each discipline remains responsible for its own release criteria.

---

## 2.26 Design System feedback loop

Repeated implementation friction MUST be treated as Design System feedback.

When multiple features require the same:

- local override;
- missing variant;
- accessibility workaround;
- token exception;
- component composition;
- interaction pattern; or
- handoff annotation,

the team SHOULD evaluate whether the Design System requires an update.

Feature teams MUST NOT independently create near-duplicate shared components to avoid Design System governance.

A component or pattern promoted into the Design System MUST satisfy the applicable Component, Pattern, Accessibility, Design Token, and documentation standards.

---

## 2.27 Documentation requirements

Reusable decisions MUST be documented at the appropriate canonical level.

Documentation MUST distinguish among:

- tokens;
- primitives;
- components;
- patterns;
- feature-specific compositions; and
- one-off exceptions.

Component documentation MUST define at least:

- purpose;
- usage;
- anatomy;
- variants;
- states;
- behaviour;
- accessibility;
- content guidance;
- token usage;
- code mapping;
- valid composition;
- invalid composition; and
- known constraints.

Feature-specific design documentation MUST NOT become an unofficial competing Design System.

Where a feature establishes a reusable interaction convention, the convention SHOULD be promoted to the appropriate Pattern or Component standard.

---

# 3. Anti-patterns

The following practices are non-compliant.

## 3.1 Happy-path-only handoff

Providing only the final populated success state and expecting engineering to infer loading, empty, error, validation, permission, responsive, and partial-data states.

**Why it fails:** engineering becomes the de facto interaction designer, resulting in inconsistent and unreviewed behaviour.

---

## 3.2 Pixel-spec handoff without system mapping

Annotating raw dimensions, hex values, typography values, radii, and shadows while omitting Design System tokens and component mapping.

**Why it fails:** it treats design output as a screenshot reproduction exercise rather than implementation of a governed system.

---

## 3.3 “Make it match Figma”

Using visual similarity to a design frame as the sole acceptance criterion.

**Why it fails:** static frames do not fully encode semantics, accessibility, responsive rules, remote-data behaviour, permissions, or application state.

---

## 3.4 Component lookalikes

Creating a locally styled control that visually resembles an approved component but does not use its implementation or behavioural contract.

**Why it fails:** it produces inaccessible, inconsistent, and expensive component fragmentation.

---

## 3.5 Raw shadcn/ui copy-and-ship

Copying a baseline shadcn/ui component and shipping it without project token, accessibility, content, component API, or design review alignment.

**Why it fails:** shadcn/ui is a baseline, not a substitute for project-level system governance.

---

## 3.6 Screenshot-driven development

Using exported screenshots as the primary engineering specification.

**Why it fails:** screenshots erase token semantics, components, state relationships, accessibility information, content behaviour, and responsive intent.

---

## 3.7 Prototype-only behaviour

Encoding important interaction behaviour in a prototype without documenting it in the implementation handoff.

**Why it fails:** prototype mechanics can be overlooked or can represent presentation shortcuts rather than intended production behaviour.

---

## 3.8 Designer disappearance after handoff

Treating handoff as the end of Design participation.

**Why it fails:** implementation reveals real data, platform constraints, API behaviour, responsive edge cases, and component limitations that often require design decisions.

---

## 3.9 Developer interpretation by silence

Developers resolving material design ambiguity independently because no explicit specification exists.

**Why it fails:** unresolved product decisions become unreviewed implementation decisions.

---

## 3.10 Silent post-handoff edits

Changing approved design frames after engineering begins without identifying the change.

**Why it fails:** the authoritative contract becomes impossible to determine and completed engineering work may appear incorrect retroactively.

---

## 3.11 UI-enforced authorization

Relying on hidden or disabled controls as the mechanism preventing unauthorized action.

**Why it fails:** presentation state is not an authorization boundary.

---

## 3.12 Client-only validation assumptions

Designing errors exclusively around frontend validation.

**Why it fails:** authoritative server validation, business-rule conflicts, and asynchronous failures remain unhandled.

---

## 3.13 Arbitrary token exceptions

Adding local values whenever an approved token appears visually imperfect.

**Why it fails:** local optimization produces systemic visual drift.

---

## 3.14 Component explosion

Creating a new component for each feature-specific visual variation.

**Why it fails:** it fragments semantics, accessibility behaviour, maintenance, and system governance.

---

## 3.15 Boolean-prop component design

Representing every visual variation as an independent boolean.

Examples include combinations such as:

`compact + destructive + subtle + elevated + secondary + borderless`.

**Why it fails:** the resulting state space contains contradictory or unsupported combinations.

Components SHOULD expose deliberate semantic variants.

---

## 3.16 Ideal-data-only QA

Reviewing only short English content, successful responses, complete records, standard permissions, and desktop layouts.

**Why it fails:** real applications contain missing data, long content, errors, latency, localization, restricted access, and boundary conditions.

---

## 3.17 Cosmetic-only design QA

Restricting design QA to spacing, color, and typography.

**Why it fails:** interaction, accessibility, states, content, data behaviour, and component semantics are part of the design contract.

---

## 3.18 Design QA after release

Treating production deployment as the first meaningful comparison between design and implementation.

**Why it fails:** the release process has lost its design quality gate.

---

# 4. Checklist

A material feature MUST satisfy the applicable items below before release.

## 4.1 Review readiness

- [ ] User problem and intended outcome are defined.
- [ ] Primary and secondary flows are identified.
- [ ] Relevant Security requirements are identified.
- [ ] Relevant Data & Database constraints are identified.
- [ ] Relevant API dependencies are identified.
- [ ] Relevant State Management requirements are identified.
- [ ] Relevant Forms & Validation requirements are identified.
- [ ] Relevant Accessibility requirements are identified.
- [ ] Existing Design System components and patterns were evaluated first.
- [ ] shadcn/ui-aligned system components are used where applicable.

## 4.2 Hierarchy and content

- [ ] Page purpose is clear.
- [ ] Primary action is unambiguous.
- [ ] Secondary actions are appropriately subordinate.
- [ ] Semantic heading hierarchy is defined.
- [ ] Content uses realistic production-intent examples.
- [ ] Long and variable content has been considered.
- [ ] Error, success, warning, empty, and permission copy is defined.
- [ ] User-facing text does not expose prohibited internal implementation details.

## 4.3 States and behaviour

- [ ] Relevant default states are defined.
- [ ] Hover states are defined where applicable.
- [ ] Focus-visible states are defined.
- [ ] Active or pressed states are defined where applicable.
- [ ] Disabled and read-only states are intentionally distinguished.
- [ ] Loading states are defined.
- [ ] Empty states are defined.
- [ ] No-results states are defined.
- [ ] Success states are defined.
- [ ] Validation errors are defined.
- [ ] System errors are defined.
- [ ] Permission states are defined.
- [ ] Partial-data states are defined where applicable.
- [ ] Optimistic and rollback behaviour is defined where applicable.
- [ ] Recovery paths are defined.

## 4.4 Accessibility

- [ ] Semantic structure is defined.
- [ ] Accessible names and labels are defined.
- [ ] Keyboard interactions are supported.
- [ ] Focus order is logical.
- [ ] Focus movement is defined for overlays and major state changes.
- [ ] Focus indicators conform to the Design System.
- [ ] Meaning does not depend on color alone.
- [ ] Error association is defined.
- [ ] Status announcements are identified where needed.
- [ ] Reduced-motion behaviour is defined where applicable.
- [ ] Zoom and reflow have been considered.
- [ ] Responsive reading order remains logical.

## 4.5 Tokens and components

- [ ] Design values map to approved semantic tokens.
- [ ] No unexplained arbitrary values are handed off.
- [ ] Each reusable UI element maps to an approved component or documented exception.
- [ ] Design component naming aligns with implementation concepts.
- [ ] shadcn/ui baseline primitives are extended through the project Design System rather than recreated locally.
- [ ] Component variants represent supported semantic states.
- [ ] New Design System requirements have been identified.

## 4.6 Forms

- [ ] Required and optional inputs are defined.
- [ ] Constraints and accepted formats are defined.
- [ ] Validation timing is defined.
- [ ] Client and server validation behaviour is accounted for.
- [ ] Field-level errors are defined.
- [ ] Form-level errors are defined where applicable.
- [ ] Failed submission behaviour is defined.
- [ ] User input preservation is defined.
- [ ] Duplicate submission behaviour is defined.
- [ ] Focus behaviour after validation failure is defined.

## 4.7 Data and API behaviour

- [ ] Realistic data shapes are represented.
- [ ] Null or missing values are represented where possible.
- [ ] Loading and latency are represented.
- [ ] Remote failure is represented.
- [ ] Authentication and authorization failure are represented where applicable.
- [ ] Partial success is represented where applicable.
- [ ] Pagination or continuation behaviour is defined where applicable.
- [ ] Stale or delayed data behaviour is defined where relevant.
- [ ] Data ownership and derived values are understood.
- [ ] The UI does not expose internal API or database values directly without intentional presentation mapping.

## 4.8 Responsive design

- [ ] Supported viewport behaviour is defined.
- [ ] Intermediate widths are not ambiguous.
- [ ] Wrapping rules are defined.
- [ ] Overflow behaviour is defined.
- [ ] Content prioritization is defined.
- [ ] Tables and dense data structures have an adaptive strategy.
- [ ] Navigation transformation is defined where applicable.
- [ ] Breakpoints use approved system values.

## 4.9 Handoff package

- [ ] Approved canonical design is identified.
- [ ] Handoff status is explicit.
- [ ] Component mapping is available.
- [ ] Token mapping is available.
- [ ] Responsive rules are available.
- [ ] Relevant prototypes are linked.
- [ ] Accessibility annotations are available where needed.
- [ ] API dependencies are documented.
- [ ] State-management expectations are documented.
- [ ] Security and permission considerations are documented.
- [ ] Known constraints are documented.
- [ ] Unresolved questions are explicitly marked.
- [ ] Acceptance criteria are available.

## 4.10 Pairing and change control

- [ ] Responsible designer is identified.
- [ ] Responsible engineer is identified.
- [ ] Designer and engineer reviewed the feature before implementation.
- [ ] Material implementation constraints were surfaced.
- [ ] Post-handoff changes were recorded.
- [ ] Material deviations received appropriate review.
- [ ] Canonical designs reflect accepted final behaviour.

## 4.11 Design QA

- [ ] QA occurred against integrated implementation.
- [ ] Approved design and implementation were compared.
- [ ] Component usage was verified.
- [ ] Token usage was verified.
- [ ] Content was verified.
- [ ] Responsive behaviour was verified.
- [ ] Loading behaviour was verified.
- [ ] Empty states were verified.
- [ ] Error states were verified.
- [ ] Validation behaviour was verified.
- [ ] Permission states were verified.
- [ ] Keyboard behaviour was verified.
- [ ] Focus behaviour was verified.
- [ ] Relevant accessibility expectations were verified.
- [ ] Realistic and boundary data were tested.
- [ ] Blocking design QA issues are closed.
- [ ] Material deviations are approved.
- [ ] Deferred issues are recorded.

---

# 5. Canonical summary

Design review is a **formal quality gate**. Engineering handoff is a **shared implementation contract**.

A feature MUST NOT be considered implementation-ready merely because final-state screens exist.

Approved design MUST define the relevant:

**hierarchy + content + components + tokens + states + behaviour + accessibility + responsive rules + data behaviour + API dependencies + validation + permissions + recovery paths.**

shadcn/ui MUST serve as the component baseline, with project Design System components, semantic tokens, accessibility requirements, and documented patterns taking precedence over ad hoc implementation.

Design and engineering MUST map design components and tokens to code explicitly enough that implementation does not depend on visual guesswork.

Designers and developers SHOULD pair throughout implementation rather than treating handoff as an organizational boundary.

Material changes after handoff MUST use change control. Neither Design nor Engineering may silently redefine the approved contract.

Design QA MUST occur before release and MUST evaluate the complete experience, not only visual similarity on the happy path.

The canonical lifecycle is:

**Define constraints → Review structure → Review states and accessibility → Approve handoff → Pair during implementation → Control changes → Perform integrated design QA → Release.**

A compliant handoff enables engineering to implement the approved experience with clear system mappings and known decisions.

A compliant review process ensures that what reaches production remains aligned with the **Security, Data & Database, API, State Management, Forms & Validation, Accessibility, Design Tokens, Component, and Pattern standards**.

I can also normalize this into the exact terminology and cross-reference conventions of the rest of your Gold Standard corpus if you provide one representative standard from it.
