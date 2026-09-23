# Contributing a standard

Every change to this repository is a change to a rule someone will be held to. Treat it accordingly.

## Quick path

```bash
cp templates/standard.md standards/<domain>/NN-slug.md   # choose the next free NN in that domain
$EDITOR standards/<domain>/NN-slug.md                    # fill front matter + sections
node tools/build-index.js && node tools/build-llms.js && node tools/validate.js
git checkout -b standard/<id> && git commit -am "feat(<domain>): add <title>"
```

A pull request is merged when **CI is green** and the **domain owner approves**.
`CHANGELOG.md` must be updated in the same PR.

## 1. Choose it, don't duplicate it

Before writing: search existing ids (`node -e "console.log(require('./index.json').docs.map(d=>d.id).join('\n'))"`)
and the tags of the domain. If an existing standard covers 80 % of the topic, **extend it with a new
numbered section** and bump the version instead of creating a near-duplicate. If you must split a
document, mark the old one `status: deprecated` and point `related` at the successor.

## 2. Metadata is a contract, not decoration

All fields in `schema/frontmatter.schema.json` are required. Meaning of the ones people get wrong:

| Field | Rule |
|---|---|
| `id` | kebab-case, unique, **immutable** once merged. Pick it carefully — it is how agents and code cite the rule. |
| `domain` | must equal the folder. Choose from: design, engineering, data, ai, security, operations, process, foundation. |
| `status` | `draft` until reviewed; `review` while an owner is reading it; `active` once ratified; `deprecated` when superseded. |
| `version` | semver of the *standard*: MAJOR = a rule becomes stricter/incompatible, MINOR = new normative requirement, PATCH = clarification only. |
| `owner` | GitHub handle of the accountable reviewer (`@handle`). A standard without an owner never leaves `draft`. |
| `tags` | lowercase kebab-case, ≥1, no duplicates. Prefer existing tags over inventing new ones. |
| `applies_to` | one or more of `general, ui, client, api, data, ai, security, infra, team` — this drives agent filtering. |
| `related` | up to five ids **that exist** (CI fails on unknown ids). The migration auto-filled these from title mentions; refine when you edit. |
| `review_by` | ≤ 90 days from `updated` for `active` documents. |

## 3. Structure of a standard

Every document follows the same skeleton, in this order:

```markdown
# <Title> — Gold Standard <year>

## 1. Purpose            # why this exists, who it binds, what it does NOT cover (5–10 lines)
## 2. Rules              # numbered normative rules, MUST / MUST NOT / SHOULD / SHOULD NOT
## 3. Anti-patterns      # named prohibited shapes + why they fail (with a code counter-example)
## 4. Checklist          # copy-paste review gate, one line per verifiable item
## 5. Canonical summary  # the whole standard in ~15 lines; the part people actually remember
## Sources                # real URLs consulted (no invented references)
```

Writing rules:

- **One rule per numbered item.** A reader must be able to cite it in a review: "violates <id> §2.7".
- **Normative words only where intended.** "Consider…" is not a rule; either make it a SHOULD or drop it.
- **Show the counter-example.** An anti-pattern without a concrete bad shape is an opinion.
- **Checklist items must be checkable** — "tokens are semantic, not raw hex" ✓; "design is good" ✗.
- **Say what is out of scope.** Overlapping standards are the main source of contradictions.
- Length: aim 20–80 KB. Below 15 KB the topic is probably not a standard; above 120 KB, split it.

## 4. Provenance & research

- Ground claims in real sources and list them under **Sources**. Never invent a citation, statistic or quote.
- When using AI assistance (ChatGPT/Firecrawl/etc.), verify the output against the sources before committing;
  keep the prompt that produced a draft in the PR description for traceability.
- Third-party material must be compatible with our licensing — see `LICENSE` and `legal-licensing`.
  No screenshots of proprietary UI, no copied text beyond short attributed quotes.

## 5. Review & merge

| Step | Who | Gate |
|---|---|---|
| Draft PR opened | author | CI green (`validate` + regenerated index/llms) |
| Technical review | domain owner | rules are correct, non-contradictory, checkable |
| Consistency review | maintainer | naming, metadata, references, no duplicates |
| Ratification | domain owner | `status: review` → `active`, version bumped, `CHANGELOG.md` entry |

Reviewers should reject, not rewrite: ask for the change, don't quietly edit someone's rules.

## 6. Changing an `active` standard

- **PATCH** (clarification, typo, link): PR + owner approval.
- **MINOR** (new rule, tightened checklist): PR + owner approval + note in `CHANGELOG.md`; migration impact assessed.
- **MAJOR** (a rule becomes incompatible, a pattern is banned): RFC in the PR, owner + maintainer approval,
  and a **migration plan** for existing code (codemod, timeline, exception list with expiry).

Anything that conflicts with another standard must be resolved before merge — file the conflict in the PR
and let the maintainer arbitrate (see `GOVERNANCE.md`).

## 7. Deprecating

Set `status: deprecated`, and in the same PR:

1. add a banner at the top: `> **Deprecated** — superseded by [<title>](../<path>) since <date>.`,
2. add the successor to `related`,
3. note it in `CHANGELOG.md`.

Never delete a document that has been `active`: other repositories cite ids, and deletions break those citations.
