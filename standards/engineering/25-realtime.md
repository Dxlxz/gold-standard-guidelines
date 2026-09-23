---
id: "realtime"
title: "Realtime WebSocket SSE"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "realtime", "websocket", "sse"]
applies_to: ["general"]
related: ["feedback", "tables"]
legacy_number: 71
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 74409
provenance: baseline

---

# Realtime (WebSocket/SSE) — Gold Standard 2026

**Status:** Canonical  
**Standard level:** Gold Standard 2026  
**Canonical placement:** **API → Realtime → Infrastructure → Observability**  
**Primary transports:** WebSocket and Server-Sent Events (SSE)  
**UI baseline:** shadcn/ui for user- and operator-facing realtime status surfaces  
**Applies to:** Realtime web applications, notifications, collaborative state, live dashboards, chat, presence, typing indicators, job progress, event streams, live operational consoles, and server-driven updates.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements unless an approved exception is documented.

---

# 1. Purpose

## 1.1 Objective

This standard defines how applications MUST design, operate, secure, scale, and observe realtime communication using WebSocket or Server-Sent Events.

It governs:

- transport selection;
- connection establishment;
- connection lifecycle;
- reconnection;
- exponential backoff and jitter;
- heartbeats and liveness;
- authentication;
- authorization;
- token expiry and refresh;
- event schemas;
- ordering;
- delivery guarantees;
- acknowledgement;
- deduplication;
- resume and replay;
- presence;
- typing indicators;
- subscriptions;
- fan-out;
- horizontal scaling;
- backpressure;
- rate control;
- offline buffering;
- client reconciliation;
- observable connection health;
- accessible realtime status.

This standard MUST be applied together with:

- Security;
- Data & Database;
- API;
- Data Ingestion / ETL;
- Jobs & Queue;
- State Management;
- Forms & Validation;
- Accessibility;
- Design Tokens;
- Component;
- Pattern;
- Content & UX Writing;
- Observability standards.

Realtime communication MUST be treated as a distributed-systems concern, not merely as a persistent HTTP connection.

---

## 1.2 Governing principles

Realtime systems MUST assume that:

- connections disconnect;
- networks change;
- clients sleep;
- proxies terminate idle connections;
- messages may be retried;
- reconnects may overlap;
- credentials expire;
- users open multiple tabs/devices;
- application instances restart;
- consumers process at different speeds;
- some clients remain offline for long periods.

A correct realtime system MUST remain understandable and recoverable under these conditions.

The canonical design principle is:

**Transport provides connectivity. The application protocol provides semantics. Authoritative state remains outside the connection.**

A WebSocket connection MUST NOT itself be treated as:

- durable state;
- authentication state;
- delivery proof;
- persistence proof;
- database state;
- business transaction state.

---

## 1.3 Realtime is not the source of truth

Realtime messages SHOULD communicate:

- a state transition;
- an invalidation;
- an event;
- a new authoritative version;
- a hint to refresh;
- an ephemeral collaborative signal.

The socket connection MUST NOT become the only durable copy of important business state.

Material business state MUST remain recoverable from an authoritative system such as:

- API;
- database;
- event log;
- job resource;
- approved durable store.

A page reload or reconnect MUST NOT permanently destroy authoritative business information.

---

# 2. Rules

## 2.1 Transport selection

The transport MUST be selected according to communication requirements.

### 2.1.1 SSE SHOULD be preferred when

Communication is primarily:

- server → client;
- notification-oriented;
- status streaming;
- progress updates;
- dashboard updates;
- invalidation/events;
- append-style feeds.

SSE SHOULD be preferred when ordinary HTTP semantics, straightforward proxy behaviour, and built-in EventSource reconnection/resume semantics materially simplify the architecture.

### 2.1.2 WebSocket SHOULD be preferred when

Communication genuinely requires:

- client ↔ server bidirectionality;
- frequent low-latency client messages;
- chat;
- collaborative editing;
- interactive control streams;
- bidirectional protocol negotiation;
- rapidly changing ephemeral state.

WebSocket MUST NOT be selected merely because the feature is described as "realtime."

### 2.1.3 Ordinary HTTP SHOULD remain preferred when

The requirement is adequately served by:

- request/response;
- occasional polling;
- long polling;
- asynchronous job retrieval.

Persistent connection infrastructure MUST NOT be introduced without a meaningful realtime requirement.

---

## 2.2 Transport capability matrix

The architecture SHOULD explicitly consider:

| Capability | SSE | WebSocket |
|---|---|---|
| Server → client | Yes | Yes |
| Client → server | Separate HTTP request | Yes |
| Native browser API | `EventSource` | `WebSocket` |
| Automatic browser reconnect | Yes | No application-level reconnect by default |
| Event IDs/resume support | Built into SSE protocol | Application-defined |
| HTTP semantics | Strong | Upgrade/persistent socket |
| Binary application payload | Not native EventSource model | Supported |
| Full duplex | No | Yes |
| Browser custom handshake headers | Limited | Limited |
| Browser API backpressure | Application must manage consumer pressure | Classic `WebSocket` lacks automatic backpressure |

The choice MUST consider infrastructure and operational behaviour in addition to frontend API convenience.

---

## 2.3 Transport escalation

If WebSocket and SSE cannot satisfy requirements involving substantially different transport semantics, such as unreliable datagrams or multiple independent transport streams, the architecture MAY evaluate another approved transport through a separate Architecture review.

Such a decision MUST NOT be hidden inside a feature implementation.

A product MUST NOT introduce multiple realtime transport families without an explicit platform-level reason.

---

## 2.4 Secure transport

Production WebSocket connections MUST use `wss://`.

Production SSE MUST use HTTPS.

Unencrypted realtime transport MUST NOT carry authenticated or sensitive application traffic.

TLS termination topology MUST be documented where connections pass through:

- CDN;
- load balancer;
- ingress;
- gateway;
- reverse proxy.

Downstream internal links MUST follow the Security standard.

---

## 2.5 Realtime endpoint versioning

Realtime endpoints MUST have a versioning strategy.

The application protocol SHOULD be versioned independently from transport where practical.

The version MAY be established through:

- endpoint version;
- WebSocket subprotocol;
- handshake metadata;
- message envelope version.

Clients and servers MUST NOT silently interpret incompatible message schemas.

Breaking protocol changes MUST follow the API compatibility standard.

---

## 2.6 Message envelope

Material realtime messages SHOULD use a canonical envelope.

A typical logical envelope SHOULD provide, as applicable:

- message/event type;
- protocol/schema version;
- event ID;
- sequence;
- timestamp;
- entity/resource identity;
- authoritative resource version;
- correlation/trace ID;
- payload.

Transport metadata and business payload SHOULD remain conceptually separate.

Application consumers MUST NOT infer business semantics from arbitrary socket-frame boundaries.

---

## 2.7 Event type

Every application message MUST have an unambiguous semantic type.

Event types SHOULD describe what occurred rather than which UI component should update.

Prefer concepts equivalent to:

- `order.updated`;
- `job.completed`;
- `message.created`;
- `document.presence.changed`;

over concepts equivalent to:

- `refresh-sidebar`;
- `turn-card-green`;
- `update-row-3`.

Realtime APIs MUST remain domain-oriented rather than coupling backend events directly to one UI implementation.

---

## 2.8 Connection states

Client realtime infrastructure MUST expose an explicit connection-state model.

At minimum, implementations SHOULD distinguish:

- idle/not started;
- connecting;
- connected;
- reconnecting;
- offline/suspended;
- authentication required;
- terminally closed.

A simple Boolean `isConnected` SHOULD NOT be the complete state model for non-trivial realtime applications.

"Disconnected" MUST NOT automatically mean "offline."

---

## 2.9 Connection ownership

Connection lifecycle MUST have one canonical owner.

Individual page components MUST NOT independently create duplicate connections to the same logical realtime service without a specific architectural reason.

Applications SHOULD use a shared connection manager where multiple features consume the same endpoint.

The connection manager SHOULD own:

- connect;
- reconnect;
- auth;
- heartbeat/liveness;
- subscription restoration;
- send buffering;
- health state.

Feature components SHOULD consume semantic events or subscriptions rather than manage raw sockets.

---

## 2.10 Multiple tabs and windows

The architecture MUST define whether each browser tab establishes its own realtime connection.

Where connection volume matters, applications MAY coordinate tabs using approved browser mechanisms.

