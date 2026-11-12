---
id: "acceptance-testing"
title: "Acceptance Testing & Sign-off"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["process", "acceptance", "uat", "sign-off", "client-delivery"]
applies_to: ["team", "general"]
related: ["requirements-discovery", "change-control", "handover-transition", "testing", "dor-dod"]
created: "2026-11-12"
updated: "2026-11-12"
review_by: "2027-02-10"
chars: 21184
provenance: generated-batch

---

# Acceptance Testing & Sign-off — Gold Standard 2026

## 1. Purpose

This standard defines how a client decides that a system is acceptable: who tests, against what, in which
environment, how defects are judged, and what a signature means. It binds every delivery that a client must
accept, whether a whole system, a release or a module.

The failure it prevents: acceptance that is either a ceremony or a siege. In the ceremony, a few managers click
through a demo script, sign, and the real users find the problems in the first week of live use. In the siege,
nobody agreed what "accepted" means, so testing never ends, every defect is a blocker, and the signature is held
back as leverage. Both come from deciding the rules of acceptance during acceptance.

Acceptance testing is not the team's own testing. The team's unit, integration and system tests (`testing`) show
that the system was built correctly. Acceptance testing lets the client decide whether to accept it.

**Out of scope:** the team's own test levels and automation (`testing`); when one work item is done (`dor-dod`);
how a change found during acceptance is decided (`change-control`); what is handed over after acceptance
(`handover-transition`).

### Terms

| This standard | ISTQB term | KRISA term (Malaysian public sector) |
|---|---|---|
| User acceptance | User acceptance testing (UAT) | Ujian Penerimaan Pengguna (UAT): functions |
| Operational acceptance | Operational acceptance testing | Part of Ujian Penerimaan Provisional (PAT): functional and non-functional, in the real environment, before go-live |
| Contractual and regulatory acceptance | Contractual, regulatory acceptance testing | No separate term found in the chapters read |
| Pilot | Beta testing (closest form) | Pilot within PAT; one month is KRISA's example |
| Final acceptance | No direct term | Ujian Penerimaan Akhir (FAT): the agency's formal consent to enter production and the warranty period |

## 2. Rules

### 2.1 Decide the rules of acceptance first

1. Every requirement in the baseline **MUST** have acceptance criteria before it is built
   (`requirements-discovery` rule 19). Rationale: criteria written after the build describe what was built.
2. An acceptance test plan **MUST** be agreed with the client before acceptance testing starts, and **SHOULD** be
   agreed before the build is half complete. Rationale: the plan decides effort, environment and people on the
   client's side, and they need notice.
3. The plan **MUST** state: the scope and the baseline version under test, the forms of acceptance to be done,
   the environments, the test data, the testers by role, the schedule, the entry criteria, the exit criteria, the
   severity scale, how defects are reported and decided, and who signs. Rationale: each missing item becomes a
   dispute in the second week of testing.
4. The plan **MUST** be approved by the accountable person for acceptance, or by the body the client's framework
   names. Example: under KRISA the Jawatankuasa Pemandu Projek approves the PAT strategy. Rationale: a plan the
   signer has not approved does not bind the signature.
5. The exit criteria **MUST** be numbers and conditions, agreed in the plan. Rationale: "when the client is
   satisfied" has no end.

### 2.2 Entry criteria

6. Acceptance testing **MUST NOT** start until the team's own system testing of the same baseline is complete and
   its results are shared with the client. Rationale: users who find basic defects on the first day stop
   trusting the system and the team.
7. Before the start, the following **MUST** be true and recorded: the acceptance environment is ready and matches
   the plan, the test data is loaded, the scenarios and scripts are reviewed by the client, the testers are named
   and briefed, known defects are listed, and access for every tester works. Rationale: the first days of a
   test window are otherwise spent on logins.
8. A failed entry check **MUST** move the start date. It **MUST NOT** be resolved by starting anyway and counting
   the lost days as testing. Rationale: a shortened test window is the most common cause of a ceremony.

### 2.3 Who tests

9. User acceptance **MUST** be performed by people who will use the system in each role on the stakeholder map,
   not by their managers alone and not by the delivery team. Rationale: acceptance by someone who will not use
   the system accepts a different system.
10. The delivery team **MUST NOT** execute acceptance tests on the client's behalf. It **MAY** support the session:
    explain, record, reproduce. Rationale: a tester who built the feature tests what they meant, and independence
    is the point of this test level.
11. Operational acceptance **MUST** be performed with the team that will run the system: backup and restore,
    monitoring and alerts, deployment and rollback, user administration, and the support procedure. Rationale: a
    system its operators have never operated is not ready, whatever the users say.
12. Testers **MUST** be released from their normal work for the test sessions, and the plan **MUST** record their
    manager's agreement. Rationale: testing done between counter duties is not done.
