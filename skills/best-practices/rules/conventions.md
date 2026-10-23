# Engineering Conventions & Project Structure

## Core Principles

- **Feature & Domain Boundary**: Organize codebase by business features or architectural layers. Directories express domain ownership; files express specific artifacts.
- **Decoupled API Layer**: Keep HTTP client configuration, endpoint contracts, and request functions outside UI components in a designated API/service layer.
- **Centralized Constants & Enums**: Extract magic numbers, business status codes, and configuration keys into dedicated constants modules with `SCREAMING_SNAKE_CASE`.
- **Path Aliases over Deep Traversal**: Use configured module path aliases (e.g. `@/`) for cross-domain imports. Never write fragile relative paths (`../../../../`).

## MUST

| Rule | Description |
| ---- | ----------- |
| Path aliases | Cross-domain and deep imports must use the project's configured alias (e.g. `@/components/`, `@/utils/`) |
| No deep relative imports | Prohibit relative traversal deeper than parent directory (`../` is okay for siblings; `../../..` is banned) |
| Decoupled API calls | UI components must not call raw HTTP libraries (`axios.get`, `fetch`) inline; import from an API/service module |
| No magic strings/numbers | Business statuses and fixed domain values must be imported from constants |
| File naming consistency | Components use `PascalCase`; logic/hooks and utilities use `camelCase`; styles and configs use `kebab-case` |

## SHOULD

| Rule | Description |
| ---- | ----------- |
| Directory naming | Directories use `kebab-case` (e.g. `order-detail/`, `user-profile/`) |
| Structured import order | 3rd-party dependencies → internal alias modules → local relative modules → style files |
| File size budget | Keep files focused (< 300 lines normal; > 500 lines strongly indicates a need to refactor) |

---

## Patterns & Examples

### 1. API Layer Separation

```tsx
// ❌ Bad: Embedding direct network requests and endpoints in UI components
function UserCard({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://api.example.com/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  return <div>{user?.name}</div>;
}

// ✅ Good: Centralized API definition; component consumes clean function
// src/api/user.ts
export async function getUserProfile(userId: string): Promise<UserProfile> {
  return httpClient.get(`/users/${userId}`);
}

// src/components/UserCard.tsx
import { getUserProfile } from '@/api/user';

function UserCard({ userId }: { userId: string }) {
  const { data: user } = useQuery(['user', userId], () => getUserProfile(userId));
  return <div>{user?.name}</div>;
}
```

### 2. Path Aliases vs Fragile Traversal

```ts
// ❌ Bad: Fragile, deep relative path navigation
import { Button } from '../../../../components/common/Button';
import { formatDate } from '../../../utils/date';
import { USER_ROLES } from '../../constants';

// ✅ Good: Stable, project-configured path alias
import { Button } from '@/components/common/Button';
import { formatDate } from '@/utils/date';
import { USER_ROLES } from '@/constants/roles';
```

### 3. Centralized Constants vs Hardcoded Literals

```ts
// ❌ Bad: Hardcoded string literals and magic numbers scattered in code
if (user.role === 'admin' && status === 2) {
  expireInDays = 30;
}

// ✅ Good: Typed constants imported from domain constants module
export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
  GUEST: 'guest',
} as const;

export const ORDER_STATUS = {
  PENDING: 1,
  ACTIVE: 2,
  EXPIRED: 3,
} as const;

export const DEFAULT_SESSION_EXPIRATION_DAYS = 30;

// Call site:
if (user.role === USER_ROLES.ADMIN && status === ORDER_STATUS.ACTIVE) {
  expireInDays = DEFAULT_SESSION_EXPIRATION_DAYS;
}
```

### 4. File & Directory Layout Guideline (Illustrative)

```text
src/
├── api/                  # API endpoint functions (*.api.ts or domain modules)
├── assets/               # Static assets (images, icons, fonts)
├── components/           # Shared, domain-agnostic UI components
├── features/ (or pages/) # Feature or domain modules
│   └── order-management/
│       ├── components/   # Domain-specific components
│       ├── hooks/        # Feature business logic
│       ├── constants.ts  # Feature-specific constants
│       └── index.tsx     # Feature entry
├── hooks/                # Global / shared hooks
├── services/             # Core HTTP client instances, interceptors, telemetry
├── styles/               # Global tokens, resets, theme variables
├── types/                # Global TypeScript definitions
└── utils/                # Pure shared utility functions
```
