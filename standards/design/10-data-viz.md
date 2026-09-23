---
id: "data-viz"
title: "Data Visualization & Dashboards"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["design", "data", "visualization", "dashboards"]
applies_to: ["ui", "data"]
related: []
legacy_number: 54
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 47428
provenance: baseline

---

Below is the corpus-ready canonical standard. It treats visualization as an application pattern rather than an isolated charting concern, so data access, query state, validation, export security, responsive behavior, and accessibility are normative parts of the same contract.

# Data Visualization & Dashboard Guidelines — Gold Standard 2026

**Canonical placement:** Analytics → Data Visualization → Patterns → Accessibility  
**Status:** Gold Standard 2026  
**Baseline:** shadcn/ui component conventions with Recharts-backed chart composition  
**Conformance target:** WCAG 2.2 AA minimum

---

## 1. Purpose

### 1.1 Scope

This standard defines the canonical requirements for charts, analytical dashboards, data exploration interfaces, and data-dense visualizations.

It covers:

- chart type selection by analytical intent;
- colour usage and semantic scales;
- axes, scales, grids, labels, legends, and units;
- tooltips and interactive inspection;
- annotations and reference markers;
- empty, loading, error, partial-data, and stale states;
- real-time and continuously updating visualizations;
- large datasets and rendering performance;
- dashboard composition, hierarchy, layout, and density;
- filters, cross-filtering, drill-down, and query state;
- export and data extraction;
- accessibility for screen readers, keyboard users, low-vision users, and users with colour-vision deficiencies;
- responsive and reduced-motion behaviour;
- security and authorization boundaries for analytical data.

This standard applies to product analytics, operational dashboards, administrative interfaces, reporting surfaces, monitoring tools, BI-style workflows, and embedded visualizations.

### 1.2 Design objective

A visualization MUST help a user answer a defined analytical question.

A chart MUST NOT exist solely because data is available.

Every visualization MUST optimize for:

1. **correct interpretation;**
2. **fast comparison;**
3. **clear context;**
4. **accessible access to the underlying information;**
5. **predictable interaction;**
6. **appropriate performance at the expected data volume.**

Visual appeal MUST NOT take precedence over data accuracy, readability, accessibility, or interaction clarity.

### 1.3 Relationship to other standards

Data visualization implementations MUST conform to the corpus standards for:

- **Security** — authorization, tenancy, sensitive-data handling, exports, auditability;
- **Data & Database** — aggregation semantics, precision, null handling, time zones, provenance;
- **API** — query contracts, pagination, aggregation, cancellation, caching, errors;
- **State Management** — URL state, server state, client state, filter persistence;
- **Forms & Validation** — filter controls, ranges, invalid combinations, submitted query parameters;
- **Accessibility** — WCAG compliance, keyboard operation, focus management, screen-reader semantics;
- **Design Tokens** — colour, typography, spacing, borders, elevation, motion;
- **Components** — shadcn/ui primitive behaviour and composition;
- **Patterns** — loading, empty states, destructive actions, navigation, tables, search, filtering, and responsive layouts.

A charting library MUST NOT be treated as exempt from these standards.

---

# 2. Rules

## 2.1 Select chart types by analytical intent

The chart type MUST follow the question being answered rather than aesthetic preference.

| User intent | Preferred visualization | Rules |
|---|---|---|
| Compare discrete categories | Bar chart, dot plot | MUST use a common baseline when magnitude comparison is primary. |
| Compare values across many categories | Horizontal bar chart, sorted dot plot | SHOULD sort by meaningful order unless domain order is intrinsically meaningful. |
| Show change over continuous time | Line chart | Time MUST progress consistently from left to right unless a documented domain convention requires otherwise. |
| Show discrete values over time | Column chart | SHOULD be preferred when individual periods matter more than continuous movement. |
| Show composition over time | Stacked bar/area | MUST distinguish absolute composition from percentage composition. |
| Show part-to-whole at one point | Bar, stacked bar; limited donut/pie | Pie/donut SHOULD be restricted to a small number of materially different categories. |
| Show distribution | Histogram, box plot, violin plot, strip plot | Bin size or statistical summary MUST be appropriate and explainable. |
| Show relationship/correlation | Scatter plot | MUST NOT imply causation from correlation. |
| Show two quantitative dimensions plus magnitude | Scatter/bubble | Bubble area, not radius, MUST encode quantitative magnitude. |
| Show deviation from a meaningful midpoint | Diverging bar/scale | The midpoint MUST represent a valid semantic reference such as zero, target, parity, or neutral. |
| Show geographic variation | Choropleth, symbol map | Geographic area MUST NOT encode magnitude unless area itself is the measured dimension. |
| Show ranking | Ordered bar, dot plot, table | Ranking MUST have a documented sort metric and tie behaviour. |
| Show exact values | Table | A chart MUST NOT replace a table when exact lookup is the primary task. |
| Show progress toward target | Progress/bar/bullet chart | MUST show the target or denominator explicitly. |
| Show status over time | Timeline, event plot | Events MUST remain distinguishable independently of colour. |
| Show hierarchy | Tree, treemap, sunburst where justified | Hierarchical depth MUST remain understandable without requiring hover. |

Three-dimensional charts MUST NOT be used for standard analytical data.

Perspective, extrusion, artificial depth, decorative gradients, shadows, or pictorial effects MUST NOT distort perceived magnitude.

