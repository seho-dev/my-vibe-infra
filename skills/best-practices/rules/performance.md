# Performance Optimization Rules

## Core Principles

- **Code Splitting & Lazy Loading**: Split routes or defer heavy non-critical components when current workload, loading budgets, profiling, or established platform constraints justify the boundary; do not split speculatively.
- **Selective Memoization**: Memoize computations only when workload, budgets, or profiling justify the cost. Stabilize callback identity only when a consumer actually depends on it for correctness or a justified optimization; dependency lists must remain accurate.
- **DOM Virtualization**: Virtualize when representative workload, rendering budgets, or profiling show that DOM cost warrants it; item count alone is not a universal threshold.

## MUST

| Rule | Description |
| ---- | ----------- |
| Justified code-splitting | Base loading boundaries on current workload, profiling, budgets, or established constraints, not a requirement to load every route asynchronously |
| No heavy sync work in render | Avoid running heavy synchronous loops, deep cloning, or large JSON parsing inside component render passes |
| Unique and stable keys | Collection items must use unique, stable entity IDs for keys, not array indices when items can reorder/filter |

## SHOULD

| Rule | Description |
| ---- | ----------- |
| Memoize expensive transforms | Cache transformations with framework tools (`useMemo`, `computed`) when workload, budgets, or profiling justify it, not merely because they sort or group |
| Stable callback references | Stabilize identity only when the consumer depends on it; reuse an existing callback when possible, and always keep effect/callback dependencies accurate |
| Virtualize costly datasets | Use virtualization when representative workload, rendering budgets, or profiling establish a need; preserve stable keys and interaction correctness |

---

## Patterns & Examples

### 1. Lazy Loading Routes and Heavy Components

The route's error boundary owns import failures; `Suspense` handles the loading state.

```tsx
// ❌ Bad: Eager chart loading exceeds this route's established initial bundle budget
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

// ✅ Good: Defer this optional chart to meet the loading budget
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

For this workload, profiling justifies virtualization and cached filtering/sorting. `onSelectLog` is already stable, and the list's memoized consumer relies on its identity to skip work.

```tsx
// ❌ Bad: Running expensive multi-step filter/sort on every unrelated re-render
function AnalyticsTable({ rawLogs, filterText, onSelectLog }) {
  // Re-runs even if rawLogs and filterText did not change!
  const processedLogs = rawLogs
    .filter((log) => log.message.includes(filterText))
    .sort((a, b) => b.timestamp - a.timestamp);

  // Unnecessary wrapper defeats the consumer's useful callback stability
  const handleSelect = (id: string) => onSelectLog(id);

  return <VirtualizedList items={processedLogs} onSelect={handleSelect} />;
}

// ✅ Good: Cache measured expensive work and reuse the already-stable callback
function AnalyticsTable({ rawLogs, filterText, onSelectLog }) {
  const processedLogs = useMemo(() => {
    return rawLogs
      .filter((log) => log.message.includes(filterText))
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [rawLogs, filterText]);

  return <VirtualizedList items={processedLogs} onSelect={onSelectLog} />;
}
```
