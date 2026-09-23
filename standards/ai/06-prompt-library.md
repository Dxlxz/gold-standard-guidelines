---
id: "prompt-library"
title: "Prompt Library & Governance"
domain: "ai"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["ai", "prompt", "library", "governance"]
applies_to: ["ai", "team"]
related: ["code-review", "governance", "prompt-engineering"]
legacy_number: 69
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 63862
provenance: baseline

---

This standard treats prompts as **production code and policy-bearing configuration**, not editable prose in a dashboard. Current OpenAI guidance similarly recommends code-managed prompts with typed inputs, code review, tests, normal deployment processes, feature flags, and rollback; its reusable Prompt objects are being deprecated during 2026. citeturn230168search0turn230168search7turn230168search2

# Prompt Library & Governance Guidelines — Gold Standard 2026

**Canonical placement:** AI/LLM → Prompt Engineering → Prompt Library → Governance  
**Status:** Canonical  
**Applies to:** System prompts, developer instructions, agent instructions, classification prompts, extraction prompts, transformation prompts, tool-selection instructions, RAG answer prompts, evaluation prompts, guardrail prompts, multimodal prompts, workflow prompts, and reusable model instructions used by production applications  
**Component baseline:** shadcn/ui  
**Normative terms:** MUST, MUST NOT, SHOULD, SHOULD NOT, MAY

---

# 1. Purpose

## 1.1 Objective

This standard defines the canonical engineering, security, ownership, lifecycle, deployment, testing, audit, and user-interface requirements for production prompts.

It covers:

1. where prompts live;
2. prompt naming;
3. prompt identity;
4. versioning;
5. ownership;
6. review requirements;
7. prompt-as-code;
8. typed parameterisation;
9. templating;
10. prompt composition;
11. model coupling;
12. automated tests;
13. evaluations;
14. security testing;
15. prompt injection;
16. secrets handling;
17. PII and sensitive data;
18. environment configuration;
19. development/staging/production promotion;
20. feature flags;
21. release notes;
22. changelog;
23. rollback;
24. deprecation;
25. removal;
26. audit history;
27. runtime observability;
28. emergency changes; and
29. administrative governance interfaces.

The purpose of prompt governance is to ensure that changes to model behaviour are:

```text id="4v83fm"
intentional
reviewable
testable
traceable
releasable
reversible
secure
```

A production prompt MUST NOT be treated as ungoverned text that can be silently edited independently of the software behavior it controls.

## 1.2 Core principle

The canonical prompt lifecycle is:

```text id="9kfwq3"
Requirement
   ↓
Prompt source
   ↓
Typed inputs
   ↓
Tests + evaluations
   ↓
Review
   ↓
Versioned release
   ↓
Environment promotion
   ↓
Runtime observation
   ↓
Rollback / iteration / deprecation
```

Prompt behavior MUST be managed with the same discipline as application behavior.

## 1.3 Prompt-as-code baseline

Production prompts SHOULD live in source control as application code or code-adjacent versioned artifacts.

Current OpenAI guidance explicitly recommends storing production prompts in application code, using typed parameters, code review, representative fixtures, evaluation checks, feature flags, normal deployment processes, and Git history for rollback. citeturn230168search0turn230168search7

The canonical baseline is therefore:

```text id="f8l4d9"
source control
+ code review
+ typed inputs
+ automated tests
+ evaluation gates
+ deployment pipeline
+ audit history
```

Runtime-editable prompt registries MAY exist as controlled delivery or administrative systems, but they MUST NOT bypass these governance controls.

## 1.4 Prompt is not a security boundary

A system prompt MUST NOT be treated as secret or as an authorization mechanism.

OWASP specifically warns that system prompts should not contain credentials, connection strings, or other secrets and that application authorization must not be delegated to prompt instructions. citeturn230168search8

Security controls MUST remain in trusted application code and infrastructure.

## 1.5 Relationship to other standards

This standard MUST be implemented consistently with:

- **Security:** least privilege, secret management, authorization, prompt injection, logging, secure SDLC, incident response, data classification, and threat modelling;
- **Data & Database:** prompt metadata, immutable version history, retention, lineage, audit tables, tenancy, and deletion;
- **API:** typed request schemas, versioned contracts, validation, error handling, model invocation, idempotency, and observability;
- **State Management:** release flags, runtime version resolution, cached configuration, environment state, and rollback state;
- **Forms & Validation:** administrative prompt-edit forms, typed parameters, validation, review warnings, and destructive-change confirmation;
- **Accessibility:** accessible governance interfaces, diff review, status communication, keyboard operation, and error messaging;
- **Design Tokens:** status badges, approval states, diff surfaces, warnings, focus states, destructive actions, and audit views;
- **Component standards:** Button, Badge, Alert, AlertDialog, Dialog, Tabs, Table, Data Table, Textarea, Input, Select, Combobox, Tooltip, Sheet, ScrollArea, and Code/typography primitives;
- **Pattern standards:** approvals, change review, version history, deployment, audit trails, error states, and settings;
- **RAG:** untrusted retrieved-content isolation and source boundaries;
- **AI/LLM:** model selection, evals, tool permissions, structured output, safety, hallucination controls, and human approval.

NIST's AI Risk Management Framework and Generative AI Profile support lifecycle-oriented governance, documentation, monitoring, and risk management rather than treating generative-AI behavior as a one-time configuration exercise. citeturn230168search12

---

# 2. Rules

## 2.1 Prompt categories

Every production prompt MUST have a declared category.

Canonical categories SHOULD include:

```text id="phuy44"
system
developer
task
tool-routing
classification
extraction
generation
transformation
RAG-grounding
safety
evaluation
summarisation
multimodal
```

The category MUST describe function, not ownership.

Avoid generic categories such as:

```text id="37bxwa"
misc
general
other
prompt
```

---

## 2.2 Prompt identity

Every reusable production prompt MUST have a stable machine identity.

A canonical ID SHOULD follow:

```text id="ea73pq"
<domain>.<feature>.<purpose>
```

Examples:

```text id="x7k01k"
support.reply.generate
support.ticket.classify
billing.invoice.extract
knowledge.answer.grounded
security.content.review
```

Prompt IDs MUST:

- be stable;
- be unique;
- be environment-independent;
- avoid model names where model choice may change;
- avoid version numbers in the stable logical ID; and
- be suitable for logs and metrics.

Avoid:

```text id="54zi0r"
prompt1
final_prompt
new_prompt_v2
gpt5_prompt
prod_prompt
```

---

## 2.3 File naming

Prompt source files SHOULD map predictably to prompt IDs.

Example:

```text id="6v0zpu"
prompts/
  support/
    reply-generate.ts
    ticket-classify.ts
  billing/
    invoice-extract.ts
```

or:

```text id="ifgmw8"
ai/
  prompts/
    knowledge.answer.grounded.ts
```

Repositories SHOULD use one consistent convention.

---

## 2.4 Where prompts live

Prompt source SHOULD live near the application domain it controls or in a clearly governed shared prompt package.

Preferred:

```text id="lmw5u8"
features/support/prompts/
```

when the prompt is feature-specific.

Preferred:

```text id="hrd7fk"
packages/ai-prompts/
```

when multiple services share the same behavior.

A single enormous global:

```text id="lgcuxp"
prompts.ts
```

SHOULD NOT contain unrelated application prompts.

Prompt ownership SHOULD remain understandable from repository structure.

---

## 2.5 Prompt-as-code

Production prompts MUST be version-controlled.

