# Fallback Pattern Examples

## Put Fallback at the Boundary

```javascript
// ✅ Parse layer: unknown shape
const normalizeJson = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};

// ✅ Display layer: known shape
const displayValue = data?.message ?? 'No message available';
```

## One Backup Is Normal, Long Chains Are Suspicious

```javascript
// ✅ Known shape, one clear default
const displayName = projectName ?? '-';

// ❌ AI-style chain: too many guesses in one expression
const displayName = item.projectName ?? item.name ?? item.title ?? item.content;

// ✅ Normalize once at the boundary, then read directly
const normalizedItem = normalizeProject(item);
const displayName = normalizedItem.projectName;
```

## Avoid Speculative Wrapper Fallback

```javascript
// ❌ Wrapper only adds fallback noise
export const transformCustomPayload = values =>
  transformCustomPayloadFromProject(values || {});

// ✅ Put fallback in the real boundary
export const transformCustomPayloadFromProject = (values = {}) => {
  const { name, type, status } = values;
  return { name, type, status };
};
```

## Avoid Long Fallback Chains

```javascript
// ❌ Hard to reason about
const displayName = item.key || item.title || item.name || item.content;

// ✅ Match the real data shape
const displayName = item.key ?? item.name;

// ✅ Or use an explicit default
const displayName = item.key ?? '-';
```

## Keep the Call Site Honest

```javascript
// ❌ Wrapper hides missing behavior
export const transformReportPayload = ({ values }) =>
  transformCustomPayload(values);

// ✅ Keep the call site explicit when no real adaptation exists
const payload = transformCustomPayload(values);
```
