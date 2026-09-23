---
id: "secrets"
title: "Secrets & Key Management"
domain: "security"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["security", "secrets", "key", "management"]
applies_to: ["security"]
related: []
legacy_number: 74
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 58211
provenance: baseline

---

This version treats a secret as a lifecycle-managed security object rather than merely a sensitive configuration value. The core architectural split is **Secret Manager/Vault for credentials and secret material; KMS/HSM for cryptographic key custody and operations; environment variables only as a constrained last-mile delivery mechanism, not the canonical store**.

# Secrets & Key Management Guidelines — Gold Standard 2026

**Canonical placement:** Security → Secrets & Keys → Configuration & Environment → Infrastructure  
**Status:** Gold Standard 2026  
**Security baseline:** centralized secret management, least privilege, short-lived credentials, auditable access, explicit revocation, and managed cryptographic key custody  
**Key-management baseline:** NIST SP 800-57 Part 1 Rev. 5 as the current finalized baseline; later draft guidance MAY inform forward planning but MUST NOT be represented as finalized requirements  
**Component baseline:** shadcn/ui for administrative and operator-facing management surfaces

---

# 1. Purpose

## 1.1 Scope

This standard defines the canonical requirements for creating, storing, distributing, using, rotating, revoking, recovering, auditing, and destroying secrets and cryptographic keys.

It covers:

- secret inventory and ownership;
- secret classification;
- cryptographic key inventory;
- KMS, HSM, vault, and secret-manager use;
- environment-variable delivery;
- workload identity;
- least-privilege access;
- human administrative access;
- dynamic and short-lived credentials;
- rotation;
- revocation;
- compromise response;
- envelope encryption;
- data encryption keys;
- key encryption keys;
- key hierarchies;
- key custody;
- split knowledge and multi-party control;
- key backup and recovery;
- secret scanning;
- source-control leakage;
- CI/CD secrets;
- container and infrastructure secrets;
- local development;
- audit logging;
- break-glass access.

This standard applies to:

- production applications;
- development and test environments;
- CI/CD platforms;
- cloud infrastructure;
- databases;
- service-to-service authentication;
- third-party API integrations;
- encryption systems;
- signing systems;
- infrastructure automation;
- operator tooling.

---

## 1.2 Design objective

A secret MUST exist only:

1. for a defined purpose;
2. under an identified owner;
3. in approved storage;
4. for the minimum practical lifetime;
5. with the minimum practical access scope.

Secrets MUST NOT become permanent configuration merely because rotation is operationally inconvenient.

Cryptographic keys MUST be managed according to their:

- purpose;
- algorithm;
- security strength;
- custody;
- lifecycle state;
- cryptoperiod;
- recovery requirements.

The architecture SHOULD minimize the number of systems and humans that ever receive plaintext secret or key material.

---

## 1.3 Secret, key, and configuration are different concepts

The following categories MUST remain distinct.

### Secret

A secret is confidential material whose disclosure can provide authority, access, impersonation, or another security capability.

Examples include:

- API keys;
- database passwords;
- OAuth client secrets;
- access tokens;
- refresh tokens;
- signing private keys;
- symmetric keys;
- SSH private keys;
- webhook signing secrets;
- recovery credentials.

### Cryptographic key

A cryptographic key is keying material used by a cryptographic algorithm.

A cryptographic key MAY require:

- confidentiality;
- integrity;
- authenticity;
- availability;

depending on its purpose.

A public verification key is generally not confidential but still requires integrity and provenance protection.

### Configuration

Ordinary configuration does not grant security authority merely through knowledge of its value.

Examples include:

- service URLs;
- feature flags;
- timeout settings;
- non-secret identifiers.

Configuration SHOULD be stored and versioned normally.

Secrets MUST NOT be placed in ordinary configuration merely because the application consumes them alongside configuration.

---

## 1.4 Relationship to other standards

Secrets and key management MUST conform to corpus standards for:

- **Security** — identity, authorization, incident response, cryptography, logging;
- **Data & Database** — encryption, backups, sensitive data, retention, database credentials;
- **API** — authentication, tokens, signing, credential exchange, service identity;
- **State Management** — secret values MUST NOT become ordinary frontend or application state;
- **Forms & Validation** — secret-entry and administrative credential workflows;
- **Accessibility** — secure administrative interfaces MUST remain keyboard and assistive-technology operable;
- **Design Tokens** — security, warning, destructive, status, and access-state presentation;
- **Components** — shadcn/ui primitives for operator-facing interfaces;
- **Patterns** — confirmation, sensitive-value reveal, audit views, loading, errors;
- **Configuration & Environment** — deployment configuration and runtime injection;
- **Infrastructure** — IAM, KMS, HSM, orchestration, CI/CD, cloud controls.

Security controls MUST NOT depend on frontend presentation.

---

# 2. Rules

## 2.1 Every secret MUST be inventoried

Production secrets MUST have an inventory record.

The inventory MUST identify at minimum:

- stable secret identifier;
- purpose;
- owner/team;
- consuming workloads;
- environment;
- storage system;
- classification;
- access policy;
- creation or issuance method;
- rotation method;
- revocation method;
- expiration or review requirement;
- incident contact.

Where applicable, the inventory SHOULD also record:

- upstream provider;
- dependency relationships;
- last rotation;
- next scheduled rotation or renewal;
- whether the credential is static or dynamic;
- whether humans can retrieve plaintext;
- recovery requirements.

The inventory MUST contain metadata, not plaintext secret values.

---

## 2.2 Cryptographic keys require additional inventory

A cryptographic key inventory MUST additionally identify:

- algorithm;
- key size or security parameter;
- purpose;
- key type;
- key-management service;
- key identifier;
- key version;
- lifecycle state;
- cryptoperiod;
- exportability;
- backup/recovery requirements;
- custody requirements;
- data or keys protected by it.

Key inventory MUST enable identification of the impact of:

- compromise;
- revocation;
- destruction;
- algorithm deprecation.

---

## 2.3 Secret classification MUST be impact-based

Secrets MUST be classified according to compromise impact rather than merely secret type.

The classification SHOULD consider:

- privilege level;
- data sensitivity;
- environment;
- blast radius;
- tenant scope;
- ability to impersonate;
- ability to modify production;
- ability to mint additional credentials;
- difficulty of revocation;
- downstream trust.

A database password MAY therefore have a different classification from another database password with narrower permissions.

---

## 2.4 Canonical secret classes

The corpus SHOULD use the following conceptual classifications.

### Critical

Examples include:

- root or master key material;
- production break-glass credentials;
- certificate-authority private keys;
- keys able to mint broadly privileged credentials;
- organization-wide privileged secrets.

Critical secrets MUST receive the strongest custody, audit, approval, and human-access controls.

### High

Examples include:

- production administrative credentials;
- production signing keys;
- broad service credentials;
- production database owner credentials.

### Standard

Examples include:

- scoped application credentials;
- short-lived service tokens;
- restricted third-party integration credentials.

Classification MUST influence controls but MUST NOT be used to justify storing any genuine secret insecurely.

---

## 2.5 Secrets MUST use an approved secret-management system

Persistent application secrets SHOULD be stored in an approved:

- cloud secret manager;
- dedicated secrets vault;
- equivalent centralized secret-management service.

OWASP recommends centralized secret-management systems to support provisioning, auditing, access control, rotation, and lifecycle management. citeturn333834search1

An ordinary:

- database table;
- configuration file;
- CI variable store;
- environment file

MUST NOT automatically be treated as an equivalent secret-management platform.

---

## 2.6 Cryptographic keys SHOULD use KMS or HSM custody

High-value cryptographic key material MUST use an approved key-management system appropriate to its sensitivity.

Critical keys SHOULD be held in:

- HSM-backed KMS;
- dedicated HSM;
- another approved non-exportable cryptographic facility.

OWASP recommends protecting cryptographic keys in cryptographic vaults or isolated cryptographic services rather than plaintext application storage. citeturn333834search3

Applications SHOULD invoke cryptographic operations through managed key interfaces when practical rather than retrieving long-lived root key material into ordinary application memory.

---

## 2.7 KMS and Secret Manager are not interchangeable

A KMS SHOULD primarily manage cryptographic keys and cryptographic operations.

A Secret Manager or Vault SHOULD primarily manage secret values such as:

- passwords;
- access tokens;
- API credentials;
- connection credentials.

A KMS MUST NOT be used as an arbitrary blob store merely because it can encrypt a value.

A general secret store MUST NOT replace HSM/KMS custody for critical non-exportable key requirements.

---

## 2.8 Secret values MUST NOT be committed to source control

Plaintext secrets MUST NOT be committed to:

- application repositories;
- infrastructure repositories;
- configuration repositories;
- examples;
- fixtures;
- documentation.

This rule applies to private repositories as well as public repositories.

Repository visibility is not a secret-management control.

A secret committed to source history MUST be considered exposed according to incident policy even if the repository is private.

---

## 2.9 Secrets MUST NOT be embedded in build artifacts

Secrets MUST NOT be embedded in:

- container images;
- compiled frontend bundles;
- static assets;
- mobile application resources where extraction would compromise the secret;
- package artifacts.

Container build instructions such as `ARG` or `ENV` MUST NOT contain persistent secret values.

A secret present in an intermediate image layer MUST be treated as exposed even if removed by a later layer.

---

## 2.10 Client applications cannot protect server credentials

Secrets granting backend authority MUST NOT be delivered to untrusted client applications.

This includes:

- browser JavaScript;
- downloadable frontend configuration;
- mobile binaries

where extraction would grant unintended privilege.

A browser-facing value MUST be treated as public to that browser user unless another security mechanism limits its authority.

---

## 2.11 Environment variables are a delivery mechanism, not a secret store

Environment variables MAY be used as a constrained runtime injection mechanism where required by the platform.

They MUST NOT be the canonical source of truth for secret lifecycle management.

OWASP notes that environment variables can be available to processes and may appear in logs or dumps, and recommends stronger delivery mechanisms where available. citeturn333834search1

Secrets SHOULD preferentially be delivered through:

- workload identity plus runtime secret retrieval;
- memory-backed secret volumes;
- secure sidecar/agent mechanisms;
- platform-native secret mounts.

---

## 2.12 Secrets MUST NOT be passed through command-line arguments

Secret values SHOULD NOT appear in process command-line arguments.

Command lines may be exposed through:

- process inspection;
- debugging;
- monitoring;
- shell history;
- audit tooling.

Applications SHOULD accept:

- file descriptors;
- protected files;
- runtime secret retrieval;
- equivalent secure mechanisms

instead.

---

## 2.13 Secret references SHOULD be separate from secret values

Configuration SHOULD reference a secret through a stable identifier where practical.

Prefer:

`PAYMENTS_API_SECRET_REF=prod/payments/provider`

rather than storing a plaintext secret directly in ordinary configuration.

Infrastructure definitions SHOULD describe:

- which secret a workload requires;
- who may retrieve it;

without embedding its plaintext value.

---

## 2.14 Workload identity SHOULD replace bootstrap credentials

Production workloads SHOULD authenticate to secret-management infrastructure using workload identity.

Examples include:

- cloud workload identities;
- service identities;
- orchestrator identities;
- short-lived identity federation.

Long-lived bootstrap credentials whose only purpose is obtaining another secret SHOULD be eliminated where platform identity can perform that function.

---

## 2.15 Dynamic credentials SHOULD be preferred

Where supported, credentials SHOULD be dynamically issued with:

- narrow scope;
- short lifetime;
- explicit workload identity.

Examples include:

- temporary database credentials;
- short-lived cloud tokens;
- federated service credentials.

OWASP recommends dynamic secrets where practical to reduce credential reuse and compromise windows. citeturn333834search1

---

## 2.16 Secret access MUST follow least privilege

An identity MUST be able to retrieve only the secrets necessary for its function.

Access policy MUST be scoped by relevant dimensions such as:

- workload;
- application;
- environment;
- tenant where appropriate;
- operation.

A service that needs one secret MUST NOT receive wildcard access to an entire production secret hierarchy.

---

## 2.17 Secret administration and consumption SHOULD be separated

Permissions SHOULD distinguish:

- read/use;
- create;
- update;
- rotate;
- revoke;
- delete;
- change policy.

An identity that consumes a secret SHOULD NOT automatically have permission to change that secret or its access policy.

Secret-store administrators SHOULD NOT automatically receive plaintext application secrets where the platform supports separation.

---

## 2.18 Human production access SHOULD be exceptional

Normal production systems SHOULD retrieve their own credentials.

Engineers SHOULD NOT routinely copy production secrets manually.

Human plaintext access to High or Critical secrets SHOULD require:

- authenticated administrative identity;
- strong MFA;
- least privilege;
- explicit purpose;
- audit logging.

Critical-secret access SHOULD use just-in-time elevation or approval where appropriate.

---

## 2.19 Shared human credentials MUST NOT be used

