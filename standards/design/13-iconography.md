---
id: "iconography"
title: "Iconography & Illustration"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "iconography", "illustration"]
applies_to: ["ui"]
related: ["tables", "aesthetic"]
legacy_number: 63
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 61744
provenance: baseline

---

# Iconography & Illustration — Gold Standard 2026

**Status:** Canonical  
**Standard level:** Gold Standard 2026  
**Canonical placement:** **Design System → Iconography → Components → Content & UX Writing**  
**Component baseline:** shadcn/ui  
**Default functional icon family:** Lucide  
**Applies to:** Product UI, administrative interfaces, public web, marketing, transactional/lifecycle email, documentation, reports, empty states, diagrams, onboarding, and approved generated media.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements unless an approved exception is documented.

---

# 1. Purpose

## 1.1 Objective

This standard defines how visual symbols and supporting imagery MUST be selected, created, licensed, implemented, optimised, and used across the product system.

It governs:

- functional icon-family selection;
- icon licensing and provenance;
- icon geometry;
- stroke and fill rules;
- icon sizing;
- optical alignment;
- metaphor consistency;
- icon and label pairing;
- interactive and semantic state variants;
- custom domain icons;
- brand icons;
- illustration style;
- illustration use cases;
- empty-state artwork;
- photography and imagery;
- image aspect ratios;
- responsive cropping;
- accessibility semantics;
- asset naming;
- asset storage;
- optimisation;
- delivery and caching;
- generated imagery;
- asset governance.

This standard MUST be applied together with:

- Aesthetic & Visual Language;
- Security;
- Data & Database;
- API;
- State Management;
- Forms & Validation;
- Accessibility;
- Design Tokens;
- Component;
- Pattern;
- Content & UX Writing standards.

Icons and illustrations MUST be treated as parts of the communication system, not as decorative additions applied after interface design.

---

## 1.2 Governing principles

The canonical visual-symbol system MUST optimise for:

1. **recognition;**
2. **consistency;**
3. **clarity;**
4. **accessibility;**
5. **semantic stability;**
6. **visual restraint;**
7. **technical efficiency.**

An icon MUST communicate the same concept wherever that concept occurs.

An illustration MUST reinforce comprehension, identity, or emotional context without competing with the task.

Visual novelty MUST NOT outweigh recognisability.

---

## 1.3 Visual-system categories

The Design System MUST distinguish at least four categories of visual assets.

### 1.3.1 Functional icons

Functional icons represent:

- actions;
- objects;
- navigation concepts;
- status;
- application features;
- interface affordances.

Functional icons MUST follow the canonical icon system.

### 1.3.2 Domain and brand icons

Domain icons represent product-specific concepts for which the canonical functional family has no adequate metaphor.

Brand icons represent:

- the organisation;
- products;
- third-party services;
- social platforms;
- partner brands.

Domain and brand icons MUST be governed separately from generic functional icons.

### 1.3.3 Illustration

Illustration communicates:

- concepts;
- narrative;
- onboarding;
- empty states;
- education;
- editorial content;
- brand expression.

Illustrations MUST NOT masquerade as controls.

### 1.3.4 Photography and imagery

Photography, screenshots, rendered scenes, maps, charts, diagrams, and other image-based content MUST follow the imagery rules in this standard and the Aesthetic & Visual Language standard.

These categories MUST NOT be mixed indiscriminately.

---

# 2. Rules

## 2.1 Canonical functional icon system

Lucide MUST be the default functional icon family for new shadcn/ui-based applications unless the Design System explicitly approves another family for the entire product or product family.

A feature team MUST NOT independently select another icon library.

An approved alternate family MUST be adopted at the Design System level and MUST define equivalent rules for:

- geometry;
- stroke;
- sizing;
- naming;
- accessibility;
- implementation;
- licensing.

A product MUST NOT routinely mix Lucide, Material Symbols, Font Awesome, Heroicons, Phosphor, Tabler, proprietary icons, or unrelated SVG collections inside the same functional UI.

A temporary icon from another family MUST NOT enter production merely because an equivalent icon is unavailable in the canonical set.

Where the canonical library lacks an appropriate metaphor, the team MUST first consider:

1. another existing canonical icon;
2. a text label without an icon;
3. a custom domain icon matching the canonical system.

Adding another icon library MUST be the last option.

---

## 2.2 shadcn/ui relationship

shadcn/ui MUST provide the Component baseline for controls containing icons.

Icons SHOULD normally be consumed through canonical components such as:

- Button;
- Input Group;
- Menu;
- Dropdown Menu;
- Select;
- Command;
- Tabs;
- Navigation;
- Alert;
- Toast;
- Badge;
- Table/Data Grid controls;
- Dialog;
- Sheet.

Feature implementations SHOULD NOT independently define repeated icon sizing, spacing, or state behaviour.

Component variants MUST own the standard relationship between:

- icon size;
- text size;
- control size;
- icon-to-label spacing;
- icon-only target size.

The icon library is an implementation dependency below the Component API.

Consumers SHOULD NOT depend on library-specific geometry when the canonical Component already exposes the intended semantic icon slot.

---

## 2.3 Licensing and provenance

Every icon, illustration, photograph, texture, animation, font-based symbol, or other external visual asset MUST have known provenance.

Before adoption, the responsible team MUST establish:

- creator or source;
- licence;
- permitted use;
- modification rights;
- redistribution requirements;
- attribution requirements;
- trademark restrictions where applicable.

Unknown-origin assets MUST NOT enter the production asset library.

"Found online," "from Figma," "from Google Images," "from an AI moodboard," or "already in the repository" MUST NOT be treated as proof of usage rights.

### 2.3.1 Licence registry

The Design System SHOULD maintain an asset/licence registry for non-original visual resources.

The registry SHOULD record:

- asset family;
- source;
- version where relevant;
- licence identifier;
- licence file or canonical licence reference;
- attribution requirement;
- restrictions;
- date reviewed.

Third-party licence notices MUST be preserved where required.

Build optimisation MUST NOT remove licence or attribution obligations.

### 2.3.2 Brand and trademark assets

Third-party logos MUST be treated as trademarked brand assets rather than ordinary icons.

They MUST use official or approved artwork where available.

Third-party logos MUST NOT be:

- redrawn to match the product icon style;
- recoloured when brand rules prohibit it;
- stretched;
- distorted;
- combined into unapproved derivative marks.

A third-party logo MUST NOT imply sponsorship, endorsement, integration, or partnership that does not exist.

### 2.3.3 Generated assets

AI-generated or externally generated illustration and imagery MUST have an approved commercial-use and provenance process.

Generated assets MUST be reviewed for:

- trademark imitation;
- copyrighted-character imitation;
- accidental logos;
- sensitive information;
- visual defects;
- misleading representations;
- inconsistent brand language.

Generation MUST NOT bypass normal asset review.

---

