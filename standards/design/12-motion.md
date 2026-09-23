---
id: "motion"
title: "Motion & Interaction"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "motion", "interaction"]
applies_to: ["ui"]
related: []
legacy_number: 62
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 50913
provenance: baseline

---

The document below is intended to sit directly under **Design Tokens → Motion → Components → Patterns**, with motion defined as a shared system rather than per-component decoration.

# Motion & Interaction Guidelines — Gold Standard 2026

**Canonical placement:** Design Tokens → Motion → Components → Patterns  
**Status:** Gold Standard 2026  
**Component baseline:** shadcn/ui for application components and interaction states  
**Accessibility baseline:** WCAG 2.2 AA minimum, with corpus-level reduced-motion requirements extending beyond minimum conformance where necessary  
**Performance baseline:** compositor-friendly motion, explicit frame-budget testing, and zero dependency on animation for application correctness

---

# 1. Purpose

## 1.1 Scope

This standard defines the canonical requirements for motion, transition, animation, and gesture behaviour across product interfaces.

It covers:

- duration scales;
- easing scales;
- motion design tokens;
- choreography and sequencing;
- component state transitions;
- page and route transitions;
- micro-interactions;
- loading indicators;
- skeleton-to-content transitions;
- loading personality;
- enter and exit transitions;
- overlays, dialogs, sheets, menus, and popovers;
- gesture-driven interaction;
- drag and drop;
- scroll-linked motion;
- real-time and data-update animation;
- reduced-motion behaviour;
- animation performance;
- motion state management;
- accessibility;
- cases where animation MUST NOT be used.

This standard applies to:

- web applications;
- responsive application interfaces;
- administrative and analytical products;
- design-system components;
- mobile web experiences;
- interactive data products;
- stateful application workflows.

---

## 1.2 Design objective

Motion MUST communicate state, continuity, hierarchy, causality, or direct manipulation.

Motion MUST NOT exist merely because an element can be animated.

Every animation SHOULD answer at least one of these questions:

1. **What changed?**
2. **Where did it come from or go?**
3. **What caused the change?**
4. **What is currently happening?**
5. **What can the user interact with?**
6. **Which element is now important?**

If an animation does not improve one of these interpretations, it SHOULD be removed.

Motion MUST NOT:

- delay completion of a user task;
- obscure application state;
- compensate for unclear information architecture;
- disguise latency;
- become necessary to understand essential information;
- override an explicit reduced-motion preference.

---

## 1.3 Motion is part of interaction design

Motion MUST be considered part of the interaction contract, not a decorative post-processing layer.

A transition affects:

- perceived causality;
- navigation orientation;
- input responsiveness;
- accessibility;
- state timing;
- rendering performance.

Animation logic MUST therefore align with:

- application state;
- component state;
- browser lifecycle;
- route lifecycle;
- asynchronous operations;
- accessibility preferences.

Animation completion MUST NOT be used as the canonical source of business-state truth.

The application state MUST remain correct if animations:

- are disabled;
- are skipped;
- are interrupted;
- finish early;
- never receive a completion callback.

---

## 1.4 Relationship to other standards

Motion implementations MUST conform to the corpus standards for:

- **Security** — secure transitions, disclosure, sensitive content, confirmation flows;
- **Data & Database** — data semantics MUST NOT be distorted through animated interpolation;
- **API** — loading states MUST correspond to actual request state;
- **State Management** — animation state MUST remain subordinate to domain and UI state;
- **Forms & Validation** — validation, submission, pending, and success states;
- **Accessibility** — reduced motion, keyboard operation, focus, flashing, motion sensitivity;
- **Design Tokens** — duration, easing, spacing, opacity, colour, elevation;
- **Components** — standard states and shadcn/ui primitives;
- **Patterns** — loading, navigation, overlays, notifications, drag-and-drop, disclosure;
- **Performance** — rendering cost, frame budgets, resource management.

A motion library MUST NOT create a parallel interaction architecture.

---

# 2. Rules

## 2.1 Motion MUST use design tokens

Application motion MUST use canonical duration and easing tokens.

Individual feature components MUST NOT introduce arbitrary duration values or easing curves when an existing token expresses the required behaviour.

Canonical CSS token naming SHOULD follow:

- `--motion-duration-*`;
- `--motion-ease-*`.

Components MAY expose semantic aliases such as:

- `--dialog-duration`;
- `--tooltip-duration`;
- `--route-duration`;

but those aliases SHOULD resolve to canonical motion tokens.

---

## 2.2 Canonical duration scale

The Gold Standard 2026 duration scale is:

| Token | Duration | Intended use |
|---|---:|---|
| `motion-instant` | `0ms` | Reduced-motion replacement, immediate state changes |
| `motion-1` | `80ms` | Press, highlight, very small visual response |
| `motion-2` | `120ms` | Tooltip, hover, compact micro-interaction |
| `motion-3` | `180ms` | Standard component transition |
| `motion-4` | `240ms` | Dialog, popover, accordion, moderate spatial transition |
| `motion-5` | `320ms` | Large overlay, sheet, deliberate structural change |
| `motion-6` | `480ms` | Exceptional large-scale or illustrative transition |
| `motion-7` | `700ms` | Storytelling/onboarding only; MUST NOT be routine application motion |

Durations between tokens SHOULD NOT be invented without a documented design-system requirement.

### 2.2.1 Normal application ceiling

Routine component interaction SHOULD complete within **320ms**.

Ordinary application transitions MUST NOT exceed **480ms** unless:

- the animation represents deliberate spatial movement;
- the product is instructional or narrative;
- the motion cannot preserve meaning at a shorter duration.

Animations above 700ms MUST NOT be used for ordinary application interaction.

---

## 2.3 Duration MUST scale with perceived distance

