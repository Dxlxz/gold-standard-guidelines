---
id: "mobile-native"
title: "Mobile & Native App"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "mobile", "native", "app"]
applies_to: ["client"]
related: []
legacy_number: 95
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 62070
provenance: baseline

---

# Mobile & Native App Guidelines — Gold Standard 2026

**Canonical placement:** Framework → Mobile → Responsive & Device → Notifications  
**Status:** Canonical  
**Applies to:** Native iOS applications, native Android applications, cross-platform mobile applications, mobile shells, embedded web experiences, mobile-specific backend integrations, notification infrastructure, release engineering, and mobile observability  
**Component baseline:** shadcn/ui semantics and product component taxonomy, adapted to native platform primitives where required

---

# 1. Purpose

Mobile applications operate under constraints that do not exist, or do not exist to the same degree, in browser-based applications.

A mobile product MUST account for:

- platform navigation conventions;
- safe areas and system UI;
- software keyboards and input methods;
- application lifecycle transitions;
- intermittent connectivity;
- background execution constraints;
- device permissions;
- consent and privacy requirements;
- push notification delivery;
- deep-link routing;
- operating-system process termination;
- startup and binary-size constraints;
- application-store policy;
- crash and ANR behaviour;
- staged release;
- backwards-compatible APIs; and
- installed-client version fragmentation.

A mobile implementation MUST NOT be treated as a narrow responsive rendering of a desktop web application.

The mobile architecture and user experience MUST preserve alignment with the broader:

- Security standard;
- Data & Database standard;
- API standard;
- State Management standard;
- Forms & Validation standard;
- Accessibility standard;
- Design Tokens standard;
- Component standard; and
- Pattern standard.

Where platform conventions conflict with web conventions, the **native platform behaviour SHOULD take precedence**, provided product semantics, accessibility, security, and design-system intent remain intact.

shadcn/ui defines the baseline product component vocabulary and interaction semantics. Native applications MUST NOT mechanically reproduce web implementation details when the operating system provides a more appropriate native primitive.

---

# 2. Rules

## 2.1 Platform architecture and parity

Mobile applications MUST define their supported:

- operating systems;
- minimum OS versions;
- device classes;
- screen classes;
- orientation policy;
- architecture requirements;
- accessibility expectations; and
- distribution channels.

Support policy MUST be explicit.

Applications MUST NOT accidentally depend on APIs unavailable on their documented minimum platform version.

Where functionality differs between iOS and Android, the difference MUST be deliberate and documented.

Cross-platform consistency SHOULD apply to:

- product concepts;
- information architecture;
- content;
- business rules;
- permissions model;
- data semantics;
- validation;
- account behaviour; and
- accessibility outcomes.

Cross-platform consistency MUST NOT require identical interaction mechanics where platform conventions materially differ.

The application SHOULD feel native to the operating system while remaining recognizably part of the same product.

---

## 2.2 Component baseline

shadcn/ui is the canonical baseline for product component semantics, anatomy, states, and naming.

For mobile-native applications, the implementation SHOULD map those semantics to appropriate native or cross-platform primitives.

For example:

| Product concept | Web baseline | Native implementation |
|---|---|---|
| Dialog | shadcn/ui Dialog / Alert Dialog | Native modal, sheet, or platform alert |
| Select | shadcn/ui Select | Native picker, menu, or selection screen |
| Tabs | shadcn/ui Tabs | Native segmented control, tab bar, or platform navigation pattern |
| Sheet | shadcn/ui Sheet / Drawer | Native bottom sheet or presentation sheet |
| Toast | shadcn/ui Toast/Sonner equivalent | Platform-appropriate transient feedback |
| Form controls | shadcn/ui Input / Checkbox / Switch | Native text fields, toggles, checkboxes, or equivalent controls |

Product components MUST preserve:

- semantic purpose;
- state behaviour;
- accessibility intent;
- validation behaviour;
- destructive semantics;
- content guidance; and
- design-token mapping.

Native implementations MUST NOT reproduce desktop interaction conventions when they reduce usability on touch devices.

---

## 2.3 Navigation model

Every mobile application MUST define a canonical navigation model.

Navigation SHOULD use platform-standard patterns wherever practical.

Typical patterns include:

- stack navigation;
- tab or bottom navigation;
- hierarchical drill-down;
- modal presentation;
- sheets;
- contextual overlays; and
- deep-link entry.

The application MUST define:

- root destinations;
- back behaviour;
- modal dismissal behaviour;
- tab-state preservation;
- route restoration;
- authenticated and unauthenticated navigation;
- deep-link routing;
- interrupted-flow behaviour; and
- navigation after process recreation.

Navigation MUST remain deterministic.

A user MUST NOT arrive at a route whose required parent state exists only in transient memory.

---

## 2.4 Back navigation

Back navigation MUST respect platform expectations.

On Android:

- system Back MUST produce meaningful navigation;
- predictive-back behaviour SHOULD be supported where applicable;
- custom controls MUST NOT trap the user;
- Back MUST dismiss transient presentation before navigating away where platform convention requires it.

On iOS:

- hierarchical back navigation SHOULD follow the navigation stack;
- interactive swipe-back behaviour SHOULD remain available unless disabling it is necessary to prevent invalid application state;
- navigation bars SHOULD follow native expectations.

Custom back controls MUST NOT contradict operating-system navigation behaviour.

Back behaviour after deep-link entry MUST be explicitly designed.

When no meaningful in-app parent exists, the application SHOULD return to an appropriate root or allow the operating system to exit the application rather than manufacturing misleading history.

---

## 2.5 Tab and root navigation

Primary mobile destinations SHOULD use a stable, recognizable navigation pattern such as a tab bar or platform-equivalent root navigation.

Primary navigation destinations MUST NOT change unpredictably based on transient application state.

Tab switching SHOULD preserve each tab's navigation state where that behaviour matches platform expectations.

A tab MUST NOT become a substitute for an action button.

Navigation labels and icons MUST be semantically meaningful and MUST satisfy Accessibility and Component standards.

Badges MUST represent meaningful status or counts and MUST NOT be used merely as decoration or engagement pressure.

---

## 2.6 Modal navigation

Modals, sheets, and full-screen presentations MUST have a clear purpose.

They SHOULD be used for:

- focused tasks;
- temporary decisions;
- contextual creation;
- confirmation;
- lightweight selection; or
- interruption-sensitive workflows.

Modal flows MUST define:

- dismissal behaviour;
- unsaved-data behaviour;
- keyboard behaviour;
- focus behaviour;
- background interaction;
- cancellation;
- destructive actions; and
- state restoration.

A modal MUST NOT become an undocumented parallel navigation stack.

Deep, multi-screen tasks SHOULD use ordinary navigation unless modal containment is semantically necessary.

---

## 2.7 Safe areas

All interactive and essential content MUST respect platform safe-area insets.

