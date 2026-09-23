---
id: "feedback"
title: "Feedback & Status"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "feedback", "status"]
applies_to: ["general"]
related: ["aesthetic"]
legacy_number: 67
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 56699
provenance: baseline

---

# Feedback & Status — Gold Standard 2026

**Status:** Canonical  
**Standard level:** Gold Standard 2026  
**Canonical placement:** **Components → Feedback & Status → Patterns → Content & UX Writing**  
**Component baseline:** shadcn/ui  
**Applies to:** Application UI, forms, CRUD workflows, asynchronous operations, background jobs, uploads, exports, imports, payments, administrative actions, optimistic updates, validation, system notices, and operator-facing status surfaces.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements unless an approved exception is documented.

---

# 1. Purpose

## 1.1 Objective

This standard defines how the product MUST communicate:

- success;
- failure;
- warning;
- information;
- loading;
- progress;
- pending state;
- optimistic state;
- rollback;
- undo;
- background activity;
- degraded or unavailable state.

It governs:

- toast versus inline feedback;
- banners;
- field and section messages;
- persistent versus transient messaging;
- determinate and indeterminate progress;
- optimistic UI;
- rollback;
- undo;
- success acknowledgement;
- failure acknowledgement;
- notification fatigue;
- duplicate suppression;
- feedback timing;
- accessible live-region announcements.

This standard MUST be applied together with:

- Security;
- Data & Database;
- API;
- State Management;
- Forms & Validation;
- Accessibility;
- Design Tokens;
- Component;
- Pattern;
- Content & UX Writing;
- Observability standards.

Feedback is part of the interaction contract.

A system MUST NOT perform a meaningful action while leaving the user unable to determine whether the action:

1. started;
2. remains in progress;
3. succeeded;
4. failed;
5. requires further action.

---

## 1.2 Governing principle

Feedback MUST appear at the **smallest durable scope that fully explains the state**.

The preferred hierarchy is:

**field/control → component/section → page/workflow → transient toast → application/system banner**

A toast MUST NOT be selected merely because it is easy to implement.

Persistent problems SHOULD have persistent feedback.

Local problems SHOULD have local feedback.

Transient confirmation SHOULD be transient.

Critical interruption SHOULD be exceptional.

---

## 1.3 Feedback is not observability

User feedback and operational observability are different systems.

User-facing feedback MUST communicate what the user needs to know.

Logs, metrics, traces, error IDs, and incident telemetry MUST provide the technical detail required by operators.

A toast MUST NOT substitute for:

- error logging;
- failed-job monitoring;
- audit records;
- incident alerting;
- data reconciliation.

Conversely, the existence of logs MUST NOT excuse missing user-visible feedback.

---

# 2. Rules

## 2.1 Feedback-surface selection

The feedback surface MUST match the scope, persistence, and actionability of the message.

| Surface | Primary use | Persistence | Typical example |
|---|---|---|---|
| **Field message** | State tied to one input | Until resolved or state changes | “Enter a valid email address.” |
| **Inline message** | State tied to one component, section, or action | Usually persistent while relevant | “This report could not be generated.” |
| **Inline banner / Alert** | Important state affecting a larger section or page | Persistent while relevant | “Some records could not be loaded.” |
| **Page/system banner** | Broad state affecting most or all of the experience | Persistent while relevant | “Service is temporarily unavailable.” |
| **Toast** | Brief acknowledgement not requiring continued context | Transient | “Copied to clipboard.” |
| **Dialog/Alert Dialog** | User decision is required before continuation | Until acted upon | Confirmation of irreversible action |
| **Progress UI** | A task is actively proceeding | Until completion/failure | Uploading 62% |

A message MUST NOT be promoted to a more interruptive surface merely to increase visibility.

A message MUST NOT be demoted to a transient surface if the user must retain or act on it.

---

## 2.2 Toast usage

Toasts SHOULD be used for brief, low-complexity acknowledgements that:

- do not block continuation;
- do not require sustained reading;
- are not needed to understand the current page;
- do not require a complex recovery workflow.

Appropriate examples include:

- copied to clipboard;
- preference updated;
- link created;
- minor background action completed;
- item moved where an immediate Undo action is available.

Toasts MUST NOT be the sole representation of:

- field validation errors;
- form submission errors requiring correction;
- persistent connection failure;
- authentication expiry requiring action;
- payment failure;
- unsaved work that remains at risk;
- security warnings;
- complex partial failure;
- long-running job state.

---

## 2.3 Canonical toast implementation

New shadcn/ui Base UI projects SHOULD use the current canonical shadcn Toast implementation behind the project-owned feedback abstraction.

Existing approved Sonner implementations MAY remain where they satisfy this standard.

Feature code SHOULD call a canonical application feedback API rather than importing a toast implementation directly.

The canonical abstraction SHOULD own:

- status type;
- duration;
- placement;
- stacking;
- duplicate suppression;
- accessibility behaviour;
- action layout;
- dismiss behaviour.

A feature team MUST NOT independently choose:

- toast library;
- placement;
- duration;
- animation;
- colours;
- stacking rules.

Migration between toast implementations MUST NOT require changes to domain/business logic.

---

## 2.4 Toast content

A toast SHOULD normally contain:

- one concise primary message;
- optional short supporting text;
- at most one primary inline action where appropriate.

Toast copy MUST describe the result or meaningful state.

Prefer:

**Report exported**

over:

**Success**

Prefer:

**Could not save changes**

over:

**Something went wrong**

when the operation is known.

Toasts SHOULD NOT contain:

- paragraphs of explanation;
- complex forms;
- multiple unrelated actions;
- raw technical errors;
- long lists of failed records.

Complex information belongs in persistent UI.

---

## 2.5 Toast duration

A transient message MUST remain visible long enough to be perceived and understood.

Duration SHOULD account for:

- message length;
- whether an action exists;
- severity;
- interaction method.

Very short automatic dismissal MUST NOT make meaningful content practically unreadable.

Actionable toasts SHOULD remain visible longer than simple acknowledgement toasts.

A toast containing an Undo action MUST remain available for the full supported undo interval or provide another persistent recovery mechanism.

Critical errors SHOULD NOT automatically disappear if disappearance would remove the user's only useful recovery information.

