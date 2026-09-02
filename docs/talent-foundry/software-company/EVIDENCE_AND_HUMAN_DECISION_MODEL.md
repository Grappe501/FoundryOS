# Company Foundry — Evidence and Human Decision Model

**Status:** Phase 0. The system organizes evidence. It does not judge people.

---

## Product principle

**Don’t ask people what they are. Give them something worth doing and watch what they do.**

A résumé tells us what someone says they have done.  
Talent Foundry should produce evidence of:

- what they notice
- what they investigate
- what they create
- how they communicate
- whether they finish
- how they respond to feedback
- how they collaborate
- whether they improve the work
- whether they help other people become better
- whether they create leverage
- whether they can turn ambiguity into progress

**Observable evidence only.**

---

## Forbidden transformations

The ledger must **not** become:

- a personality diagnosis
- an ideology inference
- a protected-trait inference
- a hidden psychological hiring score
- an autonomous hire / reject
- an opaque AI candidate ranking
- a “fit” percentage
- a trust_score reused from ownership-graph
- a referral score
- an enumerable key count treated as merit

Campaign `EvidenceDimension` labels (`leadership_readiness`, `passion`, …) are **optional staff-facing tags on a fact**. Company Foundry should prefer **event types + raw artifacts** over dimension enums in Phase 1–3. If dimensions return, they remain human-applied or purely mechanical (e.g. “this item is a written message”), never inferred traits.

---

## Evidence ledger — factual event types

Every participant (anonymous session, then `foundry_person`) accumulates an append-only ledger.

| Type | Example fact stored |
|---|---|
| `response` | Notice text; “what would you change” |
| `decision` | Choice id + label + optional reasoning + situation snapshot |
| `consequence` | What the system showed next (not “you were wrong”) |
| `artifact` | Created work, track chosen, payload / pointer |
| `revision` | Diff or replacement artifact after feedback |
| `mission_completed` | Mission id, definition of done met |
| `mission_missed` | Mission id, abandoned or expired — factual, not moral |
| `feedback_received` | Author (human), text, artifact id |
| `feedback_incorporated` | Pointer to revision that followed feedback (human or obvious link; not an AI “they grew” score) |
| `collaboration_contribution` | What they handed to whom |
| `handoff` | What they said the next person needs to know |
| `project_completion` | Project id, when, done criteria |
| `mentor_observation` | Human note, tagged as observation not rank |
| `participant_reflection` | Their words about their own work |
| `share_sent` | That they opened share — **not** who converted |
| `identity_remembered` | Timestamp they chose Remember Me (PII lives on the person record) |
| `place_saved` | Resume token created (hash id only) |
| `access_event` | Workshop opening / access language shown |

Store: timestamp, stage, implementation=`company`, session id, optional `foundry_person_id`, payload, artifact pointer.

Do not store: inferred personality, politics, health, “grit score,” rank.

Anonymous evidence stays on the session. At Remember Me, the ledger **attaches** to `foundry_people`. Keep Exploring leaves it on the device until they return or it expires.

---

## What humans can do with evidence

- Filter by event type, track, date, cohort, project, “has revision,” “has reflection”
- Read artifacts side by side
- Write notes and decisions
- Ask AI to **summarize this ledger against a stated job requirement** (see AI bounds)
- Invite, interview, offer, decline — as **decisions**, not as scores

Humans must not be shown a sorted “best candidates” list produced by a model.

---

## Human decision gates

Every consequential transition is human-owned, written, and auditable.

| Gate | Advances to | Required record | Software may |
|---|---|---|---|
| Invite to cohort | Selected cohort member | actor, cohort, rationale (optional), timestamp | Send invite after the record exists |
| Interview | Conversation scheduled | actor, mode, notes | Help draft evidence-grounded questions |
| Paid project offer | Stage 13 eligibility | actor, scope, rate/terms pointer, classification flag | Flag “material value?” for review |
| Internship / apprenticeship | Intern path | actor + agreement pointer | Never auto-offer |
| Employment | Employee | actor + agreement pointer | Never auto-offer |
| Leadership appointment | Lead | actor, scope of people/resources | Show multiply/lead evidence on request |
| Ownership / partner conversation | Stage 14 talk | actor (founder), “conversation opened” — not “equity granted” | Preserve trail only |
| Real-work access | Sandbox / supervised / owned | actor, systems allowed, systems denied | Enforce bounds; default deny |
| Compensation classification review | Legal/HR follow-up | actor, why flagged | Raise flag when work looks productive |
| Removal / pause / decline | Status change | actor, type, note | Apply status; do not “score” the decline |
| Revoke SAVE MY PLACE / access | Security | actor, reason | Revoke token |

