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
Level 2 = Identity    — own your place in the world
Level 3 = Influence   — others trust your taste, judgment, leadership
```

Subtle on paper. Changes everything in product design.

| Level | Question | Product shift |
|-------|----------|---------------|
| **Explore** | What is this world? Can I get started? | Atlas, lore, missions, tools — **not courses as center** |
| **Identity** | Who am I here? What do I own? | Passport, shelf, reviews, collections, groups |
| **Influence** | Who follows my recommendations? | Reputation, hosting, mentor marketplace |

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

Explorer · Collector · Host

Worlds
  Bourbon Steward
  BBQ Pitmaster
  AI Builder
  Community Organizer

Collections     37
Reviews         184
Recommendations 92
Events Hosted   12
Groups          4
Helpful Votes   611
```

Passport is the **consumer shell** for Level 2. Engines feed it; worlds inherit it.

Implementation: after 040A–F exist; preview stubs in 034M.

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

### Ownership infrastructure (post-loop, pre-beta expansion)

```txt
040A  Personal Database Engine
040B  Review Engine
040C  Recommendation Engine v2
040D  Group Engine
040E  Host Engine
040F  Reputation Engine v2
040G  Foundry Passport (consumer shell — aggregates 040A–F)
040H  Mentor Marketplace     — later
```

Once 040A–F exist, Bourbon · BBQ · Poker · AI Builder · Entrepreneur · Country Music · Government · Religion **all inherit the same living social identity infrastructure**.

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

**Identity · Memory · Atlas** — hardest to copy.

Passport makes it visible.
