---
id: "time"
title: "Time Date & Timezone"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "time", "date", "timezone"]
applies_to: ["general"]
related: []
legacy_number: 61
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 73065
provenance: baseline

---

Below is the canonical corpus version. It deliberately narrows “UTC everywhere” to the correct rule: **store instants as UTC; preserve civil-time semantics separately when the value is not an instant**.

# Time, Date & Timezone Guidelines — Gold Standard 2026

**Canonical placement:** Data & Database → API → Internationalization → Forms & Validation  
**Status:** Canonical  
**Applies to:** Databases, APIs, web applications, background jobs, scheduled tasks, reporting, audit logs, authentication, forms, calendars, notifications, billing, SLAs, analytics, imports/exports, distributed systems, and any feature that stores, compares, calculates, schedules, or displays dates and times  
**Component baseline:** shadcn/ui  
**Normative terms:** MUST, MUST NOT, SHOULD, SHOULD NOT, MAY

---

# 1. Purpose

## 1.1 Objective

This standard defines the canonical representation, persistence, transport, calculation, scheduling, rendering, validation, accessibility, and testing requirements for temporal data.

It covers:

1. UTC storage discipline;
2. instants versus local civil time;
3. date-only values;
4. time-only values;
5. local date-times;
6. timezone identifiers;
7. UTC offsets;
8. daylight-saving transitions;
9. ambiguous and nonexistent local times;
10. durations;
11. calendar periods;
12. intervals and ranges;
13. calendar arithmetic;
14. business days and holidays;
15. one-time scheduling;
16. recurring schedules;
17. cron;
18. tenant timezone configuration;
19. user timezone configuration;
20. database column types;
21. indexes and temporal queries;
22. ISO 8601 / RFC 3339 serialization;
23. localization and rendering;
24. forms and date/time pickers;
25. relative-time UX;
26. security-sensitive timestamps;
27. distributed-system clocks;
28. caching and state management;
29. testing;
30. observability; and
31. timezone-database maintenance.

The objective is to ensure that temporal values preserve their **meaning**, not merely their numeric representation.

A date is not automatically a timestamp.

A local date-time is not automatically an instant.

A UTC offset is not a timezone.

Twenty-four elapsed hours are not always one local calendar day.

## 1.2 Canonical temporal model

Every temporal field MUST first be classified by semantics.

The canonical categories are:

| Semantic type | Example | Meaning |
|---|---|---|
| **Instant** | `2026-09-23T03:30:00Z` | One exact point on the global timeline |
| **Date** | `2026-09-23` | A civil-calendar day without a time or timezone |
| **Time of day** | `09:30:00` | A wall-clock time without a date |
| **Local date-time** | `2026-09-23T09:30:00` | Civil date + time, not uniquely resolvable without timezone rules |
| **Zoned date-time** | local date-time + `Asia/Kuala_Lumpur` | Civil date-time interpreted using a named timezone |
| **Duration** | 7,200 seconds | Exact elapsed amount of time |
| **Calendar period** | 1 month | Calendar-relative amount, not fixed elapsed seconds |
| **Interval** | `[start, end)` | Bounded range between temporal values |
| **Recurring schedule** | 09:00 every Monday in `Europe/Paris` | Rule generating future civil occurrences |

A system MUST NOT collapse these types into a single generic timestamp abstraction.

## 1.3 Core rule

The canonical storage rule is:

```text
If the value represents an instant:
    persist the instant in UTC.

If the value represents a civil date:
    persist the date as a date.

If the value represents future local-time intent:
    persist the local civil value + named timezone + scheduling policy.

If the value represents elapsed time:
    persist/use a duration.

If the value represents calendar arithmetic:
    preserve the calendar period semantics.
```

“Convert everything to UTC” MUST NOT be applied to values that are not instants.

For example, a birthday of `1990-06-15` MUST NOT become:

```text
1990-06-15T00:00:00Z
```

because doing so incorrectly introduces a time and timezone that were never part of the original meaning.

## 1.4 Internet timestamp baseline

API instants MUST use the RFC 3339 profile of ISO 8601 unless an external protocol requires another representation.

RFC 3339 defines Internet timestamps as representations of an unambiguous instant and requires an explicit relationship to UTC. It also identifies locale-dependent forms such as `10/11/1996` as unsuitable for global interchange. citeturn488035view0

## 1.5 Timezone baseline

Named timezones MUST use IANA Time Zone Database identifiers where named timezone behavior is required.

Examples:

```text
Asia/Kuala_Lumpur
America/New_York
Europe/Paris
Australia/Sydney
```

IANA timezone rules are updated over time because governments change UTC offsets, timezone boundaries, and daylight-saving rules. Applications therefore MUST treat timezone data as versioned operational data rather than immutable geographic fact. citeturn148086search9

## 1.6 Relationship to other standards

This standard MUST be implemented consistently with:

- **Security:** token expiry, session timeout, audit timestamps, signature windows, replay protection, certificate validity, rate limits, trusted clocks, and log integrity;
- **Data & Database:** canonical types, indexes, migrations, constraints, retention, soft deletion, partitioning, temporal queries, and transactional consistency;
- **API:** RFC 3339 serialization, validation, nullability, versioning, pagination cursors, idempotency, cache semantics, and error contracts;
- **State Management:** current-time state, stale state, timers, polling, cancellation, optimistic state, hydration, and client/server differences;
- **Forms & Validation:** date pickers, time inputs, timezone selection, min/max rules, range validation, DST ambiguity, and error copy;
- **Accessibility:** date-picker keyboard interaction, accessible labels, relative-time alternatives, status announcements, and understandable formats;
- **Internationalization:** locale formatting, calendars, weekday/month names, hour cycles, numbering systems, and timezone labels;
- **Design Tokens:** form layout, focus state, error treatment, spacing, calendar states, selected dates, disabled dates, and status colors;
- **Component standards:** Input, Calendar, Popover, Select, Combobox, Button, Alert, Dialog, Table, Badge, Tooltip, and Form primitives; and
- **Pattern standards:** scheduling, booking, filters, reports, forms, audit trails, notifications, and data tables.

---

# 2. Rules

## 2.1 Classify temporal semantics before implementation

Every database field and API field representing time MUST answer:

```text
What does this value mean?
```

The design MUST distinguish at least:

```text
instant
date
time
local_date_time
zoned_date_time
duration
calendar_period
interval
recurrence
```

A developer MUST NOT select a database type merely because it can technically hold the supplied value.

The field name SHOULD make semantics evident.

Preferred:

```text
created_at
starts_at
birth_date
billing_month
local_start_time
schedule_timezone
expires_at
duration_seconds
```

Avoid ambiguous names such as:

```text
date
time
timestamp
schedule
value
```

unless the surrounding schema makes the semantic type unquestionably clear.

---

## 2.2 Instants

An **instant** is an exact point on the global UTC timeline.

Examples include:

- account creation;
- API request arrival;
- payment authorization;
- audit event;
- email sent time;
- token expiry;
- login time;
- database mutation;
- job execution;
- sensor reading; and
- event occurrence after the timezone has been resolved.

Instants MUST be persisted in a timezone-aware instant-capable database type or an equivalent UTC representation.

Applications MUST compare instants as timeline values, not formatted local strings.

An instant MUST NOT depend on the database session timezone for its meaning.

---

## 2.3 UTC storage discipline

All persisted **instants** MUST have one canonical UTC meaning.

Application servers SHOULD operate internally on UTC instants.

Logs SHOULD use UTC as their canonical machine-readable timestamp.

Background processing SHOULD use UTC for execution/audit timestamps.

UTC normalization MUST NOT discard a separately required civil timezone.

For example, a meeting may require:

```text
starts_at = 2026-10-20T13:00:00Z
timezone = Europe/Paris
```

The first field identifies the occurrence.

The second preserves the intended presentation or scheduling context.

---

## 2.4 UTC is not a timezone strategy

UTC solves instant comparison.

UTC does NOT by itself solve:

- user-local rendering;
- recurring local schedules;
- future timezone-rule changes;
- business-day calculations;
- DST transitions;
- locale formatting;
- date-only semantics; or
- wall-clock intent.

The architecture MUST NOT assume that converting input to UTC eliminates the need to understand its originating timezone.

---

## 2.5 Date-only semantics

A `date` represents a civil-calendar date without a time of day or timezone.

Examples:

```text
birthday
anniversary
invoice_due_date
financial_period_date
holiday
service_date
reporting_date
passport_expiry_date
```

Date-only values MUST use a date-specific application/database type where available.

