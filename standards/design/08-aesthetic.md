---
id: "aesthetic"
title: "Aesthetic & Visual Language"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "aesthetic", "visual", "language"]
applies_to: ["ui"]
related: []
legacy_number: 51
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 44301
provenance: baseline

---

Below is the canonical chapter. It treats aesthetic language as the governing visual intent above tokens and components, while keeping implementation choices testable and enforceable.

# Aesthetic & Visual Language — Gold Standard 2026

**Status:** Canonical  
**Standard level:** Gold Standard 2026  
**Canonical placement:** **Design System → Aesthetic & Visual Language → Design Tokens → Layout**  
**Component baseline:** shadcn/ui  
**Applies to:** Product UI, authenticated applications, public web, marketing surfaces, transactional and lifecycle email, documentation surfaces, and approved product-generated imagery.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements unless an approved exception is documented.

---

# 1. Purpose

## 1.1 Objective

This standard defines the visual identity layer of the product system: how the product should **look, feel, behave, and express the brand** before those decisions are encoded into Design Tokens, Layout rules, Components, or Patterns.

The Aesthetic & Visual Language standard MUST answer questions such as:

- What emotional character should the interface communicate?
- How should typography feel?
- What does colour mean?
- How much visual density is appropriate?
- When should surfaces be opaque, translucent, or elevated?
- How should imagery, illustration, shadows, motion, and dark mode behave?
- How expressive may marketing be compared with the application?
- Which visual characteristics MUST remain recognisable across product UI, marketing, and email?
- Which aesthetic choices are prohibited even if they are technically possible?

This standard MUST NOT duplicate the numerical implementation details owned by **Design Tokens** or the structural rules owned by **Layout**.

The relationship is:

**Aesthetic & Visual Language defines intent → Design Tokens encode values → Components implement those values → Patterns compose components → Layout governs spatial structure.**

## 1.2 Visual character

The canonical visual character is:

**Precise, calm, contemporary, purposeful, and recognisable.**

The system SHOULD communicate confidence through clarity rather than ornament.

The design SHOULD feel:

- refined without appearing decorative;
- modern without depending on visual trends;
- editorial where storytelling benefits from hierarchy;
- utilitarian where users are completing operational tasks;
- expressive in controlled brand moments;
- quiet during high-frequency or high-consequence workflows.

Visual sophistication MUST come primarily from proportion, typography, hierarchy, spacing, material discipline, imagery, and interaction quality rather than from excessive effects.

## 1.3 Scope boundaries

This standard governs:

- typography voice;
- colour semantics and emotional use;
- imagery and illustration;
- whitespace rhythm and visual density;
- material character;
- translucency and glass;
- border, shadow, and elevation character;
- motion personality;
- light and dark mood;
- editorial versus utilitarian presentation;
- visual hierarchy;
- brand expression;
- cross-channel consistency;
- aesthetic application of states;
- aesthetic behaviour of shadcn/ui components.

This standard does **not** own:

- token values;
- breakpoint definitions;
- grid mathematics;
- component APIs;
- form validation logic;
- state-management architecture;
- API contracts;
- database semantics;
- authorization rules;
- accessibility conformance criteria.

Those concerns remain governed by their respective canonical standards.

Where standards overlap, **Security, Accessibility, correctness, and user comprehension MUST take precedence over aesthetic preference**.

---

# 2. Rules

## 2.1 System architecture and shadcn/ui baseline

shadcn/ui MUST be the default component baseline unless a documented platform constraint requires otherwise.

New 2026 applications SHOULD use the current shadcn/ui default primitive implementation, Base UI. Existing Radix-based shadcn/ui applications MUST NOT migrate solely to satisfy this aesthetic standard when their components remain correct, accessible, and supported.

The primitive implementation MUST be treated as an implementation detail below the design-system API.

Product code SHOULD consume project-owned shadcn/ui components from the canonical component layer rather than styling primitive libraries independently.

Aesthetic customization MUST occur through:

1. semantic Design Tokens;
2. approved component variants;
3. approved Pattern composition;
4. explicitly documented channel-specific presentation rules.

Feature teams MUST NOT create parallel visual systems by directly restyling individual instances.

shadcn/ui source ownership does not permit uncontrolled divergence. Modified shadcn/ui components MUST continue to conform to the Component, Accessibility, Forms & Validation, and Design Tokens standards.

---

## 2.2 Visual hierarchy

Every surface MUST establish an unambiguous hierarchy between:

1. context;
2. primary content;
3. primary action;
4. supporting content;
5. metadata and secondary actions.

Hierarchy SHOULD be created primarily through typography, spacing, grouping, placement, and semantic colour.

Hierarchy MUST NOT depend primarily on shadow, saturation, animation, or arbitrary font-size escalation.

A screen SHOULD have one dominant visual purpose.

Multiple elements MUST NOT compete simultaneously as the strongest object on the page unless the Pattern explicitly requires comparison.

