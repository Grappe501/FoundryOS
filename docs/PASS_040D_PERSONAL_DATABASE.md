# PASS-040D — Personal Database Persistence

> **Not a Bourbon pass. A Foundry pass.**

**Status:** Next  
**Depends on:** PASS-034P+ (memory v1 local), PASS-040A (artifact engine), PASS-003 (ownership graph)  
**Blocks:** PASS-040D.5, PASS-040C (Atlas-Aware AI), PASS-041W (weekly push)

---

## The Decision This Pass Makes

040D determines whether Foundry becomes:

```txt
Interesting website
```

or

```txt
Personal operating system
```

---

## Hard Rule for Burt

**Do not build:**

```txt
Persistence for bourbon
user_bourbon_notes
user_bourbon_shelf
user_bourbon_reviews
```

**Build:**

```txt
Persistence for everything
```

Bourbon is **configuration** — not schema. So is AI Builder, Public Speaking, Entrepreneurship, Government Systems, World Religion, Country Music, and every world that follows.

---

## Mental Model (locked)

```txt
World
  ↓
Artifact
  ↓
Graph
  ↓
Memory
  ↓
Identity
```

Every world inherits the same stack. World slug + entity refs are config — never niche tables.

---

## Universal User Entity Store

| Layer | Table / system | Status |
|-------|----------------|--------|
| Universal catalog | `entities`, `entity_relationships` | ✅ exists |
| Ownership | `user_entity_relationships` | ✅ exists |
| Collections | `collections`, `collection_items` | ✅ exists |
| Artifacts | `user_artifacts` | **040D** |
| Memory | `user_memories` | **040D** |
| Graph traversal | `user_graph_history` | **040D** |
| Identity narrative | `user_identity_snapshots` or payload on profile | **040D** |
| Unfinished threads | derived from above + `user_memories` active tier | **040D** |

**No niche tables.** One machine, 1,000 worlds.

### `user_artifacts`

Portable evidence atoms from `@foundry/artifact-engine`:

```txt
user_id · world_slug · artifact_type · title · payload JSONB · entity_refs[] · created_at
```

Types: tasting, comparison, shelf, workflow, speech, project, travel_plan, … — registry-driven, not table-per-type.

### `user_memories`

Cross-device continuity from `@foundry/world-memory-engine`:

```txt
user_id · world_slug · memory_category · memory_key · payload JSONB · occurred_at
```

Categories (locked from 034P+):

- `active` — unfinished missions, open cases, saved rabbit holes
- `story` — firsts, milestones, closed mysteries
- `anticipation` — curiosity signals

### `user_graph_history`

Graph traversal is first-class — not buried in page analytics:

```txt
user_id · world_slug · node_slug · node_title · node_type · entered_at · source (atlas|graph|compare|search)
```

---

## Real Deliverable: Portable Identity

Not "persistence." Not "save data."

```txt
Portable Identity
```

A user signs in on a **completely different device** and immediately sees:

```txt
their collections
their graph history
their artifacts
their memory
their unfinished threads
their identity narrative
their passport
```

Without reading `localStorage` as source of truth.

localStorage becomes **cache + offline queue** — not the database.

---

## The 040D Test

If a user uses desktop, laptop, phone, and PWA — can Foundry reconstruct:

```txt
Last time you were here...

You were researching Bottled-in-Bond.
You saved three rabbit holes.
You compared Wild Turkey and Buffalo Trace.
You unlocked Wheated Explorer.
You created a tasting artifact.
You bookmarked Kentucky travel planning.
```

**without touching localStorage?**

| Answer | Verdict |
|--------|---------|
| Yes | 040D complete |
| No | 040D not complete |

---

## Success Criterion (CEO gate)

Do not optimize for:

```txt
Can we save data?
```

Optimize for:

```txt
Can we rebuild a human?
```

If a user disappears for **3 days**, **3 months**, or **3 years** — can Foundry reconstruct:

```txt
Who they were becoming
What they cared about
What they were exploring
What they had created
What they still wanted to pursue
```

| Answer | Verdict |
|--------|---------|
| Yes | Operating system for human interests |
| No | Just a database |

That distinction is the moat.

---

## Package: `@foundry/personal-database`

Platform-first engine — not app code.

```txt
persistArtifact(userId, artifact)
persistMemory(userId, memory)
recordGraphTraversal(userId, event)
hydrateUserState(userId)           → full portable identity bundle
migrateLocalToCloud(userId)        → one-time localStorage → Supabase
validatePersonalDatabase()
```

Every world calls the same API with `world_slug`. Bourbon config lives in `@foundry/bourbon-intelligence` / world registry — not in persistence schema.

---

## Migration Map (localStorage v1 → cloud)

| Client store today | Cloud table |
|--------------------|-------------|
| `foundry-world-memory-v1` | `user_memories` |
| Artifact client store | `user_artifacts` |
| Collector progress | `collections` + `user_entity_relationships` |
| Consequence / detective state | `user_memories` (active) |
| Portfolio / mission reflections | `user_artifacts` |

On sign-in: **hydrate** cloud → client cache. On action: **write-through** to cloud when authed; queue when offline.

---

## Deliverables Checklist

| # | Deliverable |
|---|-------------|
| 1 | Supabase migrations — `user_artifacts`, `user_memories`, `user_graph_history` + RLS |
| 2 | `@foundry/personal-database` package |
| 3 | Auth-gated hydration on session start |
| 4 | Write-through sync from artifact-engine, world-memory-engine, collector-engine |
| 5 | localStorage demoted to cache — cloud is source of truth when signed in |
| 6 | `npm run audit:persistence` — 040D Test fixture |
| 7 | Platform adapter in `apps/platform/lib/personal-database/` |
| 8 | Docs: this file + `docs/PORTABLE_IDENTITY.md` |

**Explicitly out of scope for 040D:**

- Bourbon-only routes or tables
- Atlas-Aware AI (040C — after 040D.5)
- Passport UI polish (040G — displays what 040D stores)
- Weekly push (041W — after persistence)

---

## Architecture Impact (PASS report template)

```txt
Reusable System Added:
  @foundry/personal-database — universal hydrate/persist for all worlds

Benefits:
  Portable Identity across devices · localStorage illusion removed ·
  Foundation for Atlas-Aware AI · weekly push · PWA offline queue

Affected Launches:
  All worlds — Bourbon is proof instance only
```

---

## Verification

```powershell
npm run audit:persistence
npm run preflight
npm run sandbox
```

Manual: sign in on device A → leave evidence → sign in on device B → welcome-back reconstructs without localStorage.

---

## Next

**PASS-040D.5** — Memory + Graph Sync (compound loop). See `docs/PASS_040D5_MEMORY_GRAPH_SYNC.md`.

040D stores everything. 040D.5 connects everything.
