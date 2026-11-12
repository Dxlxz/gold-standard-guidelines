---
id: "requirements-discovery"
title: "Requirements & Discovery"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["process", "requirements", "discovery", "user-research", "client-delivery"]
applies_to: ["team", "general"]
related: ["stakeholder-engagement", "change-control", "acceptance-testing", "dor-dod", "estimation"]
created: "2026-11-12"
updated: "2026-11-12"
review_by: "2027-02-10"
chars: 20090
provenance: generated-batch

---

# Requirements & Discovery — Gold Standard 2026

## 1. Purpose

This standard defines how a delivery team finds out what a system must do before it commits to building it, and
how it writes that down so the client, the team and the testers read the same thing. It binds every project and
every new module, from the first conversation to the agreed baseline.

The failure it prevents: a team builds exactly what the document says, and the document was wrong. The usual
causes are a solution chosen before the problem was understood, requirements written from a meeting room and not
from the work, and words such as "fast", "user-friendly" and "secure" that every reader interprets differently.

Two terms. A **need** is something a person must be able to do or know to reach their outcome. A **requirement**
is a statement the system must satisfy, that can be checked, and that traces to a need, a rule or a constraint.

**Out of scope:** who the stakeholders are and who decides (`stakeholder-engagement`); what happens when a
requirement changes after the baseline (`change-control`); when a single work item is ready to build (`dor-dod`);
how the work is sized (`estimation`); how the result is accepted (`acceptance-testing`).

## 2. Rules

### 2.1 Start from the problem

1. A project **MUST** begin with a written problem statement agreed with the sponsor: who has the problem, what
   happens today, what it costs, and what will be different when it is solved. Rationale: a team that cannot state
   the problem cannot tell whether it solved it.
2. When the client arrives with a solution ("we need a portal"), the team **MUST** restate it as the problem that
   solution is meant to solve, and confirm the restatement with the sponsor. Rationale: the solution is one answer;
   the problem decides whether it is the right one.
3. The problem statement **MUST** list what is not part of the problem. Rationale: unstated exclusions return as
   disputes about scope.
4. The team **MUST** write down the outcome measures that will show success, with the current value where it can
   be measured. Rationale: "improve the process" cannot be accepted or rejected.
5. Discovery **MUST** end with an explicit decision by the accountable person: proceed, proceed with a smaller
   scope, or stop. Rationale: a discovery that can only say yes is a formality.
6. The team **MUST NOT** start building production features before that decision. A throwaway prototype to test an
   assumption is allowed and **MUST** be labelled as one. Rationale: code written during discovery hardens the
   first idea.

### 2.2 Learn from the people who do the work

7. The team **MUST** research with actual or likely users of each role on the stakeholder map, and **MUST NOT**
   substitute the client's managers, the client's ICT staff or the team's own members for them. Rationale: each of
   those groups describes the work as it is designed, not as it is done.
8. For an existing process, the team **MUST** observe the work being done at least once for each role, in the
   place where it is done. Rationale: people leave out the steps they no longer notice, and those steps are the
   requirements.
9. The team **MUST** collect the real artefacts of the work: forms, letters, spreadsheets, registers, the report
   the director asks for each month. Rationale: the artefacts show the data, the rules and the exceptions that
   interviews miss.
10. A round of qualitative research **SHOULD** have four to eight participants for each distinct role. More rounds
    **SHOULD** be preferred over a larger round. Rationale: small rounds repeated find more than one large round,
    and a role with one participant is one opinion.
11. Research **MUST** include people who find the work or the technology hard: new staff, staff at a small or
    remote office, people with a disability, people with low confidence in digital tools. Rationale: a design
    tested only with expert users fails everyone else.
12. Each person who writes requirements or designs screens **SHOULD** observe research directly, at least two
    hours in every six weeks of discovery and design. Rationale: a summary loses the detail that changes a design.
13. The team **MUST** record, for each finding, how it is known: observed, said by a user, said by someone about
    users, or assumed. Rationale: an assumption written in the same list as an observation is soon treated as
    one.

### 2.3 Write requirements that can be checked

14. Each requirement **MUST** have a unique, stable identifier that is never reused. Rationale: tests, changes and
    disputes all point at requirements by identifier.
15. Each requirement **MUST** state one thing. A requirement with "and" that can be half met **MUST** be split.
    Rationale: a compound requirement cannot be passed or failed.
