---
id: "env-data-quality"
title: "Scientific & Environmental Data Quality"
domain: "data"
status: "draft"
version: "0.1.0"
owner: "@dale"
tags: ["data", "env", "scientific", "environmental", "quality"]
applies_to: ["data"]
related: []
legacy_number: 84
created: "2026-09-23"
updated: "2026-09-23"
review_by: "2026-12-22"
chars: 59275
provenance: baseline

---

# Scientific & Environmental Data Quality Guidelines — Gold Standard 2026

**Canonical placement:** Data & Database → **Data Quality** → Privacy & Data Governance → Documentation

---

# 1. Purpose

Scientific and environmental data are meaningful only when their measurement basis, uncertainty, provenance, quality state, temporal semantics, and transformations remain explicit.

This standard defines the canonical requirements for:

- physical units and measurement discipline;
- significant figures and precision;
- measurement uncertainty;
- error and uncertainty propagation;
- quality-control flags;
- provenance and lineage;
- missing data;
- gap filling and imputation;
- instrument and sensor metadata;
- calibration and maintenance history;
- detection and quantification limits;
- temporal aggregation;
- spatial aggregation;
- source comparability;
- harmonization;
- derived variables;
- reproducibility;
- dataset releases;
- citable versioning;
- scientific data administration interfaces.

Scientific data pipelines **MUST** preserve enough information to distinguish:

```text
what was observed
what instrument or method produced it
where and when it was observed
which units and reference frame apply
how uncertain the value is
which quality controls were applied
which transformations were performed
which dataset version contains it
```

A numeric value without these semantics **MUST NOT** be treated as a complete scientific observation where those semantics affect interpretation.

Raw observations, corrected observations, gap-filled values, aggregated values, and modeled or derived values **MUST** remain distinguishable.

Data cleaning **MUST NOT** silently rewrite scientific history.

The canonical principle is:

```text
measurement
→ metadata
→ quality assessment
→ transformation
→ derived product
→ versioned publication
```

Each transition **MUST** be traceable.

This standard aligns with the canonical **Security**, **Data & Database**, **API**, **State Management**, **Forms & Validation**, **Accessibility**, **Design Tokens**, **Component**, and **Pattern** standards.

For scientific-data review and administration interfaces, **shadcn/ui is the component baseline**.

---

# 2. Rules

## 2.1 Scientific observation model

Every scientific observation **MUST** have sufficient context to interpret its value.

A canonical observation model **SHOULD** support, where applicable:

```text
observation_id
variable
value
unit
timestamp / interval
location / geometry
instrument_id
method_id
quality_flag
uncertainty
detection_limit
provenance
source_dataset
processing_level
```

Not every field is required for every discipline, but omitted semantics **MUST** be genuinely inapplicable rather than merely unavailable.

The schema **MUST** distinguish observed values from metadata describing the observation.

---

## 2.2 Measurement semantics

Every measured variable **MUST** have a documented scientific definition.

The definition **SHOULD** identify where relevant:

- quantity being measured;
- medium or matrix;
- sampling method;
- coordinate or reference system;
- vertical datum;
- reference pressure or temperature;
- dry/wet basis;
- concentration basis;
- averaging interval;
- instrument or analytical method.

A field named:

```text
temperature
```

**MUST NOT** be considered sufficiently specified when interpretation depends on whether it means:

```text
air temperature
surface temperature
water temperature
soil temperature
brightness temperature
```

or another materially different quantity.

---

## 2.3 Units

Every physical quantity **MUST** have an explicit unit unless it is dimensionless by definition.

Units **MUST** be machine-readable and documented.

The platform **SHOULD** use SI units or an established domain-standard representation as its canonical internal form.

Alternate presentation units **MAY** be used in UI or exports, but the conversion **MUST** be deterministic and documented.

A numeric field **MUST NOT** depend on undocumented implicit units.

Avoid:

```json
{
  "temperature": 22.4
}
```

Prefer:

```json
{
  "temperature": {
    "value": 22.4,
    "unit": "Cel"
  }
}
```

or a schema in which the unit is defined explicitly at the variable level.

---

## 2.4 Unit identifiers

Unit identifiers **SHOULD** use a recognized machine-readable vocabulary such as an approved UCUM-compatible or discipline-standard representation.

Human display labels **MAY** differ from storage identifiers.

For example:

```text
storage: Cel
display: °C
```

Unit labels **MUST NOT** be ambiguous.

A symbol such as:

```text
ppm
```

**MUST** specify the applicable basis where several interpretations are possible.

---

## 2.5 Unit conversion

Unit conversion **MUST** preserve physical meaning.

Conversions **MUST** distinguish between:

- multiplicative conversions;
- affine conversions;
- conversions requiring environmental context;
- non-equivalent quantities.

For example, converting temperature between Celsius and Kelvin is valid.

Converting mass concentration to mixing ratio **MUST NOT** be performed without the environmental state required by the conversion.

The conversion algorithm and assumptions **MUST** be documented for derived values.

---

## 2.6 Reference conditions

Measurements whose interpretation depends on reference conditions **MUST** preserve those conditions.

Examples include:

- gas volumes at standard temperature and pressure;
- dry versus wet gas concentrations;
- salinity scales;
- sea-level versus station pressure;
- height above ellipsoid versus mean sea level;
- laboratory reference temperatures.

Two measurements with the same numeric unit **MUST NOT** be treated as directly comparable if their reference conditions are materially different.

---

## 2.7 Precision and significant figures

Stored numerical precision **MUST NOT** imply greater measurement certainty than exists.

Systems **SHOULD** preserve raw instrument precision during ingestion when technically practical.

Published or displayed values **SHOULD** use precision consistent with measurement uncertainty and scientific convention.

Rounding **SHOULD** occur at presentation or final publication boundaries rather than repeatedly throughout intermediate computation.

Intermediate calculations **SHOULD** retain sufficient numeric precision to avoid cumulative rounding error.

---

## 2.8 Numeric data types

Floating-point, decimal, integer-scaled, or other numeric types **MUST** be selected according to the measurement and computation requirements.

Binary floating-point **MAY** be appropriate for continuous scientific measurement.

Fixed-point or integer-scaled representation **SHOULD** be considered where exact decimal representation is materially important.

Sentinel numeric values such as:

```text
-999
-9999
99999
```

**MUST NOT** be used as the canonical representation of missing data when the storage format supports explicit missingness.

---

## 2.9 Measurement uncertainty

Measurements **SHOULD** carry uncertainty information where the uncertainty is scientifically material and can be quantified.

Uncertainty **MUST** identify its interpretation where ambiguity is possible.

Examples include:

- standard uncertainty;
- expanded uncertainty;
- confidence interval;
- standard error;
- instrument accuracy specification;
- estimated model uncertainty.

A field named:

```text
error
```

**SHOULD NOT** be used without defining whether it means:

- signed residual;
- absolute error;
- standard deviation;
- confidence interval;
- measurement uncertainty.

---

## 2.10 Uncertainty metadata

When uncertainty is published, the dataset **MUST** document:

- uncertainty quantity;
- unit;
- coverage or confidence level where applicable;
- method used to estimate it;
- whether it is symmetric or asymmetric;
- major assumptions.

For expanded uncertainty, the coverage factor or confidence basis **SHOULD** be recorded where applicable.

---

## 2.11 Random and systematic uncertainty

Where scientifically material, uncertainty analysis **SHOULD** distinguish:

- random components;
- systematic components;
- correlated components.

Repeated observations **MUST NOT** be assumed statistically independent when common calibration, environmental, or methodological effects create correlation.

Averaging correlated measurements **MUST NOT** claim the same uncertainty reduction as averaging independent measurements.

---

## 2.12 Error propagation

Derived quantities **MUST** propagate input uncertainty where uncertainty materially affects interpretation.

For independent inputs, standard propagation methods **MAY** be used.

For a derived quantity:

```text
y = f(x₁, x₂, ..., xₙ)
```

a first-order propagation model may use:

```text
u²(y) ≈ Σ (∂f/∂xᵢ)² u²(xᵢ)
```

when assumptions are appropriate.

Where input quantities are correlated, covariance terms **MUST** be considered.

The uncertainty propagation method **MUST** match the mathematical and statistical assumptions of the calculation.

---

## 2.13 Monte Carlo uncertainty propagation

Monte Carlo or ensemble-based uncertainty propagation **SHOULD** be used when:

- transformations are strongly nonlinear;
- input distributions are non-Gaussian;
- clipping or thresholds are present;
- covariance structure is complex;
- analytical propagation becomes unreliable.

Simulation settings **MUST** be reproducible.

Relevant information **SHOULD** include:

- distribution assumptions;
- sample count;
- random-seed policy;
- covariance model.

---

## 2.14 Uncertainty versus variability

Natural environmental variability **MUST NOT** be conflated with measurement uncertainty.

For example:

```text
hourly standard deviation
```

may describe variability within the hour rather than uncertainty in the hourly mean.

Datasets **MUST** label these quantities distinctly.

---

## 2.15 Detection limits

Analytical measurements with detection or quantification thresholds **SHOULD** record relevant limits.

The model **SHOULD** distinguish where applicable:

- limit of detection;
- limit of quantification;
- reporting limit.

A result below a limit **MUST NOT** automatically be rewritten to zero.

Representations such as:

```text
<0.5 µg/L
```

**MUST** preserve both the censoring state and the applicable threshold.

---

## 2.16 Censored observations

Censored observations **MUST** remain distinguishable from exact numeric values.

The schema **SHOULD** represent:

```text
value
censoring_type
censoring_limit
```

or an equivalent explicit structure.

Statistical analysis of censored data **MUST NOT** silently substitute:

```text
0
LOD / 2
LOQ / 2
```

without documented methodological justification.

---

## 2.17 Quality-control flags

Scientific datasets **MUST** support explicit QC status where observations undergo quality assessment.

QC flags **MUST** have documented semantics.

A canonical vocabulary **SHOULD** distinguish concepts equivalent to:

```text
not_evaluated
good
suspect
bad
estimated
missing
```

Domain-specific extensions **MAY** be used.

A QC flag **MUST NOT** alter the stored observation value silently.

---

## 2.18 QC flag hierarchy

Where multiple QC tests are applied, the system **SHOULD** distinguish:

- individual test outcomes;
- aggregate observation status.

For example:

```text
range_test: pass
spike_test: fail
persistence_test: pass
aggregate_qc: suspect
```

The aggregation rule **MUST** be documented.

A single final flag **MUST NOT** destroy diagnostically useful test-level information when that information is required for scientific review.

---

## 2.19 Automated QC

Automated QC **SHOULD** use versioned rules.

QC logic **MUST** identify:

- algorithm/version;
- thresholds;
- reference data;
- execution time where relevant.

Changing a QC threshold **MUST NOT** silently rewrite historical quality state without creating a traceable new processing version.

---

## 2.20 Manual QC

Manual QC decisions **MUST** be attributable.

The system **SHOULD** record:

```text
reviewer
decision
reason
timestamp
previous_status
new_status
```

Manual edits **MUST NOT** destroy original automated results.

High-impact manual corrections **SHOULD** require explanatory notes.

---

## 2.21 Raw data preservation

Original ingested observations **SHOULD** be preserved immutably where retention, cost, and source licensing permit.

Raw values **MUST NOT** be overwritten by corrected values when reproducibility requires the original observation.

The data model **SHOULD** distinguish processing levels such as:

```text
raw
calibrated
quality_controlled
gap_filled
aggregated
derived
```

or the relevant disciplinary equivalents.

---

## 2.22 Corrections

A scientifically corrected value **MUST** remain traceable to the original observation.

Correction metadata **SHOULD** record:

- correction method;
- algorithm/version;
- parameters;
- correction time;
- reason;
- source observation.

Corrected data **MUST NOT** be presented as unmodified raw observation.

---

## 2.23 Provenance

Every published scientific dataset **MUST** have provenance sufficient to reproduce or audit its origin.

Provenance **SHOULD** identify:

- source dataset;
- source organization;
- instrument or method;
- processing software;
- processing version;
- transformation chain;
- calibration information;
- relevant configuration;
- publication/release version.

Provenance **MUST** remain machine-accessible where practical.

---

## 2.24 Observation lineage

Derived observations **MUST** have lineage to their inputs where reproducibility or auditability requires it.

Lineage **MAY** be represented at:

- individual observation level;
- file/partition level;
- processing batch level;
- dataset version level.

The granularity **MUST** be sufficient to reproduce the published result.

---

## 2.25 Provenance identifiers

Instruments, datasets, methods, stations, sites, processing runs, and releases **SHOULD** use stable identifiers.

Human-readable labels **MUST NOT** be the only persistent identity when labels can change.

For example:

```text
station_id = stn_0184
station_name = Bukit Example
```

Renaming the station **MUST NOT** create a new scientific identity unless it represents a genuinely different observing entity.

---

## 2.26 Missing data

Missing data **MUST** be represented explicitly.

The system **SHOULD** distinguish different reasons for missingness where they matter scientifically.

Examples include:

```text
not_observed
instrument_failure
quality_rejected
below_detection_limit
not_applicable
transmission_failure
withheld
```

