---
id: "reusable-repositories"
title: "Reusable Repositories & Open-Source Adoption — Gold Standard 2026"
domain: "process"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["process", "reusable", "repositories", "open", "source"]
applies_to: ["team"]
related: ["code-review"]
legacy_number: 9
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 45750
provenance: baseline

---

For this area, the standard should explicitly separate **“learn from it,” “start from it,” “vendor it,” and “fork it.”** Those are different provenance and licensing situations.

# Reusable Repositories & Open-Source Adoption — Gold Standard 2026

## 1. Purpose

These guidelines define how teams may use public repositories, open-source projects, starter kits, boilerplates, templates, reference implementations, examples, snippets, libraries, and existing products when building new products.

The objective is to maximize development leverage without inheriting:

- unclear intellectual-property obligations;
- unnecessary technical debt;
- security vulnerabilities;
- foreign branding;
- unsuitable architecture;
- abandoned dependencies;
- licensing conflicts;
- unmaintainable forks.

The core principle is:

> **Reuse proven knowledge aggressively. Reuse code deliberately. Own the resulting product completely.**

A mature engineering organization should not rebuild solved problems merely for originality.

It also should not blindly copy repositories merely because their source is publicly visible.

---

# 2. Fundamental Rule

There are four fundamentally different forms of reuse:

```text
Idea
Pattern
Code
Asset
```

They MUST NOT be treated as equivalent.

### Idea

A concept, method, workflow, architectural approach, interaction model, or general solution.

Example:

```text
Use an app shell with:
- collapsible sidebar;
- command palette;
- contextual settings;
- server-rendered initial data.
```

### Pattern

A more concrete reusable approach.

Example:

```text
feature/
├── components/
├── actions/
├── data/
└── schemas/
```

### Code

Actual source implementation.

Example:

```ts
export async function createWorkspace(...) {
  ...
}
```

### Asset

Examples:

```text
Icons
Illustrations
Logos
Fonts
Photos
Design files
Documentation
Datasets
Example content
```

Different legal and engineering rules apply to each.

---

# 3. Ideas vs Implementation

As a general copyright principle:

> **Ideas, concepts, procedures, methods, and systems are not protected in the same way as their specific expression.**

Therefore, teams may generally study:

- architecture;
- workflows;
- feature concepts;
- product patterns;
- algorithms at the conceptual level;
- organizational approaches;

and independently implement those ideas.

However:

> **The specific source code, documentation, artwork, graphics, and other expression may be protected.**

Therefore:

```text
Learn from repository
≠
Permission to copy repository
```

---

# 4. License Still Matters

A license matters whenever actual protected material is being reused.

Examples:

```text
Copied source code
Copied components
Copied CSS
Copied documentation
Copied tests
Copied graphics
Copied templates
Copied assets
Copied substantial implementation
```

Changing:

```text
variable names
file names
function names
formatting
framework
programming language
```

does not automatically eliminate provenance or licensing obligations.

---

# 5. Public Does Not Mean Free to Copy

A repository being:

```text
public
visible
downloadable
forkable on GitHub
```

does not itself grant unrestricted reuse rights.

A public repository with **no license** should be treated as:

```text
Viewable source
NOT approved reusable source
```

unless permission is obtained or an independent implementation approach is used.

---

# 6. Forking Is Not a License

GitHub's Fork button is a technical capability.

It is not an independent intellectual-property license.

Likewise:

```text
git clone
Download ZIP
Copy file
AI rewrite
Manual rewrite
```

do not independently grant reuse rights.

Permissions come from the applicable license or other authorization.

---

# 7. Removing History Changes Nothing

This:

```text
git clone upstream

rm -rf .git

git init
```

does not transform third-party code into independently authored code.

Removing Git history changes repository history.

It does not erase provenance.

---

# 8. AI Rewriting Changes Nothing Automatically

Do not treat:

```text
Original OSS code
↓
Give code to AI
↓
"Rewrite this differently"
↓
Our proprietary code
```

as an automatic provenance-cleansing process.

If the generated implementation is substantially derived from supplied code, the underlying licensing question remains relevant.

AI is an implementation tool, not a legal reset button.

---

# 9. Approved Reuse Modes

Every reused repository SHOULD be classified as one of these modes.

## Mode A — Inspiration

Study the project and independently build your own implementation.

```text
Source project
↓
Understand idea
↓
Design own architecture
↓
Implement independently
```

Use when:

- only the concept is valuable;
- original architecture is unsuitable;
- licensing is undesirable;
- long-term ownership matters.

---

## Mode B — Starter template

Use a repository intentionally designed as a starting point.

```text
Template
↓
Create project
↓
Replace identity
↓
Modify architecture
↓
Become independent product
```

Best for:

- application shells;
- SaaS starters;
- authentication starters;
- admin starters;
- monorepo starters;
- development tooling.

---

## Mode C — Fork

Maintain a relationship with upstream.

```text
Upstream
↓
Fork
↓
Our modifications
↓
Periodic upstream merges
```

Use when upstream improvements remain valuable.

---

## Mode D — Detached fork

Start with an existing project but intentionally diverge.

```text
Upstream snapshot
↓
Internal repository
↓
Independent evolution
```