## 2.4 Canonical icon geometry

Functional icons MUST share a coherent geometry.

The canonical functional geometry SHOULD use a **24 × 24 design coordinate system**.

Custom functional icons created to extend the canonical family MUST use the same coordinate system unless a documented technical exception exists.

The canonical stroke SHOULD use a **2-unit nominal stroke** at the source geometry.

Stroke caps and joins SHOULD visually match the canonical family.

Custom icons MUST preserve equivalent:

- stroke character;
- corner treatment;
- visual density;
- negative space;
- endpoint treatment;
- curve character.

An icon that technically fits a 24 × 24 box but visually belongs to a different icon family is non-conformant.

---

## 2.5 Safe drawing area

Icons SHOULD maintain consistent visual margins within the canonical canvas.

Artwork MUST NOT touch the canvas boundary without an intentional optical reason.

Nominal geometry and optical footprint MUST be considered separately.

Circular, diagonal, narrow, and asymmetrical symbols MAY require small optical deviations from strict mathematical centring.

Custom icons SHOULD be reviewed beside several canonical icons rather than in isolation.

---

## 2.6 Stroke rules

Functional outline icons MUST use the canonical stroke model.

Feature code MUST NOT arbitrarily modify individual icon stroke widths to make them appear:

- stronger;
- more premium;
- more important;
- more visible.

If a control requires stronger emphasis, the Component SHOULD change semantic treatment rather than locally thickening the icon.

The same symbol MUST NOT routinely exist with inconsistent stroke weights across different modules.

### 2.6.1 Scaling

SVG icons SHOULD scale geometrically while maintaining the intended apparent stroke.

Where the icon library supports absolute/non-scaling stroke behaviour, its use MUST be defined centrally.

Teams MUST NOT mix scaling and non-scaling stroke models arbitrarily.

Very small icons MAY require an approved small-size variant when simple scaling materially harms legibility.

---

## 2.7 Fill rules

The default functional icon system SHOULD use outline icons where that is the character of the canonical family.

Filled variants MAY be used when they communicate a defined state, such as:

- selected;
- active;
- favourited;
- bookmarked;
- rated.

Filled versus outline state MUST be applied consistently to the same concept.

A filled variant MUST NOT become an arbitrary emphasis technique.

The same icon MUST NOT alternate unpredictably between filled and outline appearances for decorative reasons.

Status icons MAY use fills where the Component standard defines them.

---

## 2.8 Icon sizing

Functional icon sizes MUST resolve to Design Tokens or Component variants.

The canonical size vocabulary SHOULD include a restrained scale equivalent to:

- **12 px** — micro/supporting indicators;
- **16 px** — compact controls and metadata;
- **20 px** — standard controls;
- **24 px** — prominent controls/navigation;
- **32 px or greater** — specialised display use, not routine controls.

Exact token names belong to Design Tokens.

Feature code MUST NOT introduce arbitrary sizes such as 17 px, 19 px, 21 px, or 27 px merely to optically repair individual components.

### 2.8.1 Default control sizing

The icon size MUST be determined by the containing Component.

A consumer SHOULD NOT manually set the icon dimensions for every button instance.

For example, a compact button and a default button MAY use different icon sizes through their Component definitions.

---

## 2.9 Visual size versus interaction target

Icon size and interaction-target size are separate concepts.

An icon MAY be visually 16–24 px while existing inside a substantially larger interactive target.

Icon-only controls MUST NOT shrink their clickable/tappable area to the visual bounds of the icon.

Target sizes MUST comply with the Accessibility and Component standards.

Increasing the SVG dimensions MUST NOT be used as the only mechanism for meeting target-size requirements.

---

## 2.10 Optical alignment

Icons MUST be optically aligned with adjacent content.

Mathematical centre alignment MAY be adjusted where:

- visual weight is asymmetric;
- a directional symbol appears off-centre;
- the icon contains strong horizontal or vertical bias.

Optical corrections MUST be implemented at the Component or canonical icon level where repeatable.

Feature teams MUST NOT scatter one-off transforms such as arbitrary `translate-y` fixes across application code.

Baseline alignment SHOULD be reviewed with actual text at production font metrics.

---

## 2.11 Icon and text alignment

Icons paired with text SHOULD align to the visual centre of the relevant line or control.

Multi-line labels require special treatment.

An icon beside multi-line text SHOULD normally align to the first meaningful line or the overall composition according to the Component Pattern.

Icons MUST NOT float vertically between unrelated lines simply because the container uses generic centring.

---

## 2.12 Directional icons

Directional metaphors MUST respect interface direction and writing direction.

Icons representing logical movement such as:

- back;
- forward;
- next;
- previous;
- indent;
- outdent;

SHOULD mirror in RTL interfaces where semantic direction reverses.

Icons representing physical or invariant objects MUST NOT mirror automatically.

Examples that ordinarily SHOULD NOT mirror merely because layout direction changes include:

- clocks;
- cameras;
- media logos;
- brand marks;
- physical-world symbols whose identity would change.

Mirroring rules SHOULD be defined centrally.

---

## 2.13 Metaphor consistency

One concept MUST use one primary metaphor throughout the product.

Examples include:

- delete;
- edit;
- download;
- upload;
- settings;
- search;
- filter;
- calendar;
- notification;
- location.

A product MUST NOT use different metaphors for the same action in different modules without a semantic reason.

Likewise, the same icon MUST NOT represent unrelated actions.

A gear, for example, SHOULD represent settings/configuration consistently rather than settings in one module and process execution in another.

---

## 2.14 Metaphor selection

Icons SHOULD use widely recognisable metaphors where possible.

Novel metaphors SHOULD NOT replace conventional ones merely to make the interface appear distinctive.

If a concept cannot be communicated reliably through a familiar symbol, visible text SHOULD be used.

Ambiguous icons SHOULD be paired with labels.

A custom icon MUST NOT be invented when a clear text label communicates the concept more efficiently.

---

## 2.15 Cultural interpretation

Icons MUST be reviewed for relevant cultural and regional interpretation.

Symbols with potentially conflicting meanings across intended markets SHOULD be avoided or paired with text.

Gestural icons, hand symbols, currency imagery, flags, religious imagery, and culturally specific metaphors require additional review.

Flags SHOULD NOT normally be used as language selectors because language and country are not equivalent concepts.

---

## 2.16 Icons and visible labels

Visible text SHOULD be the default for important or unfamiliar actions.

Icons SHOULD support labels rather than replace them when:

- consequences are significant;
- the action is unfamiliar;
- multiple similar actions exist;
- interpretation depends on specialised domain knowledge;
- the user is expected to learn a new workflow.

Examples that normally SHOULD use visible labels include:

- Submit;
- Approve;
- Reject;
- Pay;
- Publish;
- Export all;
- Transfer ownership;
- Delete account.

Icon-only presentation MAY be used for highly conventional, compact actions such as:

- Close;
- Search;
- More actions;
- Previous/next;
- Common formatting tools;

provided context and accessibility requirements are satisfied.

---

## 2.17 Icon+label pairing

When an icon and visible label describe one control, they MUST communicate the same action.

The icon MUST NOT introduce a second semantic meaning.

The visible label remains the primary semantic contract.

Icons paired with visible text SHOULD normally be hidden from the accessibility tree if they provide no additional information.

Accessible names MUST preserve the visible label wording according to Accessibility requirements.

A visible button labelled **Download** MUST NOT have an accessible name that replaces that wording with an unrelated phrase.

---

## 2.18 Icon-only controls

Every interactive icon-only control MUST have an accessible name.

The accessible name SHOULD describe the action, not the icon's appearance.

Examples:

- **Close**, not "X icon";
- **Delete record**, not "Trash icon";
- **Open filters**, not "Sliders icon";
- **Copy link**, not "Copy icon button".

Accessible names SHOULD begin with the action where practical.

An icon-only control MUST NOT rely on `title` alone as its accessibility contract.

A tooltip MAY reinforce meaning visually but MUST NOT replace the accessible name.

Icon-only controls SHOULD provide a tooltip when the action is not immediately obvious to sighted users.

---

## 2.19 Decorative icons

Purely decorative icons MUST NOT generate unnecessary assistive-technology output.

Decorative SVGs inside labelled controls SHOULD be hidden from the accessibility tree.

An icon MUST NOT receive alternative text that duplicates adjacent visible text.

For example, a warning icon immediately followed by **Warning** SHOULD NOT cause assistive technology to announce "Warning icon Warning" unless the icon communicates additional distinct information.

---

## 2.20 Informational icons

An icon that independently communicates information MUST expose equivalent non-visual information.

Examples include:

- status-only icons;
- severity indicators;
- availability indicators;
- privacy/security state;
- file type where no text exists.

Status MUST NOT rely on icon shape alone.

Where practical, visible text SHOULD accompany material status information.

---

## 2.21 Icon colour

Functional icons SHOULD inherit semantic foreground colour from their containing Component.

Feature code SHOULD NOT assign raw colours directly to generic functional icons.

Semantic state icons MAY use:

- success;
- warning;
- destructive;
- informational;

tokens where appropriate.

Colour MUST NOT be the sole distinction between materially different icon states.

Brand colour SHOULD NOT be applied indiscriminately to every icon.

---

## 2.22 Icon state variants

Interactive icon treatment MUST follow the state of its containing control.

Canonical states include:

- default;
- hover;
- focus;
- pressed/active;
- selected;
- disabled;
- destructive;
- loading where applicable.

The icon SHOULD normally inherit the state rather than implementing an independent hover or disabled system.

A disabled control's icon MUST NOT remain visually active in a way that contradicts the control.

---

## 2.23 Selected and active icons

Selected state MAY be expressed through:

- foreground colour;
- background/container state;
- filled icon variant;
- supporting indicator.

Selection MUST NOT rely only on replacing one arbitrary icon with another.

An active navigation icon SHOULD remain recognisably the same concept as its inactive counterpart.

State changes MUST NOT cause substantial layout shift.

---

## 2.24 Destructive icons

Destructive iconography MUST use established metaphors.

Delete and remove semantics MUST be distinguished where the domain distinguishes them.

For example:

- removing a member from a group;
- deleting a user account;
- unlinking an integration;
- permanently erasing a record;

MUST NOT be visually conflated if consequences differ materially.

The icon MUST NOT soften or obscure a destructive consequence.

Security and destructive-action Patterns remain authoritative.

---

## 2.25 Success, warning, error, and information

Status icon metaphors MUST remain stable across the application.

The Design System SHOULD define canonical symbols for:

- success;
- warning;
- destructive/error;
- information;
- pending;
- unavailable where required.

Feature teams MUST NOT invent their own status icon set.

Status icons MUST accompany semantic text where the state is important to comprehension.

A warning triangle MUST NOT mean warning in one context and generic attention in another unless the distinction is explicitly communicated.

---

## 2.26 Loading and progress symbols

Loading indicators MUST represent actual pending work.

A decorative rotating icon MUST NOT appear when no asynchronous operation exists.

Indeterminate spinners SHOULD be used when progress cannot be meaningfully measured.

Determinate progress SHOULD use a progress component when reliable completion information is available.

A spinner MUST NOT replace clear loading text where the operation's meaning would otherwise be ambiguous.

Reduced-motion requirements MUST apply.

---

## 2.27 Custom domain icons

A custom icon MAY be created only when:

- the concept recurs;
- no canonical icon communicates it adequately;
- text alone is insufficient or inefficient;
- the domain concept has stable meaning.

Custom domain icons MUST undergo Design System review.

They MUST match canonical:

- grid;
- stroke;
- corner character;
- complexity;
- optical weight;
- negative space;
- cap/join style.

Custom domain icons SHOULD be stored in the same canonical component/asset package as the primary icon system.

---

## 2.28 Custom icon naming

Icon names MUST describe semantic meaning rather than current visual appearance where possible.

Prefer names equivalent to:

- `ParcelBoundary`;
- `SurveyPlan`;
- `ValuationCase`;

rather than:

- `SquareWithLine`;
- `BlueMapThing`;
- `CustomIcon2`.

Names MUST NOT encode presentation state that belongs to the Component unless the asset is genuinely a distinct variant.

---

## 2.29 Emoji

Emoji MUST NOT substitute for canonical functional icons in routine product UI.

Emoji MAY be used in:

- user-authored content;
- deliberately informal communication;
- explicitly approved brand moments.

Emoji rendering varies by platform and MUST NOT be relied upon for precise semantic or visual consistency.

Emoji MUST NOT serve as the only status indicator for operational or security-relevant state.

---

## 2.30 Illustration role

Illustration MUST have a defined communication purpose.

Approved purposes MAY include:

- onboarding;
- education;
- conceptual explanation;
- marketing storytelling;
- empty states;
- selected success milestones;
- editorial content;
- branded product introductions.

Illustration SHOULD NOT appear merely because unused whitespace exists.

Operational interfaces SHOULD remain primarily content- and task-driven.

---

## 2.31 Canonical illustration character

The canonical illustration language SHOULD feel:

**geometric, controlled, contemporary, clear, and restrained.**

Illustrations SHOULD derive visual identity from the same system as the application through:

- canonical colour relationships;
- coherent geometry;
- controlled line weight;
- recognisable radius language;
- deliberate negative space;
- restrained detail.

Illustration SHOULD complement the product rather than establish an unrelated art direction.

---

## 2.32 Illustration complexity

Illustration detail MUST correspond to viewing size and purpose.

Small empty-state illustrations MUST use simple silhouettes and strong shapes.

Dense narrative illustration MAY contain additional detail at larger editorial sizes.

