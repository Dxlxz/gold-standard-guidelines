---
id: "extension"
title: "Browser Extension"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "extension", "browser"]
applies_to: ["client"]
related: []
legacy_number: 97
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 56808
provenance: baseline

---

Below is the canonical **Gold Standard 2026** version. It treats Manifest V3 as the modern baseline while explicitly accounting for 2026 runtime differences between Chromium, Firefox, and Safari rather than assuming identical background execution semantics. citeturn783431search0turn479697search4

# Browser Extension Guidelines — Gold Standard 2026

**Canonical placement:** Framework → Extensions → Security → Browser & Compatibility  
**Status:** Gold Standard 2026  
**Component baseline:** shadcn/ui  
**Normative terms:** **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements. “May” denotes an explicitly optional practice.

---

# 1. Purpose

## 1.1 Objective

Browser extensions execute with capabilities that ordinary web applications do not possess. Depending on granted permissions, an extension may observe or modify pages, inspect navigation, access browser APIs, intercept requests, persist browser state, communicate with native applications, or operate across many origins.

This standard defines how browser extensions MUST be designed, implemented, reviewed, distributed, updated, and maintained so that this elevated trust is constrained and auditable.

The objectives are to ensure that extensions:

- request only the capabilities required for their current functionality;
- minimize access to websites and browsing data;
- preserve clear security boundaries between extension code and hostile or untrusted host pages;
- use safe message-passing protocols;
- tolerate non-persistent background execution;
- remain compatible across supported browsers;
- comply with extension-store review requirements;
- disclose data collection and transmission accurately;
- handle updates and state migrations safely;
- inject scripts, markup, and styles without creating code-execution vulnerabilities;
- avoid damaging or impersonating host-page design;
- remain accessible;
- use established design-system primitives for extension-owned interfaces; and
- comply with Security, Data & Database, API, State Management, Forms & Validation, Accessibility, Design Tokens, Component, Pattern, Observability, and Documentation standards.

Browser extensions MUST be treated as **privileged client software**, not as ordinary web front ends.

---

## 1.2 Scope

This standard applies to:

- Chromium extensions;
- Google Chrome extensions;
- Microsoft Edge extensions;
- Firefox WebExtensions;
- Safari Web Extensions;
- extension popups;
- side panels;
- options/settings pages;
- extension-owned tabs;
- content scripts;
- page-injected scripts;
- extension service workers;
- background scripts and event pages;
- declarative network rules;
- native-messaging integration;
- extension storage;
- extension update and migration logic;
- web-accessible extension resources; and
- browser-store distribution.

Enterprise-only extensions remain subject to this standard unless an explicit enterprise governance standard imposes stronger requirements.

---

## 1.3 Platform baseline

New extensions MUST target **Manifest V3 or the browser's corresponding current WebExtension model** unless a documented platform constraint prevents it.

Chromium-based browsers use extension service workers for Manifest V3 background execution. Firefox Manifest V3 currently retains non-persistent background document/script execution rather than supporting `background.service_worker`, while Safari supports both models. Cross-browser extensions MUST therefore model background execution as **ephemeral** and MUST NOT depend on one browser's runtime implementation. citeturn404660search1turn783431search0

Teams MAY generate browser-specific manifests from a common source manifest.

Browser-specific packaging MUST NOT create materially different security or privacy behavior without explicit review and disclosure.

---

# 2. Rules

## 2.1 Manifest ownership

Every extension MUST have an explicit owner for its manifest and privileged capabilities.

The manifest MUST be treated as security-sensitive configuration.

Changes to any of the following MUST receive appropriate review:

- API permissions;
- host permissions;
- optional permissions;
- content-script match patterns;
- web-accessible resources;
- externally connectable origins;
- background execution;
- content security policy;
- native messaging;
- declarative network rules;
- browser overrides;
- incognito/private browsing behavior; and
- minimum supported browser versions.

Manifest changes MUST NOT be merged as incidental configuration changes where they materially expand extension capability.

---

## 2.2 Permission minimization

An extension MUST request the narrowest permissions capable of implementing its currently shipped functionality.

Permissions MUST NOT be requested:

- for speculative future functionality;
- merely because a framework or library supports them;
- to simplify implementation when a less-privileged design is practical;
- because comparable extensions request them;
- as a substitute for precise host targeting; or
- to avoid designing an explicit user-consent flow.

Chrome Web Store and Microsoft Edge policies explicitly require minimum necessary permissions, and WebExtension guidance similarly recommends avoiding unnecessary privileges. citeturn404660search2turn479697search0turn783431search5

Every non-trivial permission SHOULD have a documented justification describing:

1. the user-facing feature requiring it;
2. when the capability is exercised;
3. what data becomes accessible;
4. whether a narrower permission was considered; and
5. why optional or per-site access is insufficient, if applicable.

---

## 2.3 Required versus optional permissions

A permission MUST be required at installation only when the extension's primary advertised functionality cannot reasonably operate without it.

Optional features SHOULD use:

- `optional_permissions`;
- `optional_host_permissions`; or
- an equivalent browser-specific runtime permission mechanism.

Permission requests SHOULD occur immediately before the user initiates functionality requiring that permission.

The extension SHOULD explain why access is needed before triggering the browser permission prompt.

The extension MUST handle:

- permission refusal;
- later permission revocation;
- partial host access;
- browser-managed site-access restrictions; and
- permission state changes during an active session.

The extension MUST NOT treat denied optional access as an exceptional application failure.

Chrome, Firefox, and Safari all provide mechanisms intended to reduce initial privilege and permit narrower user-controlled access. citeturn404660search0turn946464search8turn176978search1

---

## 2.4 Host permission strategy

Host access MUST be minimized independently from API permissions.

The preferred order is:

1. no host permission;
2. temporary user-initiated `activeTab` access;
3. one explicit origin;
4. a narrowly defined group of required origins;
5. optional host permissions requested when required;
6. broad wildcard access only where the extension's core purpose inherently requires it.

`<all_urls>` or equivalent unrestricted web access MUST NOT be the default.

An extension using `<all_urls>` MUST document why narrower site access cannot deliver the advertised functionality.