Duration MAY increase when:

- an element travels a larger visible distance;
- a large region enters or leaves;
- spatial continuity materially aids orientation.

Duration SHOULD decrease when:

- the affected object is small;
- the state change is local;
- the interaction is repeated frequently;
- the user directly initiated the change.

A checkbox state SHOULD NOT take as long to animate as a full-height sheet.

Repeated expert workflows SHOULD generally use less motion than first-run explanatory experiences.

---

## 2.4 Canonical easing scale

Motion MUST use a small, named easing set.

Recommended canonical values:

| Token | Value | Purpose |
|---|---|---|
| `motion-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | General-purpose state transition |
| `motion-ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering or settling |
| `motion-ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving |
| `motion-ease-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | Larger deliberate spatial transitions |
| `motion-ease-linear` | `linear` | Progress, continuous rotation, time-proportional motion |

Product teams MAY tune the exact curves centrally through Design Tokens.

Feature code MUST NOT create arbitrary cubic Bézier curves for individual components.

---

## 2.5 Easing semantics

Entering elements SHOULD decelerate as they settle.

Exiting elements SHOULD generally accelerate away.

State changes occurring entirely in place SHOULD use the standard easing.

Linear easing SHOULD be used only when progression itself is intended to feel constant, such as:

- determinate progress;
- continuous rotation;
- timeline playback.

Linear easing SHOULD NOT be the default for spatial UI transitions.

Exaggerated bounce or elastic easing MUST NOT be used for:

- errors;
- destructive actions;
- authentication;
- security prompts;
- critical alerts;
- routine enterprise interaction.

---

## 2.6 Spring motion

Spring-based motion MAY be used for:

- direct manipulation;
- drag release;
- snapping;
- inertial settling;
- physically continuous interfaces.

Spring configuration MUST be tokenized if springs are used systematically.

Feature teams MUST NOT independently tune arbitrary:

- stiffness;
- damping;
- mass;
- bounce

values for visually equivalent interactions.

Springs MUST settle quickly enough that controls do not feel unstable.

Persistent oscillation SHOULD NOT be used in normal application components.

Reduced-motion mode MUST replace substantial spring movement with immediate or near-immediate state changes.

---

## 2.7 Motion amplitude

Distance is as important as duration.

Large-screen translation SHOULD be minimized.

Small structural transitions SHOULD typically use small movement distances, such as:

- a few pixels of vertical translation;
- short directional slides;
- restrained scaling.

Interface elements SHOULD NOT routinely fly across large portions of the viewport.

Full-screen lateral motion MUST have a strong spatial-navigation reason.

Large zoom, pan, scale, and parallax effects SHOULD be considered vestibular-sensitive motion and MUST have an appropriate reduced-motion variant.

---

## 2.8 Choreography

Related animations SHOULD behave as one coordinated transition.

Choreography MUST reinforce information hierarchy.

Primary state change SHOULD generally begin before subordinate decorative movement.

A parent surface MAY establish motion before internal children become visible.

Animation choreography MUST NOT force users to wait while decorative child sequences finish.

### 2.8.1 Staggering

Staggering MAY be used for small groups when it improves:

- hierarchy;
- continuity;
- initial comprehension.

Stagger intervals SHOULD generally remain between **20ms and 40ms**.

Total stagger delay SHOULD NOT exceed approximately **180ms** in routine UI.

Large lists MUST NOT animate every row sequentially.

For long collections:

- animate only the container;
- animate the first small visible subset;
- or do not stagger.

A list containing hundreds of records MUST NOT create hundreds of delayed animations.

---

## 2.9 Parallel versus sequential motion

Independent state changes SHOULD animate in parallel.

Sequential animation SHOULD be reserved for cases where sequence communicates causality.

For example:

1. trigger activates;
2. surface opens;
3. contextual content becomes available.

Sequential choreography MUST NOT be used merely to make an interface appear cinematic.

A sequence MUST NOT delay access to already available controls.

---

## 2.10 Micro-interactions

Micro-interactions SHOULD provide immediate acknowledgement of direct input.

Examples include:

- button press;
- toggle state;
- checkbox selection;
- favorite/save;
- copy confirmation;
- disclosure indicator;
- drag pickup;
- drop confirmation.

Local visual acknowledgement SHOULD begin immediately or by the next available rendered frame after local state changes.

Artificial latency MUST NOT be introduced merely so an animation can play.

Routine micro-interactions SHOULD generally use `motion-1`, `motion-2`, or `motion-3`.

---

## 2.11 Hover states

Hover motion MUST be subtle.

Hover MUST NOT:

- significantly reposition content;
- cause surrounding layout to move;
- be required to discover essential functionality;
- produce repeated large-scale animation as the pointer traverses a collection.

Hover effects SHOULD use:

- colour;
- opacity;
- border;
- shadow;
- small transform changes

where appropriate.

Cards MUST NOT repeatedly jump or scale enough to cause visual instability while the pointer moves between adjacent items.

Touch users MUST NOT depend on hover behaviour.

---

## 2.12 Press states

Interactive controls SHOULD provide immediate press feedback.

Press feedback SHOULD be short and local.

Scaling MAY be used where appropriate, but SHOULD remain restrained.

A button SHOULD NOT shrink enough to change pointer targeting or surrounding layout.

Press animation MUST NOT delay the associated action.

---

## 2.13 Focus states

Keyboard focus MUST NOT depend on motion.

Focus indication MUST remain persistently visible according to the Accessibility standard.

Motion MAY supplement a focus transition but MUST NOT replace:

- outline;
- ring;
- contrast;
- another persistent focus indicator.

Repeated focus movement through controls SHOULD NOT trigger distracting entrance animations.

---