Cross-tab connection sharing MUST NOT weaken:

- authorization;
- user isolation;
- logout behaviour;
- subscription scope.

A connection count budget SHOULD account for normal multi-tab usage.

---

## 2.11 Connection establishment

Initial connection SHOULD occur only when realtime functionality is required.

Applications SHOULD avoid opening long-lived connections on pages that do not consume realtime data.

Connection establishment MUST have a timeout.

A connection attempt MUST NOT remain indefinitely in a visually or operationally ambiguous state.

The client SHOULD expose meaningful degraded behaviour if initial realtime connection fails.

---

## 2.12 Graceful shutdown

Clients SHOULD close realtime connections when the logical consumer permanently exits.

Servers SHOULD perform graceful connection shutdown during:

- deployment;
- instance draining;
- maintenance;
- planned failover.

Where practical, infrastructure SHOULD stop accepting new connections before terminating existing ones.

Connection draining MUST have a bounded timeout.

The client MUST be capable of reconnecting to another healthy instance.

---

## 2.13 Client lifecycle

Browser applications SHOULD account for:

- page visibility;
- page lifecycle;
- navigation;
- sleep/wake;
- network change.

A socket MUST NOT be assumed healthy merely because no browser `close` event has yet occurred.

After extended suspension, the client SHOULD verify or re-establish connection state.

Applications SHOULD close unnecessary connections when their page lifecycle permanently ends.

---

## 2.14 Reconnection

Unexpected disconnects SHOULD trigger automatic reconnect when the session and application state permit it.

Reconnect logic MUST distinguish:

- retryable transport failure;
- authentication failure;
- authorization failure;
- explicit server shutdown;
- protocol incompatibility;
- application-requested close.

A client MUST NOT reconnect indefinitely after a terminal protocol or authorization failure.

---

## 2.15 Exponential backoff

Repeated reconnect attempts MUST use bounded backoff.

Backoff SHOULD increase after consecutive failures.

A canonical strategy SHOULD use:

- exponential growth;
- maximum delay;
- reset after sufficient stable connection;
- jitter.

Exact values MUST be platform-configurable.

---

## 2.16 Jitter

Reconnect backoff MUST include jitter for large-scale clients.

Thousands of clients MUST NOT reconnect on identical deterministic intervals after:

- deployment;
- regional outage;
- load-balancer restart;
- network recovery.

Jitter SHOULD distribute recovery load across the reconnect window.

---

## 2.17 Reconnect reset

The backoff attempt counter SHOULD NOT reset immediately after a connection opens if the connection closes again almost immediately.

The client SHOULD require a defined stability interval or other successful-health condition before resetting to the shortest retry delay.

This protects infrastructure from tight reconnect loops during partial failure.

---

## 2.18 Retry budget

Clients SHOULD have a realtime retry budget or escalation strategy.

After prolonged inability to connect, the system SHOULD:

- reduce retry frequency;
- expose degraded connection status where useful;
- rely on normal HTTP fallback where available.

Background tabs SHOULD NOT retry aggressively forever.

Retry frequency MUST be proportional to user impact.

---

## 2.19 SSE reconnection

SSE clients MAY use native EventSource reconnect behaviour.

Servers SHOULD assign stable event IDs where resumability is required.

The server MAY send the SSE `retry` field to influence reconnect delay.

The application MUST NOT assume automatic reconnect means no messages can be missed.

Resume behaviour MUST be explicitly designed.

---

## 2.20 SSE Last-Event-ID

SSE streams requiring reliable resume SHOULD use event `id` values.

After reconnect, the server SHOULD use the client's last event identity to continue from the appropriate logical position when retained history permits it.

Event IDs MUST have stable ordering/resume semantics.

An opaque ID MAY represent:

- sequence;
- log offset;
- durable event identity.

SSE `Last-Event-ID` MUST NOT be described as an exactly-once guarantee.

---

## 2.21 WebSocket resume

WebSocket protocols requiring loss detection or replay MUST define their own resume mechanism.

Clients SHOULD retain the last successfully processed sequence or event ID where resume is required.

A reconnect handshake MAY provide the last processed position.

The server SHOULD then:

- replay retained events;
- return an authoritative snapshot;
- require client resynchronisation;

according to the protocol contract.

Reconnect without state reconciliation MUST NOT be assumed sufficient.

---

## 2.22 Heartbeats

Long-lived connections MUST have a liveness strategy.

Heartbeats MAY be implemented through:

- WebSocket Ping/Pong protocol frames where supported server-side;
- application-level heartbeat messages;
- SSE comment/keepalive events;
- another approved mechanism.

Heartbeat intervals MUST account for intermediary idle timeouts.

The heartbeat interval SHOULD be shorter than the shortest relevant infrastructure idle timeout with an appropriate safety margin.

---

## 2.23 WebSocket Ping/Pong

WebSocket servers SHOULD use protocol Ping/Pong where supported by their runtime for connection-liveness detection.

RFC WebSocket Ping/Pong SHOULD be preferred over application-level heartbeat messages when only transport liveness is required.

Browser application code MUST NOT assume the browser WebSocket API exposes protocol Ping-frame controls.

Application-level heartbeat messages MAY still be necessary when application-session liveness, latency, or user-state semantics must be measured.

---

## 2.24 SSE keepalive

SSE servers SHOULD emit periodic lightweight keepalive traffic when infrastructure may terminate otherwise idle streams.

Keepalive data SHOULD NOT create user-visible application events unnecessarily.

SSE comments or equivalent protocol-safe keepalive output MAY be used.

Keepalive frequency MUST NOT create unnecessary bandwidth or processing load.

---

## 2.25 Liveness timeout

A connection MUST be considered unhealthy when expected liveness signals are absent beyond the defined threshold.

Liveness detection MUST account for:

- normal latency;
- temporary scheduling delays;
- mobile suspension;
- infrastructure behaviour.

A single delayed heartbeat SHOULD NOT necessarily terminate an otherwise healthy connection.

Timeout policy MUST balance fast failure detection against false-positive reconnects.

---

## 2.26 Heartbeat versus presence

Connection heartbeat and user presence are different concepts.

A successful heartbeat proves only that the relevant connection path is responsive.

It does NOT prove that the user is:

- actively viewing the page;
- physically present;
- interacting;
- available;
- reading messages.

Presence logic MUST NOT derive "active now" solely from transport heartbeats.

---

## 2.27 Presence model

Presence MUST have explicit semantics.

Permitted states MAY include:

- online;
- active;
- idle;
- away;
- offline;
- unknown.

The product MUST define what each state means.

"Online" SHOULD generally mean recent authenticated connectivity, not human attention.

"Active" SHOULD require a separately defined user-activity signal.

---

## 2.28 Presence TTL

Presence SHOULD be lease/TTL based rather than relying solely on disconnect events.

Abrupt connection loss MUST eventually expire stale presence.

Presence entries MUST have a bounded lifetime unless refreshed.

Server crashes MUST NOT leave users permanently represented as online.

---

## 2.29 Multi-device presence

Presence MUST account for multiple:

- tabs;
- devices;
- sessions.

A user SHOULD NOT become offline merely because one of several active connections closed.

Presence aggregation MUST use canonical user/session identifiers.

The aggregation strategy MUST define when the user becomes offline after the last qualifying connection expires.

---

## 2.30 Presence privacy

Presence information is user data.

Visibility MUST respect:

- authorization;
- privacy settings;
- organisational boundaries;
- product policy.

A user MUST NOT be able to enumerate or observe presence for users they are not authorised to discover.

Presence history MUST NOT be retained indefinitely unless there is a defined business requirement and approved data policy.

---

## 2.31 Typing indicators

Typing indicators MUST be treated as ephemeral state.

Typing signals SHOULD NOT be persisted as durable business records.

A typing state SHOULD expire automatically after a short TTL.

Clients SHOULD throttle typing events.

A keystroke MUST NOT produce one network message per key without a specific justified protocol.

---

## 2.32 Typing indicator privacy

Typing indicators MUST NOT transmit message content.

The event SHOULD communicate only sufficient state such as:

- actor;
- conversation;
- typing/not typing;
- timestamp/expiry.

Draft text MUST NOT be included merely to implement the indicator.

Typing visibility MUST follow conversation authorization.

---

## 2.33 Ephemeral event coalescing

High-frequency ephemeral events SHOULD be coalesced.

Examples include:

- typing;
- cursor movement;
- pointer movement;
- live presence;
- viewport position.

The system SHOULD favour the newest relevant state rather than delivering every historical intermediate update.

Ephemeral realtime data MAY use lossy semantics where the domain permits it.

---

## 2.34 Message ordering

Transport ordering MUST NOT be confused with application ordering.

A single live WebSocket connection preserves the ordered byte stream of its underlying reliable transport.

SSE delivers events in the order they occur within one open response stream.

However, application events MAY be reordered across:

- reconnect;
- replay;
- multiple producers;
- multiple partitions;
- fan-out workers;
- asynchronous processing;
- cross-region routing.

Applications requiring semantic order MUST define it explicitly.

---

## 2.35 Sequence numbers

Ordered streams SHOULD include a monotonic logical sequence where ordering or gap detection matters.

Sequence scope MUST be defined.

Examples include:

- per conversation;
- per document;
- per user stream;
- per entity;
- per topic.

A global sequence SHOULD NOT be introduced if per-entity ordering is sufficient.

---

## 2.36 Gap detection

Clients requiring complete ordered state MUST detect missing sequence values where the protocol supports it.

On a gap, the client MUST NOT silently assume state is correct.

Recovery MAY use:

- replay;
- delta fetch;
- authoritative snapshot;
- API reconciliation.

The recovery strategy MUST be part of the protocol.

---

## 2.37 Duplicate messages

Clients MUST assume duplicate logical events can occur unless the protocol explicitly guarantees otherwise.

Material mutations or event application SHOULD use stable event IDs or resource versions for deduplication.

Duplicate messages MUST NOT cause duplicate business effects.

Ephemeral idempotent state messages MAY simply overwrite newer/older state according to version rules.

---

## 2.38 Delivery guarantees

Every realtime message class MUST have defined delivery semantics.

Useful classifications include:

- best effort;
- at-most-once;
- at-least-once;
- effectively-once result through deduplication/idempotency.

Unqualified "exactly once" MUST NOT be used.

Transport delivery alone MUST NOT be equated with durable application processing.

---

## 2.39 Exactly-once claims

An exactly-once claim MUST identify the transactional boundary across:

- source;
- broker/event log where applicable;
- realtime gateway;
- client;
- resulting side effect.

A WebSocket acknowledgement alone MUST NOT be described as exactly-once business processing.

Applications SHOULD prefer:

- stable event IDs;
- idempotent mutations;
- versioned resources;
- at-least-once replay;

over vague exactly-once assumptions.

---

## 2.40 Acknowledgements

Application-level acknowledgements SHOULD be used only when the protocol requires evidence that a message reached a defined processing stage.

An acknowledgement contract MUST specify what it means.

Possible meanings include:

- frame received;
- message parsed;
- server accepted;
- durable persistence completed;
- business processing completed;
- client rendered/read.

These MUST NOT be treated as interchangeable.

---

## 2.41 Chat/message delivery states

Messaging interfaces MAY expose states such as:

- sending;
- sent;
- delivered;
- read;
- failed.

Each state MUST correspond to a defined backend condition.

**Sent** MUST NOT automatically mean **delivered**.

**Delivered** MUST NOT automatically mean **read**.

Read receipts MUST follow privacy and product-policy requirements.

---

## 2.42 Client-originated message identity

Retryable client-originated operations SHOULD carry a client-generated stable operation/message ID.

The ID MUST remain the same across retries of the same logical action.

Creating a new ID on each reconnect retry defeats deduplication and SHOULD NOT occur.

Server responses SHOULD correlate to the logical operation where asynchronous acknowledgement is required.

---

## 2.43 Subscription model

Realtime services SHOULD use explicit subscription semantics when clients consume different datasets/topics.

A subscription SHOULD identify:

- resource/topic;
- scope;
- authorisation context;
- resume position where applicable.

A client MUST NOT receive all tenant/application events and filter restricted events locally.

Server-side subscription authorization is mandatory.

---

## 2.44 Subscription lifecycle

The client SHOULD restore valid subscriptions after reconnect.

Subscriptions MUST NOT be blindly restored after identity, tenant, or authorization context changes.

Logout MUST invalidate all active subscriptions.

Permission changes SHOULD affect existing subscriptions promptly according to Security requirements.

---

## 2.45 Subscription acknowledgements

Where subscription establishment can fail, the protocol SHOULD provide explicit accepted/rejected acknowledgement.

A client MUST NOT assume a subscription is active merely because it sent a subscribe message.

Subscription failure SHOULD be distinguishable from connection failure.

---

## 2.46 Unsubscribe

Clients SHOULD release subscriptions they no longer need.

The server SHOULD clean up subscription state automatically when the underlying connection closes.

Server subscription state MUST NOT leak indefinitely after abnormal disconnection.

---

## 2.47 Fan-out architecture

Fan-out MUST NOT depend on all subscribers being connected to the same application process unless the architecture explicitly guarantees a single node.

Horizontally scaled realtime systems SHOULD use an appropriate shared distribution mechanism.

Possible mechanisms include:

- broker/pub-sub;
- durable event log;
- database notification layer where appropriate;
- managed realtime infrastructure.

The fan-out layer MUST align with required ordering and delivery semantics.

---

## 2.48 Stateless gateways

Realtime gateway nodes SHOULD remain as stateless as practical.

Durable business state MUST NOT live only in one gateway's memory.

Ephemeral connection mappings MAY remain node-local where infrastructure can route or distribute events correctly.

Connection state required across nodes SHOULD use an appropriate shared mechanism.

---

## 2.49 Sticky sessions

Sticky sessions MAY simplify some WebSocket deployments but MUST NOT be the sole resilience mechanism.

Clients MUST tolerate reconnection to another instance.

Durable subscription or delivery state MUST NOT disappear permanently when one instance fails.

Architecture SHOULD minimise dependence on affinity where practical.

---

## 2.50 Shared broker

When a broker is used for fan-out, its semantics MUST be documented.

The architecture MUST understand:

- ordering;
- persistence;
- replay;
- retention;
- partitioning;
- consumer behaviour;
- duplicate delivery.

A pub/sub broker MUST NOT automatically be assumed durable.

A durable log MUST NOT automatically be assumed suitable for every high-frequency ephemeral signal.

---

## 2.51 Ephemeral versus durable channels

Realtime architecture SHOULD separate ephemeral signals from durable business events where their requirements differ materially.

Examples:

**Ephemeral**
- typing;
- presence heartbeat;
- cursor position.

**Durable**
- chat message;
- payment state change;
- job completion;
- audit-relevant event.

Ephemeral traffic SHOULD NOT consume expensive durable storage unnecessarily.

Durable events MUST NOT be treated as disposable merely because they are distributed through a realtime transport.

---

## 2.52 Fan-out authorization

Fan-out systems MUST apply authorization before delivering protected events.

Authorization MUST account for:

- user;
- tenant;
- role;
- resource;
- subscription scope.

Publishing an event to a shared topic MUST NOT accidentally expose it to unauthorized connections.

Client filtering MUST NOT be the security boundary.

---

## 2.53 Backpressure

Realtime systems MUST have explicit backpressure behaviour.

The classic browser `WebSocket` API does not provide automatic receive-side backpressure.

Applications MUST therefore bound:

- pending outbound messages;
- pending inbound work;
- per-connection queues;
- broker buffers;
- fan-out queues.

Unbounded queues are non-conformant.

---

## 2.54 WebSocket buffered output

WebSocket clients sending non-trivial traffic SHOULD monitor or otherwise bound unsent output.

Browser implementations MAY inspect `bufferedAmount`.

A client MUST NOT continue enqueuing unlimited messages when the socket cannot drain.

When configured thresholds are exceeded, the application SHOULD:

- pause;
- coalesce;
- discard eligible ephemeral data;
- apply application backpressure;
- close/recover the connection where necessary.

---

## 2.55 Slow consumers

Servers MUST detect and handle slow consumers.

One slow connection MUST NOT create unbounded memory growth.

Possible responses include:

- coalescing replaceable state;
- dropping best-effort events;
- bounded queue overflow policy;
- disconnecting the slow consumer;
- requiring snapshot resynchronisation.

The policy MUST depend on event durability semantics.

Critical durable events MUST NOT simply be discarded without a recovery mechanism.

---

## 2.56 High-frequency state

High-frequency state SHOULD use latest-state semantics where historical intermediate states have no value.

