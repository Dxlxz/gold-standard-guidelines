---
id: "support"
title: "Support & Escalation"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["operations", "support", "escalation"]
applies_to: ["team"]
related: []
legacy_number: 93
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 48964
provenance: baseline

---

Here is the canonical document, structured to match the prior **Gold Standard 2026** governance corpus and the requested placement.

# Support & Escalation Guidelines — Gold Standard 2026

**Canonical placement:** Admin & Internal Tools → Support → Observability → Documentation  
**Status:** Gold Standard 2026  
**Component baseline:** shadcn/ui  
**Normative terms:** **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements. “May” denotes an explicitly optional practice.

---

# 1. Purpose

## 1.1 Objective

This standard defines how customer, operational, and internal support requests MUST be received, classified, investigated, escalated, communicated, resolved, and fed back into engineering.

The objectives are to ensure that:

- customers have predictable support channels and response expectations;
- urgent incidents are distinguished from routine defects and requests;
- support teams collect sufficient diagnostic evidence before engineering escalation;
- engineering escalation is deterministic rather than personality-driven;
- customer communication is accurate, timely, and appropriately scoped;
- workarounds and known issues are controlled and maintained;
- recurring incidents and defects produce durable engineering feedback;
- sensitive support tooling and customer data are protected;
- support surfaces are accessible, consistent, and observable; and
- support operations align with Security, Data & Database, API, State Management, Forms & Validation, Accessibility, Design Tokens, Component, Pattern, Observability, and Documentation standards.

Support MUST function as a governed operational system, not as an informal message-routing layer between customers and engineers.

---

## 1.2 Scope

This standard applies to:

- customer support;
- technical support;
- operational support;
- internal support for administrative systems;
- support tooling;
- incident intake;
- bug escalation;
- known-issue publication;
- workaround management;
- customer-facing status communication;
- support-to-engineering handoff; and
- post-resolution feedback into engineering, product, documentation, and observability.

This standard does not replace dedicated:

- incident-response procedures;
- security incident processes;
- privacy incident processes;
- vulnerability disclosure procedures;
- legal escalation processes; or
- disaster-recovery procedures.

Where those standards impose stronger requirements, they take precedence.

---

# 2. Rules

## 2.1 Support operating model

Support MUST use explicit service tiers, ownership boundaries, escalation rules, and response objectives.

Every supported product or service MUST define:

1. supported intake channels;
2. supported hours or coverage model;
3. severity taxonomy;
4. initial-response objectives;
5. update expectations;
6. escalation ownership;
7. engineering escalation route;
8. known-issue publication process; and
9. closure criteria.

Support obligations MUST NOT depend on individual employee availability.

Unofficial direct messages, personal email, ad hoc chat threads, and verbal requests MUST NOT be treated as authoritative support records unless they are captured into the approved support system.

---

## 2.2 Support tiers

The canonical support model consists of four functional tiers.

### 2.2.1 Tier 0 — Self-service

Tier 0 includes:

- product documentation;
- troubleshooting guides;
- status pages;
- known-issue records;
- FAQs;
- in-product help;
- support diagnostics; and
- automated guidance.

Tier 0 content SHOULD resolve predictable and repeatable issues without human intervention.

Self-service content MUST NOT expose:

- credentials;
- internal-only infrastructure details;
- customer-specific data;
- security-sensitive bypass techniques;
- privileged administrative operations; or
- unsupported destructive recovery procedures.

---

### 2.2.2 Tier 1 — Intake and standard resolution

Tier 1 owns:

- request intake;
- identity and account verification where required;
- categorization;
- severity assessment;
- duplicate detection;
- standard troubleshooting;
- documented workaround application;
- customer communication; and
- evidence collection.

Tier 1 MUST NOT improvise undocumented production changes.

Tier 1 SHOULD resolve cases using approved documentation, support tooling, and authorized administrative actions.

---

### 2.2.3 Tier 2 — Technical investigation

Tier 2 handles issues requiring deeper product, integration, API, data, configuration, or environment analysis.

Tier 2 MAY:

- inspect approved diagnostics;
- correlate application and infrastructure telemetry;
- reproduce issues;
- inspect relevant API requests and responses;
- evaluate configuration;
- verify database or state behavior through authorized support tooling;
- apply approved recovery procedures; and
- prepare engineering-ready escalations.

Tier 2 MUST remain within documented access permissions and operational runbooks.

---

### 2.2.4 Tier 3 — Engineering escalation

Tier 3 consists of the engineering owner of the affected service, domain, application, or platform.

Engineering escalation is appropriate when:

- a product defect is probable or confirmed;
- service behavior contradicts a supported contract;
- an incident requires code or infrastructure change;
- a durable correction is required;
- privileged investigation exceeds support authority;
- a data repair requires engineering-controlled execution;
- no approved workaround exists for material customer impact; or
- recurring support volume indicates a systemic defect.

Tier 3 MUST NOT become the default destination for incomplete or untriaged cases.

Support MUST retain customer-communication ownership unless the operating model explicitly assigns it elsewhere.

---

## 2.3 SLA and service-level terminology

Support organizations MUST distinguish:

- **Initial response time** — time until a human or approved automated process acknowledges and begins triage;
- **Triage time** — time until severity, ownership, and next action are established;
- **Update interval** — maximum interval between meaningful case updates;
- **Target resolution time** — an operational objective where one can reasonably be defined;
- **Restoration objective** — target for restoring usable service during incidents;
- **Contractual SLA** — externally committed and contractually binding requirement.

Internal targets MUST NOT be presented as contractual SLAs unless they are contractually committed.

A response SLA MUST NOT be described as a resolution guarantee.

---

## 2.4 Canonical severity levels

Support severity MUST be based primarily on **customer impact, scope, criticality, and availability of a viable workaround**.

### 2.4.1 Severity 1 — Critical

Typical conditions include:

- widespread or complete production outage;
- critical business process unavailable for a material customer population;
- confirmed destructive data corruption;
- unrecoverable failure affecting critical operations;
- severe cross-tenant isolation failure;
- major security or privacy event subject to the relevant incident process; or
- no viable workaround for critical functionality.

Severity 1 cases MUST trigger immediate incident or emergency escalation according to the applicable operational standard.

They MUST NOT remain solely within routine ticket handling.

---

### 2.4.2 Severity 2 — High

Typical conditions include:

- major functionality substantially degraded;
- significant customer population affected;
- critical workflow impaired but not completely unavailable;
- repeated failures materially affecting operations;
- high-impact integration failure; or
- workaround exists but is costly, fragile, or materially disruptive.

Severity 2 cases SHOULD receive expedited technical investigation and engineering escalation when product defect evidence exists.

---

### 2.4.3 Severity 3 — Standard

Typical conditions include:

- localized functional defect;
- limited customer or user impact;
- intermittent non-critical error;
- incorrect behavior with a reasonable workaround;
- minor API inconsistency;
- non-blocking accessibility defect; or
- non-critical configuration or integration issue.

Severity 3 is the default level for ordinary product defects and technical support issues.

---

### 2.4.4 Severity 4 — Low / informational

Typical conditions include:

- cosmetic defect;
- documentation question;
- low-impact usability issue;
- enhancement request;
- configuration clarification;
- minor visual inconsistency;
- general product question; or
- feature request.

Severity MUST NOT be inflated solely because a customer is commercially important or dissatisfied.

Commercial priority MAY influence communication cadence or account-management handling, but MUST NOT redefine technical impact.

---

## 2.5 Recommended response objectives

Unless superseded by contractual obligations, teams SHOULD adopt service objectives broadly equivalent to:

| Severity | Initial response | Triage target | Update cadence |
|---|---:|---:|---:|
| **S1 Critical** | ≤ 15 minutes during covered operations | Immediate | At least every 30 minutes while active |
| **S2 High** | ≤ 1 hour during covered operations | ≤ 2 hours | At least every 4 business hours |
| **S3 Standard** | ≤ 1 business day | ≤ 2 business days | On material progress or agreed cadence |
| **S4 Low** | ≤ 2 business days | As scheduled | On material progress |

Organizations MAY define stricter objectives.

Published objectives MUST match actual staffing and operational capability.

A team MUST NOT publish an SLA it cannot consistently support.

---

## 2.6 Support intake channels

Approved intake channels SHOULD include only channels that can preserve:

- requester identity;
- timestamps;
- conversation history;
- severity;
- ownership;
- attachments;
- audit trail; and
- closure status.

Common approved channels MAY include:

- support portal;
- authenticated in-product support;
- dedicated support email integrated into the case system;
- approved telephone escalation;
- monitored enterprise chat integration; and
- automated monitoring or incident creation.

Support requests received through unofficial channels MUST be transferred into the authoritative system.

Internal chat MUST NOT become the sole historical record for customer-impacting support decisions.

---

## 2.7 Intake requirements

Every support case SHOULD capture, where applicable:

- customer or tenant identifier;
- affected user or account;
- product and environment;
- affected feature or workflow;
- date and time of occurrence;
- timezone;
- expected behavior;
- actual behavior;
- frequency;
- scope of affected users;
- business impact;
- relevant error message or code;
- correlation/request/trace identifier;
- reproduction steps;
- screenshots or recordings where appropriate;
- workaround attempted;
- recent relevant changes;
- browser, client, application, SDK, or API version where relevant; and
- consent or authorization for any required support access.

Sensitive information MUST NOT be requested unless necessary.

Passwords, authentication secrets, private keys, MFA codes, recovery codes, full payment credentials, and equivalent secrets MUST NOT be collected through support tickets.

---

## 2.8 Triage taxonomy

Each case MUST have one primary classification.

Canonical classifications are:

| Classification | Description |
|---|---|
| **Incident** | Active service degradation or outage |
| **Product defect** | Product behavior does not match an intended or documented requirement |
| **Integration defect** | Failure involving API, webhook, SDK, third-party, or interoperability behavior |
| **Data issue** | Incorrect, missing, duplicated, delayed, inconsistent, or inaccessible data |
| **Configuration issue** | Supported configuration is incorrect or incomplete |
| **Access/identity issue** | Authentication, authorization, provisioning, or account-access problem |
| **Performance issue** | Supported operation fails to meet expected performance characteristics |
| **Accessibility issue** | Assistive technology, keyboard, focus, semantic, contrast, or related accessibility problem |
| **Security/privacy issue** | Potential security or privacy concern requiring governed handling |
| **Documentation issue** | Documentation is missing, inaccurate, or misleading |
| **Usability issue** | Product technically functions but causes significant user confusion or workflow friction |
| **Feature request** | Requested behavior is not currently supported |
| **How-to/question** | Product is operating as designed and guidance is required |
| **Third-party issue** | Root cause is outside the supported product boundary |
| **Unknown** | Insufficient evidence; temporary classification only |

