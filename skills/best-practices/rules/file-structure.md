# File Structure Rules

## MUST

| Rule                | Description                                   |
| ------------------- | --------------------------------------------- |
| Shared components   | In the project's shared components directory (e.g. `src/components/`) |
| Business components | Inside the owning domain's directory |
| Line limit          | < 300 lines normal; > 500 lines must refactor |

## SHOULD

| Rule                    | Description                |
| ----------------------- | -------------------------- |
| Business logic          | Extract to `logic/`        |
| Conditional compilation | Build-time flags, not runtime checks |

## Example Layout (illustrative — the project's actual structure wins)

```
src/
├── api/              # API definitions (*.api.js)
├── components/       # Shared components
│   ├── state/        # Global shared state
│   ├── logic/        # Shared logic units
│   └── {domain}/     # Business components
├── pages/            # Page modules
│   └── {domain}/     # By business domain
├── services/         # HTTP instances, config
├── styles/           # Global styles
├── utils/            # Utilities, constants
└── router/           # Route config
```

## Naming Rules

The project's existing structure and naming always win; the tables below are defaults for new code when no convention exists.

Naming is determined by "object type" first, then casing.

### Core Principle

- Directories express module / business domain / ownership
- Filenames express specific code artifacts
- Do not use long filename prefixes to simulate namespace
- Do not rename historically stable files just for consistency; new files must follow these rules

### Directory Naming

Directories use kebab-case by default.

| Type                      | Convention                          | Example                                              |
| ------------------------- | ----------------------------------- | ---------------------------------------------------- |
| Business domain           | kebab-case                          | `order-page/`, `user-profile/`                       |
| Feature / template folder | kebab-case                          | `annual-report/`, `upload-files/`                    |
| Common dirs               | keep as-is                          | `components/`, `logic/`, `utils/`, `__tests__/`      |

```text
✅ Correct:
  annual-report/
  order-page/
  user-profile/
  upload-files/

❌ Wrong:
  annualReport/
  AnnualReport/
  orderPage/
```

### File Naming

| Type             | Convention         | Example                           |
| ---------------- | ------------------ | --------------------------------- |
| Component        | PascalCase        | `UserCard.js`                     |
| Logic unit       | camelCase or useCamelCase | `useUserInfo.js`           |
| Utility / helper | camelCase.js       | `formatDate.js`, `formHelpers.js` |
| Style            | kebab-case        | `user-card.css`                   |
| API module       | kebab-case.api.js  | `user.api.js`                     |
| Constants file   | constants.js       | `utils/constants.js`              |
| Field protocol   | field.js           | `utils/field.js`                  |
| Payload logic    | payload.js         | `utils/template-name/payload.js`  |
| Barrel export    | index.js           | `utils/index.js`                  |

### Template / Feature Utility Directory

Template-specific shared utilities must be wrapped in a kebab-case folder under `utils/`, not flat prefixed files.

```text
✅ Correct:
  utils/
    annual-report/
      constants.js
      field.js
      payload.js
      index.js

❌ Wrong:
  utils/
    annualReport.constants.js
    annualReportPayload.js
    annualReport/
```

### Naming Decision Table

| Scenario                    | Convention           |
| --------------------------- | -------------------- |
| Component file              | `PascalCase`         |
| Logic unit file             | `camelCase` or `useCamelCase` |
| Utility JS file             | `camelCase.js`       |
| API module                  | `kebab-case.api.js`  |
| Style                       | `kebab-case`         |
| Any new directory           | `kebab-case/`        |
| Template-specific directory | `kebab-case/`        |
| constants file              | `constants.js`       |
| field protocol file         | `field.js`           |
| payload file                | `payload.js`         |
| barrel export               | `index.js`           |

### Anti-patterns

```text
❌ Use filename prefix instead of directory boundary:
  annualReport.constants.js
  annualReportPayload.js

❌ Component using non-PascalCase:
  create-project

❌ Utility using PascalCase:
  FormHelpers.js

❌ Style using camelCase / PascalCase:
  projectWizardStepTwo.css

❌ Mixed naming in same directory:
  formHelpers.js
  api-helpers.js
  PayloadHelper.js
```
