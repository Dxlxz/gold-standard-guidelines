---
id: "geospatial"
title: "Geospatial & Map Guidelines"
domain: "data"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["data", "geospatial", "map"]
applies_to: ["data"]
related: ["code-review"]
legacy_number: 58
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 63855
provenance: baseline

---

This version makes CRS correctness, tile architecture, PostGIS query discipline, temporal semantics, offline packaging, and location privacy explicit architectural requirements rather than implementation details.

# Geospatial & Map Guidelines — Gold Standard 2026

**Canonical placement:** Data & Database → Geospatial → File & Media → Performance  
**Status:** Gold Standard 2026  
**Component baseline:** shadcn/ui for controls, panels, forms, menus, dialogs, state messaging, and surrounding application UI  
**Database baseline:** PostgreSQL + PostGIS where relational spatial storage is required  
**Interchange baseline:** standards-based formats, with RFC 7946 GeoJSON for appropriate web interchange and tiled delivery for scale

---

# 1. Purpose

## 1.1 Scope

This standard defines the canonical requirements for geospatial data storage, transformation, querying, delivery, visualization, offline use, and export.

It covers:

- coordinate reference systems and EPSG discipline;
- coordinate order and datum semantics;
- projections and transformation;
- geometry types and validity;
- spatial precision;
- GeoJSON;
- raster and vector tiles;
- tile matrix sets;
- PostGIS storage and indexing;
- distance, area, containment, and nearest-neighbour queries;
- map API contracts;
- client rendering and performance;
- clustering and aggregation;
- basemaps and operational layers;
- layer ordering and legends;
- offline maps and cached regions;
- map interaction and state;
- map accessibility;
- print and export;
- location privacy and security;
- time-aware and spatiotemporal data.

This standard applies to:

- interactive web maps;
- administrative geospatial interfaces;
- logistics and fleet applications;
- asset and field-service maps;
- analytical maps;
- location search;
- routing-related interfaces;
- geofencing;
- environmental and sensor maps;
- offline field applications;
- geospatial exports and reports;
- backend services that store, query, transform, or publish spatial information.

---

## 1.2 Design objective

A geospatial system MUST preserve spatial meaning from source through storage, query, API, rendering, and export.

A coordinate pair without a known coordinate reference system MUST NOT be treated as valid geospatial data.

A map MUST NOT be treated as merely a graphical component. It is an interface over:

1. coordinate systems;
2. geometries;
3. spatial queries;
4. data authorization;
5. state;
6. rendering infrastructure;
7. potentially sensitive location information.

Visual correctness alone is insufficient.

A conforming implementation MUST also be:

- spatially correct;
- query-efficient;
- secure;
- accessible;
- explainable;
- performant at expected scale;
- resilient to offline or partial-connectivity conditions where required.

---

## 1.3 Relationship to other standards

Geospatial implementations MUST conform to the corpus standards for:

- **Security** — authorization, tenancy, precise-location sensitivity, cache isolation, export control;
- **Data & Database** — schemas, constraints, timestamps, provenance, migrations, indexes, retention;
- **API** — spatial query contracts, pagination, errors, caching, versioning;
- **State Management** — map viewport, layer state, filters, selections, URL state;
- **Forms & Validation** — coordinate entry, bounding boxes, radius searches, layer configuration;
- **Accessibility** — keyboard interaction, alternatives to visual maps, focus, contrast, reduced motion;
- **Design Tokens** — colours, typography, spacing, elevation, focus and semantic status;
- **Components** — shadcn/ui primitives for application controls;
- **Patterns** — loading, empty states, search, filtering, drill-down, export and responsive behaviour;
- **File & Media** — downloads, offline packages, raster assets, metadata and content lifecycle;
- **Performance** — payload budgets, caching, tiling, rendering and query plans.

A mapping SDK or spatial database extension MUST NOT be treated as exempt from these standards.

---

# 2. Rules

## 2.1 Coordinate reference systems are part of the data contract

Every persisted geometry MUST have a known coordinate reference system.

PostGIS geometry columns SHOULD declare a fixed SRID through the column type where practical, for example:

`geometry(Point, 4326)`

or:

`geometry(MultiPolygon, <projected-SRID>)`.

Canonical production geometry columns MUST NOT use unknown SRID `0` unless the absence of a CRS is itself an intentional and documented domain condition.

The chosen CRS MUST be appropriate to:

- the source data;
- the geographical extent;
- measurement requirements;
- intended transformations;
- precision requirements.

An EPSG identifier MUST be used only when the stored coordinates actually conform to the corresponding CRS definition.

An implementation MUST NOT assign `EPSG:4326` merely because coordinates resemble longitude and latitude.

The CRS MUST be recorded in:

- database schema or metadata;
- ingestion contracts;
- transformation pipelines;
- export metadata where the format requires or permits it.

CRS assumptions MUST NOT live only in application code comments.

---

## 2.2 EPSG discipline

EPSG identifiers MUST be treated as references to defined coordinate reference systems, not as informal labels.

Teams MUST distinguish between:

- geodetic datum;
- coordinate system;
- projection;
- coordinate operation;
- axis order;
- units.

An EPSG code MUST NOT be changed without transforming the coordinates when the source and destination CRSs differ.

In PostGIS:

- `ST_SetSRID` MUST be used only when assigning the correct CRS metadata to coordinates already expressed in that CRS;
- `ST_Transform` MUST be used when coordinates must actually be converted between coordinate reference systems.

PostGIS explicitly distinguishes these operations: `ST_SetSRID` changes the identifier without modifying coordinates, whereas `ST_Transform` performs coordinate transformation. citeturn748994search43

Code review SHOULD treat incorrect use of `ST_SetSRID` as a data-integrity defect.

Transformation pipelines MUST NOT rely on undocumented numeric SRIDs copied from external systems.

Where a source provides its own CRS metadata, ingestion SHOULD validate that metadata against the expected dataset contract.

---

## 2.3 EPSG:4326, CRS84, and coordinate ordering

Longitude and latitude ordering MUST be explicit in every external API contract accepting coordinate arrays or scalar coordinate fields.

GeoJSON conforming to RFC 7946 uses WGS 84 geographic coordinates with longitude first and latitude second and describes the CRS as equivalent to OGC CRS84. RFC 7946 does not support arbitrary alternative CRSs through the former GeoJSON `crs` member. citeturn512594search0turn512594search3

Therefore:

- GeoJSON positions MUST use `[longitude, latitude]`;
- GeoJSON APIs MUST NOT accept `[latitude, longitude]` as an undocumented convenience;
- APIs SHOULD use field names such as `longitude` and `latitude` when arrays are unnecessary;
- documentation MUST NOT ambiguously describe an array as merely `[x, y]` or `[lat/lng]`.

Implementations MUST NOT assume that the formal axis-order definition of a CRS and the serialization order required by a particular interchange format are interchangeable concepts.

Coordinate order MUST be tested.

Test fixtures SHOULD include locations where swapping longitude and latitude produces an obviously different but still numerically valid position.

---

## 2.4 Projection selection

A projection MUST be selected according to the operation being performed.

A single CRS SHOULD NOT be assumed suitable for:

- storage;
- web rendering;
- accurate distance;
- accurate area;
- cadastral work;
- global analysis