13. Testers **MUST** be briefed before the first session: the purpose, how to run a scenario, how to report a
    defect, and that finding problems is the job. Rationale: untrained testers either report nothing or report
    preferences.
14. The sessions **MUST** be accessible to the testers: language, location, working hours, assistive technology
    (`a11y-inclusive`). Rationale: the testers who cannot attend are the users the system will fail.

### 2.4 What is tested

15. Each acceptance scenario **MUST** trace to requirements in the baseline, and every requirement in scope
    **MUST** be covered by at least one scenario or by a recorded reason. Rationale: untraced tests check the
    script writer's memory; uncovered requirements are accepted untested.
16. Scenarios **MUST** follow real work from start to finish across roles, using realistic data, and **MUST**
    include the exceptions named in the requirements. Rationale: a system passes screen by screen and fails
    case by case.
17. Testers **SHOULD** have unscripted time in each session to do their own real work in the system. Rationale:
    scripts find what the author expected; real work finds the rest.
18. Acceptance **MUST** cover the quality requirements with evidence: performance under the agreed load,
    accessibility, security test results, audit trail, reports, and each integration against the real or the
    agreed test system. Rationale: these are requirements, and they are the ones a demo cannot show.
19. Migrated data **MUST** be verified by the data owner: counts reconciled against the source, and a sample of
    records checked value by value. Rationale: a correct system with wrong data is a wrong system.
20. Test data **MUST NOT** contain real personal data unless the data owner has approved it in writing and the
    environment is protected to the same level as production (`privacy-data-governance`). Rationale: test
    environments are the usual place where personal data leaks.

### 2.5 Defects

21. Every defect **MUST** be recorded in one shared register with: an identifier, the scenario and step, the
    expected and the actual result, evidence, the environment and build, the reporter, a severity, a priority and
    a status. Rationale: a defect described in a chat message cannot be reproduced, retested or counted.
22. The severity scale **MUST** be defined in the plan with examples from this system. Default: **1 High** (a
    main task cannot be completed, data is lost or wrong, a security or legal requirement fails, no workaround);
    **2 Medium** (a task can be completed only with a workaround, or a secondary function fails); **3 Low**
    (cosmetic or wording, no effect on the task). Rationale: severity agreed in advance is a fact; severity
    argued at sign-off is a negotiation.
23. Severity **MUST** be proposed by the reporter and confirmed in a joint triage of client and team, held at
    least every two working days during testing. Rationale: one side alone rates everything High or everything
    Low.
24. Each finding **MUST** be classified in triage as a defect, a clarification or a change, under
    `change-control` rule 5. A change **MUST** leave the defect register and enter the change log. Rationale: an
    acceptance register full of new wishes never empties.
25. A fixed defect **MUST** be retested by the person who reported it or another tester of the same role, and the
    scenarios the fix could affect **MUST** be run again. Rationale: a fix confirmed only by the developer is
    not confirmed.
26. A defect **MUST NOT** be closed, downgraded or deferred without the agreement of the client's test lead,
    recorded in the register. Rationale: a register the client does not trust is replaced by a private
    spreadsheet.

### 2.6 Exit and sign-off

27. Testing ends when the exit criteria in the plan are met, and not before. The default criteria are: every
    planned scenario executed; the agreed pass rate reached; no open severity 1 or 2 defect; every open severity
    3 defect has an owner and a date; quality evidence under rule 18 accepted. Rationale: an end that is defined
    can be reached.
28. The pass rate and the number of open defects allowed **MUST** be numbers written in the plan. KRISA gives 100%
    of scenarios tested, 95% of test cases passed and all severity 1 and 2 defects fixed, retested and closed as
    an example; it is an example and not a mandatory limit. Rationale: the right threshold depends on what the
    system decides and for whom.
29. The team **MUST** issue an acceptance test report: the baseline version, what was tested and by whom, results
    by scenario, defects by severity and status, deviations from the plan, and the open items. Rationale: the
    signature needs something to refer to.
30. Acceptance **MUST** be a written decision by the accountable person for acceptance, on the report, with one of
    three outcomes: accepted, accepted with conditions, or not accepted. Example: under KRISA the pemilik projek
    validates the UAT and PAT termination reports. Rationale: a signature from anyone else, or on anything else,
    will be disowned.
31. "Accepted with conditions" **MUST** list each condition with an owner and a date, and **MUST** state what
    happens if a date is missed. Rationale: conditions with no date are waived in practice.
32. "Not accepted" **MUST** state which exit criteria failed. Rationale: a rejection without a reason cannot be
    acted on.
33. The team **MUST NOT** treat silence, live use or a payment as acceptance, unless the contract says so in
    those words. Rationale: implied acceptance is disputed exactly when it matters.
