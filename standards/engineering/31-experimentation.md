---
id: "experimentation"
title: "Experimentation & A/B Testing"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "experimentation", "b", "testing"]
applies_to: ["team"]
related: ["testing"]
legacy_number: 92
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 45321
provenance: baseline

---

Below is the canonical standard for direct inclusion at **Analytics → Experimentation → Feature Flags → Privacy & Data Governance**.

# Gold Standard 2026 — Experimentation & A/B Testing Guidelines

**Canonical placement:** Analytics → Experimentation → Feature Flags → Privacy & Data Governance  
**Status:** Normative  
**Baseline:** Gold Standard 2026  
**Applies to:** Product experimentation, growth experimentation, UX experiments, pricing and packaging tests, onboarding tests, notification experiments, algorithmic experiments, API experiments, infrastructure experiments, feature-flagged rollouts, and controlled behavioural measurement.

---

# 1. Purpose

## 1.1 Objective

This standard defines how teams MUST design, implement, analyse, govern, and document controlled experiments.

Its purpose is to ensure experimentation produces decisions based on valid evidence rather than noise, instrumentation defects, uncontrolled exposure, or post-hoc interpretation.

Experiments MUST be designed to answer a specific decision question.

Experimentation MUST support:

1. causal inference;
2. product and engineering learning;
3. controlled rollout;
4. risk reduction;
5. evidence-based product decisions;
6. explicit measurement of trade-offs;
7. privacy and ethical governance; and
8. reproducible decision documentation.

An experiment MUST NOT be treated as a substitute for product judgment, user research, accessibility review, security review, or legal and privacy obligations.

## 1.2 Scope

This standard applies to:

- A/B tests;
- A/B/n tests;
- multivariate experiments;
- holdout groups;
- switchback tests;
- cluster-randomised experiments;
- feature-flag experiments;
- staged experiments;
- experimentation on ranking or recommendation systems;
- behavioural interventions;
- UI and interaction experiments;
- API or backend experiments where user or business outcomes are measured;
- pricing or packaging experiments;
- notification experiments;
- onboarding experiments; and
- experimental rollouts where outcome comparison is used to inform a decision.

Simple feature rollouts that do not make causal claims MAY use lighter controls, but MUST still follow applicable feature flag, security, privacy, data quality, and rollback requirements.

---

# 2. Rules

## 2.1 Every Experiment MUST Have a Decision Question

An experiment MUST begin with a decision that could plausibly change based on the result.

The experiment specification MUST identify:

- the decision being made;
- the behaviour being changed;
- the population affected;
- the expected mechanism;
- the primary outcome;
- acceptable downside;
- experiment duration or stopping criteria; and
- the action expected under material result scenarios.

Experiments MUST NOT begin with:

> “Let's test this and see what happens.”

without defining what evidence would influence the decision.

Exploratory analysis MAY generate hypotheses, but exploratory work MUST be distinguished from confirmatory experimentation.

---

## 2.2 Hypothesis Definition

Every confirmatory experiment MUST define a hypothesis before exposure begins.

The hypothesis SHOULD follow this structure:

> **If** we change [intervention] for [population], **then** [primary metric] will change in [expected direction or meaningful magnitude], **because** [mechanism].

Example:

> If we reduce onboarding from five mandatory steps to three for first-time users, then onboarding completion will increase by at least 4% relative because fewer required steps reduce early abandonment.

A hypothesis MUST define:

1. the treatment;
2. the control or comparison;
3. the target population;
4. the primary metric;
5. the expected direction or effect;
6. the minimum practically meaningful effect where applicable; and
7. the proposed causal mechanism.

Hypotheses MUST be recorded before reviewing treatment-outcome data.

Teams MUST NOT rewrite the hypothesis after seeing results and present it as pre-specified.

---

## 2.3 Metric Definition

Every experiment MUST define its metrics before launch.

Metrics MUST be classified as:

- primary;
- secondary;
- guardrail;
- counter-metric; or
- diagnostic.

### 2.3.1 Primary Metric

An experiment SHOULD have one primary metric.

Multiple primary metrics MAY be used only when the decision genuinely depends on multiple co-primary outcomes.

The primary metric MUST:

- map directly to the decision question;
- have a precise numerator and denominator where applicable;
- define the observation window;
- define the population;
- define inclusion and exclusion criteria;
- define aggregation level;
- define treatment of missing data; and
- be computable from trusted instrumentation.

A primary metric MUST NOT be selected after examining experiment outcomes.

### 2.3.2 Secondary Metrics

Secondary metrics MAY provide supporting evidence or diagnose mechanisms.

Secondary metrics MUST NOT silently replace a failed primary metric.

A secondary metric becoming decision-critical SHOULD trigger a new confirmatory experiment unless the analysis plan explicitly defined that metric's role in advance.

### 2.3.3 Guardrail Metrics

Experiments MUST define applicable guardrails.

Guardrails SHOULD cover material downside risks such as:

- error rate;
- latency;
- availability;
- security events;
- user complaints;
- cancellation rate;
- accessibility regressions;
- support contacts;
- data loss;
- fraud;
- abuse;
- revenue degradation;
- retention degradation; and
- operational cost.

