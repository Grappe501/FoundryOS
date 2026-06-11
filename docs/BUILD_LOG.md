# FoundryOS — Build Log

---

## Current State

| Field | Value |
|-------|-------|
| **Version** | `0.8.0-path-engine` |
| **Last Pass** | PASS-016C ✅ |
| **Last Pass** | PASS-016D ✅ |
| **Next Pass** | PASS-016A — Market Validation (10 strangers) |
| **Focus** | Learn what strangers do — not build PASS-017 yet |
| **Live proof** | [/future-proof](/future-proof) → [/explore](/explore) → [/ai-builder](/ai-builder) · [/validation](/validation) |
| **Pass gate** | ≥1 stranger starts transformation AND returns |

### Open Risks

| Risk | Mitigation |
|------|------------|
| PASS-016 becomes architecture pass | Pass gate = first stranger, not another checklist |
| Market domain not outcome | Market **Become Future-Proof**; AI Builder is a path |
| Bulk thin SEO pages | Publish gate: score >= 70 |

---

## PASS-016D — Stranger Conversion Cleanup ✅

| Deliverable | Detail |
|-------------|--------|
| Consumer nav | `Future-Proof · Explore Paths · AI Builder` on `/future-proof`, `/explore`, `/ai-builder`, `/explore/[slug]` |
| Start here CTA | Hero + footer on `/explore` → `/future-proof` |
| Choose this path | `/ai-builder` → `/future-proof?choose=ai-builder` (restores saved result) |
| Interest capture | Segment + optional email + desired path on planned pages |
| Validation events | `explore_viewed`, `path_clicked`, `interest_submitted` |
| Migration | `20260625100000_validation_pass016d_events.sql` |

**Gate unchanged:** 10 strangers through `/future-proof` before PASS-017.

---

## PASS-016C — Public Explore Catalog ✅

| Deliverable | URL |
|-------------|-----|
| Consumer catalog | `/explore` |
| Operator alias | `/course-catalog` |
| Planned path template | `/explore/[slug]` |
| Registry | `apps/platform/lib/explore-catalog.ts` |
| Growth metric | `public_catalog_paths` |

---

## PASS-016A — Market Validation (in progress)

| Deliverable | Status |
|-------------|--------|
| Validation dashboard | `/validation` |
| Event API | `POST /api/validation/event` |
| Funnel tracking | future-proof + ai-builder wired |
| Stranger goal | 10 before PASS-017 |
| Student pilot | Manual — observe choice behavior |

**Exit:** At least one stranger starts a transformation and returns.

---

## PASS-016 — AI Builder Active Domain ✅

| Deliverable | Status |
|-------------|--------|
| Future-Proof landing + Starter Assessment | `/future-proof` |
| AI Builder stranger entry + HPI proof | `/ai-builder` |
| Foundry Trinity docs | `docs/FOUNDRY_TRINITY.md` |
| Life Leverage blueprint + orchestrator | `ensureAiBuilderDomainProof()` |
| Jan 2027 targets revised | 25k users · 2.5k paid · $10k–25k MRR |

**Pass gate:** Can a stranger discover, start a transformation, and return tomorrow?

---

| Change | Detail |
|--------|--------|
| New tier | **Life Leverage Domains** above Hobbies/Skills/Communities |
| Launch reorder | Financial Independence → #3 (after Bourbon, AI Builder) |
| Velocity target | **20 Active Domains** by Jan 2027 (double launch velocity) |
| Foundry Student | Grades 6–12 channel for life leverage outcomes |
| Pass sequence | PASS-016 AI Builder · PASS-017 Finance · PASS-018 Speaking · PASS-019 Civic |

Docs: `docs/LIFE_LEVERAGE_DOMAINS.md` · `docs/FOUNDRY_FINANCE.md` · `docs/FOUNDRY_STUDENT.md`

---

## PASS-008 — Path Engine (Road to Expert) ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

### Architecture Impact

**Reusable System Added:** Path Engine — Expert Development

**Benefits:** Transform beginners into recognized experts. Paths assemble academy + knowledge + collections + community. North star: experts created.

**Affected Launches:** All verticals — Road to Bourbon Master, Film Critic, Pitmaster, Literary Scholar.

### Delivered

