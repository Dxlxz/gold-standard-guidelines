---
id: "desktop-app"
title: "Desktop & Electron Apps"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["engineering", "desktop", "electron", "apps"]
applies_to: ["client"]
related: []
legacy_number: 96
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 58516
provenance: baseline

---

Below is the canonical standard for direct inclusion at **Framework → Desktop → Security → Release & Versioning**.

# Gold Standard 2026 — Desktop & Electron App Guidelines

**Canonical placement:** Framework → Desktop → Security → Release & Versioning  
**Status:** Normative  
**Baseline:** Gold Standard 2026  
**Applies to:** Electron applications, desktop shells around web applications, hybrid desktop clients, internal desktop tools, enterprise-distributed desktop applications, and supporting native integrations on Windows, macOS, and Linux.

---

# 1. Purpose

## 1.1 Objective

This standard defines how desktop applications MUST be architected, secured, packaged, updated, observed, and operated.

Its purpose is to ensure desktop applications preserve web-platform engineering standards while correctly handling the additional privileges and lifecycle responsibilities introduced by native execution.

Desktop applications operate with capabilities that browser applications normally do not possess.

These MAY include:

- filesystem access;
- clipboard access;
- native process execution;
- operating-system notifications;
- protocol handlers;
- global shortcuts;
- local persistence;
- native menus;
- auto-update;
- privileged IPC;
- enterprise installation;
- device integration; and
- background execution.

These capabilities materially increase security, privacy, operational, and compatibility risk.

Desktop architecture MUST therefore treat privileged functionality as an explicitly governed boundary.

A desktop application MUST NOT be treated as “a website with extra APIs.”

## 1.2 Scope

This standard applies to:

- Electron main processes;
- renderer processes;
- preload scripts;
- utility processes;
- native modules;
- browser windows and webviews;
- IPC;
- deep links and custom protocols;
- filesystem access;
- clipboard operations;
- native dialogs;
- native menus;
- tray and dock behaviour;
- auto-updaters;
- code signing;
- notarisation;
- desktop persistence;
- crash reporting;
- packaging;
- release channels;
- installer behaviour;
- enterprise deployment; and
- desktop-specific observability.

Where this standard conflicts with platform-specific security requirements, the stricter requirement MUST apply.

---

# 2. Rules

## 2.1 Desktop Architecture MUST Preserve Privilege Separation

Desktop applications MUST separate privileged operating-system access from untrusted or semi-trusted presentation logic.

The default architecture MUST distinguish at least:

1. **main process** — lifecycle, native integration, privileged operations;
2. **renderer process** — application UI;
3. **preload boundary** — narrow capability bridge where required; and
4. **utility or worker processes** — isolated heavy or specialised work where appropriate.

Renderer code MUST NOT receive unrestricted operating-system capabilities.

Privileged functionality MUST be exposed through narrowly scoped interfaces.

The architecture SHOULD follow the principle:

> renderer requests capability; privileged process validates and performs it.

The renderer MUST NOT determine by itself whether a privileged operation is authorised.

---

## 2.2 Main Process Responsibilities

The main process SHOULD own:

- application lifecycle;
- window creation;
- native menus;
- system tray;
- protocol registration;
- file-open events;
- auto-update orchestration;
- native dialogs;
- secure credential integration;
- privileged filesystem operations;
- application-level shortcuts;
- crash-process coordination;
- platform integration; and
- security-sensitive IPC.

The main process SHOULD NOT contain large amounts of application business logic that can safely run in a less privileged context.

Privileged code SHOULD remain small, explicit, testable, and auditable.

---

## 2.3 Renderer Isolation

Renderer processes MUST operate with the minimum required privileges.

Desktop applications MUST enable renderer isolation controls appropriate to the framework and platform.

In Electron-style architectures:

- Node.js integration in ordinary application renderers MUST be disabled unless explicitly justified;
- context isolation MUST be enabled;
- sandboxing SHOULD be enabled where compatible with required functionality;
- remote or equivalent unrestricted bridging mechanisms MUST NOT be used;
- privileged globals MUST NOT be exposed directly; and
- renderer code MUST NOT gain arbitrary `require`, filesystem, process, shell, or native-module access.

A renderer compromise MUST NOT automatically become full operating-system compromise.

---

## 2.4 Preload Scripts

Preload scripts MUST be treated as privileged security-boundary code.

A preload script MUST expose only the minimum application-specific API required by the renderer.

A preload bridge MUST NOT expose:

- raw IPC transports;
- arbitrary channel names;
- unrestricted filesystem access;
- unrestricted shell execution;
- unrestricted process APIs;
- arbitrary environment variables;
- generic command execution;
- unrestricted native module access; or
- mutable privileged objects.

Preferred API shape:

> `desktop.openFile()`  
> `desktop.saveDocument()`  
> `desktop.getAppVersion()`

Discouraged API shape:

> `desktop.send(channel, payload)`

Generic privileged bridges MUST NOT be used where a typed capability-specific API can be defined.

---

## 2.5 IPC Security

IPC MUST be designed as an API boundary.

Every privileged IPC handler MUST validate:

- sender identity;
- sender origin where applicable;
- message schema;
- input types;
- input length;
- path arguments;
- enum values;
- permissions;
- state assumptions; and
- operation-specific authorization.

IPC payloads MUST NOT be trusted because they originated from an application renderer.

Schema validation SHOULD use the same canonical validation approach defined by the Forms & Validation and API standards.

Unknown IPC methods or fields SHOULD be rejected.

Sensitive IPC channels SHOULD be explicitly enumerated.

---

## 2.6 IPC Contracts

IPC contracts SHOULD be versioned or centrally typed.

The contract SHOULD define:

- request shape;
- response shape;
- error semantics;
- permission requirements;
- timeout expectations;
- cancellation behaviour;
- process owner; and
- compatibility expectations.

IPC failures MUST be represented as structured errors rather than uncontrolled exceptions.

Renderer-visible errors MUST NOT expose secrets, credentials, local filesystem details, internal stack traces, or sensitive environment information.

---

## 2.7 Content Security

Renderer content MUST use a restrictive Content Security Policy.

The application MUST NOT rely on unrestricted inline script execution.

Remote content MUST be treated as untrusted.

An application SHOULD NOT load its primary privileged UI from arbitrary remote origins.

If remote content is required:

- it MUST run in an appropriately isolated renderer;
- it MUST NOT inherit privileged preload capabilities;
- navigation MUST be controlled;
- new-window behaviour MUST be controlled; and
- origin allowlists MUST be explicit.

Remote content MUST NOT be granted desktop privileges solely because it appears inside the application.

---

## 2.8 Navigation and External URLs

