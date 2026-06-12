# PASS-034M — Identity Narrative Engine

> **Pass code: 034M. Product name: Identity Narrative — not Identity Progression.**

## Core Principle

Users do not wake up wanting progression. They wake up wanting **identity**.

```txt
WRONG (LMS):     47% · Level 2 · Intermediate
RIGHT (Foundry): "You've become the person your friends ask before buying bourbon."
```

Internal phases exist for the engine. **Never show tiers, levels, or percentages to users.**

## The Engine Answers

```txt
Who am I becoming?
What evidence suggests that?
What does my mentor notice?
What opportunities does that unlock?
```

Not: *What percentage am I?*

## Package

`@foundry/identity-narrative-engine`

| Module | Role |
|--------|------|
| `types.ts` | Signals in, narrative out — no user-facing phases |
| `phases.ts` | `scoreInternalPhase()` — **internal only** |
| `topics.ts` | Detect interests from evidence |
| `worlds.ts` | Per-world narrative copy templates |
| `resolve.ts` | `resolveWorldIdentityNarrative()`, `resolveFoundryIdentityStory()` |

## Signal Inputs (v1 — client state)

| Source | Evidence |
|--------|----------|
| Consequences | Unlocked nodes, mentor memories |
| Collector | Collection progress |
| World Events | Votes, challenges, saves, debates |
| Living journey | Missions, reflections, journal |
| Mentor (034A) | Ambitions, dreams |

## Consumer Deliverable — My Journey

```txt
Your Story So Far

You began by exploring bourbon casually.

Recently you've shown a strong interest in
allocation economics, bottled-in-bond history,
and wheated mash bills.

Your mentor believes you're developing the instincts
of a collector rather than a casual enthusiast.

Suggested next step:
Investigate the Stitzel-Weller mystery.
```

## Surfaces

| Route | Change |
|-------|--------|
| `/my-journey` | `IdentityStoryPanel` — primary deliverable |
| `/identity` | Narrative only — no progress bars |
| `/{world}` hub | `WorldIdentityNarrativePanel` |
| `/passport` | Preview stub → full shell in 040G |

## 034P Preview (World Memory)

Memory is not "last login 3 days ago." It is:

```txt
Last time you were here:
You were comparing Four Roses recipes…
You bookmarked the Weller controversy but never finished it.
```

034M creates identity signals. **034P makes them continuous.**

## Atlas Phase 2 (planning during 034M/P)

See `docs/ATLAS_PHASE_2.md` — relationships, cousins, geography, timelines, people, organizations, debates, mysteries. Atlas becomes connective tissue across worlds.

## Audit

`npm run audit:identity`

## Exit Criteria

User opens Foundry and reads **who they are becoming** — not how far through a course they are.

Two users with different evidence see **different narratives**.

## Warning

**No more bourbon content depth** this pass. Pattern: reaction → identity → memory → ownership.

## Sequence

```txt
034M  Identity Narrative   ← NOW
034P  World Memory
034U  Universe Command Center
034V  World Architect
040A→F  Ownership engines
```
