# Company Foundry — Master Spine and Layers

**Status:** Waiting-pass D + Phase 0.5. Full 14-stage spine exists as a kernel. Phase 1 UI is **Ernie’s isolation zone** and is **held** until 0.5 review. Academy missions attach to stages 4–12; they do not add a 15th stage.  
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
4 make       LIVE  spine   anonymous  (contract only — no UI)
5 remember   LIVE  spine   optional identity (contract only — no UI)
6 return     LIVE  spine   optional (contract only — no UI)
7 collaborate LIVE spine   remembered (contract only — fictional partner, no UI)
8 respond    LIVE spine   remembered (contract only — fictional note, no UI)
9 deliver    LIVE spine   remembered (contract only — definition of done, no UI)
10 multiply  LIVE spine   remembered (contract only — fictional newer person, no UI)
11 lead      LIVE spine   remembered (contract only — constraint + people, no UI)
12 build     LIVE  spine   human gate (contract only — sandbox product, no UI)
13 earn      STUB  spine   human gate
14 own       STUB  spine   human gate
```

After linger, the participant is **done with Ernie’s first visit**. `make` is **open** in the envelope (eligible). `openMake` / `tryAdvanceSpine` may enter MAKE **without changing** `stateId` (`linger` stays linger). That is the contract fill. There is still no `/workshop` MAKE screen.

`chooseMakeTrack` + `submitMake` record interest routing and a small artifact. They do not type the person as Builder/Designer.

`remember` is live as a contract after MAKE is finished. `openRemember` / Remember Me / Keep Exploring do not change Ernie `stateId`. Keep Exploring leaves the artifact and keeps REMEMBER open. Remember Me stores name + email (+ optional location / school-or-work), sets `placeEligible`, and never takes a résumé or phone.

`return` is live after Remember Me **or** Keep Exploring. `openReturn` records the gap since last activity and opens a deeper challenge on their MAKE track. `stateId` stays `linger`.

`collaborate` is live only after RETURN is finished **and** Remember Me (not Keep Exploring). The other person is a **fictional** bench partner (Rafi). Not a cohort. Not a real applicant. They write what they send and what they need back.

`respond` is live after COLLABORATE is finished. A fictional note comes back on their track. They incorporate, hold, or ask. We record the stance — not whether they agreed, not a growth score. `stateId` stays `linger`.

`deliver` is live after RESPOND is finished. They see a definition of done on their track and call it finished or leave it. Both outcomes close the beat. Not a grade.

`multiply` is live after DELIVER is finished. A fictional newer person (Nia) is stuck where they already were. They write what they give and what would let that person continue without them. Not a cohort. Not a mentor badge. `cohortId` stays empty. `stateId` stays `linger`.

`lead` is live after MULTIPLY is finished. The outcome is theirs; the hour is not. Fictional Rafi and Nia. They keep, assign, and cut. Not a title. Not a leadership appointment. `gates` stay empty.

`build` is live after LEAD is finished **and** a human records `real_work_access`. A sandbox surface of a real-shaped Foundry product. They write what they changed and what they left untouched. Not a job. Not live FoundryOS. Not the campaign. Completing BUILD does not open EARN. EARN / OWN remain stubs behind human gates. `stateId` stays `linger`.

Phase 0.5: academy missions (method, setup, clone, broken build, inspect data) **attach to stages 4–12** as work objects. They do not add a 15th stage and they do not start in Ernie’s door. A real cohort is not Rafi or Nia — it starts when they meet another participant. See `PHASE_0_5_TALENT_TO_OWNERSHIP.md`.

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
