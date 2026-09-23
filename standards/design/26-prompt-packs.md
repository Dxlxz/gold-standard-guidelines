---
id: "prompt-packs"
title: "Ready-to-Use Visual Prompt Packs"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "prompt", "ready", "use", "visual"]
applies_to: ["ui", "ai"]
related: ["prompt-engineering", "image-prompt-engineering"]
legacy_number: 106
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 76201
provenance: baseline

---

Research was completed with Firecrawl using current primary guidance from OpenAI, Midjourney, W3C/WAI, Apple HIG, IBM Carbon, Adobe Spectrum and shadcn/ui. The packs below use **model-portable creative prompts**; model-specific negative/parameter syntax is isolated so teams do not accidentally paste Midjourney syntax into FLUX or GPT Image.

# Ready-to-Use Visual Prompt Packs — Gold Standard 2026

**Status:** Canonical production library  
**Scope:** Recurring generated visual assets for product, marketing, documentation and geospatial/environmental interfaces  
**Baseline:** Design Tokens + Accessibility + Brand + Image Prompt Engineering standards; shadcn/ui component baseline  
**Conformance language:** **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, **MAY**

---

# 1. Purpose

This catalogue provides **copy-paste production prompt packs** for the visual assets product teams repeatedly need:

1. Hero and marketing imagery
2. Empty-state and error-state illustrations
3. Blog/article covers
4. OG/social share cards
5. Background textures and patterns
6. Icon sets
7. Avatar/profile placeholders
8. Product UI mockups and device screenshots
9. Dashboard/data-visualisation accents
10. Onboarding and feature-announcement spot art
11. Geospatial/environmental visual assets
12. Seasonal and campaign variants

The objective is repeatability. Teams SHOULD begin from these packs rather than composing unrelated prompts from scratch.

The prompts intentionally follow the current OpenAI image-prompting pattern of stating the required deliverable, subject, composition, style and constraints explicitly. OpenAI also recommends giving important placement constraints and maintaining a readable structured format for complex production prompts.  
https://developers.openai.com/api/docs/guides/image-prompting

Generated assets MUST remain downstream of the Design Tokens system. shadcn/ui exposes semantic roles including `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `border`, `ring` and chart tokens; generated artwork SHOULD reference these roles rather than creating an unrelated colour universe.  
https://ui.shadcn.com/docs/theming

Generated images MUST follow the same accessibility rules as manually created imagery. W3C distinguishes decorative, informative, functional and complex images, and requires their alternatives to reflect how the image is actually used.  
https://www.w3.org/WAI/tutorials/images/

---

# 2. Rules

## 2.1 Canonical palette contract

All packs use these semantic placeholders:

```text
{background}
{foreground}
{primary}
{primary-dark}
{secondary}
{accent}
{muted}
{muted-foreground}
{border}

{chart-1}
{chart-2}
{chart-3}
{chart-4}
{chart-5}
```

A project MUST replace them with the **resolved production design-token values**.

Reference palette used in the examples:

| Token | Example |
|---|---|
| `{background}` | `#FAFAF8` |
| `{foreground}` | `#172033` |
| `{primary}` | `#2563EB` |
| `{primary-dark}` | `#1D4ED8` |
| `{secondary}` | `#0F766E` |
| `{accent}` | `#D97706` |
| `{muted}` | `#E8EDF2` |
| `{muted-foreground}` | `#64748B` |
| `{border}` | `#CBD5E1` |
| `{chart-1}` | `#2563EB` |
| `{chart-2}` | `#0F766E` |
| `{chart-3}` | `#7C3AED` |
| `{chart-4}` | `#D97706` |
| `{chart-5}` | `#DC2626` |

The token names are canonical. The sample hex values are not.

---

## 2.2 Token instructions inside prompts

Preferred:

```text
Use the product palette:
primary #2563EB,
secondary #0F766E,
foreground #172033,
warm background #FAFAF8.

Primary and secondary are accents.
Do not introduce unrelated purple, pink or neon colours.
```

Avoid:

```text
Use brand colours.
```

where the model has no way to know what those colours are.

---

## 2.3 Real UI text stays real UI text

Generated images SHOULD NOT contain:

```text
headings
CTA labels
prices
form labels
legal text
product data
chart labels
dashboard values
navigation
error messages
```

unless the image is specifically an illustration of printed material.

OpenAI currently supports text rendering and recommends putting exact required wording in quotes, but spelling and legibility still require inspection.  
https://developers.openai.com/api/docs/guides/image-prompting

For production UI:

```text
generate image
+
overlay exact HTML/CSS/SVG text
```

is the preferred pattern.

---

## 2.4 Ready-text syntax

Every pack contains a **Ready Text Area** with:

```text
PROMPT
NEGATIVE
PARAMETERS
```

`PROMPT` is portable natural language.

`NEGATIVE` is intended for Stable Diffusion-class systems that support negative prompts.

For GPT Image, convert the relevant negative conditions into natural-language constraints such as:

```text
Do not add text, logos or watermarks.
```

For current FLUX.2, **do not use a negative-prompt field**; express desired conditions positively because current FLUX.2 documentation states that negative prompts are not supported.

For Midjourney, use the supplied parameter suffix and its `--no` exclusions where shown.

Midjourney parameters belong at the end of the descriptive prompt. Current parameters include `--ar`, `--stylize`, `--chaos`, `--seed`, `--sref`, `--raw`, and `--no`.  
https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List

---

## 2.5 Canonical export rule

Generated source files MUST NOT automatically become web delivery files.

Canonical pipeline:

```text
generated master
→ approved crop
→ optional deterministic grade
→ retouch
→ responsive variants
→ AVIF/WebP
→ PNG only where lossless/alpha is needed
→ SVG only after real vector cleanup
```

---

# 3. Pack 01 — Hero & Marketing Imagery

## 3.1 Purpose

Use for:

```text
homepage hero
product landing pages
campaign hero
feature-page masthead
sales microsites
customer-story intro
```

Hero imagery MUST leave planned space for real HTML copy.

OpenAI's current prompt guidance explicitly recommends specifying composition, aspect ratio and placement constraints rather than asking only for a subject or style.  
https://developers.openai.com/api/docs/guides/image-prompting

## 3.2 Aspect ratios and exports

| Use | Ratio | Master | Delivery |
|---|---:|---:|---:|
| Wide desktop hero | 16:9 | 2048×1152 | 1600w / 1200w / 800w |
| Editorial hero | 3:2 | 1800×1200 | 1440w / 960w |
| Tall campaign | 4:5 | 1600×2000 | 1080×1350 |
| Mobile alternate | 4:5 | 1600×2000 | 800×1000 |

A separate mobile crop SHOULD be used if the desktop safe area does not survive responsive cropping.

---

## 3.3 Palette

Use:

```text
background / muted as dominant field
foreground for dark structural forms
primary and secondary as controlled accents
accent ≤ approximately 10% of visual area
```

Do not turn every brand colour into equal-area chroma.

---

## 3.4 Variant A — Product-in-context photography

```text
Create a wide editorial hero photograph for a modern B2B product website.

Show exactly two professionals using a tablet together in a real working environment related to the product domain. Their interaction should feel natural and observational rather than posed advertising photography.

Composition: 16:9 landscape. Place the people and primary visual activity within the rightmost 45 percent of the frame. Keep the leftmost 40 percent intentionally calm, low-detail and suitable for a large HTML headline and two CTA buttons. Do not place faces, hands, high-contrast objects or signage inside that text-safe area.

Visual treatment: contemporary editorial photography, credible workplace detail, natural body language, realistic skin and fabric texture, understated premium quality, no generic corporate handshake imagery.

Palette: deep foreground #172033, primary blue #2563EB and secondary teal #0F766E used only in subtle equipment or wardrobe details, warm background neutrals around #FAFAF8. No unrelated neon palette.

Lighting: soft directional daylight, natural dynamic range, subtle shadows, no exaggerated orange-and-teal cinema grade.

Camera cue: eye-level 35mm environmental framing, moderate depth of field.

No visible text, brand logos, watermarks, fictional interfaces or signage.
```

---

## 3.5 Variant B — Product metaphor illustration

```text
Create a wide conceptual illustration for the hero of a sophisticated software platform.

Visual metaphor: many complex signals are being organised into one clear structured system. Represent this with layered geometric streams entering from the outer edges and resolving into a calm ordered central structure.

Style: editorial vector illustration with a small amount of tactile screen-print texture; precise geometry, restrained visual density, intelligent rather than playful, no cartoon characters.

Composition: 16:9 landscape. Concentrate the visual metaphor on the right half. Keep the left 40 percent visually quiet for real HTML headline text. Maintain generous negative space.

Palette: background #FAFAF8, foreground #172033, primary #2563EB, secondary #0F766E, accent #D97706 used sparingly. No gradients unless very subtle and structural.

Edges should be clean and reproducible. No typography, letters, logos, user-interface screenshots or decorative blobs.
```

