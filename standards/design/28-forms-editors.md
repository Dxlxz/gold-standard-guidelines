---
id: "forms-editors"
title: "Forms, Data Entry & Editors"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "forms", "data", "entry", "editors"]
applies_to: ["ui", "data"]
related: []
legacy_number: 108
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 66327
provenance: baseline

---

Research complete via Firecrawl. The standard below uses W3C/WAI, GOV.UK, NN/g, Apple HIG, current IBM Carbon guidance, plus supporting Material 3, Adobe Spectrum, and shadcn/ui references.

# Gold Standard 2026 — Forms, Data Entry & Editors

**Status:** Canonical design standard  
**Scope:** Forms, structured data entry, advanced inputs, grid editing, rich-text and code editors, upload workflows, geospatial entry, drafts, autosave, validation, and submission UX  
**Component baseline:** shadcn/ui  
**Normative language:** **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** indicate requirement strength.

---

# 1. Purpose

Forms are transactional interfaces. Their purpose is to let users create or modify valid product state with the least possible ambiguity, unnecessary work, and risk of data loss.

Forms therefore MUST be designed as part of the wider product architecture rather than as isolated collections of inputs. Form behavior MUST align with:

- **Security standards:** sensitive values, credentials, uploads, code, and untrusted rich text require appropriate safeguards.
- **Data & Database standards:** UI units, formats, identifiers, nullability, precision, and constraints MUST map predictably to the canonical data model.
- **API standards:** client validation MUST NOT be treated as authoritative; server responses and field-level errors require deterministic mappings.
- **State Management standards:** dirty state, saving state, optimistic state, conflicts, drafts, and retries MUST be explicit.
- **Forms & Validation standards:** validation MUST be understandable, recoverable, and preserve entered data.
- **Accessibility standards:** controls require programmatic names, instructions, keyboard operation, understandable errors, and appropriate focus management.
- **Design Token standards:** focus, invalid, disabled, destructive, muted, and success presentation MUST consume semantic tokens.
- **Component and Pattern standards:** shadcn/ui components are the default primitive layer; teams SHOULD compose them rather than create ad-hoc input systems.

W3C recommends simple forms that request only information necessary for the transaction and splitting long processes into logical multi-page steps where helpful. https://www.w3.org/WAI/tutorials/forms/

Current Carbon guidance similarly recommends logical ordering, section grouping, privacy-conscious data collection, and progressive disclosure. https://preview.carbondesignsystem.com/building-blocks/core/patterns/forms

## Rules

1. A form MUST have a clear task outcome.
2. Every requested value MUST justify why the product needs it now.
3. A field MUST have one canonical semantic meaning.
4. The UI MUST NOT silently reinterpret user input into materially different data.
5. Entered data MUST survive recoverable validation and server failures.
6. Required input MUST be distinguishable before submission.
7. The system MUST provide a reliable path from error → affected input → correction → successful submission.
8. Form design MUST account for keyboard, touch, assistive technology, autofill, paste, localization, asynchronous operations, and server validation.
9. Complex custom inputs MUST have an equivalent keyboard-accessible and, where appropriate, text-based entry path.
10. Visual polish MUST NOT reduce data-entry clarity.

## Anti-patterns

- collecting information merely because it may be useful later;
- styling forms independently from system components;
- client-only validation;
- clearing the form after a recoverable error;
- custom controls that behave unlike their native equivalent;
- relying on placeholders as labels;
- hiding important units or timezones;
- silently changing precision;
- showing generated success before server acknowledgement;
- using disabled controls as the only explanation of what users must do next.

## Checklist

- [ ] Task outcome is explicit.
- [ ] Every field has a data-model purpose.
- [ ] Server-side validation is expected.
- [ ] Failure does not erase input.
- [ ] Accessibility semantics exist.
- [ ] Save/submission state is designed.
- [ ] Mobile input behavior is designed.
- [ ] Component choices follow the system baseline.

## Canonical summary

**Forms MUST make valid data easier to enter than invalid data, and mistakes easier to recover from than to repeat.**

---

# 2. Component and Visual Baseline

## Purpose

Provide one predictable form language across application surfaces.

shadcn/ui uses semantic theme tokens and provides primitives for fields, inputs, text areas, selection controls, calendars, sliders, alerts, progress, dialogs, tables, and related interaction patterns. https://ui.shadcn.com/docs/theming

## Rules

The preferred component mapping is:

| Need | Baseline pattern |
|---|---|
| Short text | `Input` + `Field` |
| Long text | `Textarea` |
| Prefix/suffix/unit | `InputGroup` |
| Small known list | `Select` or native select |
| Searchable large list | `Combobox` |
| Multiple independent choices | `Checkbox` |
| One choice among visible alternatives | `RadioGroup` |
| Binary setting | `Switch` |
| Bounded approximate numeric choice | `Slider` + typed input |
| Calendar selection | `Calendar` / date-picker composition |
| Inline message | field description/error |
| Page-level error | `Alert` / error-summary composition |
| Upload progress | upload row + `Progress` |
| Confirmation | `Dialog` / `AlertDialog` where consequence requires confirmation |
| Dense structured editing | `Table` / data-table pattern |

### Semantic state tokens

Forms MUST use semantic roles rather than bespoke state colors.

```text
default surface      → background / card
input boundary       → input / border
default content      → foreground
supporting copy      → muted-foreground
focus                → ring
destructive/error    → destructive
selection/emphasis   → primary / accent
disabled             → muted treatment
```

Required, invalid, warning, pending, and saved states MUST NOT be distinguished through color alone.

## Anti-patterns

- custom red values per form;
- different focus-ring behavior across inputs;
- field-specific border radii;
- multiple unrelated combobox implementations;
- styling `Select`, `Combobox`, and input menus as different product families.

## Checklist

- [ ] Correct primitive selected.
- [ ] Token-based state colors used.
- [ ] Focus behavior is consistent.
- [ ] Error anatomy is consistent.
- [ ] Custom control is justified.

## Canonical summary

**Form components MUST share one interaction grammar even when the data types differ.**

---

# 3. Form Architecture

## Purpose

Determine how questions are sequenced, grouped, and divided across screens.

NN/g recommends single-column forms as the default because multi-column layouts force users to infer field sequence and direction. Related short fields are a limited exception. https://www.nngroup.com/articles/web-form-design/

W3C recommends short forms and logical multi-page decomposition for long tasks. https://www.w3.org/WAI/tutorials/forms/

GOV.UK recommends starting with one question per page for service workflows while allowing multiple related questions where appropriate. https://design-system.service.gov.uk/patterns/question-pages/

## Rules

### 3.1 Single-column versus multi-column

A **single-column flow MUST be the default**.

Use a second column only when all of the following are true:

- fields are tightly related;
- expected values are short;
- reading order is unambiguous;
- the pair remains understandable when collapsed vertically;
- responsive layouts do not alter semantic order.

Acceptable examples include:

- latitude + longitude;
- start date + end date;
- city + postal code in some address designs;
- minimum + maximum;
- hours + minutes.

A multi-column layout MUST NOT be used merely to make a form shorter.

The DOM/focus order MUST remain logical regardless of visual columns.

### 3.2 Grouping

Related inputs MUST be grouped semantically and visually.

Groups SHOULD use:

- a section heading for conceptual regions;
- `fieldset` + `legend` for related control groups where applicable;
- greater spacing between groups than within groups.

W3C explicitly recommends grouping related controls using `fieldset` and `legend`. https://www.w3.org/WAI/tutorials/forms/

### 3.3 Section headers

Section headers SHOULD describe a user concept, not an internal schema.

Prefer:

