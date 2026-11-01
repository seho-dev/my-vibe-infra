# Boundary Safety & Simplicity Rules

Language-independent baseline for designing, writing, refactoring, and reviewing code. Use the language's idiomatic validation, error propagation, and resource-lifetime constructs.

## MUST

- **Justify complexity with evidence.** Before adding guards, retries, locks, compatibility branches, or similar machinery, identify the triggering condition, evidence from a requirement/contract/reachable execution path, failure consequence, and existing protection. Do not invent probabilities; omit mechanisms justified only by speculation.
- **Preserve necessary safety.** Security checks, permissions, data integrity, resource safety, and protection against reachable races are not optional complexity. Ask the user when speculative scope adds meaningful complexity or the contract needs a decision, not for ordinary safety work.
- **Validate each relevant trust boundary once.** Parse external inputs into reliable internal contracts with runtime checks for required fields, types, ranges, and allowed values. Types, annotations, and casts alone, in any language, are not runtime validation. Internal functions rely on guarantees already established; a new trust boundary, changed data, or new invariant may require another check.
- **Normalize only agreed representations.** Apply documented transforms, not guessed field aliases, coercions, casing rules, or unknown-value mappings. Reject malformed mandatory data; never map an unknown status to a legitimate status.
- **Default only permitted absence.** A default is valid only when the contract allows absence and defines the default's meaning. Distinguish absence from invalid values and preserve valid zero, false, and empty values. Even a single fallback must not turn invalid required data or failed operations into success, empty collections, or placeholders.
- **Handle errors at a capable owner.** Recover, translate with useful context while preserving the cause, or report at an application/protocol boundary. Otherwise propagate through idiomatic exceptions, results, or error returns. Do not swallow failures, add blanket fallbacks, or catch-log-rethrow at every layer. Report a failure once at the responsible boundary.
- **Always release resources.** Use structured lifecycle constructs or guaranteed cleanup for files, transactions, subscriptions, locks, and other acquired resources, including error and cancellation paths. Cleanup does not require a redundant error handler.

## SHOULD

- **Start direct and local.** Reuse codebase facilities, standard libraries, native/platform features, then existing dependencies before adding abstractions or dependencies.
- **Extract for a real purpose.** Domain meaning, reduced cognitive burden, actual reuse, and responsibility/side-effect boundaries justify extraction. Caller count, line count, or testability alone do not; a useful domain policy may have one caller, while a pass-through helper may have many.
- **Keep one authoritative owner.** Derive dependent data instead of synchronizing copies. Intentional drafts or caches need an explicit lifecycle, not a second competing source of truth.

## Illustrative Pseudocode

These examples describe contracts, not a required language, library, or architecture. Runtime predicates perform real checks; record construction alone is not validation.

### 1. Validate Once; Default Only Legitimate Absence

Example contract: an order is an object with a mandatory exact status of `paid`, `pending`, or `canceled`. `retry_count` may be absent, meaning `0`; when present it must be a non-negative integer. No coercion or case normalization is agreed.

```text
function parse_order(raw):
    if not is_object(raw) or not has_field(raw, "status"):
        fail InvalidInput("order requires status")

    status = raw["status"]
    if not is_string(status) or status not in {"paid", "pending", "canceled"}:
        fail InvalidInput("invalid status")

    if has_field(raw, "retry_count"):
        retry_count = raw["retry_count"]
        if not is_integer(retry_count) or retry_count < 0:
            fail InvalidInput("invalid retry_count")
    else:
        retry_count = 0

    return ValidatedOrder(status, retry_count)

function status_label(order):
    # Internal contract already guarantees a known status.
    return {"paid": "Paid", "pending": "Pending", "canceled": "Canceled"}[order.status]
```

Missing `retry_count` defaults to `0`; a supplied `0` remains valid. A supplied null, negative number, string, or boolean fails the integer contract. Missing, unknown, or uppercase status fails rather than becoming `pending`. Internal consumers do not repeat these checks while the validated contract remains intact.

### 2. Domain Policy vs Pass-Through Helper

```text
# Unnecessary alias: no meaning or responsibility beyond the existing operation.
function filter_items(items, predicate):
    return filter(items, predicate)

# Prefer the existing operation directly.
active_users = filter(users, user -> user.active)

# Useful even with one caller: names an agreed shipment-release policy.
function can_release_shipment(shipment):
    return shipment.payment_status equals "paid"
        and shipment.inventory_reserved
        and not shipment.on_hold
```

The policy assumes validated shipment data and an agreed release contract. Its value is domain meaning, not its length or how many tests or callers use it.

### 3. Meaningful Error Ownership and Cleanup

Here `using` represents structured resource management that closes the file on every exit. The named errors illustrate expected failures, not a required exception hierarchy.

```text
function load_order(path):
    using source = open_read_only(path):
        return parse_order(decode_json(source.read()))
    # Read, decode, and validation failures propagate; no catch-log-rethrow.

function import_command(path):
    try:
        order = load_order(path)
        save_order(order)
    catch ReadFailure, DecodeFailure, InvalidInput, SaveFailure as error:
        report_import_failure(error)
        return Failure
    return Success
```

The command boundary can report failure and return an unsuccessful outcome. The loader cannot recover, so it propagates failures while still releasing the file. No layer substitutes an empty order or reports successful work after a failed save.
