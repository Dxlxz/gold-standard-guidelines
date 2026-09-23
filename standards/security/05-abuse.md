---
id: "abuse"
title: "Rate Limiting & Abuse Defense"
domain: "security"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["security", "abuse", "rate", "limiting", "defense"]
applies_to: ["security"]
related: ["feedback"]
legacy_number: 75
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 61904
provenance: baseline

---

# Rate Limiting & Abuse Defense — Gold Standard 2026

**Status:** Canonical  
**Standard level:** Gold Standard 2026  
**Canonical placement:** **Security → Abuse Prevention → API → Multi-Tenancy**  
**UI baseline:** shadcn/ui for user- and operator-facing abuse-control surfaces  
**Applies to:** Public APIs, authenticated APIs, login and recovery flows, signup, search, scraping-sensitive resources, uploads, exports, expensive queries, AI/compute endpoints, payments, promotional flows, realtime connection establishment, webhooks, background-trigger endpoints, and shared multi-tenant infrastructure.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements unless an approved exception is documented.

---

# 1. Purpose

## 1.1 Objective

This standard defines how the platform MUST protect shared services and business workflows from excessive, automated, fraudulent, or abusive use while preserving availability and fair access for legitimate users.

It governs:

- quota models;
- per-user limits;
- per-tenant limits;
- per-IP/network limits;
- API-key/client limits;
- anonymous-session limits;
- token-bucket design;
- sliding-window design;
- concurrency limiting;
- weighted request cost;
- distributed rate limiting;
- HTTP `429` behaviour;
- retry guidance;
- automated bot and scraper defence;
- CAPTCHA;
- proof-of-work;
- fraud and reputation signals;
- credential stuffing and password spraying;
- account-enumeration prevention;
- abuse monitoring and alerting;
- load shedding;
- multi-tenant fairness;
- operator controls;
- privacy and accessibility of abuse defences.

This standard MUST be applied together with:

- Security;
- Authentication & Authorization;
- Data & Database;
- API;
- Realtime;
- Jobs & Queue;
- Multi-Tenancy;
- State Management;
- Forms & Validation;
- Accessibility;
- Design Tokens;
- Component;
- Pattern;
- Content & UX Writing;
- Observability standards.

Rate limiting MUST NOT be treated as the complete abuse-prevention strategy.

Modern automated abuse includes credential stuffing, scraping, fake-account creation, card testing, inventory hoarding, spam, fake reviews, automated business-flow exploitation, and cost amplification. OWASP recommends layered controls across endpoint, identity, source, and business-flow dimensions rather than relying on one global request counter. citeturn991190search0turn991190search3

---

## 1.2 Governing principles

Abuse controls MUST optimise for:

1. **service availability;**
2. **security;**
3. **tenant fairness;**
4. **legitimate-user continuity;**
5. **bounded resource and financial cost;**
6. **privacy;**
7. **accessibility;**
8. **observable and reversible enforcement.**

The canonical principle is:

**Limit the resource or business capability actually at risk, at the strongest identity scope available, with layered controls that degrade legitimate service as little as possible.**

---

## 1.3 Rate limiting versus abuse detection

Rate limiting and abuse detection are related but distinct.

**Rate limiting** constrains consumption according to a defined budget.

**Abuse detection** evaluates whether behaviour appears malicious, fraudulent, automated, or inconsistent with intended use.

A request MAY be below a nominal rate limit and still be abusive.

A request MAY exceed a normal rate temporarily and still be legitimate.

The platform SHOULD therefore combine deterministic quotas with risk-based controls where material business abuse exists.

---

## 1.4 Rate limiting versus resource limits

Request rate is only one resource dimension.

Systems MUST also bound relevant quantities such as:

- concurrent requests;
- execution time;
- payload size;
- records returned;
- batch size;
- upload size;
- memory;
- CPU-intensive operations;
- downstream third-party calls;
- emails/SMS/OTP sends;
- AI tokens/compute;
- export volume;
- storage growth.

OWASP API Security identifies unrestricted resource consumption as a distinct API risk and explicitly recommends bounding payload sizes, operation frequency, batch sizes, pagination, execution resources, and third-party spending. citeturn991190search1

---

# 2. Rules

## 2.1 Every protected capability requires a threat model

Material endpoints and business flows MUST define:

- resource being protected;
- expected legitimate usage;
- abuse modes;
- enforcement identity;
- short-term burst allowance;
- sustained allowance;
- concurrency limits where applicable;
- response when exceeded;
- monitoring;
- exception process.

A single application-wide requests-per-minute value MUST NOT substitute for endpoint-specific analysis.

---

## 2.2 Limit at multiple scopes

A production abuse-control system SHOULD support limits at several independent scopes.

Common scopes include:

- anonymous session;
- IP address;
- network prefix;
- ASN/network reputation;
- authenticated user;
- account;
- tenant/organisation;
- API key;
- OAuth client/application;
- device/session where appropriate;
- endpoint;
- business object;
- operation type.

The strongest stable identity SHOULD be preferred after authentication.

IP address MUST NOT be treated as equivalent to a person.

---

## 2.3 Per-user quotas

Per-user limits SHOULD protect:

- individual account usage;
- accidental loops;
- abusive automation behind valid credentials;
- high-cost personal operations.

Per-user limits MUST NOT replace per-tenant limits where many users share the same tenant resource pool.

Users behind the same corporate NAT MUST NOT be unfairly collapsed solely into one low IP quota where an authenticated identity is available.

---

## 2.4 Per-tenant quotas

Multi-tenant services MUST define tenant-level consumption boundaries where tenants share finite infrastructure.

Per-tenant limits SHOULD protect:

- compute;
- database capacity;
- exports;
- storage;
- messaging;
- background jobs;
- expensive APIs;
- third-party spend.

Tenant limits SHOULD be designed according to:

- plan/capacity entitlement;
- legitimate user population;
- workload type;
- shared-system capacity.

One tenant MUST NOT be able to exhaust shared platform capacity simply by distributing requests across many users or API keys.

---

## 2.5 Per-IP limits

Per-IP limits SHOULD be treated as one signal and enforcement layer.

They are useful for:

- unauthenticated endpoints;
- credential stuffing;
- scraping;
- abusive scans;
- high-volume anonymous traffic.

Per-IP limiting MUST account for:

- NAT;
- carrier-grade NAT;
- enterprise proxies;
- IPv6;
- privacy relays;
- rotating residential proxies.

IP limits MUST NOT be the sole defence for identity-targeted attacks.

---

## 2.6 IPv6 handling

IPv6 rate limiting MUST NOT assume one address equals one independent actor.

The platform SHOULD consider prefix-aware controls where attackers could cheaply rotate individual IPv6 addresses.

Prefix aggregation MUST be chosen cautiously to avoid blocking legitimate shared networks.

The policy SHOULD be infrastructure-owned rather than implemented differently by feature teams.

---

## 2.7 API-key and client quotas

Machine-consumed APIs SHOULD support quotas by:

- API key;
- OAuth client;
- service identity;
- integration.

API-key limits SHOULD normally be combined with tenant or account limits.

