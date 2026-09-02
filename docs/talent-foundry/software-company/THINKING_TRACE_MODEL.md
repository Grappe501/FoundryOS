# Company Foundry — Thinking Trace Model

**Status:** Waiting-pass A. Design + contracts. Not a score. Not a personality test.  
**Purpose:** The workshop should tell us **how someone thinks** when the work is unfinished.

Campaign asks: *Will you show up?*  
Company asks: *What can you build, improve, lead, and multiply?*  
This layer asks: ***How did they think their way through the unfinished thing?***

That is the exponential product difference. A résumé is a story. An artifact is an output. A **thinking trace** is the flight recorder of the work.

---

## Doctrine

We record **moves**, not types.

A move is something a human can point at on a timeline:

- they looked here first
- they asked a question before deciding
- they cut scope
- they ignored this fact
- they changed this after feedback
- they handed the next person a clear state

We never turn those moves into:

- a personality (INTJ, “gritty,” “visionary”)
- an ideology
- a protected trait
- a mental-health inference
- a hidden employability number
- a ranked “best thinker” list

Staff **watch the tape**. They decide. AI may only **organize the tape** and cite events.

The participant may eventually **see their own tape**. Transparency is the ethical opposite of opaque psychometric hiring. Design the schema so that reveal is possible. Do not ship a secret second ledger.

---

## What “how they think” means here

Not: *What kind of person are they?*  
Yes: *When faced with this unfinished work, what did they actually do, in what order, and what did they leave behind?*

| We want to see | Example fact |
|---|---|
| What captured them first | First region they marked, or first sentence they wrote |
| What they treated as the problem | The change they named |
| Whether they sought missing information | They chose “ask” / they wrote a question |
| Whether they reduced the problem | They cut one promise and shipped the rest |
| What they ignored | Named region or fact never addressed |
| How they explained | The words they used — stored raw |
| Whether they finished | Submitted vs left mid-draft |
| Whether they improved | Revision after a note |
| Whether they created leverage | They made the next person faster (handoff, multiply) |
| How long they sat with the door | `door.lingerMs` + `doorPacing` (line1 → line2 → line3 → ENTER) |
| Hesitation before acting | `hesitationMs` (beat open → first input) |
| Whether they likely read or skimmed | Coverage facts: buried/conflict visited, mentioned cues, linger — **not** a `skimmed` flag |
| How they treated the aftermath | `afterSubmitLingerMs` on NOTICE ack and MESS consequence |

Same person, different day, different work → different tape. That is expected. We do not stabilize a “thinker profile.”

---

## The trace object

One session (later: one person) has an append-only `thinking_trace`.

```ts
type ThinkingMove =
  | 'first_mark'          // first meaningful action in a beat
  | 'attention'           // they focused a named region
  | 'notice'              // they said what they saw
  | 'reframe'             // they renamed the problem
  | 'question'            // they asked before asserting
  | 'assertion'           // they stated a change or decision
  | 'constraint_seek'     // they looked for limits / missing info
  | 'scope_cut'           // they reduced the problem
  | 'ignore'              // a named fact/region was never touched
  | 'decide'              // they committed to one path
  | 'explain'             // they wrote why
  | 'revise'              // they changed prior work
  | 'finish'              // they submitted this beat
  | 'abandon'             // they left this beat unfinished
  | 'return'              // they came back later
  | 'handoff'             // they prepared the next person
  | 'help'                // they improved someone else's work
  | 'pause';              // explicit dwell before first input (optional fact)
```

Each event:

```ts
type ThinkingEvent = {
  id: string;
  at: string;                 // ISO
  beatId: string;             // notice | mess | artifact | …
  move: ThinkingMove;
  fact: unknown;              // raw, citeable
  regionId?: string;          // named part of the object, if any
  durationMs?: number;        // only when the client sent it; never scored
};
```

**No `score`, `trait`, `fit`, `rank`, `personality`, `seriousness`, `skimmed`, `engagement`, or `grit` field.**  
If a future engineer adds one, tests must fail. Duration is a fact. “They are not serious” is a human sentence, never a stored type.

`ignore` is derived at beat-close: regions or facts offered minus regions/facts addressed. Store the list. Do not store “they are careless.”

---

## Clocks (planted from the first second)

Silent. Never shown as a timer. Never converted to a seriousness score.

| Clock | Measures | What a human can read |
|---|---|---|
| `doorPacing` | When line 1 / 2 / 3 appeared, when they hit ENTER | Did they sit with the mystery or tap through? |
| `door.lingerMs` | Session start → ENTER | How long the door held them |
| `notice.hesitationMs` | NOTICE open → first tap or keystroke | Pause before they marked the object |
| `notice.lingerMs` | NOTICE open → submit | How long they stayed with the flawed screen |
| `regionDwells` | Named region visits + dwellMs from the UI | What they actually looked at |
| Coverage | offered / visited / ignored, buried, conflict, cue mentions in their words | Read vs skim as **facts**, not a label |
| `notice.afterSubmitLingerMs` | Submit → they leave the acknowledgment | Did they sit with being heard? |
| `mess.hesitationMs` / `lingerMs` | Mess open → first choice / submit | Pause before committing |
| `mess.afterSubmitLingerMs` | Aftermath on screen → they continue | Did they read the consequence? |