A single null may be acceptable for storage, but missingness reason **SHOULD** be retained separately where interpretation requires it.

---

## 2.27 Missing versus zero

Missing observations **MUST NOT** be converted to zero unless zero is scientifically justified.

Examples:

```text
no rainfall observed = potentially valid zero
rain gauge offline = missing
```

Those states **MUST** remain distinct.

---

## 2.28 Not applicable

`not_applicable` **MUST** remain distinct from:

```text
missing
unknown
zero
not_detected
```

where those concepts have different scientific meaning.

---

## 2.29 Gap filling

Gap-filled or imputed values **MUST** remain distinguishable from direct observations.

The dataset **MUST** identify:

- that gap filling occurred;
- method;
- algorithm/version;
- input data;
- relevant parameters;
- uncertainty where practical.

A gap-filled value **MUST NOT** silently replace an observed missing value in the canonical raw dataset.

---

## 2.30 Gap-filling methods

Gap-filling methods **SHOULD** be selected according to the temporal, spatial, and physical characteristics of the variable.

Possible methods include:

- interpolation;
- climatological substitution;
- neighboring station substitution;
- regression;
- state-space estimation;
- physical modeling;
- machine-learning estimation.

The method **MUST** be scientifically justified.

Convenience alone **MUST NOT** determine the gap-filling algorithm.

---

## 2.31 Gap-length limits

Interpolation or other local gap filling **MUST** define a maximum supported gap length where reliability degrades with gap duration.

A method suitable for two missing samples **MUST NOT** automatically be applied to several months of absent data.

Long gaps **SHOULD** remain missing unless an appropriate model-based reconstruction is explicitly used.

---

## 2.32 Gap-fill uncertainty

Gap-filled values **SHOULD** include uncertainty estimates where they can materially affect downstream analysis.

Gap-fill uncertainty **MUST NOT** be represented as if it were ordinary instrument measurement uncertainty unless the two have been explicitly combined.

---

## 2.33 Derived data

Derived variables **MUST** identify the transformation from source variables.

The derivation **SHOULD** define:

- equation or algorithm;
- parameter values;
- software version;
- input units;
- output units;
- uncertainty treatment;
- QC propagation.

A derived variable **MUST NOT** be labeled as directly measured.

---

## 2.34 QC propagation

Derived and aggregated values **MUST** have explicit QC propagation rules.

For example, an hourly mean based on twelve five-minute measurements **MUST** define how:

- bad inputs;
- suspect inputs;
- estimated inputs;
- missing inputs;

affect the aggregate flag.

The aggregate QC rule **MUST NOT** depend on undocumented application behavior.

---

## 2.35 Instrument identity

Every observation produced by instrumentation **SHOULD** be associated with a stable instrument identifier where instrument history matters.

Instrument metadata **SHOULD** include:

- manufacturer;
- model;
- serial number;
- sensor type;
- firmware version where relevant;
- deployment location;
- installation height/depth;
- orientation;
- measurement range;
- nominal resolution.

Instrument replacement **MUST** be represented explicitly when it affects comparability.

---

## 2.36 Instrument deployment metadata

Instrument identity and deployment identity **SHOULD** be distinct when the same instrument can be moved.

A deployment record **SHOULD** include:

```text
instrument_id
site_id
valid_from
valid_to
height_or_depth
orientation
configuration
```

Moving an instrument **MUST NOT** silently rewrite the location of historical observations.

---

## 2.37 Calibration metadata

Calibrated measurements **MUST** preserve relevant calibration history.

Calibration records **SHOULD** include:

- instrument;
- calibration date;
- calibration method;
- reference standard;
- calibration coefficients;
- validity interval;
- technician or laboratory where relevant;
- certificate/reference identifier.

Observations **SHOULD** be traceable to the calibration state applicable when they were collected.

---

## 2.38 Calibration coefficients

Calibration coefficients **MUST** be versioned when they change.

Historical observations **MUST NOT** silently use coefficients from a future calibration unless a retrospective correction process explicitly applies them.

If retrospective recalibration occurs, the resulting data **MUST** form a new processing version or release.

---

## 2.39 Calibration validity

Calibration validity intervals **SHOULD** be explicit.

A measurement collected outside an instrument's valid calibration period **SHOULD** be flagged, rejected, or otherwise classified according to domain policy.

Such observations **MUST NOT** silently receive the same quality status as measurements known to be within calibration.

---

## 2.40 Maintenance events

Maintenance that can influence measurement continuity or comparability **SHOULD** be recorded.

Examples include:

- sensor replacement;
- cleaning;
- filter replacement;
- battery replacement;
- relocation;
- firmware update;
- inlet change.

Maintenance metadata **SHOULD** be temporally linked to observations.

---

## 2.41 Method metadata

Laboratory and analytical datasets **MUST** identify the analytical method where method differences affect comparability.

The method record **SHOULD** identify:

- procedure/version;
- instrument class;
- sample preparation;
- detection limits;
- quality-control protocol;
- reference standards.

A methodological change **MUST** be treated as a possible discontinuity in the data series.

---

## 2.42 Spatial metadata

Observations with spatial meaning **MUST** have explicit coordinate semantics.

The schema **MUST** identify where applicable:

- coordinate reference system;
- latitude/longitude order;
- horizontal datum;
- vertical datum;
- elevation/depth reference;
- geometry type.

Coordinates **MUST NOT** be assumed to use a specific CRS merely because they resemble latitude and longitude.

---

## 2.43 Location uncertainty

Where location precision is scientifically relevant, location uncertainty **SHOULD** be represented.

Approximate locations **MUST NOT** be published with false precision.

For example, a site known only within one kilometer **MUST NOT** be represented in a way that implies centimeter accuracy.

---

## 2.44 Privacy-sensitive locations

Locations involving sensitive human, ecological, cultural, or protected-site information **MUST** follow Privacy & Data Governance requirements.

Spatial generalization, withholding, or access restriction **MAY** be necessary.

A privacy-protected coordinate **MUST** be clearly identified as generalized or transformed rather than original measurement location.

---

## 2.45 Time semantics

Every temporal observation **MUST** identify whether its timestamp represents:

- instant;
- interval start;
- interval end;
- interval midpoint;
- reporting time.

This semantic **MUST** be consistent within a variable or explicitly encoded per observation.

---

## 2.46 Timezone

Scientific timestamps representing absolute instants **SHOULD** be stored in UTC or another unambiguous timezone-aware representation.

Local civil time **MAY** be retained as metadata when scientifically relevant.

A timestamp **MUST NOT** depend on an implicit server timezone.

Daylight-saving transitions **MUST** be handled explicitly where local time is used.

---

## 2.47 Sampling interval

Sampling or reporting interval **SHOULD** be documented.

