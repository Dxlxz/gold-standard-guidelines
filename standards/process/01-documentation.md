---
id: "documentation"
title: "Documentation Guidelines — Gold Standard 2026"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["process", "documentation"]
applies_to: ["team"]
related: ["code-review", "adr"]
legacy_number: 8
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 67623
provenance: baseline

---

For a 2026 baseline, I’d anchor the system on **Diátaxis for information architecture**, **docs-as-code for workflow**, **WCAG 2.2 AA for published documentation**, and a clear technical-writing style based on direct, active, globally understandable language. Diátaxis continues to distinguish tutorials, how-to guides, reference, and explanation; current Google guidance emphasizes descriptive headings, sentence case, second person, active voice, descriptive links, accessibility, and global readability. citeturn821189search13turn821189search1turn821189search10turn821189search11

For machine-readable API contracts, **OpenAPI 3.2.1 is the current published OAS version as of September 22, 2026**, released September 10, 2026. Documentation workflows should otherwise follow normal engineering discipline—version control, review, automated checks, and issue tracking—which is the core docs-as-code model. citeturn821189search5turn574439search2

# Documentation Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical standard for product, engineering, API, operational, architectural, and internal documentation.

Documentation exists to make systems:

- understandable;
- usable;
- maintainable;
- operable;
- supportable;
- auditable;
- transferable between people;
- discoverable by humans and machines.

Documentation is part of the product and engineering system.

It is not:

- an afterthought;
- a historical archive by default;
- a substitute for clear architecture;
- an unstructured collection of notes;
- a dumping ground for information;
- something written once and forgotten.

The core principle is:

> **Document the knowledge required to use, operate, change, and reason about the system—and keep that documentation as close as practical to the source of truth.**

---

# 2. Normative Language

These terms are intentional:

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless a documented reason exists not to.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions to a mandatory documentation requirement SHOULD identify:

```text
Reason
Owner
Risk
Alternative source of truth
Review date
```

---

# 3. Documentation Principles

Documentation MUST optimize for:

```text
Accuracy
>
Clarity
>
Discoverability
>
Completeness
>
Presentation
```

Beautiful incorrect documentation is worse than plain correct documentation.

---

# 4. Documentation as a System

Documentation should be treated as an interconnected system.

```text
Product
├── User documentation
├── Developer documentation
├── API documentation
├── Architecture documentation
├── Operational documentation
├── Security documentation
└── Decision records
```

These forms serve different audiences and SHOULD NOT be collapsed into one giant knowledge base.

---

# 5. Source of Truth

Every important fact SHOULD have one authoritative source.

Avoid:

```text
Wiki says A
README says B
Slack says C
Code says D
```

Determine which system owns the truth.

Examples:

```text
API schema
→ API contract

Repository configuration
→ build configuration

ADR
→ architectural decision

Runbook
→ operational procedure

Design-system docs
→ component contract
```

Other documents SHOULD link to the authoritative source rather than duplicate it unnecessarily.

---

# 6. Documentation Types

Use four primary documentation modes:

```text
Tutorial
How-to
Reference
Explanation
```

Each serves a different reader need.

Do not mix all four styles into every page.

---

# 7. Tutorials

Tutorials teach through a guided learning experience.

The reader's question is:

> How can I learn this?

Tutorials SHOULD:

- have a clear beginning and end;
- lead the reader step by step;
- minimize unnecessary choices;
- produce a working result;
- explain enough to maintain confidence;
- avoid exhaustive reference detail.

A tutorial is not a complete feature reference.

---

# 8. Tutorial Structure

Recommended structure:

```text
Title
Outcome
Prerequisites
Estimated scope
Steps
Verification
Next steps
```

The reader should know what they will achieve before beginning.

---

# 9. How-To Guides

How-to guides solve a specific practical problem.

The reader's question is:

> How do I accomplish this task?

Examples:

```text
Configure SSO
Rotate an API key
Create a project
Restore a database
Add a webhook endpoint
```

How-to guides assume some existing knowledge.

They should not become introductory courses.

---

# 10. How-To Structure

Recommended:

```text
Goal
Prerequisites
Procedure
Verification
Troubleshooting
Related tasks
```

Keep the document focused on one outcome.

---

# 11. Reference Documentation

Reference documentation describes the system accurately and completely.

The reader's question is:

> What exactly is this?

Examples:

- API endpoints;
- configuration options;
- CLI commands;
- components;
- schemas;
- permissions;
- environment variables.

Reference content SHOULD prioritize precision and completeness over narrative teaching.

---

# 12. Explanation Documentation

Explanation helps readers understand:

- why the system works this way;
- architectural concepts;
- tradeoffs;
- mental models;
- design rationale.

The reader's question is:

> Why does this work this way?

Explanation SHOULD connect concepts rather than merely repeat implementation details.

---

# 13. Do Not Mix Documentation Modes Carelessly

Bad:

```text
API reference
↓
20-minute beginner tutorial
↓
architecture philosophy
↓
parameter table
↓
random troubleshooting
```

Better:

```text
Reference page
→ link to tutorial
→ link to how-to
→ link to explanation
```

Separation improves comprehension and maintenance.

---

# 14. Audience First

Every document MUST have an identifiable audience.

Possible audiences:

```text
End user
Developer
Integrator
Administrator
Operator
Support engineer
Security engineer
Designer
Contributor
Executive stakeholder
```

Do not write simultaneously for every possible reader.

---

# 15. Audience Assumptions

Document prerequisites explicitly.

Example:

```text
Audience:
Backend engineers familiar with HTTP APIs.

Prerequisites:
Node.js
OAuth fundamentals
Workspace administrator access
```

Do not force readers to infer required knowledge.

---

# 16. Reader Goal

Before writing, complete:

```text
After reading this document, the reader can ______.
```

If the blank cannot be completed clearly, the document's purpose may be too broad.

---

# 17. Documentation Hierarchy

Recommended documentation hierarchy:

```text
Documentation Home
├── Get started
├── Guides
├── Concepts
├── Reference
├── API
├── Operations
└── Contributing
```

Actual labels depend on the audience and product.

Navigation SHOULD map to user intent rather than organizational structure.

---

# 18. Information Architecture

Organize content around what users are trying to understand or accomplish.

Prefer:

```text
Authentication
Projects
Members
Billing
Webhooks
```

over:

```text
Team Alpha
Backend
Platform Squad
Legacy Services
```

Organization charts are poor documentation architectures.

---

# 19. Progressive Disclosure

Present information in increasing depth.

Typical path:

```text
Overview
↓
Quick start
↓
Common tasks
↓
Concepts
↓
Reference
↓
Advanced details
```

Do not force new readers through exhaustive details before they can succeed.

---

# 20. Documentation Home

The documentation entry point SHOULD answer:

1. What is this?
2. Who is it for?
3. What can I do with it?
4. Where should I start?
5. Where is the reference?

Avoid documentation homepages containing only a large category grid with no orientation.

---

# 21. Landing Pages

Section landing pages SHOULD provide context.

Recommended:

```text
Section name

One-paragraph explanation.

Start here
Common tasks
Key concepts
Reference
```

Do not make landing pages merely duplicate sidebar navigation.

---

# 22. Page Purpose

One page SHOULD generally have one main purpose.

Split a page when:

- audiences differ;
- tasks differ substantially;
- content becomes difficult to navigate;
- independent versioning is required.

Do not split pages merely to keep them artificially short.

---

# 23. Page Titles

Titles MUST be:

- specific;
- descriptive;
- unique within their documentation set;
- understandable out of context.

Prefer:

```text
Configure SAML single sign-on
```

