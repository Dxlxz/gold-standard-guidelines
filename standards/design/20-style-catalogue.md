---
id: "style-catalogue"
title: "Design Style Catalogue"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "style", "catalogue"]
applies_to: ["ui", "data"]
related: ["accessibility"]
legacy_number: 100
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 51653
provenance: baseline

---

Below is the canonical catalogue. The recipes are **production-oriented digital reinterpretations**, not claims that each historical movement has one canonical palette or token set.

# Design Style Catalogue — Gold Standard 2026

**Status:** Canonical production reference  
**Baseline:** React + Tailwind CSS + shadcn/ui  
**Scope:** Visual language, theming, composition, imagery, motion and presentation tokens  
**Conformance language:** **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, **MAY**

---

# 1. Purpose

This catalogue defines reproducible visual recipes for **28 distinct interface design styles**. Its purpose is not to prescribe one aesthetic, but to make aesthetic direction implementable through tokens without compromising accessibility, component semantics, security, forms, state management, data integrity, or interaction patterns.

A product MAY adopt any catalogue style, but visual styling MUST remain downstream of the system contracts defined by the Accessibility, Design Tokens, Components, Patterns, Forms & Validation, Security, API, State Management, and Data standards.

The visual language SHOULD be implemented through systematic variables—colour, typography, shape, spacing, imagery and motion—rather than page-specific decoration. Smashing Magazine describes fonts, colours, shapes and visual elements as the building blocks of a reusable visual design language. (https://www.smashingmagazine.com/2020/03/visual-design-language-building-blocks/)

A selected style MUST NOT invalidate WCAG 2.2 requirements. Normal text requires at least 4.5:1 contrast at AA, important non-text UI information requires 3:1, information MUST NOT depend on colour alone, text must support 200% resizing, and reflow must preserve information and functionality. WCAG also defines enhanced focus appearance and interaction-animation criteria. (https://www.w3.org/TR/WCAG22/)

Material 3 demonstrates that colour, typography and shape can form an expressive theme without changing underlying component semantics. Its theme architecture separates colour schemes, typography and shape while retaining accessibility-aware roles. (https://developer.android.com/develop/ui/compose/designsystems/material3)

GOV.UK similarly separates **functional colour roles** from raw colours so that error, focus, links and other meanings remain predictable. (https://design-system.service.gov.uk/styles/colour/)

Carbon uses role-oriented colour tokens and themes so the same semantic system can operate across light and dark surfaces. (https://carbondesignsystem.com/elements/color/overview/)

shadcn/ui MUST be treated as the component implementation boundary. Its semantic variables—`background`, `foreground`, `primary`, `muted`, `accent`, `border`, `input`, `ring`, chart tokens and related foreground pairs—SHOULD be remapped for each style rather than replacing component internals. (https://ui.shadcn.com/docs/theming)

---

# 2. Rules

## 2.1 Style is a token layer, not a component fork

Every catalogue style MUST be expressible primarily through:

```text
color.*
type.*
space.*
radius.*
border.*
shadow.*
motion.*
texture.*
image.*
```

Components MUST continue consuming semantic roles.

A style MUST NOT require separate `ButtonBrutalist`, `ButtonGlass`, `ButtonGovernment`, etc. component implementations when a token or variant can represent the difference.

The intended architecture is:

```text
Primitive tokens
        ↓
Semantic tokens
        ↓
Style theme
        ↓
shadcn/ui component
        ↓
Product composition
```

shadcn explicitly recommends semantic CSS variables and remapping the same tokens for dark mode rather than rewriting component styles. (https://ui.shadcn.com/docs/theming)

---

## 2.2 Accessibility is invariant across styles

The following requirements apply to every catalogue entry:

- body text MUST meet **4.5:1** contrast;
- essential graphical/UI boundaries MUST meet **3:1** where WCAG 1.4.11 applies;
- colour MUST NOT be the only state/category signal;
- interactive focus MUST remain visibly identifiable;
- interfaces MUST survive text enlargement and reflow;
- essential information MUST NOT be embedded only in imagery;
- decorative motion SHOULD honor `prefers-reduced-motion`;
- interaction-triggered non-essential motion SHOULD be suppressible.

These requirements derive from WCAG 2.2 criteria 1.4.1, 1.4.3, 1.4.4, 1.4.10, 1.4.11 and 2.3.3. (https://www.w3.org/TR/WCAG22/)

Adobe Spectrum likewise treats colour perception, motion, concentration and differing user capabilities as inclusive-design concerns rather than aesthetic exceptions. (https://spectrum.adobe.com/page/inclusive-design/)

---

## 2.3 Palette notation

The palette recipes below are **reference implementations**.

Each recipe provides four principal values:

```text
canvas → primary page surface
ink    → default readable foreground
brand  → principal interactive/identity colour
accent → secondary expressive colour
```

Production systems SHOULD derive semantic states and tonal ramps around them rather than using only four literal values.

---

## 2.4 Density notation

```text
Loose    = 8px base; generous 24–48px composition gaps
Standard = 4/8px system; typical 16–32px composition gaps
Dense    = 4px base; typical 8–16px control/layout gaps
```

Visual density MUST NOT reduce touch targets, readable text or focus visibility merely to achieve a style.

---

# 3. Catalogue

## 3.1 Corporate / Enterprise

**Use-case fit:** SaaS administration, banking, insurance, logistics, CRM, ERP, B2B analytics.

**Palette direction:** restrained neutrals with one trusted brand hue. Example: canvas `#F8FAFC`, ink `#172033`, brand `#155EEF`, accent `#0E9384`. Status colours SHOULD remain conventional and distinct.

**Typography:** Inter, IBM Plex Sans, Source Sans 3 or equivalent neutral grotesk. Body 14–16px; headings 600 weight. Tabular numerals SHOULD be enabled in reports.

**Spacing/density:** standard to dense. Use an 8px macro-grid and 4px control increments.

**Radius/elevation:** 6–8px radius; restrained `0 1px 2px rgb(0 0 0 / .06)` and `0 4px 12px rgb(0 0 0 / .08)` shadows.

**Motion:** functional, 120–200ms; opacity/translate; little overshoot.

**Imagery:** diagrams, product screenshots, restrained photography, data.

**Texture:** virtually none.

**When to use:** complex products where clarity, predictability and scanning dominate.

**When to avoid:** entertainment or youth brands whose differentiation depends on strong visual personality.

Carbon's enterprise approach demonstrates why role-based tokens, explicit interaction states and stable light/dark themes suit large multi-product systems. (https://carbondesignsystem.com/elements/color/overview/)

---

## 3.2 Swiss / International

**Use-case fit:** architecture, cultural institutions, premium technology, portfolios, research, information-heavy brand sites.

**Palette direction:** white or warm white, nearly black typography and one primary accent. Example: canvas `#FAFAF7`, ink `#111111`, brand `#E21A2C`, accent `#2457C5`.

**Typography:** Helvetica Neue, Neue Haas Grotesk, Univers, Inter or Suisse-style sans. Strong scale contrast; disciplined weights.

**Spacing/density:** spacious but grid-strict. 8px base with large 32–80px compositional intervals.

**Radius/elevation:** 0–2px radius; almost no shadows. Hierarchy comes from grid, rule lines and typography.

**Motion:** linear, restrained, 140–220ms.

**Imagery:** strongly cropped photography, geometric placement, asymmetric compositions.

**Texture:** none or subtle paper grain.

**When to use:** products requiring authority through structure rather than decoration.

**When to avoid:** highly emotive consumer products where rigid geometry feels impersonal.

---

## 3.3 Editorial / Magazine

**Use-case fit:** media, publishing, essays, fashion, culture, journalism, long-form storytelling.

**Palette direction:** paper-like neutral plus editorial accent. Example: canvas `#FCFAF5`, ink `#171717`, brand `#9F1239`, accent `#1D4ED8`.

**Typography:** serif display + sans-serif UI. Example: Source Serif 4 + Inter. Headings MAY use 48–96px display scales; body SHOULD remain 17–20px with comfortable leading.

**Spacing/density:** loose around stories; compact metadata.

**Radius/elevation:** usually 0–4px; sections separated through whitespace and rules instead of cards.

**Motion:** understated fades, article-image reveals and navigational transitions.

**Imagery:** large photography, art-directed crops, captions, pull quotes.

**Texture:** paper, halftone or subtle grain MAY be used decoratively.

**When to use:** reading and narrative hierarchy are primary.

**When to avoid:** dense operations software where card-free composition reduces scan efficiency.

Long reading layouts MUST still support text resizing and reflow under WCAG regardless of editorial art direction. (https://www.w3.org/TR/WCAG22/)

---

## 3.4 Minimalism

**Use-case fit:** premium SaaS, productivity, portfolios, developer tools, focused consumer utilities.

**Palette direction:** few neutrals plus one accent. Example: canvas `#FFFFFF`, ink `#18181B`, brand `#2563EB`, accent `#71717A`.

**Typography:** clean sans; Inter, Geist, SF Pro, IBM Plex Sans.

**Spacing/density:** standard to loose; whitespace provides hierarchy.

**Radius/elevation:** 6–10px; borders preferred over heavy shadows.

**Motion:** quiet 120–180ms state transitions.

**Imagery:** sparse, purposeful, often product-focused.

**Texture:** none.

**When to use:** clear task-focused software and products with strong information architecture.

**When to avoid:** when “minimal” would remove necessary labels, boundaries, hierarchy or visible affordances.

Minimalism MUST NOT become “low contrast.” Essential controls still need sufficient distinguishability under WCAG. (https://www.w3.org/TR/WCAG22/)

---

## 3.5 Brutalism

**Use-case fit:** experimental cultural sites, music, art, independent publications, campaign microsites, provocative portfolios.

**Palette direction:** stark contrast. Example: canvas `#FFFFFF`, ink `#000000`, brand `#FF2A00`, accent `#00A3FF`.

**Typography:** grotesk or monospaced; oversized headings; deliberately abrupt scale changes.

**Spacing/density:** irregular but intentional. Dense clusters MAY contrast with large blank areas.

**Radius/elevation:** 0px; thick 2–4px borders; no conventional shadows.

**Motion:** abrupt cuts, marquee, hard translations; essential motion MUST remain reducible.

**Imagery:** uncropped or raw images, visible technical dimensions, intentionally “unfinished” framing.

**Texture:** scan artifacts, bitmap patterns, raw browser-like elements.

**When to use:** identity and confrontation are part of the product experience.

**When to avoid:** healthcare, finance, government transactions, enterprise workflows or any product where visual unpredictability increases operational risk.

Brutalism does not permit inaccessible text, flashing or motion. WCAG constraints remain invariant. (https://www.w3.org/TR/WCAG22/)

---

## 3.6 Neo-Brutalism

**Use-case fit:** creator products, education, fintech marketing, developer tools, youth-oriented SaaS.

**Palette direction:** bright flat fills with black outlines. Example: canvas `#FFFDF5`, ink `#111111`, brand `#FF6B6B`, accent `#7CFF6B`.

**Typography:** bold grotesk; Space Grotesk, Archivo, Inter Tight.

**Spacing/density:** standard; large controls and visible grouping.

**Radius/elevation:** 4–8px; 2–3px dark borders; offset hard shadow such as `4px 4px 0 #111`.

**Motion:** springy translations; button press MAY collapse the offset shadow.

**Imagery:** cut-out illustrations, icon stickers, flat graphics.

**Texture:** small dotted or checker accents; avoid omnipresent noise.

**When to use:** approachable products seeking strong personality without full brutalist hostility.

**When to avoid:** conservative institutional contexts or highly dense applications where borders and shadows produce visual fatigue.

---

## 3.7 Bento Grid

**Use-case fit:** product marketing, AI tools, platform overviews, dashboards, portfolios, feature storytelling.

**Palette direction:** neutral shell with differentiated tiles. Example: canvas `#F5F5F4`, ink `#18181B`, brand `#6D28D9`, accent `#2563EB`.

**Typography:** contemporary sans, 15–17px body, 24–48px feature headings.

**Spacing/density:** 8–16px grid gaps; individual cells SHOULD have generous 20–32px internal padding.

**Radius/elevation:** 16–24px cards; low elevation or tonal differentiation.

**Motion:** individual tiles MAY reveal or respond independently; animation SHOULD maintain spatial continuity.

**Imagery:** product UI, diagrams, isolated product renders, micro-demos.

**Texture:** subtle gradients or tile-specific backgrounds.

**When to use:** heterogeneous features need equal-but-distinct storytelling.

**When to avoid:** workflows whose reading order is strict or where irregular card sizing impairs prioritisation.

---

## 3.8 Art Deco

**Use-case fit:** hospitality, luxury events, fashion, premium entertainment, cultural experiences.

**Palette direction:** dark neutrals, ivory, metallic simulation. Example: canvas `#11100E`, ink `#F7E7CE`, brand `#D4AF37`, accent `#0F6B63`.

**Typography:** geometric display faces plus highly legible sans body. Display MAY use high-contrast decorative caps; UI labels MUST remain restrained.

**Spacing/density:** generous, symmetrical compositions.

**Radius/elevation:** 0–4px; framed borders; double rules; minimal shadow.

**Motion:** graceful 250–400ms reveals; geometric wipes MAY be used sparingly.

**Imagery:** architectural symmetry, fashion photography, geometric ornament.

**Texture:** subtle metallic grain, line motifs, fan/sunburst geometry.

**When to use:** premium atmosphere is central.

**When to avoid:** dense transactional software or when decorative letterforms would dominate functional content.

Gold-on-black decorative palettes still require body copy and controls to satisfy WCAG contrast independently. (https://www.w3.org/TR/WCAG22/)

---

## 3.9 Retro / Vaporwave

**Use-case fit:** music, events, games, creative campaigns, nostalgic consumer brands.

**Palette direction:** dark purple/navy with neon cyan/pink. Example: canvas `#140B2D`, ink `#F7F4FF`, brand `#FF4FD8`, accent `#41EAD4`.

**Typography:** geometric sans plus display face; optional pixel or chrome display styling.

**Spacing/density:** standard; compositions MAY be expansive.

**Radius/elevation:** 4–12px; neon glows decorative only.

**Motion:** parallax, gradients and scan movement MAY be expressive; respect reduced-motion settings.

**Imagery:** sunsets, chrome, grids, retro 3D renders, VHS artefacts.

**Texture:** scanlines, grain, chromatic aberration used at low opacity.

**When to use:** nostalgia and entertainment are part of the message.

**When to avoid:** prolonged productivity tasks, safety-critical products or situations where glow reduces edge clarity.

---

## 3.10 Y2K

**Use-case fit:** fashion, youth culture, social products, music, event sites, consumer campaigns.

**Palette direction:** silver, icy blue, bubblegum and lime. Example: canvas `#EAF8FF`, ink `#172033`, brand `#7B61FF`, accent `#FF4FA3`.

**Typography:** rounded grotesk, techno display or condensed display paired with neutral UI sans.

**Spacing/density:** moderate; controls may feel compact but SHOULD keep modern target sizes.

**Radius/elevation:** 12–24px, glossy highlights, bordered pills.

**Motion:** playful hover magnification, liquid gradients, short elastic easing.

**Imagery:** flash photography, 3D chrome, starbursts, stickers.

**Texture:** translucent plastics, noise, reflective surfaces.

**When to use:** youth and fashion-oriented consumer experiences.

**When to avoid:** serious institutional applications or when nostalgic decoration would interfere with form completion.

---

## 3.11 Terminal / Monospace

**Use-case fit:** developer tools, infrastructure, observability, cybersecurity, technical consoles, retro computing themes.

**Palette direction:** near-black plus restrained terminal accent. Example: canvas `#0A0D0A`, ink `#D6F5D6`, brand `#3EE56B`, accent `#58A6FF`.

**Typography:** JetBrains Mono, Berkeley Mono, IBM Plex Mono or equivalent; prose MAY use a sans companion.

**Spacing/density:** dense; 4/8px increments.

**Radius/elevation:** 0–4px; borders and inset panels instead of shadows.

**Motion:** instant or very short 80–140ms transitions; caret/stream animation only where meaningful.

**Imagery:** logs, ASCII, code snippets, diagrams.

**Texture:** subtle scanline/noise optional.

**When to use:** technical users and developer-centric environments.

**When to avoid:** broad consumer experiences where continuous monospace reading harms readability.

---

## 3.12 Blueprint / Technical Drawing

**Use-case fit:** CAD-adjacent products, engineering, industrial systems, architecture, construction, infrastructure.

**Palette direction:** blue or charcoal field with high-contrast linework. Example: canvas `#0D3B66`, ink `#F4FAFF`, brand `#52C7FF`, accent `#FFD166`.

**Typography:** DIN, IBM Plex Sans/Mono, Roboto Condensed; tabular numerals.

**Spacing/density:** dense but strongly gridded.

**Radius/elevation:** 0–4px; outlines replace shadows.

**Motion:** precise linear movement, snapping, measurement transitions.

**Imagery:** schematics, plans, dimension marks, grid overlays.

**Texture:** technical grid, coordinate ticks, dashed construction lines.

**When to use:** spatial, engineering or procedural data is core.

**When to avoid:** consumer experiences needing warmth or editorial readability.

Texture grids MUST remain decorative and MUST NOT compete with control boundaries or text. WCAG non-text contrast applies to graphical objects needed for understanding. (https://www.w3.org/TR/WCAG22/)

---

## 3.13 Glassmorphism

**Use-case fit:** premium dashboards, media controls, visual consumer products, spatial interfaces, hero surfaces.

**Palette direction:** rich image/gradient behind translucent neutral surfaces. Example: base `#101828`, ink `#FFFFFF`, brand `#7C3AED`, accent `#2DD4BF`; glass `rgb(255 255 255 / 0.10)`.

**Typography:** neutral sans at normal or medium weight.

**Spacing/density:** standard to loose.

**Radius/elevation:** 16–24px; `backdrop-filter: blur(16px)`; subtle border `rgb(255 255 255 / .18)`.

**Motion:** smooth depth transitions, 180–280ms.

**Imagery:** ambient gradients, photographic backplates, large decorative forms.

**Texture:** transparency and blur are the texture.

**When to use:** limited prominent surfaces over controlled backgrounds.

**When to avoid:** data-dense applications, uncontrolled user imagery, low-powered environments or anywhere transparency makes contrast unpredictable.

Glassmorphism has **high accessibility implementation risk** because final contrast depends on compositing with whatever sits behind the surface. The rendered result—not the nominal foreground colour—must meet WCAG contrast. (https://www.w3.org/TR/WCAG22/)

---

## 3.14 Claymorphism

**Use-case fit:** onboarding, education, friendly consumer SaaS, family products, light gamification.

**Palette direction:** pastel surfaces with strong readable foregrounds. Example: canvas `#F7F5FF`, ink `#242038`, brand `#7765E3`, accent `#FF8A65`.

**Typography:** rounded sans such as Nunito Sans or a softer grotesk.

**Spacing/density:** loose.

**Radius/elevation:** 20–32px; large soft exterior shadow plus subtle inset highlight.

**Motion:** soft spring movement, squash/press feedback.

**Imagery:** 3D clay icons, rounded illustrations, simplified figures.

**Texture:** matte 3D surfaces.

**When to use:** friendliness and approachability are key.

**When to avoid:** dense professional tooling or if soft tonal differences are being used as the only component boundaries.

---

## 3.15 Neo-Memphis

**Use-case fit:** creative tools, education, events, design brands, youth marketing.

**Palette direction:** white/cream foundation with multiple vivid accents. Example: canvas `#FFFDF7`, ink `#1D1D1F`, brand `#5B5FEF`, accent `#FF6B6B`, secondary accent `#F7D046`.

**Typography:** expressive grotesk; geometric headings.

**Spacing/density:** loose to standard with deliberate irregularity.

**Radius/elevation:** 8–16px; flat planes; occasional hard shadow.

**Motion:** playful rotate/translate microinteractions.

**Imagery:** simple geometric illustration and cutouts.

**Texture:** dots, squiggles, confetti, geometric marks.

**When to use:** playful differentiation.

**When to avoid:** critical workflows or screens already containing high information density.

Decorative shapes MUST NOT be mistaken for controls and SHOULD be hidden from assistive technology when they convey no information.

---

## 3.16 Risograph

**Use-case fit:** arts, publishing, music, festivals, cultural campaigns.

**Palette direction:** limited simulated inks. Example: paper `#F4E9D8`, ink `#1A1A1A`, fluorescent red `#FF665E`, blue `#0078BF`.

**Typography:** editorial serif/grotesk mix; bold display compositions.

**Spacing/density:** loose.

**Radius/elevation:** typically 0; paper stacking MAY provide modest offset depth.

**Motion:** low-frame or step-like animation MAY echo print registration shifts.

**Imagery:** halftone photography, two/three-colour illustration.

**Texture:** grain, ink overlap, misregistration.

**When to use:** cultural and artistic identity is more important than polished neutrality.

**When to avoid:** high-density product UI or applications requiring colour-accurate data representation.

Texture SHOULD be applied through decorative pseudo-elements so it does not degrade text rendering.

---

## 3.17 Duotone

**Use-case fit:** marketing systems, media, photography-led brands, campaigns, section identities.

**Palette direction:** two dominant chromatic values plus accessible neutral UI. Example: canvas `#F8FAFC`, ink `#111827`, tone A `#1D4ED8`, tone B `#F43F5E`.

**Typography:** neutral or editorial depending context.

**Spacing/density:** standard.

**Radius/elevation:** style-independent; typically 6–12px.

**Motion:** image crossfades and colour transitions.

**Imagery:** photography mapped through a two-colour treatment.

**Texture:** image colour mapping provides texture.

**When to use:** image consistency and strong brand recognition.

**When to avoid:** when duotone photography must communicate exact colour information or diagnostic meaning.

Functional UI SHOULD remain neutral enough that the two-tone imagery does not become confused with status semantics.

---

## 3.18 Dataviz-First

**Use-case fit:** analytics, finance, observability, BI, scientific software, executive dashboards.

**Palette direction:** neutral product shell with reserved semantic and chart palettes. Example UI canvas `#F8FAFC`, ink `#111827`, interaction `#2563EB`, chart accent `#0F766E`.

**Typography:** clear sans plus tabular numerals; dense tables may use 13–14px.

**Spacing/density:** dense to standard.

**Radius/elevation:** 4–8px; charts SHOULD not be buried inside excessive visual card chrome.

**Motion:** transitions only when they preserve data correspondence; 150–300ms.

**Imagery:** charts, diagrams and data themselves replace decorative hero imagery.

**Texture:** none except meaningful chart patterns.

**When to use:** quantitative comparison and monitoring dominate.

**When to avoid:** storytelling experiences where quantitative analysis is secondary.

Charts MUST NOT rely on colour alone. Patterns, shapes, labels and other redundant encodings improve accessibility, especially for users with colour-vision deficiencies. (https://www.smashingmagazine.com/2022/07/accessibility-first-approach-chart-visual-design/) Adobe likewise advises inclusive colour use rather than referring to interface objects only by colour. (https://spectrum.adobe.com/page/inclusive-design/)

---

## 3.19 Dark-Luxe

**Use-case fit:** premium finance, automotive, jewellery, fashion, private membership, luxury hospitality.

**Palette direction:** charcoal/black, warm white, muted metallic accent. Example: canvas `#0E0E0F`, ink `#F5F2EA`, brand `#C6A15B`, accent `#7B8F78`.

**Typography:** high-contrast serif for display plus restrained sans UI.

**Spacing/density:** loose.

**Radius/elevation:** 4–12px; subtle layered blacks and restrained shadows.

**Motion:** slow but responsive, typically 220–400ms; fades and controlled reveals.

**Imagery:** premium photography with dramatic crops and negative space.

**Texture:** subtle noise, grain, metal or satin effects.

**When to use:** exclusivity and atmosphere are material to the brand.

**When to avoid:** high-frequency operational software where low luminance and slow transitions reduce scan speed.

Dark themes still require tested text/icon contrast; “luxury grey” MUST NOT replace readable foreground tokens. (https://www.w3.org/TR/WCAG22/)

---

## 3.20 Geospatial / Topographic

**Use-case fit:** GIS, climate, agriculture, environment, logistics, maritime, field operations, urban planning.

**Palette direction:** map-neutral shell with earth/water accents. Example: canvas `#F4F1E8`, ink `#19251D`, brand `#256D5A`, accent `#2C7BE5`.

**Typography:** highly legible sans; condensed labels MAY be used on maps. Numeric coordinate fields use tabular numerals.

**Spacing/density:** dense around map controls; loose around narrative panels.

**Radius/elevation:** 4–8px controls; floating map surfaces require clear borders or shadows.

**Motion:** pan/zoom is spatially meaningful; overlays SHOULD transition without disorienting map position.

**Imagery:** maps, contours, satellite imagery, environmental photography.

**Texture:** contour lines, terrain shading, coordinate grids.

**When to use:** spatial relationships are core information.

**When to avoid:** purely abstract datasets where map aesthetics add false spatial meaning.

Map colours MUST represent data semantics rather than decoration. Critical boundaries, routes and selected regions must remain perceivable independently of colour where necessary under WCAG 1.4.1 and 1.4.11. (https://www.w3.org/TR/WCAG22/)

---

## 3.21 Government / Accessible-First

**Use-case fit:** public services, benefits, tax, healthcare administration, civic portals, regulated processes.

**Palette direction:** white/light neutral, very dark text, restrained functional blue and explicit status colours. Example: canvas `#FFFFFF`, ink `#0B0C0C`, brand `#1D70B8`, focus `#FFDD00`.

**Typography:** highly legible sans; conventional hierarchy; body 16–19px.

**Spacing/density:** standard; generous form spacing.

**Radius/elevation:** 0–4px; borders and whitespace preferred to atmospheric shadows.

**Motion:** minimal and functional.

**Imagery:** limited; explanatory diagrams and authentic photography where useful.

**Texture:** none.

**When to use:** task completion, universal access and public trust dominate.

**When to avoid:** only when the product explicitly requires a highly expressive entertainment identity.

GOV.UK maintains functional roles for links, focus, error and success and explicitly requires AA contrast rather than arbitrary palette usage. (https://design-system.service.gov.uk/styles/colour/)

---

## 3.22 Brutalist-Editorial Hybrid

**Use-case fit:** independent media, art criticism, culture, architecture, fashion, experimental journalism.

**Palette direction:** paper neutral + black + one raw saturated accent. Example: canvas `#F5F1E8`, ink `#0A0A0A`, brand `#E50000`, accent `#0057FF`.

**Typography:** expressive serif editorial body/headlines mixed with monospace or grotesk metadata.

**Spacing/density:** intentionally alternating dense and sparse zones.

**Radius/elevation:** 0px; rules, frames and typography create separation.

**Motion:** hard cuts combined with restrained editorial image reveals.

**Imagery:** full-bleed photography, visible captions, oversized type.

**Texture:** photocopy/grain optional.

**When to use:** content needs both intellectual/editorial depth and anti-corporate visual identity.

**When to avoid:** procedural applications where irregular hierarchy slows scanning.

---

## 3.23 Organic / Natural

**Use-case fit:** sustainability, wellness, food, agriculture, travel, ecology, ethical consumer brands.

**Palette direction:** warm earth and botanical tones. Example: canvas `#F5F0E6`, ink `#253127`, brand `#486B45`, accent `#B5663D`.

**Typography:** humanist sans or readable serif; avoid excessively rustic display faces for UI.

**Spacing/density:** loose and breathable.

**Radius/elevation:** 10–20px; soft edges; very restrained shadows.

**Motion:** slow organic easing and subtle scale/opacity.

**Imagery:** landscapes, ingredients, material close-ups, hand illustration.

**Texture:** paper fibre, subtle grain, botanical line art.

**When to use:** ecological or human/natural associations support the proposition.

**When to avoid:** technical/control-room applications that require maximum density and precision.

Earth tones often cluster in similar luminance bands, so muted green/brown combinations MUST be contrast-tested rather than assumed accessible. (https://www.w3.org/TR/WCAG22/)

---

## 3.24 Cyberpunk / HUD

**Use-case fit:** games, cybersecurity visualisation, entertainment, sci-fi media, special-purpose technical displays.

**Palette direction:** near-black plus neon cyan/magenta/amber. Example: canvas `#05070A`, ink `#E6FCFF`, brand `#00E5FF`, accent `#FF2E88`.

**Typography:** technical grotesk or mono; condensed labels; generous distinction between display and readable body text.

**Spacing/density:** dense.

**Radius/elevation:** 0–4px; outlined panels, clipped corners.

**Motion:** scanning, targeting and numeric updates MAY be expressive; flashing MUST remain below accessibility thresholds.

**Imagery:** wireframes, diagrams, radar, synthetic imagery.

**Texture:** grids, noise, scan lines.

**When to use:** immersive fiction or intentionally technical environments.

**When to avoid:** everyday administration, healthcare, government or lengthy reading.

WCAG prohibits unsafe flash patterns and requires non-essential interaction animation to be suppressible at AAA; decorative HUD motion SHOULD therefore respect reduced-motion preferences even below AAA targets. (https://www.w3.org/TR/WCAG22/)

---

## 3.25 Soft UI / Neumorphism

**Use-case fit:** limited decorative controls, music interfaces, experimental concept surfaces.

**Palette direction:** nearly monochromatic surface system. Example: canvas `#E7ECF2`, ink `#172033`, brand `#3B66F5`, accent `#64748B`.

**Typography:** neutral sans.

**Spacing/density:** loose.

**Radius/elevation:** 16–28px; paired light/dark shadows simulate extrusion.

```text
shadow-dark  = 8px 8px 18px rgb(163 177 198 / .55)
shadow-light = -8px -8px 18px rgb(255 255 255 / .85)
```

**Motion:** surface presses inward on activation.

**Imagery:** minimal; product controls dominate.

**Texture:** simulated soft extrusion.

**When to use:** small non-critical decorative surfaces where component boundaries remain explicit.

**When to avoid:** forms, dense products or anywhere shadows are the sole control affordance.

Soft UI has **high accessibility risk** because its characteristic boundaries depend on low-contrast shading. Required controls MUST retain independently sufficient borders, labels and focus treatment. (https://www.w3.org/TR/WCAG22/)

---

## 3.26 Flat 2.0

**Use-case fit:** general web apps, SaaS, consumer utilities, mobile/web cross-platform products.

**Palette direction:** flat neutral planes with strong accent and subtle depth cues. Example: canvas `#FFFFFF`, ink `#1F2937`, brand `#2563EB`, accent `#14B8A6`.

**Typography:** modern sans.

**Spacing/density:** standard.

**Radius/elevation:** 6–10px; thin borders; low shadows only where depth communicates layering.

**Motion:** conventional 120–200ms transitions.

**Imagery:** vector illustration, simple iconography, product screenshots.

**Texture:** none.

**When to use:** broad product categories needing a durable contemporary baseline.

**When to avoid:** when the visual identity requires stronger differentiation than typography, colour and composition provide.

Material's separation of colour, typography and shape demonstrates how a flat/systematic interface can remain expressive without relying on heavy skeuomorphic depth. (https://developer.android.com/develop/ui/compose/designsystems/material3)

---

## 3.27 Paper / Skeuomorphic

**Use-case fit:** journaling, note-taking, reading, education, heritage experiences, creative writing tools.

**Palette direction:** warm paper and ink with restrained physical-material accent. Example: canvas `#F7F0DF`, ink `#2B241C`, brand `#A64232`, accent `#375A7F`.

**Typography:** readable serif body + utilitarian sans controls.

**Spacing/density:** standard to loose.

**Radius/elevation:** 2–8px; realistic but restrained paper layering; small shadows.

**Motion:** page turns or object-like movement MAY be used when spatially comprehensible and optional.

**Imagery:** scans, archival imagery, physical objects.

**Texture:** paper grain, ruled lines, subtle fibres.

**When to use:** the physical metaphor clarifies interaction or supports emotional tone.

**When to avoid:** large enterprise platforms where material simulation consumes space and maintenance budget.

Texture MUST NOT be baked behind critical text at a contrast level that reduces readability. (https://www.w3.org/TR/WCAG22/)

---

## 3.28 Material Expressive / Adaptive

**Use-case fit:** broad consumer apps, mobile-first products, adaptive/personalised interfaces, platform ecosystems.

**Palette direction:** generated tonal roles. Reference seed: `#6750A4`; light canvas `#FFFBFE`; ink `#1D1B20`; secondary `#625B71`.

**Typography:** role-based scale: display, headline, title, body and label.

**Spacing/density:** standard, component-led.

**Radius/elevation:** varied shape scale from compact to highly rounded; tonal elevation can supplement shadow.

**Motion:** expressive but systematic, maintaining state continuity.

**Imagery:** product-specific; components and dynamic colour provide much of the visual personality.

**Texture:** generally minimal.

**When to use:** products needing adaptable theming with established component semantics.

**When to avoid:** brand environments where strong historical or editorial art direction should dominate platform conventions.

Material 3 explicitly defines themes through colour scheme, typography and shapes, with primary/secondary/tertiary roles, tonal palettes and light/dark scheme support. (https://developer.android.com/develop/ui/compose/designsystems/material3)

---

# 4. Comparison Matrix

**Accessibility risk** below means the amount of mitigation/testing required when reproducing the style literally—not whether a style is intrinsically accessible or inaccessible. WCAG remains the actual conformance test. (https://www.w3.org/TR/WCAG22/)

| Style | Strong industry fit | Accessibility risk | Implementation cost |
|---|---|---:|---:|
| Corporate / Enterprise | B2B SaaS, finance, operations | Low | Low |
| Swiss / International | Architecture, tech, culture | Low | Medium |
| Editorial / Magazine | Publishing, fashion, media | Medium | Medium |
| Minimalism | SaaS, productivity, premium utility | Medium | Low |
| Brutalism | Arts, music, experimental media | High | Medium |
| Neo-Brutalism | Creator tools, education, youth SaaS | Medium | Medium |
| Bento Grid | Product marketing, AI, portfolios | Medium | Medium |
| Art Deco | Luxury, hospitality, events | Medium | High |
| Retro / Vaporwave | Music, games, entertainment | High | High |
| Y2K | Fashion, youth consumer, music | Medium–High | High |
| Terminal / Monospace | Devtools, infra, security | Medium | Low |
| Blueprint / Technical | Engineering, architecture | Medium | Medium |
| Glassmorphism | Premium consumer, media | High | Medium |
| Claymorphism | Education, family, onboarding | Medium | High |
| Neo-Memphis | Creative, education, events | Medium | Medium |
| Risograph | Arts, festivals, publishing | Medium–High | High |
| Duotone | Marketing, media, photography | Medium | Medium |
| Dataviz-First | BI, finance, observability | Medium | High |
| Dark-Luxe | Luxury, automotive, premium finance | Medium–High | Medium |
| Geospatial / Topographic | GIS, climate, logistics | Medium | High |
| Government / Accessible-First | Public service, healthcare admin | Low | Low |
| Brutalist-Editorial | Culture, independent media | Medium–High | Medium |
| Organic / Natural | Sustainability, wellness, food | Medium | Medium |
| Cyberpunk / HUD | Games, entertainment, security demos | High | High |
| Soft UI / Neumorphism | Experimental consumer UI | Very high | Medium |
| Flat 2.0 | General SaaS/mobile/web | Low | Low |
| Paper / Skeuomorphic | Notes, education, heritage | Medium | High |
| Material Expressive | Consumer/platform apps | Low–Medium | Medium |

Data-heavy styles have greater implementation cost because chart semantics, direct labeling, interaction states and accessibility require more than visual palette selection. Accessibility-first chart design should consider colour, alternative encodings and visual structure together rather than treating accessibility as a post-processing step. (https://www.smashingmagazine.com/2022/07/accessibility-first-approach-chart-visual-design/)

---

# 5. Decision Tree

```text
START
│
├─ Is the product primarily a public, regulated or high-consequence service?
│  ├─ YES
│  │  ├─ Public/civic → Government / Accessible-First
│  │  ├─ Enterprise/operations → Corporate / Enterprise
│  │  └─ Technical/scientific → Blueprint / Technical
│  │
│  └─ NO
│
├─ Is quantitative analysis the primary user activity?
│  ├─ YES
│  │  ├─ Spatial data dominates → Geospatial / Topographic
│  │  └─ Non-spatial analytics → Dataviz-First
│  │
│  └─ NO
│
├─ Is reading/storytelling the primary activity?
│  ├─ YES
│  │  ├─ Conventional premium publication → Editorial / Magazine
│  │  └─ Experimental culture publication → Brutalist-Editorial
│  │
│  └─ NO
│
├─ Does the audience consist mainly of technical/developer users?
│  ├─ YES
│  │  ├─ CLI/infrastructure identity → Terminal / Monospace
│  │  ├─ Engineering/spatial identity → Blueprint / Technical
│  │  └─ Futuristic entertainment identity → Cyberpunk / HUD
│  │
│  └─ NO
│
├─ Is premium/luxury positioning the central brand requirement?
│  ├─ YES
│  │  ├─ Historical/geometric → Art Deco
│  │  ├─ Contemporary nocturnal → Dark-Luxe
│  │  └─ Restrained contemporary → Swiss / International
│  │
│  └─ NO
│
├─ Is visual nostalgia central?
│  ├─ YES
│  │  ├─ 1980s/1990s digital nostalgia → Retro / Vaporwave
│  │  ├─ late-1990s/2000s consumer tech → Y2K
│  │  └─ physical print nostalgia → Risograph or Paper / Skeuomorphic
│  │
│  └─ NO
│
├─ Is playfulness/approachability a primary differentiator?
│  ├─ YES
│  │  ├─ bold/graphic → Neo-Brutalism
│  │  ├─ geometric/playful → Neo-Memphis
│  │  └─ soft/3D → Claymorphism
│  │
│  └─ NO
│
├─ Is imagery or atmosphere more important than dense task throughput?
│  ├─ YES
│  │  ├─ translucent/spatial → Glassmorphism
│  │  ├─ two-colour photographic identity → Duotone
│  │  └─ natural/human → Organic / Natural
│  │
│  └─ NO
│
├─ Does the product need adaptable mainstream component behaviour?
│  ├─ YES
│  │  ├─ expressive/adaptive → Material Expressive
│  │  ├─ neutral/general-purpose → Flat 2.0
│  │  └─ very restrained → Minimalism
│  │
│  └─ NO
│
└─ Is deliberate visual confrontation part of the brand?
   ├─ YES → Brutalism
   └─ NO  → Swiss / Minimalism / Corporate baseline
```

The decision MUST be revisited if user research shows that the chosen visual language impairs comprehension or task completion. Style SHOULD follow audience and product purpose rather than trend adoption.

---

# 6. Canonical Implementation Contract

## 6.1 Base shadcn mapping

Every style SHOULD be implemented by remapping the standard semantic variables:

```css
:root {
  --background: var(--style-canvas);
  --foreground: var(--style-ink);

  --card: var(--style-surface);
  --card-foreground: var(--style-ink);

  --popover: var(--style-surface-raised);
  --popover-foreground: var(--style-ink);

  --primary: var(--style-brand);
  --primary-foreground: var(--style-on-brand);

  --secondary: var(--style-secondary);
  --secondary-foreground: var(--style-on-secondary);

  --muted: var(--style-muted);
  --muted-foreground: var(--style-muted-ink);

  --accent: var(--style-accent);
  --accent-foreground: var(--style-on-accent);

  --destructive: var(--style-destructive);

  --border: var(--style-border);
  --input: var(--style-input);
  --ring: var(--style-focus);

  --chart-1: var(--style-chart-1);
  --chart-2: var(--style-chart-2);
  --chart-3: var(--style-chart-3);
  --chart-4: var(--style-chart-4);
  --chart-5: var(--style-chart-5);

  --radius: var(--style-radius);
}
```

This matches shadcn's semantic background/foreground pairing and its use of common variables across modes. (https://ui.shadcn.com/docs/theming)

---

## 6.2 Style scope

A product MAY expose multiple visual themes through a data attribute:

```css
[data-style="swiss"] {
  --style-canvas: #fafaf7;
  --style-ink: #111111;
  --style-brand: #e21a2c;
  --style-accent: #2457c5;
  --style-radius: 0.125rem;
}

[data-style="neo-brutal"] {
  --style-canvas: #fffdf5;
  --style-ink: #111111;
  --style-brand: #ff6b6b;
  --style-accent: #7cff6b;
  --style-radius: 0.375rem;
}

[data-style="dark-luxe"] {
  --style-canvas: #0e0e0f;
  --style-ink: #f5f2ea;
  --style-brand: #c6a15b;
  --style-accent: #7b8f78;
  --style-radius: 0.5rem;
}
```

Component source code SHOULD remain unchanged.

---

## 6.3 Motion tokens

Styles MUST map their motion character into a bounded system:

```css
:root {
  --motion-fast: 120ms;
  --motion-standard: 180ms;
  --motion-slow: 280ms;

  --ease-standard: cubic-bezier(.2, 0, 0, 1);
  --ease-enter: cubic-bezier(0, 0, .2, 1);
  --ease-exit: cubic-bezier(.4, 0, 1, 1);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-fast: 1ms;
    --motion-standard: 1ms;
    --motion-slow: 1ms;
  }
}
```

Highly expressive styles MAY replace easing curves but MUST preserve reduced-motion behaviour. WCAG 2.2 includes an AAA criterion for disabling non-essential animation triggered by interaction. (https://www.w3.org/TR/WCAG22/)

---

## 6.4 Functional colours remain semantic

A style MUST NOT repurpose:

```text
error
warning
success
focus
selected
disabled
```

merely because a decorative colour better matches the aesthetic.

GOV.UK specifically distinguishes functional colours from general palette colours so functional meaning stays predictable. (https://design-system.service.gov.uk/styles/colour/)

Carbon similarly uses colour tokens for defined interaction roles and states rather than treating palette values as interchangeable decoration. (https://carbondesignsystem.com/elements/color/overview/)

---

# 7. Anti-Patterns

| Do | Don't |
|---|---|
| Theme semantic tokens | Fork every shadcn component for each style |
| Select style based on audience/task | Select style solely because it is trending |
| Preserve visible focus treatment | Remove focus rings because they clash aesthetically |
| Test rendered colour combinations | Assume pastel, neon, glass or metallic palettes are accessible |
| Preserve form labels and validation semantics | Make inputs “minimal” by deleting labels or boundaries |
| Use texture decoratively | Place heavy grain/scanlines directly over body text |
| Use redundant chart encodings | Depend only on colour for series identity |
| Use typography to reinforce hierarchy | Replace hierarchy with giant decorative text everywhere |
| Keep status roles stable | Reassign red/green/blue meanings per page |
| Use glass on controlled backgrounds | Put translucent panels over arbitrary user images |
| Add explicit borders to neumorphic controls | Rely solely on soft shadow to show interactivity |
| Keep dark-mode text readable | Use low-contrast grey-on-black for “luxury” |
| Reduce motion when requested | Preserve parallax/glitch because it defines the brand |
| Keep map symbology semantic | Use attractive terrain palettes that distort data ordering |
| Use decorative historical motifs selectively | Turn every control into ornamental Art Deco/Y2K chrome |
| Constrain expressive texture | Apply noise, halftone or scanlines globally |
| Maintain component semantics | Make decoration look indistinguishable from controls |
| Preserve user task order in bento layouts | Let tile size imply importance accidentally |
| Use monospace where meaningful | Render all long-form text in monospace by default |
| Validate print/export states | Assume neon/glass/dark layouts survive printing |

---

# 8. Checklist

A style implementation conforms only when:

- [ ] The style is expressed primarily through tokens.
- [ ] shadcn component semantics remain intact.
- [ ] Normal text contrast meets WCAG AA.
- [ ] Essential graphical/UI information meets applicable non-text contrast requirements.
- [ ] Focus is visible and not visually suppressed.
- [ ] Colour is not the only carrier of meaning.
- [ ] Text remains usable at 200% resizing.
- [ ] Responsive reflow preserves content and functionality.
- [ ] Decorative textures do not reduce text readability.
- [ ] Body copy remains readable even when display typography is highly expressive.
- [ ] Motion honours reduced-motion preferences.
- [ ] Flashing/glitch effects remain within accessibility safety constraints.
- [ ] Status colours maintain consistent semantics.
- [ ] Error and validation behaviour matches Forms & Validation standards.
- [ ] Security warnings and destructive actions remain explicit regardless of style.
- [ ] State changes remain understandable without animation.
- [ ] Data visualisation uses redundant encodings where needed.
- [ ] Data colours do not distort quantitative ordering.
- [ ] Map styles preserve critical routes, labels and boundaries.
- [ ] Images never replace required instructional text.
- [ ] Dark mode is independently tested rather than automatically inverted.
- [ ] High-contrast/forced-colour behaviour remains usable.
- [ ] Print/export rendering remains understandable where applicable.
- [ ] Typography supports required scripts/locales.
- [ ] Numeric interfaces use appropriate numeral features.
- [ ] Performance budgets account for blur, large images, 3D and texture assets.
- [ ] Style assets do not introduce unnecessary third-party network dependencies.
- [ ] User-generated imagery is tested against overlays such as glass or text-on-image.
- [ ] No visual treatment changes API, persistence, validation or state semantics.
- [ ] Visual-regression tests cover the theme.
- [ ] Accessibility testing covers the theme independently.
- [ ] The style has been validated against the actual audience and product context.

WCAG remains the normative accessibility reference behind these release checks. (https://www.w3.org/TR/WCAG22/)

---

# 9. Canonical Summary

**1. Styles are token recipes, not component architectures.**  
The same button, input, card, dialog and table SHOULD survive every catalogue style through semantic remapping. shadcn's CSS-variable model is the baseline implementation contract. (https://ui.shadcn.com/docs/theming)

**2. Accessibility does not vary with the aesthetic.**  
Brutalism, minimalism, glassmorphism, dark-luxe and government interfaces are all subject to the same contrast, colour, resizing, reflow and focus rules. (https://www.w3.org/TR/WCAG22/)

**3. Functional colours are not decorative colours.**  
Errors, focus, links, selected states and warnings MUST retain stable semantic meaning. GOV.UK's functional-colour approach and Carbon's role-based tokens illustrate this principle. (https://design-system.service.gov.uk/styles/colour/) (https://carbondesignsystem.com/elements/color/overview/)

**4. Expressive systems still require structure.**  
Material 3 demonstrates that expressive colour, shape and motion can sit on top of systematic theme roles rather than replacing them. (https://developer.android.com/develop/ui/compose/designsystems/material3)

**5. High-risk visual styles need explicit mitigation.**  
Glassmorphism, neumorphism, vaporwave, cyberpunk and similar styles are not prohibited; their reliance on transparency, low-contrast depth, glow or movement simply creates more failure modes that MUST be tested against the same accessibility rules. (https://www.w3.org/TR/WCAG22/)

**6. Data aesthetics follow data meaning.**  
A data-first or geospatial product MUST prioritise correct quantitative/spatial encoding over decorative palette coherence. Accessible charts SHOULD combine colour with patterns, labels, shape or other redundant encodings. (https://www.smashingmagazine.com/2022/07/accessibility-first-approach-chart-visual-design/)

**7. A strong design language is systematic.**  
Colour, typography, shapes, imagery and other visual primitives SHOULD form a coherent, repeatable language rather than a collection of independent page treatments. (https://www.smashingmagazine.com/2020/03/visual-design-language-building-blocks/)

**8. Choose from product context, not fashion.**  
Government and regulated products benefit from explicit functional hierarchy; analytical products from dataviz-first structure; narrative products from editorial systems; highly expressive consumer contexts can absorb greater stylistic novelty.

**9. Style MUST remain subordinate to meaning.**  
Security warnings, validation errors, data values, navigation, actions and system state keep their semantic contracts regardless of visual theme.

**10. The Gold Standard is reproducibility.**  
A developer should be able to reproduce the selected style by changing documented colour, type, space, radius, elevation, motion, imagery and texture tokens—not by interpreting a mood board from scratch.

---

# 10. Sources

1. **W3C — Web Content Accessibility Guidelines (WCAG) 2.2**  
   https://www.w3.org/TR/WCAG22/

2. **Material Design 3 in Compose — Android Developers**  
   https://developer.android.com/develop/ui/compose/designsystems/material3

3. **Material Design 3 — Colour overview**  
   https://m3.material.io/styles/color/overview

4. **GOV.UK Design System — Colour**  
   https://design-system.service.gov.uk/styles/colour/

5. **IBM Carbon Design System — Colour**  
   https://carbondesignsystem.com/elements/color/overview/

6. **shadcn/ui — Theming**  
   https://ui.shadcn.com/docs/theming

7. **Adobe Spectrum — Inclusive design**  
   https://spectrum.adobe.com/page/inclusive-design/

8. **Smashing Magazine — Visual Design Language: The Building Blocks of Design**  
   https://www.smashingmagazine.com/2020/03/visual-design-language-building-blocks/

9. **Smashing Magazine — An Accessibility-First Approach to Chart Visual Design**  
   https://www.smashingmagazine.com/2022/07/accessibility-first-approach-chart-visual-design/

10. **Smashing Magazine — A Complete Guide to Accessible Front-End Components**  
    https://www.smashingmagazine.com/2021/03/complete-guide-accessible-front-end-components/

11. **Smashing Magazine — Inclusive Dark Mode**  
    https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/

The catalogue contains **28 reproducible styles**, with explicit implementation risk rather than treating visual movements as mood-board labels only.