They MUST serialize as:

```text
YYYY-MM-DD
```

Example:

```text
2026-09-23
```

A date MUST NOT be represented as midnight UTC solely because the technology stack lacks discipline.

This is prohibited:

```text
2026-09-23T00:00:00Z
```

when the actual business value is only:

```text
2026-09-23
```

Converting a date through a timezone can change its displayed calendar day and create one-day errors.

---

## 2.6 Date-only comparison

Date-only business rules MUST compare dates in their defined business calendar context.

For example:

```text
due_date < today
```

requires an explicit definition of `today`.

`today` MAY mean:

- user's local date;
- tenant's business date;
- jurisdiction date; or
- UTC date.

The responsible domain MUST specify which.

The system MUST NOT implicitly use the application server's local date.

---

## 2.7 Time-only semantics

A time-of-day value such as:

```text
09:30:00
```

has no unique relationship to UTC unless combined with both a date and applicable timezone rules.

Time-only values MAY be used for:

- opening time;
- daily reminder time;
- shift start;
- recurring schedule configuration; or
- business-hours configuration.

A time-only value MUST NOT be converted to UTC independently.

A recurring local time SHOULD be persisted as a time value plus applicable timezone or business-calendar context.

---

## 2.8 Local date-time

A local date-time is a civil date and wall-clock time without a resolved timezone.

Example:

```text
2026-11-01T01:30:00
```

This value MAY correspond to:

- one instant;
- two instants; or
- no instant

depending on the timezone and timezone transition.

A local date-time MUST NOT be assumed to identify an instant until its timezone and ambiguity policy are known.

---

## 2.9 Named timezone versus UTC offset

An offset is a relationship to UTC at one moment:

```text
+08:00
-05:00
+05:45
```

A timezone is a collection of civil-time rules over time:

```text
Asia/Kuala_Lumpur
America/New_York
Europe/Paris
```

Applications MUST NOT use a fixed UTC offset as a substitute for a named timezone when future or historical civil-time behavior matters.

RFC 9557 explicitly distinguishes UTC offsets from named timezones: offsets do not contain the future rule set required for operations such as "one day later" across daylight-saving transitions. citeturn312241view0turn312241view1

---

## 2.10 Timezone identifiers

Persisted named timezones MUST use canonical or supported IANA timezone identifiers.

Preferred:

```text
Asia/Kuala_Lumpur
America/New_York
Europe/Berlin
```

Avoid persisted abbreviations such as:

```text
CST
IST
BST
EST
```

because abbreviations may be ambiguous, historical, locale-dependent, or fail to express daylight-saving behavior.

Fixed offsets MAY be accepted where the domain explicitly requires fixed-offset semantics.

Examples include:

```text
UTC
+05:30
```

A user choosing "`GMT+8`" SHOULD normally be mapped to or clarified as a named region when future civil-time scheduling is intended.

---

## 2.11 Persisting the original timezone

For ordinary audit or event timestamps, retaining only the canonical instant MAY be sufficient.

The originating timezone SHOULD additionally be stored where it is material to:

- scheduling;
- appointments;
- travel;
- legal records;
- user-visible event provenance;
- business-day interpretation;
- billing cycles; or
- reconstructing what local time was entered.

The timezone MUST NOT be reconstructed from a stored UTC offset when named-zone semantics matter.

---

## 2.12 Timezone-database maintenance

Applications using named timezones MUST run on a maintained timezone database.

Runtime environments, containers, operating systems, database servers, and language runtimes SHOULD receive timezone-data updates through normal patch management.

The application SHOULD expose or log the timezone-database version where deterministic schedule diagnosis requires it.

Timezone rules MUST NOT be copied into application source as permanent handcrafted offset tables.

---

## 2.13 Historical and future timezone rules

Named timezone rules can change.

Applications MUST distinguish between:

- **historical instant:** already occurred;
- **future resolved instant:** explicitly committed to a timeline occurrence;
- **future civil intent:** intended to happen at a given local wall time under applicable local rules.

Historical instants MUST NOT move merely because the timezone database later changes.

Future civil schedules MAY require recomputation when relevant timezone rules change.

The product MUST define this policy for long-lived future schedules.

---

## 2.14 Zoned future appointments

When a future event is specified as:

```text
20 October 2026
09:00
Europe/Paris
```

and "09:00 Paris time" is part of the user's intent, the system SHOULD retain:

```text
local_date_time
timezone
resolved_instant
```

or equivalent fields.

The resolved instant supports efficient execution.

The civil fields preserve intent and allow controlled re-resolution if timezone legislation changes before the event.

Applications MUST define whether later timezone-database changes:

- preserve the original instant; or
- preserve the original local wall-clock intent.

That decision is a domain rule.

---

## 2.15 DST nonexistent local times

During a forward clock transition, some local times do not exist.

For example, a timezone may advance directly from:

```text
01:59:59
```

to:

```text
03:00:00
```

making `02:30` nonexistent.

When users enter a nonexistent local time, applications MUST NOT silently interpret it according to an undocumented runtime default.

The product MUST use an explicit policy:

```text
reject
shift_forward
shift_backward
skip_occurrence
```

Interactive forms SHOULD normally reject or explain the issue unless the domain has a clearly defined automatic adjustment.

Example copy:

```text
2:30 AM does not occur on this date in this timezone
because the clock moves forward.

Choose another time.
```

---

## 2.16 DST ambiguous local times

During a backward clock transition, a local time can occur twice.

For example:

```text
01:30
```

may correspond to two separate UTC instants.

Applications MUST NOT silently select an arbitrary occurrence where the distinction matters.

The domain MUST define an ambiguity policy such as:

```text
earlier occurrence
later occurrence
ask user
run once
run twice
```

Interactive scheduling SHOULD identify the applicable offsets when user choice is needed.

Example:

```text
1:30 AM occurs twice on this date.

1:30 AM UTC−04:00
1:30 AM UTC−05:00
```

---

## 2.17 DST test coverage

Any feature supporting timezones with clock changes MUST include tests covering at least:

```text
before transition
at transition
after transition
nonexistent local time
ambiguous local time
```

The test suite MUST NOT assume every day has exactly 24 local hours.

---

## 2.18 Durations

A duration represents exact elapsed time.

Examples:

```text
30 seconds
15 minutes
48 hours
2,500 milliseconds
```

Durations SHOULD be stored in a clearly documented unit or a duration type.

Field names SHOULD include units when the database type does not:

```text
timeout_ms
duration_seconds
lease_minutes
```

Ambiguous numeric fields such as:

```text
timeout = 30
```

SHOULD NOT be used.

---

## 2.19 Duration units

The unit MUST be part of the API contract.

Milliseconds, seconds, and nanoseconds MUST NOT be mixed implicitly.

A duration serialized as a plain number MUST have its unit evident from:

- field name;
- schema; or
- protocol definition.

ISO 8601 durations MAY be used when interoperability requires calendar/duration expression, but their calendar semantics MUST be understood before use.

---

## 2.20 Elapsed duration versus calendar period

These operations are semantically different:

```text
instant + 24 hours
```

and:

```text
local date-time + 1 calendar day
```

The first adds exactly 86,400 elapsed seconds under ordinary non-leap-second application semantics.

The second aims for the same local wall-clock time on the following calendar date.

Around timezone transitions, the resulting instants may differ.

The codebase MUST distinguish elapsed arithmetic from calendar arithmetic.

---

## 2.21 Calendar periods

Calendar periods include:

```text
1 day
1 week
1 month
1 quarter
1 year
```

They are not generally fixed numbers of seconds.

In particular:

```text
1 month ≠ 30 days
1 year ≠ 365 days
1 day in local civil time ≠ always 24 elapsed hours
```

Calendar periods MUST use a calendar-aware library operation.

They MUST NOT normally be converted to fixed second counts.

---

## 2.22 Month arithmetic

Month arithmetic MUST have a defined end-of-month policy.

Example:

```text
31 January + 1 month
```

requires explicit behavior.

Possible policies include:

```text
clamp to last valid day
reject
carry overflow
preserve end-of-month intent
```

The domain MUST define the correct rule for billing, subscriptions, accounting, or scheduling.

Applications MUST NOT depend on an undocumented library default for material business calculations.

---

## 2.23 Year arithmetic and leap days

Rules involving February 29 MUST define behavior for non-leap years.

For example:

```text
29 February 2024 + 1 year
```

could produce:

```text
28 February 2025
1 March 2025
invalid
```

depending on business semantics.

The expected policy MUST be tested explicitly.

