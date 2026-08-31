# Talent Foundry — Experience Spec

## Implementation truth (P0-S4/S5)

Post-identity spine now implemented:

`identify` → `youre_in` → `opportunity` → `availability` → `pathway` → `mission_one` → `handoff`

Identity POST must succeed before `youre_in`. Routing/mission attach via continue POST to the same RedDirt submission. Missions are deterministic (no OpenAI). Handoff ends P0 automation.

---

# Talent Foundry — Experience Spec

**Campaign config:** `kelly` (Kelly Grappe for Arkansas Secretary of State)  
**Public route:** `/talent-foundry`  
**Entry:** QR → `https://foundry-os.netlify.app/talent-foundry`  
**Device:** phone first; desktop is a wider version of the same vertical composition.

This spec is the implementable state machine. Campaign copy lives in config. The machine is reusable.

---

## Design constraints

- Do not title the experience “Kelly Grappe Internship Application.”
- Do not open on a long form, Indeed/LinkedIn layout, campaign signup card, or personality-quiz chrome.
- One idea per screen. Full-viewport. Large tap targets (≥44px).
- No scores, rubrics, or staff observations shown to the participant.
- Identity is collected only at `identify`.
- Layer 2 and Layer 3 remain in the machine even when feature-gated.

### Emotional beats (map to states)

| Beat | States |
|------|--------|
| WHAT IS THIS? | `entry` → `mystery` |
| IT NOTICED ME. | `change_prompt` → `acknowledgment` |
| THIS IS INTERESTING. | `people_rule` |
| THIS MATTERS. | `willingness` → `kelly_video` |
| I COULD DO SOMETHING. | `volunteer_commitment` → `lead_challenge` → `scenario_volunteers` |
| I WANT TO BE PART OF THIS. | `identify` → `youre_in` → `pathway` → `mission_one` → `handoff` |

---

## Session shape

Stored in `sessionStorage` key `tf.<campaignId>.v1`. Survives refresh on the same device/tab. Not the system of record.

```ts
type JourneyStateId =
  | "entry"
  | "mystery"
  | "change_prompt"
  | "acknowledgment"
  | "people_rule"
  | "willingness"
  | "kelly_video"
  | "volunteer_commitment"
  | "lead_challenge"
  | "scenario_brief"
  | "scenario_volunteers"
  | "scenario_consequences"
  | "scenario_revision"
  | "optional_doors"
  | "door_room"
  | "door_call"
  | "door_breakdown"
  | "door_ask"
  | "key_one"
  | "identify"
  | "youre_in"
  | "opportunity"
  | "pathway"
  | "mission_one"
  | "handoff"
  | "layer2_operator"   // gated
  | "key_two"           // gated
  | "layer3_leader"     // gated
  | "people_rule_close"; // gated

type EvidenceItem = {
  id: string;
  at: string; // ISO
  stateId: JourneyStateId;
  kind: "text" | "choice" | "decision" | "revision" | "identity" | "mission";
  label: string;
  value: unknown;
  /** Staff-only dimension hints. Never shown in the public UI. */
  dimensions?: string[];
};

type IdentityRecord = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zip: string;
  startWhen: string;
  submissionId?: string;
  userId?: string;
  workflowIntakeId?: string;
};

type TalentFoundrySession = {
  v: 1;
  campaignId: string;
  stateId: JourneyStateId;
  startedAt: string;
  evidence: EvidenceItem[];
  flags: {
    willingToAct: boolean | null;
    volunteerCommitment: "yes" | "limited" | "not_now" | null;
    internPathwayEligible: boolean;
    requiredScenarioComplete: boolean;
    optionalDoorsCompleted: string[];
    keyOne: boolean;
    keyTwo: boolean;
    identified: boolean;
    missionOneComplete: boolean;
    layer2Enabled: boolean;
    layer3Enabled: boolean;
  };
  identity: IdentityRecord | null;
  pathwayId: string | null;
  missionId: string | null;
};
```

---

## State machine

```
entry
  → mystery
    → change_prompt
      → acknowledgment
        → people_rule
          → willingness
            → kelly_video
              → volunteer_commitment
                → lead_challenge
                  → scenario_brief
                    → scenario_volunteers
                      → scenario_consequences
                        → scenario_revision
                          → optional_doors
                              ├─ door_* (optional, skippable)
                              ├─ key_one (only if all four doors done)
                              └─ identify
                                   → youre_in
                                     → opportunity
                                       → pathway
                                         → mission_one
                                           → handoff
                                               ├─ STOP (P0)
                                               └─ layer2_operator (if keyOne && flag)
                                                    → key_two
                                                      → layer3_leader
                                                        → people_rule_close
```