Unexpected navigation MUST be blocked.

The application MUST validate external URLs before opening them.

Only approved schemes SHOULD be permitted.

`file:`, custom protocols, script-capable schemes, and local-resource URLs MUST receive explicit handling.

External links SHOULD open in the user's configured browser unless an in-app browsing surface is intentionally designed and isolated.

User-controlled input MUST NOT be passed directly to shell-opening APIs without validation.

---

## 2.9 Custom Protocols and Deep Links

Custom protocols and deep links MUST be treated as externally controlled input.

Deep-link payloads MUST be validated before use.

A deep link MUST NOT directly trigger privileged actions such as:

- deleting files;
- importing executable content;
- invoking shell commands;
- changing security configuration;
- authenticating as another user; or
- installing extensions

without explicit validation and applicable user confirmation.

Single-instance behaviour SHOULD route deep links deterministically to the existing application instance.

Deep-link handling MUST account for cold start and already-running application states.

---

## 2.10 Native Module Usage

Native modules SHOULD be minimised.

Every native module MUST have:

- an explicit owner;
- a documented purpose;
- supported platform matrix;
- update strategy;
- security-review status where applicable; and
- rebuild compatibility with the selected Electron/runtime version.

Native modules MUST NOT be added solely for convenience where standard platform APIs already satisfy the requirement.

Native module failure MUST NOT corrupt application state.

---

## 2.11 Filesystem Access

Filesystem access MUST follow least privilege.

The application MUST NOT read arbitrary user files without a defined product requirement.

User-selected file access SHOULD prefer native open/save dialogs or explicitly scoped locations.

File paths received from renderers MUST be validated.

Applications MUST defend against:

- path traversal;
- symbolic-link surprises;
- unsafe temporary-file handling;
- race conditions;
- unintended overwrite;
- insecure permissions;
- unbounded file size;
- malformed file content; and
- unsafe filename handling.

Writing outside application-owned or explicitly user-selected locations SHOULD require clear justification.

---

## 2.12 Application Data Directories

Persistent application data MUST use platform-appropriate application storage locations.

Application data MUST NOT be stored in arbitrary working directories.

Data SHOULD be separated by purpose where practical, including:

- configuration;
- user state;
- caches;
- logs;
- databases;
- temporary files;
- crash data; and
- update artifacts.

Caches MUST be safe to delete.

Critical user data MUST NOT be stored only in a cache directory.

---

## 2.13 File Permission Handling

Created files MUST use the minimum required operating-system permissions.

Sensitive files SHOULD NOT be world-readable or broadly accessible by default.

The application MUST consider platform-specific ACL or permission behaviour for:

- credentials;
- authentication state;
- private keys;
- exports;
- logs;
- local databases; and
- diagnostic bundles.

Sensitive data MUST NOT be written to temporary locations without appropriate controls.

---

## 2.14 File Import

Imported files MUST be treated as untrusted.

Import pipelines SHOULD validate:

- format;
- MIME or content type;
- maximum size;
- schema;
- encoding;
- decompression limits;
- referenced resources; and
- unsupported fields.

File extension alone MUST NOT be considered sufficient validation.

Archives MUST be protected against traversal and decompression-bomb behaviour.

Imported HTML, Markdown, SVG, document formats, or other active content MUST be sanitised or isolated appropriately before rendering.

---

## 2.15 File Export

Exports MUST preserve expected user control.

The application SHOULD use an explicit destination selection unless the product specifies a safe canonical export directory.

Existing files MUST NOT be silently overwritten unless that behaviour is unambiguous and expected.

Exports containing sensitive data SHOULD make the sensitivity clear where appropriate.

The application SHOULD avoid exporting secrets or hidden internal metadata unless explicitly required.

---

## 2.16 Clipboard Access

Clipboard access MUST be purpose-limited.

The application MUST NOT continuously monitor the clipboard without an approved product requirement.

Clipboard reads SHOULD be user initiated unless background access is essential.

Sensitive clipboard data MUST NOT be:

- logged;
- retained unnecessarily;
- transmitted without necessity; or
- stored in analytics.

Where the application writes sensitive values to the clipboard, auto-clearing MAY be considered when appropriate and reliable, but MUST NOT be represented as a guaranteed security boundary across operating systems.

---

## 2.17 Clipboard UX

Clipboard actions SHOULD provide clear feedback.

Copy operations SHOULD use the canonical interaction pattern and accessible status announcement.

Applications SHOULD NOT replace normal clipboard semantics with surprising proprietary behaviour.

Clipboard failures MUST be recoverable.

---

## 2.18 Shell and Process Execution

Arbitrary shell execution from renderer-controlled input MUST NOT be permitted.

If child processes are required:

- executables MUST be explicitly selected;
- arguments MUST be structured;
- shell interpolation SHOULD be avoided;
- environment variables MUST be controlled;
- working directories MUST be explicit where relevant;
- output MUST be bounded; and
- exit status MUST be handled.

User input MUST NOT be concatenated into shell command strings.

The shell MUST NOT be used where direct process invocation is sufficient.

---

## 2.19 Environment Variables and Secrets

Renderer processes MUST NOT receive unrestricted process environment variables.

Environment variables containing secrets MUST remain confined to appropriate privileged processes.

Build-time public configuration MUST be clearly separated from runtime secrets.

Secrets MUST NOT be embedded into renderer bundles.

Desktop binaries MUST be assumed inspectable by end users.

Any credential shipped inside the application MUST therefore be treated as recoverable by an attacker.

---

## 2.20 Credential Storage

Authentication tokens, refresh tokens, private keys, and equivalent sensitive credentials SHOULD use platform-protected credential storage where available.

Sensitive credentials MUST NOT be stored in plain-text configuration files by default.

If encrypted local storage is used, key management MUST be considered separately from ciphertext storage.

Encryption whose key is shipped next to the encrypted data MUST NOT be represented as strong secret protection.

---

## 2.21 Native Menus

Desktop applications SHOULD provide platform-appropriate native menus.

Menus SHOULD include conventional operations where applicable:

- About;
- Preferences or Settings;
- Quit;
- Edit;
- Undo;
- Redo;
- Cut;
- Copy;
- Paste;
- Select All;
- Window;
- Help.

Menu labels and placement SHOULD follow operating-system conventions.

Platform-native expectations SHOULD take precedence over web-only interaction conventions where they conflict.

---

## 2.22 Keyboard Shortcuts

Keyboard shortcuts MUST be deterministic and documented where discoverability matters.

Standard operating-system shortcuts SHOULD be preserved.

Application-specific shortcuts MUST NOT unnecessarily override common native shortcuts.

Shortcut handling MUST account for platform modifier conventions.

