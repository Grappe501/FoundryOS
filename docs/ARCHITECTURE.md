# FoundryOS — System Architecture

---

## High-Level Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                    admin.foundryos.app                           │
│                    CENTRAL ADMIN (all 1,961 apps)                │
└────────────────────────────┬─────────────────────────────────────┘
                             │ provisions & manages
┌────────────────────────────▼─────────────────────────────────────┐
│                     NETLIFY EDGE / WILDCARD                      │
│  bourbon.foundryos.app  fiction-fantasy...  jazz-masters...      │
│  (standalone sites via apps/site-engine — hostname routing)      │
│                             │                                    │
│              ┌──────────────▼──────────────┐                     │
│              │   @foundry/core             │                     │
│              │   Platform Kernel + Sites   │                     │
│              └──────────────┬──────────────┘                     │
│                         │                                   │
│       ┌─────────────────┼─────────────────┐                │
│       ▼                 ▼                 ▼                │
│  @foundry/ui    @foundry/self-build   OpenAI API          │
│  Design System   AI App Generator     Niche Intelligence   │
└─────────────────────────┬───────────────────────────────────┘
                          │
              ┌───────────▼───────────┐
              │      SUPABASE         │
              │  ┌─────────────────┐  │
              │  │  Single Schema  │  │
              │  │  categories ──┐ │  │
              │  │  catalog_items│ │  │
              │  │  collections  │ │  │
              │  │  social_*     │ │  │
              │  │  cross_refs ──┘ │  │
              │  └─────────────────┘  │
              │  Auth │ Storage │ RLS │
              └───────────────────────┘
```

---

## Monorepo Structure

```
H:\FoundryOS\
├── apps/                          # Deployable applications
│   ├── admin/                     # Central admin dashboard
│   ├── site-engine/               # Standalone sites (hostname → category)
│   └── platform/                  # Marketing hub + app directory
├── data/catalog/                  # 1,961 app registry (JSON)
├── packages/
│   ├── core/                      # @foundry/core — platform kernel
│   ├── ui/                        # @foundry/ui — design system
│   ├── self-build/                # @foundry/self-build — AI generator
│   └── config/                    # @foundry/config — shared configs
├── supabase/
│   ├── migrations/                # Database migrations
│   ├── seed/                      # Seed data per category
│   └── config.toml                # Supabase local config
├── docs/                          # All documentation
├── scripts/                       # H: drive setup, deploy scripts
├── .cursor/rules/                 # Burt's persistent rules
├── .cache/                        # ALL caches (H: only, gitignored)
├── turbo.json                     # Turborepo config
├── package.json                   # Workspace root
├── netlify.toml                   # Deploy config
├── .env.example                   # Environment template
└── .npmrc                         # npm cache → H: drive
```

---

## Data Model

### Entity Relationship (Core)

```
categories
  ├── category_config (1:1)
  ├── catalog_items (1:N)         ← Tier 1
  ├── user_collections (1:N)      ← Tier 2
  ├── user_rankings (1:N)         ← Tier 2
  ├── user_notes (1:N)            ← Tier 2
  ├── social_groups (1:N)         ← Tier 3
  └── cross_references (N:M)      ← Cross-app

users (Supabase Auth)
  ├── user_profiles (1:1)
  ├── subscriptions (1:N)
  └── [all user_* tables above]
```

### Category = App

```typescript
interface Category {
  id: string;
  slug: string;              // 'bourbon-connoisseur'
  display_name: string;       // 'Bourbon Connoisseur'
  parent_category_id?: string; // 'spirits' group
  status: 'draft' | 'active' | 'archived';
  tier_config: TierConfig;
  theme_config: ThemeConfig;
  ai_config: AIConfig;
  created_at: string;
}
```

### Tier Gating

```typescript
interface TierConfig {
  tier1: { features: string[]; limits: Record<string, number> };
  tier2: { features: string[]; price_monthly: 4 };
  tier3: { features: string[]; price_monthly: 18 };
}
```

---

## Request Flow

### Tier 1 (Catalog Browse) — Speed Critical

```
User → Netlify Edge → Static/ISR page → CDN cache hit → <100ms
                                    └→ cache miss → Supabase read → cache → serve
```

### Tier 2 (Personal Data)

```
User → Auth check → RLS query → user_collections → render
```

### Tier 3 (Social + AI)

```
User → Auth check → RLS query → social_groups + friends
                              → OpenAI API → AI response
                              → cross_references → related categories
```

---

## Self-Build Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Manifest   │────▶│   Template   │────▶│   OpenAI     │
│   (JSON)     │     │   Engine     │     │   Enrichment │
└──────────────┘     └──────┬───────┘     └──────┬───────┘
                            │                     │
                     ┌──────▼───────┐      ┌──────▼───────┐
                     │  Validator   │      │  Generated   │
                     │  (schema +   │      │  App Files   │
                     │   naming)    │      │              │
                     └──────┬───────┘      └──────┬───────┘
                            │                     │
                     ┌──────▼─────────────────────▼───────┐
                     │         App Scaffold Output        │
                     │  apps/{slug}/ + migration + seed   │
                     └────────────────────────────────────┘
```

---

## Security Model

- **Supabase RLS** on every table
- **JWT claims** for tier level (in `app_metadata`, NOT `user_metadata`)
- **API keys** never in client code (server-side only for OpenAI)
- **CORS** restricted to `*.foundryos.app`
- **Rate limiting** on AI endpoints
- **Input validation** on all user-generated content

---

## Deployment Architecture

```
GitHub Push → Netlify Build → Edge Deploy
                │
                ├── apps/platform (main site)
                ├── apps/{slug} (subdomain or path)
                └── Preview deploys per PR
```

### Environment Tiers

| Environment | Branch | URL |
|-------------|--------|-----|
| Production | `main` | `foundryos.app` |
| Admin | `main` | `admin.foundryos.app` |
| Standalone App | `main` | `{slug}.foundryos.app` |
| Staging | `develop` | `staging.foundryos.app` |
| Preview | PR branches | `{pr}.foundryos.app` |

See [ADMIN_ARCHITECTURE.md](./ADMIN_ARCHITECTURE.md) for full multi-site design.

---

## Scaling Strategy

| Users | Infrastructure Change |
|-------|----------------------|
| 0-100K | Supabase free/pro, Netlify |
| 100K-500K | Supabase pro, CDN optimization |
| 500K-1M | Read replicas, edge functions |
| 1M+ | Evaluate dedicated Postgres, multi-region |

**Rule:** Do not pre-optimize. Supabase until we must grow bigger.
