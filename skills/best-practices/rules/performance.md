# Performance Optimization Rules

## Core Principles

- **Code Splitting & Lazy Loading**: Split bundles by route and defer heavy non-critical components (e.g. rich text editors, charts, modal drawers) until needed.
- **Selective Memoization**: Memoize expensive computations and callback references when passing to memoized children to prevent cascade re-renders. Avoid speculative memoization on trivial computations.
- **DOM Virtualization**: When rendering collections with hundreds or thousands of items, virtualize the list to keep active DOM nodes constant.

## MUST

| Rule | Description |
| ---- | ----------- |
| Route code-splitting | Application routes and heavy conditional modules must be loaded asynchronously |
| No heavy sync work in render | Avoid running heavy synchronous loops, deep cloning, or large JSON parsing inside component render passes |
| Unique and stable keys | Collection items must use unique, stable entity IDs for keys, not array indices when items can reorder/filter |

## SHOULD

| Rule | Description |
| ---- | ----------- |
| Memoize expensive transforms | Cache sorting, grouping, or complex transformations with framework memoization tools (`useMemo`, `computed`) |
| Stable callback references | Keep event handler references stable when passed to memoized children or effect dependency arrays |
| Virtualize large datasets | Use virtualized lists for tables and feeds exceeding viewport capacity (~100+ items) |

---

## Patterns & Examples

### 1. Lazy Loading Routes and Heavy Components

```tsx
// ❌ Bad: Statically bundling massive libraries into the initial page bundle
import HeavyDataChart from './HeavyDataChart';

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  return (
    <div>
      <button onClick={() => setShowChart(true)}>View Analytics</button>
      {showChart && <HeavyDataChart />}
    </div>
  );
}

// ✅ Good: Dynamically import heavy component on demand
import { lazy, Suspense } from 'react';

const HeavyDataChart = lazy(() => import('./HeavyDataChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  return (
    <div>
      <button onClick={() => setShowChart(true)}>View Analytics</button>
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyDataChart />
        </Suspense>
      )}
    </div>
  );
}
```

### 2. Expensive Derivations & Callback Stability

```tsx
// ❌ Bad: Running expensive multi-step filter/sort on every unrelated re-render
function AnalyticsTable({ rawLogs, filterText, onSelectLog }) {
  // Re-runs even if rawLogs and filterText did not change!
  const processedLogs = rawLogs
    .filter((log) => log.message.includes(filterText))
    .sort((a, b) => b.timestamp - a.timestamp);

  // Re-creates new function reference on every parent render
  const handleSelect = (id: string) => onSelectLog(id);

  return <VirtualizedList items={processedLogs} onSelect={handleSelect} />;
}

// ✅ Good: Memoize expensive data derivations and stabilize handler references
function AnalyticsTable({ rawLogs, filterText, onSelectLog }) {
  const processedLogs = useMemo(() => {
    return rawLogs
      .filter((log) => log.message.includes(filterText))
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [rawLogs, filterText]);

  const handleSelect = useCallback((id: string) => {
    onSelectLog(id);
  }, [onSelectLog]);

  return <VirtualizedList items={processedLogs} onSelect={handleSelect} />;
}
```
