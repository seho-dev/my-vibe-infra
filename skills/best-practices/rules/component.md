# Component Architecture & Design Rules

## Core Principles

- **Unidirectional Data Flow**: Props flow down, events flow up. Components are view boundaries that project inputs into UI and emit user intent.
- **Single Source of Truth**: State has one owner. Downstream components read values or emit events; they must never mirror parent state into local state just to keep them in sync.
- **Pure Derivation**: Compute derived values synchronously on the fly. Do not sync derived state back to parent via callbacks or cache them in redundant local state.
- **Behavioral Imperative Handles**: Reserve imperative handles (`ref`) for actions (focus, scroll, reset). Never expose raw state setters or duplicate state snapshots.

## MUST

| Rule | Description |
| ---- | ----------- |
| Unidirectional flow | Parent owns state; child receives data and emits event callbacks |
| Explicit prop destructuring | Destructure props with default parameters at the component signature |
| No state mirroring | Never duplicate parent props into local state unless intentionally creating an isolated draft buffer |
| No direct DOM queries | Direct DOM queries (`document.querySelector`, `getElementById`) are prohibited; use framework refs |
| Behavior-only handles | Imperative handles expose actions (`focus()`, `reset()`), never internal state mutators |

## SHOULD

| Rule | Description |
| ---- | ----------- |
| Semantic prop ordering | Group props: identity/data → state/flags → event callbacks (`onXxx` last) |
| Early returns | Return early for loading, empty, and error states before primary render |
| Pure helper extraction | Stateless rendering helpers without closure dependencies should live outside the component |

---

## Patterns & Examples

### 1. State Ownership & Props Flow

```tsx
// ❌ Bad: Child mirrors parent state and attempts to two-way sync
function UserProfile({ user, onUpdate }) {
  const [localName, setLocalName] = useState(user.name);

  useEffect(() => {
    setLocalName(user.name);
  }, [user.name]);

  const handleChange = (e) => {
    setLocalName(e.target.value);
    onUpdate({ ...user, name: e.target.value });
  };

  return <input value={localName} onChange={handleChange} />;
}

// ✅ Good: Single owner; child renders value and emits change intent
function UserProfile({ user, onNameChange }) {
  return (
    <input
      value={user.name}
      onChange={(e) => onNameChange(e.target.value)}
    />
  );
}
```

### 2. Derived State Computation

```tsx
// ❌ Bad: Mirroring derived state and syncing with effects
function ItemList({ items }) {
  const [activeItems, setActiveItems] = useState([]);

  useEffect(() => {
    setActiveItems(items.filter((item) => item.isActive));
  }, [items]);

  return <ul>{activeItems.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;
}

// ✅ Good: Derive directly in render (memoize only if computation is heavy)
function ItemList({ items }) {
  const activeItems = items.filter((item) => item.isActive);

  return <ul>{activeItems.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;
}
```

### 3. Imperative Handles (Behavior vs Raw Setter)

```tsx
// ❌ Bad: Leaking raw state setters through an imperative handle
useImperativeHandle(ref, () => ({
  setIsOpen: (open) => setIsOpen(open),
  setData: (data) => setData(data),
}));

// ✅ Good: Exposing explicit behavioral actions
useImperativeHandle(ref, () => ({
  focusInput: () => inputRef.current?.focus(),
  resetForm: () => setFormState(initialState),
}));
```

### 4. Prop Destructuring & Ordering

```tsx
// ❌ Bad: Unstructured props access and mixed callback placement
function OrderCard(props) {
  return <div onClick={props.onSelect}>{props.order.id}</div>;
}

// ✅ Good: Destructured, default values explicit, callbacks grouped at end
interface OrderCardProps {
  orderId: string;
  status?: string;
  isExpanded?: boolean;
  onSelect: (id: string) => void;
  onCancel?: (id: string) => void;
}

function OrderCard({
  orderId,
  status = 'pending',
  isExpanded = false,
  onSelect,
  onCancel,
}: OrderCardProps) {
  return (
    <div onClick={() => onSelect(orderId)}>
      <span>{orderId} ({status})</span>
    </div>
  );
}
```
