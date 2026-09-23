---
id: "geo-metadata"
title: "Geospatial Metadata & Catalog"
domain: "data"
status: "draft"
version: "0.1.0"
owner: "@Dxlxz"
tags: ["data", "geo", "geospatial", "metadata", "catalog"]
applies_to: ["data"]
related: ["tables"]
legacy_number: 83
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 73295
provenance: baseline

---

Below is the canonical chapter, with STAC treated as the preferred interoperable model for spatiotemporal assets, while preserving compatibility paths for OGC API Records, ISO 19115-family metadata, DCAT-style catalogs, and domain-specific equivalents.

# Geospatial Metadata & Catalog — Gold Standard 2026

**Status:** Canonical  
**Standard level:** Gold Standard 2026  
**Canonical placement:** **Geospatial → Metadata & Catalog → Data & Database → Documentation**  
**Preferred spatiotemporal metadata baseline:** STAC 1.1.x  
**Preferred STAC discovery API baseline:** STAC API 1.0.x  
**UI baseline:** shadcn/ui for catalog, discovery, publication, and operator-facing interfaces  
**Applies to:** Raster imagery, satellite/aerial/drone imagery, elevation, point clouds, lidar, vector-derived products, tiled datasets, coverages, mosaics, analytical products, machine-learning labels, spatial datasets, published spatial services, and other catalogued geospatial resources.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, and **SHOULD NOT** are requirements unless an approved exception is documented.

---

# 1. Purpose

## 1.1 Objective

This standard defines how geospatial datasets and assets MUST be described, catalogued, discovered, versioned, governed, attributed, quality-assessed, and published.

It governs:

- metadata models;
- STAC;
- equivalent metadata standards;
- dataset identity;
- collection identity;
- asset identity;
- spatial and temporal extent;
- coordinate reference metadata;
- dataset discovery;
- spatial search;
- temporal search;
- faceted search;
- provenance;
- lineage;
- source attribution;
- licensing;
- versioning;
- deprecation;
- tile catalogs;
- imagery catalogs;
- quality metadata;
- quality flags;
- validation;
- draft/review/publish workflows;
- metadata APIs;
- publication lifecycle;
- archival;
- documentation.

This standard MUST be applied together with:

- Security;
- Data & Database;
- API;
- Data Ingestion / ETL;
- Jobs & Queue;
- Realtime where applicable;
- State Management;
- Forms & Validation;
- Accessibility;
- Design Tokens;
- Component;
- Pattern;
- Content & UX Writing;
- Observability standards.

A geospatial catalog MUST be treated as part of the data architecture rather than as a documentation page added after publication.

---

## 1.2 Governing principles

Geospatial metadata MUST enable a consumer to determine:

1. **what the resource is;**
2. **where it applies;**
3. **when it applies;**
4. **who produced or maintains it;**
5. **how it was produced;**
6. **which version is being referenced;**
7. **what quality limitations exist;**
8. **what licence and attribution obligations apply;**
9. **how the resource can be accessed;**
10. **whether the resource is appropriate for the intended use.**

A dataset that exists but cannot be reliably discovered, interpreted, traced, or governed is not a fully published dataset.

---

## 1.3 Metadata is a data contract

Catalog metadata MUST NOT be treated as optional descriptive decoration.

Material metadata fields define part of the dataset's external contract.

A change to metadata MAY therefore be:

- editorial;
- additive;
- compatibility-affecting;
- semantically breaking.

For example, correcting punctuation in a description is different from changing:

- units;
- CRS;
- temporal meaning;
- licence;
- quality status;
- nodata interpretation;
- lineage.

Semantic metadata changes MUST follow the same governance discipline as data-contract changes.

---

## 1.4 Metadata versus data

Metadata describes the resource.

Metadata MUST NOT silently become the authoritative source for a domain fact that belongs to the dataset itself.

Likewise, a dataset MUST NOT require a consumer to inspect arbitrary files merely to discover essential metadata that belongs in the catalog.

Where the same property exists in both asset-native metadata and catalog metadata, ownership and synchronisation MUST be explicit.

---

# 2. Rules

## 2.1 Canonical metadata model selection

STAC SHOULD be the preferred catalog model for discoverable spatiotemporal assets when its Item, Collection, Catalog, and Asset abstractions fit the data.

The canonical 2026 baseline SHOULD target the current stable STAC 1.1 family unless compatibility requirements require another supported 1.x version.

STAC API SHOULD be used when dynamic spatial, temporal, cross-collection, or metadata search is required.

A static STAC Catalog MAY be used when:

- dataset scale is modest;
- static publication is operationally preferable;
- crawl/browse discovery is sufficient;
- dynamic query is not required.

A team MUST NOT create a proprietary geospatial catalog schema when an established interoperable model satisfies the requirement.

---

## 2.2 Equivalent metadata models

STAC is not mandatory for every geospatial metadata use case.

Equivalent or complementary models MAY include:

- OGC API - Records;
- ISO 19115-family metadata;
- national or regulatory spatial metadata profiles;
- DCAT or GeoDCAT-style discovery metadata;
- domain-specific scientific metadata models;
- organisation-approved archival metadata standards.

An alternate model MUST be selected intentionally.

The architecture MUST define how the alternate model maps to the canonical discovery model where datasets are exposed through the shared catalog.

Equivalent standards MUST NOT produce multiple inconsistent authoritative metadata records for the same dataset.

---

## 2.3 Canonical internal model

Large platforms SHOULD define one internal canonical metadata model even when publishing through multiple external standards.

The internal model SHOULD capture at least:

- stable identity;
- title;
- description;
- dataset type;
- spatial extent;
- temporal extent;
- CRS;
- ownership;
- providers;
- licence;
- attribution;
- access links;
- version;
- publication state;
- lineage;
- quality status.

External encodings SHOULD be generated from or reconciled against this canonical representation.

The platform SHOULD NOT manually maintain independent STAC, ISO, DCAT, and application metadata that can drift without detection.

---

## 2.4 STAC object responsibilities

STAC implementations MUST use object types according to their intended semantic level.

### STAC Item

A STAC Item SHOULD represent one discoverable spatiotemporal unit and its assets.

Item metadata SHOULD describe properties specific to that unit.

### STAC Collection

A Collection SHOULD represent a coherent family of Items sharing material dataset-level characteristics.

Collection-level metadata SHOULD contain shared properties such as:

- description;
- spatial extent;
- temporal extent;
- licence;
- providers;
- summaries;
- common access characteristics.

### STAC Catalog

A Catalog SHOULD organise and link metadata resources.

Catalog hierarchy SHOULD primarily aid navigation and grouping.

Catalog nesting MUST NOT be treated as the primary substitute for searchable metadata.

### Asset

An Asset MUST represent an accessible resource associated with an Item or Collection according to the chosen STAC model.

Asset metadata SHOULD identify its role and media characteristics sufficiently for machine clients to select the correct resource.

---

## 2.5 Collection boundaries

A Collection MUST have a coherent semantic meaning.

Collections SHOULD normally group data sharing relevant characteristics such as:

- producing programme;
- sensor/platform;
- processing level;
- product family;
- update lifecycle;
- licensing;
- schema.

A Collection MUST NOT become a miscellaneous container for unrelated datasets merely because they are owned by the same team.

Creating thousands of Collections for arbitrary partitions SHOULD also be avoided when Items are the appropriate granularity.

---

## 2.6 Stable identifiers

Catalog, Collection, Item, dataset, and asset identities MUST have explicit stability rules.

Identifiers MUST NOT be based solely on:

- UI display labels;
- mutable filenames;
- database row positions;
- temporary storage paths.

STAC Item IDs MUST be unique within their Collection.

Collection IDs SHOULD be globally unambiguous within the publishing organisation.

Where a provider already has a durable source identifier, that identity SHOULD be preserved or explicitly cross-referenced.

---

## 2.7 Human-readable titles versus identifiers

Machine identifiers and human-readable titles MUST remain separate concepts.

A title MAY change for:

- clarity;
- spelling;
- branding;
- localisation.

Changing a title MUST NOT require changing the stable dataset identifier.

URLs MAY use readable slugs, but slugs MUST NOT become the only durable identity if they are expected to change.

---

## 2.8 Spatial metadata

