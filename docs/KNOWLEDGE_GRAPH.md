# Foundry Knowledge Graph

> **Internally: Knowledge Graph. Consumer-facing: Atlas. Never: Encyclopedia. Never: Course Platform.**

Foundry is an **Operating System For Human Interests**. The Academy is one Explore feature — onboarding, not the product.

**Layer 1 = Explore.** Atlas / Graph is the center of Layer 1 depth. **040B2 deployed** — hallways. **040B3 next** — inline links and wander saturation.

Foundry is not validating topic demand. It is:

```txt
Knowledge Universe
+ Identity System
+ Passion Operating System
+ World Factory
+ Atlas Graph
+ Artifact Engine
+ Community Infrastructure
```

The biggest mistake right now is becoming a **giant filing cabinet** — or pausing architecture to chase testers before the systems that create *aliveness* exist.

## Encyclopedia vs Journey

| Encyclopedia | Foundry Knowledge Graph |
|--------------|-------------------------|
| What is this? | **Why should I care?** |
| Static facts | What does it connect to? |
| — | Who disagrees? |
| — | Where does this lead? |
| — | What should I explore next? |

Wikipedia stores information. **Foundry creates journeys.**

---

## Primary Architecture (not World-first)

```txt
Knowledge Graph
  ├── Worlds          ← entry points, not the root
  ├── Artifacts       ← user evidence (040A)
  ├── Collections · Reviews · Events · Groups
  ├── Leader slots · Places · Journeys
```

034U tracks **nodes · connections · gravity · density · artifacts** — not lesson counts alone.

---

## Filing Cabinet vs Knowledge Universe

| Filing cabinet | Knowledge universe |
|----------------|-------------------|
| World → Lesson → Lesson → Lesson | World → graph of entities + relationships |
| More pages = more depth | More connections = more depth |
| Destinations | Hallways |
| Definitions | **Why should I care?** |

```txt
20 entities × 50 connections  >  500 entities × 3 connections
```

---

## The World Is the Graph

Most systems:

```txt
World
 ├─ Lesson
 ├─ Lesson
 └─ Lesson
```

Foundry:

```txt
World
  ├─ People · Places · Objects · Events · Organizations
  ├─ Mysteries · Debates · Collections · Artifacts
  ├─ Reviews · Recommendations · Relationships
  ├─ Techniques · Traditions · Eras · Innovations
  ├─ Movements · Journeys · Experiences · Questions
  └─ Lessons (one way to enter — not the product)
```

Lessons are on-ramps. The graph is the product.

---

## Entity Types (040B)

### Core

```txt
Bottle · Producer · Person · Place · Organization · Event
Atlas Term · Debate · Mystery · Collection · Artifact
Detective · Lore · Review · Recommendation
```

### Extended (multi-identity nodes)

```txt
Technique · Tradition · Era · Innovation · Movement
Location · Journey · Experience · Question
```

One node can wear many hats. Example — **Bottled in Bond**:

```txt
Law · History · Government Reform · Quality Standard
Collecting Strategy · Buying Guide · Debate
```

One node. Many identities. Many behaviors.

---

## Every Node Starts With Relevance

Not:

```txt
Definition → History → Related Terms
```

But:

```txt
Why should I care?   ← FIRST, always
```

Example — **Rickhouse**:

> The same bourbon placed in two different rickhouses can taste noticeably different years later. Understanding rickhouses is one of the first steps from *drinking* bourbon to *understanding* bourbon.

People don't read definitions. People read relevance.

Then: People · Places · Timeline · Debates · Mysteries · Collections · Rabbit holes · Suggested next stop.

---

## One Node, Many Behaviors

On **Bottled in Bond**, a user can:

| Behavior | Action |
|----------|--------|
| **Read** | What is Bottled in Bond? |
| **Investigate** | Why was it created? |
| **Compare** | How does it differ from Single Barrel? |
| **Explore** | What else emerged from the same era? |
| **Collect** | Build a BiB Collection |
| **Influence** | Recommend a BiB bottle (040E) |

Package: `@foundry/atlas-graph-engine` (PASS-040B)

---

## Atlas-Aware AI (040C — after graph exists)

Not generic AI. **Foundry AI** — reasoning over the universe, not the internet.

User asks: *Why is Wild Turkey 101 so respected?*

Retrieval path:

```txt
Wild Turkey 101
  → Jimmy Russell
  → Value Collection
  → Rival Debate
  → Atlas Entries
  → Community Reviews (040E)
  → Related Bottles
```

Moat = AI traverses **your** graph.

---

## Operator Visibility (034U — mission critical)

At scale:

```txt
Today:   20 bottles · 103 terms · 11 producers · 8 people · 7 worlds
Soon:    500 bottles · 2,000 entries · 500 people · 50 worlds
```

034U must answer:

```txt
What exists? · What's connected? · What's weak?
What's missing? · What should Burt build next?
```

Routes: `/operator/universe` · `/operator/atlas/graph`

Without this, you go blind inside your own graph.

---

## Priority Order (locked)

```txt
034U  Universe Command Center     ✅ built (local)
040A  Artifact Engine               ← NEXT
040B  Atlas Graph Engine
034P+ World Memory Expansion
040C  Atlas-Aware AI Layer
040D  Personal Database Engine
040E  Review Engine
040F  Recommendation Engine
040G  Passport
```

Broad tester cohorts **after** this block — when feedback can answer alive vs website.

Once the graph exists:

```txt
Content → Connections → Meaning → Identity → Influence
```

Foundry stops being a collection of worlds and becomes an **operating system for passions, skills, careers, and communities**.

---

## Related

- `docs/PASS_040A_ARTIFACT_ENGINE.md`
- `docs/PASS_040B_ATLAS_GRAPH_ENGINE.md`
- `docs/PASS_034U_UNIVERSE_COMMAND_CENTER.md`
- `docs/PASS_034Q_ABSORBED.md`
- `docs/ATLAS_PHASE_2.md`
- `packages/atlas-graph-engine/`
