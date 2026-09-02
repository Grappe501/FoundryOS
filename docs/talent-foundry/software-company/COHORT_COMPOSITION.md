# Company Foundry — Cohort Composition

**Status:** LOCKED from 1000 simulations (seed `20261115`). Staff only. Not a door. Not a personality test.  
**Code:** `apps/platform/lib/talent-foundry/implementations/company/cohort/`

People **learn the work before anyone chooses who can do the job.** Completing the Foundry does not earn a seat. A human still invites. This pass only organizes complementary tapes so Cohort 01 can lift itself.

---

## What the simulations asked

1,000 possible people (noisy mixes of 12 working postures).  
1,000 hiring pools of 18.  
Each pool: compose a 3, then add 2. Compare to a random 3 and a random 5.

Internal lift is coverage of needed moves + one followable plan + help/handoff + ship − abandon. That number is **not** written onto a person.

| | Composed | Random | Lift |
|---|---|---|---|
| 3 seats | 0.591 | 0.371 | **+0.220** |
| 5 seats | 0.613 | 0.419 | **+0.194** |

Almost nobody who drifted or worked only alone won a starter seat (drifter 1, solo 6 of 3,000 starter seats).

---

## The 3 that start a team

The seats that won most often when the question was: *who follows one plan and still ships together?*

| Seat | Posture | What they demonstrated |
|---|---|---|
| 1 | **Navigator** | A plan others can follow. Fence, decide, explain. |
| 2 | **Builder** | They change the object and finish. |
| 3 | **Connector** | Help + handoff. The team exists because of them. |

Witness was fourth, not third. A founding three that only sees and builds, without a connector, does not lift as hard as a three that can hand work to each other.

They follow the Navigator with the clearest plan. They do not elect a title.

---

## The 2 that grow it to 5

When the question became: *what expands thought without breaking the plan?*

| Seat | Posture | What they add |
|---|---|---|
| 4 | **Witness** | Sees what is actually on the bench. Asks. Keeps the room honest. |
| 5 | **Reframer** | Renames the problem. Opens a path the first plan missed. |

Helper was close. Critic, solo, and drifter stay off the invite list unless a human overrules the tape.

---

## What draws people — and what makes a seat worth wanting

This is not a job board with a cooler funnel.

1. **They found a room they were not supposed to find.** Mystery first. No apply.
2. **The work taught them before anyone judged them.** Capability Reveal: need → tool. They become capable in public to themselves.
3. **Linger is unfinished business.** The bench is still there. That is the hook.
4. **Being chosen is rare and late.** 3–5 people. Human invite. After the tape. After they already know how the Foundry makes things.
5. **A seat is a team that lifts you, not a prize.** Navigator, builder, connector — then witness and reframer. You get people who make you better, and a plan you can follow.
6. **They already did the job-shaped work.** Selection is “you can do this with us,” not “convince us from a résumé.”

Forbidden public copy: personality type, score, grit, apply for Cohort 01, Nov 15, hiring, salary.

---

## What this pass built

- 12 staff postures mapped from thinking **moves**
- Team lift (internal)
- `compositionLock()` — the 3 + 2
- `recommendSeats(tapes)` — organizes candidates; **does not invite**
- 1000-sim test, seed locked

Never stored on a participant: score, trait, fit, rank, personality, grit, seriousness.

`cohortId` stays empty until a human invite. Phase 2 door still held.
