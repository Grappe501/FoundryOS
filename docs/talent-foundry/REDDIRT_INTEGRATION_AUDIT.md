# Talent Foundry — RedDirt Integration Audit

**Audited:** 2026-08-31  
**Canonical RedDirt path:** `H:\SOSWebsite\RedDirt`  
**Ignored clone:** `H:\RedDirt` (git remote exists, **zero commits** — do not use)  
**Branch:** `feat/kelly-across-arkansas-visits` tracking `origin/feat/kelly-across-arkansas-visits`  
**Working tree:** dirty — 39 unrelated modified/deleted files. Preserve them.

This document records the **current local implementation**, not the intended product.

---

## 1. Canonical volunteer submission flow (verified)

```
src/app/(site)/volunteer/page.tsx
  → VolunteerOnboardingPage
    → VolunteerForm                          (when native form enabled)
      → POST /api/forms
        → formCorsPreflight / withFormCors
        → rateLimit(`forms:${ip}`, 12 / 60s)
        → formSubmissionSchema.safeParse
        → persistFormSubmission
```

| Step | Path |
|------|------|
| Public page | `H:\SOSWebsite\RedDirt\src\app\(site)\volunteer\page.tsx` |
| Onboarding UI | `H:\SOSWebsite\RedDirt\src\components\volunteer\VolunteerOnboardingPage.tsx` |
| Form | `H:\SOSWebsite\RedDirt\src\components\forms\VolunteerForm.tsx` |
| Schema | `H:\SOSWebsite\RedDirt\src\lib\forms\schemas.ts` → `volunteerSchema` |
| API | `H:\SOSWebsite\RedDirt\src\app\api\forms\route.ts` |
| Persist | `H:\SOSWebsite\RedDirt\src\lib\forms\handlers.ts` → `persistFormSubmission` |
| CORS | `H:\SOSWebsite\RedDirt\src\lib\forms\cors.ts` |
| Rate limit | `H:\SOSWebsite\RedDirt\src\lib\rate-limit.ts` via `clientIp` |

`VolunteerForm` posts `formType: "volunteer"` with first/last/email/phone/ZIP/county/city, preferred role/language, student/campus, interest flags, notes, availability, skills, attribution, honeypot `website`.

---

## 2. What `persistFormSubmission` writes (volunteer)

Verified in `handlers.ts` for `formType === "volunteer"`:

| Model | Operation | Key |
|-------|-----------|-----|
| `User` | `upsert` where `email` (lowercased, trimmed) | Canonical person |
| `VolunteerProfile` | `upsert` where `userId` | availability, skills, leadershipInterest |
| `Commitment` | `create` `type: "volunteer"` | role/language/student/hosting/fundraising metadata |
| `VolunteerOpsTeam` + members | `provisionVolunteerOpsSoloTeam` (best-effort) | solo team slug |
| `Submission` | `create` `type: "volunteer"` | `content` summary + `structuredData` |
| `WorkflowIntake` | `create` `status: PENDING` | `source: "volunteer"`, metadata JSON |
| `ContactPreference` | `applyPublicFormConsent` (best-effort) | email/sms/phone consent |
| `WorkflowAction` | `recordPublicFormWorkflowAction` (best-effort) | audit of form create |
| Ops email | `sendVolunteerSignupOpsNotification` | staff ping |

Related models touched by the same handler for other form types (not required for TF identity): `Commitment` (referendum), story `Submission`, Ask Kelly intake.

### Identifier meanings (API response)

Returned by `POST /api/forms`:

| Field | Meaning |
|-------|---------|
| `submissionId` | `Submission.id` — this form event’s record |
| `userId` | `User.id` — canonical person (email unique) |
| `workflowIntakeId` | `WorkflowIntake.id` — operator queue row (1:1 with submission) |
| `volunteerTeamSlug` | `VolunteerOpsTeam.slug` if solo team provision succeeded |

Talent Foundry may retain these three IDs in the participant session. They are not secrets, but they are internal identifiers — do not display them to the public.

---

## 3. Identity matching / deduplication (current)

**Email is the only match key.**

```ts
prisma.user.upsert({
  where: { email }, // lowercased
  create: { email, name, phone, zip, county, interests },
  update: { name, phone, zip, county, interests? },
});
```