For example, application code SHOULD conceptually distinguish:

- primary platform modifier;
- alternate modifier;
- shift;
- control;

rather than hard-code one operating system's convention.

Shortcut collisions MUST be resolved explicitly.

---

## 2.23 Global Shortcuts

Global shortcuts SHOULD be avoided unless the application genuinely requires system-wide behaviour.

Global shortcuts MUST:

- be user-beneficial;
- avoid common operating-system conflicts;
- be unregisterable;
- be removed on shutdown;
- respect enterprise restrictions where applicable; and
- fail gracefully when unavailable.

Global shortcuts MUST NOT be used as hidden input-monitoring mechanisms.

---

## 2.24 Window Creation

New windows MUST be intentional.

Every window SHOULD have a defined role.

Examples include:

- primary application window;
- settings window;
- authentication window;
- document window;
- utility window;
- inspector or developer tool;
- modal workflow.

Arbitrary content MUST NOT be allowed to create unrestricted privileged windows.

---

## 2.25 Window State

Applications SHOULD restore appropriate window state between sessions.

Window state MAY include:

- size;
- position;
- maximised state;
- full-screen state;
- display selection; and
- document association.

Restored bounds MUST be validated against the currently available display topology.

A window MUST NOT reopen permanently off-screen because a monitor was disconnected.

Minimum and maximum dimensions SHOULD preserve usability and accessibility.

---

## 2.26 Multi-Window Behaviour

Multi-window applications MUST define ownership and synchronization semantics.

The application MUST specify:

- whether multiple windows share state;
- which state is global;
- which state is window-local;
- how mutations propagate;
- how authentication state propagates;
- how sign-out affects open windows;
- how destructive operations coordinate; and
- how application shutdown behaves.

Window-to-window communication MUST NOT bypass normal security and validation boundaries.

---

## 2.27 Single-Instance Behaviour

Applications SHOULD explicitly decide whether multiple application instances are supported.

If only one application instance is intended, the application SHOULD enforce single-instance behaviour.

A secondary launch SHOULD pass relevant arguments or deep-link information to the primary instance and terminate cleanly.

Race conditions during startup MUST be handled.

---

## 2.28 Window Close Behaviour

Close behaviour MUST match platform expectations.

Teams MUST explicitly define whether closing the last window:

- quits the application;
- leaves the application running;
- minimises to tray; or
- remains active in the dock or menu bar.

The application MUST NOT continue running invisibly without a product or platform reason.

If background operation continues after all windows close, that behaviour SHOULD be apparent to users.

---

## 2.29 Tray and Menu Bar Applications

Tray or menu bar behaviour MUST be explicit.

The application MUST NOT rely on a tray icon as the sole user-visible indication of security-sensitive background activity unless platform conventions support that model.

Tray applications SHOULD provide:

- clear quit control;
- settings access;
- current status where relevant; and
- discoverable re-open behaviour.

---

## 2.30 Application Lifecycle

The application MUST handle lifecycle transitions consistently.

Lifecycle handling SHOULD account for:

- cold start;
- second launch;
- reopen;
- suspend;
- resume;
- logout;
- shutdown;
- system sleep;
- network loss;
- display changes;
- lock/unlock;
- update restart; and
- crash recovery.

Critical in-memory state SHOULD be persisted before lifecycle transitions where appropriate.

---

## 2.31 Unsaved Work

Applications handling editable local content MUST define unsaved-work behaviour.

Users MUST receive an opportunity to prevent accidental data loss where reasonable.

Close, quit, reload, update, and crash-recovery paths MUST account for unsaved changes.

Autosave SHOULD be used where it improves reliability and does not create unexpected persistence behaviour.

The UI MUST distinguish saved, saving, and unsaved state where the distinction is material.

---

## 2.32 State Management Alignment

Desktop state MUST follow the canonical State Management standard.

The architecture SHOULD distinguish:

- renderer-local UI state;
- shared application state;
- server state;
- persisted desktop state;
- window-specific state; and
- privileged main-process state.

The main process MUST NOT become an unstructured global state store.

State duplicated across processes MUST have a clear source of truth and synchronization strategy.

---

## 2.33 Data & Database Alignment

Local databases and persistence MUST follow the Data & Database standard.

Teams MUST define:

- schema ownership;
- migrations;
- backward compatibility;
- transaction boundaries;
- corruption handling;
- backup expectations;
- cleanup;
- encryption requirements;
- upgrade paths; and
- downgrade behaviour where supported.

Application startup MUST NOT assume database migrations always succeed.

Migration failures MUST have defined recovery behaviour.

---

## 2.34 Local Database Migrations

Database migrations MUST be versioned.

Migrations SHOULD be:

- deterministic;
- restart-safe;
- tested against realistic previous versions;
- monitored for failure; and
- compatible with the release strategy.

Destructive migrations SHOULD require explicit migration strategy.

A desktop auto-update MUST NOT make user data unreadable without a supported recovery path.

---

## 2.35 API Alignment

Desktop clients MUST follow the canonical API standard.

The client MUST tolerate reasonable server/client version skew.

APIs MUST NOT assume every desktop client updates immediately.

Server changes SHOULD account for:

- older application versions;
- phased rollout;
- enterprise update delays;
- offline devices; and
- long-lived sessions.

Breaking API changes MUST NOT depend on all desktop clients upgrading synchronously unless deployment is centrally controlled and verified.

---

## 2.36 Offline Behaviour

Desktop applications SHOULD explicitly define offline behaviour.

The application MUST distinguish:

- no network;
- server unavailable;
- authentication failure;
- stale cached state;
- synchronisation pending; and
- unrecoverable local error.

Offline-capable applications MUST define reconciliation behaviour.

Conflicts MUST NOT be silently overwritten where doing so could cause material user-data loss.

---

## 2.37 Forms & Validation Alignment

Desktop forms MUST follow the canonical Forms & Validation standard.

Native capabilities MUST NOT weaken server-side validation.

All privileged input passed to native operations MUST receive additional operation-specific validation.

File paths, URLs, process arguments, identifiers, and IPC payloads MUST NOT bypass validation because they originate from trusted-looking UI.

---

## 2.38 Accessibility

Desktop applications MUST meet the corpus Accessibility standard.

Native desktop behaviour MUST preserve:

- keyboard navigation;
- visible focus;
- semantic controls;
- accessible names;
- correct roles;
- screen-reader compatibility;
- contrast;
- reduced motion;
- zoom or scaling expectations;
- error announcements; and
- logical focus movement.

Custom window chrome MUST NOT reduce accessibility compared with native chrome without an equivalent accessible implementation.

---

## 2.39 Native Dialog Accessibility

