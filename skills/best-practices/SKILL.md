---
name: best-practices
description: Language-independent coding standards and architecture guardrails. Load when designing, writing, refactoring, or reviewing code in any language. Includes scoped frontend extensions for components, logic, state, styling, performance, and conventions.
---

# Code Best Practices

Apply the general baseline to code in any language or runtime. Load frontend extensions only when the task involves the corresponding frontend concerns.

> `MUST` rules describe correctness and safety baselines. Follow the language's idioms and existing project conventions; illustrative syntax, names, and layouts do not prescribe architecture for other stacks.

## Core Invariants

1. **Justified Complexity**: Add machinery only for a requirement, contract, or credible failure mode; never remove required safety to simplify code.
2. **Reliable Boundaries**: Validate external input at each relevant trust boundary, then rely on established internal guarantees. New invariants need checks; types and casts alone do not validate runtime data.
3. **Honest Contracts**: Normalize agreed representations and default only permitted absence. Never disguise invalid mandatory data or failed work as success or empty results.
4. **Direct Code First**: Prefer existing code, standard libraries, platform features, and installed dependencies. Extract for domain meaning, cognitive simplicity, reuse, or responsibility boundaries, not line/caller counts or testability alone.
5. **Capable Error Ownership**: Recover, add useful context, or report at the responsible boundary; otherwise propagate idiomatic errors/results/exceptions. Resource cleanup is mandatory.
6. **Single Source of Truth**: Give data and policy clear owners; derive dependent values instead of synchronizing redundant copies. Do not impose frontend layers on other stacks.

## General Review Checklist

Self-check after designing, writing, refactoring, or reviewing code:

- [ ] New machinery has a concrete trigger, evidence, consequence, and insufficient existing protection; probabilities were not invented.
- [ ] Meaningful speculative additions or unresolved contract choices were raised with the user; ordinary safety did not await permission.
- [ ] Malformed external data and failed work cannot pass as valid results; normalization and defaults follow explicit contracts.
- [ ] A reader can trace data/policy ownership, side effects, and error handling without redundant layers or repeated internal validation.
- [ ] Security, permissions, data integrity, resource lifetimes, and reachable races remain protected.

## Language-Independent Baseline

Apply [rules/defensive.md](rules/defensive.md) for evidence-based simplicity, boundary contracts, abstraction decisions, defaults, and error ownership in every language.

## Frontend Extensions (Load Only When Applicable)

These files extend the baseline for frontend work. Do not apply their component, store, CSS, browser, import-alias, or directory-layout prescriptions to unrelated languages or runtimes.

| Frontend Concern | Rules File | Core Focus |
| :--- | :--- | :--- |
| **Component** | [rules/component.md](rules/component.md) | Unidirectional data flow, derived state, behavioral handles |
| **Logic** | [rules/logic.md](rules/logic.md) | Presentation/domain boundaries, effect cleanup, async lifecycle |
| **State** | [rules/state.md](rules/state.md) | Minimal state, composition, explicit ownership and updates |
| **CSS & Styling** | [rules/css.md](rules/css.md) | Scoped styles, design tokens, dynamic inline styles |
| **Performance** | [rules/performance.md](rules/performance.md) | Frontend loading, rendering, memoization, virtualization |
| **Conventions** | [rules/conventions.md](rules/conventions.md) | Frontend project structure, imports, constants, API boundaries |

### Frontend Review Additions

- [ ] State ownership and derived values are explicit; components receive data and emit intent instead of synchronizing copies.
- [ ] Effects clean up listeners and ongoing work; async outcomes have explicit owners and cannot overwrite newer state.
- [ ] Styling, API boundaries, imports, and optimizations follow the applicable framework and project conventions without speculative machinery.
