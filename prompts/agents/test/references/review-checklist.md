# Review Checklist

## Scope

- Is the chosen test level the right one for the contract?
- Does the spec protect one primary behavior rather than many unrelated ones?
- If assertions were removed, is ownership still explicit elsewhere?

## Assertions

- Are assertions behavior-centric or contract-centric?
- Are async assertions stable and outcome-focused?
- Does the test avoid brittle coupling to implementation details?
- Does the test avoid asserting CSS classes, styles, or static copy?

## Mocking

- Are only true external boundaries mocked?
- Does each mock preserve the contract shape the app relies on?
- Is any mock or helper hiding critical setup assumptions?

## Readability

- Do test names describe behavior clearly?
- Is arrange / act / assert easy to follow?
- Would a failing assertion explain the regression in business terms?

## Maintenance

- Is fixture data minimal and meaningful?
- Is state isolated between tests?
- Are time, randomness, and network deterministic?

## Project-Specific Checks

- Is shared-state or adapter wiring respected where relevant?
