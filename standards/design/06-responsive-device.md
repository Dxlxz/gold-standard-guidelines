---
id: "responsive-device"
title: "Responsive & Device Guidelines — Gold Standard 2026"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "responsive", "device"]
applies_to: ["general"]
related: ["routes", "accessibility", "file-media", "design-tokens"]
legacy_number: 40
created: "2026-09-22"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 73792
provenance: baseline

---

Canonical placement: **Patterns → Accessibility → Responsive & Device → Reusability & Libraries**. Accessibility defines minimum usability constraints; Responsive & Device defines how the same product recomposes across viewport, input, display, and installed-app contexts.

# Responsive & Device Guidelines — Gold Standard 2026

## 1. Purpose

These guidelines define the canonical organizational standard for:

- responsive web design;
- mobile;
- tablet;
- desktop;
- large screens;
- foldables;
- touch;
- mouse;
- trackpad;
- stylus;
- keyboard;
- hybrid-input devices;
- viewport behavior;
- responsive layout;
- responsive navigation;
- responsive tables;
- safe areas;
- display cutouts;
- virtual keyboards;
- orientation;
- viewport units;
- scrolling;
- sticky/fixed UI;
- zoom;
- responsive media;
- density;
- device pixel ratio;
- capability detection;
- PWA installed mode;
- offline/resilient device behavior;
- browser chrome;
- windowed desktop PWA behavior;
- accessibility under responsive layouts;
- testing and governance.

The objective is to make interfaces:

```text
Adaptive
Input-agnostic
Touch-capable
Keyboard-capable
Zoom-safe
Reflow-safe
Safe-area-aware
Localization-resistant
Accessible
Performant
Progressively enhanced
```

The core principle is:

> **Design for available space, content needs, input capabilities, and user preferences—not assumptions about device names.**

---

# 2. Normative Language

- **MUST** — mandatory.
- **MUST NOT** — prohibited.
- **SHOULD** — expected unless justified.
- **SHOULD NOT** — generally avoided unless justified.
- **MAY** — optional.

Exceptions SHOULD document:

```text
Reason
Affected viewport/input
Accessibility impact
Device/browser impact
Fallback behavior
Owner
Review date
```

---

# 3. Responsive Design Is Recomposition

Responsive design is not:

```text
Desktop page
↓
make everything smaller
↓
mobile
```

Responsive design is:

```text
Same user intent
+
available space
+
input capabilities
+
content priority
=
appropriate composition
```

---

# 4. Responsive Architecture

A responsive product SHOULD preserve:

```text
Information
Functionality
Meaning
Security
Accessibility
```

while allowing:

```text
Position
Grouping
Density
Navigation presentation
Column count
Overlay type
```

to change.

---

# 5. Device Categories Are Descriptive

Terms such as:

```text
mobile
tablet
desktop
```

MAY be used in discussion and testing.

They MUST NOT become the primary runtime capability model.

---

# 6. Do Not Assume Width Equals Device

Bad:

```text
width < 768
→ phone
```

A narrow viewport may be:

```text
desktop split-screen
tablet multitasking
foldable pane
zoomed browser
small embedded window
```

---

# 7. Do Not Assume Wide Means Desktop

A wide display can still use:

```text
touch
stylus
virtual keyboard
```

---

# 8. Hybrid Devices

A device MAY simultaneously support:

```text
touch
mouse
trackpad
keyboard
stylus
```

The product MUST remain usable when multiple input methods coexist.

---

# 9. Capability Dimensions

Treat these independently:

```text
Viewport size
Container size
Pointer precision
Hover availability
Keyboard availability
Touch availability
Orientation
Pixel density
Safe area
Virtual keyboard
User preferences
```

---

# 10. Mobile-First

Web CSS SHOULD normally use a mobile-first/minimum-capability foundation.

Conceptually:

```text
Base experience
↓
Enhance when space/capability increases
```

---

# 11. Mobile-First Does Not Mean Mobile-Only

Mobile-first defines CSS/composition progression.

It does not mean:

```text
design mobile
then stretch it
```

Desktop may require qualitatively different use of space.

---

# 12. Desktop-First Exception

A specialized application such as:

```text
IDE
data workstation
professional editor
operations console
```

MAY have a desktop-primary interaction model.

It MUST still define supported narrow/reflow behavior.

---

# 13. Responsive Requirements Begin With Content

Breakpoints and recomposition SHOULD follow:

```text
content fit
task priority
interaction complexity
reading width
navigation needs
```

rather than popular device resolutions.

---

# 14. Content Priority

At narrow widths:

```text
critical task
>
primary information
>
secondary information
>
decorative/supporting content
```

Content SHOULD be reorganized—not silently lost.

---

# 15. Functional Equivalence

Responsive layouts MUST preserve required functionality.

Bad:

```text
desktop has export
mobile hides export permanently
```

unless mobile genuinely does not support that business capability and the limitation is deliberate.

---

# 16. Responsive Feature Removal

Features SHOULD NOT disappear merely because space is constrained.

Prefer:

```text
visible toolbar action
↓
overflow menu
```

over:

```text
action disappears
```

---

# 17. Information Preservation

Critical:

```text
errors
warnings
status
permissions
financial information
security information
```

MUST remain available at every supported viewport.

---

# 18. Source Order

DOM/source order SHOULD remain logical independently of visual responsive placement.

---

# 19. CSS Reordering

CSS `order`, grid placement, or equivalent visual reordering MUST NOT create confusing keyboard/screen-reader order.

---

# 20. Viewport Configuration

Responsive web applications MUST declare an appropriate viewport.

Canonical baseline:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

# 21. Device Width

The page SHOULD use the actual viewport width rather than relying on historical wide mobile virtual viewports.

---

# 22. Zoom

Applications MUST NOT intentionally disable browser zoom.

Avoid:

```text
user-scalable=no
maximum-scale=1
```

for normal application interfaces.

---

# 23. User Scaling

Responsive behavior MUST tolerate user zoom and text scaling.

---

# 24. Zoom Is Not Mobile Emulation

Testing a desktop page only at 400% zoom is useful for reflow/accessibility but does not replace testing real touch/mobile interaction.

---

# 25. WCAG Reflow Baseline

Normal vertically scrolling interfaces SHOULD remain functional without two-dimensional page scrolling at an effective width equivalent to approximately:

```text
320 CSS px
```

except content that genuinely requires two-dimensional layout.

---

# 26. Two-Dimensional Exceptions

Examples that MAY legitimately require local horizontal scrolling:

```text
complex data table
timeline
map
canvas
spreadsheet
diagram
```

The exception SHOULD be confined to that component rather than the entire page.

---

# 27. No Page-Level Horizontal Scroll

Ordinary application pages MUST NOT require horizontal page scrolling at supported narrow widths.

---

# 28. Overflow Detection

Horizontal overflow SHOULD be treated as a defect unless explicitly owned by a component that requires it.

---

# 29. Viewport Units

Use modern viewport units deliberately.

Relevant units include:

```text
vh / vw
svh / svw
lvh / lvw
dvh / dvw
```

---

# 30. `100vh` Caution

Do not assume:

```css
height: 100vh;
```

always equals the currently visible mobile area.

Browser chrome and virtual keyboards can alter visible space.

---

# 31. Dynamic Viewport

`dvh` MAY be appropriate where a region should follow the changing visible viewport.

---

# 32. Small Viewport

`svh` MAY be useful when layout should remain safe when browser UI is expanded.

---

# 33. Large Viewport

`lvh` MAY be useful when sizing relative to the maximum viewport state is intentional.

---

# 34. Full-Height App Shell

Full-height application shells SHOULD define whether they mean:

```text
layout viewport
visible viewport
maximum viewport
```

rather than blindly selecting `100vh`.

---

# 35. Min Height

Prefer resilient patterns such as:

```text
min-block-size
```

where content may exceed the viewport.

Do not trap large content inside rigid viewport-height containers unnecessarily.

---

# 36. Visual Viewport

Applications with floating UI or virtual-keyboard-sensitive interactions MAY use visual viewport information where platform support and need justify it.

---

# 37. Virtual Keyboard

Mobile virtual keyboards can substantially reduce visible viewport height.

Forms MUST remain usable while the keyboard is open.

---

# 38. Focused Input Visibility

When a virtual keyboard opens, the focused control MUST remain visible or be scrollable into view.

---

# 39. Submit Action Visibility

Critical form actions SHOULD remain reachable while the virtual keyboard is open.

---

# 40. Keyboard Overlay Assumption