Keep internal provenance even if no future upstream synchronization is planned.

---

## Mode E — Dependency

Consume the upstream project as a package.

```text
Our application
↓
Dependency
↓
Upstream package
```

Usually preferable when the capability is mature and does not require ownership of source internals.

---

## Mode F — Vendored code

Copy a specific library or component into the codebase intentionally.

Use when:

- modification is required;
- upstream dependency model is unsuitable;
- reliability requires local ownership.

Vendored code MUST retain required licensing information.

---

## Mode G — Reference implementation

Study code to understand a standard or integration and create your own implementation.

Useful for:

```text
Protocol examples
Provider integrations
Framework examples
Algorithms
Architectural patterns
```

---

# 10. Preferred Reuse Decision

Use this order:

```text
Can an established dependency solve it?
        ↓ yes
Use dependency.

No
↓

Is there a high-quality starter/template with compatible terms?
        ↓ yes
Use template.

No
↓

Is maintaining upstream compatibility valuable?
        ↓ yes
Fork.

No
↓

Is only the idea/pattern valuable?
        ↓ yes
Reimplement independently.

No
↓

Is specific source implementation essential?
        ↓ yes
Review license and vendor/adopt deliberately.
```

---

# 11. Copy vs Reimplement

Reimplement when the external repository provides mostly:

```text
inspiration
architecture ideas
UX concepts
workflow ideas
patterns
```

Copy/adopt only when actual code reuse produces enough value to justify its obligations and maintenance cost.

---

# 12. Independent Reimplementation

When intentionally using only the idea:

```text
Observe behavior
↓
Write requirements/specification
↓
Design architecture
↓
Implement using internal standards
```

Do not:

```text
Copy function
↓
rename variables
↓
reformat
↓
claim independent implementation
```

---

# 13. High-Risk Clean Implementation

When provenance needs unusually strong separation, use a stricter process.

Conceptually:

```text
Researcher
↓
Produces behavioral specification

Implementer
↓
Works from specification
↓
Creates independent code
```

This is sometimes called clean-room-style development.

Specialist legal review may be appropriate where IP exposure is material.

---

# 14. Architectural Inspiration

Teams are encouraged to learn from excellent public repositories.

Examples of reusable knowledge:

```text
Directory structure
Feature boundaries
State architecture
Caching strategy
Server/client boundaries
Testing strategy
CI structure
Deployment architecture
Component composition
API conventions
```

The goal is to understand **why the design works**, not mechanically reproduce it.

---

# 15. Product Inspiration

It is reasonable to study products for:

```text
Navigation models
Onboarding flows
Settings architecture
Search behavior
Table patterns
Command palettes
Dashboard hierarchy
```

The resulting product SHOULD still use:

```text
Our branding
Our design system
Our terminology
Our implementation
Our content
Our interaction details
```

Avoid pixel-for-pixel or brand-confusing replication.

---

# 16. Own the Product

After adopting a starter, the finished product MUST feel owned.

Replace:

```text
Original brand
Original product terminology
Original placeholder content
Original analytics
Original telemetry
Original deployment config
Original domains
Original support links
Original screenshots
```

with organization-owned equivalents.

---

# 17. Do Not Ship the Starter

A starter is scaffolding.

The final architecture should not visibly feel like:

```text
Generic SaaS Starter
+
logo changed
+
three pages added
```

The product should evolve into a deliberate internal architecture.

---

# 18. Starter Repository Evaluation

Before adopting a starter, evaluate:

```text
Architecture
License
Security
Dependencies
Maintenance activity
Framework version
Testing
Accessibility
Performance
Code quality
Deployment assumptions
Database model
Authentication
Authorization
Multi-tenancy
Observability
```

A polished demo is not necessarily production-quality software.

---

# 19. Repository Quality Signals

Positive signals include:

```text
Clear license
Active maintenance
Recent security updates
Clear architecture
Automated tests
CI
Type safety
Dependency hygiene
Documented environment setup
Clear ownership
```

No single signal is sufficient.

---

# 20. Negative Signals

Treat these as warnings:

```text
No license
Unknown authorship
Abandoned dependencies
Hardcoded credentials
No authorization layer
Old framework major versions
Massive dependency count
No tests
Disabled type checking
Security warnings ignored
Production assumptions unexplained
```

---

# 21. License Classification

Use the exact license identifier whenever possible.

Prefer SPDX identifiers such as:

```text
MIT
MIT-0
0BSD
BSD-2-Clause
BSD-3-Clause
Apache-2.0
MPL-2.0
LGPL-3.0-only
GPL-3.0-only
AGPL-3.0-only
```

Do not classify merely as:

```text
"open source"
```

because licenses impose materially different obligations.

---

# 22. Tier 1 — Permissive Licenses

Common examples:

```text
MIT
BSD
ISC
Apache-2.0
```

These are generally strong candidates for commercial reuse.

They typically allow:

```text
Commercial use
Modification
Distribution
Private modification
```

subject to their specific conditions.

---

# 23. MIT

MIT generally permits broad:

```text
use
copy
modify
merge
publish
distribute
sublicense
sell
```

but the license requires its copyright and permission notice to accompany copies or substantial portions.

