# FoundryOS — Roadmap

> Updated PASS-002. Mirrored on foundryos.com/investors

---

## Pass Map

```
PASS-000 ████████████ Foundation
PASS-001 ████████████ Registry + Course Correction
PASS-002 ████████████ Core Data Architecture      ← WE ARE HERE
PASS-003 ░░░░░░░░░░░░ Supabase Live + Auth
PASS-004 ░░░░░░░░░░░░ Hostname Resolution
PASS-005 ░░░░░░░░░░░░ SEO + Content Factory Live
PASS-006 ░░░░░░░░░░░░ Knowledge Graph Live
PASS-007 ░░░░░░░░░░░░ Collections Live
PASS-008 ░░░░░░░░░░░░ Reputation Live
PASS-009 ░░░░░░░░░░░░ Bourbon Launch
PASS-010 ░░░░░░░░░░░░ Books Launch
```

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
| Supabase live | Jun 2026 | PASS-003 |
| Bourbon vertical | Jul 2026 | PASS-009 |
| Books vertical | Jul 2026 | PASS-010 |
| 1M users | Dec 2026 | Target |
