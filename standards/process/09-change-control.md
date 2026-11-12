---
id: "change-control"
title: "Scope Change Control"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["process", "scope", "change-request", "client-delivery"]
applies_to: ["team", "general"]
related: ["requirements-discovery", "stakeholder-engagement", "acceptance-testing", "estimation", "dor-dod"]
created: "2026-11-12"
updated: "2026-11-12"
review_by: "2027-02-10"
chars: 18618
provenance: generated-batch

---

# Scope Change Control — Gold Standard 2026

## 1. Purpose

This standard defines how a change to agreed scope is asked for, assessed, decided and recorded. It binds every
project that has an agreed baseline of scope, dates or cost, from the day the baseline is approved until handover.

The failure it prevents has two forms. In the first, the team says yes to every request in a meeting; the date
slips, nobody decided that it should, and the team is blamed for a delay the client asked for. In the second, the
team says "that is a change request" to everything, including its own defects; the client stops asking and builds
a spreadsheet next to the system. Both come from the same gap: no shared rule for what a change is and who
decides.

Change is normal and often correct. The purpose of change control is that every change is a decision made by the
person who owns the consequence, with the consequence in front of them.

**Out of scope:** changes to live infrastructure and releases (`release-versioning`, `deployment-infrastructure`);
defects and how they are fixed (`testing`, `acceptance-testing`); how the baseline is produced
(`requirements-discovery`); how size is forecast (`estimation`).

## 2. Rules

### 2.1 The baseline

1. A project **MUST** have a baseline before change control applies: the approved requirements with a version,
   the agreed dates or forecast, and the agreed cost or capacity. Rationale: a change is a difference from
   something; without a baseline every request is an argument.
2. The baseline **MUST** name what is fixed and what may vary. For a fixed-price, fixed-date contract, scope is
   usually the part that varies. Rationale: when all three are declared fixed, quality becomes the variable and
   nobody chose that.
3. The change procedure **MUST** be written in the project plan and agreed with the sponsor before the first
   request arrives: the form, who assesses, who decides at each level, and the time limits. Rationale: a procedure
   invented during the first dispute is seen as a tactic.
4. Where the client's framework has a change procedure, the team **MUST** use it. Example: a Malaysian
   public-sector project under PPrISA uses the Borang Permohonan Pindaan and the Log Penyelesaian Pindaan, and a
   complex project is advised to have a Change Control Board chaired by the Pemilik Projek. Rationale: a decision made outside
   the client's own procedure does not bind the client.

### 2.2 What is a change

5. Every request **MUST** be classified as one of four things before anyone estimates it:
   **defect** (the system does not do what an agreed requirement or acceptance criterion says),
   **clarification** (the requirement was ambiguous and this settles which meaning was intended),
   **change** (the baseline does not contain it, or contains something different), or
   **new work** (outside the purpose of the project).
   Rationale: each has a different owner of cost, and most disputes are about the class and not the work.
6. A defect **MUST NOT** be handled as a change request, and **MUST NOT** be charged as one. Rationale: the client
   already paid for the requirement to be met.
7. A clarification **MUST** be decided by reading the baseline, the acceptance criteria and the research record
   together. Where they do not settle it, the team **MUST** state both readings and their cost to the accountable
   person. Rationale: an ambiguity is a shared failure of the baseline; treating it as wholly one side's fault
   costs more than the work.
8. The team **MUST NOT** classify a request alone when the class is disputed. The dispute goes to the person
   named in the escalation path (`stakeholder-engagement`). Rationale: the party that benefits from the class
   cannot be its only judge.
9. A requirement found to be wrong, impossible or harmful **MUST** be raised as a change by the team itself.
   Rationale: change control is not only for the client's requests; building a requirement the team knows is
   wrong is not compliance.

### 2.3 The request

10. Every change **MUST** have a written request with an identifier: who asks, what is wanted, why, and by when
    it is needed. The team writes it down when the request arrives verbally. Rationale: a request that exists only
    in a meeting has as many versions as attendees.
