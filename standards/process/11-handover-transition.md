---
id: "handover-transition"
title: "Handover & Transition"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["process", "handover", "transition", "operations", "client-delivery"]
applies_to: ["team", "general"]
related: ["acceptance-testing", "training-adoption", "documentation", "support", "secrets"]
created: "2026-11-12"
updated: "2026-11-12"
review_by: "2027-02-10"
chars: 21539
provenance: generated-batch

---

# Handover & Transition — Gold Standard 2026

## 1. Purpose

This standard defines how a system moves from the team that built it to the people who will own, run and change
it: what is handed over, how the receiving team proves it can operate the system, and when the delivery team's
responsibility ends. It binds every delivery to a client, and every transfer of a system between teams inside
one organisation.

The failure it prevents: the system is accepted, the project team leaves, and three months later nobody can
deploy a fix, the administrator password belongs to a person who has gone, the source code is in a private
account, and the only person who understood the nightly job is on another project. The client owns a system it
cannot run. That is a dependency, and the client did not choose it.

A handover is complete when the receiving team has operated the system without the delivery team, and has the
rights, the access and the knowledge to keep doing so. A signed list of documents is not a handover.

**Out of scope:** the decision to accept the system (`acceptance-testing`); training of end users and adoption
(`training-adoption`); how documents are written (`documentation`); the support process after handover
(`support`, `incidents`); onboarding a new engineer to a codebase (`onboarding`).

## 2. Rules

### 2.1 Plan the handover from the start

1. The receiving team **MUST** be named on the stakeholder map in the first ten working days of the project
   (`stakeholder-engagement` rule 2). Rationale: a system designed without its operators is designed for its
   developers.
2. The receiving team's constraints **MUST** be recorded as requirements during discovery: the hosting
   environment, the tools and languages it can support, its working hours, its security and change rules.
   Rationale: a stack the client's team cannot maintain is a decision to stay dependent on the supplier.
3. A written handover plan **MUST** exist no later than three months before the planned handover, or at the
   midpoint of a project shorter than six months. Rationale: handover work planned in the last fortnight is
   cut first.
4. The handover plan **MUST** state: what is transferred, to whom, the readiness criteria, the schedule of
   knowledge transfer, the length and terms of the early support period, and who signs. Rationale: the same
   reasons as an acceptance plan; the end is defined before it arrives.
5. Handover work **MUST** be estimated and scheduled as part of the project, not treated as what remains after
   go-live. Rationale: unplanned handover is paid for by the delivery team's next project and by the client's
   first incident.
6. Where the contract defines what is delivered at the end (source code, licences, documents, training), the
   handover plan **MUST** list each item against its clause. Rationale: the contract is what the client can
   enforce.

### 2.2 What is transferred

7. The handover **MUST** include an inventory, each item with its location and its new owner:
   source code with full history; build and deployment configuration; infrastructure definitions; database
   schemas and migration scripts; the environments; domain names and certificates; accounts with third-party
   services; licences and subscriptions; and the documents in rule 13. Rationale: what is not listed is found
   missing later, by the wrong person, at the wrong time.
8. Source code **MUST** be in a repository the client controls before handover is signed, and the receiving team
   **MUST** have built and deployed the system from that repository. Rationale: possession is not capability;
   a repository nobody has built from is unverified.
9. The handover **MUST** state the ownership and licence of the code, the data, and each third-party component,
   as the contract defines them, and **MUST** list the open-source components and their licences
   (`legal-licensing`). Rationale: rights that are unclear at handover are settled later by whoever holds the
   access.
10. All data the system holds, including data the system created, **MUST** be exportable by the client in a
    documented, open format, and the export **MUST** have been run once by the receiving team. Rationale: data
    that only the supplier can extract is not the client's in practice.
11. Every account, subscription, domain and certificate the system depends on **MUST** be registered to the
    client organisation, with a role mailbox and not a person's address, and **MUST** have a recorded renewal
    date and payer. Rationale: services registered to a departed engineer expire unnoticed.
12. The handover **MUST** list every dependency on the delivery organisation that remains: a hosted service, a
    shared library, a licence held by the supplier, a person. Each **MUST** have an owner and an end date, or an
    explicit agreement that it continues. Rationale: hidden dependencies are how a completed project keeps a
    supplier.

### 2.3 Documents

13. The following **MUST** be handed over, current for the accepted version: an architecture overview with the
    decisions and their reasons (`adr`); an operations runbook (start, stop, deploy, roll back, back up,
    restore, rotate secrets, renew certificates); an administrator guide; a user manual; the data dictionary and
    interface specifications; the test suite and how to run it; the list of known defects and limitations; the
    requirements baseline and the change log. Rationale: each answers a question the receiving team will have
    in its first month.
