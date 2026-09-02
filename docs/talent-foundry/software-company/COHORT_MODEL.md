# Company Foundry — Cohort Model

**Status:** Phase 0 complete conceptual model. Phase 0.5 addition: a cohort **begins to exist for the participant** when they encounter another real person — not when they finish a fictional partner, and not when they complete a course. Do not build every backend table in the first slice.

Recovered adjacent shape: Pass 026 `beta_waitlist` tester cohorts (segment, invite, lifecycle). **Wrong meaning.** Hiring cohorts are selected by demonstrated work and human decision, not by demographic tester slot.

---

## Purpose

A cohort is a **time-bounded group of people developing work together** under named mentors, with projects, evidence, and explicit human decisions.

**Composition (staff only):** start with Navigator + Builder + Connector. Grow to five with Witness + Reframer. Connector is load-bearing. Software describes missing evidence; humans choose people. See `COHORT_COMPOSITION.md`. Never a personality score. Human invite still required.

The company should be able to open:

**FOUNDry Cohort 01**

with a configurable number of participants.

Participants must not be told that walking in the workshop places them in a cohort.

Fictional bench partners (Rafi) are training wheels. **The cohort is not real until another participant is in the room.** Staff invite still governs FOUNDry Cohort 01 seats. Meeting someone in the workshop is not an automatic invite.

---

## Operating lock — Cohort 01 (staff only)

Source: `apps/platform/lib/talent-foundry/implementations/company/constants.ts` → `COHORT_01`

| Fact | Value |
|---|---|
| Name | FOUNDry Cohort 01 |
| Seats | **3–5 people** |
| Work starts | **November 15, 2026** |
| How they get there | Human invite after demonstrated workshop work — not a door banner |
| Public workshop | Must **not** mention Nov 15, hiring, seats, or “apply for the cohort” |

This is the first real company hiring cohort. The anonymous top of the funnel is larger. **Three to five** are selected and start work on that date. Completing the Foundry does not earn a seat.

Staff timeline (from 2026-09-01): roughly ten weeks of door → tape → remember → artifact → human gates → offer → **start 2026-11-15**. If the door is late, the start date does not move unless founders explicitly move it.

---

## Funnel (human-governed)

```txt
large anonymous top
  → remembered participants
  → active builders
  → selected cohort            ← human invite
  → paid project contributors  ← human + agreement
  → interns / apprentices      ← human + agreement
  → employees                  ← human + agreement
  → leads                      ← human appointment
  → possible future partners   ← separate legal conversation
```

Labels below “active builders” are **placement decisions**, not psychological types and not automatic stage names shown to the public.

---

## Conceptual objects

Design the complete model now. Implement incrementally from Phase 4.

### Cohort

| Field | Meaning |
|---|---|
| `id` | Stable id |
| `name` | e.g. FOUNDry Cohort 01 |
| `status` | draft / open / active / closing / closed / archived |
| `starts_at` / `ends_at` | Optional window |
| `capacity` | Configurable target size |
| `stage` | Planning / forming / working / reviewing / closing |
| `purpose` | Human-written, internal |
| `visibility` | staff-only until a member is invited |

A cohort is not a marketing landing page.

### Participant (membership)

A `foundry_person` may exist without any cohort. Membership is a join.

| Field | Meaning |
|---|---|
| `cohort_id` | |
| `foundry_person_id` | |
| `membership_status` | invited / accepted / active / paused / completed / declined / removed |
| `entered_via` | workshop / staff invite / leader invite (not a score) |
| `track_interest` | declared from artifact routing, editable, not a type |
| `compensation_status` | none / flagged_for_review / offered / active_paid / ended — never inferred as “deserves pay” |
| `human_decisions[]` | append-only (see evidence model) |

### Team

Optional sub-group inside a cohort.

| Field | Meaning |
|---|---|
| `cohort_id` | |
| `name` | |
| `member_ids` | |
| `project_ids` | |

### Project

| Field | Meaning |
|---|---|
| `cohort_id` | optional (sandbox work may exist outside) |
| `title` | |
| `work_tier` | simulated / sandbox / supervised / owned |
| `definition_of_done` | Required before Stage 9 |
| `deadline` | optional |
| `mentor_ids` | |
| `status` | proposed / assigned / in_progress / in_review / done / abandoned |
| `artifact_ids` | |
| `access_bounds` | what systems / data are explicitly allowed |

### Mentor

A remembered person or staff user with an explicit mentor assignment. Mentorship is a **human appointment**, not a badge drop from multiply-stage completion.

### Evidence (rolled up)

Membership should be able to list:

- artifacts and revisions
- missions completed / missed
- feedback received / incorporated
- collaboration contributions
- handoffs
- mentor observations
- participant reflections

The cohort view **organizes** this. It does not score it.

### Human decisions (on the cohort)

Invite to cohort, remove, pause, recommend paid project, recommend internship, recommend employment, appoint lead, open ownership conversation. Each is an auditable record (see evidence model). Completing projects never writes these automatically.

---

## Progression inside a cohort

```txt
Invited
  → Accepted
  → Assigned project
  → First delivery
  → Feedback
  → Revision
  → Team / collaborate
  → Multiply (help a newer member)
  → Eligible for lead consideration     ← eligibility only
  → (optional) paid / intern / employ   ← separate gates
```

“Eligible” means staff **may** look. It does not notify the participant that they “leveled up to leadership.”

---

## Opening a cohort (staff operation)

1. Human creates FOUNDry Cohort NN with capacity and purpose.
2. Human reviews remembered / active builders (evidence filters, not rank scores).
3. Human sends invites. Invite is the first time “cohort” is a public word for that person.
4. Accepted members see a workshop that has become more populated — people, tools, projects — not an HR onboarding portal.
5. Mentors are assigned explicitly.
6. Projects start at simulated or sandbox unless a human authorizes supervised real work.

---

## What a cohort is not

- Not the anonymous top of the funnel
- Not a tester segment (`beta_waitlist`)
- Not automatic enrollment after Stage 5
- Not a guaranteed paid seat
- Not a class with grades
- Not a personality-sorted house
- Not a bootcamp section
- Not created by finishing Rafi or a setup mission

---

## Continuity (Phase 7)

Cohort 02 should be findable and developable by people who came through Cohort 01 — especially those who multiplied and led.

The flywheel accelerates when **leaders develop the next cohort**, not when marketing buys more door traffic.

Store:

- which leaders mentored which members
- which members later became mentors
- which projects became company capacity

Still no equity implication.

---

## Implementation slices

| Phase | What exists |
|---|---|
| 0 | This model |
| 1–3 | No cohort tables. People are anonymous or remembered only |
| 4 | Cohort + membership + project + mentor objects. Invite flow. Staff UI thin |
| 5 | Project `work_tier` + access bounds |
| 6 | Command center cohort views |
| 7 | Cohort-to-cohort mentor continuity |
| 8 | Tenant-configurable cohort templates |

No production migrations in Phase 0.
