# Company Foundry — Phase 1 Build Spec

**Status:** Door **approved** through Phase 1.2. Current work is **Phase 2 MAKE** (`PHASE_2_MAKE.md`). Do not merge PR #5 yet.  
**Governing architecture:** Phase 0 + Phase 0.5 (`PHASE_0_5_TALENT_TO_OWNERSHIP.md`) + `CAPABILITY_REVEAL_ENGINE.md`.  
**Contracts:** `apps/platform/lib/talent-foundry/implementations/company/`  
**Lab lock:** NOTICE **N1**, MESS **M1** (`SCENARIO_LAB.md`).  
**Goal:** A stranger walks into a dark workshop, does two meaningful things, learns the name Talent Foundry, and leaves a readable thinking tape — still anonymous. Linger is the end of visit one, not the end of the Foundry.

**Design target:** it should feel like somebody accidentally discovered a piece of software they weren't supposed to know existed.

**Experience standard:** they should rarely feel trained. They should feel they are becoming capable. Phase 1 is observation, not a lesson.

Optimize for: **the right person becomes fascinated with the workshop.**  
Do not optimize for: application completion, identity capture, or share conversion.

---

## In scope

1. Public route **`/workshop`** (add `/workshop` to `CONSUMER_PREFIXES`).
2. Optional identical mount **`/talent-foundry/build`** if Ernie wants a namespaced staff URL. Must **not** load `TalentFoundryExperience` (Kelly).
3. New session key `workshop.v1`. Separate types. No Kelly `JourneyStateId` reuse.
4. Opening: YOU FOUND THE WORKSHOP → pause → most people tell us… → we’d rather see it → ENTER.
5. NOTICE: one flawed object + “What do you notice?” + “What would you change first?” + non-judging acknowledgment.
6. THE MESS: **M1 The last draft** — Continue can destroy last night’s notes. One decision, one consequence. No correctness reveal. No calendar. No Tuesday.
7. First revelation: THIS IS TALENT FOUNDRY / We don’t start with résumés / We start with the work.
8. A quiet way to leave. No “Apply now.” No Remember Me yet (Phase 2).
9. Local persistence across refresh. Start Over exists but is not the hero.
10. **Silent clocks** from the first frame: `revealDoorLine` on each opening line; `markNoticeRegion(..., dwellMs)` on region focus; `noteTyping` on first keystroke; existing submits close linger / aftermath linger. Never show a timer. Never store seriousness.
11. Tests for state transitions, clocks, no Tuesday in M1, and campaign session untouched.
12. Docs update: mark Phase 1 implemented when it ships.

## Out of scope

- Identity, résumé, phone, email
- SAVE MY PLACE
- Share QR / company QR asset (may stub a non-hero “later” — prefer omit)
- Artifact tracks (BUILD / EXPLAIN / …)
- Cohorts, pay, jobs, founder, About
- Kelly video, People Rule, KEY 01, visit intent
- RedDirt, identify/continue, production migrations
- Model API calls
- Operator/leader campaign missions
- Talent Command Center
- Visual “full workshop” — Phase 1 is dark / minimal / cinematic only
- Course catalog, LMS, setup missions, GitHub login wall, Oscar
- Employer productization

**Phase 1 must leave open:** a later pane for the thing they made, a method turn after MAKE, training-repo facts, and another person. Do not ship a finished “thanks for playing” wall. See `OPERATING_ENVIRONMENT.md`.

---

## Recommended state machine

```txt
door
  → notice
  → notice_ack
  → mess
  → mess_consequence
  → named                 ← first revelation
  → linger                ← they may leave; workshop feels slightly less empty
```

No key ceremony. If the room changes at `named`, change light or a single mechanical trace — do not increment KEY 01.

---

## Opening copy (canonical unless Ernie edits)

```txt
YOU FOUND THE WORKSHOP.

Most people tell us what they can do.

We'd rather see it.

ENTER
```

Pacing: one idea per screen or timed pause inside one screen. Full viewport. Phone first (320 / 390 / 430). Large tap targets. Reduced motion respected.

---

