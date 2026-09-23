---
id: "incidents"
title: "Incident Management & On-call"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["operations", "incidents", "incident", "management", "on", "call"]
applies_to: ["infra"]
related: ["tables", "feedback"]
legacy_number: 79
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 65097
provenance: baseline

---

# Incident Management & On-call — Gold Standard 2026

**Status:** Canonical  
**Standard level:** Gold Standard 2026  
**Canonical placement:** **Observability → Incident Management → Documentation → Governance**  
**UI baseline:** shadcn/ui for operator-facing incident tooling  
**Applies to:** Production incidents, reliability events, security-adjacent operational incidents, data incidents, degraded services, customer-impacting outages, SLO breaches, on-call rotations, paging, escalation, incident communications, postmortems, and resilience exercises.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements unless an approved exception is documented.

---

# 1. Purpose

## 1.1 Objective

This standard defines how the organisation MUST prepare for, detect, declare, coordinate, mitigate, communicate, review, and learn from production incidents.

It governs:

- incident severity;
- declaration;
- Incident Commander responsibilities;
- Operations Lead responsibilities;
- Communications Lead responsibilities;
- Scribe responsibilities;
- subject-matter-expert participation;
- on-call rotations;
- escalation;
- handoff;
- paging;
- alert quality;
- runbooks;
- incident channels and records;
- status pages;
- internal and external communications;
- mitigation;
- recovery;
- SLO and error-budget handling;
- blameless postmortems;
- corrective-action tracking;
- incident metrics;
- game days and response exercises.

This standard MUST be applied together with:

- Security;
- Data & Database;
- API;
- Realtime;
- Jobs & Queue;
- State Management;
- Forms & Validation;
- Accessibility;
- Design Tokens;
- Component;
- Pattern;
- Content & UX Writing;
- Observability;
- Disaster Recovery and Business Continuity standards.

Incident response MUST be designed before an incident occurs.

A production emergency MUST NOT depend on responders inventing:

- roles;
- escalation paths;
- communication channels;
- rollback procedures;
- customer messaging;
- ownership;

while the incident is already in progress.

---

## 1.2 Governing principles

Incident management MUST optimise for:

1. **protecting people and data;**
2. **limiting customer/business impact;**
3. **restoring safe service;**
4. **maintaining clear command and communication;**
5. **preserving evidence and operational context;**
6. **learning and preventing recurrence.**

During active response, the priority order SHOULD normally be:

**safety/security → stop further damage → mitigate user impact → restore service → verify recovery → determine deeper cause.**

Root-cause investigation MUST NOT unnecessarily delay an available safe mitigation.

---

## 1.3 Incident management versus technical investigation

Incident management and technical investigation are separate responsibilities.

The organisation MUST distinguish:

**Managing the incident**
- declaring severity;
- assigning roles;
- coordinating responders;
- setting priorities;
- managing communications;
- requesting resources;
- recording decisions;
- managing handoffs.

**Resolving the incident**
- diagnosing;
- mitigating;
- rolling back;
- failing over;
- repairing;
- verifying.

The Incident Commander SHOULD NOT become the primary hands-on debugger during a major incident once sufficient responders exist.

---

## 1.4 Incident versus alert

An **alert** is a signal that may require investigation.

An **incident** is an operational event requiring coordinated response or material follow-up.

One incident MAY produce many alerts.

Many alerts MUST NOT become independent incidents when they have one underlying user-impacting condition.

Alert count MUST NOT determine severity.

---

## 1.5 Incident versus problem

Incident response restores acceptable service.

Longer-term root/contributing-cause remediation MAY continue after the incident is resolved.

The system MUST distinguish:

- incident mitigation;
- incident resolution;
- corrective work.

A service MUST NOT remain formally "incident active" for weeks merely because every long-term improvement has not yet shipped.

---

# 2. Rules

## 2.1 Severity model

Production incidents MUST use one canonical severity model.

Severity MUST primarily reflect **current or credibly imminent impact**, not:

- executive attention;
- responder anxiety;
- number of Slack messages;
- apparent technical complexity;
- seniority of the person reporting it.

The canonical baseline is:

| Severity | Definition | Typical conditions | Response baseline |
|---|---|---|---|
| **SEV-1 Critical** | Severe, widespread, or high-consequence impact requiring immediate coordinated response | Major outage; critical workflow unavailable; confirmed material data loss/corruption; severe security impact; safety/legal consequence; widespread inability to authenticate/pay/operate | Immediate page; formal incident command; dedicated comms and scribe; public/customer communication where applicable |
| **SEV-2 Major** | Material degradation affecting a meaningful user population or critical capability | Significant partial outage; severe latency/errors; important workflow materially degraded; contained but material data problem | Immediate page; formal or lightweight incident command; regular stakeholder updates |
| **SEV-3 Minor** | Limited production impact that requires timely engineering intervention but not major-incident mobilisation | Small user cohort affected; non-critical component degraded; workaround exists | On-call response; incident record; escalation as required |
| **SEV-4 Operational** | Low-impact operational issue requiring tracking but not urgent incident response | Minor defect, isolated non-critical failure, maintenance follow-up | Ticket/work queue; MUST NOT routinely page |

Teams MAY add domain-specific examples, but MUST NOT redefine the meaning of severity numbers independently.

---

## 2.2 Severity is impact based

Severity MUST account for relevant dimensions including:

- affected users;
- affected tenants;
- affected geographies;
- criticality of affected workflows;
- duration;
- data integrity;
- security exposure;
- financial impact;
- regulatory/legal consequence;
- availability of workarounds.

A technically small incident MAY be SEV-1 if the affected operation is sufficiently consequential.

A technically large internal failure MAY be lower severity if it has no material user or business impact and does not create imminent risk.

---

## 2.3 Uncertainty and severity

When impact is uncertain but credible evidence suggests potentially severe consequences, responders SHOULD temporarily choose the higher plausible severity.

Severity MAY be reduced when evidence establishes a smaller scope.

Responders MUST NOT delay declaration while waiting for perfect certainty.

It is preferable to declare and downgrade than to leave a major incident unmanaged because the exact blast radius was unknown.

---

## 2.4 Severity changes

Severity MAY increase or decrease during an incident.

Every material severity change MUST be:

- explicitly recorded;
- communicated to responders;
- reflected in communication cadence where applicable.

Severity MUST NOT silently drift.

---

## 2.5 Security incidents

Security incidents MUST follow the Security Incident Response standard where it imposes stricter:

- containment;
- evidence preservation;
- confidentiality;
- legal;
- notification;
- forensic;

requirements.

Security response MAY restrict normal incident communication.

Public communication MUST NOT disclose attacker-useful information, sensitive indicators, credentials, exploit detail, or unverified attribution.

Operational incident management MAY still provide:

- command;
- roles;
- coordination;
- timelines;

provided Security remains authoritative.

---

## 2.6 Data incidents

Confirmed or suspected material:

- data loss;
- data corruption;
- cross-tenant disclosure;
- incorrect financial state;
- unrecoverable write loss;

MUST trigger severity assessment independently from service availability.

A service responding `200 OK` while returning materially corrupt data MUST NOT be treated as healthy.

Data correctness is an incident dimension.

---

