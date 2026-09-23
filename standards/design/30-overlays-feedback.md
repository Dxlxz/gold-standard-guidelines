---
id: "overlays-feedback"
title: "Overlays, Feedback & Micro-interactions"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "overlays", "feedback", "micro", "interactions"]
applies_to: ["ui"]
related: []
legacy_number: 110
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 73313
provenance: baseline

---

Research completed first via Firecrawl. The standard below is grounded primarily in W3C/WAI, Nielsen Norman Group, IBM Carbon, Apple HIG, Material 3, GOV.UK, and current shadcn/ui component guidance.

# Gold Standard 2026 — Overlays, Feedback & Micro-interactions

**Status:** Canonical design standard  
**Scope:** Overlays, dialogs, panels, notifications, loading and progress, background jobs, transient feedback, micro-interactions, motion, sound, and haptics  
**Component baseline:** shadcn/ui  
**Normative language:** **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** indicate requirement strength.

---

# 1. Purpose

Overlays and feedback mechanisms control attention.

They can:

- interrupt;
- redirect focus;
- obscure context;
- confirm system state;
- communicate progress;
- prevent mistakes;
- request a decision;
- reassure users that work is continuing.

Because these mechanisms directly influence attention and workflow, teams MUST select them according to **urgency, persistence, required action, locality, and interruption cost**, not visual preference.

NN/g notes that modal dialogs impose immediate attention and context-switching costs; they are justified when important information or action genuinely requires interruption.  
https://www.nngroup.com/articles/modal-nonmodal-dialog/

Carbon distinguishes non-disruptive inline notifications from more disruptive toast and modal feedback, reinforcing that feedback surface should match the amount of interruption required.  
https://carbondesignsystem.com/patterns/notification-pattern/

This standard aligns with:

- **Security standards:** sensitive confirmations, session expiry, permissions, and destructive actions MUST use surfaces proportionate to risk.
- **Data & Database standards:** feedback MUST describe canonical state rather than merely local UI state.
- **API standards:** loading, retry, partial failure, rate limiting, and asynchronous jobs MUST map coherently to API lifecycle.
- **State Management standards:** pending, optimistic, confirmed, failed, stale, and background states MUST remain distinguishable.
- **Forms & Validation standards:** field errors SHOULD remain local to forms rather than become generic global notifications.
- **Accessibility standards:** modal focus containment, focus restoration, accessible naming, reduced motion, and non-color semantics are mandatory.
- **Design Token standards:** elevation, z-index, duration, easing, status colors, and motion MUST use system tokens.
- **Component standards:** shadcn/ui is the default primitive layer.

Current shadcn/ui includes `Dialog`, `AlertDialog`, `Sheet`, `Drawer`, `Popover`, `Tooltip`, `HoverCard`, `DropdownMenu`, `ContextMenu`, `Alert`, `Badge`, `Progress`, `Skeleton`, `Spinner`, and notification primitives suitable for this baseline.  
https://ui.shadcn.com/docs/components

## Rules

1. The least disruptive adequate surface MUST be used.
2. An overlay MUST NOT exist merely because content needs visual emphasis.
3. Feedback MUST appear near the user's locus of attention whenever practical.
4. Critical feedback MUST persist until it is no longer needed.
5. Noncritical feedback SHOULD avoid stealing focus.
6. Blocking surfaces MUST be reserved for blocking decisions or states.
7. Every overlay MUST define entry, focus, dismissal, and focus-restoration behavior.
8. Loading feedback MUST correspond to real application state.
9. Motion MUST communicate state or relationship rather than delay work.
10. Feedback MUST remain understandable without relying solely on animation, color, sound, or haptics.

## Anti-patterns

- modal dialogs for announcements;
- toast messages for form validation;
- banners for field-specific errors;
- tooltips containing critical instructions;
- infinite loading spinners;
- motion added solely for “delight” to routine repetitive actions;
- success animations that prevent immediate continuation;
- global notification for a problem that exists inside one card.

## Checklist

- [ ] Surface matches urgency.
- [ ] Surface matches locality.
- [ ] Interruption is justified.
- [ ] Focus behavior is defined.
- [ ] Dismissal behavior is defined.
- [ ] State persists for the correct duration.
- [ ] Motion can be reduced.
- [ ] Feedback is source-of-truth accurate.

## Canonical summary

**Feedback MUST consume no more attention than the state deserves.**

---

# 2. Core Attention Model

## Purpose

Define the dimensions used to choose a feedback or overlay mechanism.

## Rules

Every feedback event MUST be evaluated across five independent dimensions.

### 2.1 Importance

How consequential is the information?

```text id="j70eqp"
low → contextual detail
medium → useful status
high → meaningful problem or decision
critical → severe consequence, immediate protection required
```

### 2.2 Urgency

How quickly must the user act?

```text id="u88qsy"
none      → whenever convenient
eventual  → before completing a larger task
soon      → current session/workflow
immediate → before proceeding
```

Importance and urgency MUST NOT be conflated.

A high-importance item can be nonurgent.

Example:

> Your API credential expires in 14 days.

This may deserve persistent visibility but does not justify interrupting a current editing task.

Apple explicitly recommends accurately representing urgency and reserving time-sensitive interruption for information genuinely relevant in the moment.  
https://developer.apple.com/design/human-interface-guidelines/managing-notifications

### 2.3 Required action

Feedback MUST establish whether users need to:

- do nothing;
- optionally inspect;
- acknowledge;
- take an action;
- make a blocking decision.

### 2.4 Locality

Feedback SHOULD appear at the narrowest scope that fully explains the state.

```text id="oaqj79"
control
→ field
→ component
→ section
→ page
→ workspace
→ application
→ external/system notification
```

### 2.5 Persistence

The system MUST decide whether information is:

- instantaneous;
- transient;
- persistent until resolved;
- historically retrievable.

A toast is not a notification history mechanism.

## Anti-patterns

- treating “error” as automatically modal;
- putting every success in a toast;
- sending a push notification for something visible on the current screen;
- promoting local state to application-wide messaging.

## Checklist

- [ ] Importance defined.
- [ ] Urgency defined separately.
- [ ] Required action defined.
- [ ] Narrowest useful scope selected.
- [ ] Persistence requirement selected.

## Canonical summary

**Surface selection follows attention requirements, not severity color.**

---

# 3. Overlay Taxonomy

## Purpose

Standardize when each overlay or feedback surface is appropriate.

## Rules

| Pattern | Modality | Primary use | MUST NOT be used for |
|---|---|---|---|
| **Modal dialog** | Modal | Necessary decision, focused short task, critical confirmation | Routine information |
| **Alert dialog** | Modal | Consequential/destructive decision | General notices |
| **Non-modal panel** | Non-modal | Reference or editing alongside primary context | Decision that must block workflow |
| **Sheet / side drawer** | Usually modal or constrained | Secondary task, details, editing without full navigation | Tiny menu/list |
| **Popover** | Non-modal | Small anchored interaction or supplemental controls | Long workflows |
| **Tooltip** | Non-modal | Brief explanation of an existing control | Essential instructions or actions |
| **Hovercard** | Non-modal | Rich preview/reference information | Required interaction |
| **Dropdown menu** | Non-modal | Compact command list triggered by control | General content |
| **Context menu** | Non-modal | Context-sensitive commands | Sole access to essential actions |
| **Lightbox** | Modal | Focused media inspection | Ordinary page content |
| **Toast/snackbar** | Non-modal/transient | Short confirmation/status not requiring context switching | Critical failures, long instructions |
| **Banner** | Persistent | Page/service-wide state | Field-specific errors |
| **Inline alert** | Persistent/local | Contextual problem/status near affected content | Unrelated global status |
| **Bottom sheet** | Modal or non-modal | Mobile contextual actions/details | Every desktop drawer translated blindly |

---

# 4. Modal Dialogs

## Purpose

Temporarily block the underlying workflow because a focused decision or task must be completed or dismissed first.

NN/g describes modal dialogs as inherently interruptive and recommends using them when attention is genuinely required.  
https://www.nngroup.com/articles/modal-nonmodal-dialog/

## Rules

Use a modal dialog when:

- an immediate decision is necessary;
- continuing would be unsafe or ambiguous;
- a small contained task logically belongs to the current context;
- confirmation protects against meaningful irreversible loss.

A modal SHOULD remain compact.

Long exploratory workflows SHOULD normally become:

- a dedicated page;
- non-modal side panel;
- multi-step route.

### Accessibility behavior

