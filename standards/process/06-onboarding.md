---
id: "onboarding"
title: "Onboarding & Ramp-up"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["process", "onboarding", "ramp", "up"]
applies_to: ["team"]
related: ["code-review", "secrets"]
legacy_number: 90
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 52408
provenance: baseline

---

# Engineering Onboarding & Ramp-up Guidelines — Gold Standard 2026

**Canonical placement:** Documentation → Onboarding → Framework → Configuration & Environment  
**Status:** Gold Standard 2026  
**Component baseline:** shadcn/ui for onboarding portals, checklists, access requests, status, learning, and administrative surfaces  
**Core principle:** onboarding MUST produce safe, independent engineering capability through reproducible systems and supported practice—not through undocumented tribal knowledge or pressure for immediate output

---

# 1. Purpose

## 1.1 Scope

This standard defines the canonical requirements for engineering onboarding and technical ramp-up.

It covers:

- pre-start readiness;
- first-day expectations;
- first-week expectations;
- first-month expectations;
- environment setup;
- account and access provisioning;
- least-privilege permissions;
- repository orientation;
- architecture maps;
- local development;
- testing and CI/CD orientation;
- first-task selection;
- code review;
- pairing;
- mentoring and onboarding buddies;
- security training;
- privacy and data-handling training;
- production access;
- documentation use and improvement;
- role-specific learning;
- remote and asynchronous onboarding;
- accessibility accommodations;
- ramp-up measurement;
- onboarding health;
- feedback and continuous improvement.

This standard applies to:

- software engineers;
- platform and infrastructure engineers;
- data engineers;
- analytics engineers;
- security engineers;
- SREs;
- ML/AI engineers;
- engineering contractors;
- internal transfers where the target system or role is materially different.

---

## 1.2 Design objective

Engineering onboarding MUST reduce the time required for a new engineer to become **safely and independently effective**.

Speed alone is insufficient.

A successful ramp-up MUST progressively establish:

1. **identity and access;**
2. **secure development capability;**
3. **understanding of system purpose and architecture;**
4. **ability to build, test, and debug locally;**
5. **understanding of delivery and operational workflows;**
6. **ability to make an appropriately scoped production contribution;**
7. **knowledge of where authoritative documentation and help exist;**
8. **confidence to make increasingly independent technical decisions.**

Onboarding MUST NOT assume that a newly hired engineer should be fully productive on the first day.

Public engineering onboarding programs such as GitLab's similarly separate account/tool setup, documented technical orientation, security material, and progressively more role-specific contribution rather than treating immediate production output as the first objective. citeturn970917search0turn970917search3turn970917search8

---

## 1.3 Ramp-up is an engineering-system responsibility

Onboarding difficulty MUST NOT automatically be attributed to the incoming engineer.

If every new engineer encounters the same:

- broken setup;
- missing permission;
- undocumented dependency;
- unclear architecture;
- tribal workflow;

the organization SHOULD treat that pattern as an engineering-system defect.

Onboarding therefore serves two purposes:

- enable the engineer;
- continuously test the usability of the engineering environment.

---

## 1.4 Onboarding is not documentation consumption

Reading documentation is necessary but insufficient.

A conforming onboarding program MUST include practical interaction with:

- source code;
- development environment;
- tests;
- code review;
- delivery pipelines;
- operational tooling appropriate to the role.

Engineers SHOULD learn systems by performing progressively realistic work.

Documentation MUST support this work rather than become a multi-day reading queue without application.

---

## 1.5 Relationship to other standards

Engineering onboarding MUST align with corpus standards for:

- **Security** — identity, least privilege, MFA, secrets, secure development, incident reporting;
- **Data & Database** — production data, privacy, migration, backups, query access;
- **API** — service contracts, authentication, compatibility, testing;
- **State Management** — application architecture and client/server state boundaries;
- **Forms & Validation** — validation conventions and secure input handling;
- **Accessibility** — accessible engineering tools, training, documentation, and product expectations;
- **Design Tokens** — design-system orientation for engineers working on UI;
- **Components** — shadcn/ui as the product component baseline;
- **Patterns** — canonical implementation and interaction patterns;
- **Configuration & Environment** — reproducible developer environments and runtime configuration;
- **Documentation** — authoritative knowledge and contribution expectations;
- **Architecture/ADR** — architecture history and significant technical decisions.

Onboarding MUST teach engineers where these standards live and when they apply.

---

# 2. Rules

## 2.1 Onboarding MUST have an explicit owner

Every incoming engineer MUST have a named onboarding owner.

The owner SHOULD normally be the hiring manager, engineering manager, or designated technical lead.

The owner is accountable for ensuring that:

- required access is requested;
- a mentor or buddy is assigned;
- role-specific material exists;
- suitable first work is available;
- blocking issues are escalated;
- ramp-up health is reviewed.

The owner MUST NOT be expected to personally teach every topic.

---

## 2.2 The onboarding plan MUST be individualized by role

There MUST be a canonical baseline onboarding framework.

The actual plan SHOULD be tailored according to:

- role;
- seniority;
- product area;
- security exposure;
- data access;
- infrastructure privileges;
- prior organizational familiarity.

A senior platform engineer and a junior frontend engineer SHOULD NOT receive identical technical onboarding checklists.

---

## 2.3 Expectations MUST be stated explicitly

The engineer MUST know what is expected during:

- the first day;
- first week;
- first month;
- later role-specific ramp-up where applicable.

Expectations SHOULD focus on capabilities and understanding rather than raw output volume.

Managers MUST NOT privately evaluate engineers against unstated onboarding milestones.

---

# 2.4 Pre-start readiness

Before the engineer's start date, the organization SHOULD prepare:

- approved device or device process;
- primary identity;
- required baseline software;
- role definition;
- onboarding owner;
- mentor/buddy;
- onboarding plan;
- first-week calendar;
- initial access requests.

The first working day SHOULD NOT be consumed entirely by preventable administrative provisioning.

---

## 2.5 Access SHOULD be pre-provisioned where safe

Baseline access known from the employee's role SHOULD be provisioned automatically or requested before start where organizational policy permits.

Typical baseline access MAY include:

- source-control organization;
- documentation;
- issue tracker;
- communication systems;
- development package registries;
- test/staging environments.

Privileged access MUST NOT be pre-granted merely for convenience.

---

## 2.6 Identity MUST be established before privileged access

The engineer MUST activate the organization's canonical identity and required authentication controls before receiving sensitive access.

Required controls SHOULD include where applicable:

- MFA;
- device enrollment;
- SSO;
- password manager;
- endpoint protection.

Access workflows MUST follow the Security standard.

---

# 2.7 First-day objective

The first-day objective is **safe orientation and basic technical operability**, not feature delivery.

By the end of the first day, the engineer SHOULD normally be able to:

- authenticate to core engineering systems;
- locate the onboarding plan;
- communicate with their team;
- locate authoritative engineering documentation;
- understand the team's broad mission;
- identify their manager and mentor/buddy;
- begin or complete baseline workstation setup.

A production code contribution MUST NOT be required on the first day.

---

## 2.8 First-day scope MUST be bounded

First-day onboarding SHOULD prioritize a small number of high-value activities.

It SHOULD NOT attempt to cover:

- the entire architecture;
- every repository;
- every product feature;
- every operational procedure.

Excessive orientation volume creates low-retention onboarding without improving readiness.

---

## 2.9 The engineer MUST know where to ask for help

On the first day, the engineer MUST be shown:

- primary team communication channel;
- access-support path;
- developer-environment support path;
- security reporting path;
- manager and mentor/buddy contact.

They MUST NOT need to infer escalation routes from organizational structure.

---

# 2.10 First-week objective

The first-week objective is **reproducible development capability and system orientation**.

By the end of the first week, the engineer SHOULD normally be able to:

- build or run the primary relevant system;
- execute relevant tests;
- locate logs/debugging tools;
- understand the basic code-review process;
- describe the system at a high architectural level;
- identify major data and security boundaries;
- make or begin a low-risk contribution.

---

## 2.11 First-week expectations MUST include hands-on use

The engineer SHOULD perform real operations such as:

- clone repositories;
- run development services;
- change code;
- execute tests;
- open a pull request;
- inspect CI;
- respond to review.

Onboarding MUST NOT consist exclusively of videos, documentation, and meetings.

GitLab's public onboarding guidance similarly emphasizes using actual development tooling early and using small practical tasks to build confidence. citeturn970917search8

---

# 2.12 First-month objective

The first-month objective is **increasingly independent contribution within a bounded ownership area**.

By the end of the first month, the engineer SHOULD normally be able to:

- complete ordinary scoped engineering work;
- navigate the primary architecture independently;
- identify relevant standards and ADRs;
- use development and delivery workflows without step-by-step assistance;
- understand normal operational ownership;
- identify when specialist review is required;
- handle role-appropriate data securely;
- participate meaningfully in code review.

These are corpus targets, not employment-performance guarantees.

Complex domains MAY require longer ramp-up.

---

## 2.13 Independence MUST increase progressively

The onboarding plan SHOULD move through stages such as:

**observe → perform with guidance → perform with review → perform independently**

An engineer SHOULD NOT move directly from passive orientation to unsupported ownership of critical production systems.

---

# 2.14 Environment setup MUST be reproducible

The canonical developer setup MUST be documented and repeatable.

Setup SHOULD be automated where practical through:

- bootstrap scripts;
- package manifests;
- dev containers;
- environment managers;
- infrastructure automation.

A new engineer MUST NOT need a sequence of undocumented commands copied from another engineer's shell history.

---

## 2.15 Setup documentation MUST start from a known baseline

Environment documentation MUST state supported:

- operating systems;
- runtime versions;
- package managers;
- required system dependencies;
- container/runtime requirements;
- hardware requirements where material.

The instructions MUST NOT assume hidden workstation state.

---

## 2.16 Setup MUST have a verification step

Environment documentation SHOULD end with one or more deterministic checks.

Examples include:

- application starts;
- health endpoint succeeds;
- test suite passes;
- expected local page renders;
- development database is reachable.

“Setup complete” MUST NOT mean merely that installation commands returned successfully.

---

## 2.17 Setup failures MUST be actionable

Common environment errors SHOULD have:

- known explanation;
- remediation;
- owner or support path.

The onboarding engineer MUST NOT be expected to debug every legacy setup defect independently as a test of competence.

---

## 2.18 Setup time SHOULD be measured

Teams SHOULD measure the approximate time required for a clean supported environment setup.

Repeated increases SHOULD trigger investigation.

A setup process that routinely requires multiple working days SHOULD be treated as a developer-experience problem unless the environment has exceptional justified complexity.

---

## 2.19 Developer setup MUST NOT require production secrets

Local development MUST follow the Secrets & Key Management standard.

Engineers MUST NOT copy:

- production database passwords;
- production API secrets;
- signing keys;
- unrestricted cloud credentials

into local configuration merely to run the application.

Development-scoped credentials and test data SHOULD be provided.

---

## 2.20 Example environment configuration MUST be safe

Repositories MAY contain files such as:

`.env.example`

These MUST contain:

- variable names;
- documented placeholders;
- safe development defaults where appropriate.

They MUST NOT contain real credentials.

---

# 2.21 Access provisioning MUST use roles

Access SHOULD be granted through:

- role;
- team;
- group;
- policy

