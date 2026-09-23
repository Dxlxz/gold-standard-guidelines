---
id: "dashboard-dataviz-map"
title: "Dashboard, Data Viz & Map Interaction"
domain: "design"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["design", "dashboard", "data", "viz", "map"]
applies_to: ["data"]
related: ["search-navigation", "accessibility"]
legacy_number: 111
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 74472
provenance: baseline

---

Research completed with Firecrawl first. The specification below treats dashboards, charts, tables, and maps as **decision interfaces**: the visual form MUST follow the analytical question, data semantics, uncertainty, accessibility, and operating constraints—not the desire to fill a grid with visualisations.

# Dashboard, Data Visualisation & Map Interaction — Gold Standard 2026

**Canonical placement:** Design Tokens → Data Visualisation → **Dashboard, Data Visualisation & Map Interaction** → Layout Patterns → Facade → Components  
**Status:** Normative  
**Scope:** Design and interaction layer; complements the Data Visualization Engineering Standard  
**Component baseline:** shadcn/ui + approved charting and mapping libraries  
**Accessibility target:** WCAG 2.2 AA or higher  
**Applies to:** dashboards, analytical products, business intelligence, operations screens, monitoring systems, data tables, charts, maps, geospatial analysis, environmental monitoring, reporting, and public-data interfaces.

---

# 1. Purpose

This standard defines how data is composed, encoded, prioritised, explored, and interpreted in user interfaces.

It governs:

- dashboard composition;
- KPI and summary design;
- chart selection;
- chart craft;
- interaction;
- cross-filtering;
- linked views;
- large tables;
- map interfaces;
- geospatial symbology;
- legends;
- spatial accuracy;
- uncertainty;
- accessibility;
- performance-aware visual design;
- export and sharing.

This standard does **not** define:

- data pipelines;
- database aggregation;
- statistical computation;
- rendering-library architecture;
- tile-generation infrastructure;
- chart-engine implementation;
- analytical model training.

Those responsibilities belong to the Data Visualization Engineering, Data & Database, API, and related standards.

The first design question MUST be:

```text
What question is the user trying to answer?
```

not:

```text
Which chart should we place here?
```

IBM Carbon similarly states that chart selection should begin by identifying the purpose of the visualisation and then choosing the appropriate chart type.  
https://carbondesignsystem.com/data-visualization/chart-types/

A dashboard MUST NOT exist merely because the product contains data.

---

# 2. Rules

# 2.1 Question-first dashboard design

Every dashboard MUST have a documented primary decision or monitoring question.

Examples:

```text
What requires attention now?

Are operations within expected range?

Where are anomalies emerging?

What changed since the last reporting period?

Which areas require investigation?

Are service levels meeting the target?
```

Dashboard panels MUST support those questions.

A panel that cannot be connected to a user question, decision, or monitoring responsibility SHOULD be removed.

---

# 2.2 Dashboard purpose taxonomy

Dashboards SHOULD identify which primary role they serve:

| Type | Primary question |
|---|---|
| Operational | What requires action now? |
| Monitoring | Is the system behaving normally? |
| Analytical | Why is this happening? |
| Executive | What changed, and does it require intervention? |
| Personal work queue | What do I need to process? |
| Public reporting | What is the current published state? |

A dashboard MAY combine roles, but one MUST remain dominant.

An executive summary SHOULD NOT inherit the same density or controls as an analyst workbench.

---

# 2.3 Dashboard before dashboard

Before creating a dashboard, teams MUST determine whether the task is better served by:

- a report;
- a table;
- a search/list view;
- an alert queue;
- a map;
- a single chart;
- a record-detail page.

UK Government Analysis Function guidance explicitly recommends deciding whether a dashboard is appropriate before building one and treating dashboard development as an ongoing managed product rather than merely a visual output.  
https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-building-and-managing-dashboards/

---

# 2.4 Above-the-fold priority

The initial viewport MUST contain the highest-priority information, not the largest number of panels.

Above-the-fold space SHOULD normally prioritise:

```text
context / scope
critical status
high-priority exception
primary trend or spatial state
next decision/action
```

It SHOULD NOT automatically contain:

```text
four KPI cards
+
three charts
+
news feed
```

merely because a dashboard template provides those slots.

The highest-value panel MAY occupy disproportionately more space.

---

# 2.5 Dashboard hierarchy

A canonical analytical hierarchy is:

```text
1. Scope and freshness
2. Exception / primary outcome
3. Contextual trend or distribution
4. Explanation
5. Drill-down
6. Supporting detail
```

Visual size SHOULD reflect decision priority.

Equal-sized panels SHOULD represent approximately equal importance.

---

# 2.6 KPI cards

KPI cards MAY be used when a single value has independent decision significance.

Good candidates:

```text
Open critical incidents
System availability
Unreviewed detections
Budget variance
Cases overdue
```

A KPI card MUST provide necessary context.

A number such as:

```text
12,847
```

is insufficient where interpretation depends on:

```text
unit
scope
period
comparison
target
freshness
```

A complete KPI might be:

```text
Unreviewed detections
184

+23 since yesterday
As of 22 Sep 2026 18:00 MYT
```

---

# 2.7 When KPI cards mislead

A KPI card SHOULD NOT be used when:

- the distribution matters more than the average;
- magnitude without denominator is misleading;
- the number depends heavily on period selection;
- uncertainty is material;
- there is no meaningful target or comparison;
- the metric is present only to make the dashboard appear quantitative.

Examples of misleading summary values include:

```text
Average response time
```

when a long-tail distribution drives service failure, or:

```text
Forest loss: 12,000
```

without unit, time period, denominator, or comparison basis.

---

# 2.8 KPI status colouring

A KPI MUST NOT become red, amber, or green merely because it increased or decreased.

The semantic meaning of direction MUST be defined.

For example:

```text
Revenue ↑
```

may be positive.

```text
Critical incidents ↑
```

is not.

Green-up/red-down logic MUST NOT be universal.

---

# 2.9 Progressive drill-down

Dashboards SHOULD move from summary to evidence.

Canonical sequence:

```text
Summary
↓
Trend / spatial distribution
↓
Segment
↓
Record
↓
Evidence
```

The user SHOULD be able to understand why a summary changed.

A KPI MUST NOT become a terminal endpoint if action requires examining underlying records.

---

# 2.10 Dashboard grid

Desktop dashboards SHOULD use the canonical 12-column grid unless the Layout Standard explicitly selects a 16-column dense-workspace grid.

Recommended panel spans:

```text
12 columns   dominant chart / table / map
8 + 4        primary analysis + contextual support
6 + 6        peer comparisons
4 + 4 + 4    truly peer summaries
3 × 4        small KPI summaries
```

Panel geometry MUST follow content requirements rather than forcing every module into equal rectangles.

---

# 2.11 Canonical dashboard wireframe

```text
┌──────────────────────────────────────────────────────────────┐
│ Scope / date / filters                         As of 18:00   │
├───────────────────────┬───────────────────────┬──────────────┤
│ Critical exceptions   │ Primary outcome       │ Work queue   │
│ 4 cols                │ 4 cols                │ 4 cols       │
├────────────────────────────────────────┬─────────────────────┤
│                                        │                     │
│ Primary trend / map                    │ Explanation /      │
│ 8 cols                                 │ breakdown           │
│                                        │ 4 cols              │
├────────────────────────────────────────┴─────────────────────┤
│ Detailed records / evidence                                  │
│ 12 cols                                                      │
└──────────────────────────────────────────────────────────────┘
```

This is a starting structure, not a mandatory screenshot template.

---

# 2.12 Dashboard cards

Not every panel MUST be a Card.

Containment SHOULD come from:

1. spacing;
2. alignment;
3. surface change;
4. border;
5. card boundary.

The dashboard MUST NOT become "card soup."

The Corporate Visual and Anti-AI-Slop standards remain authoritative.

---

# 2.13 Personalisation

Dashboard personalisation MAY support:

- panel visibility;
- panel order;
- panel size;
- saved filters;
- default date range;
- table columns;
- map layers.

The default configuration MUST remain useful without personalisation.

Personalisation MUST NOT become a substitute for a coherent default information architecture.

---

# 2.14 Saved views

A saved dashboard view SHOULD preserve meaningful analytical state.

Possible state:

```text
date range
filters
comparison period
visible panels
sort order
map layers
selected region
```

Saved views SHOULD have:

```text
name
owner
visibility
last modified
```

where collaboration is supported.

Sensitive filter state MUST follow Security standards.

---

# 2.15 Refresh cadence

