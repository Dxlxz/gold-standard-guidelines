---
id: "anti-ai-slop"
title: "Anti-AI-Slop & Craft Standard"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "anti", "ai", "slop", "craft"]
applies_to: ["ai"]
related: ["accessibility", "corporate-enterprise-visual"]
legacy_number: 103
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 54666
provenance: baseline

---

The research basis is unusually direct for this topic: NN/g’s 2025–2026 evaluations of AI prototyping found mainstream-pattern bias, generic visual styling, repeated low-information containers, inappropriate pattern selection, and missing contextual nuance when prompts lack constraints. The standard below turns those findings into enforceable design-system rules rather than an aesthetic blacklist.

# Anti-AI-Slop & Craft Standard — Gold Standard 2026

**Canonical placement:** Design Tokens → Visual Standards → **Anti-AI-Slop & Craft** → Corporate & Enterprise Visual Standards → Layout Patterns → Facade → Components  
**Status:** Normative  
**Component baseline:** shadcn/ui  
**Accessibility baseline:** WCAG 2.2 AA or higher  
**Applies to:** AI-assisted design, AI-generated prototypes, production UI, websites, enterprise applications, dashboards, marketing surfaces, data products, design-system contributions, generated copy, imagery, charts, illustrations, and code-generated interfaces.

---

# 1. Purpose

The Anti-AI-Slop & Craft Standard defines how teams MUST identify, reject, and replace interface design that is superficially polished but contextually generic.

For this standard, **AI slop** means design output whose visual or interaction decisions are primarily explained by common model priors, template conventions, fashionable defaults, or library availability rather than by:

- the product domain;
- actual content;
- user tasks;
- data structure;
- risk;
- brand character;
- accessibility;
- operating environment;
- interaction semantics.

AI assistance is not itself non-conformant.

A design created entirely by a human MAY be slop.

A design generated substantially with AI MAY meet this standard if every consequential decision has been made, reviewed, and refined against real constraints.

NN/g's evaluation of AI prototyping tools found that broad prompts cause tools to fill gaps through assumptions, that generated interfaces are biased toward common patterns in their training data, and that outputs can become visually generic, contextually inappropriate, weakly grouped, and interchangeable. Their conclusion is not that AI cannot help design; it is that AI-generated prototypes require specific constraints, judgment, validation, and refinement.  
https://www.nngroup.com/articles/ai-prototyping/

NN/g separately found vague prompts producing visual clutter, repeated design elements, and prominent containers containing little meaningful information.  
https://www.nngroup.com/articles/vague-prototyping/

The governing principle is:

```text
COMMON ≠ WRONG
DEFAULT ≠ JUSTIFIED
POLISHED ≠ CRAFTED
GENERATED ≠ FINISHED
```

A design decision MUST be defensible without saying:

> "The AI made it that way."

---

# 2. Rules

# 2.1 Definition of craft

Craft is evidence that a design has been adapted to its specific problem.

A crafted interface SHOULD reveal knowledge of:

- who uses it;
- what users know;
- what users fear getting wrong;
- what information matters first;
- what real data looks like;
- what happens when data is absent;
- what happens when permissions differ;
- what happens when operations fail;
- what terminology the domain uses;
- what visual language belongs to the organisation;
- what devices and environments are involved.

Craft MUST be detectable below screenshot level.

It MUST appear in:

- labels;
- defaults;
- column widths;
- error states;
- validation;
- empty states;
- density;
- chart choice;
- sorting;
- map legends;
- units;
- loading states;
- permission behaviour;
- keyboard interaction;
- microcopy;
- visual hierarchy.

A distinctive landing page attached to a generic product UI is not sufficient.

---

# 2.2 Slop is cumulative

No single aesthetic choice is automatically prohibited.

The following can all be legitimate:

- Inter;
- Geist;
- Lucide;
- gradients;
- cards;
- glass;
- 16px radii;
- centred text;
- purple;
- three-column grids;
- animated transitions.

Slop is diagnosed by **unjustified convergence**.

For example:

```text
Inter
+ indigo-purple gradient
+ centred hero
+ three equal cards
+ 16px radius
+ Lucide icons in coloured circles
+ generic SaaS copy
+ invented usage statistic
```

is substantially more suspicious than any individual choice.

The reviewer MUST evaluate whether each choice can be explained by context.

---

# 2.3 Why AI slop happens

## 2.3.1 Model priors

Generative systems learn recurring patterns from large bodies of existing design and code.

NN/g's 2026-reviewed evaluation observed that AI prototyping outputs tend toward mainstream conventions, generic sans-serif typography, minimalist styling, common component libraries, and familiar patterns when detailed visual/contextual requirements are absent.  
https://www.nngroup.com/articles/ai-prototyping/

Models therefore tend to choose a statistically plausible solution before they choose a contextually specific solution.

That behaviour MAY be useful during ideation.

It MUST NOT be mistaken for design judgment.

---

# 2.3.2 Component-library priors

AI coding tools frequently know libraries such as:

- shadcn/ui;
- Tailwind;
- Lucide;
- common dashboard kits.

That familiarity is useful for implementation speed.

It also creates convergence.

shadcn/ui MUST be treated as the implementation baseline, not as the visual identity.

A production product MUST NOT look like a default component-library demonstration simply because the underlying implementation uses those components.

---

# 2.3.3 Template priors

Models have seen enormous numbers of:

```text
hero
↓
logo strip
↓
three benefits
↓
testimonial
↓
pricing
↓
FAQ
↓
CTA
```

pages.

When requirements are vague, this sequence becomes an easy completion.

The presence of a known pattern is not the problem.

The problem is selecting it before understanding the information architecture.

---

# 2.3.4 Missing domain constraints

Generic prompts such as:

```text
Create a modern dashboard for environmental monitoring.
```

leave unanswered:

- monitoring what;
- for whom;
- at what spatial resolution;
- updated how frequently;
- compared against what baseline;
- with what uncertainty;
- what action follows an alert;
- who owns the data.

NN/g found that broad prompts leave AI tools room to infer requirements and sometimes select the wrong visual or interaction pattern.  
https://www.nngroup.com/articles/ai-prototyping/

The prompt is therefore part of the design system.

---

# 2.3.5 Placeholder-led design

Designing around generic placeholder content encourages generic layout.

NN/g recommends designing with actual or representative content where available and notes that substantial systems require design and content to evolve together.  
https://www.nngroup.com/articles/layout-vs-content/

A production-intent design MUST NOT be approved using only:

```text
Lorem ipsum
Card title
Metric 01
User Name
Feature description here
```