## 2.14 Component state transitions

Component motion SHOULD map directly to stable semantic states.

Examples include:

- `open` / `closed`;
- `checked` / `unchecked`;
- `expanded` / `collapsed`;
- `selected` / `unselected`;
- `loading` / `loaded`.

Motion SHOULD be attached to state hooks such as canonical component state attributes rather than inferred indirectly from DOM timing.

Animation code MUST NOT create an additional hidden application state machine unless the interaction genuinely requires one.

---

## 2.15 shadcn/ui baseline

shadcn/ui MUST remain the component baseline for animated application surfaces.

Motion SHOULD extend the standard component rather than replace its accessibility or state semantics.

Typical mappings include:

| Interaction | shadcn/ui baseline |
|---|---|
| Dialog transition | `Dialog` |
| Slide-over surface | `Sheet` |
| Mobile/detail surface | `Drawer` |
| Disclosure | `Accordion`, `Collapsible` |
| Tooltip | `Tooltip` |
| Popover | `Popover` |
| Context menu | `DropdownMenu` |
| Tab changes | `Tabs` |
| Progress | `Progress` |
| Loading placeholder | `Skeleton` |
| Toast/status | canonical toast / notification component |
| Toggle interaction | `Switch`, `Checkbox`, `Toggle` |

Animation MUST NOT compromise the keyboard, focus, ARIA, dismissal, or state semantics of the underlying component.

---

## 2.16 Dialogs and modal surfaces

Dialog entry SHOULD combine restrained opacity and scale or translation.

Dialog motion SHOULD normally use `motion-3` or `motion-4`.

Dialog exit MAY be slightly shorter than entry.

The backdrop and surface SHOULD be coordinated.

The dialog MUST become semantically open according to component state independently of whether the entrance animation has completed.

Focus management MUST NOT wait for decorative animation to finish unless early focus would create a measurable accessibility defect.

Closing animation MUST NOT delay a security-sensitive state change.

---

## 2.17 Sheets and drawers

Sheets and drawers MAY use directional translation because spatial movement communicates their origin.

Direction MUST correspond to the actual edge or navigation relationship.

Duration SHOULD normally use `motion-4` or `motion-5`.

A sheet MUST NOT slide from a direction unrelated to its position merely for visual novelty.

Reduced-motion mode SHOULD replace large translation with:

- opacity;
- very short low-amplitude movement;
- or immediate appearance.

---

## 2.18 Popovers, menus, and tooltips

Transient surfaces MUST feel responsive.

Tooltips SHOULD normally use `motion-1` or `motion-2`.

Menus and popovers SHOULD normally use `motion-2` or `motion-3`.

Large scaling animations SHOULD NOT be used.

The animation MUST NOT interfere with pointer transition between the trigger and interactive content.

Dismissal MUST NOT be delayed by a long exit animation.

---

## 2.19 Accordions and disclosures

Disclosure animation MAY communicate expansion and containment.

Animation MUST preserve:

- keyboard behaviour;
- focus;
- reading order.

Content MUST NOT remain inaccessible after it is semantically expanded merely because an animation is still running.

Height animation SHOULD be implemented carefully because repeated layout-dependent animation can be expensive.

For complex or frequently updated content, implementations SHOULD prefer strategies that avoid per-frame expensive layout calculation.

Reduced-motion mode MAY open or close disclosure content immediately.

---

## 2.20 Page and route transitions

Page transitions MUST support navigation orientation rather than simulate native-app theatrics by default.

The default route transition SHOULD be:

- no animation;
- or a short opacity transition.

Full-page directional travel SHOULD be used only when the information architecture has a meaningful spatial relationship.

Routine route transitions SHOULD generally complete within **180–280ms**.

Route animation MUST NOT:

- delay navigation requests;
- delay URL updates;
- break browser back/forward behaviour;
- interfere with focus restoration;
- override scroll restoration;
- leave the old page semantically interactive underneath the new route.

---

## 2.21 Navigation direction

When directional route motion is used, direction MUST have stable meaning.

For example:

- forward into a hierarchy;
- backward to a parent;
- adjacent carousel/page sequence.

Forward and backward transitions SHOULD be complementary.

Direction MUST NOT be assigned randomly based on whichever animation looks attractive.

---

## 2.22 View and shared-element transitions

Shared-element transitions MAY be used when an identifiable object persists across views.

They SHOULD communicate continuity such as:

- thumbnail → detail;
- selected record → detail panel;
- compact card → expanded representation.

Shared-element animation MUST NOT:

- obscure updated data;
- create false identity between different entities;
- delay route readiness.

Platform mechanisms such as the View Transitions API MAY be used where the support policy permits, but application correctness MUST NOT depend on them.

A non-animated fallback MUST remain valid.

---

## 2.23 Skeleton loading

Skeletons MUST represent expected layout rather than fabricated data.

Skeleton motion MUST be restrained.

A static skeleton SHOULD be considered the default accessible baseline.

If a shimmer is used:

- it SHOULD be slow and subtle;
- it MUST NOT create intense repeated movement;
- reduced-motion mode MUST remove the shimmer.

Skeletons MUST NOT show fake:

- charts;
- trends;
- metrics;
- messages

that could be mistaken for actual information.

---

## 2.24 Skeleton-to-content transition

Loaded content SHOULD replace its skeleton without dramatic movement.

A short crossfade MAY be used.

Skeleton-to-content transition SHOULD normally use:

- `motion-1`;
- `motion-2`;
- or `motion-3`.

Loaded content MUST NOT wait unnecessarily for the skeleton exit animation.

Skeleton dimensions SHOULD approximate content dimensions to reduce layout shift.

The transition MUST NOT cause content already being read elsewhere on the page to move unexpectedly.

---

