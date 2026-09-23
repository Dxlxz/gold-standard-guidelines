---
id: "legal-licensing"
title: "Legal & Licensing"
domain: "security"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["security", "legal", "licensing"]
applies_to: ["security"]
related: []
legacy_number: 94
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 42645
provenance: baseline

---

Below is the canonical document, using the requested placement and corpus structure.

# Legal & Licensing — Gold Standard 2026

**Canonical placement:** Dependency → **Legal & Licensing** → Privacy & Data Governance → Governance  
**Status:** Canonical engineering standard  
**Applies to:** application code, libraries, services, infrastructure, containers, build tooling, shadcn/ui components and registries, fonts, icons, imagery, documentation assets, third-party SDKs, SaaS integrations, and external contributions.

---

## 1. Purpose

### 1.1 Objective

This standard defines the minimum legal and licensing controls for software and digital assets used, modified, distributed, deployed, or contributed by the organisation.

The objective is to ensure that:

- third-party software is used only under licence terms compatible with the intended product and distribution model;
- copyleft, attribution, source-disclosure, notice, patent, redistribution, commercial-use, and modification obligations are identified before release;
- dependency licensing is enforced continuously in CI rather than reviewed manually only at release time;
- third-party fonts, icons, imagery, and other non-code assets have documented rights of use;
- inbound contributions have a defined intellectual-property basis through a DCO, CLA, or other approved contribution mechanism;
- proprietary SDKs, commercial packages, and SaaS products receive EULA/contract review where required;
- vendors processing personal data are handed off to the **Privacy & Data Governance** standard for DPA, sub-processor, transfer, retention, and data-processing controls; and
- licensing decisions are reproducible, auditable, and attached to the relevant dependency, artefact, exception, or vendor record.

This standard is an engineering governance baseline. Project-specific licence interpretation, contractual negotiation, or jurisdiction-specific questions MUST be escalated to authorised legal counsel rather than inferred from this document.

---

## 2. Rules

### 2.1 General licensing rule

Every third-party component or asset incorporated into a product, build, deployment, distribution, documentation set, or public repository MUST have an identifiable legal basis for use.

A public repository, downloadable file, package-manager entry, copied code snippet, registry entry, design resource, or publicly accessible image MUST NOT be treated as freely reusable merely because it is publicly available.

Where copyright applies and no licence or other clear permission can be established, the material MUST be treated as **unlicensed** and MUST NOT be incorporated into the product.

Licences SHOULD be recorded using canonical SPDX identifiers or SPDX licence expressions wherever possible. SPDX expressions support individual licences as well as `AND`, `OR`, and `WITH` relationships for multi-licensing and exceptions. citeturn487803search12turn109048search12

---

### 2.2 Licence classes

Dependencies MUST be classified according to the following policy before production use or redistribution.

| Class | Typical characteristics | Examples | Default policy |
|---|---|---|---|
| **A — Permissive / low-reciprocity OSS** | Redistribution normally permitted with copyright/licence/notice conditions; may include patent terms | MIT, BSD-2-Clause, BSD-3-Clause, ISC, Apache-2.0, 0BSD | **Allowed**, subject to attribution and licence-specific obligations |
| **B — Limited / weak copyleft** | Reciprocity normally applies to specified files, libraries, modifications, or linkage arrangements rather than automatically to every independent component | MPL-2.0, LGPL families | **Conditional**; MUST undergo compatibility review for distributed/runtime use |
| **C — Strong copyleft** | Distribution of covered or derivative works may require corresponding source and licensing under the copyleft licence | GPL families | **Restricted** for proprietary distributed products; legal approval and compliance plan REQUIRED |
| **D — Network copyleft** | Adds obligations associated with remote network interaction in addition to ordinary copyleft rules | AGPL-3.0 family | **Default deny** for network-facing product code unless specifically approved |
| **E — Restricted / source-available / non-commercial / field-of-use** | Source may be visible but rights are restricted by commercial, purpose, deployment, user, field-of-use, or other conditions | Non-commercial licences, field-of-use licences, Commons-Clause-style terms, vendor-specific source-available licences | **Default deny** unless Legal explicitly approves the intended use |
| **F — Proprietary / EULA-controlled** | Use derives from contract, subscription, commercial licence, click-through terms, or negotiated agreement | Commercial SDKs, proprietary fonts, paid component libraries, stock assets | **Contract-controlled**; entitlement and permitted use MUST be verified |
| **U — Unknown / custom / no assertion** | Licence cannot be conclusively determined or uses non-standard/custom language | Missing licence, `NOASSERTION`, custom terms | **Block** pending review |

