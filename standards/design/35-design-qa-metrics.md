---
id: "design-qa-metrics"
title: "Design QA, Critique, Visual Regression & UX Metrics"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "qa", "critique", "visual"]
applies_to: ["ui"]
related: ["component-variant-contract", "corporate-enterprise-visual", "content-microcopy"]
legacy_number: 115
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 63403
provenance: baseline

---

Firecrawl was invoked first as requested. Its search/scrape quota briefly rate-limited during research, so I supplemented source discovery with built-in web search and then completed source extraction through Firecrawl after the quota reset. The standard below uses NN/g, W3C/WAI, GOV.UK, Storybook, Google’s original HEART paper, and standardized UX-metrics sources.

# Design QA, Critique, Visual Regression & UX Metrics — Gold Standard 2026

**Canonical placement:** Design Operations → **Design QA, Critique, Visual Regression & UX Metrics** → Accessibility → Component & Pattern Standards → Engineering QA  
**Status:** Normative  
**Component baseline:** shadcn/ui + Radix/native semantics  
**Accessibility target:** WCAG 2.2 AA or higher  
**Testing baseline:** Storybook + browser-based interaction/accessibility/visual testing  
**Applies to:** design work, prototypes, component libraries, product UI, dashboards, maps, forms, responsive applications, design-system releases, usability studies, and production UX monitoring.

---

# 1. Purpose

Design quality MUST be verifiable.

A polished mockup is not evidence that a product is:

- usable;
- accessible;
- responsive;
- robust to real content;
- consistent with the design system;
- stable after implementation;
- successful in production.

The quality lifecycle is:

```text
design intent
↓
critique
↓
design review
↓
implementation
↓
design QA
↓
automated regression
↓
usability evidence
↓
production metrics
↓
iteration
```

Each layer answers a different question.

```text
Critique:
Is the design direction solving the right problem?

Design review:
Is the design ready to build?

Design QA:
Was the approved design implemented correctly
across realistic states and environments?

Visual regression:
Did a later code change alter approved appearance?

Usability testing:
Can representative users complete the task?

UX metrics:
Does experience quality remain healthy at scale?
```

A team MUST NOT substitute one layer for another.

Visual regression does not prove usability.

A usability study does not prove WCAG conformance.

An accessibility scanner does not prove screen-reader usability.

A high Net Promoter Score does not prove a workflow is efficient.

Google's original HEART paper explicitly argues that metrics should be triangulated with usability and field research rather than used alone or as a replacement for formative research.  
https://research.google.com/pubs/archive/36299.pdf

---

# 2. Rules

# 2.1 Critique is evaluation against objectives

A design critique MUST evaluate the work against an agreed:

- user need;
- product objective;
- task;
- constraint;
- design principle.

It MUST NOT be an open-ended vote on aesthetic preference.

NN/g defines design critique as analysing a design and giving feedback on whether it meets its objectives, rather than simply judging the work.  
https://www.nngroup.com/articles/design-critiques/

Bad:

```text
I don't like this layout.
```

Better:

```text
The primary review action competes visually with
three secondary controls, so the hierarchy does not
support the goal of processing alerts quickly.
```

---

# 2.2 Critique vs approval review

Teams MUST distinguish:

```text
Critique
=
improve unfinished work

Review gate
=
determine readiness against defined criteria
```

A critique SHOULD happen while the solution can still change economically.

An approval review SHOULD occur only when the relevant design work is substantially resolved.

NN/g distinguishes iterative standalone critiques from formal design reviews used to evaluate or approve work.  
https://www.nngroup.com/articles/design-critiques/

---

# 2.3 When to run critiques

Critiques SHOULD occur:

```text
after problem framing
before visual polish

after first viable interaction model

after major structural revision

before expensive prototype/build commitment

when evidence contradicts the current direction
```

Do NOT wait until implementation is nearly complete.

Early critique SHOULD focus on:

```text
user need
information architecture
interaction model
workflow
hierarchy
```

Later critique MAY focus more on:

```text
content
visual hierarchy
component composition
responsive behaviour
edge cases
```

---

# 2.4 Critique scope

Every critique MUST begin with an explicit scope.

Example:

```text
In scope:
• hierarchy of the detection-review page
• map/list interaction
• primary action placement

Out of scope:
• final colour palette
• export workflow
• mobile implementation
```

NN/g identifies clear scope as one of the foundations of effective critique.  
https://www.nngroup.com/articles/design-critiques/

A critique without scope tends to devolve into scattered preference comments.

---

# 2.5 Critique inputs

The presenter MUST provide enough context to evaluate the work.

Minimum context:

```text
user / audience
task
problem
constraints
success criteria
design maturity
specific feedback requested
known unresolved questions
```

The presenter SHOULD NOT spend most of the meeting defending individual visual decisions.

NN/g recommends reiterating objectives, relevant user needs/tasks, and specific feedback requests before critique.  
https://www.nngroup.com/articles/design-critiques/

---

# 2.6 Critique roles

Canonical roles:

| Role | Responsibility |
|---|---|
| Presenter | Explains objective, constraints, current solution and questions |
| Facilitator | Protects scope, time, participation and psychological safety |
| Critiquer | Provides evidence-based observations and questions |
| Recorder | Captures decisions, issues, evidence and actions |
| Domain specialist | Validates specialised business/scientific assumptions where required |

The facilitator and recorder MAY be the same person in a small team.

The presenter SHOULD NOT also facilitate contentious critique.

NN/g recommends a designated facilitator and notes that rotating facilitation can reduce domination by one participant and strengthen shared critique practice.  
https://www.nngroup.com/articles/design-critiques/

---

# 2.7 Critique timebox

A normal focused critique SHOULD be approximately:

```text
25–45 minutes
```

for one coherent design question.

Complex multi-surface work MAY require several separate sessions.

A two-hour meeting covering an entire product SHOULD NOT be considered one critique.

A useful default:

```text
5 min   context
5 min   silent inspection
20 min  critique
10 min  decisions / next steps
```

Timeboxing SHOULD be adapted to work complexity.

---

# 2.8 Silent inspection

For visually complex work, critique SHOULD begin with a short silent inspection period.

This reduces:

- anchoring on the first speaker;
- presenter over-explanation;
- immediate taste reactions.

Participants SHOULD record observations before group discussion.

---

# 2.9 Evidence ladder

Critique comments SHOULD distinguish evidence strength.

Canonical evidence ladder:

```text
Level 5 — observed production / research evidence
Level 4 — established accessibility or platform requirement
Level 3 — design-system / domain standard
Level 2 — heuristic or professional hypothesis
Level 1 — personal preference
```

A Level 1 preference MAY still be discussed.

It MUST NOT be presented as a usability defect.

---

# 2.10 Taste vs usability

The following are primarily taste:

```text
I prefer the green version.

This feels too plain.

I don't like rounded cards.
```

The following may be defects:

```text
The primary action is difficult to identify.

The text contrast fails the required threshold.

The tab sequence does not follow visual order.

The layout clips at 200% zoom.

Four of five test participants could not locate export.
```

The facilitator SHOULD ask:

```text
What objective or evidence does this concern relate to?
```

when subjective feedback is presented as fact.

---

# 2.11 Critique language

Feedback MUST target the work, not the designer.

Use:

```text
The hierarchy makes the secondary action appear primary.
```

Not:

```text
You made the wrong button primary.
```

Use questions and observations before directives.