simultaneously.

### 2.4.1 Web Mercator

Web Mercator, commonly identified as `EPSG:3857`, MAY be used for conventional slippy-map rendering and tile display.

It MUST NOT be used as the default measurement CRS for accurate:

- area;
- distance;
- perimeter;
- shape comparison

where distortion is material.

Data MUST NOT be permanently transformed into Web Mercator solely because the frontend map renders using it.

### 2.4.2 Local and regional projections

For high-accuracy local or regional measurements, a suitable projected CRS SHOULD be used.

The selected CRS SHOULD minimize distortion across the project's area of interest.

Measurement-sensitive domains such as cadastral, engineering, surveying, utilities, and construction MUST use domain-appropriate CRS requirements rather than generic web-map defaults.

### 2.4.3 Global measurements

For global or cross-zone calculations, PostGIS `geography` MAY be appropriate.

PostGIS distinguishes planar `geometry` calculations from spheroidal `geography` calculations; `geography` can simplify global distance and area operations but generally has a narrower operation set and higher computational cost. citeturn748994search0turn748994search1

Teams SHOULD choose `geometry` versus `geography` intentionally rather than converting between them indiscriminately inside every query.

---

## 2.5 Geometry types

Geometry columns SHOULD use the narrowest geometry type consistent with the domain.

Prefer:

- `Point`;
- `MultiPoint`;
- `LineString`;
- `MultiLineString`;
- `Polygon`;
- `MultiPolygon`.

Generic `Geometry` columns SHOULD NOT be used where the domain permits a stronger type constraint.

`GeometryCollection` SHOULD NOT be used as the default representation for ordinary application entities.

Applications MUST define whether single and multi-geometries are normalized.

For example, an administrative boundary dataset SHOULD generally normalize all records to `MultiPolygon` rather than forcing clients to branch between `Polygon` and `MultiPolygon`.

### 2.5.1 Z and M dimensions

If Z or M dimensions are used, their semantics MUST be documented.

The application MUST define whether Z represents:

- ellipsoidal height;
- orthometric elevation;
- floor level;
- another domain measurement.

An M coordinate MUST have a documented measurement meaning.

Transformations, serializers, and exports MUST NOT silently remove Z or M values when those dimensions are domain-significant.

---

## 2.6 Geometry validity and normalization

Polygonal geometry SHOULD be validated during ingestion.

Invalid geometries MUST NOT be silently repaired without recording that repair where the modification could change domain meaning.

Automated repair MAY be used when:

- the repair operation is defined;
- the original input is retained or traceable where necessary;
- downstream consequences are understood.

The system SHOULD distinguish between:

- syntactically invalid input;
- geometrically invalid input;
- topologically inconsistent data;
- geometrically valid but domain-invalid data.

For example, a valid polygon may still be invalid for a business rule requiring it to remain within a permitted administrative region.

Database constraints SHOULD enforce stable geometry assumptions where practical.

---

## 2.7 Spatial precision

Coordinate precision MUST reflect the accuracy required by the application.

More decimal places MUST NOT be interpreted automatically as more accurate real-world data.

GeoJSON precision SHOULD be reduced to the minimum needed for the use case.

RFC 7946 notes that coordinate precision materially increases payload size and that six decimal places in geographic degrees correspond to approximately decimetre-scale precision. citeturn512594search0

As the corpus default for ordinary web mapping:

- longitude and latitude SHOULD generally be serialized to no more than **6 decimal places**;
- greater precision MUST have a documented requirement;
- lower precision SHOULD be used where metre-level or coarser accuracy is sufficient.

Precision reduction MUST NOT be used as the sole privacy mechanism for sensitive locations.

If precise location is sensitive, access control, aggregation, spatial masking, retention limits, or disclosure policies MUST be applied independently.

---

## 2.8 GeoJSON

GeoJSON SHOULD be used for:

- small feature sets;
- user-edited geometries;
- search results;
- bounded viewport responses;
- API interchange where human-readable JSON is useful.

GeoJSON SHOULD NOT be the default transport for arbitrarily large nationwide or global datasets.

RFC 7946 interoperability rules MUST be respected for public or standards-based GeoJSON APIs. citeturn512594search0

Properties SHOULD contain only fields required by the client.

Large domain objects MUST NOT be duplicated into every feature property when a stable identifier is sufficient.

### 2.8.1 Corpus GeoJSON payload budgets

Unless an approved exception exists:

| Condition | Corpus requirement |
|---|---|
| Initial interactive GeoJSON payload | SHOULD be ≤ 1 MiB compressed |
| Single viewport/query response | SHOULD be ≤ 5 MiB compressed |
| Large single client source | SHOULD NOT exceed 50,000 features |
| Hard review threshold | > 10 MiB compressed or > 100,000 features MUST require documented performance justification |
| Zoom-dependent large dataset | MUST normally use tiling or server-side aggregation |

These are corpus engineering budgets, not limits imposed by RFC 7946.

Feature complexity MUST be considered in addition to feature count.

Ten thousand highly detailed polygons may be more expensive than one hundred thousand simple points.

---

## 2.9 Geometry simplification

Complex geometry SHOULD be simplified for display at scales where full source precision cannot be perceived.

Simplification MUST preserve the analytical or operational meaning required at that zoom level.

The authoritative geometry MUST NOT be destructively replaced by a display-simplified version unless that simplification is itself the intended canonical dataset.

Separate representations MAY be maintained for:

- authoritative geometry;
- low-zoom display geometry;
- vector tiles;
- print output.

Topology-preserving simplification SHOULD be used for adjacent polygons where visible gaps or overlaps would be misleading.

Critical boundaries MUST NOT disappear merely to satisfy a rendering budget.

---

## 2.10 Tile strategy

Large, spatially distributed datasets SHOULD be tiled.

The delivery strategy MUST be selected by use case.

| Use case | Preferred strategy |
|---|---|
| Small, dynamic editable dataset | GeoJSON |
| Large interactive vector dataset | Vector tiles |
| Styled basemap | Vector tiles or raster tiles |
| Satellite/aerial imagery | Raster tiles |
| Server-rendered thematic cartography | Raster tiles MAY be appropriate |
| Large read-only thematic dataset | Vector tiles |
| Standards-based interoperable tile service | OGC API — Tiles / applicable standard |
| Offline multiresolution dataset | Versioned offline tile/package strategy |

OGC API — Tiles defines standardized HTTP building blocks for retrieval of tiled geospatial resources, including vector features, maps, imagery and other tiled data. citeturn512594search5turn512594search12

---

## 2.11 Tile matrix systems

Every tile service MUST define or inherit a known tile matrix scheme.

Client and server MUST agree on:

- CRS;
- zoom or scale levels;
- tile row;
- tile column;
- origin;
- tile extent;
- bounds.

XYZ, TMS, WMTS, and OGC tile matrix conventions MUST NOT be treated as interchangeable without conversion.

An inverted Y-axis error MUST be treated as a protocol defect rather than corrected through undocumented frontend hacks.

Where standards-based interoperability matters, the tile matrix set SHOULD be explicitly described.

OGC's Tile Matrix Set standard defines tile matrices as regular grids at defined scales within a CRS. citeturn512594search8

---

## 2.12 Vector tiles

