---
id: "overlays"
title: "Overlays & Layering"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "overlays", "layering"]
applies_to: ["ui"]
related: ["motion"]
legacy_number: 66
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 54685
provenance: baseline

---

This version distinguishes **modality** from visual form factor: a dialog, sheet, or drawer can be modal depending on interaction semantics, while tooltip, hover card, popover, and inline disclosure have different focus and dismissal contracts. Current shadcn/ui documentation follows this distinction across Dialog, Alert Dialog, Drawer, Popover, Hover Card, and Tooltip. citeturn261455search0turn261455search2turn261455search4turn261455search5turn306571search11

# Overlays & Layering Guidelines — Gold Standard 2026

**Canonical placement:** Components → Overlays → Patterns → Accessibility  
**Status:** Gold Standard 2026  
**Component baseline:** shadcn/ui  
**Accessibility baseline:** WCAG 2.2 AA minimum and WAI-ARIA Authoring Practices for modal dialogs  
**Interaction baseline:** semantic modality, deterministic focus ownership, centralized layering tokens, and explicit dismissal policy

---

# 1. Purpose

## 1.1 Scope

This standard defines the canonical requirements for transient and layered application surfaces.

It covers:

- modal versus non-modal interaction;
- dialogs;
- alert dialogs;
- drawers;
- sheets;
- popovers;
- hover cards;
- tooltips;
- inline expansion;
- focus placement;
- focus containment;
- focus restoration;
- Escape behavior;
- outside-press dismissal;
- explicit close controls;
- scroll locking;
- portals;
- stacking contexts;
- z-index policy;
- nested overlays;
- responsive adaptation;
- destructive confirmation;
- forms inside overlays;
- asynchronous operations;
- loading and error states;
- overlay accessibility;
- reduced-motion behavior.

This standard applies to application UI built from or aligned with shadcn/ui primitives.

---

## 1.2 Design objective

An overlay MUST have a clear reason to leave normal document flow.

The selected overlay pattern MUST follow interaction semantics rather than visual preference.

Every overlay MUST answer:

1. **Does interaction outside this surface remain available?**
2. **Does keyboard focus remain inside it?**
3. **How does the user dismiss it?**
4. **Where does focus go when it closes?**
5. **Does opening it preserve or interrupt the underlying task?**
6. **How does it behave on constrained screens?**
7. **Can the same content remain understandable without spatial layering?**

If content naturally belongs in the surrounding reading or task flow, inline expansion SHOULD be preferred over an overlay.

Overlays MUST NOT be used merely to avoid designing page layout.

---

## 1.3 Modality is not a visual shape

**Modal** describes an interaction state, not a rectangular component type.

A modal surface:

- prevents meaningful interaction with the underlying application;
- constrains interaction to the active surface;
- presents the underlying content as inert for the duration of the modal task.

A dialog can be modal.

A drawer can be modal.

A sheet can be modal.

A non-modal popover is not a modal merely because it visually floats above content.

Code, documentation, design specifications, and accessibility semantics MUST NOT use “modal” and “dialog” as interchangeable concepts.

A surface MUST NOT declare itself modal to assistive technology unless it actually behaves modally for all users. WAI-ARIA guidance specifically warns that `aria-modal="true"` is appropriate only where outside content is genuinely unavailable for interaction. citeturn306571search2turn306571search3

---

## 1.4 Relationship to other standards

Overlay implementations MUST conform to corpus standards for:

- **Security** — authentication, authorization, sensitive data, destructive actions;
- **Data & Database** — persistence semantics and destructive data operations;
- **API** — request lifecycle, pending states, errors, retry and cancellation;
- **State Management** — canonical open state, route state, form state, nested state;
- **Forms & Validation** — dirty forms, errors, validation, submission and cancellation;
- **Accessibility** — focus, keyboard operation, accessible names, reading order;
- **Design Tokens** — elevation, overlay colour, opacity, z-index, motion, spacing;
- **Components** — shadcn/ui primitives and component contracts;
- **Patterns** — confirmation, disclosure, navigation, search, filtering and responsive interaction;
- **Motion** — entry/exit transitions and reduced-motion behaviour.

An overlay library MUST NOT become a parallel design, accessibility, focus-management, or state-management system.

---

# 2. Rules

## 2.1 Choose the least disruptive pattern

The least interruptive surface that satisfies the task MUST be preferred.

Use the following canonical hierarchy:

| Pattern | Use when | Modality |
|---|---|---|
| Inline expansion | Content belongs directly to the current flow | None |
| Tooltip | Brief supplementary label or explanation | None |
| Hover card | Preview of content represented by a trigger/link | None |
| Popover | Compact contextual interaction anchored to a trigger | Usually non-modal |
| Sheet | Substantial side-oriented task or contextual panel | Modal or intentionally non-modal |
| Drawer | Touch-oriented or edge-originating task surface, often responsive | Modal or intentionally non-modal |
| Dialog | Focused task or decision requiring interruption | Usually modal |
| Alert dialog | Important interruptive decision requiring explicit response | Modal |

The implementation MUST NOT choose a dialog simply because it is easier than designing inline content.

---

## 2.2 Prefer inline expansion when context matters

Inline expansion SHOULD be used when:

- expanded information is part of the surrounding content;
- users benefit from comparing expanded content with nearby information;
- opening the content should not create a new interaction context;
- users may need multiple sections open simultaneously;
- there is no strong need for focus containment.

Use shadcn/ui `Accordion`, `Collapsible`, or ordinary document structure where appropriate.

Inline expansion MUST NOT lock background scroll.

Inline expansion MUST NOT trap focus.

The expanded content MUST appear in logical DOM and reading order.

---

## 2.3 Tooltip

A tooltip MUST be used only for brief supplementary information associated with a trigger.

Appropriate tooltip content includes:

- icon meaning;
- short control explanation;
- compact abbreviation expansion;
- brief secondary clarification.

A tooltip MUST NOT contain:

- forms;
- buttons;
- links required for a task;
- destructive actions;
- substantial documentation;
- information required to understand an error.

A tooltip MUST NOT be the only source of an accessible name for a poorly labelled control when a visible label is required.

