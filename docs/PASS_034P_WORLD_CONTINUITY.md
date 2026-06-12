# PASS-034P — World Continuity Engine

> **Pass code: 034P. Product name: World Continuity — not World Memory.**

Memory sounds like storage. Continuity sounds like life.

## Core Principle

The pass is not: *Remember what the user did.*

The pass is: **Make the world feel continuous.**

Users don't care about activity. They care about **stories, unfinished business, and anticipation.**

| 034M answers | 034P answers |
|--------------|--------------|
| Who am I becoming? | What was I doing, why did it matter, what should I pick back up today? |

## What Most Apps Remember (ignore)

```txt
Last login · Last lesson · Last page viewed · Recent activity lists
```

That's analytics.

## Three Types of Memory

### 1. Active Memory

Things currently in progress — appear immediately:

- Open detective cases
- Incomplete missions
- Unfinished collections
- Saved rabbit holes
- Bookmarked Atlas threads

### 2. Story Memory

Things that happened — permanent milestones (not achievements):

- First blind tasting
- First speech
- First AI project
- First collection completed
- First detective case closed

These become the beginnings of legacy.

### 3. Anticipation Memory

The world remembers what you were **curious about** and suggests forward motion:

```txt
You spent time comparing Four Roses recipes.
Most people who go this deep eventually investigate yeast strains.
Continue?
```

## Package

`@foundry/world-continuity-engine`

- `resolveWorldContinuity()` — per-world return narrative
- `resolveJourneyContinuity()` — cross-world `/my-journey`
- `resolveAnticipation()` — curiosity → next thread
- `resolveMemoryTimeline()` — passport timeline entries

## Consumer Surfaces

| Route | Component |
|-------|-----------|
| `/my-journey` | `JourneyContinuityPanel` — **emotional center** |
| `/{world}` hub | `WorldContinuityReturnPanel` — narrative return, not activity resume |
| `/passport/timeline` | `MemoryTimelinePanel` — identity accumulation by month |
| Atlas term open | `recordAtlasView` — context for anticipation |
| Event save | `recordIntentNote` — intent for open threads |

## Memory Timeline

`/passport/timeline` — one of the most valuable pages in Foundry long-term.

```txt
May 2026 — Your first bourbon tasting
June 2026 — Solved the Weller mystery
July 2026 — Completed Wheated Explorer
```

Not a click log. A story archive.

## PASS-034P.5 — Atlas Phase 2 Graph Layer

Runs alongside 034P. Not consumer-facing yet.

`apps/platform/lib/bourbon-atlas/relationship-seeds.ts` + `graph.ts`

Entity types:

```txt
People · Places · Organizations · Events · Controversies · Mysteries · Collections · Objects · Timelines
```

Example: **Rickhouse** connects Buffalo Trace, Warehouse H, Jimmy Russell, Stitzel-Weller Mystery, Wheated Explorer.

Atlas becomes a graph — not a glossary. Powers anticipation memory + 034U command center.

## Audit

`npm run audit:continuity`

## Exit Criteria

1. Three memory tiers in engine + UI (active, story, anticipation)
2. No "last visited" or activity-list UI
3. `/my-journey` + all 7 world hubs wired
4. `/passport/timeline` exists
5. Atlas Phase 2 relationship seeds + graph builder
6. `audit:continuity` + `build:platform` pass

## Sequence

```txt
034P    World Continuity Engine      ← this pass
034P.5  Atlas Phase 2 Graph Layer    ← quiet start (in repo)
034U    Universe Command Center
034V    World Architect
040A→I  Ownership + Passport + Artifact + Legacy
```

## Known Gap (post-034P)

**Producer pages** — should read like mini documentaries / field guides / travel guides, not reference stubs. Separate content pass; not blocking continuity.