Do not assume every browser resizes the viewport identically when a software keyboard appears.

---

# 41. `interactive-widget`

The viewport `interactive-widget` behavior MAY be configured when a known application layout requires it and browser support has been tested.

It SHOULD NOT be introduced as a speculative fix.

---

# 42. Fixed Bottom Bars and Keyboard

A fixed bottom action bar MUST NOT cover:

```text
focused inputs
validation errors
autocomplete lists
```

when the virtual keyboard is visible.

---

# 43. Mobile Browser Chrome

Top/bottom browser bars may expand, collapse, or overlay content.

Critical controls MUST NOT rely on unstable browser chrome geometry.

---

# 44. Safe Areas

Edge-to-edge interfaces MUST account for safe areas.

Relevant environment values include:

```text
safe-area-inset-top
safe-area-inset-right
safe-area-inset-bottom
safe-area-inset-left
```

---

# 45. Safe Area Meaning

Safe-area insets protect content from areas obstructed by:

```text
display cutouts
rounded corners
system UI
home indicators
```

where applicable.

---

# 46. `viewport-fit=cover`

When intentionally drawing edge-to-edge:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover"
>
```

the layout MUST account for safe-area insets.

---

# 47. Safe Padding

A common conceptual pattern is:

```css
padding-bottom:
  max(var(--space-page), env(safe-area-inset-bottom));