11. A request **MUST** state the need behind it, not only the solution asked for. Rationale: the team can often
    meet the need with something smaller that is already in scope.
12. Receiving a request **MUST NOT** be treated as accepting it, by either side. The team **MUST** say so at the
    moment of receipt. Rationale: "noted" in a meeting is heard as "yes".
13. Work on a change **MUST NOT** start before it is approved, except the assessment itself. Rationale: started
    work becomes the argument for approving it.

### 2.4 Impact assessment

14. The team **MUST** assess each request against at least: scope (requirements added, changed, removed), effort
    and cost, dates, quality and test effort, risk, other modules and integrations, data and migration, security
    and privacy, training and documentation, and work already done that would be discarded. Rationale: the
    visible cost of a change is the screen; most of the cost is everywhere else.
15. The assessment **MUST** state the cost of not making the change. Rationale: without it the comparison is
    always "cost versus nothing".
16. The assessment **MUST** offer at least two options where they exist: make the change and move the date, make
    it and remove something of equal size, defer it to a later phase, or decline. Rationale: one option is a
    price, not a decision.
17. The assessment **MUST** be returned within a time limit written in the procedure; five working days is the
    default. A larger assessment **MUST** be agreed as its own piece of work. Rationale: a request with no answer
    is assumed to be in progress.
18. The effect on dates **MUST** follow `estimation`: a forecast with a range, not a single date. Rationale: a
    change assessed with false precision produces the next change request.

### 2.5 The decision

19. Every change **MUST** be decided by the accountable person for scope, or by the body the procedure names, and
    recorded as approved, rejected or deferred, with the option chosen. Rationale: the person who owns the budget
    and the date is the only one who can trade them.
20. The procedure **MUST** set levels of authority. Default: the delivery lead and the client's project manager
    together may approve a change that has no effect on the agreed dates, cost, quality requirements or other
    modules; anything else goes to the accountable person or the change board. Rationale: sending every label
    change to a steering committee teaches people to go around the procedure.
21. An approval **MUST** state what gives way: the date moves, the cost rises, or named scope is removed. An
    approval that changes nothing else **MUST** say that it uses contingency, and how much remains. Rationale:
    "approved, same date, same cost" is how a project becomes late in small steps.
22. A decision **MUST** be made within the time limit in the procedure. A request with no decision by its
    needed-by date is escalated, not assumed. Rationale: silence is not approval and is not rejection.
23. A rejected or deferred request **MUST** be answered to the requester with the reason. Rationale: the person
    who asked had a need; if it is not heard it returns at acceptance.
24. A change that alters the contract price, the contract dates or the contracted deliverables **MUST** also
    follow the variation clause of the contract, and **MUST** be signed by the people the contract authorises.
    Rationale: a project-level approval does not amend a contract.

### 2.6 Small changes and working backlogs

25. For iterative delivery, the procedure **SHOULD** allow the product owner to reorder, split and replace items
    within the baseline without a change request, when the total size and the agreed outcomes do not change.
    Rationale: reprioritising within scope is the intended use of a backlog, and is not a change of scope.
26. Replacing an item with one of equal size **MUST** be recorded in the backlog with what was removed and who
    agreed. Rationale: the removed item is the one remembered at acceptance.
27. The project **SHOULD** hold a small change allowance, agreed at the start, for changes below a stated size,
    decided by the product owner and reported in each status report. Rationale: an allowance makes small changes
    cheap to decide and visible in total.
28. Work in an iteration that has started **SHOULD NOT** change, unless the product owner and the team agree that
    the iteration's goal is not put at risk. Rationale: a change mid-iteration costs the work in progress as
    well as the new work.
29. The sum of small changes **MUST** be reported against the baseline in each status report. Rationale: scope
    creep is a total; each item alone is reasonable.

### 2.7 Urgent changes

30. A change needed to meet a legal deadline, protect people or data, or keep a service running **MAY** start on
    the verbal approval of the accountable person. The written request and assessment **MUST** follow within two
    working days. Rationale: the procedure must not be the reason a real emergency is handled late.