when real domain content is available.

---

# 2.4 Business cost

Slop creates business risk because it weakens differentiation, credibility, comprehension, and perceived investment in the product.

NN/g research links design quality, correct/current information, and useful content with credibility and trust; it also notes that generic filler imagery is often ignored.  
https://www.nngroup.com/articles/trustworthy-design/  
https://www.nngroup.com/articles/photos-as-web-content/

The likely costs include:

- **Undifferentiated product:** users cannot infer why this product belongs in its domain rather than another SaaS category.
- **Low trust:** invented proof, synthetic testimonials, filler photography, and generic claims weaken credibility.
- **Lower task confidence:** interfaces look finished before important operational detail has been resolved.
- **Conversion risk:** value propositions become interchangeable and fail to explain why a specific user should act.
- **Sales friction:** enterprise buyers encounter interfaces that do not reflect the terminology or workflow they expect.
- **Implementation waste:** teams polish generic screens that later require structural redesign when real data appears.
- **Design-system drift:** generated components introduce accidental radii, colours, shadows, and patterns faster than governance catches them.

This standard MUST NOT attach invented percentages to those risks.

---

# 2.5 The Slop Detector

A screen SHOULD be escalated for craft review when multiple tells below appear without clear rationale.

## 2.5.1 Colour and surface tells

### Tell 01 — Indigo-Purple Default

Indigo-to-purple gradients appear despite no brand or data rationale.

### Tell 02 — Purple CTA on White

The primary CTA is saturated violet simply because it reads as "startup."

### Tell 03 — Gradient Everywhere

Buttons, headlines, backgrounds, charts, borders, and icons all use gradients.

### Tell 04 — Glass Without Layering

Glassmorphism is applied despite no meaningful overlapping surface relationship.

### Tell 05 — Blur-as-Premium

Backdrop blur is used as shorthand for sophistication rather than interaction.

### Tell 06 — Rainbow Data

Charts use many decorative hues unrelated to categories, status, or magnitude.

### Tell 07 — Brandless Accent

A bright accent exists but has no connection to brand, domain, state, or data.

### Tell 08 — Fake Dark-Mode Drama

Near-black surfaces plus neon violet/cyan exist only to look "developer premium."

---

# 2.5.2 Typography tells

### Tell 09 — Inter by Reflex

Inter is selected with no documented typographic reason.

### Tell 10 — Geist by Reflex

Geist is selected because the generator or template defaults to it.

### Tell 11 — One Weight Everywhere

Hierarchy is attempted primarily through size while all text uses similar weight.

### Tell 12 — 64px Generic Hero

Every product receives the same oversized marketing headline regardless of content.

### Tell 13 — Gradient Headline

Important nouns become gradient text solely for visual novelty.

### Tell 14 — SaaS Sentence Case

Every heading follows familiar tech-marketing cadence rather than domain language.

---

# 2.5.3 Composition tells

### Tell 15 — Centred Hero Reflex

Every homepage begins with centred eyebrow, headline, paragraph, and two buttons.

### Tell 16 — Three Equal Feature Cards

Three identically weighted cards are used because three fills a row cleanly.

### Tell 17 — Six-Card Continuation

Another row of three cards appears because additional features must "fit the system."

### Tell 18 — Perfect Symmetry

Everything is balanced geometrically even when information priority is unequal.

### Tell 19 — Equal Section Rhythm

Every section receives identical top/bottom spacing regardless of narrative relationship.

### Tell 20 — Cardification

Every content group receives a rounded container.

### Tell 21 — Bento for No Reason

Unequal tiles imitate a bento layout without meaningfully different information types.

### Tell 22 — Dashboard Before Task

The product opens to a dashboard because dashboards look product-like, not because users need an overview.

---

# 2.5.4 Shape and elevation tells

### Tell 23 — Uniform 16px Radius

Buttons, inputs, cards, modals, charts, panels, tooltips, and tables share the same large radius.

### Tell 24 — Pill Inflation

Tags, buttons, inputs, tabs, navigation, filters, and search fields all become pills.

### Tell 25 — Flat Card + Shadow

A card with no overlap or elevation semantics receives a drop shadow anyway.

### Tell 26 — Shadow Stack

Multiple soft shadows are layered to simulate "premium" depth.

### Tell 27 — Floating Everything

Static sections visually float despite existing in normal document flow.

---

# 2.5.5 Iconography tells

### Tell 28 — Lucide-in-Coloured-Circle

Every feature uses a Lucide outline icon inside a pastel circular badge.

### Tell 29 — Arbitrary Icon Diversity

Icons vary in metaphor style because they were chosen independently from search results.

### Tell 30 — Icon for Every Heading

Icons appear next to labels even when they add no recognition value.

### Tell 31 — Sparkles Means AI

Every AI-related capability uses the same sparkle icon.

### Tell 32 — Globe Means Global

Generic globe, lightning, shield, rocket, and target icons stand in for actual product concepts.

---

# 2.5.6 Copy tells

### Tell 33 — "Elevate Your Workflow"

The product promises to "elevate," "supercharge," "transform," or "revolutionize" without saying what changes operationally.

### Tell 34 — "Built for Modern Teams"

The audience is described as "modern teams" instead of a recognisable profession or workflow.

### Tell 35 — "Powerful. Simple. Seamless."

Three unsupported adjectives substitute for a value proposition.

### Tell 36 — Lorem-Flavoured Microcopy

UI copy reads like polished placeholder text:

```text
Manage your resources effortlessly.
Everything you need in one place.
Get started on your journey.
```

### Tell 37 — Generic Empty State

"No data yet. Add your first item to get started."

### Tell 38 — Generic Error

"Something went wrong. Please try again."

### Tell 39 — Generic Success Toast

"Success! Your changes have been saved."

### Tell 40 — Fake Precision

Copy confidently states behaviour, timing, or outcomes the underlying system cannot guarantee.

---

# 2.5.7 Credibility tells

### Tell 41 — Invented Statistic

"10,000+ teams" appears without a verified source.

### Tell 42 — Invented Testimonial

A named person, role, quote, or company is fabricated for visual completeness.

### Tell 43 — Logo-Wall Fiction

Recognisable company logos imply customers or endorsements without authorization.

### Tell 44 — Synthetic Customer Portrait

AI-generated faces are presented as if they depict real customers, employees, clinicians, analysts, or citizens.

### Tell 45 — Decorative Trust Badge

Security/compliance badges appear without a valid certification or scope.