Dual-axis charts SHOULD NOT be used. If unavoidable, the implementation MUST clearly identify each scale and MUST NOT manipulate ranges in a way that implies a relationship unsupported by the data.

Pie and donut charts MUST NOT be used when:

- precise comparison is required;
- categories are numerous;
- values are similar;
- negative values are present;
- values do not form a meaningful whole.

Sparklines MAY be used for compact trend context, but MUST NOT be the sole source for exact values or critical status.

---

## 2.2 Preserve truthful visual encoding

Quantitative visual encodings MUST preserve the mathematical relationships in the data.

Bar charts MUST begin quantitative magnitude axes at zero unless the visualization is explicitly presenting deviation rather than magnitude.

Line and scatter charts MAY use non-zero domains when appropriate, provided the domain is visible and does not materially mislead.

Area, length, position, angle, and colour MUST NOT be manipulated to exaggerate differences.

Truncated axes MUST be clearly identifiable.

Logarithmic scales MUST:

- be explicitly labelled;
- use meaningful tick values;
- be used only when the underlying analytical question benefits from multiplicative comparison;
- NOT be used where users are likely to interpret distances as linear without sufficient context.

A chart MUST NOT interpolate missing observations as if measured data exists unless interpolation is intentional and visually distinguishable.

Null, zero, unavailable, suppressed, and not-applicable values MUST remain semantically distinct.

---

## 2.3 Use semantic colour systems

Chart colour MUST use design tokens rather than arbitrary component-local colour values.

Visualizations MUST distinguish between:

- **categorical colours** — distinguish unrelated series or groups;
- **sequential scales** — represent ordered low-to-high magnitude;
- **diverging scales** — represent movement around a meaningful midpoint;
- **semantic colours** — communicate statuses such as success, warning, destructive, or informational;
- **neutral colours** — provide context without competing with primary data.

Semantic colours MUST preserve the meaning defined by the Design Tokens standard.

For example, destructive red MUST NOT be casually repurposed as an unrelated categorical series colour in the same interface when doing so creates semantic ambiguity.

### 2.3.1 Categorical palettes

Categorical colours SHOULD be limited to the number of series users can reliably distinguish.

When a visualization requires many categories, implementations SHOULD use:

- direct labels;
- grouping;
- small multiples;
- filtering;
- highlighting;
- search;
- a table;
- an “Other” aggregation where analytically valid.

A large rainbow palette MUST NOT be used merely to accommodate excessive series count.

The same category SHOULD retain the same colour across charts within a coherent dashboard or analytical workflow.

### 2.3.2 Sequential scales

Sequential scales MUST progress monotonically in perceived intensity.

A sequential scale MUST NOT arbitrarily alternate hue or luminance in a way that breaks perceived ordering.

### 2.3.3 Diverging scales

Diverging scales MUST have a meaningful midpoint.

The midpoint MUST NOT default to zero unless zero is analytically meaningful.

Positive and negative values MUST remain understandable without relying solely on red versus green.

### 2.3.4 Colour independence

Colour MUST NOT be the sole method of communicating:

- selected state;
- positive versus negative;
- forecast versus actual;
- active versus inactive;
- passed versus failed;
- one series versus another;
- threshold crossings;
- alerts;
- anomalies.

Use an additional encoding such as:

- text;
- symbols;
- line style;
- point shape;
- pattern;
- border;
- position;
- annotation.

WCAG 2.2 explicitly requires information not to depend solely on colour and establishes contrast requirements for graphical objects required for understanding. citeturn701475search5turn701475search0

---

## 2.4 Axes, scales, units, and labels

Every quantitative chart MUST make its measurement context discoverable.

Axes MUST include units when the unit is not unambiguously established by nearby content.

Units SHOULD appear in the axis title, tick formatting, metric label, or another persistent location rather than being repeated unnecessarily.

Examples:

- `Revenue (USD)`
- `Latency (ms)`
- `Conversion rate (%)`
- `Requests / min`

Numeric formatting MUST be consistent across a visualization.

The UI MUST NOT mix incompatible units on a common axis.

Dates and times MUST follow the Data & Database standard for time zones and locale.

When a dashboard has a defined reporting time zone, that zone MUST be displayed or otherwise unambiguous.

Tick labels MUST NOT imply greater measurement precision than the source data supports.

Axis titles SHOULD be omitted only when the metric meaning and unit are already explicit from adjacent content.

Tick density SHOULD adapt to available space.

Implementations MUST NOT solve label collisions by allowing unreadable overlaps.

Prefer, in order:

1. fewer ticks;
2. abbreviated formatting;
3. wider layout;
4. alternate orientation;
5. scrolling where semantically appropriate;
6. a different visualization.

Rotated text SHOULD be minimized.

Vertical or near-vertical axis labels SHOULD NOT be used where a horizontal alternative is practical.

---

## 2.5 Grid lines and reference structure

Grid lines MUST support comparison rather than decorate the chart.

Major grid lines SHOULD be visually subordinate to data.

Minor grid lines SHOULD be omitted unless they materially improve interpretation.

Grid density MUST NOT overpower data marks.

Reference lines representing:

- targets;
- budgets;
- averages;
- medians;
- thresholds;
- service-level objectives;
- control limits

MUST be visually distinguishable from measured data.

Reference values MUST be labelled when their meaning would otherwise be ambiguous.