rather than individual one-off grants wherever practical.

This reduces inconsistent onboarding and simplifies later access review.

---

## 2.22 Access MUST follow least privilege

An incoming engineer MUST receive only access necessary for assigned work.

NIST defines least privilege as authorizing only the access necessary to accomplish assigned tasks and recommends reviewing and removing unnecessary privileges. citeturn238555search0

Seniority MUST NOT automatically grant unrestricted:

- production;
- database;
- cloud;
- customer-data;
- secret access.

---

## 2.23 Privileged access SHOULD be progressive

Sensitive privileges SHOULD be granted when the engineer has:

- a role-based need;
- completed required training;
- understood operating procedures;
- received required approval.

Examples include:

- production shell access;
- production database access;
- secret-manager access;
- administrative cloud roles.

---

## 2.24 Access requests MUST identify purpose

A privileged-access request SHOULD identify:

- requested role/resource;
- business/engineering purpose;
- environment;
- duration where temporary;
- approving owner.

“Engineer needs everything” is not a valid access model.

---

## 2.25 Temporary elevated access SHOULD expire

Access required only for:

- onboarding exercise;
- migration;
- debugging;
- temporary assignment

SHOULD have an expiration where the identity platform supports it.

Onboarding MUST NOT create permanent privilege accumulation.

---

## 2.26 Provisioning failures MUST be visible

The onboarding plan SHOULD track blocked access separately from learning progress.

A new engineer MUST NOT be judged as slow because organizational provisioning prevented them from performing assigned work.

---

## 2.27 Access provisioning SHOULD have an SLA

Core engineering access SHOULD have an internally defined provisioning target.

Repeated missed provisioning targets MUST be tracked as onboarding-health issues.

---

# 2.28 Every engineer MUST receive a codebase tour

The codebase tour MUST explain at minimum:

- repository purpose;
- major top-level modules;
- application entry points;
- primary data flows;
- tests;
- configuration;
- build/deployment location.

The tour SHOULD focus on navigation rather than exhaustive code reading.

---

## 2.29 Architecture orientation MUST use a map

Material systems SHOULD provide an architecture map or equivalent diagram showing:

- major components;
- external systems;
- data stores;
- primary communication paths;
- trust boundaries;
- ownership boundaries.

The diagram MUST be sufficiently current to teach the present architecture.

---

## 2.30 Architecture maps MUST link to deeper documentation

The high-level architecture map SHOULD link to:

- service docs;
- API contracts;
- data models;
- infrastructure;
- ADRs;
- runbooks.

The onboarding map SHOULD be a navigation aid, not another isolated architecture document.

---

## 2.31 The system's critical path SHOULD be explained

The onboarding engineer SHOULD be walked through at least one representative end-to-end flow.

Examples include:

**browser → API → service → database**

or:

**event → queue → processor → warehouse**

The flow SHOULD explain where:

- authentication;
- validation;
- state;
- persistence;
- errors;
- observability

occur.

---

## 2.32 Domain language MUST be taught

The team SHOULD provide a glossary for important:

- business terms;
- acronyms;
- domain entities;
- technical terminology.

An engineer MUST NOT need months of meetings to discover that different teams use the same word with different meanings.

---

## 2.33 Architectural history SHOULD be discoverable

Engineers SHOULD be introduced to the ADR system.

They SHOULD know:

- where ADRs live;
- which major ADRs govern their area;
- how to determine whether an ADR is current.

Onboarding SHOULD NOT require reading every historical ADR.

---

# 2.34 Documentation MUST identify source of truth

For each major subject, the engineer SHOULD know the authoritative source.

Examples:

- architecture → architecture docs/ADRs;
- API → API specification;
- schema → migration/model definitions;
- infrastructure → infrastructure-as-code;
- product components → design-system documentation.

Two conflicting documents MUST NOT both be presented as authoritative.

---

## 2.35 Onboarding documentation MUST be executable

Procedural onboarding documentation SHOULD contain steps that can actually be performed.

Commands MUST be maintained.

Dead links and obsolete screenshots SHOULD be treated as defects.

A new engineer encountering an error SHOULD be encouraged to improve the documentation once the correct process is known.

---

## 2.36 New engineers SHOULD be documentation testers

Fresh onboarding exposes assumptions that experienced engineers no longer notice.

New engineers SHOULD be encouraged to:

- report unclear instructions;
- fix broken links;
- clarify setup steps;
- document missing prerequisites.

GitLab's handbook-first onboarding similarly uses new employees as active users of documented workflows and encourages missing information to be improved. citeturn970917search0turn970917search8

---

# 2.37 Testing architecture MUST be included in the tour

The engineer SHOULD understand:

- test categories;
- where tests live;
- how to run relevant tests;
- CI expectations;
- fixture/test-data conventions.

The first contribution SHOULD require use of the team's normal test workflow where practical.

---

## 2.38 CI/CD MUST be explained before independent delivery

Before independently merging or deploying changes, an engineer SHOULD understand:

- CI stages;
- required checks;
- merge policy;
- environment promotion;
- rollback path;
- production deployment authority.

They MUST NOT learn production delivery solely by accidentally triggering it.

---

## 2.39 Observability MUST be included in onboarding

Role-relevant engineers SHOULD know how to find:

- logs;
- metrics;
- traces;
- alert history;
- dashboards.

Onboarding SHOULD include debugging a safe example or examining a representative incident where practical.

---

## 2.40 Operational ownership MUST be introduced progressively

Engineers entering an on-call or production-support role MUST receive operational training before independent duty.

They SHOULD understand:

- incident channels;
- escalation;
- runbooks;
- rollback;
- severity model;
- post-incident process.

A newly onboarded engineer MUST NOT become sole primary responder before required role readiness is established.