14. Each runbook procedure **MUST** have been executed by a member of the receiving team, following only the
    written steps, before handover is signed. Rationale: a procedure is correct when someone who did not write
    it can follow it.
15. Documents **MUST** live in a place the client controls, in an editable format. Rationale: a PDF on the
    supplier's drive cannot be kept current.
16. Known defects, limitations, workarounds and unfinished work **MUST** be listed in the handover report and
    **MUST NOT** be left for the receiving team to discover. Rationale: an honest list is the cheapest support
    the delivery team will ever give.

### 2.4 Access and secrets

17. Every credential, key and token **MUST** be rotated at handover, so that no member of the delivery team holds
    a working secret afterwards unless the support agreement gives them one by name. Rationale: access that
    outlives responsibility is a breach waiting for a cause (`secrets`).
18. Secrets **MUST** be transferred through the client's secret store or an agreed secure channel, and **MUST
    NOT** be sent by email, chat or a shared document. Rationale: the handover week is when discipline about
    secrets is weakest.
19. Administrative access **MUST** be held by at least two named people on the receiving side at handover.
    Rationale: one administrator is one resignation away from a locked system.
20. The delivery team's access to production, to the repositories and to the data **MUST** be removed on the date
    the handover plan states, and the removal **MUST** be confirmed in writing by the client. Rationale: removal
    that is everyone's job is nobody's.
21. Copies of the client's data held by the delivery team, including backups, test copies and exports on
    laptops, **MUST** be returned or deleted, and the deletion confirmed in writing. Rationale: the data
    protection duty continues as long as the copy exists (`privacy-data-governance`).

### 2.5 Readiness of the receiving team

22. Handover **MUST** be gated by a readiness review held with the receiving team, covering at least: the
    architecture and its dependencies; monitoring, alerts and what each alert means (`observability`); incident
    response and escalation (`incidents`); capacity and its limits; how changes are released
    (`release-versioning`); performance; backup and a tested restore (`backup-disaster-recovery`); and
    security. Rationale: these are the areas in which a system fails its operators.
23. Findings of the readiness review **MUST** be fixed, or accepted in writing by the receiving team's lead,
    before handover is signed. Rationale: a review whose findings are carried forward is a ceremony.
24. Knowledge transfer **MUST** be by doing. The receiving team **MUST** perform, with the delivery team
    watching and not driving: one deployment, one rollback, one restore from backup, one user administration
    task, and the diagnosis of one real or injected fault. Rationale: people keep what they have done, not what
    they were shown.
25. Responsibility **SHOULD** transfer gradually: the receiving team shadows, then leads with the delivery team
    on call, then operates alone. Rationale: a single cut-over date tests the receiving team for the first time
    in a real incident.
26. Knowledge transfer sessions **MUST** be recorded or written up, and stored with the documents. Rationale:
    the receiving team has turnover too.
27. The receiving team **MUST** be able to change the system: at least one small change **SHOULD** be made,
    tested and released by the receiving team before handover is signed. Rationale: a team that can run a system
    and cannot change it will need the supplier for the first new requirement.

### 2.6 Early support period

28. Handover **MUST** be followed by an early support period with a stated length, in which the delivery team
    remains available to the receiving team. Thirty days after go-live is the default minimum where the contract
    sets no warranty period. Rationale: the first month-end, the first audit and the first peak find what
    acceptance did not.
29. The terms of the period **MUST** be written: what the delivery team will respond to, how fast, through
    which channel, and what is excluded. Rationale: "call us if anything happens" is a promise with no size.
30. The period **MUST** have exit criteria agreed in advance: for example, no open severity 1 or 2 defect, a
    stated number of days without one, and the receiving team having resolved at least one incident alone.
    Rationale: support that ends on a date and not on a condition ends in the middle of a problem.
31. Defects found in the warranty or early support period **MUST** be handled as defects and not as change
    requests (`change-control` rule 6). Rationale: the client accepted a system that meets the baseline.
32. Every question the receiving team asks in this period **MUST** be answered in the documents as well as to
    the person. Rationale: a question asked once will be asked again after the delivery team has gone.

### 2.7 Sign-off and closure

33. Handover **MUST** end with a handover report signed by the delivery lead and by the accountable owner on the
    receiving side: the inventory, the readiness review results, the open items with owners and dates, the
    remaining dependencies, the start and end of the support period, and the confirmations of access removal and
    data deletion. Example: under KRISA the Laporan Serahan Sistem is certified by at least the Pengurus or
    Pengarah Projek and the Pemilik Projek or Sistem; under PPrISA the Laporan Penyerahan Projek lists the
    main deliverables and the unfinished activities. Rationale: the report is the line between two
    responsibilities.