---

## 2.6 Legends

A legend MUST be provided when users cannot otherwise identify series or categories.

Direct labels SHOULD be preferred over legends when practical because they reduce lookup distance.

Legend order SHOULD match:

- the visual stacking order;
- chart order;
- domain order;
- or another meaningful analytical order.

Legend entries MUST remain keyboard accessible when interactive.

Interactive legends MUST expose their interactive role.

A clickable legend MUST NOT look identical to static explanatory text.

Toggling series MUST:

- preserve a discoverable way to restore hidden series;
- announce state changes to assistive technology where appropriate;
- avoid unexpected rescaling when that would materially change interpretation.

A dashboard MUST NOT use inconsistent legend semantics for the same category across sibling visualizations.

---

## 2.7 Tooltips and data inspection

Tooltips MUST supplement persistent information, not replace essential information.

Critical values or meanings MUST NOT be available exclusively on hover.

Tooltips MUST support keyboard focus where the underlying chart supports point-level interaction.

Hover-only interactions MUST NOT be the sole interaction mechanism.

Tooltips SHOULD contain only information relevant to the inspected mark.

Typical tooltip order SHOULD be:

1. category or timestamp;
2. primary metric;
3. secondary metrics;
4. comparison or delta;
5. optional explanatory metadata.

Tooltip numeric formatting MUST match the chart.

Tooltips MUST NOT cover the inspected value unnecessarily when another placement is available.

Tooltip content MUST be valid for touch input.

The implementation MUST NOT require pixel-perfect pointer positioning to inspect a value.

For dense time-series data, crosshair or nearest-point inspection SHOULD be preferred to tiny hover targets.

shadcn/ui `ChartTooltip` / `ChartTooltipContent` SHOULD be used as the baseline where applicable, with project-level extensions preserving established typography, spacing, focus, and token conventions.

---

## 2.8 Annotations

Annotations MUST explain something analytically relevant.

Acceptable uses include:

- incidents;
- releases;
- policy changes;
- campaigns;
- target changes;
- anomalies;
- external events;
- experiment boundaries;
- forecast boundaries.

Annotations MUST NOT become decorative commentary.

Annotations SHOULD identify the associated point, range, or interval clearly.

Dense annotation sets SHOULD collapse into:

- event markers;
- grouped counts;
- an event track;
- an expandable timeline;
- drill-down details.

User-generated annotations MUST follow authorization, validation, and content-sanitization requirements from the Security and Forms standards.

---

## 2.9 Loading states

A chart MUST expose a defined loading state.

Loading indicators MUST distinguish between:

- initial load;
- background refresh;
- pagination or additional-data loading;
- filter-query execution.

Initial loading SHOULD preserve the expected chart container dimensions to avoid layout shift.

Use shadcn/ui `Skeleton` where a skeleton is appropriate.

A skeleton MUST represent layout rather than fabricated data.

Skeleton charts MUST NOT display fake trends that could be mistaken for real measurements.

For background refreshes, existing valid data SHOULD generally remain visible while a subtle refresh state is communicated.

A previously rendered chart SHOULD NOT disappear solely because a refresh request is in progress.

Loading states MUST NOT block unrelated dashboard controls unless the underlying operation requires it.

---

## 2.10 Empty, unavailable, stale, and error states

A chart MUST distinguish these states:

- **no data exists;**
- **no data matches the current filters;**
- **data is unavailable because of an error;**
- **access is restricted;**
- **data has not yet arrived;**
- **data is stale;**
- **data was intentionally suppressed.**

These states MUST NOT be represented by the same generic blank chart.

### No data

The UI SHOULD explain why no data exists where that reason is known.

### No matching results

The UI SHOULD preserve active filters and provide a relevant action such as clearing or adjusting filters.

### Error

An error state MUST identify the failed visualization or dataset without unnecessarily invalidating unaffected dashboard content.

Retry MAY be provided when the operation is safe and meaningful.

### Stale data

Where freshness is operationally significant, the visualization MUST expose:

- last successful update time;
- stale status;
- refresh status where applicable.

A chart MUST NOT silently display materially stale data as current.

Use shadcn/ui `Alert`, `Button`, `Skeleton`, and related primitives rather than chart-library-specific ad hoc UI where equivalent product components exist.

---

## 2.11 Real-time and updating charts

Real-time charts MUST prioritize continuity and interpretability over animation.

A continuously updating chart MUST expose whether it is:

- live;
- delayed;
- paused;
- disconnected;
- reconnecting.

A live indicator MUST represent actual system state rather than decorative branding.

Automatic updates MUST NOT repeatedly reset:

- zoom;
- selected range;
- focused point;
- drill-down state;
- manually paused state.

If a user is inspecting historical data, incoming data SHOULD NOT forcibly move the viewport unless the user explicitly returns to live mode.

Real-time visualizations SHOULD provide a pause or freeze mechanism when updates make inspection difficult.

Animation MUST respect `prefers-reduced-motion`.

High-frequency updates SHOULD be coalesced to a perceptually useful refresh cadence rather than rendering every backend event.

The UI MUST NOT suggest higher temporal precision than the underlying data pipeline provides.

The client MUST handle connection loss, delayed events, duplicate events, and out-of-order observations according to the API and State Management contracts.

A real-time visualization MUST NOT infer successful ingestion merely because the client connection is active.

