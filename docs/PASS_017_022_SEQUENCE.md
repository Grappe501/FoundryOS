# PASS-017 → PASS-022 — Vertical Depth + Private Beta

> Supersedes stranger-first gate in `docs/PASS_016A_EXECUTION.md`. Source of truth for pass order after PASS-016D.

---

## Strategic Lock

- **Mode:** Private build until 3–5 verticals feel complete
- **Beta wedge:** Future-Proof Trinity (AI Builder · Financial Independence · Public Speaking)
- **Proof vertical:** Bourbon (engineering complete; consumer polish in PASS-021)
- **No public beta** until `docs/VERTICAL_DEPTH_MODE.md` gate clears

---

## Pass Map

| Pass | Vertical / Theme | Milestone |
|------|------------------|-----------|
| **PASS-017** | AI Builder | **Experience pass** — first consumer value; student spends hours; parent gets it |
| **PASS-018** | Financial Independence | Full Life Leverage depth |
| **PASS-019** | Public Speaking | Full Life Leverage depth |
| **PASS-020** | Civic Engagement | Fifth vertical depth |
| **PASS-021** | Consumer Experience | Hide all proof UI from public pages |
| **PASS-022** | Private Beta Readiness | Auth, email, pricing, 3 consumer-ready verticals |

---

## Vertical Completeness (Every Depth Pass)

Each PASS-017 through PASS-020 must deliver:

| Layer | Deliverable |
|-------|-------------|
| Landing | Public consumer page |
| Mastery | Road to … path with milestones |
| Projects | First 5 projects with evidence hooks |
| Evidence | Domain evidence model wired |
| Collection | Portfolio / My … asset |
| Community | Circle / club concept |
| Action | Clear next best action |
| Academy | Beginner academy (Learning Pyramid L1–L3) |
| Glossary | Terms / definitions |
| Proof | Internal dashboard only (`/verticals/{slug}` or operator routes) |

---

## PASS-017 — AI Builder Depth Pass (NEXT)

**Goal:** A student or parent arrives at `/ai-builder` and understands what to do next — no Steve required.

**Consumer surfaces:** `/ai-builder`, assessment routing from `/future-proof`

**Hidden from consumers:** HPI verification, OPERATIONAL badges, pass codes, slug debug

**Entry command pattern:** extend `ensureAiBuilderDomainProof()` + consumer page assembly

---

## PASS-021 — Consumer Experience Polish

- Strip PASS / OPERATIONAL / HPI from all public routes
- `/bourbon` → operator-only or `/verticals/bourbon`
- Unified consumer chrome across Trinity + explore

---

## PASS-022 — Private Beta Readiness

Gate checklist from `docs/VERTICAL_DEPTH_MODE.md`:

- 3 consumer-ready verticals
- Assessment routing clean
- Auth + email capture
- Pricing page (payments optional)
- `/validation` operational for invite-only cohort

---

## References

- `docs/VERTICAL_DEPTH_MODE.md`
- `docs/FOUNDRY_TRINITY.md`
- `docs/LIFE_LEVERAGE_DOMAINS.md`
- `docs/PASS_016_019_SEQUENCE.md` (historical — pre depth-mode pivot)
