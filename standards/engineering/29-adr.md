---
id: "adr"
title: "Architecture Decision Records"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "adr", "architecture", "decision", "records"]
applies_to: ["team"]
related: ["code-review"]
legacy_number: 86
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 53118
provenance: baseline

---

The canonical standard should keep ADRs **immutable as historical records but mutable in lifecycle metadata**: an accepted decision is not rewritten when the architecture changes; a new ADR supersedes it. The minimum body remains Context → Decision → Consequences → Alternatives, with decision drivers and verification added where useful.

# Architecture Decision Record (ADR) Guidelines — Gold Standard 2026

**Canonical placement:** Architecture → ADR → Documentation → Governance  
**Status:** Gold Standard 2026  
**Canonical format:** Markdown stored with the architecture or codebase it governs  
**Component baseline:** shadcn/ui for ADR catalogs, review, status, search, and governance interfaces  
**Core principle:** significant architectural decisions MUST be recorded close to the systems they govern, with enough context and trade-off analysis for a future maintainer to understand why the decision was made

---

# 1. Purpose

## 1.1 Scope

This standard defines the canonical requirements for creating, reviewing, approving, storing, superseding, discovering, and maintaining Architecture Decision Records.

It covers:

- when an ADR is required;
- when an ADR is unnecessary;
- ADR structure and template;
- context and decision drivers;
- alternatives;
- decisions;
- consequences;
- numbering;
- naming;
- status values;
- lifecycle;
- superseding and deprecation;
- ownership;
- technical review;
- security and domain review;
- storage;
- discoverability;
- indexing;
- links to code, issues, pull requests, and related ADRs;
- implementation confirmation;
- retroactive ADRs;
- migration of legacy architectural decisions.

This standard applies to architectural decisions affecting:

- applications;
- services;
- data systems;
- APIs;
- infrastructure;
- security;
- state management;
- design systems;
- integrations;
- observability;
- deployment;
- analytics;
- AI/LLM systems;
- shared engineering platforms.

---

## 1.2 Design objective

An ADR MUST answer:

1. **What problem or architectural concern existed?**
2. **What constraints and decision drivers mattered?**
3. **What options were seriously considered?**
4. **What was decided?**
5. **Why was that option selected?**
6. **What consequences and trade-offs were accepted?**
7. **What replaces this decision if it is no longer current?**

An ADR MUST preserve the rationale behind a decision, not merely its resulting implementation.

Code can usually answer:

> “What does the system do?”

An ADR SHOULD answer:

> “Why is the system designed this way?”

The current MADR template similarly centers context, decision drivers, considered options, outcome, consequences, and confirmation, while the original Nygard ADR form centers title, status, context, decision, and consequences. citeturn558812search0turn558812search4

---

## 1.3 ADRs are decision records, not general documentation

An ADR MUST describe a decision.

An ADR MUST NOT become:

- a system overview;
- meeting minutes;
- an implementation runbook;
- an API reference;
- a project plan;
- a requirements document;
- a backlog;
- a design specification containing every implementation detail.

Those documents MAY be linked from the ADR.

The ADR SHOULD remain concise enough that the decision and rationale can be understood without reading an entire project history.

---

## 1.4 ADRs are historical records

Once an ADR reaches **Accepted** status, its historical decision content SHOULD normally remain immutable.

If the decision later changes, a new ADR SHOULD:

- record the new context;
- make the new decision;
- identify the earlier ADR;
- supersede it.

An Accepted ADR MUST NOT be silently rewritten to make an old decision appear as though the current architecture had always been intended.

Corrections to:

- spelling;
- broken links;
- factual metadata;
- formatting

MAY be made without a superseding ADR when they do not change the decision or its historical rationale.

---

## 1.5 Relationship to other standards

ADR practice MUST align with corpus standards for:

- **Security** — security-significant architecture requires appropriate security review;
- **Data & Database** — major persistence, schema, consistency, warehouse, and data-lifecycle decisions;
- **API** — protocol, versioning, compatibility, integration, and contract architecture;
- **State Management** — major state ownership and synchronization choices;
- **Forms & Validation** — system-wide validation or workflow architecture where significant;
- **Accessibility** — architectural decisions affecting interaction accessibility or assistive technology;
- **Design Tokens** — design-system architecture where architectural rather than purely stylistic;
- **Components** — component-system boundaries and shared implementation strategy;
- **Patterns** — cross-product interaction or engineering patterns;
- **Infrastructure** — hosting, compute, networking, observability, deployment, resilience.

An ADR does not replace compliance with these standards.

If an ADR deliberately deviates from a canonical corpus rule, the ADR MUST:

- identify the deviation;
- state why it is necessary;
- identify its scope;
- record approval from the appropriate authority.

---

# 2. Rules

## 2.1 An ADR MUST be created for architecturally significant decisions

An ADR MUST be created when a decision materially affects one or more of:

- system structure;
- service boundaries;
- deployment topology;
- persistence model;
- data ownership;
- integration contracts;
- security boundaries;
- availability or resilience;
- consistency guarantees;
- scalability characteristics;
- technology platform;
- long-term operational burden;
- significant cost structure;
- organization-wide developer experience;
- cross-team compatibility.

The threshold is architectural significance, not implementation size.

A five-line configuration change MAY require an ADR if it establishes a durable security or platform policy.

A thousand-line feature MAY require no ADR if it merely follows existing architecture.

---

## 2.2 Architectural significance SHOULD be judged by reversibility and reach

A decision SHOULD require an ADR when several of the following are true:

- expensive to reverse;
- difficult to migrate away from;
- affects multiple teams;
- affects multiple services;
- establishes a precedent;
- introduces a strategic dependency;
- changes a public or durable contract;
- changes security boundaries;
- affects regulated data;
- changes failure modes;
- materially affects cost;
- is likely to be questioned later.

A decision with low implementation cost but high lock-in SHOULD still be documented.

---

## 2.3 ADRs MUST be used for major technology adoption

