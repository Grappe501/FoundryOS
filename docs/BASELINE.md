# FoundryOS — Project Baseline

> **Pass 0** — Foundation established by Burt (Cursor AI) per Steve + Ernie directives  
> **Date:** June 10, 2026  
> **Repository:** [github.com/Grappe501/FoundryOS](https://github.com/Grappe501/FoundryOS)

---

## Vision

FoundryOS is an **AI operating system** designed to:

1. Host **1,961+ specialty apps** on a single unified platform (scaling beyond 1,000)
2. **Build itself** — a self-replicating AI module that generates new apps from templates
3. Reach **1 million users** before end of 2026
4. Position for **angel investment** at scale (millions to billions valuation)

---

## Team Roles

| Role | Person | Responsibility |
|------|--------|----------------|
| **Steve** | Founder | Vision, product direction, investor relations |
| **Ernie** | ChatGPT | Pilot — strategy, build plans, Burt assignments |
| **Burt** | Cursor AI | Builder — code, infrastructure, documentation, GitHub |

---

## Hard Constraints

### H: Drive Only

**NOTHING writes to C: drive.** All files, temp files, node_modules, caches, builds — everything lives on `H:\FoundryOS`.

See: `scripts/setup-h-drive.ps1`, `.npmrc`, `.cursor/rules/h-drive-only.mdc`

---

## Business Model

### Per-App Economics

| Tier | Price | Value |
|------|-------|-------|
| **Tier 1** | Free | Information catalog — browse, search, learn |
| **Tier 2** | $4/mo | Personal ownership — collections, favorites, rankings, notes |
| **Tier 3** | $18/mo | Social + AI — clubs, sharing, networks, cross-app features |

### Scale Targets

- **1,000 apps** on shared platform
- **10,000 monthly users per app** (average)
- **$4 entry** → **$18 deep** conversion funnel
- **1M total users** by December 2026

### Ownership Hook

Users build **their own database** within each category — favorites, rankings, collections. Once invested, they want **more collections** across categories. Tier 3 creates **friend networks** where expert attribution flows down to Tier 1 (reviews, trophies, confidence).

---

## Flagship Example: Bourbon Connoisseur

- **Free:** Complete bourbon catalog — history, distilleries, tasting notes, regions
- **$4:** Personal cellar, wishlist, ratings, tasting journal
- **$18:** Bourbon clubs, social sharing, AI pairing, cross-app (meals + wine + beer)

Same platform code. Swap `category_slug: bourbon-connoisseur`.

---

## Technical Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js 15 + React | SSR, edge, speed |
| Styling | Tailwind + custom design system | Clean, elegant, high-tech |
| Database | Supabase (Postgres) | Single schema, category branches, RLS |
| Auth | Supabase Auth | Unified identity across 1000 apps |
| Hosting | Netlify | Edge deploy, env management |
| AI | OpenAI API | Niche intelligence per category |
| Repo | GitHub | Branch strategy, CI, investor visibility |
| Monorepo | Turborepo | Shared packages, independent apps |

---

## Design Principles

- **Clean, elegant, high-tech** — expert-level, never kitsch or elementary
- **Speed loading** — priority #1 for user retention
- **Single massive database** — categories branch, cross-functionality in upper tiers
- **Code works everywhere** — swap topics, not architecture
- **Self-build from day 1** — every pattern must be replicable by AI module

---

## Document Index

| Document | Purpose |
|----------|---------|
| [MASTER_BUILD_PLAN.md](./MASTER_BUILD_PLAN.md) | How we build 1000 apps |
| [APP_CATALOG_250.md](./APP_CATALOG_250.md) | Original 250 app targets (Phase 1 subset) |
| [APP_CATALOG_FULL.md](./APP_CATALOG_FULL.md) | Full 1,961 app catalog |
| [ADMIN_ARCHITECTURE.md](./ADMIN_ARCHITECTURE.md) | Central admin + vertical domains |
| [ENTITY_MODEL.md](./ENTITY_MODEL.md) | Universal entity system |
| [COLLECTION_SYSTEM.md](./COLLECTION_SYSTEM.md) | User → Collection → Entities |
| [REPUTATION_SYSTEM.md](./REPUTATION_SYSTEM.md) | Authority and trust scores |
| [OWNERSHIP_GRAPH.md](./OWNERSHIP_GRAPH.md) | User → entity relationships |
| [SEO_PUBLISH_POLICY.md](./SEO_PUBLISH_POLICY.md) | No thin content bulk publish |
| [BUILD_LOG.md](./BUILD_LOG.md) | Public pass journal |
| [ROADMAP.md](./ROADMAP.md) | Milestones and pass map |
| [METRICS.md](./METRICS.md) | Platform metrics |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture |
| [PROTOCOLS.md](./PROTOCOLS.md) | Git, branches, naming, env |
| [ROLES.md](./ROLES.md) | Team workflow |
| [INVESTOR_PITCH.md](./INVESTOR_PITCH.md) | Angel investor positioning |

---

## Pass Log

| Pass | Date | Author | Summary |
|------|------|--------|---------|
| 0 | 2026-06-10 | Burt | Foundation: docs, rules, folder structure, H: drive, git init |
| 1 | 2026-06-10 | Burt | 1,961-topic registry, course correction: vertical domains, SEO/KG engines, mission control |
| 2 | 2026-06-10 | Burt | Core data architecture: universal entities, content engine, collections, reputation |
| 3 | 2026-06-10 | Burt | Identity & ownership layer: user_entity_relationships, entity_metrics, SEO publish gate |
