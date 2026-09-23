---
id: "threat-model"
title: "Threat Modeling & Secure SDLC"
domain: "security"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["security", "threat", "modeling", "secure", "sdlc"]
applies_to: ["data", "security"]
related: ["events-webhooks", "code-review"]
legacy_number: 76
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 59461
provenance: baseline

---

# Threat Modeling & Secure SDLC Guidelines — Gold Standard 2026

**Canonical placement:** Security → **Threat Modeling** → Testing → Governance

---

## 1. Purpose

Threat modeling and the Secure Software Development Lifecycle (Secure SDLC) define how security risk is identified, designed against, verified, accepted, and monitored throughout the lifecycle of a system or feature.

Security **MUST** be treated as a design property and delivery requirement, not as a final-stage testing activity.

Every material feature **MUST** answer, before production release:

```text
What are we protecting?
Who or what can attack it?
Where are the trust boundaries?
How could the design be abused?
Which controls prevent or contain those attacks?
How have those controls been verified?
Who owns residual risk?
```

This standard defines canonical requirements for:

- threat modeling;
- STRIDE analysis;
- attack trees;
- data-flow diagrams;
- trust-boundary identification;
- abuse and misuse cases;
- feature-class security requirements;
- secure design review;
- dependency and software-supply-chain security;
- source and build integrity;
- static and dynamic security testing;
- penetration testing;
- vulnerability management;
- remediation SLAs;
- security exceptions;
- security sign-off;
- CI/CD release controls;
- post-release reassessment.

Threat modeling **MUST** be proportional to risk, but risk proportionality **MUST NOT** be used as justification for skipping baseline security requirements.

This standard aligns with the canonical **Security**, **Data & Database**, **API**, **Events & Webhooks**, **Jobs & Queue**, **State Management**, **Forms & Validation**, **Accessibility**, **Design Tokens**, **Component**, and **Pattern** standards.

For product and administrative security interfaces, **shadcn/ui is the component baseline**.

---

# 2. Rules

## 2.1 Secure SDLC lifecycle

Security analysis **MUST** be integrated into the normal engineering lifecycle.

The canonical flow is:

```text
feature definition
→ security classification
→ architecture / data-flow model
→ threat model
→ security requirements
→ implementation
→ automated security verification
→ design / security review
→ penetration testing where required
→ release sign-off
→ production monitoring
→ periodic reassessment
```

Security **MUST NOT** exist as a disconnected approval performed only after implementation is complete.

Threat-model findings **MUST** produce one or more of:

- an implemented control;
- a test requirement;
- an operational control;
- an explicitly accepted risk;
- a design change;
- a release blocker.

A threat recorded without an owner or disposition **MUST NOT** be considered resolved.

---

## 2.2 When threat modeling is required

A threat model **MUST** be created or materially updated when a change introduces or modifies a meaningful security boundary.

Examples include:

- authentication;
- authorization;
- tenant isolation;
- identity federation;
- session handling;
- secrets;
- cryptographic operations;
- payment or financial workflows;
- administrative privileges;
- sensitive or regulated data;
- file upload or processing;
- arbitrary URLs;
- outbound network access;
- webhook delivery;
- public APIs;
- third-party integrations;
- browser-to-server trust boundaries;
- native application trust boundaries;
- AI or agent tool execution;
- command or code execution;
- multi-tenant storage;
- queue or event boundaries;
- cross-region or cross-environment data flows;
- infrastructure control planes;
- build or deployment systems.

A threat model **SHOULD** be updated for meaningful architecture changes even where no new public feature exists.

Purely cosmetic changes **MAY** omit a dedicated threat model when they do not modify:

- data flow;
- privileges;
- user input;
- trust boundaries;
- dependency footprint;
- execution behavior.

The decision to omit a threat model **SHOULD** be mechanically derivable from feature classification rather than informal judgment alone.

---

## 2.3 Threat-model ownership

Every threat model **MUST** have a named engineering owner.

High-risk systems **SHOULD** also identify:

- security reviewer;
- architecture reviewer;
- data owner where sensitive data is involved;
- operational owner.

The feature team remains responsible for security outcomes.

A security team review **MUST NOT** transfer ownership of the system's security to the security team.

Threat-model ownership **MUST** persist after launch.

---

## 2.4 Threat-model scope

A threat model **MUST** define its scope explicitly.

At minimum, scope **SHOULD** identify:

- feature or system;
- code repositories;
- services;
- clients;
- infrastructure;
- data stores;
- external dependencies;
- privileged operators;
- third parties;
- relevant environments.

Out-of-scope components **MUST** be documented when excluding them could materially affect interpretation.

A threat model **MUST NOT** model only the application server while ignoring meaningful adjacent systems such as:

- browser clients;
- identity providers;
- object storage;
- queues;
- webhooks;
- CI/CD;
- cloud control planes;
- third-party APIs.

---

## 2.5 Security assets

Threat modeling **MUST** begin by identifying assets.

Assets **MAY** include:

- credentials;
- sessions;
- signing keys;
- customer data;
- tenant boundaries;
- payment authority;
- administrative privilege;
- business-critical state;
- availability;
- audit history;
- source code;
- release artifacts;
- models or proprietary algorithms;
- infrastructure credentials;
- integrity of decisions.

Assets **MUST** include integrity and availability concerns where those properties are security-relevant.

Threat modeling **MUST NOT** treat confidentiality as the only meaningful security objective.

---

## 2.6 Security actors

The threat model **MUST** identify relevant actors.

Actors **SHOULD** include, where applicable:

- unauthenticated internet user;
- authenticated user;
- malicious tenant;
- compromised user;
- privileged user;
- administrator;
- support operator;
- service account;
- compromised internal service;
- third-party integration;
- CI/CD identity;
- software dependency;
- malicious insider;
- automated attacker.

Authenticated users **MUST NOT** automatically be treated as trusted.

Internal network location **MUST NOT** automatically be treated as trusted.

Service-to-service communication **MUST** have an explicit trust model.

---

## 2.7 Data-flow diagrams

Threat models for non-trivial systems **MUST** contain a data-flow diagram or equivalent architecture representation.

The diagram **MUST** show enough information to reason about:

- actors;
- processes;
- data stores;
- external systems;
- communication paths;
- trust boundaries.

Material flows **SHOULD** indicate:

- protocol;
- authentication mechanism;
- authorization boundary;
- data classification;
- direction of flow.

A diagram that only shows service boxes without meaningful data movement **MUST NOT** be considered a sufficient data-flow diagram.

---

## 2.8 Trust boundaries

Trust boundaries **MUST** be explicitly shown.

Common trust boundaries include:

```text
internet → edge
browser → backend
tenant A → shared platform
service → service
application → database
application → queue
application → third party
production → CI/CD
operator → administrative API
cloud workload → cloud control plane
```

Crossing a trust boundary **MUST** trigger consideration of:

- authentication;
- authorization;
- validation;
- confidentiality;
- integrity;
- replay;
- rate limiting;
- auditability;
- failure isolation.

Trust boundaries **MUST NOT** be inferred solely from network topology.

Logical privilege boundaries can exist inside the same process, cluster, VPC, or database.

---

## 2.9 STRIDE

STRIDE **SHOULD** be the default systematic threat-enumeration framework.

Each material component and trust-boundary crossing **SHOULD** be evaluated against:

- **Spoofing**
- **Tampering**
- **Repudiation**
- **Information Disclosure**
- **Denial of Service**
- **Elevation of Privilege**

STRIDE **MUST NOT** be treated as a checklist whose completion alone proves security.

The analyst **MUST** translate applicable categories into concrete attack scenarios.

Weak:

```text
Spoofing possible.
```

Preferred:

```text
An attacker who obtains a bearer session token can impersonate
the account from another device because the privileged operation
does not require reauthentication.
```

---

## 2.10 Spoofing analysis

Spoofing analysis **MUST** consider unauthorized assumption of an identity.

Examples include:

- stolen sessions;
- forged API credentials;
- spoofed webhook sources;
- service impersonation;
- account takeover;
- insecure password reset;
- weak identity binding;
- client certificate misuse.

Controls **SHOULD** consider:

- strong authentication;
- credential lifecycle;
- phishing resistance where required;
- signed messages;
- workload identity;
- reauthentication;
- session invalidation.

Possession of an identifier **MUST NOT** be treated as proof of identity.

---

## 2.11 Tampering analysis

Tampering analysis **MUST** consider unauthorized modification of:

- application requests;
- stored data;
- messages;
- build artifacts;
- audit trails;
- dependencies;
- configuration;
- authorization state.

Relevant controls **MAY** include:

- server-side validation;
- authorization;
- cryptographic integrity;
- database constraints;
- immutable logs;
- artifact signing;
- protected branches;
- deployment attestations.

Client-generated state **MUST NOT** be trusted solely because it originated from the product's own frontend.

---

## 2.12 Repudiation analysis

Repudiation analysis **MUST** consider whether consequential actions can later be denied without sufficient evidence.

Security-relevant actions **SHOULD** produce audit evidence appropriate to risk.

Examples include:

- privilege assignment;
- secret rotation;
- destructive deletion;
- authentication changes;
- impersonation;
- payout actions;
- high-impact replay;
- security-policy changes.

Audit evidence **MUST** be protected against unauthorized modification.

Audit logging **MUST NOT** capture secrets or unrestricted sensitive payloads merely to maximize evidence.

---

## 2.13 Information-disclosure analysis

Threat models **MUST** identify ways information could become visible beyond its authorized audience.

This **MUST** include consideration of:

- broken access control;
- tenant isolation;
- logs;
- caches;
- analytics;
- error messages;
- browser storage;
- URLs;
- third-party systems;
- backups;
- exports;
- object-storage ACLs;
- support tooling.

A field being hidden in the UI **MUST NOT** be treated as an access-control mechanism.

Sensitive data exposure through logs **MUST** be modeled as a security boundary.

---

## 2.14 Denial-of-service analysis

Threat models **MUST** consider exhaustion of finite resources.

Resources include:

- request concurrency;
- CPU;
- memory;
- storage;
- database connections;
- database locks;
- queue capacity;
- third-party quotas;
- outbound sockets;
- expensive model inference;
- billing-sensitive external APIs.

Systems accepting attacker-controlled workload **SHOULD** use:

- rate limits;
- quotas;
- concurrency limits;
- size limits;
- timeouts;
- bounded retries;
- circuit breakers;
- backpressure.

Validation **MUST** occur before unnecessarily expensive work where practical.

---

## 2.15 Elevation-of-privilege analysis

Threat models **MUST** evaluate transitions between privilege levels.

Examples include:

```text
user → administrator
tenant member → tenant owner
application → cloud control plane
read-only token → write capability
support agent → customer impersonation
workflow service → payment authority
```

Privilege escalation **MUST** be prevented through server-authoritative authorization.

UI hiding, disabled controls, route guards, or client state **MUST NOT** be treated as sufficient authorization controls.

---

## 2.16 Attack trees

Attack trees **SHOULD** be used where a critical security objective has multiple plausible attack paths.

The root **MUST** represent a concrete attacker objective.

Example:

```text
Root:
Steal funds from another customer

├── Compromise victim identity
│   ├── Steal session
│   ├── Reset password
│   └── Social-engineer support
│
├── Bypass authorization
│   ├── Modify account_id
│   └── Abuse administrator API
│
└── Manipulate payment workflow
    ├── Replay payout request
    ├── Race balance checks
    └── Compromise payout provider credential
```

Attack trees **SHOULD** distinguish:

- AND conditions;
- OR conditions;
- prerequisites;
- existing mitigations.

Attack trees **MUST NOT** consist solely of generic categories such as "hack server."

---

## 2.17 Abuse and misuse cases

Threat modeling **MUST** include abuse cases for meaningful user-facing features.

An abuse case describes how a legitimate capability could be intentionally used in a harmful way without necessarily exploiting a software bug.

Examples include:

- invitation spam;
- mass account enumeration;
- credential stuffing;
- scraping;
- mass export;
- bulk notification abuse;
- fraudulent refunds;
- webhook amplification;
- abuse of free computational resources;
- harassment through messaging features.

Product requirements **MUST** consider abuse resistance where the feature enables asymmetric cost or harm.

Abuse cases **MUST NOT** be excluded simply because all API calls are technically authorized.

---

## 2.18 Security requirements from threats

Every material threat **MUST** result in an explicit disposition.

Canonical dispositions are:

```text
mitigate
avoid
transfer
accept
```

"Mitigate" **MUST** identify the control.

"Accept" **MUST** identify:

- risk;
- rationale;
- owner;
- scope;
- expiration or reassessment trigger where appropriate.

Threat-model controls **SHOULD** be converted into testable requirements.

Example:

```text
Threat:
Cross-tenant invoice access through manipulated invoice_id.

Requirement:
Every invoice read MUST constrain lookup by authenticated tenant_id.

Verification:
Authorization integration test MUST demonstrate that tenant A cannot
retrieve an invoice belonging to tenant B using a known invoice ID.
```

---

## 2.19 Feature security classes

Features **MUST** be assigned a security class according to risk.

A canonical model is:

```text
Class S0 — presentation-only / negligible security effect
Class S1 — ordinary authenticated product feature
Class S2 — sensitive data or meaningful authorization boundary
Class S3 — privileged, financial, identity, infrastructure, or critical security feature
```

