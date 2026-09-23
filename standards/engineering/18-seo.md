---
id: "seo"
title: "SEO Guidelines — Gold Standard 2026"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["engineering", "seo"]
applies_to: ["general"]
related: ["performance", "routes", "internationalization", "accessibility", "analytics"]
legacy_number: 42
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 73809
provenance: baseline

---

Canonical placement: **Browser & Compatibility → SEO → Reusability & Libraries** for public-facing web products. SEO owns crawl/index/search-discovery behavior; Routes owns URL architecture, Performance owns runtime optimization, Internationalization owns locale semantics, and Content & UX Writing owns copy quality.

# SEO Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for technical and product SEO across public web surfaces, including:

- crawlability;
- indexability;
- metadata;
- page titles;
- meta descriptions;
- canonical URLs;
- duplicate content;
- public/private route classification;
- robots directives;
- `robots.txt`;
- XML sitemaps;
- structured data;
- Schema.org;
- Open Graph;
- social previews;
- rendering;
- SSR;
- static rendering;
- JavaScript SEO;
- HTTP status codes;
- redirects;
- site migrations;
- internal links;
- URL hygiene;
- pagination;
- faceted navigation;
- localized pages;
- `hreflang`;
- images;
- public application pages;
- Core Web Vitals;
- Search Console;
- SEO monitoring;
- SEO testing;
- SEO governance.

The objective is to make public web content:

```text
Discoverable
Crawlable
Indexable when intended
Canonical
Semantically understandable
Fast
Accessible
Stable
Shareable
Monitorable
```

The core principle is:

> **Search engines should see the same clear, useful, authoritative public content that users see, through stable crawlable URLs with explicit indexing, canonicalization, rendering, and metadata behavior.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

SEO exceptions SHOULD document:

```text
Reason
Affected route/content type
Indexing intent
Canonical behavior
Crawler impact
User impact
Owner
Review date
```

---

# 3. SEO Scope

SEO applies primarily to surfaces intentionally available to public search engines.

Examples:

```text
Marketing pages
Documentation
Blog/editorial content
Public product pages
Public profiles
Public listings
Public knowledge/content pages
Public landing pages
```

---

# 4. Private Application Surfaces

Authenticated application areas SHOULD normally not be considered SEO surfaces.

Examples:

```text
/account
/settings
/admin
/billing
/internal
/private workspace
tenant dashboards
```

---

# 5. Public Does Not Automatically Mean Indexable

A publicly reachable URL MAY intentionally be:

```text
crawlable + indexable
crawlable + noindex
authenticated
access-controlled
```

according to product intent.

---

# 6. SEO Classification

Every route family SHOULD have one explicit indexing classification:

```text
Indexable
Non-indexable
Conditionally indexable
Private/authenticated
```

---

# 7. Route-Level SEO Contract

Public route definitions SHOULD make it possible to determine:

```text
Indexing intent
Canonical URL
Title
Description
Structured-data type
Sitemap inclusion
Localization
Social metadata
```

---

# 8. SEO Is Not Security

Neither:

```text
robots.txt
meta robots
sitemap omission
canonical tags
```

protects confidential information.

---

# 9. Sensitive Data

Sensitive/private resources MUST use real authorization and access controls.

---

# 10. `robots.txt` Is Public

Paths listed in `robots.txt` are themselves publicly visible.

Do not list secret paths expecting secrecy.

---

# 11. Search Engine Neutrality

The architecture SHOULD follow open web standards first.

Search-engine-specific enhancements MAY be added when they provide measurable value.

---

# 12. No Ranking Guarantees

SEO implementation MUST NOT claim:

```text
Guaranteed #1 ranking
Guaranteed rich result
Guaranteed indexing
Guaranteed traffic increase
```

Search engines retain control over crawling, indexing, canonical selection, presentation, and ranking.

---

# 13. SEO Hierarchy

The canonical technical priority is:

```text
Publicly accessible
↓
Correct HTTP response
↓
Crawlable
↓
Render understandable content
↓
Indexing intent
↓
Canonicalization
↓
Metadata
↓
Internal discovery
↓
Structured data
↓
Performance
↓
Search enhancement
```

Do not optimize rich-result markup while foundational crawling is broken.

---

# 14. Crawlable URL

An intended indexable page MUST have a stable URL directly retrievable through HTTP.

---

# 15. Real Links

Important public pages SHOULD be discoverable through actual hyperlinks.

Preferred web foundation:

```html
<a href="/products/example">Example</a>
```

---

# 16. Avoid Click-Only Navigation

Do not make crawler discovery depend exclusively on:

```text
onClick navigation
buttons
JavaScript state
canvas interactions
```

without crawlable links.

---

# 17. Internal Linking

Important indexable pages SHOULD have meaningful internal links from related public content.

---

# 18. Orphan Pages

A URL appearing only in a sitemap but nowhere in site navigation/content SHOULD be reviewed.

Sitemaps complement internal linking; they do not replace information architecture.

---

# 19. Link Meaning

Anchor text SHOULD communicate destination meaning.

Prefer:

```text
API authentication guide
```

over:

```text
click here
```

---

# 20. Crawl Depth

Important public content SHOULD not require unnecessarily deep navigation chains.

---

# 21. Navigation

Primary public navigation SHOULD use crawlable links and stable URLs.

---

# 22. Footer Links

Footers MAY expose important supporting pages.

Do not turn the footer into a keyword-heavy link farm.

---

# 23. URL Architecture

SEO URLs follow Routes Guidelines.

They SHOULD generally be:

```text
stable
readable
lowercase
semantic
shareable
```

---

# 24. Stable URLs

URLs SHOULD outlive UI reorganizations where practical.

---

# 25. URL Meaning

Prefer:

```text
/docs/authentication/passkeys
```

over:

```text
/page?id=48392
```

when human-readable semantic routes are appropriate.

---

# 26. Query Parameters

Query parameters MAY represent:

```text
filter
sort
pagination
campaign attribution
view configuration
```

but their indexing semantics MUST be explicit.

---

# 27. Tracking Parameters

Tracking parameters SHOULD NOT create competing canonical page identities.

Example:

```text
/products/widget?utm_source=email
```

should normally canonicalize to:

```text
/products/widget
```

---

# 28. URL Fragments

Content after:

```text
#
```

generally represents an in-document fragment rather than a separate canonical page.

Do not build independently indexable public content solely around fragment identifiers.

---

# 29. Session IDs in URLs

Session identifiers MUST NOT appear in public indexable URLs.

---

# 30. Sensitive URL Parameters

Sensitive information MUST NOT appear in SEO/public URLs.

---

# 31. URL Case

Use one canonical case convention.

Canonical web routes SHOULD normally be lowercase.

---

# 32. Trailing Slash

Choose one canonical policy:

```text
/page
```

or:

```text
/page/
```

and enforce it consistently where the framework exposes both forms.

---

# 33. HTTP vs HTTPS

Public production content MUST use HTTPS.

HTTP variants SHOULD permanently redirect to the canonical HTTPS URL.

---

# 34. Hostname Canonicalization

Choose one canonical hostname strategy.

Examples:

```text
example.com
```

or:

```text
www.example.com
```

Competing equivalents SHOULD redirect consistently.

---

# 35. Metadata Architecture

Every indexable page SHOULD be able to produce:

```text
<title>
meta description
canonical URL
robots directives
Open Graph metadata
relevant structured data
```

from authoritative page state.

---

# 36. Metadata Ownership

Metadata SHOULD be derived from page/domain data rather than duplicated manually across unrelated components.

---

# 37. Server Metadata

Critical SEO metadata SHOULD preferably be present in the initial HTML response.

---

# 38. Client Metadata

Client-side metadata updates MAY supplement applications but SHOULD NOT be the only mechanism for critical indexable metadata where server/static rendering is available.

---

# 39. Page Title

Every important indexable page MUST have a meaningful `<title>`.

---

# 40. Unique Titles

Titles SHOULD distinguish one indexable page from another.

---

# 41. Title Purpose

A page title SHOULD communicate:

```text
Primary page topic
Useful distinguishing context
Brand where appropriate
```

---

# 42. Title Template

A product MAY use a consistent template such as:

```text
{Page topic} | {Brand}
```

but the page-specific portion MUST remain meaningful.

---

# 43. Avoid Boilerplate-Only Titles

Bad:

```text
Home
Page
Website
Dashboard
Brand
```

for unrelated indexable pages.

---

# 44. Avoid Keyword Stuffing