Therefore:

> **MIT does not mean "remove attribution and pretend nobody else wrote it."**

---

# 24. MIT-0 / Zero-Attribution Licenses

Some permissive licenses are intentionally designed without the usual attribution retention requirement.

Examples may include:

```text
MIT-0
0BSD
```

These can be especially useful for starter/example code where authors intentionally want frictionless reuse.

Still verify the exact repository license.

---

# 25. BSD

BSD-style licenses are generally permissive but retain specified notice requirements.

Certain variants also restrict using contributor names for endorsement.

Read the actual variant.

Do not treat every license containing "BSD" as identical.

---

# 26. Apache 2.0

Apache-2.0 is permissive and includes explicit patent-related provisions.

When redistributing modified Apache-licensed work, relevant requirements can include:

```text
License preservation
Modification notices
Copyright/patent/trademark notice preservation
NOTICE handling where applicable
```

Do not remove upstream NOTICE content merely because the product has been substantially modified.

---

# 27. Tier 2 — Weak/File-Level Copyleft

Example:

```text
MPL-2.0
```

MPL uses a file-level copyleft model.

Modified MPL-covered files generally remain subject to MPL obligations when distributed, while separate new files may remain under different licensing terms.

This can be workable in proprietary products when intentionally architected.

---

# 28. Tier 3 — Library Copyleft

Examples include LGPL variants.

These require more deliberate review.

Use may be compatible with proprietary software under applicable conditions, but distribution, modification, and linking details matter.

Do not approve LGPL merely because:

```text
"It's only a library."
```

Review the exact version and integration model.

---

# 29. Tier 4 — Strong Copyleft

Example:

```text
GPL
```

GPL is designed so that covered derivative works distributed under applicable circumstances remain under GPL terms.

Therefore, copying GPL source directly into a proprietary product requires deliberate legal and architectural review.

Do not assume:

```text
We rewrote 40%
```

removes the issue.

---

# 30. SaaS and GPL

Do not automatically conclude:

```text
We're SaaS, so licenses don't matter.
```

Traditional GPL distribution obligations generally center on conveying/distributing copies rather than mere interaction across a network.

But other licenses differ.

Always inspect the actual license.

---

# 31. AGPL

AGPL specifically adds obligations relating to modified software used interactively over a network.

Therefore, AGPL code deserves special review for proprietary SaaS.

Do not treat AGPL as equivalent to MIT or ordinary GPL for SaaS architecture.

---

# 32. Source-Available Is Not Automatically Open Source

A repository may expose source while imposing restrictions such as:

```text
No commercial use
No competing service
Limited business use
Revenue limit
Named-user restrictions
```

Such terms may not satisfy the standard definition of open source.

Do not equate:

```text
source visible
```

with:

```text
open source
```

---

# 33. Noncommercial Licenses

Code marked:

```text
Noncommercial
Personal use only
Educational use only
```

MUST NOT be assumed suitable for commercial products.

A startup product is generally commercial development even before meaningful revenue exists.

---

# 34. No-License Repositories

A repository without a license is **not approved for source reuse by default**.

Allowed workflow:

```text
Study concept
↓
Create independent specification
↓
Implement internally
```

Do not:

```text
clone
↓
remove copyright
↓
ship
```

---

# 35. Custom Licenses

Custom licenses require review.

Do not infer permission from:

```text
"It looks like MIT."
```

or:

```text
"The README says free."
```

The actual terms control the granted rights.

---

# 36. Multiple Licenses

Repositories may contain:

```text
Multiple license options
Different licenses by directory
Dependencies with separate licenses
Assets under separate terms
```

Determine which license applies to the material actually used.

---

# 37. Dual Licensing

If software is offered under:

```text
License A OR License B
```

select the route compatible with the intended product and comply with that license.

Record the choice.

---

# 38. Repository License vs Dependency Licenses

A repository's root license does not magically replace the licenses of its third-party dependencies.

Example:

```text
Starter
LICENSE: MIT
```

may still depend on packages under:

```text
Apache
BSD
MPL
LGPL
GPL
Commercial terms
```

Dependency obligations remain relevant.

---

# 39. Repository License vs Assets

Likewise:

```text
Code license
≠
Font license
≠
Icon license
≠
Photo license
≠
Illustration license
≠
Dataset license
```

Review separately.

---

# 40. Trademark Is Separate

A code license may permit use of software without granting rights to:

```text
Brand name
Logo
Product identity
Trademark
```

Do not launch a derived product using confusingly similar upstream branding.

---

# 41. Remove Upstream Branding

When making the project your own, replace:

```text
Name
Logo
Favicon
Domain
Social metadata
Email templates
Package names
Analytics IDs
App identifiers
Screenshots
Support contact
Legal entities
```

unless explicitly intended otherwise.

---

# 42. Do Not Imply Endorsement

Do not present the resulting product in a way that implies the upstream authors:

```text
operate it
endorse it
support it
partner with it
```

without permission.

---

# 43. Patents

Copyright is not the only relevant IP regime.

A concept that is not protected by copyright may potentially implicate patent rights in some jurisdictions.

This is particularly relevant for certain:

```text
technical inventions
specialized algorithms
hardware/software interactions
protocols
```

High-value/high-risk copying may warrant specialist review.

---

# 44. Trade Secrets

Do not reuse code or designs obtained through:

```text
leaks
former employer access
private repositories
confidential documents
NDA materials
unauthorized credentials
```

The fact that something can be technically accessed does not make it legitimate reusable source.

---

# 45. Provenance

Every meaningful external code adoption MUST have known provenance.

Record:

```text
Project
Repository
Author/organization
License
Version/tag/commit
Date adopted
Adoption mode
Internal owner
```

---

# 46. Provenance Registry

Maintain an internal register such as:

```text
docs/third-party/
THIRD_PARTY_NOTICES
OSS_MANIFEST
SBOM
dependency inventory
```

according to project scale.

---

# 47. SPDX

Use standardized SPDX license identifiers where practical.

Example:

```text
MIT
Apache-2.0
MPL-2.0
```

rather than informal descriptions such as:

```text
MIT-ish
free license
open-source license
```

---

# 48. Third-Party Notices

Where licensing requires notices, preserve them.

A typical project may maintain:

```text
LICENSE
THIRD_PARTY_NOTICES.md
NOTICE
```

depending on adopted software.

Do not remove notices because they look unrelated to the new brand.

---

# 49. Attribution Is Not Branding

Maintaining required attribution does not mean the product must advertise itself as someone else's product.

Legal/provenance notices can usually remain in:

```text
License file
Third-party notices
About/legal screen
Documentation
Distribution materials
```

as required.

Product branding can still be fully your own.

---

# 50. Internal Provenance Even When Attribution Is Not Required

Even if a license imposes minimal or no attribution obligations, the organization SHOULD maintain internal provenance.

Why:

```text
Security response
Dependency tracking
Future licensing review
Maintenance
Upstream updates
Acquisition due diligence
```

---

# 51. Fork vs Template

Use a **fork** when:

```text
Upstream relationship matters
Upstream patches matter
Periodic synchronization is expected
```

Use a **template/detached copy** when:

```text
Upstream synchronization is not expected
Architecture will diverge rapidly
The repository is intended as scaffolding
```

---

# 52. Fork Setup

For maintained forks:

```text
origin
→ organization fork

upstream
→ original repository
```

Document:

```text
Upstream commit
Sync policy
Local modifications
Conflict strategy
Owner
```

---

# 53. Detached Starter Setup

For a detached starter:

```text
Record upstream source
Record snapshot commit
Record license
Create organization repository
Remove starter-specific systems
Begin independent history if desired
```

Independent Git history is an engineering decision.

It does not erase license obligations.

---

# 54. Upstream Synchronization

Do not repeatedly merge upstream blindly.

For each upstream update review:

```text
Security
Architecture
Dependencies
Behavior changes
Local conflicts
License changes
```

A fork is software you now operate.

---

# 55. License Changes Upstream

Future upstream versions may use different licensing terms.

Your adopted snapshot remains governed by the license applicable to the version you received, subject to its terms.

Before upgrading, review the newer version's terms.

---

# 56. Do Not Auto-Upgrade Forks

Automated upstream synchronization into production SHOULD NOT bypass:

```text
Code review
Security review
Tests
License checks
Architecture review
```

---

# 57. Starter Sanitization

Before development begins on a starter repository, remove or replace:

```text
Demo accounts
Demo API keys
Example secrets
Author analytics
Telemetry
External webhooks
Sample payment accounts
Sample domains
Placeholder email providers
Deployment credentials
Demo admin users
```

---

# 58. Secret Rotation

Assume any credentials found in public starter repositories are compromised or non-secret.

Never reuse them.

Generate organization-owned credentials.

---

# 59. Authentication Review

Do not trust authentication architecture merely because the starter works.

Verify against the Security Gold Standard:

```text
Session handling
Cookie settings
Password flows
OAuth
MFA
Recovery
CSRF
Authorization
```

---

# 60. Authorization Review

Starter kits frequently demonstrate functionality rather than robust authorization.

Verify:

```text
Object-level permissions
Tenant boundaries
Role checks
Server-side authorization
Admin actions
```

before production use.

---

# 61. Multi-Tenant Review

For SaaS starters, actively test:

```text
Tenant A
→ attempts Tenant B resource
```

for:

```text
read
write
delete
export
search
files
background jobs
```

---

# 62. Database Review

Do not inherit a starter database model blindly.

Review:

```text
Identifiers
Relationships
Constraints
Tenant ownership
Indexes
Deletion strategy
Audit requirements
Migration strategy
```

---

# 63. Dependency Review

Immediately inspect:

```text
Direct dependencies
Transitive dependencies
Framework versions
Abandoned libraries
Duplicate libraries
Security advisories
```

Remove dependencies not required by the product.

---

# 64. Dependency Reduction

Starter repositories often optimize for demonstrating many capabilities.

Your product should not inherit:

```text
5 analytics SDKs
3 UI libraries
unused payment systems
unused auth providers
unused editors
unused chart libraries
```

Delete unused infrastructure aggressively.

---

# 65. Framework Upgrade

If the starter uses an old framework version:

```text
Upgrade first
```

or establish an explicit migration plan before significant product development.

Do not build years of new work on already-obsolete scaffolding.

---

# 66. Design-System Conversion

Starter UI MUST be converted to the canonical design system.

For this system:

```text
shadcn/ui
↓
internal canonical components
↓
semantic tokens
↓
product components
```

Do not maintain the starter's parallel button/input/modal system.

---

# 67. Remove Competing UI Libraries

If the starter includes unrelated design systems:

```text
Material UI
Ant
Bootstrap
Custom primitives
```

and the organization standard is shadcn-based, migrate or remove them unless a documented requirement exists.

Avoid two competing component systems.

---

# 68. Facade Ownership

The final application must follow the organization's:

```text
Facade Gold Standard
Layout Gold Standard
Design System
Content standards
```

Do not leave upstream visual identity simply because components are functional.

---

# 69. Route Ownership

Convert starter routes to the canonical product information architecture.

Do not preserve:

```text
/dashboard-v2
/demo
/examples
/playground
```

because the starter happened to use them.

---

# 70. Domain Language

Replace generic starter terminology with actual domain language.

Example:

```text
Generic:
Organizations

Product:
Workspaces
```

if Workspace is the canonical product concept.

Domain terminology should be consistent throughout:

```text
routes
types
database
UI
documentation
```

where appropriate.

---

# 71. Configuration Ownership

Centralize configuration according to the Framework Gold Standard.

Remove:

```text
unused environment variables
starter-specific flags
foreign API endpoints
author accounts
hardcoded hostnames
```

---

# 72. CI/CD Ownership

Starter CI SHOULD be reviewed or replaced.

Verify:

```text
Deployment target
Secrets
Permissions
Branch names
Release behavior
Package publishing
Cache behavior
Preview deployment
```

Never assume external CI configuration is production-ready.

---

# 73. GitHub Actions Security

Treat third-party CI actions as dependencies.

Pin or manage them according to organizational supply-chain policy.

Do not blindly inherit highly privileged workflows.

---

# 74. Infrastructure Ownership

Review all starter:

```text
Dockerfiles
Terraform
Cloud templates
Kubernetes
Vercel configuration
Database configuration
Storage policies
```

before use.

Infrastructure from another organization embeds that organization's assumptions.

---

# 75. Observability Ownership

Replace upstream:

```text
Sentry project
Analytics project
Logging destination
Telemetry keys
Tracing endpoint
```

with approved organization-owned systems.

---

# 76. Product Analytics

Never accidentally send product/customer telemetry to the starter author's analytics account.

Audit all:

```text
analytics SDKs
tracking pixels
error reporting
remote logging
```

before launch.

---

# 77. External Services

Inventory all externally contacted domains.

Starter repositories may include:

```text
CDNs
fonts
analytics
image hosts
telemetry
demo APIs
```

Every external dependency requires intentional ownership.

---

# 78. Test Ownership

Do not delete all starter tests because they refer to upstream behavior.

Instead:

```text
Review
↓
Retain useful invariant tests
↓
Rewrite product-specific tests
↓
Remove obsolete tests
```

---

# 79. Replace Demo Tests

Tests that merely assert starter demo behavior should not survive indefinitely.

The final test suite must describe **your product**.

---

# 80. Documentation Ownership

Replace the starter README.

Your README should explain:

```text
What this product is
Architecture
Setup
Development
Testing
Deployment
Ownership
```

Do not ship an upstream README with your logo appended.

---

# 81. Keep Required Legal Material

Replacing documentation does NOT mean removing:

```text
LICENSE
NOTICE
Required attribution
Third-party notices
```

where these must remain.

Product docs and legal provenance are different concerns.

---

# 82. Remove Upstream Contribution Rules

If the repository is now independent, remove irrelevant upstream:

```text
CONTRIBUTING
Issue templates
PR templates
Code owners
Release process
Community links
```

and replace them with organizational standards.

---

# 83. Package Identity

Change:

```text
package name
namespace
bundle identifier
Docker image
application IDs
deployment project
```

to organization-owned identifiers.

Do not publish packages under upstream names.

---

# 84. Copyright Statements

Do not remove valid third-party copyright statements when the applicable license requires them to remain.

You MAY add copyright notices covering your own contributions.

Example conceptually:

```text
Original portions:
Copyright Original Authors

Modifications:
Copyright Our Organization
```

where applicable.

---

# 85. Relicensing

Do not assume that modifying code gives you the right to relicense all of it.

You may control licensing of your own contributions subject to upstream license requirements.

Whether the combined work can be relicensed depends on the upstream terms.

---

# 86. Proprietary Product

An application can be proprietary while using many permissively licensed open-source components.

This is normal.

The correct model is:

```text
Our proprietary product
+
compliant third-party components
```

not:

```text
We must pretend all source was written from zero
```

---

# 87. Attribution Does Not Reduce Ownership

A commercial product remains your product even when it correctly acknowledges open-source components.

You own:

```text
Your original source
Your brand
Your product design
Your infrastructure
Your data
Your business logic
Your modifications
```

subject to applicable third-party rights.

Correct provenance strengthens engineering maturity rather than weakening ownership.

