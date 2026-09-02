# Company Foundry — Master Build Plan

**Program:** Talent Foundry implementation #2 — software-company talent-to-ownership academy and operating environment  
**Branch:** `feat/talent-foundry-company-phase-0`  
**Rule:** Do not alter live Campaign Foundry. Do not modify RedDirt. Do not merge until Ernie reviews.  
**Now:** Phase 0 + 0.5 **approved**. Phase 1 door is cleared. Keep building on this branch; **do not merge PR #5 yet**.

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
| **Company Foundry** | Phase 0 + **0.5** (this directory) | this file |
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
| `PHASE_1_BUILD_SPEC.md` | **CLEARED** — `/workshop` through linger |
| this file | Phases 0–8 and sequencing |

**Code contracts (no UI):** `apps/platform/lib/talent-foundry/implementations/company/` — workshop session, journey, thinking trace, N1/M1 lab seeds, tests. Campaign Kelly types are not imported.

---

## Phase map

| Phase | Name | Outcome | Est. after this pass |
|---|---|---|---|
| **0** | Recovery + architecture | Docs, family index, spine contracts through DELIVER, isolated PR | In this PR. Ernie review still open. |
| **0.5** | Talent-to-ownership experience | Academy + environment + curriculum-as-missions + AI partners. **CANON.** | Approved 2026-09-02 |
| **1** | Mysterious front door | `/workshop` through NOTICE + THE MESS + first revelation. Anonymous. Room left able to become an environment. | **Cleared. Building now.** |
| **2** | First artifact + method turn | MAKE, “how we make things here,” Remember Me, first setup missions | After the door fascinates |
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

1. **Phase 0.5 accepted.** Keep building on `feat/talent-foundry-company-phase-0`. Do not merge PR #5 yet.
2. Build Phase 1 door only (`/workshop` through linger). Local session. No identity, GitHub, Cursor, API, Oscar, cohort.
3. The room is the future environment — do not throw it away after the puzzle.
4. Phone-width walkthrough: stranger → ENTER → notice → mess → revelation → leave fascinated.
5. Do not merge on the same day as campaign changes.

---

## Validation posture (future code phases)

- FoundryOS worktree + `$env:CI='1'` for hooks (H-drive junction pattern).
- Typecheck / lint `@foundry/platform` on touched packages.
- Do not run destructive Prisma/Supabase resets.
- Browser-verify workshop flows when UI exists.
- Campaign smoke (`/talent-foundry`) must still pass after any shared-core extraction.

---

## Git

- Isolated branch only.
- Conventional commits.
- Do not commit `.env`, secrets, `tsconfig.tsbuildinfo`.
- Do not merge until Ernie says so.
