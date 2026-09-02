# Talent Foundry

Talent Foundry is a FoundryOS **product family**: one core, parallel implementations. It is not a single campaign funnel.

| Implementation | Public question | Route | Person store | Status |
|---|---|---|---|---|
| **Campaign Foundry** | Will you show up? | `/talent-foundry` | RedDirt | **Live V1.2** |
| **Company Foundry** | What can you build, improve, lead, and multiply? | `/workshop` | FoundryOS `foundry_people` → later `user_profiles` | **Phase 1.2 polish.** Phase 1.1 HOLD. Phase 2 held. Cohort 01: 3–5 start **2026-11-15** (staff only) |
| **Employer Foundry** | Configurable | TBD | Tenant | Future (Phase 8) |

**Campaign Foundry (this file below):** Kelly Grappe beta. Do not treat it as the company product. Live QR remains `https://foundry-os.netlify.app/talent-foundry`.

**Company Foundry:** software-company talent-to-ownership academy and operating environment. Not a reskin of Kelly. Not an internship funnel. Phase 0 + 0.5 architecture (Phase 1 screens held):

- `docs/talent-foundry/software-company/MASTER_BUILD_PLAN.md`
- `docs/talent-foundry/software-company/PHASE_0_5_TALENT_TO_OWNERSHIP.md`
- `docs/talent-foundry/software-company/CAPABILITY_REVEAL_ENGINE.md`
- `docs/talent-foundry/software-company/ACADEMY_CURRICULUM.md`
- `docs/talent-foundry/software-company/OPERATING_ENVIRONMENT.md`
- `docs/talent-foundry/software-company/AI_PARTNERS.md`
- `docs/talent-foundry/software-company/ORIGINAL_MISSION_RECOVERY.md`
- `docs/talent-foundry/software-company/PARALLEL_ARCHITECTURE.md`
- `docs/talent-foundry/software-company/EXPERIENCE_BLUEPRINT.md`
- `docs/talent-foundry/software-company/FLYWHEEL_MODEL.md`
- `docs/talent-foundry/software-company/COHORT_MODEL.md`
- `docs/talent-foundry/software-company/EVIDENCE_AND_HUMAN_DECISION_MODEL.md`
- `docs/talent-foundry/software-company/PHASE_1_BUILD_SPEC.md`
- `docs/talent-foundry/software-company/PHASE_1_1_EXPERIENCE_PROOF.md`
- `docs/talent-foundry/software-company/PHASE_1_2_EXPERIENCE_POLISH.md`
- `docs/talent-foundry/software-company/BUILD_DISCIPLINE.md`
- `docs/talent-foundry/software-company/review/phase-1-1/README.md`
- `docs/talent-foundry/software-company/COHORT_COMPOSITION.md`
- `docs/talent-foundry/software-company/THINKING_TRACE_MODEL.md`
- `docs/talent-foundry/software-company/SCENARIO_LAB.md`
- `docs/talent-foundry/software-company/FUTURE_SURFACES.md`
- `docs/talent-foundry/software-company/SPINE_AND_LAYERS.md`

Company Foundry must not write RedDirt. Do not alter the live Kelly route to build it.

---

# Campaign Foundry — Kelly Grappe Campaign Beta

Status: **LIVE (V1.2)** — SAVE MY PLACE + Key One share on `main` (`4ed26c0`)  
Date: 2026-08-31 (campaign MVP docs) · family index added 2026-09-01  
Lead engineer: ChatGPT  
Implementation engineer: Cursor  
Primary beta: Kelly Grappe for Arkansas Secretary of State campaign

## Mission

Build a mobile-first recruiting and volunteer-conversion experience that makes a visitor think **I WANT TO BE PART OF THIS** before it feels like an application.

This is not a conventional internship application. It is the beta for a reusable FoundryOS talent-discovery product.

The campaign is currently seeking one paid lead intern at **$20/hour**, initially roughly **30–40 hours/week**, while also building a statewide volunteer and leadership bench. Future paid positions may be added if fundraising permits; never promise employment or timing.

