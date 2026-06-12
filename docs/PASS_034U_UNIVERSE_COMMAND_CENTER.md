# PASS-034U — Universe Command Center

> **Not a developer dashboard. A CEO dashboard.**

## Why This Pass Exists

At 7 live worlds → 16 incoming → 2,000+ planned, nobody remembers:

```txt
What exists?
What's half-built?
What's missing?
What's closest to launch?
Where should Burt spend the next 40 hours?
```

**040B makes this worse fast.** Today: 20 bottles · 103 terms · 11 producers · 8 people. Soon: 500 bottles · 2,000 atlas entries · 500 people · 50 worlds.

Without graph visibility, you go **blind inside your own universe.**

034U is **resource allocation infrastructure** — not visibility for its own sake. **Mission critical** once 040B grows.

**Job of this pass:** Build Foundry so Steve can see Foundry — not another 100 lessons.

## Content Integrity (hard rule)

Do **not** count fabricated people profiles as knowledge. See `docs/CONTENT_INTEGRITY.md`.

```txt
Leader slots        — empty spaces awaiting verified content
Verified profiles   — must stay 0 until editorial pipeline
Graph references    — connection intent, not permission to invent bios
```

## Sequence Lock

```txt
034M  Identity Progression   ← user first
034P  World Memory           ← user first
034U  Universe Command Center ← operator (after reactive loop)
034V  World Architect
```

## The Four Questions

| # | Question | Route |
|---|----------|-------|
| 1 | What exists? | `/operator/universe` — knowledge inventory from registries |
| 2 | What is connected? | `/operator/atlas/graph` — graph density, weak nodes |
| 3 | What is weak? | `/operator/universe` — world × layer heat scores |
| 4 | What should be built next? | Computed build queue + highest ROI world |

Plus: **Atlas Health** (`/operator/atlas`) · **Knowledge Gravity** (top rabbit holes on universe + atlas pages)

## Package

`@foundry/universe-registry`

Read-only aggregation over existing sources — **no new truth tables in v1**.

| Source | Feeds |
|--------|-------|
| `@foundry/world-factory` | Layer automation %, blockers |
| `explore-catalog.ts` | Path status (live/in_build/planned) |
| `incoming-worlds.ts` | Ranked pipeline |
| `world-depth/audit.ts` | Academy/mission depth |
| `world-experience/audit.ts` | Consumer readiness |
| `marketing/worlds/registry.json` | Marketing completeness |
| `bourbon-atlas/registry.ts` + future atlas registries | Term counts, depth |
| `world-events-engine` | Active events |
| `collector-engine` | Collection defs |
| `packages/topic-registry` + `data/catalog/index.json` | Scale metrics |
| `growth-flywheel.ts` | Domain expansion scores |

## Routes

### `/operator/universe` — CEO Dashboard

**Top panel (computed, not hand-entered):**

```txt
Worlds Live: 7
Incoming Worlds: 16
Atlas Terms: 4,832
Lessons: 12,450
Missions: 2,115
Collections: 683
Events: 247
Factories: 8
Automation: 92%
```

**Closest To Launch** — computed readiness rank:

```txt
1. Entrepreneurship          82%
2. Country Music             78%
3. Government Systems        76%
...
```

**Highest Opportunity** — composite score:

```txt
SEO + Revenue + Retention + Community + Factory Reuse + Educational Impact
```

**World Heat Map** — grid:

- Rows: Atlas, Academy, Missions, Experiences, Community, Collections, Events, Identity, Memory, Marketing, Revenue
- Columns: 7 live worlds (+ incoming as faded columns)

Instant weak-spot detection.

### `/operator/worlds`

Master registry — collapsible universe tree:

```txt
Future-Proof Academy
├── AI Builder
├── Financial Independence
├── Public Speaking
├── Civic Engagement
Passion Worlds
├── Bourbon
├── BBQ
├── Poker
...
```

Searchable. Filterable by status pipeline stage.

### `/operator/worlds/incoming`

Every incoming world:

```txt
World Name · Category
Revenue Potential · Community Potential · SEO Potential
Factory Reuse % · Estimated Build Hours · Atlas Size Estimate
Launch Priority Rank
```

Example:

```txt
Entrepreneurship
Revenue: 98 · Retention: 96 · SEO: 93 · Community: 92 · Factory Reuse: 88
Estimated Hours: Factory 8 · Depth 60 · Atlas 120
Priority Rank: #1
```

### `/operator/atlas`

Cross-world Atlas command center:

```txt
Bourbon: 103 terms · 61 deep · 98 linked · 41 rabbit holes
...
Total Atlas Entries · Depth Score · Missing Definitions · Missing Rabbit Holes
```

Atlas is the crown jewel — internally the **Knowledge Graph** (`docs/KNOWLEDGE_GRAPH.md`).

### `/operator/atlas/graph`

**Graph command center** — answers without opening 50 pages:

```txt
What exists?        entity counts by type per world
What's connected?   avg edges per node · connection heat map
What's weak?        nodes below 10 edges · orphaned nodes
What's missing?     entity types with zero seeds · broken hrefs
What should Burt    ranked build queue from graph gaps
  build next?
```

Example output:

```txt
Bourbon bottles: 20 seeded · 1 full graph (WT 101) · 19 fallback (4 edges)
Atlas terms: 103 · 1 multi-identity (BiB) · 102 definition-only
Producers: 11 pages · 0 graph resolver
People: 8 profiles · 0 graph edges
NEXT: seed Old Forester 1920 to 50 edges · BiB compare wire · producer resolver
```

Data sources: `@foundry/atlas-graph-engine` · `bourbon-depth/` seeds · registry audits.

### `/operator/factory`

Multi-factory dashboard (reframe existing `/operator/factory`):

```txt
World Factory · Marketing Factory · Atlas Factory · Mission Factory
Events Factory · Collector Factory · Identity Factory · Consequence Factory
```

Per factory: automation %, cost to launch, hours saved, generated assets.

## World Status Pipeline

Every world gets computed stage progress:

```txt
IDEA → RESEARCH → ATLAS → CURRICULUM → MISSIONS → TOOLS →
COMMUNITY → EVENTS → COLLECTIONS → IDENTITY → MEMORY → BETA → LIVE
```

Mapped from audit outputs — not manually maintained spreadsheets.

## Audit

`npm run audit:universe`

1. `/operator/universe` renders with live KPIs
2. Closest-to-launch list computed for all incoming worlds
3. Heat map covers 7 live worlds × 11 layers
4. `/operator/worlds/incoming` shows ranked queue
5. `/operator/atlas` shows per-world term stats
6. All data sourced from registries (no hardcoded fiction)

## Exit Criteria

Steve can open `/operator/universe` and answer in 60 seconds:

```txt
Where should Burt spend the next 40 hours?
```

## Architecture Impact

**Reusable System Added:** `@foundry/universe-registry`

**Benefits:** Scales to 2,000 worlds without losing allocation clarity.

**Affected Launches:** Every future world; operator workflow; PASS-034V World Architect input.
