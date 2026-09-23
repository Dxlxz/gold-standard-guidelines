---
id: "states-catalogue"
title: "Empty Loading Error States Catalogue"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "states", "empty", "loading", "error"]
applies_to: ["data"]
related: []
legacy_number: 53
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 55024
provenance: baseline

---

Below is the canonical catalogue, structured for direct inclusion in the standards corpus.

# Empty, Loading and Error States Catalogue — Gold Standard 2026

**Canonical placement:** Components → States Catalogue → Patterns → Content & UX Writing  
**Status:** Canonical  
**Applies to:** Web applications, responsive web interfaces, authenticated products, administrative interfaces, dashboards, data-heavy workflows, forms, tables, dialogs, asynchronous actions, background synchronization, and offline-capable experiences  
**Component baseline:** shadcn/ui  
**Normative terms:** MUST, MUST NOT, SHOULD, SHOULD NOT, MAY

---

# 1. Purpose

## 1.1 Objective

This standard defines the canonical UX, component, state-management, accessibility, layout, recovery, and content-writing requirements for:

1. loading states;
2. skeleton screens;
3. spinners;
4. determinate and indeterminate progress;
5. first-run empty states;
6. no-results states;
7. no-permission states;
8. intentionally cleared states;
9. inline errors;
10. page-level errors;
11. partial failures;
12. retry and recovery;
13. offline states;
14. degraded and stale-data states; and
15. accessible state announcements.

The purpose of a state UI is not merely to report that data is absent or an operation has failed. State UI MUST preserve the user's mental model of the application, explain what is happening at the correct scope, preserve recoverable work, expose meaningful recovery actions, and avoid representing one domain condition as another.

A loading state MUST NOT masquerade as an empty state. An authorization failure MUST NOT masquerade as missing data. A partial failure MUST NOT collapse an otherwise usable page. A background refresh MUST NOT regress usable content to a blocking loader.

## 1.2 Relationship to other standards

This catalogue MUST be implemented consistently with:

- **Security:** authorization boundaries, information disclosure, session expiry, safe error messaging, protected resource existence, sensitive caching, telemetry, and audit requirements;
- **Data & Database:** source-of-truth semantics, stale data, optimistic state, consistency, conflict handling, timestamps, and partial availability;
- **API:** HTTP semantics, error contracts, retryability, `Retry-After`, validation responses, idempotency, partial responses, and correlation identifiers;
- **State Management:** explicit state machines, derived state, server state versus client state, stale-while-revalidate behavior, cache retention, and mutation lifecycle;
- **Forms & Validation:** field errors, form-level summaries, preservation of entered values, async validation, submission state, and server-side validation;
- **Accessibility:** WCAG 2.2, keyboard operation, logical focus management, status messages, live regions, reduced motion, semantic progress, and non-color state communication;
- **Design Tokens:** semantic colors, spacing, typography, motion, borders, opacity, focus rings, icon sizing, and elevation;
- **Component standards:** Button, Alert, Empty, Skeleton, Spinner, Progress, Card, Table, Dialog, AlertDialog, and notification primitives;
- **Pattern standards:** page shells, tables, filters, search, CRUD workflows, forms, upload/download, authentication, permissions, and asynchronous background jobs; and
- **Content & UX Writing:** plain language, action-oriented recovery copy, specificity, consistent terminology, and prohibition on developer-facing implementation details.

WCAG 2.2 requires status messages such as loading, results, progress, and errors to be programmatically available to assistive technology without requiring an unnecessary focus change. `role="status"` provides a polite live-region mechanism; assertive alerts are intended for important, time-sensitive conditions and MUST therefore be used selectively. citeturn709403search2turn709403search4turn820345search6

## 1.3 shadcn/ui baseline

The canonical component baseline uses the current shadcn/ui primitives:

| State need | Baseline primitive |
|---|---|
| Shape-preserving loading | `Skeleton` |
| Small indeterminate activity | `Spinner` |
| Measurable or long-running progress | `Progress` |
| Empty/no-results/no-access presentation | `Empty` composition |
| In-flow warning or error | `Alert` |
| User decision that must interrupt work | `AlertDialog` |
| Recovery/action | `Button` |
| Structured state container | `Card`, page section, table region, dialog region |
| Transient supplementary feedback | Product notification/toast primitive |

shadcn/ui currently provides dedicated Skeleton, Spinner, Progress, Empty, Alert, and AlertDialog components; `Empty` is explicitly compositional with media, title, description, and content/action regions. citeturn709403search3turn709403search9turn820345search0turn820345search1turn820345search8

Applications MAY wrap these primitives in product-specific state components, but wrappers MUST preserve the accessibility contract and visual/token conventions of the canonical primitives.

---

# 2. Rules

## 2.1 Canonical state model

Applications MUST model asynchronous state explicitly. A single `isLoading` boolean is insufficient for any workflow that can distinguish initial loading, refreshing, success, empty success, failure, retry, offline operation, or stale data.

At minimum, data-driven interfaces MUST be able to represent:

```text
idle
pending
success:data
success:empty
error
```

Where applicable, the state model SHOULD additionally represent orthogonal conditions such as:

```text
refreshing
retrying
stale
offline
degraded
queued
optimistic
conflicted
```

The following distinctions are mandatory:

| Condition | Meaning |
|---|---|
| `pending` | No authoritative result for the current request is available yet |
| `success:data` | Request succeeded and meaningful content exists |
| `success:empty` | Request succeeded and the authoritative result is legitimately empty |
| `error` | The requested operation failed |
| `refreshing` | Existing usable content remains available while a new version is fetched |
| `stale` | Existing content is usable but may no longer represent the newest source state |
| `offline` | Required network connectivity is unavailable |
| `degraded` | Some dependency or capability is unavailable while the product remains partly usable |
| `queued` | A write has been accepted locally for later synchronization |
| `conflicted` | A write cannot safely complete because source state changed |

**Empty MUST only be entered after a successful authoritative result.**

A `401`, `403`, network failure, parse failure, timeout, or server failure MUST NOT produce a generic "No data" state.

