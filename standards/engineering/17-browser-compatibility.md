---
id: "browser-compatibility"
title: "Browser & Compatibility Guidelines — Gold Standard 2026"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "browser", "compatibility"]
applies_to: ["general"]
related: ["accessibility", "extension", "framework", "dependency"]
legacy_number: 41
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 72398
provenance: baseline

---

Canonical placement: **Responsive & Device → Browser & Compatibility → Reusability & Libraries**. Responsive owns layout/input adaptation; Browser & Compatibility owns the **web-platform capability contract** determining which features may be assumed, enhanced, polyfilled, or rejected.

# Browser & Compatibility Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- supported browsers;
- browser support policy;
- compatibility targets;
- browser engines;
- desktop browsers;
- mobile browsers;
- embedded browsers;
- WebViews;
- installed PWAs;
- capability support;
- Web Platform Baseline;
- Browserslist;
- progressive enhancement;
- graceful degradation;
- feature detection;
- CSS feature queries;
- polyfills;
- ponyfills;
- transpilation;
- JavaScript syntax targets;
- JavaScript built-ins;
- CSS prefixes;
- fallback behavior;
- unsupported browsers;
- browser-specific defects;
- dependency compatibility;
- compatibility testing;
- telemetry;
- compatibility governance;
- deprecation of old browser support.

The objective is to make browser compatibility:

```text
Explicit
Measurable
Capability-driven
Progressively enhanced
Secure
Testable
Cost-aware
Predictable
Governed
```

The core principle is:

> **Support capabilities according to an explicit browser contract; detect features rather than guessing browsers; progressively enhance where possible; polyfill only where justified; and never let compatibility become an accidental collection of browser-specific hacks.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Browser/environment
Version range
Business requirement
Missing capability
Workaround
Security implications
Performance implications
Owner
Review date
Removal condition
```

---

# 3. Compatibility Is a Product Contract

Browser support is not merely a compiler setting.

It determines:

```text
Who can use the product
Which web APIs may be assumed
Which code must be transformed
Which polyfills are shipped
Which environments are tested
Which bugs are release-blocking
```

---

# 4. Support Must Be Explicit

Every production web product MUST define a supported-browser policy.

Avoid:

```text
works in modern browsers
```

without defining what "modern" means.

---

# 5. Canonical Compatibility Layers

The compatibility model SHOULD distinguish:

```text
Product support policy
↓
Web-platform capability baseline
↓
Build target
↓
Automated compatibility checks
↓
Runtime progressive enhancement
↓
Test matrix
```

No single layer replaces all the others.

---

# 6. Browser Support Policy

The product support policy answers:

> **Which browser environments are expected to provide the complete supported product experience?**

---

# 7. Capability Baseline

The capability baseline answers:

> **Which web-platform features may engineers assume without a fallback or polyfill?**

---

# 8. Build Target

The build target answers:

> **Which syntax/API transformations should the toolchain produce?**

---

# 9. Test Matrix

The test matrix answers:

> **Which representative environments must actually pass before release?**

---

# 10. Runtime Detection

Runtime detection answers:

> **Which optional capability exists in this browser right now?**

---

# 11. Do Not Conflate These Layers

A Browserslist query is not automatically the complete customer support policy.

Likewise:

```text
tested browser
≠
only browser that may work
```

---

# 12. Canonical Support Tiers

Products SHOULD classify browser environments into explicit support tiers.

Recommended:

```text
Tier 1 — Supported
Tier 2 — Compatible / best effort
Tier 3 — Unsupported
```

---

# 13. Tier 1 — Supported

Tier 1 browsers receive:

```text
regular automated testing
manual critical-flow testing
release-blocking defect treatment
documented support
```

---

# 14. Tier 2 — Compatible / Best Effort

Tier 2 environments MAY work because they share sufficiently compatible platform capabilities.

They do not necessarily receive the complete release-test matrix.

---

# 15. Tier 3 — Unsupported

Tier 3 environments have no guarantee of complete functionality.

The application SHOULD still fail safely and intelligibly when practical.

---

# 16. Unsupported ≠ Intentionally Broken

Unsupported browsers SHOULD NOT be deliberately prevented from using functionality that naturally works.

---

# 17. No Browser Exclusivity

Do not write:

```text
Please use Chrome.
```

merely because Chrome was the developer's test browser.

A browser-specific requirement must correspond to a genuine capability or contractual reason.

---

# 18. Browser Families

A typical general-purpose support policy SHOULD consider the major browser-engine ecosystems represented by:

```text
Chromium
Firefox/Gecko
Safari/WebKit
```

according to the product's users and requirements.

---

# 19. Mobile Is Separate

Desktop support MUST NOT automatically imply equivalent mobile-browser support.

Mobile environments differ in:

```text
viewport behavior
permissions
memory
touch
virtual keyboards
PWA integration
platform constraints
```

---

# 20. Desktop Is Separate

Mobile-browser success does not prove desktop behavior.

---

# 21. WebViews Are Separate Environments

Embedded WebViews SHOULD be treated as separate compatibility targets when the product is intentionally embedded there.

---

# 22. Do Not Assume WebView Currency

A WebView may:

```text
update differently
lack browser UI
have restricted APIs
run under enterprise/device policies
```

Treat it explicitly.

---

# 23. In-App Browsers

Browsers embedded inside:

```text
social apps
messaging apps
identity apps
```

MAY behave differently from full browsers.

Critical public flows SHOULD be resilient where these environments are common among actual users.

---

# 24. Electron / Embedded Chromium

Desktop shells such as Electron SHOULD define their runtime version explicitly.

Do not treat them as equivalent to "latest Chrome."

---

# 25. Kiosk Environments

Kiosk or managed-device deployments SHOULD pin and test their exact runtime where the organization controls it.

---

# 26. Enterprise Browsers

Products serving enterprise customers SHOULD account for managed browser upgrade policies if telemetry/contracts demonstrate a need.

---

# 27. Compatibility Data Over Assumptions

Support policy SHOULD be informed by:

```text
actual customer requirements
RUM/analytics
security requirements
web-platform compatibility
support burden
business value
```

rather than developer preference.

---

# 28. Analytics Is Evidence, Not the Only Criterion

A browser with low global usage MAY still matter because a major customer depends on it.

---

# 29. Privacy in Browser Telemetry

Browser/version telemetry MUST follow Analytics and Privacy Guidelines.

Do not collect unnecessary fingerprinting data merely for compatibility analysis.

---

# 30. Canonical Web-Platform Vocabulary

Use Web Platform **Baseline** terminology where useful:

```text
Limited availability
Newly available
Widely available
```

---

# 31. Baseline Is Feature-Oriented

Baseline answers:

> **How interoperable is this web feature across core browsers?**

It does not define all product-support obligations.

---

# 32. Widely Available

Features classified as Baseline Widely available are generally strong candidates for use without custom compatibility machinery in broad modern-web products.

---

# 33. Newly Available

Baseline Newly available features MAY be adopted when:

```text
support policy covers them
fallback exists
enhancement is optional
or
business benefit justifies the support floor
```

---

# 34. Limited Availability

Limited-availability features MUST NOT become mandatory critical dependencies without explicit compatibility design.

---

# 35. Fixed vs Moving Baseline

Products SHOULD deliberately choose between:

```text
moving capability target
```

and:

```text
fixed capability target
```

---

# 36. Moving Target

Example:

```text
baseline widely available
```

automatically evolves as web-platform availability changes.

Use it only if a moving support floor is consistent with product governance.

---

# 37. Fixed Target

A fixed Baseline year MAY be preferable where:

```text
contractual support must remain predictable
enterprise compatibility matters
releases need stable reproducibility
```

---

# 38. Target Changes Are Reviewed

Changing the compatibility target is an architectural/support change.

It MUST NOT happen silently because tooling defaults changed.

---

# 39. Canonical Browserslist

Web projects SHOULD define one canonical Browserslist configuration where the toolchain supports it.

---

# 40. Browserslist as Shared Target

The same target SHOULD feed compatible tools such as:

```text
transpiler
CSS transformation
prefixing
compatibility linting
bundle tooling
```

rather than maintaining independent browser lists.

---

# 41. One Browser Target

Avoid:

```text
Babel targets A
PostCSS targets B
lint targets C
documentation says D
```

---

# 42. Browser Target Source Control

Compatibility target configuration MUST live in version control.

---

# 43. Browser Target Ownership

Changes to browser targets SHOULD require frontend/platform ownership review.

---

# 44. No Accidental Defaults

Production browser targeting SHOULD NOT depend unknowingly on whatever default a build dependency currently chooses.

---

# 45. Build Reproducibility

The same:

```text
source
dependency lockfile
browser target
build configuration
```

SHOULD produce consistent compatibility output.

---

# 46. JavaScript Compatibility Layers

Distinguish:

```text
Syntax transpilation
Built-in/API polyfill
Runtime Web API availability
Browser behavior defect
```

These require different solutions.

---

# 47. Syntax Transpilation

Transpilation converts syntax unsupported by target environments.

Examples conceptually include transforming newer ECMAScript syntax when needed.

---

# 48. Transpilation Does Not Add APIs

A compiler transforming syntax does NOT automatically provide runtime objects such as:

```text
Promise
URL
Intl
structuredClone
```

unless separately configured.

---

# 49. Polyfill

A polyfill adds or emulates a missing platform/API capability.

---

# 50. Ponyfill

A ponyfill provides replacement functionality without necessarily modifying global/native objects.

---

# 51. Shim

"Shim" MAY describe compatibility adaptation more generally.

Use precise terms in implementation documentation when the distinction matters.

---

# 52. CSS Transformation

CSS build tooling MAY:

```text
add prefixes
rewrite syntax
compile supported future syntax
```

according to the compatibility target.

---

# 53. Prefixes Are Tooling Concerns

Do not manually scatter vendor prefixes when the supported toolchain can generate them correctly.

---

# 54. Manual Prefix Exception

A manual prefix MAY exist for a verified browser defect or capability not handled by the standard toolchain.

It MUST be documented.

---

# 55. Progressive Enhancement

Progressive enhancement is the preferred compatibility strategy.

Canonical model:

```text
Functional semantic baseline
↓
Enhanced presentation
↓
Enhanced interaction
↓
Optional advanced capabilities
```

---

# 56. Baseline First

Core user outcomes SHOULD rely on the simplest sufficiently capable platform primitives.

---

# 57. Enhancement Later

Advanced features SHOULD improve:

```text
speed
convenience
richness
integration
```

without unnecessarily becoming prerequisites.

---

# 58. Semantic HTML Baseline

Prefer:

```text
link
button
form
input
details
table
```

before rebuilding equivalent behavior entirely in JavaScript.

---

# 59. Forms

Where architecture permits, form workflows SHOULD retain meaningful native/server semantics before client-side enhancement.

---

# 60. Navigation

Critical navigation SHOULD use real links/routes rather than JavaScript-only click behavior.

---

# 61. Progressive Enhancement Example

Preferred model:

```text
HTML form works
↓
client validation improves feedback
↓
AJAX/server action improves continuity
↓
optimistic UI improves perceived speed
```

---

# 62. JavaScript-Required Applications

Some authenticated/product applications legitimately require JavaScript.

Progressive enhancement still applies to optional browser capabilities within the JavaScript application.

---

# 63. Do Not Pretend No-JS Is Required Universally

A complex application does not need a fully equivalent no-JavaScript experience unless product requirements demand it.

The requirement is deliberate support—not ideology.

---

# 64. Graceful Degradation

When advanced behavior is unavailable, provide the simplest acceptable fallback.

---

# 65. Fallback Quality

Fallback does not need visual/interaction parity.

It MUST preserve required:

```text
task completion
safety
meaning
accessibility
```

where the environment remains within supported policy.

---

# 66. Enhancement Must Be Optional Where Claimed

Do not call something progressive enhancement when the "enhancement" is actually required to complete the core task.

---

# 67. Capability Detection

Detect the feature needed.

Do not detect the browser you hope implements it.

---

# 68. JavaScript Feature Detection

Preferred conceptual style:

```js
if ("someFeature" in someObject) {
  // enhanced behavior
} else {
  // fallback
}
```

when presence is an appropriate support signal.

---

# 69. CSS Feature Detection

Use:

```css
@supports (...) {
  ...
}
```

where conditional CSS support detection is needed.

---

# 70. CSS Natural Fallback

Often no explicit feature query is needed.

CSS can provide:

```css
.old-property: fallback;
.new-property: enhanced;
```

when unsupported declarations are safely ignored.

---

# 71. `CSS.supports`

JavaScript MAY use `CSS.supports()` where code needs to know whether a CSS declaration is understood.

---

# 72. API Presence ≠ Fully Correct Behavior

Feature presence checks may not reveal:

```text
browser bugs
partial implementation
behavior differences
```

---

# 73. Feature Queries Are Parsing Tests

`@supports` primarily tells you whether the browser accepts a CSS feature/value.

It does not prove flawless behavior.

---

# 74. Behavioral Feature Detection

When a feature historically has partial/broken implementations, use a focused behavioral test only when necessary.

---

# 75. Avoid Heavy Detection Frameworks by Default

Do not ship a large capability-detection library when one or two native checks solve the requirement.

---

# 76. UA Sniffing

User-agent sniffing MUST NOT be the normal compatibility strategy.

---

# 77. Bad UA Logic

Avoid:

```js
if (navigator.userAgent.includes("Chrome")) {
  enableFeature();
}
```

---

# 78. Why UA Detection Is Fragile

Browser identity does not reliably tell you:

```text
which APIs exist
whether implementation is broken
whether environment embeds another engine
what future browser behavior will be
```

---

# 79. Client Hints

Client Hints SHOULD NOT be used as a replacement for feature detection when the real question is feature availability.

---

# 80. UA Exception

Browser detection MAY be justified for:

```text
documented browser-specific defects
security mitigation
vendor integration requirement
```

when capability detection cannot isolate the problem.

---

# 81. UA Exception Requirements

A browser-specific branch MUST include:

```text
affected browser
affected versions
bug/reference
why feature detection is insufficient
removal condition
test coverage
```

---

# 82. Browser Hack Expiry

Browser-specific workarounds MUST NOT become permanent anonymous code.

---

# 83. Polyfill Principle

> **Polyfill the minimum capability required, not an entire historical browser generation by reflex.**

---

# 84. Before Adding a Polyfill

Ask:

```text
Is the feature essential?
Can we progressively enhance instead?
Can existing syntax/tooling solve it?
Can a simpler implementation avoid it?
How large is the polyfill?
Does it mutate globals?
Is it maintained?
Is it secure?
Who needs it?
```

---

# 85. Polyfill Cost

Polyfills add:

```text
JavaScript bytes
parse cost
execution cost
maintenance
test surface
supply-chain risk
```

---

# 86. Polyfill Only When Needed

Modern browsers SHOULD NOT download or execute unnecessary compatibility code when the toolchain can safely avoid it.

---

# 87. Target-Based Polyfills

Where appropriate, configure the build to include polyfills according to the canonical target rather than importing every historical polyfill globally.

---

# 88. Stable Features First

Production polyfills SHOULD target standardized/stable behavior.

Avoid shipping speculative proposal polyfills as broad production dependencies unless explicitly justified.

---

# 89. Proposal Polyfills

Experimental proposal polyfills MAY be used in:

```text
experiments
internal prototypes
controlled products
```

with explicit review.

---

# 90. Global Mutation

Polyfills that modify global built-ins require stronger scrutiny because they can conflict with:

```text
third-party scripts
browser implementations
other polyfills
```

---

# 91. Ponyfill Preference

Libraries/shared packages SHOULD consider ponyfills when avoiding global mutation is important.

---

# 92. Application Polyfill

Applications MAY prefer global polyfills where the complete controlled runtime makes that the simpler correct architecture.

---

# 93. Polyfill Source

Polyfills MUST come from maintained, reviewed dependencies.

Do not copy random compatibility snippets from blogs or Q&A posts into foundational runtime code.

---

# 94. Polyfill Versioning

Polyfills follow Dependency Guidelines:

```text
version policy
security updates
provenance
license
maintenance
```

---

# 95. Polyfill Removal

Every nontrivial compatibility polyfill SHOULD have a removal condition.

---

# 96. Compatibility Debt

Once the support floor advances past the need for a polyfill, remove it unless another environment still depends on it.

---

# 97. Polyfill Cannot Solve Everything

Some platform capabilities cannot be fully emulated.

---

# 98. Native-Semantics Limit

A polyfill cannot always reproduce:

```text
browser security model
native performance
OS integration
new syntax semantics
hardware capability
```

faithfully.

---

# 99. Polyfill Feasibility Review

Before relying on a polyfill for a critical feature, verify that it actually reproduces the semantics the application requires.

---

# 100. Partial Polyfill

Do not describe a partial compatibility shim as full browser support.

---

# 101. Internationalization Polyfills

`Intl`/locale polyfills MAY have significant data payload.

Load only required:

```text
features
locales
```

where practical.

---

# 102. Fetch / Network Polyfills

A network API polyfill must preserve required:

```text
abort
streaming
credentials
error
```

semantics if the application relies on them.

---

# 103. URL Polyfills

URL parsing/security-sensitive logic SHOULD use implementations matching required standards behavior rather than simplistic string parsing.

---

# 104. CSS Fallback

CSS SHOULD prefer natural fallback where feasible.

Example conceptually:

```css
.component {
  background: solid-fallback;
  background: newer-feature;
}
```

---

# 105. CSS Enhancement

Advanced CSS MAY be layered behind `@supports`.

---

# 106. CSS Limited Availability

A limited-availability CSS feature MAY be used if:

```text
fallback remains usable
difference is presentational
```

---

# 107. Layout Compatibility

Do not adopt a new CSS layout primitive as the only way to access critical content before required browsers support it or a suitable fallback exists.

---

# 108. CSS Reset

The product SHOULD use one governed reset/base stylesheet strategy.

Do not accumulate browser-normalization patches independently per feature.

---

# 109. Native Control Differences

Browsers and operating systems may render native controls differently.

Visual pixel identity is NOT required when:

```text
semantics
usability
brand requirements
accessibility
```

are satisfied.

---

# 110. Do Not Over-Normalize Native UI

Avoid replacing functional native controls solely to eliminate minor visual differences.

---

# 111. Form Control Compatibility

Forms SHOULD be tested across representative browsers for:

```text
autofill
password managers
date/input behavior
keyboard
validation
focus
```

---

# 112. Autofill

CSS/component styling MUST tolerate browser autofill behavior.

---

# 113. Password Managers

Authentication controls SHOULD work with major password managers and browser credential systems according to Authentication Guidelines.

---

# 114. Clipboard

Clipboard enhancements MUST gracefully handle:

```text
permission denial
API absence
non-secure-context restrictions
```

where applicable.

---

# 115. Camera / Media APIs

Camera, microphone, and media capabilities MUST use feature/permission checks and provide applicable fallbacks.

---

# 116. Geolocation

Geolocation MUST be treated as optional device capability unless the product cannot logically function without it.

---

# 117. File APIs

Advanced file-system APIs SHOULD progressively enhance ordinary:

```text
file input
upload
download
```

capabilities where possible.

---

# 118. Share API

System share integration MAY enhance a standard copy/share-link experience.

---

# 119. Web Notifications

Browser notification APIs MUST NOT be the only path to critical product information.

---

# 120. Service Worker

Service Worker support MAY enhance:

```text
offline
caching
push
```

but the base application should fail intelligently where it is unavailable unless offline/PWA capability is contractually required.

---

# 121. Background APIs

Background Sync and similar advanced APIs MUST have explicit fallback semantics.

---

# 122. PWA Installation

Installability is optional enhancement unless product requirements explicitly state otherwise.

---

# 123. WebAssembly

WebAssembly MAY be used when its compatibility/performance benefits justify it.

A fallback MAY be required if the supported-browser policy includes environments without required WASM capability.

---

# 124. Worker APIs

Worker-dependent functionality SHOULD account for environments where:

```text
worker unavailable
worker crashes
CSP blocks worker
```

as appropriate.

---

# 125. Storage APIs

Do not assume:

```text
localStorage
IndexedDB
Cache Storage
```

always succeeds merely because the API exists.

---

# 126. Storage Failure

Browser storage may fail because of:

```text
privacy mode
quota
policy
user settings
storage eviction
```

Runtime error handling remains necessary.

---

# 127. Cookie Behavior

Authentication/session architecture MUST NOT depend on browser-specific cookie behavior outside the organization's declared support/security contract.

---

# 128. Third-Party Cookie Dependency

Third-party-cookie-dependent functionality requires explicit review because browser privacy models vary and evolve.

---

# 129. Popups

Browser popup blockers MUST be considered where workflows open new windows.

---

# 130. User Activation

APIs requiring user activation SHOULD be invoked from genuine user interaction rather than delayed asynchronous code that loses activation state.

---

# 131. Download Behavior

File download behavior SHOULD be tested across supported browser environments, especially where Blob/object URLs or generated files are involved.

---

# 132. Printing

Print support is its own compatibility surface when the product promises it.

---

# 133. CSS Print

Do not assume screen CSS automatically produces acceptable print output.

---

# 134. Accessibility APIs

Browser compatibility MUST NOT come at the expense of Accessibility Guidelines.

---

# 135. Semantic Fallback

If an advanced widget is unavailable, fallback to semantic controls where possible rather than rendering an inaccessible approximation.

---

# 136. Reduced Motion

Browser compatibility with user-preference media queries SHOULD follow Responsive and Accessibility Guidelines.

---

# 137. Forced Colors

Components should remain usable where supported high-contrast/forced-color behavior changes visual styling.

---

# 138. Browser Defaults Have Value

Do not globally disable browser:

```text
focus rings
zoom
text selection
context menus
autocomplete
```

without a concrete product requirement and replacement.

---

# 139. Compatibility Testing Strategy

Compatibility requires both:

```text
automated checks
+
actual browser execution
```

---

# 140. Static Compatibility Checks

CI SHOULD detect unsupported:

```text
JavaScript APIs
CSS features
syntax
```

against the canonical target where suitable tooling exists.

---

# 141. Static Checks Are Not Sufficient

A feature may be syntactically supported but behave differently due to:

```text
browser bug
OS integration
layout engine
input method
permission model
```

---

# 142. Real Browser Testing

Critical product journeys MUST execute in representative Tier 1 environments.

---

# 143. Browser Matrix Design

The matrix SHOULD cover:

```text
different browser engines
desktop
mobile
minimum/floor target where practical
latest target
critical OS/browser combinations
```

according to product risk.

---

# 144. Do Not Test Only Chromium

Passing:

```text
Chrome
Edge
Chromium-based CI
```

does not provide sufficient engine diversity.

---

# 145. Safari Coverage

Products supporting Safari MUST test Safari/WebKit behavior rather than assuming Chromium success predicts it.

---

# 146. Firefox Coverage

Products supporting Firefox MUST test Firefox/Gecko behavior.

---

# 147. Mobile Coverage

Products with meaningful mobile traffic MUST test representative real mobile/browser environments.

---

# 148. Real Devices

Critical mobile flows SHOULD receive some real-device testing.

Emulation alone does not reproduce:

```text
virtual keyboard
OS permissions
touch behavior
safe areas
browser chrome
memory pressure
```

fully.

---

# 149. Automation Balance

Not every browser/version needs the full E2E suite.

A practical model MAY use:

```text
broad smoke matrix
+
deep primary-browser suites
+
targeted compatibility tests
```

---

# 150. Compatibility Smoke Tests

Critical smoke tests SHOULD cover:

```text
application boots
authentication
navigation
forms
primary workflow
downloads/uploads where relevant
```

---

# 151. Complex Component Tests

Pay particular attention to:

```text
Dialog
Select
Combobox
Date Picker
Table/Grid
Drag and Drop
File Upload
Media
```

---

# 152. CSS Visual Testing

Cross-browser visual testing SHOULD focus on meaningful usability/layout defects rather than pixel-identical antialiasing.

---

# 153. Pixel Parity Is Not Compatibility

Differences in:

```text
font rasterization
native controls
scrollbars
subpixel layout
```

are not defects by themselves.

---

# 154. Functional Parity

Users SHOULD be able to complete supported workflows even when browser-native visual details differ.

---

# 155. Browser Floor Testing

Where support policy defines a minimum compatible version, representative minimum/floor testing SHOULD exist.

---

# 156. Latest Browser Testing

Current browser releases SHOULD also be exercised to detect regressions caused by browser updates.

---

# 157. Browser Update Risk

Evergreen browsers can introduce new defects.

Support policy requires ongoing testing—not a one-time certification.

---

# 158. Beta/Preview Browser Testing

High-risk products MAY run non-blocking tests against browser preview/beta channels to discover upcoming regressions.

---

# 159. Preview Browser Failures

Failures in preview browser channels SHOULD normally create investigation signals rather than immediately block production unless the release is imminent/affected.

---

# 160. OS Version Matrix

Do not multiply browser testing across every OS release without evidence.

Choose representative combinations driven by engine/runtime differences and user data.

---

# 161. Compatibility Test Ownership

Foundational compatibility tests SHOULD be owned centrally.

Feature-specific compatibility tests belong with the feature.

---

# 162. Third-Party Script Compatibility

Third-party scripts can introduce unsupported platform features.

Compatibility review MUST include critical:

```text
analytics
payments
identity
support widgets
editors
maps
```

where they affect user journeys.

---

# 163. Dependency Browser Floor

A dependency MAY silently raise the browser support floor.

Dependency review MUST check its browser/runtime requirements.

---

# 164. UI Library Compatibility

Foundational UI libraries MUST support the declared browser target.

---

# 165. Transitive Compatibility

A transitive package can introduce syntax or APIs incompatible with the configured build target.

Build and browser tests SHOULD detect this.

---

# 166. Untranspiled Dependencies

Some dependencies ship source using newer syntax.

The build architecture MUST define whether dependency code is transformed.

---

# 167. Library Output

Internal shared web libraries MUST publish output compatible with their declared consumer environment.

---

# 168. Browser Compatibility Is Part of Library API

A library upgrade that raises required browser capabilities MAY be a breaking change.

---

# 169. CSS Dependency Compatibility

Third-party CSS may use unsupported features independently from application CSS.

---

# 170. Polyfill Duplication

Multiple dependencies SHOULD NOT independently ship redundant competing polyfills when this can be centrally controlled.

---

# 171. Global Polyfill Conflict

Conflicting modifications to built-ins MUST be treated as correctness defects.

---

# 172. Bundle Analysis

Compatibility tooling SHOULD expose the cost of:

```text
transpilation
polyfills
legacy transforms
```

where significant.

---

# 173. Compatibility Performance Budget

Do not add large compatibility payloads for tiny unsupported populations without evaluating business value.

---

# 174. User Experience Over Purity

If a small, safe polyfill materially preserves access for valuable users, bundle purity is not the objective.

Make the tradeoff deliberately.

---

# 175. Unsupported Browser Detection

Unsupported-browser messaging SHOULD be based on missing **essential capabilities**, not merely a browser brand/version string where practical.

---

# 176. Essential Capability Gate

A preflight MAY check capabilities necessary for the application to start safely.

---

# 177. Capability Gate Must Be Small

Compatibility preflight code SHOULD itself use syntax supported by the environments it intends to detect.

---

# 178. No False Block

A browser that possesses required capabilities SHOULD NOT be rejected merely because its brand is unknown.

---

# 179. Unknown Browser

Unknown browsers SHOULD generally be allowed to attempt the application unless security or required capabilities make that unsafe.

---

# 180. Unsupported Browser Page

When the product cannot operate, the unsupported experience SHOULD explain:

```text
what is unsupported
that the browser/environment needs updating or changing
what users can do
how to preserve/access critical data if applicable
```

---

# 181. Neutral Browser Guidance

Prefer:

```text
Update your browser or use another supported browser.
```

over advertising one vendor without necessity.

---

# 182. Support Link

An unsupported-browser page SHOULD link to the product's browser-support documentation where relevant.

---

# 183. No Endless Reload

Compatibility failure MUST NOT result in:

```text
blank page
reload loop
crash loop
```

when a static fallback can explain the problem.

---

# 184. Blank Screen Is a Defect

For Tier 1 environments, failure before the application renders meaningful recovery UI is a release-blocking defect.

---

# 185. Static Shell

Critical unsupported/error messaging SHOULD ideally not depend on the same advanced runtime feature that caused startup failure.

---

# 186. Old Browser and Authentication

Do not allow an unsupported browser to enter a security flow that cannot be completed safely.

---

# 187. Security Floor

A browser may be rejected when it lacks a capability required for the organization's current security model.

The reason SHOULD be documented.

---

# 188. Do Not Downgrade Security for Compatibility

Avoid weakening:

```text
TLS requirements
authentication
cookie security
cryptography
CSP
authorization
```

solely to support obsolete environments.

---

# 189. Security Beats Legacy Support

When compatibility and mandatory security controls conflict, the secure architecture takes precedence unless an approved alternative exists.

---

# 190. Browser Extensions

Browser extensions MAY modify:

```text
DOM
requests
JavaScript
styles
```

The product is not expected to support arbitrary extension interference.

---

# 191. Common Extension Compatibility

A widely used password manager or assistive extension MAY warrant compatibility work when it affects core product workflows.

---

# 192. Content Blockers

Applications SHOULD degrade intelligently if optional analytics/marketing scripts are blocked.

Core application behavior MUST NOT depend on them.

---

# 193. CSP

Compatibility workarounds MUST NOT require broadly weakening Content Security Policy without Security review.

---

# 194. Browser Bugs

Confirmed browser bugs SHOULD be isolated behind the narrowest workaround possible.

---

# 195. Bug Documentation

Document:

```text
browser
version/range
symptom
upstream issue
workaround
test
removal criteria
```

---

# 196. Avoid Global Browser CSS Files

Bad architecture:

```text
chrome.css
safari.css
firefox.css
```

containing broad unexplained divergence.

---

# 197. Localize Workarounds

Keep a compatibility workaround near the affected abstraction or centralized compatibility adapter.

---

# 198. Workaround Tests

Browser-specific workarounds MUST have regression tests where practical.

---

# 199. Workaround Removal

When the affected browser floor moves past the defect, remove the workaround.

---

# 200. Compatibility Adapter

Complex platform differences MAY use a small capability adapter.

Example conceptually:

```text
clipboard capability
file-system capability
share capability
```

---

# 201. Adapter Semantics

Adapters SHOULD expose product-needed behavior, not browser names.

Good:

```text
canShareFiles()
```

Bad:

```text
isSafari17()
```

unless the latter is a documented bug workaround.

---

# 202. Progressive API Wrappers

Advanced browser APIs SHOULD often sit behind domain-neutral capability wrappers.

---

# 203. Permission + Capability

Availability of an API is not permission to use it.

Device APIs require both:

```text
capability
+
permission/user consent
```

where applicable.

---

# 204. Secure Context

Some web APIs require secure contexts.

Compatibility testing MUST use production-like HTTPS conditions where the capability depends on it.

---

# 205. Localhost Exception Awareness

An API working on localhost may still fail under an improperly configured deployed environment.

---

# 206. Feature Flags

New web-platform features MAY be rolled out under Feature Flags while compatibility confidence is gathered.

---

# 207. Flag Is Not a Polyfill

Feature flags control product exposure.

They do not solve browser compatibility by themselves.

---

# 208. Capability + Flag

Advanced features MAY require:

```text
product flag enabled
AND
browser capability available
```

---

# 209. A/B Experiments

Experiments MUST NOT unintentionally compare browser populations because one variant only works in certain browsers.

---

# 210. Browser Bias in Analytics

When experiment behavior depends on browser capability, analysis SHOULD account for that confounder.

---

# 211. Compatibility Telemetry

Products MAY measure:

```text
startup failures
unsupported capability rates
browser-specific JS errors
polyfill usage
failed permission/API calls
```

within Privacy/Observability policy.

---

# 212. RUM

Real-user monitoring can identify compatibility failures that synthetic testing misses.

---

# 213. Error Grouping

Browser/version context MAY be attached to client errors when necessary for debugging.

Avoid unbounded high-cardinality telemetry design.

---

# 214. Browser-Specific Error Spike

A sudden error increase isolated to one browser family/version SHOULD trigger compatibility investigation.

---

# 215. New Browser Release Monitoring

A release-induced error spike MAY indicate:

```text
browser regression
deprecated behavior
stricter security behavior
third-party incompatibility
```

---

# 216. Compatibility Dashboard

High-traffic products MAY track:

```text
browser distribution
error rate by browser family
critical-flow completion
unsupported-browser rate
```

---

# 217. Do Not Collect Full UA Without Need

Prefer bounded derived browser dimensions where possible.

---

# 218. Support Data Retention

Browser compatibility telemetry follows standard analytics retention.

---

# 219. New Web Feature Adoption

Before adopting a new platform feature, engineers SHOULD record:

```text
feature
support/Baseline state
business benefit
fallback
polyfill availability
bundle impact
accessibility
test plan
```

---

# 220. Adoption Decision

A feature MAY be adopted even before broad availability if:

```text
it is enhancement-only
fallback is acceptable
or
the product support floor intentionally includes it
```

---

# 221. New Feature Does Not Need Automatic Polyfill

A modern capability may simply be omitted where unsupported if it is nonessential.

---

# 222. Progressive Enhancement Preferred

Preferred:

```text
basic upload works everywhere supported
+
advanced file-system integration where available
```

over shipping a huge compatibility layer just to make advanced integration universal.

---

# 223. Feature Maturity

Compatibility is not the only adoption criterion.

Also consider:

```text
spec stability
browser bugs
accessibility
developer tooling
performance
security
```

---

# 224. Baseline Status Is Not Quality Certification

A feature being interoperable does not guarantee it is the correct product abstraction.

---

# 225. Compatibility Documentation

The repository SHOULD document:

```text
support policy
canonical Browserslist target
exceptions
test matrix
polyfill strategy
unsupported behavior
```

---

# 226. Public Support Documentation

Customer-facing browser support SHOULD state useful browser policy without exposing unnecessary internal build details.

---

# 227. Internal Support Documentation

Engineering documentation SHOULD be precise enough to reproduce the support target.

---

# 228. Browser Version Wording

Avoid manually hard-coding version numbers across many documents.

Use one authoritative source.

---

# 229. Support Matrix Automation

Where possible, generate support documentation/test configuration from the canonical compatibility policy.

---

# 230. Browser Support Review

Review support policy periodically.

Recommended triggers include:

```text
major browser usage changes
security floor changes
framework/toolchain upgrades
major dependency upgrades
new platform capability adoption
```

---

# 231. Dropping Browser Support

Dropping a supported environment is a product change.

---

# 232. Drop Criteria

Consider:

```text
usage
customer contracts
security
maintenance burden
polyfill cost
framework support
testing cost
browser EOL
```

---

# 233. Notice

Contractual/enterprise products SHOULD provide appropriate notice before dropping supported browser versions where commitments require it.

---

# 234. Removal Work

Dropping a compatibility target SHOULD trigger removal of:

```text
obsolete transforms
polyfills
browser hacks
tests
documentation
```

that are no longer required.

---

# 235. Compatibility Ratchet

The support floor SHOULD generally move forward deliberately rather than retain compatibility code forever.

---

# 236. Framework Compatibility

Framework Guidelines define supported framework/runtime versions.

Browser & Compatibility defines what client environments those outputs must serve.

---

# 237. Framework Defaults

A framework's default browser support MUST NOT silently override organizational support policy.

---

# 238. Framework Upgrade

Framework upgrades SHOULD be reviewed for browser-target changes.

---

# 239. Build Tool Upgrade

Changes in:

```text
transpilation
minification
CSS processing
polyfill behavior
```

may affect compatibility even when application source is unchanged.

---

# 240. Minifier Compatibility

Production minification MUST preserve syntax compatible with declared targets.

---

# 241. Output Inspection

When browser floor issues occur, inspect the actual generated bundle—not only source code.

---

# 242. Dynamic Imports

Code splitting/dynamic imports require target/runtime support or appropriate bundler handling.

---

# 243. Lazy Chunk Compatibility

All asynchronously loaded chunks MUST follow the same compatibility contract as the initial bundle.

---

# 244. Worker Bundle Compatibility

Worker/service-worker bundles MAY need separate compilation but MUST target their declared execution environments.

---

# 245. Server vs Browser Targets

Do not apply browser transpilation/polyfills blindly to:

```text
Node.js
server
worker
edge runtime
```

contexts with different capability sets.

---

# 246. Client Boundary

Compatibility transformations SHOULD be scoped to the runtime actually consuming the code.

---

# 247. Library Dual Environments

Shared packages consumed on both server and browser MUST define compatible exports/runtime assumptions.

---

# 248. Browser Globals

Universal/shared modules MUST NOT access:

```text
window
document
navigator
```

at module initialization unless they are explicitly browser-only.

---

# 249. SSR Compatibility

Browser APIs MUST NOT execute during server rendering.

---

# 250. Hydration Compatibility

Server and browser output MUST remain semantically compatible even when optional capabilities are only discoverable client-side.

---

# 251. Capability Detection During SSR

Do not guess browser capability from server-side UA merely to create a completely different semantic UI if client-side progressive enhancement can solve it.

---

# 252. Server Hints

Server-side adaptation MAY use reliable negotiated hints where genuinely necessary.

It MUST retain safe fallback behavior.

---

# 253. Caching

Server output that varies by compatibility-related request headers MUST have correct cache variation semantics.

---

# 254. Avoid Cache Fragmentation

Do not create per-browser HTML caches unless requirements genuinely demand it.

---

# 255. Compatibility and CDN

Modern client assets MAY be CDN-cached broadly when build output follows one shared declared target.

---

# 256. Differential Bundles

Different client bundles MAY be served to different capability sets when substantial performance benefit justifies complexity.

---

# 257. Differential Delivery Governance

Differential delivery MUST define:

```text
selection logic
cache behavior
test matrix
monitoring
fallback
```

---

# 258. Avoid Legacy Bundle Architecture Without Need

Do not maintain:

```text
modern app
legacy app
```

as two long-lived implementations merely to support a tiny unsupported population without explicit business value.

---

# 259. Compatibility Security

Polyfills and transpilers are part of the software supply chain.

They require the same dependency-security governance as other build/runtime dependencies.

---

# 260. Prototype Pollution / Global Changes

Compatibility libraries modifying built-in prototypes require specific review for correctness and security interactions.

---

# 261. CSP Compatibility

Third-party compatibility scripts SHOULD NOT require unsafe CSP policies.

---

# 262. Remote Polyfill Services

Runtime polyfills loaded from external services require:

```text
availability review
privacy review
security review
SRI/CSP consideration
dependency governance
```

and SHOULD NOT be adopted casually.

---

# 263. Self-Hosted Build Output

Bundling required compatibility code as part of the controlled application build is generally easier to reproduce and govern.

---

# 264. Compatibility Review Checklist

```text
□ Product support policy defined
□ Support tiers defined
□ Canonical target configured
□ Browser engines represented
□ Mobile environments considered
□ WebViews considered if relevant
□ Progressive enhancement plan
□ Feature detection strategy
□ Polyfill strategy
□ Unsupported behavior
□ Test matrix
□ Monitoring
□ Ownership
```

---

# 265. New Web API Checklist

```text
□ User value
□ Baseline/support state checked
□ Required or optional
□ Feature detection possible
□ Permission requirements
□ Secure-context requirements
□ Fallback
□ Polyfill feasibility
□ Browser defects
□ Accessibility
□ Bundle cost
□ Tests
```

---

# 266. Polyfill Checklist

```text
□ Feature actually required
□ Existing target needs it
□ Progressive enhancement considered
□ Scope minimal
□ Maintained dependency
□ License approved
□ Security reviewed
□ Global mutation understood
□ Bundle cost measured
□ Behavior tested
□ Removal condition
```

---

# 267. Browser Workaround Checklist

```text
□ Real reproducible defect
□ Browser/version documented
□ Upstream issue/reference
□ Narrow workaround
□ Feature detection insufficient
□ Test added
□ No security regression
□ Removal condition
□ Owner
```

---

# 268. Unsupported Browser Checklist

```text
□ Essential capability identified
□ False-positive blocking avoided
□ Unknown capable browsers allowed
□ Static fallback can render
□ Message clear
□ Update/alternative guidance
□ Support documentation link
□ No reload loop
□ Authentication/security safe
```

---

# 269. Test Matrix Checklist

```text
□ Multiple browser engines
□ Desktop
□ Mobile
□ Browser floor where defined
□ Current versions
□ Critical workflows
□ Keyboard/accessibility
□ Upload/download if relevant
□ Auth/payment if relevant
□ Real-device coverage
```

---

# 270. Progressive Enhancement Checklist

```text
□ Core user outcome identified
□ Simplest baseline available
□ Advanced capability optional where possible
□ Capability detection
□ Fallback
□ Accessible alternative
□ Failure state
□ Permission denial
□ Offline/network failure where relevant
```

---

# 271. CI Compatibility Checklist

```text
□ Browserslist centralized
□ Syntax transforms target it
□ CSS processing target it
□ Compatibility linting
□ Dependency target reviewed
□ Build output tested
□ No unresolved unsupported critical feature
□ Browser smoke tests
```

---

# 272. Definition of Done — New Browser-Facing Feature

A browser-facing feature is ready when:

```text
✓ Required web capabilities identified
✓ Support target checked
✓ Baseline status understood
✓ Progressive enhancement evaluated
✓ Feature detection implemented where needed
✓ Polyfill/fallback decision documented
✓ Supported browsers tested
✓ Mobile behavior tested where applicable
✓ Accessibility verified
✓ Unsupported behavior defined
✓ Monitoring exists for high-risk capability
```

---

# 273. Definition of Done — New Polyfill

```text
✓ Actual support gap demonstrated
✓ Business/user need justifies it
✓ Minimal polyfill selected
✓ Provenance/license/security reviewed
✓ Bundle impact measured
✓ Supported-browser behavior tested
✓ Native implementation path tested
✓ No harmful global conflicts
✓ Removal condition documented
```

---

# 274. Definition of Done — Browser Support Change

```text
✓ User/customer impact analyzed
✓ Analytics/RUM reviewed
✓ Security implications reviewed
✓ Framework/dependency constraints reviewed
✓ Support target updated
✓ CI updated
✓ Test matrix updated
✓ Polyfills/workarounds reviewed
✓ Documentation updated
✓ Customer notice handled where required
```

---

# 275. Browser & Compatibility Anti-Patterns

Avoid:

```text
if browser === Chrome
```

for ordinary feature decisions.

Avoid:

```text
if userAgent contains Safari
```

unless isolating a documented browser defect.

Avoid:

```text
Please install Chrome.
```

without a genuine vendor-specific requirement.

Avoid:

```text
works on my browser
```

as compatibility evidence.

Avoid:

```text
latest browser
```

as the complete support policy.

Avoid:

```text
last 2 versions
```

copied into multiple configurations with no business rationale.

Avoid:

```text
framework default
```

silently becoming organizational support policy.

Avoid:

```text
Baseline Widely Available
```

as a moving target without acknowledging that the support floor evolves.

Avoid:

```text
Can I Use says yes
→ no testing needed
```

Avoid:

```text
API exists
→ API always works
```

Avoid:

```text
@supports returned true
→ implementation has no browser bugs
```

Avoid:

```text
new feature unsupported
→ UA sniff browser brand
```

instead of capability detection.

Avoid:

```text
polyfill everything
```

Avoid:

```text
import all historical polyfills
```

for modern targets.

Avoid:

```text
experimental proposal polyfills
```

in normal production bundles without review.

Avoid:

```text
random polyfill copied from Stack Overflow
```

Avoid:

```text
polyfill added forever
```

with no removal criterion.

Avoid:

```text
transpiler enabled
→ runtime APIs supported
```

Avoid:

```text
Babel handled it
```

when the missing capability is a browser API.

Avoid:

```text
manual -webkit-
manual -moz-
```

everywhere without need.

Avoid:

```text
safari.css
firefox.css
chrome.css
```

as the primary architecture.

Avoid:

```text
native Select looks slightly different
→ rebuild inaccessible custom Select
```

Avoid:

```text
advanced API unavailable
→ critical button disappears
```

Avoid:

```text
share API unavailable
→ no way to copy a link
```

Avoid:

```text
camera unavailable
→ no upload path
```

where file upload is a reasonable fallback.

Avoid:

```text
service worker unavailable
→ app crashes
```

unless service-worker support is explicitly mandatory.

Avoid:

```text
localStorage exists
→ write cannot fail
```

Avoid:

```text
clipboard API exists
→ permission guaranteed
```

Avoid:

```text
desktop Chrome tests pass
→ mobile Chrome supported
```

Avoid:

```text
Chrome and Edge tested
→ cross-browser testing complete
```

Avoid:

```text
Playwright Chromium
```

as the entire browser matrix.

Avoid:

```text
pixel-perfect equality
```

across native browser rendering as the compatibility goal.

Avoid:

```text
browser version blocked
```

when required capabilities are actually present.

Avoid:

```text
unknown browser
→ unsupported
```

by default.

Avoid:

```text
unsupported environment
→ blank page
```

Avoid:

```text
unsupported environment
→ infinite reload
```

Avoid:

```text
old browser support
→ weaken authentication security
```

Avoid:

```text
compatibility workaround
```

with no browser/version/bug explanation.

Avoid:

```text
TODO remove Safari hack
```

with no removal trigger.

Avoid:

```text
dependency upgrade
```

without checking whether its browser floor changed.

Avoid:

```text
new polyfill
```

without dependency/security/license review.

Avoid:

```text
browser support dropped
```

while leaving all legacy polyfills forever.

Avoid:

```text
CSS display:none
```

as a compatibility fallback when underlying unsupported JavaScript still crashes application startup.

---

# 276. AI Browser & Compatibility Rules

AI coding agents MUST inspect the existing browser-support policy before introducing web-platform features.

---

# 277. AI Target Rule

AI MUST use the repository's canonical compatibility target.

It MUST NOT invent a separate browser list.

---

# 278. AI Baseline Rule

AI SHOULD check a feature's current interoperability/support status when adopting recently introduced web-platform capabilities.

---

# 279. AI Feature-Detection Rule

AI SHOULD detect capabilities rather than browser names.

---

# 280. AI UA Rule

AI MUST NOT introduce UA sniffing unless solving a documented browser-specific defect or equivalent explicit requirement.

---

# 281. AI Progressive-Enhancement Rule

AI SHOULD provide a simpler functional path before making a new optional browser capability mandatory.

---

# 282. AI Polyfill Rule

AI MUST NOT add a polyfill merely because a feature is "new."

It MUST establish that the declared target needs it.

---

# 283. AI Minimal-Polyfill Rule

AI SHOULD use the narrowest compatibility implementation that satisfies the required target.

---

# 284. AI Proposal Rule

AI MUST NOT enable broad experimental proposal polyfills without explicit product/tooling approval.

---

# 285. AI Global-Mutation Rule

AI SHOULD review whether a polyfill mutates native/global objects before adopting it.

---

# 286. AI Transpilation Rule

AI MUST distinguish syntax transpilation from runtime API polyfilling.

---

# 287. AI CSS Rule

AI SHOULD use natural CSS fallback and `@supports` before browser-specific CSS branches.

---

# 288. AI Prefix Rule

AI SHOULD rely on the configured CSS toolchain for vendor prefixes where possible.

---

# 289. AI Native-Control Rule

AI MUST NOT replace native controls merely to normalize minor cross-browser visual differences.

---

# 290. AI Capability-Fallback Rule

For advanced capabilities AI SHOULD ask:

```text
What happens if this API does not exist?
What happens if permission is denied?
What happens if the API call fails?
```

---

# 291. AI Unsupported-Browser Rule

AI MUST NOT block an unknown browser purely because the browser brand is absent from an allowlist.

---

# 292. AI Security Rule

AI MUST NOT weaken security controls to retain obsolete browser compatibility.

---

# 293. AI Browser-Hack Rule

Any AI-generated browser-specific workaround MUST include a clear reason and removal condition.

---

# 294. AI Dependency Rule

AI SHOULD check browser compatibility requirements before adding/upgrading foundational frontend dependencies.

---

# 295. AI Test Rule

When introducing a web-platform capability, AI SHOULD add tests covering representative supported browser engines where the risk warrants it.

---

# 296. AI SSR Rule

AI MUST NOT use server-side browser guessing as a substitute for client-side feature detection without an architectural reason.

---

# 297. AI Telemetry Rule

AI MUST NOT collect full high-entropy browser fingerprinting data merely for compatibility debugging.

---

# 298. AI Gold Rule

When uncertain:

```text
Native interoperable capability
>
Progressive enhancement
>
Small targeted polyfill
>
Documented compatibility adapter
>
Browser-specific workaround
```

And:

```text
Feature detection
>
Browser detection
```

---

# 299. Golden Browser & Compatibility Rules

**1. Browser support is an explicit product contract.**

**2. Browser support policy, capability baseline, build target, runtime detection, and test matrix are separate but connected concerns.**

**3. Every production web product defines supported environments.**

**4. "Modern browser" without a defined policy is not a support standard.**

**5. Support tiers distinguish fully supported, best-effort, and unsupported environments where useful.**

**6. Unsupported does not mean intentionally blocked.**

**7. Browser compatibility is informed by actual users, customer commitments, security, and maintenance cost.**

**8. Web Platform Baseline is the canonical vocabulary for broad feature interoperability where applicable.**

**9. Baseline status informs feature adoption but does not replace product policy.**

**10. Fixed and moving compatibility targets are chosen deliberately.**

**11. A moving Baseline/Browserslist target is not adopted accidentally.**

**12. Browser target configuration is centralized and version-controlled.**

**13. Build tools share one canonical browser target where possible.**

**14. Tool defaults do not silently establish support policy.**

**15. Browser-target changes receive architectural/product review.**

**16. Syntax transpilation and API polyfilling are different concerns.**

**17. Transpilation does not magically provide missing runtime APIs.**

**18. Progressive enhancement is the preferred compatibility architecture.**

**19. Core functionality uses the simplest sufficiently capable platform primitives.**

**20. Advanced capabilities enhance the experience where possible rather than becoming unnecessary prerequisites.**

**21. Native semantic HTML is a primary compatibility mechanism.**

**22. Complete no-JavaScript parity is not required unless the product contract requires it.**

**23. Feature detection is preferred to browser detection.**

**24. CSS `@supports` is used where conditional CSS capability detection is valuable.**

**25. Natural CSS fallback is preferred when it is sufficient.**

**26. `@supports` demonstrates parser support, not absence of browser bugs.**

**27. API presence does not prove every required behavior works correctly.**

**28. UA sniffing is reserved for narrowly documented exceptions.**

**29. Client Hints are not a substitute for feature detection.**

**30. Browser-specific hacks identify their affected browser/version, bug, test, owner, and removal condition.**

**31. Polyfills solve demonstrated support gaps rather than hypothetical old-browser concerns.**

**32. Polyfills are scoped as narrowly as practical.**

**33. Progressive enhancement is considered before adding a polyfill.**

**34. Polyfill size, execution cost, security, provenance, and license are reviewed.**

**35. Global-native mutation receives stronger compatibility review.**

**36. Experimental proposal polyfills are not broad production defaults.**

**37. A polyfill does not count as proof that every native semantic can be reproduced.**

**38. Polyfills have removal criteria.**

**39. Obsolete compatibility code is removed as the support floor advances.**

**40. CSS vendor prefixes are primarily generated by the standard toolchain.**

**41. Native controls are not rebuilt solely for pixel-identical browser rendering.**

**42. Browser-native visual differences are acceptable when usability and design requirements are met.**

**43. Optional device APIs always define absence and permission-denial behavior.**

**44. Camera integration does not automatically eliminate file-upload alternatives.**

**45. System share integration does not eliminate ordinary copy/share-link functionality.**

**46. Browser push is not the authoritative store of critical information.**

**47. Service Worker availability is not assumed to equal complete offline support.**

**48. Browser storage APIs are treated as failure-prone persistent resources, not infallible memory.**

**49. Third-party-cookie assumptions receive explicit compatibility/privacy review.**

**50. Secure-context-dependent features are tested in production-like HTTPS environments.**

**51. Compatibility testing includes actual browser execution, not static compatibility tables alone.**

**52. Tier 1 browsers execute critical product flows regularly.**

**53. Browser testing covers more than one engine family.**

**54. Chromium-only testing is not cross-browser testing.**

**55. Supported Safari/WebKit environments receive Safari/WebKit testing.**

**56. Supported Firefox/Gecko environments receive Firefox/Gecko testing.**

**57. Mobile compatibility receives mobile testing rather than desktop-browser inference.**

**58. Some critical mobile testing occurs on real hardware where product risk justifies it.**

**59. Cross-browser compatibility targets functional usability rather than exact pixel identity.**

**60. Current browser releases are tested because evergreen browser updates can introduce regressions.**

**61. Preview/beta browser testing may be used as early warning for high-risk products.**

**62. Dependencies are reviewed for browser-support requirements.**

**63. A dependency that raises the browser floor can constitute a breaking product change.**

**64. Transitive and lazy-loaded code follows the same browser compatibility contract.**

**65. Worker/service-worker code targets its own declared runtime correctly.**

**66. Browser-target code and server-runtime code do not share inappropriate polyfill assumptions.**

**67. Unsupported-browser decisions are based on essential capability where practical.**

**68. Unknown but capable browsers are not rejected merely for being unknown.**

**69. Unsupported environments fail safely with understandable guidance rather than blank screens or reload loops.**

**70. Unsupported-browser guidance remains browser-vendor neutral unless a vendor-specific capability is genuinely required.**

**71. Security controls are never weakened simply to retain obsolete browser compatibility.**

**72. Compatibility code respects CSP and supply-chain security.**

**73. Remote compatibility services receive security, availability, and privacy review.**

**74. Browser bugs are isolated behind the narrowest practical workaround.**

**75. Compatibility adapters describe capabilities rather than browser identities.**

**76. Feature flags and capability detection solve different problems and may be combined.**

**77. Experiments account for browser capability as a potential confounding variable.**

**78. RUM/observability monitors meaningful compatibility failures without unnecessary fingerprinting.**

**79. Browser/version-specific client-error spikes are investigated.**

**80. Newly adopted web APIs have documented support, fallback, and test strategies.**

**81. Baseline status does not replace security, accessibility, or product-quality review.**

**82. Browser support documentation has one authoritative source.**

**83. Exact version lists are not copied across unrelated documents.**

**84. Browser support is reviewed periodically and during major framework/dependency changes.**

**85. Dropping supported browser versions is a product decision, not merely a build-tool cleanup.**

**86. Browser-support removals consider customer commitments and security requirements.**

**87. Dropping browser support includes removing obsolete transforms, polyfills, hacks, and tests.**

**88. Framework upgrades are checked for browser-support changes.**

**89. Build-tool and minifier upgrades are compatibility-relevant changes.**

**90. Generated bundles—not only source code—must remain compatible with the declared target.**

**91. SSR does not invent client capabilities merely from browser names when progressive enhancement works.**

**92. Responsive/device adaptation and browser compatibility remain separate concerns.**

**93. PWA capability and browser support remain separate concerns.**

**94. Accessibility remains mandatory across every supported browser.**

**95. Browser defaults such as focus, zoom, autocomplete, and text selection are preserved unless deliberately replaced.**

**96. Compatibility debt is tracked and removed rather than becoming permanent archaeology.**

**97. A supported-browser defect affecting a critical workflow is a product defect, not "just a browser issue."**

**98. If a new browser feature has no defined behavior when unavailable, the feature design is incomplete.**

**99. If the code checks a browser name when it really needs to know about a capability, the compatibility abstraction is wrong.**

**100. If the team cannot state its support policy, build target, polyfill strategy, fallback model, and test matrix, browser compatibility is accidental rather than governed.**

---

# 300. Canonical Browser & Compatibility Standard

The organizational standard is:

> **Browser compatibility is governed as an explicit product and engineering contract. Every production web product defines which browser environments it supports, which environments receive best-effort compatibility, which capability baseline its implementation assumes, how that baseline is represented in build tooling, and which representative environments must pass release testing. Browser-support policy is not inferred from developer preference, framework defaults, or whichever browser happened to be used during development.**

> **The organization uses web-platform capability information, including Web Platform Baseline where applicable, to evaluate feature interoperability while keeping product support policy distinct. A centralized machine-readable browser target such as Browserslist drives compatible transpilation, CSS processing, prefixing, linting, and related tooling. Moving targets are used only when an automatically advancing support floor is intentional; products requiring stable compatibility contracts may pin a fixed capability target and advance it through reviewed upgrades.**

> **Progressive enhancement is the preferred implementation model. Core user outcomes rely on the simplest sufficiently capable semantic platform primitives, while newer APIs improve convenience, integration, performance, or richness when available. Required functionality does not disappear simply because an optional advanced API is unavailable, and unsupported advanced capabilities degrade to deliberate alternatives wherever a meaningful fallback exists.**

> **Feature detection is preferred to browser identification. JavaScript tests for the capability it needs, CSS uses natural fallback or feature queries where appropriate, and permission-dependent APIs separately handle capability, permission, and runtime failure. User-agent or browser-specific branches are reserved for verified defects that cannot be isolated through capability detection; such branches document the affected versions, underlying defect, regression test, owner, and removal criteria.**

> **Compatibility transformations are explicit. Syntax transpilation, runtime API polyfills, CSS transformation, vendor prefixes, and browser-specific workarounds are treated as different mechanisms. A compiler does not imply runtime APIs are present, and an API polyfill is not assumed to reproduce every native security, performance, hardware, or integration semantic. Polyfills are introduced only for demonstrated support gaps, use maintained and governed dependencies, minimize global mutation and payload where practical, and define when they can be removed.**

> **Supported-browser behavior is verified through actual execution. The test matrix includes meaningful engine diversity, appropriate desktop and mobile coverage, browser-floor environments where the support contract requires them, current releases to detect regressions, and real-device testing where OS integration, touch, virtual keyboards, permissions, memory, or browser chrome materially affect behavior. Cross-browser compatibility targets correct functionality, accessibility, layout, and interaction—not identical antialiasing or native-control pixels.**

> **Unsupported environments fail safely. Where an application lacks an essential capability, a small compatible preflight or static fallback explains the limitation and provides neutral update/alternative guidance instead of presenting a blank screen, reload loop, or misleading partial interface. Unknown browsers that satisfy required capabilities are not rejected merely because their brand is absent from an allowlist, and legacy support never justifies weakening required authentication, cryptography, cookie, transport, CSP, or other security protections.**

> **Compatibility applies to the complete dependency and delivery chain. Frameworks, UI libraries, direct and transitive packages, lazy chunks, workers, service workers, third-party scripts, transpilers, minifiers, CSS processors, and polyfill libraries are reviewed against the same declared support target. A dependency or framework upgrade that raises required browser capabilities is treated as a compatibility change and may constitute a breaking product change.**

> **Browser compatibility is observable and actively maintained. Privacy-conscious RUM and client-error telemetry may identify startup failures, unsupported capabilities, provider/API errors, and browser-specific regressions; current browser releases are continually exercised; browser workarounds and compatibility code carry removal conditions; and when the support floor advances, obsolete polyfills, transforms, tests, hacks, and documentation are removed rather than retained indefinitely.**

A production-grade browser compatibility architecture should make it easy to answer:

```text
Which browser environments are officially supported?
Which are best-effort?
What is the canonical capability/build target?
Is that target fixed or moving?
Who approves changing it?
Which Browserslist configuration represents it?
Which browsers/engines are in CI?
Which mobile environments are tested?
Which minimum/floor versions are actually verified?
Does this feature belong to Baseline Widely available, Newly available, or Limited availability?
Is that feature required for the core task?
Can it be progressively enhanced?
How do we detect it?
What happens when it is missing?
What happens when permission is denied?
Does a polyfill exist?
Does the polyfill fully cover the semantics we need?
How much does that compatibility code cost?
Does it mutate globals?
Who maintains it?
When can it be removed?
Does the build transpile syntax but forget the required API?
Could a dependency silently raise our browser floor?
Does a custom control behave correctly across engines?
Does Safari receive actual Safari testing?
Does Firefox receive actual Firefox testing?
Does mobile receive actual mobile testing?
What happens when an unknown browser has all required capabilities?
What happens when a browser cannot start the application?
Can the unsupported message render without the unsupported feature?
Are we weakening security for legacy compatibility?
Is this browser-specific workaround tied to an upstream defect and removal trigger?
Do RUM/errors show a browser-specific regression?
What compatibility code can be deleted when the support floor moves?
```

If those questions cannot be answered reliably, browser support is accidental rather than an engineered compatibility contract.

For the current compatibility vocabulary, Web Platform **Baseline** defines **Newly available** as interoperable across its core browser set and **Widely available** once 30 months have passed. Baseline 2026 is still the current developing annual set as of September 23, 2026. Browserslist has supported native Baseline queries since 2025, including `baseline widely available`, `baseline newly available`, and fixed-year targets. citeturn116986search0turn116986search2turn116986search4

The feature-detection rules above follow current MDN guidance: test capabilities rather than user-agent strings, and use CSS `@supports` for feature queries when needed. MDN also notes that `@supports` confirms a declaration is understood, but does **not** prove the implementation is bug-free or complete—hence the separate rule for targeted behavioral tests around known browser defects. citeturn626649search2turn626649search4turn626649search8

Polyfills should remain deliberate rather than universal. Current `core-js` guidance supports selective/target-driven inclusion and also documents important capabilities that cannot be fully polyfilled or are intentionally outside its scope. This reinforces the separation between transpilation, polyfilling, progressive enhancement, and true platform requirements. citeturn626649search1turn626649search6

A useful new 2026 quality gate is that **Lighthouse added a Baseline Features diagnostic audit on July 27, 2026**, allowing teams to surface the Baseline status of web-platform features detected on a page. It is useful as a diagnostic—not a substitute for the declared support contract and real-browser tests. citeturn116986search15

Canonical master placement:

**… → Components → Forms & Validation → Patterns → Accessibility → Responsive & Device → Browser & Compatibility → Reusability & Libraries → …**
