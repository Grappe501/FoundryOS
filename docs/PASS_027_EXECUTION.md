# PASS-027 — Transformation Analytics & Learning Engine

**Goal:** Foundry learns from users — not just serves content.

## Deliverables

| Item | Route / artifact |
|------|------------------|
| Transformation funnel dashboard | `/operator/analytics` |
| World-level analytics | 7 worlds in dashboard |
| Mission effectiveness | Per-mission started/completed/drop-off |
| Transformation velocity | Join → mission → portfolio → return |
| Early success indicators | Correlation insights on dashboard |
| Domain readiness score | `/growth` + analytics |
| Tester feedback | `/beta/feedback` submit · `/operator/feedback` review |
| Event taxonomy | `mission_started`, `mission_completed`, `mission_step_viewed`, etc. |
| DB layer | `packages/db/src/transformation-analytics.ts` |
| Migration | `20260628000000_pass027_transformation_analytics.sql` |

## Exit criteria

Foundry can answer:

- Which worlds work best?
- Which missions work best?
- Where do users drop off?
- What predicts return visits?
- What predicts mastery?

## Architecture impact

**Reusable system:** Live transformation analytics aggregating validation events, mission sync, beta lifecycle.

**Benefits:** Learning phase begins — behavior drives product decisions, not content volume.

**Affected launches:** All 7 worlds; Growth OS readiness scoring; private beta tester program.