---

## 2.6 Toast stacking

The interface SHOULD minimise simultaneous toasts.

Repeated events SHOULD be:

- coalesced;
- updated in place;
- summarised;
- suppressed where redundant.

Routine batch operations MUST NOT produce one toast per record.

For example, deleting 50 selected records SHOULD produce one aggregate result rather than 50 success toasts.

Toast stacks SHOULD remain bounded.

When the bound is exceeded, older low-priority notifications SHOULD be removed or consolidated according to the canonical policy.

---

## 2.7 Inline messages

An inline message SHOULD be used when feedback is directly associated with nearby content or an action.

Inline messages SHOULD remain visible until:

- the condition is resolved;
- the user dismisses it where dismissal is appropriate;
- navigation makes it irrelevant.

Inline feedback SHOULD be positioned near the element whose state it explains.

A user SHOULD NOT have to remember a toast while searching the page for the affected control.

---

## 2.8 Field-level feedback

Validation and field state MUST follow the Forms & Validation standard.

Field errors MUST appear near the affected field.

A form submission MUST NOT communicate correctable field errors only through a toast.

A form-level summary MAY accompany field-level errors when:

- multiple fields fail;
- errors are distributed across a long form;
- accessibility requires a navigable summary;
- cross-field validation fails.

Field feedback MUST identify:

- what requires attention;
- why, where useful;
- how to correct it where not obvious.

---

## 2.9 Inline banners

An inline banner SHOULD communicate a condition affecting a logical region.

Examples include:

- partial data unavailable;
- read-only mode;
- imported data contains warnings;
- configuration is incomplete;
- connectivity affects one module.

The banner SHOULD appear inside or immediately before the affected region.

A section-level issue MUST NOT automatically become a global application banner.

---

## 2.10 Page and system banners

A page or system banner SHOULD be reserved for high-scope conditions.

Appropriate examples include:

- planned maintenance;
- system-wide outage;
- degraded service;
- account-level restriction;
- critical policy change;
- session-related state affecting the whole application.

Global banners MUST NOT become a general announcement area for low-priority product news.

Persistent system banners SHOULD be dismissible only if dismissal is compatible with the message's continued importance.

Critical unresolved state MUST NOT disappear permanently merely because the user dismissed its presentation.

---

## 2.11 Persistent versus transient messaging

Feedback MUST remain available for as long as the information remains operationally relevant.

### Transient feedback SHOULD be used when:

- the action completed;
- no follow-up is required;
- the current UI already reflects the result;
- the message only confirms what just occurred.

### Persistent feedback SHOULD be used when:

- the problem remains unresolved;
- the user must act;
- consequences continue;
- the state materially affects the current task;
- the user may need to refer back to the information.

A persistent condition MUST NOT be repeatedly resurfaced as transient toasts.

---

## 2.12 Feedback timing

Feedback SHOULD appear as close as practical to the triggering event.

The UI MUST acknowledge an interaction promptly when processing cannot finish immediately.

For synchronous-feeling interactions, the acknowledgement MAY be a visual pressed/pending state before explicit loading UI appears.

The system MUST NOT leave a control apparently idle after accepting an action that is still being processed.

Feedback MUST NOT falsely imply success before the authoritative success condition is met, except where an explicitly designed optimistic interaction is used.

---

## 2.13 Pending state

A control that has initiated an asynchronous action SHOULD expose a pending state when repeat activation would be confusing or unsafe.

Pending treatment MAY include:

- disabled/restricted repeat activation;
- loading indicator;
- changed label;
- nearby progress.

Pending state MUST NOT automatically disable unrelated page interaction.

A pending state MUST NOT conceal the action that is taking place.

Prefer a meaningful label such as:

**Saving…**

where it improves clarity over a spinner alone.

---

## 2.14 Preventing duplicate submission

Actions that are not safely repeatable MUST protect against accidental duplicate activation.

Protection MAY include:

- disabling repeat submission while pending;
- idempotency keys;
- deduplication;
- server-side operation locks.

Client disabling alone MUST NOT be considered sufficient protection for high-consequence operations.

The API remains responsible for appropriate idempotency or duplicate-control semantics.

---

## 2.15 Success acknowledgement

Success feedback SHOULD be proportional to the significance and visibility of the result.

Explicit success messaging MAY be unnecessary when the result is immediately obvious.

Examples:

- toggling a setting that visibly changes;
- adding an item that immediately appears in a list;
- closing a successfully submitted lightweight popover.

Redundant success toasts SHOULD be avoided where the changed UI already provides unmistakable confirmation.

Explicit success feedback SHOULD be used when:

- completion is otherwise invisible;
- the action occurred elsewhere;
- a long-running operation completed;
- the consequence is significant;
- users need confidence that the operation persisted.

---

## 2.16 Success intensity

Routine successful operations SHOULD use restrained acknowledgement.

Large positive animation, celebration, confetti, illustration, or modal interruption SHOULD be reserved for meaningful milestones.

Saving a record MUST NOT routinely trigger celebratory treatment.

Success colour SHOULD reinforce semantic meaning without dominating the interface.

Success status MUST NOT depend solely on green colour.

---

## 2.17 Failure acknowledgement

Failures MUST identify the failed operation when possible.

Prefer:

**Could not upload the document**

over:

**Error**

The message SHOULD distinguish, where useful:

- what failed;
- whether anything succeeded;
- whether user input was preserved;
- whether retry is possible;
- what the user should do next.

Failures MUST NOT imply that user data was saved when persistence is uncertain.

Ambiguous outcomes MUST be described honestly.

If an API call timed out after submission and the system cannot determine whether the operation completed, the UI MUST NOT confidently state either success or failure until the state is reconciled.

---

## 2.18 Recoverable errors

Recoverable errors SHOULD provide an appropriate recovery action.

Examples include:

- Retry;
- Reconnect;
- Reload;
- Fix highlighted fields;
- Choose another file;
- Contact support when no self-service recovery exists.

A generic **Try again** action SHOULD NOT be provided when retrying is known to be ineffective.

The system SHOULD preserve user work across recoverable failure wherever feasible.

---

## 2.19 Partial failure

Partial failure MUST be represented explicitly.

