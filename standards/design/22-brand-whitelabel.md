---
id: "brand-whitelabel"
title: "Brand & White-label Application"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "brand", "white", "label", "application"]
applies_to: ["ui"]
related: ["accessibility"]
legacy_number: 102
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 56361
provenance: baseline

---

Research completed with Firecrawl against current W3C/WAI, shadcn/ui, Apple HIG, OWASP, Mapbox, web.dev, and related primary guidance. The specification below distinguishes sourced platform/accessibility constraints from the **canonical internal brand rules**—such as clear-space ratios and placement dimensions—which are deliberately defined here rather than presented as universal industry rules.

# Brand & White-label Application — Gold Standard 2026

**Status:** Canonical production standard  
**Baseline:** React + Tailwind CSS + shadcn/ui  
**Applies to:** multi-tenant SaaS, OEM deployments, partner-branded applications, custom domains, transactional email, generated documents, map/geospatial products  
**Conformance language:** **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, **MAY**

---

# 1. Purpose

This standard defines how a production application incorporates first-party, tenant, client and partner brands without weakening usability, accessibility, security, component consistency, data integrity, attribution requirements or operational reliability.

White-label capability MUST be implemented as a **controlled semantic theme system**, not arbitrary tenant-controlled CSS.

A tenant MAY alter approved presentation properties such as logo assets, brand colour seeds, selected typography, imagery, product naming, verified domains, verified email identity and document branding. A tenant MUST NOT alter interaction semantics, accessibility guarantees, form behaviour, security controls, provider attribution, structural application architecture or core component behaviour.

