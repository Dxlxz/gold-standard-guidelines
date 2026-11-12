---
id: "training-adoption"
title: "Training & Adoption"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["process", "training", "adoption", "change-management", "client-delivery"]
applies_to: ["team", "general"]
related: ["handover-transition", "stakeholder-engagement", "acceptance-testing", "onboarding", "support"]
created: "2026-11-12"
updated: "2026-11-12"
review_by: "2027-02-10"
chars: 21145
provenance: generated-batch

---

# Training & Adoption — Gold Standard 2026

## 1. Purpose

This standard defines how the people who will use a system are prepared for it, and how the team finds out
whether they are in fact using it to do their work. It binds every delivery in which people must change how they
work: a new system, a replacement, or a release that changes a main task.

The failure it prevents: a system that passes acceptance and is not used. Officers keep the old spreadsheet and
enter the data twice, or once, into the spreadsheet. The counter keeps the paper form "in case". The dashboard
shows activity because one clerk has been told to key everything in on Friday. Nothing is broken, so nothing is
reported, and the benefit that justified the project never arrives.

Training is one input to adoption. A person adopts a new way of working when they know why it is changing, want
or accept the change, know how to do their work in it, are able to do it at real speed, and find that the new
way is what the organisation expects and supports. Training addresses the third and part of the fourth.

**Out of scope:** transfer of the system to the team that will operate it (`handover-transition`); onboarding
engineers to a codebase (`onboarding`); the wording and help text inside the product (`content-ux-writing`); the
support process (`support`).

## 2. Rules

### 2.1 Plan adoption as part of the project

1. Every project that changes how people work **MUST** have an adoption plan, agreed with the sponsor, before the
   build is half complete. Rationale: adoption work started at go-live starts after people have formed their
   view of the system.
2. The adoption plan **MUST** begin from the stakeholder map: for each group of users, what changes in their
   daily work, what they lose, what they gain, and what they are likely to worry about. Example: under PPrISA the
   Pelan Pengurusan Perubahan begins with stakeholder analysis and an analysis of the current environment.
   Rationale: "users" is not a group; a counter clerk and a director experience a different change.
3. The plan **MUST** state the adoption outcomes as measures with targets and dates: for example, the share of
   cases processed in the system and not on paper, the time to complete the main task, the number of support
   requests per user. Rationale: adoption that is not measured is assumed.
4. The plan **MUST** name the person on the client side who is accountable for adoption. It **MUST NOT** be the
   delivery team. Rationale: only the client's management can change what is expected of the client's staff.
5. Adoption and training work **MUST** be estimated and scheduled in the project plan, including the users' time
   away from normal work. Rationale: unbudgeted training is delivered as a two-hour slide session.
6. The team **MUST** tell the sponsor in writing when a decision outside the team's control blocks adoption: the
   old system stays available with no end date, a policy still requires the paper form, staff are measured on
   the old process. Rationale: these are the commonest reasons a working system is not used, and the delivery
   team cannot fix them.

### 2.2 Tell people before you train them

7. Every affected group **MUST** be told, before training, why the change is happening, what will change for
   them, when, and what will not change. Rationale: people who first hear the reason in a training room spend
   the session deciding whether they agree.
8. That message **MUST** come from the client's own management, and **SHOULD** come from each group's direct
   superior. Rationale: staff judge a change by who stands behind it; a supplier announcing a client's change
   has no standing.
9. Communication **MUST** state honestly what will be harder at first and what the system will not do.
   Rationale: the first broken promise costs the credibility of every later message.
10. There **MUST** be a channel for questions and objections before go-live, and each **MUST** receive an answer.
    Recurring objections **MUST** be reported to the sponsor (`stakeholder-engagement` rule 32). Rationale:
    an objection that is not heard does not go away; it becomes a workaround.
11. The team **SHOULD** identify, with each unit's management, one or more users who will be trained first and
    will help their colleagues. Rationale: people ask the colleague at the next desk before they open a manual or
    a ticket.

### 2.3 Design training from the work

12. Training **MUST** be designed for each role from the tasks that role performs, in the order the work arrives.
    It **MUST NOT** be a tour of the menus. Rationale: people learn the system to do their job, and a menu tour
    teaches where things are and not what to do.
13. Training objectives **MUST** be written as things the trainee can do afterwards, each checkable: "can
    register an application with an incomplete document and issue the query letter". Rationale: an objective
    that cannot be checked cannot be said to be met.
14. Training **MUST** be hands-on: each trainee performs each main task of their role, in a training environment,
    with realistic data that is not real personal data. Rationale: watching a demonstration produces confidence
    without ability.