An ADR MUST normally be created before adopting a major new:

- database technology;
- message broker;
- cloud service class;
- framework;
- runtime;
- language for production systems;
- authentication architecture;
- API style;
- eventing platform;
- infrastructure platform;
- analytical platform;
- AI/LLM provider or serving architecture

when the adoption creates a durable architectural dependency.

Adding an ordinary package within an already-approved stack normally does not require an ADR.

---

## 2.4 Security-significant decisions MUST have an ADR

Decisions materially affecting:

- authentication;
- authorization;
- encryption;
- secrets;
- tenant isolation;
- trust boundaries;
- sensitive-data handling;
- network exposure;
- security logging;
- key custody

MUST be documented through an ADR or an equivalent governed security decision record linked into the ADR system.

Security review MUST NOT depend solely on comments in implementation code.

---

## 2.5 Data architecture decisions MUST have an ADR when durable

An ADR SHOULD be created for decisions such as:

- database selection;
- data ownership boundary;
- replication strategy;
- consistency model;
- event sourcing;
- partitioning architecture;
- multi-region data strategy;
- warehouse/lakehouse architecture;
- schema-management strategy;
- significant retention architecture.

Routine table design normally does not require an ADR unless it establishes a reusable architectural pattern or unusually consequential constraint.

---

## 2.6 API architecture decisions MUST have an ADR when cross-cutting

Examples include:

- REST versus GraphQL versus RPC;
- synchronous versus event-driven integration;
- organization-wide versioning strategy;
- gateway architecture;
- public API authentication;
- event envelope standards;
- compatibility rules.

An individual endpoint normally does not require an ADR if it follows an already-governed API architecture.

---

## 2.7 Infrastructure decisions MUST be recorded when they establish platform direction

Examples include:

- Kubernetes adoption;
- serverless architecture;
- single-region versus multi-region;
- infrastructure-as-code technology;
- service-mesh adoption;
- observability platform;
- CDN architecture;
- deployment strategy.

Routine capacity adjustment SHOULD NOT require an ADR unless it changes the architecture.

---

## 2.8 An ADR SHOULD NOT be required for every technical choice

ADRs MUST NOT become mandatory for ordinary implementation choices such as:

- local variable names;
- routine library upgrades;
- minor refactoring;
- CSS changes;
- ordinary query optimization;
- individual UI component selection already covered by standards;
- reversible feature implementation detail.

Excessive ADR requirements create noise and reduce the discoverability of genuinely important decisions.

---

## 2.9 Existing standards SHOULD prevent repetitive ADRs

A team SHOULD NOT write an ADR merely to repeat an existing accepted:

- architecture standard;
- platform standard;
- security standard;
- corpus guideline.

Implementation SHOULD link to the existing governing decision or standard instead.

A new ADR becomes appropriate when:

- applying the standard requires a significant interpretation;
- an exception is required;
- the standard does not cover the decision.

---

## 2.10 ADRs SHOULD be written before implementation commitment

An ADR SHOULD normally be drafted while alternatives remain genuinely open.

The preferred lifecycle is:

**problem → options → review → decision → implementation**

rather than:

**implementation → justification**

Writing the ADR early helps make assumptions and trade-offs reviewable before sunk cost determines the answer.

---

## 2.11 Investigation MAY precede the ADR

Proofs of concept, spikes, benchmarks, or research MAY occur before the decision.

Evidence SHOULD be linked from the ADR.

Experimental implementation MUST NOT be represented as an accepted architectural decision merely because it already exists.

---

## 2.12 The canonical ADR template MUST be used

Every ADR MUST contain the following sections:

1. **Context**
2. **Decision**
3. **Consequences**
4. **Alternatives Considered**

Additional sections MAY be included when useful.

This keeps the corpus compatible with the core Nygard ADR model while retaining the trade-off analysis emphasized by MADR. citeturn558812search0turn558812search4

---

## 2.13 ADR metadata MUST be explicit

Each ADR MUST contain metadata identifying at minimum:

- ADR number;
- title;
- status;
- decision date or last decision-state date;
- owner.

Recommended metadata also includes:

- decision makers;
- reviewers;
- consulted stakeholders;
- affected systems;
- related issues;
- related pull requests;
- supersedes;
- superseded by;
- tags/categories.

MADR likewise supports explicit status and decision-participant metadata, including decision makers, consulted stakeholders, and informed stakeholders. citeturn558812search2turn558812search5

---

## 2.14 ADR titles MUST describe the decision

Titles SHOULD be short and outcome-oriented.

Prefer:

- `Use PostgreSQL for transactional persistence`
- `Adopt event-driven order integration`
- `Use OIDC for workforce authentication`

Avoid:

- `Database`
- `Architecture discussion`
- `Decision about auth`
- `ADR for project X`

The title SHOULD remain understandable in an ADR index without opening the document.

---

## 2.15 Context MUST explain the problem before the solution

The **Context** section MUST explain:

- current situation;
- problem or concern;
- relevant constraints;
- why a decision is necessary.

Context SHOULD include important forces such as:

- scale;
- reliability;
- compliance;
- latency;
- security;
- organizational capability;
- migration constraints;
- cost.

The Context MUST NOT be written as a disguised justification for a predetermined solution.

---

## 2.16 Decision drivers SHOULD be explicit

Important ADRs SHOULD include a **Decision Drivers** subsection.

Decision drivers MAY include:

- latency;
- availability;
- consistency;
- security;
- time to market;
- portability;
- operability;
- cost;
- team expertise;
- vendor independence;
- regulatory requirements.

MADR includes decision drivers specifically to make the forces shaping a decision explicit. citeturn558812search0

---

## 2.17 Decision drivers MUST be prioritized when they conflict

If trade-offs depend on priorities, those priorities SHOULD be stated.

For example:

> Availability and recoverability are more important than minimizing infrastructure cost for this workload.

An ADR MUST NOT pretend that every option can maximize every architectural quality simultaneously.

---

