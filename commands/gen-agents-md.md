---
description: Generate AGENTS.md from $ARGUMENTS (module/component description)
agent: build
model: main/mini
tools:
  write: true
  edit: true
  read: true
---

# gen-agents-md

Generate `AGENTS.md` for a module/component from `$ARGUMENTS` (external description).

---

## What is AGENTS.md

Domain-specific knowledge doc placed in a module/component directory, recording its structure, conventions, and anti-patterns.

**Relationship with root AGENTS.md:**

- Root AGENTS.md: global conventions, coding rules, MCP config
- AGENTS.md: directory-specific content, no global duplication

## Core Principles

Generated AGENTS.md must:

- **≤ 100 lines** — trim overages
- **Concise** — no filler, every sentence carries information
- **Precise** — exact descriptions, consistent terminology

## Sync Rule

- When the target directory already has `AGENTS.md`, compare it with the root `AGENTS.md` and the local reference templates first.
- Keep directory-specific content only; preserve valid local specifics and update only the missing or stale parts.
- Record only directory-specific facts verified from the code; do not copy speculative conventions from examples.
- Do not duplicate root-level conventions, MCP config, or shared rules.
- **Every generated AGENTS.md must end with the fixed `## Sync` section verbatim** (see template).

## Document Layers

| Layer         | Location                 | Required                                   | Optional                 |
| :------------ | :----------------------- | :----------------------------------------- | :----------------------- |
| **Module**    | `src/{module}/`          | Overview, Directory Structure, Conventions | Key Files, Anti-patterns |
| **Component** | `src/components/{name}/` | +Props, Usage                              | Design Patterns          |

### Content Pruning

- **Required**: Overview, Directory Structure, Conventions
- **Recommended**: Key Files (when file count > 5)
- **Optional**: Anti-patterns, Props, Usage, Design Patterns

---

## Procedure

1. `$ARGUMENTS` is the user-provided module/component description
2. Locate the target directory and read its actual files before writing; document only structure, interfaces, and conventions you can verify in the code — never invent file names, helpers, or APIs.
3. Sync against existing `AGENTS.md` and reference docs before writing
4. Generate AGENTS.md following the reference specs
5. Write to target directory

## References

### Rules

- [AGENTS.md Rules](../prompts/commands/gen-agents-md/references/agents-rules.md) - Content rules and quality checklist
- [AGENTS.md Writing Guide](../prompts/commands/gen-agents-md/references/agents-template.md) - Complete spec with scenario examples

### Templates

- [AGENTS.md Template](../prompts/commands/gen-agents-md/templates/agents-template.md) - Blank template

---

## Quality Checklist

- [ ] Overview answers "what problem does it solve"?
- [ ] Directory structure uses tree format with comments?
- [ ] Key files table covers core files?
- [ ] Conventions are specific and executable?
- [ ] Anti-patterns state "don't do" + "why"?
- [ ] No duplicate content with parent AGENTS.md?
- [ ] File ends with the fixed `## Sync` section verbatim?