WAI's modal-dialog pattern requires focus to move inside the dialog, remain within it while modal, support `Escape`, and return to the invoking element when it closes unless workflow logic requires a different destination.  
https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

A modal MUST therefore:

- have an accessible name;
- move focus inside on open;
- contain keyboard focus;
- make underlying content inert;
- support `Escape`, except where dismissal would be unsafe;
- include a visible dismissal mechanism where dismissal is permitted;
- restore focus meaningfully.

### Initial focus

Default to the first logical interactive element.

However, initial focus SHOULD move to static introductory content rather than an action when:

- content is substantial;
- users need to understand context before acting.

For a destructive confirmation, initial focus SHOULD usually be on the least destructive reasonable action rather than the destructive primary action.

### Outside click

Outside-click dismissal MAY be enabled only when dismissal is harmless.

It MUST NOT dismiss:

- destructive confirmations awaiting explicit choice;
- unsaved form work without recovery;
- authentication challenges;
- critical warnings requiring acknowledgement.

## Anti-patterns

- newsletter signup modal while working;
- modal containing an entire settings application;
- auto-opening modal for low-priority product news;
- clicking backdrop deletes unsaved work;
- destructive button receiving initial focus unnecessarily.

## Checklist

- [ ] Interruption is justified.
- [ ] Dialog is short/focused.
- [ ] Focus enters correctly.
- [ ] Focus cannot escape.
- [ ] Escape behavior defined.
- [ ] Outside-click behavior defined.
- [ ] Focus restoration defined.
- [ ] Unsaved work cannot disappear silently.

## Canonical summary

**A modal is an interruption budget. Spend it only on a decision or task worth stopping the user's workflow.**

---

# 5. Alert Dialogs and Destructive Confirmation

## Purpose

Protect users from consequential or difficult-to-reverse actions.

## Rules

A confirmation dialog SHOULD be used when all three are true:

1. the action has meaningful consequences;
2. the consequence cannot be easily undone;
3. the user may reasonably trigger it accidentally.

Do not confirm every destructive-looking action if robust undo is safer and faster.

### Confirmation copy

The dialog MUST name:

- object;
- action;
- consequence.

Prefer:

> Delete **Forest survey 2026**?  
> This permanently deletes 18 observations and cannot be undone.

Avoid:

> Are you sure?

### Buttons

Actions MUST name the outcome.

```text id="9jlbo8"
Cancel
Delete survey
```

not:

```text id="e5ic52"
No
Yes
```

The destructive action MUST use the product's destructive token.

If additional verification is necessary for especially high-impact actions, requiring typed confirmation MAY be appropriate.

It SHOULD NOT become routine friction for ordinary deletion.

## Anti-patterns

- “Are you sure?” without consequence;
- multiple confirmations for the same low-risk action;
- destructive CTA styled identically to cancel;
- modal confirmation when simple undo is reliable.

## Checklist

- [ ] Consequence warrants blocking confirmation.
- [ ] Object is named.
- [ ] Consequence is explicit.
- [ ] CTA names destructive action.
- [ ] Cancel is obvious.
- [ ] Undo considered first.

## Canonical summary

**Confirmation exists to prevent consequential mistakes, not to distribute liability to the user.**

---

# 6. Non-modal Panels, Sheets and Drawers

## Purpose

Expose secondary content or editing while preserving access to primary context.

NN/g notes that nonmodal dialogs preserve workflow better because users can continue interacting with underlying content.  
https://www.nngroup.com/articles/modal-nonmodal-dialog/

## Rules

Use a non-modal panel when users need to:

- compare information;
- reference underlying content;
- switch repeatedly between primary content and secondary controls;
- maintain context during editing.

Use a **sheet/side drawer** when a secondary task requires more room than a popover but does not warrant navigation.

Examples:

- record details;
- filter configuration;
- layer settings;
- edit metadata;
- inspect activity history.

### Width

A sheet SHOULD not cover so much of the application that the “preserved context” becomes meaningless.

If the task routinely requires most of the viewport, use a page.

### Modal versus non-modal sheet

A sheet MAY be modal when:

- mobile viewport requires focus;
- action must complete before returning.

Desktop detail/inspector sheets SHOULD be non-modal when parallel reference is essential.

## Anti-patterns

- side panel containing a six-step workflow;
- non-modal panel covering the exact data users need to reference;
- opening sheets on top of sheets repeatedly;
- using a drawer merely because navigation is difficult.

## Checklist

- [ ] Underlying context is genuinely useful.
- [ ] Panel does not obscure required context.
- [ ] Modality is intentional.
- [ ] Escape/close behavior defined.
- [ ] Responsive mobile pattern defined.

## Canonical summary

**Use panels when context and secondary work need to coexist.**

---

# 7. Popovers

## Purpose

Present compact anchored controls or supplemental information.

## Rules

Use a popover when:

- content belongs directly to a trigger;
- interaction is brief;
- content can disappear safely;
- the user should remain in the current context.

Good uses:

- compact filters;
- date chooser;
- color controls;
- quick formatting;
- small settings groups.

A popover SHOULD NOT become a miniature application.

Popover width SHOULD follow content, subject to viewport limits.

### Dismissal

Typical dismissal:

- `Escape`;
- selecting an action where selection completes the task;
- outside interaction where safe;
- activating the trigger again.

A popover containing unfinished input SHOULD NOT disappear through incidental pointer movement.

## Anti-patterns

- long forms inside popovers;
- hidden nested scrolling;
- critical error messages in disappearing popovers;
- popover that closes when moving pointer from trigger to content.

## Checklist

- [ ] Trigger relationship is clear.
- [ ] Content is compact.
- [ ] Keyboard path exists.
- [ ] Outside dismissal is safe.
- [ ] Viewport collision handled.

## Canonical summary

**A popover is anchored temporary workspace, not navigation.**

---

# 8. Tooltip

## Purpose

Provide a short explanation of a control or term without adding persistent visual clutter.

Current shadcn/ui describes a tooltip as information displayed when an element receives keyboard focus or pointer hover.  
https://ui.shadcn.com/docs/components/base/tooltip

## Rules

Tooltips SHOULD:

- contain brief supporting text;
- appear on hover **and keyboard focus**;
- remain available long enough to read;
- not steal focus;
- disappear on `Escape` where supported;
- remain noninteractive.

A tooltip MUST NOT contain:

- buttons;
- forms;
- required instructions;
- critical warnings;
- information necessary to use the application.

If the user needs to interact with the content, use a popover or hovercard.

## Anti-patterns

- tooltip-only field labels;
- paragraph-length tooltip;
- action button inside tooltip;
- tooltip that exists only on hover and cannot be triggered by keyboard.

## Checklist

- [ ] Content is optional.
- [ ] Content is brief.
- [ ] Keyboard trigger works.
- [ ] No interactive content.
- [ ] Essential meaning exists elsewhere.

## Canonical summary

**Tooltips clarify; they MUST NOT carry task-critical information.**

---

# 9. Hovercards

## Purpose

Preview richer reference information without navigating.

## Rules

Hovercards MAY contain richer content than tooltips:

- profile preview;
- metadata;
- object summary;
- link preview.

A hovercard SHOULD open via:

- pointer hover;
- keyboard focus where the preview is useful.

It MUST NOT become the only access path to its information.

Interactive actions SHOULD be kept minimal; if interaction becomes primary, use a popover.

Hovercards SHOULD use a modest open delay to reduce accidental activation.

## Anti-patterns

- card appears while pointer merely crosses the page;
- essential permission details exist only inside hover;
- large interactive dashboard inside a hovercard.

## Checklist

- [ ] Content is supplemental.
- [ ] Accidental activation is controlled.
- [ ] Keyboard users can access equivalent information.
- [ ] Primary content remains reachable elsewhere.

## Canonical summary

**Hovercards preview information; they do not own it.**

---

# 10. Dropdown and Context Menus

## Purpose

Present compact command sets.

shadcn/ui defines dropdown menus as a set of actions or functions triggered by a control.  
https://ui.shadcn.com/docs/components/radix/dropdown-menu

## Rules

### Dropdown menu

Use for commands associated with a visible trigger.

Menu items SHOULD:

- use verbs for actions;
- group related commands;
- display shortcuts when helpful;
- indicate selection state where relevant.

Destructive commands SHOULD be visually distinguished and normally separated from routine commands.

### Context menu

Use when commands are naturally tied to the object under pointer or keyboard context.

A context menu MUST NOT be the sole way to reach essential commands.

Every context-menu operation SHOULD also exist through a discoverable command path.

### Keyboard

