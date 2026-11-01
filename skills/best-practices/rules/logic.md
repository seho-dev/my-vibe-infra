# Business Logic & Async Rules

## Core Principles

- **Separation of Presentation & Domain Logic**: Separate complex domain policy and async orchestration from rendering when they form a coherent responsibility. Simple calculations, state updates, and local handlers can remain in components; a dedicated hook or service is not required for every operation.
- **Explicit Lifecycle & Cleanup**: Side effects that establish listeners, timers, or ongoing network requests must be safely cleaned up on unmount or dependency change. Cancel obsolete work or ignore stale completions where these changes can race.
- **Predictable Async States**: Workflow owners represent relevant pending, fulfilled, and rejected outcomes explicitly. Lower-level helpers may return values or promises without their own state wrappers.

## MUST

| Rule | Description |
| ---- | ----------- |
| Separation of concerns | Give complex domain policy, transformations, and orchestration a clear responsibility boundary; keep simple local handlers in the component |
| Effect cleanup | Clean up subscriptions, DOM event listeners, intervals, and pending network requests on teardown |
| Async error ownership | The designated owner recovers, translates, or reports failures so they remain observable; other layers propagate errors, without mandatory catches at every async layer or unhandled rejections |
| No stale closures | Effect and callback dependencies must remain accurate and synchronized |

## SHOULD

| Rule | Description |
| ---- | ----------- |
| Justified logic extraction | Extract for domain meaning, cognitive clarity, actual reuse, or a responsibility/effect boundary; use hooks/composables when framework lifecycle or reactive state calls for them |
| Abortable requests | Pass `AbortSignal` to async requests when ongoing work should be canceled on re-trigger or unmount |
| Return explicit states | Workflow owners expose state (`data`, `isLoading`, `error`) and actions when consumers need them; lower-level helpers can return values or promises |

---

## Patterns & Examples

### 1. Presentation & Logic Separation

Here, `useUserMetrics` owns the request lifecycle, cancellation, and error state; simple local handlers do not need a hook.

```tsx
// ❌ Bad: Unobserved request failures and domain scoring policy mixed into rendering
function UserStatusWidget({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/users/${userId}/metrics`)
      .then((res) => res.json())
      .then((res) => {
        if (!active) return;
        // Domain scoring policy embedded in the view layer
        const score = res.points * 1.5 + (res.tier === 'VIP' ? 100 : 0);
        setData({ ...res, score });
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>Score: {data?.score}</div>;
}

// ✅ Good: Domain policy and request lifecycle have a clear owner
function UserStatusWidget({ userId }) {
  const { data, isLoading, error } = useUserMetrics(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div role="alert">Unable to load metrics.</div>;
  return <div>Score: {data?.score}</div>;
}
```

### 2. Side Effect Cleanup & Cancellation

```tsx
// ❌ Bad: Uncleaned listeners and fire-and-forget requests that leak or set state after unmount
useEffect(() => {
  window.addEventListener('resize', handleResize);
  fetchData(id).then((result) => setData(result));
  // Missing cleanup listener and missing abort signal
}, [id]);

// ✅ Good: This effect owns cleanup and failure reporting; fetchData propagates errors
useEffect(() => {
  const controller = new AbortController();

  const handleResize = () => setDimensions(window.innerWidth);
  window.addEventListener('resize', handleResize);

  fetchData(id, { signal: controller.signal })
    .then((result) => {
      if (!controller.signal.aborted) setData(result);
    })
    .catch((error) => {
      if (!controller.signal.aborted) {
        showErrorMessage(error);
      }
    });

  return () => {
    window.removeEventListener('resize', handleResize);
    controller.abort();
  };
}, [id]);
```

### 3. Predictable Async State Machine

```tsx
// ✅ Good: Explicit status representation prevents impossible states (e.g., loading && error)
type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: T | null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: T | null; error: Error };
```
