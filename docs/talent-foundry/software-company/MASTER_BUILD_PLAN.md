# Company Foundry — Master Build Plan

**Program:** Talent Foundry implementation #2 — software-company talent-to-ownership academy and operating environment  
**Branch:** `feat/talent-foundry-company-phase-0`  
**Rule:** Do not alter live Campaign Foundry. Do not modify RedDirt. Do not merge until Ernie reviews.  
**Now:** Phase 1.2 **APPROVED**. **Phase 2 / MAKE** open — first artifact, observed → equipped. Keep building on this branch; **do not merge PR #5 yet**.  
**Discipline:** `BUILD_DISCIPLINE.md` — build locally → validate → commit → push → Netlify preview → review → only then advance. Preview is the close gate. Production is not.

This is **not** the Kelly Grappe experience with different copy.  
This is **not** an internship funnel, a bootcamp, or a course catalog.

---

## Mission

Build a system that discovers overlooked people by what they can actually **do**.

```txt
DISCOVER → ENGAGE → CREATE → COLLABORATE → PROVE → DEVELOP
  → PLACE → BUILD → LEAD → OWN → BRING IN THE NEXT GENERATION
```

The system may discover interns, builders, designers, researchers, operators, product thinkers, marketers, organizers, technical generalists, future employees, future leads, potential long-term partners.

They remain **potential future partners throughout**. That is staff posture. The software never announces a partner track. Ownership stays a separate legal conversation.

They do not merely apply. They enter `/workshop`, demonstrate how they think, learn the Foundry method, form cohorts, work through GitHub on Foundry products, and earn trust in public only as far as human gates allow.

**Those labels are never assigned psychologically or automatically.**  
People demonstrate capability. Humans decide placement, employment, compensation, leadership, and ownership.

**Don’t ask people what they are. Give them something worth doing and watch what they do.**  
**Don’t ask them how they think. Give them unfinished work and keep the tape.**

---

## Official family position

| Implementation | Status | Index |
|---|---|---|
| Campaign Foundry | Live V1.2 on `/talent-foundry` | `docs/talent-foundry/README.md` |
| **Company Foundry** | Phase 1.2 experience polish (this directory) | this file |
| Employer Foundry | Future Phase 8 | `PARALLEL_ARCHITECTURE.md` |

Campaign architecture lock (“not a lifelong world,” RedDirt identity) remains **campaign-scoped**. Company Foundry reopens the world question: this implementation **is** a FoundryOS-world flywheel.

---

## Document set (Phase 0 + 0.5)

| Doc | Role |
|---|---|
| `ORIGINAL_MISSION_RECOVERY.md` | Found / canon / inferred / new — not blurred |
| `PARALLEL_ARCHITECTURE.md` | Core + three implementations, identity, routes |
| `EXPERIENCE_BLUEPRINT.md` | Mystery, stages, reveals, opening |
| `FLYWHEEL_MODEL.md` | Operational loop |
| `COHORT_MODEL.md` | Cohort objects and progression |
| `EVIDENCE_AND_HUMAN_DECISION_MODEL.md` | Ledger, gates, AI, real-work bridge |
| `THINKING_TRACE_MODEL.md` | How they think — flight recorder, not a score |
| `SCENARIO_LAB.md` | NOTICE / MESS / artifact seeds tagged by thinking moves |
| `FUTURE_SURFACES.md` | Transparent tape, living room, interview-from-tape |
| `SPINE_AND_LAYERS.md` | 14-stage spine; Ernie isolation; uniform beat layer |
| `PHASE_0_5_TALENT_TO_OWNERSHIP.md` | **CANON** — academy + operating environment; E0.5-1–7 locked |
| `CAPABILITY_REVEAL_ENGINE.md` | Need → tool. Becoming capable, not being trained |
| `ACADEMY_CURRICULUM.md` | What they eventually learn — as missions, not a course |
| `OPERATING_ENVIRONMENT.md` | `/workshop` becomes the bench; GitHub feeds the record |
| `AI_PARTNERS.md` | Burt (Cursor), Ernie (ChatGPT), Oscar (later) |
| `PHASE_1_BUILD_SPEC.md` | Door spec — built |
| `PHASE_1_1_EXPERIENCE_PROOF.md` | **HOLD.** Direction right. Linger pull not proven from stills. |
| `PHASE_1_2_EXPERIENCE_POLISH.md` | **Now.** Room exists without the visitor. Leaving feels premature. |
| `BUILD_DISCIPLINE.md` | **LOCKED.** Preview-close every slice. PR #5. No unpushed pile-up. |
| `COHORT_COMPOSITION.md` | **LOCKED.** 1000-sim 3+2 mix. Learn the work before anyone is chosen. |
| this file | Phases 0–8 and sequencing |

