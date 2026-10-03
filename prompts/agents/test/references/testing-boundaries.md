# Testing Boundaries

## Boundary Table

| Test Type   | Best For               | Cover                                                                    | Avoid                                                               |
| ----------- | ---------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Component   | visible UI behavior    | render output, interaction, callbacks, accessibility                     | child internals, deep DOM trivia, private state                     |
| Logic unit  | reusable state logic   | transitions, derived state, async coordination, cleanup                  | retesting the framework, thin wrappers with no independent value   |
| Util        | pure or near-pure logic | input/output contracts, fallback, malformed input, edge cases           | DOM, framework setup, trivial passthroughs                          |
| Integration | multi-part cooperation | shared-state wiring, container logic, async data flow, feature slices    | full-app E2E scope, third-party behavior                            |

## Component Tests

Use component tests when the public value is visual or interactive.

Focus on:

- visible render states
- user-triggered changes
- prop-driven behavior
- callback contracts
- accessibility semantics

Do not focus on:

- child implementation details
- internal state variables
- effect call counts when user-visible behavior is already covered

## Logic Unit Tests

Use logic unit tests when reusable logic exposes a contract independent of one component.

Focus on:

- initial state
- state transitions
- derived state
- async success and failure paths
- cleanup and reset behavior

Do not write a logic unit test merely because reusable logic exists. Logic that only forwards props or glue code may be better covered through the component that uses it.

## Util Tests

Use util tests for:

- mappers
- filters
- validators
- parsers
- formatters
- merge and fallback helpers

Prefer table-driven cases and edge-case coverage. Keep them free from UI noise.

## Integration Tests

Use integration tests when confidence depends on real collaboration between:

- shared-state wiring
- adapters
- async requests
- containers and presentational output

Keep the scope narrow. Test one meaningful feature slice, not an entire application journey.

## Escalation Rules

- Move upward to integration when a lower-level test would overfit implementation.
- Move downward to logic unit or util when a component test becomes too broad, noisy, or hard to diagnose.