An OSI-conformant open-source licence cannot prohibit use in a particular field of endeavour, including business use. A purported “open-source” licence containing a non-commercial or other field-of-use restriction MUST therefore be handled as Class E rather than as ordinary OSS. citeturn540677search5turn540677search6

Classification is a policy mechanism, not a substitute for reading the licence. The precise licence text, version, exception, linking model, modification state, distribution model, and product architecture MUST determine the final compliance requirements.

---

### 2.3 Permissive licences

Class A dependencies MAY be used when their obligations can be satisfied.

Teams MUST NOT interpret “permissive” as “no obligations.”

At minimum:

- required copyright notices MUST be preserved;
- required licence text MUST be preserved or redistributed where applicable;
- attribution or `NOTICE` requirements MUST be retained;
- modification notices MUST be added where the relevant licence requires them;
- trademark rights MUST NOT be assumed from a copyright licence;
- patent provisions MUST NOT be discarded when evaluating compatibility; and
- generated third-party notices MUST reflect the licence actually governing the released dependency version.

For example, Apache-2.0 requires redistribution of its licence, preservation of applicable notices, marking modified files, and preservation of relevant `NOTICE` attribution when such a file exists. It also contains an express patent licence and patent-termination provision. citeturn109048search1turn109048search2

MIT-licensed software similarly requires preservation of its copyright and permission notice in copies or substantial portions. The official shadcn/ui repository is currently licensed under MIT. citeturn487803search0turn487803search1

---

### 2.4 Copyleft

Copyleft dependencies MUST be assessed according to the exact licence and the manner in which the software is used.

#### 2.4.1 GPL

GPL-covered software used in a distributed product MUST receive a documented compatibility assessment before release.

Where GPL obligations apply to distributed object code, the release process MUST satisfy the applicable corresponding-source requirements and other conditions of the specific GPL version. GPLv3, for example, contains explicit requirements concerning Corresponding Source when covered software is conveyed in non-source form. citeturn109048search0

Teams MUST NOT assume that merely placing GPL software in a separate directory, process, package, container, or repository resolves derivative-work or distribution questions.

Conversely, teams MUST NOT treat ordinary network interaction with unmodified GPL software as equivalent to AGPL network-copyleft obligations: GPLv3 expressly distinguishes conveyance from mere interaction over a computer network. citeturn109048search0

#### 2.4.2 LGPL

LGPL dependencies MUST be reviewed for the relevant version, linking mechanism, modifications, relinking requirements, notices, licence copies, and source obligations.

For LGPLv3, a Combined Work may be distributed under other terms only when the licence's conditions concerning modification of the library, notices, licence copies, relinking or suitable shared-library mechanisms, and applicable source requirements are met. citeturn109048search5

“Dynamically linked” MUST NOT be used as an automatic licence-approval rule.

#### 2.4.3 MPL

MPL-2.0 SHOULD be treated as limited or file-level copyleft rather than as a permissive licence. Modifications to MPL-covered files may carry source-availability obligations while separate files may remain under different licensing. Mozilla describes MPL 2.0 as file-level copyleft intended to permit combination with differently licensed code. citeturn109048search6turn109048search7

Teams modifying MPL-covered files MUST preserve a record of which files remain covered.

#### 2.4.4 AGPL

AGPL dependencies MUST NOT be introduced into a production network service without explicit approval and a documented compliance model.

AGPLv3 adds a network-interaction provision under which a modified version supporting remote network interaction must prominently offer remotely interacting users an opportunity to obtain the Corresponding Source of that version. citeturn109048search10

A team MUST NOT rely on the statement “we do not distribute the server binary” as sufficient AGPL analysis.

---

### 2.5 Commercial-use and source-available constraints

Any licence containing one or more of the following MUST be treated as Class E unless Legal has explicitly classified that licence otherwise:

- “non-commercial” limitations;
- restrictions on competing products;
- restrictions on SaaS or managed-service use;
- production-use limitations;
- user, revenue, entity-size, or deployment thresholds;
- field-of-use limitations;
- geographic or industry limitations embedded in the licence;
- requirements to purchase a separate commercial entitlement;
- limitations on redistribution that exceed ordinary OSS conditions; or
- custom restrictions not represented by a recognised approved licence.

Source availability MUST NOT be conflated with open-source status.

For example, CC BY-NC permits sharing and adaptation but prohibits use for commercial purposes. It is therefore unsuitable for commercial product assets unless the intended use separately satisfies those terms or additional permission has been obtained. citeturn600903search3