Named individuals MUST use individual identities for administrative access.

A shared administrator password prevents reliable attribution and MUST NOT be the ordinary access model.

Break-glass credentials are a special recovery mechanism and MUST follow the separate break-glass rules.

---

## 2.20 Secrets SHOULD be short-lived

The default architecture SHOULD reduce secret lifetime wherever practical.

Every persistent production secret MUST have:

- an expiration policy;
- rotation policy;
- or documented justification for its lifetime.

`Never expires` MUST NOT be the default.

Secret lifetime MUST be proportional to:

- compromise impact;
- rotation capability;
- operational dependency.

---

## 2.21 Rotation intervals MUST be risk-based

There MUST NOT be one arbitrary rotation interval for every secret.

Rotation frequency SHOULD consider:

- credential privilege;
- ability to issue dynamic credentials;
- provider constraints;
- compromise detectability;
- exposure surface;
- blast radius.

Cryptographic-key cryptoperiods MUST likewise be chosen according to key purpose and risk rather than a universal calendar value. NIST defines cryptoperiods in terms of limiting exposure and risk if a key is compromised. citeturn842323search30

---

## 2.22 Rotation MUST be automated where practical

Routine rotation SHOULD NOT depend on an engineer manually copying credentials between systems.

Automated rotation SHOULD:

1. generate or issue replacement material;
2. distribute or make the new version available;
3. update consumers safely;
4. validate successful use;
5. retire the old version.

The process MUST be observable and recoverable.

---

## 2.23 Consumers MUST support safe rotation

Applications consuming rotatable secrets SHOULD support rotation without requiring risky manual intervention.

Where practical, applications SHOULD:

- retrieve current versions dynamically;
- refresh credentials;
- reopen connections;
- react to secret-version change.

A secret-management strategy that rotates values while dependent services cannot adopt the replacement safely is incomplete.

---

## 2.24 Rotation and revocation are different controls

**Rotation** replaces credentials as part of normal lifecycle management.

**Revocation** makes credential use invalid because it must no longer be trusted.

Compromised secrets MUST be revoked or otherwise invalidated promptly.

A compromised credential MUST NOT remain usable until its normal scheduled rotation date.

OWASP explicitly distinguishes regular rotation from revocation of secrets that are no longer required or may be compromised. citeturn333834search1

---

## 2.25 Rotation SHOULD support overlap where needed

For credentials requiring zero-downtime replacement, the system MAY temporarily support:

- current credential;
- previous credential.

Overlap MUST be bounded.

New writes/authentication SHOULD move to the new credential promptly.

The previous credential MUST be revoked once migration is verified.

Unlimited multi-version acceptance MUST NOT become the normal state.

---

## 2.26 Break-glass credentials require separate controls

Break-glass credentials MUST:

- be reserved for exceptional recovery;
- have clearly defined authorized users;
- be independently monitored;
- be tested periodically;
- be strongly protected.

Use of a break-glass credential MUST create a high-priority audit event.

Where possible, the credential SHOULD be rotated after use.

Break-glass access MUST NOT become a shortcut around ordinary IAM.

---

## 2.27 Cryptographic keys MUST have defined purposes

A cryptographic key MUST have an explicit purpose such as:

- data encryption;
- key wrapping;
- signing;
- verification;
- authentication;
- key establishment.

A key SHOULD NOT be reused across unrelated purposes.

Key separation limits the consequences of compromise and simplifies lifecycle control.

---

## 2.28 Key lifecycle states MUST be explicit

Managed keys SHOULD have explicit states such as:

- pre-active;
- active;
- deactivated;
- compromised;
- destroyed.

State transitions MUST be controlled and auditable.

A compromised key MUST NOT return to ordinary active status merely because the incident appears resolved.

NIST key-management guidance treats lifecycle state and state transitions as explicit key-management concepts. citeturn842323search3

---

## 2.29 Envelope encryption SHOULD protect application data at scale

Applications requiring application-layer encryption SHOULD normally use envelope encryption rather than encrypting arbitrary large payloads directly with a central KMS key.

The canonical hierarchy is:

**data → DEK → KEK → managed root/platform protection**

A **Data Encryption Key (DEK)** encrypts application data.

A **Key Encryption Key (KEK)** wraps or encrypts the DEK.

Central KMS systems are designed to hold/manage the KEK while many DEKs can protect individual data objects or units. citeturn333834search0turn333834search2

---

## 2.30 DEKs MUST be generated securely

DEKs MUST be generated using an approved cryptographically secure random mechanism.

DEKs MUST have appropriate:

- algorithm;
- size;
- mode;
- entropy.

Application code MUST NOT construct encryption keys from:

- timestamps;
- UUID strings;
- ordinary PRNGs;
- predictable IDs.

---

## 2.31 Plaintext DEKs MUST NOT be stored persistently

A plaintext DEK MUST NOT be persisted alongside encrypted data.

The stored record SHOULD contain:

- ciphertext;
- wrapped DEK;
- KEK/key identifier;
- algorithm/version metadata;
- IV/nonce;
- authentication tag where applicable.

Google's KMS envelope-encryption guidance similarly specifies storing encrypted data alongside the wrapped DEK rather than persisting a plaintext DEK. citeturn333834search0

---

## 2.32 Plaintext key lifetime in memory SHOULD be minimized

Plaintext secret and key material SHOULD remain in process memory only as long as necessary.

Applications SHOULD avoid:

- unnecessary string copies;
- debug serialization;
- caching plaintext indefinitely.

Memory handling alone cannot guarantee complete erasure in all managed runtimes, but implementations MUST NOT unnecessarily multiply plaintext copies.

---

## 2.33 Authenticated encryption MUST be used where applicable

Application-level symmetric encryption SHOULD use an approved authenticated-encryption construction.

The system MUST correctly manage:

- nonce/IV uniqueness requirements;
- authentication tags;
- algorithm identifiers.

Teams MUST NOT invent custom cryptographic constructions.

Cryptographic algorithms and parameters MUST follow the corpus Cryptography standard where one exists.

---

## 2.34 KEKs SHOULD remain inside managed cryptographic custody

A KEK protecting DEKs SHOULD remain within:

- KMS;
- HSM;
- another approved managed cryptographic boundary.

Application code SHOULD request wrap/unwrap operations rather than obtaining exportable root key material.

Google's envelope-encryption model similarly keeps the KEK within Cloud KMS while applications handle DEKs locally. citeturn333834search0

---

## 2.35 Key hierarchies MUST limit blast radius