Every spatial resource MUST declare enough spatial metadata for a consumer to understand its geographic applicability.

This SHOULD include, where applicable:

- geometry/footprint;
- bounding extent;
- native CRS;
- coordinate dimensions;
- vertical reference;
- spatial resolution;
- geographic coverage description.

Spatial metadata MUST NOT silently imply a CRS.

---

## 2.9 STAC geometry

STAC Item geometry and `bbox` MUST follow STAC/GeoJSON coordinate semantics.

Where geometry is supplied, it MUST represent the relevant geographic footprint accurately enough for intended discovery.

The geometry SHOULD represent actual coverage rather than an unnecessarily broad administrative or global rectangle.

A coarse footprint MAY be used where precise geometry would be prohibitively expensive, but its approximation SHOULD be documented where material.

---

## 2.10 Native CRS metadata

STAC's search geometry does not replace native asset CRS metadata.

Assets whose native spatial reference is relevant MUST expose that information through:

- approved STAC fields/extensions;
- asset metadata;
- catalog metadata;
- another interoperable mechanism.

A raster in a projected CRS MUST NOT be represented to consumers as though its native CRS were WGS 84 merely because STAC discovery geometry uses GeoJSON coordinates.

---

## 2.11 CRS identifiers

Coordinate reference systems SHOULD use durable recognised identifiers.

Preferred references SHOULD use, where available:

- EPSG identifiers;
- authoritative CRS URIs;
- standards-compliant WKT where identifiers are insufficient.

Custom local CRS definitions MUST include sufficient definition for reproducible interpretation.

An informal label such as `local_grid`, `UTM`, or `WGS84` SHOULD NOT be the only CRS metadata where ambiguity exists.

---

## 2.12 Axis order

APIs and metadata MUST define axis-order behaviour unambiguously.

GeoJSON/STAC discovery coordinates MUST follow the applicable GeoJSON longitude/latitude ordering.

Native geospatial formats MAY use other axis conventions according to their standards.

The system MUST NOT silently swap axes based on heuristic detection.

---

## 2.13 Vertical reference

Datasets containing elevation or height SHOULD identify relevant vertical datum/reference where interpretation depends on it.

Terms such as:

- height;
- elevation;
- depth;
- orthometric height;
- ellipsoidal height;

MUST NOT be treated as interchangeable without appropriate metadata.

A DEM without required vertical-reference metadata SHOULD be treated as incomplete.

---

## 2.14 Spatial resolution

Imagery, raster, and other resolution-dependent products SHOULD expose relevant spatial resolution or ground-sampling metadata.

The metadata MUST distinguish where relevant between:

- pixel dimensions;
- nominal ground sampling distance;
- effective analytical resolution;
- map scale.

Resolution values MUST have explicit units.

---

## 2.15 Temporal metadata

Every temporally meaningful resource MUST declare its temporal semantics.

Metadata MUST distinguish where relevant:

- acquisition time;
- observation time;
- validity time;
- publication time;
- processing time;
- update time.

These MUST NOT be used interchangeably.

---

## 2.16 STAC datetime

STAC Item `datetime` SHOULD represent the most useful searchable temporal meaning of the resource.

For interval data, the appropriate start and end datetime fields SHOULD be used according to the STAC contract.

An arbitrary ingestion timestamp MUST NOT be substituted for acquisition/observation time merely because it is easier to populate.

---

## 2.17 Timezone and timestamp rules

Canonical geospatial timestamps SHOULD use unambiguous standards-based timestamps.

STAC times MUST follow the required UTC semantics.

Source-local civil time MAY be preserved as auxiliary provenance metadata where operationally useful.

Naive timestamps without timezone/offset MUST NOT be accepted for externally published temporal metadata unless the governing source standard explicitly defines their interpretation.

---

## 2.18 Dataset description

Every published Collection or dataset MUST have a human-readable description.

The description SHOULD explain:

- what the dataset represents;
- major production method;
- intended usage;
- relevant exclusions;
- significant limitations.

Descriptions MUST NOT rely solely on internal acronyms.

A catalog record reading only `Processed layer v2` is insufficient.

---

## 2.19 Keywords and controlled vocabularies

Keywords SHOULD improve discovery.

Controlled vocabularies SHOULD be used when interoperability materially benefits.

Free-form keywords MUST NOT become a substitute for structured fields.

Synonyms MAY be indexed for search without duplicating them into authoritative metadata.

Keyword lists SHOULD be curated rather than accumulating every internal project term.

---

## 2.20 Providers and ownership

Every production dataset MUST have an accountable owner or provider relationship.

Metadata SHOULD distinguish, where applicable:

- producer;
- processor;
- publisher;
- licensor;
- host;
- custodian.

The organisation serving a dataset MUST NOT automatically be represented as the original producer if it merely republishes another provider's data.

---

## 2.21 Contact metadata

Discoverable datasets SHOULD provide a support or stewardship contact appropriate to the audience.

A personal employee email SHOULD NOT be the only durable ownership mechanism for a long-lived production dataset.

Team, organisation, or governed support identities SHOULD be preferred.

---

## 2.22 Discovery search

A shared geospatial catalog SHOULD support discovery by the primary dimensions users actually need.

These SHOULD include, where applicable:

- text;
- collection;
- spatial intersection;
- bounding box;
- time/time range;
- dataset/product type;
- platform/sensor;
- provider;
- resolution;
- quality;
- licence;
- publication status.

Search behaviour MUST have explicit semantics.

---

## 2.23 Spatial search semantics

Spatial intersection MUST use the canonical geometry semantics of the API.

Bounding-box search MUST NOT be represented as precise geometry intersection when the engine only evaluates bounding boxes.

If simplification or approximation affects results materially, the API contract MUST state that behaviour.

Spatial filtering SHOULD use appropriately indexed data structures.

---

## 2.24 Temporal search semantics

Temporal search MUST define:

- inclusive/exclusive boundaries;
- interval overlap semantics;
- timezone behaviour;
- treatment of missing time.

A temporal filter MUST NOT produce inconsistent semantics between UI and API.

---

## 2.25 Text search

Text search SHOULD search catalog fields that users reasonably expect.

The interface SHOULD identify whether text search covers:

- title;
- description;
- keywords;
- IDs;
- provider names.

Full-text relevance SHOULD NOT override explicit spatial/temporal constraints.

Internal implementation fields MUST NOT accidentally become searchable public metadata.

---

## 2.26 Faceted search

Facets SHOULD be generated from governed metadata fields.

Useful facets MAY include:

- collection;
- provider;
- product type;
- platform;
- sensor;
- quality;
- licence;
- spatial resolution class.

Facet values MUST be normalised.

For example, equivalent values such as:

- `Sentinel 2`;
- `Sentinel-2`;
- `sentinel2`;

SHOULD NOT appear as separate user-facing facets when they represent one canonical value.

---

## 2.27 Search authorization

Search results MUST respect authorization.

The search/index layer MUST NOT expose restricted resources through:

- result counts;
- facets;
- auto-complete;
- bounding extents;
- titles;
- thumbnails;
- existence checks.

A protected dataset MUST NOT be discoverable to an unauthorised caller merely because its asset URL remains protected.

---

## 2.28 Search pagination

Large result sets MUST use bounded pagination.

The API SHOULD use pagination semantics compatible with the underlying catalog/search standard.

Clients MUST NOT request or receive an unbounded complete catalog by default.

Pagination MUST preserve deterministic result behaviour according to API standards.

---

## 2.29 Search relevance

Where relevance ranking exists, its purpose SHOULD be understandable.

Ranking MAY consider:

- textual relevance;
- recency;
- spatial overlap;
- metadata completeness;
- organisational priority.

Ranking MUST NOT silently imply scientific quality or legal authority unless those factors explicitly drive ranking.

---

## 2.30 OGC API - Records

OGC API - Records SHOULD be considered when the primary resource is a metadata record rather than a STAC-style spatiotemporal asset.

The platform MAY expose the same underlying catalog through:

- STAC API for asset-centric discovery;
- OGC API - Records for broader metadata discovery;

provided semantics remain consistent.

Duplicate publication interfaces MUST NOT create incompatible ownership or version state.

---

## 2.31 Static catalog discovery

Static catalogs MUST have navigable link integrity.

Every published static catalog SHOULD be crawlable from a stable root.

