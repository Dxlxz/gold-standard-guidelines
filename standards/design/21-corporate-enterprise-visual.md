---
id: "corporate-enterprise-visual"
title: "Corporate & Enterprise Visual Standards"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "corporate", "enterprise", "visual", "standards"]
applies_to: ["ui"]
related: ["accessibility"]
legacy_number: 101
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 59070
provenance: baseline

---

Research is complete. The specification below separates **institutional visual restraint** from jurisdiction-specific legal obligations, so it can serve banking, insurance, government, healthcare, energy, and environmental organizations without inventing universal regulatory requirements.

# Corporate & Enterprise Visual Standards — Gold Standard 2026

**Canonical placement:** Design Tokens → Visual Standards → **Corporate & Enterprise Visual Standards** → Layout Patterns → Facade → Components  
**Status:** Normative  
**Component baseline:** shadcn/ui  
**Accessibility baseline:** WCAG 2.2 AA unless applicable law, procurement rules, contract, or agency policy requires a higher standard  
**Applies to:** regulated enterprises, financial institutions, insurers, healthcare systems, government and statutory agencies, utilities, energy operators, forestry and environmental agencies, enterprise SaaS, formal corporate documents, executive presentations, public reports, and multi-tenant applications.

---

# 1. Purpose

Corporate and Enterprise Visual Standards define how an organisation presents information when **credibility, continuity, traceability, accessibility, legal clarity, and institutional identity** matter more than visual novelty.

These standards govern:

- conservative and regulated-industry colour systems;
- formal corporate and government documents;
- reports, contracts, invoices, certificates, and letterheads;
- executive and board presentations;
- government and agency identity;
- multilingual institutional publishing;
- accessibility and public-information obligations;
- enterprise application UI;
- dense operational surfaces;
- permission-aware interfaces;
- legacy-system integration;
- multi-tenant theming and co-branding;
- asset governance;
- approval, versioning, and auditability.

This standard MUST NOT be interpreted as requiring every corporate product to appear visually identical.

It requires the opposite: variation MUST occur inside controlled, documented boundaries.

Corporate visual authority MUST come from:

1. authentic identity;
2. clear provenance;
3. consistent use of official assets;
4. restrained hierarchy;
5. accurate information;
6. predictable interaction;
7. accessibility;
8. documented ownership.

The system MUST NOT rely on unsupported colour psychology such as “blue equals trust” or “green equals sustainability.”

Trust MUST be established through provenance, clarity, consistency, accessible presentation, transparent status and sourcing, and correct use of institutional identity.

Mature institutional design systems such as GOV.UK explicitly constrain their approved colour system rather than allowing arbitrary brand-colour selection, while Carbon uses curated palettes designed around accessibility and visual harmony.  
https://design-system.service.gov.uk/styles/colour/  
https://carbondesignsystem.com/data-visualization/color-palettes/

---

# 2. Rules

# 2.1 Regulated and conservative visual posture

Regulated, fiduciary, safety-critical, public-sector, and long-lived enterprise systems MUST prioritize:

- clarity over novelty;
- repeatability over trend;
- status accuracy over decoration;
- legibility over visual density;
- provenance over promotional styling;
- durable design tokens over campaign-specific styling.

A production interface MUST NOT depend on a visual trend that would make the system appear obsolete when that trend changes.

The expected lifetime of core visual conventions SHOULD be measured in years rather than release cycles.

---

# 2.2 Constrained palettes

## 2.2.1 Canonical palette structure

Regulated products SHOULD begin with five semantic colour families:

```text
neutral
brand
informational
positive
caution
critical
```

`neutral` MUST carry most structural UI work:

- page backgrounds;
- application chrome;
- panels;
- cards;
- tables;
- borders;
- dividers;
- typography;
- inactive controls.

The brand family SHOULD be narrower than the neutral family.

One principal brand family and, where required, one controlled secondary accent family SHOULD normally be sufficient.

Semantic status colours MUST remain independent from branding.

For example:

```text
brand.primary ≠ status.success
brand.secondary ≠ status.warning
```

even when the colours happen to resemble each other.

GOV.UK explicitly requires use of its defined palette rather than arbitrary additions, demonstrating the governance value of a controlled institutional palette.  
https://design-system.service.gov.uk/styles/colour/

---

# 2.2.2 Brand-colour restraint

Brand colour SHOULD be used for:

- institutional identification;
- selected navigation;
- primary actions where appropriate;
- controlled highlights;
- limited data-visualization emphasis.

Brand colour SHOULD NOT be applied simultaneously to:

- every heading;
- every icon;
- every link;
- every card border;
- every chart;
- every interactive surface;
- large application backgrounds.

Excessive brand-colour use weakens hierarchy because no element remains visually exceptional.

Semantic alert colours MUST NOT become decorative brand colours.

---

# 2.2.3 Sector-specific posture

The following are canonical **design postures**, not claims of legal requirements.

| Sector | Default visual posture |
|---|---|
| Banking | neutral, precise, stable; strong numerical hierarchy |
| Insurance | neutral, document-oriented, explanatory |
| Government | official identity first; minimal promotional styling |
| Healthcare | high legibility; restrained status colour; explicit safety hierarchy |
| Energy / utilities | operational clarity; strong distinction between normal, caution, alarm |
| Forestry / environmental agencies | evidence-led; restrained natural palette; map/data legibility before decorative colour |

A bank MUST NOT make gains, losses, fraud warnings, and brand emphasis visually indistinguishable.

A healthcare system MUST NOT use emergency or error colours as broad decoration.

An energy-control application MUST preserve alarm/status colour for operational meaning.

An environmental agency MUST NOT use green as proof of environmental performance; claims MUST be supported by actual data and disclosure.

---

# 2.2.4 Trust signalling

Corporate interfaces SHOULD signal institutional authenticity through:

- official legal name;
- approved identity;
- clear domain/provenance;
- document owner;
- publication or effective date;
- version;
- data source;
- last-updated state;
- official contact route;
- security/privacy disclosures where required.

Decorative seals, simulated security badges, fake certification marks, faux embossing, and ornamental “official-looking” elements MUST NOT be used to manufacture legitimacy.

Government crests, institutional marks, accreditation logos, and regulatory marks MUST only be used according to their governing rules.

---

# 2.2.5 Accessibility and colour

Colour MUST NOT be the sole mechanism for communicating:

- approval;
- error;
- warning;
- selection;
- financial gain or loss;
- operational alarm;
- permission;
- document classification.

WCAG 2.2 defines requirements including text contrast, non-text contrast, information relationships, focus visibility, target sizing, and use of colour.  
https://www.w3.org/TR/WCAG22/

Tenant, campaign, or departmental branding MUST NOT override these requirements.