Every dashboard MUST define the expected freshness of its data.

Possible states:

```text
real time
near real time
hourly
daily
monthly
on demand
```

A dashboard MUST NOT display a pulsing `LIVE` marker for data that refreshes periodically.

---

# 2.16 "As of" timestamps

Time-sensitive dashboards MUST expose an explicit freshness indicator.

Examples:

```text
As of 22 Sep 2026, 18:00 MYT

Satellite imagery acquired 18 Sep 2026

Updated 12 minutes ago
```

Relative time MAY supplement an absolute timestamp.

For audit-sensitive or cross-time-zone contexts, absolute time SHOULD be available.

---

# 2.17 Per-panel freshness

Where panels use data sources with different update cadences, each materially different freshness state SHOULD be visible.

Example:

```text
Alerts
Updated 3 min ago

Satellite imagery
Acquired 18 Sep

Field inspections
Synced 21 Sep 16:42
```

A single page-level refresh timestamp MUST NOT falsely imply that every dataset has equivalent freshness.

---

# 2.18 Stale data

Stale data MUST be visually distinguishable from:

```text
loading
error
no data
```

A stale panel MAY retain its last known value when useful, but MUST indicate that freshness expectations have been exceeded.

Example:

```text
Last successful update:
21 Sep 2026 07:00

Expected:
Hourly
```

---

# 2.19 Chart selection begins with relationship

Chart selection MUST follow the analytical relationship.

Carbon's chart catalogue explicitly groups visual forms by analytical purpose including comparisons, trends, part-to-whole, correlations, connections, and geospatial overlays.  
https://carbondesignsystem.com/data-visualization/chart-types/

Canonical mapping:

| Analytical question | Preferred starting forms |
|---|---|
| Compare categories | Bar, dot, lollipop |
| Rank | Ordered bar, dot |
| Distribution | Histogram, box plot, dot/beeswarm |
| Correlation | Scatter |
| Change over time | Line, area where appropriate |
| Part-to-whole | Stacked bar; pie/donut only in limited cases |
| Composition over time | Stacked area / stacked bars with care |
| Range | Floating bar / interval plot |
| Target vs actual | Bullet / reference-line chart |
| Flow | Sankey / alluvial |
| Network | Network graph |
| Geography | Choropleth, symbol, dot, heat, flow map |
| Exact lookup | Table |

---

# 2.20 Comparison

For comparing category magnitude, horizontal bars SHOULD generally be the first candidate when labels are long.

Bars SHOULD normally share a common baseline.

Example:

```text
Region A  ███████████  68
Region B  ████████     52
Region C  █████        31
```

Sorting SHOULD reflect the analytical question.

Alphabetical order SHOULD NOT be used when rank is the useful insight unless users need lookup consistency.

---

# 2.21 Distribution

Use a histogram when the question is:

```text
How are observations distributed?
```

Use a box plot when users need compact comparison of:

- median;
- spread;
- quartiles;
- outliers.

Use dot/beeswarm plots when individual observations are important and the dataset remains legible.

Do NOT use a single average value when distribution is the actual decision variable.

---

# 2.22 Correlation

Use scatter plots when the question is whether two quantitative variables vary together.

Scatter charts SHOULD expose:

- axis variables;
- units;
- relevant trend/reference line where analytically justified.

Correlation MUST NOT be visually described as causation.

---

# 2.23 Change over time

Line charts SHOULD be the default for continuous or regularly sampled time series.

Bars MAY be preferable for:

- discrete periods;
- relatively few time points;
- counts tied to explicit reporting periods.

Area charts SHOULD be used only when magnitude/volume is meaningful and the filled area does not obscure comparison.

---

# 2.24 Part-to-whole

Stacked bars SHOULD generally be preferred when users need to compare parts across multiple groups.

Pie/donut charts MAY be used where:

- categories are few;
- the parts form a meaningful whole;
- one or two dominant differences are the question.

UK Government Analysis Function guidance recommends limiting pie charts to a small number of categories and using direct labels rather than forcing users to match slices to a key.  
https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/

---

# 2.25 Flow

Sankey/alluvial diagrams MAY be used where the relationship itself is:

```text
source → destination
state A → state B
stage → stage
```

Flow width MUST encode a clearly defined magnitude.

Do NOT use Sankey diagrams solely because they look sophisticated.

When exact values or small differences matter, a table or simpler chart MAY be better.

---

# 2.26 Geographic data

Map use MUST be justified by spatial relationships.

Use maps when the question includes:

```text
where
distance
adjacency
region
route
spatial concentration
spatial change
```

Do NOT use a map when geography is merely a decorative attribute.

A sorted table may answer:

```text
Which region has the highest value?
```

more efficiently than a map.

---

# 2.27 When a table beats a chart

Use a table when users need:

- exact values;
- record lookup;
- many dimensions;
- sorting;
- scanning multiple fields;
- auditability;
- copying/export;
- comparisons that cannot be reduced to a small set of visual encodings.

Use a chart when users need:

- shape;
- trend;
- pattern;
- magnitude comparison;
- outliers;
- correlation;
- distribution.

A dashboard MAY include both where they answer different questions.

---

# 2.28 Small multiples

Small multiples SHOULD be used when comparing the same measure across:

```text
regions
segments
scenarios
periods
categories
```

Each panel MUST use compatible:

- scales;
- axis ranges;
- encoding;
- ordering

unless a difference is explicitly disclosed.

Independent axes that make every panel fill its container MAY visually manufacture similarity.

---

# 2.29 Sparklines

Sparklines MAY provide compact trend context beside a value.

A sparkline MUST NOT substitute for a full chart where interpretation requires:

- precise axis;
- event annotations;
- multiple series;
- uncertainty;
- absolute scale.

A sparkline SHOULD expose:

```text
time period
direction
start/end or accessible summary
```

through nearby text or tooltip.

Decorative squiggles without defined period or units are non-conformant.

---

# 2.30 Axis integrity

Axes MUST represent the scale honestly.

Bar charts representing magnitude SHOULD normally begin at zero.

Truncating a quantitative bar axis can materially exaggerate differences and MUST NOT be used merely for visual drama.

Line charts MAY use a non-zero y-axis where the purpose is to inspect variation within a meaningful narrow range, but the scale MUST remain clearly visible.

UK Government chart guidance explicitly addresses baseline, aspect ratio, chart scale, labels, and the risk that design choices can visually exaggerate change.  
https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/

---

# 2.31 Axis range

Axis ranges SHOULD be chosen from the analytical question, not from a desire to make the line appear active.

When comparing multiple panels, use the same scale where direct visual comparison is expected.

A zero line SHOULD be visually identifiable where values cross zero.

---

# 2.32 Tick density

Ticks MUST aid reading rather than form background texture.

The chart SHOULD use the minimum tick density required for interpretation.

Tick labels MUST NOT overlap.

Responsive transformation MAY reduce tick count before reducing text to illegible size.

---

# 2.33 Grid lines

Grid lines SHOULD be subordinate to data.

Use enough reference structure to estimate position.

Avoid high-contrast graph-paper treatment unless the task requires precise lookup.

Major grid lines MAY be retained while minor lines are removed.

---

# 2.34 Direct labelling

Direct labels SHOULD be preferred where they reduce legend lookup.

For example:

```text
──── Forest cover 72%
──── Plantation 18%
──── Other 10%
```

at the series endpoint is often easier to interpret than:

```text
Legend
■ Forest cover
■ Plantation
■ Other
```

Direct labels MUST remain collision-free.

A legend remains appropriate when direct labelling would become cluttered.

---

# 2.35 Colour encoding

Colour MUST follow data semantics.

Carbon distinguishes:

- categorical palettes for discrete categories;
- sequential palettes for ordered magnitude;
- diverging palettes around a meaningful midpoint;
- alert palettes for status.

https://carbondesignsystem.com/data-visualization/color-palettes/

Do NOT use a categorical rainbow for continuous magnitude.

Do NOT use sequential colour for unrelated nominal categories.

---

# 2.36 Sequential colour

Use sequential colour where values progress:

```text
low → high
```

Lightness progression SHOULD generally carry the ordering.

Example:

```text
low     pale teal
medium  teal
high    dark teal
```

A decorative gradient MUST NOT substitute for a designed sequential data palette.

Carbon explicitly discourages using generic gradients as substitutes for sequential/diverging data palettes.  
https://carbondesignsystem.com/data-visualization/color-palettes/

---

# 2.37 Diverging colour

Use diverging palettes only where a meaningful centre exists.

Examples:

```text
negative ← 0 → positive

below target ← target → above target

temperature anomaly:
colder ← normal → warmer
```

The midpoint MUST have analytical meaning.

Do NOT create a diverging palette around the median merely because two colours are visually appealing.

---

# 2.38 Categorical colour

Categorical colour SHOULD be limited to the number of distinctions users can meaningfully track.

When category count grows, consider:

- grouping;
- filtering;
- direct labelling;
- small multiples;
- a table.

Colour MUST NOT be the only channel distinguishing categories in accessibility-sensitive contexts.

---

# 2.39 Semantic alert colour

Status colour MUST remain aligned with the Design Tokens standard.

Chart series MUST NOT casually consume critical/error red if that creates confusion with alert semantics.

---

# 2.40 Annotation

Annotations SHOULD explain analytically meaningful events.

Examples:

```text
policy introduced
sensor changed
threshold crossed
outage started
methodology revised
extreme weather event
```

Annotations MUST be concise.

They SHOULD NOT turn the chart into a paragraph-heavy infographic.

---

# 2.41 Reference lines

Reference lines SHOULD be used for meaningful comparison such as:

```text
target
baseline
legal threshold
historical mean
capacity
zero
```

Reference lines MUST be labelled.

An unlabeled dashed line is insufficient.

---

# 2.42 Uncertainty

Where uncertainty materially affects interpretation, it MUST be shown.

Possible representations include:

```text
confidence band
error bar
credible interval
range
classification confidence
uncertain boundary
```

The uncertainty encoding MUST be explained.

Do NOT display a single precise line or value if the underlying model produces a materially uncertain estimate and that uncertainty affects decisions.

---

# 2.43 Uncertainty vs confidence score

A model confidence score MUST NOT automatically be treated as a statistical confidence interval.

For example:

```text
Detection confidence: 82%
```

MUST NOT be rendered as:

```text
82% ± 18%
```

unless the model actually supports that interpretation.

Terminology MUST match the analytical method.

---

# 2.44 Missing data

Missing data MUST be distinct from zero.

Use explicit encodings such as:

```text
No observation
Not available
Suppressed
Below detection threshold
Cloud obscured
```

depending on the domain.

A blank cell or transparent map polygon MUST NOT silently mean both:

```text
0
and
missing
```

---

# 2.45 Missing time-series segments

Line charts SHOULD break the line where observations are missing unless interpolation is analytically justified.

Interpolated or estimated segments MUST be visually distinguishable from observed values.

---

# 2.46 Dual axes

Dual y-axes SHOULD generally be avoided.

They can create apparent relationships that change dramatically when either axis range changes.

Prefer:

```text
aligned small multiples
indexed series
normalised comparison
```

where possible.

If a dual axis is necessary:

- axes MUST be directly labelled;
- series-to-axis association MUST be unmistakable;
- the analytical reason MUST be documented.

---

# 2.47 Unit formatting

Every quantitative display MUST make its unit inferable.

Examples:

```text
3.8 ha
82%
MYR 1.24m
41 ms
18 °C
2.4 t CO₂e
```

A chart axis MAY place the unit once rather than repeat it on every tick when context remains clear.

---

# 2.48 Locale formatting

Numeric and date formatting MUST follow the Internationalization standard.

Locale-aware design includes:

```text
decimal separator
group separator
currency placement
date order
time zone
unit conventions
```

Analytical screens MUST NOT mix locales casually.

---

# 2.49 Significant precision

Displayed precision MUST reflect meaningful data precision.

Avoid:

```text
Forest loss
3.847291 ha
```

when source accuracy supports only approximately:

```text
3.8 ha
```

Additional decimal places MUST NOT imply additional measurement certainty.

---

# 2.50 Tooltips

Tooltips MAY reveal precise values or secondary context.

A chart MUST NOT require hover to understand its central conclusion.

Tooltip content SHOULD contain:

```text
series/category
value
unit
date/dimension
relevant secondary value
```

Tooltips MUST work with keyboard focus where interactive points are keyboard accessible.

Touch interaction MUST NOT depend on hover.

---

# 2.51 Tooltip persistence

A tooltip SHOULD remain visible long enough for users to read it.

It MUST NOT flicker as the pointer crosses small gaps between neighbouring marks.

Tooltip placement SHOULD avoid covering the selected datum or critical neighbouring context.

---

# 2.52 Cross-filtering

Selecting a mark MAY filter linked visualisations.

The effect MUST be visible and reversible.

Example:

```text
Click "Pahang"
↓
Map highlights Pahang
Trend shows Pahang
Table filters to Pahang
Filter chip appears:
[Region: Pahang ×]
```

Cross-filtering MUST NOT silently change scope with no persistent state cue.

---

# 2.53 Cross-filter reset

Users MUST be able to determine:

```text
what is filtered
what caused the filter
how to remove it
```

A hidden cross-filter is non-conformant.

Cross-filter state SHOULD integrate with the Search, Navigation & Wayfinding filter contract.

---

# 2.54 Brushing

Brushing MAY be used to select a range in:

- time series;
- scatter plots;
- histograms.

The selected range MUST be visible.

A brushing interaction SHOULD have a non-drag alternative where it performs an essential operation, consistent with WCAG 2.2 requirements for dragging interactions.

---

# 2.55 Zoom and pan

Zoom/pan MUST preserve orientation.

Charts/maps SHOULD offer reset-to-home/default extent.

Zoom MUST NOT change data meaning without communicating aggregation or resolution changes.

If detail changes by zoom level, the interface SHOULD indicate:

```text
aggregation level
spatial resolution
sampling
```

where materially relevant.

---

# 2.56 Legend as control

A legend MAY act as a control to:

```text
hide/show series
focus category
change active layer
```

If interactive, legend items MUST be visually and programmatically identifiable as controls.

Do NOT make plain text look clickable only on hover.

---

# 2.57 Linked highlighting

Linked views SHOULD share one selection model.

Example:

```text
Map
↕
Chart
↕
Table
```

Selecting `FR-1024` in any view SHOULD produce one coherent selection state in the others.

Do NOT maintain separate conflicting selections unless comparison mode explicitly supports multiple selections.

---

# 2.58 Hover linking

Hover MAY highlight corresponding objects across linked views.

Hover MUST NOT:

- alter persistent filters;
- change browser history;
- execute navigation.

Persistent selection SHOULD require click/tap/keyboard activation.

---

# 2.59 Export

Analytical views SHOULD support appropriate export forms.

Canonical export types:

```text
PNG / SVG / PDF
for visual evidence

CSV / XLSX
for underlying data

GeoJSON / GPKG / other approved formats
for spatial data

permalink
for reproducible interactive state
```

Not every view requires every format.

---

# 2.60 Export fidelity

Exported charts SHOULD include enough context to remain interpretable outside the application.

Where applicable include:

```text
title
scope
period
unit
source
as-of timestamp
legend
method note
```

A screenshot containing only colored marks and no context is not a robust export.

---

# 2.61 CSV export

CSV export SHOULD reflect the data scope the user expects.

The UI MUST clarify whether export means:

```text
visible rows
filtered result set
all matching rows
all records
```

Authorization MUST be enforced server-side.

---

# 2.62 Permalinks

Analytical state that users need to share SHOULD be serialisable into a stable permalink.

Possible state:

```text
date range
filters
selected record
map extent
visible layers
chart breakdown
```

Sensitive values MUST NOT be encoded into URLs where Security standards prohibit it.

---

# 2.63 Tabular data at scale

Large data tables MUST be treated as analytical surfaces, not oversized simple HTML lists.

The design MUST define:

- density;
- primary identifier;
- frozen columns;
- sorting;
- filtering;
- grouping;
- aggregation;
- pagination/virtualisation;
- column management;
- selection;
- export.

---

# 2.64 Table density

Canonical density modes:

```text
compact
comfortable
spacious
```

Compact MAY be appropriate for expert analytical workflows.

Compact MUST NOT reduce text or target sizes below accessibility requirements.

Density SHOULD alter:

```text
row height
cell padding
secondary-line spacing
```

before shrinking typography.

---

# 2.65 Frozen columns

Freeze columns only when users must retain identity while scrolling horizontally.

Typical frozen fields:

```text
record ID
name
critical status
selection checkbox
```

Do NOT freeze so many columns that little scrollable viewport remains.

Freeze boundaries SHOULD be visually clear but restrained.

---

# 2.66 Sticky headers

Data-table headers SHOULD remain visible for long tables.

Sticky headers MUST:

- preserve column alignment;
- not obscure focused cells/controls;
- remain distinguishable from rows.