- `@foundry/path-engine` — 5 Bourbon paths + movies/BBQ/books catalog
- Milestones: learn, experience, collect, compare, contribute, mentor, lead, influence
- `mastery_paths`, `user_path_progress`, `club_path_challenges` schema
- Mission Control north star metrics + `/paths`
- `docs/PATH_ENGINE.md`, `docs/EXPERT_DEVELOPMENT.md`

**No Bourbon UI until PASS-014.**

---

## PASS-007 — Foundry Encyclopedia Engine ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

### Architecture Impact

**Reusable System Added:** Foundry Knowledge Universe (`@foundry/encyclopedia-engine`)

**Benefits:** 10 encyclopedia sections per entity. Academy, recipes, knowledge profiles, semantic search reserved. Turns 100k entities into living knowledge nodes.

**Affected Launches:** All verticals — encyclopedia depth is the retention moat.

### Delivered

- 10 sections: definition, history, culture, geography, trivia, related, misconceptions, beginner, expert, sources
- Academy curricula (Bourbon 7 levels) — `vertical.foundryos.com/academy`
- Recipe engine (cocktails, lists, reading paths — unified schema)
- `user_knowledge_profiles`, semantic search + club intelligence types
- Factory integration: `build:topic` includes encyclopedia + recipes
- Mission Control `/knowledge`
- `docs/KNOWLEDGE_UNIVERSE.md`

**No Bourbon UI.**

---

## PASS-006 — Self-Assembly Engine v1 ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

### Architecture Impact

**Reusable System Added:** Foundry Factory (`@foundry/factory`)

**Benefits:** One command manufactures entity + 11 content pages + relationships + SEO. All verticals.

**Affected Launches:** Every vertical — Bourbon is proof, not product.

### Delivered

- `@foundry/factory` — 4 AI systems (entity, content, relationship, SEO builders)
- Pipeline: Generate → Validate → Score → Store Plan → Publish Decision (HOLD)
- `npm run build:topic` — Buffalo Trace in one pass
- `factory_runs`, `factory_queue` tables
- Mission Control `/factory`
- `docs/FOUNDRY_FACTORY.md`, `docs/SELF_ASSEMBLY.md`

### Strategic Rule

OpenAI generates. Supabase owns. Generated ≠ Published.

**No Bourbon UI.**

---

## PASS-005 — Vertical Resolution Engine ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

### Architecture Impact

**Reusable System Added:** Vertical Resolution Engine (`resolveVertical`)

**Benefits:** One deployment → all verticals. Hostname + path routing without per-niche code.

**Affected Launches:** Books, Movies, Music, Bourbon, BBQ, College Baseball

### Delivered

- `resolveVertical(hostname)` — Vertical + Theme (bourbon→Spirits/Bourbon, books→Books/Literature)
- Registry: `vertical_configs`, `vertical_domains`, `vertical_launch_status` (DB + `data/vertical-registry.json`)
- `*.localhost` local dev (books.localhost, bourbon.localhost)
- Mission Control `/routing` — configured verticals, resolved domains, routing health, launch status
- `npm run preflight`, `npm run sandbox`, architecture compliance gate
- `docs/ARCHITECTURE_COMPLIANCE.md`, `docs/LOCAL_DEV.md`

### Verification

- preflight: H: + env checks
- sandbox: Netlify monorepo build
- routing: `/routing` shows launch status table

**Hard rule:** No Bourbon UI, no Books UI, no content population.

---

## PASS-004 — Supabase Live & Deployment Readiness ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

**Delivered:**

- `@foundry/db` — Supabase client, health checks, live metrics
- `npm run db:diagnose` — connectivity, table counts, RLS checks
- `npm run db:seed` — verticals, 1,961 topics, vertical_sites, bourbon sample entities
- Storage buckets: `entity-images`, `avatars`
- `docs/SUPABASE_SETUP.md`, `docs/NETLIFY_ENV_CHECKLIST.md`
- Mission Control DB status panel + `/api/health/db`

**Steve actions to go live:**

1. Add Supabase keys to `.env.local`
2. `npm run db:migrate`
3. `npm run db:seed`
4. `npm run db:diagnose`

**Hard rule:** No Bourbon UI, no Books UI, no content generation.

---

## PASS-003 — Identity & Ownership Layer ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-10 |

