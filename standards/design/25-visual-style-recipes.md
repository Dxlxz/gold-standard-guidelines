---
id: "visual-style-recipes"
title: "Visual Style Recipe Library"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "visual", "style", "recipe", "library"]
applies_to: ["ui"]
related: ["corporate-enterprise-visual", "accessibility"]
legacy_number: 105
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 80801
provenance: baseline

---

Research completed first with Firecrawl. The specification below treats the library as a governed production system: prompts are reusable, but typography, contrast, motion, data semantics, and content truth remain controlled by the application rather than delegated to the image generator.

# Visual Style Recipe Library — Gold Standard 2026

**Canonical placement:** Design Tokens → Visual Standards → **Visual Style Recipe Library** → Anti-AI-Slop & Craft → Corporate & Enterprise Visual Standards → Layout Patterns → Facade → Components  
**Status:** Normative  
**Component baseline:** shadcn/ui  
**Accessibility baseline:** WCAG 2.2 AA or higher  
**Coverage:** 57 style families / 114 production-ready recipes

---

# 1. Purpose

The Visual Style Recipe Library defines reusable text-to-image directions for product, editorial, marketing, data, scientific, geospatial, and institutional visual production.

The library exists to prevent vague prompts such as:

```text
make it modern
make it artistic
make it futuristic
make it premium
```

from becoming the visual brief.

Each canonical recipe specifies:

- prompt text;
- palette;
- best-use case;
- recommended aspect ratio;
- explicit avoidance constraint;
- accessibility implications;
- code implementation guidance where equivalent styling can be produced more robustly with CSS/HTML/SVG.

A recipe is a **starting grammar**, not permission to bypass:

- Brand standards;
- Design Tokens;
- Accessibility;
- Corporate & Enterprise Visual Standards;
- Anti-AI-Slop & Craft;
- Data Visualization standards;
- Security;
- Content standards;
- legal or provenance requirements.

The generated image MUST serve an identified communication function.

NN/g recommends prioritising information-carrying imagery over decorative imagery because useful images help people make decisions or understand content, while generic decorative imagery consumes space with comparatively little value.  
https://www.nngroup.com/articles/imagery-in-visual-design/

---

# 2. Rules

## 2.1 Prompt contract

Every production prompt SHOULD contain five layers:

```text
SUBJECT
+
COMPOSITION
+
MATERIAL / VISUAL PROCESS
+
PALETTE / LIGHTING
+
NEGATIVE CONSTRAINTS
```

Example:

```text
Satellite-observed tropical forest boundary,
oblique aerial composition with the monitored parcel dominant,
scientific geospatial composite with subtle contour overlays,
deep forest green, mineral grey and warm survey orange,
no fake labels, no decorative UI, no neon, no invented roads.
```

"Beautiful", "modern", "premium", and "professional" MAY supplement a prompt but MUST NOT substitute for specific visual instructions.

---

## 2.2 Keep critical text out of generated imagery

Critical interface text SHOULD be rendered in HTML rather than baked into a generated image.

This includes:

- headings;
- prices;
- labels;
- legal notices;
- chart legends;
- map labels;
- controls;
- accessibility-critical annotations.

WCAG explicitly prefers real text over images of text where the desired presentation can be achieved using normal web technology, and requires sufficient text/background contrast.  
https://www.w3.org/TR/WCAG22/#images-of-text  
https://www.w3.org/TR/WCAG22/#contrast-minimum

Generated backgrounds SHOULD therefore reserve quiet areas for real HTML text instead of attempting to generate perfect typography inside the image.

---

## 2.3 Background accessibility

When a recipe is used behind text, the implementation MUST verify contrast against the **actual rendered crop**, not merely the nominal palette.

Busy backgrounds SHOULD use one or more of:

- dedicated quiet zones;
- solid text panels;
- controlled scrims;
- gradients beneath text;
- alternate responsive crops.

Text MUST NOT depend on a generated image always placing dark or light pixels in the same location.

WCAG 2.2 requires normal text to achieve at least 4.5:1 contrast and large text at least 3:1 under the relevant criterion.  
https://www.w3.org/TR/WCAG22/#contrast-minimum

---

## 2.4 Motion

A static image recipe MUST NOT automatically become an animated background.

Where a style is animated in code:

- motion MUST serve a communication purpose;
- layout MUST remain stable;
- the implementation MUST respect reduced-motion preferences;
- continuous motion SHOULD be removed or substantially reduced when it is decorative.

Material's transition guidance emphasises coherent spatial models, stable layouts, consistency, and accessibility settings rather than motion for its own sake.  
https://m3.material.io/styles/motion/transitions/applying-transitions

WCAG also contains criteria related to animation triggered by interaction.  
https://www.w3.org/TR/WCAG22/#animation-from-interactions

---

## 2.5 Data and geospatial integrity

Styles used for charts, maps, or analytical imagery MUST preserve data semantics.

Aesthetic palettes MUST NOT silently override:

- sequential scales;
- diverging scales;
- category distinction;
- uncertainty;
- missing-data state;
- selection state.

Carbon explicitly distinguishes categorical, sequential, diverging, and alert palettes according to data meaning.  
https://preview.carbondesignsystem.com/building-blocks/data-visualization/color-palettes

For geospatial work, the visual form MUST reflect the actual spatial relationship: choropleth, proportional symbol, connection map, heat map, contour surface, or other appropriate representation.  
https://preview.carbondesignsystem.com/building-blocks/data-visualization/spatial-charts

---

## 2.6 Generated imagery is not evidence

Generated:

- satellite imagery;
- microscopy;
- maps;
- scientific specimens;
- archival photographs;
- field photographs;
- technical diagrams

MUST NOT be represented as actual observations or measurements unless they are derived from the real source material.

A generated scientific plate MAY illustrate a concept.

It MUST NOT silently become a scientific record.

---

## 2.7 CSS before raster where appropriate

A raster image SHOULD NOT be generated when equivalent visual treatment can be:

- lighter;
- responsive;
- theme-aware;
- accessible;
- resolution-independent

using CSS, SVG, Canvas, or HTML.

Prefer code for:

- simple gradients;
- grids;
- grain overlays;
- frosted glass;
- geometric patterns;
- basic halftone textures;
- terminal interfaces;
- ASCII;
- contour-line backgrounds;
- controlled translucent surfaces.

Use generated imagery when irregular material character, illustration, photography, or painterly complexity is the actual requirement.

---

# 3. Visual Style Recipe Library

## 3.1 Duotone

### Recipe 001 — Documentary Duotone Portrait

**Prompt:** `Documentary portrait of {subject}, direct natural expression, tightly composed head-and-shoulders photograph converted to high-contrast duotone, preserved skin and fabric texture, large quiet negative-space area for editorial typography, no embedded text, restrained institutional mood.`  
**Palette:** Midnight navy `#10263D`, warm sand `#D8B77A`.  
**Best use:** Reports, profile stories, campaign headers.  
**Aspect:** 4:5 or 3:2.  
**Avoid:** Fashion-retouching, neon gradients, artificial smiles.  
**Accessibility:** Place HTML copy in the quiet zone with tested contrast.  
**Code hint:** CSS `grayscale()` + `mix-blend-mode` or SVG duotone filter can replace raster treatment.

### Recipe 002 — Industrial Duotone Infrastructure

**Prompt:** `Wide documentary photograph of {industrial or civic infrastructure}, strong geometric perspective, crisp structural detail, two-ink duotone reproduction, subtle paper tooth, sober technical atmosphere, empty upper-left region for real HTML heading, no logos, no fake signage.`  
**Palette:** Charcoal `#202124`, safety amber `#D79A24`.  
**Best use:** Energy, infrastructure, government reports.  
**Aspect:** 16:9.  
**Avoid:** Cyberpunk lighting, heavy glow, fake workers.  
**Accessibility:** Do not place text over high-frequency machinery without a solid scrim.  
**Code hint:** SVG/CSS duotone is preferable when using real photography.

---

## 3.2 Brutalist Collage

### Recipe 003 — Civic Brutalist Poster

**Prompt:** `Raw civic-information collage about {topic}, oversized cropped documentary photography, torn photocopy edges, black registration marks, hard rectangular blocks, one oversized geometric accent, deliberately uneven composition, visual hierarchy stronger than symmetry, no decorative gradients, no fake official seals.`  
**Palette:** Off-white `#F1EEE5`, black `#111111`, signal red `#C82B28`.  
**Best use:** Cultural programmes, campaigns, editorial posters.  
**Aspect:** 2:3.  
**Avoid:** Polished startup cards, soft shadows, glass.  
**Accessibility:** Keep required copy outside the generated graphic.  
**Code hint:** Can be recreated using HTML blocks, clipped images, `transform`, and CSS borders.

### Recipe 004 — Technical Manifesto Collage

**Prompt:** `Brutalist technical collage for {subject}, monochrome schematics, cropped equipment photography, oversized sequence numbers, torn paper seams, asymmetric modular structure, xerox grain, one fluorescent annotation colour, no legible generated body text.`  
**Palette:** Bone `#ECE9DE`, carbon `#171717`, acid yellow `#D8F13C`.  
**Best use:** Developer events, technical editorial, R&D.  
**Aspect:** 1:1.  
**Avoid:** Random sticker clutter, emoji, generic graffiti.  
**Accessibility:** High visual noise means text SHOULD use a separate solid panel.  
**Code hint:** HTML/SVG layering works well and keeps real typography accessible.

---

## 3.3 Minimalism

### Recipe 005 — Quiet Product Still

**Prompt:** `Minimal studio still life of {object}, one object only, large negative space, soft directional daylight, matte neutral surface, precise natural shadow, restrained editorial composition, no props unless functionally relevant, no floating particles, no text.`  
**Palette:** Chalk `#F3F0E9`, graphite `#343638`, muted accent `#8A7A63`.  
**Best use:** Product hero, reports, premium documentation.  
**Aspect:** 4:3.  
**Avoid:** Glossy gradient backgrounds, excessive props, levitation.  
**Accessibility:** Excellent background candidate if negative space is stable.  
**Code hint:** Use real product photography when authenticity matters.

### Recipe 006 — Minimal Institutional Landscape