---

# 2.41 First tasks MUST be intentionally selected

The first production task SHOULD be:

- real;
- useful;
- bounded;
- low-risk;
- reviewable;
- representative of normal team workflow.

It SHOULD require enough system interaction to teach something meaningful.

---

## 2.42 The first task MUST NOT be purely ceremonial

Correcting a typo MAY be useful for verifying the contribution pipeline.

It SHOULD NOT normally be considered the complete first engineering task.

The first meaningful task SHOULD expose the engineer to actual:

- code;
- tests;
- review;
- delivery

appropriate to their role.

---

## 2.43 First tasks MUST NOT be architectural traps

The first task SHOULD NOT involve:

- undocumented legacy subsystem;
- high-risk migration;
- major ambiguous refactor;
- unresolved architecture dispute;
- critical security bug

unless the engineer's role and experience make that work specifically appropriate and support is available.

---

## 2.44 First tasks SHOULD have clear acceptance criteria

The engineer SHOULD be able to determine:

- desired behavior;
- relevant test expectations;
- reviewer;
- completion criteria.

An ambiguous backlog item MUST NOT be chosen merely because it is small.

---

## 2.45 First tasks SHOULD exercise the normal workflow

A strong first task SHOULD ideally include:

1. issue understanding;
2. code change;
3. test change;
4. pull request;
5. review;
6. CI;
7. merge;
8. observation of delivery where safe.

The purpose is to learn the engineering system end to end.

---

## 2.46 First-task success MUST NOT be measured only by speed

Time to first merged change MAY be measured operationally.

It MUST NOT be used alone as a measure of engineer quality or onboarding health.

A rushed trivial PR can produce an excellent metric while teaching almost nothing.

---

# 2.47 Every engineer SHOULD have a technical mentor or buddy

The mentor/buddy SHOULD be a readily available peer distinct from the formal performance-management relationship where practical.

Their role includes:

- answering everyday questions;
- explaining team norms;
- providing system context;
- pairing;
- identifying useful people or documents.

Public onboarding programs such as GitLab's explicitly use onboarding buddies and recurring pairing/support during early ramp-up. citeturn970917search7

---

## 2.48 Mentor expectations MUST be explicit

The organization SHOULD define:

- expected duration;
- approximate contact cadence;
- responsibilities;
- escalation path.

A buddy assignment without expectations MUST NOT be treated as a complete mentoring program.

---

## 2.49 Pairing SHOULD be front-loaded

During the first weeks, engineers SHOULD have easy access to collaborative sessions for:

- environment setup;
- code navigation;
- debugging;
- first tasks;
- deployment.

Pairing frequency MAY decrease as independence increases.

---

## 2.50 Pairing MUST teach reasoning, not create dependency

The experienced engineer SHOULD explain:

- where they looked;
- how they diagnosed;
- which documentation they trusted;
- which trade-offs mattered.

They SHOULD NOT merely take control and finish the task.

The objective is transferable navigation skill.

---

## 2.51 Questions MUST be safe to ask

The team MUST NOT establish cultural expectations that discourage new engineers from asking basic questions.

Repeated questions SHOULD lead to:

- better documentation;
- better discoverability;
- clearer ownership

rather than ridicule.

---

## 2.52 Asynchronous help SHOULD be available

Onboarding SHOULD NOT depend entirely on having a specific expert online.

Teams SHOULD maintain sufficient:

- documentation;
- searchable discussions;
- runbooks;
- examples

to support engineers across schedules and time zones.

---

# 2.53 Security training MUST be part of initial onboarding

All engineers MUST receive baseline security and privacy awareness appropriate to the organization.

NIST SP 800-50 Rev. 1 treats cybersecurity and privacy learning as a lifecycle program rather than a one-time presentation, while NIST SP 800-171 Rev. 3 explicitly calls for security literacy as part of initial training. citeturn238555search0turn238555search6

---

## 2.54 Role-based security training MUST precede sensitive duties

Engineers receiving specialized access MUST receive relevant role-based security instruction before independently performing sensitive duties where policy requires it.

NIST explicitly identifies role-based training before authorizing relevant system or controlled-information access as a security control. citeturn238555search0

---

## 2.55 Security onboarding MUST cover practical engineering behavior

Engineering security training SHOULD include applicable:

- secrets handling;
- authentication;
- authorization;
- dependency security;
- secure coding;
- logging of sensitive data;
- vulnerability reporting;
- phishing/social engineering;
- incident reporting.

A generic annual security video SHOULD NOT be the only technical security onboarding for engineers with privileged roles.

---

## 2.56 Secret handling MUST be demonstrated

Engineers MUST know:

- where development secrets come from;
- where production secrets live;
- what MUST NOT enter source control;
- how suspected leaks are reported.

They SHOULD be shown the canonical Secrets & Key Management standard.

---

## 2.57 Production data handling MUST be explicit

Engineers working with user/customer data MUST understand:

- data classification;
- permitted environments;
- access procedures;
- retention constraints;
- logging restrictions;
- export restrictions.

Production data MUST NOT be copied into local development merely because realistic fixtures are convenient.

---

## 2.58 Data minimization MUST be taught

Development and debugging SHOULD use:

- synthetic data;
- anonymized data;
- approved representative fixtures

where possible.

If production data access is required, the reason and controls MUST follow the Data & Database and Security standards.

---

## 2.59 Tenant boundaries MUST be included in relevant onboarding

Engineers working on multi-tenant systems MUST understand:

- tenant identifiers;
- authorization boundaries;
- row/object isolation;
- cache isolation;
- logging implications.

Cross-tenant data leakage MUST be described as a Security defect, not merely a data bug.

---

# 2.60 Framework and product standards MUST be taught contextually