A key hierarchy MUST have intentional scope.

A single KEK SHOULD NOT protect unrelated data domains where compromise would create unnecessary organization-wide impact.

Hierarchy SHOULD consider boundaries such as:

- environment;
- application;
- tenant;
- data classification;
- region;
- regulatory scope.

Excessive granularity SHOULD also be avoided when it makes key operations and recovery unmanageable.

---

## 2.36 Root key material requires strongest custody

Root/master key material SHOULD NOT be directly used for routine application data encryption.

Root keys SHOULD protect lower-level keys or perform narrowly defined root operations.

Critical root keys SHOULD be:

- non-exportable;
- HSM-protected;
- tightly access controlled;
- independently audited.

---

## 2.37 Key custody SHOULD support separation of duties

No single person SHOULD have unrestricted ability to:

- retrieve critical key material;
- modify its policy;
- destroy it;
- suppress the audit record

where the threat model requires stronger custody.

Critical key-management operations SHOULD consider:

- dual authorization;
- split knowledge;
- quorum approval;
- separate administrative roles.

The level of control MUST be proportional to impact.

---

## 2.38 Key export MUST be exceptional

Non-exportable cryptographic keys SHOULD remain non-exportable throughout their lifecycle.

Export of High or Critical private/symmetric key material MUST require an explicit approved use case.

If export is necessary:

- key material MUST remain cryptographically protected;
- custody MUST be documented;
- destination protection MUST be equivalent or stronger.

---

## 2.39 Key backup and recovery MUST be intentional

Keys required to decrypt retained data MUST have a documented recovery strategy.

The organization MUST decide explicitly whether a given key:

- can be recovered;
- must be backed up;
- SHOULD deliberately become unrecoverable after destruction.

Loss of an irreplaceable encryption key can mean permanent data loss.

Recovery capability MUST NOT be improvised after a failure.

---

## 2.40 Backup keys require equivalent protection

Backup key material MUST receive protection equivalent to the primary key.

An encrypted production database with its plaintext decryption key stored in an ordinary backup archive is non-conforming.

Recovery keys MUST have:

- inventory;
- access controls;
- audit;
- lifecycle management.

---

## 2.41 Key destruction MUST account for protected data

A key MUST NOT be destroyed without determining whether data still requires that key.

Key destruction workflows SHOULD identify:

- affected ciphertext;
- backups;
- archives;
- replicas;
- legal/retention requirements.

Where cryptographic erasure is intentional, destruction MUST be authorized and recorded.

---

## 2.42 Secret generation MUST use secure randomness

Machine-generated secrets MUST use cryptographically secure randomness.

Secret strength MUST be sufficient for:

- expected lifetime;
- online/offline attack model;
- credential type.

Developers MUST NOT generate credentials using:

- timestamps;
- predictable hashes;
- incremental IDs;
- ordinary pseudorandom utilities.

---

## 2.43 User passwords follow password policy, not generic rotation policy

User-authenticated passwords MUST follow the corpus Authentication standard.

Generic service-secret rotation rules MUST NOT be copied mechanically onto human passwords.

Service credentials, encryption keys, API tokens, and user passwords have different lifecycle requirements.

---

## 2.44 Secret scanning MUST operate before and after commit

Repositories containing application or infrastructure code MUST use automated secret detection.

Detection SHOULD operate at multiple stages:

- developer tooling/pre-commit where practical;
- pull request/CI;
- server-side repository scanning;
- periodic historical scanning.

A single pre-commit hook MUST NOT be the entire control.

---

## 2.45 Scanning MUST cover more than source code

Secret scanning SHOULD include relevant:

- repository history;
- CI logs;
- build artifacts;
- container images;
- infrastructure state;
- configuration bundles;
- package artifacts.

A secret can leak outside `.env` and source files.

---

## 2.46 Scanners MUST combine detection methods

Secret detection SHOULD combine:

- known provider/token patterns;
- structured secret formats;
- private-key signatures;
- high-entropy detection;
- organization-specific patterns.

False positives SHOULD be suppressible through controlled mechanisms.

Developers MUST NOT disable scanning globally merely because one rule is noisy.

---

## 2.47 Scanner allowlists MUST NOT contain the secret itself

Scanner exceptions SHOULD identify safe:

- paths;
- fingerprints;
- test fixtures;
- rule-specific exceptions

without exposing the real secret.

Known fake/test secrets SHOULD be clearly non-production and nonfunctional.

---

## 2.48 A detected real secret MUST be treated as compromised

When a genuine credential is found in:

- source control;
- logs;
- public artifact;
- other unauthorized location,

the primary response MUST be to invalidate the credential.

Deleting the visible string is not sufficient.

The canonical order is:

1. contain exposure where necessary;
2. revoke or rotate the credential;
3. replace dependent consumers;
4. investigate use and access;
5. remove exposed copies where appropriate;
6. document and remediate the root cause.

---

## 2.49 Repository history cleanup is secondary to revocation

Rewriting Git history MAY reduce future accidental disclosure.

It MUST NOT be treated as revocation.

Copies may already exist in:

- forks;
- clones;
- caches;
- CI systems;
- external indexing.

A leaked credential MUST be replaced even when history can be rewritten.

OWASP similarly emphasizes rotation/revocation and removal from exposed locations rather than relying on source-history cleanup alone. citeturn333834search1

---

## 2.50 Leak response MUST assess downstream consequences

Incident response MUST identify:

- what the credential could access;
- when it became exposed;
- where it was replicated;
- who or what accessed it;
- whether it was used;
- what credentials it could mint;
- whether data or systems were modified.

Rotation alone MUST NOT close the incident if compromise may already have caused unauthorized access.

---

## 2.51 Secret values MUST NOT appear in logs

Applications, infrastructure, and secret-management systems MUST prevent plaintext secret logging.

Logging MUST redact:

- authorization headers;
- tokens;
- credentials;
- private keys;
- secret query parameters;
- sensitive connection strings.

Errors MUST NOT print secret objects through generic serialization.

---

## 2.52 Secret values SHOULD NOT appear in telemetry

Secrets MUST NOT be included in:

- analytics events;
- traces;
- crash reports;
- metrics labels;
- APM metadata.

Observability tooling MUST receive identifiers or redacted values rather than secret material.

---

## 2.53 Secret access MUST be audited

Secret-management systems MUST audit security-significant operations.

At minimum, audit events SHOULD capture:

- requesting identity/workload;
- secret/key identifier;
- operation;
- timestamp;
- authorization result;
- source/context;
- key or secret version where relevant.