Irregular observations **MUST NOT** be treated as regularly sampled without resampling or explicit weighting.

The platform **SHOULD** preserve original timestamps even when a regularized series is later produced.

---

## 2.48 Temporal aggregation

Temporal aggregates **MUST** define:

- source frequency;
- aggregation interval;
- interval boundary convention;
- timezone;
- statistic;
- completeness threshold;
- QC propagation rule.

For example:

```text
hourly mean
from 5-minute observations
UTC-aligned
minimum 9 of 12 valid observations
```

is materially more reproducible than simply:

```text
hourly average
```

---

## 2.49 Aggregation operators

The aggregation operator **MUST** match the physical quantity.

Examples:

- temperature may use arithmetic mean;
- rainfall accumulation may use sum;
- wind direction requires circular statistics;
- concentration exposure may require time weighting;
- extremes may require min/max.

A generic arithmetic mean **MUST NOT** be applied to every variable type.

---

## 2.50 Weighted aggregation

Irregularly sampled data **SHOULD** use time-weighted aggregation where required by physical meaning.

A simple average of unequally spaced samples **MUST NOT** be used if it creates a biased estimate of the time-average quantity.

Weighting methodology **MUST** be documented.

---

## 2.51 Aggregate completeness

Aggregated values **MUST** define a minimum completeness criterion.

The threshold **SHOULD** be scientifically justified.

An aggregate calculated from insufficient source coverage **MUST** be:

- marked missing;
- marked incomplete;
- or explicitly flagged.

It **MUST NOT** be silently treated as equivalent to a complete interval.

---

## 2.52 Aggregate coverage metadata

Aggregates **SHOULD** preserve coverage information such as:

```text
expected_count
observed_count
valid_count
coverage_fraction
```

where useful.

Coverage **MUST** be distinguished from uncertainty.

---

## 2.53 Temporal boundaries

Daily, monthly, seasonal, and annual aggregation **MUST** define boundary semantics.

The system **MUST** document:

- timezone;
- leap-day handling;
- leap-second policy where relevant;
- month boundaries;
- hydrological or climatological year definitions where applicable.

"Daily" **MUST NOT** be assumed to mean UTC midnight-to-midnight in every scientific domain.

---

## 2.54 Temporal resampling

Resampling **MUST** be represented as a transformation.

Upsampling **MUST NOT** be mistaken for creation of new observations.

For example, turning hourly values into one-minute repeated values **MUST NOT** imply minute-resolution measurement.

Interpolated values **MUST** retain their derived status.

---

## 2.55 Spatial aggregation

Spatial aggregation **MUST** document:

- source geometry;
- target geometry;
- weighting;
- area treatment;
- projection;
- missing-data treatment.

Area-weighted variables **MUST** use appropriate weighting.

A simple average across stations **MUST NOT** be interpreted as an area mean unless the station network and methodology justify that interpretation.

---

## 2.56 Comparability across sources

Datasets from different sources **MUST NOT** be assumed comparable because variable names and units match.

Comparability review **MUST** consider:

- measurement definition;
- unit;
- reference conditions;
- calibration;
- instrument type;
- sampling method;
- spatial support;
- temporal support;
- detection limit;
- QC methodology;
- processing level.

---

## 2.57 Harmonization

Cross-source harmonization **MUST** preserve the original source values and provenance.

Harmonized values **MUST** identify:

- transformation;
- source vocabulary mapping;
- unit conversion;
- calibration adjustment;
- temporal/spatial transformation;
- version.

Harmonization **MUST NOT** erase scientifically important source differences.

---

## 2.58 Variable mapping

Mapping two source variables to one canonical variable **MUST** require semantic equivalence sufficient for the intended use.

Name similarity alone **MUST NOT** establish equivalence.

Mappings **SHOULD** have explicit statuses such as:

```text
equivalent
conditionally_comparable
not_comparable
```

where appropriate.

---

## 2.59 Method discontinuities

Changes in instrumentation, method, siting, calibration, or processing **MUST** be treated as potential data discontinuities.

The dataset **SHOULD** expose change points in metadata.

Time-series analysis **MUST NOT** assume homogeneity across known methodological changes without evaluation.

---

## 2.60 Bias correction

Bias correction across instruments or datasets **MUST** be documented as a transformation.

The correction model **SHOULD** include:

- reference source;
- fitting interval;
- equation/model;
- validation statistics;
- applicability range.

Bias-corrected values **MUST NOT** replace original source measurements without preserving provenance.

---

## 2.61 Comparability matrices

Large multi-source systems **SHOULD** maintain explicit compatibility metadata for variables and methods.

This may include a matrix describing whether sources are:

- directly comparable;
- comparable after transformation;
- comparable only within a restricted range;
- unsuitable for combined analysis.

Such metadata **SHOULD** be machine-readable where practical.

---

## 2.62 Data validation

Scientific data pipelines **MUST** validate structural and semantic constraints.

Validation **SHOULD** include where applicable:

- schema;
- unit;
- allowed ranges;
- timestamp ordering;
- coordinate validity;
- foreign-key/reference validity;
- physical plausibility;
- duplicate observations.

Structural validation **MUST NOT** be represented as complete scientific QC.

---

## 2.63 Range checks

Range checks **SHOULD** distinguish:

- impossible values;
- physically plausible but unusual values;
- climatologically unusual values.

A statistically rare value **MUST NOT** automatically be deleted.

Outliers **SHOULD** be flagged for assessment rather than silently removed.

---

## 2.64 Spike and persistence checks

Time-series QC **MAY** include:

- spike detection;
- rate-of-change tests;
- persistence/stuck-sensor detection;
- neighbor comparison;
- climatological consistency.

Thresholds **MUST** be variable- and context-appropriate.

A generic threshold copied across unrelated variables **SHOULD NOT** be used.

---

## 2.65 Duplicate observations

Duplicate detection **MUST** define what constitutes the identity of an observation.

Possible uniqueness dimensions include:

```text
station
instrument
variable
timestamp
sampling_depth
method
```

Two measurements sharing the same timestamp **MUST NOT** automatically be considered duplicates if they represent independent instruments or replicates.

---

## 2.66 Replicate measurements

Replicate observations **SHOULD** remain individually identifiable where they are scientifically meaningful.

Replicates **MUST NOT** be collapsed into a single value without a documented aggregation rule.

---

## 2.67 Outlier treatment

Outlier treatment **MUST** be documented.

Possible outcomes include:

- retain as good;
- mark suspect;
- reject;
- correct;
- replace with estimated value.

Original values **SHOULD** remain recoverable.

Removing outliers solely because they weaken a preferred statistical result **MUST NOT** be permitted.

---