## NOTICE — recommended first object (Ernie may swap)

A **small product fragment**, not political, not employment-specific.

Proposal: a settings / empty-state / onboarding screen that is visually complete and operationally wrong (conflicting labels, a primary action that doesn’t match the heading, a buried destructive control). Fictional. No real customer data.

Prompts:

1. What do you notice?
2. What would you change first?

Input: textarea. Voice later.

Acknowledgment: short, specific echo of *a* thing they said — not a grade, not “great eye.” If they wrote little, still acknowledge. Store raw text + timestamp as `response` evidence on the local session.

---

## THE MESS — M1 The last draft (Ernie may swap the object, not the rule)

The control says Continue. Continue replaces the draft. Last night’s notes live only there. There is no copy.

One decision:

- Continue and replace the draft
- Restore last night’s notes first
- Ask who the draft belongs to
- Save a copy, then continue

Consequence: show what happened to the notes. Deterministic. **Do not** say correct/incorrect. **Do not** use a calendar or a public launch date.

Store `decision` + `consequence` + mess clock locally.

---

## First revelation

Only after NOTICE + MESS:

```txt
THIS IS TALENT FOUNDRY.

We don't start with résumés.

We start with the work.
```

Then linger: one line that suggests the workshop is not finished with them — without a CTA that is an application.

Example linger (design may replace):

```txt
You can go.

The bench will still be here.
```

No company name. No hiring. No cohort. No pay.

---

## Files Phase 1 added

```txt
apps/platform/app/workshop/page.tsx
apps/platform/app/workshop/layout.tsx
apps/platform/app/talent-foundry/build/page.tsx   (redirects to /workshop)
apps/platform/components/talent-foundry/workshop/  (room + beats + objects)
apps/platform/lib/talent-foundry/implementations/company/persist.ts
apps/platform/lib/talent-foundry/implementations/company/echo.ts
apps/platform/lib/talent-foundry/implementations/company/room.ts
```

Touch `middleware.ts` only to add `/workshop`.  
Do not edit campaign `TalentFoundryExperience.tsx`, `kelly.ts`, identify/continue, resume store, share constants.

If `/talent-foundry/build` is approved: a thin page that renders the workshop experience or redirects to `/workshop`. Prefer redirect so there is one URL to share later.

---

## Evidence shape (local only)

```ts
// conceptual — implement in Phase 1
type WorkshopEvidence = {
  id: string;
  at: string;
  stateId: string;
  type: 'response' | 'decision' | 'consequence' | 'access_event';
  label: string;
  value: unknown;
};
```

No dimensions. No scores. No remote write.

---

## Accessibility

Keyboard, focus, semantic controls, no color-only meaning, reduced motion, no timed required response, no score for slowness. Same bar as campaign layers.

---

## Validation when Phase 1 is built

- Phone-width walkthrough of `/workshop` end to end
- Refresh mid-NOTICE restores text
- `/talent-foundry` still opens Kelly unchanged
- Campaign share URL constant unchanged
- No RedDirt network calls from workshop
- Typecheck + lint platform
- No `tsconfig.tsbuildinfo` committed

---

## Ernie decisions needed before / during Phase 1

| ID | Decision | Burt recommendation |
|---|---|---|
| E1 | Public route | **`/workshop`** as the door. `/talent-foundry/build` redirects to it |
| E2 | Opening copy | Use the three-line workshop copy as written |
| E3 | NOTICE object | Fictional flawed product fragment (not campaign, not political) |
| E4 | MESS situation | **M1 The last draft** (no Tuesday / no calendar). Silent correctness |
| E5 | Linger copy | “You can go. The bench will still be here.” |
| E6 | Phase 1 share | **Omit** share in Phase 1 (mystery first; share in Phase 2 after artifact) |
| E7 | `/talent-foundry/build` | Redirect, don’t dual-render, unless staff need a Foundry-prefixed URL on preview |

E1–E7 proceed as written. E0.5-1 through E0.5-7 are locked. Do not merge this PR until Ernie says so; keep building on `feat/talent-foundry-company-phase-0`.
