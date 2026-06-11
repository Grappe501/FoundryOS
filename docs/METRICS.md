# FoundryOS — Platform Metrics

> Updated PASS-012 close

---

## PASS-012 Live KPIs (Mission Control)

| Metric | Source |
|--------|--------|
| Knowledge Assets | `personal_knowledge_assets` |
| Assets with Evidence | `evidence_linked = true` |
| Active Communities | `community_instances` (active) |
| Community Members | `community_members` |
| Evidence Shared in Community | `community_evidence_shares` |

Live: [foundry-os.netlify.app](https://foundry-os.netlify.app) · Proof: `/collections` · `/community`

## Platform Assets (The Real Story)

| Asset | Count | Notes |
|-------|-------|-------|
| **Topics** | 1,961 | Registry complete |
| **Entities** | 0 | Grows with vertical launches |
| **Relationships** | 0 | KG + ownership graph |
| **Collections** | 0 | User-built shelves |
| **Ownership Links** | 0 | user_entity_relationships |

*Investor narrative: Topics are the map. Entities, relationships, and collections are the living platform.*

---

## SEO (Factory Built — Not Bulk Published)

| Metric | Value |
|--------|-------|
| Potential pages (topics × 11) | ~21,571 |
| Pages published | **0** (by design) |
| Publish threshold | score >= 70 |

See `docs/SEO_PUBLISH_POLICY.md`

---

## Architecture Status

| System | Status |
|--------|--------|
| Topic Registry | ✅ |
| Content Engine + sources | ✅ |
| SEO Engine + publish gate | ✅ |
| Universal Entities | ✅ |
| Ownership Graph | ✅ PASS-003 |
| Entity Metrics | ✅ PASS-003 |
| Collections schema | ✅ |
| Reputation schema | ✅ |
| Supabase live | ⏳ PASS-004 (infra ready — Steve provisions keys) |
| DB diagnostics | ✅ `npm run db:diagnose` |
| Platform seed | ✅ `npm run db:seed` |

---

## Build

| Metric | Value |
|--------|-------|
| Vertical resolver | ✅ PASS-005 |
| Configured vertical domains | 6+ |
| Launch status tracking | ✅ `vertical_launch_status` |
| Path Engine | ✅ PASS-008 |
| Active mastery paths | 5+ Bourbon, catalog for all verticals |
| North star | **Transformations in progress** — not users, pages, or entities |
| Loop completion rate | 0% (PASS-010 proof) |
| Meaningful progress events | 0 |
| Active transformations | 0 (PASS-010) |
| Transformation insights captured | 0 (PASS-010) |
| Path completion rate | 0% |
| Mentorship connections | 0 |
| Evidence profiles | 3 exemplars (PASS-011) |
| Reflection templates | 3 exemplars (PASS-010) |
| Passes complete | 13 (PASS-000–012) |
| Version | `0.8.0-path-engine` |
| Launch readiness | 76% |
| Collection Engine | ✅ PASS-012 — Personal Knowledge Assets |
| Community OS persistence | ✅ PASS-012 — `/community` proof |
| Next pass | PASS-013 — Reputation + Mastery (earned trust chain) |

---

## Metric Hierarchy (long-term)

| Level | Metric |
|-------|--------|
| 1 | Users |
| 2 | Active Transformations |
| 3 | Completed Transformations |
| 4 | People Mentored |
| 5 | Communities Created |
| 6 | Lives Changed (approximated via evidence + mentorship + outcomes) |

Level 6 cannot be measured perfectly — but evidence tiers, mentorship connections, and outcome completion approximate it.