## 2.25 Loading personality

Loading indicators MUST communicate actual system state.

The product MUST NOT deliberately delay a successful response to make a loading animation look complete.

As a corpus guideline:

| Expected delay | Preferred treatment |
|---|---|
| `< 150ms` | Usually no dedicated loader |
| `150–500ms` | Subtle pending state where useful |
| `> 500ms` | Skeleton, spinner, or other explicit loading state |
| Multi-second measurable operation | Determinate progress SHOULD be preferred |
| Indeterminate long operation | Status text SHOULD accompany persistent activity |

These thresholds are interaction heuristics and MAY be adjusted centrally for a product class.

Mutation actions requiring immediate acknowledgement MUST expose pending state immediately even when the operation may complete quickly.

---

## 2.26 Spinners

Spinners SHOULD be used for indeterminate activity where skeleton structure is not useful.

A spinner MUST NOT replace useful content during background refresh if existing data remains valid.

Large full-page spinners SHOULD be avoided.

A continuously rotating spinner MUST stop when loading stops.

Reduced-motion mode SHOULD use:

- static progress representation;
- subdued opacity change;
- text state;
- or a lower-motion alternative.

---

## 2.27 Progress indicators

Determinate operations SHOULD use determinate progress when accurate progress is available.

Progress animation MUST represent actual progress.

The UI MUST NOT animate progress forward independently of real completion merely to create the impression of speed.

Minor interpolation between validated progress updates MAY be used to smooth visual movement.

A progress bar MUST NOT visually reach 100% before the operation has actually completed.

---

## 2.28 Loading and asynchronous state

Animation state MUST follow canonical request state.

The UI SHOULD distinguish:

- idle;
- pending;
- success;
- error;
- refreshing.

An animation MUST NOT infer successful API completion.

Network request lifecycle MUST NOT be coupled to animation callbacks.

A request MUST NOT wait for an entrance or exit transition before starting unless that ordering is required by the domain workflow.

---

## 2.29 Optimistic interaction

Optimistic state MAY animate immediately when optimistic updates are permitted by the State Management and API standards.

Rollback MUST remain understandable if the operation fails.

A rollback SHOULD NOT use exaggerated reversal animation.

The system MUST communicate the resulting error through semantic UI, not motion alone.

---

## 2.30 Form interactions

Motion MAY reinforce:

- field expansion;
- disclosure;
- validation state;
- submission state.

Validation errors MUST NOT rely on shaking.

A shake MAY be used only as supplementary feedback and SHOULD generally be avoided.

Error state MUST remain identifiable through:

- text;
- accessible semantics;
- styling;
- focus behaviour where required.

Dynamic field insertion MUST preserve logical keyboard and screen-reader order.

Forms MUST NOT animate fields away before the user's input has been safely processed according to the workflow.

---

## 2.31 Success feedback

Routine success SHOULD use restrained confirmation.

Examples include:

- icon state;
- status text;
- brief toast;
- subtle check transition.

Large celebratory animation SHOULD be reserved for genuinely significant milestones.

Enterprise, administrative, financial, security, healthcare, and other high-frequency operational workflows SHOULD NOT use repeated celebratory animation for routine successful actions.

Success animation MUST NOT hide errors or validation warnings.

---

## 2.32 Error and warning feedback

Errors and warnings SHOULD prioritize clarity over animation.

Critical error information MUST appear promptly.

Motion MUST NOT delay:

- security warnings;
- failed-payment information;
- destructive-action failures;
- validation messages;
- loss-of-connectivity indicators.

Flashing MUST NOT be used to draw attention to an error.

Persistent error visibility MUST NOT depend on an animation replaying.

---

## 2.33 Notifications and toasts

Toast entry MAY use short opacity and translation.

Toast exit SHOULD generally be equal to or faster than entry.

Animation MUST NOT materially shorten the time available to read the message.

Hovering or focusing a dismissible timed notification SHOULD follow the canonical notification timing pattern.

Critical messages MUST NOT disappear solely because an animation timer completes.

---

## 2.34 Drag and drop

Drag interactions MUST follow pointer or touch input closely.

The dragged representation SHOULD move approximately 1:1 with direct manipulation.

Decorative easing MUST NOT make a dragged element lag significantly behind the pointer.

Drag interaction MUST expose:

- pickup state;
- valid drop state;
- invalid drop state;
- completion or cancellation.

Motion MUST NOT be the only distinction between valid and invalid targets.

Keyboard-equivalent operation MUST exist where drag-and-drop performs required functionality.

---

## 2.35 Drag release and snapping

A released draggable MAY animate into its final position.

Snap animation SHOULD be short and directional.

Invalid drops SHOULD return the item predictably.

Return animation MUST NOT be theatrical or punitive.

Reduced-motion mode SHOULD minimize return travel.

The canonical data state MUST resolve independently of whether snapping animation completes.

---

## 2.36 Swipe gestures

Swipe gestures MAY supplement:

- tabs;
- carousels;
- drawers;
- dismissible items.

A swipe MUST NOT be the only method for invoking required functionality.

An equivalent visible or keyboard-accessible control MUST exist.

Gesture thresholds MUST be predictable.

A partially completed gesture SHOULD visually track progress rather than suddenly committing an unrelated animation.

---

## 2.37 Inertial motion

Momentum MAY be used for:

- scrolling;
- panning;
- expected direct-manipulation surfaces.

Inertia SHOULD follow platform expectations.

Custom exaggerated inertial effects SHOULD NOT be applied to ordinary component controls.

Users MUST retain control of scrolling and navigation.

---

## 2.38 Scroll behaviour

Native document scrolling SHOULD remain the default.

Applications MUST NOT hijack normal scrolling merely to produce a cinematic sequence.