Native dialogs SHOULD be preferred for:

- file selection;
- folder selection;
- operating-system permission prompts;
- save destinations; and
- platform-integrated confirmation where appropriate.

Custom dialogs MUST follow the canonical Dialog pattern.

They MUST implement:

- focus trapping where appropriate;
- initial focus;
- Escape behaviour where appropriate;
- focus restoration;
- accessible labels;
- keyboard operation; and
- predictable destructive-action handling.

---

## 2.40 Design Tokens

Desktop UI MUST use canonical Design Tokens.

Platform-specific UI MAY adapt:

- typography;
- spacing;
- density;
- window chrome;
- motion;
- pointer affordances;
- focus treatment; and
- control dimensions

where native convention requires it.

Such adaptation SHOULD remain expressed through the token system rather than isolated magic values.

---

## 2.41 Component Baseline

**shadcn/ui is the baseline component implementation model.**

Desktop renderer UI SHOULD compose canonical shadcn/ui-based components before introducing bespoke controls.

Components MUST preserve:

- accessibility;
- token usage;
- keyboard interaction;
- state semantics;
- loading behaviour;
- error behaviour; and
- platform-appropriate focus handling.

Bespoke native-feeling components MUST NOT bypass component governance.

---

## 2.42 Pattern Standards

Desktop workflows SHOULD use the canonical Pattern standards.

This includes:

- dialogs;
- confirmation;
- settings;
- forms;
- search;
- command interfaces;
- navigation;
- notifications;
- errors;
- empty states;
- tables;
- onboarding; and
- destructive actions.

Desktop-specific patterns SHOULD extend the canonical pattern library rather than silently diverge from it.

---

## 2.43 Resource Budgets

Desktop applications MUST define resource expectations.

Teams SHOULD maintain budgets for:

- idle memory;
- active memory;
- renderer count;
- startup CPU;
- sustained CPU;
- GPU usage;
- background CPU;
- disk cache;
- persistent local storage;
- installer size; and
- update payload size.

Budgets SHOULD be appropriate to application complexity and target hardware.

A desktop application MUST NOT assume workstation-class hardware is universally available.

---

## 2.44 Memory

Memory usage MUST be observable.

Teams SHOULD identify:

- baseline memory after startup;
- memory after common workflows;
- per-window cost;
- per-renderer cost;
- memory after windows close;
- long-session growth; and
- behaviour under constrained memory.

Repeatedly opening and closing a workflow MUST NOT cause unbounded retained memory.

Memory leaks SHOULD be treated as release-quality defects when they materially affect normal sessions.

---

## 2.45 Renderer Count

Applications SHOULD minimise unnecessary renderer processes.

Each window, embedded view, worker, or isolated context MAY increase memory overhead.

Teams MUST NOT create hidden renderer processes without a defined lifecycle.

Closed windows MUST release associated application resources.

Persistent background renderers SHOULD have explicit justification.

---

## 2.46 CPU Usage

An idle desktop application SHOULD consume negligible sustained CPU.

Background polling MUST use appropriate intervals and backoff.

Applications MUST NOT rely on high-frequency timers where event-driven behaviour is available.

Hidden or minimised windows SHOULD reduce non-essential work.

Animations SHOULD stop or throttle where no longer visible.

---

## 2.47 Startup Performance

Startup performance SHOULD be measured.

Teams SHOULD distinguish:

- process start;
- first window visible;
- shell interactive;
- data loaded;
- application ready.

Critical startup work SHOULD be minimised.

Heavy initialization SHOULD be deferred when safe.

The main thread MUST NOT perform avoidable expensive synchronous work during startup.

---

## 2.48 Disk Usage

Caches and logs MUST have bounded growth.

The application SHOULD define maximum or managed limits for:

- HTTP cache;
- image cache;
- temporary exports;
- logs;
- crash dumps;
- update downloads; and
- local analytics buffers.

Temporary artifacts SHOULD be cleaned up after successful use.

Disk exhaustion MUST fail safely.

---

## 2.49 Logging

Desktop logs MUST follow the Security and Privacy & Data Governance standards.

Logs MUST NOT contain:

- passwords;
- access tokens;
- refresh tokens;
- private keys;
- sensitive clipboard contents;
- full sensitive document contents;
- unnecessary personal data; or
- secrets from process environments.

Logs SHOULD include enough information for diagnostics without capturing user content unnecessarily.

Log retention MUST be bounded.

---

## 2.50 Crash Reporting

Production desktop applications SHOULD implement crash reporting.

Crash reporting SHOULD cover:

- main-process crashes;
- renderer crashes;
- native crashes where supported;
- fatal startup failures; and
- update failures.

Crash reports MUST respect privacy and consent requirements.

Crash payloads MUST NOT intentionally include sensitive user content.

---

## 2.51 Crash Context

Crash reports SHOULD include safe diagnostic context such as:

- application version;
- operating-system version;
- architecture;
- process type;
- release channel;
- feature flags where appropriate;
- anonymised error identifiers;
- recent non-sensitive breadcrumbs; and
- crash signature.

Sensitive identifiers MUST be excluded or appropriately pseudonymised.

---

## 2.52 Crash Recovery

The application SHOULD recover gracefully from renderer crashes.

Where practical:

- crashed windows SHOULD be recoverable;
- unsaved work SHOULD be restored where safe;
- the entire application SHOULD NOT terminate because a secondary renderer crashed.

Repeated crash loops MUST be detected.

The application SHOULD offer a safe recovery path when startup repeatedly fails.

---

## 2.53 Safe Mode

Complex desktop applications SHOULD consider a safe mode.

Safe mode MAY disable:

- optional extensions;
- GPU acceleration;
- third-party integrations;
- experimental features;
- non-essential startup actions; or
- problematic persisted state.

Safe mode MUST NOT disable mandatory security controls.

---

## 2.54 Versioning

Desktop applications MUST use a consistent release-versioning scheme.

Every released artifact MUST be uniquely identifiable.

Version metadata SHOULD distinguish:

- human-readable application version;
- build identifier;
- commit or source revision where appropriate;
- release channel;
- packaging timestamp where useful.

The application SHOULD expose version information through an About or diagnostic surface.

---

## 2.55 Release Channels

Desktop distribution SHOULD use explicit release channels.

Typical channels MAY include:

- stable;
- beta;
- canary;
- development;
- enterprise-controlled.

Channel semantics MUST be documented.

Users MUST NOT silently move between materially different release channels.

Pre-release channels SHOULD communicate their stability expectations.

---

## 2.56 Auto-Update

Auto-update MUST use authenticated and integrity-protected release artifacts.

Update metadata MUST NOT be trusted without verification.