## 2.18 The Decision section MUST be unambiguous

The **Decision** section MUST state what has been chosen.

It SHOULD begin with direct language such as:

> We will use PostgreSQL as the system of record for transactional order data.

Avoid:

- vague future possibility;
- extensive discussion before the actual decision;
- language that leaves multiple incompatible options apparently selected.

A reader SHOULD be able to determine the decision without reading the full alternatives analysis.

---

## 2.19 The decision MUST state scope

The ADR MUST define what the decision applies to.

Scope MAY be:

- organization-wide;
- product-wide;
- service-specific;
- environment-specific;
- temporary during a migration.

An ADR stating merely:

> We use Redis.

is incomplete unless the relevant scope is clear.

---

## 2.20 Consequences MUST include trade-offs

The **Consequences** section MUST describe important positive and negative effects.

Consequences SHOULD include where relevant:

- complexity;
- operational burden;
- cost;
- performance;
- security;
- reliability;
- portability;
- migration impact;
- team capability;
- vendor dependency.

A decision with only positive consequences documented is usually incomplete.

MADR deliberately combines positive and negative outcomes in a consequences section to capture both benefits and downsides of the selected option. citeturn558812search9

---

## 2.21 Known risks MUST NOT be hidden

A known architectural downside MUST be recorded even if it makes the chosen option appear less attractive.

ADR review is not a sales exercise.

Accepted trade-offs are often the most valuable information for future maintainers.

---

## 2.22 Alternatives MUST represent genuine choices

The **Alternatives Considered** section MUST list the serious options evaluated.

For significant decisions, each serious alternative SHOULD include:

- brief description;
- advantages;
- disadvantages;
- reason it was not selected.

MADR's current template similarly treats considered options and their pros/cons as central to understanding why the selected architecture was chosen. citeturn558812search0turn558812search4

---

## 2.23 “Do nothing” SHOULD be considered when legitimate

Where preserving the current architecture is a realistic choice, the ADR SHOULD consider:

- status quo;
- defer decision;
- incremental improvement

as legitimate alternatives.

A decision record MUST NOT manufacture artificial alternatives merely to make the chosen answer appear superior.

---

## 2.24 Rejected alternatives SHOULD be preserved

Rejected alternatives SHOULD remain in the accepted ADR.

They help future readers understand why seemingly obvious options were not selected.

A new context MAY justify reconsidering a previously rejected alternative.

---

## 2.25 Evidence SHOULD be linked, not duplicated

ADRs MAY reference:

- benchmarks;
- prototypes;
- threat models;
- diagrams;
- RFCs;
- incident reports;
- vendor evaluations.

Large evidence artifacts SHOULD be linked rather than copied wholesale into the ADR.

The ADR itself MUST retain enough rationale to remain understandable if secondary material moves or disappears.

---

## 2.26 Implementation confirmation SHOULD be defined

Significant ADRs SHOULD state how conformance with the decision will be confirmed.

Confirmation MAY include:

- architecture review;
- automated test;
- policy-as-code;
- repository check;
- deployment validation;
- observability signal.

MADR includes a dedicated Confirmation concept for describing how the implementation can be shown to conform to the decision. citeturn558812search0

---

## 2.27 ADRs MUST have stable identifiers

Each ADR MUST receive a stable identifier.

The canonical format is:

`ADR-NNNN`

Examples:

- `ADR-0001`
- `ADR-0042`
- `ADR-0217`

Four digits SHOULD be used initially to preserve lexical ordering.

The identifier MUST NOT change because:

- the title changes;
- the ADR moves directories;
- another ADR is deleted.

---

## 2.28 ADR numbers MUST NOT be reused

Once allocated, an ADR number MUST never identify another decision.

A rejected, withdrawn, deprecated, or superseded ADR retains its number permanently.

Deleting an ADR MUST NOT create a reusable numbering gap.

---

## 2.29 Number gaps are acceptable

Sequential numbering SHOULD improve:

- stable references;
- browsing;
- discussion.

Perfectly gap-free numbering is not required.

Concurrent branches MAY create gaps.

Teams MUST NOT rewrite accepted identifiers merely to make the sequence aesthetically continuous.

---

## 2.30 Canonical filenames SHOULD contain identifier and slug

Preferred form:

`NNNN-short-decision-title.md`

Example:

`0042-use-postgresql-for-orders.md`

The ADR number remains the authoritative identity.

The slug MAY change only when repository conventions require it; inbound references SHOULD be preserved where practical.

---

## 2.31 ADR status MUST use a controlled vocabulary

The canonical statuses are:

| Status | Meaning |
|---|---|
| **Proposed** | Under active review; not yet binding |
| **Accepted** | Approved and currently authoritative |
| **Rejected** | Proposal evaluated but not accepted |
| **Deprecated** | Decision remains historical but is being phased out or is no longer preferred; no single replacement may exist |
| **Superseded** | Replaced by one or more newer ADRs |
| **Withdrawn** | Proposal removed before a decision was accepted |

Feature teams MUST NOT invent equivalent variants such as:

- Final;
- Done;
- Approved-ish;
- Old;
- Cancelled

without changing this corpus standard centrally.

MADR similarly treats ADR status as explicit metadata and illustrates statuses such as proposed, rejected, accepted, deprecated, and superseded. citeturn558812search2turn558812search5

---

## 2.32 Proposed is not authoritative

A **Proposed** ADR MAY guide experimentation or discussion.

It MUST NOT be treated as final architectural policy.

Implementation MAY begin experimentally where appropriate, but durable production commitment SHOULD wait for acceptance unless urgency requires an explicit exception.

---

## 2.33 Accepted is the active decision state

An ADR becomes **Accepted** when:

- the required reviewers have completed review;
- appropriate authority has agreed;
- unresolved material objections have been addressed or documented;
- the decision is sufficiently clear to implement.

Acceptance does not necessarily mean implementation is complete.

Implementation status SHOULD be tracked separately.

---

## 2.34 Decision status and implementation status MUST remain distinct