NN/g research shows that real, information-carrying images receive attention while generic stock people and decorative imagery are frequently ignored.  
https://www.nngroup.com/articles/photos-as-web-content/

---

# 2.5.8 Illustration tells

### Tell 46 — Abstract Blob SVG

Large colourful blobs or gradient mesh shapes carry no information.

### Tell 47 — Generic Floating Objects

Cubes, spheres, cards, and orbital shapes imply "technology."

### Tell 48 — Isometric People Doing Software

Generic illustration characters point at dashboards unrelated to the actual work.

### Tell 49 — Decorative Map

A map appears as backdrop texture instead of presenting spatial information.

### Tell 50 — Fake Product Screenshot

The hero contains a polished mock application that cannot exist with the available product/data.

---

# 2.5.9 Dashboard and data tells

### Tell 51 — Empty Dashboard with Fake Graphs

Placeholder charts exist to make the product appear sophisticated.

### Tell 52 — Meaningless Metric Cards

Cards show numbers because dashboards are expected to contain KPIs, not because those metrics support decisions.

### Tell 53 — 12.4K Without Unit

Metrics omit units, denominator, period, source, or comparison basis.

### Tell 54 — Decorative Sparkline

A sparkline has no labelled period, baseline, or interaction value.

### Tell 55 — Universal Green Up Arrow

Every increase is presented as positive regardless of metric meaning.

### Tell 56 — Chart-Type Roulette

A donut, area chart, radar chart, and bars coexist mainly for visual variety.

### Tell 57 — Fake Real-Time

Pulsing dots and "Live" indicators imply streaming data when the dataset updates daily.

### Tell 58 — Map as Hero Wallpaper

Geospatial products treat the map as scenery rather than an analytical workspace.

---

# 2.5.10 Interaction and motion tells

### Tell 59 — Entrance Choreography

Every section fades, rises, scales, or staggers into view.

### Tell 60 — Hover Theatre

Cards translate, scale, glow, shadow, and change border simultaneously on hover.

### Tell 61 — Animated Number Theatre

Metrics count upward every time the page loads.

### Tell 62 — Spring Everything

Every drawer, button, panel, tooltip, and chip uses spring physics.

### Tell 63 — Motion Without State Meaning

Animation does not explain cause, hierarchy, transition, or spatial continuity.

Material's motion guidance frames motion as a mechanism for attention and continuity rather than gratuitous decoration.  
https://m3.material.io/styles/motion/overview/how-it-works

### Tell 64 — Loading Skeleton as Decoration

Skeletons appear even when data loads essentially immediately or a stable cached state exists.

---

# 2.5.11 Template-content tells

### Tell 65 — Template FAQ

A generic accordion appears because marketing templates conventionally end with FAQs.

### Tell 66 — Template Pricing

Three tiers named Starter / Pro / Enterprise appear before pricing architecture has been defined.

### Tell 67 — "Most Popular" Fiction

The middle pricing plan receives a "Most Popular" label without evidence.

### Tell 68 — Generic Logo Strip

"Trusted by teams at" appears regardless of the product's actual customer story.

### Tell 69 — Generic Final CTA

"Ready to get started?" closes every page.

### Tell 70 — Template Footer Sprawl

Columns named Product / Resources / Company / Legal appear even when most links are irrelevant.

---

# 2.6 Diagnostic severity

A screen MUST NOT fail merely because one tell is present.

Review SHOULD classify findings:

```text
0–3 tells:
possibly intentional; verify rationale

4–8 tells:
genericity risk; craft review required

9–15 tells:
strong template/model-prior signature

16+ tells:
presume substantial redesign is required
```

This is a heuristic, not a scientific score.

Severity MUST also consider whether tells affect:

- trust;
- accessibility;
- truthfulness;
- task performance;
- brand integrity.

One invented testimonial is more serious than three unnecessary radii.

---

# 2.7 Replacement doctrine

# 2.7.1 Domain specificity first

The first design artifact SHOULD be a **domain vocabulary and task sheet**, not a moodboard.

Before visual design, the team MUST identify:

```text
users
roles
primary decisions
primary objects
domain vocabulary
units
status model
data freshness
permissions
critical errors
irreversible operations
```

A forestry product, for example, should naturally contain concepts such as:

```text
compartment
concession
land-cover class
canopy loss
observation date
sensor
cloud cover
hectares
baseline
protected area
confidence
```

if those concepts genuinely exist in its domain.

Those details create more identity than a gradient.

---

# 2.7.2 Real content first

Real or structurally representative content MUST be used as early as practical.

NN/g recommends fitting design to content as well as content to design.  
https://www.nngroup.com/articles/layout-vs-content/

A table SHOULD be tested with:

- short labels;
- long labels;
- null values;
- unusually large values;
- negative values;
- stale records;
- warnings;
- permissions;
- real units.

A landing page SHOULD be tested with the actual proposition, not placeholder adjectives.

---

# 2.7.3 Information asymmetry with intent

Not all information deserves equal visual weight.

Designs SHOULD express asymmetry when task priority is asymmetric.

Example:

```text
critical map workspace      8 columns
evidence/legend panel       4 columns
```

may be better than two equal panels.

A dashboard with one critical alert and six passive metrics SHOULD NOT render seven equal cards.

Asymmetry MUST reflect importance, not novelty.

---

# 2.7.4 Typographic contrast

Typography SHOULD create a recognisable information voice.

Teams SHOULD deliberately define:

- text family rationale;
- display/body relationship;
- number treatment;
- tabular numeral use;
- label density;
- heading contrast;
- code/identifier treatment.

Using Inter, Geist, system UI, or another common typeface is conformant when chosen intentionally.

The team MUST be able to answer:

```text
Why this typeface?
Why these weights?
Why this width?
Why this number treatment?
```

"Because the starter template uses it" is not sufficient.

---

# 2.7.5 Restrained palette + signature accent

The default craft strategy SHOULD be:

```text
strong neutral system
+
semantic status colours
+
one recognisable signature accent
```

rather than many decorative accents.

The signature accent MAY come from:

- agency identity;
- natural domain material;
- industrial equipment;
- cartographic convention;
- archival documents;
- existing brand history.

It MUST still satisfy accessibility requirements.

WCAG remains authoritative for contrast and non-colour-only communication.  
https://www.w3.org/TR/WCAG22/

---

# 2.7.6 One deliberate imperfection

A product SHOULD contain at least one controlled characteristic that prevents it from feeling mechanically uniform.

This is **not** permission for accidental inconsistency.

A deliberate imperfection may be:

- slightly asymmetric editorial composition;
- a distinctive map hatch;
- irregular illustration crop;
- custom contour line;
- signature divider;
- hand-derived icon geometry;
- uneven but purposeful image rhythm;
- historical/technical texture.

It MUST NOT be:

- inaccessible contrast;
- misalignment;
- inconsistent controls;
- unpredictable spacing;
- broken keyboard behaviour.

Call this **controlled non-uniformity**, not random imperfection.

---

# 2.7.7 Custom iconography

Generic icon libraries SHOULD remain implementation utilities.

High-frequency or domain-defining concepts SHOULD receive custom treatment where a generic metaphor is inadequate.

Examples:

```text
forest compartment
fire hotspot
canopy-loss alert
parcel overlap
satellite acquisition
protected-zone conflict
field verification
```

SHOULD NOT automatically become:

```text
folder
flame
triangle alert
layers
satellite
shield
check circle
```

if those metaphors erase important distinctions.

Lucide MAY remain appropriate for universal actions such as:

- search;
- close;
- download;
- edit;
- zoom;
- chevron;
- settings.

---

# 2.7.8 Information-carrying illustration

Illustration and imagery MUST justify their space.

NN/g found that users attend to imagery containing relevant information while ignoring generic decorative imagery and stock people.  
https://www.nngroup.com/articles/photos-as-web-content/

Prefer:

- actual product views;
- annotated maps;
- field photography;
- equipment;
- specimens;
- diagrams;
- workflow schematics;
- real team imagery;
- real facilities;
- real landscape photography.

Avoid decorative generative imagery where real visual evidence is available.

---

# 2.7.9 Interaction-level detail

Craft MUST continue into interaction states.

Every important control MUST define, where applicable:

```text
default
hover
focus
active
selected
loading
disabled
read-only
empty
partial
error
permission denied
stale
offline
success
```

AI-generated happy-path screens MUST NOT be considered production-complete.

---

# 2.8 Slop → Craft Rewrite Table

| Area | Slop | Craft replacement |
|---|---|---|
| 1. Headline | "Elevate your workflow." | "Review canopy-loss alerts before weekly enforcement triage." |
| 2. Subhead | "Everything you need in one place." | "Compare Sentinel-2 detections with concession boundaries and field reports." |
| 3. CTA | "Get Started" | "Open Sabah monitoring map" |
| 4. Secondary CTA | "Learn More" | "View detection methodology" |
| 5. Hero | Centred headline + mock dashboard | Left-aligned decision context + real annotated product crop |
| 6. Feature section | Three equal cards | Workflow sequence reflecting actual user tasks |
| 7. Empty state | "No data yet." | "No detections meet the current ≥2 ha and ≥70% confidence filters." |
| 8. Empty CTA | "Add item" | "Clear filters" / "Change observation period" |
| 9. Error | "Something went wrong." | "Sentinel tile S2B_T47NQD_20260921 could not be loaded. Basemap remains available." |
| 10. Success | "Saved successfully." | "Boundary review saved to case FR-2026-184." |
| 11. Pricing | Starter / Pro / Enterprise | Plans derived from actual deployment, data-volume, user, or governance differences |
| 12. Popular plan | "Most Popular" badge | Verified recommendation based on stated customer profile, or no badge |
| 13. Testimonial | Fabricated quote + AI portrait | Approved quote from an identifiable customer, or no testimonial |
| 14. Metric | "12.4K Active Users" | "1,284 unresolved alerts · as of 22 Sep 2026 18:00 MYT" |
| 15. Metric card | Four decorative KPIs | One decision-critical alert summary + secondary values inline |
| 16. Chart | Decorative area chart | Chart type selected for the analytical question with units, period and source |
| 17. Sparkline | Unlabelled mini trend | `+18% vs 30-day baseline` plus accessible trend detail |
| 18. Map | Dark map wallpaper | Analytical map with appropriate basemap, legend, scale, timestamp and layer controls |
| 19. Illustration | Gradient blob | Diagram of actual acquisition → classification → review workflow |
| 20. Photography | Generic AI analyst smiling | Real field officer, sensor, forest plot, control room, or no image |
| 21. Icon | Lucide tree inside green circle | Domain-specific land-cover glyph consistent with map legend |
| 22. AI icon | Sparkles | Label the specific function: classify, summarise, detect, predict, extract |
| 23. Gradient | Indigo → purple hero | Neutral surface + one agency/domain accent |
| 24. Shadow | Soft shadow on every card | Border/tonal grouping; shadow only for true overlay |
| 25. Radius | `16px` everywhere | Radius hierarchy tied to component scale and containment |
| 26. Glass | Blurred navbar | Opaque/stable navigation unless underlying-content continuity matters |
| 27. Motion | Stagger every section | Transition only when it explains state or spatial continuity |
| 28. Hover | Card lifts/glows | Show the actual interactive affordance: border/focus/action reveal |
| 29. FAQ | Generic accordion | Questions derived from support tickets, procurement, methodology, or policy |
| 30. Microcopy | "Manage your data effortlessly." | "Upload GeoJSON up to 50 MB; coordinates must use EPSG:4326." |
| 31. Filter label | "Type" | "Land-cover class" |
| 32. Date label | "Date" | "Observation period" |
| 33. Status | "Active" | "Awaiting field verification" |
| 34. Loading | Generic skeleton cards | Preserve map/table structure and identify which dataset is loading |
| 35. Permission | Greyed button | "Export disabled: your role can view restricted parcels but cannot download geometry." |
| 36. Footer | Product / Resources / Company / Legal | Links justified by actual product, agency and legal architecture |

---

# 2.9 Guardrails

# 2.9.1 Opinionated Design Tokens

Design Tokens MUST reduce the space of arbitrary generated styling.

Example:

```text
colour:
  neutral.*
  brand.primary
  brand.accent
  semantic.success
  semantic.warning
  semantic.critical
  semantic.info

radius:
  none
  sm
  md
  lg
  full

elevation:
  0
  1
  overlay
  modal

motion:
  none
  fast
  standard

spacing:
  canonical scale only
```

The design system SHOULD deliberately omit:

```text
gradient.rainbow
radius.17
shadow.premium
colour.ai-purple
motion.bouncy
```

unless the product has an actual need.

---

# 2.9.2 No unrestricted generated CSS

AI-generated implementation MUST use canonical tokens.

Review MUST reject:

```css
border-radius: 18px;
box-shadow: 0 18px 60px rgba(...);
background: linear-gradient(...);
```

when equivalent decisions are not represented in the token system.

Lint rules SHOULD flag arbitrary:

- colour literals;
- spacing values;
- radius values;
- shadows;
- z-index values;
- animation durations.

---

# 2.9.3 Component constraints

shadcn/ui MUST be treated as a behavioural/compositional baseline.

Generated code SHOULD use approved primitives where appropriate.

AI MUST NOT:

- invent duplicate button systems;
- fork input semantics;
- create a bespoke dialog when `Dialog` satisfies the pattern;
- turn every surface into a `Card`;
- use `Badge` for ordinary body metadata;
- use `Tooltip` to hide essential information.

The component library gives implementation consistency.

The design system gives identity.

---

# 2.9.4 Content linting

Automated review SHOULD flag generic phrases including:

```text
elevate your
supercharge your
unlock the power of
seamlessly
effortlessly
revolutionize
next-generation
built for modern teams
all-in-one
everything you need
transform your workflow
get started
learn more
```

These phrases MUST NOT be mechanically prohibited.

They MUST trigger the question:

```text
Can this copy be replaced with a specific actor,
task, object or outcome?
```

---

# 2.9.5 Credibility linting

Production content pipelines MUST prevent unverified:

- statistics;
- customer counts;
- testimonials;
- logos;
- awards;
- security certifications;
- government marks;
- performance claims.

Generated placeholders MUST be clearly marked as synthetic during prototyping.

They MUST be removed before production.

---

# 2.9.6 Image governance

Generated human imagery MUST NOT be presented as documentary evidence.

AI-generated faces MUST NOT impersonate:

- customers;
- employees;
- officials;
- clinicians;
- researchers;
- beneficiaries;
- witnesses.

Synthetic illustration MAY be used where its illustrative status is clear and appropriate.

Real information-carrying imagery SHOULD be preferred when available.  
https://www.nngroup.com/articles/photos-as-web-content/

---

# 2.10 Prompt patterns that reduce slop

AI design prompts MUST contain domain constraints before visual adjectives.

Bad:

```text
Design a beautiful modern SaaS dashboard for forestry analytics.
Make it premium and engaging.
```

Better:

```text
Design a desktop-first operational interface for state forestry analysts.

Primary task:
Review satellite-detected canopy-loss events against concession,
protected-area and enforcement-case boundaries.

Users:
GIS analysts and enforcement supervisors.
They work 4–8 hours/day in the interface.

Real objects:
Detection, parcel, concession, protected area, satellite scene,
field inspection, enforcement case.

Required units:
hectares, %, date/time, coordinates.

Data behaviour:
Satellite detections arrive every 3–5 days.
Each detection has confidence, area, acquisition date and source scene.
Data may be delayed by cloud cover.

Primary surface:
Map + review queue.
Do NOT create a generic KPI dashboard.

Visual direction:
Government/agency neutral.
No purple.
No decorative gradients.
No glassmorphism.
No three-card feature rows.
No generic AI imagery.
No coloured-circle feature icons.
No invented data.
No fake testimonials or metrics.

Use:
Existing design tokens.
shadcn/ui behavioural primitives.
Realistic domain labels.
Accessible neutral basemap.
One agency accent.
Compact operational density.

Return:
1. information hierarchy rationale
2. page structure
3. component choices
4. interaction states
5. accessibility considerations
6. visual implementation
```

NN/g found detailed context and design requirements materially improve AI-generated prototypes and reduce assumption-driven output.  
https://www.nngroup.com/articles/ai-prototyping/

---

# 2.11 Prompt requirement: provide negatives

AI prompts for production-intent work SHOULD explicitly describe known unwanted defaults.

For example:

```text
Do not use:
- centred generic SaaS hero
- purple/indigo gradient
- generic feature cards
- fake metrics
- stock or AI people
- unnecessary glass
- uniform oversized radius
- decorative shadows
- generic "Get Started" copy
```

Negative constraints MUST NOT become the only creative direction.

The prompt MUST still explain what the product **is**.

---

# 2.12 Prompt requirement: provide artifacts

Where available, prompts SHOULD include:

- real content;
- brand manual;
- token definitions;
- existing components;
- domain glossary;
- Figma frames;
- screenshots of mature surfaces;
- information architecture;
- representative data;
- error states;
- permission matrix.

NN/g's testing found AI outputs became more aligned when supplied with detailed artifacts and visual references.  
https://www.nngroup.com/articles/ai-prototyping/

---

# 2.13 Review requires rationale

For each major visual decision, reviewers MAY ask:

```text
Why is this here?
Why this size?
Why this colour?
Why this component?
Why this chart?
Why this radius?
Why this motion?
Why is this information first?
```

Responses such as:

```text
looks modern
looks clean
the AI chose it
it's standard SaaS
everyone does it
it balances the page
```

are insufficient on their own.

---

# 2.14 Accessibility remains non-negotiable

Anti-slop efforts MUST NOT turn into anti-convention theatre.

Distinctiveness MUST NOT reduce:

- contrast;
- keyboard accessibility;
- focus visibility;
- predictable controls;
- target sizing;
- semantic headings;
- readable typography.

WCAG 2.2 remains the accessibility baseline.  
https://www.w3.org/TR/WCAG22/

A strange interaction is not craft merely because it is original.

---

# 2.15 Cross-standard alignment

## Security

Generated interfaces MUST NOT invent:

- security badges;
- compliance claims;
- access states;
- encryption claims.

Permission-aware affordances MUST remain aligned with actual authorization.

---

## Data & Database

Generated dashboards MUST use real or structurally representative data schemas.

Metric cards MUST NOT precede metric definition.

Charts MUST NOT imply precision or freshness the dataset does not possess.

---

## API

A generated UI MUST NOT invent operations that the API cannot support.

Buttons such as:

```text
Approve
Sync
Retry
Reprocess
Export
```

MUST correspond to real capabilities before production approval.

---

## State Management

AI-generated happy paths MUST be expanded to cover:

- loading;
- empty;
- stale;
- partial;
- offline;
- error;
- denied;
- optimistic;
- conflict.

---

## Forms & Validation

Generated forms MUST use actual:

- validation rules;
- field lengths;
- formats;
- dependencies;
- permission states.

A form designed around ideal placeholder input is not production-ready.

---

## Accessibility

Distinctive design MUST remain accessible.

Novelty is subordinate to:

- semantics;
- contrast;
- focus;
- reflow;
- keyboard operation;
- reduced motion.

---

## Design Tokens

Generated visuals MUST use approved token values.

Repeated AI-introduced exceptions MUST NOT silently become tokens.

---

## Components and Patterns

shadcn/ui is the implementation baseline.