---

## 3.6 Variant C — Abstract material hero

```text
Create a premium abstract hero image for a modern software brand.

Subject: interlocking sheets, translucent mineral-like planes and precise matte geometric forms suggesting layers of data and systems working together.

Composition: wide 16:9 landscape. Build visual density in the right half and leave the left 40 percent smooth and dark enough for light HTML text. Preserve an uncluttered central horizon.

Materials: matte ceramic, translucent glass-like planes and fine paper surfaces; realistic but not hyper-glossy.

Palette: foreground navy #172033, primary #2563EB, secondary teal #0F766E, warm off-white #FAFAF8. Use colour in large coherent fields, not rainbow reflections.

Lighting: broad soft studio light with controlled reflections and subtle depth.

No text, no logos, no watermark, no floating UI screens, no sci-fi holograms.
```

---

## 3.7 Do / Don't

**Do**

- reserve a copy-safe region;
- put the visual focus away from text;
- generate at the intended aspect ratio;
- keep brand colours controlled;
- validate the mobile crop.

**Don't**

- embed the page headline;
- use generic “business people shaking hands” imagery;
- put important faces at edges;
- depend on a dark overlay to fix chaotic composition;
- generate fictional dashboards inside the hero.

---

## 3.8 Ready Text Area

```text
PROMPT:
Create a wide editorial hero photograph for a modern B2B product website. Show exactly two professionals using a tablet together in a credible real working environment. Composition: 16:9 landscape, people and activity within the rightmost 45 percent, leftmost 40 percent intentionally calm and low-detail for an HTML headline and CTA buttons. Contemporary editorial photography, natural body language, realistic skin and fabric texture, understated premium treatment. Palette: foreground #172033, primary #2563EB, secondary #0F766E, warm neutral #FAFAF8. Soft natural daylight, eye-level 35mm environmental framing, moderate depth of field. No visible text, logos, watermarks, signage or fictional interfaces.

NEGATIVE:
text, watermark, logo, signature, distorted hands, extra fingers, extra limbs, duplicate people, plastic skin, oversaturated neon, holograms, generic corporate handshake, fake UI

PARAMETERS:
--ar 16:9 --stylize 60 --chaos 4 --seed 51021 --no text watermark logo signature
```

---

# 4. Pack 02 — Empty-State & Error-State Illustrations

## 4.1 Purpose

Use for:

```text
no results
no projects
no notifications
first-run empty states
offline/error pages
permission errors
failed imports
```

The illustration MUST support the state; the explanation and recovery action MUST remain real UI.

Decorative empty-state artwork should normally use `alt=""` when adjacent HTML already communicates the state. W3C explicitly recommends a null alternative for decorative images.  
https://www.w3.org/WAI/tutorials/images/

---

## 4.2 Visual language

Avoid meaningless:

```text
blobs
floating spheres
random confetti
generic astronauts
sad broken robots
```

unless they are part of the actual product brand.

Prefer metaphors tied directly to the user task.

---

## 4.3 Aspect ratios and exports

| Context | Ratio | Master | Delivery |
|---|---:|---:|---:|
| Card empty state | 4:3 | 1200×900 | 480×360 |
| Full-page state | 3:2 | 1536×1024 | 768×512 |
| Compact sidebar state | 1:1 | 1024×1024 | 256×256 |

Transparent PNG/WebP is preferred if the illustration floats within existing shadcn cards or empty-state layouts.

---

## 4.4 Variant A — No results

```text
Create a friendly editorial vector illustration for a product empty state meaning “no matching results”.

Show a precise filing tray containing several neatly arranged index cards, with one small magnifying glass resting beside the tray. The cards are visibly blank — do not generate text or symbols.

Style: clean geometric vector illustration, mature SaaS visual language, subtle human warmth, no cartoon face, no generic abstract blobs.

Palette: foreground #172033, primary #2563EB, secondary #0F766E, muted #E8EDF2, background #FAFAF8. Use primary blue only for the magnifying-glass detail.

Composition: centred compact object group with generous transparent space around it.

No text, numbers, watermark or logo. Transparent background.
```

---

## 4.5 Variant B — No projects yet

```text
Create a compact product illustration representing an empty workspace before the first project has been created.

Show an open modular work tray containing a ruler, two blank cards and one small empty folder, arranged carefully as if ready for work to begin.

Style: editorial isometric illustration with simple dimensional forms, restrained detail, professional and optimistic rather than childish.

Palette: #172033 structural outlines, #FAFAF8 light surfaces, #2563EB primary accent, #0F766E secondary accent. Keep the overall chroma low.

Composition: 4:3, centred, ample blank perimeter for use in a shadcn Empty component.

No lettering, no floating icons, no faces, no text labels, no logos. Transparent background.
```

---

## 4.6 Variant C — Error / retry

```text
Create an error-state illustration for a professional web application.

Metaphor: two precise modular connectors are almost aligned but one is slightly disconnected, showing an interrupted system that can be reconnected. Keep the image calm; do not imply catastrophe or data loss.

Style: clean technical illustration, flat geometric forms with subtle depth, no anthropomorphic sad robot.

Palette: foreground #172033, muted #E8EDF2, primary #2563EB, one restrained error accent #DC2626 occupying less than 8 percent of the illustration.

Composition: 4:3 with the focal object centred.

No text, exclamation words, fake UI, warning labels, broken glass or dramatic explosion. Transparent background.
```

---

## 4.7 Do / Don't

**Do**

- illustrate the specific state;
- keep illustration secondary to the recovery action;
- use transparent backgrounds where practical;
- provide calm error metaphors.

**Don't**

- represent every state with a smiling blob;
- make an error visually catastrophic;
- encode the entire error explanation inside the art;
- make permission-denied imagery shame the user.

---

## 4.8 Ready Text Area

```text
PROMPT:
Create a friendly editorial vector illustration for a product empty state meaning no matching results. Show a precise filing tray containing several neatly arranged blank index cards, with one small magnifying glass beside the tray. Clean geometric vector style, mature SaaS visual language, subtle warmth, no cartoon face and no abstract blobs. Palette: foreground #172033, primary #2563EB, secondary #0F766E, muted #E8EDF2, background #FAFAF8. Centred compact composition with generous empty space. Transparent background. No text, numbers, logo or watermark.

NEGATIVE:
text, letters, logo, watermark, faces, cartoon robot, random blob, gradient blob, confetti, excessive 3D, clutter, pseudo-text

PARAMETERS:
--ar 4:3 --stylize 45 --chaos 3 --seed 28014 --no text letters logo watermark
```

---

# 5. Pack 03 — Blog & Article Cover Series

## 5.1 Purpose

Use for:

```text
blog index cards
article hero
research notes
release posts
case studies
technical essays
```

A series MUST be recognisable before the reader sees the title.

---

## 5.2 Series system

Lock:

```text
composition frame
palette
illustration medium
texture
line treatment
subject scale
negative-space strategy
```

Vary only:

```text
central metaphor
accent allocation
secondary form
```

---

## 5.3 Aspect ratios and exports

Canonical:

```text
article hero: 3:2 — 1800×1200
listing card: 16:10 — 1280×800
social crop: 1200×630 composed separately if text is added
```

---

## 5.4 Variant A — Geometric editorial series

```text
Create an editorial cover illustration for an article about [TOPIC].

Use the house article-series system:
warm off-white #FAFAF8 background,
dark ink #172033,
primary blue #2563EB,
secondary teal #0F766E,
one small amber accent #D97706.

Create one clear visual metaphor for [TOPIC] using only simple geometric forms, layered paper-like planes and thin technical linework.

Composition: 3:2 landscape. One large focal form occupies roughly 55 percent of the frame. Maintain generous empty perimeter. No title text inside the artwork.

Texture: subtle monochrome paper grain at low visual strength.

Style: sophisticated editorial illustration, precise and conceptual, not childish, not generic stock vector art.

No typography, letters, watermark, logo or fake UI.
```

---

## 5.5 Variant B — Technical collage series

```text
Create a repeatable editorial article-cover image about [TOPIC].

Visual language: technical collage combining one simplified object related to the topic, one diagram-like contour layer and one cropped photographic texture. The image should feel like a contemporary research journal rather than a marketing advertisement.

Palette locked to #172033, #FAFAF8, #2563EB and #0F766E with no additional chromatic colours.

Composition: 3:2, object slightly off-centre, strong grid, generous negative space, controlled asymmetry.

Surface: subtle printed grain and halftone texture; crisp enough for web.

Do not include words, fake labels, logos, UI screenshots or decorative tech circuitry.
```

---

## 5.6 Variant C — Single-object conceptual photography