Changes MUST be reviewable as source diffs.

Prompt behavior MUST be deployable through the normal software delivery pipeline.

Prompt edits MUST NOT be silently applied directly to production through an unmanaged vendor dashboard.

If an external prompt management system is used, the authoritative version MUST either:

1. be synchronized from source control; or
2. provide equivalent immutable versioning, review, tests, audit, release, and rollback guarantees.

---

## 2.6 Generated prompt text

The authoritative artifact MAY be a prompt builder rather than one static string.

Example conceptually:

```text id="89kix5"
buildSupportReplyPrompt(input)
```

is preferable to ad hoc concatenation spread across application code.

Prompt construction SHOULD be centralized enough that the exact runtime instructions can be reproduced.

---

## 2.7 Prompt metadata

Every prompt SHOULD declare metadata such as:

```text id="hgz500"
id
title
description
owner
reviewers
risk_level
category
input_schema
output_schema
supported_models
default_model
created_at
deprecated_at
```

Where high governance is required, metadata SHOULD additionally include:

```text id="9c0fzs"
data_classification
tool_permissions
eval_suite
security_review_required
approval_policy
rollback_owner
```

---

## 2.8 Ownership

Every production prompt MUST have an accountable owner.

The owner SHOULD be a team, service, or maintained organizational role rather than one employee.

Preferred:

```text id="h94n8t"
owner: support-platform
```

Avoid:

```text id="wu5f88"
owner: alice
```

as the sole governance model.

Individual maintainers MAY additionally be listed.

---

## 2.9 Code ownership

Prompt directories SHOULD use repository ownership controls such as:

```text id="a90oj2"
CODEOWNERS
```

or equivalent review rules.

High-risk prompt changes MUST require review from the appropriate domain and/or security owner.

---

## 2.10 Risk classification

Production prompts SHOULD be assigned a risk level.

A practical classification MAY be:

| Risk | Example |
|---|---|
| Low | Formatting or tone transformation |
| Medium | Customer-facing generation, summarisation |
| High | Tool use, regulated output, financial/legal workflow, privileged data |
| Critical | Autonomous privileged actions, security decisions, safety-critical decisions |

Review, testing, audit, and deployment requirements SHOULD increase with risk.

---

## 2.11 Review requirement

Production prompt changes MUST undergo review.

The reviewer MUST assess more than grammar.

Review SHOULD consider:

- intended behavior;
- unintended interpretation;
- parameter handling;
- role boundaries;
- data exposure;
- prompt injection;
- tool authority;
- output format;
- failure modes;
- model compatibility;
- evaluation results; and
- regression risk.

A prompt PR consisting only of:

```text id="xwto92"
looks better
```

is insufficient review evidence for production-critical behavior.

---

## 2.12 Separation of author and approver

High-risk prompts SHOULD require approval from someone other than the author.

Critical prompts MUST follow the organization's change-control or two-person review policy.

Emergency procedures MAY relax standard timing, but MUST NOT remove post-change review and audit.

---

## 2.13 Version model

Every released prompt MUST have an immutable release version.

Version identity MAY be provided by:

```text id="yt9ugt"
Git commit SHA
release tag
artifact digest
monotonic revision
semantic version
```

The stable prompt ID and immutable version MUST remain distinct.

Example:

```text id="8te1ft"
prompt_id:
  knowledge.answer.grounded

prompt_version:
  3f7c91a
```

---

## 2.14 Semantic versions

Semantic versions MAY be used where human-visible versioning is useful.

Example:

```text id="xkn6d8"
2.4.1
```

but Git/artifact identity SHOULD remain available for exact reproducibility.

The organization MUST define what constitutes:

```text id="f3z0hn"
major
minor
patch
```

if semantic versioning is adopted.

---

## 2.15 Immutability

A released prompt version MUST NOT be edited in place.

Any behavior-changing edit MUST create a new version.

This includes:

- instruction text;
- examples;
- output schema;
- parameter defaults;
- tool descriptions;
- safety clauses; and
- meaningful template structure.

Immutable versions are required for reliable audit and rollback.

---

## 2.16 Model version coupling

Prompt performance may change when the model changes.

Production runtime identity SHOULD therefore include both:

```text id="azevcb"
prompt_version
model_version
```

OpenAI's current prompt-engineering guidance recommends pinning production models to specific model snapshots where consistency is required and testing prompt behavior when models change. citeturn230168search0

A model upgrade MUST trigger prompt regression evaluation even when prompt source is unchanged.

---

## 2.17 Prompt/model compatibility

A prompt MAY define supported models.

Example:

```text id="smnfdl"
supported_models:
  - model-family-a
  - model-family-b
```

A deployment MUST NOT silently switch to an untested model when model behavior materially affects the prompt contract.

Fallback models SHOULD be tested explicitly.

---

## 2.18 Typed parameterisation

Dynamic prompt values MUST be passed through typed parameters or validated input schemas.

Preferred conceptual API:

```text id="5xz7q9"
buildPrompt({
  customerName,
  ticketText,
  responseLanguage
})
```

Avoid:

```text id="fy0j6e"
prompt.replace("{{everything}}", arbitraryObject)
```

without validation or type guarantees.

---

## 2.19 Parameter schema

Each prompt SHOULD define an explicit input schema.

The schema SHOULD specify:

```text id="vw72nk"
name
type
required
constraints
sensitivity
source
maximum size
```

Example:

```text id="aj7xli"
ticketText:
  type: string
  required: true
  maxLength: 20000
  sensitivity: customer-data
```

---

## 2.20 Parameter names

Parameter names MUST express semantics.

Preferred:

```text id="4ajq8n"
customer_message
source_documents
response_language
policy_context
```

Avoid:

```text id="i9o1dk"
text
data
context2
value
thing
```

for shared production prompts.

---

## 2.21 Delimit untrusted input

User content, retrieved content, tool output, uploaded files, and external data MUST be clearly separated from trusted prompt instructions.

OWASP identifies prompt injection as a core LLM risk and recommends segregating and identifying external/untrusted content rather than allowing it to blend with trusted instructions. citeturn230168search3turn230168search14

Conceptually:

```text id="azvxsl"
Trusted instructions:
...

<USER_CONTENT>
...
</USER_CONTENT>
```

or an equivalent role-/structure-aware representation SHOULD be used.

---

## 2.22 Role separation

System/developer instructions, user messages, retrieved evidence, and tool output MUST remain structurally distinct where the model/API supports roles or typed message parts.

Applications SHOULD NOT concatenate everything into one undifferentiated text block.

This is discouraged:

```text id="wzq0gl"
SYSTEM RULES + USER INPUT + WEBSITE CONTENT + TOOL OUTPUT
```

as one arbitrary string.

---

## 2.23 Template engines

Prompt templates MAY use an established templating system.

The system MUST:

- escape or delimit values appropriately;
- detect missing required variables;
- reject unknown variables where practical;
- support deterministic rendering; and
- avoid hidden side effects.

A general-purpose code execution template language SHOULD NOT be used where simple typed interpolation is sufficient.

---

## 2.24 Conditional prompt sections

Conditional prompt blocks MAY be used.

Conditions SHOULD derive from typed application state.

Example:

```text id="9wzz0y"
if (hasVerifiedSources) {
  includeGroundingSection()
}
```

The runtime MUST NOT allow untrusted user text to select arbitrary privileged prompt sections unless the application explicitly authorizes that capability.

---

## 2.25 Prompt composition