Canonical Layout Patterns remain authoritative.

AI MUST NOT invent a new page composition merely to make the output look original when an established pattern correctly fits the task.

---

# 2.16 Worked Example — Geospatial / Environmental Data Product

## Scenario

A government forestry agency needs an interface for reviewing suspected forest-cover change.

Inputs include:

- Sentinel imagery;
- land-cover classifications;
- concession boundaries;
- protected-area boundaries;
- administrative boundaries;
- enforcement cases;
- field-verification reports.

The product is used by GIS analysts and enforcement supervisors.

---

## 2.16.1 Slop version

A generic AI prompt produces:

```text
dark navy dashboard
purple-indigo gradient logo
"Protect Our Planet with Intelligent Insights"
four KPI cards
12,458 Trees Saved
98.7% Detection Accuracy
2.4M Hectares Monitored
+34% Sustainability Impact

small decorative map
purple heat layer
three feature cards
  Smart Detection
  Real-Time Monitoring
  Powerful Insights

sparkle AI icons
glass filter panel
fake line chart
stock/AI forest ranger
large rounded cards
animated counters
```

This screen is non-conformant.

The numbers are unverifiable.

The map is subordinate to decorative metrics.

"Sustainability Impact" is undefined.

The interface communicates generic climate-tech marketing rather than forestry operations.

---

# 2.16.2 Craft version

The primary desktop composition SHOULD instead be:

```text
┌─────────────────────────────────────────────────────────────────┐
│ Jata / Agency identity        Forest Change Review    User/Role │
├─────────────────────────────────────────────────────────────────┤
│ Observation: 01–21 Sep 2026 | Sensor: Sentinel-2 | Filters     │
├──────────────────────────────────────────┬──────────────────────┤
│                                          │ Review queue         │
│                                          │                      │
│                 MAP                      │ 84 detections         │
│                                          │ 12 protected-area    │
│     land-cover / detection overlays      │ overlaps              │
│                                          │                      │
│                                          │ Selected detection   │
│                                          │ 3.8 ha               │
│                                          │ Confidence 82%       │
│                                          │ Acquired 18 Sep      │
├──────────────────────────────────────────┴──────────────────────┤
│ Evidence timeline / field verification / enforcement history   │
└─────────────────────────────────────────────────────────────────┘
```

The map is primary because the task is spatial.

Carbon's geospatial guidance distinguishes choropleths, proportional-symbol maps, connection maps, heat maps, and other spatial visualizations according to the data relationship being represented rather than treating "map" as one generic chart type.  
https://preview.carbondesignsystem.com/building-blocks/data-visualization/spatial-charts

---

# 2.16.3 Map styling

The basemap SHOULD be visually quiet.

It MUST preserve enough geographic context to orient analysts.

Administrative features SHOULD NOT visually compete with detection geometry.

Suggested hierarchy:

```text
basemap                  neutral grey
administrative boundary  subtle line
concession boundary      agency secondary
protected area           distinct hatch
new canopy-loss polygon  critical accent
selected detection       stronger outline
field-verified event     separate verified state
```

The palette MUST communicate analytical meaning before agency branding.

---

# 2.16.4 Land-cover colour

Land-cover classes SHOULD use a documented domain palette.

Colours MUST NOT be selected simply because:

```text
forest = green
water = blue
urban = grey
```

looks familiar.

The palette SHOULD be tested for:

- adjacent-class discrimination;
- colour-vision deficiency;
- basemap interaction;
- print/export;
- selection overlays.

A legend MUST identify the actual classification scheme.

Example:

```text
Evergreen forest
Plantation
Scrub
Agriculture
Built-up
Water
Cloud / no observation
```

is materially better than:

```text
Green
Yellow
Orange
Grey
Blue
```

---

# 2.16.5 Temporal truthfulness

The product MUST distinguish:

```text
observation date
processing date
publication date
last refresh
```

where they differ.

It MUST NOT show a pulsing "LIVE" badge if satellite scenes arrive every several days.

Craft includes honest latency.

---

# 2.16.6 Confidence and uncertainty

A detection model's confidence MUST NOT be represented as certainty.

Instead of:

```text
Deforestation detected
```

use, where domain semantics warrant:

```text
Probable canopy loss
Model confidence: 82%
Acquisition: 18 Sep 2026
```

A reviewer SHOULD be able to inspect:

- source scene;
- cloud conditions;
- model version;
- polygon geometry;
- historical imagery.

---

# 2.16.7 Agency branding

Agency identity SHOULD occupy stable institutional locations:

- application header;
- sign-in;
- exports;
- reports.

It SHOULD NOT recolour the entire map.

Brand colour MUST NOT overwrite the analytical colour system.

Government identity rules remain governed by the Corporate & Enterprise Visual Standard.

---

# 2.16.8 Meaningful detail

The crafted interface contains details a generic generator would rarely invent without context:

```text
Detection ID: FC-2026-09-1842
Area: 3.8 ha
Confidence: 82%
Sensor: Sentinel-2B
Scene: T47NQD
Acquisition: 18 Sep 2026
Cloud cover: 7%
Land-cover baseline: 2025 v3
Overlap: 2.1 ha protected area
Field status: Not verified
Case: None
```

Those details ARE the visual identity of the product.

Not purple.

Not glass.

Not a gradient.

---

# 2.16.9 Interaction craft

Selecting a polygon SHOULD:

1. highlight it;
2. move the detail panel to the matching record;
3. preserve the map extent;
4. expose evidence;
5. show available actions for the user's role.

A field officer may see:

```text
Start field verification
```

while an analyst sees:

```text
Request field verification
```

and a read-only auditor sees neither.

That difference is craft at the interaction level.

---

# 2.16.10 Empty state

Slop:

```text
No data yet 🌱
Start exploring your forest insights!
```

Craft:

```text
No canopy-loss detections match the current filters.

Observation period: 01–21 Sep 2026
Minimum area: 2 ha
Minimum confidence: 70%
Region: Pahang

[Clear filters]
```

---

# 2.16.11 Error state

Slop:

```text
Oops! Something went wrong.
Try again.
```

Craft:

```text
The land-cover layer could not be loaded.

Dataset:
National Land Cover 2025 v3

Map imagery and detection polygons are still available.

[Retry layer]
[View dataset status]
```

---

# 2.16.12 Illustration

The product SHOULD NOT use generic AI-generated forest blobs.

Useful illustration may include:

- classification legend;
- satellite acquisition diagram;
- detection methodology;
- field-verification workflow;
- before/after image pair;
- canopy-loss geometry example.

