# Traffic Opportunity Registry — PASS-015A

> **Don't build event apps. Build permanent transformation domains. Use events as acquisition.**

Every opportunity follows:

```txt
Traffic → Domain → Transformation → Retention
```

## The World Cup Pattern

**Wrong:** World Cup App · Predictions · News · Scores → traffic spikes, then dies.

**Right:** Build **Soccer** (permanent domain). Use **World Cup 2026** as the launch event.

After the tournament, soccer fans, players, coaches, referees, parents, youth players, and collectors remain. Those are transformation markets.

## The Midterm Pattern

**Wrong:** Election News · Candidate Ratings · Political Commentary · Polling Predictions — maintenance-heavy, controversial.

**Right:** Build **Civic Engagement** (permanent domain). Use **Election Season 2026** as the acquisition event.

Outcome: *Become an Informed Citizen* — not *I want election news.*

Election searches repeat every year (municipal, school board, primary, midterm, presidential). Same infrastructure as every other domain.

## Anti-Patterns (Registry)

Do not build disposable news, ratings, commentary, or prediction sites. See `registry.json` → `anti_patterns`.

## Scoring (1–10 each)

| Dimension | Question |
|-----------|----------|
| **Traffic** | How much search volume does the event drive? |
| **Identity** | Do people proudly self-identify with this domain? |
| **Monetization** | Collections, tiers, community, projects — can we charge? |

**Total score** = Traffic + Identity + Monetization (max 30).

Portfolio decisions, not shiny objects.

## Registry Structure

```txt
marketing/opportunities/
├── acquisition-events/
├── permanent-domains/
├── launch-calendars/
├── seasonal-patterns/
├── seo-clusters/
├── revenue-models/
├── registry.json
└── scoring-rubric.json
```

## Growth Factory Funnel

```txt
Traffic Event → Permanent Domain → Transformation System → Retention → Revenue
```

## Folder Map

| Folder | Event | Permanent Domain |
|--------|-------|------------------|
| `world-cup-2026/` | FIFA World Cup 2026 | Soccer |
| `midterm-elections-2026/` | Election Season 2026 | **Civic Engagement** (NOT politics news) |
| `civic-engagement/` | Permanent domain brief | Civics · Citizen Engagement |
| `super-bowl-2027/` | Super Bowl LXI | Football (American) |
| `march-madness/` | NCAA Tournament | College Basketball |
| `masters-golf/` | The Masters | Golf |
| `kentucky-derby/` | Kentucky Derby | Horse Racing |
| `bourbon-heritage-month/` | September | Bourbon |
| `gardening-season/` | Spring planting | Master Gardener |
| `bbq-season/` | Summer grilling | BBQ |

## Acquisition Pattern Pairs

| Traffic Event | Permanent Domain |
|---------------|------------------|
| World Cup 2026 | Soccer |
| Midterm Elections 2026 | Civic Engagement |