15. Training **MUST** cover the exceptions and what to do when something goes wrong: the wrong entry, the
    rejected payment, the system that is unavailable. Rationale: the main path is learnt in an hour; the first
    exception is what sends people back to paper.
16. Training **MUST** be delivered close to the day of first use; within two weeks is the default. Rationale:
    skills that are not used fade, and a session held two months early must be repeated.
17. Training **MUST** be accessible to every trainee: language, literacy, disability, shift pattern, location
    (`a11y-inclusive`). Rationale: the people who miss the session are often the ones who needed it most.
18. Each session **MUST** end with a check of ability, by task, and the result **MUST** be recorded per role.
    Rationale: attendance records show who sat in the room.
19. Trainees who did not reach the objectives **MUST** be offered further practice or support before they are
    expected to work in the system. Rationale: a person who fails in front of the public on day one does not
    try again.
20. Where the client's own staff will deliver later training, the team **MUST** train those trainers, observe
    each one deliver a session, and hand over the material in an editable form. Rationale: new staff arrive
    every month after the project team has gone.

### 2.4 Material and help at the moment of need

21. Every role **MUST** have reference material for its main tasks that can be used while doing the task: a
    one-page guide per task is the default; a full manual is the reference behind it. Rationale: nobody reads a
    manual with a member of the public waiting.
22. Material **MUST** show the accepted version of the system, in the users' language and with their terms, and
    **MUST** be updated when `change-control` approves a change that touches it. Rationale: a guide with last
    month's screen teaches people that the guide is wrong.
23. Material **MUST** be stored where users can find it without asking, and be editable by the client.
    Rationale: material on the trainer's laptop does not survive the project.
24. The system's own messages, labels and inline help **SHOULD** carry as much of the guidance as possible
    (`content-ux-writing`). Rationale: a task that needs training to complete is first a design finding.
25. Repeated questions in training **MUST** be reported to the product owner as findings about the design.
    Rationale: when ten people cannot find the same button, the button is the defect.

### 2.5 People who need help to use the service

26. For a service used by the public, the team **MUST** establish through research what help people need to use
    it, and the adoption plan **MUST** provide that help: by phone, in person, or through someone acting for
    them. Rationale: a digital-only service excludes the people with the least choice.
27. Staff who help the public use the service, at a counter or a call centre, **MUST** be trained and given their
    own guides before the public launch. Rationale: they are the service for everyone who cannot use it alone.
28. The old channel **MUST NOT** be closed until the measures in the adoption plan show that the people who used
    it can use the new one, or the accountable person has decided otherwise in writing. Rationale: closing a
    channel is a decision about people, and it belongs to a named person.

### 2.6 Go-live and the first weeks

29. Users **MUST** have support at the place of work in the first days of live use: a trained colleague, a
    member of the team on site, or a staffed line that answers. Rationale: the first real case decides whether a
    user trusts the system.
30. Every user **MUST** know, before go-live, where to ask for help and what happens after they ask (`support`).
    Rationale: a user who does not know where to ask asks nobody and goes back to the old way.
31. The team **MUST** review support requests at least weekly in the first month and classify each: defect,
    missing knowledge, missing feature, or unclear design. Rationale: each class has a different fix, and
    "user error" is not a class.
32. A workaround outside the system (a spreadsheet, a paper register, a chat group that carries the data)
    **MUST** be treated as a finding, investigated and reported to the sponsor. Rationale: a workaround is the
    users' own change request, written in the only form available to them.
33. The old system or process **MUST** have an agreed end date, or an explicit decision to run both, with an
    owner. Rationale: two ways of working, both tolerated, means the new one is optional.

### 2.7 Measure adoption

34. The adoption measures in the plan **MUST** be reported to the sponsor at go-live, at thirty days and at ninety
    days. Rationale: adoption problems show within weeks and are cheap to fix only then.
35. Measures **MUST** come from use of the system and from the work, not only from a satisfaction form:
    cases completed in the system, time on the main task, error and rework rates, support requests, remaining
    use of the old channel. Rationale: people can like the training and still not use the system.
36. Training **SHOULD** be evaluated at four levels: whether trainees found it useful, whether they acquired the
    skill, whether they apply it at work, and whether the intended result followed. Planning **SHOULD** start
    from the result and work back. Rationale: the first level is the easiest to collect and tells the least.
37. A group whose measures are below target **MUST** be asked why, in person, before more training is ordered.
    Rationale: more training fixes missing knowledge and nothing else; the cause may be awareness, willingness,
    ability at real speed, or what their superior expects.