Every illustration SHOULD teach the user something about the system.

---

# 3. Anti-patterns

The following practices are non-conformant when used as defaults without context:

1. Indigo/purple gradient as universal "technology" branding.
2. Inter or Geist without typographic rationale.
3. Centred hero followed by three equal cards.
4. Uniform 16px radius across all components.
5. Pill treatment everywhere.
6. Glassmorphism without layer semantics.
7. Backdrop blur as premium styling.
8. Emoji as structural bullets.
9. Lucide icons inside pastel circles for every feature.
10. Purple CTA on white by reflex.
11. "Elevate your workflow" copy.
12. "Built for modern teams" copy.
13. "Everything you need in one place."
14. Invented metrics.
15. Invented testimonials.
16. Invented customer logos.
17. Synthetic people passed off as real users.
18. Blob/gradient SVG illustration without information.
19. Decorative floating 3D objects.
20. Drop shadows on every card.
21. Cards used for every content group.
22. Bento grids with no information rationale.
23. Fake product screenshots.
24. Empty dashboards filled with sample graphs.
25. Metric cards without decision purpose.
26. Sparklines without period or baseline.
27. "Live" states on batch data.
28. Green-up/red-down without metric semantics.
29. Symmetrical layout that ignores content priority.
30. Identical spacing between all sections.
31. Identical weight for primary and secondary content.
32. Decorative map backgrounds.
33. Rainbow chart palettes.
34. Donut charts selected for variety.
35. Animated counters.
36. Staggered entrance animation everywhere.
37. Overactive hover transforms.
38. Spring animation on every control.
39. Template FAQ sections.
40. Generic three-tier pricing.
41. Fake "Most Popular" labels.
42. Generic final CTA.
43. Generic SaaS footer taxonomy.
44. "Something went wrong."
45. "No data yet."
46. "Saved successfully."
47. Lorem-flavoured microcopy.
48. Essential information hidden in tooltips.
49. Domain terminology replaced by vague product language.
50. AI-generated happy path treated as production-complete.

---

# 4. Review Checklist

A production design MUST NOT pass craft review until applicable items are satisfied.

## Domain

- [ ] User roles are named.
- [ ] Primary tasks are named.
- [ ] Domain objects are real.
- [ ] Domain vocabulary is used.
- [ ] Units are real.
- [ ] Data freshness is explicit.
- [ ] Risk and irreversible operations are understood.

## Content

- [ ] Representative real content is present.
- [ ] No Lorem Ipsum remains.
- [ ] No invented metric remains.
- [ ] No invented testimonial remains.
- [ ] No unauthorized logo remains.
- [ ] Generic adjectives have been replaced where specificity is possible.

## Composition

- [ ] Primary content receives primary visual weight.
- [ ] Equal cards reflect actual equality.
- [ ] Asymmetry is used where priorities differ.
- [ ] Cards exist only where containment is useful.
- [ ] Spacing expresses relationship rather than mathematical perfection.

## Typography

- [ ] Typeface choice has a rationale.
- [ ] Heading hierarchy is meaningful.
- [ ] Numeric typography fits the domain.
- [ ] Typography does not simply mirror the starter template.

## Colour

- [ ] Palette is restrained.
- [ ] One signature accent is identifiable where appropriate.
- [ ] Semantic colour remains semantic.
- [ ] Gradients have a reason.
- [ ] Colour is not the sole status encoding.

## Shape

- [ ] Radius scale is intentional.
- [ ] Pill geometry is reserved for appropriate forms.
- [ ] Not every component uses the same radius.
- [ ] Shadows represent actual depth.

## Iconography

- [ ] Universal actions may use library icons.
- [ ] Domain concepts are not flattened into generic metaphors.
- [ ] Decorative coloured icon circles are justified or removed.
- [ ] Icons are not used where text is clearer.

## Imagery

- [ ] Images carry information.
- [ ] Real imagery is preferred where evidence matters.
- [ ] Synthetic people are not misrepresented.
- [ ] Decorative blobs have been removed unless they serve the identity.

## Data

- [ ] Every KPI has decision value.
- [ ] Every number has relevant unit/context.
- [ ] Charts match the analytical question.
- [ ] Data source and period are available.
- [ ] "Live" accurately represents update cadence.

## Interaction

- [ ] Loading state exists.
- [ ] Empty state is contextual.
- [ ] Errors identify what failed.
- [ ] Permission-denied state exists.
- [ ] Stale/offline behaviour is defined where applicable.
- [ ] Actions correspond to real API/domain capabilities.

## Motion

- [ ] Motion communicates change, hierarchy or spatial continuity.
- [ ] Decorative entrances are minimized.
- [ ] Reduced-motion preferences are respected.
- [ ] Routine tasks are not delayed by animation.

## AI usage

- [ ] Prompt contained real domain constraints.
- [ ] Prompt prohibited known irrelevant defaults.
- [ ] AI output was treated as a draft.
- [ ] Design rationale was reviewed by a human.
- [ ] Generated content was fact-checked.
- [ ] Token/component conformance was checked.

---

# 4.1 Copy-Paste Slop Detector