---

# 88. Product Differentiation

Do not treat generic infrastructure as competitive differentiation.

Reusing:

```text
authentication foundation
tables
forms
routing patterns
CI
logging
component primitives
```

can free engineering effort for actual differentiators:

```text
Domain workflow
Customer experience
Business rules
Data
Automation
Performance
Integrations
Product intelligence
```

---

# 89. Buy/Use/Build Principle

Use this hierarchy:

```text
Commodity capability
→ reuse

Differentiating capability
→ own deliberately

Security-critical commodity
→ use proven implementation

Core proprietary business behavior
→ own
```

Do not spend product development time recreating standardized infrastructure without reason.

---

# 90. Reusable Internal Starter

The organization SHOULD maintain its own canonical starter once patterns stabilize.

Example:

```text
company-app-starter/
├── Next.js
├── TypeScript strict
├── Tailwind
├── shadcn-based design system
├── auth integration
├── security defaults
├── linting
├── testing
├── observability
└── deployment
```

---

# 91. Internal Starter Is Preferred

Once an internal gold-standard starter exists:

```text
Internal starter
>
Random public boilerplate
```

for ordinary new projects.

Public repositories can still provide ideas and specialized modules.

---

# 92. Internal Starter Should Stay Thin

Do not create a company starter containing every capability ever used.

Core starter:

```text
Framework
Security baseline
Design system
Testing
Observability
CI
Configuration
```

Optional functionality should be composable.

---

# 93. Internal Modules

Reusable capabilities MAY be distributed separately:

```text
payments
email
billing
webhooks
analytics
admin
uploads
queues
AI
```

New projects install only what they require.

---

# 94. Golden Path

The organization SHOULD provide a paved-road project bootstrap.

Example:

```text
create-company-app
↓
Choose project type
↓
Generate approved baseline
↓
Start product development
```

The safest architecture should also be the easiest architecture to start.

---

# 95. Public Starter Evaluation Scorecard

Assess candidates against:

| Area | Question |
|---|---|
| License | Can we legally use it as intended? |
| Security | Does it follow current secure practices? |
| Framework | Is it current and supported? |
| Architecture | Does it align with our standards? |
| Dependencies | Are they necessary and maintained? |
| UI | Can it migrate cleanly to our system? |
| Testing | Is behavior verified? |
| Maintenance | Is upstream healthy? |
| Provenance | Is ownership clear? |
| Complexity | Is adopting easier than rebuilding? |

Do not select by visual appearance alone.

---

# 96. Adoption Categories

## Green

Typical:

```text
Clear permissive license
Good provenance
Current stack
No questionable assets
Security review passed
```

Suitable for ordinary adoption.

## Review required

Typical:

```text
MPL/LGPL
Large dependency surface
Custom license
Mixed asset licenses
Old architecture
Security concerns
```

Needs intentional assessment.

## Do not copy by default

Typical:

```text
No license
Proprietary source
Noncommercial restriction
Unknown provenance
Leaked/private source
Strong copyleft incompatible with intended distribution model
```

Use inspiration/independent implementation or seek permission.

---

# 97. License Is a Gate, Not the Whole Review

A repository can be perfectly licensed and still be unacceptable due to:

```text
Security
Architecture
Abandonment
Performance
Accessibility
Dependencies
Quality
```

MIT does not mean production-ready.

---

# 98. Security Is a Gate

No external starter proceeds to production solely because it saves development time.

Apply the Security Gold Standard in full.

---

# 99. Supply-Chain Review

Before adoption:

```text
Generate dependency inventory
Run vulnerability checks
Inspect install scripts
Inspect CI
Inspect runtime integrations
Inspect packages with unusual provenance
```

---

# 100. SBOM

Significant products SHOULD maintain a software bill of materials where organizational scale or risk justifies it.

Use standardized package/license identification where possible.

The purpose is to answer quickly:

```text
Are we using component X?
Which version?
Where?
Under what license?
Is it vulnerable?
```

---

# 101. Reuse Register

For substantial copied/vendor/forked source, maintain something similar to:

```text
Source:
https://...

Version:
v1.4.2

Commit:
abcdef

License:
Apache-2.0

Adoption:
Detached starter

Date:
2026-09-22

Owner:
Platform

Notes:
Replaced auth and UI layers.
```

---

# 102. Small Snippets

Tiny conventional snippets may not justify heavy provenance machinery.

Use judgment.

However, do not intentionally break a large protected implementation into small pieces to evade provenance tracking.

---

# 103. Stack Overflow / Blog Code

Treat copied snippets from:

```text
Blog posts
Forums
Stack Overflow
Documentation
Social media
```

as externally sourced material.

Check the site's applicable terms/license when substantial code is reused.

For trivial syntax, independent implementation is usually preferable.

---

# 104. Official Documentation Examples

Framework documentation examples are useful reference material.

Prefer adapting the concept into repository conventions rather than copying large tutorial applications wholesale.

---

# 105. AI-Sourced Repository Discovery

AI MAY recommend:

```text
starter repositories
reference implementations
libraries
architecture examples
```

but recommendations MUST be independently checked for:

```text
actual repository
license
maintenance
version
security
```