38. Usage data **MUST NOT** be used to assess individual staff unless the client has told staff so in advance and
    it is lawful to do so. Reports to the sponsor **SHOULD** be by unit or role. Rationale: measurement that is
    felt as surveillance produces keyed-in numbers, not adoption (`privacy-data-governance`).

### 2.8 After the project

39. New staff **MUST** have a way to learn the system after the project ends: the trained trainers, the
    material, and a training environment that stays available. Rationale: staff turnover erases a one-time
    training within a few years.
40. Each release that changes a main task **MUST** come with a note to users, written for them, before the
    release, and an update to the guides. Rationale: a screen that changes without warning is reported as a
    fault.

## 3. Anti-patterns

| Anti-pattern | Why it fails | Instead |
|---|---|---|
| The one big session | Two hundred people, one projector, one afternoon, two months early | By role, hands-on, close to first use (rules 12, 14, 16) |
| The menu tour | Every screen is shown; nobody completes a case | Tasks in the order of the work (rule 12) |
| Attendance as evidence | The sheet is signed, so staff are "trained" | Check ability by task (rule 18) |
| Training as the fix | Low use is answered with another session | Ask why first (rule 37) |
| The supplier's announcement | Staff hear about their own reorganised work from a vendor | The client's management says why (rules 7, 8) |
| The 300-page manual | Complete, accurate and unopened | One page per task at the desk (rule 21) |
| The parallel spreadsheet | The system is "live" and the real register is in Excel | Workarounds are findings; the old way has an end date (rules 32, 33) |
| Digital only | The portal launches and the counter closes; some people cannot apply | Research the help needed; keep the channel until measured (rules 26, 28) |
| Happy sheets | "4.6 out of 5" on the feedback form; usage is 30% | Measure use and the work (rules 35, 36) |
| Dashboards about people | Usage reports name the slow officers; entries are now keyed in bulk | Report by unit; tell staff what is measured (rule 38) |

```text
✗ prohibited: "Training completed: 4 sessions, 186 attendees, satisfaction 4.6/5. Adoption: done."

✓ required:   Adoption report, day 30: Sistem e-Lesen
              Target: 90% of renewals decided in the system by day 30. Actual: 71%.
              By unit: Pelesenan HQ 94%; Cawangan Utara 88%; Cawangan Timur 31%.
              Training: 186 of 192 staff attended; 171 completed all tasks for their role in the check;
              15 had follow-up practice, 6 not yet trained (list with unit heads).
              Support requests: 143: 22 defects (all Low or Medium, 19 closed), 71 missing knowledge
              (48 about the query-letter step: guide rewritten, label changed under CR-021), 50 other.
              Finding: Cawangan Timur still records renewals in the old register. Cause, asked on site
              2 December: the branch's audit checklist still requires the register. Not a training gap.
              Decision needed from the Pengarah by 9 December: amend the checklist, or run both until
              the next audit cycle.
```

## 4. Checklist

- [ ] An adoption plan exists, agreed with the sponsor before the build was half complete.
- [ ] The plan describes, for each user group, what changes, what is lost, what is gained and the likely worries.
- [ ] Adoption measures have targets and dates, and a client-side person is accountable for adoption.
- [ ] Each group was told why, what, when and what will not change, by the client's management, before training.
- [ ] Questions and objections before go-live were answered, and recurring ones reported.
- [ ] Training is by role, from real tasks, hands-on, in a training environment without real personal data.
- [ ] Training covers exceptions and what to do when something goes wrong.
- [ ] Training took place within two weeks of first use, or the gap is recorded with a reason.
- [ ] Ability was checked by task and recorded; people who did not reach the objectives had follow-up.
- [ ] Client trainers were trained, observed delivering, and hold the editable material.
- [ ] Each role has a one-page guide per main task, current for the accepted version, where users can find it.
- [ ] For a public service: the help people need was researched and is provided; assisting staff were trained.
- [ ] Users have on-site or staffed support in the first days and know where to ask.
- [ ] Support requests were classified weekly in the first month.
- [ ] Workarounds outside the system were investigated and reported.
- [ ] The old system or process has an end date or a written decision to run both.
- [ ] Adoption measures were reported at go-live, thirty days and ninety days, from use and from the work.
- [ ] Usage reports do not assess individuals, or staff were told in advance.

## 5. Canonical summary