NN/g emphasises critique as conversation rather than command and notes the vulnerability involved in presenting unfinished work.  
https://www.nngroup.com/articles/design-critiques/

---

# 2.12 Psychological safety

Critique facilitators MUST prevent:

- ridicule;
- sarcasm;
- status-based dismissal;
- personal criticism;
- piling on;
- retrospective blame.

Senior participants SHOULD speak later when their opinion is likely to anchor the group.

The facilitator MUST actively solicit perspectives from quieter participants.

Critique MUST remain safe enough for unfinished work to be shown early.

---

# 2.13 Critique decision log

Every consequential critique MUST produce a record.

Minimum fields:

```text
date
artifact/version
objective
participants
observations
evidence
decision
unresolved question
owner
follow-up date
```

A critique is incomplete until participants can determine:

```text
what changed
what did not change
and why
```

NN/g's current follow-up guidance stresses closing the feedback loop after critique rather than allowing comments to disappear after the meeting.  
https://www.nngroup.com/articles/after-design-critique/

---

# 2.14 Critique decisions

Feedback is input.

It is not automatically a design requirement.

The accountable design owner MUST decide whether to:

```text
adopt
investigate
test
defer
reject
```

each material issue.

Rejected feedback SHOULD record rationale when the issue was significant or likely to recur.

---

# 2.15 Design review gates

The canonical design review sequence is:

```text
0. Self-review
1. Peer design review
2. Content review
3. Accessibility review
4. Brand / visual-system review
5. Engineering feasibility review
6. Domain / security / data review where applicable
7. Final design sign-off
```

Reviews MAY overlap.

A gate MUST NOT silently disappear merely because delivery is urgent.

Urgent exceptions MUST be documented with follow-up ownership.

---

# 2.16 Gate 0 — Self-review

The designer MUST complete self-review before requesting peer approval.

Self-review MUST include:

```text
user need
requirements
flows
states
components
tokens
responsive behaviour
content
accessibility considerations
edge cases
```

Reviewers MUST NOT be used as basic spellcheck or token-lint substitutes.

---

# 2.17 Gate 1 — Peer design review

Peer review MUST assess:

- information hierarchy;
- interaction consistency;
- pattern selection;
- layout;
- responsive transform;
- component composition;
- edge cases;
- design-system compliance.

At least one reviewer SHOULD be independent of the immediate design work.

---

# 2.18 Gate 2 — Content review

Content review MUST occur for:

- new terminology;
- errors;
- destructive actions;
- permissions;
- onboarding;
- legal/support content;
- scientific claims.

The Content, Microcopy, Help & Onboarding standard remains authoritative.

---

# 2.19 Gate 3 — Accessibility review

Accessibility review MUST occur before final design sign-off for non-trivial new interaction patterns.

The review SHOULD cover:

```text
semantic model
keyboard interaction
focus order
focus visibility
screen-reader naming
zoom/reflow
colour contrast
target size
error communication
reduced motion
```

WCAG 2.2 requires keyboard access for functionality and specifies requirements around resizing, reflow, focus, contrast and related interaction.  
https://www.w3.org/WAI/WCAG22/quickref/

Accessibility review MUST NOT consist solely of running an automated scanner.

---

# 2.20 Gate 4 — Brand review

Brand review SHOULD focus on:

- approved identity assets;
- signature colour usage;
- imagery;
- typography;
- institutional/compliance marks.

Brand review MUST NOT override accessibility, usability or content clarity.

The Corporate & Enterprise Visual Standards remain authoritative.

---

# 2.21 Gate 5 — Engineering feasibility review

Engineering review MUST occur before expensive design decisions become fixed.

Engineering MUST evaluate:

```text
component reuse
state feasibility
data availability
latency
responsive behaviour
browser/platform constraints
performance
accessibility implementation
testability
```

A feasibility review MUST NOT be used to reject a necessary user requirement merely because the current codebase makes it inconvenient.

The result SHOULD identify:

```text
feasible as designed
feasible with modification
requires technical discovery
not feasible under stated constraint
```

---

# 2.22 Domain review

Specialised products MUST add domain review when the design encodes:

- legal meaning;
- scientific meaning;
- geospatial interpretation;
- financial calculation;
- healthcare semantics;
- access-control policy.

Designers MUST NOT independently define domain truth.

---

# 2.23 Design sign-off

Final design sign-off means:

```text
the design is sufficiently specified
to implement and verify without inventing
material interaction decisions during development
```

It does NOT mean:

```text
no design will ever change
```

---

# 2.24 Definition of Done — design

A design MUST NOT be marked `Ready for build` until applicable items are complete:

```text
user need / task is documented
primary flow is complete
error/empty/loading states exist
permission states exist
responsive transforms exist
content is reviewed
components are identified
tokens are identified
accessibility behaviour is specified
keyboard behaviour exists
long/short content has been considered
analytics events are identified where needed
known assumptions are documented
open questions are non-blocking
review gates are complete
design decision log is linked
```

---

# 2.25 Implementation Design QA

Design QA verifies implementation against the approved design and system contract.

Design QA SHOULD occur:

```text
during implementation
before feature completion
before release candidate
after major component/system upgrades
```

It MUST NOT be postponed exclusively until final release day.

---

# 2.26 QA environments

Design QA SHOULD use an environment containing:

- realistic production-like data;
- edge-case fixtures;
- supported browsers;
- supported device sizes;
- localisation fixtures.

A pristine demo account with idealised data is insufficient.

---

# 2.27 Token usage QA

QA MUST verify:

```text
colour tokens
spacing tokens
radius tokens
elevation tokens
typography tokens
layout tokens
state tokens
```

Reusable components MUST NOT contain unexplained arbitrary visual values where a canonical token exists.

Token drift SHOULD be tracked as a design-health metric.

---

# 2.28 Component adoption QA

The implementation SHOULD use canonical shadcn/ui-based system components where the required semantic pattern exists.

Design QA SHOULD flag:

```text
bespoke button where Button exists
bespoke dialog where Dialog exists
duplicated tabs
locally invented status badge
manual tooltip behaviour
```

unless an approved exception exists.

---

# 2.29 State coverage

Every relevant surface MUST be checked for:

```text
default
hover
focus-visible
active
selected
disabled
loading
empty
error
read-only
permission limited
partial data
offline
```

The exact matrix depends on the component.

"Happy path works" is not design completeness.

---

# 2.30 Loading QA

Loading states MUST be tested with actual delayed data.

QA SHOULD verify:

- no excessive layout shift;
- existing context remains visible where possible;
- action labels remain understandable;
- duplicate actions are prevented where required;
- skeletons reasonably approximate final geometry.

A loading state MUST NOT only be inspected in static design files.

---

# 2.31 Empty-state QA

Test separately:

```text
first-use empty
valid zero
filtered zero
permission empty
not-yet-processed
data-source failure
```

These are not interchangeable.

---

# 2.32 Error-state QA

QA MUST test:

```text
field validation
API error
timeout
partial panel failure
upload failure
permission failure
expired session
```

Errors MUST preserve user work where the Forms & Validation standard requires it.

---

# 2.33 Content extremes

Every reusable layout MUST be tested with:

```text
very short label
very long label
long person's/organisation name
large numeric values
zero
negative value
many tags
no tags
long translated text
long unbroken string
```

Design files SHOULD include content stress cases.

---

# 2.34 Localisation expansion

Components SHOULD be tested with pseudo-localisation.

A practical fixture SHOULD include approximately:

```text
30–50% longer strings
```