Applications MUST account for:

- status bars;
- display cutouts;
- camera islands;
- rounded corners;
- home indicators;
- gesture-navigation areas;
- navigation bars;
- system bars; and
- dynamically changing insets.

Content MAY intentionally extend into unsafe visual regions for edge-to-edge presentation.

Essential controls, text, and interaction targets MUST NOT be obscured by unsafe regions.

Hard-coded status-bar or notch offsets MUST NOT be used.

Insets MUST be obtained from platform APIs or framework abstractions.

---

## 2.8 Edge-to-edge layouts

Applications SHOULD support platform-standard edge-to-edge rendering where appropriate.

Edge-to-edge content MUST remain readable and operable.

System bars and application backgrounds MUST have intentional contrast relationships.

The application MUST NOT rely on a specific system-bar height.

Scrolling content SHOULD generally extend behind appropriate system chrome while maintaining usable content insets.

Floating controls MUST account for safe-area and system-gesture zones.

---

## 2.9 Software keyboards and input methods

Forms MUST remain usable when the software keyboard is visible.

The application MUST account for:

- keyboard height;
- focus movement;
- content resizing;
- content panning;
- scroll-to-field behaviour;
- keyboard dismissal;
- external hardware keyboards;
- alternative input methods; and
- accessibility keyboards.

Focused input fields and their validation messages MUST remain visible where practical.

Primary form actions MUST NOT become unreachable behind the keyboard.

The application MUST NOT assume that keyboard dimensions are fixed.

Keyboard presentation MUST NOT cause destructive or unexpected layout shifts.

---

## 2.10 Keyboard configuration

Input controls SHOULD use appropriate platform keyboard configuration for their semantic data type.

Examples include:

- email;
- telephone;
- URL;
- numeric input;
- decimal input;
- search;
- one-time code; and
- ordinary text.

Keyboard type MUST NOT be treated as validation.

The Forms & Validation standard remains authoritative for accepted values.

Sensitive fields MUST use appropriate secure-input behaviour.

Autocomplete, autofill, password-manager integration, and one-time-code assistance SHOULD be enabled when they improve usability without compromising security.

---

## 2.11 Permission model

Applications MUST request only permissions required for user-visible functionality or legitimate operational requirements.

Permission requests MUST be:

- contextual;
- proportionate;
- understandable;
- attributable to a user benefit; and
- initiated at an appropriate point in the workflow.

Applications SHOULD defer runtime permission requests until the capability is needed.

Applications MUST NOT request all possible permissions during first launch merely because they may be useful later.

---

## 2.12 Permission pre-prompts

A custom explanation MAY precede an operating-system permission prompt when additional context materially improves informed decision-making.

A pre-prompt MUST NOT:

- misrepresent the platform permission;
- claim that permission is mandatory when it is not;
- prevent access to unrelated functionality;
- repeatedly pressure the user;
- imitate system UI deceptively; or
- imply consequences not supported by the product.

If the user declines the pre-prompt, the application SHOULD generally avoid displaying the operating-system prompt immediately afterward.

---

## 2.13 Permission denial

Permission denial MUST be treated as a normal supported state.

The application MUST define behaviour for:

- initial denial;
- repeated denial;
- permanent denial where applicable;
- restricted permission;
- partial permission;
- limited library or data access;
- permission revocation after prior approval; and
- device-policy restrictions.

The product SHOULD degrade gracefully when feasible.

Users MUST NOT be trapped in a permission request loop.

Where the operating system no longer permits an in-app request, the application MAY provide clear instructions for changing the permission in system settings.

---

## 2.14 Consent versus operating-system permissions

Operating-system permission and product consent are distinct concepts.

A device permission MUST NOT be treated as proof of:

- legal consent;
- marketing consent;
- analytics consent;
- tracking consent;
- data-processing consent; or
- acceptance of contractual terms.

Where product or legal consent is required, it MUST be recorded through the appropriate consent mechanism.

Consent records MUST align with the Security and Data standards.

Consent withdrawal MUST be supported where required.

---

## 2.15 Sensitive capabilities

Sensitive capabilities MUST receive heightened review.

These may include:

- precise location;
- camera;
- microphone;
- photos;
- contacts;
- health data;
- Bluetooth;
- nearby devices;
- biometrics;
- notification access;
- background location;
- accessibility services;
- screen capture;
- device administration; and
- equivalent privileged capabilities.

The application MUST NOT collect or retain data from a sensitive capability beyond the approved purpose.

Background collection MUST be explicitly justified.

---

## 2.16 Biometrics

Biometric authentication SHOULD be used through operating-system-provided authentication mechanisms.

The application MUST NOT attempt to store raw biometric information.

Biometrics MAY authorize access to locally protected credentials or sessions.

Biometric success MUST NOT replace server-side authorization requirements.

A secure fallback MUST exist where platform policy or product requirements demand one.

The application MUST correctly handle:

- biometric changes;
- lockout;
- unavailable hardware;
- enrollment changes; and
- authentication cancellation.

---

## 2.17 Offline-first principles

Any application expected to operate under intermittent connectivity MUST define its offline behaviour explicitly.

The application MUST distinguish:

- unavailable network;
- unreachable server;
- slow connection;
- stale local data;
- cached data;
- queued writes;
- unsynchronized writes;
- synchronization failure; and
- authentication failure.

A generic “Something went wrong” state SHOULD NOT be used when the application can identify a meaningful recoverable network condition.

---

## 2.18 Offline reads

Previously retrieved data MAY be available offline where permitted by Security and Data requirements.

Cached data MUST have a defined freshness policy.

The user SHOULD be informed when stale data could materially affect decisions.

Sensitive cached data MUST use appropriate device-storage protection.

Authentication expiry MUST NOT be silently bypassed through indefinitely readable cached protected data unless explicitly permitted by the security model.

---

## 2.19 Offline writes

Offline writes MUST use a documented synchronization strategy.

The strategy MUST define:

- local persistence;
- queue ownership;
- ordering;
- identifiers;
- retries;
- idempotency;
- conflict behaviour;
- cancellation;
- authentication expiry;
- partial synchronization;
- error disclosure; and
- eventual acknowledgement.

The UI MUST NOT represent a queued operation as durably completed on the server unless that distinction is intentionally abstracted and safe.

Where the distinction matters, the application MUST communicate states such as:

- saved locally;
- pending;
- syncing;
- synced;
- failed;
- conflicted.

---

## 2.20 Conflict resolution

Synchronization conflicts MUST be handled intentionally.

The application MUST NOT silently discard user data due to last-write-wins behaviour unless that policy is explicitly acceptable for the data domain.

Conflict resolution MAY use:

- server authority;
- client authority;
- version numbers;
- timestamps;
- field-level merges;
- domain-specific merge rules; or
- explicit user choice.

Conflict strategy MUST align with API and Data standards.

