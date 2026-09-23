---
id: "git-repository"
title: "Git & Repository Guidelines — Gold Standard 2026"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["engineering", "git", "repository"]
applies_to: ["general"]
related: ["reusability-libraries", "feature-flag"]
legacy_number: 25
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 71001
provenance: baseline

---

Below is the canonical **Git & Repository Guidelines — Gold Standard 2026**. It deliberately keeps **repository/source-governance concerns here**, while CI/CD owns build, artifact, deployment, and promotion mechanics.

# Git & Repository Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- Git repositories;
- repository structure;
- repository ownership;
- branch strategy;
- branch naming;
- commits;
- commit messages;
- pull requests;
- CODEOWNERS;
- protected branches;
- repository rules;
- history integrity;
- generated files;
- vendored files;
- lockfiles;
- binary files;
- monorepos;
- multi-repo boundaries;
- tags;
- release tags;
- Git attributes;
- Git ignore rules;
- repository metadata;
- archival;
- repository security;
- AI-generated source changes.

The objective is to make repositories:

```text
Understandable
Reviewable
Traceable
Secure
Reproducible
Maintainable
Automatable
Low-friction
```

The core principle is:

> **A repository is the authoritative, reviewable history of a software system—not merely a place to store files.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
Affected repository
Risk
Compensating controls
Owner
Review date
```

---

# 3. Repository Responsibilities

A repository SHOULD make it possible to determine:

```text
What is this software?
How do I run it?
How do I test it?
Who owns it?
How is it structured?
How does it depend on other code?
How are changes reviewed?
How is it released?
```

without relying primarily on tribal knowledge.

---

# 4. Repository Is a Product Boundary

Repository boundaries SHOULD reflect meaningful:

```text
ownership
versioning
dependency
release
security
lifecycle
```

boundaries.

Do not create repositories solely because a directory feels large.

---

# 5. Repository Boundary Questions

Before creating a new repository, ask:

```text
Does it need independent ownership?
Does it need independent versioning?
Does it need independent access control?
Does it need independent release lifecycle?
Does it need a different technology/toolchain?
Would separation reduce or increase coordination cost?
```

---

# 6. Repository Proliferation

Avoid creating many tiny repositories when the result is:

```text
cross-repo atomic changes
duplicated CI
duplicated tooling
dependency version churn
difficult discoverability
```

---

# 7. Mega-Repository Risk

Likewise, do not place unrelated systems into one repository merely because monorepos are fashionable.

A monorepo still requires coherent:

```text
ownership
dependency boundaries
tooling
build isolation
```

---

# 8. Repository Source of Truth

Git MUST be the authoritative source for version-controlled application code and declarative repository configuration.

Production state itself does not belong in Git unless represented intentionally through declarative configuration.

---

# 9. What Belongs in Git

Typical version-controlled content includes:

```text
source code
tests
schemas
migrations
configuration templates
CI definitions
IaC
documentation
scripts
lockfiles
```

where applicable.

---

# 10. What Does Not Belong in Git

Do not commit:

```text
runtime secrets
local credentials
build outputs without explicit reason
temporary files
IDE caches
production database dumps
personal backups
```

---

# 11. Repository Root

The repository root SHOULD remain understandable.

Avoid turning the root into an unstructured collection of dozens of unrelated files.

---

# 12. Canonical Root Structure

A typical application repository may contain:

```text
/
├─ apps/
├─ packages/
├─ services/
├─ docs/
├─ scripts/
├─ tests/
├─ tooling/
├─ infra/
├─ .github/
├─ README.md
├─ LICENSE
└─ package/tooling manifests
```

Only include directories the repository actually needs.

---

# 13. Root Structure Is Not Universal

A single application MAY simply use:

```text
/
├─ src/
├─ tests/
├─ docs/
└─ ...
```

Do not create enterprise-style directory hierarchy for a small project.

---

# 14. Source Directory

Application source SHOULD live under a predictable location such as:

```text
src/
app/
apps/<name>/
```

according to framework conventions.

---

# 15. Framework Conventions

Follow framework-native file layout unless a clear organizational reason justifies deviation.

Custom structure creates onboarding cost.

---

# 16. Domain Structure

Within application code, prefer structure around meaningful:

```text
features
domains
modules
```

over arbitrary technical dumping grounds.

---

# 17. Avoid Generic Dumping Grounds

Directories such as:

```text
helpers/
utils/
misc/
common/
shared/
```

SHOULD NOT become unrestricted locations for unrelated functionality.

---

# 18. Shared Code

Shared code belongs at the narrowest correct scope.

Follow Reusability & Libraries Guidelines.

---

# 19. Repository Metadata

Each active repository SHOULD expose clear metadata for:

```text
owner
description
status
documentation
support
```

through platform/repository files.

---

# 20. README

Every repository SHOULD have a root README.

---

# 21. README Minimum Content

The README SHOULD explain:

```text
purpose
high-level architecture
local setup
common commands
testing
ownership/support
important documentation links
```

---

# 22. README Is an Entry Point

Do not turn the README into a 50,000-word complete engineering manual.

Link detailed documentation.

---

# 23. CONTRIBUTING

Repositories receiving contributions from multiple engineers SHOULD provide contribution guidance.

---

# 24. CONTRIBUTING Scope

Typical content:

```text
setup
branch workflow
testing
PR expectations
commit policy where relevant
code generation
release contribution rules
```

---

# 25. CODEOWNERS

Repositories with meaningful ownership boundaries SHOULD use CODEOWNERS or the platform-equivalent mechanism.

---

# 26. CODEOWNERS Purpose

CODEOWNERS identifies responsible reviewers for areas such as:

```text
/auth
/billing
/database
/infra
/design-system
```

---

# 27. CODEOWNERS Is Not Documentation Alone

Where risk warrants it, repository rules SHOULD require code-owner review.

Otherwise ownership remains advisory.

---

# 28. CODEOWNERS Granularity

Ownership patterns SHOULD reflect meaningful responsibility.

Avoid:

```text
* @cto
```

for every repository unless that is genuinely the operating model.

---

# 29. Team Ownership

Prefer stable teams over individual users for long-lived ownership.

Good:

```text
/apps/billing/ @org/billing-team
```

Less resilient:

```text
/apps/billing/ @alice
```

---

# 30. Multiple Owners

Multiple owners MAY be assigned where ownership legitimately overlaps.

Do not use huge owner lists simply to increase the probability somebody approves.

---

# 31. Sensitive Ownership

Security-sensitive paths SHOULD receive explicit ownership.

Examples:

```text
/.github/
 /infra/
 /auth/
 /permissions/
 /migrations/
