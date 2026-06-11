# Encyclopedia Engine — PASS-007

> PASS-007. Turns entities into living knowledge nodes — content supports the transformation graph.

---

## Package

`@foundry/encyclopedia-engine`

```typescript
import { generateEncyclopedia, ENCYCLOPEDIA_SECTIONS } from '@foundry/encyclopedia-engine';

const entry = generateEncyclopedia({
  entity_slug: 'buffalo-trace',
  entity_display_name: 'Buffalo Trace',
  entity_type: 'spirit',
  vertical_id: 'spirits-beverages',
});

// entry.sections.length === 10
```

---

## Database

- `encyclopedia_entries` — 10 sections per entity
- `academy_curricula`, `academy_lessons`
- `recipe_items` — cocktails, lists, reading paths
- `user_knowledge_profiles` — progress % per vertical

Migration: `20260610800000_encyclopedia_engine.sql`

---

## Semantic Search (reserved)

Traverses: Encyclopedia, KG, Collections, Reviews, Academy, Friend Groups.

Example queries:

- `best bourbon under $50`
- `bourbons similar to Eagle Rare`
- `movies similar to Tombstone`

---

## No UI Yet

Schema + generators only. Bourbon pages at PASS-014.