Valid cached data MUST NOT be replaced by an initial-loading skeleton merely because a background refetch has started.

---

## 2.2 State scope

Every state MUST be rendered at the smallest scope capable of accurately representing the condition.

Examples:

- a failed table widget MUST show a table-level error rather than replacing the page;
- a failed profile avatar MAY show a media-level fallback;
- a failed page resource MAY use a page-level error;
- a failed form field MUST use a field-level error;
- a background synchronization problem SHOULD use a persistent but non-blocking status treatment;
- an application-wide outage MAY use a global degraded-service state.

A child failure MUST NOT unnecessarily destroy healthy parent content.

State scope MUST remain stable between loading, success, empty, and failure wherever practical so layout does not jump unpredictably.

---

## 2.3 Loading-state selection

The loading indicator MUST communicate the type and scope of waiting.

### 2.3.1 Selection rule

Use:

| Situation | Required pattern |
|---|---|
| Final content structure is known | Skeleton |
| Small atomic action with unknown duration | Spinner |
| Progress is meaningfully measurable | Determinate Progress |
| Long-running process without measurable progress | Indeterminate Progress plus status copy |
| Existing data is being refreshed | Preserve data; use subtle refresh state |
| Button-triggered mutation | Inline spinner/progress within triggering control |
| Page shell or navigation already exists | Preserve shell; load content region only |

A blank page plus centered spinner SHOULD NOT be used when the page structure is known.

Skeletons SHOULD be preferred for initial loading of cards, tables, lists, forms, and detail layouts because they preserve expected geometry.

Spinners SHOULD be reserved for compact or atomic operations where reproducing final geometry provides no value.

---

## 2.4 Loading timing

Loading indicators MUST be designed to minimize visual flashing without artificially delaying completed content.

Canonical timing defaults are:

| Duration | Treatment |
|---|---|
| `< 200 ms` | SHOULD normally show no loading indicator |
| `200 ms–1 s` | Local skeleton or compact spinner MAY appear |
| `> 1 s` | Loading purpose SHOULD be explicit in visible or accessible copy |
| `> 10 s` | The experience SHOULD expose meaningful progress, stage, explanation, cancellation, or continued-background behavior where technically possible |

The application MAY tune these thresholds using shared state/motion tokens, but different features MUST NOT invent arbitrary per-screen delays.

The product MUST NOT intentionally delay completed content merely to satisfy a minimum spinner duration.

Animation SHOULD appear after a short loading-delay token instead of immediately flashing on every fast request.

---

## 2.5 Skeleton screens

### 2.5.1 Anatomy

A skeleton MAY contain:

1. media placeholder;
2. title/text placeholders;
3. metadata placeholders;
4. control placeholders where the controls themselves cannot yet be used; and
5. repeating rows or cards representative of the expected content.

Skeletons MUST approximate the final layout sufficiently to reserve space and minimize cumulative layout shift.

### 2.5.2 Rules

Skeletons MUST:

- match the major geometry of the content being loaded;
- use Design Token spacing, radius, surface, and animation values;
- be visually subordinate to actual content;
- respect reduced-motion preferences;
- be non-interactive; and
- be hidden from the accessibility tree unless a specific semantic need requires otherwise.

The loading **region**, not every skeleton element, SHOULD carry the meaningful accessible loading state.

The parent region SHOULD use `aria-busy="true"` while materially updating and return to `false` when settled.

Skeletons MUST NOT:

- expose fake text to screen readers;
- imitate fully readable content;
- show controls that appear actionable;
- use random widths on every render;
- animate aggressively;
- replace usable cached data during routine refetch;
- display dozens of placeholder rows solely because the eventual collection could be large; or
- duplicate the entire application chrome when only one content region is loading.

### 2.5.3 Table skeletons

Table skeletons SHOULD preserve:

- column positions;
- header geometry when headers are already known;
- approximate row height;
- selection/action-column positions; and
- container height for the expected first viewport.

Table headers that are static SHOULD remain real rather than becoming skeletons.

---

## 2.6 Spinners

### 2.6.1 Anatomy

A spinner consists of:

1. animated visual indicator;
2. accessible label when it is the semantic loading indicator; and
3. optional visible activity text.

The shadcn/ui Spinner baseline exposes a loading status and label by default. citeturn709403search0

### 2.6.2 Rules

A semantic spinner MUST describe what is loading when "Loading" alone would be ambiguous.

Preferred labels include:

- "Loading projects";
- "Saving changes";
- "Checking availability";
- "Uploading file"; and
- "Refreshing results".

Multiple decorative spinners inside one semantic loading scope MUST NOT each be announced.

When a spinner is embedded in a button:

- the button MUST retain an accessible name;
- the spinner SHOULD be decorative if the button label already communicates the pending action;
- repeated activation MUST be prevented when duplicate execution is unsafe;
- focus MUST remain on the initiating control unless navigation or another explicit focus-management pattern requires otherwise; and
- the control SHOULD preserve its width to prevent layout movement.

Preferred button labels retain action context:

```text
Saving…
Uploading…
Deleting…
Sending…
```

Avoid replacing a descriptive button label with only "Loading…".

---

## 2.7 Progress indicators

Progress MUST be used when progress itself helps users understand or control a process.

### 2.7.1 Determinate progress

Use determinate progress when the application knows a meaningful completion ratio.

Examples:

- file upload;
- import;
- export generation with measurable stages;
- bulk processing;
- onboarding sequence; or
- installation/migration.

Determinate progress MUST expose its current value programmatically. A progress bar with a known value SHOULD show visible percentage or stage information for longer operations.

### 2.7.2 Indeterminate progress

Use indeterminate progress when completion cannot be meaningfully estimated.

An indeterminate progress bar MUST NOT fabricate a percentage.

For ARIA `progressbar`, `aria-valuenow` is expected for determinate progress and omitted for indeterminate progress. citeturn709403search5

### 2.7.3 Long-running processes

A process likely to exceed approximately 10 seconds SHOULD communicate at least one of:

