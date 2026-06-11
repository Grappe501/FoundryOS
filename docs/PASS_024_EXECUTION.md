# PASS-024 — Factory Automation Pass

> **Status:** ✅ CLOSED · June 2026

---

## Pass Gate — PASSED

> Can a new world be generated primarily from a blueprint instead of being handcrafted?

**Yes.** `npm run build:world -- <domain>` generates ~100 files per world at **100% layer automation** for factory domains.

| Metric | Before | After |
|--------|--------|-------|
| Factory automation (avg) | 43% | **92%** |
| Cost to launch (factory) | 28–40h hand-built | **~1h supervised** |
| `npm run build:world` | checklist stub | **full file generation** |

---

## Primary Deliverable

```bash
npm run build:world -- bourbon
npm run build:world -- bbq
npm run build:world -- poker
npm run build:world -- civic-engagement
```

```bash
npm run audit:worlds
```

---

## Factory Outputs (per domain)

| Layer | Route / path |
|-------|----------------|
| World hub | `/{domain}` |
| Academy (7 levels) | `/{domain}/academy` |
| Missions (5) | `/{domain}/missions` + `/{domain}/missions/[slug]` |
| Portfolio | `/{domain}/portfolio` |
| Parents | `/{domain}/parents` |
| Glossary | `/{domain}/glossary` |
| Careers | `/{domain}/careers` |
| Community | `/{domain}/community` |
| Playground | `/{domain}/playground` |
| Operator proof | `/verticals/{domain}` |
| Marketing pack | `marketing/domains/{domain}/` |
| Explore registration | `lib/generated/world-factory-explore.ts` |
| Middleware routes | `lib/generated/world-factory-routes.ts` |

Package: `packages/world-factory/`

---

## Blueprint Types

| Type | Examples |
|------|----------|
| Life Leverage | AI Builder, FI, Public Speaking, Civic Engagement |
| Passion | Bourbon, BBQ, Poker |
| Academic | (template ready — add blueprint config) |
| Career | (template ready — add blueprint config) |

Add a domain: edit `packages/world-factory/src/blueprints/index.ts` → run `npm run build:world -- <slug>`.

---

## Principle

Optimize for **complete generated structure**, not perfect content. A mediocre world that is 85% generated beats a perfect world that requires three passes of manual work.

---

## Exit Criteria

1. ✅ World factory command exists
2. ✅ Bourbon generated from factory
3. ✅ BBQ generated from factory
4. ✅ Poker generated from factory
5. ✅ Marketing assets generated automatically
6. ✅ Explore catalog registration automatic
7. ✅ Automation score exceeds 80% (92% avg)
8. ✅ Launch cost KPI visible on Growth OS (`/growth`)
9. ✅ Documentation updated
10. ✅ Future domains require configuration, not construction

---

## Next

- **PASS-022** — Private beta readiness (auth, email, pricing)
- **PASS-023/025/026** — Passion world polish (content depth, not structure)
- Domain #8+ = add blueprint row + one command

Factory manufactures. Burt supervises.