AI must not invent license status.

---

# 106. AI Must Inspect License

Before an AI agent copies substantial external code into a project, it MUST determine:

```text
License exists?
Which license?
Does intended reuse comply?
Are additional notices present?
```

Unknown means:

```text
Do not copy by default.
```

---

# 107. AI Inspiration Rule

When a repository is useful only as inspiration, AI SHOULD extract:

```text
Requirements
Architecture concepts
Patterns
Behavior
```

and then implement using the organization's standards.

It SHOULD NOT perform line-by-line paraphrasing of source merely to make it appear original.

---

# 108. AI Provenance Rule

AI SHOULD preserve provenance whenever it vendors, ports, or materially adapts externally sourced code.

Do not let AI erase attribution headers automatically during refactors.

---

# 109. AI License Files

AI MUST NOT remove or replace:

```text
LICENSE
NOTICE
copyright headers
```

without first determining whether removal is permitted.

---

# 110. AI Asset Rule

AI MUST inspect asset licensing separately from source licensing.

Do not assume an MIT repository makes every included:

```text
font
photo
illustration
logo
icon set
dataset
```

MIT licensed.

---

# 111. AI Rewrite Rule

If asked:

```text
"Rewrite this GPL/no-license code so we can use it proprietary."
```

the preferred engineering solution is:

```text
Extract functional requirements
↓
Design independent implementation
↓
Implement without transforming the source line-by-line
```

not cosmetic rewriting.

---

# 112. AI Repository Adoption Rule

When adapting a starter, AI SHOULD first inspect:

```text
LICENSE
NOTICE
README
package manifests
lockfiles
framework version
auth
database
CI
environment template
external services
assets
```

before beginning major customization.

---

# 113. Development Workflow

Recommended external-starter workflow:

```text
1. Discover
2. License/provenance review
3. Architecture review
4. Security review
5. Snapshot/fork
6. Sanitize
7. Upgrade
8. Reduce dependencies
9. Apply internal architecture
10. Apply design system
11. Replace product identity
12. Add tests
13. Add observability
14. Record provenance
15. Launch review
```

---

# 114. Sanitization Checklist

Immediately after adoption:

```text
□ Replace repository name
□ Replace package namespace
□ Replace app name
□ Replace logos
□ Replace favicon
□ Replace domains
□ Remove demo users
□ Remove demo data
□ Remove foreign analytics
□ Remove foreign telemetry
□ Replace environment variables
□ Replace auth credentials
□ Replace payment configuration
□ Review webhooks
□ Review CI
□ Review cloud config
□ Review dependencies
□ Review assets
□ Preserve required legal notices
```

---

# 115. Architecture Conversion Checklist

Before feature work accelerates:

```text
□ Routes follow internal standard
□ Layouts follow internal standard
□ shadcn/internal UI is canonical
□ Security architecture reviewed
□ Auth standardized
□ Authorization standardized
□ Data access standardized
□ Validation standardized
□ Logging standardized
□ Error handling standardized
□ Testing standardized
□ Documentation standardized
```

---

# 116. Production Readiness Checklist

Before deployment:

```text
□ License reviewed
□ Third-party notices complete
□ Provenance recorded
□ Dependencies inventoried
□ Security scanning completed
□ Secrets rotated
□ CI permissions reviewed
□ Auth reviewed
□ Authorization tested
□ Tenant boundaries tested
□ External network calls inventoried
□ Analytics organization-owned
□ Assets licensed appropriately
□ Branding replaced
□ Documentation replaced
□ Framework supported
□ Production build passes
□ Accessibility verified
□ Critical tests pass
```

---

# 117. Acquisition / Investment Readiness

Clean provenance matters later.

A mature repository should allow due diligence to determine:

```text
What did you write?
What did you adopt?
Under what terms?
What dependencies exist?
Are notices complete?
Can the product be commercially distributed?
```

Do not wait until fundraising, acquisition, or enterprise procurement to reconstruct provenance.

---

# 118. Reuse Anti-Patterns

Avoid:

```text
"It's on GitHub, therefore it's free."
```

Avoid:

```text
"We changed the name, so it's ours."
```

Avoid:

```text
"We removed .git, so provenance disappeared."
```

Avoid:

```text
"AI rewrote it, therefore the license no longer matters."
```

Avoid:

```text
"MIT means no attribution."
```

Avoid:

```text
"SaaS means GPL-style licenses never matter."
```

Avoid:

```text
"Root LICENSE covers every asset."
```

Avoid:

```text
"Open source means public domain."
```

Avoid:

```text
"Public source means open source."
```

Avoid:

```text
"Forking means permission."
```

Avoid:

```text
"Nobody will notice."
```

Legal and engineering governance should not depend on detection probability.

---

# 119. Good Reuse

Good:

```text
Study Linear-like command patterns
↓
Design our own command architecture
```

Good:

```text
Use MIT starter
↓
Preserve required notice
↓
Replace architecture/branding
↓
Build proprietary product
```

Good:

```text
Use Apache library
↓
Track NOTICE
↓
Keep dependency updated
```

Good:

```text
Inspect no-license repo
↓
Learn concept
↓
Implement independently
```

---