16. Each requirement **MUST** be verifiable: a named person can decide, by a test or an inspection, whether the
    system meets it. Rationale: a requirement that cannot be checked is a wish.
17. A requirement **MUST NOT** use unmeasured words: fast, easy, user-friendly, robust, flexible, secure, modern,
    seamless, as appropriate, where possible. It states the measure. Rationale: these words pass review because
    everyone agrees with them and nobody agrees what they mean.
18. A requirement **MUST** state what is needed and **SHOULD NOT** state how to build it, unless the "how" is a
    real constraint, in which case it is recorded as a constraint with its source. Rationale: a design decision
    written as a requirement cannot be improved without a change request.
19. Each functional requirement **MUST** carry acceptance criteria before it enters the baseline. Given, When,
    Then is the default form for behaviour; a rule list is the default for calculations and validations.
    Rationale: the acceptance criteria are the requirement in the form a tester and a user can both read.
20. Each requirement **MUST** name its source: the need, the user role, the law or policy clause, the contract
    clause, or the integration it comes from. Rationale: a requirement with no source cannot be questioned,
    prioritised or removed.
21. A user story **SHOULD** be independent, negotiable, valuable, estimable, small and testable (INVEST), and
    **MUST** name a real role from the stakeholder map, not "user". Rationale: "as a user" hides the conflict
    between roles.

### 2.4 Rules, data, quality and constraints

22. Business rules **MUST** be written once, in a rules list, each with its source and its owner on the client
    side, and referenced from the requirements that use them. Rationale: the same rule copied into ten
    requirements changes in nine.
23. The requirements **MUST** cover the exceptions as well as the main path: the incomplete application, the
    returned payment, the officer on leave, the record that was entered wrongly last year. Rationale: the main
    path is a small part of the work and a smaller part of the effort.
24. Quality requirements **MUST** be stated with numbers and conditions for at least: performance and capacity,
    availability and recovery (`backup-disaster-recovery`), security and access (`security`), accessibility
    (`a11y-inclusive`), languages, browsers and devices, audit trail (`audit-logging`), data retention and
    privacy (`privacy-data-governance`). "Not applicable" **MUST** be written with a reason. Rationale: quality
    requirements left out are still expected, and are found at acceptance.
25. Constraints **MUST** be listed with their source and marked hard or soft: laws, the client's ICT policy and
    hosting rules, the systems that must be integrated, the budget ceiling, fixed dates. Rationale: a soft
    constraint treated as hard removes good options; a hard one treated as soft removes the project.
26. Each integration **MUST** name the other system's owner, the interface, the data exchanged, who is the
    source of truth for each item, and whether a test environment exists. Rationale: integrations are where the
    team depends on people who are not on the project.
27. Data to be migrated **MUST** be profiled during discovery: volume, quality, duplicates, and the owner who will
    decide what is corrected and what is left behind. Rationale: data quality is discovered either now or during
    go-live week.

### 2.5 Assumptions, unknowns and priority

28. The team **MUST** keep an assumptions log: the assumption, what breaks if it is false, how it will be tested,
    and by when. Rationale: every plan rests on assumptions; the log makes them visible before they fail.
29. The riskiest assumptions **MUST** be tested first, before the baseline where that is possible. Rationale: the
    cheapest time to be wrong is before the estimate is signed.
30. Open questions **MUST** each have an owner on the client side and a date. A requirement that depends on an
    open question **MUST** be marked. Rationale: an unanswered question is answered by the developer, silently.
31. Requirements **MUST** be prioritised by the accountable person into at least three levels, and the lowest
    level **MUST** be non-empty. Rationale: when everything is a must, the team decides the priority, at the
    moment the time runs out.

### 2.6 Baseline, traceability and review

32. The requirements **MUST** be reviewed by the people who will use the system, run it, test it and build it,
    before the baseline. Rationale: each group finds a different kind of defect, and a defect found here costs
    a conversation.
33. A requirements review **MUST** walk through scenarios with users, using a prototype or the real artefacts.
    Sending a document for comment is not a review. Rationale: people cannot see what is missing from a list;
    they can when they try to do their work with it.
34. The baseline **MUST** be approved in writing by the accountable person for scope, with a version number and a
    date. Rationale: the baseline is what `change-control` measures every later request against.