over:

```text
Configuration
```

---

# 24. Sentence Case

Use sentence case for documentation titles and headings.

Preferred:

```text
Configure project permissions
```

Avoid unnecessary title case:

```text
Configure Project Permissions
```

unless brand or publication standards require otherwise.

---

# 25. Heading Hierarchy

Use headings semantically.

```text
H1 → page title
H2 → major sections
H3 → subsection
H4 → deeper subsection
```

Do not skip heading levels for visual styling.

Every page SHOULD have one clear H1.

---

# 26. Descriptive Headings

A reader scanning only headings should understand the document structure.

Prefer:

```text
Create an API key
Rotate an API key
Revoke an API key
```

over:

```text
Creation
Rotation
Other
```

---

# 27. Stable Heading Anchors

Important headings SHOULD have stable link targets.

Avoid renaming widely linked headings casually.

When heading text changes significantly, preserve old anchors where documentation tooling supports it.

Deep links are part of the documentation contract.

---

# 28. Lead With the Answer

Put the most important information first.

Avoid long introductory text before the reader can determine relevance.

Bad:

```text
There are many situations in which users might find themselves
wanting to configure...
```

Better:

```text
To enable SSO, configure a SAML identity provider and add its
metadata to the workspace settings.
```

---

# 29. Short Introductions

Introductions SHOULD establish:

```text
What
Why
Scope
```

and then move into useful content.

Avoid ceremonial introductions.

---

# 30. Active Voice

Prefer active voice.

Preferred:

```text
The server validates the token.
```

Avoid when unnecessary:

```text
The token is validated by the server.
```

Active voice makes responsibility clearer.

---

# 31. Second Person

Address the reader as:

```text
you
```

when describing their actions.

Preferred:

```text
Select Save.
```

Avoid:

```text
The user should select Save.
```

unless discussing a third-party user rather than the reader.

---

# 32. Imperative Instructions

Procedural steps SHOULD begin with clear actions.

Good:

```text
1. Open Settings.
2. Select Security.
3. Select Create API key.
```

Avoid:

```text
1. You will need to navigate to Settings.
```

---

# 33. Conditions Before Actions

Put conditions before the instruction when possible.

Preferred:

```text
If the workspace uses SSO, sign in through your identity provider.
```

Avoid:

```text
Sign in through your identity provider if the workspace uses SSO.
```

This reduces accidental execution of an inapplicable step.

---

# 34. Simple Language

Prefer familiar words.

Use:

```text
use
start
before
help
```

rather than unnecessarily formal alternatives.

Technical terminology is appropriate when it is the precise language of the domain.

---

# 35. Precision Over Simplification

Do not simplify until technical meaning becomes incorrect.

Good documentation is:

```text
simple enough to understand
+
precise enough to trust
```

---

# 36. Terminology

One concept SHOULD have one canonical name.

Do not alternate casually among:

```text
workspace
organization
account
tenant
```

if they represent the same object.

Terminology consistency is part of product architecture.

---

# 37. Glossary

Maintain a glossary when the domain contains:

- specialized concepts;
- overloaded industry terms;
- acronyms;
- internal terminology.

The glossary SHOULD define meaning, not merely expand abbreviations.

---

# 38. Acronyms

Define unfamiliar acronyms on first use.

Example:

```text
single sign-on (SSO)
```

Widely understood audience-specific terms MAY remain undefined.

Avoid unnecessary abbreviations.

---

# 39. Jargon

Use jargon only when:

- it is standard for the audience;
- it improves precision;
- simpler wording would be less accurate.

Do not use internal organizational jargon in external documentation.

---

# 40. Global Readability

Write for readers whose first language may not be English.

Prefer:

- literal language;
- short sentences;
- explicit relationships;
- consistent terminology;
- active voice.

Avoid unnecessary:

- idioms;
- wordplay;
- cultural references;
- sarcasm;
- slang.

---

# 41. Inclusive Language

Documentation MUST use respectful and inclusive terminology.

Avoid language that:

- stereotypes;
- excludes unnecessarily;
- uses disability as metaphor;
- assumes demographic characteristics;
- relies on culturally specific knowledge.

Prefer precise functional descriptions.

---

# 42. Sentence Length

Keep sentences focused on one primary idea.

Split complex sentences when multiple independent concepts are present.

Do not enforce arbitrary word-count rules where complexity requires explanation.

---

# 43. Paragraph Length

Web documentation SHOULD favor short, scannable paragraphs.

A paragraph should usually communicate one coherent idea.

Dense walls of text are difficult to navigate.

---

# 44. Lists

Use a numbered list when order matters.

Use bullets when order does not matter.

Do not create a list when one short sentence would communicate the information more clearly.

---

# 45. Parallel Lists

List items SHOULD use parallel grammar.

Good:

```text
- Validate input.
- Authorize the request.
- Persist the change.
```

Poor:

```text
- Input validation.
- Authorize the request.
- The change is then saved.
```

---

# 46. Procedure Steps

Use numbered steps for multi-step procedures.

Each step SHOULD contain one primary action.

Additional explanation may follow the action.

Do not bury actions at the end of long paragraphs.

---

# 47. One-Step Procedures

A one-step procedure generally does not require a numbered list.

Use a direct sentence or bullet where appropriate.

---

# 48. Optional Steps

Clearly identify optional actions.

Example:

```text
Optional: Add a description for the key.
```

Do not make readers infer whether a step is required.

---

# 49. Prerequisites

Put prerequisites before the procedure.

Examples:

```text
Administrator role
CLI installed
API key available
Project already created
```

Do not reveal a prerequisite halfway through a procedure.

---

# 50. Verification

Procedures SHOULD explain how to verify success.

Example:

```text
The deployment is complete when the status changes to Ready.
```

A procedure without verification can leave readers uncertain whether it worked.

---

# 51. Expected Output

Where useful, show expected output after commands.

Example:

```text
Status: Ready
```

Do not include volatile output that will quickly become misleading.

---

# 52. Troubleshooting

Troubleshooting SHOULD be structured around observable symptoms.

Preferred:

```text
## Login returns "Invalid redirect URI"
```

rather than:

```text
## OAuth issue 7
```

For each issue provide:

```text
Symptom
Likely cause
Diagnosis
Resolution
```

---

# 53. Error Documentation

Document significant errors with:

```text
Error identifier
Meaning
Common cause
Resolution
Related reference
```

Error messages in documentation MUST match the product closely enough to be searchable.

---

# 54. Avoid FAQ Dumping Grounds

FAQs MAY be useful for genuinely recurring questions.

They MUST NOT become the default destination for unrelated content.

If an answer represents a normal task or concept, move it into the appropriate guide or reference section.

---

# 55. Links

Link text MUST describe the destination.

Good:

```text
See Configure SAML SSO.
```

Avoid:

```text
Click here.
Read more.
This page.
```

Descriptive links improve scanning and accessibility.

---

# 56. Link Density

Do not turn every technical noun into a link.

Link when the destination materially helps the reader.

Too many links create visual noise.

---

# 57. First Relevant Link

Prefer linking the first meaningful occurrence of a concept in a section.

Repeated links to the same destination are usually unnecessary.

---

# 58. External Links

External links SHOULD be used when the external source is authoritative and maintaining a duplicate would be worse.

Do not copy large external specifications into internal documentation.

Link to the source and document only organization-specific implications.

---

# 59. Link Integrity

Documentation pipelines SHOULD detect broken internal links.

External links SHOULD be periodically checked where practical.

Broken links are documentation defects.

---

# 60. Code Formatting

Use inline code formatting for:

```text
function names
commands
parameters
file names
paths
environment variables
literal values
```

when appropriate.

Do not use code formatting simply for visual emphasis.

---

# 61. Code Blocks

Code blocks MUST identify language when syntax highlighting is useful.

Examples SHOULD be:

- syntactically valid;
- minimal;
- safe;
- current;
- directly relevant.

Avoid enormous unexplained examples.

---

# 62. Copy-Paste Safety

Commands intended for copying MUST be safe.

Do not include destructive actions in copyable examples without explicit warnings and context.

Avoid examples containing real:

- secrets;
- credentials;
- production identifiers;
- private hostnames.

---

# 63. Example Values

Use obviously synthetic values.

Examples:

```text
example.com
project_123
user@example.com
```

Use reserved/example domains where possible.

Never leak production data into documentation.

---

# 64. Code Example Completeness

Examples should contain enough context to work.

Avoid:

```text
doThing(data)
```

without explaining:

- where `data` comes from;
- required imports;
- initialization;
- authentication.

Balance brevity with reproducibility.

---

# 65. Example Verification

Important examples SHOULD explain:

```text
How to run it
What success looks like
What output to expect
```

---

# 66. Tested Examples

Executable documentation examples SHOULD be automatically tested where practical.

Examples that compile or execute should not silently rot.

---

# 67. Snippet Reuse

Where identical code appears in multiple documents, consider a shared snippet source.

Do not duplicate security-sensitive or rapidly changing code examples across many pages.

---

# 68. Screenshots

Use screenshots when they communicate something text cannot communicate efficiently.

Do not use screenshots as the primary way to document text-heavy procedures.

Screenshots age quickly.

---

# 69. Screenshot Rules

Screenshots MUST:

- contain no secrets;
- contain no personal data;
- show relevant UI only;
- be readable at supported sizes;
- have useful alternative text.

Crop irrelevant browser chrome where appropriate.

---

# 70. UI Change Resilience

Prefer text instructions using stable UI labels over screenshots for routine workflows.

A button rename is easier to update in text than across dozens of images.

---

# 71. Alt Text

Meaningful images MUST have useful alt text.

Decorative images SHOULD be hidden from assistive technology.

Alt text should communicate the image's purpose, not mechanically describe every pixel.

---

# 72. Diagrams

Use diagrams when relationships are easier to understand visually.

Good candidates:

```text
Architecture
Request flow
State transition
Trust boundary
Sequence
Dependency graph
```

Do not create diagrams merely to decorate documentation.

---

# 73. Diagram Source

Important diagrams SHOULD have editable source stored with the documentation where practical.

Avoid documentation whose architecture can only be edited in an unavailable proprietary file.

---

# 74. Diagram Accessibility

Complex diagrams SHOULD have accompanying textual explanation.

Readers must not depend exclusively on color or visual positioning to understand critical information.

---

# 75. Mermaid and Text Diagrams

Text-based diagram formats MAY be preferred for:

- version control;
- review;
- easy maintenance.

Use them when rendering quality and accessibility are sufficient.

---

# 76. Tables

Use tables for genuinely tabular comparison or reference.

Good:

```text
Parameter | Type | Required | Description
```

Avoid tables for long narrative prose.

Tables become difficult to use on small screens.

---

# 77. Wide Tables

Wide tables SHOULD have responsive treatment.

Do not make users horizontally scroll across huge prose-heavy tables if another structure is clearer.

---

# 78. Notes

Use notes for supplemental information.

A note should not contain information required for successful completion of the main task.

Required information belongs in normal content.

---

# 79. Warnings

Use warnings for material risk.

Examples:

```text
Data deletion
Security exposure
Downtime
Irreversible operation
Billing impact
```

Do not overuse warnings.

Warning fatigue reduces attention.

---

# 80. Cautions vs Warnings

If the system supports multiple callout levels, define them consistently.

Example:

```text
Note
→ supplemental information

Important
→ required understanding

Warning
→ significant risk

Danger
→ severe or irreversible consequence
```

Do not choose severity based on visual preference.

---

# 81. Docs as Code

Engineering documentation SHOULD use docs-as-code where practical.

That means:

```text
Plain-text source
Version control
Pull requests
Code review
Automated checks
Issue tracking
Continuous publishing
```

Documentation should participate in engineering workflow.

---

# 82. Documentation Repository

Documentation MAY live:

```text
with the code
```

or:

```text
in a dedicated documentation repository
```

Choose according to ownership and release needs.

The location must make updates easy for the people responsible for accuracy.

---

# 83. Keep Docs Near Their Change Source

Prefer co-location when documentation and code must usually change together.

Examples:

```text
Component docs
→ design-system repository

Service runbook
→ service repository

Package README
→ package directory
```

Central portals may aggregate these sources.

---

# 84. Documentation Pull Requests

Documentation changes SHOULD receive review proportionate to impact.

Reviewers should evaluate:

```text
Technical accuracy
Clarity
Completeness
Security
Style
Links
Examples
```

---

# 85. Documentation Required for Change

A product or engineering change is incomplete when it materially changes documented behavior but does not update documentation.

Pull-request review SHOULD ask:

> Does this change require documentation?

---

# 86. Documentation CI

Documentation pipelines SHOULD automatically validate where practical:

```text
build
broken internal links
Markdown/markup syntax
spelling or terminology
code examples
OpenAPI validity
accessibility
dead references
```

Automated checks should focus on meaningful defects rather than stylistic noise.

---

# 87. Markdown Standard

Markdown SHOULD use one canonical dialect where possible.

Define conventions for:

```text
Headings
Lists
Code fences
Tables
Frontmatter
Links
Images
Admonitions
```

Avoid repository-specific Markdown variations without reason.

---

# 88. Semantic Markup

Prefer semantic document structures.

Do not choose heading levels or HTML elements purely for appearance.

Good semantic structure improves:

- accessibility;
- search;
- machine parsing;
- maintainability.

---

# 89. Frontmatter

Documentation systems SHOULD support metadata where useful.

Recommended metadata:

```text
title
description
owner
status
last-reviewed
tags/category
version where applicable
```

Do not collect metadata nobody uses.

---

# 90. Ownership

Important documentation MUST have an identifiable owner.

The owner is responsible for:

```text
Accuracy
Review
Lifecycle
Deprecation
```

Ownerless documentation decays.

---

# 91. Ownership by System

Documentation ownership SHOULD usually align with system ownership.

Example:

```text
Authentication docs
→ Identity team

Design-system docs
→ Design Systems

Billing docs
→ Billing domain
```

Do not create a documentation team as the sole owner of technical truth.

---

# 92. Writers and Engineers

Technical writers may own:

- structure;
- style;
- discoverability;
- content design.

Subject-matter experts own technical accuracy.

High-quality documentation is collaborative.

---

# 93. Review Date

Long-lived operational or policy documentation SHOULD record a review date where staleness creates risk.

Example:

```text
Last reviewed: 2026-08-14
```

A review date is not a substitute for continuous correctness.

---

# 94. Staleness Detection

Documentation systems SHOULD detect probable stale content using signals such as:

```text
Age
Changed source files
Deprecated APIs
Broken links
Unused pages
Outdated version references
```

Do not rely only on annual manual cleanup.

---

# 95. Documentation Debt

Treat documentation debt like engineering debt.

Examples:

```text
Missing guide
Obsolete screenshot
Outdated setup
Duplicate sources of truth
Undocumented behavior
Broken sample
```

Track and prioritize according to user and operational impact.

---

# 96. Lifecycle States

Documents MAY use explicit states:

```text
Draft
Active
Deprecated
Archived
```