```text
Create a conceptual editorial photograph for an article about [TOPIC].

Show one carefully constructed physical tabletop metaphor that communicates the topic using real materials such as paper, wire, translucent acrylic, stone or wood. The metaphor should be intelligent and understated rather than literal stock imagery.

Composition: 3:2 landscape, top-down or shallow three-quarter studio view, single focal arrangement, large clean negative space.

Palette: warm background #FAFAF8, foreground objects #172033, selective blue #2563EB and teal #0F766E details only.

Lighting: soft directional studio light, visible material texture, natural shadows.

No text, handwriting, labels, logos or watermarks.
```

---

## 5.7 Do / Don't

**Do**

- use one stable art direction across the series;
- change metaphor, not entire style;
- store a style reference;
- keep title outside artwork.

**Don't**

- generate one photographic cover, then one neon 3D cover, then one cartoon;
- use random “AI thought cloud” imagery;
- require the reader to decipher text embedded in the image.

---

## 5.8 Ready Text Area

```text
PROMPT:
Create an editorial cover illustration for an article about [TOPIC]. House series: warm off-white #FAFAF8 background, dark ink #172033, primary blue #2563EB, secondary teal #0F766E, one small amber accent #D97706. Create one clear conceptual metaphor for [TOPIC] using simple geometric forms, layered paper-like planes and thin technical linework. Composition: 3:2 landscape, one large focal form occupying roughly 55 percent of the frame, generous empty perimeter. Subtle monochrome paper grain. Sophisticated contemporary editorial illustration. No title or typography inside the artwork, no logo, watermark, fake labels or UI.

NEGATIVE:
text, title, logo, watermark, generic stock illustration, gradient blob, cartoon mascot, neon cyberpunk, fake UI, illegible labels

PARAMETERS:
--ar 3:2 --stylize 90 --chaos 6 --seed 77102 --no text title logo watermark
```

---

# 6. Pack 04 — OG & Social Share Cards

## 6.1 Purpose

Use for:

```text
Open Graph previews
LinkedIn shares
X/social cards
documentation shares
release announcement cards
```

The **image model generates the visual layer only**.

Title, product logo, date, category and attribution MUST normally be overlaid deterministically after generation.

---

## 6.2 Safe zones

Canonical internal safe-zone rule for a 1200×630 card:

```text
outer safety: 60px
primary text region: left 60–720px
art region: right 720–1140px
logo zone: top-left or bottom-left, reserved in layout
```

This is a house standard, not a universal platform requirement.

---

## 6.3 Exports

```text
canonical master: 1200×630
2x internal source if needed: 2400×1260
delivery: 1200×630 JPEG/WebP/PNG as required
```

---

## 6.4 Variant A — Abstract side illustration

```text
Create the background illustration for a professional Open Graph share card.

Canvas ratio 1200:630. Keep the entire left 58 percent extremely calm, flat and low-detail for real overlaid heading text. Concentrate the illustration in the right 38 percent.

Visual concept: layered geometric forms representing connected systems and structured information.

Style: editorial vector artwork with subtle tactile grain.

Palette: background #FAFAF8, foreground #172033, primary #2563EB, secondary #0F766E. No more than four chromatic values.

Do not generate any text, letters, numbers, logos, watermarks, icons or interface screenshots.
```

---

## 6.5 Variant B — Atmospheric photo card

```text
Create a restrained editorial photograph intended only as the visual background of an Open Graph card.

Composition: 1200:630 landscape. Place the visual subject entirely in the rightmost 40 percent. The left 55 percent must be a smooth, low-detail dark field suitable for large white HTML-rendered text.

Subject: [SUBJECT].

Lighting: sophisticated low-key natural light with believable textures, no oversaturated advertising look.

Palette: dark navy #172033, subtle primary blue #2563EB and teal #0F766E accents.

No text, signage, logos, watermark, poster typography or fake UI.
```

---

## 6.6 Variant C — Article-series OG

```text
Create an Open Graph background using the same visual language as our editorial article-cover series.

Topic metaphor: [TOPIC].

Use warm paper #FAFAF8, dark ink #172033, primary #2563EB and secondary #0F766E.

Keep the left 60 percent largely empty and uniform for real headline text. Put the metaphor in the right third using layered paper planes, geometric linework and subtle print grain.

The result should feel like a designed editorial card before typography is added.

No generated text or logo.
```

---

## 6.7 Do / Don't

**Do**

- render title/logo separately;
- leave real safe zones;
- test long titles;
- test dark/light foreground choice.

**Don't**

- ask the image model to typeset a four-line headline;
- put key artwork under the future title;
- rely on social platform crops to preserve edge content.

---

## 6.8 Ready Text Area

```text
PROMPT:
Create the background illustration for a professional Open Graph share card. Canvas ratio 1200:630. Keep the left 58 percent extremely calm, flat and low-detail for real overlaid heading text; concentrate all illustration in the right 38 percent. Show layered geometric forms representing connected systems and structured information. Contemporary editorial vector artwork with subtle tactile grain. Palette: background #FAFAF8, foreground #172033, primary #2563EB, secondary #0F766E. No more than four chromatic values. Do not generate text, letters, numbers, logos, watermarks, icons or interface screenshots.

NEGATIVE:
text, headline, letters, numbers, logo, watermark, fake interface, busy left side, centered focal point, clutter

PARAMETERS:
--ar 40:21 --stylize 70 --chaos 3 --seed 89013 --no text letters numbers logo watermark
```

---

# 7. Pack 05 — Background Textures & Subtle Patterns

## 7.1 Purpose

Use for:

```text
hero atmosphere
card backgrounds
editorial sections
marketing bands
map panels
print-like campaign treatments
```

Texture MUST remain subordinate to content.

---

## 7.2 Production opacity

Canonical starting ranges:

| Texture | UI opacity |
|---|---:|
| Fine noise | 2–5% |
| Grid | 4–8% |
| Contour/topographic | 4–10% |
| Halftone | 3–8% |
| Paper grain | 2–6% |

These are internal starting points. Final contrast MUST be visually tested.

---

## 7.3 Variant A — Fine monochrome noise

```text
Create a seamless monochrome micro-grain texture for a premium software interface.

Texture should resemble extremely fine uncoated paper grain mixed with subtle digital film noise. Uniform density with no visible clusters, stains, scratches or directional lighting.

Base colour neutral mid-gray so the texture can be blended by CSS.

No objects, no edges, no gradients, no typography, no watermark.

Perfectly tileable in every direction.
```

---

## 7.4 Variant B — Technical grid

```text
Create a seamless technical grid pattern for a data-product background.

Geometry: precise square grid with one major line every eight minor cells. Very fine line weight, perfectly regular spacing, no perspective, no distortion.

Use foreground #172033 on transparent or clean light background #FAFAF8. Keep the image visually subtle and functional.

No numbers, coordinates, labels, icons, text or decorative circuits.

Perfectly tileable.
```

---

## 7.5 Variant C — Topographic contours

```text
Create a seamless abstract topographic contour-line texture.

Use smooth nested elevation-like curves with varied but believable spacing. Lines must continue naturally across every tile edge so the pattern repeats without visible seams.

Style: clean cartographic linework, no labels, no elevation numbers, no roads, no place names.

Colour: single foreground tone #172033 on transparent background or #FAFAF8 field.

No filled regions. No map markers. No text.
```

---

## 7.6 Variant D — Halftone field

```text
Create a seamless monochrome halftone texture for editorial web use.

Use tiny circular dots with controlled changes in local density to form a subtle soft field, not a recognisable object or gradient illustration.

Single ink colour only, suitable for recolouring through CSS or image processing.

No text, no moire stripes, no hard bands, no watermark.

Perfectly tileable.
```

---

## 7.7 Do / Don't

**Do**

- use monochrome where possible;
- recolour deterministically;
- verify seamless edges;
- use CSS opacity/blend modes after export.

**Don't**

- bake 20% texture behind body copy;
- use noisy high-frequency texture around data tables;
- generate fake map labels in contour patterns.

---

## 7.8 Ready Text Area

```text
PROMPT:
Create a seamless abstract topographic contour-line texture. Smooth nested elevation-like curves with varied but believable spacing. Lines must continue naturally across every tile edge with no visible seams. Clean cartographic linework, one ink colour #172033 on a transparent or plain #FAFAF8 background. No filled regions, labels, elevation numbers, roads, place names, map markers or text. Perfectly tileable.

NEGATIVE:
text, labels, numbers, road, symbols, map pins, gradients, filled regions, perspective, seam, border, watermark

PARAMETERS:
--ar 1:1 --stylize 25 --chaos 2 --seed 44218 --tile --no text labels numbers markers
```

---

# 8. Pack 06 — Icon Set Generation

## 8.1 Purpose

Image generation SHOULD be used for:

```text
icon concept exploration
symbol-language discovery
unusual domain metaphors
illustrative icon families
```

Production interface icons SHOULD then be redrawn or cleaned as real SVG.