**Prompt:** `Minimal landscape of {place or environmental subject}, broad horizon, quiet atmospheric perspective, subdued realistic colour, one dominant geographic form, documentary rather than postcard treatment, extensive sky or ground negative space, no artificial landmarks.`  
**Palette:** Fog `#DCE1DC`, slate `#68716E`, moss `#60725A`.  
**Best use:** Environmental agency, annual report, public information.  
**Aspect:** 21:9.  
**Avoid:** Hyper-saturated sunsets, fantasy mountains, lens-flare spectacle.  
**Accessibility:** Reserve sky/ground zone for text and verify contrast after crop.  
**Code hint:** Image asset appropriate; CSS may provide only the background tone.

---

## 3.4 Swiss Typographic

### Recipe 007 — Swiss Grid Poster

**Prompt:** `International Typographic Style poster for {topic}, strict modular grid, asymmetric placement, generous white space, red and black geometric rules, photographic crop as secondary element, visual rhythm inspired by mid-century Swiss information design, no fake paragraph text, leave typography zones blank.`  
**Palette:** White `#F7F7F4`, black `#111111`, vermilion `#D33A2C`.  
**Best use:** Events, research programmes, cultural institutions.  
**Aspect:** 2:3.  
**Avoid:** Centred composition, decorative scripts, gradients.  
**Accessibility:** Render all final typography in HTML/SVG.  
**Code hint:** Strong CSS Grid candidate.

### Recipe 008 — Swiss Data Title Card

**Prompt:** `Swiss-style data title card about {dataset}, disciplined left alignment, modular grid, bold geometric bars proportional to composition rather than fake data, monochrome photography fragment, open whitespace, no generated labels or invented numbers.`  
**Palette:** Paper `#F4F2EC`, ink `#161616`, cobalt `#2253A3`.  
**Best use:** Data-story chapter openers, reports.  
**Aspect:** 16:9.  
**Avoid:** Faux charts implying actual measurements.  
**Accessibility:** Actual values MUST be HTML/SVG and data-backed.  
**Code hint:** Implement entirely with CSS Grid and real text.

---

## 3.5 Editorial / Magazine

### Recipe 009 — Investigative Report Opener

**Prompt:** `Editorial magazine opener for {subject}, cinematic documentary image, asymmetric crop, sophisticated restrained colour grade, strong focal subject offset from centre, quiet margin for headline, tactile print character, no embedded text or magazine masthead.`  
**Palette:** Natural image colours + ink `#1C1C1A`, cream `#F0ECE1`.  
**Best use:** Research stories, policy explainers.  
**Aspect:** 3:2.  
**Avoid:** Stock-photo smiles, glossy lifestyle staging.  
**Accessibility:** Headline remains HTML with solid/controlled background.  
**Code hint:** Standard responsive `<picture>` with editorial crop.

### Recipe 010 — Profile Magazine Spread

**Prompt:** `Environmental portrait of {person/role} in their real working context, magazine feature photography, available light, visible tools and environment, confident asymmetric crop, moderate grain, documentary specificity, blank margin for pull quote, no synthetic corporate backdrop.`  
**Palette:** Context-derived neutrals, restrained warm highlights.  
**Best use:** Staff, researcher, field-worker profiles.  
**Aspect:** 4:5.  
**Avoid:** Generic AI office, staged handshake, fake awards.  
**Accessibility:** If person is real, use genuine photography rather than generated likeness.  
**Code hint:** Image asset; use CSS object positioning for responsive crop.

---

## 3.6 Risograph

### Recipe 011 — Ecology Riso Poster

**Prompt:** `Two-colour risograph illustration of {species/ecosystem}, misregistered ink edges, visible halftone grain, flat botanical silhouettes, bold negative space, tactile recycled-paper feel, simple compositional hierarchy, no typography rendered in-image.`  
**Palette:** Forest `#245943`, fluorescent orange `#F15A38`, paper `#EEE7D4`.  
**Best use:** Environmental campaigns, cultural print.  
**Aspect:** 2:3.  
**Avoid:** Perfect vector cleanliness, photographic gradients.  
**Accessibility:** Riso textures can reduce local contrast; use separate text.  
**Code hint:** SVG layers + blend modes can approximate effect.

### Recipe 012 — Riso Data Motif

**Prompt:** `Abstract risograph pattern derived from {real domain motif: contour lines / leaves / waves}, limited two-ink print, coarse dots, deliberate registration offset, no numbers, no fake chart marks, generous low-detail centre for overlay content.`  
**Palette:** Navy `#263B5A`, coral `#E45F52`, warm paper `#F0E7D2`.  
**Best use:** Report dividers, poster backgrounds.  
**Aspect:** 16:9.  
**Avoid:** Turning decorative motif into misleading data visualization.  
**Accessibility:** Apply solid panel for body copy.  
**Code hint:** CSS/SVG pattern plus grain texture.

---

## 3.7 Halftone / Newsprint

### Recipe 013 — Documentary Newsprint

**Prompt:** `Black-and-white documentary photograph of {subject} reproduced as coarse newspaper halftone, strong directional light, visible dot structure, imperfect ink density, editorial crop, no fake headline text.`  
**Palette:** Newsprint `#E7E1D2`, ink `#202020`.  
**Best use:** Historical stories, advocacy, archival design.  
**Aspect:** 3:2.  
**Avoid:** Comic-book styling unless explicitly intended.  
**Accessibility:** Fine halftone interferes with overlaid text; isolate typography.  
**Code hint:** CSS/SVG halftone mask can process real imagery.

### Recipe 014 — Halftone Data Story Backdrop

**Prompt:** `Large abstract halftone field derived from {domain form}, progressively changing dot density, newsprint registration imperfections, strong empty margin, monochrome editorial character, no literal graph or invented data.`  
**Palette:** Ivory `#EEE9DD`, charcoal `#252525`, optional red `#B93631`.  
**Best use:** Data-report chapter separators.  
**Aspect:** 16:9.  
**Avoid:** Dot density implying values unless driven by actual data.  
**Accessibility:** Keep moving/animated dots disabled; background text needs solid contrast.  
**Code hint:** CSS radial gradients can generate halftone patterns.

---

## 3.8 Screen-Print

### Recipe 015 — Environmental Screen-Print

**Prompt:** `Three-ink screen-print illustration of {landscape/species}, flat overlapping shapes, bold silhouette, slight ink trapping, visible paper texture, high graphic contrast, simple hierarchy, no embedded text.`  
**Palette:** Pine `#214E3E`, ochre `#D39B3A`, black `#20201D`.  
**Best use:** Posters, campaigns, merchandise.  
**Aspect:** 2:3.  
**Avoid:** Photorealistic shading, excessive colour count.  
**Accessibility:** Strong silhouette works well; test overlaid copy independently.  
**Code hint:** SVG shapes and multiply blending are viable.

### Recipe 016 — Technical Screen-Print

**Prompt:** `Industrial screen-print graphic of {machine/infrastructure}, simplified sectional silhouette, three flat inks, technical labels omitted, bold diagonal crop, imperfect print registration, utilitarian rather than nostalgic.`  
**Palette:** Cream `#F2EAD9`, navy `#163A59`, orange `#D85C27`.  
**Best use:** Engineering reports, exhibition graphics.  
**Aspect:** 4:3.  
**Avoid:** Fake labels, steampunk ornament, excessive distress.  
**Accessibility:** Keep actual annotations in HTML/SVG.  
**Code hint:** Vector/SVG implementation preferred for real diagrams.

---

## 3.9 Paper-Cut

### Recipe 017 — Layered Paper Landscape

**Prompt:** `Hand-cut layered paper landscape of {terrain}, six physical-paper depth layers, crisp cut edges, subtle cast shadows, restrained natural palette, contour-like depth progression, no glitter, no typography.`  
**Palette:** Sage `#819477`, pine `#405D4D`, clay `#B66E52`, cream `#EEE8DA`.  
**Best use:** Environmental storytelling, educational hero.  
**Aspect:** 16:9.  
**Avoid:** Toy-like rainbow layers, exaggerated shadows.  
**Accessibility:** Use as decorative image with empty alt when redundant.  
**Code hint:** CSS layered pseudo-elements possible for simple geometry.

### Recipe 018 — Paper-Cut Process Diagram

**Prompt:** `Paper-cut visual metaphor for {process}, three to five clearly separated stages represented by layered physical shapes, directional progression left to right, realistic paper fibres and tiny shadows, no arrows or text generated in-image.`  
**Palette:** Off-white, charcoal, one brand accent.  
**Best use:** Explainer backgrounds, onboarding illustration.  
**Aspect:** 3:2.  
**Avoid:** More than five equal stages; fake labels.  
**Accessibility:** Real process labels and arrows MUST be HTML/SVG.  
**Code hint:** CSS/SVG often better for actual process diagrams.

---

## 3.10 Cut-Out Collage

### Recipe 019 — Editorial Cut-Out Montage

**Prompt:** `Editorial cut-out collage about {topic}, real-world photographic fragments, rough hand-cut edges, archival paper pieces, restrained overlap, purposeful scale contrast, one dominant image and several supporting fragments, no floating random stickers.`  
**Palette:** Paper neutral + context photography + one red/blue accent.  
**Best use:** Magazine covers, issue explainers.  
**Aspect:** 4:5.  
**Avoid:** Equal-sized fragments, unrelated visual jokes.  
**Accessibility:** Treat as one image; textual explanation stays outside.  
**Code hint:** HTML clipped images can create responsive collage.

### Recipe 020 — Community Archive Collage

**Prompt:** `Human-scale archival collage for {community/theme}, scanned ephemera, maps, photographs, handwritten texture used as illegible visual texture only, imperfect tape and crop marks, quiet documentary tone, no invented historical documents.`  
**Palette:** Faded paper `#D8CDB8`, ink `#3A3731`, archive red `#9B443B`.  
**Best use:** Heritage, community history.  
**Aspect:** 3:2.  
**Avoid:** Fake official documents or synthetic historical evidence.  
**Accessibility:** Caption provenance outside image.  
**Code hint:** Prefer scans of authentic archive material when available.

---

## 3.11 Isometric Technical

### Recipe 021 — Isometric System Architecture