**Code contracts (no UI):** `apps/platform/lib/talent-foundry/implementations/company/` — workshop session, journey, thinking trace, N1/M1 lab seeds, tests. Campaign Kelly types are not imported.

---

## Phase map

| Phase | Name | Outcome | Est. after this pass |
|---|---|---|---|
| **0** | Recovery + architecture | Docs, family index, spine contracts through DELIVER, isolated PR | In this PR. Ernie review still open. |
| **0.5** | Talent-to-ownership experience | Academy + environment + curriculum-as-missions + AI partners. **CANON.** | Approved 2026-09-02 |
| **1** | Mysterious front door | `/workshop` through linger. Anonymous. Room can become an environment. | Built. Gravity not yet proven. |
| **1.1** | Experience proof | Cinematic / polish on the existing door. Linger = unfinished business. Room remembers. **No new journey.** | **HOLD.** Direction right. |
| **1.2** | Experience polish | Same door. Silence, type, threshold, linger pull. Nothing designed to impress. | **APPROVED** 2026-09-02 |
| **2** | First artifact + method turn | MAKE, observed → equipped, Capability Reveal starts | **This pass.** Remember Me held. |
| **3** | Deeper work + training repo | Return, fictional collaborate/respond/deliver, clone / branch / broken build / inspect-data | After they can return |
| **4** | Cohort becomes real | They meet another participant. Cohort objects. GitHub org. Shared repos. | After they can work without destroying the bench |
| **5** | Real-work bridge | Sandbox → supervised Foundry products. Paid **gates** (not payroll) | After real collaboration exists |
| **6** | Talent Command Center | Funnel, tape, GitHub facts, auditable decisions | Thin from 4; full in 6 |
| **7** | Flywheel | Leaders develop next cohort; Oscar may appear; ownership evidence trail | After command center is usable |
| **8** | Employer productization | Configurable commercial product | Only after internal proof |

Do not attempt the entire system in one code pass.

---

## Phase 0 — this turn (complete when PR is open)

- [x] Audit `origin/main` Talent Foundry + FoundryOS identity / ownership / cohort / flywheel docs
- [x] Recover original mission with separated categories
- [x] Parallel architecture
- [x] Company journey + mystery map
- [x] Flywheel, cohort, evidence, human-decision models
- [x] Phase 1 build spec
- [x] Update Talent Foundry index / master plan so Company Foundry is official
- [ ] Ernie review (do not merge)

**Out of scope for Phase 0:** visual implementation, production migrations, frontend, RedDirt, campaign route/copy/QR.

### Waiting passes (this slice — still no UI)

