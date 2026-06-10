# FoundryOS — Build Log

> Public build journal. Every pass updates this file + `/passes` on foundryos.com.

---

## Current State

| Field | Value |
|-------|-------|
| **Current Version** | `0.2.0-core-data-architecture` |
| **Current Focus** | Core data architecture complete — Supabase live next |
| **Last Pass** | PASS-002 |
| **Next Pass** | PASS-003 — Supabase Live + Auth |
| **Launch Readiness** | 28% |

### Open Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Per-topic site model | ✅ Resolved | Vertical domains + topic paths |
| Niche database tables | ✅ Resolved | Universal entity system |
| SEO not first-class | ✅ Resolved | SEO + content engines |
| Reputation afterthought | ✅ Resolved | Tables designed PASS-002 |
| Supabase not provisioned | Open | PASS-003 |
| Netlify domains not wired | Open | PASS-004 |

---

## Pass History

### PASS-000 — Foundation

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |
| **Commit** | `98f0330` |

H: drive, docs, monorepo, cursor rules, initial schema, self-build skeleton.

---

### PASS-001 — Registry Expansion + Course Correction

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |
| **Commit** | `49dc99a` |

1,961 topics, vertical domains, SEO/KG/topic-registry, mission control, admin dashboards.

---

### PASS-002 — Core Data Architecture ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |
| **Author** | Burt |

**Delivered:**

**Packages:**
- `packages/content-engine` — 11 universal content types (CMS + SEO factory)
- SEO Phase 2 — entity programmatic paths in `@foundry/seo-engine`
- `@foundry/core` entity types

**Database** (`20260610300000_core_data_architecture.sql`):
- `entity_types`, `entities`, `entity_attributes`, `entity_relationships`
- `content_types`, `content_pages`
- `collections`, `collection_items`
- `reviews`, `rankings`
- `user_reputation`, `user_badges`, `user_expertise`, `user_contributions`

**Documentation:**
- `docs/ENTITY_MODEL.md`
- `docs/COLLECTION_SYSTEM.md`
- `docs/REPUTATION_SYSTEM.md`

**Design decisions:**
- NO niche tables (bourbons, movies, albums, books, teams)
- Collections = crown jewel (User → Collection → Entities)
- Reputation = authority before launch
- ~21,571 SEO pages estimable from topics alone (1,961 × 11)

---

### PASS-003 — Supabase Live + Auth (Planned)

- Steve provisions Supabase project + `.env.local`
- Run all migrations
- Verify RLS policies
- Storage buckets for entity images

---

### PASS-004 — Hostname Resolution (Planned)

### PASS-005 — SEO + Content Factory Live (Planned)

### PASS-006 — Knowledge Graph Live (Planned)

### PASS-007 — Collections Live (Planned)

### PASS-008 — Reputation Live (Planned)

### PASS-009 — Bourbon Launch (Planned)

### PASS-010 — Books Launch (Planned)