Vector tiles SHOULD be preferred when:

- feature-level styling is required;
- client-side interaction is required;
- the dataset is too large for direct GeoJSON;
- multiple zoom-dependent representations are required.

Vector-tile features SHOULD include only properties needed for:

- styling;
- labelling;
- interaction;
- stable feature identification.

Sensitive attributes MUST NOT be embedded merely because they are convenient for a tooltip.

Vector-tile layer names and property schemas MUST be versioned as API contracts.

Breaking a tile property or layer name MUST be treated as an API-breaking change.

Features SHOULD be simplified and filtered by zoom.

Low zoom levels MUST NOT carry street-level or building-level detail that cannot be perceived.

A vector-tile service MUST define feature ID stability if the frontend uses feature-state, selection, highlighting, or cross-tile identity.

---

## 2.13 Raster tiles

Raster tiles SHOULD be used when the rendered pixels are the required product, including:

- imagery;
- hillshade;
- server-rendered cartography;
- continuous surfaces where server-side rendering is preferable.

Raster tiles MUST use appropriate image formats.

Lossy compression SHOULD NOT be used when it materially destroys categorical boundaries or analytical meaning.

High-DPI rendering SHOULD be supported when required without simply quadrupling all network costs indiscriminately.

Raster tiles containing sensitive information MUST receive the same authorization treatment as underlying vector data.

---

## 2.14 Tile caching and versioning

Static or immutable tiles SHOULD be aggressively cacheable.

Tile URLs SHOULD contain a version, dataset revision, content hash, or another deterministic invalidation mechanism when long cache lifetimes are used.

Mutable tiles SHOULD provide coherent cache validators such as:

- ETag;
- Last-Modified;
- versioned URL semantics.

Private or tenant-specific tiles MUST NOT be placed in shared public caches unless cache keys and authorization boundaries prevent cross-user disclosure.

CDN configuration MUST be reviewed as part of the security model.

Query-string authentication tokens SHOULD NOT become permanent cache identifiers or analytics leakage vectors.

Tile generation failures MUST NOT be cached indefinitely as successful empty tiles.

---

## 2.15 PostGIS storage patterns

Canonical spatial entities SHOULD use typed PostGIS columns.

A spatial table SHOULD normally contain:

- stable primary key;
- typed geometry/geography;
- documented SRID;
- relevant temporal fields;
- domain attributes;
- provenance fields where required.

Geometry should not be duplicated into latitude and longitude scalar fields unless the scalar fields serve a documented indexing, interoperability, or domain requirement.

If scalar coordinate fields and geometry coexist, one representation MUST be canonical.

Derived representations MUST NOT drift independently.

---

## 2.16 Spatial indexes

Spatial columns used for interactive search or joins MUST be indexed where query volume and table size justify it.

GiST SHOULD be the default PostGIS spatial index for general-purpose geometry and geography workloads.

PostGIS recommends GiST spatial indexes together with index-aware predicates and operators for spatial query acceleration. citeturn748994search3turn748994search7

Example canonical pattern:

`CREATE INDEX ... USING GIST (geom);`

BRIN MAY be used for extremely large, physically correlated datasets where its smaller index size and maintenance characteristics are advantageous.

BRIN MUST NOT be selected solely because a table is large.

PostGIS notes that BRIN performs best where physical row ordering correlates with spatial location and is generally less selective than GiST. citeturn748994search2

Index choice MUST be confirmed through representative query plans.

---

## 2.17 Index-aware predicates

Spatial queries MUST be written so indexes can be used.

Prefer index-aware predicates such as:

- `ST_Intersects`;
- `ST_Contains`;
- `ST_Covers`;
- `ST_Within`;
- `ST_DWithin`;

as appropriate to the required spatial relationship.

Distance filtering SHOULD normally use:

`ST_DWithin(...)`

rather than:

`ST_Distance(...) < radius`

when the former expresses the requirement and permits index-assisted filtering.

Exact distance MAY subsequently be calculated for:

- display;
- ranking;
- secondary filtering.

Nearest-neighbour queries SHOULD use appropriate index-supported KNN operators where suitable.

PostGIS documents index-aware spatial predicates and nearest-neighbour operators for these query patterns. citeturn748994search7

---

## 2.18 Transformations in database queries

Repeatedly transforming the indexed geometry column inside high-volume predicates SHOULD be avoided.

Prefer:

1. storing data in an appropriate canonical CRS;
2. transforming the query geometry into the storage CRS;
3. using a deliberate functional index where a commonly transformed representation must be queried repeatedly.

If a function is applied to an indexed geometry, teams MUST confirm that the resulting query still uses an intended index.

PostGIS documents functional indexes as useful for commonly transformed geometries. citeturn748994search43

An `EXPLAIN` or `EXPLAIN ANALYZE` review SHOULD be performed for material spatial-query paths.

---

## 2.19 Bounding boxes

Viewport APIs SHOULD query by bounding box or another spatial window rather than retrieving an entire dataset.

Bounding-box contracts MUST specify:

- CRS;
- coordinate order;
- antimeridian behaviour;
- whether edges are inclusive;
- maximum allowed extent.

A global bounding box MUST NOT accidentally bypass ordinary result limits.

The server SHOULD enforce maximum spatial-query areas where unrestricted extents could create pathological workloads.

A viewport query MUST still enforce record and payload limits.

---

## 2.20 Antimeridian and poles

Global or near-global applications MUST explicitly handle geometries crossing the antimeridian.

A longitude wrap from `+180` to `-180` MUST NOT be interpreted automatically as a line spanning most of the globe.

Applications operating near the poles MUST validate whether the display and analytical projection remains appropriate.

Tests SHOULD include:

- antimeridian crossing;
- world wrap;
- polar latitudes;
- bounding boxes that cross the dateline.

Client map rendering behaviour MUST NOT substitute for correct server geometry semantics.

---

## 2.21 Spatial API contracts

Spatial APIs MUST define geometry semantics as rigorously as ordinary typed fields.

An API accepting or returning geometry MUST document:

- representation;
- CRS;
- coordinate order;
- precision;
- permitted geometry types;
- empty geometry behaviour;
- null behaviour;
- dimensionality;
- validation rules.

Spatial filters SHOULD use explicit structures rather than overloaded strings.

Examples include:

- `bbox`;
- `radius`;
- `intersects`;
- `within`;
- `near`;
- `geometry`.

Untrusted client geometries MUST be validated before expensive spatial operations.

APIs SHOULD enforce:

- geometry size limits;
- coordinate-count limits;
- valid ranges;
- permitted geometry types;
- maximum query extent.

A client MUST NOT be able to submit an arbitrarily complex polygon that causes unbounded CPU consumption.

---

## 2.22 Location security and privacy

Precise location MUST be treated as potentially sensitive data.

Authorization MUST apply independently to:

- map rendering;
- feature APIs;
- tile APIs;
- search;
- popovers;
- drill-down;
- exports;
- offline packages.

A feature hidden by frontend styling MUST NOT be considered protected.

Restricted features MUST NOT be transmitted to unauthorized clients.

Sensitive coordinates MUST NOT leak through:

- tile properties;
- HTML source;
- logs;
- error messages;
- URL query parameters;
- telemetry;
- exports;
- browser caches;
- service-worker caches;
- offline packages.

