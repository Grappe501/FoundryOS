# Talent Foundry — Master Build Plan

**Date:** 2026-08-31 (campaign P0) · family update 2026-09-01  
**Repos:** `H:\FoundryOS` (public experience) · `H:\SOSWebsite\RedDirt` (Campaign Foundry identity + staff review only)  
**Live FoundryOS:** https://foundry-os.netlify.app/  
**Campaign QR (locked):** `https://foundry-os.netlify.app/talent-foundry`

**Campaign Foundry is live on `main` through V1.2** (`4ed26c0`) — Visit One compression, Layers 2–3, SAVE MY PLACE, Key One share. See `V1_2_SAVE_MY_PLACE_SPEC.md` and `V1_2_SHARE_MOMENT_SPEC.md`. Do not revert V1.1/V1.2.

This file remains the **Campaign Foundry** executable plan. Campaign-specific copy lives in configuration. FoundryOS owns the reusable journey engine. **RedDirt remains the only person database for the Kelly campaign.**

---

## Parallel implementations (official)

Talent Foundry is no longer only the Kelly beta.

| Implementation | Plan | Person store | Do not |
|---|---|---|---|
| **Campaign Foundry** | this file + `README.md` | RedDirt | Change live `/talent-foundry` or campaign QR while building Company Foundry |
| **Company Foundry** | `docs/talent-foundry/software-company/MASTER_BUILD_PLAN.md` | FoundryOS (not RedDirt) | Reskin Kelly copy; write campaign people into RedDirt |
| **Employer Foundry** | Phase 8 in the company plan | Tenant | Productize before the internal flywheel is real |

**Architecture lock below is campaign-scoped.** Company Foundry reopens “not a lifelong world”: the software-company implementation is a FoundryOS-world flywheel. See `software-company/PARALLEL_ARCHITECTURE.md`.

**PL-8 / PL-11** (multi-tenant registry, commercial packaging) remain post-launch for *campaign* tenancy. Company Foundry is Beta #2 from `kelly-grappe-beta/MASTER_BUILD_DISCOVERY.md`, not a Kelly config swap.

---

## Architecture lock — Campaign Foundry only (do not reopen unless a hard blocker appears)

| Concern | Decision |
|---------|----------|
| Public experience | New isolated consumer route in existing `@foundry/platform`: `/talent-foundry` |
| New FoundryOS app? | **No.** `apps/platform` already deploys to Netlify. A second app would delay launch. |
| New FoundryOS world? | **No.** Worlds inherit operator-redirect middleware and academy machinery. Talent Foundry is a campaign-configured product surface, not a lifelong world. |
| Campaign content | `apps/platform/lib/talent-foundry/campaigns/kelly.ts` — tenant/config, not product kernel |
| Reusable engine | `apps/platform/lib/talent-foundry/` state machine + session + evidence types |
| Canonical identity | RedDirt `User` upsert-by-email via existing `volunteer` form → `/api/forms` → `persistFormSubmission` |
| Evidence storage (P0) | Attach JSON on the same `Submission.structuredData` + `WorkflowIntake.metadata`. **No Prisma migration today.** |
| Staff review fields (P0) | Store on `WorkflowIntake.metadata.talentFoundry` (rank, intern decision, pathway, assignment, notes). Reuse `assignedUserId` for team contact. |
| File-based volunteer store | **Do not use.** `data/campaign-events/volunteers/*` is a separate event-planning store, not canonical people. |
| Cross-app transport | FoundryOS server route posts to RedDirt `/api/forms`. Browser never talks to RedDirt admin. |
| CORS | Prefer server-to-server (no browser CORS). Also add Foundry origin to RedDirt `FORMS_CORS_ORIGINS` as defense in depth. |
| Auth for public experience | None. QR-entry, no login. |
| Auth for dashboard | Existing RedDirt `requireAdminPage()` under `/admin/(board)/talent-foundry` |
| Human decision boundary | Organize evidence only. No AI hire/reject score. |

---

## TODAY — P0 MVP

Goal: a phone user can finish the cinematic journey, become a canonical RedDirt volunteer, and appear on a private staff review surface.

### P0-S1 — Experience shell + opening journey

**Status:** first implementation slice  
**Objective:** Ship a mobile-first `/talent-foundry` route that feels unlike a form. Walk ENTRY → mystery → change prompt → acknowledgment → People Rule → willingness. Persist journey state locally.

**Files / systems**

- `apps/platform/middleware.ts` — allow `/talent-foundry` as a consumer path (otherwise it redirects to `/operator/...`)
- `apps/platform/app/talent-foundry/**`
- `apps/platform/lib/talent-foundry/**`
- `apps/platform/components/talent-foundry/**`
- `docs/talent-foundry/*` (this plan + audits)

**Dependencies:** none (no RedDirt write yet)

**Implementation**

1. Add `/talent-foundry` to `CONSUMER_PREFIXES`.
2. Create campaign-agnostic journey types + Kelly config.
3. Build a full-viewport cinematic shell with session persistence.
4. Implement the six opening states with large tap targets.
5. Capture change-prompt text and willingness choice as evidence (local only).