**Prompt:** `Clean isometric technical illustration of {system}, simplified functional modules, visible pipes/cables/data paths, consistent 30-degree isometric projection, restrained industrial colours, white background, no decorative people, no fake text labels.`  
**Palette:** Steel `#697781`, dark blue `#274661`, orange `#C96D2D`, white.  
**Best use:** Infrastructure, architecture, system explainers.  
**Aspect:** 4:3.  
**Avoid:** Toy-city styling, impossible geometry.  
**Accessibility:** Actual labels MUST be separate HTML/SVG.  
**Code hint:** SVG or true 3D is preferable for diagrams needing updates.

### Recipe 022 — Isometric Facility Cutaway

**Prompt:** `Isometric cutaway of {facility}, physically plausible floors and equipment zones, restrained sectional detail, subtle shadows, clear dominant flow path, engineering-manual clarity, no tiny fake labels.`  
**Palette:** Warm grey, slate, safety yellow, muted teal.  
**Best use:** Facilities, utilities, process education.  
**Aspect:** 16:9.  
**Avoid:** Excessive miniature detail and decorative vegetation.  
**Accessibility:** Provide equivalent textual process description.  
**Code hint:** 3D/WebGL if users need interaction; otherwise SVG/raster.

---

## 3.12 Axonometric Blueprint

### Recipe 023 — Axonometric Building Blueprint

**Prompt:** `Precise axonometric drawing of {building/system}, white technical linework on deep blueprint field, consistent line weights, cutaway details, dimension marks represented abstractly without fake numbers, disciplined engineering composition.`  
**Palette:** Blueprint `#0D4770`, cyan-white `#DCEFF4`.  
**Best use:** Architecture, engineering covers.  
**Aspect:** 4:3.  
**Avoid:** Random measurement numbers, perspective distortion.  
**Accessibility:** Generated dimensions MUST NOT be treated as factual.  
**Code hint:** SVG line art over CSS blueprint grid.

### Recipe 024 — Axonometric Network Blueprint

**Prompt:** `Axonometric infrastructure network across {site}, nodes connected through physically coherent routes, blueprint line style, layered system zones, one highlighted route, no fake identifiers, no glowing sci-fi circuitry.`  
**Palette:** Navy `#143E5D`, ice `#D9EEF2`, amber `#DFA84C`.  
**Best use:** Telecom, utilities, logistics.  
**Aspect:** 16:9.  
**Avoid:** HUD ornament and unreadable pseudo-labels.  
**Accessibility:** Describe network relationship textually.  
**Code hint:** Use SVG when relationships are actual data.

---

## 3.13 Topographic / Contour Map

### Recipe 025 — Terrain Contour Hero

**Prompt:** `High-resolution topographic contour composition based on {terrain type}, fine nested elevation lines, sparse hillshade, broad quiet region for heading, cartographic precision, no roads or labels unless supplied from real data.`  
**Palette:** Parchment `#E9E2CF`, contour brown `#775F44`, deep green `#324D42`.  
**Best use:** Outdoor, environmental, geospatial hero.  
**Aspect:** 21:9.  
**Avoid:** Invented place names or fake coordinates.  
**Accessibility:** Lines behind text require solid/scrim treatment.  
**Code hint:** Generate contours from real DEM data whenever analytical.

### Recipe 026 — Abstract Contour Pattern

**Prompt:** `Abstract contour-line field inspired by {natural form}, monochrome flowing nested lines, varying but controlled density, no geographic claim, quiet central void, technical paper-print character.`  
**Palette:** Cream `#F0EBDF`, charcoal `#303431`.  
**Best use:** Decorative report surfaces, section dividers.  
**Aspect:** 16:9.  
**Avoid:** Presenting decorative contours as real terrain.  
**Accessibility:** Decorative background; keep HTML text separate.  
**Code hint:** SVG procedural paths are ideal.

---

## 3.14 Geospatial Satellite Composite

### Recipe 027 — Forest Monitoring Composite

**Prompt:** `Scientific false-colour satellite composite of tropical forest {region type}, realistic spectral texture, visible waterways and clearing boundaries, subtle acquisition-strip variation, no clouds over focal zone, no labels, no invented settlements, analytical rather than cinematic.`  
**Palette:** Deep vegetation red/green false-colour scheme depending sensor convention; neutral dark water.  
**Best use:** Remote-sensing explainers.  
**Aspect:** 1:1 or 4:3.  
**Avoid:** Passing generated imagery off as actual satellite evidence.  
**Accessibility:** Include textual explanation of spectral encoding.  
**Code hint:** For analytical use, MUST render real remote-sensing data.

### Recipe 028 — Coastal Satellite Composite

**Prompt:** `Satellite-style multispectral composite of coastal wetlands, estuary channels, sediment plumes and urban edge, realistic overhead geometry, restrained scientific colour enhancement, subtle scale ambiguity avoided through clear composition, no fake map labels.`  
**Palette:** Cyan water, mineral tan, muted vegetation green/red.  
**Best use:** Coastal/environmental storytelling.  
**Aspect:** 16:9.  
**Avoid:** Fantasy coastlines in factual contexts.  
**Accessibility:** Colour-coded interpretation needs legend in real HTML.  
**Code hint:** Use real GIS raster layers for actual decision support.

---

## 3.15 GIS Layer Aesthetic

### Recipe 029 — Parcel Overlay

**Prompt:** `Clean GIS-inspired visual of {land parcels}, neutral aerial base, crisp parcel polygons, one selected boundary, protected zones shown with hatch texture, subtle coordinate-grid feeling without fake coordinates, analytical interface aesthetic, no UI chrome.`  
**Palette:** Grey aerial, white boundaries, amber selection, green hatch.  
**Best use:** Property, land, planning, forestry.  
**Aspect:** 16:9.  
**Avoid:** Random polygon colours and fake labels.  
**Accessibility:** Selection MUST have shape/outline distinction beyond colour.  
**Code hint:** Use MapLibre/Mapbox/Leaflet for actual maps.

### Recipe 030 — Environmental Risk Layers

**Prompt:** `Layered GIS composition of watershed, slope risk, vegetation and administrative boundary, semi-transparent overlays with clearly distinct textures, visually calm base map, one active risk layer dominant, no legend generated in image.`  
**Palette:** Neutral grey base, blue water, rust risk, green vegetation.  
**Best use:** Environmental-risk product visuals.  
**Aspect:** 4:3.  
**Avoid:** Many transparent colours becoming muddy.  
**Accessibility:** Real implementation SHOULD combine pattern, outline, and colour.  
**Code hint:** Actual GIS renderer strongly preferred.

---

## 3.16 Botanical / Field-Guide Illustration

### Recipe 031 — Botanical Specimen

**Prompt:** `Traditional botanical field-guide illustration of {plant species}, whole plant plus leaf, flower and seed details, neutral paper ground, precise natural proportions, restrained scientific watercolour, no decorative frame, no fake Latin name.`  
**Palette:** Natural botanical greens, muted flower colours, cream paper.  
**Best use:** Ecology, educational content, species guide.  
**Aspect:** 4:5.  
**Avoid:** Fantasy anatomy and invented taxonomy.  
**Accessibility:** Caption species and diagnostic features in HTML.  
**Code hint:** Image asset; use SVG callouts for actual labels.

### Recipe 032 — Forest Leaf Comparison Plate

**Prompt:** `Field-guide comparison illustration showing {3–5 supplied leaf forms}, consistent scale, aligned specimens, visible venation and edge morphology, blank annotation gutters, cream archival background, no text generated.`  
**Palette:** Natural greens/browns, graphite outlines.  
**Best use:** Identification guides.  
**Aspect:** 3:2.  
**Avoid:** Comparing specimens at inconsistent implied scale.  
**Accessibility:** Provide textual differences for nonvisual users.  
**Code hint:** HTML grid with separate specimen images and captions may be more accessible.

---

## 3.17 Scientific Plate

### Recipe 033 — Entomology Plate

**Prompt:** `Scientific plate of {insect}, dorsal and lateral views plus magnified anatomical details, precise neutral illumination, archival plate composition, scale bar area left blank, no invented labels, high morphological accuracy.`  
**Palette:** Specimen-natural colours, ivory ground, black linework.  
**Best use:** Biology education, museum content.  
**Aspect:** 4:5.  
**Avoid:** Claiming generated morphology as authoritative identification evidence.  
**Accessibility:** Explain features in text.  
**Code hint:** Use real specimen imaging in scientific workflows.

### Recipe 034 — Geological Specimen Plate

**Prompt:** `Scientific mineral and rock specimen plate for {material}, controlled neutral light, multiple fracture and texture views, precise natural colour, subtle archival numbering spaces left blank, no labels or measurements rendered.`  
**Palette:** Mineral-specific neutrals, paper ivory.  
**Best use:** Geology editorial, field guides.  
**Aspect:** 3:2.  
**Avoid:** Artificial gem sparkle and impossible crystal structures.  
**Accessibility:** Text descriptions SHOULD include diagnostic properties.  
**Code hint:** Real photography preferred for identification.

---

## 3.18 Ink and Wash

### Recipe 035 — Mountain Ink Wash

**Prompt:** `Expressive ink-and-wash landscape of {mountain/forest}, sparse black brush structure, diluted grey atmospheric washes, abundant untouched paper, one small muted accent, quiet contemplative composition.`  
**Palette:** Ink black, warm paper, optional moss accent.  
**Best use:** Editorial, cultural/environmental covers.  
**Aspect:** 3:2.  
**Avoid:** Hyper-detailed photorealism or fantasy temples unless relevant.  
**Accessibility:** Suitable as decorative hero if text uses quiet zone.  
**Code hint:** Image asset.

### Recipe 036 — Botanical Ink Study

**Prompt:** `Loose observational ink-and-wash study of {branch/species}, gestural contour lines, restrained grey-green washes, visible brush pooling, one specimen dominant, blank annotation area.`  
**Palette:** Sumi black, sage, warm ivory.  
**Best use:** Botanical editorial and packaging.  
**Aspect:** 4:5.  
**Avoid:** Excessive calligraphic pseudo-text.  
**Accessibility:** Use caption outside image.  
**Code hint:** Image asset.

---

## 3.19 Gouache

### Recipe 037 — Gouache Landscape

