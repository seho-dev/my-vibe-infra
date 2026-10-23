# State Management Rules

## Core Principles

- **State Minimization**: Store only essential, raw state. If a value can be computed from existing state or props, calculate it dynamically on the fly.
- **Single Source of Truth**: Every piece of state has a designated owner. Shared state belongs in a well-defined store, context, or service layer with explicit accessors.
- **Avoid Prop Drilling**: When values or callbacks pass through more than 3 component layers without intermediate consumption, use context, composition, or the project's state store.
- **Immutable Updates**: State transitions must be pure and immutable to ensure predictable change detection and render consistency.

## MUST

| Rule | Description |
| ---- | ----------- |
| No duplicated state | Never copy shared state or props into local state unless intentionally creating an isolated editing buffer |
| Predictable mutations | Shared state mutations must go through explicit actions, dispatchers, or store methods |
| Shallow state scope | Place state as close to where it is consumed as possible; do not lift to global scope prematurely |

## SHOULD

| Rule | Description |
| ---- | ----------- |
| Derive over sync | Calculate filtered lists, counts, and active items directly in render or memoized selectors |
| Component composition | Prefer slot/children composition over passing state down multiple intermediate container components |

---

## Patterns & Examples

### 1. Minimal State vs Redundant Derived State

```tsx
// ❌ Bad: Redundant state variables that must be synchronized manually
function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedCount, setCompletedCount] = useState(0); // Redundant

  const handleToggle = (id: string) => {
    const updated = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    setTodos(updated);
    setCompletedCount(updated.filter((t) => t.done).length); // Prone to drift
  };
  // ...
}

// ✅ Good: Derive counts directly from the primary state
function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const completedCount = todos.filter((t) => t.done).length;

  const handleToggle = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };
  // ...
}
```

### 2. Prop Drilling vs Composition / Context

```tsx
// ❌ Bad: Drilling currentUser through unrelated intermediate layout components
function App({ currentUser }) {
  return <Layout currentUser={currentUser} />;
}
function Layout({ currentUser }) {
  return <Sidebar currentUser={currentUser} />;
}
function Sidebar({ currentUser }) {
  return <UserProfile user={currentUser} />;
}

// ✅ Good (Option A - Composition): Pass the leaf component directly via children
function App({ currentUser }) {
  return (
    <Layout>
      <Sidebar>
        <UserProfile user={currentUser} />
      </Sidebar>
    </Layout>
  );
}

// ✅ Good (Option B - Shared Context/Store): Access state directly at the consumer
function UserProfile() {
  const currentUser = useCurrentUser();
  return <div>{currentUser.name}</div>;
}
```

### 3. Isolated Editing Buffer vs State Mirroring

```tsx
// ✅ Good: Copying to local state is ONLY valid when creating an isolated draft buffer
function EditDialog({ initialData, onSave, onCancel }) {
  // Deliberate draft copy: edits do NOT reflect into parent until confirmed
  const [draft, setDraft] = useState(initialData);

  return (
    <div>
      <input
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
      />
      <button onClick={() => onSave(draft)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
```
