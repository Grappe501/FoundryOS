# PASS-034J/N — Consequence Engine

> **Not a Discovery Engine.** Every action must have consequences.

## Psychological Shift

```txt
Today:   User action → Action completed
Future:  User action → World changes → Identity changes → New opportunities
```

## The Foundry Formula

PASS-034 shipped content, tools, missions, community, lore.

**034J/N adds: Consequences**

Same engine. Different content. Every world.

## Package

`@foundry/consequence-engine`

| Module | Role |
|--------|------|
| `types.ts` | Triggers, nodes, edges, chains |
| `registry.ts` | All chains + `buildDiscoveryGraph()` |
| `resolve.ts` | `resolveConsequences(trigger)` |
| `worlds/*` | Per-world consequence chains |

## Operator Map

**Route:** `/operator/discovery`

Visual graph of every trigger → consequence chain. Source of truth for Burt when building worlds — prevents unlock spaghetti.

Example chain (Bourbon):

```txt
Weller Mystery
   ↓
Debate: Weller vs Maker's
   ↓
Legendary Object: Weller Antique 107
   ↓
Wheated Explorer Collection (+1)
   ↓
Allocation Economics Rabbit Hole
   ↓
Mentor remembers allocation interest
   ↓
Identity: Explorer signal
   ↓
Bourbon Steward path
```

## Consumer Wiring (v1)

| Trigger | Surface |
|---------|---------|
| `detective_case_closed` | `DetectiveMentorFollowUp` → `ConsequenceUnlockPanel` |
| `mission_completed` | PASS-034K wire (next) |

Client state: `apps/platform/lib/consequences/client-state.ts` (localStorage v1)

## Pass Stack (post-034 deploy)

| Pass | Engine | Focus |
|------|--------|-------|
| **034J/N** | Consequence Engine | Action → world change → identity → opportunity |
| **034K** | Collector Engine | Platform primitive — themed collections, not badges |
| **034L** | World Events Engine | Events as **state** (rivalry votes, spotlights) |
| **034M** | Identity Progression | Narrative tiers — hide math, show mentor insight |
| **034P** | World Memory Engine | Continuity — "last time you were investigating Weller" |

## Beta Gate

**Do not invite testers** until J→P close the reactive loop.

Current risk:

```txt
Will people care enough to return tomorrow?
```

Consequences + Collections + Events + Identity + Memory answer that.

## Architecture Impact

**Reusable System Added:** `@foundry/consequence-engine`

**Benefits:** One graph drives unlocks across bourbon detective, AI missions, speaking tracks, civic collections.

**Affected Launches:** All 7 live worlds; operator tooling; beta readiness gate.