Safari explicitly recommends prioritizing `activeTab`, host-specific permissions, and optional permissions, using `<all_urls>` only when narrower access is unsuitable. Chrome likewise recommends `activeTab` and optional permissions to reduce permission warnings and persistent access. citeturn176978search1turn404660search9

---

## 2.5 Content-script matches

Content scripts MUST be injected only into pages where the extension requires page access.

`content_scripts.matches` MUST NOT be broader than the functionality requires.

Teams SHOULD additionally use:

- `exclude_matches`;
- explicit frame targeting;
- runtime conditions; and
- programmatic injection

where these mechanisms materially reduce unnecessary execution.

Content scripts MUST NOT execute in every frame unless frame-level behavior is required.

Code that only needs the top-level document SHOULD explicitly avoid unnecessary iframe execution.

---

## 2.6 Permission expansion

An update that materially increases permissions MUST be treated as a product and security change, not merely a technical release.

Before expanding permissions, teams MUST verify:

- the feature requiring the expansion;
- the narrowest viable permission;
- browser warning behavior;
- store-review implications;
- privacy-policy implications;
- onboarding implications;
- behavior for existing users who decline access; and
- whether the extension remains useful without the new permission.

An extension MUST NOT bundle unrelated permission expansion into a routine bug-fix release.

---

## 2.7 Content-script security boundary

Content scripts MUST treat the host page as untrusted.

This remains true even when content scripts execute in an isolated world.

Chrome executes content scripts in an isolated environment by default, but those scripts still interact with a DOM controlled by the host page. Chrome's own security guidance explicitly notes that hostile pages can manipulate DOM structures relied upon by extension code. citeturn799179search2turn799179search4

Extension logic MUST assume that host pages may intentionally manipulate:

- DOM structure;
- attributes;
- hidden fields;
- dataset values;
- URLs;
- text content;
- form values;
- event ordering;
- mutation timing;
- iframe structure; and
- objects made available to page execution contexts.

DOM-derived input MUST therefore be treated as untrusted input.

---

## 2.8 Isolated execution

Content scripts SHOULD execute in the browser's isolated extension world by default.

Execution in the host page's main JavaScript world MUST be used only when functionality genuinely requires direct interaction with page-owned JavaScript state.

Chrome's scripting API defaults to the isolated execution world and explicitly warns that code executing in `MAIN` shares an environment with host-page JavaScript. citeturn799179search0turn799179search2

Code executing in the main world MUST:

- be minimal;
- expose no privileged browser APIs;
- contain no secrets;
- accept only validated messages;
- avoid extension-internal state where possible; and
- communicate with privileged extension code through a deliberately constrained bridge.

Privileged operations MUST remain outside the page's main execution world.

---

## 2.9 Page-to-extension bridge

Where a main-world bridge is necessary, it MUST be treated as an untrusted protocol boundary.

The bridge MUST NOT expose generic primitives such as:

- `execute`;
- `eval`;
- `fetch arbitrary URL`;
- `read arbitrary storage`;
- `call API`;
- unrestricted property access; or
- generic method invocation.

Messages SHOULD instead represent explicit domain operations, for example:

`GET_CURRENT_DOCUMENT_CONTEXT`

rather than:

`CALL_FUNCTION("getContext", args)`.

The privileged extension side MUST independently determine whether the requested operation is permitted.

---

## 2.10 Extension messaging

All extension messaging MUST use defined message contracts.

Messages MUST have:

- a known message type;
- a defined schema;
- validated payload fields;
- explicit success/error semantics; and
- bounded data size where appropriate.

Privileged receivers MUST validate messages before acting on them.

A content script MUST NOT gain authority merely because the message originated through an extension messaging API.

The underlying page can influence content-script input.

---

## 2.11 Message sender validation

Receivers MUST validate sender identity and context whenever authority depends on who sent the message.

Depending on the channel, validation MAY include:

- extension ID;
- sender URL;
- origin;
- tab ID;
- frame ID;
- document ID; and
- expected extension context.

Cross-extension or website-to-extension messaging MUST use explicit allowlists.

Chrome's external messaging guidance demonstrates validating the requesting extension and constraining website origins through `externally_connectable`. citeturn799179search1

Wildcard external connectivity MUST NOT be used unless the extension intentionally provides a public interface and that interface has received security review.

---

## 2.12 Message authorization

Message validation and message authorization are separate concerns.

A correctly formatted message MUST NOT automatically be permitted to perform a privileged action.

The receiver MUST determine:

1. whether the sender is trusted for that operation;
2. whether required user permission currently exists;
3. whether the requested host is authorized;
4. whether the requested resource is within scope; and
5. whether the action remains valid in the current extension state.

---

## 2.13 Background execution model

Background logic MUST be designed as event-driven and restartable.

It MUST NOT assume:

- permanent process lifetime;
- permanent global variables;
- long-lived timers;
- uninterrupted network connections;
- that initialization happened earlier in the session; or
- that two related events execute in the same worker lifetime.

Chrome explicitly unloads extension service workers when dormant and recommends persisting state instead of relying on globals. Manifest V3 Firefox background execution is likewise non-persistent. citeturn404660search7turn783431search4

---

## 2.14 Durable state

State required across background-runtime suspension MUST be persisted through an appropriate storage mechanism.

In-memory state MAY be used as a cache but MUST NOT be the sole source of truth for durable workflow state.

Persistent state SHOULD distinguish:

- durable configuration;
- session state;
- cached derived state;
- synchronization metadata;
- migration version; and
- transient work.

Extension state management MUST comply with the canonical **State Management** standard.

---

## 2.15 Event handlers

Background event handlers SHOULD be:

- idempotent;
- independently executable;
- tolerant of duplicate events;
- tolerant of process restart;
- bounded in duration;
- explicit about retries; and
- safe when resumed from persisted state.

Event listener registration MUST occur reliably whenever the background runtime starts.

Critical listener registration MUST NOT depend on a preceding asynchronous initialization path that might cause events to be missed.

---

## 2.16 Scheduled work

Extensions MUST NOT rely on `setInterval`, long-running timers, or worker keep-alive techniques for durable scheduled work.

