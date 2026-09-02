# Company Foundry — Phase 1.1 Experience Proof

**Status:** **HOLD** (Ernie 2026-09-02). Direction is right. Stills cannot prove linger pull. Next is Phase 1.2 polish only. Phase 2 held.

Phase 1 proved the room can run. It did **not** prove the experience has gravity.

---

## What we are testing

Walk `/workshop` as a stranger. Five questions only:

| # | Test | Fail if |
|---|---|---|
| 1 | Opening creates **curiosity without confusion** | They ask “is this a job application?” or bounce from opacity |
| 2 | ENTER feels like **crossing a threshold**, not clicking a CTA | It reads as Get Started / Continue / Apply |
| 3 | Pulse makes them **instinctively interact** | They wait for instructions before touching the object |
| 4 | “THIS IS TALENT FOUNDRY” feels **earned**, not promotional | It lands like a logo drop or a brand slide |
| 5 | Linger creates **unfinished business** | They think “okay, application complete” |

**The metric that matters most is 5.**

When they reach:

```txt
You can go.

The bench will still be here.
```

The reaction we want: **“Wait—what happens if I don't go?”**

---

## Locked principle — the room remembers

> **The room should remember more than the participant realizes.**

Not surveillance. Not scoring. Not hidden personality inference.

**Environmental continuity.** Something they moved remains moved. Something they deleted remains absent. A decision leaves a subtle trace. The workshop should feel like a *place*, not a sequence of React screens.

When identity and SAVE MY PLACE arrive later, this gets stronger. Phase 1.1 plants the habit now, from local session facts only (attended regions, mess choice). No new inference fields.

Forbidden traces: timers on screen, “you noticed 3 of 5,” fit/score/grit, face, keylog, clipboard.

---

## In scope

- Pacing, typography, motion, silence
- Interaction weight (ENTER, Pulse, choices, linger)
- Mobile behavior and transitions
- Persistent objects on the bench (Pulse + last draft remain in the room)
- Anything that makes `/workshop` feel like a conventional website

## Out of scope

- MAKE, method turn, Capability Reveal missions
- Remember Me, SAVE MY PLACE, share, GitHub, Cursor, Oscar
- New journey states or changed `enterWorkshop` / `submitNotice` / `submitMess` / `revealName` / `linger` signatures
- Campaign `/talent-foundry`
- Production migrations

---

## What this pass changed (UI only)

- Opening lines sit longer. ENTER is a threshold mark + faint word, not a CTA. Keyboard Enter also crosses.
- Pulse is already in the room before any prompt. Prompts wait for a touch, or five seconds.
- Pulse and the last draft **do not unmount**. They recede to ghosts. Attended regions stay marked. A mess choice leaves a visible trace (gone / restored / question / copy).
- Named lines arrive one at a time. Continue is a mark, not a button label.
- Linger paces: “You can go.” then silence, then the bench line. Start over appears late and faint. Ghost objects stay on the bench.
- Mobile: stacked ghosts, safe-area, tap without hover-only affordances.

No journey signatures changed. No MAKE. No identity.

---

## After this pass

Ernie reviews **visually**. Only then Phase 2: first persistent artifact, observed → equipped, Capability Reveal Engine starts.