Broken child/item/collection links MUST be treated as publication defects.

Static publication pipelines SHOULD validate the complete graph or changed subgraph before promotion.

---

## 2.32 Provenance

Material geospatial datasets MUST expose provenance sufficient to understand their origin.

Provenance SHOULD identify, as applicable:

- source dataset;
- source version;
- acquisition/platform;
- producing organisation;
- processing workflow;
- software/version;
- processing date;
- parameters;
- intermediate inputs.

Provenance depth MUST be proportionate to dataset consequence and reproducibility requirements.

---

## 2.33 Lineage graph

Derived datasets SHOULD preserve machine-resolvable lineage where practical.

A lineage model SHOULD be able to answer:

- which source assets contributed;
- which process generated this output;
- which version of those sources was used.

Lineage SHOULD be represented through stable identifiers/links rather than only narrative prose.

A textual lineage summary MAY supplement structured relationships.

---

## 2.34 Direct versus transitive lineage

Catalogs MAY expose direct lineage rather than fully expanding all ancestors on every record.

The system SHOULD allow transitive lineage to be reconstructed from direct relationships where necessary.

Metadata MUST NOT duplicate enormous lineage graphs into every Item if that creates unmanageable record size.

---

## 2.35 Processing provenance

Derived products SHOULD identify material processing level or method.

Examples include:

- raw;
- calibrated;
- orthorectified;
- atmospherically corrected;
- classified;
- mosaicked;
- generalised.

Product-level terminology MUST be defined by the domain.

Internal pipeline stage names MUST NOT automatically become public scientific processing labels.

---

## 2.36 Provenance integrity

A consumer MUST NOT be able to alter authoritative lineage by editing descriptive client metadata.

Lineage links SHOULD be generated from controlled processing/publication workflows where possible.

Manual corrections MUST be auditable for regulated or high-consequence datasets.

---

## 2.37 Source immutability and checksums

Published immutable assets SHOULD expose content identity through checksums or equivalent mechanisms where verification matters.

A checksum SHOULD identify exact bytes, not a human concept of "same dataset."

Replacing content behind an immutable asset identity MUST NOT preserve the old checksum.

Where assets are mutable by contract, version/update semantics MUST be explicit.

---

## 2.38 Licensing

Every externally available dataset MUST have explicit licence metadata or an explicit statement that no licence rights are granted.

Licence metadata SHOULD be defined at Collection/dataset level when it applies uniformly.

Asset-level licences MAY override dataset-level licences only when the model clearly supports that difference.

Unknown licence MUST NOT be interpreted as public-domain or unrestricted use.

---

## 2.39 STAC licensing

STAC publications SHOULD use SPDX licence identifiers or expressions when the licence is representable through SPDX.

Where an appropriate SPDX identifier/expression does not exist, the canonical STAC mechanism for non-standard licensing SHOULD be used together with an appropriate licence link.

Deprecated or ambiguous placeholders SHOULD NOT be introduced into new publications.

A licence value indicating a non-standard licence without an accessible licence text/link MUST be treated as incomplete metadata.

---

## 2.40 Attribution

Datasets requiring attribution MUST make that obligation discoverable.

Attribution metadata SHOULD identify:

- attribution text;
- provider;
- licence;
- attribution URL where applicable.

Applications consuming catalog data MUST NOT strip legally required attribution.

Map and imagery interfaces SHOULD provide an appropriate mechanism for persistent attribution when the source requires it.

---

## 2.41 Multiple licences

Datasets composed from sources under different licences MUST define resulting usage conditions.

The catalog MUST NOT claim a more permissive licence than the processing/publishing organisation has the right to grant.

Where individual assets retain different licence conditions, the metadata model MUST preserve those distinctions.

---

## 2.42 Restricted datasets

A dataset may be discoverable while access is restricted only when policy explicitly allows metadata discovery.

Restricted assets MUST clearly indicate access conditions without exposing prohibited details.

A record MUST NOT claim `open`, `public`, or unrestricted access merely because its metadata is publicly searchable.

---

## 2.43 Version model

Every materially versioned dataset MUST have an explicit version model.

The model MUST distinguish, where applicable:

- dataset identity;
- dataset release/version;
- individual asset revision;
- metadata revision.

Changing metadata punctuation SHOULD NOT necessarily create a new scientific dataset version.

Changing spatial values, processing methodology, or source data usually SHOULD.

---

## 2.44 Immutable published versions

Published dataset releases SHOULD be immutable when reproducibility matters.

A new material data release SHOULD receive a new version identity rather than replacing historical content in place.

Immutable versions SHOULD retain:

- metadata;
- lineage;
- licence;
- quality status;
- asset references;

for their valid retention period.

---

## 2.45 Version identifiers

Version identifiers SHOULD be stable and machine-readable.

They MAY use:

- semantic versions;
- date-based releases;
- source-specific generation IDs;
- immutable hashes;

according to dataset semantics.

A filename such as `final_v2_revised_latest` MUST NOT be the formal versioning scheme.

---

## 2.46 Latest aliases

A `latest` or equivalent alias MAY be provided for convenience.

It MUST resolve to a concrete version.

Consumers requiring reproducibility SHOULD be able to pin the exact version.

`latest` MUST NOT be used as the only persistent identifier in reproducible workflows.

---

## 2.47 Superseded data

Superseded versions SHOULD identify:

- successor;
- superseded status;
- reason where useful.

Superseded does not necessarily mean invalid.

Historical versions SHOULD remain discoverable where contractual, scientific, audit, or reproducibility requirements demand it.

---

## 2.48 Withdrawn data

A dataset MAY require withdrawal because of:

- material quality defect;
- licence change;
- security issue;
- legal requirement;
- erroneous publication.

Withdrawal MUST NOT silently erase historical existence where auditability is required.

The catalog SHOULD expose an appropriate withdrawn/unavailable status without continuing to advertise unusable assets as active.

---

## 2.49 Metadata versioning

Metadata edits that change semantic interpretation MUST be auditable.

The system SHOULD retain:

- who changed metadata;
- when;
- previous value;
- publication result;

for governed datasets.

A corrected description SHOULD NOT rewrite historical metadata silently if prior values materially affected interpretation or contractual use.

---

## 2.50 Dataset lifecycle state

Published catalogs SHOULD use a controlled lifecycle vocabulary.

A typical lifecycle MAY include:

- draft;
- validating;
- review;
- approved;
- published;
- deprecated;
- withdrawn;
- archived.

Lifecycle state MUST NOT be inferred solely from whether an object exists in storage.

---

## 2.51 Tile catalogs

Tiled geospatial products MUST publish enough metadata for clients to interpret the tiles correctly.

Metadata SHOULD identify, as applicable:

- tile format;
- tile matrix set;
- CRS;
- minimum/maximum scale or zoom;
- spatial extent;
- available matrix limits;
- source dataset;
- style dependency where relevant;
- vector schema/layers;
- attribution.

A tile endpoint alone is not sufficient catalog metadata.

---

## 2.52 Tile matrix sets

Tile catalogs SHOULD use recognised tile-matrix-set definitions where practical.

Custom tile matrix sets MUST be fully defined and stably identifiable.

A tile matrix identifier MUST NOT rely on undocumented `z/x/y` assumptions when the actual grid differs.

Clients MUST be able to determine:

- CRS;
- matrix dimensions;
- scale;
- tile dimensions;
- matrix limits;

from the applicable contract.

---

## 2.53 OGC tile metadata

Where interoperability requires standards-based tile metadata, implementations SHOULD consider:

- OGC API - Tiles;
- OGC Two Dimensional Tile Matrix Set and Tile Set Metadata.

Custom tile metadata MUST NOT conflict with the canonical spatial metadata for the source dataset.

A tile representation is an access form of data, not a separate source of truth about dataset provenance.

---

## 2.54 XYZ/Web Mercator tiles

Common XYZ/Web Mercator publication MAY use conventional access patterns.

The catalog MUST still expose sufficient information to distinguish:

- CRS;
- zoom availability;
- bounds;
- tile format;
- attribution.

The existence of `{z}/{x}/{y}` in a URL MUST NOT be considered complete metadata.

---

## 2.55 Vector tile catalogs

Vector-tile products SHOULD expose discoverable information about:

- contained layers;
- attribute/property schema;
- geometry types;
- zoom/generalisation behaviour where relevant;
- source dataset/version.

Consumers MUST NOT be required to reverse engineer a production vector-tile schema solely by sampling arbitrary tiles.

---

## 2.56 Imagery catalogs

Imagery catalog metadata SHOULD include relevant acquisition and processing characteristics.

Depending on the dataset, this MAY include:

- platform;
- constellation;
- instrument;
- bands;
- wavelengths;
- resolution;
- cloud cover;
- viewing geometry;
- processing level;
- radiometric characteristics;
- nodata;
- bit depth.

The catalog SHOULD use established STAC extensions where stable appropriate extensions exist rather than inventing incompatible duplicate fields.

---

## 2.57 Bands

Multiband imagery MUST describe bands sufficiently for correct interpretation.

Band metadata SHOULD include relevant:

- name;
- common name;
- wavelength;
- units;
- scale/offset;
- nodata;
- data type.

Band order MUST NOT be left implicit where consumers could interpret it incorrectly.

---

## 2.58 Thumbnails and previews

Catalogs MAY provide thumbnails, overviews, or previews.

Preview assets MUST be distinguishable from analysis-quality data.

A thumbnail MUST NOT be labelled or presented as the authoritative full-resolution asset.

Thumbnail generation SHOULD preserve enough geographic context to be useful without unnecessary transfer cost.

---

## 2.59 Mosaics and composites

Mosaics/composites MUST have provenance appropriate to their composition.

Metadata SHOULD describe relevant:

- contributing time range;
- selection/compositing method;
- resolution;
- source collections;
- quality filtering.

A mosaic generated from many dates MUST NOT misleadingly advertise one arbitrary acquisition timestamp as though the entire output was observed at that instant.

---

## 2.60 Quality model

Every material dataset family SHOULD define a quality model.

Quality SHOULD be represented through machine-readable properties where consumers need to filter or automate decisions.

Quality MAY include:

- completeness;
- positional accuracy;
- temporal accuracy;
- cloud/obstruction;
- sensor validity;
- processing confidence;
- classification confidence;
- topology validity;
- source reliability.

One universal `quality = good/bad` flag SHOULD NOT replace domain-specific quality semantics.

---

## 2.61 Quality flags

Quality flags MUST have documented meaning.

Each flag SHOULD define:

- scope;
- calculation/source;
- valid values;
- whether it is advisory or disqualifying.

Bit-packed flags SHOULD have a published schema.

Consumers MUST NOT be expected to reverse-engineer opaque quality bitmasks.

---

## 2.62 Quality values versus quality judgement

Catalog metadata SHOULD prefer measurable facts over vague value judgements.

Prefer metadata such as:

- `cloud_cover = 12%`;
- positional RMSE;
- confidence score;
- missing-area percentage;

over merely:

- `quality = high`.

A higher-level quality class MAY be provided if its derivation is documented.

---

## 2.63 Unknown quality

Unknown and failed quality are different states.

The catalog MUST distinguish, where relevant:

- not assessed;
- assessment unavailable;
- passed;
- warning;
- failed.

Missing metadata MUST NOT automatically be interpreted as passing quality control.

---

## 2.64 Quality provenance

Quality measurements SHOULD identify the relevant:

- method;
- algorithm/version;
- reference source;
- assessment date;

when reproducibility or interpretation depends on them.

A confidence score without documented semantics SHOULD NOT be treated as portable across products.

---

## 2.65 Quality and publication

Publication workflows MUST define whether quality failures:

- block publication;
- permit publication with warning;
- quarantine the dataset.

Critical quality failures MUST NOT be reduced to a decorative warning while the dataset remains represented as normal trusted production data.

---

## 2.66 Metadata validation

Catalog records MUST be validated before publication.

Validation SHOULD include, as applicable:

- schema validity;
- required fields;
- ID uniqueness;
- link integrity;
- geometry validity;
- temporal validity;
- CRS presence;
- licence completeness;
- asset availability;
- extension validity;
- Collection/Item consistency.

Schema validation alone is insufficient.

---

## 2.67 Semantic validation

Publication SHOULD validate semantic relationships.

Examples include:

- Collection extent contains Item extents;
- Item temporal values fall within Collection temporal extent;
- asset media type matches actual data;
- declared CRS matches asset;
- declared dimensions match asset metadata;
- checksum matches content;
- version/lineage references resolve.

Metadata that is syntactically valid but semantically false MUST fail appropriate quality controls.

---

## 2.68 Asset existence validation

Publishing a metadata record SHOULD verify that required assets are accessible from the intended publication environment.

A record MUST NOT enter published state with broken required asset links unless the product explicitly represents it as metadata-only or temporarily unavailable.

Transient validation failure SHOULD be distinguished from permanent missing data.

---

## 2.69 Publication workflow

Production publishing MUST use an explicit workflow.

The canonical lifecycle SHOULD be equivalent to:

1. ingest/register;
2. derive metadata;
3. validate;
4. quality assess;
5. review where required;
6. stage;
7. publish;
8. index/search;
9. verify;
10. monitor.

Direct manual insertion into the public catalog SHOULD NOT be the normal publication path.

---

## 2.70 Draft state

Draft metadata MUST be clearly distinguishable from published metadata.

Public consumers MUST NOT accidentally discover incomplete draft records unless the product explicitly supports draft discovery.

Draft IDs SHOULD preserve identity into publication where practical.

---

## 2.71 Review and approval

High-consequence or externally licensed datasets SHOULD support review/approval before public publication.

Review SHOULD verify:

- data ownership;
- licence;
- attribution;
- quality;
- sensitive content;
- metadata completeness.

Approval MUST be auditable where Governance requires it.

---

## 2.72 Atomic publication

Publication SHOULD avoid exposing partially published datasets.

Where a dataset requires multiple metadata/assets/index updates, publication SHOULD use:

- staging;
- transactional metadata change;
- atomic pointer/alias promotion;
- versioned immutable release;

or another safe Pattern.

A Collection MUST NOT appear fully published while half its required assets are still inaccessible.

---

## 2.73 Search-index publication

Catalog database publication and search-index publication MAY occur through separate systems.

The workflow MUST detect divergence.

A dataset MUST NOT be considered fully published while the canonical discovery index is permanently missing it if discovery is part of the publication contract.

---

## 2.74 Unpublishing

Unpublishing MUST have defined semantics.

The workflow MUST distinguish:

- temporary access suspension;
- withdrawal;
- archival;
- deletion.

Deleting a catalog record MUST NOT automatically delete source assets unless lifecycle policy explicitly couples them.

Likewise, deleting an asset MUST not leave normal published metadata pointing to it indefinitely.

---

## 2.75 Publishing idempotency

Publication operations SHOULD be idempotent.

Retrying a publish operation MUST NOT create duplicate:

- Collections;
- Items;
- assets;
- index records.

Stable IDs and version identities MUST be preserved across retries.

---

## 2.76 Publishing concurrency

Concurrent publication of the same dataset/version MUST be controlled.

The system MUST prevent two workflows from silently publishing conflicting metadata for one canonical identity.

Optimistic concurrency, locks, immutable versions, or another approved mechanism SHOULD be used.

---

## 2.77 Backfills

Metadata backfills MUST follow Data Ingestion standards.

Large catalog enrichment operations SHOULD:

- be idempotent;
- be version-aware;
- be resource bounded;
- preserve audit history where required.

A backfill MUST NOT silently change the scientific meaning of already published metadata without appropriate version/review handling.

---

## 2.78 Derived metadata

Automatically derived metadata SHOULD identify its derivation method where useful.

Examples include:

- generated footprint;
- cloud-cover statistic;
- band statistics;
- thumbnail;
- spatial extent.

Derived metadata SHOULD be regenerated consistently from the authoritative asset rather than manually edited unless override behaviour is explicit.

---

## 2.79 Manual override

Manual metadata override MAY be necessary.

Overrides MUST identify:

- overridden field;
- new value;
- reason;
- actor;
- timestamp;

where governance requires auditability.

Automated refresh MUST NOT silently overwrite approved manual corrections unless precedence rules explicitly permit it.

---

## 2.80 Catalog API

Dynamic catalogs MUST follow the API standard.

The API MUST define:

- authentication;
- authorization;
- pagination;
- error format;
- search limits;
- version compatibility;
- caching where applicable.

Spatial search parameters MUST be validated.

Unbounded geometry complexity MUST NOT be accepted without resource limits.

---

## 2.81 STAC API conformance

A service advertised as STAC API compliant MUST implement the relevant declared conformance classes correctly.

The landing endpoint MUST accurately communicate supported conformance capabilities.

A service MUST NOT claim support for:

- Item Search;
- Filter;
- Sort;
- Query;
- Fields;

merely because similarly named proprietary parameters exist.

Extensions MUST be explicitly declared according to the applicable specification.

---

## 2.82 Extension governance

STAC extensions SHOULD be selected from mature, interoperable community extensions where possible.

Extension maturity and stability MUST be reviewed before adoption.

Experimental extensions MAY be used when required, but dependency risk MUST be understood.

A team MUST NOT introduce a custom field when a stable established extension provides equivalent semantics without a documented reason.

---

## 2.83 Custom STAC fields

Custom fields MUST follow a governed namespace/prefix convention.

Field meaning MUST be documented.

Custom metadata MUST NOT overwrite or reinterpret core STAC semantics.

If a custom field becomes widely reused, the organisation SHOULD consider standardising it internally or contributing to an appropriate community extension.

---

## 2.84 API search limits

Spatial/temporal catalog queries MUST be resource bounded.

Controls SHOULD include:

- page size;
- geometry complexity;
- maximum time range where appropriate;
- maximum query processing time;
- authentication quotas;
- rate limits.

A public STAC search endpoint MUST NOT allow arbitrary queries to exhaust database or geospatial-index resources.

---

## 2.85 Asset access

Catalog metadata and asset access are distinct security decisions.

A user MAY be authorised to discover metadata but not retrieve an asset.

Every asset request MUST independently enforce required authorization.

A signed asset URL MUST NOT be treated as a permanent public catalog identifier if it expires.

The catalog SHOULD point to durable access mechanisms capable of issuing authorised access where required.

---

## 2.86 Signed URLs

Expiring signed URLs SHOULD NOT normally be persisted as long-lived STAC asset `href` values.

Where signed URLs are required, the architecture SHOULD provide:

- dynamic catalog responses;
- redirect/access endpoints;
- another secure indirection.

Catalog metadata MUST remain valid beyond the lifetime of one temporary credential.

---

## 2.87 Security classification

Catalog records SHOULD carry classification metadata when datasets have controlled sensitivity.

Metadata itself MAY be sensitive.

The catalog MUST consider whether exposing:

- footprint;
- temporal coverage;
- existence;
- resolution;
- sensor;
- lineage;

could disclose information even when the asset remains inaccessible.

---

## 2.88 Data minimisation

Public metadata MUST expose only information appropriate to the audience.

Detailed source paths, internal bucket names, internal hostnames, database IDs, pipeline names, or sensitive provenance MUST NOT be published merely because they exist internally.

Public lineage SHOULD contain useful provenance without unnecessary infrastructure disclosure.

---

## 2.89 Tenant isolation

Multi-tenant geospatial catalogs MUST enforce tenant boundaries in:

- search;
- browse;
- facets;
- counts;
- asset links;
- previews;
- publication.

Tenant ID MUST come from authoritative context.

A client-supplied catalog filter MUST NOT be the security boundary preventing cross-tenant discovery.

---

## 2.90 Asset media types

Assets SHOULD declare accurate media types.

Generic `application/octet-stream` SHOULD NOT be used when a well-defined standard media type is available.

Media metadata SHOULD enable clients to distinguish, for example:

- GeoTIFF;
- Cloud Optimized GeoTIFF;
- GeoJSON;
- GeoPackage;
- LAS/LAZ;
- vector tile;
- JPEG/PNG preview.

File extension MUST NOT be the sole trusted source of media type.

---

## 2.91 Cloud-optimised assets

When assets are advertised as cloud-optimised or range-readable, the publishing pipeline SHOULD validate relevant structural requirements.

A `.tif` file MUST NOT be labelled as Cloud Optimized GeoTIFF solely because it uses TIFF.

Likewise, an advertised cloud-native layout SHOULD be usable through the access mechanism actually provided.

---

## 2.92 Nodata and masks

Raster datasets SHOULD expose nodata/mask semantics where analytical correctness depends on them.

Missing value, nodata, masked, saturated, cloud, and valid zero MUST NOT be conflated.

Catalog-level metadata SHOULD refer users to the authoritative asset-level representation where detailed masks are encoded in the source.

---

## 2.93 Units

Measured properties MUST have unambiguous units where interpretation requires them.

Unit strings SHOULD use standard identifiers/vocabularies where available.

A field named `resolution = 10` without its unit or known domain definition is non-conformant.

---

## 2.94 Statistics

Catalogs MAY expose summary statistics useful for discovery.

Statistics MUST identify sufficient context such as:

- field/band;
- unit;
- scope;
- nodata handling.

Approximate statistics SHOULD be marked as such where the distinction matters.

Metadata statistics MUST NOT be trusted as replacements for authoritative analysis when they are only discovery aids.

---

## 2.95 Catalog freshness

Dynamic catalogs MUST define freshness expectations.

Users SHOULD be able to determine whether newly published source data is expected to appear:

- immediately;
- within minutes;
- daily;
- according to another documented schedule.

Material catalog indexing lag SHOULD be observable.

A successful source-ingestion job MUST NOT automatically imply discoverability if catalog publication/indexing failed.

---

## 2.96 Observability

Publication systems SHOULD measure, where applicable:

- metadata validation failures;
- publication success/failure;
- publication latency;
- search-index lag;
- broken asset links;
- broken catalog links;
- licence-validation failures;
- metadata completeness;
- quality-gate failures.

Observability MUST distinguish ingestion success from catalog-publication success.

---

## 2.97 Broken-link monitoring

Public catalogs SHOULD periodically verify important link integrity.

This SHOULD cover:

- assets;
- licence links;
- parent/child links;
- collection links;
- successor/predecessor links;
- documentation links.

Short-lived authorised links SHOULD be tested according to their access model rather than as permanent URLs.

---

## 2.98 Metadata completeness metrics

The platform SHOULD define completeness requirements by dataset class.

Completeness SHOULD focus on meaningful fields rather than maximising field count.

A record containing hundreds of low-value fields but missing licence or CRS is not high-quality metadata.

---

## 2.99 Documentation relationship

Every externally consumed Collection/dataset SHOULD have documentation proportional to complexity.

Documentation SHOULD explain, where relevant:

- purpose;
- schema;
- processing;
- CRS;
- temporal semantics;
- quality;
- lineage;
- licence;
- usage examples;
- limitations.

Catalog metadata SHOULD link to deeper documentation rather than duplicating extensive manuals into every record.

---

## 2.100 Machine-readable versus human documentation

Machine-readable metadata MUST contain properties needed for programmatic discovery.

Human documentation MUST NOT be the only place that defines critical machine semantics such as:

- CRS;
- licence;
- version;
- temporal extent;
- quality flags.

Conversely, complex scientific context SHOULD NOT be forced into small machine metadata fields when longer human documentation is appropriate.

---

## 2.101 Content & UX Writing relationship

Catalog titles, descriptions, quality messages, and licence explanations MUST follow Content & UX Writing standards.

Descriptions SHOULD use domain terminology consistently.

Internal implementation jargon SHOULD NOT appear in public-facing catalog descriptions unless the audience requires it.

A quality warning SHOULD clearly state the limitation rather than use vague phrases such as `use cautiously`.

---

## 2.102 Forms & Validation relationship

Catalog editing and publishing interfaces MUST use Forms & Validation standards.

Form controls SHOULD use appropriate structured inputs for:

- CRS;
- date/time;
- licence;
- provider;
- controlled vocabulary;
- lifecycle status.

Critical metadata MUST NOT rely on arbitrary free-text fields when a governed structured value exists.

Server validation remains authoritative.

---

## 2.103 State Management relationship

Catalog-editing UI MUST distinguish:

- local draft;
- saved draft;
- validation state;
- approved state;
- published state.

An optimistic UI update MUST NOT display metadata as publicly published before authoritative publication succeeds.

Search-cache state MUST reconcile after publication/unpublication.

---

## 2.104 Accessibility relationship