```

or an equivalent tokenized approach.

---

# 48. Base Spacing Plus Safe Area

Do not replace ordinary spacing entirely with the safe-area value.

Often the requirement is:

```text
design spacing
+
required safe inset
```

or a governed maximum/composition.

---

# 49. Safe-Area Components

Typical components requiring review:

```text
bottom navigation
mobile toolbar
full-screen dialog
drawer
video controls
sticky footer
floating action controls
```

---

# 50. Safe Area Is Dynamic Context

Do not hard-code:

```text
34px
```

as a universal home-indicator inset.

Use platform-provided environment values.

---

# 51. Foldables

Interfaces MAY encounter segmented/hinged displays.

---

# 52. Foldable Strategy

The baseline interface SHOULD work as a normal responsive layout without foldable-specific code.

Enhance only when segmentation provides genuine value.

---

# 53. Viewport Segments

Where supported and useful, viewport-segment environment variables MAY help position content across multiple physical viewport regions.

---

# 54. Hinge Avoidance

Critical:

```text
controls
text
dialog actions
```

SHOULD NOT be placed across a physical hinge/occlusion when segmentation information is available.

---

# 55. Foldable Dual-Pane

A foldable MAY enhance:

```text
list
+
detail
```

into two panes.

The application MUST still support one-pane use.

---

# 56. Orientation

Interfaces MUST NOT assume one fixed orientation unless orientation is essential to the task.

---

# 57. Portrait vs Landscape

Responsive layout SHOULD respond to available dimensions.

Do not use orientation alone as the primary layout selector.

---

# 58. Orientation Lock

Web/PWA orientation locking SHOULD be reserved for experiences where the orientation is intrinsic to the task.

Examples MAY include:

```text
game
camera experience
specialized media tool
```

---

# 59. Rotate Prompt

Do not require users to rotate devices merely because the layout was not designed responsively.

---

# 60. Orientation Change

State MUST survive orientation changes.

Do not reset:

```text
form content
scroll position unnecessarily
selection
draft state
```

because dimensions changed.

---

# 61. Breakpoint Governance

Global breakpoints are owned by Design Tokens Guidelines.

Responsive implementation consumes them.

---

# 62. Breakpoint Purpose

Each breakpoint SHOULD correspond to a meaningful layout transition.

Example:

```text
single-column
↓
main + supporting pane
```

---

# 63. Avoid Device Breakpoints

Bad:

```text
iphone
ipad
macbook
```

Good:

```text
sm
md
lg
xl
```

or semantic layout thresholds.

---

# 64. Breakpoint Count

Use the smallest useful number of global breakpoint thresholds.

---

# 65. Breakpoint Proliferation

Avoid:

```text
640
672
700
736
768
800
```

because individual screens were patched independently.

---

# 66. Local Component Responsiveness

A reusable component that adapts to its own available width SHOULD use container-responsive behavior when practical.

---

# 67. Container Queries

Container queries SHOULD be considered for:

```text
cards
toolbars
dashboard widgets
filter panels
reusable lists
```

whose composition depends on component width rather than global viewport width.

---

# 68. Viewport Queries

Use viewport breakpoints for true page-level changes such as:

```text
app navigation
shell panes
page gutters
global column structure
```

---

# 69. Responsive Layout Levels

Responsive decisions SHOULD occur in this order:

```text
Intrinsic sizing
↓
Flex/Grid adaptation
↓
Container query
↓
Viewport breakpoint
↓
Special device enhancement
```

---

# 70. Intrinsic Design

Prefer components that naturally adapt through:

```text
min/max sizing
flex-wrap
grid auto-fit
content wrapping
```

before adding explicit breakpoints.

---

# 71. Fluid Layout

Page content SHOULD generally use fluid inline dimensions with meaningful maximum widths.

---

# 72. Reading Width

Long-form text SHOULD maintain an appropriate readable line length rather than spanning large monitors edge-to-edge.

---

# 73. Wide Displays

Large screens SHOULD add:

```text
breathing room
secondary panes
useful context
```

rather than simply stretching every element.

---

# 74. Ultrawide Displays

Do not assume a 2000+ px viewport means core content should become 2000 px wide.

---

# 75. Centered Content

Appropriate application/content regions MAY use max-width containers.

---

# 76. Dense Applications

Data-heavy applications MAY legitimately use more horizontal space than editorial content.

The design must remain structured.

---

# 77. Narrow Layout

At narrow widths, prefer:

```text
single-column flow
stacked controls
progressive disclosure
drawer/overlay secondary content
```

where task semantics permit.

---

# 78. Two-Column Forms

Forms SHOULD generally collapse to one primary column when available width makes scanning/input awkward.

---

# 79. Sidebar

A persistent desktop sidebar MAY become:

```text
drawer
sheet
compact rail
bottom navigation
```

depending on information architecture.

---

# 80. Responsive Navigation

Navigation presentation MAY change.

Navigation meaning and destinations SHOULD remain stable.

---

# 81. Mobile Navigation

Do not place every desktop navigation control into an unstructured hamburger menu.

Preserve hierarchy and frequent actions.

---

# 82. Bottom Navigation

Bottom navigation MAY be appropriate for a small number of high-frequency primary destinations.

---

# 83. Bottom Navigation Safe Area

Bottom navigation MUST account for safe-area inset and touch targets.

---

# 84. Navigation Count

Do not use responsive layout as an excuse for excessive primary navigation destinations.

---

# 85. Breadcrumbs

Breadcrumbs MAY simplify visually at narrow widths but SHOULD preserve meaningful orientation where necessary.

---

# 86. Page Header

Page headers MAY recompose:

```text
title + actions inline
```

to:

```text
title
↓
actions / overflow
```

at narrower widths.

---

# 87. Toolbar

Toolbars SHOULD:

```text
wrap
collapse lower-priority actions
move actions into overflow
```

before clipping.

---

# 88. Toolbar Priority

Responsive toolbar priority SHOULD be explicit.

Example:

```text
Primary action
Secondary frequent actions
Overflow actions
```

---

# 89. Action Discovery

An action moved into overflow remains functionally available but may become less discoverable.

Do not hide high-frequency primary actions unnecessarily.

---

# 90. Filter Layout

Desktop filters MAY be:

```text
inline toolbar
sidebar
```

while narrow layouts MAY use:

```text
filter button
→ sheet/drawer
```

---

# 91. Filter State

Responsive recomposition MUST preserve active filters.

---

# 92. Filter Visibility

The user SHOULD be able to tell when hidden/collapsed filters are active.

---

# 93. Search

Search fields MAY move or expand responsively.

Search semantics and current query MUST remain stable.

---

# 94. List/Detail

A desktop list/detail split MAY recompose to:

```text
list route
→ detail route
```

on narrow screens.

---

# 95. List/Detail State

Recomposition SHOULD preserve:

```text
selected item
filters
sort
scroll position
```

where feasible.

---

# 96. Master/Detail Back Navigation

Narrow list/detail flows MUST provide predictable navigation back to the list context.

---

# 97. Dialog vs Drawer

A focused interaction MAY use:

```text
Dialog on wide screens
Drawer/Sheet on narrow touch screens
```

when semantics remain equivalent.

---

# 98. Responsive Overlay Semantics

Changing visual container MUST NOT break:

```text
focus
keyboard behavior
accessible name
dismissal
```

---

# 99. Full-Screen Mobile Dialog

Complex dialogs MAY become full-screen on narrow devices.

They remain dialogs only if modal semantics still apply.

---

# 100. Dialog Width

Dialogs SHOULD use:

```text
available width
-
safe gutters
```

rather than overflowing narrow screens.

---

# 101. Dialog Height

Large modal content SHOULD use controlled internal scrolling while preserving:

```text
title
important actions
focus visibility
```

---

# 102. Sticky Actions

Sticky mobile actions MAY improve usability.

They MUST NOT obscure:

```text
content
validation
keyboard focus
safe areas
```

---

# 103. Tables

Responsive table behavior MUST be selected according to the table's information relationships.

---

# 104. Do Not Automatically Cardify Tables

Transforming each row into a card can:

```text
hide column comparison
increase vertical length
duplicate labels
```

Do it only when the resulting information model remains useful.

---

# 105. Table Strategy Order

Evaluate:

```text
Fit naturally
↓
Reduce nonessential columns
↓
Allow local horizontal scrolling
↓
Provide column controls
↓
Use alternate narrow representation
```

according to the task.

---

# 106. Horizontal Table Scrolling

Complex tables MAY use horizontal scrolling inside a dedicated table region.

The page itself SHOULD remain vertically oriented.

---

# 107. Scroll Container Visibility

Users SHOULD receive adequate visual indication that more table content exists horizontally where it may not be obvious.

---

# 108. Sticky Table Columns

Sticky first/last columns MAY preserve context.

They MUST be tested for:

```text
zoom
RTL
focus
overlap
```

---

# 109. Sticky Table Headers

Sticky headers MUST NOT obscure focused controls or rows.

---

# 110. Column Priority

Low-priority table columns MAY be hidden at narrower widths if information remains available through:

```text
row details
expandable content
detail page
```

---

# 111. Critical Columns

Critical decision-making information MUST NOT disappear solely because screen width is limited.

---

# 112. Column Selection

Data-heavy products MAY allow users to select visible columns.

---

# 113. Table Card Alternative

A narrow card/list representation SHOULD be treated as a distinct presentation of the same data semantics, not arbitrary DOM reshuffling.

---

# 114. Table Actions

Row actions MUST remain available on touch and keyboard.

Hover-only row controls are prohibited.

---

# 115. Hover

Hover MUST NOT be required to discover or perform essential functionality.

---

# 116. Hover Enhancement

Hover MAY enhance:

```text
preview
tooltip
visual affordance
```

where equivalent keyboard/touch access exists.

---

# 117. Hover Media Query

Use hover capability queries to enhance interfaces conditionally where useful.

---

# 118. Primary Pointer

`pointer` represents the primary pointing device's precision.

Conceptually:

```text
fine
coarse
none
```

---

# 119. Coarse Pointer

A coarse pointer commonly requires:

```text
larger targets
more spacing
less precision-dependent controls
```

---

# 120. Fine Pointer

A fine pointer MAY permit more compact pointer-specific affordances.

Accessibility target-size requirements still apply.

---

# 121. `any-pointer`

`any-pointer` indicates whether any available pointing device matches a capability.

It SHOULD NOT automatically determine the entire interface mode.

---

# 122. `hover`

`hover: hover` means the primary pointing device can conveniently hover.

It does not imply:

```text
desktop
mouse only
keyboard present
```

---

# 123. `any-hover`

`any-hover` MAY reveal additional hover-capable hardware on a hybrid device.

Use carefully.

---

# 124. Capability Combination

Do not write:

```text
hover: none
→ mobile design
```

as a universal device classifier.

---

# 125. Touch Detection

Do not infer permanent touch-only interaction from a touch-capability API.

A laptop may support both touch and mouse.

---

# 126. UA Sniffing

User-agent sniffing SHOULD NOT drive responsive layout.

---

# 127. Feature Detection

Prefer:

```text
CSS capability queries
feature detection
progressive enhancement
```

over browser/device-name detection.

---

# 128. Device Model Detection

Do not maintain:

```text
iPhone 15
iPad Pro
Galaxy Fold
...
```

conditional layout code.

---

# 129. Browser Exceptions

Browser-specific workarounds MAY be necessary for verified defects.

They MUST:

```text
document bug
scope workaround
include removal condition
```

---

# 130. Pointer Events

Interactive behavior SHOULD support the modern pointer-event model where appropriate rather than maintaining separate unrelated mouse/touch logic.

---

# 131. Pointer Cancellation

Gestural controls SHOULD handle interrupted/cancelled interactions safely.

---

# 132. Accidental Activation

Do not trigger destructive actions merely on touch-down/pointer-down when users need the ability to cancel.

---

# 133. Gesture-Only Actions

Essential functionality MUST NOT be available only through gestures such as:

```text
swipe
pinch
long press
drag
```

without an accessible alternative where required.

---

# 134. Swipe

Swipe MAY accelerate:

```text
archive
navigate
dismiss
```

but equivalent visible/keyboard actions SHOULD exist.

---

# 135. Long Press

Long press SHOULD NOT be the sole discovery/access mechanism for an important command.

---

# 136. Drag and Drop

Drag-and-drop functionality MUST have an alternative input method when required by Accessibility Guidelines.

---

# 137. Keyboard

Responsive layouts MUST remain fully operable through keyboard input where the interface supports keyboard use.

---

# 138. Keyboard Availability

Do not assume:

```text
mobile viewport
→ no keyboard
```

Users can attach hardware keyboards to phones/tablets.

---

# 139. Desktop Touch

Do not assume:

```text
desktop viewport
→ precise pointer only
```

Touchscreen laptops exist.

---

# 140. Focus Indicators

Responsive CSS MUST NOT hide or clip focus indicators.

---

# 141. Overflow and Focus

Scrollable containers MUST allow focused items to become visible.

---

# 142. Sticky UI and Focus

Sticky:

```text
headers
toolbars
bottom bars
```

MUST NOT fully obscure the focused target.

---

# 143. Keyboard Navigation Recomposition

When desktop navigation becomes a Drawer/Sheet, keyboard interaction MUST remain complete.

---

# 144. Keyboard Shortcuts

Desktop keyboard shortcuts MAY enhance productivity.

Equivalent commands MUST remain discoverable through the UI.

---

# 145. Mobile Shortcut Assumptions

Keyboard shortcuts SHOULD still function on narrow devices with hardware keyboards where technically supported.

---

# 146. Touch Target Baseline

Interactive pointer targets MUST meet the applicable Accessibility standard.

Canonical WCAG AA baseline:

```text
24 × 24 CSS px
```

or satisfy its allowed spacing/equivalent exceptions.

---

# 147. Internal Ergonomic Target

Where practical, frequently used touch controls SHOULD target approximately:

```text
44 × 44 CSS px
```

or an equivalent ergonomic hit area.

This is an internal stronger usability target, not a claim that WCAG AA universally requires 44 px.

---

# 148. Visual vs Hit Area

An icon MAY be:

```text
16–20 px
```

while its interactive target is substantially larger.

---

# 149. Adjacent Controls

Small adjacent controls require sufficient separation to prevent accidental activation.

---

# 150. Destructive Touch Actions

Destructive controls SHOULD NOT sit immediately adjacent to high-frequency safe actions without adequate separation.

---

# 151. Touch Drag Precision

Do not require precise touch dragging for tasks that can be represented with simpler controls.

---

# 152. Stylus

Stylus support MAY enhance drawing/annotation workflows.

Do not remove touch/mouse alternatives unless stylus input is essential to the product.

---

# 153. Target Density

Compact desktop density MAY increase information density.

It MUST NOT produce unusably small targets for hybrid/touch interaction.

---

# 154. Responsive Density

Do not automatically equate:

```text
large screen
→ compact
small screen
→ comfortable
```

Density can be an independent preference/product decision.

---

# 155. Text Scaling

Interfaces MUST remain usable when users increase text size.

---

# 156. Fixed Height Controls

Avoid fixed component heights that clip multi-line or enlarged text.

---

# 157. Text Wrapping

Important:

```text
labels
actions
errors
status
```

SHOULD wrap or recompose rather than clip.

---

# 158. Localization Expansion

Responsive testing MUST include long translated text.

---

# 159. RTL

Responsive layouts MUST work in supported RTL locales.

---

# 160. Physical Left/Right Assumptions

Responsive code SHOULD use:

```text
inline-start
inline-end
block-start
block-end
```

semantics where direction-sensitive.

---

# 161. Responsive Images

Images SHOULD be delivered at appropriate dimensions/resolution.

---

# 162. Do Not Download Desktop Image for Mobile Needlessly

A 4000 px source SHOULD NOT be downloaded solely to display a 320 px thumbnail when responsive image delivery can avoid it.

---

# 163. Responsive Image Sources

Use appropriate platform mechanisms such as:

```text
srcset
sizes
picture
```

where multiple image variants are useful.

---

# 164. Art Direction

`<picture>` or equivalent MAY provide different crops/compositions where narrow and wide layouts genuinely need different imagery.

---

# 165. Image Meaning

Responsive art direction MUST preserve the content/meaning of important images.

---

# 166. High-Density Displays

Image delivery SHOULD account for high device pixel density without overserving excessive data.

---

# 167. DPR Is Not Layout Width

Device pixel ratio MUST NOT be used as a proxy for:

```text
phone
tablet
desktop
```

---

# 168. Vector Assets

Vector formats MAY be preferable for:

```text
icons
logos
simple illustrations
```

when safe and appropriate.

---

# 169. Media Aspect Ratio

Reserve expected aspect ratios to reduce layout shift.

---

# 170. Video

Video players MUST remain responsive and preserve controls at narrow widths.

---

# 171. Video Controls

Controls MUST remain:

```text
touch accessible
keyboard accessible
safe-area aware
```

where applicable.

---

# 172. Background Media

Decorative large media SHOULD be reduced or omitted when it creates disproportionate mobile performance cost.

---

# 173. Performance

Responsive design includes responsive resource loading—not merely responsive CSS.

---

# 174. Mobile Networks

Do not assume small viewport means slow network.

Likewise, do not assume desktop means fast network.

Network capability is separate.

---

# 175. Network-Aware Enhancement

Network-aware adaptation MAY be used conservatively for optional content.

It MUST NOT create unpredictable loss of core functionality.

---

# 176. Device Memory/CPU

Low-resource devices can have wide or narrow screens.

Performance engineering SHOULD remain independent of screen-size assumptions.

---

# 177. JavaScript Budget

Do not ship substantially more JavaScript to small screens simply because elements are hidden with CSS.

---

# 178. Conditional Rendering

Large optional experiences MAY be conditionally loaded when appropriate.

Behavior MUST remain stable if dimensions later change.

---

# 179. Resize Events

Avoid expensive application-wide work on every raw resize event.

---

# 180. CSS Before JavaScript

Prefer CSS responsive behavior over JavaScript width checks when presentation alone is changing.

---

# 181. JavaScript Media Queries

When JavaScript genuinely needs media-state awareness, use supported media-query APIs rather than duplicating magic breakpoint constants.

---

# 182. SSR Width Guessing

Server-rendered applications SHOULD NOT guess exact client viewport width to determine critical semantic content.

---

# 183. Hydration

Responsive SSR SHOULD avoid rendering one semantic structure on the server and an incompatible structure on the client solely because viewport width became known.

---

# 184. CSS-First SSR

Prefer:

```text
same meaningful content
+
responsive CSS
```

where possible.

---

# 185. Client-Only Adaptation

If client-only dimensions are necessary, render a stable fallback that does not create destructive hydration/layout shifts.

---

# 186. Resize State Preservation

When crossing breakpoints:

```text
open state
input state
selection
drafts
```

SHOULD remain stable where semantics persist.

---

# 187. Responsive Component Replacement

If a Dialog becomes Drawer on breakpoint change, do not unexpectedly close it and discard user input.

---

# 188. Resize During Interaction

Interfaces MUST tolerate:

```text
browser resize
device rotation
split-screen changes
fold/unfold
```

during active interaction.

---

# 189. Scroll

The page SHOULD normally have one clear primary scrolling axis.

---

# 190. Nested Scroll

Nested scrolling regions SHOULD be introduced only when the component genuinely requires independent scrolling.

---

# 191. Excess Nested Scroll

Avoid multiple nested:

```text
page scroll
panel scroll
table scroll
drawer scroll
```

regions when users cannot understand which region will move.

---

# 192. Scrollbars

Interfaces SHOULD remain usable whether scrollbars:

```text
overlay content
consume layout width
are always visible
```

according to OS/user settings.

---

# 193. Do Not Hide Scrollbars Blindly

Hidden scrollbars can remove important overflow affordance.

Hide only with strong justification and preserved operability.

---

# 194. Scroll Position

Navigation/recomposition SHOULD preserve useful scroll position where expected.

---

# 195. Sticky

Sticky UI SHOULD be limited to items that genuinely need persistent access/context.

---

# 196. Mobile Sticky Density

Multiple simultaneously sticky bars can consume most of a narrow viewport.

Avoid:

```text
browser chrome
+
app header
+
tabs
+
filter bar
+
bottom actions
```

leaving little content.

---

# 197. Sticky Priority

On narrow screens, choose the smallest useful persistent chrome.

---

# 198. Fixed Position

Fixed controls MUST account for:

```text
safe areas
browser chrome
virtual keyboard
zoom
```

---

# 199. Floating Action Button

A floating action button MAY be used where the interaction pattern clearly benefits from one.

It MUST NOT obscure content or compete with system UI.

---

# 200. PWA Principle

A Progressive Web App remains a web application first.

Responsive, accessible, performant web behavior remains mandatory whether or not installation is available.

---

# 201. PWA Progressive Enhancement

Installability and device integration SHOULD enhance the baseline website.

The application MUST NOT require installation merely to perform ordinary web tasks unless the product is intentionally installation-only.

---

# 202. Web App Manifest

Installable PWA experiences SHOULD define an appropriate web app manifest.

---

# 203. Manifest Identity

Manifest metadata SHOULD intentionally define:

```text
name
short name
icons
start URL
display mode
theme/background behavior
```

according to product needs.

---

# 204. Manifest Scope

PWA scope MUST align with intended navigation boundaries.

---

# 205. Display Mode

Installed PWA behavior MAY differ under:

```text
browser
standalone
fullscreen
windowed
```

contexts.

The application MUST remain usable in each supported context.

---

# 206. Standalone Mode

Do not rely on browser navigation chrome when running in standalone mode.

The application needs its own understandable navigation and exit/back flows.

---

# 207. Installed Does Not Mean Mobile

PWAs MAY run as standalone applications on desktop.

Responsive design MUST support arbitrary resizable app windows.

---

# 208. Desktop PWA Window

An installed desktop PWA can have a window narrower than a phone or wider than a large monitor.

Do not infer device category from installed status.

---

# 209. Window Controls Overlay

PWAs using window-controls overlay MUST keep application controls clear of operating-system window controls.

---

# 210. Titlebar Environment Values

Where supported, titlebar area environment variables MAY help position content safely around desktop window controls.

---

# 211. PWA Safe Areas

Installed applications SHOULD still respect:

```text
display cutouts
titlebar controls
viewport segments
system UI
```

where applicable.

---

# 212. Service Worker

A service worker MAY provide:

```text
offline support
caching
background capabilities
push integration
```

according to product architecture.

Its existence does not make an interface responsive or usable automatically.

---

# 213. Offline

PWAs SHOULD define explicit offline behavior if offline use is part of the product promise.

---

# 214. Offline State

Distinguish:

```text
offline
loading
empty
server error
```

states.

---

# 215. Offline Navigation

Cached application shell/navigation MUST NOT imply data is current when authoritative content cannot be refreshed.

---

# 216. Offline Mutation

Offline writes require deliberate:

```text
queueing
conflict handling
replay
idempotency
user status
```

and are not automatically enabled because a service worker exists.

---

# 217. PWA Update

Application updates SHOULD have predictable semantics.

Do not force disruptive reloads during active work without need.

---

# 218. Version Skew

Installed PWAs MAY remain open for long periods.

Frontend/backend compatibility MUST account for temporarily stale clients.

---

# 219. Install Prompt

Install promotion SHOULD appear when installation provides user value.

Do not block the product with aggressive installation prompts.

---

# 220. Install Choice

Users declining installation MUST still receive the supported browser experience.

---

# 221. App Icons

PWA icons MUST remain recognizable under supported platform masking/cropping behavior.

---

# 222. Launch Screen

Launch/splash behavior SHOULD not imply readiness before required application state is available.

---

# 223. Deep Links

Installed app deep links follow Routes Guidelines and MUST preserve authentication/authorization.

---

# 224. Back Navigation

PWA installed-mode navigation SHOULD remain predictable even when browser chrome is absent.

---

# 225. Share and File Integration

Advanced platform integrations MAY be added when they provide genuine product value.

They require:

```text
capability detection
fallback
security review
privacy review
```

---

# 226. Permissions

Device/browser permissions MUST be requested contextually.

Examples:

```text
camera
microphone
location
notifications
```

Do not request them merely because the device supports them.

---

# 227. Permission Denial

Core product behavior SHOULD degrade gracefully when an optional device permission is denied.

---

# 228. Camera Capture

Camera-based flows SHOULD provide:

```text
file picker
manual entry
alternative workflow
```

where feasible.

---

# 229. File Picker

File/media input follows File & Media Guidelines regardless of device capture method.

---

# 230. Printing

Applications with meaningful print/export workflows SHOULD define print-responsive behavior separately from viewport-responsive behavior.

---

# 231. Print Media

Print styles MAY:

```text
remove navigation
expand truncated text
simplify colors
show URLs where useful
```

while preserving meaningful content.

---

# 232. Reduced Motion

Responsive/device adaptations MUST respect reduced-motion preferences.

---

# 233. Reduced Data

Products MAY respect data-saving preferences where supported for optional high-bandwidth content.

---

# 234. Contrast Preferences

Where browser/platform capabilities exist, applications MAY enhance for user contrast preferences.

Mandatory accessibility still comes from the core accessible design.

---

# 235. Color Scheme

The application SHOULD expose supported light/dark color-scheme information appropriately to browser-native UI where relevant.

---

# 236. Form Controls

Native controls SHOULD integrate correctly with the active theme and platform.

---

# 237. Input Modality Change

A user may change input modality during one session.

Example:

```text
touch
→ connect mouse
→ use keyboard
```

The application MUST not require reload to become usable.

---

# 238. Modality-Specific UI

Avoid globally switching the entire UI into:

```text
touch mode
mouse mode
```

based on one event unless a real product requirement exists.

---

# 239. Hover After Touch

Do not permanently disable hover behavior after detecting one touch interaction.

---

# 240. Keyboard After Touch

Do not hide keyboard focus indicators because the last interaction happened through touch.

Use focus-visible behavior appropriately.

---

# 241. Capability Changes

Responsive capability queries SHOULD naturally adapt when environment capabilities change where browsers support this.

---

# 242. Browser Window Resizing

Desktop applications MUST support arbitrary browser window resizing within their declared minimum usable viewport.

---

# 243. Split Screen

Test desktop/tablet split-screen behavior.

It is a common reason viewport width does not correspond to device class.

---

# 244. Browser Sidebars

Browser:

```text
developer tools
bookmarks
vertical tabs
side panels
```

may reduce usable content width.

The app SHOULD continue responding to the actual viewport.

---

# 245. OS Scaling

Operating-system display scaling MUST NOT break layout assumptions.

CSS pixels, not physical hardware pixels, are the primary web layout unit.

---

# 246. Screenshot Dimensions Are Not Requirements

Design handoffs such as:

```text
1440 × 900
390 × 844
```

are test/reference canvases.

They MUST NOT become the only supported dimensions.

---

# 247. Responsive Design Handoff

Design specifications SHOULD document:

```text
layout behavior
minimum/maximum widths
priority
wrapping
collapse behavior
sticky behavior
```

rather than only multiple static screenshots.

---

# 248. Breakpoint Design Review

Design review SHOULD inspect behavior:

```text
before breakpoint
at breakpoint
after breakpoint
```

not just canonical target widths.

---

# 249. Continuous Width Testing

Responsive QA SHOULD test intermediate widths.

Bugs frequently occur between design frames.

---

# 250. Minimum Test Width

Core web interfaces SHOULD test at approximately:

```text
320 CSS px
```

or the Accessibility standard's current reflow baseline.

---

# 251. Representative Widths

Teams MAY maintain representative test canvases such as:

```text
narrow phone
large phone
tablet/narrow window
laptop
desktop
wide desktop
```

but these are sampling points, not device contracts.

---

# 252. Boundary Testing

For every global breakpoint test:

```text
breakpoint - 1
breakpoint
breakpoint + 1
```

or equivalent.

---

# 253. Height Testing

Do not test width alone.

Short-height viewports expose defects in:

```text
dialogs
dropdowns
date pickers
sticky UI
virtual keyboard
```

---

# 254. Narrow and Short

Test combinations such as:

```text
narrow + tall
narrow + short
wide + short
wide + tall
```

---

# 255. Orientation Testing

Where mobile/tablet support exists, test both:

```text
portrait
landscape
```

at least for critical flows.

---

# 256. Touch Testing

Critical flows SHOULD be tested using real touch input or sufficiently representative hardware.

---

# 257. Mouse Testing

Desktop workflows SHOULD be tested with a precise pointer.

---

# 258. Keyboard Testing

Critical flows MUST be tested using keyboard-only interaction.

---

# 259. Hybrid Testing

Important applications SHOULD include at least one hybrid input test scenario.

---

# 260. Zoom Testing

Test critical pages at required zoom/reflow conditions.

---

# 261. Text Scaling Testing

Test increased text size independently from viewport resizing where supported.

---

# 262. Safe-Area Testing

Edge-to-edge/mobile/PWA layouts SHOULD test non-zero safe-area conditions.

---

# 263. Virtual Keyboard Testing

Form-heavy narrow layouts SHOULD test with the software keyboard visible.

---

# 264. Long Content Testing

Test:

```text
long names
long validation errors
long navigation labels
long translated content
large numeric values
```

---

# 265. RTL Testing

Responsive layouts SHOULD be visually and functionally tested in RTL where supported.

---

# 266. Dynamic Content

Test responsive behavior when:

```text
alerts appear
errors appear
badges grow
filters activate
content loads
permissions change
```

not only static ideal state.

---

# 267. Loading States

Loading/skeleton states SHOULD use the same responsive geometry assumptions as final content.

---

# 268. Error States

Error messages MUST not create page overflow or hide recovery actions at narrow widths.

---

# 269. Empty States

Empty states SHOULD remain concise and usable across viewport sizes.

---

# 270. Visual Regression

Representative responsive widths SHOULD participate in visual regression for foundational surfaces.

---

# 271. Screenshot Explosion

Do not generate screenshots for hundreds of arbitrary viewport dimensions.

Use:

```text
representative widths
+
breakpoint boundaries
+
high-risk components
```

---

# 272. Automated Overflow Test

Tooling MAY detect unexpected horizontal overflow on important pages.

---

# 273. Responsive Performance Test

Critical pages SHOULD be tested for:

```text
network payload
image selection
JS cost
layout shift
interaction responsiveness
```

on representative constrained hardware/network profiles.

---

# 274. Device Lab

Teams supporting broad consumer use SHOULD maintain a small representative real-device matrix rather than relying entirely on desktop emulation.

---

# 275. Browser Matrix

Responsive behavior follows the organization's supported browser policy.

---

# 276. Progressive Enhancement

Unsupported advanced capabilities MUST fall back to a functional baseline.

---

# 277. No Critical Feature Behind Novel API

A critical workflow SHOULD NOT depend solely on a relatively new device/browser capability without an appropriate fallback.

---

# 278. Responsive Documentation

Reusable layout/pattern documentation SHOULD define:

```text
narrow behavior
wide behavior
touch behavior
keyboard behavior
overflow behavior
```

where relevant.

---

# 279. Responsive Ownership

A feature team owns responsive behavior for all supported viewports—not only the width shown in the design ticket.

---

# 280. Design System Ownership

Foundational responsive behavior belongs to shared:

```text
tokens
layout primitives
components
patterns
```

rather than being solved independently in every feature.

---

# 281. Responsive Exceptions

One-off media queries SHOULD be justified.

Repeated exceptions indicate a missing:

```text
token
layout primitive
component behavior
pattern
```

---

# 282. Breakpoint Audit

Periodically identify:

```text
unused breakpoints
one-off breakpoints
duplicate thresholds
device-specific hacks
```

and consolidate them.

---

# 283. Responsive Review Checklist

```text
□ Content priority defined
□ Narrow behavior defined
□ Wide behavior defined
□ No page horizontal overflow
□ Zoom/reflow works
□ Breakpoints content-driven
□ Touch targets adequate
□ Keyboard works
□ Hover not required
□ Safe areas handled
□ Virtual keyboard considered
□ RTL/localization considered
□ Responsive media
□ PWA installed mode considered where applicable
```

---

# 284. Viewport Checklist

```text
□ width=device-width
□ Zoom not disabled
□ Full-height behavior intentional
□ dvh/svh/lvh considered where needed
□ Browser chrome considered
□ Virtual keyboard considered
□ Safe-area behavior defined
```

---

# 285. Input Checklist

```text
□ Mouse
□ Touch
□ Keyboard
□ Hybrid input
□ Hover optional
□ Coarse pointer supported
□ Gesture alternatives
□ Drag alternative where required
□ Focus visible
```

---

# 286. Touch Checklist

```text
□ Target size
□ Target spacing
□ No hover dependency
□ No precision-only gesture
□ Destructive actions separated
□ Fixed controls safe-area aware
□ Software keyboard tested
□ Scroll remains usable
```

---

# 287. Responsive Navigation Checklist

```text
□ Same information architecture
□ Primary destinations preserved
□ High-frequency actions discoverable
□ Drawer keyboard-accessible
□ Focus return
□ Active destination visible
□ Safe area
□ Back behavior predictable
```

---

# 288. Responsive Table Checklist

```text
□ Comparison need understood
□ Critical columns identified
□ Horizontal scroll local if used
□ Scroll affordance
□ Header context preserved
□ Row actions available
□ Keyboard focus visible
□ Sticky columns tested
□ Narrow alternative preserves meaning
```

---

# 289. Safe-Area Checklist

```text
□ viewport-fit requirement known
□ Top inset
□ Inline start/end insets
□ Bottom inset
□ Sticky/fixed UI
□ Full-screen overlays
□ Bottom navigation
□ Landscape
□ Installed/PWA contexts
```

---

# 290. Virtual Keyboard Checklist

```text
□ Focused field remains visible
□ Validation remains visible
□ Submit/recovery action reachable
□ Fixed footer doesn't cover input
□ Combobox/popover positions correctly
□ Viewport resize behavior tested
□ Orientation tested
```

---

# 291. PWA Checklist

```text
□ Browser baseline works
□ Manifest intentional
□ Installed navigation works
□ Standalone mode tested
□ Resizable desktop window tested
□ Safe/titlebar areas considered
□ Offline semantics defined
□ Update behavior defined
□ Long-lived client compatibility
□ Permission requests contextual
□ Installation optional where appropriate
```

---

# 292. Definition of Done — Responsive Feature

A user-facing feature is ready when:

```text
✓ Works at minimum supported width
✓ Works through representative intermediate widths
✓ Works at wide layout
✓ No accidental horizontal page scroll
✓ Content priority preserved
✓ Required actions preserved
✓ Keyboard works
✓ Touch works
✓ Focus remains visible
✓ Zoom/reflow passes
✓ Long translations pass
✓ RTL passes where supported
✓ Loading/error/empty states pass
✓ Safe areas handled where relevant
✓ Virtual keyboard handled where relevant
✓ Responsive performance acceptable
```

---

# 293. Definition of Done — Responsive Table

```text
✓ Data relationships understood
✓ Narrow strategy selected intentionally
✓ Critical fields remain available
✓ Local horizontal scrolling if required
✓ Page itself does not horizontally overflow
✓ Row actions remain accessible
✓ Keyboard focus visible
✓ Touch interaction works
✓ Sticky regions don't obscure focus/content
✓ RTL tested
✓ Zoom tested
```

---

# 294. Definition of Done — Full-Height Mobile Surface

```text
✓ Browser chrome behavior tested
✓ Dynamic viewport behavior understood
✓ Safe-area insets applied
✓ Virtual keyboard tested
✓ Focused controls visible
✓ Bottom actions reachable
✓ Content can exceed viewport safely
✓ Orientation change safe
```

---

# 295. Definition of Done — Installed PWA Surface

```text
✓ Browser version remains usable
✓ Manifest values correct
✓ Standalone navigation works
✓ Window resize works
✓ Narrow installed window works
✓ Wide installed window works
✓ Safe/titlebar region handled
✓ Offline/error state clear
✓ Update behavior safe
✓ Deep links work
```

---

# 296. Responsive & Device Anti-Patterns

Avoid:

```text
if width < 768
  device = mobile
