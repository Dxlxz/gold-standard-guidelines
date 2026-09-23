---
id: "deployment-infrastructure"
title: "Deployment & Infrastructure Guidelines — Gold Standard"
domain: "operations"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["operations", "deployment", "infrastructure"]
applies_to: ["infra"]
related: ["security", "data-database", "api", "configuration-environment", "backup-disaster-recovery"]
legacy_number: 27
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 84662
provenance: baseline

---

The standard below uses a vendor-neutral baseline. AWS, Google Cloud, and Azure all frame well-architected cloud workloads around broadly the same concerns: **reliability, security, operational excellence, performance, and cost efficiency**, with AWS and Google additionally making sustainability explicit. citeturn865016search7turn865016search9turn865016search0

# Deployment & Infrastructure Guidelines — Gold Standard

## 1. Purpose

These guidelines define the canonical organizational standard for:

- cloud architecture;
- infrastructure topology;
- cloud accounts/projects/subscriptions;
- compute selection;
- virtual machines;
- containers;
- container orchestration;
- Kubernetes;
- serverless;
- managed application platforms;
- runtime selection;
- availability zones;
- regions;
- multi-region architecture;
- scaling;
- load balancing;
- DNS;
- TLS;
- CDN;
- edge infrastructure;
- queues;
- event infrastructure;
- object storage;
- block/file storage;
- infrastructure as code;
- IAM;
- workload identity;
- network boundaries;
- ingress;
- egress;
- private networking;
- firewalls;
- service connectivity;
- secrets integration;
- infrastructure observability;
- reliability;
- capacity;
- cost governance;
- production access;
- infrastructure lifecycle.

The objective is to create infrastructure that is:

```text
Secure
Reliable
Scalable
Observable
Reproducible
Recoverable
Cost-conscious
Operable
Replaceable
Appropriately simple
```

The core principle is:

> **Infrastructure should provide the minimum reliable platform required by the workload, expressed through reproducible automation, protected by identity and network controls, and designed to fail predictably rather than depend on manual intervention.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented reason exists.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Infrastructure exceptions SHOULD document:

```text
Reason
Workload
Security impact
Reliability impact
Cost impact
Compensating controls
Owner
Review/expiry date
```

---

# 3. Infrastructure Is Architecture

Infrastructure decisions affect:

```text
Availability
Failure domains
Latency
Security
Data residency
Scaling
Cost
Deployment
Recovery
Operations
```

They are architectural decisions, not merely deployment details.

---

# 4. Infrastructure Follows Requirements

Choose infrastructure after establishing:

```text
Workload characteristics
Traffic
Data model
Reliability target
Latency target
Security requirements
Residency requirements
Recovery requirements
Cost constraints
Operational capability
```

Do not begin with:

```text
We should use Kubernetes.
```

---

# 5. Workload First

Canonical decision order:

```text
Product requirement
↓
Quality attributes / SLO
↓
Workload characteristics
↓
Failure model
↓
Deployment topology
↓
Infrastructure technology
```

---

# 6. Simplest Viable Infrastructure

Prefer the simplest infrastructure capable of satisfying the required:

```text
Security
Reliability
Performance
Scale
Operations
```

Do not build for hypothetical scale without evidence.

---

# 7. Managed Services First

Managed services SHOULD be preferred when they:

```text
reduce operational burden
provide acceptable control
meet security requirements
meet reliability requirements
meet cost requirements
```

---

# 8. Managed Does Not Mean Responsibility-Free

A managed service reduces responsibility for some layers.

The organization still owns:

```text
configuration
identity
data
network access
backup policy
capacity
application behavior
cost
```

---

# 9. Responsibility Model

For every infrastructure service, understand who owns:

```text
Hardware
Operating system
Runtime
Patching
Availability
Backups
Encryption
IAM
Application
Data
```

Do not assume the cloud provider owns all of them.

---

# 10. Platform Complexity Ladder

Prefer approximately:

```text
Managed SaaS / managed service
↓
Managed application platform
↓
Managed containers / serverless containers
↓
Managed Kubernetes
↓
Self-managed orchestration
↓
Raw VMs
↓
Bare metal
```

when each lower layer provides no necessary advantage.

This is a heuristic, not a mandatory ordering.

---

# 11. Do Not Introduce Kubernetes by Default

Kubernetes is justified when its orchestration capabilities solve real needs such as:

```text
many containerized workloads
standardized workload scheduling
advanced rollout requirements
portable deployment abstractions
platform engineering
complex resource orchestration
```

A small web application does not require Kubernetes merely to be production-grade.

---

# 12. Serverless Is Not Automatically Simpler

Serverless can reduce infrastructure management but introduce:

```text
runtime constraints
cold starts
execution limits
vendor coupling
observability differences
cost characteristics
```

Evaluate the workload.

---

# 13. Infrastructure Ownership

Every production workload MUST have an owning team.

Ownership includes:

```text
deployment
capacity
cost
security
observability
incident response
lifecycle
```

---

# 14. Platform Ownership

Shared infrastructure SHOULD have an accountable platform owner.

Examples:

```text
network
cluster
CI deployment layer
shared ingress
DNS
identity platform
```

---

# 15. Application vs Platform Responsibility

Responsibilities MUST be clear.

Example:

```text
Platform team
→ cluster, ingress, node lifecycle

Application team
→ workload config, resources, probes, scaling policy
```

---

# 16. Cloud Account Hierarchy

Cloud resources SHOULD be organized using the provider's account/project/subscription hierarchy.

Separate:

```text
production
non-production
security
shared infrastructure
```

according to scale and risk.

---

# 17. Production Isolation

Production SHOULD use a distinct cloud account/project/subscription from development where provider architecture allows it.

---

# 18. Account Is a Strong Boundary

Cloud account/project boundaries SHOULD be used for important separation such as:

```text
IAM
billing
quotas
audit
resource policy
```

---

# 19. Do Not Put Everything in One Cloud Account

A single unrestricted account for:

```text
dev
staging
production
security
experiments
```

creates unnecessary blast radius.

---

# 20. Account Naming

Use predictable naming.

Example:

```text
company-product-prod
company-product-staging
company-shared-security
```

according to provider conventions.

---

# 21. Environment Isolation

Infrastructure follows Configuration & Environment Guidelines.

Production and non-production MUST NOT unintentionally share:

```text
credentials
mutable databases
queues
buckets
private networks
customer notification endpoints
```

---

# 22. Cloud Regions

A region is a major geographic deployment location.

Region selection MUST be deliberate.

---

# 23. Region Selection Criteria

Consider:

```text
user latency
data residency
service availability
price
regulatory requirements
disaster risk
dependency proximity
organizational support
```

---

# 24. Default Region

An organization SHOULD establish preferred regions where possible.

This reduces arbitrary infrastructure diversity.

---

# 25. Region Availability

Do not select a region without verifying required services/features exist there.

---

# 26. Region Pricing

Cloud pricing can differ by region.

Cost differences MAY influence selection after security/residency/latency constraints.

---

# 27. Region Proximity

Place latency-sensitive compute near:

```text
primary users
authoritative databases
critical dependencies
```

where possible.

---

# 28. Availability Zones

Production workloads requiring meaningful availability SHOULD use multiple independent availability zones where the provider architecture supports them.

---

# 29. Zone Failure

A zone failure SHOULD NOT necessarily take down the entire critical service.

---

# 30. Multi-Zone Compute

Stateless critical application instances SHOULD normally span at least two failure zones.

---

# 31. Zone-Aware Data

Stateful managed services SHOULD use appropriate multi-zone resilience based on their availability/recovery requirements.

---

# 32. Multi-Zone Cost

Do not add zone redundancy without understanding:

```text
replication cost
cross-zone network cost
capacity
consistency
```

---

# 33. Multi-Region

Multi-region architecture is NOT the default.

It introduces major complexity in:

```text
data replication
consistency
routing
deployment
observability
failover
cost
testing
```

---

# 34. Multi-Region Justification

Use multi-region only when required by:

```text
regional disaster tolerance
latency
residency
business continuity
very high availability targets
```

---

# 35. Active-Active

Active-active multi-region means multiple regions serve production traffic simultaneously.

It requires deliberate:

```text
data consistency
routing
conflict resolution
failure handling
```

architecture.

---

# 36. Active-Passive

Active-passive may provide simpler disaster recovery when continuous multi-region traffic is unnecessary.

---

# 37. Multi-Region Data Is the Hard Part

Do not design multi-region compute without solving:

```text
source of truth
write ownership
replication
failover
consistency
```

for data.

---

# 38. Region Failover

Regional failover MUST be tested if it is part of the reliability claim.

A diagram is not a recovery mechanism.

---

# 39. DNS Failover

DNS MAY participate in failover but has:

```text
TTL
resolver caching
propagation
```

limitations.

Do not assume DNS switching is instantaneous.

---

# 40. Runtime Selection

Choose runtime based on:

```text
application needs
team capability
security support
performance
ecosystem
deployment model
operability
```

---

# 41. Supported Runtime

Production MUST use supported runtime versions receiving security maintenance.

---

# 42. Runtime Standardization

Organizations SHOULD maintain a small approved set of runtimes.

Example categories:

```text
Node.js
Python
JVM
Go
.NET
```

according to actual needs.

---

# 43. Avoid Runtime Proliferation

Do not introduce a new language/runtime for a small service unless the benefit outweighs:

```text
tooling
security
hiring
observability
deployment
maintenance
```

cost.

---

# 44. Runtime Ownership

Every runtime ecosystem requires an owner responsible for:

```text
supported versions
base images
security updates
tooling
deprecation
```

---

# 45. Runtime EOL

Applications MUST migrate before or promptly after runtime end-of-support according to risk policy.

---

# 46. VM Selection