Apple recommends simple recognisable icons and consistency of size, level of detail, stroke weight and perspective across an icon system. Apple also notes that optical alignment may differ from purely geometric centring.  
https://developer.apple.com/design/human-interface-guidelines/icons

---

## 8.2 Canonical icon grid

House specification:

```text
canvas: 24×24
live area: 20×20
default stroke: 1.75px
round cap
round join
corner radius: 2px equivalent
no fill unless explicitly part of family
```

For terminal style:

```text
square caps MAY replace round caps
corner radius: 0–1px
monospace/terminal geometry
```

---

## 8.3 Variant A — Standard outline family

```text
Create a single sheet showing 12 consistent outline icon concepts for the following concepts:
[LIST OF 12 CONCEPTS].

All icons must use the same visual system:
24×24 conceptual grid,
20×20 live area,
1.75px-equivalent stroke,
round caps,
round joins,
approximately 2px corner radius,
no fill,
front-facing orthographic perspective,
minimal detail.

Arrange in a clean 4×3 matrix with equal visual weight and identical scale.

Use dark foreground #172033 on plain white.

Do not include text labels, numbers, shadows, 3D effects or decorative background.
```

---

## 8.4 Variant B — Technical/terminal icon family

```text
Create 12 interface icon concepts for a developer and infrastructure product:
[LIST].

Style: compact terminal-inspired monoline iconography.
24×24 grid, 20×20 live area, consistent 1.5px stroke, mostly square caps, sharp 0–1px-equivalent corners, orthographic geometry, no perspective distortion.

Icons should resemble a coherent technical command language rather than pixel-art illustrations.

Single colour #172033 on white.

No text, letters, UI panels, gradients, shadows or 3D.
```

---

## 8.5 Variant C — Filled micro-glyph family

```text
Create a coherent family of 12 simplified filled interface glyph concepts:
[LIST].

Each glyph must communicate one concept with the fewest possible shapes.

Use a 24×24 conceptual grid, strong silhouette, consistent optical weight, flat orthographic perspective, slightly softened 1.5px-equivalent internal corners.

Single solid #172033 only.

Arrange evenly in a 4×3 matrix.

No text labels, strokes of inconsistent weight, gradients, shadows or illustrative scenery.
```

---

## 8.6 Post-processing rules

Every generated icon MUST be:

1. redrawn/traced in SVG;
2. snapped to the canonical grid;
3. reduced to minimal nodes;
4. normalised to the agreed stroke;
5. checked at 16px, 20px and 24px;
6. optically centred;
7. compared side-by-side with the entire family;
8. given a semantic name;
9. provided with accessible labeling when functional.

Apple specifically recommends vector assets for scalable custom interface icons.  
https://developer.apple.com/design/human-interface-guidelines/icons

---

## 8.7 Do / Don't

**Do**

- generate the entire family together when exploring;
- specify grid/stroke/perspective;
- redraw final assets.

**Don't**

- ship raster AI icons;
- auto-trace and accept 300 nodes;
- mix outline and filled systems accidentally;
- use AI-created pseudo-symbols for familiar actions where standard icons exist.

---

## 8.8 Ready Text Area

```text
PROMPT:
Create a single sheet showing 12 consistent outline icon concepts for: [LIST]. Use one strict icon system: 24×24 conceptual grid, 20×20 live area, 1.75px-equivalent stroke, round caps, round joins, approximately 2px corner radius, no fill, front-facing orthographic perspective and minimal detail. Arrange the icons in a clean 4×3 matrix with equal optical weight and consistent scale. Dark foreground #172033 on white. No text labels, numbers, shadows, gradients, 3D effects or decorative background.

NEGATIVE:
text, labels, inconsistent stroke, filled icons, 3D, shadow, gradient, perspective, clipart, overly detailed illustration, watermark

PARAMETERS:
--ar 4:3 --stylize 20 --chaos 1 --seed 24024 --raw --no text labels shadows gradients
```

---

# 9. Pack 07 — Avatar & Profile Placeholders

## 9.1 Purpose

Use when no real user avatar is available.

The preferred application default SHOULD normally be a deterministic initials or abstract placeholder generated in code.

Generated portrait placeholders MAY be used when a product intentionally uses illustrated personas.

They MUST NOT imply that a synthetic portrait represents a real customer.

---

## 9.2 Diversity rule

An avatar library SHOULD include variation across:

```text
skin tone
age
face shape
hair texture/style
head coverings
glasses
facial hair
presentation
```

without assigning:

```text
job
personality
wealth
technical competence
health
criminality
religion
nationality
```

based on appearance.

---

## 9.3 Aspect ratios and exports

```text
source: 1:1
master: 1024×1024
delivery: 256×256 / 128×128 / 64×64
```

---

## 9.4 Variant A — Illustrated portraits

```text
Create a coherent set of 12 fictional illustrated profile portraits for a professional collaboration application.

Each portrait shows one unique fictional adult from shoulders upward, facing mostly forward with a relaxed neutral or lightly positive expression.

Represent broad human variation naturally across age, skin tone, hair texture, hairstyles, face shape, glasses, facial hair and optional head coverings. Do not associate visual traits with professions or personality stereotypes.

Style: clean editorial illustration, simplified but recognisably human, consistent facial proportions and line treatment across the full set.

Backgrounds use muted token colours derived from #E8EDF2, #2563EB and #0F766E while maintaining clear face separation.

No text, uniforms, national symbols, corporate logos or exaggerated caricatures.
```

---

## 9.5 Variant B — Abstract non-human placeholders

```text
Create a family of 16 abstract profile-placeholder symbols that do not depict human faces.

Each placeholder should consist of two or three simple geometric forms suggesting an identity token without implying age, gender, ethnicity or profession.

Style: minimal flat vector, strong silhouette, coherent family.

Use combinations drawn from muted #E8EDF2, primary #2563EB, secondary #0F766E and foreground #172033.

1:1 square compositions, no letters, numbers, faces or logos.
```

---

## 9.6 Variant C — Paper-cut persona family

```text
Create a coherent set of 12 fictional profile illustrations using a paper-cut editorial style.

One individual per square, shoulder-up framing, neutral clothing without branding, natural variation across age, skin tone, hair, facial shape and accessories.

Use the same simplified shape language, lighting direction and paper texture across every avatar.

Palette limited to #172033, #FAFAF8, #2563EB, #0F766E, muted terracotta and warm neutral skin ranges.

Avoid caricature, stereotypes, exaggerated facial features, text, uniforms and occupational props.
```

---

## 9.7 Do / Don't

**Do**

- state that portraits are fictional internally;
- build one coherent family;
- diversify without symbolic stereotyping.

**Don't**

- generate “CEO avatar,” “criminal avatar,” etc. through appearance;
- use synthetic faces as customer testimonials;
- imitate a real person without permission.

---

## 9.8 Ready Text Area

```text
PROMPT:
Create a coherent set of 12 fictional illustrated profile portraits for a professional collaboration application. One unique fictional adult per portrait, shoulders upward, relaxed neutral or lightly positive expression. Represent broad human variation naturally across age, skin tone, hair texture and style, face shape, glasses, facial hair and optional head coverings. Do not associate traits with professions or personality stereotypes. Clean editorial illustration, simplified but recognisably human, consistent proportions and line treatment. Backgrounds use muted #E8EDF2, primary #2563EB and secondary #0F766E. No text, uniforms, national symbols, logos or caricatures.

NEGATIVE:
text, logo, uniform, national flag, stereotype, caricature, exaggerated facial feature, celebrity likeness, watermark, photorealistic stock photo

PARAMETERS:
--ar 1:1 --stylize 65 --chaos 8 --seed 63011 --no text logo uniform flag watermark
```

---

# 10. Pack 08 — Product UI Mockups & Device Screenshots

## 10.1 Purpose

Use for:

```text
landing-page product shots
documentation illustrations
presentation mockups
feature announcements
sales decks
```

Actual application UI MUST normally come from a real screenshot or deterministic render.

AI SHOULD generate the **context/device/environment**, not factual product data.

---

## 10.2 Aspect ratios

```text
desktop product shot: 16:10
wide landing panel: 16:9
mobile device mockup: 4:5 or 3:4
documentation inset: 4:3
```

---

## 10.3 Variant A — Laptop environment with compositing space

```text
Create a premium product-photography mockup containing an open modern laptop on a clean work surface.

The laptop screen must be a perfectly flat, uniform medium-gray rectangle with no generated interface, text, icon, reflection or content, because an exact product screenshot will be composited into it later.

Camera: three-quarter front view, screen plane clearly visible with minimal perspective distortion.

Environment: restrained professional workspace, one notebook and one small plant only.

Palette: warm #FAFAF8 environment, foreground #172033, subtle #2563EB detail.

Lighting: soft large-window studio daylight, realistic aluminium and glass materials.

No visible branding on the device, no fake UI, no text, watermark or logo.
```