# 120. Poor Reuse

Poor:

```text
Clone no-license SaaS
↓
Change logo
↓
Delete LICENSE/history
↓
Sell
```

Poor:

```text
Feed restricted source to AI
↓
Ask AI to rename everything
↓
Treat result as clean
```

Poor:

```text
Fork abandoned starter
↓
Never update dependencies
↓
Launch with demo auth
```

---

# 121. Product Ownership Model

The correct mentality is:

> **We do not need every line to originate internally. We need every line we ship to have a legitimate provenance, a responsible owner, and a reason to exist.**

This produces better engineering than artificial "everything from scratch" policies.

---

# 122. Commodity vs Differentiation

Aggressively reuse commodity capabilities.

Examples:

```text
UI primitives
Authentication infrastructure
Database drivers
Validation
Date libraries
HTTP clients
Testing tools
Build systems
Deployment tooling
```

Invest proprietary engineering effort where it creates product advantage.

---

# 123. Never Rebuild for Ego

Do not rebuild mature infrastructure merely to claim:

```text
100% built in-house
```

That is not an engineering quality metric.

Quality is better measured by:

```text
Correctness
Security
Maintainability
Performance
Ownership
User value
```

---

# 124. Never Copy for Speed Alone

Conversely:

```text
"It saves two weeks."
```

does not justify importing:

```text
unclear rights
security defects
architectural debt
abandoned code
```

Speed must be measured over the system's lifecycle.

---

# 125. Golden Reuse Rules

**1. Reuse ideas freely; reuse expression deliberately.**

**2. Public source is not automatically open source.**

**3. A missing license means do not copy by default.**

**4. Forking is technical, not legal permission.**

**5. Removing Git history does not remove provenance.**

**6. AI rewriting does not automatically remove provenance.**

**7. Prefer mature dependencies for commodity capabilities.**

**8. Prefer good starter templates over rebuilding generic scaffolding.**

**9. Maintain forks only when upstream relationship creates value.**

**10. Reimplement independently when only the concept is valuable.**

**11. Record where adopted code came from.**

**12. Preserve required licenses, notices, and attribution.**

**13. Review assets separately from code.**

**14. Review dependencies separately from the root project license.**

**15. Remove upstream branding and identity.**

**16. Replace foreign security, auth, analytics, and infrastructure.**

**17. Convert the project to internal architecture early.**

**18. Delete unused starter functionality aggressively.**

**19. Keep framework and dependencies current.**

**20. Apply full security review before production.**

**21. Build differentiation on top of commodity reuse.**

**22. Maintain an internal gold-standard starter.**

**23. Track third-party software sufficiently for security and due diligence.**

**24. Do not hide provenance; manage it.**

**25. Make the resulting product unmistakably yours.**

---

# 126. Canonical Standard

The organizational standard is:

> **Teams are encouraged to reuse open-source software, public reference implementations, starter repositories, templates, and established architectural patterns when doing so materially improves development speed or reliability. Reuse must be classified explicitly as inspiration, dependency adoption, template adoption, maintained fork, detached fork, vendored source, or independent reimplementation. Public visibility alone is never treated as permission to copy. Actual source code and assets are used only under compatible terms or other authorization, while ideas and functional patterns may be independently reimplemented. Required license, copyright, NOTICE, and attribution information is preserved; trademarks and branding are removed unless independently authorized. Every adopted repository undergoes provenance, license, security, dependency, architecture, asset, and infrastructure review. Starter code is treated as scaffolding rather than final architecture and is converted early to the organization's framework, security, design-system, routing, documentation, testing, and observability standards.**

The target state is:

```text
Best ideas from the ecosystem
+
proven open-source infrastructure
+
our architecture
+
our design system
+
our security
+
our product logic
+
our brand
+
our ownership
=
our product
```

The question is never:

> "Did we write every line ourselves?"

The correct questions are:

```text
Do we have the right to use it?
Do we understand where it came from?
Do we understand how it works?
Is it secure?
Does it fit our architecture?
Can we maintain it?
Have we satisfied its obligations?
Does the resulting product belong operationally and creatively to us?
```

If those answers are clear, external reuse is normal professional software engineering.

A few license distinctions are worth keeping especially firm in your internal policy. **MIT still requires preservation of its copyright and permission notice** for copies or substantial portions, whereas **MIT-0** was specifically designed without that attribution condition. citeturn425715search0turn425715search4 Apache 2.0 permits broad commercial modification and distribution but has explicit license, notice, modification-marking, and patent provisions. citeturn937066search2

For copyleft, Mozilla describes MPL 2.0 as **file-level copyleft**, while GPL applies more broadly to covered derivative works under its distribution conditions. The AGPL specifically adds a network-use source provision, so a proprietary SaaS team should not classify it like MIT simply because the software runs on servers. citeturn425715search1turn937066search0turn937066search8

For automated governance, use canonical SPDX identifiers rather than home-grown labels; the SPDX License List is actively maintained and, as of **September 16, 2026, is version 3.29.0**. citeturn392994search0

This is an engineering-governance baseline, not a substitute for jurisdiction-specific legal review when a commercially important dependency, patent question, unusual custom license, or major acquisition is involved.
