---
id: "offline-sync"
title: "Offline-first & Sync"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["engineering", "offline", "first", "sync"]
applies_to: ["data"]
related: ["concurrency"]
legacy_number: 81
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 81080
provenance: baseline

---

The governing distinction is that **local persistence, synchronization, and server authority are separate concerns**. A local write can be durable on the device without yet being globally accepted; the UX and data model must preserve that distinction.

# Offline-first & Sync Guidelines — Gold Standard 2026

**Canonical placement:** State Management → Offline & Sync → Data & Database → Realtime  
**Status:** Canonical  
**Applies to:** Web applications, PWAs, native/mobile applications, desktop clients, field applications, collaborative applications, intermittently connected systems, local caches, client databases, queued mutations, realtime clients, and any product expected to remain materially usable when connectivity is absent or unreliable  
**Component baseline:** shadcn/ui  
**Normative terms:** MUST, MUST NOT, SHOULD, SHOULD NOT, MAY

---

# 1. Purpose

## 1.1 Objective

This standard defines the canonical architecture, data model, synchronization protocol, conflict model, security controls, user experience, storage lifecycle, and testing requirements for offline-first and local-first applications.

It covers:

1. local-first data modeling;
2. local databases;
3. local and remote authority;
4. client-generated identifiers;
5. mutation journals;
6. client outboxes;
7. sync queues;
8. push and pull synchronization;
9. acknowledgements;
10. retries;
11. idempotency;
12. optimistic writes;
13. rollback and rejection;
14. conflict detection;
15. last-write-wins;
16. field/domain merges;
17. CRDTs;
18. tombstones and deletion;
19. realtime integration;
20. multi-tab/device concurrency;
21. offline authorization;
22. storage quotas;
23. eviction;
24. persistence guarantees;
25. encryption at rest;
26. logout and device loss;
27. attachment synchronization;
28. sync-state UX;
29. accessibility;
30. observability; and
31. testing under unreliable networks.

The objective is to ensure that users can continue working under unreliable connectivity **without silently losing work, violating business invariants, exposing sensitive information, or misrepresenting local state as globally committed state**.

## 1.2 Terminology

This standard distinguishes:

### Offline-capable

An application can still open or provide some useful functionality without network access.

### Offline-first

Core supported workflows are deliberately designed to function without immediate server connectivity, with later synchronization.

### Local-first

The user's active working state is represented locally first, with synchronization used to converge that state with other devices or remote systems.

Local-first does **not** automatically mean that the device has final business authority.

A payment, inventory allocation, permission change, or regulated approval MAY still require server authorization before becoming globally valid.

## 1.3 Core principle

The canonical model is:

```text
User intent
    ↓
Local transaction
    ├── local entity state
    └── durable mutation/outbox entry
              ↓
        immediate local UI
              ↓
       synchronization
              ↓
 server validation + commit
              ↓
       acknowledgement
              ↓
 local reconciliation
```

A UI MUST distinguish:

```text
stored locally
```

from:

```text
accepted by authoritative server
```

where that distinction affects user expectations or business validity.

## 1.4 Source-of-truth principle

Each synchronized entity MUST define where final authority resides.

Possible models include:

| Model | Meaning |
|---|---|
| Server-authoritative | Local state is a working copy; server validates final state |
| Local-authoritative | Device-generated state is authoritative and replicated remotely |
| Multi-writer convergent | Several peers can independently author updates under defined merge semantics |
| Hybrid | Authority differs by field or operation |

The application MUST NOT use the vague statement:

```text
local and server are both the source of truth
```

without defining conflict and convergence semantics.

## 1.5 Offline mutation policy

Every mutation category MUST declare one of:

```text
offline allowed
offline allowed with later validation
offline draft only
online required
```

Examples:

| Operation | Typical policy |
|---|---|
| Edit personal note | Offline allowed |
| Draft report | Offline allowed |
| Update customer profile | Offline allowed with version validation |
| Upload attachment | Local staging + later upload |
| Financial transfer | Usually online required |
| Permission elevation | Online required |
| Inventory confirmation | Usually server validation required |
| Form draft | Offline allowed |
| Publish regulated submission | Usually online required |

The product MUST NOT imply that every operation should become offline-writeable merely because a local database exists.

## 1.6 Platform reality

Web storage is subject to browser-specific quotas and eviction behavior. Browser-origin storage is normally best-effort unless persistent storage is granted, and storage pressure can evict site data. Applications can inspect approximate usage through the Storage API but MUST NOT assume unlimited or permanent browser storage. citeturn827735search0

Background Synchronization can assist web applications with deferred synchronization, but it is not supported uniformly across widely used browsers. It MUST therefore be treated as an optimization rather than the only synchronization mechanism. citeturn827735search1

## 1.7 Relationship to other standards

This standard MUST be implemented consistently with:

- **Security:** authentication, device security, data classification, local encryption, key management, least privilege, tenant isolation, session termination, and compromised-device assumptions;
- **Data & Database:** schemas, migrations, stable identifiers, transactions, constraints, timestamps, tombstones, retention, lineage, and versioning;
- **API:** idempotency, conflict responses, version tokens, batch mutation, pagination/cursors, retry semantics, errors, and authentication;
- **Concurrency & Consistency:** optimistic locking, idempotency, race conditions, ordering, retries, eventual consistency, and conflict semantics;
- **State Management:** canonical server state, local state, optimistic state, mutation state, stale data, cancellation, reconciliation, and cache ownership;
- **Forms & Validation:** draft persistence, validation, dirty state, conflicts, preservation of user input, and submission semantics;
- **Accessibility:** sync-state announcements, offline warnings, conflict flows, status labels, keyboard access, and focus;
- **Design Tokens:** pending, synced, failed, conflict, stale, offline, storage-warning, and progress states;
- **Component standards:** Alert, Badge, Spinner, Progress, Button, Dialog, AlertDialog, Sheet, Table, Data Table, Skeleton, Empty, Tooltip, and Form primitives;
- **Pattern standards:** loading/error states, forms, tables, notifications, settings, destructive actions, and recovery;
- **Realtime:** subscriptions, reconnect, event ordering, missed-event recovery, and stream cursors.

---

# 2. Rules

## 2.1 Define offline scope explicitly

Every product claiming offline support MUST define:

```text
which screens load offline
which records are cached
which writes are allowed
how long data may remain offline
what requires online validation
how conflicts are resolved
what happens under storage pressure
what happens on logout
```

"Works offline" MUST NOT be used as a blanket claim when only static shell assets are cached.

---

## 2.2 Local database as working state

Offline-first applications SHOULD use a structured local database for material application data.

For web applications, IndexedDB is the canonical browser baseline for structured offline data because it provides asynchronous indexed object storage and transactional operations. citeturn827735search3

`localStorage` SHOULD NOT be used as the primary database for substantial offline application state.

It MAY be used for small non-sensitive preferences.

---

## 2.3 Local schema

The local database SHOULD contain explicit entities rather than opaque copies of rendered screens or API payloads.

A synchronized record SHOULD commonly contain:

```text
id
tenant_id
data
local_version
server_version
sync_state
updated_locally_at
server_updated_at
deleted/tombstone state
```

where relevant.

---

## 2.4 Sync metadata is data

Synchronization metadata MUST be modeled explicitly.

It MUST NOT be inferred solely from UI state.

Useful fields MAY include:

```text
sync_state
base_version
server_version
local_revision
last_sync_at
last_sync_error
pending_mutation_count
```

---

## 2.5 Client-generated identifiers

Entities that may be created offline MUST receive stable identifiers before server synchronization.

Identifiers SHOULD be globally collision-resistant.

Suitable approaches include:

```text
UUID
ULID
equivalent globally unique ID
```

The server SHOULD preserve the client-generated ID where the domain permits.

If the server replaces the identifier, reconciliation MUST update all local references atomically.

---

## 2.6 Do not depend on online ID allocation

This pattern is prohibited for offline creation:

```text
POST resource
wait for integer ID
then create local resource
```

if creation is expected to work offline.

Offline-capable entity identity MUST be available locally.

---

## 2.7 Local atomic write

A user mutation MUST update:

```text
local working data
+
durable pending mutation
```

within one local transaction where supported.

Unsafe:

```text
update local object
then later enqueue sync request
```

A crash between those operations could leave a local change with no path to synchronization.

---

## 2.8 Client outbox

Offline mutations SHOULD be represented through a durable client outbox or operation journal.

A canonical mutation record SHOULD contain:

```text
mutation_id
tenant_id
actor_id
entity_type
entity_id
operation
base_version
payload/delta
created_at
attempt_count
state
```

It MAY additionally include:

```text
dependency_ids
idempotency_key
schema_version
last_error
```

---

## 2.9 Mutation identity

Every logical mutation MUST have a stable identifier.

Retrying the same logical mutation MUST reuse that identity.

A retry MUST NOT generate a new mutation ID when doing so could duplicate server-side effects.

---

## 2.10 Mutation states

A local outbox entry SHOULD progress through explicit states such as:

```text
pending
sending
acknowledged
rejected
conflicted
retry_wait
```

`pending` MUST NOT be represented as server-confirmed success.

---

## 2.11 Queue durability

The sync queue MUST survive:

```text
application restart
tab close where platform persistence permits
process termination
temporary network loss
device sleep
```

for workflows advertised as durable offline writes.

An in-memory queue alone is insufficient.

---

## 2.12 Local commit before optimistic success

The application MAY immediately render a local mutation as successful-looking working state only after the local data and required queue entry have been durably committed.

If local persistence itself fails, the product MUST NOT pretend the edit has been saved.

---

## 2.13 Local save language

Where server synchronization remains pending, copy SHOULD distinguish local persistence.

Preferred:

```text
Saved on this device
```

or:

```text
Saved offline
We'll sync your changes when you're back online.
```

Avoid:

```text
Saved
```

when users reasonably interpret that to mean authoritative remote persistence.

---

## 2.14 Sync loop

Synchronization SHOULD have one canonical coordinator.

A typical cycle is:

```text
establish authenticated connectivity
        ↓
retrieve remote changes
        ↓
apply remote changes transactionally
        ↓
evaluate conflicts
        ↓
send pending local mutations
        ↓
process per-mutation acknowledgement
        ↓
reconcile local state
        ↓
advance sync cursor
```

The exact order MAY vary according to protocol, but MUST be documented.

---

## 2.15 Single sync ownership

A client SHOULD avoid several independent sync loops mutating the same local queue concurrently.

The implementation SHOULD coordinate:

- foreground tab;
- service worker;
- background worker;
- multiple windows;
- native background task

through a lock, lease, ownership election, or equivalent safe mechanism.

---

## 2.16 Cross-tab coordination

Web applications supporting multiple tabs MUST consider concurrent access to the same IndexedDB/outbox state.

Coordination MAY use:

```text
database transactions
BroadcastChannel
Web Locks API
service-worker mediation
```

or equivalent mechanisms.

Correctness MUST NOT depend on users opening only one tab.

---

## 2.17 Network status is advisory

Browser/device network indicators MUST be treated as hints.

A device can report:

```text
online
```

while the required API is unreachable.

The application SHOULD infer usable connectivity from actual request outcomes.

---

## 2.18 Background sync is optional acceleration

Web applications MAY use Service Workers and Background Synchronization to send deferred operations after connectivity returns. Service workers are specifically intended to support offline request handling and related background capabilities. citeturn827735search4turn827735search8

However, because Background Sync has limited browser availability, the application MUST also synchronize when appropriate through:

```text
app launch
app resume
connectivity recovery
foreground retry
explicit user retry
```

citeturn827735search1

---

## 2.19 Do not require the app to remain open

If a product claims that a supported offline operation is durably queued, closing the visible UI MUST NOT discard the mutation.

The implementation MUST either:

- persist it for later sync; or
- clearly inform the user that leaving will lose unsent work.

---

## 2.20 Push synchronization

A mutation push API SHOULD accept stable mutation identifiers and be idempotent.

A batch request MAY conceptually contain:

```text
client_id
sync_session_id
mutations[]
```

Each mutation SHOULD receive an independent acknowledgement.

---

## 2.21 Per-mutation acknowledgement

Batch synchronization SHOULD NOT collapse all outcomes into one Boolean success value.

The server SHOULD identify for each mutation:

```text
accepted
already_applied
conflict
rejected
retryable_failure
```

along with safe version/reconciliation metadata.

---

## 2.22 Partial batch success

If some mutations succeed and others fail, the local client MUST only remove/acknowledge the successful mutations.

It MUST NOT replay already-committed mutations as new operations.

---

## 2.23 Server idempotency

The server MUST deduplicate retried mutations using the stable mutation ID, idempotency key, or equivalent durable identity where duplicate side effects matter.

Offline synchronization inherently creates retry ambiguity.

---

## 2.24 Request timeout ambiguity

A timed-out sync call MUST NOT be treated as proof that the server rejected the mutation.

The client MUST retry using the same logical operation identity or reconcile status.

---

## 2.25 Pull synchronization

Remote changes SHOULD be retrieved incrementally.

Suitable mechanisms include:

```text
server cursor
change sequence
version watermark
event stream offset
```

The cursor contract MUST be opaque to clients unless its semantics are deliberately public.

---

## 2.26 Cursor advancement

A pull cursor MUST only advance after the corresponding remote changes are durably applied locally.

Unsafe:

```text
receive page
save cursor
crash before saving records
```

This can permanently skip data.

---

## 2.27 Cursor repeat safety

Applying the same pull page more than once SHOULD be safe.

Remote change ingestion MUST therefore be idempotent or version-aware.

---

## 2.28 Full resynchronization

The protocol MUST define a path for recovering from:

```text
lost cursor
corrupt local database
expired change history
schema incompatibility
server reset
```

A full resync MUST preserve unsynced local changes or explicitly reconcile them before replacing local state.

---

## 2.29 Never wipe pending mutations during refresh

A "refresh", "resync", cache reset, or remote snapshot replacement MUST NOT destroy unsynchronized user changes.

Pending local work MUST be extracted, reconciled, or safely replayed.

---

## 2.30 Remote state versions

Server-authoritative synchronized entities SHOULD carry a server version or revision.

Examples:

```text
version = 37
etag = "..."
revision_id = "..."
```

This version SHOULD form the base for conflict detection.

---

## 2.31 Do not use device wall clock as conflict authority

Device timestamps MUST NOT normally determine which write wins.

Client clocks may be:

- incorrect;
- manually changed;
- unsynchronized;
- in different timezones.

Conflict ordering SHOULD use trusted versions, logical ordering, server commit order, or a defined convergence algorithm.

---

## 2.32 Base version

An offline mutation that depends on prior remote state SHOULD record the version from which it was derived.

Example:

```text
base_version = 17
```

When the server has moved to version 20, the system can determine that the mutation was authored against stale state.

---

## 2.33 Conflict is a domain concept

A concurrency conflict exists when two valid histories cannot both be applied without a domain decision.

Not every concurrent change is a conflict.

Example:

```text
User A changes phone number.
User B changes preferred language.
```

These MAY merge automatically.

Example:

```text
User A sets quantity = 10.
User B sets quantity = 15.
```

This MAY require a domain rule.

---

## 2.34 Conflict strategy must be explicit

Each synchronized entity or field MUST declare its conflict strategy.

Canonical strategies include:

```text
server wins
client wins
last-write-wins
field merge
operation merge
domain merge
CRDT
manual resolution
reject and reload
```

A generic global "merge automatically" policy MUST NOT be applied blindly.

---

## 2.35 Last-write-wins

LWW MAY be used when overwriting concurrent values is acceptable by domain design.

Suitable examples MAY include:

```text
theme preference
last viewed layout
low-risk display preference
```

LWW SHOULD NOT be the default for:

```text
financial values
inventory
approvals
permissions
regulated records
substantial authored text
```

where silent data loss matters.

---

## 2.36 LWW ordering source

If LWW is used, the meaning of "last" MUST be defined.

Preferred ordering includes:

```text
server commit sequence
trusted logical timestamp
hybrid logical clock under a defined protocol
```

Untrusted device wall-clock time SHOULD NOT determine LWW.

---

## 2.37 Field-level merge

Field-level merge MAY automatically combine non-overlapping changes.

For example:

```text
base:
name = A
phone = 1

device:
phone = 2

server:
name = B
```

can potentially produce:

```text
name = B
phone = 2
```

if those fields are independent.

The merge engine MUST know the base state.

---

## 2.38 Three-way merge

Structured collaborative edits SHOULD consider three-way merge:

```text
base
local
remote
```

Comparing only:

```text
local
remote
```

often cannot determine whether one side actually changed a field.

---

## 2.39 Domain merge

Domain-specific merge SHOULD be preferred where business semantics are richer than field replacement.

Examples:

```text
append comment
add quantity
add tag
mark checklist item complete
reserve unit
```

should often be modeled as operations rather than replacement of a full object.

---

## 2.40 Operation-based local state

Where possible, synchronization SHOULD preserve user intent as operations.

Preferred:

```text
add tag "urgent"
```

instead of:

```text
replace tags with ["urgent", "finance"]
```

when concurrent additions should coexist.

Semantic operations improve merge behavior.

---

## 2.41 CRDT use

CRDTs MAY be used for genuinely multi-writer collaborative state requiring automatic deterministic convergence.

Appropriate candidates include:

```text
collaborative text
shared sets
presence-independent collaborative documents
distributed counters
```

depending on the selected CRDT.

CRDTs MUST NOT be adopted merely because the application has offline support.

---

## 2.42 CRDT limitations

CRDTs do not automatically solve:

- authorization;
- business invariants;
- semantic conflicts;
- data validation;
- storage growth;
- history retention;
- schema evolution;
- undo semantics.

A CRDT design MUST document these separately.

---

## 2.43 CRDT metadata

CRDT metadata growth MUST be measured.

Compaction or garbage collection MUST preserve convergence guarantees.