The update system MUST verify that artifacts originate from the approved publisher.

Updates MUST NOT execute arbitrary content from an untrusted update source.

---

## 2.57 Update Channels

Update channels MUST be isolated logically.

A stable client MUST NOT consume beta or development updates unless explicitly switched.

Channel transitions SHOULD be intentional.

Downgrade behaviour MUST be defined where channel switching can install an older version.

---

## 2.58 Phased Rollouts

Production updates SHOULD support staged or phased rollout.

Rollout stages MAY include:

- internal;
- canary;
- small percentage;
- expanding percentage;
- general availability.

Teams SHOULD monitor:

- crash rate;
- startup failures;
- update success;
- critical errors;
- resource regressions;
- support volume; and
- security issues

before expanding rollout.

---

## 2.59 Update Rollback

Release systems MUST define rollback strategy.

Rollback MAY consist of:

- pausing rollout;
- publishing a fixed forward version;
- reverting update metadata;
- enterprise package withdrawal; or
- restoring a known-good release.

Teams MUST NOT assume binary downgrade is always safe.

If data migrations are irreversible, rollback strategy MUST account for schema compatibility.

---

## 2.60 Mandatory Updates

Mandatory updates SHOULD be rare.

They MAY be appropriate for:

- critical security fixes;
- unsupported server compatibility;
- regulatory requirements;
- severe data corruption risk.

Mandatory updates MUST NOT strand users without clear recovery or support guidance.

Enterprise-managed environments MAY require different update policies.

---

## 2.61 Update UX

Updates SHOULD avoid interrupting active work.

Applications SHOULD distinguish:

- update available;
- update downloading;
- update ready;
- restart required;
- update failed.

Users SHOULD be allowed to defer non-critical restarts.

The application MUST protect unsaved work during update restart.

---

## 2.62 Code Signing

Production desktop binaries MUST be signed where the target platform supports trusted publisher signing.

Signing keys MUST be protected according to the Security standard.

Private signing keys MUST NOT be committed to source control.

Signing credentials MUST be restricted to authorised build or release systems.

Unsigned production artifacts MUST NOT be substituted for signed releases without explicit exception governance.

---

## 2.63 Signing Key Protection

Code-signing keys MUST receive heightened protection.

Controls SHOULD include:

- restricted identities;
- hardware-backed storage where practical;
- CI secret isolation;
- limited exportability;
- audit logging;
- key rotation;
- revocation planning; and
- release-approval controls.

Compromise of a signing key MUST be treated as a security incident.

---

## 2.64 macOS Notarisation

macOS production releases distributed outside controlled development environments MUST satisfy applicable signing and notarisation requirements.

Notarisation MUST occur on the exact distributable artifact or approved packaging flow.

Teams MUST verify that distributed artifacts pass expected platform trust checks before release.

Notarisation credentials MUST follow secrets-management requirements.

---

## 2.65 Windows Signing

Windows production executables and installers SHOULD use trusted publisher signing appropriate to the deployment model.

Installers, executables, and update artifacts SHOULD preserve a coherent publisher identity.

Certificate renewal MUST be planned before expiry.

Release pipelines MUST NOT depend on emergency manual signing as the normal process.

---

## 2.66 Linux Packaging

Linux packaging SHOULD use distribution-appropriate integrity and trust mechanisms.

Teams SHOULD explicitly support the selected package formats rather than assuming identical behaviour across:

- AppImage;
- `.deb`;
- `.rpm`;
- Flatpak;
- Snap; or
- enterprise-managed packages.

Desktop integration and auto-update strategy MUST match the packaging model.

---

## 2.67 Build Reproducibility

Release artifacts SHOULD be reproducible or at minimum traceable to:

- source revision;
- dependency lock state;
- build environment;
- signing event;
- build pipeline; and
- release metadata.

Production builds MUST NOT be assembled from undocumented local developer state.

---

## 2.68 Dependency Integrity

Desktop dependencies MUST be pinned through appropriate lockfiles or equivalent dependency controls.

Build pipelines MUST detect integrity failures.

Native and binary dependencies SHOULD receive the same supply-chain scrutiny as JavaScript dependencies.

A desktop application SHOULD maintain a software bill of materials where required by organisational security policy.

---

## 2.69 Security Updates

Desktop framework and runtime security updates MUST be monitored.

Electron, Chromium, Node.js, native libraries, and packaging dependencies SHOULD be kept within supported security windows.

Teams MUST NOT remain indefinitely on unsupported runtime versions.

Security-relevant updates SHOULD receive prioritised release treatment.

---

## 2.70 Enterprise Deployment

Desktop applications intended for enterprise use MUST support managed deployment requirements appropriate to target organisations.

This MAY include:

- MSI or equivalent managed installers;
- package-manager deployment;
- MDM distribution;
- machine-wide installation;
- per-user installation;
- silent install;
- silent uninstall;
- configuration policy;
- managed update channels;
- proxy support;
- certificate stores;
- network restrictions; and
- offline installation.

Enterprise deployment MUST NOT require interactive consumer flows where silent management is expected.

---

## 2.71 Enterprise Configuration

Enterprise configuration SHOULD be externally manageable.

Managed settings MAY include:

- update policy;
- release channel;
- telemetry;
- proxy configuration;
- allowed endpoints;
- authentication mode;
- storage locations;
- feature availability;
- security policy; and
- diagnostic behaviour.

Managed configuration MUST have clear precedence over user configuration where policy requires it.

The precedence model MUST be documented.

---

## 2.72 Enterprise Policy Integrity

Users MUST NOT be able to override enforced enterprise security policy through renderer state or local UI preferences.

Managed controls SHOULD be enforced in an appropriate privileged layer.

The UI SHOULD indicate when a setting is managed.

Configuration files MUST NOT become an unvalidated arbitrary code-execution surface.

---

## 2.73 Proxy and Restricted Network Support

Enterprise applications SHOULD account for:

- authenticated proxies;
- TLS interception;
- restricted egress;
- custom certificate authorities;
- PAC files;
- offline networks; and
- allowlisted update endpoints.

The application MUST NOT disable TLS verification to accommodate enterprise networking.

Custom trust requirements MUST follow approved platform certificate mechanisms.

---

## 2.74 Offline Enterprise Deployment

Where required, enterprise packages SHOULD support installation without public internet access.

Offline installation MUST NOT bypass signature verification.

Offline update procedures SHOULD preserve artifact integrity and provenance.

---

## 2.75 Installation Scope

Applications MUST explicitly support their intended installation scope.

Possible scopes include:

- per user;
- per machine;
- managed machine deployment.

Privilege elevation MUST be requested only where required.

