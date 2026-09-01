# Talent Foundry — Layer 3 Leader Spec

**Implemented:** 2026-08-31  
**Branch / worktree:** `feat/talent-foundry-layer-3-leader` · `H:\FoundryOS-tf-layer3`  
**Base:** `aa443ceb01c8db60adbc19dc0522e4e0fdcf73f9` (live Layer 2)  
**Public route:** `/talent-foundry` (same as Layers 1–2)  
**Internal mission:** THE LEADER  
**Unlock:** Key Two only. Completing returns to the People Rule close. No score.

---

## Purpose

Layer 2 tested whether someone can run the room.  
Layer 3 tests whether they can **make other people better**.

The participant is handed a small fictional team. They must place, coach, correct, protect, and invest. The paid-seat climax is real as a judgment — the thing that matters is the reasoning and the development plan, not the name they pick.

---

## State machine

```
key_two
  └─ layer3_leader   (only if flags.keyTwo && flags.layer3Enabled)
       → people_rule_close
```

If `layer3Enabled` is false, `layer3_leader` still shows the old hook once, then `people_rule_close`. The hook never owns the close.

Nested leader phases inside `layer3_leader`:

```
opening → roster → place → coach → correct → protect → invest
  → paid_need → paid_who → leftover → mirror → self
```

Illegal: enter the live Layer 3 mission without Key Two. UI shows “This door is not open.”  
Legal: choose any person for the paid seat if the plan is written.

---

## Opening

- **The shift is over.**
- **Tomorrow, you're not getting tasks.**
- **You're getting people.**

---

## Composite team (fictional only)

Content lives in `apps/platform/lib/talent-foundry/campaigns/leader/people.ts`.  
These are **not** real applicants. One applicant never decides another applicant’s employment.

| ID | Pattern | Facts |
|----|---------|--------|
| Noelle | Quiet capability | Small-town living room. Recruits by text. Work arrives finished. Rarely announces it. |
| Cam | Enthusiasm plus overstep | First month. Posted an unconfirmed time. Apologized. Wants more. |
| Imani | Hunger plus a real calendar | Campus organizer. Hours collapse at exams. Asked about the paid internship twice. |
| Wes | Reliable and unadvertised | Remote nights. Graphics and call lists. Has not asked for a title. |

Seats: headquarters · small-town recruiting · campus · remote digital · hold.

---

## Climax

Funding exists for **one additional paid position**.

1. What work does the campaign need?
2. Who would you recommend — and how will you develop them?
3. What do the people you did not choose hear?

A thin “why” does not advance. The name is not the test.

---

## Mirror and close

- Those people were built from patterns we see in people like you.
- One last person needs your attention. You.
- If you were coaching yourself, what would you tell yourself you still need to work on?
- Then the existing People Rule close. No AI score. No loop back into Layer 3.

---

## Evidence map

No scores. Staff tags only.

| Evidence | Dimensions |
|----------|------------|
| Layer 3 started | people_development, leadership_desire |
| People placements | delegation, people_development, logic_judgment |
| First coaching decision | people_development, interpersonal |
| Correction of overstep | people_development, trust_discretion, interpersonal |
| Protection without shrinking | people_development, logic_judgment |
| Development investment | people_development, follow_through, big_picture |
| Paid-role work needed | big_picture, logic_judgment |
| Paid-role recommendation | people_development, leadership_readiness, written_communication |
| Plan for people not chosen | people_development, interpersonal, written_communication |
| Self-coaching | follow_through, logic_judgment, leadership_desire |
| Layer 3 completed | follow_through, people_development |

---

## Persistence

| When | Local | Remote |
|------|--------|--------|
| Opening / roster | sessionStorage `tf.kelly.v1` | continue if identified |
| Correct / invest / paid need | same | continue merge |
| Self-coach / close | same | continue merge |

Remote failure does not wipe local progress. Same Submission / Intake. No second person. No RedDirt schema change.

Resume: `layer3_leader` + nested `leader.phase` survive refresh.

---

## Development shortcut

Only when `NODE_ENV === 'development'`:

- URL: `http://localhost:3012/talent-foundry?tfDev=layer3`
- Seeds synthetic Key Two + identified session at `layer3_leader`
- Ignored in production builds

---

## Isolation

- Do not redesign Layer 2.
- Do not modify Share or the live QR.
- Do not modify RedDirt.
- Do not merge until Ernie reviews.