For example, if five cursor positions are queued, sending only the newest position MAY be correct.

This optimisation MUST NOT be applied to ordered durable events such as financial transactions or chat messages.

---

## 2.57 Rate limits

Realtime endpoints MUST implement appropriate rate control.

Limits SHOULD consider:

- connections per user;
- connections per account/tenant;
- connections per IP where useful;
- messages per connection;
- messages per user;
- subscription count;
- payload bytes;
- expensive action frequency.

Rate limits MUST account for legitimate reconnect and multi-device patterns.

---

## 2.58 Message size limits

Realtime messages MUST have bounded size.

Oversized messages SHOULD be rejected before expensive parsing where infrastructure permits.

Large file transfer SHOULD normally use dedicated upload/download mechanisms rather than WebSocket JSON messages.

Realtime messages SHOULD carry references to large objects instead of embedding them unless the protocol explicitly requires binary streaming.

---

## 2.59 Compression

Realtime compression SHOULD be enabled only when its benefits and security/resource impact are understood.

Compression MUST NOT be assumed beneficial for small messages.

Sensitive data and compression SHOULD receive Security review because compression can create side-channel considerations.

Compression configuration MUST be platform-owned rather than feature-owned.

---

## 2.60 Authentication

Realtime connections MUST authenticate through an approved Security mechanism.

A connected transport MUST NOT automatically be considered authenticated.

The authentication mechanism MUST be defined separately for:

- browser clients;
- trusted service clients where applicable.

Browser API limitations around arbitrary handshake headers MUST be considered explicitly.

---

## 2.61 Cookie-authenticated WebSocket

Cookie-based WebSocket authentication MAY be used for same-site web applications.

Servers MUST validate the browser `Origin` against an explicit allowlist where browser-origin security is relevant.

Cookie authentication MUST use appropriate:

- Secure;
- HttpOnly;
- SameSite;

settings according to Security standards.

Origin validation MUST NOT replace normal authentication and authorization.

---

## 2.62 Cross-Site WebSocket Hijacking protection

Browser WebSocket endpoints MUST defend against Cross-Site WebSocket Hijacking where cookie/session authentication is used.

The server MUST validate allowed Origins.

Wildcard or substring-based origin validation SHOULD NOT be used.

Non-browser clients MUST NOT be trusted merely because they supply an allowed Origin header.

Origin is a browser protection signal, not user authentication.

---

## 2.63 Token-based WebSocket auth

Token-authenticated browser WebSockets MUST use an explicitly designed mechanism.

The product SHOULD avoid long-lived bearer tokens in WebSocket query strings.

Query parameters MAY be recorded by:

- access logs;
- gateways;
- analytics;
- monitoring infrastructure.

If a URL credential mechanism is unavoidable, it SHOULD use a narrowly scoped, short-lived, single-purpose connection credential rather than the primary long-lived API bearer token.

Logs MUST redact sensitive credentials.

---

## 2.64 WebSocket authentication message

A WebSocket protocol MAY establish the transport and then require an application-level authentication message before normal subscriptions or actions are allowed.

Before authentication succeeds, the server MUST restrict the connection to the authentication protocol.

Unauthenticated connections MUST have short timeouts and strict resource limits.

Business events MUST NOT be delivered before authentication and authorization complete.

---

## 2.65 SSE authentication

SSE authentication MUST account for EventSource browser API constraints.

Same-site session-cookie authentication MAY be used.

Cross-origin credentialed EventSource MUST follow CORS and Security requirements.

When bearer-token Authorization headers are a hard requirement, the architecture MAY use an approved fetch-based streaming Pattern instead of native EventSource.

Long-lived sensitive bearer credentials SHOULD NOT be placed in ordinary SSE query strings.

---

## 2.66 Token expiry

Long-lived realtime connections MUST have defined token/session-expiry behaviour.

A connection MUST NOT remain authorised indefinitely merely because it was valid at connection establishment.

The system SHOULD re-evaluate session validity according to the Security model.

On expiry, the protocol SHOULD:

- refresh/re-authenticate safely;
- or terminate and reconnect after credential refresh.

---

## 2.67 Token refresh

Token refresh MUST avoid interrupting authorised connections unnecessarily where the platform supports safe in-connection re-authentication.

Otherwise the client SHOULD:

1. refresh the credential through the canonical auth flow;
2. close/reconnect;
3. re-authenticate;
4. restore valid subscriptions;
5. reconcile missed state.

Credential refresh MUST NOT create parallel authorised connections accidentally unless the protocol explicitly supports overlap.

---

## 2.68 Logout and revocation

Logout MUST invalidate realtime access promptly.

Applications SHOULD close the local connection immediately on logout.

Servers MUST have a mechanism to terminate or deny continued use of invalidated sessions according to Security requirements.

Privilege or account revocation MUST NOT depend solely on the client voluntarily disconnecting.

---

## 2.69 Message-level authorization

Every privileged client-originated realtime action MUST be authorised at action time.

A successfully authenticated connection MUST NOT imply authorization for every message type or resource.

The server MUST validate:

- action;
- resource;
- tenant;
- current permission.

Authorization decisions MUST remain server-side.

---

## 2.70 Server-to-client authorization changes

The system SHOULD handle permissions changing while a connection remains active.

Where access is revoked, the server SHOULD stop delivering affected events promptly.

The client MAY be instructed to:

- unsubscribe;
- refresh state;
- close;
- re-authenticate.

Previously cached sensitive state MUST follow the State Management and Security standards.

---

## 2.71 Input validation

Every client-originated realtime message MUST be treated as untrusted input.

Messages MUST be validated for:

- schema;
- type;
- size;
- field bounds;
- resource identifiers;
- authorization.

Malformed messages SHOULD fail without destabilising the connection server.

Repeated abusive malformed traffic MAY justify termination and rate limiting.

---

## 2.72 Protocol error handling

The realtime protocol SHOULD define structured error messages for recoverable application-level failures.

Protocol errors SHOULD distinguish, as applicable:

- invalid message;
- unauthenticated;
- unauthorized;
- conflict;
- rate limited;
- unsupported version;
- temporary server error.

Raw exception messages MUST NOT be sent to clients.

Terminal protocol failure SHOULD result in an intentional close.

---

## 2.73 Close semantics

WebSocket applications SHOULD use meaningful standard or application-defined close semantics.

Clients MUST distinguish intentional logout/shutdown from unexpected transport loss where possible.

Reconnect policy MUST consider the close reason/code.

Sensitive internal information MUST NOT be embedded in human-readable close reasons.

---

## 2.74 Offline operation

The product MUST define what realtime-dependent features do when the client is offline.

Possible behaviour includes:

- read-only cached state;
- degraded HTTP functionality;
- queued local mutation;
- blocking actions requiring connectivity.

The product MUST NOT silently accept an operation that cannot safely be reconciled later.

---

## 2.75 Offline buffering

Client-originated offline buffering MAY be used for operations that are:

- safe to replay;
- idempotent or deduplicated;
- conflict-manageable.

Each buffered operation SHOULD retain:

- stable operation ID;
- creation time;
- ordering context;
- required authorization/resource context;
- payload/version.

Offline queues MUST be bounded.

---

## 2.76 Sensitive offline storage

Offline-buffered messages MAY contain sensitive information.

Persistence MUST follow Security and Data standards.

Sensitive queued data SHOULD NOT be written to broadly accessible browser storage without review.

Queue retention MUST be bounded.

Logout SHOULD clear or invalidate offline data that must no longer remain accessible.

---

## 2.77 Offline queue ordering

If queued operations depend on order, the client MUST preserve that logical order during replay.

Independent operations MAY replay concurrently when safe.

A failed queued operation MUST have defined effects on dependent subsequent operations.

The system MUST NOT blindly continue dependent mutations after an earlier prerequisite mutation failed.

---

## 2.78 Offline replay authorization

Queued operations MUST be re-authorised when replayed.

Authorization from the time an offline operation was created MUST NOT be assumed valid later.

The server remains authoritative.

If permissions changed, replay MUST fail safely.

---

## 2.79 Conflict resolution

Offline and reconnect flows MUST define conflict behaviour.

Possible strategies include:

- last-write-wins where domain-approved;
- version conflict requiring refresh;
- merge;
- user resolution;
- server-side domain reconciliation.

Last-write-wins MUST NOT be used merely because conflict handling is inconvenient.