Bad:

```text
CRM Software CRM App Best CRM Tool Cheap CRM System
```

Write titles for comprehension.

---

# 45. Title and Visible Content

The title SHOULD accurately reflect the page's visible primary content.

---

# 46. Heading and Title

The `<title>` and page `<h1>` MAY differ.

They SHOULD describe the same fundamental page intent.

---

# 47. Meta Description

Important public pages SHOULD provide a useful meta description.

---

# 48. Description Purpose

A meta description SHOULD succinctly describe:

```text
what the page contains
why the page may be useful
```

---

# 49. Description Is Not Guaranteed Snippet

Search engines MAY generate a different search snippet.

Meta description remains a useful hint, not a guaranteed presentation contract.

---

# 50. Unique Descriptions

Descriptions SHOULD be page-specific where practical.

---

# 51. Avoid Boilerplate Descriptions

Do not use one identical marketing description for thousands of unrelated pages.

---

# 52. Description Accuracy

Descriptions MUST NOT promise content absent from the page.

---

# 53. Description Generation

Large sites MAY programmatically generate descriptions from authoritative structured data.

Generated descriptions must still be:

```text
meaningful
accurate
non-duplicative enough to be useful
```

---

# 54. Meta Keywords

Do not invest architecture in obsolete `meta keywords` fields for ordinary modern search SEO.

---

# 55. Canonical URL

Indexable pages SHOULD have a clear canonical identity.

---

# 56. Self-Canonical

Stable primary pages SHOULD generally self-reference their canonical URL.

Example:

```html
<link rel="canonical" href="https://example.com/docs/api">
```

---

# 57. Canonical Must Be Absolute

Canonical URLs SHOULD use absolute production URLs.

---

# 58. Canonical Must Resolve

A canonical URL SHOULD:

```text
be accessible
represent equivalent content
return a successful indexable result
```

---

# 59. Canonical Is Not Redirect

`rel="canonical"` does not navigate users.

Use redirects when the old URL should actually move.

---

# 60. Canonical Is a Signal

Search engines MAY choose a different canonical when site signals conflict.

Therefore canonicalization MUST be internally consistent.

---

# 61. Canonical Signals

Align:

```text
redirects
canonical tag
sitemap URL
internal links
hreflang
```

toward the intended canonical URL.

---

# 62. Conflicting Canonicals

Avoid:

```text
page canonical → A
sitemap → B
internal links → C
redirect → D
```

---

# 63. Canonical Loop

Canonical relationships MUST NOT form loops.

---

# 64. Canonical Chain

Avoid long canonical chains.

Prefer each alternate URL to identify the final canonical directly.

---

# 65. Cross-Domain Canonical

Cross-domain canonicalization MAY be appropriate for legitimately duplicated syndicated content.

It requires deliberate content/distribution governance.

---

# 66. Non-Equivalent Canonical

Do not canonicalize materially different pages merely to manipulate indexing.

---

# 67. Filter Canonicals

Filtered/sorted variants MAY canonicalize to a parent collection when they do not represent distinct search-worthy content.

---

# 68. Useful Filter Landing Pages

A filtered page MAY be independently indexable when:

```text
meaningful search demand exists
content is substantively useful
URL is stable
page is internally discoverable
```

---

# 69. Faceted Navigation

Faceted navigation MUST have an explicit crawl/index strategy.

---

# 70. Facet Explosion

Avoid exposing effectively unlimited crawlable combinations such as:

```text
color × size × brand × sort × availability × region
```

without SEO policy.

---

# 71. Sort URLs

Sort-order variants SHOULD generally not create independently indexable pages.

---

# 72. Internal Search Results

Internal site-search results SHOULD generally not become a large indexable surface unless intentionally designed as high-quality landing pages.

---

# 73. Empty Result Pages

Empty filter/search pages SHOULD NOT become large volumes of indexable thin URLs.

---

# 74. Canonical vs Noindex

Use:

```text
canonical
```

for equivalent/duplicate content.

Use:

```text
noindex
```

when the page itself should not appear in search results.

Do not treat them as interchangeable.

---

# 75. Indexing Directives

Indexing behavior SHOULD be controlled using appropriate:

```text
robots meta
X-Robots-Tag
authentication
HTTP status
```

mechanisms.

---

# 76. `noindex`

Use:

```html
<meta name="robots" content="noindex">
```

for HTML pages that crawlers may access but that should not appear in compatible search indexes.

---

# 77. Non-HTML Resources

`X-Robots-Tag` MAY control indexing of resources such as:

```text
PDF
image
download
```

where HTML metadata is unavailable.

---

# 78. `robots.txt` vs `noindex`

Do not block a page in `robots.txt` and expect crawlers to discover its page-level `noindex`.

If a crawler cannot fetch the page, it cannot reliably read the directive.

---

# 79. Crawl Control

Use `robots.txt` primarily for crawler-access management.

---

# 80. Index Control

Use indexing directives or access control for index-management intent.

---

# 81. Robots Protocol

`robots.txt` MUST reside at the service root:

```text
/robots.txt
```

for standards-compliant crawler access control.

---

# 82. Robots Encoding

`robots.txt` SHOULD be valid UTF-8 plain text.

---

# 83. Robots Rules

Crawler rules SHOULD remain:

```text
small
reviewable
intentional
```

---

# 84. Robots Is Not Authorization

A crawler disallow rule MUST NEVER replace authentication/authorization.

---

# 85. Production Robots

Production `robots.txt` configuration MUST be reviewed as a deployment-critical artifact.

---

# 86. Staging Robots

Non-production public environments SHOULD prevent unwanted indexing using robust methods.

Appropriate controls MAY include:

```text
authentication
network restriction
noindex
```

depending on environment.

---

# 87. Staging Security

Prefer actual access restrictions for sensitive staging environments.

Do not depend only on:

```text
Disallow: /
```

---

# 88. Staging-to-Production Hazard

A deployment process MUST prevent:

```text
production accidentally shipping staging noindex
```

or:

```text
production robots.txt disallowing everything
```

---

# 89. SEO Deployment Gate

Production deploy checks SHOULD verify:

```text
robots.txt
robots metadata
canonical host
sitemap hostname
environment URLs
```

---

# 90. Sitemap Purpose

A sitemap helps crawlers discover canonical public URLs.

It is not a guarantee of crawling or indexing.

---

# 91. Sitemap Eligibility

XML sitemaps SHOULD include URLs that are:

```text
canonical
indexable
public
successful
desired in search
```

---

# 92. Do Not Include Noindex URLs

Pages intentionally marked `noindex` SHOULD NOT normally appear in the indexable sitemap.

---

# 93. Do Not Include Redirect URLs

Sitemaps SHOULD point directly to final canonical URLs, not redirect sources.

---

# 94. Do Not Include Error URLs

Sitemaps MUST NOT intentionally contain:

```text
404
410
5xx
```

URLs.

---

# 95. Sitemap Host

Sitemap scope and host rules MUST comply with the Sitemap protocol/search-engine requirements.

---

# 96. Sitemap Encoding

XML sitemaps MUST use correct XML/UTF-8 encoding and escaping.

---

# 97. Sitemap Limits

Large sites MUST split sitemaps according to protocol limits and MAY use sitemap index files.

---

# 98. Sitemap Organization

Large sites SHOULD organize sitemap sets by meaningful content class when operationally useful.

Examples:

```text
pages
articles
products
docs
localized content
```

---

# 99. `lastmod`

`lastmod` SHOULD represent a meaningful modification to the page's search-relevant content.

---

# 100. Fake `lastmod`

Do not set every URL's `lastmod` to:

```text
today
```

on every sitemap build when the content did not meaningfully change.

---

# 101. Change Frequency

Do not rely heavily on `changefreq` or `priority` as a substitute for correct discovery/content.

---

# 102. Sitemap Generation

Sitemaps SHOULD be generated from authoritative route/content data.

---

# 103. Sitemap Drift

A deleted/unpublished page SHOULD eventually disappear from sitemap output.

---

# 104. Sitemap Availability

Sitemap endpoints SHOULD be reliable and cacheable where appropriate.

---

# 105. Robots Sitemap Reference

`robots.txt` SHOULD reference the sitemap or sitemap index where operationally useful.

---

# 106. Sitemap Validation

Sitemap generation SHOULD have automated validation.

---

# 107. Structured Data

Structured data describes page entities and relationships in machine-readable form.

---

# 108. Vocabulary