---

## 2.12 Large dataset handling

The browser MUST NOT be used as the default aggregation engine for unbounded analytical datasets.

Server-side aggregation SHOULD be used when a visualization does not require individual source records.

Large datasets SHOULD use one or more of:

- server aggregation;
- sampling;
- downsampling;
- binning;
- windowing;
- pagination;
- virtualization;
- level-of-detail rendering;
- canvas;
- WebGL;
- streaming.

Sampling MUST preserve the analytical property the chart is intended to communicate.

A system MUST NOT silently discard observations merely to meet rendering limits.

If data is sampled or aggregated materially, the interface SHOULD disclose that fact.

Scatter plots with dense overlap SHOULD consider:

- opacity;
- hexbin aggregation;
- density plots;
- contour plots;
- rasterized rendering.

Time-series downsampling SHOULD preserve significant extrema where peaks and troughs matter.

A chart MUST NOT fetch millions of raw records merely to render hundreds of pixels.

APIs supporting dashboards SHOULD expose query parameters appropriate to visualization needs, such as:

- time range;
- granularity;
- aggregation;
- group-by;
- dimensions;
- filters;
- limit;
- cursor;
- sort.

Long-running analytical requests SHOULD support cancellation.

Superseded filter requests SHOULD be cancelled or ignored safely.

---

## 2.13 Dashboard layout and visual hierarchy

A dashboard MUST establish a clear reading order.

Primary decision-critical information SHOULD appear before secondary diagnostic information.

Typical hierarchy:

1. context and dashboard title;
2. reporting period and global filters;
3. critical KPIs or status;
4. primary trend/comparison views;
5. diagnostic breakdowns;
6. detailed tables or records.

Dashboard order MUST remain meaningful in the DOM and on narrow viewports.

CSS layout MUST NOT create a visual order that conflicts with keyboard or screen-reader order.

Use responsive CSS grid patterns and corpus spacing tokens.

Charts MUST NOT be forced into identical heights when their information density requires materially different space.

Card boundaries SHOULD represent meaningful grouping rather than wrapping every isolated metric by default.

shadcn/ui `Card` SHOULD be used where a chart is genuinely a card-level region.

A chart card SHOULD normally support:

- title;
- optional concise description;
- chart content;
- optional actions;
- optional contextual footer.

Dashboard layout MUST preserve usable touch and pointer targets.

Horizontal scrolling SHOULD NOT be the default strategy for making a desktop dashboard fit mobile.

On smaller screens, implementations SHOULD:

- stack regions;
- simplify secondary controls;
- collapse nonessential breakdowns;
- preserve primary data;
- allow detail views to open separately where necessary.

Density MUST be based on analytical priority, not on filling available pixels.

Whitespace SHOULD separate analytical groups.

Whitespace MUST NOT be eliminated merely to maximize the number of visible widgets.

---

## 2.14 KPI and summary metrics

KPI cards MUST identify what the number represents.

A metric MUST NOT be shown without sufficient context when ambiguity could materially alter interpretation.

Where relevant, KPI components SHOULD include:

- current value;
- unit;
- comparison period;
- delta;
- trend direction;
- target or threshold;
- freshness.

A positive numeric delta MUST NOT automatically imply positive business meaning.

For example, increased latency is numerically positive but operationally negative.

Semantic styling MUST therefore derive from domain meaning rather than mathematical sign alone.

Comparisons MUST identify their baseline, such as:

- previous period;
- previous year;
- target;
- forecast;
- cohort;
- control group.

---

## 2.15 Filters

Dashboard filters are form controls and MUST follow the Forms & Validation standard.

Global filters MUST be visually distinguishable from chart-local controls.

A filter MUST define:

- field or dimension;
- operator where applicable;
- value;
- validation rules;
- default;
- serialization behaviour.

Invalid filter combinations MUST NOT be submitted silently.

Date range filters MUST define whether their boundaries are inclusive or exclusive at the API level.

Relative date ranges such as “Last 30 days” MUST have deterministic semantics.

Filters SHOULD use established shadcn/ui components such as:

- `Select`;
- `Popover`;
- `Calendar`;
- `Command`;
- `Checkbox`;
- `RadioGroup`;
- `ToggleGroup`;
- `Button`;
- `Sheet` or `Drawer` for constrained responsive layouts.

Native semantics SHOULD be retained wherever possible.

A filter control MUST NOT be implemented as a clickable chart label when a conventional form control would be clearer and more accessible.

### Filter state

Shareable analytical state SHOULD be represented in the URL where practical.

URL state SHOULD include user-meaningful analytical parameters such as:

- date range;
- segment;
- search;
- selected dimension;
- sort;
- relevant drill-down.

Ephemeral UI state SHOULD remain local.

Server response data MUST NOT be duplicated into URL or form state.

Sensitive values MUST NOT be placed in URLs.

Applying a filter SHOULD produce deterministic back/forward navigation where URL state is used.

---

## 2.16 Cross-filtering and drill-down

A chart MAY act as an input to another analytical view.

When clicking or selecting a chart element changes another visualization, the selected state MUST be visible.

Cross-filtering MUST provide a clear method to remove the applied selection.

A chart MUST NOT unexpectedly change unrelated dashboard state.

Drill-down navigation SHOULD preserve:

- parent context;
- active filters;
- date range;
- selected entity;
- a clear return path.