---

# 2.3 Formal document standards

Formal documents include:

- annual and statutory reports;
- board papers;
- policy papers;
- official letters;
- contracts;
- tender documents;
- invoices;
- certificates;
- statements;
- memoranda;
- regulatory submissions.

Formal documents MUST use controlled templates.

Documents with legal, financial, governance, or regulatory significance MUST NOT depend on discretionary user formatting.

---

# 2.4 Report covers

A report cover MUST establish document identity immediately.

Canonical cover hierarchy:

```text
approved institutional identity

document title

document subtype / reporting period

issuing organisation or division

publication / effective date

version or classification where applicable
```

Report covers SHOULD use large areas of neutral or approved institutional colour.

They SHOULD NOT contain dashboard-style collections of unrelated statistics.

Photographs and illustrations MAY be used where the organisation's identity rules permit them, but MUST NOT interfere with:

- title legibility;
- classification markings;
- official identity;
- publication metadata.

Decorative visual effects MUST remain subordinate to the document's institutional identity.

---

# 2.5 Letterheads

Official letterheads MUST use an approved master template.

The template MUST define:

- logo, crest, or emblem placement;
- legal entity name;
- organisation or division name;
- correspondence address where required;
- official contact details;
- registration or statutory information where required;
- page margins;
- continuation-page behaviour.

Continuation pages SHOULD use reduced identity treatment rather than repeating a large first-page masthead.

Official correspondence MUST NOT be recreated manually from copied logos and text boxes.

---

# 2.6 Contracts

Contract templates MUST prioritize unambiguous structure.

They MUST provide stable styling for:

- title;
- parties;
- recitals;
- definitions;
- numbered clauses;
- nested clauses;
- schedules;
- annexes;
- signature sections;
- page numbering.

Clause hierarchy MUST NOT depend on indentation alone.

Numbering, typography, and spacing MUST make hierarchy independently identifiable.

Contracts SHOULD avoid decorative backgrounds, large colour fields, gradients, and ornamental illustrations.

The visual system MUST NOT obscure the legal structure of the document.

---

# 2.7 Invoices and financial documents

Invoice design MUST be subordinate to accounting, tax, and statutory content requirements.

Design MUST NOT remove or rename required data because it complicates the composition.

Invoices SHOULD provide strong hierarchy for:

```text
invoice identity
supplier
customer
invoice number
issue date
due date
line items
tax
subtotal
total
payment instructions
legal/statutory information
```

Numbers in comparable financial columns SHOULD use consistent alignment.

Currency, sign, decimal precision, negative-value representation, and locale MUST follow the Data and Internationalization standards.

Colour MUST NOT be the only indication that an invoice is overdue, credited, reversed, or disputed.

---

# 2.8 Certificates

Certificates MUST use a controlled template appropriate to the authority being represented.

Where applicable, the certificate SHOULD contain:

- issuing authority;
- recipient;
- award/qualification/status;
- issue date;
- unique reference or serial identifier;
- authorised role/signatory;
- verification mechanism;
- expiry date where relevant.

Security-relevant certificates MUST NOT rely on decorative seals or scanned signatures as proof of authenticity.

Verification MUST follow the Security, PKI, identity, or records-management standard applicable to the certificate.

---

# 2.9 Signature blocks

Signature blocks MUST distinguish:

```text
signatory name
role/title
organisation
signature
date
```

where those fields are required.

Signature regions MUST provide sufficient whitespace for physical or digital signing.

A signature image MUST NOT be treated as equivalent to a cryptographic or platform-verifiable digital signature.

Stored signature image assets SHOULD be treated as controlled assets where misuse could misrepresent authorization.

---

# 2.10 Formal-document typography

Formal documents SHOULD use a restrained type system.

Recommended architecture:

```text
1 primary text family
+
optional approved display/identity family
+
optional monospace family for technical identifiers
```

A single document SHOULD NOT casually combine multiple unrelated typefaces.

Body typography MUST optimize long-form reading rather than marketing expression.

Contracts, regulatory reports, policies, and board papers SHOULD generally use:

- moderate line lengths;
- visible heading hierarchy;
- consistent paragraph spacing;
- controlled emphasis;
- predictable tables;
- sufficient whitespace.

Bold MUST NOT replace structural hierarchy.

ALL CAPS SHOULD be reserved for short classification, legal, or identity labels where established practice requires it.

---

# 2.11 Pagination

Formal multipage documents MUST define pagination behaviour before publication.

Rules MUST cover:

- first-page numbering;
- front matter;
- body numbering;
- appendices;
- repeated headers;
- repeated table headers;
- footnotes;
- endnotes;
- continuation pages.

Headings SHOULD remain with sufficient following content.

Table headings SHOULD repeat across page breaks.

A table row SHOULD NOT split across pages when the split makes the information materially harder to interpret.

Contracts, invoices, formal notices, and regulated forms SHOULD normally use continuous, unambiguous page numbering.

Where document integrity matters, use:

```text
Page 7 of 23
```

rather than an isolated page number.

---

# 2.12 PDF structure and accessibility

A PDF intended as an accessible digital document MUST preserve meaningful document structure.

Where applicable it MUST include:

- tagged headings;
- lists;
- tables;
- alternative text;
- reading order;
- link semantics;
- form-field labels;
- language metadata;
- document title metadata.

W3C PDF accessibility guidance specifically notes that tagged structure and correct reading/tab order are necessary for keyboard and assistive-technology users.  
https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF3

A visually correct PDF MUST NOT be assumed to be an accessible PDF.

The source document SHOULD be structured correctly before PDF export rather than relying on post-export remediation.

Archival formats such as PDF/A MUST be used where records-management policy requires them.

Print-production standards such as PDF/X SHOULD be used where the print provider or publishing workflow requires them.

---

# 2.13 Print colour: RGB vs CMYK

Digital and print outputs MUST be treated as separate production targets.

**Screen-first output** SHOULD normally use the organisation's approved RGB/sRGB digital palette.

**Commercial print output** MUST use the colour-management workflow specified by the printer or publishing authority.

This MAY require:

- CMYK process colour;
- a supplied ICC profile;
- spot colours;
- PDF/X output intent;
- managed RGB content converted downstream.

The design team MUST NOT assume that indiscriminately converting every source asset to CMYK produces the best print result.

Adobe provides dedicated colour-management and CMYK print-PDF workflows because print colour requires an explicit production context rather than the screen colour model alone.  
https://helpx.adobe.com/ph_en/express/web/print-and-export/export-pdfs-with-cmyk-color-profile.html

Brand guidelines SHOULD maintain documented digital and print colour definitions separately.

---

# 2.14 Bleed, trim, and printer marks