Virtual machines MAY be appropriate for:

```text
legacy applications
special kernel needs
licensed software
special hardware
stateful systems
```

where higher-level managed compute is unsuitable.

---

# 47. VM Images

Production VMs SHOULD originate from:

```text
approved base image
versioned build process
patched image
```

rather than ad hoc manually configured hosts.

---

# 48. Immutable VM Pattern

Prefer replacing instances from a new image rather than repeatedly modifying running hosts manually.

---

# 49. Configuration Management

Where mutable VMs remain necessary, configuration management MUST be automated and version-controlled.

---

# 50. No Snowflake Servers

A server that cannot be recreated from documented automation is infrastructure debt.

---

# 51. SSH Access

Routine production operations SHOULD NOT require SSH access to application servers.

---

# 52. Break-Glass SSH

Emergency shell access MAY exist but MUST be:

```text
strongly authenticated
individually attributable
time-bounded where practical
audited
```

---

# 53. Containers

Containers package the application and runtime dependencies into a deployable artifact.

---

# 54. Container Image Principle

Container images SHOULD be:

```text
immutable
minimal
reproducible
versioned
scanned
```

---

# 55. Image Registry

Production images MUST be stored in an approved registry.

---

# 56. Immutable Image Identity

Production deployments SHOULD use immutable:

```text
digest
```

or equivalent artifact identity.

Do not rely solely on:

```text
latest
```

---

# 57. Base Images

Use approved maintained base images.

---

# 58. Base Image Pinning

Base images SHOULD be pinned sufficiently to provide reproducible builds and intentional updates.

---

# 59. Base Image Updates

Base images MUST receive security updates through regular rebuilds.

---

# 60. Small Images

Prefer minimal production images where practical.

Benefits include reduced:

```text
attack surface
download time
storage
```

---

# 61. Minimal Does Not Mean Unusable

Do not remove tooling required for:

```text
runtime correctness
TLS certificates
internationalization
```

merely to achieve smaller image size.

---

# 62. Multi-Stage Builds

Use multi-stage builds where they reduce production image contents.

---

# 63. Build Toolchain

Compilers/package managers SHOULD generally remain outside the final runtime image unless required.

---

# 64. Non-Root Containers

Application containers SHOULD run as a non-root user unless privileged execution is explicitly required.

---

# 65. Privileged Containers

Privileged containers MUST be exceptional and security-reviewed.

---

# 66. Container Capabilities

Drop unnecessary operating-system capabilities.

---

# 67. Read-Only Filesystem

Use a read-only root filesystem where the application supports it.

Writable state should be explicit.

---

# 68. Temporary Files

Applications requiring temporary disk SHOULD use explicitly provisioned temporary storage.

---

# 69. Container Secrets

Secrets MUST NOT be baked into images.

---

# 70. Image Layers

Deleting a secret in a later Docker layer does not necessarily remove it from earlier layers.

Never introduce it into the build context/image history.

---

# 71. Docker Build Context

Keep build context narrow.

Use ignore files to exclude:

```text
.git
.env
local credentials
large irrelevant files
```

---

# 72. Image Labels

Images SHOULD expose useful metadata such as:

```text
source revision
version
build identity
```

where appropriate.

---

# 73. Container Scanning

Production images SHOULD be scanned for known vulnerabilities according to Security Guidelines.

---

# 74. Image Signing / Provenance

Critical images SHOULD follow CI/CD artifact provenance/signing policy.

---

# 75. Container Runtime Resources

Containers MUST have deliberate CPU/memory sizing in orchestrated environments.

---

# 76. Resource Requests

Resource requests SHOULD represent expected scheduling requirements.

---

# 77. Resource Limits

Limits SHOULD be applied where they improve isolation and prevent runaway consumption.

They MUST be calibrated rather than copied blindly.

---

# 78. CPU Limits

CPU limits may throttle workloads.

Use based on workload characteristics and platform policy.

---

# 79. Memory Limits

Memory limits protect nodes but may terminate processes exceeding their allocation.

Applications MUST tolerate/process this correctly.

---

# 80. Resource Sizing

Sizing SHOULD derive from:

```text
measurement
load testing
production observation
```

rather than guesses alone.

---

# 81. Headroom

Critical workloads need sufficient headroom for:

```text
traffic spikes
instance loss
deployments
```

---

# 82. Container Health

Distinguish:

```text
startup
readiness
liveness
```

health semantics.

---

# 83. Startup Health

Startup checks answer:

> Has the application completed initialization?

---

# 84. Readiness

Readiness answers:

> Can this instance receive traffic or work right now?

---

# 85. Liveness

Liveness answers:

> Is this process stuck in a way where restart is likely to help?

---

# 86. Do Not Conflate Readiness and Liveness

A temporary downstream outage may justify:

```text
not ready
```

without justifying:

```text
restart application forever
```

---

# 87. Liveness Caution

Aggressive liveness checks can amplify incidents by repeatedly restarting healthy-but-overloaded workloads.

---

# 88. Health Checks Must Be Cheap

Health endpoints MUST NOT execute expensive queries on every probe.

---

# 89. Startup Dependency

Long startup processes SHOULD use startup/readiness semantics instead of excessively delayed liveness checks.

---

# 90. Graceful Shutdown

Application workloads MUST support graceful termination where requests/jobs can be in flight.

---

# 91. Termination Flow

Conceptually:

```text
Receive termination
↓
Stop accepting new work
↓
Drain in-flight work
↓
Flush bounded telemetry
↓
Exit before deadline
```

---

# 92. Termination Timeout

Shutdown MUST remain bounded.

Do not wait indefinitely.

---

# 93. Load Balancer Draining

Instances SHOULD be removed from traffic before process termination.

---

# 94. Long-Lived Connections

Applications using:

```text
WebSockets
SSE
long polling
```

need deliberate connection-draining behavior.

---

# 95. Kubernetes

If Kubernetes is used, it is infrastructure—not the application architecture.

Applications SHOULD remain understandable independently of cluster implementation details.

---

# 96. Managed Kubernetes

Prefer managed control planes unless self-management is materially justified.

---

# 97. Cluster Count

Do not create clusters casually.

Clusters introduce:

```text
control plane
upgrades
networking
security
capacity
observability
```

overhead.

---

# 98. Cluster Boundary

A Kubernetes cluster can be a useful blast-radius boundary but is not automatically a complete security boundary.

---

# 99. Namespace

Namespaces provide organization and policy scope.

They MUST NOT be treated as sufficient isolation without:

```text
RBAC
network policy
workload identity
resource policy
```

---

# 100. Kubernetes RBAC

Use least-privilege Kubernetes RBAC.

---

# 101. Cluster Admin

Cluster-admin access MUST be tightly restricted.

---

# 102. Workload Identity in Kubernetes

Pods SHOULD use workload/service identity rather than embedded long-lived cloud keys.

---

# 103. Service Accounts

Use dedicated service accounts for workloads.

Avoid one shared highly privileged identity.

---

# 104. Pod Security

Workloads SHOULD use restrictive security contexts.

Examples:

```text
non-root
no privilege escalation
minimal capabilities
read-only filesystem where possible
```

---

# 105. Host Namespace Access

Avoid:

```text
hostNetwork
hostPID
hostIPC
```

unless explicitly required.

---

# 106. Host Path

Host filesystem mounts require security review.

---

# 107. Resource Quotas

Shared clusters SHOULD use quotas/limits to prevent one workload from exhausting shared capacity.

---

# 108. Limit Ranges

Platform policies MAY establish default resource ranges.

Defaults do not replace workload-specific sizing.

---

# 109. Pod Disruption

Critical workloads SHOULD define disruption behavior that permits safe node maintenance without destroying availability.

---

# 110. Replica Count

Critical stateless workloads SHOULD normally have multiple replicas when availability objectives require it.

---

# 111. One Replica

A single replica is a single workload failure point.

It may still be acceptable for low-criticality applications.

---

# 112. Anti-Affinity / Topology

Critical replicas SHOULD be distributed across relevant failure domains where platform support and scale justify it.

---

# 113. Node Pools

Separate node pools MAY be appropriate for:

```text
GPU
high-memory
trusted workloads
special architectures
```

---

# 114. Node Lifecycle

Cluster nodes MUST have an upgrade/replacement strategy.

---

# 115. Kubernetes Version Support

Clusters SHOULD remain within provider/project-supported Kubernetes release windows.

---

# 116. Cluster Upgrades

Cluster upgrades require routine testing and should not become rare high-risk projects.

---

# 117. Custom Operators

Do not introduce a Kubernetes operator unless the lifecycle problem genuinely requires controller-style automation.

---

# 118. CRD Governance

Custom Resource Definitions become platform APIs.

They require:

```text
ownership
versioning
upgrade policy
```

---

# 119. Service Mesh

A service mesh MAY be justified for:

```text
service identity
mTLS
traffic policy
deep observability
```

at sufficient scale.

---

# 120. Service Mesh Is Not Default

Do not introduce a mesh simply because services communicate over a network.

Its complexity must be justified.

---

# 121. Compute Scaling

Scaling strategy MUST reflect workload behavior.

---

# 122. Vertical Scaling

Vertical scaling increases resources available to an instance.

It is simple but bounded.

---

# 123. Horizontal Scaling

Horizontal scaling adds workload instances.

It generally requires:

```text
statelessness
shared/external state
safe concurrency
```

---

# 124. Stateless Application Tier

Web/API tiers SHOULD remain stateless where practical.

Store durable/shared state in appropriate state systems.

---

# 125. Local Memory

Do not assume requests from one user always return to the same instance.

---

# 126. Sticky Sessions

Sticky sessions MAY be used when needed but SHOULD NOT compensate for avoidable stateful application architecture.

---

# 127. Autoscaling