**Prompt:** `Hand-painted gouache landscape of {location type}, opaque matte colour, simplified but recognisable terrain, visible brush edges, layered foreground/midground/background, restrained poster-like palette.`  
**Palette:** Pine, ochre, sky grey-blue, clay.  
**Best use:** Editorial illustration, destination/environment report.  
**Aspect:** 16:9.  
**Avoid:** Digital airbrush smoothness.  
**Accessibility:** Ensure text uses a quiet solid zone.  
**Code hint:** Image only.

### Recipe 038 — Gouache Object Study

**Prompt:** `Gouache study of {instrument/specimen/object}, isolated on warm paper, simplified geometric shadows, opaque colour blocks, visible hand-painted edge variation, no labels.`  
**Palette:** Cream, deep blue/green, terracotta accent.  
**Best use:** Explainers, editorial spot illustration.  
**Aspect:** 1:1.  
**Avoid:** Glossy photorealistic rendering.  
**Accessibility:** Alt text should convey the object's purpose when informative.  
**Code hint:** Image asset.

---

## 3.20 Oil Impasto

### Recipe 039 — Industrial Impasto Landscape

**Prompt:** `Oil impasto painting of {industrial landscape}, heavy palette-knife texture, directional evening light, structural geometry still legible beneath expressive paint, restrained earth-and-steel palette, thick physical paint relief.`  
**Palette:** Umber, steel blue, warm ochre, off-white.  
**Best use:** Annual-report divider, cultural interpretation.  
**Aspect:** 3:2.  
**Avoid:** Romanticising unsafe or harmful conditions.  
**Accessibility:** Decorative unless image meaning is described.  
**Code hint:** Image only.

### Recipe 040 — Climate Impasto Abstract

**Prompt:** `Abstract oil impasto derived from {climate phenomenon}, layered directional strokes representing flow and pressure without pretending to be actual data, high material depth, limited palette, one high-energy focal region.`  
**Palette:** Deep navy, pale grey, rust, muted teal.  
**Best use:** Editorial climate theme.  
**Aspect:** 16:9.  
**Avoid:** Presenting expressive marks as measured visualization.  
**Accessibility:** Do not overlay dense text.  
**Code hint:** Image only.

---

## 3.21 Watercolour

### Recipe 041 — Field Landscape Watercolour

**Prompt:** `Transparent watercolour study of {wetland/forest/river}, soft pigment blooms, preserved white paper, atmospheric depth, accurate dominant landforms, restrained detail, documentary field-sketch mood.`  
**Palette:** Natural greens, earth, blue-grey.  
**Best use:** Environmental education and reports.  
**Aspect:** 3:2.  
**Avoid:** Candy-colour fantasy landscapes.  
**Accessibility:** Use strong text panel if overlaying copy.  
**Code hint:** Image asset.

### Recipe 042 — Cartographic Watercolour Wash

**Prompt:** `Abstract cartographic watercolour wash inspired by {watershed/coastline}, soft translucent colour regions, fine ink boundary fragments, no literal labels or roads, broad open area for title.`  
**Palette:** Blue-grey, sage, sand.  
**Best use:** Report cover, map-themed editorial.  
**Aspect:** 4:5.  
**Avoid:** Making decorative wash resemble authoritative map data.  
**Accessibility:** Keep real map information separate.  
**Code hint:** CSS gradients cannot fully reproduce hand-painted edge variation.

---

## 3.22 Charcoal

### Recipe 043 — Charcoal Working Portrait

**Prompt:** `Expressive charcoal portrait of {role/person archetype}, strong planar light, visible paper grain, smudged midtones, decisive dark marks, realistic working attire, no glamorous retouching.`  
**Palette:** Charcoal, paper white, warm grey.  
**Best use:** Editorial profiles, cultural work.  
**Aspect:** 4:5.  
**Avoid:** AI-beautification and perfect symmetry.  
**Accessibility:** If depicting a real person, do not substitute generated portrait for documentary photography.  
**Code hint:** Image only.

### Recipe 044 — Charcoal Architecture

**Prompt:** `Architectural charcoal drawing of {building/infrastructure}, broad structural masses, confident perspective, selective edge detail, dusty tonal gradients, generous paper margin.`  
**Palette:** Black, grey, ivory.  
**Best use:** Architecture and planning editorial.  
**Aspect:** 3:2.  
**Avoid:** Impossible structural geometry.  
**Accessibility:** Decorative unless tied to factual design.  
**Code hint:** Image only.

---

## 3.23 Line-Art / Engraving

### Recipe 045 — Technical Engraving

**Prompt:** `19th-century technical engraving treatment of {machine/object}, precise black cross-hatching, crisp contour line, isolated object on ivory paper, no ornamental border, no generated labels.`  
**Palette:** Ink `#292824`, ivory `#EEE8D8`.  
**Best use:** Heritage, premium editorial, technical history.  
**Aspect:** 4:5.  
**Avoid:** Fake patent numbers.  
**Accessibility:** Use real labels outside image.  
**Code hint:** SVG line art is preferable for actual technical diagrams.

### Recipe 046 — Landscape Engraving

**Prompt:** `Fine engraved landscape of {forest/mountain/watershed}, dense directional hatching, atmospheric line density, restrained historical print character, strong foreground silhouette, no imaginary monuments.`  
**Palette:** Black/sepia on cream.  
**Best use:** Report covers, heritage/environmental storytelling.  
**Aspect:** 16:9.  
**Avoid:** Excessive micro-detail beneath text.  
**Accessibility:** Use solid text region.  
**Code hint:** Image asset.

---

## 3.24 Pixel Art

### Recipe 047 — Pixel Operations Map

**Prompt:** `Pixel-art overhead operations map of {site}, strict low-resolution grid, readable terrain zones, limited 16-colour palette, distinct functional icons, no fake coordinates or text, utilitarian game-map clarity.`  
**Palette:** 16-colour muted industrial palette.  
**Best use:** Playful technical campaigns, educational simulation.  
**Aspect:** 16:9.  
**Avoid:** Using pixel art for safety-critical actual map data.  
**Accessibility:** Preserve clear shapes; do not encode state by colour alone.  
**Code hint:** `<canvas>` or CSS `image-rendering: pixelated`.

### Recipe 048 — Pixel Urban Scene

**Prompt:** `Pixel-art urban/infrastructure scene at dusk, disciplined tile scale, restrained lighting, clear silhouettes, sparse animation-ready composition, no neon overload.`  
**Palette:** Slate, amber, muted cyan, dark navy.  
**Best use:** Developer/cultural campaigns.  
**Aspect:** 3:2.  
**Avoid:** Busy flashing signage.  
**Accessibility:** Animated versions MUST respect reduced motion.  
**Code hint:** Canvas/sprite implementation suitable.

---

## 3.25 Voxel

### Recipe 049 — Voxel Land-Cover Model

**Prompt:** `Voxel model of {land-cover landscape}, chunky cubic terrain blocks, clearly differentiated forest, water, agriculture and built-up regions, orthographic view, restrained scientific palette, no game UI.`  
**Palette:** Natural categorical colours.  
**Best use:** Educational geospatial explainers.  
**Aspect:** 4:3.  
**Avoid:** Implying exact spatial boundaries.  
**Accessibility:** Add textual land-cover description.  
**Code hint:** WebGL/Three.js for interactive version.

### Recipe 050 — Voxel Infrastructure Cutaway

**Prompt:** `Voxel cutaway of {facility/network}, modular cubic machinery, clearly separated operational zones, soft neutral light, one highlighted route, no tiny labels.`  
**Palette:** Grey, navy, safety yellow, teal.  
**Best use:** Training and system overviews.  
**Aspect:** 16:9.  
**Avoid:** Toy-like decorative clutter.  
**Accessibility:** Highlight route with shape and contrast, not colour alone.  
**Code hint:** Three.js if interactive.

---

## 3.26 Low-Poly

### Recipe 051 — Low-Poly Terrain

**Prompt:** `Low-poly terrain model of {region}, faceted elevation planes, physically plausible ridges and drainage, orthographic aerial view, restrained earth palette, soft directional shadow.`  
**Palette:** Moss, slate, sandstone, deep water blue.  
**Best use:** Terrain explainers, covers.  
**Aspect:** 16:9.  
**Avoid:** Presenting generated elevation as survey data.  
**Accessibility:** Decorative version needs no embedded text.  
**Code hint:** WebGL with real DEM for factual use.

### Recipe 052 — Low-Poly Specimen

**Prompt:** `Low-poly sculptural rendering of {object/species}, recognisable silhouette, controlled facet sizes, matte materials, plain background, one directional light.`  
**Palette:** Object-derived muted colours.  
**Best use:** Hero illustration, educational iconography.  
**Aspect:** 1:1.  
**Avoid:** Random iridescence.  
**Accessibility:** Alt text if informative.  
**Code hint:** CSS cannot reproduce complex mesh; use 3D asset.

---

## 3.27 3D Clay

### Recipe 053 — Clay Device Illustration

**Prompt:** `Hand-modelled clay-style 3D illustration of {device/tool}, soft matte surfaces, fingerprints and tiny material irregularities, rounded but functional proportions, gentle studio light, neutral backdrop.`  
**Palette:** Warm off-white, charcoal, one muted brand accent.  
**Best use:** Friendly onboarding and explainer illustration.  
**Aspect:** 1:1.  
**Avoid:** Childish facial expressions on serious tools.  
**Accessibility:** Do not use clay visual as sole explanation.  
**Code hint:** Image/3D asset.

### Recipe 054 — Clay Process Objects

**Prompt:** `Small set of three clay objects representing {three real process stages}, consistent scale and material, each silhouette visibly distinct, arranged asymmetrically on neutral ground, no labels.`  
**Palette:** Three restrained semantic colours + cream.  
**Best use:** Process explainer.  
**Aspect:** 3:2.  
**Avoid:** Arbitrary metaphors that do not match process.  
**Accessibility:** Labels remain HTML.  
**Code hint:** Static render appropriate.

---

## 3.28 Soft 3D Render

### Recipe 055 — Soft 3D Product Object

**Prompt:** `Soft 3D render of {product object}, matte polymer and anodised metal materials, physically plausible geometry, large diffused studio source, subtle contact shadow, minimal neutral set.`  
**Palette:** Pearl, graphite, one brand accent.  
**Best use:** Product marketing.  
**Aspect:** 4:3.  
**Avoid:** Floating particles, excessive reflections, fake buttons.  
**Accessibility:** Text overlay only in quiet background.  
**Code hint:** Real product CAD/render preferable if available.