Tombstone cleanup MUST NOT occur before the protocol can prove that removed state is no longer required by another replica.

---

## 2.44 Manual conflict resolution

Manual conflict resolution SHOULD be used when:

- automatic merging could cause material data loss;
- the domain decision requires human judgment;
- regulatory meaning matters;
- two versions modify the same significant content.

The UI MUST preserve both versions until resolution is complete.

---

## 2.45 Conflict UX

Conflict copy SHOULD explain:

1. what changed;
2. what work remains safe;
3. what choice is required.

Preferred:

```text
This record changed on another device

Your offline edits are still available.
Review both versions before choosing what to keep.

[Review changes]
```

Avoid:

```text
Sync conflict 409
```

---

## 2.46 Conflict comparison

A conflict-resolution interface SHOULD show:

```text
your changes
current server version
```

and MAY show:

```text
common base
```

where useful.

The interface SHOULD highlight actual differing fields rather than requiring users to compare whole records manually.

---

## 2.47 Conflict resolution is itself a mutation

The user's resolution MUST generate a new authoritative mutation.

It MUST NOT merely delete the conflict flag while leaving ambiguous data.

---

## 2.48 Conflict record durability

Unresolved conflicts MUST survive:

```text
restart
offline session
navigation
sync retry
```

until resolved, superseded, or intentionally discarded.

---

## 2.49 Deletion requires tombstones

Synchronized deletion SHOULD use tombstones or equivalent durable deletion markers rather than immediate absence.

A remote replica that has not seen the delete must not later resurrect the record.

---

## 2.50 Tombstone schema

A tombstone SHOULD preserve sufficient information such as:

```text
entity_id
deleted_at
deletion_version
tenant_id
```

without retaining unnecessary deleted content.

---

## 2.51 Tombstone retention

Tombstones MUST remain available long enough for the synchronization protocol to prevent stale replicas from resurrecting deleted data.

The protocol MUST define what happens to clients returning after tombstone history has expired.

A full resynchronization MAY be required.

---

## 2.52 Privacy deletion

Tombstones MUST NOT become a mechanism for retaining deleted personal content indefinitely.

They SHOULD contain identifiers and minimum synchronization metadata only.

Privacy/retention policy governs their lifecycle.

---

## 2.53 Restore semantics

If deleted entities can be restored, restore MUST be modeled as an explicit operation/version.

Removing the tombstone locally without server reconciliation is insufficient.

---

## 2.54 Optimistic UI

Offline-first applications SHOULD use optimistic rendering where the local operation is valid enough to display immediately.

The UI SHOULD update from the local authoritative working database rather than separately maintaining a second optimistic copy where practical.

---

## 2.55 Optimistic state categories

The local state SHOULD distinguish:

```text
synced
pending
syncing
conflicted
rejected
failed_retryable
```

A record displayed optimistically MUST remain traceable to its mutation state.

---

## 2.56 Server rejection

A queued offline mutation MAY later be rejected because of:

```text
authorization change
validation change
business conflict
deleted resource
expired workflow
server policy change
```

The client MUST have a defined rejection path.

---

## 2.57 Rejection must not silently discard work

If user-authored content is rejected, the application SHOULD preserve the user's work when safe.

For example:

```text
Couldn't sync this draft

Your changes are still stored on this device.

[Review]
[Try again]
```

The product MUST NOT silently reset to server state.

---

## 2.58 Rollback

Automatic rollback MAY be appropriate for simple reversible optimistic state.

Example:

```text
star item
toggle low-risk preference
```

For substantial authored data, preserving a failed local version is usually preferable to automatic disappearance.

---

## 2.59 Authorization can expire offline

Cached permissions MUST NOT be assumed indefinitely valid.

On synchronization, the server MUST re-authorize each protected mutation according to current policy.

Offline status MUST NOT grant additional authority.

---

## 2.60 Privileged offline operations

Security-sensitive operations SHOULD require current server authorization.

Examples include:

```text
role elevation
account deletion
key rotation
financial transfer
release approval
access-policy change
```

If offline entry is useful, it MAY be saved as a local draft without being represented as executed.

---

## 2.61 Authentication expiry

An expired session MUST NOT cause local unsynced user work to be discarded.

The client SHOULD:

```text
pause protected synchronization
retain encrypted local queue where permitted
request reauthentication
resume after authorization
```

---

## 2.62 Logout

Logout behavior MUST define what happens to:

```text
local entity cache
pending mutations
attachments
encryption keys
search indexes
authentication data
```

Sensitive local data SHOULD be removed or rendered cryptographically inaccessible according to product policy.

---

## 2.63 Unsynced data at logout

If logout would destroy unsynchronized user work, the product MUST warn the user unless policy requires immediate secure deletion.

Example:

```text
You have changes that haven't synced

Signing out will remove them from this device.

[Keep working]
[Sign out and remove changes]
```

Security policy MAY require deletion without preservation on shared/high-risk devices.

---

## 2.64 User and tenant partitioning

Local data MUST be scoped by authenticated user and tenant where applicable.

A user switching organizations or accounts MUST NOT see another context's cached data.

Local indexes, queues, attachments, and search data MUST follow the same boundary.

---

## 2.65 Shared-device assumptions

Products expected to run on shared or managed devices MUST define stronger local-data controls.

These MAY include:

```text
shorter local retention
mandatory device encryption
application lock
remote wipe
no offline sensitive data
```

depending on risk.

---

## 2.66 Encryption at rest

Sensitive offline data MUST receive at-rest protection appropriate to the platform and threat model.

Native/mobile applications SHOULD use platform cryptographic APIs and protected key storage rather than custom cryptography. OWASP recommends encrypting sensitive local data, using platform cryptographic APIs, and using hardware-backed key storage when available. citeturn827735search6

---

## 2.67 Key storage

Encryption keys MUST NOT be stored alongside ciphertext in a way that provides no meaningful separation.

Native clients SHOULD use platform facilities such as protected keystores/keychains where available.

Key lifecycle MUST define:

```text
creation
unlock
rotation
logout
account removal
device loss
```

---

## 2.68 Web encryption limitations

Browser-side encryption MAY reduce exposure from raw disk inspection, but it MUST NOT be presented as protection against arbitrary same-origin script execution when the application can also access the decryption key.

An XSS-capable attacker executing with application privileges may be able to access local plaintext or keys.

Web offline security therefore still depends strongly on:

```text
XSS prevention
CSP
dependency security
authentication
device/session security
```

---

## 2.69 Device loss

Sensitive offline-capable products MUST define the lost-device threat model.

Controls MAY include:

```text
OS/device encryption
short local retention
application reauthentication
remote account revocation
key deletion
MDM remote wipe
```

A remotely revoked session does not instantly erase data from a disconnected device.

This limitation MUST be understood by Security.

---

## 2.70 Local sensitive-data minimization

Offline storage MUST follow data minimization.

A client SHOULD download only data required for expected offline work.

"Cache the entire customer database" MUST NOT be the default strategy.

---

## 2.71 Offline dataset selection

Data available offline SHOULD be explicitly scoped.

Suitable strategies include:

```text
recent records
assigned records
favourites
user-selected offline packs
specific workspace
time-bounded data
```

The product SHOULD let users understand what is and is not available offline where relevant.

---

## 2.72 Browser storage is not guaranteed permanent

Browser data can be subject to quota limits and eviction. Best-effort data may be deleted under storage pressure, and quotas vary by browser. Applications MUST detect and handle quota failures rather than assuming writes always succeed. citeturn827735search0

---

## 2.73 Storage estimation

Web applications with substantial offline storage SHOULD monitor approximate usage using available storage-estimation APIs.

Storage thresholds SHOULD trigger controlled cleanup before hard failure.

The estimate MUST NOT be assumed perfectly precise.

---

## 2.74 Persistent browser storage

A web application containing critical unsynchronized local-only work SHOULD consider requesting persistent storage where supported.

However, product design MUST still account for:

```text
user clearing site data
private browsing
browser/device reset
application uninstall
storage corruption
```

Persistent browser storage is not a backup.

---

## 2.75 Storage priority

Local records SHOULD be assigned an eviction priority.

Canonical priority:

```text
1. unsynced user-authored data
2. unresolved conflict data
3. required offline working set
4. recently synchronized records
5. replaceable remote cache
6. derived/search/cache artifacts
```

The application MUST evict replaceable data before unsynchronized user work.

---

## 2.76 Unsynced work eviction

Application-managed eviction MUST NOT discard unsynchronized user-authored data without explicit user consent or a documented security requirement.

If storage cannot continue, the application MUST enter a blocking recovery state before accepting further unsafe edits.

---

## 2.77 Storage-full UX

Preferred:

```text
Device storage is nearly full

We can't safely save more offline changes.
Connect to sync your work or free some device storage.

[Sync now]
```

The application MUST NOT continue accepting edits that it cannot durably persist.

---

## 2.78 Quota errors

Local database writes MUST handle quota errors.

A quota failure MUST be treated as a save failure, not as successful local persistence.