Scroll locking MAY be used for legitimate modal interaction according to the Component and Accessibility standards.

Custom scroll physics SHOULD NOT replace platform scrolling in ordinary content pages.

---

## 2.39 Scroll-linked motion

Scroll-linked animation MUST be treated as optional enhancement.

It MUST NOT be required to:

- reveal essential content;
- understand text;
- operate controls;
- complete forms;
- follow navigation.

Scroll-linked effects SHOULD remain low amplitude.

Large parallax movement SHOULD NOT be used in core application surfaces.

Scroll-driven opacity, progress, or restrained transformation MAY be appropriate when it reinforces the user's position in content.

---

## 2.40 Scroll-linked performance

JavaScript scroll handlers MUST NOT perform heavy synchronous work on every scroll event.

When JavaScript-controlled animation is required, updates SHOULD be coordinated with the browser rendering cycle.

Platform-native scroll-driven animation mechanisms MAY be preferred where supported by the product's browser policy.

Animations MUST NOT repeatedly cause expensive layout and paint during scrolling.

---

## 2.41 Sticky and pinned storytelling

Pinned-scroll sequences SHOULD be limited to editorial, instructional, or data-storytelling contexts.

They SHOULD NOT be used for routine workflows.

Users MUST retain understandable progression through the document.

Reduced-motion users MUST receive a usable static or minimally animated presentation.

Keyboard and assistive-technology reading order MUST remain meaningful independently of the visual sequence.

---

## 2.42 Reduced-motion preference

Applications MUST respect `prefers-reduced-motion: reduce`.

The preference MUST be treated as an accessibility requirement, not an aesthetic theme.

`prefers-reduced-motion` allows the user agent to expose a user's request that non-essential motion be removed, reduced, or replaced. citeturn689039search1

Reduced-motion behaviour MUST be implemented centrally enough that shared components behave consistently.

A feature MUST NOT require every individual developer to remember to add a local override manually.

---

## 2.43 Reduced motion does not mean no feedback

Reduced-motion mode MUST preserve state communication.

Motion SHOULD be replaced with:

- immediate state changes;
- short fades;
- persistent styling;
- text;
- icons;
- borders;
- focus treatment.

Removing animation MUST NOT remove:

- success indication;
- loading indication;
- selection state;
- navigation context;
- error feedback.

---

## 2.44 Reduced-motion transformations

When reduced motion is requested:

- large translation MUST be removed or substantially reduced;
- large scaling MUST be removed;
- parallax MUST be removed;
- nonessential spring or bounce MUST be removed;
- auto-advancing decorative sequences SHOULD stop;
- animated route travel SHOULD become immediate or fade-based;
- skeleton shimmer MUST become static;
- continuous decorative movement SHOULD stop.

A short opacity transition MAY remain when it does not create a motion trigger and preserves comprehensibility.

---

## 2.45 Interaction-triggered animation

Non-essential animation triggered by user interaction MUST have a reduced or removed variant.

W3C guidance on animation from interactions specifically identifies reducing or disabling non-essential interaction-triggered animation as a way to address vestibular impact. citeturn689039search5

Critical functionality MUST remain available with motion disabled.

---

## 2.46 User motion setting

Products MAY provide an application-level motion preference in addition to operating-system preference.

An application setting MUST NOT override an operating-system reduced-motion request by enabling more motion unless the user explicitly chooses that outcome with a clear understanding of the setting.

Application preference precedence SHOULD be centrally defined.

A reasonable precedence is:

1. accessibility-enforced reduced motion;
2. explicit application preference;
3. system preference;
4. default product motion.

---

## 2.47 Continuous and looping animation

Indefinite nonessential animation SHOULD NOT run in ordinary application surfaces.

Looping animations MUST have a functional reason, such as:

- active progress;
- live recording;
- current synchronization.

Decorative looping motion SHOULD stop after a limited period or not be used.

A loading animation MUST stop when the operation is complete.

Animated indicators MUST NOT continue merely because a component failed to clear an animation class.

---

## 2.48 Data visualization motion

Charts and data visualizations MUST NOT require animation for interpretation.

Initial chart entrance animation SHOULD be restrained or disabled for data-dense analytical products.

Animated interpolation MAY support continuity when:

- filters change;
- a time period changes;
- a series updates.

Interpolation MUST NOT imply observations that never existed.

Rapid real-time updates SHOULD be coalesced.

Repeated full-chart entrance animation MUST NOT occur on every polling refresh.

Reduced-motion mode SHOULD disable substantial chart morphing and animated camera movement.

---

## 2.49 Numeric transitions

Animated counters MAY be used for secondary presentation.

Critical values MUST become available semantically and visually without waiting for the counter animation.

An animated number MUST NOT imply intermediate measurements that are not meaningful.

Rapidly changing operational metrics SHOULD generally update directly rather than continuously rolling digits.

Screen-reader announcements MUST follow semantic update requirements rather than every visual animation frame.

---

## 2.50 Real-time updates

Real-time UI SHOULD minimize movement caused by frequent updates.

Incoming records MUST NOT repeatedly push content under the user's pointer or focus.

New-item animation MAY be used when it helps identify what changed.

Existing values SHOULD update in place where practical.

Users inspecting historical or selected data MUST NOT be pulled into live motion unless explicitly in a live-following mode.

---

## 2.51 Layout animation

Animating layout-affecting properties SHOULD be avoided in high-frequency interactions.

Where equivalent output is possible, implementations SHOULD prefer `transform` and `opacity`, which can commonly remain in the browser's compositing stage rather than repeatedly triggering layout or paint. citeturn689039search0turn689039search2

Properties requiring layout or expensive paint MAY be animated when:

- the interaction genuinely requires it;
- performance has been measured;
- the affected region is bounded.

