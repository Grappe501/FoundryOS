# Vertical Resolution Engine — PASS-005

> One deployment → many verticals → one platform

---

## Input → Output (PASS-005 success criteria)

| Host | Vertical | Theme |
|------|----------|-------|
| `bourbon.foundryos.com` | Spirits | Bourbon |
| `books.foundryos.com` | Books | Literature |
| `music.foundryos.com` | Music | Audio |
| `books.localhost` | Books | Literature |

## Path Routing

| Path | Route Kind |
|------|------------|
| `/` | `vertical_home` |
| `/overview` | `vertical_content` |
| `/fantasy` | `topic_home` |
| `/fantasy/rankings` | `topic_content` |
| `/entities/buffalo-trace` | `entity_page` |

Content path segments match `@foundry/content-engine` types:
`overview`, `history`, `faq`, `guides`, `best-of`, `comparisons`, `reviews`, `collections`, `rankings`, `news`, `events`

---

## Package

`@foundry/vertical-resolver`

```typescript
import { resolveVertical, resolveRoute } from '@foundry/vertical-resolver';

const v = resolveVertical('bourbon.foundryos.com');
// v.vertical_name → "Spirits"
// v.theme → "Bourbon"

const { vertical, path } = resolveRoute('books.foundryos.com', '/fantasy/overview');
// path.kind → "topic_content"
```

---

## Site Engine

`apps/site-engine` middleware sets resolution headers:

- `x-foundry-vertical-name`
- `x-foundry-route-kind`
- `x-foundry-topic`
- `x-foundry-content-type`

---

## Hard Rules (PASS-005)

- No Bourbon UI
- No Books UI
- No content population
- Routing proof only
