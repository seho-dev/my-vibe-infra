# Logic Rules

## MUST

| Rule | Description |
| ---- | ----------- |
| Naming | Reusable logic units follow the project convention (commonly useXxx) |
| Order: third-party → shared state → local state → derived values → handlers → side effects | Keep logic in a consistent order at the component boundary |
| Shared state via dedicated accessor | Direct shared-state access prohibited |

## SHOULD

| Rule | Description |
| ---- | ----------- |
| Async requests: shared state-machine logic | Unified FETCH/SUCCESS/FAILURE handling |
| Lists: shared list-state reducer | Manage loading, pagination, search, data list |
| Polling pauses when the page/tab is hidden | Avoid background requests |
| Shared-state accessor fallback | Return a safe default when the value is missing |

## Prohibited Patterns

```text
❌ Read shared state directly instead of using the dedicated accessor
❌ Side effect reads stale data because its dependencies are not updated
❌ Expose shared state without a dedicated accessor or safe default
```

## Shared State Pattern

```text
✅ Shared state + dedicated accessor
  create shared state: AppConfig
  expose it at the app boundary
  access only through useAppConfig(), which returns a safe default
```

## Examples

See [examples/logic/patterns.md](../examples/logic/patterns.md)