A bulk operation MUST NOT show complete success when some items failed.

Feedback SHOULD indicate:

- successful count;
- failed count;
- affected records or route to details;
- appropriate recovery action.

A toast MAY summarise partial failure, but detailed failures SHOULD be available in persistent UI when users need to act on them.

---

## 2.20 Warnings

Warnings SHOULD identify a condition that creates material risk or requires informed attention but does not yet represent failure.

Warnings MUST NOT be used as a generic visual emphasis style.

A warning MUST explain the consequence where the risk is not obvious.

Warning fatigue MUST be treated as a design defect.

If users routinely ignore the same warning, the system SHOULD reconsider:

- timing;
- targeting;
- severity;
- underlying workflow.

---

## 2.21 Informational status

Informational messages SHOULD provide useful context without implying risk.

Informational styling MUST NOT visually compete with warnings or errors.

Routine explanatory content SHOULD normally remain ordinary content rather than being placed inside an information banner.

A blue banner around normal instructions MUST NOT become the default content-layout pattern.

---

## 2.22 Loading versus progress

**Loading** means the system is waiting for content or operation state.

**Progress** means the system can communicate advancement toward completion.

The two MUST NOT be conflated.

A spinner indicates activity, not percentage completion.

A skeleton indicates anticipated structure, not work progress.

A progress bar MUST NOT advance artificially in a way that presents invented progress as authoritative.

---

## 2.23 Determinate progress

Determinate progress MUST be used when reliable measurable progress is available.

Examples include:

- bytes uploaded;
- records processed from a known total;
- completed steps from a fixed workflow;
- files processed from a known set.

Determinate progress SHOULD expose meaningful context such as:

- percentage;
- completed/total;
- current stage;
- estimated remaining quantity where reliable.

The displayed value MUST correspond to real progress.

The UI MUST NOT reach 100% before the operation's actual completion condition is satisfied.

---

## 2.24 Indeterminate progress

Indeterminate progress SHOULD be used when the remaining work cannot be quantified reliably.

Examples include:

- waiting for a remote service;
- unknown processing complexity;
- open-ended data preparation.

Indeterminate progress MUST NOT display a fictional percentage.

If the operation later becomes measurable, the UI MAY transition to determinate progress.

The transition MUST NOT imply that earlier progress was known.

---

## 2.25 Choosing a progress surface

Short operations MAY use local loading state.

Longer operations SHOULD provide a persistent progress surface.

Background tasks that survive navigation MUST NOT depend on a toast as their only status representation.

Where a job can continue beyond the current page, the product SHOULD provide an appropriate persistent location such as:

- activity centre;
- job list;
- export centre;
- notification centre;
- record-level status.

---

## 2.26 Long-running operations

A long-running operation MUST have an authoritative backend operation identity where its lifecycle exceeds the initiating request.

The UI SHOULD be able to recover status after:

- navigation;
- refresh;
- reconnect;
- device sleep where appropriate.

The browser MUST NOT be the sole owner of critical progress state.

A long-running API SHOULD normally return a job/operation resource rather than hold an interactive request open indefinitely.

---

## 2.27 Cancellation

Cancellation SHOULD be offered when:

- the operation is meaningfully cancellable;
- cancellation provides user value;
- partial completion can be handled safely.

A Cancel control MUST NOT be shown if the underlying system cannot actually cancel or safely stop the operation.

If cancellation is best-effort, the wording MUST reflect that semantic.

Cancellation MUST define what happens to partial output.

---

## 2.28 Optimistic UI

Optimistic UI MAY be used when the interface can safely predict the expected server result.

It SHOULD be considered when:

- success is highly probable;
- latency would otherwise materially reduce responsiveness;
- rollback is straightforward;
- temporary inconsistency has low consequence.

Examples MAY include:

- favouriting;
- simple preference toggles;
- lightweight ordering changes;
- reversible local classifications.

Optimistic UI SHOULD NOT be the default for high-consequence mutations.

---

## 2.29 Optimistic UI eligibility

Optimistic treatment SHOULD NOT be used when:

- server validation may commonly reject the change;
- authorization may change the outcome;
- money is transferred;
- inventory or scarce capacity is reserved;
- irreversible deletion occurs;
- compliance/security state changes;
- multiple dependent records must commit atomically;
- displaying unconfirmed success could materially mislead the user.

In these cases the UI SHOULD expose pending state until authoritative confirmation.

---

## 2.30 Optimistic state ownership

Optimistic state MUST be explicitly represented in State Management.

An optimistic value MUST NOT become indistinguishable internally from confirmed server state before reconciliation.

The implementation SHOULD track sufficient context to:

- confirm success;
- roll back;
- reconcile changed server values;
- handle concurrent updates.

The server remains authoritative.

---

## 2.31 Optimistic rollback

If an optimistic mutation fails, the UI MUST reconcile to an authoritative valid state.

Rollback MUST NOT silently remove user intent without explanation.

Failure feedback SHOULD explain that the change did not persist.

Where useful, the UI SHOULD offer:

- Retry;
- Reapply;
- another recovery path.

If subsequent user actions depend on the optimistic mutation, rollback behaviour MUST account for those dependent changes.

---

## 2.32 Optimistic concurrency

Optimistic UI MUST NOT be confused with optimistic concurrency control.

Where concurrent edits matter, the API/Data & Database standards SHOULD provide:

- version tokens;
- ETags;
- row versions;
- compare-and-set semantics;
- another approved conflict mechanism.

The UI MUST NOT overwrite a newer authoritative value merely because it previously displayed an optimistic local value.

---

## 2.33 Undo pattern

Undo SHOULD be used for reversible actions when it reduces unnecessary confirmation interruption.

Appropriate examples MAY include:

- move;
- archive;
- remove from a collection;
- dismiss;
- reversible deletion using a defined soft-delete/recovery period.

Undo MUST have a defined server/domain contract.

An Undo button MUST NOT merely reverse client appearance while the underlying operation remains irreversible.

---

## 2.34 Undo versus confirmation

Undo SHOULD be preferred over confirmation for frequent, low-risk, easily reversible actions.

Confirmation SHOULD be preferred when an action is:

- irreversible;
- high consequence;
- security-sensitive;
- financially consequential;
- legally consequential;
- difficult or expensive to reverse;
- likely to affect other users or systems immediately.

A destructive action MUST NOT skip appropriate confirmation merely because a toast can visually offer Undo.

---

## 2.35 Undo window

The supported undo interval MUST be explicit in implementation.

The user-facing presentation MAY omit the numeric duration if the behaviour remains understandable.

The backend MUST retain sufficient reversible state for at least the promised undo interval.

A toast MUST NOT show Undo after the backend can no longer honour it.

If Undo expires, invoking it MUST NOT silently fail.

---

## 2.36 Undo idempotency

Undo operations SHOULD be idempotent.

Retrying Undo MUST NOT corrupt state.

Undo MUST account for intervening state changes.

If another user or process has changed the resource such that reversal is no longer safe, the system MUST report the conflict rather than forcing an invalid historical state.

---

## 2.37 Offline and connectivity feedback

The interface SHOULD distinguish:

- offline;
- temporarily unreachable;
- request timeout;
- authenticated-but-service-unavailable;
- server rejection.

A transient network failure MUST NOT automatically be described as "offline."

Persistent offline state SHOULD use persistent feedback.

Repeated network failures MUST NOT create a toast on every failed polling request.

Background retry state SHOULD be communicated only at an appropriate frequency.

---

## 2.38 Reconnection

When connectivity returns, the system SHOULD reconcile authoritative state before announcing recovery where stale state is possible.

A **Back online** message MAY be used when useful.

Routine reconnection SHOULD NOT create unnecessary interruption if the user experienced no material degradation.

Queued offline mutations MUST have explicit conflict and failure behaviour.

---

## 2.39 Notification fatigue

The product MUST treat user attention as a limited resource.

Feedback SHOULD be omitted when:

- the result is self-evident;
- no user action is required;
- the message duplicates visible state;
- the event occurs too frequently to provide useful signal.

A system MUST NOT toast every successful API mutation.

A system MUST NOT announce every autosave if saves occur continuously and failures are the only actionable state.

---

## 2.40 Autosave feedback

Autosave SHOULD normally use low-intensity persistent or local status rather than repeated toasts.

Useful states MAY include:

- Saving…;
- Saved;
- Could not save.

Routine **Saved** state SHOULD fade or recede visually without requiring dismissal.

Autosave failure MUST remain visible while unsaved work remains at risk.

The interface MUST NOT falsely show **Saved** until the persistence condition required by the product is satisfied.

---

## 2.41 Duplicate suppression

Identical or equivalent feedback generated repeatedly within a short operational window SHOULD be deduplicated.

The canonical feedback layer SHOULD support:

- dedupe keys;
- update-in-place;
- aggregation;
- rate limits.

Repeated identical server failures MUST NOT create an ever-growing stack of identical alerts.

Deduplication MUST NOT hide materially distinct failures.

---

## 2.42 Feedback escalation

A condition MAY escalate from transient to persistent feedback when it continues.

For example:

1. one failed background refresh MAY remain subtle;
2. repeated failures MAY create inline degraded-state feedback;
3. sustained service failure MAY justify a page/system banner.

Escalation SHOULD be based on user impact and duration rather than raw error count alone.

---

## 2.43 Feedback de-escalation

Persistent feedback SHOULD be removed or downgraded when the underlying condition is resolved.

A stale warning MUST NOT remain visible after recovery.

Recovery MAY be announced briefly when users would otherwise remain uncertain.

The UI SHOULD avoid replacing one persistent outage banner with a persistent success banner unless that information continues to matter.

---

## 2.44 Notification priority

The Design System SHOULD define a restrained status vocabulary equivalent to:

- neutral/default;
- informational;
- success;
- warning;
- destructive/error;
- loading/pending.

Feature teams MUST NOT create additional semantic severities solely for visual variety.

Priority and colour semantics MUST follow Design Tokens and Aesthetic & Visual Language.

---

## 2.45 Visual status semantics

Semantic status colours MUST remain stable across components.

Success MUST NOT use the same semantic treatment as informational content.

Warning MUST NOT be used for ordinary information.

Destructive/error styling MUST be reserved for actual failure, danger, or destructive consequence.

Status MUST NOT depend on colour alone.

Where material, status SHOULD also use:

- icon;
- text;
- label;
- structural context.

---

## 2.46 Status icons

Status icons MUST follow the Iconography standard.

The canonical success, warning, informational, error, and loading metaphors MUST be used consistently.

A feature MUST NOT invent a new warning icon because it visually fits the layout better.

Loading icons MUST comply with reduced-motion requirements.

---

## 2.47 Accessible status messages

Status messages MUST be programmatically determinable where required so assistive technologies can announce them without forcing focus.

Routine advisory status SHOULD normally use semantics equivalent to `role="status"` or `aria-live="polite"`.

Important, time-sensitive failures or warnings MAY use `role="alert"` or an assertive live region.

Assertive announcements MUST be exceptional.

Routine success messages MUST NOT use assertive announcement merely to guarantee attention.

---

## 2.48 Live-region priority

The canonical priority SHOULD be:

**polite** for:

- success;
- routine completion;
- search result counts;
- non-critical background updates;
- ordinary progress milestones.

**assertive** for:

- immediately important errors;
- time-sensitive warnings;
- state requiring prompt awareness to avoid harm or task failure.

Feature teams MUST NOT choose live-region priority based on visual severity alone.

---

## 2.49 Focus and status messages

Ordinary status updates SHOULD be announced without moving keyboard focus.

A toast appearing MUST NOT steal focus.

An inline banner appearing MUST NOT automatically steal focus unless the workflow explicitly requires direct user action and the corresponding Pattern supports it.

Focus SHOULD move when the newly presented UI itself requires interaction, such as an alert dialog.

Validation submission MAY move focus to an error summary or first invalid control according to the Forms & Validation Pattern.

---

## 2.50 Live-region lifecycle

Live-region implementation MUST account for assistive-technology behaviour.

The canonical implementation SHOULD provide stable announcement regions rather than creating inaccessible ephemeral markup patterns.

Rapid updates SHOULD be throttled or summarised.

A live region MUST NOT announce every incremental technical state change.

