# CSS & Styling Rules

## Core Principles

- **Scoped Component Styles**: Styles must remain strictly scoped to their owning component or feature domain. Never leak selectors into the global namespace.
- **Design Tokens over Magic Literals**: Use CSS custom properties or theme tokens for colors, spacing, borders, and typography.
- **Minimal Inline Styles**: Restrict inline `style` attributes to purely dynamic runtime values (e.g. calculated dimensions, translation coordinates, dynamic colors). Static styling belongs in classes.
- **Namespace Third-Party Overrides**: When overriding third-party component library classes, always prefix the selector with a local feature namespace wrapper.

## MUST

| Rule | Description |
| ---- | ----------- |
| Scoped overrides | Third-party UI overrides must be nested under a unique feature or page class container |
| No magic color/spacing literals | Use CSS custom properties (`var(--color-primary)`) or project design tokens |
| Dynamic inline styles only | Inline `style` is reserved for runtime calculations; static CSS properties must use classes |
| No deep relative style imports | Use path aliases (e.g. `@/styles/...`) or localized component style imports |

## SHOULD

| Rule | Description |
| ---- | ----------- |
| Consistent class naming | Use consistent naming (e.g. BEM, CSS Modules, or project utility classes) |
| Layout vs Presentation | Keep layout properties (margin, grid placement) on the parent; component root handles internal padding |

---

## Patterns & Examples

### 1. Scoped Third-Party UI Overrides

```css
/* ❌ Bad: Global override polluting other pages and features */
.ant-btn-primary, .el-button--primary {
  border-radius: 20px;
  background-color: #ff5722;
}

/* ✅ Good: Scoped strictly under a feature container */
.marketing-banner .ant-btn-primary,
.marketing-banner .el-button--primary {
  border-radius: 20px;
  background-color: var(--color-marketing-accent);
}
```

### 2. Design Tokens vs Magic Numbers

```css
/* ❌ Bad: Hardcoded magic colors and arbitrary pixel spacings */
.user-card {
  color: #1890ff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 12px 16px;
}

/* ✅ Good: Using design tokens / CSS custom properties */
.user-card {
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md) var(--spacing-lg);
}
```

### 3. Dynamic Inline Styles vs Class Toggles

```tsx
// ❌ Bad: Static styling dumped into inline style object
function Badge({ isActive, label }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '4px',
        color: isActive ? '#52c41a' : '#bfbfbf',
      }}
    >
      {label}
    </span>
  );
}

// ✅ Good: Static rules in CSS; dynamic states toggled via classes or CSS variables
function Badge({ isActive, label }) {
  return (
    <span className={`badge ${isActive ? 'badge--active' : 'badge--inactive'}`}>
      {label}
    </span>
  );
}

// ✅ Good: Inline style reserved for genuine dynamic calculations
function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
```