35. Where the client's framework names its requirement documents, the team **MUST** use those names and
    templates. Example: a Malaysian public-sector project under KRISA delivers a Spesifikasi Keperluan Bisnes
    (BRS) and a Spesifikasi Keperluan Sistem (SRS). Rationale: the client's approval bodies approve documents
    they recognise.
36. The team **MUST** keep a traceability record from each need to its requirements, and from each requirement to
    its acceptance tests. Rationale: it answers the two questions asked at acceptance: "where is my need?" and
    "why was this built?".
37. A requirement **MUST NOT** be removed from the baseline silently. It is withdrawn through `change-control`
    with a reason. Rationale: a requirement that disappears is remembered by the person who asked for it.

### 2.7 Research records and consent

38. Research participants **MUST** be told what the session is for, how the notes or recordings will be used, and
    that they can stop. Recording **MUST** have their consent. Rationale: staff who think they are being assessed
    describe the official process.
39. Research notes **MUST NOT** be used to assess a participant's performance, and findings **MUST** be reported
    without names unless the participant agrees. Rationale: one breach ends honest answers for the rest of the
    project (`privacy-data-governance`).

## 3. Anti-patterns

| Anti-pattern | Why it fails | Instead |
|---|---|---|
| Solution first | "Build us an app" is accepted as the requirement; the problem is found after go-live | Restate as a problem and confirm it (rules 1, 2) |
| Requirements by workshop only | The room describes the official process; the exceptions stay at the counter | Observe the work, collect the artefacts (rules 8, 9) |
| The manager as the user | The approver's needs are met; the clerk's 200 daily entries take twice as long | Research with each real role (rule 7) |
| Adjective requirements | "The system shall be user-friendly and fast" passes review and fails acceptance | State the measure (rules 16, 17) |
| Everything is a must | Priority is decided by whatever is unfinished on the last day | A non-empty lowest level (rule 31) |
| The copied tender specification | Requirements are pasted from the tender; nobody has checked them against the work | Trace each to a need or a rule (rule 20) |
| Sign-off by email attachment | A 90-page document is "approved" unread | Scenario walkthrough with users (rule 33) |
| Assumption as fact | "The agency will provide the API" sits in the plan until integration week | Assumptions log, riskiest first (rules 28, 29) |
| Quality requirements later | Performance, accessibility and audit trail are found at acceptance | Numbers and conditions at baseline (rule 24) |

```text
✗ prohibited: "REQ-031 The system shall process applications quickly and be easy for officers to use."

✓ required:   "REQ-031 An officer can record a decision on an application.
               Source: need N-07 (processing officer); Peraturan 12(3).
               Given an application in status 'Lengkap' assigned to the officer,
               When the officer selects Lulus or Tolak and enters a reason of at least 10 characters,
               Then the status changes, the applicant is notified, and the decision, officer and time are
               written to the audit trail.
               Quality: the decision screen opens in under 2 seconds at the 95th percentile with 150
               concurrent officers (NFR-04)."
```

## 4. Checklist

- [ ] A problem statement exists, is agreed with the sponsor, and lists what is out of the problem.
- [ ] Outcome measures are written, with current values where measurable.
- [ ] Each role on the stakeholder map has dated research with real users, and the work was observed at least once.
- [ ] Findings are marked observed, said, reported or assumed.
- [ ] Every requirement has an identifier, one statement, a source and acceptance criteria.
- [ ] No requirement uses an unmeasured word.
- [ ] Business rules are in one list with a source and a client-side owner.
- [ ] Quality requirements have numbers, or "not applicable" with a reason, for every area in rule 24.
- [ ] Constraints are listed with source and marked hard or soft.
- [ ] Each integration names the owner, interface, data, source of truth and test environment.
- [ ] Migration data has been profiled and has an owner for correction decisions.
- [ ] The assumptions log and the open questions each have owners and dates.
- [ ] Priorities have at least three levels and the lowest is not empty.
- [ ] The baseline has a version, a date and the written approval of the accountable person for scope.
- [ ] Traceability exists from need to requirement to acceptance test.
- [ ] Discovery ended with a recorded proceed, reduce or stop decision.

## 5. Canonical summary

- Agree the problem before the solution. Write what is out of the problem.
- Learn from the people who do the work, where they do it: observe, collect the real forms and reports.
- Four to eight participants per role per round; include the people who find it hard.
- One requirement, one statement, one identifier, one source, and acceptance criteria that a user can read.
- No unmeasured words. "Fast" is a number and a condition.
- Rules in one list. Exceptions, quality requirements, constraints, integrations and migration data are
  requirements too.