---

### 2.6 Dependency intake

Before a new dependency is merged, the project MUST establish:

1. package identity and version;
2. dependency scope: runtime, build, development, test, optional, or transitive;
3. declared licence or licence expression;
4. detected licence where source scanning is required;
5. whether the dependency or portions of it ship to customers, browsers, mobile clients, containers, appliances, CLIs, extension bundles, or other distributable artefacts;
6. whether the dependency is modified or vendored;
7. whether it performs network-facing functionality relevant to network copyleft;
8. required attribution, notices, source publication, modification disclosure, or licence-copy obligations; and
9. approval state under the licence-class policy.

A `devDependency`, build tool, code generator, compiler plugin, bundler plugin, or test package MUST NOT automatically be treated as non-shipping. Build systems can copy, transform, inline, bundle, embed, or generate code that enters a release artefact.

Dependencies introduced indirectly through component generators or registries are subject to the same controls.

---

### 2.7 shadcn/ui baseline

shadcn/ui is the canonical component baseline for the Component and Pattern standards.

The official shadcn/ui codebase is MIT-licensed as of this standard. citeturn487803search0turn487803search3

However:

- copied shadcn/ui source MUST remain within normal repository licence-compliance controls;
- dependencies installed by the shadcn CLI MUST be scanned independently;
- third-party registry components MUST NOT be assumed to inherit the shadcn/ui MIT licence;
- code copied from community registries MUST be treated as third-party source and its provenance and licence MUST be established;
- fonts, icon packs, illustrations, examples, templates, or images referenced by a component MUST be reviewed separately from the component's source-code licence; and
- replacing, adapting, or copying a component does not waive any licence notice that the applicable licence requires to remain.

The official shadcn documentation itself instructs users to review third-party registry code before installing it. citeturn540677search4

Legal approval of a component does not satisfy the **Accessibility**, **Security**, **Design Tokens**, or **Component and Pattern** standards. Those requirements remain independently enforceable.

---

### 2.8 CI licence scanning

Licence compliance MUST be implemented as Policy as Code.

Every actively maintained production repository MUST run dependency licence checks in CI on dependency-changing pull requests.

The CI control MUST:

- analyse manifest and lockfile changes;
- evaluate direct and transitive dependencies;
- evaluate SPDX licence identifiers and expressions;
- block Class U dependencies;
- block policy-disallowed Class C, D, and E dependencies;
- detect new proprietary or custom-licensed packages requiring approval;
- flag declared-versus-detected licence inconsistencies where source scanning is enabled;
- preserve approved exceptions as reviewable configuration rather than hidden shell-script exclusions;
- fail closed when a new dependency's licence cannot be established; and
- produce machine-readable output usable for SBOM and release-attribution generation.

GitHub's dependency review tooling supports PR-time licence allow/deny rules expressed with SPDX-compatible identifiers. citeturn109048search3turn109048search9

For higher-assurance or multi-ecosystem environments, an SCA/licence system such as OSS Review Toolkit MAY be used to classify licences, evaluate policy rules, curate findings, generate SPDX or CycloneDX SBOMs, produce attribution documentation, and create source archives. citeturn600903search1turn600903search4

Source scanning SHOULD supplement metadata-only scanning for release-critical products. Declared package metadata and detected source licences are not equivalent: a package may declare one licence while individual files contain additional or different licensing terms. citeturn600903search2

ScanCode or an equivalent scanner MAY be used to detect licence text, copyright notices, package metadata, and licence findings within source trees and archives. citeturn600903search6turn600903search15

Automated licence detection MUST NOT be treated as infallible legal determination.

---

### 2.9 Exceptions and curations

Any licence-policy exception MUST be explicit.

An exception record MUST contain:

- dependency and exact version or bounded version range;
- repository/product scope;
- original licence finding;
- approved effective or concluded licence where applicable;
- reason for the discrepancy or exception;
- evidence supporting the decision;
- approving authority;
- date of approval;
- expiry or mandatory review condition; and
- required release obligations.

Broad wildcard exclusions SHOULD NOT be used.

A curation that permanently overwrites scanner output MUST NOT conceal new licensing terms introduced by a later dependency version. Tooling such as ORT distinguishes declared, detected, concluded, and effective licences specifically because those states represent different facts and decisions. citeturn600903search2

---

### 2.10 SBOM and licence evidence

Release pipelines for production software SHOULD generate an SBOM in SPDX or CycloneDX format.

