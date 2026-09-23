# Security Policy

## Reporting a vulnerability or a leak

This repository is **documentation and tooling** — it ships no runtime service. The realistic risks are:

| Risk | Example | Where to report |
|---|---|---|
| **Sensitive content in a document** | a credential, private URL, personal data or customer name committed by mistake | open a **private** security advisory (GitHub → Security → Report a vulnerability) or email the maintainer |
| **Leaked internal link** | a private conversation/board/wiki URL inside front matter or a source list | same as above |
| **Unsafe guidance** | a rule that would cause a real security defect if followed (e.g. a weak crypto recipe) | public issue labelled `security-guidance` is fine |
| **Tooling defect** | `tools/*.js` mishandles input, writes outside the repo, or follows a symlink | private advisory |

Please do not open a public issue for credentials, personal data or private URLs — report privately and
allow a short window for a fix and a history rewrite if needed.

## What we guarantee

- **No secrets in the repository.** `tools/validate.js` fails the build if private provenance fields
  (`source`, `conversation_id`) or obvious credential shapes appear in a document's front matter.
- **No outbound network calls in tooling.** The build/validate pipeline is pure Node with zero
  dependencies and never leaves the repository directory.
- **No execution of document content.** Markdown is treated as text; code blocks are never run by CI.

## Supported versions

The default branch is the only supported line. Documents carry their own `version` and `status`; a
`deprecated` document is unsupported by definition (`GOVERNANCE.md` §4).

## Response expectations

Reports are acknowledged within 3 working days. Confirmed issues are fixed on the default branch and
recorded in `CHANGELOG.md`; where history must be rewritten (a committed secret), the maintainer will
coordinate force-push timing with anyone who has forked.