- **Location**
- **Billing details**
- **Observation settings**
- **Access**
- **Data retention**

Avoid:

- **Metadata fields**
- **Record attributes**
- **Table 2 values**

unless those terms genuinely belong to the user domain.

### 3.4 Progressive disclosure

Conditional fields SHOULD remain hidden until they become relevant when:

- their applicability depends on an earlier choice;
- they would otherwise distract most users;
- revealing them does not conceal important consequences.

Carbon recommends progressive disclosure so users can focus on relevant information. https://preview.carbondesignsystem.com/building-blocks/core/patterns/forms

When revealing fields:

- focus SHOULD normally remain where the user is;
- newly revealed content SHOULD appear adjacent to the triggering control;
- required status MUST be recomputed immediately;
- hidden fields MUST NOT produce unexplained validation errors;
- stale hidden values MUST follow an explicit retention rule.

### 3.5 One thing per screen versus long-form

Use **one question or one tightly related decision per screen** when:

- the workflow is unfamiliar;
- questions have conditional branches;
- the user needs explanation before answering;
- errors or consequences are significant;
- the process naturally forms a linear service journey.

Use a **single longer form** when:

- users benefit from seeing relationships between fields;
- comparison or cross-reference is necessary;
- expert users edit data repeatedly;
- navigation overhead would exceed cognitive benefit;
- fields form one compact conceptual object.

Use a **multi-step form** when:

- the process is genuinely long;
- groups have a logical sequence;
- progress can be saved;
- returning to previous steps is safe.

Carbon's current form guidance recommends logically related screens and progress indication for multistep workflows. https://preview.carbondesignsystem.com/building-blocks/core/patterns/forms

### 3.6 Progress

Multistep forms MUST communicate:

- current step;
- completed steps where useful;
- remaining scope without false precision;
- whether progress has been saved.

Do not show “Step 2 of 5” if branching can turn five steps into nine unless the indicator can update honestly.

## Anti-patterns

- two-column forms with alternating reading order;
- twenty unrelated fields under one heading;
- accordions used to conceal arbitrary portions of a basic form;
- a wizard for three simple fields;
- a single 60-field page simply to avoid navigation;
- sections based on backend table names;
- conditional required fields remaining hidden after validation.

## Checklist

- [ ] Single-column default used.
- [ ] Columns only group strongly related values.
- [ ] Groups map to user concepts.
- [ ] Conditional content is explicit.
- [ ] Screen decomposition matches task complexity.
- [ ] Progress indicator is truthful.
- [ ] Focus/DOM order remains logical.

## Canonical summary

**Split forms by user decisions, not by arbitrary field count; group fields by meaning, not database structure.**

---

# 4. Field Design

## Purpose

Make the expected value, constraints, and context understandable before the user begins typing.

W3C requires controls to have identifiable purposes and recommends explicit labels and instructions. https://www.w3.org/WAI/tutorials/forms/labels/

NN/g recommends keeping labels close to their fields, avoiding placeholders as labels, and matching field size roughly to expected input. https://www.nngroup.com/articles/web-form-design/

## Rules

### 4.1 Label placement

Visible labels MUST remain available after entry begins.

Default placement:

**label → description/help → control → error/status**

Labels SHOULD sit above fields in ordinary web and mobile forms.

Side-aligned labels MAY be used in dense expert desktop interfaces only when:

- labels are short;
- scanning benefit is proven;
- width is stable;
- mobile collapses to top-aligned labels.

Apple similarly recommends vertically stacking multiple fields where possible and preserving clear label-field relationships. https://developer.apple.com/design/human-interface-guidelines/text-fields

### 4.2 Required and optional marking

A form MUST establish one consistent convention.

If almost every field is required:

- optional fields SHOULD be marked `(optional)`.

If required and optional fields are substantially mixed:

- required fields SHOULD be explicitly marked;
- an asterisk MAY be used only when its meaning is explained;
- required state MUST also exist programmatically.

Do not rely on absence of an `(optional)` label when that convention has not been established.

W3C recommends making required input clearly identifiable in labels. https://www.w3.org/WAI/tutorials/forms/validation/

### 4.3 Help text

Help text SHOULD explain information that materially changes how the user answers.

Good help text answers one or more of:

- why the value is needed;
- where to find it;
- acceptable format;
- consequence of the choice;
- unusual domain terminology.

Help text MUST NOT repeat the label.

### 4.4 Placeholder rules

Placeholder text MUST NOT replace a persistent label.

NN/g advises avoiding placeholders because the guidance disappears while users type and makes review harder. https://www.nngroup.com/articles/web-form-design/

W3C similarly notes that disappearing placeholder instructions make forms difficult to review. https://www.w3.org/WAI/tutorials/forms/instructions/

A placeholder MAY be used for:

- a short example;
- an optional search hint;
- an obvious transient pattern.

Prefer:

```text
Label: Plot identifier
Help: Use the identifier from your field survey.
Placeholder: e.g. MY-042
```

Do not use:

```text
Placeholder: Enter plot identifier here
```

### 4.5 Field width

Visible width SHOULD approximate expected content length where this helps understanding.

Examples:

- ISO country code → short;
- year → short;
- title → medium;
- URL → long;
- comments → multiline.

A short expected value MUST NOT be placed inside a full-viewport field merely because the grid permits it.

### 4.6 Input masks

Hard input masks SHOULD be avoided unless the format is genuinely fixed.

Prefer tolerant parsing:

```text
User enters: 03 5555 1234
or:         +61 3 5555 1234
```

rather than forcing punctuation character-by-character.

W3C recommends accepting multiple valid notations where possible. https://www.w3.org/WAI/tutorials/forms/validation/

Masks MUST NOT:

- move the cursor unexpectedly;
- reject paste;
- trap partial editing;
- silently change numerical magnitude.

### 4.7 Prefixes, suffixes, and units

Units MUST remain visible while the field is being edited.

Preferred anatomy:

```text
Buffer distance
[ 250       ] m
```

rather than:

```text
[ 250 metres ]
```

where the unit is editable text.

For scientific, environmental, financial, or geospatial values, designs MUST define:

- unit;
- allowed precision;
- rounding behavior;
- accepted alternate units;
- canonical storage unit;
- display conversion behavior.

Do not use ambiguous unit symbols where confusion is plausible.

Examples:

- `ha` rather than relying on “area”;
- `km²` rather than “km”;
- `USD` where `$` may be ambiguous;
- `°` where geographic degrees are intended.

### 4.8 Coordinate fields

Coordinate entry MUST identify:

- **latitude versus longitude**;
- coordinate order;
- expected representation;
- coordinate reference system/datum where relevant;
- permitted precision.

For decimal WGS84-style coordinate entry, latitude and longitude SHOULD be represented as separate labeled values unless the domain requires another format.

A generic field labeled **Coordinates** is insufficient for precision workflows.

### 4.9 Character counters

Character counters SHOULD be used when a real storage, publication, or downstream constraint exists.

They SHOULD:

- state the limit before entry;
- update as the limit approaches;
- indicate overflow clearly;
- remain associated with the field.

Do not add counters merely because a database column has an arbitrary maximum.

### 4.10 Autofill and autocomplete

Fields collecting common personal data SHOULD expose correct semantic autocomplete purposes.

W3C notes that valid `autocomplete` purposes help browsers and assistive technologies identify and autofill fields consistently. https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html

Examples include:

```text
name
given-name
family-name
email
tel
organization
street-address
address-line1
address-line2
address-level1
postal-code
country
username
current-password
new-password
one-time-code
```

Autocomplete MUST NOT be disabled reflexively.