31. Urgent changes **MUST** be counted and reviewed at each steering meeting. Rationale: a path with no paperwork
    becomes the normal path unless someone counts its use.

### 2.8 After the decision

32. An approved change **MUST** update the baseline: the requirements with a new version, the acceptance
    criteria and tests, the plan and forecast, and the documents and training material it touches. Rationale: a
    change that is built and not written into the baseline is a defect at acceptance.
33. The project **MUST** keep one change log that every stakeholder on the map can read: identifier, class,
    requester, date, assessment, decision, decider, and the baseline version that contains it. Rationale: the log
    is the answer to "why is this late?" and "who agreed this?".
34. Approved changes **MUST** be communicated to everyone whose work they affect, including testers, trainers
    and the team that will run the system. Rationale: the tester who is not told fails the changed feature
    against the old requirement.
35. Each status report **MUST** show the changes received, approved, rejected and pending since the last report,
    and their total effect on dates and cost. Rationale: the sponsor should never learn the total from the final
    invoice.
36. At the end of the project the change log **MUST** be reviewed for patterns: which part of the requirements
    produced the most changes and why. Rationale: a cluster of changes is a finding about discovery, and the next
    project needs it.

## 3. Anti-patterns

| Anti-pattern | Why it fails | Instead |
|---|---|---|
| "While you're there, can you just…" | Accepted in a meeting, never assessed, paid for with the date | Written request, not accepted on receipt (rules 10, 12) |
| Everything is a change request | Defects and ambiguities are billed; the client stops reporting them | Classify first; defects are never changes (rules 5, 6) |
| Nothing is a change request | The team absorbs every request until it misses the date | Assess and decide each one (rules 14, 19) |
| The engineer's yes | A developer agrees in a demo; the delivery lead learns at the next sprint | Only the named person commits (`stakeholder-engagement` rule 23) |
| Approved, same date, same cost | Each approval is free; the project is late by the sum | State what gives way (rule 21) |
| Gold plating | The team adds what it thinks is better, untested and unasked | A team's own idea is also a request (rule 9) |
| Change by defect ticket | A new feature is logged as a bug to skip the procedure | Classification before estimate; disputes escalate (rules 5, 8) |
| The steering committee for a label | Trivial changes wait three weeks, so people stop using the procedure | Levels of authority and an allowance (rules 20, 27) |
| The unwritten change | Built, working, and missing from the requirements, the tests and the manual | Update the baseline (rule 32) |

```text
✗ prohibited: Meeting note: "Client asked for bulk approval. Team to look into it."

✓ required:   CR-014 (class: change). Requested by Puan Aida, Unit Pelesenan, 12 November.
              Need: 300 renewals a week are approved one at a time; each takes about 40 seconds.
              Options: (A) bulk approval of up to 50 renewals: 9 to 13 days; go-live forecast moves from
                           1 December to 15–19 December; adds 6 acceptance scenarios; audit trail records
                           one decision per renewal.
                       (B) keyboard shortcut and auto-advance: 2 days, inside the change allowance
                           (6 of 10 days remain); no date change.
                       (C) defer to phase 2.
              Cost of no change: about 3.5 officer-hours a week.
              Decision by 19 November: Encik Farid (accountable for scope).
```

## 4. Checklist

- [ ] The baseline has a version, a date and a written approval, and states what is fixed and what may vary.
- [ ] The change procedure is written in the project plan and was agreed before the first request.
- [ ] The procedure names who assesses, who decides at each level, and the time limits.
- [ ] Every request in the log has an identifier, a requester, a need and a class.
- [ ] No defect has been handled or charged as a change.
- [ ] Each assessment covers the areas in rule 14, the cost of no change, and at least two options.
- [ ] Each decision names the decider, the option, and what gives way.
- [ ] No work started before approval, except recorded urgent changes.
- [ ] Each approved change is in the requirements, the acceptance tests, the plan and the documents.
- [ ] Contract-level changes followed the variation clause.
- [ ] The last status report shows received, approved, rejected and pending changes and their total effect.
- [ ] Urgent changes were counted at the last steering meeting.
- [ ] Rejected and deferred requests were answered with a reason.

