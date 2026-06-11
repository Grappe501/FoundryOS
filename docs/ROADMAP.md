# FoundryOS — Roadmap

> Updated PASS-016D close — **Vertical Depth Mode**. Private build until beta-ready.

**Production launch:** January 2027 · See `docs/JANUARY_2027_TARGETS.md`

---

## Pass Map

```
PASS-000 ████████████ Foundation
PASS-001 ████████████ Registry + Course Correction
PASS-002 ████████████ Core Data Architecture
PASS-003 ████████████ Identity & Ownership
PASS-004 ████████████ Supabase Live & Deployment
PASS-005 ████████████ Vertical Resolution Engine
PASS-006 ████████████ Self-Assembly Engine v1
PASS-007 ████████████ Encyclopedia Engine
PASS-008 ████████████ Path Engine — Road to Expert
PASS-009 ████████████ Transformation System Factory ✅
PASS-010 ████████████ Transformation Graph Engine ✅
PASS-011 ████████████ Evidence Engine ✅
PASS-012 ████████████ Collections + Communities ✅
PASS-013 ████████████ Reputation + Mastery ✅
PASS-014 ████████████ Domain Proof ✅
PASS-015 ████████████ Growth OS ✅
PASS-016 ████████████ Future-Proof Funnel + AI Builder shell ✅
PASS-016C/D ██████████ Explore catalog + consumer journey ✅
PASS-017 ████████████ AI Builder World ✅
PASS-018 ████████████ Financial Independence World ✅
PASS-019 ████████████ Public Speaking World ✅
PASS-020 ████████████ Civic Engagement (factory-generated) ✅
PASS-021 ████████████ Consumer Experience Polish ✅
PASS-023 ████████████ Bourbon Consumer World (factory) ✅
PASS-024 ████████████ Factory Automation ✅ ← multiplier live
PASS-025 ████████████ World Depth Expansion ✅
PASS-022 ░░░░░░░░░░░░ Private Beta Readiness ← NEXT
```

> **Mode:** Private build — no public beta until 3 verticals consumer-ready.
> See `docs/VERTICAL_DEPTH_MODE.md`, `docs/PASS_017_022_SEQUENCE.md`.

> Beta wedge: **Future-Proof Trinity** — AI Builder · Financial Independence · Public Speaking.

> `@foundry/project-engine` is architecturally complete — projects are nodes in the transformation graph.

See `docs/TRANSFORMATION_OS.md` for the four-object taxonomy (Aspirations · Transformation Systems · Evidence · Legacy).

---

## PASS-002 Deliverables (Complete)

| Area | Delivered |
|------|-----------|
| **Database** | entities, entity_types, entity_attributes, relationships, collections, reviews, rankings, reputation |
| **Content Engine** | `packages/content-engine` — 11 content types |
| **SEO Phase 2** | Entity + topic programmatic paths |
| **Documentation** | ENTITY_MODEL, COLLECTION_SYSTEM, REPUTATION_SYSTEM |
| **Supabase** | Migration ready — provision in PASS-003 |

---

## Architecture Stack

```txt
Topic Registry (1,961 topics)
     ↓
Content Engine (11 types × topic/entity)
     ↓
SEO Engine (structured data + paths)
     ↓
Entity System (universal — no niche tables)
     ↓
Knowledge Graph (entity_relationships)
     ↓
Collections (User → Collection → Entities)
     ↓
Reputation (trust, expertise, badges)
```

---

## Scale Projection

| Layer | Count |
|-------|-------|
| Topics | 1,961 |
| Content types per topic | 11 |
| Topic pages alone | ~21,571 |
| + entities × 11 | hundreds of thousands |

---

## Milestones

| Milestone | Target | Status |
|-----------|--------|--------|
| Core data architecture | Jun 2026 | ✅ PASS-002 |
| Supabase live | Jun 2026 | ✅ PASS-004 |
| Domain proof pattern | Jun 2026 | ✅ PASS-014 |
| Future-Proof funnel | Jun 2026 | ✅ PASS-016 |
| Vertical depth (Trinity) | Q3 2026 | PASS-017–019 |
| Private beta | Q3–Q4 2026 | PASS-022 |
| 1M users | Dec 2026 | Target |

> Pass sequence source of truth: this file + Mission Control (`apps/platform/lib/mission-control.ts`)