Autoscaling SHOULD use metrics that represent actual resource/workload pressure.

---

# 128. CPU Autoscaling

CPU MAY be an appropriate signal for CPU-bound workloads.

It is not universally correct.

---

# 129. Queue-Based Autoscaling

Worker fleets SHOULD consider signals such as:

```text
queue depth
oldest message age
processing latency
```

---

# 130. Request-Based Scaling

Request rate/concurrency MAY be more appropriate than CPU for I/O-heavy services.

---

# 131. Scale-Up Delay

Scaling is not instantaneous.

Capacity planning must account for:

```text
instance startup
container pull
application warmup
```

---

# 132. Minimum Capacity

Critical services SHOULD maintain minimum capacity sufficient for baseline traffic and failure tolerance.

---

# 133. Maximum Capacity

Autoscaling MUST have maximum limits to constrain:

```text
runaway cost
dependency overload
```

---

# 134. Scaling One Layer Can Break Another

Increasing application replicas can overload:

```text
database
connection pool
downstream API
queue
```

Scaling must consider the complete system.

---

# 135. Database Connections

Instance scaling plans MUST account for database connection limits.

---

# 136. Connection Pool Budget

Conceptually:

```text
maximum instances
×
max connections per instance
≤
safe DB capacity
```

with appropriate headroom.

---

# 137. Load Testing

Scaling assumptions SHOULD be validated through load/performance testing.

---

# 138. Capacity Planning

Critical services SHOULD understand:

```text
normal demand
peak demand
growth
failure capacity
quota limits
```

---

# 139. Quotas

Cloud provider quotas are capacity constraints.

Critical services MUST monitor/request adequate quotas before demand requires them.

---

# 140. Load Balancing

Load balancers distribute traffic across healthy service instances.

---

# 141. Managed Load Balancers

Managed load balancing SHOULD be preferred unless specialized behavior requires otherwise.

---

# 142. Health-Based Routing

Load balancers MUST stop sending normal traffic to instances that are not ready.

---

# 143. Layer 4 vs Layer 7

Choose the simplest load-balancing layer that provides required:

```text
routing
TLS
protocol
observability
```

behavior.

---

# 144. TLS Termination

TLS MAY terminate at:

```text
edge
load balancer
application
```

depending on trust architecture.

---

# 145. Internal Encryption

Sensitive internal service communication SHOULD use encrypted transport where threat model/policy requires it.

---

# 146. End-to-End TLS

Use end-to-end encryption when intermediate network boundaries cannot be trusted or policy requires it.

---

# 147. Load Balancer Timeout

Configure connection/request timeouts according to application protocols.

Avoid provider defaults without review for long-running operations.

---

# 148. Upload Timeout

Large upload workflows may require different timeout architecture from normal API requests.

---

# 149. Idle Timeout

Long-lived connections need compatible load-balancer idle timeouts.

---

# 150. Connection Draining

Load balancers SHOULD support graceful backend draining during deployments.

---

# 151. Algorithms

Default load-balancing algorithms are usually sufficient.

Use specialized algorithms only when measured workload characteristics justify them.

---

# 152. Internal Load Balancers

Services not intended for public access SHOULD use private/internal exposure where practical.

---

# 153. Internet Exposure

Only services intentionally designed for public access should receive public endpoints.

---

# 154. DNS

DNS configuration is production infrastructure.

It MUST be versioned/controlled where practical.

---

# 155. DNS Ownership

Every production domain SHOULD have explicit ownership.

---

# 156. DNS TTL

Choose TTLs deliberately.

Lower TTL:

```text
faster changes
more DNS traffic
```

Higher TTL:

```text
better caching
slower failover/change
```

---

# 157. DNS Changes

High-impact DNS changes require review and rollback planning.

---

# 158. Domain Renewal

Production domains MUST have controlled:

```text
ownership
renewal
MFA
```

to prevent accidental expiration or takeover.

---

# 159. DNS Security

Registrar/DNS provider accounts require strong authentication and restricted access.

---

# 160. TLS Certificates

Production endpoints MUST use valid TLS certificates.

---

# 161. Certificate Automation

Certificate issuance and renewal SHOULD be automated.

---

# 162. Certificate Expiry

Certificate expiry MUST be monitored before expiration.

---

# 163. Private Keys

TLS private keys are Restricted secrets.

---

# 164. CDN

CDNs SHOULD be used when they materially improve:

```text
latency
origin load
availability
bandwidth efficiency
```

---

# 165. CDN Content

Good CDN candidates include:

```text
static assets
public images
downloads
cacheable responses
```

according to content semantics.

---

# 166. CDN Is a Cache

Every CDN decision requires an explicit cache policy.

---

# 167. Private Data

Do not cache personalized/private content publicly.

---

# 168. Cache-Control

Applications SHOULD use correct HTTP caching semantics rather than relying solely on provider-specific CDN rules.

---

# 169. CDN Cache Key

Cache keys must contain all dimensions affecting the response.

Examples:

```text
path
approved query params
locale
content encoding
```

where relevant.

---

# 170. Authorization and CDN

Authenticated responses require particular care.

Do not accidentally serve User A's response to User B.

---

# 171. CDN Query Parameters

Ignore irrelevant tracking parameters where safe to improve cache efficiency.

Do not ignore parameters that alter content.

---

# 172. Cache Invalidation

CDN invalidation should be:

```text
deliberate
bounded
rare where versioned asset URLs can solve it
```

---

# 173. Fingerprinted Assets

Static assets SHOULD use content-hashed/fingerprinted names where supported.

This enables long cache lifetimes.

---

# 174. CDN Origin Protection

Origins SHOULD be protected from arbitrary bypass when security/architecture requires edge controls to apply.

---

# 175. Edge Functions

Edge compute MAY reduce latency for suitable lightweight tasks.

It SHOULD NOT become an uncontrolled second application architecture.

---

# 176. Edge Runtime Constraints

Understand:

```text
runtime APIs
execution time
storage
network
observability
region behavior
```

before choosing edge compute.

---

# 177. WAF

A web application firewall MAY provide defense in depth for internet-facing workloads.

It does not replace secure application code.

---

# 178. WAF Rules

WAF rules SHOULD be tested to avoid blocking legitimate traffic.

---

# 179. DDoS Protection

Internet-facing critical services SHOULD use provider/platform DDoS protections appropriate to risk.

---

# 180. Rate Limiting

Rate limiting SHOULD be enforced at the most useful boundary:

```text
edge
gateway
application
```

or combination.

---

# 181. Network Architecture

Network design SHOULD minimize unnecessary reachable paths.

---

# 182. Network Boundary Principle

A network boundary is a defense-in-depth control.

It MUST NOT be treated as the sole authorization mechanism.

---

# 183. Zero Trust Principle

Do not grant implicit application trust simply because traffic originated from:

```text
private network
VPN
same VPC
same cluster
```

---

# 184. Identity-Based Access

Service access SHOULD increasingly rely on:

```text
workload identity
authentication
authorization
```

in addition to network boundaries.

---

# 185. VPC / Virtual Network

Production workloads SHOULD use deliberately designed virtual network boundaries.

---

# 186. Public Subnets

Only resources requiring direct public connectivity SHOULD reside behind public ingress paths.

---

# 187. Private Compute

Application/database infrastructure SHOULD generally use private addressing where direct internet access is unnecessary.

---

# 188. Internet Egress

Outbound internet access SHOULD be intentional.

---

# 189. Default Egress

Sensitive environments SHOULD consider restricting arbitrary outbound traffic.

---

# 190. Egress Allowlisting

High-assurance workloads MAY restrict egress to approved destinations.

---

# 191. Egress Proxy/Gateway

Central egress controls MAY improve:

```text
policy
logging
IP stability
```

for suitable environments.

---

# 192. NAT

NAT is a connectivity mechanism.

It is not a security boundary by itself.

---

# 193. Private Endpoints

Use private provider-service endpoints where they materially reduce unnecessary public network exposure.

---

# 194. Security Groups / Firewalls

Firewall rules MUST follow least-access principles.

---

# 195. `0.0.0.0/0`

Broad inbound access MUST be justified.

It is appropriate only for intentionally public services/ports.

---

# 196. Administrative Ports

Administrative interfaces MUST NOT be publicly exposed without strong controlled access.

---

# 197. Bastion Hosts

Traditional bastions MAY be used where required but SHOULD be replaced with identity-aware managed access where practical.

---

# 198. VPN

VPN access alone MUST NOT imply application authorization.

---

# 199. Service-to-Service Networking

Internal services SHOULD expose only required:

```text
ports
protocols
callers
```

where platform support allows.

---

# 200. Network Policy

Container orchestration environments SHOULD use network policy where meaningful isolation is required.

---

# 201. Deny-by-Default Networking

High-assurance environments SHOULD consider:

```text
default deny
+
explicit allow
```

network policy.

---

# 202. Network Segmentation

Segment environments/workloads where it reduces blast radius.

Do not create segmentation so complex that operators cannot understand it.

---

# 203. Service Discovery

Service discovery SHOULD use canonical platform mechanisms.

Do not hardcode ephemeral instance IP addresses.

---

# 204. Internal DNS

Stable service names SHOULD resolve to dynamic instances through managed discovery.

---

# 205. Service Ports

Service ports SHOULD be standardized/documented where practical.

---

# 206. IAM

Identity and Access Management is the primary control plane for cloud authorization.

---

# 207. Human Identity

Humans MUST use individual identities.

No shared cloud-admin accounts.

---

# 208. SSO

Cloud administrative access SHOULD use centralized SSO.

---

# 209. MFA

Privileged human cloud access MUST use strong MFA.

---

# 210. Root / Owner Accounts

Cloud root/owner identities MUST be highly restricted.