for layouts likely to encounter text expansion.

This is an engineering QA heuristic, not a guarantee of translation expansion for every language.

The interface MUST NOT depend on English text length.

---

# 2.35 RTL

Where RTL languages are supported—or where reusable system components are expected to support them—QA MUST verify:

```text
reading order
navigation mirroring
leading/trailing icons
chevrons
tables
charts
maps
form alignment
direction-sensitive animation
```

Semantic concepts such as:

```text
leading
trailing
start
end
```

SHOULD be preferred over arbitrary left/right assumptions.

---

# 2.36 Responsive QA

The QA matrix MUST include:

```text
compact/mobile
medium/tablet
desktop
wide desktop
```

plus intermediate widths where layout transitions occur.

Testing only canonical breakpoint pixels is insufficient.

QA SHOULD drag the viewport gradually through transition regions to identify layout instability.

---

# 2.37 Zoom testing

For web interfaces, QA MUST include browser zoom at:

```text
200%
```

and SHOULD include:

```text
400%
```

for reflow verification where WCAG requirements apply.

W3C's zoom technique explicitly tests content at 200% and requires all content and functionality to remain available. WCAG Reflow tests equivalent presentation at 320 CSS px, commonly reached from a 1280 CSS px viewport at 400% zoom.  
https://www.w3.org/WAI/WCAG22/Techniques/general/G142.html  
https://www.w3.org/WAI/WCAG22/quickref/#reflow

---

# 2.38 Keyboard-only QA

Every core workflow MUST be completable with a keyboard unless the underlying task intrinsically requires path-based input covered by an accessibility exception.

Test:

```text
Tab
Shift+Tab
Enter
Space
Arrow keys
Escape
Home/End where applicable
```

Focus MUST remain:

- visible;
- logical;
- recoverable;
- untrapped.

WCAG requires keyboard operability and prohibits keyboard traps.  
https://www.w3.org/WAI/WCAG22/Understanding/keyboard-accessible.html

---

# 2.39 Screen-reader QA

Complex or high-risk workflows MUST receive manual screen-reader testing.

At minimum verify:

```text
page title
headings
landmarks
control names
roles
states
errors
dialog announcements
table structure
status messages
dynamic updates
```

GOV.UK recommends direct assistive-technology testing and specifically calls for checking headings, links, landmarks, ARIA and editable controls.  
https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies

Automated axe checks supplement this work.

They do not replace it.

---

# 2.40 Dark-mode QA

If dark mode is supported, it MUST be tested independently.

Do not assume light-theme correctness transfers automatically.

Verify:

- contrast;
- elevation;
- selected states;
- map/chart palettes;
- disabled controls;
- focus;
- images/logos;
- system overlays.

---

# 2.41 Print QA

Any screen that is reasonably expected to be printed or saved as PDF MUST be tested in print mode.

Verify:

```text
page breaks
repeated headers where appropriate
hidden navigation
visible URLs where required
table overflow
charts
map attribution
confidentiality markings
background-colour dependence
```

Print output MUST NOT accidentally reveal UI content hidden from the user due to permissions.

---

# 2.42 Offline QA

Products with offline or intermittent-connectivity workflows MUST test:

```text
load while offline
lose connection during task
reconnect
queued change
sync conflict
stale local data
```

Products that do not support offline work SHOULD still fail explicitly rather than remain indefinitely in loading state.

---

# 2.43 Slow-network QA

Critical workflows SHOULD be tested under throttled network conditions.

Verify:

- progressive loading;
- stable layout;
- operation feedback;
- retry;
- duplicate-action prevention;
- timeout messaging.

A design that works only on local gigabit connectivity is incomplete.

---

# 2.44 Visual regression purpose

Visual regression testing protects approved visual behaviour from unintended changes.

Storybook visual testing captures rendered stories and compares them with previously approved baselines. It also supports CI checks that can block merging until visual changes are reviewed.  
https://storybook.js.org/docs/writing-tests/visual-testing

Visual regression MUST be considered:

```text
change detection
```

not:

```text
correctness proof
```

A baseline can contain a defect.

---

# 2.45 Storybook coverage

All shared visual components MUST have Storybook coverage.

High-value composite patterns SHOULD also have stories.

Canonical story dimensions include:

```text
variant
size
state
theme
content length
responsive width
locale/direction
interaction state
```

Full Cartesian combinations MAY be reduced where redundant, but high-risk combinations MUST remain covered.

---

# 2.46 Storybook coverage matrix

A mature component SHOULD map coverage explicitly.

| Dimension | Button | Input | Dialog | Table | Navigation |
|---|---:|---:|---:|---:|---:|
| Default | ✓ | ✓ | ✓ | ✓ | ✓ |
| Focus-visible | ✓ | ✓ | ✓ | ✓ | ✓ |
| Disabled | ✓ | ✓ | — | — | ✓ |
| Loading | ✓ | — | ✓ if relevant | ✓ | — |
| Invalid | — | ✓ | — | — | — |
| Long content | ✓ | ✓ | ✓ | ✓ | ✓ |
| Dark mode | ✓ | ✓ | ✓ | ✓ | ✓ |
| Compact width | ✓ | ✓ | ✓ | ✓ | ✓ |
| RTL | where supported | where supported | where supported | where supported | where supported |

The actual matrix MUST match the Component Design & Variant Contract.

---

# 2.47 Deterministic screenshots

Visual-regression fixtures MUST be deterministic.

Snapshots SHOULD control:

```text
viewport
browser/runtime version
date/time
locale
timezone
random data
network data
feature flags
authentication state
font loading
animation
```

Dynamic fixture data MUST NOT change on every run.

---

# 2.48 Stable data fixtures

Visual tests SHOULD use fixed fixtures.

Avoid:

```text
current date
live exchange rate
live production API
random user
random avatar
random chart data
```

unless that content is deliberately normalized before capture.

Visual regression SHOULD test visual contracts, not internet variability.

---

# 2.49 Font stability

Tests MUST wait for required fonts before taking screenshots.

Where possible, CI SHOULD use controlled/self-hosted font assets to reduce environment drift.

If font loading fails, the test SHOULD fail or clearly expose the missing asset rather than silently approve a fallback-font baseline.

---

# 2.50 Animation stability

Animations and transitions SHOULD be disabled, completed, or frozen for visual snapshots unless animation itself is the behaviour under test.

Tests MUST NOT capture at arbitrary points in transitions.

Reduced-motion rendering MAY provide a deterministic baseline.

---

# 2.51 Dynamic-content masking

Dynamic regions MAY be masked only where:

```text
their exact pixels are irrelevant to the visual contract
```

Examples MAY include:

```text
timestamp
random identifier
live thumbnail
```

Do NOT mask:

```text
layout
error state
value length
dynamic table rows
```

when those are exactly what the test should protect.

Masking too much converts a regression suite into a false-green generator.

---

# 2.52 Visual baseline

A visual baseline means:

```text
last intentionally accepted rendering
```

not:

```text
the most recent rendering
```

Storybook describes visual snapshots as comparisons against last known-good baselines.  
https://storybook.js.org/docs/writing-tests/visual-testing

---

# 2.53 Baseline approval

A baseline update MUST be treated as a design change.

It MUST NOT be auto-approved because:

```text
the CI changed
```

The reviewer MUST determine whether the difference is:

```text
intentional
unintentional
environmental/flaky
```

---

# 2.54 Baseline approval authority