Creating multiple keys MUST NOT allow a tenant to multiply its entitlement unintentionally.

Rotating an API key MUST NOT reset a tenant's consumption budget unless the contract explicitly defines that behaviour.

---

## 2.8 Independent overlapping limits

Multiple relevant limits SHOULD be enforced independently.

For example, an authenticated request MAY need to satisfy:

- global service capacity;
- tenant quota;
- user quota;
- endpoint quota;
- expensive-operation quota.

A composite key such as `tenant:user:endpoint` MUST NOT replace broader independent controls when doing so creates bypass paths.

---

## 2.9 Authentication endpoint limits

Authentication flows MUST use layered abuse controls.

Login SHOULD apply at least independent controls equivalent to:

- attempts against a particular account/identifier;
- attempts from a particular source.

Using only a combined `IP + username` bucket is insufficient because an attacker can rotate usernames from one IP or rotate IPs against one target account. OWASP specifically recommends independent identity/account and source buckets for authentication abuse. citeturn786380search4

---

## 2.10 Password reset and OTP limits

Password reset, account recovery, OTP, email verification, SMS verification, and magic-link endpoints MUST limit:

- requests per target identity/destination;
- requests per source;
- verification attempts per issued challenge;
- challenge issuance frequency;
- outstanding valid challenges where relevant.

The platform MUST prevent abuse that generates excessive:

- email;
- SMS;
- voice calls;
- third-party verification cost.

A user MUST NOT be able to bypass issuance quotas by repeatedly refreshing or requesting a new challenge.

---

## 2.11 Expensive-operation limits

Operations with materially different cost MUST NOT all consume identical quota units.

Examples include:

- complex search;
- report generation;
- AI inference;
- large exports;
- image/video processing;
- geospatial queries;
- full-text indexing;
- bulk mutation.

The API SHOULD support weighted cost or separate quotas.

A request costing 1,000× more server resources SHOULD NOT necessarily consume the same budget as a lightweight metadata request.

---

## 2.12 Concurrency limits

Long-running or expensive operations SHOULD have concurrency limits in addition to request-rate limits.

Concurrency limits are particularly appropriate for:

- exports;
- imports;
- report generation;
- expensive queries;
- AI workloads;
- large uploads;
- background-job creation.

Ten requests that each run for five minutes can exhaust a service even if a requests-per-minute quota appears low.

---

## 2.13 Business-flow quotas

Sensitive business flows MUST have domain-level limits independent of raw request frequency.

Examples include:

- ticket purchase;
- promotional redemption;
- inventory reservation;
- account creation;
- review posting;
- gift-card checks;
- payment-method validation;
- coupon attempts.

OWASP identifies unrestricted access to sensitive business flows as a separate API security risk because an API can be technically functioning correctly while automation abuses its intended business capability. citeturn991190search3

---

## 2.14 Token bucket

Token bucket SHOULD be the default rate-limiting algorithm when legitimate short bursts are desirable.

A token bucket MUST define:

- capacity;
- refill rate;
- cost per operation;
- scope/key.

**Capacity** determines permitted burst size.

**Refill rate** determines sustainable usage.

These MUST be configured independently.

Increasing burst capacity MUST NOT unintentionally increase long-term entitlement.

---

## 2.15 Weighted token bucket

Token buckets MAY consume different numbers of tokens for operations with different cost.

Cost MUST be predictable enough to enforce consistently.

Cost models SHOULD be based on bounded request attributes rather than only post-execution resource consumption.

A client MUST NOT be able to claim an inexpensive operation while causing significantly more work through uncontrolled parameters.

---

## 2.16 Sliding window

Sliding-window limiting SHOULD be used when enforcement requires a more accurate rolling-period constraint.

Implementations MAY use:

- exact sliding logs;
- sliding-window counters;
- approximate distributed counters.

The accuracy/cost trade-off MUST be documented.

Exact per-request timestamp logs SHOULD NOT be used at extreme scale without a demonstrated requirement.

---

## 2.17 Fixed windows

Simple fixed-window limits SHOULD NOT be the default security control for exposed high-risk endpoints because boundary transitions can permit substantial bursts.

A fixed window MAY be acceptable when:

- consequences are low;
- an additional burst control exists;
- approximation is acceptable.

Security-sensitive flows SHOULD prefer token bucket or sliding-window behaviour. OWASP's current anti-automation guidance recommends token-bucket or sliding-window algorithms and warns about fixed-window boundary bursts. citeturn786380search4

---

## 2.18 Multiple time horizons

Important abuse controls SHOULD consider both short and long horizons.

For example, a policy MAY constrain:

- burst/second;
- sustained/minute;
- cumulative/hour or day.

Short windows catch bursts.

Long windows catch slow distributed abuse.

A client staying just under a one-minute threshold MUST NOT automatically be considered legitimate indefinitely.

---

## 2.19 Quotas versus rate

The platform MUST distinguish:

- **rate** — consumption velocity;
- **quota** — total entitlement over a period;
- **concurrency** — simultaneous work.

A daily export entitlement SHOULD NOT be implemented only as a per-second rate.

An expensive endpoint MAY require all three.

---

## 2.20 Distributed enforcement

Rate limiting for horizontally scaled systems MUST not depend on isolated per-instance counters when requests can reach multiple instances.

The architecture MUST define whether enforcement is:

- globally consistent;
- regionally consistent;
- approximately consistent;
- node-local by design.

The allowed overshoot MUST be understood.

---

## 2.21 Strong versus approximate distributed counters

Strongly consistent global counters SHOULD be used only where exact enforcement justifies their latency and availability cost.

Approximate distributed limits MAY be preferable for high-throughput general API protection.

Security-critical business quotas MAY require stronger coordination.

The consistency decision MUST be explicit.

---

## 2.22 Hierarchical rate limiting

Large systems SHOULD use layered enforcement.

A canonical architecture MAY include:

1. edge/network source protection;
2. gateway API/client limits;
3. application identity/tenant limits;
4. domain business-flow limits;
5. downstream resource limits.

No single layer SHOULD be expected to solve every abuse class.

---

## 2.23 Local allowance with global budget

Distributed systems MAY allocate temporary local token budgets from a wider global quota to reduce coordination overhead.

The architecture MUST bound possible global overshoot.

Local allocation MUST NOT allow a failed or partitioned node to mint effectively unlimited capacity.

Unused reservations SHOULD expire or be returned according to the algorithm.

---

## 2.24 Atomic enforcement

A distributed limiter MUST prevent race conditions that materially exceed its documented tolerance.

Check and consume SHOULD be atomic within the enforcement boundary where correctness depends on it.

A pattern equivalent to:

1. read current count;
2. decide;
3. separately increment;

MUST NOT be used where concurrent requests can bypass the limit materially.

---

## 2.25 Fail-open versus fail-closed

Limiter dependency failure MUST have an explicit policy.

**Fail-open** MAY be appropriate for low-risk general APIs where availability is more important than temporary quota enforcement.

**Fail-closed** SHOULD be considered for:

- authentication abuse;
- high-cost third-party operations;
- scarce inventory;
- high-risk financial or security workflows.