---

## 2.21 Retry behaviour

Automatic retry MUST be bounded and appropriate to the operation.

Retries SHOULD use appropriate backoff and SHOULD avoid synchronized retry storms.

Non-idempotent operations MUST NOT be blindly retried when duplicate execution could cause harm.

Retry semantics MUST align with the API standard.

A user-triggered retry SHOULD remain available where appropriate.

---

## 2.22 Application lifecycle

Mobile applications MUST behave correctly through lifecycle transitions including:

- foreground;
- inactive;
- background;
- suspended;
- process termination;
- low-memory termination; and
- subsequent relaunch.

Critical state MUST NOT depend solely on process memory.

The application MUST tolerate being terminated without a clean shutdown callback.

---

## 2.23 State restoration

Important user state SHOULD be restored following process recreation where restoration improves continuity and does not violate security expectations.

Examples may include:

- navigation position;
- safe draft content;
- filter state;
- selected tab;
- non-sensitive form progress; and
- queued work.

Restored state MUST be validated against current:

- authentication;
- authorization;
- server state;
- schema;
- application version; and
- feature availability.

The application MUST NOT restore users into invalid or unauthorized screens.

---

## 2.24 Background execution

Background execution MUST follow platform rules.

Applications MUST NOT assume they can execute indefinitely in the background.

Background work SHOULD be limited to operations that are:

- necessary;
- bounded;
- resilient;
- platform-supported; and
- appropriately scheduled.

Background execution SHOULD use operating-system scheduling mechanisms rather than permanent custom loops.

---

## 2.25 Background tasks

Background work MUST tolerate:

- delayed execution;
- cancellation;
- duplicate invocation;
- constrained network access;
- low battery;
- process termination; and
- unavailable credentials.

Background tasks SHOULD be idempotent wherever practical.

A background task MUST NOT depend on a visible UI lifecycle object.

Long-running work SHOULD be moved to backend infrastructure when continued device execution is unnecessary.

---

## 2.26 Battery and resource usage

Mobile functionality MUST be designed with battery, CPU, radio, and memory cost in mind.

Applications SHOULD minimize:

- unnecessary polling;
- continuous sensor access;
- wake locks;
- high-frequency background location;
- repeated network requests;
- unbounded timers;
- excessive rendering;
- unnecessary GPS usage; and
- background media processing.

Operational convenience MUST NOT justify persistent high battery usage.

---

# 2.27 Push notification architecture

Push notifications MUST be treated as a distributed delivery system rather than a guaranteed real-time messaging channel.

The system MUST tolerate:

- delayed delivery;
- duplicate delivery;
- dropped delivery;
- token rotation;
- revoked permission;
- expired tokens;
- offline devices;
- reordered messages; and
- multiple devices for one account.

Critical business state MUST NOT depend solely on notification delivery.

The authoritative state MUST remain accessible through the application or backend.

---

## 2.28 Notification permission

Notification permission SHOULD be requested when the user understands the value of receiving notifications.

Applications SHOULD NOT request notification permission immediately on first launch without meaningful context unless notifications are fundamental to the product's primary purpose.

Permission denial MUST NOT break unrelated product functionality.

---

## 2.29 Notification categories

Notification types MUST be classified.

Typical categories include:

- security;
- transactional;
- account;
- collaboration;
- operational;
- reminders;
- product updates; and
- marketing.

Users SHOULD receive appropriate controls over optional categories.

Security-critical notifications MAY have different configurability where justified, but device-level user controls remain authoritative.

Marketing notifications MUST follow applicable consent requirements.

---

## 2.30 Notification content

Notification content MUST minimize sensitive information exposed on the lock screen.

Highly sensitive content SHOULD use generalized wording unless the user has explicitly configured greater detail.

Notification content MUST NOT expose:

- authentication secrets;
- access tokens;
- one-time secrets unless specifically designed and protected;
- protected health or financial content without appropriate controls;
- private message content where product privacy settings prohibit it; or
- internal identifiers.

---

## 2.31 Notification lifecycle

The notification lifecycle MUST define:

1. backend event creation;
2. notification eligibility;
3. preference evaluation;
4. payload creation;
5. provider submission;
6. provider response;
7. device delivery where observable;
8. user interaction;
9. application routing;
10. state reconciliation; and
11. token cleanup.

Delivery-system errors SHOULD be observable.

Invalid push tokens SHOULD be removed or marked inactive according to a defined lifecycle.

---

## 2.32 Notification identifiers and deduplication

Notifications SHOULD carry stable identifiers where the product needs deduplication, updating, replacement, grouping, or interaction attribution.

Duplicate backend events MUST NOT produce uncontrolled duplicate user alerts.

The application SHOULD reconcile notification state with authoritative server state after opening.

---

## 2.33 Notification actions

Actionable notifications MUST enforce authorization when the action is executed.

A notification button MUST NOT become a privileged bypass.

Destructive or security-sensitive actions SHOULD require appropriate confirmation or authentication.

Background notification actions MUST handle expired sessions safely.

---

## 2.34 Notification navigation

Opening a notification MUST route the user to a valid contextual destination.

Notification navigation MUST handle:

- authenticated users;
- signed-out users;
- expired sessions;
- removed resources;
- revoked permissions;
- already-completed actions;
- stale notifications; and
- unsupported application versions.

The application MUST NOT crash because a notification references a missing resource.

---

# 2.35 Deep links

Every deep-linkable route MUST define:

- route pattern;
- accepted parameters;
- authentication requirements;
- authorization requirements;
- validation;
- fallback behaviour;
- analytics expectations; and
- minimum supported app version where applicable.

Deep links MUST be treated as untrusted external input.

All parameters MUST be validated.

A deep link MUST NOT bypass authorization or application workflow constraints.

---

## 2.36 Universal links and app links

Verified platform-native links SHOULD be preferred over custom URI schemes where appropriate.

Public links SHOULD use HTTPS-based app-link mechanisms when platform support and product architecture permit.

Domain-to-app association MUST be maintained as production infrastructure.

Fallback behaviour MUST be defined when:

- the app is not installed;
- association fails;
- the route is no longer valid;
- the user is signed out; or
- the installed application is too old.

---

## 2.37 Custom URI schemes

Custom URI schemes MAY be used where required for interoperability or platform integrations.

Custom schemes MUST NOT be treated as strongly authenticated origins.

Sensitive actions initiated through custom schemes MUST perform their own validation and authorization.

Secrets MUST NOT be embedded in deep-link URLs unless the relevant security flow explicitly requires and protects them.

---

## 2.38 Deferred deep linking

Deferred deep links MAY restore intended context after installation where supported.

The system MUST assume deferred-link attribution can fail.

Core functionality MUST NOT depend exclusively on deferred-link providers.

Sensitive data MUST NOT be embedded in third-party attribution payloads without explicit approval.

---

# 2.39 Startup performance

