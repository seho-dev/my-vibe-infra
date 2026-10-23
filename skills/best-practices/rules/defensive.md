# Defensive Coding & Simplicity Rules

## Core Principles

- **Zero Speculative Abstraction**: Write direct code first. Never extract a one-line wrapper function or create intermediate helper layers simply to claim code is "more testable" or "more decoupled". Extract only when real business logic is encapsulated, duplication is eliminated, or a public boundary is formed.
- **Normalize at Boundaries**: Parse and normalize untrusted, heterogeneous, or raw external inputs (API responses, URL params, local storage) once at the ingestion boundary. Downstream components and logic must receive predictable, strongly typed shapes.
- **Single-Hop Defensive Fallback**: One fallback hop is healthy (`value ?? defaultValue`). Long guessing chains (`a ?? b ?? c ?? d`) signal an ambiguous data contract that should be normalized at the source rather than patched in UI render logic.
- **Native JS First**: Standard JavaScript methods (`map`, `filter`, `find`, `some`, `every`, `includes`) are clear and self-documenting. Do not invent thin alias functions around them.

## MUST

| Rule | Description |
| ---- | ----------- |
| Direct expressions first | Do not extract trivial single-caller wrapper functions that add no domain meaning |
| Normalize at ingestion | Transform raw API enums, casings, or nullish properties at the parse layer once |
| Single lookup tables | Use lookup dictionaries / maps for status/enum mappings instead of sprawling `if/else` or `switch` chains |
| Single-hop fallbacks | Provide immediate, safe defaults; avoid cascading fallback chains in display code |
| Predictable nullish handling | Prefer `??` and `?.` over loose truthy `||` to prevent falsy bugs with `0`, `""`, and `false` |

## SHOULD

| Rule | Description |
| ---- | ----------- |
| Fail-safe return shapes | Boundary parsers should return guaranteed empty shapes (`[]` for missing lists, `{}` for missing objects) |
| Early exit / guard clauses | Check boundary conditions early to eliminate nested blocks |

---

## Patterns & Examples

### 1. Zero Speculative Abstraction

```ts
// ❌ Bad: Thin wrapper functions that merely forward native expressions
const getActiveUsers = (users) => users.filter((u) => u.isActive);
const getUserDisplayName = (user) => user.name ?? 'Anonymous';
const isPositive = (count) => count > 0;

// ✅ Good: Use direct, idiomatic expressions where intent is obvious
const activeUsers = users.filter((u) => u.isActive);
const displayName = user.name ?? 'Anonymous';
if (count > 0) { /* ... */ }

// ✅ Good: Extract ONLY when genuine domain policy or multi-step logic exists
function canPublishArticle(article: Article): boolean {
  return article.status === 'approved' && !article.isArchived && article.wordCount >= 300;
}
```

### 2. Normalization at Ingestion Boundary

```ts
// ❌ Bad: Scattering ad-hoc parsing and case checks across multiple UI components
function OrderBadge({ status }: { status: string }) {
  if (status === 'PAID' || status === 'paid' || status === '1') {
    return <span className="badge-success">Paid</span>;
  }
  return <span className="badge-default">Pending</span>;
}

// ✅ Good: Normalize at data receipt; downstream logic uses consistent enum/map lookup
type OrderStatus = 'paid' | 'pending' | 'canceled';

const STATUS_LABEL_MAP: Record<OrderStatus, string> = {
  paid: 'Paid',
  pending: 'Pending',
  canceled: 'Canceled',
};

function normalizeOrderStatus(raw: unknown): OrderStatus {
  const normalized = String(raw ?? '').trim().toLowerCase();
  return normalized in STATUS_LABEL_MAP ? (normalized as OrderStatus) : 'pending';
}

function OrderBadge({ status }: { status: OrderStatus }) {
  return <span className="badge">{STATUS_LABEL_MAP[status]}</span>;
}
```

### 3. Safe Fallbacks vs Guessing Chains

```ts
// ❌ Bad: Speculative fallback chains guessing where data might hide
const title = item.title ?? item.name ?? item.label ?? item.header ?? 'Untitled';

// ❌ Bad: Unintentional truthy check breaking valid zero values
const count = response.count || 10; // When count is 0, incorrectly defaults to 10!

// ✅ Good: Explicit nullish coalescing with guaranteed boundary contract
const count = response.count ?? 10;
const title = item.title ?? 'Untitled';
```