Illegal: jump to `identify` before `scenario_revision` completes.  
Legal: skip optional doors. Skipping does **not** reduce eligibility except Key One.

`volunteerCommitment === "not_now"` ⇒ `internPathwayEligible = false`. They may still identify as a participant and receive a light public close, but staff see the flag.

---

## Screen specifications

### `entry`

- Near-empty dark field. Faint pulse or slow grain. No logo lockup that says “internship.”
- Optional tiny mark: a line, not a campaign header.
- Primary control: tap / “Begin” (no explanation paragraph).
- Advance: user tap.

### `mystery`

- Short lines, staggered:
  - “Something is happening in Arkansas.”
  - “It does not start with a form.”
- Advance: tap continue.

### `change_prompt`

- Prompt (canonical): **What would you change if you had the chance?**
- One text area. No name fields. Placeholder restrained (“Type it. Even a sentence.”).
- Advance: continue (empty allowed — still counts as a beat).
- Evidence: `kind: "text"`, dimension `written_communication`, `passion`.

### `acknowledgment`

- Brief responsive echo. P0: local, not an LLM.
  - If they wrote something: reflect a short excerpt + “You named something real.”
  - If empty: “Even the pause says something.”
- One continue control. Do not ask follow-up questions here.

### `people_rule`

- **The People Rule.**
- **Regnat Populus.**
- One sentence: power belongs with people, not with the machine in front of them.
- No policy platform dump.
- Advance: tap.

### `willingness`

- Question: “If you had a chance to help, what would you actually do?”
- Choices (config):
  - help from where I live
  - help from campus or school
  - help a few hours from home
  - show up in person when I can
  - I’m not sure yet
  - not now
- Evidence: `kind: "choice"`, dimensions `willingness_to_volunteer`, `availability`.
- `not now` sets `willingToAct = false`; others `true`.
- Advance: choice.

### `kelly_video`

- First time Kelly appears.
- Direct-to-camera slot. Poster + play. Caption: she introduces herself and thanks them for considering volunteering. **Not an intern pitch.**
- If asset missing: still frame + short written greeting from config.
- Advance: after play or “continue.”

**Approved video asset contract (do not invent the file):**

| Item | Value |
|------|--------|
| File | `apps/platform/public/talent-foundry/kelly-grappe-intro.mp4` |
| URL once dropped in | `/talent-foundry/kelly-grappe-intro.mp4` |
| Config switch | `kellyCampaign.kellyVideoUrl` in `apps/platform/lib/talent-foundry/campaigns/kelly.ts` |
| Format | H.264 MP4, ~30 seconds, phone-first (9:16 source preferred; desktop crops to 16:10) |
| Optional poster | `apps/platform/public/talent-foundry/kelly-grappe-intro.jpg` |
| Optional captions | `apps/platform/public/talent-foundry/kelly-grappe-intro.vtt` |
| Transcript | already in `kellyCopy.kellyScript` — keep in sync with the spoken words |

### `volunteer_commitment`

- “This work is real. It starts as volunteering.”
- Choices: I will volunteer / I can do a little / not now.
- `not now` ⇒ not eligible for paid-intern pathway; may continue.
- Evidence: `volunteerCommitment`.

### `lead_challenge`

- **Think you can lead this? Show us.**
- Then: **There aren’t perfect answers. We want to see how you think.**
- Advance: tap “I’m in.”

### `scenario_brief`

- Seed: **Five volunteers just showed up. Nobody left instructions for them. You’re the person at headquarters. What do you do?**
- No timer. No score.
- Advance: begin.

### `scenario_volunteers` (Layer 1 required)

Config-driven decision graph. Collect **several decisions before any consequence screen**.

Evolving facts (inject between decisions, not all at once):

1. A first-time volunteer looks lost.
2. Someone has strong graphic-design skill.
3. A person is frustrated Kelly is not present.
4. An event across town suddenly needs help.
5. The phone rings.
6. One volunteer dominates the room.
7. Someone has a car but only two hours.

Each decision: 2–4 concrete actions (not Likert). Statewide texture: at least one fact implies remote/home/small-town work, not only HQ.

Evidence per decision: `kind: "decision"`, dimensions from config (`delegation`, `logic_judgment`, `interpersonal`, `people_development`, `trust_discretion`, `big_picture`).

P0 minimum: 5 decisions.

### `scenario_consequences`