---

## 10.4 Variant B — Floating browser frame for docs

```text
Create a clean neutral browser-window presentation frame for documentation imagery.

Show one large front-facing browser-like panel occupying approximately 80 percent of the canvas. The internal screen area must be a plain uniform #E8EDF2 rectangle reserved for compositing a real product screenshot.

Frame style: minimal physical depth, thin border, subtle shadow, approximately 10px visual corner radius, no traffic-light buttons or platform trademarks.

Background #FAFAF8.

No text, fake navigation, icons, browser brand, generated UI or watermark.
```

---

## 10.5 Variant C — Mobile device product shot

```text
Create a realistic but brand-neutral smartphone product mockup for a software landing page.

Device shown at a slight three-quarter angle but with the screen surface clearly readable. Screen must be an empty uniform chroma-neutral placeholder suitable for later perspective compositing of a real app screenshot.

Use a dark graphite device frame with no manufacturer marks.

Background: softly lit architectural surface in #FAFAF8 and muted gray.

Subtle brand-blue #2563EB environmental accent, not on the phone.

No generated application interface, no fake notifications, no text, logo or watermark.
```

---

## 10.6 Do / Don't

**Do**

- generate blank compositing planes;
- use actual screenshot pixels;
- match screenshot perspective in post;
- redact real customer data first.

**Don't**

- ask the model to “recreate our dashboard perfectly”;
- use hallucinated data as a product claim;
- include personally identifiable production data.

---

## 10.7 Ready Text Area

```text
PROMPT:
Create a premium product-photography mockup containing an open modern laptop on a clean work surface. The laptop screen must be a perfectly flat, uniform medium-gray rectangle with no generated interface, text, icons, reflection or content because an exact product screenshot will be composited into it later. Three-quarter front camera view with the screen plane clearly visible and minimal perspective distortion. Restrained professional workspace with one notebook and one small plant. Warm #FAFAF8 environment, foreground #172033 and one subtle #2563EB detail. Soft large-window studio daylight. Realistic aluminium and glass. No device branding, fake UI, text, logos or watermark.

NEGATIVE:
interface, UI, text, letters, dashboard, notification, logo, Apple logo, manufacturer branding, reflection across screen, warped screen, watermark

PARAMETERS:
--ar 16:10 --stylize 35 --chaos 2 --seed 81342 --raw --no text interface logo watermark
```

---

# 11. Pack 09 — Dashboard & Data-Visualisation Illustration Accents

## 11.1 Purpose

Use around, not instead of, actual charts.

Examples:

```text
dashboard empty region
analytics landing page
report introduction
chart section header
data feature marketing
```

Generated artwork MUST NOT resemble factual data if the data is fictional.

Carbon explicitly distinguishes categorical, sequential and diverging palettes according to data semantics and discourages inappropriate use of gradients for meaningful progression.  
https://carbondesignsystem.com/data-visualization/color-palettes/

---

## 11.2 Palette rule

Use chart tokens intentionally:

```text
categorical concept:
chart-1, chart-2, chart-3

sequential metaphor:
one hue, ordered lightness

diverging metaphor:
two hue families around neutral centre
```

Decorative accents MUST NOT redefine real chart semantics.

---

## 11.3 Variant A — Abstract analytical structure

```text
Create a compact editorial illustration representing data analysis without showing an actual chart.

Use a collection of precise vertical tiles, small dots and connecting rules gradually becoming more organised from left to right. It should suggest pattern recognition rather than encode numerical values.

Style: flat technical illustration, restrained dimensionality, no labels or axes.

Palette: #172033, chart-1 #2563EB, chart-2 #0F766E, chart-3 #7C3AED, muted #E8EDF2.

No fake numbers, chart titles, percentages, dashboard UI or legends.

Transparent background.
```

---

## 11.4 Variant B — Sequential-data metaphor

```text
Create a small product illustration suggesting increasing intensity across a dataset.

Use seven identical geometric cells arranged in one row, changing only through ordered lightness within one blue family. Do not change object size or imply arbitrary categorical meanings.

Style: clean technical editorial vector.

Palette should progress from very pale blue to deep #2563EB while retaining foreground #172033 structural details.

No numbers, axis, labels, percentages, graph paper or fake data.

Transparent background.
```

---

## 11.5 Variant C — Network relationships

```text
Create a compact illustration representing relationships between entities in an analytical system.

Show a sparse structured network of approximately nine geometric nodes connected by clean orthogonal and curved lines. Use variation in position and shape but no implied numeric values.

Palette: #172033 structural lines, #2563EB, #0F766E and #7C3AED for three conceptual categories.

Style: mature enterprise data illustration, not sci-fi.

No glowing neural network, no text, no numbers, no fake chart axes, no UI.
```

---

## 11.6 Do / Don't

**Do**

- distinguish illustration from data;
- use chart tokens;
- pair with real accessible charts when actual data is being communicated.

**Don't**

- make random fake line charts;
- add fake KPI values;
- use decorative rainbow palettes around analytical products.

---

## 11.7 Ready Text Area

```text
PROMPT:
Create a compact editorial illustration representing data analysis without showing an actual chart. Use precise vertical tiles, small dots and connecting rules gradually becoming more organised from left to right, suggesting pattern recognition without encoding numerical values. Flat technical illustration with restrained depth. Palette: foreground #172033, chart-1 #2563EB, chart-2 #0F766E, chart-3 #7C3AED and muted #E8EDF2. No fake numbers, chart titles, percentages, axes, legends, dashboard UI or text. Transparent background.

NEGATIVE:
chart labels, number, percentage, axis, legend, fake data, dashboard screenshot, neon network, hologram, text, watermark

PARAMETERS:
--ar 4:3 --stylize 35 --chaos 2 --seed 90514 --no text numbers percentages labels axes
```

---

# 12. Pack 10 — Onboarding & Feature-Announcement Spot Art

## 12.1 Purpose

Use for:

```text
welcome screen
feature tour
new-feature dialog
release banner
setup wizard
upgrade introduction
```

The art MUST remain secondary to the real product instructions.

---

## 12.2 Aspect ratios

```text
dialog/spot art: 4:3
onboarding panel: 3:2
full welcome panel: 4:5
banner accent: 3:1
```

---

## 12.3 Variant A — Welcome/setup

```text
Create a friendly onboarding spot illustration representing “your workspace is ready to set up”.

Show a modular tray containing three clearly separated empty modules waiting to be configured, with one small highlighted connector indicating the next step.

Style: clean editorial vector with slight physical depth, professional and welcoming, not childish.

Palette: #FAFAF8, #172033, #2563EB, #0F766E, muted #E8EDF2.

Composition: centred compact illustration with generous transparent perimeter.

No text, arrows with labels, confetti, faces, logo or watermark.
```

---

## 12.4 Variant B — New capability

```text
Create feature-announcement spot art representing a newly available capability.

Visual metaphor: an existing organised system of geometric modules gains one clearly differentiated new module that fits naturally into the established structure.

Style: sophisticated flat geometric illustration, controlled depth, precise alignment.

Use #172033 and #E8EDF2 for existing structure, primary #2563EB for the new module and secondary #0F766E as a tiny supporting accent.

Do not use gift boxes, fireworks, party confetti or “NEW” text.

Transparent background.
```

---

## 12.5 Variant C — Connected workflow

```text
Create a compact illustration representing a three-step workflow becoming connected.

Show three distinct modules aligned horizontally with one continuous path connecting them in sequence. Keep all modules different enough to read as separate stages while using the same geometric language.

Style: editorial technical illustration, approachable but restrained.

Palette: #172033, #FAFAF8, #2563EB, #0F766E and muted #E8EDF2.

No step numbers, text, arrows containing labels, interface screenshots, logos or watermark.
```

---

## 12.6 Do / Don't

**Do**

- map art to the feature concept;
- keep announcement art compact;
- use one identifiable highlight element.

**Don't**

- use confetti for every feature;
- create fictional screenshots;
- hide setup instructions inside illustration.

---

## 12.7 Ready Text Area

```text
PROMPT:
Create feature-announcement spot art representing a newly available capability. Show an existing organised system of geometric modules gaining one clearly differentiated new module that fits naturally into the structure. Sophisticated flat geometric illustration with controlled depth and precise alignment. Existing structure uses #172033 and muted #E8EDF2; the new module uses primary #2563EB with secondary #0F766E as a tiny supporting accent. Compact centred composition with transparent background. No gift box, fireworks, party confetti, NEW text, UI screenshot, logo or watermark.

NEGATIVE:
text, NEW, confetti, fireworks, gift box, celebration emoji, fake UI, logo, watermark, cartoon character, gradient blob

PARAMETERS:
--ar 4:3 --stylize 50 --chaos 3 --seed 35420 --no text confetti fireworks logo watermark
```