- Same email → same `User`. Phone/ZIP/name are overwritten on update.
- No phone-number match. No fuzzy name match. No `Contact` person model separate from `User`.
- `VolunteerProfile` is 1:1 on `userId` — second volunteer submit updates the same profile.
- Each submit still creates a **new** `Submission`, `Commitment`, and `WorkflowIntake`.
- Duplicate risk: a person who uses a different email becomes a second `User`. That is existing RedDirt behavior; Talent Foundry must not invent a parallel matcher.

There is no separate `Person` or CRM `Contact` model for public form identity. `RelationalContact` exists and can be linked later via `WorkflowIntake.relationalContactId`; public volunteer persist does not create it today.

---

## 4. Prisma models involved (identity spine)

From `H:\SOSWebsite\RedDirt\prisma\schema.prisma`:

- `User` — `id`, unique `email`, `name`, `phone`, `zip`, `county`, `interests[]`
- `VolunteerProfile` — `userId` unique, `availability`, `skills`, `leadershipInterest`, `boardOnboardedAt`
- `Commitment` — `userId`, `type`, `metadata` JSON
- `Submission` — `userId?`, `type`, `content`, `structuredData` JSON
- `WorkflowIntake` — `submissionId` unique, `assignedUserId`, `status`, `title`, `source`, `metadata` JSON, `relationalContactId`
- `WorkflowAction` — notes / assignment / decision audit on an intake
- `ContactPreference` — consent
- `VolunteerOpsTeam` / `VolunteerOpsTeamMember` / `VolunteerOpsTeamInvitation`

**Reusable staff infrastructure already on `User` / intake:**

- `WorkflowIntake.assignedUserId` — staff owner
- `WorkflowAction` kind `NOTE` / `ASSIGNMENT` / `DECISION`
- Campaign tasks (`CampaignTask` assignee relations on `User`)
- Communication threads, email workflow items

**Not used for P0:** file-based volunteer command center (below).

---

## 5. Two volunteer systems (duplication risk)

| System | Location | Role |
|--------|----------|------|
| **Canonical Prisma pipeline** | `User` + `VolunteerProfile` + `Submission` + `WorkflowIntake` | Public `/volunteer` and `/api/forms` |
| **File-based event volunteer store** | `src/lib/campaign-events/volunteers/volunteer-storage.ts` → `data/campaign-events/volunteers/*.json` | `/admin/(board)/volunteers` command center |

`src/app/admin/(board)/volunteers/page.tsx` and `[volunteerId]/page.tsx` read the **JSON file store**, not Prisma `User`.

**Talent Foundry must not write the file store.** Doing so would create a second disconnected person list. The private TF dashboard must query Prisma the way kickoff triage does.

Closest existing Prisma admin pattern:

- `src/app/admin/(board)/workbench/volunteer-kickoff/page.tsx`
- `prisma.workflowIntake.findMany({ where: { source: "volunteer_kickoff" } })`
- Guarded by `src/app/admin/(board)/layout.tsx` → `requireAdminPage()`

---

## 6. CORS / security (verified)

`src/lib/forms/cors.ts`:

Default allowed origins:

- `https://kelly-volunteer-kickoff.netlify.app`
- `http://localhost:5173` / `127.0.0.1:5173`
- `http://localhost:4173` / `127.0.0.1:4173`
- plus `NEXT_PUBLIC_SITE_URL`
- plus comma-separated `FORMS_CORS_ORIGINS`

**`https://foundry-os.netlify.app` is not in the default list.**  
**FoundryOS local `http://localhost:3000` is not in the default list.**

Behavior:

- Allowed origin → `Access-Control-Allow-Origin` echo, methods `POST, OPTIONS`, header `Content-Type`
- Unknown origin preflight → **403**
- Same-origin browser posts (RedDirt site) have no `Origin` requirement for the handler itself; CORS headers are simply omitted
- **No auth** on `POST /api/forms` — public, honeypot + rate limit (12/min/IP)
- No CSRF token
- Honeypot `website` returns fake `{ ok: true }` without persist
- Admin routes are a different surface (`requireAdminPage`) and must stay private

### Fastest safe integration

**FoundryOS server-side proxy** (`/api/talent-foundry/identify`) → RedDirt `POST /api/forms`.

Reasons:

1. Browser CORS does not apply to the server fetch.
2. RedDirt admin is never exposed.
3. Evidence payload stays off the public campaign site origin if desired.
4. Foundry can attach a server-only `REDDIRT_FORMS_URL` (and later an optional shared token if RedDirt adds one — **none exists today**; do not invent auth that would break the public volunteer form).

