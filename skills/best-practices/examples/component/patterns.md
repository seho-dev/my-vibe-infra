# Component Pattern Examples

## Basic Structure

```text
UserCard receives name, age, onClick
  Read shared user information through a dedicated accessor
  Own local isExpanded state (initially false)
  On details click: call onClick(name) if provided
  Display name and a Details action
Export UserCard
```

## Unidirectional Data Flow

```text
✅ Good: single owner for state, child emits intent only
  ItemListPage owns selectedItemId
  ItemList receives selectedItemId and forwards select(itemId) intent
  DetailPanel displays selectedItemId and emits select(firstItemId)
```

```text
❌ Bad: child mirrors parent state, then syncs it back through side effects
  ItemList copies selectedItemId into localSelectedItemId
  When parent changes: copy selectedItemId into localSelectedItemId
  When local changes: emit select(localSelectedItemId) to parent
```

```text
✅ Good: derived data stays pure and local to the source of truth
  ItemList receives items
  visibleItems = items where hidden is not true
  Display visibleItems in a table
```

```text
❌ Bad: derived data is copied into another state layer
  ItemList stores visibleItems separately
  When items change: update visibleItems and notify parent
  Display stored visibleItems in a table
```

```text
❌ Bad: derived data computed in child, then synced back to parent via callback
  DetailPanel computes updated and todo counts from items
  On every count change: emit statistic to parent
  Parent should own this derivation instead
```

```text
✅ Good: parent owns data, child receives data + emits events
  Parent owns formState = { title: '', status: 'draft' }
  ProfileForm receives formState and emits titleChange(title)
  Parent updates formState.title when titleChange fires
```

```text
❌ Bad: child owns a copy of parent data and mutates it independently
  ProfileForm copies formState from its value prop
  On input change: update its copy and emit titleChange(title)
  Input displays the copy, which can diverge from parent state
```

## Ownership Boundary

```text
✅ Good: state owner exposes explicit actions, not raw setters
  Counter owns value (initialValue)
  Exposed handle: reset() restores initialValue; increment() adds one
  Display value
```

```text
❌ Bad: state setter leaked across component boundary
  Counter owns value (initialValue)
  Exposed handle: setValue(nextValue) allows callers to mutate state directly
```

## Imperative Handle

```text
DataView receives data and onCellClick
  Own a reference to its scroll container
  Expose only refresh(), getData(), scrollToCell(row, column)
  Display data; emit cellClick when a cell is selected
```

## Named Imperative Handle

```text
AuxiliaryPanel receives project and onOpenPanel
  Own a reference to its panel
  Expose open() and close() actions using the panel reference
  Display the panel
```

## Conditional Rendering

```text
ProjectList receives projects and isLoading
  If isLoading: display a loading indicator
  Else if projects is empty: display "No data"
  Else: display a list of ProjectCard items keyed by project.id
```

## List/Table Config

```text
StatisticsTable receives data and showDeletionColumn
  Define columns for Project ID (centered) and Status (formatted with statusColorMap)
  If showDeletionColumn: append Deleted column displaying Yes or No
  Display data using the column configuration
```

## Error Handling

```text
DataFetcher receives apiFn and params
  Own data (initially null) and loading (initially false)
  When params change, fetch data:
    Set loading to true
    Try: await apiFn(params), then store result in data
    Catch: showError(error)
    Finally: set loading to false
  Display loading indicator or data
```

## Constants Definition

```text
✅ Constants defined outside component
  STATUS_COLOR_MAP = { success: green, error: red, pending: orange }
  REQUIRE_TIPS = "Please upload file"
  StatusBadge receives status and displays it with STATUS_COLOR_MAP[status]
```

## Pure Function Extraction

```text
✅ Stateless functions extracted outside component
  formatText(text) = trimmed text or empty string
  getStatusLabel(status) = STATUS_MAP[status] or "Unknown"
  StatusCard receives text and status; displays formatText(text) and getStatusLabel(status)
```

## Props Destructuring

```text
✅ Correct: UserCard receives { name, age, onClick } directly
❌ Wrong: UserCard receives props; reads props.name throughout its body
```

## Prop Ordering

```text
✅ Correct: data → state → config → callbacks, onXxx last
  ItemList receives {
    records, options,
    selectedItemId,
    isReadOnly, showToolbar,
    onSelectItem, onSubmit, onReset
  }
```

```text
✅ Correct: runtime prop validation, if used by the project, mirrors the same ordering
  ItemList validation:
    records: array; options: object
    selectedItemId: string
    isReadOnly: boolean; showToolbar: boolean
    onSelectItem: function; onSubmit: function; onReset: function
```

```text
❌ Wrong: callbacks mixed with data, no grouping
  ItemList receives {
    onSelectItem, records, onSubmit, isReadOnly,
    options, onReset, selectedItemId, showToolbar
  }
```

```text
❌ Wrong: runtime prop validation order does not match received prop order
  ItemList validation:
    onSelectItem: function; records: array; isReadOnly: boolean
    options: object; onSubmit: function
```

```text
✅ Correct: call site also groups callbacks last
  Display ItemList with
    records, options, selectedItemId, isReadOnly, showToolbar,
    onSelectItem: handleSelectItem, onSubmit: handleSubmit, onReset: handleReset
```

```text
❌ Wrong: call site mixes callbacks between data props
  Display ItemList with
    onSelectItem: handleSelectItem, records, onSubmit: handleSubmit,
    isReadOnly, options
```

## Event Handling

```text
✅ Event function naming handleXxx:
  handleClick, handleSubmit, handleChange

✅ Request function naming fetchXxx/getXxx:
  fetchData, getUserInfo
```

## Build-Time Flags

```text
✅ Build-time flag selects an optional feature before the application ships
  If build flag ENABLE_EXPORT is set: include Export action
  Otherwise: omit Export action from the build

❌ Runtime branch for a build-specific feature
  On every render: check environment to decide whether to display Export action
```

## Prohibited Patterns

```text
❌ Component with inherited lifecycle and duplicated state ownership
  UserCard inherits behavior and mirrors parent props into local state

❌ Direct DOM manipulation
  Search the document for an element and change its contents manually

❌ Multi-line inline event handler
  Button click event runs doA(), doB(), doC() inline
  Prefer a named handleClick action

❌ Direct access to shared state internals
  Read raw shared state in each component instead of using a dedicated accessor
```