shadcn/ui establishes the implementation baseline: components consume semantic variables such as `background`, `foreground`, `primary`, `primary-foreground`, `muted`, `border`, `input`, `ring` and chart/sidebar roles. Its documented model changes the values behind these variables rather than rewriting component classes. (https://ui.shadcn.com/docs/theming)

WCAG 2.2 remains invariant under tenant branding. Normal text requires at least 4.5:1 contrast at AA; important non-text UI information requires at least 3:1; colour cannot be the sole carrier of meaning; keyboard focus must remain visible; text must resize to 200%; and responsive reflow must preserve content and functionality. (https://www.w3.org/TR/WCAG22/)

Uploaded branding assets are untrusted input. OWASP recommends allowlisting necessary extensions, validating content rather than trusting declared MIME type, constraining size and filenames, authorising uploads, using separated storage, and applying antivirus/sandbox or content-disarm processing where appropriate. (https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)

---

# 2. Rules — Brand Architecture

## 2.1 Brand layers

The system MUST distinguish:

```text
Platform brand
Tenant/client brand
Partner/co-brand
Third-party provider attribution
```

These are not interchangeable.

**Platform brand** identifies the product vendor or platform.

**Tenant brand** identifies the organisation whose users experience a white-labelled tenant.

**Partner/co-brand** identifies a commercially or operationally associated organisation.

**Provider attribution** identifies required technology/data providers and MUST NOT be treated as optional branding.

The visual hierarchy MUST be resolved by the tenant's contractual branding mode before rendering.

Canonical modes:

```text
platform-led
client-led
co-branded
endorsed
unbranded-oem
```

`unbranded-oem` means platform branding is omitted where contractually permitted; it MUST NOT suppress mandatory legal, copyright, map, data-provider or accessibility information.

---

# 3. Rules — Logo System

## 3.1 Required logo family

Every approved brand MUST supply or derive the following identities:

| Asset | Purpose |
|---|---|
| Primary mark | Preferred horizontal symbol + wordmark |
| Secondary mark | Stacked or compact alternative |
| Monogram / symbol | Small spaces, collapsed navigation, app icons |
| Light variant | Dark surfaces |
| Dark variant | Light surfaces |
| Single-colour variant | Print, constrained reproduction |
| Favicon mark | Very small browser contexts |
| App/PWA artwork | Installable-app contexts |
| Email-safe mark | Raster fallback for email clients |

A logo upload MUST NOT become the only source asset for every context without review.

If a full wordmark cannot remain recognizable at the required small size, the product MUST switch to the approved monogram or symbol.

Apple's app-icon guidance similarly prioritises simple, recognisable artwork because fine details become difficult to discern at small sizes, and recommends visual consistency across platforms. Apple also advises against unnecessary text inside app icons because it is difficult to read and does not adapt well to localisation. (https://developer.apple.com/design/human-interface-guidelines/app-icons)

---

## 3.2 Clear-space rule

The following is the **canonical system rule**.

Define `x` as the shorter dimension of the primary symbol's optical bounding box.

Minimum clear space around an isolated mark:

```text
0.25 × x
```

Minimum clear space between the brand mark and unrelated UI content:

```text
max(0.25 × x, 8 CSS px)
```

For co-brand lockups:

```text
logo clear space + divider gap + partner clear space
```

MUST be preserved independently for each mark.

Nothing MAY enter this exclusion zone except an approved lockup element.

---

## 3.3 Minimum digital sizes

These are canonical production minimums, not universal trademark rules. A brand's own official guidelines override them where stricter.

| Asset | Minimum |
|---|---:|
| Horizontal wordmark | 96 CSS px wide |
| Horizontal mark height | 20 CSS px |
| Compact/stacked mark | 64 CSS px wide |
| Monogram/symbol | 16 × 16 CSS px |
| Preferred monogram UI size | ≥20 × 20 CSS px |
| Login mark | 32 CSS px high |
| Splash mark | 48 CSS px high |
| Email wordmark | 120 CSS px wide recommended |

A mark MUST switch to its compact or monogram variant before it becomes visually illegible.

The logo MAY exceed these values where visual hierarchy requires it.

---

# 4. Rules — Logo Placement in Application Surfaces

## 4.1 App header

For a horizontal app header:

```text
preferred logo height: 24–28px
maximum routine height: 32px
```

The mark MUST remain vertically centred with the header's control system.

It MUST NOT force application navigation into a taller header merely to accommodate a tenant's unusually tall logo.

The brand area MUST use a bounded container; uploaded artwork MUST use:

```css
object-fit: contain;
max-inline-size: 100%;
max-block-size: 100%;
```

---

## 4.2 Sidebar

Expanded sidebar:

```text
primary or compact mark
preferred height: 24–28px
```

Collapsed sidebar:

```text
monogram/symbol only
preferred box: 24 × 24px
```

A full wordmark MUST NOT be squeezed into a collapsed sidebar.

---

## 4.3 Login / authentication

The login screen MAY give the tenant logo stronger prominence:

```text
32–48px high
maximum width: 240px
```

Authentication functionality MUST remain visually identifiable independently of brand decoration.

Error states, password visibility controls, MFA interactions, security notices and recovery actions MUST remain controlled by the platform's Forms, Security and Accessibility standards.

---

## 4.4 Splash/loading screen

Splash screens SHOULD prefer the monogram or compact mark.

The application MUST NOT introduce extended splash duration merely for brand exposure.

Where loading time is material, progress state SHOULD replace static branding.

---

## 4.5 Favicon

Favicons MUST use a simplified symbol or monogram.

A full company wordmark MUST NOT be compressed into a 16px favicon.

The asset pipeline SHOULD generate at minimum:

```text
16×16
32×32
48×48
```

plus the platform-specific formats required by the application.

---

## 4.6 PWA icons

Installable web applications MUST provide dedicated app-icon artwork rather than automatically padding the header wordmark.

A maskable PWA icon SHOULD use a 512×512 or larger source and keep essential artwork inside the documented maskable safe zone, a circle centred in the icon with a radius of 40% of icon width. web.dev recommends maskable artwork of at least 512×512. (https://web.dev/learn/pwa/web-app-manifest)

Example:

```json
{
  "icons": [
    {
      "src": "/brand/icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    },
    {
      "src": "/brand/icon-512-maskable.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "maskable"
    }
  ]
}
```

Apple likewise recommends simplified, consistent app-icon artwork and currently specifies a 1024×1024 layout size for iOS, iPadOS and macOS app-icon source artwork. (https://developer.apple.com/design/human-interface-guidelines/app-icons)

---

## 4.7 Email

Transactional email SHOULD use the approved horizontal mark or compact logo.

Recommended display bounds:

```text
width: 120–180px
height: ≤40px
```

Email branding MUST survive:

```text
images disabled
light mode
dark mode
high-DPI rendering
forwarding
plain-text fallback
```

The email's sender identity MUST NOT rely solely on a visual logo.

---

## 4.8 PDF and exported documents

Generated PDFs MAY use a larger logo than application chrome.

Brand marks SHOULD appear in:

```text
cover/header
footer where required
document metadata where supported
```

Branding MUST NOT obscure:

```text
page numbers
legal notices
data-provider credits
map attribution
document title
critical data
```

The system MUST retain a printable monochrome fallback.

---

# 5. Rules — Logo Misuse Catalogue

A production implementation MUST prevent or reject the following:

| Prohibited use | Reason |
|---|---|
| Stretching or non-uniform scaling | Distorts the mark |
| Cropping the approved lockup | Changes identity |
| Rebuilding the wordmark in HTML text | Loses approved artwork |
| Rotating the logo | Changes intended presentation |
| Recolouring third-party logos without permission | Trademark/brand risk |
| Applying arbitrary gradients | Alters approved artwork |
| Heavy drop shadows, glow or bevels | Changes the mark |
| Placing on insufficient-contrast backgrounds | Reduces recognisability |
| Compressing a full wordmark into favicon size | Illegible |
| Adding product slogans inside the logo asset | Creates uncontrolled lockups |
| Placing UI badges over the logo | Pollutes identity |
| Animating the logo continuously | Distracting; may create accessibility risk |
| Using raster screenshots of a logo | Poor scalability |
| Uploading remote hot-linked logos | Security/reliability risk |
| Removing required provider marks from maps | Licensing/attribution breach |

Logo artwork MUST be treated as a managed asset rather than arbitrary page content.

---

# 6. Rules — Lockups and Co-branding

## 6.1 Approved arrangements

Co-branding MUST use one of four explicit arrangements.

### Platform-led

```text
[Platform logo] | [Client/partner logo]
```

The platform mark has primary hierarchy.

### Client-led

```text
[Client logo] | [Platform mark]
```

The client mark leads.

### Endorsed

```text
[Client logo]
Powered by Platform
```

### OEM / concealed platform identity

```text
[Client logo]
```

Only contractual branding is removed. Mandatory provider attribution, copyright, privacy, terms and regulatory information remain.

---

## 6.2 Divider

A two-logo lockup SHOULD use a divider when the marks would otherwise read as one composite trademark.

Canonical divider:

```css
width: 1px;
height: 60%;
background: var(--border);
```

Horizontal gap:

```text
12–20px each side
```

The divider MUST be visually subordinate to both marks.

---

## 6.3 Optical hierarchy

Logos SHOULD be balanced by **optical area**, not identical bounding-box width.

A very wide wordmark and square partner icon MUST NOT simply receive equal CSS width.

Recommended starting point:

```text
lead mark optical height: 24px
secondary mark optical height: 80–100% of lead
```

Where the client brand leads, the platform mark SHOULD NOT visually exceed the client's mark unless contractual guidance explicitly requires equal hierarchy.

---

## 6.4 Endorsement lines

Approved forms MAY include:

```text
Powered by <Platform>
Technology by <Platform>
In partnership with <Partner>
A service from <Organisation>
```

The exact language MUST come from the commercial/legal brand contract.

Endorsement lines SHOULD use text rather than creating a new rasterised combination logo.

They MUST retain readable contrast and MUST NOT be rendered as images of text unless the typography itself is essential to the mark. WCAG generally requires real text rather than images of text where the presentation is not essential. (https://www.w3.org/TR/WCAG22/)

---

## 6.5 Multi-partner lockups

More than two partner logos SHOULD NOT be placed permanently in application chrome.

For three or more organisations, prefer:

```text
lead logo
+
textual partnership statement
+
dedicated credits/about surface
```

This prevents application navigation from becoming an advertising strip.

---

# 7. Rules — White-label Architecture

## 7.1 Theming boundary

The white-label layer MUST change appearance and approved identity only.

### Themable

| Area | Tenant control |
|---|---|
| Primary logo | Yes |
| Compact logo / monogram | Yes |
| Light/dark logo variants | Yes |
| App/PWA artwork | Yes |
| Brand colour seeds | Yes |
| Selected typography | Yes, approved fonts only |
| Marketing/login imagery | Yes |
| Product display name | Yes |
| Approved copy slots | Yes |
| Custom app domain | Yes, verified |
| Email sender name | Yes |
| Email sender domain | Yes, verified/authenticated |
| Email logo/accent | Yes |
| PDF/document identity | Yes |
| PDF cover imagery | Yes |
| Map overlay brand accents | Yes, where data semantics permit |
| Optional partner lockup | Yes, approved |

### Immutable

| Area | Tenant control |
|---|---|
| Component interaction behaviour | **No** |
| DOM/semantic structure | **No** |
| Keyboard navigation | **No** |
| Focus behaviour | **No** |
| Accessibility thresholds | **No** |
| Minimum touch/target dimensions | **No** |
| Form validation semantics | **No** |
| Error/success meaning | **No** |
| Authentication/security behaviour | **No** |
| Destructive-action safeguards | **No** |
| Core structural layout | **No** |
| API contracts | **No** |
| Data model | **No** |
| Tenant isolation | **No** |
| Map provider attribution | **No** |
| Required legal/regulatory copy | **No** |
| Telemetry/security notices | **No** |
| Core state-machine behaviour | **No** |

shadcn's semantic theme model supports precisely this separation: component behaviour remains stable while theme variables change. (https://ui.shadcn.com/docs/theming)

---

## 7.2 Theme precedence

Resolution MUST occur in this order:

```text
1. Design-system primitives
2. Design-system semantic defaults
3. Tenant approved brand seeds/assets
4. Derived accessible tenant semantic tokens
5. Light/dark mode
6. User accessibility preferences
7. Forced-colours/high-contrast environment
```

A tenant value MUST NOT override layers 6 or 7.

---

## 7.3 No arbitrary CSS

Tenant configuration MUST NOT accept:

```text
raw CSS
<style> blocks
arbitrary Tailwind classes
JavaScript
inline event handlers
raw HTML
remote CSS imports
arbitrary @font-face declarations
```

Brand configuration MUST consist of typed values and asset references.

Unknown theme properties MUST fail schema validation.

---

## 7.4 No arbitrary component replacement

A tenant MUST NOT supply its own implementations of:

```text
Button
Input
Select
Dialog
AlertDialog
Toast
Form validation
Authentication controls
Navigation primitives
Focus indicators
Consent/security UI
```

A tenant MAY influence approved tokens used by those components.

---

# 8. Rules — Arbitrary Tenant Colour Safety

## 8.1 Tenant colours are seeds

Tenant administrators MUST provide **brand seed colours**, not final semantic colours.

Allowed:

```json
{
  "primary": "#0057B8",
  "secondary": "#F2A900"
}
```

Not allowed:

```json
{
  "buttonText": "#777777",
  "focusRing": "#AAAAAA",
  "errorText": "#F8D7DA"
}
```

The design system, not the tenant, resolves semantic roles.

---

## 8.2 Contrast requirements

Resolved tenant themes MUST meet at minimum:

| Pairing | Required contrast |
|---|---:|
| Normal text / surface | 4.5:1 |
| Large text / surface | 3:1 |
| Essential UI/graphic boundaries | 3:1 |
| Required focus treatment | 3:1 Gold Standard target |
| Button text / button background | 4.5:1 |
| Link text / page background | 4.5:1 for normal text |

WCAG 2.2 defines the 4.5:1 AA threshold for normal text, 3:1 for large text and 3:1 for required non-text UI/graphics. It also prohibits colour as the only means of conveying meaning. (https://www.w3.org/TR/WCAG22/)

---

## 8.3 Automatic colour resolution

The theme engine MUST perform the following pipeline.

```text
tenant seed
    ↓
parse + normalise
    ↓
sRGB → OKLCH
    ↓
generate tonal ramp
    ↓
gamut map
    ↓
test semantic pairings
    ↓
choose nearest passing tones
    ↓
fall back to system-safe roles if necessary
```

Brand seed colours MAY remain exact for decorative/logo contexts.

Interactive colours MUST use the generated accessible semantic equivalent.

---

## 8.4 Canonical fallback ramp

A seed MAY generate approximately:

```text
50   L≈0.97
100  L≈0.93
200  L≈0.87
300  L≈0.78
400  L≈0.69
500  L≈0.61
600  L≈0.53
700  L≈0.45
800  L≈0.36
900  L≈0.28
950  L≈0.20
```

Hue SHOULD remain recognisably related to the tenant seed.

Chroma MAY be reduced near the light and dark ends to maintain valid gamut and usable contrast.

The engine MUST validate the final rendered sRGB values; perceptual colour spaces do not replace WCAG contrast testing.

---

## 8.5 Foreground selection

For a branded filled surface:

```ts
const candidateForegrounds = [
  "#ffffff",
  "#0b0c0c"
]

const foreground = candidateForegrounds
  .map(color => ({
    color,
    ratio: contrast(color, resolvedBackground)
  }))
  .sort((a, b) => b.ratio - a.ratio)[0]
```

The selected pairing MUST still satisfy the role's threshold.

---

## 8.6 Nearest accessible variant

Example strategy:

```ts
function resolveInteractiveColor(seed: Oklch, surface: RGB) {
  const ramp = generateBrandRamp(seed)

  const valid = ramp.filter(candidate =>
    contrast(bestForeground(candidate), candidate) >= 4.5 &&
    contrast(candidate, surface) >= 3
  )

  if (valid.length === 0) {
    return SYSTEM_INTERACTIVE_FALLBACK
  }

  return nearestToSeed(valid, seed)
}
```

Production implementations SHOULD additionally test hover, active, selected, disabled and dark-mode states.

---

## 8.7 Forbidden low-contrast colours

If no acceptable derived tone can represent a tenant colour without losing required semantics, that colour MUST NOT be used for the affected UI role.

The system MUST:

1. preserve the exact colour as a brand metadata/decorative value where safe;
2. use an accessible derived colour for interaction;
3. show administrators the resolved value in preview;
4. explain why the exact seed cannot be used for that role.

The system MUST NOT allow an administrator to bypass accessibility validation with a warning checkbox.

---

## 8.8 Immutable semantic colours

The tenant MUST NOT redefine the semantic meaning of:

```text
error
warning
success
information
focus
disabled
```

These MAY be visually harmonised within approved accessible bounds, but the platform MUST preserve their meaning and guarantees.

WCAG's use-of-colour requirement means these states also require non-colour cues where relevant. (https://www.w3.org/TR/WCAG22/)

---

# 9. Rules — Typography, Imagery and Copy

## 9.1 Typography

Tenant typography MAY be selected from:

```text
system-approved font catalogue
approved uploaded font package
platform fallback stack
```

Raw remote font URLs MUST NOT be accepted.

Uploaded fonts MUST include:

```text
licence confirmation
family name
supported weights
supported scripts/locales
WOFF2 assets
fallback family
```

The theme engine MUST fall back if required glyph/script coverage is absent.

A branded font MUST NOT override code/monospace typography or numerical data requirements where the component standard mandates specialised numeral behaviour.

---

## 9.2 Imagery

Tenant-controlled imagery MAY appear in:

```text
login
empty-state illustration slots
email headers
document covers
approved marketing surfaces
```

Tenant imagery MUST NOT be injected underneath arbitrary functional UI when it could make contrast unpredictable.

Text over tenant imagery MUST use a controlled solid or tested scrim/surface.

---

## 9.3 Copy

Copy theming MUST use an allowlisted set of slots.

Acceptable:

```text
productName
loginHeading
loginSubheading
supportLabel
legalOrganisationName
emailFooterOrganisation
documentFooterText
```

Core security, validation and system-status copy MUST remain system-owned.

For example, a tenant MAY rename the product but MUST NOT replace:

```text
"Your session has expired"
"Incorrect password"
"Delete this record?"
"Payment failed"
```

with arbitrary marketing copy.

Tenant copy MUST be stored as text or restricted structured rich text, never arbitrary executable HTML.

---

# 10. Rules — Domains and Email Identity

## 10.1 Custom application domains

A custom tenant domain MUST NOT become active until domain ownership has been verified.

The system MUST manage:

```text
TLS certificate issuance/renewal
host → tenant routing
canonical hostname
redirect behaviour
cookie scope
CSP/allowed origins
tenant isolation
rollback
```

A hostname MUST map to exactly one active tenant within an environment.

Tenant resolution MUST happen server-side or at a trusted edge boundary before tenant theme/data loading.

The platform MUST NOT trust an unvalidated `Host` value as an arbitrary tenant identifier.

---

## 10.2 Email sender

The following MAY be themed:

```text
From display name
verified From domain
Reply-To
logo
accent colour
footer organisation
```

The following MUST remain controlled by the mail platform:

```text
message signing
DKIM configuration
SPF integration
DMARC alignment
bounce handling
complaint handling
unsubscribe mechanisms where required
message IDs
transport security
```

The Gold Standard requires custom sender domains to be authenticated with SPF and DKIM and covered by a DMARC policy before production activation, irrespective of a provider's lower minimum for some sender volumes. Gmail's current sender guidance documents SPF/DKIM authentication and additional DMARC requirements for applicable senders. (https://support.google.com/mail/answer/81126)

An unverified client domain MUST NOT be placed in the `From:` identity.

A fallback MAY use:

```text
Client Name via Platform <notifications@platform-domain.example>
```

until custom sender verification is complete.

---

# 11. Rules — PDF and Document Templates

PDF branding MAY customise:

```text
logo
cover colour
approved typography
cover imagery
organisation identity
header/footer
support contact
brand-safe chart accents
```

PDF generation MUST retain platform-controlled:

```text
document structure
accessibility metadata where supported
data formatting
page numbering
legal notices
map/data attribution
security classification
document identifiers
```

Tenant PDF templates MUST be declarative.

They MUST NOT accept executable HTML/JavaScript or arbitrary server-side template code.

Templates SHOULD reference named slots:

```text
{{tenant.logo}}
{{document.title}}
{{document.date}}
{{document.content}}
{{required.attribution}}
```

rather than raw document fragments.

---

# 12. Rules — Asset Pipeline

## 12.1 Upload security

Every uploaded asset MUST be treated as untrusted.

OWASP recommends extension allowlisting, content validation rather than trusting `Content-Type`, file-signature checks, generated filenames, size limits, authorised upload access, isolated storage, malware scanning where available, and CSRF protection. (https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)

The branding pipeline MUST therefore use:

```text
authenticated upload
tenant authorization
extension allowlist
MIME validation
magic/signature validation
size limits
dimension limits
generated object keys
malware scan
sanitisation/transcoding
metadata stripping
quarantine before publication
```

---

## 12.2 Canonical accepted formats

### Logos

Preferred:

```text
SVG
PNG
```

Optional raster input:

```text
WebP
```

JPEG SHOULD NOT be used for transparent brand marks.

### Photography

```text
JPEG
WebP
AVIF
PNG where transparency is needed
```

### Fonts

```text
WOFF2
```

### Documents/templates

Only the formats explicitly supported by the document pipeline.

---

## 12.3 Upload limits

Canonical initial limits:

| Type | Maximum upload |
|---|---:|
| SVG logo | 1 MB |
| Raster logo | 2 MB |
| App icon master | 4 MB |
| Photography/hero image | 10 MB |
| WOFF2 font | 5 MB per file |
| Document template asset | 10 MB |

Higher limits require explicit product/security review.

---

## 12.4 SVG sanitisation

Tenant SVG MUST NOT be served directly from its original upload without sanitisation.

The pipeline MUST reject or remove:

```text
<script>
foreignObject
event-handler attributes
external network references
embedded HTML
remote fonts
javascript: URLs
external <use> references
SMIL animation
unexpected embedded raster data
CSS imports
```

References to internal SVG fragment IDs MAY be preserved after sanitisation.

Where safe sanitisation cannot be guaranteed, the application MUST rasterise the mark or reject it.

Uploaded brand content MUST NEVER become an XSS execution path.

---

## 12.5 Raster normalisation

Raster assets SHOULD be:

```text
decoded
validated
re-encoded
EXIF/metadata stripped
orientation normalised
colour-profile normalised where appropriate
```

Unneeded GPS or camera metadata MUST NOT be retained.

---

## 12.6 Responsive variants

The pipeline SHOULD generate:

```text
logo-light
logo-dark
logo-monochrome
logo-compact
favicon variants
PWA regular
PWA maskable
email PNG
1x raster
2x raster
document raster
```

For photography, generate responsive sizes appropriate to the application's image system.

---

## 12.7 Dark-mode logo handling

A tenant SHOULD upload explicit light- and dark-surface logo variants when the standard artwork does not work on both modes.

Fallback resolution:

```text
explicit mode variant
→ single-colour alternative
→ protected contrast plate
→ system text fallback
```

The application MUST NOT blindly `filter: invert()` a corporate logo.

---

# 13. Rules — CDN and Cache Invalidation

## 13.1 Immutable assets

Published assets MUST use content-addressed or version-addressed URLs.

Example:

```text
https://cdn.example.com/tenant/ten_abc123/logo/sha256-a1b2c3.svg
```

The same URL MUST NEVER represent different bytes.

Recommended caching:

```http
Cache-Control: public, max-age=31536000, immutable
```

for immutable public branding assets.

---

## 13.2 Theme manifest

The active theme SHOULD point to immutable assets:

```json
{
  "tenantId": "ten_abc123",
  "themeVersion": 42,
  "logo": "asset_4bf82d1d",
  "updatedAt": "2026-09-23T04:00:00Z"
}
```

A brand update publishes:

```text
new asset
→ new theme version
→ validation
→ activation
→ atomic manifest switch
```

rather than replacing an asset behind an existing CDN URL.

---

## 13.3 Rollback

At least the previous production-approved theme version MUST remain rollback-capable.

Theme activation MUST be atomic.

Partial rollout MUST NOT leave:

```text
new colour + old logo
new domain + old email identity
new light theme + missing dark assets
```

unless that mixed state was explicitly approved.

---

# 14. Rules — Brand Safety and Trademark Governance

## 14.1 Trademark authority

A tenant or administrator MUST have authority to use every logo uploaded for production.

The system SHOULD record:

```text
asset owner
source
approver
licence/permission reference
approval date
expiry date where applicable
```

Third-party trademarks MUST be used according to the current rights-holder guidelines and licence terms.

The platform MUST NOT automatically recolour, reshape, animate or combine third-party marks unless such treatment is authorised.

---

## 14.2 Source-of-truth assets

Partner logos SHOULD originate from:

```text
rights-holder brand portal
signed partner package
approved internal brand library
```

They SHOULD NOT be copied from:

```text
search-engine images
screenshots
social-media avatars
unverified SVG repositories
```

---

## 14.3 Trademark text

Trademark symbols such as `™` and `®` MUST be used only where instructed by brand/legal guidance.

They MUST NOT be automatically added by the design system.

---

# 15. Rules — Map and Geospatial Attribution

## 15.1 Attribution is immutable

White-labeling MUST NOT hide map-provider or data-provider attribution.

Attribution MUST be modelled outside tenant brand configuration:

```text
provider attribution
copyright notices
data source credits
licence links
```

are system/provider-controlled.

---

## 15.2 Mapbox example

Mapbox currently requires both logo and text attribution for maps that use Mapbox styles or data; custom styles or data hosted through Mapbox also require its logo. Its documentation states that required text attribution must remain legible and can include Mapbox, OpenStreetMap and other relevant providers. (https://docs.mapbox.com/help/dive-deeper/attribution/)

Therefore a tenant MUST NOT:

```text
hide the attribution control
cover it with its own logo
recolour the provider logo
clip it
reduce it below legibility
move it outside the rendered map/export
```

---

## 15.3 Provider stacking

When multiple providers contribute data, the system SHOULD render a dedicated attribution region rather than intermixing provider logos with the tenant's primary brand lockup.

Example:

```text
© Tenant Organisation
Map data © OpenStreetMap contributors
Maps © Mapbox
Imagery © Provider
```

The actual wording MUST come from current provider requirements.

---

## 15.4 Static maps and exports

Required map attribution MUST survive:

```text
PDF export
PNG export
print
email attachment
presentation export
report generation
```

Mapbox specifically documents attribution requirements for static and print maps, including textual attribution near the image. (https://docs.mapbox.com/help/dive-deeper/attribution/)

White-label document templates MUST reserve an immutable attribution slot when maps are present.

---

# 16. Rules — shadcn/ui Implementation

## 16.1 Semantic theme mapping

Tenant themes MUST map into the semantic shadcn contract.

```css
:root {
  --background: var(--tenant-surface-canvas);
  --foreground: var(--tenant-text-primary);

  --card: var(--tenant-surface-raised);
  --card-foreground: var(--tenant-text-primary);

  --popover: var(--tenant-surface-overlay);
  --popover-foreground: var(--tenant-text-primary);

  --primary: var(--tenant-interactive-primary);
  --primary-foreground: var(--tenant-on-primary);

  --secondary: var(--tenant-interactive-secondary);
  --secondary-foreground: var(--tenant-on-secondary);

  --muted: var(--tenant-surface-muted);
  --muted-foreground: var(--tenant-text-muted);

  --accent: var(--tenant-interactive-accent);
  --accent-foreground: var(--tenant-on-accent);

  --destructive: var(--system-destructive);

  --border: var(--tenant-border);
  --input: var(--tenant-input-border);
  --ring: var(--system-or-resolved-focus-ring);

  --chart-1: var(--resolved-chart-1);
  --chart-2: var(--resolved-chart-2);
  --chart-3: var(--resolved-chart-3);
  --chart-4: var(--resolved-chart-4);
  --chart-5: var(--resolved-chart-5);
}
```

shadcn explicitly documents semantic background/foreground pairs and dark-mode token replacement. (https://ui.shadcn.com/docs/theming)

---

## 16.2 Dark mode

Dark mode MUST resolve independently.

It MUST NOT be generated with:

```css
filter: invert(1);
```

or a primitive ramp reversal.

The system MUST independently test:

```text
tenant brand
text
buttons
focus
borders
logos
charts
maps
status UI
```

against dark surfaces.

---

# 17. Per-Tenant Theme Contract

The tenant theme contract MUST be schema-validated before persistence and again before activation.

It MUST reject undeclared properties.

Canonical JSON Schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.example.com/tenant-theme.schema.json",
  "title": "Tenant Theme Contract",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "schemaVersion",
    "tenantId",
    "version",
    "status",
    "brandingMode",
    "brand",
    "assets",
    "color",
    "typography",
    "copy",
    "domains",
    "email",
    "documents"
  ],
  "properties": {
    "schemaVersion": {
      "const": "1.0"
    },

    "tenantId": {
      "type": "string",
      "pattern": "^ten_[a-z0-9]{8,32}$"
    },

    "version": {
      "type": "integer",
      "minimum": 1
    },

    "status": {
      "enum": [
        "draft",
        "validating",
        "validated",
        "approved",
        "active",
        "retired"
      ]
    },

    "brandingMode": {
      "enum": [
        "platform-led",
        "client-led",
        "co-branded",
        "endorsed",
        "unbranded-oem"
      ]
    },

    "brand": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "displayName",
        "legalName"
      ],
      "properties": {
        "displayName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 80
        },
        "legalName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 160
        },
        "shortName": {
          "type": "string",
          "maxLength": 32
        },
        "tagline": {
          "type": "string",
          "maxLength": 120
        }
      }
    },

    "assets": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "logoPrimaryLight",
        "logoPrimaryDark",
        "logoCompactLight",
        "logoCompactDark",
        "icon"
      ],
      "properties": {
        "logoPrimaryLight": {
          "$ref": "#/$defs/assetRef"
        },
        "logoPrimaryDark": {
          "$ref": "#/$defs/assetRef"
        },
        "logoCompactLight": {
          "$ref": "#/$defs/assetRef"
        },
        "logoCompactDark": {
          "$ref": "#/$defs/assetRef"
        },
        "logoMonochrome": {
          "$ref": "#/$defs/assetRef"
        },
        "icon": {
          "$ref": "#/$defs/assetRef"
        },
        "favicon": {
          "$ref": "#/$defs/assetRef"
        },
        "pwaIcon": {
          "$ref": "#/$defs/assetRef"
        },
        "pwaMaskableIcon": {
          "$ref": "#/$defs/assetRef"
        },
        "loginHero": {
          "$ref": "#/$defs/assetRef"
        },
        "emailLogo": {
          "$ref": "#/$defs/assetRef"
        }
      }
    },

    "color": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "primarySeed",
        "secondarySeed",
        "darkMode"
      ],
      "properties": {
        "primarySeed": {
          "$ref": "#/$defs/color"
        },
        "secondarySeed": {
          "$ref": "#/$defs/color"
        },
        "accentSeed": {
          "$ref": "#/$defs/color"
        },
        "darkPrimarySeed": {
          "$ref": "#/$defs/color"
        },
        "darkSecondarySeed": {
          "$ref": "#/$defs/color"
        },
        "darkMode": {
          "enum": [
            "supported",
            "light-only"
          ]
        }
      }
    },

    "typography": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "bodyFamily"
      ],
      "properties": {
        "bodyFamily": {
          "$ref": "#/$defs/fontToken"
        },
        "headingFamily": {
          "$ref": "#/$defs/fontToken"
        },
        "customBodyFont": {
          "$ref": "#/$defs/assetRef"
        },
        "customHeadingFont": {
          "$ref": "#/$defs/assetRef"
        }
      }
    },

    "copy": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "loginHeading": {
          "type": "string",
          "maxLength": 120
        },
        "loginSubheading": {
          "type": "string",
          "maxLength": 240
        },
        "supportLabel": {
          "type": "string",
          "maxLength": 80
        },
        "emailFooterOrganisation": {
          "type": "string",
          "maxLength": 160
        },
        "documentFooterText": {
          "type": "string",
          "maxLength": 240
        }
      }
    },

    "coBranding": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "partnerLogo": {
          "$ref": "#/$defs/assetRef"
        },
        "partnerLogoDark": {
          "$ref": "#/$defs/assetRef"
        },
        "endorsementLine": {
          "type": "string",
          "maxLength": 120
        }
      }
    },

    "domains": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "appHost": {
          "$ref": "#/$defs/hostname"
        },
        "supportUrl": {
          "type": "string",
          "format": "uri",
          "maxLength": 2048
        }
      }
    },

    "email": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "fromName"
      ],
      "properties": {
        "fromName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 80
        },
        "fromLocalPart": {
          "type": "string",
          "pattern": "^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}$"
        },
        "senderDomain": {
          "$ref": "#/$defs/hostname"
        },
        "senderDomainVerificationRef": {
          "type": "string",
          "pattern": "^domv_[A-Za-z0-9_-]{8,64}$"
        },
        "replyTo": {
          "type": "string",
          "format": "email",
          "maxLength": 254
        }
      }
    },

    "documents": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "pdfTemplate": {
          "type": "string",
          "pattern": "^pdft_[A-Za-z0-9_-]{8,64}$"
        },
        "coverImage": {
          "$ref": "#/$defs/assetRef"
        },
        "documentLogo": {
          "$ref": "#/$defs/assetRef"
        },
        "footerLogo": {
          "$ref": "#/$defs/assetRef"
        }
      }
    },

    "metadata": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "requestedBy": {
          "type": "string",
          "maxLength": 128
        },
        "brandApprovalRef": {
          "type": "string",
          "maxLength": 128
        },
        "notes": {
          "type": "string",
          "maxLength": 1000
        }
      }
    }
  },

  "$defs": {
    "assetRef": {
      "type": "string",
      "pattern": "^asset_[A-Za-z0-9_-]{8,64}$"
    },

    "color": {
      "type": "string",
      "pattern": "^#[0-9A-Fa-f]{6}$"
    },

    "fontToken": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9-]{1,63}$"
    },

    "hostname": {
      "type": "string",
      "minLength": 3,
      "maxLength": 253,
      "pattern": "^(?=.{3,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\\.)+[A-Za-z]{2,63}$"
    }
  }
}
```

---

# 18. Example Tenant Contract

```json
{
  "schemaVersion": "1.0",
  "tenantId": "ten_acme2026",
  "version": 12,
  "status": "approved",
  "brandingMode": "client-led",

  "brand": {
    "displayName": "Acme Operations",
    "legalName": "Acme Industries Ltd",
    "shortName": "Acme",
    "tagline": "Operational intelligence"
  },

  "assets": {
    "logoPrimaryLight": "asset_logo_dark_01",
    "logoPrimaryDark": "asset_logo_light_01",
    "logoCompactLight": "asset_mark_dark_01",
    "logoCompactDark": "asset_mark_light_01",
    "icon": "asset_icon_01",
    "favicon": "asset_favicon_01",
    "pwaIcon": "asset_pwa_01",
    "pwaMaskableIcon": "asset_pwa_mask_01",
    "emailLogo": "asset_email_logo_01"
  },

  "color": {
    "primarySeed": "#0057B8",
    "secondarySeed": "#F2A900",
    "accentSeed": "#00866A",
    "darkMode": "supported"
  },

  "typography": {
    "bodyFamily": "inter",
    "headingFamily": "inter"
  },

  "copy": {
    "loginHeading": "Welcome to Acme Operations",
    "loginSubheading": "Sign in using your organisation account.",
    "supportLabel": "Acme Support",
    "emailFooterOrganisation": "Acme Industries Ltd"
  },

  "domains": {
    "appHost": "portal.acme.example",
    "supportUrl": "https://support.acme.example"
  },

  "email": {
    "fromName": "Acme Operations",
    "fromLocalPart": "notifications",
    "senderDomain": "mail.acme.example",
    "senderDomainVerificationRef": "domv_31cb8f79",
    "replyTo": "support@acme.example"
  },

  "documents": {
    "pdfTemplate": "pdft_acme2026a",
    "documentLogo": "asset_logo_dark_01"
  }
}
```

The stored tenant contract contains **requested inputs**. Runtime components SHOULD consume a platform-generated **resolved theme**, not these raw values directly.

---

# 19. Rules — Resolved Theme

The server/build service SHOULD generate:

```json
{
  "themeVersion": 12,

  "colors": {
    "primary": "#0052A8",
    "primaryForeground": "#FFFFFF",
    "primaryHover": "#00458F",
    "background": "#FFFFFF",
    "foreground": "#141A21",
    "border": "#C9D1DA",
    "focusRing": "#005FCC"
  },

  "validation": {
    "textContrastPassed": true,
    "nonTextContrastPassed": true,
    "darkModePassed": true
  }
}
```

The original tenant seed SHOULD remain available separately for audit and brand preview.

---

# 20. Rules — API, Storage and State

## 20.1 Tenant scope

Every theme read/write MUST be explicitly tenant-scoped.

An asset reference MUST resolve to the same tenant unless it is a designated platform/shared asset.

Cross-tenant asset IDs MUST fail authorisation even if their identifiers are known.

This aligns the brand system with the Data & Database and Security standards: white-label configuration is tenant-owned data, not globally addressable presentation state.

---

## 20.2 Theme lifecycle

Canonical state machine:

```text
draft
 ↓