34. Acceptance **MUST NOT** be requested from, or given by, a person under pressure of a date alone. If the exit
    criteria are not met, the options go to the accountable person under `change-control`: move the date, reduce
    the scope, or accept with conditions. Rationale: a forced signature transfers no confidence and returns as a
    dispute.

### 2.7 Provisional and final acceptance

35. Where the system replaces live work, acceptance **SHOULD** be in two steps: provisional acceptance in the real
    environment with real users, with a pilot period, and final acceptance after that period. Rationale: some
    failures appear only under real volume, real data and a real month-end.
36. The pilot **MUST** have written success measures and a stated length before it starts. Rationale: a pilot
    with no measures always succeeds.
37. Before final acceptance, the following **MUST** be complete: provisional acceptance, the fixes it required,
    user training, data migration, the production environment, and the approved manuals. Rationale: these are
    the entry criteria KRISA sets for FAT, and each is a known cause of a failed go-live.
38. Final acceptance **MUST** state the date on which the warranty or support period starts, and **MUST** trigger
    the handover in `handover-transition`. Example: under KRISA the system owner issues the Sijil Penerimaan
    Akhir (FAC) to the supplier. Rationale: the day of acceptance starts obligations on both sides.

## 3. Anti-patterns

| Anti-pattern | Why it fails | Instead |
|---|---|---|
| UAT as demo | The team drives, the client watches and signs | Real users run the scenarios (rules 9, 10) |
| The manager's UAT | Three heads of unit test; forty clerks meet the system at go-live | Each role tests (rule 9) |
| Rules decided at the end | Pass rate and severity are argued with the deadline one day away | Plan approved first (rules 2 to 5) |
| System test in disguise | Users find crashes on day one because the team's testing was not finished | Entry criteria hold the start (rules 6, 8) |
| The squeezed window | Build is late, go-live is fixed, UAT shrinks from three weeks to four days | Move the date or cut scope by decision (rule 34) |
| Wishlist register | Every new idea is logged as a defect; the register never closes | Triage into defect, clarification, change (rule 24) |
| Closed by the developer | "Fixed" in the register, still broken at the counter | Retest by the reporter's role (rule 25) |
| Deemed acceptance | "You are using it, so you accepted it" | Written decision only (rules 30, 33) |
| Signature as hostage | Sign-off is withheld for items outside the baseline | Exit criteria decide (rules 27, 32) |

```text
✗ prohibited: "UAT completed successfully on 20 November. Client is happy. Please sign."

✓ required:   Acceptance Test Report: Sistem e-Lesen, baseline v1.3, build 2026.11.18
              Tested 3–18 November by 14 testers: 6 counter clerks, 4 processing officers, 2 approvers,
              2 ICT operations.
              Scenarios: 62 planned, 62 executed, 60 passed (96.8%; plan requires 95%).
              Defects: 31 raised: 4 High (4 closed), 11 Medium (11 closed), 16 Low (9 closed, 7 open with
              owner and date, Annex B). 5 findings moved to the change log (CR-015 to CR-019).
              Quality evidence: load test at 150 concurrent officers passed; accessibility audit: 2 Low open;
              restore test passed in 47 minutes (requirement: 2 hours).
              Deviation: payment gateway tested against the bank's test system, not production.
              Requested decision: accepted with conditions (Annex B by 5 December).
              Signed: ____________ (Pemilik Projek)   Date: ________
```

## 4. Checklist

- [ ] Every requirement in scope had acceptance criteria before it was built.
- [ ] The acceptance test plan is approved by the accountable person and names scope, baseline version, forms of
      acceptance, environments, data, testers, schedule, entry and exit criteria, severity scale and signer.
- [ ] Exit criteria are numbers.
- [ ] The team's system test results were shared before acceptance testing started.
- [ ] The entry check was recorded and passed.
- [ ] Testers include real users of every role, and the operations team for operational acceptance.
- [ ] Testers were released from normal work and briefed.
- [ ] Every scenario traces to requirements; every requirement in scope is covered or has a recorded reason.
- [ ] Quality requirements, integrations and migrated data have evidence.
- [ ] Test data holds no real personal data, or holds it with the data owner's written approval.
- [ ] Every defect is in one register with severity confirmed in joint triage.
- [ ] Findings that are changes are in the change log, not the defect register.
- [ ] Fixed defects were retested by a tester of the reporter's role.
- [ ] An acceptance test report exists and the decision is written on it by the accountable person.
- [ ] Conditions, if any, each have an owner, a date and a consequence.
- [ ] Final acceptance states the start date of the warranty or support period.

## 5. Canonical summary

- Decide the rules of acceptance before testing: plan, exit criteria, severity scale, signer.
- Acceptance testing starts only after the team's own testing is finished and shared.
- Real users of every role test; the operations team tests operations; the delivery team supports and does not
  test.
