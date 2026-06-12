# Foundry Level Model

> **Courses get people in. Identity keeps them for years.**

## The Reframe (locked)

Old framing:

```txt
Level 1 = Learn
Level 2 = Live
Level 3 = Lead
```

**Correct framing:**

```txt
Level 1 = Explore     — discover the world, become competent
Level 2 = Identity    — own your place through artifacts
Level 3 = Influence   — others trust your taste, judgment, leadership
Level 4 = Legacy      — permanent record of who you became
```

Subtle on paper. Changes everything in product design.

| Level | Question | Product shift |
|-------|----------|---------------|
| **Explore** | What is this world? Can I get started? | Atlas, lore, missions, tools — **on-ramps, not the product** |
| **Identity** | Who am I here? What do I own? | Artifacts, Passport, collections, personal DB |
| **Influence** | Who trusts my judgment? | Recommendations, reputation, hosting |
| **Legacy** | What did I build over years? | Decade-scale archive — reviews, events, projects, collections |

## Trusted OS — Not Social Network

Level 2 must not become:

```txt
Reviews · Ratings · Followers · Groups · Feed noise
```

Target:

```txt
A trusted operating system for a passion.
```

See `docs/FOUNDRY_ARTIFACT_MODEL.md`.

## Psychological Shift

Today:

```txt
Come learn something.
```

Target:

```txt
Come belong somewhere.
```

People spend years on Goodreads, Untappd, Reddit — not for content. For:

```txt
MY profile
MY shelf
MY reviews
MY discoveries
MY reputation
MY friends
MY recommendations
```

**Ownership · Status · Recognition · Contribution** — where obsession comes from.

## What Exists vs What's Missing

```txt
Built:                          Missing:
Content                         Ownership
Tools                           Status
Missions                        Recognition
Lore                            Contribution
Atlas
Collections (034K)
Consequences (034J)
Events (034L)
```

The reactive loop (034J→P) closes **Identity signals**. The **040 block** closes **Identity infrastructure**.

---

## Foundry Passport

Not a profile. A **passport**.

**Route:** `/passport`

Every world contributes stamps. Every action compounds.

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

No percentages. No XP. No levels. **Only evidence.**

Passport is the **unified life archive**. Preview at `/passport` (034M). Full shell: **040G**. Artifacts unify via **040H**.

---

## Level 2 = Eight Platform Engines

Build once. Every world inherits.

| # | Engine | Package | Purpose |
|---|--------|---------|---------|
| 1 | **Personal Database** | `@foundry/personal-database-engine` | Second brain per world — My Shelf, My Cooks, My Sessions |
| 2 | **Review** | `@foundry/review-engine` | Who is this for? What surprised me? Not 8.3/10 |
| 3 | **Recommendation** | `@foundry/recommendation-engine-v2` | Humans recommend; people trust people |
| 4 | **Group** | `@foundry/group-engine` | Identity tribes — clubs, not forums |
| 5 | **Host** | `@foundry/host-engine` | Tasting night, cook, workshop — agenda + prompts auto-generated |
| 6 | **Reputation** | `@foundry/reputation-engine` v2 | Helpful · Thoughtful · Trusted — earned, not followers |
| 7 | **Discovery** | `@foundry/consequence-engine` ✅ | Actions unlock storylines, not badges — **started 034J** |
| 8 | **Mentor Marketplace** | later | Steward · Mentor · Coach — paid access, post-beta |

All objects flow through **`user_entity_relationships`** + typed extensions. No niche tables per world.

---

## Review Engine (not Yelp)

Every review answers:

```txt
Who is this for?
Why would someone love this?
Why would someone hate this?
What surprised me?
What should I try next?
```

Reviews become **identity artifacts**, not star ratings.

---

## Recommendation Engine (not scores)

```txt
Because you enjoy: Wild Turkey 101, Rare Breed, Russell's Reserve
Try: Four Roses Small Batch Select
```

People trust humans. Not aggregates.

---

## Group Engine (not forums)

```txt
Arkansas Bourbon Hunters
Weekend Pitmasters
AI Entrepreneurs
Civic Leaders of Arkansas
```

Invite-only · public · private. Group feed, collections, challenges, events.

---

## Host Engine (Foundry differentiator)

```txt
Host a tasting · BBQ · poker night · AI workshop · civic discussion
```

System generates: agenda, prompts, materials, scoring sheets, follow-up, photos, recommendations.

---

## Tier Gate

| Tier | Level | Unlocks |
|------|-------|---------|
| Free | Explore | Atlas, browse, search |
| $4/mo Build | Identity | Passport, personal DB, reviews, collections |
| $18/mo Mastery | Influence | Groups, host, social, AI, cross-world |

---

## Pass Sequence (locked)

### Reactive loop (finish first)

```txt
034M  Identity Progression   — narrative tiers, becoming (opens Identity layer)
034P  World Memory           — continuity
034U  Universe Command Center
034V  World Architect
```

### Ownership + archive (after 034U)

```txt
040A  Personal Database Engine
040B  Review Engine
040C  Recommendation Engine v2
040D  Group Engine
040E  Host Engine
040F  Reputation Engine v2
040G  Foundry Passport (full evidence shell)
040H  Artifact Engine — reviews, journals, hosts, visits → one primitive
040I  Legacy Layer — decade-scale permanent record
040J  Mentor Marketplace — later
```

Once 040A–I exist, every world inherits the same **identity system infrastructure**.

---

## The Artifact Primitive

Identity is built through **artifacts** — not lessons.

Package: `@foundry/artifact-engine` (040H). Everything Level 2 produces routes through it.

See `docs/FOUNDRY_ARTIFACT_MODEL.md`.

---

## Energy Allocation Warning

Do not over-invest in:

```txt
Lessons · Courses · Academies
```

Invest in:

```txt
Identity · Ownership · Collections · Reputation · Groups · Hosting
```

Academies are **on-ramps**. Passport is **retention**.

---

## Moat

Anyone can create lessons.

Very few systems make a user feel:

> "This place remembers what I care about, understands where I'm going, and keeps showing me interesting things I didn't know I wanted."

**Identity · Memory · Atlas · Artifacts · Legacy** — hardest to copy.

Passport + Artifact archive make it visible — and permanent.