---

## 2.24 Intervals

Machine-level temporal ranges SHOULD use half-open interval semantics:

```text
[start, end)
```

meaning:

```text
start <= t < end
```

Half-open intervals SHOULD be preferred because adjacent ranges compose without overlap:

```text
[09:00, 10:00)
[10:00, 11:00)
```

The instant `10:00` belongs to exactly one interval.

---

## 2.25 End timestamps

The codebase SHOULD prefer:

```text
starts_at
ends_at
```

over:

```text
starts_at
duration
```

when the end instant is authoritative and independently queried.

Duration MAY instead be derived when appropriate.

An interval MUST satisfy:

```text
end >= start
```

unless an explicitly empty or reverse interval has domain meaning.

Database constraints SHOULD enforce this invariant.

---

## 2.26 Inclusive date ranges

Human date-range UX is often inclusive:

```text
1 September through 30 September
```

Backend timestamp queries SHOULD convert this to explicit boundaries rather than generate an artificial last moment such as:

```text
2026-09-30T23:59:59.999
```

Preferred:

```text
[start_of_2026-09-01, start_of_2026-10-01)
```

in the relevant business timezone.

The system MUST NOT assume a fixed number of milliseconds represents the end of a local calendar date.

---

## 2.27 Business days

Business-day logic MUST be driven by an explicit business calendar.

A business calendar SHOULD define:

```text
timezone
working weekdays
public holidays
organisation holidays
exception working days
partial days where relevant
```

"Add five business days" MUST NOT be implemented as:

```text
add seven calendar days
```

or any fixed arithmetic shortcut.

---

## 2.28 Holiday calendars

Holiday data MUST identify its authority and applicable jurisdiction.

Holiday rules SHOULD be versioned.

Tenant-specific holidays MAY extend jurisdiction defaults.

Applications MUST account for holidays that are:

- date-specific;
- observed on another date;
- region-specific;
- annually calculated; or
- organisation-specific.

A holiday library MUST NOT be assumed correct forever without update governance.

---

## 2.29 Business-day timezone

Business-day evaluation MUST have an explicit timezone.

For tenant-scoped operations, the tenant timezone SHOULD normally define the business date unless domain requirements specify otherwise.

A job running at `00:10 UTC` MUST NOT assume that every tenant has entered a new business day.

---

## 2.30 Recurring schedules

A recurring schedule represents a rule, not merely a list of UTC timestamps.

Example:

```text
Every weekday at 09:00 in Europe/London
```

SHOULD be stored using components such as:

```text
recurrence rule
local time
timezone
start boundary
optional end boundary
DST policy
```

The schedule MUST NOT generally be converted once into a permanent fixed UTC hour.

---

## 2.31 Wall-clock recurring schedules

When user intent is:

```text
Run every day at 9 AM local time
```

the scheduler MUST preserve `09:00` as the civil-time target.

The corresponding UTC execution time MAY vary when timezone offsets change.

This is correct.

The job MUST NOT remain pinned to an obsolete UTC hour merely because that was the offset when the schedule was created.

---

## 2.32 Fixed-instant recurrence

Some domains intentionally require exact elapsed recurrence:

```text
every 24 hours from execution
```

This MUST be modelled as elapsed-time recurrence rather than calendar recurrence.

The UI and API SHOULD distinguish:

```text
Every 24 hours
```

from:

```text
Every day at 09:00
```

because they are not equivalent.

---

## 2.33 One-time schedules

A one-time schedule representing an exact occurrence SHOULD ultimately resolve to an instant.

If created from local user input, the system MUST resolve:

```text
local date
+ local time
+ timezone
+ DST policy
→ instant
```

before execution.

The stored schedule SHOULD retain civil intent where future timezone-rule changes may affect expected behavior.

---

## 2.34 Cron expressions

Cron MUST NOT be treated as a complete temporal specification unless its timezone semantics are also defined.

A scheduled cron job MUST explicitly establish:

```text
cron expression
timezone
DST duplicate policy
DST missing-time policy
```

The server's operating-system timezone MUST NOT implicitly determine business cron behavior.

UTC cron MAY be used when UTC itself is the intended business schedule.

---

## 2.35 Cron and DST

For local-time cron schedules, the scheduler MUST define behavior when:

- a scheduled local time does not exist; or
- a scheduled local time occurs twice.

Acceptable policies MAY include:

```text
skip
run at next valid time
run once using earlier occurrence
run once using later occurrence
run twice
```

The policy MUST be documented and tested.

---

## 2.36 Scheduler durability

Business-critical schedules MUST NOT rely exclusively on in-process timers.

Durable scheduling SHOULD persist enough state to survive:

- process restart;
- deployment;
- failover;
- temporary outage;
- clock change; and
- duplicate worker execution.

Scheduled execution SHOULD be idempotent or otherwise protected against duplicate execution.

---

## 2.37 Missed execution policy

A recurring job MUST define what happens after downtime.

Possible policies include:

```text
skip missed occurrences
run latest missed occurrence
run all missed occurrences
coalesce into one execution
```

The scheduler MUST NOT infer this policy accidentally from restart timing.

---

## 2.38 Tenant timezone

Multi-tenant systems SHOULD support an explicit tenant timezone when tenant-level business dates or schedules exist.

Examples:

```text
Asia/Kuala_Lumpur
Europe/London
America/Chicago
```

Tenant timezone SHOULD control tenant-scoped concepts such as:

- business day;
- reporting cutoff;
- recurring operational schedule;
- settlement day;
- default form timezone; and
- tenant-wide calendar.

Changing tenant timezone MUST be treated as a potentially material configuration change.

---

## 2.39 User timezone

Users SHOULD be able to configure a personal timezone where time rendering or individual scheduling benefits from it.

User timezone SHOULD control:

- personal display of instants;
- individual reminders;
- calendar views;
- user-specific date/time inputs; and
- user-level relative context.

Changing a user's timezone MUST NOT mutate stored historical instants.

It changes presentation and possibly user-local future schedules.

---

## 2.40 Timezone precedence

The canonical timezone resolution order SHOULD be:

```text
1. Explicit timezone attached to the domain value
2. Explicit timezone chosen for the operation
3. User timezone
4. Tenant timezone
5. Product/application default
6. UTC
```

A lower-precedence timezone MUST NOT override a timezone explicitly attached to an event.

The responsible feature MAY define a different precedence where domain semantics require it, but MUST document that difference.

---

## 2.41 Browser timezone detection

Browser-detected timezone MAY be used to suggest a user timezone.

It SHOULD NOT silently overwrite an explicitly saved user preference.

Browser timezone detection MUST NOT be treated as authoritative tenant configuration.

SSR applications SHOULD avoid deriving rendered calendar state from different server/client timezones in a way that causes hydration mismatch.

Current shadcn/ui Calendar guidance supports an explicit `timeZone` property and notes that timezone-aware client rendering avoids date-selection offsets and server/client timezone mismatch. citeturn484171search0

---

## 2.42 Database types — instants

For PostgreSQL, instants SHOULD ordinarily use:

```text
timestamp with time zone
```

commonly written:

```text
timestamptz
```

PostgreSQL converts timezone-aware input to a UTC instant internally; it does not retain the originally supplied named timezone. citeturn484171search1

Therefore, if the original timezone itself has domain meaning, it MUST be persisted separately.

Example:

```text
starts_at        timestamptz NOT NULL
starts_timezone  text        NOT NULL
```

Equivalent types SHOULD be selected in other databases according to their actual semantics, not their names alone.

---

## 2.43 Database types — local date-times

A local date-time that intentionally has no timezone MAY use a timezone-less timestamp type.

Examples might include:

- imported historical wall-clock value with unknown timezone;
- template schedule before timezone assignment;
- civil schedule representation stored alongside a timezone.

A timezone-less timestamp MUST NOT be used for an instant merely because the application promises to "remember it's UTC."

Schema types SHOULD encode semantics where possible.

---

## 2.44 Database types — dates

Dates SHOULD use a native `date` type.

Examples:

```text
birth_date date
due_date date
business_date date
```

They SHOULD NOT use timestamp columns.

---

## 2.45 Database types — times

Recurring wall-clock times MAY use:

```text
time without time zone
```

paired with an explicit timezone context.

Database types equivalent to "`time with time zone`" SHOULD generally be avoided because a clock time plus offset without a date does not capture future timezone rules.

PostgreSQL itself notes the questionable usefulness of `time with time zone` and recommends other date/time type combinations for typical applications. citeturn484171search1

---