Location precision SHOULD be reduced when the use case does not require exact coordinates.

Precision reduction MUST NOT be represented as anonymization where re-identification remains feasible.

Tenant-specific tile caches MUST preserve tenancy boundaries.

---

## 2.23 Map viewport state

The map viewport SHOULD have one canonical state owner.

Viewport state MAY contain:

- longitude;
- latitude;
- zoom;
- bearing;
- pitch.

Applications SHOULD distinguish between:

- user-controlled viewport;
- programmatic navigation;
- selected-feature state;
- filter state;
- server data state.

High-frequency map movement MUST NOT continuously write expensive global state if only the final settled viewport is required.

Data requests SHOULD normally be triggered on an appropriate settled or debounced viewport state rather than every animation frame.

Shareable map state MAY be serialized into the URL.

Sensitive locations MUST NOT be serialized into shareable URLs without a documented need.

---

## 2.24 Map state and browser navigation

User-meaningful analytical state SHOULD be URL-addressable where practical.

This MAY include:

- map extent;
- selected layer;
- filter state;
- selected feature;
- date or time range.

Ephemeral states SHOULD remain local, such as:

- current pointer hover;
- transient popup position;
- animation frame;
- drag state.

Browser back and forward navigation SHOULD restore intentional navigation states rather than every intermediate pan event.

Viewport URL updates SHOULD therefore use an appropriate replace-versus-push strategy.

---

## 2.25 Client map rendering

Interactive maps SHOULD use a rendering architecture appropriate to feature count and interaction complexity.

DOM markers MAY be used for small numbers of highly interactive markers.

Large point datasets SHOULD NOT render one DOM element per feature.

For large datasets, prefer:

- WebGL-backed layers;
- vector tiles;
- clustering;
- server aggregation;
- canvas/WebGL overlays.

The map engine SHOULD be isolated behind application-level abstractions for:

- viewport state;
- layer configuration;
- selection;
- event translation;
- feature metadata.

Domain code SHOULD NOT be unnecessarily coupled to mapping-engine-specific event objects.

---

## 2.26 Client performance budgets

Interactive map operations SHOULD maintain responsiveness under representative production data.

Performance testing MUST include:

- initial map load;
- first meaningful map render;
- pan;
- zoom;
- layer toggle;
- feature selection;
- filtering;
- temporal playback where applicable.

Long-running synchronous geometry work SHOULD NOT block the main UI thread.

Appropriate computation SHOULD move to:

- backend processing;
- workers;
- preprocessing;
- vector-tile generation.

Client applications MUST NOT repeatedly deserialize identical large GeoJSON responses.

Map instances SHOULD NOT be destroyed and recreated for ordinary state changes.

Sources and layers SHOULD be updated incrementally where the mapping engine supports it.

---

## 2.27 Clustering

Dense point datasets SHOULD use clustering or another density representation when individual points cannot be meaningfully distinguished.

Clustering MUST be considered an interaction and aggregation technique, not merely a rendering optimisation.

Cluster behaviour MUST define:

- clustering radius;
- maximum cluster zoom;
- aggregate count;
- expansion behaviour.

Cluster counts MUST reflect the actual filtered dataset represented by the map.

Clusters MUST NOT combine features the user is unauthorized to know exist.

Selecting a cluster SHOULD normally:

- zoom or expand it;
- reveal an aggregate summary;
- or display a contained-feature list

depending on the analytical intent.

Clusters MUST remain distinguishable without depending solely on colour.

At sufficiently high zoom, individual features SHOULD become accessible unless aggregation remains intentional.

---

## 2.28 Heatmaps and density surfaces

Heatmaps MUST NOT be used when users need exact point values.

A heatmap legend MUST identify what colour intensity means.

The rendering parameters MUST be stable enough that comparison is meaningful.

Kernel radius, weighting, and normalization SHOULD be documented for analytical products.

Changing the viewport MUST NOT silently renormalize the heatmap in a way that makes two extents appear directly comparable when they are not.

Heatmap colour scales MUST comply with Accessibility and Design Token requirements.

---

## 2.29 Layer management

Every operational map layer SHOULD have a stable layer identifier.

A layer registry SHOULD define:

- ID;
- display name;
- data source;
- geometry type;
- style;
- z-order;
- minimum zoom;
- maximum zoom;
- visibility;
- opacity;
- interaction capability;
- attribution;
- access requirements;
- legend semantics;
- temporal semantics where applicable.

Layer ordering MUST be intentional.

Labels and interactive data MUST NOT disappear behind visually dominant but less important layers accidentally.

Basemap layers SHOULD be architecturally separate from operational application layers.

A layer's rendering order MUST NOT determine its authorization.

---

## 2.30 Layer controls

Layer controls MUST use canonical application components rather than map-engine-specific ad hoc HTML where practical.

shadcn/ui SHOULD be the baseline for surrounding controls.

Preferred mappings include:

| Concern | shadcn/ui baseline |
|---|---|
| Layer visibility | `Checkbox`, `Switch` |
| Mutually exclusive basemap | `RadioGroup`, `Select` |
| Opacity | `Slider` |
| Layer picker | `Popover`, `DropdownMenu`, `Sheet` |
| Search | `Command` or canonical search pattern |
| Feature details | `Card`, `Sheet`, `Drawer` |
| Filters | Standard Forms components |
| Error | `Alert` |
| Loading | `Skeleton` / canonical progress pattern |
| Actions | `Button`, `DropdownMenu` |
| Date range | canonical date controls |
| Legend panel | `Card`, `Popover`, `Sheet` as context requires |

Controls MUST remain operable outside the map rendering canvas.

---

## 2.31 Legends

A thematic map MUST provide a legend when visual encodings are not self-evident.

Legends MUST match the currently visible style.

A legend MUST update when:

- layer visibility changes;
- classification changes;
- filter state materially changes the encoded domain;
- temporal styling changes meaning.

Legends MUST identify units where relevant.

Categorical legends MUST preserve semantic colours.

Sequential legends MUST show direction and relevant values.

Diverging legends MUST show the meaningful midpoint.

A legend MUST NOT depend solely on colour where the map itself uses additional patterns, symbols, or line styles.

---

## 2.32 Labels and symbols

Text labels MUST maintain sufficient readability over the basemap.

Halo, contrast, or background treatment SHOULD be used when required.

Critical labels MUST NOT depend on extremely low-opacity styling.

Collision detection MAY hide lower-priority labels.

Collision avoidance MUST NOT hide essential selected-feature information without another route to that information.

Symbol shape SHOULD reinforce meaning when colour distinctions alone are insufficient.

Map icons MUST follow the Component and Design Token standards.

---

## 2.33 Basemaps

A basemap SHOULD provide context without competing with operational data.

Data-heavy interfaces SHOULD prefer visually restrained basemaps.

Basemap selection MUST account for:

- attribution;
- licensing;
- offline rights;
- cache rights;
- geographic coverage;
- language;
- accessibility;
- theme compatibility.

A light/dark application theme MUST NOT mechanically invert map tiles.

Dark basemaps MUST be purpose-designed or appropriately styled.

Basemap availability MUST NOT determine whether critical operational data can be understood.

---

## 2.34 Attribution