High-consequence data SHOULD use explicit concurrency/version semantics.

---

## 2.80 Reconnect reconciliation

After reconnect, the client MUST determine whether local state remains current.

Reconnect recovery SHOULD use one of:

- resume/replay;
- authoritative refetch;
- version comparison;
- snapshot plus subsequent events.

"Socket connected" MUST NOT automatically mean "UI state is current."

---

## 2.81 Snapshot plus stream Pattern

Realtime state that requires a complete current view SHOULD commonly use:

1. authoritative snapshot;
2. known snapshot/version boundary;
3. realtime deltas after that boundary.

The implementation MUST prevent gaps between snapshot acquisition and event consumption.

If the boundary cannot be guaranteed directly, the client MUST detect inconsistency and resynchronise.

---

## 2.82 Race during initialisation

The application MUST account for updates occurring while initial data is loading.

A naive sequence of:

1. fetch snapshot;
2. then subscribe;

MAY lose changes between those operations.

Approved solutions MAY include:

- subscribe then snapshot with version reconciliation;
- snapshot cursor then subscribe from cursor;
- transactional version boundary;
- refetch after subscription establishment.

The chosen Pattern MUST be documented.

---

## 2.83 State Management relationship

Realtime messages MUST update canonical client state deliberately.

Components MUST NOT each maintain independent copies of the same realtime entity.

Server/cache state SHOULD remain in the approved data/state layer.

Realtime events SHOULD:

- update/invalidate cached authoritative data;
- update ephemeral realtime state;
- trigger reconciliation.

A realtime event MUST NOT become a parallel unsynchronised database inside component local state.

---

## 2.84 Event invalidation versus payload replication

The architecture SHOULD choose deliberately between:

- sending complete changed payload;
- sending delta;
- sending resource invalidation.

Invalidation MAY be preferable when:

- authorization is complex;
- payload is large;
- canonical REST/HTTP API already exists;
- consistency matters more than minimum latency.

Full payload events MAY be preferable when:

- low latency matters;
- the payload is small;
- the event contract is stable.

Every feature MUST NOT independently invent this decision.

---

## 2.85 Accessibility

Realtime visual updates MUST follow the Accessibility standard.

A data update MUST NOT automatically steal focus.

Rapid realtime updates MUST NOT create excessive screen-reader announcements.

Only user-relevant status requiring awareness SHOULD use live regions.

Streaming dashboards SHOULD update visually without narrating every incoming event.

---

## 2.86 User-visible connection status

Connection status SHOULD be shown only when it materially affects user action or trust.

A permanently visible "Connected" badge is usually unnecessary.

The UI SHOULD expose connection degradation when:

- updates may be stale;
- sending is blocked;
- work is queued;
- collaboration state is unreliable.

Useful user states MAY include:

- Reconnecting…;
- Offline;
- Changes will sync when reconnected;
- Live updates unavailable.

Technical states such as WebSocket handshake codes SHOULD NOT appear in ordinary user-facing copy.

---

## 2.87 Accessible connection announcements

Connection-status changes SHOULD use polite live-region announcements when the status materially affects the task.

Short transient disconnect/reconnect cycles SHOULD NOT repeatedly announce and create notification fatigue.

Persistent degraded state SHOULD use visible persistent feedback in addition to appropriate accessibility semantics.

An outage MUST NOT be communicated solely by changing an icon colour.

---

## 2.88 Presence accessibility

Presence indicators MUST have textual semantics.

A green dot alone MUST NOT mean "online" without an equivalent text/accessibility label.

Presence lists SHOULD avoid constantly announcing every join/leave event unless the context requires that information.

Typing indicators MAY be exposed accessibly, but rapid changes MUST be throttled to avoid announcement spam.

---

## 2.89 Feedback & Status relationship

Connection health MUST use the canonical Feedback & Status system.

Transient reconnect attempts SHOULD NOT produce one toast per attempt.

Persistent connection degradation SHOULD use:

- inline status;
- banner;
- connection indicator;

according to scope.

A toast MAY acknowledge restoration if the user would otherwise remain uncertain.

---

## 2.90 shadcn/ui relationship

shadcn/ui MUST provide the UI Component baseline for realtime-facing interfaces.

Applicable Components MAY include:

- Alert;
- Badge;
- Toast;
- Progress;
- Skeleton;
- Tooltip;
- Scroll Area;
- Avatar;
- Button.

shadcn/ui MUST NOT determine the transport architecture.

The connection layer MUST remain independent of presentation Components.

---

## 2.91 Design Tokens relationship

Visual realtime state MUST resolve to canonical semantic tokens.

The realtime layer MUST NOT invent colours for:

- online;
- offline;
- warning;
- failure;
- reconnecting.

Existing status semantics SHOULD be reused.

Presence-specific colour tokens MAY be introduced only where needed and MUST remain accessible without colour alone.

---

## 2.92 Forms & Validation relationship

Realtime validation MUST NOT replace canonical server or form validation.

Collaborative field updates SHOULD still use authoritative validation rules.

A remote collaborator changing a value MUST NOT bypass Forms & Validation constraints.

Realtime conflict messages SHOULD identify the affected field or record where appropriate.

---

## 2.93 API relationship

Realtime APIs MUST follow the API standard for:

- naming;
- versioning;
- authentication;
- authorization;
- schemas;
- error semantics;
- identifiers.

The realtime protocol SHOULD reuse canonical domain resource identifiers.

Realtime messages MUST NOT redefine domain states differently from REST/RPC APIs.

Where both realtime and request/response APIs expose the same resource, their semantics MUST agree.

---

## 2.94 Data & Database relationship

Realtime events MUST reflect authoritative data semantics.

A database commit, transaction, asynchronous job, and client notification MAY occur at different times.

The protocol MUST define when an event is emitted relative to persistence.

A client MUST NOT receive **saved** or equivalent state before the persistence guarantee required by the domain has been satisfied.

CDC/database notifications MUST NOT automatically be exposed directly as public realtime API contracts.

---

## 2.95 Transactional publication

When realtime publication must correspond reliably to a database transaction, an approved Pattern such as a transactional outbox SHOULD be used.

The application MUST avoid the dual-write failure mode:

1. database commit succeeds;
2. realtime publish fails permanently.

or:

1. realtime publish succeeds;
2. database transaction rolls back.

Consumers SHOULD remain able to recover through authoritative state even if a live event is temporarily missed.

---

## 2.96 Jobs & Queue relationship

Realtime delivery MAY communicate queue/job progress, but the realtime layer MUST NOT become the authoritative job system.

Job status MUST remain queryable from the canonical Jobs/API layer when the domain requires durable status.

A missed `job.completed` realtime event MUST NOT make the completed job undiscoverable.

---

## 2.97 Infrastructure timeouts

Infrastructure MUST be configured intentionally for long-lived connections.

Relevant components include:

- load balancers;
- proxies;
- ingress;
- CDNs;
- API gateways;
- application servers.

Idle timeout and maximum connection lifetime MUST be known.

Heartbeat/liveness configuration MUST be compatible with those values.

Default infrastructure timeouts MUST NOT be assumed safe.

---

## 2.98 Deployment and draining

Deployments MUST account for long-lived connections.

Instance termination SHOULD enter a draining phase.

Clients MUST tolerate disconnects caused by routine deployment.

Rolling deployment MUST NOT generate a persistent reconnect storm.

Graceful close signals MAY be used to encourage clients to reconnect elsewhere.

---

## 2.99 Capacity planning

Realtime capacity MUST consider more than request rate.

Capacity planning SHOULD include:

- concurrent connections;
- connection establishment rate;
- reconnect burst rate;
- messages/second;
- bytes/second;
- subscriptions;
- fan-out factor;
- outbound queue memory;
- broker load;
- TLS handshake cost.

Maximum connection count alone is not a sufficient capacity metric.

---

## 2.100 Connection limits

Infrastructure MUST impose bounded connection limits.

Limits SHOULD exist at appropriate levels such as:

- instance;
- cluster;
- tenant;
- user;
- IP where useful.

Exhaustion behaviour MUST fail predictably.

One abusive tenant MUST NOT consume all available connections.

---

## 2.101 Fan-out cost

The architecture MUST consider amplification.

One published event sent to 100,000 subscribers represents substantially more work than one event entering the system.

Capacity and rate limits SHOULD consider outbound fan-out separately from inbound event rate.