Announcement content SHOULD reflect user-relevant meaning.

---

## 2.51 Progress accessibility

Determinate progress MUST expose:

- accessible name;
- current progress value;
- relevant minimum/maximum where not implicit.

Indeterminate progress MUST expose that work is in progress without inventing a current value.

For an ARIA progress bar, `aria-valuenow` MUST be omitted when progress is genuinely indeterminate.

Where a progress indicator describes a particular page region, the relationship SHOULD be programmatically available where appropriate.

Progress updates SHOULD NOT produce excessive spoken announcements.

---

## 2.52 Progress announcement frequency

Continuous visual progress MAY update frequently.

Assistive announcements SHOULD update less frequently.

A 1% visual increment MUST NOT automatically generate 100 live announcements.

Progress SHOULD be announced at meaningful intervals or stage changes.

Useful examples MAY include:

- started;
- 25%;
- halfway;
- 75%;
- complete;

or domain-relevant stages.

Exact announcement strategy MAY differ by operation length and importance.

---

## 2.53 `aria-busy`

A region whose content is being updated MAY use `aria-busy` or equivalent semantics where appropriate.

Busy state MUST NOT make usable existing content unnecessarily inaccessible.

The implementation MUST distinguish between:

- region actively updating;
- whole application unusable.

Global busy overlays SHOULD be avoided when only one region is pending.

---

## 2.54 Experimental announcement APIs

Experimental accessibility APIs MUST NOT be the sole mechanism for required feedback.

They MAY be used as progressive enhancement.

The product MUST retain a broadly supported fallback such as established live-region semantics until the Accessibility standard explicitly changes the baseline.

---

## 2.55 Reduced motion

Feedback animation MUST respect reduced-motion preferences.

Toasts, progress indicators, banners, and status transitions MUST NOT depend on large movement to convey meaning.

Indeterminate animation SHOULD have an appropriate reduced-motion treatment.

Removing animation MUST NOT remove the status itself.

---

## 2.56 Content & UX Writing relationship

Feedback copy MUST be concise, specific, and actionable.

Messages SHOULD use plain language.

The primary message SHOULD state:

- what happened;
- or what needs attention.

Supporting text SHOULD explain consequence or recovery only when necessary.

Technical implementation terminology SHOULD NOT appear in user-facing messages unless the audience requires it.

Avoid messages equivalent to:

- Error 500;
- Mutation failed;
- Invalid payload;
- SQL exception;
- Promise rejected.

---

## 2.57 Error copy

Error messages MUST avoid blaming the user.

Messages SHOULD identify incorrect input directly when validation is the cause.

Prefer:

**Enter a date after 1 January 2026**

over:

**You entered an invalid date**

when the requirement can be stated directly.

Generic language such as **Something went wrong** SHOULD be reserved for genuinely unknown failures.

Known failures SHOULD receive specific language.

---

## 2.58 Success copy

Success messages SHOULD use past-tense or completed-state language where appropriate.

Examples:

- **Changes saved**
- **Report created**
- **Invitation sent**

Redundant words such as **successfully** SHOULD usually be omitted when the status styling and completed verb already make success clear.

Prefer:

**Changes saved**

over:

**Changes saved successfully**

unless the distinction adds useful meaning.

---

## 2.59 Retry copy

Retry actions MUST be labelled according to what they do.

**Retry upload** MAY be clearer than generic **Retry** when multiple operations are visible.

A retry action MUST NOT imply the system will fix invalid user input automatically.

If intervention is required, copy SHOULD identify the required correction instead.

---

## 2.60 Security-sensitive feedback

Security feedback MUST avoid exposing information that creates enumeration or disclosure risk.

Authentication, password recovery, invitations, and account discovery MUST follow the Security standard.

The interface MUST NOT reveal sensitive existence/state information merely to make feedback more specific.

For example, account-recovery messaging MAY need deliberately equivalent responses for existing and non-existing identities.

Security requirements take precedence over ordinary feedback specificity.

---

## 2.61 Sensitive operation outcomes

High-consequence actions MUST communicate authoritative outcome clearly.

Examples include:

- payment;
- access changes;
- identity verification;
- data deletion;
- account closure;
- privilege changes;
- legal submissions.

Ambiguous transient confirmation MUST NOT be used where users may need evidence of completion.

The interface SHOULD provide a persistent receipt, record, audit entry, confirmation number, or equivalent where the domain requires durable proof.

---

## 2.62 Data & Database relationship

Feedback MUST reflect authoritative persistence semantics.

A database write queued for later processing MUST NOT be labelled **Saved** if the product contract defines saved as durable final persistence.

If the architecture distinguishes:

- locally cached;
- queued;
- persisted;
- processed;
- published;

the UI MUST use terminology consistent with the actual state where those distinctions matter.

Database rollback, constraint failure, conflict, or transaction failure MUST be propagated to an appropriate user outcome.

---

## 2.63 API relationship

The API MUST expose enough structured failure information for the UI to distinguish meaningful outcomes safely.

Client code SHOULD map machine-readable API errors to canonical feedback messages.

The UI MUST NOT display raw server exception text by default.

API status codes alone SHOULD NOT determine the complete user message.

A conflict response, for example, may require:

- reconciliation;
- reload;
- merge;
- specific explanatory feedback.

API request success MUST NOT automatically equal business-operation success where processing remains asynchronous.

---

## 2.64 State Management relationship

Feedback state MUST have an explicit owner.

Transient presentation state MAY live in the canonical feedback store/component.

Domain operation state MUST remain in the appropriate authoritative data/state layer.

A toast MUST NOT become the sole source of truth that an action completed.

Optimistic mutation state MUST be represented separately from authoritative server state.

Persistent feedback derived from domain state SHOULD be reproducible after rerender or navigation where relevant.

---

## 2.65 Forms & Validation relationship

Forms MUST use field and form feedback according to the Forms & Validation standard.

A toast MUST NOT replace validation.

Submission-level failures MAY use:

- form-level alert;
- inline summary;
- toast only as supplementary acknowledgement.

Values entered by the user SHOULD remain available after recoverable submission failure.

Success feedback SHOULD occur only after the form's defined persistence condition is met.

---