Sensitive workflows MAY restrict autofill only when a concrete security requirement outweighs usability and accessibility benefits.

### 4.11 Spellcheck, autocorrect, and capitalization

These behaviors MUST match the data type.

Disable spellcheck/autocorrect for values such as:

- IDs;
- coordinates;
- URLs;
- API identifiers;
- filenames;
- code.

Enable linguistic assistance for prose fields where useful.

## Anti-patterns

- placeholder-only labels;
- units that disappear on focus;
- `Latitude / Longitude` in a single ambiguous field;
- masking users into one phone-number notation;
- marking optional fields inconsistently;
- character counters for arbitrary implementation limits;
- disabling autofill across an entire application.

## Checklist

- [ ] Persistent label exists.
- [ ] Required convention is consistent.
- [ ] Help text adds information.
- [ ] Placeholder is not the label.
- [ ] Field width suggests expected input.
- [ ] Unit remains visible.
- [ ] Precision rules are known.
- [ ] Autocomplete semantics are correct.
- [ ] Spellcheck/autocorrect behavior matches content.
- [ ] Coordinate order and CRS are explicit where relevant.

## Canonical summary

**Before typing, users SHOULD already know what value is expected, in what form, and under what constraints.**

---

# 5. Validation UX

## Purpose

Help users detect, understand, and recover from invalid or rejected input without losing work.

GOV.UK recommends showing both an error summary and field-adjacent error messages after an unsuccessful submission, moving focus to the summary, preserving user-entered values, and explaining what went wrong and how to fix it. https://design-system.service.gov.uk/patterns/validation/

W3C requires detected errors to be identified and described in text and recommends giving users correction, confirmation, and undo opportunities where appropriate. https://www.w3.org/WAI/tutorials/forms/validation/

## Rules

### 5.1 Validation timing

There is no universal “validate everything on blur” rule.

The default model is:

1. **Allow entry without premature interruption.**
2. **Validate local constraints when the user reasonably completes the field.**
3. **Perform authoritative validation at submit/save.**
4. **Render server errors into the same error system.**

GOV.UK recommends waiting until the user attempts to continue or submit by default rather than interrupting entry prematurely. https://design-system.service.gov.uk/patterns/validation/

Apple notes that validation timing can vary by context; for example, some inputs can be checked when leaving a field while username/password constraints may warrant earlier feedback. https://developer.apple.com/design/human-interface-guidelines/text-fields

#### Validate on blur when:

- the constraint is unambiguous;
- feedback helps the next decision;
- the user has entered a meaningful value;
- validation is cheap and local.

Examples:

- invalid email syntax;
- latitude outside valid bounds;
- malformed identifier.

#### Validate while typing only when:

- feedback is inherently continuous;
- intermediate invalid states are expected and not presented as errors.

Examples:

- character count;
- password-strength indicator;
- live preview;
- search suggestions.

A field MUST NOT show **“Required”** merely because the user tabbed through it before deciding whether to complete it, unless the workflow explicitly demands immediate completion.

### 5.2 Submit validation

Full-form validation MUST occur on submit/save regardless of earlier client checks.

Client validation MUST NOT be treated as a security boundary or canonical data validation layer.

### 5.3 Error anatomy

Every actionable error SHOULD answer:

**What is wrong? → What constraint applies? → How can I fix it?**

Example:

```text
Elevation must be between -430 m and 8,849 m.
```

Not:

```text
Invalid value.
```

Error messages SHOULD name the field when the field is not immediately obvious.

### 5.4 Field-level errors

Field-level errors MUST:

- appear adjacent to the affected field;
- be programmatically associated with it;
- use text in addition to visual styling;
- preserve the invalid value when safe;
- clear only once the underlying problem is resolved.

### 5.5 Form-level errors

A form-level error is appropriate when:

- fields are valid individually but invalid together;
- the server rejected the operation as a whole;
- permissions changed;
- the record became stale;
- a dependency is unavailable.

Example:

```text
The start date must be earlier than the end date.
```

This error MAY also be referenced by both affected controls.

### 5.6 Error summary

Long, complex, or multi-error forms SHOULD include an error summary.

The summary MUST:

- appear near the start of the form;
- state that submission failed;
- list actionable errors;
- link/focus to affected controls where possible;
- avoid merely duplicating “Error” repeatedly.

GOV.UK recommends focusing the error summary after failed submission and prefixing the page title with “Error:” so the problem is discoverable to assistive technology. https://design-system.service.gov.uk/patterns/validation/

### 5.7 Preserve user input

A recoverable validation or server error MUST NOT erase valid user-entered data.

GOV.UK explicitly recommends redisplaying fields as the user entered them after validation failure. https://design-system.service.gov.uk/patterns/validation/

Exceptions require a security justification, such as certain secret fields.

### 5.8 Async validation

Asynchronous checks MUST expose state.

Use:

```text
Checking…
Available
Already in use
Couldn’t check. Try again.
```

Async checks SHOULD NOT block unrelated typing.

If the server result becomes stale after the field changes, the stale result MUST NOT remain displayed as current.

### 5.9 Server-side errors

Server errors MUST map into one of:

- field-level validation;
- cross-field/form validation;
- permission/authentication failure;
- network/transient failure;
- conflict;
- unknown failure.

Do not surface raw API messages, stack traces, database constraints, status codes, or exception text to end users.

### 5.10 Success feedback

Success feedback MUST match the persistence model.

Examples:

- explicit submit → confirmation page/message;
- explicit save → **Saved** state;
- autosave → subtle persistent status;
- optimistic action → immediate state plus rollback path if server fails.

Do not display “Saved” before persistence is confirmed unless the UI explicitly represents an optimistic state.

### 5.11 Preventing error before validation

The UI SHOULD prevent impossible input where doing so does not impair editing.

Examples:

- date picker prevents selecting unavailable dates;
- coordinate mode establishes latitude/longitude fields;
- select control limits values to known options.

However, fields MUST permit normal intermediate editing states. A numeric field, for example, may temporarily contain `-` or `1.` while the user types.

## Anti-patterns

- validating every keystroke as an error;
- clearing erroneous input;
- red border with no message;
- “Something went wrong” for a correctable field error;
- raw database errors;
- scrolling to the top without explaining why;
- disabled submit with no explanation;
- stale “available” indicator after changing a username.

## Checklist

- [ ] Timing is intentional.
- [ ] Server still validates.
- [ ] Error says what/how to fix.
- [ ] Invalid value remains editable.
- [ ] Error is associated with control.
- [ ] Summary exists for complex failures.
- [ ] Async state is visible.
- [ ] Server errors map to UX categories.
- [ ] Success state matches persistence truth.

## Canonical summary

**Validation MUST help users recover; it MUST NOT punish them for normal entry behavior.**

---

# 6. Advanced Inputs

## Purpose

Use specialized controls only when they materially improve accuracy or efficiency over standard fields.

Carbon distinguishes selection controls, searchable combo boxes, multiselects, bound numeric controls, date/time pickers, sliders, and file uploaders according to data-entry needs. https://preview.carbondesignsystem.com/building-blocks/core/patterns/forms

Adobe Spectrum similarly describes combobox text input as a way to make larger choice lists easier to search. https://spectrum.adobe.com/page/combo-box/

## Rules

## 6.1 Combobox

Use a combobox when:

- a user selects one value;
- options are numerous;
- type-ahead materially helps discovery.

A combobox MUST support:

- keyboard navigation;
- visible current selection;
- clearable selection where null is valid;
- no-results state;
- loading state for remote options;
- resilient handling of stale/failed search.

Do not use a combobox for four obvious options that fit comfortably as radios or a select.

---

## 6.2 Multi-select with chips