Required map and dataset attribution MUST remain visible or otherwise accessible according to provider and licence requirements.

Attribution MUST NOT be removed merely to simplify layout.

Exports MUST preserve required attribution.

Offline packages MUST preserve licence and attribution metadata where required.

The system SHOULD distinguish:

- basemap attribution;
- operational dataset attribution;
- derived-data attribution.

---

## 2.35 Offline maps

Offline functionality MUST be designed explicitly.

A web cache that happens to retain previous tiles MUST NOT be described as reliable offline support.

Offline map implementations MUST define:

- downloadable region;
- zoom range;
- layer set;
- expected package size;
- version;
- expiry;
- update behaviour;
- storage quota behaviour;
- licence restrictions;
- deletion behaviour.

The user SHOULD be informed of expected download size before large offline downloads begin.

Download progress SHOULD be resumable where practical.

Partial offline packages MUST NOT be presented as complete.

---

## 2.36 Offline package formats

Offline packages SHOULD use a format appropriate to the client platform and interoperability requirements.

GeoPackage MAY be used where a standards-based SQLite geospatial container is appropriate.

The OGC GeoPackage standard supports vector features, tile matrix content and non-spatial attributes in a portable SQLite container and is explicitly designed for environments including mobile and limited-connectivity use. citeturn512594search9

Custom tile archives MUST have:

- documented format;
- versioning;
- manifest;
- checksums or equivalent integrity controls where required.

A proprietary offline format MUST NOT be chosen merely to avoid defining data lifecycle semantics.

---

## 2.37 Offline security

Offline availability creates a local copy of data and MUST be covered by the threat model.

Sensitive offline data SHOULD use platform-appropriate encrypted storage.

Authentication expiry MUST define what happens to previously downloaded restricted data.

Logout or access revocation SHOULD remove sensitive offline data where the security model requires it.

Offline packages MUST NOT include more geographic extent or attribute detail than the offline workflow requires.

Offline access MUST NOT bypass row-level or tenant-level authorization.

---

## 2.38 Offline synchronization

Offline edits MUST use explicit synchronization semantics.

The system MUST define:

- stable feature identifiers;
- local mutation identifiers;
- conflict rules;
- retry behaviour;
- deletion semantics;
- server version or revision where required.

Position updates MUST NOT be blindly replayed if they depend on stale entity state.

Conflicts SHOULD be resolved using domain rules rather than generic last-write-wins unless last-write-wins is explicitly valid.

Sync state SHOULD be visible to users performing operational field work.

---

## 2.39 Time-aware geospatial data

Geospatial datasets with temporal meaning MUST distinguish the type of time being represented.

Relevant fields MAY include:

- `observed_at`;
- `occurred_at`;
- `valid_from`;
- `valid_to`;
- `recorded_at`;
- `created_at`;
- `updated_at`.

These concepts MUST NOT be collapsed into a generic `timestamp` field.

### 2.39.1 Valid time

Features whose geometry or attributes change over time SHOULD use explicit validity intervals.

Validity intervals SHOULD normally follow a consistent half-open interval convention:

`[valid_from, valid_to)`

where compatible with the domain.

The convention MUST be documented.

Current records SHOULD NOT depend on arbitrary sentinel dates such as `9999-12-31` when nullable or range semantics provide a clearer model.

### 2.39.2 Observation time

Sensor or event data MUST distinguish observation time from ingestion time where latency matters.

Late-arriving events MUST retain their actual observation time.

The system MUST NOT rewrite an event's domain timestamp to ingestion time merely because it arrived late.

### 2.39.3 System time

Where audit or historical reconstruction is required, system-recorded history MAY be stored separately from domain validity.

Bitemporal requirements MUST be designed explicitly rather than approximated through `updated_at`.

---

## 2.40 Spatiotemporal querying

Large spatiotemporal datasets SHOULD filter spatial and temporal extents as early as practical.

Queries SHOULD include bounded:

- geographic extent;
- time range

when the workflow permits it.

Temporal indexes and partitioning SHOULD be considered independently from spatial indexes.

A spatial index alone MUST NOT be assumed sufficient for a dataset containing billions of time-series positions.

Large append-heavy event tables SHOULD consider time partitioning where query patterns align with it.

Composite or multicolumn indexing strategies MUST be validated through actual query plans.

---

## 2.41 Temporal map playback

Animated temporal maps MUST expose:

- active timestamp or interval;
- playback state;
- speed where adjustable;
- start/end range.

Animation MUST NOT be the only mechanism for inspecting historical states.

Users SHOULD be able to pause and scrub through time.

Temporal playback MUST respect `prefers-reduced-motion`.

The frontend SHOULD prefetch a bounded adjacent time window where doing so materially improves playback.

The client MUST NOT preload an unbounded temporal dataset merely to provide smooth animation.

Changing playback speed MUST NOT change underlying data semantics.

---

## 2.42 Moving objects

A moving asset's displayed position MUST identify the relevant timestamp where freshness matters.

Interpolation MAY be used between measured positions if:

- the interpolation method is appropriate;
- users are not misled into believing interpolated locations are observations.

Extrapolated positions MUST be visually or textually distinguished from observed positions when material.

A live asset marker MUST NOT imply current location when its latest observation is stale.

Operational applications SHOULD display position age or freshness state.

---

## 2.43 Real-time geospatial updates

Real-time map updates MUST preserve user inspection state.

Incoming updates SHOULD NOT:

- force the camera to recenter;
- close a selected feature;
- reset layer state;
- interrupt manual exploration

unless the workflow explicitly requires tracking mode.

Tracking mode MUST be an explicit state.

High-frequency coordinates SHOULD be coalesced to a useful rendering cadence.

The client SHOULD NOT render every telemetry observation when the screen refresh rate and map scale make those updates imperceptible.

Connection status MUST NOT be treated as proof that a feature location is current.

---

## 2.44 Geocoding and search results

Geocoding results MUST be treated as candidate locations unless the domain provides stronger guarantees.

A search UI SHOULD expose sufficient context to disambiguate duplicate place names.

Relevant context MAY include:

- locality;
- region;
- country;
- postcode;
- feature type.

A geocoding result MUST NOT automatically overwrite authoritative domain coordinates without explicit workflow semantics.

Search inputs MUST follow the Forms & Validation standard.

Geocoding provider licence and retention rules MUST be respected.

---

## 2.45 Coordinate entry

Manual coordinate entry MUST state:

- expected order;
- format;
- allowed range;
- CRS where not the application default.

Latitude MUST be validated within `-90…90` degrees for geographic latitude.

Longitude MUST be validated according to the API's documented normalization policy.

A form MUST NOT silently swap latitude and longitude because the submitted values appear reversed.

If multiple formats are supported, such as:

- decimal degrees;
- degrees/minutes/seconds;

the active format MUST be explicit.

---

## 2.46 Map accessibility

A map MUST NOT be the only mechanism for accessing critical information or completing a required task when a nonvisual alternative is feasible.

Complex spatial relationships cannot always be translated directly into equivalent text, but the underlying entities and actionable information MUST remain accessible.

### 2.46.1 Accessible name

Every meaningful interactive map MUST have an accessible name or surrounding labelled region.

The label SHOULD explain the map's purpose rather than merely saying “Map”.

### 2.46.2 Keyboard controls