## 2.68 Reproducible processing

Published derived datasets **MUST** be reproducible to a level appropriate for their intended scientific use.

Processing **SHOULD** record:

- source versions;
- code version;
- configuration;
- algorithms;
- execution environment where material;
- processing timestamp.

Manual undocumented spreadsheet edits **SHOULD NOT** be part of canonical production scientific pipelines.

---

## 2.69 Determinism

Processing pipelines **SHOULD** be deterministic where the method permits.

When stochastic methods are used, reproducibility metadata **SHOULD** include:

- random seed;
- model version;
- initialization method;
- stochastic configuration.

Non-deterministic outputs **MUST** be identified as such where exact reproduction cannot be guaranteed.

---

## 2.70 Processing levels

Datasets **SHOULD** identify processing level consistently.

An organization **MAY** define levels such as:

```text
L0 — raw/native
L1 — calibrated
L2 — QC and scientifically derived variables
L3 — temporally/spatially aggregated
L4 — model or gridded product
```

The exact vocabulary **MAY** differ by discipline.

Processing level **MUST** have documented meaning.

---

## 2.71 Dataset identity

Every published dataset **MUST** have a stable dataset identity independent of individual file names.

A dataset identity **SHOULD** remain stable across compatible revisions where the scientific product remains conceptually the same.

A materially different product **SHOULD** receive a distinct dataset identity rather than being disguised as a minor revision.

---

## 2.72 Dataset versions

Published scientific datasets **MUST** have explicit versions.

Versions **MUST** allow users to determine exactly which data were used in an analysis.

A mutable URL labeled only:

```text
latest.csv
```

**MUST NOT** be the sole means of scientific citation.

The latest alias **MAY** exist for convenience, but immutable versioned releases **MUST** also exist.

---

## 2.73 Version semantics

Dataset versioning **SHOULD** distinguish:

- metadata-only corrections;
- additional observations;
- QC revisions;
- recalibration;
- algorithm changes;
- reprocessing;
- breaking semantic changes.

The versioning strategy **MUST** be documented.

A major reprocessing that changes scientific values **MUST NOT** be published under the same immutable release identifier.

---

## 2.74 Immutable releases

A citable dataset release **MUST** be immutable.

If an error is found, the publisher **MUST** create:

- a corrected release;
- an erratum;
- or an explicit tombstone where distribution must cease.

A citable release **MUST NOT** silently change in place.

---

## 2.75 Dataset citation

Citable scientific datasets **SHOULD** provide a persistent identifier where the publication environment supports one.

Citation metadata **SHOULD** include:

- creator or organization;
- dataset title;
- version;
- publication year/date;
- publisher/repository;
- persistent identifier;
- access information where appropriate.

Scientific outputs **SHOULD** cite a specific dataset version rather than only a landing page.

---

## 2.76 File checksums

Published files **SHOULD** provide cryptographic checksums where integrity verification is useful.

A checksum **MUST** correspond to the immutable release file.

File replacement **MUST** therefore produce a different release artifact or version.

---

## 2.77 Release manifests

Dataset releases **SHOULD** include a machine-readable manifest describing:

- release version;
- files;
- file checksums;
- schemas;
- source datasets;
- processing version;
- release timestamp.

Large datasets **SHOULD** support partition-level identity where full release files are impractical.

---

## 2.78 Schema versioning

Data schema versions and dataset content versions **MUST** remain distinguishable.

A dataset may contain new observations without changing the schema.

Likewise, a schema may evolve without changing underlying scientific observations.

Consumers **MUST NOT** assume:

```text
dataset_version == schema_version
```

unless that coupling is explicitly defined.

---

## 2.79 API representation

Scientific-data APIs **MUST** preserve the same semantics as canonical stored data.

API responses **SHOULD** expose or make discoverable:

- unit;
- QC status;
- uncertainty;
- provenance;
- timestamp semantics;
- dataset version.

An API **MUST NOT** drop material scientific metadata merely to simplify the payload.

---

## 2.80 API unit selection

APIs **SHOULD** expose canonical units consistently.

If callers may request alternate units, responses **MUST** identify the unit actually returned.

Cached responses **MUST** include unit selection in the cache identity where different requested units produce different values.

---

## 2.81 API filtering

Scientific-data filtering **MUST** use explicit semantics.

Filters **SHOULD** support relevant dimensions such as:

- time range;
- site;
- variable;
- QC state;
- processing level;
- dataset version.

A query returning only "good" observations **MUST** make that exclusion behavior explicit.

---

## 2.82 API missing values

API responses **MUST NOT** encode missing numeric observations using undocumented magic numbers.

Missing values **SHOULD** use:

- `null`;
- explicit missing status;
- or an established scientific serialization convention.

If an export format requires fill values, the fill value **MUST** be declared in metadata.

---

## 2.83 Database constraints

Database-level constraints **MUST** enforce authoritative structural invariants where feasible.

Examples include:

- stable primary keys;
- valid foreign keys;
- unit-reference integrity;
- nonnegative uncertainty where required;
- valid interval ordering;
- dataset-version relationships.

Database constraints **MUST NOT** be used as a substitute for scientifically contextual QC.

A database can enforce:

```text
uncertainty >= 0
```

but cannot alone determine whether a temperature observation is climatologically plausible.

---

## 2.84 Data lineage storage

Lineage relationships **SHOULD** use stable identifiers rather than free-text descriptions.

Where a derived dataset uses many source datasets, lineage **SHOULD** support many-to-many relationships.

Lineage records **MUST** remain synchronized with dataset releases.

---

## 2.85 Privacy and governance

Scientific datasets involving personal, sensitive-location, indigenous, commercial, health, or restricted environmental data **MUST** follow the Privacy & Data Governance standard.

Open scientific utility **MUST NOT** override legal, ethical, contractual, or safety restrictions.

Access restrictions **SHOULD** be encoded at the dataset or field level where feasible.

---

## 2.86 Redaction and generalization

Redacted, generalized, or privacy-transformed scientific data **MUST** be identified as such.

Users **MUST NOT** be led to believe generalized data have the same precision as the source observations.

The transformation method **SHOULD** be documented to the extent security and privacy permit.

---

## 2.87 Retention

Raw, intermediate, and published data **MUST** have explicit retention rules.

Raw data **SHOULD** generally be retained long enough to support reproducibility and reprocessing where scientifically and legally justified.

Temporary processing artifacts **MAY** have shorter retention.

Published immutable releases **SHOULD** remain available according to repository and governance policy.

---

## 2.88 Data deletion

Required deletion **MUST** consider:

- raw data;
- intermediate products;
- published datasets;
- caches;
- derived datasets;
- search indexes;
- backups.