“Unknown” MUST NOT be a permanent resolution category.

Support MUST reclassify cases when investigation changes the understood cause.

---

## 2.9 Severity versus classification

Classification and severity MUST be independent.

Examples:

- an accessibility issue can be S1, S2, S3, or S4 depending on impact;
- a product defect can be S1 if it causes a widespread outage;
- a configuration issue can be S2 if it blocks a critical workflow;
- a feature request is normally S4 but MUST NOT be falsely classified as a defect to increase priority.

---

## 2.10 Duplicate and related cases

Support tooling SHOULD detect and link duplicate or related cases.

Duplicate customer cases MUST NOT be silently closed without:

- linking them to the canonical issue or incident;
- preserving customer-specific context where relevant; and
- ensuring the requester receives appropriate updates.

A single engineering issue MAY be linked to many support cases.

Customer communication MUST remain scoped to what is known for that customer.

---

## 2.11 Engineering escalation criteria

A support case SHOULD be escalated to engineering when one or more of the following are true:

1. reproducible behavior conflicts with the supported product contract;
2. a product defect is strongly suspected;
3. telemetry indicates a product or platform failure;
4. a workaround is unavailable or operationally unsafe;
5. customer data requires engineering-controlled repair;
6. repeated cases demonstrate a systemic pattern;
7. support lacks authorized tooling to determine root cause;
8. the issue requires code or infrastructure change;
9. existing documentation or runbooks are insufficient;
10. contractual or regulatory risk may be affected; or
11. severity requires engineering incident participation.

Escalation MUST NOT be based solely on:

- customer insistence;
- case age;
- account value;
- support frustration; or
- lack of familiarity with documented troubleshooting procedures.

Those factors MAY justify additional coordination but do not replace technical escalation criteria.

---

## 2.12 Engineering escalation package

A Tier 3 escalation MUST contain sufficient information for engineering to begin investigation without repeating basic intake.

The escalation MUST include, where applicable:

1. **Summary** — concise description of the failure;
2. **Severity and impact** — affected customers, workflows, and scope;
3. **Expected behavior**;
4. **Actual behavior**;
5. **First observed / last observed timestamps**;
6. **Environment**;
7. **Reproduction status**;
8. **Minimal reproduction steps**;
9. **Evidence** — logs, trace IDs, error codes, screenshots, request IDs, metrics;
10. **Known affected versions or configurations**;
11. **Troubleshooting already performed**;
12. **Workaround status**;
13. **Suspected subsystem**, where evidence supports it;
14. **Relevant deployment or configuration changes**;
15. **Linked support cases or incident record**; and
16. **Requested engineering action**.

Support MUST distinguish observed facts from hypotheses.

“Backend issue,” “database bug,” “API problem,” or similar unsupported attribution MUST NOT be presented as established root cause.

---

## 2.13 Bug-report quality standard

An engineering bug report MUST be independently understandable by an engineer who did not participate in the original conversation.

A high-quality bug report MUST answer:

- **What is wrong?**
- **What should have happened?**
- **Who or what is affected?**
- **How often does it occur?**
- **Can it be reproduced?**
- **What evidence exists?**
- **What environment and version are involved?**
- **Is there a workaround?**
- **What is the customer or operational impact?**

Bug reports SHOULD contain the smallest reliable reproduction available.

Attachments SHOULD be annotated or described sufficiently that their relevance is clear.

Support MUST NOT attach large unfiltered log dumps when a smaller relevant subset or correlation ID can provide equivalent diagnostic value.

Secrets and unnecessary personal data MUST be removed or redacted.

---

## 2.14 Customer-facing communication principles

Customer communication MUST be:

- accurate;
- factual;
- concise;
- appropriately transparent;
- free of unsupported root-cause speculation;
- clear about current impact;
- clear about the next action or next expected update;
- consistent across channels; and
- understandable without internal engineering terminology.

Support MUST NOT:

- blame individual engineers, teams, customers, or vendors without established evidence;
- promise release dates that engineering has not committed;
- guarantee resolution times outside contractual commitments;
- claim a cause is known before it is verified;
- disclose another customer's information;
- disclose sensitive internal infrastructure information;
- describe an incident as fully resolved before restoration is verified; or
- use “working as intended” as a dismissive substitute for explaining actual supported behavior.

Communication SHOULD clearly distinguish:

- confirmed facts;
- current hypotheses;
- mitigations;
- workarounds;
- pending investigation; and
- next update.

---

## 2.15 Canonical customer communication templates

### 2.15.1 Initial acknowledgement

**Template:**

> We have received your report regarding **[affected functionality]** and are reviewing the impact.
>
> Current understanding: **[brief factual description]**.
>
> We are **[investigating / validating the reported behavior / reviewing relevant diagnostics]**. We will provide the next update **[time or condition]**.
>
> If available, please provide **[specific missing diagnostic information]**.

An acknowledgement MUST NOT imply that a defect has been confirmed unless it has.

---

### 2.15.2 Active investigation

