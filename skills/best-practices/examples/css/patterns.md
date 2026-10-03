# Style Pattern Examples

## File Organization

```text
src/styles/
├── global.css                    # Global styles
├── utilities.css                 # Reusable classes
├── variables.css                 # Global custom properties
├── pages/{domain}/               # Page styles
├── components/{component}/       # Component styles
└── header.css                    # Header styles
```

## className Usage

```javascript
// ✅ Simple class names
const wrapperClass = 'project-wrapper detail-list-wrapper';

// ✅ Conditional class names using native JavaScript
const statusClass = ['status-tag', isActive && 'status-tag--active', isDisabled && 'status-tag--disabled']
  .filter(Boolean).join(' ');

// ✅ Dynamic class name
const userCardClass = `user-card user-card--${status}`;
```

## Inline Style Limit

```text
✅ A single dynamic width may be inline: style = { width: '230px' }
❌ Do not put color, font size, padding, and margin together inline
✅ Use a complex-card class for multiple style properties
```

## CSS Custom Properties

```css
/* ✅ Use custom properties */
:root {
  --primary-color: #1890ff;
  --border-radius: 4px;
}

.card {
  color: var(--primary-color);
  border-radius: var(--border-radius);
}

/* ❌ Repeated hardcoded theme colors */
.hardcoded-card {
  color: #1890ff;
}
```

## Reusable Classes

```css
.single-line-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.two-line-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```

## Third-Party UI Overrides

```css
/* ✅ Scope overrides to a feature namespace */
.feature-layout-wrapper .external-table-header,
.feature-layout-wrapper .external-table-body {
  min-height: 40px;
}

/* ❌ Global override affects unrelated features */
.external-table-header {
  min-height: 40px;
}
```

## Style Import

```javascript
// ✅ Use a configured alias for style imports
import '@/styles/pages/order/order-detail.css';

// ✅ Relative path for styles in the same directory
import './styles/index.css';

// ❌ Avoid deep relative paths
import '../../../styles/pages/order/order-detail.css';
```

## Global Styles

```css
/* src/styles/global.css */
@import './utilities.css';

:root {
  --link-color: #1677ff;
}

.fill-vertical {
  height: 100%;
}

/* Feature-specific overrides belong under a feature namespace, not here. */
```

## Responsive Design

```css
.responsive-card {
  padding: 16px;
}

@media (max-width: 768px) {
  .responsive-card {
    padding: 8px;
  }
}
```

## Prohibited Patterns

```text
❌ New scattered style file in a component directory instead of the agreed style location
❌ More than three inline style properties instead of a class
❌ Repeated hardcoded theme colors instead of CSS custom properties
❌ Deep relative path for a style import
❌ Global overrides of third-party UI selectors
```
