# Provenance

This repository is **self-contained**: cloning it gives you the full corpus, the tooling required to
build and validate it, and the metadata needed to consume it with humans or agents. Nothing here needs
the pipeline that produced it.

## Where the 116 documents came from

| Cohort | Count | Origin |
|---|---|---|
| Baseline | 49 | Exported from the original design-system conversation (`6ab24b80-…`) — the first generation of standards |
| Batch queue | 48 | Generated against `prompts-next.json` (security, data, AI, operations, process, architecture, platforms) |
| Design set | 19 | Generated against `prompts-design.json` with **Firecrawl-grounded research** (37–75 search/scrape tool calls per document) |
| **Total** | **116** | Every document is an AI-assisted draft with real sources listed under its `Sources` section |

Generation and export were performed by a separate browser-automation project (`chrome-mcp`, the
"@firecrawl on the real Chrome profile" pipeline). That project is *tooling*, not a dependency:
the corpus was frozen into this repository at `v1.0.0` and is now edited here.

## Traceability

- `tools/rename-map.json` — every document's original export filename and number (`legacy_file`,
  `legacy_number`), its stable `id`, and its current path. 1:1, no gaps.
- Front matter keeps `source` (the conversation URL) and `conversation_id` for every generated document,
  so any rule can be traced back to the exchange that produced it.
- `CHANGELOG.md` records the import milestone and the cohort breakdown.

## Regenerating or extending

To produce *new* standards with the same shape:

1. The pipeline project holds the queues and the generator; new topics are added to a queue JSON
   (`id`, `title`, `prompt`, plus a `preamble` and `mention` flag for research-grounded documents).
2. Exported markdown lands in the pipeline's `export/` directory with front matter.
3. Run the pipeline's `migrate-to-repo.js`, which assigns domain folders, stable ids, tags,
   `applies_to`, `related` links, and writes `tools/rename-map.json`.
4. Back in this repository: `npm run build && npm run validate`, then open a PR.

For edits to **existing** documents, no pipeline is involved — see `CONTRIBUTING.md`.

## Why the two are separate

| Repo | Owns | Never contains |
|---|---|---|
| `guidelines` (this repo) | the standards, their metadata, validation and CI | browser automation, credentials, machine-specific paths, conversation state |
| `chrome-mcp` (pipeline) | the browser bridge, queues, export and verification scripts | the canonical standards |

A reviewer of a standard should never need Chrome, a profile, or a network tool to verify a rule.