Core campaign doctrine:

- **People Over Politics**
- **Regnat Populus / The People Rule**
- people first; campaign second; Kelly third; community fourth; personal ambition last
- grace first
- listen first, understand direction, then take initiative
- solve problems; ask when unclear rather than wasting time
- chain of command plus real delegation
- develop and elevate people
- own outcomes and mistakes
- protect trust and confidentiality
- big vision with practical execution
- meaningful participation must be possible from anywhere in Arkansas, including home, school, campus, town, or local community

## Architecture decision

### FoundryOS
Owns the reusable recruiting/assessment experience and product architecture. Build this beta so campaign-specific content can later become tenant/configuration data rather than permanent product assumptions.

### RedDirt
RedDirt is the campaign system of record.

DO NOT create a second volunteer identity silo.

The existing RedDirt public `/volunteer` experience uses `VolunteerForm`, `volunteerSchema`, `/api/forms`, and `persistFormSubmission`. The new experience must route identified participants into this same canonical volunteer intake/person pipeline and attach Talent Foundry-specific evidence to the resulting canonical record.

Known existing volunteer fields include first/last name, email, phone, ZIP, county, city, preferred role, language, student/campus, fundraising interest, leadership interest, interests, notes, availability, skills, and attribution.

The Talent Foundry extension may store scenario evidence, journey state, keys/layers completed, internship interest, start date, practical availability, communication samples, staff notes, human review rank, interview assignment, team contact, intern decision, pathway, and area assignment. Audit RedDirt first and reuse existing models where appropriate.

## Experience spine

### Opening psychology

Do not lead with Kelly or with `Apply for an internship`.

Desired progression:

1. What is this?
2. This noticed me.
3. This is interesting.
4. This matters.
5. The People Rule.
6. I could do something about this.
7. I want to be part of this.
8. Only then: identify the participant and reveal/clarify practical opportunities.

First touch should be simple and interactive. Early prompt:

> What would you change if you had the chance?

Respond briefly in a way that feels like the system actually listened.

Move through **The People Rule** and what the visitor is willing to do. Use choices where appropriate.

Then use a direct-to-camera Kelly video introducing herself and thanking the person for considering volunteering. Do not make the opening an internship pitch.

A person unwilling to volunteer in any capacity is not a fit for the paid lead-intern pathway, but may complete the public experience.

Transition challenge language:

> Think you can lead this? Show us.

Before scenario assessment:

> There aren't perfect answers. We want to see how you think.

## Layer 1 — Participant

Required core simulation: **Volunteers**.

Seed situation:

> Five volunteers just showed up. Nobody left instructions for them. You're the person at headquarters. What do you do?

Make one deceptively simple real-world problem become more complicated over several decisions.

Possible evolving facts:

- first-time volunteer
- volunteer with strong graphic-design skill
- person frustrated Kelly is not present
- event suddenly needs help
- phone rings
- one volunteer dominates the room
- someone has transportation but only two hours

Do not give consequences after every click. Let the participant make several decisions first. Then show consequences without telling them which earlier choice caused what. Observe whether they recognize their own role.

Later ask:

> Knowing what you know now, would you do anything differently?

Allow revision and explanation.

Do not reveal assessment observations or scores during the experience. Preserve evidence for staff review.

## Optional scenario doors

After the required scenario, offer mysterious optional doors rather than skill labels. Initial working names:

- THE ROOM
- THE CALL
- THE BREAKDOWN
- THE ASK

The participant should not know exactly what competency each door explores before entering.

Completing all optional Layer 1 scenarios reveals **Key One**.

Key One is unmistakable and tied to **The People Rule**, not a meaningless game collectible.

Suggested moment:

> KEY 01 ACQUIRED
>
> You'll know when you need it.

Choosing optional content creates more evidence but must not automatically equal a better candidate; do not penalize people who stop because of time/accessibility constraints.

## Identity checkpoint

Do not collect identity at the opening.

After the participant has completed the required initial experience, ask:

> Who are you?