Equivalent organizational terminology **MAY** be used.

Classification **MUST** consider:

- data sensitivity;
- privilege;
- external exposure;
- tenant boundaries;
- financial impact;
- recoverability;
- exploit blast radius.

The highest applicable characteristic **SHOULD** determine the class.

---

## 2.20 S0 requirements

S0 features **MAY** use lightweight security review.

They **MUST** still comply with baseline:

- dependency policy;
- secure coding;
- client/server trust boundaries;
- accessibility;
- content safety;
- design-system requirements.

A feature **MUST NOT** be classified S0 merely because its UI appears visually simple.

---

## 2.21 S1 requirements

S1 features **MUST** have:

- authenticated-user assumptions documented;
- server-side authorization;
- input validation;
- data-classification review;
- baseline automated security testing;
- dependency review.

A formal security-team review **MAY** be omitted if the feature does not cross S2/S3 boundaries and automated policy confirms this.

---

## 2.22 S2 requirements

S2 features **MUST** additionally have:

- explicit threat model;
- DFD;
- trust boundaries;
- STRIDE analysis;
- abuse cases;
- security requirements;
- design review;
- authorization tests;
- data-isolation tests;
- relevant security telemetry.

Security review **MUST** occur before production deployment.

---

## 2.23 S3 requirements

S3 features **MUST** receive the highest review rigor.

S3 typically includes:

- authentication systems;
- authorization infrastructure;
- secrets management;
- cryptography;
- payment or payout systems;
- production administrative tooling;
- tenant-isolation infrastructure;
- CI/CD security;
- cloud control-plane access;
- arbitrary code execution;
- signing systems.

S3 changes **MUST** have:

- formal threat model;
- independent security review;
- explicit verification plan;
- release security sign-off;
- penetration testing where materially attackable;
- documented rollback or containment strategy.

Material unresolved S3 security findings **MUST** block release unless formally accepted by the designated risk authority.

---

## 2.24 Authentication requirements

Authentication features **MUST** model:

- credential theft;
- credential stuffing;
- session theft;
- account recovery;
- MFA bypass;
- session fixation;
- session replay;
- device loss;
- identity-provider compromise;
- enumeration.

Authentication design **SHOULD** prefer established platform or identity-provider primitives over custom cryptographic protocols.

Sensitive authentication state **MUST NOT** rely on client-authoritative decisions.

---

## 2.25 Authorization requirements

Authorization-sensitive features **MUST** define the authorization model before implementation.

The model **MUST** specify:

```text
subject
resource
action
scope
context
```

Authorization **MUST** be enforced on the server at every meaningful resource boundary.

Object identifiers **MUST NOT** substitute for authorization.

Administrative roles **MUST** follow least privilege.

Authorization tests **MUST** include negative cases.

Positive tests alone **MUST NOT** be treated as sufficient evidence.

---

## 2.26 Multi-tenant requirements

Multi-tenant systems **MUST** treat tenant isolation as a primary security boundary.

Every tenant-scoped data access **MUST** have an explicit tenant-binding mechanism.

Threat models **MUST** consider:

- IDOR/BOLA;
- cache-key collisions;
- asynchronous jobs;
- background workers;
- exports;
- search indexes;
- analytics;
- object storage;
- logs;
- webhooks;
- support tooling.

Tenant identifiers supplied by clients **MUST NOT** alone determine authorization.

Data & Database safeguards **SHOULD** provide defense in depth where supported.

---

## 2.27 API requirements

Public and privileged APIs **MUST** be threat-modeled according to the API standard.

Analysis **MUST** include:

- authentication;
- object-level authorization;
- function-level authorization;
- schema validation;
- mass assignment;
- pagination abuse;
- resource exhaustion;
- replay;
- idempotency;
- sensitive error output.

API contracts **SHOULD** define security assumptions explicitly.

Undocumented endpoints **MUST NOT** bypass canonical security middleware merely because they are considered internal.

---

## 2.28 Forms and validation requirements

All untrusted input **MUST** be validated at the authoritative server boundary.

Client-side Forms & Validation logic **SHOULD** improve feedback but **MUST NOT** constitute the security control.

Threat modeling **MUST** consider:

- injection;
- type confusion;
- oversized input;
- malformed encodings;
- duplicate parameters;
- business-rule abuse;
- file content;
- validation inconsistencies.

Schema validation **MUST NOT** be confused with authorization or business-policy validation.

---

## 2.29 File-upload requirements

File-processing features **MUST** explicitly model hostile files.

Controls **SHOULD** include where appropriate:

- type allowlists;
- size limits;
- content inspection;
- filename normalization;
- isolated storage;
- isolated processing;
- malware scanning;
- output encoding;
- decompression limits;
- archive depth limits.

A client-supplied MIME type or file extension **MUST NOT** be trusted as proof of content.

User-controlled files **MUST NOT** be placed in executable application paths.

---

## 2.30 URL-fetching and SSRF requirements

Features accepting URLs that the server will resolve or fetch **MUST** be treated as SSRF-sensitive.

The design **MUST** consider access to:

- loopback;
- private networks;
- link-local addresses;
- metadata services;
- internal DNS;
- redirected destinations;
- alternate IP encodings;
- protocol smuggling.

Configuration-time URL validation alone **MUST NOT** be considered sufficient when resolution can change later.

Outbound access **SHOULD** use centrally controlled egress policy.

---

## 2.31 Sensitive-data requirements

Features handling sensitive data **MUST** identify:

- collection;
- transport;
- storage;
- caching;
- logs;
- exports;
- analytics;
- deletion;
- third-party sharing.

Threat models **MUST** follow Data & Database classification and retention standards.

Applications **MUST NOT** collect sensitive data merely because it may become useful later.

Sensitive data **MUST NOT** be copied into lower-control systems without explicit authorization.

---

## 2.32 Cryptography requirements

Custom cryptographic protocol design **SHOULD NOT** be introduced without specialist review.

Approved algorithms and key sizes **MUST** follow the canonical Security standard.

Application code **SHOULD** consume high-level vetted cryptographic libraries rather than directly implement primitives.

Threat models **MUST** distinguish:

- encryption;
- integrity;
- authentication;
- hashing;
- signing.

Using encryption **MUST NOT** be assumed to provide authenticity unless the construction provides it.

Keys **MUST** have documented ownership, rotation, storage, and revocation.

---

## 2.33 Secret-management requirements

Secrets **MUST NOT** be stored in:

- source control;
- client bundles;
- URLs;
- build logs;
- analytics;
- plaintext configuration committed to repositories.

Secrets **MUST** use approved secret-management infrastructure.

Threat modeling **MUST** consider:

- secret issuance;
- retrieval;
- runtime access;
- rotation;
- revocation;
- leak response.

Long-lived credentials **SHOULD** be replaced with workload identity or short-lived credentials where practical.

---

## 2.34 State-management requirements

Client state **MUST NOT** become authoritative for security decisions.

Threat models **MUST** consider manipulation of:

- local storage;
- session storage;
- cookies;
- URL state;
- hidden form fields;
- client caches;
- optimistic updates.

Security-critical state transitions **MUST** be validated against current server state.

Optimistic UI **MUST NOT** grant privilege before server authorization succeeds.

---

## 2.35 Administrative UI requirements

Administrative and security-sensitive interfaces **MUST** use the canonical Component and Pattern standards, with **shadcn/ui as the component baseline**.

Appropriate components include:

- `Table` / Data Table for findings and audit records;
- `Badge` for textual status;
- `Alert` for unresolved risk;
- `Dialog` or `Sheet` for review workflows;
- `AlertDialog` for irreversible security actions;
- `Tabs` for threat, evidence, findings, and history;
- `Field`, `FieldLabel`, `FieldDescription`, and `FieldError` for structured review forms;
- `Tooltip` only for supplementary context;
- `Skeleton` for loading state.

Custom security controls **SHOULD NOT** bypass established UI patterns merely to appear specialized.

---

## 2.36 Security UI accessibility

Security interfaces **MUST** comply with the Accessibility standard.

Risk, vulnerability state, scan status, or approval state **MUST NOT** be represented through color alone.

For example:

```text
Critical
```

**MUST** remain textual even when a critical semantic token is also used.

Security-review workflows **MUST** be operable by keyboard.

Dialog focus **MUST** be correctly managed.

Tables **MUST** use meaningful headers.

Icon-only security actions **MUST** expose accessible names.

---

## 2.37 Design tokens

Security UIs **MUST** use canonical Design Tokens.

Teams **MUST NOT** introduce arbitrary hard-coded colors for:

- critical;
- high;
- medium;
- low;
- passed;
- blocked.

Severity visual treatment **MUST** use semantic tokens and remain understandable without color.

Security pages **MAY** be information-dense, but density **MUST** remain inside the design system.

---

## 2.38 Secure design review

Security-sensitive designs **MUST** pass a secure-design review before implementation reaches a state where redesign is prohibitively expensive.

The review **MUST** consider:

- system boundaries;
- trust assumptions;
- data flow;
- authorization;
- abuse resistance;
- resilience;
- operational controls;
- failure modes.

Design review **MUST NOT** consist solely of reviewing code after the architecture has already been fixed.

Material S2/S3 findings **MUST** have a disposition before release.

---

## 2.39 Design review evidence

Secure-design review evidence **SHOULD** include:

- architecture diagram;
- DFD;
- trust boundaries;
- threat inventory;
- abuse cases;
- mitigations;
- open risks;
- required tests;
- reviewer decision.

Review status **MUST** be traceable to the feature or change being released.

A generic historical approval for an old architecture **MUST NOT** automatically authorize materially different designs.

---

## 2.40 Threat-model maintenance

Threat models **MUST** be living artifacts.

They **MUST** be reviewed when:

- trust boundaries change;
- a new privileged capability is introduced;
- sensitive data usage changes;
- authentication changes;
- authorization semantics change;
- new third parties are introduced;
- architecture materially changes;
- significant vulnerabilities reveal an invalid assumption.

Critical systems **SHOULD** receive periodic threat-model review even without major planned changes.

Stale threat models **MUST NOT** be cited as evidence of current security without reassessment.

---

## 2.41 Dependency inventory

Production software **MUST** maintain a machine-readable dependency inventory.

The organization **SHOULD** be able to determine which deployed systems contain a specific dependency and version.

Dependencies include:

- runtime packages;
- build-time packages;
- container base images;
- system packages;
- infrastructure modules;
- CI/CD actions;
- downloaded binaries.

Transitive dependencies **MUST NOT** be ignored merely because application developers did not select them directly.

---

## 2.42 Dependency selection

New dependencies **SHOULD** be evaluated for:

- necessity;
- maintenance activity;
- release provenance;
- vulnerability history;
- license compatibility;
- publisher trust;
- update cadence;
- transitive dependency cost.

A dependency **SHOULD NOT** be introduced for trivial functionality that can be safely implemented with existing platform capabilities.

Security-sensitive primitives **SHOULD** prefer widely reviewed, maintained implementations.

---

## 2.43 Dependency versioning

Production dependency versions **MUST** be reproducible.

Applications **SHOULD** use approved lockfiles or equivalent deterministic dependency resolution.

Builds **MUST NOT** silently resolve materially different dependencies from identical source revisions.

Floating references such as:

```text
latest
main
master
```

**SHOULD NOT** be used for immutable production dependencies.

CI/CD actions and reusable workflows **SHOULD** be pinned according to supply-chain policy.

---

## 2.44 Software bill of materials

Production artifacts **SHOULD** have an SBOM or equivalent dependency manifest.

High-risk systems **MUST** be capable of producing an SBOM for deployed artifacts.

The SBOM **SHOULD** include enough identity to support vulnerability impact analysis.

SBOM generation **MUST NOT** substitute for vulnerability scanning or dependency governance.

---

## 2.45 Supply-chain provenance

Production build artifacts **SHOULD** have verifiable provenance.

High-risk build systems **MUST** make it possible to associate an artifact with:

- source revision;
- build workflow;
- build identity;
- build environment;
- artifact digest.

Artifact digests **SHOULD** be immutable through promotion.

Production deployment **SHOULD** promote the previously verified artifact rather than rebuilding source independently for each environment.

---

## 2.46 Build-system trust

CI/CD is a privileged production system and **MUST** be threat-modeled accordingly.

Build systems **MUST** apply least privilege.

Untrusted pull-request code **MUST NOT** automatically receive production secrets.

CI jobs evaluating untrusted code **MUST** be isolated from credentials capable of:

- production deployment;
- package publication;
- repository administration;
- cloud administration.

Fork or external-contributor workflows **MUST** receive explicit security treatment.

---

## 2.47 Artifact integrity

Production artifacts **SHOULD** be signed or otherwise cryptographically bound to trusted build provenance.

Deployments **SHOULD** verify artifact integrity before execution.

Production systems **MUST NOT** deploy mutable image tags as the only artifact identity where immutable digests are available.

An artifact that changes after review **MUST** require equivalent security verification again.

---

## 2.48 Source-control protection

Security-sensitive repositories **MUST** use protected review workflows.

Critical code **SHOULD** require independent review.

Direct modification of protected production branches **SHOULD NOT** be permitted outside documented emergency procedures.