Fine detail MUST NOT be relied upon where the illustration will commonly render below a size at which that detail remains visible.

Illustration MUST NOT contain illegible pseudo-interface text.

---

## 2.33 Illustration family consistency

One product family SHOULD use one coherent illustration system.

The following MUST NOT be mixed casually:

- flat vectors;
- clay/soft 3D;
- photorealistic renders;
- hand-drawn sketches;
- isometric scenes;
- cartoons;
- painterly generative imagery.

A campaign MAY introduce a distinct art direction if it is explicitly approved.

Campaign art MUST NOT silently redefine the core product illustration system.

---

## 2.34 Illustration colour

Illustration SHOULD use a controlled extension of the canonical palette.

Brand colour MAY be more expressive in illustration than in operational controls.

Semantic colours MUST NOT be reused decoratively in ways that conflict with their application meaning.

For example, destructive red SHOULD NOT dominate a celebratory illustration if users are trained to read that red as error/destructive state.

Illustrations SHOULD be reviewed in both light and dark contexts where both themes are supported.

---

## 2.35 Illustration and dark mode

Illustrations MUST NOT be mechanically inverted for dark mode.

The system MAY provide:

- one theme-neutral asset;
- light and dark variants;
- token-driven SVG artwork.

Theme-specific variants MUST preserve the same concept and overall identity.

Dark-mode illustrations SHOULD adjust:

- background relationships;
- luminance;
- saturation;
- contrast;
- shadows;
- fine lines;

where necessary.

---

## 2.36 Empty-state art

Empty-state illustration is optional.

The empty-state message and appropriate next action are mandatory where the user requires explanation or recovery.

The hierarchy SHOULD normally be:

1. state explanation;
2. supporting context;
3. next action;
4. optional illustration.

Illustration MUST NOT become the largest semantic element when the user primarily needs to know what to do.

### 2.36.1 First-use empty states

A first-use state MAY be more welcoming and explanatory.

It SHOULD explain:

- what belongs here;
- why the feature is useful;
- how to create or obtain the first item.

### 2.36.2 No-results states

A filtered or search no-results state SHOULD be primarily utilitarian.

Large celebratory or narrative illustration SHOULD NOT be used.

The interface SHOULD prioritise:

- query context;
- filter removal;
- search adjustment;
- reset actions.

### 2.36.3 Error states

Errors MUST NOT be disguised as friendly empty states.

Illustration MAY support an error state but MUST NOT reduce the clarity or seriousness of the failure.

---

## 2.37 Success illustration

Large success illustrations SHOULD be reserved for meaningful milestones.

Routine operations such as:

- saving a field;
- updating a record;
- deleting an item;
- copying text;

SHOULD use restrained Component feedback rather than celebratory artwork.

High-expression success moments MAY be used for:

- completed onboarding;
- completed setup;
- major workflow completion;
- meaningful user achievement.

---

## 2.38 Security and privacy imagery

Security-related illustration MUST NOT imply guarantees the system does not provide.

A lock, shield, fingerprint, vault, or encryption metaphor MUST NOT be used to claim security properties that are absent or only partially applicable.

Authentication and privacy imagery MUST NOT imply:

- anonymity;
- encryption;
- certification;
- government endorsement;
- biometric security;

unless the underlying product actually provides the represented property.

Security meaning MUST remain grounded in Security-standard terminology.

---

## 2.39 Photography

Photography SHOULD feel specific, credible, and relevant.

Generic stock imagery SHOULD be avoided where it makes the product or organisation appear interchangeable.

Photography SHOULD favour:

- natural composition;
- realistic environments;
- restrained grading;
- sufficient subject clarity;
- useful negative space.

Over-processed HDR, artificial lens effects, extreme colour grading, and generic corporate stock conventions SHOULD NOT define the primary visual identity.

---

## 2.40 People in imagery

Imagery containing people MUST be appropriate to the intended audience and context.

Representations SHOULD avoid tokenistic or stereotypical treatment.

Photos MUST NOT imply that a depicted individual is an actual customer, employee, claimant, patient, beneficiary, or user unless that representation is truthful and authorised.

Required model releases or permissions MUST be obtained according to applicable policy.

Sensitive contexts require additional review.

---

## 2.41 Product screenshots

Product screenshots are treated as imagery and MUST use plausible product states.

Screenshots MUST NOT expose:

- passwords;
- access tokens;
- API keys;
- session identifiers;
- private personal data;
- confidential records;
- protected infrastructure details;
- production-only identifiers whose exposure is prohibited.

Demonstration content SHOULD use approved synthetic or anonymised data.

Cropping MUST NOT intentionally conceal material UI behaviour in a misleading way.

Marketing screenshots MAY simplify surrounding context but MUST NOT depict nonexistent functionality as current functionality.

---

## 2.42 Generated product imagery

Generated mock product screens MUST NOT be presented as actual screenshots when they depict interfaces that do not exist.

Concept imagery MUST be identifiable internally as conceptual.

Generated imagery MUST NOT introduce fake customer information or imply documented product capability that is absent.

Security review requirements apply equally to generated screenshots and manually captured screenshots.

---

## 2.43 Image aspect ratios

Recurring image contexts MUST use canonical aspect-ratio tokens or Component variants.

The Design System SHOULD provide a restrained set such as:

- **1:1** — avatar, square thumbnail, compact media;
- **4:3** — product screenshot, documentation, general content;
- **3:2** — editorial photography;
- **16:9** — landscape hero/media;
- **21:9** or another approved wide ratio — exceptional cinematic/hero use.

Feature teams MUST NOT invent a new recurring aspect ratio without a layout or content reason.

The same content class SHOULD maintain a predictable ratio across surfaces.

---

## 2.44 Aspect ratio selection

Aspect ratio MUST follow content purpose.

Portrait subject photography SHOULD NOT be forced into wide cinematic crops when doing so consistently removes the subject.

Product screenshots SHOULD retain enough surrounding UI to preserve comprehension.

Logos MUST NOT be forced into arbitrary image crops.

Illustrations SHOULD be designed for their intended ratio rather than merely clipped after production.

---

## 2.45 Responsive cropping

Responsive image components MUST define cropping behaviour.

`object-fit: cover` or equivalent MUST NOT be used without considering what content may be cropped.

Important focal content SHOULD have a documented focal point where responsive cropping is significant.

Responsive variants MAY use different crops of the same source.

A critical instructional image SHOULD normally use contain/uncropped presentation rather than hiding portions at smaller breakpoints.

---

## 2.46 Text inside images

Essential text SHOULD NOT be embedded into raster or vector artwork when semantic HTML text can provide the same information.

Text embedded in images:

- cannot reflow normally;
- is harder to localise;
- may scale poorly;
- can weaken accessibility.

Brand marks, diagrams, screenshots, or inherently graphical typography MAY contain text where appropriate.