## 2.7 Incident declaration

Any trained responder MUST be permitted to declare an incident when the severity criteria are plausibly met.

Incident declaration MUST NOT require managerial permission.

A responder SHOULD declare when coordination would improve the outcome.

Incident declaration MUST create or designate:

- incident identifier;
- severity;
- Incident Commander;
- incident channel/room;
- incident record;
- affected service(s);
- initial impact statement.

---

## 2.8 Declaration threshold

The threshold for declaring an incident SHOULD be lower than the threshold for proving root cause.

Common declaration triggers include:

- multiple responders required;
- multiple teams involved;
- substantial customer impact;
- uncertain blast radius;
- significant mitigation coordination;
- external communication required;
- incident likely to outlast one responder's immediate attention.

Responders MUST NOT continue an increasingly complex outage as an informal debugging thread merely to avoid "making it an incident."

---

## 2.9 Major-incident roles

SEV-1 incidents MUST assign at minimum:

- **Incident Commander (IC);**
- **Operations Lead (OL);**
- **Communications Lead (CL);**
- **Scribe.**

SEV-2 incidents SHOULD assign these roles when coordination complexity warrants it.

One person MAY temporarily hold multiple roles at the beginning of an incident.

Roles SHOULD be delegated as soon as sufficient responders arrive.

---

## 2.10 Incident Commander

The Incident Commander owns overall coordination.

The IC MUST:

- maintain the high-level incident picture;
- establish priorities;
- assign roles;
- request additional responders;
- coordinate parallel workstreams;
- decide when escalation is required;
- control major response changes;
- ensure communication cadence;
- ensure evidence/timeline capture;
- decide when mitigation and recovery criteria are met;
- coordinate handoff.

The IC MUST NOT attempt to personally perform every technical action.

The IC SHOULD remain sufficiently detached from implementation detail to maintain situational awareness.

---

## 2.11 IC authority

During an active incident, the IC MUST have clear authority over incident-response coordination.

This authority includes requesting:

- deployment freeze;
- rollback;
- traffic shift;
- escalation;
- additional staffing;
- vendor escalation;
- temporary feature disablement;

subject to Security and safety constraints.

Disagreement SHOULD be surfaced to the IC rather than producing uncoordinated competing actions.

---

## 2.12 Operations Lead

The Operations Lead coordinates technical mitigation.

The OL MUST:

- organise technical responders;
- maintain current hypotheses;
- assign diagnostic/mitigation work;
- report concise technical state to the IC;
- coordinate changes;
- validate mitigation results.

The OL SHOULD prevent multiple responders from making uncoordinated production changes to the same system.

Hands-on responders MAY work under the OL.

---

## 2.13 Communications Lead

The Communications Lead owns incident communication.

The CL MUST coordinate:

- internal stakeholder updates;
- customer/public updates where applicable;
- support-team updates;
- executive summaries where required;
- status-page updates.

The CL MUST obtain operational facts from the IC/OL but SHOULD NOT require technical responders to individually answer routine stakeholder questions.

Communication MUST be factual and impact-oriented.

---

## 2.14 Scribe

The Scribe MUST maintain a useful chronological record.

The incident record SHOULD capture:

- detection;
- declaration;
- role assignments;
- severity changes;
- hypotheses;
- commands/actions;
- configuration/deployment changes;
- mitigation attempts;
- results;
- stakeholder communications;
- recovery milestones;
- key decisions.

The Scribe MUST distinguish confirmed facts from hypotheses where ambiguity exists.

The timeline SHOULD use consistent timestamps and timezone.

UTC SHOULD be used for technical incident timelines unless organisational policy specifies an equivalent unambiguous standard.

---

## 2.15 Subject-matter experts

Subject-matter experts SHOULD be added when specific expertise is required.

SMEs MUST have a clearly assigned question or workstream where practical.

The incident room MUST NOT become crowded with passive participants whose presence increases communication overhead.

Observers SHOULD use read-only or secondary channels where appropriate.

---

## 2.16 Executive and stakeholder liaison

A major incident MAY assign a separate business/executive liaison when stakeholder demand would otherwise distract the IC or Communications Lead.

Executives MUST NOT bypass the incident command structure to direct individual responders independently.

Business priority input SHOULD flow through the IC.

---

## 2.17 Role handoff

Formal roles MUST be handed off explicitly.

A handoff MUST communicate at least:

- current severity;
- impact;
- current mitigation state;
- active hypotheses;
- actions in progress;
- known risks;
- next communication deadline;
- pending escalations.

The receiving person MUST explicitly acknowledge the handoff.

The incident record MUST identify the current role owner.

---

## 2.18 Incident command post

Every major incident MUST have one canonical coordination location.

This MAY include:

- chat channel;
- incident-management platform;
- bridge/video room;
- incident document.

Responders MUST know which location contains authoritative coordination state.

Critical decisions MUST NOT be fragmented across private messages.

---

## 2.19 Incident record

The canonical incident record MUST include, at minimum:

- incident ID;
- title;
- severity;
- current status;
- start/detection/declaration timestamps;
- affected services;
- user/business impact;
- assigned roles;
- timeline;
- current mitigation;
- communication links;
- relevant dashboards;
- runbooks;
- postmortem link when required.

Incident records MUST be retained according to Governance and Security requirements.

---

## 2.20 Incident titles

Incident titles SHOULD describe observable impact.

Prefer:

**Checkout requests failing in APAC**

over:

**Redis incident**

before the underlying cause is confirmed.

Titles SHOULD remain understandable to responders who are not specialists in the suspected subsystem.

---

## 2.21 Stabilise before diagnosing deeply

Responders SHOULD prioritise known safe mitigations such as:

- rollback;
- failover;
- traffic reduction;
- feature flag;
- capacity increase;
- disabling an optional dependency;
- reverting configuration;

before pursuing extended root-cause analysis when mitigation can materially reduce impact.

Responders MUST NOT continue an elegant investigation while customers remain exposed to avoidable harm.

---

## 2.22 Change control during incidents

Production changes during an active major incident MUST be coordinated.

Every material change SHOULD identify:

- owner;
- intended effect;
- risk;
- rollback;
- verification signal.

Parallel changes that obscure causality SHOULD be avoided.

The IC MAY establish an incident change freeze for unrelated deployments.

---

## 2.23 Preserve evidence

Responders SHOULD preserve evidence needed for later diagnosis before destructive remediation where doing so does not materially prolong customer harm.

Relevant evidence MAY include:

- logs;
- traces;
- metrics;
- crash dumps;
- configuration versions;
- deployment versions;
- audit events;
- database state;
- queue positions.

Security incidents MUST follow stricter evidence-preservation requirements.

---

## 2.24 Recovery validation

An incident MUST NOT be resolved because one dashboard turns green.

Recovery SHOULD verify appropriate user-facing outcomes.

Verification MAY include:

- SLIs;
- synthetic tests;
- critical workflow tests;
- error rates;
- latency;
- queue recovery;
- database correctness;
- customer confirmation.

Recovery criteria SHOULD be identified during the incident.

---

## 2.25 Monitoring state

A mitigation that appears successful SHOULD enter a monitoring period before final resolution when relapse is plausible.

The incident MAY move through states equivalent to:

- investigating;
- identified;
- mitigating;
- monitoring;
- resolved.

The exact tool vocabulary MAY differ, but the lifecycle MUST remain clear.

---

## 2.26 Resolution

An incident SHOULD be marked resolved when:

- customer/business impact is ended;
- system behaviour is acceptably stable;
- immediate data/security risk is controlled;
- no urgent mitigation work remains.

Long-term corrective actions MUST NOT block resolution.

Unresolved data repair affecting users MUST prevent premature resolution when correctness has not actually been restored.

---

# 2.27 On-call ownership

Every production service requiring urgent human intervention MUST have an identified on-call owner.

The ownership registry MUST be discoverable without tribal knowledge.

Ownership MUST identify:

- primary team;
- escalation team;
- service/runbook links;
- relevant dashboards.

An alert without a responsible owner is non-conformant.

---

## 2.28 Rotation design

On-call rotations MUST be sustainable.

The organisation SHOULD design rotations to minimise:

- chronic sleep interruption;
- excessive consecutive shifts;
- unfair holiday/weekend distribution;
- permanent dependence on one expert.

Where staffing permits, follow-the-sun coverage SHOULD be preferred for globally critical services.

A rotation MUST NOT knowingly depend on one irreplaceable individual.

---

## 2.29 Primary and secondary on-call

Critical services SHOULD have:

- primary on-call;
- secondary/escalation on-call.

The secondary MUST be capable of assuming the incident if the primary:

- does not acknowledge;
- lacks access;
- requires additional help;
- becomes unavailable.

Secondary on-call MUST NOT be purely ceremonial.

---

## 2.30 On-call readiness

Before joining a production rotation, a responder MUST have:

- required access;
- paging access;
- service orientation;
- runbook familiarity;
- escalation contacts;
- incident-management training.

Access SHOULD be periodically verified.

Expired credentials discovered during a SEV-1 are an operational-control failure.

---

## 2.31 On-call shadowing

New responders SHOULD complete a staged readiness process such as:

1. training;
2. shadowing;
3. supervised primary coverage;
4. independent coverage.

A person MUST NOT be assigned sole critical production responsibility without sufficient preparation.

---

## 2.32 Escalation policy

Each rotation MUST have a deterministic escalation path.

The policy MUST define:

- acknowledgement expectation;
- primary-to-secondary escalation;
- team/manager escalation;
- specialist escalation;
- vendor escalation where applicable.

The policy SHOULD be automated through the paging system where possible.

---

## 2.33 Escalation on uncertainty

On-call engineers SHOULD escalate early when:

- impact is severe;
- the failure domain is unfamiliar;
- required permissions are unavailable;
- multiple systems are involved;
- data/security integrity may be affected;
- progress has stalled.

Escalation MUST NOT be treated as failure by the responder.

---

## 2.34 On-call handoff

Shift handoff MUST transfer unresolved operational context.

Handoff SHOULD include:

- active incidents;
- degraded services;
- temporary mitigations;
- risky changes;
- suppressed alerts;
- pending vendor cases;
- important watch items.

Critical context MUST NOT exist only in personal memory.

---

## 2.35 On-call fatigue

The organisation MUST monitor the health of on-call rotations.

Signals SHOULD include:

- pages per shift;
- after-hours pages;
- false-positive pages;
- repeated pages from one condition;
- interruptions per responder;
- sustained incident duration.

Chronically noisy rotations MUST trigger engineering remediation.

Adding more people to absorb bad alerts SHOULD NOT be the primary response to paging overload.

---

# 2.36 Page only for urgent human action

A page MUST indicate a condition requiring prompt human action.

An alert SHOULD page only when:

- material user/business impact exists or is imminent;
- automated mitigation is insufficient;
- waiting until normal working hours materially increases harm.

Informational conditions MUST NOT page.

Non-urgent work SHOULD create:

- ticket;
- dashboard signal;
- digest;
- business-hours notification.

---

## 2.37 Actionable pages

Every paging alert MUST provide or link to enough context for the responder to begin action.

It SHOULD identify:

- service;
- symptom;
- scope;
- environment;
- relevant SLI/SLO;
- dashboard;
- runbook;
- recent relevant change where available.

An alert whose expected response is merely "watch it" SHOULD NOT normally page.

---

## 2.38 Symptom-oriented alerting

Paging SHOULD favour user-facing symptoms over internal implementation conditions.

Examples include:

- availability;
- latency;
- correctness;
- freshness;
- critical queue delay.

Cause-oriented infrastructure alerts MAY page when they indicate imminent customer impact or require immediate preventative intervention.

High CPU by itself MUST NOT automatically be a page if no defined harmful consequence requires action.

---

## 2.39 SLO-based alerting

User-critical services SHOULD use SLO/error-budget burn signals for paging where appropriate.

Paging SHOULD identify fast, material budget consumption.

Slower burn SHOULD generally produce business-hours investigation before it becomes urgent.

A page threshold SHOULD correspond to an action responders can take.

---

## 2.40 Alert deduplication

Multiple signals representing one condition SHOULD be grouped or deduplicated.

A dependency outage MUST NOT independently page every downstream team with indistinguishable alerts where dependency-aware routing can provide useful coordination.

Suppression MUST NOT hide genuinely independent failures.

---

## 2.41 Alert flapping

Flapping alerts MUST be treated as defects.

Paging policies SHOULD include appropriate:

- persistence;
- hysteresis;
- grouping;
- evaluation windows.

A transient one-sample threshold crossing SHOULD NOT routinely wake a human.

---

## 2.42 Alert ownership

Every paging rule MUST have:

- owner;
- purpose;
- severity;
- expected response;
- test path.

Unused, unowned, or obsolete alerts MUST be removed.

Monitoring configuration MUST be reviewed when service ownership changes.

---

## 2.43 Alert review

Teams SHOULD periodically review paging performance.

Review SHOULD identify:

- non-actionable pages;
- false positives;
- duplicate pages;
- missed incidents;
- late pages;
- alerts requiring manual interpretation.

Repeated incident discovery by customers instead of monitoring MUST trigger alerting review.

---

# 2.44 Runbooks

Every recurring or high-consequence page SHOULD link to an actionable runbook.

Runbooks MUST prioritise safe response over exhaustive architectural description.

A canonical runbook SHOULD contain:

- purpose;
- affected service;
- symptoms;
- immediate checks;
- likely safe mitigations;
- rollback/failover;
- validation;
- escalation;
- relevant dashboards/logs/traces;
- known hazards;
- ownership.

---

## 2.45 Runbook quality

Runbook steps SHOULD be:

- executable;
- current;
- concise;
- safe under pressure.

Prefer:

**Check error rate on dashboard X; if deployment Y began within 20 minutes and rollback preconditions are satisfied, use rollback procedure Z**

over:

**Investigate logs and fix the service.**

A runbook MUST NOT require undocumented institutional knowledge to interpret every step.

---

## 2.46 Runbook automation

Frequently repeated safe procedures SHOULD be automated where practical.

Automation MUST retain:

- authorization;
- guardrails;
- auditability;
- rollback/error handling.

Copy-pasting dangerous commands from a wiki SHOULD NOT remain the long-term response to a repeated incident.

---