Security configuration such as:

- authentication policy;
- IAM;
- network policy;
- CI/CD;
- secrets infrastructure;

**SHOULD** receive appropriately specialized reviewers.

---

## 2.49 Static application security testing

Applicable codebases **SHOULD** run SAST or equivalent static security analysis.

SAST **MUST** execute automatically for repositories where it provides meaningful coverage.

Results **MUST** have:

- ownership;
- severity;
- disposition;
- suppression mechanism.

Suppressions **MUST** include rationale.

A scan showing zero findings **MUST NOT** be interpreted as proof that no vulnerabilities exist.

---

## 2.50 Dependency vulnerability scanning

Dependencies **MUST** be scanned for known vulnerabilities.

Scanning **SHOULD** occur:

- during pull requests;
- against default branches;
- periodically after deployment.

A dependency that was secure at release time can become vulnerable later.

Production exposure **MUST** therefore be reassessed when new relevant advisories appear.

---

## 2.51 Secret scanning

Repositories and CI/CD systems **MUST** use secret-detection controls appropriate to their environment.

A detected committed credential **MUST** be treated as potentially compromised.

Deleting the credential from Git history **MUST NOT** be considered sufficient remediation.

The credential **MUST** be revoked or rotated.

---

## 2.52 Infrastructure security scanning

Infrastructure-as-code **SHOULD** undergo automated security analysis.

Checks **SHOULD** identify risks such as:

- public storage;
- overly broad IAM;
- exposed administration ports;
- missing encryption;
- permissive network rules;
- unsafe container settings.

Automated infrastructure findings **MUST** be evaluated in architectural context rather than blindly accepted or ignored.

---

## 2.53 Dynamic security testing

Internet-facing systems **SHOULD** undergo dynamic security testing appropriate to their attack surface.

DAST **MAY** supplement but **MUST NOT** replace:

- design review;
- authorization testing;
- threat modeling;
- code review.

Automated scanners commonly have incomplete understanding of business logic.

Critical authorization and workflow controls **MUST** have explicit tests.

---

## 2.54 Authorization testing

Authorization boundaries **MUST** have dedicated negative security tests.

Tests **SHOULD** attempt:

- horizontal privilege escalation;
- vertical privilege escalation;
- cross-tenant access;
- direct object access;
- unauthorized mutation;
- role downgrade/upgrade edge cases.

Testing only the permitted path **MUST NOT** be considered sufficient.

---

## 2.55 Security regression tests

A vulnerability fix **SHOULD** include a regression test where technically feasible.

The regression test **MUST** fail against the vulnerable behavior and pass after remediation.

Security tests **SHOULD** live as close as practical to the affected code and run continuously.

A penetration-test finding that can be automated **SHOULD** become a permanent regression test.

---

## 2.56 Penetration testing

Penetration testing **MUST** be risk-based.

S3 internet-facing systems **SHOULD** undergo independent penetration testing:

- before initial high-risk production launch;
- after material security-architecture changes;
- on a recurring cadence.

A canonical recurring cadence for critical externally exposed systems is **at least annually**.

Higher-risk systems **MAY** require more frequent testing.

Lower-risk internal systems **MAY** use a longer cadence where automated testing and architecture controls provide adequate assurance.

---

## 2.57 Penetration-test scope

A penetration test **MUST** have explicit scope.

Scope **SHOULD** include where relevant:

- web application;
- APIs;
- authorization;
- authentication;
- tenant isolation;
- business logic;
- infrastructure exposure;
- integrations;
- administrative functions.

A test consisting only of commodity vulnerability scanning **MUST NOT** be represented as a full penetration test.

Testing **SHOULD** prioritize realistic exploit chains and material business impact.

---

## 2.58 Penetration-test remediation

Penetration-test findings **MUST** enter the canonical vulnerability-management workflow.

Critical and high findings **MUST** be retested after remediation.

A penetration-test report **MUST NOT** be marked resolved solely because a ticket was closed.

Remediation evidence **SHOULD** show that exploitability has been removed or materially contained.

---

## 2.59 Vulnerability intake

All security vulnerabilities **MUST** enter a centralized triage process.

Sources include:

- automated scans;
- penetration tests;
- bug bounty;
- responsible disclosure;
- customer reports;
- internal research;
- dependency advisories;
- incidents.

Findings **MUST** have a stable identifier.

Duplicate reports **MAY** reference the same canonical finding.

---

## 2.60 Vulnerability triage

Vulnerability triage **MUST** consider:

- exploitability;
- exposure;
- required privileges;
- affected data;
- affected tenants;
- integrity impact;
- availability impact;
- detectability;
- compensating controls;
- deployment prevalence.

CVSS or another scoring mechanism **MAY** inform prioritization but **MUST NOT** be the only determinant.

A technically moderate flaw exposing highly sensitive business workflows **MAY** require higher operational urgency.

---

## 2.61 Canonical severity

The organization **MUST** use a consistent severity model.

The canonical categories are:

```text
Critical
High
Medium
Low
Informational
```

Severity **MUST** describe security impact.

Engineering effort **MUST NOT** lower vulnerability severity.

A difficult fix remains a high-severity vulnerability if the risk remains high.

---

## 2.62 Critical vulnerabilities

A vulnerability **SHOULD** be Critical when exploitation can reasonably result in outcomes such as:

- systemic authentication bypass;
- broad remote code execution;
- large-scale cross-tenant compromise;
- compromise of production control-plane authority;
- unrestricted secret compromise;
- catastrophic financial manipulation.

Critical vulnerabilities **MUST** trigger immediate security and service-owner review.

Exposure reduction **MUST** begin immediately where practical.

---

## 2.63 Vulnerability remediation SLA

Unless a stricter system-specific standard applies, the canonical maximum remediation targets are:

| Severity | Triage | Mitigation or Fix |
|---|---:|---:|
| Critical | **≤ 24 hours** | **≤ 7 days** |
| High | **≤ 3 business days** | **≤ 30 days** |
| Medium | **≤ 10 business days** | **≤ 90 days** |
| Low | **≤ 30 days** | **≤ 180 days** |

Critical vulnerabilities with active exploitation or credible imminent exploitation **MUST** receive immediate containment priority and **MAY** require emergency remediation substantially faster than seven days.

These are maximum windows, not target waiting periods.

Teams **SHOULD** remediate sooner when practical.

---

## 2.64 SLA measurement

The vulnerability SLA clock **MUST** start when the organization has sufficient information to reasonably recognize a valid vulnerability.

Teams **MUST NOT** reset an SLA by:

- reopening a ticket;
- moving repositories;
- reclassifying ownership;
- splitting the ticket.

An accepted risk **MAY** suspend remediation requirements only through the formal exception process.

