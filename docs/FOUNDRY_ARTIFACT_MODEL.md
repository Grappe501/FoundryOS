# Foundry Artifact Model

> **Operating System For Human Interests — not a course platform.**

## The Mental Trap

Do not classify Foundry as:

```txt
Course Platform → Academy → Certificate
```

Foundry is becoming:

```txt
Operating System For Human Interests
```

The Academy is **one feature** inside Explore — onboarding, not the product. If Foundry succeeds, Academy may be a **surprisingly small %** of engagement. The world keeps them there.

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

## Engagement Mix (target — not lesson-heavy)

Example: successful bourbon user time allocation:

```txt
 5%  academy / lessons      ← got them in the door
10%  missions
15%  atlas / graph
20%  collections
15%  reviews
10%  recommendations
10%  detective
 5%  events
 5%  groups / hosting
```

AI Builder follows the same shape: workflows, tool reviews, prompt libraries, workshops, projects, artifacts — Academy becomes onboarding; **the world becomes the product**.

---

## Four Layers (CEO framing)

```txt
Layer 1 — Explore     Atlas · Lore · Missions · Tools · Academies
Layer 2 — Identity    Artifacts · Collections · Passport · Memory · Narrative
Layer 3 — Influence   Reviews · Recommendations · Groups · Hosting · Reputation
Layer 4 — Legacy      Archives · Mentorship · Teaching · Long-term contribution
```

Implementation detail uses five layers (Practice between Explore and Identity) — see `docs/WORLD_ECOSYSTEM_MODEL.md`.

**Identity is built through artifacts. Not lessons.**

Nobody says: *I am a bourbon enthusiast because I finished Lesson 7.*

They say: *I've got 120 tasting notes, 40 bottles on my shelf, and I hosted three tastings last year.*

---

## Five Layers (implementation)

```txt
Explore    — Atlas, lore, tools, lessons, missions
Identity   — Artifacts, Passport, collections, memory
Influence  — Reviews, recommendations, hosting, groups
Legacy     — Timeline, decade archive
```

---

## Artifact Cascade (why 040A compounds)

```txt
Tasting note → WT101 node → producer → Kentucky → trail
→ travel artifact → group → hosted tasting → event artifact → reputation
```

That's not a course. That's a living knowledge ecosystem.

---

## The Object Hierarchy

**Primary unit is the Knowledge Graph — not the World.**

```txt
Knowledge Graph
  ├── Worlds           ← curated entry points
  ├── Artifacts        ← atoms of identity (040A)
  ├── Collections · Reviews · Events · Groups
  ├── People (slots) · Places · Journeys
```

World-local view:

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

```txt
034U  Universe Command Center     ✅
040A  Artifact Engine             ← NEXT — see PASS_040A_ARTIFACT_ENGINE.md
040B  Atlas Graph Engine
034P+ World Memory Expansion
040C  Atlas-Aware AI
040D  Personal Database Engine
040E  Review Engine
040F  Recommendation Engine
040G  Passport
```

Then: Group · Host · Legacy · Reputation v2 · Mentor Marketplace

---

## Principle

The real product is not education.

It is helping people **build a richer life around the things they care about** — and **preserving the evidence that they did**.

The long-term moat:

```txt
This system knows what I care about.
Remembers what I've done.
Connects ideas I wouldn't have found.
Stores years of my work.
Introduces me to people like me.
Makes me more effective at my passion.
```

When Foundry stops feeling like a website and starts feeling like a place — **that** is the moat.