**Delivered:**

- `user_entity_relationships` — owns, favorites, reviewed, ranked, wants, watched, read, listened, visited, experienced
- `entity_metrics` — denormalized leaderboard data
- `packages/ownership-graph` — `buildUserIdentitySnapshot()`
- Content sources reserved: generated, community, editorial, verified
- SEO publish policy: `content_score >= 70` to go live
- `docs/OWNERSHIP_GRAPH.md`, `docs/SEO_PUBLISH_POLICY.md`
- Mission Control platform asset metrics

**Success criteria (schema ready):**

- Who is Steve? → profiles
- What does Steve own? → `owns`
- What does Steve love? → `favorites`
- What has Steve reviewed? → `reviewed`
- Collections built? → `collections`
- Expertise earned? → `user_expertise`

---

---

## PASS-013 — Reputation + Mastery ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-11 |
| **Commit** | `adb1f51` |
| **Core rules** | Reputation is earned trust · Mastery is demonstrated capability |
| **Packages** | `@foundry/reputation-engine`, `@foundry/mastery-engine` |
| **Migration** | `20260623000000_reputation_mastery_pass013.sql` |
| **Live proof** | `/reputation` OPERATIONAL · `/mastery` OPERATIONAL · persisted ✓ |

### Chain verified (production)

```txt
Evidence → Reputation → Mastery → Identity → Community
```

Demo User: **Trusted Speaker Candidate** · **Road to Confident Speaker — Milestone 1 Complete** · Speaker Circle recognition.

### Milestone

**First point where Human Potential Infrastructure exists** — not just vision.

---

## PASS-014 — Domain Proof ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-11 |
| **Deliverable** | Domain Blueprint — bourbon first instance, not special case |
| **Packages** | `@foundry/domain-blueprint`, `@foundry/db` → `ensureBourbonDomainProof()` |
| **Migration** | `20260624000000_domain_proof_pass014.sql` |
| **Live proof** | `/bourbon` OPERATIONAL · `/verticals/bourbon` · persisted ✓ |

### Architecture Impact

- **Reusable System:** Domain Blueprint layer — manufacture domains from template
- **Benefits:** Bourbon proves HPI; Poker, BBQ, Physics reuse same blueprint
- **Next:** Domain Factory (Platform lane) + Growth OS (Growth lane) in parallel

See `docs/PASS_014_EXECUTION.md`.

---

## PASS-015A — CLOSED (in commit)

Traffic Opportunity Registry + Growth Factory funnel + Active Domains metric.

---

## PASS-015 — Growth OS (in progress)

**Parallel lanes:** Platform (Domain Factory) + Growth (Opportunity Engine)

See `docs/PASS_015A_EXECUTION.md`, `docs/GROWTH_OS.md`.

---

## PASS-014 — Domain Proof (archive note)

**Was in progress — now closed.** See section above.

---

## PASS-012 — Collections + Communities ✅

| Field | Value |
|-------|-------|
| **Date** | 2026-06-11 |
| **Commit** | `3b531a5` |
| **Core rule** | Transformation accelerates in community |
| **Packages** | `@foundry/collection-engine`, `@foundry/community-engine` (extended) |
| **Migration** | `20260622000000_collections_communities_pass012.sql` |
| **Live proof** | `/collections` OPERATIONAL · `/community` OPERATIONAL · Database persisted ✓ |

### Exit criteria (verified on Netlify)

**Collections:** Collection Created ✓ · Entity Added ✓ · Evidence Linked ✓ · Identity Updated ✓

**Community:** Community Created ✓ · Member Joined ✓ · Project Assigned ✓ · Evidence Shared ✓

### Architecture Impact

- **Reusable System:** Personal Knowledge Assets + Community OS persistence layer
- **Benefits:** Identity compounding — what I collect + who I grow with
- **Moat layer:** Ownership graph + shared mastery + evidence in community context

---

## Prior Passes

- **PASS-000** Foundation
- **PASS-001** Registry + Course Correction
- **PASS-002** Core Data Architecture

---

## Planned

- **PASS-013** Reputation + Mastery — earned trust, not gamification (see `docs/PASS_013_EXECUTION.md`)
- **PASS-014** Bourbon Vertical Launch (proof)