Browser storage APIs can raise quota-exceeded errors when storage limits are reached. citeturn827735search0

---

## 2.79 Evict caches transactionally

Application-driven cache cleanup SHOULD avoid leaving dependent records partially removed.

Derived indexes SHOULD be rebuildable.

Primary unsynced records MUST NOT depend on an evictable cache for reconstruction.

---

## 2.80 Private browsing

Applications SHOULD assume private/incognito browser storage may have different retention behavior and can be removed at session end. citeturn827735search7

Critical offline workflows SHOULD warn or limit capability where durability cannot meet the product contract.

---

## 2.81 Schema migrations

Local database schema migrations MUST be versioned.

Migrations MUST account for devices returning after long periods offline.

A device MAY skip several application/database versions.

---

## 2.82 Migration durability

A local migration MUST NOT destroy pending mutations.

Migration procedures SHOULD:

```text
backup/retain mutation journal
migrate local entities
migrate queue schema
validate
resume sync
```

where platform capabilities permit.

---

## 2.83 Incompatible clients

The server SHOULD define how old clients are treated when their sync protocol or schema is no longer supported.

Responses SHOULD use a stable error such as:

```text
SYNC_PROTOCOL_UNSUPPORTED
CLIENT_UPGRADE_REQUIRED
```

rather than accepting data that cannot be interpreted safely.

---

## 2.84 Mutation schema version

Outbox entries SHOULD record their schema/protocol version.

This allows new clients to migrate pending operations created by older versions.

---

## 2.85 Offline data validation

The client SHOULD perform known validation offline where practical.

The server MUST still perform authoritative validation on synchronization.

Client validation can become stale.

---

## 2.86 Validation rule change

If server validation changes while a client is offline, queued mutations MAY be rejected.

The UI MUST preserve recoverable user input and explain what needs correction.

---

## 2.87 Realtime integration

Realtime updates MUST flow through the same reconciliation/local-store layer as sync.

A WebSocket/SSE callback SHOULD NOT mutate an unrelated parallel UI state model that bypasses version/conflict logic.

---

## 2.88 Realtime is not sync completeness

A realtime connection does not prove that no events were missed.

After reconnection, the client SHOULD resume from a durable cursor or perform a catch-up pull.

---

## 2.89 Realtime ordering

Realtime events SHOULD carry server version/order metadata where sequencing matters.

An event older than the local known server version MUST NOT overwrite newer state.

---

## 2.90 Push notification is a hint

Mobile/web push MAY trigger refresh.

A push notification MUST NOT be treated as the complete authoritative dataset.

The application SHOULD fetch/reconcile actual server state.

---

## 2.91 Attachments

Large attachments SHOULD use a separate staged synchronization model from small structured mutations.

A local attachment record SHOULD include:

```text
local_attachment_id
entity_id
local_uri/blob reference
size
content_type
checksum where useful
upload_state
remote_id
```

---

## 2.92 Attachment storage

Large binary files SHOULD NOT be embedded repeatedly inside ordinary mutation journal rows.

Use appropriate blob/file storage for the platform.

Metadata and upload queue entries should reference the staged file.

---

## 2.93 Attachment durability

The product MUST NOT claim an attachment is saved offline until its local file has been durably stored.

A temporary in-memory object URL is not durable storage.

---

## 2.94 Attachment upload

Large uploads SHOULD support resumability when network reliability and file size justify it.

Restarting a 2 GB upload from zero after every interruption SHOULD NOT be the default design.

---

## 2.95 Attachment deletion

Local attachment cleanup MUST consider pending uploads and unresolved mutations.

Application cache cleanup MUST NOT delete the only remaining copy of an unsynced attachment.

---

## 2.96 Dependency ordering

Mutations MAY have dependencies.

Example:

```text
create local report
then attach image to that report
```

The attachment mutation MUST NOT be sent before the server can resolve the report identity if the protocol requires that dependency.

Dependencies SHOULD be explicit rather than inferred from insertion order.

---

## 2.97 Queue ordering

Global FIFO order SHOULD NOT be required unless the domain needs it.

Ordering SHOULD normally be scoped to an entity or dependency chain.

Independent entity mutations MAY synchronize concurrently.

---

## 2.98 Queue compaction

Pending operations MAY be compacted when semantics are provably equivalent.

Example:

```text
set title A
set title B
```

may become:

```text
set title B
```

if no intermediate state matters.

Operations such as:

```text
charge
send message
append comment
increment
```

MUST NOT be collapsed unless the domain semantics explicitly allow it.

---

## 2.99 Retry classification

Sync failures MUST distinguish:

```text
transient network failure
server rate limit
authentication required
authorization rejected
validation rejected
version conflict
permanent missing resource
protocol incompatibility
```

Only transient failures SHOULD auto-retry indefinitely within bounded operational policy.

---

## 2.100 Backoff

Automatic synchronization retry SHOULD use bounded exponential backoff with jitter.

If the server supplies `Retry-After`, the client SHOULD honor it.

Tight retry loops MUST NOT drain battery or overload the API during outages.

---

## 2.101 Retry while offline

A client SHOULD NOT continuously retry network requests while there is clear evidence of no connectivity.

It SHOULD remain queued and retry after a meaningful connectivity/app lifecycle signal or backoff expiry.

---

## 2.102 Battery and metered networks

Native/mobile applications MAY adapt background synchronization according to:

```text
battery state
metered network
roaming
large upload size
OS background policy
```

but MUST preserve pending work.

Policy SHOULD distinguish delay from deletion.

---

## 2.103 Sync cancellation

Users MAY be allowed to cancel large transfers.

Cancellation MUST define whether it:

```text
pauses transfer
removes pending mutation
discards local work
```

These are different actions.

A generic "Cancel" MUST NOT silently delete unsynced work.

---

## 2.104 Manual sync

A manual:

```text
Sync now
```

action MAY be provided when users benefit from explicit control.

It SHOULD trigger synchronization but MUST NOT be required for normal convergence if automatic sync is available.

---

## 2.105 Sync state model

The application SHOULD represent sync state explicitly.

Canonical states include:

```text
online_synced
online_syncing
offline_synced
offline_pending
retrying
conflict
sync_failed
authentication_required
storage_warning
```

A single:

```text
isOffline
```

Boolean is insufficient for substantial offline-first applications.

---

## 2.106 Global versus local sync state

Global connectivity state and entity sync state MUST remain distinct.

Example:

```text
Device online
Record failed to sync
```

is valid.

Likewise:

```text
Device offline
No pending changes
```

is valid.

---

## 2.107 Connectivity banner

A global offline `Alert` SHOULD appear only when connectivity materially affects the product.

Preferred:

```text
You're offline

You can keep working. Changes will sync when your connection returns.
```

Do not repeatedly toast every failed network request.

---

## 2.108 Pending sync indicator

Pending local writes SHOULD be visible when users need assurance about durability or synchronization.

Suitable patterns include:

```text
Badge: 3 changes pending
Spinner + Syncing
Last synced 10:42 AM
```

The detail level SHOULD match the workflow risk.

---

## 2.109 Do not show permanent noise

Low-risk consumer applications MAY keep sync status subtle when synchronization normally succeeds.

High-consequence field, enterprise, healthcare, or operational applications SHOULD expose more explicit status.

The presence of offline architecture does not require a permanent giant "ONLINE" badge.

---

## 2.110 Record-level status

When one record can fail independently, status SHOULD remain near that record.

Examples:

```text
Pending sync
Sync failed
Conflict
```

A global banner alone is insufficient for a persistent single-record failure.

---

## 2.111 Sync completion

The product SHOULD announce synchronization completion only when that information materially helps the user.

Avoid repeated:

```text
Synced!
Synced!
Synced!
```

toasts for routine background operations.

---

## 2.112 Failed sync

Preferred:

```text
We couldn't sync this change

Your work is still saved on this device.
We'll try again automatically.

[Try now]
```

For permanent rejection:

```text
This change can't be synced

The record changed while you were offline.
Review the conflict to continue.

[Review]
```

---

## 2.113 Stale remote data

If a local record may be materially stale, the UI SHOULD show its last known synchronization time.

Example:

```text
Last synced 2 days ago
```

Staleness indicators SHOULD be specific rather than:

```text
Data may be old
```

where exact information is available.

---

## 2.114 Sync progress

Determinate `Progress` SHOULD be used only when meaningful completion can be measured, such as:

```text
14 of 20 files uploaded
```

Indeterminate `Spinner` SHOULD be used for short unknown-duration synchronization.

shadcn/ui currently provides dedicated `Progress` and `Spinner` primitives, including labelled progress and spinner states. citeturn309659search0turn309659search6

---

## 2.115 shadcn/ui component baseline

The canonical mapping is:

| Sync UX need | shadcn/ui baseline |
|---|---|
| Offline/degraded state | `Alert` |
| Entity sync state | `Badge` |
| Active sync | `Spinner` |
| Measurable transfer | `Progress` |
| Retry/recovery | `Button` |
| Conflict resolution | `Dialog`, `Sheet` |
| Consequential discard | `AlertDialog` |
| Queue/debug administration | `Table`, `Data Table` |
| Loading local dataset | `Skeleton` |
| Empty offline dataset | `Empty` |
| Sync details | `Sheet`, `ScrollArea` |

