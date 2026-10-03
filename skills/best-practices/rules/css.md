# CSS Rules

## MUST

| Rule                            | Description                                                |
| ------------------------------- | ---------------------------------------------------------- |
| Style file location | Follow the project's style organization; when styles are centralized (e.g. `src/styles/`), do not add style files inside component directories |
| Class names in kebab-case       | `user-card`, `detail-list-wrapper`                         |
| > 3 properties: no inline style | Must use a class for 3+ properties                         |

## SHOULD

| Rule                                    | Description                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Compose conditional class names with a small helper or template literals | Keep conditional styles explicit |
| Reuse design tokens/variables and mixins only when truly reused | Colors, sizes, common patterns only when reuse reduces maintenance burden |
| No forced extraction                    | Do not extract variables/mixins just for conciseness; extract only when multiple usages benefit         |
| Third-party UI overrides scoped under a feature namespace | Keep overrides scoped to the owning feature |
| Style imports use the project's alias when configured | Avoid deep relative style paths |

## Example Layout (illustrative — adapt to the project)

```
src/styles/
├── global.css                     # Global styles
├── mixin.css                      # Global mixin
├── variables.css                  # Global variables
├── pages/{domain}/                # Page styles
├── components/{component}/        # Component styles
└── header.css                     # Header styles
```

## Prohibited Patterns

Path examples assume the centralized layout shown above.

```text
❌ New style file in component directory: src/components/UserCard.css
❌ More than 3 properties in an inline style: color, font size, padding, margin
❌ Hardcoded colors: .card { color: #1890ff; }
❌ Deep relative path for style import: ../../../styles/pages/order/order-detail.css
```

## Examples

See [../examples/css/patterns.md](../examples/css/patterns.md)
