# PASS-034P+ — World Continuity Expansion

**Status:** Complete  
**Depends on:** PASS-034P (continuity v1), PASS-040B3 (graph enrichment)

## North Star

Not "remember activity." Make the user feel **the world was waiting for them.**

## Copy Rules (locked)

| Never say | Always say |
|-----------|------------|
| Recent activity | Last time you were here… |
| Continue lesson | Pick the thread back up |

## Deliverables

| # | Deliverable | Location |
|---|-------------|----------|
| 1 | `@foundry/world-memory-engine` | `packages/world-memory-engine/` |
| 2 | localStorage v1 memory state | `apps/platform/lib/world-memory/memory-store.ts` (`foundry-world-memory-v1`) |
| 3 | `/my-journey` continuity panel | `JourneyContinuityPanel` in `ContinuityPanels.tsx` |
| 4 | `/{world}` welcome-back panel | `WorldContinuityReturnPanel` in `WorldPremiumHub` |
| 5 | `/passport/timeline` stub | `MemoryTimelinePanel` + extended timeline |
| 6 | Memory objects for firsts | `FIRST_MEMORY_CATALOG` — graph, compare, rabbit hole, tasting |
| 7 | Unfinished-thread detector | `detectUnfinishedThreads()` |
| 8 | Atlas-rabbit-hole resume | `resolveAtlasRabbitHoleResume()` |
| 9 | `audit:memory` | `npm run audit:memory` |

## Memory Categories

- **Active Memory** — unfinished missions, open cases, saved rabbit holes, near-complete collections
- **Story Memory** — first tasting, first graph hallway, first compare, first saved rabbit hole
- **Anticipation Memory** — curiosity signals from continuity engine

## Example Welcome-Back (Bourbon)

```
Last time you were here…
• You were exploring Bottled-in-Bond.
• You saved a rabbit hole.
• You compared Wild Turkey 101.
• You were one step away from completing Wheated Explorer.
• A new debate opened since then.
Continue where you left off? — Pick the thread back up →
```

## Architecture Impact

**Reusable System Added:** `@foundry/world-memory-engine` — welcome-back resolver layered on continuity signals + client memory store.

**Benefits:** Graph-era evidence (hallways, compares, saved holes) feeds continuity without duplicating continuity-engine. Copy-enforced companion feel.

**Affected Launches:** Bourbon (primary), all live continuity worlds via shared panels.

## Verification

```powershell
npm run audit:memory
npm run audit:continuity
npm run typecheck -w @foundry/world-memory-engine
npm run typecheck -w @foundry/platform
```

## Roadmap Resequence (Ernie lock — Jun 2026)

040C is **not ready** despite graph + memory on-device. Artifacts and memory do not persist across devices.

```txt
034P+  World Continuity Expansion      ✅
040D   Personal Database Persistence   ← next
040D.5 Memory + Graph Sync
040C   Atlas-Aware AI                  ← after 040D.5
040E   Review Engine
040F   Recommendation Engine
040G   Passport
041W   Weekly Engagement Push
```

Real memory before a brain.