Illustration copy SHOULD normally be rendered separately by the interface.

---

## 2.47 Localisation

Illustrations SHOULD avoid language-dependent embedded text.

Directional imagery MUST be reviewed for RTL locales.

Cultural metaphors MUST be reviewed where localisation changes interpretation.

If a localised image variant is unavoidable, variants MUST be versioned and managed by the asset pipeline rather than manually swapped inside feature code.

---

## 2.48 Image accessibility

Informative images MUST have appropriate text alternatives.

Decorative images MUST be ignored by assistive technologies where appropriate.

Alternative text MUST describe the information or purpose relevant to the surrounding context.

Alt text MUST NOT mechanically describe every visible pixel.

Alt text MUST NOT begin with redundant phrases such as "Image of" unless context requires them.

Images whose surrounding text already communicates identical information SHOULD avoid duplicate announcements.

Complex diagrams MAY require a longer textual explanation in addition to concise alternative text.

---

## 2.49 Illustration accessibility

Purely decorative illustration SHOULD be excluded from the accessibility tree.

An illustration that communicates unique information MUST have equivalent accessible content.

Empty-state art SHOULD usually be decorative when the accompanying heading and text completely describe the state.

Illustration MUST NOT carry hidden instructions that are absent from nearby text.

---

## 2.50 Motion illustration

Animated illustration MUST follow the Motion and Accessibility standards.

Animation SHOULD NOT be required to understand essential information.

Looping decorative animations SHOULD be limited.

Large perpetual animations SHOULD NOT appear in operational interfaces.

Reduced-motion preferences MUST be respected.

A static equivalent SHOULD be available where animation communicates useful visual context.

---

## 2.51 Asset source formats

Canonical source assets MUST be retained in an editable or reproducible format appropriate to the asset.

Typical canonical sources include:

- SVG source for functional icons and vector illustration;
- design source for complex illustration where required;
- high-quality original raster photography;
- reproducible generation source/metadata for approved generated assets where policy requires it.

A heavily compressed delivery asset MUST NOT be the only retained master if future recomposition is reasonably expected.

---

## 2.52 SVG requirements

Functional icons SHOULD use SVG.

SVG assets MUST:

- use a correct `viewBox`;
- avoid unnecessary editor metadata;
- avoid embedded raster content unless intentional;
- avoid unnecessary groups/transforms;
- avoid scripts;
- avoid event handlers;
- avoid external runtime dependencies unless explicitly approved.

Externally supplied SVG MUST be treated as active content and sanitised according to Security requirements before unrestricted rendering.

Untrusted SVG MUST NOT be injected directly into the DOM merely because its file type is an image format.

---

## 2.53 SVG colour handling

Functional SVG icons SHOULD use `currentColor` or the canonical semantic mechanism where component-driven colour is required.

Hard-coded brand or semantic colours SHOULD NOT exist inside generic functional icon source.

Multicolour brand assets and illustrations MAY preserve fixed palette values when that colour is intrinsic to the artwork.

Theme-aware SVG illustration MAY use approved tokens or dedicated theme variants.

---

## 2.54 Raster formats

Raster assets SHOULD be delivered in modern efficient formats appropriate to browser/client support.

The asset pipeline SHOULD prefer efficient compressed delivery formats while retaining suitable fallbacks where required.

Lossy compression SHOULD be used for photographic content when acceptable.

Lossless formats SHOULD be reserved for content that materially benefits from lossless reproduction or alpha precision.

A large PNG photograph MUST NOT be shipped merely because PNG was the designer's export default.

---

## 2.55 Resolution and responsive sources

Raster images MUST have sufficient resolution for their maximum intended display size.

The product SHOULD avoid downloading desktop-resolution imagery to small mobile surfaces when responsive image delivery is available.

Responsive image components SHOULD provide appropriately sized source candidates.

Extremely high-resolution originals MUST NOT be delivered directly to every client.

Upscaling a low-resolution asset beyond acceptable quality SHOULD be avoided.

---

## 2.56 Compression and optimisation

Production image assets MUST pass through the approved optimisation pipeline.

Optimisation SHOULD include, as applicable:

- metadata stripping;
- SVG optimisation;
- raster compression;
- responsive derivative generation;
- modern format conversion;
- dimension validation.

Optimisation MUST preserve required:

- transparency;
- colour fidelity;
- legibility;
- licence metadata where legally required.

Manual one-off compression SHOULD NOT replace the canonical build or media pipeline.

---

## 2.57 Asset weight budgets

Large imagery SHOULD have explicit delivery budgets appropriate to context.

A decorative hero image MUST NOT materially delay access to primary page content without justification.

Thumbnail assets SHOULD NOT use full-resolution originals.

Illustrations SHOULD be simplified if their SVG complexity creates disproportionate parse/render cost.

Animated assets SHOULD receive stricter review because of:

- transfer size;
- decoding cost;
- CPU/GPU use;
- battery use;
- motion accessibility.

---

## 2.58 Lazy loading

Below-the-fold non-critical imagery SHOULD use appropriate lazy loading.

Critical above-the-fold visual content SHOULD NOT be delayed indiscriminately.

The product MUST avoid layout shift by reserving image dimensions or aspect ratio before loading.

Lazy loading MUST NOT prevent assistive technologies or keyboard users from reaching essential image-associated content.

---

## 2.59 Caching and immutability

Published immutable assets SHOULD use content-hashed or versioned filenames where infrastructure supports them.

Long-lived caching SHOULD be used for immutable assets.

Replacing file contents behind the same permanently cached identifier SHOULD be avoided.

Asset invalidation behaviour MUST be predictable.

---

## 2.60 Asset naming

Asset filenames MUST be descriptive and stable.

Names SHOULD represent semantic purpose rather than arbitrary design-export sequences.

Prefer:

- `empty-state-search.svg`;
- `onboarding-workspace.svg`;
- `hero-spatial-analysis.webp`;

over:

- `illustration-final-final2.svg`;
- `Group-4823.png`;
- `IMG_0034-copy.jpg`.

Filenames SHOULD use a canonical case convention.

Spaces and unstable design-tool-generated filenames SHOULD be removed before production adoption.

---

## 2.61 Asset location

Shared icons and illustrations MUST live in an approved shared asset or Design System package.

Feature-specific imagery MAY live near the feature where ownership is genuinely local.

The same asset MUST NOT be copied repeatedly across modules.

A shared asset SHOULD have one canonical source.

Consumer-specific transformations SHOULD be generated rather than maintained as unrelated manual copies where practical.

---

## 2.62 Icon imports and bundle behaviour

Web applications SHOULD import icons in a tree-shakeable manner.

Applications SHOULD NOT bundle an entire icon collection when only a subset is used.

Dynamic icon-by-string systems SHOULD be used cautiously because they can:

- inhibit tree shaking;
- make semantic usage harder to audit;
- silently permit arbitrary icons.