OWASP specifically recommends auditing who requested secrets, use, updates, expiration, authorization failures, and administrative operations. citeturn333834search1

---

## 2.54 Audit logs MUST NOT contain the secret value

Secret audit logs MUST record access metadata, not plaintext secret material.

A log stating:

`workload X read secret Y`

is appropriate.

A log containing the actual value of secret Y is not.

---

## 2.55 Audit integrity MUST be protected

Secret and key audit logs SHOULD be forwarded to a security-controlled logging system.

A secret administrator SHOULD NOT be able to erase evidence of access without detection.

Audit infrastructure SHOULD support:

- restricted modification;
- defined retention;
- timestamp integrity;
- centralized monitoring.

---

## 2.56 High-risk secret events SHOULD alert

Security monitoring SHOULD detect anomalous events such as:

- unusual human retrieval of production secrets;
- bulk secret reads;
- repeated denied access;
- use from unexpected workloads;
- root-key administration;
- policy changes;
- break-glass access;
- attempted use of revoked credentials.

Alert thresholds MUST be tuned to actionable security events rather than every normal workload retrieval.

---

## 2.57 Local development MUST use non-production credentials

Developers MUST NOT receive production secrets merely to run an application locally.

Local environments SHOULD use:

- dedicated development accounts;
- development databases;
- development API credentials;
- local emulators;
- short-lived federated credentials.

Production data and production authority MUST remain separately controlled.

---

## 2.58 `.env` files are local convenience, not enterprise secret management

A local `.env` file MAY be used for low-risk development secrets when no better developer experience is available.

Real `.env` files containing secrets MUST:

- remain untracked;
- be ignored by source control;
- have restrictive local permissions where supported.

Repositories MAY include:

`.env.example`

containing:

- variable names;
- documented placeholders;
- non-sensitive example values.

Example files MUST NOT contain real credentials.

---

## 2.59 Local secret stores SHOULD be preferred

Where practical, local tooling SHOULD use:

- OS credential/key stores;
- developer secret-manager sessions;
- SSO/federated identity;
- short-lived CLI credentials.

Copying persistent production-like credentials into developer home directories SHOULD be avoided.

---

## 2.60 Development credentials MUST have limited authority

Development credentials SHOULD:

- access development systems only;
- be individually attributable;
- have short lifetimes where practical.

A development credential MUST NOT become a hidden path into production.

---

## 2.61 CI/CD MUST use workload-scoped identity

CI/CD jobs SHOULD authenticate through:

- short-lived federation;
- workload identity;
- narrowly scoped job credentials.

Persistent cloud access keys stored permanently in CI settings SHOULD be eliminated where federation is supported.

---

## 2.62 CI/CD secret scope MUST follow job requirements

A build or deployment job MUST receive only the secrets required by that job.

Pull requests from untrusted forks MUST NOT automatically receive privileged repository secrets.

Secret availability rules MUST account for:

- forked code;
- external contributors;
- modified pipeline definitions;
- reusable workflows.

---

## 2.63 Secrets MUST be masked in CI output

CI/CD platforms MUST redact known secrets from job output where supported.

Masking is a defense-in-depth control.

It MUST NOT be treated as permission to print a secret intentionally.

Encoding, splitting, or transforming a secret MUST NOT be used to circumvent log-protection controls.

---

## 2.64 Infrastructure state MUST be treated as sensitive

Infrastructure-as-code state MAY contain:

- passwords;
- generated keys;
- connection strings;
- other sensitive values.

State files MUST be stored with:

- encryption;
- restricted access;
- audit controls.

Marking a value as `sensitive` in a tool's UI does not necessarily remove it from state storage.

Teams MUST understand the persistence semantics of their infrastructure tooling.

---

## 2.65 Kubernetes and orchestrator secrets require managed protection

Base64 encoding MUST NOT be considered encryption.

Orchestrator secret objects MUST use:

- encryption at rest where supported;
- namespace/workload-scoped access;
- managed secret integration where appropriate.

Broad cluster read access MUST NOT imply broad secret-read permission.

---

## 2.66 Database credentials MUST use narrow roles

Applications MUST NOT normally connect using:

- database superuser;
- database owner;
- migration administrator

for ordinary runtime queries.

Runtime credentials SHOULD be limited to the operations required by the service.

Schema migration credentials SHOULD be separate where elevated rights are required.

---

## 2.67 Third-party secrets require ownership

Every external API key or OAuth client secret MUST have:

- internal owner;
- provider/account reference;
- scope;
- environment;
- rotation/revocation instructions.

An abandoned integration credential with no owner is non-conforming.

---

## 2.68 Certificates and private keys require lifecycle management

TLS certificates and associated private keys MUST have:

- issuance process;
- renewal;
- expiry monitoring;
- revocation/replacement process.

Certificate renewal SHOULD be automated.

Private keys MUST follow the relevant key-custody requirements.

Public certificates are not secrets, but their identity and validity remain security-sensitive.

---

## 2.69 Signing keys require stronger integrity controls

Keys used to sign:

- software;
- releases;
- tokens;
- certificates;
- high-impact messages

SHOULD receive stronger custody than ordinary application credentials when compromise would enable trusted forgery.

Signing operations SHOULD occur in KMS/HSM-backed systems where practical.

---

## 2.70 Key rotation MUST preserve decryption requirements

Rotating a KEK or encryption key MUST NOT accidentally make retained ciphertext undecryptable.

Systems MUST define whether rotation means:

- changing the active key for new writes;
- rewrapping DEKs;
- re-encrypting existing data;
- retaining older decrypt-only key versions.

Key rotation MUST therefore be designed separately from simple password replacement.

---

## 2.71 KEK rotation SHOULD avoid unnecessary bulk re-encryption

Envelope encryption SHOULD allow a KEK change to be handled through DEK rewrapping where appropriate rather than re-encrypting every data payload.

The exact strategy depends on:

- threat model;
- key compromise;
- provider capabilities;
- compliance requirements.

If plaintext data may have been exposed because a DEK was compromised, merely rewrapping that DEK is insufficient.

---

## 2.72 Compromise scope MUST determine re-encryption

If only a KEK is rotated routinely without compromise, existing wrapped DEKs MAY remain valid according to the cryptographic design.

If plaintext DEKs or underlying plaintext data may have been compromised, the affected data SHOULD be re-encrypted using new DEKs where required by the incident response.

Rotation MUST NOT be confused with retroactively undoing compromise.

---

## 2.73 Key identifiers MAY be stored with ciphertext