Phase 1 UI **must** call: `revealDoorLine` for each opening line, `markNoticeRegion` (with dwellMs when the pointer/focus was on a region), `noteTyping` on first keystroke, existing submit helpers. If the UI never reports dwell, visits still exist; dwellMs may be 0. That is still a fact.

## Instrumentation that is allowed

The workshop is an instrument. It may record:

- explicit taps / focus on **named regions** we designed, plus optional dwell on those regions
- submitted text and subsequent edits they save
- word/char counts of what they submitted (length is a fact)
- whether their words mention planted cues (“delete”, “import”, “conflicts”)
- the choice they confirm
- beat clocks above
- return after a gap (session resume)

## Instrumentation that is forbidden

This is not surveillance software.

- no keylogger
- no clipboard capture
- no microphone unless they press talk
- no face / gaze / emotion AI
- no hidden second score
- no `seriousness` / `skimmed` / `engagement` field
- no tracking of other tabs or apps
- no inferred “engagement score” from scroll jitter
- no penalty for being slow
- no public “we are timing you”

If it would be creepy explained out loud, do not record it. If we would be ashamed to show them the duration later on their own tape, do not store it.

---

## How a human reads a tape (90 seconds)

Staff protocol for Phase 6. Design now so Phase 1 events are readable later.

1. **Open the beat.** What was the unfinished thing?
2. **Door clock.** Did they sit through the three lines?
3. **First mark.** What did they treat as the door in?
4. **Coverage.** Buried and conflict regions — visited or ignored? Did their words mention what they saw?
5. **Hesitation / linger.** Facts in milliseconds. Slow is not bad. Instant + no regions + one shrug line is a tape, not a reject.
6. **Words.** Read the notice / explain text raw. Do not skim a summary first.
7. **Decision.** What did they commit to? Ask, restore, replace, or copy?
8. **Aftermath linger.** Did they read the consequence?
9. **Revision / handoff** when those exist.
10. **Write a human note** if you believe they are serious — that sentence is yours. Never a rank.

**“How serious are they?”** is answered by a human looking at this whole tape (and later: return, artifact, remember). Software does not answer it.

AI, if used, may produce a **cited timeline** (“they asked a question, then cut scope — events 3, 5”). It may not produce “strong product sense / 8.2.”

---

## How this changes NOTICE and THE MESS

Campaign “what would you change?” captured a paragraph. That is a `notice` + `assertion`.

Company NOTICE should be an **instrumented object**:

- named regions (heading, primary action, buried control, conflicting label)
- we record which region they marked, in order
- then their words
- at close we record `ignore` for untouched regions

THE MESS choices should be **different thinking moves**, not a fake right answer:

| Choice (M1 — The last draft) | Move |
|---|---|
| Continue and replace the draft | `decide` |
| Restore last night’s notes first | `decide` + `constraint_seek` |
| Ask who the draft belongs to | `question` + `constraint_seek` |
| Save a copy, then continue | `scope_cut` |

No calendar. No “ship Tuesday.” The unfinished thing is work that can be destroyed.

The consequence still does not say correct/incorrect. The tape just shows which move they made.

---

## Relation to the evidence ledger

Thinking events **are** evidence. They are a stricter subtype.

| Ledger type | Thinking move |
|---|---|
| `response` | `notice`, `reframe`, `explain` |
| `decision` | `decide`, `question`, `scope_cut` |
| `consequence` | (system; not a person move) |
| `artifact` / `revision` | `finish`, `revise` |
| `handoff` | `handoff` |
| `collaboration_contribution` | `help` |

Do not keep two contradictory stores. The ledger holds everything a staff view might list. The thinking trace is the **ordered move view** of the same facts, plus attention / ignore / pause.

---

## Futuristic surfaces this unlocks (build later)

See `FUTURE_SURFACES.md`. The trace is the reason those surfaces can exist without becoming HireVue.

- **Transparent tape** — they see what we see
- **Living room** — the workshop changes because of *facts on the tape*, not a score
- **Staff strip** — 90-second flight recorder
- **Interview from the tape** — questions cited to events
- **Cohort chemistry** — humans compare tapes of how people worked *together*, still no type pairing

---

## Tests that must stay green

- `thinkingEvent` rejects `score` / `trait` / `fit` / `seriousness` / `skimmed`
- `ignore` is a list of offered-minus-addressed ids, not a judgment
- Campaign Kelly session types are not imported
- Phase 1 journey can close NOTICE and MESS with a valid trace

Contracts live in:

`apps/platform/lib/talent-foundry/implementations/company/`