**Template:**

> We have confirmed that **[specific observed behavior]** is affecting **[scope]**.
>
> The investigation is currently focused on **[verified area of investigation without unsupported root-cause attribution]**.
>
> **[Workaround or mitigation]** is available at this time.
>
> We will provide another update by **[time]**, or sooner if there is a material change.

---

### 2.15.3 Workaround available

**Template:**

> A temporary workaround is available while the underlying issue is being addressed.
>
> **Workaround:**  
> **[clear numbered or ordered procedure]**
>
> **Limitations:** **[known side effects, restrictions, or risks]**
>
> This workaround is intended to be temporary. We will update this case when a permanent correction or revised guidance is available.

A workaround involving elevated privilege, destructive action, data manipulation, or security-control bypass MUST NOT be issued unless explicitly approved by the relevant owner.

---

### 2.15.4 Resolution

**Template:**

> The issue affecting **[functionality]** has been resolved.
>
> **Resolution:** **[brief factual description of correction or mitigation]**.
>
> We have verified **[relevant verification signal]** and are no longer observing the reported failure.
>
> **Customer action:** **[none / required action]**.
>
> We will continue to monitor **[where appropriate]**.

---

### 2.15.5 Unable to reproduce

**Template:**

> We have not yet been able to reproduce the reported behavior using the information currently available.
>
> We have verified **[what was checked]**.
>
> To continue the investigation, please provide **[specific diagnostic information or reproduction steps]**.
>
> This does not mean the reported behavior did not occur; it means additional evidence is required to isolate the cause.

---

### 2.15.6 Expected behavior

**Template:**

> We have confirmed that the reported behavior is consistent with the current supported product behavior.
>
> **Current behavior:** **[clear description]**.
>
> **Recommended approach:** **[supported workflow or configuration]**.
>
> We have also recorded **[the documentation improvement / feature request / usability feedback]**, where applicable.

---

## 2.16 Known-issue management

A known issue SHOULD be created when:

- multiple customers are affected;
- recurrence is expected before remediation;
- a workaround exists;
- investigation is ongoing and duplicate reports are likely;
- support efficiency materially benefits from canonical guidance; or
- the issue has broad enough operational relevance to justify centralized tracking.

A known-issue record MUST contain:

- issue identifier;
- affected functionality;
- symptoms;
- known affected scope;
- known unaffected scope where useful;
- first known occurrence;
- current status;
- workaround, if any;
- workaround risks or limitations;
- owner;
- linked engineering issue;
- last-reviewed timestamp;
- customer-safe summary; and
- retirement criteria.

Known issues MUST NOT contain customer-specific confidential information.

---

## 2.17 Known-issue lifecycle

Canonical statuses are:

- **Investigating**
- **Confirmed**
- **Mitigated**
- **Fix in progress**
- **Resolved**
- **Monitoring**
- **Retired**

A known issue MUST be reviewed when:

- product behavior changes;
- affected versions change;
- workaround safety changes;
- a fix is released;
- a material new symptom appears; or
- the record exceeds its defined review interval.

Resolved known issues SHOULD be retired or clearly marked historical once they are no longer operationally relevant.

Stale known-issue entries MUST NOT remain discoverable as current guidance indefinitely.

---

## 2.18 Workaround governance

A workaround is an intentionally temporary method for avoiding or reducing the impact of a known defect or limitation.

Every material workaround MUST document:

1. applicable symptoms;
2. prerequisites;
3. procedure;
4. limitations;
5. side effects;
6. security implications;
7. data implications;
8. accessibility implications where relevant;
9. rollback or reversal steps;
10. owner; and
11. retirement condition.

Workarounds MUST NOT:

- bypass authorization controls without explicit Security approval;
- require credential sharing;
- expose tenant data;
- weaken encryption;
- disable audit controls;
- require uncontrolled direct database modification;
- create undocumented data divergence;
- introduce inaccessible replacement workflows where avoidable; or
- become permanent undocumented architecture.

A workaround that remains necessary for an extended period SHOULD be treated as product or technical debt and governed accordingly.

---

## 2.19 Root-cause feedback loop

Closing the customer case MUST NOT automatically conclude organizational learning.

Confirmed defects and incidents SHOULD feed one or more of:

- engineering backlog;
- technical-debt register;
- automated tests;
- observability improvements;
- runbook updates;
- product documentation;
- API documentation;
- validation improvements;
- accessibility standards;
- administrative tooling;
- component patterns;
- release checks;
- training; and
- support automation.

Recurring cases MUST be periodically analyzed for systemic patterns.

Support and engineering SHOULD review:

- repeated symptoms;
- top-contact drivers;
- high-effort cases;
- repeated workaround use;
- regressions;
- missing telemetry;
- documentation gaps; and
- product areas generating disproportionate support volume.

The objective of support analytics MUST be reduction of recurring customer friction, not reduction of ticket count by discouraging legitimate reports.

---

## 2.20 Root-cause analysis linkage

Where an incident or defect requires formal root-cause analysis, the support system MUST link to the authoritative RCA rather than maintaining a conflicting parallel explanation.

Customer-facing summaries MAY be derived from the RCA but MUST:

- remove internal-only information;
- avoid disclosure of sensitive architecture or security details;
- distinguish contributing factors from root cause;
- avoid assigning personal blame; and
- remain consistent with established facts.