Breadcrumbs MAY be appropriate for hierarchical drill-down.

shadcn/ui `Breadcrumb`, `Tabs`, `Sheet`, `Drawer`, or page navigation MAY be used depending on depth and workflow.

Hover MUST NOT trigger destructive, expensive, or persistent filtering.

Keyboard users MUST be able to perform equivalent drill-down operations where chart marks are interactive.

---

## 2.17 Data tables and underlying data

Every analytically significant chart SHOULD have an accessible route to equivalent or sufficiently detailed data.

This MAY be:

- a visible companion table;
- a “View data” control;
- an expandable table;
- an alternate accessible representation.

Use the canonical table standard and shadcn/ui `Table` baseline.

The table MUST use the same:

- filters;
- units;
- data definitions;
- query context

as the chart it represents.

Sort behaviour in a table MUST NOT silently alter the chart unless cross-view synchronization is an intentional documented interaction.

---

## 2.18 Export

Export is a data-access operation, not merely a UI convenience.

Exports MUST pass authorization independently of what is currently visible in the browser.

A client MUST NOT be able to export unauthorized rows by changing frontend state or request parameters.

Server-side authorization MUST be applied to every export request.

Tenant boundaries MUST be enforced server-side.

Sensitive fields MUST follow the Security and Data standards.

Export interfaces SHOULD explicitly identify:

- format;
- applied filters;
- date range;
- scope;
- aggregation level.

CSV, spreadsheet, PDF, image, and raw-data exports MUST NOT be treated as semantically equivalent.

CSV and spreadsheet generation MUST protect against spreadsheet formula injection where untrusted cell values can be interpreted as formulas.

Export filenames SHOULD be deterministic, readable, and safe.

An exported data file SHOULD contain enough metadata to reconstruct its context where appropriate.

Image or PDF export SHOULD include:

- chart title;
- visible date range;
- relevant legend;
- units;
- key annotations;
- source or freshness context where required.

An image MUST NOT be the only available export option when users require machine-readable data.

Large exports SHOULD use a server-side export workflow rather than forcing the browser to serialize unbounded datasets.

Export failures MUST surface as explicit failures.

The interface MUST NOT announce export completion before the export actually succeeds.

---

## 2.19 Security and privacy

Dashboard APIs MUST enforce authorization independent of frontend controls.

Hiding a chart, filter value, series, or export action in the UI MUST NOT be considered an access-control mechanism.

Chart labels, annotations, series names, imported dimensions, and user-generated descriptions MUST be treated according to the Security standard for untrusted content.

Raw HTML from dataset values MUST NOT be injected into tooltips, legends, labels, or annotations.

Analytics requests SHOULD expose only the dimensions required for the intended visualization.

Personally identifiable or sensitive data SHOULD be aggregated where individual values are not necessary.

Small-cell suppression or equivalent privacy controls MUST be applied when required by the domain.

A visualization MUST NOT reveal restricted values indirectly through:

- tooltip details;
- counts;
- totals;
- drill-down;
- query differences;
- exports;
- client-side cached data.

---

## 2.20 API and query integration

Visualization components MUST consume documented data contracts.

The frontend MUST NOT infer undocumented backend semantics.

Analytics APIs SHOULD return sufficient metadata to establish:

- metric identity;
- units;
- dimensions;
- aggregation;
- granularity;
- time zone where relevant;
- pagination;
- freshness;
- partial-data state.

Errors MUST use the canonical API error model.

The UI SHOULD distinguish between:

- network failure;
- authorization failure;
- invalid query;
- timeout;
- server failure;
- partial result.

Retries MUST follow the API and reliability standards.

Automatic retries MUST NOT create uncontrolled request storms.

Dashboard requests SHOULD be deduplicated when multiple components depend on the same query result.

Shared requests SHOULD use a server-state/query-cache abstraction rather than independent component-local fetch logic.

---

## 2.21 State management

Server state MUST be managed separately from transient UI state.

Remote analytical data SHOULD use the corpus-approved query/cache mechanism.

Chart components SHOULD remain presentation-oriented.

Chart components SHOULD NOT own unrelated business workflows, authorization logic, or cross-page persistence.

Filter state SHOULD have a single canonical owner.

Derived chart values SHOULD be computed from canonical source state rather than duplicated into multiple stores.

Selections that need to survive refresh or sharing SHOULD be serialized intentionally.

Selections that are purely transient SHOULD remain local.

A chart MUST NOT create hidden global state merely because two charts need to coordinate.

---

## 2.22 Accessible charts

Accessibility MUST be designed into the visualization architecture rather than retrofitted after visual completion.

WCAG 2.2 AA is the minimum corpus target.

### 2.22.1 Text alternative and accessible name

Every meaningful chart MUST have an accessible name.

The accessible name SHOULD communicate:

- the metric or subject;
- relevant comparison;
- relevant time period.

A chart MUST NOT be announced merely as “graphic” or “chart” without useful context.

A concise textual summary SHOULD communicate the primary analytical takeaway where such a takeaway is well-defined.

Decorative chart elements MUST be hidden from the accessibility tree where appropriate.

### 2.22.2 Screen-reader access to data

A user MUST NOT be required to interpret raw SVG geometry through a screen reader.

Meaningful chart information MUST be available in structured text or a semantically appropriate alternative.

For complex charts, provide a data table or equivalent structured representation.