They SHOULD NOT be used for routine operations.

---

# 211. Root Credentials

Root/recovery credentials MUST be:

```text
strongly protected
rarely used
monitored
```

---

# 212. Least Privilege

Grant only:

```text
required actions
required resources
required duration
```

---

# 213. Role-Based Access

Use roles/groups rather than attaching one-off permissions to individual users where practical.

---

# 214. Temporary Privilege

High privilege SHOULD be:

```text
just in time
time bounded
audited
```

where platform capability allows.

---

# 215. Workload Identity

Applications SHOULD authenticate to cloud services through workload identity rather than embedded static credentials.

---

# 216. No Cloud Keys in Source

Cloud API keys/secret access keys MUST NOT appear in:

```text
source
images
configuration repositories
```

---

# 217. Service Identity

Each meaningful service SHOULD have a distinct workload identity.

---

# 218. Shared Service Accounts

Avoid one service account for all applications.

---

# 219. Permission Blast Radius

Compromise of one workload identity SHOULD NOT grant control over unrelated workloads.

---

# 220. Read vs Write IAM

Separate read and write permissions where operationally meaningful.

---

# 221. Resource-Scoped IAM

Prefer resource-scoped permissions over account-wide permissions.

---

# 222. Wildcard Permissions

Permissions like:

```text
*
```

require strong justification and SHOULD be avoided.

---

# 223. IAM Conditions

Use contextual conditions where they materially improve least privilege.

Examples:

```text
resource tags
environment
service identity
```

---

# 224. IAM as Code

IAM policy SHOULD be managed as code where practical.

---

# 225. IAM Review

High-risk IAM changes require review.

---

# 226. IAM Access Review

Privileged human access SHOULD be reviewed periodically.

---

# 227. Dormant Access

Remove access that is no longer needed.

---

# 228. Break-Glass Access

Emergency cloud administration MUST be:

```text
rare
MFA protected
individually attributable
alerted
reviewed
```

---

# 229. IAM Audit Logs

Cloud identity and administrative actions MUST be auditable.

---

# 230. Control Plane Logs

Important production cloud control-plane audit logs SHOULD be enabled and retained appropriately.

---

# 231. Log Protection

Security/audit logs require controlled access and retention.

---

# 232. Infrastructure as Code

Production infrastructure SHOULD be represented through Infrastructure as Code wherever practical.

---

# 233. IaC Is Source

IaC definitions are production code.

They require:

```text
version control
review
testing
ownership
```

---

# 234. IaC Tools

Use a small approved toolset.

Examples may include declarative cloud-native tools or Terraform/OpenTofu-style systems.

The standard is the practice, not one product.

---

# 235. No ClickOps as Normal Architecture

Routine production infrastructure SHOULD NOT depend on undocumented manual console creation.

---

# 236. IaC Plan

Infrastructure changes SHOULD produce a plan/diff before application.

---

# 237. Plan Review

Review changes for:

```text
creation
modification
replacement
deletion
IAM
network
data
```

impact.

---

# 238. Destructive Changes

Destructive infrastructure changes MUST be clearly visible before approval.

---

# 239. IaC Apply

Production IaC SHOULD be applied through controlled CI/CD workflows.

---

# 240. Local Production Apply

Routine:

```text
terraform apply
```

or equivalent from developer laptops against production SHOULD be prohibited.

---

# 241. IaC Identity

IaC automation must use least-privilege workload identity.

---

# 242. IaC State

IaC state is sensitive production data.

It may contain:

```text
resource IDs
configuration
occasionally sensitive values
```

---

# 243. Remote State

Shared production infrastructure SHOULD use controlled remote state or equivalent backend.

---

# 244. State Encryption

Infrastructure state SHOULD be encrypted at rest and in transit.

---

# 245. State Access

State access MUST be restricted.

---

# 246. State Locking

Concurrent writes to shared state MUST be prevented.

---

# 247. State Backup

Critical IaC state requires recoverability.

---

# 248. Secrets in State

Avoid designs that unnecessarily persist plaintext secret values in state.

---

# 249. IaC Modules

Shared IaC modules SHOULD follow Reusability Guidelines.

---

# 250. Module Boundaries

Modules should represent stable infrastructure capabilities rather than wrappers around every single resource.

---

# 251. Module Versioning

Shared infrastructure modules require controlled versioning.

---

# 252. Module Updates

Do not silently force every workload onto changed infrastructure semantics.

---

# 253. IaC Validation

CI SHOULD perform:

```text
formatting
syntax validation
policy checks
security scanning
plan generation
```

as applicable.

---

# 254. Policy as Code

Organizations MAY enforce infrastructure policy automatically.

Examples:

```text
no public database
encryption required
approved regions
required tags
```

---

# 255. Policy Exceptions

Infrastructure-policy exemptions require:

```text
reason
owner
scope
review/expiry
```

---

# 256. Drift

Infrastructure drift means live resources differ from declared infrastructure.

---

# 257. Drift Detection

Important production infrastructure SHOULD be checked for drift.

---

# 258. Manual Emergency Changes

Emergency console changes MAY occur.

They MUST be:

```text
audited
documented
reconciled to IaC
or reverted
```

---

# 259. Import Existing Resources

Existing manually created resources SHOULD be imported or otherwise brought under declared management where practical.

---

# 260. Do Not Recreate Dangerous Resources Blindly

Adopting IaC MUST NOT accidentally destroy critical existing resources.

Import/adoption plans require care.

---

# 261. Immutable Infrastructure

Prefer replacement over uncontrolled mutation where practical.

---

# 262. Resource Naming

Resource names SHOULD be:

```text
predictable
stable
environment-aware
```

according to provider constraints.

---

# 263. Resource IDs

Do not depend unnecessarily on human-readable resource names when provider-assigned stable IDs exist.

---

# 264. Infrastructure Tags / Labels

Resources SHOULD include canonical metadata such as:

```text
environment
service
owner
cost center/product
managed-by
```

where provider support permits.

---

# 265. Tags Are Governance Data

Tagging supports:

```text
cost
ownership
inventory
automation
security
```

and should be enforced consistently.

---

# 266. Sensitive Tags

Do not place secrets or sensitive customer data in cloud resource tags.

---

# 267. Object Storage

Object storage SHOULD be used for durable blobs such as:

```text
uploads
images
exports
backups
artifacts
```

when appropriate.

---

# 268. Object Storage Is Not Database Replacement

Do not use object storage for transactional mutable records merely to avoid a database unless workload semantics justify it.

---

# 269. Bucket Access

Buckets/containers MUST be private by default.

---

# 270. Public Objects

Public access requires deliberate design.

Prefer scoped public delivery through:

```text
CDN
signed URL
approved public bucket
```

depending on requirements.

---

# 271. Block Public Access

Provider-level public-access prevention SHOULD be enabled for storage expected to remain private.

---

# 272. Storage IAM

Use workload identity and least privilege for object storage.

---

# 273. Object Encryption

Sensitive object storage MUST use appropriate encryption.

---

# 274. Object Keys

Object names/keys SHOULD NOT contain unnecessary sensitive data.

---

# 275. Signed URLs

Signed URLs SHOULD be:

```text
short-lived
scope-limited
HTTPS
```

for private object sharing.

---

# 276. Upload URLs

Direct browser-to-storage upload MAY reduce application bandwidth.

It requires:

```text
scoped key/path
size constraints
type validation
expiry
post-upload verification
```

---

# 277. Uploaded Content Is Untrusted

Uploading to cloud storage does not make content safe.

Follow File & Media Security rules.

---

# 278. Object Lifecycle

Storage lifecycle policies SHOULD automatically handle:

```text
expiry
archival
tiering
deletion
```

where applicable.

---

# 279. Object Versioning

Versioning MAY protect against accidental overwrite/delete.

It increases storage and retention complexity.

---

# 280. Object Retention

Object lifecycle MUST align with Privacy/Data Governance retention policies.

---

# 281. Replication

Cross-region object replication should exist only when:

```text
recovery
latency
residency
```

requirements justify it.

---

# 282. Storage Events

Object-created/deleted events MAY trigger asynchronous processing.

Consumers must tolerate duplicate/out-of-order delivery where the provider semantics permit it.

---

# 283. File Storage

Shared file systems MAY be appropriate for workloads requiring POSIX/shared file semantics.

Do not choose them for applications that naturally fit object storage.

---

# 284. Block Storage

Block storage should remain attached to workloads that genuinely require filesystem/block semantics.

---

# 285. Ephemeral Disk

Containers/VMs MUST NOT treat ephemeral local disk as durable state.

---

# 286. Queue Infrastructure

Queues decouple producers from asynchronous consumers.

---

# 287. Queue Justification

Use a queue when:

```text
work is asynchronous
load must be buffered
producer/consumer should decouple
retries are required
```

Do not introduce one merely because distributed systems often use queues.

---

# 288. Durable Queues

Business-critical asynchronous work SHOULD use durable managed queues where appropriate.

---

# 289. Delivery Semantics

Understand whether infrastructure provides:

```text
at-most-once
at-least-once
ordered subsets
```

semantics.

---

# 290. At-Least-Once Default Mindset

Consumers SHOULD generally be designed idempotently because duplicate delivery is common in durable messaging systems.

---

# 291. Message ID

Important messages SHOULD have stable identity where deduplication/tracing requires it.

---

# 292. Visibility / Lease Timeout

Queue visibility/lease timeout MUST exceed normal job processing duration with appropriate renewal semantics for long tasks.

---

# 293. Retry

Retries MUST use bounded:

```text
attempts
backoff
jitter
```

according to Error Handling Guidelines.

---

# 294. Dead-Letter Queue

Poison/failed messages SHOULD have a defined dead-letter policy where the queue system supports it.

---