---

## 2.65 Temporary mitigation

Where permanent remediation cannot be completed within the required window, an effective temporary mitigation **MAY** reduce immediate risk.

Mitigation examples include:

- disabling the vulnerable feature;
- removing public exposure;
- revoking credentials;
- blocking exploit paths;
- restricting affected privileges.

A temporary mitigation **MUST** have:

- owner;
- validation;
- expiration;
- permanent-remediation plan.

A temporary mitigation **MUST NOT** silently become the permanent state.

---

## 2.66 Security exceptions

Any exception to a mandatory security requirement **MUST** be explicit.

An exception **MUST** identify:

- violated requirement;
- affected system;
- risk;
- compensating controls;
- owner;
- approver;
- expiration date.

Permanent open-ended exceptions **SHOULD NOT** be used.

Expired exceptions **MUST** block applicable releases until renewed or resolved.

Engineering teams **MUST NOT** self-approve high-risk exceptions where independent risk approval is required.

---

## 2.67 Risk acceptance

Residual security risk **MUST** be accepted by an authority capable of owning the business consequence.

A developer **MUST NOT** unilaterally accept organizational security risk solely because the vulnerability is inconvenient to fix.

Risk acceptance **SHOULD** be proportional to severity.

High or Critical risk acceptance **MUST** have explicit senior security or business authorization according to governance policy.

---

## 2.68 Security review gates

CI/CD **MUST** implement security gates appropriate to the repository's risk class.

A production release **MAY** be blocked by:

- unresolved Critical vulnerabilities;
- unresolved High vulnerabilities where policy requires;
- failed security tests;
- missing required threat model;
- expired exception;
- unsigned/unverified artifact;
- prohibited dependency;
- secret detection;
- failed authorization tests;
- missing required security approval.

Security gates **MUST** be deterministic enough that teams can understand why a release is blocked.

---

## 2.69 Security sign-off

S2 and S3 changes **MUST** have explicit security sign-off according to organizational policy.

Sign-off **MUST** attest to the reviewed change, not merely the repository in general.

Sign-off evidence **SHOULD** identify:

- change/release;
- threat-model version;
- security tests;
- known findings;
- accepted risks;
- reviewer.

S3 security approval **MUST NOT** be inferred from the absence of comments.

---

## 2.70 Sign-off freshness

Security sign-off **MUST** be invalidated when material security assumptions change after approval.

Examples include:

- new dependency;
- altered authorization;
- changed network exposure;
- changed cryptographic design;
- new external integration;
- changed privileged workflow.

Small unrelated code changes **MAY** retain prior approval where automated policy verifies that reviewed security-sensitive scope has not changed.

---

## 2.71 CI/CD enforcement

Required security controls **SHOULD** be enforced mechanically in CI/CD rather than through informal release memory.

CI/CD **SHOULD** verify:

```text
required tests passed
required scans passed
threat model present where required
security review complete
no blocking findings
no expired exceptions
artifact identity verified
deployment authorization valid
```

Manual security evidence **MUST** be stored in a durable auditable system where manual approval remains necessary.

---

## 2.72 Bypass and emergency deployment

Emergency release processes **MAY** bypass selected normal controls only through a documented break-glass procedure.

Break-glass deployment **MUST**:

- authenticate the actor strongly;
- record the reason;
- record bypassed controls;
- notify required owners;
- create follow-up remediation work.

Emergency bypass capability **MUST NOT** become the normal delivery path.

Post-release review **MUST** occur after material security-gate bypass.

---

## 2.73 Production observability

Threat-model controls **SHOULD** define what must be observable in production.

Relevant security telemetry includes:

- authentication anomalies;
- authorization failures;
- privilege changes;
- secret operations;
- unusual exports;
- cross-tenant access attempts;
- abuse-rate signals;
- security-control failures.

Logging **MUST** follow the Security and Data & Database standards.

Security observability **MUST NOT** indiscriminately collect sensitive payloads.

---

## 2.74 Detection requirements

Where prevention cannot eliminate a meaningful threat, detection **MUST** be considered.

A control that relies on detection **MUST** define:

- observable signal;
- alert condition;
- owner;
- response procedure.

"Monitor for abuse" without defined telemetry or ownership **MUST NOT** be accepted as a complete mitigation.

---

## 2.75 Incident feedback

Security incidents and near misses **MUST** feed back into threat modeling.

Post-incident review **SHOULD** ask:

- Was the threat modeled?
- Was the mitigation absent?
- Did the mitigation fail?
- Was telemetry insufficient?
- Did testing miss the issue?
- Was an assumption invalid?

Relevant findings **MUST** update:

- threat models;
- controls;
- tests;
- secure coding guidance;
- detection.

---

## 2.76 Security metrics

Secure SDLC metrics **SHOULD** measure meaningful outcomes rather than raw scanner volume.

Useful measures include:

- Critical/High finding age;
- SLA compliance;
- recurrence of previously fixed vulnerability classes;
- time to containment;
- percentage of S2/S3 changes with current threat models;
- dependency exposure time;
- penetration-test remediation completion.

A larger number of scanner findings **MUST NOT** automatically be interpreted as poorer security without context.

Likewise, zero findings **MUST NOT** automatically be interpreted as strong security.

---

## 2.77 Third-party services

Third-party services used in security-sensitive flows **MUST** be represented in threat models.

Analysis **MUST** consider:

- data shared;
- credentials granted;
- callback security;
- availability dependency;
- compromise impact;
- revocation;
- vendor access.

A vendor's security certification **MUST NOT** substitute for understanding the application's integration risk.

---

## 2.78 AI and automated agents

Systems allowing models or agents to select actions, tools, code, queries, or external destinations **MUST** threat-model those actions as untrusted or partially trusted input.

Analysis **MUST** consider:

- prompt injection;
- tool over-privilege;
- data exfiltration;
- cross-tenant context leakage;
- unsafe generated commands;
- malicious retrieved content;
- indirect prompt injection;
- unauthorized external actions.

Model output **MUST NOT** be treated as an authorization decision.

High-impact actions **SHOULD** be constrained through deterministic authorization and policy controls independent of model output.

---

## 2.79 Security documentation

Security-critical system documentation **SHOULD** include:

- architecture;
- trust boundaries;
- threat model;
- security assumptions;
- feature security class;
- control ownership;
- known residual risks;
- verification requirements.

Security assumptions **MUST** be explicit enough that future maintainers can recognize when they cease to be true.

---

# 3. Anti-patterns

## 3.1 Threat modeling after implementation

Performing threat analysis immediately before release makes architecture-level findings expensive to fix.

**Use:** security analysis during design.

---

## 3.2 STRIDE as six checked boxes

