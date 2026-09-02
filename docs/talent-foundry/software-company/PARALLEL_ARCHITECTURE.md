# Company Foundry — Parallel Architecture

**Status:** Phase 0. Design only. No migrations. No frontend.  
**Principle:** Campaign and Company share Talent Foundry **infrastructure** without becoming coupled **experiences**.

---

## Family

```txt
Talent Foundry Core
├── Campaign Foundry     Kelly Grappe beta          LIVE
├── Company Foundry      Foundry software-company   THIS PROGRAM
└── Employer Foundry     configurable commercial    FUTURE (Phase 8)
```

| | Campaign Foundry | Company Foundry | Employer Foundry |
|---|---|---|---|
| Public question | Will you show up? | What can you build, improve, lead, and multiply? | Configurable |
| Route | `/talent-foundry` | `/workshop` (public) · `/talent-foundry/build` (alias) | TBD |
| Share / QR | `https://foundry-os.netlify.app/talent-foundry` | New URL. Never the campaign QR | Tenant URL |
| Person store | RedDirt `User` | FoundryOS `foundry_people` → later `user_profiles` | Tenant people |
| Identity timing | After Visit One scenario + Key One | After first meaningful artifact | Configurable |
| Opening reveal | People Rule → Kelly video | Workshop notices you. Company stays hidden | Tenant brand later |
| Work type | Decisions, simulated shift, fictional people | Observation → artifact → method → training repo → cohort → Foundry products | Tenant work |
| Staff surface | RedDirt `/admin/talent-foundry` | FoundryOS Talent Command Center | Tenant console |
| Writes RedDirt | Yes (identify / continue) | **Never** | Never |

---

## Talent Foundry Core (extract, do not fork blindly)

Reusable **craft and libraries**. Not reusable **copy, routes, or person writes**.

### Share now (as libraries / patterns)

| Core piece | Today | Company use |
|---|---|---|
| Journey / visit state machine pattern | `lib/talent-foundry/journey.ts`, `visit.ts` | New company state machine. Do not extend Kelly `JourneyStateId` with company states |
| Scenario engine | `scenario-engine.ts` | New company scenarios; same beat/decision/consequence shape if it still fits |
| Operator engine | `operator/*` | Later company “mess / operating picture” missions. New content. Do not load THE SHIFT |
| Leader engine | `leader/*` | Later multiply/lead stages. New people. Never Layer 3 campaign composites |
| Session local persistence | `session.ts` + `sessionStorage` | Separate session key (`tf.company.v1` or `workshop.v1`) |
| Evidence item shape | `types.ts` `EvidenceItem` | Shared factual item; company dimensions will differ (see evidence model) |
| SAVE MY PLACE token crypto | `resume/token.ts` | **Reuse as a library** |
| Resume HTTP 404 / TTL / RLS doctrine | V1.2 spec | Reuse doctrine; **separate table or discriminator** |
| Share QR takeover shell | `ShareQrTakeover.tsx` | New asset + new canonical URL |
| Cinematic full-viewport shell | layout + CSS | New visual language (workshop, not campaign grain) |
| Haptics / reduced motion | `haptic.ts` | Reuse restraint rules |
| Consumer middleware prefix | `CONSUMER_PREFIXES` includes `/talent-foundry` | Add `/workshop` when Phase 1 ships. Do not remove `/talent-foundry` |
| Human / AI doctrine | campaign specs | Inherit and tighten (see evidence model) |

### Must not share

| Coupled today | Why it stays campaign-only |
|---|---|
| `campaigns/kelly.ts` and all Kelly copy | Campaign doctrine, People Rule, intern $20/hr |
| `KellyVideoStage.tsx` | Founder/candidate video is forbidden in Company Foundry |
| `/api/talent-foundry/identify` and `/continue` | RedDirt writes |
| `reddirt.ts` | Campaign person pipeline |
| `TALENT_FOUNDRY_SHARE_URL` / campaign QR files | Hard lock. Company gets its own constants |
| `talent_foundry_resumes.reddirt_submission_id` as person key | Company has no RedDirt person |
| Visit intent `volunteer` / `paid` / `both` | Employment labels too early |
| `KEY 01` / `KEY 02` ceremony | Enumerable progression |
| RedDirt admin review | Wrong world |

### Extraction rule for later code phases

```txt
apps/platform/lib/talent-foundry/
  core/                 shared engines, tokens, evidence types
  implementations/
    campaign/           kelly config, reddirt, visit one
    company/            workshop journey, artifacts, people
```

Do **not** perform this file move in Phase 0 or Phase 1 unless a collision appears. Phase 1 should add `implementations/company/` beside existing files and leave campaign paths untouched.

---

## Route recommendation