Primary actions MUST be visually identifiable without making every action visually prominent.

Secondary and tertiary information SHOULD recede without becoming inaccessible or illegible.

Decorative elements MUST NOT outrank operational content.

---

## 2.3 Typography voice

Typography MUST communicate clarity first and brand character second.

Application typography SHOULD feel precise, compact enough for productive work, and neutral enough to support long sessions.

Marketing typography MAY be more editorial and expressive, provided recognisable brand characteristics remain intact.

### 2.3.1 Type roles

The system MUST define semantic typography roles rather than allowing arbitrary font-size selection.

At minimum, typography MUST distinguish:

- display;
- page title;
- section heading;
- subsection heading;
- body;
- compact body;
- label;
- metadata;
- caption;
- code or machine-readable values where applicable.

The actual font families, sizes, weights, tracking, and line heights MUST be encoded in Design Tokens.

### 2.3.2 Typography hierarchy

Heading hierarchy MUST reflect information hierarchy.

Font size MUST NOT be used to compensate for weak content structure.

Interfaces SHOULD normally use a restrained range of font weights.

Excessive semibold or bold text MUST NOT be used as a substitute for hierarchy.

Body text SHOULD maintain comfortable reading rhythm and MUST NOT be compressed to increase apparent information density beyond accessible limits.

Uppercase text SHOULD be reserved for short, deliberate labels or specialised notation. Long uppercase labels and paragraphs MUST NOT be used.

Letter spacing MUST NOT be manipulated decoratively in controls or body content where it impairs scanning.

### 2.3.3 Numeric and data typography

Financial values, measurements, identifiers, dates, table values, and other alignment-sensitive information SHOULD use appropriate numeric features where supported.

Tabular numerals SHOULD be used when changing values must remain visually aligned.

Monospace typography MAY be used for code, hashes, machine identifiers, technical paths, or similar technical material.

Monospace MUST NOT become the default visual language for ordinary application data merely to imply technical sophistication.

---

## 2.4 Colour semantics and emotional use

Colour MUST carry meaning intentionally.

Components MUST consume semantic colour tokens rather than raw palette values.

The semantic system MUST separate at least:

- canvas/background;
- foreground/content;
- muted content;
- surfaces;
- borders;
- primary/brand action;
- secondary action;
- focus;
- destructive/error;
- warning;
- success;
- informational;
- selected/active;
- data-visualisation categories where required.

A visual palette MAY contain more colours than the semantic system exposes, but application code MUST NOT depend directly on those palette values.

### 2.4.1 Brand colour

Brand colour SHOULD act as a recognisable signal, not as continuous decoration.

High-chroma brand colour SHOULD be concentrated in:

- primary action;
- selected states;
- meaningful highlights;
- signature marketing moments;
- small identity-bearing details.

Large quantities of saturated colour SHOULD NOT dominate operational workflows.

A brand colour MUST NOT be reused for warning, destructive, or success semantics where doing so creates ambiguity.

### 2.4.2 Semantic colour

Success, warning, destructive, and informational colours MUST have stable semantic meanings throughout the system.

The same colour MUST NOT indicate materially different states in different modules.

Semantic state MUST NOT be communicated through colour alone.

Icons, text, structure, labels, or other non-colour signals MUST accompany critical status differences.

### 2.4.3 Colour restraint

The default application experience SHOULD be predominantly neutral.

Neutral does not mean visually flat. Depth SHOULD arise from hierarchy, spacing, border treatment, typography, controlled contrast, and material transitions.

Screens SHOULD avoid simultaneously displaying numerous high-saturation colours unless the content itself requires categorical differentiation.

Decorative gradients MUST be controlled by approved tokens or assets.

Ad hoc gradients MUST NOT be introduced inside feature code.

---

## 2.5 Light and dark mood

Light and dark modes MUST represent the same visual system, not separate themes.

Semantic relationships MUST remain stable across modes.

Changing mode MUST NOT change:

- meaning;
- action priority;
- information architecture;
- component hierarchy;
- validation semantics;
- security semantics.

Dark mode MUST NOT be implemented as a simple inversion of light mode.

Dark surfaces SHOULD use controlled luminance separation rather than excessive shadow.

Pure black SHOULD NOT dominate large surfaces unless intentionally defined by the brand system.

Pure white SHOULD NOT be used indiscriminately for dark-mode foreground content.

High-saturation colours SHOULD generally be moderated for dark backgrounds to avoid vibration and disproportionate emphasis.

Images, logos, illustrations, charts, overlays, and maps MUST be reviewed in both modes.

Theme preference MUST follow the State Management standard. The visual layer MUST NOT create a separate unsynchronised theme state.

System preference SHOULD be supported.

User-selected preference SHOULD persist according to the canonical preference-state mechanism.

Theme hydration MUST NOT create avoidable flashes of the incorrect theme.