Screen-reader users SHOULD be able to determine:

- chart purpose;
- axes or dimensions;
- units;
- series identity;
- key values;
- notable annotations;
- current filters.

The accessible representation MUST remain synchronized with the visible chart.

### 2.22.3 Keyboard interaction

Every chart interaction available only by pointer MUST have a keyboard-accessible equivalent when that interaction is required to operate the visualization.

Keyboard focus MUST be visible.

Keyboard navigation MUST NOT trap focus inside a visualization.

Interactive marks SHOULD use a predictable navigation model rather than placing hundreds or thousands of individual marks into the tab order.

Complex visualizations SHOULD use a managed interaction model, data table, list, or summary rather than exposing every data point as an independent tab stop.

### 2.22.4 Colour and non-colour encoding

Colour MUST NOT be the sole carrier of information.

Series SHOULD additionally use one or more of:

- line dash;
- line thickness where appropriate;
- point markers;
- point shapes;
- patterns;
- direct text labels;
- icons;
- borders.

Status MUST also be represented by text or another independent cue.

A red/green distinction MUST NOT be the only distinction between adverse and favourable states.

### 2.22.5 Contrast

Text MUST comply with the corpus Accessibility contrast requirements.

Meaningful graphical objects required for understanding MUST meet applicable WCAG non-text contrast requirements or have an equivalent representation that makes the visual distinction unnecessary. WCAG 2.2 identifies a 3:1 threshold for graphical objects required for understanding. citeturn701475search0

Thin chart lines SHOULD exceed minimum contrast where practical because antialiasing may reduce effective visibility.

Grid lines MAY be lower contrast when they are not required to identify or understand the data.

### 2.22.6 Patterns and textures

Patterns SHOULD be available when colour alone cannot reliably distinguish adjacent areas.

Pattern density MUST NOT make labels or boundaries unreadable.

Patterns MUST remain distinguishable at normal zoom.

Pattern meaning MUST remain stable across the visualization.

### 2.22.7 Zoom, reflow, and responsive access

Charts MUST remain usable under browser zoom and text enlargement.

Critical controls MUST NOT disappear solely due to zoom.

Where a visualization cannot reflow without losing meaning, an accessible alternative representation MUST remain available.

### 2.22.8 Motion

Data animation MUST respect reduced-motion preferences.

Animation MUST NOT be required to understand value changes.

Rapid flashing MUST NOT be used.

Live-update transitions SHOULD avoid continuous movement when a stable update is sufficient.

### 2.22.9 Hover and focus parity

Information shown on hover SHOULD also be available on keyboard focus.

Hover content MUST follow the canonical Accessibility rules for hover/focus content.

Content MUST remain dismissible and operable where required.

---

## 2.23 Responsive behaviour

A visualization MUST be designed for the space available rather than proportionally shrinking a desktop chart until labels become unreadable.

Responsive adaptations MAY include:

- reducing tick count;
- changing legend placement;
- switching from vertical to horizontal bar layout;
- stacking controls;
- hiding secondary nonessential labels;
- moving details to a table or drawer;
- changing from multiple series to an explicit series selector;
- converting a dense dashboard panel into a dedicated detail view.

Responsive behaviour MUST preserve data meaning.

A mobile layout MUST NOT silently remove critical series or filters.

When information is deliberately reduced on smaller screens, the UI MUST expose a route to the full information where the removed detail is necessary.

---

## 2.24 Component baseline

shadcn/ui MUST be the baseline for non-chart interface primitives.

The chart implementation SHOULD compose established product components rather than recreate them inside the visualization library.

Preferred mappings include:

| Concern | Baseline |
|---|---|
| Chart surface | `ChartContainer` |
| Tooltip | `ChartTooltip`, `ChartTooltipContent` |
| Card region | `Card` |
| Loading | `Skeleton` |
| Error/state message | `Alert` |
| Filters | `Select`, `Popover`, `Command`, `Calendar`, `Checkbox`, `RadioGroup` |
| Actions | `Button`, `DropdownMenu` |
| Detailed data | `Table` |
| Responsive filter/detail panel | `Sheet`, `Drawer` |
| Tabs between analytical views | `Tabs` |
| Drill-down hierarchy | `Breadcrumb` where appropriate |
| Compact state label | `Badge` |
| Long option lists | `ScrollArea` only where appropriate |

The current shadcn/ui Chart implementation is designed as a compositional layer around Recharts rather than a standalone analytics framework. citeturn701475search3

Application-level chart abstractions SHOULD standardize:

- typography;
- axis formatting;
- tooltip formatting;
- colour tokens;
- empty states;
- loading states;
- responsive behaviour;
- accessibility wrappers;
- export actions;
- data-table access.

Product teams SHOULD NOT create visually or behaviourally incompatible chart primitives for individual features when an existing canonical abstraction is sufficient.

---

## 2.25 Design tokens

Visualizations MUST consume shared tokens for:

- foreground;
- muted foreground;
- background;
- border;
- semantic status;
- chart categorical series;
- sequential scales;
- diverging scales;
- spacing;
- typography;
- radius;
- focus;
- motion.

Hard-coded hexadecimal colours SHOULD NOT appear in feature chart components except where explicitly required for domain-standard colour mapping and approved by the token standard.

Light and dark themes MUST each be tested independently.