Avoid presenting obsolete content as current.

---

# 97. Deprecated Documentation

Deprecated content MUST clearly indicate:

```text
What is deprecated
Replacement
Migration path
Removal/support timeline
```

Do not simply place "Deprecated" at the top without helping the reader move forward.

---

# 98. Archive

Archive historical documents when they remain useful for:

- audits;
- legacy support;
- historical decisions.

Archived documentation MUST be visually distinguishable from current guidance.

---

# 99. Delete Obsolete Documentation

Documentation should not be preserved indefinitely simply because it once existed.

Delete or archive content when it creates more confusion than value.

---

# 100. Versioned Documentation

Version documentation only when readers genuinely need multiple supported versions.

Examples:

```text
SDK versions
API major versions
Long-lived product releases
```

Do not create version selectors by default.

Versioned documentation creates significant maintenance cost.

---

# 101. Version Visibility

When multiple versions exist, every page MUST clearly indicate the active version.

Avoid situations where search engines land users silently on obsolete documentation.

---

# 102. Latest Version

The current supported documentation SHOULD be the default destination.

Older versions should remain accessible when still supported.

---

# 103. Canonical URLs

Documentation pages SHOULD have stable canonical URLs.

Avoid exposing implementation hierarchy unnecessarily.

Prefer:

```text
/docs/authentication/sso
```

over:

```text
/docs/team-a/project-4/auth-page-v2
```

---

# 104. Redirects

When pages move, preserve important links using redirects.

Avoid breaking:

- bookmarks;
- support articles;
- search results;
- external references.

Redirect chains SHOULD be minimized.

---

# 105. Search

Documentation search is a first-class navigation mechanism.

Content should be searchable by:

```text
Product terminology
Error text
API names
Commands
Common user phrasing
```

---

# 106. Search-Friendly Titles

Use words readers are likely to search for.

Avoid creative headings that obscure the actual subject.

Bad:

```text
Unlock the power
```

Better:

```text
Configure API authentication
```

---

# 107. Search Synonyms

Where users commonly use multiple terms, metadata MAY include synonyms.

The page body should still use canonical terminology consistently.

---

# 108. No-Result Analysis

Documentation teams SHOULD inspect common unsuccessful search queries.

No-result searches reveal missing:

- terminology;
- documentation;
- redirects;
- troubleshooting content.

---

# 109. Analytics

Documentation analytics MAY be used to understand:

- entry pages;
- common searches;
- abandonment;
- zero-result searches;
- navigation patterns.

Metrics MUST NOT replace qualitative understanding.

---

# 110. Documentation Success Metrics

Useful measures include:

```text
Task completion
Search success
Support-ticket deflection
Time to first success
Documentation freshness
Broken-link rate
API reference coverage
```

Page views alone do not measure documentation quality.

---

# 111. Feedback

Provide a low-friction way to report documentation problems.

Good feedback systems allow readers to indicate:

```text
Incorrect
Outdated
Incomplete
Confusing
```

where feasible.

---

# 112. Feedback Routing

Documentation feedback SHOULD create an actionable workflow.

Do not collect feedback into a dashboard nobody owns.

---

# 113. README Standard

Every meaningful repository SHOULD have a README.

It should answer:

```text
What is this?
Why does it exist?
How do I run it?
How do I test it?
How do I contribute?
Where is deeper documentation?
Who owns it?
```

---

# 114. README Scope

A README is an entry point, not the entire documentation system.

Move detailed topics into appropriate dedicated documentation when the README becomes unwieldy.

---

# 115. Repository README Template

Recommended:

```text
# Project name

One-paragraph purpose.

## Requirements

## Setup

## Development

## Testing

## Architecture

## Deployment

## Documentation

## Ownership
```

Include only sections relevant to the repository.

---

# 116. Package Documentation

Reusable packages SHOULD document:

```text
Purpose
Installation
Supported environments
Public API
Examples
Error behavior
Version policy
Ownership
```

Consumers should not need to inspect private implementation to use the package.

---

# 117. Component Documentation

Design-system components SHOULD document:

```text
Purpose
When to use
When not to use
Anatomy
Variants
States
Accessibility
Responsive behavior
Content guidance
Examples
API
```

Interactive examples SHOULD demonstrate real product patterns where useful.

---

# 118. Architecture Documentation

Architecture documentation SHOULD describe:

```text
System boundaries
Major components
Data flow
Dependencies
Trust boundaries
Runtime topology
Key constraints
```

It should help engineers understand the system without reading every source file.

---

# 119. Architecture Overview

Every significant system SHOULD have one current high-level architecture overview.

Avoid architecture documentation consisting only of scattered historical diagrams.

---

# 120. C4-Style Levels

Architecture documentation MAY use layered views such as:

```text
Context
Containers/services
Components
Code where useful
```

Do not produce detailed diagrams for levels that provide no decision value.

---

# 121. Architecture Decision Records

Material architectural decisions SHOULD use ADRs.

An ADR records:

```text
Context
Decision
Alternatives
Consequences
Status
Date
```

---

# 122. ADR Scope

Use ADRs for consequential choices such as:

```text
Framework
Database
Authentication architecture
Event architecture
Multi-tenancy model
Major infrastructure
Security boundary
```

Do not create an ADR for trivial implementation details.

---

# 123. ADR Immutability

Accepted ADRs generally SHOULD remain as historical records.

If the decision changes:

```text
Create new ADR
↓
Supersede old ADR
```

Do not rewrite history to make old decisions appear current.

---

# 124. Runbooks

Operationally significant systems MUST have runbooks for foreseeable incidents and maintenance procedures.

Examples:

```text
Service outage
Database failover
Credential rotation
Queue backlog
Deployment rollback
Data restoration
```

---

# 125. Runbook Structure

Recommended:

```text
Purpose
Trigger/symptoms
Impact
Prerequisites/access
Diagnosis
Mitigation
Recovery
Verification
Escalation
Related dashboards
Owner
```

---

# 126. Runbooks Must Be Executable

A runbook must contain actionable steps.

Avoid:

```text
Fix the database problem.
```

Prefer explicit commands, dashboards, decision points, and verification.

---

# 127. Runbook Safety

Runbooks MUST clearly identify destructive or high-risk commands.

Commands SHOULD indicate:

```text
Environment
Expected impact
Rollback
Verification
```

---

# 128. Runbook Testing

Critical runbooks SHOULD be exercised through:

- game days;
- incident simulations;
- recovery tests;
- real operational use.

An untested runbook may be fiction.

---

# 129. Playbooks

Use playbooks for broader decision processes that cannot be reduced to fixed steps.

Examples:

```text
Security incident response
Capacity incident
Third-party outage
```

Use runbooks for concrete procedures.

---

# 130. Security Documentation

Security documentation SHOULD cover relevant:

```text
Trust boundaries
Authentication
Authorization
Secret handling
Key lifecycle
Incident escalation
Data classification
Threat models
```

Do not publish sensitive defensive details more broadly than necessary.

---

# 131. Threat Models

Threat models SHOULD be maintained alongside the architecture they describe.

They should identify:

```text
Assets
Actors
Entry points
Trust boundaries
Threats
Controls
Residual risk
```

---

# 132. Data Documentation

Important datasets SHOULD document:

```text
Meaning
Owner
Source
Schema
Retention
Sensitivity
Consumers
Update cadence
```

Field names alone rarely provide sufficient semantics.

---

# 133. Data Dictionary

Maintain a data dictionary where cross-team understanding of business data matters.

Canonical business definitions should not be independently invented by analytics, backend, and product teams.

---

# 134. API Documentation

API documentation MUST define the actual consumer contract.