Where published scientific integrity conflicts with a deletion obligation, the resolution **MUST** follow applicable governance and legal requirements.

---

## 2.89 Data-quality documentation

Every published dataset **MUST** document its quality model.

Documentation **SHOULD** include:

- measurement methods;
- QC procedures;
- flag definitions;
- uncertainty;
- calibration;
- missing-data treatment;
- gap-filling methods;
- aggregation rules;
- known limitations;
- source comparability limitations.

A dataset **MUST NOT** claim to be "quality controlled" without describing what that means.

---

## 2.90 Known limitations

Known limitations **MUST** be documented prominently enough to influence scientific interpretation.

Examples include:

- sensor drift;
- calibration uncertainty;
- sparse spatial coverage;
- uncorrected bias;
- data gaps;
- method discontinuity;
- unreliable historical interval.

Limitations **MUST NOT** be hidden solely in internal engineering documentation.

---

## 2.91 Administrative UI baseline

Scientific-data management interfaces **MUST** use the canonical Component and Pattern standards, with **shadcn/ui as the component baseline**.

Appropriate primitives include:

- `Table` / Data Table for observations, datasets, instruments, and QC results;
- `Badge` for textual QC and lifecycle states;
- `Tabs` for metadata, QC, provenance, calibration, and history;
- `Dialog` or `Sheet` for contextual inspection;
- `AlertDialog` for destructive data operations;
- `Alert` for quality warnings or incomplete coverage;
- `Field`, `FieldLabel`, `FieldDescription`, and `FieldError` for metadata editing;
- `Tooltip` only for supplementary scientific context;
- `Skeleton` for loading states.

Custom components **SHOULD NOT** replace established primitives without a demonstrated scientific interaction requirement.

---

## 2.92 Scientific value display

Scientific values displayed in UI **MUST** show units where omission could cause ambiguity.

Uncertainty **SHOULD** be visible when material to interpretation.

Examples:

```text
22.4 ± 0.3 °C
```

or:

```text
22.4 °C
Uncertainty: 0.3 °C (1σ)
```

The UI **MUST NOT** display excessive decimal precision that falsely suggests measurement accuracy.

---

## 2.93 QC status UI

QC status **MUST NOT** be communicated through color alone.

For example:

```text
Suspect
```

**MUST** remain textual even if accompanied by a warning token.

Operators **SHOULD** be able to inspect the reason or individual QC tests that produced the final status.

---

## 2.94 Missing-data UI

Missing, rejected, below-detection, and gap-filled states **MUST** have distinguishable presentation where scientifically relevant.

Displaying all such states as:

```text
—
```

without explanation **SHOULD NOT** be used in scientific review interfaces.

Tooltips or details panels **MAY** provide additional context but **MUST NOT** be the only accessible representation of critical state.

---

## 2.95 Provenance UI

Scientific-data interfaces **SHOULD** provide direct access to provenance for derived values.

A user reviewing a value **SHOULD** be able to determine where practical:

```text
source
instrument
processing version
QC state
dataset release
```

without requiring database access.

---

## 2.96 Forms & Validation

Scientific metadata forms **MUST** use canonical Forms & Validation patterns.

Server-side validation remains authoritative.

Forms **SHOULD** validate:

- units;
- numeric ranges;
- interval ordering;
- coordinates;
- calibration dates;
- version identifiers.

Client-side validation **MUST NOT** be treated as scientific QC or a security boundary.

---

## 2.97 State Management

Scientific datasets, QC states, processing status, and release metadata **MUST** be treated as server state.

The UI **SHOULD** use canonical query/cache mechanisms.

Client-local edits **MUST NOT** become authoritative scientific values before server validation and persistence.

Optimistic UI **SHOULD NOT** be used for high-impact manual QC changes unless reconciliation is explicit and safe.

---

## 2.98 Accessibility

Scientific-data interfaces **MUST** comply with the Accessibility standard.

Charts and color scales **MUST NOT** be the sole means of conveying critical scientific information.

Tables **MUST** have semantic headers.

Units **SHOULD** be available to assistive technologies along with values.

QC states **MUST** be textually accessible.

Interactive plots **SHOULD** provide an accessible alternative representation for data necessary to complete the task.

---

## 2.99 Design Tokens

Scientific interfaces **MUST** use canonical Design Tokens.

Hard-coded colors **MUST NOT** independently define:

- good;
- suspect;
- bad;
- estimated;
- missing.

Semantic tokens **MUST** be used consistently.

Scientific visualization palettes **MAY** require specialized scales, but those scales **MUST** follow the visualization and accessibility standards and **MUST NOT** redefine general component semantics.

---

## 2.100 Data-quality review

Material scientific-data products **SHOULD** undergo explicit quality review before publication.

Review **SHOULD** verify:

- measurement semantics;
- units;
- QC;
- uncertainty;
- missing-data treatment;
- provenance;
- aggregation rules;
- source comparability;
- dataset identity;
- release version.

A successful software test suite **MUST NOT** alone be considered evidence of scientific validity.

---

## 2.101 Reprocessing

Reprocessing historical observations with improved calibration, QC, or algorithms **MUST** produce traceable new outputs.

The process **MUST** preserve:

- previous released version;
- new processing version;
- reason for reprocessing;
- major methodological differences.

Old published versions **SHOULD NOT** be silently replaced.

---

## 2.102 Errata

Material errors in published datasets **MUST** be corrected transparently.

An erratum **SHOULD** identify:

- affected releases;
- affected records/time periods;
- nature of the defect;
- corrected version.

Consumers **SHOULD** be able to determine whether their cited release is affected.

---

## 2.103 Deprecation

Datasets, variables, or methods that should no longer be used **SHOULD** be explicitly deprecated.

Deprecation **MUST** identify:

- reason;
- replacement where applicable;
- effective date.

Deprecated data **MUST NOT** silently disappear if doing so would break reproducibility obligations.

---

# 3. Anti-patterns

## 3.1 Unitless scientific values

```text
temperature = 22.4
```

with no documented unit is ambiguous.

**Use:** explicit unit metadata.

---

## 3.2 Unit in the column name only

```text
temperature_c
```

may be readable but is insufficient when datasets require machine-readable unit metadata and conversions.

**Use:** canonical variable and unit metadata.

---

## 3.3 False precision

Displaying:

```text
22.437891 °C
```

for a sensor accurate only to approximately 0.5 °C implies nonexistent precision.

**Use:** display precision appropriate to measurement quality.

---

## 3.4 Missing equals zero

Replacing instrument outages with zero creates artificial physical events.

**Use:** explicit missingness and missing reason.

---

## 3.5 Magic missing values

```text
-9999
```

can accidentally enter statistics as a real measurement.

