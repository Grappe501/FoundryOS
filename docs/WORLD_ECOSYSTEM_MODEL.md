# World Ecosystem Model

> **Continue adding depth — but build the systems that make depth matter personally.**

Most educational platforms:

```txt
Content → Course → Certificate
```

Foundry:

```txt
World → Identity → Influence → Legacy
```

The question is not *how much content exists* — bourbon enthusiasts, entrepreneurs, and civic organizers can spend **years or decades** inside a world.

The question is:

> **How do we make a world feel inexhaustible — and personally meaningful?**

---

## Energy Ratio (locked)

**Do not stop depth.** Change the ratio. **Do not become a filing cabinet.**

| Old trap | Correct balance |
|----------|-----------------|
| Stop adding content depth | **Continue depth** — worlds must reward lifelong obsession |
| More pages = more depth | **More connections = more depth** — graph over catalog |
| Two users see two websites | **Two users see two worlds** — continuity, artifacts, memory personalize depth |
| More lessons first | **More identity infrastructure** — artifacts, knowledge graph, passport |
| Courses are the product | **Worlds are the product** — lessons are on-ramps into the graph |

Enough reactive loop exists to prove the concept (034J→P). The next leap: **depth that compounds into identity via connections.**

See `docs/KNOWLEDGE_GRAPH.md`.

---

## Five Layers

Every world inherits all five. Not every user reaches Layer 5 — but the architecture must support a lifetime.

### Layer 1 — Explore

*What is this world?*

```txt
Atlas · Lessons · Tools · Lore · Rabbit Holes
```

Example: *What is a Rickhouse?*

On-ramps — not the product.

---

### Layer 2 — Practice

*What do I actually do?*

```txt
Missions · Experiences · Investigations · Challenges
```

Example: *Compare three wheated bourbons.*

Bridges Explore → Identity. Without practice, Explore stays consumption.

---

### Layer 3 — Identity

*Who am I here?*

```txt
Collections · Passport · Artifacts · Journal · Memory
```

Example: *I am a bourbon collector.*

Not: *I completed lesson 7.*

Shipped signals: Consequence (034J), Collector (034K), Events (034L), Narrative (034M), Continuity (034P).

**Missing infrastructure:** Artifact Engine (040A), Personal DB (040C), Passport shell (040F).

---

### Layer 4 — Influence

*Who trusts my judgment?*

```txt
Reviews · Recommendations · Hosting · Groups · Mentorship
```

Example: *People trust my recommendations.*

Not followers. Not star ratings. **Earned trust.**

---

### Layer 5 — Legacy

*What did I build over years?*

```txt
History · Timeline · Artifacts accumulated over decades
```

Example: *This is my bourbon journey from 2026–2040.*

Very few products reach this layer. Foundry must.

Preview: `/passport/timeline` (034P). Full archive: Legacy Layer (post-040F).

---

## Nine Behaviors (retention physics)

People stay for hours when they can:

| Behavior | Foundry expression |
|----------|-------------------|
| **Discover** | Atlas, lore, rabbit holes — *"I didn't know that."* |
| **Collect** | Collections, artifacts, shelf — *"I want that."* |
| **Organize** | Personal DB, passport — *"I need to save this."* |
| **Compare** | Tools, detective cases, atlas debates — *"Which one is better?"* |
| **Debate** | Lore, events, community — *"I disagree."* |
| **Build** | Missions, projects, automations — *"I made this."* |
| **Track** | Continuity, timeline, collections — *"I've come a long way."* |
| **Share** | Recommendations, artifacts — *"Look what I found."* |
| **Host** | Host engine, tastings, workshops — *"Come join me."* |

Every great hobby ecosystem combines several of these. Foundry builds the **platform primitives** once; every world inherits them.

---

## The Artifact Primitive

**Biggest missing engine.** Build before more collections.

Everything the user creates, owns, discovers, recommends, hosts, or reviews becomes an **artifact**.

| World | Artifact examples |
|-------|-------------------|
| Bourbon | Tasting note · shelf entry · distillery visit · bottle review · blind result · hosted tasting |
| AI Builder | Prompt · workflow · app · automation · project |
| Public Speaking | Speech · presentation · recording · feedback session |
| Civic | Meeting attended · forum hosted · petition · volunteer hours |

Passport becomes:

```txt
Bourbon Artifacts:        317
AI Builder Artifacts:     102
Public Speaking Artifacts: 44
```

Not: *Level 17.*

Package: `@foundry/artifact-engine` — **PASS-040A** (first in ownership block).

---

## Atlas — Crown Jewel

Not a glossary. A **knowledge graph** where one term can become a weekend.

Every Atlas entry eventually contains:

```txt
Definition · History · Geography
People · Organizations · Debates · Mysteries
Artifacts · Collections
Related Lessons · Related Tools · Related Producer Pages
Related Reviews · Related Community Discussions
Related Rabbit Holes · Related Worlds
```

### Example: Bottled in Bond

Connects to: Colonel E.H. Taylor · Bottled in Bond Act · Frankfort · Heaven Hill · Old Grand-Dad Bonded · Weller Antique debate · Collector collection · Detective case · History article · Atlas cousins.

**PASS-040B** — Atlas Phase 2 Graph Layer (quiet start in 034P.5; full pass after Artifact).

---

## Factory Output

After 034U + 040A–F, the factory does not just build worlds.

It builds **living ecosystems**:

```txt
memory · artifacts · reviews · recommendations
groups · hosting · passport · atlas graph
```

Every future world inherits the same identity infrastructure.

---

## Incoming World Priority

Super-node worlds link multiple live verticals — prioritize them after ownership block.

| Rank | World | Why |
|------|-------|-----|
| 1 | **Entrepreneur** | Links AI Builder · FI · Public Speaking · Civic |
| 2 | Grassroots & Nonprofits | Civic + community power |
| 3 | Government Systems | Civic + academic |
| 4 | World Religion History | Academic · lifetime depth |
| 5 | Country Music | Passion · culture · community |
| 6 | Medical Cannabis Literacy | Academic · governance-gated |
| 7 | Astrology | Passion · cultural frame |

See `apps/platform/lib/incoming-worlds.ts`.

---

## Pass Sequence (locked)

```txt
034P    World Continuity Engine        ✅
034U    Universe Command Center        ← NEXT
040A    Artifact Engine                ← ownership block starts
040B    Atlas Phase 2 Graph Layer
040C    Personal Database Engine
040D    Review & Recommendation Engine
040E    Group & Host Engine
040F    Passport Shell
040G    Reputation Engine v2           — follow-on
040H    Legacy Layer                   — decade archive
```

### Code migration note

Earlier docs placed Artifact at 040H (unifier after other engines). **Reordered:** Artifact is the **atom** — build first; other engines produce artifacts.

034P.5 quiet start (`relationship-seeds.ts`, `graph.ts`) rolls into **040B**.

---

## Producer Pages (content gap)

Depth is still not where it needs to be. Producer pages should read like:

* Mini documentaries · Distillery field guides · Travel guides · Industry histories

Not reference stubs. Separate content pass — does not block 040A.

---

## Related

- `docs/FOUNDRY_LEVEL_MODEL.md` — five layers + tiers
- `docs/FOUNDRY_ARTIFACT_MODEL.md` — artifact primitive
- `docs/ATLAS_PHASE_2.md` — atlas graph schema
- `docs/NEXT_10_PASSES.md` — execution queue
