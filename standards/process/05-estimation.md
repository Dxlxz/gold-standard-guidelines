---
id: "estimation"
title: "Estimation & Planning"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["process", "estimation", "planning"]
applies_to: ["team"]
related: ["code-review"]
legacy_number: 88
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 35506
provenance: baseline

---

Below is the canonical standard, written for direct inclusion in the governance corpus at **Governance → Estimation → Documentation → CI/CD**.

# Gold Standard 2026 — Estimation & Planning Guidelines

**Canonical placement:** Governance → Estimation → Documentation → CI/CD  
**Status:** Normative  
**Baseline:** Gold Standard 2026  
**Applies to:** Product engineering, platform engineering, infrastructure, security, data, design systems, API development, application development, QA, DevOps, and technical delivery work.

---

## 1. Purpose

### 1.1 Objective

This standard defines how engineering teams MUST estimate, plan, re-estimate, and communicate software delivery work.

Its purpose is to produce forecasts that are useful for decision-making without presenting uncertainty as certainty.

Estimation MUST support:

1. prioritization;
2. sequencing;
3. capacity allocation;
4. dependency management;
5. risk management;
6. release planning;
7. stakeholder communication; and
8. continuous improvement of delivery predictability.

An estimate is a **forecast based on current information**. It is not a promise, commitment, contractual guarantee, or substitute for discovery.

Teams MUST distinguish between:

- **size** — the relative amount of work;
- **effort** — the expected engineering work required;
- **duration** — elapsed calendar time;
- **capacity** — available team throughput;
- **forecast** — a probabilistic expectation of completion;
- **commitment** — an explicitly accepted delivery obligation; and
- **deadline** — a date imposed by an external or business constraint.

These terms MUST NOT be used interchangeably.

### 1.2 Scope

This standard applies to:

- features;
- defects;
- technical debt;
- security remediation;
- migrations;
- API changes;
- database changes;
- infrastructure work;
- accessibility remediation;
- design-system work;
- CI/CD changes;
- discovery and spikes;
- documentation required for delivery; and
- cross-team initiatives.

Minor operational work MAY use lightweight estimation where the cost of formal estimation would exceed its planning value.

---

# 2. Rules

## 2.1 Estimation Is a Forecast, Not a Contract

Teams MUST treat estimates as representations of current knowledge.

An estimate MUST NOT be communicated as certain when meaningful uncertainty exists.

Statements such as:

> “This will be complete on Friday.”

MUST NOT be used unless Friday is an actual committed deadline and the team has sufficient evidence to support that commitment.

Forecast language SHOULD instead communicate confidence and assumptions, for example:

> “Based on the current scope, we expect completion between Thursday and Monday. Friday is the current planning target, assuming the API dependency is available by Wednesday.”

Teams MUST expose material uncertainty rather than hide it inside arbitrary padding.

---

## 2.2 Approved Sizing Approaches

Teams MAY estimate work using:

1. relative points;
2. bounded ranges;
3. historical throughput;
4. elapsed-time forecasts; or
5. explicit calendar estimates where required.

The chosen approach MUST match the decision being made.

### 2.2.1 Story Points

Story points SHOULD be used for relative sizing within a stable team.

Points MUST represent a combination of:

- implementation effort;
- complexity;
- uncertainty; and
- coordination burden.

Points MUST NOT represent hours.

A team MUST NOT define a conversion such as:

> 1 point = 4 hours.

Velocity MUST NOT be used to compare:

- developers;
- squads;
- vendors;
- departments; or
- organizations.

Point scales SHOULD remain coarse.

A Fibonacci-like scale such as:

**1, 2, 3, 5, 8, 13**

is RECOMMENDED.

Items larger than the team's normal upper planning threshold SHOULD be decomposed before entering implementation.

A team using 13 as its practical upper bound, for example, SHOULD split a 13-point item where meaningful independent increments exist.

### 2.2.2 Ranges

Ranges SHOULD be used when uncertainty is meaningful.

Examples include:

- 2–4 engineering days;
- 1–2 sprints;
- 3–5 person-days;
- 4–7 weeks elapsed time.

A range MUST represent plausible outcomes rather than arbitrary optimism and pessimism.

Teams MUST NOT publish artificially narrow ranges solely to appear precise.

The width of the range SHOULD increase when:

- requirements are incomplete;
- integration behavior is unknown;
- external dependencies exist;
- unfamiliar technology is involved;
- security review is unresolved;
- data migration complexity is unclear; or
- production behavior cannot yet be confidently modeled.

### 2.2.3 Time Estimates

Time estimates MAY be used when consumers explicitly require calendar or effort information.

Time estimates SHOULD normally be expressed as ranges.

“Three days” SHOULD become:

> “Approximately 2–4 engineering days.”

when implementation variance is material.

Engineering effort MUST NOT automatically be interpreted as elapsed delivery time.

For example:

**3 engineering days of effort ≠ delivery in 3 calendar days**

when reviews, CI, dependencies, testing, release windows, or competing work are involved.

### 2.2.4 Historical Throughput

Stable teams SHOULD use historical throughput when forecasting batches of work.

Historical throughput is often more useful than individually estimating every small item.

Forecasting MAY use:

- completed items per iteration;
- cycle-time distributions;
- lead-time distributions;
- historical velocity; or
- probabilistic simulation.

Historical data MUST be adjusted when the future operating conditions differ materially from the historical sample.

---

## 2.3 Estimation Horizon and the Cone of Uncertainty

Estimate precision MUST reflect how much is known.

Teams MUST NOT claim implementation-level precision for work that remains at roadmap or concept stage.

The planning model SHOULD recognize the following broad uncertainty progression:

| Stage | Expected precision |
|---|---|
| Concept | Very low |
| Problem definition | Low |
| Discovery | Moderate |
| Technical design | Moderate to high |
| Implementation-ready | High enough for sprint or delivery planning |
| In progress | Increasingly high |
| Validation/release | High, subject to production or deployment risk |

Early estimates SHOULD use wider ranges.

Example:

> Concept stage: 4–10 weeks.

After discovery:

> Current forecast: 5–7 weeks.

After implementation begins:

> Current forecast: September 14–18.

The range SHOULD narrow as uncertainty is removed.

A narrowing estimate MUST be driven by new evidence, not pressure to provide a more attractive date.

---

## 2.4 Confidence

Material delivery forecasts SHOULD include confidence or an equivalent description of uncertainty.

Acceptable forms include:

- low / medium / high confidence;
- confidence intervals;
- probability-based forecasts;
- explicit assumptions and known risks.

Where quantitative forecasting is available, teams MAY communicate statements such as:

> “There is approximately an 85% likelihood of completion by October 16 based on current throughput.”

Probability claims MUST be backed by an actual forecasting model or historical evidence.

Teams MUST NOT invent numeric confidence values for rhetorical effect.

---

## 2.5 Discovery and Spikes

Unknown work MUST NOT be disguised as implementation work.

Where uncertainty materially affects architecture, security, feasibility, data design, accessibility, API behavior, or effort, a discovery task or spike SHOULD be created.

A spike MUST have:

1. a defined question;
2. a bounded scope;
3. a timebox;
4. an expected output; and
5. an explicit decision or next step.

Examples of acceptable spike outputs include:

- architecture decision record;
- API feasibility assessment;
- database migration strategy;
- prototype;
- security threat assessment;
- accessibility investigation;
- performance benchmark;
- dependency evaluation; or
- revised delivery estimate.

A spike MUST NOT become an open-ended implementation project.

Teams SHOULD estimate the spike itself separately from the resulting implementation.

Implementation estimates SHOULD be revised after the spike when the discovered information materially changes scope or risk.

---

## 2.6 Breaking Down Large Work

Large items MUST be decomposed before execution when their size prevents useful planning or rapid feedback.

Teams SHOULD prefer vertical slices that produce independently testable behavior.

Work SHOULD NOT be decomposed solely by technical layer when doing so delays usable integration.