shadcn/ui's current component catalogue includes these primitives. citeturn309659search5

---

## 2.116 Accessible sync status

Important sync-state changes SHOULD use a polite accessible status announcement.

Good candidates include:

```text
You're offline
Changes saved on this device
Sync failed
Conflict requires review
Back online
All changes synced
```

Routine internal retries MUST NOT each be announced.

---

## 2.117 Focus

Connectivity changes MUST NOT steal focus.

Background sync completion MUST NOT move focus.

Opening a conflict-resolution Dialog/Sheet through explicit user action SHOULD follow normal focus-management rules.

---

## 2.118 Status is not color

`pending`, `synced`, `failed`, and `conflict` MUST include text or equivalent programmatic meaning.

A yellow dot alone is insufficient.

---

## 2.119 Motion

Spinners and progress animation MUST follow the Accessibility and motion standards.

Reduced-motion preferences SHOULD reduce decorative sync animation without removing status information.

---

## 2.120 Form drafts

Forms expected to survive offline navigation or interruption SHOULD persist drafts according to domain requirements.

Draft persistence MUST preserve:

```text
values
version/base state
validation-relevant metadata
```

where needed for later reconciliation.

---

## 2.121 Sensitive form fields

Sensitive form fields SHOULD NOT automatically persist locally merely because the rest of the form does.

Examples include:

```text
password
OTP
private key
payment credential
```

Local draft policy MUST be field-aware.

---

## 2.122 Validation display

Client-side validation MAY occur offline.

Server validation errors received later MUST map back to the corresponding local values and MUST NOT erase them automatically.

---

## 2.123 Multi-step forms

Offline-capable multi-step workflows SHOULD checkpoint progress locally.

A completed local step MUST NOT automatically be labelled globally submitted until authoritative submission succeeds.

---

## 2.124 Server-side business invariants

Offline-first architecture MUST NOT weaken authoritative invariants.

The server remains responsible for constraints such as:

```text
unique identifier
inventory availability
permission
financial balance
workflow eligibility
```

unless the domain explicitly assigns authority differently.

---

## 2.125 Reconciliation over force

When queued local intent conflicts with an authoritative server invariant, the client SHOULD enter conflict/rejection handling.

It MUST NOT repeatedly force-write until accepted.

---

## 2.126 Rebase

A client MAY rebase a queued mutation onto newer server state when:

- operation semantics are understood;
- transformation is deterministic;
- business rules permit it.

Rebasing MUST create auditable/reconstructable mutation state for significant operations.

---

## 2.127 Sync auditability

High-risk offline operations SHOULD preserve enough metadata to establish:

```text
when user authored the operation
when device queued it
when server received it
when server accepted/rejected it
```

These timestamps represent different events and MUST NOT be conflated.

---

## 2.128 Offline audit events

Security-relevant client actions MAY be queued for audit forwarding.

A client-generated audit event MUST NOT be considered sufficient proof of authoritative server-side success.

The server SHOULD generate its own authoritative audit record when it commits the protected operation.

---

## 2.129 Privacy retention

Synced local records SHOULD be removed from devices when they no longer need to remain available offline.

Offline caches MUST have retention rules.

The user's device MUST NOT become an indefinite secondary archive merely because cleanup was never implemented.

---

## 2.130 Cache freshness

Cached remote data SHOULD carry freshness metadata where age matters.

The product SHOULD define:

```text
fresh
stale but usable
expired/unusable
```

rather than using one arbitrary TTL for every entity.

---

## 2.131 Offline expiry

Some data MUST become unavailable offline after a defined period for security, regulatory, or correctness reasons.

Expiry MUST be enforced from trusted metadata rather than simply hiding the UI while plaintext remains accessible.

---

## 2.132 Search indexes

Local offline search indexes are derived data.

They SHOULD be rebuildable.

They MUST follow the same:

```text
tenant scope
retention
encryption
logout cleanup
```

requirements as the underlying records.

---

## 2.133 Service worker caches

Application-shell/API caches managed by Service Workers MUST remain conceptually separate from the local domain database.

The Cache API SHOULD NOT become an accidental substitute for structured domain synchronization.

---

## 2.134 Static asset offline support

Service workers MAY cache the application shell and static assets to allow offline launch. Service workers are designed to mediate network requests and support offline application behavior. citeturn827735search4

Asset cache versioning MUST avoid loading an incompatible application shell against an incompatible local database schema.

---

## 2.135 Application upgrade

A new application version MUST safely coordinate:

```text
code version
local schema version
sync protocol version
service worker version
```

A partial upgrade MUST NOT corrupt pending work.

---

## 2.136 Service-worker update

A newly installed service worker SHOULD NOT delete caches or databases containing pending user mutations as part of generic cache cleanup.

Domain data and replaceable static caches MUST be separated.

---

## 2.137 Observability

Offline/sync systems SHOULD measure:

```text
active offline users
outbox depth
oldest pending mutation age
sync success rate
sync duration
retry rate
conflict rate
permanent rejection rate
full-resync rate
storage usage
quota failures
attachment backlog
```

---

## 2.138 Queue age

The age of the oldest pending mutation SHOULD be monitored.

A small queue with a mutation stuck for seven days may be more serious than a larger queue produced minutes ago.

---

## 2.139 Conflict-rate signal

High conflict rate MAY indicate:

- unsuitable LWW policy;
- excessively coarse records;
- poor entity decomposition;
- missing semantic operations;
- long offline windows;
- inadequate realtime reconciliation.

Conflict telemetry SHOULD feed architecture review.

---

## 2.140 Sync tracing

A sync attempt SHOULD have correlation identifiers capable of linking:

```text
client mutation
sync request
server processing
authoritative mutation
acknowledgement
```

Sensitive data MUST NOT be placed in identifiers.

---

## 2.141 Privacy-preserving telemetry

Sync diagnostics MUST NOT indiscriminately upload full local databases or rejected user content.

Telemetry SHOULD include metadata rather than content where possible.

---

## 2.142 Support diagnostics

User-facing/support diagnostics MAY expose:

```text
last sync time
pending count
client version
local DB version
sync error code
```

They SHOULD NOT expose encryption keys, auth tokens, or sensitive record payloads.

---

## 2.143 Recovery tools

High-value applications SHOULD provide controlled recovery options such as:

```text
Retry sync
Export unsynced work
Reauthenticate
Resolve conflicts
Rebuild downloaded data
```

"Clear all local data" MUST NOT be the first generic troubleshooting instruction when unsynced work exists.

---

## 2.144 Local reset

A local reset operation MUST determine whether pending work exists.

If pending work would be destroyed, the user MUST receive an explicit consequence warning unless security policy mandates immediate erasure.

---

## 2.145 Export unsynced work

Products handling substantial authored content SHOULD consider a safe export/recovery path when synchronization cannot succeed.

Export MUST comply with Security and Privacy requirements.

---

## 2.146 Offline test philosophy

Offline systems MUST be tested as distributed systems.

Testing only:

```text
turn Wi-Fi off
open screen
```

is insufficient.

The test strategy MUST include partial failure, retry ambiguity, ordering, storage failure, and long-disconnected replicas.

---

## 2.147 Offline launch test

The product MUST test launching:

```text
while fully offline
```

rather than only losing connectivity after an online launch.

Required local schema, authentication state, assets, and data must behave according to the product contract.

---

## 2.148 Connectivity-loss test

Tests MUST cover connectivity loss:

```text
before local write
after local write
during upload
after server commit before acknowledgement
during pull
during conflict resolution
```

Each crash/network window MUST have defined recovery.

---

## 2.149 Flapping network

Tests SHOULD repeatedly alternate:

```text
online
offline
online
offline
```

during synchronization.

The queue MUST not:

- duplicate operations;
- lose acknowledgements;
- corrupt cursor state.

---

## 2.150 High-latency testing

The application SHOULD be tested with high latency even when the connection remains technically online.

Slow connectivity can expose:

- duplicate submissions;
- impatient manual retries;
- race conditions;
- misleading online indicators.

---

## 2.151 Packet/error simulation

Tests SHOULD simulate:

```text
timeouts
connection reset
HTTP 429
HTTP 401
HTTP 403
HTTP 409
HTTP 422
HTTP 5xx
```

and verify correct retry/rejection behavior.

---

## 2.152 Crash-window testing

The system SHOULD test crashes at least at:

```text
after local entity write
before outbox write
after outbox write
while sending
after server commit
before local acknowledgement
after local acknowledgement
before queue deletion
```

Atomicity/idempotency should make every point recoverable.

---

## 2.153 Duplicate mutation test

The same mutation MUST be delivered repeatedly in tests.

The final server effect MUST remain correct.

---

## 2.154 Out-of-order acknowledgement test

Where several operations can be in flight, acknowledgements SHOULD be deliberately reordered.