Catalog search and publication UIs MUST follow Accessibility standards.

Map-based discovery MUST NOT be the only way to discover resources.

Users MUST have an equivalent textual/searchable method where the workflow requires access independent of map interaction.

Spatial extent SHOULD have textual or structured representation accessible without interpreting a map image alone.

Quality, licence, access, and publication status MUST NOT rely only on colour or map symbology.

---

## 2.105 Maps as discovery aids

Maps SHOULD support discovery but MUST NOT replace semantic search controls.

A user who cannot precisely manipulate a map SHOULD still be able to search through:

- place/location inputs;
- bounding values;
- named areas;
- structured filters;

where appropriate.

Map geometry editors MUST follow applicable keyboard/accessibility Patterns.

---

## 2.106 Design Tokens relationship

Catalog interfaces MUST use canonical Design Tokens.

Geospatial catalog UI MUST NOT independently invent visual semantics for:

- published;
- draft;
- warning;
- withdrawn;
- restricted;
- quality-failed.

Map styling may require a broader cartographic colour system, but product-state semantics MUST remain aligned with canonical tokens.

---

## 2.107 Component relationship

shadcn/ui MUST provide the baseline for organisation-owned catalog administration and discovery interfaces.

Applicable components MAY include:

- Table/Data Grid;
- Command;
- Input;
- Select;
- Combobox;
- Badge;
- Tabs;
- Sheet;
- Dialog;
- Alert;
- Tooltip;
- Form;
- Pagination.

Geospatial map components MAY use specialised libraries but MUST integrate with the canonical Component and Accessibility standards.

---

## 2.108 Table and grid relationship

Catalog result tables MUST follow Tables & Data Grid standards.

Common columns MAY include:

- title;
- collection;
- date/time;
- provider;
- resolution;
- quality;
- licence;
- version;
- publication state.

Metadata tables MUST NOT become arbitrary field dumps.

The default view SHOULD prioritise fields useful for comparison and discovery.

---

## 2.109 Pattern relationship

Canonical Patterns SHOULD govern:

- dataset search;
- map + result list;
- metadata detail;
- publish/review;
- version comparison;
- quality warning;
- restricted access;
- licence acknowledgement.

A feature team MUST NOT invent a new publishing workflow merely because its dataset uses a different spatial format.

---

## 2.110 API relationship

Catalog identifiers, error responses, pagination, caching, authentication, and filtering MUST follow the API standard.

Spatial-specific semantics MAY extend the API contract but MUST NOT contradict shared API conventions without an approved reason.

Search APIs MUST return machine-readable errors for invalid geometry, CRS, dates, or query parameters.

---

## 2.111 Data & Database relationship

Metadata persistence MUST use canonical database integrity controls.

The metadata model SHOULD enforce:

- unique identities;
- valid references;
- lifecycle constraints;
- version relationships.

Spatial search storage SHOULD use appropriate spatial indexing.

The database representation MUST NOT dictate the public metadata contract directly.

Internal surrogate keys SHOULD remain internal where public stable identifiers differ.

---

## 2.112 Ingestion relationship

Metadata generation SHOULD integrate with canonical ingestion pipelines.

Where asset metadata is derivable reliably, automation SHOULD populate it.

Automatically extracted values MUST still pass validation.

Pipeline success MUST NOT publish invalid metadata solely because extraction technically completed.

---

## 2.113 Reproducibility

Analytical or scientific workflows SHOULD be able to record enough catalog identity to reproduce inputs.

A reproducible reference SHOULD include stable:

- dataset/Collection ID;
- version;
- Item/asset identity where relevant.

Saving only a mutable search result URL or `latest` alias SHOULD NOT be considered sufficient reproducibility for material analytical work.

---

## 2.114 Citation

Datasets intended for research, regulatory, or external analytical use SHOULD provide a canonical citation mechanism where appropriate.

Citation metadata MAY include:

- title;
- organisation/authors;
- version;
- publication date;
- persistent identifier;
- licence.

Where a DOI or another persistent identifier exists, the catalog SHOULD expose it.

Citation metadata and legal attribution SHOULD NOT be assumed identical.

---

## 2.115 Persistent identifiers

Persistent identifiers such as DOI or other governed IDs SHOULD be used for formally released datasets where long-term citation is required.

A persistent identifier MUST resolve to enough metadata to identify the cited version even if storage locations later change.

Temporary object-storage URLs MUST NOT be treated as archival persistent identifiers.

---

## 2.116 Archival metadata

Archived datasets MUST preserve metadata necessary to interpret them later.

Archival records SHOULD retain:

- version;
- lineage;
- CRS;
- temporal extent;
- licence;
- format;
- quality notes;
- documentation references.

Archiving data while discarding its interpretive metadata is non-conformant where retention is intended for future use.

---

## 2.117 Deprecation

Deprecated Collections or API fields MUST provide migration guidance where consumers are expected to transition.

Deprecation SHOULD define:

- replacement;
- timeline;
- impact;
- retirement date where known.

A deprecated catalog resource MUST NOT disappear unexpectedly before the documented support window unless Security/legal requirements require emergency withdrawal.

---

## 2.118 Testing

Catalog systems SHOULD test:

- schema validation;
- spatial search;
- temporal search;
- bbox intersection;
- geometry edge cases;
- antimeridian where applicable;
- empty geometry where supported;
- pagination;
- authorization;
- licence metadata;
- broken assets;
- version transitions;
- quality states;
- publication;
- withdrawal;
- search-index consistency.

Tests SHOULD include representative datasets from each supported geospatial product family.

---

## 2.119 Antimeridian and polar data

Catalog systems handling global data MUST explicitly test:

- antimeridian crossing;
- polar coverage;
- very large extents.

Naive min/max longitude logic MUST NOT silently corrupt search metadata for datasets crossing ±180°.

Spatial indexing and display MAY require specialised handling while preserving valid interoperable metadata.

---

## 2.120 Large geometries

Highly detailed source footprints SHOULD be simplified for discovery where appropriate.

Discovery geometry SHOULD remain topologically valid and sufficiently accurate for search.

Full-resolution boundary geometry MAY remain available separately.

Catalog records MUST NOT become unmanageably large merely to reproduce every vertex of source coverage.

---

## 2.121 Exceptions

A deviation from this standard MUST document:

- dataset/catalog affected;
- rule being deviated from;
- interoperability impact;
- discovery impact;
- reproducibility impact;
- Security impact;
- compensating control;
- owner;
- migration or review plan.

Repeated metadata exceptions SHOULD trigger improvement of the canonical model rather than permanent dataset-specific schemas.

---

# 3. Anti-patterns

The following are non-conformant unless explicitly covered by an approved exception.

## 3.1 Catalog as spreadsheet

Production metadata exists only in a manually maintained spreadsheet with no governed publication contract.

## 3.2 Proprietary by default

A team invents its own metadata JSON despite STAC or another standard satisfying the requirement.

## 3.3 One schema per dataset

Every new dataset creates unique metadata fields for concepts already standardised elsewhere.

## 3.4 Metadata afterthought

Files are published first and discoverability, licence, CRS, and lineage are added months later.

## 3.5 Filename identity

A filename is the only stable dataset or asset identifier.

## 3.6 Title identity

Renaming a dataset title breaks every consumer reference.

## 3.7 Collection junk drawer

Unrelated products are grouped into one Collection solely because one team owns them.

## 3.8 Collection explosion

Every day, tile, file, or partition becomes a separate Collection when Items would be appropriate.

## 3.9 Catalog-tree search

Users must manually browse deep folder-like Catalog hierarchies instead of using searchable metadata.

## 3.10 CRS by assumption

Consumers are expected to know the CRS because "all our data is usually EPSG:XXXX."

## 3.11 STAC geometry equals native CRS

GeoJSON discovery geometry is treated as proof that the actual source asset uses the same CRS.

## 3.12 Axis guessing

Software silently swaps longitude/latitude when values "look wrong."

## 3.13 Unknown vertical datum

Elevation products are published with values but no usable vertical-reference metadata.

## 3.14 Ingestion time as observation time

Data is searchable by processing timestamp instead of the time represented by the data.

## 3.15 Free-text facets

Equivalent sensor/provider/product names fragment into dozens of facet values.

## 3.16 Search leaks restricted data