---

## 2.52 `transition: all`

`transition: all` SHOULD NOT be used in reusable application components.

Components SHOULD enumerate the properties they intentionally animate.

This avoids:

- accidental animation of future style changes;
- unpredictable interaction timing;
- unnecessary rendering work.

Explicit transition properties also make the component's interaction contract reviewable.

---

## 2.53 `will-change`

`will-change` MUST NOT be applied globally or indefinitely as a generic performance optimisation.

It MAY be used for measured hot paths where layer promotion materially improves performance.

It SHOULD be removed when no longer necessary if the implementation creates temporary promotion.

Excessive compositor-layer creation MUST be avoided.

---

## 2.54 JavaScript animation

JavaScript animation SHOULD be used only when CSS or platform animation mechanisms cannot express the required behaviour appropriately.

Per-frame JavaScript updates MUST use the appropriate browser rendering-cycle mechanism.

Application code MUST NOT use high-frequency timers as an animation engine.

Per-frame work MUST remain bounded.

Animation loops MUST stop when:

- the component unmounts;
- the animation completes;
- the page becomes irrelevant to the interaction;
- reduced-motion mode requires stopping.

---

## 2.55 Animation performance budgets

Motion MUST be tested on representative mid-tier hardware, not only high-end development machines.

At **60Hz**, the full rendering frame is approximately **16.7ms**. Higher-refresh-rate devices provide even smaller frame windows. citeturn689039search3

The application SHOULD preserve substantial headroom for:

- input;
- scripting;
- style calculation;
- layout;
- paint;
- compositing.

As a corpus target:

- animation-specific synchronous main-thread work SHOULD remain **≤ 4ms per frame** on representative hardware;
- animation MUST NOT routinely create long tasks over **50ms**;
- common interactions SHOULD present at least **99% of expected frames** during performance testing;
- sustained animation SHOULD NOT cause material input latency.

These are corpus performance budgets, not browser guarantees.

---

## 2.56 Frame-rate independence

Animation correctness MUST NOT depend on a fixed 60fps assumption.

Time-based animation MUST derive progress from elapsed time rather than frame count.

Dropping frames MUST NOT cause:

- slower business logic;
- incorrect final state;
- duplicated actions;
- incomplete state transitions.

---

## 2.57 Hidden and background content

Nonessential animation SHOULD pause when its content is not visible or relevant.

A hidden tab MUST NOT continue unnecessary animation or polling solely to preserve visual motion.

Offscreen lists MUST NOT animate every offscreen child.

Intersection or visibility state MAY be used to avoid unnecessary work when appropriate.

---

## 2.58 Motion and cumulative layout shift

Entrance animation MUST NOT disguise unexpected layout shift.

Space SHOULD be reserved before asynchronously loaded content appears.

Transforms SHOULD be preferred where visual movement is required without affecting layout.

Content that has already settled and is being read SHOULD NOT unexpectedly move because an unrelated animation completed elsewhere.

---

## 2.59 Motion state management

Motion state SHOULD remain derived from canonical UI state whenever possible.

Examples:

`open → opening visual treatment`

rather than:

`isOpen + isOpening + openingComplete + wasOpening`

unless each state has a genuine interaction meaning.

Transient animation state SHOULD remain local.

Global stores MUST NOT contain animation progress merely because a component can expose it locally.

Cross-route motion state MAY be coordinated centrally where shared transitions require it.

---

## 2.60 Animation interruption

Animations MUST tolerate interruption.

A user MAY:

- reopen a closing component;
- reverse direction;
- navigate away;
- resize the viewport;
- change reduced-motion preference;
- trigger another valid state change.

The component MUST resolve to the latest canonical state.

Animations MUST NOT queue stale transitions that replay after newer user intent.

---

## 2.61 Cancellation

Cancelable interactions SHOULD cancel obsolete motion.

An interrupted animation SHOULD generally continue from its current visual state toward the new target rather than jumping back to an old starting point.

Cancelled animations MUST clean up:

- timers;
- listeners;
- transient DOM styles;
- pending callbacks

that are no longer valid.

---

## 2.62 Security-sensitive transitions

Animation MUST NOT delay security-critical state changes.

Examples include:

- locking sensitive content;
- removing access after logout;
- hiding secrets;
- expiring privileged sessions;
- displaying security warnings.

Sensitive information MUST NOT remain visible merely because an exit transition is still playing.

Authorization changes MUST take effect according to Security state, not animation timing.

Intermediate transition frames MUST NOT expose sensitive content that the destination state is intended to conceal.

---

## 2.63 Destructive actions

Destructive confirmation MUST prioritize comprehension.

The confirmation control MAY have standard interaction motion but MUST NOT use:

- bounce;
- attention-grabbing repeated pulse;
- celebratory animation;
- misleading delay.

Deletion MUST NOT be delayed solely to allow an exit animation to complete.

If undo is supported, visual removal MAY animate after the canonical state transition is safely represented.

---

## 2.64 Authentication

Authentication interfaces SHOULD use minimal motion.

Motion MUST NOT:

- distract during credential entry;
- delay error messages;
- visually expose entered credentials;
- obscure MFA status;
- create ambiguity about authenticated state.

Biometric, passkey, or external-authentication progress indicators MUST correspond to actual state.

---

## 2.65 When NOT to animate

Animation MUST NOT be added when it:

- provides no additional state information;
- slows repeated expert interaction;
- obscures exact data;
- delays a critical warning;
- creates vestibular risk without sufficient benefit;
- causes significant rendering cost;
- interferes with reading;
- repeatedly moves controls under the pointer;
- masks unstable layout;
- hides asynchronous latency;
- creates false continuity between unrelated states.

The default when the benefit is uncertain SHOULD be **no animation**.

