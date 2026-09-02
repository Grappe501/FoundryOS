# Talent Foundry V1.2 — SAVE MY PLACE

**Branch:** `feat/talent-foundry-v1-2-resume-share`  
**Base:** `eb9c948` (V1.1 live on `main`)  
**Worktree:** `H:\FoundryOS-tf-v1-2`

V1.1 stays live. This is journey-state storage only. RedDirt remains the canonical person/volunteer system. Identity POST semantics are unchanged.

---

## Product

After the participant is identified, they may create a **private opaque resume URL**.

Shape:

`https://foundry-os.netlify.app/talent-foundry/resume/<opaque-token>`

On preview hosts the same path is used with that host. The token is origin-agnostic.

The URL contains **only** the secret. Never `userId`, `submissionId`, `workflowIntakeId`, email, phone, keys, evidence, or journey state.

Possession of the link is authorization to resume **that one** journey. No account. No password. No OAuth.

---

## Architecture

Talent Foundry today persists locally in `sessionStorage` (`tf.kelly.v1`) and writes identity/evidence to RedDirt. There is no FoundryOS person table for this product.

V1.2 adds one FoundryOS Supabase table, accessed **only** with the existing `createServiceClient()` / `SUPABASE_SERVICE_ROLE_KEY` pattern used by `@foundry/db`.

| Column | Purpose |
|---|---|
| `token_hash` | SHA-256 hex of the raw token (unique) |
| `campaign_id` | Kelly campaign id |
| `reddirt_submission_id` | Canonical RedDirt submission reference (not a second person record) |
| `snapshot` | Resumable `TalentFoundrySession` JSON |
| `created_at` / `last_used_at` | Audit |
| `expires_at` | 180 days from create |
| `revoked_at` | Manual revoke |

RLS is on. `anon` and `authenticated` have no grants. No public policies. Service role only.

This is **not** `user_memories` / auth.users portable identity. Those require a FoundryOS login we are not building.

**FoundryOS Supabase project `efinmlvlfuqaridysvem` is currently INACTIVE.** SAVE MY PLACE returns 503 until that project is restored and this migration is applied. Do not point this table at Kelly-Grappe-App / RedDirt.

Migration: `supabase/migrations/20260901190000_talent_foundry_resumes.sql`

---

## Token security

- Generated server-side: `crypto.randomBytes(32)` → base64url (~43 chars, 256 bits)
- Not sequential. Not derived from email or submission id
- Raw token returned **once** in the JSON `{ token }` (client builds the URL)
- Only the hash is stored
- Routes reject tokens that fail `^[A-Za-z0-9_-]{32,128}$`
- Invalid / expired / revoked / wrong campaign → same **404** body `{ ok: false }`
- Do not log raw tokens

---

## Snapshot

`buildResumeSnapshot` copies the current session and sets `stateId` via `resumeLandingState`:

- Mid SHIFT / LEADER → stay there
- Save Layer 2 for later → `layer2_offer` (does **not** auto-start THE SHIFT)
- Save Layer 3 for later → `layer3_offer`
- Otherwise current state (`visit_complete`, etc.)

Includes intent, keys, deferred flags, Layer 1/2/3 progress, mission/pathway, evidence already on the session. Identity stays on the **server snapshot** so continue-merge still works. It is never placed in the URL.

---

## Offer points

- `visit_complete` (after identity)
- Mid Layer 2 / Layer 3 (natural: same control under the mission)
- Layer 2 / Layer 3 “save for later” lands on `visit_complete`, where SAVE MY PLACE is offered; snapshot landing is the corresponding offer screen

Not on every screen.

Delivery: **copy link** + **browser-native share** if present. No email/SMS automation.

---

## Return

`/talent-foundry/resume/<token>` → welcome copy → **Continue** writes `sessionStorage` and opens `/talent-foundry` at the saved state. Does not auto-launch Layer 2 or 3.

| Saved as | Welcome body |
|---|---|
| Key One waiting | You still have Key One. |
| Mid SHIFT | You left the shift in motion. |
| Key Two waiting | You still have Key Two. |
| Mid LEADER | The people are still yours to develop. |

Invalid: **This saved place isn’t available anymore.** → **Start again**. No leak of whether a submission exists.

---

## Expiration

**180 days** from create. Long enough for the campaign window. Not hours. Links are also revocable (`revoked_at`) if we need to kill one without waiting.

---

## APIs

`POST /api/talent-foundry/resume` `{ session }` → `{ ok, token }`  
`GET /api/talent-foundry/resume/<token>` → `{ ok, session }` or 404 `{ ok: false }`

Requires identified session with a first name.