Products subject to contractual, enterprise, regulated, or distribution requirements MUST generate an SBOM unless an approved exception exists.

The SBOM or associated compliance inventory SHOULD contain, where available:

- component name;
- version;
- package URL or equivalent identity;
- dependency relationship;
- declared licence;
- detected licence;
- concluded/effective licence;
- copyright information;
- source/provenance location; and
- required notices or source-offer metadata.

CycloneDX supports declared, observed, and concluded licence information and SPDX identifiers/expressions for open-source compliance use cases. citeturn540677search15

SBOM generation does not replace licence-policy evaluation.

---

### 2.11 Attribution and third-party notices

Every release MUST satisfy the attribution and notice obligations of the third-party materials it contains.

Where applicable, the release process MUST generate or maintain a `THIRD_PARTY_NOTICES`, `NOTICE`, legal-attribution page, application licence screen, documentation section, or equivalent artefact.

The mechanism MUST be appropriate to the distribution medium.

Required notices MUST NOT be silently removed during minification, bundling, source transformation, asset optimisation, container construction, native compilation, or packaging.

A single generic statement such as “this product uses open-source software” MUST NOT replace licence-specific notices when the licence requires more.

Where a licence requires distribution of its full text, the licence text MUST be provided in an accessible form.

Where a licence requires disclosure of modification, source code, a source offer, or relinking information, attribution alone is insufficient.

---

### 2.12 Source obligations and reproducibility

When a licence requires Corresponding Source, Minimal Corresponding Source, modified source, installation information, relinking material, or another source-delivery mechanism, the release MUST have a documented mechanism for satisfying that obligation.

The organisation MUST retain the relevant source corresponding to the shipped binary or artefact for the required period.

A link to an upstream repository SHOULD NOT be used as the sole compliance mechanism where the organisation is responsible for making source available, because:

- upstream content may change or disappear;
- the shipped version may differ;
- patches may be organisation-specific; and
- build scripts or other required corresponding material may not exist upstream.

Compliance archives SHOULD be immutable and associated with the exact release.

---

### 2.13 Fonts

Every font MUST have an identified font licence before use.

The record MUST cover:

- desktop/design use where relevant;
- web embedding;
- application embedding;
- redistribution;
- modification or subsetting;
- conversion between formats;
- server-side document generation where applicable; and
- branding or reserved-font-name requirements where applicable.

Open Font License fonts MAY be used where their terms are satisfied. The current SIL Open Font License is OFL 1.1. citeturn540677search10

Commercial fonts MUST be treated as Class F and MUST NOT be assumed to permit web, mobile-app, PDF, server, advertising, or redistribution use merely because a designer possesses a desktop licence.

Font files MUST NOT be copied from another organisation, design application, operating system, or website without establishing redistribution rights.

Where technically and contractually permitted, production web fonts SHOULD be self-hosted when doing so improves privacy, reliability, performance, or security. Any external font service that receives user network data MUST additionally satisfy the Privacy & Data Governance and Security standards.

---

### 2.14 Icons and illustrations

Icon libraries MUST be licensed independently from the UI framework in which they appear.

Required copyright notices and licence terms MUST be retained.

For example, Google's Material Symbols are distributed under Apache-2.0. citeturn487803search11

Custom icons derived from a third-party library MUST be evaluated under that library's modification and attribution terms.

Trademarked logos, service marks, certification marks, payment marks, social-network marks, and partner logos MUST NOT be treated as ordinary reusable icons. Their copyright licence does not necessarily grant trademark usage rights.

---

### 2.15 Imagery, photography, video, and other creative assets

Every third-party image or media asset MUST have documented provenance and permitted-use terms.

The asset record SHOULD identify:

- creator or supplier;
- source;
- licence or contract;
- attribution requirement;
- commercial-use permission;
- modification permission;
- territorial or term restrictions if any;
- model/property releases where required by the intended use; and
- evidence of purchase or entitlement for stock media.

CC BY material may be used commercially and adapted subject to its attribution and related requirements. citeturn600903search17

CC BY-NC material MUST NOT be used in a commercial product or commercial marketing merely because attribution is supplied; the licence separately prohibits commercial use. citeturn600903search3

CC0 material normally permits copying, modification, distribution, and commercial use without an attribution requirement, but CC0 does not by itself eliminate third-party trademark, privacy, publicity, or similar rights. citeturn600903search7turn600903search12

Search-engine results, social-media posts, Pinterest boards, image previews, screenshots, and “royalty-free” labels MUST NOT be treated as proof of licence.