A treatment MUST NOT be considered successful solely because the primary metric improved if a material guardrail breach occurred.

### 2.3.4 Counter-Metrics

Counter-metrics SHOULD measure plausible adverse trade-offs created by improving the primary metric.

For example:

- increasing conversion while measuring refund rate;
- increasing engagement while measuring mute or unsubscribe rate;
- increasing click-through while measuring downstream completion;
- reducing friction while measuring fraud or abuse;
- increasing notification opens while measuring notification disablement.

Counter-metrics SHOULD reflect unintended behavioural optimisation.

---

## 2.4 Metric Semantics MUST Be Stable

Metric definitions MUST remain stable throughout a confirmatory experiment.

If a metric definition changes materially after launch, the experiment SHOULD be treated as invalid unless the change can be shown not to alter comparability.

Teams MUST NOT change:

- denominator definitions;
- eligibility rules;
- event interpretation;
- observation windows;
- attribution rules; or
- aggregation logic

solely because the original metric does not support the desired conclusion.

Metric definitions SHOULD be versioned where practical.

---

## 2.5 Randomisation Unit

Every experiment MUST explicitly define the unit of randomisation.

Possible randomisation units include:

- user;
- account;
- household;
- workspace;
- organisation;
- device;
- session;
- request;
- geographic region;
- store;
- team;
- time block; or
- other meaningful cluster.

The randomisation unit MUST match the causal and interference model.

Teams MUST NOT randomise at a unit that allows material contamination between control and treatment.

Examples:

- an organisation-level collaboration feature SHOULD normally randomise by organisation, not individual user;
- a shared pricing experience SHOULD NOT assign different treatments to users who jointly manage one account if cross-exposure would affect behaviour;
- a caching or infrastructure experiment MAY require request-level or cluster-level randomisation depending on interaction effects.

---

## 2.6 Analysis Unit MUST Match the Design

The statistical analysis MUST account for the randomisation structure.

If users are randomised by account, analysis MUST NOT pretend individual users are independent observations when intra-account correlation is material.

Clustered experiments MUST use analysis appropriate to clustering.

Switchback or time-randomised experiments MUST account for temporal structure and carryover effects.

Ignoring the experiment's randomisation unit MAY materially understate uncertainty and MUST NOT be treated as valid inference.

---

## 2.7 Stable Assignment

Treatment assignment MUST be stable for the intended experiment duration unless the experiment explicitly uses time-varying assignment.

A user assigned to control SHOULD remain in control.

A user assigned to treatment SHOULD remain in treatment.

Assignment MUST NOT change because:

- the user refreshes;
- a new session begins;
- the application restarts;
- a deployment occurs; or
- a stateless service handles the next request.

Stable assignment SHOULD be based on deterministic hashing or an equivalent controlled assignment mechanism.

The assignment mechanism MUST be reproducible.

---

## 2.8 Allocation

Traffic allocation MUST be defined before launch.

Examples include:

- 50/50;
- 90/10;
- 95/5;
- equal allocation across multiple variants.

Allocation SHOULD reflect:

- statistical efficiency;
- operational risk;
- expected downside;
- available population;
- rollout constraints; and
- ethical considerations.

High-risk experiments SHOULD begin with lower treatment exposure where feasible.

Allocation changes during an experiment MUST be documented.

If allocation changes affect inference, the analysis MUST account for them.

---

## 2.9 Eligibility

The experiment population MUST be explicitly defined.

Eligibility rules SHOULD specify:

- product surface;
- geography;
- account type;
- platform;
- app version;
- authentication state;
- user lifecycle stage;
- contractual constraints;
- consent status;
- technical capability; and
- exclusion criteria.

Eligibility MUST NOT be changed after observing outcome differences unless the analysis is explicitly exploratory.

Post-hoc exclusion of users based on treatment outcomes MUST NOT be used to manufacture significance.

---

## 2.10 Sample Size and Statistical Power

Confirmatory experiments MUST have a sample-size or power rationale before launch.

The calculation SHOULD define:

- baseline rate or distribution;
- significance threshold where hypothesis testing is used;
- statistical power;
- minimum detectable effect;
- expected allocation;
- unit of analysis;
- anticipated variance;
- experiment duration estimate; and
- clustering or repeated-measures effects where applicable.

A default target of **80% power or greater** MAY be used for conventional confirmatory tests, but power MUST reflect the importance of the decision and consequence of error.

Teams MUST NOT select a minimum detectable effect solely because it produces a convenient sample size.

The minimum detectable effect SHOULD reflect the smallest effect that would materially alter the product decision.

---

## 2.11 Minimum Practically Meaningful Effect

Statistical significance MUST NOT be treated as equivalent to practical significance.

Teams SHOULD define a minimum practically meaningful effect before launch.

For example:

> A conversion increase below 0.3 percentage points would not justify the engineering and operational cost of maintaining the treatment.

A statistically detectable but operationally trivial effect MAY be rejected on practical grounds.

A statistically inconclusive result MUST NOT automatically be interpreted as proof of no effect.

---

## 2.12 Experiment Duration

Experiment duration MUST be long enough to capture relevant behavioural cycles and avoid obvious temporal bias.

Duration SHOULD account for:

- weekday/weekend behaviour;
- billing cycles;
- usage frequency;
- campaign cycles;
- seasonality;
- learning effects;
- novelty effects;
- primacy effects; and
- delayed outcomes.

Teams MUST NOT end an experiment merely because significance appears early unless the experiment uses an approved sequential methodology.

For consumer or work-week products, experiments SHOULD commonly cover at least one complete relevant weekly cycle where user behaviour differs materially by day.

---

## 2.13 Novelty Effects

Teams MUST consider whether users temporarily change behaviour because a treatment is new.

Novelty may create an initial effect that decays.

Experiments involving:

- redesigned navigation;
- new interaction models;
- prominent UI changes;
- notifications;
- gamification;
- recommendation changes; or
- major workflow redesigns

SHOULD examine effect stability over time.

A short-lived uplift MUST NOT automatically be interpreted as a durable effect.

---

## 2.14 Primacy Effects

Teams MUST also consider primacy effects.

Users may initially perform worse because:

- the new experience is unfamiliar;
- learned behaviour conflicts with the treatment;
- users require adaptation; or
- workflow efficiency improves only after repeated exposure.

Where learning is expected, analysis SHOULD distinguish early and mature exposure periods.

An early negative result MUST NOT automatically be interpreted as a permanent degradation.

---

## 2.15 Sequential Testing

Repeatedly checking a fixed-horizon test and stopping when statistical significance appears MUST NOT be used.

This practice inflates false-positive risk.

Teams MUST use one of the following:

1. a pre-defined fixed sample size and stopping rule;
2. an approved group-sequential design;
3. an always-valid sequential method;
4. a Bayesian decision framework with pre-defined thresholds; or
5. another statistically valid sequential approach.

The statistical method MUST match the stopping behaviour.

---

## 2.16 Peeking

Operational monitoring of experiment health is permitted.

Statistical peeking for decision purposes MUST follow the experiment's stopping methodology.

Teams MAY monitor:

- crashes;
- data loss;
- security events;
- severe latency;
- extreme guardrail degradation;
- sample-ratio mismatch;
- instrumentation failure; and
- other safety conditions

at any time.

Stopping for safety or technical integrity MUST be allowed regardless of statistical maturity.

---

## 2.17 Multiple Comparisons

Experiments with many variants, metrics, segments, or hypotheses MUST address multiplicity where confirmatory claims are made.

Teams SHOULD pre-specify:

- which comparisons are primary;
- which are secondary;
- which are exploratory; and
- what correction or inference approach applies.

Teams MUST NOT test dozens of metrics or segments and report only those that happen to be significant as though they were pre-specified findings.

---

## 2.18 Segmentation

Segment analysis SHOULD be used to understand heterogeneity.

Segments MAY include:

- platform;
- geography;
- plan;
- user tenure;
- account size;
- accessibility mode;
- product surface; or
- other relevant characteristics.

Segment results MUST be labelled exploratory unless:

- the segment was pre-specified; and
- the experiment was adequately powered for that segment.

A significant effect in one subgroup and non-significant effect in another does NOT by itself establish that the groups differ.

---

## 2.19 Sample Ratio Mismatch

Teams MUST validate observed assignment counts against expected allocation.

Material sample ratio mismatch MUST be investigated.

Potential causes include:

- assignment defects;
- eligibility bugs;
- missing instrumentation;
- caching;
- bot traffic;
- data pipeline failures;
- treatment-triggered logging differences;
- authentication state changes; and
- exclusion logic.

An experiment with unexplained material sample ratio mismatch MUST NOT be used for confirmatory decision-making.

---

## 2.20 Feature Flags

Experiments MUST be implemented through the canonical feature flag system where runtime treatment control is required.

A feature flag SHOULD define:

- flag owner;
- treatment variants;
- assignment unit;
- eligibility;
- traffic allocation;
- environments;
- start date;
- expected end date;
- rollback behaviour;
- telemetry;
- cleanup owner; and
- expiration or removal plan.

Feature flag evaluation MUST be deterministic where stable assignment is required.

Experiment flags MUST NOT become permanent configuration without explicit governance.

---

## 2.21 Feature Flag Separation of Concerns

Teams SHOULD distinguish:

- experiment flags;
- release flags;
- operational kill switches;
- entitlement flags;
- permission flags; and
- configuration.

A temporary experiment flag MUST NOT silently become an authorization control.

Security boundaries MUST NOT rely solely on client-side feature flags.

Server-side authorization MUST remain authoritative.

---

## 2.22 Kill Switches and Rollback

Experiments with material operational risk MUST support rapid disablement.

A treatment SHOULD be independently disableable without redeploying where practical.

Rollback behaviour MUST be defined before launch.

The team MUST know:

- who can disable the treatment;
- what metric triggers shutdown;
- whether rollback is immediate;
- whether state migration is required; and
- what happens to users already exposed.

---

## 2.23 Instrumentation Plan

An experiment MUST have an instrumentation plan before launch.

The plan SHOULD specify:

- exposure event;
- treatment identifier;
- assignment unit identifier;
- eligibility context;
- outcome events;
- event timestamps;
- schema version;
- relevant dimensions;
- client/server source;
- deduplication strategy; and
- attribution logic.