```text
Spoofing ✓
Tampering ✓
Repudiation ✓
Information disclosure ✓
DoS ✓
Elevation of privilege ✓
```

This provides no actionable analysis.

**Use:** concrete attacker scenarios and corresponding mitigations.

---

## 3.3 Diagram with no trust boundaries

A service diagram without boundaries cannot show where assumptions change.

**Use:** explicit trust boundaries and material data flows.

---

## 3.4 "Internal = trusted"

An internal service can be compromised, misconfigured, or over-privileged.

**Use:** authenticate, authorize, and validate across meaningful internal boundaries.

---

## 3.5 Authentication equals authorization

A valid authenticated user may still be unauthorized for the target resource.

**Use:** resource- and action-specific server authorization.

---

## 3.6 Positive-only authorization tests

Testing that an administrator can access a resource does not prove a regular user cannot.

**Use:** explicit negative authorization testing.

---

## 3.7 Client-side security controls

```text
if (!user.isAdmin) hideButton()
```

does not enforce authorization.

**Use:** server-side authorization.

---

## 3.8 Threat model with no owners

A list of threats with no action owners becomes documentation debt.

**Use:** owner, disposition, control, and verification for each material risk.

---

## 3.9 Permanent "accepted risk"

Open-ended exceptions accumulate indefinitely.

**Use:** explicit owner, rationale, approver, expiration, and reassessment.

---

## 3.10 Scanner equals security review

Automated scanners rarely understand business logic, privilege boundaries, or abuse cases.

**Use:** combine automation with design analysis and risk-based human review.

---

## 3.11 Pen test as a release ritual

Running a test without fixing or retesting material findings provides little assurance.

**Use:** scope, triage, remediation, and verification.

---

## 3.12 Pentest only once

A successful launch test does not cover years of architectural change.

**Use:** risk-based recurring assessment and testing after material changes.

---

## 3.13 CVSS-only prioritization

Generic score alone can miss environment-specific business consequences.

**Use:** combine technical severity with actual exposure and impact.

---

## 3.14 Lowering severity because remediation is difficult

Engineering effort does not reduce attacker impact.

**Use:** classify risk independently from implementation cost.

---

## 3.15 Resetting vulnerability SLA clocks

Moving a finding between teams must not erase its age.

**Use:** stable finding identity and original recognition timestamp.

---

## 3.16 Dependency scanning only on pull requests

A dependency can become vulnerable after deployment.

**Use:** continuous or periodic rescanning of deployed dependency inventories.

---

## 3.17 Floating production dependencies

```text
image: vendor/service:latest
```

cannot guarantee which artifact was reviewed.

**Use:** immutable versions or digests.

---

## 3.18 Untrusted PRs with production secrets

Executing attacker-controlled build code with privileged credentials creates a direct supply-chain attack path.

**Use:** isolate untrusted builds and withhold privileged secrets.

---

## 3.19 Secret removal without rotation

Deleting an exposed secret from Git does not make the leaked value safe again.

**Use:** revoke or rotate it.

---

## 3.20 SBOM as complete supply-chain security

An inventory describes contents but does not guarantee provenance or integrity.

**Use:** inventory plus scanning, provenance, artifact integrity, and controlled build systems.

---

## 3.21 Rebuilding for production

Rebuilding after testing can create a different artifact.

**Use:** build once, verify once, promote the immutable artifact.

---

## 3.22 Security sign-off by silence

"No objections" is not approval for a critical system.

**Use:** explicit auditable approval.

---

## 3.23 Security sign-off disconnected from release

An approval from months ago may not cover the current architecture.

**Use:** bind evidence to the actual change or reviewed security scope.

---

## 3.24 CI warning that never blocks

A mandatory security policy implemented as permanently ignored warnings is not a gate.

**Use:** enforce release policy mechanically.

---

## 3.25 Uncontrolled break-glass

A hidden switch that disables security checks without audit becomes the default escape hatch.

**Use:** authenticated, audited, exceptional bypass with follow-up review.

---

## 3.26 Hidden findings spreadsheet

Private vulnerability tracking prevents engineering ownership and reliable SLA management.

**Use:** centralized controlled vulnerability workflow.

---

## 3.27 "Monitor it" with no telemetry

A mitigation without a defined signal cannot be operated.

**Use:** telemetry, threshold, owner, and response procedure.

---

## 3.28 Security by visual treatment

A red destructive button does not enforce privilege.

**Use:** backend authorization plus canonical accessible UI treatment.

---

## 3.29 Color-only severity

Red, orange, and yellow indicators without textual labels are inaccessible and ambiguous.

**Use:** explicit severity text plus semantic tokens.

---

## 3.30 Threat model that never changes

Architecture evolves while static diagrams become misleading.

**Use:** revision triggers and periodic reassessment.

---

# 4. Checklist

## Scope and classification

- [ ] Feature/system security class is defined.
- [ ] Threat-model scope is explicit.
- [ ] Code, infrastructure, clients, and third parties in scope are identified.
- [ ] Security owner is assigned.
- [ ] Relevant data classifications are identified.
- [ ] Assets and attacker goals are documented.

## Architecture

- [ ] Current architecture diagram exists.
- [ ] Data-flow diagram exists for non-trivial systems.
- [ ] Trust boundaries are explicit.
- [ ] Authentication boundaries are identified.
- [ ] Authorization boundaries are identified.
- [ ] External systems are represented.
- [ ] Sensitive data flows are visible.
- [ ] Privileged control-plane paths are visible.

## Threat modeling

- [ ] STRIDE analysis has been performed where applicable.
- [ ] Threats are concrete attack scenarios.
- [ ] Critical objectives have attack-tree analysis where useful.
- [ ] Abuse/misuse cases are documented.
- [ ] Threats have explicit dispositions.
- [ ] Mitigations have owners.
- [ ] Mitigations have verification requirements.
- [ ] Residual risks are explicitly accepted where applicable.

## Authentication and authorization

- [ ] Authentication assumptions are documented.
- [ ] Server-authoritative authorization exists.
- [ ] Object-level authorization is tested.
- [ ] Function-level authorization is tested.
- [ ] Negative authorization tests exist.
- [ ] Tenant isolation is tested.
- [ ] Privileged roles follow least privilege.
- [ ] Security-sensitive actions have appropriate reauthentication where required.

## Data and input

- [ ] Sensitive data collection is justified.
- [ ] Retention requirements are defined.
- [ ] Logging avoids secrets and inappropriate sensitive payloads.
- [ ] Server-side validation is authoritative.
- [ ] Injection risks have been considered.
- [ ] File uploads are treated as hostile where applicable.
- [ ] Arbitrary URL fetching has SSRF protections.
- [ ] Client state is not trusted for security decisions.

## Dependencies and supply chain