Where icon names are data-driven, the application SHOULD use an explicit allowlisted semantic mapping.

API data MUST NOT directly select arbitrary component imports.

---

## 2.63 Asset manifests

Large systems SHOULD maintain an asset manifest or equivalent searchable catalogue.

The catalogue MAY record:

- canonical name;
- category;
- source;
- licence;
- owner;
- dimensions;
- aspect ratio;
- theme variants;
- alt-text guidance;
- deprecation state.

Asset governance SHOULD make reuse easier than creating local copies.

---

## 2.64 Asset deprecation

Icons and illustrations MAY be deprecated when:

- the metaphor changes;
- the visual system changes;
- licensing changes;
- the asset is duplicated;
- the represented feature is removed.

Deprecation SHOULD define a replacement where appropriate.

Deprecated assets SHOULD NOT remain indefinitely available for new development.

Migration MUST preserve semantics.

---

## 2.65 Content & UX Writing relationship

Icon metaphors and interface terminology MUST agree.

A control labelled **Archive** MUST NOT use a delete metaphor unless the domain treats archive as deletion.

A **Download** icon MUST NOT accompany copy describing export to another service when download is not actually occurring.

The Content & UX Writing standard owns terminology.

Iconography MUST reinforce that terminology rather than inventing a parallel vocabulary.

Visible labels SHOULD use user-domain language instead of library icon names.

---

## 2.66 Forms & Validation relationship

Forms MAY use icons to support:

- field type;
- validation;
- reveal/hide controls;
- date/time selection;
- search;
- contextual actions.

Icons MUST NOT replace field labels.

Error and success icons MUST follow canonical validation semantics.

A field with an error MUST NOT communicate error only through an icon.

Password visibility controls MUST have explicit accessible names representing the action/state.

Inline form icons MUST NOT reduce input affordance or obscure entered content.

---

## 2.67 Tables & Data Grid relationship

Table icons MUST follow the Tables & Data Grid standard.

Common table actions such as:

- sort;
- filter;
- pin;
- hide column;
- more actions;
- expand row;

MUST use canonical metaphors.

Sort direction MUST NOT rely solely on an icon.

Dense data tables SHOULD avoid decorative icons that reduce scanning efficiency.

Row action icons MUST have accessible names where visible labels are absent.

---

## 2.68 Security relationship

Icons, SVGs, illustrations, uploaded imagery, and generated assets MUST follow Security requirements.

Untrusted visual assets MUST NOT receive privileged executable treatment.

User-provided SVG SHOULD be sanitised, transformed to a safer format, isolated, or rejected according to the upload-security model.

Asset URLs MUST NOT contain secrets.

Images MUST NOT expose sensitive data through:

- embedded metadata;
- visible screenshots;
- thumbnails;
- filenames;
- accessible descriptions.

EXIF or other metadata SHOULD be removed where it creates privacy or security risk.

---

## 2.69 Data & Database relationship

Asset metadata SHOULD be stored according to the canonical data model when assets are managed dynamically.

Stored metadata MAY include:

- immutable asset ID;
- media type;
- byte size;
- dimensions;
- checksum;
- owner;
- storage key;
- classification;
- processing state.

Database rows MUST NOT rely on arbitrary filesystem paths as permanent identity where the storage architecture does not guarantee those paths.

Derived image variants SHOULD remain traceable to their canonical source asset.

---

## 2.70 API relationship

Media APIs MUST expose stable contracts.

Upload APIs SHOULD validate:

- allowed media types;
- size;
- dimensions where applicable;
- file signature/content;
- ownership/authorization.

File extensions alone MUST NOT determine trusted media type.

Image-processing APIs MUST NOT accept arbitrary unsafe transformation parameters without resource limits.

Asset delivery URLs SHOULD follow the Security and caching model defined by the platform.

Signed/private asset URLs MUST NOT become permanently public through client-side caching or logs.

---

## 2.71 State Management relationship

Visual icon state MUST derive from canonical application state.

A favourite icon, for example, MUST represent the authoritative favourite state rather than maintaining an unrelated local Boolean indefinitely.

Optimistic visual states MAY be used according to State Management standards but MUST reconcile to authoritative state after failure.

Loading, selected, expanded, muted, or disabled icon treatment MUST correspond to the containing Component's actual state.

---

## 2.72 Accessibility relationship

Accessibility requirements take precedence over visual minimalism.

Functional icons MUST NOT create inaccessible icon-only interfaces merely to reduce visual density.

Interactive controls MUST have:

- appropriate semantic role;
- accessible name;
- keyboard operability;
- visible focus;
- sufficient target size.

Decorative icons SHOULD be hidden from assistive technologies.

Meaningful non-interactive icons MUST have equivalent textual meaning.

Colour and icon shape alone MUST NOT encode critical state where additional context is necessary.

---

## 2.73 Design Tokens relationship

Reusable icon and illustration presentation values MUST resolve to Design Tokens or Component variants.

This includes:

- icon size;
- semantic foreground colour;
- icon-to-label gap;
- icon container size;
- status background;
- illustration palette;
- imagery radius;
- image aspect ratio;
- overlay treatment.

Feature code MUST NOT establish a second icon token system.

---

## 2.74 Component relationship

Canonical Components MUST define standard icon behaviour.

Consumers SHOULD be able to insert an approved icon without manually configuring:

- size;
- spacing;
- alignment;
- disabled treatment;
- hover treatment.

Repeated icon-container compositions SHOULD be promoted to canonical Components or variants.

An icon MUST NOT determine the semantics of a Component.

The Component determines semantics; the icon reinforces them.

---

## 2.75 Pattern relationship

Patterns MUST govern how icons and imagery participate in complete workflows.

Examples include:

- empty states;
- destructive confirmations;
- onboarding;
- file upload;
- navigation;
- search;
- alerts;
- command interfaces;
- success states.

Feature teams MUST NOT use illustrations to compensate for missing workflow structure.

The Pattern MUST work without decorative imagery.

---

## 2.76 Cross-channel consistency

App, marketing, email, and documentation SHOULD share recognisable icon and illustration language.

### Application

Application UI MUST prioritise functional recognition and restraint.

### Marketing

Marketing MAY use richer illustration and photography while retaining the canonical visual character.

### Email

Email SHOULD use imagery conservatively and MUST remain comprehensible when images are blocked.

Critical email actions MUST use visible text labels rather than icon-only controls.

### Documentation

Documentation SHOULD use the same functional icon metaphors as the product when referring to controls.

Screenshots and diagrams SHOULD reflect current UI unless clearly labelled as conceptual or historical.

---

## 2.77 Review requirements

New icon families, custom domain icons, illustration styles, recurring imagery classes, or materially new asset types MUST receive Design System review.

Review SHOULD cover:

- semantic need;
- existing alternatives;
- metaphor;
- optical consistency;
- accessibility;
- licensing;
- localisation;
- implementation cost;
- asset weight.

One-off campaign photography does not necessarily require system-level adoption, but MUST still pass brand, licensing, Security, and accessibility review.

---

## 2.78 Exceptions

A deviation from this standard MUST document:

- affected asset or family;
- standard rule being deviated from;
- rationale;
- licensing status;
- accessibility impact;
- brand impact;
- intended duration;
- migration/replacement plan where temporary.

Repeated local exceptions MUST trigger Design System review.

A repeated exception is evidence of a missing system capability, not permission for uncontrolled divergence.

---

# 3. Anti-patterns

The following are non-conformant unless explicitly covered by an approved exception.

## 3.1 Icon-library soup

Different modules independently use Lucide, Font Awesome, Material, Heroicons, and miscellaneous SVGs.

## 3.2 Figma archaeology

An asset is used because somebody found it in an old Figma file, with no known provenance or licence.

## 3.3 Random downloaded SVG

A web-search result is copied directly into production without licensing or security review.

## 3.4 Emoji as product iconography

Emoji replaces canonical navigation, status, or action icons.

## 3.5 Arbitrary stroke changes

Individual icons use different stroke widths to appear more or less important.

## 3.6 Arbitrary icon sizing

Feature code contains many one-off icon dimensions rather than Component or token sizes.

## 3.7 Transform repair

Repeated `translate-x`, `translate-y`, margin, or scale overrides attempt to correct poorly governed optical alignment locally.

## 3.8 Metaphor drift

The same icon represents different actions across modules.

## 3.9 Action drift

The same action uses different unrelated icons across modules.

## 3.10 Mystery meat navigation

Primary navigation uses unlabeled unfamiliar icons that users must discover through trial and error.

## 3.11 Tooltip-only meaning

An ambiguous icon-only control relies on hover tooltip as its sole explanation.

## 3.12 Missing accessible name

An icon-only button is visually understandable but unnamed to assistive technology.

## 3.13 Redundant announcement

A decorative icon and adjacent visible label both produce duplicate screen-reader content.

## 3.14 Colour-only state

Success, warning, or error icons differ only in colour.

## 3.15 Filled-for-emphasis

Random icons become filled simply because a designer wants them to appear more prominent.

## 3.16 Oversized decorative icons

Large interface icons are used as decoration inside routine cards and headings without communication value.

## 3.17 Illustration wallpaper

Illustration fills available whitespace but provides no comprehension, identity, or narrative value.

## 3.18 Mixed illustration languages

Flat vector, 3D clay, hand sketch, and photoreal AI artwork appear together without an intentional system.

## 3.19 Giant empty-state art

The illustration dominates the state while the explanation and recovery action are visually secondary.

## 3.20 Friendly error disguise

A serious error looks like a benign empty state because illustration aesthetics were prioritised over state clarity.

## 3.21 Celebration inflation

Routine save, edit, copy, or CRUD actions trigger large celebratory illustrations.

## 3.22 Fake security symbolism

A shield or lock is used to imply encryption or protection the system does not actually provide.

## 3.23 Generic stock identity

Repeated generic corporate photography becomes the primary brand expression.

## 3.24 Screenshot data leak

Marketing or documentation screenshots contain real credentials, personal information, confidential data, or infrastructure identifiers.

## 3.25 Fake screenshot

Generated concept UI is presented as a screenshot of an existing product feature.

## 3.26 Text baked into illustration

Instructional or marketing copy is rendered inside an image despite needing responsive layout, accessibility, or localisation.

## 3.27 Crop blindness

`object-fit: cover` is applied globally and routinely crops faces, labels, charts, or product content.

## 3.28 Ratio proliferation

Every feature introduces a new image aspect ratio.

## 3.29 PNG photography by default

Large photographic images are delivered as unoptimised PNGs because they were exported that way from design software.

## 3.30 Original-size everywhere

Every device receives the full-resolution source image regardless of display size.

## 3.31 Unsafe SVG rendering

User-supplied or external SVG is injected directly as trusted markup without sanitisation.

## 3.32 Whole-library bundle

An entire icon library is shipped when the application uses only a small subset.

## 3.33 API-selected component

An arbitrary icon name received from an API directly controls which executable UI component is dynamically imported.

## 3.34 Asset-copy sprawl

The same icon or illustration is copied into multiple feature directories and modified independently.

## 3.35 Final-final filenames

Production assets retain unstable names such as `final2`, `copy`, `new-new`, or design-tool layer IDs.

## 3.36 CSS recoloured trademark

Third-party logos are forcibly recoloured or modified to match the product theme without permission.

## 3.37 Flag-as-language

Country flags are used as the primary representation of language choice.

## 3.38 Disabled-but-active icon

A disabled control contains an icon whose visual treatment still implies action is available.

## 3.39 Local status vocabulary

One module creates its own success/warning/error icon set instead of using canonical state semantics.

## 3.40 Decorative accessibility regression

Visible labels are removed and replaced with icons merely to make an interface appear cleaner.

---

# 4. Checklist

An implementation conforms to this standard only when the following can be answered **yes** where applicable.

### Icon system

- [ ] The canonical functional icon family is being used.
- [ ] No unnecessary secondary icon library has been introduced.
- [ ] Custom domain icons exist only where the canonical family is inadequate.
- [ ] Custom icons match canonical geometry and optical weight.
- [ ] Icon semantics are consistent across modules.

### Licensing and provenance

- [ ] Every third-party visual asset has known provenance.
- [ ] Licence terms have been reviewed.
- [ ] Attribution and notice requirements are preserved.
- [ ] Trademarked logos use approved artwork.
- [ ] Generated assets have passed provenance and visual review.
- [ ] Unknown-origin assets are excluded.

### Geometry and stroke

- [ ] Functional icons follow the canonical design grid.
- [ ] Stroke weight is consistent.
- [ ] Cap/join treatment is consistent.
- [ ] Visual margins and negative space match the canonical family.
- [ ] Optical alignment has been reviewed at actual UI size.
- [ ] Feature code does not contain arbitrary icon transforms.

### Sizing

- [ ] Icon sizes resolve to canonical tokens or Component variants.
- [ ] Interaction target size is independent of visual icon size.
- [ ] Very small icons remain legible.
- [ ] Control consumers do not repeatedly hard-code icon dimensions.
- [ ] Icon sizing remains coherent across density modes.

### Metaphors

- [ ] One action uses one primary icon metaphor.
- [ ] One icon does not represent unrelated actions.
- [ ] Familiar metaphors are preferred over novelty.
- [ ] Cultural interpretation has been considered where relevant.
- [ ] RTL mirroring behaviour is correct.

### Icon and label usage

