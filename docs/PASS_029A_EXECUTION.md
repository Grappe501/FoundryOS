# PASS-029A — Revenue & Analytics Verification

**Goal:** Prove every business metric is accurate before real users arrive (PASS-030).

## Test personas

| Persona | Segment | World | Mission | Journey |
|---------|---------|-------|---------|---------|
| Student Sam | student | AI Builder | Homework Assistant | full funnel → paid |
| Parent Paula | parent | Financial Independence | First Budget | checkout initiated, no pay |
| Adult Learner Alex | adult_learner | Bourbon | First Tasting | pricing click only |
| Educator Emma | educator | Public Speaking | First Talk | community → paid Mastery |
| Hobbyist Hank | hobbyist | BBQ | First Pork Butt | checkout cancelled |

## Verification

```powershell
npm run verify:revenue
```

Or visit `/operator/revenue/verify` (re-seeds personas and runs checks).

## Checklist

- [ ] Funnel events: pricing_viewed, pricing_clicked, upgrade_initiated, upgrade_completed
- [ ] World attribution (AI Builder, FI, Public Speaking)
- [ ] Mission attribution (Homework Assistant, First Budget)
- [ ] Checkout cancelled tracked (Hank)
- [ ] Community → upgrade intent correlation
- [ ] Dashboard consistency across /operator/revenue, /operator/business, /operator/analytics

## Fixes in this pass

- Single source of truth: `buildRevenueSnapshotFromEvents()` for all dashboards
- Server-only `upgrade_initiated` (no client duplicate)
- Normalized tier metadata (`build` / `mastery`)
- World resolution: `path_slug` + `metadata.world_slug` + landing page fallback
- Mission on `upgrade_completed` via Stripe webhook
- `checkout_cancelled`, `checkout_blocked_signin`, `subscription_cancelled` events
- `discussion_posted` (was mis-tagged as community_joined)
- Community → upgrade intent correlation

## Exit criteria

Foundry can accurately answer:

- Who paid?
- Why did they pay?
- What world influenced the purchase?
- What mission influenced the purchase?
- What community influenced the purchase?

## Sequence

```txt
PASS-029A  Revenue verification  ← this pass
PASS-030   First 25 testers      ← after verify passes
PASS-031   Marketing Engine      ← after learning from testers
```
