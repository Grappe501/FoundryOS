# FoundryOS — Platform Metrics

> Updated PASS-043 close — Bourbon craft inventory · `1.2.0-bourbon-craft-inventory`

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
| Passes complete | 044 (Bourbon Level 2 Comprehensive) |
| Version | `1.3.0-bourbon-level2-comprehensive` |
| Launch readiness | 100% |
| Bourbon catalog bottles | 55 |
| Bourbon producers | 24 |
| Craft houses | 13 |
| Academy lessons (bourbon) | 45 (8 L1 + 15 L2 + 22 L3–7) |
| Level 2 tools | 16 flights · 12 grids · Palate Journal · Water Lab |
| Campus maps | 11 producers |
| Detective cases | 13 |
| Personal database | ✅ PASS-040D — `npm run verify:040d` |
| Identity sync engine | ✅ PASS-040D.5 — `npm run verify:040d5` |
| Atlas-aware AI | ✅ PASS-040C — `npm run verify:040c` |
| Review + recommend | ✅ PASS-040E/F |
| Full stack verify | `npm run verify:stack` |
| Next pass | **PASS-045** — Level 3 Shelf Builder |

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