Tooltips MUST be available through keyboard focus as well as pointer hover. Current shadcn/ui describes Tooltip as content associated with an element on focus or hover. citeturn306571search11turn306571search12

Tooltip focus MUST remain on the trigger.

A tooltip MUST NOT trap focus.

A tooltip SHOULD dismiss when:

- the trigger loses relevant hover/focus state;
- `Escape` is pressed while the tooltip is active.

Tooltip content SHOULD remain visually subordinate to popovers and dialogs.

---

## 2.4 Hover card

A hover card SHOULD be used for a contextual preview of content represented by another object, typically a link or entity.

Examples include:

- user/profile preview;
- resource metadata;
- document preview;
- contextual entity summary.

shadcn/ui defines Hover Card as a preview surface for content associated with a link and supports hover/focus-oriented triggering. citeturn261455search1turn261455search6

A hover card MUST NOT be required to complete a task.

Essential actions MUST NOT exist only inside a hover card.

The underlying trigger MUST remain usable without opening the preview.

Hover cards MUST be reachable for keyboard users when the preview information is meaningful.

A hover card SHOULD close without requiring explicit action once the interaction has left both trigger and preview context.

Hover timing MUST follow the Motion and Interaction standard and MUST NOT open instantly during casual pointer traversal when doing so creates visual noise.

---

## 2.5 Popover

A popover SHOULD be used for compact contextual content or controls anchored to a trigger.

Appropriate uses include:

- small filter controls;
- formatting options;
- date selection;
- compact forms;
- command or option panels;
- contextual properties.

shadcn/ui Popover explicitly supports rich portal content and forms. citeturn261455search2

A popover SHOULD remain visually and logically associated with its trigger.

Popover content MUST NOT grow into a hidden full application workflow.

If content requires:

- significant navigation;
- extensive scrolling;
- multiple form sections;
- destructive workflow;
- persistent context;

a Dialog, Sheet, Drawer, or dedicated page SHOULD be considered.

A normal popover MUST NOT make the entire underlying page inert.

A normal popover SHOULD NOT trap focus unless the interaction is specifically designed as a constrained composite workflow and accessibility behaviour is verified.

---

## 2.6 Dialog

A dialog SHOULD be used for a focused task requiring temporary interruption of the current workflow.

Appropriate uses include:

- editing a compact entity;
- choosing from a consequential set of options;
- configuring a bounded workflow;
- reviewing information before continuing;
- entering data that logically belongs to a temporary task.

shadcn/ui Dialog is explicitly defined as a window over the primary interface that renders underlying content inert. citeturn261455search0turn261455search3

A modal dialog MUST:

- expose a programmatic dialog role through the underlying component;
- have an accessible name;
- move focus inside when opened;
- keep keyboard focus within the active modal interaction;
- make outside application content non-interactive;
- restore focus appropriately when closed.

WAI-ARIA Authoring Practices defines this focus-containment model for modal dialogs. citeturn306571search2

---

## 2.7 Alert dialog

An alert dialog MUST be reserved for an important interruptive message requiring a user response.

Typical uses include:

- irreversible deletion;
- destructive replacement;
- loss of unsaved work;
- high-impact permission change;
- final commitment to a difficult-to-reverse operation.

A normal informational message MUST NOT be promoted to an alert dialog merely to attract attention.

Use shadcn/ui `AlertDialog` as the component baseline for these interactions. shadcn/ui currently defines it as a modal dialog that interrupts the workflow and expects a response. citeturn261455search5

Alert dialogs MUST contain a clearly understandable decision.

The user MUST NOT be forced to infer what will happen after each action.

---

## 2.8 Sheet

A sheet SHOULD be used for a substantial task or context panel that has a meaningful relationship to an edge of the viewport.

Typical desktop uses include:

- entity details;
- editing contextual properties;
- filters;
- inspector panels;
- supplementary workflows that benefit from preserving visual relationship to the underlying screen.

A sheet SHOULD NOT replace a dedicated page when:

- the workflow is deep;
- navigation occurs within it;
- the content is the primary task;
- significant browser history is appropriate.

A modal sheet MUST follow modal dialog focus and accessibility rules.

A deliberately non-modal sheet MUST NOT trap interaction in a way that contradicts its non-modal status.

---

## 2.9 Drawer

A drawer SHOULD be preferred when the interaction is naturally:

- touch-oriented;
- edge-originating;
- gesture-supported;
- adapted to constrained screens.

shadcn/ui Drawer supports directional swiping, snap points, nested drawers, modal/non-modal operation, and responsive composition with Dialog. citeturn261455search4turn306571search7

Gesture dismissal MUST NOT be the only dismissal method.

A drawer MUST provide accessible button-based or keyboard dismissal where dismissal is allowed.

Snap points MUST NOT hide essential controls in an intermediate inaccessible state.

The current snap state MUST NOT create keyboard focus on content that is visually outside the available drawer region.

---

## 2.10 Responsive component selection

Responsive behaviour MAY change the presentation primitive while preserving the interaction semantics.

A canonical example is:

- `Dialog` on larger screens;
- `Drawer` on smaller touch-oriented screens.

shadcn/ui documents this responsive composition explicitly. citeturn261455search4

Responsive substitution MUST preserve:

- task meaning;
- form state;
- validation state;
- accessible name;
- focus expectations;
- dismissal policy;
- API state.

Changing viewport size MUST NOT destroy unsaved form state merely because the rendered primitive changes.

Responsive adaptation MUST NOT turn a non-modal interaction into a modal interaction accidentally.

---

## 2.11 Modal focus ownership

Only the topmost active modal surface MUST own modal keyboard focus.

When a modal opens, focus MUST move to an appropriate element inside it.

`Tab` and `Shift+Tab` MUST remain within the active modal until it closes.

This follows the WAI-ARIA modal dialog pattern. citeturn306571search2

A modal MUST NOT contain tabbable elements visually hidden behind another layer.

The underlying page MUST NOT remain reachable by ordinary sequential keyboard navigation while the modal is active.

---

## 2.12 Initial focus placement

Initial focus MUST be intentional.

The first focusable element MUST NOT automatically receive focus when another target better supports understanding or safety.

For simple forms, initial focus MAY move to the first relevant field.