Defense in depth: still add Foundry origins to `DEFAULT_FORM_ORIGINS` or Netlify `FORMS_CORS_ORIGINS` so a future client post would work.

**Do not create a new public admin endpoint.**  
**Prefer extending `volunteerSchema` over a new form type** so identity, team provision, and ops email stay on the proven path.

---

## 7. Proposed Talent Foundry extension (additive, no migration)

### RedDirt — belong here

1. Optional field on `volunteerSchema`:

```ts
talentFoundry: z.object({
  campaignId: z.string().max(80),
  startWhen: z.string().max(120).optional(),
  journey: z.record(z.unknown()).optional(),
  evidence: z.array(z.unknown()).max(200).optional(),
  keys: z.array(z.string()).max(20).optional(),
  layersCompleted: z.array(z.string()).max(10).optional(),
  volunteerCommitment: z.string().max(40).optional(),
  pathwayHint: z.string().max(80).optional(),
}).optional()
```

2. `handlers.ts`: if present, merge onto `Submission.structuredData.talentFoundry` and `WorkflowIntake.metadata.talentFoundry`. Set `sourceCampaign` attribution to `talent_foundry_kelly`. Set `preferredRole` default `not_sure` unless the journey collected a lane. Put start-date into `availability` or the TF blob (availability is already a string on `VolunteerProfile`).

3. CORS origin additions for Foundry production + local Next.

4. New admin pages under `/admin/talent-foundry` using Prisma + `requireAdminPage`. Staff review fields live in `WorkflowIntake.metadata.talentFoundryReview` (rank, internDecision, pathway, areaAssignment, interviewerUserId, notes) and `assignedUserId` for team contact. Append `WorkflowAction` NOTE/DECISION rows.

5. **No Prisma migration for P0.** JSON columns already exist. A dedicated model is post-launch (PL-6).

### FoundryOS — belong here

- Public cinematic journey
- Session/evidence capture before identity
- Server proxy to RedDirt forms
- Campaign configuration (Kelly copy, scenario content, missions)
- Layer 2 / Layer 3 feature flags

### Must not happen

- New FoundryOS person table as system of record
- Writing `data/campaign-events/volunteers/*.json`
- New RedDirt public admin API
- Breaking `volunteerSchema` required fields used by `VolunteerForm`
- Autonomous ranking stored as a hiring score

---

## 8. Existing concepts searched

| Concept | What exists | P0 use |
|---------|-------------|--------|
| volunteer | Prisma profile + public form + file store + kickoff | Prisma form path only |
| contact | `ContactPreference`, `RelationalContact`, email contact graph | Reuse later; not identity |
| person | No `Person` model | `User` is the person |
| user | Prisma `User` | Canonical identity |
| workflow / intake | `WorkflowIntake` + actions | Queue + review metadata |
| application / candidate | No applicant model | TF evidence on submission |
| skills / availability | `VolunteerProfile` strings | Write from identity + later context |
| assignment | File-store assignments; `FieldAssignment`; intake `assignedUserId` | Staff owner on intake |
| owner | `WorkflowIntake.assignedUserId` | Team contact |
| interview | No interview scheduler | Manual status in metadata |
| notes | `WorkflowAction.summary` kind NOTE | Staff notes |
| leadership | `leadershipInterest` boolean + kickoff pathway | Flag + evidence |
| student / campus | volunteer schema fields | Optional later; not identity MVP |
| teams | `VolunteerOpsTeam` solo provision on volunteer submit | Keep existing behavior |

---

## 9. Production / env notes

- RedDirt Netlify build: `scripts/netlify-build.sh` + Prisma migrate deploy (`netlify.toml`).
- Forms API requires `isDatabaseConfigured()` or returns 503.
- FoundryOS env today: Supabase + OpenAI + Stripe. Add `REDDIRT_FORMS_URL` (e.g. `https://<reddirt-production-host>/api/forms`). Do not commit the value if it is not already public.
- FoundryOS middleware **must** list `/talent-foundry` in `CONSUMER_PREFIXES` or the URL redirects to `/operator/talent-foundry`.

---

## 10. Safety gate

P0 RedDirt changes are **additive JSON + new admin pages + CORS origin list**. They do not migrate tables and do not rewrite existing volunteer rows.

Hard stop if someone proposes: dropping `User.email` uniqueness, merging users by phone, resetting Prisma, or exposing `/admin` to Foundry.