Schema.org SHOULD be the default vocabulary when implementing broadly supported web structured data.

---

# 109. Encoding

JSON-LD SHOULD generally be preferred for new structured-data implementations unless another supported format better fits the architecture.

---

# 110. Structured Data Must Match Page

Structured data MUST accurately represent visible/current page content.

---

# 111. No Hidden Fiction

Do not mark up:

```text
reviews
prices
ratings
events
authors
products
availability
```

that are not genuinely represented by the page/domain state.

---

# 112. Search Feature Eligibility

Use structured-data types supported by the target search experience when rich-result eligibility matters.

---

# 113. Schema.org ≠ Rich Result Guarantee

A valid Schema.org type does not mean every search engine supports a corresponding search feature.

---

# 114. Specific Type

Prefer the most specific appropriate structured-data type.

---

# 115. Public App Types

Possible public-app markup MAY include:

```text
Organization
WebSite
WebPage
BreadcrumbList
Article
ProfilePage
SoftwareApplication
Product
FAQ-like types only where currently supported/appropriate
```

according to actual content.

---

# 116. SoftwareApplication

Public software/app landing pages MAY use `SoftwareApplication` structured data when page content satisfies relevant guidelines.

---

# 117. Organization

Public company/product sites SHOULD consider Organization markup on an appropriate organization/home/about page.

---

# 118. Breadcrumbs

Public hierarchical content SHOULD consider `BreadcrumbList` when the visible/site hierarchy warrants it.

---

# 119. Article

Editorial content MAY use Article-family markup when appropriate.

---

# 120. Profile Pages

Public creator/member profiles MAY use profile-related structured data where relevant and permitted.

---

# 121. JSON-LD Generation

Structured data SHOULD be generated from authoritative content/domain models.

---

# 122. Avoid Duplicate Truth

Do not separately type:

```text
visible product price = $10
JSON-LD product price = $12
```

from unrelated data sources.

---

# 123. Shared Schema Builder

Large systems SHOULD centralize reusable structured-data generation rather than hand-authoring JSON-LD on every page.

---

# 124. Structured Data Escaping

Dynamically generated structured data MUST be serialized safely.

---

# 125. XSS

Never concatenate untrusted content into JSON-LD `<script>` markup unsafely.

---

# 126. Structured Data Validation

Relevant structured data SHOULD be validated in CI and with search-engine testing tools where applicable.

---

# 127. Structured Data Release

Major template changes SHOULD monitor structured-data validity after deployment.

---

# 128. Unsupported Properties

Do not invent Schema.org properties.

---

# 129. Experimental Schema Terms

Experimental/pending vocabulary SHOULD be adopted cautiously.

---

# 130. Structured Data Is Supplemental

Structured data does not compensate for:

```text
thin content
broken rendering
incorrect canonical
blocked crawling
bad status codes
```

---

# 131. Open Graph

Public shareable pages SHOULD define useful Open Graph metadata.

---

# 132. Core Open Graph

A basic shareable page SHOULD normally supply:

```text
og:title
og:type
og:image
og:url
```

where applicable.

---

# 133. Open Graph Description

`og:description` SHOULD normally be provided for meaningful public content.

---

# 134. Open Graph URL

`og:url` SHOULD align with the intended canonical URL.

---

# 135. Open Graph Title

`og:title` SHOULD accurately represent the page and MAY differ slightly from the search `<title>` for social context.

---

# 136. Open Graph Image

Shareable pages SHOULD provide a stable representative image.

---

# 137. Image Accessibility Metadata

When an Open Graph image exists, provide useful alternate-description metadata where supported.

---

# 138. OG Image Stability

Image URLs SHOULD be:

```text
publicly reachable
HTTPS
stable enough for crawler caching
```

---

# 139. Dynamic OG Images

Dynamic Open Graph images MAY be generated.

Generation MUST be:

```text
reliable
cacheable
fast enough
deterministic
privacy-safe
```

---

# 140. Sensitive Share Metadata

Never place private user information in social-preview metadata on public URLs.

---

# 141. Social Metadata and Canonical

Social sharing metadata SHOULD represent the same semantic object as the canonical page.

---

# 142. Platform-Specific Social Metadata

Additional platform-specific metadata MAY supplement Open Graph.

It SHOULD not create conflicting page identity.

---

# 143. Social Preview Testing

Major public templates SHOULD have share-preview tests or validation.

---

# 144. Rendering Principle

Critical public content SHOULD be available to crawlers with minimal rendering dependency.

---

# 145. Server Rendering

Server-side rendering, static generation, or equivalent pre-rendering SHOULD be preferred for SEO-critical public content when compatible with the application architecture.

---

# 146. JavaScript Rendering

Search engines may render JavaScript, but architecture SHOULD NOT require unnecessary client execution merely to discover:

```text
main content
title
canonical
primary links
structured data
```

---

# 147. Initial HTML

For important public pages, initial HTML SHOULD contain meaningful:

```text
content
headings
links
metadata
```

where feasible.

---

# 148. Empty App Shell

Avoid sending:

```html
<div id="root"></div>
```

as the only meaningful initial representation of important public content when server/static rendering is available.

---

# 149. Rendering Delay

Crawler rendering may occur separately from initial fetching.

Avoid architectures where indexable meaning appears only after:

```text
multiple API waterfalls
long timers
user interaction
```

---

# 150. User Interaction Dependency

Indexable primary content MUST NOT require:

```text
click
scroll
hover
login
```

merely to exist in the rendered page.

---

# 151. Lazy Rendering

Below-the-fold resources MAY load lazily.

Critical content should not become undiscoverable because lazy loading depends on unsupported/non-crawler interactions.

---

# 152. Links Generated by JavaScript

JavaScript-generated links MAY be crawlable if they become proper anchor elements with valid `href` destinations.

---

# 153. SPA Routing

Public SPA routes MUST expose stable URLs and meaningful server/deployment behavior for direct requests.

---

# 154. Direct Navigation

Visiting:

```text
/public/page
```

directly MUST NOT return an unrelated app-shell `200` that cannot identify the page correctly.

---

# 155. Refresh Behavior

Refreshing any intended indexable route MUST preserve the correct public resource.

---

# 156. Client-Only 404

Avoid:

```text
HTTP 200
→ load SPA
→ client says "Not found"
```

for nonexistent public pages where the server can return `404`.

---

# 157. HTTP Status Codes

SEO surfaces MUST use meaningful HTTP status codes.

---

# 158. Successful Page

A normal available page SHOULD return:

```text
200
```

---

# 159. Missing Page

A nonexistent public resource SHOULD return:

```text
404
```

---

# 160. Gone Content

A permanently removed resource MAY return:

```text
410
```

where appropriate.

---

# 161. Authentication

A protected resource SHOULD use the appropriate authentication/access response according to application architecture.

---

# 162. Server Failure

Infrastructure/application failures SHOULD return appropriate:

```text
5xx
```

responses rather than misleading `200` pages.

---

# 163. Soft 404

Avoid returning:

```text
200
```

for pages whose actual content is:

```text
Page not found
No such product
This content no longer exists
```

---

# 164. Error Template SEO

Error pages SHOULD NOT accidentally emit canonical/structured metadata identifying themselves as valid content pages.

---

# 165. Temporary Unavailability

Temporary service failure SHOULD NOT be represented as a permanent content deletion.

---

# 166. Maintenance

Short-term infrastructure failures MAY use an appropriate temporary service status such as `503` where operationally correct.

---

# 167. Redirect Principle

Redirect when the resource has actually moved or URL normalization requires it.

---

# 168. Permanent Redirect

Use:

```text
301
308
```

for durable moves where the new URL should replace the old identity.

---

# 169. Temporary Redirect

Use:

```text
302
303
307
```

when the move is temporary according to HTTP/application semantics.

---

# 170. Server Redirect First

Server-side redirects SHOULD be preferred over:

```text
JavaScript redirect
meta refresh
```

where normal HTTP redirects are available.

---

# 171. Redirect Target

Redirect old content to the most semantically relevant replacement.

---

# 172. Do Not Redirect Everything to Home

Bad:

```text
every removed URL
→ /
```

when no equivalent content exists.

---

# 173. Redirect Chain

Avoid:

```text
A → B → C → D
```

Update redirects/internal links to target the final destination.

---

# 174. Redirect Loop

Redirect loops are release-blocking defects.

---

# 175. Internal Links

Internal links SHOULD point to final URLs rather than intentionally traversing redirects.

---

# 176. URL Rename

When changing an established public URL:

```text
new route
+
permanent old→new redirect
+
canonical update
+
internal link update
+
sitemap update
```

SHOULD be treated as one migration.

---

# 177. Redirect Retention

Important migration redirects SHOULD be retained sufficiently long to preserve external links and crawler understanding.

Do not remove them immediately after deployment.

---

# 178. Site Migration

Domain/protocol/URL-architecture migrations require an explicit SEO migration plan.

---

# 179. Migration Inventory

Before migration identify:

```text
high-value URLs
incoming links
indexed URLs
sitemaps
canonical mappings
structured data
localization mappings
```

---

# 180. One-to-One Mapping

Where content remains equivalent, maintain old→new URL mappings.

---

# 181. Migration Validation

After migration monitor:

```text
redirect errors
404 increases
index coverage
canonical selection
search traffic
sitemap status
```

---

# 182. Content Removal

Removed content SHOULD follow one of:

```text
redirect to genuine replacement
410
404
```

depending on the product/content lifecycle.

---

# 183. Rendering and Status Codes

Client rendering MUST NOT hide meaningful HTTP status semantics.

---

# 184. Canonical in Original HTML

Canonical metadata SHOULD preferably be correct in the original server-rendered HTML.

---

# 185. Conflicting Client Canonical

JavaScript MUST NOT change a server-provided canonical to a contradictory URL.

---

# 186. Metadata Hydration

Client hydration MUST NOT accidentally:

```text
remove canonical
replace title incorrectly
apply noindex
duplicate JSON-LD
```

---

# 187. Public Page Data Fetching

SEO-critical data SHOULD be available during server/static rendering where practical.

---

# 188. Public APIs

Do not block crawler-visible rendering because client data calls require browser-only credentials or storage.

---

# 189. Search Engine Resources

Required:

```text
CSS
JavaScript
images
```

SHOULD generally remain crawlable when they are necessary to render/understand public pages.

---

# 190. Blocked Resources

Do not disallow rendering-critical assets without knowing the search-engine consequences.

---

# 191. Core Web Vitals

Public SEO surfaces SHOULD meet the organization's Performance Standard.

Current baseline good-experience targets include:

```text
LCP ≤ 2.5 s
INP ≤ 200 ms
CLS ≤ 0.1
```

evaluated with appropriate field/user data.

---

# 192. Performance Is User Experience

SEO performance work MUST NOT optimize metrics by reducing:

```text
accessibility
useful content
security
correctness
```

---

# 193. LCP

Optimize likely LCP content through:

```text
fast server response
critical content prioritization
appropriate image delivery
font strategy
render-blocking reduction
```

according to Performance Guidelines.

---

# 194. LCP Image

Do not lazily load an above-the-fold image that is expected to be LCP without a specific reason.

---

# 195. INP

Avoid large main-thread work and slow interaction handlers on public landing/content pages.

---

# 196. CLS

Reserve dimensions for:

```text
images
media
ads
embeds
async content
```

to minimize unexpected shifts.

---

# 197. Cookie Banner Layout

Consent interfaces SHOULD avoid producing unnecessary major layout shift.

---

# 198. Third-Party SEO Cost

Marketing/analytics/chat scripts MUST be governed under Performance Guidelines.

SEO does not justify arbitrary third-party JavaScript.

---

# 199. Field Data

SEO performance assessment SHOULD use real-user field data where available.

---

# 200. Synthetic Data

Synthetic tools are useful for diagnosis but do not replace real-user measurements.

---

# 201. Mobile Performance

Public pages SHOULD remain performant on representative mobile hardware/network conditions.

---

# 202. Rendering Strategy Selection

Use the simplest rendering strategy that provides:

```text
fresh enough content
stable HTML
fast performance
operational reliability
```

---

# 203. Static Generation

Static rendering is suitable for content whose freshness model permits it.

---

# 204. Server Rendering

SSR is suitable when public content changes dynamically but needs a meaningful initial response.

---

# 205. Incremental Regeneration

Regeneration/caching strategies MAY combine public performance with content freshness.

---

# 206. Client Rendering

Client rendering MAY be used where SEO is irrelevant or where the content is enhancement-only.

---

# 207. Hybrid Rendering

Different route families MAY use different rendering modes.

Do not force one site-wide mode for ideology.

---

# 208. SEO Cache Correctness

Cached public responses MUST preserve the correct:

```text
locale
canonical
metadata
content
structured data
```

for the requested route.

---

# 209. Cache Pollution

A CDN MUST NOT serve one page's metadata to another route or locale.

---

# 210. Personalization

Indexable public content SHOULD NOT depend heavily on personalized response state.

---

# 211. Search Crawler vs User Consistency

Do not intentionally serve substantially different deceptive content to search crawlers and users.

---

# 212. Authentication Personalization

User-specific authenticated content SHOULD remain separate from canonical public SEO pages where possible.

---

# 213. Public App Pages

A public application MAY contain both:

```text
SEO landing/content routes
and
authenticated app routes
```

with separate indexing policies.

---

# 214. App Home

The authenticated app shell SHOULD NOT accidentally inherit indexable metadata from the marketing homepage.

---

# 215. Preview URLs

Preview/draft routes SHOULD normally be:

```text
access-controlled
or
noindex
```

and excluded from public sitemaps.

---

# 216. Feature Environments

Branch/preview deployments SHOULD NOT compete with production pages in search indexes.

---

# 217. Canonical Preview

Do not rely on production canonical alone to protect confidential previews.

Use proper preview access/index controls.

---

# 218. International SEO

Localized public pages follow Internationalization Guidelines.

---

# 219. Localized URL

Each independently indexable localized page SHOULD have a stable public URL.

Examples:

```text
/en/docs
/ms/docs
```

---

# 220. `hreflang`

Sites with alternate localized/regional URLs SHOULD use supported `hreflang` annotations where search targeting benefits from them.

---

# 221. Reciprocal Localization

Localized alternate relationships SHOULD remain internally consistent across page variants.

---

# 222. `x-default`

An `x-default` alternate MAY be used for an appropriate language-neutral/default selector page.

---

# 223. Localized Canonical

A genuinely translated page SHOULD normally canonicalize to itself rather than universally canonicalizing every language to one source-language URL.

---

# 224. Regional Near-Duplicates

Regional pages containing substantially similar same-language content MAY require both canonicalization and localization annotations according to content semantics.

---

# 225. Locale Detection Redirect

Do not permanently redirect every crawler/user from a public locale URL solely based on transient IP/browser language.

---

# 226. User Choice

Users SHOULD be able to navigate to a localized URL directly even when auto-detection exists.

---

# 227. Locale Selector

Locale links SHOULD use crawlable URLs.

---

# 228. Language Metadata

Public documents SHOULD use correct:

```html
lang
```

semantics independently of SEO annotations.

---

# 229. Translation Completeness

Do not publish thousands of thin "localized" pages where only navigation chrome is translated and substantive content remains duplicated unintentionally.

---

# 230. Pagination

Paginated public content SHOULD expose stable crawlable page URLs when each page represents meaningful content.

---

# 231. Pagination Canonical

Paginated pages SHOULD generally canonicalize according to their actual distinct content rather than blindly canonicalizing every page to page 1.

---

# 232. Pagination Links

Use ordinary crawlable links between pagination pages.

---

# 233. Infinite Scroll

Infinite-scroll content intended for indexing SHOULD have an underlying crawlable URL/pagination model.

---

# 234. Load More

A "Load more" interaction MAY enhance UX but should not be the only discovery path to indexable items.

---

# 235. Filters

Filter state belongs in URLs where it is intended to be shareable/indexable according to Routes Guidelines.

---

# 236. SEO Filter Policy

Each filter dimension SHOULD define:

```text
indexable?
canonicalized?
noindex?
crawlable?
sitemap?
```

for scalable public catalogs.

---

# 237. Search Result Pagination

Avoid generating arbitrarily deep crawlable pages with little discovery value.

---

# 238. Images

Important public images SHOULD have:

```text
crawlable URL
appropriate alt text
correct dimensions
efficient formats
```

according to Accessibility and Performance standards.

---

# 239. Image Alt

`alt` exists primarily for accessibility and image meaning.

Do not stuff keywords into alt text.

---

# 240. Image Context

Images SHOULD appear near relevant textual context where meaningful.

---

# 241. Image URLs

Important search/share images SHOULD use stable URLs.

---

# 242. Lazy Images

Below-the-fold images MAY load lazily.