### Recipe 056 — Ecosystem Data Sculpture

**Prompt:** `Abstract soft-3D sculpture derived from {environmental concept}, layered organic volumes suggesting watershed/forest structure without pretending to be measured data, matte material, restrained shadows, clear focal form.`  
**Palette:** Moss, mineral blue, sand.  
**Best use:** Editorial environmental hero.  
**Aspect:** 16:9.  
**Avoid:** Fake data labels or chart axes.  
**Accessibility:** Treat as decorative metaphor.  
**Code hint:** WebGL possible but image is lighter.

---

## 3.29 Glass / Translucency

### Recipe 057 — Layered Glass Abstract

**Prompt:** `Restrained translucent glass composition, two to three overlapping planar forms, realistic refraction, substantial clear space, neutral background, subtle brand accent, physical rather than neon appearance.`  
**Palette:** Clear, smoke grey, muted teal.  
**Best use:** Technology/editorial hero.  
**Aspect:** 16:9.  
**Avoid:** Dense glass shards behind text.  
**Accessibility:** Never rely on variable transparent background for copy contrast.  
**Code hint:** CSS gradients, transparency, `backdrop-filter` for simple UI treatment.

### Recipe 058 — Glass Data Layers

**Prompt:** `Layered translucent sheets representing {conceptual data layers}, physically separated depth planes, subtle etched geometric marks without fake values, neutral light, crisp edges, understated scientific mood.`  
**Palette:** Clear, blue-grey, amber accent.  
**Best use:** Data-platform concepts.  
**Aspect:** 4:3.  
**Avoid:** Presenting decorative layers as actual data.  
**Accessibility:** Keep real legend/text separate.  
**Code hint:** CSS/SVG can provide accessible layered composition.

---

## 3.30 Neon / Cyber

### Recipe 059 — Restrained Network Operations

**Prompt:** `Night network-operations environment, mostly dark neutral surfaces, sparse cyan and amber operational light, real equipment geometry, one focal diagnostic display, documentary cyber-technical mood rather than gaming aesthetic.`  
**Palette:** Near-black, cyan, amber.  
**Best use:** Security/network editorial.  
**Aspect:** 16:9.  
**Avoid:** Purple-pink neon everywhere, hooded hacker clichés.  
**Accessibility:** Neon text often fails readability; use HTML with tested contrast.  
**Code hint:** CSS glow only for decorative accents.

### Recipe 060 — Cyber City Data Atmosphere

**Prompt:** `Dense night urban infrastructure viewed from elevation, sparse luminous transport/network traces, rain haze, subdued cinematic treatment, no holographic billboards, no fake text.`  
**Palette:** Navy-black, cool cyan, limited red.  
**Best use:** Smart-city editorial.  
**Aspect:** 21:9.  
**Avoid:** Blade-runner imitation as default aesthetic.  
**Accessibility:** Do not place small body text directly over luminous detail.  
**Code hint:** Image asset; CSS overlays can provide scrim.

---

## 3.31 HUD / Technical Overlay

### Recipe 061 — Survey HUD Overlay

**Prompt:** `Aerial survey image of {site} with restrained technical overlay: corner brackets, one target boundary, scale ticks without invented numbers, subtle crosshair geometry, sparse vector lines, professional field-instrument aesthetic.`  
**Palette:** Neutral imagery + white/cyan overlay.  
**Best use:** Drone, inspection, remote sensing editorial.  
**Aspect:** 16:9.  
**Avoid:** Dense sci-fi HUD clutter.  
**Accessibility:** Actual measurements MUST be real HTML/SVG data.  
**Code hint:** Overlay real imagery with SVG.

### Recipe 062 — Equipment Diagnostic Overlay

**Prompt:** `Close technical view of {equipment} with sparse diagnostic overlay showing conceptual regions, thin line annotations without labels, controlled cyan/amber markers, darkened documentary photograph.`  
**Palette:** Graphite, cyan, amber.  
**Best use:** Maintenance/engineering explainers.  
**Aspect:** 3:2.  
**Avoid:** Fake diagnostic readings.  
**Accessibility:** Actual status needs text equivalents.  
**Code hint:** SVG annotation layer over real photo.

---

## 3.32 Film Photography — Portra / CineStill

### Recipe 063 — Portra-Style Field Documentary

**Prompt:** `Natural-light field documentary photograph of {people/place}, Portra-like restrained colour response, warm skin tones, soft highlight roll-off, realistic grain, slightly muted greens, candid composition, no fashion posing.`  
**Palette:** Warm skin, subdued green, cream, soft cyan shadows.  
**Best use:** Human fieldwork, community stories.  
**Aspect:** 3:2.  
**Avoid:** Claiming generated people are real staff/community members.  
**Accessibility:** Real documentary photography SHOULD replace generation when authenticity matters.  
**Code hint:** Colour grade real photographs rather than generate.

### Recipe 064 — CineStill-Style Night Infrastructure

**Prompt:** `Night photograph of {infrastructure/city detail}, tungsten-heavy CineStill-like colour, controlled red halation around practical lights, visible film grain, deep blue-black shadows, documentary framing.`  
**Palette:** Tungsten orange, red halation, cyan-blue shadows.  
**Best use:** Night operations, urban stories.  
**Aspect:** 16:9.  
**Avoid:** Overblown neon and artificial cyberpunk signage.  
**Accessibility:** Use quiet dark region or opaque text panel.  
**Code hint:** Apply grade/halation to real photography when possible.

---

## 3.33 Polaroid

### Recipe 065 — Field Evidence Snapshot

**Prompt:** `Instant-film style snapshot of {non-sensitive field subject}, imperfect exposure, soft chemical colour shift, white instant-film border, handwritten area left blank, authentic casual framing.`  
**Palette:** Faded warm neutrals.  
**Best use:** Editorial diary, field-journal motif.  
**Aspect:** 1:1.  
**Avoid:** Using generated snapshot as evidentiary field record.  
**Accessibility:** Caption provenance clearly.  
**Code hint:** CSS border/frame can style real photos.

### Recipe 066 — Archival Instant Snapshot

**Prompt:** `Aged instant-film photograph of {historical-type subject}, gentle colour fade, minor emulsion imperfections, off-centre composition, blank white border, no fake handwritten date.`  
**Palette:** Faded cream, cyan shadow, warm brown.  
**Best use:** Memory/heritage storytelling.  
**Aspect:** 1:1.  
**Avoid:** Passing synthetic archival imagery as authentic historical evidence.  
**Accessibility:** Identify illustrative status.  
**Code hint:** CSS filter/frame for authentic archive photos.

---

## 3.34 Long-Exposure

### Recipe 067 — Transport Flow

**Prompt:** `Long-exposure night photograph of {transport corridor}, fixed sharp architecture, restrained continuous light trails showing movement, realistic traffic geometry, deep neutral sky, no exaggerated rainbow trails.`  
**Palette:** Charcoal, warm white/red lights, cool blue shadows.  
**Best use:** Mobility, infrastructure stories.  
**Aspect:** 16:9.  
**Avoid:** Implying trail density is quantitative data.  
**Accessibility:** Use separate text zone.  
**Code hint:** Real photography preferable.

### Recipe 068 — River Motion Study

**Prompt:** `Long-exposure landscape of {river/waterfall/coast}, crisp static rocks and vegetation, silky but physically plausible water motion, muted dawn/dusk light, natural colour.`  
**Palette:** Slate blue, moss, stone grey.  
**Best use:** Water/environment editorial.  
**Aspect:** 3:2.  
**Avoid:** Unreal glowing water.  
**Accessibility:** Informational hydrological data remains separate.  
**Code hint:** Image asset.

---

## 3.35 Macro

### Recipe 069 — Leaf Pathology Macro

**Prompt:** `Scientific macro photograph of {leaf symptom/specimen}, extremely detailed surface texture, controlled diffused light, shallow but sufficient depth of field, neutral background, no water-droplet decoration unless physically relevant.`  
**Palette:** Specimen-natural.  
**Best use:** Plant health education.  
**Aspect:** 4:3.  
**Avoid:** Generated diagnostic image presented as real specimen.  
**Accessibility:** Accompany with symptom description.  
**Code hint:** Real macro photography required for diagnosis.

### Recipe 070 — Material Surface Macro

**Prompt:** `Extreme macro study of {wood/mineral/metal/paper}, tactile microtexture, grazing side light, controlled depth of field, abstract composition grounded in real material character.`  
**Palette:** Material-derived.  
**Best use:** Background, material storytelling.  
**Aspect:** 16:9.  
**Avoid:** Excessive sharpening or impossible microstructure.  
**Accessibility:** Busy textures need opaque text panel.  
**Code hint:** Image asset.

---

## 3.36 Drone / Aerial

### Recipe 071 — Forest Canopy Aerial

**Prompt:** `Nadir drone-style aerial photograph of tropical forest canopy with {river/trail/clearing}, natural scale, realistic canopy variation, no dramatic artificial colour grading, clear spatial composition.`  
**Palette:** Natural forest greens, earth brown, water dark blue.  
**Best use:** Forestry/environment storytelling.  
**Aspect:** 16:9.  
**Avoid:** Representing generated imagery as actual monitoring evidence.  
**Accessibility:** Provide descriptive alt if informational.  
**Code hint:** Real drone imagery SHOULD be used for actual locations.

### Recipe 072 — Industrial Site Aerial

**Prompt:** `Oblique drone-style aerial view of {industrial facility}, legible road and building organisation, realistic operational scale, neutral midday light, disciplined composition.`  
**Palette:** Concrete grey, steel, muted earth, safety accents.  
**Best use:** Infrastructure reports.  
**Aspect:** 3:2.  
**Avoid:** Inventing site layouts for real facilities.  
**Accessibility:** Do not use as safety or planning evidence.  
**Code hint:** Real aerial imagery preferred.

---

## 3.37 Night-Sky Astro

### Recipe 073 — Observatory Landscape