## 2.47 Runbook validation

Runbooks SHOULD be exercised through:

- real incidents;
- game days;
- periodic review.

A runbook that has not been usable for years SHOULD NOT be assumed correct.

Material infrastructure or deployment changes MUST trigger review of affected runbooks.

---

# 2.48 Communication principles

Incident communication MUST be:

- early;
- regular;
- accurate;
- consistent;
- impact-oriented.

The Communications Lead MUST distinguish:

- confirmed fact;
- current impact;
- mitigation in progress;
- hypothesis;
- next update time.

Unverified technical speculation SHOULD NOT be published externally.

---

## 2.49 Initial communication

Customer-impacting SEV-1 incidents SHOULD receive an initial public/customer acknowledgement within **15 minutes of confirmed material impact**, unless Security, legal, or safety requirements prohibit it.

SEV-2 incidents SHOULD receive external communication when impact is material and externally visible.

The initial update does NOT need a root cause.

It SHOULD communicate:

- affected capability;
- known impact;
- investigation/mitigation status;
- next update expectation.

---

## 2.50 Communication cadence

While a customer-impacting SEV-1 remains active, customer/status updates SHOULD normally occur at least every **30 minutes** unless a different cadence is explicitly communicated.

SEV-2 updates MAY use a longer cadence appropriate to impact.

An update MUST still be posted at the promised time even when there is no major technical change.

It is acceptable to say investigation continues.

Silence MUST NOT substitute for lack of new information.

---

## 2.51 Internal communication

Internal incident updates SHOULD contain more technical detail than public updates.

Internal stakeholders SHOULD receive:

- impact;
- mitigation state;
- key risks;
- current owner/IC;
- next update.

Responders MUST NOT be required to individually answer repeated status requests that the incident communication channel already answers.

---

## 2.52 Communication consistency

External channels MUST tell a consistent story.

Relevant channels MAY include:

- status page;
- customer support;
- in-product banner;
- email;
- account teams;
- social channels.

Different channels MAY use different detail levels but MUST NOT contradict each other.

---

## 2.53 Status page

Customer-facing services SHOULD maintain a status page independent enough to remain reachable during failure of the primary product.

The status page SHOULD represent customer-impacting components rather than internal microservice topology.

The status page MUST NOT require the failing application itself for basic access.

---

## 2.54 Status-page scope

A status page SHOULD answer:

- what customer capability is affected;
- impact level;
- current incident phase;
- latest update;
- when another update is expected.

It SHOULD NOT become a raw infrastructure dashboard.

Internal hostnames, database topology, security-sensitive architecture, credentials, or raw exceptions MUST NOT appear.

---

## 2.55 Status-page automation

Automation MAY help:

- create incident drafts;
- update structured components;
- distribute approved messages.

Fully automatic customer incident publishing SHOULD be used cautiously.

Customer communication SHOULD preserve human review where context, security, or impact interpretation matters.

Monitoring noise MUST NOT automatically become public outage messaging.

---

## 2.56 Communication templates

Approved incident templates MUST exist before major incidents.

Templates SHOULD be treated as starting structures, not immutable scripts.

### Investigating

**Title:** Investigating issues with `[capability]`

**Body pattern:**

> We are investigating an issue affecting `[capability]`. `[Known user impact]`. We are working to determine the scope and restore normal service. We will provide another update by `[time]`.

### Identified / Mitigating

**Title:** Identified issue affecting `[capability]`

**Body pattern:**

> We have identified `[safe high-level description]` affecting `[impact]`. We are `[mitigation action at an appropriate level]`. We will provide another update by `[time]`.

### Monitoring

**Title:** Service recovering for `[capability]`

**Body pattern:**

> We have applied a mitigation and are seeing recovery in `[capability]`. We are monitoring service health and validating that the issue is resolved. We will provide another update by `[time]`.

### Resolved

**Title:** `[Capability]` restored

**Body pattern:**

> Service has been restored for `[capability]`. The incident affected `[brief impact]` from `[start]` to `[end]`. We are reviewing the incident and follow-up actions.

Templates MUST be adapted to actual known facts.

---

## 2.57 Security-sensitive communication

Security incidents MAY require different communications.

Public updates MUST be coordinated with:

- Security;
- privacy;
- legal;
- communications;

where applicable.

The desire for transparency MUST NOT override disclosure constraints.

Similarly, "security reasons" MUST NOT become a blanket justification for misleading customer communication.

---

## 2.58 Customer support coordination

Customer Support SHOULD receive incident context early enough to respond consistently.

Support SHOULD have:

- customer-safe impact description;
- current workaround if any;
- status-page link;
- escalation route.

Support MUST NOT be left to derive incident status from engineering chat.

---

# 2.59 SLO impact

Every material reliability incident SHOULD be evaluated against affected SLIs/SLOs.

The incident record SHOULD identify:

- affected SLO;
- error-budget consumption;
- burn rate where applicable.

Severity and SLO impact are related but not identical.

A short high-consequence security/data incident MAY have limited availability-budget impact and still be SEV-1.

---

## 2.60 Error budgets

An error budget MUST represent tolerated unreliability implied by an SLO.

Error budgets SHOULD be used as an engineering-governance mechanism rather than a punishment mechanism.

The policy MUST define what happens when:

- burn is unusually fast;
- budget is materially depleted;
- budget is exhausted.

---

## 2.61 Fast error-budget burn

A rapidly burning error budget SHOULD trigger immediate operational response before complete exhaustion.

Fast burn MAY justify:

- page;
- incident declaration;
- rollback;
- risk reduction;
- deployment pause.

The response MUST be proportional to likely customer impact.

---

## 2.62 Error-budget exhaustion

When an important service exhausts its error budget, the service owner MUST invoke the organisation's error-budget policy.

The policy SHOULD prioritise reliability work and SHOULD restrict non-essential risk-increasing changes until an agreed recovery condition is reached.

Security fixes, urgent reliability fixes, and changes required to restore service MUST NOT be blocked by a generic feature freeze.

---

## 2.63 SLO breach review

SLO breach handling MUST consider:

- incidents consuming the budget;
- chronic degradation;
- recurring small failures;
- alert coverage;
- capacity;
- deployment reliability;
- unresolved corrective actions.

The response MUST NOT focus solely on the single largest incident if cumulative small failures are responsible.

---

## 2.64 Error-budget governance

Teams MUST NOT quietly redefine SLOs after a breach merely to make compliance metrics appear healthy.

SLO changes MAY be valid when user expectations or measurement design were incorrect.

Such changes MUST be deliberate, reviewed, and prospective unless correcting an objectively invalid measurement.

---

# 2.65 Postmortem triggers

Postmortem criteria MUST be defined in advance.

A postmortem MUST be produced for:

- every SEV-1;
- material data loss/corruption;
- material security incident according to Security process;
- significant SLO/error-budget consumption;
- serious monitoring failure;
- major incident that required unusual manual recovery.

SEV-2 incidents SHOULD receive a postmortem when meaningful learning exists.

Any responder or service owner MAY request a postmortem for a lower-severity incident.

---

## 2.66 Blamelessness

Postmortems MUST be blameless.

A blameless postmortem assumes responders and operators acted in good faith given:

- available information;
- incentives;
- tooling;
- system design;
- time pressure.

The analysis MUST focus on:

- system conditions;
- organisational conditions;
- contributing factors;
- decision context.

"Human error" MUST NOT be accepted as the terminal explanation.

---

## 2.67 Accountability and blamelessness

Blamelessness does not prohibit accountability.

Teams and owners MUST remain accountable for:

- implementing agreed safeguards;
- completing corrective actions;
- addressing known risks.

Intentional misconduct or deliberate policy violation MAY require a separate personnel/security process.

That process MUST remain separate from technical causal analysis.

---

## 2.68 Postmortem contents

A canonical postmortem MUST include:

- incident summary;
- severity;
- impact;
- affected users/services;
- duration;
- SLO/error-budget effect where applicable;
- detection;
- detailed timeline;
- mitigation;
- recovery;
- contributing conditions;
- what went well;
- what went poorly;
- where luck affected the outcome;
- corrective/preventative actions.

The postmortem SHOULD distinguish facts from hypotheses.

---

## 2.69 Causal analysis

Postmortems SHOULD identify multiple contributing conditions where appropriate.

Teams SHOULD avoid forcing every complex distributed failure into one simplistic "root cause."

Useful questions include:

- What allowed the failure to occur?
- What allowed it to reach users?
- Why was impact not contained?
- Why did detection take this long?
- Why was recovery difficult?
- Which safeguards worked?
- Which assumptions were invalid?

---

## 2.70 Timeline quality

The timeline SHOULD reconstruct important events using evidence where possible.

Sources MAY include:

- incident chat;
- alerts;
- deployment logs;
- audit logs;
- traces;
- status updates;
- dashboards.

Responder memory alone SHOULD NOT be the only source when objective evidence is available.

---

## 2.71 Counterfactual language

Postmortems MUST avoid blameful hindsight language such as:

- "obviously";
- "should have known";
- "carelessly";
- "simply forgot."

Analysis SHOULD explain why the action or decision was reasonable at the time and what system change can make a safer outcome more likely.

---

## 2.72 Postmortem timeliness

SEV-1 postmortem drafts SHOULD be produced within **5 business days** unless active recovery, security/legal constraints, or exceptional complexity justify delay.

Review SHOULD occur promptly while evidence and context remain fresh.

Postmortems MUST NOT remain indefinitely unwritten because service was restored.

---

## 2.73 Postmortem review

Postmortems SHOULD be reviewed by:

- service owners;
- relevant responders;
- affected dependency teams where applicable.

Review MUST focus on learning and corrective action rather than editorial blame.

Material lessons SHOULD be shared beyond the immediate team when they generalise.

---

# 2.74 Action items

Corrective actions MUST be specific and trackable.

Every action item MUST have:

- clear description;
- owner;
- priority;
- tracking identifier;
- target date or explicitly accepted backlog status.

"Improve monitoring" is insufficient.

"Add checkout availability SLO burn-rate alert and link rollback runbook" is actionable.

---

## 2.75 Action-item categories

Postmortem actions SHOULD consider multiple defence layers:

- prevent;
- detect;
- contain;
- mitigate;
- recover;
- improve response.

A team MUST NOT assume every incident can or should be prevented completely.

Improving detection or reducing blast radius MAY provide greater reliability than attempting to eliminate every initiating fault.

---

## 2.76 Action-item prioritisation

Actions MUST be prioritised according to:

- recurrence likelihood;
- potential impact;
- error-budget impact;
- implementation cost;
- existing safeguards.

High-risk recurrence MUST NOT be buried beneath numerous cosmetic low-priority tasks.

---

## 2.77 Action-item closure

An action MUST NOT be considered complete merely because code was merged.

Completion SHOULD verify that the intended risk reduction exists.

Examples include:

- alert tested;
- failover exercised;
- runbook validated;
- guardrail deployed;
- data migration confirmed.

---

## 2.78 Action-item ageing

Open incident actions SHOULD be reviewed regularly.

Overdue high-priority reliability work MUST be visible to engineering leadership/service governance.

Repeated incidents caused by known overdue actions SHOULD trigger explicit escalation.

Postmortems without follow-through are non-conformant.

---

## 2.79 Systemic action tracking

The organisation SHOULD periodically aggregate postmortem findings.

Recurring themes SHOULD drive platform-level investment.

Examples include repeated:

- deployment failures;
- missing rollback;
- ownership ambiguity;
- stale runbooks;
- dependency saturation;
- monitoring gaps.

Ten local action items for the same systemic defect SHOULD trigger a shared solution.

---

# 2.80 Game days

Critical services MUST practise incident response outside real incidents.

Game days SHOULD exercise:

- detection;
- paging;
- severity assessment;
- incident declaration;
- role assignment;
- mitigation;
- communication;
- handoff;
- recovery.

The objective is to test the **socio-technical response system**, not merely infrastructure failover.

---

## 2.81 Game-day frequency

Tier-1/mission-critical services SHOULD conduct meaningful game-day or incident-response exercises at least **twice per year**.

Other production services SHOULD practise at least annually where operational risk justifies on-call response.

New critical architectures SHOULD perform an exercise before or shortly after production launch.

---

## 2.82 Game-day safety

Every game day MUST define:

- hypothesis/objective;
- scope;
- blast-radius limit;
- participants;
- abort conditions;
- rollback;
- observer/facilitator where useful.

Experiments MUST NOT create uncontrolled production risk.

Production exercises MAY be used when safeguards and value justify them.

Otherwise realistic staging or controlled fault injection SHOULD be used.

---

## 2.83 Game-day scenarios

Scenarios SHOULD test credible failures.

Examples include:

- database failover;
- dependency outage;
- expired certificate/credential;
- region failure;
- queue backlog;
- broken deployment;
- failed rollback;
- stale runbook;
- missing on-call access;
- monitoring failure;
- status-page communication.

Exercises SHOULD occasionally test the response process itself, not only systems responders already know well.

---

## 2.84 Game-day observations

Observers SHOULD record:

- time to detection;
- time to declaration;
- escalation latency;
- role clarity;
- runbook usability;
- tooling failures;
- communication quality;
- unexpected coupling.

Exercise shortcomings MUST NOT be hidden merely because no real customer was affected.

---

## 2.85 Game-day follow-up

Game days SHOULD produce tracked improvements where gaps are discovered.

Exercise action items MUST follow the same action-tracking discipline as incident actions when material.

Repeated discovery of the same unresolved exercise gap MUST trigger governance escalation.

---

# 2.86 Incident metrics

The organisation SHOULD measure incident-response health.

Useful metrics include:

- time to detection;
- time to acknowledge;
- time to declare;
- time to mitigation;
- time to recovery;
- duration;
- SLO/error-budget impact;
- page volume;
- false-positive page rate;
- percentage of pages with runbooks;
- action-item closure.

Metrics MUST have precise definitions.

---

## 2.87 MTTR terminology

If the organisation uses **MTTR**, it MUST define what "R" means.

Possible meanings include:

- response;
- repair;
- restore;
- resolve.

Ambiguous MTTR MUST NOT be used as a governance metric.

Separate timestamps are preferable.

---

## 2.88 Metric distributions

