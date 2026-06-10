# FoundryOS — Ownership Graph

> PASS-003 — The heart of Foundry. Not AI. Not SEO. **Identity + Ownership.**

---

## One Table Powers Half the Platform

```sql
user_entity_relationships
```

| Steve | Relationship | Entity |
|-------|--------------|--------|
| Steve | OWNS | Buffalo Trace |
| Steve | RANKED | The Godfather (#1) |
| Steve | REVIEWED | Led Zeppelin IV |
| Steve | FAVORITES | Arkansas Razorbacks Baseball |
| Steve | WANTS | Pappy Van Winkle |

---

## Relationship Types

| Type | User Label | Example |
|------|------------|---------|
| `owns` | My Shelf | Bourbon on my shelf |
| `favorites` | Favorites | Teams, albums I love |
| `reviewed` | Reviewed | Films I've reviewed |
| `ranked` | Rankings | Ordered personal lists |
| `wants` | Watchlist | Bottles I want |
| `watched` | Watched | Movies seen |
| `read` | Read | Books finished |
| `listened` | Listened | Albums played |
| `visited` | Visited | Parks, distilleries |
| `experienced` | Experienced | Tastings, games |

No separate systems for shelf, watchlist, favorites — **one graph**.

---

## Collections Integration

`collection_id` optional on `user_entity_relationships`.

Collections group relationships:

```txt
Steve's Bourbon Shelf (collection)
  ├── OWNS → Buffalo Trace
  ├── OWNS → Blanton's
  └── OWNS → Eagle Rare
```

---

## Entity Metrics

Denormalized in `entity_metrics`:

```txt
entity_id
reviews_count
collections_count
favorites_count
ownership_count
ranking_count
trust_score
total_engagement
```

Powers leaderboards without expensive live queries:

- Most Collected Bourbons
- Most Reviewed Movies
- Most Owned Albums
- Most Visited National Parks

Refreshed via `refresh_entity_metrics(entity_id)`.

---

## PASS-003 Success Criteria

FoundryOS must answer:

| Question | Source |
|----------|--------|
| Who is Steve? | `user_profiles` |
| What entities does Steve own? | `user_entity_relationships` type `owns` |
| What entities does Steve love? | type `favorites` |
| What has Steve reviewed? | type `reviewed` + `reviews` |
| What collections has Steve built? | `collections` |
| What expertise has Steve earned? | `user_expertise` |

Package: `@foundry/ownership-graph` → `buildUserIdentitySnapshot()`

---

## Retention Thesis

Identity + ownership = retention.

User invests in **their graph**. Switching platforms means losing their shelf, rankings, and reputation.