## 2.46 Database precision

Timestamp precision MUST be intentionally selected.

The API and database contracts SHOULD agree on the meaningful precision required by the domain.

Ordinary business systems SHOULD normally standardize at millisecond or microsecond precision rather than permit arbitrary differences across services.

Higher precision SHOULD only be used where operational ordering or domain requirements justify it.

Systems MUST NOT assume two values are distinct merely because one database supports additional fractional digits.

---

## 2.47 Database defaults

Creation timestamps SHOULD use database/server-generated current time where transaction semantics benefit from it.

Example:

```text
created_at timestamptz NOT NULL DEFAULT now()
```

Applications MUST understand whether the database function means:

```text
transaction start
statement start
actual wall-clock current time
```

before using it for latency or ordering logic.

Security-sensitive elapsed timing SHOULD NOT depend on transaction timestamp semantics.

---

## 2.48 Updated timestamps

`updated_at` MUST have a clearly defined meaning.

It SHOULD indicate an authoritative mutation instant.

If maintained automatically, the mechanism SHOULD be consistent across write paths.

Bulk backfills or migrations MUST define whether they intentionally update business modification timestamps.

The system SHOULD separate:

```text
business_updated_at
indexed_at
synced_at
```

when these represent different events.

---

## 2.49 Temporal indexes

Frequently queried timestamp columns SHOULD have appropriate indexes.

Common patterns include:

```text
(tenant_id, created_at)
(tenant_id, starts_at)
(status, next_run_at)
(expires_at)
```

Index column order MUST match actual filtering and sorting patterns.

Indexes SHOULD support common temporal range queries without requiring timezone conversion functions on every indexed row.

---

## 2.50 Local-date filtering over instant columns

A query such as:

```text
all orders on 23 September in Asia/Kuala_Lumpur
```

SHOULD be implemented by converting the requested local-date boundaries to instants:

```text
local 2026-09-23 00:00
→ UTC start

local 2026-09-24 00:00
→ UTC end
```

then querying:

```text
created_at >= start
AND created_at < end
```

The application SHOULD NOT normally transform every stored indexed timestamp into local time inside the predicate.

This preserves efficient range-index use.

---

## 2.51 Per-user local-date indexes

Systems MUST NOT create uncontrolled indexes for every possible user timezone.

If timezone-local aggregation is common, the architecture SHOULD consider:

- pre-aggregated business dates;
- tenant-specific business-date columns;
- reporting tables;
- materialized views; or
- timezone-aware query boundaries.

Denormalized local dates MUST document which timezone generated them.

---

## 2.52 Temporal partitioning

Large event tables MAY be partitioned by canonical instant ranges.

Partition keys SHOULD generally use stable UTC timeline semantics.

Business-calendar partitioning MAY be used when domain access patterns justify it, but the business timezone MUST be explicit.

Partition boundaries MUST NOT depend accidentally on the database host timezone.

---

## 2.53 API instant format

API instants MUST serialize as RFC 3339-compatible timestamps.

Canonical server output SHOULD prefer UTC `Z` form:

```text
2026-09-23T03:30:00Z
```

or, when precision is part of the contract:

```text
2026-09-23T03:30:00.123Z
```

RFC 3339 is an Internet profile of ISO 8601 intended for unambiguous timestamp interchange. citeturn488035view0

---

## 2.54 API date format

Date-only values MUST serialize as:

```text
YYYY-MM-DD
```

Example:

```text
2026-09-23
```

Locale-specific API formats are prohibited.

This MUST NOT appear in machine APIs:

```text
23/09/2026
09/23/2026
23 Sep 26
```

---

## 2.55 API local date-time format

A local date-time MAY serialize as:

```text
2026-09-23T09:30:00
```

only if the API schema clearly identifies it as a local/civil value.

If resolving the value requires a timezone, the timezone MUST be provided separately or through an explicitly adopted zone-aware serialization.

Example:

```text
{
  "localStart": "2026-09-23T09:30:00",
  "timeZone": "Asia/Kuala_Lumpur"
}
```

---

## 2.56 RFC 9557 / extended timestamp use

APIs MAY adopt RFC 9557 Internet Extended Date/Time Format when a timestamp must carry named timezone information in one value.

Example form:

```text
1996-12-19T16:39:57-08:00[America/Los_Angeles]
```

RFC 9557 adds named timezone information to RFC 3339 timestamps and explicitly addresses offset/timezone consistency. citeturn312241view0turn312241view2

Unless the API ecosystem already supports IXDTF reliably, a separate explicit `timeZone` field SHOULD normally be preferred for interoperability.

---

## 2.57 Numeric timezone offsets in APIs

An RFC 3339 input MAY contain an explicit offset.

Example:

```text
2026-09-23T11:30:00+08:00
```

The receiving service MAY normalize this to its canonical UTC instant.

The offset MUST NOT be preserved as though it were a named timezone unless fixed-offset semantics are explicitly intended.

---

## 2.58 Unix epoch values

Unix epoch representations MAY be used in protocols designed around numeric timestamps.

Where used, the unit MUST be explicit:

```text
epochSeconds
epochMilliseconds
epochNanoseconds
```

A generic field named:

```text
timestamp: 1760000000
```

SHOULD NOT be used without an externally defined unit.

Human-facing APIs SHOULD prefer RFC 3339 strings for readability and interoperability.

---

## 2.59 Fractional-second precision

An API MUST define whether it:

- rejects excess precision;
- rounds;
- truncates; or
- preserves it.

Producer output SHOULD use consistent precision where stable serialization matters.

Consumers SHOULD NOT depend on a fixed string length unless the contract guarantees it.

---

## 2.60 Four-digit years

Interoperable Internet timestamps MUST use four-digit years for the normal supported domain.

Two-digit years MUST NOT be emitted.

Inputs such as:

```text
03/04/26
```

MUST NOT be used in machine interchange because they are both year- and locale-ambiguous.

RFC 3339 requires Internet protocols to generate four-digit years. citeturn488035view0

---

## 2.61 Human rendering

Human-visible dates MUST be localized for the user's locale while preserving the underlying canonical value.

The application SHOULD use platform internationalization libraries backed by locale data rather than handcrafted format templates.

Unicode CLDR provides locale-specific date/time and timezone formatting data used by internationalization systems. citeturn484171search9turn484171search10

Examples may include:

```text
23 Sep 2026, 11:30
Sep 23, 2026, 11:30 AM
23.09.2026, 11:30
```

depending on locale and product conventions.

---

## 2.62 Machine format versus display format

Machine serialization and visual display MUST remain separate concerns.

API:

```text
2026-09-23T03:30:00Z
```

UI:

```text
23 Sep 2026, 11:30 AM
```

A UI SHOULD NOT simply print raw API timestamps.

An API MUST NOT serialize according to the caller's locale unless the endpoint is explicitly a presentation/export format.

---

## 2.63 Display timezone

When displaying an instant, the system MUST know which timezone to use.

Ordinary user-facing display SHOULD follow the defined timezone precedence.

The UI SHOULD disclose timezone when:

- users collaborate across regions;
- scheduled execution matters;
- ambiguity is likely;
- legal/financial interpretation depends on it; or
- the displayed timezone differs from the event's original timezone.

Example:

```text
23 Sep 2026, 11:30 AM MYT
```

or preferably, where clearer:

```text
23 Sep 2026, 11:30 AM
Asia/Kuala_Lumpur
```

---

## 2.64 Timezone abbreviations in UI

Timezone abbreviations MAY be used for compact presentation when unambiguous in context.

They SHOULD NOT be the only timezone representation in high-consequence scheduling interfaces.

A named city/region or UTC offset SHOULD be available where ambiguity matters.

---

## 2.65 Relative time

Relative labels MAY be used:

```text
2 minutes ago
Yesterday
in 3 hours
```

but MUST NOT replace exact time where precision is operationally important.

Relative time SHOULD have an accessible or discoverable exact-time equivalent.

Example:

```text
2 hours ago
23 Sep 2026, 9:17 AM
```

Relative labels MUST update at a sensible frequency without creating unnecessary rerenders or assistive-technology announcements.

---

## 2.66 `<time>` semantics

Web interfaces SHOULD use semantic `<time>` markup where appropriate.

The `datetime` value SHOULD contain a machine-readable temporal representation.

Visible text MAY remain localized.

Example conceptually:

```html
<time datetime="2026-09-23T03:30:00Z">
  23 Sep 2026, 11:30 AM
</time>
```

---

## 2.67 Date-picker baseline

