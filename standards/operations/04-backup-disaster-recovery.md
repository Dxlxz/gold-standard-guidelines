---
id: "backup-disaster-recovery"
title: "Backup & Disaster Recovery Guidelines — Gold Standard"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["operations", "backup", "disaster", "recovery"]
applies_to: ["infra"]
related: []
legacy_number: 28
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 82263
provenance: baseline

---

The baseline is aligned with NIST contingency-planning practice—business impact analysis, recovery priorities, recovery strategies, testing/exercises, and plan maintenance—and with CISA guidance to keep critical backups encrypted, offline/isolated where appropriate, and regularly restore-tested. NIST CSF 2.0 also retains **Recover** as a core cybersecurity function. citeturn420512search1turn420512search9turn420512search0

# Backup & Disaster Recovery Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical organizational standard for:

- backups;
- restoration;
- disaster recovery;
- business continuity;
- recovery objectives;
- RPO;
- RTO;
- maximum tolerable disruption;
- database recovery;
- point-in-time recovery;
- snapshots;
- transaction logs;
- replication;
- regional recovery;
- infrastructure recovery;
- application recovery;
- object-storage recovery;
- queue/event recovery;
- credential recovery;
- IAM recovery;
- encryption-key recovery;
- DNS recovery;
- certificate recovery;
- configuration recovery;
- artifact recovery;
- SaaS recovery;
- ransomware resilience;
- backup immutability;
- offline backups;
- backup testing;
- disaster exercises;
- failover;
- failback;
- recovery runbooks;
- crisis operations;
- business continuity.

The objective is to ensure that a production system can survive:

```text
Human error
Software defect
Data corruption
Infrastructure failure
Availability-zone failure
Regional failure
Provider outage
Credential loss
Security incident
Ransomware
Accidental deletion
Malicious deletion
Natural disaster
Third-party outage
```

without relying on undocumented heroics.

The core principle is:

> **A backup is valuable only if the organization can restore the correct data, into a trusted environment, within the required recovery objectives.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented exception exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
System
Data
Recovery impact
Security impact
Compensating controls
Owner
Review date
```

---

# 3. Backup, HA, DR, and Business Continuity Are Different

These concepts MUST remain distinct.

```text
Backup
→ Creates recoverable historical copies.

High Availability
→ Reduces service interruption from routine failures.

Disaster Recovery
→ Restores service after a major disruption.

Business Continuity
→ Keeps the organization able to perform critical business functions.
```

One does not automatically provide the others.

---

# 4. Replication Is Not Backup

Replication copies current state.

If the primary system receives:

```text
DELETE all customers
```

replication may faithfully reproduce:

```text
DELETE all customers
```

in the replica.

Therefore:

> **Replication protects availability. Historical recovery protects recoverability.**

Production-critical state commonly needs both.

---

# 5. Backup Is Not High Availability

A database backup from six hours ago does not prevent six hours of current downtime.

---

# 6. High Availability Is Not Disaster Recovery

A multi-zone database may survive a host/zone failure but not necessarily:

```text
regional outage
malicious deletion
logical corruption
credential compromise
```

---

# 7. Disaster Recovery Is Not Business Continuity

Restoring servers does not by itself restore:

```text
people
communications
customer support
business decisions
vendor coordination
manual workarounds
```

---

# 8. Recovery Starts With Business Requirements

Recovery architecture MUST begin with business impact.

Correct order:

```text
Business function
↓
Impact of interruption
↓
Critical dependencies
↓
RPO / RTO
↓
Recovery architecture
↓
Backup / replication technology
```

Do not begin with:

```text
Let's back everything up every night.
```

---

# 9. Business Impact Analysis

Critical products SHOULD undergo a Business Impact Analysis or equivalent recovery assessment.

---

# 10. BIA Questions

For each important service ask:

```text
What business process depends on it?
How long can it be unavailable?
How much data can be lost?
What financial impact occurs?
What contractual impact occurs?
What safety/security impact occurs?
Which systems must recover first?
Which vendors are required?
Which people are required?
```

---

# 11. Criticality Classification

Services SHOULD be classified into recovery tiers.

Example:

```text
Tier 0 — Existential / safety / identity / recovery infrastructure
Tier 1 — Critical business service
Tier 2 — Important service
Tier 3 — Standard service
Tier 4 — Noncritical / reconstructible
```

Exact tier names MAY vary.

---

# 12. Recovery Tier Determines Controls

Higher criticality SHOULD result in stronger:

```text
backup frequency
redundancy
restore testing
replication
automation
documentation
exercise frequency
```

---

# 13. Do Not Give Everything Tier 0

If every system is:

```text
mission critical
```

recovery prioritization becomes meaningless.

---

# 14. Dependency Criticality

A low-visibility dependency may be Tier 0 if many critical services depend on it.

Examples:

```text
identity provider
DNS
secret manager
container registry
database
network
```

---

# 15. Recovery Point Objective

**RPO** defines the maximum acceptable amount of data loss measured in time.

Example:

```text
RPO = 15 minutes
```

means recovery architecture should be capable of restoring state with no more than approximately 15 minutes of acceptable data loss under the defined scenario.

---

# 16. RPO Is a Business Objective

RPO MUST NOT be chosen merely because:

```text
backups currently run once a day
```

The business objective determines the architecture.

---

# 17. RPO Zero

`RPO = 0` is expensive and difficult.

It may require:

```text
synchronous replication
transactional durability across failure domains
special application architecture
```

Do not declare RPO zero casually.

---

# 18. Recovery Time Objective

**RTO** defines the target maximum time to restore an acceptable level of service after the relevant disruption.

Example:

```text
RTO = 2 hours
```

---

# 19. RTO Includes More Than Restore Command

RTO must consider:

```text
Detection
Decision
Access
Infrastructure creation
Data restoration
Application deployment
Validation
Traffic switch
```

---

# 20. Detection Time Matters

If:

```text
RTO = 1 hour
```

but the outage is not detected for 45 minutes, only 15 minutes remain for operational recovery.

---

# 21. Recovery Objectives Need Scenarios

RPO/RTO SHOULD be defined against explicit scenarios.

Example:

```text
Single DB instance loss
Regional cloud outage
Logical corruption
Ransomware
Complete cloud account compromise
```

Different scenarios may have different achievable recovery objectives.

---

# 22. Do Not Promise One Universal RTO

Recovering from:

```text
pod crash
```

and:

```text
complete account compromise
```

are fundamentally different events.

---

# 23. Maximum Tolerable Disruption

Critical business processes SHOULD define the maximum duration beyond which disruption becomes unacceptable.

RTO should be meaningfully below this boundary.

---

# 24. Recovery Time Capability

Distinguish:

```text
Target RTO
Measured restore time
Worst observed exercise time
```

Do not advertise the target as demonstrated capability.

---

# 25. Recovery Point Capability

Likewise distinguish:

```text
Target RPO
Configured backup/replication interval
Verified recoverable point
```

---

# 26. Recovery Objective Ownership

RPO and RTO require business and technical ownership.

Engineering MUST NOT independently promise business recovery objectives without stakeholder agreement.

---

# 27. Recovery Cost Tradeoff

Generally:

```text
Lower RPO
+
Lower RTO
→
Higher cost
+
Higher complexity
```

Recovery objectives SHOULD reflect actual business value.

---

# 28. Canonical Recovery Strategy Spectrum

Conceptually:

```text
Backup and restore
↓
Pilot light
↓
Warm standby
↓
Hot standby
↓
Active-active
```

with generally increasing:

```text
cost
complexity
operational burden
```

and decreasing achievable recovery time.

---

# 29. Backup and Restore

Suitable when acceptable RTO permits infrastructure and data restoration after disaster.

---

# 30. Pilot Light

A minimal critical core remains continuously available in the recovery location while other components are created/scaled during recovery.

---

# 31. Warm Standby

A functional but reduced-capacity copy remains running and can be scaled up during disaster recovery.

---

# 32. Hot Standby

A near-full-capacity standby is ready for rapid traffic transition.

---

# 33. Active-Active

Multiple locations actively serve production.

It requires substantial:

```text
routing
data consistency
conflict handling
operations
testing
```

discipline.

---

# 34. DR Strategy Is Per Workload

Not every system needs the same recovery architecture.

Example:

```text
Authentication
→ warm standby