An ADR MAY be Accepted while implementation is:

- not started;
- in progress;
- partially migrated;
- complete.

ADR status describes the architectural decision lifecycle.

It MUST NOT be overloaded to represent delivery state.

Project tracking belongs in issues, epics, or delivery systems.

---

## 2.35 Rejected ADRs SHOULD be retained

A **Rejected** ADR records that a proposed architectural direction was considered and deliberately not adopted.

Rejected ADRs SHOULD remain discoverable so teams do not repeatedly reopen the same proposal without understanding prior reasoning.

A later ADR MAY reconsider the approach if relevant context has changed.

---

## 2.36 Superseded ADRs MUST identify their replacement

When a decision is replaced:

- the old ADR MUST become **Superseded**;
- the old ADR MUST link to the replacement ADR;
- the replacement ADR MUST link back to the old ADR.

Example metadata:

`superseded_by: ADR-0084`

and:

`supersedes: ADR-0031`

MADR explicitly supports links between related decision records and status references to a superseding ADR. citeturn558812search2turn558812search7

---

## 2.37 Superseding MUST preserve historical content

The superseded ADR MUST remain available.

Its historical Context, Decision, Consequences, and Alternatives MUST NOT be rewritten to match the successor.

The replacement ADR SHOULD explain what changed in the context or requirements that made the previous decision no longer appropriate.

---

## 2.38 Deprecated is different from superseded

Use **Deprecated** when:

- the decision should no longer be chosen for new work;
- existing implementations may remain;
- migration may occur gradually;
- there is no single replacement ADR.

Use **Superseded** when another specific architectural decision replaces it.

Deprecated ADRs SHOULD state:

- recommended direction for new work;
- migration expectations where known.

---

## 2.39 Withdrawn applies before acceptance

Use **Withdrawn** when a Proposed ADR is closed because:

- the problem disappeared;
- the proposal was abandoned;
- another proposal absorbed it;
- investigation showed no decision was needed.

An Accepted ADR MUST NOT later become Withdrawn.

It MUST instead be Deprecated or Superseded as appropriate.

---

## 2.40 ADR ownership MUST be explicit

Every ADR MUST have an owner.

The owner is accountable for:

- shepherding the decision;
- arranging review;
- maintaining links/metadata;
- ensuring follow-up is represented.

The owner does not need to be the sole author or sole decision maker.

---

## 2.41 Ownership SHOULD follow architectural responsibility

The owner SHOULD normally be:

- the team owning the affected system;
- the architecture/platform owner for cross-cutting decisions;
- an explicitly designated technical lead.

An architecture governance group MUST NOT automatically become the permanent owner of every ADR.

---

## 2.42 Review scope MUST match decision scope

Reviewers MUST include appropriate expertise for material affected concerns.

Examples:

| Decision concern | Required or expected reviewer |
|---|---|
| Security boundary | Security |
| Data architecture | Data/database owner |
| Public API | API/platform owner |
| Infrastructure | Platform/SRE |
| Accessibility architecture | Accessibility/design-system owner |
| Design system | Design-system owner |
| Financially material architecture | Platform/FinOps where appropriate |
| Cross-domain architecture | Representatives of affected domains |

Not every ADR requires every specialist.

---

## 2.43 Review MUST evaluate the decision, not prose alone

Review SHOULD challenge:

- assumptions;
- trade-offs;
- omitted alternatives;
- reversibility;
- security;
- operational impact;
- compatibility;
- migration cost.

An ADR review that checks only formatting is insufficient.

---

## 2.44 Review comments SHOULD resolve before acceptance

Material unresolved objections SHOULD be:

- resolved;
- explicitly accepted as a trade-off;
- escalated to the appropriate decision authority.

Acceptance MUST NOT merely hide dissent by closing review threads without recording the architectural issue.

---

## 2.45 Decision authority MUST be understood

Teams SHOULD define who may accept ADRs at different scopes.

For example:

- service-local ADR — owning engineering team;
- platform ADR — platform technical leadership;
- organization-wide architecture ADR — architecture governance;
- security exception — designated security authority.

Authority MUST be proportionate to the decision's blast radius.

---

## 2.46 Consensus is preferred but not always required

Teams SHOULD seek informed agreement.

Unanimity MUST NOT be required if it prevents necessary architectural decisions indefinitely.

Where decision authority resolves disagreement, the ADR SHOULD preserve the significant dissenting trade-off rather than pretending consensus existed.

---

## 2.47 ADR review SHOULD be time-bounded

ADR governance MUST NOT become indefinite approval bureaucracy.

Review deadlines SHOULD reflect:

- scope;
- risk;
- urgency.

Small architecture decisions SHOULD have lightweight review.

Organization-wide irreversible decisions justify greater scrutiny.

---

## 2.48 ADRs SHOULD live with the architecture they govern

The preferred storage location is inside the relevant source repository.

Canonical default:

`docs/architecture/adr/`

or:

`docs/adr/`

Repository-local storage keeps decisions:

- version-controlled;
- code-reviewable;
- available with the implementation;
- branchable with the system.

Markdown is the preferred format because it is portable, diffable, and repository-native; MADR likewise uses Markdown as a lightweight decision-record format. citeturn558812search2turn558812search3

---

## 2.49 Cross-repository decisions MUST have a canonical home

An ADR spanning many repositories MUST have one authoritative location.

Appropriate homes include:

- central architecture repository;
- platform repository;
- governance documentation repository.

Other repositories SHOULD link to the canonical record rather than copy it.

Multiple editable copies of the same ADR MUST NOT exist.

---

## 2.50 ADRs MUST be version-controlled

ADRs MUST be stored in a system preserving:

- author;
- review history;
- modification history;
- timestamps.

A mutable wiki page with no reliable history SHOULD NOT be the sole canonical ADR record.

A documentation portal MAY render repository-backed ADRs.

---

## 2.51 ADRs MUST be discoverable without knowing the number