Bleed MUST be included when graphics, imagery, or colour are intended to extend to the physical trim edge.

Bleed MUST follow the print supplier's required specification.

Designers MUST NOT guess a production bleed when the printer has provided one.

Crop, bleed, registration, and other printer marks MUST be generated through the approved export workflow rather than manually drawn onto the artwork.

Adobe's print-production guidance distinguishes the page trim area, bleed area, and printer marks and provides dedicated export controls for them.  
https://helpx.adobe.com/illustrator/using/printers-marks-bleeds.html

Digital-only PDFs MUST NOT contain unnecessary crop marks or bleed unless they also serve as print masters.

---

# 2.15 Executive and board-facing presentations

Executive presentations are decision-support artifacts.

They MUST optimize for:

- rapid comprehension;
- confidence in provenance;
- decision relevance;
- consistency;
- printability;
- traceable evidence.

They MUST NOT optimize for animation spectacle.

---

# 2.16 Slide format and grid

The approved corporate presentation template MUST define the slide ratio.

16:9 SHOULD be the default for new digital presentation systems unless:

- a government template requires another format;
- an existing board-room environment requires another ratio;
- the output is primarily print-oriented.

Slides SHOULD use a 12-column compositional grid.

The canonical structure SHOULD contain:

```text
title zone
content grid
footer / provenance zone
```

Visual elements MUST align to common grid edges.

Slide layouts MUST NOT rely on arbitrary individual text-box placement.

A deck SHOULD maintain a small set of canonical layouts:

- title;
- agenda;
- section divider;
- message + evidence;
- chart;
- comparison;
- decision;
- appendix.

---

# 2.17 Executive slide hierarchy

Every substantive slide MUST answer a clear question or communicate a coherent point.

The title SHOULD normally communicate either:

- the subject of the slide; or
- the primary evidence-based conclusion.

Slides MUST NOT contain multiple unrelated messages merely because unused space remains.

Dense board papers MAY use more information than investor or keynote decks, but the reading order MUST remain obvious.

---

# 2.18 Chart rules

Charts MUST present evidence, not decoration.

Every chart MUST make the following determinable where applicable:

```text
what is measured
unit
population / scope
time period
source
comparison basis
```

Government Analysis Function guidance explicitly treats titles, accessible descriptions, downloadable data, and supporting information as part of chart publication rather than optional decoration.  
https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/

Charts MUST NOT:

- use 3D perspective where it distorts comparison;
- truncate an axis in a way that materially misrepresents magnitude;
- omit units;
- use unexplained colour;
- rely solely on colour distinctions;
- introduce decorative gradients that obscure quantitative meaning.

Official UK government data-visualisation guidance similarly warns against misleading axes, unclear sources, missing context, and decorative distortion, and recommends grouping related metrics and using size/position to convey importance in dashboards.  
https://www.gov.uk/government/publications/a-bite-sized-guide-to-visualising-data-a-dstl-biscuit-book/a-bite-sized-guide-to-visualising-data

---

# 2.19 Executive chart colour

Chart colour MUST be functional.

Use colour to identify:

- highlighted series;
- categories;
- status;
- thresholds;
- comparison groups.

Brand colour SHOULD usually identify the organisation's highlighted series or principal emphasis, not every mark.

A multi-series chart SHOULD use the smallest categorical palette that faithfully communicates the data.

Carbon's data-visualization guidance uses purpose-built categorical, sequential, diverging, and alert palettes rather than one undifferentiated corporate palette.  
https://carbondesignsystem.com/data-visualization/color-palettes/

---

# 2.20 Slide sources and citations

Material claims in board, executive, investment, public-policy, compliance, and audit presentations MUST be traceable.

A chart or table SHOULD include a compact source line such as:

```text
Source: National Statistics Office, Labour Force Survey,
Q2 2026; retrieved 14 Sep 2026.
```

Where a dataset has a stable identifier, report name, filing number, DOI, or internal source ID, that identifier SHOULD be included.

Long URLs SHOULD normally be moved to:

- presenter notes;
- appendix;
- source register;
- hyperlink metadata.

Source text MUST remain readable.

Sources MUST NOT be reduced to illegibly small type merely to preserve a visual layout.

---

# 2.21 Slide footers

The approved footer SHOULD define fixed positions for applicable:

```text
organisation
deck title
date/version
slide number
source marker
classification
```

The cover and deliberate section-divider slides MAY omit some footer elements.

Footer placement MUST remain consistent across a deck.

---

# 2.22 Disclosure and confidentiality markings

Security and confidentiality markings MUST come from the organisation's approved information-classification system.

Designers MUST NOT invent classifications such as:

```text
SUPER SECRET
PRIVATE+
BOARD ONLY+
```

unless those exact labels are governed classifications.

Where applicable, a classification label SHOULD appear in a consistent location, such as:

```text
top-right
and/or
footer
```

Watermarks MAY supplement classification but MUST NOT make body text difficult to read.

A classification label MUST NOT substitute for actual access control.

The Security standard remains authoritative for:

- distribution;
- encryption;
- rights management;
- retention;
- revocation;
- data-loss prevention.

---

# 2.23 Government and agency identity

Government identity MUST be treated as an authority-controlled asset system.

An agency MUST NOT independently reinterpret:

- a national crest;
- coat of arms;
- departmental emblem;
- ministry mark;
- official seal;
- flag;
- statutory symbol.

Official identity rules take precedence over generic corporate styling.

---

# 2.24 Crest and emblem usage

Official crests and emblems MUST be sourced from an authorized repository.

They MUST NOT be:

- redrawn;
- recoloured outside approved versions;
- stretched;
- skewed;
- cropped;
- outlined;
- shadowed;
- combined into a new logo without approval.

Clear-space and minimum-size rules from the responsible authority MUST be followed.

For Malaysia, the Federal Coat of Arms (`Jata Persekutuan/Jata Negara`) is an official government symbol subject to formal government usage guidance. Implementations MUST follow the current controlling circular/guideline rather than reconstructing the emblem independently.  
https://www.jpm.gov.my/ms/surat-pekeliling-am/penggunaan-jata-persekutuan

Current Malaysian public-sector digital guidance SHOULD be checked against the appropriate Jabatan Digital Negara guidance repository rather than relying on historical screenshots or copied agency sites.  
https://www.jdn.gov.my/garis-panduan/

---

# 2.25 Agency vs campaign identity

Permanent agency identity MUST be visually separable from:

- temporary programmes;
- campaigns;
- national initiatives;
- public-awareness brands;
- event identities.

A temporary campaign logo MUST NOT displace the legal identity of the issuing agency where official identity is required.

Campaign styling MUST NOT cause an official public service to resemble a commercial advertisement.

