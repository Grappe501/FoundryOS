# PASS-010 Execution

> **Exit criteria:** A real transformation loop works.

Not: code compiles · pages exist · routes load.

## Demo User Proof

| Field | Value |
|-------|-------|
| User | Demo User |
| Goal | Become a Better Public Speaker |
| Outcome | Better Speaker |
| Path | Road to Confident Speaker |
| Project | Deliver First Speech |
| Action | Deliver a 5-minute speech |

## Verification Screen

`/loop` — PASS-010 Verification checklist (9 steps + COMPLETE status)

## Database

Table: `transformation_loops` — goal, outcome, path, project, evidence, reflections, insight, next action persist.

## Production Requirements

1. GitHub commit + push
2. Netlify build + deploy
3. Routes load: `/loop`, `/transformation-graph`, `/equation`
4. Demo user loop persists in Supabase

## Do Not Start

PASS-011 · Evidence enhancements · Collections · Clubs · Bourbon · Physics · AI Builder

Prove **one** transformation. Then replicate.

## Code

`@foundry/transformation-loop` · `@foundry/db` · `apps/platform/lib/loop-verification.ts`