The decision MUST be threat-modelled.

A rate-limiter outage MUST NOT accidentally become either:

- a platform-wide outage;
- an unlimited-abuse window;

without an intentional policy.

---

## 2.26 Local emergency protection

Services SHOULD retain local emergency protection even when the central limiter is unavailable.

Examples include:

- connection limits;
- concurrency limits;
- process-level queue bounds;
- circuit breakers;
- coarse per-node rate limits.

Central quota infrastructure MUST NOT be the sole protection against resource exhaustion.

---

## 2.27 429 semantics

When a request is refused specifically because the applicable request quota was exceeded, HTTP APIs SHOULD return **`429 Too Many Requests`**.

RFC 6585 defines `429` for rate limiting and permits the response to explain the condition and include `Retry-After`. It also specifies that `429` responses MUST NOT be cached. citeturn479841search0

A quota response MUST NOT use `200 OK` with an error body.

---

## 2.28 429 is not mandatory under active attack

Infrastructure MUST NOT be required to generate expensive structured `429` responses for every abusive packet during severe attack conditions.

Under active resource exhaustion, the platform MAY:

- drop;
- reset;
- tarpittingly slow where approved;
- challenge;
- block upstream;

rather than spending additional resources generating application responses.

RFC 6585 explicitly recognises that servers under attack may choose other protective behaviour instead of emitting `429` for every request. citeturn479841search0

---

## 2.29 Retry-After

A normal `429` SHOULD include `Retry-After` when the server can provide useful retry guidance without weakening abuse controls.

`Retry-After` MAY contain either:

- delay seconds;
- HTTP date.

RFC 9110 defines these semantics. citeturn991190search5

Clients receiving `Retry-After` SHOULD respect it.

Clients SHOULD add their own jitter before retry when synchronized retry would create a herd.

---

## 2.30 Security-sensitive Retry-After

Authentication and abuse-sensitive endpoints MAY deliberately provide coarser retry guidance.

The system MUST NOT expose internal threshold details that materially help an attacker optimise automation.

External behaviour SHOULD balance:

- interoperable retry guidance;
- legitimate-user clarity;
- resistance to abuse tuning.

---

## 2.31 Rate-limit response body

Rate-limit errors SHOULD use the canonical API error format.

Where the platform uses RFC 9457 Problem Details, the response SHOULD expose a stable problem type and safe user/developer guidance. RFC 9457 defines `application/problem+json` for machine-readable HTTP API problems. citeturn786380search3

Responses MUST NOT disclose:

- hidden risk scores;
- internal rule identifiers;
- precise fraud thresholds;
- private blocklists;
- sensitive infrastructure detail.

---

## 2.32 Rate-limit headers

The API platform MAY expose quota metadata where it materially helps well-behaved clients pace themselves.

As of September 2026, the IETF HTTPAPI RateLimit header specification is still an Internet-Draft, currently defining `RateLimit-Policy` and `RateLimit`; it is not yet a final RFC. citeturn461459search0

Therefore:

- APIs MUST NOT describe draft RateLimit fields as an established RFC standard;
- use MUST be platform-standardised before adoption;
- clients MUST NOT depend on them unless the API contract documents them;
- `Retry-After` remains the canonical stable HTTP retry signal when applicable.

Legacy `X-RateLimit-*` fields MAY remain for compatibility but SHOULD be documented as product-specific API contract fields.

---

## 2.33 Client behaviour after 429

First-party clients MUST NOT immediately retry a `429`.

Clients SHOULD:

1. honour `Retry-After` where present;
2. apply bounded exponential backoff where repeated throttling occurs;
3. add jitter where concurrent clients may retry together;
4. stop automatic retry when user intervention is required.

UI code MUST NOT turn server throttling into a tight hidden retry loop.

---

## 2.34 Non-idempotent retry

Clients MUST NOT automatically retry non-idempotent mutations merely because a rate limit expired unless the API operation is safely idempotent.

Canonical API idempotency mechanisms MUST be used where retry is permitted.

A throttled payment or order submission MUST NOT accidentally become a duplicate operation.

---

## 2.35 Bot defence architecture

Bot defence MUST use defence in depth.

Signals MAY include:

- request velocity;
- authentication state;
- IP/network reputation;
- ASN classification;
- session age;
- cookie continuity;
- protocol/TLS characteristics;
- navigation consistency;
- account age;
- challenge outcome;
- business-flow behaviour.

One signal MUST NOT automatically be treated as definitive proof of abuse unless it has exceptionally strong semantics.

---

## 2.36 Legitimate automation

The system MUST distinguish harmful automation from legitimate automated clients where the product permits automation.

Examples include:

- documented API integrations;
- search engines;
- monitoring;
- accessibility technology;
- partner agents.

Bot defence SHOULD target abusive behaviour rather than attempt to ban all automation indiscriminately.

OWASP's current bot-management guidance explicitly notes that the objective is not to block all bots because legitimate crawlers, monitoring tools, and other automation exist. citeturn991190search0

---

## 2.37 Scraper defence

Scraping-sensitive endpoints SHOULD combine:

- rate control;
- authentication where appropriate;
- response-size limits;
- query bounds;
- bot/risk signals;
- business-level quotas.

Sensitive bulk data MUST NOT become trivially extractable solely because a scraper stays below a simple requests-per-second threshold.

Pagination limits MUST follow the Tables/Data/API standards.

---

## 2.38 Public-content scraping

Public information MUST NOT be treated as secret merely because scraping is discouraged.

Anti-scraping controls SHOULD protect:

- infrastructure;
- contractual access rules;
- business abuse;
- disproportionate automated extraction.

Security design MUST distinguish confidentiality requirements from anti-automation policy.

---

## 2.39 Challenge escalation

Abuse defence SHOULD use graduated responses where practical.

A typical escalation MAY move from:

- ordinary request;
- tighter quota;
- invisible verification/attestation;
- additional authentication;
- CAPTCHA or equivalent;
- temporary block;
- manual review.

Immediate hard blocking on the first weak anomaly SHOULD be avoided where false positives materially harm legitimate users.

---

## 2.40 CAPTCHA role

CAPTCHA MUST be treated as a defence-in-depth control, not proof that the actor is legitimate.

CAPTCHA SHOULD be risk-triggered rather than shown to every user.

OWASP notes that CAPTCHAs can slow automation but may be solved or outsourced and are better used selectively for suspicious/high-risk traffic. citeturn991190search2turn786380search0

---

## 2.41 CAPTCHA accessibility

User-facing CAPTCHA MUST have an accessible alternative.

Traditional visual CAPTCHA SHOULD NOT be the default anti-bot mechanism.

W3C documents that CAPTCHA challenges can exclude users with visual, auditory, cognitive, or other disabilities and recommends considering alternative approaches. citeturn676552search0turn676552search4

A user MUST NOT permanently lose access to an essential workflow solely because one CAPTCHA modality is inaccessible.

---

## 2.42 CAPTCHA failure

Failing a CAPTCHA MUST NOT automatically be recorded as definitive malicious intent.