For example, a feature SHOULD prefer slices such as:

1. basic read-only user flow;
2. validated create flow;
3. editing capability;
4. permissions;
5. edge-case handling;

rather than isolated workstreams such as:

1. entire database;
2. entire backend;
3. entire frontend;
4. all tests.

Layer-based decomposition MAY be appropriate for infrastructure, migrations, platform work, or foundational architecture where no meaningful vertical slice exists.

A work item SHOULD normally be small enough that:

- implementation progress is observable;
- review can occur promptly;
- failures can be isolated;
- scope changes remain manageable; and
- completion within a normal iteration is plausible.

Oversized work MUST NOT be carried repeatedly between iterations without decomposition or explicit replanning.

---

## 2.7 Definition of Ready for Estimation

A delivery estimate SHOULD NOT be treated as high-confidence unless the relevant implementation inputs are sufficiently defined.

Depending on the work, these inputs include:

- user or system outcome;
- acceptance criteria;
- API contract;
- data model impact;
- validation rules;
- authorization model;
- security requirements;
- accessibility expectations;
- design specification;
- component behavior;
- responsive behavior;
- loading, empty, error, and success states;
- observability requirements;
- migration requirements;
- rollback behavior;
- deployment constraints; and
- external dependencies.

Missing information MUST either:

1. widen the estimate;
2. reduce stated confidence;
3. become explicit discovery work; or
4. block commitment.

It MUST NOT silently disappear from the forecast.

---

## 2.8 Dependency Planning

Dependencies MUST be identified separately from implementation effort.

Dependencies include:

- another team;
- vendor delivery;
- API availability;
- infrastructure provisioning;
- security review;
- legal or compliance review;
- design approval;
- data availability;
- migration windows;
- production access;
- external platform certification; and
- release coordination.

The estimate for work SHOULD distinguish between:

**engineering effort** and **elapsed dependency time**.

For example:

> Engineering effort: approximately 4–6 days.  
> Expected elapsed delivery: approximately 2–3 weeks because security review and external API access are on the critical path.

A team MUST NOT absorb an uncontrolled external dependency into an apparently precise engineering estimate.

Critical dependencies SHOULD have:

- an owner;
- a required-by date;
- a current status; and
- a mitigation or fallback where practical.

---

## 2.9 Risk Buffers

Planning MUST account for known delivery risk.

Risk buffers SHOULD be applied at the appropriate planning level rather than hidden inside every individual task.

Teams SHOULD prefer:

- explicit contingency at release or initiative level;
- probabilistic forecasting;
- throughput-based planning; or
- documented uncertainty ranges.

Teams SHOULD NOT mechanically inflate every estimate by a fixed percentage.

For example:

> Estimate every ticket, then add 30%.

is NOT a preferred planning model.

Buffers MUST NOT be used to conceal:

- unclear scope;
- poor requirements;
- chronic interruption;
- missing engineering capability;
- unmanaged dependencies; or
- unrealistic commitments.

Persistent buffer consumption SHOULD trigger investigation of the underlying delivery system.

---

## 2.10 Team Capacity Planning

Capacity MUST be planned per team rather than by assuming every person's nominal working hours are available for feature delivery.

A team's available capacity MUST account for predictable non-feature work, including:

- meetings;
- code review;
- production support;
- incidents;
- maintenance;
- documentation;
- security remediation;
- dependency coordination;
- CI/CD maintenance;
- technical debt;
- mentoring;
- leave;
- public holidays; and
- operational responsibilities.

Planning MUST NOT assume 100% utilization.

High utilization reduces the system's ability to absorb uncertainty and interrupts flow.

Teams SHOULD reserve appropriate capacity for unplanned work when historical evidence shows that such work occurs regularly.

Capacity assumptions SHOULD be based on historical delivery where available.

Individual developer estimates MUST NOT be aggregated as though engineers operate independently when work requires collaboration, review, integration, or shared infrastructure.

---

## 2.11 Capacity Is Team-Specific

Each team MUST maintain its own planning baseline.

Teams MUST NOT inherit another team's velocity or throughput target.