For long or structurally complex content, initial focus SHOULD move to:

- the dialog title;
- introductory static content;
- another appropriate element with `tabindex="-1"`.

This prevents focus from jumping deep into the dialog and potentially scrolling introductory content out of view. WAI-ARIA Authoring Practices specifically recommends this approach for large or structurally rich dialogs. citeturn306571search2

For irreversible or difficult-to-reverse decisions, initial focus SHOULD normally favor the least destructive action. citeturn306571search2

---

## 2.13 Focus restoration

When an overlay closes, focus SHOULD return to the element that opened it.

If that element no longer exists, focus MUST move to the next logical workflow target.

Focus MUST NOT fall arbitrarily to:

- `<body>`;
- the beginning of the page;
- an unrelated navigation item.

WAI-ARIA guidance explicitly recommends returning focus to the invoking element unless workflow changes make another target more logical. citeturn306571search2

If closing an overlay creates a new entity or record, focusing that newly created entity MAY be more appropriate than returning to the original trigger.

---

## 2.14 Trigger semantics

An overlay trigger MUST be an appropriate interactive control.

A button SHOULD normally trigger:

- dialog;
- popover;
- menu;
- drawer;
- sheet.

A link SHOULD represent navigation rather than merely opening arbitrary modal UI unless opening the layered experience is itself the documented navigation behaviour.

A non-interactive `<div>` MUST NOT be turned into an overlay trigger solely through click handlers.

Trigger state SHOULD expose expanded/open relationships through the underlying accessible component semantics where applicable.

---

## 2.15 Escape key behavior

`Escape` MUST have consistent meaning within the active overlay stack.

For standard dismissible overlays:

- the topmost active overlay SHOULD close on `Escape`.

For nested overlays:

- the first `Escape` MUST address only the topmost dismissible layer;
- repeated `Escape` presses MAY then dismiss successive parent layers.

A single `Escape` MUST NOT close multiple independent overlay levels.

WAI-ARIA modal dialog guidance specifies `Escape` as the expected dialog dismissal mechanism. citeturn306571search2

---

## 2.16 Escape exceptions

Escape dismissal MAY be disabled only when immediate dismissal would:

- corrupt state;
- abandon an operation that cannot safely stop;
- bypass a required security response;
- violate an explicit critical workflow.

An overlay MUST NOT disable Escape merely to force engagement.

If Escape cannot close the surface, the UI MUST provide a clear explanation or explicit available action where the reason is not self-evident.

Pending API submission alone SHOULD NOT automatically disable Escape.

If a mutation can be safely cancelled or allowed to complete in the background, the overlay SHOULD remain dismissible according to workflow semantics.

---

## 2.17 Explicit close control

Dialogs, sheets, and drawers SHOULD normally expose an explicit visible close or cancel control unless:

- every available action inherently resolves the overlay;
- an alert-dialog pattern provides clear choices;
- domain requirements prohibit dismissal.

A close icon MUST have an accessible name such as “Close”.

An icon alone MUST NOT depend on visual recognition for its accessible meaning.

The close control SHOULD remain reachable when overlay content scrolls.

For long modal content, a sticky header or footer MAY be appropriate.

---

## 2.18 Outside-press dismissal

Outside-pointer dismissal MUST be defined explicitly per pattern.

Typical policy:

| Pattern | Outside press |
|---|---|
| Tooltip | Not applicable as a primary dismissal action |
| Hover card | Usually closes when interaction leaves context |
| Popover | SHOULD normally dismiss |
| Standard dialog | MAY dismiss if no work can be lost |
| Form dialog with unsaved edits | SHOULD NOT silently dismiss |
| Alert dialog | SHOULD NOT rely on outside dismissal |
| Destructive confirmation | SHOULD require an explicit decision |
| Drawer/sheet | Depends on task and data-loss semantics |

Outside press MUST NOT:

- confirm destructive actions;
- submit a form;
- imply acceptance.

A backdrop click MUST NEVER mean “Yes”, “Delete”, “Pay”, “Send”, or another consequential affirmative action.

---

## 2.19 Dirty forms and dismissal

An overlay containing edited unsaved state MUST have an explicit dismissal policy.

If accidental dismissal could lose meaningful work:

- outside dismissal SHOULD be prevented;
- Escape SHOULD either be prevented or routed through an appropriate discard-confirmation flow;
- explicit close/cancel SHOULD communicate unsaved-state consequences where necessary.

Small reversible ephemeral inputs MAY dismiss without secondary confirmation.

Confirmation dialogs MUST NOT be added reflexively for trivial changes.

The cost of accidental loss SHOULD determine whether confirmation is warranted.

---

## 2.20 Form submission

A form inside an overlay MUST follow the canonical Forms & Validation and API standards.

Submission state MUST NOT depend on the overlay animation.

On successful submission, the overlay MAY close automatically when closure is an expected consequence.

On validation error, the overlay MUST remain open.

On server error, the overlay SHOULD remain open with entered data preserved unless the server contract makes that impossible.

Closing an overlay MUST NOT falsely imply successful persistence.

---

## 2.21 Pending operations

When a destructive or important operation is pending:

- the initiating action SHOULD communicate pending state;
- duplicate submission MUST be prevented;
- other safe controls MAY remain available.

The entire dialog MUST NOT automatically become inert because one request is pending unless interaction during that request would be unsafe.

An overlay MUST NOT close before a required successful server response merely to create a perception of speed, unless the workflow explicitly uses optimistic updates with valid rollback semantics.

---

## 2.22 Destructive confirmation

A destructive confirmation MUST identify:

- the action;
- the affected object or scope;
- whether the action is reversible;
- the consequence.

Prefer specific labels:

- `Delete project`;
- `Remove 12 members`;
- `Revoke access`;

over generic labels such as:

- `OK`;
- `Confirm`;
- `Yes`.

The safe action SHOULD be visually and structurally clear.

The destructive action MUST use the canonical destructive semantic token.

Colour MUST NOT be the only indication that an action is destructive.

---

## 2.23 Confirmation thresholds

A confirmation overlay SHOULD be used when an action is:

- irreversible;
- expensive to reverse;
- broad in scope;
- security-sensitive;
- likely to cause meaningful data loss.