validating
 ↓
validated
 ↓
approved
 ↓
active
 ↓
retired
```

Validation failure returns to:

```text
draft
```

A tenant administrator MAY edit drafts.

Only appropriately authorised roles MAY approve or activate themes.

Production MUST NOT render a `draft` directly.

---

## 20.3 Optimistic concurrency

Updates SHOULD require:

```text
tenantId
version
expectedVersion / ETag
```

A stale administrative form MUST NOT silently overwrite a newer brand configuration.

---

## 20.4 Audit log

Production theme operations SHOULD record:

```text
tenant
old version
new version
actor
timestamp
approval reference
changed fields
validation result
activation result
```

Asset replacement history SHOULD be retained independently of display names.

---

# 21. Rules — QA and Visual Regression

## 21.1 No theme without visual QA

Every newly activated tenant theme MUST pass:

```text
schema validation
asset security validation
contrast validation
component regression
responsive regression
light/dark checks
email rendering checks where applicable
document checks where applicable
map attribution checks where applicable
```

---

## 21.2 Canonical screenshot matrix

At tenant activation, automated screenshot coverage SHOULD include:

| Surface | Desktop | Tablet | Mobile | Dark |
|---|---:|---:|---:|---:|
| Login | ✓ | — | ✓ | ✓ |
| App shell / header | ✓ | ✓ | ✓ | ✓ |
| Expanded sidebar | ✓ | ✓ | — | ✓ |
| Collapsed sidebar | ✓ | — | — | ✓ |
| Form default | ✓ | — | ✓ | ✓ |
| Form error state | ✓ | — | ✓ | ✓ |
| Dialog | ✓ | — | ✓ | ✓ |
| Dropdown/popover | ✓ | — | ✓ | ✓ |
| Dense data table | ✓ | — | — | ✓ |
| Empty state | ✓ | — | ✓ | ✓ |
| Chart/dashboard | ✓ | — | ✓ | ✓ |
| Map | ✓ | — | ✓ | ✓ |
| Email | ✓ | — | ✓ | dark-client check |
| PDF first page | ✓ | — | — | N/A |

---

## 21.3 Adversarial synthetic themes

The design system MUST maintain synthetic themes designed to expose failures:

```text
very light brand seed
very dark brand seed
high-chroma red
high-chroma green
yellow brand
low-chroma grey brand
very wide wordmark
very tall mark
logo with no dark variant
long tenant name
large custom font metrics
RTL locale
200% text size
forced-colours
```

A component change SHOULD pass this matrix before deployment.

---

## 21.4 Visual regression

Snapshot testing SHOULD compare stable renders of:

```text
platform default
representative active tenants
adversarial synthetic tenants
```

Pixel-difference thresholds MAY detect regression, but visual changes involving font anti-aliasing or browser rendering SHOULD be human-reviewable rather than automatically accepted.

A legitimate design-system change MUST update tenant snapshots deliberately.

---

## 21.5 Accessibility regression

Theme QA MUST run automated checks against the **resolved theme**, not merely raw tenant seed colours.

Automated tests SHOULD validate at least:

```text
primary button
secondary button
links
body text
muted required text
input boundaries
focus indicator
selected state
error
warning
success
charts
dark mode
```

WCAG requirements apply to the rendered state regardless of which organisation supplied the colour. (https://www.w3.org/TR/WCAG22/)

---

# 22. Sign-off Process

Canonical production sign-off:

```text
1. Tenant/brand owner submits assets
2. Automated asset validation
3. Security scanning/sanitisation
4. Theme generation
5. Automated contrast validation
6. Screenshot matrix generated
7. Design-system review
8. Accessibility review if exceptions/high-risk theme
9. Legal/brand review for co-branding or third-party marks
10. Tenant/client approval
11. Production activation
12. Post-activation smoke test
```

A single tenant administrator MUST NOT be able to bypass mandatory system validation.

---

## 22.1 Exception process

An exception MAY be raised for unusual brand requirements.

The exception MUST record:

```text
requested deviation
business/legal reason
affected surfaces
accessibility impact
security impact
compensating control
owner
expiry/review date
```

Exceptions MUST NOT waive WCAG AA requirements where the product's conformance policy requires them.

---

# 23. Asset Acceptance Checklist

Before an asset receives production status:

- [ ] Rights/permission to use the asset confirmed.
- [ ] Source came from an approved brand owner/source.
- [ ] File extension is allowlisted.
- [ ] MIME/content signature matches expected type.
- [ ] File size is within limit.
- [ ] Raster dimensions are within limit.
- [ ] Original filename is not used as storage identity.
- [ ] Malware scan passed where applicable.
- [ ] SVG sanitisation passed.
- [ ] SVG contains no scripts.
- [ ] SVG contains no event handlers.
- [ ] SVG contains no `foreignObject`.
- [ ] SVG contains no external resource references.
- [ ] Metadata/EXIF has been stripped where unnecessary.
- [ ] Logo has transparent background where required.
- [ ] Logo has acceptable padding/bounding box.
- [ ] Logo remains recognisable at minimum intended size.
- [ ] Light-surface version approved.
- [ ] Dark-surface version approved.
- [ ] Single-colour fallback available where required.
- [ ] Compact/monogram variant available where required.
- [ ] Favicon variant visually tested.
- [ ] PWA icon visually tested.
- [ ] Maskable PWA safe zone tested.
- [ ] Email raster fallback generated.
- [ ] Print/PDF reproduction tested.
- [ ] Third-party logo usage complies with owner guidelines.
- [ ] CDN asset reference is immutable/versioned.
- [ ] Asset ownership and approval metadata recorded.

The file-security checks above follow OWASP's defence-in-depth guidance for uploaded content. (https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)

---

# 24. Anti-patterns

| Do | Don't |
|---|---|
| Accept brand seed colours | Let tenants set every semantic token |
| Derive accessible interactive colours | Use a failing brand hex because “it's official” |
| Keep exact brand colour for safe decorative uses | Sacrifice button/text contrast to exact brand reproduction |
| Preserve semantic focus/error states | Let tenants recolour focus into invisibility |
| Theme shadcn semantic variables | Fork shadcn components per tenant |
| Validate schema server-side | Trust the administration UI alone |
| Store tenant asset references | Hotlink arbitrary remote image URLs |
| Sanitize SVG | Render original tenant SVG uploads directly |
| Use versioned CDN assets | Replace bytes behind an immutable URL |
| Generate dark logo variants | Apply automatic CSS inversion |
| Use monogram at small sizes | Crush a 200px wordmark into 16px |
| Maintain logo clear space | Pack controls against the logo |
| Separate partner marks with clear hierarchy | Invent unapproved composite trademarks |
| Verify custom domains | Route tenants from arbitrary host input |
| Authenticate sender domains | Spoof an unverified tenant From address |
| Keep provider attribution immutable | Let white-label settings hide map credits |
| Retain real HTML text | Turn ordinary headings into logo/image text |
| Use tenant-approved copy slots | Let clients replace security/error semantics |
| Test every resolved theme | Assume accessibility because the base theme passed |
| Screenshot adversarial themes | Test only aesthetically ideal tenants |
| Retain rollback versions | Overwrite the active theme in-place |
| Require approval for third-party marks | Copy partner logos from Google Images |

---

# 25. Checklist

A production white-label implementation conforms only when:

- [ ] The tenant layer is token-based.
- [ ] shadcn component behaviour remains immutable.
- [ ] Tenant configuration is schema-validated.
- [ ] Unknown theme fields are rejected.
- [ ] Raw CSS is prohibited.
- [ ] Raw JavaScript is prohibited.
- [ ] Arbitrary HTML is prohibited.
- [ ] Brand colours enter as seeds.
- [ ] Semantic roles are system-derived.
- [ ] Normal text reaches ≥4.5:1.
- [ ] Essential non-text UI reaches ≥3:1 where required.
- [ ] Colour is never the only state cue.
- [ ] Focus remains visible.
- [ ] Text remains functional at 200% scaling.
- [ ] Theme reflow remains functional.
- [ ] Error/warning/success meaning remains stable.
- [ ] Primary/secondary/monogram logos exist where needed.
- [ ] Light/dark logo variants are handled.
- [ ] Small-size logo replacement rules are enforced.
- [ ] Favicon is a simplified mark.
- [ ] PWA artwork has been separately prepared.
- [ ] Maskable PWA safe zone has been checked.
- [ ] Co-branding hierarchy is approved.
- [ ] Partner marks are legally authorised.
- [ ] Logo clear space is preserved.
- [ ] Uploaded assets are authenticated/authorised.
- [ ] Extensions are allowlisted.
- [ ] File signatures are validated.
- [ ] SVG is sanitised.
- [ ] Metadata is stripped where unnecessary.
- [ ] Assets are malware-scanned where applicable.
- [ ] CDN URLs are content/version-addressed.
- [ ] Cache invalidation is version-based.
- [ ] Previous theme remains rollback-capable.
- [ ] Custom domains are ownership-verified.
- [ ] TLS is active before domain activation.
- [ ] Email sender domains are verified.
- [ ] SPF/DKIM/DMARC production policy is satisfied.
- [ ] Email dark/light rendering is checked.
- [ ] PDF templates preserve immutable legal/data slots.
- [ ] Map attribution cannot be tenant-disabled.
- [ ] Static exports preserve provider credits.
- [ ] Theme writes are tenant-scoped.
- [ ] Theme activation is authorised.
- [ ] Changes are audit-logged.
- [ ] Visual regression passes.
- [ ] Accessibility regression passes.
- [ ] Screenshot matrix passes.
- [ ] Brand/legal sign-off exists where required.
- [ ] Post-activation smoke testing passes.

---

# 26. Canonical Summary

**1. White-labeling is controlled theming, not arbitrary frontend ownership.**  
Tenant branding changes approved semantic values and assets. It does not replace application behaviour or component architecture. shadcn's semantic CSS-variable model is the implementation baseline. (https://ui.shadcn.com/docs/theming)

**2. Accessibility outranks exact brand colour.**  
Tenant colours are inputs to an accessible derivation process. If the exact colour cannot meet the applicable contrast requirement, the system MUST use an accessible derived tone or fallback. WCAG 2.2's contrast, use-of-colour, focus, resizing and reflow requirements apply to every tenant. (https://www.w3.org/TR/WCAG22/)

**3. A brand needs multiple assets, not one logo file.**  
Primary, compact, monogram, light/dark and icon variants serve fundamentally different rendering contexts. Apple similarly emphasises simple, recognisable icon artwork that survives small rendering sizes and remains consistent across supported platforms. (https://developer.apple.com/design/human-interface-guidelines/app-icons)

**4. Tenant files are untrusted input.**  
Every logo, image, font and template follows authenticated upload, allowlisting, type/signature validation, size controls, sanitisation, malware checks where appropriate, and isolated/versioned storage. (https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)

**5. Semantic states are not tenant branding.**  
Error, warning, success, focus and disabled behaviour remain platform-governed even when their visual treatment is harmonised.

**6. White-labeling must never erase required attribution.**  
Map, imagery and data-provider credits are immutable provider/legal content. Mapbox, for example, explicitly requires logo and textual attribution in relevant Mapbox-powered maps. (https://docs.mapbox.com/help/dive-deeper/attribution/)

**7. Identity extends beyond the app shell.**  
Favicon, installable-app icons, email, verified domain, sender identity, PDFs and exported maps are all part of the tenant identity system and MUST be versioned and tested as one release.

**8. Custom email identity is an infrastructure feature, not just copy.**  
A sender domain must be verified and authenticated before activation. The Gold Standard requires SPF, DKIM and DMARC readiness for production branded senders. Current Gmail sender guidance provides corresponding sender-authentication requirements. (https://support.google.com/mail/answer/81126)

**9. Published assets are immutable.**  
New artwork produces a new asset URL and a new theme version. Activation switches a manifest atomically; it does not mutate cached assets in place.

**10. Every tenant theme is a release.**  
Theme activation requires schema validation, asset security, accessibility testing, screenshot regression, appropriate brand/legal approval and rollback capability.

---

# 27. Sources

1. **W3C — Web Content Accessibility Guidelines (WCAG) 2.2**  
   https://www.w3.org/TR/WCAG22/

2. **shadcn/ui — Theming**  
   https://ui.shadcn.com/docs/theming

3. **Apple Human Interface Guidelines — App icons**  
   https://developer.apple.com/design/human-interface-guidelines/app-icons

4. **OWASP Cheat Sheet Series — File Upload**  
   https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html

5. **Mapbox — Attribution**  
   https://docs.mapbox.com/help/dive-deeper/attribution/

6. **web.dev — Web app manifest**  
   https://web.dev/learn/pwa/web-app-manifest

7. **web.dev — Adaptive icon support in PWAs with maskable icons**  
   https://web.dev/articles/maskable-icon

8. **Google — Email sender guidelines**  
   https://support.google.com/mail/answer/81126

9. **Android Developers — Colour for mobile design**  
   https://developer.android.com/design/ui/mobile/guides/styles/color

The central architectural rule is that the tenant supplies **brand intent**, while the platform produces the **validated runtime theme**. That distinction prevents white-label capability from becoming an accessibility, security, caching, attribution, or component-maintenance bypass.