- [x] **Pass A — Thinking trace.** How they think is a first-class flight recorder (`THINKING_TRACE_MODEL.md` + `thinking-trace.ts`). Moves, not types. No score/trait/fit.
- [x] **Pass B — Contracts + lab + future surfaces.** Workshop journey engine, N1/M1 seeds, `workshop.test.ts`, `SCENARIO_LAB.md`, `FUTURE_SURFACES.md`. Phase 1 renders the room against these contracts.
- [x] **Pass C — Observation clocks + Cohort 01 lock.** Silent linger / hesitation / coverage (read vs skim as facts). M1 is **The last draft** — no Tuesday. `COHORT_01`: 3–5 people, work starts **2026-11-15**. Never a seriousness score.
- [x] **Pass D — Master spine + uniform layer.** All 14 stages exist. Ernie-zone (door → linger) is frozen. Uniform beat/envelope lifts every stage equally. Stages 4–14 are stubs; 12–14 also require human gates. No `/workshop` UI. See `SPINE_AND_LAYERS.md`.
- [x] **Pass E — MAKE fill.** Seven interest tracks + artifact submit/abandon. After linger, MAKE is enterable in the envelope; Ernie `stateId` stays `linger`. No UI. REMEMBER still stub.
- [x] **Pass F — REMEMBER fill.** You’ve left something behind. Remember Me (name, email, optional location/school-work) or Keep Exploring. `placeEligible` flag only — no resume table, no account, no UI. RETURN still stub.
- [x] **Pass G — RETURN fill.** Deeper challenge on their track. Gap since last activity is a fact. Anonymous or remembered. No UI. COLLABORATE still stub.
- [x] **Pass H — COLLABORATE fill.** Requires Remember Me. Fictional partner Rafi. Handoff + what they need back. No real cohort. No UI. RESPOND still stub.
- [x] **Pass I — RESPOND fill.** Fictional note from Rafi. Incorporate / hold / ask. Stance is a fact, not a score. No UI. DELIVER still stub.
- [x] **Pass J — DELIVER fill.** Definition of done on their track. Complete or abandon — both close the beat. No grade. No UI. MULTIPLY still stub.
- [x] **Pass K — Phase 0.5 talent-to-ownership architecture.** Academy + operating environment. Curriculum as missions. Burt / Ernie / Oscar. GitHub feeds the record. Partner throughout (posture, not a prize). **Phase 1 screens held.** MULTIPLY / LEAD still stub.
- [x] **Pass L — MULTIPLY fill.** Fictional newer person Nia. Help + what unblocks them. Not a cohort. Not a mentor badge. No UI. LEAD still stub.
- [x] **Pass M — Phase 0.5 accepted.** E0.5-1–7 locked. Capability Reveal Engine. Becoming-capable standard. Training repo must feel like a young product. Phase 1 door cleared. PR #5 stays open.
- [x] **Pass N — LEAD fill.** Outcome + hour + two fictional people. Keep / assign / cut. Not a title. Not an appointment. No UI. BUILD still stub + human gate.
- [x] **Pass Q — BUILD fill.** Supervised sandbox on a real-shaped product. Requires `real_work_access`. Changed / left untouched. Not a job. Not live prod. No UI. EARN still stub + human gate.
- [x] **Pass R — EARN fill.** Classified pay after a human gate (`paid_project` / term / employment). Work + accept. Not a prize. No rate. No UI. OWN still stub + human gate.
- [x] **Pass U — OWN fill.** Founder conversation after `ownership_conversation`. Subject + enter. Not equity granted. Not a partner track. No UI. Spine contracts complete. Phase 2 still held.
- [x] **Pass S — Cohort composition.** 1000 simulations. Starter 3 = navigator / builder / connector. Expand 2 = witness / reframer. Staff organize tapes. Humans still invite. No personality on the door.
- [x] **Pass C0.1 — Composition without automated selection.** Model approved. Production describes missing evidence (`compositionGaps`). No candidate IDs. No ranking. Connector is load-bearing. `teamLift` remains research-only. Phase 2 held.
- [x] **Pass C0.2 — Cohort vacancy intelligence.** After a human assignment, that function closes. Evidence stays on the record. Expansion observations for Witness/Reframer are retained without ranking. No auto-invite.
- [x] **Pass T — Phase 1.2 experience polish.** Same door. Silence, type, threshold, linger pull. Nothing designed to impress. **APPROVED.**
- [x] **Pass V — Phase 2 MAKE open.** Linger bench becomes work. First artifact. Method turn. Observed → equipped. No brochure. No Remember Me. No auto-advance. PR #5 stays open.
- [x] **Pass O — Phase 1.1 experience proof.** Do not advance the journey. Polish the door. Linger metric. Room remembers more than they realize. Phase 2 held.
- [x] **Pass P — Build discipline locked.** Every slice: validate → commit → push → Netlify preview → review. PR #5. Production only on explicit merge.

---

## Hard constraints (all phases)

- Do not modify `/talent-foundry` campaign experience, share URL, or QR.
- Do not write Company people to RedDirt.
- Do not create production migrations until a later approved slice.
- Do not build founder video, careers open, résumé-first, job menu, salary bait.
- Do not auto hire / reject / pay / grant equity.
- Do not port KEY 01 / KEY 02.
- Do not use AI as hiring authority.
- Do not teach the academy as a conventional course catalog or LMS.
- Do not use live FoundryOS / campaign production as a classroom.
- Do not announce a partner track, internship funnel, or Oscar at the public door.

---

## Recommended sequence

1. **Phase 1.2 APPROVED.** Linger gravity accepted. See `PHASE_1_2_EXPERIENCE_POLISH.md`.
2. **Phase 2 MAKE.** First artifact on the existing bench. Observed → equipped. See `PHASE_2_MAKE.md`.
3. Remember Me and setup missions wait for a later Phase 2 slice.
4. Keep building on this branch. Do not merge PR #5 yet.

---

## Validation posture (future code phases)

- FoundryOS worktree + `$env:CI='1'` for hooks (H-drive junction pattern).
- Typecheck / lint `@foundry/platform` on touched packages.
- Do not run destructive Prisma/Supabase resets.
- Browser-verify workshop flows when UI exists.
- Campaign smoke (`/talent-foundry`) must still pass after any shared-core extraction.

---

## Git

- Isolated branch only. PR **#5** while Phase 1 is under review.
- One meaningful pass → one conventional commit → **push immediately**.
- Close gate is the **Netlify Preview Deploy**, not production.
- Do not commit `.env`, secrets, `tsconfig.tsbuildinfo`.
- Do not merge until Ernie says so.
- See `BUILD_DISCIPLINE.md`.