Date entry SHOULD use shadcn/ui Calendar + Popover composition or equivalent accessible component infrastructure.

Current shadcn/ui Date Picker guidance composes `Calendar` with `Popover`; its Calendar also supports timezone-aware selection behavior. citeturn484171search0turn484171search2turn484171search3

A calendar picker MUST NOT be the only input path when direct keyboard entry is materially useful.

---

## 2.68 Date input

Forms collecting a date MUST bind to a date semantic type rather than a UTC `Date`/instant abstraction merely for implementation convenience.

The form MUST preserve the selected calendar day independent of runtime timezone.

The UI MUST NOT exhibit the common failure where selecting:

```text
20 September
```

later renders as:

```text
19 September
```

because the value passed through UTC midnight or the wrong runtime timezone.

---

## 2.69 Date-time input

A form requesting local date and time MUST make the applicable timezone clear.

If the timezone is inherited, it SHOULD be visible when the consequence matters.

Example:

```text
Start time
23 Sep 2026
09:30
Asia/Kuala_Lumpur
```

Users SHOULD NOT be expected to infer whether an input means:

```text
their timezone
tenant timezone
event timezone
UTC
```

---

## 2.70 Timezone selector

Timezone selectors SHOULD display useful human labels while persisting IANA identifiers.

A selector MAY display:

```text
Kuala Lumpur (UTC+08:00)
```

while persisting:

```text
Asia/Kuala_Lumpur
```

Offsets shown in selectors MUST be calculated for a meaningful reference instant because offsets can vary seasonally.

A timezone selector MUST NOT sort solely by current numeric offset if that makes zones difficult to find.

Search by:

- city;
- region;
- zone name; and
- common label

SHOULD be supported for large timezone lists.

---

## 2.71 Form validation

Forms MUST validate temporal relationships explicitly.

Examples:

```text
end >= start
expiry > issue time
date within allowed window
schedule not before minimum lead time
booking inside opening hours
```

Validation MUST use the correct semantic timezone.

A server MUST revalidate security- or business-critical temporal constraints.

Client validation alone is insufficient.

---

## 2.72 DST validation UX

When local input is ambiguous or nonexistent, validation copy MUST describe the problem in user terms.

Avoid:

```text
Invalid DateTimeException
AmbiguousTimeError
DST transition error
```

Prefer:

```text
This time occurs twice on that date.
Choose which occurrence you mean.
```

or:

```text
This local time does not exist because clocks move forward.
Choose another time.
```

---

## 2.73 Accessibility

Calendar and time controls MUST satisfy the Accessibility standard.

They MUST support:

- keyboard interaction;
- visible focus;
- accessible labels;
- understandable selected-state semantics;
- disabled-date semantics;
- validation association; and
- predictable focus return from Popover/Dialog surfaces.

Dates MUST NOT be communicated only through color.

Disabled dates SHOULD expose the reason when users need it to complete the task.

---

## 2.74 Accessible date wording

Screen-reader labels SHOULD use clear date descriptions rather than numeric shorthand where ambiguity is possible.

For example:

```text
Wednesday, 23 September 2026
```

is preferable in an accessible calendar label to:

```text
23/09/26
```

where locale or context could be ambiguous.

---

## 2.75 Security expiry

Security timestamps MUST be evaluated using trusted server-side time.

Examples include:

- session expiry;
- password-reset expiry;
- access-token expiry;
- signed URL expiry;
- OTP lifetime;
- invitation expiry;
- certificate checks; and
- replay windows.

Browser/device clock values MUST NOT determine whether server-authorized credentials remain valid.

---

## 2.76 Security grace periods

Any clock-skew allowance for authentication or signature validation MUST be explicitly bounded.

A tolerance MUST NOT become an undocumented extension of credential lifetime.

The same tolerance SHOULD be consistently applied by participating services.

---

## 2.77 Audit logs

Audit events MUST have a canonical instant.

Audit timestamps SHOULD be recorded in UTC.

User-facing audit views MAY render those instants in user or tenant time.

Where local regulatory interpretation requires it, the original relevant timezone MAY also be retained.

Audit records MUST NOT rewrite historical instants when timezone preferences later change.

---

## 2.78 Trusted clocks

Servers SHOULD use managed clock synchronization.

Distributed systems MUST assume small clock differences can exist between hosts.

Correctness-sensitive algorithms SHOULD NOT require independently generated wall-clock timestamps from different hosts to be perfectly ordered unless the architecture provides that guarantee.

Database sequence IDs, transaction IDs, logical clocks, or other ordering mechanisms SHOULD be considered when strict ordering is required.

---

## 2.79 Monotonic clocks

Elapsed-time measurement SHOULD use a monotonic clock where available.

Examples:

- request duration;
- timeout countdown;
- retry delay;
- circuit breaker interval;
- performance measurement;
- lease countdown inside a process.

Elapsed-time logic SHOULD NOT rely on subtraction of ordinary wall-clock timestamps because wall time may change due to clock synchronization or administrative adjustment.

Wall clocks answer:

```text
What time is it?
```

Monotonic clocks answer:

```text
How much time elapsed?
```

These are separate requirements.

---

## 2.80 Timeouts

Timeouts MUST be durations.

A timeout MUST NOT be represented as a local calendar time.

Timeout expiry SHOULD be computed using monotonic time within a running process where possible.

Persisted expiry across process restarts MUST use an instant because monotonic clocks are generally process/machine-local.

---

## 2.81 Leases and locks

Distributed lease expiry MUST have a clearly defined clock model.

Systems relying on wall-clock lease expiration MUST account for clock skew and failure modes.

Where possible, datastore-native lease/TTL semantics SHOULD be preferred to ad hoc client-clock comparisons.

---

## 2.82 Rate-limit windows

Rate-limit logic SHOULD use server-controlled time.

Client-provided timestamps MUST NOT determine window membership.

Fixed-window, sliding-window, or token-bucket semantics MUST be explicitly defined.

Rate-limit responses SHOULD serialize reset instants or durations according to the API standard.

---

## 2.83 Cache expiry

Cache TTLs represent elapsed duration.

The persisted metadata MAY include an absolute expiry instant where required.

Cache expiry MUST NOT depend on user timezone.

Human display such as:

```text
Expires in 5 minutes
```

is a rendering concern, not cache identity.

---

## 2.84 State management

Application state SHOULD preserve semantic temporal types.

State MUST NOT repeatedly convert:

```text
date
→ instant
→ local string
→ date
```

because this invites timezone drift and parsing defects.

Server state containing an instant SHOULD remain an instant until rendering.

Date-only values SHOULD remain date-only through form and state layers.

---

## 2.85 SSR and hydration

Server-rendered time output MUST avoid assumptions that differ from the client.

If server and client timezone preferences are not yet aligned, applications SHOULD either:

- render in a stable known timezone;
- defer timezone-specific formatting;
- provide timezone context to SSR; or
- hydrate without rewriting semantically significant dates.

A hydration mismatch MUST NOT be solved by suppressing errors while retaining incorrect date behavior.

---

## 2.86 “Now” as a dependency

Business logic SHOULD treat the current clock as a dependency rather than directly calling a global clock throughout domain code.

Preferred conceptual design:

```text
clock.now()
```

with an injectable/fake implementation for tests.

This enables deterministic validation of:

- expiry;
- booking windows;
- cutoffs;
- business dates;
- relative labels; and
- scheduled behavior.

---

## 2.87 Test clock

Automated tests MUST be able to control current time for time-dependent business logic.

Tests SHOULD NOT rely on real sleeping such as:

```text
sleep(5000)
```

to wait for expiry where a fake clock can advance deterministically.

Fake timers MUST be used carefully when the code also depends on database or external-system clocks.

---

## 2.88 Timezone test matrix

Temporal functionality SHOULD be tested against multiple timezone categories.

The suite SHOULD include at least:

```text
UTC
positive offset without DST
negative offset
DST-observing zone
non-whole-hour offset
```

Representative examples MAY include:

```text
UTC
Asia/Kuala_Lumpur
America/New_York
Europe/London
Asia/Kathmandu
Australia/Adelaide
```

The test suite MUST NOT assume every offset is a whole number of hours.

---

## 2.89 DST boundary tests

DST-aware tests MUST use actual known transitions from the timezone library/database used by the application.

Hardcoded assumptions such as:

```text
DST always changes on the same date worldwide
```

are prohibited.

Tests SHOULD validate both:

```text
spring/forward gaps
autumn/backward overlaps
```

where applicable.

---

## 2.90 Date boundary tests