Browser-supported scheduling mechanisms SHOULD be used where appropriate.

Periodic work SHOULD tolerate:

- browser shutdown;
- suspended devices;
- extension updates;
- skipped execution windows; and
- duplicate invocation.

The extension MUST NOT intentionally keep a Manifest V3 service worker alive merely to emulate a persistent background page unless a documented browser API explicitly requires the connection.

---

## 2.17 Long-lived connections

Long-lived message ports, WebSockets, or native connections MAY be used when required by the extension's primary functionality.

They MUST NOT be introduced solely to defeat normal background suspension.

Reconnect behavior MUST:

- tolerate interruption;
- use bounded backoff;
- avoid request duplication;
- preserve authentication boundaries; and
- re-establish state from authoritative storage where necessary.

---

## 2.18 Cross-browser background compatibility

Cross-browser implementations MUST NOT assume Chromium's background environment is universal.

As of the 2026 baseline:

- Chromium Manifest V3 uses `background.service_worker`;
- Firefox supports Manifest V3 but does not currently support `background.service_worker`;
- Safari supports background scripts and service workers.

A cross-browser build MAY provide both service-worker and background-script declarations where browser behavior supports that compatibility strategy. citeturn783431search0

Browser-specific execution differences MUST be covered by automated compatibility tests.

---

## 2.19 Injection safety

Extension code MUST NOT evaluate untrusted code.

The following MUST NOT be used with untrusted or remotely supplied input:

- `eval`;
- `new Function`;
- string-based script construction;
- string-based event handlers;
- dynamically constructed executable JavaScript;
- remotely supplied code interpreted as commands; or
- equivalent runtime code-generation mechanisms.

Manifest V3 Chrome Web Store policy requires extension functionality to remain discernible from submitted code and generally prohibits remotely hosted executable logic outside explicitly permitted APIs. Edge Manifest V3 similarly does not permit remotely hosted executable code. citeturn404660search5turn479697search1

---

## 2.20 Remote configuration versus remote code

Remote configuration MAY control predefined behavior already implemented inside the extension.

Remote configuration MUST NOT become an interpreter for remotely supplied logic.

Permitted remote configuration MAY include:

- feature enablement;
- numeric thresholds;
- endpoint selection from an approved set;
- experiment assignment;
- static content;
- rule identifiers; and
- presentation configuration within constrained schemas.

It MUST NOT include executable source code or a command language capable of materially redefining extension behavior.

---

## 2.21 DOM injection

Untrusted text MUST be inserted through safe DOM APIs such as:

- `textContent`;
- `createTextNode`;
- explicit element construction; or
- an approved sanitization boundary where HTML is genuinely required.

Untrusted input MUST NOT be assigned directly to `innerHTML`, `outerHTML`, or equivalent executable markup sinks.

Host-provided URLs MUST be validated before insertion into:

- links;
- image sources;
- navigation operations;
- fetch requests; or
- extension API calls.

Extension-generated HTML MUST follow the same XSS prevention requirements as canonical web applications.

---

## 2.22 Host DOM queries

DOM selectors MUST NOT be treated as stable security boundaries.

A host page can change its markup at any time.

Where product behavior depends on third-party DOM structures, the extension SHOULD:

- fail safely;
- isolate site-specific adapters;
- verify expected structure;
- tolerate missing elements;
- avoid destructive mutation; and
- include compatibility monitoring.

A failed selector MUST NOT cause the extension to act on an unrelated nearby element.

---

## 2.23 Web-accessible resources

Extension resources MUST NOT be exposed to web pages unless page access is necessary.

Web-accessible resource declarations SHOULD use the narrowest supported host patterns.

Resources MUST NOT contain:

- secrets;
- privileged configuration;
- internal authentication material;
- sensitive user information; or
- data that becomes security-sensitive when its extension URL is known.

Exposure of a static resource MUST NOT be mistaken for authorization to extension functionality.

---

## 2.24 Network modification

Request blocking or modification SHOULD use browser-supported declarative APIs where those APIs meet the requirement.

Imperative interception MUST NOT be used merely because it is more familiar.

Rules MUST be:

- attributable to a product feature;
- narrowly scoped;
- deterministic;
- testable; and
- compatible with supported browsers.

Remote rule updates MUST comply with store policy and MUST NOT become a mechanism for delivering remote executable logic.

Safari, Chromium, and other modern WebExtension implementations support declarative network-request mechanisms for applicable use cases. citeturn946464search3

---

## 2.25 API communication

Extension-to-server communication MUST comply with the canonical **API** and **Security** standards.

Requests MUST:

- use secure transport;
- authenticate through approved mechanisms;
- avoid exposing long-lived credentials to host pages;
- validate server responses;
- handle unavailable networks;
- implement bounded retry behavior; and
- distinguish authentication, authorization, validation, rate-limit, and server failures.

Extension code MUST NOT assume that requests succeed merely because host permissions allow the request.

---

## 2.26 Authentication

Authentication credentials MUST NOT be exposed to content scripts unless absolutely required by the authentication architecture.

High-value credentials SHOULD remain in the least exposed extension context available.

Credentials MUST NOT be:

- inserted into the host DOM;
- sent through `window.postMessage`;
- stored in page-visible variables;
- written into logs;
- embedded into extension source; or
- included in remotely accessible resource URLs.

Tokens SHOULD be short-lived and narrowly scoped where the service supports such a model.

---

## 2.27 Extension storage

Extension storage MUST be classified according to the canonical **Data & Database** standard.

Developers MUST understand whether the chosen storage mechanism is:

- local;
- synchronized;
- session-only;
- browser-managed;
- user-clearable; or
- accessible from content-script contexts.

Sensitive data MUST NOT be placed into synchronized storage merely for convenience.

The extension MUST NOT assume extension storage constitutes secure encrypted secret storage unless the browser explicitly provides the required security guarantee for the supported environment.

---

## 2.28 Data minimization

Extensions MUST collect and retain only data required for the extension's disclosed functionality.

Browsing data is particularly sensitive because broad host access can reveal information unrelated to the feature the user is actively using.

Collection SHOULD therefore be limited by:

- origin;
- event;
- user action;
- field;
- retention period; and
- purpose.

Chrome Web Store policy limits extension data use to the extension's disclosed purpose and restricts collection or use of browsing activity except where needed for a prominently disclosed user-facing feature. citeturn404660search2turn404660search13

---

## 2.29 Privacy disclosure

An extension that collects, processes, stores, or transmits user data MUST provide accurate disclosures required by the applicable stores and privacy standards.

Disclosures MUST describe:

- what data is collected;
- why it is collected;
- whether it leaves the browser;
- recipients or processors;
- retention where applicable;
- user controls; and
- deletion mechanisms where required.

Privacy documentation MUST match actual runtime behavior.

Store metadata, privacy forms, product UI, and privacy-policy statements MUST NOT contradict one another.

Chrome requires accurate disclosure of collection, use, and sharing; Edge likewise requires privacy declarations during publication. Firefox has its own data-collection and consent requirements. citeturn404660search3turn479697search1turn245281search0

---

## 2.30 Telemetry and analytics

Extension telemetry MUST follow normal analytics consent and privacy requirements.

Telemetry MUST NOT silently expand into browsing-history collection.

Analytics SHOULD record extension behavior rather than host-page content wherever possible.

For example, prefer:

`feature_used = capture_button`

over:

`page_url = https://example.com/private-document/...`

unless the URL itself is necessary for the disclosed feature or diagnostic purpose.

Telemetry MUST NOT include:

- passwords;
- authentication tokens;
- form secrets;
- arbitrary page content;
- private browsing activity where prohibited;
- unnecessary query parameters; or
- user content unrelated to the stated purpose.

---

## 2.31 Private browsing and incognito

Extensions MUST define their behavior in private/incognito browsing intentionally.

The extension MUST NOT assume private-mode access is available.

If private browsing is supported:

- data separation MUST follow browser semantics;
- private-session data MUST NOT be improperly persisted;
- analytics and telemetry MUST respect browser and store restrictions;
- authentication boundaries MUST remain intact; and
- user expectations of private browsing MUST be preserved.

Firefox policy specifically prohibits storing data from private browsing sessions. citeturn245281search0

---

## 2.32 Native messaging

Native messaging MUST be treated as a privileged integration boundary.

Native-host access MUST use explicit extension allowlists.

Messages MUST use validated schemas.

The native application MUST independently validate:

- message type;
- argument shape;
- resource path;
- requested operation;
- extension identity where available; and
- authorization.

A browser extension MUST NOT expose an arbitrary shell, file-system, process, or command-execution interface through native messaging.

Chrome's native-messaging model explicitly associates native hosts with approved extension origins. citeturn799179search10

---

## 2.33 Store distribution

Production consumer extensions SHOULD be distributed through the supported store or signed distribution mechanism for each target browser.

The release process MUST account for:

- Chrome Web Store review;
- Microsoft Edge Add-ons certification;
- Firefox signing and review requirements;
- Safari/App Store distribution where applicable; and
- enterprise policy distribution where explicitly intended.

Firefox release and Beta extensions generally require Mozilla signing, including self-distributed extensions, while Safari Web Extensions distributed through Apple's normal consumer channel are packaged and reviewed through Apple's distribution system. citeturn245281search6turn176978search0

---

## 2.34 Store review readiness

Store review MUST be treated as a release requirement, not an administrative task after implementation.

Before submission, teams MUST verify:

- manifest correctness;
- permission justifications;
- accurate store listing;
- accurate screenshots;
- privacy disclosures;
- data-use declarations;
- remote-code compliance;
- source/build reproducibility where required;
- test credentials or reviewer instructions where required;
- functionality of all advertised features; and
- consistency between implementation and listing.

Store metadata MUST NOT overstate extension functionality.

---

## 2.35 Reviewable source

Production extension code MUST remain reviewable.

Obfuscation that prevents meaningful security review MUST NOT be used.

Build output MAY be minified where permitted, but teams MUST retain:

- readable source;
- dependency lockfiles;
- deterministic or reproducible build instructions where practical;
- source maps for internal debugging where appropriate; and
- exact release provenance.

Mozilla may require source sufficient to reproduce generated extension builds, and its current policies prohibit obfuscated code. citeturn245281search2turn245281search1

---

## 2.36 Dependency management

Dependencies bundled into an extension MUST undergo the same dependency governance as application code.

Extensions SHOULD prefer a small dependency surface because every bundled dependency executes inside a privileged software package.

Teams MUST:

- pin dependencies;
- review material upgrades;
- monitor security advisories;
- remove unused dependencies;
- review transitive code where risk warrants it; and
- ensure bundled libraries comply with store-review requirements.

Third-party scripts MUST NOT be fetched from public CDNs for privileged extension execution where store or Manifest V3 rules require packaged code.

---

## 2.37 Update lifecycle

Extension updates MUST be backward-compatible with existing persisted state unless an explicit migration is executed.

The update process MUST account for the fact that users can update from older versions rather than only the immediately preceding release.

Chrome automatically updates installed extensions and installs updates when the extension becomes sufficiently idle, so code MUST NOT depend on a synchronized user-visible cutover. citeturn404660search4

---

## 2.38 State migrations

Persistent extension state MUST have an explicit schema version when schema evolution is non-trivial.

Migrations MUST be:

- idempotent;
- versioned;
- restart-safe;
- tolerant of partially completed previous attempts;
- tested against supported upgrade paths; and
- separated from ordinary runtime logic where practical.

A migration MUST NOT assume the background process will remain alive until migration completion.

---

## 2.39 Update failure

Where migration failure would prevent normal operation, the extension MUST fail safely.

It SHOULD preserve:

- recoverable previous data;
- actionable diagnostics;
- a retry mechanism; and
- a user-facing recovery path where appropriate.

Migration code MUST NOT silently discard user data merely because its previous representation is unknown.

---

## 2.40 Permission changes during update

Updates that require additional permissions MUST account for browser-specific user approval behavior.

Functionality MUST NOT enter a crash loop when the new permission has not yet been granted.

The extension SHOULD continue to provide unaffected functionality where practical.