---

## 2.6 Whitespace rhythm and density

Whitespace is structural and MUST be intentional.

Spacing MUST be selected from canonical Design Tokens.

Arbitrary spacing values MUST NOT be introduced to visually repair individual screens.

Visual rhythm SHOULD use repeatable relationships between:

- page regions;
- sections;
- component groups;
- labels and controls;
- headings and content;
- related and unrelated objects.

Related elements MUST be visually closer than unrelated elements.

Large whitespace SHOULD signal hierarchy, change of context, or deliberate emphasis.

Whitespace MUST NOT be removed simply to make an interface appear more information-dense.

Conversely, operational interfaces MUST NOT use marketing-scale whitespace that forces unnecessary scrolling or separates controls from the data they govern.

### 2.6.1 Density modes

If products require compact and comfortable density variants, density MUST be implemented systematically through Design Tokens and Components.

Feature teams MUST NOT invent local compact modes.

Changing density MUST NOT reduce target sizes, focus visibility, legibility, or other accessibility requirements below the approved minimum.

---

## 2.7 Shape, radius, and geometry

Geometry SHOULD feel deliberate, restrained, and consistent.

Corner radius MUST derive from canonical radius tokens.

The system SHOULD use a small, coherent radius family.

Large rounded forms SHOULD be reserved for components where their geometry supports the product character.

Pill shapes SHOULD be reserved primarily for inherently compact or categorical objects such as badges, chips, segmented controls, or appropriate actions.

Containers MUST NOT become rounded cards merely because they contain content.

Nested rounded rectangles SHOULD be minimised.

A container SHOULD exist because it establishes grouping, interaction, clipping, separation, or elevation—not simply because visual decoration is desired.

---

## 2.8 Materials: opaque, translucent, and glass

Opaque surfaces MUST be the default material for operational UI.

Translucency MAY be used where background context remains useful, such as:

- overlays;
- floating navigation;
- selected immersive surfaces;
- media experiences;
- controlled marketing compositions.

Glass treatment MUST be exceptional rather than systemic.

Glass MUST NOT be used where it reduces text contrast, obscures boundaries, introduces visual noise, or weakens the user's understanding of layer order.

Critical forms, destructive confirmations, authentication, authorization, financial actions, and dense data surfaces SHOULD use stable opaque or near-opaque materials.

Backdrop blur MUST NOT be required to understand a hierarchy.

Interfaces MUST remain comprehensible when blur effects are unavailable or reduced.

Translucency MUST use approved material tokens and MUST NOT be recreated ad hoc through arbitrary alpha values.

---

## 2.9 Borders and separators

Borders SHOULD express structure quietly.

Border colour and strength MUST be semantic and tokenised.

Default containers SHOULD use the lightest boundary sufficient to communicate grouping.

Repeated heavy outlines MUST NOT become the primary means of structuring a page.

Separators SHOULD be preferred when the relationship is sequential.

Containment SHOULD be preferred when a group has independent behaviour, state, elevation, or identity.

Borders MUST NOT be removed from interactive controls where the resulting affordance becomes ambiguous.

---

## 2.10 Shadow and elevation character

Elevation MUST represent actual visual layering.

Shadow MUST NOT be used merely to make an element appear more polished.

The system SHOULD maintain a small elevation vocabulary, for example:

- base;
- raised;
- overlay;
- modal/top layer.

Exact values belong in Design Tokens.

Elevation SHOULD increase when an element physically or conceptually overlays another layer.

A static card inside the normal document flow SHOULD NOT receive strong floating elevation.

Menus, popovers, tooltips, sheets, dialogs, and other overlay components SHOULD express sufficient separation from the layer beneath them.

Shadows SHOULD be soft, controlled, and subordinate to content.

Large, dark, theatrical drop shadows MUST NOT be used in routine application UI.

Dark mode SHOULD rely more heavily on luminance and border separation because conventional dark shadows may have insufficient visual utility.

---

## 2.11 Imagery

Imagery MUST serve a communicative role.

Photography SHOULD feel credible, specific, and contextually relevant.

Generic stock imagery SHOULD NOT be used when it weakens trust or makes the product appear interchangeable.

Photography SHOULD favour natural composition, controlled colour, and sufficient negative space for the intended layout.

Image treatment SHOULD maintain a coherent:

- crop philosophy;
- tonal character;
- contrast range;
- saturation range;
- corner treatment;
- subject treatment.

Product screenshots used in marketing MUST represent plausible product states.

Screenshots MUST NOT expose credentials, private user information, confidential identifiers, API secrets, internal infrastructure details, or sensitive production data.

Any sample data shown in imagery MUST comply with Security and Data & Database standards.

Text rendered inside images SHOULD be avoided when semantic HTML text can provide the same information.

---

## 2.12 Illustration

Illustration MAY increase warmth, comprehension, identity, or narrative value where photography or interface imagery is inappropriate.