**Use:** explicit missing representation and metadata.

---

## 3.6 Below-detection equals zero

A censored measurement is not necessarily a true zero.

**Use:** preserve censoring and detection limit.

---

## 3.7 Correcting raw data in place

Overwriting the source observation destroys reproducibility.

**Use:** immutable raw data plus versioned corrected product.

---

## 3.8 One generic QC flag

```text
qc = 1
```

with undocumented meaning is not portable or interpretable.

**Use:** documented vocabulary and test-level detail where needed.

---

## 3.9 Deleting outliers automatically

Rare values can represent genuine environmental extremes.

**Use:** flag, review, and preserve the original observation.

---

## 3.10 QC equals validation

A value matching the schema may still be scientifically invalid.

**Use:** structural validation plus scientific QC.

---

## 3.11 Undocumented gap filling

Interpolated values mixed with measurements produce false certainty.

**Use:** mark estimated values and preserve method provenance.

---

## 3.12 Unlimited interpolation

Interpolating across long sensor outages creates artificial continuity.

**Use:** scientifically justified gap-length limits.

---

## 3.13 Same uncertainty for observed and gap-filled data

Estimated values often have materially different uncertainty.

**Use:** propagate or separately model estimation uncertainty.

---

## 3.14 Ignoring covariance

Treating correlated measurements as independent underestimates uncertainty.

**Use:** include covariance or use an appropriate ensemble method.

---

## 3.15 Standard deviation labeled uncertainty

Population variability and measurement uncertainty are not interchangeable.

**Use:** name statistical quantities precisely.

---

## 3.16 Latest calibration applied to all history

Future calibration coefficients can rewrite historical meaning incorrectly.

**Use:** time-bounded calibration metadata and explicit reprocessing.

---

## 3.17 Moving a station by editing its coordinates

Historical observations then appear to have been collected at the new location.

**Use:** versioned deployments or location history.

---

## 3.18 Averaging every variable

Wind direction, precipitation accumulation, and maxima require different operators.

**Use:** variable-appropriate aggregation rules.

---

## 3.19 Mean of irregular samples

Simple averaging can bias a time mean when samples are unevenly spaced.

**Use:** time weighting where required.

---

## 3.20 Aggregate without completeness threshold

One observation can accidentally represent an entire day.

**Use:** minimum valid coverage.

---

## 3.21 "Daily" without timezone

Day boundaries vary by scientific use case.

**Use:** explicit temporal boundary and timezone semantics.

---

## 3.22 Same units means comparable

Two datasets may have different instruments, methods, averaging windows, or reference conditions.

**Use:** explicit comparability assessment.

---

## 3.23 Harmonization that destroys source values

Users cannot reproduce or challenge transformations.

**Use:** preserve source data and transformation lineage.

---

## 3.24 Spreadsheet as undocumented production pipeline

Manual edits cannot be reliably reproduced or audited.

**Use:** version-controlled, reproducible processing.

---

## 3.25 Mutable published dataset

Changing previously cited files makes published science irreproducible.

**Use:** immutable releases and new corrected versions.

---

## 3.26 `latest.csv` as citation

The file may change after analysis.

**Use:** cite an immutable dataset release.

---

## 3.27 File name as dataset identity

Renaming or repartitioning files should not create or destroy scientific identity.

**Use:** stable dataset identifiers and release manifests.

---

## 3.28 Versioning only the schema

Values can change after recalibration even when columns remain identical.

**Use:** separate schema version and dataset/reprocessing version.

---

## 3.29 Hiding QC in the UI

Showing a number without its known suspect status can mislead operators.

**Use:** visible textual QC state.

---

## 3.30 Color-only quality status

Red and green alone are inaccessible and ambiguous.

**Use:** text plus semantic design tokens.

---

# 4. Checklist

## Measurement semantics

- [ ] Variable has a documented scientific definition.
- [ ] Medium/matrix is explicit where relevant.
- [ ] Sampling method is documented.
- [ ] Reference conditions are documented.
- [ ] Spatial and temporal support are defined.
- [ ] Direct measurements and derived variables are distinguishable.

## Units and numeric representation

- [ ] Every physical quantity has an explicit unit.
- [ ] Unit identifiers are machine-readable.
- [ ] Canonical unit is defined.
- [ ] Unit conversions are documented.
- [ ] Reference conditions are preserved.
- [ ] Numeric storage type is appropriate.
- [ ] Display precision does not imply false accuracy.
- [ ] Missing values do not use undocumented numeric sentinels.

## Uncertainty

- [ ] Material measurement uncertainty is represented.
- [ ] Uncertainty meaning is documented.
- [ ] Confidence/coverage semantics are explicit.
- [ ] Random and systematic components are distinguished where needed.
- [ ] Correlation is considered.
- [ ] Derived values propagate uncertainty appropriately.
- [ ] Monte Carlo/ensemble methods are reproducible where used.
- [ ] Natural variability is not mislabeled as uncertainty.

## Detection limits

- [ ] Detection/reporting limits are recorded where relevant.
- [ ] Censored observations remain distinguishable.
- [ ] Below-limit observations are not silently converted to zero.
- [ ] Statistical treatment of censored data is documented.

## QC

- [ ] QC vocabulary is documented.
- [ ] Raw value and QC state are separate.
- [ ] Automated QC rules are versioned.
- [ ] Individual test outcomes are preserved where useful.
- [ ] Aggregate QC logic is documented.
- [ ] Manual QC decisions are attributable.
- [ ] Original QC results remain recoverable.

## Provenance

- [ ] Source dataset is identified.
- [ ] Instrument/method identity is available.
- [ ] Processing software/version is recorded.
- [ ] Transformation lineage is reproducible.
- [ ] Derived values link to appropriate inputs.
- [ ] Dataset and processing versions are distinct where required.
- [ ] Stable identifiers are used for relevant scientific entities.

## Missing data

- [ ] Missingness is explicit.
- [ ] Missing and zero are distinct.
- [ ] Not applicable and unknown are distinct.
- [ ] Missing reason is retained where material.
- [ ] Gap-filled values are marked.
- [ ] Gap-filling method is documented.
- [ ] Long-gap policy is defined.
- [ ] Gap-fill uncertainty is represented where material.

## Instruments and calibration

- [ ] Instrument has stable identity.
- [ ] Manufacturer/model/serial metadata are recorded where needed.
- [ ] Deployment history is retained.
- [ ] Location/height/depth changes are versioned.
- [ ] Calibration history is retained.
- [ ] Calibration coefficients are versioned.
- [ ] Calibration validity periods are explicit.
- [ ] Maintenance events are recorded where material.
- [ ] Analytical method changes are traceable.

## Spatial metadata