A team's planning baseline SHOULD account for:

- team size;
- experience;
- domain familiarity;
- operational load;
- system complexity;
- review practices;
- deployment architecture;
- automation maturity;
- dependency profile; and
- historical throughput.

Changes to team composition SHOULD trigger temporary reduction in forecast confidence until a new stable baseline emerges.

Adding engineers MUST NOT be assumed to create an immediate proportional increase in delivery capacity.

Onboarding, coordination, architectural coupling, and review overhead MUST be considered.

---

## 2.12 Scope Changes

A material scope change MUST trigger impact assessment.

The team MUST NOT preserve an obsolete date merely because it was previously communicated.

When scope changes, one or more of the following MUST change:

- delivery date;
- scope;
- staffing;
- sequencing;
- confidence; or
- risk acceptance.

The relationship MUST be explicit.

A planning system MUST NOT imply that additional scope has zero effect.

---

## 2.13 Re-estimation Rules

Teams MUST re-estimate or reforecast when new information materially changes the expected delivery outcome.

Re-estimation SHOULD occur when:

1. discovery invalidates an assumption;
2. acceptance criteria materially change;
3. architectural direction changes;
4. a new dependency appears;
5. a dependency slips;
6. significant defects are discovered;
7. security requirements change;
8. accessibility requirements were omitted;
9. API contracts change;
10. database migration complexity increases;
11. production constraints are discovered;
12. capacity materially changes; or
13. actual progress diverges meaningfully from the existing forecast.

Teams MUST NOT repeatedly re-estimate unchanged work merely to make metrics appear accurate.

Original estimates SHOULD remain available where useful for retrospective analysis.

Planning tools SHOULD preserve:

- original estimate;
- current estimate;
- reason for change; and
- date of change.

Re-estimation MUST be presented as new information, not as failure by default.

---

## 2.14 Dates and Delivery Forecasts

A communicated date MUST be identified as one of:

- target;
- forecast;
- commitment;
- deadline; or
- release date.

These terms MUST NOT be collapsed into a single generic “due date.”

### Target

A **target** is an intended outcome used for planning.

It is not guaranteed.

### Forecast

A **forecast** is the team's current evidence-based expectation.

It SHOULD include a range or confidence statement when uncertainty remains material.

### Commitment

A **commitment** is an accepted obligation.

Teams MUST NOT describe a date as committed without identifying the trade-offs required to protect that commitment.

### Deadline

A **deadline** is a date imposed by a constraint such as:

- regulation;
- contractual obligation;
- external platform requirement;
- planned event;
- fixed migration window; or
- business constraint.

When a deadline is fixed, scope and implementation strategy MUST be actively managed to preserve feasibility.

A deadline MUST NOT cause uncertainty to be deleted from planning.

---

## 2.15 Communicating Dates Without Lying

Engineering communication MUST reflect the available evidence.

Teams MUST NOT:

- present a target as guaranteed;
- remove uncertainty because stakeholders request one date;
- intentionally provide an estimate known to be unrealistic;
- quietly assume weekends or overtime;
- conceal dependency risk;
- use false precision; or
- knowingly maintain a date after evidence shows it is no longer credible.

When one date is required for portfolio planning, the team MAY provide a planning date while retaining the underlying forecast.

Example:

> **Planning date:** November 20  
> **Current forecast:** November 14–24  
> **Confidence:** Medium  
> **Primary risk:** Identity-provider integration has not completed certification.

Where a deadline cannot currently be supported, communication SHOULD describe the trade-off.

Example:

> “December 1 remains the required deadline. Current scope forecasts completion during December 8–15. To protect December 1, we need to defer bulk import or remove the external reporting integration.”

Teams MUST communicate deteriorating forecasts when they become materially different from previously communicated expectations.

They MUST NOT wait until the original date is reached.

---

## 2.16 Security Alignment

Estimation MUST include applicable security work.

Security MUST NOT be treated as optional polish after feature implementation.

Estimates MUST account for applicable:

- authentication;
- authorization;
- least-privilege controls;
- secret handling;
- threat modeling;
- secure storage;
- input validation;
- dependency remediation;
- audit logging;
- abuse prevention;
- security testing; and
- security review.

Security findings discovered during delivery MAY alter scope and MUST trigger reforecasting when material.

A deadline MUST NOT justify bypassing mandatory security controls.

---

## 2.17 Data & Database Alignment

Database and data work MUST account for the full lifecycle of the change.

Estimates SHOULD include applicable:

- schema design;
- migrations;
- indexing;
- backfill;
- data validation;
- data repair;
- concurrency behavior;
- transaction boundaries;
- rollback;
- compatibility windows;
- monitoring;
- production execution time; and
- recovery procedures.

A schema migration MUST NOT be estimated solely by the time required to write the migration file.

Large data migrations SHOULD distinguish:

- engineering effort;
- execution duration;
- validation duration; and
- rollback risk.

---

## 2.18 API Alignment

API implementation estimates MUST include applicable contract work.

This includes:

- request and response schemas;
- authentication;
- authorization;
- validation;
- error semantics;
- pagination;
- idempotency;
- rate limiting;
- observability;
- backward compatibility;
- versioning;
- documentation;
- consumer coordination; and
- contract testing.

An endpoint MUST NOT be considered complete merely because its primary success path works.

Breaking API changes MUST include migration and consumer coordination in the delivery forecast.

---

## 2.19 State Management Alignment

Frontend work involving state MUST account for all required state transitions.

Estimation SHOULD include applicable:

- initial state;
- loading state;
- empty state;
- success state;
- validation state;
- recoverable error state;
- unrecoverable error state;
- stale state;
- optimistic state;
- rollback state; and
- synchronization behavior.

State-management complexity MUST NOT be omitted from estimation merely because the visual design appears simple.

Server state SHOULD NOT automatically be treated as local UI state.

The selected implementation SHOULD follow the corpus State Management standard.

---

## 2.20 Forms & Validation Alignment

Form estimates MUST include more than field rendering.

Applicable work includes:

- schema definition;
- client-side validation;
- server-side validation;
- error mapping;
- accessible error presentation;
- touched/dirty behavior;
- submission state;
- duplicate-submission prevention;
- reset behavior;
- persistence where required; and
- success/error recovery.

Validation MUST follow the canonical Forms & Validation standard.

Client-side validation MUST NOT be treated as a substitute for authoritative server validation.

---

## 2.21 Accessibility Alignment

Accessibility MUST be included in the base estimate.

It MUST NOT be deferred to a separate “accessibility pass” unless the work is explicitly remediation of existing debt.

Estimates SHOULD include applicable:

- semantic markup;
- keyboard behavior;
- focus management;
- accessible names;
- error announcements;
- screen-reader behavior;
- contrast verification;
- reduced-motion behavior;
- touch-target behavior; and
- assistive-technology testing.

Accessibility defects discovered before completion MUST be treated as implementation defects, not optional enhancement work.

---

## 2.22 Design Token Alignment

UI work MUST use canonical design tokens where defined.

Estimation MUST NOT assume arbitrary one-off styling when the Design Tokens standard requires reusable tokens.

Where a missing token is discovered, teams SHOULD determine whether:

1. an existing token satisfies the requirement;
2. the design should change to use an existing token; or
3. a new canonical token requires design-system work.

Creating or changing shared tokens MAY introduce cross-product impact and SHOULD be estimated accordingly.

---

## 2.23 Component Standard and shadcn/ui Baseline

**shadcn/ui is the baseline component implementation model.**

Teams SHOULD use existing canonical components before creating new primitives.

Estimation for UI work MUST first determine whether the required behavior is:

1. already supported by the canonical component;
2. supported through composition;
3. a reusable extension;
4. a new shared pattern; or
5. genuinely product-specific behavior.

Teams MUST NOT estimate bespoke recreation of primitives already covered by the approved shadcn/ui baseline unless a documented requirement justifies divergence.

Where changes affect a shared component, estimates SHOULD include:

- component API design;
- variants;
- design tokens;
- accessibility;
- responsive behavior;
- regression impact;
- documentation;
- visual testing; and
- downstream consumers.

---

## 2.24 Pattern Standards Alignment

Repeated product behavior SHOULD use established canonical patterns.

Examples include:

- dialogs;
- destructive confirmation;
- tables;
- filters;
- pagination;
- search;
- command interfaces;
- notifications;
- empty states;
- loading states;
- error states;
- authentication flows; and
- multi-step forms.

Teams MUST NOT estimate a feature on the assumption of a product-specific interaction when a required corpus pattern already governs that interaction.

Changes to a shared pattern MUST account for migration impact across its consumers.

---

## 2.25 Documentation

Required documentation is part of the work.

Estimates MUST include applicable:

- architecture documentation;
- ADRs;
- API documentation;
- migration instructions;
- operational runbooks;
- release notes;
- component documentation;
- Storybook examples;
- developer guidance; and
- user-facing documentation.

A work item MUST NOT be declared complete when mandatory documentation remains outstanding.

---

## 2.26 Testing and Quality

Testing MUST be estimated as part of implementation.

Applicable work includes:

- unit tests;
- integration tests;
- contract tests;
- end-to-end tests;
- accessibility tests;
- security tests;
- migration tests;
- performance validation;
- browser/device validation;
- visual regression tests; and
- manual exploratory testing.

“Development complete, testing remains” SHOULD NOT be represented as complete delivery.

Testing MUST NOT routinely be removed to compensate for an underestimated implementation.

---

## 2.27 CI/CD Alignment

Delivery estimates MUST include the work required to move a change safely through the canonical CI/CD process.

Applicable activities include:

- linting;
- static analysis;
- type checking;
- automated tests;
- security scanning;
- artifact generation;
- preview environments;
- deployment;
- migrations;
- smoke testing;
- feature-flag configuration;
- observability;
- rollback validation; and
- production verification.

A change MUST NOT be estimated solely until merge if the requested outcome is production delivery.

Teams MUST distinguish:

- code complete;
- merged;
- deployable;
- deployed;
- validated in production; and
- released to users.

The delivery forecast MUST use the milestone that matches the stakeholder's actual expectation.

---

## 2.28 Definition of Done

A work item MUST NOT be counted as complete until all applicable completion criteria are met.

These SHOULD include:

- implementation complete;
- acceptance criteria satisfied;
- code reviewed;
- automated checks passing;
- security requirements satisfied;
- accessibility requirements satisfied;
- API contracts validated;
- database changes verified;
- documentation completed;
- telemetry available;
- deployment completed where applicable; and
- required production validation completed.

Teams MUST NOT improve apparent throughput by counting partially completed work as done.

---

# 3. Anti-patterns

## 3.1 Converting Points to Hours

**Anti-pattern:**

> 5 points = 20 hours.

This MUST NOT be used.

Points are relative team-local sizing units, not disguised timesheets.

---

## 3.2 Treating Estimates as Commitments

**Anti-pattern:**

> “You estimated five days, therefore it must be delivered in five days.”

An estimate is not automatically a commitment.

A commitment requires explicit agreement and risk management.

---

## 3.3 Single-Date False Precision

**Anti-pattern:**

> “It will ship on October 12.”

when significant uncertainty remains.

Use a forecast range, confidence statement, or explicit planning target.

---

## 3.4 Executive-Requested Precision

**Anti-pattern:**

Narrowing an estimate because a stakeholder asks for a more precise answer.

Precision MUST come from evidence.

Authority does not reduce uncertainty.

---

## 3.5 Padding Every Ticket

**Anti-pattern:**

Increasing every ticket by a fixed contingency multiplier.

This obscures the actual source of uncertainty and degrades forecasting quality.

---

## 3.6 Sandbagging

**Anti-pattern:**

Knowingly overstating estimates to create hidden safety margins.

Teams SHOULD expose risks and contingency explicitly instead.

---

## 3.7 Optimistic Best-Case Planning