**Prompt:** `Astrophotography-style night landscape with {observatory/mountain}, realistic star density, faint Milky Way structure, low-light foreground detail, restrained processing, scientifically plausible sky orientation not claimed.`  
**Palette:** Deep navy, cool violet, warm observatory lights.  
**Best use:** Science/editorial hero.  
**Aspect:** 16:9.  
**Avoid:** Oversaturated galaxy clouds and impossible giant planets.  
**Accessibility:** Keep text over opaque/quiet region.  
**Code hint:** Image asset.

### Recipe 074 — Dark-Sky Forest

**Prompt:** `Night-sky photograph above {forest/wetland}, clear star field, subtle airglow, dark natural silhouettes, no artificial fantasy aurora unless geographically plausible.`  
**Palette:** Midnight blue, near-black, faint cyan.  
**Best use:** Conservation/dark-sky campaigns.  
**Aspect:** 21:9.  
**Avoid:** Unreal celestial scale.  
**Accessibility:** Dark backgrounds need appropriately contrasted text.  
**Code hint:** Image asset.

---

## 3.38 Blueprint Grid

### Recipe 075 — Technical Blueprint Background

**Prompt:** `Clean technical blueprint background, fine orthogonal grid, sparse construction circles and dimension-line fragments without numbers, wide clear area for content, restrained engineering-paper aesthetic.`  
**Palette:** Blueprint blue `#114B74`, line cyan `#C8E6EC`.  
**Best use:** Engineering presentation background.  
**Aspect:** 16:9.  
**Avoid:** Dense pseudo-diagrams behind body copy.  
**Accessibility:** Keep copy on solid or low-detail region.  
**Code hint:** Prefer CSS repeating-linear-gradients and SVG details.

### Recipe 076 — White Architectural Grid

**Prompt:** `Minimal architectural drafting grid on warm white paper, fine grey modular lines, sparse red registration/reference marks, generous whitespace, no fake dimensions.`  
**Palette:** White `#F5F3EC`, grey `#C7C7C0`, red `#C2443B`.  
**Best use:** Architecture reports and decks.  
**Aspect:** 4:3.  
**Avoid:** Making background resemble an actual approved drawing.  
**Accessibility:** Decorative grid SHOULD remain faint.  
**Code hint:** Entirely CSS/SVG.

---

## 3.39 Terminal / Monospace UI

### Recipe 077 — System Status Terminal

**Prompt:** `Monochrome terminal-inspired technical screen for {system}, dense but structured rows, authentic command-line spacing, restrained status blocks, no fabricated credentials, secrets or real commands, typography zones represented without requiring legible generated text.`  
**Palette:** Near-black `#0D1110`, phosphor green `#9ACD8B`.  
**Best use:** Developer/editorial motifs.  
**Aspect:** 16:9.  
**Avoid:** Fake hacking content.  
**Accessibility:** Real implementation MUST use real text, not image text.  
**Code hint:** HTML `<pre>` + accessible text is strongly preferred.

### Recipe 078 — Archival Amber Terminal

**Prompt:** `Late-1970s amber terminal visual, dark CRT, subtle scanlines and phosphor bloom, orderly monospaced grid, sparse interface structure, no fake passwords or system alerts.`  
**Palette:** Black, amber `#E4A742`.  
**Best use:** Retro technical editorial.  
**Aspect:** 4:3.  
**Avoid:** Excessive flicker.  
**Accessibility:** Animated scanlines/flicker SHOULD be static under reduced motion.  
**Code hint:** HTML/CSS terminal implementation.

---

## 3.40 ASCII Art

### Recipe 079 — ASCII Terrain

**Prompt:** `Monospaced ASCII-art landscape of {terrain}, density and characters used to suggest elevation and vegetation, crisp fixed-width grid, monochrome terminal aesthetic, composition readable at medium scale.`  
**Palette:** Charcoal on cream or green on black.  
**Best use:** Developer, experimental editorial.  
**Aspect:** 16:9.  
**Avoid:** Attempting complex factual map labels.  
**Accessibility:** Provide a textual equivalent; decorative ASCII SHOULD be hidden from screen readers.  
**Code hint:** Use `<pre aria-hidden="true">` for decorative ASCII.

### Recipe 080 — ASCII System Diagram

**Prompt:** `Abstract ASCII-style systems diagram using boxes, connectors and repeated characters, deliberate hierarchy, one highlighted region, no generated pseudo-code or secrets.`  
**Palette:** Black/white + one accent.  
**Best use:** Developer reports, technical branding.  
**Aspect:** 3:2.  
**Avoid:** Treating image as actual architecture documentation.  
**Accessibility:** Real diagrams need structured accessible explanation.  
**Code hint:** Actual text/SVG preferable.

---

## 3.41 Art Deco

### Recipe 081 — Deco Annual Report Cover

**Prompt:** `Restrained Art Deco report cover for {organisation/topic}, symmetrical geometric border, stepped forms, fine metallic-line effect, strong central negative space, sophisticated rather than theatrical.`  
**Palette:** Deep navy, warm ivory, muted brass.  
**Best use:** Anniversary reports, formal events.  
**Aspect:** A4/Letter portrait.  
**Avoid:** Fake gold foil gradients and excessive ornament.  
**Accessibility:** Keep title as actual typeset text.  
**Code hint:** SVG borders and CSS colour are preferable.

### Recipe 082 — Deco Event Graphic

**Prompt:** `Art Deco architectural composition for {event}, tall geometric framing, sunburst used sparingly, strong vertical rhythm, simplified metallic accents on dark ground, blank centre for title.`  
**Palette:** Black, cream, emerald, brass.  
**Best use:** Gala/cultural event collateral.  
**Aspect:** 2:3.  
**Avoid:** Tiny ornamental patterns behind text.  
**Accessibility:** Maintain simple title area.  
**Code hint:** SVG pattern works well.

---

## 3.42 Bauhaus

### Recipe 083 — Bauhaus Geometric Poster

**Prompt:** `Bauhaus-inspired poster for {topic}, primary geometric forms arranged asymmetrically, disciplined functional composition, circles/rectangles/lines, no decorative pseudo-type, visible white space.`  
**Palette:** Off-white, black, red, blue, yellow.  
**Best use:** Cultural events, design-led campaigns.  
**Aspect:** 2:3.  
**Avoid:** Random geometry without hierarchy.  
**Accessibility:** Keep actual typography in HTML/vector.  
**Code hint:** Excellent CSS/SVG candidate.

### Recipe 084 — Bauhaus Data Campaign

**Prompt:** `Bauhaus-inspired abstract visual based on {real theme}, one dominant circle and supporting bars, geometric balance with purposeful asymmetry, restrained three-colour system, no fake chart scales.`  
**Palette:** Cream, cobalt, rust, black.  
**Best use:** Research communications.  
**Aspect:** 1:1.  
**Avoid:** Implying shapes encode values unless actually data-driven.  
**Accessibility:** Text and quantitative meaning remain separate.  
**Code hint:** CSS/SVG.

---

## 3.43 Constructivist

### Recipe 085 — Public Information Constructivist

**Prompt:** `Constructivist-inspired public-information composition, bold diagonal structure, limited red-black-cream palette, documentary photographic cut-out of {subject}, strong directional energy, no propaganda slogans rendered in-image.`  
**Palette:** Red `#B8322A`, black, warm cream.  
**Best use:** Historical/editorial campaign.  
**Aspect:** 2:3.  
**Avoid:** Uncritical use of political symbols or misleading historical framing.  
**Accessibility:** Typography remains real text.  
**Code hint:** CSS transforms and clipped images.

### Recipe 086 — Industrial Constructivist

**Prompt:** `Industrial constructivist composition featuring {infrastructure}, hard geometric diagonals, simplified machinery silhouette, bold crop, flat ink treatment, restrained historical-print texture.`  
**Palette:** Black, red oxide, beige.  
**Best use:** Industrial heritage.  
**Aspect:** 3:2.  
**Avoid:** Fake Cyrillic or meaningless pseudo-language.  
**Accessibility:** Use meaningful real labels outside image.  
**Code hint:** SVG/collage implementation.

---

## 3.44 Art Nouveau

### Recipe 087 — Botanical Nouveau Poster

**Prompt:** `Art Nouveau botanical border built from {native plant species}, flowing stems and controlled ornamental curves, restrained flat colour, clear central field for typography, elegant but not overfilled.`  
**Palette:** Sage, dark green, cream, muted gold.  
**Best use:** Botanical exhibitions, environmental heritage.  
**Aspect:** 2:3.  
**Avoid:** Invented species features and excessive filigree.  
**Accessibility:** Keep central copy zone uncluttered.  
**Code hint:** SVG border reusable across formats.

### Recipe 088 — Nouveau Section Divider

**Prompt:** `Horizontal Art Nouveau divider based on {plant/water motif}, symmetrical-but-organic linework, subtle hand-drawn irregularity, minimal ornament concentrated at edges, large open centre.`  
**Palette:** Ink green, ivory, muted ochre.  
**Best use:** Report chapter divider.  
**Aspect:** 21:9.  
**Avoid:** Ornament behind body text.  
**Accessibility:** Decorative image can use empty alt.  
**Code hint:** SVG strongly preferred.

---

## 3.45 Y2K Chrome

### Recipe 089 — Chrome Orb

**Prompt:** `Early-2000s Y2K chrome orb sculpture, highly reflective liquid-metal surface, simple studio environment, controlled cyan reflection, one object only, crisp nostalgic technology aesthetic.`  
**Palette:** Chrome silver, icy cyan, white.  
**Best use:** Cultural/music/experimental technology artwork.  
**Aspect:** 1:1.  
**Avoid:** Generic purple gradient SaaS styling.  
**Accessibility:** Reflection-heavy surface unsuitable behind small text.  
**Code hint:** WebGL possible for interactive object.

### Recipe 090 — Y2K Interface Sculpture

**Prompt:** `Y2K-inspired abstract interface sculpture, chrome panels, translucent aqua elements, compact geometric composition, polished late-1990s/early-2000s optimism, no generated UI text.`  
**Palette:** Silver, aqua, white, small lime accent.  
**Best use:** Culture/fashion/editorial.  
**Aspect:** 4:3.  
**Avoid:** Fake operating-system controls.  
**Accessibility:** Treat as illustration, not interface.  
**Code hint:** Image/3D render.