Unauthorized users cannot download assets but can discover titles, footprints, thumbnails, or record counts.

## 3.17 Human-doc-only semantics

Licence, CRS, quality flags, or units exist only in a PDF README and not machine-readable metadata.

## 3.18 Machine-only context

A cryptic JSON catalog technically validates but gives users no understandable description or limitations.

## 3.19 Lineage prose only

A derived product says "created from several source datasets" without identifying them.

## 3.20 Infrastructure lineage

Public provenance exposes internal buckets, hosts, job IDs, and database topology rather than meaningful source lineage.

## 3.21 Unknown means open

Missing licence metadata is interpreted as unrestricted use.

## 3.22 Licence string improvisation

Teams enter arbitrary values such as `free to use`, `internal`, or `probably CC` instead of governed licence metadata.

## 3.23 Attribution stripping

The application consumes third-party map or imagery data while omitting required attribution.

## 3.24 Latest-only history

A new release overwrites the previous published dataset so historical analyses cannot be reproduced.

## 3.25 Final-final versioning

Versions are encoded only in names such as `latest_final_v3_fix2`.

## 3.26 Mutable immutable URL

Bytes behind a supposedly versioned immutable asset URL change in place.

## 3.27 Silent withdrawal

A flawed dataset disappears with no metadata indicating that it existed or was withdrawn.

## 3.28 Tile URL is metadata

A `{z}/{x}/{y}` endpoint is published without CRS, tile matrix, bounds, format, or attribution metadata.

## 3.29 Tile schema reverse engineering

Consumers must sample vector tiles to discover layer names and property schemas.

## 3.30 Thumbnail equals data

Preview JPEGs are exposed without clear distinction from analysis-quality assets.

## 3.31 Single-time mosaic

A multi-month composite is assigned one arbitrary timestamp that misrepresents its temporal coverage.

## 3.32 Quality equals colour

A green/red indicator is the only representation of dataset quality.

## 3.33 Quality vibe

Metadata says `high quality` with no measurable or documented meaning.

## 3.34 Missing equals passed

Absence of quality metadata is interpreted as successful validation.

## 3.35 Opaque bit flags

Consumers receive an integer QA field with no published meaning for each bit.

## 3.36 Schema-valid fiction

A record passes JSON Schema validation despite incorrect CRS, extent, or asset references and is therefore published.

## 3.37 Direct production editing

Operators manually edit public catalog JSON as the routine metadata workflow.

## 3.38 Partial publish

A Collection becomes visible before required assets or Items are fully published.

## 3.39 Duplicate retry publication

A retried publication job creates duplicate Items or Collections.

## 3.40 Index drift

The canonical metadata database contains a dataset that never reaches catalog search, with no detection.

## 3.41 Signed URL persistence

A one-hour presigned object URL is written permanently into metadata intended to remain valid for years.

## 3.42 Public bucket path provenance

Internal storage layout leaks through public metadata fields unnecessarily.

## 3.43 Extension roulette

Each team invents custom STAC properties despite an established extension existing.

## 3.44 Experimental extension lock-in

A low-maturity extension becomes a critical public contract without compatibility planning.

## 3.45 Media type by extension

The catalog trusts `.tif` or `.json` without validating actual content.

## 3.46 Fake COG label

Every GeoTIFF is advertised as cloud-optimised regardless of internal structure.

## 3.47 Zero equals nodata

Valid zero values disappear because nodata semantics were never defined.

## 3.48 Unitless values

Resolution, elevation, accuracy, or distance metadata is published without a defined unit.

## 3.49 Map-only discovery

Users who cannot interact precisely with the map cannot discover spatial datasets.

## 3.50 UI equals publication state

A successful optimistic browser update marks a dataset as published before backend validation and indexing complete.

---

# 4. Checklist

An implementation conforms to this standard only when the following can be answered **yes** where applicable.

### Metadata model

- [ ] An established metadata standard is used where applicable.
- [ ] STAC is used for spatiotemporal assets when it fits the domain.
- [ ] Alternate standards have a documented reason.
- [ ] One canonical metadata representation is identifiable.
- [ ] Multiple publication formats cannot silently drift.

### Identity

- [ ] Dataset/Collection identity is stable.
- [ ] Item identities are stable and unique within the required scope.
- [ ] Display titles are separate from machine identity.
- [ ] Filenames and temporary storage paths are not the canonical identity.
- [ ] Source identifiers are preserved or cross-referenced where useful.

### Spatial metadata

- [ ] Spatial footprint/extent is available.
- [ ] Discovery geometry follows the applicable coordinate rules.
- [ ] Native asset CRS is discoverable.
- [ ] CRS identity is unambiguous.
- [ ] Axis semantics are explicit.
- [ ] Vertical reference is documented where relevant.
- [ ] Resolution includes meaningful units.

### Temporal metadata

- [ ] Acquisition/observation/validity semantics are defined.
- [ ] Processing time is not confused with observation time.
- [ ] Intervals use start/end semantics appropriately.
- [ ] Published timestamps are unambiguous.
- [ ] Temporal search behaviour is documented.

### Collections

- [ ] Collection boundaries have coherent meaning.
- [ ] Shared metadata is recorded at the correct Collection level.
- [ ] Item-specific properties remain at Item level.
- [ ] Collection extents accurately represent contained data.
- [ ] Collection hierarchy does not replace searchable metadata.

### Discovery

- [ ] Text search covers defined fields.
- [ ] Spatial search semantics are accurate.
- [ ] Temporal search semantics are accurate.
- [ ] Useful facets use normalised values.
- [ ] Search is bounded and paginated.
- [ ] Search, facets, counts, and previews respect authorization.
- [ ] Ranking does not imply undocumented scientific quality.

### STAC/API conformance

- [ ] STAC objects validate against the chosen stable version.
- [ ] Declared STAC API conformance classes are actually implemented.
- [ ] Extensions are declared correctly.
- [ ] Stable standard extensions are preferred over custom fields.
- [ ] Custom fields use governed namespaces.
- [ ] Search queries have resource limits.

### Provenance and lineage

- [ ] Producing/provider organisations are identified.
- [ ] Derived datasets identify relevant source datasets.
- [ ] Source versions can be determined where reproducibility requires it.
- [ ] Processing provenance is recorded at appropriate detail.
- [ ] Lineage relationships are machine-resolvable where practical.
- [ ] Public lineage excludes unnecessary sensitive infrastructure detail.

### Licensing and attribution

- [ ] Every published dataset has explicit licensing status.
- [ ] SPDX identifiers/expressions are used where appropriate.
- [ ] Non-standard licences link to the relevant terms.
- [ ] Unknown licence is not interpreted as unrestricted.
- [ ] Required attribution is machine and human discoverable.
- [ ] Third-party attribution survives downstream presentation.
- [ ] Composite datasets do not claim rights the publisher does not possess.

### Versioning

- [ ] Dataset releases have an explicit version model.
- [ ] Material releases can be referenced immutably.
- [ ] Historical versions remain available where required.
- [ ] `latest` resolves to a concrete version.
- [ ] Superseded/withdrawn states are explicit.
- [ ] Semantic metadata changes are auditable where required.

### Tile catalogs

- [ ] Tile format is known.
- [ ] Tile matrix set is identified.
- [ ] CRS is defined.
- [ ] Zoom/scale availability is defined.
- [ ] Spatial bounds/limits are represented.
- [ ] Attribution is available.
- [ ] Vector-tile layer/property schemas are documented where applicable.
- [ ] Tile products remain traceable to their source dataset/version.

### Imagery catalogs

- [ ] Platform/instrument metadata exists where applicable.
- [ ] Resolution is represented.
- [ ] Processing level/method is discoverable.
- [ ] Band order and semantics are documented.
- [ ] Units, scale/offset, and nodata are defined where applicable.
- [ ] Thumbnails are clearly distinguished from authoritative assets.
- [ ] Mosaics/composites expose meaningful temporal/provenance information.

### Quality

- [ ] Dataset quality dimensions are explicitly defined.
- [ ] Quality flags have documented meanings.
- [ ] Measurable values are preferred over vague quality labels.
- [ ] Unknown quality is distinct from pass.
- [ ] Quality provenance is available where interpretation requires it.
- [ ] Critical quality failures affect publication appropriately.