34. The project **MUST** hold a closing review with the client and record lessons learnt: what to repeat and
    what to change. Rationale: both organisations will do this again.
35. The delivery organisation **MUST** keep a named contact for the system for at least twelve months after
    handover, and tell the client who it is. Rationale: the question that only the builders can answer arrives
    in month seven.

### 2.8 Exit from a supplier

36. A team that takes over a system from another supplier **MUST** apply rules 7 to 27 as the receiving team, and
    **MUST** record what it could not obtain. Rationale: the incoming team inherits every gap it does not write
    down.
37. A team that is being replaced **MUST** cooperate with the handover to the same standard as if it were
    staying. Rationale: the client's users are the ones who pay for a hostile exit, and reputations outlive
    contracts.

## 3. Anti-patterns

| Anti-pattern | Why it fails | Instead |
|---|---|---|
| Handover by zip file | Code and PDFs are emailed on the last day; nobody has built from them | Receiving team builds and deploys (rule 8) |
| The documentation dump | 400 pages nobody on the receiving side has opened | Receiving team executes each runbook (rule 14) |
| The hero dependency | One engineer "knows the system" and has moved to another project | Transfer by doing; record sessions (rules 24, 26) |
| Accounts in a personal name | The domain renews on a departed engineer's card | Role mailbox, renewal date, payer (rule 11) |
| Access that never ends | The supplier still holds production keys two years later | Rotate and remove on a date (rules 17, 20) |
| Go-live equals handover | The team leaves at launch; the first incident has no owner | Early support period with exit criteria (rules 28, 30) |
| The quiet limitation | Known defects are left for the client to find | Listed in the handover report (rule 16) |
| Run but not change | The client can restart the server and cannot fix a label | Receiving team ships one change (rule 27) |
| Lock-in by stack | A framework only the supplier knows | Receiving team's constraints are requirements (rule 2) |

```text
✗ prohibited: "Attached: source code (zip), user manual (PDF), admin password. Project closed. Thank you."

✓ required:   Handover Report: Sistem e-Lesen v1.3, 15 December
              Repository: client GitLab, group pelesenan/e-lesen. Built and deployed to production from it by
              Unit ICT on 9 December (pipeline 482).
              Runbook: 9 of 9 procedures executed by Unit ICT; restore tested 10 December, 47 minutes.
              Readiness review 8 December: 6 findings, 5 fixed, 1 accepted by Ketua Unit ICT (alert noise on
              the nightly job; owner Unit ICT, 31 January).
              Accounts: domain, SMS gateway and certificate registered to ict@agensi.example, renewals listed
              in Annex C.
              Secrets rotated 14 December. Delivery team access removed 15 December; confirmed by Unit ICT.
              Client data on delivery laptops and test servers deleted 15 December; confirmation in Annex D.
              Remaining dependency: none.
              Open items: 7 Low defects (Annex B). Early support: 15 December to 31 January; exit criteria
              in section 6.
              Signed: Delivery lead ________   Pemilik Sistem ________
```

## 4. Checklist

- [ ] The receiving team was on the stakeholder map from the start and its constraints are in the requirements.
- [ ] A handover plan exists, dated at least three months before handover, with readiness criteria and signers.
- [ ] The inventory lists every item in rule 7 with a location and a new owner.
- [ ] The receiving team has built and deployed the system from a repository the client controls.
- [ ] Ownership and licences of code, data and components are stated; open-source components are listed.
- [ ] The receiving team has run a full data export.
- [ ] Every account, domain, certificate and subscription is registered to the client with a renewal date.
- [ ] Remaining dependencies on the delivery organisation are listed with owners and end dates.
- [ ] Every document in rule 13 is current, editable and in a place the client controls.
- [ ] Every runbook procedure was executed by the receiving team from the written steps.
- [ ] The readiness review was held and each finding is fixed or accepted in writing.
- [ ] The receiving team performed a deployment, a rollback, a restore, an administration task and a diagnosis.
- [ ] Secrets were rotated; at least two named administrators exist on the receiving side.
- [ ] Delivery team access was removed and client data copies deleted, each confirmed in writing.
- [ ] The early support period has written terms and exit criteria.
- [ ] The handover report is signed by both sides and lists open items and known limitations.
- [ ] Lessons learnt are recorded and a contact is named for twelve months.

## 5. Canonical summary