---

### 2.16 Contributions

A repository accepting external contributions MUST define its inbound contribution policy before accepting substantive third-party code.

The project MUST use an approved mechanism such as:

- **DCO** — contributor certification through a `Signed-off-by` attestation;
- **CLA** — explicit contributor licence agreement;
- another documented mechanism approved for the project.

A DCO certifies, among other things, that the contributor created the contribution or otherwise has the right to submit it under the indicated open-source terms. citeturn600903search0

A CLA may instead grant defined rights to the receiving organisation while allowing contributors to retain rights in their own work. The Apache Software Foundation, for example, uses individual and corporate contributor agreements for specified contribution circumstances. citeturn540677search0

Repositories using a DCO MUST enforce sign-off in contribution checks.

Repositories using a CLA MUST enforce CLA status before merge.

Projects SHOULD use the simplest approved mechanism sufficient for their ownership, relicensing, patent, and governance requirements. DCO and CLA mechanisms MUST NOT be layered together without a defined legal reason.

`CONTRIBUTING.md` MUST state:

- the project's outbound licence;
- the inbound contribution mechanism;
- required sign-off or CLA process;
- contributor responsibility for third-party content;
- prohibited inclusion of code or assets the contributor is not authorised to submit; and
- any special patent or corporate-contribution requirements.

Copied code from another project MUST retain its provenance and MUST NOT be presented as an original contribution.

---

### 2.17 Outbound licensing

Every distributable repository or package MUST have an approved outbound licence or an explicit proprietary status.

Open-source repositories MUST contain the canonical licence text at the repository root unless the chosen licensing model expressly requires a different structure.

Package metadata SHOULD use the correct SPDX identifier or expression.

`LICENSE`, `NOTICE`, package metadata, repository documentation, generated distributions, and published package metadata MUST NOT contradict one another.

A repository containing multiple independently licensed sections MUST document those boundaries explicitly.

Relicensing MUST NOT occur merely by replacing the root `LICENSE` file. Rights from all relevant copyright holders and dependency licences MUST be established before relicensing covered material.

---

### 2.18 Proprietary dependencies and EULAs

A proprietary library, SDK, font, icon set, dataset, design resource, binary, SaaS client, or commercial component MUST have a valid organisational entitlement before production use.

An engineer MUST NOT accept click-through or online terms on behalf of the organisation unless authorised to do so.

Before adoption, the responsible team MUST determine whether the governing terms impose material restrictions concerning:

- production deployment;
- number of users, developers, devices, customers, tenants, CPUs, or environments;
- redistribution or embedding;
- SaaS or hosting;
- sublicensing;
- modification;
- benchmarking or publication;
- telemetry;
- audit rights;
- licence keys or technical enforcement;
- renewal or termination;
- generated output;
- intellectual-property ownership; or
- data processing.

Where commercial or legal terms exceed delegated engineering authority, Procurement/Legal review MUST occur before production commitment.

Licence entitlement evidence MUST be retained for as long as the software or asset remains in use.

---

### 2.19 DPA and data-processing touchpoints

Licensing review and privacy review are separate controls.

A dependency may be legally licensed for software use while the associated vendor or hosted service remains unacceptable for processing personal data.

Any third party that receives, stores, accesses, transmits, analyses, or otherwise processes personal data on the organisation's behalf MUST be routed to **Privacy & Data Governance** before production use.

The vendor record MUST establish, where applicable:

- controller/processor roles;
- categories of data;
- categories of data subjects;
- processing purposes;
- processing duration;
- security obligations;
- confidentiality commitments;
- deletion or return requirements;
- incident/cooperation obligations;
- audit or assurance mechanisms;
- sub-processor terms;
- international-transfer mechanism; and
- termination/offboarding requirements.

Where GDPR Article 28 applies, controller-to-processor and processor-to-sub-processor relationships require the applicable contractual protections. The European Commission provides standard contractual clauses for controller/processor relationships and separate SCCs for qualifying international transfers. citeturn540677search2turn540677search3

Where a vendor relies on general authorisation for sub-processors, the organisation MUST have an operational process to receive changes and exercise any applicable objection rights.

International-transfer requirements MUST NOT be inferred merely from a vendor's headquarters. Actual processing locations, sub-processors, and transfer routes MUST be evaluated under the Privacy & Data Governance standard.

For applicable EU transfers, SCCs may be a transfer mechanism, and the Commission's guidance also addresses transfer impact assessment and processor/sub-processor scenarios. citeturn540677search1turn540677search8