```

Avoid:

```text
if userAgent contains "iPhone"
  render MobileApp
```

Avoid:

```text
tablet = 768–1024
```

as a behavioral contract.

Avoid:

```text
desktop has feature
mobile hides it
```

without deliberate product policy.

Avoid:

```text
desktop layout
transform: scale(.7)
```

as mobile design.

Avoid:

```text
width: 1200px
```

for the main application shell.

Avoid:

```text
min-width: 1024px
```

forcing page-level horizontal scrolling.

Avoid:

```text
user-scalable=no
```

Avoid:

```text
maximum-scale=1
```

Avoid:

```text
height: 100vh
```

everywhere without understanding mobile viewport behavior.

Avoid:

```text
bottom: 0
```

for critical edge controls with no safe-area consideration.

Avoid:

```text
padding-bottom: 34px
```

as a universal notch/home-indicator rule.

Avoid:

```text
hover reveals Delete
```

as the only way to discover deletion.

Avoid:

```text
:hover
```

as required interaction.

Avoid:

```text
touch detected once
→ disable hover forever
```

Avoid:

```text
pointer: coarse
→ phone
```

Avoid:

```text
hover: hover
→ desktop
```

Avoid:

```text
devicePixelRatio > 2
→ mobile
```

Avoid:

```text
landscape
→ desktop layout
```

Avoid:

```text
Rotate your phone to continue
```

because portrait layout was not designed.

Avoid:

```text
desktop keyboard shortcut
```

as the only access to a command.

Avoid:

```text
swipe left to delete
```

with no alternative action.

Avoid:

```text
drag to reorder
```

with no accessible alternative when required.

Avoid:

```text
16 × 16 icon
```

as the entire touch target.

Avoid:

```text
compact desktop mode
```

with tiny controls on a touchscreen laptop.

Avoid:

```text
table → cards
```

automatically without considering cross-row comparison.

Avoid:

```text
hide five table columns
```

with no way to retrieve their information.

Avoid:

```text
overflow-x: auto
```

on the entire application page to solve one table.

Avoid:

```text
fixed bottom toolbar
```

covering the software keyboard.

Avoid:

```text
sticky header
```

covering focused inputs.

Avoid:

```text
5 stacked sticky bars
```

on a small viewport.

Avoid:

```text
desktop image 5 MB
```

displayed as a 300 px mobile thumbnail.

Avoid:

```text
CSS display:none
```

while still downloading enormous optional assets unnecessarily.

Avoid:

```text
window.innerWidth
```

driving every style decision that CSS could solve.

Avoid:

```text
server guesses iPhone width
```

to generate semantic content.

Avoid:

```text
resize
→ remount feature
→ lose form state
```

Avoid:

```text
rotation
→ reset workflow
```

Avoid:

```text
Dialog → Drawer
```

breakpoint switch that discards user input.

Avoid:

```text
mobile viewport
→ keyboard impossible
```

Avoid:

```text
desktop viewport
→ touch impossible
```

Avoid:

```text
PWA installed
→ mobile
```

Avoid:

```text
PWA
→ automatically offline capable
```

Avoid:

```text
service worker exists
→ data safe offline
```

Avoid:

```text
install our app
```

modal before users understand the product.

Avoid:

```text
PWA standalone
```

that relies on browser Back controls no longer visible.

Avoid:

```text
new browser device API
```

as the only route through a critical workflow.

Avoid testing only:

```text
390 px
768 px
1440 px
```

with no intermediate widths.

Avoid testing width while ignoring short viewport height.

Avoid:

```text
design screenshot
=
responsive specification
```

---

# 297. AI Responsive & Device Rules

AI coding agents MUST NOT infer device type directly from viewport width.

---

# 298. AI Mobile Rule

AI SHOULD interpret:

```text
mobile
```

primarily as a narrow/touch-relevant product context—not a guaranteed device identity.

---

# 299. AI Breakpoint Rule

AI MUST use approved Design Token breakpoints before introducing new thresholds.

---

# 300. AI Content Rule

AI MUST NOT hide required functionality solely because a viewport is narrow.

---

# 301. AI CSS Rule

AI SHOULD prefer CSS responsive layout before JavaScript viewport branching.

---

# 302. AI Container Rule

AI SHOULD consider container queries when reusable component behavior depends on local space.

---

# 303. AI UA Rule

AI MUST NOT introduce device user-agent sniffing for normal responsive presentation.

---

# 304. AI Capability Rule

AI SHOULD use feature/capability detection rather than device-name detection.

---

# 305. AI Hover Rule

AI MUST NOT make required actions hover-only.

---

# 306. AI Pointer Rule

AI MUST NOT interpret coarse/fine pointer media queries as definitive phone/desktop classification.

---

# 307. AI Keyboard Rule

AI MUST preserve keyboard interaction at all viewport sizes.

---

# 308. AI Touch Rule

AI SHOULD provide adequate touch targets even on layouts normally considered desktop when touch input is plausible.

---

# 309. AI Zoom Rule

AI MUST NOT disable user zoom.

---

# 310. AI Reflow Rule

AI MUST avoid page-level two-dimensional scrolling for ordinary content at the accessibility reflow baseline.

---

# 311. AI Viewport-Unit Rule

AI SHOULD consider dynamic viewport behavior before using `100vh` for mobile full-height surfaces.

---

# 312. AI Safe-Area Rule

AI MUST account for safe-area environment values when placing critical controls at display edges in edge-to-edge layouts.

---

# 313. AI Virtual-Keyboard Rule

AI MUST consider software-keyboard visibility for fixed/sticky actions near form controls.

---

# 314. AI Orientation Rule

AI MUST NOT require landscape/portrait unless the task genuinely depends on it.

---

# 315. AI Responsive-Table Rule

AI MUST evaluate:

```text
scroll
column priority
detail representation
```

before arbitrarily converting a Table to cards.

---

# 316. AI State-Preservation Rule

AI SHOULD preserve interaction state when crossing responsive breakpoints.

---

# 317. AI Dialog/Drawer Rule

AI MUST preserve semantic/focus behavior when recomposing Dialog into Drawer or another surface.

---

# 318. AI Media Rule

AI SHOULD use responsive image delivery for materially different rendered image sizes.

---

# 319. AI Performance Rule

AI MUST NOT assume hidden visual content has zero download/runtime cost.

---

# 320. AI PWA Rule

AI MUST preserve a functional web baseline before adding install-specific PWA behavior.

---

# 321. AI Installed-Mode Rule

AI MUST NOT assume an installed PWA has a fixed mobile-size viewport.

---

# 322. AI Offline Rule

AI MUST distinguish:

```text
cached shell
offline-readable data
offline mutation
full synchronization
```

rather than calling all of them "offline support."

---

# 323. AI Permission Rule

AI SHOULD request device/browser permissions only when the user enters a feature that needs them.

---

# 324. AI Testing Rule

AI SHOULD add tests around:

```text
narrow viewport
wide viewport
breakpoint boundaries
keyboard
touch
zoom
safe areas
```

when changing foundational responsive behavior.

---

# 325. AI Gold Rule

When uncertain:

```text
Intrinsic responsive layout
>
Container adaptation
>
Approved viewport breakpoint
>
Capability enhancement
>
Device-specific special case
```

And:

```text
Available space
+
actual capability
>
device-name assumption
```

---

# 326. Golden Responsive & Device Rules

**1. Responsive design responds to available space and capabilities, not device labels.**

**2. Mobile, tablet, and desktop are useful testing categories, not authoritative runtime identities.**

**3. Viewport width alone does not identify a device.**

**4. Input capability is independent from viewport size.**

**5. A user may have touch, mouse, stylus, and keyboard simultaneously.**

**6. Required functionality remains available across supported responsive states.**

**7. Responsive layouts recompose rather than merely shrink.**

**8. Critical information never disappears solely because space is constrained.**

**9. Source/DOM order remains logical despite visual responsive reordering.**

**10. Responsive web applications declare a correct device-width viewport.**

**11. Browser zoom is never intentionally disabled.**

**12. Normal content reflows without page-level two-dimensional scrolling at accessibility-required narrow widths.**

**13. Components genuinely requiring two-dimensional layout own their horizontal scrolling locally.**

**14. `100vh` is not treated as universally equal to the visible mobile viewport.**

**15. Dynamic, small, and large viewport units are selected according to actual layout semantics.**

**16. Full-height surfaces allow content to grow beyond the viewport when necessary.**

**17. Software keyboards are part of mobile viewport design.**

**18. Focused form controls remain visible when the virtual keyboard opens.**

**19. Bottom/fixed actions never hide focused fields or validation.**

**20. Edge-to-edge layouts account for safe-area insets.**

**21. Safe-area sizes are never hard-coded to one device model.**

**22. Base design spacing and safe-area spacing are composed deliberately.**

**23. Foldable-specific enhancements remain progressive enhancements.**

**24. Critical UI avoids known fold/hinge occlusions where platform information exists.**

**25. Orientation is not a substitute for responsive layout.**

**26. State survives ordinary rotation and resizing.**

**27. Breakpoints are content-driven behavior thresholds.**

**28. Device-brand breakpoints are prohibited.**

**29. Global breakpoints are centrally governed.**

**30. Repeated one-off media-query thresholds are treated as system debt.**

**31. Intrinsic layout is preferred before breakpoint proliferation.**

**32. Container queries are preferred when local component width—not viewport width—controls composition.**

**33. Wide layouts use additional space intentionally rather than stretching everything.**

**34. Reading content keeps a readable measure on large displays.**

**35. Navigation may change presentation but preserves its information architecture.**

**36. Narrow navigation does not make important destinations disappear.**

**37. Toolbars use explicit action priority and overflow behavior.**

**38. Active filters remain visible/understandable even when the filter UI is collapsed.**

**39. List/detail layouts preserve list context when recomposed to narrow routes.**

**40. Responsive overlay changes preserve focus and accessibility semantics.**

**41. Tables are not automatically converted into cards.**

**42. Responsive-table strategy follows the information relationship and comparison task.**

**43. Complex tables may scroll horizontally inside their own region.**

**44. Critical table information remains retrievable at narrow widths.**

**45. Hover never becomes the only path to required functionality.**

**46. `pointer`, `hover`, `any-pointer`, and `any-hover` describe capabilities—not device classes.**

**47. User-agent/device-model sniffing is not a responsive layout strategy.**

**48. Browser-specific workarounds document the underlying verified defect.**

**49. Pointer interactions remain safely cancellable where appropriate.**

**50. Gestures supplement rather than replace required accessible controls.**

**51. Right-click/context menus are not the only access path to essential actions.**

**52. Keyboard functionality remains available at narrow/mobile viewport sizes.**

**53. Touch functionality remains usable at desktop/wide viewport sizes.**

**54. WCAG target-size requirements remain the minimum accessibility baseline.**

**55. Frequently used touch actions should generally receive larger ergonomic hit areas where practical.**

**56. Visual icon size and interactive hit-target size are distinct concerns.**

**57. Responsive density never reduces controls below accessibility requirements.**

**58. Enlarged text does not clip essential controls or content.**

**59. Long translated copy is part of responsive testing.**

**60. RTL is tested as part of responsive behavior.**

**61. Responsive image delivery avoids unnecessary oversized downloads.**

**62. Device pixel ratio is not a device classifier.**

**63. Important media maintains meaning when art-directed across breakpoints.**

**64. Responsive resource loading is part of performance engineering.**

**65. Screen size is not used as a proxy for network speed or hardware power.**

**66. CSS handles presentation changes before JavaScript where feasible.**

**67. Server rendering does not invent client viewport facts for critical content.**

**68. Responsive hydration avoids incompatible semantic trees where possible.**

**69. Crossing a breakpoint should not discard user work.**

**70. Resizing, rotation, split-screen, and fold/unfold are expected runtime events.**

**71. Primary page scrolling remains understandable and predictable.**

**72. Nested scrolling is introduced only for genuine independent scroll regions.**

**73. Sticky UI is budgeted carefully on narrow/short screens.**

**74. Fixed and sticky controls account for safe areas, browser chrome, focus, and virtual keyboards.**

**75. PWAs remain well-built websites before installability is considered.**

**76. PWA installation is progressive enhancement unless the product explicitly requires an installed context.**

**77. Installed PWA windows are treated as resizable windows, not fixed mobile screens.**

**78. Standalone mode provides sufficient application navigation without relying on browser chrome.**

**79. Desktop PWA window controls and titlebar regions are respected where advanced overlays are used.**

**80. A service worker does not automatically mean the product supports offline workflows.**

**81. Offline shell, offline reads, offline writes, and synchronization are separate capabilities.**

**82. PWA update behavior does not casually destroy active user work.**

**83. Long-lived installed clients are considered in backend/API compatibility.**

**84. Install prompts are contextual and non-blocking where installation is optional.**

**85. Device permissions are requested when users understand why they are needed.**

**86. Optional permission denial has a usable fallback whenever feasible.**

**87. Responsive QA tests intermediate sizes—not only design-frame dimensions.**

**88. Breakpoint boundaries are tested immediately below, at, and above the threshold.**

**89. Viewport height is tested in addition to width.**

**90. Virtual keyboards are tested for form-heavy mobile flows.**

**91. Safe areas are tested with non-zero inset conditions for edge-to-edge UI.**

**92. Keyboard-only interaction is tested at every major responsive composition.**

**93. Important products test at least one hybrid touch + keyboard/pointer scenario.**

**94. Visual regressions include representative responsive states without exploding into every possible dimension.**

**95. Screenshots are examples of layouts, not responsive specifications.**

**96. Responsive design handoff describes behavior, priorities, wrapping, and recomposition—not only pixels.**

**97. Feature teams own responsive correctness across supported layouts.**

**98. Repeated responsive hacks should become shared tokens, components, layouts, or patterns where appropriate.**

**99. If a layout works only at the exact width shown in a design mockup, it is not responsive.**

**100. If the code needs to know the device model merely to decide ordinary layout, the responsive abstraction is probably wrong.**

---

# 327. Canonical Responsive & Device Standard

The organizational standard is:

> **Responsive interfaces adapt to available space, content requirements, actual input capabilities, and user preferences rather than identifying users as fixed mobile, tablet, or desktop device classes. Viewport width, container width, pointer precision, hover availability, keyboard access, touch support, orientation, safe-area geometry, virtual-keyboard behavior, pixel density, and installation context are treated as independent dimensions whenever they materially affect the interface.**

> **The baseline application uses fluid, intrinsic, mobile-capable layouts that preserve information, functionality, authorization, and accessibility as available space changes. Narrow experiences recompose navigation, panes, actions, forms, filters, tables, and overlays according to task priority rather than simply shrinking desktop UI or removing functionality. Wide experiences use additional space intentionally through improved hierarchy, supporting panes, or context rather than stretching core content without limit.**

> **Responsive behavior uses the lowest-complexity mechanism capable of expressing the design: intrinsic CSS sizing and wrapping first, container-relative adaptation when a reusable component depends on its local space, centrally governed viewport breakpoints for genuine page-level transitions, and specialized device capabilities only as progressive enhancements. Breakpoints are driven by content failure and composition transitions, not named phones, tablets, laptops, or device resolutions.**

> **Viewport behavior is explicit. Responsive pages use a device-width viewport, retain browser zoom and user scaling, tolerate accessibility reflow at narrow effective widths, and distinguish ordinary viewport dimensions from dynamic visible viewport conditions caused by mobile browser chrome and software keyboards. Full-height interfaces select viewport units intentionally rather than assuming `100vh` always represents usable visible height.**

> **Edge-aligned and installed experiences are safe-area aware. Critical content and controls account for platform-provided safe-area insets rather than hard-coded notch or home-indicator values, and foldable/segmented-display data is used only as a progressive enhancement when it improves layout. Responsive interfaces do not require orientation changes merely to compensate for missing design, and active application state survives normal resize, rotation, split-screen, fold, and unfold transitions.**

> **Input design is capability-based. Hover, pointer precision, touch, keyboard, and stylus behaviors can coexist on the same device. Essential commands are never hover-only, pointer media queries do not become device detectors, touch layouts preserve keyboard behavior, desktop layouts remain usable with coarse touch input, gesture and drag interactions provide required alternatives, and interactive targets satisfy the applicable Accessibility standard regardless of assumed device class.**

> **Responsive data presentation preserves meaning. Tables remain tabular when comparison is important, use local horizontal scrolling when legitimate two-dimensional relationships require it, prioritize or disclose columns when useful, and only convert to alternate narrow representations when those representations preserve the task. Filters, searches, list/detail flows, dialogs, drawers, menus, and toolbars maintain semantic state, active selection, and accessibility as they recompose.**

> **Responsive media and performance are governed together. Images and media use appropriately sized resources and art direction where needed, high-density displays receive sufficient but not excessive resolution, hidden narrow-layout content does not automatically justify downloading desktop-scale assets, and screen width is never treated as a proxy for network quality or hardware capability. CSS is preferred over JavaScript for purely presentational responsiveness, and SSR does not fabricate exact client viewport facts that create hydration or state problems.**

> **Progressive Web App behavior extends rather than replaces the responsive web baseline. Installed experiences support standalone navigation, arbitrary resizable desktop and mobile windows, safe areas and platform titlebar controls where relevant, explicit offline/error behavior, predictable application updates, and compatibility with long-lived clients. Service workers, installation, push, file/device integration, and offline mutation are treated as separate capabilities with their own reliability and security requirements rather than being implied automatically by the PWA label.**

> **Responsive quality is verified continuously rather than at a few design screenshots. Critical interfaces are tested at narrow accessibility-reflow widths, representative intermediate and wide widths, immediately around breakpoints, short and tall viewports, portrait and landscape where relevant, touch, precise pointer, keyboard, hybrid input, zoom/text scaling, long localized copy, RTL, non-zero safe areas, virtual keyboards, loading/error/empty states, and installed PWA contexts when supported.**

A production-grade responsive system should make it easy to answer:

```text
What is the minimum usable viewport?
What happens between the design's mobile and desktop screenshots?
Why does this breakpoint exist?
Is it actually a viewport concern or should the component use a container query?
What information moves, wraps, collapses, or enters overflow?
Does any functionality disappear?
Can a user still reach every critical action?
Does the page horizontally overflow at 320 CSS px?
What happens at 200–400% zoom?
Can increased text break the component?
Can long translated labels fit?
What happens in RTL?
Can this desktop layout be used through touch?
Can this mobile layout be used through a hardware keyboard?
Does any important action require hover?
What happens when both touch and mouse are available?
Are pointer/hover media queries being used as capabilities or as fake device detection?
How large are interactive targets?
What happens when the software keyboard opens?
Can the focused input and validation still be seen?
Does the bottom bar overlap the keyboard or home indicator?
Are safe-area insets applied where necessary?
What happens in landscape?
What happens during split-screen resize?
What happens if a dialog crosses a responsive breakpoint while the user is typing?
How does a wide list/detail layout become a narrow flow?
How does the table behave at narrow width?
Does its responsive representation preserve comparison and data meaning?
Are images appropriately sized for their rendered dimensions?
Does hidden content still cost large network/runtime resources?
Can an installed PWA work in a narrow desktop window?
Does standalone mode still have complete navigation?
What exactly works offline?
How are stale installed clients updated safely?
Which device permissions are actually necessary?
Can users complete the workflow if optional permission is denied?
Which widths and input modalities are covered by automated and manual testing?
```

If those questions cannot be answered reliably, the product has breakpoint-specific layouts rather than a governed responsive and device architecture.

The current standards support several important choices in this guideline. **Media Queries Level 4** explicitly provides capability-oriented features such as pointer and hover; these describe input characteristics and should not be treated as phone/desktop classifiers. Responsive design guidance likewise bases adaptation on the viewport and media features rather than physical device names. citeturn583077search6turn583077search7

For accessibility, **WCAG 2.2 AA** sets the pointer target minimum at **24 × 24 CSS pixels**, subject to defined exceptions. Separately, WCAG's Reflow criterion requires ordinary vertically scrolling content to remain usable at an effective width of **320 CSS pixels** without requiring two-dimensional scrolling, except where a two-dimensional presentation is essential. This is why the standard distinguishes the AA minimum from the stronger internal ~44 px ergonomic touch target. citeturn583077search2turn583077search5

For edge-to-edge and changing viewport geometry, current browser APIs expose `safe-area-inset-*`, titlebar-area values for compatible desktop PWA window-control overlays, and viewport-segment values for segmented/foldable displays. The viewport model also includes `viewport-fit` and `interactive-widget` behavior relevant to display cutouts and virtual keyboards. citeturn583077search1turn583077search3

For PWAs, the durable rule is that a PWA remains a modern web application first: responsive design is foundational, while installability, manifests, service workers, offline storage, and deeper OS integration add separate capabilities and responsibilities. citeturn583077search0

Canonical master placement:

**… → Design Tokens → Layout → Facade → Components → Forms & Validation → Patterns → Accessibility → Responsive & Device → Reusability & Libraries → …**