- Name the receiving team in week one. Its constraints are requirements.
- Plan handover at least three months ahead, and estimate it as project work.
- Transfer an inventory, not a zip file: code, configuration, environments, accounts, licences, data, documents.
- The repository, the accounts and the documents live where the client controls them.
- The receiving team proves it: it builds, deploys, rolls back, restores, exports the data and ships one change.
- A readiness review gates the handover; its findings are fixed or accepted in writing.
- Rotate every secret, remove the delivery team's access on a date, delete its copies of the data, and get each
  confirmed.
- Known defects and limitations are written in the handover report.
- An early support period with written terms and exit criteria follows go-live.
- The most common mistake: treating go-live as the handover.
- See also: `acceptance-testing`, `training-adoption`, `documentation`, `support`, `secrets`.

## Sources

Every source below was opened and read on 2026-11-12. "Read" names how much of it was read. A rule with no
source here is this standard's own judgement, and so is every number of days or months except where a source is
named for it.

- **Metodologi PPrISA 2.0: Garis Panduan Pengurusan Projek ICT Sektor Awam** — Jabatan Digital Negara, Kementerian
  Digital, Versi 2.0 (the file name says "Versi Beta"), December 2024.
  <https://sqa.jdn.gov.my/images/pdfdocument/pprisa/PPrISA2_0VersiBetaDisember2024.pdf>. Read: full document, by
  question. Supports rule 3 (a closure checklist at least three months before the end of the last project
  activity), rules 24 to 27 (training and Transfer of Technology so that the owner and users can use and master
  the product), rule 33 (Laporan Penyerahan Projek with the main deliverables and the unfinished activities;
  signed by the Pengarah Projek where there is one, the Pengurus Projek and the Pemilik Projek, and by the
  contractor for outsourced work) and rule 34 (Laporan Penamatan Projek with lessons learnt).
- **KRISA, Bab 7: Fasa Pelaksanaan** — Kejuruteraan Sistem Aplikasi Sektor Awam, MAMPU 2019, now Jabatan Digital
  Negara. <https://sqa.jdn.gov.my/images/pdfdocument/krisa/BAB7-KRISA-pelaksanaan.pdf>. Read: full chapter, by
  question. Supports rule 13 (Manual Pengguna: introduction, overview, functions, instructions, error handling),
  rule 28 (final acceptance starts the Tempoh Jaminan) and rule 33 (Laporan Serahan Sistem, D18, certified by at
  least the Pengurus or Pengarah Projek and the Pemilik Projek or Sistem).
- **The Evolving SRE Engagement Model** — a chapter of Site Reliability Engineering, Google.
  <https://sre.google/sre-book/evolving-sre-engagement-model/>. Read: full chapter. Supports rule 22 (a production
  readiness review covers architecture and dependencies, instrumentation and monitoring, emergency response,
  capacity, change management and performance), rule 23 (improvements before onboarding) and rule 25 (gradual
  transfer of responsibility, with training).
- **How the live phase works** — GOV.UK Service Manual, last updated 8 May 2019.
  <https://www.gov.uk/service-manual/agile-delivery/how-the-live-phase-works>. Read: full page. Supports rules 22
  and 28: before going live, support staff understand the service, monitoring and uptime are in place, security
  and performance testing continue, and the service can be supported sustainably.
- **Define your purchasing strategy** — UK Government Digital Service, last updated 3 September 2026.
  <https://www.gov.uk/guidance/define-your-purchasing-strategy>. Read: full page. Supports rules 9 and 10
  (contracts state who owns the data, including data the service creates, and the intellectual property,
  including code and business rules) and rule 12 (break clauses so that the client can leave at low exit cost).
- **Exiting Major IT Contracts: Guidance for Departments** — Cabinet Office (UK), 2017.
  <https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/658162/6.3634_CCS_GCF_Gov_Shared_Learning_Exiting_Major_IT_Contracts_FINAL_081117.pdf>.
  Read: full document, by question. Supports rules 6, 7, 9, 10, 13 and 36: an exit plan, knowledge of the current
  operation from the incumbent, ownership of intellectual property and licences, access to service data, asset
  ownership, and access to operations manuals. It says exit of a major contract can take up to four years from
  first discussion; that figure is about large government contracts and is not used as a rule here.

### Not verified

- ISO/IEC/IEEE 12207 (transition process) is paywalled and was not read.
- "Early life support" is an ITIL version 3 term. It was not found in ITIL 4 material, and no exit criteria from
  ITIL were read. Rules 28 to 30 are this standard's own.
- No Malaysian circular on source-code ownership or Transfer of Technology was opened. One (SPP Bil. 3 Tahun
  2013) is reported by secondary sources and returned an error when requested. Rule 9 therefore points to the
  contract and states no legal position.
- The twelve months in rule 35 and the thirty days in rule 28 have no source.
