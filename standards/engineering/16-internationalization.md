---
id: "internationalization"
title: "Internationalization Guidelines — Gold Standard 2026"
domain: "engineering"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["engineering", "internationalization"]
applies_to: ["general"]
related: ["notifications", "routes", "security", "search"]
legacy_number: 36
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 69876
provenance: baseline

---

# Internationalization Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- internationalization (i18n);
- localization (l10n);
- locales;
- languages;
- regions;
- scripts;
- translation keys;
- translated messages;
- pluralization;
- grammatical selection;
- numbers;
- currencies;
- percentages;
- units;
- dates;
- times;
- time zones;
- calendars;
- relative time;
- names;
- addresses;
- phone numbers;
- sorting and collation;
- search normalization;
- Unicode;
- text encoding;
- right-to-left interfaces;
- bidirectional text;
- locale negotiation;
- fallback languages;
- content expansion;
- localized assets;
- locale-sensitive routing;
- localized notifications;
- testing;
- translation workflows.

The objective is to make software:

```text
Linguistically correct
Regionally appropriate
Unicode-safe
Timezone-safe
RTL-capable
Translation-friendly
Layout-resilient
Deterministic
Accessible
Maintainable
```

The core principle is:

> **Language, locale, region, timezone, currency, and text direction are separate pieces of user context. Never infer one from another when the product can represent it explicitly.**

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
Affected locales
Affected feature
User impact
Fallback behavior
Owner
Review date
```

---

# 3. Internationalization vs Localization

**Internationalization** means engineering software so it can support multiple languages, regions, scripts, formats, and cultural conventions.

**Localization** means adapting that internationalized software to a particular locale.

Conceptually:

```text
Internationalized product
+
translations
+
locale data
+
localized assets
=
localized product
```

---

# 4. Internationalization Is Architecture

i18n MUST NOT be treated as:

```text
replace English strings at the end
```

It affects:

```text
data models
layout
routing
formatting
search
notifications
validation
content
accessibility
testing
```

from the beginning.

---

# 5. Translation Is Only One Part

A translated UI can still be incorrectly internationalized if it uses:

```text
wrong date format
wrong currency
wrong timezone
wrong plural rule
LTR-only layout
incorrect sorting
```

---

# 6. Terminology

Use these terms precisely:

```text
language
script
region
locale
timezone
currency
```

They are not interchangeable.

---

# 7. Language

Language identifies a linguistic system.

Examples:

```text
en
ms
ar
zh
```

---

# 8. Script

Script identifies a writing system.

Examples:

```text
Latn
Arab
Cyrl
Hans
Hant
```

---

# 9. Region

Region identifies a geographic or political territory used for locale distinctions.

Examples:

```text
MY
US
GB
CN
TW
```

---

# 10. Locale

A locale describes linguistic and regional presentation conventions.

Examples:

```text
en
en-GB
en-US
ms-MY
zh-Hans-CN
zh-Hant-TW
```

---

# 11. Timezone

Timezone determines civil-time rules.

Examples:

```text
Asia/Kuching
Asia/Tokyo
Europe/Berlin
America/New_York
```

Timezone is not locale.

---

# 12. Currency

Currency identifies monetary denomination.

Examples:

```text
MYR
USD
EUR
JPY
```

Currency is not locale.

---

# 13. Locale Does Not Determine Everything

A user with:

```text
locale = en-GB
```

might still use:

```text
timezone = Asia/Kuching
currency = MYR
```

That is valid.

---

# 14. Never Infer Timezone From Locale

Bad:

```text
locale = en-US
→ timezone = America/New_York
```

The user could be anywhere.

---

# 15. Never Infer Currency Blindly From Locale

Locale may provide a formatting convention or reasonable onboarding default.

It MUST NOT become authoritative transactional currency automatically.

---

# 16. Never Infer Language From Country Alone

Malaysia does not imply every user prefers Malay.

Canada does not imply English.

Switzerland does not imply German.

---

# 17. Canonical Locale Identifiers

Locale/language identifiers SHOULD use **BCP 47** language tags.

Examples:

```text
en
en-GB
ms-MY
ar-SA
zh-Hans
zh-Hant-TW
```

---

# 18. Do Not Invent Locale Codes

Avoid proprietary forms such as:

```text
english_MY
malay-msia
zh_TW_custom
```

when valid BCP 47 representation exists.

---

# 19. Hyphen Separator

Use:

```text
en-US
```

rather than:

```text
en_US
```

at application/API boundaries unless a specific underlying library requires the latter.

---

# 20. Locale Canonicalization

Locale identifiers SHOULD be canonicalized using trusted runtime/locale libraries.

---

# 21. Locale Case

Typical canonical form is conceptually:

```text
language → lowercase
Script   → Titlecase
REGION   → uppercase
```

Example:

```text
zh-Hant-TW
```

Do not write custom case conversion logic if platform APIs can canonicalize tags.

---

# 22. Locale Validation

User-supplied locale values MUST be validated against supported locale policy.

---

# 23. Supported Locale Registry

The application SHOULD have one canonical registry such as:

```text
en
en-GB
ms
ms-MY
ar
ja
```

with metadata including:

```text
display name
native name
direction
fallback
translation status
```

---

# 24. Supported Locale Is Product Policy

A syntactically valid locale does not imply the application supports it.

---

# 25. Language Selector

Locale selectors SHOULD display language names in their own language where practical.

Examples:

```text
English
Bahasa Melayu
العربية
日本語
```

---

# 26. Do Not Use Flags as Languages

Country flags SHOULD NOT be the primary representation of language.

Reasons include:

```text
one language spans many countries
one country contains many languages
```

---

# 27. Locale Selection Priority

A typical precedence is:

```text
explicit user preference
↓
account/tenant preference where applicable
↓
supported browser/system preference
↓
application default
```

Product requirements MAY adjust this.

---

# 28. Explicit Choice Wins

Once a user explicitly chooses a locale, browser-language negotiation SHOULD NOT silently override it.

---

# 29. Browser Negotiation

Anonymous users MAY use:

```text
Accept-Language
```

or equivalent platform preferences as an initial hint.

---

# 30. Browser Preference Is a Hint

Do not assume browser locale perfectly reflects user intent.

---

# 31. Fallback Locale

Every supported locale MUST have a defined fallback strategy.

---

# 32. Fallback Chain

Example:

```text
fr-CA
↓
fr
↓
en
```

if those are the product's configured relationships.

---

# 33. Fallback Is Deterministic

Fallback MUST NOT depend on unpredictable file loading order.

---

# 34. One Canonical Final Fallback

The application SHOULD define one fully supported base/fallback locale.

---

# 35. Missing Translation

A missing translation MUST NOT produce:

```text
undefined
null
translation.home.title
```

in normal production UI.

---

# 36. Missing Translation Observability

Missing translation fallbacks SHOULD be observable.

---

# 37. Fallback Does Not Mean Translation Complete

A locale relying heavily on fallback content SHOULD NOT be represented as fully localized.

---

# 38. Mixed-Language UI

Fallback may produce mixed-language screens.

Critical workflows SHOULD minimize this through translation completeness gates.

---

# 39. Locale Persistence

Authenticated user locale SHOULD normally be stored server-side if the preference must follow the user across devices.

---

# 40. Anonymous Locale

Anonymous locale MAY be persisted through:

```text
cookie
local preference
URL
```

according to routing architecture.

---

# 41. Locale in URL

Public localized content MAY use locale-aware routes such as:

```text
/en/docs
/ms/docs
```

when SEO/shareability requires it.

---

# 42. Locale Routing

Locale routing follows Routes Guidelines and MUST distinguish:

```text
content locale
user locale
route locale
```

where they can differ.

---

# 43. Canonical URLs

Localized public content SHOULD define canonical/alternate URL behavior according to SEO requirements.

---

# 44. Locale Switcher

Switching locale SHOULD preserve the user's current semantic destination where possible.

Bad:

```text
/settings/security
→ switch locale
→ homepage
```

---

# 45. Unsupported Page Locale

If content does not exist in the selected locale, the product SHOULD use an explicit fallback state rather than silently showing unrelated content.

---

# 46. Unicode Everywhere

All application text handling MUST use Unicode.

---

# 47. UTF-8

UTF-8 SHOULD be the default encoding for:

```text
source
HTML
HTTP
APIs
files
databases
```

unless a legitimate external protocol requires otherwise.

---

# 48. Declare Encoding

Text protocols/documents SHOULD explicitly declare UTF-8 where relevant.

---

# 49. No ASCII Assumptions

Code MUST NOT assume:

```text
one character = one byte
```

---

# 50. Code Point ≠ User-Perceived Character

A user-perceived character may consist of multiple Unicode code points.

---

# 51. Grapheme Cluster

UI operations such as:

```text
cursor movement
character count
truncation
selection
```

SHOULD use grapheme-aware behavior where appropriate.

---

# 52. String Length

Do not use byte length or UTF-16 code-unit length as a user-facing "character count" without understanding the requirement.

---

# 53. Emoji

Emoji MAY use multiple code points through:

```text
variation selectors
skin tones
ZWJ sequences
regional indicators
```

Do not split them blindly.

---

# 54. Unicode Normalization

Systems SHOULD define Unicode normalization strategy where equality/search/security depend on text equivalence.

---

# 55. Normalization Is Context-Specific

Do not normalize every input destructively without knowing semantic requirements.

---

# 56. Identifier Normalization

User-visible names and security-sensitive identifiers can require different normalization policies.

---

# 57. Preserve Original Text

Where fidelity matters, preserve original user-entered Unicode rather than rewriting it unnecessarily.

---

# 58. Case Conversion

Case conversion MUST be locale-aware when linguistic correctness matters.

---

# 59. Do Not Implement Case Rules Manually

Use Unicode/locale-aware libraries.

---

# 60. Translation Keys

User-facing application strings SHOULD use stable translation keys.

---

# 61. Translation Key Example

Preferred:

```text
settings.security.passkeys.add
```

rather than:

```text
Add passkey
```

as the primary durable key in systems using semantic keys.

---

# 62. Stable Semantic Keys

Keys SHOULD describe message purpose/context.

---

# 63. Avoid Positional Keys

Bad:

```text
page3.label2
text17
```

---

# 64. Avoid Temporary Ticket Keys

Bad:

```text
JIRA_4481_title
```

---

# 65. Avoid Developer Names

Bad:

```text
alice_new_button
```

---

# 66. Key Namespace

Recommended conceptual structure:

```text
<domain>.<surface>.<purpose>
```

Example:

```text
billing.invoice.status.overdue
```

---

# 67. Key Stability

Translation keys SHOULD remain stable across copy refinements when their semantic purpose does not change.

---

# 68. Semantic Change

If a message's meaning materially changes, translation review MUST be triggered even if the English source appears similar.

---

# 69. Keys Are Not Runtime Data

Do not dynamically construct arbitrary keys such as:

```text
t("status." + serverValue)
```

unless the allowed key set is bounded and validated.

---

# 70. Translation Catalog Ownership

Translation catalogs SHOULD be:

```text
version-controlled
reviewable
extractable
validated
```

or managed through an approved localization platform with equivalent governance.

---

# 71. Source Locale

Every project MUST define its source-authoring locale.

Often:

```text
en
```

but it need not be English.

---

# 72. Source Locale Is Not Fallback Automatically

The product SHOULD explicitly define whether the source locale also acts as final fallback.

---

# 73. Translation Context

Translators SHOULD receive enough context to understand:

```text
screen
meaning
tone
placeholder meaning
character constraints
```

---

# 74. Context Metadata

Translation systems SHOULD support:

```text
description
screenshots
developer comments
placeholder descriptions
```

where practical.

---

# 75. Avoid Ambiguous Source Strings

Bad standalone source:

```text
Open
```

Could mean:

```text
open a file
open status
open door
```

Use separate context-specific messages.

---

# 76. Reuse Carefully

Two identical English phrases SHOULD NOT necessarily share one translation key if their meanings differ.

---

# 77. Sentence Fragments

Do not translate sentence fragments independently and concatenate them.

Bad:

```text
t("user")
+ name +
t("uploaded")
+ count +
t("files")
```

---

# 78. Translate Complete Messages

Use one grammatical message:

```text
{user} uploaded {count} files.
```

so translators can rearrange elements.

---

# 79. Message Formatting

Variable user-facing messages SHOULD use a locale-aware message formatting system such as ICU-style messages or an equivalent framework.

---

# 80. Placeholder Names

Use descriptive placeholders:

```text
{userName}
{fileCount}
{dueDate}
```

not:

```text
{0}
{1}
{2}
```

where tooling allows meaningful names.

---

# 81. Placeholder Type

Translation tooling SHOULD know whether a placeholder represents:

```text
number
date
currency
name
link
plain text
```

where supported.

---

# 82. Placeholder Escaping

Dynamic placeholder content MUST be safely escaped for its rendering context.

---

# 83. No HTML From Translators by Default

Translation messages SHOULD NOT require arbitrary HTML when structured rich-message components can safely represent links/emphasis.

---

# 84. Rich Messages

Rich localized content SHOULD use controlled placeholders/components.

Example:

```text
Read our {termsLink}.
```

rather than translators editing complex markup.

---

# 85. Pluralization

Plural logic MUST use locale-specific plural rules.

---

# 86. Never Implement `count === 1` Globally

Bad:

```text
count === 1
  ? "1 item"
  : `${count} items`
