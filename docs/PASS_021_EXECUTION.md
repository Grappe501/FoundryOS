# PASS-021 — Consumer Experience Polish ✅

> **Status:** CLOSED · Trinity unified before expansion

---

## Priority

Trinity is the first real product wedge. Consumer friction is the biggest risk — not missing content.

**Sequence:** PASS-021 → PASS-020 Civic Engagement → PASS-022 Private Beta Readiness

---

## Deliverables

| # | Deliverable | Route / mechanism |
|---|-------------|-------------------|
| 1 | Public surface audit | Middleware gates non-consumer routes behind `/operator/*` |
| 2 | Trinity hub | `/trinity` + integrated on `/` and `/future-proof` |
| 3 | Cross-domain journey | `NextRecommendedWorld` on each world hub |
| 4 | Shared identity | `TrinityJourneyProgress` + `/my-journey` |
| 5 | Parent experience | `/parents` top-level page |
| 6 | Student dashboard | `/my-journey` (localStorage progress) |

---

## Consumer routes (public)

```txt
/  /future-proof  /trinity  /parents  /my-journey  /explore
/ai-builder/*  /financial-independence/*  /public-speaking/*
```

All other paths redirect to `/operator/*` (internal).

---

## Close gate

| Check | Criterion |
|-------|-----------|
| Consumer home | `/` — no PASS/HPI/OPERATIONAL terms |
| Trinity story | `/trinity` shows Create · Keep · Communicate |
| Cross-world | Each world recommends next world |
| Journey | `/my-journey` shows progress across 3 worlds |
| Parents | `/parents` one coherent value story |
| Operator hidden | `/loop`, `/passes`, etc. only via `/operator` |

Registry: `apps/platform/lib/trinity-worlds.ts`