---

# 2.26 Dual-language and multilingual publishing

Where legislation, agency policy, service policy, contractual obligation, or publication rules require more than one language, all governed languages MUST receive equivalent treatment.

For a Bahasa Melayu + English implementation, the system MUST define:

- which language is primary, where policy defines one;
- whether pages are parallel or language-switchable;
- terminology ownership;
- translation approval;
- version synchronization;
- date/version parity.

A translated page MUST NOT silently lag behind the authoritative version where the information affects:

- rights;
- eligibility;
- financial obligations;
- safety;
- legal interpretation;
- public-service access.

Machine translation MAY assist drafting but SHOULD NOT be the sole publication method for regulated, legal, clinical, financial, or statutory text.

WCAG requires the language of a page and language changes within content to be programmatically identifiable, which applies independently of an organisation's bilingual policy.  
https://www.w3.org/TR/WCAG22/#language-of-page  
https://www.w3.org/TR/WCAG22/#language-of-parts

A language switcher MUST use language names rather than flags.

For example:

```text
Bahasa Melayu
English
```

rather than using national flags as language labels.

---

# 2.27 Bilingual layout

A bilingual system MAY use:

1. parallel documents;
2. language-switched documents;
3. side-by-side publication where legally or operationally necessary.

Side-by-side bilingual text SHOULD NOT be the default for long documents because it materially reduces available reading width.

When two complete language versions exist, document identifiers SHOULD make the language explicit:

```text
POL-104-BM-v3.2
POL-104-EN-v3.2
```

Both SHOULD resolve to the same underlying controlled-document version.

---

# 2.28 Government accessibility

Public-sector products MUST comply with the accessibility requirements applicable to their jurisdiction, procurement contract, funding framework, and agency policy.

This Gold Standard requires **WCAG 2.2 AA as the default technical baseline** where a stricter requirement does not supersede it.  
https://www.w3.org/TR/WCAG22/

A statement such as “government compliant” MUST NOT be made solely because colours pass contrast checks.

Acceptance MUST consider, as applicable:

- keyboard operation;
- focus;
- reflow;
- labels;
- error handling;
- headings;
- language metadata;
- target sizing;
- document structure;
- PDF tagging;
- media alternatives;
- authentication;
- status messages.

---

# 2.29 Transparency and public-data surfaces

Where an agency is required or expected to publish datasets, decisions, notices, reports, tenders, or other public information, the visual system SHOULD make those destinations readily identifiable.

Published datasets SHOULD expose useful provenance such as:

- publishing agency;
- dataset owner;
- update date;
- temporal coverage;
- units;
- licence;
- download/API link;
- metadata.

Malaysia's `data.gov.my` identifies itself as the country's official open-data portal and provides a central data catalogue and API surface.  
https://data.gov.my/  
https://developer.data.gov.my/

Agency sites SHOULD link to the authoritative transparency/data destination instead of maintaining conflicting copies where a canonical public repository exists.

---

# 2.30 Enterprise product UI

Enterprise UI MUST be designed for repeated, long-duration use.

Its visual language SHOULD therefore optimize:

- recognition;
- stable location;
- efficient scanning;
- predictable interaction;
- low visual fatigue;
- controlled density.

Routine workflows MUST NOT be repeatedly redesigned solely to appear new.

---

# 2.31 Dense data tables

Data tables SHOULD be used where users need to inspect, compare, sort, select, or act on structured records.

The table SHOULD receive substantial horizontal space.

Carbon specifically recommends giving dense tables adequate width and avoiding placement inside cramped nested containers; it also defines multiple row sizes for different density requirements.  
https://carbondesignsystem.com/components/data-table/usage/

The canonical table MUST define:

- header treatment;
- row density;
- sort state;
- selection state;
- pagination or virtualization;
- empty state;
- loading state;
- filtering;
- batch actions;
- column alignment;
- overflow behaviour.

Numeric data SHOULD be aligned consistently.

Dates and status labels SHOULD use predictable formats.

Header and data-row density SHOULD remain compatible.

A compact header above spacious rows or vice versa SHOULD NOT be introduced without a documented reason.

---

# 2.32 shadcn/ui table baseline

shadcn/ui `Table` SHOULD be the structural baseline for straightforward tables.

More advanced enterprise requirements MAY combine approved primitives with:

- TanStack Table;
- server-side sorting;
- server-side filtering;
- virtualization;
- column pinning;
- large-data pagination.

An advanced data-grid library MUST still map back to:

- canonical tokens;
- accessibility rules;
- permission semantics;
- status colours;
- density modes;
- focus behaviour.

The introduction of a third-party data grid MUST NOT create a second visual system.

---

# 2.33 Permission-aware affordances

Permission presentation MUST remain aligned with Security and authorization policy.

The UI MAY:

- hide unavailable actions;
- disable actions with an explanation;
- expose read-only state;
- indicate that approval is required.

The correct choice depends on the user's legitimate knowledge of the capability.

The UI MUST NOT reveal restricted information merely through:

- disabled buttons;
- tooltips;
- hidden menu labels;
- inaccessible routes.

Server/API authorization remains authoritative.

Visual hiding MUST NEVER be treated as access control.

---

# 2.34 Permission changes

Enterprise products MUST tolerate permission changes during a session.

If authorization changes after a screen has loaded:

- stale actions MUST fail safely;
- the UI SHOULD refresh relevant capabilities;
- data MUST NOT remain usable solely because it was previously rendered;
- authorization failures MUST present an intelligible state.

State Management MUST NOT cache authorization indefinitely for visual convenience.

---

# 2.35 Legacy-system integration

A modern enterprise shell MAY need to coexist with older applications.

Legacy integration MUST identify system boundaries clearly.

Possible patterns include:

- routed handoff;
- embedded module;
- compatibility shell;
- API-backed replacement facade.

A legacy application SHOULD NOT be cosmetically restyled until it appears modern while retaining incompatible or inaccessible interaction behaviour underneath.

Visual modernization MUST NOT conceal:

- navigation changes;
- different authentication context;
- different permissions;
- different save semantics;
- different data freshness.

Where an iframe or embedded legacy system is unavoidable, its keyboard, focus, sizing, authentication, and session boundaries MUST be tested explicitly.

---

# 2.36 Long-lived screens

Operational screens that remain open for long periods SHOULD minimize unnecessary visual change.

Examples include:

- command centres;
- monitoring dashboards;
- claims queues;
- hospital administration;
- trading/treasury operations;
- energy-control surfaces;
- environmental monitoring.

Such screens SHOULD avoid:

- animated decorative backgrounds;
- pulsing non-critical elements;
- auto-rotating panels;
- continuously moving banners;
- gratuitous transition effects.