A confirmation overlay SHOULD NOT be added to every delete-like action when robust undo provides a safer and less interruptive pattern.

For easily reversible operations, an immediate action with Undo MAY be superior.

For difficult-to-reverse actions, explicit pre-commit confirmation SHOULD be preferred.

---

## 2.24 High-risk confirmation

For unusually consequential actions, stronger confirmation MAY be appropriate.

Examples include:

- deleting an organization;
- destroying an environment;
- rotating a critical credential;
- permanently removing regulated records.

Stronger confirmation MAY require:

- typing an entity name;
- reauthentication;
- selecting an explicit acknowledgement.

Such friction MUST have a risk-based justification.

Security theatre MUST NOT be added merely to make an action feel important.

---

## 2.25 Scroll locking

A modal overlay SHOULD lock background document scrolling.

Scroll locking MUST NOT:

- move the page unexpectedly;
- reset the underlying scroll position;
- cause major horizontal layout shift;
- destroy fixed or sticky layout unexpectedly.

When the modal closes, the underlying document SHOULD return to the same scroll position.

The active overlay's own scrollable region MUST remain operable.

---

## 2.26 Non-modal scrolling

Non-modal popovers and hover cards MUST NOT normally lock document scroll.

A non-modal side panel MAY allow document scrolling when that is part of the intended interaction.

The implementation MUST NOT combine:

- visually non-modal presentation;
- arbitrary focus trapping;
- unexpected background scroll locking

without a documented interaction rationale.

shadcn/ui Drawer explicitly distinguishes non-modal operation and focus-trap configurations, reinforcing the need to choose these semantics intentionally. citeturn261455search4turn306571search7

---

## 2.27 Internal scrolling

Overlays taller than the usable viewport MUST provide a bounded internal scrolling strategy.

Header and footer MAY remain sticky where:

- the title must stay visible;
- primary actions must remain reachable.

The overlay MUST NOT place critical actions permanently below an unreachable scroll boundary.

Nested scroll containers SHOULD be minimized.

A scrollable modal inside another scrollable modal SHOULD NOT be created.

---

## 2.28 Mobile viewport behavior

Overlays MUST account for:

- dynamic browser chrome;
- software keyboards;
- safe areas;
- orientation changes;
- viewport resizing.

Critical controls MUST remain reachable when the virtual keyboard is open.

A focused field MUST NOT become permanently obscured by a fixed footer.

Mobile dialogs that become impractically narrow or tall SHOULD adapt to a Drawer, Sheet, or full-screen task where appropriate.

---

## 2.29 Portals

Overlay content SHOULD normally be portaled to a controlled application overlay root when required by the underlying component implementation.

Portals MUST preserve:

- logical accessible relationships;
- focus behaviour;
- form state;
- theme tokens;
- directionality;
- application context.

Portal placement MUST NOT be used to bypass authorization or state boundaries.

Overlay components MUST NOT create arbitrary portal roots per instance without a strong architectural reason.

---

## 2.30 Stacking contexts

Stacking behaviour MUST be deliberate.

Teams MUST understand that CSS `z-index` values are evaluated within stacking contexts.

A numerically large `z-index` inside a lower stacking context does not necessarily appear above a separate higher stacking context.

Unnecessary creation of new stacking contexts SHOULD be avoided on major application containers.

Properties such as transforms, opacity, isolation, positioned elements, and containment SHOULD be reviewed when overlay stacking behaves unexpectedly.

A stacking-context defect MUST NOT be “fixed” solely by increasing a random `z-index`.

---

## 2.31 Canonical z-index policy

Application layering MUST use semantic Design Tokens rather than arbitrary numbers.

The canonical conceptual stack is:

| Token | Default reference value | Purpose |
|---|---:|---|
| `z-base` | `0` | Normal content |
| `z-raised` | `10` | Raised local content |
| `z-sticky` | `100` | Sticky headers and local persistent controls |
| `z-dropdown` | `300` | Menus and select content |
| `z-popover` | `400` | Popovers and hover cards |
| `z-tooltip` | `500` | Tooltips |
| `z-overlay-backdrop` | `800` | Modal backdrop |
| `z-modal` | `900` | Dialog, modal sheet, modal drawer |
| `z-notification` | `1000` | Global notification/toast layer where appropriate |
| `z-critical` | `1100` | Reserved system-critical application surface |

Exact numeric values MAY be remapped centrally.

Feature code MUST NOT depend on the literal numeric gap between tokens.

Feature code MUST NOT introduce arbitrary values such as:

`z-index: 999999`.

---

## 2.32 Local versus global elevation

Not every raised element requires a global z-index token.

Local layering inside a component SHOULD use the smallest local context required.

Global z-index tokens MUST be reserved for surfaces that genuinely participate in application-wide layering.

A decorative icon above a card background MUST NOT consume the same global layer policy as a modal.

---

## 2.33 Backdrops

Modal overlays SHOULD use a backdrop where visual separation improves understanding.

Backdrop colour and opacity MUST come from Design Tokens.

The backdrop MUST indicate that background content is unavailable without reducing foreground contrast below accessibility requirements.

Backdrop styling MUST NOT be the only mechanism making outside content inert.

Blur MAY be used sparingly.

Heavy backdrop blur SHOULD NOT be relied on for privacy because sensitive content may remain perceptible and present in the DOM.

---

## 2.34 Overlay ordering

Only the topmost interactive overlay MUST receive input intended for that overlay stack.

A lower modal MUST NOT expose active controls through the topmost modal.

Visually obscured interactive elements MUST NOT remain keyboard reachable.

The overlay manager SHOULD track stacking order rather than relying on component mount order accidentally.

---

## 2.35 Nested overlays

Nested overlays SHOULD be avoided unless the child surface represents a genuine secondary interaction.

Reasonable compositions include:

- tooltip within dialog;
- select/menu/popover within dialog;
- date picker popover within dialog;
- confirmation alert dialog triggered from an editing dialog;
- nested drawer where the interaction model explicitly supports it.

shadcn/ui currently supports nested Drawer behavior, but capability alone MUST NOT be treated as justification for arbitrary nesting. citeturn261455search4

