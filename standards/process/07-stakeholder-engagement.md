---
id: "stakeholder-engagement"
title: "Stakeholder Engagement & Communication"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["process", "stakeholders", "communication", "client-delivery"]
applies_to: ["team", "general"]
related: ["requirements-discovery", "change-control", "governance", "documentation", "privacy-data-governance"]
created: "2026-11-12"
updated: "2026-11-12"
review_by: "2027-02-10"
chars: 17568
provenance: generated-batch

---

# Stakeholder Engagement & Communication — Gold Standard 2026

## 1. Purpose

This standard defines how a delivery team identifies the people a system affects, agrees who decides what, and
keeps them informed. It binds every project delivered for a client, internal or external, from the first week to
handover.

The failure it prevents: a system built to the specification that the client's IT team refuses to host, that
officers quietly do not use, or that a sponsor learns is late from someone else. These failures are rarely
technical. They come from a person nobody asked, a decision nobody owned, or a promise nobody wrote down.

A stakeholder is any person or group that pays for the system, decides about it, uses it, runs it, must comply
because of it, or is affected by what it decides. That includes people who have no power over the project.

**Out of scope:** how needs become requirements (`requirements-discovery`); how a change to agreed scope is decided
(`change-control`); engineering governance inside the delivery organisation (`governance`); the format of technical
documents (`documentation`).

## 2. Rules

### 2.1 Identify and map

1. Every project **MUST** have a stakeholder map before requirements work starts, and no later than ten working
   days after kick-off. Rationale: the cost of a missed stakeholder grows with every decision made without them.
2. The map **MUST** name at least one real person or team for each of these seats, or state "none: confirmed with
   the sponsor": the sponsor (decision owner), each end-user role, the team that will run the system after
   handover, procurement or contract administration, compliance (legal, data protection, audit), the owner of every
   system this one integrates with, the owner of the data, support and training, and the people the system serves
   or decides about. Rationale: a fixed list of seats finds the people a brainstorm forgets.
3. For each entry the map **MUST** record: what the person or team decides or approves, what they care about most,
   any position they have stated with its source and date, and whether they have been asked about the current
   decision. Rationale: a name with no interest and no decision right cannot be acted on.
4. The map **MUST** record influence over the project and interest in its outcome separately for each entry.
   Rationale: people with high interest and low influence, usually end users and the public, decide whether the
   system works and cannot stop the project; they need a deliberate channel.
5. End-user roles and affected people **MUST** appear on the map even when they have no formal say. Rationale: they
   carry the cost of every decision.
6. The delivery lead **MUST** review the map at each phase boundary and whenever a named person changes role.
   Rationale: a map is correct on the day it is written.
7. A new stakeholder **MUST** be briefed within five working days of being identified: the goal, the current scope,
   the decisions already made, and what is expected of them. Rationale: a late arrival reopens closed decisions
   unless they know why each was made.

### 2.2 Decision rights

8. Each type of decision **MUST** have exactly one accountable person, named in writing: scope, budget, acceptance,
   go-live, data use, security risk acceptance, and public communication. Rationale: two accountable people is
   none.
9. The team **MUST** record who is responsible for the work, who is accountable, who is consulted before, and who is
   informed after, for each deliverable that needs a client decision. A RACI table is the default form.
   Rationale: "the client" is not a person and cannot approve anything.
10. The team **MUST NOT** treat agreement from an end user, a technical contact or a friendly manager as a decision
    that belongs to the accountable person. Rationale: an approval from the wrong person is void on the day it is
    challenged.
11. The map **MUST** state an escalation path with a time limit for each level. Rationale: a blocked decision with
    no path waits for the next steering meeting.
12. Where the client's own project framework defines governance bodies, the map **MUST** use the client's names
    and terms of reference for them. Example: a Malaysian public-sector project under PPrISA has a Jawatankuasa
    Pemandu Projek, a Jawatankuasa Teknikal Projek and a Pasukan Projek, each with a different chair. Rationale:
    the client's bodies hold the real authority; a parallel structure has none.

### 2.3 Communication plan

13. Every project **MUST** have a written communication plan agreed with the sponsor: for each stakeholder or
    group, what they receive, how often, through which channel, who sends it, and how the plan itself is updated. Rationale: communication that
    depends on memory stops when the team is busy, which is when it matters.
14. The sponsor **MUST** receive a status report at an agreed interval of no more than two weeks. Rationale: two
    weeks is the longest a sponsor can be out of date and still correct course cheaply.
15. A status report **MUST** state: what was completed, what comes next, each risk or issue with its owner, each
    decision needed from the reader with a date, and the current forecast against the agreed dates
    (`estimation`). Rationale: a report that asks for nothing and forecasts nothing is a diary.
16. A status report **MUST** use the reader's words for their own work and **MUST NOT** rely on engineering terms
    the reader has not been taught. Rationale: a sponsor who cannot follow the report cannot act on it.
17. A forecast in a report **MUST** be the team's honest current forecast. A status colour **MUST** follow written
    thresholds agreed in the plan. Rationale: a green status the week before a missed date destroys trust in every
    later report.