- percentage;
- completed/total count;
- current stage;
- estimated scope;
- whether leaving the page is safe;
- whether processing continues in the background; or
- cancellation capability.

Copy MUST NOT claim an estimated completion time unless the estimate is backed by product logic that is sufficiently reliable.

"99%" MUST NOT be held indefinitely when the underlying job has no truthful mapping to 99%.

---

## 2.8 Background refresh

Existing valid data MUST remain visible during non-destructive refetch unless displaying it would be unsafe or misleading.

A background refresh SHOULD use one of:

- a subtle spinner adjacent to a refresh action;
- "Refreshing…" status copy;
- a stale timestamp;
- a lightweight progress treatment; or
- no visible loading indication for sufficiently fast automatic refresh.

The page MUST NOT regress to full skeletons solely because cached content is being validated.

Actions dependent on known-stale information SHOULD be disabled or qualified when using that information could cause an unsafe operation.

---

## 2.9 Empty states — general

An empty state represents a **successful absence of applicable content**.

Canonical anatomy is:

```text
Empty
├── Optional media/icon
├── Title
├── Description
├── Primary action, when applicable
├── Secondary action/help, when applicable
└── Optional contextual metadata
```

This aligns with the shadcn/ui `Empty` composition of `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, and `EmptyContent`. citeturn709403search3

Empty states MUST:

- explain why the region is empty when that reason is actionable or meaningful;
- distinguish system state from user action;
- present the most likely next step;
- avoid developer terminology such as "null", "zero rows", or "API returned no records"; and
- occupy the same semantic region the content would normally occupy.

Empty states MUST NOT be used for failed requests.

---

## 2.10 First-run empty states

A first-run state occurs when the user has not yet created or acquired content.

### Anatomy

1. optional contextual icon or illustration;
2. outcome-oriented title;
3. short explanation of what belongs here;
4. one clear primary action;
5. optional secondary path such as import, documentation, or example data.

### Copy pattern

```text
{No items yet}

{Explain what the item enables or what will appear here.}

[Primary creation action]
[Optional secondary action]
```

Preferred:

```text
No projects yet

Create a project to organize your environments, members, and deployments.

[Create project]
[Import project]
```

Avoid:

```text
Nothing here!
Get started now!!!
```

First-run copy SHOULD communicate value before implementation detail.

The primary action SHOULD correspond directly to the action that resolves the empty state.

---

## 2.11 No-results states

A no-results state occurs when content exists in principle but the current search, filter, query, or scope returned none.

No-results states MUST preserve the controls that produced the result.

The state SHOULD identify the active constraint when practical.

### Copy pattern

```text
No {items} match your {search/filters}

Try changing your search or clearing one or more filters.

[Clear filters]
```

For search:

```text
No results for “{query}”

Check the spelling or try a different search.

[Clear search]
```

If filters are active, **Clear filters** SHOULD normally be the primary recovery action.

"Create new" SHOULD NOT be the default recovery for a filtered no-results state unless creating new content is genuinely likely to satisfy the user's intent.

Search terms entered by the user MUST NOT be discarded merely because there are no results.

---

## 2.12 No-permission states

No-permission is an authorization state, not an ordinary empty state.

It MAY use the visual `Empty` composition, but the state semantics and copy MUST identify an access restriction.

### Copy pattern

```text
You don't have access to {resource}

Ask an administrator for access, or return to {safe destination}.

[Request access]
[Go back]
```

Where product policy requires existence-hiding, the interface MUST use the approved Security standard response instead of revealing that a protected resource exists.

The interface MUST NOT expose:

- hidden resource metadata;
- owner identity when unauthorized;
- protected object names;
- access-policy internals;
- role mappings;
- raw permission IDs; or
- backend authorization details.

`403 Forbidden` SHOULD map to an access state where existence may safely be disclosed.

A security-approved `404 Not Found` MAY intentionally represent both absent and undisclosed resources.

Authentication expiry (`401`) MUST normally offer re-authentication rather than present "No permission".

---

## 2.13 Cleared or completed empty states

A cleared state represents an intentionally empty collection, completed queue, cleared inbox, empty trash, or other expected zero state after user activity.

This state SHOULD be lightweight and reassuring.

Examples:

```text
You're all caught up
There are no notifications requiring your attention.
```

```text
Trash is empty
Deleted items will appear here.
```

```text
No archived projects
Projects you archive will appear here.
```

A cleared state SHOULD NOT invent a call to action when no next action is necessary.

Celebratory treatment MAY be used for genuinely meaningful completion, but routine zero states MUST NOT become visually distracting.

---

## 2.14 Error-state classification

Errors MUST be classified by scope and recoverability.

The canonical hierarchy is:

| Type | Use when |
|---|---|
| Field error | One input is invalid |
| Form/action error | Submission or mutation failed |
| Inline/region error | One component or bounded region failed |
| Partial error | Some independent content failed while other content remains usable |
| Page-level error | Primary page resource cannot be used |
| Application/dependency error | Broad service capability is unavailable |

The UI MUST NOT escalate a local error to page-level unless the failure invalidates the page's primary purpose.

---

## 2.15 Inline errors

Inline errors belong immediately adjacent to the failing operation or region.

Examples:

- table widget failed to refresh;
- chart dependency failed;
- attachment upload failed;
- async selector could not retrieve options;
- field validation failed.

### Anatomy

1. error indicator;
2. concise description;
3. recovery action when recovery is available;
4. optional safe diagnostic reference.

### Copy pattern

```text
We couldn't load {content}.

[Try again]
```

For retained data:

```text
We couldn't refresh this data.
Showing the last available version from {time}.

[Try again]
```

For a mutation:

```text
We couldn't save your changes.
Your edits are still here.

[Try again]
```

Inline errors MUST NOT rely solely on a toast if the affected region remains in an error state.

---

## 2.16 Page-level errors

A page-level error is appropriate when the page's primary resource cannot be loaded and no meaningful page content can be used.

The global application shell SHOULD remain available when safe.

### Anatomy

1. clear page/state heading;
2. brief explanation;
3. primary recovery action;
4. secondary navigation action;
5. support or reference information only when useful.

### Copy pattern

```text
We couldn't load {resource}

