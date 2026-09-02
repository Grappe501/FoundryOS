# Company Foundry — Master Spine and Layers

**Status:** Waiting-pass D. Full 14-stage spine exists as a kernel. Phase 1 UI is **Ernie’s isolation zone**.  
**Code:** `apps/platform/lib/talent-foundry/implementations/company/spine/`

This is how we move while Ernie builds the door: we do **not** fill his screens. We lay the highway and one uniform layer over every exit.

---

## Isolation — what Ernie owns right now

Do **not** change these while his Phase 1 script is in flight:

| Frozen | Why |
|---|---|
| `/workshop` UI (does not exist yet — do not start it here) | He is writing the front door |
| `WorkshopStateId` door → linger | His state machine |
| `nextWorkshopState` map | Tests freeze this |
| N1 / M1 copy and choices | His first objects |
| Opening three lines + ENTER | His mystery |
| `enterWorkshop`, `submitNotice`, `submitMess`, `revealName`, `linger` signatures | His implementation surface |

If a change is required for the spine, **add fields**. Do not rename or reorder Ernie-zone states.

---

## The spine (all 14, now)

```txt
1 discover   LIVE  Ernie   anonymous
2 notice     LIVE  Ernie   anonymous
3 solve      LIVE  Ernie   anonymous
4 make       STUB  spine   anonymous
5 remember   STUB  spine   optional identity
6 return     STUB  spine   optional
7 collaborate STUB spine   remembered
8 respond    STUB  spine   remembered
9 deliver    STUB  spine   remembered
10 multiply  STUB  spine   remembered
11 lead      STUB  spine   remembered
12 build     STUB  spine   human gate
13 earn      STUB  spine   human gate
14 own       STUB  spine   human gate
```

After linger, the participant is **done with Ernie’s first visit**. `tryAdvanceSpine` refuses `make` with `reason: 'stub'`. It does not invent a screen. Stages 12–14 refuse with `reason: 'human_gate'` even after they are filled, until a human gate record exists.

---

## The layer that lifts everything equally

**Uniform Beat Layer** — already on every stage, including stubs:

- beat clock (open / hesitation / linger / aftermath)
- thinking events
- evidence items
- coverage / ignore when the beat has named regions
- envelope: `spineStage`, `progress`, `remember`, `artifactTrack`, `gates`, `cohortId`

Filling a later stage means **implementing the beat body** (what they see and submit). It does not mean a new session type, a new person store, or a new clock system.

Other envelopes sit on the same spine (types now, UI later):

| Envelope field | Layer | When it fills |
|---|---|---|
| clocks + thinking | Uniform beat | Phase 1 live; later stages when built |
| `remember` | Identity | Phase 2 |
| `artifactTrack` | Work | Phase 2 |
| `gates` | Human decision | Phase 4–7 |
| `cohortId` | Cohort 01 | Phase 4 (staff invite) |

Each layer lands on **all stages at once** as a field on the session. A stub stage can receive a clock the day we open it, without rewriting Discover.

---

## How to fill the next stub (when Ernie is done with the door)

1. Leave Ernie-zone states alone.
2. Set that stage’s `fill` from `stub` → `live` in `spine/stages.ts`.
3. Implement beat body in a new module (`spine/make.ts`, etc.).
4. Call `tryEnterStage` — it will start allowing entry.
5. Wire clocks + thinking through the existing helpers.
6. Add tests. Do not add a Tuesday. Do not mention Nov 15 on the public beat.

---

## What this pass does *not* do

- No `/workshop` page
- No Remember Me UI
- No SAVE MY PLACE table
- No cohort invite emails
- No auto-advance into MAKE after linger
- No change to Kelly