Repositories SHOULD provide an ADR index.

The index SHOULD expose:

- number;
- title;
- status;
- date;
- owner;
- category/domain.

Search SHOULD work by decision topic as well as ADR number.

MADR itself maintains an indexed collection of its decisions rather than relying only on filenames. citeturn558812search1

---

## 2.52 Status MUST be visible in the index

Readers MUST be able to distinguish:

- current;
- rejected;
- deprecated;
- superseded

decisions without opening every record.

A superseded decision MUST NOT appear indistinguishable from an active one in navigation.

---

## 2.53 Supersession links SHOULD be bidirectional in navigation

A user opening an old ADR SHOULD immediately discover the active replacement.

A user opening the replacement SHOULD be able to inspect the earlier reasoning.

This relationship SHOULD be surfaced in both:

- document metadata;
- rendered catalog.

---

## 2.54 ADRs MUST link relevant delivery artifacts

An ADR SHOULD link to relevant:

- issue;
- RFC;
- epic;
- pull request;
- implementation repository;
- migration plan.

These links provide traceability from:

**problem → decision → implementation**

The ADR MUST NOT merely link to an issue and omit the decision rationale itself.

---

## 2.55 Implementation code SHOULD link back to the ADR where valuable

Code SHOULD reference an ADR when a design choice is likely to appear unusual without its rationale.

Appropriate locations MAY include:

- README;
- module documentation;
- configuration comments;
- migration documentation.

Source files MUST NOT be cluttered with ADR comments for obvious implementation details.

---

## 2.56 Pull requests implementing architecture SHOULD reference the ADR

A material implementation PR SHOULD link the governing ADR.

Reviewers SHOULD be able to evaluate whether the implementation conforms to the accepted architectural direction.

An implementation that materially deviates from its ADR SHOULD trigger:

- ADR amendment before acceptance if still Proposed;
- a new/superseding ADR if the original decision is already Accepted.

---

## 2.57 ADRs SHOULD link related ADRs

Related decisions SHOULD be linked where relationships materially aid understanding.

Examples:

- depends on;
- constrained by;
- supersedes;
- extends;
- conflicts with.

MADR explicitly supports references between ADRs for follow-up and dependent decisions. citeturn558812search7

---

## 2.58 Links MUST NOT replace stable ADR identity

Discussion MAY say:

`ADR-0042`

without depending on a particular web renderer URL.

Identifiers SHOULD remain stable even if:

- docs tooling changes;
- repository hosting changes;
- documentation URLs move.

---

## 2.59 ADRs MUST NOT contain secrets

ADRs are documentation and may be broadly visible to engineers.

They MUST NOT contain:

- passwords;
- API secrets;
- private keys;
- access tokens;
- sensitive credential material.

Sensitive architecture information SHOULD follow the Security documentation classification rules.

---

## 2.60 Sensitive ADRs MAY require restricted storage

Some security or regulated architectural decisions MAY require access restriction.

Restricted ADRs MUST still have enough discoverable metadata for authorized governance processes.

Teams MUST NOT use security classification as a reason to leave critical decisions completely undocumented.

---

## 2.61 Retention MUST match system history

Accepted, Rejected, Deprecated, Superseded, and Withdrawn ADRs SHOULD normally be retained for as long as the architectural history remains relevant.

ADR cleanup MUST NOT remove records merely because they describe obsolete technology.

Historical decisions often explain:

- migration constraints;
- legacy behavior;
- recurring architectural questions.

---

## 2.62 ADRs SHOULD be concise

A routine ADR SHOULD usually be understandable in a few pages or less.

Very large decision documents SHOULD move supporting analysis into linked artifacts.

Conciseness MUST NOT remove:

- critical constraints;
- serious alternatives;
- material consequences.

MADR explicitly supports short through detailed ADR forms depending on decision complexity. citeturn558812search6

---

## 2.63 ADRs SHOULD put the decision near the top

Readers SHOULD reach the actual decision quickly.

Detailed alternatives analysis MAY follow the primary Decision and Consequences sections.

MADR likewise places the decision outcome before detailed pros/cons so the result remains easy to find while preserving deeper analysis below. citeturn558812search10

---

## 2.64 Neutral technical language SHOULD be used

ADR wording SHOULD be factual.

Avoid:

- marketing language;
- personal criticism;
- vendor advocacy unsupported by evidence;
- blame for legacy decisions.

An old decision SHOULD be evaluated according to the constraints known at the time, not only with hindsight.

---

## 2.65 Future conditions MAY be recorded

An ADR SHOULD identify reconsideration triggers when known.

Examples:

- transaction volume exceeds threshold;
- vendor product reaches end of life;
- regulatory requirement changes;
- migration dependency is removed;
- operational cost exceeds agreed limit.

These conditions SHOULD NOT be presented as automatic replacement decisions.

A new ADR is still required when the architecture changes materially.

---

## 2.66 Temporary architecture MUST have an exit condition

If the decision is intentionally temporary, the ADR SHOULD state:

- why temporary architecture is necessary;
- expected exit condition;
- owner;
- review date where useful.

“Temporary” without ownership or an exit trigger often becomes permanent architecture.

---

## 2.67 ADRs SHOULD be revisited by events, not arbitrary churn

Accepted ADRs do not require periodic rewriting merely to look current.

Review SHOULD occur when:

- context materially changes;
- assumptions prove false;
- new constraints emerge;
- significant incidents challenge the design;
- replacement is proposed.

Governance MAY periodically check discoverability and status accuracy without reopening the architectural decision itself.

---

## 2.68 Retroactive ADRs MAY document important undocumented architecture

A retroactive ADR SHOULD be created when an existing significant architecture decision:

- has no reliable record;
- repeatedly confuses maintainers;
- affects ongoing migration or governance;
- must be understood before future changes.

Retroactive ADRs MUST NOT pretend they were written when the original decision occurred.

---

## 2.69 Retroactive ADRs MUST identify themselves

A retroactive ADR MUST state clearly that it was created after the decision.

