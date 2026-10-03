---
description: Scan session history and generate per-worktree generalization and review reports without modifying files
agent: build
model: main/mini
subtask: false
---

# Session Insights

Scan session history across all worktrees of the repository and generate read-only reports. Do not modify source code, skills, `AGENTS.md`, command files, Git metadata, or the session database.

`$ARGUMENTS` is optional context or focus. Treat it as natural language, never as a shell command. If the context specifies a time range, use it; otherwise use the previous calendar day in the local timezone.

## 1. Resolve the time range

- Resolve the local timezone and calculate the selected calendar range as `[START, END)`.
- Convert both boundaries to Unix milliseconds.
- State the selected range, timezone, and boundaries in the report.

## 2. Discover worktrees and sessions

- Run `git worktree list --porcelain` from the current repository.
- Include every existing worktree belonging to this repository.
- Ignore detached or prunable entries whose directories no longer exist.
- Normalize worktree paths before grouping.
- Use the current harness's session store as the completeness source; a session-list command is only a convenience check.
- If the current harness exposes no readable session store, state that limitation and stop; never fabricate session data.
- Inspect the store's schema or format before querying it. Use read-only access.
- Select sessions whose activity interval intersects the selected range: interval = creation time → last update time; when only a creation timestamp exists, use it as the interval.
- Group sessions by normalized `directory` and map them to discovered worktrees.
- Read associated messages and parts. Include session id, title, timestamps, path, branch, and parent id when available.
- Mark greetings, failed startups, and sessions without substantive work as low-signal.
- Skip worktrees with no substantive session; do not output empty reports.

Identify the current harness's session tooling before querying: session store location, session listing with id/title/directory/timestamps, and per-session export in a readable or machine-readable form. Command names and flags vary by harness; discover them from the current environment instead of assuming a specific CLI.

## 3. Analyze each worktree

For every non-skipped worktree, produce a **Generalization Report**. Generalize only repeated patterns supported by evidence. Separate:

1. AI coding mistakes
2. Repeated requests to change AI behavior
3. Frontend review issues

For each candidate clue, record:

- `Pattern`: one reusable rule in imperative English
- `Evidence`: session ids/titles and relevant interaction or code behavior
- `Confidence`: `confirmed`, `strong inference`, or `weak signal`
- `Why generalize`: why it exceeds a one-off issue
- `Destination`: existing `best-practices` rule, new skill, or nearest `AGENTS.md`
- `Draft wording`: the smallest reusable instruction
- `Fix proposal`: proposed instruction or workflow correction
- `Over-generalization risk`: when not to apply it

Do not treat repeated sessions for one Issue as independent defects. Titles prove repeated investigation, not root cause. Distinguish facts, inferences, and open questions.

## 4. Cross-worktree review

- Merge equivalent clues and list supporting worktrees.
- Prefer extending `best-practices` for cross-cutting rules with an existing natural location.
- Propose a new skill only when it has a distinct trigger and workflow.
- Use `AGENTS.md` only for stable boundaries, terminology, routing, and mandatory constraints; do not put detailed checklists there.
- Identify broad, contradictory, or harmful existing instructions and propose corrections.
- Do not apply any recommendation during this run.

## 5. Output contract

- The command introduction is in English.
- The report is in English unless `$ARGUMENTS` explicitly requests another language.
- Adapt commands and paths to the current harness; no specific harness CLI is assumed.
- Do not output full transcripts or unsupported conclusions.
- Include a Review Report only when there is a concrete frontend finding or credible unresolved risk.
- Findings must be ordered by `Must Fix`, `Should Fix`, and `Nit / Optional`, with evidence, impact, and fix direction.
- Drafts must clearly state that no skill or `AGENTS.md` has been changed.

Output exactly:

```markdown
# Session Insights Report

## Scope
- Time range and timezone:
- Discovered worktrees:
- Session data source:
- Session selection rules:
- Skipped worktrees:

## Generalization Report
### <worktree-path>
#### Session Inventory
#### Recurring Clues
#### Generalization Drafts
#### Fix Proposals

## Cross-Worktree Analysis
#### High-Confidence Rules
#### Existing Instruction Gaps
#### Destination Decisions

## Review Report
### <worktree-path>
#### Findings
#### Evidence
#### Fix proposal
#### Verification gap

## Limitations
```

Final self-check:

- Every existing worktree was considered.
- Worktrees without substantive sessions were skipped.
- The selected time range and millisecond boundaries were stated.
- Session recurrence was not mistaken for independent root causes.
- Every generalized rule has evidence and confidence.
- Destination decisions are justified.
- Review findings include evidence, impact, fix direction, and severity.
- No files, skills, `AGENTS.md`, Git state, or database records were modified.
