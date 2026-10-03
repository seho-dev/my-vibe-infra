# State Management Rules

## MUST

| Rule                        | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| Shared state access through a dedicated accessor | Use a dedicated accessor for shared state |
| Deep prop chains | Prop drilling beyond ~3 layers is a smell; prefer the project's shared state layer or pub/sub mechanism |

## SHOULD

| Rule                       | Description                                     |
| -------------------------- | ----------------------------------------------- |
| Cross-module communication | Use the project's shared state layer or pub/sub mechanism instead of deep prop chains |
| Stable references | Memoize complex shared values |

## Shared State Pattern

```text
✅ Shared state + dedicated accessor
  create shared state: AppConfig
  expose it at the app boundary
  read only through useAppConfig(), which returns a safe default when missing
```