Sticky headers MAY gain a border/shadow only when rows pass underneath.

---

# 2.67 Column management

Dense enterprise tables SHOULD support appropriate column control.

Possible actions:

```text
show/hide
reorder
resize
pin
reset
```

Essential identifiers SHOULD NOT be hideable if their absence makes rows ambiguous.

Column configuration MAY be saved as user preference.

---

# 2.68 Virtual scrolling

Virtual scrolling MAY be used where dataset size requires it.

Design MUST account for:

- stable row height or measured height;
- keyboard navigation;
- focus persistence;
- screen-reader strategy;
- scroll restoration;
- export independent of rendered rows.

A user MUST NOT infer that only currently rendered rows constitute the entire result set.

---

# 2.69 Grouping and aggregation

Tables MAY group by:

```text
region
status
owner
date
category
```

Group rows MUST be visually distinct from data rows.

Aggregate values MUST state their aggregation method.

Example:

```text
Pahang
12 alerts
Total affected area: 48.2 ha
```

A total MUST NOT silently mix:

```text
sum
average
unique count
```

semantics.

---

# 2.70 Inline visualisations

Table cells MAY include:

- bars;
- mini progress;
- sparklines;
- heat indicators.

Inline visualisation MUST supplement rather than replace the value where precise value is important.

Good:

```text
72%   ███████░░░
```

rather than:

```text
███████░░░
```

alone.

---

# 2.71 Map projection literacy

Map projection is an analytical decision.

No single projection preserves:

```text
area
shape
distance
direction
```

simultaneously across all geographic scales.

Projection selection MUST follow the map's analytical purpose.

For area-based choropleths, equal-area projection SHOULD generally be used where projection choice is under product control. The EU Data Visualisation Guide specifically recommends equal-area projection for choropleths and advises against Mercator for this purpose.  
https://data.europa.eu/apps/data-visualisation-guide/choropleth-maps

---

# 2.72 Web Mercator literacy

Web Mercator MAY remain appropriate for interactive navigation because of basemap/tile ecosystem conventions.

It MUST NOT be treated as area-accurate.

A product performing area comparison or measurement MUST use an appropriate analytical computation/projection regardless of the display basemap.

Display projection and analytical coordinate reference system MUST NOT be conflated.

---

# 2.73 Coordinate reference systems

Geospatial interfaces intended for professional workflows SHOULD expose CRS/projection information where users need it.

Examples:

```text
EPSG:4326
EPSG:3857
local projected CRS
```

Import/export workflows MUST make expected CRS explicit.

The interface MUST NOT silently reinterpret coordinates when ambiguity could materially alter location.

---

# 2.74 Basemap selection

The basemap MUST remain subordinate to the analytical layers.

Analytical dashboards SHOULD generally use:

- low-contrast basemap;
- reduced POI density;
- restrained road hierarchy;
- subdued labels.

A colourful consumer-navigation basemap SHOULD NOT compete with thematic overlays.

---

# 2.75 Basemap theming

Light and dark application themes MAY use matching basemaps.

However, analytical layer colours MUST be revalidated under each basemap.

Dark mode MUST NOT merely invert map colours.

---

# 2.76 Imagery basemaps

Satellite/aerial imagery SHOULD be used when the imagery itself supplies relevant evidence.

Examples:

```text
forest clearing
building condition
land use
coastal change
```

Imagery SHOULD NOT be the default background if it makes overlays difficult to interpret.

---

# 2.77 Layer controls

Map layers MUST have:

```text
clear names
visibility state
ordering
legend relationship
```

Layer names MUST use domain terms.

Prefer:

```text
Canopy loss detections
Protected areas
Forest compartments
```

over:

```text
Layer 1
Analysis output
Polygon overlay
```

---

# 2.78 Layer ordering

Layer order MUST reflect visual and analytical hierarchy.

Canonical order often resembles:

```text
labels / selected features
alerts / primary analytical features
boundaries
supporting thematic layers
basemap labels
basemap
```

The exact order is domain-specific.

Layers MUST NOT conceal higher-priority evidence unexpectedly.

---

# 2.79 Opacity

Opacity controls MAY be provided when users need to compare overlapping raster/vector layers.

Opacity MUST NOT be the only means of resolving layer conflict.

Very transparent overlays MAY become unreadable or inaccessible.

---

# 2.80 Continuous raster legends

Continuous raster layers SHOULD use sequential or diverging legends according to semantics.

Example:

```text
Canopy density

0%      25%      50%      75%      100%
light ───────────────────────────→ dark
```

Legend MUST include:

```text
variable
unit
range
classification
```

where applicable.

---

# 2.81 Categorical raster legends

Categorical rasters require discrete legend entries.

Example:

```text
Land cover

■ Natural forest
■ Plantation
■ Agriculture
■ Built-up
■ Water
□ No observation
```

"No data" MUST be distinct from a valid category.

---

# 2.82 Symbology scale

Map symbols MUST remain interpretable across relevant zoom levels.

Line width, marker size, and label density MAY vary by zoom.

Size scaling MUST NOT imply quantitative meaning unless size encodes a quantity.

---

# 2.83 Proportional symbols

When symbol area encodes quantity, scaling MUST preserve the intended perceptual relationship.

The legend SHOULD include reference sizes.

Overlapping proportional symbols MAY require:

- transparency;
- selection interaction;
- decluttering;
- alternative representation.

---

# 2.84 Choropleths

Choropleths SHOULD display rates, proportions, densities, or otherwise appropriately normalised values when geographic units differ materially in population/area exposure.

The EU guide warns that raw totals can cause a choropleth to become primarily a map of population or unit size rather than the intended variable.  
https://data.europa.eu/apps/data-visualisation-guide/choropleth-maps

Do NOT map:

```text
total incidents
```

as area fill when:

```text
incidents per population
incidents per hectare
rate per exposure
```

is the analytically meaningful measure.

---

# 2.85 Modifiable Areal Unit Problem

Designers working with aggregated spatial data MUST understand the Modifiable Areal Unit Problem (MAUP).

Observed patterns can change when spatial data is grouped using different:

```text
boundary sizes
zones
aggregation units
```

Esri defines MAUP through both scale and zone effects: analytical results may change when the size or arrangement of aggregation units changes.  
https://support.esri.com/en-us/gis-dictionary/modifiable-areal-unit-problem

Therefore:

- administrative boundaries MUST NOT be treated as neutral analytical truth;
- comparisons across different boundary schemes require caution;
- boundary changes over time SHOULD be disclosed where they affect interpretation.

---

# 2.86 Choropleth class breaks

Class break method MUST be documented where discrete classes materially affect interpretation.

Possible approaches include:

```text
equal interval
quantile
natural breaks
domain thresholds
```

Domain thresholds SHOULD be preferred when meaningful policy/scientific boundaries exist.

A legend MUST show the actual classes.

---

# 2.87 Bivariate maps

Bivariate choropleths SHOULD be exceptional.

They impose substantial interpretation cost.

The EU Data Visualisation Guide notes that separate maps may be easier to interpret than a bivariate choropleth.  
https://data.europa.eu/apps/data-visualisation-guide/choropleth-maps

Small multiples SHOULD be considered first.

---

# 2.88 Clustering

Dense point maps SHOULD use clustering or another aggregation strategy where individual features would otherwise become unreadable.

Clusters MUST visually differ from individual features.

Cluster interaction SHOULD allow users to:

```text
zoom
expand
inspect count
```

depending on task.

MapLibre's current large-data guidance explicitly recommends clustering as a way to reduce the number of features displayed, improving both rendering performance and readability.  
https://maplibre.org/maplibre-gl-js/docs/guides/large-data/

---

# 2.89 Decluttering

Decluttering MAY include:

- zoom-dependent visibility;
- collision-aware labels;
- feature aggregation;
- clustering;
- sampling;
- density layers.

The UI MUST NOT remove analytically critical features solely to obtain a cleaner screenshot.

---

# 2.90 Heat maps

Heat maps MAY be used to reveal spatial concentration.

A heat map MUST communicate that it represents density/intensity rather than exact point locations.

A heat map SHOULD NOT replace individual-event inspection when records themselves matter.

---

# 2.91 Coordinate display

Professional map products SHOULD expose coordinates when users need exact spatial reference.

Coordinate display MAY follow pointer location or selected feature.

The coordinate format MUST be labelled or otherwise unambiguous.

Examples:

```text
3.81235° N, 102.41202° E

E 432814
N 421832
EPSG:XXXX
```

---

# 2.92 Scale

Maps used for spatial reasoning SHOULD provide an appropriate scale indicator.

