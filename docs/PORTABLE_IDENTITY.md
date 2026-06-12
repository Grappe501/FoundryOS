# Portable Identity

> Canonical architecture doc for PASS-040D+.  
> See `docs/PASS_040D_PERSONAL_DATABASE.md` · `docs/PASS_040D5_MEMORY_GRAPH_SYNC.md`

---

## Definition

**Portable Identity** is what a signed-in Foundry user carries across every device, world, and year:

```txt
Collections · Graph history · Artifacts · Memory · Unfinished threads · Identity narrative · Passport
```

It is not a profile page. It is the **reconstructible story of who they are becoming**.

---

## Stack (every world inherits)

```txt
World          → configuration (slug, mentor, entity catalog)
Artifact       → evidence of action (tasting, compare, workflow, speech…)
Graph          → traversal history (hallways, atlas terms, rabbit holes)
Memory         → active · story · anticipation tiers
Identity       → narrative + mastery + collections compound
```

Bourbon, AI Builder, and Country Music use the **same tables and packages**. Only config differs.

---

## Storage Principles

1. **Universal entities** — no `bourbons` table, no `user_bourbon_*` tables
2. **`user_entity_relationships`** — owns, favorites, reviewed, ranked, wants, watched, read, listened, visited, experienced
3. **Cloud is source of truth** when authenticated
4. **localStorage is cache + offline queue** — never the only copy
5. **Hydrate on sign-in** — rebuild portable identity bundle in one call

---

## Rebuild Test

Given only `user_id` and Supabase — reconstruct:

```txt
Who they were becoming
What they cared about
What they were exploring
What they had created
What they still wanted to pursue
```

Pass: welcome-back, passport, and narrative match without reading browser localStorage.

Fail: "persistence" without identity — a database, not an OS.

---

## Packages

| Package | Role |
|---------|------|
| `@foundry/personal-database` | Persist + hydrate (040D) |
| `@foundry/identity-sync-engine` | Compound loop (040D.5) |
| `@foundry/world-memory-engine` | Welcome-back resolver |
| `@foundry/artifact-engine` | Artifact atoms |
| `@foundry/ownership-graph` | Relationships + `buildFoundryIdentity()` |
| `@foundry/identity-narrative-engine` | Narrative layer |

---

## Anti-patterns (Burt must reject)

```txt
❌  user_bourbon_shelf
❌  persistBourbonMemory()
❌  localStorage as source of truth for signed-in users
❌  040D scoped to bourbon routes only
❌  "Can we save data?" as success metric
```

```txt
✅  user_memories with world_slug
✅  persistMemory(userId, { world_slug, … })
✅  hydrateUserState(userId) → all worlds
✅  "Can we rebuild a human?" as success metric
```