---

## 3.46 Retro-Futurism

### Recipe 091 — Civic Retro-Future

**Prompt:** `Retro-futurist illustration of {public infrastructure}, optimistic mid-century vision of technology, clean geometric architecture, realistic human scale, restrained analogue print grain, clear sky and strong silhouette.`  
**Palette:** Cream, teal, orange-red, navy.  
**Best use:** Future-of-city editorial.  
**Aspect:** 16:9.  
**Avoid:** Generic flying cars unless relevant.  
**Accessibility:** Decorative metaphor; not planning evidence.  
**Code hint:** Image asset.

### Recipe 092 — Satellite Programme Retro-Future

**Prompt:** `1960s-inspired retro-futurist illustration of Earth-observation satellite programme, technically recognisable satellite silhouette, bold orbital arc, simplified Earth limb, screen-print-like colour.`  
**Palette:** Navy, cream, burnt orange, pale cyan.  
**Best use:** Space/remote-sensing history.  
**Aspect:** 3:2.  
**Avoid:** Fake mission patches or agency logos.  
**Accessibility:** Explain actual programme facts in text.  
**Code hint:** SVG illustration possible.

---

## 3.47 1970s Print

### Recipe 093 — Environmental Report 1970s

**Prompt:** `1970s environmental-report illustration of {ecosystem}, flat earthy inks, simplified landscape bands, coarse print texture, warm uncoated paper, practical institutional tone.`  
**Palette:** Avocado, burnt orange, brown, cream.  
**Best use:** Heritage environmental editorial.  
**Aspect:** 4:5.  
**Avoid:** Orange/brown palette on safety/status data.  
**Accessibility:** Keep modern text contrast despite retro palette.  
**Code hint:** CSS/SVG for geometric version.

### Recipe 094 — 1970s Field Guide Cover

**Prompt:** `1970s field-guide cover featuring {species/landscape}, bold simplified silhouette, two to four flat colours, understated retro typography area left blank, visible print grain.`  
**Palette:** Mustard, olive, rust, black, cream.  
**Best use:** Educational publication.  
**Aspect:** 2:3.  
**Avoid:** Faux-aged damage that harms readability.  
**Accessibility:** Real title remains typeset.  
**Code hint:** SVG + grain overlay.

---

## 3.48 VHS Glitch

### Recipe 095 — Archival Broadcast Glitch

**Prompt:** `1980s/1990s analogue video frame of {non-critical subject}, restrained VHS tracking error, horizontal chroma displacement, scanline noise, timestamp area left blank, recognisable underlying image.`  
**Palette:** Source image + RGB chroma fringes.  
**Best use:** Media-history/cultural editorial.  
**Aspect:** 4:3.  
**Avoid:** Use on critical information or seizure-inducing rapid animation.  
**Accessibility:** Static treatment preferred; animated glitch MUST respect motion sensitivity.  
**Code hint:** CSS filters/canvas effects.

### Recipe 096 — VHS Landscape Interference

**Prompt:** `Analogue VHS landscape of {city/forest/coast}, subtle tape noise and chroma bleed, one tracking disturbance, muted source colours, nostalgic but still legible.`  
**Palette:** Faded blue/green, magenta chroma artefact.  
**Best use:** Music/cultural visuals.  
**Aspect:** 16:9.  
**Avoid:** Full-frame unreadable corruption.  
**Accessibility:** Never glitch text.  
**Code hint:** CSS/canvas overlay possible.

---

## 3.49 Datamosh

### Recipe 097 — Datamosh Transition Still

**Prompt:** `Single-frame datamosh aesthetic transitioning between {scene A} and {scene B}, directional macroblock smear, recognisable residual forms, limited colour corruption, experimental digital-art quality.`  
**Palette:** Source-dependent.  
**Best use:** Cultural/editorial artwork.  
**Aspect:** 16:9.  
**Avoid:** Safety-critical interface or factual imagery.  
**Accessibility:** Animated datamosh can be disorienting; provide static alternative.  
**Code hint:** Best produced from actual video processing.

### Recipe 098 — Controlled Datamosh Portrait

**Prompt:** `Portrait silhouette partially disrupted by controlled codec macroblocks and motion-vector smearing, one side remains clear and recognisable, restrained digital artefacts, dark neutral background.`  
**Palette:** Natural portrait + selective RGB corruption.  
**Best use:** Experimental arts.  
**Aspect:** 4:5.  
**Avoid:** Misrepresenting a real person's appearance without consent.  
**Accessibility:** Not suitable behind text.  
**Code hint:** Video/canvas effect for motion version.

---

## 3.50 Noise / Grain Texture

### Recipe 099 — Fine Editorial Grain

**Prompt:** `Uniform fine photographic grain texture, subtle tonal variation, no visible objects, seamless low-contrast surface, analogue editorial character.`  
**Palette:** Warm grey or theme-derived.  
**Best use:** Background texture.  
**Aspect:** Tileable 1:1.  
**Avoid:** Strong grain that harms text legibility.  
**Accessibility:** Grain under text MUST remain sufficiently subtle.  
**Code hint:** Small noise PNG/SVG filter is preferable to full raster background.

### Recipe 100 — Coarse Monochrome Noise

**Prompt:** `Coarse monochrome printed-noise texture, irregular ink speckling, sparse density, seamless tile, no scratches or distressed edges.`  
**Palette:** Transparent/black on paper.  
**Best use:** Print simulation.  
**Aspect:** 1:1 tile.  
**Avoid:** Noise on form controls or body copy.  
**Accessibility:** Keep texture opacity low.  
**Code hint:** CSS mask or SVG turbulence filter.

---

## 3.51 Paper Texture

### Recipe 101 — Archival Rag Paper

**Prompt:** `High-resolution neutral archival rag-paper texture, subtle cotton fibres, slight natural tonal variation, flat even lighting, seamless appearance, no stains or writing.`  
**Palette:** Warm ivory.  
**Best use:** Editorial/report texture.  
**Aspect:** 1:1 tile.  
**Avoid:** Fake ageing, coffee stains, torn edges unless historically justified.  
**Accessibility:** Low-contrast texture only beneath text.  
**Code hint:** Tiny repeating image or CSS noise overlay.

### Recipe 102 — Recycled Fibre Paper

**Prompt:** `Natural recycled-paper texture, visible but subtle mixed fibres, matte surface, neutral even lighting, understated sustainability-document aesthetic.`  
**Palette:** Recycled grey-beige.  
**Best use:** Environmental publications.  
**Aspect:** 1:1.  
**Avoid:** Using texture as unsupported sustainability claim.  
**Accessibility:** Maintain clear text contrast.  
**Code hint:** Lightweight repeating texture.

---

## 3.52 Grunge

### Recipe 103 — Industrial Grunge Poster

**Prompt:** `Controlled industrial grunge texture around {industrial subject}, worn ink, scratches concentrated at outer edges, strong central subject preserved, limited palette, utilitarian poster feel.`  
**Palette:** Charcoal, rust, cream.  
**Best use:** Music, heritage, industrial culture.  
**Aspect:** 2:3.  
**Avoid:** Distress over essential labels or faces.  
**Accessibility:** Grunge MUST NOT degrade readable copy.  
**Code hint:** CSS texture overlay with mask.

### Recipe 104 — Field Notebook Grunge

**Prompt:** `Weathered field-notebook visual with mud smudges, graphite marks and worn paper edge, clean central content region, authentic outdoor-research feel, no fake scientific notes.`  
**Palette:** Kraft, graphite, muted earth.  
**Best use:** Fieldwork editorial.  
**Aspect:** 4:3.  
**Avoid:** Invented handwritten observations.  
**Accessibility:** Actual notes stay real text.  
**Code hint:** Border/texture overlays in CSS.

---

## 3.53 Frosted Glass

### Recipe 105 — Restrained Frosted Panel Backdrop

**Prompt:** `Soft abstract background designed for frosted-glass UI, large low-frequency colour fields, no sharp detail behind central panel zone, cool neutral atmosphere, one muted accent glow.`  
**Palette:** Grey-blue, white, muted teal.  
**Best use:** Controlled interface demonstrations.  
**Aspect:** 16:9.  
**Avoid:** High-frequency colour directly beneath text.  
**Accessibility:** Frosting MUST NOT be relied on for contrast.  
**Code hint:** Use real CSS `backdrop-filter` plus opaque fallback.

### Recipe 106 — Weather Frosted Layer

**Prompt:** `Atmospheric weather image of {mist/rain/cloud}, designed as soft low-detail field behind translucent panel, broad muted tonal variation, no bright hotspots behind controls.`  
**Palette:** Cloud white, steel blue, fog grey.  
**Best use:** Weather/climate interface imagery.  
**Aspect:** 16:9.  
**Avoid:** Thin transparent panel over busy photograph.  
**Accessibility:** Test text contrast under all responsive crops.  
**Code hint:** CSS translucent surface over real photo.

---

## 3.54 Chrome / Liquid Metal

### Recipe 107 — Liquid Metal Sculpture

**Prompt:** `Single liquid-metal sculptural form inspired by {domain object}, polished chrome but physically coherent reflections, isolated on matte neutral ground, elegant asymmetric geometry, controlled studio light.`  
**Palette:** Chrome, graphite, subtle brand-colour reflection.  
**Best use:** Experimental campaign/brand artwork.  
**Aspect:** 1:1.  
**Avoid:** Chrome applied to every UI element.  
**Accessibility:** Not appropriate beneath small text.  
**Code hint:** WebGL shader possible.

### Recipe 108 — Chrome Ribbon

**Prompt:** `Continuous reflective chrome ribbon forming an abstract {wave/loop/topographic path}, simple composition, realistic metal reflections, generous negative space, no logo imitation.`  
**Palette:** Silver, white, single coloured environment reflection.  
**Best use:** Hero artwork.  
**Aspect:** 21:9.  
**Avoid:** Accidental letterform or trademark resemblance.  
**Accessibility:** Use negative space for HTML text.  
**Code hint:** 3D render/WebGL.

---

## 3.55 Gradient Mesh

### Recipe 109 — Restrained Corporate Mesh