Scale bars MUST update with zoom/projection.

A numeric map scale such as:

```text
1:25,000
```

SHOULD only be shown where it is meaningful in the rendering context.

---

# 2.93 Temporal map layers

Time-varying maps SHOULD provide explicit temporal state.

Example:

```text
Imagery date:
18 Sep 2026

[◀] ─────────●──────── [▶]
01 Sep                 30 Sep
```

A time slider MUST expose:

- current time/date;
- available range;
- step/granularity.

---

# 2.94 Time-slider animation

Temporal animation MAY help users perceive change.

Animation MUST:

- be user initiated;
- include pause;
- avoid excessive speed;
- respect reduced-motion preferences.

A user MUST be able to inspect individual time steps without playing animation.

---

# 2.95 Temporal comparison

For change detection, side-by-side or swipe comparison MAY be preferable to animation.

Examples:

```text
Before | After

2025 | 2026
```

Where exact comparison matters, persistent simultaneous views SHOULD be considered before animated replacement.

---

# 2.96 Drawing tools

Drawing tools MAY support:

```text
point
line
polygon
rectangle
circle
```

where the user must define spatial scope.

The current tool mode MUST be explicit.

The user MUST be able to:

```text
undo
edit
delete
cancel
```

a drawing.

---

# 2.97 Measurement tools

Measurement tools MUST identify:

```text
distance or area
unit
measurement method
```

Map-display geometry MUST NOT be assumed to provide survey-grade measurement.

Products requiring legal/survey accuracy MUST expose the authoritative measurement method and coordinate reference system.

---

# 2.98 Map selection state

Selected features MUST remain distinguishable from:

```text
hover
search result
alert
filtered-out
```

Use multiple channels where practical:

```text
outline
fill
halo
label
```

Selection MUST NOT rely solely on colour.

---

# 2.99 Attribution

Basemap and geospatial data attribution MUST remain visible where the applicable licence requires it.

It MUST NOT be removed to create a cleaner composition.

For OpenStreetMap-based data, official OSM guidance requires appropriate attribution under its licence terms.  
https://www.openstreetmap.org/copyright

Attribution MUST remain present in exported map images where the licence requires it.

---

# 2.100 Data provenance

Map layers SHOULD expose accessible provenance where relevant:

```text
source organisation
dataset
version
capture date
resolution
licence
```

This MAY appear in:

- layer info;
- metadata panel;
- legend details.

A map MUST NOT make synthetic, modelled, measured, and administrative layers appear equivalent when provenance materially differs.

---

# 2.101 Offline maps

Where field use requires offline operation, the design MUST explicitly support offline state.

Possible offline behaviour includes:

```text
cached basemap
cached active region
locally stored records
queued edits
limited layer availability
```

The application MUST identify what is unavailable offline.

---

# 2.102 Low-bandwidth fallback

Low-bandwidth map experiences SHOULD reduce:

```text
imagery resolution
optional layers
animation
prefetch
background requests
```

before removing critical analytical content.

A simplified static map MAY be preferable to a continuously failing interactive map.

---

# 2.103 Map loading

Large maps SHOULD load progressively.

The design SHOULD distinguish:

```text
basemap ready
analytical layer loading
partial tile availability
layer error
```

A map MUST NOT appear complete while a critical analysis layer silently failed.

---

# 2.104 Chart accessibility

Charts MUST provide a non-visual path to the information.

UK Government Analysis Function guidance recommends accessible alternatives such as:

- alternative descriptions;
- supporting data tables;
- data downloads;
- keyboard-operable interactive charts.

https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/

A chart image with only generic alt text such as:

```text
bar chart
```

is insufficient when the chart conveys material information.

---

# 2.105 Chart descriptions

A chart description SHOULD communicate the principal insight rather than narrate every pixel.

Example:

```text
Canopy-loss detections increased from 84 in August
to 126 in September, with most of the increase
occurring in Pahang.
```

The detailed underlying values SHOULD remain available through table/download where relevant.

---

# 2.106 Accessible data table

Important charts SHOULD provide access to underlying data in a structured table or machine-readable download.

UK Government guidance specifically recommends data downloads with charts and dashboard accessibility guidance supports providing alternative tables/content alongside visualisations.  
https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/  
https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-testing-dashboards-for-design-and-accessibility/

---

# 2.107 Interactive chart keyboard access

Interactive chart controls MUST be keyboard operable.

Where individual marks are keyboard navigable, the navigation model MUST be documented.

If mark-level keyboard navigation would be impractical, an accessible table or structured alternative MUST provide equivalent analytical access.

---

# 2.108 Map accessibility

Interactive maps MUST NOT be the sole way to access essential records.

Equivalent access MAY include:

```text
search
results list
table
address/coordinate input
layer list
feature detail panel
```

A blind or keyboard-only user MUST be able to perform the essential product task without requiring pixel-based map interaction.

---

# 2.109 Keyboard map controls

Where map navigation is essential, keyboard interaction SHOULD support:

```text
pan
zoom
reset
layer controls
feature/list selection
```

The focus model MUST remain clear.

Keyboard users MUST NOT become trapped in the map.

---

# 2.110 Map + list accessibility

For analytical maps containing selectable features, a synchronized list SHOULD provide an alternate navigation path.

Example:

```text
Map feature selected:
FR-1024

↕ synchronised with

Results list:
FR-1024 — 3.8 ha canopy-loss detection
```

This also improves usability for users who prefer text scanning.

---

# 2.111 Colour-blind-safe design

Colour palettes SHOULD be tested for common colour-vision deficiencies.

Colour MUST NOT be the only encoding of:

```text
selection
criticality
category
threshold
missing data
```

Supplement with:

```text
shape
stroke
pattern
label
position
```

Carbon's visualisation palette guidance is explicitly designed around accessibility and neighbouring-colour differentiation.  
https://carbondesignsystem.com/data-visualization/color-palettes/

---

# 2.112 Sonification

Sonification MAY be offered as a supplementary exploration mode where it provides analytical value and appropriate implementation support exists.

Sonification SHOULD NOT be treated as a universal accessibility replacement.

It MAY be useful for expressing:

```text
trend
relative magnitude
shape over time
```

through auditory mapping.

A textual/table equivalent SHOULD still exist for essential information.

---

# 2.113 Accessible export

Exported charts and reports SHOULD preserve accessibility where the output format supports it.

A CSV export is not by itself a substitute for accessible on-screen interaction.

A PDF/image export MUST NOT become the sole available form of the analysis.

---

# 2.114 Performance-aware design

Performance MUST influence design choices before implementation.

A design MUST NOT assume unlimited rendering capacity.

The design team SHOULD define:

```text
maximum visible series
maximum simultaneous layers
feature density strategy
initial dashboard payload
interaction latency expectation
```

with engineering.

---

# 2.115 Progressive rendering

Heavy dashboards SHOULD prioritise:

```text
scope/context
critical status
primary panel
```

before secondary analytical content.

Lower-priority panels MAY load progressively.

The page SHOULD avoid rendering a wall of identical skeleton cards if some content can already be meaningfully shown.

---

# 2.116 Chart point density

Charts SHOULD NOT render every underlying observation when the display cannot resolve them meaningfully.

Possible strategies include:

```text
aggregation
binning
sampling
server-side summarisation
density plot
```

The chosen strategy MUST preserve the analytical meaning required by the task.

---

# 2.117 Map feature density

Large point/vector datasets SHOULD use:

- clustering;
- vector tiling;
- generalisation;
- zoom-dependent rendering;
- viewport queries.

MapLibre's large-data guidance recommends reducing or clustering displayed features to improve both map rendering performance and readability.  
https://maplibre.org/maplibre-gl-js/docs/guides/large-data/

---

# 2.118 Dashboard refresh performance

A dashboard MUST NOT refresh every panel simultaneously at a high frequency unless the task truly requires it.

Refresh cadence SHOULD reflect:

```text
data change rate
decision urgency
backend cost
visual stability
```

Frequently changing data SHOULD NOT cause the entire layout to reflow.

---

# 2.119 Interaction latency

Cross-filtering, hover, selection, and zoom SHOULD feel immediate.

Where an operation requires server computation:

- preserve current context;
- show scoped loading;
- avoid blocking unrelated panels.

A single slow panel MUST NOT make the entire dashboard unusable where independent interaction is possible.

---

# 2.120 shadcn/ui baseline

The following shadcn/ui primitives SHOULD provide baseline UI composition where appropriate:

```text
Card
Table
Tabs
Tooltip
Popover
DropdownMenu
Select
Checkbox
RadioGroup
Slider
Sheet
Drawer
ScrollArea
Resizable
Button
Badge
Skeleton
```

The `Chart` primitives MAY provide baseline chart composition when the approved charting implementation uses them.

shadcn/ui MUST NOT determine:

- analytical question;
- chart type;
- map projection;
- colour semantics;
- data aggregation.

Those remain design/domain responsibilities.

---

# 2.121 Security alignment

Dashboards MUST NOT expose restricted information through:

- chart labels;
- tooltips;
- map features;
- legends;
- export;
- totals;
- filter counts.

Aggregated values MAY still reveal sensitive information.

Security and disclosure-control standards remain authoritative.

Export controls MUST enforce the same authorization as the interactive surface.

---

# 2.122 Data & Database alignment

Visual summaries MUST be traceable to defined metrics.

The design MUST NOT invent:

```text
average
risk
score
trend
confidence
```

without corresponding domain definitions.

Aggregation semantics MUST remain consistent across:

```text
KPI
chart
table
export
API
```

---

# 2.123 API alignment

Linked dashboard panels SHOULD share query/filter semantics.

The UI MUST NOT generate contradictory interpretations of the same filter across endpoints.

Pagination, map viewport queries, chart aggregation, and table exports SHOULD align through canonical API parameters or query contracts.

---

# 2.124 State Management alignment

Analytical state SHOULD distinguish:

```text
ephemeral:
hover
open tooltip

shareable:
filter
date range
selection
visible layers

personal preference:
columns
panel layout
density
```

Shareable analytical state SHOULD use URL/application state where appropriate.

Transient hover state MUST NOT become durable state.

---

# 2.125 Search & Navigation alignment

Cross-filter state SHOULD integrate with applied-filter patterns.

Deep-linkable chart/map selections SHOULD follow the Search, Navigation & Wayfinding URL contract.

Map/list synchronization MUST use one canonical selection model.

---

# 2.126 Design Token alignment

Visualisation tokens SHOULD cover:

```text
categorical palette
sequential palette
diverging palette
alert palette
grid line
axis
annotation
selection
hover
missing data
confidence band
map boundary
```

Chart libraries MUST NOT create ungoverned colour systems.

---

# 3. Anti-patterns

## 3.1 KPI-card reflex

Do NOT begin every dashboard with four equal KPI cards.

---

## 3.2 Metric without denominator

Do NOT show:

```text
42 incidents
```

when the meaningful question is incident rate relative to population, assets, area, or exposure.

---

## 3.3 Decorative KPI

Do NOT create metrics merely to occupy empty layout slots.

---

## 3.4 False freshness

Do NOT label hourly or daily data as `Live`.

---

## 3.5 One timestamp for unequal freshness

Do NOT imply all panels share the same source freshness if they do not.

---

## 3.6 Dashboard card soup

Do NOT put every chart, label, and number in a separately elevated card.

---

## 3.7 Chart-type variety for visual interest

Do NOT use:

```text
bar
donut
radar
area
gauge
bubble
```

simply so each panel looks different.

---

## 3.8 Pie with many categories

Do NOT use pie/donut charts for many similarly sized categories.

---

## 3.9 Radar-chart reflex

Radar charts SHOULD NOT be used when a bar/dot/small-multiple comparison is materially easier to read.

---

## 3.10 Decorative gauges

Do NOT use speedometer-style gauges for ordinary percentages merely to imply instrumentation.

---

## 3.11 Truncated bar axis

Do NOT truncate a bar-chart scale merely to exaggerate small differences.

---

## 3.12 Aspect-ratio distortion

Do NOT compress or stretch line charts so strongly that ordinary variation appears flat or dramatic.

UK Government guidance specifically demonstrates how chart aspect ratio can alter perceived trend intensity.  
https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/

---

## 3.13 Rainbow categorical charts

Do NOT assign every series an arbitrary unrelated bright colour.

---

## 3.14 Gradient as data scale

Do NOT use decorative brand gradients where a sequential/diverging palette is required.

---

## 3.15 Unlabelled dashed reference line

Every analytically relevant reference line MUST be identifiable.

---

## 3.16 Invisible uncertainty

Do NOT show uncertain model estimates as visually exact measurements when uncertainty matters.

---

## 3.17 Missing equals zero

Do NOT encode absent observation as zero.

---

## 3.18 Connected missing observations

Do NOT draw continuous lines through missing time intervals unless interpolation is intended and identified.

---

## 3.19 Dual-axis convenience

Do NOT add a second y-axis merely because two time series have different magnitudes.

---

## 3.20 Excessive decimals

Do NOT display precision the underlying measurement does not support.

---

## 3.21 Tooltip dependency

A chart MUST NOT require hover just to know what it represents.

---

## 3.22 Cross-filter invisibility

Do NOT silently filter other panels with no persistent indication.

---

## 3.23 Legend pretending not to be a control

If a legend item hides/shows data, it MUST visually behave as an interactive element.

---

## 3.24 Export ambiguity

A control labelled:

```text
Export
```

MUST NOT leave the user guessing whether it exports:

```text
current chart
current page
filtered data
all data
```

---

## 3.25 Table as infinite spreadsheet

Do NOT expose hundreds of columns because the database has hundreds of fields.

Column priority is a design responsibility.

---

## 3.26 Horizontal-scroll maze

Do NOT freeze so many columns that the scrollable data region becomes unusable.

---

## 3.27 Visualisation-only cells

Do NOT replace exact analytical values with tiny bars/sparklines when precise lookup matters.

---

## 3.28 Consumer basemap under analytics

Do NOT use visually busy navigation basemaps beneath complex thematic layers without deliberate restyling.

---

## 3.29 Map as decoration

Do NOT include a map merely because data contains a region field.

---

## 3.30 Mercator area comparison

Do NOT use Web Mercator as if it preserved geographic area for global choropleth comparison.

The EU Data Visualisation Guide recommends equal-area projection for choropleths where area comparison matters.  
https://data.europa.eu/apps/data-visualisation-guide/choropleth-maps

---

## 3.31 Raw totals in choropleths

Do NOT map raw population-dependent totals as administrative-area fill when rates/densities are the meaningful comparison.

---

## 3.32 MAUP blindness

Do NOT interpret aggregated administrative patterns as though boundaries have no influence on the observed result.

https://support.esri.com/en-us/gis-dictionary/modifiable-areal-unit-problem

---

## 3.33 Bivariate-map enthusiasm

Do NOT choose a bivariate choropleth merely because it compresses two variables into one map.

Consider small multiples.

---

## 3.34 Cluster count without drill-down

Clusters MUST NOT become terminal blobs that users cannot inspect.

---

## 3.35 Fake coordinate precision

Do NOT display coordinate decimals beyond meaningful source accuracy.

---

## 3.36 Survey-grade implication

Do NOT imply browser-map measurement is legally authoritative unless it actually follows the required surveying process.

---

## 3.37 Invisible attribution

Do NOT hide required map attribution in an overflow menu merely for aesthetic cleanliness.

---

## 3.38 Inaccessible canvas-only analytics

Do NOT make chart/map canvas rendering the only accessible representation of essential data.

---

## 3.39 Colour-only maps

Do NOT encode all geographic categories solely through hue where users need reliable distinction.

---

## 3.40 Autoplay temporal map

Do NOT start time-series map animation automatically.

---

## 3.41 Rendering everything

Do NOT render millions of map features or data points merely because the source dataset contains them.

---

## 3.42 Full-dashboard loading lock

One slow panel SHOULD NOT block otherwise usable dashboard content.

---

# 4. Worked Example — Forest & Land-Cover Monitoring Dashboard

## 4.1 Scenario

A forestry/environmental agency monitors:

- satellite-detected canopy loss;
- land-cover change;
- concession boundaries;
- protected areas;
- field verification;
- enforcement cases.

Primary users:

```text
GIS analysts
forest enforcement supervisors
regional managers
policy analysts
```

The primary operational question is:

```text
Which new land-cover changes need human review or enforcement attention?
```

The dashboard MUST be designed around that question.

---

# 4.2 Non-conformant version

```text
┌─────────────────────────────────────────────────────┐
│ 2.4M ha      98.4%      12.8K       +24%            │
│ Monitored    Accuracy   Alerts      Improvement     │
├──────────────┬──────────────┬───────────────────────┤
│ Donut        │ Gauge        │ Fake line chart       │
├──────────────┴──────────────┴───────────────────────┤
│ Small decorative map                                │
└─────────────────────────────────────────────────────┘
```

This composition is non-conformant because:

- the decision question is unclear;
- metrics lack actionable context;
- the map is subordinate despite the spatial task;
- the gauge and donut add visual variety rather than evidence;
- freshness is missing;
- uncertainty is not represented;
- there is no route to underlying detections.

---

# 4.3 Canonical operational composition

```text
┌──────────────────────────────────────────────────────────────────┐
│ Forest Change Review                                             │
│ Pahang · 01–22 Sep 2026      Imagery: Sentinel-2      As of 18:00│
├──────────────────┬──────────────────┬────────────────────────────┤
│ Requires review  │ Protected-area   │ Field verification         │
│ 84 detections    │ overlaps         │ 19 pending                 │
│ +12 since Mon    │ 12               │ 7 overdue                  │
├──────────────────────────────────────────────┬───────────────────┤
│                                              │ Review queue      │
│                                              │                   │
│                    MAP                       │ FR-1842  3.8 ha   │
│                                              │ 82% confidence    │
│ Canopy-loss detections                       │ Protected overlap │
│ Protected areas                              │                   │
│ Concessions                                  │ FR-1840  2.1 ha   │
│                                              │ ...               │
├──────────────────────────────────────────────┴───────────────────┤
│ Detection trend · last 12 weeks                                 │
├──────────────────────────────────────────────────────────────────┤
│ Verification / enforcement table                                │
└──────────────────────────────────────────────────────────────────┘
```

The map is primary because location, overlap, and spatial context are central to the task.

---

# 4.4 KPI design

Use:

```text
Requires review
84

+12 since Monday
```

because it represents a current work burden.

Use:

```text
Protected-area overlaps
12

9.6 ha affected
```

because both count and area may matter.

Do NOT use:

```text
Trees saved
Sustainability score
Monitoring efficiency
```

unless those metrics have actual, governed definitions.

---

# 4.5 Map symbology

Canonical map hierarchy:

```text
Basemap
low-contrast neutral

Forest compartment boundary
thin subdued outline

Concession boundary
medium neutral/agency secondary

Protected area
distinct hatch + boundary

Canopy-loss detection
alert accent fill + outline

Selected detection
strong outline + halo

Field verified
distinct verified marker/state
```

Brand colour MUST NOT override analytical colour meaning.

---

# 4.6 Land-cover legend

```text
LAND COVER — 2025 baseline

■ Natural forest
■ Plantation
■ Agriculture
■ Built-up
■ Water
□ No observation / cloud

Source:
National Land Cover 2025 v3
```

"No observation" MUST NOT be visually equivalent to "Water" or background.

---

# 4.7 Detection legend

For a continuous confidence surface:

```text
Detection confidence

50%                            100%
light amber ─────────────→ dark rust
```

If confidence thresholds drive review:

```text
■ 50–69%   Low
■ 70–84%   Review
■ 85–100%  High
```

those thresholds MUST come from the domain model, not aesthetic convenience.

---

# 4.8 Detection card/detail

Selected feature:

```text
FC-2026-09-1842

Area
3.8 ha

Model confidence
82%

Acquisition
18 Sep 2026

Sensor
Sentinel-2B

Cloud cover
7%

Baseline
Land Cover 2025 v3

Protected-area overlap
2.1 ha

Field verification
Not started
```

This level of specificity is preferable to an abstract "Risk: High" label where the underlying evidence is available.

---

# 4.9 Trend chart

Question:

```text
Is the number of detections changing unusually?
```

Use a line or bar chart:

```text
Weekly detections

80 ┤                    ●
60 ┤          ●    ● ───
40 ┤ ●──●──●────●
20 ┤
   └────────────────────────
     Jul        Aug       Sep
```

Add:

```text
12-week median
```

as a reference where analytically meaningful.

If cloud cover materially affects detection opportunity, the chart SHOULD either:

- expose cloud coverage;
- annotate periods with poor observation conditions;
- normalize appropriately.

The trend MUST NOT imply ecological change when acquisition availability is the true cause.

---

# 4.10 Missing imagery

A week obscured by cloud MUST NOT appear as:

```text
0 detections
```

Use:

```text
No reliable observation
Cloud cover exceeded threshold
```

and break/interpolate the visual only according to the analytical model.

---

# 4.11 Cross-filtering

Selecting:

```text
Protected area: Taman Negara
```

SHOULD update:

```text
map extent/highlight
review queue
trend chart
table
applied filter
```

Example:

```text
Applied:
[Protected area: Taman Negara ×]
```

The user MUST be able to clear the filter.

---

# 4.12 Map/list link

Hovering:

```text
FR-1842
```

in the review list MAY highlight the polygon.

Clicking the row SHOULD persist selection and expose details.

Map pan MUST NOT silently change the queue unless the product deliberately uses viewport search.

If viewport search is supported:

```text
[Search this area]
```

SHOULD appear after significant movement.

---

# 4.13 Spatial accuracy

Area statistics MUST be computed using the authoritative geospatial method.

The browser's Web Mercator display MUST NOT be treated as the analytical basis for hectare calculations.

The UI MAY disclose:

```text
Area calculated in:
EPSG:XXXX
```

where analyst users need the information.

---

# 4.14 Protected-area choropleth

Suppose managers want to compare disturbance among protected areas.

Do NOT map:

```text
total loss area
```

without considering protected-area size.

A more interpretable metric may be:

```text
percentage of protected area affected
```

or:

```text
loss hectares per 1,000 ha
```

depending on the actual monitoring question.

This follows the general choropleth principle that geographic comparisons often require normalised rather than raw totals.  
https://data.europa.eu/apps/data-visualisation-guide/choropleth-maps

---

# 4.15 MAUP disclosure

If comparisons depend on administrative districts, analysts SHOULD be able to understand that different boundary schemes may change observed patterns.

A regional manager's dashboard MUST NOT imply that district boundaries are natural ecological units when they are administrative units.

https://support.esri.com/en-us/gis-dictionary/modifiable-areal-unit-problem

---

# 4.16 Table

Canonical review table:

```text
┌──────────┬─────────┬──────┬────────────┬──────────┬─────────────┐
│ Detection│ Region  │ Area │ Confidence │ Observed │ Verification│
├──────────┼─────────┼──────┼────────────┼──────────┼─────────────┤
│ FR-1842  │ Pahang  │3.8ha │ 82%        │ 18 Sep   │ Pending     │
│ FR-1840  │ Pahang  │2.1ha │ 91%        │ 18 Sep   │ Verified    │
└──────────┴─────────┴──────┴────────────┴──────────┴─────────────┘
```

Default frozen column:

```text
Detection
```

because it maintains row identity.

Users MAY add:

```text
sensor
concession
protected overlap
model version
```

through column management.

---

# 4.17 Refresh state

The dashboard MAY have different source freshness:

```text
Detections
Processed 22 Sep 17:42

Satellite imagery
Acquired 18 Sep

Protected areas
Dataset version 2026.3

Field reports
Last sync 22 Sep 17:58
```

One generic:

```text
Updated now
```

would be misleading.

---

# 4.18 Accessible alternative

The map MUST have an equivalent results list/table.

The principal analytical statement SHOULD be available as text:

```text
84 detections currently require review.

12 intersect protected areas.

The largest unresolved detection is 7.4 ha.

Most unresolved protected-area overlaps are in
Jerantut district.
```

The underlying data SHOULD be downloadable subject to authorization.

---

# 4.19 Export

Permitted exports MAY include:

```text
PNG
Current map/chart view

CSV
Filtered detection records

GeoJSON
Authorized detection geometry

Permalink
Current filters + selected detection + map extent
```

The export control MUST state scope.

---

# 4.20 Performance design

At national scale, individual detection polygons MUST NOT all be rendered at every zoom level.

A canonical strategy might be:

```text
country scale
aggregated counts / clusters

regional scale
generalised polygons

local scale
full detection geometry
```

This supports both readability and rendering performance.

MapLibre similarly recommends clustering and other large-data strategies to reduce displayed feature count.  
https://maplibre.org/maplibre-gl-js/docs/guides/large-data/

---

# 5. Acceptance Checklist

## Dashboard

- [ ] Primary user question is documented.
- [ ] Dashboard type is identified.
- [ ] Every panel supports a decision or monitoring task.
- [ ] Above-the-fold priority is deliberate.
- [ ] Important panels are not forced to equal size.
- [ ] KPI cards have units/scope/context where required.
- [ ] KPI direction semantics are defined.
- [ ] Drill-down path exists.
- [ ] Default dashboard is useful without personalisation.
- [ ] Saved-view semantics are documented.
- [ ] Data freshness is visible.
- [ ] Per-source freshness is shown where materially different.

