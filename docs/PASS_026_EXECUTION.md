# PASS-026 — Invite + Tester Operations

**Goal:** Turn private beta readiness into a controlled tester program.

## Deliverables

| Item | Route / artifact |
|------|------------------|
| Operator invite ops | `/operator/invites` |
| Tester welcome | `/beta/welcome?code=XXXXXXXX` |
| Approve API | `POST /api/operator/invites/approve` |
| Decline API | `POST /api/operator/invites/decline` |
| DB migration | `20260627000000_pass026_tester_operations.sql` |
| First-25 plan | `apps/platform/lib/beta-tester-plan.ts` |
| Invite helpers | `packages/db/src/beta-invites.ts` |

## Operator workflow

1. Review waitlist at `/operator/invites`
2. Assign cohort segment + starting world
3. **Approve & invite** — generates invite code, sets status `invited`
4. **Copy invite message** — paste into email/DM
5. Track funnel: pending → invited → joined (signup trigger) → active (first mission sync)

## First 25 tester plan

| Cohort | Target |
|--------|--------|
| Students | 5 |
| Parents | 5 |
| Adult learners | 5 |
| Educators | 5 |
| Hobbyists | 5 |

## Before first invite — Supabase Auth (required)

Dashboard → **Authentication** → **URL Configuration**

| Setting | Value |
|---------|-------|
| Site URL | `https://foundry-os.netlify.app` |
| Redirect URLs | `https://foundry-os.netlify.app/auth/callback` |

Local dev may keep `http://localhost:3000` in redirect URLs for testing.

## Not in scope

- Public launch
- Automated email send (copy-paste invite for now)
- Operator auth gate (same as `/operator/beta` — internal URL)

## Architecture impact

**Reusable system:** Invite ops layer on `beta_waitlist` — cohort assignment, invite codes, lifecycle tracking, signup + mission hooks.

**Benefits:** Controlled private beta without broad access; operator can run first 25 by segment.

**Affected launches:** All private beta verticals; Bourbon/BBQ/Poker/Civic + Life Leverage worlds.