---

## 2.36 Nested modal limits

A workflow SHOULD normally have only one primary modal task.

Modal-on-modal interaction SHOULD be exceptional.

Three or more simultaneously active modal levels MUST NOT be used in ordinary product workflows.

If the design requires repeated nested dialogs, the workflow SHOULD be redesigned as:

- a multi-step dialog;
- dedicated page;
- internal view transition;
- inline confirmation.

Nested overlays MUST maintain an explicit parent-child relationship.

---

## 2.37 Nested focus restoration

When a child overlay closes:

- focus MUST return to the logical initiating element inside the parent overlay where that element still exists.

Focus MUST NOT return directly to the underlying page while the parent modal remains open.

When the parent subsequently closes, focus MUST follow the parent restoration policy.

Overlay focus management SHOULD therefore behave as a stack.

---

## 2.38 Nested Escape behavior

Escape MUST operate from the top of the overlay stack.

For:

`Dialog → Popover → Tooltip`

an Escape action MUST NOT close the parent Dialog merely because a Tooltip or Popover has active dismissal semantics.

Each layer MUST receive the opportunity to handle dismissal according to its type.

A child refusing dismissal MUST NOT accidentally propagate an Escape that closes its parent unless that propagation is explicitly intended.

---

## 2.39 Menus and select components inside overlays

Menus, comboboxes, select menus, and popovers inside modal overlays MUST remain within the effective modal interaction context.

Their portals MUST NOT create an accessibility escape route from the modal.

Keyboard focus MUST remain logically contained.

The overlay stack MUST account for these child surfaces even when they are rendered elsewhere in the DOM through portals.

---

## 2.40 Tooltip inside modal

Tooltips inside modal overlays MAY visually appear above the modal.

They MUST NOT create another focus trap.

The modal remains the focus-owning surface.

A tooltip z-index MAY exceed the modal content locally without becoming a separate modal layer.

---

## 2.41 Toasts and overlays

Global notifications SHOULD NOT steal focus from an active dialog merely because they visually appear above it.

Toasts MUST NOT obscure critical dialog actions.

A toast MUST NOT be the sole mechanism for reporting a validation error inside an active modal form.

Errors relevant to the modal task SHOULD appear within the task context.

---

## 2.42 Overlay state management

Overlay open state SHOULD have one canonical owner.

State MAY be:

- uncontrolled within a reusable local component;
- controlled by its owning workflow;
- encoded in route state when the overlay represents navigation.

The same overlay MUST NOT have competing independent sources of truth.

Animation state MUST remain subordinate to canonical open/closed state.

---

## 2.43 Route-backed overlays

An overlay MAY be route-backed when:

- it represents navigable content;
- deep linking is useful;
- browser history should represent opening and closing.

Examples include:

- record details;
- media viewer;
- item preview with dedicated canonical route.

Route-backed overlays MUST preserve correct behavior when loaded directly.

A directly loaded route MUST NOT assume an underlying page exists merely because normal navigation usually displays the route as an overlay.

Browser Back SHOULD close a route-backed overlay where opening it added the corresponding history entry.

---

## 2.44 URL state

Ephemeral overlay state SHOULD NOT automatically be placed in the URL.

URL state MAY be appropriate for:

- selected record;
- shareable detail view;
- navigation-level filters.

URL state SHOULD NOT normally represent:

- tooltip visibility;
- hover-card visibility;
- temporary menu state.

Sensitive information MUST NOT be serialized in overlay URLs merely to simplify state restoration.

---

## 2.45 Overlay forms

Forms inside overlays MUST use standard form components and validation behaviour.

Labels, descriptions, required state, field errors, and summary errors MUST remain accessible.

Validation MUST NOT close the overlay.

If validation fails:

- focus SHOULD move according to the canonical Forms & Validation error strategy;
- the invalid field MUST remain reachable;
- the dialog title MUST remain available as context.

Long forms SHOULD generally use a dedicated page or larger sheet rather than a small centered dialog.

---

## 2.46 Data persistence

Closing a presentation surface MUST NOT be confused with deleting or persisting domain state.

An overlay's visual lifecycle MUST remain separate from:

- API request lifecycle;
- transaction completion;
- cache invalidation;
- server persistence.

A close animation completing MUST NEVER be treated as confirmation that a mutation succeeded.

---

## 2.47 Security-sensitive overlays

Security-sensitive overlay content MUST follow ordinary authorization rules.

Opening a dialog MUST NOT fetch or reveal data that the user is unauthorized to access.

Sensitive underlying content MUST NOT remain exposed because a translucent backdrop visually obscures it.

Logout, permission loss, or session expiry MUST close or sanitize restricted overlay content immediately according to Security state.

Animation MUST NOT delay security-state enforcement.

---

## 2.48 Authentication overlays

Authentication or reauthentication MAY occur in an overlay where the security model permits it.

The user MUST be able to distinguish:

- application-controlled authentication UI;
- browser/platform authentication;
- third-party authentication contexts.

Credential entry MUST NOT occur in visually ambiguous hover or popover surfaces.

High-risk authentication SHOULD use a clear, focused dialog or dedicated route.

---

## 2.49 Sensitive confirmation

Security-sensitive confirmations MUST identify the requested action explicitly.

A permission escalation dialog MUST NOT use ambiguous language such as:

`Allow?`

Prefer:

`Allow Acme Reports to export customer records?`

where the domain context makes such detail appropriate.

Authorization decisions MUST NOT be accepted through outside click, backdrop interaction, or ambiguous dismissal.

---

## 2.50 Overlay accessibility

Every modal dialog MUST have an accessible name.

The accessible name SHOULD normally derive from the visible title.

WAI-ARIA requires dialogs to have an accessible name and recommends focus placement and management for modal dialogs. citeturn306571search0turn306571search3

Descriptions SHOULD be associated where concise explanatory text materially helps.

Complex dialog content MUST NOT be flattened into a long `aria-describedby` announcement when normal semantic navigation is more appropriate. WAI-ARIA APG explicitly notes that structured content can be easier to understand when users navigate its semantic structure directly. citeturn306571search2

---

## 2.51 Keyboard operability

Every overlay action MUST be keyboard operable.