A corrected RCA finding MUST propagate to affected known-issue and support documentation.

---

## 2.21 Observability requirements

Support tooling SHOULD expose safe, purpose-built diagnostic information rather than requiring broad production access.

Relevant diagnostics MAY include:

- request or trace IDs;
- event timestamps;
- API status codes;
- delivery status;
- processing state;
- feature/configuration state;
- synchronization timestamps;
- queue state;
- version information;
- user-safe error identifiers;
- relevant audit events; and
- scoped system health signals.

Operational systems SHOULD generate correlation identifiers that can be safely provided to customers and used by support.

Support MUST NOT depend on unrestricted shell, database, log-platform, or cloud-console access for routine diagnosis.

Missing diagnostic visibility that repeatedly blocks support SHOULD be tracked as observability debt.

---

## 2.22 Support tooling

Support tooling MUST be designed as privileged internal software.

The tooling MUST comply with:

- Security standards;
- Data & Database standards;
- Accessibility standards;
- Forms & Validation standards;
- State Management standards;
- Design Tokens standards;
- Component standards; and
- approved administrative-tool patterns.

shadcn/ui MUST be the component baseline for new support-tool interfaces unless another approved internal platform standard explicitly overrides it.

Support tools SHOULD use established shadcn/ui-derived primitives for:

- tables;
- dialogs;
- alerts;
- forms;
- tabs;
- badges;
- command/search interfaces;
- dropdown menus;
- pagination;
- confirmation flows; and
- status indicators.

Internal tooling MUST NOT be exempted from accessibility or design-system requirements merely because customers do not directly use it.

---

## 2.23 Support tooling access controls

Support access MUST follow least privilege.

Access SHOULD be role-based and scoped according to responsibility.

Examples include:

- read-only support;
- account administration;
- billing administration;
- technical diagnostics;
- security operations;
- data repair;
- engineering operations; and
- elevated emergency access.

Support users MUST NOT receive unrestricted production access solely because broad access is operationally convenient.

Privileged support actions MUST be auditable.

Audit records SHOULD capture:

- actor;
- customer or tenant;
- action;
- affected resource;
- timestamp;
- reason or case ID;
- before/after values where appropriate; and
- success or failure.

---

## 2.24 Customer impersonation

Customer impersonation or “view as user” functionality is security-sensitive.

Where supported, it MUST:

- require explicit authorization;
- be restricted to approved roles;
- show a persistent visual indication that impersonation is active;
- prevent ambiguity between operator and customer identity;
- be auditable;
- preserve tenant isolation;
- limit actions where practical;
- require a support or incident reference for elevated use; and
- automatically terminate or expire according to policy.

Impersonation MUST NOT silently grant access to credentials, secrets, payment data, or other categories outside the operator's approved role.

Actions performed during impersonation MUST remain attributable to the support operator.

---

## 2.25 Data access and repair

Support access to customer data MUST comply with Data & Database and Security standards.

Support SHOULD use purpose-built read models and administrative interfaces rather than direct production queries.

Direct production database access MUST NOT be the normal support workflow.

Data correction MUST:

- use approved tooling or runbooks;
- preserve auditability;
- validate authorization;
- identify affected records;
- define expected result;
- include rollback or forward-recovery planning where material;
- respect business invariants; and
- be linked to an authorized support, incident, or engineering record.

Manual mutation of production data MUST NOT be performed merely to make a support case disappear.

---

## 2.26 API and integration support

API-related support MUST align with the API standard.

Support SHOULD capture:

- endpoint;
- method;
- timestamp;
- environment;
- request or correlation identifier;
- API version;
- response status;
- documented error code;
- authentication mechanism category without exposing credentials;
- retry behavior;
- idempotency information where relevant; and
- webhook or event identifiers where relevant.

Customer secrets MUST NOT be copied into support records.

Support MUST distinguish:

- transport failure;
- authentication failure;
- authorization failure;
- validation failure;
- rate limiting;
- business-rule rejection;
- server failure;
- timeout;
- async-processing delay; and
- third-party failure.

---

## 2.27 State-management issues

Support tools MUST display state authority clearly.

Where multiple system states are visible, interfaces SHOULD distinguish between:

- requested state;
- persisted state;
- computed state;
- queued state;
- processing state;
- delivered state;
- failed state; and
- externally synchronized state.

Support documentation MUST NOT instruct operators to treat cached, derived, or eventually consistent state as authoritative without qualification.

Manual state changes SHOULD occur through the same governed domain operations used by the product wherever practical.

---

## 2.28 Forms and validation in support tools

Administrative forms MUST comply with the Forms & Validation standard.

Support tools MUST:

- validate input on the authoritative boundary;
- provide clear field errors;
- preserve entered data after recoverable validation errors;
- distinguish validation failure from system failure;
- require explicit confirmation for destructive actions;
- prevent duplicate submission where relevant;
- provide accessible status feedback; and
- use established field and form patterns.

Free-text administrative fields MUST NOT replace structured validated inputs where the operation requires constrained data.

---

## 2.29 Accessibility

Support operations and tooling MUST comply with the Accessibility standard.

Support intake channels SHOULD provide accessible alternatives to communication modes that may exclude users.

Support portals and internal support tools MUST support, as applicable:

- semantic controls;
- keyboard navigation;
- visible focus;
- screen-reader labeling;
- error association;
- appropriate live announcements;
- accessible dialogs;
- non-color-only status communication;
- sufficient contrast; and
- reduced-motion preferences.

Accessibility complaints MUST be triaged using the same structured process as other product issues.

They MUST NOT be automatically classified as cosmetic.

---

## 2.30 Design tokens, components, and patterns

Support and administrative tooling MUST use established design tokens and reusable component patterns.

Teams MUST NOT introduce:

- arbitrary colors for severity;
- duplicated status systems;
- local typography scales;
- custom modal systems;
- one-off form controls;
- inconsistent table interactions;
- inaccessible custom widgets; or
- status colors without textual or semantic reinforcement.

Severity, case status, investigation state, and escalation state MUST be visually distinguishable without relying solely on color.

Shared operational patterns SHOULD be standardized across support, incident, observability, and administrative tools.

---

## 2.31 Documentation ownership

Support documentation MUST have an owner.

Operationally important articles SHOULD include:

- intended audience;
- supported product/version scope;
- prerequisites;
- procedure;
- expected result;
- failure conditions;
- escalation criteria;
- related known issues;
- last-reviewed date; and
- owner.

Documentation created during an incident or urgent workaround MUST be normalized and reviewed before becoming permanent support guidance.

“Tribal knowledge” MUST NOT be accepted as the sole source for recurring support procedures.

---

## 2.32 Case closure

A support case MAY be closed when:

- the issue is resolved;
- a verified workaround satisfies the immediate customer need and follow-up work is separately tracked;
- the behavior is confirmed as supported and adequately explained;
- requested information has not been provided after the approved follow-up process;
- the case is a duplicate with continuing communication attached to the canonical record;
- the issue is outside supported scope and appropriate guidance is provided; or
- a feature request has been properly recorded and communicated as such.

A case MUST NOT be closed solely because:

- engineering has created a bug;
- investigation has moved to another system;
- an internal team stopped responding;
- an SLA target was missed;
- the issue is difficult to reproduce; or
- the affected customer is no longer actively replying during an ongoing critical incident.

---

## 2.33 Closure notes

Closure notes SHOULD identify:

- final classification;
- resolution or explanation;
- workaround if still relevant;
- linked engineering issue;
- linked known issue;
- customer action, if any;
- permanent follow-up work;
- documentation changes; and
- whether root-cause analysis is required.

Support closure MUST NOT hide unresolved systemic work.

Customer resolution and engineering remediation MAY complete at different times and SHOULD be tracked separately.

---

## 2.34 Support metrics

Support metrics SHOULD measure customer impact, operational effectiveness, and systemic quality.

Useful measures include:

| Metric | Intended use |
|---|---|
| Initial response time | Intake responsiveness |
| Time to triage | Classification efficiency |
| Time to restoration | Incident recovery |
| Resolution time | End-to-end handling |
| Reopen rate | Resolution quality |
| Escalation rate | Support capability and product complexity |
| Engineering rejection rate | Escalation quality |
| Repeat-contact rate | Durability of resolution |
| Known-issue volume | Recurring systemic problems |
| Workaround usage | Unresolved product constraints |
| Top contact drivers | Product/documentation improvement opportunities |
| Support-originated defect rate | Product quality signal |
| Documentation deflection | Effective self-service |

Metrics MUST NOT be used in ways that incentivize:

- premature closure;
- avoidance of severe classifications;
- refusing legitimate escalation;
- minimizing customer contact;
- hiding repeat issues; or
- classifying defects as questions.

---

# 3. Anti-patterns

## 3.1 Slack as the support system

**Anti-pattern:** Customer-impacting issues are managed primarily through chat threads.

**Why it fails:** Ownership, auditability, history, metrics, attachments, and closure state become unreliable.

**Required correction:** Record and manage the authoritative case in the approved support system.

---

## 3.2 Severity by customer importance

**Anti-pattern:** A minor issue becomes S1 because it affects a strategically important customer.

**Why it fails:** Operational severity stops representing technical impact.

**Required correction:** Keep technical severity impact-based. Manage commercial urgency separately.

---

## 3.3 Engineering as Tier 1

**Anti-pattern:** Every technical-looking question is sent directly to engineers.

**Why it fails:** Engineering becomes an unstructured support queue and repeatable knowledge never moves into support tooling or documentation.

**Required correction:** Build Tier 1/Tier 2 diagnostics, runbooks, and escalation-quality requirements.

---

## 3.4 Empty escalation

**Anti-pattern:** Engineering receives “Customer says it is broken. Please investigate.”

**Why it fails:** Intake work is duplicated and resolution slows.

**Required correction:** Meet the engineering escalation package standard.

---

## 3.5 Hypothesis presented as fact

**Anti-pattern:** Support tells the customer “the database is down” because the UI showed an error.

**Why it fails:** Incorrect technical attribution damages credibility and can misdirect remediation.

**Required correction:** Clearly distinguish observation from hypothesis and verified cause.

---

## 3.6 Log-dump escalation

**Anti-pattern:** Hundreds of megabytes of logs are attached without timestamps, IDs, or analysis.

**Why it fails:** Investigation cost is transferred rather than reduced.

**Required correction:** Provide scoped evidence, correlation IDs, relevant intervals, and observed failure signals.