Something went wrong while loading this page.

[Try again]
[Go back]
```

Where the reason is known and user-actionable, copy SHOULD be more specific:

```text
This link has expired

Request a new link to continue.

[Request new link]
```

Page-level errors MUST NOT expose stack traces, exception class names, SQL errors, internal service names, source paths, credentials, secrets, or infrastructure topology.

A correlation or support reference MAY be shown if it is safe for end-user disclosure.

---

## 2.17 Partial failures

Independent content SHOULD fail independently.

If a dashboard contains six widgets and one fails, the five healthy widgets MUST remain available unless the failed widget makes them materially misleading.

A partial error SHOULD:

- remain inside the affected region;
- identify only the failed capability;
- permit local retry;
- retain stale data when appropriate;
- expose a stale timestamp where relevant; and
- avoid presenting the entire page as unavailable.

Example:

```text
Revenue data is temporarily unavailable

Other dashboard data is still current.

[Retry]
```

If stale data remains visible:

```text
Couldn't refresh revenue
Showing data last updated at 10:42 AM.

[Try again]
```

---

## 2.18 Form submission failures

Form errors MUST comply with the Forms & Validation standard.

On failed submission:

- entered values MUST remain unless clearing them is explicitly required for security;
- invalid fields MUST identify their errors programmatically;
- a form-level summary SHOULD be provided for multiple errors;
- focus SHOULD follow the Forms standard rather than move unpredictably;
- server-side validation MUST be mapped to the relevant field where possible;
- general server failures MUST NOT be falsely represented as field validation;
- the submit control MUST return from pending to usable state if retry is possible.

Preferred mutation error:

```text
We couldn't save your changes.
Review the highlighted fields and try again.
```

For non-validation failures:

```text
We couldn't save your changes.
Your edits are still here. Try again.
```

---

## 2.19 API-to-UX error mapping

Frontend state MUST preserve meaningful API semantics.

Canonical mapping SHOULD follow:

| API condition | UX treatment |
|---|---|
| `400` malformed request | Product error or form error depending contract |
| `401` unauthenticated/session expired | Re-authentication flow |
| `403` forbidden | No-permission state if disclosure is allowed |
| `404` resource absent | Not-found state or security-preserving equivalent |
| `409` conflict | Conflict/review state; preserve user work |
| `422` semantic validation | Field/form validation |
| `429` rate limited | Retry guidance; honor server retry information |
| `5xx` | Recoverable service error where appropriate |
| network failure | Offline/connectivity state or generic network error |
| timeout | Retryable timeout state when operation is safe to repeat |

Applications MUST consume the canonical API error envelope rather than derive UX from arbitrary backend strings.

Raw API messages MUST NOT be shown directly unless they are explicitly authored, localized, security-reviewed, and designated as end-user-safe.

---

## 2.20 Retry rules

Retry MUST be based on operation semantics, not merely the existence of an error.

### Automatic retry

Automatic retry MAY be used for transient, idempotent reads.

Automatic retry SHOULD:

- use bounded exponential backoff;
- include jitter where appropriate;
- honor `Retry-After`;
- stop after the shared retry-policy maximum;
- terminate when the request is no longer relevant; and
- avoid duplicate status announcements.

Automatic retry MUST NOT normally be used for:

- validation failures;
- permission failures;
- authentication failures;
- confirmed not-found responses;
- business-rule conflicts;
- destructive mutations; or
- writes without idempotency guarantees.

### User-triggered retry

A visible **Try again** action MUST retry the failing scope only.

Retry MUST NOT reset unrelated state.

Retry MUST NOT discard entered form data.

Repeated retry failure SHOULD eventually provide an alternative recovery path where one exists, such as:

- reload;
- reconnect;
- return;
- save draft;
- download work;
- contact support; or
- continue with available data.

The application MUST avoid infinite retry loops.

---

## 2.21 Mutation recovery and idempotency

Write operations require stronger safeguards than reads.

A mutation MAY be automatically retried only when its API contract makes duplicate execution safe, for example through:

- idempotency keys;
- idempotent method semantics;
- transaction identifiers; or
- confirmed deduplication behavior.

The UI MUST NOT silently retry operations capable of:

- charging money twice;
- creating duplicate records;
- sending duplicate messages;
- triggering multiple approvals;
- deleting additional content; or
- invoking external side effects without idempotency protection.

When the final mutation outcome is uncertain, the interface SHOULD use an explicit uncertainty state such as:

```text
We couldn't confirm whether the payment completed.

Check the payment status before trying again.
```

It MUST NOT invite immediate repetition when duplicate side effects are possible.

---

## 2.22 Conflict recovery

A `409` or equivalent data conflict MUST preserve user work where technically possible.

Conflict copy SHOULD state:

1. what changed;
2. whether local edits are preserved;
3. what the user must decide next.

Example:

```text
This record changed while you were editing

Your edits are still available. Review the latest version before saving again.

[Review changes]
```

"Something went wrong" SHOULD NOT be used when the application knows the issue is a concurrency conflict.

---

## 2.23 Offline states

Offline is a capability state, not merely a visual banner.

The application MUST distinguish between:

- confirmed network request failure;
- browser/network hints;
- service outage;
- authentication failure; and
- application-specific API failure.

Browser connectivity signals SHOULD be treated as hints rather than the sole proof that a service is reachable.

### Offline with cached data

Preferred:

```text
You're offline

Showing saved data from {time}. Some actions are unavailable until you're back online.
```

The UI MUST identify stale or cached data when freshness materially affects decisions.

### Offline without cached data

Preferred:

```text
You're offline

Connect to the internet to load {content}.