```text
ANTI-AI-SLOP DETECTOR — GOLD STANDARD 2026

Flag each TRUE item. Multiple flags indicate genericity risk.

VISUAL
[ ] Indigo-to-purple gradient with no brand/data rationale
[ ] Purple CTA on white by default
[ ] Gradient headline
[ ] Multiple decorative gradients
[ ] Glassmorphism without layer purpose
[ ] Backdrop blur used to signal "premium"
[ ] Neon dark-mode aesthetic without domain rationale
[ ] Rainbow chart palette

TYPOGRAPHY
[ ] Inter chosen without rationale
[ ] Geist chosen without rationale
[ ] Generic oversized SaaS hero
[ ] Similar font weight across all hierarchy levels
[ ] Typography copied unchanged from starter/template

COMPOSITION
[ ] Centred eyebrow + headline + copy + two CTAs
[ ] Three equal feature cards
[ ] Six-card feature grid
[ ] Bento grid without content rationale
[ ] Everything inside cards
[ ] Perfect symmetry despite unequal importance
[ ] Identical section spacing everywhere
[ ] Dashboard exists before user task is defined

SHAPE / DEPTH
[ ] 16px radius on everything
[ ] Pills everywhere
[ ] Shadow on flat static cards
[ ] Multiple stacked shadows
[ ] Floating treatment on non-floating content

ICONS
[ ] Lucide icon inside coloured circle for every feature
[ ] Sparkles used as generic AI icon
[ ] Globe/lightning/shield/rocket used as generic concepts
[ ] Icon beside every heading
[ ] Domain concepts use generic icons despite meaningful distinctions

COPY
[ ] "Elevate your workflow"
[ ] "Supercharge your..."
[ ] "Unlock the power of..."
[ ] "Built for modern teams"
[ ] "Everything you need in one place"
[ ] "Powerful. Simple. Seamless."
[ ] "Get Started" where a task-specific CTA is possible
[ ] "Learn More" where destination can be named
[ ] "No data yet"
[ ] "Something went wrong"
[ ] "Saved successfully"
[ ] Lorem-flavoured microcopy

CREDIBILITY
[ ] Unverified customer statistic
[ ] Invented testimonial
[ ] Unauthorized customer-logo wall
[ ] AI face presented as real customer/staff member
[ ] Decorative security/compliance badge
[ ] Fake precision or unsupported performance claim

IMAGERY
[ ] Abstract blob SVG
[ ] Gradient mesh with no information role
[ ] Generic floating 3D objects
[ ] Isometric people using software
[ ] Decorative map background
[ ] Fake product screenshot
[ ] Generic stock imagery where real evidence exists

DATA / DASHBOARD
[ ] Fake dashboard graph
[ ] Meaningless KPI card
[ ] Metric lacks unit
[ ] Metric lacks time period
[ ] Metric lacks denominator/baseline
[ ] Unlabelled decorative sparkline
[ ] Green up-arrow assumed to mean good
[ ] Chart types chosen for visual variety
[ ] "Live" indicator on non-live data
[ ] Map treated as visual wallpaper

MOTION
[ ] Every section animates on entrance
[ ] Cards lift/scale/glow together on hover
[ ] Metrics animate from zero on page load
[ ] Spring animation everywhere
[ ] Motion has no state/spatial meaning

TEMPLATES
[ ] FAQ accordion added because templates have FAQs
[ ] Starter / Pro / Enterprise invented before pricing model
[ ] "Most Popular" tier without evidence
[ ] Generic logo strip
[ ] Generic "Ready to get started?" final CTA
[ ] Product / Resources / Company / Legal footer copied by reflex

CRAFT CHECK
[ ] Real users/roles are named
[ ] Real domain objects are present
[ ] Real content or representative data is used
[ ] Page priority follows actual task priority
[ ] One restrained signature visual idea exists
[ ] Domain-defining icons/illustrations are specific
[ ] Empty/error/loading/permission states are designed
[ ] Metrics and charts support decisions
[ ] All generated factual claims are verified
[ ] Every major visual decision has a rationale
```

---

# 5. Canonical Summary

The Anti-AI-Slop standard is governed by one distinction:

```text
A template knows what interfaces usually look like.

Craft knows why this interface must look and behave this way.
```

The canonical sequence is:

```text
domain
↓
real users
↓
real tasks
↓
real objects
↓
real content/data
↓
information hierarchy
↓
interaction model
↓
Design Tokens
↓
Layout Pattern
↓
components
↓
visual identity
↓
polish
```

AI-slop workflows commonly reverse that order:

```text
polish
↓
cards
↓
gradient
↓
icons
↓
fake copy
↓
invented data
↓
hope the product fits
```

The governing rules are:

```text
Do not ban common patterns.
Ban unexplained defaults.

Do not ask AI to "make it modern."
Give it a domain, task, data model, constraints and states.

Use real content early.

Do not make equal things merely because equal grids look tidy.

Use asymmetry when importance is asymmetric.

Choose typography deliberately.

Use a restrained palette.
Let one accent carry identity.

Introduce controlled non-uniformity,
not accidental inconsistency.

Use library icons for universal actions.
Create domain-specific treatment for domain-specific concepts.

Images must carry information.

Never invent statistics, customers, testimonials or proof.

A dashboard does not need metrics.
It needs decisions.

A map is not decoration.
It is an analytical surface.

Motion must explain something.

shadcn/ui is a component baseline,
not a visual identity.

AI output is a draft,
even when it looks finished.

Craft lives in the details
the screenshot generator normally forgets:
units,
states,
permissions,
latency,
error recovery,
data provenance,
terminology,
and interaction consequences.
```

A **Gold Standard 2026** product SHOULD be difficult to transplant into another industry without obvious breakage.

If the same interface could become:

```text
fintech
healthtech
climatetech
HR SaaS
AI productivity
project management
```

merely by replacing the logo, purple accent and headline, the design has not yet achieved sufficient domain specificity.

The goal is not to make a product look less like AI.

The goal is to make it look and behave unmistakably like **the product that its users actually need**.

---

# 6. Sources

1. **Nielsen Norman Group — Good from Afar, But Far from Good: AI Prototyping in Real Design Contexts**  
   https://www.nngroup.com/articles/ai-prototyping/

2. **Nielsen Norman Group — Prompt to Design Interfaces: Why Vague Prompts Fail and How to Fix Them**  
   https://www.nngroup.com/articles/vague-prototyping/

3. **Nielsen Norman Group — AI UX-Design Tools Are Not Ready for Primetime**  
   https://www.nngroup.com/articles/ai-design-tools-not-ready/

4. **Nielsen Norman Group — Which Comes First? Layout or Content?**  
   https://www.nngroup.com/articles/layout-vs-content/

5. **Nielsen Norman Group — Photos as Web Content**  
   https://www.nngroup.com/articles/photos-as-web-content/

6. **Nielsen Norman Group — Trustworthiness in Web Design: 4 Credibility Factors**  
   https://www.nngroup.com/articles/trustworthy-design/

7. **Material Design 3 — Motion**  
   https://m3.material.io/styles/motion/overview/how-it-works

8. **IBM Carbon Design System — Spatial Charts / Geospatial Visualisation**  
   https://preview.carbondesignsystem.com/building-blocks/data-visualization/spatial-charts

9. **IBM Carbon Design System — Dashboards**  
   https://preview.carbondesignsystem.com/building-blocks/data-visualization/dashboards

10. **IBM Carbon Design System — Data Visualization Legends**  
    https://v10.carbondesignsystem.com/data-visualization/legends/

11. **W3C — Web Content Accessibility Guidelines (WCAG) 2.2**  
    https://www.w3.org/TR/WCAG22/

12. **shadcn/ui — Components**  
    https://ui.shadcn.com/docs/components

This version deliberately makes the detector **cumulative rather than stylistically absolutist**: the standard can reject generic model-prior design without turning valid gradients, common fonts, shadcn/ui, Lucide, cards, or familiar interaction patterns into prohibited technologies.
