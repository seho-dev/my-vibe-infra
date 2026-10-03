# Component Creation Checklist

Check before creating new components:

## Basic Structure

- [ ] Component has a clear single responsibility
- [ ] Component name PascalCase, filename matches component name
- [ ] Props destructured directly, no `props.xxx`
- [ ] Use the project's standard export convention
- [ ] Props ordered as `data/state` → `config/flags` → `onXxx` callbacks
- [ ] `onXxx` callbacks grouped at the end of destructuring, call sites, and runtime validation (if used)
- [ ] Data flows one way: parent owns state, child emits intent only
- [ ] Child state is not a mirror of parent state unless there is a real local ownership boundary

## Logic Usage

- [ ] Reusable logic has a clear owner and interface
- [ ] Order: third-party integrations → shared state → local state → derived data → handlers → side effects
- [ ] Shared state accessed via dedicated accessor with a safe default
- [ ] Derived data stays in sync with its inputs; side effects are cleaned up

## Event Handling

- [ ] Event function naming `handleXxx`
- [ ] Request function naming `fetchXxx/getXxx`
- [ ] Multi-line inline handlers moved into named functions
- [ ] Stateless functions extracted outside component

## Style Handling

- [ ] Class names in kebab-case
- [ ] Conditional styles use native string composition or class lists
- [ ] > 3 properties not inline style
- [ ] Style files in `src/styles/`

## Performance Optimization

- [ ] Table columns recomputed only when their inputs change
- [ ] Handlers passed to children stable when needed
- [ ] Large components consider on-demand loading
- [ ] Pure display components avoid unnecessary updates

## File Organization

- [ ] Shared components in `src/components/`
- [ ] Business components in `src/pages/{domain}/components/`
- [ ] Business logic extracted to `logic/`
- [ ] File < 300 lines
- [ ] Build-specific features use build-time flags rather than unnecessary runtime branches

## Imperative Access

- [ ] Complex components expose imperative handles only when needed
- [ ] Exposed methods describe actions, not internal implementation
- [ ] No direct DOM manipulation
- [ ] Exposed handles are behaviors, not mirrored state setters

## Constants Definition

- [ ] Shared constants imported from `src/utils/constants.js`
- [ ] Business constants from corresponding `constants.js`
- [ ] Constants named `SCREAMING_SNAKE_CASE`
- [ ] No hardcoded strings

## Error Handling

- [ ] Async operations use `try/catch`
- [ ] Error messages use the app's error display
- [ ] Loading state managed correctly
