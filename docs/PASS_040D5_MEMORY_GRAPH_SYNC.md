# PASS-040D.5 — Memory + Graph Sync

> **040D stores everything. 040D.5 connects everything.**

**Status:** Queued (after PASS-040D)  
**Blocks:** PASS-040C (Atlas-Aware AI)

---

## Why the Split

040D alone risks becoming a **filing cabinet** — rows in tables, no compounding.

040D.5 is where Foundry becomes **difficult to replicate**: every action updates multiple layers of identity.

---

## Compound Loop (locked)

```txt
Artifact
  → updates collections

Collection
  → updates identity

Identity
  → updates narrative

Narrative
  → updates memory

Memory
  → updates welcome-back

Graph traversal
  → updates curiosity profile
```

Everything compounds. No silos.

---

## Package: `@foundry/identity-sync-engine`

Event-driven sync — not batch ETL.

```txt
onArtifactCreated(artifact)     → collection hints · narrative delta · memory unlock
onCollectionProgress(event)     → identity strength · story memory · passport
onGraphTraversal(event)         → curiosity profile · anticipation memory
onMemoryWritten(memory)         → welcome-back refresh · unfinished-thread recompute
onIdentityShift(snapshot)       → narrative · passport · Atlas-Aware context bundle
```

Single entry: `propagateIdentityEvent(event)` — idempotent, world-agnostic.

---

## Curiosity Profile (new derived state)

Not stored as page views. Stored as **weighted interests**:

```txt
user_id · world_slug · topic_slug · weight · last_touched · source (graph|atlas|compare|artifact)
```

Built from `user_graph_history` + artifacts + collections. Feeds:

- Anticipation memory (034P+)
- Atlas-Aware AI context (040C)
- Recommendation engine (040F)

---

## Welcome-Back After 040D.5

034P+ welcome-back reads **local memory** today. After 040D.5:

```txt
hydrateUserState(userId)
  → merge user_memories + user_graph_history + user_artifacts + collections
  → resolveWelcomeBack()        // world-memory-engine
  → resolveIdentityNarrative()  // identity-narrative-engine
```

Same copy rules. Cloud source of truth. Device cache for speed.

---

## 040D.5 Test

Create a tasting artifact on phone → open laptop:

```txt
Collection progress updated
Identity narrative mentions the tasting
Memory timeline shows the first
Welcome-back references the thread
Curiosity profile weights wheated bourbon higher
```

All without manual sync button.

---

## Deliverables

| # | Deliverable |
|---|-------------|
| 1 | `@foundry/identity-sync-engine` — propagateIdentityEvent |
| 2 | Curiosity profile derivation from graph + artifacts |
| 3 | Wire artifact-engine, collector-engine, world-memory-engine emitters |
| 4 | Cloud welcome-back hydration (replaces localStorage-only path when authed) |
| 5 | `npm run audit:identity-sync` |

---

## Then: 040C

Atlas-Aware AI reads **Portable Identity** — not localStorage, not generic internet:

```txt
"Last month you spent a lot of time around Bottled-in-Bond."
"You seem drawn to value bourbon, government trust standards, and whiskey history."
"Would you like to explore the Bottled-in-Bond Act's influence on modern American whiskey?"
```

Real memory before a brain.