[Try again]
```

### Offline writes

Every write-capable feature MUST explicitly choose one of three policies:

1. **Unavailable offline** — action disabled with explanation;
2. **Local draft** — data saved locally but not submitted;
3. **Queued sync** — operation queued for server synchronization.

The UI MUST NOT claim "Saved" when the operation is only stored locally unless the copy explicitly distinguishes local and server persistence.

Preferred queued copy:

```text
Saved on this device
We'll sync your changes when you're back online.
```

Sensitive information MUST NOT be persisted for offline use unless permitted by the Security and Data standards.

---

## 2.24 Reconnection

When connectivity returns, the application SHOULD recover without forcing a full reload where safe.

A reconnection state MAY announce:

```text
Back online
Refreshing your data.
```

Successful restoration SHOULD be communicated once:

```text
You're back online
Data is up to date.
```

The application MUST NOT repeatedly announce connectivity flapping if doing so creates excessive interruption.

Queued writes MUST expose unresolved conflicts or permanent failures rather than silently disappearing from the queue.

---

## 2.25 Degraded states

A degraded state occurs when the product remains usable but a capability, dependency, or data source is unavailable or delayed.

Examples:

- reporting unavailable while CRUD remains operational;
- search unavailable while direct navigation works;
- attachment service unavailable while form submission remains possible;
- one data source delayed while other sources are current;
- system operating read-only.

A degraded state MUST state the capability impact, not merely "Service degraded."

Preferred:

```text
File uploads are temporarily unavailable

You can continue editing and save the record without attachments.
```

or:

```text
Read-only mode

You can view current data, but changes cannot be saved right now.
```

Global degraded banners SHOULD remain persistent while the limitation is active and SHOULD disappear when the capability is restored.

Affected controls MAY be disabled, but the reason MUST be available to the user.

---

## 2.26 Stale data

Stale data MAY remain visible when it is safer and more useful than displaying no data.

Stale content MUST be identified when freshness materially affects user decisions.

Use specific timestamps where useful:

```text
Last updated 10:42 AM
```

or:

```text
Showing data from 21 September 2026
```

Avoid vague copy such as:

```text
Data may be old.
```

Staleness SHOULD be represented independently from error state so usable content remains available.

---

## 2.27 Accessible loading announcements

Dynamic state changes MUST satisfy the Accessibility standard and WCAG status-message requirements. citeturn709403search2turn709403search6

### Polite status

Use a `role="status"` or equivalent polite live region for non-critical changes such as:

- "Loading projects";
- "Searching";
- "18 results";
- "No results";
- "Saved";
- "Back online";
- "Retrying"; or
- completion of a background operation.

A status region SHOULD exist before its content changes when cross-assistive-technology reliability requires it.

### Assertive alert

Use `role="alert"` or equivalent assertive announcement only for important, time-sensitive errors or warnings requiring prompt awareness.

Routine loading messages MUST NOT use assertive announcements.

WAI-ARIA treats `alert` as an assertive live-region mechanism and advises that alerts should not move keyboard focus. citeturn820345search2turn820345search7

### De-duplication

The application MUST NOT announce:

- every skeleton element;
- every animated frame;
- every percentage increment;
- every automatic retry;
- both a spinner and identical live-region message independently.

Announcements SHOULD represent meaningful transitions rather than implementation events.

---

## 2.28 Accessible progress

Determinate progress MUST expose:

- progress semantics;
- an accessible name; and
- the current value.

For lengthy operations, visible textual progress SHOULD accompany visual progress.

For example:

```text
Uploading report.pdf — 64%
```

Assistive announcements SHOULD be throttled to meaningful increments rather than emitting every percentage change.

For long-running upload or processing progress, a polite live region MAY communicate milestone updates; W3C specifically documents live regions as a technique for communicating changing progress. citeturn709403search7

---

## 2.29 Focus management

Inline loading, success, warning, empty, and error states MUST NOT steal focus merely because they appear.

Focus MUST remain logically associated with the user's current operation.

Examples:

- a button retry keeps focus on the retry/action control where practical;
- an inline error does not move focus from an unrelated field;
- a background refresh does not move focus;
- an offline banner does not capture focus;
- a toast does not capture focus.

Page navigation and route-level state changes MUST follow the application's page-focus standard.

If an error requires immediate user action and is presented through a true modal decision, an accessible Dialog or AlertDialog pattern MUST be used.

Focus order MUST preserve meaning and operability. citeturn820345search9

---

## 2.30 Motion and animation

All loading animation MUST comply with the Design Tokens and Accessibility standards.

Skeleton shimmer, pulsing, rotating indicators, and progress animation SHOULD respect `prefers-reduced-motion`.

Reduced-motion mode MAY:

- remove shimmer;
- reduce pulse amplitude;
- use a static placeholder;
- use a low-motion spinner; or
- update progress without decorative interpolation.

Functionality and state comprehension MUST NOT depend on motion.

---

## 2.31 Color and iconography

Status meaning MUST NOT rely on color alone.

Error, warning, offline, degraded, loading, and success states SHOULD combine appropriate combinations of:

- text;
- iconography;
- shape;
- semantic component treatment; and
- programmatic semantics.

All colors MUST come from semantic Design Tokens.

Features MUST NOT introduce arbitrary red, amber, green, or gray values specifically for state UI.

Icons MUST use the product icon system and SHOULD be decorative when the adjacent text communicates equivalent meaning.

---

## 2.32 Layout rules

State layout MUST reflect its scope.

### Full-region states

When an Empty or page-level Error replaces an entire content region:

- content MAY be visually centered;
- the text column SHOULD remain compact;
- primary and secondary actions MUST be grouped with the state;
- the state MUST occupy sufficient region height to read as belonging to that region; and
- global navigation or shell UI SHOULD remain stable.

The content column SHOULD generally not exceed a comfortable reading width of approximately 28–32rem unless the Pattern standard specifies otherwise.

### Inline states

Inline and partial states SHOULD:

- align with surrounding content;
- remain left-aligned in dense data interfaces;
- use local spacing tokens;
- avoid oversized illustration treatment; and
- keep recovery actions near the failure.

### Tables and lists

A table-level Empty/Error MUST remain within the table's semantic/container boundary and MUST NOT appear as an unrelated floating card below the table.

Column headers and filters SHOULD remain visible when they remain meaningful.

### Dialogs and drawers

Loading inside an open Dialog or Sheet MUST remain inside the surface. The underlying page MUST NOT independently display the same operation state.

---

## 2.33 Action hierarchy

Each state SHOULD have no more than one visually dominant recovery action.

The primary action MUST represent the most likely next successful step.

Examples:

| State | Primary action |
|---|---|
| First run | Create |
| No results | Clear filters / modify search |
| No permission | Request access, where supported |
| Inline failure | Try again |
| Authentication expired | Sign in again |
| Conflict | Review changes |
| Offline | Try again after reconnection |
| Page failure | Try again |
| Irrecoverable removed resource | Return to parent/list |

Secondary actions SHOULD use lower emphasis.

A state MUST NOT present several equally prominent actions and force the user to diagnose the product's recovery strategy.

---

## 2.34 Copy principles

State copy MUST be:

- specific;
- concise;
- user-oriented;
- truthful;
- action-oriented where recovery exists;
- free from internal implementation terminology; and
- consistent with domain nouns used elsewhere in the product.

Copy SHOULD answer, where relevant:

1. What happened?
2. What remains safe or available?
3. What can the user do next?

### Loading

Preferred:

```text
Loading invoices…
Refreshing results…
Saving changes…
Uploading report.pdf — 64%
```

Avoid:

```text
Processing request…
Please wait…
Fetching API data…
Loading object…
```

"Please wait" SHOULD be omitted unless waiting itself carries a meaningful restriction.

### Errors

Preferred:

```text
We couldn't load invoices.
Try again.
```

Preferred where user work is safe:

```text
We couldn't save your changes.
Your edits are still here.
```

Avoid:

```text
Error!
Request failed.
Unexpected exception.
Something bad happened.
```

"Something went wrong" MAY be used only when no more useful user-safe diagnosis exists.

### Permissions

Preferred:

```text
You don't have access to this report.
```

Avoid:

```text
403 Forbidden.
Insufficient ACL privileges.
Authorization failure.
```

### No results

Preferred:

```text
No invoices match these filters.
```

Avoid:

```text
No data.
Nothing found.
0 records returned.
```

### Offline

Preferred:

```text
You're offline.
Showing saved data from 10:42 AM.
```

Avoid:

```text
Network Error 0.
Connection exception.
```

---

## 2.35 Error-detail disclosure

User-facing error copy MUST be separated from diagnostic detail.

Diagnostic systems MAY capture:

- HTTP status;
- API error code;
- service identifier;
- request/correlation ID;
- stack trace;
- retry count;
- connectivity condition; and
- technical context.

User-facing surfaces MUST only expose fields explicitly approved for display.

Secrets, tokens, database queries, internal file paths, credentials, PII, or sensitive authorization information MUST NOT appear in UI error messages, analytics events, or client logs contrary to Security policy.

---

## 2.36 Observability

Production state transitions SHOULD emit sufficient telemetry to diagnose systematic UX failures.

Recommended signals include:

- request duration;
- loader duration;
- error category;
- retry count;
- retry outcome;
- rate-limit occurrence;
- offline/online transitions;
- stale-data age;
- partial-failure rate;
- abandonment after error;
- repeated mutation attempts; and
- correlation IDs.

Telemetry MUST comply with Privacy, Security, and Observability standards.

UI copy itself SHOULD NOT be treated as the canonical machine-readable error code.

---

## 2.37 Component boundaries and reuse

Applications SHOULD provide shared state compositions such as:

```text
<LoadingState />
<EmptyState />
<NoResultsState />
<NoAccessState />
<ErrorState />
<OfflineState />
<DegradedState />
```

Shared components SHOULD standardize anatomy, accessibility, spacing, and action hierarchy while allowing domain-specific copy.

A generic component MUST NOT reduce every state to the same icon, title, description, and retry button when domain semantics differ.

Feature code MUST control domain meaning; shared state components MUST control presentation consistency.

---

## 2.38 Server rendering, hydration, and cached content

When authoritative content is already available from SSR, RSC, prefetch, or cache, the client MUST NOT replace it with a loading skeleton solely because client-side hydration is occurring.

Loading UI SHOULD represent genuine user-visible uncertainty, not framework lifecycle mechanics.

Valid previously rendered content SHOULD remain visible while client state reconnects unless displaying that content violates freshness or security rules.

Hydration mismatches MUST be fixed at the rendering/state layer rather than concealed with unnecessary loading states.

---

## 2.39 Destructive and irreversible operations

Errors related to destructive actions MUST preserve certainty about whether the action occurred.

If deletion definitively failed:

```text
We couldn't delete the project.
Nothing was removed.