---

## 3.7 Secret collection

**Anti-pattern:** Support asks customers to send passwords, tokens, private keys, or MFA codes.

**Why it fails:** It violates security boundaries and creates avoidable credential exposure.

**Required correction:** Use secure diagnostic and authorization workflows that do not require secret sharing.

---

## 3.8 Direct database support

**Anti-pattern:** Support routinely fixes customer issues by manually editing production records.

**Why it fails:** Business invariants, auditability, data integrity, and authorization controls are bypassed.

**Required correction:** Use governed administrative operations or engineering-controlled data-repair procedures.

---

## 3.9 Workaround becomes product behavior

**Anti-pattern:** A temporary workaround is repeated for months without remediation or formal support.

**Why it fails:** Unsupported behavior becomes undocumented permanent architecture.

**Required correction:** Track the underlying defect or debt and define workaround retirement.

---

## 3.10 Stale known issue

**Anti-pattern:** Old issue guidance continues appearing after the affected version or workaround is obsolete.

**Why it fails:** Support distributes incorrect operational advice.

**Required correction:** Require ownership, review timestamps, and retirement criteria.

---

## 3.11 “Working as intended” closure

**Anti-pattern:** A confusing or undocumented behavior is closed with no explanation.

**Why it fails:** The customer's problem may remain unresolved even if no defect exists.

**Required correction:** Explain supported behavior and feed documentation, usability, or feature feedback into the appropriate system.

---

## 3.12 Feature request disguised as bug

**Anti-pattern:** Unsupported desired behavior is labeled a defect to increase urgency.

**Why it fails:** Product quality signals and defect metrics become unreliable.

**Required correction:** Preserve accurate classification while recording impact separately.

---

## 3.13 Bug disguised as feature request

**Anti-pattern:** A supported behavior that no longer works is reclassified as enhancement work.

**Why it fails:** Product regressions are hidden from engineering quality metrics.

**Required correction:** Validate the supported contract and classify accurately.

---

## 3.14 Case closure as success metric

**Anti-pattern:** Support is optimized primarily around number of tickets closed.

**Why it fails:** It incentivizes superficial responses, premature closure, and suppression of difficult cases.

**Required correction:** Measure durability, customer impact, recurrence, restoration, and systemic improvement.

---

## 3.15 Uncontrolled impersonation

**Anti-pattern:** Support staff can silently act as customers without persistent indication or audit.

**Why it fails:** Accountability, privacy, and security boundaries become ambiguous.

**Required correction:** Enforce role restriction, visible impersonation state, auditability, and session expiry.

---

## 3.16 Internal-tool exemption

**Anti-pattern:** Support tools ignore accessibility, component, token, or validation standards because “only employees use them.”

**Why it fails:** Operational error rates increase and the organization creates a second, lower-quality product ecosystem.

**Required correction:** Apply canonical interface standards to internal tooling.

---

## 3.17 Status by color only

**Anti-pattern:** Red, yellow, and green are the only representations of severity or case state.

**Why it fails:** Meaning is inaccessible and ambiguous.

**Required correction:** Pair color with text, iconography where appropriate, and semantic status.

---

## 3.18 Root cause stops at support

**Anti-pattern:** A customer receives a workaround, the ticket closes, and recurring product failure remains unchanged.

**Why it fails:** Support absorbs permanent cost while engineering receives no quality signal.

**Required correction:** Feed systemic findings into defects, tests, observability, documentation, and technical-debt governance.

---

# 4. Checklist

## 4.1 Support model

- [ ] Are supported intake channels explicitly defined?
- [ ] Are operating hours or coverage expectations documented?
- [ ] Are Tier 0–3 ownership boundaries clear?
- [ ] Are published response objectives supportable?
- [ ] Are contractual SLAs distinguished from internal objectives?
- [ ] Is customer communication ownership clear?

---

## 4.2 Intake

- [ ] Is the customer or tenant identified?
- [ ] Is the affected product/environment identified?
- [ ] Are expected and actual behaviors recorded?
- [ ] Is business impact described?
- [ ] Are occurrence timestamps and timezone captured?
- [ ] Are reproduction steps available?
- [ ] Are useful correlation IDs or error identifiers captured?
- [ ] Have unnecessary sensitive values been excluded?
- [ ] Has the case been captured in the authoritative support system?

---

## 4.3 Triage

- [ ] Does the case have one primary classification?
- [ ] Is severity based on actual impact?
- [ ] Has workaround availability been considered?
- [ ] Is the affected scope known?
- [ ] Have duplicate or related cases been linked?
- [ ] Has a Security, privacy, or incident process been triggered where required?
- [ ] Has “Unknown” been treated as temporary?

---

## 4.4 Engineering escalation

- [ ] Is engineering escalation actually warranted?
- [ ] Is the correct owning team identified?
- [ ] Is severity and impact stated?
- [ ] Are expected and actual behavior stated?
- [ ] Are timestamps included?
- [ ] Is reproduction status clear?
- [ ] Are minimal reproduction steps included?
- [ ] Is scoped diagnostic evidence included?
- [ ] Is completed troubleshooting documented?
- [ ] Is workaround status documented?
- [ ] Are facts separated from hypotheses?
- [ ] Is the requested engineering action explicit?

---

## 4.5 Bug quality