Engineers SHOULD be introduced to relevant corpus standards while performing related work.

Examples:

- API standards while modifying an endpoint;
- Forms & Validation while creating input flows;
- Accessibility while implementing UI;
- State Management while introducing shared state;
- Data & Database while changing persistence.

A new engineer SHOULD NOT be required to memorize the entire standards corpus before making any contribution.

---

## 2.61 Frontend engineers MUST be introduced to the component baseline

Engineers working on product UI MUST be shown that shadcn/ui is the canonical component baseline.

They SHOULD understand:

- where shared components live;
- Design Token usage;
- component extension policy;
- accessibility requirements;
- when new primitives require design-system review.

They MUST NOT create a parallel component system because onboarding failed to reveal the canonical one.

---

## 2.62 Accessibility MUST be part of engineering onboarding

Engineers whose work affects user interfaces MUST receive role-appropriate accessibility orientation.

This SHOULD include:

- semantic HTML;
- keyboard operation;
- accessible naming;
- focus;
- contrast;
- reduced motion;
- testing expectations.

Accessibility MUST NOT be presented solely as a specialist team's responsibility.

---

# 2.63 Documentation reading MUST be prioritized

The onboarding plan SHOULD distinguish:

- essential now;
- useful soon;
- reference later.

A checklist containing hundreds of equally weighted documents MUST NOT be treated as effective onboarding.

---

## 2.64 Meetings MUST have onboarding value

Introductory meetings SHOULD help the engineer understand:

- collaborators;
- ownership;
- dependencies;
- decision paths.

The engineer SHOULD NOT spend the first week in consecutive introductions that provide little operational context.

---

## 2.65 Team topology MUST be explained

The engineer SHOULD understand:

- who owns the current system;
- upstream/downstream teams;
- platform dependencies;
- specialist review contacts;
- product/design partners.

An organization chart alone is insufficient.

---

# 2.66 Remote onboarding MUST be documentation-capable

Remote engineers MUST receive the same technical readiness as colocated engineers.

Critical onboarding knowledge MUST NOT exist only through:

- hallway conversations;
- office proximity;
- informal desk-side help.

Asynchronous documentation SHOULD allow meaningful progress across time zones. Public remote-engineering onboarding guidance such as GitLab's explicitly relies on documented, asynchronous workflows for this purpose. citeturn970917search8

---

## 2.67 Recordings MUST NOT replace durable documentation

Recorded walkthroughs MAY supplement onboarding.

They SHOULD NOT become the only documentation for:

- environment setup;
- architecture;
- production procedures;
- access.

Recorded material becomes difficult to search and can silently become stale.

---

# 2.68 Onboarding MUST support accessibility needs

Onboarding materials and tools MUST follow Accessibility standards.

Required learning materials MUST provide appropriate alternatives to:

- inaccessible video;
- image-only diagrams;
- audio-only instruction;
- pointer-only interactions.

Necessary accommodations MUST NOT be treated as evidence of slower engineering capability.

---

## 2.69 Architecture diagrams MUST have textual equivalents where required

Important architecture information MUST remain understandable without relying exclusively on visual layout or colour.

Relevant diagrams SHOULD have:

- labels;
- accessible descriptions;
- accompanying textual system flow.

---

# 2.70 Ramp-up health MUST be measured

Teams SHOULD measure onboarding as a system.

Relevant indicators MAY include:

- environment setup success;
- access-provisioning delay;
- first successful test run;
- first meaningful PR;
- first independent scoped task;
- onboarding blockers;
- documentation defects;
- mentor engagement;
- engineer-reported clarity/confidence.

No single metric SHOULD represent onboarding health.

---

## 2.71 Time-to-first-PR MUST NOT be the primary success metric

Time to first PR or commit MAY indicate workflow accessibility.

It does not establish:

- system understanding;
- code quality;
- independence;
- security readiness.

Teams MUST NOT optimize the onboarding program solely to minimize this number.

---

## 2.72 Ramp-up MUST be measured against role readiness

The team SHOULD define observable role-readiness capabilities.

Examples include:

- frontend engineer can implement and test a standard component change;
- backend engineer can trace and modify a request flow;
- data engineer can safely change a pipeline;
- SRE can diagnose a representative service alert with support.

These are more useful than generic statements such as:

`fully productive`.

---

## 2.73 Ramp-up metrics MUST NOT be used as crude performance ranking

Onboarding data SHOULD primarily improve:

- documentation;
- tooling;
- access;
- mentoring;
- role preparation.

Differences in ramp-up time MUST be interpreted in context.

They MUST NOT automatically become individual performance scores.

---

## 2.74 Blocked time MUST be attributed correctly

Ramp-up analysis SHOULD distinguish between:

- learning time;
- provisioning delay;
- broken tooling;
- unavailable reviewer;
- unclear requirements;
- personal scheduling constraints.

Organizational delay MUST NOT be attributed to engineer capability.

---

## 2.75 New-hire feedback MUST be collected while fresh

Teams SHOULD collect onboarding feedback at meaningful checkpoints, such as:

- end of first week;
- end of first month;
- end of formal ramp-up.

Feedback SHOULD ask about:

- unclear documentation;
- missing access;
- unnecessary meetings;
- tooling friction;
- architecture understanding;
- mentor availability.

---

## 2.76 Onboarding feedback MUST produce remediation

Repeated onboarding defects SHOULD enter the normal engineering improvement backlog.

Each recurring material issue SHOULD have:

- owner;
- remediation;
- prioritization.

Collecting onboarding feedback without acting on recurring defects is insufficient.

---

## 2.77 Documentation defects SHOULD be fixed close to discovery

Small documentation corrections SHOULD be made during onboarding where practical.

Larger issues SHOULD be recorded immediately.

