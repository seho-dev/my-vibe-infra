# AGENTS.md Writing Guide

## Core Principles

1. **English language** - All AGENTS.md docs written in English
2. **Concise** - Use minimal language to convey information, remove redundant descriptions
3. **Layer isolation** - Only write directory-specific content, global rules in root AGENTS.md

---

## Template Structure

```markdown
# {Module Name}

## Overview

One paragraph describing responsibilities, boundaries, and core value.

## Directory Structure

Use tree code block with `# comment` on each line.

## Key Files

Table listing core files:

| Responsibility      | File | Description |
| :------------------ | :--- | :---------- |
| Feature description | Path | Notes       |

## Conventions

Specification list using `- **keyword**: description` format.

## Anti-patterns (Optional)

Anti-pattern list stating "what not to do" and "why".

## Sync

Fixed closing section — always present. Copy the exact text from [agents-rules.md](./agents-rules.md).
```

Every generated document must end with the fixed `## Sync` section; the scenario examples below omit it for brevity.

---

## Layer Rules

| Layer         | Location                 | Required                                   | Optional                 |
| :------------ | :----------------------- | :----------------------------------------- | :----------------------- |
| **Project**   | Root                     | Global conventions, Coding Rules, MCP      | -                        |
| **Module**    | `src/{module}/`          | Overview, Directory Structure, Conventions | Key Files, Anti-patterns |
| **Component** | `src/components/{name}/` | +Props, Usage                              | Design Patterns          |

### Content Pruning

- **Required**: Overview, Directory Structure, Conventions
- **Recommended**: Key Files (when file count > 5)
- **Optional**: Anti-patterns, Props, Usage, Design Patterns

---

## Writing Standards

### Overview

```
✅ Good:
- "HTTP service layer providing shared client instances and interceptors"
- "Core state management layer with shared stores and reusable logic units"

❌ Bad:
- "This module contains various components" (too vague)
- "Utility function collection" (doesn't explain purpose)
```

### Directory Structure

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

```
✅ Good:
- **Instance creation**: Must use `createBaseHttpInstance` for consistency
- **Interceptor order**: Apply auth headers after serialization

❌ Bad:
- "Write clean code" (not executable)
- "Follow best practices" (doesn't specify which)
```

### Anti-patterns

```
✅ Good:
- **Props Drilling**: Passing beyond 3 layers should use shared state
- **Component bloat**: Over 300 lines should split into logic units or sub-components

❌ Bad:
- "Don't write bad code" (doesn't define bad)
- "Avoid bugs" (meaningless)
```

---

## Scenario Templates

Scenario examples are fictional illustrations using placeholder names (`http.js`, `createBaseHttpInstance`, etc.). Use them as shape references only; document what the target directory actually contains.

### Utilities

````markdown
# Utility Layer

## Overview

Core shared utilities providing global events, data transformation, and domain helper functions.

## Directory Structure
```

utils/
├── index.js # Entry: date formatting, status mapping, cookie
├── events.js # Global pub/sub event bus
├── tools.js # Shared helper functions
├── constants.js # Enums, event names, UI dimensions
└── formatting.js # Data transformation, unique ID generation

```

## Key Files

| Type | File | Main Functions |
| :--- | :--- | :--- |
| Global events | events.js | publish(), subscribe() |
| Date/Status | index.js | dateFormatter |
| Data transform | formatting.js | respToOptions, toArray |

## Conventions

- Constants must be exported from `constants.js` before use
- Cross-module communication uses pub/sub, not deep props
- Pure data transformation goes in `formatting.js`
````

### Service Layer

````markdown
# Service Layer

## Overview

HTTP service layer providing shared client instances and interceptors.

## Directory Structure
```

services/
├── http.js # Main HTTP client instance
├── http.{domain}.js # Domain-specific instance
├── util.js # createBaseHttpInstance factory
├── auth.js # Token and session helpers
├── config-manager.js # Runtime configuration resolution
└── constants.js # API paths, header keys

```

## Key Files

| Responsibility | File | Description |
| :--- | :--- | :--- |
| Global interceptors | http.js, util.js | Modification helpers |
| New domain instances | util.js | Uses createBaseHttpInstance |
| Auth | auth.js | Token/session helpers |

## Conventions

- Must use `createBaseHttpInstance` for instance creation
- Apply auth headers after serialization
- Binary endpoints use the appropriate response type
- 401/403/500 route through the shared error handler
````

### Business Module

````markdown
# {Module} Module

## Overview

{Module} business module responsible for {core responsibility}.

## Directory Structure
```

{module}/
├── page files # Page route components
├── components/ # Business components
├── logic/ # Business logic
├── state/ # Module-level shared state
└── utils/ # Module-private utilities

```

## Key Files

| Responsibility | Path | Description |
| :--- | :--- | :--- |
| Entry pages | page files | Registered in src/router/ |
| Business logic | logic/ | Reusable logic units |
| State | state/ | Module shared state |

## Conventions

- Domain logic stays within directory
- Cross-domain code goes to src/components/ or src/utils/
- Use shared state for domain state management
````

### Component Level

````markdown
# {Component Name}

## Overview

{Component description}.

## Directory Structure
```

{component}/
├── index.ts(x) # Component
└── AGENTS.md # This file

# Styles: component style files

```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fetchOptions` | `(keyword) => Promise` | - | Remote search function |
| `debounceTime` | `number` | `0` | Debounce delay ms |

## Usage

### Basic Usage

```text
Component(props: value, onChange: handleChange)
```

### Advanced Pattern

```text
Component(props: fetchOptions, convertOptions)
```

## Design Patterns

```js
// Factory function
export const createFetchOptions = (field = 'name') => {
  return async ({ keyword }) => {
    /* ... */
  };
};
```

## Conventions

1. Remote search filters results based on user input
2. Normalize values at the component input and output boundary

````

---

## Quality Checklist

- [ ] Overview answers "what problem does it solve"?
- [ ] Directory structure uses tree format with comments?
- [ ] Key files table covers core files?
- [ ] Conventions are specific and executable?
- [ ] Anti-patterns state "don't do" + "why"?
- [ ] No duplicate content with parent AGENTS.md?
- [ ] English language used?
- [ ] Concise enough?

---

## Naming Conventions

| Element | Format | Example |
| :--- | :--- | :--- |
| Filename | `AGENTS.md` | Unified AGENTS.md |
| Heading | `# {Name}` | `# Utility Layer` |
| Section | `## {Section}` | `## Overview`, `## Directory Structure` |
| Table columns | Responsibility/File/Description or Prop/Type/Default/Description |
| Conventions | `- **keyword**: description` | `- **Instance creation**: Must use...` |