Challenge failures MAY contribute to a broader risk decision.

The system SHOULD account for:

- accessibility difficulty;
- expired challenges;
- network failure;
- third-party challenge outages.

Challenge systems require observability like any other dependency.

---

## 2.43 CAPTCHA privacy

Third-party challenge providers MUST undergo Security and privacy review.

The platform MUST understand data shared with the provider, including where applicable:

- IP;
- cookies;
- browser/device signals;
- interaction data.

CAPTCHA integration MUST NOT silently introduce unapproved tracking.

---

## 2.44 Proof-of-work

Client proof-of-work MAY be used as an adaptive abuse friction mechanism.

Proof-of-work SHOULD NOT be the universal default.

Difficulty SHOULD be bounded and risk-adjusted.

The server MUST verify proofs cheaply relative to client generation cost.

---

## 2.45 Proof-of-work limitations

Proof-of-work MUST account for unequal client hardware.

High computational difficulty MAY disproportionately affect:

- low-powered devices;
- older devices;
- battery-constrained devices;
- assistive configurations.

Proof-of-work MUST NOT become an accidental hardware wealth test for access to essential functionality.

W3C's CAPTCHA analysis recognises proof-of-work as an alternative approach but notes that it can slow users on older hardware. citeturn676552search4

---

## 2.46 Proof-of-work replay protection

Proof-of-work challenges SHOULD be:

- short lived;
- scoped to the intended action;
- bound to a server nonce;
- resistant to replay.

A reusable proof MUST NOT provide indefinite access to sensitive actions unless that is explicitly the protocol.

---

## 2.47 Honeypots and passive friction

Honeypot fields or passive automation signals MAY be used when false-positive risk is low.

Hidden fields MUST NOT interfere with:

- assistive technology;
- password managers;
- autofill;
- legitimate scripted clients.

A honeypot trigger SHOULD normally contribute to risk rather than automatically deleting legitimate user data without recoverability.

---

## 2.48 Fraud signals

Fraud-sensitive workflows MAY combine behavioural and contextual signals.

Signals MAY include:

- request velocity;
- account age;
- session continuity;
- unusual transaction pattern;
- device change;
- payment-instrument reuse;
- IP/network reputation;
- repeated failed verification;
- unusually broad account targeting.

The system MUST document what each signal is intended to detect.

---

## 2.49 Fraud signals are not authorization

Fraud/risk scores MUST NOT replace authorization.

A low-risk request still requires normal permission checks.

A high-risk request MAY trigger stronger verification or denial but MUST NOT change ownership or role semantics.

---

## 2.50 Signal privacy and retention

Abuse and fraud signals MUST follow data-minimisation requirements.

Collection MUST be proportionate to the abuse risk.

Raw fingerprints and detailed behavioural signals SHOULD have bounded retention.

Data MUST NOT be retained indefinitely merely because it may someday improve an abuse model.

Access to sensitive fraud telemetry MUST be restricted.

---

## 2.51 High-impact automated decisions

Where abuse signals cause consequential automated restrictions, the product SHOULD define:

- reviewability;
- appeal/recovery where appropriate;
- false-positive handling;
- expiration;
- human escalation for material cases.

Risk scores SHOULD NOT become opaque permanent account labels without governance.

---

## 2.52 Account enumeration prevention

Authentication and recovery workflows MUST prevent externally observable differences that reveal whether an account exists when that information is sensitive.

Potential enumeration channels include:

- visible copy;
- HTTP status;
- response body;
- timing;
- redirect behaviour;
- challenge behaviour;
- rate-limit behaviour;
- headers.

OWASP recommends generic authentication/recovery responses and warns that even differing HTTP status codes or response timing can disclose account existence. citeturn786380search0

---

## 2.53 Generic authentication feedback

Login failures SHOULD use equivalent outward messaging for cases such as:

- unknown identifier;
- incorrect credential;
- disabled account;

where revealing the distinction would create enumeration risk.

Account-recovery responses SHOULD similarly avoid confirming identity existence where policy requires concealment.

Security requirements take precedence over ordinary UX specificity in these flows.

---

## 2.54 Timing discrepancies

Identity-sensitive workflows SHOULD avoid material timing differences between existent and nonexistent identities.

The implementation SHOULD avoid early exits that create obvious measurable distinctions.

Perfect constant-time end-to-end HTTP behaviour is often impractical, but the system MUST NOT introduce trivial enumeration side channels through substantially different processing paths.

---

## 2.55 Rate-limit enumeration

Identity-specific rate limiting MUST NOT itself reveal account existence.

For example, a `429` only for real accounts after several reset attempts could become an enumeration oracle.

Externally observable rate-limit/challenge behaviour SHOULD be normalised where necessary.

Internal account-specific limits MAY still be enforced without exposing which limiter triggered.

---

## 2.56 Account lockout

Hard account lockout MUST be designed carefully because attackers may intentionally lock out victims.

Progressive delay, risk-based challenge, MFA, and other layered responses SHOULD be considered instead of simple permanent lockout thresholds.

Where lockout exists:

- recovery MUST be defined;
- denial-of-service abuse MUST be considered;
- alerts SHOULD exist for unusual lockout rates.

---

## 2.57 Credential stuffing and password spraying

Authentication systems MUST defend against both:

- many passwords against one account;
- one/few passwords against many accounts.

Controls SHOULD combine:

- account-level limits;
- source/network limits;
- risk signals;
- MFA/passkeys where applicable;
- breached-credential controls;
- adaptive challenge.

A single per-IP threshold is insufficient against distributed credential stuffing. citeturn991190search2

---

## 2.58 Distributed low-and-slow abuse

Abuse detection MUST consider attacks distributed across:

- many IPs;
- long time periods;
- many accounts;
- many API keys.

Thresholds SHOULD include long-window and cross-identity aggregation where the threat requires it.

A botnet staying below per-IP limits MUST NOT automatically evade all abuse detection.

---

## 2.59 Cost amplification

Abuse controls MUST account for operations where attacker cost is much lower than defender cost.

Examples include:

- triggering emails/SMS;
- generating large reports;
- expensive third-party validation;
- image/video conversion;
- AI inference;
- complex database queries.

Rate limits SHOULD be based on **defender resource cost**, not only request count.

---

## 2.60 Third-party spend protection

Services that trigger metered third-party costs MUST have independent spend protection.

This SHOULD include:

- per-user limits;
- per-tenant limits;
- global circuit breakers;
- budget alerts.

A rate limit MUST NOT be the only control if one permitted request can itself generate excessive cost.

---

## 2.61 Query complexity limits

APIs exposing user-controlled query complexity MUST bound it separately.

Examples include:

- GraphQL;
- analytical query builders;
- geospatial queries;
- recursive traversal;
- wildcard search.

Controls MAY include:

- depth;
- node count;
- estimated execution cost;
- maximum records;
- timeout.

Request-rate limiting alone is insufficient.

---

## 2.62 Batch endpoint limits

Batch APIs MUST limit:

- number of operations;
- payload bytes;
- total estimated cost.

An attacker MUST NOT be able to bypass a one-request-per-second limit by placing 100,000 operations inside one accepted batch.