Illustration style MUST be coherent across the product family.

A product MUST NOT mix unrelated illustration languages such as:

- dimensional 3D objects;
- flat geometric vectors;
- hand-drawn sketches;
- photoreal AI imagery;
- cartoon characters;

unless an explicitly approved campaign or sub-brand system defines the relationship.

Illustration SHOULD use the same semantic colour philosophy as the interface.

Illustrations SHOULD NOT imitate interactive controls.

Decorative illustrations MUST NOT imply unavailable features, states, permissions, or outcomes.

Empty-state illustration SHOULD remain secondary to the explanation and next action.

---

## 2.13 Iconography

Icons MUST use the canonical icon family defined by the Design System.

Icons from unrelated families MUST NOT be mixed casually.

Icon size, stroke, optical weight, and alignment MUST be normalised by Components or Design Tokens.

Icons SHOULD communicate common actions or reinforce labels.

Unfamiliar icons MUST NOT replace clear text labels for important actions.

Icons MUST NOT be used as decorative noise inside every heading, card, or control.

Brand-specific icons MAY be introduced when they represent domain concepts not adequately covered by the baseline icon set.

New domain icons MUST match the optical language of the canonical family.

---

## 2.14 Motion personality

Motion SHOULD communicate continuity, causality, state change, hierarchy, or orientation.

Motion MUST NOT exist solely to demonstrate technical capability.

The motion personality SHOULD be:

**fast, controlled, quiet, and physically coherent.**

Routine interactions SHOULD feel responsive rather than cinematic.

### 2.14.1 Appropriate motion

Motion MAY clarify:

- enter and exit relationships;
- expansion and collapse;
- selection changes;
- overlay origin;
- drag relationships;
- progress;
- reordering;
- feedback following a deliberate action.

### 2.14.2 Prohibited motion

Routine UI MUST NOT use:

- decorative bouncing;
- continuous floating;
- gratuitous parallax;
- exaggerated spring effects;
- long page transitions;
- motion that delays task completion;
- multiple unrelated animations competing simultaneously.

Loading indicators MUST NOT create unnecessary visual activity when skeleton, progressive rendering, or stable progress feedback provides better information.

### 2.14.3 Reduced motion

Motion MUST respect applicable Accessibility requirements and user reduced-motion preferences.

Non-essential movement triggered by interaction SHOULD be disabled or substantially reduced when reduced motion is requested.

Removing motion MUST NOT remove information.

Opacity or immediate state changes MAY replace spatial movement where appropriate.

---

## 2.15 Interaction feedback

Every meaningful interaction MUST produce perceivable feedback.

Hover, focus, active, selected, loading, success, disabled, and error states MUST be visually intentional.

Hover styling MUST NOT be the only indicator that an element is interactive.

Keyboard focus MUST remain clearly visible and MUST follow the Accessibility standard.

Pressed or active feedback SHOULD feel immediate.

Optimistic interfaces MUST visually distinguish pending state where pretending completion could mislead the user.

Animation MUST NOT conceal API latency, validation latency, or processing state.

---

## 2.16 Forms and validation aesthetics

Forms MUST follow the canonical Forms & Validation standard.

Aesthetic treatment MUST reinforce rather than replace form semantics.

Labels MUST remain visually associated with their controls.

Placeholder text MUST NOT replace labels.

Required, optional, help, warning, and error information MUST have consistent visual treatment.

Error styling MUST NOT rely solely on red borders.

Validation feedback MUST identify:

- which field requires attention;
- what is wrong;
- what the user can do next.

Error messages SHOULD appear near the relevant control when possible.

Forms MUST NOT become visually unstable as validation messages appear.

Control height, label rhythm, help-text spacing, and error spacing SHOULD be designed as a coherent field system.

Destructive or irreversible actions MUST be visually distinct from normal primary actions in accordance with the relevant Pattern and Security standards.

---

## 2.17 Data-dense interfaces

Tables, dashboards, maps, analytics screens, and operational consoles MUST prioritise information comprehension over decoration.

Data regions SHOULD maximise signal-to-noise ratio.

Repeated cards SHOULD NOT be used where a table, list, definition structure, or grouped section communicates the information more effectively.

Colour in charts MUST follow semantic or categorical data-visualisation tokens.

Chart colour MUST NOT be borrowed arbitrarily from status colours.

Data visualisation MUST remain interpretable without relying solely on hue differences.

Decorative gradients, 3D charts, excessive gridlines, large shadows, and ornamental data ink SHOULD NOT be used.

Critical values SHOULD be emphasised through hierarchy and context rather than oversized typography alone.

---

## 2.18 Editorial versus utilitarian tone

The visual system MUST support two controlled presentation modes.

### 2.18.1 Utilitarian mode

Application workflows SHOULD default to utilitarian presentation.

Utilitarian presentation prioritises:

- clarity;
- density appropriate to the task;
- predictable controls;
- restrained colour;
- rapid scanning;
- stable placement;
- visible state.

Operational pages MUST NOT behave like marketing landing pages.

### 2.18.2 Editorial mode

Editorial treatment MAY be used for:

- marketing;
- onboarding;
- announcements;
- product education;
- reports;
- long-form documentation;
- feature storytelling;
- carefully designed empty or success moments.

Editorial presentation MAY use stronger typography, larger whitespace, photography, illustration, richer composition, and controlled motion.

Editorial treatment MUST NOT compromise navigation, semantic structure, accessibility, or task completion.

### 2.18.3 Transition between modes

A user moving from marketing into the application SHOULD recognise the same organisation.

The expressive intensity may change; the identity MUST NOT.

---

## 2.19 Brand expression rules

Brand identity MUST be built from repeatable signals rather than one-off decoration.

The system SHOULD maintain recognisable signatures across channels through a stable combination of:

- typography;
- semantic brand colour;
- geometry;
- icon character;
- image treatment;
- spacing rhythm;
- material treatment;
- motion character;
- writing and content hierarchy.

No single signature MUST carry the entire identity.

Removing a hero gradient, illustration, or large logo MUST NOT make the underlying product visually indistinguishable from an unrelated default template.

At the same time, brand expression MUST NOT override established usability conventions without a measurable benefit.

### 2.19.1 Logo use

Logos MUST use approved assets.

Logos MUST NOT be distorted, recoloured arbitrarily, reconstructed with text, or placed on insufficient-contrast backgrounds.

Logo scale SHOULD be proportionate to context.

Application chrome SHOULD favour product utility over repeated logo prominence.

### 2.19.2 Brand moments

High-expression brand treatment SHOULD be concentrated in deliberate moments, including:

- public marketing;
- first-run experiences;
- launch or campaign surfaces;
- selected success moments;
- reports and editorial content.

High-expression treatment SHOULD NOT surround every routine action.

Brand distinctiveness is stronger when contrast exists between expressive moments and calm operational surfaces.

---

## 2.20 Cross-channel consistency

Marketing, application UI, and email MUST share one visual identity while respecting the constraints of each medium.

### 2.20.1 Invariants

The following SHOULD remain recognisable across channels:

- typography character;
- brand colour relationships;
- logo treatment;
- hierarchy;
- geometry;
- image/illustration character;
- tone of emphasis;
- overall restraint.

### 2.20.2 Marketing

Marketing MAY use the broadest expressive range.

Marketing MAY introduce:

- larger typography;
- stronger composition;
- richer imagery;
- greater whitespace;
- controlled gradients;
- campaign-specific art direction;
- richer motion.

Marketing MUST still use canonical semantic and brand foundations.

Campaign expression MUST NOT silently redefine the product design system.

### 2.20.3 Application

The application MUST optimise for comprehension, predictability, and repeated use.

Application UI SHOULD use the least visual treatment needed to establish hierarchy and state.

Brand identity in the application SHOULD be evident through accumulated detail rather than constant visual emphasis.

### 2.20.4 Email

Email MUST preserve hierarchy, brand recognition, readable typography, semantic colour, and approved imagery while assuming restricted rendering capabilities.

Core email meaning MUST NOT depend on:

- backdrop blur;
- complex transparency;
- advanced animation;
- hover;
- JavaScript;
- custom web-font availability.

Email SHOULD degrade gracefully to robust typography, colour, spacing, and imagery.

Transactional email SHOULD be materially more utilitarian than promotional email.

Critical transactional information MUST remain readable when images are blocked.

---

## 2.21 Design Tokens relationship

Every reusable aesthetic value MUST ultimately resolve to a Design Token.

This includes recurring:

- colours;
- typography;
- spacing;
- radii;
- borders;
- shadows;
- opacity;
- motion duration;
- motion easing;
- layer/elevation values;
- material values.

Feature code MUST NOT establish a second token system through arbitrary utility values or local CSS variables.

Semantic tokens SHOULD be preferred over primitive tokens in component usage.

For example, components SHOULD consume concepts equivalent to `background`, `foreground`, `primary`, `muted`, `border`, `ring`, `destructive`, and their foreground relationships rather than literal palette coordinates.

Token names MUST describe role rather than aesthetic appearance wherever the value may vary by theme.

A token called `text-danger` is preferable to one whose contract is effectively `text-red-600`.

---

## 2.22 Component standard relationship

Components MUST embody this visual language by default.

Consumers SHOULD NOT need substantial styling to make a canonical component look canonical.

The Component standard MUST define the permitted:

- sizes;
- variants;
- states;
- slots;
- density options;
- composition boundaries.

Feature code MUST NOT create visual variants by repeatedly attaching custom class combinations to otherwise canonical components.

A repeated variation SHOULD be promoted to an approved Component variant or Pattern.