Mobile applications MUST define startup performance budgets.

Startup SHOULD be measured separately for:

- cold launch;
- warm launch;
- hot/resumed launch where relevant; and
- first launch following installation or upgrade.

The application SHOULD minimize work on the critical startup path.

Startup MUST NOT synchronously perform unrelated network requests before rendering useful UI.

---

## 2.40 Startup sequencing

Startup SHOULD prioritize:

1. process initialization;
2. minimum secure configuration;
3. session determination;
4. initial navigable UI;
5. critical data; and
6. deferred non-critical initialization.

Analytics, non-essential SDKs, experimentation frameworks, optional caches, and secondary network work SHOULD NOT block initial rendering unless explicitly necessary.

Applications MUST avoid startup dependency chains that make multiple external services prerequisites for opening the product.

---

## 2.41 Splash screens

Launch and splash screens SHOULD mask required application initialization, not compensate for unnecessarily slow startup.

A splash screen MUST NOT introduce artificial delay.

Brand animation MUST NOT block application readiness.

The transition from system launch screen to application UI SHOULD minimize visible layout discontinuity.

---

## 2.42 Application size

Applications MUST define binary and download-size budgets appropriate to their product and target market.

Size budgets SHOULD account for:

- initial download;
- installed size;
- architecture slices;
- embedded media;
- fonts;
- localization assets;
- SDKs;
- native libraries; and
- update size.

Large assets SHOULD be downloaded on demand where appropriate.

Unused assets and dependencies SHOULD be removed.

A dependency MUST NOT be added without considering binary size and startup impact.

---

## 2.43 Dependency governance

Third-party mobile SDKs MUST be reviewed according to Security and Dependency standards.

Review MUST consider:

- permissions;
- data collection;
- network endpoints;
- transitive dependencies;
- binary size;
- startup cost;
- background behaviour;
- privacy declarations;
- platform policy;
- maintenance status; and
- failure behaviour.

A third-party SDK MUST NOT initialize automatically with unrestricted data collection unless that behaviour is explicitly approved.

---

# 2.44 Memory management

Applications MUST remain within reasonable platform memory constraints.

Large images, video, maps, web views, and data collections MUST be lifecycle-managed.

Applications SHOULD avoid:

- unbounded caches;
- retained view controllers or activities;
- leaked contexts;
- unbounded image decoding;
- loading entire large datasets into memory; and
- duplicate in-memory representations of large assets.

Memory warnings and low-memory conditions SHOULD be handled where the platform provides them.

---

# 2.45 Crash resilience

Unhandled crashes MUST be monitored.

The application MUST NOT use deliberate crashes as ordinary control flow.

Critical persisted state SHOULD be written in a manner resilient to abrupt process termination.

The application MUST protect against repeated crash loops where feasible.

Feature flags or remote controls SHOULD allow problematic functionality to be disabled when this materially reduces operational risk.

---

## 2.46 Crash monitoring

Production applications MUST use crash monitoring appropriate to platform and privacy requirements.

Crash telemetry SHOULD include sufficient context to diagnose:

- application version;
- build;
- OS version;
- device class;
- stack information;
- faulting subsystem;
- navigation context where privacy-safe; and
- relevant feature flags.

Crash telemetry MUST NOT intentionally include secrets or prohibited sensitive user data.

---

## 2.47 Android ANRs

Android applications MUST monitor Application Not Responding events.

ANRs MUST be treated as reliability defects, not as a separate lower-priority class of crash.

Common causes such as:

- blocking main-thread I/O;
- deadlocks;
- oversized database work;
- synchronous network activity;
- binder contention;
- expensive startup work; and
- long rendering operations

MUST be investigated.

Critical work MUST NOT block the main thread unnecessarily.

---

## 2.48 UI responsiveness

Both iOS and Android applications MUST keep the main/UI thread responsive.

Expensive operations SHOULD execute outside the UI thread.

The application MUST avoid synchronous:

- network requests;
- large file operations;
- expensive database queries;
- image processing; and
- cryptographic work

on the UI thread unless the operation is demonstrably bounded and appropriate.

---

# 2.49 Mobile API compatibility

Mobile API design MUST assume old application versions remain installed after a new backend deployment.

Backend changes MUST preserve compatibility for supported client versions.

Servers MUST NOT assume all active users upgrade immediately.

Breaking API changes MUST follow the API versioning standard.

---

## 2.50 Capability negotiation

Where client behaviour depends on version-specific backend capability, the application SHOULD use explicit capability or schema negotiation rather than fragile string comparisons where practical.

The backend SHOULD be able to distinguish unsupported clients from temporary request failures.

Client-version policy MUST NOT substitute for ordinary authorization.

---

# 2.51 Application versioning

Every distributed build MUST have a unique machine-readable build identifier.

Public application versions MUST follow a documented versioning convention.

Version metadata SHOULD allow operators to identify:

- marketing version;
- build number;
- source revision;
- release channel; and
- environment.

Build identifiers MUST NOT be reused for materially different binaries in the same release channel.

---

## 2.52 Minimum supported version

The organization MUST define which installed application versions remain supported.

Minimum supported version policy SHOULD consider:

- security;
- API compatibility;
- legal requirements;
- data migrations;
- critical defects; and
- operational support cost.

Unsupported versions SHOULD receive a clear user experience rather than failing unpredictably.

---

## 2.53 Recommended upgrades

A recommended upgrade MAY inform users that a newer application version is available.

Recommended-upgrade prompts SHOULD be:

- dismissible;
- proportionate;
- non-disruptive;
- frequency-limited; and
- relevant to material product benefit.

Applications MUST NOT repeatedly interrupt users solely to maximize upgrade adoption.

---

## 2.54 Mandatory upgrades

Mandatory upgrades MUST be exceptional.

They SHOULD be reserved for cases such as:

- severe security defects;
- irreconcilable protocol incompatibility;
- legally required changes;
- unsafe data behaviour;
- critical platform migrations; or
- backend retirement that cannot reasonably maintain compatibility.

A mandatory-upgrade policy MUST define:

- minimum allowed version;
- activation time;
- affected platforms;
- reason;
- recovery path;
- store availability;
- staged-rollout considerations; and
- rollback strategy.

A mandatory-upgrade gate MUST NOT be activated before the required replacement version is reliably available to the affected population.

---

## 2.55 Mandatory-upgrade failure handling

If the store, network, or release pipeline prevents the user from obtaining the required version, the product MUST avoid trapping users in an unrecoverable loop where practical.

The upgrade screen SHOULD provide:

- clear explanation;
- update action;
- retry behaviour;
- support path where appropriate; and
- version information.

Critical emergency modes MAY provide limited functionality where security and product constraints permit.

---

# 2.56 Database migrations

On-device database migrations MUST be versioned, testable, and backward-aware.

Migrations MUST handle:

- interrupted upgrades;
- application termination;
- partial migration;
- insufficient storage;
- data-format changes; and
- migration from all supported prior schemas where required.

Migration logic MUST NOT silently delete user data to recover from routine schema incompatibility unless that data is explicitly disposable.

Destructive migration requires explicit approval.

---

## 2.57 Secure local storage

Sensitive application secrets MUST use platform-supported secure storage.

Examples include:

- authentication tokens;
- refresh credentials;
- cryptographic keys; and
- other high-value secrets.

Sensitive secrets MUST NOT be stored in ordinary preference files, plain SQLite fields, logs, or application caches when secure alternatives are required.

Local persistence MUST follow the Security and Data standards.

---

# 2.58 Accessibility

Mobile applications MUST comply with the Accessibility standard.

Native components SHOULD be preferred when they provide correct platform accessibility behaviour.

The application MUST provide appropriate:

- accessible names;
- traits or roles;
- states;
- values;
- reading order;
- focus behaviour;
- touch-target sizing;
- text scaling;
- contrast;
- reduced-motion behaviour;
- alternative input support; and
- screen-reader semantics.

Custom-drawn controls MUST NOT ship without equivalent accessible semantics.

---

## 2.59 Dynamic text and font scaling

Text MUST remain usable at supported accessibility font scales.

Critical content MUST NOT be clipped merely because the user selects a larger system text size.

Layouts SHOULD reflow rather than reduce accessibility font sizes.

Controls SHOULD expand or restructure where necessary.

A fixed-height component MUST NOT conceal text required to operate the interface.

---

## 2.60 Touch targets

Interactive targets MUST satisfy the Accessibility standard and relevant platform guidance.

Visual size and interactive hit area MAY differ where appropriate.

Small icons MUST NOT require precision tapping.

Adjacent touch targets MUST have sufficient separation to avoid accidental activation.

---

## 2.61 Motion and haptics

Motion SHOULD communicate state, hierarchy, spatial relationships, or feedback.

Motion MUST NOT be required to understand critical content.

Reduced-motion preferences MUST be respected where applicable.

Haptics SHOULD reinforce meaningful interaction rather than decorate every action.

Critical information MUST NOT be communicated only through vibration or haptic response.

---

# 2.62 Design tokens

Mobile applications MUST map the shared Design Token system into platform-appropriate values.

Token mapping SHOULD cover:

- semantic color;
- typography;
- spacing;
- radius;
- elevation;
- motion;
- sizing;
- opacity; and
- interactive states.

Native semantic system colors MAY be used where they better preserve platform behaviour, provided they map intentionally to product semantics.

Hard-coded visual values MUST NOT proliferate independently across mobile codebases.

---

## 2.63 Dark mode and system appearance

Where dark mode is supported, it MUST use semantic tokens rather than manual per-screen substitutions.

Applications SHOULD honor the operating-system appearance setting unless the product intentionally supports an explicit user override.

Theme changes SHOULD apply without requiring an application restart.

Images, illustrations, system bars, maps, and embedded content MUST remain legible in supported themes.

---

# 2.64 Forms and validation

Mobile forms MUST follow the Forms & Validation standard.

Mobile-specific implementation MUST additionally account for:

- software keyboard;
- autofill;
- field traversal;
- password managers;
- one-time-code autofill;
- touch input;
- text scaling;
- voice input;
- offline submission; and
- interrupted application lifecycle.

Client validation MUST NOT substitute for authoritative server validation.

A submission MUST protect against accidental duplicate execution.

---

# 2.65 Embedded web content

Web views MUST be used deliberately.

A web view MUST NOT be used solely to avoid implementing a required native capability where the resulting experience materially degrades:

- accessibility;
- navigation;
- authentication;
- performance;
- platform consistency; or
- security.

Web views MUST define:

- navigation policy;
- allowed origins;
- authentication handling;
- cookie handling;
- JavaScript bridge exposure;
- file access;
- deep-link interception;
- external-browser behaviour; and
- failure states.

JavaScript bridges MUST be treated as privileged security boundaries.

---

# 2.66 Authentication flows

Mobile authentication MUST align with the Security standard.

Authentication flows SHOULD use platform-supported browser or identity mechanisms when required by the identity protocol.

Passwords and tokens MUST NOT be exposed to unrelated embedded web contexts.

The application MUST correctly handle:

- expired sessions;
- revoked sessions;
- device changes;
- authentication cancellation;
- callback deep links;
- multi-factor authentication;
- password-reset flows; and
- account switching.

Authentication state MUST be reconciled with server authority.

---

# 2.67 Store readiness

A mobile release MUST satisfy the relevant distribution platform's current submission and policy requirements.

Release preparation MUST include, where applicable:

- app metadata;
- screenshots;
- privacy disclosures;
- permission declarations;
- content rating;
- age classification;
- account-deletion requirements;
- subscription configuration;
- in-app purchase configuration;
- encryption declarations;
- test credentials;
- review instructions;
- legal URLs;
- support information; and
- required entitlement documentation.

Store metadata MUST accurately represent product functionality.

Review notes SHOULD explain functionality that is not apparent to a reviewer.

---

## 2.68 Store policy compliance

Platform policy MUST be treated as an external release dependency.

The team MUST monitor relevant policy changes.

Applications MUST NOT intentionally obscure product behaviour from store review.

The submitted build MUST behave consistently with the functionality described to reviewers.

Platform-policy compliance MUST NOT be deferred until the submission stage.

---

## 2.69 Review accounts

Where reviewers require authentication, the release process SHOULD provide appropriate review credentials or documented access instructions where platform policy permits.

Review credentials MUST:

- avoid exposing real user data;
- provide sufficient functionality for review;
- remain operational throughout the review period; and
- be managed securely.

---

# 2.70 Release gates

A production mobile release MUST pass defined release gates.

These SHOULD include:

- automated tests;
- integration tests;
- mobile accessibility review;
- design QA;
- security checks;
- crash-free validation;
- migration validation;
- deep-link validation;
- notification validation;
- store metadata review;
- privacy review;
- performance checks; and
- release-owner approval.

Release gates MUST NOT rely solely on manual happy-path testing.

---

## 2.71 Staged rollout

Production releases SHOULD support staged rollout where the distribution platform permits it.

Staged rollout SHOULD be used for material or high-risk releases.

During rollout, the team MUST monitor key health indicators.

Rollout progression SHOULD stop when evidence indicates a significant regression.

Operators SHOULD retain the ability to halt rollout where the platform supports it.

---

## 2.72 Rollback

Mobile rollback differs from server rollback because installed binaries cannot generally be instantly replaced.

Every material release SHOULD have a mitigation strategy including one or more of:

- staged rollout stop;
- feature flag;
- remote kill switch;
- backend compatibility adjustment;
- configuration rollback;
- hotfix release; or
- server-side degradation.

