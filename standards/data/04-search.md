---
id: "search"
title: "Search Guidelines — Gold Standard 2026"
domain: "data"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["data", "search"]
applies_to: ["general"]
related: ["data-database", "state-management", "privacy-data-governance", "feature-flag", "governance"]
legacy_number: 33
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 73114
provenance: baseline

---

Canonical placement: **Caching → Background Jobs & Queue → Files & Media → Search → Notifications**. Search sits after durable/content ingestion concerns because the search index is normally a **derived projection**, not the authoritative datastore.

# Search Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- search architecture;
- full-text search;
- structured search;
- lexical search;
- semantic/vector search;
- hybrid search;
- indexing;
- index schemas;
- analyzers;
- tokenization;
- normalization;
- ranking;
- relevance;
- boosting;
- filtering;
- faceting;
- sorting;
- permissions;
- tenant isolation;
- typo tolerance;
- synonyms;
- autocomplete;
- suggestions;
- query parsing;
- pagination;
- result counts;
- highlighting;
- empty states;
- no-result states;
- indexing freshness;
- reindexing;
- zero-downtime index migrations;
- search analytics;
- observability;
- testing;
- recovery.

The objective is to make search:

```text
Relevant
Secure
Tenant-safe
Fresh enough
Predictable
Fast
Measurable
Explainable
Recoverable
Operable
```

The core principle is:

> **Search is a permission-aware projection of authoritative data optimized for retrieval and ranking. It must never expose data the caller could not retrieve through the authoritative application.**

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
Search surface
Security impact
Relevance impact
Performance impact
Owner
Review date
```

---

# 3. Search Is a Product Capability

Search is not merely:

```text
SELECT ... LIKE '%query%'
```

or:

```text
send everything to Elasticsearch
```

Search has explicit:

```text
information needs
relevance semantics
security boundaries
freshness requirements
UX expectations
```

---

# 4. Search Architecture Follows Search Needs

Choose architecture after defining:

```text
Corpus
Query types
Traffic
Freshness
Ranking requirements
Filtering requirements
Security model
Languages
Scale
Latency
```

Do not start with a search product and search for a problem.

---

# 5. Search Complexity Ladder

Prefer the simplest system that meets requirements:

```text
Database exact/filter lookup
↓
Database native full-text search
↓
Dedicated lexical search engine
↓
Lexical + semantic/vector retrieval
↓
Complex multi-stage ranking
```

Do not introduce a dedicated cluster merely because the application contains a search box.

---

# 6. Database Search

Database-native search MAY be sufficient when:

```text
corpus is moderate
queries are simple
ranking requirements are modest
operational simplicity matters
```

---

# 7. Dedicated Search Engine

A dedicated search engine becomes justified when requirements include:

```text
advanced relevance
large corpus
faceting
typo tolerance
language analysis
high query volume
complex ranking
autocomplete
independent scaling
```

---

# 8. Search Index Is Usually Derived State

The canonical model is:

```text
Authoritative datastore
↓
Indexing pipeline
↓
Search index
↓
Search results
```

The search index SHOULD normally be reconstructible.

---

# 9. Search Index Is Not Source of Truth

Do not use the search engine as the sole authoritative record merely because search reads are fast.

If a search technology is used as authoritative storage, it MUST be governed under Data & Database Guidelines accordingly.

---

# 10. Search Results Are Candidate Records

A search result identifies an entity or document.

The authoritative datastore remains responsible for final mutations and business correctness.

---

# 11. Read-After-Search

Where data can change between search and action:

```text
search
↓
open record
↓
authorize/read authoritative state
↓
perform action
```

rather than trusting the stale search hit indefinitely.

---

# 12. Search Freshness

Every search surface SHOULD define acceptable indexing delay.

Examples:

```text
Inventory:
seconds

Knowledge articles:
minutes

Historical archive:
hours
```

Freshness is a product requirement.

---

# 13. Search Consistency

Search is commonly eventually consistent.

The UX and business logic MUST account for that.

---

# 14. Strong Search Freshness

If a newly created entity MUST be searchable immediately, architecture must explicitly provide the required read-after-write behavior.

---

# 15. Avoid False Immediate Consistency

Do not assume:

```text
DB commit
→
search result instantly updated
```

when indexing is asynchronous.

---

# 16. Search Architecture Components

A mature search system may contain:

```text
Source data
↓
Change capture / outbox
↓
Indexer
↓
Search index
↓
Query service
↓
Ranking
↓
Permission filter
↓
Search UI
```

Each boundary requires ownership.

---

# 17. Search Service Boundary

Applications SHOULD centralize substantial search logic where doing so provides:

```text
consistent security
ranking
query semantics
observability
provider isolation
```

---

# 18. Do Not Scatter Raw Search DSL

Application features SHOULD NOT embed vendor-specific complex search queries throughout unrelated business code.

---

# 19. Search Adapter

A narrow search/domain abstraction MAY isolate:

```text
query building
ranking policy
provider syntax
pagination
security filtering
```

from feature code.

---

# 20. Do Not Over-Abstract

Do not create a fictional universal search abstraction that prevents use of legitimate engine capabilities.

---

# 21. Index Ownership

Every index MUST have an owning service/team.

---

# 22. Index Purpose

An index SHOULD have one clear retrieval purpose or closely related family of purposes.

---

# 23. Avoid Giant Shared Indexes

Do not put all unrelated application entities into one index merely for convenience.

Potential problems include:

```text
schema conflicts
ranking ambiguity
security complexity
operational coupling
```

---

# 24. Unified Search

Cross-domain global search MAY use:

```text
multiple indices
federated retrieval
a dedicated unified projection
```

according to scale and relevance requirements.

---

# 25. Index Schema

Index schemas MUST be explicit and version-controlled.

---

# 26. Searchable vs Filterable

Fields SHOULD be classified according to purpose:

```text
searchable
filterable
sortable
facetable
retrievable
internal
```

---

# 27. Do Not Index Everything

Only index fields needed for:

```text
retrieval
ranking
filtering
sorting
display
security
```

---

# 28. Sensitive Fields

Sensitive fields SHOULD NOT be indexed unless search requirements genuinely require them.

---

# 29. Search Index Data Minimization

Follow Privacy & Data Governance Guidelines.

Search projections should contain the minimum data needed to satisfy search behavior.

---

# 30. Search Result Projection

Return only fields needed by the result UI/API.

Do not expose the complete indexed document automatically.

---

# 31. Source Payload

Search-engine `_source` or equivalent raw stored documents MAY contain more fields than the result response.

Access to them must remain restricted.

---

# 32. Field Types

Choose correct types.

Examples:

```text
text
keyword/exact
integer
decimal
date
boolean
geo
vector
```

---

# 33. Text vs Exact Fields

Human-language text and exact identifiers SHOULD NOT share identical analysis semantics.

Example:

```text
title
→ analyzed text

status
→ exact keyword

