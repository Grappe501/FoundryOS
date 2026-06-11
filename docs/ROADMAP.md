# FoundryOS — Roadmap

> Updated PASS-009. Mirrored on foundryos.com/investors

**Build gate:** Architecture compliance — not human permission. See `docs/ARCHITECTURE_COMPLIANCE.md`

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
PASS-009 ▓▓▓▓░░░░░░░░ Transformation System Factory
PASS-010 ████████████ Transformation Graph Engine ✅
PASS-011 ████████████ Evidence Engine ✅
PASS-012 ░░░░░░░░░░░░ Collections + Communities ← NEXT (greenlit)
PASS-013 ░░░░░░░░░░░░ Reputation + Mastery
PASS-014 ░░░░░░░░░░░░ Bourbon Vertical Launch
```

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
| Supabase live | Jun 2026 | PASS-004 (Steve provisions keys) |
| Transformation System Factory | Jun 2026 | PASS-009 (in progress) |
| Transformation Graph Engine | Jul 2026 | PASS-010 |
| Evidence Engine | Jul 2026 | PASS-011 |
| Bourbon vertical (proof) | Jul 2026 | PASS-014 |
| 1M users | Dec 2026 | Target |

> Pass sequence source of truth: this file + Mission Control (`apps/platform/lib/mission-control.ts`)