18. News that changes a date, a cost or the scope **MUST** reach the accountable person within one working day of
    the team knowing it, without waiting for the next report. Rationale: the sponsor has their own superiors to
    tell, and needs the time.
19. Each steering or review meeting **SHOULD** end with the list of decisions made and the actions, owners and dates
    read back. Rationale: people leave the same meeting with different outcomes in mind.

### 2.4 Record of decisions and commitments

20. The project **MUST** keep one decision log that every stakeholder on the map can read: the decision, who made
    it, the date, the options that were rejected and why. Technical decisions follow `adr`. Rationale: the log is
    how a decision survives staff turnover on both sides.
21. Minutes of a meeting where a decision or commitment was made **MUST** be sent to the attendees within two
    working days, with actions, owners and dates. Rationale: unrecorded agreements are remembered differently by
    each side.
22. An agreement made verbally or in chat **MUST** be confirmed in writing in the agreed channel within two working
    days, and is not a commitment until then. Rationale: chat is not a record, and the person who agreed may not
    hold the decision right.
23. Only the delivery lead, or a person the delivery lead names, **MUST** commit the team to a date, a cost or a
    change of scope. Rationale: a promise made by an engineer in a meeting binds the whole team.
24. A commitment the team can no longer keep **MUST** be withdrawn explicitly, to the person it was made to, with
    the new forecast. Rationale: a silent slip is discovered at the worst moment.

### 2.5 End users and affected people

25. The team **MUST** engage end users directly, in their place of work where possible, and not only through their
    managers. Rationale: a manager describes the process as designed; users follow the process as practised.
26. Each end-user role on the map **MUST** be consulted at least once in every phase: discovery, design, build,
    acceptance. The form is defined in `requirements-discovery` and `acceptance-testing`. Rationale: a role that
    first sees the system at training has no way to change it.
27. For a system that serves the public or decides about a person, the map **MUST** state how the people affected
    are represented: direct research with them, a representative body, or evidence such as complaint and appeal
    records. Rationale: they are not in the room and will not be heard by default.
28. Output from a simulated stakeholder, including an AI persona, **MUST NOT** be recorded as a stakeholder's
    position or consent. It is a hypothesis to test with the real person. Rationale: a model wrote the persona,
    so its agreement is evidence about the model and not about the person.
29. Engagement **MUST** be accessible to the people engaged: language, literacy, disability, working hours and
    location (`a11y-inclusive`). Rationale: a session held in the wrong language at the wrong time selects for
    the people who needed it least.

### 2.6 Conflict and change of people

30. When two stakeholders want incompatible things, the team **MUST** state the conflict and the options to the
    accountable person, and **MUST NOT** resolve it silently in the design. Rationale: a compromise nobody chose
    satisfies nobody and has no owner.
31. When the sponsor or another accountable person leaves, the team **MUST** confirm the successor in writing and
    walk them through the decision log within ten working days. Rationale: a new sponsor is not bound, in practice,
    by decisions they have never seen.
32. A stakeholder who opposes the project **SHOULD** be met early and their objection recorded in their own words.
    Rationale: an objection that is heard can be designed for; one that is avoided returns at acceptance.

### 2.7 Records about people

33. The stakeholder map **MUST** hold only a person's name, role, organisation, decision rights and positions they
    stated in a work setting, each with its source. It **MUST NOT** hold opinions about the person, or personal
    details. Rationale: the map is shared, and it is personal data (`privacy-data-governance`).
34. The map and the decision log **MUST** be stored where the project's documents live, with access limited to the
    project. Rationale: a map in one person's notebook is lost when they leave.

## 3. Anti-patterns

| Anti-pattern | Why it fails | Instead |
|---|---|---|
| "The client wants…" | Nobody can name who decided, so nobody can confirm or reverse it | Name the accountable person (rule 8) |
| Sponsor-only engagement | The system fits the sponsor's picture of the work, not the work | Engage each role directly (rules 25, 26) |
| Watermelon status: green outside, red inside | The first honest report arrives with the missed date | Written thresholds and an honest forecast (rule 17) |
| The hallway agreement | Each side remembers a different scope | Confirm in writing in two working days (rule 22) |
| The friendly approver | A technical contact says yes; the Contract Administrator says no at acceptance | One accountable person per decision (rules 8, 10) |
| The stakeholder discovered at go-live | The IT unit, auditor or neighbouring team blocks the launch | Fixed list of seats in the first ten days (rules 1, 2) |
| Persona as evidence | An AI persona's "approval" is reported as user support | Hypothesis only (rule 28) |
| Design by silent compromise | Two conflicting requests are merged into something neither asked for | Put the conflict to the accountable person (rule 30) |

```text
✗ prohibited: "Status: GREEN. Team is working hard on integration. Some challenges remain."
✓ required:   "Status: AMBER (forecast go-live 8 December, agreed 1 December).
               Done: officer approval screen, 14 of 14 acceptance scenarios pass.
               Next: integration with the payment gateway.
               Risk: the gateway test account is not issued. Owner: ICT Unit. Needed by 20 November.
               Decision needed from you by 18 November: accept go-live on 8 December, or remove batch printing."
```

