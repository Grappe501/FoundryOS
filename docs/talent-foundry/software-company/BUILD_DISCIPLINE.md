# Company Foundry — Build Discipline

**Status:** LOCKED (Ernie 2026-09-02). Permanent. Not optional.  
**Active branch:** `feat/talent-foundry-company-phase-0`  
**Active PR:** [#5](https://github.com/Grappe501/FoundryOS/pull/5) — keep open while Phase 1 is under review. Do not merge until Ernie says so.

GitHub is the durable history. Netlify is the visual / testing surface. Production moves only on explicit approve + merge.

---

## Rhythm (every meaningful slice)

```txt
build locally → validate → commit → push → deploy preview → review → only then advance
```

Do not accumulate 10–15 local changes with no remote checkpoint.

**Done** means all of these:

1. Code works locally
2. Tests / validation for that slice pass
3. One clear commit for the pass
4. Pushed to the PR branch
5. Netlify **Preview Deploy** exists for that push
6. We can inspect it (desktop, mobile, pacing, accessibility, emotion)

If GitHub was not pushed, the slice is **not closed**.  
If Netlify preview failed, the slice is **not closed**.  
Production was not the close gate.

---

## Git

- Stay on PR #5 while Phase 1 is under review.
- One meaningful pass → one conventional commit → push immediately.
- Examples:

```txt
feat(workshop): build Phase 1 mysterious door
polish(workshop): cinematic pacing and mobile pass
test(workshop): harden door contracts and interaction states
docs(talent-foundry): lock Company Foundry build discipline
```

- Do not commit `.env`, secrets, or `tsconfig.tsbuildinfo`.
- Do not merge. Do not push Company Foundry to `main` as the close step.

---

## Netlify

- Every push to the PR branch must produce a Preview Deploy.
- Review `/workshop` on the preview — not on production.
- Production (`foundry-os.netlify.app`, live campaign QR) stays untouched until the PR is approved and merged.

---

## Burt return report (required every slice)

| Proof | Required |
|---|---|
| Branch | yes |
| Latest commit SHA | yes |
| Push confirmed | yes |
| PR number | yes |
| Netlify preview URL + status | yes |
| Validation commands run | yes |
| Production touched? | yes — must be **no** unless Ernie approved a merge |

---

## Isolation (unchanged)

- Do not alter live Campaign Foundry (`/talent-foundry`, QR, share).
- Do not write Company people to RedDirt.
- Do not create production migrations until an approved later slice.

---

## Known debt (do not mix into a product slice)

**EnterStageResult test typing.** `npm run typecheck -w @foundry/platform` (`tsc --noEmit`) fails in pre-existing stage tests that read `.reason` on `EnterStageResult` without narrowing `ok === false`. `next build` typecheck still passes. Soul 1.0 and the research loop are not implicated.

Fix in a dedicated `test(workshop):` pass only. Do not fold it into a Soul, MAKE, or visual slice.

Logged 2026-09-02 on closeout of Soul 1.0 (`db45977`).