Ciphertext SHOULD identify enough non-secret metadata to locate the correct decryption key/version.

A key identifier is generally not secret.

Security MUST NOT depend on hiding the key ID.

The key value remains protected by the key-management boundary.

---

## 2.74 Algorithm identifiers and versions MUST be stored where required

Encrypted application data SHOULD contain or reference enough versioned metadata to support safe decryption after cryptographic evolution.

The system SHOULD be able to distinguish:

- encryption scheme;
- key version;
- format version.

Cryptographic migration MUST NOT depend on guessing which algorithm was used.

---

## 2.75 Secret deletion MUST account for copies

Deleting a secret from the central manager does not automatically remove it from:

- running process memory;
- caches;
- local developer files;
- backups;
- logs;
- CI output;
- historical artifacts.

Revocation MUST terminate authority independently from attempts to remove every copy.

Deletion and revocation are different lifecycle controls.

---

## 2.76 Disaster recovery MUST include key dependencies

Disaster-recovery exercises MUST account for secret and key-management infrastructure.

A recovered application that cannot retrieve its required keys is not recovered.

DR planning SHOULD cover:

- vault/KMS availability;
- region failure;
- replicated secrets;
- HSM recovery;
- key backups where applicable;
- identity dependencies.

---

## 2.77 Secret-manager outage behavior MUST be defined

Applications SHOULD define whether secrets are:

- cached temporarily;
- refreshed proactively;
- unavailable on manager outage.

Caching decisions MUST balance:

- availability;
- revocation speed;
- secret exposure.

Long-lived plaintext caches MUST NOT be introduced merely to hide secret-manager reliability problems.

---

## 2.78 Secret administrative UI MUST minimize disclosure

Operator interfaces SHOULD show:

- secret identifier;
- metadata;
- status;
- version;
- rotation information;

without displaying plaintext by default.

Plaintext reveal SHOULD require explicit interaction and authorization where reveal is permitted at all.

Critical keys SHOULD normally be non-revealable.

---

## 2.79 Secret values SHOULD NOT be re-rendered after entry

When an administrator submits a new secret manually, the application SHOULD avoid displaying the full value again.

The interface MAY show:

- masked value;
- fingerprint;
- last few characters

where operational identification requires it.

The full secret SHOULD NOT remain casually visible in history screens.

---

## 2.80 Copy and reveal events SHOULD be auditable where material

For high-impact administrative secrets, explicit reveal or copy actions SHOULD be recorded as security events.

The UI MUST NOT use analytics instrumentation that sends the secret value when tracking such actions.

---

## 2.81 shadcn/ui baseline for management surfaces

shadcn/ui MUST remain the baseline for secret-management administrative UI.

Preferred mappings include:

| Concern | Baseline |
|---|---|
| Secret inventory | `Table`, canonical data-table pattern |
| Classification/status | `Badge` |
| Secret metadata editing | `Form`, `Input`, `Select` |
| Sensitive input | password-type `Input` with controlled reveal |
| Create/rotate action | `Dialog`, `Sheet` where appropriate |
| Destructive revoke/delete | `AlertDialog` |
| Security warning | `Alert` |
| Access policy | standard form and table components |
| Audit event details | `Table`, `Sheet` |
| Supplementary guidance | `Tooltip`, `Popover` |
| Loading | `Skeleton`, `Progress` where meaningful |

Component presentation MUST NOT weaken backend security requirements.

---

## 2.82 Sensitive-value reveal MUST be accessible

Reveal controls MUST:

- have an accessible name;
- expose current state;
- be keyboard operable.

A reveal icon MUST NOT rely on icon shape alone for assistive-technology meaning.

Secret status and classification MUST NOT be communicated through colour alone.

---

## 2.83 Clipboard handling MUST be deliberate

Copy-to-clipboard MAY be supported for secrets intended for human retrieval.

The interface SHOULD:

- clearly indicate successful copy;
- avoid displaying the value unnecessarily.

Applications SHOULD NOT claim that a copied secret has been securely erased from the OS clipboard unless the platform actually provides such assurance.

For critical keys, clipboard export SHOULD generally not be available.

---

## 2.84 Secret input forms MUST avoid accidental retention

Secret-entry fields MUST NOT:

- populate browser-visible URLs;
- be placed in query strings;
- become ordinary analytics events.

Autocomplete policy MUST follow the credential type and Authentication standard.

Validation errors MUST NOT echo complete secret values.

---

## 2.85 Security state MUST be authoritative

A frontend displaying:

`Rotated`

MUST reflect a completed backend rotation state.

A generated or optimistic status MUST NOT falsely indicate that:

- a secret was revoked;
- a key was destroyed;
- access was removed.

Security state MUST be verified by authoritative infrastructure.

---

## 2.86 Testing MUST include rotation and revocation

Secret-management tests SHOULD cover:

- successful retrieval;
- access denial;
- expired secret;
- rotation;
- overlap migration;
- revocation;
- secret-manager outage;
- audit event generation.

A system that only works with an indefinitely valid static credential has not demonstrated secret lifecycle readiness.

---

## 2.87 Key-management tests MUST include recovery

Key-management systems SHOULD test:

- encryption;
- decryption;
- key-version transition;
- disabled key behavior;
- compromised/revoked state;
- recovery where intended.

Backup key recovery MUST be tested rather than assumed.

---

## 2.88 Leak-response exercises SHOULD be performed

Teams handling High or Critical secrets SHOULD periodically exercise a simulated leak.

The exercise SHOULD verify the ability to:

- identify owners;
- revoke quickly;
- locate consumers;
- deploy replacement credentials;
- search for additional exposure;
- review audit history.

An undocumented emergency rotation procedure is not sufficient.

---

# 3. Anti-patterns

The following are non-conforming unless an exceptional documented requirement provides a stronger justification.

## 3.1 Inventory

- Secrets with no owner.
- Production credentials whose purpose is unknown.
- Key records without algorithm or purpose.
- Secret inventory containing plaintext values.
- No record of which applications consume a credential.

## 3.2 Storage

- Secrets committed to Git.
- Secrets in wiki pages or tickets.
- Long-lived credentials inside container images.
- API keys embedded in frontend bundles.
- Private keys stored in ordinary application tables as plaintext.
- Treating Base64 as encryption.
- Treating `.env` as the enterprise source of truth.

## 3.3 Environment variables

- Secrets hardcoded in Docker `ENV`.
- Secrets passed in shell command arguments.
- Dumping the entire environment into diagnostic logs.
- Assuming environment variables are invisible to other local processes or diagnostic systems.