Expensive broad subscriptions SHOULD be constrained where appropriate.

---

## 2.102 Regional architecture

Multi-region realtime systems MUST explicitly define:

- connection routing;
- event propagation;
- ordering scope;
- failover;
- presence aggregation;
- data residency.

Global ordering MUST NOT be promised unless the underlying system genuinely provides it.

Regional failover MUST include client reconnect and state-reconciliation behaviour.

---

## 2.103 Observable connection health

Production realtime systems MUST expose observable health.

Metrics SHOULD include, where applicable:

- active connections;
- connection attempts;
- successful connections;
- failed handshakes;
- disconnects;
- abnormal disconnects;
- reconnects;
- connection duration;
- authentication failures;
- authorization failures.

Metrics SHOULD distinguish transport and application failures.

---

## 2.104 Message metrics

Realtime services SHOULD measure:

- inbound messages;
- outbound messages;
- bytes;
- validation failures;
- rejected messages;
- rate-limit events;
- replay count;
- duplicate count where tracked;
- subscription count;
- fan-out count.

High-cardinality user or connection identifiers MUST NOT be metric labels.

---

## 2.105 Backpressure metrics

The service SHOULD expose signals such as:

- outbound queue depth;
- client buffered amount where observable;
- slow-consumer disconnects;
- dropped/coalesced ephemeral events;
- broker backlog;
- processing latency.

Backpressure MUST become visible before memory exhaustion occurs.

---

## 2.106 Liveness metrics

Operations SHOULD be able to determine:

- last message;
- last successful heartbeat;
- heartbeat latency where measured;
- stale connections;
- reconnect frequency.

A process being alive MUST NOT be the only realtime health signal.

---

## 2.107 Realtime freshness

Realtime systems SHOULD define a freshness or end-to-end delivery-latency SLI when timely delivery materially affects product correctness.

Useful measurements MAY include:

**client-visible time − source event time**

or:

**gateway-send time − authoritative commit time**

depending on the system boundary.

The SLI MUST match the consumer requirement.

---

## 2.108 Realtime SLOs

Critical realtime features SHOULD define SLOs for relevant dimensions such as:

- connection establishment success;
- event delivery latency;
- reconnect recovery;
- availability;
- message loss/recovery.

Presence and typing SHOULD NOT necessarily receive the same reliability target as durable business events.

SLOs MUST reflect event class.

---

## 2.109 Logging

Realtime services MUST produce structured logs appropriate to diagnosis.

Useful events include:

- connection establishment;
- close;
- protocol violation;
- authentication failure;
- authorization failure;
- rate limiting;
- abnormal termination.

Logs MUST NOT record complete message payloads by default.

Logs MUST NOT expose:

- access tokens;
- session IDs;
- secrets;
- prohibited personal data.

Connection IDs MAY be used for correlation where they are non-secret and controlled for cardinality/retention.

---

## 2.110 Tracing

Distributed tracing SHOULD propagate through realtime publication and handling when it materially improves diagnosis.

Trace relationships MAY connect:

- originating API transaction;
- broker publication;
- realtime gateway;
- downstream processing.

Trace metadata MUST NOT contain sensitive message payloads.

Long-lived connection spans SHOULD be designed carefully to avoid unusable tracing volume.

---

## 2.111 Alerting

Alerts SHOULD identify user-impacting realtime degradation.

Useful alert conditions MAY include:

- high handshake failure rate;
- abnormal disconnect spike;
- reconnect storm;
- authentication anomaly;
- fan-out lag;
- growing outbound queues;
- broker backlog;
- excessive slow consumers;
- delivery-latency SLO breach.

Individual client disconnects MUST NOT generate operational alerts.

Alerts MUST remain actionable.

---

## 2.112 Health endpoints

Service health endpoints SHOULD distinguish:

- process liveness;
- readiness for new realtime connections;
- dependency health where needed.

A gateway SHOULD stop receiving new connections when it cannot safely serve them.

Readiness failure MUST NOT necessarily terminate every existing healthy connection immediately.

---

## 2.113 Graceful overload

When realtime infrastructure approaches capacity, it SHOULD degrade deliberately.

Possible responses include:

- reject new low-priority connections;
- reduce subscription scope;
- coalesce ephemeral updates;
- apply stricter rate limits;
- shed low-priority events.

Critical durable data MUST retain a recovery path.

The system MUST NOT continue accumulating unbounded memory until process failure.

---

## 2.114 Testing

Realtime systems MUST test more than the happy-path open connection.

Tests SHOULD cover:

- initial connection failure;
- mid-session disconnect;
- rapid reconnect failure;
- network transition;
- browser sleep/wake;
- expired authentication;
- logout;
- permission revocation;
- missed events;
- duplicate events;
- out-of-order events;
- sequence gap;
- replay;
- backpressure;
- oversized messages;
- rate limiting;
- slow consumers;
- server restart;
- deployment draining.

---

## 2.115 Scale testing

Material realtime systems SHOULD test:

- concurrent connection scale;
- reconnect storms;
- fan-out amplification;
- broker saturation;
- heartbeat load;
- TLS establishment;
- slow-consumer behaviour.

Steady-state throughput testing alone is insufficient.

---

## 2.116 Security testing

Realtime security testing MUST include, where applicable:

- unauthorized connection;
- invalid origin;
- Cross-Site WebSocket Hijacking attempts;
- expired credentials;
- token revocation;
- unauthorized subscription;
- unauthorized message action;
- malformed message;
- oversized message;
- message flood.

A normal API security assessment MUST NOT assume the persistent connection path is covered automatically.

---

## 2.117 Accessibility testing

Realtime UI testing SHOULD verify:

- focus stability;
- connection-status announcements;
- presence semantics;
- typing indicator behaviour;
- high-frequency update suppression;
- offline/reconnect feedback.

Screen readers MUST NOT be flooded by routine background realtime traffic.

---

## 2.118 Operator-facing UI

Realtime operational consoles SHOULD expose useful status such as:

- active connections;
- disconnect rate;
- reconnect rate;
- broker/fan-out health;
- lag;
- slow consumers;
- regional health.

shadcn/ui SHOULD provide the UI Component baseline.

Operator dashboards MUST follow Tables & Data Grid, Feedback & Status, Accessibility, and Design Tokens standards.

Administrative disconnect or session-revocation actions MUST follow Security and destructive-action Patterns.

---

## 2.119 Exceptions

A deviation from this standard MUST document:

- affected realtime feature;
- transport;
- rule being deviated from;
- reliability impact;
- delivery semantics;
- Security impact;
- recovery behaviour;
- observability impact.

Repeated transport-specific exceptions SHOULD trigger platform review rather than permanent feature-local workarounds.

---

# 3. Anti-patterns

The following are non-conformant unless explicitly covered by an approved exception.

## 3.1 WebSocket by default

Every feature uses WebSocket merely because it needs occasional server updates.

## 3.2 Realtime for static data

A persistent connection is maintained for data that could be fetched on navigation or refreshed occasionally.

## 3.3 One socket per component

Individual React components independently open connections to the same backend service.

## 3.4 Boolean connection model

Complex reconnect/auth/offline state is represented solely by `isConnected`.

## 3.5 Immediate reconnect loop

A disconnected client retries continuously with no backoff.

## 3.6 Deterministic reconnect storm

Every client reconnects at exactly 1, 2, 4, 8 seconds with no jitter.

## 3.7 False recovery reset

A connection that survives 50 milliseconds resets retry backoff before immediately failing again.

## 3.8 Heartbeat equals presence

A user is marked "active" simply because their network connection responds.

## 3.9 Disconnect-only presence

A user remains online indefinitely because the process crashed before emitting a disconnect handler.

## 3.10 Keystroke flooding

Every keypress produces a typing-status message.

## 3.11 Draft leakage

Typing indicators contain actual draft-message content.

## 3.12 Connection-order assumption

Events are assumed globally ordered because WebSocket uses TCP.

## 3.13 Reconnect without reconciliation

The UI reconnects and assumes it now has complete current state.

## 3.14 SSE means exactly once

`Last-Event-ID` is treated as proof that every event was processed exactly once.

## 3.15 Socket send equals persistence

The UI marks data saved because `socket.send()` succeeded.

## 3.16 ACK ambiguity

A message has an `ack` response, but nobody has defined whether that means received, persisted, processed, or delivered.

## 3.17 New retry ID

