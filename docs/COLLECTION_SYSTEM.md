# FoundryOS — Collection System

> The crown jewel. Designed PASS-002 before launch.

---

## Core Model

```txt
User
  ↓
Collection
  ↓
Entities
```

Same engine. Every vertical. Every niche.

---

## Examples

| Collection | Owner | Entities |
|------------|-------|----------|
| Steve's Bourbon Shelf | Steve | Buffalo Trace, Blanton's, Eagle Rare… |
| Steve's Top 100 Movies | Steve | The Godfather, Casablanca… |
| Steve's Favorite SEC Baseball Players | Steve | Player entities across teams |
| Steve's Vinyl Collection | Steve | Album entities |
| Steve's Family Library | Steve | Book entities |
| Steve's BBQ Recipes | Steve | Recipe entities |

---

## Database

```sql
collections
  ├── user_id
  ├── slug, display_name, description
  ├── vertical_id, topic_id (context)
  ├── collection_type: personal | wishlist | ranked | shared | club
  ├── is_public (Tier 3 social)
  └── entity_count (denormalized for speed)

collection_items
  ├── collection_id → entity_id
  ├── sort_order
  ├── personal_rating (0–10)
  └── personal_notes
```

---

## Tier Mapping

| Tier | Collection Features |
|------|---------------------|
| **Tier 1 (Free)** | Browse public collections, see expert shelves |
| **Tier 2 ($4/mo)** | Create personal collections, wishlists, ratings, notes |
| **Tier 3 ($18/mo)** | Share collections, clubs, friend networks, cross-vertical |

---

## Cross-Vertical Collections

User invested in bourbon collection → wants wine collection → wants meal pairings.

`vertical_id` and `topic_id` on collections enable cross-app intelligence without separate databases.

---

## Rankings

`rankings` table links to collections OR topics:

```txt
Steve's Bourbon Rankings (collection_id)
  1. Buffalo Trace
  2. Blanton's
  3. Eagle Rare
```

Public rankings from Tier 3 experts flow down to Tier 1 for attribution.

---

## SEO Integration

Public collections generate:

```txt
bourbon.foundryos.com/collections/steves-bourbon-shelf
```

Content type `collections` auto-generated via content engine.

---

## Reputation Hook

Every collection, review, and ranking updates `user_reputation` and can earn `user_badges` / `user_expertise`.

Example:

```txt
Steve Grappe
Bourbon Curator · Central Arkansas
Collections: 12 | Reviews: 184 | Rankings: 22
Community Trust Score: 94
```