It SHOULD record separately:

- original decision date if known;
- ADR documentation date.

Example:

- `decision_date: 2023-05-18`
- `recorded_date: 2026-09-23`
- `retroactive: true`

If the original date is uncertain, the ADR MUST say so rather than inventing precision.

---

## 2.70 Retroactive context MUST distinguish evidence from reconstruction

A retroactive ADR SHOULD identify sources such as:

- historical pull requests;
- tickets;
- commit history;
- meeting notes;
- former design documents;
- interviews.

Statements inferred after the fact MUST NOT be presented as certain historical reasoning when evidence is incomplete.

Appropriate language includes:

> Available repository history indicates that the primary driver was...

---

## 2.71 Retroactive ADRs MUST describe the historical decision

A retroactive ADR MUST document:

- the decision that was actually made;
- known historical context;
- known consequences.

It MUST NOT rewrite history into the architecture the team now wishes had been selected.

If the team now wants a different architecture, a separate new ADR SHOULD supersede the retroactive record.

---

## 2.72 Retroactive ADRs SHOULD NOT proliferate unnecessarily

Teams MUST NOT attempt to reconstruct an ADR for every historical implementation detail.

Prioritize undocumented decisions that materially affect:

- current architecture;
- risk;
- migration;
- governance;
- repeated engineering questions.

---

## 2.73 Emergency decisions MAY use expedited ADRs

During an incident or urgent production constraint, a full review MAY be impractical.

The team MAY accept an abbreviated emergency ADR containing at least:

- Context;
- Decision;
- immediate Consequences;
- owner.

The decision SHOULD be reviewed and completed after stabilization.

Emergency implementation MUST NOT become permanently undocumented architecture.

---

## 2.74 Incident-driven architecture changes SHOULD link the incident

If an outage or security incident materially changes architecture, the ADR SHOULD link to the incident or postmortem where access permits.

The ADR SHOULD capture the architecture decision rather than duplicate the entire incident analysis.

---

## 2.75 ADR exceptions MUST be explicit

If a team intentionally deviates from an Accepted ADR, it MUST either:

- create a scoped exception ADR;
- create a superseding ADR;
- follow an established exception-governance mechanism.

Silent divergence MUST NOT become architecture by accumulation.

---

## 2.76 Architecture drift SHOULD be detectable

Where practical, important accepted decisions SHOULD have confirmation mechanisms.

Examples include:

- linting;
- dependency rules;
- infrastructure policy;
- CI checks;
- contract tests.

Not every ADR can or should be automatically enforced.

High-risk decisions SHOULD have stronger conformance checks.

---

## 2.77 ADRs MUST NOT become approval theatre

Creating an ADR after leadership has already made an irreversible decision merely to satisfy process SHOULD be avoided.

If the decision was already made, the document MUST say so accurately.

Governance SHOULD optimize for:

- decision quality;
- organizational memory;
- traceability

rather than number of ADRs created.

---

## 2.78 ADR templates SHOULD be automated

Repositories SHOULD provide a standard ADR template.

Tooling MAY automate:

- next identifier;
- filename creation;
- metadata;
- index generation;
- link validation;
- status validation.

Automation MUST NOT replace architectural reasoning.

---

## 2.79 ADR linting MAY enforce structural requirements

CI MAY verify:

- valid identifier;
- required sections;
- allowed status;
- required supersession links;
- owner presence;
- broken ADR references.

CI SHOULD NOT attempt to decide whether architectural reasoning is substantively correct.

---

## 2.80 ADR catalogs SHOULD use canonical UI components

Where ADRs are presented through an internal portal, shadcn/ui MUST remain the component baseline.

Preferred mappings include:

| Concern | Baseline |
|---|---|
| ADR index | `Table`, canonical data-table pattern |
| Status | `Badge` |
| Search | `Input`, `Command` |
| Domain/status filters | `Select`, `Popover` |
| ADR detail | document page or `Sheet` for secondary detail |
| Review warning | `Alert` |
| Supersession relationship | `Breadcrumb`, links, metadata panel |
| Destructive governance action | `AlertDialog` |
| Loading | `Skeleton` |

The portal MUST NOT become a second editable source of truth unless it writes through to the canonical version-controlled ADR representation.

---

## 2.81 ADR status MUST NOT rely on colour alone

Status presentation MUST use text.

For example:

- Accepted;
- Proposed;
- Superseded.

Colour MAY supplement the label.

Accessibility requirements apply to:

- ADR search;
- status filters;
- relationship navigation;
- review controls.

---

## 2.82 ADR administration MUST follow authorization

Where tooling permits status changes or acceptance, authorization MUST follow the applicable architecture-governance role.

A user who can read an ADR MUST NOT automatically be able to:

- accept it;
- supersede it;
- change ownership.

Version-control review SHOULD remain the default authorization/audit mechanism where practical.

---

## 2.83 ADR automation MUST NOT expose sensitive repository information

Architecture portals, indexing systems, AI search, or documentation generation MUST respect repository and document authorization.

A restricted ADR MUST NOT become discoverable through:

- generated summaries;
- embeddings;
- search indexes;
- AI assistants

to users who cannot access the source record.

---

## 2.84 AI-generated ADR drafts MUST be reviewed by humans

AI tools MAY assist with:

- structure;
- summarization;
- alternative enumeration;
- language cleanup.

An AI-generated ADR MUST NOT become Accepted without accountable human review.

The decision owner remains responsible for:

- context accuracy;
- alternatives;
- consequences;
- final decision.

---

## 2.85 AI MUST NOT invent historical rationale

When AI assists with retroactive ADR creation, claims about historical motives MUST be grounded in available evidence.

Generated plausible reasoning MUST NOT be inserted as fact merely because it sounds architecturally reasonable.

---

## 2.86 ADRs SHOULD be referenced during onboarding and maintenance

Engineers modifying architecture SHOULD review relevant ADRs before changing established architectural boundaries.

