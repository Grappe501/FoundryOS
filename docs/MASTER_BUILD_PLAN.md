# FoundryOS — Master Build Plan

> **How we build 1,000 apps on one platform**

---

## Core Thesis

**One platform. One database. One codebase. Swap the topic.**

Every app is a `category` in a shared system. Users own data within categories. Upper tiers unlock cross-category intelligence. The AI self-build module replicates this pattern autonomously.

---

## Phase Map

```
Phase 0 ████████████ Foundation          ← WE ARE HERE
Phase 1 ░░░░░░░░░░░░ Platform Kernel     (Weeks 1-4)
Phase 2 ░░░░░░░░░░░░ Design System       (Weeks 3-5)
Phase 3 ░░░░░░░░░░░░ Self-Build Module   (Weeks 4-8)  ← PRIORITY
Phase 4 ░░░░░░░░░░░░ First App (Bourbon) (Weeks 6-10)
Phase 5 ░░░░░░░░░░░░ App Factory         (Weeks 8-14)
Phase 6 ░░░░░░░░░░░░ Scale to 50 Apps   (Months 3-4)
Phase 7 ░░░░░░░░░░░░ Scale to 250 Apps   (Months 5-8)
Phase 8 ░░░░░░░░░░░░ Scale to 1000 Apps  (Months 9-12)
```

---

## Phase 0: Foundation (Pass 0) ✅

**Goal:** Bulletproof project infrastructure

- [x] H: drive enforcement
- [x] Git + GitHub remote
- [x] Documentation suite
- [x] Folder structure
- [x] Cursor rules for Burt
- [x] 250-app catalog
- [x] Self-build module skeleton
- [ ] Supabase project provisioned
- [ ] Netlify site connected
- [ ] OpenAI API key configured

---

## Phase 1: Platform Kernel

**Goal:** Shared engine that powers any category app

### Deliverables

```
packages/core/
├── category/          # Category registry, slug validation, config loader
├── auth/              # Unified Supabase auth wrapper
├── tiers/             # Tier 1/2/3 feature gates
├── ownership/         # User collections, favorites, rankings
├── catalog/           # Tier 1 information engine
├── search/            # Full-text search across categories
├── api/               # Shared API route handlers
└── types/             # Platform-wide TypeScript types
```

### Database (Supabase)

```sql
-- Core tables (see supabase/migrations/)
categories          -- Every app is a row
category_config     -- Per-app theming, AI prompts, tier features
catalog_items       -- Tier 1 information entries
user_profiles       -- Extended user data
user_collections    -- Tier 2 ownership
user_rankings       -- Tier 2 personal rankings
user_notes          -- Tier 2 journal/notes
social_groups       -- Tier 3 clubs/networks
social_posts        -- Tier 3 sharing
cross_references    -- Cross-category links (meals ↔ wine ↔ beer)
subscriptions       -- Tier 2/3 billing state
```

### Key Decisions

- **Single schema** — `category_id` FK on all data tables
- **RLS everywhere** — users see only their data + public catalog
- **Edge-first** — Tier 1 pages cached at CDN
- **Config-driven** — new app = new `categories` row + config, not new repo

---

## Phase 2: Design System

**Goal:** Elegant, high-tech UI that scales across 1000 niches

### Deliverables

```
packages/ui/
├── tokens/            # Colors, typography, spacing (CSS variables)
├── components/        # Button, Card, CatalogGrid, TierBadge, etc.
├── layouts/           # AppShell, CatalogLayout, CollectionLayout
├── themes/            # Per-category theme overrides
└── icons/             # Shared icon system
```

### Design Rules

- Dark-first with light mode option
- Minimal chrome — content is hero
- Typography: clean sans-serif, expert editorial feel
- No illustrations, no mascots, no kitsch
- Subtle motion — fast, purposeful
- Mobile-first, desktop-enhanced

---

## Phase 3: Self-Build Module (PRIORITY)

**Goal:** AI system that generates new apps from templates

### Why Early?

Every pattern Burt builds from Phase 1 onward must be **replicable**. Building self-build late means retrofitting. Building the skeleton now means every pass strengthens it.

### Deliverables

```
packages/self-build/
├── engine/            # Orchestrator — reads manifest, generates app
├── templates/         # App scaffolds (catalog-app, social-app, etc.)
├── prompts/           # OpenAI prompt library for generation
├── validators/        # Schema validation for generated output
├── manifests/         # JSON definitions of replicable structures
└── cli/               # `foundry generate app --slug bourbon-connoisseur`
```

### Self-Build Flow

```
1. Input:  category name, slug, description, tier features
2. Select: template from templates/
3. Generate: config, migrations, pages, AI prompts via OpenAI
4. Validate: schema, naming, RLS policies
5. Scaffold: files in apps/{slug}/
6. Register: row in categories table
7. Deploy: Netlify preview
8. Review: Ernie/Steve approve → merge
```