## 5. Canonical summary

- No baseline, no change control. Agree the baseline and the procedure before the first request.
- Classify before you estimate: defect, clarification, change or new work. A defect is never a change request.
- Every request is written, with the need behind it. Receiving it is not accepting it.
- Assess the whole effect: scope, cost, dates, quality, risk, other modules, data, training, discarded work.
- Offer options, including the cost of doing nothing.
- The accountable person decides. Every approval states what gives way: date, cost or other scope.
- Small changes have a cheap path with an allowance, and their total is reported.
- Urgent changes may start on verbal approval; the paper follows in two working days.
- An approved change updates the requirements, the tests, the plan and the documents.
- The most common mistake: saying yes in the meeting.
- See also: `requirements-discovery`, `stakeholder-engagement`, `acceptance-testing`, `estimation`.

## Sources

Every source below was opened and read on 2026-11-12. "Read" names how much of it was read. A rule with no
source here is this standard's own judgement, and so is every number of days in the rules.

- **Metodologi PPrISA 2.0: Garis Panduan Pengurusan Projek ICT Sektor Awam** — Jabatan Digital Negara, Kementerian
  Digital, Versi 2.0 (the file name says "Versi Beta"), December 2024.
  <https://sqa.jdn.gov.my/images/pdfdocument/pprisa/PPrISA2_0VersiBetaDisember2024.pdf>. Read: full document, by
  question. Supports rules 3 and 4: a formal change request procedure, a Change Control Board advised for complex
  projects and chaired by the Pemilik Projek, which reviews each request, approves or rejects it and recommends
  to the technical and steering committees. Two reads of this document disagreed on whether it lets the Pengurus
  Projek approve a request that has no effect on scope, cost, schedule or quality. Rule 20 is therefore this
  standard's own threshold and is not attributed to PPrISA.
- **Templat Pengurusan Projek ICT Sektor Awam (PPrISA)** — Jabatan Digital Negara.
  <https://sqa.jdn.gov.my/index.php/en/templat-pengurusan-projek-ict-sektor-awam-pprisa>. Read: full page. Lists
  PPrISA10 Borang Permohonan Pindaan and PPrISA11 Log Penyelesaian Pindaan (rules 4, 10, 33).
- **Contracting for Agile Guidance Note** — UK Digital, Data and Technology Playbook, 20 June 2023.
  <https://www.gov.uk/government/publications/the-digital-data-and-technology-playbook/contracting-for-agile-guidance-note-html>.
  Read: full page. Supports rule 2 (under a fixed-price agile model, time and cost are fixed and scope varies),
  rule 25 (the backlog is reprioritised through regular planning while the client keeps control of scope), and
  rule 6 (the contract should state what level of defects is acceptable and give warranties against defects).
- **Principles behind the Agile Manifesto** — agilemanifesto.org. <https://agilemanifesto.org/principles.html>.
  Read: full page. Supports the Purpose: changing requirements are welcome, even late, when they serve the
  customer.
- **The Scrum Guide** — Ken Schwaber and Jeff Sutherland, November 2020.
  <https://scrumguides.org/scrum-guide.html>. Read: full page. Supports rules 25 and 28: the Product Owner orders
  the Product Backlog; during a Sprint no change is made that endangers the Sprint Goal, and scope may be
  clarified and renegotiated with the Product Owner.
- **ISO 21502:2020, Project, programme and portfolio management: Guidance on project management** — ISO, edition 1,
  2020, marked "to be revised". <https://www.iso.org/standard/74947.html>. Read: catalogue page and abstract only.
  The standard is paywalled; its clause on change control was not read and no rule here claims to restate it.

### Not verified

- PRINCE2 (issue types, change authority, change budget) and the PMBOK Guide are paywalled and were not read.
  The change allowance in rule 27 resembles what secondary sources call a PRINCE2 change budget; that
  resemblance is not checked against the manual.
- ITIL change enablement governs changes to live services. It is not a source for contract scope and is not
  used here.
- The four classes in rule 5 are this standard's own. No source read here defines them.