# 295. DLQ Is Not Disposal

Messages reaching a DLQ require:

```text
monitoring
ownership
inspection
replay/disposition
```

---

# 296. Queue Depth

Observe:

```text
queue depth
oldest message age
processing rate
failure rate
DLQ depth
```

---

# 297. Queue Autoscaling

Worker scaling SHOULD prioritize queue pressure and age rather than CPU alone where appropriate.

---

# 298. Backpressure

Systems MUST have a plan when producers exceed consumer capacity.

---

# 299. Unbounded Queue

An infinitely growing queue is not resilience.

It is delayed failure.

---

# 300. Queue Message Size

Keep queue messages reasonably small.

For large payloads:

```text
store object
send reference
```

when appropriate.

---

# 301. Message Secrets

Do not place long-lived credentials in queue payloads.

---

# 302. PII in Queues

Queue contents are data stores and follow Privacy/Data Governance rules.

---

# 303. Queue Encryption

Sensitive messaging SHOULD use provider-supported encryption and restricted access.

---

# 304. Queue Identity

Producer and consumer SHOULD have distinct permissions.

---

# 305. Publish vs Consume

A producer often needs:

```text
send
```

not:

```text
receive/delete/administer
```

permissions.

---

# 306. Events vs Queues

Use:

```text
queue
```

for work distribution.

Use:

```text
event/pub-sub
```

for notifying independent interested consumers.

Do not conflate semantics.

---

# 307. Event Infrastructure

Event systems require:

```text
schema
versioning
ownership
ordering assumptions
idempotency
```

according to Architecture/API Guidelines.

---

# 308. Infrastructure Databases

Database infrastructure follows Data & Database Guidelines.

Deployment architecture still owns:

```text
network placement
availability
compute class
backup integration
IAM
capacity
```

---

# 309. Managed Database Default

Managed database platforms SHOULD generally be preferred unless self-management is specifically justified.

---

# 310. Database Public Exposure

Production databases SHOULD NOT be directly internet-accessible unless a specialized architecture requires it.

---

# 311. Database Network Access

Only approved application/admin paths should reach the database.

---

# 312. Database Authentication

Prefer managed identity/tokenized access where database/provider support makes it practical.

---

# 313. Database TLS

Application/database traffic SHOULD use secure transport.

---

# 314. Read Replicas

Read replicas MAY address:

```text
read scaling
analytics isolation
regional reads
```

but introduce replication lag semantics.

---

# 315. Cache Infrastructure

Caches follow Caching Guidelines.

Infrastructure must still govern:

```text
network
memory
availability
persistence
encryption
```

---

# 316. Cache Is Disposable by Default

Application correctness SHOULD NOT rely on a cache as the only authoritative copy unless the technology is explicitly being used as a durable datastore.

---

# 317. Cache Failure

Loss of ordinary cache SHOULD degrade performance, not corrupt authoritative data.

---

# 318. Secrets Management

Production secrets MUST use the approved secret-management architecture.

---

# 319. Cloud Secret Manager

Managed secret/key management SHOULD be preferred over plaintext environment/config stores for production secrets.

---

# 320. Runtime Secret Delivery

Applications SHOULD retrieve or receive secrets without developers needing plaintext production access.

---

# 321. Secret Rotation

Infrastructure must support secret rotation with minimal downtime where practical.

---

# 322. Key Management

Encryption keys SHOULD use managed key-management infrastructure appropriate to sensitivity.

---

# 323. Customer-Managed Keys

Customer-managed encryption keys SHOULD only be introduced when contractual/security requirements justify the added operational complexity.

---

# 324. Key Deletion

Key destruction can cause irreversible data loss.

Deletion workflows require strong controls.

---

# 325. Infrastructure Observability

Every production infrastructure layer must be observable.

---

# 326. Infrastructure Metrics

Relevant signals MAY include:

```text
CPU
memory
disk
network
connection counts
load balancer health
queue age
storage errors
autoscaling state
```

---

# 327. Application Health Over Infrastructure Health

A VM at 20% CPU does not prove users are succeeding.

Infrastructure signals supplement application SLIs.

---

# 328. Control Plane Events

Important cloud infrastructure changes SHOULD appear in audit/operational monitoring.

---

# 329. Deployment Markers

Infrastructure changes SHOULD correlate with Observability deployment/change markers.

---

# 330. Infrastructure Alerts

Alert only on actionable conditions.

Avoid paging on raw CPU simply because it exceeds an arbitrary threshold.

---

# 331. Saturation

Capacity/saturation signals often matter more than utilization alone.

Examples:

```text
queue wait
connection wait
disk exhaustion
throttling
quota exhaustion
```

---

# 332. Infrastructure Logs

Platform logs SHOULD be retained according to operational/security value.

Do not enable maximal verbose logging indefinitely without need.

---

# 333. Cloud Audit Logs

Administrative changes to:

```text
IAM
network
security
compute
storage
```

SHOULD be captured through provider audit mechanisms.

---

# 334. Reliability

Infrastructure SHOULD be designed against explicit failure assumptions.

---

# 335. Failure Domains

Know which resources share:

```text
host
rack
zone
region
provider
```

failure domains where applicable.

---

# 336. Redundancy

Redundancy should correspond to reliability requirements.

Do not blindly duplicate every component.

---

# 337. Single Points of Failure

Critical architectures SHOULD identify and eliminate unjustified SPOFs.

---

# 338. Managed Service Control Plane

Even managed services can fail.

Understand:

```text
availability model
regional scope
failover
quotas
maintenance
```

---

# 339. Dependency Failure

Infrastructure must tolerate reasonable:

```text
DNS failure
network timeout
provider throttling
instance loss
zone loss
```

according to SLO.

---

# 340. Self-Healing

Infrastructure SHOULD automatically replace unhealthy disposable compute where safe.

---

# 341. Self-Healing Is Not Root-Cause Resolution

Restarting/replacing instances can mitigate failures but does not eliminate underlying bugs.

---

# 342. Health Automation

Automated remediation MUST have bounded blast radius.

---

# 343. Cascading Recovery

Do not configure recovery mechanisms that amplify incidents.

Example:

```text
dependency slow
→ every pod fails liveness
→ all restart
→ dependency receives reconnection storm
```

---

# 344. Thundering Herd

Startup/retry/scaling behavior SHOULD use:

```text
jitter
rate limiting
warmup
```

where mass simultaneous activity creates risk.

---

# 345. Dependency Timeouts

Every remote infrastructure dependency requires bounded timeouts.

---

# 346. Retries

Infrastructure retries follow Error Handling Guidelines:

```text
bounded
idempotent-aware
backoff
jitter
```

---

# 347. Circuit Breakers

Circuit breakers MAY be appropriate around persistently failing dependencies.

They are not mandatory infrastructure for every call.

---

# 348. Graceful Degradation

Infrastructure should permit degraded operation where product semantics allow.

---

# 349. Quota Failure

Critical provider quota exhaustion SHOULD be observable before customer impact where possible.

---

# 350. Storage Capacity

Disk/storage exhaustion MUST be monitored for capacity-limited systems.

---

# 351. File Descriptor / Connection Limits

High-throughput workloads SHOULD understand operating/runtime limits that can become hidden bottlenecks.

---

# 352. Capacity Tests

Infrastructure capacity assumptions SHOULD be tested before major traffic events.

---

# 353. Reliability Targets

Infrastructure redundancy should support the service's SLO, RTO, and RPO—not arbitrary "five nines" aspirations.

---

# 354. Overengineering Reliability

Adding:

```text
multiple clouds
multiple regions
service mesh
complex replication
```

without requirement may reduce overall reliability by increasing operational complexity.

---

# 355. Multi-Cloud

Multi-cloud is NOT the default resilience strategy.

---

# 356. Multi-Cloud Justification

Use multi-cloud only for concrete requirements such as:

```text
regulatory constraint
strategic portability
provider concentration risk
customer requirement
```

that justify major complexity.

---

# 357. Superficial Multi-Cloud

Using identical Terraform syntax on two clouds does not create a portable application architecture.

---

# 358. Lowest-Common-Denominator Cloud

Do not avoid valuable managed services merely to preserve hypothetical portability unless portability is a real requirement.

---

# 359. Portability Through Boundaries

Prefer portability through:

```text
domain boundaries
adapters
data export
open protocols
```

rather than avoiding every vendor capability.

---

# 360. Infrastructure Cost

Cost is a first-class quality attribute.

---

# 361. Cost Ownership

Every production workload SHOULD have cost ownership.

---

# 362. Cost Attribution

Cloud resources SHOULD be attributable to:

```text
product
service
team
environment
```

where practical.

---

# 363. Budgets

Production/cloud organizations SHOULD establish budget monitoring appropriate to scale.

---

# 364. Cost Alerts

Alert on abnormal/unexpected spend rather than merely high spend.

---

# 365. Cost Anomaly

Sudden cost growth can indicate:

```text
traffic growth
resource leak
attack
misconfiguration
```

---

# 366. Right-Sizing

Resources SHOULD be periodically right-sized from observed usage.

---

# 367. Do Not Right-Size Away Reliability

Cost optimization MUST preserve required:

```text
headroom
redundancy
SLO
```

---

# 368. Idle Non-Production

Non-production resources MAY scale to zero or shut down when unused where workflow permits.

---

# 369. Production Scale-to-Zero

Production scale-to-zero is appropriate only when cold-start behavior and availability requirements permit it.

---

# 370. Storage Cost

Lifecycle/retention policies SHOULD reduce unnecessary old:

```text
logs
snapshots
objects
artifacts
```

according to governance.

---

# 371. Network Egress Cost

Architecture SHOULD consider cross-region and internet egress cost.

---

# 372. Chatty Cross-Region Architecture