Component styling MUST NOT change the semantic behaviour established by the underlying accessible primitive.

---

## 2.23 Pattern standard relationship

Patterns define how components behave together.

Aesthetic consistency MUST NOT be achieved by forcing every workflow into the same composition.

Dialogs, sheets, inline editing, page forms, tables, cards, command interfaces, and navigation each have distinct structural purposes.

Teams MUST use the Pattern standard to select the appropriate interaction model before applying visual treatment.

Aesthetics MUST NOT be used to make an incorrect Pattern appear acceptable.

---

## 2.24 Accessibility relationship

Accessibility is a design input, not a final visual QA pass.

This visual language MUST operate within the canonical Accessibility standard.

At minimum, aesthetic choices MUST preserve:

- required contrast;
- visible focus;
- distinguishable interactive states;
- non-colour semantic cues;
- readable text;
- adequate target sizes;
- zoom and reflow;
- reduced-motion behaviour;
- meaningful content order;
- understandable error communication.

A visual treatment that cannot meet accessibility requirements MUST be changed.

Accessibility requirements MUST NOT be waived to protect a particular shade, opacity, font weight, animation, or decorative treatment.

---

## 2.25 Security relationship

Aesthetics MUST NOT obscure security-relevant meaning.

Authentication, authorization, destructive actions, sensitive settings, privilege changes, financial operations, and data-export actions MUST use clear language and unambiguous interaction states.

Visual similarity MUST NOT make a destructive action appear equivalent to a harmless action.

Security warnings MUST NOT be visually minimised to preserve a clean layout.

Marketing-style urgency MUST NOT be used around consent, permissions, authentication, payments, or security-sensitive actions.

The interface MUST NOT use visual dark patterns to:

- conceal consequences;
- pressure consent;
- disguise subscriptions or charges;
- make rejection materially harder than acceptance;
- blur the difference between optional and required permissions.

Sensitive information displayed visually MUST comply with masking, logging, screenshot, and exposure requirements in the Security standard.

---

## 2.26 Data & Database relationship

Presentation MUST reflect authoritative data semantics rather than inventing its own.

UI colour, labels, icons, and visual grouping MUST NOT redefine database or domain states independently.

If data has states such as pending, approved, rejected, expired, archived, or deleted, the canonical domain meaning MUST be established before aesthetic mappings are assigned.

Unknown, null, unavailable, zero, and empty MUST NOT be represented as interchangeable visual states.

The interface MUST distinguish these concepts when the domain distinguishes them.

Sample data used in marketing, demos, screenshots, storybooks, or visual regression fixtures MUST follow approved synthetic-data rules.

---

## 2.27 API relationship

Visual state MUST reflect actual API state.

Interfaces MUST distinguish where relevant:

- initial;
- loading;
- refreshing;
- successful;
- empty;
- partial;
- stale;
- offline;
- validation failure;
- authorization failure;
- server failure.

A loading animation MUST NOT falsely imply that a request has succeeded.

Success styling MUST NOT appear before the underlying operation reaches the success condition defined by the API and State Management standards.

API error detail MUST be transformed into safe, actionable user messaging according to the API, Security, and Error Handling standards.

Raw stack traces, infrastructure messages, database errors, internal identifiers, or sensitive API content MUST NOT be exposed merely because the visual error component can display arbitrary text.

---

## 2.28 State Management relationship

Visual state MUST derive from canonical application state.

Components MUST NOT independently maintain duplicate visual representations of domain state when a shared canonical source exists.

Theme, density, navigation expansion, modal visibility, pending interactions, selection, and similar UI states MUST follow the ownership rules in the State Management standard.

Temporary visual state SHOULD remain local when it has no wider semantic relevance.

Persisted preferences MUST NOT be inferred from arbitrary DOM classes where canonical state exists.

Animation state MUST NOT become an alternative business-state machine.

---

## 2.29 Loading, empty, error, and success aesthetics

System states MUST appear intentionally designed.

### Loading

Loading feedback SHOULD preserve spatial stability.

Skeletons SHOULD resemble the approximate structure of expected content without reproducing excessive decorative detail.

Skeletons MUST NOT be shown when the interface already has useful stale or cached content that should remain visible according to the relevant Pattern.

### Empty

Empty states MUST explain the absence of content.

Where an action is possible, the next appropriate action SHOULD be visible.

Illustration is optional.

An empty-state illustration MUST NOT outweigh the explanatory content.

### Error

Errors MUST clearly distinguish failure from normal emptiness.

Error presentation SHOULD match severity.

Recoverable errors SHOULD provide a recovery action where possible.

### Success

Routine success SHOULD normally be acknowledged with restrained feedback.

Large celebratory treatments SHOULD be reserved for genuinely meaningful milestones.

Confetti or similarly high-motion celebration MUST NOT be the standard success treatment for routine CRUD operations.

---

## 2.30 Responsive aesthetic behaviour