A token valid in light mode MUST NOT be assumed to meet contrast or perceptual requirements in dark mode.

Chart tokens SHOULD distinguish semantic purpose from literal colour names.

Prefer:

`--chart-positive`

over:

`--chart-green`.

Prefer:

`--chart-series-1`

over:

`--chart-blue`.

---

## 2.26 Testing

Visualization tests MUST validate behaviour, not only screenshots.

Automated tests SHOULD cover:

- filter state;
- loading;
- empty state;
- error state;
- authorization-dependent actions;
- export parameters;
- drill-down;
- formatting;
- null values;
- negative values;
- large values;
- long labels;
- responsive behaviour;
- keyboard interaction;
- accessible names.

Visual regression testing SHOULD cover representative chart states.

Accessibility testing MUST include automated checks and manual interaction.

Colour-vision simulation SHOULD be used for dashboards whose interpretation depends on multiple colour encodings.

Performance testing SHOULD use representative production-scale datasets rather than trivial fixtures.

Tests MUST include edge cases such as:

- one data point;
- no data;
- all-zero data;
- identical values;
- extreme outlier;
- missing intervals;
- mixed positive and negative values;
- maximum expected category count;
- very long dimension labels;
- stale data;
- partial API response where supported.

---

# 3. Anti-patterns

The following are non-conforming unless a documented domain requirement provides a stronger reason.

### 3.1 Chart selection

- Using a pie chart for numerous or similar-sized categories.
- Using 3D charts for ordinary analytical data.
- Using gauges where a bar or metric-with-target communicates the same information more clearly.
- Using a map when geography is not analytically meaningful.
- Using a chart where users primarily need exact tabular lookup.

### 3.2 Visual encoding

- Truncating a bar chart axis to exaggerate differences.
- Encoding the same quantitative measure redundantly with conflicting visual channels.
- Using decorative area, volume, or perspective that distorts magnitude.
- Connecting missing data points without distinguishing missing observations.
- Treating zero, null, missing, and not-applicable as equivalent.

### 3.3 Colour

- Red/green-only status encoding.
- Rainbow categorical palettes.
- Random colour assignment on every render.
- Reusing semantic destructive colours as neutral categories.
- Using low-contrast series solely because they appear subtle.
- Depending on colour alone to indicate selection.

### 3.4 Axes and labels

- Hiding units.
- Excessive decimal precision.
- Overlapping axis labels.
- Dozens of unreadable ticks.
- Misleading dual axes.
- Unlabelled logarithmic scales.

### 3.5 Tooltips

- Requiring hover to discover essential information.
- Tooltips containing unrelated metadata.
- Tooltips that cannot be reached by keyboard where inspection is interactive.
- Tiny hover targets.
- Tooltips that cover the data being inspected when avoidable.

### 3.6 Dashboards

- Treating every available metric as a KPI.
- Filling all whitespace with cards.
- Arbitrary card ordering.
- Independent filters that appear global.
- Repeated legends with inconsistent series colours.
- Desktop dashboards scaled down wholesale for mobile.
- Nesting scrolling regions inside scrolling dashboard pages without a strong interaction need.

### 3.7 Loading and state

- Blank regions while loading.
- Fake skeleton trends that resemble actual data.
- Replacing valid existing data with a spinner during background refresh.
- Showing “No data” for network errors.
- Showing stale operational data without freshness context.

### 3.8 Real-time data

- Constant animation for each incoming event.
- Jumping the viewport while the user inspects history.
- Automatically re-enabling live mode after a user pauses.
- Treating connection health as evidence of data freshness.

### 3.9 Large datasets

- Downloading an unbounded dataset and filtering it entirely in the browser.
- Rendering one SVG node for every point in extremely dense datasets without a performance strategy.
- Silently dropping data.
- Downsampling in a way that removes analytically significant peaks.
- Fetching raw records when an aggregate query is sufficient.

### 3.10 Accessibility

- `aria-label="chart"` without further description.
- Making hundreds of points individual tab stops.
- Screen-reader access consisting only of raw SVG elements.
- Colour-only series differentiation.
- Missing keyboard equivalents.
- Low-contrast data marks.
- Hover-only annotations.
- Ignoring reduced-motion preferences.

### 3.11 Security and export

- Trusting hidden frontend filters for authorization.
- Exporting data the current user cannot retrieve through authorized APIs.
- Injecting dataset HTML into tooltips.
- Allowing CSV values to become uncontrolled spreadsheet formulas.
- Encoding sensitive filter values into shareable URLs.
- Assuming a client-side hidden series is private.

---

# 4. Checklist

## 4.1 Intent and data

- [ ] The analytical question is explicit.
- [ ] The selected chart type matches the analytical intent.
- [ ] The visualization does not imply unsupported causation or precision.
- [ ] Null, zero, unavailable, suppressed, and not-applicable states are distinct.
- [ ] Aggregation and granularity are analytically valid.
- [ ] Units and time-zone semantics are defined.

## 4.2 Visual encoding

- [ ] Magnitude encodings are mathematically truthful.
- [ ] Bar charts use an appropriate zero baseline.
- [ ] Non-zero or logarithmic domains are visibly understandable.
- [ ] Colour uses approved design tokens.
- [ ] Colour is not the sole information channel.
- [ ] Categorical colour assignments remain consistent across related views.
- [ ] Sequential and diverging scales match their data semantics.