Avoid unnecessary high-volume cross-region service calls.

They increase:

```text
latency
cost
failure surface
```

---

# 373. Spot / Preemptible Capacity

Interruptible compute MAY be used for fault-tolerant workloads such as:

```text
batch
CI
stateless workers
```

---

# 374. Spot for Critical Singleton

Do not place irreplaceable singleton production work exclusively on interruptible compute.

---

# 375. Mixed Capacity

Workloads MAY combine:

```text
baseline stable capacity
+
interruptible burst capacity
```

where appropriate.

---

# 376. Infrastructure Security

Infrastructure MUST follow the Security Gold Standard.

---

# 377. Secure Defaults

New infrastructure SHOULD be:

```text
private
encrypted
least privileged
non-public
```

by default where practical.

---

# 378. Public Exposure Review

Creating new public endpoints requires deliberate review.

---

# 379. Inventory

The organization SHOULD maintain inventory of important cloud resources.

---

# 380. Unmanaged Resources

Resources with:

```text
no owner
unknown purpose
no IaC
```

are operational/security debt.

---

# 381. Orphan Detection

Organizations SHOULD periodically identify unused/orphaned:

```text
IP addresses
volumes
snapshots
load balancers
DNS records
keys
service accounts
```

---

# 382. Resource Deletion

Deleting infrastructure requires understanding of:

```text
data
dependencies
DNS
backups
recovery
```

---

# 383. Destructive Protection

Critical stateful resources SHOULD use deletion protection where provider capability and operational model justify it.

---

# 384. Deletion Protection Is Not Backup

Protection against accidental deletion does not replace backup/recovery.

---

# 385. Production Access

Human production infrastructure access SHOULD be minimized.

---

# 386. Read-Only First

Operational investigation SHOULD begin with read-only access.

---

# 387. Direct Console Access

Routine production change through cloud consoles SHOULD be discouraged.

---

# 388. Console for Investigation

Read-only cloud console access MAY be useful for investigation.

Changes should still flow through declared automation whenever practical.

---

# 389. Production Shell

Application debugging SHOULD use:

```text
logs
metrics
traces
controlled diagnostics
```

before shell access.

---

# 390. Ephemeral Debug Container

Ephemeral/debug containers MAY be used under controlled production-debugging policy.

They must not become permanent sidecars.

---

# 391. Admin Endpoints

Infrastructure/admin endpoints MUST be private or strongly identity-protected.

---

# 392. Metadata Services

Cloud instance metadata access SHOULD use the provider's secure modern mechanism and be restricted from workloads that do not need it.

---

# 393. SSRF and Metadata

Infrastructure MUST consider SSRF paths to cloud metadata/credentials.

---

# 394. Identity Tokens

Workload identity tokens SHOULD be:

```text
short-lived
audience scoped
```

where supported.

---

# 395. Secrets in User Data

VM/container startup/user-data scripts MUST NOT contain plaintext long-lived secrets where they may be stored or logged.

---

# 396. Infrastructure Testing

Infrastructure MUST be tested proportionately.

---

# 397. IaC Unit/Static Tests

Use static validation/policy tests for important infrastructure constraints.

---

# 398. Ephemeral Integration Infrastructure

Critical infrastructure modules MAY be validated through temporary deployments where cost permits.

---

# 399. Network Tests

Security-sensitive networking SHOULD test intended:

```text
allowed paths
denied paths
```

---

# 400. IAM Tests

Critical IAM policy SHOULD be tested for both required access and forbidden privilege.

---

# 401. Failure Testing

High-reliability systems SHOULD test selected failure scenarios.

Examples:

```text
instance termination
zone impairment
dependency unavailable
queue backlog
```

---

# 402. Chaos Testing

Chaos engineering MAY be useful for mature systems.

It SHOULD NOT be introduced before basic:

```text
monitoring
recovery
safe deployment
```

exist.

---

# 403. Production Failure Testing

Production chaos requires:

```text
clear blast radius
stop conditions
observability
ownership
```

---

# 404. Load Testing

Load tests SHOULD use production-like topology when validating infrastructure capacity.

---

# 405. Benchmark Environment

Performance tests must document infrastructure shape.

Results from a laptop do not establish production capacity.

---

# 406. IaC CI

Infrastructure changes SHOULD pass:

```text
format
validate
security/policy scan
plan
```

before merge/application.

---

# 407. Infrastructure Preview

High-impact changes SHOULD expose an understandable infrastructure diff/plan.

---

# 408. Drift Tests

Critical environments SHOULD periodically compare declared and actual state.

---

# 409. Recovery Testing

Infrastructure recovery belongs with Backup & Disaster Recovery Guidelines.

This standard requires infrastructure to make recovery possible.

---

# 410. Rebuild Capability

Teams SHOULD be capable of recreating infrastructure from:

```text
IaC
configuration
secret references
artifacts
```

without relying on undocumented manual state.

---

# 411. Region Bootstrap

If regional recovery is claimed, required infrastructure SHOULD be reproducibly creatable in the target region.

---

# 412. Dependencies During Recovery

Recovery architecture must include dependencies such as:

```text
DNS
certificates
IAM
secrets
container registry
```

not only compute.

---

# 413. Infrastructure Documentation

Critical workloads SHOULD document:

```text
topology
regions
network
IAM
dependencies
scaling
ingress
recovery
ownership
```

---

# 414. Architecture Diagram

Infrastructure diagrams SHOULD represent actual current architecture.

Stale diagrams SHOULD be updated or removed.

---

# 415. Diagram Abstraction

Diagrams should show:

```text
trust boundaries
major services
data flows
failure domains
```

rather than every provider icon.

---

# 416. Service Catalog

Production infrastructure SHOULD connect to the service catalog where one exists.

Include:

```text
owner
repository
environment
dashboard
runbook
```

---

# 417. Runbooks

Critical infrastructure SHOULD have runbooks for common operational events.

Examples:

```text
capacity exhaustion
certificate failure
queue backlog
regional failure
```

---

# 418. Platform Paved Road

Organizations SHOULD provide a recommended deployment/infrastructure pattern for common services.

---

# 419. Paved Road

A useful paved road may provide:

```text
runtime
container base
deployment
identity
logging
metrics
ingress
autoscaling
```

with safe defaults.

---

# 420. Escape Hatch

Teams MAY deviate from the paved road when workload requirements justify it.

Deviation requires ownership of the added complexity.

---

# 421. Platform Abstraction

Platform abstraction SHOULD simplify common infrastructure without hiding important operational realities.

---

# 422. Over-Abstraction

Do not create an internal cloud platform so opaque that teams cannot understand:

```text
cost
failure
scaling
security
```

of their workloads.

---

# 423. Production Infrastructure Checklist

```text
□ Workload owner
□ Environment isolated
□ Approved region
□ Multi-zone where required
□ Supported runtime
□ Reproducible artifact
□ Private networking where appropriate
□ IAM least privilege
□ Workload identity
□ Secrets managed
□ Health checks
□ Scaling policy
□ Capacity headroom
□ Load balancing
□ TLS
□ Observability
□ IaC
□ Cost attribution
□ Recovery architecture
```

---

# 424. Cloud Account Checklist

```text
□ Environment/account strategy
□ SSO
□ MFA
□ Root access protected
□ Audit logs
□ Billing ownership
□ IAM governance
□ Region restrictions where needed
□ Security baseline
```

---

# 425. Container Checklist

```text
□ Approved base image
□ Immutable image
□ Digest/version identifiable
□ Vulnerability scanning
□ No baked secrets
□ Non-root
□ Minimal capabilities
□ Resource sizing
□ Startup/readiness/liveness
□ Graceful shutdown
□ Provenance
```

---

# 426. Kubernetes Checklist

```text
□ Kubernetes justified
□ Managed control plane considered
□ Cluster ownership
□ RBAC least privilege
□ Workload identity
□ Pod security
□ Resource requests
□ Resource limits considered
□ Multiple replicas where required
□ Failure-domain spread
□ Network policy where needed
□ Disruption behavior
□ Upgrade policy
□ Observability
```

---

# 427. Runtime Checklist

```text
□ Runtime justified
□ Supported release
□ Team capability
□ Security maintenance
□ Base image/tooling
□ Upgrade owner
□ Performance appropriate
□ Deployment model compatible
```

---

# 428. Region Checklist

```text
□ User latency
□ Data residency
□ Required services
□ Dependency location
□ Reliability
□ Recovery
□ Cost
□ Operational support
```

---

# 429. Multi-Region Checklist

```text
□ Concrete requirement
□ Traffic routing
□ Data ownership
□ Replication model
□ Consistency semantics
□ Failure detection
□ Failover procedure
□ Split-brain prevention
□ Deployment model
□ Observability
□ Tested recovery
□ Cost justified
```

---

# 430. Scaling Checklist

```text
□ Scaling dimension known
□ Minimum capacity
□ Maximum capacity
□ Scaling signal appropriate
□ Startup delay understood
□ Dependency capacity considered
□ Database connections budgeted
□ Quotas checked
□ Load tested
□ Headroom retained
```

---

# 431. Load Balancer Checklist

```text
□ Public/internal scope correct
□ Health-based routing
□ TLS
□ Timeouts
□ Draining
□ Protocol support
□ Long-lived connection support
□ Observability
```

---

# 432. CDN Checklist

```text
□ Content is cacheable
□ Cache-Control correct
□ Cache key correct
□ Private data protected
□ Query params controlled
□ Origin protected
□ Asset fingerprinting
□ Invalidation strategy
□ TLS
```

---

# 433. Queue Checklist

```text
□ Queue justified
□ Delivery semantics understood
□ Idempotent consumer
□ Message identity
□ Visibility timeout
□ Retry policy
□ DLQ
□ DLQ owner
□ Queue age metrics
□ Autoscaling
□ Encryption/access
□ PII handling
```