Incident metrics SHOULD use distributions, percentiles, and severity segmentation where appropriate.

An average MUST NOT conceal a small number of extremely severe or long incidents.

Teams MUST NOT optimise response metrics in ways that encourage:

- delayed declaration;
- premature resolution;
- severity downgrading.

---

## 2.89 Human sustainability metrics

Incident governance SHOULD monitor human impact.

Useful signals include:

- overnight pages;
- interrupted shifts;
- extended incidents;
- frequency of handoffs;
- rotations with excessive load.

Reliability that requires chronically unhealthy on-call conditions is not a Gold Standard outcome.

---

# 2.90 Security relationship

Incident tools and records MUST follow Security standards.

Incident records often contain sensitive:

- architecture;
- incident details;
- customer impact;
- internal URLs;
- operational actions.

Access MUST follow least privilege.

Secrets MUST NOT be pasted into incident chat or postmortems.

Incident channels MUST NOT become exempt from normal data-handling requirements.

---

## 2.91 Data & Database relationship

Database incidents MUST follow canonical:

- backup;
- replication;
- integrity;
- recovery;
- migration;

requirements.

Responders MUST understand whether recovery affects:

- RPO;
- RTO;
- transaction durability;
- data correctness.

Restoring API availability MUST NOT conceal unresolved database corruption.

Destructive repair operations SHOULD require explicit coordination and evidence preservation.

---

## 2.92 API relationship

API incidents SHOULD measure user impact through canonical API SLIs.

Incident mitigation MAY include:

- traffic shifting;
- graceful degradation;
- rate limiting;
- feature disablement.

Emergency API behaviour MUST still preserve:

- authentication;
- authorization;
- tenant isolation;
- integrity.

An outage MUST NOT justify bypassing core Security controls.

---

## 2.93 State Management relationship

Incident-related product state MUST remain authoritative.

The UI SHOULD distinguish:

- operationally healthy;
- degraded;
- stale;
- unavailable.

Client state MUST NOT falsely hide an active service incident through cached success.

Incident status surfaces SHOULD reconcile to authoritative backend/status-page state.

---

## 2.94 Forms & Validation relationship

Operator forms used for incident actions MUST follow Forms & Validation standards.

High-impact operations such as:

- failover;
- traffic diversion;
- mass rollback;
- emergency feature disablement;

MUST validate parameters server-side.

An incident MUST NOT become a justification for unsafe unvalidated admin forms.

---

## 2.95 Accessibility relationship

Status pages and incident-management interfaces MUST follow Accessibility standards.

Public incident updates MUST remain understandable without:

- colour alone;
- animation;
- icons alone.

Live status updates SHOULD use appropriate accessible status semantics without stealing focus or generating excessive announcements.

Critical operator tooling MUST remain keyboard usable.

---

## 2.96 Design Tokens relationship

Incident tooling MUST use canonical semantic status tokens.

Severity, service health, and incident phase MUST NOT invent arbitrary colour systems.

Colour MUST NOT be the only representation of:

- SEV-1;
- degraded;
- resolved;
- warning.

---

## 2.97 Component relationship

shadcn/ui MUST be the baseline for organisation-owned incident-management UI.

Applicable components MAY include:

- Alert;
- Badge;
- Button;
- Card;
- Dialog;
- Table/Data Grid;
- Tabs;
- Timeline/composed patterns;
- Toast;
- Tooltip.

shadcn/ui MUST NOT determine incident governance or operational policy.

---

## 2.98 Pattern relationship

Canonical Patterns SHOULD govern:

- incident declaration;
- role assignment;
- severity change;
- change approval;
- incident update;
- handoff;
- resolution;
- postmortem workflow.

High-consequence operational actions SHOULD NOT use improvised one-off interactions when a canonical Pattern exists.

---

## 2.99 Content & UX Writing relationship

Incident copy MUST prioritise:

- impact;
- clarity;
- known fact;
- next update.

Customer-facing communications SHOULD avoid unnecessary internal jargon.

Writing MUST NOT overstate certainty.

Prefer:

**We are investigating elevated errors affecting file uploads**

over:

**Database shard 13 is broken**

unless the internal architecture detail is genuinely useful and safe for the intended audience.

---

## 2.100 Governance ownership

The incident-management standard MUST have an organisational owner.

The owner SHOULD periodically review:

- severity definitions;
- response performance;
- on-call sustainability;
- paging quality;
- postmortem completion;
- action ageing;
- game-day coverage.

The process MUST evolve when repeated incidents demonstrate that the standard itself is insufficient.

---

## 2.101 Exceptions

A deviation from this standard MUST document:

- affected service/team;
- rule being deviated from;
- operational risk;
- compensating control;
- owner;
- review or expiry date where appropriate.

Repeated exceptions MUST trigger governance review rather than permanent undocumented custom practice.

---

# 3. Anti-patterns

The following are non-conformant unless explicitly covered by an approved exception.

## 3.1 Root-cause gate

The team refuses to declare an incident until it knows exactly what caused the outage.

## 3.2 Severity by panic

Severity rises because leadership is watching rather than because impact increased.

## 3.3 Severity by architecture

An internal infrastructure component failing is automatically SEV-1 regardless of user impact.

## 3.4 Silent severity drift

Everybody treats the incident as critical while the formal record still says minor.

## 3.5 Debugger IC

The Incident Commander disappears into terminal debugging and stops coordinating the incident.

## 3.6 Everyone changes production

Multiple responders independently modify production with no coordination or action log.

## 3.7 Executive command bypass

Executives directly instruct individual engineers, bypassing the IC and creating conflicting priorities.

## 3.8 War-room audience

Dozens of passive observers join the primary response channel and overwhelm active coordination.

## 3.9 Private-message incident

Important decisions and hypotheses happen in direct messages and never reach the incident record.

## 3.10 No scribe

The team attempts to reconstruct a multi-hour incident from memory days later.

## 3.11 Implicit handoff

The current IC leaves without explicitly transferring command.

## 3.12 Root-cause before mitigation

Users remain impacted while responders continue investigation despite an available safe rollback.

## 3.13 Dashboard-green resolution

The incident is declared resolved because one metric recovered despite broken customer workflows.

## 3.14 API-up/data-wrong

Service availability is declared restored while returned data remains corrupt.

## 3.15 One-person on-call

A critical service permanently depends on one expert who cannot safely take leave.

## 3.16 Escalation shame

Responders avoid asking for help because escalation is culturally treated as failure.

## 3.17 Access discovered during outage

The on-call engineer discovers during SEV-1 that production access expired months earlier.

## 3.18 Page everything

Warnings, capacity trends, certificate expiry, batch completions, and routine informational events all page humans.

## 3.19 Page with no action

The runbook says only "monitor the situation."

## 3.20 CPU pager

Internal resource utilisation pages engineers despite no user impact or defined imminent failure.

## 3.21 Alert cascade

One dependency incident generates dozens of separate pages to every downstream team.

## 3.22 Flapping pager

One threshold crossing repeatedly pages, resolves, and pages again.

## 3.23 Alert without owner

Nobody knows which team should respond.

## 3.24 Wiki essay runbook

The runbook contains architecture history but no safe first action.

## 3.25 Dangerous copy/paste