```

---

# 32. Protect CODEOWNERS Itself

The ownership configuration itself SHOULD be owned by an appropriate trusted team.

A contributor should not be able to remove required ownership controls casually.

---

# 33. Ownership Must Be Maintained

Stale CODEOWNERS rules are governance defects.

Update them when teams or repository structure change.

---

# 34. Repository Ownership

Every active production repository MUST have an accountable owning team.

Avoid:

```text
nobody really owns this
```

---

# 35. Ownership Includes Operations

Repository ownership SHOULD include responsibility for:

```text
maintenance
dependencies
security fixes
CI
documentation
deprecation
```

not merely feature development.

---

# 36. Branch Strategy

The default strategy SHOULD use:

```text
main
+
short-lived topic branches
+
pull requests
```

for ordinary product development.

---

# 37. Main Branch

`main` SHOULD be the canonical integration branch unless another name is already established.

---

# 38. Main Branch State

`main` SHOULD remain:

```text
green
reviewed
releasable
```

under normal conditions.

---

# 39. Direct Pushes

Ordinary direct pushes to `main` MUST be prohibited for production repositories.

---

# 40. Short-Lived Branches

Topic branches SHOULD generally live for:

```text
hours
or
days
```

rather than weeks.

---

# 41. Long-Lived Branch Cost

Long-lived branches increase:

```text
merge conflicts
integration uncertainty
review size
stale assumptions
```

---

# 42. Release Branches

Long-lived release branches MAY be used only when the release model requires them.

Examples:

```text
supported historical versions
mobile stabilization
desktop releases
on-premise LTS
```

---

# 43. Develop Branch

A permanent `develop` branch SHOULD NOT exist by default.

Use it only if the release process has a concrete need that `main` cannot satisfy.

---

# 44. Environment Branches

Avoid branches such as:

```text
dev
staging
production
```

as the primary environment deployment model.

Environment state belongs to deployment/configuration systems.

---

# 45. Branch ≠ Environment

Do not model:

```text
dev branch
→ development
staging branch
→ staging
main branch
→ production
```

as the default architecture.

This encourages uncontrolled divergence.

---

# 46. Branch Naming

Topic branches SHOULD use a predictable convention.

Recommended:

```text
<type>/<short-description>
```

---

# 47. Branch Types

Common prefixes MAY include:

```text
feat/
fix/
refactor/
chore/
docs/
test/
perf/
security/
```

---

# 48. Branch Naming Example

Good:

```text
feat/project-export
fix/oauth-callback-state
refactor/billing-invoice-service
```

---

# 49. Branch Name Case

Use lowercase branch names.

---

# 50. Branch Word Separator

Use hyphens for branch-description words.

Prefer:

```text
fix/payment-timeout
```

over:

```text
fix/payment_timeout
fix/PaymentTimeout
```

---

# 51. Ticket IDs

Issue IDs MAY be included.

Example:

```text
fix/APP-142-payment-timeout
```

Do not make branch names unreadable merely to encode metadata available elsewhere.

---

# 52. Personal Names

Avoid requiring:

```text
alice/feature-x
```

as a universal branch convention.

The Git host already records branch authorship.

---

# 53. Branch Name Length

Keep branch names concise but descriptive.

---

# 54. Sensitive Branch Names

Do not include:

```text
customer PII
security secrets
confidential incident details
```

in branch names.

Branch names often propagate into CI systems and logs.

---

# 55. Delete Merged Branches

Merged short-lived branches SHOULD be deleted automatically where practical.

---

# 56. Stale Branches

Repositories SHOULD periodically remove abandoned branches.

---

# 57. Protected Branches

Important branches MUST be protected through repository rules.

---

# 58. Minimum Main Protection

The default branch SHOULD require:

```text
pull request
required status checks
required review
conversation resolution
restricted force push
restricted deletion
```

according to repository risk.

---

# 59. No Force Push to Main

Force pushes to the canonical protected branch MUST normally be prohibited.

---

# 60. No Main Deletion

The default branch MUST NOT be deletable through ordinary contributor permissions.

---

# 61. Protection Applies to Administrators

High-assurance repositories SHOULD avoid broad administrator bypass.

Important rules should apply to privileged users unless the emergency governance model explicitly allows otherwise.

---

# 62. Bypass Is Privileged

Branch-protection bypass capability is equivalent to a privileged production change path.

It MUST be:

```text
restricted
auditable
rare
```

---

# 63. Required Pull Request

Protected production branches SHOULD require pull requests before merge.

---

# 64. Required Reviews

At least one qualified review SHOULD be required for substantive production repositories.

Additional review may be required by risk.

---

# 65. Code Owner Review

Changes to critical owned areas SHOULD require code-owner approval.

---

# 66. Stale Approvals

If substantive code changes after approval, the repository SHOULD require renewed review according to risk.

---

# 67. Latest Push Approval

High-risk repositories SHOULD ensure the latest reviewable revision has independent approval.

---

# 68. Required Status Checks

Protected branches MUST require relevant CI checks.

---

# 69. Check Identity

Required check names SHOULD be stable and unambiguous.

Do not create multiple unrelated workflow jobs with indistinguishable names.

---

# 70. Merge Queue

High-change repositories SHOULD consider merge queues to verify each candidate against the current integration branch.

---

# 71. Signed Commits

Cryptographically signed commits MAY be required for high-assurance repositories.

Do not mandate signing merely as theater if identity assurance is already provided through stronger repository/platform controls.

---

# 72. Signed Tags

Release tags for distributed or high-assurance software SHOULD be signed or otherwise covered by verifiable release attestation where organizational policy requires it.

---

# 73. Linear History

Linear history MAY be required if it materially improves repository workflow.

It is not inherently more secure than a reviewed non-linear history.

---

# 74. Pull Request Philosophy

A PR is the canonical unit of:

```text
review
discussion
verification
change context
```

for ordinary code changes.

---

# 75. PR Scope

A PR SHOULD solve one coherent change.

---

# 76. PR Size Philosophy

There is no universal maximum line count.

The standard is:

> **A qualified reviewer should be able to understand the change accurately without reconstructing multiple unrelated projects at once.**

---

# 77. Prefer Small PRs

Small PRs improve:

```text
review quality
integration speed
rollback reasoning
merge safety
```

---

# 78. Large PR Exception

Large PRs may be justified for:

```text
mechanical migration
generated change
framework upgrade
repository restructure
```

but SHOULD isolate behavioral change where possible.

---

# 79. Mechanical vs Behavioral Change

Prefer:

```text
PR 1 — mechanical rename
PR 2 — behavioral modification
```

over mixing both extensively.

---

# 80. PR Description

Substantial PRs SHOULD explain:

```text
What changed?
Why?
How verified?
Risks?
Migration?
Screenshots where UI?
Operational considerations?
```

---

# 81. PR Template

Repositories MAY provide a PR template for recurring important questions.

---

# 82. PR Template Must Remain Useful

Avoid a 40-checkbox template developers mechanically ignore.

---

# 83. Draft PR

Use draft PRs for work not yet ready to merge.

Draft status does not replace branch protection.

---

# 84. Review Comments

Important unresolved review comments MUST be resolved before merge.

---

# 85. Review Conversation Resolution

Repository protection SHOULD require meaningful conversations to be resolved.

---

# 86. Resolve Does Not Mean Ignore

Do not mark concerns resolved without addressing or explicitly agreeing on the outcome.

---

# 87. Author Responsibility

The PR author owns:

```text
clarity
tests
documentation
review responses
scope control
```

---

# 88. Reviewer Responsibility

Reviewers own:

```text
correctness
risk identification
architecture consistency
security awareness
maintainability
```

within their competence.

---

# 89. Approval Is Not Formatting Review

A reviewer should understand the behavior being approved.

---

# 90. AI-Generated PRs

AI-generated code receives the same or stronger review expectations as human-authored code.

Generated volume is not a reason to lower review quality.

---

# 91. Commits

A commit SHOULD represent one coherent logical change.

---

# 92. Atomic Commits

Prefer commits that can be understood independently.

Example:

```text
Add invoice status validator
```

rather than:

```text
stuff
```

---

# 93. Commit Is Not Necessarily Deploy Unit

A commit can be smaller than a releasable feature.

Do not force every commit to be independently feature-complete.

---

# 94. Commit Message Purpose

A commit message should explain:

```text
what changed
and preferably why
```

when the change is not self-evident.

---

# 95. Commit Convention

The organization SHOULD use one consistent commit convention.

A practical default is Conventional-Commit-style structure:

```text
type(scope): summary
```

where useful.

---

# 96. Canonical Commit Types

Recommended types:

```text
feat
fix
refactor
perf
test
docs
build
ci
chore
revert
```

---

# 97. Security Type

`security` MAY be used if the organization finds it operationally useful.

Otherwise security fixes may remain `fix` with appropriate metadata.

---

# 98. Commit Example

```text
fix(auth): reject expired recovery tokens
```

---

# 99. Commit Subject

Commit subjects SHOULD be:

```text
concise
imperative or consistent factual style
specific
```

---

# 100. Bad Commit Messages

Avoid:

```text
update
fix
changes
wip
stuff
final
final-final
```

on shared history.

---

# 101. WIP Commits

Temporary local WIP commits are acceptable during development.

They MAY be squashed before merge according to repository strategy.

---

# 102. Commit Body

Use a body when context matters.

Explain:

```text
why
tradeoff
migration implication
```

rather than narrating every changed line.

---

# 103. Issue References

Commit or PR metadata MAY reference issues.

Do not make issue trackers the only place where critical repository reasoning exists.

---

# 104. Breaking Changes

Libraries/public contracts SHOULD identify breaking changes explicitly.

---

# 105. Commit Convention ≠ Release Policy

Conventional commits can assist automation, but they do not replace intentional versioning/release governance.

---

# 106. Commit Author Identity

Commits MUST use attributable identities for organizational work.

Avoid shared authorship identities.

---

# 107. Email Privacy

Developer commit email configuration SHOULD follow organizational privacy/account policy.

---

# 108. Commit Timestamps

Do not rely on commit timestamps as authoritative business/audit time.

Git history is source-control history, not a compliance ledger.

---

# 109. History Integrity

Merged/released shared history SHOULD remain stable.

---

# 110. Rewrite Before Merge

Topic branch history MAY be rewritten before merge when it improves review/history.

---

# 111. Rewrite After Merge

Do not rewrite public default/release branch history casually.

---

# 112. Force Push Topic Branch

Force push MAY be acceptable on a developer-owned topic branch.

Prefer:

```text
--force-with-lease
```

over uncontrolled force when possible.

---

# 113. Force-With-Lease

`--force-with-lease` reduces the risk of overwriting someone else's unexpected updates.

---

# 114. Shared Branches

Do not rewrite branches actively shared by multiple developers without coordination.

---

# 115. Revert

Use a new revert commit to undo released/shared changes where possible.

---

# 116. Do Not Delete Evidence

If a defective commit reached shared history, normally:

```text
revert it
```

rather than erasing it.

---

# 117. Secret Exception

A leaked secret may require history cleanup, but secret rotation is still mandatory.

History rewriting alone does not make the secret safe again.

---

# 118. Generated Files

Generated files MUST be classified deliberately.

---

# 119. Generated File Decision

A generated file SHOULD be committed only when committing it provides meaningful value.

---

# 120. Good Reasons to Commit Generated Files

Examples:

```text
consumer requires generated artifact directly
build tool unavailable to consumer
generated API clients are reviewed/versioned
migration snapshot is authoritative
```

---

# 121. Good Reasons Not to Commit Generated Files

Do not commit if the file can be generated deterministically during:

```text
build
install
test
```

and repository storage provides no useful benefit.

---

# 122. Generated Files Must Be Reproducible

Committed generated files SHOULD be reproducible from committed source and pinned tooling.

---

# 123. Generated File Marker

Generated files SHOULD include a marker such as:

```text
DO NOT EDIT — generated from ...
```

where the file format permits.

---

# 124. Generated File Source

Documentation SHOULD identify the source and regeneration command.

---

# 125. Generated File Review

Review the source change primarily.

Large generated diffs SHOULD NOT obscure the actual behavioral change.

---

# 126. Generated Diff Configuration

Git platform settings MAY mark generated files to reduce review noise.

---

# 127. Generated Files in Separate Commit

Large generated output MAY be placed in a separate commit when that materially improves review.

---

# 128. Generated Drift

CI SHOULD verify committed generated output is synchronized with its source where drift would cause defects.

---

# 129. Never Hand-Edit Generated Files

Do not manually patch generated output unless the generation architecture explicitly permits it.

Fix the source/generator.

---

# 130. Generated Secrets

Generators MUST NOT produce committed secret material.

---

# 131. Build Outputs

Typical outputs such as:

```text
dist/
build/
.next/
coverage/
```

SHOULD NOT be committed unless the repository/distribution model explicitly requires it.

---

# 132. Binary Build Artifacts

Released binaries belong in an artifact/package registry, not ordinary Git history.

---

# 133. Large Binary Files

Avoid committing large binary assets directly to ordinary Git history.

---

# 134. Git LFS

Git LFS MAY be used for necessary large binary assets where repository/tooling support it.

---

# 135. LFS Is Not Artifact Registry

Do not use LFS as a substitute for a proper release artifact repository.

---

# 136. Design Assets

Large design/media source assets SHOULD live in a repository only if source-control/versioning needs justify it.

---

# 137. Generated Documentation

Generated API/reference documentation MAY be committed only when publishing architecture requires it.

Prefer generating during docs build when practical.

---

# 138. Lockfiles

Applications MUST commit dependency lockfiles when the package ecosystem provides them.

---

# 139. Lockfile Purpose

Lockfiles provide reproducible resolution of:

```text
direct dependencies
transitive dependencies
integrity metadata
```

depending on ecosystem.

---

# 140. One Package Manager

A repository SHOULD have one authoritative package manager per ecosystem/workspace.

Avoid:

```text
package-lock.json
yarn.lock
pnpm-lock.yaml
```

all active simultaneously for the same dependency graph.

---

# 141. Lockfile Conflict

Multiple competing lockfiles are a configuration defect.

Remove obsolete ones.

---

# 142. Lockfile Updates

Lockfile changes MUST be reviewed as part of dependency changes.

---

# 143. Unexpected Lockfile Change

A feature PR that unexpectedly changes hundreds of unrelated dependency resolutions requires investigation.

---

# 144. Frozen Install

CI SHOULD use the package manager's frozen/immutable lockfile mode.

---

# 145. CI Must Not Repair Lockfile

If manifest and lockfile disagree:

```text
CI should fail
```

rather than silently rewriting the lockfile.

---

# 146. Application vs Library Lockfiles

Whether published libraries commit/use lockfiles for consumer dependency semantics may vary by ecosystem.

Repository development itself SHOULD still have reproducible dependency resolution.

---

# 147. Lockfile Security

Lockfiles are security-relevant.

Review changes to:

```text
source URL
integrity hash
unexpected package
version jump
```

where tooling exposes them.

---

# 148. Dependency Update Isolation

Large dependency upgrades SHOULD be separated from unrelated feature changes where practical.

---

# 149. Automated Dependency PRs

Automated update bots MAY create dependency PRs.

They still require tests and policy.

---

# 150. Git Ignore

Every repository SHOULD maintain appropriate `.gitignore` rules.

---

# 151. `.gitignore` Purpose

Ignore:

```text
local build outputs
dependency directories
editor state
temporary files
local secrets
```

as applicable.

---

# 152. `.gitignore` Is Not Security

Ignoring a secret file prevents accidental addition only if it has not already been tracked.

It does not secure the file.

---

# 153. Global vs Repository Ignore

Machine-specific editor/temp patterns MAY live in a developer's global Git ignore rather than cluttering every repository.

Repository-required exclusions belong in `.gitignore`.

---

# 154. Ignore Specificity

Avoid overbroad rules that hide legitimate source files.

Bad:

```text
*.json
```

without a very specific reason.

---

# 155. `.gitattributes`

Repositories SHOULD use `.gitattributes` where necessary to normalize:

```text
line endings
diff behavior
linguist classification
binary treatment
merge drivers
```

---

# 156. Line Ending Policy

Text files SHOULD use a canonical line-ending policy.

Typically:

```text
LF
```

for cross-platform software repositories unless platform requirements dictate otherwise.

---

# 157. Do Not Normalize Binaries

Git attributes SHOULD correctly classify binary files to prevent destructive line-ending transformation.

---

# 158. End-of-File

Text files SHOULD conventionally end with a newline unless file format rules say otherwise.

---

# 159. Encoding

Use:

```text
UTF-8
```

as the default text encoding unless a file format requires something else.

---

# 160. EditorConfig

Repositories SHOULD use `.editorconfig` or equivalent when multiple tools/editors need consistent basic formatting.

---

# 161. Formatting

Formatting SHOULD be automated through canonical tooling.

Do not conduct repetitive style debates in review.

---

# 162. Generated Formatting

Generated files SHOULD be formatted by the generator, not by unrelated manual formatter steps that cause unstable diffs.

---

# 163. File Naming

Repository file naming SHOULD follow language/framework conventions consistently.

---

# 164. Case Sensitivity

Avoid filenames differing only by case.

Example:

```text
User.ts
user.ts
```

can break on case-insensitive filesystems.

---

# 165. Rename Case Carefully

Case-only renames require care across operating systems and CI.

---

# 166. Spaces in Technical Filenames

Avoid spaces in source/config/script filenames unless the surrounding ecosystem convention expects them.

---

# 167. Scripts

Repository scripts SHOULD have clear purpose and ownership.

---

# 168. Script Location

Common scripts SHOULD live under:

```text
scripts/
tooling/
```

or the ecosystem-native location.

---

# 169. One-Off Scripts

Consequential data/migration/repair scripts SHOULD be version-controlled when they affect production or repeatable operations.

---

# 170. Shell Scripts

Shell scripts SHOULD use robust error handling and portability appropriate to supported environments.

---

# 171. Executable Bit

Executable scripts SHOULD have correct Git executable permissions.

---

# 172. Repository Secrets

Secrets MUST NOT be committed.

This includes:

```text
.env
credentials
private keys
API tokens
database dumps containing credentials
```

---

# 173. Secret Scanning

Production repositories SHOULD use secret scanning where tooling permits.

---

# 174. Secret Found in Git

If a secret is committed:

```text
revoke/rotate first
```

then remediate repository history if necessary.

---

# 175. History Removal Is Secondary

Deleting the secret from the repository does not invalidate copies already cloned or cached.

---

# 176. Sensitive Test Fixtures

Do not commit real production PII into fixtures.

---

# 177. Example Credentials

Example configuration MUST use clearly nonfunctional placeholders.

---

# 178. License File

Repositories intended for external distribution SHOULD include an explicit license.

---

# 179. Internal Repository Licensing

Internal proprietary repositories SHOULD follow organizational IP/licensing policy.

Do not copy external source without preserving applicable licensing obligations.

---

# 180. Third-Party Notices

Vendored or distributed dependencies requiring attribution SHOULD have appropriate notices according to OSS governance.

---

# 181. Vendored Code

Vendored external source MUST be deliberate and documented.

---

# 182. Vendored Metadata

Record:

```text
upstream
version/commit
license
local modifications
update method
```

where practical.

---

# 183. Do Not Casually Edit Vendored Code

Local modifications should be clearly separable from upstream.

---

# 184. Vendor Update

Vendored code requires an explicit update mechanism.

Otherwise it becomes an abandoned fork.

---

# 185. Submodules

Git submodules MAY be used when their tradeoffs are understood.

They SHOULD NOT be the default solution for sharing ordinary internal libraries.

---

# 186. Submodule Cost

Submodules introduce:

```text
extra checkout state
version coordination
developer friction
CI complexity
```

---

# 187. Subtrees

Git subtree approaches MAY be useful for selected vendor/import workflows.

Document ownership and synchronization strategy.

---

# 188. Symlinks

Use repository symlinks only when supported reliably across target operating systems/tooling.

---

# 189. Monorepo Definition

A monorepo contains multiple independently meaningful applications/packages in one repository.

---

# 190. Monorepo Is Not One Application With Many Folders

A normal modular application is not necessarily a monorepo.

---

# 191. Monorepo Benefits

Potential benefits include:

```text
atomic cross-package changes
shared tooling
consistent dependency policy
discoverability
refactoring
```

---

# 192. Monorepo Costs

Potential costs include:

```text
CI scale
repository size
ownership complexity
dependency leakage
tooling requirements
```

---

# 193. Monorepo Adoption

Use a monorepo when:

```text
shared ownership
cross-cutting changes
common tooling
dependency coordination
```

justify it.

---

# 194. Monorepo Root

A canonical TypeScript-style monorepo MAY use:

```text
/
├─ apps/
│  ├─ web/
│  └─ admin/
├─ packages/
│  ├─ design-system/
│  ├─ domain/
│  └─ tooling/
├─ docs/
└─ ...
```

---

# 195. Apps Directory

`apps/` contains independently runnable/deployable applications.

---

# 196. Packages Directory

`packages/` contains reusable modules/libraries/tooling.

---

# 197. Package Boundaries

Every package SHOULD have a coherent responsibility.

---

# 198. Package Public API

Packages SHOULD expose intentional public entry points.

Do not encourage deep imports into arbitrary internals.

---

# 199. Deep Imports

Avoid:

```text
@org/billing/src/internal/helpers/x
```

from unrelated packages.

Use declared public interfaces.

---

# 200. Monorepo Dependency Direction

Dependencies MUST follow Architecture/Reusability rules.

A monorepo does not make every folder allowed to import every other folder.

---

# 201. Dependency Graph

The monorepo SHOULD have an understandable dependency graph.

Cycles SHOULD be prevented where architecture prohibits them.

---

# 202. Cross-App Imports

Applications SHOULD NOT import private implementation directly from another app.

Promote shared logic into a package/domain module.

---

# 203. Package Ownership

Important monorepo packages SHOULD have explicit CODEOWNERS.

---

# 204. Affected Builds

Monorepo tooling SHOULD execute affected:

```text
builds
tests
lint
```

when this is reliable.

---

# 205. Affected Does Not Mean Unsafe Skipping

Dependency graph calculation must be trustworthy.

Critical global checks MAY still run across the repository.

---

# 206. Shared Lockfile

A monorepo SHOULD normally use the workspace/package manager's canonical shared lockfile unless architecture requires otherwise.

---

# 207. Multiple Package Managers

Do not operate different package managers inside one language workspace without a strong reason.

---

# 208. Root Tool Versions

Shared tool versions SHOULD generally be centralized.

Examples:

```text
TypeScript
formatter
linter
test runner
```

---

# 209. Package-Specific Dependencies

Do not move every dependency to the repository root merely because the tool allows it.

A package should declare what it consumes.

---

# 210. Phantom Dependencies

Monorepo tooling SHOULD prevent packages from importing dependencies they did not declare.

---

# 211. Dependency Hoisting

Do not rely on accidental hoisting for correctness.

---

# 212. Versioning Monorepo Packages

Monorepos MAY use:

```text
fixed/lockstep versioning
independent package versioning
```

depending on distribution semantics.

---

# 213. Fixed Versioning

Use one version across packages when they are released as a coordinated product family.

---

# 214. Independent Versioning

Use independent versions when packages have truly independent consumers/lifecycle.

---

# 215. Private Packages

Private workspace packages that are never independently released do not require artificial public-style SemVer merely for internal use.

---

# 216. Monorepo Release Tooling

Release tooling SHOULD understand:

```text
affected packages
dependency relationships
version propagation
changelog generation
```

where packages are independently published.

---

# 217. Monorepo CODEOWNERS

Ownership SHOULD map to:

```text
apps
packages
infra
platform tooling
```

rather than requiring one team for the entire repository.

---

# 218. Monorepo CI Isolation

One failing unrelated package SHOULD not necessarily prevent every unrelated preview workflow where organizational policy permits independent operation.

Production integration rules remain authoritative.

---

# 219. Monorepo Security Boundaries

A monorepo is not a strong access-control boundary.

If teams must not be able to read certain source code, separate repositories/access controls may be necessary.

---

# 220. Monorepo Secret Boundary

Never place secrets in repository subfolders assuming only one team will see them.

---

# 221. Multi-Repo Architecture

Multiple repositories are appropriate when systems require strong independent:

```text
access
ownership
release
lifecycle
```

boundaries.

---

# 222. Cross-Repo Contracts

Cross-repository dependencies SHOULD use explicit:

```text
package
API
event
schema
artifact
```

contracts.

---

# 223. Do Not Git-Clone Source as Dependency

Applications SHOULD NOT normally depend on another repo through arbitrary source checkout during production build.

Use versioned artifacts/packages when appropriate.

---

# 224. Cross-Repo Atomic Change

If every feature requires simultaneous commits to five repositories, review repository/architecture boundaries.

---

# 225. Repository Template

Organizations MAY provide canonical repository templates.

---

# 226. Template Contents

Useful defaults include:

```text
README
CODEOWNERS
.gitignore
.gitattributes
CI
security settings
dependency automation
```

---

# 227. Template Is a Starting Point

Do not copy obsolete template configuration forever.

Repositories remain responsible for updates.

---

# 228. Repository Bootstrap

New repositories SHOULD be created through an approved workflow where organizational maturity supports it.

---

# 229. Repository Naming

Repository names SHOULD be:

```text
lowercase
concise
stable
descriptive
```

---

# 230. Repository Name Example

Prefer:

```text
billing-api
design-system
customer-portal
```

---

# 231. Avoid Organizational Noise

Avoid names such as:

```text
new-app
final-api
backend-v2-new
john-project
```

---

# 232. Version in Repository Name

Do not normally include:

```text
-v2
-v3
```

unless it represents a genuinely separate long-lived product generation.

Versioning belongs in releases/contracts.

---

# 233. Repository Rename

Repository renames require review of:

```text
CI
package references
documentation
deployments
webhooks
CODEOWNERS
```

---

# 234. Archive Repositories

Repositories no longer actively maintained SHOULD be archived when appropriate.

---

# 235. Archive Conditions

Before archiving:

```text
confirm replacement
document status
disable unnecessary credentials
update dependency consumers
```

---

# 236. Archived Repository README

The README SHOULD state:

```text
archived
replacement
last supported version
```

where relevant.

---

# 237. Repository Deletion

Deletion requires deliberate approval.

Git repositories may contain important:

```text
history
IP
release evidence
security context
```

---

# 238. Repository Visibility

Choose:

```text
private
internal
public
```

according to IP, security, and contribution needs.

---

# 239. Public Repository Review

Before making a repository public, review:

```text
history
secrets
internal URLs
PII
licenses
proprietary assets
```

---

# 240. Making Current Tree Clean Is Not Enough

A secret removed from the latest commit may remain in prior Git history.

Review history where exposure risk exists.

---

# 241. Fork Policy

Organizational repositories SHOULD define whether:

```text
internal forks
public forks
external contribution forks
```

are permitted.

---

# 242. Fork Secrets

Fork-based workflows MUST NOT receive organization secrets automatically.

---

# 243. Issue Templates

Repositories MAY provide issue templates for:

```text
bugs
features
security-safe reports
```

where useful.

---

# 244. Security Reports

Sensitive security vulnerabilities SHOULD use a private disclosure mechanism rather than public issues.

---

# 245. Repository Discussions

Use repository Discussions/issues only when they fit project governance.

Do not scatter architectural decisions across unsearchable informal comments without durable documentation.

---

# 246. Tags

Git tags name specific repository objects, normally release commits.

---

# 247. Release Tags

Released versions SHOULD use immutable tags.

---

# 248. Tag Naming

Versioned releases SHOULD use a consistent format.

Recommended:

```text
v1.4.2
```

when SemVer is applicable.

---

# 249. `v` Prefix

The organization MAY choose:

```text
v1.2.3
```

or:

```text
1.2.3
```

but MUST remain consistent within a project.

---

# 250. Semantic Versioning

Public libraries/SDKs/packages SHOULD use Semantic Versioning where their compatibility model fits:

```text
MAJOR.MINOR.PATCH
```

---

# 251. SemVer Meaning

Conceptually:

```text
MAJOR
→ incompatible public contract change