Every retry receives a new message ID, preventing server deduplication.

## 3.18 Client-side subscription security

All tenant events are pushed to every connected browser and unauthorized records are filtered in JavaScript.

## 3.19 Sticky-session state

Critical subscription state exists only in the memory of the node to which a client is pinned.

## 3.20 Pub/sub equals durable

A non-durable pub/sub system is assumed to preserve events through outages.

## 3.21 Durable broker for cursor spam

Every pointer movement is written to a costly durable event log without a requirement.

## 3.22 Unlimited WebSocket buffer

The client continues calling `send()` regardless of growing unsent `bufferedAmount`.

## 3.23 Infinite slow-consumer queue

A server buffers every outgoing event indefinitely for a client that cannot receive fast enough.

## 3.24 Every intermediate state

Replaceable high-frequency cursor or presence states are queued rather than coalesced.

## 3.25 Payload megabytes

Large files are base64 encoded inside ordinary realtime JSON messages.

## 3.26 Connection equals authorization

Once authenticated, the socket is permitted to perform arbitrary actions without per-resource checks.

## 3.27 Query-string bearer token

A normal long-lived API access token is placed directly into a WebSocket or SSE URL where infrastructure may log it.

## 3.28 Connect forever

A socket remains authorised indefinitely after the underlying session or token expires.

## 3.29 Client-only logout

The browser disconnects on logout, but an already-open stolen or secondary connection remains valid server-side.

## 3.30 Trusting Origin as authentication

A connection is accepted as trusted solely because its Origin header appears correct.

## 3.31 Raw exception message

Internal exceptions are sent directly through the realtime protocol.

## 3.32 Unbounded offline queue

Offline user actions accumulate indefinitely in browser storage.

## 3.33 Replay without reauthorization

Operations queued yesterday are replayed today using permissions assumed from yesterday.

## 3.34 Blind last-write-wins

Collaborative conflicts are overwritten because implementing concurrency control was inconvenient.

## 3.35 Snapshot-then-subscribe gap

Initial state is fetched before subscribing with no mechanism to recover changes that occurred between the two.

## 3.36 Component-local realtime database

Every component accumulates its own independently updated copy of shared server state.

## 3.37 Toast every reconnect

Every brief disconnect and reconnect creates user notifications.

## 3.38 Green-dot-only presence

Presence is communicated only through colour.

## 3.39 Screen-reader event firehose

Every realtime event is placed in an `aria-live` region.

## 3.40 Process-alive health

The realtime service is considered healthy solely because its process responds to a health request.

## 3.41 Connection-count-only monitoring

Operational dashboards track active sockets but not disconnects, lag, buffers, fan-out, or delivery latency.

## 3.42 No deploy drain

Rolling deployment abruptly drops every connection simultaneously.

## 3.43 Unlimited tenant connections

One customer can exhaust the realtime gateway for all other customers.

## 3.44 Hidden dual write

Database state and realtime publish are independent writes with no recovery when only one succeeds.

## 3.45 Missed completion equals lost job

A user never discovers that an export completed because they missed its realtime completion event.

---

# 4. Checklist

A realtime implementation conforms to this standard only when the following can be answered **yes** where applicable.

### Transport

- [ ] The realtime requirement is explicit.
- [ ] SSE, WebSocket, or ordinary HTTP was selected intentionally.
- [ ] SSE is preferred where server-to-client streaming is sufficient.
- [ ] WebSocket is used only where bidirectional communication provides real value.
- [ ] Production transport uses TLS.
- [ ] Protocol/version compatibility is defined.

### Connection lifecycle

- [ ] Connection state is richer than a single Boolean where needed.
- [ ] One canonical layer owns connection lifecycle.
- [ ] Duplicate feature-local connections are avoided.
- [ ] Connection attempts have timeouts.
- [ ] Unexpected disconnect triggers appropriate reconnect.
- [ ] Terminal auth/protocol failures do not retry indefinitely.
- [ ] Deployments support graceful draining.

### Reconnection

- [ ] Reconnect uses bounded exponential backoff.
- [ ] Jitter prevents synchronized client recovery.
- [ ] Backoff does not reset after an unrealistically brief connection.
- [ ] Prolonged outage reduces retry pressure appropriately.
- [ ] Reconnect performs state reconciliation.

### Heartbeats and liveness

- [ ] The connection has a defined liveness strategy.
- [ ] Heartbeat timing accounts for infrastructure idle timeouts.
- [ ] WebSocket Ping/Pong is used appropriately where supported.
- [ ] SSE keepalive exists where intermediary idle termination is relevant.
- [ ] Missing liveness eventually marks the connection unhealthy.
- [ ] Heartbeats are not misrepresented as human presence.

### Presence

- [ ] Presence states have explicit meanings.
- [ ] Presence uses TTL/lease semantics.
- [ ] Multiple devices/tabs are accounted for.
- [ ] One closed connection does not incorrectly mark a multi-device user offline.
- [ ] Presence respects authorization and privacy.
- [ ] Retention follows data policy.

### Typing and ephemeral state

- [ ] Typing events are throttled.
- [ ] Typing state expires automatically.
- [ ] Draft content is not transmitted.
- [ ] High-frequency ephemeral events are coalesced where appropriate.
- [ ] Ephemeral state is not unnecessarily stored durably.

### Ordering

- [ ] Required ordering scope is defined.
- [ ] Sequence numbers exist where gaps/order matter.
- [ ] Clients can detect relevant gaps.
- [ ] Out-of-order events have defined handling.
- [ ] Reconnect/replay does not assume transport ordering is enough.

### Delivery

- [ ] Every important message class has defined delivery semantics.
- [ ] Duplicate delivery is tolerated where necessary.
- [ ] Material events have stable event IDs where required.
- [ ] Any ACK has explicitly defined meaning.
- [ ] "Exactly once" is not claimed from transport semantics alone.
- [ ] Retryable client operations preserve their logical operation IDs.

### Resume and replay

- [ ] SSE event IDs are used where resume is required.
- [ ] WebSocket has an application resume strategy where required.
- [ ] Event retention supports the promised replay window.
- [ ] Clients fall back to authoritative resynchronisation when replay is unavailable.
- [ ] Snapshot/stream initialisation cannot silently lose events.

### Subscription model

- [ ] Subscription scope is explicit.
- [ ] Subscriptions are authorised server-side.
- [ ] Subscription establishment can report rejection.
- [ ] Valid subscriptions are restored after reconnect.
- [ ] Logout/permission changes invalidate affected subscriptions.
- [ ] Server subscription state is cleaned up after disconnect.

### Scaling and fan-out

- [ ] Fan-out works across multiple application instances.
- [ ] Durable business state does not live solely in gateway memory.
- [ ] Sticky sessions are not required for correctness.
- [ ] Broker semantics are documented.
- [ ] Durable and ephemeral event classes use suitable infrastructure.
- [ ] Fan-out amplification is included in capacity planning.

### Backpressure

- [ ] Per-connection queues are bounded.
- [ ] Slow consumers cannot create unlimited memory growth.
- [ ] WebSocket unsent output is bounded/observed where relevant.
- [ ] Coalescing/drop policies distinguish ephemeral from durable messages.
- [ ] Durable events have a recovery path if the live connection cannot keep up.

### Rate control

- [ ] Connection count is bounded.
- [ ] Message rate is bounded.
- [ ] Subscription count is bounded where necessary.
- [ ] Message payload size is bounded.
- [ ] Abuse by one user/tenant cannot exhaust the whole platform.
- [ ] File transfer is not embedded in normal realtime JSON without a justified protocol.

### Authentication

- [ ] The transport is not equated with authenticated state.
- [ ] Browser auth constraints are explicitly handled.
- [ ] Cookie-authenticated WebSockets validate allowed Origin.
- [ ] Long-lived bearer tokens are not casually placed in URLs.
- [ ] Unauthenticated connections are tightly limited.
- [ ] Business events are not delivered before authentication completes.

### Token lifecycle

- [ ] Token/session expiration affects long-lived connections.
- [ ] Refresh/re-authentication behaviour is defined.
- [ ] Reconnect restores subscriptions safely after refresh.
- [ ] Logout invalidates realtime access promptly.
- [ ] Permission revocation does not depend on client cooperation.

### Authorization and validation

