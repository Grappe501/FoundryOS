# FoundryOS — Universal Entity Model

> PASS-002 Core Data Architecture  
> **Rule:** No niche tables. Ever.

---

## Why Universal Entities

**Wrong (never build):**

```txt
bourbons
movies
albums
books
teams
```

**Right:**

```txt
entity_types
entities
entity_attributes
entity_relationships
```

One system. 2,000 niches. Three-year horizon.

---

## Examples — Same System, Different Types

| Entity | Type | Attributes |
|--------|------|------------|
| Buffalo Trace | `spirit` | distillery, proof, mash_bill, age |
| The Godfather | `film` | director, year, genre, runtime |
| Led Zeppelin IV | `album` | artist, year, label, genre |
| Arkansas Razorbacks Baseball | `team` | league, conference, mascot, stadium |

---

## Schema

```
entity_types
  ├── slug: spirit | film | album | book | team | person | place | recipe | event
  ├── schema_definition: JSON attribute template
  └── vertical_id (optional default vertical)

entities
  ├── entity_type_id → entity_types
  ├── slug, display_name, description
  ├── vertical_id, topic_id (context)
  ├── metadata JSONB (flexible overflow)
  └── status: draft | published | archived

entity_attributes (EAV)
  ├── entity_id
  ├── attribute_key
  ├── attribute_value JSONB
  └── value_type: string | number | boolean | date | json | array

entity_relationships
  ├── source_entity_id → target_entity_id
  ├── relationship_type: pairs_with | featured_in | created_by | competes_with | ...
  └── strength (0–1)
```

---

## Knowledge Graph = Entity Relationships

The Foundry Knowledge Graph is `entity_relationships` + traversal.

Example chain:

```txt
Buffalo Trace (spirit)
  → pairs_with → Brisket (recipe)
  → featured_in → Tailgate Guide (topic content)
  → related_to → Arkansas Razorbacks (team)
```

Every relationship becomes an internal link. Google indexes the graph.

---

## Content Engine Integration

Every entity auto-generates 11 content pages via `packages/content-engine`:

```txt
/overview
/history
/faq
/guides
/best-of
/comparisons
/reviews
/collections
/rankings
/news
/events
```

Stored in `content_pages` table. Not hand-built.

**Scale math:** 1,961 topics × 11 + N entities × 11 = hundreds of thousands of pages.

---

## Migration from kg_entities

`kg_entities` and `kg_relationships` (PASS-001) are **deprecated**.

Use `entities` + `entity_relationships` going forward.

---

## TypeScript

```typescript
import type { Entity, EntityType, EntityAttribute, EntityRelationship } from '@foundry/core';
```

See `packages/core/src/entities/types.ts`
