---
id: "image-prompt-engineering"
title: "Image Prompt Engineering"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "image", "prompt", "engineering"]
applies_to: ["ai"]
related: ["prompt-engineering", "style-catalogue"]
legacy_number: 104
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 65597
provenance: baseline

---

Research is complete using Firecrawl, with current primary documentation from OpenAI, Midjourney, Black Forest Labs, Hugging Face Diffusers, Stability AI, W3C/WAI, and web.dev. The specification explicitly flags model/version-dependent syntax rather than treating prompt conventions as universal.

# Image Prompt Engineering — Gold Standard 2026

**Status:** Canonical production standard  
**Scope:** AI-generated hero images, illustrations, textures, icon concepts, product mockups, OG/social images, empty-state art, decorative imagery  
**Baseline:** Production web applications using the Design Tokens, Accessibility, Component and Pattern standards; shadcn/ui is the component baseline  
**Conformance language:** **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, **MAY**

---

# 1. Purpose

This standard defines how text-to-image and image-editing models are used to produce **repeatable, on-brand, production-ready visual assets** rather than one-off generated images.

The image-generation workflow MUST be treated as a production pipeline with:

```text
brief
→ prompt specification
→ model/version selection
→ references
→ generation
→ selection
→ correction
→ deterministic post-processing
→ optimisation
→ accessibility
→ legal/provenance review
→ versioned source record
```

A generated image is not production-ready merely because it looks plausible.

The output MUST satisfy the same Design Tokens, Accessibility, Security, Component, Brand, and Content standards as manually produced artwork.

Current image systems differ materially in prompting interfaces. OpenAI's GPT Image guidance uses detailed natural-language or structured specifications; Midjourney uses descriptive prompts plus explicit suffix parameters; FLUX.2 has its own prompting conventions and explicitly does not support negative prompts; Stable Diffusion-class pipelines expose lower-level controls such as guidance scale, scheduler, inference steps, negative prompts, adapters, and ControlNet. (https://developers.openai.com/api/docs/guides/image-prompting) (https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List) (https://docs.bfl.ai/guides/prompting_guide_flux2) (https://huggingface.co/docs/diffusers/api/pipelines/stable_diffusion/img2img)

Prompt syntax MUST therefore be separated into:

```text
portable creative specification
+
model-specific adapter/configuration
```

Production prompts MUST NOT depend on undocumented “magic words” or a parameter copied from another model family.

---

# 2. Rules — Prompt Anatomy

## 2.1 Canonical anatomy

A production prompt SHOULD contain the following concepts when relevant:

1. **Deliverable / purpose**
2. **Subject**
3. **Action or state**
4. **Environment/context**
5. **Medium**
6. **Visual style**
7. **Brand palette**
8. **Lighting**
9. **Composition**
10. **Camera/lens or perspective**
11. **Surface/material detail**
12. **Output/aspect-ratio constraints**
13. **Preservation constraints**
14. **Exclusions**
15. **Model-specific parameters**

OpenAI's current GPT Image guidance recommends beginning with the image required, then describing subject, composition, style and constraints, and explicitly naming visible properties such as materials, lighting and colours. It recommends structured sections for complex requirements. (https://developers.openai.com/api/docs/guides/image-prompting)

FLUX.2's current guide similarly describes a prompt structure around subject, action, style and context and explicitly advises placing important elements first. (https://docs.bfl.ai/guides/prompting_guide_flux2)

---

## 2.2 Deliverable first

The prompt SHOULD first state **what is being produced**.

Prefer:

```text
A wide editorial hero image for a B2B climate analytics homepage...
```

over:

```text
Beautiful futuristic landscape...
```

Examples:

```text
Hero image for a SaaS landing page
Empty-state illustration for an analytics dashboard
Seamless grain texture
Three-quarter product mockup
Editorial OG-image background
Flat icon concept
Technical cutaway illustration
```

This gives later aesthetic instructions a concrete functional context.

---

## 2.3 Subject

The subject MUST be concrete.

Weak:

```text
technology and collaboration
```

Better:

```text
three environmental engineers reviewing a tablet beside a solar installation
```

For important subjects, specify:

```text
identity
quantity
age range if material
clothing
materials
colour
relative scale
position
```

For people, avoid unnecessary demographic specification unless it serves the brief.

---

## 2.4 Action

If a subject is doing something, state the action explicitly.

Example:

```text
an analyst pointing at a projected rainfall contour while two colleagues compare a printed field map
```

