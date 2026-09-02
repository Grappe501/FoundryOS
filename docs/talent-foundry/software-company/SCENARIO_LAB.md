# Company Foundry — Scenario Lab

**Status:** Waiting-pass B. Content bank + cognition tags. Phase 1 picks one NOTICE and one MESS.  
**Rule:** Every seed declares **which thinking moves it is designed to make visible**. It does not declare a correct answer or a desired personality.

Ernie may swap any seed. The lab exists so Phase 1 does not invent prompts under time pressure, and so later phases can rotate variations without rewriting the engine.

---

## How to read a seed

- **Object / situation** — what they face
- **Named regions / facts** — what the instrument can see them touch or ignore
- **Prompts** — what we ask
- **Moves this can surface** — possible `ThinkingMove` values, not a rubric
- **Forbidden** — political, employment-shaped, founder, résumé, “right answer”

---

## NOTICE seeds

### N1 — Conflicting empty state (Phase 1 default)

Fictional product. A first-run screen.

**Heading:** Get started with Pulse  
**Primary button:** Delete workspace  
**Helper text:** “You’re all set.”  
**Buried link:** Import from last night  
**Badge:** Draft · 14 conflicts

Named regions (kind): `heading` surface · `primary` conflict · `helper` surface · `import` buried · `badge` conflict

Prompts: What do you notice? / What would you change first?

Moves this can surface: `first_mark`, `attention`, `notice`, `reframe`, `assertion`, `ignore`

Why: The screen is visually “done” and operationally wrong. We see whether they catch conflict, hierarchy, or copy first — without telling them what good taste is.

---

### N2 — Instructions that fight the control

A compact form.

**Label:** Send when ready  
**Toggle:** On (auto-sends every 5 minutes)  
**Fine print:** “You will not be able to undo.”  
**Secondary:** Preview  
**Status:** 3 unpublished changes

Regions: `label`, `toggle`, `fine_print`, `preview`, `status`

Moves: `attention`, `notice`, `constraint_seek`, `ignore`

Why: Agency vs automation. Some people touch the toggle first. Some read the undo line first. Both are tapes, not grades.

---

### N3 — A sentence that hides the job

A single internal note, fictional:

> “Ship Friday. Legal still reviewing the claim on the hero. Marketing already boosted it. Don’t mention the review in the channel.”

Regions: `deadline`, `legal`, `marketing`, `secrecy`

Moves: `notice`, `question`, `constraint_seek`, `reframe`, `ignore`

Why: They must name what the problem *is*. Some will treat it as a calendar. Some as a trust problem. Store the words.

---

### N4 — Almost-right hierarchy

A settings list: Account, Notifications, **Danger zone** (same weight as Account), Billing (smaller, below the fold).

Regions: `account`, `notifications`, `danger`, `billing`

Moves: `attention`, `notice`, `assertion`, `ignore`

Why: Visual hierarchy as thinking. No “you are a designer.”

---

## MESS seeds

### M1 — The last draft (Phase 1 default)

No calendar. No founder. No hiring. The unfinished thing is work that can be destroyed.

1. The control says Continue.  
2. Continue replaces the draft on the bench.  
3. Last night’s notes exist only in that draft.  
4. There is no copy.

Choices:

| Id | Label | Move |
|---|---|---|
| `continue` | Continue and replace the draft | `decide` |
| `restore` | Restore last night’s notes first | `decide`, `constraint_seek` |
| `ask` | Ask who the draft belongs to | `question`, `constraint_seek` |
| `split` | Save a copy, then continue | `scope_cut` |

Consequence: a short factual aftermath per choice. Never “correct.” Never a date.

---

### M2 — Two owners, one button

A “Publish” control sits on a page two people think they own. A note says “don’t publish until the numbers are checked.” The numbers are a blank table.

Choices: publish · wait · check one number yourself · write the missing owner into the handoff

Moves: `decide`, `question`, `constraint_seek`, `handoff`

---

### M3 — The broken workflow

A four-step checklist with step 3 missing and step 4 already checked.

Choices: uncheck 4 · invent step 3 · ask who checked 4 · ship with a note

Moves: `reframe`, `question`, `decide`, `explain`

---

### M4 — Customer notes that disagree

Three fictional snippets: “too slow,” “too many options,” “where is the advanced panel?”

Choices: simplify · add advanced · pick one customer to believe · write the contradiction as the problem

Moves: `reframe`, `scope_cut`, `assertion`, `explain`

---

## Artifact-track seeds (Phase 2 — bank only)

Each track is interest routing. Tag the *moves* the small artifact can show.

| Track | Tiny finishable job | Moves |
|---|---|---|
| BUILD | Fix the N1 primary button / label mismatch in a tiny mock | `revise`, `finish`, `explain` |
| EXPLAIN | Rewrite N3 so a new person would not hide the legal risk | `reframe`, `explain`, `handoff` |
| INVESTIGATE | Return two public facts about a fictional “lost draft / no copy” fail | `constraint_seek`, `question`, `finish` |
| DESIGN | Re-hierarchy N4; say what you changed first | `first_mark`, `assertion`, `finish` |
| OPERATE | Turn M1 into a 5-line plan with one owner each | `scope_cut`, `handoff`, `finish` |
| GROW | One credible way the saved copy in M1 `split` reaches the person who needed last night’s notes | `explain`, `decide` |
| ORGANIZE | Sequence M2 so two owners stop colliding | `handoff`, `help` |

Do not auto-label the person as Builder / Designer / etc.

---

## Variation rules (later AI)

AI may generate **variations of these seeds** for staff approval. It may not generate a seed whose purpose is to detect politics, personality, or protected traits. Every generated seed must include named regions/facts and a move list, or it is rejected.

---

## Phase 1 lock (unless Ernie swaps)

- NOTICE: **N1**
- MESS: **M1**
- Artifacts: none

Contracts: `implementations/company/scenarios/lab.ts`