---

# 3. Anti-patterns

The following are non-conforming unless a documented interaction requirement provides a stronger justification.

## 3.1 Token violations

- Arbitrary values such as `137ms` or `0.47s` in feature components.
- Each team inventing its own easing curves.
- Hard-coded spring physics throughout feature code.
- Similar components using visibly different timing.

## 3.2 Excessive motion

- Animating every visible element on page load.
- Staggering hundreds of table rows.
- Making every card rise or bounce on hover.
- Full-screen transitions for routine state changes.
- Decorative motion that restarts whenever a component rerenders.

## 3.3 Route transitions

- Delaying navigation until exit animation completes.
- Random route-direction changes.
- Sliding every page horizontally despite no spatial hierarchy.
- Breaking browser back navigation for cinematic transitions.
- Reanimating the entire application shell for every child route.

## 3.4 Micro-interactions

- Delaying button actions until press animation finishes.
- Large bouncing checkbox or toggle transitions.
- Shaking a form as the only error signal.
- Using animation instead of a persistent selected state.

## 3.5 Loading

- Deliberately holding successful data so a spinner can finish.
- Showing a spinner for extremely fast operations and causing flicker.
- Replacing usable cached content with a full-page loader during refresh.
- Fake skeleton text that resembles actual content.
- Highly animated skeleton shimmer in reduced-motion mode.
- Progress bars reaching 100% before actual completion.

## 3.6 Layout

- Animating `top`, `left`, `width`, or `height` continuously when a compositor-friendly alternative exists.
- Using `transition: all`.
- Creating layout shift and presenting it as entrance motion.
- Reflowing surrounding content on every hover.

## 3.7 Scroll

- Scrolljacking.
- Replacing native document scrolling with custom physics.
- Large background parallax in productivity interfaces.
- Pinning ordinary form or dashboard content into cinematic sequences.
- Requiring scrolling animation to reveal essential information.

## 3.8 Gestures

- Swipe-only destructive actions.
- Drag-and-drop with no keyboard alternative for required workflows.
- Draggable elements that visibly lag behind direct pointer movement.
- Excessive inertia after the user stops interacting.
- Gesture completion states indicated only by animation.

## 3.9 Reduced motion

- Treating reduced motion as “make every animation slightly slower.”
- Keeping large pans but shortening duration.
- Continuing parallax under `prefers-reduced-motion`.
- Removing visual state feedback along with motion.
- Disabling the CSS animation while leaving equivalent JavaScript animation running.
- Requiring individual feature developers to implement reduced-motion behaviour independently.

## 3.10 Performance

- Per-frame React state updates for purely visual animation.
- Recreating animation objects every render unnecessarily.
- Permanent `will-change` across large portions of the UI.
- Thousands of simultaneously promoted compositor layers.
- High-frequency animation timers outside the browser render cycle.
- Animation continuing indefinitely in hidden content.

## 3.11 Data and real time

- Replaying chart entrance animations on every polling cycle.
- Continuously rolling every KPI digit.
- Using interpolation that implies nonexistent measurements.
- Reordering records with animation while the user is interacting with them.
- Forcing a live viewport onto a user inspecting historical state.

## 3.12 Accessibility

- Large page zoom effects without reduced-motion variants.
- Flashing errors.
- Pulsing as the only status indicator.
- Focus indication that exists only during a brief animation.
- Animated content that must be visually tracked to understand the workflow.
- Auto-advancing animated content without an accessible method to pause or inspect it.

## 3.13 Security

- Leaving sensitive data visible until an exit animation completes.
- Delaying logout state because a transition is playing.
- Exposing a protected underlying screen while a modal animates away.
- Using motion to obscure or minimize a security warning.

---

# 4. Checklist

## 4.1 Purpose

- [ ] Every animation has an interaction purpose.
- [ ] Motion communicates state, continuity, hierarchy, causality, or manipulation.
- [ ] Removing animation does not break the task.
- [ ] Uncertain decorative animation has been removed.

## 4.2 Tokens

- [ ] Duration uses canonical motion tokens.
- [ ] Easing uses canonical easing tokens.
- [ ] Feature-specific arbitrary timing values are absent.
- [ ] Similar component interactions share timing semantics.
- [ ] Large motion has a documented reason.

## 4.3 Choreography

- [ ] Related movement is coordinated.
- [ ] Sequencing reflects real causality.
- [ ] Decorative sequencing does not delay interaction.
- [ ] Stagger intervals remain restrained.
- [ ] Long collections do not animate every item sequentially.

## 4.4 Components

- [ ] shadcn/ui remains the underlying component baseline.
- [ ] Motion does not alter keyboard semantics.
- [ ] Motion does not break focus management.
- [ ] Open/closed and equivalent states remain canonical.
- [ ] Component accessibility does not depend on animation callbacks.

## 4.5 Navigation

- [ ] Route motion communicates meaningful hierarchy where used.
- [ ] Route transitions are short.
- [ ] URL changes are not delayed by animation.
- [ ] Browser back/forward remains correct.
- [ ] Focus and scroll restoration remain correct.
- [ ] A no-animation fallback is valid.

## 4.6 Loading

- [ ] Fast operations avoid unnecessary loader flicker.
- [ ] Pending mutations receive prompt acknowledgement.
- [ ] Skeletons represent structure rather than fake data.
- [ ] Existing valid content remains visible during background refresh where appropriate.
- [ ] Progress represents real system progress.
- [ ] Successful responses are never delayed merely to complete an animation.

## 4.7 Forms

- [ ] Error communication does not depend on shaking or motion.
- [ ] Dynamic field transitions preserve reading and focus order.
- [ ] Submission animation follows actual request state.
- [ ] Motion does not delay validation or error display.