Billing report generator
→ backup and restore
```

may be entirely reasonable.

---

# 35. Backup Policy

Every stateful production service MUST have an explicit backup/recovery policy unless the state is intentionally reconstructible.

---

# 36. Backup Policy Content

The policy SHOULD specify:

```text
What is backed up
Why
Frequency
Retention
Location
Encryption
Immutability
Owner
Restore method
RPO
RTO
Testing frequency
```

---

# 37. Backup Inventory

The organization SHOULD maintain an inventory of critical backup sets.

---

# 38. Backup Ownership

Every critical backup has an owner responsible for:

```text
success
monitoring
restore testing
retention
security
```

---

# 39. Backup Coverage

Do not assume:

```text
database backed up
```

means:

```text
product recoverable
```

A service may also depend on:

```text
files
object storage
configuration
secrets
encryption keys
search indexes
schemas
```

---

# 40. State Inventory

Every service SHOULD classify its state as:

```text
Authoritative
Derived
Ephemeral
Reconstructible
Backup-required
```

---

# 41. Authoritative State

Authoritative business data generally requires independent recoverability.

---

# 42. Derived State

Derived data MAY be reconstructed instead of backed up if:

```text
source survives
reconstruction time meets RTO
reconstruction cost is acceptable
```

---

# 43. Search Index

Search indexes often SHOULD be rebuilt from authoritative records rather than treated as primary backup sources.

---

# 44. Cache

Ordinary caches SHOULD generally be reconstructible and need no backup.

---

# 45. Queue State

Queue recovery policy depends on message/business semantics.

Critical pending work may require durable infrastructure and explicit recovery handling.

---

# 46. Backup Types

Common mechanisms include:

```text
Full backup
Incremental backup
Differential backup
Snapshot
Transaction-log backup
Point-in-time recovery
Continuous backup
Application-level export
```

---

# 47. Full Backup

A full backup contains a complete recoverable dataset at a point in time.

---

# 48. Incremental Backup

An incremental backup stores changes since the relevant prior backup.

It can reduce storage/time but may increase restore-chain complexity.

---

# 49. Differential Backup

A differential backup stores changes since the last full backup.

---

# 50. Snapshot

A snapshot captures storage/database state according to platform semantics.

A snapshot is not automatically:

```text
application consistent
portable
independent
immutable
```

---

# 51. Crash-Consistent Snapshot

A crash-consistent snapshot approximates sudden machine power loss.

Applications must tolerate that recovery state.

---

# 52. Application-Consistent Snapshot

Application-consistent snapshots coordinate application/storage state so related data is captured coherently.

Use where consistency requirements demand it.

---

# 53. Database Transaction Logs

Database WAL/binlog/redo-log style mechanisms MAY permit fine-grained point-in-time recovery.

---

# 54. Point-in-Time Recovery

PITR allows restoration to a time before:

```text
corruption
accidental deletion
bad migration
```

subject to retained history.

---

# 55. PITR Is Critical for Logical Failure

Replication alone may replicate corruption immediately.

PITR provides a historical escape point.

---

# 56. Backup Frequency

Backup frequency MUST be sufficient to satisfy the relevant RPO.

---

# 57. Daily Backup Cannot Meet Hourly RPO

Example:

```text
RPO = 1 hour
Backup = once per 24 hours
```

is not compliant unless another recovery mechanism closes the gap.

---

# 58. Backup Windows

Backup operations SHOULD avoid unacceptable:

```text
latency
locking
resource consumption
```

for production workloads.

---

# 59. Online Backup

Prefer backup methods designed for online production operation where downtime is unacceptable.

---

# 60. Backup Consistency

Backups MUST provide a logically valid restore state.

Backing up unrelated files independently may not preserve cross-system consistency.

---

# 61. Distributed Transaction State

Systems spanning multiple databases require a deliberate strategy for coherent recovery.

---

# 62. Independent Database Backups

If two databases participate in one business invariant, restoring them to unrelated points in time can create corruption.

---

# 63. Recovery Consistency Point

Where cross-system consistency matters, define:

```text
common snapshot
event checkpoint
reconciliation process
```

or other recovery boundary.

---

# 64. Backup Storage Separation

Critical backups SHOULD be stored in a failure domain independent from the primary system.

---

# 65. Same-Disk Backup Is Not Backup

A copy on the same disk does not protect against disk loss.

---

# 66. Same-Server Backup Is Weak

A backup on the same server does not protect against:

```text
host failure
ransomware
admin mistake
```

---

# 67. Same-Account Backup Risk

Backups stored under the same unrestricted cloud administration boundary can be deleted with production resources.

---

# 68. Cross-Account Backup

Critical cloud backups SHOULD consider a separate protected account/project/subscription or vault boundary.

---

# 69. Cross-Region Backup

Critical workloads SHOULD consider geographically separate backup copies when regional disasters are in scope.

---

# 70. Residency Still Applies

Backup locations MUST comply with:

```text
data residency
privacy
contract
regulatory
```

requirements.

---

# 71. Backup Copy Strategy

A useful resilience heuristic is to maintain multiple independent copies using more than one failure domain or storage mechanism.

No numerical backup rule substitutes for threat modeling.

---

# 72. Offline Backup

Critical recovery data SHOULD include offline or otherwise operationally isolated copies where ransomware/destructive compromise is a realistic threat.

---

# 73. Offline Meaning

Offline means attackers controlling normal production systems cannot readily:

```text
modify
encrypt
delete
```

the copy.

---

# 74. Immutable Backup

Backup systems SHOULD support immutability where appropriate.

Immutability prevents modification/deletion for the configured retention period.

---

# 75. Immutability Is Not the Same as Encryption

```text
Encryption
→ prevents unauthorized reading.

