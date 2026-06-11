# PASS-016C — Public Explore Catalog

> Consumer-facing directory of everything Foundry intends to offer.

---

## URLs

| URL | Audience |
|-----|----------|
| `/explore` | Public — explore what you can become |
| `/course-catalog` | Operator — ranks, status keys, href targets |
| `/explore/[slug]` | Planned paths — opening soon + interest list |

---

## Status Colors (consumer labels)

| Color | Status | Label |
|-------|--------|-------|
| Green | `live` | Live now |
| Blue | `in_build` | In development |
| Gold | `validating` | Being validated |
| Gray | `planned` | Planned |
| Red | `paused` | Not scheduled |

---

## Data Source

`apps/platform/lib/explore-catalog.ts` — `EXPLORE_PATHS`, sections, category filters.

---

## Growth Metric

`public_catalog_paths` on Growth OS + Mission Control.

---

## Rules

No PASS · HPI · OPERATIONAL · persisted on `/explore`.

Human language only.

---

## Live Links

- Future-Proof → `/future-proof`
- AI Builder → `/ai-builder`
- Bourbon → `/verticals/bourbon`
- Planned → `/explore/financial-independence` etc.