Live changes SHOULD occur because data changed, not because the UI needs visual activity.

---

# 2.37 Motion

Enterprise motion MUST communicate:

- causality;
- state transition;
- spatial relationship;
- progress.

Motion MUST NOT exist solely to make routine actions feel more “premium.”

Frequent workflows SHOULD use little or no transition delay.

Critical status change SHOULD normally use persistent visual state rather than repeating animation.

User preferences for reduced motion MUST be respected under the Accessibility standard.  
https://www.w3.org/TR/WCAG22/

---

# 2.38 Multi-tenant corporate theming

Multi-tenant theming MUST be constrained by a platform-owned contract.

A tenant MUST NOT receive arbitrary control over the entire component stylesheet.

The platform SHOULD expose approved theme inputs such as:

```text
tenant.logo
tenant.wordmark
tenant.brand.primary
tenant.brand.secondary
tenant.favicon
tenant.displayName
```

The platform MUST retain ownership of:

```text
semantic.error
semantic.warning
semantic.success
semantic.info
surface
foreground
focus
disabled
border
interaction
```

---

# 2.39 Tenant colour injection

Tenant colour MUST pass through validation before publication.

The system MUST calculate or select appropriate foreground colours rather than trusting a tenant to supply them.

For example:

```text
tenant supplies:
brand.primary = #...

platform determines:
on-brand-primary
brand-hover
brand-active
brand-subtle
focus treatment
```

An inaccessible tenant brand colour MUST NOT be applied directly to text, controls, charts, or focus treatment.

WCAG contrast requirements remain applicable regardless of who supplied the tenant colour.  
https://www.w3.org/TR/WCAG22/#contrast-minimum  
https://www.w3.org/TR/WCAG22/#non-text-contrast

---

# 2.40 Tenant semantic-colour protection

Tenants MUST NOT redefine semantic status meaning.

A tenant theme MAY alter a success colour only through an approved accessible semantic mapping.

It MUST NOT redefine:

```text
success → tenant red
error   → tenant green
warning → ordinary brand colour
```

if doing so breaks established application meaning.

Brand identity is subordinate to interaction semantics.

---

# 2.41 Tenant typography

Tenant typography MUST be constrained to an approved set.

A tenant SHOULD NOT be able to inject arbitrary remote-font URLs.

Approved tenant fonts MUST satisfy:

- licensing;
- security;
- privacy;
- performance;
- glyph coverage;
- language coverage;
- accessibility;
- fallback metrics.

Legal, financial, operational, and multilingual content MUST remain usable when the tenant font fails to load.

The platform MAY restrict tenant typography to headings while retaining system body typography.

---

# 2.42 Theme tokens and styling hooks

Themeable applications SHOULD expose semantic styling hooks instead of allowing tenants to override implementation CSS selectors.

Salesforce's Lightning Design System follows this type of model through global styling hooks for colour and other foundational properties, supporting theme variation without requiring uncontrolled component-specific CSS replacement.  
https://www.lightningdesignsystem.com/2e1ef8501/p/777f5a-global-styling-hooks

Theme contracts SHOULD operate at the token layer.

They SHOULD NOT depend on DOM shape or generated class names.

---

# 2.43 Co-branding lockups

When the platform and tenant identities appear together, an approved co-branding lockup MUST define:

- order;
- separator;
- relative size;
- clear space;
- minimum size;
- monochrome variants;
- dark/light background variants.

The interface MUST NOT dynamically squeeze several logos into whatever width remains.

At constrained widths, the system SHOULD transform to a documented compact lockup or a single approved identity.

Government crests, statutory seals, and regulated marks MUST follow their own governing identity rules even when the commercial platform supports tenant branding.

---

# 2.44 Co-branding hierarchy

The interface MUST make clear who:

- operates the platform;
- provides the service;
- owns the data;
- issues the document;
- is legally responsible.

These roles are not necessarily the same organisation.

Visual co-branding MUST NOT create misleading institutional attribution.

---

# 2.45 Governance

Corporate visual standards MUST have explicit ownership.

A visual system without governance will eventually fragment even when the initial design system is well specified.

Governance MUST cover:

- design tokens;
- visual identity;
- templates;
- icons;
- photography;
- typography;
- charts;
- presentation masters;
- document masters;
- tenant theming;
- government marks;
- generated PDFs;
- component styling.

---

# 2.46 Approval workflow

Material visual changes MUST follow an approval workflow.

Canonical sequence:

```text
1. Proposal
2. Rationale
3. Impact analysis
4. Prototype / sample
5. Accessibility review
6. Brand / identity review
7. Security / legal / compliance review where applicable
8. Technical review
9. Approval
10. Versioned release
11. Migration communication
12. Archive / supersession
```

A change MUST identify affected outputs.

For example:

```text
UI
PDF
print
email
presentation
tenant themes
public website
mobile
```

A colour-token change MUST NOT be approved solely by reviewing one light-theme screen.

---

# 2.47 Approval authority

Approval MUST be role-based.

Typical ownership SHOULD include:

| Change | Required authority |
|---|---|
| Design token | Design-system owner |
| Core brand identity | Brand / corporate communications |
| Accessibility-sensitive component | Accessibility owner |
| Security/classification treatment | Security owner |
| Government crest/emblem | Governing identity authority |
| Contract/legal template | Legal |
| Invoice template | Finance/tax owner |
| Board template | Corporate secretary / communications as applicable |
| Tenant-theme contract | Platform/design-system owner |
| Clinical/safety status visual | Domain safety owner |
| Public-data publication pattern | Data/publication owner |

Not every change requires every authority.

The approval matrix MUST define which reviews are mandatory.

---

# 2.48 Asset repository

A single authoritative repository MUST exist for controlled visual assets.

Controlled assets include:

- logos;
- crests;
- seals;
- signatures where approved;
- icons;
- letterheads;
- PowerPoint/Keynote masters;
- report templates;
- certificate masters;
- print artwork;
- approved photography;
- colour profiles.

Each governed asset SHOULD have metadata equivalent to:

```text
asset ID
title
owner
status
version
approved date
review/expiry date
permitted use
file format
colour space
language
licence/rights
supersedes / superseded by
```

Users SHOULD download approved masters from this repository rather than copy assets from existing PDFs, websites, or presentations.

---

# 2.49 Master assets

Vector logos MUST be retained as vector masters.

Raster derivatives MAY be generated for approved use cases.

A PNG copied from a website MUST NOT become the print master for an official logo.

Print and digital variants SHOULD be managed independently where their colour-space or reproduction requirements differ.

---

# 2.50 Versioning

Design standards and governed templates MUST be versioned.

