# Fallback Patterns

## When to Fallback

1. **Known shapes** (API explicit in TS signature) → use native (`??`, `?.`, default param)
2. **Unknown shapes** (dynamic inputs, config objects) → use safe access helpers or native optional chaining / nullish coalescing
3. **Business priority** (fallback chain order mirrors importance) → keep consistent
4. **Long chains need proof** → if you cannot point to a real boundary contract for `a ?? b ?? c`, normalize once instead

## Avoid Speculative Fallbacks

- Default return for _all_ types → type-safe code should handle expected shapes
- Only fallback when `null`/`undefined` are actual possibilities
- Do not repeat the same fallback decision at multiple call sites
- Do not hide unknown data shape behind long fallback chains

## Where to Fallback

```
Data parse layer (API response)
  ↓ Validate unknown shapes and use safe access
  transform(input) => validated value

Component display layer
  ↓ Use native access, shape guaranteed by the boundary
  display formatted value
```

## Chain Limit

- One direct backup is normal: `value ?? '-'`
- Two or more fallback hops are suspicious: `a ?? b ?? c`
- If the chain is long because upstream data is messy, fix it in parse/normalize instead of repeating the chain in business logic or render code

## Examples

See [../../examples/style/fallback/patterns.md](../../examples/style/fallback/patterns.md)