Use for selecting multiple items from a searchable set.

The field SHOULD support:

- search;
- checkbox or selected-state indication;
- removal from the selected-value region;
- selected count;
- keyboard removal/navigation.

If selected items can become numerous, chips MUST NOT expand indefinitely.

Prefer:

```text
Forest
Wetland
Agriculture
+12 more
```

with an expandable selected list.

A remove icon MUST have an accessible name such as **Remove Wetland**.

---

## 6.3 Tag input

A tag input differs from a multiselect because users can create values.

Tag entry SHOULD support:

- Enter to commit;
- paste of delimited lists where useful;
- duplicate detection;
- explicit invalid-token messages;
- edit/remove;
- normalization rules visible to the user if meaningful.

Tags MUST NOT silently change spelling or case where those distinctions carry meaning.

---

## 6.4 Date input and date picker

Users MUST be able to understand the date format independent of the calendar.

Date pickers SHOULD supplement, not unnecessarily replace, efficient typed entry.

Apple provides date-picker modes suited to space and selection context, and notes that selection can occur through touch, keyboard, or pointer. https://developer.apple.com/design/human-interface-guidelines/pickers

The UI MUST make clear:

- expected locale/format where ambiguous;
- unavailable dates;
- minimum/maximum;
- whether start/end dates are inclusive.

---

## 6.5 Date ranges

Range pickers MUST:

- distinguish start from end;
- expose invalid ordering;
- preserve both values after an error;
- indicate blocked dates;
- support typed correction.

Do not communicate range solely by background color on a calendar.

---

## 6.6 Time and timezone

Any date-time representing a real instant MUST make timezone assumptions explicit.

Show timezone close to the control:

```text
Start time
[ 09:00 ] Asia/Kuala_Lumpur (UTC+08:00)
```

or:

```text
Start time
[ 09:00 ]
Timezone
[ Asia/Kuala_Lumpur ▼ ]
```

The design MUST define whether:

- timezone is user profile timezone;
- record timezone;
- organization timezone;
- UTC;
- manually selected.

A system MUST NOT silently convert an entered wall-clock time to another timezone without communicating the conversion.

For events crossing DST boundaries, the product SHOULD retain named timezone information where domain requirements depend on civil time rather than only a fixed offset.

---

## 6.7 Number inputs

Number inputs MUST distinguish:

- integer versus decimal;
- negative allowed/not allowed;
- minimum/maximum;
- precision;
- step;
- unit.

Apple recommends number formatting appropriate to locale and warns that numeric presentation varies across locales. https://developer.apple.com/design/human-interface-guidelines/text-fields

Formatting MUST NOT corrupt underlying precision.

---

## 6.8 Currency inputs

Currency controls MUST specify currency unambiguously.

Prefer:

```text
Amount
USD [ 1,250.00 ]
```

to relying on `$` when multiple dollar currencies are possible.

Formatting SHOULD be locale-aware while the persisted value remains canonical.

The product MUST define:

- smallest allowed increment;
- decimal precision;
- rounding;
- negative amounts;
- currency conversion behavior.

---

## 6.9 Sliders

A slider SHOULD be used only when relative position is useful.

Examples:

- opacity;
- percentage threshold;
- approximate radius;
- volume.

Precise or consequential values MUST provide a typed fallback.

```text
Cloud threshold
[────●────────]  [ 62 ] %
```

The slider and typed field MUST stay synchronized.

---

## 6.10 Duration

Duration MUST NOT be conflated with a clock time.

Prefer a structure such as:

```text
Duration
[ 2 ] hours  [ 30 ] minutes
```

for human editing.

For highly technical workflows, accepted duration notation MAY be allowed with explicit format guidance.

---

## 6.11 Colour picker

A color picker SHOULD provide both visual and textual entry.

Depending on domain, support:

- HEX;
- RGB;
- HSL;
- design token selection.

A swatch alone MUST NOT be the only means of identifying a color.

If choosing application colors, token selection SHOULD be preferred over arbitrary raw colors.

---

## 6.12 File and media upload

Uploads MUST expose per-file state.

Canonical lifecycle:

```text
Queued → Uploading → Processing → Complete
                     ↘ Failed → Retry
```

Uploads SHOULD provide:

- accepted types;
- maximum size before selection where possible;
- file name;
- file size;
- progress;
- cancel while uploading where technically safe;
- retry;
- remove;
- per-file error;
- post-upload processing state if applicable.

Security scanning or server processing MUST NOT be represented as upload progress.

If a file uploaded successfully but later processing failed, the UI MUST distinguish the two states.

---

## 6.13 Code editor

Use a code editor only where syntax-aware editing materially helps.

A code editor SHOULD support:

- monospace text;
- syntax highlighting;
- line numbers where useful;
- find;
- keyboard navigation;
- undo/redo;
- copy/paste;
- optional formatting;
- validation diagnostics.

Syntax highlighting MUST NOT be the only way to signal an error.

Keyboard focus MUST be escapable; Tab MUST NOT become an unavoidable keyboard trap.

---

## 6.14 JSON editor

A JSON editor SHOULD provide:

- syntax validation;
- line/column error location;
- formatting;
- raw text access;
- safe copy/paste;
- schema validation when a schema exists.

Do not silently auto-correct invalid JSON into a materially different object.

If structured-form and raw-JSON modes both edit the same data, mode switching MUST preserve semantics and warn before lossy conversion.

---

## 6.15 Coordinate picker

Coordinate pickers SHOULD synchronize map selection with editable numeric fields.

Canonical structure:

```text
Latitude   [ 3.139000 ]
Longitude  [ 101.686900 ]

[ Select on map ]
```

Map selection MUST NOT be the only method where precision matters.

A user SHOULD be able to:

- paste coordinates;
- edit numerically;
- place or move a marker;
- see validation;
- reset to previous value.

---

## 6.16 Polygon drawing

Polygon editors MUST provide:

- visible vertices;
- add/move/delete vertex operations;
- undo;
- clear;
- close-polygon behavior;
- invalid-geometry indication;
- equivalent data representation where expert workflows require it.

Where material, show:

- CRS;
- area;
- vertex count;
- geometry validity.

A map-only interface MUST NOT be the sole editing path for workflows requiring exact coordinate entry.

## Anti-patterns

- searchable combobox for three choices;
- 25 visible chips expanding the form;
- slider as the only way to enter an exact threshold;
- date picker with no typed path in expert workflows;
- timezone implied but invisible;
- `$` with unspecified currency;
- upload spinner with no file-level status;
- map picker without coordinates;
- code editor that traps Tab.

## Checklist

- [ ] Specialized input solves a real problem.
- [ ] Keyboard path exists.
- [ ] Typed fallback exists where precision matters.
- [ ] Loading/error states exist.
- [ ] Units/timezones are explicit.
- [ ] Upload processing is distinguishable from transfer.
- [ ] Map controls expose underlying data.
- [ ] Custom input behaves consistently with the system.

## Canonical summary

**Advanced controls SHOULD reduce entry burden without hiding the actual data being created.**

---

# 7. Bulk and Grid Editing

## Purpose

Support high-volume editing without forcing expert users through hundreds of individual form submissions.

## Rules

### 7.1 Inline cell edit

Inline editing is appropriate when users already understand the table context.

Editable cells MUST visibly distinguish:

- view state;
- edit state;
- changed/dirty state;
- invalid state;
- saving state;
- saved state when feedback is needed.

Common keyboard model:

```text
Enter     → edit/commit where appropriate
Escape    → cancel current edit
Tab       → commit and move forward
Shift+Tab → commit and move backward
```

The exact model MAY vary, but it MUST remain consistent across the grid.

