# Performance Rules

## MUST

| Rule         | Description                                                |
| ------------ | ---------------------------------------------------------- |
| Lazy loading | Route-level and large components use code splitting and lazy loading |

## SHOULD

| Rule                             | Description                                           |
| -------------------------------- | ----------------------------------------------------- |
| Stable callbacks                 | Handlers passed to children keep stable references   |
| Memoized computations            | Expensive derived data is memoized                    |
| Memoized pure display components | Consider memoization for pure display components     |
| Virtual scrolling                | Large tables use virtual scrolling                    |

## Examples

```text
✅ Lazy loading
  load ProjectPage only when its route is entered
  display a loading state while its code downloads

✅ Stable callbacks
  keep handleClick stable when passing it to a child
  handleClick emits submit(data)

✅ Memoized computations
  compute columns from their source inputs only when those inputs change
```