**Anti-pattern:**

Planning releases using only the fastest plausible implementation outcome.

The planning forecast SHOULD represent a realistically achievable outcome under normal conditions.

---

## 3.8 Ignoring Review and Integration Time

**Anti-pattern:**

Estimating only coding time.

Delivery includes integration, review, validation, CI/CD, dependencies, and release activity.

---

## 3.9 Assuming 100% Capacity

**Anti-pattern:**

> 5 engineers × 8 hours × 10 days = 400 delivery hours.

Knowledge work does not behave as a perfectly fungible utilization model.

Teams MUST use realistic effective capacity.

---

## 3.10 Comparing Team Velocity

**Anti-pattern:**

> Team A delivers 60 points and Team B delivers 40, therefore Team A is more productive.

Story points are team-local and MUST NOT be used for cross-team productivity comparison.

---

## 3.11 Assigning Points to Individuals

**Anti-pattern:**

Using points as developer performance metrics.

Estimation exists to forecast team delivery, not measure individual productivity.

---

## 3.12 Re-estimating to Protect Metrics

**Anti-pattern:**

Changing estimates after completion so actual effort appears aligned with the original estimate.

Historical variance is valuable evidence and MUST NOT be erased for cosmetic reporting.

---

## 3.13 Endless Spikes

**Anti-pattern:**

Discovery work without a bounded question, timebox, or decision.

A spike MUST produce an actionable outcome.

---

## 3.14 Giant Stories

**Anti-pattern:**

An item remains “in progress” for multiple iterations because it was never decomposed.

Large work SHOULD be split into independently verifiable increments.

---

## 3.15 Dependency Blindness

**Anti-pattern:**

> “Our part takes three days.”

when delivery requires another team that cannot begin for two weeks.

The stakeholder-facing forecast MUST include critical-path dependency timing.

---

## 3.16 Deadline-Driven Estimate Manipulation

**Anti-pattern:**

Changing an estimate until it matches a predetermined deadline.

When forecast and deadline conflict, the team MUST change scope, sequencing, resources, strategy, or risk acceptance rather than falsify the estimate.

---

## 3.17 Cutting Required Standards to Hit Dates

The following MUST NOT be silently removed to preserve a date:

- security;
- validation;
- accessibility;
- required testing;
- data integrity;
- required observability;
- rollback capability; or
- mandatory documentation.

Any deliberate exception MUST follow the relevant governance and exception process.

---

## 3.18 Calling Development “Done” Before Delivery

**Anti-pattern:**

> “The feature is done; it just needs testing and deployment.”

If testing and deployment are required for the intended outcome, the work is not done.

---

# 4. Checklist

## 4.1 Before Estimating

The team MUST confirm:

- [ ] The intended outcome is understood.
- [ ] Scope boundaries are documented.
- [ ] Acceptance criteria are sufficiently clear.
- [ ] Unknowns have been identified.
- [ ] Applicable security requirements are known.
- [ ] Data and database impact has been considered.
- [ ] API implications have been considered.
- [ ] State-management requirements have been considered.
- [ ] Forms and validation requirements have been considered.
- [ ] Accessibility is included.
- [ ] Design-token implications have been considered.
- [ ] Existing shadcn/ui and canonical components have been checked.
- [ ] Existing product patterns have been checked.
- [ ] Testing requirements are understood.
- [ ] Documentation requirements are understood.
- [ ] CI/CD and deployment work is included.
- [ ] External dependencies are identified.
- [ ] Discovery work is separated where required.

---

## 4.2 During Planning

The team MUST confirm:

- [ ] The sizing method matches the planning decision.
- [ ] Points are not being converted to hours.
- [ ] Large items have been decomposed.
- [ ] Capacity uses a team-specific historical baseline where possible.
- [ ] Leave and operational responsibilities are accounted for.
- [ ] Regular unplanned work is reflected in capacity.
- [ ] Dependency timing is separate from implementation effort.
- [ ] Risk is explicit rather than hidden.
- [ ] Forecast uncertainty matches the maturity of the work.
- [ ] Fixed deadlines have corresponding scope or contingency decisions.
- [ ] The completion milestone is clearly defined.