Keyboard users MUST be able to:

- open the surface;
- operate required controls;
- dismiss it when dismissal is supported;
- move through content in logical order;
- return to the originating workflow.

WCAG requires keyboard navigation to avoid keyboard traps and requires sequential focus order to preserve meaning and operability. citeturn306571search1turn306571search5

A custom overlay MUST NOT capture keyboard input in a way that prevents expected browser or component behavior without a documented requirement.

---

## 2.52 No accidental keyboard traps

A modal dialog intentionally contains focus while active.

This is not permission to create an inescapable interface.

The user MUST retain an expected mechanism for resolving or dismissing the modal where dismissal is permitted.

Non-modal overlays MUST NOT accidentally trap keyboard focus.

Application-specific shortcuts MUST NOT prevent the user from reaching ordinary overlay controls.

---

## 2.53 Focus visibility

Focused controls inside overlays MUST have a visible focus indicator meeting the corpus Accessibility standard.

Backdrop, elevation, or overlay colour MUST NOT make the focus indicator imperceptible.

Focus indicators MUST remain visible inside:

- scrolled dialog regions;
- dark overlays;
- destructive surfaces;
- sheets and drawers.

---

## 2.54 Focus must not be obscured

Sticky overlay headers, footers, virtual keyboards, and nested surfaces MUST NOT obscure the focused control.

WCAG 2.2 includes focus-order requirements, and its enhanced guidance further emphasizes preventing focused components from being obscured by authored content. citeturn306571search1turn306571search5

Overlay scrolling SHOULD adjust as necessary to keep the active field or control visible.

---

## 2.55 Screen-reader reading order

Portal rendering MUST NOT produce a confusing logical sequence.

Dialog title and primary context MUST be available when focus first enters.

Critical explanatory text SHOULD appear before the action set in semantic reading order.

Destructive action controls MUST NOT be announced before users can understand what they affect.

---

## 2.56 Background content semantics

When a surface is truly modal, the underlying application MUST be unavailable to interaction and assistive-technology navigation according to the selected accessible primitive.

Developers SHOULD rely on the tested modality implementation provided by the component primitive rather than manually applying large trees of `aria-hidden`.

A surface MUST NOT mark itself `aria-modal="true"` while pointer or keyboard users can still interact freely with the underlying page. WAI-ARIA warns that this mismatch can have severe consequences for assistive-technology users. citeturn306571search2

---

## 2.57 Motion

Overlay movement MUST follow the Motion & Interaction standard.

Dialogs SHOULD use restrained opacity/scale or short positional movement.

Sheets and drawers MAY use directional movement because their edge relationship is meaningful.

Reduced-motion mode MUST remove or substantially reduce:

- large translations;
- spring movement;
- overshoot;
- substantial scaling.

Focus placement MUST NOT wait for decorative animation to finish unless immediate placement creates a verified accessibility defect.

---

## 2.58 Touch targets

Overlay controls MUST meet the corpus target-size requirements.

Close controls MUST NOT become tiny merely to reduce visual prominence.

Drawer handles MAY supplement swipe interactions but MUST NOT replace explicit accessible actions where those actions are required.

Touch dismissal regions MUST NOT overlap important controls.

---

## 2.59 Responsive action layout

Dialog action rows MAY become vertical on constrained widths.

The semantic action hierarchy MUST remain consistent across breakpoints.

Responsive layout MUST NOT reverse button meaning unexpectedly.

If the safest action is placed first in keyboard order, visual rearrangement MUST NOT create a contradictory or confusing reading order.

CSS visual order MUST NOT produce a focus order inconsistent with meaning.

---

## 2.60 Long content

Long content SHOULD generally not be forced into a small centered dialog.

Consider:

- larger Dialog;
- Sheet;
- Drawer;
- dedicated page.

If a long modal is justified:

- title SHOULD remain discoverable;
- scroll position SHOULD be clear;
- actions SHOULD remain reachable;
- keyboard focus MUST remain coherent.

The presence of scrollable-content support in a component library MUST NOT be treated as a reason to put entire pages inside dialogs.

---

## 2.61 Overlay performance

Opening an overlay SHOULD not require expensive synchronous work before the first visible response.

Large child content SHOULD load according to standard asynchronous patterns.

Portaled content MUST NOT repeatedly mount and unmount expensive global providers.

Overlay opening MUST NOT trigger unnecessary whole-page rerenders.

Large forms or data views MAY require lazy initialization, but essential title, close control, and state feedback SHOULD appear promptly.

---

## 2.62 Loading inside overlays

An overlay opened to perform a task SHOULD communicate loading within its established surface.

It SHOULD NOT repeatedly resize as loading states resolve.

Skeletons SHOULD preserve expected layout.

If loading fails:

- the overlay SHOULD show the relevant error;
- unaffected surrounding application content MUST remain valid.

A loading failure MUST NOT silently dismiss the overlay and lose task context.

---

## 2.63 Overlay testing

Overlay tests MUST verify behaviour, not only screenshots.

Tests SHOULD cover:

- open and close;
- initial focus;
- focus containment;
- focus restoration;
- Escape;
- outside press;
- close button;
- dirty forms;
- nested overlays;
- responsive substitution;
- loading;
- validation error;
- API error;
- destructive confirmation;
- reduced motion.

Accessibility testing MUST include actual keyboard navigation.

---

## 2.64 Stacking tests

Applications with multiple overlay types MUST test representative combinations such as:

- tooltip above dialog;
- popover inside dialog;
- select inside sheet;
- alert dialog above form dialog;
- toast while dialog is open;
- drawer containing a popover.

Tests MUST verify:

- visual order;
- pointer interaction;
- focus order;
- Escape order;
- scrolling;
- screen-reader semantics.

---

# 3. Anti-patterns

The following are non-conforming unless a documented requirement provides a stronger justification.

## 3.1 Wrong component choice

- Dialog for content that belongs inline.
- Tooltip containing buttons or a form.
- Hover card containing an essential workflow.
- Popover used as a multi-step application.
- Drawer used solely because it looks more modern.
- Alert dialog used for ordinary informational messages.
- Long primary workflows embedded inside small centered dialogs.

## 3.2 Focus