OWASP specifically warns that batched API operations can bypass naive request-count controls. citeturn991190search1

---

## 2.63 Realtime limits

Realtime systems MUST apply Abuse Prevention to:

- connection establishment;
- concurrent connections;
- subscription count;
- inbound message rate;
- payload size;
- expensive realtime operations.

A persistent WebSocket MUST NOT become an unlimited bypass around ordinary HTTP API quotas.

Realtime limits MUST align with the Realtime standard.

---

## 2.64 Webhook abuse

Webhook ingestion endpoints MUST protect against:

- unauthenticated traffic;
- replay;
- excessive volume;
- oversized payloads.

Provider authentication/signature verification MUST remain authoritative.

Rate limiting MUST NOT reject legitimate provider retry bursts without considering provider semantics.

---

## 2.65 Fairness under load

Shared services MUST define fairness behaviour before saturation occurs.

Fairness SHOULD answer:

- how much capacity each tenant may consume;
- whether unused capacity can be borrowed;
- what happens when capacity contracts;
- which operations are prioritised.

First-come-first-served MUST NOT automatically be considered fair in a multi-tenant system.

---

## 2.66 Tenant isolation

A tenant MUST NOT be able to cause disproportionate latency or unavailability for unrelated tenants.

Protection MAY include:

- tenant concurrency pools;
- weighted queues;
- token budgets;
- database resource governance;
- workload classes;
- job quotas.

Rate limiting is one part of tenant isolation, not the whole mechanism.

---

## 2.67 Minimum guaranteed capacity

Critical multi-tenant systems SHOULD consider reserving sufficient capacity to prevent one tenant from monopolising all service.

Unused reserved capacity MAY be made borrowable if the scheduler can reclaim it fairly.

Hard reservation SHOULD NOT create severe global underutilisation without a reliability reason.

---

## 2.68 Weighted fairness

Different tenants or workload classes MAY receive different capacity weights based on explicit entitlement.

Weights MUST derive from documented policy such as:

- service tier;
- contracted capacity;
- operational priority.

Ad hoc preferential treatment inside application code MUST NOT determine system fairness.

---

## 2.69 Priority classes

The platform MAY define workload priority classes.

Examples include:

- interactive user request;
- security-critical operation;
- background export;
- batch analytics.

Priority MUST NOT allow background work to starve permanently.

Low-priority work SHOULD retain eventual service where the product promises completion.

---

## 2.70 Adaptive limiting under saturation

The platform MAY tighten effective limits when global resources approach saturation.

Adaptive limiting SHOULD degrade lower-priority or expensive workloads before critical control-plane operations.

Dynamic changes MUST remain observable.

Clients MUST NOT assume published normal quotas are unconditional guaranteed capacity.

---

## 2.71 Load shedding

At severe load, the system SHOULD deliberately shed work instead of failing unpredictably.

Shedding SHOULD prefer requests that are:

- low priority;
- retryable;
- expensive;
- non-interactive;

before critical authentication, safety, or recovery paths where possible.

Load shedding MUST remain distinct from normal customer quota exhaustion in observability.

---

## 2.72 Retry fairness

Retrying clients MUST NOT receive disproportionate capacity simply because they generate more requests.

Server and client backoff should work together to prevent aggressive retry loops from outperforming well-behaved clients.

Clients ignoring retry instructions MAY receive stricter throttling according to policy.

---

## 2.73 Administrative overrides

Quota exceptions MAY exist for approved operational needs.

Overrides MUST be:

- scoped;
- time bounded where practical;
- attributable;
- auditable.

Permanent "unlimited" overrides SHOULD be rare.

An operational bypass MUST NOT silently disable unrelated abuse controls.

---

## 2.74 Quota configuration ownership

Quota configuration MUST have an identified owner.

Production changes SHOULD be:

- version controlled or auditable;
- reviewed;
- safely deployable;
- rollbackable.

Individual application instances MUST NOT contain untracked emergency thresholds as the long-term configuration mechanism.

---

## 2.75 Safe rollout

New or materially changed abuse rules SHOULD support staged rollout where false-positive risk is non-trivial.

Possible phases include:

- observe-only;
- shadow decision;
- challenge;
- enforce.

Security-critical emergency controls MAY bypass normal staging when necessary.

Shadow rules MUST still generate observable metrics.

---

## 2.76 Abuse decision logging

Material abuse decisions MUST be observable.

Logs SHOULD capture safe structured context such as:

- policy class;
- action;
- endpoint/business flow;
- enforcement scope;
- allowed/challenged/throttled/blocked;
- risk category.

Logs MUST NOT routinely expose:

- passwords;
- bearer tokens;
- OTP values;
- full sensitive payloads.

---

## 2.77 Metrics

Abuse-control metrics SHOULD include:

- requests allowed;
- throttled requests;
- challenged requests;
- blocks;
- challenge completion;
- quota utilisation;
- per-tenant saturation;
- concurrency rejection;
- retry rates;
- suspected automation volume;
- false-positive/support signals where measurable.

High-cardinality raw user identifiers MUST NOT become metric labels.

---

## 2.78 Abuse alerting

Alerts MUST focus on conditions requiring investigation or intervention.

Useful alert conditions MAY include:

- sudden throttling spike;
- widespread login targeting;
- distributed account enumeration;
- scraper surge;
- challenge-provider failure;
- SMS/email spend anomaly;
- one tenant approaching global capacity;
- limiter-store failure;
- unusually high false-positive indicators.

Individual routine `429` responses MUST NOT generate pages.

---

## 2.79 Attack versus product growth

Alerts SHOULD help distinguish:

- legitimate traffic growth;
- customer launch/event;
- abuse;
- accidental client retry loop;
- software regression.

Traffic volume alone is not sufficient classification.

Operational context SHOULD include:

- unique identities;
- affected endpoints;
- source distribution;
- success/failure mix;
- tenant concentration.

---

## 2.80 Abuse telemetry retention

Detailed abuse telemetry MUST have defined retention.

Raw high-risk data such as:

- fingerprints;
- network intelligence;
- fraud features;

SHOULD be retained only as long as operational and policy requirements justify.

Aggregated statistics MAY have longer retention where privacy risk is reduced.

---

## 2.81 API documentation

Public/documented APIs SHOULD describe:

- normal quota model;
- retry behaviour;
- relevant response status;
- support path for higher approved limits.

Documentation MUST NOT reveal internal abuse-detection thresholds that would materially weaken controls.

Published entitlement SHOULD distinguish contractual quota from dynamic emergency load shedding where relevant.

---

## 2.82 UI feedback for throttling

User-facing throttling MUST follow Feedback & Status standards.

The UI SHOULD explain the user-relevant condition without exposing attacker-useful internal detail.

Appropriate messages MAY be equivalent to:

**Too many attempts. Try again later.**

or:

**This operation is temporarily limited.**

The UI MUST NOT display raw limiter keys, internal bucket names, or fraud scores.

---

## 2.83 Countdown timers

A countdown MAY be shown when a reliable user-facing retry interval exists.