Routine recovery depends on manually pasting privileged commands with no validation or guardrails.

## 3.26 Runbook fossil

Infrastructure has changed significantly but the emergency procedure has never been retested.

## 3.27 Status-page silence

Customers experience an obvious outage for hours while engineering communicates only internally.

## 3.28 Root-cause speculation

An unconfirmed technical hypothesis is published as the public cause.

## 3.29 ETA invention

Communications promise a restoration time responders cannot justify.

## 3.30 Update only when changed

A promised customer-update deadline is missed because engineering has "nothing new."

## 3.31 Internal topology status page

Customers are expected to interpret database shards, Kubernetes clusters, or internal service names.

## 3.32 Fully automated embarrassment

A noisy monitor automatically publishes a customer outage that does not exist.

## 3.33 Support in the dark

Support discovers a major incident from customers before receiving internal context.

## 3.34 Error-budget theatre

The team measures error budgets but nothing changes when the budget is exhausted.

## 3.35 Rewrite the SLO

The SLO is weakened immediately after a breach solely to make compliance green again.

## 3.36 Feature freeze absolutism

A reliability freeze accidentally blocks the security or reliability changes needed to restore health.

## 3.37 No postmortem because fixed

The incident was restored quickly, so no learning review occurs despite major impact.

## 3.38 Blame disguised as analysis

The postmortem concludes that an engineer was careless instead of analysing system conditions.

## 3.39 Human error root cause

"Operator error" is the final causal finding.

## 3.40 Hindsight language

The review says the correct action "should have been obvious."

## 3.41 Action-item confetti

A postmortem produces dozens of vague low-impact tasks so it appears thorough.

## 3.42 No owner action

Corrective tasks say "team to investigate" with no accountable person.

## 3.43 Merge equals done

A corrective item closes when a pull request merges without proving the safeguard works.

## 3.44 Postmortem graveyard

Postmortems are written, archived, and never used to drive remediation.

## 3.45 Repeat incident, repeat action

The same root systemic defect creates nearly identical local tasks after every incident.

## 3.46 Game-day theatre

The exercise uses a known scenario, known answer, and no meaningful failure conditions.

## 3.47 Chaos without guardrails

Faults are injected into production with no blast-radius limit or abort conditions.

## 3.48 Game day with no follow-up

The exercise discovers missing access and broken failover, but nobody tracks remediation.

## 3.49 MTTR gaming

The incident is marked resolved early to improve metrics while customers remain affected.

## 3.50 Mean-only reliability

Average incident duration appears healthy while rare catastrophic incidents are hidden.

## 3.51 Hero culture

Reliability depends on a small number of individuals repeatedly rescuing poorly designed systems.

## 3.52 Pager endurance as reliability

On-call responders absorb increasing alert volume instead of alert quality and service design being improved.

---

# 4. Checklist

An incident-management programme conforms to this standard only when the following can be answered **yes** where applicable.

### Severity and declaration

- [ ] One canonical severity matrix exists.
- [ ] Severity is based on impact rather than organisational attention.
- [ ] Data, security, financial, and regulatory impacts are included.
- [ ] Responders may declare incidents without managerial permission.
- [ ] Uncertainty does not prevent timely declaration.
- [ ] Severity changes are explicitly recorded.

### Command structure

- [ ] SEV-1 incidents assign an Incident Commander.
- [ ] Operations ownership is explicit.
- [ ] Communications ownership is explicit.
- [ ] Scribing/timeline ownership is explicit.
- [ ] The IC coordinates rather than becoming the default debugger.
- [ ] Major decisions flow through the command structure.
- [ ] Role handoffs require explicit acknowledgement.

### Incident workspace

- [ ] Every major incident has one canonical channel/command post.
- [ ] An incident record exists.
- [ ] The record identifies roles and severity.
- [ ] Impact is documented.
- [ ] Actions and decisions are timestamped.
- [ ] Hypotheses are distinguishable from facts.
- [ ] Critical coordination does not remain only in private messages.

### Mitigation and recovery

- [ ] Responders prioritise safe mitigation over unnecessary root-cause investigation.
- [ ] Production changes are coordinated.
- [ ] Material incident changes have rollback/verification.
- [ ] Evidence is preserved where practical.
- [ ] Recovery is validated through user-relevant signals.
- [ ] Data correctness is verified where applicable.
- [ ] Resolution is not declared merely because one metric recovered.

### On-call

- [ ] Every critical production service has a discoverable owner.
- [ ] A primary rotation exists where urgent response is required.
- [ ] Critical systems have adequate escalation/secondary coverage.
- [ ] Responders receive training before independent coverage.
- [ ] Required production access is verified.
- [ ] Shift handoffs transfer unresolved operational context.
- [ ] On-call load and after-hours interruption are measured.
- [ ] Rotation design avoids long-term reliance on one expert.

### Paging

- [ ] Paging requires prompt human action.
- [ ] Non-urgent signals use tickets/digests rather than pages.
- [ ] Paging alerts identify service and symptom.
- [ ] Relevant dashboards and runbooks are linked.
- [ ] User-facing/SLO signals are preferred where appropriate.
- [ ] Duplicate alert cascades are suppressed.
- [ ] Flapping pages are treated as defects.
- [ ] Every page has an owner.
- [ ] Paging quality is periodically reviewed.

### Runbooks

- [ ] High-consequence and recurring alerts have usable runbooks.
- [ ] Runbooks provide concrete first actions.
- [ ] Safe mitigations are documented.
- [ ] Rollback/failover is documented where applicable.
- [ ] Escalation is documented.
- [ ] Runbooks link relevant observability.
- [ ] Repeated manual recovery is considered for automation.
- [ ] Runbooks are exercised and updated.

### Communications

- [ ] A Communications Lead is assigned for major incidents.
- [ ] Initial communication focuses on impact rather than unverified root cause.
- [ ] Major customer-impacting incidents are acknowledged promptly.
- [ ] An explicit update cadence is communicated.
- [ ] Promised updates are sent even if technical state has not materially changed.
- [ ] Internal and external messaging remain consistent.
- [ ] Support receives customer-safe incident context.
- [ ] Security/legal constraints are respected.

### Status page

- [ ] Customer-facing critical services have an appropriate status mechanism.
- [ ] Status infrastructure does not depend entirely on the failed service.
- [ ] Components use customer-recognisable capabilities.
- [ ] Internal topology and sensitive detail are excluded.
- [ ] Incident templates exist.
- [ ] Customer status publishing is not blindly driven by noisy monitoring.

### SLOs and error budgets

- [ ] Material incidents are mapped to relevant SLIs/SLOs.
- [ ] Error-budget impact can be calculated where applicable.
- [ ] Fast burn can trigger immediate response.
- [ ] Error-budget exhaustion has a defined policy.
- [ ] Reliability work receives priority when policy requires it.
- [ ] Security/reliability fixes are not accidentally blocked by change freezes.
- [ ] SLOs are not changed retroactively merely to erase a breach.

### Postmortems

- [ ] Postmortem trigger criteria are defined before incidents.
- [ ] Every SEV-1 receives a postmortem.
- [ ] Significant data/security/monitoring failures trigger review.
- [ ] Postmortems are blameless.
- [ ] "Human error" is not accepted as the terminal cause.
- [ ] Impact and timeline are recorded.
- [ ] Contributing conditions are analysed.
- [ ] What went well and poorly are both captured.
- [ ] Postmortems are completed while context remains fresh.