- Opening a modal without moving focus into it.
- Allowing `Tab` to reach the underlying page.
- Focusing the destructive action automatically without a safety rationale.
- Returning focus to `<body>` after close.
- Returning focus to the page while a parent modal remains open.
- Creating a non-modal popover that unexpectedly traps focus.
- Hiding a focused element underneath a newly opened overlay.

## 3.3 Dismissal

- Backdrop click performing an affirmative action.
- Escape closing multiple overlay levels.
- Disabling Escape merely to force a user decision.
- A form dialog silently closing on outside press and losing entered data.
- Swipe being the only way to close a drawer.
- Missing close/cancel mechanism in a dismissible dialog.

## 3.4 Destructive actions

- Generic `OK` for permanent deletion.
- Destructive confirmation without identifying what will be deleted.
- Making the destructive button the default focused action without reason.
- Using colour as the only warning.
- Confirmation dialog for every trivial reversible action.
- High-friction typed confirmation for low-risk changes.
- Closing before server failure can be communicated when success is required first.

## 3.5 Scroll

- Background page scrolling underneath a modal.
- Resetting page scroll to the top when a dialog closes.
- Three nested independent scroll containers.
- Sticky dialog footer covering focused fields.
- Popovers unnecessarily locking document scroll.
- Body-scroll hacks causing large horizontal layout shifts.

## 3.6 Layering

- `z-index: 999999`.
- Every feature inventing its own z-index scale.
- Increasing z-index repeatedly to compensate for misunderstood stacking contexts.
- A tooltip hidden behind its own parent dialog.
- Global navigation appearing above a modal accidentally.
- Lower modal controls remaining clickable through a child modal.
- Creating unnecessary stacking contexts on major layout roots.

## 3.7 Nested overlays

- Dialog inside dialog inside dialog.
- Modal picker opened merely to choose one small option inside another modal.
- Parent dialog closing when child popover receives Escape.
- Parent focus restoration running while child or parent overlay remains active.
- Unrelated overlays sharing one undifferentiated global Boolean such as `isOpen`.

## 3.8 Responsive behavior

- Small desktop dialog simply shrinking below usability on mobile.
- Switching Dialog to Drawer and losing form state.
- Mobile drawer requiring swipe gestures.
- Visual button reordering that contradicts keyboard order.
- Software keyboard obscuring the primary action.

## 3.9 Accessibility

- Dialog without an accessible name.
- Custom modal based only on a fixed `<div>`.
- Setting `aria-modal="true"` while background interaction remains available.
- Manually applying `aria-hidden` indiscriminately and hiding the dialog itself.
- Tooltip that works only on mouse hover.
- Close icon without an accessible name.
- Focus indicator invisible against overlay content.
- Modal that keyboard users cannot resolve or dismiss according to its workflow.

## 3.10 Forms and API state

- Closing a dialog because the submit button was clicked rather than because persistence succeeded.
- Losing form data after a validation or server error.
- Allowing duplicate destructive submission.
- Replacing the whole dialog with an unexplained spinner.
- Hiding API failure in a toast unrelated to the form context.

## 3.11 Security

- Using backdrop blur as protection for sensitive underlying information.
- Delaying permission removal until an exit transition finishes.
- Treating hidden dialog content as authorization.
- Passing secrets into URL-backed overlay state without need.
- Security approval dismissible through ambiguous outside interaction.

---

# 4. Checklist

## 4.1 Pattern selection

- [ ] The overlay has a reason to leave normal document flow.
- [ ] Inline expansion was considered first.
- [ ] Tooltip contains only brief supplementary information.
- [ ] Hover card is only a preview.
- [ ] Popover remains a bounded contextual interaction.
- [ ] Dialog represents a focused temporary task.
- [ ] Alert dialog is reserved for important decisions.
- [ ] Sheet/drawer usage follows viewport and spatial semantics.

## 4.2 Modality

- [ ] Modal versus non-modal behaviour is explicitly defined.
- [ ] Underlying content is truly inert when the surface is modal.
- [ ] A non-modal surface does not accidentally trap interaction.
- [ ] Accessibility semantics match actual modality.
- [ ] Only the topmost modal owns modal focus.

## 4.3 Focus

- [ ] Initial focus placement is intentional.
- [ ] Long dialogs can focus static introductory content.
- [ ] Destructive flows prefer safe initial focus.
- [ ] Modal focus is contained.
- [ ] Focus order preserves meaning.
- [ ] Focus returns to the logical trigger or next workflow target.
- [ ] Nested focus restoration behaves as a stack.
- [ ] Focus never falls arbitrarily to the page root.

## 4.4 Dismissal

- [ ] Escape behaviour is defined.
- [ ] Escape closes only the topmost appropriate layer.
- [ ] Explicit close/cancel exists where appropriate.
- [ ] Outside-press behaviour is intentional.
- [ ] Outside press never confirms an affirmative action.
- [ ] Unsaved data cannot be lost accidentally.
- [ ] Gesture dismissal has an accessible alternative.

## 4.5 Scrolling

- [ ] Modal background scroll is locked.
- [ ] Background scroll position is restored.
- [ ] Active overlay content can scroll when needed.
- [ ] Nested scroll containers are minimized.
- [ ] Focused fields remain visible.
- [ ] Software keyboard behaviour has been tested.
- [ ] Sticky actions do not obscure content.

## 4.6 Layering

- [ ] Global layers use Design Token z-index values.
- [ ] Feature code contains no arbitrary extreme z-index values.
- [ ] Stacking contexts are understood.
- [ ] Portals use a controlled overlay architecture.
- [ ] Tooltip/popover/modal ordering is intentional.
- [ ] Only the topmost active modal accepts modal input.
- [ ] Toasts do not obscure critical overlay actions.

## 4.7 Destructive confirmation

- [ ] The consequence is explicit.
- [ ] The affected entity/scope is identified.
- [ ] The action label is specific.
- [ ] Destructive styling uses semantic tokens.
- [ ] Colour is not the only warning.
- [ ] Confirmation friction is proportional to risk.
- [ ] Undo is considered for reversible operations.

## 4.8 Forms and APIs