Release planning MUST assume some users will remain on the problematic version after mitigation begins.

---

# 2.73 Release observability

A new release MUST be observable by application version and build.

Operators SHOULD monitor:

- crash-free users or sessions;
- crash rate;
- ANR rate;
- startup performance;
- API failure rate;
- authentication failures;
- notification failures;
- deep-link failures;
- synchronization errors;
- migration failures;
- major funnel regressions; and
- platform-specific regressions.

Metrics MUST be segmented sufficiently to identify version-specific failures.

---

# 2.74 Privacy and telemetry

Telemetry MUST follow Security and Data standards.

Mobile analytics MUST NOT collect sensitive information merely because the SDK supports it.

Analytics payloads SHOULD use intentional event schemas.

Applications MUST NOT log:

- passwords;
- access tokens;
- refresh tokens;
- raw payment credentials;
- secret keys;
- protected content; or
- sensitive personal data prohibited by policy.

Third-party analytics and crash tools MUST be configured according to approved privacy requirements.

---

# 2.75 Logging

Production logging MUST be bounded and privacy-safe.

Debug logs MUST NOT expose sensitive information.

Verbose logging SHOULD be disabled or restricted in production.

Logs MUST NOT become a hidden persistent data store.

Remote logging SHOULD include only information required for operational diagnosis.

---

# 2.76 Feature flags

Feature flags MAY be used to decouple binary deployment from feature release.

Mobile feature flags MUST account for:

- offline devices;
- cached configuration;
- application version;
- unsupported client behaviour;
- stale flags;
- defaults; and
- backend compatibility.

A feature flag MUST have a safe default.

Security-critical authorization MUST NOT depend solely on a client-controlled feature flag.

---

# 2.77 Remote configuration

Remote configuration MUST be schema-controlled.

The client MUST validate remotely supplied configuration before use.

Invalid configuration MUST fail safely.

Remote configuration MUST NOT allow arbitrary unreviewed code execution.

Changes capable of materially altering product behaviour SHOULD follow change-control and observability requirements.

---

# 2.78 Testing matrix

Mobile testing MUST cover representative real-device conditions.

The matrix SHOULD include variation across:

- supported OS versions;
- screen sizes;
- device performance classes;
- memory constraints;
- network conditions;
- appearance modes;
- accessibility text sizes;
- screen readers;
- keyboard configurations;
- permissions;
- account states; and
- upgrade paths.

Emulators and simulators MAY supplement testing but MUST NOT be the sole validation environment for critical hardware- or lifecycle-dependent behaviour.

---

# 2.79 Network-condition testing

Material network-dependent flows SHOULD be tested under:

- high latency;
- low bandwidth;
- connection loss;
- reconnect;
- packet failure;
- offline launch; and
- mid-operation connectivity changes.

The application MUST remain recoverable after ordinary network interruption.

---

# 2.80 Upgrade-path testing

A release with persistence or migration changes MUST be tested as an upgrade from supported prior application versions.

Testing only a fresh install is insufficient.

Upgrade tests SHOULD verify:

- stored session state;
- local database migration;
- cached objects;
- queued operations;
- feature flags;
- deep links;
- notification tokens; and
- previous preferences.

---

# 3. Anti-patterns

The following practices are non-compliant.

## 3.1 Desktop navigation transplanted to mobile

Replicating desktop sidebars, hover interactions, dense menus, or multi-column navigation without considering native mobile navigation.

**Why it fails:** mobile navigation has different spatial, ergonomic, lifecycle, and platform expectations.

---

## 3.2 Pixel-identical iOS and Android interfaces

Forcing identical interaction mechanics across platforms despite established native conventions.

**Why it fails:** visual consistency is prioritized over usability and platform literacy.

---

## 3.3 Hard-coded notch handling

Adding fixed top or bottom padding for specific devices.

**Why it fails:** device geometry and system UI vary dynamically.

---

## 3.4 Keyboard-obscured forms

Allowing the software keyboard to cover the focused field, validation message, or submit action.

**Why it fails:** the form becomes partially unusable.

---

## 3.5 Permission wall on first launch

Requesting notifications, location, camera, contacts, and other permissions immediately after installation.

**Why it fails:** the user lacks context and unnecessary permission collection damages usability and privacy.

---

## 3.6 Permission nagging

Repeatedly interrupting users who declined an optional permission.

**Why it fails:** denial is a legitimate platform state, not an error to defeat.

---

## 3.7 UI permission as authorization

Hiding a mobile action and assuming unauthorized users therefore cannot invoke it.

**Why it fails:** authorization belongs in trusted backend or domain enforcement.

---

## 3.8 Online-only happy path

Designing the application as though mobile devices always have stable connectivity.

**Why it fails:** intermittent connectivity is a normal mobile operating condition.

---

## 3.9 Fake success for unsynchronized work

Displaying an operation as server-complete while it remains queued locally when that distinction has user consequences.

**Why it fails:** application state becomes misleading.

---

## 3.10 Infinite background execution assumptions

Building logic that assumes the operating system will allow continuous background execution.

**Why it fails:** mobile operating systems suspend and terminate applications aggressively.

---

## 3.11 Polling instead of lifecycle-aware architecture

Using frequent timers or network polling because synchronization architecture was not defined.

**Why it fails:** battery, network, and system resources are wasted.

---

## 3.12 Push as a source of truth

Depending on a notification being delivered for correctness.

**Why it fails:** push delivery is inherently non-guaranteed.

---

## 3.13 Sensitive lock-screen notifications

Placing private or security-sensitive information directly in push content without considering device visibility.

**Why it fails:** lock screens may expose notifications to unintended viewers.

---

## 3.14 Unvalidated deep links

Directly constructing internal screens from external URL parameters.

**Why it fails:** deep links are attacker-controlled input.

---

## 3.15 Deep links that bypass authorization

Assuming a valid URL implies the user may access the referenced resource.

**Why it fails:** routing and authorization are separate concerns.

---

## 3.16 Splash-screen loading theater

Adding arbitrary delay, video, or brand animation while startup work is already complete.

**Why it fails:** perceived performance is deliberately worsened.

---

## 3.17 Startup SDK pileup

Initializing every analytics, marketing, experimentation, chat, crash, and advertising SDK synchronously during launch.

**Why it fails:** startup becomes dependent on non-critical third-party work.

---

## 3.18 Binary-size indifference

Allowing every SDK and asset bundle to increase application size without budget or review.

**Why it fails:** install conversion, update reliability, storage use, and startup may degrade.

---

## 3.19 Main-thread networking

Performing synchronous remote work on the UI thread.

**Why it fails:** freezes, dropped frames, crashes, and ANRs result.

---

## 3.20 Fresh-install-only testing

Testing a release only after clearing all application data.

**Why it fails:** production users upgrade with existing sessions, databases, caches, and queued state.

---

## 3.21 Breaking old clients on backend deployment