## 2.66 Accessibility relationship

Feedback MUST satisfy the Accessibility standard.

At minimum:

- meaning MUST NOT rely solely on colour;
- live updates MUST be programmatically discoverable where required;
- focus MUST NOT be stolen unnecessarily;
- interactive feedback controls MUST be keyboard operable;
- dismissal controls MUST have accessible names;
- progress MUST expose appropriate semantics;
- reduced-motion preferences MUST be respected.

Accessibility requirements take precedence over a desired minimal or silent interface.

---

## 2.67 Design Tokens relationship

Feedback presentation MUST use canonical semantic tokens.

This includes:

- success;
- warning;
- informational;
- destructive/error;
- neutral;
- pending;
- borders;
- foreground/background;
- status icons;
- animation;
- elevation.

Feature code MUST NOT create custom red/green/yellow feedback palettes.

Duration tokens MAY be defined for transient presentation, but duration MUST still account for content and accessibility requirements.

---

## 2.68 Component relationship

The Component standard SHOULD provide canonical components equivalent to:

- Alert;
- Toast;
- Progress;
- Skeleton;
- Spinner/loading indicator;
- Field message;
- Error summary;
- Badge/status indicator.

Components MUST encode default:

- semantics;
- icon treatment;
- spacing;
- status colour;
- accessibility behaviour.

Feature implementations SHOULD NOT rebuild feedback primitives from arbitrary containers.

---

## 2.69 Pattern relationship

Patterns MUST define complete workflow use of feedback.

Examples include:

- form submission;
- destructive action;
- async export;
- file upload;
- background job;
- optimistic mutation;
- bulk action;
- offline workflow;
- unsaved changes.

The Component provides the visual primitive.

The Pattern determines when and how that primitive is used.

---

## 2.70 Background jobs

Background jobs MUST have persistent status when completion may occur after the initiating context disappears.

A "Job started" toast MAY acknowledge initiation.

It MUST NOT be the only way to discover:

- whether the job remains running;
- whether it succeeded;
- whether it failed.

Completion MAY additionally trigger a toast or notification when useful.

Persistent job history SHOULD remain available according to domain requirements.

---

## 2.71 File uploads

Uploads SHOULD show determinate progress when reliable byte progress is available.

The UI SHOULD distinguish:

- uploading;
- uploaded;
- server processing;
- complete.

An upload reaching 100% transfer MUST NOT be labelled complete if server-side processing is still pending.

Failed individual files SHOULD remain identifiable and retryable where practical.

Multi-file uploads SHOULD aggregate progress without concealing per-file failures.

---

## 2.72 Imports and exports

Long-running imports and exports SHOULD use job-style persistent status.

A toast MAY acknowledge:

- export started;
- export ready.

The user SHOULD have a durable route to retrieve output if the job survives navigation.

Import feedback MUST distinguish:

- received;
- validating;
- processing;
- complete;
- complete with warnings;
- failed.

Partial data ingestion MUST NOT be represented as full success.

---

## 2.73 Bulk actions

Bulk feedback MUST report aggregate outcome truthfully.

For example:

**47 records updated. 3 could not be updated.**

Detailed failures SHOULD be inspectable where recovery is possible.

One toast per selected record MUST NOT be emitted.

Bulk optimistic UI SHOULD be used only when rollback and conflict handling remain tractable.

---

## 2.74 Navigation and feedback

Navigation MUST NOT unexpectedly destroy important feedback.

Persistent workflow errors SHOULD remain available on the relevant destination.

A successful redirect MAY carry one transient acknowledgement into the destination.

Flash-style success messaging MUST NOT repeatedly reappear after refresh or Back navigation unless the action genuinely occurred again.

---

## 2.75 Dismissal

Dismiss controls SHOULD be offered only where dismissal is meaningful.

A required unresolved error MUST NOT disappear permanently merely because a user clicked Close.

Dismissed informational notices MAY persist their dismissal according to State Management policy.

Dismissal preference SHOULD be scoped to the notice version when future materially different notices may need to appear.

---

## 2.76 Testing

Feedback behaviour SHOULD be tested for:

- immediate success;
- slow success;
- failure;
- timeout;
- ambiguous result;
- partial failure;
- duplicate activation;
- retry;
- rollback;
- undo;
- undo expiry;
- offline;
- reconnect;
- concurrent mutation;
- navigation during pending work;
- background completion.

Accessibility tests MUST include:

- keyboard interaction;
- focus preservation;
- live-region announcements;
- duplicate announcement behaviour;
- progress semantics;
- reduced motion.

Automated tests alone are insufficient for live-region behaviour.

Representative screen-reader testing SHOULD be performed for canonical feedback components and Patterns.

---

## 2.77 Exceptions

A deviation from this standard MUST document:

- affected workflow;
- standard rule being deviated from;
- rationale;
- user-impact risk;
- accessibility impact;
- Security impact;
- persistence/recovery implications.

Repeated exceptions MUST trigger Pattern or Design System review.

---

# 3. Anti-patterns

The following are non-conformant unless explicitly covered by an approved exception.

## 3.1 Toast everything

Every successful or failed API request creates a toast.

## 3.2 Toast validation

Field errors appear only in a toast while affected fields remain unexplained.

## 3.3 Persistent condition, transient message

An unresolved outage or permission problem disappears after a few seconds.

## 3.4 Global banner for local problem

One failed widget creates an application-wide alert.

## 3.5 Success redundancy

A visible state change, success icon, inline message, and toast all confirm the same routine action.

## 3.6 Generic success

Messages say only **Success!** without identifying what succeeded.

## 3.7 Generic failure

Known operations fail with only **Something went wrong**.

## 3.8 Raw backend error

Stack traces, SQL errors, internal service names, or exception messages are displayed directly.

## 3.9 Premature success

The UI announces success before the authoritative operation is complete.

## 3.10 Fake progress

A percentage is invented to make an unknown-duration operation feel determinate.

## 3.11 100% but not complete

The progress bar reaches 100% while significant server work remains without explaining the next stage.

## 3.12 Spinner forever

A long-running operation uses only an indefinite spinner and provides no persistent job state.

## 3.13 Browser-owned job

Closing or refreshing the browser destroys the only record of a critical long-running operation.

