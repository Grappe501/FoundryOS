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

## The Object Hierarchy (updated)

```txt
World
  └── Atlas Entry (knowledge graph node — not "encyclopedia")
  └── Mission / Tool (on-ramp — not the product)
  └── Event (world state)
  └── Collection (curated storyline)
  └── Artifact ← THE MISSING PRIMITIVE
        └── Review
        └── Recommendation
        └── Journal / Tasting Note
        └── Project
        └── Visit
        └── Photo
        └── Checklist
        └── Host Event Record
        └── Recommendation
```

**Identity is built through artifacts. Not lessons.**

Nobody says: *I am a bourbon enthusiast because I finished Lesson 7.*

They say: *I've got 120 tasting notes, 40 bottles on my shelf, and I hosted three tastings last year.*

---

## Artifact Definition

An **artifact** is anything the user **creates, owns, discovers, collects, recommends, hosts, reviews, or contributes**.

| World | Artifact examples |
|-------|-------------------|
| Bourbon | My Shelf · Tasting Notes · Distillery Visits · Blind Tasting Wins · Recommended Bottles |
| BBQ | My Cooks · Recipes · Temperature Logs · Competition Entries · Equipment |
| AI Builder | Automations · Prompts · Apps · Businesses · Workflows |
| Civic | Forums Attended · Volunteer Hours · Projects · Research · Meetings |
| Poker | Sessions · Hand Reviews · Bankroll Logs · Tournament Entries |

Every Level 2 engine produces artifacts. Every world inherits **`My Artifacts`**.

---

## Package: `@foundry/artifact-engine` (PASS-040H)

Routes all user-created evidence through one primitive:

```txt
Review          → artifact
Recommendation  → artifact
Journal         → artifact
Project         → artifact
Collection item → artifact
Event hosted    → artifact
Visit           → artifact
Photo           → artifact
Checklist       → artifact
```

**Consumer surface:** `/{world}/artifacts` · aggregated in Passport.

**Storage:** extends `user_entity_relationships` + typed artifact payload — no niche tables per world.

Build **after** 040A–F (personal DB, review, recommend, group, host, reputation). Artifacts unify their outputs.

---

## Passport Evolution (PASS-040G)

Not percentages. Not XP. Not levels. **Only evidence.**

```txt
Steve Grappe

Builder · Collector · Host

Worlds
  Bourbon Steward
  Community Organizer
  AI Builder

Artifacts         417
Collections        33
Reviews            82
Events Hosted      14
People Helped     219
```

Passport = **unified life archive** across worlds.

Preview live at `/passport` (034M). Full shell after 040A–H.

---

## Level Model (four layers)

```txt
Explore    — discover the world (Atlas, lore, tools, missions as on-ramps)
Identity   — who am I here? (artifacts, Passport, collections)
Influence  — who trusts my judgment? (recommendations, reputation, host)
Legacy     — permanent record of who I became (10 years of evidence)
```

**Legacy** is the emotional moat almost nobody else is building.

After a decade: 500 projects · 100 hosted events · 50 collections · thousands of artifacts.

Passport becomes:

> A history of who I became.

See `docs/LEGACY_ENGINE.md` · `@foundry/ownership-graph` legacy profile (schema exists).

---

## Atlas — Stronger Than Encyclopedia

Stop calling it encyclopedia. **Atlas** suggests maps, connections, discovery, journeys — not definitions alone.

Every Atlas entry eventually includes:

```txt
Definition
Story
History
Geography
Timeline
Related People
Related Places
Related Objects
Related Debates
Related Events
Related Collections
Related Artifacts
Related Worlds
```

That is a **knowledge graph** — connective tissue between worlds.

### Atlas-Aware Everything

Reading: *Wild Turkey 101 is one of the most respected value bourbons…*

Hover **Wild Turkey 101** → Atlas card (never leave the page):

```txt
Definition · Why it matters · Distillery · Jimmy Russell
Russell's Reserve · Rare Breed · Kentucky · Lawrenceburg
Related debates · Related collections · People who own this · Suggested next bottle
```

Bourbon proof: `AtlasTerm` + 103 terms. Expand per world. See `docs/ATLAS_PHASE_2.md`.

---

## Trusted OS vs Social Network

| Social network | Foundry Identity System |
|----------------|-------------------------|
| Followers | People helped |
| Likes | Helpful votes (earned) |
| Feed noise | Artifact evidence |
| Viral outrage | Trusted recommendations |
| Profile flex | Passport archive |

Groups are **identity tribes** (040D) — clubs, not forums.

Reputation (040F): Helpful · Thoughtful · Knowledgeable · Welcoming · Trusted.

---

## Pass Sequence (locked)

### Reactive loop

```txt
034M  Identity Narrative     ✅ shipped
034P  World Memory           ← next
034U  Universe Command Center
034V  World Architect
```

### Ownership + archive

```txt
040A  Personal Database Engine
040B  Review Engine
040C  Recommendation Engine v2
040D  Group Engine
040E  Host Engine
040F  Reputation Engine v2
040G  Foundry Passport (full shell)
040H  Artifact Engine        ← unifies all user evidence
040I  Legacy Layer           ← permanent record, decade-scale
040J  Mentor Marketplace     — later, paid access
```

### Principle

The real product is not education.

It is helping people **build a richer life around the things they care about** — and **preserving the evidence that they did**.

---

## Energy Allocation (hard rule)

```txt
STOP:  More lessons · More academy depth · More course content
START: Reaction · Identity · Memory · Ownership · Artifacts · Legacy
```

Enough content exists to prove the concept. The next leap: **the world reacts differently to two different users.**

That is when Foundry stops feeling like a website and starts feeling like a place.