---

# 13. Pack 11 — Geospatial & Environmental Domain

## 13.1 Purpose

Use for:

```text
GIS product marketing
climate applications
forestry
water management
agriculture
land-cover products
environmental reports
map onboarding
geospatial feature art
```

Generated geographic imagery MUST NOT be presented as genuine satellite, aerial or sensor evidence.

It MUST be labelled illustrative where a user might reasonably mistake it for actual observed data.

---

## 13.2 Cartographic palette

Recommended domain mapping:

```text
forest:       #315C48
water:        #2C7BE5
earth:        #A47551
dry land:     #D8C39B
urban:        #8A8F98
foreground:   #172033
background:   #F4F1E8
```

For real data maps, use the actual data-visualisation palette contract rather than the decorative palette.

Carbon's guidance distinguishes categorical, sequential and diverging palette semantics; decorative map aesthetics MUST NOT override the correct semantics of real data.  
https://carbondesignsystem.com/data-visualization/color-palettes/

---

## 13.3 Variant A — Synthetic satellite-style composite

```text
Create a clearly illustrative synthetic satellite-style environmental composite for a geospatial product marketing page.

Show a fictional landscape containing forest canopy, a winding river, agricultural fields and a small urban edge viewed from directly overhead.

The image must look like a stylised environmental remote-sensing composite rather than authentic satellite evidence. Use coherent natural geometry but no real identifiable location.

Palette: forest #315C48, water #2C7BE5, earth #A47551, dry land #D8C39B, urban neutral #8A8F98.

No labels, roads with names, coordinates, map attribution, timestamps, cloud-service logos or sensor metadata.

No text. No claim of being real imagery.
```

---

## 13.4 Variant B — Land-cover texture family

```text
Create a set of six seamless land-cover textures for an environmental visualization system:

1. dense forest canopy
2. grassland
3. bare earth
4. agricultural crop rows
5. water surface
6. built urban fabric

Each tile must be abstracted enough to function as an illustration texture rather than photographic evidence.

Use consistent overhead perspective, scale and visual detail across all six tiles.

Palette: forest #315C48, water #2C7BE5, earth #A47551, dry neutral #D8C39B, urban #8A8F98.

No labels, buildings with logos, vehicles, people or text.

Every tile must repeat seamlessly.
```

---

## 13.5 Variant C — Topographic forest/water illustration

```text
Create an editorial topographic illustration for a forest-and-water monitoring platform.

Show layered terrain contours forming a valley with one river, three simplified forest patches and two monitoring points represented only as small geometric markers.

Style: clean cartographic editorial drawing, thin contour lines, flat colour regions, subtle paper grain.

Palette: background #F4F1E8, foreground #172033, forest #315C48, water #2C7BE5 and primary #2563EB for monitoring points.

No real place names, labels, coordinate values, compass rose, scale bar or attribution.

This is illustrative art, not a usable navigation map.
```

---

## 13.6 Variant D — Environmental system cutaway

```text
Create an educational environmental-system illustration showing a simplified landscape cross-section from upland forest through river corridor to agricultural lowland.

Depict relationships between vegetation, water and terrain using clear layered shapes and restrained directional arrows without text.

Style: contemporary scientific editorial illustration, clean and diagrammatic but not pretending to show measured data.

Palette: #315C48 forest, #2C7BE5 water, #A47551 soil, #D8C39B dry ground, #172033 structural linework.

No numeric measurements, labels, icons with text, real locations or logos.
```

---

## 13.7 Do / Don't

**Do**

- mark synthetic satellite-style imagery as illustrative when needed;
- use actual map providers for operational maps;
- preserve required provider attribution on real maps;
- use correct palette semantics for actual measurements.

**Don't**

- call generated imagery “satellite imagery” without qualification;
- invent wildfire/flood evidence;
- present synthetic land cover as observed classification output;
- generate fake timestamps/sensor metadata.

---

## 13.8 Ready Text Area

```text
PROMPT:
Create a clearly illustrative synthetic satellite-style environmental composite for a geospatial product marketing page. Show a fictional landscape containing forest canopy, a winding river, agricultural fields and a small urban edge viewed directly overhead. It should resemble a stylised environmental remote-sensing composite, not authentic satellite evidence, and must not correspond to a real identifiable location. Palette: forest #315C48, water #2C7BE5, earth #A47551, dry land #D8C39B, urban neutral #8A8F98. No labels, named roads, coordinates, attribution text, timestamp, provider logo or sensor metadata. No text.

NEGATIVE:
place name, road label, coordinates, timestamp, satellite provider logo, map attribution, sensor metadata, real city, text, watermark, compass, scale bar

PARAMETERS:
--ar 16:9 --stylize 55 --chaos 5 --seed 71605 --no text labels coordinates logo timestamp
```

---

# 14. Pack 12 — Seasonal & Campaign Variants

## 14.1 Purpose

Use for:

```text
year-end campaign
product anniversary
launch event
seasonal landing page
conference
regional campaign
limited promotion
```

Campaign styling MUST NOT cause the product to become a different brand every quarter.

---

## 14.2 Controlled deviation rule

At least **70% of the base visual-language variables SHOULD remain unchanged**.

Allowed campaign deviations MAY include:

```text
one accent colour
one texture
one motif family
one imagery theme
one motion motif
```

The following SHOULD remain locked:

```text
primary type family
core foreground/background relationship
logo
icon language
component structure
primary interaction semantics
accessibility treatment
```

---

## 14.3 Variant A — Year-end / winter, non-denominational

```text
Create a seasonal variant of the established product illustration language for a year-end campaign.

Keep the normal geometric editorial style, line weight, composition discipline and brand palette unchanged.

Add only a restrained seasonal layer: sparse crystalline geometric forms and cool translucent edge details suggesting winter without depicting a specific holiday or religious symbol.

Base palette remains #172033, #FAFAF8, #2563EB and #0F766E. Allow one temporary icy accent #BDE7F5.

Composition must remain suitable for a professional B2B product.

No snowman, Santa, Christmas tree, gifts, holiday text, fireworks, logos or confetti.
```

---

## 14.4 Variant B — Spring / ecological campaign

```text
Create a controlled spring campaign variant of our existing editorial visual language.

Preserve the normal geometric composition, line treatment and primary palette. Introduce one temporary motif: simplified new-growth leaf forms integrated into the existing modular geometry.

Base colours: #172033, #FAFAF8, #2563EB and #0F766E.
Temporary campaign accent: fresh green #72A66A.

The imagery should feel like the same product brand entering a seasonal campaign, not a botanical lifestyle brand.

No flowers covering the whole frame, butterflies, handwritten typography, logo changes or pastel rainbow palette.
```

---

## 14.5 Variant C — Launch/event energy

```text
Create a campaign visual for a major product launch while preserving the established brand system.

Use the normal geometric editorial forms and exact core palette. Introduce controlled directional movement using repeated offset layers that appear to accelerate forward from left to right.

Use #172033, #FAFAF8, #2563EB and #0F766E, with one temporary energetic accent #D97706.

No fireworks, confetti, balloons, neon glow, text, logo distortion or generic celebration imagery.

The visual should feel energetic through composition rather than party symbolism.
```

---

## 14.6 Do / Don't

**Do**

- change one or two visual dimensions;
- define campaign additions as temporary tokens;
- keep base brand recognisable.

**Don't**

- recolour all semantic product tokens for a campaign;
- change logo;
- replace established illustration language wholesale;
- use religious/holiday symbolism by default for global audiences.

---

## 14.7 Ready Text Area

```text
PROMPT:
Create a campaign visual for a major product launch while preserving the established geometric editorial brand system. Use the normal precise forms, line treatment and core palette. Introduce controlled directional movement through repeated offset layers accelerating from left to right. Colours: foreground #172033, background #FAFAF8, primary #2563EB, secondary #0F766E and one temporary accent #D97706. Professional B2B visual language. Energy must come from composition rather than party imagery. No fireworks, confetti, balloons, neon glow, text, logo distortion or watermark.

NEGATIVE:
fireworks, confetti, balloon, party, neon, glow, text, logo, distorted logo, rainbow, watermark

PARAMETERS:
--ar 16:9 --stylize 80 --chaos 5 --seed 60591 --no fireworks confetti balloons text logo watermark
```

---

# 15. Cross-Pack Model Adapters

## 15.1 GPT Image

Use the `PROMPT` block directly.

Append negative requirements as a final section:

```text
Constraints:
No text.
No logos.
No watermarks.
No additional subjects.
```

For transparent assets, request transparency explicitly and use a format preserving alpha. OpenAI's current documentation recommends `background="transparent"` with PNG or WebP and checking alpha edges around hair, glass, shadows and object contours.  
https://developers.openai.com/api/docs/guides/image-prompting

Typical request intent:

```text
size = target aspect-compatible resolution
quality = medium or high depending detail
background = transparent where required
```

OpenAI currently documents landscape outputs including 1536×1024 and 2048×1152 as well as custom dimensions within its documented limits.  
https://developers.openai.com/api/docs/guides/image-prompting

---

## 15.2 Midjourney

Paste:

```text
PROMPT + PARAMETERS
```

Use `--no` for compact exclusions.

Current Midjourney documentation says parameters belong at the end of the prompt.  
https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List

For recurring series:

```text
--sref [APPROVED STYLE REFERENCE]
```

SHOULD be added where appropriate.

Midjourney's Style Reference feature is intended to carry the look and feel of a reference, with weight controls available.  
https://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference

---

## 15.3 Stable Diffusion / SDXL starting configuration

The following is a **starting recipe**, not a universal optimum:

```text
CFG: 5.5
Steps: 28–32
Sampler/Scheduler: DPM++ 2M Karras or pinned project standard
Seed: use pack seed for reproducibility experiments
```

Negative prompt:

```text
paste the NEGATIVE block
```

All production records MUST pin:

```text
checkpoint
VAE if relevant
sampler
steps
CFG
seed
LoRAs
ControlNet
reference adapters
```

---

## 15.4 FLUX.2

Use the `PROMPT` block and ignore the standalone `NEGATIVE` field.

Rewrite critical exclusions as desired outcomes:

Instead of:

```text
no busy background
```

write:

```text
background is simple, uniform and low-detail
```

Current FLUX.2 documentation states that negative prompts are not supported. It also recommends placing important subject/action/style/context information early.  
https://docs.bfl.ai/guides/prompting_guide_flux2

---

# 16. Additional Domain Prompt — Forest Texture

```text
Create a seamless overhead forest-canopy illustration texture for environmental product UI. Dense but natural clusters of simplified canopy forms, varying leaf mass and small shadow gaps, consistent overhead scale, no horizon. Use forest green #315C48 with dark structural #172033 and muted lighter foliage. The texture must feel cartographic and illustrative rather than photographic evidence. No roads, buildings, animals, labels, text or coordinates. Perfectly seamless repeat.
```

Suggested use:

```text
map legend samples
illustrative report bands
environmental onboarding art
non-data decorative map panels
```

Opacity:

```text
5–12% when used behind interface content
```

---

# 17. Additional Domain Prompt — Water Texture

```text
Create a seamless overhead water-surface texture suitable for environmental visualization artwork. Calm broad tonal variations and sparse fine flow lines, not photorealistic ocean photography. Use water blue #2C7BE5 with darker #1D4ED8 and pale desaturated blue. Uniform overall luminance and seamless repeat. No waves large enough to imply scale, no boats, shore, labels, symbols, text or watermark.
```

---

# 18. Additional Domain Prompt — Map-Tile Aesthetic

```text
Create a fictional map-tile style illustration for product marketing. Overhead cartographic view containing simplified terrain, one river, sparse roads and land-cover blocks. Use clear geometric hierarchy and restrained linework. Palette: background #F4F1E8, forest #315C48, water #2C7BE5, earth #A47551, road #8A8F98, foreground #172033. Do not use any actual place names, coordinates, route numbers, labels, provider logos, attribution or real geography. This is decorative illustrative cartography, not an operational map.
```

Real operational maps MUST use real map/data providers and preserve required attribution; generated art is not a substitute.

---

# 19. Anti-patterns

| Do | Don't |
|---|---|
| Use semantic design-token colours | Invent a fresh palette per image |
| Generate for the target aspect ratio | Generate everything square and crop later |
| Reserve real text space | Ask models to typeset marketing headlines |
| Overlay exact UI copy in HTML/CSS | Bake CTA copy into hero images |
| Use specific task metaphors | Use generic blob empty states |
| Keep empty/error art secondary | Make the error illustration larger than the recovery action |
| Lock blog-series art direction | Change medium for every article |
| Create OG backgrounds separately | Shrink article art and hope text fits |
| Use subtle pattern opacity | Place high-contrast noise behind body copy |
| Generate icon concepts | Ship raw generated raster icons |
| Redraw final icons in SVG | Ship messy auto-traced SVGs |
| Maintain consistent icon stroke | Allow each icon a different visual weight |
| Use fictional diverse avatar libraries | Imply synthetic faces are real customers |
| Use real product screenshots | Generate fictional product UI for claims |
| Generate blank mockup screens | Let models hallucinate dashboard contents |
| Keep dataviz accent art non-factual | Generate fake KPI charts |
| Use chart tokens deliberately | Use rainbow “data-looking” decoration |
| Use domain art as illustration | Present synthetic satellite imagery as observed data |
| Keep map-provider layers real | Replace required real maps with generated map imagery |
| Keep 70%+ campaign language stable | Redesign the entire brand each season |
| Add one campaign accent | Replace semantic colours with campaign colours |
| Record prompts and seeds | Keep final art without provenance |
| Test responsive crops | Approve only the desktop hero |
| Check transparent edges | Assume model-generated alpha is clean |
| Write context-appropriate alt text | Describe purely decorative imagery unnecessarily |

---

# 20. Asset QA Checklist

## Composition

- [ ] Correct component/use case selected.
- [ ] Target ratio generated rather than retrofitted where practical.
- [ ] Text-safe region is actually empty.
- [ ] Responsive crop survives desktop/tablet/mobile.
- [ ] Primary subject is not near unsafe edges.
- [ ] Visual hierarchy supports surrounding shadcn component layout.

## Brand

- [ ] Palette uses actual resolved design tokens.
- [ ] Primary colour is not used indiscriminately.
- [ ] Asset belongs to an approved visual family.
- [ ] Series assets share style reference or prompt scaffold.
- [ ] Campaign variation stays inside controlled-deviation rules.

## Generation defects

- [ ] No unexpected text.
- [ ] No watermark-like marks.
- [ ] No unintended logos.
- [ ] No malformed hands/limbs.
- [ ] No duplicate objects.
- [ ] No melted geometry.
- [ ] No impossible reflections.
- [ ] No plastic-skin artefact where realism is intended.
- [ ] No accidental symmetry that makes the image uncanny.

## UI integration

- [ ] Exact UI copy remains real text.
- [ ] Product screenshots use real product pixels.
- [ ] Generated artwork does not imitate factual data.
- [ ] Empty/error illustration does not replace explanation/action.
- [ ] Icon concepts were redrawn and optically aligned.
- [ ] Texture opacity has been tested behind actual content.
- [ ] Dark-mode usage has been tested where applicable.

## Data/geospatial

- [ ] Synthetic satellite/map art is not presented as evidence.
- [ ] Actual map layers preserve provider attribution.
- [ ] Real chart colours follow data semantics.
- [ ] Illustration does not contain fake measurements.
- [ ] Generated maps contain no invented authoritative-looking labels.

## Accessibility

- [ ] Image purpose classified correctly.
- [ ] Decorative imagery uses `alt=""`.
- [ ] Informative imagery receives meaningful alt text.
- [ ] Functional image alternative describes function.
- [ ] Complex imagery has equivalent information.
- [ ] Generated text is not the only accessible copy.
- [ ] Text placed over imagery passes final contrast testing.

W3C explicitly bases text alternatives on the image's purpose and context, not simply its visual contents.  
https://www.w3.org/WAI/tutorials/images/

## Technical

- [ ] Source master retained.
- [ ] Correct responsive variants generated.
- [ ] AVIF/WebP output used where appropriate.
- [ ] Transparent alpha inspected manually.
- [ ] Vector traces manually cleaned.
- [ ] File-size budget met.
- [ ] Dimensions declared in implementation.
- [ ] CDN asset version changed rather than mutating cached bytes.

## Provenance

- [ ] Prompt stored with asset.
- [ ] Model/provider stored.
- [ ] Model version stored.
- [ ] Seed stored if applicable.
- [ ] Style-reference ID/hash stored.
- [ ] Negative prompt stored.
- [ ] Parameter line stored.
- [ ] Post-processing recipe stored.
- [ ] Rights/licence review recorded where required.

---

# 21. Canonical Prompt-Pack File Format

Each approved pack SHOULD live in source control:

```yaml
id: hero-editorial-v2
type: hero

tokens:
  background: "var(--background)"
  foreground: "var(--foreground)"
  primary: "var(--primary)"
  secondary: "var(--secondary)"

prompt: |
  Create a wide editorial hero photograph...

negative: |
  text, watermark, logo...

models:
  midjourney:
    params: "--ar 16:9 --stylize 60 --chaos 4 --seed 51021"
  stableDiffusion:
    cfg: 5.5
    steps: 30
    scheduler: "DPM++ 2M Karras"
    seed: 51021
  gptImage:
    aspect: "16:9"
    background: "opaque"
  flux:
    seed: 51021

exports:
  master: "2048x1152"
  responsive:
    - "1600w"
    - "1200w"
    - "800w"

usage:
  - homepage-hero
  - feature-page
```