Complex prompts SHOULD be composed from clearly named sections.

Example:

```text id="5xt21k"
role
policy
task
constraints
context
examples
output_contract
```

Shared sections MAY be reused.

Composition MUST NOT create hidden instruction conflicts.

---

## 2.26 Shared fragments

Shared prompt fragments SHOULD be used only when their semantics truly apply across consuming prompts.

A change to a shared fragment MUST trigger tests for every dependent prompt.

Large inheritance hierarchies of prompt fragments SHOULD be avoided because they make runtime behavior difficult to reconstruct.

---

## 2.27 Runtime reconstruction

Engineers MUST be able to determine the exact prompt that was rendered for a production invocation, subject to data-retention and privacy policy.

This requires traceability of:

```text id="hzi6wy"
prompt ID
prompt version
template inputs or input references
shared-fragment versions
model
runtime configuration
```

Sensitive data MUST NOT be logged merely to achieve reconstruction.

---

## 2.28 Secrets

Secrets MUST NOT appear in prompt source.

Prohibited content includes:

```text id="iz5ng9"
API keys
passwords
private keys
database credentials
connection strings
bearer tokens
service secrets
```

OWASP specifically warns that system prompts should not contain credentials or other secrets because prompt content can be exposed. citeturn230168search8

Secrets MUST remain in the approved secret-management system.

---

## 2.29 Prompt secrecy

Prompt text MAY be proprietary, but applications MUST NOT assume the prompt will remain confidential.

Security MUST remain correct even if an attacker learns the complete prompt.

The application MUST NOT depend on:

```text id="6c9qvg"
"the attacker does not know this instruction"
```

as a security control.

---

## 2.30 PII in source prompts

Static prompt source MUST NOT contain real customer PII.

Examples and fixtures SHOULD use synthetic or appropriately anonymized data.

Names such as:

```text id="11nndh"
Example Customer
Acme Example Ltd.
```

SHOULD be preferred over real production identities.

---

## 2.31 Runtime PII

PII MAY be inserted into a runtime prompt only when:

- the application has a legitimate requirement;
- the model/provider is approved for the data class;
- access is authorized;
- retention policy allows processing;
- only necessary data is included; and
- applicable privacy controls are satisfied.

Data minimization MUST apply.

---

## 2.32 Sensitive data minimization

Prompts SHOULD receive the minimum information needed for the task.

Do not send an entire customer profile when the model only needs:

```text id="kpqzrz"
preferred language
```

or one relevant support message.

Prompt builders SHOULD intentionally select fields rather than serialize entire database objects.

---

## 2.33 Object serialization

This pattern is discouraged:

```text id="r7e85b"
JSON.stringify(user)
```

into a prompt unless the full object is explicitly required and approved.

Typed projection SHOULD be used:

```text id="njd33k"
{
  displayName,
  locale,
  selectedFields
}
```

This reduces accidental PII and secret leakage.

---

## 2.34 Logs and prompt data

Production logs MUST NOT indiscriminately store fully rendered prompts.

Logging policy MUST distinguish:

```text id="zklk6v"
prompt source
prompt metadata
runtime parameters
rendered prompt
model response
```

Sensitive payloads SHOULD be redacted, hashed, referenced, sampled, or excluded according to Security and Privacy policy.

---

## 2.35 Prompt injection

Production prompts MUST be designed under the assumption that untrusted inputs may contain adversarial instructions.

OWASP identifies prompt injection as capable of causing sensitive-information disclosure, unauthorized tool use, and manipulation of downstream decisions. citeturn230168search3

Prompt wording alone MUST NOT be considered sufficient mitigation.

---

## 2.36 Application-level controls

Sensitive operations MUST be protected in code.

Examples include:

```text id="m0f8ay"
authorization
tenant boundaries
tool permissions
payment limits
data deletion
email sending
resource access
```

A prompt saying:

```text id="tu17p1"
Only delete records the user is allowed to delete.
```

MUST NOT replace the actual authorization check.

---

## 2.37 Tool permissions

Tool availability SHOULD be configured independently from prompt text.

A prompt MUST NOT be able to grant itself additional tool privileges.

Tools MUST enforce:

- authenticated identity;
- authorization;
- parameter validation;
- tenant isolation; and
- side-effect safeguards.

OWASP recommends least privilege and application-side function control rather than delegating privileges to the model. citeturn230168search3turn230168search14

---

## 2.38 High-risk actions

Prompts enabling high-risk tool actions SHOULD require explicit human approval where the domain warrants it.

Examples include:

```text id="7nxigk"
financial transfer
account deletion
external communication
permission changes
legal submission
production infrastructure modification
```

The prompt MUST NOT silently override required approval workflows.

---

## 2.39 Output contracts

Prompts producing machine-consumed output SHOULD define a structured output contract.

The application SHOULD prefer schema-constrained structured output where supported.

Example:

```text id="e2pnhp"
{
  "category": "...",
  "confidence": ...,
  "reason": "..."
}
```

MUST be validated before use.

The application MUST NOT assume that prose output conforms merely because the prompt requested JSON.

---

## 2.40 Output validation

Model output used by application logic MUST be validated.

Validation MAY include:

- schema;
- allowed values;
- length;
- security content;
- citations;
- numeric bounds; and
- required fields.

Invalid output MUST enter a defined recovery path.

---

## 2.41 Prompt tests

Every production prompt MUST have automated tests appropriate to its risk.

Tests SHOULD verify stable invariants rather than exact prose unless exact output is genuinely required.

Examples:

```text id="rc80om"
required fields exist
forbidden content absent
classification value allowed
citations present
PII not disclosed
tool action not selected
```

---

## 2.42 Fixture tests

Prompt tests SHOULD include representative input fixtures.

Fixtures SHOULD cover:

```text id="amc65l"
normal input
minimal input
maximum-size input
missing optional values
multilingual input
malformed content
adversarial content
edge cases
```

High-risk prompts MUST include negative/adversarial fixtures.

---

## 2.43 Golden outputs

Golden-output tests MAY be used where output is sufficiently deterministic.

They SHOULD NOT be the only testing strategy for generative tasks.

Exact string equality SHOULD NOT be required for inherently variable prose unless the model configuration and task truly require deterministic formatting.

---

## 2.44 Evaluation suites

Behavioral prompts SHOULD have evaluation datasets beyond conventional unit tests.

Evaluation SHOULD measure task-specific qualities such as:

```text id="aw5hxc"
accuracy
groundedness
citation correctness
format compliance
tone
refusal correctness
tool selection
policy adherence
hallucination rate
```

OpenAI's current guidance emphasizes representative fixtures and evaluation checks when changing prompt or model behavior. citeturn230168search0turn230168search9

---

## 2.45 Evaluation versioning

Evaluation datasets and scoring logic MUST be versioned.

A prompt release MUST be traceable to the evaluation version used to approve it.

Changing an evaluator MAY materially change release results and MUST therefore be reviewable.

---

## 2.46 Human evaluation

Human review SHOULD supplement automated metrics where subjective qualities matter.

Examples include:

```text id="zun99j"
professionalism
clarity
helpfulness
nuance
brand voice
legal appropriateness
```

Human evaluation instructions SHOULD themselves be versioned.

---

## 2.47 Security evaluation

High-risk prompts MUST include adversarial security evaluation.

Tests SHOULD include:

```text id="tp303z"
direct prompt injection
indirect prompt injection
system prompt extraction
secret requests
role manipulation
tool abuse
cross-tenant requests
malicious retrieved documents
encoded attacks
conflicting instructions
```