Machine-consumed design-system packages SHOULD use semantic or equivalent release versioning.

Human document/presentation templates MAY use a version and approval date:

```text
Board Deck Master v4.1
Approved: 2026-06-12
```

A template release MUST NOT silently overwrite the historical asset without a trace.

---

# 2.51 Audit trail

The governance system MUST retain an audit trail for material visual changes.

The record SHOULD identify:

```text
what changed
why
who proposed it
who approved it
when
which assets changed
which version was replaced
required migration
exceptions
```

A regulated document template SHOULD be reproducible from its historical approved version.

---

# 2.52 Exceptions

Exceptions MUST be:

- explicit;
- documented;
- approved;
- scoped;
- time-bounded where appropriate.

An exception MUST NOT silently become the new standard through repeated copying.

A repeated exception SHOULD trigger review of the underlying standard.

---

# 2.53 Alignment with Security

Corporate visuals MUST NOT create false security boundaries.

Examples:

```text
hidden ≠ unauthorized
blurred ≠ protected
watermarked ≠ access-controlled
disabled ≠ server-denied
```

Classification styling supplements Security controls; it does not replace them.

Sensitive assets, including official signatures and restricted templates, MUST follow the Security asset-handling standard.

---

# 2.54 Alignment with Data & Database

Visual density MUST NOT justify uncontrolled data retrieval.

A table showing 100 visible rows MUST NOT imply that an entire multimillion-record dataset should be transferred to the browser.

Large enterprise datasets MUST use approved:

- pagination;
- windowing;
- virtualization;
- aggregation;
- server-side filtering.

Display labels MUST NOT become substitute database semantics.

---

# 2.55 Alignment with API

Permission-aware presentation MUST derive from an authoritative capability or authorization model.

UI code SHOULD NOT duplicate complex permission logic independently from the API/domain layer.

Theme selection SHOULD use a stable tenant/theme contract.

Visual theme payloads MUST NOT permit executable style/code injection.

---

# 2.56 Alignment with State Management

Persisted corporate UI preferences MAY include:

- density;
- column widths;
- pinned columns;
- sidebar state;
- theme;
- tenant identity.

Persisted preferences MUST be validated against current policy and component versions.

A previously valid tenant theme MUST fall back safely if a new accessibility or token rule makes it invalid.

---

# 2.57 Alignment with Forms & Validation

Forms in regulated systems SHOULD remain visually conservative.

Required, optional, validation, approval, and review state MUST be explicit.

Financial, legal, healthcare, and government submissions SHOULD implement appropriate error prevention and confirmation before consequential submission.

WCAG specifically contains error-prevention requirements for legal, financial, and data transactions.  
https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data

---

# 2.58 Alignment with Components and Patterns

shadcn/ui SHOULD remain the default primitive baseline for:

- buttons;
- forms;
- tables;
- dialogs;
- sheets;
- tabs;
- badges;
- tooltips;
- popovers;
- navigation;
- alerts;
- skeletons.

Brand styling MUST be applied through canonical Design Tokens.

Teams MUST NOT fork every primitive merely to apply corporate colours.

Layout Patterns continue to govern page-level composition.

Corporate Visual Standards govern the **institutional treatment of those patterns**.

---

# 3. Anti-patterns

## 3.1 Colour psychology presented as governance

Non-conformant:

```text
“We're a bank, so everything should be blue because blue means trust.”
```

Trust MUST NOT be reduced to a colour choice.

---

## 3.2 Brand saturation

Do NOT make every:

- button;
- heading;
- icon;
- card;
- navigation item;
- chart series

the corporate primary colour.

---

## 3.3 Semantic colour collision

A brand colour MUST NOT make:

```text
normal
warning
critical
selected
```

indistinguishable.

---

## 3.4 Fake official styling

Do NOT create decorative:

- crests;
- embossed seals;
- pseudo-certification marks;
- “verified” badges;
- security emblems

that are not authorized identities.

---

## 3.5 Recreated government marks

A crest copied from Google Images, traced from a JPEG, recoloured, or manually typeset into a new government lockup is non-conformant.

---

## 3.6 Document-as-poster

Contracts, invoices, policies, and board papers MUST NOT be treated as promotional posters.

Information structure comes first.

---

## 3.7 Screenshot PDF

A scanned or flattened PDF MUST NOT be used when accessible text and structure can reasonably be preserved.

---

## 3.8 Fake PDF redaction

Drawing a black rectangle over sensitive text is NOT an acceptable redaction workflow.

Redaction MUST follow the Security and Records standard using tools that actually remove the underlying information.

---

## 3.9 Tiny legal footer

Required disclosures MUST NOT be deliberately reduced until functionally unreadable.

If required text does not fit, redesign the composition or move extended disclosure to an explicitly linked appendix where legally acceptable.

---

## 3.10 Arbitrary print conversion

Do NOT convert every graphic to CMYK using an arbitrary profile simply because output is destined for paper.

Follow the actual production workflow.

---

## 3.11 Manual crop marks

Do NOT draw crop or bleed marks manually.

Use approved print-export tooling.  
https://helpx.adobe.com/illustrator/using/printers-marks-bleeds.html

---

## 3.12 Board-deck theatre

Avoid:

- cinematic transitions;
- auto-playing video backgrounds;
- decorative 3D charts;
- animated counters;
- parallax;
- excessive build animations.

A board deck is a decision artifact, not a product launch keynote by default.

---

## 3.13 Untraceable chart

A chart without:

```text
metric
unit
period
scope
source
```

where those facts are necessary to interpret it is non-conformant.

---

## 3.14 Misleading axes

Axes MUST NOT be manipulated to exaggerate a difference without an explicit analytical reason and clear disclosure.

Official UK government visualization guidance specifically identifies distorted or unclear axes and missing source/context as misleading practices.  
https://www.gov.uk/government/publications/a-bite-sized-guide-to-visualising-data-a-dstl-biscuit-book/a-bite-sized-guide-to-visualising-data

---

## 3.15 Confidential watermark as security

A `CONFIDENTIAL` watermark MUST NOT be treated as permission enforcement.

---

## 3.16 Language drift

The English version of a regulated service MUST NOT silently contain materially different rights, dates, fees, eligibility, or policy from the Bahasa Melayu version.

---

## 3.17 Flag-as-language selector

Do NOT use:

```text
🇲🇾 = Bahasa Melayu
🇬🇧 = English
```

A flag identifies a place or nation, not a language.

Use language names.

---

## 3.18 Tenant CSS injection

A tenant MUST NOT be allowed to submit unrestricted CSS into the shared application shell.

---

## 3.19 Tenant accessibility override

A tenant request such as:

```text
“Use our yellow text on white because it is our official colour.”
```