Responsive design MUST preserve hierarchy rather than merely scale dimensions.

Small screens MAY reduce decorative treatments before reducing content clarity.

Large display typography, decorative imagery, secondary panels, and expanded whitespace SHOULD collapse or simplify before core controls are compromised.

Mobile layouts MUST NOT preserve desktop aesthetics at the expense of usability.

Desktop layouts MUST NOT simply stretch mobile components across excess width.

The Layout standard owns responsive structure; this standard governs which visual characteristics are essential enough to survive those structural changes.

---

## 2.31 Performance and visual effects

Aesthetic effects MUST justify their runtime cost.

Large media, blur, filters, animation, video, custom fonts, and complex shadows SHOULD be budgeted against performance requirements.

Visual polish MUST NOT materially degrade:

- interaction latency;
- initial rendering;
- scrolling;
- battery consumption;
- memory usage;
- lower-powered device behaviour.

Decorative effects SHOULD be progressively enhanced where appropriate.

The usable baseline MUST remain visually coherent without optional effects.

---

## 2.32 Exceptions

A deviation from this standard MUST be intentional.

Exceptions SHOULD document:

- the rule being deviated from;
- why existing components or tokens are insufficient;
- accessibility impact;
- security impact where applicable;
- affected channels;
- whether the change should become a new reusable token, component, Pattern, or standard rule.

One-off visual exceptions SHOULD be treated as a design-system signal, not merely as local styling work.

Repeated exceptions MUST trigger design-system review.

---

# 3. Anti-patterns

The following are non-conformant unless explicitly covered by an approved Pattern or exception.

## 3.1 Default-template identity

A product consisting primarily of stock shadcn/ui components with unchanged visual defaults and no deliberate brand language.

shadcn/ui is the baseline, not the finished identity.

## 3.2 Ad hoc Tailwind design

Repeated arbitrary utilities such as ungoverned colours, shadows, radii, spacing, opacity, or animation values applied directly inside feature code.

Reusable visual decisions belong in tokens and components.

## 3.3 Card soup

Every section is placed inside a rounded, bordered, shadowed card regardless of semantic grouping.

## 3.4 Rainbow status design

Every state receives a bright colour, resulting in a screen where nothing has meaningful visual priority.

## 3.5 Brand-colour flooding

The primary brand colour is used across backgrounds, headings, borders, icons, controls, links, and decorative objects simultaneously.

## 3.6 Glass everywhere

Blurred translucent panels are used as the default material, including forms, tables, dialogs, and dense application surfaces.

## 3.7 Shadow as hierarchy

Elements receive progressively larger shadows because the underlying information hierarchy is weak.

## 3.8 Typography as decoration

Extreme display sizes, unnecessary weight variation, excessive letter spacing, or arbitrary font changes substitute for content hierarchy.

## 3.9 Invisible affordance

Controls look like ordinary text or decoration until hovered.

## 3.10 Colour-only meaning

State is differentiated only through red, green, yellow, or other hue.

## 3.11 Animation theatre

Routine navigation and CRUD interactions include long transitions, bouncing, parallax, staged reveals, or large spring movement.

## 3.12 Faux premium design

Heavy blur, metallic gradients, exaggerated glow, oversized shadows, excessive rounded geometry, and animated backgrounds are combined to manufacture perceived sophistication.

## 3.13 Marketing inside the workflow

Operational pages use hero sections, oversized slogans, decorative illustrations, excessive whitespace, or campaign-style calls to action where users need efficient task completion.

## 3.14 Dashboard by default

Information is split into cards and charts because a dashboard aesthetic is desired rather than because the underlying task benefits from summarisation.

## 3.15 Screenshot-driven product design

Feature UI is designed to produce impressive static screenshots while routine use, keyboard interaction, error states, loading states, density, or responsive behaviour remain weak.

## 3.16 Mode inversion

Dark mode is generated by mechanically reversing light colours without considering luminance, elevation, image treatment, or semantic emphasis.

## 3.17 Local component forks

Individual modules copy and modify canonical shadcn/ui components to achieve slightly different aesthetics instead of using the shared component system.

## 3.18 Raw-state styling

API values or database enum values are directly mapped to arbitrary colours inside feature code.

Domain semantics MUST be resolved before visual semantics.

## 3.19 Decorative accessibility regression

Focus rings, labels, borders, error text, contrast, or target sizes are weakened because they interfere with a desired minimalist aesthetic.

## 3.20 Artificial urgency

Colour, animation, countdowns, visual hierarchy, or button styling are used to pressure users into consent, payment, permission, or other consequential choices.

---

# 4. Checklist

A surface conforms to this standard only when the following can be answered **yes** where applicable.

### Identity and hierarchy