OWASP recommends adversarial testing and attack simulations for prompt-injection defenses. citeturn230168search3

---

## 2.48 Regression gates

Prompt changes MUST meet defined release thresholds.

A release MUST fail when critical requirements regress beyond approved limits.

Security regressions MUST be release blocking.

A subjective improvement in tone MUST NOT justify a material regression in:

```text id="yt7nyj"
accuracy
security
structured-output validity
citation correctness
tool safety
```

without explicit risk acceptance.

---

## 2.49 Baselines

Each important prompt SHOULD have an established production baseline.

Candidate changes SHOULD be compared against that baseline using the same:

```text id="gpktob"
dataset
model
configuration
scoring
```

where practical.

Comparisons MUST control model changes separately when diagnosing prompt performance.

---

## 2.50 Environment separation

Prompt releases MUST respect software environment boundaries.

Canonical environments SHOULD include:

```text id="z0j1ty"
development
test
staging
production
```

as applicable.

An environment MUST NOT alter prompt behavior through undocumented manual text edits.

---

## 2.51 Environment-independent source

Prompt source SHOULD be environment-independent.

Environment-specific values SHOULD enter as configuration or typed parameters.

Avoid maintaining:

```text id="fmmfml"
support-prompt-dev
support-prompt-staging
support-prompt-prod
```

as separately edited prompt texts.

Preferred:

```text id="n9vpgr"
one prompt source
+ environment configuration
```

---

## 2.52 Environment values

Environment-specific parameters MAY include:

```text id="0sx7j6"
service URL
feature flag
tenant policy selection
model deployment name
tool availability
```

Secrets MUST still remain outside prompt content.

Environment configuration MUST be validated.

---

## 2.53 Promotion

A production prompt SHOULD be promoted from a tested artifact rather than rebuilt manually.

Canonical promotion:

```text id="w7exhl"
development
→ CI tests
→ staging
→ evaluation
→ approval
→ production
```

The same immutable prompt version SHOULD move through environments.

---

## 2.54 No manual production editing

Direct production editing SHOULD be prohibited for normal changes.

If emergency manual editing is technically supported, it MUST:

- require strong authorization;
- create an immutable version;
- record actor and timestamp;
- record reason;
- trigger post-change tests;
- create audit history; and
- support immediate rollback.

---

## 2.55 Feature flags

Prompt versions MAY be selected by feature flag.

Feature flags SHOULD support:

```text id="pzunja"
internal testing
canary release
tenant cohort
percentage rollout
rollback
```

Prompt flags MUST NOT become permanent unowned configuration.

---

## 2.56 A/B testing

Prompt experiments MAY compare versions.

Experiments MUST:

- respect privacy;
- preserve authorization;
- define success metrics;
- exclude high-risk behavior where uncontrolled experimentation is inappropriate;
- record assigned version; and
- support termination.

Users MUST NOT receive weaker security because they are in an experimental cohort.

---

## 2.57 Production release record

Each prompt release SHOULD record:

```text id="yzlqg2"
prompt ID
new version
previous version
model version
owner
reviewers
release time
environment
evaluation results
change summary
release ticket/PR
```

High-risk releases SHOULD additionally record security approval.

---

## 2.58 Changelog

Production prompt changes MUST have a changelog or equivalent immutable commit/release history.

Each change SHOULD explain:

```text id="90lzdr"
what changed
why
expected behavior
test/eval evidence
compatibility impact
rollback target
```

Avoid change notes such as:

```text id="box4ia"
Updated prompt.
```

---

## 2.59 Behavior-focused changelog

A useful changelog entry SHOULD describe behavior rather than wording alone.

Preferred:

```text id="pe2tca"
Reduced unsupported recommendations by requiring
retrieved evidence for product claims.
```

Less useful:

```text id="t6ms30"
Added three sentences to system prompt.
```

---

## 2.60 Rollback

Every production prompt release MUST have a rollback path.

Rollback SHOULD require changing version selection, deployment artifact, or feature flag—not reconstructing historical text manually.

The previous known-good:

```text id="ynbjy0"
prompt version
+ model version
+ relevant runtime configuration
```

SHOULD be reproducible.

---

## 2.61 Rollback testing

Critical systems SHOULD periodically verify that rollback mechanisms work.

A rollback plan that has never been executable MUST NOT be assumed reliable.

Where prompt schema changes affect application code, compatibility with the rollback version MUST be considered.

---

## 2.62 Prompt/output schema compatibility

A prompt version changing structured output MAY require API/application code changes.

Prompt and consumer changes MUST be deployed compatibly.

A prompt MUST NOT start returning a new required enum value before consumers can accept it.

Prompt output contracts SHOULD follow normal schema-evolution rules.

---

## 2.63 Emergency rollback

Emergency rollback SHOULD prioritize known-good behavior over preserving the latest prompt text.

The rollback event MUST still be audited.

Post-incident review SHOULD identify:

- missed test;
- missed evaluation;
- inadequate rollout;
- model interaction;
- data dependency; or
- governance failure.

---

## 2.64 Deprecation

Prompts no longer intended for new use MUST be explicitly marked deprecated.

Deprecation metadata SHOULD include:

```text id="f6qs8n"
deprecated_at
replacement_prompt_id
removal_target
migration_notes
```

Deprecated prompts MUST NOT silently remain the default for new integrations.

---

## 2.65 Deprecation window

Shared prompts SHOULD have a defined migration window where consumers cannot move atomically.

The owning team MUST identify remaining consumers before removal.

Deprecation MUST NOT be considered complete while undocumented production dependencies remain.

---

## 2.66 Prompt removal

Prompt versions MAY be removed from ordinary active configuration after retention requirements are satisfied.

Audit history SHOULD preserve sufficient metadata to reconstruct historical behavior.

Security/Privacy retention policies govern whether rendered prompt data may remain.

---

## 2.67 Consumer inventory

Shared prompts SHOULD maintain an inventory of consuming:

```text id="gl2hx9"
services
features
agents
workflows
```

This inventory enables safe deprecation and shared-fragment changes.

Unknown consumers are a governance defect.

---

## 2.68 Audit requirements

Production prompt governance MUST support auditing.

At minimum, the system SHOULD answer:

```text id="i0khcc"
Which prompt ran?
Which version?
Which model?
Who approved it?
When was it deployed?
What changed?
Which environment?
Could it be rolled back?
```

High-risk applications SHOULD also identify relevant tool-policy and evaluation versions.

---

## 2.69 Runtime invocation audit

Where domain risk requires it, model invocation audit SHOULD record:

```text id="3z45fz"
request ID
prompt ID
prompt version
model ID/version
tenant/user security context
tool configuration version
timestamp
result status
```

Sensitive prompt input MUST follow approved retention and logging rules.

---

## 2.70 Audit immutability

Prompt release history SHOULD be append-only or equivalently tamper-evident.

An administrator MUST NOT be able to rewrite historical prompt releases without leaving an audit trail.

---

## 2.71 Audit access

Prompt audit data MAY itself contain sensitive system information.

Access MUST therefore be role-controlled.

Ordinary product users SHOULD NOT receive internal prompt release details unless those details are deliberately part of the product.

---

## 2.72 Prompt source access

Write access to production prompt source MUST follow least privilege.

Read access MAY be broader, but sensitive business logic SHOULD follow repository classification rules.

Prompt secrecy MUST NOT substitute for actual security.

---