- Keep an assumptions log and test the riskiest first.
- Priorities come from the accountable person, and something must be in the lowest level.
- Review by walking through scenarios with users; then baseline with a version and a written approval.
- The most common mistake: writing requirements from a meeting room and a tender document.
- See also: `stakeholder-engagement`, `change-control`, `acceptance-testing`, `dor-dod`, `estimation`.

## Sources

Every source below was opened and read on 2026-11-12. "Read" names how much of it was read. A rule with no
source here is this standard's own judgement.

- **How the discovery phase works** — GOV.UK Service Manual, last updated 21 June 2021.
  <https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works>. Read: full page. Supports
  rules 1 to 6 (understand the problem, the users and the constraints; do not start building; stop if there is no
  viable service) and rule 25. The page gives a typical length of four to eight weeks.
- **Learning about users and their needs** — GOV.UK Service Manual, last updated 23 March 2017.
  <https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs>. Read: full page. Supports the
  definition of a need, rules 7 to 9 (review existing evidence, interview and observe actual or likely users),
  rule 18 (problems, not solutions) and rule 36 (keep track of which needs relate to each story).
- **Plan user research for your service** — GOV.UK Service Manual, last updated 15 October 2026.
  <https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service>. Read: full page. Supports
  rule 10 (four to eight participants a round for interviews and usability tests; a round at least every two
  weeks), rule 11 (disabled users and people who need support in every round) and rule 12 (two hours of
  observation every six weeks for each team member).
- **How Many Test Users in a Usability Study?** — Jakob Nielsen, Nielsen Norman Group, 3 June 2012.
  <https://www.nngroup.com/articles/how-many-test-users/>. Read: full article. Supports rule 10: five users for a
  qualitative test, with stated exceptions (about 20 for quantitative studies, 15 per group for card sorting, a
  few per group when user groups differ). This is evidence about usability tests, not about interviews.
- **ISO/IEC/IEEE 29148:2018, Systems and software engineering: Life cycle processes: Requirements engineering** —
  ISO, IEC and IEEE, 2018; a draft revision is in progress. <https://www.iso.org/standard/72089.html>. Read:
  catalogue page and abstract only. The standard is paywalled. Rules 14 to 18 follow the commonly cited
  characteristics of a good requirement (singular, unambiguous, verifiable, necessary); the clause text that
  defines them was not read.
- **INVEST in Good Stories, and SMART Tasks** — Bill Wake, xp123.com, 2003.
  <https://xp123.com/invest-in-good-stories-and-smart-tasks/>. Read: full article. Supports rule 21.
- **Introducing BDD** — Dan North, 2006. <https://dannorth.net/introducing-bdd/>. Read: full article. Supports
  rule 19 (Given some context, When an event occurs, Then ensure some outcomes).
- **Ringkasan Eksekutif KRISA (Kejuruteraan Sistem Aplikasi Sektor Awam)** — Jabatan Digital Negara, first
  published by MAMPU in 2019. <https://sqa.jdn.gov.my/index.php/ms/ringkasan-eksekutif-krisa>. Read: full page.
  Supports rule 35 (D02 Spesifikasi Keperluan Bisnes, D03 Spesifikasi Keperluan Sistem). A KRISA 2.0 exists and
  renumbers some documents; it was not read for this standard.
- **The challenges in implementing digital change** — National Audit Office (UK), 21 July 2021.
  <https://www.nao.org.uk/insights/the-challenges-in-implementing-digital-change/>. Read: report page (background,
  scope, conclusions), not the full report. Supports rules 1 and 2: the report finds a consistent pattern of
  underperformance, often because technology decisions were taken before the business problem was understood.
- **Contracting for Agile Guidance Note** — UK Digital, Data and Technology Playbook, 20 June 2023.
  <https://www.gov.uk/government/publications/the-digital-data-and-technology-playbook/contracting-for-agile-guidance-note-html>.
  Read: full page. Supports rule 31 (requirements prioritised by the Product Owner, for example with MoSCoW).

### Not verified

- BABOK Guide (IIBA): only the task titles are public. Nothing here is taken from it.
- The numbers in rule 10 come from guidance on research rounds and usability tests. No source read here gives a
  number of participants for requirements discovery as such.
