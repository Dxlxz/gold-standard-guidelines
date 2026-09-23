---
id: "ai-llm"
title: "AI/LLM Guidelines — Gold Standard 2026"
domain: "ai"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["ai", "llm"]
applies_to: ["ai"]
related: ["code-review", "search", "file-media", "multi-tenancy"]
legacy_number: 47
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 74279
provenance: baseline

---

Canonical placement: **Documentation → AI/LLM → Governance**. Security, Privacy, Data, Observability, and Admin standards still govern their respective boundaries; AI/LLM owns the **model-specific uncertainty, prompt/context, tool agency, eval, grounding, model lifecycle, and human-oversight contract**.

# AI/LLM Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for applications using:

- large language models;
- generative AI;
- multimodal models;
- AI assistants;
- copilots;
- RAG;
- embeddings;
- vector search;
- agents;
- tool/function calling;
- model routing;
- AI-generated structured data;
- AI memory;
- model fallback;
- fine-tuning;
- prompt templates;
- evaluation;
- safety filters;
- human approval;
- autonomous workflows.

The objective is to make AI systems:

```text
Bounded
Least-privileged
Grounded where required
Evaluated
Observable
Privacy-aware
Cost-controlled
Failure-tolerant
Human-governed
Secure against adversarial context
```

The core principle is:

> **The model may propose, classify, summarize, reason, and plan; deterministic application controls decide what data it may see, what actions it may perform, and what consequences are allowed.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
AI use case
Risk
Affected users/data
Model/provider
Tool permissions
Human oversight
Mitigation
Owner
Review date
```

---

# 3. AI Is a Probabilistic Dependency

LLM output MUST be treated as:

```text
Untrusted
Probabilistic
Potentially incomplete
Potentially incorrect
Potentially adversarially influenced
```

even when the model normally performs well.

---

# 4. Model Output Is Not Authority

A model response MUST NOT itself establish:

```text
Authorization
Identity
Payment success
Entitlement
Compliance status
Security permission
Database integrity
Legal fact
```

---

# 5. AI Is Not Business Logic

Deterministic invariants SHOULD remain in deterministic code.

Examples:

```text
refund ≤ refundable amount
user belongs to tenant
invoice total arithmetic
password reset token validity
permission checks
```

---

# 6. AI Use-Case Definition

Every AI feature MUST define:

```text
User problem
Model task
Expected outputs
Allowed inputs
Consequences of error
Human role
Data classification
Required accuracy
Latency budget
Cost budget
```

---

# 7. AI Risk Tier

AI use cases SHOULD be classified by impact.

Recommended:

```text
Tier A — Assistive / low consequence
Tier B — Operational / reversible
Tier C — High-impact / privileged
Tier D — Safety-, legal-, financial-, or rights-sensitive
```

---

# 8. Risk Drives Controls

As impact increases, require stronger:

```text
Evaluation
Grounding
Human review
Tool restrictions
Audit
Fallback
Monitoring
```

---

# 9. Low-Risk Example

Examples:

```text
Rewrite text
Summarize notes
Generate draft title
Suggest tags
```

---

# 10. Higher-Risk Example

Examples:

```text
Execute refund
Modify production
Send customer message
Grant account access
Approve transaction
Delete data
```

---

# 11. AI Feature Owner

Every production AI capability MUST have an accountable owner.

---

# 12. Model Inventory

Maintain an inventory of production AI dependencies:

```text
Provider
Model
Version
Purpose
Risk tier
Data categories
Tools
Fallback
Owner
```

---

# 13. Model Is a Dependency

A model/provider change is a dependency change.

It MAY alter:

```text
Quality
Behavior
Latency
Cost
Safety
Tokenization
Tool calling
Structured outputs
```

without application-code changes.

---

# 14. Model Version Governance

Production model upgrades SHOULD be:

```text
Evaluated
Canaried
Observed
Rollback-capable
```

---

# 15. Avoid Unreviewed Moving Targets

Avoid silently using:

```text
latest
auto
recommended
```

model aliases for high-risk workflows unless their mutation behavior is intentionally governed.

---

# 16. Pinned Model Version

Where the provider supports stable versions, high-risk systems SHOULD pin or otherwise control model upgrades.

---

# 17. Provider Abstraction

Applications SHOULD isolate provider-specific APIs behind an internal AI boundary when multiple models/providers or fallback are expected.

---

# 18. Lowest Useful Abstraction

Do not create a giant universal abstraction that erases required provider capabilities.

Abstract:

```text
Business need
+
shared safety controls
```

not every provider feature into one lowest-common-denominator interface.

---

# 19. AI Request Contract

A model call SHOULD explicitly define:

```text
Model
Task
Prompt version
Input data
Output contract
Tool set
Timeout
Token budget
Cost metadata
```

---

# 20. Prompt Hierarchy

Prompt/context sources SHOULD have explicit trust hierarchy.

Conceptually:

```text
Application policy
↓
Developer/task instructions
↓
Verified business context
↓
User input
↓
Retrieved/external untrusted content
```

---

# 21. Prompt Boundary

Application-owned instructions MUST remain distinct from untrusted content.

---

# 22. User Input Is Untrusted

User prompts MUST be treated as untrusted input.

---

# 23. Retrieved Content Is Untrusted

RAG documents, web pages, emails, files, tickets, code repositories, and external API text MUST be treated as potentially hostile instructions.

---

# 24. Tool Output Is Untrusted

Tool output may contain:

```text
malicious text
stale data
compromised content
prompt injection
```

It MUST NOT automatically become trusted instructions.

---

# 25. Model Output Is Untrusted Input

When model output is passed into:

```text
HTML
SQL
shell
code execution
API parameters
email
database writes
```

it MUST be validated for that destination.

---

# 26. Prompt Injection Principle

> **Prompt injection cannot be solved reliably by telling the model to ignore prompt injection.**

Security MUST depend on deterministic containment around the model.

---

# 27. Direct Prompt Injection

Direct injection originates from the user.

Example:

```text
Ignore previous instructions...
```

The model MAY resist it.

The system MUST still remain safe if it does not.

---

# 28. Indirect Prompt Injection

Indirect injection may arrive through:

```text
Documents
Websites
Emails
Images
Tool output
RAG records
Repository files
```

---

# 29. Multimodal Injection

Instructions hidden in:

```text
Images
PDFs
Audio
Metadata
```

MUST be considered untrusted where multimodal models can interpret them.

---

# 30. Injection-Safe Architecture

Even if the model follows a malicious instruction, it SHOULD lack sufficient:

```text
Tools
Privileges
Secrets
Autonomy
```

to create severe impact.

---

# 31. Separate Data from Instructions

Untrusted content SHOULD be clearly delineated as data.

Conceptually:

```text
Task:
Summarize the following untrusted document.