MUST NOT override accessibility requirements.

---

## 3.20 Tenant semantic overwrite

Tenant branding MUST NOT redefine error, success, warning, or destructive semantics beyond the approved semantic theme contract.

---

## 3.21 Legacy camouflage

Do NOT make an old application visually indistinguishable from the new shell if its:

- navigation;
- authentication;
- save behaviour;
- keyboard model;
- data freshness

remain materially different.

Users must be able to understand system boundaries.

---

## 3.22 Excessive enterprise motion

Routine row selection MUST NOT trigger elaborate animation.

Operational alarms MUST NOT use continuous movement where a stable, persistent warning state communicates the problem adequately.

---

## 3.23 Asset-by-email governance

Email attachments MUST NOT become the master repository for:

- logos;
- contracts;
- report templates;
- board templates;
- certificates.

---

## 3.24 Silent master replacement

Replacing:

```text
Corporate_Template_Final_v7_REALFINAL.pptx
```

with a different file under the same identity is non-conformant governance.

---

# 4. Acceptance Checklists

# 4.1 Print and formal-document acceptance

A formal print/PDF artifact MUST NOT be released until all applicable checks pass.

### Identity

- [ ] Correct approved logo, crest, seal, or wordmark is used.
- [ ] Asset came from the authoritative repository.
- [ ] Logo proportions are unchanged.
- [ ] Correct print/digital identity variant is used.
- [ ] Clear-space/minimum-size rules are satisfied.
- [ ] Co-branding hierarchy is approved.

### Document governance

- [ ] Document owner is identified.
- [ ] Version is correct.
- [ ] Effective/publication date is correct.
- [ ] Classification is correct where applicable.
- [ ] Superseded versions are controlled.
- [ ] Required legal/compliance review is complete.

### Typography and layout

- [ ] Body type is appropriate for sustained reading.
- [ ] Heading hierarchy is consistent.
- [ ] Clause/list numbering is correct.
- [ ] Tables remain legible.
- [ ] Headers and footers are consistent.
- [ ] Page breaks do not materially damage interpretation.
- [ ] Page numbering is complete and appropriate.

### Accessibility

- [ ] Source file uses meaningful structure.
- [ ] PDF is tagged where required.
- [ ] Reading order has been checked.
- [ ] Headings are represented structurally.
- [ ] Tables are appropriately tagged.
- [ ] Images have appropriate alternative treatment.
- [ ] Document language is set.
- [ ] Interactive fields have labels.
- [ ] Keyboard/tab order is logical.

W3C guidance for PDFs specifically treats tagged structure and correct reading/tab order as accessibility requirements.  
https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF3

### Print production

- [ ] Final trim size is correct.
- [ ] Bleed matches printer specification.
- [ ] Full-bleed artwork extends into the bleed.
- [ ] Printer marks are generated correctly where requested.
- [ ] Output profile matches production requirements.
- [ ] Correct RGB/CMYK/spot-colour workflow is used.
- [ ] Image resolution is appropriate to production requirements.
- [ ] Fonts are correctly embedded/licensed or otherwise handled.
- [ ] A physical or contract proof has been reviewed where required.

Adobe provides dedicated marks-and-bleed controls specifically for print-production output.  
https://helpx.adobe.com/illustrator/using/printers-marks-bleeds.html

### Content

- [ ] Names and titles are correct.
- [ ] Dates are correct.
- [ ] Financial totals reconcile.
- [ ] Required statutory fields remain present.
- [ ] Signature roles are correct.
- [ ] Links/QR codes resolve.
- [ ] Translation versions are synchronized.
- [ ] Sources and references are complete.

---

# 4.2 Executive and board presentation acceptance

### Template

- [ ] Approved master is used.
- [ ] Correct slide ratio is used.
- [ ] Grid alignment is consistent.
- [ ] Footer placement is consistent.
- [ ] Slide numbering is correct.
- [ ] Correct organisational identity appears.

### Executive communication

- [ ] Each substantive slide has a clear purpose.
- [ ] The title accurately represents the evidence.
- [ ] Decision/request slides make the requested action explicit.
- [ ] Supporting detail has been moved to appendix where appropriate.
- [ ] Visual hierarchy identifies the primary message quickly.

### Charts

- [ ] Chart type matches the analytical question.
- [ ] Units are shown.
- [ ] Time period is shown.
- [ ] Population/scope is clear.
- [ ] Axes are not misleading.
- [ ] Colour is not the sole encoding.
- [ ] Source is shown.
- [ ] Significant assumptions are disclosed.
- [ ] Required alternative text or accompanying description is provided.

Government Analysis Function guidance treats accessible supporting material, chart titles, and source/data context as part of responsible chart publication.  
https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/

### Sources

- [ ] Material external claims are traceable.
- [ ] Dataset/source owner is identified.
- [ ] Reporting period/as-of date is included where material.
- [ ] Long URLs are available in notes/appendix where needed.
- [ ] Source text remains readable.

### Confidentiality and disclosure

- [ ] Correct classification is used.
- [ ] Classification matches official policy.
- [ ] Distribution list is appropriate.
- [ ] Security controls match the classification.
- [ ] Required legal/regulatory disclosures are present.
- [ ] Watermarks do not obstruct content.

### Accessibility

- [ ] Text remains readable at presentation distance.
- [ ] Contrast passes applicable requirements.
- [ ] Charts remain comprehensible without colour alone.
- [ ] Reading order in exported PDF is checked when required.
- [ ] Video has required captions/transcripts.
- [ ] Animations are not required to understand content.

---

# 4.3 Regulated enterprise UI acceptance

### Identity

- [ ] Application identity is authentic and approved.
- [ ] Brand colour is restrained.
- [ ] Semantic status colour remains independent.
- [ ] Tenant identity cannot impersonate platform/system messages.
- [ ] Government/statutory marks follow governing rules.

### Accessibility

- [ ] WCAG baseline has been tested.
- [ ] Text contrast passes.
- [ ] Non-text/control contrast passes.
- [ ] Keyboard operation works.
- [ ] Focus is visible.
- [ ] Reflow works where applicable.
- [ ] Status is not colour-only.
- [ ] Target sizes are acceptable.
- [ ] Reduced-motion requirements are respected.

WCAG 2.2 is the Gold Standard baseline unless a stricter applicable requirement supersedes it.  
https://www.w3.org/TR/WCAG22/

### Data

- [ ] Dense data receives sufficient horizontal space.
- [ ] Pagination/virtualization strategy is intentional.
- [ ] Numeric alignment is consistent.
- [ ] Sorting/filter state is visible.
- [ ] Empty/loading/error states exist.
- [ ] Large dataset handling follows Data & Database standards.