## 4. Checklist

- [ ] A stakeholder map exists, dated within ten working days of kick-off, and every seat in rule 2 has a name or
      "none: confirmed with the sponsor".
- [ ] Each map entry records decision rights, main interest, stated positions with source and date, and influence
      and interest.
- [ ] One accountable person is named in writing for scope, budget, acceptance, go-live, data use, security risk
      acceptance and public communication.
- [ ] A communication plan lists, per stakeholder, what, how often, which channel and who sends it.
- [ ] The last status report is no more than two weeks old and contains completed work, next work, risks with
      owners, decisions needed with dates, and a forecast.
- [ ] The status thresholds are written in the plan.
- [ ] The decision log has an entry for every decision in the last steering minutes.
- [ ] Minutes of the last decision meeting were sent within two working days.
- [ ] Every end-user role on the map has a dated engagement in the current phase.
- [ ] For a public-facing system, the map states how affected people are represented.
- [ ] No entry in the map or the log records a simulated persona's view as a person's position.
- [ ] The map holds no personal detail beyond name, role, organisation, decision rights and stated positions.

## 5. Canonical summary

- Map the people in the first ten working days, from a fixed list of seats: who pays, decides, uses, runs,
  complies, integrates, owns the data, supports, and is affected.
- One accountable person per decision type, named in writing. "The client" is not a person.
- A written communication plan; a status report at least every two weeks that states done, next, risks, decisions
  needed and an honest forecast.
- Bad news reaches the accountable person within one working day.
- One decision log. Verbal and chat agreements are confirmed in writing within two working days.
- Engage end users directly and in every phase. People who are affected but absent get an explicit channel.
- A simulated persona is a hypothesis, never a position or consent.
- Conflicts between stakeholders go to the accountable person; the team does not settle them in the design.
- The most common mistake: treating the sponsor's view, or a friendly contact's yes, as everyone's.
- See also: `requirements-discovery`, `change-control`, `acceptance-testing`, `handover-transition`,
  `training-adoption`.

## Sources

Every source below was opened and read on 2026-11-12. "Read" names how much of it was read. A rule with no
source here is this standard's own judgement, and so is every number of days or weeks in the rules.

- **Metodologi PPrISA 2.0: Garis Panduan Pengurusan Projek ICT Sektor Awam** — Jabatan Digital Negara, Kementerian
  Digital, Versi 2.0 (the file name says "Versi Beta"), December 2024.
  <https://sqa.jdn.gov.my/images/pdfdocument/pprisa/PPrISA2_0VersiBetaDisember2024.pdf>. Read: full document, by
  question. Supports rule 12 (three governance bodies whose chairs must be different people), rule 13 (the Pelan
  Pengurusan Komunikasi lists who needs what, in which format, from whom, by which method, how often, and how the
  plan is updated), rules 14 and 15 (status reports at a frequency written in the project documents; PPrISA sets
  no fixed interval, so two weeks is this standard's number).
- **Templat Pengurusan Projek ICT Sektor Awam (PPrISA)** — Jabatan Digital Negara.
  <https://sqa.jdn.gov.my/index.php/en/templat-pengurusan-projek-ict-sektor-awam-pprisa>. Read: full page. Lists
  PPrISA06 Pelan Pengurusan Komunikasi and PPrISA16 and PPrISA17 Laporan Status/Kemajuan Projek.
- **Governance principles for agile service delivery** — GOV.UK Service Manual, last updated 23 May 2016.
  <https://www.gov.uk/service-manual/agile-delivery/governance-principles-for-agile-service-delivery>. Read: full
  page. Supports rules 8 and 11 (decisions at the right level, by the right people, when they are needed) and
  rule 25 (go and see for yourself).
- **Learning about users and their needs** — GOV.UK Service Manual, last updated 23 March 2017.
  <https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs>. Read: full page. Supports rules
  5 and 25 (users include the staff who provide the service and people who act for others).
- **What is P2?** — IAP2 Canada. <https://iap2canada.ca/what-is-P2>. Read: full page. Supports rule 27: the IAP2
  Spectrum has five levels (Inform, Consult, Involve, Collaborate, Empower) and the public's effect on the decision
  grows at each level. The table of promises for each level was not read.
- **Environmental Scanning: The Impact of the Stakeholder Concept** — A. L. Mendelow, ICIS 1981 Proceedings.
  <https://aisel.aisnet.org/icis1981/20>. Read: abstract only. The abstract relates scanning to the power of the
  stakeholder and the dynamism of the environment. The power and interest grid used in rule 4 is a later
  adaptation; cite it as "adapted from Mendelow (1981)".
- **ISO 21502:2020, Project, programme and portfolio management: Guidance on project management** — ISO, edition 1,
  2020, marked "to be revised". <https://www.iso.org/standard/74947.html>. Read: catalogue page and abstract only.
  The standard is paywalled; its clause text was not read and no rule here claims to restate it.

### Not verified

- No source read for this standard defines RACI. Rule 9 uses it as common practice.
- PMBOK Guide and PRINCE2 are paywalled and were not read. Nothing here is taken from them.