Ensure crawler/user rendering still exposes them correctly.

---

# 243. Image Metadata

Relevant image structured metadata MAY be added for supported use cases.

---

# 244. Video

Public video pages SHOULD expose meaningful:

```text
title
description
thumbnail
content context
```

and relevant structured data where appropriate.

---

# 245. Embedded Media

Do not let embedded media providers become the only source of page meaning.

---

# 246. Open Graph vs SEO

Open Graph supports social-sharing representation.

It does not replace:

```text
<title>
canonical
structured data
```

for search.

---

# 247. Content Quality

Technical SEO cannot compensate for content with no meaningful user value.

---

# 248. Search Intent

Public landing/content pages SHOULD have a clear user/search intent.

---

# 249. One Page, One Primary Purpose

A page SHOULD have one understandable primary topic/task rather than attempting to rank for unrelated concepts.

---

# 250. Heading Structure

Public content SHOULD use semantic heading structure.

---

# 251. H1

A public content page SHOULD normally have one clear primary heading describing its subject.

HTML technically permits multiple headings, but hierarchy should remain understandable.

---

# 252. Headings Are Not Keywords Slots

Do not distort heading structure merely to repeat search phrases.

---

# 253. Content Duplication

Large-scale near-duplicate pages SHOULD be justified by distinct user value.

---

# 254. Programmatic SEO

Programmatically generated public pages MAY be appropriate when each page provides substantive, accurate, differentiated value.

---

# 255. Thin Programmatic Pages

Do not generate massive URL sets where only one token changes while content provides little independent utility.

---

# 256. AI-Generated Content

AI-generated public content follows Content, Documentation, Privacy, and AI governance.

SEO MUST NOT encourage publishing low-quality generated pages merely for search volume.

---

# 257. Content Ownership

Search-facing content SHOULD have an accountable owner.

---

# 258. Freshness

Dates MUST accurately reflect real publication/modification semantics.

---

# 259. Fake Freshness

Do not update:

```text
Published today
Updated today
```

solely to create an appearance of freshness.

---

# 260. Author Information

Where authorship matters, public pages SHOULD identify legitimate authors/organizations consistently.

---

# 261. Trust Information

Relevant public sites SHOULD expose appropriate:

```text
About
Contact
Editorial ownership
Policies
```

when those help users understand the publisher.

---

# 262. Metadata Security

SEO metadata is public.

Never put:

```text
private email
private tenant name
internal IDs
private file names
tokens
secrets
```

in public metadata.

---

# 263. Structured Data Privacy

Structured data may expose information not obvious in the visual layout.

Every property MUST be reviewed as public disclosure.

---

# 264. Social Metadata Privacy

Open Graph crawlers may cache metadata/images.

Do not expose ephemeral confidential data.

---

# 265. URL Privacy

Search indexes, referrals, browser history, analytics, and external links can expose public URLs.

Do not put secrets in them.

---

# 266. Search Console

Public sites SHOULD register and monitor appropriate search-engine webmaster tooling such as Google Search Console where applicable.

---

# 267. Ownership

Search Console/site-management access SHOULD use organizational accounts and least privilege.

---

# 268. Search Console Monitoring

Monitor relevant reports for:

```text
indexing
sitemaps
Core Web Vitals
structured data
manual/security issues
search performance
```

---

# 269. URL Inspection

Important newly launched or problematic URLs MAY be checked with URL inspection tooling.

---

# 270. Crawl Errors

Significant increases in:

```text
404
5xx
redirect errors
blocked resources
```

SHOULD trigger investigation.

---

# 271. Indexing Anomaly

Unexpected changes in indexed URL count SHOULD be investigated.

---

# 272. Canonical Anomaly

Unexpected crawler-selected canonicals SHOULD trigger examination of conflicting canonical signals.

---

# 273. Sitemap Anomaly

Sitemap processing failures SHOULD alert the owning team for high-value sites.

---

# 274. Structured Data Monitoring

A rise in invalid structured data after a template deployment SHOULD be treated as a regression.

---

# 275. Search Traffic Monitoring

Organic traffic changes SHOULD be interpreted carefully.

Traffic change does not automatically prove an SEO code regression.

---

# 276. Search Ranking Volatility

Ranking can change due to:

```text
competition
query demand
search-system updates
seasonality
content changes
technical changes
```

Avoid attributing cause without evidence.

---

# 277. SEO Deployment Markers

Major:

```text
URL migration
metadata template change
rendering change
canonical change
structured-data change
```

SHOULD be recorded as deployment/analytics markers.

---

# 278. Log Analysis

Large sites MAY analyze crawler request logs to understand:

```text
crawl behavior
wasted crawl
errors
redirect chains
```

---

# 279. Bot Verification

Security/routing systems SHOULD verify crawler identities appropriately rather than trusting a spoofable User-Agent when special treatment is necessary.

---

# 280. Bot-Specific Content

Avoid serving search crawlers unique substantive content solely to influence search results.

---

# 281. Rate Limiting

Infrastructure MUST not accidentally block legitimate crawler access to intended public surfaces through overly aggressive rate limiting.

---

# 282. Bot Abuse

Legitimate crawler support does not mean unrestricted trust of arbitrary bots.

Security controls remain necessary.

---

# 283. SEO Tests

SEO-critical public templates SHOULD have automated tests for:

```text
title
description
canonical
robots
status
structured data
Open Graph
sitemap behavior
```

---

# 284. Route SEO Tests

Representative route classes SHOULD test:

```text
indexable page
noindex page
redirect
404
private route
localized page
paginated page
```

---

# 285. Metadata Snapshot

Metadata snapshots MAY help detect unintended template regressions.

---

# 286. Canonical Test

Tests SHOULD ensure that a production page's canonical:

```text
uses production host
uses correct protocol
uses normalized route
drops irrelevant tracking parameters
```

---

# 287. Noindex Test

Automated deployment tests SHOULD ensure production-critical pages are not accidentally marked `noindex`.

---

# 288. Preview Noindex Test

Preview environments SHOULD verify they do not accidentally become indexable.

---

# 289. Sitemap Test

CI or production checks SHOULD validate:

```text
XML syntax
allowed hosts
successful URLs
canonicality
no unexpected noindex URLs
```

---

# 290. Redirect Test

Migration redirects SHOULD have automated mapping tests.

---

# 291. Redirect Chain Test

Important route migrations SHOULD verify one-hop destinations where practical.

---

# 292. Structured Data Test

Validate:

```text
JSON syntax
Schema.org validity
required search-feature properties
visible-content consistency
```

---

# 293. OG Metadata Test

Important public pages SHOULD validate:

```text
title
description
URL
image
image accessibility text
```

where used.

---

# 294. Rendering Test

SEO QA SHOULD inspect both:

```text
raw initial HTML
rendered page
```

for JavaScript-heavy public templates.

---

# 295. Crawler Simulation

Testing MAY use crawler-like fetches without normal browser state to ensure important pages do not require:

```text
localStorage
authenticated session
interaction
```

to render.

---

# 296. JavaScript Failure

Public content SHOULD remain understandable where nonessential JavaScript fails.

---

# 297. Core Web Vitals Test

Performance regression gates follow Performance Guidelines and SHOULD cover SEO-critical templates.

---

# 298. Mobile SEO QA

Public pages MUST remain usable and content-complete in supported mobile layouts.

---

# 299. Accessibility

SEO optimization MUST preserve Accessibility Guidelines.

Semantic HTML generally benefits both.

---

# 300. Browser Compatibility

SEO rendering behavior follows Browser & Compatibility Guidelines.

---

# 301. Internationalization

Localized SEO follows Internationalization Guidelines.

---

# 302. Routes

URL architecture and redirect routing follow Routes Guidelines.

---

# 303. Content

Titles, labels, headings, descriptions, and copy quality follow Content & UX Writing Guidelines.

---

# 304. Performance

Core Web Vitals and performance budgets are owned by Performance Guidelines.

SEO consumes the resulting user-experience metrics.

---

# 305. Analytics

Organic acquisition analytics follow Analytics Guidelines.

---

# 306. Privacy

Search/share metadata and webmaster tooling follow Privacy & Data Governance Guidelines.

---

# 307. CI/CD

SEO-critical automated validation SHOULD run during CI/CD for relevant public applications.

---

# 308. Release Migration

Large SEO migrations SHOULD have:

```text
pre-release crawl/inventory
mapping
deployment checks
post-release monitoring
rollback/forward-fix strategy
```

---

# 309. SEO Review Checklist