### 7.2 Saving

A grid MUST make clear whether changes are:

- saved cell-by-cell;
- saved row-by-row;
- staged until **Save changes**;
- staged until import.

Do not mix models within one grid.

### 7.3 Spreadsheet paste

Grids intended for operational data entry SHOULD support multi-cell paste when users commonly work in spreadsheets.

Paste behavior MUST define:

- starting cell;
- row/column expansion;
- delimiter handling;
- whether headers are accepted;
- parsing;
- units;
- invalid values;
- excess rows/columns.

For large imports, a preview SHOULD appear before irreversible commit.

### 7.4 Validation at scale

Invalid rows MUST be discoverable without scanning the whole table.

Provide:

- total error count;
- row/cell highlighting;
- textual error;
- filter to invalid records;
- navigation to next error where valuable.

Example:

```text
18 of 240 rows contain errors.
[Show rows with errors]
```

Virtualized tables MUST NOT hide error state simply because an invalid row is offscreen.

### 7.5 Undo

Bulk editing SHOULD provide undo for local editing operations.

Where server-side writes happen immediately, undo SHOULD create a compensating operation rather than pretending the initial write never occurred.

### 7.6 Partial success

If only some rows can save, the product MUST disclose whether the operation is:

- all-or-nothing;
- partial;
- best effort.

After partial success, users MUST be able to identify:

- rows saved;
- rows rejected;
- reason rejected;
- next action.

### 7.7 Selection

Bulk actions MUST communicate scope.

Use language such as:

```text
Delete 8 selected records
```

rather than:

```text
Delete selected
```

when count is available.

## Anti-patterns

- committing on every keystroke;
- spreadsheet paste with no preview or undo;
- one generic error for 5,000 rows;
- errors visible only by red fill;
- silently dropping invalid pasted cells;
- “Save” whose scope is unclear;
- losing edits when sorting.

## Checklist

- [ ] Edit state is clear.
- [ ] Keyboard model is defined.
- [ ] Save scope is explicit.
- [ ] Spreadsheet paste behavior is specified.
- [ ] Error count/filter exists.
- [ ] Offscreen errors remain discoverable.
- [ ] Undo is considered.
- [ ] Partial success semantics are explicit.

## Canonical summary

**Bulk editing MUST preserve the speed of a spreadsheet without inheriting spreadsheet ambiguity.**

---

# 8. Rich Text, Markdown, Code and Structured Editors

## Purpose

Support long-form and structured authoring while protecting user work, document integrity, and security.

## Rules

### 8.1 Editor choice

Use plain textarea for simple prose.

Use Markdown when:

- users understand Markdown or can work through a formatting UI;
- text benefits from source portability;
- generated output must remain structurally simple.

Use rich text when:

- users require direct document-style formatting;
- authoring is the primary task;
- Markdown syntax would add unnecessary cognitive load.

### 8.2 Toolbar

A rich-text toolbar SHOULD expose common commands directly:

- heading;
- bold;
- italic;
- link;
- list;
- quote;
- code where relevant.

Rare actions MAY live in overflow.

Toolbar controls MUST:

- expose labels/tooltips;
- support keyboard focus;
- reflect active state;
- remain understandable without icon recognition alone.

### 8.3 Slash commands

Slash commands MAY supplement toolbars for expert productivity.

They MUST NOT be the sole way to discover essential capabilities.

Results SHOULD be searchable and keyboard navigable.

### 8.4 Keyboard shortcuts

Common platform conventions SHOULD be supported where appropriate.

Shortcut help SHOULD be discoverable for non-obvious commands.

Custom shortcuts MUST NOT override critical browser/OS commands without compelling justification.

### 8.5 Markdown editor

Markdown editors SHOULD offer:

- source mode;
- preview or rendered state;
- Markdown shortcuts where helpful;
- syntax errors where a constrained dialect applies.

If a toolbar inserts Markdown syntax, the insertion MUST respect the user's selection/cursor position.

### 8.6 Autosave and drafts

Long-form editors SHOULD persist draft state frequently enough that ordinary navigation or interruption does not destroy substantial work.

Saving status SHOULD be legible but quiet:

```text
Saving…
Saved just now
Couldn’t save
```

### 8.7 Conflict recovery

Editors MUST anticipate concurrent or stale versions where collaboration or multi-device use is possible.

A stale client MUST NOT silently overwrite newer server content in consequential workflows.

Conflict UX SHOULD offer one or more of:

- reload current;
- preserve my draft;
- compare changes;
- duplicate as new;
- merge where technically feasible.

### 8.8 Paste handling

Pasted content MUST be sanitized.

The editor SHOULD:

- retain meaningful headings, lists, links, emphasis, and tables when supported;
- remove unsafe scripts/events;
- normalize unsupported fonts and arbitrary styles;
- remove hidden tracking markup;
- handle pasted images according to upload policy.

Users SHOULD have a plain-text paste path.

### 8.9 Sanitization

Client sanitization MUST NOT be considered sufficient security.

Rendered rich text MUST pass through the product's trusted server-side sanitation/rendering policy.

Untrusted HTML MUST NOT execute arbitrary:

- scripts;
- event handlers;
- unsafe embeds;
- unsupported iframes;
- dangerous URLs.

### 8.10 Draft status

If an editor is autosaved but not published, the distinction MUST be explicit.

Examples:

```text
Draft — saved
Published 12 Sep 2026
```

Do not use **Saved** to imply **Published**.

## Anti-patterns

- autosave with no visible failure state;
- toolbar containing dozens of equal-priority buttons;
- slash commands as hidden mandatory navigation;
- pasting Word/Docs markup verbatim;
- silent last-write-wins conflict resolution;
- rendering arbitrary HTML;
- telling users “Saved” when only local state changed.

## Checklist

- [ ] Correct editor type chosen.
- [ ] Toolbar prioritizes common actions.
- [ ] Keyboard support exists.
- [ ] Drafts persist.
- [ ] Conflicts can recover.
- [ ] Paste is normalized.
- [ ] Unsafe HTML is sanitized.
- [ ] Saved vs published is distinct.

## Canonical summary

**Editors MUST protect both the user's work and the integrity of what eventually renders.**

---

# 9. Saving Models and State

## Purpose

Make persistence behavior predictable.

## Rules

### 9.1 Explicit save

Use explicit **Save** when:

- changes form one logical transaction;
- review before commit is valuable;
- changes are consequential;
- multiple fields must validate together;
- users expect control over publication or persistence.

The save button SHOULD become meaningfully actionable when changes exist.

### 9.2 Autosave

Use autosave when:

- editing is incremental;
- failures are recoverable;
- frequent explicit saves would create friction;
- partial states can safely persist.

Autosave MUST expose:

```text
Saving…
Saved
Couldn’t save
```

or an equally clear model.

Silent autosave failure is prohibited.

### 9.3 Dirty state

The application MUST know when local edits differ from persisted state.

A dirty indicator SHOULD be shown where loss risk is meaningful.

Do not warn users about leaving when everything has already been persisted.

### 9.4 Dirty-state navigation guard

Warn before navigation only when leaving would genuinely lose unsaved work.

The guard MUST provide:

- stay;
- leave/discard.

If a safe **Save and leave** flow exists, it SHOULD be available.

### 9.5 Draft recovery

Long or high-effort forms SHOULD recover drafts after:

- refresh;
- browser crash;
- authentication interruption;
- accidental navigation where feasible.

Recovered data MUST indicate its status:

```text
We restored an unsaved draft from 14:32.
```

### 9.6 Optimistic updates

Optimistic updates MAY be used for reversible, low-risk operations with high expected success.