At minimum:

```text
Authentication
Base URL
Resources
Operations
Parameters
Request schema
Response schema
Errors
Pagination
Rate limits
Idempotency
Versioning
Examples
```

---

# 135. OpenAPI

HTTP APIs SHOULD use OpenAPI when appropriate.

The OpenAPI document SHOULD be generated from or validated against the actual implementation.

Avoid maintaining an unverified specification that drifts from production.

---

# 136. OpenAPI Version

For new 2026 API tooling, prefer an approved current OpenAPI 3.2-compatible toolchain where ecosystem support is adequate.

Do not upgrade specification versions merely for novelty if required tooling does not support them reliably.

Contract correctness takes precedence over version number.

---

# 137. API Source of Truth

Define whether the API contract is:

```text
Design-first
```

or:

```text
Code-first
```

Either model can work.

What is prohibited is having multiple conflicting sources of truth.

---

# 138. API Examples

API examples SHOULD include realistic:

```text
Request
Response
Error
```

Examples MUST match schema and authentication conventions.

---

# 139. API Error Reference

Document stable error semantics.

Include:

```text
HTTP status
Application code where applicable
Meaning
Recovery
```

Avoid requiring consumers to parse free-form error strings.

---

# 140. API Authentication Documentation

Authentication guides MUST explain:

```text
How credentials are obtained
How they are sent
Scope/permissions
Expiration
Rotation
Revocation
```

Never place real secrets in examples.

---

# 141. API Versioning

Document:

```text
Version policy
Breaking-change policy
Deprecation policy
Migration process
```

Consumers must know what stability guarantees they can rely on.

---

# 142. API Changelog

Public or widely consumed APIs SHOULD maintain a consumer-facing changelog.

Focus on behavior that affects integrations.

Do not dump raw Git commits into API release notes.

---

# 143. SDK Documentation

SDK docs SHOULD prioritize task-oriented examples over generated symbol listings alone.

Provide:

```text
Installation
Initialization
Authentication
Common operations
Errors
Pagination
Retries
Advanced reference
```

---

# 144. CLI Documentation

CLI reference SHOULD include:

```text
Synopsis
Arguments
Options
Defaults
Examples
Exit codes where relevant
```

Commands should provide built-in `--help` consistent with published documentation.

---

# 145. Configuration Documentation

Every supported configuration setting SHOULD define:

```text
Name
Purpose
Type
Default
Allowed values
Security impact where relevant
Example
Restart/redeploy requirements
```

---

# 146. Environment Variables

Environment-variable documentation MUST distinguish:

```text
Required
Optional
Server-only
Client-public
Secret
Non-secret
```

Do not document sensitive sample values that resemble real credentials.

---

# 147. Permissions Documentation

Permission systems SHOULD provide a reference mapping:

```text
Role
Resource
Allowed action
Restrictions
```

Avoid leaving authorization semantics implicit in UI screenshots.

---

# 148. Database Documentation

Critical databases SHOULD document:

```text
Purpose
Ownership
Backup
Retention
Replication
Migration process
Access model
```

Detailed schemas MAY remain generated where appropriate.

---

# 149. Event Documentation

Events and messages are contracts.

Document:

```text
Event name
Producer
Consumers
Schema
Version
Ordering assumptions
Delivery semantics
Idempotency
```

---

# 150. Webhook Documentation

Webhook docs SHOULD include:

```text
Event types
Payload
Signature verification
Retry behavior
Ordering
Duplicate delivery
Timeout expectations
Test procedure
```

---

# 151. Dependency Documentation

Important external dependencies SHOULD document:

```text
Purpose
Owner
Contract
Failure behavior
Credentials
Operational impact
```

This is particularly important for critical third-party systems.

---

# 152. Deployment Documentation

Deployment documentation SHOULD explain:

```text
Pipeline
Environments
Promotion
Rollback
Configuration
Required approvals
Observability
```

Do not rely on institutional knowledge for production deployment.

---

# 153. Local Development Documentation

A new qualified contributor SHOULD be able to reach a working local environment using documented steps.

Setup docs should include:

```text
Prerequisites
Install
Configuration
Seed/test data
Run
Verify
Common problems
```

---

# 154. Setup Automation

If setup requires many repeated manual documentation steps, automate them where practical.

Documentation should not compensate indefinitely for poor developer tooling.

---

# 155. Contributing Guide

Significant repositories SHOULD document contribution expectations.

Include where relevant:

```text
Branch/PR workflow
Tests
Linting
Documentation requirements
Architecture rules
Security expectations
Review process
```

---

# 156. Changelog

A changelog should communicate changes meaningful to consumers.

Organize around:

```text
Added
Changed
Fixed
Deprecated
Removed
Security
```

where useful.

Avoid reproducing every internal commit.

---

# 157. Release Notes

Release notes answer:

> What changed for the user?

They SHOULD emphasize:

- new capabilities;
- behavior changes;
- migration requirements;
- resolved significant issues;
- known limitations.

---

# 158. Changelog vs Release Notes

Use:

```text
Changelog
→ detailed change history

Release notes
→ curated user-facing summary
```

Do not force one artifact to serve both audiences poorly.

---

# 159. Deprecation Documentation

Every deprecation SHOULD define:

```text
Deprecated capability
Reason where useful
Replacement
Migration steps
Deadline
Affected versions
```

---

# 160. Migration Guides

Breaking changes SHOULD have migration guides.

Recommended:

```text
Who is affected
Before
After
Steps
Compatibility notes
Verification
Rollback where possible
```

---

# 161. Support Documentation

Support teams SHOULD have access to:

```text
Known issues
Diagnostic procedures
Escalation paths
Feature behavior
Customer-safe explanations
```

Support information should link to authoritative technical sources.

---

# 162. Internal Documentation

Internal does not mean informal or unreliable.

Critical internal documentation requires the same:

- ownership;
- freshness;
- clarity;
- discoverability;

as external documentation.

---

# 163. Meeting Notes

Meeting notes SHOULD NOT become the permanent source of architectural or product decisions.

Important outcomes must graduate into:

```text
ADR
Specification
Issue
Roadmap
Policy
```

as appropriate.

---

# 164. Chat Is Not Documentation

Slack, Teams, email, and chat discussions are not durable sources of truth.

Important decisions made in chat MUST be transferred to the appropriate durable documentation.

---

# 165. Specs

Feature specifications SHOULD describe:

```text
Problem
Goals
Non-goals
User behavior
Requirements
Constraints
Security
Edge cases
Success criteria
```

Implementation details should be included only when they are part of the intended contract.

---

# 166. Requirements

Requirements should be testable.

Poor:

```text
The system should be fast.
```

Better:

```text
The endpoint must return within the defined p95 latency target under the documented load profile.
```

---

# 167. Non-Goals

Significant design documents SHOULD identify non-goals.

This prevents readers from interpreting missing scope as accidental omission.

---

# 168. Decision Documentation

Document important decisions, not every conversation leading to them.

The durable record should emphasize:

```text
Context
Decision
Reason
Tradeoff
```

---

# 169. Status Documentation

Project status pages SHOULD have an explicit update cadence or automation.

Manual status documents with no owner rapidly become misleading.

---

# 170. Accessibility Standard

Published documentation MUST target WCAG 2.2 AA unless a stricter organizational requirement applies.

Accessibility applies to:

```text
Navigation
Content
Code examples
Images
Tables
Interactive examples
Search
Keyboard use
Focus
Contrast
```

---

# 171. Semantic Headings

Heading hierarchy must remain programmatically meaningful.

Do not use bold paragraphs as fake headings.

