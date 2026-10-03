# Mock Boundary Rules

## Core Rule

Mock external volatility, not internal value.

## Usually Safe to Mock

- network clients and API modules
- browser APIs that are unstable or unavailable in the test environment
- time, timers, random IDs, UUIDs
- analytics and logging sinks
- heavy third-party SDK shells
- host adapters that cross outside the app boundary

## Usually Not Worth Mocking

- pure utils owned by the same behavior path
- internal selectors or logic units that define the contract under test
- shared-state wiring that the test is meant to protect
- simple child components unless they create extreme noise

## Shared Helper Extraction Rules

Extract a shared helper only when all of the following are true:

1. the setup repeats across multiple files
2. the helper has little or no business-specific meaning
3. the extracted helper makes the test easier to read
4. the helper does not hide critical setup assumptions

## Keep Local When

- the mock carries scenario-specific business meaning
- the test captures a file-specific wiring contract
- extraction would create a black box that hides intent
- only one spec currently needs the pattern

## Good Shared Helpers

- lightweight router wrappers
- shared-state wrappers
- stable no-op UI shells
- minimal API mock factories
- fixture factories with broad reuse and clear names

## Bad Shared Helpers

- `mockEverythingForX`
- helpers that both arrange and assert
- helpers that silently inject broad business state
- helpers that hardcode multiple unrelated mocks for convenience

## Review Questions

- Does this mock preserve the real contract shape?
- Does this helper make the spec more explicit or more opaque?
- If the mock were removed, would the test become more truthful?