---

## 2.41 Feature flags

Remote feature flags MAY control functionality already contained within the reviewed extension bundle.

Flags MUST NOT be used to bypass store review by remotely activating hidden materially different functionality.

A feature hidden during review but activated remotely afterward MUST still comply with the store's disclosure and review requirements.

---

## 2.42 Kill switches

Security-sensitive extension functionality SHOULD support server-side containment where appropriate.

A kill switch MAY disable predefined high-risk behavior.

A kill switch MUST NOT download replacement executable logic.

Containment configuration SHOULD be:

- authenticated;
- integrity-protected;
- narrowly scoped;
- fail-safe; and
- observable.

---

## 2.43 Host-page interaction

An extension MUST behave as a guest within a host page.

Injected UI MUST NOT unnecessarily:

- alter site navigation;
- replace site content;
- modify unrelated forms;
- capture unrelated keyboard shortcuts;
- alter global typography;
- alter global box sizing;
- redefine generic element selectors;
- move page content;
- interfere with focus order;
- suppress host accessibility semantics; or
- impersonate native host-page controls.

The user MUST be able to distinguish extension-owned functionality from the host website where confusion would have security or product consequences.

---

## 2.44 CSS isolation

Injected extension CSS MUST be scoped.

Extensions MUST NOT inject broad rules such as:

- `button { ... }`;
- `input { ... }`;
- `* { ... }`;
- global reset styles;
- root-level design tokens; or
- host-page framework resets

unless intentionally modifying the host site is the extension's documented primary purpose.

Extension UI SHOULD use one of:

- a Shadow DOM boundary;
- a strongly namespaced root;
- narrowly scoped CSS modules; or
- an equivalent encapsulation mechanism.

The isolation strategy MUST be tested against websites using aggressive resets, high-specificity CSS, custom elements, and unusual stacking contexts.

---

## 2.45 Shadow DOM

Shadow DOM SHOULD be considered for substantial extension-owned overlays or widgets because it can reduce host-style collision.

Shadow DOM MUST NOT be treated as a security boundary.

Teams MUST still account for:

- focus behavior;
- accessible-name relationships;
- portal rendering;
- dialogs;
- popovers;
- tooltips;
- z-index;
- fonts;
- inherited properties;
- browser compatibility; and
- automated testing.

---

## 2.46 Extension-owned UI

Extension-owned surfaces include:

- popup;
- side panel;
- options page;
- extension tab;
- onboarding;
- management UI; and
- substantial extension-controlled injected interfaces.

These surfaces MUST comply with the canonical:

- Accessibility;
- Design Tokens;
- Component;
- Pattern;
- Forms & Validation; and
- State Management standards.

shadcn/ui is the canonical component baseline.

Teams SHOULD use established shadcn/ui-derived primitives for:

- buttons;
- forms;
- dialogs;
- popovers;
- menus;
- tooltips;
- tabs;
- alerts;
- tables;
- command interfaces;
- switches;
- checkboxes; and
- selection controls.

---

## 2.47 shadcn/ui inside host pages

shadcn/ui MAY be adapted for host-page injected interfaces, but the implementation MUST NOT assume application-global CSS ownership.

Extension implementations SHOULD:

- scope Tailwind or compiled styles;
- isolate CSS variables;
- isolate semantic design tokens;
- ensure portals render inside an appropriate extension-owned container;
- avoid polluting host `:root`;
- avoid host-global resets; and
- test component behavior under hostile host CSS.

The extension MUST NOT modify the host application's design-token namespace to make its own components render correctly.

---

## 2.48 Visual identity

Injected extension UI SHOULD respect the extension's product identity without pretending to be the website itself.

Where the distinction matters, extension UI SHOULD include an appropriate visual affordance indicating that the control belongs to the extension.

Extensions MUST NOT create deceptive login dialogs, permission dialogs, browser prompts, security warnings, or controls that could reasonably be mistaken for browser chrome.

---

## 2.49 Host-page theme interaction

Extension UI SHOULD support light and dark presentation where appropriate.

Host-page theme detection MAY be used as an input but MUST NOT create unreadable or inaccessible UI when detection fails.

Extension-owned semantic tokens MUST remain authoritative for extension controls.

Raw host-page colors SHOULD NOT be imported directly into extension components.

---

## 2.50 Accessibility

Extension interfaces MUST comply with the canonical **Accessibility** standard.

Injected interfaces MUST preserve host-page accessibility.

They MUST NOT:

- trap keyboard focus unintentionally;
- break host-page shortcuts without necessity;
- hide meaningful content from assistive technology;
- unexpectedly change focus;
- introduce inaccessible custom controls;
- use color alone to convey state;
- produce unannounced critical status changes; or
- interfere with page zoom.

Extension popups and side panels MUST be fully keyboard operable.

---

## 2.51 Focus management

Injected dialogs, panels, and popovers MUST follow canonical focus-management patterns.

Closing extension UI SHOULD return focus to the element or browser action that logically invoked it where practical.

An injected overlay MUST NOT leave hidden focusable nodes active after closure.

---

## 2.52 Keyboard shortcuts

Keyboard commands MUST avoid unnecessary conflict with host-page and browser shortcuts.

Global page-level listeners SHOULD be restricted to explicit extension commands.

The extension MUST NOT suppress host keyboard events broadly using indiscriminate `preventDefault()` or `stopPropagation()`.

Where a shortcut is configurable, conflicts SHOULD be detectable or documented.

---

## 2.53 Forms and validation

Extension forms MUST comply with the canonical **Forms & Validation** standard.

Validation MUST occur at appropriate trust boundaries.

Host-page values imported into an extension form MUST be treated as untrusted.

Errors MUST be:

- associated with relevant fields;
- accessible to assistive technology;
- actionable; and
- distinct from system/network failures.

Destructive extension actions MUST require appropriate confirmation.

---

## 2.54 State management

Extension state MUST have clearly defined ownership.

Teams MUST distinguish:

- host-page state;
- content-script state;
- background/runtime state;
- extension UI state;
- server state;
- persisted extension state; and
- browser-managed permission state.

