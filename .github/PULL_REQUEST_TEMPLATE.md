<!--
Thank you for contributing. Keep this pull request small and reviewable: one standard, one concern.
Read CONTRIBUTING.md before you start, and GOVERNANCE.md if this changes an `active` rule.
-->

## What this changes

<!-- One paragraph: which document(s), which concern, and why now. Link the issue if there is one. -->

- Document id(s):
- Version bump: `PATCH` / `MINOR` / `MAJOR` <!-- MAJOR requires an RFC section + migration plan -->
- Status change: `draft` → `review` / `review` → `active` / `… → deprecated` <!-- or "none" -->

## Why

<!-- The failure mode this addresses. A rule without a failure mode is a preference. -->

## Evidence & sources

<!-- Real URLs, incident references, counter-examples. No invented references (see ATTRIBUTION.md). -->

## Checklist

- [ ] Front matter is complete and correct (`id`, `title`, `domain`, `status`, `version`, `owner`, `tags`, `applies_to`, `related`, dates, `chars`) — per `schema/frontmatter.schema.json`
- [ ] `node tools/build-index.js && node tools/build-llms.js && node tools/validate.js` passes locally
- [ ] Generated artefacts (`index.json`, `llms.txt`, `llms-full.txt`) are committed in this PR
- [ ] Rules are one obligation per numbered item, with normative language used deliberately
- [ ] Checklist items are verifiable against a diff, test, query or screenshot
- [ ] `Sources` section lists real, reachable URLs
- [ ] `CHANGELOG.md` updated (required for every change except typo fixes)
- [ ] No private provenance in front matter — no conversation URLs, credentials, internal hostnames, personal data (`tools/validate.js` enforces this)
- [ ] If this conflicts with another standard, the conflict is named above and the owning document is identified
- [ ] If a rule becomes stricter for existing code, a migration path (codemod, timeline, exception with expiry) is included
- [ ] I have read and agree to the `CODE_OF_CONDUCT.md`

## Notes for reviewers

<!-- What should the reviewer scrutinise most? Any part you are unsure about? -->