For design-system components, baseline changes SHOULD require:

```text
design-system design owner
+
component engineering owner
```

For product-specific screens, approval SHOULD include at least:

```text
feature designer or qualified design reviewer
+
engineering reviewer
```

Brand-sensitive changes MAY additionally require brand review.

The author SHOULD NOT be the sole approver for broad system baseline changes.

---

# 2.55 CI gating

Visual tests SHOULD run in CI for:

- component-library changes;
- token changes;
- layout primitives;
- high-impact shared patterns.

Unapproved visual diffs MUST block merge where the visual test is designated required.

Storybook explicitly supports making visual-test checks required in the repository provider to prevent unreviewed UI changes from merging.  
https://storybook.js.org/docs/writing-tests/visual-testing

---

# 2.56 Flaky visual tests

A flaky test MUST be fixed.

It MUST NOT simply be repeatedly rerun until green.

Root causes commonly include:

```text
font timing
animation
async data
time/date
responsive race
browser rendering differences
random IDs/content
```

If a story cannot be made deterministic, its visual-test strategy MUST be reconsidered.

---

# 2.57 Automated accessibility in Storybook

Shared components SHOULD run automated accessibility checks as part of Storybook/component CI.

Storybook's accessibility tooling uses axe-core and is designed as an early automated QA layer; its documentation explicitly describes automated checks as a first line of QA rather than complete accessibility verification.  
https://storybook.js.org/docs/writing-tests/accessibility-testing

Manual keyboard and assistive-technology review remains required.

---

# 2.58 Defect severity model

Design/UX defects MUST use a common severity scale.

Canonical model:

| Severity | Definition | Release effect |
|---|---|---|
| S0 — Blocker | Fundamental safety, security, accessibility or task failure; release unusable for affected critical users | Release blocked |
| S1 — Critical | Critical task severely impaired, major accessibility barrier, serious data/action misunderstanding | Release blocked unless executive risk exception |
| S2 — Major | Material usability or consistency failure with workaround | Must be resolved before general release unless explicitly deferred |
| S3 — Moderate | Noticeable degradation that does not prevent task completion | May ship with owner/date |
| S4 — Minor | Cosmetic or low-impact inconsistency | Backlog / opportunistic |

Severity MUST describe user impact.

It MUST NOT describe how difficult the issue is to code.

---

# 2.59 Severity dimensions

Severity SHOULD consider:

```text
impact
frequency
reach
recoverability
risk
```

A useful mental model:

```text
Severity
≈
impact × likelihood × affected population
adjusted for recoverability and domain risk
```

This is a prioritisation model, not a literal mathematical requirement.

---

# 2.60 S0 examples

Examples:

```text
user can submit destructive operation against wrong record

keyboard focus becomes permanently trapped in core workflow

screen-reader user cannot complete mandatory account creation

wrong financial/environmental value is presented as authoritative

critical user data becomes visually associated with another record
```

S0 MUST block release.

---

# 2.61 S1 examples

Examples:

```text
primary workflow impossible at supported mobile width

required modal has no accessible name

critical validation error is invisible to screen reader

delete action appears to target one object but deletes a broader scope
```

S1 normally blocks release.

---

# 2.62 S2 examples

Examples:

```text
filter state is lost when returning from record detail

important translated labels overlap controls

200% zoom makes a secondary but important action unreachable

dark-mode chart legend becomes difficult to distinguish
```

---

# 2.63 S3 examples

Examples:

```text
spacing differs from token

secondary heading hierarchy is inconsistent

low-frequency empty state uses outdated terminology

non-critical icon is misaligned
```

---

# 2.64 S4 examples

Examples:

```text
1–2 px optical alignment issue

minor copy punctuation inconsistency

rare decorative border mismatch
```

A team MUST NOT classify an accessibility barrier as cosmetic merely because the page "looks fine."

---

# 2.65 Defect-response SLA

Canonical internal target:

| Severity | Triage | Resolution target |
|---|---|---|
| S0 | Immediate | Before release / emergency patch |
| S1 | Same working day | Before release or ≤1 business day in production |
| S2 | ≤1 business day | Before planned release or ≤5 business days |
| S3 | ≤5 business days | Planned within 30 days or next relevant iteration |
| S4 | Normal backlog | Opportunistic / design-debt cycle |

Regulated, safety-critical or contractual products MAY require stricter SLA.

A missed SLA MUST result in explicit risk acceptance, not silent age.

---

# 2.66 Defect reopening

A defect MUST be reopened when:

```text
the original acceptance criteria still fail
the fix creates equivalent failure elsewhere
the test environment hid the original issue
```

Closing a ticket is not evidence of resolution.

---

# 2.67 UX measurement principles

UX measurement MUST begin from an experience goal.

Google's HEART approach uses:

```text
Goal
↓
Signal
↓
Metric
```

and cautions against selecting metrics simply because they are easy to collect.  
https://research.google.com/pubs/archive/36299.pdf

Every UX metric SHOULD answer:

```text
What decision will this metric inform?
```

If there is no answer, the metric SHOULD NOT be collected merely for dashboard completeness.

---

# 2.68 Task success

Task success measures whether users achieve the intended outcome.

Example:

```text
Goal:
Review a canopy-loss detection

Success:
User correctly identifies evidence,
records a review decision,
and saves it
```

Report:

```text
successful
partially successful
failed
```

criteria before testing.

Do NOT change the success definition after viewing results merely to improve the score.

---

# 2.69 Time on task

Time on task measures efficiency.

It MUST be interpreted with task quality.

A faster task is not necessarily better if users:

- make more errors;
- misunderstand consequences;
- skip required evidence.

Time SHOULD be reported using robust statistics such as median where distributions are skewed.

---

# 2.70 Error rate

UX error rate SHOULD define what counts as an error.

Possible errors:

```text
incorrect value
wrong navigation branch
invalid submission
undo after mistake
failed search
misinterpreted control
```

System errors and user interaction errors SHOULD be distinguished.

---

# 2.71 Click/path metrics

Path analysis MAY reveal:

- detours;
- loops;
- abandonment;
- repeated backtracking.

A longer click path is not inherently worse.

It MAY reflect:

```text
necessary review
progressive disclosure
safety confirmation
```

Metrics must be interpreted against the intended task.

Google's HEART paper similarly notes that raw behavioural metrics can be ambiguous—for example, additional page views can mean either engagement or confusion.  
https://research.google.com/pubs/archive/36299.pdf

---

# 2.72 SUS

The System Usability Scale (SUS) MAY be used as a standardized measure of perceived usability.

SUS SHOULD be used consistently if longitudinal comparison is required.

It MUST NOT be interpreted as direct observation of actual task success.

Do not casually rewrite standardized items if benchmark comparability matters.

---

# 2.73 SUPR-Q

SUPR-Q MAY be used for website experience where broader perception dimensions are relevant.

The standard instrument includes measures relating to:

```text
usability
trust / credibility
appearance
loyalty
```

and an overall experience score.  
https://measuringu.com/product/suprq/

Teams MUST verify licensing and benchmark requirements before institutional use.

---

# 2.74 Standardized questionnaires

A standardized questionnaire MUST be administered consistently.

Teams MUST NOT:

```text
remove inconvenient questions
change the scale
change score computation
reinterpret scale anchors
```

and still claim direct benchmark equivalence.

If the instrument is modified materially, report it as an adapted measure.

---

# 2.75 NPS

NPS MAY be tracked as a loyalty/recommendation metric.