These categories MUST NOT be synchronized through uncontrolled duplicated state.

Permission state MUST be queried from the browser when authority depends on it rather than inferred permanently from application state.

---

## 2.55 Browser compatibility

Every extension MUST define a supported browser matrix.

Compatibility MUST cover, where relevant:

- manifest keys;
- permission behavior;
- background execution model;
- messaging;
- content scripts;
- `scripting`;
- declarative networking;
- storage;
- side panels;
- browser actions;
- context menus;
- private browsing;
- native messaging;
- update mechanism; and
- store packaging.

An API with the same name across browsers MUST NOT automatically be assumed to have identical semantics.

Safari documentation explicitly identifies WebExtension manifest and API differences, and MDN documents material differences between Chrome, Firefox, and Safari background models. citeturn176978search5turn783431search0

---

## 2.56 Compatibility abstraction

Browser compatibility code SHOULD be centralized.

Teams SHOULD prefer:

- a typed browser adapter;
- narrow capability wrappers;
- browser-specific manifest generation; and
- automated browser integration tests

over repeated browser checks throughout feature logic.

Compatibility abstractions MUST NOT hide meaningful security differences.

---

## 2.57 Capability detection

Where browser capability may differ by version, extensions SHOULD detect capability rather than rely exclusively on user-agent parsing.

A minimum browser version MAY be declared when a required API cannot be reasonably polyfilled or degraded.

Unsupported functionality SHOULD fail explicitly rather than silently behaving incorrectly.

---

## 2.58 Testing

Browser extensions MUST have automated tests appropriate to their privilege and interaction model.

Testing SHOULD include:

- manifest validation;
- permission behavior;
- message schema validation;
- unauthorized message rejection;
- content-script behavior;
- background suspension/restart behavior;
- persisted-state migration;
- DOM injection safety;
- host-page CSS isolation;
- accessibility;
- API failure handling;
- browser compatibility;
- upgrade paths; and
- uninstall/reinstall behavior where relevant.

High-risk extensions SHOULD include adversarial host-page fixtures designed to manipulate DOM assumptions and messaging boundaries.

---

## 2.59 Store pre-release testing

A release candidate MUST be tested from its final packaged extension artifact.

Development-mode success alone is insufficient.

Teams MUST verify:

- packaged file contents;
- manifest after build transformation;
- absence of development-only permissions;
- absence of debugging endpoints;
- absence of source secrets;
- store-required assets;
- migration behavior;
- first-install behavior;
- update behavior; and
- fresh-profile behavior.

---

## 2.60 Observability

Extension observability MUST preserve privacy.

Operational telemetry SHOULD answer questions such as:

- Did initialization succeed?
- Did a migration fail?
- Did an API request fail?
- Did a content script encounter an unsupported DOM structure?
- Did a permission-dependent feature fail because access was absent?
- Did message validation reject an unexpected message?

Telemetry SHOULD NOT capture entire pages or browsing history merely to make debugging easier.

Sensitive diagnostic collection MUST require appropriate disclosure and governance.

---

## 2.61 Security response

Extensions MUST have an emergency release process appropriate to their distribution channel.

The owner MUST know how to:

- disable vulnerable server-backed functionality;
- publish a security update;
- notify relevant stores;
- revoke compromised credentials;
- rotate backend secrets;
- update known-bad configuration;
- communicate material privacy changes; and
- investigate potentially compromised release credentials.

Store publisher accounts MUST use strong authentication and MUST NOT be shared through generic credentials.

Chrome currently requires two-step verification for publishing and updates. citeturn404660search2

---

# 3. Anti-patterns

## 3.1 `<all_urls>` by default

**Anti-pattern:** Every extension requests access to every website because future functionality may need it.

**Why it fails:** It maximizes privacy exposure and compromise blast radius.

**Required correction:** Use `activeTab`, specific host patterns, or optional host permissions.

---

## 3.2 Permission future-proofing

**Anti-pattern:** Permissions are requested today for features that may ship later.

**Why it fails:** Users grant capabilities with no current product justification.

**Required correction:** Add permissions with the feature that actually needs them.

---

## 3.3 Content script as trusted backend

**Anti-pattern:** The service worker trusts values sent from a content script because the sender belongs to the extension.

**Why it fails:** Host-page-controlled data may have influenced the content script.

**Required correction:** Validate payloads and independently authorize privileged operations.

---

## 3.4 Main-world by default

**Anti-pattern:** All scripts run in the host page's JavaScript world because direct access is convenient.

**Why it fails:** Host code can interfere with the extension, and isolation benefits are lost.

**Required correction:** Remain isolated by default and bridge only the minimum required behavior.

---

## 3.5 Generic privileged message API

**Anti-pattern:** A content script sends arbitrary method names and arguments to the service worker.

**Why it fails:** The message layer becomes a remote privileged execution interface.

**Required correction:** Expose narrowly defined domain messages with independent authorization.

---

## 3.6 Permanent service-worker state

**Anti-pattern:** Critical state is kept only in global variables.

**Why it fails:** Manifest V3 service workers can terminate when idle.

**Required correction:** Persist durable state and make event handling restart-safe.

---

## 3.7 Worker keep-alive architecture

**Anti-pattern:** Timers or artificial connections keep the service worker alive indefinitely.

**Why it fails:** It fights the browser execution model and creates fragile lifecycle behavior.

**Required correction:** Build event-driven, resumable processing.

---

## 3.8 Remote-code configuration

**Anti-pattern:** A remote JSON document contains expressions or commands interpreted by the extension.

**Why it fails:** Configuration becomes unreviewed executable behavior.

**Required correction:** Keep executable logic inside the reviewed package and constrain configuration to declarative data.

---

## 3.9 CDN-loaded privileged library

**Anti-pattern:** An extension downloads its framework or logic from a public CDN at runtime.

**Why it fails:** Code can change independently from the reviewed extension package and violates modern store restrictions for privileged Manifest V3 code.

**Required correction:** Package reviewed dependencies with the extension.

---

## 3.10 Unsafe HTML injection

**Anti-pattern:** Page content is interpolated into `innerHTML`.

**Why it fails:** Host-controlled input can become executable markup.