Experiment exposure MUST be distinguishable from feature eligibility.

A user SHOULD NOT be considered exposed merely because they were eligible for the experiment if the treatment surface was never actually encountered.

---

## 2.24 Exposure Logging

Exposure SHOULD be logged at the point where treatment can influence behaviour.

Exposure events MUST record sufficient information to reconstruct:

- experiment;
- variant;
- assignment unit;
- exposure time;
- relevant version; and
- applicable analysis identifiers.

Duplicate exposure events MUST be handled consistently.

Exposure logging MUST NOT leak secrets, credentials, or prohibited personal data.

---

## 2.25 Data Quality Validation

No experiment MUST be trusted until data quality checks pass.

Pre-analysis validation MUST include applicable checks for:

- event volume;
- missing events;
- duplicate events;
- timestamp integrity;
- schema conformity;
- assignment consistency;
- treatment contamination;
- sample ratio mismatch;
- unexpected population changes;
- delayed ingestion;
- client/server disagreement; and
- metric reproducibility.

The analysis pipeline SHOULD be validated against known synthetic or historical cases.

---

## 2.26 A/A Testing

A/A tests MAY be used to validate the experimentation platform, assignment mechanism, instrumentation, and statistical calibration.

A/A tests SHOULD be considered when:

- a new experimentation platform is introduced;
- assignment logic changes;
- exposure logging changes;
- major analytics pipeline changes occur; or
- unexpected false-positive behaviour is suspected.

A/A testing MUST NOT be used as proof that all future experiments are free from bias.

---

## 2.27 Logging and Analytics Reliability

Experiment event schemas MUST follow the canonical Data & Database and analytics instrumentation standards.

Events SHOULD:

- use stable names;
- have versioned schemas;
- define ownership;
- define retention;
- define required and optional fields;
- reject malformed payloads where practical; and
- have test coverage.

Metric computation SHOULD be reproducible from immutable or appropriately versioned source data.

---

## 2.28 Data Freshness

Teams MUST know the expected latency of experiment data.

Dashboards MUST NOT imply real-time accuracy if underlying data is delayed.

Where late-arriving data is common, experiment analysis SHOULD allow for a defined data maturation period.

Final decisions SHOULD NOT be made before required data is materially complete.

---

## 2.29 Privacy and Data Governance

Experiments MUST comply with the canonical Privacy & Data Governance standard.

Experimentation MUST NOT create a justification for collecting data that would otherwise be unnecessary or prohibited.

Teams MUST apply:

- data minimisation;
- purpose limitation;
- access control;
- retention limits;
- lawful processing requirements;
- regional requirements;
- deletion requirements; and
- data-classification rules.

Experiment datasets MUST NOT include unnecessary personal or sensitive attributes.

---

## 2.30 Consent

Where consent is legally, contractually, or ethically required, treatment assignment and analytics MUST respect that consent.

Users who have opted out of applicable analytics or experimentation MUST NOT be included contrary to the governing consent model.

Consent state MUST NOT be inferred from feature flag eligibility alone.

The experiment specification SHOULD document the applicable consent basis where personal data is processed.

---

## 2.31 Sensitive Data

Experiments involving sensitive data require heightened review.

Examples MAY include:

- health information;
- financial information;
- precise location;
- biometric data;
- children's data;
- authentication data;
- government identifiers;
- highly sensitive behavioural data; and
- protected or regulated attributes.

Sensitive attributes MUST NOT be introduced solely for exploratory segmentation without an approved purpose and governance basis.

---

## 2.32 Ethics

Experiments MUST have an ethically defensible user impact.

Teams MUST NOT knowingly design experiments that depend on:

- deception likely to cause material harm;
- coercion;
- exploitative dark patterns;
- unsafe behaviour;
- discriminatory exclusion;
- intentional security weakening;
- deliberate accessibility degradation;
- intentional data loss;
- manipulation of users beyond accepted product interaction norms; or
- withholding essential functionality where doing so would create material harm.

Where an intervention materially affects user rights, safety, finances, privacy, or access, additional review SHOULD be required.

---

## 2.33 Pricing and Financial Experiments

Pricing experiments require explicit product, legal, analytics, and governance review where applicable.

Teams MUST consider:

- billing consistency;
- taxation;
- refund implications;
- consumer protection;
- price presentation;
- contractual terms;
- account-level contamination;
- currency handling;
- geographic restrictions; and
- fairness implications.

Pricing assignment MUST NOT cause users within the same contractual entity to receive incoherent or contradictory terms unless this is an intentional and approved design.

---

## 2.34 Accessibility

Experiment variants MUST meet the corpus Accessibility standard.

A treatment MUST NOT deliberately degrade accessibility in order to test whether users tolerate a less accessible design.

All variants MUST maintain applicable:

- semantic structure;
- keyboard operability;
- focus management;
- accessible names;
- contrast;
- error messaging;
- reduced motion;
- touch target requirements; and
- assistive technology compatibility.

Accessibility defects MUST be treated as implementation defects, not acceptable experimental variation.

---

## 2.35 Security

Experiments MUST comply with the canonical Security standard.

An experiment MUST NOT weaken:

- authentication;
- authorization;
- input validation;
- rate limiting;
- CSRF protections;
- session controls;
- audit requirements;
- data protection;
- secret handling; or
- abuse controls

unless the security change itself is the approved subject of the experiment and the risk has been explicitly reviewed.

Client-side assignment MUST NOT grant server-side privileges.

Security-sensitive treatment logic SHOULD be evaluated server-side.

---

## 2.36 Data & Database Alignment

Experiment-related storage MUST follow the Data & Database standard.

Where experiment variants modify persisted state, teams MUST define:

- schema compatibility;
- migration behaviour;
- cross-variant compatibility;
- rollback behaviour;
- treatment transitions;
- cleanup; and
- long-term data ownership.

Control and treatment users MUST NOT corrupt shared state through incompatible schemas.

Temporary experiment columns, tables, or fields SHOULD have explicit cleanup ownership.

---

## 2.37 API Alignment

Experimental API behaviour MUST follow the API standard.

Experiments affecting APIs MUST define:

- contract compatibility;
- versioning;
- consumer eligibility;
- variant propagation;
- fallback behaviour;
- error semantics;
- observability; and
- rollback.

External API consumers MUST NOT unknowingly receive unstable experimental contracts unless participation is explicit and governed.

Experiment identifiers SHOULD NOT leak into public contracts without a justified compatibility strategy.

---

## 2.38 State Management Alignment

Client and server state MUST remain internally coherent across experiment variants.

A variant MUST define behaviour for applicable:

- initial state;
- loading;
- empty state;
- success;
- error;
- stale state;
- optimistic state;
- rollback; and
- cross-session persistence.

Feature flag assignment MUST NOT create impossible mixed states after refresh, login, logout, or device change.

Where treatment affects persistent user state, teams MUST define what happens when assignment changes or the experiment ends.

---

## 2.39 Forms & Validation Alignment

Experiment variants involving forms MUST comply with the Forms & Validation standard.

Variants MUST maintain authoritative server-side validation.

An experiment MUST NOT weaken required validation merely to reduce visible friction unless that change is explicitly approved and safe.

Form experiments MUST account for:

- validation;
- duplicate submission;
- error handling;
- field persistence;
- submission state;
- accessibility;
- abuse protection; and
- backend compatibility.

---

## 2.40 Design Tokens

UI variants MUST use canonical Design Tokens.

Experimentation MUST NOT become a mechanism for uncontrolled introduction of:

- arbitrary colours;
- one-off spacing;
- non-standard typography;
- inconsistent radii;
- ungoverned motion;
- arbitrary shadows; or
- bespoke breakpoints.

Experimental visual treatment MAY vary design decisions, but implementation SHOULD remain within the token architecture.

A proposed token change SHOULD be handled through the Design Tokens governance process.

---

## 2.41 Component Baseline

**shadcn/ui is the baseline component implementation model.**

Experimental UI SHOULD compose existing canonical components before introducing bespoke primitives.

Teams MUST NOT recreate foundational controls solely to enable an experiment when an existing approved component can support the required variation.

Shared components affected by an experiment SHOULD preserve:

- accessible semantics;
- stable public APIs where practical;
- canonical tokens;
- standard interaction behaviour; and
- regression coverage.

Experimental component variants SHOULD be temporary unless formally promoted into the component standard.

---

## 2.42 Pattern Standards

Experimental flows SHOULD follow canonical product patterns unless the pattern itself is the subject of the experiment.

Examples include:

- dialogs;
- destructive actions;
- confirmation;
- search;
- filters;
- pagination;
- forms;
- onboarding;
- tables;
- command interfaces;
- notifications;
- empty states;
- errors; and
- authentication flows.

A pattern experiment MUST explicitly identify which canonical behaviour is being varied and why.

---

## 2.43 UX Consistency

Experiments SHOULD avoid creating incoherent combinations of incompatible UI variants.

Where multiple experiments may affect the same surface, teams MUST manage interaction risk.

Possible controls include:

- mutual exclusion;
- experiment namespaces;
- layering rules;
- priority rules;
- joint randomisation; or
- explicit interaction testing.

Experiment overlap MUST NOT silently create combinations that were never designed or analysed.

---

## 2.44 Concurrent Experiments

Concurrent experiments MAY run where interactions are unlikely or are explicitly accounted for.

Teams MUST consider:

- shared metrics;
- overlapping populations;
- shared UI surfaces;
- shared backend state;
- causal interference;
- allocation conflicts; and
- treatment interactions.

Experiments with material interaction risk SHOULD be mutually exclusive or jointly designed.

---

## 2.45 Experiment Registry

All material experiments MUST be recorded in a canonical experiment registry.

The registry SHOULD contain:

- experiment ID;
- name;
- owner;
- hypothesis;
- status;
- start date;
- end date;
- population;
- allocation;
- randomisation unit;
- primary metric;
- guardrails;
- sample-size rationale;
- feature flag;
- analysis link;
- decision;
- cleanup status; and
- related documentation.

An experiment MUST have a unique identifier.

---

## 2.46 Pre-Registration

Material confirmatory experiments SHOULD have a pre-launch analysis plan.

The plan SHOULD document:

- hypothesis;
- primary metric;
- secondary metrics;
- guardrails;
- counter-metrics;
- randomisation unit;
- analysis unit;
- eligibility;
- sample size;
- stopping rule;
- exclusion rules;
- segmentation plan; and
- decision thresholds.

The pre-launch plan SHOULD be immutable or versioned after exposure begins.

Changes MUST be clearly marked as post-launch amendments.

---

## 2.47 Decision Rules

Teams SHOULD define decision logic before results are available.

Examples include:

- ship if primary metric improves beyond the practical threshold and no guardrail is materially worse;
- reject if a critical guardrail breaches its threshold;
- extend only under a valid sequential design;
- run a follow-up experiment if evidence remains inconclusive;
- adopt only for a pre-specified segment if that segment was independently powered and the interaction is supported.

Decision rules MUST NOT guarantee automatic rollout where qualitative, operational, ethical, or strategic evidence contradicts the experiment.

---

## 2.48 Interpreting Null Results

A non-significant result MUST NOT automatically be described as:

> “No effect.”

Teams SHOULD distinguish:

- evidence of no practically meaningful effect;
- insufficient power;
- high uncertainty;
- implementation failure;
- measurement failure; and
- genuinely null behaviour.

Confidence intervals or equivalent uncertainty representations SHOULD accompany major conclusions.

---

## 2.49 Interpreting Positive Results

A statistically significant positive result MUST NOT automatically trigger rollout.

Teams MUST also consider:

- effect magnitude;
- uncertainty;
- guardrails;
- counter-metrics;
- data quality;
- novelty;
- persistence;
- segment consistency;
- implementation cost;
- long-term maintainability;
- user experience;
- ethical considerations; and
- strategic fit.

Statistical evidence informs the decision. It does not replace the decision process.

---

## 2.50 Experiment Decision Documentation

Every material experiment MUST end with a documented outcome.

The decision record SHOULD include:

1. experiment ID;
2. hypothesis;
3. dates;
4. population;
5. variants;
6. allocation;
7. randomisation unit;
8. sample size;
9. primary result;
10. uncertainty interval;
11. guardrail results;
12. counter-metric results;
13. data-quality findings;
14. important segments;
15. known limitations;
16. novelty or primacy considerations;
17. final decision;
18. rationale;
19. follow-up actions;
20. feature flag disposition; and
21. cleanup ownership.

The final record MUST distinguish:

- pre-specified findings;
- exploratory findings;
- interpretation; and
- business or product judgment.

---

## 2.51 Feature Flag Disposition

At experiment completion, the feature flag MUST be assigned an explicit disposition.

Valid outcomes include:

- remove treatment and retain control;
- promote treatment and remove experiment branching;
- retain as a controlled release flag with new ownership;
- continue under a newly approved experiment;
- convert to a documented long-term configuration.

Completed experiment code paths MUST NOT remain indefinitely without ownership.

Dead variants SHOULD be removed.

---

## 2.52 Cleanup

Experiment cleanup MUST include applicable:

- unused feature flags;
- dead variant code;
- obsolete analytics events;
- temporary database fields;
- temporary configuration;
- dashboard filters;
- test fixtures;
- documentation;
- targeting rules; and
- experimental styling.

Cleanup SHOULD be included in the definition of done.

---

# 3. Anti-patterns

## 3.1 Testing Without a Hypothesis

**Anti-pattern:**

> “Let's change the page and measure everything.”

Experiments MUST begin with a decision question and defined hypothesis.

---

## 3.2 Metric Fishing

**Anti-pattern:**

Testing many metrics and reporting whichever one is significant.

This MUST NOT be presented as confirmatory evidence.

Exploratory findings MUST be labelled exploratory.

---

## 3.3 Changing the Primary Metric

**Anti-pattern:**

Replacing the primary metric after seeing an unfavourable result.

The primary metric MUST remain the pre-specified metric unless the experiment is invalidated and re-run.

---

## 3.4 Peeking Until Significant

**Anti-pattern:**

Checking p-values every day and stopping as soon as `p < 0.05`.

This MUST NOT be used under a fixed-horizon test.

---

## 3.5 Stopping Because the Result Looks Good

An experiment MUST NOT be ended solely because an early result supports the preferred treatment.

A valid stopping rule MUST govern the decision.

---

## 3.6 Running Until Significant

An experiment MUST NOT continue indefinitely solely to obtain significance.

Maximum duration, sample size, or sequential stopping behaviour SHOULD be pre-defined.

---

## 3.7 Confusing Significance With Importance

**Anti-pattern:**

> “The change is significant, therefore we should ship it.”

A tiny effect can be statistically significant while having no meaningful product value.

---

## 3.8 Calling Non-Significance “No Difference”

Failure to reject a null hypothesis MUST NOT automatically be interpreted as equivalence.

Equivalence requires an appropriate design and practical bounds.

---

## 3.9 Randomising at the Wrong Unit

**Anti-pattern:**

Randomising individuals where members of the same account heavily influence one another.

The randomisation unit MUST reflect interference and shared state.

---

## 3.10 Ignoring Clustering

Treating clustered observations as independent can materially understate uncertainty.

This MUST NOT be done.

---

## 3.11 Unstable Assignment