| Role | Path | Why |
|---|---|---|
| **Public mystery door** | `/workshop` | Matches “YOU FOUND THE WORKSHOP.” Does not print “Talent Foundry” in the URL before the first revelation. |
| **Documented working alias** | `/talent-foundry/build` | Already under the consumer prefix. Useful for internal review. Should 301 to `/workshop` once the public door exists, or render the same experience without campaign chrome. |
| **Campaign (unchanged)** | `/talent-foundry` | Live Kelly experience. |
| **Company resume** | `/workshop/resume/<token>` | Parallel to campaign `/talent-foundry/resume/<token>`. Different token space. |
| **Future command center** | `/operator/talent` or `/operator/workshop` | Staff-only. Not Phase 1. |

Phase 1 build spec uses `/workshop` as the implementation target and may also mount `/talent-foundry/build` as an identical entry if Ernie wants a Foundry-namespaced URL for staff. The **share URL must be the mysterious door**, not the namespaced alias.

Middleware: adding `/workshop` to `CONSUMER_PREFIXES` is required before the route can render. That is a one-line platform change and does not alter the campaign route.

---

## Identity architecture (FoundryOS world)

### Do not create a duplicate person universe

FoundryOS already has a signed-in person: `auth.users` → `user_profiles`.  
Campaign Foundry already has a volunteer person: RedDirt `User`.  
Company Foundry must not invent a third *meaning* of “person.” It may introduce a **pre-auth Foundry person** that later **becomes** the signed-in person.

### Ladder (one universe, staged)

```txt
1. Anonymous workshop session
   local sessionStorage only (Phase 1)
   optional later: anonymous snapshot without PII

2. Remembered Foundry person          ← first identity checkpoint
   FoundryOS table: foundry_people
   fields: name, email, optional phone/location/school-work
   no password, no auth.users, no résumé
   no RedDirt write

3. SAVE MY PLACE
   opaque token → company resume table
   points at foundry_person_id + journey snapshot
   still no account

4. Foundry account (only when needed)
   auth.users + user_profiles
   foundry_people.auth_user_id = user_profiles.id
   Portable Identity world_slug: workshop
   artifacts / memories attach here

5. Employment / pay / ownership
   never a row-type on foundry_people
   explicit human decision records + legal agreements outside this table
```

`foundry_people` is a **FoundryOS canonical pre-auth identity**, not a Talent Foundry silo. Future Employer Foundry and other Foundry surfaces should be able to link to it. Phase 0 designs the model. **No migration in this pass.**

### Rejected identity options

| Option | Why reject |
|---|---|
| Write Company participants to RedDirt | Wrong world. Pollutes campaign volunteer SoR |
| Require `auth.users` at Remember Me | Account too early; kills mystery; forces Portable Identity stack |
| Reuse `beta_waitlist` | Tester-cohort product, not builders |
| Store people only in SAVE MY PLACE snapshots | Snapshots are journey state, not a person SoR |
| New `company_users` disconnected from `user_profiles` | Second Foundry person universe |
| Use `ownership-graph.trust_score` as hiring signal | Adjacent metric; must never become an employability score |

---

## Session architecture

| | Campaign | Company |
|---|---|---|
| Storage key | `tf.kelly.v1` (campaign sessionKey) | `workshop.v1` (proposed) |
| Shape version | `v: 1` Kelly `TalentFoundrySession` | Separate company session type |
| Remote SoR before identity | None | None (Phase 1) |
| Remote SoR after identity | RedDirt submission + resume snapshot | `foundry_people` + company resume snapshot |
| Continue-merge | `/api/talent-foundry/continue` | New company routes only. Never call identify/continue |

Phase 1 stays local-only. Do not create production tables.

---

## Data boundary

```txt
Campaign Foundry
  browser → FoundryOS TF APIs → RedDirt /api/forms
  browser → FoundryOS resume API → talent_foundry_resumes (campaign_id = kelly)

Company Foundry
  browser → FoundryOS workshop APIs only
  browser → FoundryOS company resume API → separate table / implementation = company
  no RedDirt client or server calls
```

FoundryOS Supabase project remains the company store (same project as SAVE MY PLACE). RedDirt / Kelly-Grappe-App stays campaign-only.

---

## Staff surfaces

| Surface | Owner | Phase |
|---|---|---|
| RedDirt Talent Foundry dashboard | Campaign | Live / campaign backlog |
| Workshop review (thin) | FoundryOS operator | Phase 2–3 |
| Talent Command Center | FoundryOS | Phase 6 |
| Employer console | Commercial | Phase 8 |

Company staff must never need RedDirt to review a workshop participant.

---

## Visual / middleware isolation

- Company CSS and components live under `components/talent-foundry/workshop/` (or `company/`).
- Do not import `OpeningScreens`, `VisitScreens`, `KellyVideoStage`, or campaign `ConversionScreens` into the workshop.
- Campaign layout (`app/talent-foundry/layout.tsx`) stays campaign-owned. Workshop gets its own `app/workshop/` tree.
- `/talent-foundry/build` if mounted must not render `TalentFoundryExperience` (Kelly). It renders the workshop or redirects.

---

## Employer Foundry (placeholder only)

Productize only after Company Foundry proves the model internally (Phase 8). Anticipated tenant config: door copy, scenarios, artifact tracks, cohort size, staff roles, person-store adapter. Do not design tenant billing or white-label in Phase 0 beyond this sentence.