Required map operations MUST be keyboard accessible.

Users MUST be able to access necessary:

- zoom controls;
- feature selections;
- layer controls;
- filters;
- details.

Pointer-only drag gestures MUST NOT be the sole route to critical functionality.

Keyboard focus MUST remain visible.

The map MUST NOT trap keyboard focus.

### 2.46.3 Accessible feature alternatives

Interactive map features required for a workflow SHOULD also be represented through an accessible:

- list;
- table;
- search result;
- details panel

where practical.

A screen-reader user MUST NOT be expected to navigate thousands of raw canvas or SVG geometries.

### 2.46.4 Non-colour encoding

Map meaning MUST NOT depend solely on colour.

Use additional encoding such as:

- pattern;
- icon;
- line style;
- symbol shape;
- text;
- boundary style.

Positive/negative or status differences MUST NOT rely only on red and green.

### 2.46.5 Contrast

Operational geometry, controls and focus indicators MUST meet applicable Accessibility contrast requirements.

A basemap SHOULD be reduced in visual prominence when necessary to maintain sufficient contrast for application overlays.

### 2.46.6 Zoom and text

Browser zoom and text enlargement MUST NOT make essential map controls unusable.

Labels located inside the rendered map MAY have engine-specific scaling limits, but equivalent textual information MUST remain accessible through application UI.

### 2.46.7 Motion

Animated pans, zooms, pulsing markers and temporal playback MUST respect reduced-motion preferences.

Critical status MUST NOT depend on pulsing or animation.

---

## 2.47 Popup and feature-details accessibility

Map popups SHOULD NOT become the only container for substantial feature details.

For simple information, an accessible popup MAY be appropriate.

For complex details, use canonical UI such as:

- `Card`;
- `Sheet`;
- `Drawer`;
- dedicated details panel.

Interactive popups MUST have predictable focus behaviour.

Opening a popup MUST NOT unexpectedly move keyboard focus unless the interaction requires it.

Closing a focused detail surface SHOULD return focus to an appropriate initiating control or feature representation.

---

## 2.48 Responsive map layout

Maps MUST have explicit responsive behaviour.

Controls MUST NOT overlap until they become unusable.

On constrained screens:

- secondary controls SHOULD collapse into `Sheet`, `Drawer`, or menus;
- feature details SHOULD use available application surfaces rather than tiny map popups;
- touch targets MUST remain usable.

The map MUST NOT become the sole full-screen interface if users lose access to important filters, results, or navigation.

A list/map switcher MAY be used where both representations cannot fit simultaneously.

---

## 2.49 Print maps

Printed maps MUST be generated intentionally.

A browser screenshot MUST NOT automatically be considered a valid cartographic export.

Print output SHOULD include, where relevant:

- title;
- map extent;
- legend;
- scale;
- attribution;
- data timestamp;
- reporting period;
- source information.

A north arrow SHOULD be included where orientation is not obvious, particularly for rotated maps.

A scale bar MUST reflect the exported map scale and projection.

Print rendering SHOULD use sufficient resolution for the physical output size.

Text MUST remain readable at the target print dimensions.

---

## 2.50 Image and PDF export

Image and PDF export MUST preserve essential map context.

Export SHOULD include:

- visible operational layers;
- relevant legend;
- attribution;
- temporal context;
- selected extent.

UI-only controls SHOULD NOT appear unless they are intentionally part of the report.

Export resolution SHOULD be independent of the user's low-resolution screen when higher-quality output is required.

Rasterization SHOULD NOT unnecessarily destroy vector quality for lines, polygons, text, or symbols when the export pipeline can preserve them.

---

## 2.51 Geospatial data export

Data export MUST follow authorization independently from map visibility.

A user MUST NOT be able to retrieve unauthorized geometry by:

- modifying viewport parameters;
- requesting hidden layers;
- calling tile endpoints directly;
- altering export parameters.

Export formats MUST clearly identify CRS where the format supports multiple CRSs.

RFC 7946 GeoJSON export MUST use its defined WGS 84/CRS84 coordinate semantics. citeturn512594search3

GeoPackage SHOULD be considered for:

- multi-layer geospatial transfer;
- offline use;
- spatially rich datasets requiring a self-contained database format.

Large exports SHOULD be generated server-side.

---

## 2.52 File and media metadata

Files containing geospatial metadata MUST be handled according to Security and File & Media standards.

Uploaded media MAY contain embedded location metadata.

Applications MUST NOT expose embedded geolocation unintentionally.

Where metadata stripping is required for privacy, the processing rule MUST be explicit.

If geolocation metadata is domain-significant, stripping MUST NOT occur silently.

Generated map files SHOULD carry only the metadata required by the product and export contract.

---

## 2.53 Loading states

Map loading MUST distinguish between:

- map-engine initialization;
- basemap loading;
- operational-data loading;
- layer failure;
- background refresh.

A basemap failure MUST NOT necessarily hide successfully loaded operational data.

An operational-layer failure MUST identify the affected layer where practical.

Existing usable map data SHOULD remain visible during background refresh.

A full-screen spinner SHOULD NOT replace a usable map merely because one secondary layer is loading.

Use canonical shadcn/ui `Skeleton`, `Alert`, `Progress`, or loading patterns outside the map canvas where appropriate.

---

## 2.54 Empty and error states

A map MUST distinguish:

- no features in the dataset;
- no features in the current viewport;
- no results matching filters;
- layer unavailable;
- authorization failure;
- offline unavailable;
- stale cached data.

“No markers visible” MUST NOT automatically be presented as “No data”.

Where results exist outside the current viewport, the UI MAY provide a suitable “zoom to results” or “fit results” action.

Permission failures MUST NOT masquerade as empty datasets.

---

## 2.55 Map fit and automatic camera changes

Automatic fit-to-data SHOULD be used deliberately.

The map SHOULD NOT continuously refit every time background data changes.

Selecting one feature MAY center or reveal it where helpful.

Filter changes MAY fit results if that behaviour is consistent and expected.

User-driven map position SHOULD generally take precedence after manual interaction.

Applications MUST guard against invalid bounds, including empty datasets and malformed coordinates.

---

## 2.56 Selection and highlighting

Selected geometry MUST remain distinguishable independently of colour alone.

Selection SHOULD use an additional visual property such as:

- outline width;
- halo;
- symbol size;
- pattern;
- icon state.

Selection state MUST be distinguishable from:

- hover;
- search result;
- warning;
- disabled state.

Feature selection SHOULD use stable feature identifiers rather than array indexes or tile-local ordering.

---

## 2.57 Design tokens

Map application UI MUST use shared Design Tokens.

Operational map styles SHOULD consume semantic token concepts where the mapping stack permits it.

Tokens SHOULD distinguish purpose from literal colour names.

Prefer concepts such as:

- `map-feature-selected`;
- `map-feature-muted`;
- `map-boundary-critical`;
- `map-status-warning`;

rather than tightly coupling semantics to `blue`, `red`, or `green`.

Map-specific palettes MUST remain coordinated with the broader product palette.

Dark-mode maps MUST be validated independently for:

- label contrast;
- line contrast;
- feature differentiation;
- popup readability.

---

## 2.58 Testing

Geospatial tests MUST include spatial edge cases rather than only nominal coordinates.

