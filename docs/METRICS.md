# FoundryOS — Platform Metrics

> Updated PASS-034P close — World Continuity + ecosystem model locked

---

## Business North Star (PASS-015+)

**Monthly Active Transformations** — users, engagement, retention, growth, revenue in one metric.

Product north star unchanged: **Transformations in Progress**.

---

## Growth OS KPIs

| Metric | Source |
|--------|--------|
| Visitors | Analytics (PASS-015) |
| Registered / Active / Paid Users | Auth + billing |
| MRR | Stripe / billing |
| CAC | growth-model/ |
| Referral Rate | referrals/ |
| SEO Traffic | analytics/ |
| Domains Live | `domain_transformation_loops` |
| Indexed Pages | SEO factory |
| Monthly Active Transformations | transformation graph + auth |

Live: `/growth`

---

## PASS-014 KPIs (Domain Proof)

| Metric | Source |
|--------|--------|
| Domain Blueprints Active | `domain_blueprints` (status = active) |
| Domain Proofs Complete | `domain_transformation_loops` (loop_complete = true) |
| Cross-Domain Identity | `identity_domain_snapshots` |

Live: `/bourbon` · `/verticals/bourbon`

---

## Human Potential Infrastructure Core ✅

```txt
PASS-010 Transformation Loop
PASS-011 Evidence Engine
PASS-012 Collections + Communities
PASS-013 Reputation + Mastery
```

Chain: Evidence → Reputation → Mastery → Identity → Community

---

## PASS-024 Factory KPIs

| Metric | Value | Source |
|--------|-------|--------|
| Factory Automation % | 92% avg | `npm run audit:worlds` |
| Cost To Launch Domain | ~1h (factory) | `domain-launch-cost.ts` |
| Domains Generated | 4 | `world-factory-manifest.json` |
| Domains Activated | 7 consumer live | launch cost registry |
| Avg Factory Launch Time | ~1h | PASS-024 supervised runs |

Live: `/growth` · Command: `npm run build:world -- <slug>`

---

| Metric | Source |
|--------|--------|
| Reputation Records | `reputation_records` |
| Mastery Assignments | `mastery_assignments` |
| Community Recognitions | `mastery_assignments.community_recognition_updated` |

Live: `/reputation` · `/mastery`

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
| Passes complete | 34P (reactive loop closed; 034U + 040A next) |
| Version | `0.9.0-living-worlds` |
| Launch readiness | 88% |
| Reputation + Mastery Engine | ✅ PASS-013 — `/reputation` + `/mastery` |
| Living Worlds packages | `@foundry/mentor-engine`, `@foundry/lore-engine` |
| Bourbon tool routes | 30+ Level 1 + intelligence surfaces |
| Next pass | PASS-035 — Supabase journey sync + LLM mentor v2 |

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
