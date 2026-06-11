# PASS-030 — Learning Lane

> **Parallel with PASS-031** · Learn from humans while marketing factory runs.

## Purpose

```txt
Learn from humans — not scale
```

## Rules (locked)

| Rule | Value |
|------|-------|
| Max testers | 25 |
| Segments | 5 students · 5 parents · 5 educators · 5 adult learners · 5 hobbyists |
| Ads | No |
| Public launch | No |
| Gate | PASS-029A `npm run verify:revenue` must pass |

## Measure

| Metric | Source |
|--------|--------|
| Return rate | Active testers / joined |
| Mission completion | Transformation analytics by world |
| Community participation | `discussion_posted`, showcase events |
| Upgrade intent | `pricing_clicked`, `upgrade_initiated` |
| Payment conversion | `upgrade_completed` / `pricing_viewed` |

## Operator routes

- `/operator/learning` — learning lane dashboard
- `/operator/invites` — approve and send invites
- `/operator/business` — cohort tracker (5 each)
- `/operator/revenue/verify` — pre-invite gate

## Architecture impact

**Reusable system:** PASS-030 formalizes existing PASS-026 invite ops + PASS-029 revenue instrumentation as a controlled observation lane.

**Benefits:** Discover reality before scaling marketing spend.

**Affected launches:** All Life Leverage worlds — primary tester worlds: ai-builder, financial-independence, public-speaking.