Immutability
→ prevents modification/deletion.
```

Critical backups may require both.

---

# 76. Immutable Retention

Immutability periods MUST align with:

```text
recovery needs
privacy
legal holds
storage cost
```

---

# 77. Administrative Separation

Backup deletion privileges SHOULD be separated from ordinary production administration where risk warrants.

---

# 78. Backup Credentials

Production application credentials SHOULD NOT automatically grant backup destruction privileges.

---

# 79. Backup Administrator

Backup administration SHOULD be least-privileged and auditable.

---

# 80. MFA

Human access to critical backup management MUST use strong MFA.

---

# 81. Ransomware Recovery

Ransomware architecture SHOULD assume attackers may attempt to compromise:

```text
production
backup credentials
backup catalogs
snapshots
identity systems
```

---

# 82. Ransomware-Safe Copy

At least one critical recovery path SHOULD remain inaccessible to the compromised production identity plane where feasible.

---

# 83. Golden Images

Where machine/image restoration is used, maintain trusted:

```text
base images
container images
packages
installation artifacts
```

or reproducible build paths.

---

# 84. Backup of Source Is Not Primary Strategy

Source code SHOULD already exist in protected source control.

Additional offline copies MAY support catastrophic organizational recovery.

---

# 85. Artifact Recovery

Production recovery requires access to trusted:

```text
container images
packages
binaries
SBOM/provenance
```

or the capability to rebuild them safely.

---

# 86. Artifact Registry Failure

Critical recovery plans MUST consider:

```text
artifact registry unavailable
```

if deployment depends on it.

---

# 87. Infrastructure-as-Code Recovery

Infrastructure definitions MUST be recoverable independently of the failed production environment.

---

# 88. IaC Repository Compromise

Recovery planning SHOULD consider loss/compromise of the primary source-control organization.

---

# 89. Configuration Recovery

Recovery must include:

```text
deployment configuration
runtime configuration
feature configuration
network policy
```

not just code/data.

---

# 90. Secret Recovery

Secrets require a recovery strategy.

---

# 91. Secrets Are Not Conventional Backup Files

Do not export plaintext production secrets into generic backup archives.

Use approved secret-management backup/recovery mechanisms.

---

# 92. Secret Manager Recovery

Understand how to recover:

```text
secret metadata
secret versions
access policies
```

if the secret-management service/account is unavailable.

---

# 93. Credential Recovery

Critical credentials may include:

```text
cloud recovery accounts
DNS registrar access
certificate authorities
artifact registries
source-control accounts
identity provider
```

---

# 94. Credential Loss Scenario

DR MUST include scenarios where normal administrator credentials are unusable.

---

# 95. Break-Glass Identity

Critical platforms SHOULD maintain appropriately protected emergency recovery identities where necessary.

---

# 96. Break-Glass Credentials

Emergency credentials SHOULD be:

```text
rarely used
independently protected
MFA secured
tested
audited
```

---

# 97. Do Not Store Break-Glass Credentials With Production Secrets Only

If the normal identity/secret system fails, recovery credentials must remain accessible through an independent controlled process.

---

# 98. Recovery Credential Documentation

The organization MUST know:

```text
where recovery credentials are
who can access them
how access is approved
how they are rotated
```

---

# 99. Encryption-Key Recovery

Encrypted backups are useless without recoverable keys.

---

# 100. Key Backup

Encryption key architecture MUST preserve required recovery capability without weakening key security.

---

# 101. Key Loss

Loss of the only encryption key can equal:

```text
permanent data loss
```

even when perfect backups exist.

---

# 102. Key Escrow / Redundancy

Key-management systems SHOULD use provider/platform-supported durable recovery mechanisms appropriate to policy.

---

# 103. Key Separation

Backup data and key-management access SHOULD use appropriate separation of duties.

---

# 104. Key Rotation

Recovery procedures MUST account for backups encrypted under older key versions.

---

# 105. Do Not Delete Old Keys Too Early

Key retirement must account for:

```text
backup retention
legal holds
archive restoration
```

---

# 106. Database Backup

Every authoritative production database MUST have a tested recovery method.

---

# 107. Managed Database Backups

Managed automatic backups SHOULD be explicitly configured and verified.

Never assume:

```text
managed database
→ backups automatically satisfy our RPO/RTO
```

---

# 108. Database Snapshot Retention

Snapshot retention SHOULD reflect:

```text
operational recovery
logical corruption discovery window
compliance
cost
```

---

# 109. Transaction Log Retention

Log retention MUST cover the required PITR recovery window.

---

# 110. Database Backup Monitoring

Monitor:

```text
backup completion
backup age
backup failures
PITR health
retention
```

---

# 111. Backup Success Is Not Restore Success

A successful backup job only proves:

```text
backup operation completed
```

not:

```text
data can be restored correctly
```

---

# 112. Database Restore Testing

Critical databases MUST undergo periodic restore tests.

---

# 113. Restore to Isolated Environment

Restore tests SHOULD use an isolated target to avoid damaging current production.

---

# 114. Restore Validation

After restore, validate:

```text
database starts
schema valid
critical tables exist
row/object integrity
application can connect
critical business queries work
```

---

# 115. Data Integrity Checks

Where supported, use:

```text
checksums
database consistency checks
domain reconciliation
```

to validate recovered data.

---

# 116. PITR Testing

If PITR is part of the recovery strategy, test restoration to:

```text
specific timestamp
transaction boundary
before simulated corruption
```

---

# 117. Bad Migration Recovery

Recovery planning MUST include an unsafe migration or mass-data update scenario.

---

# 118. Logical Corruption Detection

A corruption occurring at 10:00 but discovered three days later requires backups/history extending beyond three days.

---

# 119. Corruption Discovery Window

Retention SHOULD account for how long important corruption may remain unnoticed.

---

# 120. Restore vs Repair

For some logical incidents, restoring the whole database is unnecessarily destructive.

Alternatives MAY include:

```text
restore copy
extract correct records
repair production
```

---

# 121. Selective Restore

Selective recovery can reduce loss when only a subset of data is damaged.

It requires careful referential consistency.

---

# 122. Primary-Key Collisions

Partial restores must handle:

```text
newer records
changed foreign keys
duplicate identifiers
```

safely.

---

# 123. Database Failover

HA database failover SHOULD be tested separately from backup restore.

They solve different failure modes.

---

# 124. Replica Promotion

Replica promotion requires understanding of:

```text
replication lag
write consistency
split brain
client reconnection
```

---

# 125. Replication Lag

Asynchronous replicas can lose the most recent acknowledged data during primary failure.

The lag contributes to effective recovery-point behavior.

---

# 126. Synchronous Replication

Synchronous replication reduces data-loss risk but can:

```text
increase latency
couple failure domains
reduce write availability
```

---

# 127. Replication Monitoring

Monitor:

```text
replica lag
replication failures
replica health
```

---

# 128. Replication Corruption

Logical corruption may propagate to every replica.

Historical backup/PITR remains necessary.

---

# 129. Object Storage Recovery

Object-storage recovery policy MUST address:

```text
accidental deletion
overwrite
malicious deletion
regional loss
retention
```

according to criticality.

---

# 130. Object Versioning

Versioning MAY protect against accidental overwrite/delete.

---

# 131. Versioning Is Not Full Backup

If attackers can:

```text
delete versions
delete bucket
disable versioning
```

through the same credentials, additional protection may be required.

---

# 132. Object-Lock / Immutability

Critical object archives SHOULD consider immutable retention when threat model warrants it.

---

# 133. Cross-Region Object Replication

Cross-region replication MAY protect regional availability.

Again:

> replication is not historical backup.

---

# 134. Object Restore Testing

Periodically validate that:

```text
objects can be listed
keys can be found
content decrypts
application can consume restored objects
```

---

# 135. Uploaded Files

Customer files MAY be authoritative business data.

Do not omit them because the relational database is backed up.

---

# 136. Metadata/Data Consistency

File-object recovery should preserve consistency with database metadata.

---

# 137. Queue Recovery

Queues require explicit classification.

Ask:

```text
Can messages be regenerated?
Can pending messages be lost?
Can messages be replayed?
Would replay cause duplicate side effects?
```

---

# 138. Durable Business Work

Critical asynchronous work SHOULD be represented by durable state that can survive worker/queue failure.

---

# 139. Queue Replay

Replay requires idempotent consumers or deduplication.

---

# 140. Queue Backup

Direct queue backup is not always the right design.

A durable authoritative:

```text
job table
event log
outbox
workflow state
```

may provide better recoverability.

---

# 141. DLQ Recovery

Disaster recovery SHOULD include critical dead-letter queues when they contain unresolved business work.

---

# 142. Event-Stream Recovery

Event logs SHOULD have sufficient retention to rebuild required consumers/projections.

---

# 143. Event Replay

Consumers must understand:

```text
schema history
idempotency
ordering
side effects
```

before replay.

---

# 144. Search Recovery

Search indexes SHOULD normally be reconstructible.

The plan MUST know:

```text
source
rebuild command
estimated rebuild duration
```

---

# 145. Search RTO

A full reindex taking 36 hours cannot satisfy:

```text
search RTO = 30 minutes
```

Consider snapshots or staged reconstruction.

---

# 146. Cache Recovery

Caches normally require:

```text
repopulate
```

rather than backup.

---

# 147. Cold Cache

Recovery planning SHOULD consider performance after cache loss.

A cold cache can overload databases immediately after recovery.

---

# 148. Cache Warming

Critical systems MAY need controlled cache warming or load ramp-up.

---

# 149. CDN Recovery

CDN outage/reconfiguration MAY require:

```text
alternate origin routing
DNS update
direct-origin fallback
```

according to architecture.

---

# 150. DNS Recovery

DNS is a critical DR dependency.

The organization MUST be able to recover/control:

```text
zones
records
registrar
nameservers
DNSSEC material where used
```

---

# 151. DNS Configuration as Code

Production DNS SHOULD be declared/versioned where practical.

---

# 152. DNS Provider Failure

Critical services SHOULD consider what happens if the DNS provider/control plane becomes unavailable.

---

# 153. Registrar Recovery

Registrar account recovery and ownership MUST be documented.

---

# 154. Domain Expiry

Domain renewal failure can become a business continuity incident.

Enable appropriate:

```text
auto renewal
ownership
monitoring
```

---

# 155. DNSSEC Recovery

Where DNSSEC is used, recovery MUST include required signing/key procedures.

---

# 156. TLS Certificate Recovery

Recovery must include:

```text
certificate issuance
validation
private-key access
renewal
```

---

# 157. Certificate Automation

Prefer reproducible automated issuance over relying on one administrator's laptop.

---

# 158. Certificate Authority Dependency

Know what happens if normal certificate issuance is unavailable during recovery.

---

# 159. IAM Recovery

Loss or compromise of IAM is a Tier-0 scenario.

---

# 160. IAM Configuration Recovery

Important IAM configuration SHOULD be:

```text
declared
exportable
version-controlled where appropriate
```

---

# 161. IAM Lockout

DR exercises SHOULD consider:

```text
all normal administrators locked out
```

---

# 162. Identity Provider Outage

Business continuity MUST consider outage of external:

```text
SSO
MFA
identity provider
```

where production administration depends on it.

---

# 163. Emergency Administrative Identity

Emergency access must not create a routine authentication bypass.

---

# 164. Secret-Manager Failure

Recovery plans SHOULD consider:

```text
secret manager unavailable
```

and whether workloads:

```text
use cached credentials
fail closed
can access alternate region
```

---

# 165. Source-Control Recovery

Critical organizations SHOULD consider loss of:

```text
Git provider
organization
repositories
repository admin access
```

---

# 166. Distributed Git Helps

Developer clones may preserve source history, but they are not a complete organizational recovery strategy.

They may omit:

```text
issues
PRs
CI settings
secrets
permissions
release metadata
```

---

# 167. Source Backup

Critical source and IaC MAY be mirrored/exported to an independent location according to risk.

---

# 168. Repository Secrets

Do not recover secrets by storing them in Git.

---

# 169. CI/CD Recovery

DR MUST include enough delivery capability to deploy recovered systems.

---

# 170. Pipeline Dependency

If recovery requires CI but the CI provider is unavailable, define an approved contingency.

---

# 171. Emergency Build Path

A high-assurance organization MAY maintain a documented emergency trusted-build path.

It MUST NOT become the normal bypass path.

---

# 172. Container Registry Recovery

Know whether:

```text
current artifacts
previous known-good artifacts
base images
```

remain accessible during disaster.

---

# 173. Registry Replication

Critical artifact registries MAY use replication/mirroring according to RTO requirements.

---

# 174. Artifact Rebuild

If artifacts can be rebuilt, confirm required:

```text
source
dependencies
builders
signing/provenance
```

are also recoverable.

---

# 175. Dependency Availability

Recovery planning SHOULD consider public package-registry outages.

---

# 176. Dependency Mirror

Critical/offline recovery MAY rely on controlled package mirrors or retained artifacts.

---

# 177. Infrastructure Recovery

Infrastructure SHOULD be reproducible from:

```text
IaC
configuration
artifacts
secret references
```

---

# 178. Recovery Region Bootstrap

If regional DR is promised, infrastructure should be capable of being created in the recovery region within the RTO.

---

# 179. Control-Plane Dependency

Infrastructure creation may depend on cloud control-plane APIs.

Understand the implications during provider incidents.

---

# 180. Capacity Availability

A disaster may cause many customers to request recovery-region resources simultaneously.

Do not assume unlimited emergency capacity.

---

# 181. Reserved Recovery Capacity

Warm/hot strategies MAY reserve capacity when rapid scale-up cannot be assumed.

---

# 182. Quota Recovery

Recovery-region:

```text
CPU quota
IP quota
load-balancer quota
database quota
```

must already support intended recovery scale.

---

# 183. Recovery Network

DR requires:

```text
network
subnets
routes
firewalls
private endpoints
egress
```

not just servers.

---

# 184. Recovery IAM

The recovery environment must have working:

```text
service identities
human roles
deployment permissions
```

---

# 185. Recovery Observability

Recovered infrastructure requires enough:

```text
logs
metrics
alerts
```

to determine whether recovery succeeded.

---

# 186. Recovery Does Not End at Server Start

A system is not recovered merely because:

```text
VM is running
```

or:

```text
pods are ready
```

---

# 187. Functional Recovery Validation

Recovery verification SHOULD test critical business journeys.

Examples:

```text
authenticate
read account
write record
process payment safely
send critical job
retrieve file
```

---

# 188. Recovery Acceptance Criteria

Every DR plan SHOULD define:

```text
minimum functionality
data checkpoint
capacity
security state
validation tests
```

required before declaring service restored.

---

# 189. Failover

Failover is the transition to recovery infrastructure.

---

# 190. Automatic Failover

Automatic failover SHOULD be used only when:

```text
failure detection is reliable
secondary is known healthy
split-brain risk controlled
```

---

# 191. Manual Failover

Manual approval MAY be safer for complex disasters where incorrect automatic failover could worsen the incident.

---

# 192. Failover Decision Authority

The DR plan MUST identify who can authorize failover.

---

# 193. Failover Trigger

Triggers SHOULD be explicit.

Example:

```text
Region unavailable for > X minutes
+
business service unavailable
+
recovery environment validated
```

not vague intuition.

---

# 194. Failover Communications

Major failover SHOULD coordinate:

```text
incident command
engineering
support
business
security
vendors
```

as appropriate.

---

# 195. Traffic Shift

Recovery runbooks SHOULD specify:

```text
DNS
load balancer
routing
feature flags
```

changes required.

---

# 196. Traffic Ramp

After recovery, traffic MAY be ramped gradually to confirm:

```text
capacity
database health
latency
errors
```

---

# 197. Failback

Returning to the original/primary environment requires its own plan.

---

# 198. Failback Is Not "Reverse the Steps"

During failover, data may have changed in the recovery environment.

Failback must account for:

```text
new writes
replication
conflicts
state divergence
```

---

# 199. Failback Objective

The organization MUST define whether the recovery region becomes:

```text
new primary
```

or whether traffic should eventually return.

---

# 200. Failback Testing

Critical systems SHOULD test failback as well as failover.

---

# 201. Disaster Scenarios

Plans SHOULD cover multiple plausible scenarios rather than one generic:

```text
disaster
```

---

# 202. Scenario: Accidental Deletion

Example:

```text
Operator deletes critical table.
```

Recovery may require PITR/selective restore.

---

# 203. Scenario: Bad Deployment

Example:

```text
New release corrupts records for two hours.
```

Requires detection and data repair strategy.

---

# 204. Scenario: Database Loss

Example:

```text
Primary database and HA replicas unavailable.
```

Requires backup/PITR restore.

---

# 205. Scenario: Availability-Zone Failure

Recovery should rely primarily on HA architecture if designed for it.

---

# 206. Scenario: Regional Failure

May require:

```text
alternate region
data recovery
routing
capacity
```

---

# 207. Scenario: Ransomware

Assume:

```text
production data encrypted
normal backups targeted
admin credentials compromised
```

---

# 208. Scenario: Cloud Account Compromise

Recovery may require:

```text
new account/project
clean identities
recreated infrastructure
trusted data restore
credential rotation
```

---

# 209. Scenario: IAM Lockout

Normal cloud administrators cannot authenticate.

---

# 210. Scenario: Source-Control Compromise

Assume:

```text
source changed
CI compromised
release artifacts suspect
```

Recovery requires trusted known-good sources/artifacts.

---

# 211. Scenario: Secret Compromise

Mass credential rotation may be required during recovery.

---

# 212. Scenario: Encryption Key Loss

Backups/data may become inaccessible.

Key-recovery mechanisms must be verified before the incident.

---

# 213. Scenario: DNS/Registrar Compromise

Attackers modify DNS or domain ownership.

Recovery requires independent registrar/DNS access.

---

# 214. Scenario: SaaS Provider Loss

A critical third-party platform becomes unavailable or loses data.

---

# 215. Scenario: Office/People Unavailability

Technical systems may work while key operators cannot access normal facilities.

---

# 216. Scenario: Communications Failure

Normal:

```text
email
chat
ticketing
```

may be unavailable.

Business continuity needs alternate communications.

---

# 217. Scenario: Internet/Network Failure

Critical business processes may require alternate connectivity.

---

# 218. Scenario: Dependency Failure

One critical vendor remains unavailable for an extended period.

---

# 219. Disaster Scenario Catalog

Critical organizations SHOULD maintain an explicit scenario catalog and map recovery mechanisms to each scenario.

---

# 220. Common-Mode Failure

Recovery copies must avoid sharing a failure mode with production when the failure is in scope.

Examples:

```text
same admin credential
same region
same account
same encryption key without recovery
same corrupted replication stream
```

---

# 221. Correlated Failure

Two copies are not independent if one action can destroy both.

---

# 222. Backup Isolation Test

Ask:

> **Can a compromised production administrator delete every recoverable copy?**

If yes, ransomware/destructive-admin resilience may be inadequate.

---

# 223. Recovery Environment Trust

Do not restore compromised systems blindly into production.

---

# 224. Clean Recovery

Security incidents may require:

```text
new infrastructure
known-good images
rotated credentials
validated backup
```

rather than restoring the compromised machine image wholesale.

---

# 225. Backup Malware Risk

Backups can contain:

```text
malware
compromised binaries
malicious persistence
```

---

# 226. Recovery Point Selection

For security incidents, select a recovery point believed to precede compromise when appropriate.

---

# 227. Data vs System Restore

It may be safer to:

```text
rebuild clean system
+
restore trusted data
```

rather than restore complete compromised machine images.

---

# 228. Forensic Preservation

Incident Response may require preserving compromised systems/evidence separately from operational recovery.

---

# 229. Recovery Network Isolation

Ransomware recovery SHOULD use an isolated clean environment until restored systems are validated.

---

# 230. Reconnect Carefully

Do not reconnect recovered workloads to compromised networks/dependencies prematurely.

---

# 231. Credential Rotation During Recovery

Security-related DR may require rotating:

```text
human credentials
service credentials
API keys
certificates
tokens
```

---

# 232. Business Continuity

Business continuity covers keeping critical organizational functions operating during disruption.

---

# 233. Business Continuity Plan

Critical organizations SHOULD maintain a BCP or equivalent operating-continuity plan.

---

# 234. BCP Scope

A BCP SHOULD address:

```text
People
Processes
Technology
Facilities
Vendors
Communications
Decision authority
Manual workarounds
```

---

# 235. Technology Is One Dependency

Business continuity cannot be reduced to:

```text
restore database
```

---

# 236. Critical Business Processes

Identify business processes that must continue during technology disruption.

---

# 237. Manual Workarounds

Some processes MAY use temporary manual workflows during extended outage.

---

# 238. Manual Procedure

A manual workaround SHOULD specify:

```text
who
what
how records are captured
how reconciliation occurs later
```

---

# 239. Manual Processing Security

Continuity procedures MUST NOT discard:

```text
authorization
privacy
fraud controls
```

merely because systems are unavailable.

---

# 240. Reconciliation After Continuity Mode

Transactions recorded manually must later be safely reconciled into authoritative systems.

---

# 241. Alternate Communications

Critical incidents SHOULD have an alternate communication channel independent of primary corporate systems.

---

# 242. Out-of-Band Contact List

A secure current contact list SHOULD exist for:

```text
incident leaders
cloud/vendor contacts
security
business leaders
legal/privacy
```

where appropriate.

---

# 243. Offline Runbook Access

Critical runbooks/contact information SHOULD remain accessible if primary:

```text
SSO
wiki
cloud account
```

is unavailable.

---

# 244. Printed/Offline Material

High-criticality organizations MAY maintain controlled offline copies of essential:

```text
contacts
recovery procedures
account identifiers
```

without unnecessarily exposing secrets.

---

# 245. Vendor Continuity

Critical third-party dependencies MUST be included in continuity planning.

---

# 246. Vendor RTO

Understand vendor contractual/technical:

```text
availability
recovery
support
```

capabilities.

Do not assume they equal your requirements.

---

# 247. SaaS Backup

Critical SaaS data SHOULD be assessed for independent export/backup capability.

---

# 248. SaaS Native Retention

Provider:

```text
trash
version history
retention
```

is not automatically sufficient DR.

---

# 249. SaaS Export

Where vendor lockout/data loss would materially harm the business, periodic independent exports MAY be required.

---

# 250. SaaS Identity Dependency

Consider what happens if:

```text
SSO provider unavailable
```

and access to critical SaaS tools is required during recovery.

---

# 251. Contractual Continuity

Critical vendor agreements MAY need:

```text
support escalation
data export
termination assistance
recovery commitments
```

according to procurement standards.

---

# 252. Backup Encryption

Critical backup data MUST be encrypted appropriately in transit and at rest.

---

# 253. Backup Confidentiality

Backups often contain:

```text
entire customer database
historic deleted fields
secrets
```

and may be more sensitive than live views.

---

# 254. Backup Access

Backup read access MUST be tightly restricted.

---

# 255. Backup Restore Access

Permission to restore data can be almost as sensitive as permission to read/export production data.

---

# 256. Backup Delete Access

Backup deletion capability SHOULD be separately controlled for critical datasets.

---

# 257. Backup Audit

Important backup operations SHOULD be auditable.

Examples:

```text
backup deleted
retention changed
vault policy changed
restore started
```

---

# 258. Backup Integrity

Backup systems SHOULD use integrity verification supported by the platform.

---

# 259. Checksums

Checksums can detect unintended corruption but do not prove semantic database correctness.

---

# 260. Backup Encryption Key Monitoring

Ensure required decryption keys remain accessible throughout the backup retention period.

---

# 261. Retention

Backup retention MUST align with:

```text
RPO/recovery needs
corruption detection window
privacy
legal
cost
```

---

# 262. Retention Tiers

Organizations MAY use:

```text
hourly
daily
weekly
monthly
annual
```

retention generations where justified.

---

# 263. Grandfather-Father-Son Style Rotation

Traditional multi-generation rotation MAY be used, but modern continuous/PITR mechanisms may provide more appropriate recovery.

Use requirements, not tradition, to choose.

---

# 264. Backup Retention vs Data Retention

Backup retention MUST NOT become an accidental method of keeping personal data indefinitely.

---

# 265. Privacy Deletion

Privacy deletion workflows must define how deleted data behaves in immutable backups.

---

# 266. Immutable Backup Exception

It may be impractical to surgically erase data from immutable backups.

The policy should define:

```text
backup expires normally
access remains restricted
deleted data is not restored into active state
```

according to applicable obligations.

---

# 267. Restore Deletion Replay

When restoring an old backup, privacy/deletion tombstones or equivalent controls SHOULD be reapplied before restored data returns to service.

---

# 268. Legal Hold

Legal holds MAY supersede routine deletion.

Backup systems must support applicable hold requirements where needed.

---

# 269. Expired Backup

Backups beyond approved retention MUST be deleted unless a valid hold/exception exists.

---

# 270. Backup Cost

Backup architecture SHOULD monitor:

```text
storage
replication
egress
restore
archive retrieval
```

cost.

---

# 271. Cheapest Storage Is Not Always Best

Deep archive may have:

```text
hours-long retrieval
retrieval charges
```

incompatible with low RTO.

---

# 272. Backup Storage Tier

Storage tier MUST satisfy required restore speed.

---

# 273. Restore Bandwidth

Large datasets may take substantial time simply to transfer.

RTO calculations MUST include data volume and throughput.

---

# 274. Restore Performance Calculation

Approximate lower bound:

```text
restore duration
≈
data volume / effective restore throughput
```

before application validation time.

---

# 275. Large Dataset Recovery

Petabyte-scale recovery cannot be designed using assumptions appropriate to a 10 GB database.

---

# 276. Incremental Restore Chain

Long incremental chains may increase:

```text
restore time
dependency on many backup pieces
```

---

# 277. Restore Optimization

Backup strategy SHOULD balance:

```text
backup duration
storage
network
restore complexity
restore speed
```

---

# 278. Backup Monitoring

Every critical backup system SHOULD monitor:

```text
last successful backup
backup duration
backup size
backup failures
unexpected size changes
retention
immutability status
```

---

# 279. Backup Freshness Alert

Alert when the latest recoverable backup exceeds the allowed RPO window.

---

# 280. Backup Size Anomaly

Unexpected backup-size changes MAY indicate:

```text
backup exclusion
data explosion
corruption
configuration mistake
```

---

# 281. Silent Backup Failure

Backups MUST NOT fail silently.

---

# 282. Alert Ownership

Backup alerts need a responding owner.

---

# 283. Restore Testing

Restore testing is mandatory for critical data.

---

# 284. Restore Test Levels

Useful levels include:

```text
Backup integrity check
Automated test restore
Application validation
Tabletop DR exercise
Partial failover
Full DR exercise
```

---

# 285. Automated Restore Test

Critical backups SHOULD periodically restore into disposable isolated infrastructure automatically where feasible.

---

# 286. Restore Test Frequency

Test frequency SHOULD be proportional to:

```text
criticality
change rate
backup complexity
regulatory need
```

---

# 287. Major Architecture Change

A significant storage/database architecture change SHOULD trigger recovery retesting.

---

# 288. Backup Software Upgrade

Changes to backup mechanisms SHOULD trigger restore validation.

---

# 289. Restore Test Data Security

Restored production data in test recovery environments remains production-sensitive.

---

# 290. Restore Environment Controls

Recovery-test environments MUST have:

```text
restricted access
network isolation where appropriate
retention cleanup
privacy controls
```

---

# 291. No Customer Notifications During Restore Test

Restored systems MUST NOT accidentally:

```text
email customers
charge cards
call webhooks
send SMS
```

---

# 292. Recovery Test Provider Isolation

Use sandboxed integrations or block external side effects.

---

# 293. Restore Cleanup

Temporary restored copies MUST be securely removed after tests.

---

# 294. Restore Evidence

Critical restore tests SHOULD record:

```text
backup used
restore point
start/end time
result
validation
issues
measured RPO
measured RTO
```

---

# 295. Recovery Metrics

Track:

```text
restore success rate
restore duration
backup age
exercise findings
RPO achievement
RTO achievement
```

for critical services.

---

# 296. Tabletop Exercise

A tabletop exercise walks decision-makers through a simulated disaster without necessarily changing production.

---

# 297. Tabletop Purpose

It validates:

```text
roles
communications
decision authority
runbooks
dependencies
```

---

# 298. Technical DR Exercise

A technical exercise SHOULD actually:

```text
restore
deploy
route
validate
```

where safe.

---

# 299. Full DR Exercise

High-criticality systems SHOULD periodically test complete recovery sufficiently close to real conditions to validate the design.

---

# 300. Exercise Safety

DR tests MUST have:

```text
scope
stop conditions
ownership
rollback
customer-impact controls
```

---

# 301. Game Day

Game days MAY simulate:

```text
region failure
database loss
identity outage
queue failure
```

to practice response.

---

# 302. Exercise Findings

Every exercise SHOULD produce:

```text
gaps
owners
remediation
due dates
```

---

# 303. Repeat Failures

An unresolved finding repeated across exercises is a governance failure.

---

# 304. Runbook

Every Tier-0/Tier-1 service SHOULD have a recovery runbook.

---

# 305. Runbook Content

A recovery runbook SHOULD include:

```text
Trigger
Prerequisites
Access
Recovery point selection
Restore procedure
Infrastructure procedure
Traffic procedure
Validation
Rollback/failback
Contacts
Escalation
```

---

# 306. Runbook Must Be Executable

Avoid vague instructions such as:

```text
Restore the database.
```

Provide actual controlled procedures or links to automation.

---

# 307. Runbook Command Safety

Commands SHOULD identify:

```text
target environment
expected output
destructive risk
```

---

# 308. Automation Preferred

Repeatable recovery steps SHOULD be automated where safe.

---

# 309. Manual Decision Points

Automation MUST NOT eliminate required human judgment during ambiguous disaster conditions.

---

# 310. Runbook Credentials

Do not place plaintext credentials in runbooks.

---

# 311. Offline Runbook

Tier-0 recovery procedures SHOULD be accessible independently of systems likely to be unavailable during disaster.

---

# 312. Runbook Ownership

Every runbook requires:

```text
owner
last reviewed
last exercised
```

metadata.

---

# 313. Stale Runbook

A runbook that references deleted:

```text
servers
accounts
commands
people
```

is not a recovery plan.

---

# 314. Recovery Roles

Critical DR plans SHOULD define roles.

Example:

```text
Incident Commander
Technical Recovery Lead
Data Recovery Lead
Security Lead
Business Continuity Lead
Communications Lead
Vendor Coordinator
```

Roles MAY be combined for smaller organizations.

---

# 315. Incident Commander

One role SHOULD coordinate the incident rather than every engineer independently changing production.

---

# 316. Recovery Authority

Explicitly identify who can authorize:

```text
restore
failover
data rollback
region switch
customer communication
```

---

# 317. Recovery Escalation

If recovery exceeds expected time, escalation thresholds SHOULD exist.

---

# 318. Customer Communication

Major outages SHOULD have a customer communication process.

---

# 319. Status Communication

Communications should distinguish:

```text
investigating
identified
recovering
monitoring
resolved
```

when applicable.

---

# 320. Do Not Promise Unsupported RTO Publicly

External commitments MUST reflect demonstrated operational capability.

---

# 321. Internal Communication

Recovery teams need one canonical source of incident status.

---

# 322. Communication Failure

Alternative communication SHOULD exist if primary corporate messaging is unavailable.

---

# 323. Recovery Priority

Systems SHOULD recover in dependency order.

---

# 324. Recovery Dependency Graph

Example:

```text
Network
↓
Identity / IAM
↓
Secrets / Keys
↓
Database / Storage
↓
Application
↓
Workers
↓
Edge / DNS
↓
Optional supporting systems
```

Actual dependencies vary.

---

# 325. Restore Database Before App?

Often yes—but not universally.

Recovery order MUST follow the actual dependency graph.

---

# 326. Dependency Cycles

Circular recovery dependencies are dangerous.

Example:

```text
Secret manager requires SSO
SSO requires secret manager
```

DR design SHOULD identify and break such cycles.

---

# 327. Tier-0 Recovery Infrastructure

Systems necessary to recover everything else require stronger independent resilience.

---

# 328. Tier-0 Examples

Possible Tier-0:

```text
cloud identity
DNS
key management
secrets
source control
artifact registry
backup vault
```

depending on architecture.

---

# 329. Business Data Priority

Recovery SHOULD prioritize business-critical datasets before optional analytical data.

---

# 330. Analytics Recovery

Analytics datasets MAY have longer RTO than transactional systems unless business requirements say otherwise.

---

# 331. Observability Recovery

Enough observability MUST exist early in recovery to determine whether the restored system works.

---

# 332. Logging Dependency

Do not make core application recovery impossible because the logging platform is unavailable.

---

# 333. Feature Degradation

Recovery MAY initially restore:

```text
minimum viable service
```

with optional features disabled.

---

# 334. Minimum Business Service

The DR plan SHOULD define what functionality is required to claim partial recovery.

---

# 335. Progressive Recovery

Example:

```text
Read-only access
↓
Core writes
↓
Payments
↓
Background processing
↓
Optional features
```

when business semantics allow it.

---

# 336. Read-Only Recovery

A read-only mode MAY preserve customer access while write systems recover.

---

# 337. Read-Only Must Be Explicit

Do not accidentally accept writes that are later discarded.

---

# 338. Feature Flags During Recovery

Operational flags MAY disable nonessential or dangerous functionality during constrained recovery.

---

# 339. Load Shedding

Recovery environments may operate at reduced capacity.

Use controlled:

```text
rate limiting
queueing
load shedding
```

rather than uncontrolled overload.

---

# 340. Recovery Capacity

DR capacity MUST support the service level promised during disaster.

---

# 341. Warm Standby Capacity

If standby starts at 20% capacity, understand how long scale-up takes.

That time contributes to RTO.

---

# 342. Data Reconciliation

After recovery, reconcile:

```text
transactions
events
external providers
payments
messages
```

that may have diverged during outage.

---

# 343. External Side Effects

A database restore does not reverse:

```text
payment provider charge
email
bank transfer
third-party API action
```

---

# 344. Replay Safety

Recovery MUST avoid accidentally replaying already-completed external actions.

---

# 345. Idempotency Records

Payment/job/idempotency records may be critical recovery data.

---

# 346. Third-Party Reconciliation

Use provider records to resolve uncertain transactions.

---

# 347. Time Synchronization

Recovery infrastructure needs trustworthy system time for:

```text
TLS
authentication
logs
distributed coordination
```

---

# 348. Audit Continuity

Security/audit evidence SHOULD survive disasters appropriate to retention requirements.

---

# 349. Audit Logs Separate Failure Domain

High-value audit logs MAY require storage beyond the normal application control boundary.

---

# 350. Disaster Recovery Security

Emergency conditions MUST NOT be used as justification to abandon security controls.

---

# 351. Recovery Privilege

Temporary elevated recovery access SHOULD be:

```text
time bounded
audited
revoked after recovery
```

---

# 352. Recovery Account Cleanup

Remove emergency:

```text
accounts
firewall rules
temporary secrets
```

after the incident.

---

# 353. Temporary Public Access

Do not expose private databases/services publicly merely to make recovery faster unless explicitly risk-approved.

---

# 354. Security Validation

Before declaring recovery complete, verify:

```text
credentials rotated where needed
network policy correct
IAM correct
debug access removed
```

---

# 355. Disaster Recovery and Privacy

DR environments are within the privacy/security boundary.

---

# 356. Restored Data Access

A DR engineer does not automatically need unlimited customer-data access.

---

# 357. Recovery Data Minimization

Use full production datasets only when recovery requires them.

---

# 358. Retained Test Restore

Restore-test environments must not become forgotten production-data copies.

---

# 359. Geographic Privacy Constraints

DR region/storage decisions MUST respect data residency obligations.

---

# 360. Backup Documentation

Documentation SHOULD identify:

```text
backup mechanism
schedule
retention
storage
ownership
encryption
restore command/process
last test
```

---

# 361. Recovery Architecture Diagram

Critical systems SHOULD document:

```text
primary
replicas
backup vaults
recovery region
traffic failover
dependencies
```

---

# 362. Diagram Must Match Reality

Recovery diagrams must be maintained after infrastructure changes.

---

# 363. Change Management

Changes to:

```text
database
storage
identity
regions
encryption
network
deployment
```

SHOULD consider DR impact.

---

# 364. Backup Review in Architecture Changes

Adding a new authoritative datastore requires:

```text
backup
restore
retention
DR
```

design before production.

---

# 365. New Data Store Rule

A new production datastore is not complete until its recovery model is known.

---

# 366. Schema Migration Rule

Major database changes SHOULD preserve valid backup/PITR/recovery behavior.

---

# 367. Encryption Change Rule

Changing encryption keys/mechanisms requires ensuring historical backups remain recoverable.

---

# 368. Provider Migration

Moving cloud/providers requires a plan for:

```text
old backups
new backups
restore verification
retention
```

---

# 369. Backup System Migration

Do not decommission an old backup system before equivalent recovery from the replacement is demonstrated.

---

# 370. Decommissioning

When retiring a service:

```text
final backup?
data retention?
legal hold?
archive?
deletion?
```

must be explicitly decided.

---

# 371. Final Archive

Some systems MAY require a final immutable archive before shutdown.

---

# 372. Do Not Archive Everything Forever

Archival must have a purpose and retention period.

---

# 373. Metrics and SLO

Critical recovery capabilities SHOULD have measurable operational objectives.

---

# 374. Example Recovery Metrics

```text
Backup success %
Backup freshness
Restore success %
Restore duration
PITR recovery age
Exercise completion
Open DR findings
```

---

# 375. Backup Success SLI

A backup-success metric alone is insufficient.

Pair with periodic restore verification.

---

# 376. Restore Success SLI

Track whether a restore reached a validated usable state.

---

# 377. RPO Compliance

Measure whether actual available restore points meet required RPO.

---

# 378. RTO Compliance

Exercises SHOULD record whether recovery completed within RTO.

---

# 379. Recovery Debt

Repeated missed RTO/RPO exercise targets create reliability debt requiring prioritization.

---

# 380. Backup Failure Escalation

Critical backup failure should escalate based on:

```text
time since last good recovery point
RPO
data criticality
```

---

# 381. One Failed Hourly Backup

If:

```text
RPO = 24 hours
```

one missed hourly backup may be low urgency.

If:

```text
RPO = 1 hour
```

it may already be significant.

---

# 382. Backup Alert Context

Alerts SHOULD show:

```text
last good backup
required RPO
affected dataset
owner
```

---

# 383. DR Governance

Every Tier-0/Tier-1 service requires an accountable DR owner.

---

# 384. Service Owner

The normal service-owning team SHOULD generally own technical recoverability.

---

# 385. Platform Owner

Platform teams own shared recovery capabilities such as:

```text
backup platform
regional infrastructure
identity recovery
```

---

# 386. Business Owner

Business owners help approve:

```text
RPO
RTO
service priority
continuity requirements
```

---

# 387. Security Owner

Security participates particularly in:

```text
ransomware
credential compromise
clean recovery
forensics
```

---

# 388. DR Review Cadence

Critical recovery plans SHOULD be reviewed periodically and after material architecture changes.

---

# 389. Exercise Cadence

Exercise frequency is risk-based.

Higher-criticality systems require more frequent practical validation.

---

# 390. New Service Gate

A critical new production system SHOULD NOT launch without:

```text
RPO
RTO
backup design
restore procedure
owner
```

---

# 391. DR Checklist — Service

```text
□ Business criticality
□ Owner
□ RPO
□ RTO
□ Disaster scenarios
□ State inventory
□ Backup mechanism
□ Backup retention
□ Backup isolation
□ Replication strategy
□ Restore procedure
□ Last restore test
□ Recovery region
□ Dependency graph
□ Runbook
□ Exercise schedule
```

---

# 392. Backup Checklist

```text
□ Authoritative data covered
□ Frequency meets RPO
□ Retention adequate
□ Encryption
□ Independent failure domain
□ Immutable/offline copy considered
□ Least-privilege access
□ Delete permissions restricted
□ Monitoring
□ Freshness alerts
□ Restore tested
```

---

# 393. Database Recovery Checklist

```text
□ Automatic backups
□ Snapshot policy
□ PITR
□ Log retention
□ Replication
□ Replica lag monitoring
□ Restore tested
□ Schema validation
□ Application validation
□ Selective restore strategy
□ Corruption scenario tested
```

---

# 394. Ransomware Recovery Checklist

```text
□ Production compromise assumed
□ Backup admin compromise considered
□ Immutable/offline recovery copy
□ Independent credentials
□ Clean infrastructure path
□ Trusted artifact source
□ Credential rotation
□ Key recovery
□ Isolated restore environment
□ Malware validation
□ Forensic preservation
```

---

# 395. Regional DR Checklist

```text
□ Recovery region selected
□ Residency compliant
□ Capacity/quota
□ Networking
□ IAM
□ Secrets
□ Keys
□ Database/data
□ Object storage
□ Artifacts
□ DNS
□ TLS
□ Observability
□ Traffic failover
□ Failback
□ Tested
```

---

# 396. Credential Recovery Checklist

```text
□ Cloud account recovery
□ SSO recovery
□ MFA recovery
□ DNS registrar recovery
□ Source-control recovery
□ Secret-manager recovery
□ Key-management recovery
□ Certificate issuance
□ Break-glass identity
□ Offline access procedure
□ Periodic test
```

---

# 397. Restore-Test Checklist

```text
□ Backup selected
□ Isolated environment
□ Credentials available
□ Encryption keys available
□ Restore succeeds
□ Integrity validated
□ Application starts
□ Critical transactions tested
□ External side effects blocked
□ RPO measured
□ RTO measured
□ Test environment deleted
□ Findings assigned
```

---

# 398. Business Continuity Checklist

```text
□ Critical business processes
□ Maximum tolerable disruption
□ Process owners
□ Technology dependencies
□ People dependencies
□ Vendor dependencies
□ Manual workarounds
□ Alternate communications
□ Customer communication
□ Reconciliation procedure
□ Exercise performed
```

---

# 399. Failover Checklist

```text
□ Incident declared
□ Decision authority
□ Failure understood sufficiently
□ Recovery target healthy
□ Recovery data point selected
□ Split-brain prevented
□ Traffic plan
□ Capacity ready
□ Security controls ready
□ Business validation
□ Communications
□ Monitoring
```

---

# 400. Failback Checklist

```text
□ Primary environment trustworthy
□ State synchronized
□ Write ownership clear
□ Conflicts reconciled
□ Capacity ready
□ Traffic switch planned
□ Validation
□ Recovery region preserved until stable
□ Temporary controls removed
□ Lessons documented
```

---

# 401. Definition of Done — Backup

A backup system is production-ready when:

```text
✓ Dataset identified
✓ Owner identified
✓ RPO mapped to backup frequency
✓ Retention defined
✓ Storage location independent enough
✓ Encryption configured
✓ Immutability/offline need assessed
✓ Monitoring enabled
✓ Restore procedure documented
✓ Restore successfully tested
```

---

# 402. Definition of Done — Disaster Recovery

A critical service has adequate DR only when:

```text
✓ Business impact assessed
✓ RPO approved
✓ RTO approved
✓ Failure scenarios documented
✓ Recovery strategy selected
✓ Critical dependencies included
✓ Data recovery verified
✓ Infrastructure reproducible
✓ Credentials/keys recoverable
✓ DNS/network recovery covered
✓ Runbook exists
✓ Recovery exercised
✓ Measured result meets or informs objectives
✓ Findings remediated
```

---

# 403. Definition of Done — Business Continuity

Continuity planning is complete when:

```text
✓ Critical functions identified
✓ Maximum disruption defined
✓ People and vendors identified
✓ Alternative communication exists
✓ Manual/degraded operation defined where possible
✓ Technology recovery integrated
✓ Customer communication process exists
✓ Reconciliation documented
✓ Exercise completed
```

---

# 404. Backup & DR Anti-Patterns

Avoid:

```text
We use RAID, so we have backups.
```

Avoid:

```text
We have replicas, so we have backups.
```

Avoid:

```text
Cloud provider handles DR.
```

Avoid:

```text
Snapshot exists
→ restore assumed.
```

Avoid:

```text
Backup job green
→ recovery guaranteed.
```

Avoid:

```text
Same database
same region
same account
same admin credential
→ disaster recovery.
```

Avoid:

```text
Backup stored on same server.
```

Avoid:

```text
Ransomware can delete all backups.
```

Avoid:

```text
Backup encrypted
but key cannot be recovered.
```

Avoid:

```text
RPO = zero
```

with asynchronous replication.

Avoid:

```text
RTO = 15 minutes
```

when recovery has never completed in under four hours.

Avoid:

```text
RTO measured from restore command only.
```

Avoid:

```text
Daily backup
for 15-minute RPO.
```

Avoid:

```text
Replica promoted
without measuring replication lag.
```

Avoid:

```text
PITR configured
but never tested.
```

Avoid:

```text
Restore production DB
into staging
with open customer email integration.
```

Avoid:

```text
Recovery region exists
but lacks quota.
```

Avoid:

```text
Recovery depends on SSO
that is part of the outage.
```

Avoid:

```text
Break-glass password
stored only in failed password manager.
```

Avoid:

```text
Backups available
but DNS credentials lost.
```

Avoid:

```text
IaC exists
but state/source repo unavailable.
```

Avoid:

```text
Container images unavailable
during registry outage.
```

Avoid:

```text
Restore old backup
and resurrect deleted users.
```

Avoid:

```text
Immutable backups retained forever
without privacy policy.
```

Avoid:

```text
DLQ exists
nobody monitors it.
```

Avoid:

```text
Multi-region compute
single-region database
```

while claiming full regional DR.

Avoid:

```text
Failover tested
failback never considered.
```

Avoid:

```text
DR plan stored only in inaccessible corporate wiki.
```

Avoid:

```text
Runbook says "contact Bob."
```

Avoid:

```text
Manual continuity process
with no reconciliation plan.
```

Avoid:

```text
All services Tier 0.
```

Avoid:

```text
Annual DR test failed
and findings remain open until next year.
```

---

# 405. AI Backup & DR Rules

AI coding agents MUST classify new persistent state before adding it.

Ask:

```text
Authoritative?
Derived?
Ephemeral?
Recoverable?
```

---

# 406. AI New-Datastore Rule

AI MUST NOT introduce a new authoritative datastore without considering:

```text
backup
retention
restore
RPO
RTO
```

---

# 407. AI Backup-vs-Replication Rule

AI MUST NOT claim replication is a backup.

---

# 408. AI Snapshot Rule

AI MUST NOT assume a snapshot is:

```text
application-consistent
immutable
cross-region
restore-tested
```

without verification.

---

# 409. AI RPO Rule

AI MUST NOT invent RPO based solely on convenient backup schedules.

RPO comes from business requirements.

---

# 410. AI RTO Rule

AI MUST include:

```text
detection
decision
provisioning
restore
validation
traffic
```

when reasoning about RTO.

---

# 411. AI Backup Frequency Rule

AI MUST ensure proposed backup/PITR frequency can actually satisfy the target RPO.

---

# 412. AI Restore-Test Rule

When adding backup automation, AI SHOULD also define restore verification.

---

# 413. AI Ransomware Rule

For critical data, AI SHOULD assess whether normal production compromise could delete all recovery copies.

---

# 414. AI Immutable Rule

AI SHOULD consider immutability/offline isolation for critical ransomware recovery.

---

# 415. AI Encryption Rule

AI MUST ensure encryption-key recovery is considered whenever encrypted backups are introduced.

---

# 416. AI Credential Rule

AI MUST NOT store recovery credentials in ordinary source or backup archives.

---

# 417. AI Database Rule

When introducing a database, AI SHOULD define:

```text
backup
PITR
replication
restore testing
```

appropriate to criticality.

---

# 418. AI Object-Storage Rule

AI SHOULD consider:

```text
versioning
retention
immutability
replication
```

for authoritative object data.

---

# 419. AI Queue Rule

AI MUST NOT assume queue retention equals durable business recovery.

---

# 420. AI Replay Rule

AI MUST verify idempotency before proposing message/event replay.

---

# 421. AI Derived-State Rule

AI SHOULD prefer reconstruction over backup for derived state when reconstruction meets RTO.

---

# 422. AI IaC Rule

Recovery architecture SHOULD rebuild infrastructure from canonical IaC instead of relying on machine snapshots alone.

---

# 423. AI Region Rule

AI MUST NOT claim regional DR because backups happen to be stored in another region.

Complete recovery requires:

```text
compute
network
IAM
secrets
data
artifacts
DNS
capacity
```

---

# 424. AI Multi-Region Rule

AI MUST NOT claim:

```text
RPO ≈ 0
```

for asynchronous cross-region replication without qualification.

---

# 425. AI Failover Rule

AI SHOULD define:

```text
trigger
authority
validation
traffic switch
```

when designing failover.

---

# 426. AI Failback Rule

Any failover design SHOULD consider how new writes return/synchronize during failback.

---

# 427. AI Business-Continuity Rule

AI SHOULD distinguish technical recovery from continued business operation.

---

# 428. AI Runbook Rule

AI-generated recovery procedures SHOULD use concrete, verifiable steps.

Avoid:

```text
restore as necessary
```

---

# 429. AI Security Rule

AI MUST NOT weaken:

```text
authentication
authorization
network security
privacy
```

merely because a recovery is urgent.

---

# 430. AI Test-Environment Rule

AI-generated restore tests MUST prevent production external side effects.

---

# 431. AI Privacy Rule

AI MUST consider privacy-deletion replay when restoring historical backups.

---

# 432. AI Backup-Retention Rule

AI MUST NOT default backup retention to:

```text
forever
```

without a documented requirement.

---

# 433. AI Gold Rule

When uncertain:

```text
Known business requirement
>
Tested recovery capability
>
Independent protected copy
>
Automated reproducible recovery
>
Assumed provider capability
```

and:

```text
Restore tested
>
Backup exists
>
Backup configured
>
"We should be okay"
```

---

# 434. Golden Backup & Disaster Recovery Rules

**1. Backups, replication, high availability, disaster recovery, and business continuity are different controls.**

**2. Replication is not a substitute for historical recovery.**

**3. Recovery requirements begin with business impact, not backup tooling.**

**4. Every critical system has approved RPO and RTO.**

**5. RPO defines acceptable data loss; RTO defines acceptable recovery delay.**

**6. Recovery objectives are scenario-specific where necessary.**

**7. Target RPO/RTO are not claimed as achieved until demonstrated.**

**8. Every authoritative production datastore has a recovery strategy.**

**9. Backup frequency satisfies the required RPO.**

**10. Retention accounts for delayed corruption detection.**

**11. Critical backups exist outside the primary failure domain.**

**12. Ransomware-critical backups include immutable, offline, or otherwise isolated recovery copies.**

**13. Ordinary production credentials do not control every recovery copy.**

**14. Backup data is encrypted and access-controlled.**

**15. Encryption keys required to restore backups are themselves recoverable.**

**16. Backup success is monitored.**

**17. Backup freshness is measured against RPO.**

**18. A backup is not trusted until restoration has been demonstrated.**

**19. Critical databases are periodically restored into isolated test environments.**

**20. PITR is tested if PITR is part of the design.**

**21. Replication lag is observed and included in recovery reasoning.**

**22. Logical corruption and accidental deletion are explicit recovery scenarios.**

**23. Restore procedures verify business-level correctness, not only database startup.**

**24. Derived state is rebuilt instead of backed up when reconstruction satisfies recovery objectives.**

**25. Object storage, uploaded files, and other non-database authoritative data participate in DR.**

**26. Critical queue/workflow state has durable recovery semantics.**

**27. Recovery infrastructure includes IAM, secrets, keys, network, DNS, certificates, and artifacts.**

**28. Recovery credentials remain accessible when the primary identity system fails.**

**29. Break-glass identities are protected, tested, auditable, and rarely used.**

**30. Infrastructure recovery is reproducible through declared automation wherever practical.**

**31. Regional DR validates actual capacity and quotas before disaster.**

**32. Multi-region compute without a data strategy is not regional DR.**

**33. Failover has explicit triggers, authority, validation, and traffic controls.**

**34. Failback is designed separately from failover.**

**35. Security incidents use clean recovery rather than blindly restoring compromised systems.**

**36. Credential rotation is part of recovery from compromise.**

**37. Backup restoration must not resurrect data that should remain deleted.**

**38. Backup retention respects privacy, legal-hold, and lifecycle requirements.**

**39. DR exercises protect restored production data with production-equivalent controls.**

**40. Restore tests prevent unintended customer notifications, payments, or external side effects.**

**41. Recovery runbooks are concrete, current, accessible, and exercised.**

**42. Critical runbooks remain accessible when primary corporate systems fail.**

**43. Recovery plans identify people and decision authority as well as technology.**

**44. Business continuity includes manual/degraded processes where appropriate.**

**45. Manual continuity workflows preserve security and reconciliation requirements.**

**46. Critical vendors and SaaS dependencies are included in continuity planning.**

**47. DR architecture identifies common-mode and correlated failures.**

**48. Recovery happens in dependency order.**

**49. Tier-0 recovery dependencies receive stronger resilience than ordinary services.**

**50. Minimum viable service may be restored before full functionality when appropriate.**

**51. Recovery environments are monitored before being declared healthy.**

**52. Technical recovery is validated through critical user/business journeys.**

**53. Every recovery exercise produces owned remediation actions.**

**54. Repeated unresolved DR findings are treated as reliability defects.**

**55. New authoritative storage cannot launch without known recovery semantics.**

**56. Changes to infrastructure, data, IAM, encryption, and regions are reviewed for DR impact.**

**57. Emergency recovery does not abandon authentication, authorization, privacy, or auditability.**

**58. Recovery claims are periodically tested under realistic conditions.**

**59. A diagram is not proof of disaster recovery.**

**60. If the organization has never successfully restored it, it should not claim it is backed up.**

---

# 435. Canonical Backup & Disaster Recovery Standard

The organizational standard is:

> **Backup and recovery architecture is derived from business impact and explicit recovery objectives. Every critical service defines approved Recovery Point Objectives and Recovery Time Objectives, identifies authoritative and reconstructible state, maps critical dependencies, and selects the simplest recovery strategy capable of satisfying its requirements. Backup, replication, high availability, disaster recovery, and business continuity remain separate concepts and are used together where their distinct protections are required.**

> **Authoritative production data is protected through independently recoverable historical copies whose frequency, retention, isolation, encryption, and integrity reflect its recovery requirements. Critical backup architecture considers ransomware and destructive-admin scenarios through immutable, offline, cross-account, cross-region, or otherwise isolated copies where appropriate. Replication supports availability but never replaces historical recovery because corruption and deletion may replicate with normal data.**

> **Recovery capability is demonstrated rather than assumed. Critical databases, files, object stores, and other authoritative state are periodically restored into controlled isolated environments, validated at both storage and application/business levels, and measured against actual RPO and RTO. Point-in-time recovery, regional recovery, failover, failback, credential recovery, key recovery, and other mechanisms are exercised when they form part of the stated recovery architecture. Backup success without restore verification is insufficient evidence of recoverability.**

> **Disaster recovery includes more than application data. Recovery plans account for infrastructure-as-code, deployment artifacts, source control, package dependencies, IAM, workload identity, secrets, encryption keys, DNS, registrar access, certificates, network configuration, provider quotas, observability, third-party services, and the credentials required to operate those systems. Critical recovery dependencies are treated as Tier-0 infrastructure and designed so that failure of the primary identity or production control plane does not make recovery impossible.**

> **Security incidents use trusted clean recovery procedures. Restored workloads are rebuilt from known-good infrastructure and artifacts where appropriate, credentials are rotated, compromised systems remain available for forensic handling when necessary, restored environments are validated before reconnection, and recovery copies are protected against the same identities and failure modes that compromised production. Emergency recovery privileges remain least-privileged, attributable, auditable, temporary, and removed after use.**

> **Business continuity complements technical disaster recovery by identifying critical organizational processes, people, vendors, communications, decision authority, alternate working procedures, customer communications, and post-recovery reconciliation. Recovery occurs in explicit priority and dependency order, may initially restore a defined minimum viable service, and uses degraded/manual operation only where the resulting security, privacy, financial, and reconciliation risks are understood.**

> **Recovery plans and runbooks are versioned, owned, accessible during outages, and tested through tabletop, restore, failover, or full disaster-recovery exercises proportional to service criticality. Each exercise produces measurable evidence, including the actual recovery point and recovery duration, and unresolved findings become tracked reliability work rather than documentation-only observations.**

A production-grade backup and disaster-recovery architecture should make it easy to answer:

```text
Which systems are business-critical?
What is each system's RPO?
What is each system's RTO?
Which disaster scenarios do those objectives cover?
Which data is authoritative?
Which data can be reconstructed?
How frequently is authoritative data backed up?
How long are recovery points retained?
Where are those backups stored?
Can a production administrator delete every copy?
Are critical backups immutable or isolated?
How are backups encrypted?
Can we recover the encryption keys?
When was the last successful backup?
When was the last successful restore?
Which restore point would we use right now?
Can we perform point-in-time recovery?
How long did the last restore actually take?
Can restored data pass real application validation?
How do we recover object storage and uploaded files?
How do we recover pending asynchronous work?
How do we recover IAM?
How do we recover if SSO is unavailable?
How do we access break-glass credentials?
How do we recover DNS and registrar control?
How do we obtain TLS certificates?
Where are trusted deployment artifacts?
Can we rebuild the infrastructure from IaC?
Does the recovery region have sufficient quota and capacity?
How is traffic failed over?
Who may authorize failover?
How do we prevent split brain?
How will data be synchronized before failback?
How do we recover after ransomware without restoring the attacker?
How are deleted users prevented from reappearing after an old backup restore?
Which third parties are required for recovery?
What business processes continue manually during prolonged outage?
Where is the recovery runbook if the wiki and SSO are down?
When was the last realistic DR exercise?
Which recovery findings remain unresolved?
```

If those questions cannot be answered and demonstrated, backup and disaster recovery are not yet production-grade.

Two distinctions are especially important to preserve in the corpus. CISA explicitly recommends **offline, encrypted backups and regular testing of backup availability and integrity**, partly because ransomware commonly attempts to delete or encrypt accessible backups. It also recommends retaining trusted system images and Infrastructure-as-Code material for reconstruction. citeturn420512search0

Second, regional replication must not be described as a complete backup strategy. Current AWS resilience guidance explicitly notes that replication can protect against some disasters but can also replicate corruption or destruction, so historical/PITR recovery remains necessary. Its backup/restore, pilot-light, warm-standby, and active-active models also illustrate the normal trade-off between recovery time, recovery point, cost, and architectural complexity. citeturn420512search3turn420512search12

In the master hierarchy, this sits immediately after infrastructure because recovery requirements constrain infrastructure topology:

**… → Git & Repository → CI/CD → Deployment & Infrastructure → Backup & Disaster Recovery → Feature Flags → Release & Versioning → Documentation → Governance.**
