# Coding Basics

Mandatory entry before coding. After this file, open the specialized rule that matches the change; use [index.md](index.md) to pick one when unsure.

## MUST

- Prefer concise, intention-revealing code.
- Do not add speculative function extraction just to replace direct JS statements or to claim it is “more testable”.
- Extract a function only when it adds real business meaning, removes real duplication, or isolates a real boundary.
- Use native JS for obvious `map/filter/some/every/find/includes`; reach for a utility library only when it clearly removes boilerplate or branches.

These are broad coding rules. Boundary fallback, normalization, and CSS rules belong to their specialized chapters.

## Main AI Failure Modes

1. **Abstract too early**: direct JS would be enough, but it extracts a thin wrapper function and calls it “easier to test”.
2. **Name things without new meaning**: it wraps or renames a statement even though the code did not gain domain meaning.

The default rule is:

> Direct expression first.
> No new meaning: do not extract a function.

## Read Next

- General style: [index.md](index.md)
- Normalize: [normalize.md](normalize.md)
- Fallback: [fallback.md](fallback.md)
- CSS: [../css.md](../css.md)

## Examples

See [../../examples/style/coding-basics/patterns.md](../../examples/style/coding-basics/patterns.md)