## 2.73 Third-party prompt tools

External prompt-management systems MAY be used only after review of:

- authentication;
- authorization;
- audit logs;
- source-control integration;
- secret handling;
- tenancy;
- data residency;
- version immutability;
- rollback;
- API security; and
- export/backup capability.

Vendor lock-in MUST NOT make historical prompt versions impossible to export or audit.

---

## 2.74 Prompt editors

Administrative prompt editors MUST validate:

```text id="1q0d2q"
prompt identity
parameters
schema references
length
required sections
model compatibility
```

An editor MUST clearly distinguish:

```text id="02hzad"
draft
approved
staging
production
deprecated
```

states.

---

## 2.75 Preview

Governance tooling SHOULD provide rendered prompt preview using synthetic/test inputs.

Preview MUST NOT automatically execute production tools.

Preview environments SHOULD default to non-production resources.

---

## 2.76 Diff review

Prompt governance UIs SHOULD provide semantic or text diff views.

Diff review MUST make additions and removals perceivable without relying solely on color.

Large prompt diffs SHOULD support line wrapping or side-by-side/inline modes.

---

## 2.77 Approval UX

Approval actions MUST be explicit.

High-impact actions such as:

```text id="v8rn2r"
Promote to production
Rollback production
Deprecate prompt
Delete draft
```

SHOULD use confirmation patterns proportionate to risk.

`AlertDialog` is appropriate for consequential actions requiring an explicit response; shadcn/ui defines it specifically as an interruptive modal requiring a user decision. citeturn230168search4

---

## 2.78 shadcn/ui baseline

Prompt governance interfaces SHOULD use the canonical shadcn/ui primitives.

The current library includes Data Table, Table, Badge, Alert, Alert Dialog, Tabs, Command, Dialog, Sheet, Scroll Area, Input, Textarea, Select, Combobox, Tooltip, and related primitives. citeturn230168search1

Recommended mapping:

| Governance need | shadcn/ui baseline |
|---|---|
| Prompt inventory | `Data Table`, `Table` |
| Lifecycle status | `Badge` |
| Risk/security warning | `Alert` |
| Prompt editor | `Textarea`, editor composition |
| Metadata | `Input`, `Select`, `Combobox` |
| Versions | `Table`, `Tabs` |
| Diff/review | `Tabs`, `ScrollArea` |
| Release details | `Sheet`, `Dialog` |
| Production promotion | `AlertDialog` where consequential |
| Search/library navigation | `Command` |
| Audit history | `Data Table` |
| Loading | `Skeleton`, `Spinner` |
| No prompts/results | `Empty` |

---

## 2.79 Status semantics

Lifecycle states SHOULD be explicit:

```text id="7kfpd2"
draft
in-review
approved
staged
production
deprecated
retired
```

Visual status MUST NOT rely on color alone.

Badges MUST have textual labels.

---

## 2.80 Accessibility

Governance tools MUST comply with the Accessibility standard.

In particular:

- diff changes MUST be understandable without color;
- status MUST be exposed as text;
- editors MUST have accessible labels;
- validation errors MUST associate with the field;
- release dialogs MUST manage focus correctly;
- Tables/Data Tables MUST retain keyboard access; and
- destructive or high-risk action wording MUST clearly describe consequences.

---

## 2.81 Runtime observability

Prompt performance SHOULD be observable by prompt version.

Metrics MAY include:

```text id="4ob0rc"
request count
latency
model errors
structured-output failure
fallback usage
tool-selection rate
refusal rate
evaluation proxy metrics
cost/tokens
user feedback
```

Metrics MUST distinguish prompt-version effects from model-version effects where possible.

---

## 2.82 Version dimensions

Runtime telemetry SHOULD identify separately:

```text id="qeyvua"
prompt_version
model_version
retrieval_version
tool_config_version
```

when these independently affect output.

A single generic:

```text id="z9t41o"
ai_version
```

is insufficient for complex production systems.

---

## 2.83 Token usage

Prompt source SHOULD be reviewed for unnecessary token consumption.

Token optimization SHOULD NOT remove clarity, safety, or essential task constraints merely to reduce cost.

Repeated instructions SHOULD be consolidated where behavior remains clear.

---

## 2.84 Prompt length budgets

High-volume prompts SHOULD have an expected size budget.

Automated tests MAY detect large unexpected growth.

Large prompt growth SHOULD require explanation where it materially affects:

```text id="pko4qo"
latency
cost
context availability
```

---

## 2.85 Examples

Few-shot examples SHOULD use representative but synthetic or appropriately sanitized content.

Examples MUST NOT contain secrets or unnecessary real PII.

Examples SHOULD be tested to ensure they do not introduce unintended bias toward one case.

---

## 2.86 Model-specific instructions

Model-specific prompting SHOULD be isolated where practical.

The core domain policy SHOULD NOT be duplicated separately for each model if it can be composed from shared governed logic.

Model adapters MAY add model-specific formatting/instruction style.

---

## 2.87 Business policy in prompts

Critical business rules SHOULD NOT exist only in prompt prose.

Examples:

```text id="sonhii"
maximum refund amount
authorization rule
tenant access rule
financial approval limit
legal eligibility rule
```

MUST be implemented in deterministic application logic where enforcement matters.

The prompt MAY explain those rules to the model.

---

## 2.88 Prompt policy duplication

When business policy must appear in prompts for reasoning/context, its canonical source SHOULD be identifiable.

Manual duplicated policy text across many prompts SHOULD be avoided.

Policy changes SHOULD trigger dependent prompt evaluation.

---

## 2.89 Legal and regulated text

Prompts producing regulated, contractual, medical, financial, or legal content MUST follow applicable domain standards.

Mandatory wording SHOULD be enforced through deterministic templates where exact text is required.

A generative model SHOULD NOT be solely responsible for reproducing legally exact boilerplate.

---

## 2.90 Localization

Prompt source SHOULD generally use one canonical engineering language unless model behavior requires localized system instructions.

User-facing output language SHOULD normally be parameterized.

Maintaining separately hand-edited prompt copies for every output language SHOULD be avoided unless validated as necessary.

---

## 2.91 Tenant customization

Tenant-specific prompt customization MUST be governed.

Tenant text MUST NOT be inserted into high-trust instruction positions without validation.

Customization SHOULD use constrained configuration such as:

```text id="tgd7xd"
brand name
approved tone
approved terminology
supported workflow options
```

rather than arbitrary unrestricted system-prompt replacement.

---

## 2.92 User-defined instructions

Products allowing user-provided instructions MUST treat them as user input, not trusted system policy.

User instructions MUST remain subordinate to:

- system policy;
- security;
- tool authorization;
- tenant controls; and
- safety requirements.

---

## 2.93 Prompt inheritance

Prompt inheritance SHOULD be shallow and explicit.

A runtime prompt SHOULD be reconstructable without recursively inspecting many hidden parent templates.

If inheritance is used, every inherited component MUST be versioned.

---

## 2.94 Dead prompt detection

The prompt library SHOULD identify prompts with no known production consumers.

Unused prompts SHOULD be reviewed for deprecation.

Dead prompt accumulation creates audit and maintenance risk.

---

## 2.95 Duplicate prompts

Substantially duplicate prompts SHOULD be consolidated when they serve the same contract.

However, teams MUST NOT create an over-generalized mega-prompt solely to eliminate duplication.

Different tasks deserve distinct prompts when their behavior, inputs, outputs, or risk differ materially.

---

## 2.96 Prompt library index