**Prompt:** `Subtle gradient-mesh background using four broad low-frequency colour fields, no visible blobs, smooth restrained transitions, substantial neutral breathing room, sophisticated institutional tone.`  
**Palette:** Slate blue, mineral teal, warm grey, off-white.  
**Best use:** Presentation/report cover background.  
**Aspect:** 16:9.  
**Avoid:** Default purple-pink AI/SaaS gradient.  
**Accessibility:** Put copy over predictable solid-ish region.  
**Code hint:** CSS radial gradients can replace image entirely.

### Recipe 110 — Atmospheric Environmental Mesh

**Prompt:** `Soft gradient mesh derived from forest canopy, water and mineral earth colours, broad organic transitions, no literal map or data implication, quiet centre for content.`  
**Palette:** Forest `#315A48`, water `#3C7180`, sand `#C8B58C`, fog `#E3E5DC`.  
**Best use:** Environmental digital backgrounds.  
**Aspect:** 21:9.  
**Avoid:** Over-saturated eco-green cliché.  
**Accessibility:** Real text contrast MUST be verified.  
**Code hint:** Pure CSS gradient mesh.

---

## 3.56 Blob Morph

### Recipe 111 — Static Biomorphic Form

**Prompt:** `One restrained biomorphic form inspired by {natural process}, simple irregular silhouette, matte flat colour, asymmetric placement, generous negative space, no gradient, no smiley character treatment.`  
**Palette:** Neutral ground + one signature accent.  
**Best use:** Decorative editorial motif.  
**Aspect:** 4:3.  
**Avoid:** Multiple random blobs filling unused space.  
**Accessibility:** Decorative only; empty alt.  
**Code hint:** CSS `border-radius`/SVG path.

### Recipe 112 — Controlled Morph Sequence

**Prompt:** `Three-frame conceptual sequence of one biomorphic shape evolving from {state A} to {state B}, smooth topology, restrained flat palette, no text, no fake data meaning.`  
**Palette:** One neutral + two related accents.  
**Best use:** Transition concept/storyboard.  
**Aspect:** 16:9.  
**Avoid:** Continuous autoplay solely for decoration.  
**Accessibility:** Motion implementation MUST respect reduced motion.  
**Code hint:** SVG path interpolation or CSS animation with static fallback.

---

## 3.57 Generative / Algorithmic

### Recipe 113 — Flow-Field Pattern

**Prompt:** `Generative flow-field composition inspired by {wind/water/migration concept}, thousands of fine coherent trajectories, one dominant directional structure, controlled density, limited monochrome palette, no implication of real measured vectors.`  
**Palette:** Warm white, charcoal, one teal accent.  
**Best use:** Scientific/editorial background.  
**Aspect:** 16:9.  
**Avoid:** Presenting decorative vectors as observed data.  
**Accessibility:** High line density requires opaque text region.  
**Code hint:** Canvas/p5.js/WebGL is preferable and resolution-independent.

### Recipe 114 — Voronoi Ecology Pattern

**Prompt:** `Generative Voronoi-inspired cellular pattern derived from {ecological concept}, irregular organic cells, controlled scale variation, subtle edge hierarchy, sparse highlighted cluster, flat restrained palette, no fake map boundaries.`  
**Palette:** Bone, moss, slate, amber highlight.  
**Best use:** Ecology/research visual identity.  
**Aspect:** 1:1 or 16:9.  
**Avoid:** Confusing decorative cells with administrative or ecological boundaries.  
**Accessibility:** Colour highlight SHOULD also use outline/texture when semantic.  
**Code hint:** Generate directly with SVG/Canvas; use real data if cells carry meaning.

---

# 4. Anti-patterns

The following uses are non-conformant.

## 4.1 Style-first prompting

Do NOT begin with:

```text
Make this Art Deco.
Make this cyberpunk.
Make this a satellite map.
```

before the communication objective is known.

The subject and information purpose MUST precede visual treatment.

---

## 4.2 Generated typography for critical copy

Do NOT depend on an image model to render:

- pricing;
- headings;
- citations;
- statistics;
- map labels;
- instructions;
- controls.

Real text remains preferable for accessibility, responsiveness, translation, and accuracy.  
https://www.w3.org/TR/WCAG22/#images-of-text

---

## 4.3 Generated evidence

Do NOT use synthetic:

- maps;
- satellite scenes;
- aerial images;
- scientific plates;
- field photographs;
- microscopy

as if they were observational evidence.

---

## 4.4 Decorative data

Do NOT ask for:

```text
futuristic chart
cool GIS map
data-rich dashboard
scientific graph
```

and then present generated output as analytical information.

Actual data visualizations MUST be generated from actual data.

Carbon's visualisation system explicitly differentiates palette and chart treatment according to underlying data relationships.  
https://preview.carbondesignsystem.com/building-blocks/data-visualization/color-palettes  
https://preview.carbondesignsystem.com/building-blocks/data-visualization/spatial-charts

---

## 4.5 Motion by default

Styles such as:

- VHS glitch;
- datamosh;
- blob morph;
- flow field;
- neon;
- grain

MUST NOT automatically become continuous animation.

Static versions SHOULD normally be the default.

---

## 4.6 Accessibility by scrim afterthought

A visually unsuitable background MUST NOT be "fixed" solely by adding an increasingly dark translucent overlay.

If the image remains incompatible with content readability, choose:

- another crop;
- another image;
- a separate text panel;
- a simpler background.

---

## 4.7 Style stacking

Avoid prompts such as:

```text
Swiss + glassmorphism + brutalism + neon +
risograph + Art Deco + film grain + cyberpunk
```

unless a deliberate art direction requires a controlled hybrid.

A production recipe SHOULD generally have:

```text
1 primary style
+
1 material/process modifier
+
1 lighting/texture modifier
```

---

## 4.8 Brand-by-style substitution

An organisation does not obtain a visual identity merely by choosing:

- duotone;
- grain;
- glass;
- Bauhaus;
- Y2K;
- gradient mesh.

Brand identity MUST still be encoded through:

- type;
- colour;
- composition;
- imagery choice;
- subject matter;
- tone;
- recurring motifs.

---

## 4.9 Generic generated people

Generated faces SHOULD NOT replace authentic:

- employees;
- researchers;
- officials;
- patients;
- customers;
- residents;
- field workers

when the visual implies that the depicted person is real.

NN/g's imagery guidance specifically prioritises information-carrying, contextually meaningful imagery over generic filler.  
https://www.nngroup.com/articles/imagery-in-visual-design/

---

# 5. Checklist

## Purpose

- [ ] Does the image have a clear communication role?
- [ ] Is this image more useful than an ordinary photograph, diagram, chart, or CSS treatment?
- [ ] Is the selected family appropriate to the domain?

## Prompt

- [ ] Subject is explicit.
- [ ] Composition is explicit.
- [ ] Material/process is explicit.
- [ ] Palette is explicit.
- [ ] Avoid constraints are explicit.
- [ ] No unsupported claims are requested.

## Content

- [ ] Critical text remains real HTML/SVG.
- [ ] Generated numbers are not being presented as data.
- [ ] Generated labels are not being treated as authoritative.
- [ ] Generated people are not represented as real people.
- [ ] Generated maps/scientific imagery are identified as illustrative where necessary.

## Accessibility

- [ ] Text contrast has been tested against actual rendered crop.
- [ ] Information is not encoded through colour alone.
- [ ] Busy imagery does not sit directly behind body text.
- [ ] Informational imagery has meaningful alternative text.
- [ ] Decorative imagery is correctly ignored by assistive technology.
- [ ] Animated implementations respect reduced motion.

## Data / Geospatial

- [ ] Analytical imagery uses real data.
- [ ] Sequential/diverging/categorical palettes match data semantics.
- [ ] Map layers are distinguishable.
- [ ] Missing/no-data state is explicit.
- [ ] Generated imagery is not used as field evidence.

## Code-vs-image

- [ ] CSS/SVG was considered for simple geometry/texture.
- [ ] Raster generation is justified by material or photographic complexity.
- [ ] Responsive crops are defined.
- [ ] Theme adaptation is defined if required.
- [ ] Image weight/performance has been reviewed.

## Anti-slop

- [ ] The recipe is not simply a fashionable default.
- [ ] The visual treatment has domain rationale.
- [ ] The result does not rely on purple gradients or glass by reflex.
- [ ] Decorative imagery adds actual value.
- [ ] The visual could not be transplanted unchanged into an unrelated product without obvious mismatch.

---

# 6. Canonical Summary

The Visual Style Recipe Library follows this hierarchy:

```text
communication need
↓
real subject / content / data
↓
appropriate medium
↓
style family
↓
palette
↓
composition
↓
prompt
↓
generation
↓
human review
↓
accessible implementation
```

The governing rules are:

```text
Choose the message before the style.

Use generated imagery for illustration,
not fabricated evidence.

Keep critical typography in HTML/SVG.

Use real data for charts and maps.

Treat palettes semantically when data is involved.

Reserve animation for meaningful motion.

Prefer CSS/SVG when the style is fundamentally geometric.

Use imagery that carries information.

Every recipe needs an explicit "avoid" instruction.

Do not stack styles simply because a model can.

A generated image is a visual asset,
not a replacement for design judgment.
```

A Gold Standard recipe MUST make it possible to answer:

```text
Why this style?
Why this palette?
Why this composition?
Why an image rather than code?
What information does it carry?
How will it remain accessible?
What must the generator explicitly avoid?
```

If those questions cannot be answered, the image SHOULD NOT enter the production system.

---

# 7. Sources

1. **W3C — Web Content Accessibility Guidelines (WCAG) 2.2**  
   https://www.w3.org/TR/WCAG22/

2. **Nielsen Norman Group — Using Imagery in Visual Design**  
   https://www.nngroup.com/articles/imagery-in-visual-design/

3. **Material Design 3 — Applying Transitions**  
   https://m3.material.io/styles/motion/transitions/applying-transitions

4. **IBM Carbon Design System — Data Visualization Color Palettes**  
   https://preview.carbondesignsystem.com/building-blocks/data-visualization/color-palettes

5. **IBM Carbon Design System — Spatial Charts / Geospatial Visualization**  
   https://preview.carbondesignsystem.com/building-blocks/data-visualization/spatial-charts

The library contains **114 recipes across all 57 requested families**, with two independently usable directions per family.