---

# 434. Object Storage Checklist

```text
□ Private by default
□ Public access prevention
□ Least-privilege IAM
□ Encryption
□ Safe object names
□ Signed URL policy
□ Upload validation
□ Lifecycle policy
□ Retention policy
□ Versioning decision
□ Replication decision
```

---

# 435. IaC Checklist

```text
□ Infrastructure declared
□ Version controlled
□ Reviewed
□ Plan generated
□ Destructive diff visible
□ Apply through controlled automation
□ Least-privilege identity
□ Remote protected state
□ State locking
□ State backup
□ Secrets minimized
□ Drift monitored
```

---

# 436. IAM Checklist

```text
□ Individual human identity
□ SSO
□ MFA
□ Root account protected
□ Roles/groups
□ Least privilege
□ Workload identity
□ Resource scope
□ Wildcards reviewed
□ Temporary privilege where possible
□ Audit logs
□ Access reviews
□ Break-glass policy
```

---

# 437. Network Checklist

```text
□ Public exposure intentional
□ Private compute where appropriate
□ Database private
□ Ingress controlled
□ Egress considered
□ Firewall least access
□ Administrative endpoints protected
□ Service identity
□ Network policy where needed
□ TLS
□ DNS ownership
```

---

# 438. Production Access Checklist

```text
□ Normal work does not require root
□ Named individual access
□ MFA
□ Least privilege
□ Read-only first
□ JIT where possible
□ Shell access exceptional
□ Changes audited
□ Break-glass reviewed
```

---

# 439. Cost Checklist

```text
□ Owner
□ Environment tags
□ Service tags
□ Budget
□ Anomaly monitoring
□ Resource sizing
□ Idle resources
□ Storage lifecycle
□ Egress cost
□ Redundancy cost justified
```

---

# 440. Definition of Done — New Production Service

A production service is infrastructure-ready when:

```text
✓ Owning team exists
✓ Deployment model justified
✓ Supported runtime
✓ Environment isolation
✓ IaC
✓ Trusted artifact
✓ Appropriate multi-zone deployment
✓ IAM least privilege
✓ Workload identity
✓ Network exposure explicit
✓ TLS
✓ Secret management
✓ Resource sizing
✓ Health checks
✓ Graceful shutdown
✓ Scaling policy
✓ Observability
✓ Cost ownership
✓ Runbook
✓ Recovery requirements addressed
```

---

# 441. Definition of Done — New Public Endpoint

```text
✓ Public exposure justified
✓ DNS controlled
✓ TLS
✓ Authentication/authorization where required
✓ Load balancing
✓ Rate limiting
✓ DDoS/WAF considered
✓ Timeouts
✓ Observability
✓ Backend private where possible
✓ No unintended admin interface
```

---

# 442. Definition of Done — IaC Change

```text
✓ Source-controlled change
✓ Owner/reviewer
✓ Validation passes
✓ Security policy passes
✓ Plan reviewed
✓ Destructive changes understood
✓ Backup/recovery implications reviewed
✓ Production apply controlled
✓ Result verified
✓ Drift resolved
```

---

# 443. Definition of Done — Infrastructure Migration

```text
✓ Source topology understood
✓ Target topology defined
✓ Data migration strategy
✓ IAM migration
✓ Network migration
✓ DNS/certificate plan
✓ Observability
✓ Capacity
✓ Rollback/fallback
✓ Cutover test
✓ Old resources cleanup
```

---

# 444. Infrastructure Anti-Patterns

Avoid:

```text
Use Kubernetes because production apps use Kubernetes.
```

Avoid:

```text
microservice
→ separate cluster
```

automatically.

Avoid:

```text
one cloud account
for everything
```

Avoid:

```text
production + staging
same database
```

Avoid:

```text
manually configured VM
nobody can recreate
```

Avoid:

```text
SSH and patch production directly
```

Avoid:

```text
latest container image
```

as production identity.

Avoid:

```text
root container
```

without need.

Avoid:

```text
secret baked into image
```

Avoid:

```text
no CPU/memory sizing
```

for shared orchestrated workloads.

Avoid:

```text
liveness = database reachable
```

causing restart storms.

Avoid:

```text
one replica
```

while claiming high availability.

Avoid:

```text
autoscale app infinitely
```

without database/dependency capacity.

Avoid:

```text
CPU > 70%
→ always scale
```

for every workload.

Avoid:

```text
public database
because firewall has password
```

Avoid:

```text
private network
therefore trusted
```

Avoid:

```text
same service account
for all applications
```

Avoid:

```text
AdministratorAccess
```

because policy design is inconvenient.

Avoid:

```text
permanent static cloud keys
```

when workload identity is available.

Avoid:

```text
everyone has cluster-admin
```

Avoid:

```text
namespace = secure tenant boundary
```

without additional controls.

Avoid:

```text
0.0.0.0/0
```

on administrative ports.

Avoid:

```text
manual ClickOps
as source of truth
```

Avoid:

```text
IaC state in local laptop
```

for shared production.

Avoid:

```text
terraform apply
from developer machine
against production
```

as routine workflow.

Avoid:

```text
manual emergency change
never reconciled
```

Avoid:

```text
public object-storage bucket
for convenience
```

Avoid:

```text
signed URL valid forever
```

Avoid:

```text
CDN cache authenticated response
without correct key/privacy policy
```

Avoid:

```text
queue retries forever
```

Avoid:

```text
DLQ nobody monitors
```

Avoid:

```text
queue depth grows forever
therefore system resilient
```

Avoid:

```text
multi-region
before single-region reliability works
```

Avoid:

```text
multi-cloud
because vendor lock-in sounds scary
```

Avoid:

```text
service mesh
because microservices
```

Avoid:

```text
maximum redundancy everywhere
```

without SLO/cost justification.

Avoid:

```text
minimum cloud cost
at the expense of required resilience
```

Avoid:

```text
cloud provider handles backups/security automatically
```

Avoid:

```text
production deployment healthy
because instances are running
```

Avoid:

```text
infrastructure diagram from three years ago
```

presented as current architecture.

---

# 445. AI Deployment & Infrastructure Rules

AI coding agents MUST inspect the existing deployment/infrastructure architecture before introducing new infrastructure.

---

# 446. AI Simplicity Rule

AI MUST prefer the simplest deployment model that satisfies explicit requirements.

It MUST NOT introduce:

```text
Kubernetes
service mesh
multi-region
multi-cloud
```

without a concrete requirement.

---

# 447. AI Managed-Service Rule

AI SHOULD evaluate managed services before proposing self-managed equivalents.

---

# 448. AI Runtime Rule

AI MUST use the organization's existing supported runtime unless a new runtime has a clear technical justification.

---

# 449. AI Region Rule

AI MUST NOT create resources in arbitrary regions.

Use the established region/residency policy.

---

# 450. AI Zone Rule

For critical production stateless services, AI SHOULD preserve multi-zone placement where architecture supports it.

---

# 451. AI Container Rule

AI-generated production container definitions SHOULD:

```text
use approved base
avoid secrets
run non-root
support graceful shutdown
declare health behavior
```

where applicable.

---

# 452. AI Image Rule

AI MUST NOT use mutable `latest` as the sole production image identity.

---

# 453. AI Docker Secret Rule

AI MUST NOT use secrets as ordinary Docker build arguments or layers.

---

# 454. AI Resource Rule

AI SHOULD NOT invent arbitrary CPU/memory limits without considering observed workload behavior.

---

# 455. AI Probe Rule

AI MUST distinguish:

```text
startup
readiness
liveness
```

and MUST NOT make temporary dependency failure automatically kill healthy processes without justification.

---

# 456. AI Scaling Rule

AI MUST identify the workload metric driving autoscaling.

It MUST NOT default universally to CPU.

---

# 457. AI Capacity Rule

When increasing application scale, AI SHOULD consider:

```text
database connections
downstream capacity
quota
cost
```

---

# 458. AI Public Endpoint Rule

AI MUST NOT expose new resources publicly merely to simplify connectivity.

---

# 459. AI Network Rule

AI SHOULD default services to private networking unless public exposure is part of the requirement.

---

# 460. AI Zero-Trust Rule

AI MUST NOT treat:

```text
internal IP
VPC
VPN
cluster membership
```

as sufficient application authorization.

---

# 461. AI IAM Rule

AI MUST grant the minimum required IAM actions/resources.

---

# 462. AI Wildcard Rule

AI MUST NOT introduce broad:

```text
*
```

permissions merely to solve access errors.

---

# 463. AI Workload Identity Rule

AI SHOULD prefer managed/workload identity over long-lived credentials.

---

# 464. AI Service-Account Rule

AI SHOULD use distinct identities for independently owned workloads.

---

# 465. AI IaC Rule

AI MUST modify the canonical IaC rather than creating production resources manually outside the declared infrastructure path.

---

# 466. AI IaC-State Rule

AI MUST NOT expose or casually modify shared infrastructure state.

---

# 467. AI IaC-Delete Rule

AI MUST identify destructive resource replacements/deletions and assess data/recovery implications.

---

# 468. AI Drift Rule

AI MUST NOT treat manual cloud state as authoritative when canonical IaC exists.

---

# 469. AI Object-Storage Rule

AI MUST default private storage to blocked public access.

---

# 470. AI Signed-URL Rule

AI-generated signed links SHOULD be narrow and short-lived.

---

# 471. AI CDN Rule

AI MUST NOT cache personalized/authenticated responses publicly without an explicit safe cache design.

---

# 472. AI Queue Rule

AI MUST design queue consumers assuming duplicate delivery unless infrastructure guarantees stronger semantics.

---

# 473. AI DLQ Rule

If AI creates a DLQ, it MUST also define:

```text
monitoring
ownership
disposition/replay
```

---

# 474. AI Retry Rule

AI MUST NOT create infinite queue/infrastructure retries.

---

# 475. AI Multi-Region Rule

AI MUST NOT claim multi-region resilience unless:

```text
data replication
routing
failover
consistency
testing
```

are addressed.

---

# 476. AI Multi-Cloud Rule

AI SHOULD NOT recommend multi-cloud solely to avoid vendor dependency.

It must identify a concrete requirement that justifies it.

---

# 477. AI Cost Rule

AI SHOULD consider operational cost whenever it introduces:

```text
additional replicas
regions
clusters
load balancers
NAT
cross-region transfer
```

---

# 478. AI Observability Rule

New infrastructure MUST include appropriate:

```text
metrics
auditability
ownership
```

for its operational role.

---

# 479. AI Access Rule

AI SHOULD prefer managed read-only/JIT diagnostics over routine direct production shell access.

---

# 480. AI Gold Rule

When uncertain:

```text
Managed
>
Automated
>
Reproducible
>
Private by default
>
Identity-based
>
Observable
>
Simple
```

and:

```text
Single region done well
>
Untested multi-region
>
Cosmetic multi-cloud
```

---

# 481. Golden Deployment & Infrastructure Rules

**1. Infrastructure follows workload requirements, not technology fashion.**

**2. Use the simplest infrastructure capable of meeting the required SLO, security, scale, and recovery objectives.**

**3. Prefer managed services when they reduce operational burden without sacrificing necessary control.**

**4. Managed infrastructure does not remove application, IAM, configuration, data, or cost responsibility.**

**5. Production and non-production are meaningfully isolated.**

**6. Cloud account/project boundaries are used to reduce blast radius where appropriate.**

**7. Region selection considers latency, residency, availability, services, recovery, and cost.**

**8. Critical single-region systems use multiple availability zones where appropriate.**

**9. Multi-region is introduced only for concrete reliability, latency, or residency requirements.**

**10. Multi-cloud is not the default resilience strategy.**

**11. Supported runtimes are standardized and kept within security support.**

**12. Raw VMs are used only when higher-level platforms cannot satisfy the workload cleanly.**

**13. Snowflake servers are prohibited.**

**14. Production containers are immutable, minimal, scanned, and free of baked secrets.**

**15. Containers run without unnecessary privilege.**

**16. Production artifacts use immutable identities, not mutable `latest` references.**

**17. Resource requests and limits are based on workload behavior, not copied blindly.**

**18. Startup, readiness, and liveness represent different states.**

**19. Health checks never create avoidable cascading failures.**

**20. Workloads terminate gracefully.**

**21. Kubernetes is adopted only when its orchestration value justifies its operational complexity.**

**22. Cluster and namespace membership do not replace authorization.**

**23. Workloads use dedicated least-privilege identities.**

**24. Horizontal scaling requires appropriate state and dependency architecture.**

**25. Autoscaling signals match the actual workload bottleneck.**

**26. Scaling application compute accounts for database, connection, dependency, quota, and cost limits.**

**27. Public exposure is intentional; private is the default where public reachability is unnecessary.**

**28. Internal network location is not proof of trust.**

**29. Identity and authorization remain required across private networks.**

**30. Administrative endpoints are never casually internet-exposed.**

**31. Human cloud access uses individual identity, SSO, MFA, and least privilege.**

**32. Root/owner accounts are emergency identities, not operating accounts.**

**33. Workload identity is preferred over static cloud access keys.**

**34. IAM policy is managed and reviewed like code.**

**35. Production infrastructure is declared through IaC wherever practical.**

**36. Routine production ClickOps is not the source of truth.**

**37. IaC state is protected as sensitive production data.**

**38. Infrastructure plans make destructive changes visible before application.**

**39. Manual emergency changes are reconciled or reverted.**

**40. Infrastructure drift is detected and removed.**

**41. Object storage is private by default.**

**42. Signed object access is scoped and short-lived.**

**43. CDN caching follows explicit HTTP and privacy semantics.**

**44. Personalized content is never publicly cacheable by accident.**

**45. Durable queue consumers assume duplicate delivery and are idempotent.**

**46. Queue retries are bounded and dead-letter queues have owners.**

**47. Queue backlog is measured by age as well as count.**

**48. Secrets are delivered through approved secret-management infrastructure.**

**49. Cloud control-plane changes are auditable.**

**50. Infrastructure observability supplements—not replaces—user-facing service SLIs.**

**51. Redundancy is justified by reliability requirements rather than prestige.**

**52. Cost is an architectural concern, but optimization must not violate required security or reliability.**

**53. Infrastructure has explicit ownership and cost attribution.**

**54. Critical capacity and provider quotas are understood before they become incidents.**

**55. Recovery claims are tested.**

**56. Infrastructure can be recreated from automation and declared configuration.**

**57. Production debugging begins with telemetry and read-only access.**

**58. Direct shell and console mutation are exceptional operational paths.**

**59. Every infrastructure component must have a reason to exist.**

**60. If the system cannot be recreated, observed, secured, scaled, and recovered through declared engineering processes, its infrastructure is not production-grade.**

---

# 482. Canonical Deployment & Infrastructure Standard

The organizational standard is:

> **Infrastructure is selected from explicit workload and quality requirements rather than technology preference. Teams begin with the simplest viable managed platform, introduce containers, orchestration, specialized networking, multi-region deployment, or multi-cloud only when concrete reliability, scale, security, portability, residency, or operational requirements justify the added complexity, and retain ownership of every additional layer they introduce.**

> **Production workloads are deployed through reproducible artifacts into isolated, declared environments. Supported runtimes, approved container images, immutable artifact identities, least-privilege workload identities, private-by-default network placement, managed secrets, bounded resource allocation, health semantics, graceful shutdown, load balancing, and scaling policies form the baseline runtime architecture. Critical stateless workloads span appropriate failure domains, while state and dependency architecture explicitly account for the consequences of scaling, replication, failover, and mixed-version deployments.**

> **Infrastructure security is identity-centric and defense in depth. Network location—whether private subnet, VPN, cluster, or service mesh—does not establish trust by itself. Human administration uses individual identities, SSO, MFA, least privilege, controlled elevation, and auditable break-glass mechanisms. Workloads use distinct short-lived service identities wherever supported rather than shared static credentials, and public exposure, broad firewall rules, wildcard IAM, privileged containers, and unrestricted administrative endpoints require explicit justification.**

> **Production infrastructure is represented as code wherever practical. Infrastructure changes move through version control, review, automated validation, policy checks, plan/diff inspection, controlled application, and post-change verification. Shared infrastructure state is protected and recoverable, manual production changes are exceptional and reconciled, destructive operations are explicit, and configuration drift is treated as a defect rather than accepted operational reality.**

> **Traffic infrastructure—DNS, TLS, load balancing, CDN, ingress, egress, queues, and storage—uses explicit contracts. CDN caching protects personalized data, object storage is private by default, signed access is bounded, queues assume retry and duplicate delivery, dead-letter paths have owners, egress and public ingress are deliberate, and service communication is authorized through identity in addition to network controls.**

> **Infrastructure reliability, capacity, observability, recovery, and cost are designed together. Redundancy is aligned to SLOs and recovery objectives, scaling accounts for downstream limits and quotas, operational signals expose saturation and failure before customer impact where possible, cost is attributable to workloads and teams, and claimed zone, regional, backup, or failover capabilities are tested rather than inferred from diagrams or provider marketing.**

A production-grade infrastructure architecture should make it easy to answer:

```text
Why was this compute/runtime selected?
Who owns this workload?
Which account/project is it in?
Which region and zones serve it?
What happens if an instance fails?
What happens if a zone fails?
Do we actually require multi-region?
Which artifact is running?
Can it be reproduced?
What CPU/memory resources does it need?
What makes an instance ready?
What makes it unhealthy?
How does it shut down?
How does it scale?
What metric controls scaling?
What is the maximum scale?
Can the database support that scale?
Which public endpoints exist?
Why are they public?
Which network paths are allowed?
What workload identity does this service use?
What permissions does that identity have?
Where are its secrets stored?
Can an engineer access those secrets?
Which infrastructure is declared in IaC?
Who can apply infrastructure changes?
Where is IaC state stored?
Is drift detectable?
What object stores/queues/CDNs does it depend on?
How are private objects protected?
What happens to failed queue messages?
Which quotas could prevent scaling?
What does this infrastructure cost?
Can we recreate it after a regional disaster?
When was that recovery process last tested?
```

If those questions cannot be answered reliably, the deployment infrastructure is not yet adequately governed.

Three external principles are worth locking into the corpus. First, current AWS, Google Cloud, and Azure architecture frameworks all emphasize that **reliability, security, performance, operations, and cost are interacting trade-offs rather than independent boxes**; greater redundancy, for example, often increases both cost and operational complexity. citeturn865016search4turn865016search8turn865016search13

Second, NIST Zero Trust explicitly rejects implicit trust based solely on **network location**, and its cloud-native extension applies that idea to service/workload identities as well. That supports the rule above that “inside the VPC/cluster” is defense in depth, not authorization. citeturn784013search2turn784013search3

Third, for Kubernetes specifically, current upstream guidance distinguishes **startup, readiness, and liveness** probes because they trigger materially different behavior, and Kubernetes resource requests directly participate in scheduling while limits constrain runtime resource consumption. Misconfigured liveness probes can themselves create cascading failures. citeturn113738search0turn113738search2

In the master hierarchy, this now sits cleanly here:

**… → Dependencies → Git & Repository → CI/CD → Deployment & Infrastructure → Backup & Disaster Recovery → Feature Flags → Release & Versioning → Documentation → Governance.**
