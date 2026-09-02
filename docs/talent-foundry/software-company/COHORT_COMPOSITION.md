# Company Foundry — Cohort Composition

**Status:** MODEL APPROVED. Automated person recommendation **held and removed** (Phase C0.1, 2026-09-02). Staff only. Not a door. Not a personality test.  
**Code:** `apps/platform/lib/talent-foundry/implementations/company/cohort/`

People **learn the work before anyone chooses who can do the job.** Completing the Foundry does not earn a seat. A human still invites. The software may describe **missing capability evidence**. It may not shortlist people.

```txt
Candidate tape → demonstrated moves → human-readable evidence → cohort needs → human composition decision
```

No candidate ranking. No automated seat assignment. No hidden best applicant.

---

## What the simulations taught (research)

1,000 working-posture mixes (noisy mixes of 12 demonstrated postures).  
1,000 pools of 18.  
Each pool: compose a 3, then add 2. Compare to a random 3 and a random 5.

`teamLift()` remains a **simulation / research utility**. It is not a production hiring score and is not written onto a person.

| | Composed | Random | Lift |
|---|---|---|---|
| 3 seats | 0.591 | 0.371 | **+0.220** |
| 5 seats | 0.613 | 0.419 | **+0.194** |

Almost nobody who drifted or worked only alone won a starter seat in the research search (drifter 1, solo 6 of 3,000 starter seats).

---

## The 3 that start a team

The seats that won most often when the question was: *who follows one plan and still ships together?*

| Seat | Posture | What they demonstrated |
|---|---|---|
| 1 | **Navigator** | A plan others can follow. Fence, decide, explain. |
| 2 | **Builder** | They change the object and finish. |
| 3 | **Connector** | Help + handoff. The team exists because of them. |

**The Connector is not an optional soft-skill seat. It is load-bearing.** A Navigator + Builder pair can produce output. The Connector is what begins converting individual productivity into an organization.

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

## What production may say

The system may say:

- Cohort 01 still needs demonstrated evidence of clean handoff/help.
- Current invited group strongly covers planning and shipping; collaboration evidence is thin.
- Adding someone whose tape contains notice/question behavior would broaden this group.

It must **not** say: invite Steve, Maya, and Carlos.

The human chooses the person.

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
- `teamLift()` — research / simulation only
- `compositionLock()` — the 3 + 2, Connector load-bearing, human invite still required
- `compositionGaps(invitedTapes)` — missing / thin / covered demonstrated moves. **No person IDs.**
- 1000-sim test, seed locked

Removed from production: `recommendSeats()`, candidate-ID shortlists, production ranking.

---

## Vacancy after a human decision (C0.2)

Searching for a cohort is not the same as bringing someone in.

After a human invite, staff may record which **demonstrated function** that person is expected to fill. That closes the vacancy. It does not write a type onto the person.

```txt
For Cohort 01, staff assigned this person to fulfill the Navigator function
based on demonstrated evidence.
```

Not: `Steve = Navigator`.

`assignFunction()` requires a human decision record. Navigator filled → open needs become Builder + Connector. `compositionGaps()` evaluates remaining openings only. All demonstrated evidence on the assignment is retained — a later tape may still show a second planning voice.

Witness / Reframer evidence seen while the founding three is still forming is retained as an **expansion observation**. Factual moves only. No score. No reserved seat. No ranked waitlist. Human review if the cohort expands to five.

When Navigator, Builder, and Connector are filled: **Founding composition complete.** The software still does not invite.

Never stored on a participant: score, trait, fit, rank, personality, grit, seriousness.

`cohortId` stays empty until a human invite. Phase 2 MAKE is open. Remember Me still held.
