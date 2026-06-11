# FoundryOS — Reputation System

> Authority, not gamification. Designed PASS-002 before launch.

---

## PASS-013 Chain (locked)

```txt
Evidence Engine  →  Reputation  →  Mastery  →  Identity  →  Community
```

- **Reputation is earned trust** — not points
- **Mastery is demonstrated capability** — not activity badges
- Evidence (PASS-011) feeds Reputation; Reputation feeds Mastery; Mastery feeds Identity; Identity feeds Community (PASS-012)

---

## Philosophy

Reputation builds **local and network experts**. Tier 3 attribution flows to Tier 1. Users trust curated voices, not anonymous ratings.

Not points and badges for engagement bait — **expertise titles and trust scores**.

---

## Tables

```sql
user_reputation     — trust_score, counts per vertical/topic
user_badges         — earned authority markers
user_expertise      — "Bourbon Curator · Central Arkansas"
user_contributions  — audit trail of impact
```

---

## Profile Example

```txt
Steve Grappe

Bourbon Curator
Central Arkansas

Collections: 12
Reviews: 184
Rankings: 22

Community Trust Score: 94
```

---

## Trust Score Calculation (PASS-002 schema, PASS-008 logic)

Factors:
- Review quality (helpful votes, depth)
- Collection curation (size, consistency)
- Ranking authority (expert agreement)
- Tenure and contribution volume
- Community validation (Tier 3 network)

Score: 0–100. Displayed publicly on Tier 1 for attribution.

---

## Badges

| Badge Type | Meaning |
|------------|---------|
| `curator` | 10+ curated collections in vertical |
| `reviewer` | 50+ published reviews |
| `ranker` | Established ranking lists |
| `connector` | Cross-vertical relationship contributions |
| `founding_expert` | Early vertical adopter |

Badges are **vertical-scoped** where relevant.

---

## Expertise Titles

`user_expertise.title` examples:
- Bourbon Curator
- Film Noir Authority
- Jazz Vinyl Specialist
- SEC Baseball Analyst

`region` optional: "Central Arkansas", "Napa Valley", "Tokyo"

`level` 1–5: depth within topic

`verified` false until platform or community validation (Tier 3)

---

## Tier 3 → Tier 1 Attribution

When a Tier 3 expert reviews Buffalo Trace:
- Review appears on entity page (Tier 1)
- Expert's trust score and title visible
- Links to expert's public collections
- Motivates Tier 1 users to upgrade

---

## Platform Asset

Aggregate expert network = **moat**.

Investors see:
- Growing expert count per vertical
- Rising trust scores
- Cross-vertical expertise density

Tracked in `docs/METRICS.md` and Mission Control.