A DPA MUST NOT be treated as a substitute for security assessment, data minimisation, retention controls, lawful-basis analysis, or architecture review.

---

### 2.20 Sub-processors

Any production vendor that may process personal data through sub-processors MUST have a discoverable sub-processor list or equivalent contractual disclosure.

The owning team MUST maintain enough vendor metadata to determine:

- which service uses the vendor;
- which data the vendor receives;
- relevant processing locations;
- known sub-processors or the authoritative sub-processor-list location;
- responsible business owner;
- privacy/security approval state; and
- notification path for material changes.

A vendor MUST NOT be adopted on the assumption that its infrastructure providers are legally irrelevant.

Sub-processor additions that materially change risk, geography, data use, or contractual coverage MUST trigger re-review under Privacy & Data Governance.

---

### 2.21 Alignment with Dependency standard

The **Dependency** standard owns dependency selection, version policy, provenance, lockfiles, update strategy, vulnerability posture, package integrity, and maintenance health.

This standard owns the legal conditions under which those dependencies may be used.

A dependency MUST satisfy both standards.

A dependency that is secure but legally incompatible MUST NOT ship.

A dependency that is legally permissive but insecure, abandoned, or provenance-ambiguous MUST NOT bypass the Dependency or Security standards.

---

### 2.22 Alignment with Security

Legal approval MUST NOT be interpreted as security approval.

Third-party code remains subject to:

- vulnerability scanning;
- integrity verification;
- provenance requirements;
- secrets controls;
- secure configuration;
- supply-chain controls;
- patch and update requirements; and
- incident response.

SBOM and dependency metadata SHOULD use a shared canonical inventory wherever practicable so Security and Legal are not maintaining conflicting component lists.

---

### 2.23 Alignment with Data & Database

SDKs, database drivers, hosted databases, telemetry tools, analytics products, search services, object-storage providers, and data-processing libraries MUST satisfy this standard in addition to **Data & Database** requirements.

A library licence does not authorise collection of data.

A DPA does not authorise a database schema.

Data classification, retention, access, residency, migration, backup, and deletion controls remain governed by Data & Database and Privacy & Data Governance.

---

### 2.24 Alignment with API

API clients, SDKs, generated API bindings, schemas, and vendor APIs MUST be reviewed for:

- source-code licence;
- generated-code licence;
- API terms of service;
- redistribution rights;
- branding or attribution terms;
- rate-limit and acceptable-use restrictions; and
- data-processing implications.

Generated client code MUST NOT be assumed to be unrestricted merely because generation occurred inside the organisation.

---

### 2.25 Alignment with State Management

State-management packages are ordinary dependencies and MUST follow this standard.

Persisted client state MUST additionally comply with Privacy & Data Governance where it contains user or device data.

Licensing MUST NOT be used to justify copying substantial implementation code from another state-management library into internal source without complying with the source licence.

---

### 2.26 Alignment with Forms & Validation

Form libraries, schema validators, masking libraries, address-validation services, CAPTCHA providers, fraud systems, identity systems, and hosted form products MUST satisfy dependency licensing requirements.

Hosted validation or form services that receive user-entered data MUST additionally receive privacy/DPA review.

A licence-compatible form SDK MUST NOT transmit form values to a third party unless that processing is separately authorised.

---

### 2.27 Alignment with Accessibility

Legal permission to use a component, icon, typeface, PDF library, media asset, or widget does not establish accessibility.

Accessibility conformance remains mandatory.

Licence constraints MUST NOT be used as justification for shipping inaccessible alternatives where an accessible implementation is required.

Where licence terms prevent the modifications necessary to meet accessibility requirements, the asset or component SHOULD be replaced.

---

### 2.28 Alignment with Design Tokens

Design tokens MUST reference only approved fonts, icons, and other licensed assets.

A token such as `font-family`, icon alias, asset URL, or illustration reference MUST NOT obscure the underlying third-party asset provenance.

Changing an asset's token name does not create a new licence.

The design-system asset catalogue SHOULD contain licence metadata or a stable reference to the canonical asset inventory.

---

### 2.29 Alignment with Component and Pattern standards

Component abstractions MUST NOT erase licensing provenance.

A component containing or distributing third-party code or assets remains subject to those underlying terms.

shadcn/ui is the baseline implementation model, but a shadcn-compatible registry MUST NOT be treated as a licensing trust boundary.

Third-party registry packages MUST undergo the same dependency and asset review as packages installed manually.

---

## 3. Anti-patterns