### Corrective actions

- [ ] Every material action has a clear owner.
- [ ] Actions have a tracking identifier.
- [ ] Priority is explicit.
- [ ] Target timing or accepted backlog state is explicit.
- [ ] Vague actions such as "be more careful" are rejected.
- [ ] High-value prevention, detection, mitigation, and recovery improvements are considered.
- [ ] Completion verifies intended risk reduction.
- [ ] Overdue high-priority actions are reviewed.
- [ ] Recurring themes can trigger platform-level remediation.

### Game days

- [ ] Critical services practise incident response periodically.
- [ ] Exercises cover people/process as well as technical failover.
- [ ] Every exercise has scope and abort conditions.
- [ ] Blast radius is controlled.
- [ ] Alerting, escalation, runbooks, and communication are tested.
- [ ] Exercise observations are recorded.
- [ ] Material gaps become tracked action items.
- [ ] Repeat unresolved exercise findings are escalated.

### Governance and metrics

- [ ] Detection, acknowledgement, declaration, mitigation, and recovery timestamps can be distinguished.
- [ ] Any MTTR metric has an explicit definition.
- [ ] Severity/distribution is considered rather than only averages.
- [ ] Metrics do not incentivise delayed declaration or premature resolution.
- [ ] Human on-call sustainability is reviewed.
- [ ] Incident-management governance has an owner.

### Security and data

- [ ] Incident records follow access-control requirements.
- [ ] Secrets are not pasted into incident records.
- [ ] Security-response procedures override general procedures where stricter.
- [ ] Data integrity is considered independently from availability.
- [ ] Destructive database recovery is coordinated.
- [ ] Evidence is preserved appropriately.

### UI and accessibility

- [ ] Incident tooling uses canonical shadcn/ui-based Components.
- [ ] Status semantics use Design Tokens.
- [ ] Severity/health does not rely on colour alone.
- [ ] Operator workflows are keyboard accessible.
- [ ] Public status updates are accessible.
- [ ] Live status updates do not steal focus or cause announcement spam.
- [ ] High-consequence operator actions use canonical Patterns and server-side validation.

---

# 5. Canonical summary

Incident management MUST be **prepared before the incident, structured during the incident, and learning-oriented after the incident**.

**Severity MUST reflect customer, business, security, data, financial, and regulatory impact—not organisational panic or technical complexity.**

**Responders MUST be empowered to declare an incident before root cause is known. When uncertainty plausibly indicates severe impact, temporary escalation is preferable to delayed coordination.**

**SEV-1 response MUST have clear command. The Incident Commander coordinates priorities and responders; the Operations Lead coordinates mitigation; the Communications Lead owns stakeholder communication; the Scribe preserves the timeline and decision record.**

**Incident roles MUST be explicitly handed off. Authority and responsibility MUST NOT become ambiguous during long incidents or timezone transitions.**

**Mitigation takes precedence over deep causal analysis while avoidable customer harm continues. Stop the damage, restore safe service, preserve relevant evidence, then investigate more deeply.**

**Recovery MUST be verified through appropriate user-facing and correctness signals. A green dashboard alone does not prove recovery.**

**Every production service requiring urgent intervention MUST have a discoverable owner, sustainable on-call coverage, tested access, and deterministic escalation. Critical systems MUST NOT depend on one hero.**

**A page MUST require urgent human action. Non-actionable, informational, duplicate, or routinely flapping signals MUST NOT page. Alert fatigue is a reliability defect.**

**Paging SHOULD be symptom- and SLO-oriented where practical. Every page MUST provide enough context to start a useful response and SHOULD link a tested runbook.**

**Runbooks MUST be concise, executable, current, and designed for use under pressure. Repeated manual recovery SHOULD become safer automation.**

**Customer-impacting incidents MUST be communicated early, accurately, consistently, and at a declared cadence. Initial communication does not require root cause. Unverified hypotheses MUST NOT be published as fact.**

**For customer-impacting SEV-1 incidents, the baseline target is an initial acknowledgement within 15 minutes of confirmed material impact and updates at least every 30 minutes while active unless another cadence is explicitly communicated.**

**Status pages MUST describe customer-recognisable capabilities rather than internal topology and SHOULD remain reachable independently of the affected primary service.**

**SLO and error-budget consumption MUST influence reliability governance. Fast burn SHOULD trigger prompt intervention, and budget exhaustion MUST activate a defined reliability policy rather than merely produce a red dashboard.**

**Error budgets are reliability-control mechanisms, not punishment. SLOs MUST NOT be rewritten after a breach solely to make historical performance appear compliant.**

**Every SEV-1 and other qualifying material incident MUST receive a timely blameless postmortem. The analysis MUST examine contributing system and organisational conditions rather than terminating at "human error."**

**Blamelessness does not remove accountability. Teams remain accountable for implementing agreed safeguards and closing important corrective actions.**

**Every meaningful postmortem action MUST have an owner, tracking record, priority, and completion criteria. A postmortem without follow-through does not complete the learning cycle.**

**Corrective actions SHOULD improve prevention, detection, containment, mitigation, or recovery. Complete prevention is not the only valid reliability strategy.**

**Critical services MUST practise incident response through game days or equivalent exercises. Exercises MUST test command, alerting, escalation, runbooks, communication, recovery, and human coordination—not merely infrastructure automation.**

**Incident-response metrics MUST use precise definitions. Time to detect, acknowledge, declare, mitigate, and recover SHOULD remain distinguishable. Ambiguous MTTR MUST NOT be used for governance.**

**Metrics MUST NOT incentivise responders to delay declaration, understate severity, or resolve incidents prematurely.**

**Security, data integrity, tenant isolation, authorization, and audit requirements remain authoritative during emergencies. An incident is not permission to bypass core controls.**

**Operator-facing incident tooling MUST follow Accessibility, Design Tokens, Component, Pattern, Forms & Validation, Tables & Data Grid, and Feedback & Status standards. shadcn/ui is the presentation baseline; it does not define incident governance.**

The Gold Standard is achieved when an organisation can **detect a material failure, page the right human, establish command quickly, mitigate safely, communicate predictably, hand off cleanly, verify recovery, learn without blame, close corrective actions, and regularly rehearse the entire response system without depending on heroics or institutional memory.**

The operating model above is grounded in established SRE practice: Google’s incident guidance separates incident command, operational response, communications, and live incident state, and emphasises explicit handoff and rehearsed response. Its on-call guidance says pages should be immediately actionable and warns that poor signal-to-noise produces alert fatigue. citeturn460412search0turn460412search4turn460412search11

The post-incident rules likewise follow Google’s blameless-postmortem model and its use of error budgets to shift engineering attention toward reliability when reliability consumption exceeds policy thresholds. citeturn460412search1turn460412search2turn460412search5 Atlassian’s current Statuspage guidance independently supports early acknowledgement, regular updates, consistent cross-channel communication, and prepared communication templates rather than drafting from scratch during an outage. citeturn745979search0turn745979search2turn745979search3
