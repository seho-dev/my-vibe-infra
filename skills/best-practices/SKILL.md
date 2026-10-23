---
name: best-practices
description: Frontend coding standards and architecture guardrails. Load when designing, writing, refactoring, or reviewing frontend components, business logic, state, styling, or engineering conventions.
---

# Frontend Best Practices

Universal architecture and code quality standards for frontend engineering.

> `MUST` rules describe foundational baselines. When working in an established codebase, existing project conventions take precedence over illustrative directory aliases or naming examples.

---

## Core Invariants

1. **Single Source of Truth**: State has one clear owner. Downstream components read values or emit events; they must never mirror parent state into local state just to sync via effects.
2. **Boundary Isolation**: Strict separation between UI presentation, business calculation, and network API layers.
3. **Zero Speculative Abstraction**: Express directly first. Never introduce thin wrapper functions or premature abstraction layers without genuine domain meaning.
4. **Defensive at Boundaries**: Normalize untrusted or raw shapes once at the ingestion boundary. Use single-hop fallbacks; eliminate cascading guessing chains.

---

## Scenario Rules

| Scenario | Rules File | Core Focus |
| :--- | :--- | :--- |
| **Component** | [rules/component.md](rules/component.md) | Unidirectional data flow, prop destructuring, derived state, imperative handle boundaries |
| **Logic** | [rules/logic.md](rules/logic.md) | Presentation vs domain decoupling, effect teardown & cancellation, async lifecycle |
| **State** | [rules/state.md](rules/state.md) | State minimization, avoiding prop drilling, immutable updates, single store ownership |
| **Defensive & Style** | [rules/defensive.md](rules/defensive.md) | Zero speculative wrappers, normalization at boundary, safe single-hop fallbacks (`??`) |
| **CSS & Styling** | [rules/css.md](rules/css.md) | Scoped component styles, design tokens / CSS variables, dynamic inline style limits |
| **Performance** | [rules/performance.md](rules/performance.md) | Route & heavy component code-splitting, memoized computations, list virtualization |
| **Conventions** | [rules/conventions.md](rules/conventions.md) | Feature-based directory layout, path aliases, centralized constants, decoupled API layer |

---

## Universal Review Checklist

Self-check after writing or refactoring code:

### Component & State
- [ ] Props flow down, events flow up; child does not mirror parent state into local state.
- [ ] Derived data computed on the fly rather than synchronized through effects or watchers.
- [ ] Imperative handles (`ref`) expose behavioral actions (`focus()`, `reset()`), not raw state setters.
- [ ] Shared state accessed via dedicated store/context; no prop drilling deeper than 3 layers.

### Logic & Async
- [ ] Business scoring, transformations, and complex orchestration extracted from UI components.
- [ ] Side-effects cleanly tear down listeners, intervals, and cancel ongoing async requests via `AbortSignal`.
- [ ] Async operations handle all states explicitly (loading, success, error) with no unhandled rejections.

### Defensive Coding & Abstraction
- [ ] No speculative one-line wrapper functions created without new domain meaning.
- [ ] Standard JS collection methods (`map`, `filter`, `find`) used directly without artificial wrappers.
- [ ] Untrusted inputs, query params, and status codes normalized once at boundary via lookup table.
- [ ] Safe defaults use single-hop fallback (`value ?? default`), avoiding long guessing chains.

### CSS & Conventions
- [ ] Design tokens or CSS custom properties used instead of hardcoded magic values.
- [ ] Third-party UI overrides strictly scoped under a feature container namespace.
- [ ] API endpoints defined in a dedicated API module, not invoked inline inside view components.
- [ ] Shared constants in `SCREAMING_SNAKE_CASE`; no magic strings or numbers.
- [ ] Cross-domain imports use configured path aliases (e.g. `@/`), not deep relative traversals (`../../../`).