A later acknowledgement MUST NOT cause older state to overwrite a newer local/server version.

---

## 2.155 Concurrent-device test

Tests SHOULD simulate at least two devices editing the same record while one or both are offline.

The expected conflict/merge strategy MUST be asserted.

---

## 2.156 Clock-skew test

Client clocks SHOULD be tested with substantial skew.

Correctness MUST NOT depend on accurate device wall-clock ordering.

---

## 2.157 Long-offline test

Tests SHOULD simulate a client returning after:

```text
days
weeks
multiple schema versions
tombstone retention boundary
```

according to product reality.

---

## 2.158 Storage-quota test

Tests MUST cover local storage failure.

At minimum verify:

```text
quota error detected
edit not falsely marked saved
replaceable cache cleanup attempted if appropriate
user receives recovery guidance
unsynced data remains prioritized
```

---

## 2.159 Eviction test

Web applications SHOULD test behavior when browser-origin storage is removed.

The application MUST recover through safe authentication/resynchronization rather than assuming the local database always exists.

---

## 2.160 Logout test

Tests MUST verify that:

```text
sensitive cache
outbox
attachments
keys
cross-tenant data
```

follow the intended logout policy.

---

## 2.161 Local encryption test

Security tests SHOULD verify:

- protected key storage;
- plaintext absence where encryption is required;
- key invalidation on logout/removal;
- migration/rotation;
- failure when key becomes unavailable.

---

## 2.162 Schema migration test

Tests MUST migrate clients containing:

```text
synced records
pending mutations
conflicts
attachments
```

not only an empty database.

---

## 2.163 Multi-tab test

Web tests SHOULD open multiple tabs and verify:

- one coherent local state;
- no duplicate queue send;
- cross-tab update propagation;
- safe logout;
- safe schema upgrade.

---

## 2.164 Background termination test

Native/mobile and service-worker workflows SHOULD test background task termination.

The sync process MUST resume from durable state rather than depend on an in-memory continuation.

---

## 2.165 Realtime gap test

Tests SHOULD disconnect realtime transport, allow server mutations to occur, then reconnect.

The client MUST catch up through cursor/resync behavior.

---

## 2.166 Security-change test

Tests SHOULD verify a user who loses permission while offline cannot synchronize an operation that current policy rejects.

The local edit MUST enter the defined rejected/recovery state.

---

## 2.167 Delete/resurrection test

Tests MUST verify that a stale offline replica cannot recreate a record that was authoritatively deleted unless restore is explicitly allowed.

---

## 2.168 Property/invariant tests

Sync testing SHOULD assert invariants such as:

```text
no acknowledged mutation remains pending

no mutation is applied twice

unsynced work survives restart

server and clean replica converge

deleted record does not resurrect

tenant A data never appears for tenant B

accepted mutation eventually appears locally
```

---

# 3. Anti-patterns

## 3.1 Cache equals offline-first

**Anti-pattern:** API responses are cached and the product is declared offline-first.

**Rule:** Offline-first workflows require explicit local mutation, durability, reconciliation, and conflict semantics.

---

## 3.2 `localStorage` as application database

**Anti-pattern:** Large structured datasets and mutation queues live in synchronous string storage.

**Rule:** Use a proper structured local persistence layer.

---

## 3.3 In-memory outbox

**Anti-pattern:** Pending operations disappear when the tab/process closes.

**Rule:** Offline mutation queues MUST be durable.

---

## 3.4 Local write then enqueue

**Anti-pattern:**

```text
save local record
later add queue record
```

**Rule:** Local state and required mutation journal entry MUST be atomic where supported.

---

## 3.5 Queue then save local state

**Anti-pattern:** Sync worker sends an operation whose visible local state never committed.

**Rule:** Working state and operation journal MUST share a coherent local transaction boundary.

---

## 3.6 New ID after sync

**Anti-pattern:** Every offline resource is assigned temporary identifiers that cause broken references after sync.

**Rule:** Prefer stable client-generated identity or perform atomic identity reconciliation.

---

## 3.7 New idempotency key per retry

**Anti-pattern:** Connectivity retry is interpreted as a new operation.

**Rule:** Retries preserve logical mutation identity.

---

## 3.8 Timeout means rejected

**Anti-pattern:** Client rolls back because sync response timed out.

**Rule:** Timeout is an uncertain outcome; retry/reconcile idempotently.

---

## 3.9 One global `isOffline`

**Anti-pattern:** One Boolean attempts to describe queue, connectivity, conflicts, and individual record failure.

**Rule:** Sync state MUST be modeled explicitly.

---

## 3.10 `navigator.onLine` as authority

**Anti-pattern:** Requests are assumed to work whenever browser status says online.

**Rule:** Connectivity indicators are hints; actual service reachability is established through requests.

---

## 3.11 Background Sync as required architecture

**Anti-pattern:** Pending work only syncs through Background Sync.

**Rule:** Unsupported browsers and foreground lifecycle paths MUST still converge.

---

## 3.12 Device timestamp LWW

**Anti-pattern:** Whichever device reports the larger wall-clock timestamp wins.

**Rule:** Device clock MUST NOT normally establish conflict authority.

---

## 3.13 LWW for consequential records

**Anti-pattern:** Concurrent regulated, financial, or authored content is silently discarded.

**Rule:** LWW is acceptable only when silent overwrite is a legitimate domain rule.

---

## 3.14 CRDT everywhere

**Anti-pattern:** Every object becomes a CRDT because some users work offline.

**Rule:** CRDT complexity MUST be justified by multi-writer convergence requirements.

---

## 3.15 CRDT as authorization

**Anti-pattern:** A convergent data structure is assumed to make every replica's mutation legitimate.

**Rule:** Security authorization remains separate.

---

## 3.16 Field merge without base

**Anti-pattern:** Local and remote objects are compared with no knowledge of the version both started from.

**Rule:** Reliable three-way merge requires base/local/remote semantics.

---

## 3.17 Sync by replacing whole objects

**Anti-pattern:** Small independent edits continually overwrite entire stale records.

**Rule:** Prefer versioned fields or semantic operations where concurrent merge matters.

---

## 3.18 Delete means absence

**Anti-pattern:** Deleted rows disappear immediately from change history and stale clients later re-upload them.

**Rule:** Synchronization requires tombstones or equivalent deletion history.

---

## 3.19 Eternal tombstones containing PII

**Anti-pattern:** Complete deleted customer objects remain forever "for sync."

**Rule:** Tombstones retain only necessary synchronization metadata and follow retention policy.

---

## 3.20 Refresh clears queue

**Anti-pattern:** "Reload data" fixes sync problems by deleting the local database.

**Rule:** Pending work MUST survive resync or be explicitly recovered first.

---

## 3.21 Server snapshot overwrites local edits

**Anti-pattern:** Pull applies a remote record over pending local modifications without conflict processing.

**Rule:** Reconciliation MUST understand local pending state.

---

## 3.22 Cursor saved before data

**Anti-pattern:** Sync advances its checkpoint before durably applying the associated changes.

**Rule:** Cursor advancement follows local commit.

---

## 3.23 Realtime bypasses local store

**Anti-pattern:** WebSocket updates component state while pull sync updates IndexedDB independently.

**Rule:** All authoritative remote changes SHOULD use one reconciliation path.

---

## 3.24 WebSocket equals reliable history

**Anti-pattern:** Missing socket messages can never be recovered.

**Rule:** Reconnect requires cursor/catch-up/full resync.

---

## 3.25 Offline permission assumed forever

**Anti-pattern:** A queued admin operation succeeds because the user had permission three days earlier.

**Rule:** Server re-authorizes at synchronization.

---

## 3.26 All actions offline

**Anti-pattern:** Security-sensitive operations are queued merely for UX consistency.

**Rule:** Domain policy MUST declare online-required actions.

---

## 3.27 Password cached in draft

**Anti-pattern:** Generic form autosave stores passwords or OTPs locally.

**Rule:** Sensitive fields MUST have specific local persistence policy.

---

## 3.28 Logout leaves cross-user cache

**Anti-pattern:** Next user on a device can see previous tenant/customer data.

**Rule:** Local storage MUST be scoped and cleaned/locked according to session policy.

---

## 3.29 Ciphertext and key together

**Anti-pattern:** Local "encryption" stores a decryption key beside the database with no security separation.

**Rule:** Key management is part of encryption.

---

## 3.30 Browser encryption overclaim

**Anti-pattern:** IndexedDB encryption is described as protecting against XSS while application JavaScript holds the decryption key.

**Rule:** Security claims MUST match the actual threat model.

---

## 3.31 Unlimited local cache

**Anti-pattern:** All synchronized records are kept indefinitely.

**Rule:** Offline datasets require retention and eviction strategy.

---

## 3.32 Evict oldest record blindly

**Anti-pattern:** LRU cleanup deletes the oldest pending mutation.

**Rule:** Eviction priority MUST distinguish irreplaceable unsynced work from replaceable cache.

---

## 3.33 Ignore quota errors

**Anti-pattern:** A failed local write still displays "Saved offline."