```

for a globally localized product.

Languages have different plural categories.

---

# 87. Plural Categories

Depending on locale, plural categories can include:

```text
zero
one
two
few
many
other
```

The exact set is locale-specific.

---

# 88. `other` Form

Plural messages MUST provide the required catch-all form supported by the chosen message framework.

---

# 89. Plural Selection vs Formatting

Plural rule selection and formatted display of the number SHOULD use the same effective locale.

---

# 90. Zero

Do not assume `0` uses a special `zero` plural form in every language.

---

# 91. Decimal Plurals

Plural behavior for:

```text
1
1.0
1.5
2
```

can differ by language/framework semantics.

Do not hard-code assumptions.

---

# 92. Ordinals

Ordinal rules such as:

```text
1st
2nd
3rd
```

are locale-specific and SHOULD use locale-aware formatting.

---

# 93. Select Messages

Grammatical alternatives MAY require `select`-style messages.

---

# 94. Avoid Gender Assumptions

Do not infer grammatical gender or personal identity when the product does not have trustworthy data and legitimate need.

---

# 95. Nested Grammar

Some languages require interactions between:

```text
plural
gender/class
case
```

Use capable message-formatting systems rather than fragment concatenation.

---

# 96. Translation Key Validation

CI SHOULD verify:

```text
missing keys
unknown keys
invalid message syntax
missing plural categories where required
placeholder mismatch
```

---

# 97. Placeholder Consistency

A translation MUST NOT silently:

```text
drop required placeholders
rename placeholders
introduce nonexistent placeholders
```

without validation.

---

# 98. Number Formatting

User-visible numbers MUST use locale-aware formatters.

---

# 99. No Manual Thousands Separators

Bad:

```text
1,000,000
```

hard-coded as universal display.

Different locales use different grouping and decimal conventions.

---

# 100. NumberFormatter

Use runtime/ICU/CLDR-based number formatting.

---

# 101. Storage vs Display

Store numeric values as numeric data.

Format only for display.

---

# 102. Parsing Localized Numbers

Localized user input requires deliberate parsing rules.

Do not assume:

```text
"1,234"
```

means the same number everywhere.

---

# 103. Numeric Input

Prefer structured input controls and locale-aware parsing over accepting arbitrary formatted strings when possible.

---

# 104. Decimal Separator

Some locales use:

```text
1,5
```

where others use:

```text
1.5
```

---

# 105. Group Separator

Thousands grouping may use:

```text
comma
period
space
non-breaking space
```

depending on locale.

---

# 106. Grouping Size

Grouping patterns are not universally:

```text
3,3,3
```

---

# 107. Percentages

Percentages MUST use locale-aware formatting.

---

# 108. Percent Value Semantics

The code MUST define whether:

```text
0.15
```

means:

```text
15%
```

before formatting.

---

# 109. Units

Units SHOULD use locale-aware formatting where user-facing.

Examples:

```text
kilometres
miles
kilograms
bytes
degrees
```

---

# 110. Unit Preferences

Unit preference may depend on:

```text
locale
region
user preference
domain
```

Do not derive physical conversion rules from language alone.

---

# 111. Machine Values

APIs/internal storage SHOULD retain canonical numeric/unit values.

Localized formatting is a presentation concern.

---

# 112. Currency Representation

Monetary values MUST be represented as:

```text
amount
+
currency
```

---

# 113. Never Store Bare Money

Bad:

```text
amount = 100
```

with an implicit global currency assumption.

---

# 114. ISO Currency Codes

Use standard currency codes such as:

```text
MYR
USD
EUR
JPY
```

at data/API boundaries.

---

# 115. Currency Formatting

Use locale-aware currency formatting.

Example conceptual input:

```text
amount = 1234.50
currency = MYR
locale = ms-MY
```

The formatter decides presentation.

---

# 116. Currency Symbol Ambiguity

Symbols such as:

```text
$
```

may represent multiple currencies.

Use explicit codes where ambiguity matters.

---

# 117. Currency Digits

Do not assume every currency has two minor-decimal digits.

---

# 118. Currency Rounding

Financial calculations MUST follow domain/currency rules before display formatting.

---

# 119. Formatting Is Not Conversion

Formatting:

```text
100 USD
```

for a Malaysian locale does NOT mean converting it to MYR.

---

# 120. Currency Conversion

FX conversion is separate business logic requiring:

```text
rate
rate timestamp
source
rounding
```

---

# 121. Transaction Currency

Transactional currency comes from authoritative business state.

It MUST NOT silently change because UI locale changes.

---

# 122. Date/Time Storage

Persistent timestamps SHOULD normally use an unambiguous instant representation.

---

# 123. UTC for Instants

For actual points in time, store/transmit UTC-based instants such as:

```text
2026-09-23T04:30:00Z
```

or an equivalent native instant type.

---

# 124. Local Date Is Different

A birthday such as:

```text
1990-05-12
```

is a **date**, not a UTC timestamp.

---

# 125. Local Time Is Different

A recurring business rule such as:

```text
09:00 every Monday
```

is a local-time/calendar rule, not merely a UTC instant.

---

# 126. Temporal Type Matters

Distinguish:

```text
Instant
Local date
Local time
Local datetime
Zoned datetime
Duration
Calendar recurrence
```

---

# 127. Do Not Convert Dates to Midnight UTC

A date-only value MUST NOT be represented as:

```text
00:00 UTC
```

and then displayed through timezone conversion unless that actually represents its semantics.

---

# 128. Timezone Identifiers

Use IANA timezone identifiers.

Examples:

```text
Asia/Kuching
Europe/Paris
America/Los_Angeles
```

---

# 129. Avoid Fixed Offsets as User Timezones

Bad:

```text
UTC+8
```

as the sole timezone model when civil-time rules matter.

Fixed offsets do not encode future/historical timezone changes.

---

# 130. Avoid Abbreviations as Identity

Abbreviations such as:

```text
CST
IST
BST
```

can be ambiguous.

Use canonical IANA identifiers internally.

---

# 131. Timezone Database

Runtime/infrastructure SHOULD maintain reasonably current IANA tzdb data.

Timezone rules change through legislation.

---

# 132. Timezone Is Mutable Reference Data

Do not hard-code DST transition dates manually.

---

# 133. User Timezone

Products with time-sensitive behavior SHOULD store explicit user timezone when needed.

---

# 134. Account Timezone

Businesses MAY additionally define organization/account timezone.

---

# 135. Event Timezone

An event MAY have its own timezone independent of viewer timezone.

---

# 136. Viewer vs Event Time

Interfaces MUST define whether a timestamp is shown in:

```text
viewer timezone
event timezone
organization timezone
UTC
```

---

# 137. Display Timezone Context

When ambiguity matters, show the timezone or zone abbreviation alongside time.

---

# 138. Date Formatting

User-facing dates SHOULD use locale-aware date formatters.

---

# 139. Avoid Hard-Coded Date Pattern

Bad universal UI:

```text
MM/DD/YYYY
```

---

# 140. Ambiguous Numeric Dates

Avoid ambiguous dates such as:

```text
03/04/2026
```

where users may interpret month/day differently.

---

# 141. Machine Date Formats

Machine-readable APIs MAY use ISO-standard representations independent of user locale.

---

# 142. Do Not Localize API Dates

A JSON API SHOULD NOT unpredictably return:

```text
23/09/2026
```

because the requesting user's locale changed, unless that API is specifically presentation-oriented.

---

# 143. Time Formatting

12-hour vs 24-hour presentation SHOULD follow locale/user preference.

---

# 144. User Time Format Preference

Products MAY allow explicit:

```text
12-hour
24-hour
```

preference independently of locale.

---

# 145. Seconds

Do not display seconds unless users need that precision.

---

# 146. Time Zone Conversion

Use trusted temporal/timezone libraries for conversions.

---

# 147. DST Gaps

Some local times do not exist during daylight-saving transitions.

Example conceptual issue:

```text
02:30
```

may be skipped.

---

# 148. DST Overlap

Some local times occur twice when clocks move backward.

---

# 149. Ambiguous Local Time

When scheduling in local time, the system MUST define how DST gaps/overlaps are resolved.

---

# 150. Recurring Schedule

Persist recurring schedules as:

```text
local schedule
+
IANA timezone
```

when they should continue following local civil time.

---

# 151. Do Not Convert Recurrence Permanently to UTC

Bad:

```text
09:00 America/New_York
→ save forever as 14:00 UTC
```

DST changes may shift the correct UTC instant.

---

# 152. Scheduled Notifications

Notification delivery times MUST follow the timezone semantics defined in Notifications Guidelines.

---

# 153. Relative Time

Relative phrases such as:

```text
5 minutes ago
tomorrow
yesterday
```

SHOULD use locale-aware relative-time formatting.

---

# 154. Relative Time Threshold

Define product rules for switching between:

```text
just now
5 min ago
exact date
```

---

# 155. Relative Time Accessibility

Exact timestamps SHOULD remain discoverable where precision matters.

---

# 156. Calendar Systems

Applications SHOULD NOT assume Gregorian calendar formatting is the only possible user expectation when target locales require additional calendar support.

---

# 157. Business Calendar

Business/legal calculations MUST use the calendar required by domain rules, not simply the display locale's calendar.

---

# 158. Week Start

The first day of the week varies by locale/region.

Use locale data or explicit product/account configuration.

---

# 159. Weekend

Weekend days also vary and SHOULD NOT be globally hard-coded as Saturday/Sunday if business logic depends on them internationally.

---

# 160. Week Numbers

Week numbering conventions vary.

Do not implement week-of-year rules manually.

---

# 161. Date Picker

Date pickers SHOULD reflect locale:

```text
week start
month names
date order
```

while preserving accessibility.

---

# 162. Names

Human names are not universally:

```text
first name
+
last name
```

---

# 163. Name Fields

Prefer:

```text
full/display name
```

unless the product genuinely needs separate name components.

---

# 164. Given/Family Names

If separate fields are required, labels and ordering MUST be localizable.

---

# 165. Do Not Require Latin Characters

Names and addresses MUST NOT require ASCII/Latin letters without legitimate domain reason.

---

# 166. Name Length

Do not impose tiny Western-centric length limits.

---

# 167. Honorifics

Honorific/title fields SHOULD be optional unless a real domain requirement exists.

---

# 168. Sorting Names

Do not sort global names using raw Unicode code-point order.

Use locale-aware collation where human sorting matters.

---

# 169. Addresses

Postal address structure varies significantly by country/region.

---

# 170. Address Forms

Do not assume universal:

```text
street
city
state
ZIP
```

requirements.

---

# 171. Region-Specific Address Schema

Address fields SHOULD adapt according to the selected country when business requirements justify it.

---

# 172. Postal Codes

Postal code:

```text
format
length
required status
```

varies by region.

---

# 173. State/Province

Do not require "State" universally.

---

# 174. Address Formatting

Display addresses using locale/country-aware formatting where possible.

---

# 175. Phone Numbers

Phone numbers SHOULD be stored in a normalized interoperable form where appropriate.

---

# 176. Display Phone Numbers

Display formatting MAY adapt to locale/region.

---

# 177. Country Calling Code

Do not assume local phone numbers can be interpreted without regional context.

---

# 178. Email Address

Do not infer locale, country, or timezone from an email address.

---

# 179. Collation

Human-readable sorting MUST use locale-aware collation where linguistic order matters.

---

# 180. Raw Code-Point Sort

Bad:

```text
strings.sort()
```

when the expectation is human alphabetic order.

---

# 181. Collation Locale

Sort order SHOULD use the locale relevant to the content/user.

---

# 182. Search vs Collation

Search normalization and sort collation are related but separate concerns.

---

# 183. Accent Sensitivity

Whether:

```text
e
é
```

should compare/search equivalently is locale/domain dependent.

---

# 184. Case Sensitivity

Case-sensitive matching SHOULD be deliberate.

---

# 185. Search Internationalization

Search Guidelines SHOULD define language-aware:

```text
analysis
tokenization
stemming
accent handling
collation
```

for supported locales.

---

# 186. Translation of Indexed Content

A content locale SHOULD be stored/indexed explicitly where search behavior depends on language.

---

# 187. RTL Support

Applications claiming global language support SHOULD be architecturally capable of right-to-left layouts where target locales require it.

---

# 188. Direction Is Not Language

Text direction is principally a property of script/content.

Do not build direction handling from simplistic assumptions such as:

```text
language === "ar"
```

everywhere.

---

# 189. Document Direction

For an RTL page, set the document's base direction using semantic markup such as:

```text
<html dir="rtl">
```

on the web.

---

# 190. `lang`

Set the document language appropriately:

```text
<html lang="ar" dir="rtl">
```

for relevant content.

---

# 191. Direction Metadata

Language and direction SHOULD be represented separately.

---

# 192. CSS Logical Properties

Layouts SHOULD prefer logical properties:

```text
margin-inline-start
margin-inline-end
padding-inline
inset-inline
border-inline
```

over LTR-specific geometry where possible.

---

# 193. Avoid Left/Right Semantics

Bad component API:

```text
leftIcon
rightPadding
```

when meaning is actually:

```text
leadingIcon
trailingPadding
```

---

# 194. Start/End

Prefer semantic concepts:

```text
start
end
leading
trailing
```

where directionality should mirror.

---

# 195. Not Everything Mirrors

Do not automatically mirror:

```text
logos
media playback controls
graphs with semantic axes
clockwise symbols
mathematical notation
```

without understanding meaning.

---

# 196. Directional Icons

Icons such as:

```text
back
forward
next
previous
```

often require mirroring.

---

# 197. Neutral Icons

Icons with no directionality SHOULD remain unchanged.

---

# 198. RTL Alignment

Paragraph alignment generally follows base direction.

Do not manually right-align every component through ad hoc classes.

---

# 199. Navigation Order

RTL may affect:

```text
breadcrumbs
tabs
pagination
navigation
```

visual order while preserving semantic/DOM accessibility.

---

# 200. Logical DOM Order

DOM/source order SHOULD remain logical and accessible.

Do not reverse DOM arbitrarily just to obtain visual RTL.

---

# 201. Bidirectional Text

Applications MUST handle mixed RTL/LTR text safely.

Examples include:

```text
Arabic sentence + English product code
Hebrew + email address
Arabic + phone number
```

---

# 202. Bidi Isolation

User-generated or directionally unknown inline content SHOULD be isolated appropriately.

On the web, suitable constructs may include:

```text
<bdi>
dir="auto"
```

depending on context.

---

# 203. User Names in RTL

A user name inserted into an RTL sentence can alter punctuation/order if not properly isolated.

---

# 204. IDs and Codes

Identifiers such as:

```text
ABC-123
user@example.com
+60 12-345 6789
```

often require LTR isolation inside RTL context.

---

# 205. Do Not Insert Bidi Control Characters Casually

Prefer semantic markup/platform APIs over manually embedding invisible direction-control characters.

---

# 206. Bidi Security

Security-sensitive displays SHOULD consider Unicode directionality spoofing.

Examples include:

```text
filenames
URLs
identifiers
```

---

# 207. Mixed-Script Spoofing

Applications with security-sensitive identifiers SHOULD consider confusable/mixed-script attacks according to Security Guidelines.

---

# 208. RTL Testing

RTL MUST be tested as an actual interface mode rather than simulated only by right-aligning text.

---

# 209. RTL Component Tests

Test:

```text
navigation
forms
tables
menus
dialogs
icons
breadcrumbs
charts
pagination
```

for RTL behavior.

---

# 210. Layout Expansion

Translated text can be significantly longer or shorter than source text.

Layouts MUST tolerate expansion.

---

# 211. No Fixed English Widths

Avoid sizing UI containers specifically to English copy.

---

# 212. Flexible Width

Use:

```text
intrinsic sizing
wrapping
flex/grid
min/max constraints
```

rather than brittle fixed text widths.

---

# 213. Buttons

Buttons MUST support translated label expansion.

---

# 214. Button Text Must Not Clip

Do not truncate important action labels simply because the translation is longer.

---

# 215. Navigation

Navigation labels SHOULD tolerate wrapping or responsive recomposition.

---

# 216. Tabs

Long localized tab labels may require:

```text
scroll
wrap
alternative navigation
```

rather than unreadable truncation.

---

# 217. Table Headers

Localized table headers can expand materially.

Tables must remain usable.

---

# 218. Forms

Labels, help text, and validation errors SHOULD expand without overlapping controls.

---

# 219. Dialogs

Dialogs MUST not rely on one-line English titles/buttons.

---

# 220. Toasts

Toast width/duration SHOULD accommodate translated text without clipping or disappearing too quickly.

---

# 221. Text Expansion Testing

Pseudo-localization SHOULD include text expansion.

---

# 222. Expansion Budget

As a heuristic, interfaces SHOULD survive substantial expansion rather than assuming translations stay within a few percent of English.

No universal percentage guarantees every language.

---

# 223. Short Source Strings

Very short English strings can expand proportionally much more than long sentences.

---

# 224. Avoid Character Limits for UI Copy

Do not impose arbitrary translation character limits solely to preserve brittle design.

Redesign the component if necessary.

---

# 225. Genuine Channel Limits

When a channel genuinely has constraints:

```text
SMS
push title
device display
```

provide translators with explicit constraints/context.

---

# 226. Pseudo-Localization

The development workflow SHOULD support pseudo-locales.

---

# 227. Pseudo-Locale Goals

A pseudo-locale can reveal:

```text
hard-coded text
layout expansion
encoding problems
untranslated strings
placeholder issues
```

---

# 228. RTL Pseudo-Locale

An RTL pseudo-locale SHOULD be available where RTL support is required.

---

# 229. Do Not Ship Pseudo-Locale Publicly

Pseudo-locales are testing tools unless explicitly exposed internally.

---

# 230. Hard-Coded Strings

User-facing strings SHOULD NOT be scattered directly through application code when localization applies.

---

# 231. Exceptions to Translation

Some text SHOULD remain invariant, such as:

```text
brand names
technical identifiers
legal codes
```

when policy says so.

---

# 232. Mark Non-Translatable Content

Translation tooling SHOULD support explicit:

```text
do not translate
```

metadata for invariant terms.

---

# 233. Brand Glossary

Organizations SHOULD maintain localization terminology for:

```text
product names
feature names
domain terminology
```

where consistency matters.

---

# 234. Translation Memory

Translation memory MAY improve consistency and cost but SHOULD NOT override changed context blindly.

---

# 235. Machine Translation

Machine translation MAY assist localization workflows.

Human review SHOULD be required where quality/risk demands it.

---

# 236. AI Translation

AI-generated translations MUST follow the same:

```text
terminology
privacy
review
context
quality
```

requirements as other translation methods.

---

# 237. Sensitive Content and Translation Vendors

Customer/private text MUST NOT be sent to external translation systems without approved data-processing governance.

---

# 238. Static UI vs User Content

Distinguish:

```text
product UI translation
```

from:

```text
user-generated content translation
```

They have different privacy/product semantics.

---

# 239. User Content Translation

Automatic translation of user content SHOULD be opt-in/explicit where meaning or privacy matters.

---

# 240. Legal Content

Legal documents SHOULD use formally approved localized versions rather than ad hoc runtime machine translation where legal meaning matters.

---

# 241. Localization Workflow

Canonical workflow:

```text
Source message added/changed
↓
Extract/sync translation source
↓
Translate
↓
Review
↓
Validate
↓
Integrate
↓
Pseudo/locale testing
↓
Release
```

---

# 242. String Freeze

Large releases MAY use translation/string freeze when localization operations require stable source copy.

Continuous localization MAY avoid formal freeze where tooling supports it.

---

# 243. Translation Completeness

Release policy SHOULD define minimum completion thresholds for supported locales.

---

# 244. Critical Flow Coverage

Authentication, billing, onboarding, legal, and support-critical flows SHOULD receive stronger localization completeness requirements.

---

# 245. New Feature Missing Translation

Feature rollout MAY be limited by locale if translation is incomplete.

This SHOULD be a deliberate product decision, not an accidental fallback.

---

# 246. Locale Availability

Do not advertise a locale as supported when core product journeys remain mostly untranslated.

---

# 247. Translation Review

Human linguistic review SHOULD focus on:

```text
meaning
grammar
terminology
tone
layout
variables
```

not only literal word equivalence.

---

# 248. Screenshots

Translation review SHOULD use visual context where tooling permits it.

---

# 249. Accessibility

Localized UI MUST preserve accessibility semantics.

---

# 250. Accessible Names

Translated visible labels and accessible names SHOULD remain semantically aligned.

---

# 251. `lang` Attribute

Web content SHOULD identify document and inline language changes appropriately so assistive technology can pronounce content correctly.

---

# 252. Mixed Language

If a paragraph contains a phrase in another language, mark the language change where accessibility/browser behavior benefits.

---

# 253. Translation Must Not Remove Semantics

Localization MUST NOT remove:

```text
required labels
instructions
error meaning
accessibility context
```

to save space.

---

# 254. Font Coverage

Fonts MUST support the glyphs/scripts required by supported locales.

---

# 255. Missing Glyph

Tofu/missing-glyph boxes are a release defect.

---

# 256. Font Fallback

Font stacks SHOULD define script-appropriate fallbacks.

---

# 257. One Font Does Not Fit All Scripts

A Latin-optimized brand font may not provide high-quality:

```text
Arabic
CJK
Devanagari
Thai
```

coverage.

---

# 258. Script Typography

Typography MAY vary by script to preserve readability.

---

# 259. Line Height

Some scripts require different vertical metrics.

Avoid hard-coded line heights that clip glyphs.

---

# 260. Letter Spacing

Do not apply global Latin-oriented tracking rules to scripts where letter spacing is inappropriate.

---

# 261. Text Transform

CSS:

```text
text-transform: uppercase
```

SHOULD NOT be used globally without checking language behavior.

---

# 262. CJK Layout

CJK languages may require different:

```text
line breaking
punctuation
font
word segmentation
```

behavior.

---

# 263. Word Boundaries

Do not assume every language uses spaces between words.

---

# 264. Truncation

Text truncation SHOULD use Unicode/grapheme-safe boundaries.

---

# 265. Ellipsis

Use locale/platform-appropriate ellipsis handling.

---

# 266. URLs

URLs and domain names can contain internationalized components.

Security-sensitive display SHOULD prevent spoofing and ambiguity.

---

# 267. Slugs

Localized route slugs MAY be supported where SEO/product needs justify them.

They require:

```text
Unicode normalization
encoding
canonicalization
redirect policy
```

---

# 268. Database Schema

Database text fields MUST support Unicode.

---

# 269. Text Length Constraints

Database/application length constraints SHOULD reflect Unicode/user needs rather than arbitrary byte counts when the domain is character-oriented.

---

# 270. Search Fields

Language metadata SHOULD accompany text when search/analyzers depend on locale.

---

# 271. APIs

APIs SHOULD transmit semantic/raw values, not prelocalized strings, unless presentation output is intentionally part of the API contract.

---

# 272. Good API

Prefer:

```text
{
  "amount": 1234.5,
  "currency": "MYR"
}
```

over:

```text
{
  "amount": "RM 1,234.50"
}
```

for domain APIs.

---

# 273. Localized API Exception

A BFF/presentation API MAY return localized copy when the client architecture intentionally delegates rendering to the server.

---

# 274. Error Codes

APIs SHOULD return stable machine-readable error codes separately from localized display messages.

---

# 275. Localized Server Errors

Server-rendered applications MAY localize user-facing errors based on trusted request/user locale.

---

# 276. Logging

Operational logs SHOULD generally remain structured and machine-consistent rather than locale-formatted.

---

# 277. Log Timestamps

Logs SHOULD use machine-readable unambiguous timestamps.

Do not localize log timestamps for storage.

---

# 278. Metrics

Metrics MUST use stable machine identifiers, not localized labels.

---

# 279. Analytics

Analytics event names/properties SHOULD remain canonical and language-independent.

---

# 280. Analytics Locale

Relevant events MAY include:

```text
locale
content_locale
timezone
```

as bounded semantic dimensions when analytically justified.

---

# 281. Email Localization

Notification templates SHOULD use the recipient's intended locale according to Notifications Guidelines.

---

# 282. PDF/Document Localization

Generated PDFs/documents MUST:

```text
support target glyphs
format dates/numbers correctly
handle RTL
```

where those locales are supported.

---

# 283. Export Data

Machine-consumable exports SHOULD use stable schema/value formats.

Human-oriented exports MAY use locale formatting when explicitly designed.

---

# 284. CSV

Localized CSV requires caution because:

```text
decimal separator
field delimiter
date format
```

can conflict.

Define the export contract explicitly.

---

# 285. Import

Do not assume imported dates/numbers follow the current UI locale unless the import contract says so.

---

# 286. Configuration

Configuration files SHOULD use canonical machine values, not localized display values.

---

# 287. Boolean Values

Machine config SHOULD use:

```text
true
false
```

or schema values, not localized equivalents.

---

# 288. Sort Persistence

Persist semantic sort keys/options such as:

```text
name_asc
created_desc
```

not localized labels.

---

# 289. User Preference Storage

Persist:

```text
locale = "ms-MY"
timezone = "Asia/Kuching"
```

not rendered labels such as:

```text
Malay (Malaysia)
Malaysia Time
```

---

# 290. Locale Changes

Changing locale SHOULD alter presentation without corrupting authoritative business state.

---

# 291. Changing Locale Must Not Change Currency

A locale switch:

```text
en-US → ms-MY
```

MUST NOT silently transform a USD transaction into MYR.

---

# 292. Changing Locale Must Not Change Timezone

Language changes and timezone changes are independent user actions unless product UX intentionally combines them during onboarding.

---

# 293. Account Defaults

Tenant/account defaults MAY seed:

```text
locale
timezone
currency
```

but users MAY override the values where product semantics allow.

---

# 294. Server vs Client Rendering

Server and client MUST use compatible locale/timezone data to avoid hydration differences.

---

# 295. Hydration

A server rendering:

```text
Sep 23, 2026
```

while client immediately renders:

```text
23 Sep 2026
```

creates avoidable visual/hydration inconsistency.

---

# 296. Locale Context

SSR architecture SHOULD resolve locale deterministically before rendering.

---

# 297. Timezone Context in SSR

If user timezone is unknown on the server, architecture SHOULD avoid falsely formatting a local time as though it were authoritative.

---

# 298. Stable Placeholder Rendering

When client-only timezone formatting is required, use a deliberate loading/fallback strategy rather than incorrect server values.

---

# 299. Caching

Localized responses MUST include locale among relevant cache-key dimensions.

---

# 300. CDN

A CDN MUST NOT serve:

```text
English response
```

to:

```text
Malay cache key
```

because locale was omitted from variation.

---

# 301. Locale Cache Strategy

Locale may vary via:

```text
URL
cookie
header
user identity
```

but cache semantics MUST represent whichever dimension actually changes output.

---

# 302. `Vary`

If HTTP header negotiation affects localized representation, caching must reflect that safely.

---

# 303. Prefer URL for Public Localized Content

Locale-prefixed URLs are often easier to:

```text
cache
share
crawl
canonicalize
```

for public content.

---

# 304. Authentication

Authentication flows MUST be available in supported locales required for users to access the product.

---

# 305. Recovery

Account-recovery communication MUST preserve locale where possible.

---

# 306. Consent

Consent/legal copy MUST preserve version and locale when audit requires proof of what the user saw.

---

# 307. Audit Record

When legally significant text matters, record:

```text
document/version
locale
timestamp
```

rather than only storing translated free text.

---

# 308. Testing Strategy

Internationalization requires dedicated automated and manual testing.

---

# 309. Default-Locale Test

Default locale alone is insufficient.

---

# 310. Representative Locale Matrix

Test at least representative dimensions such as:

```text
LTR Latin
RTL
CJK
long-text locale
complex plural locale
```

according to supported product locales.

---

# 311. Pseudo-Locale CI

Core UI SHOULD be testable under pseudo-localization.

---

# 312. RTL CI

Critical layouts SHOULD be testable under RTL.

---

# 313. Locale Snapshot

Visual regression MAY use representative locale screenshots.

---

# 314. Layout Expansion Test

Test:

```text
buttons
tabs
headers
forms
tables
dialogs
toasts
navigation
```

with expanded strings.

---

# 315. Missing-Key Test

CI SHOULD detect missing source/required locale keys.

---

# 316. Unused-Key Detection

Unused translation keys SHOULD be identified periodically.

---

# 317. Placeholder Test

CI SHOULD detect placeholder mismatches across translations.

---

# 318. ICU Syntax Test

Complex message syntax SHOULD be parsed/validated before release.

---

# 319. Plural Test

Test values such as:

```text
0
1
2
3
5
11
21
1.5
```

against locales with different plural rules.

Exact values depend on locale coverage.

---

# 320. Currency Test

Test currencies with:

```text
different minor digits
symbol positions
negative values
large values
```

---

# 321. Number Test

Test:

```text
decimal
grouping
percentage
negative
zero
large numbers
```

---

# 322. Timezone Test

Test:

```text
UTC+
UTC-
DST zone
non-DST zone
```

---

# 323. DST Transition Test

Scheduling logic SHOULD test:

```text
nonexistent local time
ambiguous repeated time
```

for DST locales.

---

# 324. Date Boundary Test

Test timestamps around:

```text
midnight
month end
year end
timezone day boundary
```

---

# 325. RTL Mixed-Text Test

Test:

```text
RTL sentence + email
RTL sentence + number
RTL sentence + identifier
```

---

# 326. Bidi Security Test

Security-sensitive file names/identifiers SHOULD be tested against directional-control/confusable inputs where relevant.

---

# 327. Unicode Test

Test:

```text
emoji
combining marks
non-Latin names
supplementary characters
```

---

# 328. Font Coverage Test

Supported locales SHOULD be checked for missing glyphs.

---

# 329. Locale Fallback Test

Test fallback chains deliberately.

---

# 330. Unsupported Locale Test

Requests with unsupported but valid locale tags SHOULD fall back predictably.

---

# 331. Invalid Locale Test

Malformed locale identifiers SHOULD not crash formatting.

---

# 332. Translation Review Checklist

```text
□ Meaning preserved
□ Correct terminology
□ Placeholders retained
□ Grammar natural
□ Plural forms valid
□ Tone appropriate
□ No clipping
□ RTL correct where relevant
□ Accessible meaning preserved
```

---

# 333. Locale Checklist

```text
□ BCP 47 identifier
□ Supported registry entry
□ Native display name
□ Direction
□ Fallback
□ Translation coverage
□ Number/date formatting tested
□ Font support
```

---

# 334. Translation-Key Checklist

```text
□ Semantic key
□ Stable namespace
□ Context supplied
□ Complete message
□ No concatenated fragments
□ Typed placeholders
□ Placeholder validation
□ Source meaning clear
```

---

# 335. Pluralization Checklist

```text
□ Locale-aware rule engine
□ `other` case
□ Relevant plural categories
□ Zero behavior verified
□ Decimal behavior verified
□ Ordinal handling where needed
□ No English singular/plural assumption
```

---

# 336. Date & Time Checklist

```text
□ Temporal type chosen correctly
□ Instant stored unambiguously
□ Date-only remains date-only
□ IANA timezone
□ User/event timezone semantics
□ Locale-aware output
□ DST handling
□ Recurrence handling
□ Ambiguous numeric dates avoided
```

---

# 337. Currency Checklist

```text
□ Amount + currency stored
□ Standard currency code
□ No implicit global currency
□ Locale-aware formatting
□ Minor digits handled
□ Rounding handled by domain
□ Formatting separate from conversion
□ Currency does not change with locale
```

---

# 338. Number Checklist

```text
□ Numeric value stored semantically
□ Locale-aware display
□ Decimal separator
□ Grouping
□ Percentage semantics
□ Parsing strategy
□ No manual string formatting
```

---

# 339. RTL Checklist

```text
□ Document direction
□ Language metadata
□ Logical CSS properties
□ Leading/trailing semantics
□ Directional icons
□ Mixed-direction content
□ User text isolated
□ DOM order accessible
□ Forms
□ Tables
□ Dialogs
□ Navigation
```

---

# 340. Layout Expansion Checklist

```text
□ No English-specific fixed widths
□ Buttons expand
□ Labels wrap
□ Tabs remain usable
□ Tables remain readable
□ Dialog actions fit
□ Toasts fit
□ Long words handled
□ Pseudo-locale passes
```

---

# 341. Fallback Checklist

```text
□ Explicit user locale
□ Locale canonicalized
□ Supported locale lookup
□ Parent-language fallback
□ Final fallback
□ Missing key observable
□ Critical flows translated
□ No raw keys exposed
```

---

# 342. Definition of Done — New User-Facing Feature

A localized user-facing feature is ready when:

```text
✓ No hard-coded translatable strings
✓ Semantic translation keys
✓ Complete messages
✓ Placeholder schema
✓ Pluralization correct
✓ Dates locale/timezone safe
✓ Numbers locale-safe
✓ Currency semantics correct
✓ Layout supports expansion
✓ RTL reviewed if supported
✓ Pseudo-localization passes
✓ Accessibility remains correct
✓ Translation coverage meets release policy
```

---

# 343. Definition of Done — New Locale

A locale is ready for supported release when:

```text
✓ Canonical BCP 47 identifier
✓ Locale registry entry
✓ Direction known
✓ Fallback configured
✓ Core translations complete
✓ Authentication/recovery localized
✓ Billing/legal critical flows reviewed
✓ Date/time/number/currency verified
✓ Font coverage verified
✓ Layout reviewed
✓ RTL fully reviewed if applicable
✓ Search behavior validated
✓ Notifications localized
✓ QA completed
```

---

# 344. Definition of Done — RTL Support

```text
✓ Base direction correct
✓ CSS logical properties
✓ Navigation mirrors appropriately
✓ Icons reviewed
✓ Mixed bidi content isolated
✓ Forms work
✓ Tables work
✓ Modals work
✓ Charts reviewed
✓ Keyboard/focus order logical
✓ Screen reader semantics unaffected
✓ Visual regression passes
```

---

# 345. Internationalization Anti-Patterns

Avoid:

```text
language = country
```

Avoid:

```text
locale = timezone
```

Avoid:

```text
locale = currency
```

Avoid:

```text
flag icon = language
```

Avoid:

```text
en_US
```

as the public canonical locale format when BCP 47 is expected.

Avoid:

```text
Accept-Language forever overrides user's saved choice
```

Avoid:

```text
if locale === "ar"
  direction = rtl