## 3.14 Optimistic payment

Financial or similarly consequential completion is displayed before authoritative confirmation.

## 3.15 Invisible rollback

An optimistic change silently snaps back after failure with no explanation.

## 3.16 Fake undo

Undo visually restores an item even though the backend cannot reverse the action.

## 3.17 Undo after expiry

A visible Undo action remains after the server's reversal window has closed.

## 3.18 Confirm everything

Low-risk reversible actions interrupt users with confirmation dialogs instead of using appropriate undo.

## 3.19 Undo everything

Irreversible or high-consequence actions skip necessary confirmation because Undo is assumed to be universally superior.

## 3.20 Notification waterfall

A batch action generates one message for every item.

## 3.21 Autosave spam

Each successful autosave produces a new toast.

## 3.22 Polling-error spam

Every failed background poll generates another notification.

## 3.23 Assertive everything

Routine success and information messages use `role="alert"` or assertive live regions.

## 3.24 Toast focus theft

A newly appearing toast automatically receives keyboard focus.

## 3.25 Screen-reader progress spam

Every percentage change is announced.

## 3.26 Colour-only status

Success and error are distinguished only through green and red.

## 3.27 Warning inflation

Informational content is styled as warnings so users "notice it."

## 3.28 Banner blindness by design

Many persistent banners appear simultaneously until none has meaningful priority.

## 3.29 Dismissed-but-unresolved

Closing a warning makes an unresolved consequential system state impossible to rediscover.

## 3.30 Spinner-only control

A button replaces all text with an unlabeled spinner, making the pending action unclear.

## 3.31 Disabled forever

A failed async operation leaves the initiating control disabled because pending state was not reconciled.

## 3.32 Error equals no data

Failed loading is rendered as an empty state.

## 3.33 Partial equals success

A bulk or import operation with failures receives normal complete-success treatment.

## 3.34 Timeout equals failure

A client timeout is presented as definitive server failure even though the final state is unknown.

## 3.35 Client-only duplicate prevention

A high-consequence mutation relies solely on disabling a button to prevent duplication.

## 3.36 Toast as audit trail

Users are expected to rely on disappeared toast messages as evidence of high-consequence completion.

## 3.37 Technical progress

Users see internal queue names, worker stages, offsets, or service terminology that provide no meaningful task context.

## 3.38 Unbounded feedback state

Old notifications accumulate indefinitely without prioritisation, grouping, or lifecycle rules.

## 3.39 Toast-library leakage

Feature code directly imports multiple notification libraries and chooses presentation independently.

## 3.40 Decorative status animation

Status UI continuously pulses, bounces, or animates despite no informational need.

---

# 4. Checklist

An implementation conforms to this standard only when the following can be answered **yes** where applicable.

### Feedback selection

- [ ] The message uses the smallest appropriate feedback scope.
- [ ] Toast is used only for genuinely transient acknowledgement.
- [ ] Local issues remain local.
- [ ] Persistent conditions receive persistent feedback.
- [ ] High-scope banners are reserved for high-scope conditions.
- [ ] Dialogs are used only where user decision is required.

### Toasts

- [ ] Toast content is concise and specific.
- [ ] The toast does not contain information needed later.
- [ ] Duration is appropriate to message length and actions.
- [ ] Toast stacking is bounded.
- [ ] Duplicate messages are suppressed or combined.
- [ ] Feature code uses the canonical feedback abstraction.
- [ ] The toast does not steal focus.

### Success

- [ ] Success is not announced before authoritative completion unless explicitly optimistic.
- [ ] Routine success feedback is restrained.
- [ ] Redundant success messaging is avoided.
- [ ] Significant completion receives durable evidence where required.
- [ ] Success is not communicated through colour alone.

### Failure

- [ ] The failed operation is identified.
- [ ] Recovery is provided where practical.
- [ ] User work is preserved where possible.
- [ ] Ambiguous outcomes are described honestly.
- [ ] Partial failure is distinguished from complete failure/success.
- [ ] Raw technical errors are not exposed.

### Pending and progress

- [ ] Pending state appears when an operation cannot complete immediately.
- [ ] Duplicate unsafe activation is prevented.
- [ ] Determinate progress is used only when progress is actually measurable.
- [ ] Indeterminate progress does not invent percentages.
- [ ] Long-running operations have persistent status.
- [ ] Transfer completion is distinguished from later processing where necessary.
- [ ] Cancel is shown only when cancellation is real.

### Optimistic UI

- [ ] Optimistic behaviour is appropriate to the consequence level.
- [ ] Optimistic state is distinct from confirmed state internally.
- [ ] Rollback behaviour exists.
- [ ] Failure feedback explains unsuccessful persistence.
- [ ] Concurrent server changes cannot be silently overwritten.
- [ ] High-consequence actions await authoritative confirmation.

### Undo

- [ ] The underlying operation is genuinely reversible.
- [ ] Undo duration matches backend capability.
- [ ] Undo is idempotent where practical.
- [ ] Conflict behaviour is defined.
- [ ] Confirmation is still used for irreversible/high-risk actions.
- [ ] Undo does not rely solely on a disappearing presentation if durable recovery is required.

### Notification fatigue

- [ ] Self-evident routine changes do not generate unnecessary messages.
- [ ] Autosave does not create repeated toast spam.
- [ ] Background polling failures are rate-limited or escalated appropriately.
- [ ] Batch activity produces aggregate feedback.
- [ ] Repeated messages are deduplicated.
- [ ] Warning volume remains low enough to preserve meaning.

### Persistence

- [ ] Feedback remains visible for as long as the condition remains relevant.
- [ ] Persistent unresolved messages cannot disappear permanently by accident.
- [ ] Resolved warnings are removed.
- [ ] Navigation does not destroy important workflow feedback.
- [ ] Flash feedback does not incorrectly replay after refresh/back navigation.

### Connectivity

- [ ] Offline and service failure are distinguished.
- [ ] Repeated connectivity failures do not create notification floods.
- [ ] Reconnection reconciles authoritative state where needed.
- [ ] Queued offline mutations have defined conflict behaviour.

### Accessibility

