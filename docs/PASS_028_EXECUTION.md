# PASS-028 — Community Activation

**Goal:** Turn worlds into places. Make existing worlds feel alive — not more content.

## Deliverables

| Item | Route / artifact |
|------|------------------|
| Community feed hub | `/community/[world]` (7 worlds) |
| Join community | API + UI |
| Weekly challenge engine | Current challenge · submit · this week list |
| Showcase engine | Post · feed · peer feedback |
| Mentor recognition | Help count tiers: 3 · 10 · 50 members |
| Community analytics | Extended `/operator/analytics` |
| DB | `community_posts`, `community_peer_feedback` |
| Config | `apps/platform/lib/community-worlds.ts` |

## Living communities

| World | Community |
|-------|-----------|
| AI Builder | Foundry AI Lab |
| Financial Independence | Wealth Builders Circle |
| Public Speaking | Speaker Circle |
| Bourbon | Central Arkansas Bourbon Society |
| BBQ | Pitmaster Collective |
| Poker | Strategic Thinking Society |
| Civic Engagement | Civic Action Circle |

## Exit criteria

A tester can:

- Join a community
- Participate in a challenge
- Submit something
- Receive feedback
- See other members
- Return next week

## Sequence (locked)

```txt
PASS-028  Community Activation      ← this pass
PASS-029  Payment + Subscription
PASS-030  First 25 Tester Program
PASS-031  Marketing Engine
PASS-032  First 100 Users
```

Do **not** invite testers until PASS-030. Do **not** build more worlds or content first.

## Architecture impact

**Reusable system:** Community activation layer on `community_instances` — feed, challenges, showcase, mentor help counts.

**Benefits:** Belonging drives retention; progress + identity before subscription (PASS-029).

**Affected launches:** All 7 consumer worlds; analytics funnel; Growth OS readiness engagement scores.