An application SHOULD NOT require administrator privileges for ordinary runtime behaviour unless its function inherently requires them.

---

## 2.76 Installer Behaviour

Installers MUST:

- clearly identify the publisher;
- install only required files;
- avoid unrelated software;
- avoid hidden browser or shell modifications;
- preserve user data during normal upgrades;
- handle repair or reinstall predictably; and
- uninstall cleanly.

Installers MUST NOT silently weaken operating-system security configuration.

---

## 2.77 Uninstallation

Uninstall behaviour MUST be defined.

Teams SHOULD distinguish:

- application binaries;
- caches;
- logs;
- settings;
- credentials;
- user-created data; and
- managed enterprise configuration.

Uninstallers MUST NOT delete user-created documents by default.

Applications MAY offer explicit removal of application data where appropriate.

---

## 2.78 Telemetry

Desktop telemetry MUST follow Privacy & Data Governance requirements.

Telemetry MUST be minimised to what is required for product, reliability, or security purposes.

Telemetry SHOULD distinguish:

- application health;
- usage analytics;
- experiment exposure;
- crash data;
- performance telemetry; and
- security events.

Consent and opt-out behaviour MUST match the governing policy.

---

## 2.79 Desktop Analytics

Analytics events MUST account for desktop lifecycle behaviour.

Teams SHOULD consider:

- long-running sessions;
- app resume;
- multiple windows;
- offline buffering;
- clock drift;
- delayed upload;
- multiple devices;
- version skew; and
- background execution.

Application startup MUST NOT emit duplicate “new session” events merely because renderer processes restart.

---

## 2.80 Accessibility of Updates and Native UI

Update dialogs, authentication windows, native menus, error dialogs, and recovery flows MUST meet applicable accessibility requirements.

Critical functionality MUST remain keyboard accessible.

Native text scaling and display scaling SHOULD be respected.

The application MUST NOT render unusably at common operating-system scaling factors.

---

## 2.81 High-DPI and Multi-Display Behaviour

Desktop applications MUST handle high-DPI displays and multiple monitors.

UI layout MUST NOT assume 100% scaling.

Window positioning SHOULD account for displays with different scaling factors.

Moving a window between displays MUST NOT cause unusable sizing or persistent rendering corruption.

---

## 2.82 Theme Integration

Applications SHOULD integrate with operating-system light/dark preference where the product supports both themes.

Theme state MUST follow canonical Design Tokens.

System theme changes SHOULD update predictably without requiring full application restart where practical.

High-contrast and accessibility modes MUST receive separate consideration from ordinary dark mode.

---

## 2.83 Notifications

Native notifications MUST follow user expectations and operating-system permission rules.

Notifications SHOULD:

- be relevant;
- be actionable where useful;
- identify the application;
- avoid unnecessary sensitive content;
- deep-link safely; and
- respect user preferences.

Notification actions MUST be treated as untrusted external inputs when routed back into privileged application logic.

---

## 2.84 Authentication Windows

Authentication flows SHOULD use secure browser or platform-standard patterns appropriate to the identity provider.

Embedded authentication MUST NOT weaken provider security requirements.

OAuth or equivalent redirect handling MUST validate:

- state;
- redirect targets;
- protocol handlers;
- tokens; and
- origin assumptions.

Credentials MUST NOT be exposed to renderer logs or analytics.

---

## 2.85 Developer Tools

Developer tools MUST NOT be unintentionally exposed in production.

If production developer tools are available for support reasons, access SHOULD be deliberate and documented.

Developer tools MUST NOT create a path to unrestricted privileged APIs.

Debug builds and production builds SHOULD be clearly distinguishable.

---

## 2.86 Production Debug Interfaces

Debug IPC, debug ports, local HTTP servers, test menus, and internal control interfaces MUST be disabled in production unless explicitly required and secured.

A localhost listener MUST NOT be assumed safe merely because it binds to loopback.

Any local service MUST have authentication or capability controls appropriate to its threat model.

---

## 2.87 Release Gates

Production desktop releases MUST pass applicable release gates.

These SHOULD include:

- type checking;
- linting;
- unit tests;
- integration tests;
- IPC contract tests;
- accessibility checks;
- security scanning;
- dependency scanning;
- packaging tests;
- installer tests;
- signing verification;
- notarisation verification;
- update tests;
- migration tests;
- startup tests;
- smoke tests; and
- release-channel validation.

A build MUST NOT be considered releasable solely because the web renderer passes its web CI pipeline.

---

## 2.88 Platform Testing

Supported desktop platforms MUST receive platform-specific testing.

Teams SHOULD test:

- supported operating-system versions;
- supported architectures;
- installer behaviour;
- update behaviour;
- file dialogs;
- protocol handlers;
- menus;
- shortcuts;
- window lifecycle;
- display scaling;
- permission prompts; and
- enterprise configuration.

Cross-platform frameworks MUST NOT be assumed to eliminate platform-specific behaviour.

---

## 2.89 Version Skew

Desktop clients MUST be designed for realistic version skew.

The system MUST consider clients that:

- update immediately;
- defer updates;
- remain offline;
- are pinned by enterprise policy; or
- skip multiple releases.

Backend compatibility windows SHOULD be explicit.

Unsupported client versions SHOULD fail clearly rather than unpredictably.

---

## 2.90 End-of-Life Policy

Desktop releases SHOULD have an explicit support policy.

The policy MAY define:

- minimum supported version;
- supported operating systems;
- supported architectures;
- deprecation period;
- mandatory update conditions; and
- security-support expectations.

End-of-life behaviour MUST be communicated before access is removed where practical.

---

# 3. Anti-patterns

## 3.1 Node Integration Everywhere

**Anti-pattern:**

Giving ordinary renderer code unrestricted Node.js access.

This collapses the privilege boundary and MUST NOT be the default architecture.

---

## 3.2 Generic IPC Bridge

**Anti-pattern:**

> `window.desktop.invoke(channel, ...args)`

with arbitrary renderer-controlled channels.

Privileged interfaces MUST be capability-specific.

---

## 3.3 Trusting the Renderer

**Anti-pattern:**

Assuming renderer input is safe because the renderer was shipped with the application.

Renderer input MUST be validated at privileged boundaries.

---

## 3.4 Remote Privileged Content

Remote web content MUST NOT inherit filesystem, shell, or privileged IPC access.

---

## 3.5 Disabling Web Security

Disabling browser security controls to work around development problems MUST NOT be used in production.

---

## 3.6 Arbitrary Shell Commands

Renderer input MUST NOT be concatenated into shell commands.

---

## 3.7 Arbitrary Filesystem Access

A renderer MUST NOT receive generic unrestricted read/write access to the user's filesystem.

---