- [ ] Form semantics follow Forms & Validation.
- [ ] Dirty-state dismissal is defined.
- [ ] Validation errors preserve entered state.
- [ ] Server errors preserve usable context.
- [ ] Duplicate requests are prevented.
- [ ] Visual closing is separate from persistence success.
- [ ] Pending state is explicit.

## 4.9 Responsive behavior

- [ ] Dialog-to-drawer/sheet adaptation is intentional where used.
- [ ] Semantic modality remains consistent.
- [ ] State survives responsive primitive changes.
- [ ] Mobile controls remain reachable.
- [ ] Touch targets remain adequate.
- [ ] Focus order remains logical after reflow.

## 4.10 Nested overlays

- [ ] Nesting is necessary.
- [ ] The parent-child relationship is explicit.
- [ ] No more modal levels exist than necessary.
- [ ] Child Escape does not incorrectly close the parent.
- [ ] Child close restores focus inside the parent.
- [ ] Portaled child controls remain inside the effective modal context.

## 4.11 Accessibility

- [ ] Every dialog has an accessible name.
- [ ] Descriptions are associated appropriately.
- [ ] Complex content is not flattened into an unusable announcement.
- [ ] Keyboard operation is complete.
- [ ] Focus is visible.
- [ ] Modal focus does not escape.
- [ ] Non-modal interfaces do not trap focus.
- [ ] Tooltips are available on focus.
- [ ] Close controls have accessible names.
- [ ] Reduced-motion behaviour follows the Motion standard.

## 4.12 Security

- [ ] Overlay visibility is not used as authorization.
- [ ] Sensitive content is removed according to security state.
- [ ] Backdrop styling is not treated as privacy protection.
- [ ] Authentication and authorization decisions require explicit interaction.
- [ ] Sensitive URL state is avoided.
- [ ] Security changes do not wait for animation completion.

## 4.13 Testing

- [ ] Keyboard-only flow has been tested.
- [ ] Initial focus is tested.
- [ ] Focus containment is tested.
- [ ] Focus restoration is tested.
- [ ] Escape is tested.
- [ ] Outside dismissal is tested.
- [ ] Nested layers are tested.
- [ ] Responsive variants are tested.
- [ ] Screen-reader semantics are tested.
- [ ] Unsaved forms and error states are tested.
- [ ] Layer ordering is tested with representative overlay combinations.

## 4.14 Corpus alignment

- [ ] shadcn/ui is the component baseline.
- [ ] Design Tokens own z-index, overlay, elevation, spacing and motion values.
- [ ] Motion standards govern enter/exit transitions.
- [ ] Forms & Validation governs forms inside overlays.
- [ ] State Management owns canonical open/task state.
- [ ] API state governs pending/success/error behaviour.
- [ ] Security state overrides visual overlay state.
- [ ] Accessibility governs focus, keyboard and semantic modality.
- [ ] Pattern standards govern destructive confirmation and disclosure.

---

# 5. Canonical summary

A Gold Standard 2026 overlay MUST be selected according to interaction semantics rather than appearance.

Inline expansion SHOULD be preferred when content belongs in normal flow.

Tooltips MUST contain only brief supplementary information and MUST work through keyboard focus as well as pointer interaction.

Hover cards MUST remain optional previews.

Popovers SHOULD provide bounded contextual interaction without unnecessarily making the application modal.

Dialogs SHOULD be used for focused temporary tasks. Alert dialogs MUST be reserved for important interruptive decisions. Sheets and drawers SHOULD represent meaningful side- or edge-oriented tasks and MAY adapt responsively according to device constraints.

Modality MUST be explicit. A modal surface MUST make underlying application content unavailable, move focus into the active surface, constrain focus appropriately, and restore focus when closed. A surface MUST NOT claim modal semantics while permitting ordinary interaction with the page beneath it. citeturn306571search2turn306571search3

Initial focus MUST reflect the task. Complex dialogs MAY focus structural introductory content, while difficult-to-reverse confirmation dialogs SHOULD generally favor the least destructive initial action. citeturn306571search2

Escape and outside-dismissal rules MUST be predictable. Escape SHOULD affect only the topmost applicable layer. Outside interaction MUST NEVER act as affirmative confirmation.

Unsaved work MUST NOT be silently discarded through incidental dismissal.

Modal overlays SHOULD lock background scroll while preserving the original page position. Non-modal surfaces SHOULD NOT impose modal scroll behaviour without a documented reason.

Layering MUST use centralized semantic z-index tokens. Arbitrarily escalating z-index values MUST NOT substitute for understanding CSS stacking contexts.

Nested overlays SHOULD be uncommon. Child tooltips, menus, selects, and popovers are valid where context requires them, but multiple primary modal tasks SHOULD be redesigned into a single coherent workflow whenever practical.

Destructive confirmation MUST state the consequence, affected scope, and action explicitly. Confirmation friction MUST be proportional to actual risk.

Overlay forms MUST preserve entered data on validation and recoverable API errors. Overlay visibility, mutation success, and persistence state MUST remain separate concepts.

Responsive implementation MAY substitute Dialog, Sheet, or Drawer while preserving interaction semantics and state. Current shadcn/ui supports responsive Dialog/Drawer composition and nested Drawer behaviour, but component capability does not override these architectural constraints. citeturn261455search4

Accessibility is part of overlay architecture. Keyboard users MUST be able to enter, operate, resolve, and leave overlay interactions with logical focus order and without unintended keyboard traps. citeturn306571search1turn306571search5

Security state MUST override presentation state. Sensitive information MUST NOT remain available merely because a close transition has not completed.

shadcn/ui is the canonical component baseline. Product overlays MUST extend its Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard, Tooltip, Accordion, and related primitives rather than creating incompatible local overlay systems.

**Canonical rule:** an overlay is conforming only when its purpose, modality, focus ownership, dismissal, layering, responsive behaviour, state lifecycle, and accessibility remain predictable regardless of pointer device, keyboard use, viewport size, nesting, animation, or asynchronous application state.

The z-index values in §2.31 are intentionally defined as **corpus reference tokens**, not intrinsic CSS or shadcn/ui requirements; the semantic ordering is the contract, and the literal values can be remapped centrally without changing feature code.
