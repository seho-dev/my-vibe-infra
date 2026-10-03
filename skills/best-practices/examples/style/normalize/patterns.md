# Normalize Pattern Examples

## Single Source of Truth Map

```javascript
const STAGE_DISPLAY = new Map([
  ['draft', 'Draft'],
  ['pending', 'Pending'],
  ['done', 'Done'],
]);

const getStageLabel = stage => {
  // ?? keeps valid falsy values like 0 (|| drops them); Map avoids inherited keys like __proto__.
  const normalizedStage = String(stage ?? '').trim().toLowerCase();
  return STAGE_DISPLAY.get(normalizedStage) ?? '-';
};
```

## Normalize at Parse Layer

```javascript
const normalizeStatus = status =>
  String(status ?? '')
    .trim()
    .toLowerCase();

const normalizeProject = item => ({
  ...item,
  status: normalizeStatus(item.status),
});

const list = response.list.map(normalizeProject);
```

## Avoid Repeated Branches

```javascript
// ❌ Repeated comparisons in multiple places
if (status === 'DONE' || status === 'done' || status === 'Done') {
  return 'Done';
}

// ✅ Normalize once, then lookup once
const normalizedStatus = String(status ?? '')
  .trim()
  .toLowerCase();
return STAGE_DISPLAY.get(normalizedStatus) ?? '-';
```

## Derive Downstream from Normalized Value

```javascript
const grouped = Object.groupBy(list, item => item.status);
const doneCount = grouped.done?.length ?? 0;
```