**Validation**

- `npm run typecheck -w @foundry/platform` (or root `npm run typecheck` if time allows)
- Manual phone-width walkthrough of `/talent-foundry`

**Success**

- QR-ready URL exists locally and will deploy with `main`.
- No internship/application chrome.
- Session survives refresh.

**Commit / deploy:** FoundryOS only. Push `main` → Netlify.

---

### P0-S2 — Required Layer 1 volunteer scenario

**Objective:** HQ “five volunteers, no instructions” scenario with several decisions before consequences, then self-revision.

**Files / systems**

- `apps/platform/lib/talent-foundry/scenarios/volunteers.ts`
- Scenario renderer inside the experience
- Evidence writer for decisions / consequences / revision

**Dependencies:** P0-S1 session + evidence types

**Implementation**

1. Encode the seed situation and evolving facts as config, not hardcoded JSX trees.
2. Collect 4–6 decisions before revealing consequences.
3. Show consequences without mapping them to specific prior clicks.
4. Ask “would you do anything differently?” and store the revision.
5. Do not display scores or staff observations.

**Validation:** typecheck + walk the scenario on a phone viewport.

**Success:** a complete required scenario produces structured evidence in session.

**Commit / deploy:** FoundryOS.

---

### P0-S3 — Kelly video, commitment, lead challenge, optional doors (gated)

**Objective:** Complete the mid-journey emotional arc and leave optional Layer 1 doors feature-gated but architected.

**Files / systems**

- Kelly campaign config (video URL slot — placeholder if asset not uploaded)
- Willingness → video → volunteer commitment → “Think you can lead this?”
- Optional door registry: THE ROOM / THE CALL / THE BREAKDOWN / THE ASK
- Key One eligibility flag (awarded only if all optional doors completed — post-P0 content can remain locked)

**Dependencies:** P0-S2 required scenario complete before identity

**Implementation**

1. Insert Kelly direct-to-camera slot after willingness (poster + play; no internship pitch).
2. Ask for volunteer commitment (yes / limited / not now). Not-now may continue public journey but is flagged ineligible for paid-intern pathway.
3. Present the lead challenge and scenario framing copy.
4. After required scenario, offer optional doors as mysterious labels. If content is unfinished, show “not open yet” without breaking the journey.
5. Preserve Layer 2 / Layer 3 states in the machine, feature-gated.

**Validation:** typecheck + journey from entry through required scenario + door prompt.

**Success:** video slot exists; commitment captured; optional layer architecture present.

**Commit / deploy:** FoundryOS.

---

### P0-S4 — Identity checkpoint + canonical RedDirt write — IMPLEMENTED with P0-S5

**Implemented 2026-08-31.** See `REDDIRT_INTEGRATION_AUDIT.md` for live contract.

- Browser → `POST /api/talent-foundry/identify` → RedDirt `POST /api/forms` (`formType: volunteer`, `sourceCampaign: talent-foundry-kelly-beta`)
- Continue (routing/mission) → `POST /api/talent-foundry/continue` → same `/api/forms` with `talentFoundry.phase: continue` + `submissionId` (updates same Submission/Intake; email must match User)
- Env: `REDDIRT_FORMS_URL`

### P0-S4 — Identity checkpoint + canonical RedDirt write (original plan)

**Objective:** `WHO ARE YOU?` creates/links the same RedDirt volunteer person used by the public volunteer form.

**Files / systems — FoundryOS**

- `apps/platform/app/api/talent-foundry/identify/route.ts` (server proxy)
- Identity screen + “[First name], you’re in.”
- `.env.example` + `REDDIRT_FORMS_URL`

**Files / systems — RedDirt**

- `src/lib/forms/schemas.ts` — optional `talentFoundry` object on `volunteerSchema` (additive)
- `src/lib/forms/handlers.ts` — persist blob onto `Submission.structuredData` + `WorkflowIntake.metadata`; set `sourceCampaign: talent_foundry_kelly`
- `src/lib/forms/cors.ts` — add Foundry production + local origins (or document `FORMS_CORS_ORIGINS`)
- **Do not** create a new person model. **Do not** write the file-based volunteer store.

**Dependencies:** P0-S2 evidence in session; RedDirt production `/api/forms` reachable

**Implementation**

1. Collect first/last/phone/email/ZIP/start date only.
2. FoundryOS server posts `formType: "volunteer"` with attribution + `talentFoundry` evidence.
3. Reuse `User.upsert({ email })`, `VolunteerProfile.upsert`, `Commitment`, `Submission`, `WorkflowIntake`, optional solo team provision.
4. Retain `submissionId`, `userId`, `workflowIntakeId` in session (not secrets).
5. If RedDirt is down, keep evidence locally and show a retry — do not invent a second person store.

**Validation**

- FoundryOS typecheck
- RedDirt `npm run typecheck` on touched files (full `npm run check` if time)
- One synthetic submission (no real PII in fixtures)

**Success:** repeating the same email updates the same `User`; a new email creates one `User` + volunteer profile.