tenant_id
→ exact keyword
```

---

# 34. IDs

Identifiers SHOULD be indexed as exact values, not tokenized prose.

---

# 35. Status Values

Enums/status fields SHOULD generally be exact filterable values.

---

# 36. Dates

Dates MUST use structured date types.

Do not index dates only as formatted human strings.

---

# 37. Numeric Values

Numeric filtering/sorting requires numeric field types.

---

# 38. Multi-Fields

A field MAY have multiple representations.

Example:

```text
name
→ analyzed text for search
→ exact keyword for sorting/faceting
```

---

# 39. Text Analysis

Full-text search quality depends substantially on analysis.

Analysis may include:

```text
tokenization
lowercasing
normalization
stemming
lemmatization
stop-word handling
synonyms
```

---

# 40. Analyzer Ownership

Search analyzers are product behavior and MUST be version-controlled/tested.

---

# 41. Index-Time Analysis

Index-time analysis determines how documents are represented.

Changes MAY require reindexing.

---

# 42. Search-Time Analysis

Search-time analysis transforms user queries.

It can often evolve without rebuilding all indexed documents.

---

# 43. Analyzer Compatibility

Index and query analyzers MUST remain semantically compatible.

---

# 44. Lowercasing

Case normalization SHOULD be applied where case should not affect relevance.

---

# 45. Case-Sensitive Search

Identifiers or specialized domains MAY require case-sensitive semantics.

---

# 46. Accent Folding

Accent/diacritic normalization MAY improve recall.

It MUST be tested for languages where distinctions are meaningful.

---

# 47. Stemming

Stemming MAY improve recall by matching related word forms.

Over-aggressive stemming can reduce precision.

---

# 48. Lemmatization

Language-aware lemmatization MAY be preferable when high-quality linguistic processing is available.

---

# 49. Stop Words

Stop-word removal SHOULD be deliberate.

Words commonly considered unimportant may be meaningful in:

```text
product names
legal phrases
song/book titles
technical terminology
```

---

# 50. Language-Specific Analysis

Multilingual applications SHOULD use language-appropriate analyzers rather than one English-oriented analyzer for all languages.

---

# 51. Unknown Language

If language cannot be determined reliably, use a conservative multilingual/neutral strategy rather than destructive language-specific processing.

---

# 52. Language Metadata

Documents SHOULD include language metadata where relevant.

---

# 53. Synonyms

Synonyms MAY increase recall for equivalent or domain-related terminology.

Examples:

```text
laptop ↔ notebook
SaaS ↔ software as a service
```

---

# 54. Synonyms Are Product Rules

Synonym dictionaries MUST have ownership and review.

---

# 55. Do Not Assume Synonyms Are Symmetric

Sometimes:

```text
A → B
```

is desirable while:

```text
B → A
```

is not.

---

# 56. Domain Synonyms

Domain-specific synonym rules SHOULD be informed by actual search behavior.

---

# 57. Search-Time Synonyms

Search-time synonym expansion is often preferable when synonym rules need frequent changes without full reindexing.

---

# 58. Multi-Word Synonyms

Multi-word synonym handling must preserve phrase semantics appropriately.

---

# 59. Synonym Explosion

Large synonym expansion can:

```text
reduce precision
increase query cost
produce unexpected matches
```

Use measured rules.

---

# 60. Typo Tolerance

Search MAY tolerate spelling errors through:

```text
edit distance
prefix matching
dictionary correction
phonetic matching
query suggestions
```

---

# 61. Fuzzy Matching

Fuzzy search SHOULD be bounded.

---

# 62. Edit Distance

Small edit distances are generally safer than broad fuzzy matching.

---

# 63. Short Query Fuzziness

Very short terms SHOULD have conservative typo tolerance.

Example:

```text
"AI"
"UK"
"ID"
```

should not expand broadly.

---

# 64. Long Query Fuzziness

Longer words MAY tolerate limited edits more safely.

---

# 65. Prefix Constraint

Requiring an initial matching prefix can reduce fuzzy expansion cost and irrelevant matches.

---

# 66. Fuzzy Expansion Budget

Maximum fuzzy expansions MUST remain bounded.

---

# 67. Fuzzy Performance

Do not enable expensive fuzzy matching indiscriminately across every field and token.

---

# 68. Typo Tolerance Precision

Typo tolerance MUST NOT make exact identifiers unreliable.

---

# 69. Exact Identifiers

Queries resembling:

```text
invoice ID
email address
SKU
ticket ID
```

SHOULD receive exact/prefix-oriented treatment before broad fuzzy logic.

---

# 70. Query Classification

Search MAY classify query intent.

Examples:

```text
exact identifier
person name
free text
structured syntax
navigation
```

---

# 71. Exact Match Boosting

Exact matches SHOULD generally outrank fuzzy or partial matches when semantics support it.

---

# 72. Prefix Search

Prefix search MAY be useful for:

```text
autocomplete
names
codes
```

but should be bounded.

---

# 73. Substring Search

Arbitrary substring search is expensive in many inverted-index architectures.

Use dedicated analyzers such as n-grams only when justified.

---

# 74. N-Grams

N-grams can improve partial matching but may substantially increase index size.

---

# 75. Edge N-Grams

Edge n-grams MAY be suitable for prefix autocomplete.

---

# 76. Autocomplete

Autocomplete is a separate search interaction with stricter latency expectations.

---

# 77. Autocomplete SLO

Autocomplete SHOULD have a tighter latency budget than full search because it runs while the user types.

---

# 78. Minimum Characters

Autocomplete MAY require a minimum input length before network search.

---

# 79. Debouncing

Client-side autocomplete SHOULD debounce requests to reduce unnecessary load.

---

# 80. Request Cancellation

Older autocomplete requests SHOULD be cancelled/ignored when newer input supersedes them.

---

# 81. Out-of-Order Responses

The UI MUST NOT allow an older slower response to replace newer results.

---

# 82. Autocomplete Dataset

Autocomplete SHOULD query fields/indices optimized for suggestion behavior where necessary.

---

# 83. Sensitive Suggestions

Autocomplete MUST NOT reveal protected documents, identities, or terms through suggestions.

---

# 84. Suggestion Enumeration

Attackers MUST NOT be able to enumerate restricted entity names through a suggestion endpoint.

---

# 85. Search Suggestions

"No results" suggestions MAY include:

```text
spelling correction
related terms
popular queries
broader filters
```

when relevant.

---

# 86. Did-You-Mean

Spelling corrections SHOULD be suggestions rather than silently changing high-consequence queries where ambiguity matters.

---

# 87. Query Parsing

Query parsing SHOULD match the intended user audience.

---

# 88. Simple Search Box

Ordinary users SHOULD NOT be required to understand search-engine DSL syntax.

---

# 89. Advanced Search

Advanced query syntax MAY be exposed deliberately for expert users.

---

# 90. Query DSL Security

User input MUST NOT be passed directly into unrestricted search-engine query DSL.

---

# 91. Query Allowlist

Expose only supported operators.

---

# 92. Query Complexity

User queries MUST have complexity limits.

---

# 93. Expensive Queries

Restrict:

```text
wildcard leading-star searches
unbounded regex
huge boolean expressions
very high fuzzy expansion
```

when they can exhaust search resources.

---

# 94. Search DoS

Search endpoints require:

```text
query limits
rate limits
timeouts
resource controls
```

according to risk.

---

# 95. Query Length

Maximum query length SHOULD be bounded.

---

# 96. Filter Count

Maximum filters/facets/clauses SHOULD be bounded.

---

# 97. Empty Query

The meaning of an empty search query MUST be explicit.

Possible behavior:

```text
show default browse results
show recent items
show nothing
reject
```

---

# 98. Whitespace Query

Normalize meaningless whitespace before execution.

---

# 99. Unicode Normalization

Query normalization SHOULD handle Unicode consistently.

---

# 100. Search Ranking

Ranking determines result order.

It is a product policy.

---

# 101. Ranking Goal

Ranking SHOULD reflect the user's information need—not whichever field is easiest to boost.

---

# 102. Baseline Lexical Ranking

A dedicated lexical search system SHOULD begin with a standard relevance model before introducing elaborate custom scoring.

---

# 103. Ranking Signals

Potential ranking signals include:

```text
textual relevance
exact match
field importance
freshness
popularity
quality
personalization
business rule
```

---

# 104. Signal Governance

Every major ranking signal SHOULD have a documented rationale.

---

# 105. Field Boosting

Important fields MAY receive higher relevance weight.

Example:

```text
title > description > body
```

if user intent supports it.

---

# 106. Exact Match Boost

An exact title/name match SHOULD generally be strongly competitive.

---

# 107. Phrase Match

Phrase matches MAY outrank unrelated independent token matches.

---

# 108. Popularity Boost

Popularity MAY improve useful ranking but risks self-reinforcing incumbents.

---

# 109. Freshness Boost

Freshness SHOULD only matter when newer information is genuinely more relevant.

---

# 110. Recency Decay

If recency matters, use controlled decay rather than always sorting newest-first.

---

# 111. Business Boosting

Commercial/business priorities MAY influence search ranking only when product requirements explicitly call for them.

---

# 112. Sponsored Results

Paid/sponsored results SHOULD be clearly distinguished from organic ranking where applicable.

---

# 113. Security Before Ranking

Permissions MUST filter the candidate set regardless of ranking score.

A high relevance score never overrides access control.

---

# 114. Ranking Does Not Authorize

Do not:

```text
rank unauthorized result low
```

Instead:

```text
exclude unauthorized result
```

---

# 115. Personalization

Personalized ranking MAY use:

```text
preferences
history
role
context
```

when privacy/product requirements permit.

---

# 116. Personalization Fallback

Search SHOULD still produce useful results without personalization.

---

# 117. Personalization Privacy

Do not collect unnecessary behavioral data solely to improve ranking.

---

# 118. Feedback Loops

Ranking systems SHOULD consider feedback-loop bias.

Example:

```text
rank high
→
gets more clicks
→
looks more popular
→
rank even higher
```

---

# 119. Relevance Is Measured

Do not tune ranking solely by intuition.

---

# 120. Golden Query Set

Important search products SHOULD maintain representative test queries.

---

# 121. Relevance Judgments

Representative queries SHOULD have expected relevant results/judgments where feasible.

---

# 122. Relevance Metrics

Useful information-retrieval metrics MAY include:

```text
Precision
Recall
MRR
NDCG
Success@K
```

according to product behavior.

---

# 123. Ranking Regression Test

Ranking changes SHOULD run against a relevance test set before production.

---

# 124. Query Segments

Evaluate relevance across different query types:

```text
exact ID
short keyword
long natural language
typo
rare term
common term
no-result
```

---

# 125. Online Search Metrics

Production search metrics MAY include:

```text
result click rate
reformulation rate
zero-result rate
time to useful result
search abandonment
```

---

# 126. Search Metrics Are Not Ground Truth

High click rate may indicate:

```text
good ranking
or
misleading first result
or
few alternatives
```

Interpret behavioral metrics carefully.

---

# 127. Search Experiments

Ranking experiments follow Analytics and Feature Flag Guidelines.

---

# 128. Guardrail Metrics

Ranking experiments SHOULD monitor:

```text
latency
zero-result rate
conversion/task success
security correctness
```

in addition to engagement.

---

# 129. Lexical Search

Lexical search remains a strong default for:

```text
exact terminology
names
codes
identifiers
keyword-heavy queries
```

---

# 130. Semantic Search

Semantic/vector retrieval MAY improve matching by meaning rather than exact terms.

---

# 131. Semantic Search Is Not Default

Do not add embeddings/vector infrastructure merely because it is modern.

Use it when measurable relevance improvement justifies:

```text
cost
latency
index complexity
model lifecycle
```

---

# 132. Vector Index

Vector embeddings are derived data and SHOULD be reconstructible from authoritative content/model configuration.

---

# 133. Embedding Version

Vector documents MUST be associated with the embedding/model version when model changes may alter vector space.

---

# 134. Model Change

Changing embedding models generally requires re-embedding/reindexing relevant documents.

---

# 135. Hybrid Search

Hybrid search combines lexical and semantic signals.

---

# 136. Hybrid Justification

Hybrid retrieval SHOULD be used when it measurably improves:

```text
recall
semantic matching
exact-term reliability
```

over either approach alone.

---

# 137. Hybrid Fusion

Fusion/reranking methods MUST be tested against representative query sets.

---

# 138. Exact IDs in Hybrid Search

Semantic ranking MUST NOT obscure obvious exact identifier matches.

---

# 139. Reranking

A second-stage reranker MAY improve the top candidate set.

---

# 140. Candidate Retrieval First

Expensive ranking SHOULD generally operate on a bounded candidate set rather than the entire corpus.

---

# 141. AI/LLM Reranking

LLM/reranker use requires:

```text
latency budget
cost controls
privacy review
fallback
deterministic evaluation
```

where applicable.

---

# 142. Reranker Failure

Search MUST have a defined fallback when an optional reranking dependency fails.

---

# 143. Filtering

Filters constrain the candidate set using structured conditions.

---

# 144. Filter vs Search

Use full-text relevance for:

```text
"wireless keyboard"
```

Use filters for:

```text
status = active
country = MY
price <= 200
```

---

# 145. Filters Are Not Ranking

A filter generally answers:

```text
eligible?
```

not:

```text
more relevant?
```

---

# 146. Filter Allowlist

Expose only supported filterable fields.

---

# 147. Filter Validation

Validate:

```text
field
operator
value type
range
```

before building search queries.

---

# 148. User-Supplied Field Names

Do not pass arbitrary user-provided field names directly into search DSL.

---

# 149. Filter Semantics

Filter behavior MUST match domain semantics.

Example:

```text
status=active
```

must have one canonical definition.

---

# 150. Multi-Value Filters

Define whether multiple values are:

```text
OR
AND
```

within one filter group.

---

# 151. Cross-Filter Semantics

Different filter groups generally use:

```text
AND
```

unless product requirements state otherwise.

---

# 152. Range Filters

Range boundaries MUST define:

```text
inclusive/exclusive
timezone
currency
units
```

as applicable.

---

# 153. Date Filters

Date filters MUST handle timezone explicitly.

---

# 154. Money Filters

Money filters MUST account for currency semantics.

Do not compare values from different currencies as though directly equivalent.

---

# 155. Facets

Facets summarize available filter dimensions.

Examples:

```text
category
status
brand
region
```

---

# 156. Facet Counts

Facet counts SHOULD reflect the same permission and query/filter constraints as actual search results.

---

# 157. Facet Leakage

Unauthorized documents MUST NOT influence facet counts visible to a caller.

---

# 158. Sensitive Facets

Do not expose facets that reveal sensitive population information.

---

# 159. Self-Filtering Facets

Facet behavior SHOULD define whether the facet's own active filter is included when computing its counts.

---

# 160. Facet Count Approximation

If counts are approximate, the UI SHOULD avoid implying mathematical exactness when important.

---

# 161. Filter URL State

Shareable search filters SHOULD generally be reflected in URL/query state according to Routes and State Management Guidelines.

---

# 162. Sorting

Sort options MUST be explicit and deterministic.

---

# 163. Relevance Sort

The default full-text result order SHOULD usually be relevance unless another product objective is clearer.

---

# 164. Explicit Sort

Users MAY select:

```text
newest
oldest
price
name
```

where useful.

---

# 165. Stable Sort

Pagination requires deterministic ordering.

---

# 166. Tie-Breaker

Every paginated sort SHOULD have a stable unique tie-breaker.

Example:

```text
score DESC
updated_at DESC
id ASC
```

---

# 167. Equal Score

Do not rely on undocumented internal document IDs for durable pagination order.

---

# 168. Permissions

Search permissions are a mandatory security boundary.

---

# 169. Authentication

Search requests MUST execute under an authenticated/identified context when results depend on caller access.

---

# 170. Authorization

Search MUST return only documents the caller is authorized to discover.

---

# 171. Search Visibility Is Data Access

Even revealing that a record exists can be sensitive.

---

# 172. Result Title Leakage

Unauthorized users MUST NOT receive:

```text
title
name
snippet
count
facet
highlight
```

for protected records.

---

# 173. Post-Filtering Is Dangerous

Bad:

```text
search all
↓
take top 20
↓
remove unauthorized
```

This can produce:

```text
information leakage
bad pagination
empty pages
incorrect counts
```

---

# 174. Permission Filtering Before Ranking/Result Window

Permission constraints SHOULD be part of candidate retrieval/query execution whenever architecture allows it.

---

# 175. Authoritative Permission Model

Search authorization MUST derive from authoritative application permission semantics.

---

# 176. Index ACL Projection

Permission identifiers MAY be projected into the search index for query-time security filtering.

---

# 177. ACL Projection Examples

Indexed security metadata MAY include:

```text
tenant_id
owner_id
visibility
group_ids
access_scope
```

---

# 178. Search Principal

The application MUST derive security principals from trusted authenticated context.

---

# 179. Client-Supplied ACL Is Untrusted

Never trust:

```text
?group_id=admins
```

as proof the caller belongs to that group.

---

# 180. Security Filter Construction

Security filters MUST be constructed server-side.

---

# 181. Search Engine DLS

Native document-level security MAY be used where it correctly implements application access rules.

---

# 182. DLS Does Not Replace Application Authorization

Search-engine security controls provide defense in depth and result trimming.

Authoritative write/read access still follows application authorization policy.

---

# 183. Permission Change Freshness

If indexed permissions are copied from source systems, permission changes MUST reach the search index within the required revocation window.

---

# 184. Revocation Risk

An outdated search ACL can expose records after access has been revoked.

---

# 185. Permission Update Priority

Security-related index updates SHOULD receive higher freshness guarantees than ordinary ranking metadata where necessary.

---

# 186. Defense-in-Depth Recheck

For highly sensitive resources, application read endpoints SHOULD re-authorize when the user opens a result even if search filtering already occurred.

---

# 187. Tenant Isolation

Every multi-tenant search query MUST enforce tenant isolation.

---

# 188. Tenant Filter

Conceptually:

```text
authenticated tenant
↓
mandatory tenant_id filter
↓
user query
```

not:

```text
user chooses tenant filter
```

---

# 189. Tenant Filter Cannot Be Removed

User-controlled search parameters MUST NOT be capable of overriding mandatory tenant constraints.

---

# 190. Tenant as Index Boundary

Large/high-assurance systems MAY use:

```text
index per tenant
index family per tenant class
shared index + tenant filter
```

depending on scale and isolation requirements.

---

# 191. Shared Index

A shared multi-tenant index requires rigorous:

```text
tenant key
permission filters
testing
observability
```

---

# 192. Index-Per-Tenant Tradeoff

Index-per-tenant can improve isolation but increases:

```text
index count
operations
memory overhead
reindex complexity
```

---

# 193. Tenant Routing

Tenant-aware routing MAY improve locality/performance.

It MUST NOT weaken isolation.

---

# 194. Cross-Tenant Admin Search

Administrative cross-tenant search requires explicit privileged authorization.

---

# 195. Support Search

Support staff access SHOULD respect:

```text
support role
tenant scope
audit
impersonation rules
```

---

# 196. Search Audit

Sensitive search activity MAY require auditing under Security/Observability policy.

---

# 197. Search Query Privacy

Search queries can contain sensitive information.

---

# 198. Do Not Log Queries Blindly

Raw search terms SHOULD NOT automatically be logged indefinitely.

---

# 199. Query Analytics

Search analytics SHOULD:

```text
minimize PII
apply retention
respect consent/purpose
restrict access
```

---

# 200. Search History

User-visible search history MUST have explicit persistence/privacy semantics.

---

# 201. Recent Searches

Recent queries MAY be stored locally or server-side according to product requirements.

---

# 202. Sensitive Search History

Sensitive domains MAY require search history to be disabled or specially protected.

---

# 203. Pagination

Search pagination MUST be designed for the search engine's consistency model.

---

# 204. Offset Pagination

Offset pagination MAY work for shallow result sets.

Example:

```text
page=3
size=20
```

---

# 205. Deep Offset Pagination

Deep offset pagination SHOULD be avoided in large result sets.

It may require the engine to process/discard many earlier hits.

---

# 206. Cursor/Search-After Pagination

Deep interactive search SHOULD generally use cursor/search-after style pagination where supported.

---

# 207. Cursor Contents

A search cursor MAY encode:

```text
last sort values
tie-breaker
query context
snapshot identity
```

---

# 208. Cursor Opaqueness

Clients SHOULD treat search cursors as opaque.

---

# 209. Cursor Integrity

Cursors SHOULD be signed/validated when clients could manipulate fields to escape intended query constraints.

---

# 210. Cursor Query Binding

A cursor SHOULD NOT be reusable against a materially different query/filter/security context.

---

# 211. Pagination and Mutation

Results may change while users paginate.

---

# 212. Stable Snapshot

When stable traversal is required, use point-in-time/snapshot capabilities where supported.

---

# 213. Search Point-in-Time

A point-in-time view can preserve consistent index state across multiple pagination requests.

---

# 214. PIT Expiry

Point-in-time contexts MUST have bounded lifetimes.

---

# 215. Deep Export

Do not use user-facing search pagination as a bulk export architecture.

---

# 216. Bulk Retrieval

Large export/reindex operations SHOULD use dedicated streaming/batch mechanisms appropriate to the engine.

---

# 217. Page Size

Search page size MUST be bounded.

---

# 218. Oversized Page

Do not allow:

```text
size=1000000
```

from arbitrary clients.

---

# 219. Maximum Page Size

The API SHOULD establish a maximum page size.

---

# 220. Total Result Count

Exact total counts can be expensive.

---

# 221. Count Requirement

Determine whether the UI truly needs:

```text
13,847 results
```

or whether:

```text
10,000+
many results
```

is sufficient.

---

# 222. Approximate Counts

Approximate/capped counts MAY be used when exact counts are expensive.

The UX SHOULD communicate this appropriately.

---

# 223. Pagination Metadata

Responses SHOULD provide only meaningful pagination metadata.

---

# 224. Result Snippets

Search results SHOULD display enough context to help users decide whether to open a result.

---

# 225. Highlighting

Highlighting MAY show matched text.

---

# 226. Highlight Security

Highlights MUST come only from authorized, retrievable content.

---

# 227. Highlight Escaping

Search highlights MUST be safely escaped/sanitized before rendering.

---

# 228. Stored Markup

Do not trust HTML emitted from search content merely because it came from the search engine.

---

# 229. Truncation

Snippets SHOULD truncate safely and preserve readable boundaries where practical.

---

# 230. Result Title

Every result SHOULD have a clear primary label.

---

# 231. Result Type

Global search SHOULD indicate result type when multiple domains are mixed.

Example:

```text
Project
User
Invoice
Article
```

---

# 232. Secondary Metadata

Useful result context MAY include:

```text
status
owner
updated date
category
```

provided the caller may see it.

---

# 233. Relevance Explanation

Internal tooling MAY expose ranking explanations for debugging.

---

# 234. Do Not Expose Internal Scoring Blindly

Raw ranking details MAY reveal:

```text
security metadata
business boosts
internal fields
```

and should normally remain operator/developer-only.

---

# 235. Empty Search State

An empty search box is different from a no-result search.

---

# 236. Empty State

Before a query, the UI MAY show:

```text
recent searches
recent items
popular content
search guidance
```

where appropriate.

---

# 237. No-Result State

A completed query with zero results SHOULD explicitly say no results matched.

---

# 238. No-Result Guidance

Useful actions MAY include:

```text
check spelling
remove filters
broaden terms
clear date range
browse categories
```

---

# 239. Preserve Query

Do not erase the user's query after a no-result response.

---

# 240. Preserve Filters

No-result UI SHOULD show active filters clearly.

---

# 241. Clear Filters

Offer an obvious way to remove restrictive filters.

---

# 242. No Fake Results

Do not silently replace zero results with unrelated content while implying it matched the query.

---

# 243. Recommended Alternatives

Recommendations MAY appear separately from true search matches.

---

# 244. Permission-Aware Empty State

Do not reveal:

```text
3 results exist but you lack permission
```

unless the product explicitly allows that disclosure.

---

# 245. Search Errors

Search-service failure is different from no results.

---

# 246. Error vs Empty

Never render:

```text
No results
```

when the backend request failed.

---

# 247. Search Error UX

Transient failure SHOULD communicate:

```text
search unavailable
retry
```

without implying the corpus is empty.

---

# 248. Partial Search

Federated search MAY return partial results if one source fails.

Partial-state UX MUST clearly indicate incompleteness.

---

# 249. Timeouts

Search queries MUST have bounded execution time.

---

# 250. Timeout Behavior

When timeouts occur, define whether:

```text
partial result allowed
request fails
fallback used
```

according to product semantics.

---

# 251. Query Cancellation

Search requests SHOULD propagate cancellation where engine/runtime support permits it.

---

# 252. Superseded Queries

Autocomplete/search-as-you-type requests SHOULD not continue consuming resources unnecessarily after being superseded.

---

# 253. Indexing

Indexing pipelines MUST be observable and retryable.

---

# 254. Indexing Source

Every indexed document MUST be traceable to an authoritative source record or source event.

---

# 255. Search Document ID

Use stable document identity.

---

# 256. Deterministic ID

Reindexing the same entity SHOULD address the same logical search document where semantics require it.

---

# 257. Upsert

Indexing SHOULD normally be idempotent.

---

# 258. Duplicate Events

Duplicate change events MUST NOT create duplicate logical search documents.

---

# 259. Indexing Version

An entity revision/version MAY be included to prevent older events overwriting newer index state.

---

# 260. Out-of-Order Indexing

Consumers MUST consider:

```text
update v5
arrives
then
update v4
```

---

# 261. Version Guard

Use source revision/version ordering where needed to reject stale updates.

---

# 262. Delete Events

Entity deletion MUST remove or tombstone the search document within the required freshness window.

---

# 263. Permission Revocation Event

Permission removal is effectively a security-sensitive index update.

---

# 264. Indexing Retry

Transient indexing failures SHOULD use bounded retry/backoff.

---

# 265. Poison Document

Documents that repeatedly fail indexing SHOULD be quarantined for investigation.

---

# 266. Indexing DLQ

Critical indexing pipelines SHOULD have an owned failure/DLQ process.

---

# 267. Index Lag

Measure time between:

```text
authoritative change
↓
searchable change
```

---

# 268. Freshness SLI

Search freshness MAY be measured as:

```text
95% of updates searchable within X seconds
```

according to product requirements.

---

# 269. Backfill

Index backfills SHOULD be resumable and idempotent.

---

# 270. Bulk Indexing

Bulk operations SHOULD use bounded batches.

---

# 271. Bulk Failure

Partial bulk indexing failures require item-level retry rather than blindly repeating successful items where unnecessary.

---

# 272. Indexing Backpressure

Indexers MUST respect search-cluster capacity.

---

# 273. Reindexing

Search schemas/analyzers often require full reindexing.

---

# 274. Reindex Strategy

Canonical approach:

```text
Create new versioned index
↓
Backfill
↓
Verify
↓
Catch up changes
↓
Switch read alias/routing
↓
Monitor
↓
Retire old index
```

---

# 275. Versioned Index Names

Example:

```text
projects_v7
```

with application queries using a stable logical alias:

```text
projects_current
```

---

# 276. Zero-Downtime Switch

Where engine support permits it, index aliases or equivalent routing SHOULD allow atomic/near-atomic transition to the rebuilt index.

---

# 277. Reindex Validation

Before cutover validate:

```text
document count
sample documents
permissions
ranking
filters
facets
latency
freshness
```

---

# 278. Count Is Not Enough

Matching document counts do not prove equivalent search behavior.

---

# 279. Shadow Query

High-risk migrations MAY run representative queries against old/new indices for comparison.

---

# 280. Dual Write During Reindex

If live changes occur during reindex, use:

```text
outbox replay
change-log catch-up
dual indexing
```

or another deliberate synchronization method.

---

# 281. Dual Write Risk

Naive direct dual writes can fail partially.

Use an architecture with replay/reconciliation.

---

# 282. Reindex Checkpoint

Long reindex operations SHOULD be resumable from known progress.

---

# 283. Reindex Throttling

Reindexing MUST NOT overload:

```text
source DB
network
search cluster
```

---

# 284. Old Index Retention

Keep the previous index briefly when fast rollback is useful and data/security requirements permit it.

---

# 285. Old Index Security

Retired indices containing sensitive data remain protected until deleted.

---

# 286. Index Deletion

Delete obsolete indexes according to retention and rollback policy.

---

# 287. Schema Compatibility

Rolling application deployments MAY have old and new versions querying the same index alias.

Compatibility must be considered.

---

# 288. Mapping Change

Do not assume every mapping/schema field can be changed in place.

Plan rebuilds where the engine requires them.

---

# 289. Search Configuration as Code

Index mappings, analyzers, ranking rules, and operational configuration SHOULD be version-controlled.

---

# 290. Manual Dashboard Changes

Routine production relevance/schema changes SHOULD NOT exist only as manual console configuration.

---

# 291. Synonym Governance

Synonym sets SHOULD be version-controlled or otherwise auditable.

---

# 292. Ranking Configuration

Important ranking changes SHOULD have:

```text
owner
reason
evaluation evidence
release history
```

---

# 293. Search Feature Flags

Large ranking/search changes MAY use Feature Flags for controlled rollout.

---

# 294. Index Naming

Names SHOULD encode:

```text
domain
environment where needed
schema generation
```

without unnecessary entropy.

---

# 295. Environment Isolation

Development/staging/production search data MUST be appropriately isolated.

---

# 296. Production Data in Dev

Do not copy unrestricted production indices into development environments.

---

# 297. Search Infrastructure Security

Search clusters SHOULD remain private/internal unless direct public access is explicitly required.

---

# 298. Direct Browser Access

Browser/mobile clients SHOULD generally query an application/search API rather than receive unrestricted search-cluster credentials.

---

# 299. Search API

The server/API layer SHOULD enforce:

```text
authentication
authorization
tenant filtering
query validation
rate limits
response projection
```

---

# 300. Search Engine Credentials

Search-engine credentials are secrets.

---

# 301. Workload Identity

Prefer managed/workload identity where the platform supports it.

---

# 302. Index Permissions

Indexer identities SHOULD have only required write permissions.

---

# 303. Query Permissions

Search query services SHOULD not automatically receive cluster-administrator privileges.

---

# 304. Search Administration

Schema/index administration requires separately controlled privileges where practical.

---

# 305. Encryption

Search data SHOULD use appropriate encryption:

```text
in transit
at rest
```

according to infrastructure/security policy.

---

# 306. Backups

If the index is fully reconstructible within RTO, snapshot backup may be unnecessary.

---

# 307. Rebuild vs Backup

Decide whether recovery is:

```text
restore search snapshot
or
rebuild from authoritative source
```

based on RTO, corpus size, and cost.

---

# 308. Search DR

Search recovery MUST fit Backup & Disaster Recovery objectives.

---

# 309. Rebuild Time

If full index rebuild requires 36 hours but search RTO is 30 minutes, independent snapshots/replicas may be required.

---

# 310. Search Cluster Failure

Applications SHOULD define degradation behavior when search is unavailable.

---

# 311. Search Fallback

Possible fallback behavior:

```text
exact DB lookup
recent items
restricted browse
search unavailable message
```

depending on product needs.

---

# 312. Do Not Overload Primary DB During Search Outage

A fallback that directs all full-text search traffic to the transactional DB may worsen the incident.

---

# 313. Search Capacity

Capacity planning SHOULD consider:

```text
document count
index size
query rate
index rate
facet load
vector size
replicas
reindex load
```

---

# 314. Read/Write Competition

Heavy indexing can affect search latency.

Capacity should account for simultaneous query and indexing workloads.

---

# 315. Sharding

Search-engine sharding SHOULD be based on measured scale.

---

# 316. Too Many Shards

Excessive small shards can increase:

```text
memory
cluster state
query fan-out
operations
```

---

# 317. Too Few Shards

Insufficient sharding may constrain:

```text
capacity
parallelism
growth
```

---

# 318. Sharding Is Provider-Specific

Do not cargo-cult one shard count across unrelated indexes.

---

# 319. Replicas

Search replicas MAY provide:

```text
availability
read scale
```

according to engine capabilities.

---

# 320. Replicas Are Not Backup

Logical corruption or bad indexing can propagate to replicas.

---

# 321. Query Cache

Search engines may maintain internal query/request caches.

Understand them before adding external caching.

---

# 322. Application Search Cache

Search-result caching SHOULD be used carefully because query and permission cardinality may be high.

---

# 323. Search Cache Key

Any search cache MUST include:

```text
tenant/security scope
query
filters
sort
pagination/cursor context
locale
```

as applicable.

---

# 324. Search Cache Privacy

Never reuse personalized/permission-sensitive search results across unauthorized contexts.

---

# 325. Search Cache Staleness

Search caching can increase effective indexing delay.

Account for both:

```text
index freshness
+
cache freshness
```

---

# 326. Observability

Search MUST be observable as a distinct product/runtime capability.

---

# 327. Query Metrics

Important metrics include:

```text
query rate
latency p50/p95/p99
errors
timeouts
zero-result rate
```

---

# 328. Relevance Metrics

Track appropriate signals such as:

```text
click-through
reformulation
abandonment
successful result selection
```

with Analytics governance.

---

# 329. Indexing Metrics

Track:

```text
documents indexed
indexing errors
indexing lag
retry rate
DLQ
reindex progress
```

---

# 330. Cluster Metrics

Monitor:

```text
CPU
memory
disk
heap
shard health
query saturation
indexing saturation
```

according to engine.

---

# 331. Permission Metrics

Security-sensitive search systems SHOULD monitor permission/indexing lag where possible.

---

# 332. Zero-Result Metric

High zero-result rate MAY indicate:

```text
missing content
poor analysis
bad synonyms
typos
overly restrictive filters
```

---

# 333. Query Reformulation

Repeated search changes may indicate poor first-query relevance.

---

# 334. Search Latency Budget

Search SHOULD have an explicit latency SLO.

---

# 335. Autocomplete Latency Budget

Autocomplete generally requires a stricter latency budget than final result search.

---

# 336. Timeout Metrics

Search timeouts SHOULD be visible separately from genuine zero-result queries.

---

# 337. Slow Query Logging

Slow queries MAY be sampled/logged for diagnosis.

---

# 338. Query Privacy in Logs

Slow-query diagnostics MUST still follow privacy rules.

---

# 339. Search Dashboard

A useful dashboard MAY include:

```text
traffic
latency
errors
zero results
index freshness
DLQ
cluster saturation
```

---

# 340. Alerts

Alerts SHOULD focus on actionable symptoms such as:

```text
search unavailable
p95 exceeds SLO
indexing stopped
permission lag excessive
disk near capacity
DLQ growing
```

---

# 341. Testing

Search requires dedicated correctness, relevance, security, and performance testing.

---

# 342. Query Unit Tests

Test query construction and normalization.

---

# 343. Analyzer Tests

Test representative terms through analyzers.

---

# 344. Synonym Tests

Every important synonym set SHOULD have positive and negative test examples.

---

# 345. Fuzzy Tests

Typo tolerance SHOULD test:

```text
common misspelling
short query
exact ID
unrelated near-term
```

---

# 346. Ranking Tests

Maintain a representative relevance regression set.

---

# 347. Permission Tests

Search MUST test:

```text
authorized document appears
unauthorized document absent
```

---

# 348. Cross-Tenant Tests

Attempt searches designed to expose another tenant's:

```text
records
counts
facets
suggestions
highlights
```

---

# 349. ACL Change Test

Test permission grant and revocation propagation.

---

# 350. Deletion Test

Deleted records MUST disappear according to freshness requirements.

---

# 351. Pagination Tests

Test:

```text
equal scores
tie-breakers
next cursor
mutating index
deep pagination
```

---

# 352. Filter Tests

Test filter:

```text
AND/OR semantics
ranges
dates
null/missing values
```

---

# 353. Facet Tests

Facet counts MUST match permission/query semantics.

---

# 354. No-Result Tests

Test:

```text
zero results
query preserved
filter removal
error vs no-result distinction
```

---

# 355. Indexing Tests

Test:

```text
duplicate event
out-of-order event
failed event
delete event
replay
```

---

# 356. Reindex Tests

Verify new index schema before production cutover.

---

# 357. Load Tests

Search performance tests SHOULD include realistic:

```text
query mix
filters
facets
concurrency
indexing load
```

---

# 358. Worst Queries

Performance tests SHOULD include expensive legitimate query classes, not only easy exact matches.

---

# 359. Security Abuse Tests

Test bounded behavior for:

```text
huge queries
wildcards
regex
many filters
high page sizes
```

---

# 360. Search Review Checklist

```text
□ Search requirement understood
□ Architecture justified
□ Source of truth identified
□ Index owner
□ Index schema
□ Freshness requirement
□ Permission model
□ Tenant model
□ Ranking strategy
□ Filters/facets
□ Typo behavior
□ Pagination
□ No-result UX
□ Observability
□ Recovery
```

---

# 361. Index Checklist

```text
□ Stable document ID
□ Searchable fields
□ Exact/filter fields
□ Sort fields
□ Security fields
□ Language
□ Analyzer
□ Sensitive fields minimized
□ Schema version
□ Rebuild strategy
□ Owner
```

---

# 362. Query Checklist

```text
□ Query normalized
□ Input bounded
□ DSL injection prevented
□ Tenant filter mandatory
□ Authorization filter mandatory
□ Search fields explicit
□ Fuzzy behavior bounded
□ Filters validated
□ Sort deterministic
□ Timeout
□ Page size bounded
```

---

# 363. Ranking Checklist

```text
□ User information need defined
□ Baseline ranking
□ Exact-match behavior
□ Field boosts justified
□ Freshness/popularity intentional
□ Representative query set
□ Relevance metric
□ Regression evaluation
□ Latency impact
□ Security independent
```

---

# 364. Permissions Checklist

```text
□ Authentication context trusted
□ Tenant scope mandatory
□ ACL/security metadata trustworthy
□ Client cannot remove security filter
□ Unauthorized documents excluded before result window
□ Facets/counts permission-aware
□ Suggestions permission-aware
□ Highlighting permission-aware
□ Revocation freshness defined
□ Result-open endpoint re-authorizes
```

---

# 365. Tenant Isolation Checklist

```text
□ tenant_id indexed
□ Tenant scope comes from trusted context
□ User query cannot override scope
□ Search result cross-tenant test
□ Facet cross-tenant test
□ Suggestion cross-tenant test
□ Cache tenant-safe
□ Admin cross-tenant search separately authorized
```

---

# 366. Typo Tolerance Checklist

```text
□ Exact terms prioritized
□ Fuzziness bounded
□ Short terms conservative
□ Expansion bounded
□ Prefix behavior reviewed
□ IDs/SKUs/email protected from over-fuzziness
□ Performance tested
□ Precision evaluated
```

---

# 367. Filter & Facet Checklist

```text
□ Filter fields allowlisted
□ Values typed
□ AND/OR behavior defined
□ Range semantics defined
□ Date timezone defined
□ Money currency defined
□ Facets permission-aware
□ Counts correct/appropriately approximate
□ Cardinality acceptable
```

---

# 368. Pagination Checklist

```text
□ Page size bounded
□ Deterministic sort
□ Unique tie-breaker
□ Offset only for shallow results
□ Cursor/search-after for deep traversal
□ Cursor bound to query/security context
□ PIT/snapshot if consistency required
□ Export uses separate architecture
```

---

# 369. Indexing Checklist

```text
□ Idempotent document writes
□ Stable document ID
□ Duplicate events safe
□ Out-of-order events safe
□ Delete propagation
□ Permission updates
□ Retry
□ Poison document path
□ DLQ owner
□ Freshness metrics
```

---

# 370. Reindex Checklist

```text
□ New versioned index
□ Mapping/analyzer validated
□ Backfill resumable
□ Live changes synchronized
□ Document reconciliation
□ Permission validation
□ Ranking comparison
□ Performance comparison
□ Alias/routing switch
□ Rollback path
□ Old index retirement
```

---

# 371. No-Result UX Checklist

```text
□ Query remains visible
□ Active filters visible
□ Clear-filter action
□ Spelling/help suggestions where useful
□ No unrelated results pretending to match
□ Permission existence not leaked
□ Backend error not presented as zero results
```

---

# 372. Search Observability Checklist

```text
□ Query volume
□ Latency percentiles
□ Error rate
□ Timeout rate
□ Zero-result rate
□ Index freshness
□ Indexing errors
□ DLQ
□ Reindex progress
□ Cluster capacity
□ Relevance/business signals
```

---

# 373. Definition of Done — New Search Surface

A production search surface is ready when:

```text
✓ Information need defined
✓ Search architecture justified
✓ Index/source ownership defined
✓ Index schema reviewed
✓ Freshness target defined
✓ Ranking baseline established
✓ Permission and tenant filtering enforced
✓ Query validation/limits exist
✓ Pagination defined
✓ Empty/no-result/error states distinct
✓ Indexing/reindex path exists
✓ Search observability exists
✓ Security tests pass
✓ Relevance tests exist
✓ Performance tested
```

---

# 374. Definition of Done — Index Schema Change

```text
✓ Mapping/analyzer change identified
✓ Reindex requirement known
✓ New index built if required
✓ Backfill completed
✓ Live update synchronization complete
✓ Permission metadata verified
✓ Query/ranking regression tested
✓ Latency tested
✓ Cutover performed safely
✓ Old index retained/deleted according to policy
```

---

# 375. Definition of Done — Ranking Change

```text
✓ User need identified
✓ Change hypothesis
✓ Representative query set
✓ Offline evaluation
✓ Security unchanged
✓ Performance impact measured
✓ Production rollout controlled
✓ Online outcomes observed where applicable
✓ Regression plan
```

---

# 376. Search Anti-Patterns

Avoid:

```text
search engine = source of truth
```

without deliberate datastore architecture.

Avoid:

```text
send entire database object into index
```

by default.

Avoid:

```text
index every field
```

because storage is available.

Avoid:

```text
all strings analyzed the same way
```

Avoid:

```text
ID field fuzzy matched
```

as primary behavior.

Avoid:

```text
fuzziness everywhere
```

Avoid:

```text
max expansions = enormous
```

without performance limits.

Avoid:

```text
synonyms = huge uncontrolled dictionary
```

Avoid:

```text
one analyzer
```

for every language.

Avoid:

```text
wildcard *term*
```

for arbitrary high-volume user searches.

Avoid:

```text
raw user query
→ unrestricted search DSL
```

Avoid:

```text
rank unauthorized results lower
```

instead of excluding them.

Avoid:

```text
search first
take 20
remove unauthorized
```

Avoid:

```text
tenant_id from query parameter
```

as the security boundary.

Avoid:

```text
shared index
no mandatory tenant filter
```

Avoid:

```text
facet count includes unauthorized documents
```

Avoid:

```text
autocomplete reveals protected document names
```

Avoid:

```text
query logs forever
```

containing sensitive search terms.

Avoid:

```text
page=50000
```

through deep offset pagination.

Avoid:

```text
sort by score only
```

without deterministic tie-breaking.

Avoid:

```text
exact total count
```

when it is expensive and the product does not need it.

Avoid:

```text
No results
```

when search actually timed out.

Avoid:

```text
search backend error
→ empty array
```

silently.

Avoid:

```text
new document indexed
therefore permissions definitely current
```

without security freshness guarantees.

Avoid:

```text
reindex in place
```

when schema changes require replacement and rollback matters.

Avoid:

```text
production index mapping edited manually
```

with no version-controlled definition.

Avoid:

```text
rebuild complete
because counts match
```

without relevance/security validation.

Avoid:

```text
dual index writes
```

with no reconciliation for partial failure.

Avoid:

```text
embedding model changed
same vector index assumed valid
```

Avoid:

```text
semantic search
```

because "AI search" sounds better.

Avoid:

```text
click-through increased
therefore relevance improved
```

without broader evaluation.

Avoid:

```text
search result cache
```

without tenant/permission scope.

Avoid:

```text
search cluster down
→ forward every query to transactional DB
```

without capacity controls.

---

# 377. AI Search Rules

AI coding agents MUST identify whether database-native search satisfies the requirement before introducing dedicated search infrastructure.

---

# 378. AI Source-of-Truth Rule

AI MUST treat ordinary search indexes as derived data unless architecture explicitly states otherwise.

---

# 379. AI Index Rule

AI SHOULD index only fields required for:

```text
search
ranking
filtering
sorting
display
security
```

---

# 380. AI Tenant Rule

AI MUST include mandatory trusted tenant scope in every multi-tenant search query.

---

# 381. AI Permission Rule

AI MUST NOT implement:

```text
fetch results
then filter unauthorized
```

as normal search authorization.

---

# 382. AI ACL Rule

AI MUST derive permission filters from trusted authenticated context, not client-provided membership claims.

---

# 383. AI Facet Rule

AI MUST ensure facets and counts use the same security restrictions as results.

---

# 384. AI Suggestion Rule

AI MUST ensure autocomplete/suggestions cannot enumerate protected entities.

---

# 385. AI Query Rule

AI MUST validate and bound user-generated search expressions.

---

# 386. AI DSL Rule

AI MUST NOT pass arbitrary user input directly into powerful provider DSL.

---

# 387. AI Fuzzy Rule

AI SHOULD use bounded typo tolerance and preserve exact identifier behavior.

---

# 388. AI Ranking Rule

AI MUST NOT introduce unexplained ranking boosts.

---

# 389. AI Relevance Rule

AI SHOULD add representative relevance tests when materially changing ranking.

---

# 390. AI Semantic Rule

AI MUST NOT introduce vector/embedding search without a clear relevance requirement and model/version lifecycle.

---

# 391. AI Hybrid Rule

AI SHOULD preserve lexical exact matching when adding semantic retrieval.

---

# 392. AI Pagination Rule

AI SHOULD prefer cursor/search-after semantics over deep offset pagination on large result sets.

---

# 393. AI Tie-Breaker Rule

AI MUST define deterministic sorting for paginated results.

---

# 394. AI Indexing Rule

AI SHOULD make indexing idempotent and safe for duplicate/out-of-order change events.

---

# 395. AI Permission Freshness Rule

AI MUST treat stale indexed ACLs as a potential security issue.

---

# 396. AI Reindex Rule

AI SHOULD use versioned replacement indices and controlled alias/routing cutover for incompatible schema/analyzer changes.

---

# 397. AI No-Result Rule

AI MUST distinguish:

```text
zero matches
search failure
timeout
partial result
```

in product behavior.

---

# 398. AI Privacy Rule

AI SHOULD minimize sensitive query/index/log data.

---

# 399. AI Search Cache Rule

AI MUST include:

```text
tenant
permission scope
query
filters
sort
pagination
```

as relevant when caching search results.

---

# 400. AI Gold Rule

When uncertain:

```text
Exact authoritative lookup
>
Database-native search
>
Dedicated lexical search
>
Hybrid lexical + semantic search
>
Complex ML/LLM ranking
```

only moving downward when requirements justify the added complexity.

For security:

```text
Trusted identity
↓
Mandatory tenant scope
↓
Permission filter
↓
Candidate retrieval
↓
Ranking
↓
Result
↓
Reauthorization on sensitive access
```

never:

```text
Retrieve everything
↓
hope UI hides what user cannot see
```

---

# 401. Golden Search Rules

**1. Search is a derived retrieval system, not the default source of truth.**

**2. Use the simplest search architecture that satisfies actual product requirements.**

**3. Database-native search is valid when scale and relevance needs are modest.**

**4. Dedicated search infrastructure is introduced for concrete retrieval, relevance, latency, or scale requirements.**

**5. Every search index has an owner and documented purpose.**

**6. Index only fields required for retrieval, ranking, filtering, sorting, display, or security.**

**7. Sensitive data is not indexed without a real search requirement.**

**8. Search freshness is an explicit product SLO.**

**9. Eventual consistency is acknowledged in API and UX behavior.**

**10. Search documents have stable deterministic identities.**

**11. Indexing is idempotent and tolerant of duplicate events.**

**12. Out-of-order updates cannot overwrite newer search state incorrectly.**

**13. Deletes propagate to the index within the required freshness window.**

**14. Permission revocations are treated as security-sensitive indexing operations.**

**15. Text and exact-value fields use different analysis semantics.**

**16. IDs, statuses, tenant IDs, and enums are not treated as ordinary prose.**

**17. Analyzers are version-controlled product behavior.**

**18. Language-specific analysis is used where language materially affects retrieval.**

**19. Synonyms are governed domain rules, not uncontrolled thesaurus expansion.**

**20. Typo tolerance is bounded and preserves exact-match precision.**

**21. Fuzzy matching is not enabled indiscriminately on short terms or identifiers.**

**22. User input never receives unrestricted search-engine DSL capability.**

**23. Query size, clauses, filters, page size, and expensive constructs are bounded.**

**24. Ranking reflects user information need.**

**25. Exact matches normally outrank fuzzy approximations when semantics support it.**

**26. Business, popularity, and freshness boosts have explicit rationale.**

**27. Permissions are enforced before unauthorized documents enter the visible result set.**

**28. Ranking never overrides authorization.**

**29. Search discovery itself is treated as data access.**

**30. Titles, snippets, counts, facets, highlights, and suggestions obey permission rules.**

**31. Tenant scope comes from trusted authenticated context.**

**32. Users cannot remove or replace mandatory tenant filters.**

**33. Shared multi-tenant indices receive explicit cross-tenant security testing.**

**34. Search-engine DLS/security filtering supplements but does not replace application authorization.**

**35. Indexed ACL information has a defined revocation/freshness window.**

**36. Sensitive records are re-authorized when opened where appropriate.**

**37. Filters use allowlisted fields and typed values.**

**38. Facet counts use the same search/security population as the results.**

**39. Search pagination has deterministic sorting and a stable tie-breaker.**

**40. Deep result traversal uses cursor/search-after semantics rather than unlimited offsets.**

**41. Stable point-in-time traversal is used when consistency across pages is required.**

**42. User-facing search pagination is not used as a bulk export mechanism.**

**43. Result page size is bounded.**

**44. Exact result counts are computed only when their product value justifies their cost.**

**45. Empty search, no results, error, timeout, and partial results are distinct UI states.**

**46. No-result states preserve the query and help users recover.**

**47. Search failures are never silently presented as valid zero results.**

**48. Autocomplete has tighter latency and resource controls than normal search where appropriate.**

**49. Out-of-order autocomplete responses cannot overwrite newer results.**

**50. Suggestions do not leak unauthorized entity names.**

**51. Semantic/vector search is introduced only after measurable relevance need is established.**

**52. Embedding/model versions are tracked and vector indexes rebuilt when the vector space changes.**

**53. Hybrid search preserves exact lexical behavior where exact terms matter.**

**54. Ranking changes are evaluated against representative query sets.**

**55. Search quality uses offline relevance evaluation as well as appropriate production behavior metrics.**

**56. Clicks alone are not treated as objective relevance truth.**

**57. Query analytics follow privacy, purpose, and retention controls.**

**58. Raw user searches are not logged indefinitely by default.**

**59. Reindexing is versioned, validated, resumable, and reversible where practical.**

**60. New indices are validated for permissions and relevance—not only document counts.**

**61. Reindexing does not overload authoritative datastores or the search cluster.**

**62. Index aliases/routing enable controlled zero/low-downtime cutover where supported.**

**63. Old indices remain protected until intentionally retired.**

**64. Search schemas, analyzers, synonym sets, and ranking configuration are governed as code/configuration.**

**65. Search clusters remain private and least-privileged by default.**

**66. Browser clients do not receive unrestricted search-engine credentials.**

**67. Indexer and query identities receive only their required privileges.**

**68. Search recovery strategy is based on whether rebuilding can satisfy RTO.**

**69. Replicas improve availability but do not replace recovery.**

**70. Search-result caches preserve query, tenant, and permission boundaries.**

**71. Search observability covers latency, errors, zero results, freshness, indexing, and infrastructure saturation.**

**72. Search tests include relevance, typo handling, permission isolation, pagination, and no-result behavior.**

**73. Multi-tenant testing includes result, facet, count, highlight, and autocomplete leakage.**

**74. Relevance regressions are treated as product defects.**

**75. If an unauthorized document can influence anything visible to the caller, search authorization is incomplete.**

---

# 402. Canonical Search Standard

The organizational standard is:

> **Search is implemented as a permission-aware retrieval projection over authoritative application data. The organization uses the simplest search architecture capable of satisfying defined corpus size, information-retrieval quality, filtering, latency, freshness, language, and scale requirements, beginning with database-native capabilities where sufficient and introducing dedicated lexical, semantic, or hybrid search infrastructure only when measurable product needs justify its operational complexity.**

> **Search indexes are derived and reconstructible wherever practical. Every index has an owner, stable document identities, version-controlled schema and analysis configuration, explicit searchable/filterable/sortable/security fields, a documented freshness objective, and an idempotent indexing path that tolerates duplicate and out-of-order changes. Deletions and permission revocations propagate within defined windows, and indexing lag is measured as a production SLI when search freshness materially affects users or security.**

> **Search security is enforced during retrieval rather than repaired after ranking. Trusted authenticated context determines mandatory tenant and authorization filters, unauthorized documents are excluded before result windows, and user-controlled query parameters cannot weaken those restrictions. Result titles, snippets, counts, facets, highlights, autocomplete suggestions, and related metadata obey the same permission boundary. Native search-engine document/field-level security may provide defense in depth, but it does not substitute for authoritative application authentication and authorization. Sensitive resources are re-authorized through normal application paths when opened or acted upon.**

> **Ranking is treated as governed product behavior. Search begins with a defensible baseline relevance model, uses exact matches, field importance, phrase matching, freshness, popularity, personalization, semantic similarity, and business signals only where they represent legitimate information needs, and measures quality against representative queries and relevance judgments. Ranking changes are evaluated offline and, when appropriate, through controlled production experimentation; engagement signals are interpreted cautiously rather than accepted as objective relevance truth.**

> **Typo tolerance, synonyms, linguistic analysis, semantic retrieval, and query expansion are bounded recall mechanisms. Exact identifiers and high-confidence matches remain reliable, short terms are not expanded recklessly, expensive fuzzy or wildcard queries are constrained, and synonym dictionaries have domain ownership. Semantic/vector and hybrid search track embedding/model versions, preserve important lexical exact-match behavior, and maintain predictable fallback behavior when optional model or reranking dependencies fail.**

> **Filtering, faceting, sorting, and pagination are explicit contracts. Filter fields and operators are allowlisted and typed, date/money/range semantics are defined, facet counts use the same authorized candidate population as result documents, sort order is deterministic, page size is bounded, and deep traversal uses cursor/search-after approaches rather than unrestricted offset pagination. Point-in-time or equivalent snapshots are used where a stable result set across pages is required, while bulk exports and complete-corpus processing use separate batch-oriented retrieval mechanisms.**

> **Search UX distinguishes empty input, zero matches, backend failure, timeout, and partial results. No-result states preserve user intent, reveal active filters, offer legitimate ways to broaden a query, and never fabricate unrelated content as though it matched. Search suggestions and autocomplete operate under the same permission and tenant model, prevent stale out-of-order requests from overwriting newer results, and cannot be used to enumerate restricted entities.**

> **Index lifecycle management supports safe evolution. Incompatible mapping, analyzer, or embedding changes create versioned replacement indexes, backfill deterministically, synchronize current changes, validate document integrity, authorization, ranking, filtering, and performance, and then switch application routing through an alias or equivalent controlled mechanism. Old indexes remain protected until rollback requirements expire and are removed according to retention policy rather than accumulating indefinitely.**

> **Search is observable and recoverable as a first-class production capability. Systems monitor query latency, errors, timeouts, zero-result rates, indexing throughput, freshness lag, dead-letter failures, cluster capacity, and appropriate relevance/product signals. Query logs and analytics follow privacy controls. Recovery strategy explicitly chooses between rebuilding derived indexes and restoring snapshots based on corpus size and RTO, and application degradation during search outages does not unintentionally overload transactional databases or bypass normal authorization.**

A production-grade search system should make it easy to answer:

```text
Why does this product need dedicated search?
What is the authoritative source?
Which index contains this entity?
Who owns that index?
How quickly should source changes become searchable?
Can the index be rebuilt?
What fields are searchable?
What fields are exact/filterable?
Which analyzer processes each language?
Which synonyms exist and who owns them?
How are typos handled?
Are exact IDs protected from fuzzy matching?
How are search results ranked?
What relevance test set exists?
Which ranking signals are business-defined?
How is tenant scope added?
Can a client remove it?
How are permissions represented in the index?
How quickly does permission revocation propagate?
Can unauthorized data affect counts, facets, suggestions, or highlights?
Does opening a result re-authorize sensitive access?
Which filters are allowed?
How are facets calculated?
How is sorting stabilized?
What tie-breaker supports pagination?
How are deep pages retrieved?
What happens when the index changes during pagination?
How are zero results distinguished from search failure?
Can autocomplete leak protected entity names?
How are user queries logged and retained?
How are duplicate and out-of-order indexing events handled?
What happens when one document cannot be indexed?
How is full reindexing performed?
How is a new index validated before cutover?
How is rollback performed?
What happens if the search cluster fails?
How long would full reconstruction take?
What metrics prove search is fast, fresh, relevant, and secure?
```

If those questions cannot be answered reliably, search is functioning as an opaque retrieval feature rather than a governed production subsystem.

Three implementation details are particularly worth locking into the corpus. First, **permission trimming must happen as part of retrieval**: OpenSearch supports document-level restrictions, while Azure AI Search documents query-time security filters that exclude documents based on trusted user/group principals. Microsoft explicitly warns that merely making ACL fields non-retrievable is not itself access control; the security filter must be applied to the search. citeturn363875search1turn363875search0

Second, deep offset pagination should not be the long-term pagination model for large search sets. Current Elasticsearch guidance uses `search_after`, and recommends pairing it with a point-in-time view when a stable index snapshot is required for deep traversal. citeturn363875search4

Third, relevance should be regression-tested rather than tuned by intuition. Elasticsearch's current ranking-evaluation facilities explicitly use representative search requests plus relevance judgments and metrics such as reciprocal rank, precision, and discounted cumulative gain. Fuzzy search likewise needs bounded edit distance/expansion because broad expansion can materially increase query cost. citeturn847682search0turn363875search3

Canonical master placement:

**… → Error Handling & Resilience → Caching → Background Jobs & Queue → Files & Media → Search → Notifications → Internationalization → Testing → Performance → Observability → Analytics → …**