- Scenarios follow real work end to end, trace to requirements, and include exceptions, quality requirements,
  integrations and migrated data.
- One defect register; severity confirmed jointly; new wishes go to change control.
- A fix is confirmed by a tester, not by the developer.
- Testing ends when the written exit criteria are met.
- Acceptance is a written decision by the accountable person: accepted, accepted with conditions, or not
  accepted. Silence, use and payment are not acceptance.
- For a system that replaces live work: provisional acceptance, a measured pilot, then final acceptance, which
  starts the warranty period and the handover.
- The most common mistake: deciding what "accepted" means during the last week.
- See also: `requirements-discovery`, `change-control`, `handover-transition`, `testing`, `dor-dod`.

## Sources

Every source below was opened and read on 2026-11-12. "Read" names how much of it was read. A rule with no
source here is this standard's own judgement.

- **Certified Tester Foundation Level Syllabus v4.0.1** — ISTQB, 15 September 2024.
  <https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf>. Read: full document, by question.
  Supports the Terms table (user, operational, contractual and regulatory acceptance testing, alpha and beta
  testing), rule 9 (acceptance testing is ideally performed by the intended users), rules 5 to 8 and 27 (entry
  criteria are preconditions such as resources, testware and initial quality; exit criteria state what must be
  achieved), rule 10 (independent testers find different defects than authors), rule 21 (the fields of a defect
  report, including severity and priority) and rule 1 (scenario-oriented and rule-oriented acceptance criteria).
  The syllabus defines severity as the degree of impact and gives no scale; the three levels in rule 22 follow
  KRISA.
- **KRISA, Bab 6: Fasa Pengujian** — Kejuruteraan Sistem Aplikasi Sektor Awam, MAMPU 2019, now Jabatan Digital
  Negara. <https://sqa.jdn.gov.my/images/pdfdocument/krisa/BAB6-KRISA-pengujian.pdf>. Read: full chapter, by
  question. Supports the Terms table (UAT, PAT, FAT), rules 2 to 4 (Pelan Induk Pengujian, Pelan UAT/PAT; the
  Jawatankuasa Pemandu Projek approves the PAT strategy), rule 7 (UAT entry criteria: system test done, plan
  validated, environment ready, scripts validated, data loaded, team briefed), rules 9 and 11 (participants
  include the Pemilik Modul, Wakil Pengguna, Wakil pasukan operasi and Pengguna Pilot), rule 15 (traceability
  matrix), rule 22 (severity 1 Tinggi, 2 Sederhana, 3 Rendah), rule 28 (the example exit criteria), rules 29 and
  30 (Laporan Ujian Penerimaan; the pemilik projek validates the termination reports) and rule 35 (PAT in the
  real environment with a pilot of at least one month as the example).
- **KRISA, Bab 7: Fasa Pelaksanaan** — as above.
  <https://sqa.jdn.gov.my/images/pdfdocument/krisa/BAB7-KRISA-pelaksanaan.pdf>. Read: full chapter, by question.
  Supports rule 19 (migration checked by record counts and by statistical sampling of values), rule 37 (the FAT
  entry criteria) and rule 38 (FAT is the agency's formal consent to enter production and the Tempoh Jaminan; the
  system owner issues the Sijil Penerimaan Akhir).
- **Contracting for Agile Guidance Note** — UK Digital, Data and Technology Playbook, 20 June 2023.
  <https://www.gov.uk/government/publications/the-digital-data-and-technology-playbook/contracting-for-agile-guidance-note-html>.
  Read: full page. Supports rules 1 and 28: the contract should define quality thresholds through a Definition of
  Ready and a Definition of Done and state what level of defects is acceptable after release.
- **Introducing BDD** — Dan North, 2006. <https://dannorth.net/introducing-bdd/>. Read: full article. Supports the
  Given, When, Then form referred to in rule 1.
- **The Scrum Guide** — Ken Schwaber and Jeff Sutherland, November 2020.
  <https://scrumguides.org/scrum-guide.html>. Read: full page. The Definition of Done describes the state of an
  increment that meets the quality measures. The guide does not mention acceptance criteria or client acceptance;
  a passed Definition of Done is therefore not acceptance under this standard.

### Not verified

- KRISA 2.0 (Jabatan Digital Negara, 2026) renumbers the test documents. It was not read for this standard; the
  document numbers and criteria above are from the 2019 edition.
- ISO/IEC/IEEE 29119 (software testing) is paywalled and was not read.
- No source read here requires a particular form for the sign-off record. Rules 30 to 33 are this standard's own.
- The rule that silence or payment is not acceptance (rule 33) is a delivery rule, not legal advice. The contract
  and the law that governs it decide what counts as acceptance.