The client MUST NOT invent a countdown from undocumented assumptions.

A countdown MUST reconcile with server state rather than automatically enabling an action if the server may still reject it.

---

## 2.84 Forms & Validation relationship

Rate limiting MUST NOT be presented as field-validation failure.

A valid form submission blocked by abuse controls SHOULD retain valid entered data where safe.

Submitting a CAPTCHA or challenge MUST follow canonical Forms & Validation Patterns.

Challenge errors MUST be distinguishable from ordinary field-validation errors.

---

## 2.85 Accessibility

Abuse controls MUST follow Accessibility standards.

Rate limiting MUST NOT produce inaccessible retry workflows.

CAPTCHA MUST provide accessible alternatives.

Controls MUST remain:

- keyboard operable;
- screen-reader understandable;
- sufficiently targeted;
- compatible with reduced-motion requirements.

An abuse defence MUST NOT rely on inaccessible interaction simply because bots find it difficult.

---

## 2.86 Design Tokens and Components

User-facing abuse state MUST use canonical Design Tokens and shadcn/ui-based Components.

Applicable Components MAY include:

- Alert;
- Alert Dialog;
- Button;
- Form;
- Input;
- Progress;
- Toast;
- Card;
- Table/Data Grid for operator tooling.

Abuse prevention MUST NOT create a separate warning/error visual language.

---

## 2.87 State Management relationship

Client state MUST NOT become the authoritative rate-limit counter.

Server/infrastructure state remains authoritative.

The client MAY track:

- local cooldown presentation;
- challenge state;
- disabled UI;

but MUST reconcile to server responses.

Clearing browser state MUST NOT reset authoritative security quotas.

---

## 2.88 Data & Database relationship

Durable abuse counters and fraud signals MUST follow Data & Database requirements.

Counter stores SHOULD have:

- bounded retention;
- appropriate indexing/keying;
- atomic update behaviour;
- privacy classification.

Security counters MUST NOT overload the primary transactional database unnecessarily when dedicated infrastructure is appropriate.

---

## 2.89 Security relationship

Rate limiting supplements, but MUST NOT replace:

- authentication;
- authorization;
- CSRF protection;
- input validation;
- transaction integrity;
- tenant isolation.

An attacker permitted 10 unauthorized requests per minute is still unauthorized.

Every request that passes a quota MUST still satisfy ordinary Security controls.

---

## 2.90 API relationship

API endpoints MUST define abuse semantics compatible with their operation.

Idempotency MUST remain separate from rate limiting.

Validation errors, authorization errors, business conflicts, and quota exhaustion MUST use their correct API semantics.

A server MUST NOT return `429` for every security denial merely to hide authorization logic.

---

## 2.91 Multi-Tenancy relationship

Tenant identity MUST be derived from authoritative authentication/authorization context.

A client MUST NOT select an arbitrary tenant-rate-limit key through request parameters.

Tenant quotas MUST remain aligned with tenant ownership and entitlement.

Cross-tenant shared identities or service accounts MUST have explicit quota attribution.

---

## 2.92 CAPTCHA provider outage

Third-party challenge failure MUST have a defined fallback.

An external CAPTCHA outage SHOULD NOT automatically lock every legitimate user out of critical service if a safer degraded alternative exists.

Fail-open/fail-closed behaviour MUST be threat-modelled by workflow.

---

## 2.93 Proof-of-work provider/client failure

Proof-of-work controls MUST account for clients unable to execute required computation.

Where the operation is essential, an alternate verification path SHOULD exist.

The challenge MUST have resource bounds preventing the defence itself from becoming a client-side denial-of-service vector.

---

## 2.94 Testing

Abuse controls MUST be tested against:

- normal legitimate traffic;
- burst traffic;
- sustained traffic;
- distributed traffic;
- many accounts from one source;
- one account from many sources;
- tenant key rotation;
- concurrent requests;
- limiter-store failure;
- retries after `429`;
- account enumeration;
- challenge failure;
- inaccessible CAPTCHA scenario;
- IPv6 rotation;
- bot/scraper patterns;
- high-cost request amplification.

---

## 2.95 Fairness testing

Multi-tenant capacity testing SHOULD verify:

- one tenant cannot starve others;
- burst borrowing behaves as intended;
- adaptive limits preserve critical traffic;
- tenant quotas hold across many users/API keys;
- failover does not reset quota unexpectedly.

---

## 2.96 Enumeration testing

Authentication, signup, recovery, and invitation flows MUST be tested for enumeration differences in:

- visible content;
- status code;
- headers;
- timing;
- rate-limit behaviour;
- redirects;
- challenge presentation.

Testing SHOULD include statistically repeated timing observations rather than one request.

---

## 2.97 Abuse-rule testing

Risk rules SHOULD be tested for:

- true positives;
- false positives;
- bypass;
- interaction with other controls;
- expiry.

A rule that blocks automation but also blocks a significant legitimate population is not automatically acceptable merely because its attack detection rate is high.

---

## 2.98 Exceptions

A deviation from this standard MUST document:

- affected endpoint/business flow;
- omitted or modified control;
- abuse scenario;
- capacity/security impact;
- tenant-fairness impact;
- accessibility impact;
- monitoring and compensating controls;
- review/expiry date where applicable.

Repeated exceptions SHOULD trigger platform-level design review.

---

# 3. Anti-patterns

The following are non-conformant unless explicitly covered by an approved exception.

## 3.1 One global limit

Every endpoint receives the same requests-per-minute threshold regardless of cost or abuse risk.

## 3.2 IP equals user

All authenticated users behind one NAT share a low quota despite stable user identity being available.

## 3.3 IP-only login defence

Distributed attackers bypass account protection by rotating IP addresses.

## 3.4 Combined login bucket only

`IP + username` is the sole login limiter, allowing broad username spraying or distributed targeting.

## 3.5 Key multiplication

Creating ten API keys multiplies one tenant's intended quota by ten.

## 3.6 Fixed-window burst loophole

A sensitive endpoint permits double the intended burst around window boundaries.

## 3.7 Request-count cost model

A trivial metadata request and a ten-minute report generation consume the same single quota unit.

## 3.8 No concurrency cap

A low-rate attacker holds hundreds of expensive operations open simultaneously.

## 3.9 Per-instance limiter

Ten service instances independently allow ten times the intended global quota.

## 3.10 Non-atomic limiter

Concurrent requests all read "quota available" before separate counter increments.

## 3.11 Central limiter as single point of failure

A rate-limit-store outage either takes down the entire API or opens unlimited access with no documented policy.

## 3.12 200 throttling

The API returns successful HTTP status while the body says the request was rate limited.

## 3.13 Blind 429 retry

The first-party client immediately retries every throttled request.

## 3.14 Retry herd

Thousands of clients retry at precisely the same `Retry-After` boundary without jitter.

## 3.15 Rate-limit information leak

Authentication responses reveal which account-specific limiter fired or how many guesses remain for a real account.

## 3.16 CAPTCHA everywhere

Every login or signup requires a challenge regardless of risk.

## 3.17 CAPTCHA as security proof

Passing CAPTCHA is treated as proof that the user is safe.