Carbon's table guidance specifically recommends allocating sufficient space for dense data and supports explicit row-size/density variants.  
https://carbondesignsystem.com/components/data-table/usage/

### Permissions

- [ ] Every restricted operation is enforced server-side.
- [ ] Hidden controls do not substitute for authorization.
- [ ] Disabled controls do not leak inappropriate capability information.
- [ ] Read-only state is understandable.
- [ ] Permission changes during a session fail safely.

### Forms

- [ ] Required/optional state is clear.
- [ ] Validation is explicit.
- [ ] Consequential transactions use appropriate confirmation/error prevention.
- [ ] Permissions cannot be bypassed by request manipulation.
- [ ] Values survive responsive/layout changes.

### Legacy integration

- [ ] Legacy-system boundary is understandable.
- [ ] Authentication context is correct.
- [ ] Keyboard/focus behaviour is tested.
- [ ] Save/navigation semantics are not misleading.
- [ ] Embedded systems do not create inaccessible nested scrolling.

### Motion and long-running use

- [ ] Decorative motion is minimal.
- [ ] Frequent tasks do not incur unnecessary transition delay.
- [ ] Critical states persist without requiring animation.
- [ ] Live-data changes do not steal focus.
- [ ] Long-running screens do not constantly shift layout.

### Multi-tenant themes

- [ ] Tenant colours are validated.
- [ ] Foreground colours are system-derived.
- [ ] Semantic colours remain protected.
- [ ] Tenant fonts are from an approved set.
- [ ] Font failure has a safe fallback.
- [ ] Theme payload cannot inject arbitrary CSS/code.
- [ ] Co-branding lockup passes approved rules.
- [ ] Default theme exists for invalid/legacy tenant data.

Salesforce's styling-hook architecture provides a useful precedent for theme variation through controlled foundational properties rather than uncontrolled component overrides.  
https://www.lightningdesignsystem.com/2e1ef8501/p/777f5a-global-styling-hooks

### Governance

- [ ] Change has an owner.
- [ ] Design-system review is complete.
- [ ] Accessibility review is complete.
- [ ] Security/legal/compliance review is complete where applicable.
- [ ] Release has a version.
- [ ] Migration impact is documented.
- [ ] Asset repository is updated.
- [ ] Audit trail is retained.

---

# 5. Canonical Summary

The Corporate & Enterprise Visual Standard is governed by the following hierarchy:

```text
institutional identity
+
Design Tokens
+
accessibility
+
security / compliance
        ↓
corporate visual rules
        ↓
Layout Patterns
        ↓
shadcn/ui / approved components
        ↓
documents, presentations, products and tenant themes
```

The canonical rules are:

```text
Institutional credibility comes from
authenticity, provenance and consistency —
not decorative “trust” styling.

Use constrained palettes.
Let neutrals carry structure.
Reserve brand colour for real emphasis.
Never sacrifice semantic status to branding.

Government marks are controlled assets.
Do not redraw, recolour or improvise them.

Where multiple languages are governed,
maintain equivalent versions and explicit language metadata.

Formal documents are controlled information artifacts,
not marketing posters.

Structure source documents correctly
before exporting accessible PDFs.

RGB is the digital default.
Print colour follows the actual production profile.
Bleed follows the printer specification.

Board decks are decision-support artifacts.
Use disciplined grids.
Make charts traceable.
Show units, period, scope and source.
Do not distort evidence for emphasis.

Classification markings communicate policy;
they do not enforce permissions.

Enterprise UI is designed for repeated use.
Prefer stability, density control and predictable interaction
over novelty and motion.

Authorization is enforced by Security/API layers,
never by visual hiding.

Tenant branding operates through a constrained token contract.
Tenant identity must never break accessibility,
semantic colour or platform integrity.

Visual assets have owners.
Templates have versions.
Material visual changes have approvals.
Historical releases remain auditable.
```

A **Gold Standard 2026** corporate visual system MUST remain credible when:

- printed;
- projected;
- exported to PDF;
- viewed in grayscale;
- used for eight hours;
- translated;
- audited;
- rebranded by a tenant;
- opened years later;
- inspected by a regulator;
- operated with assistive technology.

Its quality is therefore measured not by how distinctive a single screenshot appears, but by how reliably the system preserves **identity, meaning, accessibility, provenance, security, and institutional continuity across every governed medium**.

---

# 6. Sources

1. **GOV.UK Design System — Colour**  
   https://design-system.service.gov.uk/styles/colour/

2. **GOV.UK Brand Guidelines — Colour**  
   https://brand.design-system.service.gov.uk/colour/

3. **IBM Carbon Design System — Data Table**  
   https://carbondesignsystem.com/components/data-table/usage/

4. **IBM Carbon Design System — Data Visualization Colour Palettes**  
   https://carbondesignsystem.com/data-visualization/color-palettes/

5. **W3C — Web Content Accessibility Guidelines (WCAG) 2.2**  
   https://www.w3.org/TR/WCAG22/

6. **W3C WAI — PDF3: Correct Tab and Reading Order in PDF Documents**  
   https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF3

7. **Adobe — Printer's Marks and Bleeds**  
   https://helpx.adobe.com/illustrator/using/printers-marks-bleeds.html

8. **Adobe — Export Print-ready PDFs with a CMYK Colour Profile**  
   https://helpx.adobe.com/ph_en/express/web/print-and-export/export-pdfs-with-cmyk-color-profile.html

9. **UK Government Analysis Function — Data Visualisation: Charts**  
   https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/

10. **GOV.UK / Defence Science and Technology Laboratory — A Bite-Sized Guide to Visualising Data**  
    https://www.gov.uk/government/publications/a-bite-sized-guide-to-visualising-data-a-dstl-biscuit-book/a-bite-sized-guide-to-visualising-data

11. **Jabatan Perdana Menteri Malaysia — Penggunaan Jata Persekutuan**  
    https://www.jpm.gov.my/ms/surat-pekeliling-am/penggunaan-jata-persekutuan

12. **Jabatan Digital Negara — Garis Panduan**  
    https://www.jdn.gov.my/garis-panduan/

13. **Government of Malaysia — Official Open Data Portal**  
    https://data.gov.my/

14. **Government of Malaysia — Official Open API**  
    https://developer.data.gov.my/

15. **Salesforce Lightning Design System — Global Styling Hooks**  
    https://www.lightningdesignsystem.com/2e1ef8501/p/777f5a-global-styling-hooks

This version deliberately avoids making **“conservative = blue,” “government = bilingual everywhere,” or “CMYK = always convert everything before print”** into false universal rules. Those are replaced with governed identity, jurisdiction-aware language requirements, and production-profile-driven print standards.
