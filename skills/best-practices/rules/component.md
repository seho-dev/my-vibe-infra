# Component Rules

## MUST

| Rule                             | Description                                                           |
| -------------------------------- | --------------------------------------------------------------------- |
| Function-style components        | Class components prohibited                                           |
| Props destructuring              | `({ name, age }) => {}` not `(props) => {}`                           |
| Explicit imperative handles      | Complex components expose handles through a documented API; direct DOM manipulation prohibited |
| Consistent exports               | One export style per project                                          |
| Single source of truth           | State has one owner; downstream reads or emits intent, never mirrors  |
| Derived data via pure function   | Compute at the source; never mirror it into local state and sync with effects |
| Callbacks report events only     | `onXxx` describes what happened; not a channel to replicate state     |
| Prop ordering                    | Data → state → config → callbacks; `onXxx` last (see Prop Ordering)   |

## SHOULD

| Rule                             | Description                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------- |
| Stable handlers                  | Keep long or repeatedly passed handlers stable                       |
| Event naming `handleXxx`         | `handleClick`, `handleSubmit`, `handleChange`                                 |
| Request naming `fetchXxx/getXxx` | `fetchData`, `getUserInfo`                                                    |
| Debug names                      | Preserve component names for debugging tools                         |
| Early returns preferred          | Return loading/empty states before the main render                   |

## Design Principles

- A component is a boundary, not a data bus: inputs flow in, events flow out, and each piece of state has one owner.
- Prefer a single source of truth. Downstream components should read values or emit intent; they should not mirror parent state just to stay in sync.
- Keep derived data close to the source of truth. If a consumer needs another shape, expose a pure selector or derived prop, not a synchronization callback.
- Use callbacks to report events and user intent. `onXxx` should describe what happened, not be a state replication channel.
- Reserve imperative handles for actions such as focus, scroll, export, or reset—not raw state setters or duplicate snapshots.
- Treat config objects as policy boundaries. Stable behavior belongs in config; changing runtime state belongs in state, context, or selectors.

See [examples/component/patterns.md](../examples/component/patterns.md#unidirectional-data-flow) for good/bad flow examples and [examples/component/patterns.md](../examples/component/patterns.md#ownership-boundary) for state boundary examples.

## Prop Ordering

- Keep props grouped by meaning: data and identity first, state and derived values next, config and flags after that, and callbacks last.
- Put `onXxx` callbacks together at the end of destructured props, runtime prop validation (if the project uses it), and call sites when practical.
- Mirror the same ordering in runtime prop validation (if the project uses it) and default values so a component reads the same way in every file.
- If a component grows too many props, split by semantic sub-objects instead of mixing unrelated groups.
- Do not use object spreads to hide prop ordering. Make the shape explicit and readable.

## Prohibited Patterns

```text
❌ Class-based component
❌ Direct DOM manipulation: document.getElementById(...)
❌ Multi-line inline handler instead of a named handler
❌ Passing the whole props object instead of destructuring
```

## Examples

See [examples/component/patterns.md](../examples/component/patterns.md)