Menus MUST support:

- arrow-key navigation;
- `Enter`/`Space` activation as appropriate;
- `Escape` dismissal;
- focus restoration.

## Anti-patterns

- 40-item unstructured menus;
- putting forms into dropdown menus;
- right-click-only deletion;
- menu item that opens another menu that opens another menu beyond reasonable depth.

## Checklist

- [ ] Commands fit the trigger context.
- [ ] Essential commands exist outside context menu.
- [ ] Keyboard behavior is standard.
- [ ] Destructive items are differentiated.
- [ ] Grouping is meaningful.

## Canonical summary

**Menus compress commands, not workflows.**

---

# 11. Lightboxes

## Purpose

Provide focused inspection of media while preserving page context.

## Rules

Use a lightbox for:

- high-resolution image inspection;
- document/page preview;
- media gallery.

It MAY be modal because the viewing task temporarily supersedes the page.

Lightboxes MUST provide:

- obvious close;
- `Escape`;
- keyboard next/previous for galleries;
- accessible media names/descriptions where applicable;
- zoom controls that do not trap users.

The underlying page scroll position MUST be restored after close.

## Anti-patterns

- lightbox for ordinary text;
- opening content at unreadably enlarged scale;
- controls appearing only on hover;
- closing and returning users to the top of the page.

## Checklist

- [ ] Media focus warrants overlay.
- [ ] Keyboard navigation works.
- [ ] Close is persistent.
- [ ] Scroll position restores.
- [ ] Media semantics exist.

## Canonical summary

**Lightboxes temporarily enlarge media; they MUST preserve the place users came from.**

---

# 12. Bottom Sheets on Mobile

## Purpose

Provide thumb-accessible secondary actions or context on small screens.

NN/g distinguishes modal and nonmodal bottom sheets; modal sheets block other interaction while nonmodal versions permit continued use of underlying content.  
https://www.nngroup.com/articles/bottom-sheet/

## Rules

Use a bottom sheet when:

- the interaction is contextual;
- vertical expansion suits mobile ergonomics;
- replacing a desktop popover/drawer improves usability.

Bottom sheets MAY support drag dismissal when:

- dismissal is safe;
- accidental drag will not lose data.

A sheet with unsaved state MUST require explicit confirmation before destructive drag dismissal, or disable drag dismissal.

### Snap points

Use multiple snap points only when each state has a meaningful purpose.

Do not add snap states for visual novelty.

### Background interaction

Modal bottom sheet:

- background inert;
- scroll locked.

Non-modal bottom sheet:

- background may remain interactive if content relationship remains understandable.

## Anti-patterns

- every mobile dialog converted to draggable sheet;
- drag-to-dismiss loses form work;
- nearly full-screen sheet masquerading as persistent navigation;
- essential controls below unreachable snap states.

## Checklist

- [ ] Sheet improves mobile task.
- [ ] Modality explicit.
- [ ] Drag behavior safe.
- [ ] Snap points purposeful.
- [ ] Keyboard/screen-reader dismissal exists.

## Canonical summary

**A bottom sheet is a mobile interaction pattern, not merely a dialog with rounded top corners.**

---

# 13. Stacking and Layering Contract

## Purpose

Prevent arbitrary z-index escalation and ambiguous nested overlays.

## Rules

All layering MUST use semantic layer tokens.

Canonical root contract:

```text id="9apw3q"
--z-base:             0
--z-raised:          10
--z-sticky:         100
--z-navigation:     200
--z-menu:           400
--z-popover:        450
--z-tooltip:        500
--z-panel:          600
--z-modal-backdrop: 700
--z-modal:          710
--z-alert-dialog:   720
--z-notification:   800
--z-critical:       900
```

These are **system tokens**, not arbitrary numeric permissions.

Teams MUST NOT introduce values such as:

```text id="gn4yyt"
z-index: 99999
```

to “fix” local stacking bugs.

### Portal ownership

Overlay primitives SHOULD portal into an approved application overlay root unless a component explicitly requires local containment.

### Local stacking

Within an overlay, child layers SHOULD use a local stacking context.

Example:

```text id="2kjj90"
modal
  └── combobox popover
      └── tooltip
```

The child MAY visually appear above its parent without receiving a global application-level layer token.

### Nested modals

Nested blocking modals SHOULD be avoided.

Use only when:

- second decision cannot reasonably be expressed in the current dialog;
- returning to the parent context remains unambiguous.

No more than one blocking decision layer SHOULD normally be visible.

## Anti-patterns

- `9999` wars;
- toast under modal;
- tooltip hidden behind popover;
- nested modal chains;
- app bar appearing over modal backdrop.

## Checklist

- [ ] Semantic z-token used.
- [ ] Overlay root is correct.
- [ ] Child overlays layer locally.
- [ ] Blocking layers are minimized.
- [ ] Toast and system notifications remain visible when appropriate.

## Canonical summary

**z-index is architecture, not arithmetic.**

---

# 14. Focus, Scroll and Dismissal

## Purpose

Define predictable lifecycle behavior for overlays.

## Rules

### Modal focus

Per WAI APG, modal focus MUST remain inside the dialog until it closes.  
https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### Focus restoration

On close:

1. return focus to the trigger;
2. if trigger no longer exists, move to the nearest logical next location;
3. if closing completed a workflow, focus MAY move to the newly relevant result.

### Scroll locking

Modal overlays MUST lock background scrolling.

The overlay itself MAY scroll where content exceeds viewport height.

A modal MUST NOT create two competing vertical scroll regions unless unavoidable.

### Escape

`Escape` SHOULD dismiss:

- dialog;
- popover;
- menu;
- tooltip;
- drawer;
- lightbox.

Exceptions require deliberate safety reasons.

### Outside click

Outside-click dismissal is appropriate for:

- menus;
- lightweight popovers;
- harmless informational overlays.

It SHOULD NOT dismiss:

- destructive confirmation;
- significant unsaved input;
- mandatory critical acknowledgement.

### Drag dismissal

Drag dismissal MUST follow the same safety rule as outside click.

### Close icon

Where an overlay supports dismissal, a visible close action SHOULD normally be provided unless another action is unmistakably equivalent.

## Anti-patterns

- focus jumps to page body after close;
- page scrolls beneath dialog;
- Escape closes unsaved workflow silently;
- backdrop click acts differently each time.

## Checklist

- [ ] Initial focus defined.
- [ ] Focus containment defined.
- [ ] Focus restoration defined.
- [ ] Background scroll behavior defined.
- [ ] Escape behavior defined.
- [ ] Pointer dismissal defined.
- [ ] Drag dismissal defined.

## Canonical summary

**Every overlay MUST have a deterministic entry and exit path.**

---

# 15. Feedback Taxonomy

## Purpose

Choose feedback according to interruption and persistence.

Carbon differentiates inline, toast, actionable, modal, banner, and panel notification types according to disruption and persistence.  
https://carbondesignsystem.com/patterns/notification-pattern/

## Rules

### 15.1 Passive

Examples:

- status dot;
- badge;
- count;
- saved indicator;
- connectivity indicator.

Use when:

- information is continuously relevant;
- no immediate user action is needed.

Passive indicators MUST have accessible text or equivalent semantics.

### 15.2 Transient

Examples:

- toast;
- snackbar.

Use when:

- event just occurred;
- user benefits from acknowledgement;
- no lasting page context is required.

Examples:

> Link copied.

> Changes saved.

> Item moved to archive. Undo.

### 15.3 Persistent

Examples:

- banner;
- inline alert;
- callout.

Use when:

- condition persists;
- user may need to reference the message later;
- content affects a page, section, or service.

### 15.4 Blocking

Example:

- modal/alert dialog.

Use only when:

- user cannot safely continue;
- immediate decision is required.

## Anti-patterns

- transient toast for persistent outage;
- modal for passive success;
- status dot for urgent action;
- banner for one input error.

## Checklist

- [ ] Feedback lifetime matches state lifetime.
- [ ] Blocking only when necessary.
- [ ] Local state remains local.
- [ ] Passive state remains discoverable.

## Canonical summary

**Feedback duration MUST be at least as long as the relevance of the state.**

---

# 16. Feedback Decision Tree

## Purpose

Provide the canonical selection path.

## Rules

Use this sequence:

