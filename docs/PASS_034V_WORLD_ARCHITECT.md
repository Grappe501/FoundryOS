# PASS-034V — World Architect

> **Burt doesn't build worlds. The system proposes them.**

## Position in Stack

```txt
034U  Universe Command Center  — what exists, what's missing
034V  World Architect            — what to build next, with estimates
```

034U is the map. 034V is the planner.

## Core Principle

When Steve asks:

```txt
Build Entrepreneurship?
```

The system responds with a **computed proposal** — not a guess.

```txt
Atlas Terms:      ~1,500
Lessons:          ~300
Missions:         ~80
Collections:      ~35

Reuse from live worlds:
  AI Builder     42%
  FI             38%
  Public Speaking 27%

Estimated Build:
  Factory         2 hours
  Depth          40 hours
  Atlas         120 hours

Launch Probability: 91%
Priority Rank: #1
```

Foundry starts **planning itself**.

## Package

`@foundry/world-architect`

| Module | Role |
|--------|------|
| `types.ts` | WorldProposal, BuildEstimate, ReuseMatrix |
| `estimate.ts` | Hours + asset counts from category templates |
| `reuse.ts` | Factory reuse % vs live worlds |
| `score.ts` | Launch probability composite |
| `propose.ts` | `proposeWorld(slug)` → full proposal |

## Inputs

- `@foundry/universe-registry` (034U)
- `incoming-worlds.ts` scores
- `@foundry/world-factory` blueprints + historical build times
- Category templates (Academic vs Passion vs Knowledge vs Professional)
- Atlas size heuristics by category

## Operator Route

`/operator/architect`

- Pick incoming world → see full proposal
- Compare top 5 ranked worlds side-by-side
- "Approve for build" → queues world-factory run (future wire)

## Consumer Route

None. Operator-only.

## Audit

`npm run audit:architect`

1. Proposals generate for all 16 incoming worlds
2. Reuse % computed from live world overlap
3. Launch probability correlates with 034U opportunity score
4. `/operator/architect` renders comparison view

## Exit Criteria

034V closes when resource allocation is **proposal-driven** — Steve approves; Burt executes.

## Long-Term Vision

```txt
034V proposes → World Factory builds → Universe Registry updates → 034V re-scores
```

Closed loop. Foundry scales without Steve holding the entire graph in his head.
