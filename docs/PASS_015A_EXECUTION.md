# PASS-015A Execution — Traffic Opportunity Registry

> **Don't build event apps. Build permanent transformation domains. Use events as acquisition.**

---

## Pass Gate

> Can Foundry score traffic opportunities and route them into permanent domains — not disposable apps?

---

## Principle

```txt
Traffic → Domain → Transformation → Retention
```

World Cup is a **traffic event**. Soccer is a **permanent asset**.

After the tournament, World Cup traffic is gone. Soccer fans, coaches, referees, and youth players remain.

---

## Deliverables

| Item | Location |
|------|----------|
| Opportunity registry (scored) | `marketing/opportunities/registry.json` |
| World Cup brief (Soccer domain) | `marketing/opportunities/world-cup-2026/` |
| Scoring engine | `apps/platform/lib/opportunity-registry.ts` |
| Live scorecard | `/growth/opportunities` |

---

## Scoring (1–10 each)

| Dimension | Measures |
|-----------|----------|
| Traffic | Search volume / event spike |
| Identity | Self-identification strength |
| Monetization | Tier 2/3 conversion potential |

**Total** = sum (max 30). Portfolio decisions, not shiny objects.

### Example Scorecard

| Opportunity | Traffic | Identity | Monetization | Score |
|-------------|---------|----------|--------------|-------|
| AI Builder | 9 | 10 | 10 | **29** |
| Gardening Season | 8 | 8 | 8 | **24** |
| Bourbon Heritage | 5 | 10 | 9 | **24** |
| World Cup 2026 → Soccer | 10 | 7 | 5 | **22** |
| Midterm Elections 2026 → Civic Engagement | 9 | 8 | 7 | **24** |
| Civic Engagement (evergreen) | 8 | 9 | 8 | **25** |

---

## Anti-Patterns (Do NOT Build)

```txt
Election News · Candidate Ratings · Political Commentary · Polling Predictions
World Cup scores app · Prediction / news / commentary sites
```

Maintenance-heavy, controversial, or traffic that disappears — wrong lane for a one-person company.

---

## January 2027 Launch Sequence

1. Bourbon · 2. AI Builder · 3. Public Speaking · 4. **Civic Engagement** · 5. Gardening
6. BBQ · 7. Poker · 8. Soccer (World Cup) · 9. Books · 10. Movies

---

## Acquisition Pattern Pairs

| Event | Permanent Domain | Outcome |
|-------|------------------|---------|
| World Cup 2026 | Soccer | Road to Soccer Fan |
| Midterm Elections 2026 | Civic Engagement | Become an Informed Citizen |

### World Cup Strategy

**Search intent (acquisition):** schedule, groups, predictions, rosters

**Conversion (retention):** Road to Soccer Fan · Youth Coach · Referee · Analyst · Fantasy Expert

### Civic Engagement Strategy

**Search intent (acquisition):** where do I vote, what's on my ballot, who is running, polling hours, register

**Conversion (retention):** Road to Informed Voter · Poll Worker · Local Leader · Civic Organizer

**NOT:** election news, candidate ratings, political commentary, polling predictions.

Election traffic repeats every cycle — municipal, school board, primary, midterm, presidential.

---

## Part of PASS-015

PASS-015A is the first Growth OS subsystem. Full PASS-015 adds analytics wiring, SEO factory, launch tracker, MRR tracker.

---

## Prerequisites ✅

PASS-014 Domain Proof · Growth OS scaffold (`/growth`)