### Manifest Format

```json
{
  "template": "catalog-app",
  "slug": "bourbon-connoisseur",
  "displayName": "Bourbon Connoisseur",
  "category": "spirits",
  "tiers": {
    "1": ["catalog", "search", "browse"],
    "2": ["collections", "rankings", "notes"],
    "3": ["clubs", "sharing", "ai-pairing", "cross-app"]
  },
  "aiPrompts": {
    "catalogEnrichment": "You are a bourbon expert...",
    "pairingSuggestion": "Given this bourbon profile..."
  },
  "crossRefs": ["wine-cellar", "craft-beer", "meals-pairing"]
}
```

---

## Phase 4: First App — Bourbon Connoisseur

**Goal:** Prove the platform with flagship app

### Tier 1 (Free) — Information

- Bourbon catalog: distilleries, expressions, regions, history
- Search and filter
- Detail pages with expert-level content
- AI-enriched descriptions (OpenAI)

### Tier 2 ($4/mo) — Ownership

- Personal cellar (owned bottles)
- Wishlist
- Personal ratings and rankings
- Tasting journal with notes
- Export collection

### Tier 3 ($18/mo) — Social + AI

- Bourbon clubs (create/join)
- Share collections with friends
- Friend network reviews visible in Tier 1
- AI pairing suggestions (food, cigars, occasions)
- Cross-app: meals, wine, beer pairing data
- Expert badges and trophies

---

## Phase 5: App Factory

**Goal:** Generate apps 2-10 using self-build module

### Process Per App

1. Ernie defines app in catalog with manifest
2. Self-build generates scaffold
3. Burt refines AI prompts and seed data
4. Steve reviews aesthetic and content quality
5. Deploy to Netlify subdomain
6. 2-week user feedback cycle
7. Iterate → next app

### Batch Strategy

- **Batch 1 (Apps 2-10):** Spirits & beverages vertical
- **Batch 2 (Apps 11-25):** Food & culinary
- **Batch 3 (Apps 26-50):** Sports & hobbies
- Continue per [APP_CATALOG_250.md](./APP_CATALOG_250.md)

---

## Phase 6-8: Scale

| Phase | Apps | Focus |
|-------|------|-------|
| 6 | 50 | Prove unit economics, conversion funnels |
| 7 | 250 | Self-build handles 80% of scaffolding |
| 8 | 1000 | Full autonomous app generation pipeline |

### Scale Triggers

| Metric | Action |
|--------|--------|
| 100K users | Evaluate CDN upgrade, read replicas |
| 500K users | Evaluate database partitioning by category |
| 1M users | Evaluate multi-region, dedicated infra |
| Supabase limits hit | Migration plan to dedicated Postgres |

---

## Cross-App Intelligence

### Shared Database Benefits

```
User in Bourbon (Tier 3) ──▶ Meals Pairing App
                              ├── knows user's taste profile
                              ├── suggests food pairings
                              └── cross-references wine/beer collections

User in College Baseball (Tier 3) ──▶ accessible to network
                                       ├── friend group's rankings
                                       └── expert picks flow to Tier 1
```

### Cross-Reference Table

```sql
cross_references (
  source_category_id,
  target_category_id,
  reference_type,  -- 'pairing', 'complement', 'alternative'
  metadata         -- JSON context
)
```

---

## Revenue Model Math

| Scenario | Calculation | Annual |
|----------|-------------|--------|
| 1000 apps × 10K users | 10M free users | Awareness |
| 5% convert to Tier 2 | 500K × $4/mo | $24M ARR |
| 1% convert to Tier 3 | 100K × $18/mo | $21.6M ARR |
| **Conservative total** | | **~$45M ARR** |

At 10-20x ARR multiple → **$450M–$900M valuation**

---

## Speed Priority

1. **Edge-cached Tier 1** — catalog pages served from CDN
2. **Lazy-loaded Tier 2/3** — personal data fetched on demand
3. **Optimistic UI** — collections update instantly
4. **Image CDN** — Supabase Storage + transform
5. **Bundle splitting** — per-app code splitting in monorepo
6. **Prefetch** — next catalog items prefetched on scroll

---

## Next Passes (Ernie → Burt Assignments)

| Pass | Focus | Priority |
|------|-------|----------|
| 1 | Supabase schema + migrations | Critical |
| 2 | Platform kernel (`@foundry/core`) | Critical |
| 3 | Design system foundation (`@foundry/ui`) | High |
| 4 | Self-build engine skeleton | Critical |
| 5 | Bourbon Connoisseur Tier 1 | High |
| 6 | Auth + tier gating | High |
| 7 | Bourbon Tier 2 (collections) | High |
| 8 | Bourbon Tier 3 (social + AI) | High |
| 9 | Netlify deploy pipeline | High |
| 10 | Self-build: generate app #2 | High |