The engineer SHOULD NOT be expected to remember every documentation defect until the end of onboarding.

---

## 2.78 Onboarding quality SHOULD be reviewed periodically

Engineering leadership SHOULD periodically review:

- setup friction;
- access delays;
- recurring blockers;
- first-task quality;
- security-training completion;
- mentor effectiveness;
- documentation health.

Material organizational or architecture changes SHOULD trigger review of onboarding material.

---

# 2.79 Completion MUST be capability-based

Formal onboarding completion SHOULD indicate that the engineer can perform expected baseline work safely and knows where to obtain further information.

Completion MUST NOT imply that:

- every subsystem is known;
- no mentoring is needed;
- domain learning is finished.

Engineering learning continues after formal onboarding.

---

## 2.80 On-call onboarding MUST have a separate readiness gate

Joining an on-call rotation SHOULD require explicit operational readiness.

The engineer SHOULD demonstrate familiarity with:

- alerts;
- dashboards;
- incidents;
- escalation;
- service recovery;
- runbooks.

Completion of general engineering onboarding MUST NOT automatically imply on-call readiness.

---

## 2.81 Production write access SHOULD have a separate readiness gate

Production mutation privileges SHOULD require:

- business need;
- relevant security/data training;
- operational understanding;
- approved access.

General repository write access MUST NOT automatically grant broad production write access.

---

# 2.82 Internal transfers MAY use abbreviated onboarding

An engineer transferring internally MAY skip company-wide material they already know.

They MUST still receive onboarding for materially new:

- domain;
- architecture;
- data;
- security boundary;
- operational process.

Familiarity with the organization MUST NOT be confused with familiarity with the system.

---

## 2.83 Contractors MUST meet equivalent technical controls

Contractors and temporary engineers MUST receive enough onboarding to operate safely within their scope.

They MUST NOT receive broader access merely because their engagement is short.

Their access SHOULD have appropriate expiration aligned to engagement duration.

---

# 2.84 Onboarding workflow SHOULD be represented explicitly

A digital onboarding plan SHOULD make it possible to determine:

- required task;
- owner;
- completion state;
- blocked state;
- optional material.

The workflow MUST NOT expose sensitive administrative information to users without appropriate permission.

---

## 2.85 shadcn/ui MUST be the administrative component baseline

Where onboarding is represented through an internal application, shadcn/ui SHOULD provide the component baseline.

Preferred mappings include:

| Concern | Baseline |
|---|---|
| Onboarding overview | `Card` |
| Task/checklist state | `Checkbox`, `Table` |
| Progress | `Progress` |
| Status | `Badge` |
| Blocker/warning | `Alert` |
| Resource search | `Command`, `Input` |
| Role selection | `Select` |
| Access request | canonical `Form` controls |
| Additional guidance | `Accordion`, `Collapsible` |
| Detailed task | `Sheet`, dedicated page |
| Privileged confirmation | `AlertDialog` |
| Loading | `Skeleton` |

The onboarding application MUST NOT become a second source of technical truth where canonical documentation already exists.

It SHOULD link to authoritative documents.

---

## 2.86 Progress UI MUST NOT imply false equivalence

Completing 80% of checklist items does not necessarily mean an engineer is 80% production-ready.

Progress indicators SHOULD represent checklist completion only.

Capability/readiness MUST be assessed separately.

---

## 2.87 Onboarding status MUST NOT rely on colour alone

States such as:

- Complete;
- Blocked;
- In progress;
- Needs access

MUST use textual or another non-colour indication.

The interface MUST follow Accessibility and Design Token standards.

---

## 2.88 Sensitive onboarding data MUST be protected

Onboarding tools MAY contain:

- identity details;
- access status;
- manager information;
- security-training state.

Access MUST follow Security and privacy requirements.

A team member MUST NOT be able to inspect unrelated employees' sensitive access state without an appropriate role.

---

# 3. Anti-patterns

The following are non-conforming unless an exceptional documented requirement provides a stronger justification.

## 3.1 Expectations

- `Hit the ground running` as the onboarding plan.
- Expecting significant production output on day one.
- Evaluating engineers against unstated first-month expectations.
- Same onboarding path for every engineering role.
- Calling onboarding complete when administrative paperwork is finished.

## 3.2 Environment setup

- Setup instructions that work only on one engineer's laptop.
- Multi-day manual setup with no owner.
- Undocumented shell commands copied through chat.
- Production credentials required for local development.
- `.env.example` containing real secrets.
- No deterministic setup verification.

## 3.3 Access

- Giving every senior engineer production admin.
- Shared production credentials.
- Access granted individually with no role model.
- Access requests blocked for days without visibility.
- Giving production data access before required training.
- Temporary elevated access becoming permanent.
- Judging onboarding speed while access is organizationally blocked.

## 3.4 Documentation

- Hundreds of onboarding links with equal priority.
- Architecture available only through recorded meetings.
- No indication which documentation is authoritative.
- Broken setup documentation known to every existing engineer but never fixed.
- New hires told to `ask someone` for every undocumented process.

## 3.5 Architecture

- Telling a new engineer to read the entire repository without a map.
- Architecture diagram with no owner or current-state confidence.
- No walkthrough of an end-to-end request/data flow.
- Expecting engineers to infer domain terminology.
- Requiring every historical ADR to be read before coding.

## 3.6 First tasks

- Typo PR presented as complete technical onboarding.
- First task is a major architectural rewrite.
- First task is an unowned legacy bug nobody understands.
- First task has no acceptance criteria.
- First contribution bypasses the team's normal testing or review workflow.
- Time to first PR used as the primary performance indicator.

## 3.7 Mentoring