- [ ] Each privileged message is authorised server-side.
- [ ] Each protected subscription is authorised server-side.
- [ ] Messages are schema validated.
- [ ] Payload size limits are enforced.
- [ ] Malformed traffic cannot destabilise the service.
- [ ] Raw backend exceptions are not exposed.

### Offline

- [ ] Offline behaviour is defined.
- [ ] Queued operations are safe to replay.
- [ ] Offline queue size and retention are bounded.
- [ ] Sensitive offline storage has Security approval.
- [ ] Queued operations preserve required logical order.
- [ ] Replay re-authorises each operation.
- [ ] Conflicts have a defined resolution policy.

### State Management

- [ ] Realtime updates feed a canonical state/cache layer.
- [ ] Components do not maintain unsynchronised entity copies.
- [ ] Reconnect verifies state freshness.
- [ ] Optimistic state remains distinct from authoritative state.
- [ ] Event invalidation versus payload delivery is an intentional architectural decision.

### API and Data

- [ ] Realtime resource semantics match canonical APIs.
- [ ] Public event contracts do not expose raw database internals accidentally.
- [ ] Event publication timing relative to persistence is defined.
- [ ] Realtime publication cannot silently diverge from committed data.
- [ ] Durable state remains queryable even if a live event is missed.

### Accessibility and UX

- [ ] Brief disconnects do not create notification spam.
- [ ] Persistent degraded connectivity becomes visible when it affects the user.
- [ ] Connection state is not communicated through colour alone.
- [ ] Presence has textual/accessibility semantics.
- [ ] High-frequency events do not flood live regions.
- [ ] Realtime updates do not steal focus.
- [ ] shadcn/ui Components and canonical Feedback Patterns are used for presentation.

### Infrastructure

- [ ] Proxy/load-balancer/CDN connection timeouts are known.
- [ ] Heartbeat configuration is compatible with infrastructure.
- [ ] Deployments drain connections gracefully.
- [ ] Reconnect storms have been considered.
- [ ] Regional routing/failover semantics are documented where applicable.

### Observability

- [ ] Active connection count is measured.
- [ ] Connection success/failure is measured.
- [ ] Abnormal disconnects are measured.
- [ ] Reconnect rate is measured.
- [ ] Message/byte throughput is measured where useful.
- [ ] Fan-out load is observable.
- [ ] Queue/backpressure state is observable.
- [ ] Liveness/heartbeat health is observable.
- [ ] Delivery/freshness SLI exists where realtime latency is material.
- [ ] Metrics avoid uncontrolled cardinality.
- [ ] Logs exclude tokens and sensitive message contents.

### Testing

- [ ] Disconnect/reconnect is tested.
- [ ] Network transitions are tested.
- [ ] Sleep/wake behaviour is tested.
- [ ] Credential expiry and logout are tested.
- [ ] Duplicate and out-of-order messages are tested.
- [ ] Replay/gap recovery is tested.
- [ ] Slow consumer and backpressure behaviour is tested.
- [ ] Reconnect storms are load tested where material.
- [ ] Authorization and origin attacks are tested.
- [ ] Accessibility of realtime status is tested.

---

# 5. Canonical summary

Realtime architecture MUST separate **transport connectivity, application delivery semantics, authoritative state, and user-visible status**.

**SSE SHOULD be preferred for server-to-client event streams when bidirectional socket communication is unnecessary. WebSocket SHOULD be used when genuine low-latency bidirectional communication is required. Ordinary HTTP remains the correct solution when persistent connectivity provides no material value.**

**Production realtime traffic MUST use encrypted transport.**

**Connection lifecycle MUST have one canonical owner. Feature components MUST NOT independently build competing socket lifecycles.**

**Unexpected disconnects SHOULD reconnect automatically using bounded exponential backoff with jitter. Clients MUST NOT generate synchronized reconnect storms.**

**Reconnect does not prove state correctness. Every reconnect requiring consistent state MUST resume, replay, version-check, or refetch authoritative state.**

**Long-lived connections MUST use a deliberate heartbeat/liveness strategy compatible with proxy, load-balancer, and application timeouts.**

**Transport heartbeat MUST NOT be confused with human presence. Presence MUST use explicit semantics, TTL expiry, multi-device aggregation, privacy controls, and authorization.**

**Typing and other high-frequency collaborative indicators MUST be ephemeral, throttled, privacy-safe, and automatically expiring.**

**Transport ordering applies only within its actual transport boundary. Applications requiring ordering across reconnects, producers, partitions, or fan-out MUST define sequence semantics explicitly.**

**Realtime delivery MUST have defined guarantees. Duplicate events MUST be expected unless the protocol proves otherwise. Stable event IDs, versioning, idempotency, and reconciliation SHOULD be preferred to vague exactly-once claims.**

**An acknowledgement MUST define exactly what it acknowledges: receipt, acceptance, persistence, processing, delivery, or another stage.**

**SSE event IDs and Last-Event-ID MAY support resume, but they MUST NOT be interpreted as exactly-once processing. WebSocket resume semantics MUST be explicitly implemented when required.**

**Subscription authorization MUST happen server-side. Clients MUST NOT receive restricted data and filter it locally.**

**Horizontally scaled fan-out MUST work independently of which gateway instance owns the client connection. Durable business state MUST NOT live only in gateway memory.**

**Realtime systems MUST have bounded queues and explicit backpressure. Slow consumers MUST NOT create unlimited memory growth.**

**The classic browser WebSocket API does not provide automatic backpressure; implementations MUST bound sending, receiving, and fan-out queues deliberately.**

**High-frequency replaceable state SHOULD be coalesced. Durable ordered business events MUST NOT be dropped using the same policy.**

**Connections, messages, subscriptions, and payload size MUST be rate controlled. One client or tenant MUST NOT be able to exhaust the realtime platform.**

**A connection MUST NOT be treated as permanently authenticated. Token/session expiry, refresh, logout, and revocation MUST affect long-lived connections.**

**Browser WebSocket endpoints using cookie authentication MUST defend against Cross-Site WebSocket Hijacking with explicit Origin validation in addition to normal authentication and authorization.**

**Long-lived bearer credentials SHOULD NOT be placed in ordinary socket or SSE URLs.**

**Every privileged realtime action and subscription MUST be authorised server-side at the appropriate resource scope.**

**Offline buffering MUST be limited to replay-safe operations, bounded in size and lifetime, protected according to data sensitivity, and re-authorised when replayed.**

**The UI MUST reconcile offline and reconnect conflicts according to canonical concurrency rules. Blind last-write-wins MUST NOT be the default for consequential data.**

**Realtime updates MUST flow through canonical State Management rather than creating independent component-local copies of authoritative resources.**

**Database commit, realtime publication, and client receipt are different stages. The UI MUST NOT equate event receipt with persistence unless the protocol explicitly guarantees that meaning.**

**Where database mutation and event publication must remain reliable together, an approved transactional publication Pattern such as an outbox SHOULD be used.**

**Realtime messages are delivery accelerators, not the sole durable record. Important state MUST remain discoverable through the canonical API/data layer if a client misses an event.**

**Connection-health UX MUST follow Feedback & Status and Accessibility standards. Brief reconnects SHOULD remain quiet; persistent stale/offline state MUST become visible when it affects user trust or action.**

**Realtime status MUST NOT rely on colour alone, steal focus, or flood assistive technologies with high-frequency updates.**

**shadcn/ui provides the visual Component baseline for realtime-facing UI; it does not define transport architecture.**

**Operational health MUST measure connection success, disconnects, reconnects, message flow, fan-out, backpressure, liveness, and delivery latency—not merely process liveness or active socket count.**

The Gold Standard is achieved when realtime functionality can **disconnect, reconnect, resume, scale horizontally, withstand slow consumers, refresh credentials, operate across temporary offline periods, and recover authoritative state without message ambiguity, unauthorized delivery, unbounded buffering, or user-visible inconsistency.**

The transport assumptions above align with the current standards: SSE remains a one-way `EventSource` stream with native event IDs/reconnect controls, while WebSocket is full duplex; the classic browser `WebSocket` API still has no automatic backpressure and exposes `bufferedAmount` for queued outgoing bytes. citeturn668464search1turn217224search2turn217224search0 RFC 6455 defines Ping/Pong and Origin handling, and current OWASP guidance specifically recommends secure `wss://`, explicit Origin validation, per-message authorization, session expiry handling, connection/message limits, and heartbeat cleanup for browser WebSockets. citeturn668464search2turn668464search0