**Required correction:** Construct DOM safely or use an approved sanitization boundary.

---

## 3.11 Global CSS takeover

**Anti-pattern:** The extension injects a reset or generic Tailwind/component CSS into the host document.

**Why it fails:** Host applications break visually or behaviorally.

**Required correction:** Isolate extension-owned styles.

---

## 3.12 Extension that impersonates the host

**Anti-pattern:** Injected UI is deliberately indistinguishable from security-sensitive website controls.

**Why it fails:** The user cannot tell which trust domain is requesting an action.

**Required correction:** Preserve appropriate extension identity.

---

## 3.13 Browser prompt imitation

**Anti-pattern:** An extension renders dialogs designed to look like native browser permission or security prompts.

**Why it fails:** It undermines user understanding of browser security boundaries.

**Required correction:** Use extension-owned interface patterns and actual browser permission APIs.

---

## 3.14 DOM selectors as contracts

**Anti-pattern:** A third-party site's generated class name is assumed to be a permanent API.

**Why it fails:** Ordinary host changes silently break extension behavior.

**Required correction:** Isolate site adapters, verify expected context, and fail safely.

---

## 3.15 Storage as a secret vault

**Anti-pattern:** Long-lived sensitive credentials are placed into ordinary extension local or sync storage without threat analysis.

**Why it fails:** Extension storage semantics are not automatically equivalent to a dedicated credential vault.

**Required correction:** Minimize credential lifetime and use an architecture appropriate to the credential's sensitivity.

---

## 3.16 Privacy policy drift

**Anti-pattern:** Store disclosures describe the extension's original behavior while later versions collect additional data.

**Why it fails:** User consent and store declarations no longer match implementation.

**Required correction:** Treat data-practice changes as release-governance changes.

---

## 3.17 Update-only testing

**Anti-pattern:** A new version is tested only as a fresh installation.

**Why it fails:** Existing users carry old state and permissions.

**Required correction:** Test supported upgrade paths and migrations.

---

## 3.18 Migration assumes one previous version

**Anti-pattern:** Version 8 assumes all users update from version 7.

**Why it fails:** Browsers may update inactive users across several releases.

**Required correction:** Support defined migration paths from older persisted schemas.

---

## 3.19 Chrome-only WebExtension assumptions

**Anti-pattern:** A shared extension assumes Manifest V3 means `background.service_worker` everywhere.

**Why it fails:** Browser runtime support remains different.

**Required correction:** Maintain a tested compatibility layer and browser-specific manifest behavior.

---

## 3.20 Internal UI exemption

**Anti-pattern:** Options pages and extension side panels bypass design-system and accessibility standards because they are “small tools.”

**Why it fails:** They remain product interfaces used by real users.

**Required correction:** Apply canonical shadcn/ui, token, component, form, and accessibility standards.

---

## 3.21 Telemetry as browser history

**Anti-pattern:** Every visited URL is logged to diagnose extension usage.

**Why it fails:** Operational telemetry becomes unnecessary browsing surveillance.

**Required correction:** Collect event-level extension diagnostics rather than unrelated page history.

---

## 3.22 Store review as QA

**Anti-pattern:** The team depends on Chrome, Mozilla, Microsoft, or Apple review to identify excessive permissions or insecure behavior.

**Why it fails:** Store review is a distribution control, not the project's security program.

**Required correction:** Complete internal security, privacy, and release review before submission.

---

# 4. Checklist

## 4.1 Manifest

- [ ] Is Manifest V3 or the current supported equivalent being used?
- [ ] Is every requested permission required by shipped functionality?
- [ ] Are host permissions narrower than the API permissions allow?
- [ ] Are optional permissions used where appropriate?
- [ ] Are content-script matches narrowly scoped?
- [ ] Are web-accessible resources minimized?
- [ ] Are external messaging origins/IDs explicitly restricted?
- [ ] Has every privilege-expanding manifest change received review?
- [ ] Does the final packaged manifest match the reviewed manifest?

---

## 4.2 Host permissions

- [ ] Could `activeTab` replace persistent site access?
- [ ] Could site access be requested at runtime?
- [ ] Are exact origins preferable to wildcards?
- [ ] Is `<all_urls>` genuinely required?
- [ ] Is broad access explained to users where required?
- [ ] Does functionality survive partial permission denial?
- [ ] Does functionality survive later permission revocation?

---

## 4.3 Content scripts

- [ ] Is isolated-world execution used by default?
- [ ] Is main-world execution genuinely required?
- [ ] Is host DOM data treated as untrusted?
- [ ] Are iframe injections required?
- [ ] Are selectors validated against the intended context?
- [ ] Does missing or changed host markup fail safely?
- [ ] Are privileged capabilities kept outside the host page?

---

## 4.4 Messaging

- [ ] Does every message have a defined schema?
- [ ] Are unknown message types rejected?
- [ ] Are sender identity and context validated where relevant?
- [ ] Is every privileged operation independently authorized?
- [ ] Are external origins or extension IDs allowlisted?
- [ ] Is there any generic execution/method-forwarding message?
- [ ] Can host-controlled data trigger unauthorized extension operations?

---

## 4.5 Background lifecycle

- [ ] Can the background runtime terminate between any two events?
- [ ] Is durable state persisted?
- [ ] Are event handlers idempotent where necessary?
- [ ] Are retries bounded?
- [ ] Is initialization restart-safe?
- [ ] Are long timers avoided?
- [ ] Does scheduled work use supported browser mechanisms?
- [ ] Does the design avoid artificial worker keep-alive techniques?
- [ ] Is Firefox/Safari background behavior covered where supported?

---

## 4.6 Injection security

- [ ] Is remote executable code absent?
- [ ] Are `eval`, `new Function`, and equivalent mechanisms absent?
- [ ] Is untrusted content kept out of unsafe HTML sinks?
- [ ] Are URLs validated before navigation or fetch?
- [ ] Are remotely supplied configurations declarative rather than executable?
- [ ] Are dependencies packaged and reviewed?
- [ ] Are web-accessible resources free of sensitive data?

---

## 4.7 Data and privacy