```text id="7id8es"
Did the user explicitly trigger an action?
│
├─ No
│  │
│  ├─ Does the information require immediate action?
│  │    ├─ Yes → blocking dialog only if continuing is unsafe
│  │    └─ No
│  │         ├─ Is it tied to one location? → inline alert/status
│  │         └─ Is it broad/persistent? → banner / notification centre
│  │
│  └─ Is it merely ambient state? → badge / status indicator
│
└─ Yes
   │
   ├─ Did the action complete successfully?
   │    ├─ Is the result obvious in-place?
   │    │     ├─ Yes → no extra notification
   │    │     └─ No → brief toast/status
   │
   ├─ Is the action still running?
   │    ├─ Progress measurable? → determinate progress
   │    ├─ Short/local? → inline pending state
   │    └─ Long/background? → persistent background task indicator
   │
   └─ Did it fail?
        ├─ Can failure be fixed locally? → inline alert/error
        ├─ Does it affect whole page/service? → banner
        ├─ Is retry optional/transient? → toast may supplement
        └─ Must user decide before continuing? → dialog
```

### Suppression rule

If the visible UI already changes clearly enough to confirm the result, a toast SHOULD NOT duplicate the same information.

Example:

Clicking **Archive** removes the row and moves it into an Archive view.

A toast may be justified only if it provides a useful undo action.

## Anti-patterns

- toast after every checkbox toggle;
- “Saved” toast while persistent Saved status is already visible;
- modal for network retry that could remain inline.

## Checklist

- [ ] Decision tree applied.
- [ ] Duplicate feedback removed.
- [ ] Stronger interruption has explicit reason.

## Canonical summary

**Do not notify users twice for one state unless each notification serves a different recovery need.**

---

# 17. Notification Severity

## Purpose

Create a predictable semantic notification language.

Carbon defines informational, success, warning, and error notification statuses.  
https://carbondesignsystem.com/patterns/notification-pattern/

## Rules

Canonical severity:

| Severity | Meaning | Example |
|---|---|---|
| **Info** | Neutral relevant state | Scheduled maintenance tonight |
| **Success** | Requested operation completed | Import completed |
| **Warning** | Risk requiring awareness | Token expires soon |
| **Error** | Operation failed/problem exists | Export failed |
| **Critical** | Immediate severe risk | Security/session safety event |

`Critical` is an application policy tier, not an excuse to use modal dialogs automatically.

### Color + icon + wording

Severity MUST use at least two perceptual channels.

Recommended:

```text id="7l4tok"
Info     → semantic info color + info icon + neutral wording
Success  → success color + check icon + completion wording
Warning  → warning color + warning icon + consequence wording
Error    → destructive/error color + error icon + recovery wording
Critical → critical treatment + explicit consequence/action
```

Color MUST NOT carry severity by itself.

### Titles

Titles SHOULD describe the state:

> Export failed

rather than:

> Error

### Actions

A notification MAY contain one primary recovery action.

Avoid multiple competing buttons.

## Anti-patterns

- green success without textual confirmation;
- warning icon used for neutral information;
- title “Oops!”;
- critical styling for marketing announcements.

## Checklist

- [ ] Severity reflects state.
- [ ] Icon matches severity.
- [ ] Text carries meaning without color.
- [ ] Action is specific.
- [ ] Critical level is genuinely critical.

## Canonical summary

**Severity describes consequence; urgency determines interruption.**

---

# 18. Urgency, Interruption and Notification Delivery

## Purpose

Prevent notification systems from training users to ignore them.

Apple recommends accurately representing urgency and provides notification interruption models that allow lower-priority information to respect Focus and scheduled delivery.  
https://developer.apple.com/design/human-interface-guidelines/managing-notifications

## Rules

### Urgency classes

Canonical application policy:

```text id="fr77hn"
passive
normal
time-sensitive
critical
```

### Passive

Examples:

- background export completed;
- weekly activity available.

SHOULD respect:

- do-not-disturb;
- digest preferences;
- scheduled delivery.

### Normal

Examples:

- mention;
- comment;
- assigned work.

SHOULD normally respect user notification preferences.

### Time-sensitive

Use only when delaying the information substantially reduces its usefulness.

Examples:

- meeting beginning;
- expiring one-time workflow;
- live operational condition.

Apple advises using time-sensitive interruption only for information genuinely relevant now or in the near term.  
https://developer.apple.com/design/human-interface-guidelines/managing-notifications

### Critical

Use only for severe safety/security or equivalent operational scenarios established by the product domain.

Marketing, engagement, feature announcements, and generic reminders MUST NOT be classified critical.

## Anti-patterns

- “urgent” because product team wants higher engagement;
- bypassing DND for routine comments;
- notification badges for promotional campaigns;
- escalating severity when user ignores prior notifications.

## Checklist

- [ ] Urgency is accurate.
- [ ] DND behavior specified.
- [ ] Delivery preference respected.
- [ ] Marketing cannot masquerade as operational urgency.

## Canonical summary

**Notification urgency is a trust contract. Overstating urgency destroys the contract.**

---

# 19. Notification Centre, Digests and Do-Not-Disturb

## Purpose

Allow high-volume products to communicate without forcing real-time interruption.

## Rules

A notification centre SHOULD exist when:

- events are numerous;
- users may need historical retrieval;
- multiple resources generate events;
- acknowledgement is not immediate.

### Notification centre anatomy

Each item SHOULD show:

- what happened;
- object/person/system involved;
- time;
- read/unread state where useful;
- direct destination;
- available action where appropriate.

### Grouping

Related events SHOULD group.

Example:

> 8 comments on **Wetland restoration plan**

rather than eight nearly identical items.

### Read state

Read/unread MUST NOT be used as a substitute for unresolved/resolved.

These are different concepts.

### Do-not-disturb

Users SHOULD be able to suppress noncritical interruptions for:

- defined time windows;
- meetings/focus;
- local working schedules.

### Digests

Digest mode SHOULD combine low-urgency events into one useful summary.

Digest content MUST preserve enough information to decide what needs attention.

### Preference granularity

Large products SHOULD allow notification preferences by:

- event class;
- channel;
- project/workspace;
- urgency where applicable.

## Anti-patterns

- notification centre as infinite chronological dump;
- marking notification read automatically before user sees it;
- daily digest of events that already required immediate action;
- DND bypass for product announcements.

## Checklist

- [ ] History needed before centre is introduced.
- [ ] Events group meaningfully.
- [ ] Read and resolved differ.
- [ ] DND supported where event volume warrants.
- [ ] Digest contains actionable summary.
- [ ] Preferences are usable rather than excessively granular.

## Canonical summary

**Notification systems SHOULD optimize for informed attention, not maximum delivery volume.**

---

# 20. Never Notify in the Wrong Surface

## Purpose

Keep feedback attached to the state that caused it.

## Rules

### Validation error

Use:

- field error;
- form error summary.

Do **not** primarily use:

- toast;
- system notification.

### Upload error

Use:

- file row/status;
- upload panel.

Toast MAY supplement only when upload continues in background.

### Background export completion

Use:

- task centre;
- persistent completion state;
- optional toast if user remains in app;
- system notification only if user opted into relevant external notifications.

### Service outage

Use:

- page/application banner.

Do not issue dozens of repeated toasts.

### Permission failure

Use:

- local inline state when affecting one operation;
- dialog only if workflow cannot proceed;
- banner if broad access changed.

### Destructive action confirmation

Use:

- alert dialog.

Do not use toast asking users to “confirm” after destructive state has already committed unless true undo is supported.

### Form save success

Use:

- saved state adjacent to form/action.

Toast only when the save outcome would otherwise be invisible.

GOV.UK specifically advises using field/error-summary patterns for validation rather than a general notification banner.  
https://design-system.service.gov.uk/components/notification-banner/

## Anti-patterns

- every error routed through toast infrastructure;
- login session expiry only shown inside an offscreen settings card;
- server outage reported as field validation;
- task completion notified on every available channel.

## Checklist

- [ ] Surface corresponds to affected scope.
- [ ] Stronger global surface adds real value.
- [ ] Duplicate surfaces are justified.

## Canonical summary

**Feedback belongs where the user can act on it.**

---

# 21. Toast and Snackbar Standard

## Purpose

Provide brief non-blocking feedback about recent events.

Carbon describes toasts as short time-based messages, generally more disruptive than inline notifications.  
https://carbondesignsystem.com/patterns/notification-pattern/

Material describes snackbars as short updates about application processes that should not interrupt the current experience.  
https://m3.material.io/components/snackbar/overview

## Rules

Use toasts for:

- copied;
- saved;
- moved;
- queued;
- undo opportunity;
- transient background completion.

A toast SHOULD contain:

- short message;
- optional one action;
- optional dismiss.

### Queueing

