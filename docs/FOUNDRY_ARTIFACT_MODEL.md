# Foundry Artifact Model

> **The business model is Identity Systems — not courses.**

## What Foundry Is Not

```txt
Another social network
Reviews · Ratings · Followers · Groups as noise
```

## What Foundry Is

```txt
A trusted operating system for a passion.
```

Level 2 fails when it becomes engagement bait. It wins when it becomes **evidence of a life lived in a world**.

---

## Energy Ratio (locked)

```txt
NOT:  Stop adding content depth
NOT:  More lessons · More academy depth · More course content ONLY

YES:  Continue adding depth — worlds must reward lifelong obsession
YES:  Build systems that make depth matter personally
YES:  Reaction · Identity · Memory · Ownership · Artifacts · Legacy
```

The next leap is not *less content* — it is **depth that compounds into identity** so two different users see two different worlds.

See `docs/WORLD_ECOSYSTEM_MODEL.md`.

---

## Five Layers

```txt
Explore    — Atlas, lore, tools, lessons (on-ramps)
Practice   — Missions, investigations, challenges
Identity   — Artifacts, Passport, collections, memory
Influence  — Reviews, recommendations, hosting, groups
Legacy     — Timeline, decade archive
```

**Identity is built through artifacts. Not lessons.**

Nobody says: *I am a bourbon enthusiast because I finished Lesson 7.*

They say: *I've got 120 tasting notes, 40 bottles on my shelf, and I hosted three tastings last year.*

---

## The Object Hierarchy

```txt
World
  └── Atlas Entry (knowledge graph node)
  └── Mission / Tool (Practice layer — on-ramp)
  └── Event (world state)
  └── Collection (curated storyline)
  └── Artifact ← THE ATOM OF IDENTITY
        └── Review · Recommendation · Journal · Visit
        └── Project · Photo · Host Event Record · Tasting Note
```

---

## Artifact Definition

An **artifact** is anything the user **creates, owns, discovers, collects, recommends, hosts, reviews, or contributes**.

| World | Artifact examples |
|-------|-------------------|
| Bourbon | Tasting note · shelf entry · distillery visit · bottle review · blind result · hosted tasting |
| BBQ | Cook log · recipe · temp log · competition entry · equipment |
| AI Builder | Prompt · workflow · app · automation · project |
| Public Speaking | Speech · presentation · recording · feedback session |
| Civic | Meeting attended · forum hosted · petition · volunteer hours |
| Poker | Session · hand review · bankroll log · tournament entry |

Every Influence engine produces artifacts. Every world inherits **`My Artifacts`**.

---

## Package: `@foundry/artifact-engine` (PASS-040A)

**First in the ownership block** — build the atom before engines that produce atoms.

Routes all user-created evidence through one primitive:

```txt
Review          → artifact
Recommendation  → artifact
Journal         → artifact
Project         → artifact
Collection item → artifact
Event hosted    → artifact
Visit           → artifact
```

**Consumer surface:** `/{world}/artifacts` · aggregated in Passport.

**Storage:** extends `user_entity_relationships` + typed artifact payload — no niche tables per world.

---

## Passport Evolution (PASS-040F)

Not percentages. Not XP. Not levels. **Only evidence.**

```txt
Steve Grappe

Builder · Collector · Host

Bourbon Artifacts         317
AI Builder Artifacts      102
Public Speaking Artifacts  44
Collections                33
Reviews                    82
Events Hosted              14
```

Passport = **unified life archive** across worlds.

Preview: `/passport` · `/passport/timeline` (034P). Full shell: **040F**.

---

## Atlas — Crown Jewel

Every Atlas entry eventually includes:

```txt
Definition · History · Geography
People · Organizations · Debates · Mysteries
Artifacts · Collections
Related Lessons · Tools · Producer Pages · Reviews
Related Rabbit Holes · Related Worlds
```

One term → a weekend. **PASS-040B** (Atlas Phase 2 Graph Layer).

See `docs/ATLAS_PHASE_2.md`.

---

## Pass Sequence (locked)

### Reactive loop

```txt
034M  Identity Narrative     ✅
034P  World Continuity       ✅
034U  Universe Command Center ← NEXT
034V  World Architect
```

### Ownership + ecosystem (040 block)

```txt
040A  Artifact Engine              ← build first
040B  Atlas Phase 2 Graph Layer
040C  Personal Database Engine
040D  Review & Recommendation Engine
040E  Group & Host Engine
040F  Passport Shell
040G  Reputation Engine v2
040H  Legacy Layer
040I  Mentor Marketplace           — later
```

After 040A–F, the factory builds **living ecosystems** — not just worlds.

### Pass code migration

Earlier docs placed Artifact at 040H (unifier after other engines). **Reordered:** Artifact is 040A — the primitive everything else produces.

---

## Principle

The real product is not education.

It is helping people **build a richer life around the things they care about** — and **preserving the evidence that they did**.

When Foundry stops feeling like a website and starts feeling like a place — **that** is the moat.