- Buddy assigned but never told what the role means.
- New engineer discouraged from asking basic questions.
- Pairing where the senior engineer takes over and completes the work.
- Onboarding dependent on one unavailable expert.
- Mentor support removed immediately after first merge.

## 3.8 Security

- Annual generic security video as the only engineer security training.
- Production access before role-specific data/security orientation.
- Production data copied locally for convenience.
- Secrets shared in chat during setup.
- Multi-tenant engineer unaware of tenant-isolation model.
- Security reporting path not explained.

## 3.9 Operations

- Engineer added to on-call during the first week without training.
- Production deployment learned through accidental button click.
- No introduction to dashboards, logs, or alerts.
- Incident process discovered only during the first incident.
- General onboarding completion automatically granting production write privileges.

## 3.10 Ramp-up measurement

- Ranking engineers by time to first commit.
- Measuring only checklist completion.
- Counting access delays as learning time.
- Setting a universal `fully productive in 30 days` requirement regardless of role.
- Collecting onboarding surveys but never fixing recurring problems.
- Using onboarding metrics primarily as individual performance surveillance.

## 3.11 Accessibility

- Required onboarding videos without appropriate alternatives.
- Architecture diagrams dependent solely on colour.
- Pointer-only onboarding application.
- Progress state available only visually.
- Accommodation needs treated as onboarding failure.

## 3.12 Governance

- Onboarding documentation has no owner.
- Every team invents completely unrelated access/setup processes.
- Organization changes toolchain but leaves onboarding unchanged.
- Contractors given unrestricted access because temporary provisioning is inconvenient.
- Internal transfers assumed to need no onboarding.

---

# 4. Checklist

## 4.1 Ownership and planning

- [ ] Onboarding owner is identified.
- [ ] Technical mentor/buddy is identified.
- [ ] Role-specific onboarding plan exists.
- [ ] First-day/week/month expectations are explicit.
- [ ] First meaningful task is identified before or early in onboarding.
- [ ] Expected specialist training is known.

## 4.2 Pre-start and first day

- [ ] Device process is ready.
- [ ] Primary identity can be activated.
- [ ] Core engineering access is requested or provisioned.
- [ ] Team communication is accessible.
- [ ] Onboarding plan is discoverable.
- [ ] Help and escalation paths are known.
- [ ] First day prioritizes orientation rather than output.

## 4.3 Environment

- [ ] Setup documentation begins from a documented baseline.
- [ ] Runtime/tool versions are defined.
- [ ] Setup is automated where practical.
- [ ] Safe development credentials exist.
- [ ] Production secrets are not required.
- [ ] Setup has deterministic verification.
- [ ] Common failures have remediation.
- [ ] Setup duration is monitored.

## 4.4 Access

- [ ] Access uses role/group policy where practical.
- [ ] Least privilege is enforced.
- [ ] MFA/device requirements are complete.
- [ ] Privileged access is progressive.
- [ ] Access request purpose is explicit.
- [ ] Temporary permissions expire where possible.
- [ ] Blocked access is visible.
- [ ] Provisioning delay is measured independently from engineer ramp-up.

## 4.5 Codebase and architecture

- [ ] Repository tour is complete.
- [ ] Major components are understood at a high level.
- [ ] Architecture map exists.
- [ ] Representative end-to-end flow has been explained.
- [ ] Domain glossary is available.
- [ ] Relevant ADRs are discoverable.
- [ ] Ownership boundaries are understood.
- [ ] Source-of-truth documentation locations are known.

## 4.6 Engineering workflow

- [ ] Relevant tests can be run.
- [ ] Code-review expectations are understood.
- [ ] CI pipeline has been explained.
- [ ] Merge policy is understood.
- [ ] Deployment flow is understood before independent deployment.
- [ ] Logs/metrics/traces are discoverable.
- [ ] Rollback/escalation paths are known where applicable.

## 4.7 First task

- [ ] Task is real and useful.
- [ ] Scope is bounded.
- [ ] Risk is appropriate.
- [ ] Acceptance criteria are clear.
- [ ] Reviewer is known.
- [ ] Task exercises normal engineering workflow.
- [ ] Success is not judged solely by completion speed.

## 4.8 Mentoring

- [ ] Buddy/mentor responsibilities are defined.
- [ ] Early pairing opportunities exist.
- [ ] Engineer knows how to request help.
- [ ] Async support exists.
- [ ] Pairing teaches navigation and reasoning.
- [ ] Mentor availability is reviewed during ramp-up.

## 4.9 Security and data

- [ ] Baseline security training is completed.
- [ ] Role-based training is complete before sensitive duties where required.
- [ ] Secrets handling is understood.
- [ ] Security incident reporting path is known.
- [ ] Data classification is understood.
- [ ] Production data usage restrictions are understood.
- [ ] Tenant-isolation requirements are understood where applicable.
- [ ] Development uses appropriate safe/synthetic data where practical.

## 4.10 Standards

- [ ] Relevant Security standards are discoverable.
- [ ] Data & Database conventions are understood.
- [ ] API conventions are understood where applicable.
- [ ] State Management conventions are introduced where applicable.
- [ ] Forms & Validation standards are understood for UI/input work.
- [ ] Accessibility expectations are introduced.
- [ ] Design Tokens and shadcn/ui baseline are understood by frontend engineers.
- [ ] ADR process is discoverable.

## 4.11 First month

- [ ] Engineer can perform ordinary scoped work with decreasing assistance.
- [ ] Engineer can navigate relevant architecture independently.
- [ ] Engineer can identify appropriate reviewers.
- [ ] Engineer understands normal operational ownership.
- [ ] Engineer can distinguish authoritative documentation.
- [ ] Remaining learning areas are explicit rather than hidden.

## 4.12 Operations readiness