Automated and integration tests SHOULD cover:

- correct SRID;
- coordinate order;
- transformation;
- invalid geometry;
- empty geometry;
- null geometry;
- dateline crossing;
- polar regions where relevant;
- point-on-boundary behaviour;
- containment;
- distance threshold boundaries;
- tile addressing;
- viewport filtering;
- authorization;
- offline state;
- temporal filtering.

Performance tests MUST use representative:

- feature counts;
- polygon complexity;
- tile density;
- database sizes.

Accessibility testing MUST include keyboard-only operation and an accessible alternative to visual feature inspection.

---

## 2.59 Observability

Geospatial infrastructure SHOULD expose metrics appropriate to its workload.

Useful measures MAY include:

- spatial-query latency;
- tile-generation latency;
- tile cache hit ratio;
- tile errors;
- geocoding latency;
- GeoJSON payload size;
- rendered feature count;
- offline-package failure rate.

Telemetry MUST NOT unnecessarily log precise user or asset locations.

Spatial query logs SHOULD identify query shape or class without exposing sensitive coordinates where those coordinates are not operationally necessary.

---

# 3. Anti-patterns

The following are non-conforming unless a documented domain requirement provides a stronger justification.

## 3.1 CRS and coordinates

- Treating all longitude/latitude-looking coordinates as EPSG:4326.
- Calling `ST_SetSRID` to “convert” geometry.
- Persisting unknown SRID values in canonical geometry columns.
- Omitting coordinate order from API documentation.
- Mixing `[lat, lon]` and `[lon, lat]` between endpoints.
- Using Web Mercator for authoritative area calculations.
- Copying an EPSG code from an unrelated dataset without validation.
- Assuming axis order conventions are identical across every standard and serializer.

## 3.2 Geometry

- Storing every spatial value as generic `Geometry`.
- Mixing points, lines and polygons in one domain column without a requirement.
- Silently discarding Z/M values.
- Silently repairing geometries during ingestion.
- Treating an invalid polygon as merely a frontend rendering issue.

## 3.3 GeoJSON

- Shipping nationwide raw GeoJSON to the browser for a viewport map.
- Serializing unused database columns into every feature property.
- Returning 15-decimal-place coordinates without a precision requirement.
- Treating a huge compressed GeoJSON response as acceptable because download time appears tolerable.
- Embedding sensitive fields inside client-delivered features that are never displayed.

## 3.4 Tiles

- Generating identical high-detail geometry at every zoom.
- Treating XYZ and TMS Y coordinates as interchangeable.
- Embedding authorization-sensitive attributes in public vector tiles.
- Using mutable tile URLs with effectively permanent caching.
- Returning blank tiles for server errors and caching them as successful responses.
- Using raster tiles when feature-level interaction is required without another data source.

## 3.5 PostGIS

- Creating a B-tree index on geometry and expecting spatial-query acceleration.
- Using `ST_Distance(...) < radius` for every proximity filter without considering `ST_DWithin`.
- Wrapping indexed geometry in transformations without checking the query plan.
- Running global unbounded spatial joins synchronously from user-facing requests.
- Selecting BRIN merely because the table is large.
- Assuming an index exists because the query uses a spatial function.

## 3.6 Client rendering

- Rendering tens of thousands of DOM markers.
- Recreating the map instance on every React render.
- Parsing the same multi-megabyte GeoJSON repeatedly.
- Updating application state on every pointer or camera animation frame without need.
- Displaying every dense point individually when clustering or aggregation is required.

## 3.7 Layers

- Using visual z-order as an authorization mechanism.
- Reassigning category colours between layer reloads.
- Providing no legend for a thematic layer.
- Allowing map SDK controls to create a second, inconsistent component system.
- Mixing basemap and operational-layer semantics.

## 3.8 Offline

- Calling normal browser caching “offline maps”.
- Downloading an unlimited region for offline use.
- Storing sensitive offline maps unencrypted despite the application's threat model.
- Ignoring provider licence restrictions on tile caching.
- Providing no expiry or version semantics.
- Keeping revoked restricted data indefinitely after logout.

## 3.9 Time-aware maps

- Using one generic timestamp for observation, ingestion, and validity.
- Treating stale asset positions as live.
- Recentring the map for every incoming telemetry point.
- Animating every raw event regardless of display cadence.
- Rewriting late observations to ingestion time.
- Loading an entire multi-year trajectory into the browser for a short playback window.

## 3.10 Accessibility

- Requiring users to drag the map to complete a task.
- Making visual markers the only representation of search results.
- Using colour as the only distinction between feature states.
- Making hundreds of markers independent tab stops.
- Trapping keyboard focus inside the map.
- Using inaccessible map-engine popups instead of application components for complex content.
- Ignoring reduced-motion preferences for fly-to animations.

## 3.11 Security

- Hiding sensitive locations only through CSS or layer visibility.
- Serving tenant-specific tiles from a cache that is not tenant-aware.
- Logging precise sensitive coordinates unnecessarily.
- Assuming reduced decimal precision provides strong anonymity.
- Including hidden sensitive attributes in vector tiles or offline packages.
- Authorizing the visible map but not the export endpoint.

## 3.12 Print and export

- Treating a viewport screenshot as the only print strategy.
- Omitting attribution from exported maps where attribution is required.
- Exporting GeoJSON in an undocumented local projected CRS.
- Providing a scale bar that does not correspond to the exported map.
- Allowing map-data export to bypass row-level authorization.

---

# 4. Checklist

## 4.1 CRS and projection

- [ ] Every canonical geometry has a known CRS.
- [ ] SRID is constrained where practical.
- [ ] EPSG identifiers accurately describe stored coordinates.
- [ ] `ST_SetSRID` is never being used as reprojection.
- [ ] Coordinate order is explicit in API contracts.
- [ ] GeoJSON uses longitude, latitude ordering.
- [ ] Measurement CRS is appropriate to the operation.
- [ ] Web Mercator is not being used blindly for area or distance.
- [ ] Dateline/polar requirements have been assessed.

## 4.2 Geometry

- [ ] Geometry columns use the narrowest appropriate type.
- [ ] Polygon validity is checked where required.
- [ ] Single/multi normalization is defined.
- [ ] Z/M semantics are documented if present.
- [ ] Repairs are explicit and auditable where necessary.
- [ ] Domain-level spatial validity rules are distinct from geometric validity.

## 4.3 GeoJSON and precision

- [ ] GeoJSON follows RFC 7946 where required.
- [ ] Coordinate precision is no greater than necessary.
- [ ] Unused properties are removed.
- [ ] Initial and viewport payloads meet corpus budgets.
- [ ] Large datasets use tiles or server aggregation.
- [ ] Feature complexity as well as count has been evaluated.

## 4.4 Tiles

- [ ] Raster versus vector strategy is intentional.
- [ ] Tile matrix convention is documented.
- [ ] Zoom-dependent simplification is applied.
- [ ] Vector-tile schemas are versioned.
- [ ] Feature IDs are stable where client feature state requires them.
- [ ] Cache invalidation is deterministic.
- [ ] Private tiles cannot leak through shared caches.
- [ ] Required attribution is preserved.

## 4.5 PostGIS