Date-sensitive features SHOULD test:

```text
end of month
start of month
end of year
start of year
February 28
February 29
month with 30 days
month with 31 days
midnight
day before/after timezone transition
```

---

## 2.91 Business-calendar tests

Business-day algorithms MUST include tests for:

- weekend;
- ordinary weekday;
- public holiday;
- observed holiday;
- consecutive holidays;
- year boundary;
- tenant-specific holiday;
- exceptional working weekend; and
- timezone boundary.

---

## 2.92 Schedule tests

Scheduled jobs MUST be tested for:

```text
normal occurrence
DST missing occurrence
DST duplicate occurrence
service downtime
restart
duplicate dispatch
missed occurrence
timezone rule update where material
end boundary
```

Idempotency behavior MUST be included in schedule testing.

---

## 2.93 Property and invariant testing

Temporal utilities SHOULD use property-based or invariant tests where appropriate.

Useful invariants include:

```text
deserialize(serialize(instant)) == instant

toInstant(toLocal(instant, zone), zone)
  reproduces the intended occurrence when unambiguous

end >= start

adjacent half-open intervals do not overlap
```

DST ambiguity MUST be accounted for when formulating round-trip properties.

---

## 2.94 Serialization tests

API contract tests MUST verify:

- UTC `Z` output where required;
- offset input handling;
- fractional precision;
- date-only stability;
- invalid date rejection;
- timezone ID validation;
- leap-day behavior;
- range boundaries; and
- round-trip preservation.

Tests MUST NOT be executed only in the developer machine's default timezone.

---

## 2.95 Continuous integration timezone

CI SHOULD run key temporal suites with an explicit timezone rather than relying only on host defaults.

Critical suites SHOULD run under more than one timezone when feasible.

At least one test environment SHOULD differ from the team's primary local timezone to expose implicit-local-time assumptions.

---

## 2.96 Invalid temporal input

APIs MUST reject impossible civil values such as:

```text
2026-02-30
25:00
```

unless the protocol explicitly supports a special representation.

Unknown timezone identifiers MUST produce validation errors.

A server MUST NOT silently reinterpret an unknown timezone as UTC.

---

## 2.97 Parsing

Application code SHOULD use strict temporal parsers for API contracts.

Loose parsing such as:

```text
new Date(userSuppliedArbitraryString)
```

SHOULD NOT define server-side business semantics.

Locale-dependent free-text input MUST be normalized through an explicit locale-aware parser if the product intentionally supports it.

Machine APIs MUST prefer unambiguous structured formats.

---

## 2.98 Two-digit years

Forms SHOULD avoid two-digit year entry where misinterpretation can materially affect the result.

If two-digit year shorthand is permitted, the expansion rule MUST be explicit.

The backend MUST NOT guess between centuries for high-consequence records.

---

## 2.99 Timezone changes during editing

If a user changes timezone after entering a local date/time, the UI MUST define whether it means:

1. preserve the instant and change displayed local time; or
2. preserve the wall-clock value and change the resulting instant.

These operations have different semantics.

The interface SHOULD communicate which behavior occurs.

---

## 2.100 Event timezone versus viewer timezone

Calendar/event interfaces SHOULD distinguish:

```text
event timezone
viewer timezone
```

For cross-timezone collaboration, the interface MAY display both.

Example:

```text
Event:
09:00 Europe/London

Your time:
16:00 Asia/Kuala_Lumpur
```

The original event timezone MUST NOT be silently replaced when editing if it defines the schedule's intent.

---

## 2.101 Exports and reports

Machine-readable exports SHOULD use canonical ISO/RFC formats.

Human-readable reports MAY use localized formats.

CSV exports intended for machine import SHOULD avoid ambiguous dates such as:

```text
03/04/2026
```

Preferred:

```text
2026-04-03
2026-04-03T11:00:00Z
```

The export specification MUST identify timezone semantics for timestamp fields.

---

## 2.102 Analytics

Analytics event timestamps MUST be canonical instants.

Date-based reporting MUST define the timezone used to bucket events into days, weeks, and months.

Two reports using different timezone bucket boundaries MUST NOT be compared as though their daily totals were identically defined.

Analytics pipelines SHOULD store the aggregation timezone with derived date buckets where relevant.

---

## 2.103 Billing

Billing periods MUST define whether boundaries are:

- UTC;
- tenant-local;
- account-local; or
- contractually defined timezone.

Billing month arithmetic MUST use calendar semantics when contracts refer to calendar months.

Billing systems MUST NOT substitute fixed 30-day periods for "monthly" unless the contract explicitly defines that behavior.

---

## 2.104 Notification scheduling

Notifications intended for a user's local time MUST preserve the user's chosen timezone and local-time intent.

If the user changes timezone, the product MUST define whether future notifications:

- follow the new timezone; or
- remain tied to the original timezone.

Quiet-hours calculations MUST use the intended user's local timezone.

---

## 2.105 Data retention

Retention deadlines SHOULD be calculated according to the governing policy semantics.

A rule saying:

```text
retain for 90 days
```

MUST define whether that means:

- 90 × 24 elapsed hours; or
- 90 calendar days.

Legal/compliance rules SHOULD use the interpretation established by the governing policy rather than arbitrary technical convenience.

---

## 2.106 Temporal migrations

Database migrations changing temporal semantics MUST be treated as high-risk data migrations.

Before converting a timezone-less timestamp to an instant, the migration MUST know which timezone the historical value represents.

This is unsafe:

```text
old timestamp has no timezone
→ assume UTC
```

unless UTC is verified as the original semantic contract.

Ambiguous historical values SHOULD be flagged rather than silently guessed.

---

## 2.107 Importing legacy data

Legacy imports MUST distinguish:

```text
known instant
known local date/time + known zone
known local date/time + unknown zone
date only
unknown/ambiguous
```

Unknown timezone SHOULD be retained as unknown rather than falsely normalizing it to UTC.

Import quality metadata MAY identify uncertain temporal values.

---

## 2.108 Observability

Operational logs SHOULD record machine timestamps in canonical UTC.

Where diagnosing scheduling problems, logs SHOULD additionally record relevant fields such as:

```text
schedule_id
configured_timezone
local_scheduled_time
resolved_instant
tzdb/version where available
actual_started_at
actual_completed_at
```

This enables reconstruction of DST and scheduling decisions.

---

## 2.109 Temporal metrics

Systems with time-sensitive workflows SHOULD measure:

```text
schedule lag
queue wait duration
execution duration
index freshness
clock skew where available
deadline miss rate
```

Metrics measuring duration SHOULD use monotonic elapsed timing where applicable.

---

## 2.110 Design-system treatment

Temporal inputs MUST use canonical Design Tokens and component standards.

Calendar UI MUST use shared states for:

- selected;
- today;
- disabled;
- unavailable;
- range start;
- range middle;
- range end;
- focused; and
- error.

Feature teams MUST NOT invent unrelated calendar colors or selection styles.

Timezone labels SHOULD use secondary or muted typography without making critical timezone context visually negligible.

---

# 3. Anti-patterns

## 3.1 “Everything is a timestamp”

**Anti-pattern:** Birth dates, invoice due dates, event instants, and recurring times all use one timestamp type.

**Rule:** Temporal storage MUST reflect semantics.

---

## 3.2 UTC midnight for dates

**Anti-pattern:**

```text
birthday = 1990-06-15T00:00:00Z
```

**Rule:** Date-only values MUST remain dates.

---

## 3.3 Timezone-less UTC convention

**Anti-pattern:**

```text
timestamp without time zone
```

is used for UTC instants because "the team knows it means UTC."

**Rule:** Schema types SHOULD encode instant semantics.

---

## 3.4 Offset used as timezone

**Anti-pattern:**

```text
user_timezone = +01:00
```

for a user whose location observes DST.

**Rule:** Named civil timezone requirements MUST use an IANA zone.

---

## 3.5 Timezone abbreviation persistence

**Anti-pattern:**

```text
timezone = CST
```

**Rule:** Persist IANA zone identifiers or explicit fixed offsets.

---

## 3.6 Converting recurring schedules to permanent UTC hour

**Anti-pattern:**

```text
9 AM New York
→ calculate 14:00 UTC once
→ run at 14:00 UTC forever
```

**Rule:** Local recurring schedules MUST preserve timezone-aware civil intent.

---

## 3.7 Assuming every day has 24 hours

**Anti-pattern:**

```text
tomorrow = now + 86_400 seconds
```

when the requirement means tomorrow at the same local time.

