# Adapter Notes

## What an Adapter Means

An adapter is any boundary that bridges product code to a host environment or heavy subsystem.

- router and shared-state wiring
- feature-flag and configuration layers
- host application or desktop-shell bridges
- third-party subsystem integration
- external API modules or host capability wrappers

## Typical Test Setup

Frontend tests commonly involve:

- the project's test runner
- router wrappers
- shared-state and feature-flag setup
- config-driven containers and host shells

## Adapter Testing Rule

For component, logic unit, and integration tests, stop at the adapter contract unless the adapter itself is the unit under test.

That means:

- keep app logic real
- mock the host boundary at its interface
- assert success, empty, error, and degraded behavior through the contract

## Typical Keep-Real vs Mock Mapping

Keep real when the test is supposed to verify:

- shared-state or router wiring
- configuration-driven branching inside the unit under test
- public state transitions across local collaborators

Usually mock when the dependency crosses into:

- API modules or transport clients
- host subsystem and bridge interfaces
- analytics, logging, and reporting sinks
- environment capabilities outside the product code boundary

## Data Shape Guidance

- Use realistic but minimal payloads.
- Prefer fixture builders when the same contract shape repeats.
- Keep invalid and partial payloads explicit in edge-case tests.

## Common Risk Areas

- adapter unavailable or rejected
- partial host capability support
- readonly or degraded mode
- async bridge latency
- capability switches