MVP checkpoint fields only:

- first name
- last name
- phone
- email
- ZIP
- When can you start?

On successful canonical RedDirt volunteer creation/linking:

> [First name], you're in.

This means they have stepped into the campaign participation experience. It MUST NOT imply employment, finalist status, or selection for a paid role.

Continue immediately rather than turning into a long form. Gather additional practical information later in context.

## Layer 2 — Operator

Key One can open an optional deeper **10–15 minute phone-first mission**.

The participant becomes responsible for an outcome. Mix campaign operations, people, communication, technology, changing information, incomplete information, and prioritization. They may need to organize, adapt, communicate, and finish a task.

Completing the intended Layer 2 path can reveal **Key Two**.

## Layer 3 — Leader

Key Two opens THE LEADER. The shift is over. Tomorrow they are not getting tasks. They are getting people.

Present fictional/composite profiles based on patterns the assessment is designed to reveal. Do NOT expose real applicants to other applicants and do NOT let one applicant make a real employment decision about another.

Ask the participant to reason through:

- where each new volunteer belongs
- what responsibility each can handle
- who needs coaching
- how to coach them
- who should work together
- who is not ready for a responsibility
- how to develop each person
- how to respond to mistakes
- how to handle enthusiasm plus overstepping
- how to recognize quiet capability
- how to handle someone not receiving the assignment they wanted

Final fictional leadership decision: there is funding for one additional paid position. Ask what work the campaign needs and which fictional/composite person they would recommend, with reasoning grounded in the supplied job-related evidence.

Then reveal the mirror:

> Those people were built from patterns we see in people like you.

Then:

> One last person needs your attention.
>
> You.
>
> If you were coaching yourself, what would you tell yourself you still need to work on?

Prefer voice-first if feasible, with text fallback. Do not generate a score or AI response afterward.

End the assessment arc by returning to:

> THE PEOPLE RULE.

Kelly may briefly thank them again.

## Statewide participation doctrine

The experience must repeatedly demonstrate that meaningful campaign work can happen from anywhere in Arkansas.

Scenario examples should include people:

- running social/digital work from a living room
- organizing at school or college
- recruiting in a small town
- helping with calls/text/digital organizing remotely
- researching or creating graphics/content from home
- supporting an event locally
- organizing a community network
- working physically at headquarters

A visitor outside Little Rock should leave thinking: **They need somebody where I live.**

The Little Rock lead internship has stronger in-person needs; the movement does not.

## Paid opportunity language

One paid lead-intern opportunity is open now at $20/hour. The campaign hopes to add more paid positions as fundraising permits, potentially around Arkansas.

Never promise future employment, timing, number of positions, geography, or that volunteering earns a paid job.

Safe concept:

> One paid position is available now. As the campaign raises additional resources, we hope to add more paid positions, including opportunities around Arkansas. We can't promise when or where those positions will become available. People already participating and demonstrating what they can do may be considered when future opportunities open.

## Conversion to actual volunteering

Nobody should end at `Thanks, we'll be in touch.`

If someone wants to participate, route them toward a meaningful path based on geography, availability, interests, and demonstrated capabilities.

Potential paths include remote digital contributor, local organizer, campus/school leader, event support, communications, creative, research/data, headquarters operations, volunteer leadership, fundraising, and field.

Before leaving, give the participant **one small, safe, real first volunteer mission** appropriate to the selected path.

After Mission One, STOP automation/progression and hand off to a human campaign team member.

Suggested handoff concept:

> YOU SHOWED UP. NOW WE DO.

The automated continuing mission/progression system is explicitly post-launch scope.

## Talent Foundry dashboard — RedDirt

Create a dedicated private Talent Foundry review surface inside RedDirt using existing auth/admin patterns.

The system ORGANIZES evidence. Humans make hiring and placement judgments.

Do not generate an opaque AI `best candidate` score and do not autonomously make employment decisions.

Organize evidence around the ideal-candidate doctrine:

- leadership readiness
- passion / mission commitment
- full availability and flexibility
- willingness to volunteer independent of paid selection
- wide-ranging skills
- interpersonal strength
- trust/discretion indicators grounded in scenario evidence
- written communication
- verbal communication
- logic/judgment
- delegation quality
- people-development orientation
- big-picture thinking
- desire to lead
- follow-through / optional exploration

Humans review the evidence and then control:

- review rank (#1, #2, #3... after human review)
- interview needed/status
- interview assignment
- team contact / relationship owner for ALL applicants and volunteers
- intern decision: pending / yes / no
- pathway
- area of assignment
- staff notes

Initial pathway concepts:

- paid-intern consideration
- volunteer
- local leader
- campus/school leader
- remote contributor
- headquarters/office

Initial assignment dropdown concepts:

- social media
- office operations/help
- field
- events
- communications / PR
- graphic design / creative
- fundraising
- volunteer leadership
- research / data
- digital / technology
- driving / travel support
- community organizing
- campus organizing
- other

Prefer configurable enums/options rather than campaign assumptions embedded deeply in reusable FoundryOS code.

## MVP deadline and scope discipline

Ship the usable front door + evidence capture + RedDirt canonical volunteer integration + basic private review dashboard **today**.

Do NOT delay MVP for:

- automated long-term volunteer progression
- sophisticated interview scheduling
- autonomous AI candidate ranking
- a generalized multi-tenant admin builder
- full commercial FoundryOS packaging
- perfect scenario depth
- advanced analytics

For MVP interview handling, human assignment/status is enough. Campaign staff can arrange actual times manually by phone/text.

## Cursor first mission

1. Read this file completely.
2. Audit current FoundryOS architecture and conventions before creating a new app/folder.
3. Audit RedDirt's existing volunteer form, schema, `/api/forms`, `persistFormSubmission`, canonical person/contact models, volunteer ops, admin auth, and any existing volunteer/admin dashboards.
4. Determine the thinnest safe integration that writes identity into the existing canonical volunteer pipeline and attaches Talent Foundry evidence without duplicating people.
5. Write `docs/talent-foundry/MASTER_BUILD_PLAN.md` as a phased build with an explicit TODAY/MVP critical path and POST-LAUNCH queue.
6. Write `docs/talent-foundry/REDDIRT_INTEGRATION_AUDIT.md` documenting exact models/routes/files to reuse and any schema change required.
7. Write `docs/talent-foundry/EXPERIENCE_SPEC.md` translating the journey above into screens/states/transitions and scenario data structures.
8. Then begin the first buildable MVP slice without waiting for another philosophical design pass unless a hard safety/production-data/auth blocker is found.
9. Keep the experience mobile-first and optimized for QR-code entry.
10. Preserve RedDirt as system of record and FoundryOS as reusable product architecture.
11. Validate using each repo's existing checks/preflight before commit.
12. Commit and push every completed slice with a clear report/handoff so the next Cursor pass can resume immediately.

## Hard guardrails

- No autonomous employment decision.
- No opaque AI candidate score used to select/reject.
- No promise of future paid work.
- No applicant sees another real applicant's private assessment data.
- No production secrets in code/docs.
- Do not break the existing public volunteer form or canonical RedDirt intake.
- Do not duplicate canonical volunteer identities merely to simplify the MVP.
- Any destructive production-data operation, production auth/security change, or other high-risk migration requires an explicit operator gate.
- Keep collected data job/volunteer relevant and disclose collection/use appropriately in the eventual public experience.

## Definition of MVP success

A person can scan a QR code on a phone, enter an unusual/cinematic People Rule experience, complete the required volunteer scenario, identify themselves, be written/linked into the existing RedDirt volunteer system, optionally explore deeper scenarios/keys, choose a meaningful participation path, receive a first mission, and reach a human handoff.

Campaign staff can open a private RedDirt Talent Foundry dashboard, find every identified participant, inspect organized evidence, assign an owner/interviewer, manually rank reviewed candidates, mark intern decision, and place people into volunteer/leadership/assignment pathways.

That is today's finish line.