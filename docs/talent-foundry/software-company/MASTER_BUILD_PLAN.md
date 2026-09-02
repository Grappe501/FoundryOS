# Company Foundry — Master Build Plan

**Program:** Talent Foundry implementation #2 — software-company talent flywheel  
**Branch:** `feat/talent-foundry-company-phase-0`  
**Rule:** Do not alter live Campaign Foundry. Do not modify RedDirt. Do not merge until Ernie reviews.

This is **not** the Kelly Grappe experience with different copy.

---

## Mission

Build a system that discovers overlooked people by what they can actually **do**.

```txt
DISCOVER → ENGAGE → CREATE → COLLABORATE → PROVE → DEVELOP
  → PLACE → BUILD → LEAD → OWN → BRING IN THE NEXT GENERATION
```

The system may discover interns, builders, designers, researchers, operators, product thinkers, marketers, organizers, technical generalists, future employees, future leads, potential long-term partners.

**Those labels are never assigned psychologically or automatically.**  
People demonstrate capability. Humans decide placement, employment, compensation, leadership, and ownership.

**Don’t ask people what they are. Give them something worth doing and watch what they do.**  
**Don’t ask them how they think. Give them unfinished work and keep the tape.**

---

## Official family position

| Implementation | Status | Index |
|---|---|---|
| Campaign Foundry | Live V1.2 on `/talent-foundry` | `docs/talent-foundry/README.md` |
| **Company Foundry** | Phase 0 (this directory) | this file |
| Employer Foundry | Future Phase 8 | `PARALLEL_ARCHITECTURE.md` |

Campaign architecture lock (“not a lifelong world,” RedDirt identity) remains **campaign-scoped**. Company Foundry reopens the world question: this implementation **is** a FoundryOS-world flywheel.

---

## Document set (Phase 0)

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
| `PHASE_1_BUILD_SPEC.md` | Exact next build |
| this file | Phases 0–8 and sequencing |

**Code contracts (no UI):** `apps/platform/lib/talent-foundry/implementations/company/` — workshop session, journey, thinking trace, N1/M1 lab seeds, tests. Campaign Kelly types are not imported.

---

## Phase map

| Phase | Name | Outcome | Est. after this pass |
|---|---|---|---|
| **0** | Recovery + architecture | Docs, family index, isolated PR | **This PR. Ready for Ernie review.** |
| **1** | Mysterious front door | `/workshop` through NOTICE + THE MESS + first revelation. Anonymous. No identity. No Kelly code path | Next implementation slice |
| **2** | First artifact + identity | Track choice, small creation, Remember Me, SAVE MY PLACE (company token space) | After Phase 1 feels fascinating |
| **3** | Deeper work | Return challenge, feedback, revision, delivery | After artifacts exist |
| **4** | Cohort engine | Cohort / members / mentors / projects / invites | After return work exists |
| **5** | Real-work bridge | Sandbox → supervised → paid **gates** (not the full payroll system) | After cohort proves collaboration |
| **6** | Talent Command Center | Funnel, people, work, cohorts, auditable decisions | Can start thin in 4–5; full in 6 |
| **7** | Flywheel | Leaders develop next cohort; ownership evidence trail | After command center is usable |
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

---

## Hard constraints (all phases)

- Do not modify `/talent-foundry` campaign experience, share URL, or QR.
- Do not write Company people to RedDirt.
- Do not create production migrations until a later approved slice.
- Do not build founder video, careers open, résumé-first, job menu, salary bait.
- Do not auto hire / reject / pay / grant equity.
- Do not port KEY 01 / KEY 02.
- Do not use AI as hiring authority.

---

## Recommended sequence after Ernie approves Phase 0

1. Ernie decisions in `PHASE_1_BUILD_SPEC.md` (route, opening copy, first mess).
2. Isolated branch `feat/talent-foundry-company-phase-1` from updated `main` or this branch.
3. Build Phase 1 only. Local session. No identity API. No RedDirt.
4. Phone-width walkthrough: stranger → ENTER → notice → mess → revelation → leave fascinated.
5. Separate PR. Do not merge on the same day as campaign changes.

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
