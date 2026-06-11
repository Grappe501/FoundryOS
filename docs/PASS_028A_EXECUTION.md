# PASS-028A — Community Seeding

**Goal:** Community atmosphere exists before billing. Every world feels occupied on Day 1.

## Per world (7)

| Asset | Count |
|-------|-------|
| Discussions | 25 starter conversations |
| Showcases | 10 example projects (not fake testimonials) |
| Weekly challenges | 12 weeks preloaded |
| Mentor profile | 1 system example + 4 active members |

## Artifacts

| Item | Location |
|------|----------|
| Seed data | `apps/platform/lib/community-seed/` |
| DB runner | `packages/db/src/community-seed.ts` |
| CLI | `npm run seed:community` |
| Migration | `20260629100000_pass028a_community_seeding.sql` |
| UI | Discussions tab, mentor card, challenge archive on `/community/[world]` |

## Mentor starter profiles

| World | Mentor |
|-------|--------|
| AI Builder | Jordan · AI Guide |
| Financial Independence | Sam · Financial Coach |
| Public Speaking | Elena · Speaking Coach |
| Bourbon | Marcus · Bourbon Steward |
| BBQ | Ray · Pitmaster Mentor |
| Poker | Nina · Poker Mentor |
| Civic Engagement | Dana · Civic Mentor |

## Exit criteria

A new visitor sees:

- People (members + mentor)
- Activity (discussions, showcases, challenges)
- Progress (12-week challenge history)

Not an empty community.

## Sequence

```txt
PASS-028A  Community Seeding     ← this pass
PASS-029   Payment Infrastructure
PASS-030   First 25 Tester Program
```

Do not invite testers until PASS-029 is live.

## Architecture Impact

- **Reusable System:** Idempotent community seed runner + weekly challenge table
- **Benefits:** Payment conversion when users see belonging, not emptiness
- **Affected Launches:** All 7 beta worlds before PASS-030
