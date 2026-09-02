# Company Foundry — Phase 1 Build Spec

**Status:** Spec only. Do not implement in the Phase 0 PR.  
**Goal:** A stranger can walk into a dark workshop, do two meaningful things, learn the name Talent Foundry, and leave fascinated — still anonymous.

Optimize for: **the right person becomes fascinated with the workshop.**  
Do not optimize for: application completion, identity capture, or share conversion.

---

## In scope

1. Public route **`/workshop`** (add `/workshop` to `CONSUMER_PREFIXES`).
2. Optional identical mount **`/talent-foundry/build`** if Ernie wants a namespaced staff URL. Must **not** load `TalentFoundryExperience` (Kelly).
3. New session key `workshop.v1`. Separate types. No Kelly `JourneyStateId` reuse.
4. Opening: YOU FOUND THE WORKSHOP → pause → most people tell us… → we’d rather see it → ENTER.
5. NOTICE: one flawed object + “What do you notice?” + “What would you change first?” + non-judging acknowledgment.
6. THE MESS: one imperfect situation, one decision, one consequence. No correctness reveal.
7. First revelation: THIS IS TALENT FOUNDRY / We don’t start with résumés / We start with the work.
8. A quiet way to leave. No “Apply now.” No Remember Me yet (Phase 2).
9. Local persistence across refresh. Start Over exists but is not the hero.
10. Tests for state transitions and “campaign session is untouched.”
11. Docs update: mark Phase 1 implemented when it ships.

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
- Employer productization

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

## THE MESS — recommended situation (Ernie may swap)

Proposal: **contradictory launch notes** for a tiny fictional tool (three bullets that cannot all be true). One decision:

- Ship the date
- Slip the date
- Ask one question before deciding
- Cut one promise and ship the rest

Consequence: show what happened next in the room (a message, a broken link, a relieved teammate, a silent channel). Deterministic from the choice. **Do not** say correct/incorrect.

Store `decision` + `consequence` locally.

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

## Files Phase 1 should add (not in Phase 0)

```txt
apps/platform/app/workshop/page.tsx
apps/platform/app/workshop/layout.tsx
apps/platform/lib/talent-foundry/implementations/company/  (journey, session, evidence, copy)
apps/platform/components/talent-foundry/workshop/
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
| E4 | MESS situation | Contradictory launch notes, one decision, silent correctness |
| E5 | Linger copy | “You can go. The bench will still be here.” |
| E6 | Phase 1 share | **Omit** share in Phase 1 (mystery first; share in Phase 2 after artifact) |
| E7 | `/talent-foundry/build` | Redirect, don’t dual-render, unless staff need a Foundry-prefixed URL on preview |

None of these block merging **Phase 0 docs**. They block starting Phase 1 code.