- [ ] On-call readiness is assessed separately.
- [ ] Production write access has separate approval where appropriate.
- [ ] Incident process is understood before independent operational duty.
- [ ] Runbooks and dashboards have been exercised where applicable.

## 4.13 Accessibility

- [ ] Onboarding tools are keyboard operable.
- [ ] Required multimedia has appropriate accessible alternatives.
- [ ] Architecture information is not colour-only.
- [ ] Progress and blocker states are semantically exposed.
- [ ] Accessibility needs do not count as reduced technical readiness.

## 4.14 Ramp-up health

- [ ] Environment-setup friction is measured.
- [ ] Access delays are measured.
- [ ] First meaningful contribution is tracked appropriately.
- [ ] Repeated onboarding blockers are identified.
- [ ] New-engineer feedback is collected.
- [ ] Feedback leads to owned remediation.
- [ ] No single ramp-up metric is used as the health score.
- [ ] Organizational blockers are distinguished from engineer learning.

## 4.15 Onboarding tooling

- [ ] shadcn/ui is the application component baseline.
- [ ] Checklist progress is distinct from capability readiness.
- [ ] Status does not rely on colour.
- [ ] Access information follows least privilege.
- [ ] Onboarding portal links to canonical documentation rather than duplicating it.
- [ ] Sensitive employee/access data is appropriately authorized.

## 4.16 Corpus alignment

- [ ] Security governs identity, access, secrets, and production privileges.
- [ ] Data & Database governs production-data handling.
- [ ] API standards are taught for API-owning roles.
- [ ] State Management patterns are introduced contextually.
- [ ] Forms & Validation governs engineering work involving inputs.
- [ ] Accessibility is part of engineering readiness.
- [ ] Design Tokens and shadcn/ui govern product UI work.
- [ ] ADRs provide architectural history.
- [ ] Configuration & Environment standards govern reproducible setup.
- [ ] Documentation is the durable source of onboarding knowledge.

---

# 5. Canonical summary

A Gold Standard 2026 engineering onboarding program MUST optimize for **safe independent capability**, not immediate visible output.

The onboarding experience MUST have an accountable owner, a role-appropriate plan, an available technical mentor or buddy, and explicit first-day, first-week, and first-month expectations.

The **first day** SHOULD establish identity, core tools, communication, support paths, and initial environment readiness.

The **first week** SHOULD establish reproducible development capability, basic architectural understanding, testing and review familiarity, and a first bounded hands-on contribution.

The **first month** SHOULD move the engineer toward independent ordinary work within a defined ownership area while maintaining appropriate review and mentoring. These timelines are corpus expectations, not universal measures of individual performance.

Developer environments MUST be reproducible. Setup MUST start from a documented baseline, use safe development credentials, and end in a deterministic verification step. Production secrets MUST NOT be required for routine local development.

Access provisioning MUST follow least privilege. Baseline role access SHOULD be prepared early, while privileged production, database, secret, and infrastructure access SHOULD be granted progressively according to role need and readiness. NIST's least-privilege guidance similarly requires limiting users and processes to access required for assigned tasks. citeturn238555search0

Every engineer MUST receive a navigable codebase and architecture orientation. Material systems SHOULD provide a current high-level architecture map, relevant ownership boundaries, important ADRs, and at least one representative end-to-end system flow.

The first meaningful task SHOULD be useful, bounded, low-risk, testable, and representative of the team's ordinary development workflow. A trivial typo may validate the contribution mechanism but SHOULD NOT substitute for meaningful technical onboarding.

Pairing and mentoring SHOULD be strongest during early ramp-up and decrease as independence grows. Mentoring MUST teach how to navigate, diagnose, find authoritative information, and make decisions—not create dependency on a senior engineer.

Security and privacy learning MUST be part of engineering onboarding. NIST's current training guidance treats security learning as a lifecycle practice and requires initial and role-specific training appropriate to assigned responsibilities. citeturn238555search0turn238555search6

Engineers handling sensitive systems MUST understand secrets, data classification, production-data rules, tenant isolation, incident reporting, and role-specific security responsibilities before independent sensitive work.

Onboarding MUST introduce canonical engineering standards contextually. Engineers SHOULD learn API, State Management, Data & Database, Forms & Validation, Accessibility, Design Tokens, Components, Patterns, and ADR requirements as those concerns become relevant rather than being expected to memorize the entire corpus upfront.

Frontend engineers MUST know that shadcn/ui is the canonical component baseline and where shared Design Tokens, accessibility requirements, and component-extension rules are defined.

Onboarding documentation MUST be authoritative, executable, searchable, and maintainable. New engineers SHOULD be treated as valuable testers of developer documentation, and repeated onboarding friction MUST become an engineering-system improvement item. Public engineering onboarding practices such as GitLab's similarly use documented, asynchronous workflows and early hands-on tool use to make onboarding reproducible and expose documentation gaps. citeturn970917search0turn970917search8

Ramp-up health MUST be measured using multiple signals. Useful indicators include environment setup, access delays, meaningful first contribution, independent task completion, recurring blockers, documentation failures, and engineer-reported clarity. **Time to first PR MUST NOT become the sole onboarding success metric or an uncontextualized individual performance score.**

On-call duty and privileged production mutation SHOULD each have separate readiness gates rather than being assumed from completion of general onboarding.

shadcn/ui is the canonical baseline for onboarding-management interfaces. Checklist completion, access state, blockers, progress, and readiness MUST remain accessible, authorized, and semantically distinct.

**Canonical rule:** engineering onboarding is conforming only when a new engineer can safely build, test, navigate, change, review, and increasingly operate the systems within their role; can find authoritative architecture and standards without depending on tribal knowledge; and when recurring onboarding friction is treated as a defect in the engineering system rather than a weakness of the person encountering it.