- [ ] Can an engineer unfamiliar with the support conversation understand the report?
- [ ] Is the affected environment/version clear?
- [ ] Is the failure frequency known?
- [ ] Is scope known?
- [ ] Are unnecessary logs removed?
- [ ] Are sensitive values redacted?
- [ ] Is supporting evidence attached or linked?
- [ ] Is the bug linked back to affected customer cases?

---

## 4.6 Customer communication

- [ ] Are statements factually supported?
- [ ] Is unsupported root-cause speculation avoided?
- [ ] Is current impact clear?
- [ ] Is any workaround clearly described?
- [ ] Are workaround limitations stated?
- [ ] Is the next action or update expectation clear?
- [ ] Are unapproved release dates or guarantees avoided?
- [ ] Is customer-specific information protected?

---

## 4.7 Known issues

- [ ] Does the issue warrant centralized known-issue tracking?
- [ ] Is affected scope documented?
- [ ] Is owner defined?
- [ ] Is status current?
- [ ] Is workaround guidance current?
- [ ] Are risks or limitations documented?
- [ ] Is the linked engineering issue recorded?
- [ ] Is last-review time recorded?
- [ ] Are retirement criteria defined?

---

## 4.8 Workarounds

- [ ] Is the procedure explicit?
- [ ] Is the applicable scenario clear?
- [ ] Are limitations documented?
- [ ] Have security implications been reviewed?
- [ ] Have data implications been reviewed?
- [ ] Is reversal possible where necessary?
- [ ] Does the workaround preserve accessibility where applicable?
- [ ] Is an owner defined?
- [ ] Is there a retirement condition?

---

## 4.9 Support tooling

- [ ] Does access follow least privilege?
- [ ] Are privileged actions audited?
- [ ] Are actions attributable to the operator?
- [ ] Are customer and tenant boundaries enforced?
- [ ] Are diagnostics purpose-built rather than requiring broad production access?
- [ ] Are data mutations governed?
- [ ] Is impersonation visibly indicated and logged?
- [ ] Are forms and validation compliant?
- [ ] Are accessibility requirements met?
- [ ] Are design tokens used?
- [ ] Are shadcn/ui-derived component patterns used?
- [ ] Are destructive operations explicitly confirmed?

---

## 4.10 Root-cause feedback

- [ ] Has the underlying engineering work been tracked?
- [ ] Were missing tests added or proposed?
- [ ] Were observability gaps identified?
- [ ] Does documentation require correction?
- [ ] Does the case reveal a recurring UX or accessibility problem?
- [ ] Should the issue enter the technical-debt register?
- [ ] Have repeated support cases been linked to the same systemic cause?
- [ ] Has any relevant runbook been updated?

---

## 4.11 Closure

- [ ] Is the customer-facing outcome clear?
- [ ] Has resolution or supported behavior been verified?
- [ ] Is permanent follow-up tracked separately if needed?
- [ ] Are linked engineering and known-issue records attached?
- [ ] Has the customer been told whether further action is required?
- [ ] Is RCA required?
- [ ] Is closure based on actual outcome rather than internal queue movement?

---

# 5. Canonical Summary

1. **Support MUST operate through governed intake channels, explicit support tiers, defined severity levels, and accountable ownership.**

2. **Severity MUST represent customer and operational impact. Commercial importance MAY affect coordination, but MUST NOT redefine technical severity.**

3. **Support MUST distinguish initial response, triage, updates, restoration, resolution targets, and contractual SLAs. A response objective is not a resolution guarantee.**

4. **Every support case MUST be classified and triaged using structured evidence. “Unknown” is permitted only as a temporary state.**

5. **Engineering escalation MUST include impact, expected and actual behavior, reproduction status, scoped diagnostics, troubleshooting completed, workaround status, and a clear requested action.**

6. **Support MUST distinguish observed facts from hypotheses and verified root cause. Customer communication MUST NOT present speculation as fact.**

7. **Passwords, tokens, MFA codes, private keys, and equivalent secrets MUST NOT be collected through support workflows.**

8. **Known issues and workarounds MUST have owners, current guidance, risks, review state, and retirement conditions. Temporary workarounds MUST NOT become ungoverned permanent product behavior.**

9. **Support tooling is privileged internal software and MUST comply with Security, Data & Database, API, State Management, Forms & Validation, Accessibility, Design Tokens, Component, and Pattern standards. shadcn/ui is the canonical component baseline.**

10. **Routine support MUST NOT depend on unrestricted production, database, shell, cloud-console, or log access. Purpose-built diagnostic and administrative tooling SHOULD be used instead.**

11. **Impersonation, data repair, and privileged administrative actions MUST be role-restricted, attributable, auditable, and explicitly tied to an authorized support or incident context.**

12. **Customer case closure and engineering remediation are separate lifecycle events. Closing a case MUST NOT erase unresolved systemic work.**

13. **Confirmed defects and recurring support patterns SHOULD feed engineering work, automated tests, observability, documentation, accessibility, administrative tooling, and technical-debt governance.**

14. **Support metrics MUST optimize for durable resolution, restoration, recurrence reduction, and customer impact—not raw ticket closure volume.**

15. **The objective of support is not merely to answer cases. It is to restore customer outcomes, preserve trust, reduce recurring failure, and convert operational evidence into durable product and engineering improvements.**
