# API Layer Rules

## MUST

| Rule              | Description                         |
| ----------------- | ----------------------------------- |
| API call location | Keep API calls in the project's designated API layer |
| HTTP client instance | Created only in the project's shared HTTP layer |

## SHOULD

| Rule            | Description                            |
| --------------- | -------------------------------------- |
| Request failure | Use try/catch + the app's user-facing error notifier |

## Typical Layout (illustrative — follow the project's conventions)

- API definitions: `src/api/*.api.js`
- HTTP instances: `src/services/http*.js`
- Error handling: `src/services/util.js`

## Examples

```js
// ✅ API call kept in the project's API layer
export const getProjectByIdApi = id => http.get(`/projects/${id}`);

// ✅ Request failure handling
async function fetchData(id) {
  try {
    setLoading(true);
    const result = await getProjectByIdApi(id);
    setData(result);
  } catch (error) {
    showError(error);
  } finally {
    setLoading(false);
  }
}
```

---

# Error Handling Rules

## MUST

| Rule               | Description                                   |
| ------------------ | --------------------------------------------- |
| HTTP common errors | Handled by services interceptor (401/403/500) |

## SHOULD

| Rule                   | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| Business errors        | Use `try/catch` + the app's user-facing error notifier |
| Production environment | Integrate an error monitoring / session replay service |