It MUST NOT be used alone as the UX quality score.

NN/g describes NPS as easy to understand but insufficiently nuanced for detailed design decisions.  
https://www.nngroup.com/videos/nps-ux/

Recent evidence reviews likewise note that NPS is not a diagnostic measure and is not consistently superior to traditional satisfaction measures.  
https://measuringu.com/report-card-for-the-nps/

NPS MUST NOT replace:

- task success;
- usability research;
- error analysis;
- support data.

---

# 2.76 HEART

HEART categories are:

```text
Happiness
Engagement
Adoption
Retention
Task Success
```

Google developed HEART to complement business/technical metrics with user-centred experience measures.  
https://research.google.com/pubs/archive/36299.pdf

Not every product MUST use every HEART category.

For mandatory enterprise software, high engagement MAY reflect required usage rather than delight.

Google's original paper explicitly notes that Engagement may be less meaningful in some enterprise contexts.  
https://research.google.com/pubs/archive/36299.pdf

---

# 2.77 HEART mapping example

For an environmental monitoring product:

| HEART dimension | Goal | Signal | Example metric |
|---|---|---|---|
| Happiness | Analysts trust review workflow | Positive perceived trust/ease | SUS/SUPR-Q subscale or targeted survey |
| Engagement | Review tools support active analysis | Relevant repeat analytical interaction | Reviewed detections per active analyst, contextualised |
| Adoption | New teams reach first operational value | Workspace reaches first real review | % workspaces reviewing first detection within 7 days |
| Retention | Operational teams continue workflow | Repeated review activity | Active operational teams by cohort |
| Task Success | Analysts complete review accurately | Completed without correction | Success rate, median time, error rate |

The table MUST be adapted to actual product goals.

---

# 2.78 Instrumentation contract

UX events MUST use governed analytics names.

Example:

```text
detection_review_started
detection_evidence_opened
detection_review_completed
filter_applied
export_started
export_completed
validation_error_shown
```

Events SHOULD capture meaningful product state.

Avoid meaningless instrumentation such as:

```text
button_clicked
div_opened
thing_selected
```

without semantic context.

---

# 2.79 Event properties

Useful properties MAY include:

```text
workflow
surface
entity_type
filter_count
result_count_bucket
completion_state
error_type
input_method
```

Sensitive data MUST NOT be included without Security/privacy approval.

Raw search terms, coordinates, account information, or sensitive dataset names may require special treatment.

---

# 2.80 Event semantics

Analytics events MUST have:

```text
name
definition
trigger
properties
owner
retention/privacy classification
```

One event name MUST NOT mean different things across products.

Data & Database/API standards govern storage and transport.

---

# 2.81 UX metrics dashboards

A UX dashboard SHOULD combine:

```text
behaviour
attitude
quality
delivery health
```

rather than presenting only engagement.

---

# 2.82 Design-health metrics

A mature design-health dashboard MAY track:

```text
open accessibility violations
visual-regression failures
token drift
canonical component adoption
design defects escaped to production
rework rate
design-debt backlog
average defect age
usability task success
support themes
```

These metrics measure system health, not individual designer performance.

---

# 2.83 Accessibility-violation metric

Track:

```text
open violations by severity
new violations per release
mean age
reopened violations
```

Do NOT reward teams merely for reducing issue count by suppressing automated rules.

---

# 2.84 Token-drift metric

Token drift MAY be defined as:

```text
number or percentage of reusable UI declarations
using unapproved visual values
```

It SHOULD distinguish intentional exception from accidental divergence.

---

# 2.85 Component-adoption metric

Track use of:

```text
canonical component
approved extension
legacy component
bespoke duplicate
```

The goal is not 100% reuse at any cost.

The goal is reducing unnecessary divergence.

---

# 2.86 Rework rate

Design rework MAY measure:

```text
material design changes after engineering implementation began
```

The metric SHOULD identify causes:

```text
missing requirement
late stakeholder input
technical constraint discovered late
usability finding
content gap
design defect
```

A high rework rate is not automatically a designer-performance issue.

It may indicate poor discovery or review governance.

---

# 2.87 Design-debt backlog

Design debt SHOULD be tracked similarly to technical debt.

Each item SHOULD include:

```text
problem
user impact
system impact
affected surfaces
severity
owner
age
recommended resolution
```

Design debt MUST NOT become a permanent bucket for accessibility blockers.

---

# 2.88 Usability testing integration

Usability testing SHOULD occur throughout the lifecycle.

GOV.UK guidance notes that usability testing can be used from early prototypes through iterative improvement and recommends translating recurring issues into design changes that are then tested again.  
https://www.gov.uk/guidance/usability-testing-qualitative-studies

Canonical loop:

```text
question
↓
study
↓
observation
↓
finding
↓
design change
↓
retest
```

---

# 2.89 Qualitative sample size

For focused formative qualitative usability testing, approximately:

```text
5 participants
per materially distinct user group
```

is a useful starting heuristic—not a statistical law.

NN/g recommends around five users for many qualitative usability studies while explicitly noting exceptions for multiple user groups, quantitative work and other methods.  
https://www.nngroup.com/articles/how-many-test-users/

The team MUST increase or restructure sampling when:

- user groups behave differently;
- tasks differ materially;
- safety/regulated risks justify broader evidence;
- findings remain unstable;
- saturation has not been reached.

---

# 2.90 Quantitative studies

Quantitative usability measurement MUST NOT use the five-user heuristic.

Sample size SHOULD be planned using:

```text
expected effect
variance
confidence interval
statistical power
segmentation needs
```

NN/g explicitly distinguishes quantitative studies from small formative qualitative tests.  
https://www.nngroup.com/articles/how-many-test-users/

For consequential benchmarking, involve an appropriately qualified researcher/statistician.

---

# 2.91 Moderated testing

Moderated testing SHOULD be preferred when:

- workflow is complex;
- reasoning matters;
- follow-up questions are important;
- prototype is fragile;
- specialist users require context;
- exploratory research is needed.

The moderator MUST avoid coaching the participant through the interface being evaluated.

---

# 2.92 Unmoderated testing

Unmoderated testing MAY be preferred when:

- tasks are well defined;
- prototype/live product is stable;
- larger or geographically distributed samples are useful;
- researcher follow-up is not essential.

NN/g defines remote unmoderated testing as asynchronous task completion without a live facilitator, typically with screen/voice recording, while moderated remote testing retains a live facilitator.  
https://www.nngroup.com/articles/remote-usability-testing-study-guide/

---

# 2.93 Remote testing

Remote testing SHOULD replicate the participant's realistic environment when that environment matters.

Researchers MUST account for:

```text
screen size
network quality
work interruptions
corporate device restrictions
assistive technology
```

Remote testing is not merely an in-person protocol moved into a video call.

---

# 2.94 Study tasks

Tasks MUST describe a user goal without exposing the interface solution.

Bad:

```text
Click Filters, select Pahang and press Apply.
```

Good:

```text
Find detections in Pahang from the last 7 days
with confidence of at least 80%.
```

Tasks SHOULD have predefined success criteria.

---

# 2.95 Pilot testing

Every non-trivial usability study SHOULD be piloted before full recruitment.

Pilot sessions help detect:

- ambiguous tasks;
- broken prototypes;
- unrealistic timing;
- instrumentation failure;
- leading wording.

---

# 2.96 Synthesis

Qualitative research synthesis SHOULD separate:

```text
observation
interpretation
finding
recommendation
```

