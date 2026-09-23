# Attribution

How this corpus was produced, how to credit it, and what to check before trusting a rule.

## 1. How the documents were made

| Cohort | Count | How |
|---|---|---|
| Baseline | 49 | Exported from an internal design-system specification session (2026-09-22) |
| Generated — engineering/data/AI/security/ops/process | 48 | Authored with a large language model against a fixed document skeleton |
| Generated — design set | 19 | Same skeleton, plus **web research**: each document drove 37–75 firecrawl search/scrape tool calls and lists its sources |
| Navigation | 1 | `foundation/00-index.md`, written for this repository |

Every standard follows the same skeleton — Purpose → Rules → Anti-patterns → Checklist → Canonical
summary → Sources — and carries `provenance` in its front matter
(`baseline` · `generated-batch` · `generated-design`).

**AI disclosure.** The generated documents are machine-written first drafts, reviewed by nobody yet:
every document is `status: draft` (`GOVERNANCE.md` §4). They are published because a well-structured,
source-grounded draft is a better starting point than a blank page — not because they are ratified
policy. Ratification requires a named owner to verify the rules and their sources.

## 2. Sources

Each document ends with a `Sources` section listing the real URLs consulted. Sources were chosen from
public, authoritative material — specifications and standards bodies (W3C/WAI, OWASP, IETF, ISO),
platform documentation (MDN, Material, Apple HIG, GOV.UK Design System, cloud vendors), established
practitioners (NNG, Smashing Magazine, A List Apart, Martin Fowler, Google SRE) and vendor engineering
blogs. Quotes are short and attributed; nothing is copied wholesale.

If you find a claim with no source, treat it as an unverified draft claim and open an issue — that is a
defect we want fixed (see `CONTRIBUTING.md`).

## 3. How to credit this work

CC BY 4.0 (documentation). For academic or internal citation:

```
Gold Standard Guidelines — canonical engineering, design, data, AI and operational standards.
Version 0.1.0 (drafts), 2026. https://github.com/Dxlxz/gold-standard-guidelines
```

See `CITATION.cff` for a machine-readable form. When you adapt material, state that you changed it:
"adapted from Gold Standard Guidelines (CC BY 4.0)".

## 4. What we do not claim

- No certification, compliance attestation or audit is implied by `MUST`/`SHOULD` language in a draft.
- No guarantee that a rule matches your regulatory context (data protection, accessibility law,
  sector regulation) — check with your own compliance function.
- No endorsement of any product named in the corpus.