Updating the backend under the assumption that all users immediately install the newest mobile version.

**Why it fails:** mobile client versions remain distributed for extended periods.

---

## 3.22 Mandatory upgrade by default

Using forced upgrades for ordinary feature releases.

**Why it fails:** users may be blocked unnecessarily, store availability may differ, and operational coupling increases.

---

## 3.23 Mandatory upgrade before store propagation

Blocking an old version immediately when the replacement build is not yet reliably available.

**Why it fails:** valid users can become unable to use the product or upgrade.

---

## 3.24 Store review as QA

Discovering authentication, policy, deep-link, crash, or metadata issues only after platform submission.

**Why it fails:** store review is distribution governance, not a substitute for release testing.

---

## 3.25 Crash rate without version segmentation

Monitoring only aggregate application stability.

**Why it fails:** a severe new-release regression can be masked by older stable versions.

---

## 3.26 ANRs treated as cosmetic

Ignoring Android ANRs because the process did not technically crash.

**Why it fails:** the application was still functionally unavailable.

---

## 3.27 Arbitrary native styling

Using isolated hard-coded native colors, spacing, and typography rather than shared semantic tokens.

**Why it fails:** the mobile product drifts from the Design System.

---

## 3.28 Web components reproduced literally

Copying shadcn/ui layout and interaction mechanics directly into native screens even when native controls provide better semantics.

**Why it fails:** shadcn/ui provides the product baseline, not a mandate to imitate DOM behaviour.

---

## 3.29 Web-view escape hatch

Embedding arbitrary product flows in web views to avoid native architecture.

**Why it fails:** navigation, performance, accessibility, security, authentication, and platform integration deteriorate.

---

## 3.30 Production logging of secrets

Leaving authentication tokens, user content, or sensitive request payloads in mobile logs.

**Why it fails:** logs may persist or be captured outside the intended security boundary.

---

# 4. Checklist

A material mobile release MUST satisfy all applicable checks below.

## 4.1 Platform definition

- [ ] Supported platforms are documented.
- [ ] Minimum OS versions are documented.
- [ ] Supported device classes are defined.
- [ ] Orientation policy is defined.
- [ ] Platform-specific behaviour is intentional.
- [ ] Unsupported OS APIs are appropriately guarded.

---

## 4.2 Navigation

- [ ] Root navigation follows platform expectations.
- [ ] Back navigation is defined.
- [ ] Modal dismissal is defined.
- [ ] Tab state is defined.
- [ ] Deep-link entry has meaningful navigation behaviour.
- [ ] Process recreation restores valid routes.
- [ ] Authentication transitions cannot leave invalid screens.
- [ ] Navigation state does not depend solely on process memory.

---

## 4.3 Safe areas and system UI

- [ ] Safe-area insets are platform-derived.
- [ ] Display cutouts are handled.
- [ ] Home/navigation gesture areas are handled.
- [ ] Edge-to-edge content remains usable.
- [ ] Floating actions remain accessible.
- [ ] System-bar contrast is valid.

---

## 4.4 Keyboard and forms

- [ ] Focused inputs remain visible.
- [ ] Validation messages remain accessible.
- [ ] Submit actions remain reachable.
- [ ] Keyboard dismissal is defined.
- [ ] Appropriate keyboard types are used.
- [ ] Autofill is supported where appropriate.
- [ ] Password-manager integration is supported.
- [ ] Form state survives appropriate lifecycle transitions.
- [ ] Server-side validation remains authoritative.

---

## 4.5 Permissions and consent

- [ ] Each requested permission has a justified purpose.
- [ ] Permissions are requested contextually.
- [ ] Optional permissions can be denied.
- [ ] Denial states are designed.
- [ ] Permanent denial is handled.
- [ ] Restricted or limited permission is handled.
- [ ] Consent is not conflated with OS permission.
- [ ] Permission revocation during later use is supported.
- [ ] Sensitive capabilities received appropriate security/privacy review.

---

## 4.6 Offline behaviour

- [ ] Offline launch behaviour is defined.
- [ ] Cached-data freshness is defined.
- [ ] Offline write behaviour is defined.
- [ ] Pending synchronization is represented where relevant.
- [ ] Retry policy is defined.
- [ ] Conflict policy is defined.
- [ ] Non-idempotent requests cannot duplicate accidentally.
- [ ] Reconnect behaviour is tested.
- [ ] Sensitive cached data is appropriately protected.

---

## 4.7 Lifecycle and background execution

- [ ] Foreground/background transitions are handled.
- [ ] Process termination is tolerated.
- [ ] Important state is persisted appropriately.
- [ ] State restoration validates current authorization.
- [ ] Background work uses supported platform mechanisms.
- [ ] Background tasks tolerate cancellation.
- [ ] Background tasks tolerate duplicate execution.
- [ ] Battery-intensive behaviour is justified.
- [ ] UI objects are not required for background execution.

---

## 4.8 Push notifications

- [ ] Notification permission timing is intentional.
- [ ] Notification categories are defined.
- [ ] Optional categories have appropriate user controls.
- [ ] Sensitive lock-screen content is minimized.
- [ ] Push delivery is not a source of truth.
- [ ] Token lifecycle is handled.
- [ ] Duplicate notifications are controlled.
- [ ] Stale notification handling is defined.
- [ ] Notification actions enforce authorization.
- [ ] Notification deep links handle signed-out and unauthorized states.

---

## 4.9 Deep links

- [ ] Supported routes are documented.
- [ ] Parameters are validated.
- [ ] Authentication is enforced.
- [ ] Authorization is enforced.
- [ ] Missing resources are handled.
- [ ] Unsupported versions are handled.
- [ ] HTTPS universal/app links are used where appropriate.
- [ ] Web fallback behaviour is defined.
- [ ] Custom URI schemes are treated as untrusted.
- [ ] Deferred-link failure is tolerated.

---

## 4.10 Performance

- [ ] Cold startup is measured.
- [ ] Warm startup is measured where relevant.
- [ ] Startup budgets are defined.
- [ ] Non-critical initialization is deferred.
- [ ] Network requests do not unnecessarily block launch.
- [ ] Splash screens add no artificial delay.
- [ ] UI-thread blocking work has been removed.
- [ ] Rendering remains responsive.

---

## 4.11 Application size

- [ ] Binary-size budget is defined.
- [ ] Download size is measured.
- [ ] Installed size is considered.
- [ ] Large bundled assets are justified.
- [ ] Unused assets are removed.
- [ ] Third-party SDK size impact is reviewed.
- [ ] On-demand delivery is used where appropriate.

---

## 4.12 Dependencies

- [ ] Mobile SDKs underwent security review.
- [ ] Data collection is understood.
- [ ] Permissions are understood.
- [ ] Binary-size impact is understood.
- [ ] Startup impact is understood.
- [ ] Background behaviour is understood.
- [ ] Privacy declarations are accurate.
- [ ] Failure of the dependency does not unnecessarily block app startup.