- [ ] Status messages are programmatically available where required.
- [ ] Routine announcements use polite semantics.
- [ ] Assertive announcements are reserved for genuinely urgent information.
- [ ] Status messages do not steal focus unnecessarily.
- [ ] Interactive feedback controls are keyboard accessible.
- [ ] Dismiss controls have accessible names.
- [ ] Determinate progress exposes an appropriate current value.
- [ ] Indeterminate progress omits fictional value semantics.
- [ ] Continuous progress is not announced at every visual increment.
- [ ] Reduced-motion preferences are respected.

### Content & UX Writing

- [ ] Feedback identifies what happened.
- [ ] Recovery guidance appears when useful.
- [ ] Known failures use specific wording.
- [ ] Error messages avoid unnecessary technical terminology.
- [ ] Success copy is concise.
- [ ] Retry actions identify the operation where ambiguity exists.
- [ ] Security-sensitive messaging avoids prohibited information disclosure.

### Security and data integrity

- [ ] Sensitive operation outcomes use authoritative backend state.
- [ ] Security messaging does not enable enumeration or data disclosure.
- [ ] High-consequence completion has durable confirmation where required.
- [ ] Pending state is not mistaken for persisted state.
- [ ] Client controls are not the only duplicate-protection mechanism.
- [ ] Database/API conflicts propagate into appropriate user feedback.

### State and API alignment

- [ ] Feedback state has an explicit owner.
- [ ] Toast state is not the authoritative domain state.
- [ ] Optimistic state reconciles with server state.
- [ ] API errors map to canonical safe user messages.
- [ ] Async API acceptance is not confused with operation completion.
- [ ] Long-running work has durable operation identity.

### Components and Patterns

- [ ] Feedback uses canonical shadcn/ui-based Components.
- [ ] Semantic colours resolve to Design Tokens.
- [ ] Status icons follow the Iconography standard.
- [ ] Complete workflows follow canonical Patterns.
- [ ] Forms use field/form validation rather than toast-only errors.
- [ ] Background jobs expose a persistent status surface.

### Testing

- [ ] Slow operations are tested.
- [ ] Failure and timeout paths are tested.
- [ ] Partial failure is tested.
- [ ] Retry is tested.
- [ ] Optimistic rollback is tested.
- [ ] Undo and Undo expiry are tested.
- [ ] Offline/reconnect behaviour is tested.
- [ ] Keyboard/focus behaviour is tested.
- [ ] Live-region behaviour receives representative assistive-technology testing.

---

# 5. Canonical summary

Feedback MUST communicate **what happened, what is happening, and what the user can do next** at the smallest appropriate scope.

**Local feedback MUST remain local. Persistent conditions MUST receive persistent feedback. Toasts MUST be reserved for brief acknowledgement that does not require lasting context.**

**A toast MUST NOT replace validation, workflow state, job history, audit evidence, or persistent error handling.**

**Success acknowledgement SHOULD be proportional to significance. Routine obvious state changes SHOULD NOT generate redundant notifications.**

**Failures MUST identify the affected operation, preserve user work where possible, and provide meaningful recovery. Partial failure MUST NOT be represented as complete success.**

**Pending state MUST appear when accepted work cannot complete immediately.**

**Determinate progress MUST use real measurable progress. Indeterminate work MUST NOT invent percentages. A spinner represents activity, not completion percentage.**

**Long-running work MUST have persistent authoritative status when its lifecycle can outlive the initiating page or request.**

**Optimistic UI SHOULD be limited to low-risk, highly predictable, reversible interactions. Optimistic state MUST reconcile to authoritative server state, and failure MUST trigger explicit rollback or recovery.**

**Financial, security-sensitive, irreversible, or otherwise high-consequence operations SHOULD NOT present final success before authoritative confirmation.**

**Undo SHOULD reduce confirmation friction for genuinely reversible, low-risk operations. Undo MUST correspond to a real backend/domain reversal capability and MUST remain valid for the promised window.**

**The product MUST protect user attention. Autosave, polling, bulk operations, and routine mutations MUST NOT create notification spam. Repeated feedback SHOULD be deduplicated, aggregated, or escalated deliberately.**

**Status colour and iconography MUST remain semantically stable and MUST NOT be the sole carrier of critical meaning.**

**Routine status announcements SHOULD use polite live-region semantics. Assertive alerts MUST be reserved for important, time-sensitive information.**

**Status updates SHOULD normally be announced without moving focus. Toasts MUST NOT steal focus.**

**Determinate progress MUST expose its current value programmatically. Indeterminate progress MUST omit invented current-value semantics. Visual progress updates MUST NOT cause excessive assistive-technology announcements.**

**Security requirements override ordinary feedback specificity where detailed messaging could expose sensitive state or enable enumeration.**

**API acceptance, database persistence, job completion, and user-visible success MUST remain distinct where the architecture distinguishes them.**

**Feedback Components MUST be implemented through the canonical shadcn/ui-based system, but business logic MUST depend on the application's feedback abstraction rather than a specific toast library.**

**Design Tokens own visual status semantics. Components own primitives. Patterns own complete feedback workflows. Content & UX Writing owns message language. State Management, API, Data & Database, Forms & Validation, Security, and Accessibility remain authoritative for their respective state and correctness guarantees.**

The Gold Standard is achieved when users can **understand the state of an action without guessing, recover from failure without losing context, trust success messages as authoritative, and receive enough feedback to remain oriented without being interrupted by unnecessary notifications.**

For the 2026 implementation baseline, shadcn now has a first-party Base UI `Toast` supporting status types, actions, promise-state updates, stacking, and dismissal; older Radix Toast is deprecated in favour of Sonner, so wrapping toast behaviour behind a project-owned abstraction avoids coupling product logic to either implementation. citeturn133728search0turn133728search3turn133728search5

The accessibility rules above align with WCAG 2.2 status-message requirements: routine status can be exposed without moving focus, while assertive alerts are intended for important/time-sensitive information and should not be overused. For progress bars, current WAI guidance says determinate progress should expose its current value, while indeterminate progress should omit `aria-valuenow`; experimental announcement APIs such as `ariaNotify` should currently remain progressive enhancement rather than the sole mechanism. citeturn133728search4turn183653search0turn183653search2turn133728search11
