# Coding Basics Pattern Examples

## Speculative Function Extraction

```javascript
// ❌ Direct JS was enough; wrapper adds no business meaning
const getDisplayName = item => item.key ?? item.name;

const displayName = getDisplayName(item);

// ✅ Keep the direct expression when shape is already known
const displayName = item.key ?? item.name;
```

## Wrapper That Only Forwards Arguments

```javascript
// ❌ Thin wrapper created only to look more testable
export const handleProjectList = list => formatProjectList(list);

// ✅ Export or call the original function directly
export { formatProjectList };
```

## Extract Only When Meaning Changes

```javascript
// ❌ Renames a JS statement but adds no new meaning
const isEditableProject = project => project.status === 'draft';

// ✅ Inline when the condition is local and obvious
const canEdit = project.status === 'draft';

// ✅ Extract when the function becomes a real domain rule
const isProjectEditable = project => {
  return project.status === 'draft' && !project.isArchived;
};
```

## Native JS First

```javascript
// ✅ Native is enough
const activeUsers = users.filter(user => user.active);
const hasAdmin = users.some(user => user.role === 'admin');
const name = user?.profile?.name ?? '-';

// ❌ Wrapping native operations adds no value here
const activeUsers = selectActiveUsers(users); // Merely calls users.filter(...)
const hasAdmin = checkAdmin(users); // Merely calls users.some(...)
const name = readNameWithFallback(user); // Merely reads user?.profile?.name ?? '-'
```
