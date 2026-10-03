# Import Rules

## MUST

| Rule                   | Description                            |
| ---------------------- | -------------------------------------- |
| Path alias             | Cross-domain and deep imports use the project's configured path alias (e.g. `@/`) |
| No deep relative paths | Avoid `../../../..`-style imports; use the alias instead |

## SHOULD

| Rule         | Description                                   |
| ------------ | --------------------------------------------- |
| Import order | 3rd-party → internal alias → relative → styles |

## Examples

```js
// ✅ Correct: use the project's alias
import { useUserInfo } from '@/utils/useUserInfo';
import { ORDER_STATUS_DICT } from '@/utils/constants';

// ❌ Wrong: deep relative path
import { useUserInfo } from '../../../utils/useUserInfo';
```