MINOR
→ backward-compatible functionality

PATCH
→ backward-compatible fix
```

---

# 252. SemVer Requires Defined Public API

Semantic Versioning is meaningful only when the package has a defined public API/contract.

---

# 253. SaaS Release Tags

Continuously deployed applications MAY use:

```text
build ID
date-based release
commit-based release
internal version
```

instead of artificial SemVer.

---

# 254. Release Tag Target

A release tag MUST point to the exact source revision corresponding to the release.

---

# 255. Annotated Tags

Official release tags SHOULD generally be annotated rather than lightweight.

---

# 256. Signed Release Tags

Cryptographic signing SHOULD be used where release-integrity requirements justify it.

Artifact provenance/signing under CI/CD may provide stronger or complementary guarantees.

---

# 257. Lightweight Tags

Lightweight tags MAY be used for temporary/local markers.

They SHOULD NOT be the default for formal releases.

---

# 258. Do Not Move Release Tags

Once a release tag is published:

```text
do not repoint it
```

to different source.

---

# 259. Bad Release Correction

If a tagged release is defective:

```text
release a new version
```

instead of silently moving the old tag.

---

# 260. Tag Deletion

Published release tags SHOULD NOT be deleted casually.

---

# 261. Tag Protection

Release tag patterns SHOULD be protected where repository tooling supports it.

---

# 262. Tag Creator

Release tags SHOULD be created by:

```text
trusted release automation
or
authorized release maintainers
```

---

# 263. Tag vs Artifact

A Git tag identifies source history.

It does not by itself prove:

```text
which binary was built
which builder built it
```

CI/CD provenance provides that additional linkage.

---

# 264. Release Object Relationship

Canonical relationship:

```text
Git tag
↓
source commit
↓
trusted build
↓
artifact digest
↓
provenance
```

---

# 265. Release Notes

Formal tags SHOULD link to or contain appropriate release notes when the product requires them.

---

# 266. Pre-Releases

SemVer-compatible pre-release forms MAY be used:

```text
v2.0.0-alpha.1
v2.0.0-beta.2
v2.0.0-rc.1
```

where meaningful.

---

# 267. Build Metadata

SemVer build metadata MAY be used when ecosystem/tooling supports it.

Do not rely on it for precedence semantics.

---

# 268. Date Tags

Date-based tags MAY be appropriate for internal deployments.

Example:

```text
2026.09.23
```

only if the organization defines their meaning.

---

# 269. Environment Tags

Avoid mutable Git tags such as:

```text
production
staging
latest
```

as authoritative release identity.

Deployment state belongs in deployment systems.

---

# 270. Git Notes

Git notes MAY attach metadata without altering commits, but SHOULD NOT become a hidden critical governance system unless tooling explicitly supports them.

---

# 271. Changelog

Versioned distributed software SHOULD maintain a changelog/release history appropriate to its users.

---

# 272. Generated Changelog

Automated changelog generation MAY use PR/commit metadata.

Human review SHOULD ensure user-relevant clarity.

---

# 273. Repository Access

Repository access MUST follow least privilege.

---

# 274. Read vs Write

Not every engineer who can read a repository needs write access.

---

# 275. Admin Access

Repository administrator rights SHOULD be limited.

---

# 276. Repository Bots

Bots/apps SHOULD receive only required repository permissions.

---

# 277. Personal Access Tokens

Automation SHOULD prefer:

```text
GitHub App
workload identity
fine-grained token
```

over long-lived broad personal tokens where supported.

---

# 278. Token Scope

Repository automation tokens MUST use minimum required permissions.

---

# 279. Shared Tokens

Avoid one broad token shared by many unrelated repositories.

---

# 280. SSH Keys

Machine/deploy SSH keys SHOULD have narrow scope and ownership.

---

# 281. Deploy Keys

Deploy keys MAY be used for narrow repository access where appropriate.

Write-enabled deploy keys require stronger justification.

---

# 282. Offboarding

User repository access MUST be removed promptly when no longer required.

---

# 283. Dormant Collaborators

Repository access SHOULD be periodically reviewed for sensitive projects.

---

# 284. Public Contribution

Public repositories SHOULD document contribution and conduct/security reporting expectations.

---

# 285. External Contributions

External contributors MUST NOT gain access to internal secrets or privileged CI merely because a PR executes.

---

# 286. Generated PRs

Bots creating automated PRs SHOULD clearly identify:

```text
what generated the change
why
scope
```

---

# 287. Renovation Bots

Dependency/configuration bots SHOULD group changes only where grouping preserves reviewability.

---

# 288. Bot Auto-Merge

Low-risk automated updates MAY auto-merge only when policy defines:

```text
allowed update type
tests
security
ownership
rollback
```

---

# 289. No Blind Auto-Merge

Do not automatically merge arbitrary dependency major versions because tests are green.

---

# 290. Repository Size

Repository size SHOULD be monitored if clone/fetch performance materially affects developers or CI.

---

# 291. Git History Bloat

Large binary files remain in history even after deletion from the current tree.

Prevent accidental bloat before it occurs.

---

# 292. Large File Guard

Repositories MAY reject files above an appropriate threshold unless explicitly permitted.

---

# 293. Sparse Checkout

Large monorepos MAY use sparse checkout where developer workflows benefit.

---

# 294. Partial Clone

Large repositories MAY use partial clone techniques where supported.

---

# 295. Shallow Clone

CI MAY use shallow clones if:

```text
versioning
changelog
provenance
tests
```

do not require deeper history.

---

# 296. Do Not Break Release Logic

If release tooling needs tags/history, CI checkout depth must include them.

---

# 297. Subdirectory Ownership

Directory ownership SHOULD correspond to actual architecture rather than historical organizational accidents.

---

# 298. Move With Ownership

When responsibility changes between teams:

```text
CODEOWNERS
documentation
service catalog
```

must be updated.

---

# 299. Repository Health

Repositories SHOULD periodically review:

```text
stale branches
stale owners
dependency alerts
broken CI
obsolete docs
archived code
```

---

# 300. Repository Health Is Maintenance

Do not let repositories decay until the next incident.

---

# 301. Repository Migration

Repository moves/splits/merges SHOULD preserve meaningful history where practical.

---

# 302. Splitting Repositories

Split only when:

```text
ownership
access
release
scale
```

benefits exceed coordination costs.

---

# 303. Preserve Attribution

Repository migration SHOULD preserve authorship/history where useful for:

```text
debugging
licensing
IP
```

---

# 304. Repository Merge

When merging repositories into a monorepo, normalize:

```text
tooling
ownership
lockfiles
CI
directory structure
```

rather than merely nesting old repos.

---

# 305. Legacy `.git` Directories

Do not leave nested accidental `.git` repositories after migrations unless submodules are intentional.

---

# 306. Case of Generated Vendor Directories

Dependency folders such as:

```text
node_modules/
vendor cache/
virtual environments/
```

SHOULD NOT be committed merely for convenience unless ecosystem/distribution requirements explicitly call for vendoring.

---

# 307. Language-Specific Build Metadata

Repository conventions MAY differ by ecosystem.

Examples:

```text
Cargo.lock
go.sum
poetry.lock
pnpm-lock.yaml
```

Follow ecosystem and application/library semantics while retaining reproducibility.

---

# 308. Repository-Level Configuration

Keep canonical repository tooling configuration near the root when shared globally.

Examples:

```text
formatter
lint
TypeScript
test
workspace
```

---

# 309. Feature-Level Tool Config

Avoid duplicating nearly identical lint/test configs in every package.

Use shared configuration where semantics are genuinely common.

---

# 310. Central Config Escape Hatch

Packages MAY override central configuration when technical requirements differ.

Overrides should remain explicit.

---

# 311. Hidden Build Inputs

Repositories MUST NOT depend on undocumented files outside Git for normal build/test operation, except declared secrets/environment configuration.

---

# 312. Reproducible Checkout

A fresh authorized clone plus documented dependencies/config should be enough to establish development.

---

# 313. Bootstrap Command

Repositories SHOULD expose a documented bootstrap/setup process.

---

# 314. Make/Common Command Surface

Repositories MAY provide canonical commands such as:

```text
dev
build
test
lint
format
typecheck
```

through the ecosystem-native task runner.

---

# 315. Command Naming

Shared repositories SHOULD standardize common command names where practical.

---

# 316. Local vs CI Commands

CI SHOULD run the same underlying verification logic available locally.

Do not create an entirely separate hidden CI-only test path without reason.

---

# 317. Repositories as Documentation

Directory naming and module boundaries are architectural communication.

Choose names deliberately.

---

# 318. Comments vs History

Git history SHOULD NOT be used as the only documentation for non-obvious invariants.

Critical current rationale belongs in:

```text
code
ADR
documentation
```

---

# 319. Dead Code

Remove obsolete code.

Do not keep commented-out implementations because:

```text
we might need it later
```

Git already preserves history.

---

# 320. Commented-Out Code

Commented-out blocks SHOULD normally be deleted.

---

# 321. Backup Files

Do not commit:

```text
file.old
file.bak
file-copy
component-final2
```

Git itself provides version history.

---

# 322. Temporary Experiments

Experimental code MAY live on topic branches or guarded experimental modules.

Do not indefinitely accumulate abandoned experiments on `main`.

---

# 323. Feature Flags and Dead Branches

After a feature flag becomes permanent, remove obsolete branch code according to Feature Flag Guidelines.

---

# 324. Repository Searchability

Use stable terminology and filenames so engineers can search for concepts effectively.

---

# 325. Naming Consistency

One concept SHOULD use one canonical name across:

```text
folder
package
code
documentation
```

where practical.

---

# 326. Case of Renames

When domain terminology changes materially, update source/documentation coherently rather than introducing permanent aliases casually.

---

# 327. Generated API Clients

Generated clients SHOULD have a clear ownership/update strategy.

Options:

```text
generated at build
committed generated package
separately published artifact
```

must be explicit.

---

# 328. Schema-First Artifacts

If generated code derives from:

```text
OpenAPI
protobuf
GraphQL schema
```

the canonical source schema MUST be clear.

---

# 329. Do Not Edit Both Source and Generated Contract Independently

There must be one authoritative source.

---

# 330. Database Migrations

Migration files belong in Git.

They are immutable historical deployment artifacts after production use.

---

# 331. Do Not Rewrite Applied Migrations

Once a migration has run in shared/production environments:

```text
create a new migration
```

rather than modifying historical migration semantics.

---

# 332. Migration Ordering

Migration naming/order MUST be deterministic according to the database migration framework.

---

# 333. Migration Ownership

CODEOWNERS MAY protect schema/migration directories.

---

# 334. Infrastructure Code

IaC belongs in version control and SHOULD be protected according to blast radius.

---

# 335. Repository Separation for Infrastructure

Infrastructure MAY live:

```text
with application
or
separate platform repo
```

depending on ownership and deployment architecture.

There is no universal requirement.

---

# 336. Security Configuration

Files controlling:

```text
CI permissions
branch rules
dependency policy
security scanning
```

are security-sensitive repository assets.

---

# 337. Ownership of `.github`

The `.github/` directory SHOULD have explicit trusted ownership in important repositories.

---

# 338. Ownership of CI Workflows

CI/CD workflow files SHOULD require platform/security-aware review where they grant privileged permissions.

---

# 339. Repository Rules as Code

Where hosting platforms provide centrally managed rulesets or policy automation, organizations SHOULD use them for consistent governance across repositories.

---

# 340. Repository Policy Centralization

Critical baseline rules SHOULD not depend on every team remembering to configure them manually.

---

# 341. Exceptions

Repositories requiring weaker/different policy SHOULD document the exception centrally.

---

# 342. Policy Drift

Organizations SHOULD detect repositories lacking required:

```text
branch protection
CODEOWNERS
CI
security scanning
```

where applicable.

---

# 343. Repository Review Checklist

Before approving a new repository:

```text
□ Purpose clear
□ Owner assigned
□ Visibility correct
□ README present
□ License/IP status clear
□ Branch protection configured
□ CODEOWNERS configured
□ CI configured
□ Secrets policy configured
□ Dependency management configured
□ Archive/deprecation path understood
```

---

# 344. Branch Checklist

```text
□ Short-lived
□ Lowercase
□ Descriptive
□ No secrets/PII
□ Correct type prefix
□ Up to date enough for merge
□ Delete after merge
```

---

# 345. Commit Checklist

```text
□ Coherent logical change
□ Meaningful message
□ Attributable author
□ No secrets
□ No accidental generated/build files
□ Relevant tests included
```

---

# 346. Pull Request Checklist

```text
□ One coherent goal
□ Reviewable scope
□ Description explains why
□ Tests updated
□ Required CI passes
□ Owners requested
□ Migration impact reviewed
□ Dependency changes intentional
□ Generated diffs explained
□ Security/config impact reviewed
□ No unresolved blocking comments
```

---

# 347. CODEOWNERS Checklist

```text
□ Critical paths covered
□ Stable teams preferred
□ Teams have required access
□ File itself protected
□ Ownership reflects current org
□ Required reviews enabled where risk warrants
```

---

# 348. Protected Branch Checklist

```text
□ Pull request required
□ Review required
□ Status checks required
□ Conversation resolution required
□ Force push blocked
□ Deletion blocked
□ Bypass restricted
□ Code-owner review where appropriate
□ Merge queue considered
```

---

# 349. Lockfile Checklist

```text
□ Canonical lockfile committed
□ Only one package manager for workspace
□ Frozen install in CI
□ Unexpected changes reviewed
□ Integrity/source changes reviewed
□ Lockfile matches manifests
```

---

# 350. Generated File Checklist

```text
□ Should it be committed?
□ Source identified
□ Generator identified
□ Tool version pinned
□ Reproducible
□ Marked generated where possible
□ CI verifies drift where needed
□ No hand edits
```

---

# 351. Monorepo Checklist

```text
□ Monorepo benefits justified
□ apps/packages separation clear
□ Package ownership clear
□ Public APIs clear
□ Dependency direction enforced
□ No accidental deep imports
□ Shared lockfile/tooling coherent
□ Affected CI trustworthy
□ Access-control limitations understood
□ Release strategy defined
```

---

# 352. Release Tag Checklist

```text
□ Exact release commit
□ Naming convention correct
□ Annotated
□ Signed/attested where required
□ Immutable
□ Release metadata available
□ Artifact/provenance linkage known
```

---

# 353. Repository Security Checklist

```text
□ Least-privilege write access
□ Admin access limited
□ Secret scanning
□ Dependency scanning
□ Protected branches
□ Sensitive workflows owned
□ Bots minimally privileged
□ Fork workflows safe
□ Public-history exposure reviewed
```

---

# 354. Definition of Done — New Repository

A repository is ready for active production development when:

```text
✓ Purpose documented
✓ Owning team assigned
✓ Visibility correct
✓ README available
✓ Repository structure established
✓ CODEOWNERS configured where appropriate
✓ Protected default branch
✓ CI verification
✓ Secrets excluded/scanning configured
✓ Dependency strategy established
✓ Local setup documented
```

---

# 355. Definition of Done — Repository Change

A substantive repository change is complete when:

```text
✓ Scope coherent
✓ History understandable
✓ Required review obtained
✓ Required checks pass
✓ Generated/lockfile changes intentional
✓ Ownership implications addressed
✓ Documentation updated where needed
✓ Main remains releasable
```

---

# 356. Definition of Done — Monorepo Package

A package is ready when:

```text
✓ Responsibility clear
✓ Owner clear
✓ Public API defined
✓ Dependencies declared
✓ No forbidden dependency direction
✓ Tests available
✓ Build/release behavior defined
✓ Documentation sufficient for consumers
```

---

# 357. Definition of Done — Release Tag

A formal release tag is complete when:

```text
✓ Version/release ID approved
✓ Target commit verified
✓ CI/release gates passed
✓ Tag created through trusted process
✓ Tag immutable
✓ Signature/attestation available where required
✓ Release notes/history available
✓ Artifact linkage traceable
```

---

# 358. Repository Anti-Patterns

Avoid:

```text
direct pushes to main
```

Avoid:

```text
main regularly broken
```

Avoid:

```text
months-long feature branches
```

Avoid:

```text
dev/staging/prod branches representing environments
```

Avoid:

```text
everything owned by one person
```

Avoid:

```text
CODEOWNERS present but never enforced
```

Avoid:

```text
CODEOWNERS editable without protected ownership
```

Avoid:

```text
5000-line unrelated PR
```

Avoid:

```text
refactor + dependency upgrade + feature + migration
```

in one PR without strong reason.

Avoid:

```text
commit message = update
```

Avoid:

```text
backup-old-final.ts
```

Avoid:

```text
commented-out code kept for history
```

Avoid:

```text
multiple active lockfiles
```

Avoid:

```text
CI silently regenerates lockfile
```

Avoid:

```text
node_modules committed
```

without explicit vendoring intent.

Avoid:

```text
dist committed
```

without distribution need.

Avoid:

```text
generated code manually patched
```

Avoid:

```text
unreviewable generated diff mixed with behavior change
```

Avoid:

```text
large binary accidentally committed to Git history
```

Avoid:

```text
real production data fixture
```

Avoid:

```text
secret removed from latest commit = secret safe
```

Avoid:

```text
monorepo means every package imports every package
```

Avoid:

```text
deep import into another package's internals
```

Avoid:

```text
cross-app source imports
```

Avoid:

```text
one giant common package
```

Avoid:

```text
submodule used for every shared library
```

Avoid:

```text
production
```

as a movable Git tag.

Avoid:

```text
latest
```

as release identity.

Avoid:

```text
published tag moved to a different commit
```

Avoid:

```text
release binary only identifiable by branch name
```

Avoid:

```text
repository with no active owner
```

Avoid:

```text
public repo enabled before history/secrets/license review
```

---

# 359. AI Git & Repository Rules

AI coding agents MUST inspect repository conventions before changing:

```text
structure
branch workflow
package layout
lockfiles
generated files
release metadata
```

---

# 360. AI Existing-Convention Rule

AI MUST follow established repository:

```text
naming
directory structure
package manager
commit policy
testing
```

unless the task explicitly changes them.

---

# 361. AI New-File Rule

AI SHOULD place new files in the narrowest architecturally correct existing location.

It MUST NOT create new top-level folders casually.

---

# 362. AI Utils Rule

AI MUST NOT create generic:

```text
utils/
helpers/
common/
```

modules without checking whether a domain-specific location exists.

---

# 363. AI Branch Rule

When recommending branches, AI SHOULD default to short-lived lowercase topic branches.

---

# 364. AI Main Rule

AI MUST NOT recommend direct push to protected `main` as ordinary workflow.

---

# 365. AI PR Rule

AI SHOULD structure substantial work into reviewable coherent PRs.

---

# 366. AI Commit Rule

AI-generated commit messages SHOULD describe the actual logical change.

---

# 367. AI History Rule

AI MUST NOT rewrite shared/released history merely to make it look cleaner.

---

# 368. AI Secret Rule

AI MUST NOT commit:

```text
.env
credentials
private keys
production data
```

---

# 369. AI `.gitignore` Rule

When generating local artifacts, AI SHOULD verify that appropriate ignore rules exist.

---

# 370. AI Lockfile Rule

AI MUST use the repository's existing package manager and canonical lockfile.

---

# 371. AI Lockfile Integrity Rule

AI MUST NOT delete/regenerate a lockfile merely to solve dependency conflicts without understanding the resulting dependency change.

---

# 372. AI Dependency Rule

AI SHOULD isolate large dependency upgrades from unrelated behavioral changes where practical.

---

# 373. AI Generated-File Rule

Before editing a file, AI SHOULD determine whether it is generated.

If generated:

```text
modify source
regenerate
```

rather than patching output manually.

---

# 374. AI Generated-Drift Rule

If committed generated code exists, AI SHOULD run the canonical generator rather than recreating output approximately.

---

# 375. AI Monorepo Rule

AI MUST respect package boundaries even though all source is locally accessible.

---

# 376. AI Deep-Import Rule

AI MUST NOT solve reuse by deep-importing private internals from another package.

---

# 377. AI Package Rule

AI SHOULD promote shared behavior into an appropriate package only when the Reusability Guidelines justify it.

---

# 378. AI Monorepo Dependency Rule

AI MUST preserve canonical dependency direction and avoid cycles.

---

# 379. AI Release Tag Rule

AI MUST NOT move or reuse an existing published release tag for different content.

---

# 380. AI Tag Rule

When formal Git release tags are required, AI SHOULD prefer annotated tags and follow the repository's signing/attestation policy.

---

# 381. AI SemVer Rule

AI MUST NOT increment major/minor/patch blindly.

Version changes depend on the package's public compatibility contract.

---

# 382. AI Migration Rule

AI MUST NOT rewrite migration files already applied to shared environments unless the migration system explicitly permits it.

Create a new migration.

---

# 383. AI Repository Split Rule

AI SHOULD NOT recommend creating a new repository solely because a module is large.

It should first evaluate ownership, access, release, and dependency boundaries.

---

# 384. AI Monorepo Rule

AI SHOULD NOT recommend monorepo adoption solely for aesthetic consistency.

It must consider:

```text
ownership
cross-repo coordination
CI
access control
release model
```

---

# 385. AI CODEOWNERS Rule

When adding security-sensitive or newly owned modules, AI SHOULD consider whether CODEOWNERS requires updating.

---

# 386. AI CI Ownership Rule

Changes to privileged CI/repository-policy files SHOULD preserve stronger ownership protections.

---

# 387. AI Public Repo Rule

AI MUST NOT suggest making a repository public without considering:

```text
secrets
history
IP
licenses
private metadata
```

---

# 388. AI Gold Rule

When uncertain:

```text
Existing convention
>
Small coherent change
>
Explicit ownership
>
Reviewable history
>
Reproducibility
>
Clever repository structure
```

---

# 389. Golden Git & Repository Rules

**1. A repository is an authoritative, reviewable software history.**

**2. Repository boundaries follow ownership, access, dependency, release, and lifecycle needs.**

**3. Every active production repository has an owner.**

**4. The repository root remains understandable.**

**5. Follow framework/ecosystem structure before inventing custom layout.**

**6. Shared code lives at the narrowest correct scope.**

**7. The default branch remains protected, green, and releasable.**

**8. Ordinary production changes reach main through pull requests.**

**9. Topic branches are short-lived.**

**10. Environment branches are not the default deployment architecture.**

**11. Branch names are lowercase, descriptive, and free of sensitive information.**

**12. Force push to protected main is prohibited.**

**13. Default/release branch history is not rewritten casually.**

**14. Pull requests contain one coherent goal.**

**15. Reviewability matters more than arbitrary PR line-count limits.**

**16. Mechanical and behavioral changes are separated where practical.**

**17. Critical code has explicit owners.**

**18. CODEOWNERS itself is protected.**

**19. Required branch rules are technically enforced, not merely documented.**

**20. Commits represent coherent logical changes.**

**21. Commit messages communicate meaningful intent.**

**22. Shared history is attributable to real identities.**

**23. Secrets never enter Git.**

**24. Removing a leaked secret from Git does not replace rotation.**

**25. Production PII does not belong in ordinary repository fixtures.**

**26. Applications commit their canonical dependency lockfiles.**

**27. CI uses frozen/immutable dependency resolution.**

**28. Competing lockfiles are prohibited for one dependency graph.**

**29. Generated files are either deliberately committed or deliberately ignored.**

**30. Generated files are produced from an authoritative source and reproducible tooling.**

**31. Generated output is not hand-edited.**

**32. Build artifacts belong in artifact registries, not Git history.**

**33. Large binaries are kept out of ordinary Git history where practical.**

**34. Monorepos still enforce architectural package boundaries.**

**35. Monorepo packages declare their own dependencies.**

**36. Applications do not deep-import another package's private internals.**

**37. One repository does not imply one security-access boundary between folders.**

**38. Cross-repository relationships use explicit versioned contracts.**

**39. Applied migrations are historical records and are not rewritten casually.**

**40. Release tags are immutable identifiers for exact source revisions.**

**41. Formal releases use consistent tag naming.**

**42. Annotated tags are preferred for formal Git releases.**

**43. Signed tags or equivalent provenance controls are used where release assurance requires them.**

**44. Published release tags are never silently moved.**

**45. A Git tag identifies source; provenance identifies how the artifact was built.**

**46. Repository administrator and bypass privileges are tightly restricted.**

**47. Repository automation uses least-privilege identities.**

**48. Public repository publication includes history, secret, IP, and license review.**

**49. Dead code is deleted rather than stored as commented-out backups.**

**50. If a fresh clone cannot be understood, built, tested, and owned through documented repository conventions, the repository is not yet healthy.**

---

# 390. Canonical Git & Repository Standard

The organizational standard is:

> **Git repositories are intentional engineering boundaries with explicit ownership, understandable structure, protected history, reproducible dependencies, and reviewable changes. Repositories follow ecosystem-native organization wherever practical, keep source, tests, migrations, infrastructure definitions, documentation, configuration templates, and required lockfiles under version control, while excluding credentials, production data, transient outputs, and ordinary build artifacts.**

> **Production development uses a protected canonical default branch with short-lived topic branches and pull-request-based integration. Branch protection enforces appropriate status checks, qualified review, code-owner approval where required, conversation resolution, and restrictions on force pushing, deletion, and administrative bypass. Branches represent development history—not deployment environments—and long-lived release branches exist only when the product's support and release model genuinely requires them.**

> **Pull requests are coherent units of review rather than arbitrary bundles of code. Reviewability is governed by conceptual scope rather than a universal line limit; unrelated behavioral changes, mechanical refactoring, generated output, dependency upgrades, and risky migrations are separated where practical. Commits remain attributable and meaningful, and released/shared history is preserved through revert and forward correction rather than casual rewriting.**

> **Dependency lockfiles are authoritative repository inputs for applications and workspaces, are committed, reviewed, and enforced through frozen installation in CI. Generated files have a documented authoritative source, generation command, tooling version, and drift policy; generated output is never patched manually when the source can be corrected. Release binaries and other build products are stored in dedicated artifact systems rather than accumulated in Git history.**

> **Monorepos provide shared source control, not unrestricted architectural coupling. Applications and packages maintain explicit responsibilities, ownership, dependency declarations, public APIs, and dependency direction. Deep imports into package internals, accidental dependency hoisting, unrestricted cross-app source imports, and generic shared dumping grounds are prohibited. Multi-repository architectures likewise use explicit APIs, packages, events, schemas, or artifacts instead of unmanaged source copying.**

> **Formal release tags are immutable source identifiers. Projects use a consistent tag format, preferably annotated tags for formal Git releases, and apply signing or equivalent release-provenance assurance where required. Published tags are never silently repointed to different source; defects result in new releases. Git tags identify source state, while the CI/CD provenance chain connects that source to the exact trusted artifact ultimately deployed or distributed.**

A production-grade repository should make it easy to answer:

```text
What is this repository responsible for?
Who owns it?
Where is the application entry point?
How do I set it up?
How do I test it?
Which branch is canonical?
Can anyone push directly to it?
Which checks protect it?
Which team owns this directory?
Why is this dependency present?
Which lockfile is authoritative?
Is this file generated?
What generates it?
Can generation drift be detected?
Is this package public or private?
What may import it?
Does the monorepo enforce dependency direction?
Which commit corresponds to this release?
Which release tag identifies it?
Can the release tag be modified?
How does this source revision connect to the deployed artifact?
```

If those questions cannot be answered reliably, the repository is functioning as file storage rather than governed engineering infrastructure.

Two current GitHub details support the governance rules above. GitHub protected branches can currently enforce PR reviews, required status checks, code-owner reviews, conversation resolution, signed commits, linear history, merge queues, successful deployments, restricted pushes, and protection against force pushes/deletion; GitHub also recommends protecting the CODEOWNERS file itself when ownership review is a security boundary. citeturn192940search1turn192940search2

For releases, Git itself distinguishes **annotated tags** from lightweight tags and explicitly describes annotated tags as intended for releases; signed annotated tags can also be cryptographically verified. citeturn326429search0turn326429search5

In the master hierarchy, the clean ordering is now:

**… → Privacy & Data Governance → Configuration & Environments → Dependencies → Git & Repository → CI/CD → Infrastructure & Deployment → Backup & Disaster Recovery → Feature Flags → Release & Versioning → Documentation → Governance.**