Only one or a small bounded number of toasts SHOULD be visible at once.

Material recommends displaying consecutive snackbars one at a time.  
https://m3.material.io/components/snackbar/guidelines

A toast queue MUST collapse repetitive events.

Instead of:

```text id="tu3sb6"
Saved
Saved
Saved
Saved
Saved
```

use:

```text id="nmycn2"
5 changes saved
```

or no toast if save state is already visible.

### Actionable toast

If a toast contains an action, it SHOULD remain available long enough for the user to understand and operate the action.

Carbon recommends persistent behavior for actionable toast-style notifications rather than allowing them to disappear before action can be taken.  
https://carbondesignsystem.com/patterns/notification-pattern/

### Focus

Toast appearance MUST NOT steal keyboard focus.

Material's accessibility guidance likewise recommends announcing snackbars without grabbing focus or preventing the current task.  
https://m3.material.io/components/snackbar/accessibility

## Anti-patterns

- toast spam;
- long paragraphs;
- multiple actions;
- focus jumps to toast;
- critical error disappears automatically;
- toast queue obscures primary controls.

## Checklist

- [ ] Message is transient.
- [ ] No duplicate visible feedback.
- [ ] Queue is bounded.
- [ ] Action remains operable.
- [ ] Focus remains with task.

## Canonical summary

**A toast confirms an event; it does not become a temporary dialog.**

---

# 22. Banners and Inline Alerts

## Purpose

Communicate persistent state at the relevant scope.

## Rules

### Banner

Use when condition affects:

- full page;
- whole workspace;
- service/system.

Examples:

- outage;
- delayed processing;
- maintenance;
- account restriction.

A banner SHOULD remain until:

- condition ends;
- user explicitly dismisses a safely dismissible notice.

GOV.UK's notification-banner guidance uses banners for page/service-wide information and specifically excludes form-validation use.  
https://design-system.service.gov.uk/components/notification-banner/

### Inline alert

Use when condition applies to:

- component;
- section;
- card;
- form subsection.

Place it immediately adjacent to the affected area.

### Dismissibility

Persistent unresolved problems SHOULD NOT be dismissible unless users can later recover them.

If dismissed, persistent conditions SHOULD remain available through another reliable surface.

## Anti-patterns

- dismissing an outage notice permanently while outage persists;
- banner describing one failed table row;
- success banner occupying page for routine save.

## Checklist

- [ ] Scope matches message.
- [ ] Persistence matches condition.
- [ ] Dismissal does not hide unresolved critical state.

## Canonical summary

**Persistent conditions deserve persistent surfaces.**

---

# 23. Progress and Loading

## Purpose

Tell users that the system is working and, where possible, how much work remains.

Carbon states that loading patterns should communicate extended processing, recommends progress indicators for processes longer than a brief moment, and uses skeleton states for initial content loading.  
https://carbondesignsystem.com/patterns/loading-pattern/

## Rules

### 23.1 No indicator for effectively immediate operations

The UI SHOULD avoid flashing spinners for operations that resolve within the loading-indicator delay token.

This prevents visual flicker.

### 23.2 Determinate progress

Use when measurable progress exists.

Examples:

- upload bytes;
- known batch count;
- file processing stages with reliable completion percentages.

Show:

```text id="ly0rrc"
Uploading 62%
```

where percentage is genuinely measurable.

Do not fabricate linear percentages over unknown work.

### 23.3 Indeterminate progress

Use when:

- work is happening;
- duration is unknown;
- progress cannot be measured reliably.

An indeterminate spinner SHOULD remain local to the affected region whenever possible.

### 23.4 Skeletons

Use skeletons when:

- initial layout is predictable;
- content is being fetched;
- preserving spatial expectation reduces layout shift.

Carbon recommends skeleton states for initial load, representing simplified versions of expected components.  
https://carbondesignsystem.com/patterns/loading-pattern/

Skeletons MUST roughly match actual layout.

A skeleton SHOULD NOT mimic content that may not exist.

### 23.5 Progressive loading

Load useful content incrementally when independent parts are available.

Do not hold an entire page behind a spinner because one secondary module is slow.

### 23.6 Spinner placement

Spinner scope MUST equal processing scope.

```text id="4vqeva"
button operation → button/near-button
card refresh      → card
table load        → table region
whole app init    → page/app
```

## Anti-patterns

- spinner appearing for 100 ms;
- indeterminate progress for known upload percentage;
- fake progress bars;
- full-page blocker because one chart is loading;
- skeleton layout unrelated to loaded content.

## Checklist

- [ ] Indicator delay avoids flicker.
- [ ] Scope matches operation.
- [ ] Determinate used where measurable.
- [ ] No fake precision.
- [ ] Skeleton resembles final layout.
- [ ] Progressive rendering considered.

## Canonical summary

**Loading feedback MUST communicate real work without inventing progress.**

---

# 24. Optimistic UI

## Purpose

Reduce perceived latency for high-confidence reversible operations.

## Rules

Optimistic UI MAY be used when:

- operation usually succeeds;
- change is reversible;
- conflict cost is low;
- failure can be reconciled clearly.

Examples:

- favorite;
- reaction;
- lightweight status;
- reorder.

It SHOULD NOT be used carelessly for:

- payment;
- account deletion;
- security permission changes;
- irreversible database mutation.

### States

Optimistic flows still require:

```text id="qfaauf"
local optimistic
→ server confirmed
or
→ server failed → rollback/recovery
```

Success feedback SHOULD NOT claim durable persistence before confirmation if that distinction matters.

### Failure

Failure MUST:

- reconcile UI;
- explain what did not persist;
- preserve user's intent where possible.

## Anti-patterns

- optimistic deletion with no undo;
- showing Saved before write starts;
- keeping optimistic value after server rejection.

## Checklist

- [ ] Failure is rare enough.
- [ ] Action is reversible.
- [ ] Server confirmation exists.
- [ ] Failure rollback exists.
- [ ] Copy does not overstate persistence.

## Canonical summary

**Optimistic UI may anticipate success; it MUST remain capable of admitting failure.**

---

# 25. Background Tasks and Long-running Jobs

## Purpose

Support work that outlives the current view or session.

Carbon recommends escalating long-running processing beyond ordinary loading indicators and considering notification when processes take substantial time.  
https://carbondesignsystem.com/patterns/loading-pattern/

## Rules

A task that can safely run independently SHOULD detach from the initiating screen.

Examples:

- export;
- raster processing;
- bulk import;
- report generation;
- large data analysis.

### Job state

Canonical states:

```text id="ti0puf"
Queued
Running
Paused
Waiting for input
Completed
Completed with warnings
Failed
Cancelled
```

### Persistent task surface

Long-running work SHOULD appear in a:

- task centre;
- activity panel;
- job list.

The task MUST remain inspectable after navigation.

### Progress

If measurable, show:

- percent or items completed;
- stage;
- estimated remaining work only when reliable.

### Resumability

If task can resume after interruption, status MUST explain:

- whether work is retained;
- what will resume;
- what needs to be retried.

### Completion notification

Completion MAY produce:

- in-app toast while active;
- notification-centre item;
- external notification where explicitly enabled.

The task record SHOULD remain discoverable even if transient completion feedback is missed.

## Anti-patterns

- forcing users to stare at full-screen spinner for ten-minute export;
- job disappears when browser reloads;
- “99%” for minutes;
- failure with no retry;
- external notification plus toast plus email plus banner for same routine task.

## Checklist

- [ ] Job survives navigation where appropriate.
- [ ] Lifecycle states defined.
- [ ] Progress is truthful.
- [ ] Retry/resume behavior exists.
- [ ] Completion remains discoverable.
- [ ] Notification channels are not duplicated unnecessarily.

## Canonical summary

**Long-running work SHOULD become a durable task, not a long-lived spinner.**

---

# 26. Timing Tokens

## Purpose

Standardize perceived responsiveness and animation timing.

These values are **house design tokens**, not universal human-performance thresholds.

## Rules

Canonical interaction timing:

```text id="ne5h7t"
--duration-instant:      0ms
--duration-fast:       100ms
--duration-standard:   180ms
--duration-moderate:   250ms
--duration-slow:       350ms
--duration-emphasis:   500ms

--delay-loading:       300ms
--delay-tooltip:       500ms
--delay-hovercard:     350ms
--delay-toast-dismiss: 5000ms
```

### Duration guidance

**0–100 ms**
- direct pressed/selected state;
- opacity/state swap;
- immediate drag feedback.

**100–200 ms**
- menu;
- tooltip;
- compact popover;
- small control transformation.

