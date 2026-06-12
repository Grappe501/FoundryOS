# PASS-040B — Atlas Graph Engine

> **Internally: Knowledge Graph. The world is the graph. Lessons are one way to enter it.**

See `docs/KNOWLEDGE_GRAPH.md` for canonical vision.

## Strategic Lock (Steve / Ernie — Jun 2026)

**The biggest mistake Foundry could make right now: becoming a giant filing cabinet.**

Enough content exists to prove the concept. What does not exist yet: a **knowledge universe**.

```txt
NOT:  Need more content → add more content
YES:  Need more depth → create more connections
NOT:  World → Lesson → Lesson → Lesson
YES:  World → People · Places · Objects · Events · Relationships
```

### 034Q Status

Local work (producer depth, people profiles, compare-any-two) is **good seed data** — absorbed into 040B as graph nodes and edges.

**Do not deploy 034Q as a standalone pass.**

---

## Core Equation

```txt
20 bottles × 50 connections  >  100 bottles × 3 connections
```

Build the graph before expanding catalog.

---

## Package

`@foundry/atlas-graph-engine`

### Entity Types

**Core:**

```txt
Bottle · Producer · Person · Place · Organization · Event
Atlas Term · Debate · Mystery · Collection · Artifact
Detective · Lore · Review · Recommendation
```

**Extended (multi-identity nodes):**

```txt
Technique · Tradition · Era · Innovation · Movement
Location · Journey · Experience · Question
```

One node, many identities. Example — **Bottled in Bond**:

```txt
Law · History · Government Reform · Quality Standard
Collecting Strategy · Buying Guide · Debate
```

### Relationship Types

```txt
created_by · works_for · competes_with · related_to · located_in
influenced_by · part_of · controversy_about · recommended_after
explores · unlocks · hosts · emerged_in_era · enabled_by · answers
```

### Every Node Starts With Relevance

```txt
Why should I care?   ← FIRST — not Definition
```

Then: People · Places · Timeline · Debates · Mysteries · Collections · Rabbit holes · Suggested next stop

### One Node, Many Behaviors

| Behavior | Example (BiB) |
|----------|---------------|
| **Read** | What is Bottled in Bond? |
| **Investigate** | Why was it created? |
| **Compare** | BiB vs Single Barrel |
| **Explore** | Same-era reform wave |
| **Collect** | Build a BiB Collection |
| **Influence** | Recommend a BiB bottle (040F) |

### Six-Question Model (every Atlas node)

```txt
Why should I care?
What should I do next?
What else is connected?
Who matters here?        ← leader slots, not fabricated bios
Where did this happen?
Why do people disagree?
```

If every node answers those six, the graph becomes almost impossible to exhaust.

---

## Exemplars

### Wild Turkey 101 (bottle)

`/bourbon/bottles/wild-turkey-101` — **19+ graph connections**

Jimmy Russell · rivals · debates · mysteries · atlas terms · places · investigations · suggested next

Other bottles: **fallback hallway graph** (4 edges) until seeded to 50+.

### Bottled in Bond (atlas_term)

`/bourbon/atlas/bottled-in-bond` — **13+ connections, 7 identities**

Multi-identity weekend node: law, history, reform, quality, collecting, buying guide, debate.

---

## Atlas Hover Stack (040B consumer)

| Layer | UX |
|-------|-----|
| **Hover** | Why should I care? + 30-sec hook |
| **Expand** | Tell me more — 500-word dive |
| **Open Atlas** | Full entry + rabbit holes |
| **Open Connections** | Graph view — suggested next stops |

`AtlasTerm` component: hover ✅ · expand ✅ · atlas ✅ · **connections → 040B**

---

## Build Order

1. ✅ `@foundry/atlas-graph-engine` types + resolver
2. ✅ Wild Turkey 101 full connection seed
3. ✅ BiB atlas_term multi-identity seed
4. Seed remaining 19 bottles (50+ edges each)
5. Producer + person graph resolvers
6. Wire `why_should_i_care` on all graph panels
7. `/operator/atlas/graph` — edge coverage (034U)
8. Generic world factory config — not bourbon-only code

---

## Pass Sequence (locked)

```txt
034U  Universe Command Center     ← NEXT (graph visibility mission-critical)
040A  Artifact Engine
040B  Atlas Graph Engine          ← THIS PASS (034Q + 034P.5 absorbed)
040C  Atlas-Aware AI Layer        ← reasoning over graph, not OpenAI-as-DB
040D  Personal Database Engine
040E  Review Engine
040F  Recommendation Engine
```

---

## Pass Gate

> Can a user arrive at one entity and leave an hour later without hitting a dead end?

If yes — Knowledge Graph. If no — still a glossary.

---

## Related

- `docs/KNOWLEDGE_GRAPH.md`
- `docs/ATLAS_PHASE_2.md`
- `docs/WORLD_ECOSYSTEM_MODEL.md`
- `docs/PASS_034Q_ABSORBED.md`
- `packages/atlas-graph-engine/`