## 3.18 Inaccessible CAPTCHA

One visual challenge blocks users who cannot complete it and provides no equivalent alternative.

## 3.19 Endless proof-of-work

Legitimate low-powered clients must perform disproportionate computation before routine access.

## 3.20 Device-fingerprint forever

Detailed client fingerprints are retained indefinitely without a defined necessity.

## 3.21 One fraud signal means block

One weak anomaly such as IP reputation permanently blocks an account.

## 3.22 Risk score equals permission

Fraud scoring replaces ordinary authorization checks.

## 3.23 Enumeration by copy

Password recovery explicitly says whether an entered email exists when concealment is required.

## 3.24 Enumeration by status

Unknown users return one HTTP status while valid-but-incorrect users return another.

## 3.25 Enumeration by timing

Nonexistent accounts exit significantly earlier than real-account credential verification.

## 3.26 Enumeration by throttling

Only existing identities begin receiving `429`, revealing which accounts are real.

## 3.27 Lockout weapon

Attackers can permanently lock arbitrary victim accounts through repeated failed attempts.

## 3.28 Naive scraper defence

The service limits requests/second but permits arbitrarily large pages or queries.

## 3.29 Batch amplification

One "request" is allowed to contain thousands of expensive mutations.

## 3.30 No third-party cost budget

An attacker can generate unlimited SMS, email, AI, or verification spend below nominal API rate limits.

## 3.31 Public means secret

Scraping controls are described as confidentiality controls for data already available publicly.

## 3.32 All automation is hostile

Search crawlers, integrations, monitoring agents, and accessibility-related automation are blocked indiscriminately.

## 3.33 Noisy-neighbour tenancy

Tenant A can consume enough workers/database capacity to make Tenant B unusable.

## 3.34 Unlimited premium bypass

A special customer exemption disables all resource protection rather than allocating an explicit larger budget.

## 3.35 First-come-first-served saturation

Aggressive clients gain more capacity during overload simply by issuing more requests.

## 3.36 Retry bully

Clients ignoring backoff receive more throughput than clients obeying retry guidance.

## 3.37 Alert every 429

Normal client throttling pages the on-call engineer.

## 3.38 Invisible anti-bot rules

Requests are silently blocked by undocumented heuristics with no observability or tuning path.

## 3.39 Permanent shadow label

A transient suspicious event produces a permanent account-risk status with no expiry or review process.

## 3.40 Client-owned quota

Deleting local storage or refreshing the page resets the effective security limit.

## 3.41 Hidden disabled button

The frontend disables a button and assumes abuse is prevented while the API remains unlimited.

## 3.42 Draft headers as final standard

An API claims experimental/current IETF RateLimit draft fields are already a stable RFC contract.

## 3.43 CAPTCHA outage lockout

Failure of a third-party CAPTCHA provider blocks every user from essential account recovery indefinitely.

## 3.44 Rate limiting as authorization

Unauthorized access is considered safe because attackers can only perform it slowly.

---

# 4. Checklist

An implementation conforms to this standard only when the following can be answered **yes** where applicable.

### Threat model

- [ ] Protected resources and business flows are identified.
- [ ] Expected legitimate rates and bursts are understood.
- [ ] Abuse cases are documented.
- [ ] Endpoint cost is understood.
- [ ] Enforcement scope is explicit.
- [ ] False-positive impact has been considered.

### Quota scope

- [ ] User quotas exist where appropriate.
- [ ] Tenant quotas exist for shared multi-tenant capacity.
- [ ] Anonymous/IP limits are used where identity is unavailable.
- [ ] API-key/client limits cannot bypass tenant entitlement.
- [ ] Independent scopes are used rather than one overly specific composite key.
- [ ] IPv6 rotation has been considered.

### Authentication abuse

- [ ] Account/identity and source limits are independent.
- [ ] Password-reset issuance is limited.
- [ ] OTP issuance and validation attempts are limited.
- [ ] Distributed credential stuffing is considered.
- [ ] Password spraying is considered.
- [ ] Lockout cannot easily become a victim DoS mechanism.

### Algorithm

- [ ] Token bucket is used where controlled bursting is appropriate.
- [ ] Capacity and refill rate are separately defined.
- [ ] Sliding window is used where rolling-window precision matters.
- [ ] Fixed-window boundary bursts are acceptable or mitigated.
- [ ] Multiple time horizons exist for low-and-slow abuse where needed.
- [ ] Expensive operations use weighted quotas or separate limits.
- [ ] Long-running work has concurrency bounds.

### Distributed enforcement

- [ ] Limits work correctly across horizontal instances.
- [ ] Allowed distributed overshoot is understood.
- [ ] Counter updates are atomic enough for the threat.
- [ ] Fail-open/fail-closed behaviour is documented.
- [ ] Local emergency resource protection exists.
- [ ] Regional/global enforcement scope is explicit.

### HTTP/API semantics

- [ ] Quota exhaustion uses `429` where appropriate.
- [ ] `429` is not cached.
- [ ] `Retry-After` is supplied where useful and safe.
- [ ] First-party clients honour retry instructions.
- [ ] Retry behaviour includes backoff/jitter.
- [ ] Non-idempotent requests are not retried unsafely.
- [ ] Error responses use the canonical API format.
- [ ] Draft RateLimit fields are not misrepresented as final RFC standards.

### Bot and scraper defence

- [ ] Automation defence uses multiple signals where warranted.
- [ ] Legitimate automated clients are considered.
- [ ] Scraping defence also bounds response/query cost.
- [ ] High-frequency business workflows have domain quotas.
- [ ] Batch APIs have operation-count and payload limits.
- [ ] Risk response can escalate progressively rather than only hard block.

### CAPTCHA and proof-of-work

- [ ] CAPTCHA is risk-triggered rather than universal where practical.
- [ ] CAPTCHA is not treated as proof of legitimacy.
- [ ] Accessible alternatives exist.
- [ ] CAPTCHA dependency failure has defined behaviour.
- [ ] Third-party CAPTCHA privacy has been reviewed.
- [ ] Proof-of-work difficulty is bounded.
- [ ] Low-powered clients are considered.
- [ ] Proofs are scoped and replay resistant.

### Fraud signals

- [ ] Each signal has a documented purpose.
- [ ] Signals do not replace authorization.
- [ ] Collection follows data minimisation.
- [ ] Raw fingerprint/reputation data has bounded retention.
- [ ] Material automated restrictions have review/recovery where appropriate.
- [ ] Temporary anomalies do not become permanent labels accidentally.

### Enumeration prevention

- [ ] Authentication copy does not reveal account existence where prohibited.
- [ ] Recovery copy is equivalently protected.
- [ ] HTTP status differences have been reviewed.
- [ ] Timing differences have been reviewed.
- [ ] Rate-limit behaviour does not become an account oracle.
- [ ] Challenge behaviour does not expose existence.
- [ ] Enumeration testing includes repeated timing measurements.

### Resource consumption

