---
description: Generate a change acceptance report (for product/QA), based on context or current workspace diff, output an English Markdown report
agent: build
model: main/mini
subtask: false
---

# change-report

Generate a change acceptance report for **product / QA**, helping reviewers quickly understand the scope of impact and testing focus of the current change.

**Audience: non-technical staff (product, QA).** The language must be plain, direct, and concise.

---

## Language Rules (Highest Priority)

- **Drop jargon**: never use dev terms like "state", "conditional compilation", "API contract", "module", "module boundary", "regression", "side effect", "God Component". Product/QA do not understand code structure — do not use code-perspective words like "module", "component", "directory", "file"; use "page", "feature", "location" instead.
- **Keep at most one technical term and explain it in plain words immediately**: e.g. "data source (the origin that feeds the page with data)", "template (a pre-filled document skeleton)". Explain once on first mention, then use the plain-language term.
- **Describe from the business / user perspective**: do not say "changed the state distribution of XxxProvider"; say "changed the data source of search, which affects the search results".
- **Short sentences, short paragraphs, short lists**: one idea per sentence, no long stacked sentences.
- **Lead with the conclusion**: first state "what to test" and "who is affected", then add one sentence of reason; do not pad.

---

## Input Sources (by priority)

1. **Context (intent)**: if the current session describes a requirement / change / bug fix, treat that description as the intent source.
2. **Workspace diff (what actually changed)**: read `git diff HEAD` (optionally `git status`, `git log -5 --oneline`) to verify what was implemented. Intent alone never proves completion; if no diff is available, mark completion claims as unverified.
3. **`$ARGUMENTS` supplement**: `$ARGUMENTS` may carry requirement background, PR link, focus points, etc., as supplementary context; it is NOT executed as a shell command.
4. **Insufficient info**: explicitly list gaps and assumptions; never fabricate evidence you did not read.

---

## Report Length: Graded by Complexity (Mandatory)

First assess the complexity level of the change, then decide the report length. **Do not write a long report for a simple change, nor a thin report for a complex change.**

| Level          | Signals                                                                                                                                          | Length                                                                                                                  |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **L1 Simple**  | Pure style / copy / single-point bug fix / config tweak; does not touch business flow, state, or API                          | One paragraph to under half a screen; keep only "Change Summary + Acceptance Suggestion"; other sections may be omitted |
| **L2 Medium**  | Single page/feature adjustment / local interaction change; touches data source or interface but not across pages | All sections, but each capped at 3-5 items                                                                              |
| **L3 Complex** | Cross-page / core flow change / host integration / overall structure adjustment    | All sections, fully expanded; impact surface and test matrix must be detailed                                           |

Mark the level on the first line of the report, e.g. `> Complexity: L2 Medium`.

---

## Report Structure (Trim by Level)

### 1. Change Summary

- In one or two sentences, tell product/QA: what was changed and what user problem it solves.
- L1: 1-2 sentences; L3: a list of main change points (in plain language).

### 2. Impact Scope

- **Which features are affected**: describe by business name, e.g. "search", "order creation", "file preview", "document editing", "batch import".
- **Which pages/locations are affected**: give the page name or menu path so product can find it directly.
- **Whether external dependencies are affected**: third-party integrations (rich-text editors, previewers, host apps), backend API data formats.

> L1 may merge into one paragraph; L2/L3 must split into subsections.

### 3. Testing Suggestions

- **Suggested test scope**: list what to test, split into "Must test", "Suggested", "Optional".
- **What to prioritize**: high-risk, error-prone areas first, with reasons.
- **How to verify**: give the smallest executable manual steps (entry page + action + expected result), not a generic checklist.

### 4. Test Coverage (Output only when test info is available)

- **What existing tests cover**: which existing tests correspond to this change and which behaviors they cover (describe behaviors in plain language, no code).
- **What is not covered**: which key behaviors have no tests.
- **Coverage estimate**: report a rough percentage only when you can point to the tests that justify it; otherwise omit the number. **If test info is unavailable, write "Cannot assess, please confirm manually"; do not fabricate numbers.**

### 5. Risk Notes

- List in plain language what problems this change may cause (e.g. "a page may display abnormally", "old data may be incompatible").
- If none, write "No obvious risk"; do not pad.

### 6. Acceptance Checklist (Optional, L2/L3 recommended)

- 3-8 checkable items, each corresponding to a phenomenon product/QA can directly observe.

---

## Output Contract (Mandatory)

1. \*\*The entire output must be wrapped in a single `markdown code block`, English Markdown content, so product/QA can copy it directly to external tools (chat, wiki, etc.).
2. Report content wrapped in collapsible `<details>` tag:

   ```markdown
   <details>
   <summary>Change Acceptance Report</summary>

   **> Complexity: L2 Medium**

   ## 1. Change Summary

   ...

   ## 2. Impact Scope

   (collapsible, default closed)

   ## 3. Testing Suggestions

   (collapsible, default closed)

   ## 4. Test Coverage

   (collapsible, default closed)

   ## 5. Risk Notes

   (collapsible, default closed)

   ## 6. Acceptance Checklist

   (collapsible, default closed)

   </details>
   ```

3. No extra explanatory text outside the code block.
4. Report language: **English** (unless `$ARGUMENTS` explicitly requests another language).
5. Complexity level as **bold header** on the first line after `<summary>`.
6. Plain language for non-technical staff, no jargon (see "Language Rules").
7. Never fabricate unread files, cases, or coverage; if unavailable, write "Cannot assess" or omit the section.
8. Do not modify any code; this command only generates a report.

---

## Self-Check (Before Output)

- [ ] Complexity level assessed and marked at the top
- [ ] Length matches the level (L1 short / L3 detailed)
- [ ] Plain language, no jargon stacking, product/QA can read it directly
- [ ] Coverage not fabricated
- [ ] Entire output wrapped in a single ```markdown code block
- [ ] Report content wrapped in `<details>` tag
- [ ] No extra text outside the code block
- [ ] English output
- [ ] No code modified

---

## Hard Rules

- Do not modify code, commit to git, or push.
- Do not output repo-wide audit content unrelated to this change.
- Do not write speculation as conclusion; distinguish "confirmed", "reasonable inference", "to be confirmed".
- Do not pad with generic test checklists.