**180–300 ms**
- dialogs;
- drawers;
- sheet transitions;
- standard content transitions.

**300–500 ms**
- larger spatial movement;
- deliberate success moment used rarely.

Routine interactions SHOULD NOT exceed **500 ms** solely for visual effect.

### Loading delay

Loading indicators SHOULD normally wait approximately `--delay-loading` before rendering to avoid spinner flashes for fast operations.

If operation finishes before the delay, no spinner is required.

### Toast duration

Simple informational toast SHOULD use approximately the standard dismiss token.

Content requiring reading or action MUST remain longer or persist until dismissal.

## Anti-patterns

- every transition 500 ms;
- animation delay inserted before API request;
- spinner appears and disappears in one frame;
- 3-second hovercard delay.

## Checklist

- [ ] Token used.
- [ ] Animation duration proportional to distance/importance.
- [ ] Motion never delays logic.
- [ ] Loading delay prevents flicker.
- [ ] Actionable toast duration is sufficient.

## Canonical summary

**Timing tokens create rhythm; they MUST NOT make the product feel ceremonious.**

---

# 27. Motion and Easing Tokens

## Purpose

Create predictable motion that communicates spatial and state relationships.

Apple recommends brief, precise motion tied to feedback and cautions against making users spend unnecessary time watching motion.  
https://developer.apple.com/design/human-interface-guidelines/motion

Material 3 similarly treats transitions as short animations connecting elements and views.  
https://m3.material.io/styles/motion/transitions

## Rules

Canonical easing:

```text id="kkbe2l"
--ease-standard:    cubic-bezier(0.2, 0, 0, 1)
--ease-enter:       cubic-bezier(0, 0, 0, 1)
--ease-exit:        cubic-bezier(0.3, 0, 1, 1)
--ease-linear:      linear
```

Use:

- **enter easing** for appearing elements;
- **exit easing** for disappearing elements;
- **standard easing** for position/state transitions;
- **linear** only for continuously measured progress or mechanically constant motion.

### Motion hierarchy

Small local state:

- fade;
- scale 0.98 → 1;
- color/border change.

Spatial overlay:

- subtle translation from originating edge;
- opacity transition.

Large dramatic motion SHOULD be rare.

## Anti-patterns

- spring/bounce on every button;
- random easing per component;
- animation unrelated to origin/destination;
- overshoot on destructive confirmation.

## Checklist

- [ ] Motion explains relationship.
- [ ] Easing token used.
- [ ] Direction corresponds to spatial source.
- [ ] Motion is restrained for repetitive tasks.

## Canonical summary

**Motion SHOULD explain where state came from, where it went, or what changed.**

---

# 28. Micro-interactions

## Purpose

Provide immediate, lightweight feedback to direct manipulation.

## Rules

A micro-interaction SHOULD reinforce:

- action received;
- state changed;
- object moved;
- operation succeeded;
- threshold reached.

### Examples

Button press:

```text id="68zats"
default → pressed → pending → confirmed
```

Toggle:

```text id="fhe3iy"
off → transition → on
```

Drag:

```text id="mnd8f6"
picked up
→ valid target highlighted
→ invalid target rejected
→ placement preview
→ drop confirmed
```

### Drag feedback

Dragging MUST show:

- selected object;
- permissible target;
- resulting insertion position or geometry.

Invalid targets SHOULD visually reject the object before drop.

### Success moments

Success animation MAY be used when:

- action represents meaningful completion;
- it does not delay next action.

Examples:

- completing onboarding;
- publishing first project;
- finishing substantial import.

Routine row saves SHOULD NOT trigger confetti.

### Micro-interaction state truth

Animation MUST correspond to state.

A checkmark MUST NOT appear before the operation is confirmed unless it represents explicitly optimistic state.

## Anti-patterns

- celebratory animation for every save;
- drag object with no insertion cue;
- success animation while server request is still unresolved;
- hover animation that changes layout.

## Checklist

- [ ] Interaction acknowledges input quickly.
- [ ] State is truthful.
- [ ] Drag destination is visible.
- [ ] Success effect is proportionate.
- [ ] Animation does not block work.

## Canonical summary

**Micro-interactions SHOULD remove uncertainty, not add spectacle.**

---

# 29. Reduced Motion

## Purpose

Respect user motion preferences and reduce vestibular or cognitive burden.

W3C provides `prefers-reduced-motion` as a mechanism to prevent or reduce motion for users who request it.  
https://www.w3.org/WAI/WCAG22/Techniques/css/C39

## Rules

The product MUST honor:

```text id="2ufb8j"
@media (prefers-reduced-motion: reduce)
```

### Reduced-motion behavior

When reduced motion is requested:

- large translation SHOULD become fade or instant change;
- parallax MUST be removed;
- decorative looping animation SHOULD stop;
- auto-playing nonessential animation SHOULD stop;
- spring/overshoot SHOULD be removed;
- motion used only for emphasis SHOULD be minimized.

Essential state feedback MUST remain available through:

- text;
- icon;
- opacity;
- static state;
- haptic/audio only as optional supplements.

W3C's WCAG guidance specifically supports reducing interaction-triggered animation where users request it.  
https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html

## Anti-patterns

- “reduced motion” merely slows the animation;
- full-screen zoom still occurs;
- critical state exists only in animation;
- looping shimmer remains indefinitely.

## Checklist

- [ ] Preference is detected.
- [ ] Large spatial movement removed.
- [ ] Decorative loops disabled.
- [ ] Equivalent static feedback remains.
- [ ] Reduced mode is tested.

## Canonical summary

**Reduced motion means less motion, not slower motion.**

---

# 30. Sound and Haptics

## Purpose

Provide optional multimodal reinforcement.

Apple recommends considering haptics/audio as supplements to visual feedback rather than making motion the sole feedback channel.  
https://developer.apple.com/design/human-interface-guidelines/motion

## Rules

Sound/haptics MAY reinforce:

- successful scan;
- completed drag;
- warning threshold;
- important mobile confirmation.

They MUST NOT be the only indicator.

### Sound

Default application UI SHOULD remain silent unless the domain benefits materially.

Sound MUST NOT fire repeatedly during high-frequency operations.

### Haptics

Haptics SHOULD correspond to meaningful tactile events:

- snap;
- selection;
- success;
- warning.

Do not haptically acknowledge every minor state change.

### Preferences

Sound and haptic preferences SHOULD respect:

- OS settings;
- application preferences;
- silent/focus expectations.

## Anti-patterns

- success sound after every autosave;
- error sound with no visual text;
- intense haptic feedback for minor toggle;
- sound bypassing quiet-mode expectations.

## Checklist

- [ ] Multimodal feedback adds value.
- [ ] Visual/text equivalent exists.
- [ ] Frequency is controlled.
- [ ] User/system preferences respected.

## Canonical summary

**Sound and haptics MAY reinforce feedback; they MUST NOT become mandatory channels.**

---

# 31. Feedback Copy

## Purpose

Make system state understandable with minimal reading.

## Rules

Feedback copy MUST be:

- short;
- specific;
- factual;
- actionable where action exists;
- non-blaming.

### Preferred pattern

**State + consequence/recovery**

```text id="ydz7r7"
Upload failed. Retry the file.
```

```text id="gx7jro"
Changes saved.
```

```text id="xa33hw"
Connection lost. Changes will sync when you're back online.
```

### Avoid

```text id="ubop35"
Oops! Something went wrong.
```

when the system knows the problem.

### Success

Do not exaggerate ordinary operations.

Prefer:

> Project created.

Not:

> Amazing! Your incredible project has successfully been created! 🎉

unless brand context genuinely calls for expressive celebration.

### Error

Describe the state, not user behavior.

Prefer:

> We couldn't upload the file.

Avoid:

> You failed to upload the file.

### Actions

Buttons MUST describe the next action:

```text id="dcwmig"
Retry
Review errors
Restore draft
Open export
```

not:

```text id="fqom52"
OK
Got it
Continue
```

when a more precise label exists.

## Anti-patterns

- “Oops” everywhere;
- blame;
- raw API errors;
- excessive apology;
- ambiguous “OK” actions;
- success copy that overstates durability.

## Checklist

- [ ] State is specific.
- [ ] Recovery is clear.
- [ ] User is not blamed.
- [ ] Technical jargon removed.
- [ ] Action labels describe outcomes.

## Canonical summary

**Feedback copy SHOULD answer: what happened, what matters, and what can I do next?**

---

# 32. Common Feedback Copy Templates

## Purpose