[Try again]
```

If outcome is uncertain:

```text
We couldn't confirm whether the project was deleted.

Refresh the project list before trying again.
```

An `AlertDialog` MUST NOT be used simply to display a load error. It is appropriate when the user must make an important modal decision. shadcn/ui defines AlertDialog as an interruptive modal that expects a response. citeturn820345search8

---

## 2.40 Notifications and toasts

Transient notifications MAY supplement state feedback but MUST NOT replace persistent state UI when:

- the error continues to affect the region;
- recovery action remains necessary;
- the user needs the message to understand current content;
- the notification contains field/form errors; or
- the notification may disappear before the user can act.

A successful background action MAY use a transient notification:

```text
Changes saved
```

A failed table load SHOULD use an inline error even if an initial toast also appears.

Critical errors MUST NOT auto-dismiss before users can perceive and understand them.

---

## 2.41 Required test catalogue

Every reusable asynchronous component or pattern MUST be reviewable in the relevant component/state catalogue with representative states.

At minimum, state coverage SHOULD include:

```text
default
loading
loading-slow
success
empty-first-run
empty-no-results
empty-no-permission
empty-cleared
error-inline
error-page
error-partial
retrying
offline
stale
degraded
reduced-motion
keyboard-focus
screen-reader-announcement
```

Components that perform writes SHOULD additionally cover:

```text
submitting
success
validation-error
server-error
conflict
uncertain-outcome
duplicate-prevention
```

Tests MUST validate semantic state transitions, not only screenshots.

---

# 3. Anti-patterns

The following patterns are prohibited or strongly discouraged.

## 3.1 Spinner-first design

**Anti-pattern:** A centered spinner is used for every loading condition.

**Why it fails:** It discards layout context, causes unnecessary visual blocking, and does not distinguish initial load from background refresh.

**Rule:** Use the indicator appropriate to scope and information available.

## 3.2 Skeleton after data already exists

**Anti-pattern:** Existing content disappears and skeletons return whenever a query refetches.

**Rule:** Existing valid content MUST remain visible during background refresh unless unsafe.

## 3.3 Error rendered as empty

**Anti-pattern:** A failed API call produces "No records."

**Rule:** Empty MUST require successful authoritative retrieval.

## 3.4 Permission rendered as absence

**Anti-pattern:** Unauthorized resources appear as generic empty content without following Security requirements.

**Rule:** Authorization state MUST follow the approved permission/existence-disclosure pattern.

## 3.5 Page-wide failure for one widget

**Anti-pattern:** One chart failure replaces a dashboard containing other healthy content.

**Rule:** Fail independently where dependencies are independent.

## 3.6 Raw backend copy

**Anti-pattern:**

```text
ER_DUP_ENTRY
SQLSTATE 23000
JWT expired
AxiosError ECONNRESET
```

**Rule:** Developer diagnostics MUST NOT become end-user copy.

## 3.7 Destructive retry without idempotency

**Anti-pattern:** A payment request times out and the client silently repeats it.

**Rule:** Mutations MUST only retry automatically when duplicate execution is provably safe.

## 3.8 Toast-only persistent failure

**Anti-pattern:** "Failed to load table" appears for five seconds while the table remains blank.

**Rule:** Persistent failures MUST have persistent local state UI.

## 3.9 Disabled control without explanation

**Anti-pattern:** Save, Upload, or Search is disabled during degraded/offline operation with no reason.

**Rule:** Capability restrictions MUST be communicated.

## 3.10 Focus stealing

**Anti-pattern:** An inline status update moves focus to itself.

**Rule:** Dynamic status changes MUST normally announce without moving focus.

## 3.11 Excessive assertive live regions

**Anti-pattern:** Search progress, refresh status, autosave, network reconnect, and background jobs all use `role="alert"`.

**Rule:** Routine status MUST be polite. Assertive announcement is reserved for important, time-sensitive information.

## 3.12 Fake progress

**Anti-pattern:** A progress bar races to 90% despite no meaningful measure of completion.

**Rule:** Unknown progress MUST be indeterminate or stage-based.

## 3.13 Clearing user work on failure

**Anti-pattern:** A failed form submission resets the form.

**Rule:** Recoverable user input MUST be preserved.

## 3.14 Generic "Something went wrong" everywhere

**Anti-pattern:** Known validation, permission, conflict, offline, rate-limit, and not-found conditions all use identical generic copy.

**Rule:** Known actionable conditions MUST be named accurately.

## 3.15 Loader flash

**Anti-pattern:** Every 50 ms request flashes a spinner.

**Rule:** Loading indicators SHOULD use the shared presentation delay; completed content MUST not be artificially delayed.

## 3.16 Full-screen blocking for background activity

**Anti-pattern:** Autosave or refetch overlays the entire product.

**Rule:** Background work MUST remain background unless continued interaction is unsafe.

## 3.17 Indefinite "Please wait"

**Anti-pattern:** A long process offers no progress, explanation, cancellation, or continuation path.

**Rule:** Long-running operations SHOULD expose meaningful state and recovery.

## 3.18 Misleading save language

**Anti-pattern:** Offline local draft state says "Saved" when the server has not received the write.

**Rule:** Persistence scope MUST be explicit.

## 3.19 Error-color-only communication

**Anti-pattern:** A border turns red with no message, icon, or semantic state.

**Rule:** State meaning MUST NOT depend on color alone.

## 3.20 Retry loops

**Anti-pattern:** Requests repeatedly retry forever while presenting "Loading…".

**Rule:** Retries MUST be bounded, observable, cancelable when relevant, and eventually resolve to an actionable state.

---

# 4. Checklist

## 4.1 State semantics

- [ ] Loading, empty, error, permission, offline, stale, and degraded states are distinct.
- [ ] Empty is only reached after a successful authoritative result.
- [ ] Background refetch retains valid data.
- [ ] Partial failures remain local.
- [ ] Client state distinguishes initial pending from refreshing.
- [ ] Mutation state distinguishes pending, failure, conflict, and uncertain outcome.

## 4.2 Loading

- [ ] The indicator matches the scope of the operation.
- [ ] Skeletons mirror final geometry.
- [ ] Fast operations avoid unnecessary loader flash.
- [ ] Long-running operations communicate progress or stage where possible.
- [ ] Button loading preserves its accessible name.
- [ ] Duplicate unsafe actions are prevented.
- [ ] Reduced-motion behavior is defined.
- [ ] Cached data is not unnecessarily replaced by skeletons.

## 4.3 Empty states

- [ ] First-run copy explains what can be created.
- [ ] No-results copy refers to the active search/filter state.
- [ ] Clear-filter or clear-search recovery is available where appropriate.
- [ ] No-permission is not represented as ordinary emptiness unless Security requires existence hiding.
- [ ] Cleared/completed states do not invent unnecessary actions.
- [ ] Empty-state actions directly resolve or advance the state.

## 4.4 Errors

- [ ] Error appears at the smallest accurate scope.
- [ ] User-facing copy does not expose implementation details.
- [ ] Input is preserved after recoverable failures.
- [ ] Partial content stays usable.
- [ ] Correlation/support reference is safe for display.
- [ ] Persistent failures are not conveyed by toast alone.
- [ ] Known conditions use specific copy rather than generic failure language.

## 4.5 Retry and recovery

- [ ] Read retry policy is bounded.
- [ ] Backoff and `Retry-After` are honored where applicable.
- [ ] Validation/permission/auth failures are not blindly retried.
- [ ] Mutation retry is protected by idempotency where necessary.
- [ ] User-triggered retry affects only the failing scope.
- [ ] Retry preserves local work.
- [ ] Uncertain mutation outcomes prevent unsafe duplication.
- [ ] Repeated failure offers the best available alternative recovery.

## 4.6 Offline and degraded operation

- [ ] Offline state distinguishes cached data from unavailable data.
- [ ] Stale content shows freshness information when relevant.
- [ ] Offline write policy is explicit: unavailable, local draft, or queued.
- [ ] Local persistence is not described as server persistence.
- [ ] Sensitive data obeys offline-storage Security rules.
- [ ] Reconnection behavior is defined.
- [ ] Queued sync conflicts cannot disappear silently.
- [ ] Degraded-state copy identifies the affected capability.

## 4.7 Accessibility

- [ ] Loading/status updates have appropriate live-region semantics.
- [ ] Routine updates use polite status.
- [ ] Assertive alerts are reserved for important/time-sensitive information.
- [ ] Dynamic inline states do not steal focus.
- [ ] Progress exposes an accessible name and value where determinate.
- [ ] Indeterminate progress does not expose a fake value.
- [ ] Repetitive status updates are throttled/de-duplicated.
- [ ] Skeletons are not announced individually.
- [ ] Focus order remains logical.
- [ ] Motion respects reduced-motion settings.
- [ ] State meaning does not rely on color alone.

## 4.8 Layout and components

- [ ] shadcn/ui primitives are used or wrapped consistently.
- [ ] Layout uses Design Tokens.
- [ ] Full-region and inline states have appropriate alignment.
- [ ] Filters and headers remain visible when still useful.
- [ ] State actions remain inside the affected semantic region.
- [ ] Only one action is visually dominant.
- [ ] Errors do not unnecessarily replace healthy parent content.

## 4.9 Copy

- [ ] Copy names the affected resource or action.
- [ ] Copy says what happened when known.
- [ ] Copy says what remains safe when relevant.
- [ ] Copy gives an actionable recovery path.
- [ ] Copy contains no stack traces, API jargon, status codes, or raw backend errors.
- [ ] Permission copy follows security-disclosure rules.
- [ ] No-results copy does not imply system failure.
- [ ] Offline copy distinguishes cached/local/server state.
- [ ] Terminology matches the rest of the product.

## 4.10 Engineering and observability

- [ ] Component state is explicit rather than inferred from falsy data.
- [ ] SSR/hydrated content is not replaced unnecessarily.
- [ ] API errors are mapped through canonical codes/contracts.
- [ ] Telemetry records useful failure/retry signals without sensitive data.
- [ ] Shared state components separate visual consistency from domain semantics.
- [ ] Required states exist in component/pattern tests.
- [ ] Keyboard and assistive-technology behavior is tested.
- [ ] Reduced-motion state is tested.
- [ ] Retry, conflict, offline, and partial-failure paths are tested.

---

# 5. Canonical summary

The following rules define the Gold Standard 2026 baseline.

1. **State MUST be truthful.** Loading, successful emptiness, authorization failure, request failure, stale data, offline operation, and degraded service are different states and MUST NOT be collapsed into one generic treatment.

2. **State MUST be scoped.** The smallest independently failing region SHOULD own its loading, empty, and error state. Healthy content MUST remain usable.

3. **Existing data MUST be preserved during refresh.** Background refetch MUST NOT routinely return the interface to skeletons or blocking loaders.

4. **Loading indication MUST match the operation.** Use Skeleton for known content geometry, Spinner for compact indeterminate work, Progress for meaningful task progression, and subtle refresh state when usable content already exists.

5. **Empty MUST mean successful absence.** A failed, unauthorized, offline, or uninitialized request MUST NOT produce "No data."

6. **Empty states MUST identify their subtype.** First-run, no-results, no-permission, and cleared/completed states require different copy and different recovery actions.

7. **Errors MUST preserve user work.** Forms, edits, uploads, and other recoverable interactions MUST retain safe local state after failure.

8. **Retry MUST respect API semantics.** Reads may use bounded transient retries; writes MUST only retry automatically when duplicate side effects are prevented by the API contract.

9. **Uncertain outcomes MUST be represented explicitly.** When the client cannot determine whether a mutation succeeded, it MUST NOT invite an unsafe duplicate action.

10. **Offline and degraded operation MUST describe capability.** The product MUST state what remains available, what is stale, what is stored locally, what is queued, and what requires reconnection.

11. **Accessible announcements MUST communicate meaningful transitions without stealing focus.** Routine status uses polite live regions; assertive alerts are reserved for important, time-sensitive conditions.

12. **Progress MUST be truthful.** Determinate progress requires meaningful measurement. Unknown completion MUST remain indeterminate or stage-based.

13. **State copy MUST be specific and user-facing.** Use domain nouns, explain recoverability, and provide the next action. Raw backend messages, status codes, stack traces, and implementation terminology MUST NOT appear in normal user-facing state copy.

14. **Visual treatment MUST use the design system.** shadcn/ui primitives, semantic Design Tokens, product iconography, focus styles, spacing, motion, and color semantics form the implementation baseline.

15. **State meaning MUST NOT depend on color, animation, or visual presentation alone.**

16. **State components MUST be testable as a catalogue.** Loading, empty subtypes, partial error, page error, retry, stale, offline, degraded, conflict, accessibility, keyboard, and reduced-motion states MUST be represented in component or pattern-level testing.

17. **Framework lifecycle is not UX state.** Hydration, cache validation, internal retries, and implementation events MUST only create visible loading UI when users are genuinely waiting for unavailable information.

18. **Recovery is part of the state design.** A state is incomplete until the product has defined what the user can do next, what the system can safely retry, and what information or work remains preserved.

**Canonical rule:** preserve context, represent the real condition, fail at the smallest viable scope, retain usable data and user work, and always make recovery semantics explicit.

This version is suitable as the corpus-level normative standard. It uses the current shadcn/ui state primitives and WCAG 2.2 status-message model rather than treating loading/error UI as ad hoc feature implementation.