- Show 3–5 outcome cards. Do **not** label which prior click caused which outcome.
- Tone: observational, not punitive.
- Advance: continue.

### `scenario_revision`

- **Knowing what you know now, would you do anything differently?**
- Yes/no + optional explanation.
- Sets `requiredScenarioComplete = true`.
- Evidence: `kind: "revision"`, dimensions `follow_through`, `logic_judgment`.

### `optional_doors`

- Four mysterious doors. No competency labels.
  - THE ROOM
  - THE CALL
  - THE BREAKDOWN
  - THE ASK
- Controls: enter a door, or “I’m ready to step in” → `identify`.
- P0: unfinished doors show “This door is not open yet” and remain skippable.
- Completing all four sets `keyOne = true` → `key_one` before `identify`.

### Door intents (hidden from participant; staff only)

| Door | Hidden focus |
|------|----------------|
| THE ROOM | interpersonal, delegation, people development |
| THE CALL | verbal communication, trust/discretion, judgment |
| THE BREAKDOWN | logic, follow-through, grace under pressure |
| THE ASK | leadership desire, big-picture, passion |

### `key_one`

- **KEY 01 ACQUIRED**
- **You’ll know when you need it.**
- Tie visually to The People Rule. Not a coin/badge shop.
- Advance: continue → `identify`.

### `identify`

- **Who are you?**
- Fields only: first name, last name, phone, email, ZIP, when can you start.
- Short disclosure: this creates a campaign volunteer record so a human can follow up. Not a job offer.
- POST FoundryOS `/api/talent-foundry/identify` → RedDirt `/api/forms` volunteer pipeline.
- On success: store IDs, `identified = true` → `youre_in`.
- On failure: retry. Do not claim they are “in.”

### `youre_in`

- **[First name], you’re in.**
- Means: they entered the participation experience. **Not** employment, finalist, or paid selection.

### `opportunity`

- One paid lead-intern role exists now at $20/hour (roughly 30–40 hrs/week, stronger Little Rock in-person need).
- Safe future language only (see canonical README). No promises.
- If `internPathwayEligible === false`, do not highlight the paid role as their path; still allow volunteer pathways.

### `pathway`

- Choose one (config enums): remote digital, local organizer, campus/school leader, events, communications/creative, research/data, headquarters, fundraising, field, volunteer leadership.
- Reinforce: meaningful work exists where they live.

### `mission_one`

- One small, safe, real action from the selected path (config).
- Example: text three people you trust; share one approved post; walk your campus once and note two bulletin boards; list five neighbors for a later conversation.
- Mark complete when they confirm they will do it (honor system for P0).
- Evidence: `kind: "mission"`, dimension `follow_through`.

### `handoff`

- **YOU SHOWED UP. NOW WE DO.**
- A human on the campaign will be in touch. No automated Mission Two.
- Optional: “If you want the public volunteer page later, it lives on the campaign site” — do not dump them into a long form now.

### Layer 2 / Layer 3 (architected, gated)

`flags.layer2Enabled` / `layer3Enabled` default **false** for P0.

- `layer2_operator`: 10–15 minute phone-first outcome mission (ops + people + incomplete information). Completing may set `keyTwo`.
- `layer3_leader`: coach **fictional/composite** profiles only. Never real applicants. Ends with self-coaching prompt and **THE PEOPLE RULE**. No AI score after.

---

## Evidence dimensions (staff organization only)

Used as tags on evidence items. Never rolled into a hidden hire score.

- leadership_readiness
- passion
- availability
- willingness_to_volunteer
- skill_breadth
- interpersonal
- trust_discretion
- written_communication
- verbal_communication
- logic_judgment
- delegation
- people_development
- big_picture
- leadership_desire
- follow_through

---

## Feature flags (campaign config)

```ts
{
  layer2Enabled: false,
  layer3Enabled: false,
  optionalDoorsOpen: {
    room: false,
    call: false,
    breakdown: false,
    ask: false,
  },
  kellyVideoUrl: null as string | null,
}
```

P0 ships with flags off except the required spine through `handoff`.

---

## Analytics (optional, P0-light)

If Foundry already has anonymous events, fire `tf_state` with `{ campaignId, stateId }` only. No answers, no PII.

---

## QA checklist (phone)

1. QR / URL opens instantly on a phone-width viewport.
2. No internship headline before `opportunity`.
3. Can complete required scenario without creating an account.
4. Identity is refused until the required scenario is done (UI simply does not offer it).
5. Same email as an existing RedDirt volunteer updates that user.
6. Staff dashboard shows evidence without a numeric “fit score.”
