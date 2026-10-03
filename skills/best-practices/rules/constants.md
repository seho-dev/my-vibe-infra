# Constants Rules

## MUST

| Rule                       | Description                                    |
| -------------------------- | ---------------------------------------------- |
| Import from the constants module | Shared constants come from the project's constants module, not inline literals |
| `SCREAMING_SNAKE_CASE`     | Constants naming convention                    |
| No hardcoding              | Hardcoded strings prohibited                   |

## SHOULD

| Rule               | Description                       |
| ------------------ | --------------------------------- |
| Business constants | Import from domain `constants.js` |

## Typical Locations (illustrative — follow the project's conventions)

- Global: `src/utils/constants.js`
- Business domain: `src/utils/{domain}-constants.js`

## Examples

```js
// ✅ Correct: import from constants.js
import { ORDER_STATUS_DICT } from '@/utils/constants'; // the project's configured path alias

const isActive = status !== ORDER_STATUS_DICT.ACTIVE;

// ❌ Wrong: hardcoded string
const isActive = status !== 'active';
```