A user MUST NOT randomly switch between treatment and control because assignment is recomputed inconsistently.

---

## 3.12 Missing Exposure Logging

Eligibility MUST NOT be treated as equivalent to exposure where users may never encounter the experiment.

---

## 3.13 Sample Ratio Mismatch Ignorance

An unexplained sample ratio mismatch MUST NOT be dismissed as harmless noise.

---

## 3.14 Experimenting on Broken Instrumentation

A treatment result MUST NOT be interpreted when event collection or assignment logging is known to be unreliable.

---

## 3.15 Post-Hoc Population Changes

Teams MUST NOT remove inconvenient users or cohorts after seeing outcome results unless the removal follows a pre-defined data-quality rule.

---

## 3.16 Unpowered Subgroup Claims

**Anti-pattern:**

> “It works for enterprise users.”

when the enterprise subgroup was not pre-specified or sufficiently powered.

Such findings MUST be presented as exploratory.

---

## 3.17 Guardrail Blindness

A primary metric improvement MUST NOT justify ignoring material degradation in safety, reliability, trust, accessibility, privacy, or retention.

---

## 3.18 Proxy Optimisation

Teams MUST NOT assume that improving a proxy metric automatically improves the underlying user or business outcome.

Click-through rate, time spent, opens, and similar engagement proxies require contextual interpretation.

---

## 3.19 Novelty Misinterpretation

A short-term uplift caused by novelty MUST NOT be represented as proven durable improvement.

---

## 3.20 Primacy Misinterpretation

A temporary performance decline caused by user learning MUST NOT automatically be represented as permanent harm.

---

## 3.21 Feature Flags as Permanent Architecture

Experiment flags MUST NOT accumulate indefinitely.

Long-lived configuration requires explicit ownership and design.

---

## 3.22 Client-Side Security Flags

A client-visible flag MUST NOT be treated as an authorization boundary.

---

## 3.23 Dark Pattern Experiments

Teams MUST NOT use experimentation to optimise deceptive or coercive behaviour.

---

## 3.24 Accessibility as a Treatment Variable

Accessibility MUST NOT be deliberately degraded to determine whether users notice.

---

## 3.25 Privacy by Experiment Exception

Experimentation MUST NOT be treated as an exemption from consent, minimisation, retention, or data governance requirements.

---

## 3.26 Treating the Experiment as the Decision

The existence of a statistically significant result MUST NOT replace product, engineering, ethical, or operational judgment.

---

## 3.27 Silent Experiment Overlap

Multiple experiments MUST NOT independently modify the same behaviour without interaction controls where those interactions could affect inference.

---

## 3.28 No Cleanup

Completed experiments MUST NOT leave obsolete flags, dead code, temporary schema, and unused events indefinitely.

---

# 4. Checklist

## 4.1 Before Designing the Experiment

The team MUST confirm:

- [ ] The decision question is explicit.
- [ ] A causal hypothesis exists.
- [ ] The intended treatment is defined.
- [ ] The control condition is defined.
- [ ] The target population is defined.
- [ ] The expected mechanism is documented.
- [ ] Experimentation is appropriate for the decision.
- [ ] Applicable security requirements are understood.
- [ ] Privacy and consent requirements are understood.
- [ ] Ethical risks have been considered.
- [ ] Accessibility requirements apply equally to all variants.
- [ ] Existing components and patterns have been reviewed.
- [ ] shadcn/ui remains the component baseline.

---

## 4.2 Before Launch

The team MUST confirm:

- [ ] The primary metric is pre-defined.
- [ ] Secondary metrics are documented.
- [ ] Guardrail metrics are defined.
- [ ] Counter-metrics are defined where applicable.
- [ ] Metric formulas are documented.
- [ ] The randomisation unit is defined.
- [ ] The analysis unit matches the design.
- [ ] Treatment assignment is stable.
- [ ] Eligibility criteria are explicit.
- [ ] Traffic allocation is defined.
- [ ] Sample size or power has been assessed.
- [ ] Minimum practically meaningful effect is defined where applicable.
- [ ] Stopping criteria are defined.
- [ ] Multiple-comparison strategy is defined where needed.
- [ ] Novelty and primacy risk have been considered.
- [ ] Feature flag ownership is defined.
- [ ] Rollback is available where required.
- [ ] Exposure instrumentation exists.
- [ ] Outcome instrumentation exists.
- [ ] Data-quality checks have passed.
- [ ] Sample-ratio monitoring exists.
- [ ] Privacy review is complete where required.
- [ ] Security review is complete where required.
- [ ] Experiment documentation is registered.

---

## 4.3 During the Experiment

The team MUST monitor:

- [ ] assignment consistency;
- [ ] exposure volume;
- [ ] sample ratio;
- [ ] event quality;
- [ ] data freshness;
- [ ] critical guardrails;
- [ ] crashes and errors;
- [ ] security events;
- [ ] operational health;
- [ ] accessibility regressions;
- [ ] treatment contamination;
- [ ] flag behaviour; and
- [ ] unexpected interaction with concurrent experiments.

Teams MUST NOT alter the analysis plan based on observed treatment outcomes without explicitly documenting the analysis as post-hoc or exploratory.

