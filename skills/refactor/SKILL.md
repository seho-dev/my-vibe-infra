---
name: refactor
description: Generic refactor guardrails. Load before refactoring, restructuring, or migrating shared seams, APIs, state, or routing.
---

# Refactor Skill

## Before

1. **Lock behavior first** — add focused regression tests before moving code. Build/LSP passing is not enough.
2. **Inventory consumers** — list inputs, shared state, logic unit returns, route values, and handlers. Do not move by field similarity alone.
3. **Prefer existing patterns** — extend stable patterns instead of inventing new abstractions.

## During

4. **Policy and runtime separated** — config holds declarative policy, not instances, imperative handles, commands, or readiness state.
5. **Declarative over imperative** — prefer inputs and shared state for same-tree reads; imperative handles only for cross-layer bridges with explicit ownership and readiness.
6. **Do not over-generalize** — keep changes scoped; broaden only when multiple real consumers need it.
7. **Delete before toggle** — remove dead behavior, do not hide it behind flags.

## After

8. **Prove behavior, not mocks** — tests assert rendered output, interactions, or state transitions.
9. **Check full contract** — verify defaults, fallbacks, hidden state, and routing after public API or flow changes.
10. **Triage shared harness first** — when many tests fail with the same environment error, fix global setup before patching individual specs.

## Checklist

- [ ] Behavior locked before structure changes.
- [ ] Consumers known.
- [ ] Existing patterns used before new abstractions.
- [ ] Policy/config free of runtime capability.
- [ ] Declarative flow preferred over imperative handles.
- [ ] Scope matches actual need.
- [ ] Behavior-focused tests pass.
- [ ] Full contract re-checked.
- [ ] Shared failures triaged before local patches.
