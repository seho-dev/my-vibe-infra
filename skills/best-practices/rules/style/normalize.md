# Normalize Rules

## Single Source of Truth Map

- Define your status/event enum map **once** at module level.
- Use **single lookup** (e.g. a `Map` with `.get()` and a default) rather than repeated `if` chains.
- Map stays small (< 20 entries) → easy to verify manually.

## When to Use a Utility Library

- Map content is **dynamic** (user input, API changes at runtime)
- Map keys/behavior are complex (nested objects, normalization need)
- Performance critical with high volume (not a simple one-off)

## When to Stick with Native

- Simple field extraction (direct property access)
- Basic filtering/reducing that adds clarity
- Deep cloning when immutable operations needed
- Currying, throttle, debounce

## Flow Considerations

```
API response (raw status code)
      ↓ 1. Parse (normalize)
Normalized status (lowercase enum key)
      ↓ 2. Display
Human-readable label (via STATUS_MAP)
      ↓ 3. Sort/Group (derived state)
Orderings, summaries, filters
```

## Examples

See [../../examples/style/normalize/patterns.md](../../examples/style/normalize/patterns.md)