```text
□ Route intended public?
□ Indexing intent defined?
□ Correct HTTP status?
□ Crawlable?
□ Meaningful initial HTML?
□ Unique title?
□ Useful description?
□ Canonical?
□ Robots directive?
□ Internal links?
□ Sitemap?
□ Structured data?
□ Open Graph?
□ Localization?
□ Performance?
□ Mobile rendering?
□ Monitoring?
```

---

# 310. Metadata Checklist

```text
□ Unique title
□ Page intent represented
□ Description accurate
□ Canonical absolute
□ Production hostname
□ Robots directive
□ Open Graph title
□ Open Graph description
□ Open Graph URL
□ Open Graph image
□ Structured data
```

---

# 311. Canonical Checklist

```text
□ One intended canonical
□ Self-canonical where appropriate
□ HTTPS
□ Canonical host
□ Normalized path
□ Tracking params excluded
□ Equivalent content
□ No redirect target mismatch
□ Internal links align
□ Sitemap aligns
□ hreflang aligns
```

---

# 312. Robots Checklist

```text
□ robots.txt accessible
□ Production rules intentional
□ No sensitive-path security assumptions
□ Indexable assets not accidentally blocked
□ noindex pages crawlable where directive must be seen
□ Sitemap referenced where appropriate
□ Staging policy correct
```

---

# 313. Sitemap Checklist

```text
□ Canonical URLs only
□ Indexable URLs only
□ 200-success URLs
□ Correct hostname
□ UTF-8/XML valid
□ lastmod meaningful
□ Size/count limits respected
□ Sitemap index where needed
□ Deleted URLs removed
□ Generation automated
```

---

# 314. Structured Data Checklist

```text
□ Relevant schema type
□ Specific type where appropriate
□ Matches visible content
□ Generated from authoritative data
□ JSON-LD valid
□ No fabricated properties
□ Search-feature requirements satisfied
□ Privacy reviewed
□ Validation passes
```

---

# 315. Open Graph Checklist

```text
□ og:title
□ og:type
□ og:url
□ og:image
□ description where appropriate
□ image alt metadata
□ public stable image
□ canonical alignment
□ no private data
```

---

# 316. Rendering Checklist

```text
□ Direct route fetch works
□ Initial HTML meaningful
□ Primary content available
□ Primary links crawlable
□ Critical metadata initial/server-rendered
□ JavaScript not required for status correctness
□ 404 uses 404
□ Redirect uses HTTP redirect where appropriate
```

---

# 317. Redirect Checklist

```text
□ Permanent vs temporary deliberate
□ Server-side preferred
□ Target semantically equivalent
□ One hop where practical
□ No loop
□ Internal links updated
□ Canonical updated
□ Sitemap updated
□ Analytics/search monitoring
```

---

# 318. Public App Checklist

```text
□ Public and authenticated route families separated
□ App shell not accidentally indexed
□ Marketing routes indexable
□ Private routes protected
□ Preview routes controlled
□ Tenant/private data absent from metadata
□ Direct navigation works
□ SSR/static rendering policy defined
```

---

# 319. International SEO Checklist

```text
□ Stable locale URL
□ Correct lang
□ hreflang where required
□ Reciprocal relationships
□ x-default where appropriate
□ Locale self-canonical
□ Sitemap/localization aligned
□ Locale selector crawlable
□ No forced crawler locale redirect
```

---

# 320. Performance SEO Checklist

```text
□ LCP target
□ INP target
□ CLS target
□ Field data
□ Mobile performance
□ LCP resource priority
□ Image dimensions
□ Third-party script budget
□ No major consent-banner shift
□ Server/render latency
```

---

# 321. Definition of Done — New Public Page

A new indexable public page is ready when:

```text
✓ Stable URL exists
✓ Direct request works
✓ Indexing intent is explicit
✓ HTTP status is correct
✓ Primary content exists in crawlable rendering
✓ Title is unique/useful
✓ Description is useful
✓ Canonical is correct
✓ Robots directive is correct
✓ Internal discovery exists
✓ Sitemap policy applied
✓ Structured data reviewed
✓ Social metadata complete
✓ Accessibility passes
✓ Mobile/responsive passes
✓ Performance acceptable
✓ Monitoring exists
```

---

# 322. Definition of Done — Non-Indexable Page

```text
✓ Reason for exclusion known
✓ Access controls used if private
✓ noindex/X-Robots used where applicable
✓ Excluded from indexable sitemap
✓ Canonical behavior deliberate
✓ Internal discovery implications known
✓ No sensitive metadata
```

---

# 323. Definition of Done — URL Migration

```text
✓ Old URL inventory
✓ New URL mapping
✓ Permanent redirects
✓ Canonicals updated
✓ Internal links updated
✓ Sitemaps updated
✓ hreflang updated
✓ Structured data URLs updated
✓ Social URLs updated
✓ Redirect tests pass
✓ Search monitoring active
```

---

# 324. Definition of Done — New Public Template

```text
✓ Metadata template
✓ Robots behavior
✓ Canonical behavior
✓ Status handling
✓ 404 behavior
✓ Structured-data generator
✓ Open Graph generator
✓ Localization behavior
✓ Sitemap integration
✓ Performance baseline
✓ SEO test coverage
```

---

# 325. SEO Anti-Patterns

Avoid:

```text
every route indexable
```

Avoid:

```text
private page
→ robots.txt
```

instead of authorization.

Avoid:

```text
Disallow: /secret/
```

as security.

Avoid:

```text
staging environment indexed
```

Avoid:

```text
production deployed with noindex
```

Avoid:

```text
<title>Home</title>
```

for every route.

Avoid:

```text
same meta description
```

for thousands of pages.

Avoid keyword-stuffed titles.

Avoid keyword-stuffed alt text.

Avoid:

```text
canonical = current raw URL including utm_source
```

Avoid:

```text
canonical A
sitemap B
internal links C
```

Avoid:

```text
canonical everything to homepage
```

Avoid:

```text
every paginated page canonical → page 1
```

when pages contain distinct list content.

Avoid:

```text
robots.txt Disallow
+
meta noindex
```

when the crawler needs access to see `noindex`.

Avoid:

```text
sitemap contains redirect URLs
```

Avoid:

```text
sitemap contains noindex URLs
```

Avoid:

```text
sitemap contains 404 URLs
```

Avoid fake sitemap `lastmod`.

Avoid sitemap generation from stale manually maintained files.

Avoid:

```text
Schema.org exists
→ rich result guaranteed
```

Avoid structured data for content absent from the page.

Avoid fake:

```text
ratings
reviews
prices
authors
```

in structured data.

Avoid hand-written JSON-LD disconnected from authoritative content.

Avoid unsafe string concatenation into JSON-LD.

Avoid:

```text
og:url != canonical identity
```

without reason.

Avoid private data in Open Graph previews.

Avoid unstable OG images requiring authenticated cookies.

Avoid:

```text
indexable page initial HTML = empty app shell
```

when meaningful server rendering is feasible.

Avoid:

```text
primary content appears only after user clicks
```

Avoid:

```text
200 OK
Page not found
```

Avoid:

```text
200 OK
Server error
```

Avoid:

```text
every missing page → homepage 301
```

Avoid JavaScript redirects when normal server redirects are available.

Avoid redirect chains.

Avoid redirect loops.

Avoid:

```text
old URL removed
```

with no migration mapping when equivalent content moved.

Avoid:

```text
client canonical contradicts server canonical
```

Avoid blocking rendering-critical JS/CSS accidentally.

Avoid:

```text
desktop content complete
mobile content missing
```

without deliberate policy.

Avoid:

```text
locale=en
→ always redirect crawler to /en
```

based solely on IP/browser inference.

Avoid all translated pages canonicalizing to English by default.

Avoid internal search-result crawl explosions.

Avoid infinite filter combinations.

Avoid programmatic thin pages.

Avoid:

```text
AI generate 1,000,000 keyword pages
```

with no substantive independent value.

Avoid fake modification dates.

Avoid search-crawler cloaking.

Avoid:

```text
SEO optimization
→ remove accessibility semantics
```

Avoid:

```text
SEO optimization
→ inject huge third-party scripts
```

Avoid treating Lighthouse alone as SEO success.

Avoid treating ranking movement alone as proof of technical correctness.

---

# 326. AI SEO Rules

AI coding agents MUST determine whether a route is intended to be public/indexable before adding SEO metadata.

---

# 327. AI Private-Route Rule