---

## 4.13 Security and data

- [ ] Sensitive tokens use secure storage.
- [ ] Logs contain no prohibited secrets.
- [ ] Deep links are validated.
- [ ] Client permissions do not substitute for authorization.
- [ ] Local sensitive data is appropriately protected.
- [ ] Authentication state reconciles with server authority.
- [ ] Device compromise assumptions align with the Security standard.
- [ ] Web-view bridges received security review where present.

---

## 4.14 Accessibility

- [ ] Screen-reader semantics are valid.
- [ ] Reading order is logical.
- [ ] Controls have accessible names.
- [ ] State and value are exposed.
- [ ] Dynamic text is supported.
- [ ] Large text does not hide critical controls.
- [ ] Touch targets meet requirements.
- [ ] Contrast meets requirements.
- [ ] Reduced motion is supported.
- [ ] External keyboard usage is supported where relevant.
- [ ] Custom controls provide native-equivalent semantics.

---

## 4.15 Design System

- [ ] Product semantics align with the shadcn/ui component baseline.
- [ ] Native primitives are used where platform-appropriate.
- [ ] Semantic token mapping is implemented.
- [ ] Dark mode uses semantic tokens.
- [ ] Component states align with shared standards.
- [ ] No unjustified platform-specific visual values have proliferated.
- [ ] Mobile-specific patterns are documented where reusable.

---

## 4.16 API and version compatibility

- [ ] Current backend supports all supported mobile versions.
- [ ] Breaking API changes are versioned.
- [ ] Unsupported clients receive defined behaviour.
- [ ] Client-version detection is reliable.
- [ ] Capability differences are explicitly handled.
- [ ] Feature flags have safe defaults.
- [ ] Offline configuration behaviour is defined.

---

## 4.17 Local migrations

- [ ] Upgrade from supported prior schemas is tested.
- [ ] Interrupted migration is handled.
- [ ] Failed migration behaviour is defined.
- [ ] User data is not silently destroyed.
- [ ] Migration telemetry is available where appropriate.
- [ ] Schema changes are compatible with state restoration.

---

## 4.18 Crash and ANR readiness

- [ ] Production crash reporting is configured.
- [ ] Crash reports identify version/build.
- [ ] Sensitive information is excluded.
- [ ] Android ANRs are monitored.
- [ ] Main-thread blocking has been reviewed.
- [ ] Repeated crash loops have a mitigation path.
- [ ] Release health can be segmented by version.

---

## 4.19 Store submission

- [ ] Store metadata is accurate.
- [ ] Screenshots are current.
- [ ] Privacy disclosures are current.
- [ ] Permission declarations are accurate.
- [ ] Content/age ratings are correct.
- [ ] Review credentials work where required.
- [ ] Review instructions are complete.
- [ ] Subscription or purchase metadata is correct where applicable.
- [ ] Legal and support links are valid.
- [ ] The submitted binary corresponds to reviewed functionality.

---

## 4.20 Release

- [ ] Automated tests pass.
- [ ] Integration tests pass.
- [ ] Design QA passes.
- [ ] Accessibility review passes.
- [ ] Security gates pass.
- [ ] Upgrade paths are tested.
- [ ] Notifications are tested.
- [ ] Deep links are tested.
- [ ] Local migrations are tested.
- [ ] Performance budgets are checked.
- [ ] Crash/ANR monitoring is ready.
- [ ] Staged rollout strategy is defined.
- [ ] Rollback/mitigation strategy is defined.
- [ ] Release owner is identified.

---

## 4.21 Versioning and upgrade policy

- [ ] Marketing version is assigned.
- [ ] Unique build identifier is assigned.
- [ ] Source revision is traceable.
- [ ] Minimum supported version is defined.
- [ ] Recommended-upgrade behaviour is defined where applicable.
- [ ] Mandatory upgrade is used only when justified.
- [ ] Required replacement build is available before forced upgrade.
- [ ] Mandatory-upgrade failure behaviour is defined.
- [ ] Backend compatibility is preserved for supported versions.

---

## 4.22 Post-release

- [ ] Rollout health is monitored.
- [ ] Crash rate is reviewed by build.
- [ ] ANR rate is reviewed by build.
- [ ] Startup performance is reviewed.
- [ ] API failures are reviewed.
- [ ] Synchronization failures are reviewed.
- [ ] Migration failures are reviewed.
- [ ] Notification failures are reviewed.
- [ ] Deep-link failures are reviewed.
- [ ] Rollout can be halted where supported.
- [ ] Emergency feature mitigation is available where justified.

---

# 5. Canonical summary

A mobile application is a **long-lived distributed client operating under constrained execution, intermittent connectivity, platform governance, and version fragmentation**.

It MUST NOT be designed as merely a responsive website packaged for a smaller screen.

The canonical mobile architecture MUST account for:

**native navigation + safe areas + keyboard behaviour + permissions + consent + lifecycle + offline state + synchronization + background execution + push notifications + deep links + startup + application size + store governance + crashes + ANRs + version compatibility + upgrade policy.**

Platform conventions SHOULD be respected.

Product semantics, data rules, accessibility outcomes, security guarantees, and business logic MUST remain consistent across platforms.

shadcn/ui provides the canonical **component vocabulary and product semantics**, while native platform primitives SHOULD provide the actual interaction implementation where they offer the correct platform behaviour.

Permissions MUST be contextual. Denial MUST be supported. Device permission MUST NOT be confused with legal or product consent.

Offline and background behaviour MUST be explicit. The application MUST tolerate suspension, process termination, delayed work, stale data, reconnects, and synchronization failure.

Push notifications MUST be treated as **best-effort transport**, never authoritative product state.

Deep links MUST be treated as **untrusted input** and MUST pass normal authentication, authorization, and validation.

Startup and binary size MUST have explicit budgets. Non-critical work MUST NOT unnecessarily block initial application usability.

Mobile APIs MUST remain compatible with supported installed versions because backend deployment does not imply client upgrade.

Crash and ANR monitoring MUST be part of production operations and MUST be attributable to application version and build.

Store submission is a release dependency, not a QA strategy.

Mandatory upgrades MUST be exceptional and MUST NOT be activated before the required replacement build is reliably available.

The canonical lifecycle is:

**Define platform support → Design native navigation → Implement lifecycle-safe state → Handle permissions and connectivity → Integrate notifications and deep links → Enforce performance budgets → Test upgrades and migrations → Pass store/release gates → Stage rollout → Monitor crashes, ANRs, and version health.**

A Gold Standard mobile application therefore remains:

**native in interaction, consistent in product semantics, resilient under mobile lifecycle conditions, secure by design, observable in production, backward-compatible across supported clients, and releasable without making the installed application version an operational blind spot.**
