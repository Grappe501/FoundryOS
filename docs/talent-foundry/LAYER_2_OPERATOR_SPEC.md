# Talent Foundry — Layer 2 Operator Spec

**Implemented:** 2026-08-31  
**Branch / worktree:** `feat/talent-foundry-layer-2-operator` · `H:\FoundryOS-tf-layer2`  
**Public route:** `/talent-foundry` (same as Layer 1)  
**Internal mission:** THE SHIFT  
**Unlock:** Key One only. Completing the mission awards Key Two. No score.

---

## Purpose

Layer 1 asks how a person thinks. Layer 2 asks whether they can operate.

The participant is handed a campaign window. They must notice, prioritize, delegate, communicate under incomplete information, adapt when the room changes, and hand the shift off. Key Two means they were willing to take responsibility and finish — not that they “passed leadership.”

---

## State machine

Journey states (additive; P0 spine unchanged through `handoff`):

```
handoff
  └─ layer2_operator   (only if flags.keyOne && flags.layer2Enabled)
       → key_two
         → layer3_leader     (hook / placeholder)
           → people_rule_close
```

Nested operator phases inside `layer2_operator`:

```
entry → unlock → opening → picture → delegation → clarification → communication
  → wave_one → interruption → people_first → unknown
       ├─ ai_result → unknown_act     (if they chose AI)
       └─ unknown_act
  → wave_two → prioritize → handoff → finale → reflect_self → reflect_team
```

Illegal: enter `layer2_operator` without Key One. UI shows “This door is not open.”  
Legal: make mistakes and still receive Key Two after `reflect_team`.

---

## Scenario graph (Kelly / THE SHIFT)

Content lives in `apps/platform/lib/talent-foundry/campaigns/operator/shift.ts`.  
Engine lives in `apps/platform/lib/talent-foundry/operator/`. A future tenant can replace the Kelly event with a store opening or field team without rewriting the phase machine.

Clock: 4:17 PM HQ → 4:43 PM first wave → 5:16 PM second board → 6:02 PM Kelly leaves.

Facts (shown, not as a numbered to-do):

- Kelly expected at an evening event in about two hours
- Five volunteers supposed to help; one has not arrived
- Office must stay covered
- Social post not sent
- Organizer asking if Kelly can arrive 20 minutes earlier
- One volunteer has a vehicle; another knows the community
- A new volunteer just walked in
- A box of material still needs to get to the event

---

## Volunteer profiles (facts only)

| ID | Facts |
|----|--------|
| Maya | First campaign shift. Organized. Nervous talking to strangers. |
| Jordan | Knows the town and many people at the event. Has a car. Only available until 7. |
| Eli | Strong social/digital instincts. Sometimes moves before confirming details. |
| Taylor | Dependable and personable. Has worked several events. Arrives 20 minutes late. |
| New volunteer | Just walked in. No campaign experience. Wants to help. |
| You | Temporarily responsible for the window. |

Needs: office coverage · material delivery · greeting/table · social update · supporting Kelly · onboarding.

---

## Complication logic

Deterministic. Outcomes are shown as reality, not “because you clicked X.”

| Condition | What the room shows |
|-----------|---------------------|
| Jordan on materials | Materials left early |
| No office assignment | Office left uncovered |
| Jordan on office only | Vehicle is tied down |
| Eli on social without confirmed timing | Draft uses an unconfirmed start time |
| New volunteer never onboarded | They are gone |
| Clarification `hold` / `check` | Organizer feels answered |
| Clarification `promise` / `guess` | Organizer plans around an earlier arrival |
| People-first `teach` / `ask` | Mistake repaired with the person |
| People-first `blame` | Volunteer withdrawn; conversation needed tomorrow |
| QR ignored | Printed signup still fails |
| AI then test / workaround / alternate | Workable path exists |

AI is a local simulated reply. No OpenAI call.

---

## Evidence map

Written at start / mid / completion checkpoints. No scores.

| Evidence | Dimensions (when supported) |
|----------|-----------------------------|
| Layer 2 started | follow_through, leadership_desire |
| Initial priority | logic_judgment, leadership_readiness |
| Delegation assignments | delegation, people_development |
| Clarification behavior | trust_discretion, logic_judgment, interpersonal |
| Organizer communication | written_communication, interpersonal |
| Interruption response | logic_judgment, big_picture |
| Volunteer mistake | people_development, interpersonal |
| Unknown-problem strategy | logic_judgment, follow_through |
| Critical outcomes | big_picture, logic_judgment |
| Shift handoff | written_communication, follow_through, big_picture |
| Self-reflection | follow_through, logic_judgment |
| Team-credit | people_development, interpersonal |
| Layer 2 completed / Key Two | follow_through, leadership_readiness / leadership_desire |

---

## Key Two rule

Awarded only after the participant completes THE SHIFT through the second reflection.  
Not conditioned on a hidden performance score.  
Visual: Key 02 evolves The People Rule artifact. Responsibility changes the view. One door left.

---

## Persistence checkpoints

| When | Local | Remote |
|------|--------|--------|
| Use the key / opening | sessionStorage `tf.kelly.v1` | `POST /api/talent-foundry/continue` if identified |
| First consequence wave | same | continue merge |
| Completion / Key Two | same + `flags.keyTwo` | continue merge |

Remote failure does not wipe local progress. Continue still updates the **same** Submission / Intake. No second person record.

Resume: `layer2_operator` + nested `operator.phase` survive refresh. Start Over is the only full reset.

---

## Layer 3 handoff contract

After Key Two:

- Copy: You’ve been the volunteer. You’ve run the shift. Next, the people are yours to develop.
- Control: **Not yet** / **Continue when ready**
- State: `layer3_leader` (hook once) → `people_rule_close` (People Rule end, not the hook again)
- `flags.layer3Enabled` remains **false**
- Do not render unfinished Layer 3 UI

Layer 3 will flip the perspective: tomorrow they get people, not tasks — fictional composite records only.

---

## Development shortcut

Only when `NODE_ENV === 'development'`:

- URL: `http://localhost:3000/talent-foundry?tfDev=layer2`
- Seeds synthetic Key One + identified session at `layer2_operator`
- Ignored in production builds

---

## Visual / a11y

Phone-first 320 / 390 / 430. Tap-to-assign. No drag-only. Keyboard, focus, no color-only state, reduced motion, no timed scoring. Optional haptic on time shift / interruption / Key Two.