**Rule:** Calendar and elapsed arithmetic MUST remain distinct.

---

## 3.8 Assuming one month is 30 days

**Anti-pattern:**

```text
monthly renewal = + 2_592_000 seconds
```

**Rule:** Calendar-month business semantics require calendar arithmetic.

---

## 3.9 End-of-day `23:59:59.999`

**Anti-pattern:** Date filtering creates a synthetic final millisecond.

**Rule:** Use half-open next-day boundaries.

---

## 3.10 Local database/server timezone dependency

**Anti-pattern:** Production behavior changes when the host timezone changes.

**Rule:** Domain timezone MUST be explicit.

---

## 3.11 Browser clock as security authority

**Anti-pattern:** Frontend decides whether a session or token is valid.

**Rule:** Security expiry MUST use trusted server-side time.

---

## 3.12 Wall clock for latency measurement

**Anti-pattern:**

```text
duration = Date.now() - start
```

is relied on where wall-clock adjustments can corrupt elapsed measurement.

**Rule:** Use monotonic clocks for elapsed duration where available.

---

## 3.13 Silent DST adjustment

**Anti-pattern:** User enters a nonexistent time and the runtime silently moves it an hour.

**Rule:** DST gap policy MUST be explicit.

---

## 3.14 Silent ambiguous-time selection

**Anti-pattern:** Runtime arbitrarily chooses the first instance of repeated `01:30`.

**Rule:** Ambiguity policy MUST be domain-defined.

---

## 3.15 Locale formats in APIs

**Anti-pattern:**

```text
23/09/2026 11:30
```

**Rule:** Machine APIs MUST use canonical unambiguous formats.

---

## 3.16 Handwritten date formatting

**Anti-pattern:** Feature code manually assembles translated month/day names.

**Rule:** Use approved internationalization facilities.

---

## 3.17 Raw ISO timestamp as primary UI

**Anti-pattern:**

```text
2026-09-23T03:30:00.000Z
```

shown to ordinary users without product need.

**Rule:** Render according to locale and timezone.

---

## 3.18 Hover-only timezone

**Anti-pattern:** Essential timezone information is only visible via tooltip.

**Rule:** Critical timezone context MUST remain accessible without hover.

---

## 3.19 `sleep()`-based temporal tests

**Anti-pattern:** Test sleeps until an expiry fires.

**Rule:** Inject/fake clocks where appropriate.

---

## 3.20 Tests only in UTC

**Anti-pattern:** Every test environment uses UTC so timezone defects never execute.

**Rule:** Critical temporal behavior MUST be exercised under representative zones.

---

## 3.21 Fixed holiday assumptions

**Anti-pattern:** Public holidays are permanently hardcoded without governance.

**Rule:** Business calendars MUST have maintained source/version rules.

---

## 3.22 Cron without timezone

**Anti-pattern:**

```text
0 9 * * *
```

is treated as a complete business schedule.

**Rule:** Cron timezone and DST behavior MUST be explicit.

---

## 3.23 Server-local “today”

**Anti-pattern:**

```text
LocalDate.now()
```

on the server implicitly defines every tenant's business date.

**Rule:** `today` MUST be evaluated in a defined timezone.

---

## 3.24 Implicit timezone conversion during migration

**Anti-pattern:** Legacy timezone-less data is assumed to be UTC without evidence.

**Rule:** Historical semantics MUST be established before conversion.

---

## 3.25 Sorting formatted dates

**Anti-pattern:** UI-localized strings are used as authoritative chronological sort keys.

**Rule:** Sort underlying temporal values.

---

## 3.26 Comparing timestamps as arbitrary strings

**Anti-pattern:** Differently offset or differently precise timestamps are compared lexically without normalization guarantees.

**Rule:** Parse to temporal values before comparison unless the protocol specifically guarantees sortable canonical form.

---

## 3.27 Client-side tenant timezone

**Anti-pattern:** Browser timezone automatically becomes the tenant timezone.

**Rule:** Tenant timezone is explicit configuration.

---

## 3.28 Storing only resolved UTC for recurring civil intent

**Anti-pattern:** The system cannot reconstruct why a recurring event occurs at its current UTC time.

**Rule:** Preserve recurrence + named timezone + local-time intent.

---

## 3.29 Fixed-offset future scheduling

**Anti-pattern:** `+01:00` is stored where "Europe/Paris" was intended.

**Rule:** Future civil schedules require named timezone rules.

---

## 3.30 Unbounded timezone cache

**Anti-pattern:** A service assumes timezone rules loaded years ago remain correct indefinitely.

**Rule:** tzdb maintenance MUST be part of runtime lifecycle management.

---

# 4. Checklist

## 4.1 Semantics

- [ ] Every temporal field has an explicit semantic type.
- [ ] Instants are distinguished from dates.
- [ ] Local date-times are distinguished from instants.
- [ ] Durations are distinguished from calendar periods.
- [ ] Recurring schedules are distinguished from fixed instants.
- [ ] Field names communicate temporal meaning.
- [ ] “Today” has a defined timezone.

## 4.2 UTC and timezone

- [ ] Instants have canonical UTC meaning.
- [ ] Date-only values are not converted to UTC timestamps.
- [ ] IANA timezone IDs are used where civil-time rules matter.
- [ ] Numeric offsets are not mistaken for named timezones.
- [ ] Original/event timezone is retained where materially relevant.
- [ ] Timezone data receives runtime maintenance.
- [ ] Historical instants remain stable after tzdb updates.
- [ ] Future civil-time policy is defined for tzdb changes.

## 4.3 DST

- [ ] Nonexistent local times have an explicit policy.
- [ ] Ambiguous local times have an explicit policy.
- [ ] Recurring jobs define DST skip/duplicate behavior.
- [ ] DST transition tests exist.
- [ ] UI provides understandable ambiguity/error copy.
- [ ] Runtime defaults are not silently relied upon.

## 4.4 Dates and calendar math

- [ ] Date-only values use date types.
- [ ] End-of-month behavior is defined.
- [ ] Leap-day behavior is defined.
- [ ] Calendar months are not converted to fixed seconds.
- [ ] Calendar days are not assumed to equal 24 elapsed hours.
- [ ] Date-range filtering uses half-open boundaries.
- [ ] Calendar operations use a timezone where required.

## 4.5 Durations and intervals

- [ ] Duration units are explicit.
- [ ] Elapsed-time calculations use duration semantics.
- [ ] Monotonic clocks are used for in-process elapsed measurement where appropriate.
- [ ] Intervals use `[start, end)` unless domain requirements state otherwise.
- [ ] `end >= start` is validated.
- [ ] Artificial `23:59:59.999` range endings are avoided.

## 4.6 Business calendars

- [ ] Business timezone is explicit.
- [ ] Working weekdays are defined.
- [ ] Public holidays are sourced and maintained.
- [ ] Tenant-specific holidays are supported where required.
- [ ] Observed holidays are handled.
- [ ] Exceptional working days are handled.
- [ ] Business-day logic has boundary tests.

## 4.7 Scheduling

- [ ] One-time schedules resolve to an instant.
- [ ] Future civil intent retains timezone where necessary.
- [ ] Recurrences preserve local-time semantics.
- [ ] Cron expressions have explicit timezone.
- [ ] DST cron behavior is defined.
- [ ] Missed-job behavior is defined.
- [ ] Scheduling survives process restart where required.
- [ ] Duplicate execution is prevented or idempotent.
- [ ] Long-lived schedules have timezone-rule-update policy.

## 4.8 Tenant and user preferences

- [ ] Tenant timezone is explicit where business dates require it.
- [ ] User timezone is explicit where personal rendering requires it.
- [ ] Browser detection does not overwrite saved preference.
- [ ] Timezone precedence is documented.
- [ ] Event timezone outranks viewer preference when domain semantics require it.
- [ ] Preference changes do not rewrite historical instants.

## 4.9 Database

- [ ] Instant columns use an appropriate timezone-aware type.
- [ ] Date columns use `date`.
- [ ] Time-only values have explicit timezone context where needed.
- [ ] Original timezone is stored separately when required.
- [ ] Timestamp precision is defined.
- [ ] Temporal constraints exist.
- [ ] Indexes match time-range query patterns.
- [ ] Tenant/time indexes use appropriate composite ordering.
- [ ] Host/database session timezone cannot change business meaning.
- [ ] Temporal migrations preserve known semantics.

## 4.10 API