**Rule:** Local persistence failures MUST enter explicit error/recovery state.

---

## 3.34 Clear site data as first troubleshooting step

**Anti-pattern:** Support instructs users to wipe storage before checking unsynced work.

**Rule:** Recovery MUST preserve pending user data where possible.

---

## 3.35 Sync spinner forever

**Anti-pattern:** Sync is shown indefinitely with no distinction between slow, offline, rejected, or conflicted state.

**Rule:** Persistent conditions require specific state and recovery.

---

## 3.36 Toast-only sync failure

**Anti-pattern:** A permanent unsynced record failure disappears after five seconds.

**Rule:** Persistent failure MUST remain visible near affected state.

---

## 3.37 "Saved" when only optimistic memory changed

**Anti-pattern:** No durable local write has occurred.

**Rule:** Save language must follow actual durability.

---

## 3.38 "Synced" before acknowledgement

**Anti-pattern:** Request dispatch is treated as server acceptance.

**Rule:** Synced state requires authoritative acknowledgement/reconciliation.

---

## 3.39 Auto-rollback substantial writing

**Anti-pattern:** A long user-authored offline document disappears when server validation rejects it.

**Rule:** Preserve substantial user work for recovery.

---

## 3.40 Hidden conflict

**Anti-pattern:** Merge logic silently chooses one significant version.

**Rule:** Material unresolved conflicts MUST surface.

---

## 3.41 Global queue serialization

**Anti-pattern:** One stuck attachment blocks every independent offline edit.

**Rule:** Ordering SHOULD be scoped to actual dependencies.

---

## 3.42 Unsafe queue compaction

**Anti-pattern:** Several "send message" operations are collapsed because they affect the same entity.

**Rule:** Only semantically replaceable operations may be compacted.

---

## 3.43 Retry storm

**Anti-pattern:** Every pending request retries continuously during an outage.

**Rule:** Retry uses connectivity signals, backoff, and jitter.

---

## 3.44 Service worker deletes domain data

**Anti-pattern:** New service-worker activation wipes all origin storage as "old cache."

**Rule:** Replaceable asset caches and durable user data MUST be separated.

---

## 3.45 Empty-database migration tests

**Anti-pattern:** Schema upgrades are tested only with no local data.

**Rule:** Migrations MUST be tested with pending queues, conflicts, and attachments.

---

## 3.46 Wi-Fi-off test only

**Anti-pattern:** One airplane-mode test is considered full offline QA.

**Rule:** Offline systems require failure-window, duplication, ordering, quota, migration, and long-disconnect testing.

---

# 4. Checklist

## 4.1 Product contract

- [ ] Offline-supported workflows are documented.
- [ ] Online-required workflows are documented.
- [ ] Local-only draft behavior is documented.
- [ ] Final authority is defined per entity/operation.
- [ ] User-facing save/sync semantics are defined.
- [ ] Long-offline behavior is defined.
- [ ] Conflict strategy is defined.

## 4.2 Local data model

- [ ] Structured local database is used where appropriate.
- [ ] Entity identity exists before server sync.
- [ ] Tenant/user scope is explicit.
- [ ] Local and server versions are represented.
- [ ] Sync state is explicit.
- [ ] Tombstone behavior is modeled.
- [ ] Local schema is versioned.

## 4.3 Client outbox

- [ ] Every queued mutation has stable identity.
- [ ] Outbox is durable.
- [ ] Local entity write and outbox insert are atomic.
- [ ] Mutation contains entity and operation.
- [ ] Base version is recorded where needed.
- [ ] Schema version is recorded.
- [ ] Retry state is explicit.
- [ ] Queue survives restart.
- [ ] Queue compaction preserves semantics.

## 4.4 Sync protocol

- [ ] One canonical synchronization coordinator exists.
- [ ] Multiple tabs/workers cannot unsafely duplicate sync.
- [ ] Push is idempotent.
- [ ] Pull is incremental.
- [ ] Cursor only advances after local commit.
- [ ] Repeated pull pages are safe.
- [ ] Per-mutation acknowledgements exist.
- [ ] Partial success is supported.
- [ ] Full-resync path exists.
- [ ] Full resync preserves pending work.

## 4.5 Retry and failure

- [ ] Timeout is treated as uncertain outcome.
- [ ] Same mutation identity is reused on retry.
- [ ] Retryable errors are classified.
- [ ] Permanent rejection is distinct from transient failure.
- [ ] Backoff is bounded.
- [ ] Jitter is used.
- [ ] `Retry-After` is honored.
- [ ] Authentication expiry pauses rather than deletes work.

## 4.6 Conflict detection

- [ ] Server version/revision exists where needed.
- [ ] Mutation records base version.
- [ ] Client wall clock is not authoritative ordering.
- [ ] Concurrent changes are detected deterministically.
- [ ] Conflict state survives restart.
- [ ] Conflict resolution generates a new mutation.

## 4.7 Conflict resolution

- [ ] LWW is only used where silent overwrite is acceptable.
- [ ] Meaning of "last" is defined.
- [ ] Field merge uses base/local/remote where appropriate.
- [ ] Domain operations are used where they improve merge.
- [ ] Manual resolution preserves both versions.
- [ ] CRDT use is justified.
- [ ] CRDT metadata/garbage collection is governed.
- [ ] Business invariants remain server/domain enforced.

## 4.8 Deletes

- [ ] Delete produces tombstone/equivalent.
- [ ] Stale replicas cannot resurrect deleted data.
- [ ] Tombstone retention is defined.
- [ ] Expired clients receive full-resync behavior.
- [ ] Tombstones minimize retained PII.
- [ ] Restore is explicit.

## 4.9 Optimistic UX

- [ ] Optimistic display follows durable local write.
- [ ] Local save and server sync are distinguishable.
- [ ] Pending state is traceable.
- [ ] Failure rolls back or preserves work.
- [ ] Server normalization is reconciled.
- [ ] Permanent rejection remains visible.
- [ ] Conflict UI preserves user input.

## 4.10 Security

- [ ] Local data is classified.
- [ ] Sensitive offline data is minimized.
- [ ] Current server authorization is checked at sync.
- [ ] Privileged operations require online authorization where appropriate.
- [ ] User and tenant local stores are separated.
- [ ] Shared-device policy exists.
- [ ] Logout policy covers cache/outbox/files/keys.
- [ ] Unsynced data at logout has explicit policy.

## 4.11 Encryption

- [ ] Sensitive local storage uses approved platform protection.
- [ ] Keys are separated from data appropriately.
- [ ] Hardware-backed/native key storage is used where appropriate.
- [ ] Key rotation is defined.
- [ ] Logout/account removal key behavior is defined.
- [ ] Browser encryption claims match its threat model.
- [ ] XSS/CSP/dependency security is addressed.
- [ ] Device-loss assumptions are documented.

## 4.12 Storage and eviction

- [ ] Browser/mobile storage limits are considered.
- [ ] Storage usage is monitored where material.
- [ ] Quota errors are handled.
- [ ] Replaceable data has eviction policy.
- [ ] Unsynced work has highest retention priority.
- [ ] Conflict data is protected from routine eviction.
- [ ] Persistent browser storage is considered where useful.
- [ ] Persistent storage is not treated as backup.
- [ ] Private/incognito behavior is considered.
- [ ] Storage-full UX prevents unsafe further edits.

## 4.13 Attachments

- [ ] Attachment files are durably staged.
- [ ] Binary data is separate from ordinary queue records.
- [ ] Upload state is explicit.
- [ ] Resumable transfer is used where justified.
- [ ] Pending files are not evicted.
- [ ] Checksums/integrity are used where required.
- [ ] Dependency on newly created entities is explicit.

## 4.14 Realtime

- [ ] Realtime events reconcile through local store.
- [ ] Realtime messages include versions/order where required.
- [ ] Reconnect uses catch-up cursor/resync.
- [ ] Realtime transport is not treated as complete history.
- [ ] Push notification is only a refresh hint.
- [ ] Older events cannot overwrite newer state.

## 4.15 Forms

- [ ] Drafts persist where workflow requires.
- [ ] Sensitive fields have explicit non-persistence rules.
- [ ] Client validation works offline where useful.
- [ ] Server validation remains authoritative.
- [ ] Rejected values remain available for correction.
- [ ] Multi-step progress is checkpointed where appropriate.
- [ ] Local completion is not misrepresented as submission.

## 4.16 Sync UX

- [ ] Connectivity and record sync states are separate.
- [ ] Offline Alert appears only when materially useful.
- [ ] Pending changes are visible where risk warrants.
- [ ] Permanent failures remain persistent.
- [ ] Conflict state has a recovery path.
- [ ] Exact last-sync time is available where staleness matters.
- [ ] Determinate progress is truthful.
- [ ] Routine background success does not spam users.
- [ ] Status wording distinguishes local from remote persistence.

## 4.17 Accessibility