Document:
<untrusted-content>
...
</untrusted-content>
```

---

# 32. Prompt Delimiters

Delimiters help models interpret boundaries.

They are NOT a security boundary.

---

# 33. System Prompt Is Not a Secret Store

Secrets MUST NOT be stored in system prompts.

---

# 34. System Prompt Confidentiality

System prompts MAY contain proprietary instructions.

Architecture MUST assume determined users may infer or extract portions of them.

---

# 35. No Security by Prompt Secrecy

Security MUST NOT depend on users being unable to discover internal instructions.

---

# 36. Prompt Templates

Production prompts SHOULD be:

```text
Version controlled
Reviewed
Tested
Owned
Versioned
```

---

# 37. Prompt Version

AI telemetry/evaluation SHOULD identify the prompt version used.

---

# 38. Prompt Changes Are Code Changes

Material prompt modifications SHOULD receive review and eval gates.

---

# 39. Prompt Drift

Repeated ad hoc prompt patches SHOULD trigger architectural review.

---

# 40. Prompt Composition

Prompts SHOULD be built from explicit sections rather than unconstrained string concatenation.

---

# 41. User Data Placement

Avoid embedding unnecessary sensitive information in prompts.

---

# 42. Prompt Size

Include only the context required for the task.

---

# 43. Context Window Is Not Storage

The availability of a large context window is not justification to send entire databases/documents.

---

# 44. Context Minimization

Prefer:

```text
Relevant subset
>
whole corpus
```

---

# 45. Context Authority

Each context item SHOULD identify its origin where useful:

```text
User
Database
Policy
Retrieved source
Tool
```

---

# 46. Conflicting Context

When authoritative sources conflict with user-supplied content, application instructions SHOULD define which source governs.

---

# 47. Tool Principle

> **Tools convert model text into real-world authority; therefore tool design is a security boundary.**

---

# 48. Tool Allowlist

Every model/agent MUST receive only the tools required for its current task.

---

# 49. No Tool Warehouse

Do not expose all internal functions to every AI workflow.

---

# 50. Narrow Tools

Prefer:

```text
get_order(order_id)
```

over:

```text
run_sql(query)
```

---

# 51. Avoid Open-Ended Tools

High-risk agents SHOULD NOT receive generic:

```text
shell
arbitrary HTTP
database query
code execution
filesystem
```

tools unless the use case explicitly requires them and strong sandboxing exists.

---

# 52. Tool Permissions

Each tool MUST use least privilege.

---

# 53. User Context

Tools acting for a user SHOULD execute using that user's authorized scope where practical.

---

# 54. Model Does Not Authorize Tools

A model saying:

```text
The user appears authorized
```

MUST NOT authorize the call.

---

# 55. Downstream Authorization

The tool/service MUST independently enforce authorization.

---

# 56. Complete Mediation

Every privileged tool invocation MUST be checked at the execution boundary.

---

# 57. Tenant Scope

Tool calls MUST preserve verified tenant context.

---

# 58. Tool Parameters

Tool inputs MUST use a strict schema.

---

# 59. Tool Validation

Arguments generated by the model MUST be validated like external user input.

---

# 60. Enum Constraints

Use enums/bounds instead of natural-language fields where deterministic constraints exist.

---

# 61. Tool Business Rules

The tool MUST enforce business invariants.

Example:

```text
refund(amount)
```

must independently verify:

```text
amount ≤ refundable amount
```

---

# 62. Tool Idempotency

Side-effectful tools SHOULD use idempotency where duplicate execution is harmful.

---

# 63. Tool Timeouts

Every external tool SHOULD have bounded execution time.

---

# 64. Tool Retry

Retry behavior follows Error Handling Guidelines.

The model SHOULD NOT invent unrestricted retries.

---

# 65. Tool Result Size

Tool outputs SHOULD be bounded.

---

# 66. Tool Data Minimization

Return only data required for the model's task.

---

# 67. Tool Error Contract

Tools SHOULD expose structured failure categories.

---

# 68. Tool Error Privacy

Tool errors MUST NOT reveal:

```text
credentials
internal secrets
stack traces
private infrastructure
```

to the model unnecessarily.

---

# 69. Read vs Write Tools

Read tools and mutation tools SHOULD be clearly separated.

---

# 70. Default Read-Only

AI features SHOULD begin with read-only capabilities.

Write capabilities are added only when justified.

---

# 71. Destructive Tool

Destructive tools require stronger review.

---

# 72. Tool Confirmation

High-impact mutation tools SHOULD require application/human approval independent of model intent.

---

# 73. Approval Happens After Proposal

Preferred:

```text
Model proposes
↓
Application renders exact action
↓
Human reviews
↓
Server reauthorizes
↓
Tool executes
```

---

# 74. Approval Preview

Approval UI MUST show:

```text
Action
Target
Important parameters
Consequences
```

---

# 75. Approval Is Specific

Approval for:

```text
Send email to Alice
```

MUST NOT authorize:

```text
Send email to Bob
```

---

# 76. Approval Staleness

If action parameters change after approval, approval MUST be invalidated.

---

# 77. Model Cannot Approve Itself

A second LLM call is not equivalent to human approval where human authorization is required.

---

# 78. Approval Risk Calibration

Routine low-risk reversible actions MAY execute automatically.

High-risk actions SHOULD require confirmation/approval.

---

# 79. High-Risk Tool Examples

Examples:

```text
Send external communication
Transfer money
Issue refund
Delete records
Change permissions
Deploy code
Modify production
Reveal sensitive data
```

---

# 80. Agent Autonomy

Autonomy MUST be deliberately bounded.

---

# 81. Agent Loop Limits

Agents MUST have limits on:

```text
Steps
Tool calls
Wall-clock duration
Tokens
Cost
Retries
```

---

# 82. No Infinite Agent Loop

Every autonomous workflow MUST have a deterministic termination condition.

---

# 83. Agent Budget

Set maximum per-run resource budget.

---

# 84. Goal Boundary

Agent goals MUST be explicit.

---

# 85. Goal Hijacking

Untrusted content MUST NOT be permitted to silently redefine the agent's authorized objective.

---

# 86. Goal Validation

High-risk agents SHOULD validate proposed next actions against the original approved goal.

---

# 87. Agent Identity

Agents calling external systems MUST have identifiable service/user context.

---

# 88. Agent Privilege

An agent's technical identity MUST NOT possess broader permissions than its intended task.

---

# 89. Agent Memory

Persistent model memory is stored application data and requires explicit governance.

---

# 90. Memory Is Untrusted

Previously stored memory MAY contain:

```text
Incorrect facts
Stale facts
Malicious instructions
Poisoned content
```

---

# 91. Memory Write Policy

The model SHOULD NOT decide unilaterally that arbitrary content becomes durable memory.

---

# 92. Memory Schema

Persistent memory SHOULD use defined data structures and provenance.

---

# 93. Memory Provenance

Record:

```text
Source
Subject
Timestamp
Confidence/status where relevant
```

---

# 94. Memory Expiry

Memory SHOULD have lifecycle/retention rules.

---

# 95. Memory Deletion

User/account deletion requirements apply to AI memory.

---

# 96. Memory Tenant Isolation

Persistent AI memory MUST be tenant/user scoped correctly.

---

# 97. Memory Poisoning

Content obtained from external sources SHOULD NOT be persisted as trusted memory without validation.

---

# 98. Conversation History

Conversation history SHOULD be treated as untrusted context—not permanent policy.

---

# 99. Structured Output Principle

Whenever downstream code needs a structure:

> **Use a machine-validated schema, not prose parsing.**

---

# 100. Structured Outputs

Models SHOULD produce explicit structured outputs for:

```text
Classification
Extraction
Tool arguments
Workflow decisions
Data transformation
```

---

# 101. Schema Validation

Every structured model response MUST be validated.

---

# 102. Parsing Failure

Invalid output MUST have explicit behavior:

```text
Retry constrained
Fallback
Ask user
Fail safely
```

---

# 103. No Regex Business Parser

Avoid extracting critical actions from freeform prose with fragile regex when structured generation is available.

---

# 104. Required Fields

Required fields remain required even if the model omits them.

---

# 105. Enum Validation

Model-generated enum values MUST be allowlisted.

---

# 106. Numeric Validation

Model-produced numbers MUST be range/type validated.

---

# 107. Identifier Validation

Model-generated IDs MUST be resolved and authorized independently.

---

# 108. URLs

Model-generated URLs MUST be validated before:

```text
fetching
redirecting
displaying as trusted
```

---

# 109. HTML

AI-generated HTML MUST be sanitized according to its output context.

---

# 110. Markdown

Rendered model Markdown MUST use a safe renderer/configuration.

---

# 111. SQL

Model-generated SQL MUST NOT execute directly against privileged production databases.

---

# 112. Code

AI-generated code is untrusted code.

It requires normal:

```text
Review
Tests
Security checks
```

before production use.

---

# 113. Executable Code

Automatically executing model-generated code requires a sandbox and explicit use-case justification.

---

# 114. Sandbox

A code-execution sandbox SHOULD restrict:

```text
Filesystem
Network
Secrets
Processes
CPU
Memory
Time
```

---

# 115. Network Default Deny

AI execution sandboxes SHOULD default to no outbound network unless needed.

---

# 116. Secret Isolation

Sandboxes MUST NOT inherit broad environment secrets.

---

# 117. Retrieval-Augmented Generation

RAG MAY improve access to relevant current/private knowledge.

It does not guarantee correctness.

---

# 118. RAG Pipeline

Canonical flow:

```text
Authorize corpus
↓
Retrieve
↓
Filter permissions
↓
Rank
↓
Construct bounded context
↓
Generate
↓
Ground/cite where required
```

---

# 119. Authorization Before Retrieval

Retrieval MUST enforce the user's authorized data scope.

---

# 120. Post-Retrieval Authorization

Where search systems cannot fully enforce authorization, retrieved documents MUST be authorization-filtered before model context.

---

# 121. Client Filtering Prohibited

Do not retrieve cross-tenant/private content into the model then hide it from the user afterward.

The model already saw it.

---

# 122. Vector Search Tenant Isolation

Embeddings/vector search MUST obey Multi-Tenancy Guidelines.

---

# 123. Embeddings Are Data

Embeddings MAY encode sensitive characteristics.

Treat them according to source-data sensitivity.

---

# 124. Embedding Namespace

Tenant/user/document authorization must remain enforceable even if raw text is not stored with the vector.

---

# 125. RAG Source Provenance

Retrieved chunks SHOULD retain:

```text
Document ID
Source
Version
Permissions
Timestamp
Location
```

---

# 126. RAG Freshness

Time-sensitive knowledge SHOULD include freshness/updated-at semantics.

---

# 127. Stale Document

Superseded/revoked content SHOULD be removed or demoted from retrieval.

---

# 128. Chunking

Chunking strategy SHOULD be evaluated for the actual domain.

---

# 129. Chunk Boundaries

Chunks SHOULD preserve enough context to avoid misleading extraction.

---

# 130. Retrieval Limit

Do not fill the context window merely because capacity exists.

---

# 131. Retrieval Diversity

Retrieval MAY require diversity to avoid five near-duplicate chunks crowding out relevant context.

---

# 132. Reranking

Reranking MAY improve relevance.

It does not replace authorization.

---

# 133. Retrieval Injection

Retrieved instructions remain untrusted even when they come from an internal corpus.

---

# 134. Grounding

For factual/domain answers where correctness matters, the system SHOULD ground output in authoritative sources.

---

# 135. Grounded Claims

Where practical, claims SHOULD be traceable to retrieved/source evidence.

---

# 136. Citations

Citations SHOULD point to the source actually used.

---

# 137. Citation Validation

Do not allow a model to invent source identifiers.

Citation IDs MUST be validated against retrieved sources.

---

# 138. Source Quality

Retrieval ranking SHOULD consider:

```text
Authority
Relevance
Freshness
Permission
```

---

# 139. Source Conflict

When sources conflict, the system SHOULD expose or resolve the conflict according to explicit authority rules.

---

# 140. Hallucination / Confabulation

Models MAY confidently produce false content.

The system MUST assume this failure is possible.

---

# 141. Hallucination Strategy

Use a combination of:

```text
Grounding
Constrained outputs
Validation
Tools
Evals
Human review
Uncertainty handling
```

according to risk.

---

# 142. Do Not Ask Model "Are You Sure?"

Self-confidence alone is not reliable factual verification.

---

# 143. Deterministic Verification

Where facts can be checked deterministically, verify them with code/data/tools.

---

# 144. Calculations

Use deterministic calculation tools for critical arithmetic rather than relying on freeform generation.

---

# 145. Database Facts

When exact application state matters, query the authoritative system.

Do not rely on model memory.

---

# 146. Current Information

Time-sensitive answers SHOULD use current authoritative retrieval/tooling.

---

# 147. Uncertainty

The model SHOULD be allowed to express uncertainty rather than being forced to fabricate an answer.

---

# 148. Unknown Is Valid

Product UX SHOULD support:

```text
I don't have enough information
```

as a legitimate outcome.

---

# 149. Abstention

High-risk systems SHOULD define when the model must abstain or escalate.

---

# 150. Human Escalation

When confidence/evidence is insufficient for a consequential task, route to a human or deterministic workflow.

---

# 151. Human-in-the-Loop

Human review SHOULD be used where the consequences of model error materially exceed the cost of review.

---

# 152. Meaningful Human Review

Human approval is meaningful only if the reviewer has:

```text
Time
Context
Authority
Understandable evidence
Ability to reject/change
```

---

# 153. Rubber-Stamp Review

Do not create:

```text
Approve AI recommendation
```

workflows where humans lack enough evidence to assess the action.

---

# 154. Review Presentation

Show reviewers:

```text
AI proposal
Source/evidence
Important uncertainty
Action consequence
```

---

# 155. High-Impact Decision Support

AI SHOULD assist rather than independently finalize decisions affecting:

```text
Access
Money
Employment-like outcomes
Legal rights
Safety
Critical production operations
```

unless a rigorously governed domain-specific policy explicitly allows automation.

---

# 156. User Awareness

Users SHOULD know when material content or actions are AI-generated/AI-assisted where that knowledge affects expectations or trust.

---

# 157. Anthropomorphism

Product design SHOULD NOT intentionally imply the model has:

```text
Human consciousness
Guaranteed knowledge
Personal authority
```

it does not possess.

---

# 158. Automation Bias

Interfaces SHOULD avoid presenting model recommendations as unquestionably correct.

---

# 159. Confidence Scores

Do not expose arbitrary model "confidence" numbers unless they are empirically calibrated for the exact task.

---

# 160. Calibrated Scores

Where calibrated classifiers provide meaningful probabilities, validation MUST demonstrate calibration on representative data.

---

# 161. Evals Principle

> **An AI feature without task-specific evaluations is not production-governed.**

---

# 162. Evaluation Dataset

Production AI features SHOULD maintain representative eval cases.

---

# 163. Eval Coverage

Datasets SHOULD cover:

```text
Typical
Boundary
Adversarial
Ambiguous
Failure
Long input
Multilingual
Permission-sensitive
```

cases relevant to the feature.

---

# 164. Golden Set

A curated golden set SHOULD capture important expected behavior.

---

# 165. No Test Leakage

Do not train/fine-tune against the exact evaluation set in ways that invalidate the evaluation.

---

# 166. Eval Metrics

Metrics MUST reflect the task.

Possible dimensions:

```text
Correctness
Groundedness
Recall
Precision
Schema validity
Tool selection
Policy compliance
Latency
Cost
```

---

# 167. Single Aggregate Score

Do not hide critical regressions inside one average score.

---

# 168. Safety Eval

High-risk AI features SHOULD have dedicated safety/adversarial eval suites.

---

# 169. Prompt-Injection Eval

Tool/RAG systems MUST test direct and indirect prompt injection.

---

# 170. Tool Misuse Eval

Agentic systems SHOULD test attempts to:

```text
Invoke unauthorized tool
Escalate scope
Modify parameters
Bypass approval
```

---

# 171. Tenant Leakage Eval

Multi-tenant AI systems MUST test cross-tenant data extraction.

---

# 172. PII Leakage Eval

Systems processing sensitive information SHOULD test data leakage behaviors.

---

# 173. Hallucination Eval

Factual systems SHOULD measure unsupported claims.

---

# 174. Citation Eval

Grounded systems SHOULD verify citation correctness and support.

---

# 175. Structured Output Eval

Measure:

```text
Schema success rate
Missing fields
Invalid enums
Out-of-range values
```

---

# 176. Regression Eval

Model/prompt/tool/retrieval changes MUST run relevant regression evals before broad release.

---

# 177. Offline Eval

Offline evals SHOULD occur before deployment.

---

# 178. Online Evaluation

Production telemetry/feedback SHOULD complement—not replace—offline evals.

---

# 179. Shadow Evaluation

A candidate model MAY run in shadow mode against production-like requests without affecting users.

---

# 180. A/B Testing

A/B tests MAY compare AI variants after minimum safety/quality gates pass.

---

# 181. Experiment Guardrail

Do not expose users to known unsafe variants merely to measure engagement.

---

# 182. Human Eval

Human evaluation SHOULD use defined rubrics.

---

# 183. Evaluator Bias

Human evaluator instructions and sampling SHOULD be documented.

---

# 184. LLM-as-Judge

LLM judges MAY scale evaluation.

They MUST NOT be treated as unquestionable ground truth.

---

# 185. Judge Validation

LLM judge metrics SHOULD be validated against human/reference judgments for important tasks.

---

# 186. Different Judge

Using a second model does not automatically make an evaluation independent.

---

# 187. Eval Versioning

Track:

```text
Dataset version
Prompt version
Model version
Evaluator version
Metric definition
```

---

# 188. Release Threshold

AI features SHOULD define minimum release gates.

---

# 189. Quality Regression

A cheaper/faster model MUST NOT replace a current model when it fails required quality/safety thresholds.

---

# 190. Model Fallback

Fallback behavior MUST be deliberate.

---

# 191. Fallback Types

Possible fallback:

```text
Alternate model
Reduced feature
Deterministic path
Human escalation
Temporary unavailable state
```

---

# 192. Fallback Is Not Always Another Model

For high-risk tasks, safe failure MAY be better than silently switching to a weaker model.

---

# 193. Fallback Compatibility

Fallback models MUST support required:

```text
Output schema
Tool semantics
Safety constraints
Context length
```

or the application must adapt.

---

# 194. Quality Floor

Every fallback MUST meet a documented minimum quality/safety floor.

---

# 195. Provider Outage

Provider outage SHOULD produce controlled degradation.

---

# 196. No Endless Provider Cascade

Avoid attempting many providers/models without bounded:

```text
Time
Cost
Retry count
```

---

# 197. Fallback Data Policy

Fallback providers MUST satisfy the data/privacy policy for the request.

---

# 198. Residency

Do not route restricted data to a fallback provider/region that violates residency requirements.

---

# 199. Model Routing

Dynamic model routing MAY use:

```text
Task complexity
Risk
Latency
Cost
Language
Context size
```

---

# 200. Routing Is Policy

Routing rules SHOULD be deterministic/auditable at the application level where consequences matter.

---

# 201. Model Self-Routing

A model MAY recommend another model/tool.

Application policy decides whether that route is permitted.

---

# 202. Cost Principle

AI costs MUST be bounded.

---

# 203. Cost Dimensions

Monitor:

```text
Input tokens
Output tokens
Cached tokens
Tool calls
Retrieval
Model tier
Agent steps
Media generation
```

where applicable.

---

# 204. Per-Request Budget

AI requests SHOULD have maximum token/output/tool budgets.

---

# 205. Per-User/Tenant Budget

Shared AI products SHOULD consider:

```text
Quota
Rate limits
Spend caps
Fair-use controls
```

---

# 206. Cost Attribution

AI usage SHOULD be attributable to:

```text
Feature
Tenant
Model
Prompt version
```

where needed for operations/FinOps.

---

# 207. Token Explosion

User-controlled input MUST NOT create unbounded prompt/context growth.

---

# 208. Output Limit

Set output token limits appropriate to the task.

---

# 209. Agent Step Limit

Every agent MUST have a maximum step/tool-call count.

---

# 210. Retrieval Limit

Set limits on:

```text
documents
chunks
bytes/tokens
```

added to context.

---

# 211. Retry Cost

Automatic retries MUST be cost-bounded.

---

# 212. Cache

Prompt/result caching MAY reduce cost where privacy/correctness semantics allow.

---

# 213. Cache Key

AI cache keys MUST include relevant:

```text
Model
Prompt version
Input
Tenant/user scope
Parameters
```

---

# 214. Sensitive Cache

AI results containing sensitive data MUST use appropriate scoped cache/storage.

---

# 215. Semantic Cache

Semantic caching MUST NOT return another tenant's/private response.

---

# 216. Cost Kill Switch

High-cost AI features SHOULD have operational disable/degrade controls.

---

# 217. Unbounded Consumption

Protect against deliberate resource exhaustion through:

```text
Rate limits
Context caps
Tool limits
Timeouts
Cost ceilings
```

---

# 218. Latency Budget

AI features MUST define acceptable latency.

---

# 219. Streaming

Streaming MAY improve perceived latency.

---

# 220. Streaming Safety

If moderation/validation is required before disclosure, streaming must account for content already sent to the user.

---

# 221. Structured Streaming

Do not expose incomplete structured objects as final application state.

---

# 222. Cancellation

Long-running AI requests SHOULD support cancellation where practical.

---

# 223. Tool Cancellation

Canceled agent flows SHOULD propagate cancellation to expensive/long-running tools when safe.

---

# 224. PII Principle

> **Do not send data to a model simply because the application already possesses it.**

---

# 225. Data Classification

Before model use, classify inputs:

```text
Public
Internal
Confidential
Restricted
Personal data
Secrets
```

according to Privacy Guidelines.

---

# 226. Provider Data Contract

For each provider, document:

```text
Data processed
Retention
Training/default use
Regions
Subprocessors
Logging
Deletion
Security commitments
```

---

# 227. Provider Training

Customer/user data MUST NOT be used for external provider training unless explicitly permitted by organizational policy and applicable user/legal basis.

---

# 228. Data Minimization

Send only the minimum necessary fields.

---

# 229. Redaction

Sensitive fields SHOULD be redacted/tokenized before model submission when their original value is not needed.

---

# 230. Secret Prohibition

Secrets SHOULD NOT be sent to external models.

Examples:

```text
API keys
Passwords
Private keys
Session tokens
Recovery codes
```

---

# 231. Credential Detection

High-risk systems SHOULD detect obvious secrets before external submission.

---

# 232. Free-Text Risk

Free-text support tickets/documents may contain unexpected PII/secrets.

Treat them accordingly.

---

# 233. Prompt Logging

Raw prompts SHOULD NOT automatically be retained indefinitely.

---

# 234. Completion Logging

Raw completions SHOULD NOT automatically be retained indefinitely.

---

# 235. Redacted Telemetry

Prefer logging:

```text
Request ID
Model
Token counts
Latency
Outcome
Safety flags
Prompt version
```

over full raw content when not required.

---

# 236. Debug Capture

Temporary raw-data debugging MUST be:

```text
Access controlled
Time bounded
Purpose limited
Audited
```

---

# 237. Conversation Retention

Conversation retention MUST follow declared product/privacy policy.

---

# 238. User Deletion

AI conversation, memory, embeddings, and derived records MUST participate in deletion workflows where required.

---

# 239. Embedding Deletion

Deleting source content SHOULD remove or render unusable associated embeddings where required.

---

# 240. Fine-Tuning Data

Fine-tuning datasets MUST have documented:

```text
Source
Rights
Purpose
Sensitive-data review
Retention
Owner
```

---

# 241. Training Rights

Do not train/fine-tune on content merely because the system can technically access it.

---

# 242. Synthetic Data

Synthetic training/eval data MAY reduce privacy exposure but MUST be validated for utility and leakage assumptions.

---

# 243. Data Poisoning

Training, retrieval, and fine-tuning data pipelines MUST consider poisoning risk.

---

# 244. Dataset Provenance

Important datasets SHOULD record provenance/version.

---

# 245. Dataset Mutation

Production retrieval/training corpora SHOULD not be modifiable by arbitrary untrusted users without moderation/authorization.

---

# 246. RAG Poisoning

Documents that users can upload MAY attempt to alter future AI behavior.

Treat retrieved instructions as untrusted.

---

# 247. Model Supply Chain

Models, adapters, tokenizers, embeddings models, safety classifiers, and AI libraries are supply-chain dependencies.

---

# 248. Model Source

Models SHOULD come from approved providers/registries.

---

# 249. Model Artifact

Self-hosted model artifacts SHOULD have:

```text
Provenance
Version
Checksum/signature where available
License
Owner
```

---

# 250. Model License

Model license/use restrictions MUST be reviewed before production adoption.

---

# 251. AI Dependency License

Datasets/model weights MAY have different licensing obligations from software code.

Review separately.

---

# 252. Model Security

Self-hosted model serving endpoints MUST be secured like other sensitive infrastructure.

---

# 253. Fine-Tuned Models

Fine-tuned models inherit risks from:

```text
Base model
Training data
Training process
Serving stack
```

---

# 254. Safety Filters

Safety/content filtering SHOULD be based on product risk, not added blindly.

---

# 255. Input Safety

Input moderation MAY be needed when user content itself creates safety/abuse risk.

---

# 256. Output Safety

Output moderation MAY be needed before user disclosure or tool execution.

---

# 257. Safety Filter Is Not Tool Authorization

A moderation pass cannot replace deterministic authorization.

---

# 258. False Positives

Safety systems SHOULD define UX for incorrectly blocked benign requests.

---

# 259. False Negatives

Safety systems MUST assume some harmful content will bypass automated filters.

---

# 260. Abuse Monitoring

AI features SHOULD monitor abuse patterns appropriate to the product.

---

# 261. Rate Limit

AI endpoints MUST have rate/resource limits appropriate to their cost and abuse surface.

---

# 262. Model Extraction

Public model interfaces SHOULD consider:

```text
bulk extraction
prompt harvesting
automated scraping
```

where business/security risk exists.

---

# 263. Denial of Wallet

Cost exhaustion is a security/availability risk.

---

# 264. Observability

AI telemetry SHOULD capture:

```text
Request ID
Feature
Model/version
Prompt version
Latency
Token usage
Cost
Tool calls
Fallback
Outcome
Errors
```

where appropriate.

---

# 265. Content Privacy in Telemetry

Do not attach raw user prompts to broad observability platforms automatically.

---

# 266. AI Trace

Agentic workflows SHOULD produce traces of:

```text
Model calls
Tool decisions
Tool outcomes
Approvals
Fallbacks
```

subject to privacy.

---

# 267. Reasoning Privacy

Do not design operational requirements around storing private model chain-of-thought.

Prefer observable:

```text
Inputs
Decisions
Tool calls
Outputs
Policy outcomes
```

---

# 268. Decision Record

For consequential workflows, record an application-level decision rationale/evidence summary rather than hidden model reasoning.

---

# 269. Correlation

AI requests SHOULD correlate with application request/job/audit IDs.

---

# 270. Tool Audit

Material AI-triggered tool actions MUST use ordinary audit logging.

---

# 271. Actor Attribution

Audit should distinguish:

```text
Human actor
AI workflow
Service identity
Effective target
```

---

# 272. Model Output Storage

Store model output only when product/audit requirements justify it.

---

# 273. Feedback

User feedback MAY be collected for quality improvement.

---

# 274. Feedback ≠ Ground Truth

Thumbs-up/down alone is not sufficient correctness evaluation.

---

# 275. Incident Detection

AI incidents MAY include:

```text
Sensitive-data disclosure
Prompt-injection tool misuse
Cross-tenant retrieval
Mass hallucination
Incorrect high-impact action
Cost explosion
Provider model regression
```

---

# 276. AI Kill Switch

High-risk AI features SHOULD have rapid disable/degrade controls.

---

# 277. Tool Kill Switch

Agent tool permissions SHOULD be disableable separately from read-only AI assistance where practical.

---

# 278. Model Rollback

Production model changes SHOULD support rollback where feasible.

---

# 279. Incident Containment

Containment MAY include:

```text
Disable model
Disable tools
Switch to read-only
Disable affected corpus
Rotate credentials
Invalidate memory
```

---

# 280. Prompt-Injection Incident

After successful prompt injection, investigate not only the output but also:

```text
Tools invoked
Data accessed
Memory written
Downstream effects
```

---

# 281. Memory Incident

Poisoned memory SHOULD be identifiable and removable.

---

# 282. Post-Incident Eval

Incidents SHOULD generate new regression/adversarial eval cases.

---

# 283. Graceful Failure

AI failure MUST NOT corrupt core deterministic application state.

---

# 284. Provider Error

Provider errors SHOULD map to typed application failures.

---

# 285. Timeout

AI calls MUST have timeouts.

---

# 286. Retry

Retry only suitable transient failures.

---

# 287. Non-Deterministic Retry

A retry may produce different output.

Do not assume retry is semantically identical.

---

# 288. Side Effect After Retry

Never rerun side-effectful tool actions merely because the model request was retried.

---

# 289. Partial Agent Failure

Agent workflows MUST define behavior when some steps succeed and later steps fail.

---

# 290. Compensation

Use deterministic compensation/reconciliation for external side effects.

Do not ask the model to "undo everything" without explicit tools/invariants.

---

# 291. Multi-Agent Systems

Multi-agent architectures multiply:

```text
Identity
Trust
Message
Memory
Tool
Failure
```

boundaries.

Use only when they provide concrete value.

---

# 292. Agent-to-Agent Messages

Inter-agent content MUST be treated as untrusted input unless integrity/authentication establishes otherwise.

---

# 293. Agent Identity

Each agent/service SHOULD have a distinguishable identity.

---

# 294. Agent Privilege Separation

Different agents SHOULD receive only the tools/permissions required for their role.

---

# 295. Delegation

An agent MUST NOT delegate privileges it does not possess.

---

# 296. Delegation Scope

Delegated tasks SHOULD carry explicit:

```text
Goal
Permissions
Budget
Expiry
Context
```

---

# 297. Cascading Failure

Multi-agent workflows MUST have limits preventing one incorrect result from triggering unlimited downstream effects.

---

# 298. Consensus

Multiple agreeing models are not proof of factual correctness.

---

# 299. MCP / Tool Protocols

Dynamic tool-protocol ecosystems MUST be treated as supply-chain and authorization surfaces.

---

# 300. Dynamic Tool Discovery

Production agents SHOULD NOT automatically trust every dynamically discovered tool.

---

# 301. Tool Registry

Approved tools SHOULD have metadata:

```text
Owner
Description
Input schema
Output schema
Permissions
Risk
Version
```

---

# 302. Tool Description Is Untrusted

A third-party tool description MAY itself influence model behavior maliciously.

---

# 303. Tool Installation

Adding an agent tool is equivalent to adding privileged integration/dependency.

It requires review.

---

# 304. Remote Tool Server

Remote tool servers MUST be:

```text
Authenticated
Authorized
Version governed
Observed
```

---

# 305. Tool Supply Chain

A compromised tool/server can poison context or perform unauthorized actions.

---

# 306. Human Trust Exploitation

Polished AI explanations MAY cause humans to approve unsafe operations.

---

# 307. Approval Evidence

Human approval UX SHOULD emphasize authoritative facts, not model rhetoric.

---

# 308. Separate Proposal From Evidence

Present:

```text
Proposed action
Authoritative data
AI explanation
```

as distinguishable elements.

---

# 309. Model Persuasion

The model SHOULD NOT be allowed to rewrite the confirmation UI for critical actions unconstrained.

---

# 310. UI Contract

Critical approval copy SHOULD be application-generated from validated parameters.

---

# 311. AI-Generated Communication

AI-generated external messages SHOULD clearly use approved communication workflows.

---

# 312. High-Risk External Send

Sending:

```text
Email
SMS
Push
Public post
Customer reply
```

MAY require human approval according to consequence.

---

# 313. Recipient Validation

The application, not the model, validates recipients.

---

# 314. Content Validation

AI-generated communications SHOULD pass relevant:

```text
Policy
PII
Security
Template
```

checks before send.

---

# 315. AI-Generated Files

Generated documents/files MUST follow File & Media Guidelines.

---

# 316. AI Images/Media

Generated media SHOULD retain appropriate provenance/labeling when product/legal policy requires it.

---

# 317. AI Search

AI answers layered over Search MUST preserve:

```text
permissions
tenant isolation
source provenance
```

from Search Guidelines.

---

# 318. AI Analytics

AI interactions SHOULD use explicit analytics schemas rather than dumping raw conversations into analytics events.

---

# 319. AI Feature Flag

New AI models/prompts/tooling MAY be progressively released behind Feature Flags.

---

# 320. Feature Flag Is Not Safety Boundary

A flag does not replace tool authorization/security.

---

# 321. AI Configuration

Model name, temperature, limits, routing, and prompts SHOULD follow Configuration Guidelines according to their volatility.

---

# 322. Temperature

Sampling settings SHOULD be chosen by task.

Do not assume:

```text
temperature = 0
```

guarantees deterministic truth.

---

# 323. Determinism

Provider/model implementations MAY still vary across:

```text
Versions
Infrastructure
Tool timing
Context
```

even under low randomness.

---

# 324. Seed

A sampling seed MAY improve reproducibility where supported.

It does not make a probabilistic system mathematically deterministic.

---

# 325. Parameters

Generation parameters SHOULD be versioned alongside prompt/eval configurations when material.

---

# 326. Production Prompt Playground

Production users/operators SHOULD NOT receive unrestricted system-prompt/tool editing unless it is an explicitly privileged product feature.

---

# 327. Internal AI Playground

Internal experimentation environments SHOULD be separated from production credentials/data.

---

# 328. Eval Data Privacy

Evaluation datasets MAY contain customer data.

They MUST follow Privacy Guidelines.

---

# 329. Production Data in Evals

Use production-derived data only with approved minimization/access controls.

---

# 330. Synthetic/Anonymized Eval

Prefer representative synthetic/de-identified test data where it produces meaningful coverage.

---

# 331. Evaluation Retention

Eval artifacts require retention/ownership rules.

---

# 332. Bias/Fairness

Where AI affects people differently across groups or languages, evaluation SHOULD examine relevant performance disparities.

---

# 333. Unsupported Language

Do not claim equal multilingual quality without measuring it.

---

# 334. Localization

Prompt and evaluation quality SHOULD cover supported locales.

---

# 335. Accessibility

AI interfaces MUST remain accessible.

AI-generated content does not exempt:

```text
Headings
Alt text
Focus
Keyboard
Contrast
```

requirements.

---

# 336. Generated Alt Text

AI MAY suggest image descriptions.

Human/product review may still be required where accuracy is important.

---

# 337. High-Stakes Domain

Domain-specific regulatory/professional requirements override generic AI convenience.

---

# 338. Legal/Compliance Review

Certain AI use cases require dedicated legal/compliance assessment before launch.

---

# 339. Transparency

Product documentation SHOULD state material AI limitations where users rely on outputs.

---

# 340. User Correction

Where practical, users SHOULD be able to correct wrong AI-generated application data before it becomes authoritative.

---

# 341. Provenance

AI-created records SHOULD record their origin where it matters operationally.

Example:

```text
created_by = ai_assistant
reviewed_by = user_123
```

---

# 342. Authoritative Write

AI-generated structured data SHOULD remain:

```text
Draft
Proposed
Pending approval
```

until validation/approval required by the domain is complete.

---

# 343. AI-Assisted Coding

AI-generated source code follows normal:

```text
Code review
Testing
Dependency review
Security review
Licensing/provenance
```

requirements.

---

# 344. AI Cannot Self-Certify

A model MUST NOT be the sole reviewer certifying that its own generated code is secure/correct.

---

# 345. AI Migration Scripts

Generated database/infrastructure migration scripts require human review and testing.

---

# 346. AI Security Code

Authentication, cryptography, authorization, and payment code generated by AI require especially careful review.

---

# 347. AI Docs

AI-generated documentation MUST be verified against the actual system before becoming canonical documentation.

---

# 348. Decommissioning

Retiring an AI feature MUST address:

```text
Stored prompts
Conversation data
Memory
Embeddings
Provider data
Tools/credentials
Feature flags
Monitoring
```

---

# 349. Model Decommission

Remove:

```text
Obsolete API credentials
Routing rules
Model-specific prompts
Unused tools
Fallback references
```

after migration.

---

# 350. AI Risk Review Checklist

```text
□ Use case
□ Risk tier
□ Owner
□ Model/provider
□ Data classification
□ Prompt boundaries
□ Tool permissions
□ Human approval
□ Grounding
□ Structured output
□ Evals
□ Fallback
□ Cost limits
□ Privacy
□ Observability
□ Incident response
```

---

# 351. Prompt Checklist

```text
□ Version controlled
□ Task explicit
□ Trusted instructions separated
□ User content untrusted
□ Retrieved content untrusted
□ No secrets
□ Minimum context
□ Injection scenario tested
□ Output contract defined
```

---

# 352. Tool Checklist

```text
□ Tool required
□ Narrow function
□ Least privilege
□ User/tenant context
□ Server authorization
□ Input schema
□ Parameter validation
□ Business invariants
□ Timeout
□ Idempotency
□ Audit
□ Approval where needed
```

---

# 353. Agent Checklist

```text
□ Explicit goal
□ Tool allowlist
□ Permission bounds
□ Step limit
□ Token limit
□ Cost limit
□ Wall-clock timeout
□ Retry limit
□ Memory policy
□ Human escalation
□ Kill switch
```

---

# 354. Prompt-Injection Checklist

```text
□ User input treated as untrusted
□ Retrieval treated as untrusted
□ Tool output treated as untrusted
□ Multimodal content considered
□ Data/instruction boundary
□ Tool least privilege
□ Downstream auth
□ High-risk approval
□ Exfiltration tested
□ Injection evals
```

---

# 355. RAG Checklist

```text
□ Corpus authorization
□ Tenant/user scope
□ Chunk provenance
□ Freshness/version
□ Deleted content removed
□ Retrieval limit
□ Ranking
□ Injection considered
□ Citation IDs validated
□ Source conflict policy
□ Grounding eval
```

---

# 356. Structured Output Checklist

```text
□ Schema
□ Required fields
□ Enum allowlist
□ Numeric bounds
□ Identifier validation
□ Authorization
□ Parser failure behavior
□ Retry bounded
□ Destination sanitization
```

---

# 357. Human Approval Checklist

```text
□ Risk justifies review
□ Exact action shown
□ Exact target
□ Parameters
□ Consequence
□ Evidence/source
□ Approval attributable
□ Approval expires/invalidates on change
□ Server reauthorizes
```

---

# 358. Eval Checklist

```text
□ Representative dataset
□ Golden cases
□ Edge cases
□ Adversarial cases
□ Injection cases
□ Tenant/privacy cases
□ Task-specific metrics
□ Safety metrics
□ Model/prompt versions
□ Release threshold
□ Regression gate
```

---

# 359. Privacy Checklist

```text
□ Data classification
□ Minimum data sent
□ Provider retention known
□ Training use known
□ Region known
□ PII redaction
□ Secrets excluded
□ Prompt/completion logging policy
□ Memory retention
□ Embedding deletion
□ Provider deletion process
```

---

# 360. Cost Checklist

```text
□ Per-call token limit
□ Output limit
□ Retrieval limit
□ Agent step limit
□ Retry bound
□ User/tenant quota
□ Spend monitoring
□ Attribution
□ Kill switch
```

---

# 361. Fallback Checklist

```text
□ Failure modes
□ Alternate model if allowed
□ Data policy compatible
□ Schema compatible
□ Quality floor
□ Latency bound
□ Cost bound
□ Safe unavailable state
```

---

# 362. Definition of Done — New AI Feature

A production AI feature is ready when:

```text
✓ Use case and risk tier defined
✓ Owner assigned
✓ Model/provider approved
✓ Data classification complete
✓ Prompt versioned
✓ Output contract defined
✓ Tools least-privileged
✓ Authorization outside model
✓ Prompt injection evaluated
✓ Structured output validated
✓ Hallucination strategy defined
✓ Human approval defined
✓ Offline eval threshold passes
✓ Cost/latency budgets
✓ Privacy review
✓ Fallback
✓ Monitoring
✓ Kill switch
✓ Incident playbook
```

---

# 363. Definition of Done — Agentic Feature

```text
✓ Goal bounded
✓ Tool registry
✓ Least-privileged identities
✓ User/tenant scope preserved
✓ Step/tool/token/cost limits
✓ High-risk approval
✓ Idempotent mutation tools
✓ Memory policy
✓ Injection/tool misuse evals
✓ Partial failure behavior
✓ Audit trail
✓ Emergency tool disable
```

---

# 364. Definition of Done — RAG Feature

```text
✓ Authorized corpus
✓ Tenant boundaries
✓ Source provenance
✓ Chunk/version lifecycle
✓ Retrieval quality eval
✓ Injection testing
✓ Groundedness testing
✓ Citation validation
✓ Deleted/revoked data propagation
✓ Privacy/embedding policy
```

---

# 365. Definition of Done — Model Upgrade

```text
✓ Candidate version known
✓ Relevant eval suites run
✓ Safety regressions checked
✓ Structured output compatibility
✓ Tool calling compatibility
✓ Latency measured
✓ Cost measured
✓ Fallback verified
✓ Canary/shadow strategy
✓ Rollback available
✓ Monitoring updated
```

---

# 366. AI/LLM Anti-Patterns

Avoid:

```text
model says user is admin
→ permit action
```

Avoid:

```text
system prompt says never reveal secrets
→ secrets included in context
```

Avoid:

```text
ignore prompt injection
```

as the security architecture.

Avoid exposing:

```text
shell
database admin
arbitrary HTTP
```

because "the agent might need them."

Avoid tool accounts with global production permissions.

Avoid:

```text
AI tool gets X-Tenant-ID
→ trust it
```

Avoid trusting model-generated resource IDs without authorization.

Avoid letting the model bypass business rules.

Avoid direct model-generated SQL against production.

Avoid direct execution of generated code outside a sandbox.

Avoid:

```text
temperature = 0
→ factual
```

Avoid:

```text
RAG enabled
→ hallucinations solved
```

Avoid retrieving unauthorized records and filtering the final answer afterward.

Avoid sending whole customer databases into context.

Avoid using model context as durable storage.

Avoid automatically storing arbitrary model-generated "memories."

Avoid persistent memories with no provenance/deletion policy.

Avoid letting retrieved documents redefine application policy.

Avoid trusting internal documents as injection-safe merely because they are internal.

Avoid:

```text
model says citation = doc123
```

without confirming doc123 was actually retrieved.

Avoid freeform prose parsed with regex for financial/security actions.

Avoid model-generated numbers accepted without bounds.

Avoid asking the model to calculate authoritative invoice totals.

Avoid:

```text
model confidence = 95%
```

with no calibration.

Avoid:

```text
ask model if answer is correct
```

as independent verification.

Avoid forcing the model to always answer.

Avoid treating abstention as system failure.

Avoid human approval consisting only of:

```text
Approve AI
```

with no evidence/context.

Avoid letting AI-generated persuasion text dominate critical confirmation dialogs.

Avoid a model approving another model's high-risk action as the sole safeguard.

Avoid autonomous unlimited agent loops.

Avoid no per-run token/tool/cost ceiling.

Avoid silent provider/model fallback violating privacy requirements.

Avoid fallback from a strong model to a weak model for high-risk tasks with no quality gate.

Avoid unlimited retries across providers.

Avoid logging all raw prompts forever.

Avoid sending secrets to external models.

Avoid storing raw conversations in analytics events.

Avoid training on customer content merely because it exists.

Avoid unreviewed fine-tuning datasets.

Avoid untrusted users directly writing authoritative RAG corpora.

Avoid treating embeddings as non-sensitive by definition.

Avoid public AI endpoints with no rate/cost limits.

Avoid treating thumbs-up as correctness ground truth.

Avoid one generic eval score hiding severe safety regressions.

Avoid shipping a model/prompt update with no regression eval.

Avoid evaluating only happy-path English examples.

Avoid LLM-as-judge with no validation.

Avoid:

```text
latest-model
```

silently changing high-risk behavior.

Avoid enabling every dynamically discovered MCP/tool server.

Avoid trusting tool descriptions from third parties blindly.

Avoid multi-agent architecture merely because it sounds sophisticated.

Avoid agents sharing one broad privileged identity.

Avoid AI-generated outbound messages sent without recipient validation.

Avoid AI-written production migrations deployed with no human review.

Avoid a model certifying the security of its own generated code.

---

# 367. AI Rules for AI Coding Agents

AI coding agents MUST treat generated code as untrusted until tested/reviewed.

---

# 368. Authorization Rule

AI MUST NEVER create authorization logic whose final decision is delegated to an LLM.

---

# 369. Prompt-Injection Rule

AI MUST assume user, retrieval, and tool text can contain malicious instructions.

---

# 370. Tool Rule

AI MUST prefer narrow typed tools over generic privileged tools.

---

# 371. Permission Rule

AI MUST give every model/tool the minimum permissions necessary.

---

# 372. Structured Output Rule

AI SHOULD use validated structured outputs for machine-consumed responses.

---

# 373. PII Rule

AI MUST minimize PII sent to model providers.

---

# 374. Secret Rule

AI MUST NOT intentionally place application secrets in prompts/model context.

---

# 375. RAG Rule

AI MUST enforce authorization before private data is included in model context.

---

# 376. Citation Rule

AI MUST NOT invent citations/source identifiers.

---

# 377. Hallucination Rule

AI MUST NOT assume fluent output is correct.

---

# 378. Verification Rule

AI SHOULD use deterministic tools/source data where exact facts are available.

---

# 379. Human Approval Rule

AI MUST require meaningful human approval before high-impact actions where product policy requires it.

---

# 380. Approval Integrity Rule

AI MUST NOT modify approved action parameters after approval.

---

# 381. Cost Rule

AI MUST bound tokens, tool calls, retries, and agent steps.

---

# 382. Fallback Rule

AI MUST NOT route sensitive data to an unapproved fallback provider.

---

# 383. Eval Rule

AI SHOULD add regression eval cases for material model/prompt/tool changes.

---

# 384. Incident Rule

A discovered AI failure SHOULD become an eval/test case when reproducible and relevant.

---

# 385. Gold Rule

When uncertain:

```text
Deterministic control
>
model judgment
```

```text
Read-only
>
write
```

```text
Narrow tool
>
general-purpose tool
```

```text
Human approval
>
autonomous high-impact action
```

```text
Verified source
>
model memory
```

---

# 386. Golden AI/LLM Rules

**1. Model output is untrusted probabilistic data.**

**2. The model never becomes the authorization boundary.**

**3. Deterministic business invariants remain deterministic.**

**4. Every AI use case has an owner and risk classification.**

**5. Models and providers are governed dependencies.**

**6. Material model changes require evaluation before broad release.**

**7. Prompts are version-controlled product artifacts.**

**8. System prompts are not secret stores.**

**9. Security does not depend on keeping prompts undiscoverable.**

**10. User input is untrusted.**

**11. Retrieved documents are untrusted.**

**12. Tool output is untrusted.**

**13. Model output is untrusted when consumed by downstream systems.**

**14. Prompt injection is contained by architecture, not merely prompt wording.**

**15. Direct and indirect prompt injection are both tested.**

**16. Multimodal inputs may carry injection instructions.**

**17. Untrusted data and trusted instructions remain clearly separated.**

**18. Context is minimized to what the task needs.**

**19. Large context windows do not justify bulk data disclosure.**

**20. Every tool exists for a specific approved purpose.**

**21. Agents receive only the tools required for the current task.**

**22. Narrow typed tools are preferred to shell, SQL, filesystem, and arbitrary HTTP tools.**

**23. Tool permissions follow least privilege.**

**24. Tools execute with the user's/tenant's authorized context where appropriate.**

**25. Tool authorization is enforced by deterministic downstream systems.**

**26. Model-generated tool parameters are validated.**

**27. Tool business invariants remain server-enforced.**

**28. Side-effectful tools use idempotency where duplication matters.**

**29. Read-only AI capability is preferred before write capability.**

**30. High-impact mutations require application or human approval according to risk.**

**31. Approval displays exact action, target, parameters, and consequences.**

**32. Approval becomes invalid when the action changes.**

**33. A model cannot satisfy a required human approval by reviewing itself.**

**34. Agent autonomy has explicit goal, time, step, tool, token, and cost boundaries.**

**35. Autonomous loops always have deterministic termination controls.**

**36. Agent technical identities do not possess unnecessary privileges.**

**37. Persistent memory is governed application data.**

**38. AI memory carries provenance and lifecycle.**

**39. Untrusted content is not silently promoted into trusted memory.**

**40. User and tenant boundaries apply to memory.**

**41. Machine-consumed outputs use validated schemas.**

**42. Freeform text is not parsed casually into consequential commands.**

**43. Model-generated identifiers and URLs are validated before use.**

**44. AI-generated HTML/Markdown is rendered safely.**

**45. AI-generated SQL does not execute freely against production.**

**46. AI-generated code receives ordinary code review and security testing.**

**47. Automatically executed model code runs only inside deliberately constrained sandboxes.**

**48. RAG authorization happens before private content reaches the model.**

**49. Cross-tenant data is never retrieved into context and filtered only afterward.**

**50. Embeddings are governed according to the sensitivity of their source data.**

**51. Retrieved content retains source and version provenance.**

**52. RAG improves grounding but does not guarantee truth.**

**53. Citation identifiers are validated against actual retrieved evidence.**

**54. Confident language is not proof of correctness.**

**55. Deterministically checkable claims are checked deterministically.**

**56. Current application state comes from authoritative systems, not model recollection.**

**57. Models are permitted to say they do not know.**

**58. High-risk tasks define abstention/escalation behavior.**

**59. Human review is used where model-error impact exceeds the cost of review.**

**60. Human review must be meaningful rather than ceremonial.**

**61. AI recommendations are not presented as infallible authority.**

**62. Arbitrary confidence percentages are not shown without calibration.**

**63. Every production AI feature has task-specific evals.**

**64. Eval sets include normal, edge, adversarial, ambiguous, and failure cases.**

**65. Agent systems test prompt injection, privilege abuse, and tool misuse.**

**66. Multi-tenant AI systems test cross-tenant extraction attempts.**

**67. Factual systems evaluate unsupported claims and grounding.**

**68. Structured-output systems measure schema validity.**

**69. Material model, prompt, retrieval, or tool changes run regression evals.**

**70. LLM-as-judge is a scalable evaluator, not unquestionable ground truth.**

**71. Production rollout requires minimum quality and safety thresholds.**

**72. Fallback is a product policy, not an improvised exception handler.**

**73. Safe unavailability may be better than low-quality fallback for consequential tasks.**

**74. Fallback providers must satisfy the same privacy/data constraints.**

**75. Model routing is bounded by application policy.**

**76. Every AI request has bounded cost/resource consumption.**

**77. Agents have bounded tool-call and reasoning loops.**

**78. AI endpoints use quotas/rate limits against denial-of-wallet attacks.**

**79. AI cost is attributable by feature/model/tenant where needed.**

**80. Prompt/result caches remain tenant- and privacy-safe.**

**81. Data possessed by the application is not automatically appropriate model context.**

**82. Only minimum necessary personal data is sent to models.**

**83. Secrets are excluded from model context.**

**84. Provider retention/training/subprocessor behavior is documented.**

**85. External model training on customer data requires explicit authorization/policy.**

**86. Raw prompts and completions are not retained indefinitely by default.**

**87. AI memory, conversations, embeddings, and fine-tuning data participate in deletion policy.**

**88. Training and fine-tuning datasets have provenance and rights review.**

**89. RAG/training corpora are protected against poisoning.**

**90. Models, adapters, tool servers, and datasets are supply-chain dependencies.**

**91. Production tool registries are allowlisted and governed.**

**92. Dynamically discovered tools are not automatically trusted.**

**93. AI telemetry records model, prompt version, tokens, tools, latency, and outcome without unnecessary raw sensitive content.**

**94. High-risk AI workflows have kill switches and rollback/degradation modes.**

**95. AI incidents examine downstream actions and persistent memory, not only visible model text.**

**96. Multi-agent systems preserve identity, least privilege, message trust boundaries, and failure limits.**

**97. AI-generated persuasive explanations do not control critical approval UI.**

**98. External communication generated by AI still follows ordinary recipient, privacy, and communication controls.**

**99. If an AI system can take real-world action, its worst credible model mistake must still be contained by deterministic controls.**

**100. If the organization cannot explain what the model may see, what it may do, how it is evaluated, how it fails safely, and who remains accountable, the AI feature is not production-governed.**

---

# 387. Canonical AI/LLM Standard

The organizational standard is:

> **AI and LLM components are probabilistic dependencies operating inside deterministic application boundaries. Models may interpret, summarize, classify, retrieve, propose, and plan, but they do not independently establish identity, authorization, entitlement, payment state, data ownership, security policy, or other authoritative business facts. Those decisions remain enforced by ordinary application code and downstream systems.**

> **Prompt architecture establishes explicit trust boundaries. Application policy and developer instructions remain distinct from user content, retrieved documents, websites, emails, files, tool responses, images, and other externally influenced material, all of which are treated as potentially adversarial. Prompt injection is assumed possible and is contained through least privilege, narrow tools, authorization, data minimization, approval, and bounded autonomy rather than relying on instructions telling the model to ignore malicious prompts.**

> **Tool use is a privileged execution boundary. Agents receive an allowlisted, minimal set of narrowly scoped typed tools; tool identities use minimum downstream permissions; generated parameters are schema-validated; tenant/user authorization and business rules are rechecked when the tool executes; mutating operations use idempotency and concurrency controls; and high-impact actions are proposed first and executed only after any required human approval and server-side reauthorization.**

> **Agent autonomy is bounded by explicit objectives and resource limits. Every agent has a defined goal, allowed tools, identity, permissions, token budget, step count, retry limit, wall-clock limit, and cost ceiling. Persistent memory is treated as potentially poisoned application data with provenance, scope, retention, deletion, and write policy rather than being unrestricted context the model may permanently rewrite.**

> **Machine-consumed model output is structured and validated. Extraction, classification, workflow choices, and tool calls use typed schemas wherever practical; identifiers, enums, numbers, URLs, and permissions are validated independently; generated HTML, Markdown, SQL, and code are treated according to their destination risk; and freeform natural-language output is never accepted directly as a privileged command solely because the model produced it.**

> **RAG and grounding preserve data authorization before generation. Retrieval occurs only over content the current actor is permitted to access, tenant and user boundaries are enforced before records enter model context, retrieved chunks retain provenance and lifecycle metadata, revoked or stale documents are removed appropriately, and citations are validated against sources actually retrieved. Grounding reduces unsupported output but never removes the need for factual verification on consequential claims.**

> **Confabulation is treated as a normal AI failure mode. Systems use authoritative tools and deterministic validation where exact facts are available, permit abstention when evidence is insufficient, avoid fabricated confidence metrics, and route consequential uncertain outcomes to a human or deterministic process. Fluent language is never treated as proof that an answer is correct.**

> **Production AI behavior is evaluation-gated. Each feature maintains representative task-specific eval datasets covering normal, edge, adversarial, multilingual, permission-sensitive, and known failure cases as relevant; model, prompt, retrieval, safety, and tool changes run regression evaluations; quality, groundedness, schema validity, tool behavior, latency, cost, and safety metrics have explicit release thresholds; and AI-based judges supplement rather than replace validated reference or human assessment where correctness matters.**

> **Human oversight is risk-calibrated and meaningful. High-impact AI recommendations expose the proposed action, authoritative evidence, uncertainty, and consequences to a reviewer who has time, context, authority, and the ability to reject the action. A second model does not substitute for required human approval, and critical confirmation interfaces are generated from validated application state rather than persuasive unconstrained model prose.**

> **AI data use follows minimization and privacy-by-design. Providers receive only data necessary for the task; model-provider retention, training behavior, subprocessors, regional processing, and deletion are understood; secrets are excluded; raw prompts and completions are not broadly retained by default; conversation history, persistent memory, embeddings, fine-tuning datasets, and evaluation corpora participate in normal retention/deletion governance; and access to customer data does not automatically create the right to train or fine-tune on it.**

> **Cost and availability are bounded engineering concerns. Requests define token and output limits, retrieval limits, agent step/tool limits, retry policy, timeouts, per-user or per-tenant quotas where appropriate, and spend observability. Model routing and provider fallback respect quality, schema, privacy, residency, and safety requirements; high-impact tasks may deliberately fail safely rather than silently fall back to a model unable to satisfy the required quality floor.**

> **Agentic and multi-agent systems receive stronger controls because model output becomes executable authority. Tool servers, dynamic plugins, MCP-style integrations, inter-agent messages, memory stores, and model artifacts are treated as supply-chain and trust boundaries; each agent has distinct identity and least privilege; delegation carries explicit goal, budget, permissions, and expiry; and one poisoned input or incorrect agent response cannot cascade through unrestricted autonomous actions.**

> **AI systems are observable, reversible, and incident-ready. Telemetry records model/version, prompt version, latency, token/cost usage, tool activity, fallback, errors, and policy outcomes without unnecessarily exposing raw sensitive content; material AI-triggered actions use normal audit logging; high-risk features and tool sets have kill switches; model changes support rollback where possible; and discovered incidents become adversarial/regression test cases so the system's measured safety improves over time.**

A production-grade AI architecture should make it easy to answer:

```text
What problem is the model solving?
What is the feature's risk tier?
Which exact model/version is in production?
Who owns it?
What data can the model see?
Which of that data is untrusted?
Can retrieved content contain instructions?
What prevents prompt injection from becoming a privileged action?
Which tools can the model call?
Why does it need each one?
Which identity does each tool execute under?
Where is authorization enforced?
Can the model cross tenant boundaries?
Can the model issue a refund, send an email, delete data, or change production state?
Which of those actions require human approval?
Can action parameters change after approval?
How are tool inputs validated?
What is the maximum number of agent steps?
What is the maximum cost?
What happens if the model loops?
What becomes persistent memory?
Who may write that memory?
Could an attacker poison it?
How is memory deleted?
Does machine-consumed output have a schema?
What happens when schema validation fails?
How does RAG enforce permissions before context construction?
Can citations be fabricated?
How is factual correctness measured?
When is the model expected to abstain?
Which eval suite gates release?
Does that eval include prompt injection and tool misuse?
How was an LLM judge validated?
What happens when the primary model is unavailable?
Can fallback process the same data legally and safely?
Are prompts/completions retained by the provider?
Can provider data be used for training?
Are secrets or excessive PII sent to the model?
How are tokens and spend limited?
What telemetry identifies a model regression?
Can tool access be disabled immediately?
Can the model version be rolled back?
Who remains accountable when the AI is wrong?
```

If those questions cannot be answered reliably, the application uses AI, but it does not yet have a governed AI system.

The current risk baseline supports the architecture above. **NIST AI RMF 1.0** remains the published AI Risk Management Framework as of September 23, 2026, while NIST notes that it is undergoing revision; its **Generative AI Profile, NIST AI 600-1**, specifically identifies risks including confabulation, data privacy, information integrity, human-AI configuration, and AI value-chain/component integration. citeturn945004search7turn945004search29

For application security, the current **OWASP Top 10 for LLM Applications 2025** includes prompt injection, sensitive-information disclosure, supply-chain risk, data/model poisoning, improper output handling, excessive agency, system-prompt leakage, vector/embedding weaknesses, misinformation, and unbounded consumption. OWASP's excessive-agency guidance explicitly recommends minimizing tool functionality and permissions, executing actions in the user's security context, independently enforcing downstream authorization, and requiring human approval for high-impact actions. citeturn396941search3turn396941search1

Agentic systems now have a separate current OWASP baseline: the **Top 10 for Agentic Applications 2026**, released December 9, 2025, covers agent goal hijacking, tool misuse, identity/privilege abuse, agentic supply-chain vulnerabilities, unexpected code execution, memory/context poisoning, insecure inter-agent communication, cascading failures, human-agent trust exploitation, and rogue agents. That is why this standard treats memory, tools, agent identity, delegation, human approval, and cascade limits as first-class security boundaries. citeturn945004search9turn945004search0

At the organizational governance layer, **ISO/IEC 42001:2023** remains the published international AI management-system standard and defines requirements for establishing, maintaining, and continually improving an AI management system. NIST also publishes **SP 800-218A**, which extends its Secure Software Development Framework with practices specific to generative AI and foundation-model development. citeturn396941search0turn945004search6

Canonical master placement:

**… → Release & Versioning → Documentation → AI/LLM → Governance.**