The organization SHOULD provide a searchable inventory containing:

```text id="nz9mgl"
prompt ID
purpose
owner
risk
current version
production status
models
consumers
last change
```

The inventory SHOULD be generated from authoritative metadata where possible.

---

## 2.97 Documentation

Each production prompt SHOULD document:

```text id="zuz92t"
purpose
inputs
output contract
known limitations
model assumptions
tool access
evaluation suite
failure behavior
owner
```

Documentation MUST NOT become a second manually maintained source of the prompt itself.

---

## 2.98 Change proposal

Material prompt changes SHOULD state a hypothesis.

Example:

```text id="a35jxu"
Hypothesis:
Requiring evidence before recommendation will reduce
unsupported recommendations without decreasing answer
completion below the accepted threshold.
```

Evaluations SHOULD test the hypothesis.

---

## 2.99 Emergency changes

Emergency prompt changes MAY use an accelerated approval path.

They MUST still produce:

- immutable version;
- actor;
- reason;
- timestamp;
- deployment record;
- rollback target; and
- post-change evaluation.

An emergency process MUST NOT mean "edit production without history."

---

## 2.100 Incident response

Prompt-related incidents SHOULD be classified alongside software/configuration incidents.

Possible responses include:

```text id="d95g04"
rollback prompt
disable feature
remove tool
restrict model
disable tenant customization
invalidate cache
revert model
```

Incident analysis SHOULD identify the precise prompt/model/tool versions involved.

---

## 2.101 Cache invalidation

Rendered prompt or model-response caches MUST include prompt version in their validity model where a prompt change affects correctness.

A new prompt version SHOULD NOT unknowingly reuse an answer cache generated under a materially different prompt contract.

---

## 2.102 Reproducibility

For a production output requiring auditability, the system SHOULD preserve enough metadata to approximate or reconstruct execution.

Exact response reproduction may remain impossible because model generation can be nondeterministic.

Governance MUST therefore distinguish:

```text id="rh6e0c"
configuration reproducibility
```

from:

```text id="9xvu0h"
byte-identical output reproducibility
```

The first SHOULD be achievable.

---

# 3. Anti-patterns

## 3.1 Prompt in a random string literal

**Anti-pattern:**

```text id="57o51u"
const prompt = "You are a helpful assistant..."
```

buried inside unrelated request code.

**Rule:** Production prompts SHOULD live in identifiable governed modules.

---

## 3.2 Dashboard-only prompt

**Anti-pattern:** Production behavior changes through a vendor UI with no repository diff or release process.

**Rule:** Production prompts MUST have versioned, reviewable governance.

---

## 3.3 `final_prompt_v7_really_final`

**Anti-pattern:** Filename/version naming acts as lifecycle management.

**Rule:** Use stable logical IDs plus immutable formal versions.

---

## 3.4 Version in logical ID

**Anti-pattern:**

```text id="yrmhs9"
support.reply.v17
```

becomes a completely new prompt identity every iteration.

**Rule:** Stable prompt identity and release version MUST remain distinct.

---

## 3.5 Mutable released prompt

**Anti-pattern:** Version 4 is edited after production release.

**Rule:** Released versions MUST be immutable.

---

## 3.6 No owner

**Anti-pattern:** Nobody knows which team owns the production prompt.

**Rule:** Every production prompt MUST have accountable ownership.

---

## 3.7 Sole individual ownership

**Anti-pattern:** Only one employee can understand, approve, or release a critical prompt.

**Rule:** Durable team-level ownership SHOULD exist.

---

## 3.8 No review because "it's only wording"

**Anti-pattern:** Prompt edits bypass software review.

**Rule:** Prompt changes alter application behavior and MUST be reviewed.

---

## 3.9 Untyped interpolation

**Anti-pattern:**

```text id="7brb7m"
prompt += request.body.anything
```

**Rule:** Dynamic inputs MUST be typed/validated and clearly delimited.

---

## 3.10 Whole-object dumping

**Anti-pattern:**

```text id="t8mxl8"
JSON.stringify(customer)
```

is inserted for convenience.

**Rule:** Only task-required fields SHOULD be sent.

---

## 3.11 Secrets in system prompt

**Anti-pattern:**

```text id="787npg"
The production API key is ...
```

**Rule:** Prompts MUST NOT contain secrets.

---

## 3.12 Hidden prompt as security control

**Anti-pattern:** Security depends on attackers never discovering system instructions.

**Rule:** Prompt secrecy MUST NOT be relied upon for authorization or privilege protection.

---

## 3.13 Real production PII in examples

**Anti-pattern:** Few-shot examples use actual customer records.

**Rule:** Examples SHOULD use synthetic/sanitized data.

---

## 3.14 Prompt-only authorization

**Anti-pattern:**

```text id="bh6yi5"
Do not access another tenant.
```

is the only tenant boundary.

**Rule:** Authorization MUST be enforced in application/tool code.

---

## 3.15 Prompt-only tool safety

**Anti-pattern:**

```text id="50yp4t"
Only delete records when appropriate.
```

is considered sufficient protection.

**Rule:** Privileged tools MUST enforce deterministic policy.

---

## 3.16 Untrusted content mixed with instructions

**Anti-pattern:** User text or web content is concatenated directly into trusted system instructions.

**Rule:** Untrusted content MUST be structurally separated.

---

## 3.17 String replacement templating

**Anti-pattern:**

```text id="sde15l"
replace("{{user}}", arbitraryText)
```

with no missing-variable or escaping checks.

**Rule:** Production templates SHOULD use validated typed construction.

---

## 3.18 Giant mega-prompt

**Anti-pattern:** One prompt handles classification, extraction, writing, tool use, policy, and every product workflow.

**Rule:** Distinct contracts SHOULD have distinct governed prompts.

---

## 3.19 Deep prompt inheritance

**Anti-pattern:** Behavior depends on seven hidden fragments across multiple packages.

**Rule:** Prompt composition MUST remain reconstructable.

---

## 3.20 Business rules only in prose

**Anti-pattern:** Refund limit exists only as text inside the prompt.

**Rule:** Enforce critical rules in deterministic code.

---

## 3.21 Exact JSON requested but not validated

**Anti-pattern:** Model prose is parsed optimistically because the prompt said "return JSON."

**Rule:** Machine-consumed output MUST be schema validated.

---

## 3.22 No prompt tests

**Anti-pattern:** Production prompt correctness is established through manual playground use.

**Rule:** Production prompts MUST have automated tests appropriate to risk.

---

## 3.23 Happy-path eval only

**Anti-pattern:** Evaluation includes five normal queries and no adversarial cases.

**Rule:** Evaluation SHOULD include edge, negative, security, and multilingual cases where relevant.

---

## 3.24 Exact-string regression for generative prose

**Anti-pattern:** A useful answer fails because one adjective differs.

**Rule:** Tests SHOULD measure required behavior rather than unnecessary lexical identity.

---

## 3.25 Generic "looks good" evaluation

**Anti-pattern:** Candidate prompt is approved based on a few manually selected examples.

**Rule:** Material changes SHOULD be tested against a representative versioned dataset.

---

## 3.26 Model changed without prompt evaluation

**Anti-pattern:** Model upgrade is treated as infrastructure-only.

**Rule:** Prompt behavior MUST be reevaluated when model behavior changes.

---

## 3.27 Different prompt text per environment

**Anti-pattern:** Developers independently maintain dev, staging, and production copies.

**Rule:** Promote one immutable source artifact with environment configuration.