## Chart selection

- [ ] Analytical relationship is identified first.
- [ ] Chart type matches the question.
- [ ] Table was considered for exact lookup.
- [ ] Small multiples were considered for comparison.
- [ ] Sparklines have defined period/context.
- [ ] Part-to-whole charts represent an actual whole.
- [ ] Geography is relevant before a map is used.

## Chart craft

- [ ] Axis scale is honest.
- [ ] Bar baseline is appropriate.
- [ ] Tick density is restrained.
- [ ] Grid lines remain subordinate.
- [ ] Direct labels are used where beneficial.
- [ ] Palette type matches data type.
- [ ] Semantic alert colours are protected.
- [ ] Reference lines are labelled.
- [ ] Uncertainty is shown where material.
- [ ] Missing data differs from zero.
- [ ] Interpolation is identified.
- [ ] Dual axes have strong justification.
- [ ] Units are explicit.
- [ ] Locale formatting is correct.
- [ ] Precision matches source accuracy.

## Interaction

- [ ] Tooltips supplement rather than carry essential meaning.
- [ ] Tooltip interaction works beyond mouse hover.
- [ ] Cross-filter state is visible.
- [ ] Cross-filter state is reversible.
- [ ] Brushing has an accessible alternative where required.
- [ ] Zoom/pan provide orientation/reset.
- [ ] Interactive legends look interactive.
- [ ] Linked views share one selection model.
- [ ] Hover does not alter durable state.
- [ ] Export scope is explicit.
- [ ] Permalinks reproduce useful state.

## Tables

- [ ] Density is appropriate to user expertise.
- [ ] Frozen columns preserve identity.
- [ ] Frozen width does not consume the table.
- [ ] Sticky headers remain aligned.
- [ ] Column management is available where needed.
- [ ] Essential identifier columns cannot disappear accidentally.
- [ ] Virtualisation is designed for keyboard/focus access.
- [ ] Group aggregation method is explicit.
- [ ] Inline visualisations retain precise values where required.

## Maps

- [ ] Map use is justified by spatial reasoning.
- [ ] Display projection is understood.
- [ ] Analytical CRS is appropriate.
- [ ] Basemap is subordinate.
- [ ] Imagery is used only when useful.
- [ ] Layer names use domain language.
- [ ] Layer order is deliberate.
- [ ] Legends match data semantics.
- [ ] Missing/no-data state is explicit.
- [ ] Symbol scale is meaningful.
- [ ] Choropleths use appropriate normalization.
- [ ] Projection is appropriate for choropleth purpose.
- [ ] MAUP has been considered.
- [ ] Classification method is documented.
- [ ] Clustering/decluttering preserves analytical meaning.
- [ ] Coordinates use clear format.
- [ ] Scale display is appropriate.
- [ ] Time-slider state is explicit.
- [ ] Drawing tools support undo/edit/cancel.
- [ ] Measurement accuracy is not overstated.
- [ ] Attribution/licence remains visible.
- [ ] Offline behaviour is explicit.
- [ ] Low-bandwidth fallback exists where needed.

## Accessibility

- [ ] Chart has a useful non-visual description.
- [ ] Data table/download is available where appropriate.
- [ ] Interactive controls are keyboard usable.
- [ ] Map is not the only path to essential records.
- [ ] Map/list synchronization provides alternate navigation.
- [ ] Colour is not the sole encoding.
- [ ] Palettes have been checked for colour-vision accessibility.
- [ ] Focus remains visible.
- [ ] Reduced motion is supported.
- [ ] Sonification, where present, supplements rather than replaces text/table access.

## Performance

- [ ] Initial payload is prioritized.
- [ ] Secondary panels may load progressively.
- [ ] Point density is bounded.
- [ ] Map feature strategy is zoom-aware.
- [ ] Large data uses aggregation/tiling/clustering where appropriate.
- [ ] Refresh cadence matches actual decision need.
- [ ] Live updates do not cause layout instability.
- [ ] One slow panel does not unnecessarily block the dashboard.
- [ ] Interaction latency has been tested with production-scale data.

## Cross-standard

- [ ] Exports enforce authorization.
- [ ] Aggregates do not leak protected data.
- [ ] KPI definitions match Data/Database definitions.
- [ ] API filter semantics are consistent.
- [ ] Shareable state follows URL/state rules.
- [ ] Design Tokens own chart/map palettes.
- [ ] shadcn/ui is used for applicable interaction primitives.
- [ ] Charts/maps do not invent business metrics.

---

# 6. Canonical Summary

The Dashboard, Data Visualisation & Map Interaction Standard follows this hierarchy:

```text
user question
↓
data meaning
↓
analytical relationship
↓
visual encoding
↓
composition
↓
interaction
↓
accessibility
↓
performance
↓
implementation
```

The governing rules are:

```text
Start with the question,
not the chart.

A dashboard is a decision interface,
not a collection of visualisations.

Put priority above fold,
not maximum density.

KPI cards require context.
A large number is not automatically insight.

Summary must drill down to evidence.

Chart type follows analytical relationship.

Use tables for exact lookup.
Use charts for pattern.

Use small multiples for repeatable comparison.

Do not distort axes for drama.

Colour encodes meaning.
Categorical, sequential and diverging
are different contracts.

Missing ≠ zero.

Uncertainty must be visible
when it changes interpretation.

Avoid dual axes unless strongly justified.

Units, locale and precision are part of truthfulness.

Tooltips supplement the chart;
they do not make it understandable.

Cross-filtering must be visible and reversible.

Linked map/list/chart views
share one selection model.

Tables at scale require deliberate density,
column management and rendering strategy.

A map is an analytical interface,
not wallpaper.

Projection affects interpretation.

Choropleths generally need normalised values.

Administrative boundaries can change apparent patterns:
account for MAUP.

Basemaps stay subordinate to analytical layers.

Legends explain semantics,
not just colours.

Attribution stays visible.

A chart or map must have a non-visual access path.

Performance is a design constraint,
not an engineering cleanup task.

Never render more data
than the display can meaningfully communicate.
```

A **Gold Standard 2026** analytical surface MUST allow a user to answer:

```text
What question am I answering?

What data am I looking at?

What is the scope?

How fresh is it?

What does colour mean?

What is missing?

What is uncertain?

What changed?

What is selected or filtered?

Can I inspect the underlying evidence?

Can I reproduce or share this state?

Can I access the same essential information
without relying on visual perception alone?
```

If those answers are unclear, the visualisation is incomplete regardless of how polished the dashboard appears.

---

# 7. Sources

1. **IBM Carbon Design System — Chart Types**  
   https://carbondesignsystem.com/data-visualization/chart-types/

2. **IBM Carbon Design System — Data Visualization Color Palettes**  
   https://carbondesignsystem.com/data-visualization/color-palettes/

3. **UK Government Analysis Function — Data visualisation: charts**  
   https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/

4. **UK Government Analysis Function — Building and managing dashboards**  
   https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-building-and-managing-dashboards/

5. **UK Government Analysis Function — Testing dashboards for design and accessibility**  
   https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-testing-dashboards-for-design-and-accessibility/

6. **UK Government Analysis Function — Data visualisation: colours**  
   https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-colours-in-charts/

7. **European Data Portal — Choropleth Maps**  
   https://data.europa.eu/apps/data-visualisation-guide/choropleth-maps

8. **European Data Portal — Data Visualisation Guide**  
   https://data.europa.eu/apps/data-visualisation-guide/

9. **Esri GIS Dictionary — Modifiable Areal Unit Problem**  
   https://support.esri.com/en-us/gis-dictionary/modifiable-areal-unit-problem

10. **USGS — MAUP in raster GIS datasets**  
    https://www.usgs.gov/publications/maup-modifiable-areal-unit-problem-raster-gis-datasets-raster-pixels-modifiable-areas

11. **MapLibre GL JS — Optimising Performance for Large GeoJSON Datasets**  
    https://maplibre.org/maplibre-gl-js/docs/guides/large-data/

12. **OpenStreetMap — Copyright and Licence / Attribution**  
    https://www.openstreetmap.org/copyright

13. **W3C — Web Content Accessibility Guidelines (WCAG) 2.2**  
    https://www.w3.org/TR/WCAG22/

The central design distinction in this chapter is that **a dashboard is not the analytical model**. Every visual summary must preserve the underlying scope, units, uncertainty, freshness, and path back to evidence; maps add the additional obligation to preserve spatial meaning, projection literacy, and provenance.