### Validation

- [ ] Schema validation runs before publication.
- [ ] Identifier uniqueness is checked.
- [ ] Geometry validity is checked.
- [ ] Temporal validity is checked.
- [ ] CRS metadata is checked.
- [ ] Licence metadata is checked.
- [ ] Required assets/links are verified.
- [ ] Semantic consistency is validated in addition to syntax.

### Publishing

- [ ] Draft and published state are distinct.
- [ ] Publication uses a controlled workflow.
- [ ] Required review/approval occurs.
- [ ] Publication does not expose incomplete asset sets.
- [ ] Publication is idempotent.
- [ ] Conflicting concurrent publication is controlled.
- [ ] Search/index success is part of publication verification.
- [ ] Withdrawal and archival have explicit semantics.

### Asset integrity

- [ ] Asset media types are accurate.
- [ ] Immutable assets have appropriate content identity/checksums where needed.
- [ ] Cloud-optimised claims are validated.
- [ ] Signed URLs are not persisted as inappropriate permanent identifiers.
- [ ] Nodata/mask semantics are documented.
- [ ] Large derived previews do not replace authoritative assets.

### Security and multi-tenancy

- [ ] Metadata discovery is independently authorised from asset access.
- [ ] Sensitive metadata fields are classified.
- [ ] Public metadata excludes internal infrastructure details.
- [ ] Search counts/facets do not leak restricted data.
- [ ] Tenant isolation is enforced server-side.
- [ ] Client-supplied tenant filters are not security boundaries.

### Documentation

- [ ] Material datasets have sufficient human documentation.
- [ ] Machine-readable metadata contains critical machine semantics.
- [ ] Documentation explains important limitations.
- [ ] Persistent citation identifiers are exposed where applicable.
- [ ] Archived data retains sufficient interpretive metadata.

### UX and accessibility

- [ ] Catalog search is usable without requiring map-only interaction.
- [ ] Spatial extent has non-visual/structured interpretation where needed.
- [ ] Quality/status/licence do not rely solely on colour.
- [ ] Catalog editing uses canonical Forms & Validation.
- [ ] Result tables follow Tables & Data Grid standards.
- [ ] shadcn/ui Components and Design Tokens are used for organisation-owned catalog UI.
- [ ] Publication state is authoritative rather than optimistic-only UI state.

### Observability and testing

- [ ] Publication success/failure is measured.
- [ ] Search-index lag is observable.
- [ ] Broken asset/catalog links are detectable.
- [ ] Metadata completeness is measurable where useful.
- [ ] Global edge cases such as antimeridian/polar datasets are tested where relevant.
- [ ] Authorization search leakage is tested.
- [ ] Publication/retry/withdrawal/version workflows are tested.

---

# 5. Canonical summary

Geospatial metadata MUST make a dataset **discoverable, interpretable, attributable, reproducible, and governable**.

**STAC SHOULD be the preferred interoperable model for spatiotemporal assets where its Item, Collection, Catalog, and Asset abstractions fit the data.**

**Gold Standard 2026 implementations SHOULD target the current stable STAC 1.1 family and STAC API 1.0 family unless compatibility requirements require another supported version.**

**Equivalent standards such as OGC API - Records, ISO 19115-family profiles, and DCAT-based catalog models MAY be used where they better match the metadata domain, but multiple representations MUST NOT create inconsistent authoritative metadata.**

**A metadata record is part of the dataset contract. CRS, licence, temporal meaning, quality, lineage, and version changes MUST NOT be treated as inconsequential documentation edits.**

**Dataset, Collection, Item, and asset identities MUST be stable. Human-readable titles and storage filenames MUST NOT become the only canonical identity.**

**Spatial metadata MUST expose meaningful coverage and native spatial-reference information. STAC/GeoJSON discovery coordinates MUST NOT be confused with the native CRS of the underlying asset.**

**Temporal metadata MUST represent the time the data actually describes. Acquisition, observation, validity, processing, publication, and ingestion timestamps MUST NOT be conflated.**

**Catalog search SHOULD support the primary spatial, temporal, textual, collection, provider, product, quality, and licence dimensions required by users. Search, facets, counts, thumbnails, and suggestions MUST enforce authorization.**

**Collections MUST represent coherent dataset families. Catalog hierarchy MUST aid navigation but MUST NOT substitute for searchable structured metadata.**

**Derived datasets MUST retain sufficient provenance and lineage to identify the source data and material processing steps. Where reproducibility matters, source versions MUST be recoverable.**

**Every published dataset MUST have explicit licensing status. Unknown licence MUST NOT be interpreted as public or unrestricted. SPDX identifiers/expressions SHOULD be used where applicable, and required attribution MUST survive downstream use.**

**Material dataset releases MUST have an explicit version model. Reproducible workflows SHOULD pin concrete versions rather than mutable `latest` references.**

**Published immutable versions MUST NOT have their data silently replaced in place. Superseded, deprecated, withdrawn, and archived states MUST have explicit semantics.**

**Tile catalogs MUST describe tile format, tile matrix set, CRS, usable levels, bounds, source dataset, and attribution as applicable. A `{z}/{x}/{y}` URL alone is not catalog metadata.**

**Interoperable tiled services SHOULD use OGC API - Tiles and OGC Tile Matrix Set / Tile Set Metadata where those standards fit the use case.**

**Imagery catalogs SHOULD expose the acquisition, platform/instrument, bands, resolution, processing, nodata, quality, and other domain metadata required for correct interpretation. Stable STAC extensions SHOULD be preferred to proprietary duplicate fields.**

**Quality metadata MUST be explicit and machine interpretable where automated selection depends on it. Unknown, unassessed, warning, and failed quality MUST NOT be conflated.**

**Publication MUST include schema and semantic validation. A syntactically valid record containing an incorrect CRS, broken asset, false extent, or missing licence is not publication-ready.**

**Publishing MUST use a controlled lifecycle with draft, validation, review, publication, verification, deprecation/withdrawal, and archival behaviour appropriate to the dataset.**

**Publication SHOULD be atomic from the consumer's perspective. A dataset MUST NOT appear fully published while required assets, metadata, or discovery indexes remain incomplete.**

**Catalog publication MUST be idempotent, version-aware, and safe under retry and concurrent execution.**

**Asset access and metadata discovery are separate authorization decisions. Protected assets MUST NOT become discoverable through metadata leakage unless policy explicitly permits that discovery.**

**Temporary signed URLs SHOULD NOT be persisted as long-lived catalog identities. Catalog references MUST remain meaningful after one access credential expires.**

**Public metadata MUST follow data-minimisation requirements. Internal buckets, hostnames, database identifiers, and sensitive processing infrastructure MUST NOT leak merely because they are available internally.**

**Metadata APIs MUST follow canonical API rules for authentication, authorization, pagination, validation, rate control, and errors. STAC API conformance MUST be claimed only for capabilities actually implemented.**

**Catalog editing and publishing UI MUST distinguish local draft, saved draft, validated, approved, and published states. Optimistic client state MUST NOT be represented as authoritative publication.**

**Map-based discovery MUST have accessible non-map alternatives. Quality, licence, restriction, and publication state MUST NOT rely on colour or cartographic symbology alone.**

**Organisation-owned catalog interfaces MUST use canonical shadcn/ui Components, Design Tokens, Forms & Validation, Tables & Data Grid, Accessibility, and Pattern standards. shadcn/ui has no role in defining geospatial metadata semantics.**

The Gold Standard is achieved when a consumer can **find a spatial dataset, understand where and when it applies, determine its CRS and quality, trace its lineage, identify its licence and attribution duties, pin the exact version used, access the correct asset, and reproduce that interpretation later without relying on tribal knowledge or reverse engineering.**

For the 2026 interoperability baseline, OGC now publishes **STAC 1.1.0** and **STAC API 1.0.0** as Community Standards; STAC defines Item, Catalog, Collection, assets, GeoJSON-based spatial discovery, extensions, providers, extents, and licensing semantics. citeturn921287search0turn921713search0turn921713search2 OGC API - Records 1.0 provides the complementary metadata-record discovery model, while OGC API - Tiles 1.0 and Tile Matrix Set / Tile Set Metadata 2.0 provide standards-based tile discovery metadata. citeturn921287search7turn676353search1turn676353search0