**Commit / deploy:** FoundryOS + RedDirt (additive schema/handler only). RedDirt working tree already has unrelated dirty files — **commit only Talent Foundry files**.

---

### P0-S5 — Statewide pathway, first mission, human handoff

**Objective:** After identity, clarify participation vs paid intern, route a statewide path, assign one real first mission, then stop automation.

**Files / systems**

- Pathway chooser (config enums)
- Mission One library (small, safe, geography-aware)
- Handoff screen: `YOU SHOWED UP. NOW WE DO.`
- Persist pathway + mission onto the same RedDirt submission/intake metadata (PATCH-via-follow-up volunteer submit or intake metadata update endpoint if already identified)

**Dependencies:** P0-S4 identifiers

**Implementation**

1. Safe paid-opportunity copy (one $20/hr role now; no promises).
2. Path options: remote digital, local organizer, campus/school, events, comms/creative, research, HQ, fundraising, field, volunteer leadership.
3. One mission per path (share a post, text 3 people, find a campus bulletin board, etc.).
4. Stop. No automated mission two.

**Validation:** typecheck + finish a full happy path on phone.

**Success:** nobody ends on “we’ll be in touch” with no next action.

**Commit / deploy:** FoundryOS (+ small RedDirt metadata write if needed).

---

### P0-S6 — Private RedDirt Talent Foundry dashboard

**Objective:** Staff can find every identified participant and operate human review fields.

**Files / systems — RedDirt only**

- `src/app/admin/(board)/talent-foundry/page.tsx` (list)
- `src/app/admin/(board)/talent-foundry/[intakeId]/page.tsx` (detail)
- Server actions to update `WorkflowIntake.metadata.talentFoundry` + `assignedUserId`
- `WorkflowAction` NOTE rows for staff notes
- Nav entry in existing admin board nav (smallest safe hook)

**Dependencies:** P0-S4 writes `sourceCampaign` / `metadata.talentFoundry`

**Implementation**

1. Query `WorkflowIntake` where metadata marks Talent Foundry (same pattern as volunteer-kickoff triage).
2. List: name, email, phone, ZIP, start date, commitment, journey completion, keys/layers.
3. Detail: organized evidence dimensions (no score), scenario answers, staff controls.
4. Controls: team contact, interviewer, human rank, intern decision pending/yes/no, pathway, area assignment, notes.
5. No AI ranking. Interview times stay manual.

**Validation:** RedDirt typecheck/lint on new files; open `/admin/talent-foundry` behind existing admin auth.

**Success:** one synthetic participant is visible and editable without touching the public volunteer form.

**Commit / deploy:** RedDirt only, Talent Foundry files only.

---

## TODAY definition of done

A phone user can:

1. Open `/talent-foundry`
2. Complete the cinematic opening + required scenario
3. Identify themselves
4. Land in RedDirt as the same volunteer person the public form would create
5. Receive a first mission and a human handoff

Staff can open `/admin/talent-foundry`, inspect evidence, assign an owner, rank, and set intern/pathway/assignment.

---

## POST-LAUNCH (do not block today)

| ID | Item |
|----|------|
| PL-1 | Real Kelly video asset + poster in campaign media |
| PL-2 | Full optional door scenarios (Room / Call / Breakdown / Ask) |
| PL-3 | Key One ceremony + Layer 2 operator mission — **live on `main`**. |
| PL-4 | Layer 3 leader loop (composite profiles only) — isolated branch `feat/talent-foundry-layer-3-leader`. |
| PL-5 | Voice capture with text fallback |
| PL-6 | Dedicated Prisma `TalentFoundryReview` model (additive migration) once JSON metadata proves the shape |
| PL-7 | Follow-up evidence PATCH without a second volunteer Commitment |
| PL-8 | Multi-tenant FoundryOS campaign registry beyond Kelly |
| PL-9 | Automated volunteer progression after Mission One |
| PL-10 | Interview scheduling |
| PL-11 | Generalized commercial Talent Foundry packaging |
| PL-12 | Analytics beyond basic completion events |

---

## Validation commands

### FoundryOS (`H:\FoundryOS`)

```powershell
cd H:\FoundryOS
.\scripts\setup-h-drive.ps1
node scripts\enforce-h-drive.js
npm run typecheck -w @foundry/platform
npm run lint -w @foundry/platform
npm run build:platform
```

Minimum for a slice: workspace typecheck + lint on touched packages.

### RedDirt (`H:\SOSWebsite\RedDirt`)

```powershell
cd H:\SOSWebsite\RedDirt
npm run typecheck
npm run lint
# full gate when time allows:
npm run check
```

If Prisma schema is touched (post-launch only unless additive and approved):

```powershell
npx prisma validate
```

**Do not** run destructive `prisma migrate reset` against production.

---

## Git rules for this mission

- FoundryOS: commit on `main` after each completed slice; push to deploy.
- RedDirt: branch is `feat/kelly-across-arkansas-visits` with **39 unrelated dirty files**. Never revert them. Stage only Talent Foundry paths.
- Do not commit `.env.local`, secrets, or `tsconfig.tsbuildinfo`.
- Do not use `H:\RedDirt` (empty clone, no commits).