AI MUST NOT make authenticated/private routes indexable by default.

---

# 328. AI Robots Rule

AI MUST NOT use `robots.txt` as an access-control mechanism.

---

# 329. AI Title Rule

AI SHOULD generate page-specific descriptive title metadata from authoritative page state.

---

# 330. AI Description Rule

AI MUST NOT invent claims for meta descriptions that are absent from actual page content.

---

# 331. AI Canonical Rule

AI SHOULD derive canonical URLs from the canonical route model—not raw browser URLs containing arbitrary query parameters.

---

# 332. AI Canonical-Consistency Rule

AI MUST keep:

```text
canonical
internal URLs
sitemap
structured data URLs
Open Graph URL
```

consistent.

---

# 333. AI Noindex Rule

AI MUST distinguish crawl blocking from index blocking.

---

# 334. AI Sitemap Rule

AI SHOULD include only intended canonical indexable URLs in normal public sitemaps.

---

# 335. AI Lastmod Rule

AI MUST NOT update sitemap `lastmod` without a meaningful content modification.

---

# 336. AI Structured-Data Rule

AI MUST generate structured data only from verified authoritative page/domain information.

---

# 337. AI Schema Rule

AI MUST NOT invent Schema.org properties or claim rich-result eligibility without checking current requirements.

---

# 338. AI Rendering Rule

AI SHOULD keep SEO-critical content and metadata server/static rendered where the architecture supports it.

---

# 339. AI Status Rule

AI MUST use real HTTP status codes for:

```text
not found
gone
redirect
server failure
```

on public routes.

---

# 340. AI Redirect Rule

AI SHOULD use server-side HTTP redirects before JavaScript redirects.

---

# 341. AI Redirect-Type Rule

AI MUST distinguish permanent and temporary moves.

---

# 342. AI Facet Rule

AI MUST NOT expose unlimited filter/sort URL combinations for indexing by default.

---

# 343. AI Locale Rule

AI MUST preserve independent localized URLs and appropriate canonicalization.

---

# 344. AI Metadata-Privacy Rule

AI MUST NOT expose private data in:

```text
metadata
structured data
OG images
URLs
```

---

# 345. AI Performance Rule

AI SHOULD preserve SEO performance budgets and current Core Web Vitals goals.

---

# 346. AI Ranking Rule

AI MUST NOT promise rankings or search-result appearance.

---

# 347. AI Test Rule

When adding a public route/template, AI SHOULD add tests for:

```text
status
title
canonical
robots
sitemap
structured data
social metadata
```

where applicable.

---

# 348. AI Migration Rule

AI MUST preserve old public URLs with appropriate redirects when refactoring routes if those URLs already have public value.

---

# 349. AI Gold Rule

When uncertain:

```text
Correct public content
>
Crawlability
>
Indexing correctness
>
Canonical consistency
>
Metadata
>
Structured-data enhancement
>
SEO trick
```

And:

```text
User value
>
Search-engine manipulation
```

---

# 350. Golden SEO Rules

**1. SEO applies only where a route is intentionally public and discoverable.**

**2. Public reachability and search indexability are separate decisions.**

**3. Private content is protected with authorization, never robots directives alone.**

**4. Every public route family has an explicit indexing policy.**

**5. Search engines receive meaningful stable URLs.**

**6. Important pages are discoverable through real links.**

**7. XML sitemaps supplement internal linking; they do not replace it.**

**8. Public URLs are semantic, stable, and normalized.**

**9. Session IDs and sensitive data never appear in indexable URLs.**

**10. HTTPS is the canonical production protocol.**

**11. Duplicate hostname/protocol forms redirect to one canonical identity.**

**12. Every important indexable page has a useful title.**

**13. Titles describe page intent rather than repeat keywords mechanically.**

**14. Meta descriptions are accurate and page-specific where practical.**

**15. Meta descriptions influence presentation but do not guarantee the search snippet.**

**16. Important pages have a clear canonical identity.**

**17. Canonical URLs normally self-reference on primary pages.**

**18. Canonical URLs are absolute, stable, and indexable.**

**19. Canonical is a consolidation signal, not navigation.**

**20. Redirects are used when resources actually move.**

**21. Canonical, redirects, sitemap, internal links, and localization signals align.**

**22. Equivalent URLs do not emit conflicting canonical signals.**

**23. `noindex` controls index intent; `robots.txt` controls crawler access.**

**24. Crawlers must normally be able to retrieve a page to discover its page-level indexing directive.**

**25. `robots.txt` is never treated as confidential access control.**

**26. Production robots configuration is deployment-critical.**

**27. Preview/staging environments cannot accidentally compete with production in search.**

**28. Sitemaps contain canonical, public, indexable, successful URLs.**

**29. Redirect, noindex, and error URLs do not belong in ordinary canonical sitemaps.**

**30. Sitemap `lastmod` reflects meaningful modification rather than generation time.**

**31. Structured data reflects actual visible/domain content.**

**32. Schema.org is the default shared vocabulary for appropriate structured data.**

**33. JSON-LD is the preferred new implementation format where appropriate.**

**34. Structured data does not invent reviews, prices, authors, ratings, or entities.**

**35. Structured data is generated from authoritative application/content state.**

**36. Valid structured data does not guarantee search-engine rich presentation.**

**37. Open Graph metadata exists for important shareable public content.**

**38. Open Graph page identity aligns with the canonical page.**

**39. Social metadata contains no private data.**

**40. Important public content is available with minimal rendering dependency.**

**41. Server/static rendering is preferred for SEO-critical pages when technically appropriate.**

**42. Main page meaning is not hidden behind user interaction.**

**43. Public direct-route requests return the actual page.**

**44. Missing public resources return meaningful 404/410 semantics instead of fake 200 pages.**

**45. Server failures do not masquerade as successful pages.**

**46. Permanent URL moves use permanent redirects.**

**47. Temporary moves use temporary redirect semantics.**

**48. Server-side redirects are preferred over JavaScript redirects.**

**49. Redirect chains and loops are removed.**

**50. Redirect targets preserve semantic relevance.**

**51. Public URL changes are treated as migrations, not simple filename refactors.**

**52. Site migrations update redirects, canonical URLs, internal links, sitemaps, and localization together.**

**53. Rendering-critical CSS/JavaScript is not accidentally blocked from crawlers.**

**54. Client hydration does not contradict server SEO metadata.**

**55. Search-facing pages target good Core Web Vitals and overall user experience.**

**56. Current performance goals include LCP within 2.5 seconds, INP below 200 ms, and CLS below 0.1.**

**57. Field performance data is preferred for understanding real-user experience.**

**58. SEO never justifies harming accessibility, security, or correctness.**

**59. Localized indexable content has stable locale URLs.**

**60. Genuine translations generally self-canonicalize rather than canonicalizing every locale to one language.**

**61. `hreflang` is used where alternate localized/regional URLs require search-engine language/region signaling.**

**62. Crawlers are not permanently forced into one locale from transient IP or browser-language assumptions.**

**63. Paginated pages preserve their distinct content identities where appropriate.**

**64. Infinite scroll intended for indexing has an underlying crawlable URL model.**

**65. Faceted navigation has a deliberate crawl/index strategy.**

**66. Arbitrarily large filter/sort combinations are not exposed for indexing.**

**67. Internal search pages do not become uncontrolled thin index surfaces.**

**68. Important images use stable crawlable URLs and accessibility-correct alt text.**

**69. Image alt text is not a keyword-stuffing field.**

**70. Social/search images are appropriately sized and performant.**

**71. Public content exists for users, not merely to manufacture search landing pages.**

**72. Programmatically generated pages require substantive independent user value.**

**73. AI-generated public content follows the same quality and governance standards as human-authored content.**

**74. Publication/modification dates reflect real content history.**

**75. Search-facing metadata is treated as public disclosure.**

**76. Structured data is privacy-reviewed because machines may expose fields users do not notice visually.**

**77. Search Console and equivalent tooling are organization-managed production resources.**

**78. Crawl, indexing, sitemap, performance, and structured-data regressions are monitored.**

**79. Organic traffic changes are investigated rather than automatically attributed to one engineering change.**

**80. Major SEO-relevant deployments are marked for later correlation and debugging.**

**81. Valid crawler access does not mean arbitrary bots bypass security controls.**

**82. Crawler-specific treatment is not implemented from spoofable User-Agent strings without verification where security matters.**

**83. SEO templates have automated metadata and status tests.**

**84. Production deploys verify canonical hostname and indexing directives.**