## 4.3 Axes and reading

- [ ] Axes and units are clear.
- [ ] Tick density is readable.
- [ ] Labels do not collide.
- [ ] Grid lines support rather than dominate comparison.
- [ ] Legends are provided only where required.
- [ ] Direct labels are used where they materially improve identification.
- [ ] Reference lines are labelled where needed.

## 4.4 Interaction

- [ ] Tooltips provide useful inspection without containing essential-only information.
- [ ] Hover interactions have touch and keyboard equivalents where required.
- [ ] Selections have visible selected states.
- [ ] Cross-filters can be cleared.
- [ ] Drill-down preserves analytical context.
- [ ] Browser back/forward behaviour is coherent where URL state is used.

## 4.5 States

- [ ] Initial loading is defined.
- [ ] Background refresh is distinguished from initial loading.
- [ ] No-data and no-results states are different.
- [ ] Error states are distinct from empty states.
- [ ] Stale state is exposed where freshness matters.
- [ ] Authorization failures do not masquerade as missing data.

## 4.6 Real time

- [ ] Live, paused, reconnecting, delayed, and disconnected states are distinguishable where applicable.
- [ ] User inspection state survives incoming updates.
- [ ] Update rendering is throttled or coalesced where appropriate.
- [ ] Reduced motion is respected.
- [ ] Freshness reflects the data pipeline rather than merely connection state.

## 4.7 Performance

- [ ] Dataset volume is bounded.
- [ ] Appropriate aggregation occurs server-side.
- [ ] Large renders use sampling, binning, virtualization, canvas, WebGL, or another justified strategy.
- [ ] Sampling does not materially alter the analytical conclusion.
- [ ] Obsolete requests can be cancelled or safely ignored.
- [ ] Production-scale performance has been tested.

## 4.8 Dashboard

- [ ] Reading order follows analytical priority.
- [ ] DOM order matches meaningful reading order.
- [ ] Global and local filters are distinguishable.
- [ ] Mobile layout preserves essential information.
- [ ] Density is intentional.
- [ ] Card boundaries represent meaningful grouping.
- [ ] KPI comparisons identify their baseline.

## 4.9 Accessibility

- [ ] Every meaningful chart has an accessible name.
- [ ] An equivalent textual/data representation exists where required.
- [ ] Interactive behaviour is keyboard operable.
- [ ] Focus is visible.
- [ ] Colour is not the sole differentiator.
- [ ] Patterns, markers, labels, line styles, or other redundant encodings are used where needed.
- [ ] Meaningful graphical objects meet applicable contrast requirements.
- [ ] Screen readers can determine the metric, dimensions, units, and important values.
- [ ] Zoom and text enlargement do not make the view unusable.
- [ ] Reduced-motion preferences are respected.

## 4.10 Security and export

- [ ] Authorization is enforced server-side for data and exports.
- [ ] Tenant boundaries are tested.
- [ ] Sensitive data is not exposed through hidden chart state or drill-down.
- [ ] Tooltip and annotation content is safely rendered.
- [ ] CSV/spreadsheet exports mitigate formula injection.
- [ ] Large exports use an appropriate server-side workflow.
- [ ] Export context includes necessary filters, range, units, or metadata.

## 4.11 Corpus alignment

- [ ] shadcn/ui primitives are used for surrounding UI.
- [ ] Visualization colours and spacing use Design Tokens.
- [ ] Filters follow Forms & Validation.
- [ ] Remote data follows API and server-state conventions.
- [ ] Persistent/shareable query state follows State Management.
- [ ] Security requirements apply equally to charts, drill-down, and export.
- [ ] Accessibility requirements are satisfied by the full analytical workflow, not only the chart SVG.

---

# 5. Canonical summary

A Gold Standard 2026 visualization MUST begin with analytical intent and MUST represent data truthfully.

Chart selection MUST follow the question being answered.

Colour MUST use semantic design tokens and MUST NOT be the sole carrier of meaning.

Axes, scales, units, legends, tooltips, annotations, and reference markers MUST make interpretation clearer rather than denser.

Loading, empty, error, stale, partial, restricted, and real-time states MUST be explicit and semantically distinct.

Dashboards MUST prioritize decision-critical information, preserve meaningful responsive and DOM order, and avoid density for its own sake.

Filters and drill-down MUST behave as first-class application state and MUST follow Forms, API, and State Management standards.

Large datasets MUST be aggregated, sampled, virtualized, or rendered through an appropriate high-volume strategy rather than transferred and rendered without bounds.

Exports MUST enforce server-side authorization and MUST follow Security and Data requirements independently of frontend visibility.

Accessible visualizations MUST provide sufficient contrast, non-colour encodings, keyboard operation, screen-reader-accessible context, and an equivalent structured representation where visual geometry alone cannot communicate the data.

shadcn/ui is the canonical component baseline for surrounding controls and chart composition. Visualization-specific abstractions MUST extend the corpus component, token, accessibility, security, API, and state conventions rather than creating a parallel design system.

**Canonical rule:** a visualization is conforming only when the same analytical information remains understandable, operable, secure, and trustworthy without dependence on a particular colour, pointer interaction, viewport size, or visual rendering technique.

The document is structured to drop directly into the stated **Analytics → Data Visualization → Patterns → Accessibility** location and uses the same kind of normative boundaries expected from adjacent engineering and design-system standards.