- [ ] Important or unfamiliar actions use visible labels.
- [ ] Icons paired with labels communicate the same action.
- [ ] Decorative icons do not produce duplicate accessibility output.
- [ ] Every icon-only interactive control has an accessible name.
- [ ] Icon-only controls provide additional visible help where ambiguity remains.
- [ ] Accessible names describe actions rather than visual shapes.

### State

- [ ] Icon state follows Component state.
- [ ] Selected/active variants remain recognisably the same concept.
- [ ] Status metaphors are canonical.
- [ ] Destructive icons accurately represent consequence.
- [ ] Colour is not the sole state distinction.
- [ ] Disabled icons do not appear active.

### Illustration

- [ ] Illustration has a defined communication or brand purpose.
- [ ] The illustration belongs to the canonical style family.
- [ ] Complexity matches display size.
- [ ] Colour follows the wider visual language.
- [ ] Dark-mode behaviour is intentional where applicable.
- [ ] Illustration does not imitate controls.
- [ ] Embedded text has been avoided where semantic text is possible.

### Empty states

- [ ] State explanation is clearer than the artwork.
- [ ] A relevant next action is provided when one exists.
- [ ] "No data," "no results," and "error" remain visually distinct.
- [ ] Filtered no-results states remain primarily utilitarian.
- [ ] Empty-state artwork does not dominate the workflow.

### Photography and imagery

- [ ] Photography is relevant and credible.
- [ ] Usage rights are known.
- [ ] Images containing people are appropriately authorised.
- [ ] Product screenshots contain no prohibited sensitive information.
- [ ] Generated concept screens are not misrepresented as existing product.
- [ ] Cropping preserves important content.

### Aspect ratios

- [ ] The image uses a canonical ratio where applicable.
- [ ] New recurring ratios have a documented need.
- [ ] Responsive crop behaviour is defined.
- [ ] Important instructional content is not cropped.
- [ ] Layout reserves image space before loading.

### Accessibility

- [ ] Informative images have appropriate text alternatives.
- [ ] Decorative images are excluded from unnecessary assistive output.
- [ ] Meaningful status is not icon-only where additional context is required.
- [ ] Icon-only buttons are keyboard accessible and named.
- [ ] Focus and target-size requirements are met.
- [ ] Motion imagery respects reduced-motion preferences.

### Security

- [ ] Untrusted SVG is not rendered as trusted executable markup.
- [ ] Images contain no prohibited secrets or sensitive metadata.
- [ ] Media upload validation occurs server-side.
- [ ] File extensions are not treated as sufficient media validation.
- [ ] Private asset URLs follow the approved access model.

### Asset pipeline

- [ ] Canonical source assets are retained.
- [ ] Production SVGs are optimised.
- [ ] Raster images use appropriate delivery formats.
- [ ] Responsive image derivatives exist where useful.
- [ ] Oversized originals are not delivered unnecessarily.
- [ ] Below-the-fold imagery is lazy-loaded where appropriate.
- [ ] Immutable assets use appropriate versioning/caching.
- [ ] Asset names follow canonical naming rules.
- [ ] Shared assets have one canonical source.

### Performance

- [ ] Icons are imported in a tree-shakeable manner.
- [ ] The application is not bundling an entire unused icon library.
- [ ] SVG complexity is proportionate to visual value.
- [ ] Image transfer sizes are appropriate to display dimensions.
- [ ] Animated imagery has passed performance and motion review.

### Cross-standard alignment

- [ ] Content terminology and icon metaphors agree.
- [ ] Form icons do not replace labels or validation text.
- [ ] Table icons follow Tables & Data Grid semantics.
- [ ] Security symbols do not make unsupported claims.
- [ ] Icon state derives from canonical application state.
- [ ] Reusable presentation values resolve to Design Tokens.
- [ ] Components own icon sizing and spacing.
- [ ] Complete workflows follow canonical Patterns.
- [ ] shadcn/ui remains the Component baseline.

---

# 5. Canonical summary

The product MUST use **one coherent functional icon language**.

**Lucide MUST be the default functional icon family for new shadcn/ui products unless the Design System explicitly approves another family at the product-system level.**

**Feature teams MUST NOT introduce icon libraries independently.**

**Every external icon, illustration, photograph, or generated asset MUST have known provenance and acceptable usage rights. Unknown-origin assets MUST NOT enter production.**

**Functional icons MUST use consistent geometry, stroke character, sizing, negative space, and optical alignment.**

**Icon sizes MUST come from Design Tokens or Component variants rather than arbitrary feature-level values.**

**Interaction-target size MUST NOT be confused with visual icon size.**

**One concept MUST use one primary metaphor. The same symbol MUST NOT acquire different meanings across modules.**

**Visible labels SHOULD accompany important, consequential, unfamiliar, or ambiguous actions.**

**Every icon-only interactive control MUST have an accessible name. Tooltips MUST NOT replace accessible names.**

**Decorative icons and illustrations SHOULD remain silent to assistive technologies when nearby content already communicates their meaning.**

**Status MUST NOT depend solely on icon shape or colour when the consequence is material.**

**Illustration MUST exist to improve comprehension, narrative, or brand expression—not merely to fill whitespace.**

**Empty-state artwork is optional. Clear explanation and an appropriate recovery or next action take priority.**

**Illustration systems MUST remain coherent. Flat vector, 3D, photoreal, sketch, and unrelated generative styles MUST NOT be mixed casually.**

**Photography and screenshots MUST be credible, licensed, intentionally cropped, and free of prohibited sensitive information.**

**Recurring imagery MUST use a restrained canonical aspect-ratio system. Responsive cropping MUST preserve important content.**

**Essential text SHOULD remain semantic text rather than being baked into images.**

**SVG is the preferred functional-icon format, but untrusted SVG MUST be treated as active content and handled according to Security requirements.**

**Production imagery MUST pass through the canonical optimisation pipeline. Full-resolution originals, unnecessary PNG photography, oversized SVGs, and entire unused icon libraries MUST NOT be shipped by default.**

**Shared assets MUST have one canonical source, stable naming, explicit ownership, and an intentional lifecycle.**

**Content & UX Writing owns terminology; iconography reinforces it. Components own standard icon presentation; Patterns own complete workflows. Accessibility and Security take precedence over visual minimalism or decoration.**

The Gold Standard is achieved when users can **recognise actions quickly, understand visual meaning consistently, operate icon-based controls accessibly, and experience one coherent visual language across product UI, marketing, documentation, and email—without unnecessary asset weight, licensing uncertainty, or visual-system drift.**

For the implementation baseline: current shadcn/ui configuration uses Lucide as its default icon library and provides first-class migration between supported icon systems; Lucide's default SVG geometry is 24×24 with a 2-unit stroke and its current licence is ISC. citeturn186404search0turn186404search2turn305434search0turn663041search3 WAI guidance also supports the accessibility rules above: icon-only controls require accessible names, while visible labels should remain represented in the accessible name when present. citeturn663041search0turn663041search2turn663041search4