The following patterns are non-compliant:

1. **“It is on GitHub, so it is open source.”**  
   Public availability does not establish licence rights.

2. **“MIT means there is nothing to ship.”**  
   MIT includes preservation requirements for the copyright and permission notice.

3. **“Apache is basically MIT.”**  
   Apache-2.0 has distinct notice, modification, attribution, and patent provisions. citeturn109048search1

4. **“GPL is fine because the process is separate.”**  
   Process boundaries alone do not constitute a complete licence analysis.

5. **“SaaS means copyleft never matters.”**  
   This ignores licences such as AGPL and also oversimplifies distribution and architecture questions.

6. **“It is only a devDependency.”**  
   Build-time dependencies may inject code or assets into released artefacts.

7. **“The package manifest says MIT, so scanning is finished.”**  
   Declared metadata may differ from licence text found inside the package. citeturn600903search2

8. **“The scanner produced a false positive, so exclude the whole package forever.”**  
   Curations MUST be evidence-based and version-aware.

9. **“The component came from a shadcn registry, so shadcn's MIT licence covers it.”**  
   Third-party registry code has its own provenance and terms.

10. **“Royalty-free means copyright-free.”**  
    Royalty-free stock assets remain governed by licence terms.

11. **“Creative Commons means commercial use is allowed.”**  
    Different CC licences grant different rights; CC BY-NC expressly restricts commercial use. citeturn600903search3

12. **“We bought the font, so we can put the font file in the app.”**  
    Desktop, web, app, server, and redistribution rights may be separately licensed.

13. **“The logo is available as SVG, therefore we can use it.”**  
    Trademark and brand-use rights remain separate from file availability.

14. **“Attribution fixes an incompatible licence.”**  
    Attribution cannot satisfy a prohibition on commercial use or substitute for source-disclosure requirements.

15. **“A copyright footer covers our open-source notices.”**  
    Required third-party licence text, copyright notices, `NOTICE` material, and source obligations remain separate.

16. **“We can relicense the repository by changing LICENSE.”**  
    Relicensing requires authority over the relevant copyrighted material.

17. **“A CLA means every contribution is safe.”**  
    Contribution checks still need provenance and third-party-content controls.

18. **“A DCO transfers copyright.”**  
    DCO is a contributor certification mechanism; it is not inherently a copyright assignment. citeturn600903search0

19. **“The SDK is free, so nobody needs to read the EULA.”**  
    Zero price does not eliminate contractual restrictions.

20. **“We can add the DPA after launch.”**  
    A third party MUST NOT begin unapproved personal-data processing while required processor terms remain unresolved.

21. **“The vendor is compliant, so all of its sub-processors are implicitly approved.”**  
    The processing chain and applicable contractual controls still require review.

22. **“An SBOM is our licence-compliance programme.”**  
    An inventory is evidence; policy evaluation and obligation fulfilment are separate controls.

---

## 4. Checklist

### 4.1 Dependency intake

- [ ] Exact package and version are identified.
- [ ] Manifest and lockfile are committed and reproducible.
- [ ] Direct and transitive licence information is available.
- [ ] SPDX identifier/expression is recorded where possible.
- [ ] Runtime/build/dev/test scope is known.
- [ ] Shipping/bundling behaviour is known.
- [ ] Vendored or modified status is known.
- [ ] Declared/detected licence discrepancies have been resolved.
- [ ] Licence class is permitted by policy.
- [ ] Copyleft implications have been reviewed where applicable.
- [ ] Commercial, source-available, custom, or proprietary terms have the required approval.
- [ ] Required attribution/source obligations are recorded.

### 4.2 CI

- [ ] Dependency licence review runs on dependency-changing PRs.
- [ ] Unknown licences fail closed.
- [ ] Prohibited classes fail CI.
- [ ] Approved exceptions are explicit and auditable.
- [ ] Exception scope is version/repository bounded.
- [ ] Source scanning is enabled where product risk justifies it.
- [ ] SBOM generation is configured where required.
- [ ] CI configuration itself is reviewed as code.

### 4.3 Release

- [ ] Release dependency inventory matches the built artefact.
- [ ] `THIRD_PARTY_NOTICES` or equivalent is generated/validated.
- [ ] Required licence texts are present.
- [ ] Applicable `NOTICE` material is preserved.
- [ ] Modification notices are present where required.
- [ ] Corresponding-source obligations have a tested fulfilment path.
- [ ] Source archives correspond to the exact shipped version.
- [ ] Licence artefacts are included in every relevant distribution format.