- [ ] Is collected data required for the disclosed feature?
- [ ] Is browsing information minimized?
- [ ] Does the privacy policy match runtime behavior?
- [ ] Do store privacy declarations match the policy?
- [ ] Are telemetry fields explicitly reviewed?
- [ ] Is sensitive data excluded from logs?
- [ ] Is retention defined where required?
- [ ] Is private browsing handled appropriately?
- [ ] Is sync storage appropriate for every value stored there?

---

## 4.8 APIs and authentication

- [ ] Are server requests encrypted?
- [ ] Are credentials minimally scoped and short-lived where possible?
- [ ] Are credentials kept out of host-page contexts?
- [ ] Are responses validated?
- [ ] Are retries bounded and safe?
- [ ] Are authorization failures distinguished from network failures?
- [ ] Are extension APIs invoked only after checking required permission?

---

## 4.9 Updates and migrations

- [ ] Is persistent-state schema versioned where necessary?
- [ ] Are migrations idempotent?
- [ ] Can migration survive background termination?
- [ ] Are multi-version upgrade paths tested?
- [ ] Is partial migration recoverable?
- [ ] Is permission expansion handled explicitly?
- [ ] Does the extension remain usable when new optional access is denied?
- [ ] Has the packaged update itself been tested?

---

## 4.10 Host-page design

- [ ] Are injected styles scoped?
- [ ] Are global resets avoided?
- [ ] Are host typography and component styles left intact?
- [ ] Is Shadow DOM or equivalent isolation appropriate?
- [ ] Are extension portals/popovers rendered inside the intended styling boundary?
- [ ] Is extension ownership of the UI sufficiently clear?
- [ ] Does the interface avoid impersonating browser or host security controls?
- [ ] Are keyboard interactions non-destructive to the host page?

---

## 4.11 UI standards

- [ ] Does extension-owned UI use shadcn/ui-derived components?
- [ ] Are semantic design tokens used?
- [ ] Are forms compliant with Forms & Validation standards?
- [ ] Is state ownership explicit?
- [ ] Are dialogs, menus, popovers, and tooltips using approved patterns?
- [ ] Are custom controls avoided where an approved primitive exists?
- [ ] Are light/dark states supported where required?

---

## 4.12 Accessibility

- [ ] Is all extension functionality keyboard operable?
- [ ] Is focus managed correctly?
- [ ] Are accessible names provided?
- [ ] Are state changes announced where required?
- [ ] Is status represented by more than color?
- [ ] Does injected UI preserve host accessibility?
- [ ] Are closed overlays removed from the focus order?
- [ ] Does browser zoom remain functional?
- [ ] Are reduced-motion requirements respected?

---

## 4.13 Browser compatibility

- [ ] Is the supported browser matrix documented?
- [ ] Are manifest differences tested?
- [ ] Are background-runtime differences tested?
- [ ] Are permission differences tested?
- [ ] Are API differences wrapped explicitly?
- [ ] Is capability detection used where appropriate?
- [ ] Are unsupported features clearly degraded or disabled?
- [ ] Have extension updates been tested in every supported browser family?

---

## 4.14 Store release

- [ ] Is store metadata accurate?
- [ ] Are screenshots current?
- [ ] Are permission justifications current?
- [ ] Are privacy declarations current?
- [ ] Is remote-code policy compliance verified?
- [ ] Is source/build documentation available where required?
- [ ] Are reviewer instructions complete?
- [ ] Are publisher accounts strongly protected?
- [ ] Has the exact release artifact passed internal security and QA review?

---

# 5. Canonical Summary

1. **Browser extensions MUST be treated as privileged software. Their manifest, permissions, messaging boundaries, host access, and update behavior are security-sensitive architecture.**

2. **Permissions MUST be minimized. Extensions MUST NOT request broad capabilities for speculative future functionality.**

3. **Host access MUST follow least privilege: no access where possible, then `activeTab`, explicit origins, optional hosts, and only then broad wildcard access when the extension's core function genuinely requires it.**

4. **Content scripts MUST treat the host page as untrusted. Isolated execution is the default; main-world execution is an exception requiring a deliberately constrained bridge.**

5. **Message shape does not imply authority. Every privileged receiver MUST validate message structure, sender context where relevant, and authorization independently.**

6. **Background execution MUST be designed as ephemeral and restartable. Durable behavior MUST NOT rely on service-worker or background-script globals, long-lived timers, or uninterrupted execution.**

7. **Cross-browser extensions MUST explicitly account for runtime differences. Manifest V3 does not imply identical background execution, permission behavior, or API semantics across Chromium, Firefox, and Safari.**

8. **Extensions MUST NOT execute unreviewed remote code. Remote configuration MAY select behavior already present in the reviewed package but MUST NOT become a remote programming language or executable command system.**

9. **Untrusted DOM content MUST NOT enter executable HTML or JavaScript sinks. Host-page markup and URLs are untrusted inputs.**

10. **Data collection MUST be limited to the extension's disclosed purpose. Broad browser privileges MUST NOT become broad telemetry collection.**

11. **Privacy policies, store declarations, permission descriptions, and actual runtime behavior MUST remain consistent across every release.**

12. **Persistent extension data MUST support controlled schema migration. Migrations MUST be versioned, idempotent, restart-safe, and tested across supported upgrade paths.**

13. **Injected UI MUST behave as a guest on the host page. It MUST NOT unnecessarily alter global styles, navigation, forms, accessibility, focus, or keyboard behavior.**

14. **Extension-owned UI MUST align with Accessibility, Design Tokens, Component, Pattern, Forms & Validation, and State Management standards. shadcn/ui is the canonical component baseline.**

15. **Store review is not a substitute for internal review. The final packaged extension MUST pass security, privacy, compatibility, accessibility, migration, and release validation before submission.**

16. **The governing principle is minimum authority: minimum permissions, minimum hosts, minimum injected code, minimum retained data, minimum trust across boundaries, and maximum clarity about when privileged behavior occurs.**

This is ready for canonical placement at **Framework → Extensions → Security → Browser & Compatibility** and preserves the same governance vocabulary and cross-standard dependencies as the preceding Gold Standard documents.