- [ ] Machine-readable dependency inventory exists.
- [ ] Versions are reproducibly resolved.
- [ ] New high-impact dependencies have been reviewed.
- [ ] Known vulnerabilities are scanned.
- [ ] Deployed dependencies are rescanned after release.
- [ ] SBOM is available where required.
- [ ] Build provenance is available where required.
- [ ] CI/CD actions and external build dependencies are appropriately pinned.
- [ ] Untrusted code cannot access production credentials.
- [ ] Production artifacts use immutable identity.
- [ ] Artifact integrity can be verified.

## Automated testing

- [ ] Security-relevant unit/integration tests exist.
- [ ] Negative authorization tests exist.
- [ ] SAST executes where applicable.
- [ ] Dependency scanning executes automatically.
- [ ] Secret scanning is enabled.
- [ ] Infrastructure-as-code scanning exists where applicable.
- [ ] Dynamic testing exists where useful.
- [ ] Fixed vulnerabilities have regression tests where feasible.

## Secure design review

- [ ] Required design review occurred before release.
- [ ] DFD and trust boundaries were reviewed.
- [ ] Abuse cases were reviewed.
- [ ] Security requirements were incorporated into implementation.
- [ ] Open findings have explicit disposition.
- [ ] High-risk residual risk has appropriate approval.

## Penetration testing

- [ ] System penetration-test requirement is classified.
- [ ] Critical external systems are tested on the required cadence.
- [ ] Material architecture changes trigger reassessment.
- [ ] Test scope includes business logic and authorization.
- [ ] Findings enter the vulnerability workflow.
- [ ] Critical/High fixes are retested.

## Vulnerability management

- [ ] Every finding has a stable identifier.
- [ ] Owner is assigned.
- [ ] Severity is assigned consistently.
- [ ] Exposure and business context have been considered.
- [ ] SLA start time is preserved.
- [ ] Critical vulnerabilities are triaged within 24 hours.
- [ ] High vulnerabilities are triaged within 3 business days.
- [ ] Remediation complies with the applicable SLA.
- [ ] Temporary mitigations have expiry and validation.
- [ ] Exceptions have owner, approver, rationale, and expiration.

## CI/CD

- [ ] Required tests are enforced.
- [ ] Blocking vulnerabilities prevent release according to policy.
- [ ] Required threat model exists.
- [ ] Required security review exists.
- [ ] Expired exceptions prevent release.
- [ ] Secrets findings block release where applicable.
- [ ] Artifact identity is verified.
- [ ] Production deployment authorization is explicit.
- [ ] Break-glass releases are audited and reviewed.

## UI and accessibility

- [ ] shadcn/ui is the component baseline.
- [ ] Canonical form-validation patterns are used.
- [ ] Server state remains authoritative.
- [ ] Security state is not represented by color alone.
- [ ] Severity/status has textual representation.
- [ ] Keyboard workflows are complete.
- [ ] Dialog focus management is correct.
- [ ] Tables expose semantic headers.
- [ ] Icon-only actions have accessible names.
- [ ] Design Tokens are used for semantic security states.

## Operations and governance

- [ ] Security-relevant telemetry is defined.
- [ ] Detection-dependent mitigations have alerts and owners.
- [ ] Threat model has reassessment triggers.
- [ ] Security incidents feed back into threat models and tests.
- [ ] Critical system threat models receive periodic review.
- [ ] Security exceptions are periodically reviewed.
- [ ] Vulnerability SLA performance is measurable.
- [ ] Security approval evidence is auditable.

---

# 5. Canonical summary

Threat modeling is a **continuous design and engineering discipline**, not a pre-release document.

Every material security boundary **MUST** be understood through explicit assets, actors, data flows, trust boundaries, attack paths, and abuse cases.

The canonical analytical baseline is:

```text
architecture + data-flow diagram
→ trust boundaries
→ STRIDE
→ attack trees where needed
→ abuse cases
→ security requirements
→ verification
```

Threats **MUST** result in concrete controls, tests, design changes, or explicit risk acceptance.

Security requirements **MUST** be proportional to feature risk. Ordinary features require baseline security hygiene; sensitive and privileged features require formal threat modeling, independent review, and stronger release evidence.

Authentication **MUST NOT** substitute for authorization.

Client-side state, UI visibility, identifiers, or network location **MUST NOT** be treated as security boundaries.

Tenant isolation, privileged operations, sensitive-data access, arbitrary file processing, arbitrary URL access, cryptography, administrative workflows, CI/CD, and AI/agent tool execution **MUST** receive explicit threat analysis where applicable.

Dependencies and build systems are part of the attack surface.

Production software **MUST** have reproducible dependency identity, continuous vulnerability awareness, appropriately protected CI/CD, and immutable or verifiable production artifacts.

The canonical supply-chain model is:

```text
reviewed source
→ controlled dependencies
→ isolated build
→ security verification
→ provenance
→ immutable artifact
→ authorized deployment
```

Security testing **MUST** combine automated testing with design-aware verification.

SAST, dependency scanning, secret scanning, infrastructure scanning, and DAST **SHOULD** run automatically where applicable, but scanners **MUST NOT** substitute for threat modeling, authorization testing, abuse-case review, or penetration testing.

Critical externally exposed systems **SHOULD** receive independent penetration testing before high-risk launch, after material security changes, and at least annually.

Vulnerabilities **MUST** enter a centralized triage workflow with stable severity, ownership, remediation deadlines, and verification.

Unless superseded by a stricter standard, the canonical maximum remediation windows are:

```text
Critical  → triage ≤ 24h → fix/mitigate ≤ 7d
High      → triage ≤ 3 business days → fix ≤ 30d
Medium    → triage ≤ 10 business days → fix ≤ 90d
Low       → triage ≤ 30d → fix ≤ 180d
```

Engineering difficulty **MUST NOT** lower vulnerability severity.

Mandatory security controls **SHOULD** become enforceable CI/CD policy.

A production release **MUST NOT** bypass unresolved blocking findings, required security reviews, expired exceptions, failed security tests, or required artifact-integrity controls except through an explicit audited emergency procedure.

Security sign-off **MUST** be attributable, auditable, and tied to the actual reviewed change.

The canonical Secure SDLC chain is:

```text
classify
→ model
→ design controls
→ implement
→ automate verification
→ independently review
→ test adversarially
→ remediate
→ sign off
→ deploy verified artifact
→ monitor
→ reassess
```

Security is complete only when the design assumptions, implementation controls, verification evidence, residual risk, release decision, and operational monitoring all agree.

This version is structured to sit directly between the broader **Security** standard and downstream **Testing/Governance** standards, with explicit handoffs into Data, API, CI/CD, UI-system, and accessibility requirements.