---

## 3.28 Copy/paste production promotion

**Anti-pattern:** An engineer copies text from staging into a production console.

**Rule:** Promotion SHOULD occur through deployment/version selection.

---

## 3.29 No rollback target

**Anti-pattern:** The team knows the current prompt but cannot identify the last known-good version.

**Rule:** Every release MUST have a rollback path.

---

## 3.30 Rollback only in Git archaeology

**Anti-pattern:** Incident recovery requires reconstructing old prompt text from commits manually.

**Rule:** Production should support explicit known-good version restoration.

---

## 3.31 Changelog says "updated prompt"

**Anti-pattern:** History does not describe behavioral intent.

**Rule:** Changes SHOULD document why behavior changed and expected impact.

---

## 3.32 Silent prompt removal

**Anti-pattern:** Shared prompt disappears while consumers still call it.

**Rule:** Shared prompts MUST follow deprecation and consumer migration.

---

## 3.33 Unknown consumers

**Anti-pattern:** Nobody knows which services use a shared prompt.

**Rule:** Shared prompt dependencies SHOULD be discoverable.

---

## 3.34 Full rendered prompt logging

**Anti-pattern:** Every invocation logs all customer context and system instructions.

**Rule:** Logging MUST apply data minimization and classification.

---

## 3.35 Prompt version missing from telemetry

**Anti-pattern:** Output quality drops, but logs only identify the model.

**Rule:** Runtime telemetry SHOULD include prompt version.

---

## 3.36 Combined "AI version"

**Anti-pattern:**

```text id="psr2fx"
ai_version = 12
```

hides prompt/model/retrieval/tool changes.

**Rule:** Independently changing dimensions SHOULD be identified independently.

---

## 3.37 Direct production edits

**Anti-pattern:** Product manager changes a production prompt without review, versioning, or tests.

**Rule:** Normal prompt changes MUST follow controlled release.

---

## 3.38 Emergency edit without audit

**Anti-pattern:** Incident response overwrites a prompt and destroys evidence.

**Rule:** Emergency changes MUST still create immutable auditable versions.

---

## 3.39 Arbitrary tenant system prompts

**Anti-pattern:** Customers may replace the full system prompt with unrestricted text while retaining privileged tools.

**Rule:** Tenant customization MUST be constrained and security-scoped.

---

## 3.40 Destructive prompt governance without confirmation

**Anti-pattern:** One click immediately promotes an untested prompt or deletes historical state.

**Rule:** Consequential governance actions SHOULD use explicit review/confirmation flows.

---

# 4. Checklist

## 4.1 Prompt library

- [ ] Every production prompt has a stable ID.
- [ ] IDs follow a consistent naming convention.
- [ ] Prompt files are predictably located.
- [ ] Prompt purpose is documented.
- [ ] Prompt category is declared.
- [ ] Shared versus feature-local ownership is clear.
- [ ] Duplicate/dead prompts are periodically reviewed.

## 4.2 Ownership and review

- [ ] Every prompt has a team owner.
- [ ] Repository ownership rules are configured.
- [ ] Risk level is defined.
- [ ] Material changes require review.
- [ ] High-risk prompts require independent approval.
- [ ] Security review is required where appropriate.
- [ ] Emergency-change policy exists.

## 4.3 Versioning

- [ ] Stable prompt identity is separate from version.
- [ ] Released versions are immutable.
- [ ] Exact source/artifact version is reproducible.
- [ ] Prompt version is tracked separately from model version.
- [ ] Model compatibility is documented.
- [ ] Fallback models are evaluated.
- [ ] Shared fragments are versioned.

## 4.4 Prompt-as-code

- [ ] Source is under version control.
- [ ] Changes have readable diffs.
- [ ] CI can render/build prompts.
- [ ] Deployment uses normal release infrastructure.
- [ ] External prompt systems do not bypass governance.
- [ ] Runtime prompt construction is centralized enough to reconstruct.

## 4.5 Parameters and templates

- [ ] Dynamic values use typed parameters.
- [ ] Input schema is explicit.
- [ ] Required variables are validated.
- [ ] Unknown variables are rejected where practical.
- [ ] Parameter names are semantic.
- [ ] Untrusted content is delimited.
- [ ] Role separation is preserved.
- [ ] Conditional sections are controlled by trusted application state.
- [ ] Shared fragments do not create opaque inheritance.

## 4.6 Secrets and sensitive data

- [ ] Prompt source contains no secrets.
- [ ] Security does not depend on prompt secrecy.
- [ ] Examples use synthetic/sanitized data.
- [ ] Runtime PII inclusion is justified.
- [ ] Only required fields are supplied.
- [ ] Full domain objects are not dumped unnecessarily.
- [ ] Prompt logging follows sensitivity rules.
- [ ] External providers are approved for applicable data classes.

## 4.7 Prompt injection and tools

- [ ] Untrusted user content is separated from trusted instructions.
- [ ] Retrieved/external content is treated as untrusted.
- [ ] Authorization is enforced outside the prompt.
- [ ] Tool permissions are enforced in code.
- [ ] Tenant boundaries are deterministic.
- [ ] High-risk actions use required human approval.
- [ ] Adversarial prompt-injection tests exist.
- [ ] System-prompt extraction attempts are tested.
- [ ] Malicious tool requests are tested.

## 4.8 Output contracts

- [ ] Machine-consumed outputs use explicit schemas.
- [ ] Output is validated before business logic uses it.
- [ ] Allowed enum values are controlled.
- [ ] Invalid output has a defined recovery path.
- [ ] Prompt/output schema evolution is compatible with consumers.
- [ ] Critical exact wording is deterministic rather than generative where required.

## 4.9 Testing

- [ ] Prompt has automated tests.
- [ ] Representative fixtures exist.
- [ ] Boundary-size input is tested.
- [ ] Missing/optional data is tested.
- [ ] Malformed data is tested.
- [ ] Adversarial data is tested.
- [ ] Multilingual cases are tested where relevant.
- [ ] Exact-output testing is used only when appropriate.

## 4.10 Evaluations

- [ ] A versioned evaluation dataset exists for material prompts.
- [ ] Baseline version is known.
- [ ] Candidate and baseline use comparable conditions.
- [ ] Task accuracy is measured.
- [ ] Format compliance is measured.
- [ ] Groundedness/citations are measured where relevant.
- [ ] Refusal behavior is measured where relevant.
- [ ] Tool selection is measured where relevant.
- [ ] Security regressions are release blocking.
- [ ] Human evaluation supplements subjective dimensions.

## 4.11 Environments

- [ ] Development, staging, and production are distinct where required.
- [ ] One immutable prompt artifact is promoted.
- [ ] Environment differences use configuration, not edited prompt copies.
- [ ] Secrets remain external in every environment.
- [ ] Staging does not accidentally invoke production tools/resources.
- [ ] Production release requires appropriate approval.

## 4.12 Promotion and rollout

- [ ] CI gates run before release.
- [ ] Evaluation gates run before production.
- [ ] Feature-flag/canary rollout exists where risk warrants it.
- [ ] Production version is recorded.
- [ ] Model version is recorded.
- [ ] Rollout cohorts preserve security equivalence.
- [ ] Deployment is reversible.

## 4.13 Changelog

- [ ] Prompt changes have history.
- [ ] Change reason is documented.
- [ ] Expected behavior change is documented.
- [ ] Evaluation evidence is linked.
- [ ] Compatibility effect is documented.
- [ ] Previous known-good version is identifiable.
- [ ] Change notes describe behavior rather than wording alone.