---

# 172. Keyboard Access

Interactive documentation features MUST be keyboard operable.

Examples:

```text
Search
Tabs
Copy buttons
Version selectors
Interactive playgrounds
Navigation
```

---

# 173. Focus

Keyboard focus MUST be visible.

Documentation sites MUST NOT remove focus indication merely for visual cleanliness.

---

# 174. Color

Do not use color alone to communicate:

- success;
- failure;
- required state;
- diagram relationships.

Provide additional text or structural signals.

---

# 175. Contrast

Text, controls, focus indicators, and meaningful graphics MUST meet applicable accessibility requirements.

Muted documentation text still needs to be readable.

---

# 176. Code Accessibility

Code examples SHOULD avoid relying entirely on syntax color to convey meaning.

Copy controls need accessible names.

Long code blocks require usable scrolling.

---

# 177. Accessible Tables

Tables SHOULD include proper structural headers.

Avoid merged layouts that are visually attractive but difficult for assistive technologies.

---

# 178. Globalization

Documentation SHOULD be written so it can be localized.

Avoid:

- string fragments;
- culturally specific jokes;
- ambiguous pronouns;
- unnecessarily complex sentence structures.

---

# 179. Localization Ownership

If localized documentation is supported, define:

```text
Source language
Translation workflow
Update propagation
Fallback behavior
Locale ownership
```

Do not allow translated pages to drift indefinitely from source content.

---

# 180. Dates

Use unambiguous date formats.

For internationally consumed technical documentation, forms such as:

```text
2026-09-22
```

are useful when strict machine-like clarity is appropriate.

Natural-language dates may use:

```text
September 22, 2026
```

according to editorial standard.

Avoid ambiguous:

```text
09/10/26
```

---

# 181. Time Zones

Operational documentation involving time MUST specify timezone.

Prefer explicit:

```text
14:00 UTC
```

or clearly named local zones.

---

# 182. Numbers and Units

Use consistent units and formatting.

Where systems accept units, document whether input expects:

```text
bytes
KB
KiB
seconds
milliseconds
```

Ambiguity can cause operational defects.

---

# 183. Content Security

Documentation MUST NOT expose:

- passwords;
- API credentials;
- private keys;
- production secrets;
- customer-sensitive information;
- unredacted access tokens.

Documentation repositories should participate in secret scanning.

---

# 184. Internal URLs

Public documentation SHOULD NOT expose internal-only infrastructure URLs unless explicitly intended.

Examples:

```text
internal dashboards
private hostnames
administrative endpoints
```

---

# 185. Screenshots and Privacy

Screenshots MUST be reviewed for:

```text
Customer data
Emails
Tokens
Internal URLs
Personal information
Private workspace names
```

before publication.

---

# 186. Security Procedures

Security-sensitive procedures SHOULD clearly identify:

- required role;
- high-risk steps;
- audit implications;
- rollback where appropriate.

Do not obscure risky actions inside ordinary prose.

---

# 187. Search Engine Indexing

Public documentation SHOULD deliberately define indexability.

Internal, preview, or sensitive documentation SHOULD NOT accidentally become publicly indexable.

---

# 188. AI and Machine Consumption

In 2026, documentation should assume that both humans and machine systems may consume it.

Human usability remains the primary requirement.

Machine readability SHOULD emerge from:

```text
Clear structure
Semantic HTML
Stable URLs
Descriptive headings
Explicit terminology
Structured schemas
Predictable formatting
```

Do not degrade human documentation merely to optimize for AI retrieval.

---

# 189. AI-Friendly Structure

To improve reliable machine retrieval:

- keep sections semantically focused;
- use descriptive headings;
- define terms explicitly;
- avoid unexplained pronouns;
- avoid contradictory duplicate content;
- preserve stable URLs;
- include context near facts.

This also improves human comprehension.

---

# 190. Avoid AI-Specific Content Duplication

Do not maintain:

```text
human docs
+
separate copied AI docs
```

unless a concrete technical requirement exists.

Multiple content copies increase drift.

Prefer generating machine-oriented views from the same authoritative source.

---

# 191. Structured Reference

Machine-consumable contracts SHOULD use structured formats where appropriate.

Examples:

```text
OpenAPI
JSON Schema
AsyncAPI or equivalent event schemas
Typed package metadata
```

Narrative documentation should complement structured contracts rather than replace them.

---

# 192. LLM Instruction Files

Repository-level AI instruction files MAY describe:

```text
Architecture
Commands
Conventions
Testing
Security constraints
Documentation expectations
```

They SHOULD reference authoritative documentation rather than duplicate it excessively.

They are navigation aids, not a second architectural source of truth.

---

# 193. AI-Generated Documentation

AI-generated documentation MUST be reviewed as untrusted draft content.

AI may:

- summarize;
- reorganize;
- propose examples;
- identify gaps.

AI MUST NOT be treated as evidence that a technical statement is correct.

---

# 194. AI Documentation Verification

Before accepting AI-generated technical documentation, verify:

```text
API names
Version
Commands
Paths
Configuration
Security claims
Examples
Links
Behavior
```

Hallucinated documentation can be more damaging than missing documentation.

---

# 195. AI Source Grounding

AI-generated documentation SHOULD be grounded in authoritative sources such as:

```text
Current code
Schemas
Tests
Specifications
Existing approved docs
```

Do not generate reference documentation purely from assumptions.

---

# 196. AI and Version Awareness

AI agents MUST check repository and product versions before documenting version-sensitive behavior.

Do not describe current framework behavior from memory when official version-matched information is available.

---

# 197. Generated Reference Documentation

Generated reference content is appropriate for:

```text
API schemas
CLI flags
Typed symbols
Configuration schema
```

Generation SHOULD reduce mechanical maintenance.

Generated output does not eliminate the need for curated conceptual and task documentation.

---

# 198. Generated Content Markers

Generated files SHOULD clearly state:

```text
Generated file
Do not edit directly
Source location
Generation command
```

where contributors might otherwise edit the wrong source.

---

# 199. Documentation Build

Documentation builds MUST be reproducible.

The repository SHOULD define:

```text
Install
Develop
Build
Validate
Deploy
```

commands.

---

# 200. Preview Builds

Documentation changes SHOULD support preview before publication.

Reviewers should be able to verify:

- layout;
- links;
- code;
- navigation;
- responsive behavior.

---

# 201. Documentation Deployment

Documentation publishing SHOULD use controlled automation.

Avoid manual file uploads as the normal production release mechanism.

---

# 202. Rollback

Critical documentation systems SHOULD support rollback.

Incorrect security, operational, or API documentation may need rapid correction.

---

# 203. Search Index Update

Publishing workflows SHOULD update search indexes predictably.

New or corrected documentation that cannot be discovered has limited value.

---

# 204. Performance

Documentation sites SHOULD remain fast.

Avoid loading unnecessary:

- client JavaScript;
- animations;
- analytics;
- heavyweight interactive components.

Documentation is primarily a content experience.

---

# 205. Responsive Documentation

Documentation must work at:

```text
Mobile
Tablet
Desktop
Large desktop
```

Long tables and code blocks require intentional responsive handling.

---

# 206. Navigation Layout

A typical technical documentation interface may include:

```text
Global header
├── Product navigation
└── Documentation shell
    ├── Sidebar
    ├── Article
    └── Optional table of contents
```

Navigation should support orientation without overwhelming the content.

---

# 207. Table of Contents

Long documents SHOULD provide in-page navigation.

The table of contents should reflect heading structure.

Avoid enormous tables of contents for short pages.

---

# 208. Breadcrumbs