Code review SHOULD reference ADRs when architectural intent is relevant to understanding a proposed change.

---

## 2.87 Governance SHOULD measure ADR usefulness, not ADR volume

Teams MAY monitor:

- undocumented significant decisions;
- stale status metadata;
- broken links;
- unresolved proposed ADRs;
- architecture drift.

They SHOULD NOT optimize for:

- ADRs per engineer;
- ADRs per sprint;
- arbitrary documentation volume.

---

# 3. Anti-patterns

The following are non-conforming unless a documented exceptional requirement provides stronger justification.

## 3.1 Scope

- ADR for every implementation detail.
- No ADR for a new organization-wide database platform.
- Security architecture existing only in code comments.
- Using ADRs to restate existing standards without a new decision.

## 3.2 Timing

- Writing the ADR only after implementation so the chosen solution appears inevitable.
- Architecture decided entirely in chat with no durable record.
- Experimental proof of concept treated as Accepted because it already exists.
- Proposed ADR left unresolved for years while production relies on it.

## 3.3 Template

- ADR containing only `We chose X`.
- Context written as vendor marketing.
- No consequences.
- No alternatives for a genuinely contested decision.
- Fifteen pages of analysis before the reader can find the actual decision.
- Meeting transcript copied into the ADR.

## 3.4 Grain of decision

- Combining unrelated decisions into one ADR such as database, frontend framework, CI platform, and auth strategy.
- Splitting one architectural decision into dozens of trivial ADRs so rationale becomes impossible to follow.

## 3.5 Status

- Accepted ADR silently edited into a different decision.
- `Old` as a status.
- Superseded ADR with no replacement link.
- Replacement ADR that does not identify what it supersedes.
- Using ADR status to track implementation progress.
- Deleting Rejected ADRs because they were not selected.

## 3.6 Numbering

- Reusing ADR numbers.
- Renumbering all ADRs because a record was deleted.
- Identifier changing whenever title changes.
- Numbering used as a priority score rather than stable identity.

## 3.7 Review

- Architecture board reviewing only Markdown formatting.
- Every tiny service-local ADR requiring organization-wide approval.
- Security-significant ADR accepted without Security review.
- Consensus required indefinitely despite established decision authority.
- Architectural objections closed without documenting the accepted trade-off.

## 3.8 Storage

- ADRs scattered across personal note systems.
- Canonical ADR only in a meeting-recording transcript.
- Multiple editable copies in Wiki, Git, and document storage.
- Central architecture repository containing a copied ADR that has diverged from the service repository.
- No index or search mechanism.

## 3.9 Traceability

- ADR references issue only, while issue contains the actual rationale.
- Implementation PR does not reference the governing ADR.
- Old ADR cannot lead readers to its replacement.
- Code contains unusual architectural constraint with no discoverable rationale.

## 3.10 Retroactive records

- Retroactive ADR dated as if written before implementation.
- Reconstructed rationale presented as known historical fact.
- Current preferred design written into an ADR that claims to describe the old decision.
- Attempting to reconstruct ADRs for every legacy code choice.

## 3.11 Governance

- Number of ADRs treated as architecture quality KPI.
- ADR creation used as bureaucratic approval theatre.
- Accepted decisions ignored without exception or superseding record.
- “Temporary” architecture with no owner or exit trigger.
- Architectural standards bypassed by calling every deviation a local implementation detail.

## 3.12 Security

- Credentials copied into an ADR.
- Restricted architectural decision indexed into a public internal search tool.
- Architecture portal allows anyone with read access to mark an ADR Accepted.
- AI-generated historical rationale accepted without evidence.

---

# 4. Checklist

## 4.1 Requirement threshold

- [ ] The decision is architecturally significant.
- [ ] Reversibility and blast radius were considered.
- [ ] The decision is not merely routine implementation.
- [ ] Existing standards/ADRs do not already resolve it.
- [ ] Security, data, API, platform, or cross-team significance has been considered.

## 4.2 Timing

- [ ] ADR was started while meaningful alternatives remained open where practical.
- [ ] Relevant experiments or benchmarks are linked.
- [ ] Existing implementation is not being misrepresented as a prospective choice.
- [ ] Emergency or retroactive status is explicit where applicable.

## 4.3 Metadata

- [ ] Stable ADR number exists.
- [ ] Title describes the decision.
- [ ] Status uses the canonical vocabulary.
- [ ] Date is present.
- [ ] Owner is present.
- [ ] Relevant decision makers/reviewers are identifiable.
- [ ] Affected scope is clear.
- [ ] Related ADR metadata is present where applicable.

## 4.4 Context

- [ ] Problem is understandable independently from the solution.
- [ ] Constraints are stated.
- [ ] Important decision drivers are recorded.
- [ ] Current architecture/context is described sufficiently.
- [ ] Context does not assume the selected answer.

## 4.5 Decision

- [ ] Decision is explicit.
- [ ] Scope is clear.
- [ ] Reader can identify the chosen architecture quickly.
- [ ] Temporary aspects and exit conditions are documented.
- [ ] Exceptions to corpus standards are explicit and approved.

## 4.6 Consequences

- [ ] Positive consequences are recorded.
- [ ] Negative consequences are recorded.
- [ ] Operational impact is considered.
- [ ] Security impact is considered where relevant.
- [ ] Cost and migration impact are considered where material.
- [ ] Known architectural risks are not hidden.

## 4.7 Alternatives

- [ ] Serious alternatives are listed.
- [ ] Rejected options have rationale.
- [ ] Status quo is included where legitimate.
- [ ] Alternatives are genuine rather than strawmen.
- [ ] Supporting evidence is linked.

## 4.8 Review

- [ ] Reviewers match the decision scope.
- [ ] Required Security/Data/API/etc. reviewers participated.
- [ ] Material objections are resolved or documented.
- [ ] Correct decision authority accepted the ADR.
- [ ] Review effort is proportionate to architectural impact.

## 4.9 Lifecycle