**Non-gates** (software may do without a human):

- Advance anonymous stages 1–4
- Acknowledge notice without judgment
- Offer Remember Me / Keep Exploring
- Create SAVE MY PLACE after identity
- Show a deeper challenge after return
- Let them pick an artifact track
- Record that they shared the door

Completing stages 1–11 never writes a gate record.

---

## Compensation and ownership records

Keep these **off** the public journey.

| Record | Meaning |
|---|---|
| `compensation_flag` | “This work may be productive for the company — classify it” |
| `compensation_offer` | Human offer + terms pointer |
| `compensation_active` | Agreement in force |
| `ownership_conversation` | Founders opened a talk |
| `ownership_agreement` | Legal agreement exists (pointer only; not a cap-table app) |

Never display these as progress bars to the participant.

---

## AI role

### AI MAY

- Generate scenario variations (staff-approved before public)
- Summarize submitted work
- Identify missing information (“no definition of done on this project”)
- Compare artifact revisions
- Organize evidence into a readable timeline
- Create interview questions **grounded in cited evidence**
- Suggest follow-up challenges (staff approve)
- Help participants understand instructions
- Coach **after** a decision when appropriate (not during a judgment test if silence is the point)
- Help staff find evidence relevant to a **stated** job requirement

### AI MAY NOT

- Infer protected traits
- Infer political ideology
- Diagnose personality
- Infer mental health
- Produce a secret employability score
- Automatically reject
- Automatically hire
- Automatically determine pay
- Automatically determine ownership
- Rank candidates by opaque “fit”
- Write human decision records
- Close a compensation classification flag

Campaign Layer 2 already established: if AI appears in a scenario, it is a **tool the participant might use**, not an oracle and not a grader. Company Foundry keeps that rule.

### Implementation posture through Phase 3

Prefer **no model calls** in the participant path (campaign precedent). Staff-side summarize can wait until the command center (Phase 6) and must cite ledger items.

---

## Real-work bridge

```txt
SIMULATED WORK
  → SANDBOX WORK
  → SUPERVISED REAL WORK
  → OWNED REAL WORK
```

| Tier | What it is | Access | Pay |
|---|---|---|---|
| Simulated | Fictional or sanitized workshop problems | None | Never implied |
| Sandbox | Real-shaped work on fake/sample data or isolated clones | Bounded non-prod | Usually unpaid challenge; flag if value leaks into prod |
| Supervised | Real internal task, mentor-owned | Least privilege, human authorized | Classify; often paid if material |
| Owned | They own an outcome | Still no secrets they do not need | Employment / contract |

### Example work (later phases)

Improve an internal tool; test an interface; research a market; write product documentation; clean a dataset; prototype a feature; build a landing page; analyze feedback; QA software; create marketing material; improve a workflow.

### Never expose

- production secrets
- unrestricted customer data
- sensitive internal credentials
- destructive production access

Responsibility grows with demonstrated trust **and** explicit human authorization (`real-work access` gate).

---

## Campaign evidence we do *not* port as-is

| Campaign artifact | Company stance |
|---|---|
| Willingness / volunteer commitment | Do not ask |
| Visit intent intern/paid/both | Too early; employment-shaped |
| RedDirt structuredData blob | Wrong store |
| Human rank 1–N on inbox | Optional later as **staff-local** sort, never AI, never participant-visible |
| KEY 01 / KEY 02 flags | Do not use as merit |

Useful campaign craft: append-only items, no participant-visible scores, continue-merge without second person records, Layer 2 handoff text as a gold evidence type.

---

## Talent Command Center (Phase 6 target)

Staff eventually see:

### Funnel

anonymous sessions → remembered participants → active builders → cohort candidates → cohort members → paid contributors → team members → leaders

### People

identity, declared interests, location, availability, voluntary work history, evidence ledger, artifacts, missions, feedback, collaboration, human notes

### Work

current assignment, deadline, definition of done, mentor, status, artifact, revision, outcome

### Cohorts

members, teams, projects, mentors, progress

### Human decisions

every gate above, filterable, immutable after write (append correction, do not silent-edit)

Phase 1–3 may have **no** staff UI. Evidence still must be shaped so a human can read it later.