Breadcrumbs MAY help when documentation has deep hierarchy.

They should represent information architecture rather than browser history.

---

# 209. Previous and Next Navigation

Sequential documentation such as tutorials MAY provide previous/next controls.

Reference content usually benefits more from hierarchy and search.

---

# 210. Code Copy Controls

Code blocks intended for execution SHOULD provide convenient copy behavior where practical.

Copy functionality MUST remain accessible.

---

# 211. Tabs

Use tabs carefully for equivalent variants such as:

```text
npm / pnpm
JavaScript / TypeScript
curl / SDK
```

Tabs should not hide fundamentally different concepts.

Important information MUST remain discoverable.

---

# 212. Tab Persistence

If tab selection persists globally, ensure the behavior does not hide relevant content unexpectedly.

Provide clear selected state.

---

# 213. Interactive Examples

Interactive examples are valuable when they improve learning materially.

They SHOULD NOT replace static documentation required for:

- accessibility;
- indexing;
- offline reading;
- copy/paste.

---

# 214. Documentation Style Guide

Maintain one canonical editorial style guide.

It SHOULD define:

```text
Voice
Terminology
Capitalization
Punctuation
Numbers
Dates
UI naming
Code formatting
Acronyms
Inclusive language
```

Do not force contributors to infer style from existing pages.

---

# 215. Voice

Recommended technical documentation voice:

```text
Direct
Clear
Calm
Professional
Helpful
Precise
```

Avoid both bureaucratic formality and excessive casualness.

---

# 216. Tone

Tone may change by context.

Examples:

```text
Tutorial
→ encouraging and instructional

Reference
→ neutral and precise

Incident runbook
→ concise and operational

Security warning
→ direct and unambiguous
```

Voice remains coherent while tone adapts.

---

# 217. Avoid Marketing Language

Technical documentation should not say:

```text
revolutionary
incredible
effortless
game-changing
best-in-class
```

unless quoting explicit product positioning and that context requires it.

Documentation should explain capability, not advertise it.

---

# 218. Avoid Filler

Remove phrases such as:

```text
It is important to note that
As you can see
Simply
Obviously
Basically
Just
```

when they add no meaning or imply that a difficult task is trivial.

---

# 219. Avoid Blame

Do not phrase errors as user failure unnecessarily.

Prefer:

```text
The token has expired. Create a new token and retry the request.
```

over:

```text
You entered a bad token.
```

---

# 220. UI Labels

When documenting UI, use the exact current UI label.

Example:

```text
Select **Create project**.
```

Do not paraphrase labels if doing so makes the control harder to find.

---

# 221. UI Interaction Verbs

Standardize verbs.

Example:

```text
Select
Enter
Open
Go to
Enable
Disable
Drag
```

Do not alternate randomly among:

```text
click
press
hit
tap
choose
```

unless the interaction method matters.

---

# 222. Platform Neutrality

Prefer interaction language that works across input methods where practical.

For example:

```text
Select Save
```

can often be more inclusive than:

```text
Click Save
```

unless mouse interaction specifically matters.

---

# 223. Product Names

Use canonical product and feature names.

Do not create shortened internal names in external documentation.

---

# 224. File Names

Documentation source files SHOULD follow one naming convention.

Recommended:

```text
lowercase-kebab-case.md
```

or the repository's established standard.

Avoid:

```text
New Doc FINAL v2.md
```

---

# 225. Directory Naming

Documentation directories SHOULD reflect information architecture.

Avoid directories based on temporary organizational teams.

---

# 226. Metadata Titles vs H1

If tooling derives the page H1 from metadata, define one canonical pattern.

Do not accidentally render duplicate identical titles.

---

# 227. Documentation Testing

Critical documentation SHOULD be tested at multiple levels.

Possible checks:

```text
Lint
Build
Link checking
Code compilation
Example execution
Schema validation
Accessibility
Visual regression
```

---

# 228. Documentation Unit Tests

Generated utilities and custom documentation components SHOULD have normal software tests where appropriate.

Documentation infrastructure is production software.

---

# 229. Link Tests

Internal links SHOULD be checked on every relevant change.

External link checking MAY run periodically to reduce CI instability.

---

# 230. Spell Checking

Automated spell checking MAY be used.

Maintain a project dictionary for:

- product names;
- APIs;
- technical terms.

Do not make spelling automation so noisy that contributors ignore it.

---

# 231. Terminology Linting

High-value terminology rules SHOULD be automated where practical.

Examples:

```text
Deprecated product name
Disallowed security terminology
Preferred inclusive term
```

---

# 232. Style Automation

Automate objective rules.

Do not attempt to encode every writing-quality judgment into a linter.

Humans still need to assess:

```text
Clarity
Flow
Audience fit
Accuracy
```

---

# 233. Docs Definition of Done

Documentation is complete only when applicable requirements are satisfied.

```text
✓ Audience is clear
✓ Purpose is clear
✓ Technical content is verified
✓ Canonical terminology used
✓ Prerequisites documented
✓ Procedure verified
✓ Expected outcome documented
✓ Code examples tested where practical
✓ Security-sensitive values removed
✓ Links work
✓ Headings are semantic
✓ Accessibility checked
✓ Owner assigned
✓ Version implications handled
✓ Related docs linked
✓ Documentation source committed
```

---

# 234. Feature Definition of Done

A feature is not complete if users or operators cannot understand how to use or support it.

Feature DoD SHOULD ask:

```text
□ User docs updated?
□ API docs updated?
□ Component docs updated?
□ Runbook updated?
□ Architecture docs updated?
□ ADR required?
□ Changelog/release notes required?
□ Migration guide required?
```

---

# 235. API Documentation Definition of Done

```text
✓ Contract defined
✓ Authentication documented
✓ Authorization implications documented
✓ Request fields documented
✓ Response fields documented
✓ Errors documented
✓ Example request verified
✓ Example response verified
✓ Pagination documented
✓ Rate limits documented where applicable
✓ Versioning/deprecation policy clear
✓ OpenAPI validated
```

---

# 236. Runbook Definition of Done

```text
✓ Trigger is identifiable
✓ Required access documented
✓ Diagnosis is executable
✓ Mitigation is executable
✓ Risky actions identified
✓ Recovery documented
✓ Verification documented
✓ Escalation path documented
✓ Owner assigned
✓ Procedure tested where practical
```

---

# 237. ADR Definition of Done

```text
✓ Context explained
✓ Decision explicit
✓ Alternatives considered
✓ Consequences recorded
✓ Status defined
✓ Date recorded
✓ Owner/authors identifiable
✓ Related decisions linked
```

---

# 238. Documentation Review Checklist

Before approving a document:

```text
□ Right documentation type
□ Audience clear
□ User goal clear
□ Accurate
□ Source of truth identified
□ Title specific
□ Headings descriptive
□ Most important information first
□ Active voice used where appropriate
□ Instructions imperative
□ Terminology consistent
□ Acronyms defined
□ Global audience considered
□ Links descriptive
□ Code correctly formatted
□ Examples safe
□ Examples current
□ Screenshots necessary and current
□ Alt text present
□ Security reviewed
□ Accessible structure
□ Version information correct
□ Owner assigned
□ Staleness strategy defined
```

---

# 239. Documentation Anti-Patterns

Avoid:

```text
No documentation because code is self-explanatory.
```

Avoid:

```text
README containing the entire product manual.
```

Avoid:

```text
Wiki page with no owner.
```

Avoid:

```text
Chat message as architectural decision.
```

Avoid:

```text
Screenshot-only procedure.
```

Avoid:

```text
API reference that differs from production.
```

Avoid:

```text
Tutorial mixed with exhaustive API reference.
```

Avoid:

```text
FAQ as miscellaneous dumping ground.
```

Avoid:

```text
Three sources of truth for one configuration.
```

Avoid:

```text
Architecture diagram with no editable source.
```

Avoid:

```text
Runbook never tested.
```

Avoid:

```text
"Click here."
```

Avoid:

```text
Huge paragraph before the answer.
```

Avoid:

```text
Code sample that cannot run.
```

Avoid:

```text
Documentation that silently refers to an old product version.
```

Avoid:

```text
AI-generated reference accepted without verification.
```

Avoid:

```text
Separate copied documentation exclusively for AI.
```

Avoid:

```text
Documentation stored where its owners never work.
```

---

# 240. AI Documentation Agent Rules

An AI documentation agent MUST inspect authoritative project sources before drafting technical claims.

Relevant sources include:

```text
Code
Types
Schemas
Tests
Configuration
Routes
ADRs
Existing documentation
Version metadata
```

---

# 241. AI Search-Before-Write Rule

Before introducing terminology, API behavior, commands, or architecture descriptions, AI SHOULD search the repository for the existing canonical language.

It MUST NOT casually invent competing terminology.

---

# 242. AI Version Rule

AI MUST verify versions for version-sensitive documentation.

Examples:

```text
Framework APIs
OpenAPI
CLI flags
Database behavior
Library configuration
```

Do not rely solely on remembered syntax.

---

# 243. AI Source-of-Truth Rule

If code and documentation disagree, AI MUST NOT silently choose one.

The discrepancy should be treated as a documentation or implementation defect requiring reconciliation.

---

# 244. AI Example Rule

AI-generated examples MUST use:

```text
Synthetic data
Safe commands
Current syntax
Canonical APIs
```

Do not invent credentials, production data, or unsupported APIs.

---

# 245. AI Security Rule

AI MUST NOT expose secrets discovered in project sources.

Sensitive values should be replaced with obvious placeholders.

---

# 246. AI Rewrite Rule

When improving documentation, AI SHOULD preserve:

```text
Technical meaning
Warnings
Constraints
Commands
Identifiers
Contract language
```

unless verification establishes that a change is required.

---

# 247. AI Concision Rule

AI SHOULD remove redundancy.

It MUST NOT remove constraints merely to make content shorter.

Technical concision means:

```text
minimum words
without losing required meaning
```

---

# 248. AI Citation Rule

For research-backed internal documents, AI SHOULD distinguish:

```text
Internal product fact
External standard
Recommendation
Assumption
```

External standards should link to authoritative primary sources where practical.

---

# 249. AI Confidence Rule

If documentation cannot be verified from available sources, AI SHOULD identify uncertainty rather than invent behavior.

Unknown is preferable to confidently incorrect.

---

# 250. AI Duplication Rule

AI SHOULD link to authoritative existing documentation rather than reproducing large blocks in new documents.

Do not create parallel sources of truth simply because generation is inexpensive.

---

# 251. AI Maintenance Rule

AI-generated documents require the same:

```text
Owner
Review
Lifecycle
Testing
```

as human-written documentation.

Generation method does not change maintenance obligations.

---

# 252. Documentation Governance

The organization SHOULD define:

```text
Documentation platform owner
Editorial standard owner
Technical-content owners
Publishing workflow
Deprecation policy
Accessibility standard
Review expectations
```

---

# 253. Documentation Platform Ownership

The documentation platform team owns:

```text
Infrastructure
Search
Navigation framework
Build
Publishing
Analytics
Accessibility foundations
```

It does not own the truth of every product feature.

---

# 254. Domain Ownership

Domain teams own the accuracy of documentation describing their systems.

Central documentation teams SHOULD enable quality rather than become a bottleneck for every change.

---

# 255. Documentation SLAs

High-risk documentation MAY have review expectations.

Examples:

```text
Security procedures
Operational runbooks
Compliance processes
Critical API contracts
```

Review frequency should reflect risk.

---

# 256. Documentation Audits

Periodic audits SHOULD focus on:

```text
Accuracy
Ownership
Staleness
Broken links
Duplicate content
Unsupported versions
Search failures
```

Do not audit purely for cosmetic style compliance.

---

# 257. Documentation Quality Model

Assess documentation across five dimensions:

```text
Correct
Findable
Understandable
Actionable
Current
```

A document that fails any one of these can fail the reader.

---

# 258. Golden Documentation Rules

When uncertain, use these rules:

**1. Accuracy comes first.**  
Incorrect documentation is a defect.

**2. One fact, one source of truth.**  
Link rather than duplicate unnecessarily.

**3. Write for a specific reader and goal.**

**4. Separate tutorials, how-to guides, reference, and explanation.**

**5. Lead with the useful information.**

**6. Use descriptive titles and headings.**

**7. Use active voice and direct instructions.**

**8. Use consistent terminology.**

**9. Write for a global audience.**

**10. Make procedures executable and verifiable.**

**11. Keep examples safe and tested.**

**12. Prefer text over screenshots for routine instructions.**

**13. Use semantic, accessible structure.**

**14. Treat links and URLs as contracts.**

**15. Use docs-as-code for engineering documentation.**

**16. Assign an owner.**

**17. Update documentation with the change it describes.**

**18. Archive or delete obsolete content.**

**19. Generate reference material where generation reduces drift.**

**20. Use narrative documentation where judgment and explanation are required.**

**21. Keep machine-readable contracts structured.**

**22. Optimize machine readability through better human documentation, not duplicate AI content.**

**23. Verify AI-generated technical claims.**

**24. Chat is not a permanent source of truth.**

**25. Documentation is part of the Definition of Done.**

---

# 259. Canonical Documentation Standard

The organizational standard is:

> **Documentation is maintained as a versioned, owned, testable part of the product and engineering system. Content is organized according to reader intent, separating learning, task guidance, reference, and explanation. Every important technical fact has one authoritative source; other documents link to it rather than creating conflicting copies. Documentation uses clear direct language, stable terminology, semantic accessible structure, safe verified examples, and durable URLs. Product and engineering changes update their documentation in the same delivery lifecycle. API and machine-readable contracts are generated or validated against authoritative schemas, operational procedures are executable and tested, important architectural decisions are recorded durably, and obsolete content is deprecated, archived, or removed. AI may assist documentation creation and retrieval, but generated technical claims require verification against authoritative sources.**

A mature documentation system should make it easy to answer:

```text
What is this?
Why does it exist?
Who is it for?
How do I use it?
How does it work?
What is the exact contract?
Who owns it?
Is this still current?
Where is the source of truth?
What changed?
How do I recover when it fails?
```

If those questions require searching code, old tickets, meeting notes, chat history, and individual people's memory, the documentation system is incomplete.

A few **2026-specific choices** in this standard are intentional. OpenAPI **3.2.1** is now published as the latest OAS revision; Google’s developer style guide received substantive updates as recently as **July 7, 2026**; and Microsoft’s style guide was updated **July 2, 2026**, so using living editorial guidance rather than freezing a decade-old writing standard is appropriate. citeturn821189search5turn821189search2turn574439search1

WCAG **2.2** remains the published W3C Recommendation baseline and organizes conformance around perceivable, operable, understandable, and robust content, making **WCAG 2.2 AA** the sensible minimum for documentation portals in this system. citeturn574439search16turn574439search17

For your master gold-standard hierarchy, I would place this as:

**Foundations → Framework → Security → Routes → Layouts → Facade → Components → Patterns → Reusability & Libraries → Data/API → Documentation → Testing → Performance → Accessibility → Governance.**