Example:

```text
Observation:
Participant opened Layer settings three times
while looking for confidence filters.

Interpretation:
They expected confidence to belong to map-layer configuration.

Finding:
Filter location did not match this participant's mental model.

Recommendation:
Investigate stronger filter affordance and test again.
```

Do NOT merge these into:

```text
Users hate the filter panel.
```

---

# 2.97 Evidence counting

For small qualitative studies, use transparent counts:

```text
3 of 5 participants
```

rather than faux-precision such as:

```text
60% of users
```

unless the work is explicitly quantitative and statistically designed.

One strong observation MAY still identify a severe defect when the consequence is catastrophic.

Frequency is not the only severity dimension.

---

# 2.98 Finding confidence

A finding SHOULD indicate evidence confidence.

Possible labels:

```text
Observed repeatedly
Observed once, high impact
Supported by analytics
Supported by accessibility requirement
Hypothesis requiring validation
```

Do NOT label an untested design opinion as:

```text
User insight
```

---

# 2.99 Closing the usability loop

Every significant research finding SHOULD map to:

```text
change
experiment
further research
accepted risk
no action with rationale
```

A research repository containing findings with no disposition is incomplete.

---

# 2.100 Retesting

S0–S2 usability issues SHOULD normally be retested after material redesign.

A screenshot review does not prove that the usability issue was fixed.

---

# 2.101 Credible findings

Design findings MUST distinguish:

```text
Fact:
what was observed/measured

Interpretation:
what it may mean

Recommendation:
what should be changed/tested
```

A credible report MUST NOT convert interpretation into fact.

---

# 2.102 Finding title

A finding title SHOULD describe the user-impacting problem.

Prefer:

```text
Reviewers could not distinguish verified detections
from high-confidence unverified detections
```

over:

```text
Status issue
```

---

# 2.103 Finding evidence

Every material finding MUST provide evidence.

Possible evidence:

```text
session observation
quote
task failure
analytics
support tickets
accessibility requirement
visual-regression evidence
production defect
```

Quotes SHOULD support findings.

They MUST NOT substitute for analysis.

---

# 2.104 Reporting participant quotes

Quotes MUST be represented accurately.

Do NOT:

- edit meaning;
- fabricate grammar;
- present one quote as consensus.

Sensitive participant information MUST be removed according to research/privacy standards.

---

# 2.105 Finding scope

Findings MUST identify the population and context studied.

Example:

```text
5 GIS analysts
desktop workflow
existing enterprise customers
Pahang monitoring prototype
```

Do NOT report:

```text
Users cannot understand the workflow
```

when only one specialised segment was tested.

---

# 2.106 Recommendations

Recommendations SHOULD be proportional to evidence.

Strong evidence:

```text
MUST fix before release
```

Preliminary evidence:

```text
Test alternative hierarchy in next iteration
```

Research MUST NOT manufacture certainty for executive presentation.

---

# 2.107 Design evidence repository

The design/research system SHOULD preserve:

```text
decision log
critique outcomes
research findings
usability reports
accessibility findings
visual-regression approvals
design defects
metric definitions
```

Artifacts SHOULD be linked to the relevant product area and release.

---

# 2.108 Security alignment

QA MUST test permission-bound states.

Visual regression fixtures MUST NOT contain production secrets or personal data.

Analytics events MUST NOT leak protected values.

Research recordings and participant information MUST follow approved retention/access controls.

---

# 2.109 Data & Database alignment

UX metrics MUST use defined event and entity semantics.

Dashboard counts MUST NOT mix incompatible populations.

A metric definition SHOULD state:

```text
numerator
denominator
population
time window
exclusions
```

where relevant.

---

# 2.110 API alignment

QA MUST include API-state behaviour such as:

```text
success
validation rejection
permission denial
rate limit
partial response
timeout
service unavailable
```

UI testing MUST NOT assume every API call returns immediately and successfully.

---

# 2.111 State Management alignment

QA MUST verify:

```text
reload
Back/Forward
deep link
refresh
multi-tab state
optimistic update
rollback
```

where relevant.

Transient test state MUST NOT mask incorrect durable-state ownership.

---

# 2.112 Forms & Validation alignment

QA MUST cover:

- required fields;
- invalid values;
- server errors;
- preserved input;
- error summary;
- focus;
- successful submit;
- duplicate submit.

The Forms & Validation standard remains authoritative.

---

# 2.113 Design Tokens alignment

Visual regression SHOULD provide particularly strong coverage for changes to:

```text
colour tokens
spacing
typography
radius
elevation
density
breakpoints
```

because one token change can affect many surfaces.

Token change PRs SHOULD trigger broad visual-regression review.

---

# 2.114 Component contract alignment

Every new shadcn/Radix-based shared component MUST include:

```text
stories
state coverage
interaction tests
a11y tests
visual baseline
```

as required by the Component Design & Variant Contract.

---

# 3. Anti-patterns

## 3.1 Critique by taste

```text
I just don't like it.
```

is not a usability finding.

---

## 3.2 Executive veto disguised as critique

A senior stakeholder MUST NOT convert personal preference into user evidence through authority.

---

## 3.3 Critique after build

Do NOT wait until implementation is nearly complete to invite design feedback.

---

## 3.4 Unbounded critique

Do NOT critique every aspect of an entire product in one session.

---

## 3.5 Solution-first feedback

Avoid:

```text
Move this button to the right.
```

before articulating the underlying problem.

---

## 3.6 Design-by-vote

Major design decisions MUST NOT be determined by majority aesthetic voting.

---

## 3.7 Feedback without closure

Do NOT solicit critique and then leave feedback with no disposition.

---

## 3.8 Design review as ceremony

A review gate MUST NOT become:

```text
looks good 👍
```

with no criteria.

---

## 3.9 Accessibility at the end

Do NOT first evaluate keyboard/screen-reader feasibility after development completes.

---

## 3.10 Happy-path QA only

Do NOT approve a feature because the ideal state looks correct.

---

## 3.11 Single-device QA

Do NOT test only the designer's preferred laptop/browser.

---

## 3.12 Breakpoint screenshots only

Do NOT inspect only exactly:

```text
375
768
1440
```

pixels.

Test transition widths.

---

## 3.13 English-only stress testing

Do NOT approve components that only work with short English labels.

---

## 3.14 Automated-a11y-only approval

Axe passing does not prove accessibility.

---

## 3.15 Screenshot baseline laundering

Do NOT approve visual diffs solely to make CI green.

---

## 3.16 Mask everything dynamic

Do NOT mask content that should actually be protected by regression tests.

---

## 3.17 Flake rerun culture

Do NOT repeatedly rerun failed snapshots until one happens to pass.

---

## 3.18 Baseline owned by author only

High-impact baseline changes SHOULD NOT be self-approved.

---

## 3.19 Severity by engineering effort

A two-line code fix can still be S0.

A two-week cosmetic fix can still be S4.

---

## 3.20 Accessibility classified cosmetic

An invisible keyboard focus indicator is not a "visual polish" defect.

---

## 3.21 UX metric vanity

Do NOT track:

```text
page views
clicks
time in app
```

and call them UX success without linking them to a user goal.

Google's HEART work explicitly warns that raw usage metrics can be ambiguous.  
https://research.google.com/pubs/archive/36299.pdf

---

## 3.22 NPS as UX score

Do NOT report NPS as proof that a specific workflow is usable.

https://www.nngroup.com/videos/nps-ux/

---

