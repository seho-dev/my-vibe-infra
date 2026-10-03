# Code Review Checklist

Self-check after coding. Correct/wrong examples in [../examples/](../examples/).

## Component

- [ ] Component responsibilities and state ownership clear? No unnecessary inheritance?
- [ ] Props destructured directly? No direct DOM manipulation?
- [ ] Imperative access, if needed, exposes named behaviors rather than raw state setters?

## Logic

- [ ] Order: third-party integrations → shared state → local state → derived data → handlers → side effects?
- [ ] Shared state accessed via a dedicated accessor with a safe default?
- [ ] Derived values update when inputs change? Side effects cleaned up on disposal?

## Functions

- [ ] Multi-line event handlers named instead of written inline?
- [ ] Stateless functions extracted outside component?
- [ ] Event naming `handleXxx`? Request naming `fetchXxx/getXxx`?

## Style

- [ ] Utility code uses a utility library only when it reduces real boilerplate? Native JS for obvious `map/filter/some`?
- [ ] No meaningless aliases, wrappers, or hand-written common predicates?

## CSS

- [ ] Class names kebab-case? > 3 properties not inline style?
- [ ] Styles in `src/styles/`? No scattered style files in component directories?

## Import

- [ ] Configured alias for shared imports? No `../../../..`?

## Constants

- [ ] Import from `constants.js`? `SCREAMING_SNAKE_CASE`? No hardcoding?

## Performance

- [ ] Table columns and other derived configurations recomputed only when inputs change?
- [ ] Handlers passed to children stable when their dependencies have not changed, if needed?
- [ ] Route-level or large components loaded on demand where beneficial?

## File

- [ ] < 300 lines? Shared in `src/components/`? Business in `pages/{domain}/components/`?
- [ ] Reusable logic extracted to `logic/`?
- [ ] Component files named in PascalCase?
- [ ] Reusable logic files named in camelCase?
- [ ] Utility files named in camelCase?
- [ ] Style/API files named in kebab-case?
- [ ] New directories use `kebab-case/`?
- [ ] Domain-specific utilities folder-scoped under `utils/{kebab-name}/`, not flat prefixed files?
- [ ] Entry file only acts as public export surface?

## Error Handling

- [ ] Async uses `try/catch`? Errors shown through the app's error display? Loading managed correctly?