### 4.4 shadcn/ui and component registries

- [ ] Official shadcn source is tracked under its applicable MIT terms.
- [ ] Dependencies installed by the CLI are scanned independently.
- [ ] Community registry content has separately established provenance.
- [ ] Included fonts/icons/images have separately verified licences.
- [ ] Copied source retains required notices.
- [ ] Component approval has not bypassed accessibility or security review.

### 4.5 Third-party assets

- [ ] Asset creator/source is recorded.
- [ ] Licence or purchase evidence exists.
- [ ] Commercial-use right is confirmed where needed.
- [ ] Modification right is confirmed where needed.
- [ ] Attribution requirement is implemented.
- [ ] Font embedding/redistribution rights are confirmed.
- [ ] Stock-media restrictions are satisfied.
- [ ] Trademark/brand rights have been considered separately.
- [ ] Model/property/privacy/publicity rights have been considered where relevant.

### 4.6 Contributions

- [ ] `CONTRIBUTING.md` documents inbound terms.
- [ ] DCO, CLA, or approved alternative is selected.
- [ ] Required sign-off/CLA check blocks non-compliant merges.
- [ ] External code provenance is reviewable.
- [ ] Third-party material inside a contribution retains its licence.
- [ ] Corporate contribution requirements are enforced where applicable.

### 4.7 Proprietary software and EULAs

- [ ] Organisational entitlement exists.
- [ ] Production-use rights are confirmed.
- [ ] Redistribution/embedding rights are confirmed.
- [ ] User/device/environment limits are understood.
- [ ] Renewal and ownership are assigned.
- [ ] No unauthorised employee has accepted binding terms on behalf of the organisation.
- [ ] Contract/EULA approval evidence is retained.

### 4.8 Privacy and processors

- [ ] Vendor data flow is documented.
- [ ] Controller/processor roles are identified.
- [ ] Required DPA is executed before processing begins.
- [ ] Sub-processor information is available.
- [ ] International processing locations are understood.
- [ ] Required transfer mechanism is documented.
- [ ] Security review is complete.
- [ ] Retention/deletion obligations are established.
- [ ] Sub-processor change notifications have an owner.
- [ ] Vendor offboarding includes deletion/export requirements.

### 4.9 Exceptions

- [ ] Exception has a concrete dependency/vendor/asset scope.
- [ ] Evidence is attached.
- [ ] Approval authority is identified.
- [ ] Compensating obligations are documented.
- [ ] Expiry or review trigger exists.
- [ ] Exception does not silently apply to future materially different versions.

---

## 5. Canonical summary

Third-party code and assets MUST NOT enter production merely because they are technically available.

Every dependency and asset MUST have:

**known provenance → known licence → policy classification → satisfied obligations → CI enforcement → release evidence.**

Permissive OSS MAY be used when notices and other licence conditions are preserved.

Weak, strong, and network copyleft MUST be evaluated according to the exact licence, modification state, linking/combination model, distribution model, and network architecture.

Commercial-use restrictions, non-commercial terms, field-of-use restrictions, and custom source-available terms MUST NOT be classified as ordinary OSS.

Unknown licences MUST fail closed.

Dependency licence policy MUST be automated in CI, with explicit, evidence-based exceptions. Declared package metadata alone MUST NOT be assumed to describe every licence present in shipped source or binaries.

Required licence texts, copyright notices, attribution, `NOTICE` material, modification disclosures, source offers, and source archives MUST be produced as release artefacts where applicable.

shadcn/ui is the component baseline and its official source is MIT-licensed, but third-party registries, dependencies, fonts, icons, imagery, and other assets MUST be licensed independently. citeturn487803search0turn540677search4

External contributions MUST use an approved inbound mechanism such as DCO or CLA and MUST preserve third-party provenance.

Proprietary libraries, assets, and SaaS integrations MUST have valid organisational entitlements and MUST undergo EULA/contract review when their terms exceed delegated engineering authority.

Where a third party processes personal data, software licensing approval is insufficient. The integration MUST pass to **Privacy & Data Governance** for DPA, sub-processor, transfer, retention, deletion, and related processor controls before production processing begins.

**Canonical chain:**  
**Dependency → Legal & Licensing → Privacy & Data Governance → Governance.**

No downstream governance approval MAY be used to bypass an unresolved dependency licence, source-disclosure obligation, asset-rights issue, contractual restriction, or required data-processing agreement.

This version is suitable as the corpus-level canonical standard rather than a project-specific legal playbook.