---

## 4.3 When Communicating a Forecast

The communication MUST answer:

- [ ] What outcome is being forecast?
- [ ] Is the date a target, forecast, commitment, deadline, or release date?
- [ ] What is the expected range?
- [ ] What is the confidence level?
- [ ] Which assumptions materially affect the forecast?
- [ ] Which dependencies are on the critical path?
- [ ] What are the primary risks?
- [ ] What scope trade-offs are available if the deadline is fixed?
- [ ] When will the forecast be reviewed again?

---

## 4.4 During Delivery

The team MUST monitor:

- [ ] Scope changes.
- [ ] Discovery of unknown complexity.
- [ ] Dependency status.
- [ ] Capacity changes.
- [ ] Security findings.
- [ ] Data migration findings.
- [ ] API contract changes.
- [ ] Accessibility issues.
- [ ] CI/CD failures.
- [ ] Production constraints.
- [ ] Actual progress compared with the current forecast.

A material change MUST trigger reforecasting.

---

## 4.5 Before Declaring Completion

The team MUST confirm, where applicable:

- [ ] Acceptance criteria pass.
- [ ] Required security controls are complete.
- [ ] Database changes are verified.
- [ ] API contracts are complete and documented.
- [ ] Required states are implemented.
- [ ] Form validation is complete.
- [ ] Accessibility requirements pass.
- [ ] Canonical design tokens are used.
- [ ] Canonical components and patterns are followed.
- [ ] Tests pass.
- [ ] Required documentation exists.
- [ ] CI/CD requirements pass.
- [ ] Deployment has completed.
- [ ] Required observability exists.
- [ ] Production verification has completed.
- [ ] Rollback or recovery procedures are viable.

---

# 5. Canonical Summary

Estimation exists to support decisions under uncertainty.

Teams MUST size work using a method appropriate to the planning horizon and MUST NOT imply more precision than the available evidence supports.

**Points** SHOULD be used for relative team-local sizing and MUST NOT be converted to hours or used to compare teams.

**Ranges** SHOULD be used whenever meaningful uncertainty exists.

**Time estimates** MUST distinguish engineering effort from elapsed delivery time.

**Historical throughput** SHOULD be preferred for forecasting batches of work when stable historical evidence is available.

Uncertain work SHOULD be reduced through bounded **spikes and discovery** before high-confidence implementation commitments are made.

Large work MUST be **decomposed** when its size prevents useful feedback, forecasting, testing, or integration.

Dependencies and risk MUST be explicit. They MUST NOT be hidden inside apparently precise estimates.

Capacity MUST be calculated at the **team level**, using realistic effective capacity rather than theoretical utilization.

Plans MUST account for security, data and database requirements, API contracts, state management, forms and validation, accessibility, design tokens, canonical patterns, shadcn/ui-based components, documentation, testing, and CI/CD.

A material change in scope, assumptions, dependencies, capacity, architecture, security, data behavior, or delivery conditions MUST trigger **re-estimation or reforecasting**.

Dates MUST be labeled correctly:

**target ≠ forecast ≠ commitment ≠ deadline ≠ release date.**

Teams MUST communicate changes when evidence changes.

They MUST NOT maintain a date they know is no longer credible.

Where a fixed deadline conflicts with the current forecast, teams MUST make the trade-off explicit through scope, sequencing, staffing, implementation strategy, or risk acceptance rather than falsifying the estimate.

The Gold Standard is:

> **Expose uncertainty. Reduce it through discovery. Break work into verifiable increments. Forecast from evidence. Plan using real team capacity. Reforecast when facts change. Communicate dates according to what they actually mean. Never manufacture certainty to satisfy a planning process.**

**Canonical placement:**  
**Governance → Estimation → Documentation → CI/CD**

This version is ready to sit alongside the Security, Data & Database, API, State Management, Forms & Validation, Accessibility, Design Tokens, Component, and Pattern standards.