## 3.4 Access control

- Every engineer able to read every production secret.
- Wildcard access to an entire vault namespace.
- Runtime service able to change its own secret-management policy.
- Shared production administrator credentials.
- Human retrieval where workload identity would suffice.

## 3.5 Lifecycle

- Secrets with no expiration or rotation plan.
- Rotation requiring manual copy/paste across production servers.
- Revoking compromised credentials only at the next maintenance window.
- Keeping previous credentials active indefinitely.
- Treating deletion of a leaked Git commit as incident containment.

## 3.6 Cryptographic keys

- Storing master keys beside encrypted data.
- Exporting root keys into application configuration.
- One key used for every application and environment.
- Reusing signing keys as data-encryption keys.
- Deleting decryption keys before retained ciphertext expires.
- Unreviewed custom cryptographic key derivation.

## 3.7 Envelope encryption

- Persisting plaintext DEKs.
- Using one global DEK for all customer data without justification.
- Encrypting large datasets directly through KMS for convenience where envelope encryption is required.
- Reusing AEAD nonces in a mode requiring uniqueness.
- Storing ciphertext without enough algorithm/key-version metadata to decrypt it safely later.

## 3.8 Key custody

- One person can export, destroy, and alter audit policy for a root key.
- Root keys routinely handled in plaintext by application developers.
- HSM-protected key exported to an ordinary local file to simplify testing.
- Recovery copies with weaker protection than primary keys.

## 3.9 Scanning

- Secret scanning only after merge.
- Secret scanning only for one cloud provider.
- Disabling scanning because of false positives.
- Real credentials used as scanner test fixtures.
- Assuming a private repository makes leaked credentials safe.

## 3.10 Incident response

- Rotating the visible credential but ignoring credentials it could mint.
- Removing leaked values without checking audit logs.
- Assuming the secret was unused because no incident alert fired.
- Rewriting Git history before revoking the credential.
- Closing the incident immediately after replacement without assessing impact.

## 3.11 Local development

- Production database credentials in developer `.env`.
- Shared team development passwords.
- Developers copying production secret-manager exports locally.
- Committing `.env` because the repository is private.
- Development API keys with production scope.

## 3.12 CI/CD

- Permanent cloud administrator key stored in CI.
- Untrusted pull requests receiving deployment credentials.
- Pipeline scripts printing credentials for debugging.
- Deployment job with access to every environment's secrets.
- Secret persisted in build artifacts after the job ends.

## 3.13 Logging

- Authorization tokens in access logs.
- Database passwords in exception traces.
- Private keys in debug dumps.
- Secret values in analytics.
- Audit events that record the actual secret being retrieved.

## 3.14 UI

- Displaying every secret value in an admin table.
- Secret status communicated only by colour.
- Copying root-key material through browser clipboard.
- Optimistically displaying `Revoked` before backend completion.
- Destructive key deletion without explicit confirmation and impact context.

---

# 4. Checklist

## 4.1 Inventory and classification

- [ ] Every production secret has a stable identifier.
- [ ] Every secret has an owner.
- [ ] Consumers are documented.
- [ ] Environment and purpose are recorded.
- [ ] Secret classification reflects compromise impact.
- [ ] Rotation and revocation mechanisms are documented.
- [ ] Key inventory records algorithm, purpose, version, cryptoperiod, and custody.
- [ ] Inventory contains metadata rather than plaintext secrets.

## 4.2 Storage

- [ ] Persistent secrets use an approved Secret Manager/Vault.
- [ ] Cryptographic keys use appropriate KMS/HSM custody.
- [ ] Critical keys are non-exportable where practical.
- [ ] Secrets are absent from source control.
- [ ] Secrets are absent from container images and frontend bundles.
- [ ] Environment variables are used only as an intentional runtime delivery mechanism.
- [ ] Secrets are not passed through process arguments.
- [ ] Ordinary configuration contains secret references rather than values where practical.

## 4.3 Identity and access

- [ ] Workload identity replaces bootstrap secrets where supported.
- [ ] Access follows least privilege.
- [ ] Production and development access are separated.
- [ ] Human plaintext retrieval is exceptional.
- [ ] Shared human credentials are absent.
- [ ] Read/use and administrative privileges are separated.
- [ ] Critical operations use stronger approval/custody where required.

## 4.4 Secret lifecycle

- [ ] Every static production secret has a lifetime policy.
- [ ] Dynamic credentials are used where practical.
- [ ] Routine rotation is automated.
- [ ] Consumers can adopt replacements safely.
- [ ] Old credential overlap is bounded.
- [ ] Revocation is possible independently from scheduled rotation.
- [ ] Compromised credentials can be replaced rapidly.

## 4.5 Key lifecycle

- [ ] Every key has a defined purpose.
- [ ] Cryptoperiod is risk-based.
- [ ] Key lifecycle states are explicit.
- [ ] Key rotation preserves required decryption capability.
- [ ] Backup/recovery requirements are defined.
- [ ] Key destruction identifies dependent retained data.
- [ ] Critical key custody uses appropriate separation of duties.

## 4.6 Envelope encryption

- [ ] DEKs use secure random generation.
- [ ] Plaintext DEKs are never persisted.
- [ ] Appropriate authenticated encryption is used.
- [ ] KEKs remain in managed cryptographic custody.
- [ ] Stored ciphertext identifies the necessary key/version and algorithm metadata.
- [ ] Key hierarchy limits blast radius.
- [ ] Routine KEK rotation has a defined rewrap/migration strategy.
- [ ] Compromise response considers whether full data re-encryption is required.

## 4.7 Secret scanning

- [ ] Pre-commit or developer scanning is available where practical.
- [ ] CI/repository scanning is enforced.
- [ ] Historical scanning occurs.
- [ ] Relevant images/artifacts/state/logs are covered.
- [ ] Provider-specific and generic detection methods are used.
- [ ] False-positive suppression is controlled.
- [ ] Genuine findings trigger compromise response.

## 4.8 Incident response

- [ ] Leak runbook prioritizes revocation.
- [ ] Credential consumers can be identified quickly.
- [ ] Downstream credential-minting capability is assessed.
- [ ] Audit logs can establish relevant usage.
- [ ] Exposed copies are removed after authority is revoked.
- [ ] Root cause is remediated.
- [ ] High-risk teams test the process periodically.

## 4.9 Local development