Standardize recurring product language.

## Rules

| Situation | Canonical copy |
|---|---|
| Save success | `Changes saved.` |
| Autosave pending | `Saving…` |
| Autosave failed | `Couldn’t save. Your changes are still here.` |
| Copy | `Copied to clipboard.` |
| Move | `[Item] moved to [location].` |
| Delete with undo | `[Item] deleted. Undo` |
| Upload progress | `Uploading [filename] — [N]%` |
| Upload complete | `[Filename] uploaded.` |
| Upload failure | `Couldn’t upload [filename]. Retry.` |
| Processing | `Processing [item]…` |
| Background queued | `[Job] queued. You can leave this page.` |
| Background complete | `[Job] is ready.` |
| Background failed | `[Job] failed. Review details or retry.` |
| Connection lost | `Connection lost. We’ll retry automatically.` |
| Reconnected | `Connection restored.` |
| Session expiring | `Your session expires in [time]. Save your work or stay signed in.` |
| Permission changed | `You no longer have permission to edit this item.` |
| Conflict | `This item changed elsewhere. Review the latest version before continuing.` |
| Maintenance | `Some features are unavailable during scheduled maintenance.` |
| Partial bulk success | `[N] items completed. [M] need attention.` |
| Destructive confirmation | `Delete [item]? This cannot be undone.` |

## Anti-patterns

- vague state;
- passive voice that hides meaningful actor when relevant;
- excessive punctuation;
- emoji used as sole severity cue.

## Checklist

- [ ] Template matches actual state.
- [ ] Entity names are inserted safely.
- [ ] Message remains concise.

## Canonical summary

**Standard feedback copy reduces both user uncertainty and product-language drift.**

---

# 33. State Management Alignment

## Purpose

Ensure feedback corresponds exactly to application state.

## Rules

The UI MUST distinguish:

```text id="ej0081"
idle
pending
optimistic
confirmed
failed
stale
cancelled
background
```

### Pending

Show only after the operation actually begins.

### Optimistic

The visible state MAY update immediately, but the application MUST know it is not yet confirmed.

### Confirmed

Feedback MAY communicate completion.

### Failed

The prior safe state MUST be restored or recovery shown.

### Stale

If displayed information may no longer represent server state, the UI SHOULD expose refresh/conflict status.

### Cancelled

Cancellation SHOULD be distinguishable from failure.

Example:

> Export cancelled.

not:

> Export failed.

## Anti-patterns

- loading boolean controlling all lifecycle states;
- success toast emitted at request dispatch;
- cancellation treated as error;
- stale data silently treated as confirmed.

## Checklist

- [ ] Feedback maps to explicit state.
- [ ] Optimistic and confirmed are distinct.
- [ ] Failure can reconcile.
- [ ] Cancellation has own state.

## Canonical summary

**Feedback is a projection of state; if the state model is vague, the feedback will be misleading.**

---

# 34. API and Background-process Alignment

## Purpose

Map backend lifecycle into coherent human feedback.

## Rules

Common API state MUST map predictably.

```text id="md2qlx"
202 Accepted
→ queued/running state, not “complete”

429
→ rate-limit/retry guidance

409
→ conflict feedback

401/403
→ authentication/permission feedback

5xx
→ service/transient failure

partial result
→ explicit partial-success feedback
```

### Retry

Automatic retry SHOULD remain quiet while:

- retry count is low;
- user need not act.

Expose retry when:

- repeated retries fail;
- delay becomes meaningful;
- user action may help.

### Idempotency

UI feedback SHOULD assume users may:

- double click;
- reload;
- retry.

Backend idempotency belongs to API standards, but feedback MUST avoid presenting duplicate operations as separate successes when they represent one request.

## Anti-patterns

- `202` shown as completed;
- every retry emits toast;
- raw HTTP status in user-facing copy;
- duplicate completion notifications.

## Checklist

- [ ] API state maps to product state.
- [ ] Retry strategy visible only when needed.
- [ ] Partial success supported.
- [ ] Duplicate requests considered.

## Canonical summary

**Backend lifecycle and user-facing lifecycle MUST tell the same story.**

---

# 35. Security-sensitive Feedback

## Purpose

Communicate security state without exposing sensitive data or training users to ignore serious warnings.

## Rules

Security feedback SHOULD distinguish:

- authentication required;
- authorization denied;
- session expiring;
- suspicious activity;
- credential rotation;
- destructive security change.

Critical security state MAY justify blocking interruption where continuing would be unsafe.

A security notification MUST NOT expose:

- secret values;
- access tokens;
- internal risk scores;
- sensitive implementation details.

### Session expiry

If unsaved work may be lost, warn before expiry with enough time to act.

### Permission changes

When permissions change during a workflow:

- stop unsafe mutation;
- preserve local work where appropriate;
- explain changed capability.

## Anti-patterns

- security warning as disappearing toast;
- low-risk notification styled as severe alarm;
- raw authentication exception;
- permission failure silently discarding edits.

## Checklist

- [ ] Interruption proportional to risk.
- [ ] Sensitive details hidden.
- [ ] Work preserved where possible.
- [ ] Recovery path exists.

## Canonical summary

**Security feedback MUST be hard to miss when necessary and hard to misuse as noise.**

---

# 36. Overlay Accessibility Checklist

## Purpose

Provide the mandatory review for any overlay.

## Rules

Every overlay review MUST cover the following.

### Naming and semantics

- [ ] Overlay has correct semantic role.
- [ ] Dialog has accessible name.
- [ ] Description is associated only when useful.
- [ ] Trigger has correct expanded/state semantics where applicable.

### Focus

- [ ] Focus moves into modal when opened.
- [ ] Modal focus remains contained.
- [ ] Non-modal overlay does not trap focus unnecessarily.
- [ ] Closing restores focus to trigger or logical successor.
- [ ] Focus remains visible.

WAI APG requires modal dialogs to contain tab navigation and restore focus meaningfully after closing.  
https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### Keyboard

- [ ] `Escape` dismissal works where safe.
- [ ] Menus support arrow navigation.
- [ ] Tooltip can appear from keyboard focus.
- [ ] No pointer-only essential actions.
- [ ] Drag interaction has non-drag alternative where necessary.

### Underlying content

- [ ] Modal background is inert.
- [ ] Screen-reader navigation cannot escape into inactive content.
- [ ] Background scrolling is locked.

### Dismissal

- [ ] Visible close mechanism exists when applicable.
- [ ] Outside click does not cause data loss.
- [ ] Drag dismissal does not cause data loss.
- [ ] Destructive confirmation requires explicit action.

### Timing

- [ ] Transient content remains readable.
- [ ] Actionable notification does not disappear prematurely.
- [ ] Timeout is not required for critical information.

### Motion

- [ ] `prefers-reduced-motion` honored.
- [ ] Large motion has reduced alternative.
- [ ] Motion is not sole state cue.

### Zoom and viewport

- [ ] Overlay remains usable at browser zoom.
- [ ] Content can scroll inside viewport.
- [ ] Close/action controls remain reachable.
- [ ] Mobile safe areas handled.

### Announcement

- [ ] Toast/status is announced appropriately.
- [ ] Announcement does not steal focus unnecessarily.
- [ ] Repeated background updates do not create screen-reader spam.

Material recommends that snackbars be announced without taking focus from the user's task.  
https://m3.material.io/components/snackbar/accessibility

## Anti-patterns

- focus escapes modal;
- screen reader can access dimmed background;
- tooltip hover-only;
- action toast disappears before keyboard user reaches it;
- visual-only loading state;
- reduced-motion preference ignored.

## Checklist

The checklist above IS the release checklist.

## Canonical summary

**An overlay is accessible only when users can enter it, understand it, operate it, dismiss it, and return safely.**

---

# 37. Global Anti-patterns

## Purpose

Identify prohibited system-wide behavior.

## Rules

The following SHOULD be treated as design-system defects:

1. **Toast spam.**
2. **Modals for noncritical information.**
3. **Nested modal chains.**
4. **Spinner flashes on fast operations.**
5. **Full-screen spinner for local work.**
6. **Fake progress percentages.**
7. **Animation that delays usable state.**
8. **Success animation after every trivial action.**
9. **Notification severity used to maximize engagement.**
10. **Push notification duplicating visible in-app feedback without reason.**
11. **Outside-click data loss.**
12. **Drag-dismiss data loss.**
13. **Focus not restored after overlay close.**
14. **Tooltip containing essential instructions.**
15. **Context-menu-only critical action.**
16. **Global banner for local validation error.**
17. **Toast for persistent outage.**
18. **Background job disappears after navigation.**
19. **Repeated loading messages announced to screen readers.**
20. **Motion unaffected by reduced-motion preference.**
21. **`z-index: 99999` escalation.**
22. **Color-only severity.**
23. **Critical information auto-dismissed.**
24. **“Something went wrong” when the error is known.**
25. **Feedback claiming success before canonical persistence.**