- [ ] Important offline state is announced politely.
- [ ] Routine retries do not spam live regions.
- [ ] Connectivity changes do not steal focus.
- [ ] Status does not rely only on color.
- [ ] Conflict Dialog/Sheet is keyboard accessible.
- [ ] Reduced-motion preferences are respected.
- [ ] Retry and recovery actions have clear labels.

## 4.18 Components and design system

- [ ] `Alert` is used for offline/degraded conditions.
- [ ] `Badge` identifies record sync state.
- [ ] `Spinner` indicates active unknown-duration sync.
- [ ] `Progress` is used only for measurable progress.
- [ ] `Dialog`/`Sheet` handles conflict review.
- [ ] `AlertDialog` is reserved for consequential discard decisions.
- [ ] `Table`/`Data Table` supports sync administration.
- [ ] Design Tokens define pending/conflict/error/synced states.

## 4.19 Observability

- [ ] Outbox depth is monitored.
- [ ] Oldest pending age is monitored.
- [ ] Sync success/failure rate is monitored.
- [ ] Retry count is monitored.
- [ ] Conflict rate is monitored.
- [ ] Rejection rate is monitored.
- [ ] Full-resync rate is monitored.
- [ ] Quota failures are monitored.
- [ ] Storage usage is monitored where available.
- [ ] Attachment backlog is monitored.
- [ ] Sync requests are correlatable end to end.

## 4.20 Testing

- [ ] App launches offline.
- [ ] Connectivity loss at each mutation stage is tested.
- [ ] Network flapping is tested.
- [ ] High latency is tested.
- [ ] 401/403/409/422/429/5xx handling is tested.
- [ ] Crash windows are tested.
- [ ] Duplicate mutation delivery is tested.
- [ ] Out-of-order acknowledgements are tested.
- [ ] Two-device concurrency is tested.
- [ ] Device clock skew is tested.
- [ ] Long-offline clients are tested.
- [ ] Quota exhaustion is tested.
- [ ] Storage eviction is tested.
- [ ] Logout is tested with pending work.
- [ ] Encryption/key-loss behavior is tested.
- [ ] Schema migration with pending work is tested.
- [ ] Multi-tab behavior is tested.
- [ ] Background worker termination is tested.
- [ ] Realtime reconnect/gap recovery is tested.
- [ ] Permission revocation while offline is tested.
- [ ] Delete/resurrection prevention is tested.
- [ ] Final convergence invariants are asserted.

---

# 5. Canonical summary

The following rules define the Gold Standard 2026 baseline.

1. **Offline support MUST be defined per workflow, not as a blanket product claim.**

2. **Offline-capable, offline-first, and local-first are different architectural claims and MUST NOT be conflated.**

3. **Every synchronized entity MUST define where final authority resides.**

4. **Each mutation MUST declare whether it is offline-allowed, offline-with-validation, draft-only, or online-required.**

5. **Material offline state SHOULD use a structured transactional local database rather than arbitrary browser key/value storage.**

6. **Entities created offline MUST have stable local identity before synchronization.**

7. **A local mutation and its durable outbox/journal entry MUST be committed atomically where the platform supports transactions.**

8. **A mutation queue MUST survive restart for workflows marketed as durable offline writes.**

9. **Each logical mutation MUST have stable identity across retries.**

10. **The server MUST make retried mutations idempotent where duplicate effects matter.**

11. **A request timeout MUST be treated as an uncertain outcome rather than proof of failure.**

12. **Synchronization MUST have a defined push, pull, acknowledgement, cursor, and full-resync contract.**

13. **Pull cursors MUST advance only after the associated data has been durably applied locally.**

14. **Full resynchronization MUST NOT silently destroy pending local work.**

15. **Multiple tabs, workers, service workers, and background processes MUST NOT create uncontrolled concurrent queue processing.**

16. **Connectivity indicators are hints; service reachability is established through actual request behavior.**

17. **Background Sync MAY improve web synchronization, but MUST NOT be the only path because support is not universal.** citeturn827735search1

18. **Conflict detection SHOULD use authoritative versions or defined logical ordering rather than device wall clocks.**

19. **Every synchronized field/entity MUST have an explicit conflict strategy.**

20. **LWW MUST only be used when silent overwrite is an acceptable domain rule.**

21. **Three-way merge SHOULD use base, local, and remote state rather than comparing only final snapshots.**

22. **Semantic/domain operations SHOULD be preferred over whole-record replacement where they produce safer concurrent merges.**

23. **CRDTs MAY solve selected multi-writer convergence problems, but MUST NOT be treated as substitutes for authorization, validation, business invariants, or schema governance.**

24. **Material conflicts that cannot be safely merged automatically MUST be preserved for explicit resolution.**

25. **Conflict resolution is itself a new mutation and MUST be synchronized authoritatively.**

26. **Distributed deletes SHOULD use tombstones or equivalent deletion history to prevent stale-replica resurrection.**

27. **Tombstones MUST retain only necessary synchronization metadata and follow retention/privacy policy.**

28. **Optimistic UI SHOULD render from durable local working state whenever practical.**

29. **The UI MUST distinguish local durability from authoritative remote acceptance where that distinction matters.**

30. **Server rejection MUST NOT silently erase substantial user-authored offline work.**

31. **Cached permissions MUST be re-authorized when queued protected mutations synchronize.**

32. **Offline mode MUST NOT expand user privilege.**

33. **High-risk security, financial, permission, or regulated actions SHOULD remain online-authorized unless the domain explicitly supports secure offline commitment.**

34. **Sensitive local data MUST receive platform-appropriate protection and minimization.**

35. **Native clients SHOULD use platform encryption and protected/hardware-backed key storage when available rather than custom cryptography.** citeturn827735search6

36. **Browser-side encryption MUST NOT be overclaimed as protection against a same-origin code compromise.**

37. **Local storage MUST be partitioned by user and tenant where applicable.**

38. **Logout MUST have an explicit policy for cached records, pending work, files, and cryptographic keys.**

39. **Browser storage MUST be treated as quota- and eviction-sensitive unless stronger persistence is explicitly available.** citeturn827735search0

40. **Application-controlled eviction MUST prioritize replaceable caches before unsynced user work.**

41. **The application MUST stop claiming successful local save when storage writes fail.**

42. **Persistent browser storage is not a backup and does not protect against explicit site-data deletion, browser reset, or device loss.**

43. **Schema migrations MUST preserve pending mutations, conflicts, attachments, and sync metadata.**

44. **Old clients returning after long periods offline MUST have a defined protocol-upgrade or full-resync path.**

45. **Realtime messages MUST enter the same version/reconciliation model as ordinary synchronization.**

46. **A realtime connection MUST NOT be treated as complete event history; reconnection requires catch-up or resync.**

47. **Large attachments SHOULD use staged durable storage and a dedicated resumable transfer lifecycle where justified.**

48. **Queue ordering SHOULD be scoped to actual entity/dependency requirements rather than enforcing unnecessary global FIFO.**

49. **Queue compaction MUST only combine operations when business semantics remain equivalent.**

50. **Automatic retries MUST distinguish transient transport failures from authorization, validation, conflict, and permanent rejection.**

51. **Retries SHOULD use bounded backoff and jitter and MUST NOT create battery/network retry storms.**

52. **Global connectivity state and individual record synchronization state MUST remain separate.**

53. **Persistent sync failures and conflicts MUST remain visible; they MUST NOT be represented only by transient toasts.**

54. **Last-sync/freshness information SHOULD be displayed where stale data can affect user decisions.**

55. **Determinate progress MUST only be shown when real progress can be measured.**

56. **Sync-state changes MUST be accessible without stealing focus or repeatedly announcing internal retries.**

57. **Sensitive form fields MUST NOT automatically inherit generic offline draft persistence.**

58. **Server-side business constraints remain authoritative even when local-first UX accepts work immediately.**

59. **Sync telemetry SHOULD measure queue age, failure, conflict, rejection, full resync, quota failure, storage usage, and attachment backlog.**

60. **Support recovery MUST preserve unsynced work before recommending destructive local resets.**

61. **Offline-first systems MUST be tested as distributed systems, not merely by toggling airplane mode once.**

62. **Testing MUST cover crash windows, duplicate delivery, reordered acknowledgements, multiple devices, clock skew, long offline periods, quota exhaustion, storage eviction, schema migration, permission changes, realtime gaps, and deletion resurrection.**

63. **Critical sync tests SHOULD assert convergence and domain invariants rather than only successful HTTP responses.**

64. **shadcn/ui Alert, Badge, Spinner, Progress, Button, Dialog, AlertDialog, Sheet, ScrollArea, Table, Data Table, Skeleton, and Empty form the canonical component baseline for offline and synchronization UX.** citeturn309659search5

65. **The canonical rule is: commit user intent durably before claiming it is saved, preserve it until authoritative reconciliation is complete, resolve concurrent histories according to explicit domain semantics, and never allow unreliable connectivity to become silent data loss.**

The hardest boundary is **durable local work versus globally valid work**. A well-designed offline-first system can promise that a draft is safely on the device while still stating that inventory, authorization, publishing, or another business invariant remains pending server validation. That distinction prevents both silent loss and false confidence.