---

# 22. Prompt Pack Selection Matrix

| Asset need | Use pack |
|---|---|
| Homepage visual | Hero & Marketing |
| Feature landing page | Hero & Marketing |
| No records | Empty-State |
| Failed network action | Error-State |
| Blog post | Article Cover |
| Social preview | OG/Social |
| Low-level atmosphere | Texture |
| New custom symbol | Icon Set |
| Missing avatar | Avatar/Profile |
| Marketing screenshot | Product Mockup |
| Analytics section accent | Dataviz Accent |
| First-run setup | Onboarding |
| New feature dialog | Feature Announcement |
| Climate/GIS marketing | Geospatial |
| Forest/water surface pattern | Geospatial texture |
| Holiday/launch campaign | Seasonal/Campaign |

---

# 23. Rules for Real Text Over Generated Art

## 23.1 Hero

Preferred DOM:

```html
<section class="relative">
  <img src="/hero.avif" alt="" />

  <div class="absolute ...">
    <h1>Real product headline</h1>
    <p>Real supporting text.</p>
    <Button>Get started</Button>
  </div>
</section>
```

The text SHOULD NOT be fused into the raster image.

---

## 23.2 OG

Preferred:

```text
generated background
→ HTML/SVG/Canvas title render
→ exact logo asset
→ exact category/date
→ rasterise once
```

This allows deterministic typography and localisation.

---

## 23.3 Product mockup

Preferred:

```text
generated environment/device
+
actual product screenshot
+
perspective transformation
```

The output MUST NOT contain fabricated application functionality.

---

# 24. Rules for Illustration Consistency

A product SHOULD maintain one or at most a small number of named illustration families.

Example:

```text
illustration.editorial
illustration.technical
illustration.environmental
```

Each family SHOULD define:

```text
shape language
stroke
perspective
palette
texture
shadow
human representation
background
complexity
```

A feature team MUST NOT independently create:

```text
clay 3D
watercolour
neo-brutalist
photorealistic
flat vector
```

empty states across adjacent product surfaces without an explicit visual-system decision.

---

# 25. Rules for Icon Families

Production icon evaluation MUST include side-by-side family review.

Apple states that icon systems should maintain consistency in:

```text
size
detail
stroke thickness
perspective
```

and may require optical rather than geometric alignment.  
https://developer.apple.com/design/human-interface-guidelines/icons

Therefore, the icon prompt is only the beginning.

Final SVG work MUST establish real mathematical consistency.

---

# 26. Rules for Data & Maps

Data-visualisation colour cannot be chosen only because it is aesthetically aligned with surrounding generated artwork.

Carbon recommends:

```text
categorical → discrete unrelated categories
sequential → ordered relationships/trends
diverging → meaningful opposing sides/midpoint
```

and warns against using gradients in place of meaningful sequential encoding.  
https://carbondesignsystem.com/data-visualization/color-palettes/

Generated decorative chart accents MUST yield to real chart semantics.

Likewise, generated map-like imagery MUST NOT substitute for actual geographic evidence or real map tiles.

---

# 27. Anti-patterns Specific to AI Asset Libraries

A prompt library MUST NOT become:

```text
100 prompts containing the words:
premium
beautiful
futuristic
8K
cinematic
award-winning
```

with no component-specific composition.

The production value of a prompt pack is its **constraint architecture**, not its adjective count.

A useful prompt establishes:

```text
what
where
why
style
palette
composition
safe area
forbidden content
export target
```

---

# 28. Checklist — Prompt Pack Governance

- [ ] Every recurring asset category has one approved pack.
- [ ] Each pack contains at least three tested variants.
- [ ] Palette instructions reference semantic design tokens.
- [ ] Each pack specifies aspect ratios.
- [ ] Each pack specifies export sizes.
- [ ] Each pack defines UI placement.
- [ ] Each pack defines do/don't rules.
- [ ] Each pack contains a ready positive prompt.
- [ ] Each pack contains negative constraints.
- [ ] Each pack contains model parameter starting points.
- [ ] Midjourney syntax is kept outside descriptive prose.
- [ ] FLUX workflows do not receive unsupported negative-prompt fields.
- [ ] Product text remains deterministic.
- [ ] Product screenshots use actual application pixels.
- [ ] Icon outputs undergo SVG reconstruction.
- [ ] Generated profiles do not masquerade as customer testimonials.
- [ ] Geospatial imagery cannot be mistaken for actual observations.
- [ ] Seasonal visual changes retain the core brand.
- [ ] Series assets use consistent references/settings.
- [ ] Prompt manifests are version-controlled.
- [ ] Accessibility is reviewed in final UI context, not in isolation.
- [ ] Responsive crops are part of QA.
- [ ] Generated assets pass the Image Prompt Engineering QA checklist before release.

---

# 29. Canonical Summary

**1. Prompt packs are component-specific production recipes.**  
A homepage hero, empty state, icon and map texture have different composition requirements and MUST NOT come from one generic “brand image” prompt.

**2. The page layout determines the image composition.**  
Prompts MUST reserve copy-safe space, choose target ratios and respect responsive cropping. Current OpenAI guidance specifically recommends stating aspect ratio and important placement constraints.  
https://developers.openai.com/api/docs/guides/image-prompting

**3. Design tokens enter the prompt explicitly.**  
Generated images SHOULD reference semantic roles such as `primary`, `secondary`, `muted` and chart tokens so the imagery belongs to the same system as shadcn-based components.  
https://ui.shadcn.com/docs/theming

**4. Real text remains real text.**  
Hero copy, UI labels, OG titles, product data and error messages SHOULD normally be composed after image generation.

**5. Empty-state imagery must communicate the domain, not generic AI decoration.**  
Use task-specific visual metaphors rather than blobs, random spheres and sad robots.

**6. A blog series is a visual system.**  
Palette, medium, texture, framing and composition remain stable; the metaphor changes by article.

**7. Icons are generated as concepts and engineered as vectors.**  
The production icon family requires consistent size, detail, stroke and perspective plus optical correction, consistent with Apple's interface-icon guidance.  
https://developer.apple.com/design/human-interface-guidelines/icons

**8. Fake UI is prohibited in product marketing.**  
Generate the environment and compositing plane, then insert the real application screenshot.

**9. Data-like artwork must not become fake data.**  
Decorative analytical accents do not contain invented KPI values or authoritative chart labels. Actual charts retain categorical/sequential/diverging semantics.  
https://carbondesignsystem.com/data-visualization/color-palettes/

**10. Geospatial art is illustrative unless it came from actual geographic data.**  
Synthetic aerial imagery, land-cover textures and map aesthetics MUST NOT be presented as satellite observations, classified datasets or sensor evidence.

**11. Seasonal variation is controlled deviation.**  
Campaigns change a small defined subset of the visual language while the core brand, component semantics and accessibility system remain intact.

**12. Accessibility is determined by use in context.**  
Decorative generated imagery gets null alt text; informative and complex imagery receive appropriate equivalents according to W3C guidance.  
https://www.w3.org/WAI/tutorials/images/

**13. Prompt packs are source assets.**  
Positive prompt, exclusions, parameters, model/version, references, seeds and post-processing instructions belong in source control beside the resulting asset.

---

# 30. Sources

1. **OpenAI — Image Prompting Guide**  
   https://developers.openai.com/api/docs/guides/image-prompting

2. **OpenAI — Image Generation**  
   https://developers.openai.com/api/docs/guides/image-generation

3. **Midjourney — Parameter List**  
   https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List

4. **Midjourney — Aspect Ratio**  
   https://docs.midjourney.com/hc/en-us/articles/31894244298125-Aspect-Ratio

5. **Midjourney — Style Reference**  
   https://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference

6. **Midjourney — Stylize**  
   https://docs.midjourney.com/hc/en-us/articles/32196176868109-Stylize

7. **W3C/WAI — Images Tutorial**  
   https://www.w3.org/WAI/tutorials/images/

8. **Apple Human Interface Guidelines — Icons**  
   https://developer.apple.com/design/human-interface-guidelines/icons

9. **IBM Carbon Design System — Data Visualization Color Palettes**  
   https://carbondesignsystem.com/data-visualization/color-palettes/

10. **Adobe Spectrum — Inclusive Design**  
    https://spectrum.adobe.com/page/inclusive-design/

11. **Adobe Spectrum — Color Fundamentals**  
    https://spectrum.adobe.com/page/color-fundamentals/

12. **shadcn/ui — Theming**  
    https://ui.shadcn.com/docs/theming

The library is intentionally built around **layout-aware prompts**, not visual-style adjectives: every pack defines the intended UI slot, token palette, crop behaviour, exclusions, production export and final accessibility treatment.
