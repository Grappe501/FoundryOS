# PASS-029 — Revenue Validation Infrastructure

**Objective:** Can Foundry reliably convert interest into money?

Not Stripe for its own sake — instrument, trigger, measure, then charge.

## Layers

### 1 — Pricing Experiment Engine

Events tracked:

```txt
pricing_viewed
pricing_clicked
upgrade_initiated
upgrade_completed
```

Dashboard: `/operator/revenue`

### 2 — Upgrade Moments

Contextual triggers after transformation milestones:

| World | Trigger | Tier | Message |
|-------|---------|------|---------|
| AI Builder | Mission 1 complete | Build | Want the complete Academy? |
| Financial Independence | First portfolio entry | Build | Track your entire wealth journey |
| Public Speaking | First talk complete | Mastery | Unlock advanced speaking paths |

### 3 — Value Visibility

`ValueProgress` component shows:

- Completed missions
- Portfolio items
- Community participation
- Current tier
- What comes next (free + premium steps visible)

### 4 — Founder Dashboard

`/operator/business` tracks:

```txt
Waitlist · Invites · Joined · Active
Pricing Views · Upgrade Clicks · Paid Users · MRR
Transformations in Progress · Monthly Active Transformations · Upgrade Intent
```

### 5 — Payment Infrastructure

Stripe only. No annual, coupons, affiliates, orgs, enterprise.

```txt
Build   $4/mo
Mastery $18/mo
```

Env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_BUILD`, `STRIPE_PRICE_MASTERY`

## Exit criteria

Foundry can answer:

- How many people saw pricing?
- How many clicked upgrade?
- How many started checkout?
- How many paid?
- What world converts best?
- What mission converts best?

## Growth OS KPI hierarchy

Business metrics first:

```txt
Transformations In Progress
Monthly Active Transformations
Upgrade Intent
Paid Users
MRR
```

## Sequence

```txt
PASS-029  Revenue Validation  ← this pass
PASS-030  First 25 Testers    ← after Stripe configured + dashboards live
```

## Architecture Impact

- **Reusable System:** Revenue event pipeline + upgrade moment config + Stripe webhook handler
- **Benefits:** Learn which transformations people pay for — the compounding business moat
- **Affected Launches:** All 7 worlds before PASS-030 invites
