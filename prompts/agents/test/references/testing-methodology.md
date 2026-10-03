# Testing Methodology

## Goal

Frontend tests should protect behavior, preserve refactor safety, and fail in ways that clearly explain product regressions.

## Core Testing Strategy

- Prefer behavior-focused assertions over implementation-detail assertions.
- Use integration-oriented tests when confidence depends on multiple parts working together.
- Use util and logic unit tests when isolation improves clarity, speed, and failure diagnosis.
- Keep setup deterministic: control time, randomness, network, and shared state.

## What to Cover

Every meaningful test suite should intentionally choose from:

- happy path
- meaningful edge cases
- empty state
- error state
- async state transition
- permission or feature gate when applicable

## Assertion Priorities

Prefer this order:

1. visible behavior and public contract
2. stable semantic queries or selectors
3. explicit callback payloads or returned values
4. implementation detail assertions only when they are the contract

## Determinism Rules

- Do not let tests depend on clock drift, random values, or shared global state.
- Keep fixture data minimal but realistic.
- Reset mock state per test or per suite as needed.
- Avoid shared mutable setup hidden behind helpers.

## Anti-Patterns

- testing private methods
- asserting intermediate framework behavior instead of product contract
- duplicating implementation inside mocks
- using snapshots as the primary confidence mechanism
- keeping very large specs that protect multiple unrelated behaviors
- asserting CSS classes, styles, or static copy unless dynamic business logic
- adding state or return values to business code solely for test assertions