The UI MUST be able to roll back or reconcile failure.

Good candidates:

- star/favorite;
- lightweight labels;
- reversible ordering.

Use caution for:

- payments;
- destructive actions;
- permission changes;
- complex multi-record writes.

### 9.7 Submit state

When a submit/save request is active:

- repeated identical submission MUST be prevented;
- button state SHOULD communicate progress;
- data MUST remain visible;
- navigation consequences MUST be defined.

API idempotency belongs to the API layer, but design MUST assume duplicate-click and retry scenarios exist.

### 9.8 Conflict state

If the underlying record changed since editing began:

```text
This record changed after you opened it.
```

The system SHOULD show recovery choices rather than silently overwriting.

### 9.9 Draft versus canonical record

The interface MUST distinguish:

- locally edited;
- locally cached;
- server-saved draft;
- published/committed;
- synchronization pending.

These are different application states and MUST NOT share one ambiguous “Saved” label.

## Anti-patterns

- autosave with no error state;
- persistent unsaved warning after successful save;
- button spinner forever after timeout;
- optimistic deletion with no recovery;
- silently overwriting concurrent edits;
- conflating local storage with server persistence.

## Checklist

- [ ] Save model selected intentionally.
- [ ] Dirty state exists.
- [ ] Failure state exists.
- [ ] Duplicate submission is handled.
- [ ] Draft recovery exists where justified.
- [ ] Optimistic failure can reconcile.
- [ ] Conflicts do not silently overwrite.
- [ ] Persistence terminology is precise.

## Canonical summary

**Users MUST be able to tell whether their work exists only on screen, in a draft, or in canonical persisted state.**

---

# 10. Accessibility, Mobile Input and Error-Free Submission

## Purpose

Ensure all form workflows can be understood and completed across input modalities and abilities.

W3C's Forms Tutorial calls for explicit labels, logical grouping, instructions, validation, user notifications, and manageable multi-page forms. https://www.w3.org/WAI/tutorials/forms/

## Rules

### 10.1 Accessible names

Every form control MUST have an accessible name.

Visible labels SHOULD normally provide that name.

Icon-only buttons such as chip removal or upload cancellation MUST expose specific names:

```text
Remove Wetland
Cancel upload of map.tif
```

### 10.2 Descriptions and errors

Help text and error messages MUST be programmatically connected to their controls.

An invalid state SHOULD expose appropriate accessibility state such as `aria-invalid` in implementation.

### 10.3 Grouping

Related radio buttons, checkboxes, coordinate fields, or compound questions SHOULD expose a group label/legend.

W3C specifically recommends semantic grouping for related controls. https://www.w3.org/WAI/tutorials/forms/grouping/

### 10.4 Focus

Keyboard focus MUST remain visible.

Custom controls MUST provide predictable navigation.

After failed full-form submission, focus SHOULD move to an actionable error summary where one exists, consistent with GOV.UK guidance. https://design-system.service.gov.uk/patterns/validation/

Do not automatically move focus for every inline validation message.

### 10.5 Color

Errors, warnings, selection, and success MUST NOT rely solely on color.

Use combinations of:

- text;
- iconography;
- border/state;
- accessible semantics.

### 10.6 Mobile keyboards

The product SHOULD request the keyboard best suited to the expected content.

Apple recommends presenting keyboard types appropriate to data such as numbers or URLs to streamline entry. https://developer.apple.com/design/human-interface-guidelines/text-fields

Typical mappings:

```text
email       → email keyboard
telephone   → telephone keyboard
URL         → URL keyboard
integer     → numeric keyboard
decimal     → decimal-capable keyboard
search      → search action
```

Keyboard optimization MUST NOT remove normal paste or hardware-keyboard operation.

### 10.7 Mobile layout

On narrow screens:

- fields SHOULD normally remain single-column;
- critical suffixes/units MUST remain visible;
- horizontal scrolling SHOULD NOT be required for ordinary forms;
- persistent actions MUST not obscure fields or error content;
- calendar/picker overlays MUST remain usable at viewport edges.

### 10.8 Keyboard completion

Forms MUST be completable without a pointing device.

Custom:

- comboboxes;
- menus;
- chips;
- grids;
- pickers;
- editors

require full keyboard pathways.

### 10.9 Error prevention

For destructive, financial, legal, irreversible, or high-impact operations, the product SHOULD provide appropriate prevention through:

- review;
- confirmation;
- undo;
- reversible staging.

W3C recommends confirmation and undo opportunities for irreversible or critical data entry. https://www.w3.org/WAI/tutorials/forms/validation/

### 10.10 Review before submit

A dedicated review screen SHOULD be used when users need to verify multiple high-impact values together.

Examples:

- financial transaction;
- irreversible import;
- publication;
- high-impact geospatial analysis parameters;
- account deletion;
- permission changes.

Review pages SHOULD display entered values in human-readable form and offer direct routes back to edit them.

### 10.11 Primary action availability

Submit actions SHOULD remain discoverable.

A product SHOULD NOT rely on an unexplained disabled button to teach users which requirement remains unmet.

If an action is disabled, the reason MUST be evident or inferable from nearby state.

### 10.12 Authentication-sensitive forms

Password and authentication fields MUST support password managers and appropriate autofill semantics where security policy permits.

Accessible authentication SHOULD avoid unnecessary memory or transcription burdens.

## Anti-patterns

- no visible label;
- focus indicator removed;
- red-only errors;
- inaccessible custom listbox;
- numeric keyboard for values that need minus or decimal input but cannot enter them;
- map drawing with no keyboard/text alternative;
- irreversible action with no confirmation or undo;
- mysterious disabled Submit button.

## Checklist

- [ ] Every field has an accessible name.
- [ ] Descriptions/errors are associated.
- [ ] Focus is visible.
- [ ] Keyboard completion works.
- [ ] State is not color-only.
- [ ] Appropriate mobile keyboard appears.
- [ ] Mobile layout remains readable.
- [ ] Critical operations include prevention/review.

## Canonical summary

**A form is not complete until it can be completed, corrected, and submitted without relying on sight, pointer precision, or hidden assumptions.**

---

# 11. Security, Data, API and Database Alignment

## Purpose

Prevent visual form design from creating ambiguity or security/data-integrity problems downstream.

## Rules

### 11.1 Validation authority

Client validation exists for UX.

Authoritative validation belongs on the trusted server/API boundary.

A field that passes UI validation MUST still be treated as untrusted input downstream.

### 11.2 Canonical values

Display formatting and stored values MUST be distinguished.

Examples:

```text
Display: 1,250.50
Stored:  1250.50

Display: 2.5 km
Stored:  2500 m

Display: 23 Sep 2026, 09:00 MYT
Stored:  canonical timestamp + required zone metadata
```

### 11.3 Null versus empty

Design MUST distinguish when relevant:

- not entered;
- intentionally none;
- zero;
- empty string;
- deleted value.

A **None** option SHOULD be explicit where null carries domain meaning.

### 11.4 Precision

The UI MUST NOT display more apparent precision than the data supports.

Conversely, entering a precise value MUST NOT be silently rounded without communicating the result where precision matters.

### 11.5 API field errors

APIs SHOULD expose machine-readable error identifiers/paths.

The UI SHOULD map these to human-readable error templates rather than showing server strings verbatim.

Conceptually:

```text
API:
{
  "field": "latitude",
  "code": "OUT_OF_RANGE"
}

UI:
Latitude must be between -90° and 90°.
```

### 11.6 Sensitive values

Secrets SHOULD not be redisplayed after submission unless product requirements explicitly permit it.

Sensitive values MAY use:

- reveal/hide controls;
- copy;
- regenerate;
- one-time display.

Security behavior MUST be deliberate rather than inherited from ordinary text fields.

### 11.7 Upload security

Upload design MUST anticipate server checks such as:

- malware scanning;
- MIME validation;
- extension mismatch;
- image/media processing;
- geospatial dataset parsing.

The UI MUST describe these as processing states rather than implying local file validation proves safety.

### 11.8 Rich-content security

Pasted or authored rich content MUST be treated as untrusted.

Editor formatting capability MUST correspond to server sanitation policy.

Do not offer an embed type the server cannot safely represent.

## Anti-patterns

- storing localized formatted numbers directly;
- treating empty string and null interchangeably without specification;
- truncating coordinate precision silently;
- printing raw API errors;
- trusting uploaded extension alone;
- rendering arbitrary editor HTML.

## Checklist

- [ ] Display and canonical values are specified.
- [ ] Null semantics are known.
- [ ] Precision/rounding is known.
- [ ] Server errors map to UI errors.
- [ ] Sensitive fields have deliberate behavior.
- [ ] Upload processing states are modeled.
- [ ] Rich content sanitation matches editor capability.

## Canonical summary

**The form is a view onto the data contract; it MUST NOT invent a different contract.**

---

# 12. Common Error and Status Copy Templates

## Purpose

Standardize actionable, specific error language.

GOV.UK advises explaining what went wrong and how to fix it rather than using generic error language. https://design-system.service.gov.uk/components/error-message/

## Rules

Messages SHOULD:

- use plain language;
- name the affected concept;
- explain the valid condition;
- provide a corrective action where non-obvious;
- avoid blaming the user;
- avoid internal implementation language;
- omit punctuation-heavy alert styling.

## Templates

| Situation | Canonical template |
|---|---|
| Required | `Enter [field].` |
| Required selection | `Select [option/category].` |
| Invalid format | `Enter [field] in the format [example].` |
| Too short | `[Field] must contain at least [N] characters.` |
| Too long | `[Field] must contain [N] characters or fewer.` |
| Below minimum | `[Field] must be at least [minimum] [unit].` |
| Above maximum | `[Field] must be no more than [maximum] [unit].` |
| Numeric range | `[Field] must be between [minimum] and [maximum] [unit].` |
| Invalid date | `Enter a valid [date name].` |
| Date ordering | `[End date] must be after [start date].` |
| Future restriction | `[Date] must be today or earlier.` |
| Currency | `Enter an amount in [currency code].` |
| Latitude | `Latitude must be between -90° and 90°.` |
| Longitude | `Longitude must be between -180° and 180°.` |
| Missing CRS | `Select the coordinate reference system used by these coordinates.` |
| Polygon invalid | `The polygon is not valid. Adjust the highlighted boundary before continuing.` |
| Duplicate value | `[Value] has already been added.` |
| Name unavailable | `[Name] is already in use. Choose another.` |
| Upload too large | `[Filename] is larger than the [size] limit.` |
| Unsupported upload | `[Filename] is not a supported file type. Upload [accepted types].` |
| Upload interrupted | `Upload failed for [filename]. Retry the upload.` |
| Processing failure | `[Filename] uploaded, but we could not process it. Check the file and try again.` |
| Generic transient save | `We couldn’t save your changes. Your entries are still here. Try again.` |
| Connectivity | `We couldn’t connect to the service. Check your connection and try again.` |
| Permission | `You no longer have permission to change [record].` |
| Conflict | `This record changed after you opened it. Review the latest version before saving.` |
| Bulk validation | `[N] of [total] rows contain errors. Fix the highlighted cells before importing.` |
| Partial bulk save | `[N] records were saved. [M] could not be saved and need attention.` |
| Code/JSON syntax | `Fix the syntax error on line [N], column [M].` |
| Async check failed | `We couldn’t check [field] right now. Try again.` |
| Save success | `Changes saved.` |
| Draft recovery | `We restored an unsaved draft from [time].` |
| Autosave failure | `Couldn’t save. Your changes are still on this device.` |

## Error anatomy example

Bad:

```text
Invalid.
```

Better:

```text
Longitude must be between -180° and 180°.
```

Bad:

```text
Upload failed.
```

Better:

```text
survey.geojson could not be uploaded. Check your connection and retry.
```

## Anti-patterns

- “Invalid input”
- “Error 422”
- “Something went wrong” when the system knows what went wrong
- “You entered the wrong value”
- displaying database constraint names
- displaying regex patterns as instructions
- using success copy before persistence completes

## Checklist

- [ ] Field/concept named.
- [ ] Constraint explained.
- [ ] Recovery obvious.
- [ ] No blame.
- [ ] No backend jargon.
- [ ] Status reflects actual persistence.

## Canonical summary

**An error message SHOULD tell users what must change, not merely announce that the system disapproves.**

---

# 13. Form Review Checklist

## Purpose

Provide the mandatory design review before implementation or release.

## Architecture

- [ ] Form has one clear task outcome.
- [ ] Unnecessary data collection has been removed.
- [ ] Single-column flow is the default.
- [ ] Any multi-column rows contain strongly related fields.
- [ ] Section hierarchy maps to user concepts.
- [ ] Progressive disclosure hides only conditional content.
- [ ] Multi-step decomposition is justified.
- [ ] Progress representation is truthful.
- [ ] Back navigation behavior is defined.

## Field anatomy

- [ ] Every control has a persistent visible label where appropriate.
- [ ] Required/optional convention is consistent.
- [ ] Help text adds useful context.
- [ ] Placeholder is not the only instruction.
- [ ] Field width reflects expected value where useful.
- [ ] Character counter exists only for meaningful constraints.
- [ ] Units/suffixes remain visible.
- [ ] Precision and rounding are specified.
- [ ] Appropriate autocomplete purpose is defined.
- [ ] Spellcheck/autocorrect behavior matches content.

## Validation

- [ ] Validation timing is specified.
- [ ] Submission always receives server validation.
- [ ] Field errors are specific.
- [ ] Cross-field errors are represented.
- [ ] Error summary exists where appropriate.
- [ ] Error focus behavior is specified.
- [ ] Entered values survive failures.
- [ ] Async validation has loading/error/success states.
- [ ] Server/API errors map to product language.

## Advanced controls

- [ ] Combobox is used only where search is useful.
- [ ] Multi-select remains manageable at high selection counts.
- [ ] Tag duplicates/invalid values are handled.
- [ ] Date picker allows efficient correction.
- [ ] Timezone assumptions are visible.
- [ ] Number/currency locale behavior is specified.
- [ ] Slider has a typed fallback when precision matters.
- [ ] Duration is distinct from clock time.
- [ ] Color values have a textual path.
- [ ] Upload supports progress/failure/retry.
- [ ] Code/JSON editors expose textual diagnostics.
- [ ] Coordinate/map controls expose numeric values.
- [ ] Polygon editing supports undo and validation.

## Bulk/grid

- [ ] Editable cells are recognizable.
- [ ] Keyboard edit model exists.
- [ ] Save scope is explicit.
- [ ] Spreadsheet paste behavior is designed.
- [ ] Bulk paste can be undone or previewed.
- [ ] Invalid rows can be filtered/found.
- [ ] Partial-success behavior is explicit.

## Editors

- [ ] Editor type matches user skill and content.
- [ ] Essential formatting is discoverable.
- [ ] Keyboard shortcuts do not trap users.
- [ ] Autosave state is visible.
- [ ] Draft recovery exists where justified.
- [ ] Concurrent edits have a conflict strategy.
- [ ] Paste is sanitized and normalized.
- [ ] Server rendering sanitizes untrusted content.