- [ ] Upload size is bounded.
- [ ] Batch size is bounded.
- [ ] Page/result size is bounded.
- [ ] Query complexity is bounded.
- [ ] Execution time is bounded where appropriate.
- [ ] Expensive external-service spend has independent limits.
- [ ] AI/compute-intensive endpoints have cost budgets where applicable.

### Multi-tenancy and fairness

- [ ] One tenant cannot consume all shared resources.
- [ ] Tenant limits apply across all users/keys.
- [ ] Fairness under saturation is defined.
- [ ] Capacity borrowing is bounded.
- [ ] Priority classes are intentional.
- [ ] Low-priority work cannot starve forever without product justification.
- [ ] Adaptive load shedding protects critical workflows.
- [ ] Overrides are scoped and auditable.

### Observability

- [ ] Allowed/throttled/challenged/blocked traffic is measured.
- [ ] Quota utilisation is observable.
- [ ] Concurrency rejection is observable.
- [ ] Challenge completion/failure is observable.
- [ ] Third-party spend anomalies are observable.
- [ ] Limiter-store health is observable.
- [ ] Metrics avoid high-cardinality raw identity labels.
- [ ] Abuse alerts are actionable rather than one alert per request.

### Privacy and Security

- [ ] Abuse telemetry has a classification and retention period.
- [ ] Logs do not expose credentials, OTPs, or tokens.
- [ ] Fraud signals are access controlled.
- [ ] Rate limiting does not replace authentication/authorization.
- [ ] Client-side controls are not the security boundary.
- [ ] Abuse defences do not introduce unapproved third-party tracking.

### Accessibility and UX

- [ ] Throttling feedback follows Feedback & Status standards.
- [ ] Legitimate users can understand when to retry.
- [ ] CAPTCHA alternatives are accessible.
- [ ] Rate-limit UI is keyboard accessible.
- [ ] Critical workflows have recovery when abuse controls produce false positives.
- [ ] Status is not communicated through colour alone.
- [ ] shadcn/ui Components and canonical Design Tokens are used for presentation.

### Testing and change management

- [ ] Burst traffic is tested.
- [ ] Sustained traffic is tested.
- [ ] Distributed traffic is tested.
- [ ] Limiter dependency failure is tested.
- [ ] IPv6/source rotation is tested where relevant.
- [ ] Multi-tenant noisy-neighbour behaviour is tested.
- [ ] Abuse rules can be observed/shadowed before enforcement where appropriate.
- [ ] Rule changes are auditable and rollbackable.

---

# 5. Canonical summary

Rate limiting MUST protect the **actual scarce resource or business capability**, not merely count HTTP requests.

**The platform SHOULD apply layered quotas across user, account, tenant, IP/network, API key/client, endpoint, and business-flow scopes according to threat.**

**IP address MUST NOT be treated as equivalent to a person. Authenticated identity and tenant context SHOULD take precedence where available.**

**Multi-tenant systems MUST have tenant-level resource boundaries. One tenant MUST NOT be able to multiply entitlement by creating more users, API keys, or concurrent requests.**

**Authentication abuse controls MUST use independent account/identity and source limits. A single combined IP+identity bucket is insufficient.**

**Token bucket SHOULD be the default when legitimate bursts are expected. Sliding windows SHOULD be used when rolling-period enforcement requires greater precision. Simple fixed windows SHOULD NOT be the default for security-sensitive public boundaries where boundary bursts matter.**

**Rate, total quota, concurrency, and per-operation cost are different controls and MUST NOT be conflated.**

**Expensive operations SHOULD consume weighted budgets or dedicated quotas. Request count alone is insufficient when operation cost varies materially.**

**Distributed rate limiting MUST explicitly define consistency and permitted overshoot. Node-local counters MUST NOT masquerade as global enforcement.**

**Limiter dependency failure MUST have an intentional fail-open, fail-closed, or degraded policy based on risk. Services SHOULD retain local emergency resource protection.**

**HTTP APIs SHOULD return `429 Too Many Requests` for ordinary quota exhaustion and SHOULD provide `Retry-After` where it gives useful and safe retry guidance. Clients MUST NOT immediately retry throttled requests.**

**During severe attack or resource exhaustion, infrastructure MAY drop or reject traffic earlier rather than spending application resources generating a `429` response for every abusive request.**

**As of Gold Standard 2026, the IETF `RateLimit-Policy` / `RateLimit` HTTP fields remain an Internet-Draft rather than a final RFC. They MAY be adopted only as an explicitly documented platform contract. `Retry-After` remains the stable standards-based retry signal.**

**Bot defence MUST be layered. No single IP, fingerprint, CAPTCHA result, or fraud score SHOULD be considered sufficient evidence in every case.**

**CAPTCHA MUST be a defence-in-depth escalation mechanism rather than a universal gate. Accessible alternatives are mandatory.**

**Proof-of-work MAY raise automation cost but MUST be bounded, adaptive, replay-resistant, and designed so low-powered legitimate clients are not disproportionately denied access.**

**Fraud and abuse signals MUST follow data-minimisation, retention, access-control, and false-positive governance requirements. Risk scoring MUST NOT replace authorization.**

**Authentication, registration, recovery, and verification flows MUST prevent account enumeration through copy, HTTP status, timing, challenge behaviour, or rate-limit behaviour where account existence is sensitive.**

**Rate limiting MUST cover business abuse as well as infrastructure abuse. Ticket hoarding, fake account creation, card testing, coupon abuse, scraping, OTP generation, and similar workflows require domain-specific controls beyond generic requests-per-second.**

**Batch size, query complexity, result size, payload size, concurrent work, execution time, and third-party spend MUST be bounded where they create resource-amplification risk.**

**Fairness under load MUST be designed explicitly. First-come-first-served is not inherently fair when aggressive clients can monopolise shared resources.**

**Multi-tenant services SHOULD use tenant budgets, bounded concurrency, workload priorities, and deliberate load shedding to prevent noisy-neighbour failure.**

**Retrying clients MUST NOT gain more service merely because they retry more aggressively than well-behaved clients.**

**Abuse decisions MUST be observable. The platform SHOULD measure throttling, challenge volume, blocks, quota utilisation, tenant saturation, spend anomalies, false-positive indicators, and limiter infrastructure health.**

**Normal individual `429` responses MUST NOT page operators. Alerts MUST represent meaningful attack, system, fairness, or control failure.**

**Rate limiting supplements—but MUST NOT replace—authentication, authorization, validation, CSRF controls, idempotency, transaction integrity, and tenant isolation.**

**Client-side disabling, CAPTCHA presentation, hidden UI, or browser state MUST NOT be the authoritative enforcement boundary.**

**User-facing abuse feedback MUST use canonical shadcn/ui-based Components, Design Tokens, Accessibility, Forms & Validation, Feedback & Status, and Content & UX Writing standards. shadcn/ui has no role in backend enforcement architecture.**

The Gold Standard is achieved when the platform can **absorb legitimate bursts, constrain sustained abuse, resist distributed low-and-slow attacks, prevent one tenant from monopolising shared resources, control financial amplification, protect sensitive identity workflows without creating enumeration channels, and degrade fairly under load without turning abuse prevention itself into an availability or accessibility failure.**