- [ ] Instants use RFC 3339-compatible serialization.
- [ ] Canonical output prefers UTC `Z`.
- [ ] Date-only values use `YYYY-MM-DD`.
- [ ] Local date-time inputs clearly identify timezone semantics.
- [ ] Timezone IDs use IANA identifiers.
- [ ] Fractional precision is documented.
- [ ] Numeric epoch units are explicit.
- [ ] Locale-specific machine formats are prohibited.
- [ ] Invalid dates/times are rejected.
- [ ] Unknown timezone IDs are rejected rather than interpreted as UTC.

## 4.11 Forms and UX

- [ ] Date input preserves date semantics.
- [ ] Date-time input displays relevant timezone.
- [ ] Timezone selector persists IANA ID.
- [ ] Timezone changes have defined preserve-instant/preserve-wall-time behavior.
- [ ] Calendar interaction is keyboard accessible.
- [ ] Error copy explains DST problems clearly.
- [ ] Disabled dates expose meaningful state.
- [ ] Machine values are separated from localized display values.

## 4.12 Internationalization

- [ ] Display uses locale-aware formatting.
- [ ] Locale does not alter API serialization.
- [ ] Hour-cycle conventions are localized where appropriate.
- [ ] Month/day names use i18n libraries.
- [ ] Timezone labels avoid ambiguous abbreviations in consequential contexts.
- [ ] Numeric date ambiguity is avoided.

## 4.13 Accessibility

- [ ] Calendar controls have accessible names.
- [ ] Selected/disabled states are programmatically exposed.
- [ ] Dates are understandable without color.
- [ ] Exact timestamps remain accessible when relative text is used.
- [ ] Timezone information is not hover-only.
- [ ] Focus behavior follows component standards.

## 4.14 Security

- [ ] Security expiry uses server time.
- [ ] Client clock cannot extend credentials.
- [ ] Clock-skew tolerance is bounded.
- [ ] Audit timestamps have canonical instants.
- [ ] Replay windows are explicitly defined.
- [ ] Rate limits use trusted time.
- [ ] Sensitive timing logic does not depend on locale settings.

## 4.15 State management

- [ ] Dates remain dates through client state.
- [ ] Instants remain instants until rendering.
- [ ] No unnecessary string/date/string conversions occur.
- [ ] SSR timezone assumptions are controlled.
- [ ] Relative-time state updates at bounded frequency.
- [ ] Current time can be injected/faked in domain logic.

## 4.16 Testing

- [ ] Test clock is controllable.
- [ ] Real sleeping is avoided in deterministic tests.
- [ ] Tests run in multiple timezone classes.
- [ ] Positive and negative offsets are tested.
- [ ] Fractional-hour offsets are tested.
- [ ] DST gaps are tested.
- [ ] DST overlaps are tested.
- [ ] Leap years are tested.
- [ ] End-of-month behavior is tested.
- [ ] Year boundaries are tested.
- [ ] Business holidays are tested.
- [ ] Schedule restart/missed-execution behavior is tested.
- [ ] API serialization has round-trip tests.
- [ ] CI does not rely only on developer-local timezone.

## 4.17 Operations

- [ ] Server clocks are synchronized.
- [ ] Timezone-data updates are part of patch management.
- [ ] Schedule diagnostics record zone + local time + resolved instant.
- [ ] Execution lag is monitored.
- [ ] Clock assumptions are documented.
- [ ] Production defaults do not depend on host-local timezone.

---

# 5. Canonical summary

The following rules define the Gold Standard 2026 baseline.

1. **Temporal meaning MUST be classified before choosing a data type.** Instant, date, local date-time, duration, calendar period, interval, and recurrence are different domain concepts.

2. **Instants MUST have canonical UTC meaning.** UTC is the correct storage/reference model for events that identify exact points on the timeline.

3. **“Store everything in UTC” MUST NOT be applied to values that are not instants.** Birthdays, due dates, holidays, and other date-only values MUST remain dates.

4. **An offset is not a timezone.** Future or historical civil-time behavior requiring timezone rules MUST use an IANA timezone identifier.

5. **Named timezone intent SHOULD be retained when it affects scheduling, legal interpretation, billing, business dates, or user expectations.**

6. **Timezone data MUST be maintained.** Civil-time rules can change through political decisions; timezone databases therefore form part of operational dependency management.

7. **Historical instants MUST remain fixed.** Later timezone-rule changes MUST NOT rewrite events that already occurred.

8. **Future civil intent MUST have an explicit timezone-change policy.** Systems MUST decide whether future legislation preserves the intended local time or original resolved instant.

9. **DST gaps and overlaps MUST be first-class cases.** Nonexistent and ambiguous local times MUST have explicit resolution policies.

10. **Twenty-four elapsed hours and one calendar day MUST NOT be treated as synonymous.**

11. **Calendar months and years MUST use calendar arithmetic.** They MUST NOT be reduced to fixed second counts.

12. **End-of-month and leap-day behavior MUST be specified for material business calculations.**

13. **Durations MUST have explicit units.** Ambiguous numeric timeout and duration fields SHOULD NOT exist.

14. **Elapsed in-process timing SHOULD use monotonic clocks.** Wall-clock time and elapsed-time measurement are separate concerns.

15. **Temporal intervals SHOULD use half-open `[start, end)` semantics.**

16. **Date-range queries SHOULD use next-boundary semantics rather than synthetic `23:59:59.999` values.**

17. **Business days MUST use an explicit business calendar and timezone.** Weekends and holidays MUST NOT be approximated with arithmetic shortcuts.

18. **Recurring civil schedules MUST preserve local time + named timezone.** A schedule such as 9 AM every day MUST NOT be permanently converted to one UTC hour.

19. **Cron MUST include timezone semantics.** A cron expression alone is insufficient for timezone-sensitive business scheduling.

20. **Scheduled systems MUST define DST duplicates, missing times, missed executions, restart recovery, and duplicate-execution behavior.**

21. **Tenant and user timezone preferences MUST be separate concepts.** Tenant timezone governs tenant business semantics; user timezone primarily governs personal display and user-specific schedules.

22. **Browser timezone MAY be a suggestion, not an authoritative preference.**

23. **The timezone resolution hierarchy SHOULD prefer event-specific timezone, then operation/user/tenant defaults, with UTC as the final fallback.**

24. **Database types MUST reflect semantics.** In PostgreSQL, instants normally use `timestamptz`; date-only values use `date`; original named timezone is stored separately when required.

25. **Indexes SHOULD query canonical temporal ranges directly.** Convert requested local boundaries to instants rather than transforming every stored timestamp during filtering.

26. **API instants MUST use RFC 3339-compatible ISO 8601 timestamps.** Canonical responses SHOULD prefer UTC `Z`.

27. **API dates MUST use `YYYY-MM-DD`.** Locale-dependent date formats MUST NOT appear in machine contracts.

28. **A local date-time without timezone MUST NOT be presented as an unambiguous instant.**

29. **Unix timestamps MUST declare their unit.**

30. **Fractional-second precision MUST be explicitly defined.**

31. **Machine serialization and human rendering MUST remain separate.** Machine formats are stable and unambiguous; human formats follow locale and timezone preferences.

32. **Human-visible temporal values SHOULD use established internationalization facilities rather than handwritten format strings.**

33. **Consequential timezone context MUST be visible and accessible.** It MUST NOT exist only as a tooltip or ambiguous abbreviation.

34. **shadcn/ui Calendar, Popover, Input, Select/Combobox, Button, Alert, Dialog and Form primitives form the component baseline for temporal UI.**

35. **Date picker state MUST preserve calendar-date semantics.** Selecting a date MUST NOT shift it by one day because of UTC conversion.

36. **Security expiry MUST use trusted server-side clocks.** Client clocks MUST NOT determine credential validity.

37. **Audit events MUST record canonical instants.** Later user or tenant timezone changes only affect rendering, not history.

38. **Current time SHOULD be injectable into domain logic.** Time-dependent tests MUST be deterministic.

39. **Temporal tests MUST cover multiple timezones, DST transitions, fractional-hour offsets, leap years, month boundaries, business holidays, scheduling recovery, and serialization.**

40. **CI MUST NOT rely solely on one implicit host timezone.**

41. **Temporal migrations MUST establish historical semantics before changing database types.** Unknown timezone context MUST NOT be silently guessed.

42. **The canonical rule is: store the semantic type you actually have, convert only at explicit boundaries, and never allow runtime-local timezone assumptions to become hidden business logic.**

This version is intentionally stricter than the common “store UTC, display local” slogan: that rule is correct for **instants**, but incomplete for dates, recurring schedules, business calendars, and future civil-time intent.
