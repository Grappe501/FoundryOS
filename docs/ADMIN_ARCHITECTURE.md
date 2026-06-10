# FoundryOS — Admin & Vertical Domain Architecture

> **UPDATED PASS-001 Course Correction** — See [COURSE_CORRECTION.md](./COURSE_CORRECTION.md)

> **One admin dashboard. Vertical domains with topic pages. One database.**

---

## Core Principle

```
                    ┌─────────────────────────┐
                    │   admin.foundryos.app   │
                    │   CENTRAL ADMIN         │
                    │   Steve + operators     │
                    └───────────┬─────────────┘
                                │ manages ALL
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
 bourbon.foundryos.app   fiction-fantasy...    jazz-masters...
 (standalone site)       (standalone site)      (standalone site)
        │                       │                       │
        └───────────────────────┴───────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │   SINGLE SUPABASE DB  │
                    │   verticals + sites   │
                    │   + categories        │
                    └───────────────────────┘
```

**Every topic = one row in `topics`. Every vertical domain = one row in `vertical_sites`.**

Same codebase (`apps/site-engine`). Vertical hostname + topic path. Admin provisions vertical domains only.

**NOT:** 1,961 subdomains. **YES:** ~10–40 vertical domains with thousands of topic paths.

---

## Three Deployable Apps

| App | URL | Purpose |
|-----|-----|---------|
| `apps/admin` | `admin.foundryos.app` | Central control plane |
| `apps/site-engine` | `{slug}.foundryos.app` | Standalone per-app websites |
| `apps/platform` | `foundryos.app` | Marketing hub + app directory |

---

## Site Engine — How Standalone Works

1. Request hits `bourbon-connoisseur.foundryos.app`
2. Edge middleware reads `Host` header
3. Lookup `app_sites.custom_domain` or `app_sites.subdomain`
4. Load `categories` + `theme_config` + `tier_config` + `ai_config`
5. Render standalone branded site from shared template
6. User data scoped by `category_id` (RLS)

**No per-app code forks.** Topic swap via database config. Self-build registers new sites.

---

## Admin Dashboard Modules

| Module | Controls |
|--------|----------|
| **Dashboard** | Total apps, users, MRR, deploy health |
| **Apps** | Create, edit, archive 1,961+ apps |
| **Sites** | Domains, subdomains, SSL, deploy status |
| **Verticals** | Books, Music, Movies mega-categories |
| **Content** | Catalog items, AI enrichment, publish |
| **Users** | Cross-app user admin, tier overrides |
| **Billing** | Tier 2/3 subscriptions per app |
| **AI Config** | OpenAI prompts per category |
| **Themes** | Colors, logos, typography per site |
| **Deploy** | Netlify site provisioning, rebuild |
| **Self-Build** | Topics ready / published / pending |
| **Knowledge Graph** | Entities, relationships, growth |
| **SEO** | Indexed pages, generated pages, internal links, topic authority |
| **AI Brain** | Expert personas, prompt packs, usage, cost |
| **Analytics** | Per-vertical traffic, conversion, retention |
| **Cross-Refs** | KG relationships across verticals |

---

## Database Additions

See `supabase/migrations/20260610100000_admin_and_sites.sql`:

```
verticals          → Mega-categories (books, music, movies, etc.)
app_sites          → Domain, subdomain, deploy config per app
admin_users        → Admin role assignments
deploy_logs        → Build/deploy history per site
site_analytics     → Traffic snapshots per app
```

### verticals

| Column | Purpose |
|--------|---------|
| `slug` | `books-literature`, `music-audio`, `film-cinema` |
| `is_mega_vertical` | true for Books, Music, Movies, TV |
| `app_count_target` | Scale planning |

### app_sites

| Column | Purpose |
|--------|---------|
| `category_id` | FK to categories |
| `subdomain` | `bourbon-connoisseur` |
| `custom_domain` | Optional `bourbonconnoisseur.com` |
| `site_url` | `https://bourbon-connoisseur.foundryos.app` |
| `netlify_site_id` | Netlify API reference |
| `deploy_status` | `pending`, `building`, `live`, `error` |
| `ssl_status` | Certificate state |
| `standalone` | Always true |

---

## Admin Roles

| Role | Access |
|------|--------|
| `super_admin` | Steve — full platform |
| `admin` | App management, content, deploy |
| `editor` | Content only for assigned verticals |
| `analyst` | Read-only analytics |
| `ai_operator` | Self-build + AI config |

---

## Provisioning Flow (New App)

```
1. Admin → Create App (or Self-Build manifest)
2. Insert categories row
3. Insert app_sites row (subdomain auto-generated)
4. Netlify API → create site OR add domain to wildcard
5. Seed catalog_items (AI enrichment optional)
6. deploy_status → live
7. Site accessible at {slug}.foundryos.app
```

All steps logged in `deploy_logs`. Reversible via admin.

---

## Mega Verticals (Steve Priority)

| Vertical | Apps | Standalone Sites |
|----------|------|------------------|
| **Books & Literature** | 120+ | `fiction-fantasy.foundryos.app`, etc. |
| **Music & Audio** | 120+ | `jazz-masters.foundryos.app`, etc. |
| **Film & Cinema** | 100+ | `film-noir.foundryos.app`, etc. |
| **TV & Streaming** | 100+ | `tv-drama.foundryos.app`, etc. |

Each is its own vertical in admin with batch operations (bulk publish, bulk theme, bulk AI prompt).

---

## Netlify Strategy

### Phase 1 (now → 100 apps)
- Wildcard domain `*.foundryos.app` → `site-engine`
- One Netlify site, hostname routing in middleware

### Phase 2 (100 → 1000 apps)
- Netlify API provisions per-app sites from admin
- Still one codebase, multiple deploy targets

### Phase 3 (custom domains)
- Admin attaches `custom_domain` per app
- DNS + SSL managed via Netlify API

---

## Security

- Admin app: separate auth, `admin_users` table, no public signup
- Service role key **only** in admin server routes
- `app_metadata.role` for admin JWT claims
- All admin mutations audit-logged in `deploy_logs`

---

## File Map

```
apps/admin/                 → Central dashboard
apps/site-engine/           → Standalone site template
apps/platform/              → Marketing + directory
data/catalog/               → 1,961 app registry (machine-readable)
packages/core/src/sites/    → Site resolution by hostname
packages/core/src/admin/    → Admin API types
scripts/build-catalog.js    → Regenerate catalog JSON
scripts/provision-site.js   → (Pass 2) Netlify provision CLI
```