- Adoption is the outcome; training is one input. Plan both before the build is half complete.
- Start from each group: what changes for them, what they lose, what worries them.
- The client's management says why, before anyone is trained. The supplier cannot.
- Train by role, from real tasks, hands-on, with exceptions, close to first use.
- Check what people can do, not that they attended.
- One page per task at the desk; the manual is the reference behind it.
- For a public service, research and provide the help people need, and train the staff who give it.
- Support people at their place of work in the first days.
- A workaround outside the system is a finding. The old way needs an end date.
- Measure adoption from use and from the work, at go-live, thirty days and ninety days.
- When use is low, ask why before ordering more training.
- The most common mistake: counting attendance and calling it adoption.
- See also: `handover-transition`, `stakeholder-engagement`, `acceptance-testing`, `support`.

## Sources

Every source below was opened and read on 2026-11-12. "Read" names how much of it was read. A rule with no
source here is this standard's own judgement, and so is every number of days or weeks in the rules.

- **The Prosci ADKAR Model** — Prosci. <https://www.prosci.com/methodology/adkar>. Read: full page. Supports the
  Purpose and rule 37: Awareness, Desire, Knowledge, Ability, Reinforcement; the elements build on each other, and
  support goes to the earliest element where a person is blocked. This is a vendor's model. The page calls it
  research-based; the research itself was not read.
- **The Kirkpatrick Model** — Kirkpatrick Partners. <https://www.kirkpatrickpartners.com/the-kirkpatrick-model/>.
  Read: full page. Supports rule 36: four levels (Reaction, Learning, Behavior, Results), planned from Results
  backwards. This is also a vendor's model.
- **Metodologi PPrISA 2.0: Garis Panduan Pengurusan Projek ICT Sektor Awam** — Jabatan Digital Negara, Kementerian
  Digital, Versi 2.0 (the file name says "Versi Beta"), December 2024.
  <https://sqa.jdn.gov.my/images/pdfdocument/pprisa/PPrISA2_0VersiBetaDisember2024.pdf>. Read: full document, by
  question. Supports rules 1 and 2 (the Pelan Pengurusan Perubahan sets the strategy, programmes and activities
  for adoption by target group, starting from stakeholder analysis and an analysis of the current environment,
  and covers publicity and training) and rule 20 (training and Transfer of Technology so that the owner and
  users can use and master the product).
- **Templat Pengurusan Projek ICT Sektor Awam (PPrISA)** — Jabatan Digital Negara.
  <https://sqa.jdn.gov.my/index.php/en/templat-pengurusan-projek-ict-sektor-awam-pprisa>. Read: full page. Lists
  PPrISA09 Pelan Pengurusan Perubahan.
- **KRISA, Bab 7: Fasa Pelaksanaan** — Kejuruteraan Sistem Aplikasi Sektor Awam, MAMPU 2019, now Jabatan Digital
  Negara. <https://sqa.jdn.gov.my/images/pdfdocument/krisa/BAB7-KRISA-pelaksanaan.pdf>. Read: full chapter, by
  question. Supports rule 16 (completed user training is an entry criterion for final acceptance) and rule 21
  (the Manual Pengguna as a guide and reference: introduction, overview, functions, instructions, error
  handling).
- **Assisted digital support: an introduction** — GOV.UK Service Manual, last updated 18 December 2025.
  <https://www.gov.uk/service-manual/helping-people-to-use-your-service/assisted-digital-support-introduction>.
  Read: full page. Supports rules 26 and 27: research must establish what help people need; help is given by
  phone, in person or by webchat.
- **How the live phase works** — GOV.UK Service Manual, last updated 8 May 2019.
  <https://www.gov.uk/service-manual/agile-delivery/how-the-live-phase-works>. Read: full page. Supports rule 27
  (support staff understand the online service before it goes live) and rule 31 (continue to review how the
  service performs).
- **The challenges in implementing digital change** — National Audit Office (UK), 21 July 2021.
  <https://www.nao.org.uk/insights/the-challenges-in-implementing-digital-change/>. Read: report page (background,
  scope, conclusions), not the full report. Used as a check on this standard's own claims: the report says there
  is rarely a single reason for failure, and its six lesson areas (aims and risk, commercial partners, legacy
  systems and data, capability, delivery methods, funding) do not include user adoption.

### Not verified

- No source read here shows that poor adoption is the leading cause of failed IT projects. This standard does
  not make that claim. Widely quoted failure percentages (for example the Standish CHAOS figures) were not read
  and are not used.
- Rule 16 (train close to first use) rests on practice. The research on forgetting that is usually quoted for it
  was not read for this standard, and what was found about it concerns memory experiments, not workplace
  software training.
- Kotter's eight steps and other change models were not read and are not used.
- The thirty and ninety days in rule 34 have no source.