- [ ] The screen has a clear primary purpose.
- [ ] Visual hierarchy remains understandable without decorative effects.
- [ ] The surface is recognisably part of the product rather than an unchanged framework default.
- [ ] Brand expression is controlled rather than ubiquitous.
- [ ] Marketing, app, and email treatments retain common identity signals.

### Typography

- [ ] Typography uses canonical semantic roles.
- [ ] Heading hierarchy reflects content hierarchy.
- [ ] Weight is used deliberately.
- [ ] Body text remains comfortably readable.
- [ ] Technical or numeric typography is appropriate to the data.

### Colour

- [ ] Components use semantic tokens instead of raw palette values.
- [ ] Brand colour has a controlled purpose.
- [ ] Status colours have stable meanings.
- [ ] Meaning never depends on colour alone.
- [ ] Light and dark modes preserve the same semantics.

### Spacing and geometry

- [ ] Spacing resolves to canonical tokens.
- [ ] Related content is visually grouped correctly.
- [ ] Radius usage is coherent.
- [ ] Cards and containers exist for semantic reasons.
- [ ] Density suits the task.

### Materials and elevation

- [ ] Opaque surfaces are the default for operational content.
- [ ] Translucency has a specific reason.
- [ ] Glass does not reduce comprehension or contrast.
- [ ] Elevation corresponds to actual layering.
- [ ] Shadows are restrained and tokenised.

### Imagery and illustration

- [ ] Imagery has a communicative purpose.
- [ ] Image treatment is consistent with the brand system.
- [ ] Screenshots contain no sensitive information.
- [ ] Illustration uses the approved visual language.
- [ ] Decorative imagery does not compete with operational content.

### Motion

- [ ] Motion communicates state, relationship, or causality.
- [ ] Routine interactions remain fast.
- [ ] Decorative movement is limited.
- [ ] Reduced-motion preferences are supported.
- [ ] Removing animation does not remove meaning.

### Components and patterns

- [ ] The implementation begins with canonical shadcn/ui-based components.
- [ ] Component variants are approved and reusable.
- [ ] Feature code does not create a parallel aesthetic system.
- [ ] The correct interaction Pattern was selected before styling.
- [ ] Components retain accessible primitive behaviour.

### Forms and application state

- [ ] Labels, help, validation, and errors use canonical form treatment.
- [ ] Loading, empty, error, and success are visually distinct.
- [ ] Visual states correspond to real application/API states.
- [ ] Success is not shown prematurely.
- [ ] Domain states are mapped consistently to visual semantics.

### Accessibility and security

- [ ] Contrast meets the Accessibility standard.
- [ ] Focus remains clearly visible.
- [ ] Critical status is not colour-only.
- [ ] Security-relevant actions and consequences are visually unambiguous.
- [ ] No visual dark pattern is present.
- [ ] Sensitive content follows Security requirements.

### Cross-channel behaviour

- [ ] Marketing may be more expressive without redefining the core identity.
- [ ] Application UI remains efficient for repeated use.
- [ ] Email retains meaning without advanced CSS, animation, or images.
- [ ] Light, dark, mobile, desktop, and reduced-motion states have been reviewed.
- [ ] Optional visual effects can fail gracefully.

---

# 5. Canonical summary

The product MUST present a **precise, calm, contemporary, purposeful, and recognisable** visual identity.

Aesthetic decisions MUST begin with semantic intent and MUST be encoded through the canonical Design Token, Component, Pattern, and Layout systems.

**Typography MUST create hierarchy before decoration.**

**Colour MUST communicate semantics before emotion.**

**Whitespace MUST communicate structure rather than emptiness.**

**Opaque materials MUST be the operational default; glass and translucency MUST remain deliberate exceptions.**

**Elevation MUST represent layering rather than decoration.**

**Motion MUST explain change rather than attract attention.**

**Dark mode MUST be designed, not inverted.**

**Marketing MAY be expressive; application UI MUST remain task-oriented; email MUST preserve identity under constrained rendering.**

**shadcn/ui MUST provide the component baseline, but framework defaults MUST NOT become the product's visual identity.**

**Semantic Design Tokens MUST own reusable aesthetic values. Feature code MUST NOT create an independent visual language.**

**Accessibility, Security, domain correctness, API truth, State Management, and Forms & Validation requirements MUST take precedence over aesthetic preference.**

**Brand distinctiveness SHOULD emerge from a coherent combination of typography, colour, geometry, imagery, spacing, material, and motion—not from excessive effects or one-off decoration.**

The Gold Standard is achieved when the same product identity remains recognisable across **marketing, application, documentation, and email**, while each channel uses only the degree of visual expression appropriate to its purpose.

The 2026 shadcn-specific baseline above reflects the current project direction: Base UI is the default for new shadcn/ui projects, Radix remains supported, and semantic CSS-variable theming remains the recommended approach. citeturn360057search0turn360057search1turn360057search2 The reduced-motion requirements are also consistent with WCAG 2.2's treatment of interaction-triggered motion. citeturn360057search9
