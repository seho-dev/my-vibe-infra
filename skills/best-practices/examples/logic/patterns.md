# Logic Pattern Examples

## Basic Logic Unit

```javascript
export async function fetchStatisticsData(type, params) {
  return (await getStats(type, params)).data;
}
```

```text
Logic unit owns data (initially []), loading (initially false)
  If autoFetch: call fetchData on initialization
  fetchData(params):
    Set loading to true
    Try: data = await fetchStatisticsData(type, params)
    Catch: showError(error)
    Finally: set loading to false
  Expose data, loading, fetchData
```

## Shared State Accessor

```text
✅ Correct: shared state is read through a dedicated accessor
  Shared appConfig is initialized by the application
  getAppConfig() returns appConfig ?? {} (safe default)
  Components call getAppConfig() instead of reading shared storage directly

❌ Wrong: each component reads raw shared state without a safe default
```

## Async State Machine

```javascript
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error(`Unknown action(${action.type})`);
  }
};

const createAsyncTask = (func, initialData) => {
  let state = { isLoading: false, isError: false, data: initialData };
  const dispatch = action => { state = dataFetchReducer(state, action); };

  return {
    getState: () => state,
    run: async (...params) => {
      dispatch({ type: 'FETCH' });
      try {
        const data = await func(...params);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        return data;
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
        throw error;
      }
    },
  };
};
```

## Cancelable Request

```javascript
const createCancelableRequest = (request, { autoCancel = true } = {}) => {
  let activeController;
  const cancel = () => activeController?.abort();

  return {
    cancel,
    request: async (...params) => {
      if (autoCancel) cancel();
      const controller = new AbortController();
      activeController = controller;
      try {
        return await request(...params, { signal: controller.signal });
      } catch (error) {
        if (error.name === 'AbortError') return { isCanceled: true };
        throw error;
      } finally {
        if (activeController === controller) activeController = undefined;
      }
    },
  };
};

// Call cancel() when the owner is disposed.
```

## Logic Order

```text
Component logic order:
  1. Third-party integrations
  2. Shared state via dedicated accessor
  3. Local state: loading and data
  4. Derived data: active items from data
  5. Handlers: handleSubmit updates loading and submits data
  6. Side effects: fetch initial data and clean up on disposal
  7. Display loading indicator or active items
```

## Naming Convention

```text
✅ use{Domain}{Action} for a project convention describing reusable logic
  useProjectOperation
  useUserInfo
  useStatisticsData

❌ Use{Domain}{Action} (uppercase first letter)
  UseEditTemplate
  UseAuditConfig
```

## Prohibited Patterns

```text
❌ Direct shared-state access
  Component reads internal userInfo storage instead of getUserInfo()

❌ Stale derived values
  Cache filteredData without updating it when source data changes

❌ Shared state without a dedicated accessor
  Each component reads a raw shared value and invents its own fallback
```