- [ ] Spatial-query columns have appropriate indexes.
- [ ] GiST is used by default unless another strategy is justified.
- [ ] BRIN is used only for appropriate physically correlated datasets.
- [ ] Spatial predicates are index-aware.
- [ ] Radius filtering uses an appropriate indexed pattern.
- [ ] Transformations do not accidentally defeat indexes.
- [ ] Representative `EXPLAIN ANALYZE` plans have been reviewed.
- [ ] Large spatial operations are bounded.

## 4.6 API and validation

- [ ] Spatial API contracts document CRS and coordinate order.
- [ ] Geometry types are validated.
- [ ] Coordinate ranges are validated.
- [ ] Geometry complexity is bounded.
- [ ] Bbox extent is bounded.
- [ ] Untrusted geometry cannot trigger unbounded work.
- [ ] Error semantics follow the canonical API standard.

## 4.7 Client performance

- [ ] Large datasets do not use one DOM node per feature.
- [ ] Map lifecycle is stable across UI state changes.
- [ ] Viewport requests are appropriately debounced.
- [ ] Expensive geometry processing is not blocking the main thread.
- [ ] Dense point data uses clustering, aggregation, or an equivalent strategy.
- [ ] Production-scale pan/zoom/filter interactions have been tested.

## 4.8 Layers and legends

- [ ] Layers have stable IDs.
- [ ] Layer ordering is intentional.
- [ ] Basemap and operational layers are conceptually separate.
- [ ] Thematic layers have appropriate legends.
- [ ] Legend semantics update with relevant style/filter changes.
- [ ] Map controls use canonical shadcn/ui components where practical.
- [ ] Colour meanings remain consistent across the product.

## 4.9 State management

- [ ] Viewport state has one canonical owner.
- [ ] Server data is not duplicated into local map state unnecessarily.
- [ ] Shareable state is URL-addressable where appropriate.
- [ ] Ephemeral pointer state remains local.
- [ ] Browser history is not polluted by every pan frame.
- [ ] Sensitive coordinates are not exposed through URLs without justification.

## 4.10 Offline

- [ ] Offline functionality is explicit rather than accidental caching.
- [ ] Download extent and zoom ranges are bounded.
- [ ] Package size is communicated where material.
- [ ] Offline data has version and expiry semantics.
- [ ] Licensing permits offline storage.
- [ ] Sensitive offline data follows the security model.
- [ ] Revocation/logout behaviour is defined.
- [ ] Synchronization conflict semantics are documented.

## 4.11 Time-aware data

- [ ] Observation time and ingestion time are distinguished where required.
- [ ] Validity periods use defined interval semantics.
- [ ] Temporal indexes or partitioning support expected workloads.
- [ ] Spatiotemporal queries bound both space and time where practical.
- [ ] Stale positions are visibly distinguishable from current positions.
- [ ] Temporal playback has pause and inspection controls.
- [ ] Reduced-motion preferences are respected.

## 4.12 Accessibility

- [ ] The map has a meaningful accessible name.
- [ ] Critical tasks have a nonvisual alternative.
- [ ] Required controls are keyboard operable.
- [ ] Focus is visible and not trapped.
- [ ] Map features required for workflow are accessible through a list/table/details representation where appropriate.
- [ ] Colour is not the only encoding.
- [ ] Map overlays maintain sufficient contrast.
- [ ] Motion respects user preferences.
- [ ] Complex feature details use accessible application components.

## 4.13 Security

- [ ] Authorization is enforced at feature, tile and export endpoints.
- [ ] Restricted geometry is never merely hidden client-side.
- [ ] Tenant-specific caches are isolated.
- [ ] Logs avoid unnecessary precise-location data.
- [ ] Offline packages do not contain unauthorized details.
- [ ] Reduced coordinate precision is not treated as sufficient anonymization.
- [ ] Embedded geolocation metadata follows File & Media policy.

## 4.14 Print and export

- [ ] Printed output has intentional layout.
- [ ] Legend, attribution and time context are included where required.
- [ ] Scale information is correct.
- [ ] Export resolution matches intended use.
- [ ] Machine-readable spatial exports identify CRS correctly.
- [ ] GeoJSON export conforms to RFC 7946.
- [ ] Export authorization is enforced independently.
- [ ] Large exports run through appropriate server-side workflows.

## 4.15 Corpus alignment

- [ ] Security applies to APIs, tiles, caches, offline content and export.
- [ ] Database standards apply to geometry constraints, indexes and migrations.
- [ ] API standards govern spatial query contracts and errors.
- [ ] State Management governs viewport, selection and shareable map state.
- [ ] Forms & Validation governs coordinates, spatial filters and layer controls.
- [ ] Accessibility governs the complete map workflow, not only controls.
- [ ] Design Tokens govern surrounding UI and semantic map styling.
- [ ] shadcn/ui is the baseline for non-map-engine application components.
- [ ] File & Media standards govern map packages and exported files.
- [ ] Performance standards apply to database, transport, tile and client rendering together.

---

# 5. Canonical summary

A Gold Standard 2026 geospatial implementation MUST treat coordinate reference systems as part of the data model.

EPSG identifiers MUST be accurate. Coordinate order MUST be explicit. `ST_SetSRID` MUST NOT be confused with reprojection, and transformations MUST be intentional.

GeoJSON MUST remain bounded, appropriately precise, and standards-compliant. Large or zoom-dependent datasets SHOULD use vector or raster tiling rather than unbounded client GeoJSON.

PostGIS geometry columns SHOULD be strongly typed and indexed. Spatial queries MUST use index-aware patterns, and important query plans MUST be verified against production-scale data.

Projection selection MUST follow the operation. Web-map projection, authoritative storage CRS, and measurement CRS MUST NOT be assumed to be the same.

Dense client maps MUST use appropriate tiling, clustering, aggregation, simplification, or GPU-backed rendering strategies. The browser MUST NOT become the default spatial database.

Layers MUST have defined identity, order, visibility, access requirements and legend semantics. shadcn/ui is the canonical baseline for surrounding map controls, filters, panels, dialogs, loading states and feature-detail surfaces.

Offline maps MUST define region, zoom range, package lifecycle, licensing, authorization, storage and synchronization explicitly. Incidental browser caching is not an offline architecture.

Time-aware geospatial systems MUST distinguish event, observation, validity and system time. Spatial and temporal filtering MUST be designed together, and stale positions MUST NOT be presented as current.

Maps MUST be accessible through keyboard-operable controls and appropriate nonvisual alternatives. Colour MUST NOT be the sole carrier of spatial meaning, and required workflows MUST NOT depend exclusively on pointer manipulation of a rendered map.

Precise location MUST be treated as potentially sensitive. Authorization MUST apply to features, tile services, caches, offline packages and exports independently of frontend visibility.

Print and data exports MUST preserve spatial context, CRS semantics, attribution and authorization.

**Canonical rule:** geospatial data is conforming only when its position, reference system, geometry, temporal meaning, authorization, query behaviour and presentation remain correct across database, API, tiles, client rendering, offline use and export.

This version also establishes explicit corpus-level GeoJSON budgets rather than implying that RFC 7946 itself defines a maximum file size; it does not. The thresholds in §2.8.1 are therefore engineering policy and can be adjusted centrally if the corpus already has global payload budgets.