## Anti-patterns

The list above is normative.

Exceptions MUST have documented domain justification.

## Checklist

- [ ] No prohibited pattern exists.
- [ ] Exceptions are documented.
- [ ] Accessibility and state integrity remain intact.

## Canonical summary

**Attention debt accumulates. Every unnecessary interruption makes future feedback easier to ignore.**

---

# 38. Design Review Checklist

## Purpose

Provide the mandatory overlay and feedback review before implementation or release.

## Overlay choice

- [ ] Overlay taxonomy reviewed.
- [ ] Less-disruptive alternative considered.
- [ ] Modality is justified.
- [ ] Mobile equivalent defined.

## Layering

- [ ] Semantic z-index token used.
- [ ] Portal/root behavior known.
- [ ] Nested overlay behavior tested.
- [ ] No arbitrary z-index escalation.

## Focus

- [ ] Initial focus specified.
- [ ] Focus trap only when modal.
- [ ] Escape behavior specified.
- [ ] Focus restoration specified.

## Dismissal

- [ ] Explicit close path exists.
- [ ] Outside click safe.
- [ ] Drag dismissal safe.
- [ ] Unsaved state protected.

## Feedback

- [ ] Importance and urgency separately assessed.
- [ ] Narrowest adequate surface chosen.
- [ ] Persistence matches state duration.
- [ ] Duplicate feedback removed.

## Notifications

- [ ] Severity correct.
- [ ] Color + icon + text used.
- [ ] Urgency not exaggerated.
- [ ] Notification preferences respected.
- [ ] DND/digest behavior considered.
- [ ] Notification-centre history considered where required.

## Loading

- [ ] Fast operations avoid spinner flicker.
- [ ] Scope matches loading scope.
- [ ] Determinate progress used when real progress exists.
- [ ] Skeleton resembles final state.
- [ ] Background job persists across navigation.

## Motion

- [ ] Duration token used.
- [ ] Easing token used.
- [ ] Motion has functional purpose.
- [ ] Motion does not delay task.
- [ ] Reduced-motion variant exists.

## Copy

- [ ] Message states what happened.
- [ ] Recovery is explicit.
- [ ] User is not blamed.
- [ ] Action label is precise.
- [ ] Raw backend text cannot surface.

## State/API

- [ ] Pending/optimistic/confirmed/failed are distinct.
- [ ] Retry behavior defined.
- [ ] Cancellation distinct from failure.
- [ ] Partial completion supported.
- [ ] Success maps to canonical persistence.

## Accessibility

- [ ] Overlay checklist passed.
- [ ] Keyboard complete.
- [ ] Focus visible.
- [ ] No color-only state.
- [ ] Announcements are not noisy.
- [ ] Reduced-motion honored.

## Canonical summary

**An overlay or feedback pattern is release-ready only when attention, state, dismissal, persistence, accessibility, and recovery have all been designed.**

---

# 39. Canonical Decision Rules

## Purpose

Provide defaults for common product decisions.

## Rules

When uncertain:

**Small contextual explanation**  
→ Tooltip.

**Rich contextual preview**  
→ Hovercard.

**Small anchored interaction**  
→ Popover.

**List of commands**  
→ Dropdown menu.

**Object-specific pointer commands**  
→ Context menu plus discoverable alternate path.

**Secondary desktop work requiring main-page reference**  
→ Non-modal panel/sheet.

**Mobile contextual secondary work**  
→ Bottom sheet.

**Immediate short decision that blocks safe continuation**  
→ Modal dialog.

**Irreversible/destructive decision**  
→ Alert dialog or undo-first model.

**Recent low-consequence completion**  
→ Toast only if result is otherwise not apparent.

**Persistent local problem**  
→ Inline alert.

**Persistent page/service problem**  
→ Banner.

**Ambient ongoing state**  
→ Badge/status indicator.

**Known progress**  
→ Determinate progress.

**Unknown short progress**  
→ Local indeterminate state.

**Predictable initial content load**  
→ Skeleton.

**Long background operation**  
→ Durable task/background-job surface.

**Repeated event stream**  
→ Notification centre/digest, not endless toasts.

**Motion with no informational purpose**  
→ Remove it.

## Anti-patterns

Deviations SHOULD be challenged during review.

## Checklist

- [ ] Default was considered.
- [ ] More disruptive alternative has rationale.
- [ ] Mobile and accessibility behavior defined.

## Canonical summary

**Prefer the smallest surface, shortest duration, and lowest interruption that still makes the state understandable and recoverable.**

---

# 40. Gold Standard Summary

A Gold Standard overlay and feedback system in 2026:

- distinguishes importance from urgency;
- uses interruption proportionally;
- reserves modal behavior for truly blocking work;
- restores focus predictably;
- locks background interaction only when modality requires it;
- uses semantic z-index tokens instead of arbitrary escalation;
- chooses local feedback before global notification;
- separates passive, transient, persistent, and blocking feedback;
- prevents toast spam;
- treats notification urgency as a user-trust contract;
- supports notification centres, DND, and digests where event volume requires them;
- does not deliver the same state across multiple surfaces unnecessarily;
- shows real progress rather than invented percentages;
- uses skeletons only where the final structure is predictable;
- promotes long-running operations into durable background jobs;
- distinguishes optimistic state from confirmed state;
- uses motion to explain relationships and state;
- never delays useful work for animation;
- respects `prefers-reduced-motion`;
- treats sound and haptics as optional reinforcement;
- uses concise, specific, non-blaming copy;
- keeps API, state-management, security, and persistence truth aligned with visible feedback;
- remains fully operable by keyboard and assistive technology.

The canonical principle is:

> **Use the least disruptive mechanism that makes the system state clear, actionable, and recoverable.**

---

# Sources

1. **W3C WAI-ARIA Authoring Practices — Dialog (Modal) Pattern**  
   https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

2. **W3C WCAG Technique C39 — Using `prefers-reduced-motion`**  
   https://www.w3.org/WAI/WCAG22/Techniques/css/C39

3. **W3C WCAG — Animation from Interactions**  
   https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html

4. **Nielsen Norman Group — Modal & Nonmodal Dialogs: When (& When Not) to Use Them**  
   https://www.nngroup.com/articles/modal-nonmodal-dialog/

5. **Nielsen Norman Group — Bottom Sheets: Definition and UX Guidelines**  
   https://www.nngroup.com/articles/bottom-sheet/

6. **IBM Carbon Design System — Notifications**  
   https://carbondesignsystem.com/patterns/notification-pattern/

7. **IBM Carbon Design System — Loading**  
   https://carbondesignsystem.com/patterns/loading-pattern/

8. **Apple Human Interface Guidelines — Managing notifications**  
   https://developer.apple.com/design/human-interface-guidelines/managing-notifications

9. **Apple Human Interface Guidelines — Notifications**  
   https://developer.apple.com/design/human-interface-guidelines/notifications

10. **Apple Human Interface Guidelines — Motion**  
    https://developer.apple.com/design/human-interface-guidelines/motion

11. **Material Design 3 — Snackbar overview**  
    https://m3.material.io/components/snackbar/overview

12. **Material Design 3 — Snackbar guidelines**  
    https://m3.material.io/components/snackbar/guidelines

13. **Material Design 3 — Snackbar accessibility**  
    https://m3.material.io/components/snackbar/accessibility

14. **Material Design 3 — Transitions**  
    https://m3.material.io/styles/motion/transitions

15. **GOV.UK Design System — Notification banner**  
    https://design-system.service.gov.uk/components/notification-banner/

16. **shadcn/ui — Components**  
    https://ui.shadcn.com/docs/components

17. **shadcn/ui — Tooltip**  
    https://ui.shadcn.com/docs/components/base/tooltip

18. **shadcn/ui — Dropdown Menu**  
    https://ui.shadcn.com/docs/components/radix/dropdown-menu

19. **shadcn/ui — Sonner**  
    https://ui.shadcn.com/docs/components/radix/sonner

The timing, easing, and z-index values above are deliberately defined as **house tokens** rather than presented as externally mandated thresholds; the external research informs the interaction principles, while the numeric contract makes those principles implementable consistently.