## Saving/state

- [ ] Explicit save vs autosave is chosen deliberately.
- [ ] Dirty state is modeled.
- [ ] Navigation-loss warning appears only when needed.
- [ ] Duplicate submission is prevented.
- [ ] Optimistic failure can roll back.
- [ ] Draft and published states are distinct.
- [ ] Conflict handling is defined.

## Accessibility/mobile

- [ ] Accessible name exists for every control.
- [ ] Descriptions/errors are programmatically related.
- [ ] Logical keyboard order exists.
- [ ] Focus remains visible.
- [ ] Custom controls are keyboard operable.
- [ ] State is not communicated by color alone.
- [ ] Appropriate mobile keyboard/input mode is selected.
- [ ] Form works without horizontal scrolling.
- [ ] Destructive/critical submission has review, confirmation, or undo where appropriate.

## Security/data/API

- [ ] UI constraints match authoritative server constraints.
- [ ] Canonical storage values are defined.
- [ ] Null/empty/zero semantics are defined.
- [ ] Sensitive-value display behavior is defined.
- [ ] Rich text is sanitized.
- [ ] Upload security/process states are designed.
- [ ] Raw API/database errors cannot surface directly.

## Canonical summary

**A form is release-ready only when entry, correction, persistence, failure, recovery, accessibility, and data semantics have all been reviewed.**

---

# 14. Cross-System Anti-Patterns

## Purpose

Identify patterns that are prohibited across the product.

## Rules

The following MUST NOT become standard product behavior:

1. Placeholder-only inputs.
2. Multi-column layouts for unrelated questions.
3. Hidden units.
4. Ambiguous timezones.
5. Generic “Invalid value” errors.
6. Error indication by color alone.
7. Clearing forms after validation failure.
8. Client validation treated as authoritative.
9. Map-only coordinate entry.
10. Slider-only exact-value entry.
11. Autosave without failure status.
12. Disabled primary actions with unexplained requirements.
13. Rich-text HTML rendered without sanitation.
14. Silent conflict overwrite.
15. Upload completion conflated with server processing.
16. Spreadsheet paste that silently discards values.
17. Grid errors discoverable only by scrolling.
18. Generated draft state described as published.
19. Storage/database terminology exposed as form language.
20. Custom controls created merely for visual novelty.

## Checklist

- [ ] None of the prohibited patterns exist.
- [ ] Exceptions have explicit documented rationale.
- [ ] Exception does not undermine accessibility or data integrity.

## Canonical summary

**Complexity is acceptable when the domain requires it; accidental complexity is not.**

---

# 15. Canonical Decision Rules

## Purpose

Provide fast defaults when teams do not need a novel form interaction.

## Rules

When uncertain:

**Layout**  
→ Use one column.

**Label**  
→ Put it visibly above the field.

**Placeholder**  
→ Do not use it as the label.

**Optional field**  
→ Remove it if unnecessary; otherwise mark it clearly.

**Help text**  
→ Explain what changes the answer.

**Validation**  
→ Avoid interrupting entry; validate at a sensible completion point and always on submit.

**Error**  
→ Say what is wrong and how to fix it.

**Failure**  
→ Preserve input.

**Large option list**  
→ Use a searchable combobox.

**Multiple large-list choices**  
→ Use searchable multiselect.

**Exact number**  
→ Use typed input.

**Approximate bounded number**  
→ Slider plus typed input.

**Date**  
→ Support efficient typed entry and an appropriate picker.

**Date-time**  
→ Show timezone.

**Measurement**  
→ Show unit outside the editable value.

**Coordinate**  
→ Label latitude and longitude separately and expose CRS when material.

**Map value**  
→ Pair map interaction with text/numeric representation.

**Upload**  
→ Show per-file progress, failure, cancel/retry where applicable.

**Long-form content**  
→ Use drafts/autosave with visible status.

**Concurrent edit**  
→ Detect conflicts; do not silently overwrite.

**Bulk data**  
→ Support spreadsheet-style efficiency plus explicit validation and undo.

**Critical submission**  
→ Provide review, confirmation, or undo proportional to consequence.

## Anti-patterns

Any deviation from these defaults without domain evidence SHOULD be challenged in design review.

## Checklist

- [ ] Deviations are intentional.
- [ ] User/domain evidence supports them.
- [ ] System consistency is preserved.

## Canonical summary

**Default to boring, explicit, recoverable controls. Spend complexity only where it measurably improves the task.**

---

# 16. Gold Standard Summary

A Gold Standard form in 2026 behaves as one coherent data-entry system.

It:

- asks only for necessary information;
- uses a predictable vertical architecture;
- keeps labels and units visible;
- accepts reasonable user notation;
- validates without interrupting normal thought;
- preserves values after failure;
- treats server validation as authoritative;
- exposes async state;
- distinguishes field, form, network, permission, and conflict errors;
- provides precise controls for numbers, dates, timezones, coordinates, files, code, and geometry;
- allows expert users to edit at scale;
- protects long-form drafts;
- resolves concurrent-edit conflicts explicitly;
- remains accessible by keyboard, touch, autofill, and assistive technology;
- aligns display values with API and database semantics;
- uses the system's semantic tokens and shadcn/ui component grammar;
- protects users from irreversible mistakes;
- tells the truth about whether data is unsaved, saving, saved, draft, or published.

The canonical principle is:

> **Data entry MUST preserve user intent from the moment a value is entered until the moment its canonical state is safely persisted.**

---

# Sources

1. **W3C Web Accessibility Initiative — Forms Tutorial**  
   https://www.w3.org/WAI/tutorials/forms/

2. **W3C WAI — Labeling Controls**  
   https://www.w3.org/WAI/tutorials/forms/labels/

3. **W3C WAI — Form Instructions**  
   https://www.w3.org/WAI/tutorials/forms/instructions/

4. **W3C WAI — Validating Input**  
   https://www.w3.org/WAI/tutorials/forms/validation/

5. **W3C WAI — Grouping Controls**  
   https://www.w3.org/WAI/tutorials/forms/grouping/

6. **W3C WCAG 2.2 — Identify Input Purpose**  
   https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html

7. **GOV.UK Design System — Recover from validation errors**  
   https://design-system.service.gov.uk/patterns/validation/

8. **GOV.UK Design System — Error message**  
   https://design-system.service.gov.uk/components/error-message/

9. **GOV.UK Design System — Question pages**  
   https://design-system.service.gov.uk/patterns/question-pages/

10. **Nielsen Norman Group — Website Forms Usability: Top 10 Recommendations**  
    https://www.nngroup.com/articles/web-form-design/

11. **Apple Human Interface Guidelines — Text fields**  
    https://developer.apple.com/design/human-interface-guidelines/text-fields

12. **Apple Human Interface Guidelines — Pickers**  
    https://developer.apple.com/design/human-interface-guidelines/pickers

13. **IBM Carbon Design System — Forms**  
    https://preview.carbondesignsystem.com/building-blocks/core/patterns/forms

14. **Adobe Spectrum — Combo box**  
    https://spectrum.adobe.com/page/combo-box/

15. **Material Design 3 — Text fields**  
    https://m3.material.io/components/text-fields/guidelines

16. **Material Design 3 — Date pickers**  
    https://m3.material.io/components/date-pickers/overview

17. **shadcn/ui — Theming and semantic tokens**  
    https://ui.shadcn.com/docs/theming

I can also turn this into the companion **Forms & Validation engineering Gold Standard**, with Zod/schema contracts, React Hook Form/TanStack Form patterns, Server Actions/API error schemas, optimistic mutation rules, draft persistence, and shadcn/ui implementation examples.