```

scattered throughout components.

Avoid:

```text
"Hello " + name + ", you have " + count + " files"
```

Avoid:

```text
count === 1
```

as universal pluralization.

Avoid:

```text
one translation key reused for semantically different "Open" strings
```

Avoid:

```text
translation key generated from arbitrary backend value
```

Avoid:

```text
1,234.56
```

hard-coded as universal number formatting.

Avoid:

```text
$100
```

without known currency.

Avoid:

```text
locale changed
→ transaction currency changed
```

Avoid:

```text
03/04/2026
```

where ambiguity matters.

Avoid:

```text
birthday = midnight UTC
```

Avoid:

```text
timezone = UTC+8
```

for civil-time scheduling.

Avoid:

```text
timezone = CST
```

as authoritative identity.

Avoid:

```text
DST rules hard-coded manually
```

Avoid:

```text
weekly meeting converted once to UTC forever
```

Avoid:

```text
all week starts Monday
```

Avoid:

```text
all weekends Saturday/Sunday
```

where business logic is international.

Avoid:

```text
first_name required
last_name required
```

for every human identity without business reason.

Avoid:

```text
ASCII-only names
```

Avoid:

```text
US-style address required globally
```

Avoid:

```text
strings.sort()
```

for locale-sensitive human alphabetical order.

Avoid:

```text
margin-left
padding-right
```

for components that need natural RTL mirroring.

Avoid:

```text
reverse DOM order for RTL
```

without accessibility review.

Avoid:

```text
user-supplied RTL text inserted inline without isolation
```

Avoid:

```text
all icons mirror in RTL
```

Avoid:

```text
button width = 96px
```

because English copy fits.

Avoid:

```text
truncate translation until layout works
```

as the default solution.

Avoid:

```text
English screenshots only
```

as localization QA.

Avoid:

```text
translation complete because every key has a value
```

without linguistic/context review.

Avoid:

```text
machine translation automatically published for legal text
```

Avoid:

```text
send customer text to translation vendor
```

without data governance.

Avoid:

```text
API returns locale-formatted money string only
```

for domain data.

Avoid:

```text
logs localized based on operator language
```

at storage time.

Avoid:

```text
CDN key ignores locale
```

while output is localized.

Avoid:

```text
SSR renders server timezone
client renders user timezone
```

without intentional hydration strategy.

Avoid:

```text
font supports English
therefore locale supported
```

Avoid:

```text
uppercase CSS everywhere
```

without language testing.

---

# 346. AI Internationalization Rules

AI coding agents MUST distinguish:

```text
language
locale
region
timezone
currency
direction
```

rather than conflating them.

---

# 347. AI Locale Rule

AI SHOULD use canonical BCP 47 language tags.

---

# 348. AI Translation-Key Rule

AI SHOULD create semantic stable translation keys following the repository's established namespace.

---

# 349. AI Hard-Coded-Text Rule

AI MUST NOT add new translatable user-facing text outside the approved localization mechanism.

---

# 350. AI Fragment Rule

AI MUST NOT construct localized sentences from independently translated fragments.

---

# 351. AI Placeholder Rule

AI SHOULD use descriptive typed placeholders.

---

# 352. AI Plural Rule

AI MUST NOT implement pluralization using English-only:

```text
count === 1
```

logic.

---

# 353. AI Number Rule

AI MUST use locale-aware number formatting for user-visible numbers.

---

# 354. AI Currency Rule

AI MUST preserve:

```text
amount
+
currency
```

as separate business data.

---

# 355. AI Currency-Conversion Rule

AI MUST NOT confuse formatting with foreign-exchange conversion.

---

# 356. AI Date Rule

AI MUST distinguish date-only values from timestamps.

---

# 357. AI Timezone Rule

AI SHOULD use IANA timezone IDs for civil-time logic.

---

# 358. AI Offset Rule

AI MUST NOT replace named timezone semantics with fixed UTC offsets where DST/legal changes matter.

---

# 359. AI Recurrence Rule

AI SHOULD store recurring local schedules with their named timezone.

---

# 360. AI DST Rule

AI MUST consider nonexistent and repeated local times for timezone-aware scheduling.

---

# 361. AI RTL Rule

AI SHOULD use logical layout properties/components rather than adding one-off RTL overrides.

---

# 362. AI Bidi Rule

AI SHOULD isolate user-generated directional text where mixed-script layout may become ambiguous.

---

# 363. AI Layout Rule

AI MUST NOT design component width solely around source-language text.

---

# 364. AI Pseudo-Locale Rule

AI SHOULD preserve/extend pseudo-localization tests where available.

---

# 365. AI Sorting Rule

AI MUST use locale-aware collation where the requirement is human language sorting.

---

# 366. AI Name Rule

AI MUST NOT assume every person's identity consists of exactly first name + last name.

---

# 367. AI Address Rule

AI MUST NOT impose a universal US-style address schema without domain requirements.

---

# 368. AI Locale-Detection Rule

AI MUST respect explicit saved user locale over automatic browser detection.

---

# 369. AI Fallback Rule

AI MUST preserve deterministic locale fallback behavior.

---

# 370. AI API Rule

AI SHOULD keep semantic values locale-neutral at domain/API boundaries and localize at presentation boundaries unless architecture intentionally specifies otherwise.

---

# 371. AI Cache Rule

AI MUST include locale among cache-key dimensions whenever locale changes output.

---

# 372. AI Notification Rule

AI SHOULD render notifications using the recipient's intended locale/timezone.

---

# 373. AI Translation Privacy Rule

AI MUST NOT send private/customer text to external translation/LLM services without approved data governance.

---

# 374. AI Gold Rule

When uncertain:

```text
Semantic data
>
Localized display string
```

```text
Explicit user preference
>
Inferred preference
```

```text
Locale-aware library
>
Hand-written formatting rules
```

```text
Complete translatable message
>
Concatenated fragments
```

```text
Flexible logical layout
>
English-sized fixed layout
```

---

# 375. Golden Internationalization Rules

**1. Internationalization is an architectural requirement, not a translation afterthought.**

**2. Language, script, region, locale, timezone, currency, and direction are separate concepts.**

**3. One of those concepts is not inferred from another unless it is merely an explicit, overridable default.**

**4. Application language tags use canonical BCP 47 identifiers.**

**5. Explicit user locale preference overrides automatic language detection.**

**6. Every supported locale has a deterministic fallback path.**

**7. Missing translations do not expose raw translation keys to users.**

**8. UTF-8/Unicode is the default text model throughout the stack.**

**9. User-perceived characters are not assumed to equal bytes or code units.**

**10. Unicode normalization and case conversion use trusted Unicode-aware libraries.**

**11. User-facing strings use stable semantic translation keys.**

**12. Identical source-language words may require separate keys when meaning differs.**

**13. Full messages are translated as grammatical units.**

**14. Sentences are not built through concatenated translated fragments.**

**15. Placeholders have meaningful names and validated schemas.**

**16. Dynamic values are escaped according to rendering context.**

**17. Pluralization follows locale-specific plural rules.**

**18. English singular/plural logic is never assumed globally.**

**19. Ordinals and grammatical selection are locale-aware.**

**20. User-visible numbers use locale-aware formatting.**

**21. Localized formatted strings are presentation, not authoritative numeric data.**

**22. Monetary state always includes an explicit currency.**

**23. Changing locale never silently changes transaction currency.**

**24. Currency formatting is distinct from currency conversion.**

**25. Dates, times, instants, and recurring local schedules use different semantic types where required.**

**26. Date-only values remain date-only.**

**27. Instants are stored/transmitted unambiguously.**

**28. Named civil timezones use IANA timezone identifiers.**

**29. Fixed UTC offsets are not substitutes for real timezones when civil-time rules matter.**

**30. Timezone abbreviations are not authoritative identifiers.**

**31. Timezone data is maintained because government rules change.**

**32. Recurring local schedules retain their timezone rather than permanently converting once to UTC.**

**33. DST gaps and overlaps are handled explicitly.**

**34. User-visible date and time formatting uses locale-aware libraries.**

**35. Ambiguous numeric dates are avoided where interpretation matters.**

**36. The first day of week and other calendar conventions are not hard-coded globally.**

**37. Human names support international structures and scripts.**

**38. Postal-address forms do not assume one country's schema globally.**

**39. Human-language sorting uses locale-aware collation.**

**40. Search analysis is language-aware where search quality depends on language.**

**41. RTL support is structural, not a collection of one-off right-alignment patches.**

**42. Web RTL pages declare semantic base direction.**

**43. Language metadata and direction metadata remain separate.**

**44. Layout code prefers logical start/end properties to physical left/right semantics.**

**45. Directional icons are reviewed individually rather than all mirrored blindly.**

**46. DOM/source order remains logical and accessible.**

**47. Mixed LTR/RTL user content is properly isolated.**

**48. Directional control characters and Unicode confusables receive security consideration.**

**49. Layouts tolerate meaningful translation expansion.**

**50. Fixed dimensions are not chosen solely because English text fits.**

**51. Important action text is not truncated merely to preserve an English-designed layout.**

**52. Pseudo-localization is part of normal internationalization testing.**

**53. RTL pseudo-localization/testing exists where RTL support is claimed.**

**54. Translation workflows provide context, terminology, placeholders, and visual information.**

**55. Translation completeness alone does not prove linguistic quality.**

**56. Legal/high-risk text receives appropriate localization review.**

**57. Private content is not sent to external translation systems without approved data governance.**

**58. Supported scripts have adequate font coverage.**

**59. Typography does not assume Latin-script metrics or spacing behavior.**

**60. APIs prefer semantic raw values over presentation-localized strings.**

**61. Error codes remain machine-stable even when display messages are localized.**

**62. Logs and metrics remain machine-consistent rather than locale-formatted at storage time.**

**63. Locale-sensitive output includes locale in relevant cache semantics.**

**64. SSR and client rendering use compatible locale/timezone context.**

**65. Authentication, account recovery, billing, legal, and other critical flows meet stronger translation coverage standards.**

**66. Localization tests include numbers, currencies, plurals, timezone boundaries, DST, RTL, Unicode, and expansion.**

**67. Translation catalogs are validated for missing keys, invalid syntax, and placeholder mismatches.**

**68. Every new locale has explicit ownership, fallback, direction, formatting verification, font coverage, and QA.**

**69. Localized content remains accessible.**

**70. If engineers cannot independently answer a user's language, locale, timezone, currency, and text direction, the internationalization model is under-specified.**

---

# 376. Canonical Internationalization Standard

The organizational standard is:

> **Internationalization is a foundational application capability rather than a post-development translation step. Systems model language, script, region, locale, timezone, currency, calendar context, and text direction as distinct concerns; persist explicit user and business preferences where required; and use standardized locale identifiers, Unicode text, CLDR-backed formatting data, IANA timezones, and locale-aware platform APIs instead of hand-built cultural assumptions.**

> **All translatable product copy is authored as meaningful complete messages with stable semantic keys, translator context, typed placeholders, and locale-aware grammatical selection. User-facing sentences are not assembled from individually translated fragments, plural rules are not reduced to English singular-versus-plural logic, and translation tooling validates missing keys, placeholders, message syntax, and required forms before release.**

> **Semantic application data remains locale-neutral until presentation. Numeric values remain numeric, money is represented as amount plus explicit currency, transaction currency is independent of UI language, and formatting never masquerades as currency conversion. Dates, local dates, times, instants, durations, and recurring zoned schedules are represented according to their actual temporal semantics, with IANA timezone identities retained whenever civil-time rules matter.**

> **Presentation uses locale-aware libraries for numbers, currencies, percentages, units, dates, relative time, pluralization, collation, and other locale-sensitive output. Timezone data is maintained as changing reference data, daylight-saving gaps and repeated local times are explicit scheduling cases, and recurring local events preserve their named timezone rather than relying on permanently hard-coded UTC offsets.**

> **Layout is designed for linguistic variability. Components use flexible sizing and logical start/end geometry, tolerate significant text expansion and different word-breaking behaviors, support target-script font metrics, and do not truncate or distort important translated content simply to preserve source-language dimensions. Pseudo-localization and representative locale visual testing detect hard-coded strings, expansion failures, encoding issues, and untranslated copy before production.**

> **Right-to-left support is treated as a complete directionality mode. Supported RTL interfaces declare appropriate language and base direction, use logical CSS/layout semantics, preserve accessible source order, review icon mirroring semantically, and isolate mixed-direction user content such as names, URLs, email addresses, codes, and numbers. Direction metadata remains distinct from language metadata, and Unicode bidirectional behavior is considered in security-sensitive identifiers and filenames.**

> **Localization is governed through explicit supported-locale and fallback registries. A saved user preference wins over automatic browser inference, fallback chains are deterministic, missing translations are observable, and critical user journeys have defined translation-completeness gates. New locales are not considered production-supported until core UI, authentication, recovery, billing/legal requirements where relevant, formatting, typography, notifications, search, accessibility, RTL behavior when applicable, and QA meet the defined support standard.**

> **Internationalization extends across subsystem boundaries. Search preserves content-language metadata and locale-aware analysis, notification delivery renders in the recipient's intended locale and timezone, APIs keep domain values machine-stable, caching separates locale-specific representations, analytics uses canonical nonlocalized event schemas, documents/exports support target scripts, and privacy/legal records preserve locale/version when proving what content a user received or accepted matters.**

A production-grade internationalization architecture should make it easy to answer:

```text
What language does this user prefer?
What exact locale is active?
What is the user's timezone?
What currency does this business object use?
What script/direction does this content require?
Which supported locale does this BCP 47 tag resolve to?
What is the fallback chain?
Which locale is the final fallback?
Which translation key owns this message?
Are its placeholders typed and validated?
How does this message pluralize in Arabic, Polish, or another complex locale?
How are numbers formatted?
How are currencies formatted?
Is money formatting being confused with FX conversion?
Is this value a date, instant, or local zoned time?
Which IANA timezone controls this schedule?
What happens across a DST transition?
How does an RTL version of this page behave?
Can mixed RTL/LTR user text corrupt visual ordering?
Can this button survive substantial translation expansion?
Does the selected font support every required script?
How is human sorting performed?
How does Search know the content language?
How does a notification determine recipient locale and timezone?
Does SSR render with the same locale context as the client?
Can a CDN cache return another locale's representation?
Which translation keys are missing?
Which supported locales are below required completion?
Can pseudo-localization and RTL testing run in CI?
```

If those questions cannot be answered reliably, the product has translations but does not yet have a production-grade internationalization architecture.

For the canonical technical baseline, use **BCP 47** for language/locale tags and Unicode **CLDR** as the locale-data foundation. As of **23 September 2026**, CLDR **48.2** is the latest stable release; CLDR 49 is still pre-release/alpha. ICU's message-format guidance also explicitly recommends complete messages with movable placeholders and locale plural/select rules rather than concatenating fragments. citeturn759208search0turn956266search2turn956266search1turn956266search7

Timezone handling should follow the **IANA Time Zone Database**, not hand-maintained offsets or DST tables. The current release is **tzdb 2026d**, published September 11, 2026; its release itself contains changed civil-time rules, illustrating why timezone data must be treated as updateable reference data. citeturn759208search2turn759208search10

For RTL, W3C guidance recommends Unicode/UTF-8, semantic base direction such as `dir="rtl"` on the HTML root, and proper bidi handling rather than using CSS alignment as a substitute for directionality. It also notes that direction is fundamentally a property of script/content and should not simply be inferred from language everywhere. citeturn759208search4turn759208search5

Canonical master placement is now:

**… → File & Media → Search → Notifications → Internationalization → Content & UX Writing → Testing → Performance → Observability → Analytics → Privacy & Data Governance → …**