## 4.8 Gestures

- [ ] Direct manipulation tracks input closely.
- [ ] Required gestures have alternative controls.
- [ ] Drop targets are identifiable without motion.
- [ ] Snap and return animations are restrained.
- [ ] Gesture interruption and cancellation are safe.

## 4.9 Scroll

- [ ] Native scrolling is preserved.
- [ ] Scroll is not hijacked for routine interfaces.
- [ ] Scroll-linked motion is nonessential.
- [ ] Parallax is restrained or absent.
- [ ] Scroll-driven code does not create per-event layout thrashing.

## 4.10 Reduced motion

- [ ] `prefers-reduced-motion` is respected.
- [ ] Large translation is removed or greatly reduced.
- [ ] Large scaling is removed.
- [ ] Parallax is removed.
- [ ] Skeleton shimmer is disabled.
- [ ] Nonessential looping motion stops.
- [ ] Essential state feedback remains present.
- [ ] Reduced-motion behaviour is implemented through shared infrastructure.

## 4.11 Performance

- [ ] `transform` and `opacity` are preferred where equivalent.
- [ ] `transition: all` is absent from reusable components.
- [ ] `will-change` is used sparingly.
- [ ] Animation performance is tested on representative hardware.
- [ ] Animation-specific main-thread work meets corpus budgets.
- [ ] Long tasks are not introduced by animation.
- [ ] Hidden content does not continue unnecessary motion.
- [ ] Animation remains correct under dropped frames.

## 4.12 State management

- [ ] Canonical application state is independent of animation completion.
- [ ] Transient animation state remains local where possible.
- [ ] Animations can be interrupted safely.
- [ ] Stale queued transitions are cancelled.
- [ ] Timers and listeners are cleaned up.

## 4.13 Accessibility

- [ ] Essential information is understandable without animation.
- [ ] Focus remains persistently visible.
- [ ] Motion is not the sole state indicator.
- [ ] Vestibular-sensitive motion has an appropriate alternative.
- [ ] Flashing is absent.
- [ ] Keyboard users receive equivalent interaction behaviour.
- [ ] Motion preferences apply to CSS and JavaScript animation consistently.

## 4.14 Security

- [ ] Sensitive content disappears according to security state, not animation timing.
- [ ] Authentication state is not delayed by transitions.
- [ ] Critical warnings appear immediately.
- [ ] Intermediate animation frames do not disclose restricted content.
- [ ] Destructive-action motion does not manipulate or distract from confirmation.

## 4.15 Data and APIs

- [ ] Loading motion reflects actual API state.
- [ ] Requests do not wait for decorative transitions.
- [ ] Animated interpolation does not invent data.
- [ ] Real-time updates do not repeatedly disrupt user inspection.
- [ ] Background refreshes do not replay full entrance animations.

## 4.16 Corpus alignment

- [ ] Motion values originate in Design Tokens.
- [ ] shadcn/ui provides the component baseline.
- [ ] Forms & Validation governs form-state semantics.
- [ ] State Management remains authoritative over UI state.
- [ ] API state governs loading and completion.
- [ ] Accessibility governs reduced-motion and keyboard requirements.
- [ ] Security state overrides decorative animation.
- [ ] Performance budgets are verified rather than assumed.
- [ ] Pattern standards govern loading, disclosure, notifications, navigation, and drag-and-drop.

---

# 5. Canonical summary

A Gold Standard 2026 interface MUST use motion intentionally.

Duration and easing MUST come from shared Design Tokens. Routine interaction SHOULD remain fast, with most component transitions completing between approximately 80ms and 320ms.

Motion MUST communicate state, hierarchy, continuity, causality, or direct manipulation. Animation without a clear interaction purpose SHOULD be removed.

Choreography MUST reflect real information hierarchy. Sequential motion MUST NOT make users wait for decorative effects.

Route transitions MUST remain subordinate to navigation semantics. URL state, focus, scroll restoration, and route readiness MUST remain correct with animation disabled.

Micro-interactions SHOULD acknowledge input promptly and MUST NOT delay the underlying action.

Skeletons and loading indicators MUST represent actual loading state. The application MUST NOT delay successful data merely to finish animation. Skeleton-to-content transitions SHOULD be brief, and reduced-motion users MUST NOT receive animated shimmer.

Gesture motion MUST track direct manipulation closely. Required functionality MUST NOT depend on swipe, drag, or another gesture without an accessible equivalent.

Scroll-linked animation MUST remain optional enhancement. Native scrolling MUST NOT be hijacked for routine product workflows.

Applications MUST respect `prefers-reduced-motion`. Reduced-motion behaviour MUST remove or substantially reduce large translations, scaling, parallax, springs, looping decoration, and other vestibular-sensitive movement while preserving all meaningful state feedback.

Motion MUST be performant. Implementations SHOULD prefer compositor-friendly `transform` and `opacity` where they can express the interaction correctly, avoid unbounded layout and paint work, and test frame behaviour on representative hardware. citeturn689039search0turn689039search2

Animation MUST tolerate interruption, cancellation, dropped frames, navigation, and disabled motion. Business logic MUST NOT depend on animation completion.

Security-critical, destructive, authentication, error, and warning state changes MUST take effect according to canonical application state rather than visual transition timing.

shadcn/ui is the canonical component baseline. Motion MUST extend the component system's state and accessibility semantics rather than replacing them with a parallel interaction model.

**Canonical rule:** motion is conforming only when the interface remains equally correct, understandable, operable, secure, and accessible if every nonessential animation is interrupted, reduced, or removed.

The numerical duration, staggering, loading, and frame-work thresholds above are intentionally framed as **corpus engineering policy**, rather than browser or WCAG limits; that keeps them centrally governable as the design system evolves.