## 3.23 Five-user absolutism

Do NOT apply the qualitative five-user heuristic to quantitative benchmarking or materially different user populations.

https://www.nngroup.com/articles/how-many-test-users/

---

## 3.24 Percentage theatre

Do NOT write:

```text
80% of users failed
```

from an informal five-person qualitative study as though it were population estimation.

---

## 3.25 Finding inflation

Do NOT call a single stakeholder opinion:

```text
research finding
```

---

## 3.26 Quote-led research

A memorable participant quote is not automatically the most important finding.

---

## 3.27 Dashboarding everything

A metric dashboard MUST NOT contain every available number.

Only metrics tied to decisions belong.

---

## 3.28 Design-health ranking of individuals

System-quality metrics MUST NOT be used as simplistic individual designer league tables.

---

# 4. Templates

# 4.1 Critique agenda template

```text
DESIGN CRITIQUE

Artifact:
Version:
Presenter:
Facilitator:
Recorder:
Date:

Objective
What user/product objective is this design trying to achieve?

Users / context
Who is this for?
What task are they completing?

Design maturity
[ ] concept
[ ] interaction
[ ] visual
[ ] implementation review

In scope
•
•
•

Out of scope
•
•
•

Known constraints
•
•
•

Specific feedback requested
1.
2.
3.

AGENDA

00:00–00:05  Context and objectives
00:05–00:10  Silent review
00:10–00:30  Evidence-based critique
00:30–00:38  Prioritise issues/questions
00:38–00:45  Decisions and owners

DECISIONS

Adopt:
•

Investigate / test:
•

Defer:
•

Reject with rationale:
•

Open questions:
•

Owners / follow-up:
•
```

---

# 4.2 Design QA checklist template

```text
DESIGN QA

Feature:
Build:
Designer:
Engineer:
Environment:
Date:

SYSTEM
[ ] Canonical components used
[ ] Tokens used
[ ] No unexplained magic values
[ ] Visual hierarchy matches approved design
[ ] Content matches approved terminology

STATES
[ ] Default
[ ] Hover
[ ] Focus-visible
[ ] Active
[ ] Selected
[ ] Disabled
[ ] Loading
[ ] Empty
[ ] Error
[ ] Read-only
[ ] Permission-limited
[ ] Partial/stale state

CONTENT
[ ] Short content
[ ] Long content
[ ] Large values
[ ] Zero values
[ ] Long unbroken value
[ ] Pseudo-localisation
[ ] Pluralisation
[ ] Date / number / unit formatting

RESPONSIVE
[ ] Compact
[ ] Tablet
[ ] Desktop
[ ] Wide
[ ] Intermediate transition widths
[ ] Portrait
[ ] Landscape where applicable

ACCESSIBILITY
[ ] Keyboard-only task completion
[ ] Focus visible
[ ] Focus order logical
[ ] No keyboard trap
[ ] 200% zoom
[ ] 400% / reflow where applicable
[ ] Screen-reader smoke test
[ ] Accessible names
[ ] Status/error announcements
[ ] Contrast
[ ] Reduced motion
[ ] Target sizes

THEMES / DIRECTIONS
[ ] Light mode
[ ] Dark mode
[ ] High contrast where supported
[ ] RTL where supported

ENVIRONMENT
[ ] Slow network
[ ] API failure
[ ] Timeout
[ ] Offline/disconnection
[ ] Reconnection
[ ] Print / PDF where relevant

DATA
[ ] No records
[ ] One record
[ ] Many records
[ ] Long identifiers
[ ] Restricted record
[ ] Stale data
[ ] Missing data

REGRESSION
[ ] Storybook stories updated
[ ] Visual diff reviewed
[ ] Automated a11y checks pass
[ ] Interaction tests pass

RESULT
[ ] Pass
[ ] Pass with accepted defects
[ ] Fail

Open defects:
•

Risk acceptance:
•

Approvers:
•
```

---

# 4.3 Defect report template

```text
DESIGN / UX DEFECT

ID:
Title:

Severity:
[ ] S0 Blocker
[ ] S1 Critical
[ ] S2 Major
[ ] S3 Moderate
[ ] S4 Minor

Environment
Build:
Browser/device:
Viewport:
Theme:
Locale:
Assistive technology:

Affected users / task:
•

Expected:
•

Actual:
•

Reproduction:
1.
2.
3.

Evidence
[ ] Screenshot
[ ] Video
[ ] Accessibility output
[ ] User research
[ ] Analytics
[ ] Visual diff
[ ] Other

Impact:
•

Frequency / reach:
•

Recoverability:
•

Related standard / token / component:
•

Proposed resolution:
•

Owner:
Due date:
Status:

Verification:
•

Regression test added:
[ ] Yes
[ ] No
[ ] Not applicable
```

---

# 4.4 UX finding template

```text
UX FINDING

Finding ID:
Study:
Date:

Finding
[One precise user-impact statement]

Population
[Who was studied]

Task / context
[What they were attempting]

Observation
[What objectively happened]

Evidence
[Counts, recordings, analytics, quotes, accessibility requirement]

Interpretation
[What the evidence may mean]

Severity
[S0–S4]

Confidence
[Repeated / single high-impact / analytics-supported / hypothesis]

Recommendation
[Proportional next action]

Decision
[Change / test / defer / accept risk / no action]

Owner:
Target:
Retest required:
```

---

# 4.5 Metrics dashboard template

```text
UX & DESIGN HEALTH

Period:
Product:
Owner:

OUTCOME METRICS

Task success
Current:
Target:
Trend:

Median time on task
Current:
Target:
Trend:

Task error rate
Current:
Target:
Trend:

Perceived usability
Instrument:
Current:
Benchmark / baseline:
Trend:

HEART

Happiness:
Metric:

Engagement:
Metric:

Adoption:
Metric:

Retention:
Metric:

Task Success:
Metric:

DESIGN SYSTEM HEALTH

Canonical component adoption:
Current:
Target:

Token drift:
Current:
Target:

Unapproved visual diffs:
Current:

A11y violations
S0:
S1:
S2:
S3/S4:

Average accessibility-defect age:

Design defects escaped to production:
Current period:

Rework rate:
Current:
Primary causes:

Design-debt backlog
S0/S1:
S2:
S3/S4:

RESEARCH

Usability studies completed:
Participants:
Major findings:
Findings closed:
Findings awaiting retest:

SUPPORT / FEEDBACK

Top UX-related ticket theme:
Volume:
Trend:

Zero-result help searches:
Trend:

DECISIONS

What changed because of these metrics?
1.
2.
3.
```

---

# 5. Release Acceptance Checklist

## Critique and review

- [ ] User/task objective is documented.
- [ ] Relevant critique occurred before final implementation.
- [ ] Critique scope was explicit.
- [ ] Feedback was tied to evidence/objectives.
- [ ] Decisions and rationale were logged.
- [ ] Peer design review passed.
- [ ] Content review passed.
- [ ] Accessibility review passed.
- [ ] Engineering feasibility review passed.
- [ ] Brand/domain review passed where required.

## Design completeness

- [ ] Primary flow complete.
- [ ] Loading state complete.
- [ ] Empty state complete.
- [ ] Error state complete.
- [ ] Permission state complete.
- [ ] Edge cases complete.
- [ ] Responsive transformations specified.
- [ ] Content approved.
- [ ] Analytics/event needs specified.
- [ ] Components/tokens identified.

## Implementation QA