## 4.14 Rollback

- [ ] Every production prompt has a rollback path.
- [ ] Last known-good prompt version is known.
- [ ] Model/runtime compatibility is considered.
- [ ] Rollback does not require manual text reconstruction.
- [ ] Critical rollback mechanisms are tested.
- [ ] Emergency rollback creates audit history.

## 4.15 Deprecation

- [ ] Deprecated prompts are explicitly marked.
- [ ] Replacement prompt is identified where applicable.
- [ ] Remaining consumers are known.
- [ ] Migration window is defined.
- [ ] New integrations cannot accidentally adopt deprecated prompts.
- [ ] Removal follows retention policy.

## 4.16 Audit

- [ ] Release actor is recorded.
- [ ] Reviewers are recorded.
- [ ] Approval is recorded.
- [ ] Deployment timestamp is recorded.
- [ ] Environment is recorded.
- [ ] Prompt/model versions are recorded.
- [ ] Release/evaluation evidence is retained.
- [ ] Audit records are tamper-resistant.
- [ ] Audit access is permission-controlled.

## 4.17 Runtime observability

- [ ] Prompt version appears in telemetry.
- [ ] Model version appears separately.
- [ ] Tool/retrieval versions appear where relevant.
- [ ] Latency is measured.
- [ ] Token/cost usage is measured.
- [ ] Structured-output failures are measured.
- [ ] Tool-selection rate is measured where applicable.
- [ ] User feedback can be segmented by prompt version.
- [ ] Sensitive payloads are not over-logged.

## 4.18 Governance UI

- [ ] Prompt inventory uses canonical Table/Data Table patterns.
- [ ] Lifecycle state is visible in textual Badges.
- [ ] Risk/security warnings use Alert.
- [ ] Editors have labels and validation.
- [ ] Diff is perceivable without color alone.
- [ ] Release/rollback details use appropriate Dialog/Sheet surfaces.
- [ ] High-risk promotion uses appropriate confirmation.
- [ ] Audit views are keyboard accessible.
- [ ] Empty/loading/error states follow the States Catalogue.

---

# 5. Canonical summary

The following rules define the Gold Standard 2026 baseline.

1. **Production prompts MUST be governed as application behavior, not unmanaged prose.**

2. **Prompt-as-code SHOULD be the default.** Production prompt source belongs in version control with typed inputs, code review, tests, evaluation, deployment, and rollback.

3. **Every production prompt MUST have a stable logical ID and a separate immutable release version.**

4. **Released prompt versions MUST NOT be edited in place.**

5. **Every production prompt MUST have accountable team ownership.**

6. **Material prompt changes MUST be reviewed.** High-risk changes SHOULD require independent domain/security approval.

7. **Prompt risk SHOULD determine review, test, audit, and deployment rigor.**

8. **Prompt and model versions MUST be tracked independently.** A model upgrade can change prompt behavior even when the prompt text is unchanged.

9. **Model changes MUST trigger prompt regression evaluation.**

10. **Dynamic prompt data MUST use typed, validated parameters rather than arbitrary string interpolation.**

11. **Untrusted user, retrieved, uploaded, and external content MUST remain structurally separate from trusted instructions.**

12. **Production prompts MUST NOT contain secrets.**

13. **System-prompt secrecy MUST NOT be treated as a security control.**

14. **Static prompt examples MUST NOT contain unnecessary real PII.**

15. **Runtime PII MUST be minimized and sent only to approved models/providers for authorized purposes.**

16. **Entire application/domain objects SHOULD NOT be serialized into prompts for convenience.**

17. **Prompts MUST NOT enforce authorization, tenant isolation, payment limits, deletion rights, or other critical controls by themselves.**

18. **Tool authorization MUST be implemented in trusted application code using least privilege.**

19. **High-risk model-initiated actions SHOULD require explicit approval according to the Security and Tooling standards.**

20. **Machine-consumed model output MUST be schema validated.**

21. **Every production prompt MUST have automated tests appropriate to its risk.**

22. **Material prompts SHOULD have versioned evaluation suites with representative real-world and adversarial cases.**

23. **Security regressions MUST block release regardless of improvements to style or convenience.**

24. **Prompt evaluations MUST distinguish prompt-version changes from model-version changes.**

25. **Prompt artifacts SHOULD be promoted unchanged across development, staging, and production.**

26. **Environment-specific behavior SHOULD use configuration rather than separately edited prompt copies.**

27. **Manual production editing SHOULD be prohibited for ordinary prompt changes.**

28. **Emergency prompt changes MUST still create immutable versions, audit records, rollback targets, and post-change evaluation.**

29. **Prompt releases SHOULD use feature flags or controlled rollout where risk warrants staged exposure.**

30. **Every release MUST have a rollback path to a known-good prompt/model configuration.**

31. **Changelogs SHOULD describe intended behavior changes, evidence, compatibility, and rollback—not merely wording modifications.**

32. **Shared prompts MUST maintain known consumers so they can be safely changed or deprecated.**

33. **Deprecated prompts MUST be explicitly marked and SHOULD identify their replacement and removal timeline.**

34. **Prompt audit history MUST answer which prompt, version, model, approver, environment, and release changed production behavior.**

35. **Runtime telemetry SHOULD identify prompt, model, retrieval, and tool-configuration versions separately where each can affect behavior.**

36. **Fully rendered prompts MUST NOT be indiscriminately logged.** Auditability does not override data minimization.

37. **Prompt injection MUST be treated as an application-security problem, not something solved purely through better prompt wording.**

38. **Retrieved content and external content MUST be treated as untrusted instructions/data.**

39. **Critical business policy MUST NOT exist only inside prompt prose.**

40. **Prompt composition SHOULD remain shallow, explicit, and reconstructable.**

41. **Large shared fragments MUST trigger regression testing for dependent prompts when changed.**

42. **Few-shot examples SHOULD use representative synthetic or sanitized data.**

43. **Tenant/user customization MUST remain subordinate to system policy, authorization, and tool permissions.**

44. **User-defined instructions MUST remain user-level input and MUST NOT be promoted into trusted system authority.**

45. **Governance tooling SHOULD expose prompt inventory, ownership, risk, versions, diffs, tests, approvals, releases, rollback, deprecation, and audit history.**

46. **shadcn/ui Data Table, Table, Badge, Alert, AlertDialog, Tabs, Command, Dialog, Sheet, ScrollArea, Input, Textarea, Select, Combobox, Skeleton, Spinner, and Empty form the canonical UI primitive baseline for prompt governance interfaces.**

47. **Governance status and diff meaning MUST NOT rely on color alone.**

48. **Production configuration MUST be reproducible even when exact model outputs remain nondeterministic.**

49. **The canonical release unit is not merely a prompt string. It is the combination of prompt version, model version, typed input contract, output contract, tool permissions, relevant retrieval configuration, evaluation evidence, and release metadata.**

50. **The canonical rule is: if a prompt can change production behavior, it MUST be owned, versioned, tested, reviewed, promoted, observable, auditable, and reversible.**

The most consequential governance boundary is **prompt text versus enforceable policy**: authorization, tenant isolation, secrets, destructive-action approval, and business limits remain deterministic application controls even when the model needs those policies described in its instructions. OWASP explicitly treats prompt injection and system-prompt leakage as reasons to keep those controls outside the prompt. citeturn230168search3turn230168search8turn230168search14