- [ ] Proposed ADR is not presented as active policy.
- [ ] Accepted status reflects an actual decision.
- [ ] Implementation status is tracked elsewhere.
- [ ] Rejected records are retained.
- [ ] Deprecated records explain migration/new-work direction where known.
- [ ] Superseded ADR links to its replacement.
- [ ] Replacement ADR links to what it supersedes.

## 4.10 Numbering and storage

- [ ] Identifier is stable.
- [ ] Number is never reused.
- [ ] Filename follows repository convention.
- [ ] ADR lives in the canonical version-controlled location.
- [ ] Cross-repository ADR has one authoritative copy.
- [ ] ADR index is available.

## 4.11 Discoverability

- [ ] ADR can be found by topic, not only number.
- [ ] Index displays status.
- [ ] Superseded records clearly identify current replacements.
- [ ] Related decisions are linked.
- [ ] Deprecated/rejected records remain searchable.

## 4.12 Traceability

- [ ] Relevant issue/RFC is linked.
- [ ] Implementation PRs reference the ADR where appropriate.
- [ ] Relevant architecture/code documentation links back where useful.
- [ ] Confirmation mechanism is documented for important enforceable decisions.
- [ ] Architecture drift can be detected where practical.

## 4.13 Retroactive ADRs

- [ ] Record is explicitly marked retroactive.
- [ ] Original decision date and documentation date are distinguished.
- [ ] Historical sources are cited or linked.
- [ ] Inference is distinguished from established fact.
- [ ] ADR records what was actually decided.
- [ ] A new ADR is used separately for current architecture changes.

## 4.14 Security and governance

- [ ] ADR contains no secrets.
- [ ] Sensitive decisions use appropriate document access controls.
- [ ] Portal/search authorization follows source authorization.
- [ ] Status-changing controls are appropriately restricted.
- [ ] AI-generated text receives accountable human review.

## 4.15 UX and accessibility

- [ ] ADR catalog uses semantic status labels rather than colour alone.
- [ ] Search and filters are keyboard accessible.
- [ ] Related/superseding ADR navigation is understandable.
- [ ] shadcn/ui is used for administrative ADR interfaces.
- [ ] Documentation remains readable without specialized tooling.

## 4.16 Corpus alignment

- [ ] Security decisions align with Security standards.
- [ ] Data architecture decisions align with Data & Database.
- [ ] API decisions align with API standards.
- [ ] State architecture aligns with State Management.
- [ ] Form architecture does not bypass Forms & Validation.
- [ ] Accessibility concerns receive appropriate review.
- [ ] Design-system decisions align with Design Tokens and Components.
- [ ] Pattern decisions reference existing canonical Patterns.
- [ ] Deviations are explicitly scoped rather than silently replacing corpus standards.

---

# 5. Canonical summary

A Gold Standard 2026 ADR MUST capture an architecturally significant decision while the rationale is still understandable.

An ADR is required when a choice materially affects system structure, security, data ownership, integration contracts, platform direction, scalability, operability, cost, or long-term reversibility. It MUST NOT be required for every ordinary implementation detail.

The canonical ADR body is:

**Context → Decision → Consequences → Alternatives Considered**

Significant records SHOULD additionally capture decision drivers, evidence, and implementation confirmation. This combines the durable core of the original ADR structure with the explicit option/trade-off analysis used by modern MADR practice. citeturn558812search0turn558812search4

Every ADR MUST have a stable identifier, title, status, date, and owner. ADR numbers MUST never be reused.

The canonical lifecycle statuses are:

**Proposed → Accepted → Deprecated/Superseded**

with **Rejected** and **Withdrawn** available for proposals that do not become accepted architecture.

Decision status and implementation status MUST remain separate.

Accepted ADRs are historical records. Their decision rationale SHOULD NOT be rewritten when architecture changes. A materially different architecture MUST be represented by a new ADR that supersedes the old record.

Supersession MUST be bidirectional: the old ADR identifies its replacement, and the replacement identifies the decision it replaces. Modern MADR guidance likewise supports explicit status metadata and links between related or superseding records. citeturn558812search2turn558812search7

ADRs SHOULD normally live in version-controlled Markdown near the architecture they govern, with a canonical repository path such as `docs/architecture/adr/`. Cross-repository decisions MUST have one authoritative location rather than multiple editable copies.

Every ADR collection MUST be discoverable through an index or equivalent search surface. Users MUST be able to distinguish current, proposed, rejected, deprecated, and superseded decisions without opening every file.

ADRs SHOULD link the issue, RFC, implementation pull requests, and related architectural decisions necessary to trace:

**problem → decision → implementation**

but external links MUST NOT replace the core rationale in the ADR itself.

Review scope MUST match architectural scope. Decisions affecting Security, data, APIs, infrastructure, accessibility, or other governed domains MUST receive the appropriate specialist review without requiring every ADR to pass through every architecture authority.

Retroactive ADRs are valid and SHOULD be used for important undocumented legacy architecture. They MUST identify themselves as retroactive, distinguish the original decision date from documentation date, and distinguish documented historical evidence from later reconstruction.

A retroactive ADR MUST describe what was actually decided. If the organization now wishes to choose a different architecture, a separate new ADR MUST supersede the historical record.

Architecture governance SHOULD optimize for **decision quality, organizational memory, traceability, and discoverability**, not the volume of ADRs produced.

shadcn/ui is the canonical component baseline for ADR portals and governance surfaces. Status, search, review, relationships, and supersession MUST remain accessible and MUST not create a second uncontrolled source of architectural truth.

**Canonical rule:** an architectural decision is conforming only when a future engineer can discover what was decided, understand the context and trade-offs that led to it, identify whether it is still authoritative, trace it to the implementation it governs, and find the newer decision when it is no longer current.

The lifecycle vocabulary above is intentionally tighter than MADR's open-ended status examples: corpus-wide governance benefits from one controlled set of statuses, while MADR itself permits broader customization. citeturn558812search2turn558812search5