- [ ] Tokens verified.
- [ ] Canonical components verified.
- [ ] Short content tested.
- [ ] Long content tested.
- [ ] Pseudo-localisation tested.
- [ ] RTL tested where applicable.
- [ ] Light theme tested.
- [ ] Dark theme tested.
- [ ] Mobile tested.
- [ ] Tablet tested.
- [ ] Desktop tested.
- [ ] Intermediate widths tested.
- [ ] 200% zoom tested.
- [ ] 400%/reflow tested where applicable.
- [ ] Keyboard path tested.
- [ ] Screen-reader path tested.
- [ ] Reduced motion tested.
- [ ] Print tested where applicable.
- [ ] Offline behaviour tested.
- [ ] Slow network tested.

## Regression

- [ ] Storybook coverage updated.
- [ ] Critical variants have stories.
- [ ] Visual screenshots deterministic.
- [ ] Fonts are stable.
- [ ] Animations are controlled.
- [ ] Dynamic masking is justified.
- [ ] Visual diffs reviewed.
- [ ] Baseline approvals are independent where required.
- [ ] CI visual gate passes.
- [ ] Automated accessibility gate passes.
- [ ] Interaction tests pass.

## Defects

- [ ] S0 count = 0.
- [ ] S1 count = 0 unless formally risk-accepted.
- [ ] S2 defects have explicit disposition.
- [ ] Remaining defects have owners.
- [ ] SLA dates exist.
- [ ] Relevant regression tests added.

## Usability evidence

- [ ] High-risk workflow was tested with representative users where required.
- [ ] Study method matches research question.
- [ ] Sample rationale is documented.
- [ ] Tasks have predefined success criteria.
- [ ] Findings distinguish observation from interpretation.
- [ ] Findings identify population/context.
- [ ] Severe findings have disposition.
- [ ] Material redesigns have been or will be retested.

## Metrics

- [ ] UX goals are defined.
- [ ] Signals map to goals.
- [ ] Metrics map to signals.
- [ ] Event definitions exist.
- [ ] Privacy/security review completed.
- [ ] Task-success definition is stable.
- [ ] Survey instrument is administered consistently.
- [ ] NPS is not used as sole UX measure.
- [ ] Metrics dashboard has an owner.
- [ ] Metrics lead to explicit decisions.

---

# 6. Canonical Summary

The Gold Standard quality model is:

```text
intent
↓
critique
↓
review
↓
build
↓
QA
↓
regression protection
↓
user evidence
↓
production measurement
↓
iteration
```

The governing rules are:

```text
Critique the work,
not the person.

Evaluate against objectives,
not taste.

Evidence outranks seniority.

Feedback is input,
not automatic instruction.

Log decisions.

Design review is a gate,
not a ceremony.

Ready for build means
states, content, responsiveness,
accessibility and constraints
are sufficiently specified.

QA the implemented product,
not only the design file.

Test hostile content,
not only ideal content.

Test loading,
empty,
error,
permission
and offline states.

Test between breakpoints.

Test keyboard operation.

Test with a screen reader.

Test 200% zoom,
and reflow requirements where applicable.

Automated accessibility is a first line,
not the finish line.

Visual regression protects
approved appearance from unintended change.

Baselines must be approved intentionally.

Never update screenshots
merely to make CI green.

Fix flaky tests.
Do not normalize rerunning them.

Severity describes user impact,
not engineering effort.

Use task success,
time,
errors
and attitudinal metrics together.

NPS is not a diagnostic UX metric.

HEART starts with goals,
then signals,
then metrics.

Do not apply the five-user heuristic
to quantitative research.

Qualitative findings need context,
not fake statistical precision.

Separate:
observation,
interpretation,
recommendation.

Every important finding must close a loop:
change,
test,
defer,
or accept risk.

Design-health metrics measure systems,
not individual designer worth.

A quality process is complete only when
the evidence changes decisions.
```

A **Gold Standard 2026** team MUST be able to answer:

```text
What objective was this design evaluated against?

Who reviewed it?

What evidence drove the decision?

Were all meaningful states designed?

Does the implementation survive real content?

Does it work at supported sizes?

Does it work at 200% zoom?

Can it be completed with a keyboard?

Can a screen-reader user understand it?

What happens when the network is slow?

What happens when data is missing?

Which visual changes are protected by regression tests?

Who approved the latest baseline?

What unresolved defects remain?

How severe are they?

What did representative users actually do?

Which UX metrics matter and why?

What changed because of the research or metrics?
```

If those questions cannot be answered, design quality is being asserted rather than demonstrated.

---

# 7. Sources

1. **Nielsen Norman Group — Design Critiques: Encourage a Positive Culture to Improve Products**  
   https://www.nngroup.com/articles/design-critiques/

2. **Nielsen Norman Group — Closing the Loop: What to Do After a Design Critique Ends**  
   https://www.nngroup.com/articles/after-design-critique/

3. **Nielsen Norman Group — Testing Visual Design: A Comprehensive Guide**  
   https://www.nngroup.com/articles/testing-visual-design/

4. **Nielsen Norman Group — How Many Test Users in a Usability Study?**  
   https://www.nngroup.com/articles/how-many-test-users/

5. **Nielsen Norman Group — Qualitative Usability Testing: Study Guide**  
   https://www.nngroup.com/articles/qual-usability-testing-study-guide/

6. **Nielsen Norman Group — Remote Usability Testing: Study Guide**  
   https://www.nngroup.com/articles/remote-usability-testing-study-guide/

7. **Nielsen Norman Group — Tools for Unmoderated Usability Testing**  
   https://www.nngroup.com/articles/unmoderated-user-testing-tools/

8. **Nielsen Norman Group — Net Promoter Score in User Experience**  
   https://www.nngroup.com/videos/nps-ux/

9. **Storybook — Visual Tests**  
   https://storybook.js.org/docs/writing-tests/visual-testing

10. **Storybook — Testing in CI**  
    https://storybook.js.org/docs/writing-tests/in-ci

11. **Storybook — Accessibility Tests**  
    https://storybook.js.org/docs/writing-tests/accessibility-testing

12. **W3C WAI — WCAG 2.2 Quick Reference**  
    https://www.w3.org/WAI/WCAG22/quickref/

13. **W3C WAI — Understanding Keyboard Accessibility**  
    https://www.w3.org/WAI/WCAG22/Understanding/keyboard-accessible.html

14. **W3C WAI — Technique G142: Browser Zoom**  
    https://www.w3.org/WAI/WCAG22/Techniques/general/G142.html

15. **GOV.UK Service Manual — Testing with Assistive Technologies**  
    https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies

16. **GOV.UK — Usability Testing: Qualitative Studies**  
    https://www.gov.uk/guidance/usability-testing-qualitative-studies

17. **Google Research — Measuring the User Experience on a Large Scale: User-Centered Metrics for Web Applications**  
    https://research.google.com/pubs/archive/36299.pdf

18. **MeasuringU — SUPR-Q**  
    https://measuringu.com/product/suprq/

19. **MeasuringU — A Report Card for the Net Promoter Score**  
    https://measuringu.com/report-card-for-the-nps/

20. **MeasuringU — Validating the Basic SUPR-Q Measurement Model**  
    https://measuringu.com/validating-the-basic-suprq-measurement-model/

The key governance principle is that **quality evidence must close a loop**. Critique comments, visual diffs, accessibility findings, usability observations, and UX metrics that never result in an explicit decision are records of activity, not a functioning quality system.