- [ ] CRS/datum is explicit.
- [ ] Coordinate order is defined.
- [ ] Vertical datum is defined where applicable.
- [ ] Location precision is honest.
- [ ] Sensitive locations follow governance controls.
- [ ] Generalized coordinates are identified as generalized.

## Temporal semantics

- [ ] Timestamp meaning is explicit.
- [ ] Absolute instants are timezone-aware.
- [ ] Sampling interval is documented.
- [ ] Irregular sampling is handled explicitly.
- [ ] Temporal aggregation operator is appropriate.
- [ ] Aggregate interval boundaries are defined.
- [ ] Completeness threshold is defined.
- [ ] Coverage metadata is retained where useful.
- [ ] Daily/monthly/yearly timezone semantics are documented.
- [ ] Interpolated/resampled data remain identified as derived.

## Comparability

- [ ] Cross-source comparability has been assessed.
- [ ] Units alone are not used as evidence of equivalence.
- [ ] Instrument/method differences are considered.
- [ ] Temporal and spatial support are considered.
- [ ] Reference conditions are considered.
- [ ] Harmonization transformations are documented.
- [ ] Original source values are preserved.
- [ ] Known discontinuities are documented.
- [ ] Bias corrections are versioned and validated.

## Validation and scientific QC

- [ ] Structural schema validation is applied.
- [ ] Physical plausibility checks exist where applicable.
- [ ] Rare values are not automatically deleted.
- [ ] Spike/persistence tests are context-appropriate.
- [ ] Duplicate-observation identity is defined.
- [ ] Replicate measurements remain distinguishable.
- [ ] Outlier treatment is documented.

## Reproducibility

- [ ] Source versions are recorded.
- [ ] Code version is recorded.
- [ ] Configuration is recorded.
- [ ] Processing is deterministic where possible.
- [ ] Random seeds or stochastic configuration are retained where needed.
- [ ] Manual undocumented transformations are excluded from canonical pipelines.

## Dataset versioning and citation

- [ ] Dataset has a stable identity.
- [ ] Published release has an explicit version.
- [ ] Citable releases are immutable.
- [ ] Schema version and content version are distinguishable.
- [ ] Corrections produce new releases or errata.
- [ ] Release manifest exists where appropriate.
- [ ] Checksums are available where useful.
- [ ] Persistent citation metadata is provided.
- [ ] `latest` aliases are not the sole citation mechanism.

## API

- [ ] API preserves units.
- [ ] API preserves QC state.
- [ ] API exposes uncertainty where material.
- [ ] API exposes or links provenance.
- [ ] API identifies dataset version.
- [ ] Alternate unit responses identify returned units.
- [ ] Missing observations do not use undocumented magic numbers.
- [ ] Filtering semantics are explicit.

## Privacy and governance

- [ ] Sensitive scientific data are classified.
- [ ] Location sensitivity is evaluated.
- [ ] Generalization/redaction is documented.
- [ ] Access controls follow governance requirements.
- [ ] Raw/intermediate/published retention is defined.
- [ ] Deletion obligations are mapped across derived products.

## UI and accessibility

- [ ] shadcn/ui is the component baseline.
- [ ] Scientific values display units.
- [ ] Precision is scientifically appropriate.
- [ ] Material uncertainty is visible.
- [ ] QC status is textual, not color-only.
- [ ] Missing/rejected/estimated states are distinguishable.
- [ ] Provenance can be inspected.
- [ ] Forms use canonical validation patterns.
- [ ] Server state remains authoritative.
- [ ] Tables have semantic headers.
- [ ] Charts have accessible alternatives where needed.
- [ ] Design Tokens are used for quality/status semantics.

---

# 5. Canonical summary

Scientific data quality requires more than valid rows and successful pipelines.

Every scientifically meaningful value **MUST** preserve the semantics required to answer:

```text
what was measured
in what units
where
when
how
with which instrument or method
with what uncertainty
with what quality status
from which source
under which processing version
```

Units **MUST** be explicit and machine-readable.

Reference conditions **MUST** be preserved where they affect physical meaning.

Stored and displayed precision **MUST NOT** imply certainty beyond the measurement.

Uncertainty **SHOULD** be represented whenever it is material to scientific interpretation.

Derived quantities **MUST** propagate uncertainty using methods appropriate to the mathematical assumptions, including covariance where inputs are correlated.

Quality control **MUST** remain separate from the original observation.

The canonical observation chain is:

```text
raw measurement
→ calibration
→ structural validation
→ scientific QC
→ correction / derivation where required
→ aggregation
→ published data product
```

Each stage **MUST** preserve provenance.

Missing observations **MUST NOT** be confused with zero.

Below-detection values **MUST NOT** automatically become zero.

Gap-filled values **MUST** remain distinguishable from observations and **MUST** identify their estimation method.

Instrument, deployment, calibration, maintenance, and analytical-method metadata **MUST** remain temporally traceable when they can affect interpretation.

Historical observations **MUST NOT** silently acquire current calibration, location, or method metadata.

Temporal aggregation **MUST** define:

```text
source interval
+ target interval
+ boundary convention
+ timezone
+ aggregation operator
+ completeness threshold
+ QC propagation
```

Scientific variables **MUST** use physically appropriate aggregation operators.

Irregular sampling **MUST NOT** be treated as uniform where doing so biases the result.

Datasets from different sources **MUST NOT** be assumed comparable merely because they share names and units.

Comparability **MUST** account for:

```text
measurement definition
+ units
+ reference conditions
+ instrument/method
+ calibration
+ temporal support
+ spatial support
+ QC
+ processing level
```

Harmonization **MUST** preserve source values and transformation provenance.

Published scientific datasets **MUST** have explicit versions.

Citable releases **MUST** be immutable.

A mutable `latest` resource **MUST NOT** be the only reproducible reference.

The canonical publication chain is:

```text
source observations
→ versioned processing
→ quality assessment
→ reproducible transformation
→ immutable dataset release
→ persistent citation
```

Schema versions, processing versions, and dataset release versions **MUST** remain conceptually distinct.

Database constraints **MUST** provide final structural integrity where the database can authoritatively enforce it, while scientific QC **MUST** remain an explicit domain process.

Administrative interfaces **MUST** follow the canonical State Management, Forms & Validation, Accessibility, Design Tokens, Component, and Pattern standards, with **shadcn/ui as the component baseline**.

The final standard is:

> **Preserve measurement meaning. Make units explicit. Quantify uncertainty honestly. Never hide quality state. Distinguish missing, observed, corrected, and estimated data. Preserve calibration and provenance. Aggregate according to physical meaning. Compare sources only after semantic review. Publish immutable, citable dataset versions.**
