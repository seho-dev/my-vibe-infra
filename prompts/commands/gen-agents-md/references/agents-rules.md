# AGENTS.md Rules

## What is AGENTS.md

Domain-specific knowledge docs placed in business module/component directories. Each module can have its own AGENTS.md recording structure, conventions, and anti-patterns specific to that directory.

**Relationship with root AGENTS.md:**

- Root AGENTS.md: Global conventions, Coding Rules, MCP configuration
- AGENTS.md: Directory-specific content, no duplication of global rules

## Layer Rules

| Layer         | Location                 | Required                                   | Optional                 |
| :------------ | :----------------------- | :----------------------------------------- | :----------------------- |
| **Module**    | `src/{module}/`          | Overview, Directory Structure, Conventions | Key Files, Anti-patterns |
| **Component** | `src/components/{name}/` | +Props, Usage                              | Design Patterns          |

## Content Rules

### Overview

One paragraph describing responsibilities, boundaries, and core value.

```
✅ Good:
- "HTTP service layer providing shared client instances and interceptors"
- "Core state management layer with shared stores and reusable logic units"

❌ Bad:
- "This module contains various components" (too vague)
- "Utility function collection" (doesn't explain purpose)
```

### Directory Structure

Use tree code block with `# comment` on each line.

```
✅ Good:
├── http.js              # Main HTTP client instance
├── http.{domain}.js     # Domain-specific instance
└── util.js              # createBaseHttpInstance factory

❌ Bad:
├── http.js
├── http-util-v2.js
└── util.js
```

### Conventions

Specification list using `- **keyword**: description` format.

```
✅ Good:
- **Instance creation**: Must use `createBaseHttpInstance` for consistency
- **Interceptor order**: Apply auth headers after serialization

❌ Bad:
- "Write clean code" (not executable)
- "Follow best practices" (doesn't specify which)
```

### Anti-patterns (Optional)

State "what not to do" and "why".

### Sync (Required)

Every generated AGENTS.md must end with the following fixed section verbatim:

```markdown
## Sync

This file is maintained as the directory scope changes. When files in this directory are added, modified, or deleted (components, logic units, utilities, constants, etc.), update this file's directory structure, key files, and conventions to keep the documentation in sync with the code.
```

```
✅ Good:
- **Props Drilling**: Passing beyond 3 layers should use shared state
- **Component bloat**: Over 300 lines should split into logic units or sub-components

❌ Bad:
- "Don't write bad code" (doesn't define bad)
- "Avoid bugs" (meaningless)
```

## Quality Checklist

- [ ] Overview answers "what problem does it solve"?
- [ ] Directory structure uses tree format with comments?
- [ ] Key files table covers core files?
- [ ] Conventions are specific and executable?
- [ ] Anti-patterns state "don't do" + "why"?
- [ ] No duplicate content with parent AGENTS.md?
- [ ] File ends with the fixed `## Sync` section verbatim?

## References

- [AGENTS.md Writing Guide](./agents-template.md) - Complete template and scenario examples
- [AGENTS.md Template](../templates/agents-template.md) - Blank template