**85. Public page tests cover both initial and rendered HTML where JavaScript rendering is significant.**

**86. Preview/development deployments are tested for accidental indexability.**

**87. Sitemap validity and canonicality are automated.**

**88. Redirect migrations have mapping tests.**

**89. Structured-data changes are validated before and after release.**

**90. Core public flows are responsive and mobile-complete.**

**91. Technical SEO does not replace useful content.**

**92. Keyword stuffing is prohibited in titles, headings, alt text, and metadata.**

**93. Search crawlers and users receive substantially consistent content.**

**94. Ranking or rich-result appearance is never guaranteed by implementation.**

**95. SEO decisions remain compatible with Routes, Internationalization, Accessibility, Performance, Privacy, and Content standards.**

**96. Every indexed URL should have a reason to exist independently.**

**97. Every duplicated URL should have a deliberate canonicalization strategy.**

**98. Every removed public URL should have a deliberate redirect/error strategy.**

**99. Every SEO enhancement starts after crawling, rendering, indexing, and canonicalization are correct.**

**100. If the team cannot state whether a URL should be crawled, indexed, canonicalized, included in a sitemap, and rendered publicly, its SEO contract is incomplete.**

---

# 351. Canonical SEO Standard

The organizational standard is:

> **SEO is applied only to intentionally public search-facing surfaces. Every public route family declares whether it is indexable, conditionally indexable, non-indexable, or private; authenticated and sensitive content relies on real access control rather than crawler directives; and preview, staging, internal, tenant-private, or administrative environments are prevented from accidentally competing with production content.**

> **Search-facing URLs are stable, crawlable, semantic, and internally discoverable. Important pages use actual hyperlinks, canonical protocol and hostname conventions, clean routing, meaningful HTTP status codes, and explicit handling for duplicate parameters, pagination, faceted navigation, localization, removal, and migration. Session identifiers, secrets, and private user state never become part of canonical public URLs.**

> **Every important indexable page exposes accurate search metadata from authoritative page state: a useful title, appropriate description, canonical URL, indexing directive, social metadata, and relevant structured data. Canonical signals align across HTML, redirects, internal links, sitemaps, Open Graph identity, and localization rather than competing with one another. Canonical annotations consolidate equivalent content; redirects move users and crawlers when a resource actually changes location; `noindex` controls search inclusion; and `robots.txt` manages crawler access rather than security.**

> **Sitemaps are machine-generated inventories of desired canonical search URLs. They contain public, successful, indexable final URLs rather than redirects, errors, preview routes, or intentionally excluded pages; meaningful modification timestamps represent actual content changes; large inventories use protocol-compliant sitemap indexes; and deployment/monitoring detects stale or invalid sitemap output.**

> **Structured data accurately describes real page content using Schema.org and appropriate search-feature conventions. JSON-LD is preferred for new implementations where appropriate, generated values originate from the same authoritative models that render visible content, untrusted values are serialized safely, schemas are validated, privacy is reviewed, and no markup invents reviews, prices, ratings, authorship, availability, or other facts merely to obtain richer search presentation.**

> **Shareable public pages expose stable Open Graph metadata representing the same semantic resource as their canonical page. Titles, descriptions, URLs, images, and image descriptions remain accurate and public; dynamic share-image systems are deterministic, reliable, cacheable, and privacy-safe; and social metadata does not become a parallel conflicting source of page identity.**

> **SEO-critical public content minimizes dependence on crawler-side JavaScript execution. Server rendering, static generation, or another pre-rendered approach is preferred where it fits product freshness and architecture; direct route requests return meaningful HTML and correct status codes; primary content, metadata, and crawlable links do not require user interaction to appear; and client hydration never contradicts canonical, robots, status, or structured-data state emitted by the server.**

> **HTTP semantics remain authoritative. Available resources return successful responses, missing content returns real 404/410 semantics, temporary infrastructure failures are represented as temporary failures, permanent URL migrations use permanent server-side redirects, temporary movements use temporary redirects, redirect chains and loops are eliminated, and public URLs that move retain appropriate mappings long enough to preserve users, external links, and search-engine understanding.**

> **Search performance follows the organization's broader Performance Standard. Public pages target strong real-user loading, interaction, and visual-stability metrics; current Core Web Vitals good-experience thresholds are treated as LCP within 2.5 seconds, INP below 200 milliseconds, and CLS below 0.1; mobile and constrained environments receive first-class performance attention; and SEO is never used to justify removing accessibility, weakening security, reducing correctness, or shipping uncontrolled third-party code.**

> **International search behavior is explicit. Independently useful translations have stable localized URLs, correct language semantics, appropriate self-canonicalization, and `hreflang` relationships where relevant; users and crawlers can directly access locale URLs without mandatory transient geolocation redirects; and pagination, filters, internal search, and programmatic landing pages are indexed only when each resulting URL delivers meaningful independent user value.**

> **SEO is tested, observable, and governed as production infrastructure. Public templates have automated checks for status, metadata, canonicalization, robots directives, sitemaps, structured data, Open Graph, and redirects; JavaScript-heavy surfaces are inspected in both initial and rendered states; SEO-relevant migrations receive explicit deployment plans and markers; Search Console or equivalent webmaster tooling monitors indexing and search presentation; and technical, content, performance, or ranking changes are diagnosed from evidence rather than assumptions.**

A production-grade SEO architecture should make it easy to answer:

```text
Should this URL be public?
Should it be indexable?
Can a crawler reach it?
What HTTP status does it return?
Does meaningful content exist in the initial response?
What is its canonical URL?
Does the page canonical agree with internal links and sitemap?
Should query parameters be canonicalized, noindexed, or indexed?
Is the page included in the sitemap?
What does robots.txt do to it?
Does it have page-level indexing directives?
What title does it expose?
What description does it expose?
What does a social share look like?
Which Schema.org entity does the page represent?
Does structured data match visible authoritative data?
Does the page render without user interaction?
What happens if JavaScript rendering fails?
Does a nonexistent version return 404?
If the URL moves, is the redirect permanent or temporary?
Are there redirect chains?
How are pagination and infinite scroll crawled?
How are filters and sorting controlled?
How are locale alternatives connected?
Does each translated page self-canonicalize correctly?
What happens to preview and staging versions?
Are LCP, INP, and CLS within the performance standard?
How is this behavior tested in CI?
How are indexing/canonical/sitemap regressions detected after deployment?
```

If those questions cannot be answered reliably, the public site may be visible on the web, but it does not yet have a governed technical SEO architecture.

The external baseline supports several of the stricter rules above. Google currently describes canonical selection as influenced by redirects, sitemap inclusion, and `rel="canonical"`, while noting that a declared canonical remains a signal rather than an absolute command. citeturn847137search1 Google also states that page-level `noindex` directives can only be discovered when crawlers are allowed to fetch the page, which is why `robots.txt` blocking and `noindex` are not interchangeable. citeturn745964view0

For crawler control, **RFC 9309** standardizes `/robots.txt` and explicitly states that the Robots Exclusion Protocol is **not an authorization mechanism**. citeturn857293search1 The Sitemap protocol currently limits an individual sitemap to **50,000 URLs or 50 MB uncompressed**, with sitemap indexes available for larger inventories. citeturn857293search0

For rendering, current Google Search guidance still recommends server-side or pre-rendering as a strong approach because it helps users and crawlers and because not every bot executes JavaScript; it also recommends meaningful HTTP status codes and warns against contradictory JavaScript canonical changes. citeturn317334view3 For URL moves, Google currently treats permanent redirects such as **301/308** as canonicalization signals toward the destination and recommends server-side permanent redirects where possible. citeturn317334view4

Structured data should use real Schema.org vocabulary and page facts; Google explicitly treats structured data as a way to understand page content and requires feature-specific guidelines for rich-result eligibility, without guaranteeing that eligible markup will actually be shown. citeturn625048search0turn251810search0 The Open Graph protocol's core properties remain `og:title`, `og:type`, `og:image`, and `og:url`; its specification also recommends image alt metadata when an OG image is supplied. citeturn251810search5

Finally, as of **23 September 2026**, Google's published Core Web Vitals guidance still uses the good-experience targets **LCP ≤ 2.5 s, INP < 200 ms, and CLS < 0.1**. citeturn317334view0turn317334view1turn317334view2

Canonical master placement:

**… → Patterns → Accessibility → Responsive & Device → Browser & Compatibility → SEO → Reusability & Libraries → …**