- [ ] Production secrets are not needed for ordinary local development.
- [ ] Development credentials are environment-scoped.
- [ ] `.env` containing real values is ignored by source control.
- [ ] `.env.example` contains placeholders only.
- [ ] OS credential store, federation, or short-lived developer credentials are preferred where available.
- [ ] Local credentials have limited production authority—ideally none.

## 4.10 CI/CD

- [ ] CI uses workload/federated identity where supported.
- [ ] Job credentials are scoped.
- [ ] Untrusted forks cannot retrieve protected secrets.
- [ ] CI logs mask secrets as defense in depth.
- [ ] Pipelines do not intentionally print secrets.
- [ ] Secrets are not retained in build artifacts.
- [ ] Production deployment rights are separated from ordinary build rights.

## 4.11 Logging and audit

- [ ] Secret values never appear in application logs.
- [ ] Secret values never appear in telemetry.
- [ ] Secret retrieval and administrative actions are audited.
- [ ] Audit logs record identity, object, operation, outcome, and timestamp.
- [ ] Audit logs do not contain plaintext secret material.
- [ ] Audit integrity and retention are controlled.
- [ ] Break-glass and critical-key operations alert appropriately.

## 4.12 Infrastructure

- [ ] Infrastructure state is treated as sensitive.
- [ ] Orchestrator secrets use encryption and workload-scoped access.
- [ ] Runtime database credentials do not use administrative database roles.
- [ ] Certificates have automated renewal where practical.
- [ ] Third-party credentials have an owner and revocation runbook.
- [ ] Secret-manager availability is included in disaster recovery.

## 4.13 Operator UI and accessibility

- [ ] Secret values are masked by default.
- [ ] Critical keys cannot be casually revealed.
- [ ] Reveal/copy controls are appropriately authorized.
- [ ] Reveal controls expose accessible state.
- [ ] Secret classification does not rely on colour alone.
- [ ] Rotate/revoke/delete actions use explicit confirmation where appropriate.
- [ ] Security status reflects authoritative backend state.
- [ ] shadcn/ui is the component baseline.

## 4.14 Testing

- [ ] Secret retrieval success and denial are tested.
- [ ] Rotation is tested.
- [ ] Revocation is tested.
- [ ] Expiry is tested.
- [ ] Secret-manager outage is tested.
- [ ] Audit-event creation is tested.
- [ ] Encryption-key version transition is tested.
- [ ] Recovery is tested where recovery is intended.
- [ ] Secret leak response has been exercised for high-impact systems.

## 4.15 Corpus alignment

- [ ] Security owns identity, authorization, incident response, and cryptographic policy.
- [ ] Data & Database governs encryption and database credential scope.
- [ ] API governs service identity, tokens, signing, and credential exchange.
- [ ] State Management prevents secrets from becoming normal frontend/client state.
- [ ] Forms & Validation governs secret-entry and administrative workflows.
- [ ] Accessibility applies to security administration interfaces.
- [ ] Design Tokens govern security status, warnings, and destructive presentation.
- [ ] shadcn/ui provides the component baseline.
- [ ] Configuration contains references, not embedded production secrets.
- [ ] Infrastructure provides managed identity, KMS/HSM, vaulting, and runtime delivery.

---

# 5. Canonical summary

A Gold Standard 2026 secret-management architecture MUST know what secrets exist, who owns them, what they authorize, where they are stored, who can retrieve them, how they rotate, and how they are revoked.

Secrets MUST be managed through dedicated lifecycle infrastructure rather than scattered through source code, configuration files, build systems, containers, logs, and developer machines. OWASP's current guidance likewise emphasizes centralized management, least privilege, automated lifecycle controls, revocation, and auditing. citeturn333834search1

Secret Manager/Vault and KMS/HSM serve different purposes. Credentials and secret values SHOULD reside in managed secret stores; cryptographic keys SHOULD receive appropriate KMS/HSM custody. Critical key material SHOULD remain non-exportable whenever practical.

Environment variables MAY be a last-mile runtime delivery mechanism but MUST NOT be treated as the canonical secret store.

Workloads SHOULD authenticate using workload identity and retrieve only the secrets required by that identity. Dynamic, short-lived credentials SHOULD replace long-lived static credentials wherever the supporting system permits.

Human plaintext access SHOULD be exceptional. Shared production credentials MUST NOT be the normal administrative model.

Rotation and revocation MUST remain separate concepts. Rotation maintains healthy credentials; revocation terminates trust. A compromised credential MUST be invalidated promptly rather than waiting for its scheduled rotation.

Cryptographic-key lifecycle MUST be purpose- and risk-specific. NIST SP 800-57 Part 1 Rev. 5 remains the current finalized NIST general key-management guidance as of September 2026; Revision 6 remains an Initial Public Draft. citeturn532039search2turn532039search0

Application-layer encryption SHOULD use envelope encryption at scale. Data is encrypted with DEKs; DEKs are wrapped by centrally managed KEKs. Plaintext DEKs MUST NOT be persisted, and high-value KEKs SHOULD remain inside managed cryptographic custody. citeturn333834search0turn333834search2

Key hierarchy MUST limit blast radius. Root and high-impact keys SHOULD receive the strongest custody, non-exportability, audit, and separation-of-duty controls.

Secret scanning MUST operate across the development lifecycle, not solely at commit time. A genuine detected credential MUST be assumed compromised. Revocation takes priority over removing the visible leaked string.

Local development MUST use development-scoped credentials rather than production secrets. `.env` MAY be a local convenience but is not a production secret-management architecture.

CI/CD SHOULD use short-lived workload/federated identities. Pipeline credentials MUST be scoped to the job and protected from untrusted code.

Plaintext secrets MUST NOT appear in source, logs, telemetry, infrastructure artifacts, command-line arguments, or frontend applications.

Every security-significant secret and key operation MUST be auditable without recording the secret itself. High-risk access, break-glass use, policy changes, and root-key operations SHOULD be actively monitored.

shadcn/ui is the canonical component baseline for operator-facing secret-management surfaces. UI controls MUST preserve least privilege, explicit confirmation, accessible status communication, and authoritative backend state rather than attempting to implement security through presentation.

**Canonical rule:** a secret or cryptographic key is conforming only when its purpose, owner, storage, access, lifetime, rotation, revocation, custody, recovery, auditability, and compromise response are defined before production use—and no security boundary depends on keeping an unmanaged copy hidden.

The document intentionally avoids universal “rotate every N days” rules. Modern secret and key management is **risk- and credential-type-specific**: short-lived dynamic credentials should expire naturally, while cryptographic key cryptoperiods must account for purpose, exposure, retained ciphertext, recovery, and compromise impact.