---

## 4.4 Before Analysing Results

The team MUST confirm:

- [ ] Required sample size or stopping rule has been satisfied.
- [ ] Data has sufficiently matured.
- [ ] Sample ratio is valid.
- [ ] Assignment is stable.
- [ ] Exposure logging is reliable.
- [ ] Outcome events are complete.
- [ ] Duplicate or malformed events are handled.
- [ ] Exclusion rules match the pre-analysis plan.
- [ ] No major instrumentation defect invalidates the result.

---

## 4.5 When Interpreting Results

The team MUST evaluate:

- [ ] Primary metric effect size.
- [ ] Statistical uncertainty.
- [ ] Practical significance.
- [ ] Guardrail metrics.
- [ ] Counter-metrics.
- [ ] Secondary metrics.
- [ ] Pre-specified segments.
- [ ] Exploratory segments separately.
- [ ] Novelty effects.
- [ ] Primacy effects.
- [ ] Data-quality limitations.
- [ ] Operational cost.
- [ ] Security impact.
- [ ] Privacy impact.
- [ ] Accessibility impact.
- [ ] Long-term maintainability.
- [ ] Strategic relevance.

---

## 4.6 Before Shipping a Winning Treatment

The team MUST confirm:

- [ ] The result is not explained by a known instrumentation defect.
- [ ] The effect is practically meaningful.
- [ ] Critical guardrails are acceptable.
- [ ] Security requirements remain satisfied.
- [ ] Privacy obligations remain satisfied.
- [ ] Accessibility requirements remain satisfied.
- [ ] API and data compatibility are acceptable.
- [ ] State transitions are stable.
- [ ] Forms and validation remain authoritative.
- [ ] Canonical tokens are used.
- [ ] Canonical shadcn/ui-based components are used.
- [ ] Required pattern standards are followed.
- [ ] Production observability exists.
- [ ] Rollback remains available.
- [ ] Experiment code is ready for cleanup or promotion.

---

## 4.7 At Experiment Close

The team MUST confirm:

- [ ] A final decision is documented.
- [ ] The hypothesis is recorded.
- [ ] Results are recorded.
- [ ] Uncertainty is recorded.
- [ ] Guardrails are recorded.
- [ ] Counter-metrics are recorded.
- [ ] Data-quality issues are recorded.
- [ ] Exploratory findings are clearly labelled.
- [ ] Limitations are documented.
- [ ] The feature flag disposition is documented.
- [ ] Dead variants are scheduled for removal.
- [ ] Temporary data structures are scheduled for cleanup.
- [ ] Temporary analytics events are reviewed.
- [ ] Follow-up work has an owner.
- [ ] The experiment registry is updated.

---

# 5. Canonical Summary

Experiments exist to reduce uncertainty around product and engineering decisions through controlled causal evidence.

Every confirmatory experiment MUST begin with a pre-defined **decision question, hypothesis, population, treatment, primary metric, randomisation unit, sample-size rationale, and stopping rule**.

The primary metric MUST be defined before exposure.

Guardrails and counter-metrics MUST capture material downside.

Randomisation MUST occur at a unit appropriate to the causal system, and analysis MUST respect that unit.

Stable assignment MUST be maintained for experiments that require persistent treatment.

Sample size MUST be based on meaningful effect size, variance, power, and design rather than convenience.

Teams MUST distinguish **statistical significance** from **practical significance**.

Experiments MUST account for novelty, primacy, seasonality, delayed outcomes, and relevant behavioural cycles.

Repeated fixed-horizon peeking and stopping on significance MUST NOT be used.

If sequential decisions are required, teams MUST use a statistically valid sequential design.

Feature flags MUST provide deterministic assignment, safe rollout, observability, rollback, ownership, and cleanup.

Experiment exposure and outcomes MUST be instrumented explicitly.

No result is trustworthy until data-quality checks pass.

Sample ratio mismatch, instrumentation defects, assignment instability, and material treatment contamination MUST be investigated before decision-making.

Experimentation MUST comply with Security, Privacy & Data Governance, Data & Database, API, State Management, Forms & Validation, Accessibility, Design Tokens, Component, and Pattern standards.

**shadcn/ui remains the component baseline.**

Experimentation MUST NOT justify weaker:

- security;
- privacy;
- consent;
- data governance;
- accessibility;
- validation;
- reliability; or
- ethical standards.

A positive primary metric result does not automatically mean “ship.”

A non-significant result does not automatically mean “no effect.”

Every material experiment MUST end with a documented decision, evidence summary, limitations, feature flag disposition, and cleanup ownership.

The Gold Standard is:

> **Define the decision before the test. Pre-specify the hypothesis and metrics. Randomise at the correct unit. Power the experiment for a meaningful effect. Protect guardrails. Instrument exposure correctly. Do not peek with invalid statistics. Treat novelty and primacy as real risks. Verify the data before trusting the result. Respect security, privacy, consent, accessibility, and ethics. Document the decision, remove the experiment, and preserve the evidence.**

**Canonical placement:**  
**Analytics → Experimentation → Feature Flags → Privacy & Data Governance**

This version is structured to align directly with the existing Gold Standard corpus and the estimation standard you established previously.