For human poses, OpenAI recommends describing framing, gaze, relative scale and interaction with objects where these matter. (https://developers.openai.com/api/docs/guides/image-prompting)

---

## 2.5 Medium

The prompt MUST distinguish the intended medium when medium determines the visual result.

Examples:

```text
editorial vector illustration
cut-paper collage
3D clay render
real studio product photograph
risograph print
technical ink drawing
isometric vector diagram
charcoal sketch
photographic documentary-style portrait
screen-printed poster
```

Do not substitute vague modifiers such as:

```text
beautiful
epic
cool
awesome
masterpiece
```

for visible production attributes.

---

## 2.6 Style

Style SHOULD be described through **observable visual properties**.

Prefer:

```text
Swiss editorial layout, hard grid, generous negative space,
flat fields of colour, sharp crop, restrained geometric forms
```

over an unexplained label alone.

A style specification MAY include:

```text
shape language
line quality
surface quality
illustration technique
era
printing technique
contrast
graphic density
composition language
```

The Design Style Catalogue SHOULD be used as the source for house-style vocabulary.

---

## 2.7 Palette

Brand palette instructions SHOULD include both semantic names and actual colour values.

Example:

```text
Palette:
deep navy #13243A
brand blue #2563EB
teal #0F9F8F
warm neutral #F4F0E8
off-white #FBFCFD

Use navy and off-white as dominant colours.
Blue and teal are accents only.
No purple or orange.
```

Current FLUX.2 documentation explicitly describes hex-code prompting for precise colour direction. (https://docs.bfl.ai/guides/prompting_guide_flux2)

For models without reliable exact-colour reproduction, hex values remain **directional**.

Exact brand-colour fidelity MUST be corrected during post-production rather than assumed from generation.

---

## 2.8 Lighting

Photography and 3D prompts SHOULD describe the lighting setup.

Useful dimensions include:

```text
source
direction
hardness
colour temperature
contrast
time of day
practical lights
atmosphere
```

Example:

```text
large diffused window light from camera left,
soft shadow falloff,
neutral daylight,
low fill,
no cinematic orange/teal grading
```

Lighting SHOULD be described physically where realistic results matter.

---

## 2.9 Composition

Composition MUST reflect the final component.

Useful constraints include:

```text
wide / portrait / square
subject position
camera height
foreground
background
negative space
visual centre of gravity
cropping
safe area
```

Example hero requirement:

```text
16:9 landscape composition,
subject concentrated in rightmost 45%,
left 40% intentionally simple and dark enough
for HTML heading and CTA,
no important details within 8% of any edge
```

This is preferable to generating a visually complete image and later forcing copy on top of it.

---

## 2.10 Camera and lens

For photographic assets, camera language MAY be used to describe expected appearance.

Useful terms include:

```text
24mm wide-angle
35mm environmental
50mm normal
85mm portrait
macro
telephoto compression
shallow depth of field
deep focus
eye-level
low angle
overhead
orthographic
three-quarter view
```

FLUX documentation includes camera and lens descriptions as prompting controls. (https://docs.bfl.ai/guides/prompting_guide_flux2)

OpenAI explicitly cautions that camera specifications are **appearance cues**, not guarantees of exact optical simulation. (https://developers.openai.com/api/docs/guides/image-prompting)

A prompt MUST NOT imply that a generated image is a physically calibrated photograph merely because a real camera/lens was named.

---

## 2.11 Aspect ratio

Aspect ratio SHOULD be selected from the intended placement before generation.

Examples:

```text
Hero              wide landscape
Card illustration 4:3 / 3:2
OG/social          channel-specific landscape
Portrait campaign 4:5 / 2:3
Avatar             1:1
Texture            tile / square
```

The final safe crop MUST be tested at every responsive breakpoint.

---

## 2.12 Quality modifiers

The Gold Standard MUST prefer **observable qualities** over generic quality incantations.

Prefer:

```text
fine woven fabric visible
sharp product edges
natural skin texture
controlled studio reflections
clean vector edges
subtle paper fibres
```

over:

```text
8K
masterpiece
best quality
award-winning
insanely detailed
```

Quality terms MAY be used where a model has documented semantics, but they MUST NOT replace the actual visual specification.

---

# 3. Rules — Prompt Ordering and Weight

## 3.1 Portable ordering rule

The canonical order is:

```text
deliverable
→ main subject
→ key action
→ composition
→ medium/style
→ palette
→ lighting
→ camera
→ supporting detail
→ constraints
→ exclusions
→ model parameters
```

Critical information SHOULD occur before optional decorative detail.

FLUX.2 explicitly documents that word order matters and recommends prioritising main subject, key action, critical style, essential context, then secondary detail. (https://docs.bfl.ai/guides/prompting_guide_flux2)

---

## 3.2 Ordering is not universal numeric weighting

The system MUST NOT claim that earlier words receive a specific numerical weighting across all models.

Different engines tokenize, rewrite, upsample or interpret prompts differently.

Therefore:

```text
position = salience heuristic
explicit model controls = actual model-specific weighting
```

where such controls exist.

---

## 3.3 Parameters stay outside prose

Where a model uses formal parameters, parameters MUST remain separated from creative prose.

Midjourney explicitly requires its parameters to appear after the descriptive prompt. (https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List)

---

# 4. Rules — Negative Constraints

## 4.1 Negative prompting is model-dependent

A canonical prompt repository MUST distinguish:

```text
positive specification
negative/exclusion specification
model-specific negative mechanism
```

Negative prompts are not portable.

---

## 4.2 Midjourney

Midjourney currently supports:

```text
--no
```

for unwanted content. (https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List)

Example:

```text
--no text watermark extra people
```

---

## 4.3 GPT Image

GPT Image uses natural-language constraints rather than requiring a special negative-prompt field.

Example:

```text
Do not add any text, logos, watermarks, frames, UI elements,
or additional people.
```

OpenAI's current guidance explicitly recommends stating unwanted text, logos or watermarks when these must not appear. (https://developers.openai.com/api/docs/guides/image-prompting)

---

## 4.4 FLUX.2

Current FLUX.2 documentation explicitly states:

> Negative prompts are not supported.

The prompt MUST describe what should appear rather than passing a negative prompt field. (https://docs.bfl.ai/guides/prompting_guide_flux2)

---

## 4.5 Stable Diffusion

Diffusers-based Stable Diffusion pipelines expose:

```text
negative_prompt
```

alongside guidance. (https://huggingface.co/docs/diffusers/api/pipelines/stable_diffusion/img2img)

A negative prompt SHOULD remain targeted.

Avoid enormous inherited strings such as:

```text
bad bad anatomy bad art ugly worst quality deformed...
```

unless testing shows those terms improve the exact pinned model.

The negative-prompt list MUST be treated as code/configuration and regression-tested when the checkpoint changes.

---

# 5. Common Failure Modes

| Failure | Typical symptom | Preferred mitigation |
|---|---|---|
| Extra limbs | Six fingers, three arms, duplicated hands | Explicit pose/framing; reference pose; ControlNet; crop unnecessary limbs |
| Garbled text | Misspelled headline, pseudo-letters | Exact quoted copy; fewer words; high-quality generation; preferably deterministic text overlay |
| Watermark-like marks | Fake signature/logo in corner | Explicit no-logo/no-watermark constraint; reject affected output |
| Plastic skin | Over-smoothed waxy face | Specify natural skin texture, pores, subtle asymmetry, realistic lighting |
| Melted geometry | Broken devices, furniture, tools | Use strong reference image, ControlNet, compositing, or real 3D/product render |
| Uncanny symmetry | Mirror-perfect faces/scenes | Specify asymmetric pose/composition and natural variation |
| Duplicate object | Two watches, repeated tools | State exact quantity and object placement |
| Floating object | Feet/hands not touching surfaces | State physical contact and support relationships |
| Broken perspective | Impossible architecture/UI | ControlNet/depth reference or post-composite exact geometry |
| Style drift | Asset family looks unrelated | Style reference + locked prompt scaffold + model/version + palette |
| Palette drift | Brand blue becomes purple | Palette references + hex prompts + deterministic colour grade |
| Identity drift | Character changes between assets | Reference sheet / image references / adapter; do not rely on seed alone |
| Detail hallucination | Fake data, labels, gauges | Composite actual data/UI instead of generating it |
| Crop failure | Head/CTA area cut off | Explicit safe zone and target aspect ratio during generation |
| Over-stylisation | Prompt content gets lost | Reduce model stylisation/guidance effect; simplify style constraints |
| Generic AI sheen | Overly glossy “AI art” appearance | Specify real material imperfections and a concrete medium |

A failed anatomical or geometric output MUST NOT be fixed merely by hiding the failure under copy, gradients or cropping if the defect remains materially visible.

---

# 6. Rules — Model-Specific Syntax

## 6.1 Capability matrix

| Model family | Prompt style | Exclusion mechanism | Consistency mechanisms | Production note |
|---|---|---|---|---|
| Midjourney | Descriptive prompt + suffix parameters | `--no` | seed, `--sref`, image refs, current reference/edit tools | Syntax is highly version-dependent |
| GPT Image | Natural-language or structured artifact brief | Natural-language exclusions | input references, iterative editing, preservation constraints | No portable “magic parameter” syntax |
| FLUX.2 | Subject/action/style/context; structured prompting | No negative prompt | seed, prompt upsampling, references/model-specific controls | Put important concepts first |
| Stable Diffusion / Diffusers | Prompt + generation config | `negative_prompt` | seed/generator, LoRA, ControlNet, img2img, IP-Adapter | Most configurable; workflow must pin all settings |

---

# 7. Midjourney

## 7.1 Current core parameters

Current Midjourney documentation includes:

```text
--ar / --aspect       aspect ratio
--chaos / --c         variation/diversity
--seed                starting seed for testing
--stylize / --s       degree of Midjourney artistic interpretation
--sref                style reference
--sw                  style-reference influence
--raw                 reduce default styling
--no                  exclusions
--iw                  image prompt weight
```

(https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List)  
(https://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference)

Current Midjourney documentation describes `--stylize` as controlling artistic interpretation; lower values follow the prompt more literally, while higher values permit more artistic freedom. (https://docs.midjourney.com/hc/en-us/articles/32196176868109-Stylize)

---

## 7.2 `--cref` is legacy/version-specific

`--cref` and `--cw` are documented as **Character Reference features for Midjourney/Niji V6.x**, not as universal current parameters. (https://docs.midjourney.com/hc/en-us/articles/33329788681101-Legacy-Features)

Production documentation MUST therefore say:

```text
--cref = legacy V6 Character Reference syntax
```

not:

```text
--cref = current universal Midjourney character syntax
```

Newer Midjourney versions use newer reference/edit workflows; current documentation must be consulted whenever the pinned Midjourney model version changes. (https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List)

---

## 7.3 `--style` is also version-specific

Older Midjourney/Niji models used `--style` for values such as Raw or model-specific style presets. Current general-purpose documentation exposes `--raw` separately, while legacy documentation records older `--style` behaviour. (https://docs.midjourney.com/hc/en-us/articles/33329788681101-Legacy-Features)

Therefore the repository MUST store:

```text
provider
model version
parameter set
```

together.

---

## 7.4 Canonical Midjourney example

```text
Wide editorial hero image for an environmental data platform.
One field scientist on the right side examining a handheld sensor
beside a restored wetland. Natural documentary photography,
restrained modern editorial colour grade, deep green and slate blue,
soft overcast daylight, 35mm environmental framing.
Left 40% intentionally quiet with low-detail dark vegetation
for HTML headline placement. Natural skin texture and realistic equipment.
No typography or branding inside the scene.
--ar 16:9 --stylize 75 --chaos 5 --seed 48119
--no text watermark logo
```

If a Style Reference is approved:

```text
--sref <approved-reference>
```

MUST be appended separately.

---

# 8. OpenAI DALL·E / GPT Image

## 8.1 Prompting style

Current OpenAI GPT Image guidance supports:

```text
short prompts
descriptive prose
labelled sections
JSON-like structures
instructions
```

and recommends choosing whichever format keeps the requirements easiest to maintain. (https://developers.openai.com/api/docs/guides/image-prompting)

The Gold Standard SHOULD use **artifact-spec prompting** for production work.

---

## 8.2 Canonical GPT Image structure

```text
Asset:
Wide hero image for a climate-risk SaaS homepage.

Scene:
An environmental engineer stands at the right edge of a coastal
wetland while examining a rugged tablet.

Composition:
16:9 landscape.
Subject occupies rightmost 40%.
Leftmost 40% contains simple atmospheric landscape with no people,
signage, or high-frequency detail.

Style:
Natural editorial photography.
Believable real materials and field equipment.
No cinematic sci-fi styling.

Palette:
Deep green #315C48.
Slate #334155.
Brand blue #2563EB only as a subtle equipment detail.
Warm neutral highlights.

Lighting:
Soft overcast daylight from upper left.
Realistic skin and fabric texture.

Camera:
35mm environmental photograph, eye level, moderate depth of field.

Constraints:
Exactly one person.
Full hands must be anatomically natural.
No text, logos, signage, watermarks, charts, or fictional UI.
```

---

## 8.3 Reference images

When using multiple references, the prompt SHOULD state each image's role.

Example:

```text
Reference 1: preserve the product's physical shape.
Reference 2: use only for lighting and colour treatment.
Reference 3: use for composition, not for identity.
```

OpenAI explicitly recommends identifying reference images by purpose and specifying how they should combine. (https://developers.openai.com/api/docs/guides/image-prompting)

---

## 8.4 Editing

For edits, prompts SHOULD use:

```text
Change only:
...

Preserve:
...
```

Example:

```text
Change only the wall colour to #13243A.

Preserve exactly:
camera angle
person
furniture
window
lighting
crop
object positions
```

OpenAI recommends separating desired changes from preservation constraints and making iterative edits narrowly. (https://developers.openai.com/api/docs/guides/image-prompting)

If pixels outside an edit region truly need to remain identical, deterministic compositing SHOULD be used instead of relying on generative preservation. OpenAI's current guidance makes the same recommendation for pixel-identical areas. (https://developers.openai.com/api/docs/guides/image-prompting)

---

## 8.5 Legacy DALL·E compatibility

The exact model identifier MUST be stored.

A workflow MUST NOT assume:

```text
DALL·E settings
=
GPT Image settings
```

or that settings from one GPT Image generation model transfer unchanged to another.

OpenAI's current documentation explicitly recommends checking model-specific parameter differences when migrating image-generation models. (https://developers.openai.com/api/docs/guides/image-prompting)

---

# 9. FLUX

## 9.1 FLUX.2 prompt structure

Current Black Forest Labs guidance recommends:

```text
subject
+
action
+
style
+
context
```

and states that important information should occur earlier. (https://docs.bfl.ai/guides/prompting_guide_flux2)

---

## 9.2 Negative prompts

Current FLUX.2 documentation states that negative prompts are not supported.

Incorrect:

```text
negative_prompt:
  bad hands, text, watermark
```

Preferred:

```text
A clean image containing exactly one person,
with an uncluttered background and no visible signage or typography.
```

(https://docs.bfl.ai/guides/prompting_guide_flux2)

---

## 9.3 Useful FLUX controls

Depending on the exact FLUX variant/API, current BFL documentation includes controls such as:

```text
seed
prompt_upsampling
guidance
```

and structured prompting. (https://docs.bfl.ai/guides/prompting_guide_flux2)

The exact supported fields MUST be taken from the pinned model endpoint.

Do not copy configuration blindly between:

```text
FLUX.2 [pro]
FLUX.2 [max]
FLUX variants with different APIs
open-weight FLUX variants
```

---

## 9.4 Structured FLUX prompt example

```json id="uo0ah2"
{
  "scene": "coastal monitoring field station",
  "subjects": [
    {
      "description": "one environmental scientist",
      "action": "reviewing a rugged tablet"
    }
  ],
  "style": "natural editorial photography",
  "color_palette": {
    "deep_green": "#315C48",
    "slate": "#334155",
    "brand_blue": "#2563EB"
  },
  "lighting": "soft overcast daylight",
  "background": "wetland, low visual complexity",
  "composition": "subject on right, generous empty area on left",
  "camera": "35mm eye-level environmental framing"
}
```

FLUX documentation explicitly supports structured prompting for complex production workflows and describes palette, composition and camera fields. (https://docs.bfl.ai/guides/prompting_guide_flux2)

---

# 10. Stable Diffusion / Diffusers

## 10.1 Configuration is part of the prompt record

For Stable Diffusion-class workflows, the prompt alone is insufficient to reproduce the asset.

The manifest MUST also record:

```text
checkpoint
checkpoint hash/version
VAE where applicable
positive prompt
negative prompt
seed/generator
resolution
CFG/guidance scale
steps
scheduler/sampler
LoRA adapters + weights
ControlNet model + scale
img2img source + strength
IP-Adapter/reference configuration
```

---

## 10.2 CFG / guidance scale

Diffusers exposes:

```text
guidance_scale
```

and documents that increasing guidance encourages stronger alignment to the text prompt, potentially at the cost of image quality. (https://huggingface.co/docs/diffusers/api/pipelines/stable_diffusion/img2img)

The Gold Standard MUST NOT mandate one universal CFG value.

A recommended starting band for conventional SD/SDXL experimentation is:

```text
moderate guidance first
→ increase only if instruction adherence is insufficient
```

The final chosen value MUST be stored with the asset.

---

## 10.3 Steps

Diffusers exposes:

```text
num_inference_steps
```

and documents that additional denoising steps generally trade additional computation/time for potential quality improvement. (https://huggingface.co/docs/diffusers/api/pipelines/stable_diffusion/img2img)

More steps MUST NOT be treated as automatically better.

The selected:

```text
model
scheduler
steps
```

combination MUST be tested as a unit.

---

## 10.4 Sampler / scheduler

Diffusion interfaces often use the words **sampler** and **scheduler** for related denoising choices.

Diffusers defines the scheduler as the algorithm controlling how noise is removed across successive denoising steps. Different schedulers trade speed and result characteristics. (https://huggingface.co/docs/diffusers/using-diffusers/schedulers)

Current Diffusers families include examples such as:

```text
Euler
Euler Ancestral
DPM++ variants
FlowMatch Euler
FlowMatch Heun
LCM
```

The scheduler name MUST be stored in production metadata.

---

## 10.5 Image-to-image strength

Diffusers exposes:

```text
strength ∈ [0,1]
```

for image-to-image workflows.

Higher strength adds more noise to the starting image and permits greater transformation; lower strength preserves more of the source. (https://huggingface.co/docs/diffusers/api/pipelines/stable_diffusion/img2img)

Canonical interpretation:

```text
low strength    preserve structure strongly
medium strength controlled reinterpretation
high strength   source becomes increasingly advisory
```

Exact thresholds are model-dependent and MUST be tested.

---

## 10.6 LoRA

LoRA adapts a model by training a comparatively small set of additional weights rather than retraining the complete base model. Diffusers describes this as reducing the number of trainable parameters and producing smaller adapter weights. (https://huggingface.co/docs/diffusers/training/lora)

LoRA SHOULD be considered when:

```text
the same house style is required repeatedly
prompt-only style control is unstable
the organisation owns enough consistent training material
generation volume justifies maintaining an adapter
```

A LoRA MUST NOT be introduced merely to fix one illustration.

---

## 10.7 ControlNet

ControlNet conditions generation on structural visual inputs such as:

```text
edges
depth
human pose
```

and can therefore constrain composition more strongly than text prompting alone. (https://huggingface.co/docs/diffusers/using-diffusers/controlnet)

Diffusers exposes:

```text
controlnet_conditioning_scale
```

to control the influence of the structural input. (https://huggingface.co/docs/diffusers/using-diffusers/controlnet)

Use ControlNet for:

```text
consistent character pose
architecture
product silhouette
diagram geometry
camera layout
mockup structure
```

not for basic stylistic decoration that a simpler prompt/reference can solve.

---

# 11. Rules — Consistency Engineering

## 11.1 Seed is not a style system

A seed MAY improve repeatability during experimentation.

A seed MUST NOT be the only mechanism used to maintain:

```text
character identity
product identity
brand style
composition family
```

Midjourney's current documentation explicitly describes `--seed` as a tool for testing and experimentation. (https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List)

For production reproducibility, store:

```text
model
model version
prompt
parameters
seed
references
adapter versions
post-processing
```

together.

---

## 11.2 Style reference

An approved style reference SHOULD communicate:

```text
line treatment
palette
materials
contrast
lighting
surface texture
composition density
```

rather than accidentally introducing unwanted subject matter.

Midjourney provides explicit Style References via `--sref`; current documentation also provides style-reference weighting. (https://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference)

Reference assets MUST be rights-cleared before becoming part of a permanent house-style workflow.

---

## 11.3 Character/reference sheets

For a recurring fictional character or mascot, create a canonical reference sheet containing:

```text
front view
three-quarter view
profile
full body
facial close-up
approved clothing
approved colours
height/proportion guide
important accessories
forbidden variations
```

The reference sheet itself SHOULD become a versioned design-system asset.

For a real person, documented consent is required under this Gold Standard before likeness references are used.

---

## 11.4 Product reference sheet

Products SHOULD have:

```text
front
rear
side
three-quarter
materials
surface finish
logo placement
control layout
critical dimensions/proportions
```

If exact physical geometry matters, the final asset SHOULD use:

```text
real photography
approved 3D model
CAD render
or compositing
```

rather than generative reconstruction.

---

## 11.5 Palette locking

Palette consistency SHOULD be maintained with three layers:

```text
prompt palette
+
visual reference/swatches
+
deterministic post-production grade
```

Generation alone MUST NOT be trusted for exact brand-colour reproduction.

---

## 11.6 House-style LoRA

A house-style LoRA MAY be used only when the training corpus is rights-cleared.

The training manifest MUST record:

```text
base model
base model licence
adapter architecture
training code/version
dataset asset IDs
rights owner
licence/consent state
captions
training parameters
checkpoint
validation samples
release version
```

The model SHOULD be validated for:

```text
overfitting
memorisation
unintended logos
unwanted faces
style collapse
poor diversity
```

before production use.

---

## 11.7 Asset-family recipe

Every visual family SHOULD have a reusable style specification.

Example:

```text
Family: geo-editorial-v2

Medium:
editorial vector + subtle screenprint grain

Line:
2px-equivalent dark navy contour
rounded joins

Shape:
large simplified organic landforms
small rectangular data glyphs

Palette:
#13243A
#2563EB
#0F9F8F
#F4F0E8

Lighting:
none / graphic flat

Texture:
6–10% monochrome paper grain

Composition:
large single focal object
40% negative space

Forbidden:
photorealism
neon
gradients
3D extrusion
pseudo-text
```

Individual prompts SHOULD reference this specification rather than reinventing the style each time.

---

# 12. Rules — Text Inside Generated Images

## 12.1 Default rule

**Critical product text SHOULD NOT be generated into imagery.**

Prefer:

```text
generated background/art
+
real HTML/CSS/SVG text
```

for:

```text
hero headings
CTA labels
feature names
pricing
legal copy
charts
data values
product UI
empty-state messages
```

This guarantees spelling, accessibility, localization, responsiveness, selection and design-token consistency.

---

## 12.2 When generated text may be appropriate

Generated text MAY be acceptable when it is intrinsic to the artwork:

```text
poster concept
fictional packaging
decorative sign
editorial illustration
hand-lettered art
conceptual merchandise
```

and exact transcription is not relied upon for primary functionality.

---

## 12.3 GPT Image text generation

OpenAI's current guidance recommends:

- supplying exact wording in quotes;
- describing position and typography;
- checking spelling and legibility;
- specifying that no extra text should appear.  
  (https://developers.openai.com/api/docs/guides/image-prompting)

Example:

```text
The poster contains exactly the words:
"FIELD NOTES 2026"

No other letters, numbers, signatures or logos.
```

The result MUST still be inspected manually.

---

## 12.4 OG images

For production OG/social cards:

```text
generate or source background
→ colour grade
→ composite exact title
→ composite approved logo
→ render final raster
```

The title SHOULD NOT normally be produced by the image model.

This makes localisation, re-generation and text correction deterministic.

---

## 12.5 Images of text and accessibility

W3C guidance states that where an image of text is used, its text alternative should contain the same words. (https://www.w3.org/WAI/tutorials/images/)

Text that can reasonably remain real HTML SHOULD remain real HTML.

---

# 13. Rules — Asset-Type Recipes

## 13.1 Hero imagery

Hero generation MUST specify:

```text
target crop
text-safe area
subject position
responsive crop tolerance
lighting
brand palette
forbidden text/logo
```

Do not bake page headings into hero artwork.

---

## 13.2 Illustrations

Illustration prompts SHOULD lock:

```text
medium
line weight
shape language
palette
perspective
texture
character proportions
background treatment
```

before generating large families.

---

## 13.3 Textures

Texture prompts MUST specify whether the asset is:

```text
seamless
directional
non-directional
transparent
grayscale
colour
```

Seamless textures MUST be tile-tested horizontally and vertically before release.

---

## 13.4 Icons

Text-to-image output SHOULD be treated as **icon concept art**, not automatically as the final icon asset.

Production icons SHOULD normally be:

```text
redrawn/vectorised
optically aligned
simplified
tested at target pixel sizes
```

Auto-traced paths MUST be manually cleaned.

Small icons MUST NOT retain hundreds of unnecessary anchor points from tracing.

---

## 13.5 Product mockups

Generated product mockups MAY generate:

```text
environment
desk
device shell
lighting
human context
```

but actual product interfaces SHOULD be composited from real screenshots.

Do not generate fictional:

```text
numbers
customer records
maps
metrics
transactions
alerts
```

and then present them as an actual product screen.

---

## 13.6 Empty-state art

Empty-state artwork SHOULD support, not contain, the explanation.

Preferred:

```text
<illustration alt="">
<h2>No projects yet</h2>
<p>Create your first project to begin.</p>
```

where the illustration is decorative and the message is already present in HTML.

W3C recommends `alt=""` for purely decorative images. (https://www.w3.org/WAI/tutorials/images/)

---

# 14. Rules — Workflow Integration

## 14.1 Generation size

Generate close to the intended aspect ratio.

Do not:

```text
generate square
→ aggressively crop to panoramic hero
```

when the model supports the target shape directly.

---

## 14.2 Selection

Selection MUST evaluate:

```text
brief accuracy
composition
brand fit
geometry
anatomy
text
unwanted marks
legal risk
production crop
```

before subjective visual preference.

---

## 14.3 Upscaling

Only selected assets SHOULD be upscaled.

Repeated generative upscaling SHOULD be avoided because it may invent:

```text
skin features
fabric details
small text
logos
mechanical details
```

The final upscaled image MUST be re-reviewed as a new image.

---

## 14.4 Vectorisation

Automatic tracing MAY be used for:

```text
simple flat illustration
silhouette
geometric pattern
icon concept
```

It SHOULD NOT be used blindly for complex photography.

After tracing:

```text
remove noise paths
simplify nodes
correct curves
snap geometry
replace generated colours with design tokens
```

before shipping.

---

## 14.5 Background removal

Background-removal output MUST be inspected at:

```text
hair
fur
glass
smoke
soft shadows
semi-transparent fabric
reflective objects
```

for halo/fringe artefacts.

Transparent output MUST preserve intended soft edges rather than converting every boundary to a hard clipping path.

OpenAI's GPT Image guidance likewise advises validating the actual alpha channel around hair, glass, shadows and edges for transparent assets. (https://developers.openai.com/api/docs/guides/image-prompting)

---

## 14.6 Colour grading

Generated imagery SHOULD be graded through a deterministic colour pipeline after selection.

The grade MAY adjust:

```text
white balance
curve
saturation
brand accent mapping
shadow tint
highlight tint
```

It MUST NOT alter the semantic meaning of scientific or data imagery.

---

## 14.7 Image formats

For raster web assets, AVIF and WebP SHOULD be considered before older formats because modern formats can provide improved compression characteristics. web.dev recommends modern formats and appropriate fallbacks/responsive delivery. (https://web.dev/learn/performance/image-performance)

Canonical delivery:

```html id="39i1xh"
<picture>
  <source srcset="/hero.avif" type="image/avif" />
  <source srcset="/hero.webp" type="image/webp" />
  <img
    src="/hero.jpg"
    alt=""
    width="1600"
    height="900"
  />
</picture>
```

Use SVG for appropriate vector assets.

Use PNG where lossless raster/transparency is operationally required.

Do not convert a vector icon into AVIF merely because AVIF is modern.

---

## 14.8 Responsive output

Large images SHOULD be produced in responsive variants or served through an image pipeline.

The browser SHOULD NOT routinely download desktop-resolution hero imagery for small mobile slots.

---

# 15. Rules — Alt Text

## 15.1 Determine purpose first

Alt text is based on **function in context**, not on whether the image was AI-generated.

W3C distinguishes informative, decorative, functional and complex images. (https://www.w3.org/WAI/tutorials/images/)

---

## 15.2 Decorative

If the generated image is purely decorative:

```html id="zsa63w"
<img src="/hero.webp" alt="" />
```

or use a CSS background where appropriate.

W3C recommends null alternative text for decorative images. (https://www.w3.org/WAI/tutorials/images/)

---

## 15.3 Informative

Alt text MUST communicate the image's relevant information.

Poor:

```text
AI-generated picture of people outside
```

Better:

```text
Two field engineers inspect a water-level sensor beside a restored wetland.
```

Whether an image is generated is generally separate provenance information unless the generation itself is materially relevant to understanding the content.

---

## 15.4 Functional

For image-based controls, alt text MUST describe the function, not visual appearance.

W3C explicitly distinguishes functional images on this basis. (https://www.w3.org/WAI/tutorials/images/)

---

## 15.5 Complex

A generated diagram or data image MUST have a textual equivalent containing the meaningful information.

Do not attempt to solve a chart's accessibility merely with:

```text
alt="Chart showing data"
```

W3C recommends a complete text equivalent for complex images conveying detailed information or data. (https://www.w3.org/WAI/tutorials/images/)

---

# 16. Rules — Legal, Rights and Ethical Use

## 16.1 Provider terms are model/version-specific

There is no universal “AI-generated image licence.”

Before a model is approved for production, the organisation MUST record:

```text
provider
model
model/version
access method
applicable licence/contract
commercial-use status
input rights requirement
output rights
redistribution restrictions
fine-tuning restrictions
training-on-output restrictions
provenance requirements
policy URL
legal review date
```

Terms MUST be re-reviewed when:

```text
provider changes
model family changes
licence changes
deployment moves API ↔ self-hosted
company revenue affects licence tier
```

---

# 17. Current Provider Licensing Notes

## 17.1 OpenAI GPT Image

OpenAI's current individual Terms of Use state that, as between the user and OpenAI and to the extent permitted by applicable law, the user retains rights in Input and owns Output. They also require users to have the rights needed to provide Input. Business/API use is subject to the applicable business/service agreement, which MUST be the document actually reviewed for a production API deployment. (https://openai.com/policies/row-terms-of-use/) (https://openai.com/policies/)

The terms also state that outputs may be non-unique and may inaccurately reflect real people, places or facts, requiring human review appropriate to the use case. (https://openai.com/policies/row-terms-of-use/)

Therefore:

```text
"OpenAI generated it"
```

MUST NOT be treated as proof of exclusivity, factual accuracy or trademark clearance.

---

## 17.2 Midjourney

Midjourney's current commercial-use documentation ties company commercial-use rights to subscription conditions and states that businesses grossing more than USD $1 million annually require a Pro or Mega Plan for company commercial use. (https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially)

Its Terms also restrict using the service to infringe third-party intellectual-property rights and prohibit deceptive/fraudulent use. (https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service)

The organisation MUST verify the current plan and Terms rather than assuming all Midjourney accounts have identical commercial rights.

---

## 17.3 FLUX

FLUX licensing varies significantly by variant and deployment route.

Black Forest Labs' current FLUX `[dev]` non-commercial licence restricts use of the model/derivatives to non-commercial purposes unless separately licensed, while its terms separately address generated Outputs. BFL also publishes API and self-hosted commercial terms. (https://bfl.ai/legal/non-commercial-license-terms) (https://bfl.ai/legal/flux-api-service-terms) (https://bfl.ai/legal/self-hosted-commercial-license-terms)

Therefore the repository MUST identify:

```text
exact FLUX variant
+
API or local deployment
+
applicable licence
```

A generic value:

```text
model: flux
```

is insufficient for legal provenance.

---

## 17.4 Stable Diffusion / Stability AI

Current Stability AI licensing varies by model.

Stability's current licence page states that covered Core Models under its Community License may be used commercially by organisations below the stated annual-revenue threshold, with Enterprise licensing applying in the circumstances described by the licence. (https://stability.ai/license)

This MUST NOT be generalized to every historical Stable Diffusion checkpoint or community fine-tune.

Every checkpoint requires its own licence record.

---

# 18. Training-data Disclosure

For every approved base model, the internal model registry MUST record:

```text
trainingDataDisclosure:
  status:
    disclosed
    partially-disclosed
    not-publicly-disclosed
    unknown

  sourceUrl:
  reviewedAt:
  notes:
```

The organisation MUST NOT describe a provider's training set as:

```text
fully licensed
copyright-safe
public domain
ethically sourced
```

unless authoritative documentation supports that claim.

Absence of disclosure MUST be recorded as absence of disclosure, not filled with assumptions.

---

## 18.1 Internal LoRA data

Internal fine-tunes require substantially stronger provenance.

Every training asset MUST record:

```text
asset ID
creator/rightsholder
licence
permitted ML-training use
consent where relevant
source
checksum
included/excluded status
```

A house-style adapter MUST NOT be trained from an undocumented folder of images.

---

# 19. Real People and Likeness

## 19.1 Consent baseline

Under this Gold Standard, a recognisable real person's face or likeness MUST NOT be used as generation or reference material without documented authorisation appropriate to the use.

This is intentionally stricter than relying on individual provider capability.

OpenAI's current Usage Policies prohibit certain non-consensual likeness uses, including use of someone's photorealistic image or voice without consent where authenticity could be confused. (https://openai.com/policies/usage-policies/)

Consent records SHOULD identify:

```text
person
purpose
channels
duration
territory if relevant
editing/generation permission
revocation/expiry terms
```

---

## 19.2 Public figures

A public figure's visibility does not constitute blanket brand-use consent.

The product SHOULD use:

```text
licensed editorial photography
commissioned illustration
or generic fictional subjects
```

instead of generating an apparent endorsement.

---

# 20. Logos and Trademarks

Generated images MUST NOT intentionally fabricate:

```text
third-party company logos
certification marks
government seals
sports-team marks
partner badges
product trademarks
```

unless rights and usage are approved.

The model SHOULD be told:

```text
no visible logos or brand marks
```

when third-party marks are unnecessary.

Midjourney's current Terms explicitly prohibit attempts to violate others' trademark and other IP rights. (https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service)

OpenAI's current terms likewise require that users possess the rights and permissions necessary for supplied Inputs. (https://openai.com/policies/row-terms-of-use/)

AI-generated logo concepts for the organisation itself MUST undergo:

```text
human design review
vector reconstruction
similarity/trademark review
small-size testing
```

before adoption as a brand mark.

---

# 21. Documentary and Data Integrity

Generated imagery MUST NOT be presented as evidence of:

```text
a real field inspection
a real flood
a real wildfire
a real satellite capture
a real sensor installation
a real customer
a real incident
a real medical condition
a real manufacturing defect
```

unless it actually depicts that verified event/source.

For data products, generated visuals MUST NOT masquerade as:

```text
satellite data
sensor data
map imagery
scientific microscopy
surveillance footage
customer screenshots
operational telemetry
```

Synthetic imagery used in these contexts MUST be clearly illustrative where confusion is plausible.

OpenAI's terms explicitly warn that model output may not accurately reflect real people, places or facts and require appropriate evaluation before sharing. (https://openai.com/policies/row-terms-of-use/)

Black Forest Labs likewise prohibits fraudulent or misleading use in its Usage Policy. (https://bfl.ai/legal/usage-policy)

---

# 22. Watermarks and Provenance

There is an important distinction between:

```text
preventing a model from inventing fake watermark-like marks
```

and:

```text
removing a real creator/provider watermark from source material
```

The former is acceptable prompt hygiene.

The latter MUST NOT be done unless the organisation has explicit rights to alter/remove that mark.

Where providers attach provenance credentials or digital watermarks, the production pipeline MUST preserve them when required by provider policy or law.

For example, BFL's current Usage Policy prohibits circumventing or suppressing C2PA credentials and other provenance signals associated with outputs. (https://bfl.ai/legal/usage-policy)

Image optimisation MUST therefore NOT silently destroy mandatory provenance metadata without an approved alternative provenance mechanism.

---

# 23. Rules — Prompt Hygiene

## 23.1 Prompts are source artefacts

Every production-generated asset MUST have a reproducibility record stored in the repository or associated asset registry.

A final JPEG alone is insufficient source history.

---

## 23.2 Canonical file pairing

Recommended structure:

```text
assets/
  homepage/
    climate-hero/
      hero.avif
      hero.webp
      source.png
      prompt.yaml
      references.json
      README.md
```

---

# 24. Canonical Prompt Manifest

```yaml id="zd73nb"
schemaVersion: "1.0"

asset:
  id: "img_home_climate_hero_v3"
  purpose: "homepage hero"
  owner: "marketing-design"
  status: "approved"

generation:
  provider: "example-provider"
  model: "exact-model-id"
  modelVersion: "exact-version-if-available"
  generatedAt: "2026-09-23T00:00:00Z"

prompt:
  core: |
    Wide editorial hero image for an environmental analytics platform.
    One field scientist...
  exclusions: |
    No text, watermark, logos, extra people or fictional UI.

output:
  aspectRatio: "16:9"
  width: 2048
  height: 1152

parameters:
  seed: 48119
  guidance: null
  steps: null
  scheduler: null
  stylize: null
  chaos: null

references:
  - id: "ref_style_geo_editorial_v2"
    role: "style"
    sha256: "..."
  - id: "ref_palette_brand_2026"
    role: "palette"
    sha256: "..."

adapters: []

postprocess:
  - "remove background artefact at upper-right edge"
  - "grade blue accent to design token brand.600"
  - "export AVIF/WebP responsive variants"

rights:
  providerTermsUrl: "https://..."
  reviewedAt: "2026-09-23"
  inputRightsConfirmed: true
  likenessConsentRequired: false

accessibility:
  role: "decorative"
  alt: ""
```

---

## 24.1 Never store credentials

Prompt files MUST NOT contain:

```text
API keys
access tokens
signed private URLs
passwords
customer secrets
private personal data
```

Secret configuration belongs in the platform's secret-management system.

---

## 24.2 Model version

The record SHOULD pin an explicit model version when supported.

If the provider only exposes a mutable model alias, store:

```text
provider model alias
generation timestamp
API/library version
response metadata where available
```

so future drift is detectable.

---

## 24.3 Reference hashes

Reference assets SHOULD be content-hashed.

A file named:

```text
style-reference.png
```

that can silently change undermines reproducibility.

---

# 25. Regeneration Instructions

Each production image family SHOULD include a short regeneration procedure.

Example:

```text
1. Use approved model version listed in prompt.yaml.
2. Load all references by recorded SHA-256.
3. Run prompt exactly as stored.
4. Use recorded seed/settings.
5. Generate four candidates.
6. Compare to approved reference asset.
7. Apply postprocess recipe.
8. Run image QA.
9. Re-export responsive variants.
10. Update version only after approval.
```

Regeneration MUST NOT silently overwrite the existing production asset.

Use a new asset version.

---

# 26. Reusable Prompt Template

```text id="paw332"
[ASSET / PURPOSE]
Create a {asset type} for {product/page/component}.
Its purpose is {communication goal}.

[SUBJECT]
Show {primary subject}.
Quantity: {exact count}.
Important physical details: {details}.

[ACTION / STATE]
{What is happening.}

[ENVIRONMENT]
{Location/context/background.}

[MEDIUM]
{photograph / vector / 3D / collage / risograph / etc.}

[STYLE]
{observable style characteristics}.
Avoid relying only on a named aesthetic.

[BRAND PALETTE]
Primary: {semantic name} {hex}
Secondary: {semantic name} {hex}
Accent: {semantic name} {hex}
Dominance rules: {rules}.

[LIGHTING]
{source, direction, softness, temperature, contrast}.

[COMPOSITION]
Aspect ratio: {ratio}.
Subject position: {position}.
Negative space: {required region}.
Crop/safe-area rules: {rules}.

[CAMERA / PERSPECTIVE]
{lens / angle / distance / perspective / depth of field}.

[MATERIAL / DETAIL]
{surface, texture, imperfections, physical realism}.

[TEXT]
{exact quoted text, if text is genuinely required}
No additional text.

[PRESERVE — EDITS ONLY]
{details that must not change}.

[EXCLUSIONS]
No {specific unwanted elements}.

[OUTPUT]
{transparent/opaque}.
{resolution/quality requirement}.
No embedded UI unless explicitly specified.

[MODEL PARAMETERS]
{model-specific configuration only}
```

---

# 27. Example — On-brand Hero Prompt

```text id="akyej4"
[ASSET / PURPOSE]
Create a wide homepage hero image for a climate-risk analytics platform.
It should communicate professional field science connected to modern data,
without looking like a generic technology stock photograph.

[SUBJECT]
Exactly one environmental engineer wearing practical dark-green field clothing,
reviewing a rugged tablet beside a wetland monitoring instrument.

[ACTION]
The engineer is looking at the tablet while one hand adjusts the sensor housing.

[MEDIUM]
Natural editorial photography.

[STYLE]
Understated contemporary science journalism.
Believable equipment, natural skin, normal fabric texture,
subtle imperfections, no futuristic holograms.

[BRAND PALETTE]
Deep navy #13243A.
Forest green #315C48.
Brand blue #2563EB.
Warm neutral #F4F0E8.
Blue is an accent only.

[LIGHTING]
Soft overcast daylight.
Gentle directional light from camera left.
No orange/teal cinematic grade.

[COMPOSITION]
16:9 landscape.
Scientist and sensor occupy rightmost 45%.
Leftmost 40% is calm wetland background suitable for HTML headline and CTA.
No high-contrast object behind the copy area.
Do not crop the person's hands.

[CAMERA]
Eye-level 35mm environmental photography.
Moderate depth of field.
Background recognizable but unobtrusive.

[CONSTRAINTS]
Exactly one person.
Anatomically correct visible hands.
Realistic tablet geometry.
No text, numbers, logos, signatures, watermark, maps, charts or fictional interface.
```

Model-specific settings are appended separately.

---

# 28. Anti-patterns

| Do | Don't |
|---|---|
| Start with the required asset and subject | Start with a pile of vague style adjectives |
| Describe visible properties | Depend on “masterpiece, 8K, award-winning” |
| Pin the exact model/version | Record only “AI generated” |
| Keep model settings separate | Mix Midjourney syntax into FLUX or GPT prompts |
| Put Midjourney parameters at the end | Insert `--ar` in descriptive prose |
| Treat `--cref` as V6 legacy syntax | Document `--cref` as universally current Midjourney syntax |
| Use current `--sref` where appropriate | Assume seed alone preserves style |
| Use natural-language exclusions for GPT Image | Invent unsupported API fields |
| Use positive description with FLUX.2 | Add unsupported FLUX.2 negative prompts |
| Record SD checkpoint, CFG, steps and scheduler | Store only the positive prompt |
| Use ControlNet when geometry matters | Keep regenerating until geometry happens by chance |
| Train a LoRA from rights-cleared house assets | Train from an undocumented inspiration folder |
| Use style references for reusable visual language | Use random references per asset |
| Lock colours then post-grade exactly | Assume generated hex colours are exact |
| Overlay functional text in HTML/CSS | Generate CTA text inside a hero |
| Composite real product screenshots | Generate fictional UI and present it as product truth |
| Validate all fingers, text and geometry | Approve at thumbnail size |
| Generate near target aspect ratio | Generate square and brutally crop later |
| Upscale the selected final | Upscale every exploration |
| Inspect alpha after background removal | Assume transparent edges are clean |
| Manually clean vector traces | Ship noisy auto-traced SVG paths |
| Deliver AVIF/WebP where appropriate | Export huge source PNGs everywhere |
| Write alt text according to image purpose | Describe decorative AI art unnecessarily |
| Preserve required provenance | Strip credentials blindly during optimisation |
| Verify commercial rights per model | Assume “AI model” means unrestricted commercial use |
| Get consent for real likenesses | Treat a public social-media photo as consent |
| Exclude unnecessary third-party marks | Generate fake partner logos |
| Label synthetic documentary imagery | Present generation as real sensor/satellite evidence |
| Store prompts beside assets | Keep prompts in private chat history only |
| Store asset/reference hashes | Depend on mutable filenames |
| Version prompt changes | Silently overwrite the production image |

---

# 29. QA Checklist — Generated Assets

## Brief and composition

- [ ] Asset clearly serves the intended component/pattern.
- [ ] Correct target aspect ratio.
- [ ] Responsive crops tested.
- [ ] Required negative/text-safe space exists.
- [ ] Primary subject is correctly positioned.
- [ ] Important content is not near unsafe edges.
- [ ] Image hierarchy does not compete with surrounding UI.

## Subject integrity

- [ ] Correct subject count.
- [ ] No duplicated people or objects.
- [ ] Hands/fingers are plausible.
- [ ] Limbs are anatomically plausible.
- [ ] Eyes/teeth/faces pass close review.
- [ ] Object interactions are physically plausible.
- [ ] Product/mechanical geometry is credible.
- [ ] Perspective is coherent.
- [ ] Reflections and shadows are plausible.

## Text and marks

- [ ] Required generated text is spelled exactly.
- [ ] No unexpected pseudo-text.
- [ ] No unintended signatures.
- [ ] No watermark-like artefacts.
- [ ] No unapproved logos.
- [ ] No accidental trademarks.
- [ ] No fictional UI presented as actual product UI.

## Brand

- [ ] Asset matches approved style family.
- [ ] Palette is directionally correct.
- [ ] Final colour grade uses approved brand palette.
- [ ] Lighting is consistent with asset family.
- [ ] Texture treatment is consistent.
- [ ] Character/product reference is preserved.
- [ ] Asset looks coherent beside other family assets.

## Technical output

- [ ] Master source retained.
- [ ] Final image resolution is adequate.
- [ ] Upscaled output has been re-inspected.
- [ ] Alpha edges checked where transparent.
- [ ] Auto-traced SVG manually cleaned.
- [ ] No excessive SVG path complexity.
- [ ] AVIF/WebP outputs generated where appropriate.
- [ ] Appropriate fallback exists.
- [ ] Width/height metadata provided.
- [ ] Responsive variants generated where appropriate.
- [ ] File-size budget met.

## Accessibility

- [ ] Image purpose classified as decorative/informative/functional/complex.
- [ ] Appropriate `alt` text written.
- [ ] Decorative artwork uses `alt=""`.
- [ ] Required text exists outside the image.
- [ ] Complex information has equivalent accessible content.
- [ ] Image does not rely on colour alone for meaning.
- [ ] Text-over-image contrast remains compliant at all crops.

## Legal and ethical

- [ ] Exact model/provider recorded.
- [ ] Applicable licence/terms reviewed.
- [ ] Commercial-use conditions satisfied.
- [ ] Model training-data disclosure status recorded.
- [ ] Input/reference asset rights confirmed.
- [ ] No unlicensed third-party logo use.
- [ ] No real-person likeness without required consent.
- [ ] Internal LoRA dataset is rights-cleared.
- [ ] Synthetic image cannot reasonably be mistaken for documentary evidence without disclosure.
- [ ] Required provider provenance/credentials remain intact.
- [ ] Human review completed.

## Reproducibility

- [ ] Prompt saved.
- [ ] Exclusion/negative prompt saved.
- [ ] Seed saved if available.
- [ ] Model version saved.
- [ ] Model settings saved.
- [ ] Reference IDs/hashes saved.
- [ ] LoRA versions/weights saved.
- [ ] ControlNet configuration saved.
- [ ] Post-processing recipe saved.
- [ ] Regeneration instructions tested.

---

# 30. Canonical Summary

**1. Write image prompts as production specifications, not incantations.**  
State the deliverable, subject, action, composition, medium, style, palette, lighting, camera and constraints explicitly. Current GPT Image and FLUX guidance both favour concrete visual specification. (https://developers.openai.com/api/docs/guides/image-prompting) (https://docs.bfl.ai/guides/prompting_guide_flux2)

**2. Put the important content first, but do not pretend ordering has identical numeric meaning across models.**  
FLUX.2 explicitly gives priority guidance based on order; other engines interpret prompts differently. (https://docs.bfl.ai/guides/prompting_guide_flux2)

**3. Negative prompting is not portable.**  
Midjourney uses `--no`; Stable Diffusion pipelines expose `negative_prompt`; GPT Image can take natural-language exclusions; current FLUX.2 does not support negative prompts. (https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List) (https://huggingface.co/docs/diffusers/api/pipelines/stable_diffusion/img2img) (https://developers.openai.com/api/docs/guides/image-prompting) (https://docs.bfl.ai/guides/prompting_guide_flux2)

**4. Model syntax must be versioned.**  
Midjourney's `--cref` is a legacy V6 Character Reference mechanism and older `--style` behaviour is version-specific; current workflows have evolved. (https://docs.midjourney.com/hc/en-us/articles/33329788681101-Legacy-Features)

**5. Consistency comes from a system, not a seed.**  
Model/version lock, prompt scaffold, references, palette, character/product sheets, structural control, adapters and deterministic post-processing all contribute to a coherent asset family.

**6. Use LoRA for repeated adaptation and ControlNet for structure.**  
Diffusers describes LoRA as a lightweight adaptation technique and ControlNet as structural conditioning through inputs such as edges, depth or pose. (https://huggingface.co/docs/diffusers/training/lora) (https://huggingface.co/docs/diffusers/using-diffusers/controlnet)

**7. Generated text is optional artwork, not a reliable UI system.**  
Where spelling, accessibility, localization, responsiveness or data accuracy matter, generate the art and overlay real text deterministically. GPT Image can render prompted text, but the result still requires inspection. (https://developers.openai.com/api/docs/guides/image-prompting)

**8. A generated image still requires production finishing.**  
Upscaling, background cleanup, vector reconstruction, colour grading, responsive export and alt-text authoring are part of delivery—not optional polish. Modern web delivery SHOULD use efficient formats such as AVIF/WebP where appropriate. (https://web.dev/learn/performance/image-performance)

**9. Legal rights are provider/model specific.**  
OpenAI, Midjourney, FLUX and Stable Diffusion-family models have different agreements and commercial conditions. The exact model, deployment route and applicable licence MUST be recorded; a family name alone is insufficient. (https://openai.com/policies/) (https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially) (https://bfl.ai/legal/non-commercial-license-terms) (https://stability.ai/license)

**10. Generated imagery must not become synthetic evidence.**  
In analytics, environmental, mapping, healthcare, scientific and operational products, decorative synthetic images MUST NOT masquerade as actual observations, customers, maps, screenshots, sensors or documentary records. Model outputs require human evaluation where factual interpretation matters. (https://openai.com/policies/row-terms-of-use/) (https://bfl.ai/legal/usage-policy)

**11. Accessibility is based on purpose.**  
Generated images follow the same W3C rules as any other images: decorative imagery gets null alt text, informative imagery gets an equivalent concise description, functional imagery describes function, and complex imagery needs an equivalent representation of its information. (https://www.w3.org/WAI/tutorials/images/)

**12. Prompts are source code for visual assets.**  
Production prompts, parameters, references, seeds, model versions, rights metadata and regeneration instructions MUST be stored beside—or durably linked to—the final asset.

---

# 31. Sources

1. **OpenAI — Image prompting guide**  
   https://developers.openai.com/api/docs/guides/image-prompting

2. **OpenAI — Image generation guide**  
   https://developers.openai.com/api/docs/guides/image-generation

3. **OpenAI — Terms & Policies**  
   https://openai.com/policies/

4. **OpenAI — Terms of Use**  
   https://openai.com/policies/row-terms-of-use/

5. **OpenAI — Usage Policies**  
   https://openai.com/policies/usage-policies/

6. **Midjourney — Parameter List**  
   https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List

7. **Midjourney — Style Reference**  
   https://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference

8. **Midjourney — Stylize**  
   https://docs.midjourney.com/hc/en-us/articles/32196176868109-Stylize

9. **Midjourney — Legacy Features**  
   https://docs.midjourney.com/hc/en-us/articles/33329788681101-Legacy-Features

10. **Midjourney — Terms of Service**  
    https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service

11. **Midjourney — Using Images & Videos Commercially**  
    https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially

12. **Black Forest Labs — FLUX.2 Prompting Guide**  
    https://docs.bfl.ai/guides/prompting_guide_flux2

13. **Black Forest Labs — FLUX [dev] Non-Commercial License**  
    https://bfl.ai/legal/non-commercial-license-terms

14. **Black Forest Labs — FLUX API Service Terms**  
    https://bfl.ai/legal/flux-api-service-terms

15. **Black Forest Labs — Self-Hosted Commercial License Terms**  
    https://bfl.ai/legal/self-hosted-commercial-license-terms

16. **Black Forest Labs — Usage Policy**  
    https://bfl.ai/legal/usage-policy

17. **Stability AI — Licensing**  
    https://stability.ai/license

18. **Hugging Face Diffusers — Stable Diffusion Image-to-Image**  
    https://huggingface.co/docs/diffusers/api/pipelines/stable_diffusion/img2img

19. **Hugging Face Diffusers — Schedulers**  
    https://huggingface.co/docs/diffusers/using-diffusers/schedulers

20. **Hugging Face Diffusers — LoRA training**  
    https://huggingface.co/docs/diffusers/training/lora

21. **Hugging Face Diffusers — ControlNet**  
    https://huggingface.co/docs/diffusers/using-diffusers/controlnet

22. **W3C/WAI — Images Tutorial**  
    https://www.w3.org/WAI/tutorials/images/

23. **web.dev — Image performance**  
    https://web.dev/learn/performance/image-performance

24. **web.dev — Choose the right image format**  
    https://web.dev/articles/choose-the-right-image-format

The main production distinction is: **the prompt describes creative intent; the manifest records the generation system**. Both are required to make visual assets reproducible, legally reviewable, and maintainable.