## 3.8 Secrets in the Renderer Bundle

A secret embedded in distributed JavaScript MUST be assumed extractable.

Desktop packaging MUST NOT be treated as secret protection.

---

## 3.9 Clipboard Surveillance

The application MUST NOT continuously scrape clipboard contents for analytics or convenience without explicit, justified functionality.

---

## 3.10 Hidden Background Execution

An application SHOULD NOT continue substantial background activity after users believe it has exited.

---

## 3.11 Window State Without Bounds Validation

Persisted coordinates MUST NOT be blindly restored when display topology has changed.

---

## 3.12 Infinite Renderer Proliferation

Applications MUST NOT create renderer processes without explicit lifecycle management.

---

## 3.13 Polling While Idle

Hidden or idle windows MUST NOT consume material CPU through unnecessary polling loops.

---

## 3.14 Unbounded Logs and Caches

Logs, crash data, update payloads, and caches MUST NOT grow indefinitely.

---

## 3.15 Updating Everyone at Once

High-impact desktop releases SHOULD NOT be pushed immediately to the full population where phased rollout is available.

---

## 3.16 Unsigned Production Releases

Unsigned or unverifiable artifacts MUST NOT be distributed as ordinary production releases on platforms where signing is expected.

---

## 3.17 Manual Release Signing

Routine production releases SHOULD NOT depend on undocumented manual developer signing procedures.

---

## 3.18 Auto-Update Without Verification

An updater MUST NOT execute binaries solely because they were downloaded from an expected URL.

Publisher authenticity and artifact integrity MUST be verified.

---

## 3.19 Irreversible Migration Before Rollout Confidence

A phased binary rollout SHOULD NOT immediately perform destructive, irreversible local data migration without rollback planning.

---

## 3.20 Mandatory Restart for Routine Updates

Users SHOULD NOT be interrupted immediately for ordinary non-critical updates.

---

## 3.21 Permanent Experiment Flags

Temporary release or experiment flags MUST NOT become indefinite architecture without explicit ownership.

---

## 3.22 Using Feature Flags as Authorization

A client-side flag MUST NOT be treated as an access-control boundary.

---

## 3.23 Platform-Blind UI

Desktop applications MUST NOT assume that Windows, macOS, and Linux users expect identical menus, shortcuts, close behaviour, or installation semantics.

---

## 3.24 Recreating Native Conventions Unnecessarily

Teams SHOULD NOT build bespoke file pickers, clipboard behaviours, or platform dialogs where approved native primitives provide a better and safer experience.

---

## 3.25 Web Accessibility Only

Passing browser-focused accessibility checks MUST NOT be considered sufficient if native menus, dialogs, window controls, or desktop-specific flows remain inaccessible.

---

## 3.26 Ignoring Enterprise Constraints

A desktop application intended for enterprise use MUST NOT assume:

- direct internet access;
- automatic updates;
- consumer install permissions;
- unrestricted telemetry; or
- administrator rights.

---

## 3.27 Disabling TLS Verification for Corporate Proxies

TLS verification MUST NOT be disabled to make enterprise proxy environments work.

---

## 3.28 Destructive Uninstall

Uninstalling the application MUST NOT silently delete user-created documents.

---

## 3.29 Crash Reporting With Sensitive Payloads

Crash reporting MUST NOT indiscriminately upload memory, user documents, credentials, or clipboard content.

---

## 3.30 Treating Desktop as a Packaging Step

Desktop concerns MUST NOT be deferred until after the web application is “finished.”

Process architecture, security, lifecycle, updates, native behaviour, deployment, and observability are part of the product architecture.

---

# 4. Checklist

## 4.1 Architecture

The team MUST confirm:

- [ ] Main, renderer, preload, and utility-process responsibilities are defined.
- [ ] Privileged operations are isolated.
- [ ] Node integration is disabled in ordinary renderers unless explicitly required.
- [ ] Context isolation is enabled.
- [ ] Sandboxing is enabled where compatible.
- [ ] Preload APIs are narrow and capability-specific.
- [ ] Raw privileged IPC is not exposed to renderers.
- [ ] Remote content is isolated.
- [ ] Navigation is controlled.
- [ ] External links are validated.
- [ ] Deep links are treated as untrusted input.

---

## 4.2 Security

The team MUST confirm:

- [ ] IPC inputs are schema validated.
- [ ] IPC sender assumptions are validated.
- [ ] Renderer compromise does not automatically grant full OS access.
- [ ] Filesystem access follows least privilege.
- [ ] Paths are validated.
- [ ] Shell execution avoids interpolation.
- [ ] Secrets are not embedded in renderer bundles.
- [ ] Credentials use protected storage where appropriate.
- [ ] Debug interfaces are disabled or secured.
- [ ] Production developer tooling does not bypass security.
- [ ] Dependencies and runtime versions are within support expectations.

---

## 4.3 Filesystem and Clipboard

The team MUST confirm:

- [ ] File reads and writes are product-justified.
- [ ] User-selected paths use native dialogs where appropriate.
- [ ] Imported content is validated.
- [ ] Archive extraction is safe.
- [ ] Temporary files are managed securely.
- [ ] Sensitive files use appropriate permissions.
- [ ] Clipboard reads are user-driven where practical.
- [ ] Clipboard data is not logged.
- [ ] Clipboard operations provide accessible feedback.

---

## 4.4 Windows and Native Behaviour

The team MUST confirm:

- [ ] Window roles are explicit.
- [ ] Multi-window state semantics are defined.
- [ ] Window state is persisted safely.
- [ ] Off-screen restoration is prevented.
- [ ] Close behaviour matches platform expectations.
- [ ] Single-instance behaviour is intentionally defined.
- [ ] Unsaved-work handling exists.
- [ ] Native menus follow platform conventions.
- [ ] Standard shortcuts are preserved.
- [ ] Global shortcuts are justified and cleaned up.
- [ ] High-DPI and multi-display behaviour is tested.

---

## 4.5 UI Standards

The team MUST confirm:

- [ ] shadcn/ui is used as the component baseline.
- [ ] Canonical components are reused before bespoke controls are introduced.
- [ ] Design Tokens are used.
- [ ] Canonical Patterns are followed.
- [ ] Keyboard navigation works.
- [ ] Focus behaviour is correct.
- [ ] Screen-reader semantics are valid.
- [ ] Native dialogs and custom dialogs are accessible.
- [ ] System scaling is supported.
- [ ] Theme behaviour follows token and accessibility standards.

---

## 4.6 State, Data, and APIs

The team MUST confirm:

- [ ] Main-process and renderer state ownership are explicit.
- [ ] Shared state has a source of truth.
- [ ] Local database schema is versioned.
- [ ] Database migrations are tested.
- [ ] Migration failure has a recovery path.
- [ ] Offline behaviour is defined.
- [ ] Conflict handling is defined where applicable.
- [ ] API version skew is supported.
- [ ] Old desktop versions remain compatible for the documented support window.
- [ ] Forms and privileged inputs are validated.

---

## 4.7 Performance and Resources

The team MUST confirm:

- [ ] Startup time is measured.
- [ ] Idle CPU is acceptable.
- [ ] Active CPU is measured for critical workflows.
- [ ] Idle memory is measured.
- [ ] Long-session memory growth is tested.
- [ ] Per-window memory cost is understood.
- [ ] Closed windows release resources.
- [ ] Renderer count is intentional.
- [ ] Cache growth is bounded.
- [ ] Logs are bounded.
- [ ] Temporary and update files are cleaned up.

---

## 4.8 Crash and Diagnostics

The team MUST confirm:

- [ ] Main-process crashes are observable.
- [ ] Renderer crashes are observable.
- [ ] Native crashes are captured where applicable.
- [ ] Crash payloads exclude sensitive content.
- [ ] Crash context includes release version and channel.
- [ ] Renderer crash recovery is defined.
- [ ] Startup crash loops are handled.
- [ ] Safe mode is considered where appropriate.
- [ ] Log retention is bounded.
- [ ] Diagnostic exports do not expose secrets.

---

## 4.9 Signing and Release

The team MUST confirm:

- [ ] Production artifacts are signed.
- [ ] Signing keys are secured.
- [ ] Signing identity is consistent.
- [ ] macOS notarisation passes where required.
- [ ] Windows publisher signing passes where applicable.
- [ ] Linux package integrity strategy is defined.
- [ ] Release artifacts are traceable to source.
- [ ] Version metadata is present.
- [ ] Release channel is explicit.
- [ ] Update artifacts are authenticated.
- [ ] Update integrity is verified.

---

## 4.10 Auto-Update

The team MUST confirm:

- [ ] Stable, beta, and other channels are isolated.
- [ ] Phased rollout is available where required.
- [ ] Rollout health metrics exist.
- [ ] Rollback strategy exists.
- [ ] Data migrations do not make rollback unsafe without explicit planning.
- [ ] Update failures are observable.
- [ ] Non-critical updates preserve user control.
- [ ] Unsaved work survives update restart.
- [ ] Mandatory updates are reserved for justified cases.

---

## 4.11 Enterprise Deployment

The team MUST confirm:

- [ ] Supported installer formats are documented.
- [ ] Silent install is supported where required.
- [ ] Silent uninstall is supported where required.
- [ ] Installation scope is defined.
- [ ] MDM or managed deployment is supported where required.
- [ ] Managed configuration precedence is defined.
- [ ] Enterprise users cannot bypass enforced policy.
- [ ] Proxy environments are supported.
- [ ] Custom enterprise trust stores are handled through approved mechanisms.
- [ ] Offline installation is supported where required.
- [ ] Enterprise-controlled update policy is supported where required.
- [ ] Telemetry policy can comply with organisational governance.

---

## 4.12 Before Release

The team MUST confirm:

- [ ] Type checks pass.
- [ ] Linting passes.
- [ ] Unit tests pass.
- [ ] Integration tests pass.
- [ ] IPC contract tests pass.
- [ ] Accessibility checks pass.
- [ ] Security scans pass.
- [ ] Dependency scans pass.
- [ ] Installer tests pass.
- [ ] Signing verification passes.
- [ ] Notarisation verification passes where applicable.
- [ ] Update testing passes.
- [ ] Local migration testing passes.
- [ ] Platform-specific smoke tests pass.
- [ ] Crash reporting identifies the release correctly.
- [ ] Rollback or forward-fix procedure is ready.

---

# 5. Canonical Summary

Desktop applications introduce operating-system privilege and lifecycle responsibilities that ordinary browser applications do not possess.

The architecture MUST therefore preserve strict process and privilege boundaries.

Renderer processes MUST be treated as untrusted relative to native operating-system capabilities.

Privileged operations MUST live behind narrow, validated, capability-specific APIs.

Preload scripts MUST expose the minimum possible surface.

Raw filesystem, shell, process, environment, and IPC access MUST NOT be exposed to ordinary renderers.

Filesystem and clipboard access MUST follow least privilege.

User-controlled paths, URLs, deep links, file content, IPC messages, and process arguments MUST be treated as untrusted input.

Native menus, shortcuts, window lifecycle, multi-window behaviour, system theme, display scaling, and close behaviour SHOULD respect platform conventions.

Desktop applications MUST explicitly define ownership of:

- renderer state;
- shared application state;
- privileged process state;
- local persisted state; and
- server state.

Local databases MUST have versioned, tested, recoverable migrations.

Desktop APIs MUST tolerate realistic client/server version skew.

Resource usage MUST be treated as a product-quality concern.

Applications SHOULD define and observe budgets for:

- startup time;
- memory;
- CPU;
- renderer count;
- disk usage;
- cache growth;
- installer size; and
- update size.

Idle applications SHOULD consume negligible sustained CPU.

Closed windows MUST release resources.

Crash reporting SHOULD cover main, renderer, and native failures while respecting privacy and data-governance requirements.

Production artifacts MUST be signed using protected publisher credentials.

macOS notarisation and other platform trust requirements MUST be satisfied where applicable.

Auto-update MUST use authenticated, integrity-verified artifacts.

Production rollout SHOULD use controlled release channels and phased deployment.

Rollback and forward-fix strategies MUST account for local schema migrations and version skew.

Enterprise deployment MUST support the realities of managed endpoints, including silent installation, policy enforcement, restricted networks, proxies, controlled updates, and offline environments where required.

Desktop functionality MUST remain aligned with Security, Data & Database, API, State Management, Forms & Validation, Accessibility, Design Tokens, Component, Pattern, Release & Versioning, and Privacy & Data Governance standards.

**shadcn/ui remains the component baseline.**

Desktop packaging MUST NOT be used to justify weaker web security, validation, accessibility, component, or data-governance practices.

The Gold Standard is:

> **Keep privilege out of the renderer. Make IPC a real security boundary. Grant filesystem, clipboard, and native capabilities narrowly. Respect platform conventions. Treat window and process lifecycle as product architecture. Budget memory, CPU, startup, and disk deliberately. Sign every production artifact. Verify every update. Roll out progressively. Preserve rollback and data compatibility. Support enterprise management explicitly. Build the desktop client as a secure native application, not as a web app with unrestricted operating-system access.**

**Canonical placement:**  
**Framework → Desktop → Security → Release & Versioning**
